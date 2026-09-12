import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { Au as SkillCandidateChip, Mo as init_poi_service_context, Ou as SkillRecommendLoading, _o as poiMapServiceMock, go as init_poi_map_service_mock, hi as init_tool_protocol, jc as init_skill_recommend, jo as PoiServiceProvider, ku as SkillRecommendBar } from "./agent-mail-CiuzbR2o.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { T as Settings, t as init_lucide_react, v as Sparkles } from "./lucide-react-CmX0JwWL.js";
import { n as init_tokens, t as init_cb_bridge } from "./cb-bridge-CZ4gPmf0.js";
import { c as Route, f as useNavigate, l as Routes, m as useParams, o as Navigate, r as init_dist, u as useLocation } from "./dist-BlOCCi14.js";
import { n as useTheme, t as init_useTheme } from "./useTheme-KZ-Qaric.js";
import { $ as init_Tag, A as message, B as DrawerFooter, C as init_Tabs, D as init_Switch, E as init_Checkbox, F as init_Dropdown, G as init_Popconfirm, H as Modal, I as Dropdown, J as Popover, K as Popconfirm, L as init_Drawer, M as Select, N as init_Notification, O as Switch, P as Notification, Q as init_Card, R as Drawer, S as Segmented, T as Checkbox, U as ModalBody, V as init_Modal, W as ModalFooter, X as Loading, Y as init_Loading, Z as Card, _ as init_Breadcrumb, a as init_RegionPicker, b as Table, c as chinaRegionDataSource, ct as Button, d as buildStaticDataSource, et as Tag, ft as init_tokens$1, g as Tooltip, h as init_Tooltip, i as ColorPicker, j as init_Select, k as init_Message, l as init_Cascader, lt as Avatar, m as Progress, nt as init_Input, o as enRegionDataSource, ot as init_Icon, p as init_Progress, pt as colorTokens, q as init_Popover, r as init_ColorPicker, s as RegionPicker, st as init_Button, tt as Input, u as Cascader, ut as init_Avatar, v as Breadcrumb, w as Tabs, x as init_Segmented, y as init_Table, z as DrawerBody } from "./foundation-QOglV606.js";
import { Ct as SearchIcon$2, Ir as Icon, Lr as createIcon, Mr as AddIcon, T as AgentToolIcon, Un as DeleteIcon, a as WarnToolIcon, at as TencentDocsIcon, hr as AssistantSpinnerIcon, n as init_icons, t as icons_exports } from "./icons-Cj3UopO9.js";
import { n as PoiResultRenderer, t as init_poi_result } from "./poi-result-CZqkqeUY.js";
import { a as PoiLocationFormCard, c as init_PoiLocateErrorDialog, d as PoiAddressPickerCard, f as init_PoiAddressPickerCard, i as usePoiFlow, l as PoiAuthCard, m as init_McpPoiConsentCard, n as init_PoiDialogFlow, o as init_PoiLocationFormCard, r as init_use_poi_flow, s as PoiLocateErrorDialog, u as init_PoiAuthCard } from "./PoiDialogFlow-BrBvrtMs.js";
//#region ../../packages/agent-ui/src/playbook/components/PropsPanel/PropsPanel.tsx
function PropsPanel({ schema, value, onChange }) {
	const handleChange = (0, import_react$36.useCallback)((key, next) => {
		onChange({
			...value,
			[key]: next
		});
	}, [value, onChange]);
	const entries = Object.entries(schema);
	if (entries.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime$36.jsx)("div", {
		style: {
			color: "var(--wb-color-text-tertiary)",
			fontSize: "var(--wb-font-caption-size)"
		},
		children: "此页面没有可调节的 props。"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime$36.jsx)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: "var(--wb-spacing-4)",
			fontSize: "var(--wb-font-body-size)",
			color: "var(--wb-color-text-primary)"
		},
		children: entries.map(([key, control]) => {
			const label = control.label ?? String(key);
			const id = `props-panel-${String(key)}`;
			if (control.type === "boolean") return /* @__PURE__ */ (0, import_jsx_runtime$36.jsxs)("label", {
				htmlFor: id,
				style: rowStyle$1,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$36.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime$36.jsx)("input", {
					id,
					type: "checkbox",
					checked: Boolean(value[key]),
					onChange: (e) => handleChange(key, e.target.checked)
				})]
			}, String(key));
			if (control.type === "select") return /* @__PURE__ */ (0, import_jsx_runtime$36.jsxs)("label", {
				htmlFor: id,
				style: rowStyle$1,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$36.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime$36.jsx)("select", {
					id,
					value: String(value[key]),
					onChange: (e) => handleChange(key, e.target.value),
					style: controlStyle,
					children: control.options.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime$36.jsx)("option", {
						value: String(opt),
						children: String(opt)
					}, String(opt)))
				})]
			}, String(key));
			if (control.type === "string") return /* @__PURE__ */ (0, import_jsx_runtime$36.jsxs)("label", {
				htmlFor: id,
				style: rowStyle$1,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$36.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime$36.jsx)("input", {
					id,
					type: "text",
					value: String(value[key] ?? ""),
					placeholder: control.placeholder,
					onChange: (e) => handleChange(key, e.target.value),
					style: controlStyle
				})]
			}, String(key));
			return null;
		})
	});
}
/** 给注册项使用的工具：根据 schema 取一份默认值 */
function getDefaultValuesFromSchema(schema) {
	const result = {};
	for (const [key, control] of Object.entries(schema)) result[key] = control.default;
	return result;
}
var import_react$36, import_jsx_runtime$36, rowStyle$1, controlStyle;
var init_PropsPanel$1 = __esmMin((() => {
	import_react$36 = /* @__PURE__ */ __toESM(require_react());
	import_jsx_runtime$36 = require_jsx_runtime();
	rowStyle$1 = {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		gap: "var(--wb-spacing-3)"
	};
	controlStyle = {
		minWidth: 0,
		flex: "0 1 60%",
		padding: "4px 8px",
		border: "1px solid var(--wb-border-default)",
		borderRadius: "var(--wb-radius-sm)",
		background: "var(--wb-bg-tertiary)",
		color: "var(--wb-color-text-primary)"
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/playbook/components/PropsPanel/PropsTable.tsx
function PropsTable({ schema }) {
	const entries = Object.entries(schema);
	if (entries.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("div", {
		style: wrapperStyle,
		children: /* @__PURE__ */ (0, import_jsx_runtime$35.jsxs)("table", {
			style: tableStyle,
			children: [/* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime$35.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("th", {
					style: thStyle,
					children: "Prop"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("th", {
					style: thStyle,
					children: "Type"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("th", {
					style: thStyle,
					children: "Default"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("th", {
					style: thStyle,
					children: "Description"
				})
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("tbody", { children: entries.map(([key, control]) => {
				const typeText = control.typeLabel ?? deriveTypeLabel(control);
				const defaultText = stringifyDefault(control.default);
				return /* @__PURE__ */ (0, import_jsx_runtime$35.jsxs)("tr", {
					style: trStyle,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$35.jsxs)("td", {
							style: tdStyle,
							children: [/* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("code", {
								style: codeStyle$1,
								children: key
							}), control.required && /* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("span", {
								style: requiredBadgeStyle,
								children: "required"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("td", {
							style: tdStyle,
							children: /* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("code", {
								style: codeStyle$1,
								children: typeText
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("td", {
							style: tdStyle,
							children: defaultText ? /* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("code", {
								style: codeStyle$1,
								children: defaultText
							}) : /* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("span", {
								style: mutedStyle,
								children: "—"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("td", {
							style: {
								...tdStyle,
								color: "var(--wb-color-text-secondary)"
							},
							children: control.description ?? /* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("span", {
								style: mutedStyle,
								children: "—"
							})
						})
					]
				}, key);
			}) })]
		})
	});
}
function deriveTypeLabel(control) {
	if (control.type === "boolean") return "boolean";
	if (control.type === "string") return "string";
	if (control.type === "select") return control.options.map((opt) => `'${opt}'`).join(" | ");
	return "unknown";
}
function stringifyDefault(value) {
	if (typeof value === "boolean") return String(value);
	if (typeof value === "string") {
		if (value === "") return "''";
		return `'${value}'`;
	}
	if (value == null) return "";
	return String(value);
}
var import_jsx_runtime$35, wrapperStyle, tableStyle, thStyle, trStyle, tdStyle, codeStyle$1, mutedStyle, requiredBadgeStyle;
var init_PropsTable = __esmMin((() => {
	require_react();
	import_jsx_runtime$35 = require_jsx_runtime();
	wrapperStyle = {
		overflowX: "auto",
		border: "1px solid var(--wb-border-default)",
		borderRadius: "var(--wb-radius-md)"
	};
	tableStyle = {
		width: "100%",
		borderCollapse: "collapse",
		fontSize: "var(--wb-font-body-size)",
		color: "var(--wb-color-text-primary)"
	};
	thStyle = {
		textAlign: "left",
		padding: "8px 12px",
		background: "var(--wb-bg-tertiary)",
		color: "var(--wb-color-text-secondary)",
		fontSize: "var(--wb-font-caption-size)",
		fontWeight: 600,
		borderBottom: "1px solid var(--wb-border-default)"
	};
	trStyle = { borderTop: "1px solid var(--wb-border-default)" };
	tdStyle = {
		padding: "8px 12px",
		verticalAlign: "top",
		lineHeight: 1.5
	};
	codeStyle$1 = {
		fontFamily: "var(--wb-font-code-family, ui-monospace, SFMono-Regular, monospace)",
		fontSize: "var(--wb-font-code-size)",
		background: "var(--wb-bg-tertiary)",
		padding: "1px 6px",
		borderRadius: "var(--wb-radius-sm)",
		color: "var(--wb-color-text-primary)"
	};
	mutedStyle = { color: "var(--wb-color-text-tertiary)" };
	requiredBadgeStyle = {
		marginLeft: 6,
		fontSize: "var(--wb-font-caption-size)",
		color: "var(--wb-error-foreground, #d33)"
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/playbook/components/PropsPanel/index.ts
var init_PropsPanel = __esmMin((() => {
	init_PropsPanel$1();
	init_PropsTable();
}));
//#endregion
//#region ../../packages/agent-ui/src/playbook/components/DemoBlock.tsx
function DemoBlock({ title, description, children, code, defaultCodeOpen = false }) {
	const [codeOpen, setCodeOpen] = (0, import_react$34.useState)(defaultCodeOpen);
	const [copied, setCopied] = (0, import_react$34.useState)(false);
	const handleCopy = (0, import_react$34.useCallback)(() => {
		if (!code) return;
		const fallbackCopy = () => {
			const textarea = document.createElement("textarea");
			textarea.value = code;
			textarea.style.position = "fixed";
			textarea.style.opacity = "0";
			document.body.appendChild(textarea);
			textarea.select();
			try {
				document.execCommand("copy");
			} catch {}
			document.body.removeChild(textarea);
		};
		try {
			const p = navigator.clipboard?.writeText(code);
			if (p && typeof p.then === "function") p.catch(fallbackCopy);
			else fallbackCopy();
		} catch {
			fallbackCopy();
		}
		setCopied(true);
		setTimeout(() => setCopied(false), 1500);
	}, [code]);
	return /* @__PURE__ */ (0, import_jsx_runtime$34.jsxs)("div", {
		style: blockStyle,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$34.jsx)("div", {
				style: previewStyle$1,
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$34.jsxs)("div", {
				style: metaStyle,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$34.jsx)("div", {
					style: titleStyle$1,
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime$34.jsx)("div", {
					style: descStyle,
					children: description
				})]
			}),
			code && /* @__PURE__ */ (0, import_jsx_runtime$34.jsxs)(import_jsx_runtime$34.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$34.jsxs)("div", {
				style: toolbarStyle,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$34.jsxs)("button", {
					type: "button",
					style: {
						...toolBtnStyle,
						...codeOpen ? toolBtnActiveStyle : null
					},
					onClick: () => setCodeOpen((o) => !o),
					"aria-expanded": codeOpen,
					"aria-label": codeOpen ? "收起代码" : "显示代码",
					title: codeOpen ? "收起代码" : "显示代码",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$34.jsx)(CodeIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime$34.jsx)("span", { children: codeOpen ? "收起代码" : "显示代码" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime$34.jsxs)("button", {
					type: "button",
					style: toolBtnStyle,
					onClick: handleCopy,
					"aria-label": "复制代码",
					title: "复制代码",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$34.jsx)(CopyIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime$34.jsx)("span", { children: copied ? "已复制" : "复制" })]
				})]
			}), codeOpen && /* @__PURE__ */ (0, import_jsx_runtime$34.jsx)("pre", {
				style: codeBlockStyle,
				children: /* @__PURE__ */ (0, import_jsx_runtime$34.jsx)("code", {
					style: codeContentStyle,
					children: highlightJsx(code)
				})
			})] })
		]
	});
}
function CodeIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime$34.jsx)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 16 16",
		"aria-hidden": "true",
		focusable: "false",
		children: /* @__PURE__ */ (0, import_jsx_runtime$34.jsx)("path", {
			d: "M5 4l-3 4 3 4M11 4l3 4-3 4",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			fill: "none"
		})
	});
}
function CopyIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime$34.jsxs)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 16 16",
		"aria-hidden": "true",
		focusable: "false",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$34.jsx)("rect", {
			x: "5",
			y: "5",
			width: "8",
			height: "8",
			rx: "1.5",
			stroke: "currentColor",
			strokeWidth: "1.5",
			fill: "none"
		}), /* @__PURE__ */ (0, import_jsx_runtime$34.jsx)("path", {
			d: "M3 11V4a1 1 0 0 1 1-1h7",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round",
			fill: "none"
		})]
	});
}
function tokenizeJsx(source) {
	const out = [];
	let lastIndex = 0;
	let match;
	JSX_TOKEN_RE.lastIndex = 0;
	while ((match = JSX_TOKEN_RE.exec(source)) !== null) {
		if (match.index > lastIndex) out.push({
			kind: "plain",
			text: source.slice(lastIndex, match.index)
		});
		if (match[1] || match[2]) out.push({
			kind: "comment",
			text: match[0]
		});
		else if (match[3] || match[4] || match[5]) out.push({
			kind: "string",
			text: match[0]
		});
		else if (match[6]) out.push({
			kind: "tag",
			text: match[0]
		});
		else if (match[7]) out.push({
			kind: "punct",
			text: match[0]
		});
		else if (match[8]) out.push({
			kind: "keyword",
			text: match[0]
		});
		else if (match[9]) out.push({
			kind: "attr",
			text: match[0]
		});
		lastIndex = match.index + match[0].length;
	}
	if (lastIndex < source.length) out.push({
		kind: "plain",
		text: source.slice(lastIndex)
	});
	return out;
}
function highlightJsx(source) {
	return tokenizeJsx(source).map((span, idx) => {
		const style = HL_COLOR[span.kind];
		if (!style) return /* @__PURE__ */ (0, import_jsx_runtime$34.jsx)(import_react$34.Fragment, { children: span.text }, idx);
		return /* @__PURE__ */ (0, import_jsx_runtime$34.jsx)("span", {
			style,
			children: span.text
		}, idx);
	});
}
var import_react$34, import_jsx_runtime$34, JSX_TOKEN_RE, HL_COLOR, blockStyle, previewStyle$1, metaStyle, titleStyle$1, descStyle, toolbarStyle, toolBtnStyle, toolBtnActiveStyle, codeBlockStyle, codeContentStyle;
var init_DemoBlock = __esmMin((() => {
	import_react$34 = /* @__PURE__ */ __toESM(require_react());
	import_jsx_runtime$34 = require_jsx_runtime();
	JSX_TOKEN_RE = new RegExp([
		"(/\\*[\\s\\S]*?\\*/)",
		"(//[^\\n]*)",
		"(`(?:\\\\.|[^`\\\\])*`)",
		"('(?:\\\\.|[^'\\\\])*')",
		"(\"(?:\\\\.|[^\"\\\\])*\")",
		"(</?[A-Za-z][A-Za-z0-9.]*)",
		"(/>|>)",
		"\\b(import|from|export|default|const|let|var|return|if|else|function|true|false|null|undefined|new|async|await|interface|type|as)\\b",
		"\\b([A-Za-z_$][A-Za-z0-9_$-]*)(?=\\s*=)"
	].join("|"), "g");
	HL_COLOR = {
		comment: {
			color: "var(--wb-color-text-tertiary, #999)",
			fontStyle: "italic"
		},
		string: { color: "#c2185b" },
		tag: {
			color: "#2e7d32",
			fontWeight: 600
		},
		punct: { color: "#2e7d32" },
		keyword: {
			color: "#1565c0",
			fontWeight: 600
		},
		attr: { color: "#6a1b9a" }
	};
	blockStyle = {
		border: "1px solid var(--wb-border-default)",
		borderRadius: 8,
		overflow: "hidden",
		background: "var(--wb-bg-primary)"
	};
	previewStyle$1 = {
		padding: 24,
		display: "flex",
		flexWrap: "wrap",
		alignItems: "center",
		gap: 12
	};
	metaStyle = {
		padding: "16px 24px",
		borderTop: "1px solid var(--wb-border-default)",
		background: "var(--wb-bg-secondary)"
	};
	titleStyle$1 = {
		fontSize: 14,
		fontWeight: 600,
		color: "var(--wb-color-text-primary)",
		marginBottom: 4
	};
	descStyle = {
		fontSize: 13,
		lineHeight: 1.6,
		color: "var(--wb-color-text-secondary)"
	};
	toolbarStyle = {
		display: "flex",
		alignItems: "center",
		gap: 4,
		padding: "6px 12px",
		borderTop: "1px solid var(--wb-border-default)",
		background: "var(--wb-bg-secondary)"
	};
	toolBtnStyle = {
		display: "inline-flex",
		alignItems: "center",
		gap: 6,
		padding: "4px 10px",
		border: "none",
		background: "transparent",
		color: "var(--wb-color-text-tertiary)",
		fontSize: 12,
		lineHeight: 1.5,
		borderRadius: 4,
		cursor: "pointer",
		transition: "background 120ms ease, color 120ms ease"
	};
	toolBtnActiveStyle = {
		color: "var(--wb-color-text-primary)",
		background: "var(--wb-bg-tertiary, rgba(0, 0, 0, 0.04))"
	};
	codeBlockStyle = {
		margin: 0,
		padding: "16px 24px",
		borderTop: "1px solid var(--wb-border-default)",
		background: "var(--wb-bg-tertiary, #fafafa)",
		fontFamily: "var(--wb-font-code-family, ui-monospace, SFMono-Regular, Menlo, monospace)",
		fontSize: 12.5,
		lineHeight: 1.7,
		color: "var(--wb-color-text-primary)",
		overflowX: "auto",
		whiteSpace: "pre"
	};
	codeContentStyle = {
		fontFamily: "inherit",
		fontSize: "inherit"
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/playbook/components/GapsBlock.tsx
/**
* 渲染缺口列表。空数组直接返回 null（不渲染该 section 标题）。
*/
function GapsSection(props) {
	if (props.items.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime$33.jsxs)("div", {
		style: gapsSectionStyle$1,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$33.jsxs)("div", {
			style: gapsSectionTitleStyle$1,
			children: [/* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("span", {
				style: props.badgeStyle,
				children: props.badge
			}), props.label]
		}), /* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("ul", {
			style: gapsListStyle$1,
			children: props.items.map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime$33.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("strong", { children: item.title }), item.description ? /* @__PURE__ */ (0, import_jsx_runtime$33.jsxs)(import_jsx_runtime$33.Fragment, { children: ["：", item.description] }) : null] }, idx))
		})]
	});
}
function GapsBlock(props) {
	const blocking = props.blocking ?? [];
	const pending = props.pending ?? [];
	const title = props.title ?? "能力缺口（v0.2 现状）";
	const subtitle = props.subtitle ?? /* @__PURE__ */ (0, import_jsx_runtime$33.jsxs)(import_jsx_runtime$33.Fragment, { children: [
		"与 ",
		/* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("code", { children: props.gapDocPath }),
		" 保持一致。Foundation 层只暴露设计稿钉死的形态； 下列能力尚未支持，待补稿后再由 foundation 二次落地。"
	] });
	return /* @__PURE__ */ (0, import_jsx_runtime$33.jsxs)("div", {
		style: gapsBlockStyle$1,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$33.jsxs)("div", {
				style: gapsHeaderStyle$1,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("div", {
					style: gapsTitleStyle$1,
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("div", {
					style: gapsSubtitleStyle$1,
					children: subtitle
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$33.jsx)(GapsSection, {
				badge: "阻塞",
				badgeStyle: gapsBadgeBlockingStyle$1,
				label: "必须补稿才能做",
				items: blocking
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$33.jsx)(GapsSection, {
				badge: "不阻塞",
				badgeStyle: gapsBadgePendingStyle$1,
				label: "历史方案兜底中，可后补",
				items: pending
			}),
			props.footer ? /* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("div", {
				style: gapsFooterStyle$1,
				children: props.footer
			}) : null
		]
	});
}
var import_jsx_runtime$33, gapsBlockStyle$1, gapsHeaderStyle$1, gapsTitleStyle$1, gapsSubtitleStyle$1, gapsSectionStyle$1, gapsSectionTitleStyle$1, gapsBadgeBaseStyle$1, gapsBadgeBlockingStyle$1, gapsBadgePendingStyle$1, gapsListStyle$1, gapsFooterStyle$1;
var init_GapsBlock = __esmMin((() => {
	require_react();
	import_jsx_runtime$33 = require_jsx_runtime();
	gapsBlockStyle$1 = {
		border: "1px solid var(--wb-border-default)",
		borderRadius: 8,
		overflow: "hidden",
		background: "var(--wb-bg-secondary)",
		display: "flex",
		flexDirection: "column"
	};
	gapsHeaderStyle$1 = {
		padding: "16px 24px",
		borderBottom: "1px solid var(--wb-border-default)",
		background: "var(--wb-bg-primary)"
	};
	gapsTitleStyle$1 = {
		fontSize: 14,
		fontWeight: 600,
		color: "var(--wb-color-text-primary)",
		marginBottom: 4
	};
	gapsSubtitleStyle$1 = {
		fontSize: 13,
		lineHeight: 1.6,
		color: "var(--wb-color-text-secondary)"
	};
	gapsSectionStyle$1 = { padding: "12px 24px 4px" };
	gapsSectionTitleStyle$1 = {
		fontSize: 13,
		fontWeight: 600,
		color: "var(--wb-color-text-primary)",
		marginBottom: 4,
		display: "flex",
		alignItems: "center",
		gap: 8
	};
	gapsBadgeBaseStyle$1 = {
		fontSize: 11,
		fontWeight: 600,
		padding: "2px 8px",
		borderRadius: 999,
		lineHeight: 1.4
	};
	gapsBadgeBlockingStyle$1 = {
		...gapsBadgeBaseStyle$1,
		background: "var(--wb-status-error-soft, rgba(220, 53, 69, 0.12))",
		color: "var(--wb-status-error, #dc3545)"
	};
	gapsBadgePendingStyle$1 = {
		...gapsBadgeBaseStyle$1,
		background: "var(--wb-status-warning-soft, rgba(245, 158, 11, 0.14))",
		color: "var(--wb-status-warning, #f59e0b)"
	};
	gapsListStyle$1 = {
		margin: 0,
		paddingLeft: 20,
		fontSize: 13,
		lineHeight: 1.7,
		color: "var(--wb-color-text-secondary)"
	};
	gapsFooterStyle$1 = {
		padding: "12px 24px 16px",
		fontSize: 12,
		lineHeight: 1.6,
		color: "var(--wb-color-text-tertiary)"
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/playbook/pages/components/AvatarPage.tsx
/** 一个最小的 user 图标，避免示例依赖业务 icon */
function UserSvg(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime$32.jsxs)("svg", {
		viewBox: "0 0 16 16",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("circle", {
			cx: "8",
			cy: "5.5",
			r: "2.5"
		}), /* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("path", { d: "M2.5 13c.7-2.4 2.9-4 5.5-4s4.8 1.6 5.5 4" })]
	});
}
function AvatarPage(props) {
	const src = props.useImage ? SAMPLE_IMG : void 0;
	const icon = props.useIcon ? /* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(Icon, { component: UserSvg }) : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 16
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(Avatar, {
			size: props.size,
			shape: props.shape,
			src,
			icon,
			alt: props.label || "Avatar",
			children: props.label
		})
	});
}
function AvatarVariants() {
	return /* @__PURE__ */ (0, import_jsx_runtime$32.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 16
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(DemoBlock, {
				title: "基础用法",
				description: /* @__PURE__ */ (0, import_jsx_runtime$32.jsxs)(import_jsx_runtime$32.Fragment, { children: [
					"最简单的用法。传 ",
					/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("code", { children: "src" }),
					" 渲染图片头像；默认",
					/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("code", { children: "shape=\"circle\"" }),
					"、",
					/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("code", { children: "size=\"medium\"" }),
					"。"
				] }),
				code: "<Avatar src=\"https://i.pravatar.cc/120?img=12\" alt=\"Joey\" />",
				children: /* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(Avatar, {
					src: SAMPLE_IMG,
					alt: "Joey"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$32.jsxs)(DemoBlock, {
				title: "形状（shape）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$32.jsxs)(import_jsx_runtime$32.Fragment, { children: [
					"提供两种形状：",
					/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("code", { children: "circle" }),
					"（默认，圆形）/ ",
					/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("code", { children: "square" }),
					"（方形，圆角 6px）。专家卡片、Banner 等场景常用方形。"
				] }),
				code: `<Avatar shape="circle" src={url} />
<Avatar shape="square" src={url} />`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(Avatar, {
					shape: "circle",
					src: SAMPLE_IMG,
					alt: "circle"
				}), /* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(Avatar, {
					shape: "square",
					src: SAMPLE_IMG,
					alt: "square"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$32.jsxs)(DemoBlock, {
				title: "尺寸档位（size）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$32.jsxs)(import_jsx_runtime$32.Fragment, { children: [
					"预设三档：",
					/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("code", { children: "small" }),
					"(24) / ",
					/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("code", { children: "medium" }),
					"(32) /",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("code", { children: "large" }),
					"(40)，也可直传 ",
					/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("code", { children: "number" }),
					" 任意像素值。 字号按尺寸自动缩放（",
					/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("code", { children: "0.4 × size" }),
					"，最小 12）。"
				] }),
				code: `<Avatar size="small" src={url} />
<Avatar size="medium" src={url} />
<Avatar size="large" src={url} />
<Avatar size={64} src={url} />`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(Avatar, {
						size: "small",
						src: SAMPLE_IMG,
						alt: "s"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(Avatar, {
						size: "medium",
						src: SAMPLE_IMG,
						alt: "m"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(Avatar, {
						size: "large",
						src: SAMPLE_IMG,
						alt: "l"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(Avatar, {
						size: 64,
						src: SAMPLE_IMG,
						alt: "xl"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$32.jsxs)(DemoBlock, {
				title: "文字 fallback",
				description: /* @__PURE__ */ (0, import_jsx_runtime$32.jsxs)(import_jsx_runtime$32.Fragment, { children: [
					"没有 ",
					/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("code", { children: "src" }),
					" 时，渲染 ",
					/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("code", { children: "children" }),
					" 作为文字头像； 组件内自动取第一个字符并转大写，安全处理 emoji 与 CJK 代理对—— 业务里直接传 ",
					/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("code", { children: "name" }),
					" 即可，无需手动 ",
					/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("code", { children: ".charAt(0)" }),
					"。"
				] }),
				code: `<Avatar>Tencent</Avatar>      {/* T */}
<Avatar>张三</Avatar>          {/* 张 */}
<Avatar>{'🎉 庆典'}</Avatar>   {/* 🎉 */}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(Avatar, { children: "Tencent" }),
					/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(Avatar, { children: "张三" }),
					/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(Avatar, { children: "🎉 庆典" }),
					/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(Avatar, {
						shape: "square",
						children: "李四"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$32.jsxs)(DemoBlock, {
				title: "图标 fallback（icon）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$32.jsxs)(import_jsx_runtime$32.Fragment, { children: [
					"传 ",
					/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("code", { children: "icon" }),
					"（任意 ReactNode）作为图标 fallback， 优先级**高于** ",
					/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("code", { children: "children" }),
					"。常用于\"匿名用户 / 默认头像\"或 Banner 上\"知识库默认图标\"等场景。"
				] }),
				code: `import { Icon } from '@genie/agent-ui/foundation';

<Avatar icon={<Icon component={UserIcon} />} />
<Avatar icon={<Icon component={UserIcon} />} shape="square" size="large" />`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(Avatar, { icon: /* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(Icon, { component: UserSvg }) }), /* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(Avatar, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(Icon, { component: UserSvg }),
					shape: "square",
					size: "large"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$32.jsxs)(DemoBlock, {
				title: "加载失败兜底（onError）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$32.jsxs)(import_jsx_runtime$32.Fragment, { children: [
					"图片加载失败时自动切到 fallback（icon > children）。",
					/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("code", { children: "onError" }),
					" 返回 ",
					/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("code", { children: "false" }),
					" 可阻止内置切换（与 antd 一致）。 下面这个示例的 src 是失效域名，会自动 fallback 到首字母 W。"
				] }),
				code: `<Avatar src="https://invalid.example/x.png">WorkBuddy</Avatar>

{/* 自定义错误处理：阻止内置 fallback */}
<Avatar
  src={url}
  onError={() => {
    reportImageError(url);
    return false; // 不切 fallback，保留 <img>
  }}
>
  W
</Avatar>`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(Avatar, {
					src: BROKEN_IMG,
					children: "WorkBuddy"
				}), /* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(Avatar, {
					src: BROKEN_IMG,
					icon: /* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(Icon, { component: UserSvg })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(DemoBlock, {
				title: "防盗链场景（referrerPolicy）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$32.jsxs)(import_jsx_runtime$32.Fragment, { children: [
					"部分 CDN（如腾讯乐享）会校验 Referer，跨域加载头像必须设置",
					/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("code", { children: "referrerPolicy=\"no-referrer\"" }),
					"。透传给底层",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("code", { children: "<img>" }),
					"。"
				] }),
				code: `<Avatar
  src={lexiangAvatarUrl}
  referrerPolicy="no-referrer"
  alt={user.name}
>
  {user.name}
</Avatar>`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(Avatar, {
					src: SAMPLE_IMG,
					referrerPolicy: "no-referrer",
					alt: "no-referrer demo"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$32.jsxs)(DemoBlock, {
				title: "业务自定义渐变背景（style 透传）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$32.jsxs)(import_jsx_runtime$32.Fragment, { children: [
					"Avatar 默认 fallback 用中性灰底 ",
					/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("code", { children: "--wb-bg-tertiary" }),
					"。 业务需要\"按 name 哈希出渐变色\"时（如专家卡片），通过",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("code", { children: "style" }),
					" 透传 ",
					/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("code", { children: "background" }),
					" 即可。 渐变色板 token 化是 v0.3 的事，本次组件不内置（详见下方 GapsBlock）。"
				] }),
				code: `function getAvatarBackground(name: string) {
  const palette = ['linear-gradient(135deg, #667eea, #764ba2)', /* ... */];
  return palette[hash(name) % palette.length];
}

<Avatar
  shape="square"
  size="large"
  style={{ background: getAvatarBackground(name) }}
>
  {name}
</Avatar>`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(Avatar, {
						shape: "square",
						size: "large",
						style: {
							background: "linear-gradient(135deg, #667eea, #764ba2)",
							color: "#fff"
						},
						children: "Alice"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(Avatar, {
						shape: "square",
						size: "large",
						style: {
							background: "linear-gradient(135deg, #f093fb, #f5576c)",
							color: "#fff"
						},
						children: "Bob"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(Avatar, {
						shape: "square",
						size: "large",
						style: {
							background: "linear-gradient(135deg, #4facfe, #00f2fe)",
							color: "#fff"
						},
						children: "Carol"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(Avatar, {
						shape: "square",
						size: "large",
						style: {
							background: "linear-gradient(135deg, #43e97b, #38f9d7)",
							color: "#fff"
						},
						children: "Dave"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(DemoBlock, {
				title: "Avatar.Group 多头像堆叠（v0.2.3 自落地）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$32.jsxs)(import_jsx_runtime$32.Fragment, { children: [
					"对齐 antd ",
					/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("code", { children: "Avatar.Group" }),
					"。子节点必须是 ",
					/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("code", { children: "Avatar" }),
					"； 重叠堆叠效果通过 ",
					/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("code", { children: "margin-left: -8px" }),
					" + ",
					/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("code", { children: "box-shadow" }),
					" ",
					"切割实现。",
					/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("code", { children: "maxCount" }),
					" 限制最多展示几个 Avatar，超出渲染",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("code", { children: "+N" }),
					" 兜底 chip。group 级 ",
					/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("code", { children: "size" }),
					" / ",
					/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("code", { children: "shape" }),
					" ",
					"会下传到子 Avatar，子 Avatar 自身的 size/shape 优先级更高。"
				] }),
				code: `{/* 基础堆叠 */}
<Avatar.Group>
  <Avatar src={url1} alt="A" />
  <Avatar src={url2} alt="B" />
  <Avatar>C</Avatar>
  <Avatar style={{ background: '#7c3aed', color: '#fff' }}>D</Avatar>
</Avatar.Group>

{/* 限制最多展示 3 个，溢出展示 +N */}
<Avatar.Group maxCount={3}>
  <Avatar>A</Avatar>
  <Avatar>B</Avatar>
  <Avatar>C</Avatar>
  <Avatar>D</Avatar>
  <Avatar>E</Avatar>
</Avatar.Group>

{/* group 级统一 size / shape */}
<Avatar.Group size="large" shape="square">
  <Avatar src={url1} alt="A" />
  <Avatar>B</Avatar>
  <Avatar>C</Avatar>
</Avatar.Group>`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(AvatarGroupDemo, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(AvatarGapsBlock, {})
		]
	});
}
function AvatarGroupDemo() {
	return /* @__PURE__ */ (0, import_jsx_runtime$32.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 16,
			alignItems: "flex-start"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$32.jsxs)("div", {
				style: {
					display: "flex",
					flexDirection: "column",
					gap: 6
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("div", {
					style: {
						fontSize: 12,
						color: "var(--wb-color-text-tertiary)"
					},
					children: "基础堆叠"
				}), /* @__PURE__ */ (0, import_jsx_runtime$32.jsxs)(Avatar.Group, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(Avatar, {
						src: SAMPLE_IMG,
						alt: "A"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(Avatar, {
						style: {
							background: "#7c3aed",
							color: "#fff"
						},
						children: "B"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(Avatar, {
						style: {
							background: "#0ea5e9",
							color: "#fff"
						},
						children: "C"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(Avatar, {
						style: {
							background: "#f97316",
							color: "#fff"
						},
						children: "D"
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$32.jsxs)("div", {
				style: {
					display: "flex",
					flexDirection: "column",
					gap: 6
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("div", {
					style: {
						fontSize: 12,
						color: "var(--wb-color-text-tertiary)"
					},
					children: "maxCount=3，溢出 +2"
				}), /* @__PURE__ */ (0, import_jsx_runtime$32.jsxs)(Avatar.Group, {
					maxCount: 3,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(Avatar, { children: "A" }),
						/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(Avatar, { children: "B" }),
						/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(Avatar, { children: "C" }),
						/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(Avatar, { children: "D" }),
						/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(Avatar, { children: "E" })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$32.jsxs)("div", {
				style: {
					display: "flex",
					flexDirection: "column",
					gap: 6
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("div", {
					style: {
						fontSize: 12,
						color: "var(--wb-color-text-tertiary)"
					},
					children: "group size=large + shape=square"
				}), /* @__PURE__ */ (0, import_jsx_runtime$32.jsxs)(Avatar.Group, {
					size: "large",
					shape: "square",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(Avatar, {
							src: SAMPLE_IMG,
							alt: "A"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(Avatar, {
							style: {
								background: "#7c3aed",
								color: "#fff"
							},
							children: "B"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(Avatar, {
							style: {
								background: "#0ea5e9",
								color: "#fff"
							},
							children: "C"
						})
					]
				})]
			})
		]
	});
}
/**
* 能力缺口公示 —— 与 docs/avatar-design-gaps.md 保持一致（如尚未建文档则待补）。
*/
function AvatarGapsBlock() {
	return /* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(GapsBlock, {
		gapDocPath: "docs/avatar-design-gaps.md",
		blocking: [
			{
				title: "fallback 渐变色板 token",
				description: "业务侧目前用 --ec-avatar-fallback-bg-1..8（专家中心私有 token），未收敛到 wb-* 命名空间。本次按规则 1（业务 PR 不顺手改 token）只提供 style 透传；token 收敛留 v0.3 单独 PR。"
			},
			{
				title: "角标（badge / 状态点）",
				description: "业务里通过外层 wrapper（如 AmbassadorAvatarWrapper / user-menu-trigger-avatar-badge）实现，本组件不内置。是否需要标准 badge 槽位由 v0.3 评审决定。"
			},
			{
				title: "响应式 size 对象（antd: size={{ xs, sm, md, lg, xl, xxl }}）",
				description: "antd 4.7.0+ 支持按视口断点切尺寸；WorkBuddy Desktop 无断点、Web 端目前也没断点设计稿，本次不做。现有 number / preset API 与未来加该能力兼容，不会破坏调用方。"
			},
			{
				title: "src 支持 ReactNode（antd: src={<img />}）",
				description: "antd 4.8.0+ 允许直接传 <img>/<picture> 自定义渲染（多源 / lazy load）。本次只接 string，业务暂未踩到；待业务明确需要再补。"
			},
			{
				title: "gap + 字符自动字号缩放（antd: gap）",
				description: "antd 4.3.0+：当 children 文字宽度超 size − 2×gap 时自动 transform: scale 缩小。我们文字 fallback 只取首字符，不会超出，本次不实现；若未来允许\"AB\"两字符再补。"
			},
			{
				title: "draggable 可控（antd: draggable）",
				description: "antd 默认 true，可关闭。本次硬编码 draggable={false}（更稳的默认值），未暴露 prop。业务明确需要可拖动头像时再开放。"
			}
		],
		pending: [
			{
				title: "Avatar.Group 重叠间距 -8px（v0.2.3 自落地）",
				description: "负 margin -8px + 2px 容器底色 box-shadow 切割，按 antd 默认 + 业务实测兜底；待设计师补 token。"
			},
			{
				title: "Avatar.Group +N 溢出 chip",
				description: "溢出后渲染同尺寸的 +N 数字头像；底色复用 --wb-bg-tertiary，文字 --wb-color-text-secondary。设计师未明示。"
			},
			{
				title: "字号缩放系数 0.4",
				description: "fontSize = max(12, round(size × 0.4))，参考 antd Avatar 默认行为；设计师未明示。"
			},
			{
				title: "square shape 圆角 6px",
				description: "复用 --wb-radius-md（卡片同款），与专家卡片实测视觉一致；待设计稿明确确认。"
			},
			{
				title: "fallback 底色 --wb-bg-tertiary",
				description: "面板三级灰兜底；icon fallback 颜色用 --wb-icon-secondary 弱一档。设计师 review 是否合适。"
			},
			{
				title: "可点击形态的 hover/focus/active 反馈",
				description: "Avatar 作为按钮使用时（onClick）的统一交互视觉未出图，目前完全靠业务侧自加。"
			}
		],
		footer: /* @__PURE__ */ (0, import_jsx_runtime$32.jsxs)(import_jsx_runtime$32.Fragment, { children: [
			"业务侧业务专属逻辑（如 ",
			/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("code", { children: "resolveAvatarUrl" }),
			" 拼 COS 路径、",
			/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("code", { children: "getAvatarFallbackBackground" }),
			" 哈希取色板）应保留在业务层， Avatar 仅接收已解析好的 ",
			/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("code", { children: "src" }),
			" 与 ",
			/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("code", { children: "style.background" }),
			"。"
		] })
	});
}
var import_jsx_runtime$32, SAMPLE_IMG, BROKEN_IMG;
var init_AvatarPage = __esmMin((() => {
	require_react();
	init_Avatar();
	init_Icon();
	init_DemoBlock();
	init_GapsBlock();
	import_jsx_runtime$32 = require_jsx_runtime();
	SAMPLE_IMG = "https://i.pravatar.cc/120?img=12";
	BROKEN_IMG = "https://this-domain-does-not-exist.invalid/avatar.png";
}));
//#endregion
//#region ../../packages/agent-ui/src/playbook/pages/components/BreadcrumbPage.tsx
function BreadcrumbPage(props) {
	const ALL_LABELS = [
		"项目",
		"设计系统全流程周期",
		"每天早上9点同步工作进度"
	];
	const levels = Math.min(Math.max(props.levels, 1), ALL_LABELS.length);
	return /* @__PURE__ */ (0, import_jsx_runtime$31.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 16,
			alignItems: "flex-start",
			width: "100%"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime$31.jsx)(Breadcrumb, {
			items: ALL_LABELS.slice(0, levels).map((label, idx, arr) => ({
				key: `lvl-${idx}`,
				label,
				href: props.interactive && idx < arr.length - 1 ? "#" : void 0
			})),
			separator: props.separator,
			leadingIcon: props.leadingIcon ? /* @__PURE__ */ (0, import_jsx_runtime$31.jsx)(FolderIcon, {}) : void 0,
			highlightLast: props.highlightLast
		}), /* @__PURE__ */ (0, import_jsx_runtime$31.jsxs)("div", {
			style: {
				fontSize: "var(--wb-font-caption-size)",
				color: "var(--wb-color-text-tertiary)"
			},
			children: [
				"视觉对齐 ardot 674:548 / 674:550 —— 项 / 分隔符 / icon 默认复用 ",
				/* @__PURE__ */ (0, import_jsx_runtime$31.jsx)("code", { children: "--wb-color-text-secondary" }),
				"（light #5a5a5a ≈ 黑 65%，与设计稿黑 65% 实质等效；dark #b0b0b0 ≈ 白 69%，与设计稿白 65% 有 ~4% 合理偏差）； 字 14 / 22；项间距 8。",
				" ",
				"highlightLast 取自 ardot 368:1544;…;206:93 交互稿\"项目 / 设计系统全流程周期\"形态， 末项用 ",
				/* @__PURE__ */ (0, import_jsx_runtime$31.jsx)("code", { children: "--wb-text-strong" }),
				"（黑 96%，与设计稿黑 90% 有 ~2% 偏差）+ 字重 ",
				/* @__PURE__ */ (0, import_jsx_runtime$31.jsx)("code", { children: "--wb-font-body-strong-weight" }),
				"（600）。"
			]
		})]
	});
}
/**
* 仿 antd 文档"分块 demo"版式。每块独立的演示区 + 标题 + 中文说明。
* 严格按 v0.2 设计稿，不展示设计稿未定义的形态。
*/
function BreadcrumbVariants() {
	return /* @__PURE__ */ (0, import_jsx_runtime$31.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 16
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$31.jsx)(DemoBlock, {
				title: "基础用法（1 层）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$31.jsx)(import_jsx_runtime$31.Fragment, { children: "最常见的退化形态，对应 ardot 中\"动态 / 计划 / 任务 / 资产\"四张主框架变体， 面包屑只展示当前所在的根目录名。" }),
				code: "<Breadcrumb items={[{ key: 'p', label: '项目' }]} />",
				children: /* @__PURE__ */ (0, import_jsx_runtime$31.jsx)(Breadcrumb, { items: [{
					key: "p",
					label: "项目"
				}] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$31.jsx)(DemoBlock, {
				title: "多层（设计稿子任务变体 674:494）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$31.jsx)(import_jsx_runtime$31.Fragment, { children: "ardot 中\"打开子任务\"变体下面包屑扩展到 2 层；本组件 items 数组按顺序渲染， 分隔符自动插入。" }),
				code: `<Breadcrumb
  items={[
    // 想接 React Router 之类，给 onClick 拦截原生跳转，业务侧自己 navigate
    { key: 'p', label: '项目', href: '#', onClick: e => { e.preventDefault(); navigate('/projects'); } },
    { key: 'd', label: '设计系统全流程周期' },
  ]}
/>`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$31.jsx)(Breadcrumb, { items: [{
					key: "p",
					label: "项目",
					href: "#"
				}, {
					key: "d",
					label: "设计系统全流程周期"
				}] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$31.jsx)(DemoBlock, {
				title: "带 leading icon",
				description: /* @__PURE__ */ (0, import_jsx_runtime$31.jsx)(import_jsx_runtime$31.Fragment, { children: "设计稿在第一项前预留 16×16 槽位（多张设计稿默认 visible=false）。 业务侧需要图标时，传入 SVG ReactNode 即可。" }),
				code: `<Breadcrumb
  leadingIcon={<FolderIcon />}
  items={[
    // 业务侧用 onClick 拦截跳转
    { key: 'p', label: '项目', href: '#', onClick: e => { e.preventDefault(); navigate('/projects'); } },
    { key: 'd', label: '设计系统全流程周期' },
  ]}
/>`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$31.jsx)(Breadcrumb, {
					leadingIcon: /* @__PURE__ */ (0, import_jsx_runtime$31.jsx)(FolderIcon, {}),
					items: [{
						key: "p",
						label: "项目",
						href: "#"
					}, {
						key: "d",
						label: "设计系统全流程周期"
					}]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$31.jsx)(DemoBlock, {
				title: "自定义分隔符",
				description: /* @__PURE__ */ (0, import_jsx_runtime$31.jsxs)(import_jsx_runtime$31.Fragment, { children: [
					"默认 ",
					/* @__PURE__ */ (0, import_jsx_runtime$31.jsx)("code", { children: "'/'" }),
					"（与设计稿字面值一致）；可传 ",
					/* @__PURE__ */ (0, import_jsx_runtime$31.jsx)("code", { children: "'›'" }),
					"、",
					/* @__PURE__ */ (0, import_jsx_runtime$31.jsx)("code", { children: "'>'" }),
					"、 任意 ReactNode（与 antd 一致）。"
				] }),
				code: `<Breadcrumb
  separator="›"
  items={[
    { key: 'p', label: '项目', href: '#' },
    { key: 'd', label: '设计系统全流程周期', href: '#' },
    { key: 't', label: '每天早上9点同步工作进度' },
  ]}
/>

<Breadcrumb
  separator=">"
  items={[
    { key: 'p', label: '项目', href: '#' },
    { key: 'd', label: '设计系统全流程周期', href: '#' },
    { key: 't', label: '每天早上9点同步工作进度' },
  ]}
/>`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$31.jsxs)("div", {
					style: {
						display: "flex",
						flexDirection: "column",
						gap: 8
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime$31.jsx)(Breadcrumb, {
						separator: "›",
						items: [
							{
								key: "p",
								label: "项目",
								href: "#"
							},
							{
								key: "d",
								label: "设计系统全流程周期",
								href: "#"
							},
							{
								key: "t",
								label: "每天早上9点同步工作进度"
							}
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime$31.jsx)(Breadcrumb, {
						separator: ">",
						items: [
							{
								key: "p",
								label: "项目",
								href: "#"
							},
							{
								key: "d",
								label: "设计系统全流程周期",
								href: "#"
							},
							{
								key: "t",
								label: "每天早上9点同步工作进度"
							}
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$31.jsx)(DemoBlock, {
				title: "可点击项（链接态兜底）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$31.jsxs)(import_jsx_runtime$31.Fragment, { children: [
					"设计稿未给链接态视觉，链接默认外观与文字态完全一致； hover 加下划线、focus 加品牌色描边为 a11y 兜底。 最后一项一般为当前页，建议不传 ",
					/* @__PURE__ */ (0, import_jsx_runtime$31.jsx)("code", { children: "href" }),
					"。"
				] }),
				code: `<Breadcrumb
  items={[
    { key: 'p', label: '项目', href: '#', onClick: e => e.preventDefault() },
    { key: 'd', label: '设计系统全流程周期', href: '#', onClick: e => e.preventDefault() },
    { key: 't', label: '每天早上9点同步工作进度' },
  ]}
/>`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$31.jsx)(Breadcrumb, { items: [
					{
						key: "p",
						label: "项目",
						href: "#",
						onClick: (e) => e.preventDefault()
					},
					{
						key: "d",
						label: "设计系统全流程周期",
						href: "#",
						onClick: (e) => e.preventDefault()
					},
					{
						key: "t",
						label: "每天早上9点同步工作进度"
					}
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$31.jsx)(DemoBlock, {
				title: "末项加深（highlightLast，对齐交互稿 368:1544）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$31.jsxs)(import_jsx_runtime$31.Fragment, { children: [
					"交互稿\"项目 / 设计系统全流程周期\"里末项视觉加深；本组件用 ",
					/* @__PURE__ */ (0, import_jsx_runtime$31.jsx)("code", { children: "highlightLast" }),
					" 开关控制， 末项色复用现有 ",
					/* @__PURE__ */ (0, import_jsx_runtime$31.jsx)("code", { children: "--wb-text-strong" }),
					"（黑 96%）+ 字重复用 ",
					/* @__PURE__ */ (0, import_jsx_runtime$31.jsx)("code", { children: "--wb-font-body-strong-weight" }),
					"（600）， 其余项 / 分隔符 / icon 仍为黑 65% / 400。 设计稿原色是黑 90%，因当前 token 体系无 90% 档，按\"复用现有 token、不为单点新增\"约定就近映射，~2% 偏差待官方 90% 档定义后切换。 字号沿用 14（设计稿同行的 12px\"H1\"在结构上不属于面包屑，不并入此组件）。"
				] }),
				code: `<Breadcrumb
  highlightLast
  items={[
    { key: 'p', label: '项目', href: '#' },
    { key: 'd', label: '设计系统全流程周期' },
  ]}
/>`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$31.jsx)(Breadcrumb, {
					highlightLast: true,
					items: [{
						key: "p",
						label: "项目",
						href: "#"
					}, {
						key: "d",
						label: "设计系统全流程周期"
					}]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$31.jsx)(BreadcrumbGapsBlock, {})
		]
	});
}
/** 与 ardot 设计稿截图同款 16×16 folder svg（leading icon 占位演示用） */
function FolderIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime$31.jsx)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime$31.jsx)("path", {
			d: "M2 4.5C2 3.67 2.67 3 3.5 3h3.17c.4 0 .78.16 1.06.44L8.5 4.21c.28.28.66.44 1.06.44h2.94c.83 0 1.5.67 1.5 1.5v5.85c0 .83-.67 1.5-1.5 1.5h-9C2.67 13.5 2 12.83 2 12V4.5Z",
			stroke: "currentColor",
			strokeWidth: "1.2",
			fill: "none"
		})
	});
}
/**
* 能力缺口公示（精简版） —— 与 antd Breadcrumb 标准能力对照。
*
* 长版见 docs/breadcrumb-design-gaps.md；任何一项落地后，**同时**从两处移除。
*/
function BreadcrumbGapsBlock() {
	return /* @__PURE__ */ (0, import_jsx_runtime$31.jsx)(GapsBlock, {
		gapDocPath: "docs/breadcrumb-design-gaps.md",
		blocking: [
			{
				title: "highlightLast 字号是否变化",
				description: /* @__PURE__ */ (0, import_jsx_runtime$31.jsxs)(import_jsx_runtime$31.Fragment, { children: [
					"交互稿 ardot 368:1544 同行整体看上去字号偏小（~12px），当前 ",
					/* @__PURE__ */ (0, import_jsx_runtime$31.jsx)("code", { children: "highlightLast" }),
					" 仅改色不改字号（沿用 14 / 22）。是否需要 ",
					/* @__PURE__ */ (0, import_jsx_runtime$31.jsx)("code", { children: "size: 'sm' | 'md'" }),
					" 维度，待设计澄清。"
				] })
			},
			{
				title: "hover / focus-visible 视觉",
				description: /* @__PURE__ */ (0, import_jsx_runtime$31.jsx)(import_jsx_runtime$31.Fragment, { children: "链接态设计稿未给规格，当前 hover 加下划线、focus 加品牌色描边均为 a11y 兜底。" })
			},
			{
				title: "disabled 项视觉",
				description: /* @__PURE__ */ (0, import_jsx_runtime$31.jsx)(import_jsx_runtime$31.Fragment, { children: "颜色 / 透明度 / 鼠标光标未定义。" })
			},
			{
				title: "分隔符颜色独立 token",
				description: /* @__PURE__ */ (0, import_jsx_runtime$31.jsxs)(import_jsx_runtime$31.Fragment, { children: [
					"是否要弱化分隔符色（如黑 35%）未定义；当前与文字共享 ",
					/* @__PURE__ */ (0, import_jsx_runtime$31.jsx)("code", { children: "--wb-color-text-secondary" }),
					"。"
				] })
			},
			{
				title: "响应式折叠",
				description: /* @__PURE__ */ (0, import_jsx_runtime$31.jsxs)(import_jsx_runtime$31.Fragment, { children: [
					"层级 > N 时省略中间项 + dropdown 展开（antd ",
					/* @__PURE__ */ (0, import_jsx_runtime$31.jsx)("code", { children: "maxItems" }),
					"），阈值 / 省略号样式未定义。"
				] })
			}
		],
		pending: [
			{
				title: /* @__PURE__ */ (0, import_jsx_runtime$31.jsxs)(import_jsx_runtime$31.Fragment, { children: ["antd ", /* @__PURE__ */ (0, import_jsx_runtime$31.jsx)("code", { children: "itemRender" })] }),
				description: /* @__PURE__ */ (0, import_jsx_runtime$31.jsxs)(import_jsx_runtime$31.Fragment, { children: [
					"完全自定义每项渲染。当前用 ",
					/* @__PURE__ */ (0, import_jsx_runtime$31.jsx)("code", { children: "label" }),
					" 接 ReactNode 已能覆盖大部分场景。"
				] })
			},
			{
				title: "antd dropdown / menu",
				description: /* @__PURE__ */ (0, import_jsx_runtime$31.jsx)(import_jsx_runtime$31.Fragment, { children: "每项右侧挂下拉子菜单。待与 Dropdown 联动模式由设计稿确认。" })
			},
			{
				title: "每项独立 icon",
				description: /* @__PURE__ */ (0, import_jsx_runtime$31.jsxs)(import_jsx_runtime$31.Fragment, { children: [
					"当前只支持容器级 ",
					/* @__PURE__ */ (0, import_jsx_runtime$31.jsx)("code", { children: "leadingIcon" }),
					"。需要每项带图标时可后续扩 ",
					/* @__PURE__ */ (0, import_jsx_runtime$31.jsx)("code", { children: "BreadcrumbItem.icon" }),
					"。"
				] })
			}
		],
		footer: /* @__PURE__ */ (0, import_jsx_runtime$31.jsxs)(import_jsx_runtime$31.Fragment, { children: [
			"v0.2 类型签名：",
			/* @__PURE__ */ (0, import_jsx_runtime$31.jsx)("code", { children: "items" }),
			" / ",
			/* @__PURE__ */ (0, import_jsx_runtime$31.jsx)("code", { children: "leadingIcon" }),
			" / ",
			/* @__PURE__ */ (0, import_jsx_runtime$31.jsx)("code", { children: "separator" }),
			" / ",
			/* @__PURE__ */ (0, import_jsx_runtime$31.jsx)("code", { children: "highlightLast" }),
			" / ",
			/* @__PURE__ */ (0, import_jsx_runtime$31.jsx)("code", { children: "className" }),
			"； 每项支持 ",
			/* @__PURE__ */ (0, import_jsx_runtime$31.jsx)("code", { children: "key" }),
			" / ",
			/* @__PURE__ */ (0, import_jsx_runtime$31.jsx)("code", { children: "label" }),
			" / ",
			/* @__PURE__ */ (0, import_jsx_runtime$31.jsx)("code", { children: "href" }),
			" / ",
			/* @__PURE__ */ (0, import_jsx_runtime$31.jsx)("code", { children: "onClick" }),
			"。"
		] })
	});
}
var import_jsx_runtime$31;
var init_BreadcrumbPage = __esmMin((() => {
	require_react();
	init_Breadcrumb();
	init_DemoBlock();
	init_GapsBlock();
	import_jsx_runtime$31 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/playbook/pages/components/ButtonPage.tsx
function ButtonPage(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime$30.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 16,
			alignItems: "flex-start"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(Button, {
			variant: props.variant,
			size: props.size,
			shape: props.shape,
			fullWidth: props.fullWidth,
			loading: props.loading,
			leftIcon: props.leftIcon || props.iconOnly ? PlusIcon : void 0,
			rightIcon: props.rightIcon ? ChevronDownIcon : void 0,
			iconOnly: props.iconOnly,
			"aria-label": props.iconOnly ? props.label || "icon button" : void 0,
			children: props.iconOnly ? null : props.label || "Click me"
		}), /* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("div", {
			style: {
				fontSize: "var(--wb-font-caption-size)",
				color: "var(--wb-color-text-tertiary)"
			},
			children: "Foundation Button 独立实现（不依赖 cb-chat-ui）。variant：primary / secondary / grey / ghost； size 三档（small=24 / medium=32 / large=48）；shape=circle 仅在 iconOnly 时生效。 通过 leftIcon / rightIcon / iconOnly 启用图标（16×16，颜色继承文字色）。"
		})]
	});
}
/**
* 仿 antd 文档的"分块 demo"版式。每块包含一个独立的演示区 + 标题 + 中文说明。
* 严格按 v0.2 设计稿，不展示 dashed/text/link/loading/disabled 等设计稿未定义的形态。
*/
function ButtonVariants() {
	return /* @__PURE__ */ (0, import_jsx_runtime$30.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 16
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$30.jsxs)(DemoBlock, {
				title: "类型",
				description: /* @__PURE__ */ (0, import_jsx_runtime$30.jsxs)(import_jsx_runtime$30.Fragment, { children: [
					"按钮一共有五种类型：主按钮 (",
					/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("code", { children: "primary" }),
					")、次按钮 (",
					/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("code", { children: "secondary" }),
					")、灰按钮 (",
					/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("code", { children: "grey" }),
					")、幽灵按钮 (",
					/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("code", { children: "ghost" }),
					") 和链接按钮 (",
					/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("code", { children: "link" }),
					")。主按钮在同一区域中最多只出现一次，用于最重要的操作； 次按钮用于次级操作；灰按钮用于弱化的操作（如取消、关闭等）； 幽灵按钮 default 完全透明、仅 hover/press 显形，用在 titlebar / 对话区悬浮操作条这类需要\"融入背景\"的位置；链接按钮无背景纯文字，用于行内跳转或次要文本操作。"
				] }),
				code: `<Button variant="primary">Primary Button</Button>
<Button variant="secondary">Secondary Button</Button>
<Button variant="grey">Grey Button</Button>
<Button variant="ghost">Ghost Button</Button>
<Button variant="link">Link Button</Button>`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(Button, {
						variant: "primary",
						children: "Primary Button"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(Button, {
						variant: "secondary",
						children: "Secondary Button"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(Button, {
						variant: "grey",
						children: "Grey Button"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(Button, {
						variant: "ghost",
						children: "Ghost Button"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(Button, {
						variant: "link",
						children: "Link Button"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(DemoBlock, {
				title: "尺寸",
				description: /* @__PURE__ */ (0, import_jsx_runtime$30.jsxs)(import_jsx_runtime$30.Fragment, { children: [
					"按钮有三档尺寸：大 (",
					/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("code", { children: "large" }),
					" = 48px)、中 (",
					/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("code", { children: "medium" }),
					" = 32px，默认)、 小 (",
					/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("code", { children: "small" }),
					" = 24px)。"
				] }),
				code: `{/* large = 48px */}
<Button variant="primary" size="large">primary</Button>
<Button variant="secondary" size="large">secondary</Button>
<Button variant="grey" size="large">grey</Button>
<Button variant="ghost" size="large">ghost</Button>
<Button variant="link" size="large">link</Button>

{/* medium = 32px（默认） */}
<Button variant="primary" size="medium">primary</Button>
<Button variant="secondary" size="medium">secondary</Button>
<Button variant="grey" size="medium">grey</Button>
<Button variant="ghost" size="medium">ghost</Button>
<Button variant="link" size="medium">link</Button>

{/* small = 24px */}
<Button variant="primary" size="small">primary</Button>
<Button variant="secondary" size="small">secondary</Button>
<Button variant="grey" size="small">grey</Button>
<Button variant="ghost" size="small">ghost</Button>
<Button variant="link" size="small">link</Button>`,
				children: [
					"large",
					"medium",
					"small"
				].map((size) => /* @__PURE__ */ (0, import_jsx_runtime$30.jsxs)("div", {
					style: sizeGroupStyle,
					children: [/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("span", {
						style: sizeLabelStyle,
						children: sizeLabelMap[size]
					}), allVariants.map((variant) => /* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(Button, {
						variant,
						size,
						children: variant
					}, `${size}-${variant}`))]
				}, size))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$30.jsxs)(DemoBlock, {
				title: "图标",
				description: /* @__PURE__ */ (0, import_jsx_runtime$30.jsxs)(import_jsx_runtime$30.Fragment, { children: [
					"通过 ",
					/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("code", { children: "leftIcon" }),
					" / ",
					/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("code", { children: "rightIcon" }),
					" 属性可以在按钮文案的 左右两侧添加图标，图标尺寸按 size 走（默认 16×16，small 12×12），颜色自动继承 文字色，间距按 size 走（large 8px / medium 4px / small 4px）。设置",
					/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("code", { children: "iconOnly" }),
					" 时按钮变为等高方形（large=48 / medium=32 / small=24）， 仅渲染图标。设计稿 ardot 229:56 内部预留了左右 icon 槽位（默认隐藏）， 这里把它们暴露成可选的 props。"
				] }),
				code: `{/* 左图标（leftIcon）+ 文字 */}
<Button variant="primary" size="large" leftIcon={<PlusIcon />}>新建</Button>
<Button variant="secondary" size="large" leftIcon={<SearchIcon />}>搜索</Button>
<Button variant="primary" size="small" leftIcon={<PlusIcon />}>添加</Button>
<Button variant="secondary" size="small" leftIcon={<SearchIcon />}>搜索</Button>
<Button variant="grey" size="small" leftIcon={<SearchIcon />}>过滤</Button>

{/* 右图标（rightIcon）+ 文字 */}
<Button variant="primary" size="large" rightIcon={<ChevronDownIcon />}>更多</Button>

{/* iconOnly：等高方形 */}
<Button variant="primary" size="large" iconOnly leftIcon={<PlusIcon />} aria-label="新建" />
<Button variant="secondary" size="large" iconOnly leftIcon={<SearchIcon />} aria-label="搜索" />
<Button variant="secondary" size="small" iconOnly leftIcon={<SearchIcon />} aria-label="搜索" />
<Button variant="grey" size="small" iconOnly leftIcon={<SearchIcon />} aria-label="搜索" />`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$30.jsxs)("div", {
						style: sizeGroupStyle,
						children: [/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("span", {
							style: sizeLabelStyle,
							children: "左图标（leftIcon）+ 文案"
						}), [
							"large",
							"medium",
							"small"
						].map((size) => /* @__PURE__ */ (0, import_jsx_runtime$30.jsxs)(import_react$30.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("span", {
							style: sizeSubLabelStyle,
							children: sizeLabelMap[size]
						}), iconVariants.map((variant) => /* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(Button, {
							variant,
							size,
							leftIcon: variant === "primary" ? PlusIcon : SearchIcon$1,
							children: variant
						}, `${size}-${variant}`))] }, size))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$30.jsxs)("div", {
						style: sizeGroupStyle,
						children: [/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("span", {
							style: sizeLabelStyle,
							children: "右图标（rightIcon）+ 文案"
						}), [
							"large",
							"medium",
							"small"
						].map((size) => /* @__PURE__ */ (0, import_jsx_runtime$30.jsxs)(import_react$30.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("span", {
							style: sizeSubLabelStyle,
							children: sizeLabelMap[size]
						}), iconVariants.map((variant) => /* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(Button, {
							variant,
							size,
							rightIcon: ChevronDownIcon,
							children: variant
						}, `${size}-${variant}`))] }, size))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$30.jsxs)("div", {
						style: sizeGroupStyle,
						children: [/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("span", {
							style: sizeLabelStyle,
							children: "仅图标（iconOnly）"
						}), [
							"large",
							"medium",
							"small"
						].map((size) => /* @__PURE__ */ (0, import_jsx_runtime$30.jsxs)(import_react$30.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("span", {
							style: sizeSubLabelStyle,
							children: sizeLabelMap[size]
						}), iconVariants.map((variant) => /* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(Button, {
							variant,
							size,
							iconOnly: true,
							leftIcon: variant === "primary" ? PlusIcon : SearchIcon$1,
							"aria-label": variant
						}, `${size}-${variant}`))] }, size))]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$30.jsxs)(DemoBlock, {
				title: "Ghost & 圆形",
				description: /* @__PURE__ */ (0, import_jsx_runtime$30.jsxs)(import_jsx_runtime$30.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("code", { children: "variant=\"ghost\"" }),
					" 是 wb 自有的\"无底色\"按钮：default 完全透明、 hover/press 才显形，用于 titlebar 操作条、对话区悬浮工具条这类需要\"融入背景\" 的位置。",
					/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("code", { children: "shape=\"circle\"" }),
					" 把 iconOnly 按钮的胶囊圆角改为正圆 （border-radius: 50%），仅在 iconOnly 时生效，常和 ",
					/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("code", { children: "ghost" }),
					"组合得到经典的圆形热区按钮（large=48×48 / medium=32×32 / small=24×24）。 下方第一组演示 ghost 文字按钮，第二组是 ghost + iconOnly 方形， 第三组是 ghost + iconOnly + circle 圆形（titlebar 风格）。"
				] }),
				code: `{/* ghost 文字按钮（很少见，多用于内嵌操作条） */}
<Button variant="ghost" size="large">Ghost Large</Button>
<Button variant="ghost" size="medium">Ghost Medium</Button>
<Button variant="ghost" size="small">Ghost Small</Button>

{/* ghost + iconOnly：无底色方形按钮 */}
<Button variant="ghost" size="large" iconOnly leftIcon={<PlusIcon />} aria-label="新建" />
<Button variant="ghost" size="medium" iconOnly leftIcon={<SearchIcon />} aria-label="搜索" />
<Button variant="ghost" size="small" iconOnly leftIcon={<SearchIcon />} aria-label="搜索" />

{/* ghost + iconOnly + shape="circle"：titlebar 圆形热区 */}
<Button variant="ghost" size="large" iconOnly shape="circle" leftIcon={<PlusIcon />} aria-label="新建" />
<Button variant="ghost" size="medium" iconOnly shape="circle" leftIcon={<SearchIcon />} aria-label="搜索" />
<Button variant="ghost" size="small" iconOnly shape="circle" leftIcon={<SearchIcon />} aria-label="搜索" />

{/* circle 也可以套在 grey / secondary 上，不过 titlebar 场景一般还是 ghost */}
<Button variant="grey" size="small" iconOnly shape="circle" leftIcon={<SearchIcon />} aria-label="搜索" />
<Button variant="secondary" size="small" iconOnly shape="circle" leftIcon={<SearchIcon />} aria-label="搜索" />`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$30.jsxs)("div", {
						style: sizeGroupStyle,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("span", {
								style: sizeLabelStyle,
								children: "ghost 文字按钮"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(Button, {
								variant: "ghost",
								size: "large",
								children: "Ghost Large"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(Button, {
								variant: "ghost",
								size: "medium",
								children: "Ghost Medium"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(Button, {
								variant: "ghost",
								size: "small",
								children: "Ghost Small"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$30.jsxs)("div", {
						style: sizeGroupStyle,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("span", {
								style: sizeLabelStyle,
								children: "ghost + iconOnly 方形"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(Button, {
								variant: "ghost",
								size: "large",
								iconOnly: true,
								leftIcon: PlusIcon,
								"aria-label": "新建"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(Button, {
								variant: "ghost",
								size: "medium",
								iconOnly: true,
								leftIcon: SearchIcon$1,
								"aria-label": "搜索"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(Button, {
								variant: "ghost",
								size: "small",
								iconOnly: true,
								leftIcon: SearchIcon$1,
								"aria-label": "搜索"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$30.jsxs)("div", {
						style: sizeGroupStyle,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("span", {
								style: sizeLabelStyle,
								children: "ghost + iconOnly + circle 圆形"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(Button, {
								variant: "ghost",
								size: "large",
								iconOnly: true,
								shape: "circle",
								leftIcon: PlusIcon,
								"aria-label": "新建"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(Button, {
								variant: "ghost",
								size: "medium",
								iconOnly: true,
								shape: "circle",
								leftIcon: SearchIcon$1,
								"aria-label": "搜索"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(Button, {
								variant: "ghost",
								size: "small",
								iconOnly: true,
								shape: "circle",
								leftIcon: SearchIcon$1,
								"aria-label": "搜索"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(Button, {
								variant: "grey",
								size: "small",
								iconOnly: true,
								shape: "circle",
								leftIcon: SearchIcon$1,
								"aria-label": "搜索"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(Button, {
								variant: "secondary",
								size: "small",
								iconOnly: true,
								shape: "circle",
								leftIcon: SearchIcon$1,
								"aria-label": "搜索"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$30.jsxs)(DemoBlock, {
				title: "危险按钮",
				description: /* @__PURE__ */ (0, import_jsx_runtime$30.jsxs)(import_jsx_runtime$30.Fragment, { children: [
					"通过 ",
					/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("code", { children: "danger" }),
					" 标志（与 antd 一致，独立于 variant）把按钮渲染为 危险态：",
					/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("code", { children: "primary + danger" }),
					" 红底白字（删除 / 高危确认），",
					/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("code", { children: "secondary / grey / ghost + danger" }),
					" 仅文字变红、底色保留各 variant 的视觉。本次设计稿只给了 ",
					/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("code", { children: "primary + danger" }),
					" 的视觉， 其他 variant + danger 沿用之前实现（文字色用 ",
					/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("code", { children: "--wb-status-error" }),
					"派生），待设计师事后补稿钉死。"
				] }),
				code: `{/* 实心红底（删除 / 高危确认） */}
<Button variant="primary" danger>删除</Button>
<Button variant="primary" danger leftIcon={<PlusIcon />}>删除项目</Button>

{/* 红字（保留各 variant 底色） */}
<Button variant="secondary" danger>取消订阅</Button>
<Button variant="grey" danger>移除</Button>
<Button variant="ghost" danger>放弃修改</Button>

{/* 配合 disabled */}
<Button variant="primary" danger disabled>删除</Button>
<Button variant="secondary" danger disabled>取消订阅</Button>
<Button variant="grey" danger disabled>移除</Button>
<Button variant="ghost" danger disabled>放弃修改</Button>

{/* iconOnly + circle + danger */}
<Button variant="ghost" iconOnly shape="circle" danger leftIcon={<PlusIcon />} aria-label="删除" />`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$30.jsxs)("div", {
						style: sizeGroupStyle,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("span", {
								style: sizeLabelStyle,
								children: "实心红底（primary + danger）"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(Button, {
								variant: "primary",
								danger: true,
								children: "删除"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(Button, {
								variant: "primary",
								danger: true,
								leftIcon: PlusIcon,
								children: "删除项目"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$30.jsxs)("div", {
						style: sizeGroupStyle,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("span", {
								style: sizeLabelStyle,
								children: "红字（保留各 variant 底色）"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(Button, {
								variant: "secondary",
								danger: true,
								children: "取消订阅"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(Button, {
								variant: "grey",
								danger: true,
								children: "移除"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(Button, {
								variant: "ghost",
								danger: true,
								children: "放弃修改"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$30.jsxs)("div", {
						style: sizeGroupStyle,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("span", {
								style: sizeLabelStyle,
								children: "配合 disabled"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(Button, {
								variant: "primary",
								danger: true,
								disabled: true,
								children: "删除"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(Button, {
								variant: "secondary",
								danger: true,
								disabled: true,
								children: "取消订阅"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(Button, {
								variant: "grey",
								danger: true,
								disabled: true,
								children: "移除"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(Button, {
								variant: "ghost",
								danger: true,
								disabled: true,
								children: "放弃修改"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$30.jsxs)("div", {
						style: sizeGroupStyle,
						children: [/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("span", {
							style: sizeLabelStyle,
							children: "iconOnly + circle + danger"
						}), /* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(Button, {
							variant: "ghost",
							iconOnly: true,
							shape: "circle",
							danger: true,
							leftIcon: PlusIcon,
							"aria-label": "删除"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$30.jsxs)(DemoBlock, {
				title: "不可用状态",
				description: /* @__PURE__ */ (0, import_jsx_runtime$30.jsxs)(import_jsx_runtime$30.Fragment, { children: [
					"通过原生 ",
					/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("code", { children: "disabled" }),
					" 属性禁用按钮，按钮变得不可点击且",
					/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("code", { children: "cursor: not-allowed" }),
					"。所有 variant（primary / secondary / grey / ghost / link）均有对应禁用色板，按设计稿 ardot 229:58 钉死：",
					/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("code", { children: "primary" }),
					" 用半透明黑底（20%）+ 白字、",
					/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("code", { children: "secondary" }),
					" 保留白底 + 浅灰描边 + 30% 黑字、",
					/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("code", { children: "grey" }),
					" 用浅灰底 + 30% 黑字、",
					/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("code", { children: "ghost" }),
					" 透明底 + 30% 黑字、",
					/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("code", { children: "link" }),
					" 透明底 + 浅蓝字。",
					/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("code", { children: "danger + disabled" }),
					" 组合时，danger 的红色文字也会进入对应的 disabled 弱化态。本次设计稿只给了 ",
					/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("code", { children: "primary + danger" }),
					" 的视觉， 其他 variant + danger 沿用之前实现（文字色用 ",
					/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("code", { children: "--wb-status-error" }),
					"派生），待设计师事后补稿钉死。disabled 状态会移除 hover/active 反馈，且优先级高于 hover。"
				] }),
				code: `{/* 各 variant disabled */}
<Button variant="primary" disabled>Primary</Button>
<Button variant="secondary" disabled>Secondary</Button>
<Button variant="grey" disabled>Grey</Button>
<Button variant="ghost" disabled>Ghost</Button>
<Button variant="link" disabled>Link</Button>

{/* 图标按钮也支持 disabled */}
<Button variant="primary" disabled leftIcon={<PlusIcon />}>新建</Button>
<Button variant="secondary" disabled iconOnly leftIcon={<SearchIcon />} aria-label="搜索" />

{/* danger + disabled */}
<Button variant="primary" danger disabled>删除</Button>
<Button variant="secondary" danger disabled>取消订阅</Button>
<Button variant="grey" danger disabled>移除</Button>
<Button variant="ghost" danger disabled>放弃修改</Button>`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$30.jsxs)("div", {
						style: sizeGroupStyle,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("span", {
								style: sizeLabelStyle,
								children: "各 variant disabled"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(Button, {
								variant: "primary",
								disabled: true,
								children: "Primary"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(Button, {
								variant: "secondary",
								disabled: true,
								children: "Secondary"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(Button, {
								variant: "grey",
								disabled: true,
								children: "Grey"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(Button, {
								variant: "ghost",
								disabled: true,
								children: "Ghost"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(Button, {
								variant: "link",
								disabled: true,
								children: "Link"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$30.jsxs)("div", {
						style: sizeGroupStyle,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("span", {
								style: sizeLabelStyle,
								children: "图标按钮 disabled"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(Button, {
								variant: "primary",
								disabled: true,
								leftIcon: PlusIcon,
								children: "新建"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(Button, {
								variant: "secondary",
								disabled: true,
								iconOnly: true,
								leftIcon: SearchIcon$1,
								"aria-label": "搜索"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$30.jsxs)("div", {
						style: sizeGroupStyle,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("span", {
								style: sizeLabelStyle,
								children: "danger + disabled"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(Button, {
								variant: "primary",
								danger: true,
								disabled: true,
								children: "删除"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(Button, {
								variant: "secondary",
								danger: true,
								disabled: true,
								children: "取消订阅"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(Button, {
								variant: "grey",
								danger: true,
								disabled: true,
								children: "移除"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(Button, {
								variant: "ghost",
								danger: true,
								disabled: true,
								children: "放弃修改"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$30.jsxs)(DemoBlock, {
				title: "加载状态",
				description: /* @__PURE__ */ (0, import_jsx_runtime$30.jsxs)(import_jsx_runtime$30.Fragment, { children: [
					"通过 ",
					/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("code", { children: "loading" }),
					" 属性让按钮进入加载态：自动 disabled 防止重复点击， 内容半透明 + 显示旋转 spinner。spinner 颜色按 variant 派生 （primary 白、secondary/grey/ghost 黑、link 蓝、danger 白）。适用于异步操作 （保存、提交、删除确认等）。"
				] }),
				code: `{/* 各 variant loading */}
<Button variant="primary" loading>保存中…</Button>
<Button variant="secondary" loading>加载中</Button>
<Button variant="grey" loading>处理中</Button>
<Button variant="ghost" loading>提交中</Button>
<Button variant="link" loading>跳转中</Button>

{/* danger + loading */}
<Button variant="primary" danger loading>删除中…</Button>
<Button variant="secondary" danger loading>取消订阅中</Button>
<Button variant="grey" danger loading>移除中</Button>
<Button variant="ghost" danger loading>放弃修改中</Button>`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$30.jsxs)("div", {
					style: sizeGroupStyle,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("span", {
							style: sizeLabelStyle,
							children: "各 variant loading"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(Button, {
							variant: "primary",
							loading: true,
							children: "保存中…"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(Button, {
							variant: "secondary",
							loading: true,
							children: "加载中"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(Button, {
							variant: "grey",
							loading: true,
							children: "处理中"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(Button, {
							variant: "ghost",
							loading: true,
							children: "提交中"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(Button, {
							variant: "link",
							loading: true,
							children: "跳转中"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime$30.jsxs)("div", {
					style: sizeGroupStyle,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("span", {
							style: sizeLabelStyle,
							children: "danger + loading"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(Button, {
							variant: "primary",
							danger: true,
							loading: true,
							children: "删除中…"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(Button, {
							variant: "secondary",
							danger: true,
							loading: true,
							children: "取消订阅中"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(Button, {
							variant: "grey",
							danger: true,
							loading: true,
							children: "移除中"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(Button, {
							variant: "ghost",
							danger: true,
							loading: true,
							children: "放弃修改中"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(DemoBlock, {
				title: "宽度撑满",
				description: /* @__PURE__ */ (0, import_jsx_runtime$30.jsxs)(import_jsx_runtime$30.Fragment, { children: [
					"通过 ",
					/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("code", { children: "fullWidth" }),
					" 属性可以让按钮宽度自动撑满父容器，常用于 移动端或表单提交按钮。"
				] }),
				code: "<Button variant=\"primary\" fullWidth>Full Width Button</Button>",
				children: /* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("div", {
					style: { width: "100%" },
					children: /* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(Button, {
						variant: "primary",
						fullWidth: true,
						children: "Full Width Button"
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(ButtonGapsBlock, {})
		]
	});
}
/**
* 能力缺口公示 —— 与 docs/button-design-gaps.md 保持一致。
*
* 为什么放在 demo 最下面而不是只放 docs：
*   - demo 页是开发实际复用 wb-button 时第一眼看到的地方
*   - 把"还没有的能力"显式列在这里，可以避免业务方误以为某些形态（hover/disabled/
*     loading/danger/icon-only 等）已经支持，从而走错路径
*
* 注意：本块只列「现状」，不展示假视觉。任何一项落地后，把它从 docs 和这里同步移除。
*/
function ButtonGapsBlock() {
	return /* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(GapsBlock, {
		gapDocPath: "docs/button-design-gaps.md",
		blocking: [
			{
				title: "focus-visible 视觉",
				description: "键盘聚焦的 outline / ring 色板和粗细未定义；当前用浏览器默认。"
			},
			{
				title: "宽度策略",
				description: "\"大=80 / 小=66\" 是定宽、min-width 还是 hug-content 未定义。"
			},
			{
				title: "\"大 + grey\" 是否存在",
				description: "设计稿未出图；不存在则后续会在 TS 类型上禁掉该组合。"
			}
		],
		pending: [
			{
				title: "ghost variant 已自落地，待事后补稿",
				description: "titlebar / 操作条强需求，wb 自定 hover 黑 5%/白 6%、press 黑 8%/白 10%；设计稿钉死前可能微调。"
			},
			{
				title: "shape=circle 已自落地，待事后补稿",
				description: "当前仅 border-radius: 50%；focus / hover 是否要单独 ring 视觉待设计师定。"
			},
			{
				title: "danger flag 已自落地，待事后补稿",
				description: "色板沿用 --wb-status-error 派生（primary+danger 红底 / 其它 variant 红字）；设计师专用 danger 红色与 secondary+danger 描边等细节待补稿。"
			},
			{
				title: "link 形态",
				description: "（无背景纯文字按钮）：设计稿未出图，目前 ghost 已能覆盖大多数场景；如需带下划线 / 品牌色的 link 再补 variant。"
			},
			{
				title: "默认字重",
				description: "（500 vs 600）：暂用 cb 默认 500。"
			},
			{
				title: "secondary 描边粗细",
				description: "（1 / 1.5 / 2px）：暂用 1px。"
			}
		],
		footer: /* @__PURE__ */ (0, import_jsx_runtime$30.jsxs)(import_jsx_runtime$30.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("code", { children: "disabled" }),
			" 视觉已按 ardot 229:58 落地（见上方「不可用状态」demo）。",
			/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("code", { children: "ghost" }),
			" variant 与 ",
			/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("code", { children: "shape='circle'" }),
			" 已 wb 自落地（见上方「Ghost & 圆形」demo）， 待补稿后由 foundation 再行二次校准。",
			/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("code", { children: "loading" }),
			" 已实现（spinner 动画 + 自动 disabled，见上方「加载状态」demo）， spinner 视觉待设计师出稿后可能微调位置与尺寸。"
		] })
	});
}
var import_react$30, import_jsx_runtime$30, PlusIcon, SearchIcon$1, ChevronDownIcon, allVariants, iconVariants, sizeLabelMap, sizeLabelStyle, sizeSubLabelStyle, sizeGroupStyle;
var init_ButtonPage = __esmMin((() => {
	import_react$30 = /* @__PURE__ */ __toESM(require_react());
	init_Button();
	init_DemoBlock();
	init_GapsBlock();
	import_jsx_runtime$30 = require_jsx_runtime();
	PlusIcon = /* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("svg", {
		viewBox: "0 0 16 16",
		"aria-hidden": "true",
		focusable: "false",
		children: /* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("path", {
			d: "M8 3v10M3 8h10",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round"
		})
	});
	SearchIcon$1 = /* @__PURE__ */ (0, import_jsx_runtime$30.jsxs)("svg", {
		viewBox: "0 0 16 16",
		"aria-hidden": "true",
		focusable: "false",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("circle", {
			cx: "7",
			cy: "7",
			r: "4.5",
			stroke: "currentColor",
			strokeWidth: "1.5",
			fill: "none"
		}), /* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("path", {
			d: "M10.5 10.5L13.5 13.5",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round"
		})]
	});
	ChevronDownIcon = /* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("svg", {
		viewBox: "0 0 16 16",
		"aria-hidden": "true",
		focusable: "false",
		children: /* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("path", {
			d: "M4 6l4 4 4-4",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			fill: "none"
		})
	});
	allVariants = [
		"primary",
		"secondary",
		"grey",
		"ghost",
		"link"
	];
	iconVariants = [
		"primary",
		"secondary",
		"grey",
		"ghost"
	];
	sizeLabelMap = {
		large: "Large (48px)",
		medium: "Medium (32px, default)",
		small: "Small (24px)"
	};
	sizeLabelStyle = {
		width: "100%",
		display: "inline-flex",
		alignItems: "center",
		gap: 8,
		fontSize: 16,
		fontWeight: 600,
		color: "var(--wb-color-text-primary)"
	};
	sizeSubLabelStyle = {
		width: "100%",
		fontSize: 13,
		color: "var(--wb-color-text-secondary)"
	};
	sizeGroupStyle = {
		width: "100%",
		display: "flex",
		flexWrap: "wrap",
		alignItems: "center",
		gap: 12,
		marginBottom: 12
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/playbook/pages/components/CardPage.tsx
function CardPage(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("div", {
		style: {
			display: "grid",
			gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
			gap: 16
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime$29.jsxs)(Card, {
			variant: props.variant,
			padding: props.padding,
			hoverable: props.hoverable,
			loading: props.loading,
			children: [/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("h3", {
				style: {
					margin: 0,
					fontSize: "var(--wb-font-h3-size)",
					color: "var(--wb-color-text-primary)"
				},
				children: "Card title"
			}), /* @__PURE__ */ (0, import_jsx_runtime$29.jsxs)("p", {
				style: {
					margin: "var(--wb-spacing-2) 0 0",
					color: "var(--wb-color-text-secondary)"
				},
				children: [
					"Foundation Card 演示 —— variant: ",
					/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("code", { children: props.variant }),
					"，padding:",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("code", { children: props.padding }),
					props.hoverable ? ", hoverable" : "",
					props.loading ? ", loading" : ""
				]
			})]
		})
	});
}
function CardVariants() {
	return /* @__PURE__ */ (0, import_jsx_runtime$29.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 16
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)(DemoBlock, {
				title: "基础用法",
				description: /* @__PURE__ */ (0, import_jsx_runtime$29.jsx)(import_jsx_runtime$29.Fragment, { children: "最简单的用法，传入子节点即可。Card 仅作为容器，不假设内部排版（不像 antd Card 强行 `title + extra + body` 三段式）；具体内容布局由调用方决定。" }),
				code: `<Card>
  <strong>项目 A</strong>
  <div>Foundation Card 默认 outlined / medium。</div>
</Card>`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$29.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("strong", { children: "项目 A" }), /* @__PURE__ */ (0, import_jsx_runtime$29.jsxs)("div", {
					style: {
						color: "var(--wb-color-text-secondary)",
						marginTop: 4
					},
					children: [
						"Foundation Card 默认 ",
						/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("code", { children: "variant=\"outlined\"" }),
						"、",
						/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("code", { children: "padding=\"medium\"" }),
						"，可直接放任意内容。"
					]
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)(DemoBlock, {
				title: "视觉变体（variant）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$29.jsxs)(import_jsx_runtime$29.Fragment, { children: [
					"提供三种视觉变体：",
					/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("code", { children: "elevated" }),
					"（带阴影，浮起卡）/ ",
					/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("code", { children: "outlined" }),
					"（仅边框，**默认**）/ ",
					/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("code", { children: "flat" }),
					"（仅背景色）。设计稿钉死这三种，不增不减。"
				] }),
				code: `<Card variant="elevated">带阴影</Card>
<Card variant="outlined">仅边框（默认）</Card>
<Card variant="flat">仅背景色</Card>`,
				children: ALL_VARIANTS.map((v) => /* @__PURE__ */ (0, import_jsx_runtime$29.jsxs)(Card, {
					variant: v,
					style: { minWidth: 200 },
					children: [/* @__PURE__ */ (0, import_jsx_runtime$29.jsxs)("strong", { children: [
						"variant=\"",
						v,
						"\""
					] }), /* @__PURE__ */ (0, import_jsx_runtime$29.jsxs)("div", {
						style: {
							color: "var(--wb-color-text-secondary)",
							marginTop: 4,
							fontSize: 13
						},
						children: [
							v === "elevated" && "带阴影，从背景浮起",
							v === "outlined" && "仅边框，无阴影",
							v === "flat" && "仅背景色，无边框无阴影"
						]
					})]
				}, v))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)(DemoBlock, {
				title: "内边距档位（padding）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$29.jsxs)(import_jsx_runtime$29.Fragment, { children: [
					"提供四档内边距：",
					/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("code", { children: "none" }),
					"(0) / ",
					/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("code", { children: "small" }),
					"(12px) / ",
					/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("code", { children: "medium" }),
					"(20px，默认) / ",
					/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("code", { children: "large" }),
					"(28px)。具体值从 ",
					/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("code", { children: "--wb-spacing-*" }),
					" token 继承，详见能力缺口（设计师待 review 是否需要其他档位）。"
				] }),
				code: `<Card padding="none">…</Card>
<Card padding="small">…</Card>
<Card padding="medium">…</Card> // 默认
<Card padding="large">…</Card>`,
				children: ALL_PADDINGS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime$29.jsx)(Card, {
					variant: "outlined",
					padding: p,
					style: { minWidth: 160 },
					children: /* @__PURE__ */ (0, import_jsx_runtime$29.jsxs)("strong", { children: [
						"padding=\"",
						p,
						"\""
					] })
				}, p))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$29.jsxs)(DemoBlock, {
				title: "可悬停（hoverable）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$29.jsxs)(import_jsx_runtime$29.Fragment, { children: [
					"传 ",
					/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("code", { children: "hoverable" }),
					" 后，鼠标悬停时整卡背景变浅、阴影/边框加重，鼠标指针变 pointer。 通常配合 ",
					/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("code", { children: "onClick" }),
					" 或外层 ",
					/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("code", { children: "<a>" }),
					" 一起用，作为可点击的内容卡。 对齐 antd ",
					/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("code", { children: "Card.hoverable" }),
					"，**v0.2 破坏性替换旧的 ",
					/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("code", { children: "interactive" }),
					"**。"
				] }),
				code: `<Card>普通卡片</Card>

{/* hoverable 通常配合 onClick 一起用 */}
<Card hoverable onClick={() => navigate('/projects/123')}>
  hoverable 卡片
</Card>

<Card variant="elevated" hoverable onClick={handleOpenDetail}>
  elevated + hoverable
</Card>`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$29.jsxs)(Card, {
						variant: "outlined",
						style: { minWidth: 200 },
						children: [/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("strong", { children: "普通卡片" }), /* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("div", {
							style: {
								color: "var(--wb-color-text-secondary)",
								marginTop: 4,
								fontSize: 13
							},
							children: "鼠标移上去无变化"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$29.jsxs)(Card, {
						variant: "outlined",
						hoverable: true,
						style: { minWidth: 200 },
						children: [/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("strong", { children: "hoverable" }), /* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("div", {
							style: {
								color: "var(--wb-color-text-secondary)",
								marginTop: 4,
								fontSize: 13
							},
							children: "鼠标移上去试试"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$29.jsxs)(Card, {
						variant: "elevated",
						hoverable: true,
						style: { minWidth: 200 },
						children: [/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("strong", { children: "elevated + hoverable" }), /* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("div", {
							style: {
								color: "var(--wb-color-text-secondary)",
								marginTop: 4,
								fontSize: 13
							},
							children: "阴影也会加重"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$29.jsxs)(DemoBlock, {
				title: "加载占位（loading）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$29.jsxs)(import_jsx_runtime$29.Fragment, { children: [
					"传 ",
					/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("code", { children: "loading" }),
					" 时用三行宽度递减的灰色骨架行替换内容（带 shimmer 微动效）， 同时禁用 ",
					/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("code", { children: "hoverable" }),
					" 与 ",
					/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("code", { children: "onClick" }),
					"，并标记",
					/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("code", { children: "aria-busy=\"true\"" }),
					"。对齐 antd ",
					/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("code", { children: "Card.loading" }),
					"。"
				] }),
				code: `<Card loading />
<Card variant="elevated" loading />
{/* loading 时 hoverable / onClick 都会被禁用 */}
<Card loading hoverable onClick={() => undefined}>不会渲染</Card>`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)(Card, {
						variant: "outlined",
						loading: true,
						style: { minWidth: 240 }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)(Card, {
						variant: "elevated",
						loading: true,
						style: { minWidth: 240 }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)(Card, {
						variant: "outlined",
						loading: true,
						hoverable: true,
						onClick: () => void 0,
						style: { minWidth: 240 },
						children: /* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("strong", { children: "不会渲染" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)(DemoBlock, {
				title: "Card.Meta（v0.2.3 自落地）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$29.jsxs)(import_jsx_runtime$29.Fragment, { children: [
					"对齐 antd ",
					/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("code", { children: "Card.Meta" }),
					"。三槽位：",
					/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("code", { children: "avatar" }),
					"（左侧头像 / 图标）、",
					/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("code", { children: "title" }),
					"（标题，body 14/600，单行省略）、",
					/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("code", { children: "description" }),
					"（副文案，caption 12/400，单行省略）。常用于\"团队成员卡 / 知识库卡\"等需要\"头像 + 标题 + 副文案\"的场景。",
					/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("br", {}),
					/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("em", {
						style: { color: "var(--wb-color-text-tertiary)" },
						children: "注：avatar 槽位是 ReactNode，不限定必须是 Avatar 组件（也可以是 Icon / 图片）。"
					})
				] }),
				code: `import { Avatar } from '@genie/agent-ui/foundation';

<Card hoverable>
  <Card.Meta
    avatar={<Avatar size="large">A</Avatar>}
    title="Alice Wang"
    description="高级前端工程师 · 设计系统组"
  />
</Card>`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$29.jsx)(CardMetaDemo, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)(DemoBlock, {
				title: "可点击卡片（hoverable + onClick + 键盘可达）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$29.jsxs)(import_jsx_runtime$29.Fragment, { children: [
					"当 ",
					/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("code", { children: "hoverable" }),
					" 与 ",
					/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("code", { children: "onClick" }),
					" 同时存在时，Card 会自动加上",
					/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("code", { children: "role=\"button\"" }),
					" / ",
					/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("code", { children: "tabIndex=0" }),
					"，并支持 Enter/Space 触发点击。这样 Card 就成了 a11y 完整的可点击元素，不需要手动包 ",
					/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("code", { children: "<button>" }),
					"。"
				] }),
				code: `const [count, setCount] = React.useState(0);

<Card hoverable onClick={() => setCount(c => c + 1)}>
  <strong>点我或键盘 Tab 后按 Enter</strong>
  <div>已点击 {count} 次</div>
</Card>`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$29.jsx)(ClickableCardExample, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)(CardGapsBlock, {})
		]
	});
}
function ClickableCardExample() {
	const [count, setCount] = import_react$29.useState(0);
	return /* @__PURE__ */ (0, import_jsx_runtime$29.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 8
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime$29.jsxs)(Card, {
			variant: "outlined",
			hoverable: true,
			onClick: () => setCount((c) => c + 1),
			style: { minWidth: 240 },
			children: [/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("strong", { children: "点我或键盘 Tab 后按 Enter" }), /* @__PURE__ */ (0, import_jsx_runtime$29.jsxs)("div", {
				style: {
					color: "var(--wb-color-text-secondary)",
					marginTop: 4,
					fontSize: 13
				},
				children: [
					"已点击 ",
					count,
					" 次"
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("div", {
			style: {
				fontSize: "var(--wb-font-caption-size)",
				color: "var(--wb-color-text-tertiary)"
			},
			children: "这张卡片自动带 role=\"button\" / tabIndex=0，键盘 Tab 后按 Enter/Space 也能触发。"
		})]
	});
}
/**
* Card.Meta demo —— 三槽位组合（avatar / title / description）
*
* 演示了不同 avatar 类型：Avatar 组件 / 字符 + 自定义底色（业务里很常见）。
*/
function CardMetaDemo() {
	return /* @__PURE__ */ (0, import_jsx_runtime$29.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 12,
			width: "100%"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)(Card, {
			hoverable: true,
			style: { minWidth: 320 },
			children: /* @__PURE__ */ (0, import_jsx_runtime$29.jsx)(Card.Meta, {
				avatar: /* @__PURE__ */ (0, import_jsx_runtime$29.jsx)(Avatar, {
					size: "large",
					children: "A"
				}),
				title: "Alice Wang",
				description: "高级前端工程师 · 设计系统组"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime$29.jsx)(Card, {
			hoverable: true,
			style: { minWidth: 320 },
			children: /* @__PURE__ */ (0, import_jsx_runtime$29.jsx)(Card.Meta, {
				avatar: /* @__PURE__ */ (0, import_jsx_runtime$29.jsx)(Avatar, {
					shape: "square",
					size: "large",
					style: {
						background: "linear-gradient(135deg, #667eea, #764ba2)",
						color: "#fff"
					},
					children: "K"
				}),
				title: "Knowledge Base · 客户支持",
				description: "共 1,234 篇文章 · 上次更新 2 小时前"
			})
		})]
	});
}
/**
* 能力缺口公示 —— 与 docs/card-design-gaps.md 保持一致。
* 任一项落地后，把它从两份文档中同时移除。
*/
function CardGapsBlock() {
	return /* @__PURE__ */ (0, import_jsx_runtime$29.jsx)(GapsBlock, {
		gapDocPath: "docs/card-design-gaps.md",
		blocking: [
			{
				title: "dark 主题下卡片背景被写死 #ffffff",
				description: "ardot 节点 255:538「项目任务卡片」fills=#FFFFFF，但当前 token 中没有 dark 下的纯白卡片背景（--wb-bg-primary(dark)=#1f1f1f / --wb-bg-secondary(dark)=#2a2a2a 都不匹配），暂时写死。dark 主题视觉异常，等设计师拍板 dark 卡片色后立即替换为 token。"
			},
			{
				title: "卡片选中态",
				description: "项目列表多选场景大概率会用，目前未出图。"
			},
			{
				title: "卡片禁用态",
				description: "禁用整卡：文字降级 + 背景灰化 + 不响应 hover/click，目前未出图。"
			},
			{
				title: "底部操作区（actions）",
				description: "antd 有 actions 数组渲染底部图标按钮组，目前未用。"
			},
			{
				title: "卡片内分隔线（Card.Divider）",
				description: "长内容卡片可能要分组，目前未用。"
			}
		],
		pending: [
			{
				title: "Card.Meta 视觉规格（v0.2.3 自落地）",
				description: "avatar/title/description 三槽位 + 12px gap + title/description 单行 ellipsis，按 antd 默认 + 业务实测兜底；待设计师补具体 token (gap / 行高 / title 字重)。"
			},
			{
				title: "hover 时的背景色方向",
				description: "当前用更深一档背景，与\"卡片浮起\"语义有点反直觉，待设计师确认是否反向。"
			},
			{
				title: "三种 variant 的视觉边界",
				description: "elevated 与 outlined 在浅色主题下视觉差距小，设计师确认两者差异是否足够明显。"
			},
			{
				title: "padding 默认档值",
				description: "ardot 节点 255:538 要求 padding=12，但 Card 当前 padding=\"medium\" 是 --wb-spacing-5(16px)；待设计师确认默认档是 12 还是 16。"
			},
			{
				title: "骨架屏配色与时长",
				description: "shimmer 1.4s + bg-tertiary↔bg-primary 渐变，设计师未给骨架屏视觉规范。"
			}
		],
		footer: /* @__PURE__ */ (0, import_jsx_runtime$29.jsxs)(import_jsx_runtime$29.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("code", { children: "type=\"inner\"" }),
			" / ",
			/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("code", { children: "size=\"small\"" }),
			" /",
			/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("code", { children: "bordered=false" }),
			" / ",
			/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("code", { children: "cover" }),
			" 等 antd 字段与现有 variant 重叠或业务未用，本次明确不做（详见 GAP 长版第 3 段）。"
		] })
	});
}
var import_react$29, import_jsx_runtime$29, ALL_VARIANTS, ALL_PADDINGS;
var init_CardPage = __esmMin((() => {
	import_react$29 = /* @__PURE__ */ __toESM(require_react());
	init_Avatar();
	init_Card();
	init_DemoBlock();
	init_GapsBlock();
	import_jsx_runtime$29 = require_jsx_runtime();
	ALL_VARIANTS = [
		"elevated",
		"outlined",
		"flat"
	];
	ALL_PADDINGS = [
		"none",
		"small",
		"medium",
		"large"
	];
}));
//#endregion
//#region ../../packages/agent-ui/src/playbook/pages/components/CascaderPage.tsx
function CascaderPage(props) {
	const [singleVal, setSingleVal] = (0, import_react$28.useState)([]);
	const [multiVal, setMultiVal] = (0, import_react$28.useState)([]);
	return /* @__PURE__ */ (0, import_jsx_runtime$28.jsx)("div", {
		style: {
			minWidth: 240,
			minHeight: 200
		},
		children: props.multiple ? /* @__PURE__ */ (0, import_jsx_runtime$28.jsx)(Cascader, {
			multiple: true,
			size: props.size,
			disabled: props.disabled,
			invalid: props.invalid,
			showSearch: props.showSearch,
			changeOnSelect: props.changeOnSelect,
			placeholder: props.placeholder || "请选择省/市/区（任意层级，可跨级混选）",
			dataSource: chinaRegionDataSource,
			value: multiVal,
			onChange: (paths) => setMultiVal(paths),
			maxTagCount: 5
		}) : /* @__PURE__ */ (0, import_jsx_runtime$28.jsx)(Cascader, {
			size: props.size,
			disabled: props.disabled,
			invalid: props.invalid,
			showSearch: props.showSearch,
			changeOnSelect: props.changeOnSelect,
			placeholder: props.placeholder || "请选择省/市/区（任意层级）",
			dataSource: chinaRegionDataSource,
			value: singleVal[0] ?? null,
			onChange: (paths) => setSingleVal(paths)
		})
	});
}
function CascaderVariants() {
	const [v1, setV1] = (0, import_react$28.useState)([]);
	const [v2, setV2] = (0, import_react$28.useState)([]);
	const [v3, setV3] = (0, import_react$28.useState)([]);
	const [echoSingle, setEchoSingle] = (0, import_react$28.useState)([[
		{
			value: "广东省",
			label: "广东省"
		},
		{
			value: "广东省/广州市",
			label: "广州市"
		},
		{
			value: "广东省/广州市/天河区",
			label: "天河区"
		}
	]]);
	const [echoMulti, setEchoMulti] = (0, import_react$28.useState)([[
		{
			value: "北京市",
			label: "北京市"
		},
		{
			value: "北京市/市辖区",
			label: "市辖区"
		},
		{
			value: "北京市/市辖区/朝阳区",
			label: "朝阳区"
		}
	], [
		{
			value: "上海市",
			label: "上海市"
		},
		{
			value: "上海市/市辖区",
			label: "市辖区"
		},
		{
			value: "上海市/市辖区/浦东新区",
			label: "浦东新区"
		}
	]]);
	const modelDataSource = (0, import_react$28.useMemo)(() => buildStaticDataSource([{
		value: "foundation",
		label: "基础模型",
		children: [
			{
				value: "gpt-4o",
				label: "GPT-4o"
			},
			{
				value: "claude-3-5",
				label: "Claude 3.5 Sonnet"
			},
			{
				value: "gemini-pro",
				label: "Gemini Pro"
			}
		]
	}, {
		value: "open-source",
		label: "开源模型",
		children: [{
			value: "meta",
			label: "Meta",
			children: [{
				value: "llama-3-70b",
				label: "Llama 3 70B"
			}, {
				value: "llama-3-8b",
				label: "Llama 3 8B"
			}]
		}, {
			value: "mistral",
			label: "Mistral",
			children: [{
				value: "mixtral-8x22b",
				label: "Mixtral 8x22B"
			}, {
				value: "mistral-large",
				label: "Mistral Large"
			}]
		}]
	}]), []);
	return /* @__PURE__ */ (0, import_jsx_runtime$28.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 16
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$28.jsx)(DemoBlock, {
				title: "预选中回显（受控 value）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$28.jsxs)(import_jsx_runtime$28.Fragment, { children: [
					"通过 ",
					/* @__PURE__ */ (0, import_jsx_runtime$28.jsx)("code", { children: "value" }),
					" 传入已有的 ",
					/* @__PURE__ */ (0, import_jsx_runtime$28.jsx)("code", { children: "CascaderPath" }),
					" 实现回显。 onChange 统一返回 ",
					/* @__PURE__ */ (0, import_jsx_runtime$28.jsx)("code", { children: "CascaderPath[]" }),
					"：单选时 ",
					/* @__PURE__ */ (0, import_jsx_runtime$28.jsx)("code", { children: "[path]" }),
					"， 清空时 ",
					/* @__PURE__ */ (0, import_jsx_runtime$28.jsx)("code", { children: "[]" }),
					"，多选时多条路径。 下方展示当前 value 的 JSON 以便确认回显数据结构。"
				] }),
				code: `// 单选回显：onChange 统一返回 CascaderPath[]
const [val, setVal] = useState<CascaderPath[]>([
  [
    { value: '广东省', label: '广东省' },
    { value: '广东省/广州市', label: '广州市' },
    { value: '广东省/广州市/天河区', label: '天河区' },
  ],
]);

<Cascader
  dataSource={chinaRegionDataSource}
  value={val[0] ?? null}
  onChange={paths => setVal(paths)}
/>

// 多选回显
const [multi, setMulti] = useState<CascaderPath[]>([
  [
    { value: '北京市', label: '北京市' },
    { value: '北京市/市辖区', label: '市辖区' },
    { value: '北京市/市辖区/朝阳区', label: '朝阳区' },
  ],
  [
    { value: '上海市', label: '上海市' },
    { value: '上海市/市辖区', label: '市辖区' },
    { value: '上海市/市辖区/浦东新区', label: '浦东新区' },
  ],
]);

<Cascader
  multiple
  dataSource={chinaRegionDataSource}
  value={multi}
  onChange={ps => setMulti(ps)}
/>`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$28.jsxs)("div", {
					style: {
						display: "flex",
						flexDirection: "column",
						gap: 16,
						width: "100%"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime$28.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime$28.jsx)("div", {
							style: {
								fontSize: 12,
								marginBottom: 6,
								color: "var(--wb-color-text-secondary)"
							},
							children: "单选回显（已选：广东省 / 广州市 / 天河区）"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$28.jsx)(Cascader, {
							width: 360,
							dataSource: chinaRegionDataSource,
							value: echoSingle[0] ?? null,
							onChange: (paths) => setEchoSingle(paths),
							allowClear: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$28.jsxs)("div", {
							style: {
								marginTop: 8,
								fontSize: 11,
								color: "var(--wb-color-text-tertiary)",
								fontFamily: "monospace"
							},
							children: ["value = ", echoSingle[0] ? `[${echoSingle[0].map((n) => `"${n.label}"`).join(" → ")}]` : "[]"]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime$28.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime$28.jsx)("div", {
							style: {
								fontSize: 12,
								marginBottom: 6,
								color: "var(--wb-color-text-secondary)"
							},
							children: "多选回显（已选：朝阳区、浦东新区）"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$28.jsx)(Cascader, {
							multiple: true,
							width: 460,
							dataSource: chinaRegionDataSource,
							value: echoMulti,
							onChange: (ps) => setEchoMulti(ps),
							maxTagCount: 5,
							allowClear: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$28.jsxs)("div", {
							style: {
								marginTop: 8,
								fontSize: 11,
								color: "var(--wb-color-text-tertiary)",
								fontFamily: "monospace"
							},
							children: [
								"value = [",
								echoMulti.map((p) => p.map((n) => n.label).join("/")).join(", "),
								"]"
							]
						})
					] })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$28.jsx)(DemoBlock, {
				title: "任意层级可选（changeOnSelect，默认开启）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$28.jsxs)(import_jsx_runtime$28.Fragment, { children: [
					"点击「广东省」就能选到省级，点开后再点「广州市」就选到市级， 继续点开后选「天河区」就到区级。不需要必须选到叶子。 鼠标 hover 中间节点只展开下一列，",
					/* @__PURE__ */ (0, import_jsx_runtime$28.jsx)("b", { children: "不" }),
					"触发选择。"
				] }),
				children: /* @__PURE__ */ (0, import_jsx_runtime$28.jsx)(Cascader, {
					placeholder: "请选择（省 / 市 / 区任一层级）",
					dataSource: chinaRegionDataSource,
					value: v1[0] ?? null,
					onChange: (paths) => setV1(paths)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$28.jsx)(DemoBlock, {
				title: "多选 + 跨级混合",
				description: /* @__PURE__ */ (0, import_jsx_runtime$28.jsxs)(import_jsx_runtime$28.Fragment, { children: [
					"多选下，「广东省」和「广东省/广州市/天河区」是",
					/* @__PURE__ */ (0, import_jsx_runtime$28.jsx)("b", { children: "两条独立" }),
					"的勾选项， 勾父节点不会自动包含子节点，勾子节点也不会反向勾父节点。 业务上\"路径精确传递\"比隐式扩展更可控。"
				] }),
				children: /* @__PURE__ */ (0, import_jsx_runtime$28.jsx)(Cascader, {
					multiple: true,
					showSearch: true,
					width: 420,
					placeholder: "请选择多项，可跨层级",
					dataSource: chinaRegionDataSource,
					value: v2,
					onChange: (ps) => setV2(ps),
					maxTagCount: 5
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$28.jsx)(DemoBlock, {
				title: "严格叶子选中（changeOnSelect=false）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$28.jsxs)(import_jsx_runtime$28.Fragment, { children: [
					"关闭 ",
					/* @__PURE__ */ (0, import_jsx_runtime$28.jsx)("code", { children: "changeOnSelect" }),
					" 后，中间节点点击只展开下一列， 不能被选中；多选勾选框也只出现在叶子。适合\"必须选到最细颗粒度\"的场景。"
				] }),
				children: /* @__PURE__ */ (0, import_jsx_runtime$28.jsx)(Cascader, {
					multiple: true,
					changeOnSelect: false,
					width: 420,
					placeholder: "只允许选到区一级",
					dataSource: chinaRegionDataSource,
					value: v3,
					onChange: (ps) => setV3(ps),
					maxTagCount: 5
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$28.jsx)(DemoBlock, {
				title: "自定义数据源（非中国行政区）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$28.jsxs)(import_jsx_runtime$28.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$28.jsx)("code", { children: "buildStaticDataSource(nodes)" }), " 把任意静态树包成 dataSource。 本例是模型分类（基础模型 / 开源模型 → Meta / Mistral → 具体型号）。 这说明 Cascader 与具体业务零耦合，Agent 等模块可以注入自己的层级数据。"] }),
				children: /* @__PURE__ */ (0, import_jsx_runtime$28.jsx)(Cascader, {
					placeholder: "请选择模型",
					dataSource: modelDataSource
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$28.jsx)(DemoBlock, {
				title: "禁用 / 失败态 / 三档尺寸",
				description: "与 Select 一致的视觉档位。",
				children: /* @__PURE__ */ (0, import_jsx_runtime$28.jsxs)("div", {
					style: {
						display: "flex",
						flexDirection: "column",
						gap: 12
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$28.jsx)(Cascader, {
							size: "small",
							dataSource: chinaRegionDataSource,
							placeholder: "small"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$28.jsx)(Cascader, {
							size: "medium",
							dataSource: chinaRegionDataSource,
							placeholder: "medium"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$28.jsx)(Cascader, {
							size: "large",
							dataSource: chinaRegionDataSource,
							placeholder: "large"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$28.jsx)(Cascader, {
							disabled: true,
							dataSource: chinaRegionDataSource,
							placeholder: "disabled"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$28.jsx)(Cascader, {
							invalid: true,
							dataSource: chinaRegionDataSource,
							placeholder: "invalid"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$28.jsx)(Cascader, {
							allowClear: true,
							dataSource: chinaRegionDataSource,
							placeholder: "allowClear"
						})
					]
				})
			})
		]
	});
}
var import_react$28, import_jsx_runtime$28;
var init_CascaderPage = __esmMin((() => {
	import_react$28 = /* @__PURE__ */ __toESM(require_react());
	init_Cascader();
	init_RegionPicker();
	init_DemoBlock();
	import_jsx_runtime$28 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/playbook/pages/components/CheckboxPage.tsx
function CheckboxPage(props) {
	const [checked, setChecked] = (0, import_react$27.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime$27.jsx)(Checkbox, {
		size: props.size,
		disabled: props.disabled,
		indeterminate: props.indeterminate,
		label: props.label || void 0,
		checked,
		onChange: (e) => setChecked(e.target.checked)
	});
}
function CheckboxVariants() {
	return /* @__PURE__ */ (0, import_jsx_runtime$27.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 16
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$27.jsxs)(DemoBlock, {
				title: "基础用法",
				description: /* @__PURE__ */ (0, import_jsx_runtime$27.jsxs)(import_jsx_runtime$27.Fragment, { children: [
					"最简单的用法。不传 ",
					/* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("code", { children: "checked" }),
					" 时，组件内部维护状态（非受控）； 可通过 ",
					/* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("code", { children: "defaultChecked" }),
					" 设置初始值。"
				] }),
				code: `{/* 非受控，组件内部维护勾选状态 */}
<Checkbox onChange={e => console.log('checked =', e.target.checked)} />

{/* 通过 defaultChecked 设置初始值 */}
<Checkbox defaultChecked onChange={e => console.log('checked =', e.target.checked)} />`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$27.jsx)(Checkbox, {}), /* @__PURE__ */ (0, import_jsx_runtime$27.jsx)(Checkbox, { defaultChecked: true })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$27.jsx)(DemoBlock, {
				title: "两档尺寸（size）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$27.jsxs)(import_jsx_runtime$27.Fragment, { children: [
					"提供两档尺寸：",
					/* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("code", { children: "small" }),
					"（14×14，表格行内用）/ ",
					/* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("code", { children: "medium" }),
					"（16×16，默认）。"
				] }),
				code: `<Checkbox size="small" defaultChecked label="small" />
<Checkbox size="medium" defaultChecked label="medium" />`,
				children: ALL_SIZES$7.map((s) => /* @__PURE__ */ (0, import_jsx_runtime$27.jsx)(Checkbox, {
					size: s,
					defaultChecked: true,
					label: s
				}, s))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$27.jsx)(DemoBlock, {
				title: "受控（checked + onChange）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$27.jsxs)(import_jsx_runtime$27.Fragment, { children: [
					"传 ",
					/* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("code", { children: "checked" }),
					" 时进入受控模式，由父组件维护状态。",
					/* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("code", { children: "onChange" }),
					" 签名为 ",
					/* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("code", { children: "(e) => void" }),
					"，从",
					/* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("code", { children: "e.target.checked" }),
					" 读值，与 antd / Switch 对齐； 在表格行勾选等场景可在内部 ",
					/* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("code", { children: "e.stopPropagation()" }),
					" 阻断冒泡。"
				] }),
				code: `const [checked, setChecked] = useState(false);

<Checkbox
  checked={checked}
  onChange={e => setChecked(e.target.checked)}
  label={checked ? '已勾选' : '未勾选'}
/>`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$27.jsx)(ControlledCheckboxExample, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$27.jsxs)(DemoBlock, {
				title: "半选（indeterminate）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$27.jsxs)(import_jsx_runtime$27.Fragment, { children: [
					"传 ",
					/* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("code", { children: "indeterminate" }),
					" 后方框内显示横线，表示「部分选中」。 该属性是 DOM property（不是 attribute），组件内部用 ",
					/* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("code", { children: "useEffect" }),
					" ",
					"同步到 native input；同时设 ",
					/* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("code", { children: "aria-checked=\"mixed\"" }),
					"。 典型用法：表格全选表头 —— 当部分行选中时进入半选。"
				] }),
				code: `{/* 静态展示三态 */}
<Checkbox label="未选" />
<Checkbox indeterminate label="半选" />
<Checkbox defaultChecked label="全选" />

{/* 父子联动 */}
const [list, setList] = useState([false, true, false]);
const allChecked = list.every(Boolean);
const someChecked = list.some(Boolean);

<Checkbox
  checked={allChecked}
  indeterminate={!allChecked && someChecked}
  onChange={e => setList(list.map(() => e.target.checked))}
  label="全选"
/>`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$27.jsxs)("div", {
					style: {
						display: "flex",
						gap: 16
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$27.jsx)(Checkbox, { label: "未选" }),
						/* @__PURE__ */ (0, import_jsx_runtime$27.jsx)(Checkbox, {
							indeterminate: true,
							label: "半选"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$27.jsx)(Checkbox, {
							defaultChecked: true,
							label: "全选"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime$27.jsx)(IndeterminateGroupExample, {})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$27.jsxs)(DemoBlock, {
				title: "带标签（label）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$27.jsxs)(import_jsx_runtime$27.Fragment, { children: [
					"传 ",
					/* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("code", { children: "label" }),
					" 时右侧显示文字，点击文字也会切换状态（基于原生 label 关联）。"
				] }),
				code: `<Checkbox
  label="同意《用户协议》"
  onChange={e => setAgreed(e.target.checked)}
/>
<Checkbox
  defaultChecked
  label="记住登录状态"
  onChange={e => updateUserPref({ remember: e.target.checked })}
/>`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$27.jsx)(Checkbox, { label: "同意《用户协议》" }), /* @__PURE__ */ (0, import_jsx_runtime$27.jsx)(Checkbox, {
					defaultChecked: true,
					label: "记住登录状态"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$27.jsxs)(DemoBlock, {
				title: "禁用态（disabled）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$27.jsxs)(import_jsx_runtime$27.Fragment, { children: [
					"传 ",
					/* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("code", { children: "disabled" }),
					" 后整体降透明度（50%），cursor 变 not-allowed， 不响应点击。开 / 关 / 半选三态都会保持视觉。"
				] }),
				code: `<Checkbox disabled label="disabled + 未选" />
<Checkbox disabled defaultChecked label="disabled + 已选" />
<Checkbox disabled indeterminate label="disabled + 半选" />`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$27.jsx)(Checkbox, {
						disabled: true,
						label: "disabled + 未选"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$27.jsx)(Checkbox, {
						disabled: true,
						defaultChecked: true,
						label: "disabled + 已选"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$27.jsx)(Checkbox, {
						disabled: true,
						indeterminate: true,
						label: "disabled + 半选"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$27.jsxs)(DemoBlock, {
				title: "Checkbox.Group：成组用法",
				description: /* @__PURE__ */ (0, import_jsx_runtime$27.jsxs)(import_jsx_runtime$27.Fragment, { children: [
					"通过 ",
					/* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("code", { children: "options" }),
					" 配置成组复选框，自动维护勾选值数组。",
					/* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("code", { children: "options" }),
					" 支持字符串数组或 ",
					/* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("code", { children: "{ label, value, disabled? }" }),
					" 对象数组；",
					/* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("code", { children: "onChange" }),
					" 返回当前所有勾选值（顺序与 options 一致）。",
					/* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("code", { children: "direction" }),
					" 切换横向 / 纵向布局；",
					/* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("code", { children: "disabled" }),
					" 整组禁用， 单项的 ",
					/* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("code", { children: "disabled" }),
					" 优先级更高。"
				] }),
				code: `{/* 字符串数组 */}
<Checkbox.Group
  options={['苹果', '香蕉', '橙子']}
  defaultValue={['苹果']}
  onChange={vals => console.log('checked:', vals)}
/>

{/* 对象数组 + 单项 disabled */}
<Checkbox.Group
  options={[
    { label: '北京', value: 'beijing' },
    { label: '上海', value: 'shanghai' },
    { label: '深圳', value: 'shenzhen', disabled: true },
  ]}
  direction="vertical"
/>

{/* 受控 */}
const [value, setValue] = useState(['a']);
<Checkbox.Group
  options={['a', 'b', 'c']}
  value={value}
  onChange={setValue}
/>`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$27.jsx)(CheckboxGroupBasicExample, {}),
					/* @__PURE__ */ (0, import_jsx_runtime$27.jsx)(CheckboxGroupVerticalExample, {}),
					/* @__PURE__ */ (0, import_jsx_runtime$27.jsx)(CheckboxGroupControlledExample, {}),
					/* @__PURE__ */ (0, import_jsx_runtime$27.jsx)(CheckboxGroupDisabledExample, {})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$27.jsx)(CheckboxGapsBlock, {})
		]
	});
}
function ControlledCheckboxExample() {
	const [checked, setChecked] = (0, import_react$27.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime$27.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 12,
			alignItems: "flex-start"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime$27.jsx)(Checkbox, {
			checked,
			onChange: (e) => setChecked(e.target.checked),
			label: checked ? "已勾选" : "未勾选"
		}), /* @__PURE__ */ (0, import_jsx_runtime$27.jsxs)("div", {
			style: {
				fontSize: 12,
				color: "var(--wb-color-text-tertiary)"
			},
			children: ["父组件状态：", /* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("code", { children: String(checked) })]
		})]
	});
}
function IndeterminateGroupExample() {
	const labels = [
		"苹果",
		"香蕉",
		"橙子"
	];
	const [list, setList] = (0, import_react$27.useState)([
		false,
		true,
		false
	]);
	const allChecked = list.every(Boolean);
	const someChecked = list.some(Boolean);
	const onAllChange = (e) => {
		setList(list.map(() => e.target.checked));
	};
	const onItemChange = (idx, e) => {
		setList(list.map((v, i) => i === idx ? e.target.checked : v));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime$27.jsxs)("div", {
		style: {
			marginTop: 8,
			padding: 12,
			border: "1px dashed var(--wb-border-default)",
			borderRadius: 6,
			display: "flex",
			flexDirection: "column",
			gap: 8
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime$27.jsx)(Checkbox, {
			checked: allChecked,
			indeterminate: !allChecked && someChecked,
			onChange: onAllChange,
			label: "全选"
		}), /* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("div", {
			style: {
				display: "flex",
				gap: 16,
				paddingLeft: 24
			},
			children: labels.map((label, idx) => /* @__PURE__ */ (0, import_jsx_runtime$27.jsx)(Checkbox, {
				checked: list[idx],
				onChange: (e) => onItemChange(idx, e),
				label
			}, label))
		})]
	});
}
/**
* 能力缺口公示 —— 与 docs/checkbox-design-gaps.md 保持一致。
* 任一项落地后，把它从两份文档中同时移除。
*/
function CheckboxGapsBlock() {
	return /* @__PURE__ */ (0, import_jsx_runtime$27.jsx)(GapsBlock, {
		gapDocPath: "docs/checkbox-design-gaps.md",
		blocking: [
			{
				title: "校验失败态（error）",
				description: "表单校验失败时方框描边变红 + 配合错误文案，目前未做，需补稿。"
			},
			{
				title: "大尺寸（large）",
				description: "移动端 / 表单页常用 18~20px 大复选框方便点击，目前最大只到 medium（16）。"
			},
			{
				title: "危险勾选配色",
				description: "「确认删除 / 不可逆操作」场景需红 / 橙色配色，目前只有品牌主色。"
			}
		],
		pending: [
			{
				title: "Checkbox.Group 已自落地",
				description: "options/value/onChange/direction/disabled 已对齐 antd；待设计师补稿组内间距、垂直行高、是否有组级 label。"
			},
			{
				title: "方框圆角 = --wb-radius-sm",
				description: "与 cb-chat-ui 4px 一致，未拿到设计师明确数值（4 / 2 待定）。"
			},
			{
				title: "描边粗 1.5px",
				description: "cb-chat-ui 兜底，与 Input 的 1px 不一致，希望全局统一。"
			},
			{
				title: "勾形参数（4×8 / 1.5px）",
				description: "纯 CSS rotate 实现，肉眼调教而成，希望设计师在两个主题下复核或换 SVG。"
			},
			{
				title: "半选横线 8×1.5（small 6×1.5）",
				description: "从 antd 兜底，未拿到设计师明确数值。"
			},
			{
				title: "filled 背景 = --wb-button-primary-bg",
				description: "复用 Switch 选中色；若复选框语义弱于开关，希望独立 token。"
			},
			{
				title: "disabled 透明度 0.5",
				description: "与 Switch / Tag 一致、与 Select（0.6）不一致，希望全局统一。"
			}
		],
		footer: /* @__PURE__ */ (0, import_jsx_runtime$27.jsxs)(import_jsx_runtime$27.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("code", { children: "Checkbox.Group" }),
			" 已自落地（v0.2.2）；",
			/* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("code", { children: "autoFocus / 整组 indeterminate / Group children Context 联动" }),
			" 等 归属于其他组件或 HTML 标准透传，本次明确不做（详见 GAP 长版第 3 段）。"
		] })
	});
}
function CheckboxGroupBasicExample() {
	const [vals, setVals] = (0, import_react$27.useState)(["苹果"]);
	return /* @__PURE__ */ (0, import_jsx_runtime$27.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 6
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime$27.jsx)(Checkbox.Group, {
			options: [
				"苹果",
				"香蕉",
				"橙子"
			],
			value: vals,
			onChange: setVals
		}), /* @__PURE__ */ (0, import_jsx_runtime$27.jsxs)("div", {
			style: {
				fontSize: 12,
				color: "var(--wb-color-text-tertiary)"
			},
			children: ["当前值：", /* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("code", { children: JSON.stringify(vals) })]
		})]
	});
}
function CheckboxGroupVerticalExample() {
	return /* @__PURE__ */ (0, import_jsx_runtime$27.jsx)(Checkbox.Group, {
		direction: "vertical",
		defaultValue: ["beijing"],
		options: [
			{
				label: "北京",
				value: "beijing"
			},
			{
				label: "上海",
				value: "shanghai"
			},
			{
				label: "深圳",
				value: "shenzhen",
				disabled: true
			}
		]
	});
}
function CheckboxGroupControlledExample() {
	const [value, setValue] = (0, import_react$27.useState)(["a"]);
	return /* @__PURE__ */ (0, import_jsx_runtime$27.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 6
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime$27.jsx)(Checkbox.Group, {
			options: [
				"a",
				"b",
				"c"
			],
			value,
			onChange: setValue
		}), /* @__PURE__ */ (0, import_jsx_runtime$27.jsxs)("div", {
			style: {
				fontSize: 12,
				color: "var(--wb-color-text-tertiary)"
			},
			children: ["受控值：", /* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("code", { children: JSON.stringify(value) })]
		})]
	});
}
function CheckboxGroupDisabledExample() {
	return /* @__PURE__ */ (0, import_jsx_runtime$27.jsx)(Checkbox.Group, {
		disabled: true,
		defaultValue: ["x"],
		options: [
			"x",
			"y",
			"z"
		]
	});
}
var import_react$27, import_jsx_runtime$27, ALL_SIZES$7;
var init_CheckboxPage = __esmMin((() => {
	import_react$27 = /* @__PURE__ */ __toESM(require_react());
	init_Checkbox();
	init_DemoBlock();
	init_GapsBlock();
	import_jsx_runtime$27 = require_jsx_runtime();
	ALL_SIZES$7 = ["small", "medium"];
}));
//#endregion
//#region ../../packages/agent-ui/src/playbook/pages/components/ColorPickerPage.tsx
function ColorPickerPage(props) {
	const [value, setValue] = (0, import_react$26.useState)(4);
	return /* @__PURE__ */ (0, import_jsx_runtime$26.jsx)(ColorPicker, {
		colors: DEMO_COLORS,
		value,
		onChange: (v) => setValue(v),
		columns: props.columns,
		swatchSize: props.swatchSize,
		disabled: props.disabled
	});
}
function ColorPickerVariants() {
	return /* @__PURE__ */ (0, import_jsx_runtime$26.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 16
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$26.jsx)(DemoBlock, {
				title: "基础用法（受控选色）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$26.jsxs)(import_jsx_runtime$26.Fragment, { children: [
					"传 ",
					/* @__PURE__ */ (0, import_jsx_runtime$26.jsx)("code", { children: "colors" }),
					" + ",
					/* @__PURE__ */ (0, import_jsx_runtime$26.jsx)("code", { children: "value" }),
					" + ",
					/* @__PURE__ */ (0, import_jsx_runtime$26.jsx)("code", { children: "onChange" }),
					"，点击切换选中色块。"
				] }),
				code: `const [value, setValue] = useState(4);

<ColorPicker
  colors={colors}
  value={value}
  onChange={v => setValue(v)}
/>`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$26.jsx)(ControlledColorPickerExample, { columns: 9 })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$26.jsx)(DemoBlock, {
				title: "自定义列数（columns）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$26.jsxs)(import_jsx_runtime$26.Fragment, { children: [
					"通过 ",
					/* @__PURE__ */ (0, import_jsx_runtime$26.jsx)("code", { children: "columns" }),
					" 控制每行列数，配合 ",
					/* @__PURE__ */ (0, import_jsx_runtime$26.jsx)("code", { children: "swatchSize" }),
					" 调整格子大小。"
				] }),
				code: "<ColorPicker colors={colors} columns={6} swatchSize={24} />",
				children: /* @__PURE__ */ (0, import_jsx_runtime$26.jsx)(ControlledColorPickerExample, {
					columns: 6,
					swatchSize: 24
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$26.jsx)(DemoBlock, {
				title: "禁用态（disabled）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$26.jsxs)(import_jsx_runtime$26.Fragment, { children: [
					"传 ",
					/* @__PURE__ */ (0, import_jsx_runtime$26.jsx)("code", { children: "disabled" }),
					" 后整体降透明度、不响应点击。"
				] }),
				code: "<ColorPicker colors={colors} value={4} disabled />",
				children: /* @__PURE__ */ (0, import_jsx_runtime$26.jsx)(ColorPicker, {
					colors: DEMO_COLORS,
					value: 4,
					disabled: true
				})
			})
		]
	});
}
function ControlledColorPickerExample({ columns, swatchSize }) {
	const [value, setValue] = (0, import_react$26.useState)(4);
	return /* @__PURE__ */ (0, import_jsx_runtime$26.jsx)(ColorPicker, {
		colors: DEMO_COLORS,
		value,
		onChange: (v) => setValue(v),
		columns,
		swatchSize
	});
}
var import_react$26, import_jsx_runtime$26, DEMO_COLORS;
var init_ColorPickerPage = __esmMin((() => {
	import_react$26 = /* @__PURE__ */ __toESM(require_react());
	init_ColorPicker();
	init_DemoBlock();
	import_jsx_runtime$26 = require_jsx_runtime();
	DEMO_COLORS = [
		{
			value: 1,
			color: "#f5f5f5",
			title: "浅灰"
		},
		{
			value: 2,
			color: "#d9e8ff",
			title: "浅蓝"
		},
		{
			value: 3,
			color: "#d4f0ff",
			title: "天蓝"
		},
		{
			value: 4,
			color: "#d8f5e3",
			title: "浅绿"
		},
		{
			value: 5,
			color: "#ffe0e0",
			title: "浅红"
		},
		{
			value: 6,
			color: "#ffe8cc",
			title: "浅橙"
		},
		{
			value: 7,
			color: "#fff4cc",
			title: "浅黄"
		},
		{
			value: 8,
			color: "#ece0ff",
			title: "浅紫"
		},
		{
			value: 9,
			color: "#ffe0f0",
			title: "浅粉"
		},
		{
			value: 10,
			color: "#8fb3ff",
			title: "蓝"
		},
		{
			value: 11,
			color: "#7fd4ff",
			title: "青"
		},
		{
			value: 12,
			color: "#7fd99f",
			title: "绿"
		},
		{
			value: 13,
			color: "#ff9f9f",
			title: "红"
		},
		{
			value: 14,
			color: "#ffc266",
			title: "橙"
		},
		{
			value: 15,
			color: "#ffe066",
			title: "黄"
		},
		{
			value: 16,
			color: "#c299ff",
			title: "紫"
		},
		{
			value: 17,
			color: "#ff99cc",
			title: "粉"
		},
		{
			value: 18,
			color: "#bfbfbf",
			title: "灰"
		}
	];
}));
//#endregion
//#region ../../packages/agent-ui/src/playbook/components/VariantSection.tsx
function VariantSection({ title, hint, children, direction = "row", gap = 12 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime$25.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime$25.jsxs)("div", {
		style: headerStyle,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$25.jsx)("span", {
			style: titleStyle,
			children: title
		}), hint && /* @__PURE__ */ (0, import_jsx_runtime$25.jsx)("span", {
			style: hintStyle,
			children: hint
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime$25.jsx)("div", {
		style: {
			display: "flex",
			flexDirection: direction,
			flexWrap: "wrap",
			alignItems: direction === "row" ? "flex-start" : "stretch",
			gap
		},
		children
	})] });
}
function VariantItem({ propsLabel, note, block, code, children }) {
	const labels = Array.isArray(propsLabel) ? propsLabel : [propsLabel];
	const [codeOpen, setCodeOpen] = (0, import_react$25.useState)(false);
	const [copied, setCopied] = (0, import_react$25.useState)(false);
	const handleCopy = (0, import_react$25.useCallback)(() => {
		if (!code) return;
		try {
			navigator.clipboard.writeText(code).catch(() => void 0);
		} catch {
			const ta = document.createElement("textarea");
			ta.value = code;
			ta.style.position = "fixed";
			ta.style.opacity = "0";
			document.body.appendChild(ta);
			ta.select();
			try {
				document.execCommand("copy");
			} catch {}
			document.body.removeChild(ta);
		}
		setCopied(true);
		setTimeout(() => setCopied(false), 1500);
	}, [code]);
	return /* @__PURE__ */ (0, import_jsx_runtime$25.jsxs)("div", {
		style: {
			...itemStyle,
			...block ? itemBlockStyle : null
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$25.jsx)("div", {
				style: itemPreviewStyle,
				children
			}),
			note && /* @__PURE__ */ (0, import_jsx_runtime$25.jsx)("div", {
				style: itemNoteStyle,
				children: note
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$25.jsx)("div", {
				style: itemPropsStyle,
				children: labels.map((line, idx) => /* @__PURE__ */ (0, import_jsx_runtime$25.jsx)("code", {
					style: itemPropsLineStyle,
					children: line
				}, idx))
			}),
			code && /* @__PURE__ */ (0, import_jsx_runtime$25.jsxs)("div", {
				style: itemToolbarStyle,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$25.jsxs)("button", {
					type: "button",
					style: {
						...itemToolBtnStyle,
						...codeOpen ? itemToolBtnActiveStyle : null
					},
					onClick: () => setCodeOpen((o) => !o),
					"aria-expanded": codeOpen,
					children: [
						"< / >",
						" ",
						codeOpen ? "收起" : "代码"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime$25.jsxs)("button", {
					type: "button",
					style: itemToolBtnStyle,
					onClick: handleCopy,
					children: ["⧉ ", copied ? "已复制" : "复制"]
				})]
			}),
			code && codeOpen && /* @__PURE__ */ (0, import_jsx_runtime$25.jsx)("pre", {
				style: itemCodeBlockStyle,
				children: /* @__PURE__ */ (0, import_jsx_runtime$25.jsx)("code", {
					style: { fontFamily: "inherit" },
					children: code
				})
			})
		]
	});
}
var import_react$25, import_jsx_runtime$25, headerStyle, titleStyle, hintStyle, itemStyle, itemBlockStyle, itemPreviewStyle, itemNoteStyle, itemPropsStyle, itemPropsLineStyle, itemToolbarStyle, itemToolBtnStyle, itemToolBtnActiveStyle, itemCodeBlockStyle;
var init_VariantSection = __esmMin((() => {
	import_react$25 = /* @__PURE__ */ __toESM(require_react());
	import_jsx_runtime$25 = require_jsx_runtime();
	headerStyle = {
		display: "flex",
		alignItems: "baseline",
		gap: 8,
		marginBottom: 8
	};
	titleStyle = {
		fontSize: "var(--wb-font-caption-size)",
		color: "var(--wb-color-text-tertiary)",
		textTransform: "uppercase",
		letterSpacing: 1,
		fontWeight: 600
	};
	hintStyle = {
		fontSize: "var(--wb-font-caption-size)",
		color: "var(--wb-color-text-tertiary)"
	};
	itemStyle = {
		display: "flex",
		flexDirection: "column",
		gap: 6,
		minWidth: 0
	};
	itemBlockStyle = { width: "100%" };
	itemPreviewStyle = {
		display: "flex",
		alignItems: "center",
		minHeight: 32
	};
	itemNoteStyle = {
		fontSize: "var(--wb-font-caption-size)",
		color: "var(--wb-color-text-secondary)",
		lineHeight: 1.4
	};
	itemPropsStyle = {
		display: "flex",
		flexDirection: "column",
		gap: 2
	};
	itemPropsLineStyle = {
		fontFamily: "var(--wb-font-mono, ui-monospace, SFMono-Regular, Menlo, monospace)",
		fontSize: 11,
		lineHeight: 1.5,
		color: "var(--wb-color-text-tertiary)",
		whiteSpace: "nowrap"
	};
	itemToolbarStyle = {
		display: "flex",
		gap: 4,
		marginTop: 2
	};
	itemToolBtnStyle = {
		padding: "2px 8px",
		border: "1px solid var(--wb-border-default)",
		background: "transparent",
		color: "var(--wb-color-text-tertiary)",
		fontSize: 11,
		lineHeight: 1.4,
		borderRadius: 4,
		cursor: "pointer",
		fontFamily: "inherit"
	};
	itemToolBtnActiveStyle = {
		color: "var(--wb-color-text-primary)",
		background: "var(--wb-bg-tertiary, rgba(0, 0, 0, 0.04))"
	};
	itemCodeBlockStyle = {
		margin: "4px 0 0",
		padding: "10px 12px",
		background: "var(--wb-bg-tertiary, #fafafa)",
		border: "1px solid var(--wb-border-default)",
		borderRadius: 6,
		fontFamily: "var(--wb-font-code-family, ui-monospace, SFMono-Regular, Menlo, monospace)",
		fontSize: 12,
		lineHeight: 1.6,
		color: "var(--wb-color-text-primary)",
		overflowX: "auto",
		whiteSpace: "pre"
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/playbook/pages/components/DrawerPage.tsx
function DrawerPage(props) {
	const [open, setOpen] = (0, import_react$24.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime$24.jsxs)("div", {
		style: {
			display: "flex",
			justifyContent: "center",
			minHeight: 120,
			alignItems: "center"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(Button, {
			variant: "primary",
			onClick: () => setOpen(true),
			children: "Open drawer"
		}), /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(Drawer, {
			open,
			onOpenChange: setOpen,
			placement: props.placement,
			size: props.size,
			closable: props.closable,
			mask: props.mask,
			maskClosable: props.maskClosable,
			keyboard: props.keyboard,
			title: props.title || void 0,
			footer: /* @__PURE__ */ (0, import_jsx_runtime$24.jsxs)(DrawerFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(Button, {
				onClick: () => setOpen(false),
				children: "取消"
			}), /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(Button, {
				variant: "primary",
				onClick: () => setOpen(false),
				children: "保存"
			})] }),
			children: /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(DrawerBody, { children: /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)("p", {
				style: {
					margin: 0,
					color: "var(--wb-color-text-secondary)"
				},
				children: "Drawer 内容；可放任意 React 节点。点击遮罩 / 按 ESC / 点击 × 都会关闭（视 props 而定）。"
			}) })
		})]
	});
}
function PlacementDemo({ placement }) {
	const [open, setOpen] = (0, import_react$24.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime$24.jsxs)(import_jsx_runtime$24.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(Button, {
		variant: "secondary",
		onClick: () => setOpen(true),
		children: placement
	}), /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(Drawer, {
		open,
		onOpenChange: setOpen,
		placement,
		title: `placement=${placement}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(DrawerBody, { children: /* @__PURE__ */ (0, import_jsx_runtime$24.jsxs)("p", {
			style: {
				margin: 0,
				color: "var(--wb-color-text-secondary)"
			},
			children: [
				"从 ",
				/* @__PURE__ */ (0, import_jsx_runtime$24.jsx)("code", { children: placement }),
				" 方向滑入。垂直方向（top/bottom）容器高度由 size / height 决定；水平方向（left/right）容器宽度由 size / width 决定。"
			]
		}) })
	})] });
}
function SizeDemo({ size }) {
	const [open, setOpen] = (0, import_react$24.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime$24.jsxs)(import_jsx_runtime$24.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(Button, {
		variant: "secondary",
		onClick: () => setOpen(true),
		children: size
	}), /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(Drawer, {
		open,
		onOpenChange: setOpen,
		size,
		title: `size=${size}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(DrawerBody, { children: /* @__PURE__ */ (0, import_jsx_runtime$24.jsxs)("p", {
			style: {
				margin: 0,
				color: "var(--wb-color-text-secondary)"
			},
			children: [
				"size=",
				/* @__PURE__ */ (0, import_jsx_runtime$24.jsx)("code", { children: size }),
				"，对齐 antd 默认值（default=378 / large=736）。"
			]
		}) })
	})] });
}
function ExtraDemo() {
	const [open, setOpen] = (0, import_react$24.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime$24.jsxs)(import_jsx_runtime$24.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(Button, {
		variant: "secondary",
		onClick: () => setOpen(true),
		children: "带 extra"
	}), /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(Drawer, {
		open,
		onOpenChange: setOpen,
		title: "用户详情",
		extra: /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(Button, {
			size: "small",
			children: "编辑"
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(DrawerBody, { children: /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)("p", {
			style: {
				margin: 0,
				color: "var(--wb-color-text-secondary)"
			},
			children: "header 右侧支持任意 ReactNode，用于\"编辑 / 更多操作\"按钮组。"
		}) })
	})] });
}
function NoMaskDemo() {
	const [open, setOpen] = (0, import_react$24.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime$24.jsxs)(import_jsx_runtime$24.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(Button, {
		variant: "secondary",
		onClick: () => setOpen(true),
		children: "mask=false"
	}), /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(Drawer, {
		open,
		onOpenChange: setOpen,
		title: "无遮罩",
		mask: false,
		children: /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(DrawerBody, { children: /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)("p", {
			style: {
				margin: 0,
				color: "var(--wb-color-text-secondary)"
			},
			children: "无遮罩模式：背景仍可交互，仅容器拿事件。常用于\"侧边检索面板\"等不打断 主流程的场景。"
		}) })
	})] });
}
function DrawerVariants() {
	return /* @__PURE__ */ (0, import_jsx_runtime$24.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 24
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(VariantSection, {
				title: "按 placement",
				children: ALL_PLACEMENTS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(VariantItem, {
					propsLabel: `placement="${p}"`,
					code: `const [open, setOpen] = useState(false);

<>
  <Button onClick={() => setOpen(true)}>Open</Button>
  <Drawer open={open} onOpenChange={setOpen} placement="${p}" title="placement=${p}">
    <DrawerBody>...</DrawerBody>
  </Drawer>
</>`,
					children: /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(PlacementDemo, { placement: p })
				}, p))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(VariantSection, {
				title: "按 size",
				children: ALL_SIZES$6.map((s) => /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(VariantItem, {
					propsLabel: `size="${s}"`,
					code: `<Drawer open={open} onOpenChange={setOpen} size="${s}" title="size=${s}">
  <DrawerBody>size=${s}（${s === "default" ? "378px" : "736px"}）</DrawerBody>
</Drawer>`,
					children: /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(SizeDemo, { size: s })
				}, s))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$24.jsxs)(VariantSection, {
				title: "Header extra / 无遮罩",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(VariantItem, {
					propsLabel: "extra={<Button>编辑</Button>}",
					code: `<Drawer
  open={open}
  onOpenChange={setOpen}
  title="用户详情"
  extra={<Button size="small">编辑</Button>}
>
  <DrawerBody>...</DrawerBody>
</Drawer>`,
					children: /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(ExtraDemo, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(VariantItem, {
					propsLabel: "mask={false}",
					code: `<Drawer open={open} onOpenChange={setOpen} title="无遮罩" mask={false}>
  <DrawerBody>背景仍可交互</DrawerBody>
</Drawer>`,
					children: /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(NoMaskDemo, {})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(DrawerGapsBlock, {})
		]
	});
}
/**
* 能力缺口公示（精简版） —— 与 antd Drawer 标准能力对照。
*
* 长版见 docs/drawer-design-gaps.md；任何一项落地后，**同时**从两处移除。
*/
function DrawerGapsBlock() {
	return /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(GapsBlock, {
		gapDocPath: "docs/drawer-design-gaps.md",
		blocking: [
			{
				title: "dark 主题适配",
				description: /* @__PURE__ */ (0, import_jsx_runtime$24.jsxs)(import_jsx_runtime$24.Fragment, { children: [
					"容器走 ",
					/* @__PURE__ */ (0, import_jsx_runtime$24.jsx)("code", { children: "--wb-bg-primary" }),
					" 但关闭按钮颜色 ",
					/* @__PURE__ */ (0, import_jsx_runtime$24.jsx)("code", { children: "rgba(0,0,0,...)" }),
					" 钉死，dark 下会突兀。希望设计师明确 dark 策略。"
				] })
			},
			{
				title: "forceRender / keepMounted",
				description: /* @__PURE__ */ (0, import_jsx_runtime$24.jsxs)(import_jsx_runtime$24.Fragment, { children: [
					"当前 ",
					/* @__PURE__ */ (0, import_jsx_runtime$24.jsx)("code", { children: "open=false" }),
					" 直接 unmount，每次重开都是空状态。设置面板 / 复杂表单需要保留输入态。"
				] })
			},
			{
				title: "遮罩规格分歧",
				description: /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(import_jsx_runtime$24.Fragment, { children: "当前黑 45%（对齐 antd），与 Modal 的\"白底 + blur 40px\"不一致。希望设计师明确 Drawer 是否单独一套遮罩。" })
			}
		],
		pending: [
			{
				title: "afterOpenChange 回调",
				description: /* @__PURE__ */ (0, import_jsx_runtime$24.jsxs)(import_jsx_runtime$24.Fragment, { children: [
					"动画结束才视为关闭完成。当前 ",
					/* @__PURE__ */ (0, import_jsx_runtime$24.jsx)("code", { children: "onOpenChange(false)" }),
					" 立刻触发，关闭动画期间状态已切换。"
				] })
			},
			{
				title: "push 嵌套反馈",
				description: /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(import_jsx_runtime$24.Fragment, { children: "子 Drawer 打开时父 Drawer 反向位移 180px（antd 默认）。当前未实现，多层 Drawer 直接堆叠。" })
			},
			{
				title: "getContainer 自定义挂载",
				description: /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(import_jsx_runtime$24.Fragment, { children: "当前固定挂 body。\"卡片内嵌迷你 Drawer\"等局部抽屉场景需要挂到指定容器。" })
			},
			{
				title: "分区域 style 透传",
				description: /* @__PURE__ */ (0, import_jsx_runtime$24.jsxs)(import_jsx_runtime$24.Fragment, { children: [
					"antd 暴露 ",
					/* @__PURE__ */ (0, import_jsx_runtime$24.jsx)("code", { children: "headerStyle / bodyStyle / footerStyle / maskStyle / drawerStyle" }),
					"；当前仅 className / rootClassName。"
				] })
			},
			{
				title: "拖拽改尺寸",
				description: /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(import_jsx_runtime$24.Fragment, { children: "用户拖边缘改宽度（开发者工具风格）。antd 没有内置，但业务有需求。" })
			},
			{
				title: "size 中间档",
				description: /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(import_jsx_runtime$24.Fragment, { children: "default=378 / large=736 跨度大，缺 480 / 560 这种\"详情查看\"中间档。" })
			},
			{
				title: "移动端响应式",
				description: /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(import_jsx_runtime$24.Fragment, { children: "width=378 在 < 400px 视口下视觉拥挤；考虑小屏自动切底部 sheet。" })
			},
			{
				title: "入场动画曲线",
				description: /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(import_jsx_runtime$24.Fragment, { children: "当前 100% 位移 + emphasized 缓动。希望设计师评估是否要 spring 风格 + mask 同步淡入。" })
			}
		],
		footer: /* @__PURE__ */ (0, import_jsx_runtime$24.jsxs)(import_jsx_runtime$24.Fragment, { children: [
			"底层与 Modal 共用 ",
			/* @__PURE__ */ (0, import_jsx_runtime$24.jsx)("code", { children: "@floating-ui/react" }),
			"（Portal / 焦点陷阱 / lockScroll / dismiss）。 Drawer 本次未拿到独立设计稿，视觉与默认尺寸均对齐 antd Drawer，待设计师后续补稿微调。"
		] })
	});
}
var import_react$24, import_jsx_runtime$24, ALL_PLACEMENTS, ALL_SIZES$6;
var init_DrawerPage = __esmMin((() => {
	import_react$24 = /* @__PURE__ */ __toESM(require_react());
	init_Button();
	init_Drawer();
	init_GapsBlock();
	init_VariantSection();
	import_jsx_runtime$24 = require_jsx_runtime();
	ALL_PLACEMENTS = [
		"right",
		"left",
		"top",
		"bottom"
	];
	ALL_SIZES$6 = ["default", "large"];
}));
//#endregion
//#region ../../packages/agent-ui/src/playbook/pages/components/DropdownPage.tsx
function DropdownPage(props) {
	const [last, setLast] = (0, import_react$23.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime$23.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			gap: 8,
			minHeight: 200
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(Dropdown, {
			placement: props.placement,
			disabled: props.disabled,
			items: DEMO_ITEMS,
			onSelect: (key) => setLast(key),
			trigger: /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(Button, {
				variant: "secondary",
				children: props.label || "Actions"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime$23.jsxs)("span", {
			style: {
				fontSize: "var(--wb-font-caption-size)",
				color: "var(--wb-color-text-tertiary)"
			},
			children: ["上次选择：", last || "(无)"]
		})]
	});
}
function DropdownVariants() {
	return /* @__PURE__ */ (0, import_jsx_runtime$23.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 16
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(DemoBlock, {
				title: "基础用法",
				description: /* @__PURE__ */ (0, import_jsx_runtime$23.jsxs)(import_jsx_runtime$23.Fragment, { children: [
					"通过 ",
					/* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("code", { children: "items" }),
					" 数组配置菜单项，每项支持 ",
					/* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("code", { children: "key" }),
					" /",
					/* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("code", { children: "label" }),
					" / ",
					/* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("code", { children: "disabled" }),
					" / ",
					/* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("code", { children: "danger" }),
					" /",
					/* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("code", { children: "divider" }),
					"。点击触发器打开菜单，选中后默认关闭。"
				] }),
				code: `const items: DropdownItem[] = [
  { key: 'edit', label: '编辑' },
  { key: 'duplicate', label: '复制' },
  { key: 'archive', label: '归档', disabled: true },
  { key: 'delete', label: '删除', danger: true, divider: true },
];

<Dropdown
  items={items}
  // onSelect 拿到点击项的 key，自己分发到业务逻辑
  onSelect={key => {
    if (key === 'edit')      handleEdit();
    if (key === 'duplicate') handleDuplicate();
    if (key === 'delete')    handleDelete();
  }}
  trigger={<Button variant="secondary">Actions ▾</Button>}
/>`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(Dropdown, {
					items: DEMO_ITEMS,
					trigger: /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(Button, {
						variant: "secondary",
						children: "Actions ▾"
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(DemoBlock, {
				title: "带图标的菜单项",
				description: /* @__PURE__ */ (0, import_jsx_runtime$23.jsxs)(import_jsx_runtime$23.Fragment, { children: [
					"每项可传 ",
					/* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("code", { children: "icon" }),
					"（任意 ReactNode）；图标会渲染在 label 左侧，颜色继承 文字色，不需要单独设色。"
				] }),
				code: `const items: DropdownItem[] = [
  { key: 'edit', label: '编辑', icon: <EditIcon /> },
  { key: 'copy', label: '复制', icon: <CopyIcon /> },
  { key: 'delete', label: '删除', icon: <TrashIcon />, danger: true, divider: true },
];

<Dropdown
  items={items}
  onSelect={key => console.log('clicked', key)}
  trigger={<Button>带图标 ▾</Button>}
/>`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(Dropdown, {
					items: ICON_ITEMS,
					trigger: /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(Button, {
						variant: "secondary",
						children: "带图标 ▾"
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(DemoBlock, {
				title: "选中态（selected）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$23.jsxs)(import_jsx_runtime$23.Fragment, { children: [
					"通过 ",
					/* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("code", { children: "selected" }),
					" 标记「当前生效项」，常用于「排序方式 / 视图模式」等 radio 语义。注意这**不是多选**，多选请使用 Select 组件。"
				] }),
				code: `const [sortBy, setSortBy] = useState<'date' | 'name' | 'size'>('date');
const items: DropdownItem[] = [
  { key: 'date', label: '按日期', selected: sortBy === 'date' },
  { key: 'name', label: '按名称', selected: sortBy === 'name' },
  { key: 'size', label: '按大小', selected: sortBy === 'size' },
];

<Dropdown
  items={items}
  onSelect={key => setSortBy(key as 'date' | 'name' | 'size')}
  trigger={<Button>排序：{sortBy} ▾</Button>}
/>`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(SelectedDropdownExample, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(DemoBlock, {
				title: "受控开关（open + onOpenChange）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$23.jsxs)(import_jsx_runtime$23.Fragment, { children: [
					"外部传 ",
					/* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("code", { children: "open" }),
					" + ",
					/* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("code", { children: "onOpenChange" }),
					" 受控菜单开合。在",
					/* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("code", { children: "onSelect" }),
					" 中返回 ",
					/* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("code", { children: "false" }),
					" 可阻止自动关闭，与受控模式配合 使用。"
				] }),
				code: `const [open, setOpen] = useState(false);
const [last, setLast] = useState<string>('');

<Dropdown
  open={open}
  onOpenChange={setOpen}
  items={items}
  onSelect={key => {
    setLast(key);
    // 返回 false 可阻止自动关闭
  }}
  trigger={<Button variant="primary">{open ? '已打开 ▾' : '关闭中 ▾'}</Button>}
/>`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(ControlledDropdownExample, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(DemoBlock, {
				title: "触发方式（triggerMode）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$23.jsxs)(import_jsx_runtime$23.Fragment, { children: [
					"默认 ",
					/* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("code", { children: "click" }),
					"。设置 ",
					/* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("code", { children: "triggerMode=\"hover\"" }),
					" 时鼠标 移入触发器即展开，常用于导航栏的下拉菜单。"
				] }),
				code: `<Dropdown
  items={items}
  triggerMode="hover"
  onSelect={key => console.log('selected', key)}
  trigger={<Button variant="secondary">Hover me ▾</Button>}
/>`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(Dropdown, {
					items: DEMO_ITEMS,
					triggerMode: "hover",
					trigger: /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(Button, {
						variant: "secondary",
						children: "Hover me ▾"
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(DemoBlock, {
				title: "整体禁用（disabled）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$23.jsxs)(import_jsx_runtime$23.Fragment, { children: [
					"传 ",
					/* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("code", { children: "disabled" }),
					" 时整个触发器不响应（透传到底层 Popover）。设计稿未规定 触发器自身的禁用视觉，详见能力缺口。"
				] }),
				code: `<Dropdown
  disabled
  items={items}
  trigger={<Button variant="secondary">Disabled ▾</Button>}
/>`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(Dropdown, {
					disabled: true,
					items: DEMO_ITEMS,
					trigger: /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(Button, {
						variant: "secondary",
						children: "Disabled ▾"
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(DropdownGapsBlock, {})
		]
	});
}
function SelectedDropdownExample() {
	const [sortBy, setSortBy] = (0, import_react$23.useState)("date");
	return /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(Dropdown, {
		items: [
			{
				key: "date",
				label: "按日期",
				selected: sortBy === "date"
			},
			{
				key: "name",
				label: "按名称",
				selected: sortBy === "name"
			},
			{
				key: "size",
				label: "按大小",
				selected: sortBy === "size"
			}
		],
		onSelect: (key) => setSortBy(key),
		trigger: /* @__PURE__ */ (0, import_jsx_runtime$23.jsxs)(Button, {
			variant: "secondary",
			children: [
				"排序：",
				sortBy === "date" ? "日期" : sortBy === "name" ? "名称" : "大小",
				" ▾"
			]
		})
	});
}
function ControlledDropdownExample() {
	const [open, setOpen] = (0, import_react$23.useState)(false);
	const [last, setLast] = (0, import_react$23.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime$23.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 8,
			alignItems: "flex-start"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(Dropdown, {
			open,
			onOpenChange: setOpen,
			items: DEMO_ITEMS,
			onSelect: (key) => {
				setLast(key);
			},
			trigger: /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(Button, {
				variant: "primary",
				children: open ? "已打开 ▾" : "关闭中 ▾"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime$23.jsxs)("span", {
			style: {
				fontSize: "var(--wb-font-caption-size)",
				color: "var(--wb-color-text-tertiary)"
			},
			children: [
				"外部状态：",
				/* @__PURE__ */ (0, import_jsx_runtime$23.jsxs)("code", { children: ["open = ", String(open)] }),
				"，上次选择：",
				last || "(无)"
			]
		})]
	});
}
/**
* 能力缺口公示 —— 与 docs/dropdown-design-gaps.md 保持一致。
* 任一项落地后，把它从两份文档中同时移除。
*/
function DropdownGapsBlock() {
	return /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(GapsBlock, {
		gapDocPath: "docs/dropdown-design-gaps.md",
		blocking: [
			{
				title: "多级菜单（子菜单）",
				description: "\"移动到... / 复制到...\"等业务场景需要，目前不支持嵌套，待设计师评审。"
			},
			{
				title: "菜单项右侧快捷键标签",
				description: "\"⌘+S 保存\"等场景需要 label + shortcut 双列布局，目前未做。"
			},
			{
				title: "菜单项分组标题",
				description: "antd ItemGroup 的非交互组标题，目前只有 divider，待设计师评审是否补稿。"
			},
			{
				title: "danger 项 hover 视觉",
				description: "当前 hover 时仅文字红色，背景仍是常规 hover；待设计师确认是否需要红色软底。"
			}
		],
		pending: [
			{
				title: "selected 项视觉",
				description: "当前用 --wb-bg-active 背景，与 hover 区分度不够，待设计师确认是否补对勾/竖条。"
			},
			{
				title: "菜单最大高度 + 内部滚动",
				description: "items 多时会一直撑下去，缺少 max-height + overflow 兜底。"
			},
			{
				title: "a11y roving tabindex",
				description: "当前每项 tabIndex=0，应改为 -1 + 内部 arrow keys 导航。"
			}
		],
		footer: /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(import_jsx_runtime$23.Fragment, { children: "多列大菜单 / overlay 自定义渲染 / 多选 / 异步项内置 loading 等本次明确不做（详见 GAP 长版第 3 段）。多选请使用 Select 组件。" })
	});
}
var import_react$23, import_jsx_runtime$23, DEMO_ITEMS, ICON_ITEMS;
var init_DropdownPage = __esmMin((() => {
	import_react$23 = /* @__PURE__ */ __toESM(require_react());
	init_Button();
	init_Dropdown();
	init_DemoBlock();
	init_GapsBlock();
	import_jsx_runtime$23 = require_jsx_runtime();
	DEMO_ITEMS = [
		{
			key: "edit",
			label: "编辑"
		},
		{
			key: "duplicate",
			label: "复制"
		},
		{
			key: "archive",
			label: "归档",
			disabled: true
		},
		{
			key: "delete",
			label: "删除",
			danger: true,
			divider: true
		}
	];
	ICON_ITEMS = [
		{
			key: "edit",
			label: "编辑",
			icon: /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("svg", {
				viewBox: "0 0 16 16",
				width: "14",
				height: "14",
				"aria-hidden": "true",
				focusable: "false",
				children: /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("path", {
					d: "M11.5 2.5L13.5 4.5L5 13H3v-2L11.5 2.5z",
					stroke: "currentColor",
					strokeWidth: "1.5",
					strokeLinejoin: "round",
					fill: "none"
				})
			})
		},
		{
			key: "copy",
			label: "复制",
			icon: /* @__PURE__ */ (0, import_jsx_runtime$23.jsxs)("svg", {
				viewBox: "0 0 16 16",
				width: "14",
				height: "14",
				"aria-hidden": "true",
				focusable: "false",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("rect", {
					x: "5",
					y: "5",
					width: "8",
					height: "8",
					rx: "1",
					stroke: "currentColor",
					strokeWidth: "1.5",
					fill: "none"
				}), /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("path", {
					d: "M3 3h8v2H5v6H3V3z",
					fill: "currentColor"
				})]
			})
		},
		{
			key: "delete",
			label: "删除",
			icon: /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("svg", {
				viewBox: "0 0 16 16",
				width: "14",
				height: "14",
				"aria-hidden": "true",
				focusable: "false",
				children: /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("path", {
					d: "M3 5h10M6 5V3h4v2M5 5l1 8h4l1-8",
					stroke: "currentColor",
					strokeWidth: "1.5",
					strokeLinejoin: "round",
					fill: "none"
				})
			}),
			danger: true,
			divider: true
		}
	];
}));
//#endregion
//#region ../../packages/agent-ui/src/playbook/pages/components/IconPage.tsx
function IconPage(props) {
	const rotate = Number(props.rotate);
	const color = COLOR_TOKEN_MAP[props.color];
	return /* @__PURE__ */ (0, import_jsx_runtime$22.jsxs)("div", {
		style: {
			display: "flex",
			gap: 32,
			alignItems: "center",
			minHeight: 80
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(Icon, {
			component: Settings,
			size: props.size,
			spin: props.spin,
			rotate,
			color
		}), /* @__PURE__ */ (0, import_jsx_runtime$22.jsxs)("div", {
			style: {
				fontSize: "var(--wb-font-caption-size)",
				color: "var(--wb-color-text-tertiary)"
			},
			children: [
				"size: ",
				/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("code", { children: props.size }),
				", spin: ",
				/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("code", { children: String(props.spin) }),
				", rotate: ",
				/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("code", { children: rotate }),
				"°, color: ",
				/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("code", { children: props.color })
			]
		})]
	});
}
function IconVariants() {
	return /* @__PURE__ */ (0, import_jsx_runtime$22.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 16
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$22.jsxs)(DemoBlock, {
				title: "基础用法",
				description: /* @__PURE__ */ (0, import_jsx_runtime$22.jsxs)(import_jsx_runtime$22.Fragment, { children: [
					"三种资产形态：(1) React SVG 组件（lucide / 自写 svg）；(2) 资源对象 ",
					/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("code", { children: "{ url, themable }" }),
					"； (3) 用 ",
					/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("code", { children: "createIcon" }),
					" 工厂固化成具名组件。"
				] }),
				code: `import { Icon, createIcon } from '@genie/agent-ui/foundation';
import { Settings } from 'lucide-react';
import logoUrl from './my-logo.svg';

// 1. 直接传组件资产
<Icon component={Settings} />

// 2. 传资源对象（品牌色资源 + dark 反相）
<Icon component={{ url: logoUrl, themable: true }} />

// 3. createIcon 工厂 —— 等价 antd 自动生成的 <HomeOutlined />
const SettingsIcon = createIcon(Settings);
<SettingsIcon size='lg' />`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(Icon, { component: Settings }),
					/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(Icon, {
						component: Sparkles,
						color: "var(--wb-status-warning)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(TencentDocsIcon, { size: "md" }),
					/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(AddIcon, {}),
					/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(SearchIcon$2, {})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(DemoBlock, {
				title: "四档尺寸（size）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$22.jsxs)(import_jsx_runtime$22.Fragment, { children: [
					"预设档位：",
					/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("code", { children: "sm" }),
					"(14) / ",
					/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("code", { children: "md" }),
					"(16，默认) / ",
					/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("code", { children: "lg" }),
					"(20) /",
					/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("code", { children: "xl" }),
					"(24)；也可直接传 ",
					/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("code", { children: "{number}" }),
					"。"
				] }),
				code: `<Icon component={Settings} size='sm' />
<Icon component={Settings} size='md' />
<Icon component={Settings} size='lg' />
<Icon component={Settings} size='xl' />
<Icon component={Settings} size={48} />`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$22.jsxs)("div", {
					style: {
						display: "inline-flex",
						gap: 16,
						alignItems: "center"
					},
					children: [ALL_SIZES$5.map((s) => /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(Icon, {
						component: Settings,
						size: s
					}, s)), /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(Icon, {
						component: Settings,
						size: 48
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$22.jsxs)(DemoBlock, {
				title: "旋转动画（spin）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$22.jsxs)(import_jsx_runtime$22.Fragment, { children: [
					"传 ",
					/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("code", { children: "spin" }),
					" 后图标按 1.2s/圈匀速旋转，节奏与 Loading spinner 一致。 替代之前在 SVG 内手写 ",
					/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("code", { children: "<animateTransform>" }),
					" 的方案。"
				] }),
				code: `<Icon component={Settings} spin />
<AssistantSpinnerIcon spin />
<AssistantSpinnerIcon spin filled />`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(Icon, {
						component: Settings,
						spin: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(AssistantSpinnerIcon, { spin: true }),
					/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(AssistantSpinnerIcon, {
						spin: true,
						filled: true
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(DemoBlock, {
				title: "静态旋转（rotate）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$22.jsxs)(import_jsx_runtime$22.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("code", { children: "rotate" }),
					" 接受 0/90/180/270 四档静态角度；适合「同一图标做箭头方向」场景。 与 ",
					/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("code", { children: "spin" }),
					" 同时存在时 ",
					/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("code", { children: "spin" }),
					" 优先生效。"
				] }),
				code: `<Icon component={Sparkles} rotate={0} />
<Icon component={Sparkles} rotate={90} />
<Icon component={Sparkles} rotate={180} />
<Icon component={Sparkles} rotate={270} />`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("div", {
					style: {
						display: "inline-flex",
						gap: 16,
						alignItems: "center"
					},
					children: ALL_ROTATES.map((r) => /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(Icon, {
						component: Sparkles,
						rotate: r
					}, r))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(DemoBlock, {
				title: "颜色（color / currentColor）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$22.jsxs)(import_jsx_runtime$22.Fragment, { children: [
					"默认继承 ",
					/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("code", { children: "currentColor" }),
					"（即父级文字色）；可通过 ",
					/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("code", { children: "color" }),
					" prop 指定， 建议传 wb-* token 而不是裸色值。"
				] }),
				code: `{/* 跟随父级文字色 */}
<span style={{ color: 'red' }}>
  <Icon component={Sparkles} />
</span>

{/* 显式 token */}
<Icon component={Sparkles} color='var(--wb-status-success)' />
<Icon component={Sparkles} color='var(--wb-status-warning)' />
<Icon component={Sparkles} color='var(--wb-status-error)' />`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$22.jsxs)("div", {
					style: {
						display: "inline-flex",
						gap: 16,
						alignItems: "center"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$22.jsxs)("span", {
							style: {
								color: "var(--wb-status-info)",
								display: "inline-flex",
								gap: 4,
								alignItems: "center"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(Icon, { component: Sparkles }), "currentColor"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(Icon, {
							component: Sparkles,
							color: "var(--wb-status-success)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(Icon, {
							component: Sparkles,
							color: "var(--wb-status-warning)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(Icon, {
							component: Sparkles,
							color: "var(--wb-status-error)"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$22.jsxs)(DemoBlock, {
				title: "createIcon 工厂",
				description: /* @__PURE__ */ (0, import_jsx_runtime$22.jsxs)(import_jsx_runtime$22.Fragment, { children: [
					"把图标资产固化成具名组件，等价 antd 自动生成的 ",
					/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("code", { children: "<HomeOutlined />" }),
					"； 可固化默认 ",
					/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("code", { children: "size" }),
					" / ",
					/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("code", { children: "strokeWidth" }),
					" / ",
					/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("code", { children: "color" }),
					"。"
				] }),
				code: `const BigSparkle = createIcon(Sparkles, { size: 'xl' });
const ThickSettings = createIcon(Settings, { strokeWidth: 2.5 });

<BigSparkle />        {/* 24px */}
<ThickSettings />     {/* 16px, stroke 2.5 */}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(BigSparkle, {}), /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(ThickSettings, {})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(IconGalleryBlock, {}),
			/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(IconGapsBlock, {})
		]
	});
}
/**
* 能力缺口公示 —— 与 docs/icon-design-gaps.md 同步。
*/
function IconGapsBlock() {
	return /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(GapsBlock, {
		gapDocPath: "docs/icon-design-gaps.md",
		blocking: [{
			title: "没有 --wb-icon-size-* token",
			description: "sm/md/lg/xl 在 IconSize.SCALE 中以纯数字（14/16/20/24）写死，没接 token；与 typography / spacing 不一致，未来全局改尺寸需逐处改源码。"
		}, {
			title: "笔触粗细规范未对齐",
			description: "lucide 默认 strokeWidth=2，本组件 size=sm/md 时常显得偏粗；antd Outlined/Filled 双家族体系本组件未规划。待与设计师评审\"sm 用 1.5，lg/xl 用 2\"等规则。"
		}],
		pending: [
			{
				title: "aria 默认只在 size 命中预设时设置 width/height",
				description: "传任意 number 时 SVG 用 currentColor + 数字尺寸渲染 OK，但未给 aria-hidden 默认值；需评审\"装饰性图标\"默认是否 aria-hidden。"
			},
			{
				title: "没有状态色板（hover / active / disabled）",
				description: "当前 color 只接 token / 任意色值，状态由父级文字色 currentColor 自然继承；如需\"icon 独立 hover 高亮\"需要 className + 局部样式。"
			},
			{
				title: "size=\"full\" 未实现",
				description: "antd 部分图标支持 100% 父容器尺寸；本组件只支持枚举 + 数字。待业务踩到再补。"
			},
			{
				title: "双色 / 多色图标暂无规范",
				description: "部分品牌图标（如 TencentDocsIcon）已经是多色 SVG，但 currentColor 体系下染色规则未定；待设计师明确\"哪些图标允许多色 / 哪些必须随主题反相\"。"
			},
			{
				title: "themable 反相依赖父级背景对比",
				description: "资源对象资产的 themable=true 在 dark 主题下做 invert 反相；如父级背景是 brand 色而非 bg-primary，反相效果会偏。待评审是否引入\"基于像素亮度\"的反相策略。"
			}
		],
		footer: /* @__PURE__ */ (0, import_jsx_runtime$22.jsxs)(import_jsx_runtime$22.Fragment, { children: [
			"实现策略：基座（",
			/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("code", { children: "<Icon />" }),
			"）+ 资产分离 + ",
			/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("code", { children: "createIcon" }),
			" 工厂。 新增图标走 ",
			/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("code", { children: "foundation/components/Icon/icons/index.ts" }),
			"，全量画廊会自动同步。 避免在业务侧重新写 ",
			/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("code", { children: "<svg>" }),
			"。"
		] })
	});
}
function IconGalleryBlock() {
	const items = import_react$22.useMemo(() => {
		const entries = [];
		for (const [name, value] of Object.entries(icons_exports)) {
			const isIconName = /Icon(V\d+)?$/.test(name);
			const isRenderable = typeof value === "function" || typeof value === "object" && value !== null && "$$typeof" in value;
			if (isIconName && isRenderable && !GALLERY_BLACKLIST.has(name)) entries.push({
				name,
				Comp: value
			});
		}
		entries.sort((a, b) => a.name.localeCompare(b.name));
		return entries;
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(DemoBlock, {
		title: `全量预制图标（${items.length} 个）`,
		description: /* @__PURE__ */ (0, import_jsx_runtime$22.jsxs)(import_jsx_runtime$22.Fragment, { children: [
			"自动从 ",
			/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("code", { children: "foundation/components/Icon/icons/index.ts" }),
			" 收集，按字母序排列。 新增图标时",
			/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("strong", { children: "先把 createIcon 包好的具名组件加到 index.ts 的 export 里" }),
			"， 本画廊会自动同步。",
			/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("br", {}),
			"悬停可看到每个图标的导出名；新代码",
			/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("strong", { children: "从这里挑" }),
			"，避免重复造轮子。"
		] }),
		children: /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("div", {
			style: galleryGridStyle,
			children: items.map(({ name, Comp }) => /* @__PURE__ */ (0, import_jsx_runtime$22.jsxs)("div", {
				style: galleryCellStyle,
				title: name,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("div", {
					style: galleryIconWrapStyle,
					children: /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(Comp, { size: "lg" })
				}), /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("div", {
					style: galleryNameStyle,
					children: name.replace(/Icon$/, "")
				})]
			}, name))
		})
	});
}
var import_react$22, import_jsx_runtime$22, COLOR_TOKEN_MAP, ALL_SIZES$5, ALL_ROTATES, GALLERY_BLACKLIST, galleryGridStyle, galleryCellStyle, galleryIconWrapStyle, galleryNameStyle, BigSparkle, ThickSettings;
var init_IconPage = __esmMin((() => {
	init_lucide_react();
	import_react$22 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	init_icons();
	init_DemoBlock();
	init_GapsBlock();
	import_jsx_runtime$22 = require_jsx_runtime();
	COLOR_TOKEN_MAP = {
		inherit: void 0,
		primary: "var(--wb-color-text-primary)",
		success: "var(--wb-status-success)",
		warning: "var(--wb-status-warning)",
		error: "var(--wb-status-error)"
	};
	ALL_SIZES$5 = [
		"sm",
		"md",
		"lg",
		"xl"
	];
	ALL_ROTATES = [
		0,
		90,
		180,
		270
	];
	GALLERY_BLACKLIST = new Set(["ArtifactFileTypeIcon"]);
	galleryGridStyle = {
		display: "grid",
		gridTemplateColumns: "repeat(auto-fill, minmax(96px, 1fr))",
		gap: 8,
		width: "100%"
	};
	galleryCellStyle = {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		gap: 6,
		padding: "12px 6px",
		border: "1px solid var(--wb-border-default)",
		borderRadius: 6,
		background: "var(--wb-bg-primary)",
		transition: "background 120ms ease, border-color 120ms ease",
		overflow: "hidden",
		cursor: "default"
	};
	galleryIconWrapStyle = {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		width: 32,
		height: 32,
		color: "var(--wb-color-text-primary)"
	};
	galleryNameStyle = {
		fontSize: 11,
		lineHeight: 1.3,
		color: "var(--wb-color-text-tertiary)",
		textAlign: "center",
		width: "100%",
		overflow: "hidden",
		textOverflow: "ellipsis",
		whiteSpace: "nowrap"
	};
	BigSparkle = createIcon(Sparkles, { size: "xl" });
	ThickSettings = createIcon(Settings, { strokeWidth: 2.5 });
}));
//#endregion
//#region ../../packages/agent-ui/src/playbook/pages/components/InputPage.tsx
function InputPage(props) {
	const [value, setValue] = import_react$21.useState("");
	return /* @__PURE__ */ (0, import_jsx_runtime$21.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 12,
			maxWidth: 360
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(Input, {
				size: props.size,
				disabled: props.disabled,
				status: props.error ? "error" : void 0,
				placeholder: props.placeholder || "Type here...",
				value,
				onChange: (e) => setValue(e.target.value)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$21.jsxs)("div", {
				style: {
					fontSize: "var(--wb-font-caption-size)",
					color: "var(--wb-color-text-tertiary)"
				},
				children: ["value: ", /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("code", { children: value || "(empty)" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$21.jsxs)("div", {
				style: {
					fontSize: "var(--wb-font-caption-size)",
					color: "var(--wb-color-text-tertiary)"
				},
				children: [
					"Foundation Input = 原生 input + wb 视觉补丁。受控/非受控、prefix/suffix、allowClear、 onPressEnter 已对齐 antd 公开 API。仅当 ",
					/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("code", { children: "status=\"error\"" }),
					" 时显示红色描边。"
				]
			})
		]
	});
}
function InputVariants() {
	return /* @__PURE__ */ (0, import_jsx_runtime$21.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 16
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(DemoBlock, {
				title: "基础用法",
				description: /* @__PURE__ */ (0, import_jsx_runtime$21.jsxs)(import_jsx_runtime$21.Fragment, { children: [
					"最简单的用法，传入 ",
					/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("code", { children: "placeholder" }),
					" 与 ",
					/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("code", { children: "onChange" }),
					" 即可。 Input 同时支持受控（",
					/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("code", { children: "value" }),
					" + ",
					/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("code", { children: "onChange" }),
					"）与非受控 （",
					/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("code", { children: "defaultValue" }),
					"），两者 API 与 antd 一致。"
				] }),
				code: `{/* 受控 */}
const [value, setValue] = useState('');
<Input
  value={value}
  onChange={e => setValue(e.target.value)}
  placeholder="受控（value + onChange）"
/>

{/* 非受控 */}
<Input defaultValue="非受控初始值" placeholder="非受控（defaultValue）" />`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$21.jsxs)("div", {
					style: {
						display: "flex",
						flexDirection: "column",
						gap: 8,
						maxWidth: 320
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(ControlledExample, {}), /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(Input, {
						defaultValue: "非受控初始值",
						placeholder: "非受控（defaultValue）"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(DemoBlock, {
				title: "尺寸",
				description: /* @__PURE__ */ (0, import_jsx_runtime$21.jsxs)(import_jsx_runtime$21.Fragment, { children: [
					"Input 提供三种尺寸：小 (",
					/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("code", { children: "small" }),
					" = 24px)、中 (",
					/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("code", { children: "medium" }),
					" = 32px，默认)、 大 (",
					/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("code", { children: "large" }),
					" = 40px)。注：v0.2 设计稿未明确钉死单档，三档为 v0.1 延续，能力缺口里已记录请设计师 review。"
				] }),
				code: `<Input size="large" placeholder="Large" />
<Input placeholder="Medium（默认）" />
<Input size="small" placeholder="Small" />`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$21.jsxs)("div", {
					style: {
						display: "flex",
						flexDirection: "column",
						gap: 8,
						maxWidth: 320
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(Input, {
							size: "large",
							placeholder: "Large"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(Input, {
							size: "medium",
							placeholder: "Medium（默认）"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(Input, {
							size: "small",
							placeholder: "Small"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(DemoBlock, {
				title: "状态",
				description: /* @__PURE__ */ (0, import_jsx_runtime$21.jsxs)(import_jsx_runtime$21.Fragment, { children: [
					"通过 ",
					/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("code", { children: "status=\"error\"" }),
					" 标记校验失败状态（红色描边）。",
					/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("code", { children: "disabled" }),
					" 透传原生属性，禁用输入并显示禁用视觉。设计稿暂未出 warning 视觉，本次只实现 error。"
				] }),
				code: `<Input placeholder="默认状态" />
<Input placeholder="禁用状态" disabled />
<Input defaultValue="非法值" status="error" />`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$21.jsxs)("div", {
					style: {
						display: "flex",
						flexDirection: "column",
						gap: 8,
						maxWidth: 320
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(Input, { placeholder: "默认状态" }),
						/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(Input, {
							placeholder: "禁用状态",
							disabled: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(Input, {
							defaultValue: "非法值",
							status: "error"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(DemoBlock, {
				title: "前后缀装饰",
				description: /* @__PURE__ */ (0, import_jsx_runtime$21.jsxs)(import_jsx_runtime$21.Fragment, { children: [
					"通过 ",
					/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("code", { children: "prefix" }),
					" / ",
					/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("code", { children: "suffix" }),
					" 在输入框内部左右两侧放置 装饰节点（图标、文字、按钮等）。装饰节点不撑大输入框高度，颜色继承文字第三级色。"
				] }),
				code: `<Input prefix={<SearchIcon />} placeholder="只有前缀" />
<Input suffix={<FilterIcon />} placeholder="只有后缀" />
<Input prefix={<SearchIcon />} suffix={<FilterIcon />} placeholder="前后都有" />`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$21.jsxs)("div", {
					style: {
						display: "flex",
						flexDirection: "column",
						gap: 8,
						maxWidth: 320
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(Input, {
							prefix: SearchIcon,
							placeholder: "只有前缀"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(Input, {
							suffix: FilterIcon,
							placeholder: "只有后缀"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(Input, {
							prefix: SearchIcon,
							suffix: FilterIcon,
							placeholder: "前后都有"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(DemoBlock, {
				title: "搜索框组合：prefix + 清除按钮 + 回车钩子",
				description: /* @__PURE__ */ (0, import_jsx_runtime$21.jsxs)(import_jsx_runtime$21.Fragment, { children: [
					"设计稿 ardot 229:54 ",
					/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("code", { children: "wb-search" }),
					" 的标准用法：左侧搜索图标 +",
					/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("code", { children: "allowClear" }),
					"（有值时右侧出现清除按钮）+ ",
					/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("code", { children: "onPressEnter" }),
					"（回车时触发搜索）。下方示例按回车时会在控制台打印当前值。"
				] }),
				code: `<Input
  prefix={<SearchIcon />}
  allowClear
  placeholder="全局搜索"
  onPressEnter={e => {
    const value = (e.target as HTMLInputElement).value;
    runSearch(value);
  }}
/>`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$21.jsxs)("div", {
					style: {
						display: "flex",
						flexDirection: "column",
						gap: 8,
						maxWidth: 360
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(Input, {
						prefix: SearchIcon,
						allowClear: true,
						placeholder: "全局搜索",
						onPressEnter: (e) => {
							console.log("[InputDemo] 回车搜索:", e.target.value);
						}
					}), /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("div", {
						style: {
							fontSize: "var(--wb-font-caption-size)",
							color: "var(--wb-color-text-tertiary)"
						},
						children: "提示：输入文字后按回车，或点击右侧清除按钮。"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(DemoBlock, {
				title: "variant=\"global\"：全局搜索变体",
				description: /* @__PURE__ */ (0, import_jsx_runtime$21.jsxs)(import_jsx_runtime$21.Fragment, { children: [
					"对齐 ardot ",
					/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("code", { children: "674:305;674:246" }),
					"（type=global）：白底 + 1px 浅描边 + 左内边距 20px。用于顶栏亮底全局搜索这类场景；其他细节（cornerRadius / 边框 色 / placeholder 渐变文字色）的取舍记录在 ",
					/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("code", { children: "docs/input-design-gaps.md" }),
					"。"
				] }),
				code: `<Input
  variant="global"
  prefix={<SearchIcon />}
  placeholder="搜索数据、工作流、任务、模型"
  style={{ width: 240 }}
/>`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("div", {
					style: {
						display: "flex",
						flexDirection: "column",
						gap: 8
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(Input, {
						variant: "global",
						prefix: SearchIcon,
						placeholder: "搜索数据、工作流、任务、模型",
						style: { width: 240 }
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(DemoBlock, {
				title: "variant=\"filled\"：填充式输入框（弹窗 / Modal 内）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$21.jsxs)(import_jsx_runtime$21.Fragment, { children: [
					"用于\"已经在 primary 面板内\"的场景（弹窗 / Drawer / Modal 内的搜索输入框等）。 背景切到 ",
					/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("code", { children: "--wb-bg-secondary" }),
					" 与外层 ",
					/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("code", { children: "--wb-bg-primary" }),
					" 拉开层级， 默认无可见边框，hover/focus 切到与 ",
					/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("code", { children: "default" }),
					" 一致的描边色。几何 （高度 / 圆角 / padding）完全继承 default 的 size 修饰类。"
				] }),
				code: `<Input.Search
  variant="filled"
  placeholder="搜索"
  allowClear
  style={{ width: 220 }}
/>`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("div", {
					style: {
						display: "flex",
						flexDirection: "column",
						gap: 8
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(Input.Search, {
						variant: "filled",
						placeholder: "搜索",
						allowClear: true,
						style: { width: 220 }
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(DemoBlock, {
				title: "前后置连体附加块（addonBefore / addonAfter）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$21.jsxs)(import_jsx_runtime$21.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("code", { children: "addonBefore" }),
					" / ",
					/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("code", { children: "addonAfter" }),
					" 在输入框两端拼接灰底连体块， 与边框共享圆角。常用于 URL（",
					/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("code", { children: "https://" }),
					" + 域名 + ",
					/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("code", { children: ".com" }),
					"）、 单位（金额 + ",
					/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("code", { children: "元" }),
					"）等场景。与 ",
					/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("code", { children: "prefix" }),
					" / ",
					/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("code", { children: "suffix" }),
					"的区别：addon 在边框外、有自己的灰底视觉。"
				] }),
				code: `<Input addonBefore="https://" addonAfter=".com" defaultValue="example" />
<Input addonAfter="元" placeholder="金额" />
<Input addonBefore={<SearchIcon />} placeholder="带图标 addon" />`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$21.jsxs)("div", {
					style: {
						display: "flex",
						flexDirection: "column",
						gap: 8,
						maxWidth: 360
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(Input, {
							addonBefore: "https://",
							addonAfter: ".com",
							defaultValue: "example"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(Input, {
							addonAfter: "元",
							placeholder: "金额"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(Input, {
							addonBefore: SearchIcon,
							placeholder: "带图标 addon"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(DemoBlock, {
				title: "字符计数（showCount + maxLength）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$21.jsxs)(import_jsx_runtime$21.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("code", { children: "showCount" }),
					" 在输入框右侧显示当前字符数，叠加 ",
					/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("code", { children: "maxLength" }),
					"时显示 ",
					/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("code", { children: "当前 / 上限" }),
					"。计数渲染在 suffix 槽位末尾，不影响其他装饰。"
				] }),
				code: `<Input showCount maxLength={20} placeholder="最多 20 个字符" />
<Input showCount placeholder="只显示当前字数" />`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$21.jsxs)("div", {
					style: {
						display: "flex",
						flexDirection: "column",
						gap: 8,
						maxWidth: 360
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(Input, {
						showCount: true,
						maxLength: 20,
						placeholder: "最多 20 个字符"
					}), /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(Input, {
						showCount: true,
						placeholder: "只显示当前字数"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(DemoBlock, {
				title: "Input.TextArea：多行文本（autoSize / showCount）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$21.jsxs)(import_jsx_runtime$21.Fragment, { children: [
					"多行输入框。",
					/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("code", { children: "autoSize" }),
					" 启用时随内容撑高，可传 ",
					/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("code", { children: "{ minRows, maxRows }" }),
					"限制范围；",
					/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("code", { children: "showCount" }),
					" + ",
					/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("code", { children: "maxLength" }),
					" 在右下角显示计数。",
					/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("code", { children: "onPressEnter" }),
					" 在按下不带修饰键的回车时触发，默认不阻止换行 （业务可在回调中 ",
					/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("code", { children: "preventDefault()" }),
					" 抑制换行）。"
				] }),
				code: `<Input.TextArea rows={3} placeholder="固定 3 行" />
<Input.TextArea autoSize={{ minRows: 2, maxRows: 6 }} placeholder="2~6 行自适应" />
<Input.TextArea showCount maxLength={120} placeholder="带计数器（最多 120 字）" />`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$21.jsxs)("div", {
					style: {
						display: "flex",
						flexDirection: "column",
						gap: 8,
						maxWidth: 360
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(Input.TextArea, {
							rows: 3,
							placeholder: "固定 3 行"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(Input.TextArea, {
							autoSize: {
								minRows: 2,
								maxRows: 6
							},
							placeholder: "2~6 行自适应"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(Input.TextArea, {
							showCount: true,
							maxLength: 120,
							placeholder: "带计数器（最多 120 字）"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(InputGapsBlock, {})
		]
	});
}
function ControlledExample() {
	const [value, setValue] = import_react$21.useState("");
	return /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(Input, {
		value,
		onChange: (e) => setValue(e.target.value),
		placeholder: "受控（value + onChange）"
	});
}
/**
* 能力缺口公示 —— 与 docs/input-design-gaps.md 保持一致。
* 任一项落地后，把它从两份文档中同时移除。
*/
function InputGapsBlock() {
	return /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(GapsBlock, {
		gapDocPath: "docs/input-design-gaps.md",
		blocking: [
			{
				title: "校验警告态（warning）",
				description: "黄色描边，弱提示场景；当前只做了 error 红色描边。"
			},
			{
				title: "聚焦外发光（focus shadow）",
				description: "主操作区表单视觉偏扁；antd 那种 4px 浅色外发光待设计师确认是否要补。"
			},
			{
				title: "清除按钮视觉",
				description: "当前是占位实现（灰圆 + 白叉），颜色未拿到设计稿 token。"
			},
			{
				title: "三档 size 是否对齐 Button",
				description: "Button v0.2 钉成 small=32 / large=36；Input 是否跟齐待设计师确认。"
			}
		],
		pending: [
			{
				title: "圆角 6px",
				description: "从历史 token 继承，设计稿 v0.2 未明确钉死。"
			},
			{
				title: "prefix/suffix 与文字间距",
				description: "当前 8px 是估算值，设计稿应给明确数值。"
			},
			{
				title: "disabled 透明度",
				description: "当前 opacity: 0.6，未拿到 disabled 专属 token。"
			}
		],
		footer: /* @__PURE__ */ (0, import_jsx_runtime$21.jsxs)(import_jsx_runtime$21.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("code", { children: "disabled" }),
			" / ",
			/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("code", { children: "readOnly" }),
			" 等 HTML 标准属性透传保留功能。",
			/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("code", { children: "addonBefore" }),
			" / ",
			/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("code", { children: "addonAfter" }),
			" / ",
			/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("code", { children: "showCount" }),
			" /",
			/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("code", { children: "Input.TextArea" }),
			" 已自落地（v0.2.2）；",
			/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("code", { children: "Input.Password" }),
			" /",
			/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("code", { children: "Input.Search" }),
			" / ",
			/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("code", { children: "Input.OTP" }),
			" 等设计稿未出图本次不做。"
		] })
	});
}
var import_react$21, import_jsx_runtime$21, SearchIcon, FilterIcon;
var init_InputPage = __esmMin((() => {
	import_react$21 = /* @__PURE__ */ __toESM(require_react());
	init_Input();
	init_DemoBlock();
	init_GapsBlock();
	import_jsx_runtime$21 = require_jsx_runtime();
	SearchIcon = /* @__PURE__ */ (0, import_jsx_runtime$21.jsxs)("svg", {
		viewBox: "0 0 16 16",
		width: "16",
		height: "16",
		"aria-hidden": "true",
		focusable: "false",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("circle", {
			cx: "7",
			cy: "7",
			r: "4.5",
			stroke: "currentColor",
			strokeWidth: "1.5",
			fill: "none"
		}), /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("path", {
			d: "M10.5 10.5L13.5 13.5",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round"
		})]
	});
	FilterIcon = /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("svg", {
		viewBox: "0 0 16 16",
		width: "16",
		height: "16",
		"aria-hidden": "true",
		focusable: "false",
		children: /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("path", {
			d: "M2 4h12M4 8h8M6 12h4",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round"
		})
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/playbook/pages/components/LoadingPage.tsx
function LoadingPage(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime$20.jsxs)("div", {
		style: {
			display: "flex",
			gap: 32,
			alignItems: "center",
			minHeight: 80
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime$20.jsx)(Loading, {
			size: props.size,
			tip: props.tip || void 0
		}), /* @__PURE__ */ (0, import_jsx_runtime$20.jsxs)("div", {
			style: {
				fontSize: "var(--wb-font-caption-size)",
				color: "var(--wb-color-text-tertiary)"
			},
			children: [
				"size: ",
				/* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("code", { children: props.size }),
				props.tip ? `, tip: ${props.tip}` : ""
			]
		})]
	});
}
function LoadingVariants() {
	return /* @__PURE__ */ (0, import_jsx_runtime$20.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 16
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$20.jsx)(DemoBlock, {
				title: "基础用法",
				description: /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)(import_jsx_runtime$20.Fragment, { children: "最简单的用法。无 children 时进入\"独立 spinner\"模式，常用于行内/区块占位。" }),
				code: "<Loading />",
				children: /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)(Loading, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$20.jsx)(DemoBlock, {
				title: "三档尺寸（size）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$20.jsxs)(import_jsx_runtime$20.Fragment, { children: [
					"提供三档：",
					/* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("code", { children: "small" }),
					"（14px，行内用）/ ",
					/* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("code", { children: "medium" }),
					"（20px，默认）/ ",
					/* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("code", { children: "large" }),
					"（32px，区块占位用）。"
				] }),
				code: `<Loading size="small" />
<Loading size="medium" />
<Loading size="large" />`,
				children: ALL_SIZES$4.map((s) => /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)(Loading, { size: s }, s))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$20.jsx)(DemoBlock, {
				title: "带文案（tip）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$20.jsxs)(import_jsx_runtime$20.Fragment, { children: [
					"传 ",
					/* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("code", { children: "tip" }),
					" 时 spinner 下方一行说明文字。命名对齐 antd",
					/* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("code", { children: "Spin.tip" }),
					"（注意：不是 ",
					/* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("code", { children: "label" }),
					"）。"
				] }),
				code: `<Loading size="small" tip="small 加载中…" />
<Loading size="medium" tip="medium 加载中…" />
<Loading size="large" tip="large 加载中…" />`,
				children: ALL_SIZES$4.map((s) => /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)(Loading, {
					size: s,
					tip: `${s} 加载中…`
				}, s))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$20.jsx)(DemoBlock, {
				title: "包裹模式（wrapper）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$20.jsxs)(import_jsx_runtime$20.Fragment, { children: [
					"传入 ",
					/* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("code", { children: "children" }),
					" 后，spinner 浮在内容之上 + 半透明遮罩， children 透明度降为 50% 且不响应交互。常用于\"卡片/列表正在异步加载\"。 通过 ",
					/* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("code", { children: "spinning" }),
					" 控制开关。"
				] }),
				code: `const [loading, setLoading] = useState(true);

<Loading spinning={loading} tip="加载中…">
  <div style={{ padding: 16 }}>
    {/* 加载期间 children 透明度 50% 且不响应交互 */}
    用户信息：张三 / zhangsan@example.com
  </div>
</Loading>`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)(WrapperExample, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$20.jsx)(DemoBlock, {
				title: "受控 spinning",
				description: /* @__PURE__ */ (0, import_jsx_runtime$20.jsxs)(import_jsx_runtime$20.Fragment, { children: [
					"独立 spinner 也支持 ",
					/* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("code", { children: "spinning" }),
					"：true 显示，false 时不渲染。 在表单提交、Toast 触发等场景下控制 spinner 的显隐。"
				] }),
				code: `const [spinning, setSpinning] = useState(true);

<Loading spinning={spinning} size="medium" />`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)(ControlledSpinningExample, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$20.jsx)(DemoBlock, {
				title: "延迟显示（delay）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$20.jsxs)(import_jsx_runtime$20.Fragment, { children: [
					"传 ",
					/* @__PURE__ */ (0, import_jsx_runtime$20.jsxs)("code", { children: ["delay=", "{300}"] }),
					" 后，spinner 在 300ms 后才出现； 如果加载在 300ms 内完成，spinner 不会闪现。常用于\"接口很快\"的场景。"
				] }),
				code: `const [running, setRunning] = useState(false);

// 200ms 后停止，比 delay=300 快，spinner 不会出现
<Loading
  spinning={running}
  delay={300}
  size="medium"
  tip="delay=300, 任务 200ms 不会闪 spinner"
/>`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)(DelayExample, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$20.jsx)(LoadingGapsBlock, {})
		]
	});
}
function WrapperExample() {
	const [loading, setLoading] = (0, import_react$20.useState)(true);
	return /* @__PURE__ */ (0, import_jsx_runtime$20.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 12,
			alignItems: "flex-start"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime$20.jsx)(Button, {
			variant: "secondary",
			size: "small",
			onClick: () => setLoading((p) => !p),
			children: loading ? "停止加载" : "开始加载"
		}), /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)(Loading, {
			spinning: loading,
			tip: "加载中…",
			children: /* @__PURE__ */ (0, import_jsx_runtime$20.jsxs)("div", {
				style: {
					width: 320,
					padding: 16,
					border: "1px solid var(--wb-border-default)",
					borderRadius: 6,
					background: "var(--wb-bg-secondary)"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("div", {
					style: {
						fontWeight: 600,
						marginBottom: 8
					},
					children: "用户信息"
				}), /* @__PURE__ */ (0, import_jsx_runtime$20.jsxs)("div", {
					style: {
						fontSize: 13,
						color: "var(--wb-color-text-secondary)"
					},
					children: [
						"姓名：张三",
						/* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("br", {}),
						"邮箱：zhangsan@example.com",
						/* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("br", {}),
						"部门：研发中心"
					]
				})]
			})
		})]
	});
}
function ControlledSpinningExample() {
	const [spinning, setSpinning] = (0, import_react$20.useState)(true);
	return /* @__PURE__ */ (0, import_jsx_runtime$20.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 12,
			alignItems: "flex-start"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime$20.jsx)(Button, {
			variant: "secondary",
			size: "small",
			onClick: () => setSpinning((p) => !p),
			children: spinning ? "隐藏 spinner" : "显示 spinner"
		}), /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("div", {
			style: { minHeight: 32 },
			children: /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)(Loading, {
				spinning,
				size: "medium"
			})
		})]
	});
}
function DelayExample() {
	const [running, setRunning] = (0, import_react$20.useState)(false);
	const start = () => {
		setRunning(true);
		window.setTimeout(() => setRunning(false), 200);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime$20.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 12,
			alignItems: "flex-start"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime$20.jsx)(Button, {
			variant: "secondary",
			size: "small",
			onClick: start,
			children: "触发短任务（200ms）"
		}), /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("div", {
			style: { minHeight: 32 },
			children: /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)(Loading, {
				spinning: running,
				delay: 300,
				size: "medium",
				tip: "delay=300, 任务 200ms 不会闪 spinner"
			})
		})]
	});
}
/**
* 能力缺口公示 —— 与 docs/loading-design-gaps.md 保持一致。
* 任一项落地后，把它从两份文档中同时移除。
*/
function LoadingGapsBlock() {
	return /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)(GapsBlock, {
		gapDocPath: "docs/loading-design-gaps.md",
		blocking: [
			{
				title: "全屏遮罩（fullscreen）",
				description: "页面级 loading 覆盖整个 viewport，目前业务方需自己拼全屏 div。"
			},
			{
				title: "进度型 spinner（确定时长）",
				description: "需展示 0~100% 进度时，目前只有不确定时长旋转。"
			},
			{
				title: "错误态接管",
				description: "加载失败时切换红色 ⚠️ + 重试按钮，目前业务方需在外层自己实现。"
			}
		],
		pending: [
			{
				title: "spinner 旋转时长 1600ms",
				description: "复用 motion-duration-slow，但典型 spinner 是 1000ms 一圈。"
			},
			{
				title: "spinner 配色（底环 + 顶弧）",
				description: "dark 主题下底环可能不够明显，希望抽 spinner-track / spinner-fill 双 token。"
			},
			{
				title: "包裹模式遮罩 35%",
				description: "从 antd 50% 兜底改下来避免 dark 过暗，需设计师双主题确认。"
			},
			{
				title: "包裹模式 children 透明度 50%",
				description: "antd 兜底，希望设计师确认是否改用全色蒙层。"
			},
			{
				title: "默认无 delay",
				description: "希望设计师评估是否要把全局默认改为 200ms 避免普遍闪烁。"
			},
			{
				title: "tip 文字颜色",
				description: "当前 text-secondary 略弱，希望设计师评估是否改 text-primary。"
			}
		],
		footer: /* @__PURE__ */ (0, import_jsx_runtime$20.jsxs)(import_jsx_runtime$20.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("code", { children: "indicator" }),
			"（自定义 spinner）/ ",
			/* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("code", { children: "percent" }),
			"（进度数值）等 antd 能力归属其他组件或会破坏视觉一致性，本次明确不做（详见 GAP 长版第 3 段）。"
		] })
	});
}
var import_react$20, import_jsx_runtime$20, ALL_SIZES$4;
var init_LoadingPage = __esmMin((() => {
	import_react$20 = /* @__PURE__ */ __toESM(require_react());
	init_Button();
	init_Loading();
	init_DemoBlock();
	init_GapsBlock();
	import_jsx_runtime$20 = require_jsx_runtime();
	ALL_SIZES$4 = [
		"small",
		"medium",
		"large"
	];
}));
//#endregion
//#region ../../packages/agent-ui/src/playbook/pages/components/MessagePage.tsx
function MessagePage(props) {
	const handleTrigger = () => {
		const content = props.title ? `${props.title}：${props.body || "提示内容"}` : props.body || "提示内容";
		message[props.tone](content, props.duration);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime$19.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 12,
			alignItems: "flex-start"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime$19.jsxs)(Button, {
			variant: "primary",
			onClick: handleTrigger,
			children: [
				"触发 ",
				props.tone,
				" toast"
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime$19.jsxs)("div", {
			style: {
				fontSize: 12,
				color: "var(--wb-color-text-tertiary)"
			},
			children: ["调用：", /* @__PURE__ */ (0, import_jsx_runtime$19.jsxs)("code", { children: [
				"message.",
				props.tone,
				"(",
				JSON.stringify(props.body || "提示内容"),
				props.duration === void 0 ? "" : `, ${props.duration}`,
				")"
			] })]
		})]
	});
}
function MessageVariants() {
	return /* @__PURE__ */ (0, import_jsx_runtime$19.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 16
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$19.jsx)(DemoBlock, {
				title: "五档语义色（imperative API）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$19.jsxs)(import_jsx_runtime$19.Fragment, { children: [
					"通过 ",
					/* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("code", { children: "message.success/info/warning/error/loading" }),
					" 触发全局 toast； 视觉、位置、动画、默认 duration 全部由 ",
					/* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("code", { children: "@genie/cb-chat-ui" }),
					" toast 决定， wb 不做二次定制。",
					/* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("br", {}),
					/* @__PURE__ */ (0, import_jsx_runtime$19.jsxs)("strong", { children: [
						"v0.2.2 新增 ",
						/* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("code", { children: "loading" }),
						" 类型"
					] }),
					"：cb-chat-ui toast 没有 loading， wb 侧用 ",
					/* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("code", { children: "info" }),
					" + 拼一个 14×14 spinner 兜底；duration 默认 0（不自动消失）。"
				] }),
				code: `import { message } from '@/foundation/components/Message';

message.success('已保存');
message.info('上传中…');
message.warning('磁盘空间不足');
message.error('网络异常，请稍后重试');
message.loading('上传中…'); // duration 默认 0，需主动关闭`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("div", {
					style: {
						display: "flex",
						gap: 8,
						flexWrap: "wrap"
					},
					children: ALL_TONES$1.map((t) => /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)(Button, {
						variant: "secondary",
						onClick: () => {
							if (t === "loading") message.loading(`这是一条 ${t} toast`, 2e3);
							else message[t](`这是一条 ${t} toast`);
						},
						children: t
					}, t))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$19.jsx)(DemoBlock, {
				title: "持久 toast（duration=0）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$19.jsxs)(import_jsx_runtime$19.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("code", { children: "duration" }),
					" 单位毫秒；传 ",
					/* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("code", { children: "0" }),
					" 表示不自动消失， 调用方必须主动调用返回的关闭函数（或点击 toast × 按钮）。"
				] }),
				code: `const close = message.info('上传中…', 0);
// 任务完成后手动关闭
close();`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)(PersistentDemo, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$19.jsx)(DemoBlock, {
				title: "loading + key 复用（同位置消息更新）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$19.jsxs)(import_jsx_runtime$19.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("strong", { children: "v0.2.2 新增对象式调用" }),
					"：",
					/* @__PURE__ */ (0, import_jsx_runtime$19.jsxs)("code", { children: [
						"message.loading(",
						"{ content, key }",
						")"
					] }),
					" 传同 key 时， 旧 toast 会先被关掉再开新的，用于\"上传中… → 上传成功\"的同位置消息更新场景。 对齐 antd ",
					/* @__PURE__ */ (0, import_jsx_runtime$19.jsxs)("code", { children: [
						"message.success(",
						"{ key }",
						")"
					] }),
					" 行为。"
				] }),
				code: `message.loading({ content: '上传中…', key: 'upload' });
await doUpload();
message.success({ content: '上传成功', key: 'upload', duration: 2000 });`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)(LoadingKeyDemo, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$19.jsx)(DemoBlock, {
				title: "自定义 duration",
				description: /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)(import_jsx_runtime$19.Fragment, { children: "默认 duration 由 cb-chat-ui 决定（约 3000ms）；可传入毫秒数自定义。" }),
				code: `message.success('1 秒就消失', 1000);
message.warning('10 秒长提示', 10000);`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$19.jsxs)("div", {
					style: {
						display: "flex",
						gap: 8,
						flexWrap: "wrap"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime$19.jsx)(Button, {
						variant: "secondary",
						onClick: () => {
							message.success("1 秒就消失", 1e3);
						},
						children: "1s（短）"
					}), /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)(Button, {
						variant: "secondary",
						onClick: () => {
							message.warning("10 秒长提示", 1e4);
						},
						children: "10s（长）"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$19.jsx)(MessageGapsBlock, {})
		]
	});
}
/**
* 持久 toast 演示：用 ref 缓存关闭函数，第二次点击主动关闭。
*/
function PersistentDemo() {
	const closeRef = import_react$19.useRef(null);
	return /* @__PURE__ */ (0, import_jsx_runtime$19.jsxs)("div", {
		style: {
			display: "flex",
			gap: 8,
			flexWrap: "wrap",
			alignItems: "center"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime$19.jsx)(Button, {
			variant: "secondary",
			onClick: () => {
				closeRef.current?.();
				closeRef.current = message.info("上传中… 不会自动消失", 0);
			},
			children: "打开持久 toast"
		}), /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)(Button, {
			variant: "secondary",
			onClick: () => {
				closeRef.current?.();
				closeRef.current = null;
			},
			children: "手动关闭"
		})]
	});
}
/**
* loading + key 复用演示：模拟"上传"流程
*   1. 点击触发 message.loading({ key:'upload' })
*   2. 1.2s 后用同 key 调 message.success，旧 loading 自动被替换
*/
function LoadingKeyDemo() {
	return /* @__PURE__ */ (0, import_jsx_runtime$19.jsxs)("div", {
		style: {
			display: "flex",
			gap: 8,
			flexWrap: "wrap"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime$19.jsx)(Button, {
			variant: "primary",
			onClick: async () => {
				message.loading({
					content: "上传中…",
					key: "upload"
				});
				await new Promise((r) => setTimeout(r, 1200));
				message.success({
					content: "上传成功",
					key: "upload",
					duration: 2e3
				});
			},
			children: "模拟上传（loading → success）"
		}), /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)(Button, {
			variant: "secondary",
			onClick: async () => {
				message.loading({
					content: "保存中…",
					key: "save"
				});
				await new Promise((r) => setTimeout(r, 1200));
				message.error({
					content: "保存失败：网络异常",
					key: "save",
					duration: 3e3
				});
			},
			children: "模拟保存（loading → error）"
		})]
	});
}
/**
* 能力缺口公示 —— 与 docs/message-design-gaps.md 同步。
*
* v0.2 起 Foundation 不再自管 toast，统一转发到 cb-chat-ui。
* 当前缺口都是"cb-chat-ui 边界"或"wb 与 cb-chat-ui 之间未对齐"的项。
*/
function MessageGapsBlock() {
	return /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)(GapsBlock, {
		gapDocPath: "docs/message-design-gaps.md",
		blocking: [{
			title: "inline 区块级提示组件（Alert / Callout / Banner）",
			description: "<Message> 内联区块组件 v0.2 已 noop（return null）；表单错误 / 页面顶部 banner / 区块状态反馈缺独立组件。待评审是否补 Alert / Callout，或全部由调用方拼。"
		}, {
			title: "loading spinner 视觉占位",
			description: "v0.2.2 已落地 message.loading；当前 spinner 用 14×14 + currentColor + border 旋转兜底。希望设计师补正式 Loading 图标 / 颜色 / 动画曲线。"
		}],
		pending: [
			{
				title: "wb 侧 dispatch 把 ReactNode 强转 string",
				description: "Message.tsx 里 cbToast({ message: content as string ... }) 类型不准；需要确认 cb-chat-ui toast 是否真的支持 ReactNode 后修签名。"
			},
			{
				title: "key 切换时视觉会闪一下",
				description: "v0.2.2 同 key 切换是\"立即关闭旧 + 新开\"两个动作，原位会有闪烁。如希望\"原位平滑过渡\"需要 cb-chat-ui 侧做更深的 toast.update 能力。"
			},
			{
				title: "没有保留 wb 视觉的转发开关",
				description: "当前转发硬编码到 cb-chat-ui；未来若需要在某些 wb-only 应用里恢复独立 wb 风格 toast，需要重新做 ConfigProvider。暂未踩到。"
			},
			{
				title: "<Message> / <MessageContainer> 仍可被旧代码引用且静默 noop",
				description: "旧业务代码升级到 v0.2 后视觉会\"突然消失\"且不报错。希望加 console.warn(once) 标记 deprecation。"
			},
			{
				title: "toast 排队 / maxCount / 位置定制",
				description: "业务里\"批量保存\"瞬间触发 5+ 条会全部叠在屏幕；右下角通知诉求未满足。待 cb-chat-ui 评审 maxCount + placement 维度。"
			},
			{
				title: "富 ReactNode + 操作按钮（如\"已删除 · 撤销\"）",
				description: "业务真踩到带 action 按钮的 toast 时再去 cb-chat-ui 侧补。"
			}
		],
		footer: /* @__PURE__ */ (0, import_jsx_runtime$19.jsxs)(import_jsx_runtime$19.Fragment, { children: [
			"实现策略：v0.2 收敛到 ",
			/* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("code", { children: "@genie/cb-chat-ui" }),
			" toast， wb 侧只保留 ",
			/* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("code", { children: "message.success/info/warning/error/loading(content, duration?)" }),
			" 薄签名。 v0.2.2 新增 ",
			/* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("code", { children: "loading" }),
			" 类型（spinner 兜底） + ",
			/* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("code", { children: "{ key }" }),
			" 复用机制。 旧版 ",
			/* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("code", { children: "<Message>" }),
			" / ",
			/* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("code", { children: "<MessageContainer>" }),
			" 已 @deprecated，新代码不要使用。"
		] })
	});
}
var import_react$19, import_jsx_runtime$19, ALL_TONES$1;
var init_MessagePage = __esmMin((() => {
	import_react$19 = /* @__PURE__ */ __toESM(require_react());
	init_Button();
	init_Message();
	init_DemoBlock();
	init_GapsBlock();
	import_jsx_runtime$19 = require_jsx_runtime();
	ALL_TONES$1 = [
		"success",
		"info",
		"warning",
		"error",
		"loading"
	];
}));
//#endregion
//#region ../../packages/agent-ui/src/playbook/pages/components/ModalPage.tsx
function ModalPage(props) {
	const [open, setOpen] = (0, import_react$18.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
		style: {
			display: "flex",
			justifyContent: "center",
			minHeight: 120,
			alignItems: "center"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(Button, {
			variant: "primary",
			onClick: () => setOpen(true),
			children: "Open modal"
		}), /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)(Modal, {
			open,
			onOpenChange: setOpen,
			size: props.size,
			title: props.title || void 0,
			closeOnOverlayClick: props.closeOnOverlayClick,
			closeOnEscape: props.closeOnEscape,
			children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(ModalBody, { children: /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("p", {
				style: {
					margin: 0,
					color: "var(--wb-color-text-secondary)"
				},
				children: "模态框内容；可放任意 React 节点。点击遮罩 / 按 ESC / 点击右上角 × 都会关闭（视 props 而定）。"
			}) }), /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)(ModalFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(Button, {
				variant: "grey",
				onClick: () => setOpen(false),
				children: "取消"
			}), /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(Button, {
				variant: "primary",
				onClick: () => setOpen(false),
				children: "确定"
			})] })]
		})]
	});
}
function VariantDemo({ size }) {
	const [open, setOpen] = (0, import_react$18.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)(import_jsx_runtime$18.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(Button, {
		variant: "secondary",
		onClick: () => setOpen(true),
		children: size
	}), /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)(Modal, {
		align: "center",
		open,
		onOpenChange: setOpen,
		size,
		title: `size=${size}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(ModalBody, { children: /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("p", {
			style: {
				margin: 0,
				color: "var(--wb-color-text-secondary)"
			},
			children: [
				"size=",
				/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("code", { children: size }),
				" 决定 modal 最大宽度",
				size === "small" ? 480 : size === "large" ? 960 : 640,
				"px。"
			]
		}) }), /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(ModalFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(Button, {
			variant: "primary",
			onClick: () => setOpen(false),
			children: "知道了"
		}) })]
	})] });
}
function FooterBetweenDemo() {
	const [open, setOpen] = (0, import_react$18.useState)(false);
	const [footerExtraHovered, setFooterExtraHovered] = (0, import_react$18.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)(import_jsx_runtime$18.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(Button, {
		variant: "secondary",
		onClick: () => setOpen(true),
		children: "footer 左右分区"
	}), /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(Modal, {
		open,
		onOpenChange: setOpen,
		size: "medium-large",
		title: "编辑文档",
		footerExtra: /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
			style: {
				display: "inline-flex",
				alignItems: "center",
				gap: "var(--wb-spacing-2)",
				color: footerExtraHovered ? "var(--wb-color-text-primary)" : "var(--wb-color-text-secondary)",
				transition: "color 0.15s ease",
				cursor: "pointer"
			},
			onMouseEnter: () => setFooterExtraHovered(true),
			onMouseLeave: () => setFooterExtraHovered(false),
			children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(AgentToolIcon, { size: 16 }), "图标+文字示意"]
		}),
		okText: "保存",
		cancelText: "取消",
		onOk: () => {},
		children: /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(ModalBody, { children: /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("p", {
			style: {
				margin: 0,
				color: "var(--wb-color-text-secondary)"
			},
			children: [
				"对齐设计稿 ardot ",
				/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("code", { children: "1303:5495" }),
				"：底部操作栏 SPACE_BETWEEN， 左侧 ",
				/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("code", { children: "footerExtra" }),
				"（次级操作）+ 右侧主按钮（取消 + 主操作）。 传 ",
				/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("code", { children: "footerExtra" }),
				" 自动切到 between 布局；不传维持老的右对齐。"
			]
		}) })
	})] });
}
function IconDemo() {
	const [open, setOpen] = (0, import_react$18.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)(import_jsx_runtime$18.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(Button, {
		variant: "secondary",
		onClick: () => setOpen(true),
		children: "带 icon的modal"
	}), /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(Modal, {
		open,
		onOpenChange: setOpen,
		title: "提示",
		size: "small",
		icon: /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(WarnToolIcon, {}),
		okText: "知道了",
		onOk: () => {},
		children: /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(ModalBody, { children: /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("p", {
			style: {
				margin: 0,
				color: "var(--wb-color-text-secondary)"
			},
			children: [
				"传入 ",
				/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("code", { children: "icon" }),
				" 属性后，header + body 包裹在图标右侧形成左右 flex 布局， footer 独立在下方不受影响。"
			]
		}) })
	})] });
}
function DescriptionDemo() {
	const [open, setOpen] = (0, import_react$18.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)(import_jsx_runtime$18.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(Button, {
		variant: "secondary",
		onClick: () => setOpen(true),
		children: "带 description的modal"
	}), /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(Modal, {
		open,
		onOpenChange: setOpen,
		title: "保存修改",
		size: "small",
		description: "传入description属性后，描述文本渲染在 header 内部 title 下方独占一行。",
		okText: "保存",
		cancelText: "取消",
		onOk: () => {}
	})] });
}
function OverflowDemo() {
	const [open, setOpen] = (0, import_react$18.useState)(false);
	const longTitle = "这是一个标题非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常长，会触发省略或者换行的模态框标题";
	const longBodyLines = Array.from({ length: 15 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("p", {
		style: {
			margin: "0 0 8px",
			color: "var(--wb-color-text-secondary)"
		},
		children: [
			"第",
			i + 1,
			"行：这段内容用于演示模态框 body 区域内容过多时出现滚动条的效果。当内容超出 max-height 限制时，body 区域会自动出现纵向滚动条。"
		]
	}, i));
	return /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)(import_jsx_runtime$18.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(Button, {
		variant: "secondary",
		onClick: () => setOpen(true),
		children: "超长标题 + 滚动 body"
	}), /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(Modal, {
		bodyMask: true,
		open,
		onOpenChange: setOpen,
		size: "medium",
		title: longTitle,
		okText: "知道了",
		onOk: () => setOpen(false),
		children: /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(ModalBody, { children: longBodyLines })
	})] });
}
function BuiltinFooterDemo() {
	const [open, setOpen] = (0, import_react$18.useState)(false);
	const [confirmLoading, setConfirmLoading] = (0, import_react$18.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)(import_jsx_runtime$18.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(Button, {
		variant: "secondary",
		onClick: () => setOpen(true),
		children: "内置 footer"
	}), /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(Modal, {
		open,
		onOpenChange: setOpen,
		title: "保存修改？",
		size: "small",
		okText: "保存",
		cancelText: "取消",
		confirmLoading,
		onOk: async () => {
			setConfirmLoading(true);
			await new Promise((r) => setTimeout(r, 800));
			setConfirmLoading(false);
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(ModalBody, { children: /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("p", {
			style: {
				margin: 0,
				color: "var(--wb-color-text-secondary)"
			},
			children: "传 onOk / okText / confirmLoading 等任一项，自动渲染内置 OK + Cancel footer。 onOk 返回 Promise 时 OK 按钮自动 loading。"
		}) })
	})] });
}
function DangerFooterDemo() {
	const [open, setOpen] = (0, import_react$18.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)(import_jsx_runtime$18.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(Button, {
		variant: "secondary",
		danger: true,
		onClick: () => setOpen(true),
		children: "删除（危险）"
	}), /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(Modal, {
		open,
		onOpenChange: setOpen,
		title: "确认删除？",
		size: "small",
		okText: "删除",
		cancelText: "取消",
		okType: "danger",
		onOk: () => {},
		children: /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(ModalBody, { children: /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("p", {
			style: {
				margin: 0,
				color: "var(--wb-color-text-secondary)"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("code", { children: "okType=\"danger\"" }), " 把 OK 按钮切到 Button.danger 红色变体。"]
		}) })
	})] });
}
function ConfirmStaticDemo() {
	return /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
		style: {
			display: "flex",
			gap: 8,
			flexWrap: "wrap"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(Button, {
				variant: "secondary",
				onClick: () => {
					Modal.confirm({
						title: "确认操作？",
						content: "此操作不可撤销，请谨慎。",
						onOk: async () => {
							await new Promise((r) => setTimeout(r, 600));
						}
					});
				},
				children: "Modal.confirm"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(Button, {
				variant: "secondary",
				onClick: () => {
					Modal.info({
						title: "提示",
						content: "这是一条 info 提示信息。"
					});
				},
				children: "Modal.info"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(Button, {
				variant: "secondary",
				onClick: () => {
					Modal.success({
						title: "操作成功",
						content: "已完成。"
					});
				},
				children: "Modal.success"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(Button, {
				variant: "secondary",
				onClick: () => {
					Modal.warning({
						title: "注意",
						content: "某些字段格式可能存在风险。"
					});
				},
				children: "Modal.warning"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(Button, {
				variant: "secondary",
				danger: true,
				onClick: () => {
					Modal.error({
						title: "操作失败",
						content: "服务端返回错误，请稍后重试。",
						okText: "我知道了"
					});
				},
				children: "Modal.error"
			})
		]
	});
}
function ModalVariants() {
	return /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 24
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(VariantSection, {
				title: "Size决定了最大宽度，常用的有 small、medium、large三种",
				direction: "column",
				children: ALL_SIZES$3.map((item) => /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(VariantItem, {
					propsLabel: `size="${item.size}" width=${item.width}px`,
					code: `const [open, setOpen] = useState(false);

<>
  <Button onClick={() => setOpen(true)}>Open</Button>
  <Modal open={open} onOpenChange={setOpen} size="${item.size}" title="size=${item.size}">
    <ModalBody>
      <p>size=${item.size} 决定 modal 最大宽度（small=480 / medium=640 / medium-large=640 / large=960）。</p>
    </ModalBody>
    <ModalFooter>
      <Button variant="primary" onClick={() => setOpen(false)}>知道了</Button>
    </ModalFooter>
  </Modal>
</>`,
					children: /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(VariantDemo, { size: item.size })
				}, item.size))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(DemoBlock, {
				title: "icon 布局（icon + header/body 横向 flex）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)(import_jsx_runtime$18.Fragment, { children: [
					"传入 ",
					/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("code", { children: "icon" }),
					" 后 header + body 包裹在图标右侧，形成左右 flex 布局； footer 始终独立在最下方，不受 icon 影响。"
				] }),
				code: `<Modal
  open={open} onOpenChange={setOpen}
  title="提示"
  icon={<WarnToolIcon />}
  okText="知道了"
  onOk={() => {}}
>
  <ModalBody>...</ModalBody>
</Modal>`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(IconDemo, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(DemoBlock, {
				title: "description（标题下方描述文本）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)(import_jsx_runtime$18.Fragment, { children: [
					"传入 ",
					/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("code", { children: "description" }),
					" 后渲染在 header 内部 title 下方独占一行， 字号正文大小、次要文本色。margin-top:8px。"
				] }),
				code: `<Modal
  open={open} onOpenChange={setOpen}
  title="保存修改"
  description="文档中有未保存的修改，保存后不可撤销。"
  okText="保存" cancelText="取消"
  onOk={save}
>
  <ModalBody>...</ModalBody>
</Modal>`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(DescriptionDemo, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(DemoBlock, {
				title: "超长标题 + body 内容滚动 + bodyMask",
				description: /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("ul", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("li", { children: "标题文案超长时会自动省略或换行；" }),
					/* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("li", { children: [
						"body 内容超出 ",
						/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("code", { children: "max-height" }),
						" 限制时出现纵向滚动条。"
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("li", { children: [
						"bodyMask 为 true 时，body 内容超出 ",
						/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("code", { children: "max-height" }),
						" 限制时出现遮罩层。"
					] })
				] }),
				code: `const longTitle = '这是一个标题非常非常...非常长的模态框标题';
const longBodyLines = Array.from({ length: 15 }, (_, i) => (
  <p key={i}>第{i + 1}行：body 内容过多时出现滚动条...</p>
));

<Modal open={open} onOpenChange={setOpen}
  size="small" title={longTitle}
  okText="知道了" onOk={() => setOpen(false)}>
  <ModalBody>{longBodyLines}</ModalBody>
</Modal>`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(OverflowDemo, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(DemoBlock, {
				title: "内置 footer（onOk / okText / confirmLoading / okType）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)(import_jsx_runtime$18.Fragment, { children: [
					"传 ",
					/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("code", { children: "onOk" }),
					" / ",
					/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("code", { children: "okText" }),
					" / ",
					/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("code", { children: "confirmLoading" }),
					" / ",
					/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("code", { children: "okButtonProps" }),
					" /",
					/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("code", { children: "cancelButtonProps" }),
					" 等任一项时，组件自动渲染内置 Cancel + OK footer。",
					/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("code", { children: "onOk" }),
					" 返回 Promise 时 OK 按钮自动 loading。"
				] }),
				code: `<Modal open={open} onOpenChange={setOpen} title="保存修改？"
  okText="保存" cancelText="取消"
  confirmLoading={confirmLoading}
  onOk={async () => { await save(); }}>
  <ModalBody>...</ModalBody>
</Modal>`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(BuiltinFooterDemo, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(DemoBlock, {
				title: "危险操作（okType=danger）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)(import_jsx_runtime$18.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("code", { children: "okType=\"danger\"" }),
					" 自动把 OK 按钮切到 ",
					/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("code", { children: "Button.danger" }),
					" 红色变体；典型场景：删除 / 不可逆操作。"
				] }),
				code: `<Modal open={open} onOpenChange={setOpen} title="确认删除？"
  okText="删除" okType="danger" onOk={handleDelete}>
  ...
</Modal>`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(DangerFooterDemo, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(DemoBlock, {
				title: "Modal.confirm / info / success / warning / error 静态方法",
				description: /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)(import_jsx_runtime$18.Fragment, { children: [
					"imperative API，对齐 antd 同名调用。返回 ",
					/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("code", { children: "{ destroy, update }" }),
					" 句柄。 每次调用挂一个临时容器 + ",
					/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("code", { children: "createRoot" }),
					"，关闭时自动 unmount。"
				] }),
				code: `Modal.confirm({
  title: '确认操作？',
  content: '此操作不可撤销，请谨慎。',
  onOk: async () => { await doIt(); },
});

Modal.error({
  title: '操作失败',
  content: '服务端返回错误，请稍后重试。',
  okText: '我知道了',
});`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(ConfirmStaticDemo, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(DemoBlock, {
				title: "Footer 左右分区（footerExtra / footerAlign）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)(import_jsx_runtime$18.Fragment, { children: [
					"对齐设计稿 ardot ",
					/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("code", { children: "1303:5495" }),
					"：传 ",
					/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("code", { children: "footerExtra" }),
					" 自动切到 SPACE_BETWEEN； 左槽放次级操作（如\"链接管理\"），右槽放主按钮。手动传 ",
					/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("code", { children: "footerAlign=\"between\"" }),
					" 等价。"
				] }),
				code: `<Modal
  open={open} onOpenChange={setOpen}
  title="编辑文档"
  footerExtra={<Button size="small">链接管理</Button>}
  okText="保存" cancelText="取消" onOk={save}
>
  ...
</Modal>`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(FooterBetweenDemo, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(ModalGapsBlock, {})
		]
	});
}
/**
* 能力缺口公示（精简版） —— 与 antd Modal 标准能力对照。
*
* 长版见 docs/modal-design-gaps.md；任何一项落地后，**同时**从两处移除。
*/
function ModalGapsBlock() {
	return /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(GapsBlock, {
		gapDocPath: "docs/modal-design-gaps.md",
		blocking: [
			{
				title: "mask 颜色与设计稿不一致（决策保留白底+blur）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)(import_jsx_runtime$18.Fragment, { children: [
					"设计稿 ",
					/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("code", { children: "1303:6384" }),
					" 的 mask 是黑 40% 纯遮罩；当前 v0.2.x 选择保留",
					/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("b", { children: "白色 40% + blur 40px" }),
					" 的设计语言（更现代、更轻）。已与设计师确认本次维持现状，若后续切换需评估暗色内容透出问题。"
				] })
			},
			{
				title: "dark 主题适配",
				description: /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)(import_jsx_runtime$18.Fragment, { children: [
					"当前容器背景钉死 ",
					/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("code", { children: "#ffffff" }),
					" + 边框 ",
					/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("code", { children: "#ebebeb" }),
					" 未走 token，dark 主题下会突兀。希望设计师明确 dark 模式策略。"
				] })
			},
			{
				title: "fullscreen 模式",
				description: /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(import_jsx_runtime$18.Fragment, { children: "占满整个 viewport（移除圆角 / padding / 顶距）。复杂表单场景需要。" })
			},
			{
				title: "confirm/info/success/warning/error 图标视觉",
				description: /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)(import_jsx_runtime$18.Fragment, { children: [
					"v0.2.2 已落地 ",
					/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("code", { children: "Modal.confirm" }),
					" 等静态方法，但图标用",
					/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("b", { children: "纯色圆点占位" }),
					"，等设计师补正式 SVG 图标。"
				] })
			}
		],
		pending: [
			{
				title: "destroyOnClose / keepMounted",
				description: /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)(import_jsx_runtime$18.Fragment, { children: [
					"当前 ",
					/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("code", { children: "open=false" }),
					" 直接 unmount。希望保留输入态时需要 keepMounted 模式。"
				] })
			},
			{
				title: "关闭动画 + afterOpenChange(false) 异步化",
				description: /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)(import_jsx_runtime$18.Fragment, { children: [
					"当前关闭直接 unmount（无离场动画），",
					/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("code", { children: "afterOpenChange(false)" }),
					" 同步触发。补离场动画后改 animationend 异步触发。"
				] })
			},
			{
				title: "入场动画参数",
				description: /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(import_jsx_runtime$18.Fragment, { children: "位移 8px + scale(0.98) 来自 antd 兜底，未拿到设计稿明确数值。" })
			},
			{
				title: "max-height 公式",
				description: /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)(import_jsx_runtime$18.Fragment, { children: [
					"当前 ",
					/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("code", { children: "calc(100vh - 160px)" }),
					" 在小屏下减太多。希望评估 viewport-aware 公式。"
				] })
			}
		],
		footer: /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)(import_jsx_runtime$18.Fragment, { children: [
			"v0.2 视觉对齐 ardot 2586:184：白底 + 24px 圆角 + 双层柔和阴影 + 顶距 120 + blur 40px 遮罩。 底层用 ",
			/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("code", { children: "@floating-ui/react" }),
			" 接管 Portal / 焦点陷阱 / lockScroll / dismiss。 v0.2.2 自落地：内置 footer + okType=danger + Modal.confirm/info/success/warning/error 静态方法。 v0.2.3 自落地：size=medium-large(640) + closable / centered / afterOpenChange / wrapClassName / bodyStyle， 以及 header 多槽位（onBack / headerExtra / headerActions）+ footer 左右分区（footerExtra / footerAlign）。"
		] })
	});
}
var import_react$18, import_jsx_runtime$18, ALL_SIZES$3;
var init_ModalPage = __esmMin((() => {
	import_react$18 = /* @__PURE__ */ __toESM(require_react());
	init_Button();
	init_Icon();
	init_Modal();
	init_DemoBlock();
	init_GapsBlock();
	init_VariantSection();
	import_jsx_runtime$18 = require_jsx_runtime();
	ALL_SIZES$3 = [
		{
			size: "small",
			width: 480
		},
		{
			size: "medium",
			width: 640
		},
		{
			size: "medium-large",
			width: 640
		},
		{
			size: "large",
			width: 960
		}
	];
}));
//#endregion
//#region ../../packages/agent-ui/src/playbook/pages/components/NotificationPage.tsx
/**
* Playbook 内部默认 action 处理：
* - `view_detail` 且带 url → window.open 新 tab 打开（业务侧典型实现）
* - 其他 → 仅 console，演示业务侧自行决定行为
*/
function useDemoActionHandler() {
	return (0, import_react$17.useCallback)((action) => {
		console.log("[Notification demo] action clicked:", action);
		if (action.key === "view_detail" && action.url) window.open(action.url, "_blank", "noopener,noreferrer");
	}, []);
}
function buildData(props) {
	const allActions = DEFAULT_DATA.actions;
	const count = Number(props.actionsCount);
	return {
		...DEFAULT_DATA,
		content: props.hasContent ? DEFAULT_DATA.content : void 0,
		actions: allActions.slice(allActions.length - count)
	};
}
function NotificationPage(props) {
	const data = buildData(props);
	const handleAction = useDemoActionHandler();
	return /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("div", {
		style: {
			display: "flex",
			justifyContent: "center",
			padding: 24
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)(Notification, {
			data,
			expandable: props.expandable,
			expandText: "查看详情",
			collapseText: "收起",
			closeAriaLabel: "关闭",
			onActionClick: handleAction,
			onClose: props.closable ? () => console.log("[Notification demo] close") : void 0
		})
	});
}
function NotificationVariants() {
	return /* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 16
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)(DemoBlock, {
				title: "默认形态",
				description: "标题 + content（默认 2 行省略号）+ 底部 actions。actions 按数据驱动渲染:最后一个为主按钮（primary 黑底白字）、其余为次按钮（secondary 白底灰边）。",
				code: `<Notification
  data={{
    msgId: '1',
    title: 'Skill 商店全新上线',
    summary: '100+ 专业技能即装即用…',
    actions: [
      { key: 'view_detail', text: '前往商店', url: '...' },
      { key: 'ack', text: '我知道啦' },
    ],
  }}
  expandText="查看详情"
  collapseText="收起"
  onActionClick={action => {
    if (action.key === 'view_detail' && action.url) {
      window.open(action.url, '_blank', 'noopener,noreferrer');
    }
  }}
  onClose={() => /* 关闭 */}
/>`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)(DefaultDemo, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)(DemoBlock, {
				title: "查看详情（展开）",
				description: "点击左下角「查看详情」展开完整 content；再次点击切到「收起」回到 2 行省略态。受控 / 非受控两种模式都支持。点击「前往商店」会在新 tab 打开 url 演示业务侧典型处理。",
				code: "<Notification data={msg} expandText=\"查看详情\" collapseText=\"收起\" />",
				children: /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)(ExpandDemo, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)(DemoBlock, {
				title: "长内容滚动",
				description: "content 超出 maxContentHeight（默认 240）时，详情区出现滚动条。设计稿要求「超出范围通过滚动条上下滑动显示更多」。",
				code: "<Notification data={longMsg} maxContentHeight={180} />",
				children: /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)(ScrollDemo, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)(DemoBlock, {
				title: "数据驱动 actions",
				description: "按 CLIENT_API.md §6.6 约定，actions 数组完全数据驱动。可能是 0 个（纯通知）、1 个（仅 ack）、2 个（view_detail + ack）；前端零硬编码。",
				code: `{/* 0 actions */}
<Notification data={{ ...msg, actions: [] }} />

{/* 1 action */}
<Notification data={{ ...msg, actions: [{ key: 'ack', text: '知道了' }] }} />

{/* 2 actions:最后一个自动 primary */}
<Notification data={{ ...msg, actions: [
  { key: 'view_detail', text: '前往商店', url: '...' },
  { key: 'ack', text: '我知道啦' },
] }} />`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)(ActionsCountDemo, {})
			})
		]
	});
}
function DefaultDemo() {
	const handleAction = useDemoActionHandler();
	return /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)(Notification, {
		data: {
			...DEFAULT_DATA,
			content: SHORT_CONTENT
		},
		expandable: false,
		onActionClick: handleAction,
		onClose: () => console.log("[Notification demo] close"),
		closeAriaLabel: "关闭"
	});
}
function ExpandDemo() {
	const [expanded, setExpanded] = (0, import_react$17.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)(Notification, {
		data: DEFAULT_DATA,
		expanded,
		onExpandedChange: setExpanded,
		expandText: "查看详情",
		collapseText: "收起",
		onActionClick: useDemoActionHandler(),
		onClose: () => console.log("[Notification demo] close"),
		closeAriaLabel: "关闭"
	});
}
function ScrollDemo() {
	return /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)(Notification, {
		data: DEFAULT_DATA,
		expanded: true,
		maxContentHeight: 180,
		expandText: "查看详情",
		collapseText: "收起",
		onActionClick: useDemoActionHandler(),
		onClose: () => console.log("[Notification demo] close"),
		closeAriaLabel: "关闭"
	});
}
function ActionsCountDemo() {
	const handleAction = useDemoActionHandler();
	return /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("div", {
		style: {
			display: "flex",
			gap: 16,
			flexWrap: "wrap"
		},
		children: [
			{
				label: "0 个",
				actions: []
			},
			{
				label: "1 个",
				actions: [{
					key: "ack",
					text: "知道了"
				}]
			},
			{
				label: "2 个",
				actions: [{
					key: "view_detail",
					text: "前往商店",
					url: "https://workbuddy.tencent.com/skills"
				}, {
					key: "ack",
					text: "我知道啦"
				}]
			}
		].map((v) => /* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("div", {
			style: {
				display: "flex",
				flexDirection: "column",
				gap: 4
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("span", {
				style: {
					fontSize: "var(--wb-font-caption-size)",
					color: "var(--wb-color-text-tertiary)"
				},
				children: v.label
			}), /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)(Notification, {
				data: {
					msgId: `demo-${v.label}`,
					title: "Skill 商店全新上线",
					content: SHORT_CONTENT,
					actions: v.actions
				},
				expandable: false,
				onActionClick: handleAction,
				onClose: () => console.log("[Notification demo] close"),
				closeAriaLabel: "关闭"
			})]
		}, v.label))
	});
}
var import_react$17, import_jsx_runtime$17, SHORT_CONTENT, DEFAULT_DATA;
var init_NotificationPage = __esmMin((() => {
	import_react$17 = /* @__PURE__ */ __toESM(require_react());
	init_Notification();
	init_DemoBlock();
	import_jsx_runtime$17 = require_jsx_runtime();
	SHORT_CONTENT = "100+ 专业技能即装即用，覆盖研发、设计、数据分析、办公协作等核心场景。无需配置，一键安装。每周更新数十款热门技能，覆盖你工作中 90% 的高频场景。";
	DEFAULT_DATA = {
		msgId: "demo-1",
		title: "Skill 商店全新上线 🎉",
		summary: "100+ 专业技能即装即用",
		content: `WorkBuddy 全新上线 Skill 商店！

✨ 100+ 专业技能即装即用
- 覆盖研发、设计、数据分析、办公协作等核心场景
- 无需复杂配置，一键安装即可使用
- 持续更新，每周新增 5+ 高质量技能

🚀 三大亮点
1. 智能推荐 —— 根据你的工作场景自动推荐合适的技能
2. 一键安装 —— 复杂工作流一步到位
3. 安全可控 —— 高风险操作需手动确认，企业级隔离

📦 立即体验
点击右下角「前往商店」即可进入 Skill 商店浏览全部技能。
也可以点击「查看详情」了解更多发布信息与 Roadmap。

更多信息见 https://workbuddy.tencent.com/skills`.repeat(2),
		actions: [{
			key: "view_detail",
			text: "前往商店",
			url: "https://workbuddy.tencent.com/skills"
		}, {
			key: "ack",
			text: "我知道啦"
		}]
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/poi/dialog/poi-tool-protocol.ts
var init_poi_tool_protocol = __esmMin((() => {
	init_tool_protocol();
}));
var init_PoiPermissionDecorator = __esmMin((() => {
	require_react();
	init_PoiAuthCard();
	require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/poi/dialog/index.ts
var init_dialog = __esmMin((() => {
	init_poi_tool_protocol();
	init_PoiAuthCard();
	init_McpPoiConsentCard();
	init_PoiPermissionDecorator();
	init_PoiAddressPickerCard();
	init_PoiLocationFormCard();
	init_PoiLocateErrorDialog();
	init_use_poi_flow();
	init_PoiDialogFlow();
}));
//#endregion
//#region ../../packages/agent-ui/src/playbook/pages/components/PoiDialogPage.tsx
function playbookEntryId() {
	return `pb-${++_playbookIdSeq}`;
}
/** 内存 PoiStorage 桩（演示用，不落地宿主） */
function createMemoryStorage() {
	let book = {
		entries: [],
		activeEntryId: null,
		location_auth_status: "not_granted"
	};
	return {
		read: () => ({
			...book,
			entries: [...book.entries]
		}),
		write: (next) => {
			book = {
				...next,
				location_updated_at: Date.now()
			};
			return book;
		},
		addEntry: (entry) => {
			const id = playbookEntryId();
			const newEntry = {
				...entry,
				id,
				location_enabled: true,
				location_updated_at: Date.now()
			};
			book = {
				...book,
				entries: [...book.entries, newEntry],
				activeEntryId: id,
				location_updated_at: Date.now()
			};
			return {
				book,
				id
			};
		},
		updateEntry: (id, patch) => {
			book = {
				...book,
				entries: book.entries.map((e) => e.id === id ? {
					...e,
					...patch,
					id
				} : e),
				location_updated_at: Date.now()
			};
			return book;
		},
		deleteEntry: (id) => {
			const entries = book.entries.filter((e) => e.id !== id);
			const activeEntryId = book.activeEntryId === id ? entries[0]?.id ?? null : book.activeEntryId;
			book = {
				...book,
				entries,
				activeEntryId,
				location_updated_at: Date.now()
			};
			return book;
		},
		setActiveEntry: (id) => {
			if (id !== null && !book.entries.some((e) => e.id === id)) return book;
			book = {
				...book,
				activeEntryId: id,
				location_updated_at: Date.now()
			};
			return book;
		},
		setAuthStatus: (status) => {
			book = {
				...book,
				location_auth_status: status,
				location_updated_at: Date.now()
			};
			return book;
		},
		clear: () => {
			book = {
				...book,
				entries: [],
				activeEntryId: null,
				location_updated_at: Date.now()
			};
			return book;
		},
		getMcpPoiConsent: (mcpServerName) => book.mcpPoiConsent?.[mcpServerName],
		setMcpPoiConsent: (mcpServerName, consent) => {
			book = {
				...book,
				mcpPoiConsent: {
					...book.mcpPoiConsent,
					[mcpServerName]: consent
				},
				location_updated_at: Date.now()
			};
			return book;
		}
	};
}
/** 完整流程演示（状态机驱动） */
function FlowDemo() {
	const storage = (0, import_react$15.useMemo)(() => createMemoryStorage(), []);
	const [completed, setCompleted] = (0, import_react$15.useState)("");
	const flow = usePoiFlow({
		service: poiMapServiceMock,
		storageOverride: storage,
		onComplete: (result) => setCompleted(JSON.stringify(result))
	});
	const { state } = flow;
	return /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(PoiServiceProvider, {
		service: poiMapServiceMock,
		children: /* @__PURE__ */ (0, import_jsx_runtime$15.jsxs)("div", {
			style: {
				display: "flex",
				flexDirection: "column",
				gap: 12,
				minWidth: 320
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$15.jsxs)("div", {
					style: {
						display: "flex",
						gap: 8
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(Button, {
						variant: "primary",
						size: "small",
						onClick: () => flow.start(),
						children: "启动流程"
					}), /* @__PURE__ */ (0, import_jsx_runtime$15.jsxs)("span", {
						style: {
							fontSize: 12,
							color: "var(--wb-color-text-tertiary)"
						},
						children: ["当前状态：", /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("code", { children: state.kind })]
					})]
				}),
				state.kind === "ask_auth" && /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(PoiAuthCard, {
					onAllow: flow.allow,
					onDeny: flow.deny
				}),
				state.kind === "ip_locating" && /* @__PURE__ */ (0, import_jsx_runtime$15.jsxs)("div", {
					style: {
						fontSize: 13,
						color: "var(--wb-color-text-tertiary)"
					},
					children: [
						"正在获取当前位置…（attempt ",
						state.attempt,
						"）"
					]
				}),
				state.kind === "error_dialog" && /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(PoiLocateErrorDialog, {
					open: true,
					onOpenChange: () => void 0,
					onRetry: flow.retry,
					onCancel: flow.cancelError,
					kind: state.errorKind
				}),
				state.kind === "form" && /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(PoiLocationFormCard, {
					initialValue: state.initialValue,
					sourceTag: state.source === "geolocation" ? "geolocation" : state.source === "manual_after_geolocation_failed" ? "manual_after_geolocation_failed" : "manual",
					currentAuthStatus: flow.currentAuthStatus,
					onSave: flow.submitForm,
					onCancel: flow.cancelForm
				}),
				state.kind === "done" && /* @__PURE__ */ (0, import_jsx_runtime$15.jsxs)("div", {
					style: { fontSize: 13 },
					children: ["流程结束：", /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("code", { children: state.result.status })]
				}),
				completed && /* @__PURE__ */ (0, import_jsx_runtime$15.jsxs)("div", {
					style: {
						fontSize: 12,
						color: "var(--wb-color-text-tertiary)"
					},
					children: ["onComplete：", /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("code", { children: completed })]
				})
			]
		})
	});
}
function PoiDialogPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(FlowDemo, {});
}
/** Mock ToolCall 工厂（结果卡片演示） */
function makeToolCall(status, metaData) {
	return {
		id: `poi-${status}`,
		name: "get_location",
		status,
		metaData
	};
}
function PoiDialogVariants() {
	const resultRenderer = (0, import_react$15.useMemo)(() => new PoiResultRenderer(), []);
	return /* @__PURE__ */ (0, import_jsx_runtime$15.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 16,
			maxWidth: 420
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(DemoBlock, {
				title: "授权卡（475:1461）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(import_jsx_runtime$15.Fragment, { children: "标题 + 副文案 + 序号选项行（1 允许 / 2 拒绝）。" }),
				code: "<PoiAuthCard onAllow={...} onDeny={...} />",
				children: /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(PoiServiceProvider, {
					service: poiMapServiceMock,
					children: /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(PoiAuthCard, {
						onAllow: () => void 0,
						onDeny: () => void 0
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(DemoBlock, {
				title: "地址单选卡（485:80）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(import_jsx_runtime$15.Fragment, { children: "已保存地址（带序号）+ 新增地址行。" }),
				code: "<PoiAddressPickerCard savedLocations={[...]} onSelectSaved={...} onAddNew={...} onCancel={...} />",
				children: /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(PoiAddressPickerCard, {
					savedLocations: [SAVED_LOCATION],
					onSelectSaved: () => void 0,
					onAddNew: () => void 0,
					onCancel: () => void 0
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(DemoBlock, {
				title: "内嵌表单卡（475:1655）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(import_jsx_runtime$15.Fragment, { children: "复用 useGeocodeValidate；IP 回填 sourceTag=geolocation，手动 sourceTag=manual。" }),
				code: "<PoiLocationFormCard sourceTag=\"manual\" onSave={...} onCancel={...} />",
				children: /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(PoiServiceProvider, {
					service: poiMapServiceMock,
					children: /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(PoiLocationFormCard, {
						sourceTag: "manual",
						onSave: () => void 0,
						onCancel: () => void 0
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(DemoBlock, {
				title: "结果卡片 · 成功（475:1591）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(import_jsx_runtime$15.Fragment, { children: "左侧地图缩略图占位 + 右侧地点名/地址。" }),
				code: "tool.metaData.poiResult = { status: \"success\", location: {...} }",
				children: resultRenderer.render(makeToolCall("executed", { poiResult: {
					status: "success",
					location: {
						name: "腾讯滨海大厦",
						address: "广东省深圳市南山区深南大道10000号"
					}
				} }))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(DemoBlock, {
				title: "结果卡片 · 失败",
				description: /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(import_jsx_runtime$15.Fragment, { children: "展示 failureReason 文案。" }),
				code: "tool.metaData.poiResult = { status: \"failed\", failureReason: \"locate_failed\" }",
				children: resultRenderer.render(makeToolCall("executed", { poiResult: {
					status: "failed",
					failureReason: "locate_failed"
				} }))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(DemoBlock, {
				title: "结果卡片 · 获取中",
				description: /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(import_jsx_runtime$15.Fragment, { children: "pending/executing 显示获取中。" }),
				code: "tool.status = \"executing\"",
				children: resultRenderer.render(makeToolCall("executing"))
			})
		]
	});
}
var import_react$15, import_jsx_runtime$15, _playbookIdSeq, SAVED_LOCATION;
var init_PoiDialogPage = __esmMin((() => {
	import_react$15 = /* @__PURE__ */ __toESM(require_react());
	init_poi_result();
	init_Button();
	init_dialog();
	init_poi_map_service_mock();
	init_poi_service_context();
	init_DemoBlock();
	import_jsx_runtime$15 = require_jsx_runtime();
	_playbookIdSeq = 0;
	SAVED_LOCATION = {
		location_auth_status: "granted",
		location_enabled: true,
		location_name: "腾讯滨海大厦",
		location_address: "广东省深圳市南山区深南大道10000号",
		location_lat: 22.5485,
		location_lng: 113.9445,
		location_city: "深圳市",
		location_source: "manual"
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/playbook/pages/components/PopconfirmPage.tsx
function PopconfirmPage(props) {
	const icon = props.iconMode === "none" ? null : props.iconMode === "custom" ? /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(DeleteIcon, { size: "md" }) : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("div", {
		style: {
			minHeight: 220,
			display: "flex",
			alignItems: "center",
			justifyContent: "center"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(Popconfirm, {
			title: props.title || "确认删除？",
			description: props.description || void 0,
			icon,
			okText: props.okText || "OK",
			cancelText: props.cancelText || "Cancel",
			placement: props.placement,
			trigger: props.trigger,
			showCancel: props.showCancel,
			disabled: props.disabled,
			arrow: props.arrow,
			okButtonProps: { variant: props.okVariant },
			onConfirm: () => console.log("[playbook] confirm"),
			onCancel: () => console.log("[playbook] cancel"),
			children: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(Button, {
				variant: "primary",
				children: props.label || "删除"
			})
		})
	});
}
function PopconfirmVariants() {
	return /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 16
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(DemoBlock, {
				title: "基础用法",
				description: /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)(import_jsx_runtime$14.Fragment, { children: [
					"最常见的\"删除二次确认\"场景。点击触发器弹出气泡；点 ",
					/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("code", { children: "OK" }),
					" 触发",
					/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("code", { children: "onConfirm" }),
					"，点 ",
					/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("code", { children: "Cancel" }),
					" 或 ESC / 外部点击触发关闭。"
				] }),
				code: `<Popconfirm
  title="确认删除？"
  description="删除后无法恢复"
  onConfirm={() => deleteItem(id)}
  onCancel={() => console.log('cancel')}
>
  <Button variant="primary">删除</Button>
</Popconfirm>`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(Popconfirm, {
					title: "确认删除？",
					description: "删除后无法恢复",
					onConfirm: () => console.log("confirm"),
					children: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(Button, {
						variant: "primary",
						children: "删除"
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(DemoBlock, {
				title: "异步关闭（onConfirm 返回 Promise → 自动 loading）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)(import_jsx_runtime$14.Fragment, { children: [
					"与 antd 行为一致：",
					/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("code", { children: "onConfirm" }),
					" 返回 ",
					/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("code", { children: "Promise" }),
					" 时， OK 按钮自动 loading；",
					/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("code", { children: "resolve" }),
					" 后自动关闭浮层；",
					/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("code", { children: "reject" }),
					" 不关闭，让调用方决定后续（例如显示错误后保留浮层）。"
				] }),
				code: `const submit = () => new Promise(resolve => setTimeout(resolve, 1500));

<Popconfirm
  title="提交表单？"
  description="点击确定将异步提交"
  onConfirm={submit}
>
  <Button variant="primary">提交</Button>
</Popconfirm>`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(AsyncDemo, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(DemoBlock, {
				title: "受控开关 + 条件触发",
				description: /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)(import_jsx_runtime$14.Fragment, { children: [
					"外部传 ",
					/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("code", { children: "open" }),
					" + ",
					/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("code", { children: "onOpenChange" }),
					" 自管开关， 常见于\"满足某条件直接执行、否则弹出二次确认\"。"
				] }),
				code: `const [open, setOpen] = useState(false);
const [needConfirm, setNeedConfirm] = useState(true);

const handleOpenChange = (next: boolean) => {
  if (!next) { setOpen(false); return; }
  if (!needConfirm) {
    // 不需要确认时直接执行
    runAction();
  } else {
    setOpen(true);
  }
};

<Popconfirm
  title="确认操作？"
  open={open}
  onOpenChange={handleOpenChange}
  onConfirm={() => { runAction(); setOpen(false); }}
>
  <Button>执行</Button>
</Popconfirm>`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(ControlledDemo, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(DemoBlock, {
				title: "位置（placement）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)(import_jsx_runtime$14.Fragment, { children: [
					"12 方向，与 Popover / antd 一致；视口空间不够时自动 flip 反向。 Popconfirm 默认 ",
					/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("code", { children: "top" }),
					"（与 antd 一致；与 Popover 默认 ",
					/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("code", { children: "bottom" }),
					" 不同）。"
				] }),
				code: `<Popconfirm placement="top"    title="..." onConfirm={ok}><Button>top</Button></Popconfirm>
<Popconfirm placement="bottom" title="..." onConfirm={ok}><Button>bottom</Button></Popconfirm>
<Popconfirm placement="left"   title="..." onConfirm={ok}><Button>left</Button></Popconfirm>
<Popconfirm placement="right"  title="..." onConfirm={ok}><Button>right</Button></Popconfirm>`,
				children: [
					"top",
					"bottom",
					"left",
					"right"
				].map((p) => /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(Popconfirm, {
					title: "确认操作？",
					placement: p,
					onConfirm: () => void 0,
					children: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(Button, {
						variant: "secondary",
						size: "small",
						children: p
					})
				}, p))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)(DemoBlock, {
				title: "触发方式（trigger）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)(import_jsx_runtime$14.Fragment, { children: [
					"受 Popover 限制，v0.2 仅支持 ",
					/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("code", { children: "'click'" }),
					" / ",
					/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("code", { children: "'hover'" }),
					"，默认 ",
					/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("code", { children: "'click'" }),
					"。 Popconfirm 是确认型交互，hover 出确认框容易误触；除非你的场景里\"看一眼就够\" （比如行内提示型确认），否则保留默认 ",
					/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("code", { children: "'click'" }),
					"。"
				] }),
				code: `<Popconfirm trigger="click" title="点击触发" onConfirm={ok}>
  <Button>click（默认）</Button>
</Popconfirm>

<Popconfirm trigger="hover" title="悬浮触发" onConfirm={ok}>
  <Button variant="secondary">hover</Button>
</Popconfirm>`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(Popconfirm, {
					trigger: "click",
					title: "点击触发",
					onConfirm: () => void 0,
					children: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(Button, {
						variant: "primary",
						children: "click（默认）"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(Popconfirm, {
					trigger: "hover",
					title: "悬浮触发",
					onConfirm: () => void 0,
					children: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(Button, {
						variant: "secondary",
						children: "hover"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)(DemoBlock, {
				title: "箭头开关（arrow）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)(import_jsx_runtime$14.Fragment, { children: [
					"默认 ",
					/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("code", { children: "arrow=true" }),
					"，气泡有指向触发器的小三角；",
					/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("code", { children: "arrow=false" }),
					" 去掉箭头，整体更\"卡片\"化，常用于密集列表里减少视觉噪声。"
				] }),
				code: `<Popconfirm title="带箭头" arrow onConfirm={ok}>
  <Button>arrow=true（默认）</Button>
</Popconfirm>

<Popconfirm title="无箭头" arrow={false} onConfirm={ok}>
  <Button variant="secondary">arrow=false</Button>
</Popconfirm>`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(Popconfirm, {
					title: "带箭头",
					arrow: true,
					onConfirm: () => void 0,
					children: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(Button, {
						variant: "primary",
						children: "arrow=true（默认）"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(Popconfirm, {
					title: "无箭头",
					arrow: false,
					onConfirm: () => void 0,
					children: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(Button, {
						variant: "secondary",
						children: "arrow=false"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)(DemoBlock, {
				title: "危险确认（okType=\"danger\"）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)(import_jsx_runtime$14.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("code", { children: "okType=\"danger\"" }),
					" 把 OK 按钮渲染为红底白字的危险态， 与 antd 行为一致。底层把 Button 的 ",
					/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("code", { children: "danger" }),
					" flag 与",
					/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("code", { children: "variant=\"primary\"" }),
					" 组合。删除 / 不可逆操作的二次确认请用此模式。",
					/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("br", {}),
					/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("code", { children: "icon" }),
					" 槽位可以传 DeleteIcon 强化\"删除\"语义； 红色 OK 按钮 + 删除图标是删除二次确认的标准搭配。"
				] }),
				code: `<Popconfirm
  title="确认删除？"
  description="删除后无法恢复"
  okType="danger"
  okText="删除"
  icon={<DeleteIcon size="md" />}
  onConfirm={() => deleteItem(id)}
>
  <Button variant="primary" danger>删除</Button>
</Popconfirm>`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(Popconfirm, {
					title: "确认删除？",
					description: "删除后无法恢复",
					okType: "danger",
					okText: "删除",
					icon: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(DeleteIcon, { size: "md" }),
					onConfirm: () => void 0,
					children: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(Button, {
						variant: "primary",
						danger: true,
						children: "删除"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(Popconfirm, {
					title: "清空购物车？",
					description: "3 件商品将被移除",
					okType: "danger",
					okText: "清空",
					onConfirm: () => void 0,
					children: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(Button, {
						variant: "secondary",
						danger: true,
						children: "清空"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(DemoBlock, {
				title: "按钮透传（okButtonProps / cancelButtonProps）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)(import_jsx_runtime$14.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("code", { children: "okButtonProps" }),
					" 透传到 OK 按钮、",
					/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("code", { children: "cancelButtonProps" }),
					" 透传到 Cancel 按钮， 可改 ",
					/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("code", { children: "variant" }),
					" / ",
					/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("code", { children: "size" }),
					" 等任意 Foundation Button props。 但 ",
					/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("code", { children: "onClick" }),
					" / ",
					/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("code", { children: "loading" }),
					" / ",
					/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("code", { children: "children" }),
					" 由组件内部接管，传了也会被覆盖 （想改文案用 ",
					/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("code", { children: "okText" }),
					" / ",
					/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("code", { children: "cancelText" }),
					"）。 在 Foundation Button 补出 danger variant 之前，删除场景的\"危险红\"也通过这条路凑合实现。"
				] }),
				code: `<Popconfirm
  title="确认删除？"
  description="该操作不可恢复"
  okText="删除"
  okButtonProps={{ variant: 'grey' }}        // OK 按钮改成中性灰，弱化"鼓励点击"
  cancelButtonProps={{ size: 'small' }}      // Cancel 按钮改尺寸（其实默认就 small，仅示例）
  onConfirm={() => deleteItem(id)}
>
  <Button variant="primary">删除</Button>
</Popconfirm>`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(Popconfirm, {
					title: "确认删除？",
					description: "该操作不可恢复",
					okText: "删除",
					okButtonProps: { variant: "grey" },
					cancelButtonProps: { size: "small" },
					onConfirm: () => void 0,
					children: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(Button, {
						variant: "primary",
						children: "删除"
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(DemoBlock, {
				title: "仅确认按钮（showCancel=false）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(import_jsx_runtime$14.Fragment, { children: "某些场景不需要 Cancel 按钮（例如\"已读\"提示），只保留 OK。" }),
				code: `<Popconfirm title="已知悉" showCancel={false} onConfirm={ok}>
  <Button variant="grey">提示</Button>
</Popconfirm>`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(Popconfirm, {
					title: "已知悉",
					showCancel: false,
					onConfirm: () => void 0,
					children: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(Button, {
						variant: "grey",
						children: "提示"
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)(DemoBlock, {
				title: "自定义图标 / 按钮文案",
				description: /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)(import_jsx_runtime$14.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("code", { children: "icon" }),
					" 传任意 ReactNode 替换默认 HelpCircleIcon；",
					/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("code", { children: "okText" }),
					" / ",
					/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("code", { children: "cancelText" }),
					" 自定义按钮文案。 传 ",
					/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("code", { children: "icon={null}" }),
					" 可隐藏 icon 槽位。"
				] }),
				code: `<Popconfirm
  title="删除该任务？"
  icon={<DeleteIcon size="md" />}
  okText="是"
  cancelText="否"
  onConfirm={ok}
>
  <Button variant="primary">Delete</Button>
</Popconfirm>

{/* 不展示 icon */}
<Popconfirm title="确认？" icon={null} onConfirm={ok}>
  <Button>无图标</Button>
</Popconfirm>`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(Popconfirm, {
					title: "删除该任务？",
					icon: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(DeleteIcon, { size: "md" }),
					okText: "是",
					cancelText: "否",
					onConfirm: () => void 0,
					children: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(Button, {
						variant: "primary",
						children: "Delete"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(Popconfirm, {
					title: "确认？",
					icon: null,
					onConfirm: () => void 0,
					children: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(Button, {
						variant: "secondary",
						children: "无图标"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(DemoBlock, {
				title: "富内容 title / description（传 ReactNode）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)(import_jsx_runtime$14.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("code", { children: "title" }),
					" 和 ",
					/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("code", { children: "description" }),
					" 类型是 ",
					/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("code", { children: "ReactNode" }),
					"， 不是 ",
					/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("code", { children: "string" }),
					" —— 可以直接塞 JSX 做强调、变量插值、多段说明、甚至小型清单。 但记住 Popconfirm 定位是\"二选一确认\"：如果你想塞输入框 / 选项 / 多按钮， 请直接用底层 ",
					/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("code", { children: "Popover" }),
					" 自拼 content（详见 PopoverPage）。"
				] }),
				code: `<Popconfirm
  title={<span>确认删除 <b style={{ color: 'var(--wb-status-error)' }}>order-2025-001</b> ?</span>}
  description={
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span>该订单将被永久删除，<b>无法恢复</b>。</span>
      <span style={{ color: 'var(--wb-color-text-tertiary)' }}>
        关联的 3 条物流记录会一并清理。
      </span>
    </div>
  }
  onConfirm={() => deleteOrder(id)}
>
  <Button variant="primary">删除订单</Button>
</Popconfirm>`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(Popconfirm, {
					title: /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("span", { children: [
						"确认删除",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("b", {
							style: { color: "var(--wb-status-error)" },
							children: "order-2025-001"
						}),
						" ",
						"?"
					] }),
					description: /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("div", {
						style: {
							display: "flex",
							flexDirection: "column",
							gap: 4
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("span", { children: [
							"该订单将被永久删除，",
							/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("b", { children: "无法恢复" }),
							"。"
						] }), /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("span", {
							style: { color: "var(--wb-color-text-tertiary)" },
							children: "关联的 3 条物流记录会一并清理。"
						})]
					}),
					onConfirm: () => void 0,
					children: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(Button, {
						variant: "primary",
						children: "删除订单"
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(DemoBlock, {
				title: "禁用态（disabled）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)(import_jsx_runtime$14.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("code", { children: "disabled=true" }),
					" 时点击 children 不会弹出确认框（children 自身的",
					/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("code", { children: "onClick" }),
					" 仍会触发）。"
				] }),
				code: `<Popconfirm disabled title="不会弹出" onConfirm={ok}>
  <Button variant="grey" disabled>不可用</Button>
</Popconfirm>`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(Popconfirm, {
					disabled: true,
					title: "不会弹出",
					onConfirm: () => void 0,
					children: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(Button, {
						variant: "grey",
						disabled: true,
						children: "不可用"
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(PopconfirmGapsBlock, {})
		]
	});
}
/**
* 异步演示 —— onConfirm 返回 Promise 时 OK 按钮自动 loading，
* resolve 后自动关闭。reject 时不关闭，由调用方处理。
*/
function AsyncDemo() {
	const [submitted, setSubmitted] = (0, import_react$14.useState)(0);
	return /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 8,
			alignItems: "flex-start"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(Popconfirm, {
			title: "提交表单？",
			description: "点击确定将异步提交（1.5s）",
			onConfirm: () => new Promise((resolve) => {
				setTimeout(() => {
					setSubmitted((n) => n + 1);
					resolve();
				}, 1500);
			}),
			children: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(Button, {
				variant: "primary",
				children: "提交"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("span", {
			style: {
				fontSize: "var(--wb-font-caption-size)",
				color: "var(--wb-color-text-tertiary)"
			},
			children: [
				"已成功提交：",
				/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("code", { children: submitted }),
				" 次"
			]
		})]
	});
}
/**
* 受控演示 —— 外部按钮也可关闭浮层；toggle"是否需要确认"演示条件触发。
*/
function ControlledDemo() {
	const [open, setOpen] = (0, import_react$14.useState)(false);
	const [needConfirm, setNeedConfirm] = (0, import_react$14.useState)(true);
	const [count, setCount] = (0, import_react$14.useState)(0);
	const runAction = () => setCount((n) => n + 1);
	const handleOpenChange = (next) => {
		if (!next) {
			setOpen(false);
			return;
		}
		if (!needConfirm) runAction();
		else setOpen(true);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 8,
			alignItems: "flex-start"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("label", {
				style: {
					display: "flex",
					gap: 6,
					alignItems: "center",
					fontSize: 13
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("input", {
					type: "checkbox",
					checked: needConfirm,
					onChange: (e) => setNeedConfirm(e.target.checked)
				}), "需要二次确认（取消勾选则点击直接执行）"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(Popconfirm, {
				title: "确认操作？",
				open,
				onOpenChange: handleOpenChange,
				onConfirm: () => {
					runAction();
					setOpen(false);
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(Button, {
					variant: "primary",
					children: "执行"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("span", {
				style: {
					fontSize: "var(--wb-font-caption-size)",
					color: "var(--wb-color-text-tertiary)"
				},
				children: [
					"已执行 ",
					/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("code", { children: count }),
					" 次；外部 ",
					/* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("code", { children: ["open = ", String(open)] })
				]
			})
		]
	});
}
/**
* 能力缺口公示 —— 与 docs/popconfirm-design-gaps.md 保持一致。
* 任一项落地后，把它从两份文档中同时移除。
*
* 写法约束（继承 GapsBlock 规范）：
*   - 只列「离 antd 标准还差什么」，每条一行
*   - blocking：必须设计师补稿 / 上游补能力才能做的
*   - pending：历史方案兜底中、可后补的细节
*/
function PopconfirmGapsBlock() {
	return /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(GapsBlock, {
		gapDocPath: "docs/popconfirm-design-gaps.md",
		blocking: [{
			title: "默认告警 icon 资产",
			description: "antd 默认黄底感叹号；当前 icon 库只有中性 HelpCircleIcon，缺标准告警图标"
		}, {
			title: "icon 颜色按语义切换",
			description: "危险/警告时 icon 应为红/黄；当前没有\"警告/危险\"专用 icon 色 token"
		}],
		pending: [
			{
				title: "默认 trigger=click（与 antd 默认 hover 不同）",
				description: "改默认是为了防误触，待设计师确认是否同意此项偏离 antd 默认"
			},
			{
				title: "icon 与 title 视觉对齐",
				description: "当前用 margin-top: 2px 估算，未拿到设计 token"
			},
			{
				title: "容器宽度（min 200 / max 280）",
				description: "设计稿未钉死，估算值，待设计师正式给档"
			},
			{
				title: "trigger=\"focus\" / \"contextMenu\" / 数组组合",
				description: "受 Popover 限制，仅 click/hover；上游 Popover 扩后再透传"
			},
			{
				title: "mouseEnterDelay / mouseLeaveDelay",
				description: "复用 Popover 硬编码 80/100ms，未单独暴露；hover 场景需要时再加"
			}
		],
		footer: /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)(import_jsx_runtime$14.Fragment, { children: [
			"本次明确不做：",
			/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("code", { children: "onPopupClick" }),
			" / ",
			/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("code", { children: "autoAdjustOverflow" }),
			" /",
			/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("code", { children: "align" }),
			" / ",
			/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("code", { children: "color" }),
			" / ",
			/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("code", { children: "getPopupContainer" }),
			" /",
			/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("code", { children: "zIndex" }),
			" / ",
			/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("code", { children: "destroyTooltipOnHide" }),
			" /",
			/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("code", { children: "fresh" }),
			" / ",
			/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("code", { children: "classNames" }),
			" / ",
			/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("code", { children: "styles" }),
			"（v0.2 Foundation 不暴露语义化 DOM 定制；详见 GAP 长版第 3 段）。"
		] })
	});
}
var import_react$14, import_jsx_runtime$14;
var init_PopconfirmPage = __esmMin((() => {
	import_react$14 = /* @__PURE__ */ __toESM(require_react());
	init_Button();
	init_Icon();
	init_Popconfirm();
	init_DemoBlock();
	init_GapsBlock();
	import_jsx_runtime$14 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/playbook/pages/components/PopoverPage.tsx
function DemoBody() {
	return /* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 6,
			minWidth: 180
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("strong", {
			style: { color: "var(--wb-color-text-primary)" },
			children: "Popover content"
		}), /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("span", {
			style: {
				color: "var(--wb-color-text-secondary)",
				fontSize: "var(--wb-font-caption-size)"
			},
			children: "任何 ReactNode 都可作为内容；外点击或 ESC 自动关闭。"
		})]
	});
}
function PopoverPage(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("div", {
		style: {
			minHeight: 220,
			display: "flex",
			alignItems: "center",
			justifyContent: "center"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(Popover, {
			placement: props.placement,
			triggerMode: props.triggerMode,
			hasArrow: props.hasArrow,
			disabled: props.disabled,
			trigger: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(Button, {
				variant: "primary",
				children: props.label || "Open popover"
			}),
			children: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(DemoBody, {})
		})
	});
}
function PopoverVariants() {
	return /* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 16
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(DemoBlock, {
				title: "基础用法",
				description: /* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)(import_jsx_runtime$13.Fragment, { children: [
					"最简单的用法，传 ",
					/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("code", { children: "trigger" }),
					"（任意 ReactElement）+ ",
					/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("code", { children: "children" }),
					"即可。点击 trigger 打开浮层，点击外部或按 ESC 关闭。"
				] }),
				code: `<Popover
  trigger={<Button variant="primary">Click me</Button>}
  // 想观察打开/关闭事件，传 onOpenChange（受控/非受控都生效）
  onOpenChange={open => console.log('popover', open ? 'opened' : 'closed')}
>
  <strong>Popover content</strong>
  <span>任何 ReactNode 都可作为内容；外点击或 ESC 自动关闭。</span>
</Popover>`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(Popover, {
					trigger: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(Button, {
						variant: "primary",
						children: "Click me"
					}),
					children: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(DemoBody, {})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(DemoBlock, {
				title: "位置（placement）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)(import_jsx_runtime$13.Fragment, { children: [
					"通过 ",
					/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("code", { children: "placement" }),
					" 控制浮层相对触发器的位置；视口空间不够时自动 flip。 与 antd Popover 一致，支持 ",
					/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("strong", { children: "12 个方向" }),
					"：4 个主方向 （",
					/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("code", { children: "top" }),
					" / ",
					/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("code", { children: "bottom" }),
					" / ",
					/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("code", { children: "left" }),
					" / ",
					/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("code", { children: "right" }),
					"）+ 每个主方向的 ",
					/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("code", { children: "-start" }),
					" / ",
					/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("code", { children: "-end" }),
					" 对齐变体。 下方按 antd 文档版式以 3×3 网格陈列，方便对照触发器尺寸看锚点行为。"
				] }),
				code: `// 12 个方向（与 antd 一致）
<Popover placement="top-start"    hasArrow trigger={<Button>TL</Button>}>...</Popover>
<Popover placement="top"          hasArrow trigger={<Button>Top</Button>}>...</Popover>
<Popover placement="top-end"      hasArrow trigger={<Button>TR</Button>}>...</Popover>

<Popover placement="left-start"   hasArrow trigger={<Button>LT</Button>}>...</Popover>
<Popover placement="right-start"  hasArrow trigger={<Button>RT</Button>}>...</Popover>
<Popover placement="left"         hasArrow trigger={<Button>Left</Button>}>...</Popover>
<Popover placement="right"        hasArrow trigger={<Button>Right</Button>}>...</Popover>
<Popover placement="left-end"     hasArrow trigger={<Button>LB</Button>}>...</Popover>
<Popover placement="right-end"    hasArrow trigger={<Button>RB</Button>}>...</Popover>

<Popover placement="bottom-start" hasArrow trigger={<Button>BL</Button>}>...</Popover>
<Popover placement="bottom"       hasArrow trigger={<Button>Bottom</Button>}>...</Popover>
<Popover placement="bottom-end"   hasArrow trigger={<Button>BR</Button>}>...</Popover>`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(PlacementGrid, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(DemoBlock, {
				title: "触发方式（triggerMode）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)(import_jsx_runtime$13.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("code", { children: "click" }),
					"（默认）：点击触发器开/关，适合菜单 / 详情面板。",
					/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("code", { children: "hover" }),
					"：鼠标移入即展开，移到浮层上保持打开（80ms 进入延迟 + 100ms 离开 延迟），适合补充提示。"
				] }),
				code: `<Popover triggerMode="click" trigger={<Button>click</Button>}>...</Popover>
<Popover triggerMode="hover" trigger={<Button>hover</Button>}>...</Popover>`,
				children: ALL_TRIGGERS.map((m) => /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(Popover, {
					placement: "bottom",
					triggerMode: m,
					trigger: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(Button, {
						variant: "secondary",
						children: m
					}),
					children: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(DemoBody, {})
				}, m))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)(DemoBlock, {
				title: "连接箭头（hasArrow）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)(import_jsx_runtime$13.Fragment, { children: [
					"传 ",
					/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("code", { children: "hasArrow" }),
					" 时浮层与触发器之间画一个 8×8 三角小箭头，颜色与浮层背景 一致。默认不带箭头。"
				] }),
				code: `<Popover trigger={<Button>无箭头</Button>}>...</Popover>
<Popover hasArrow trigger={<Button>有箭头</Button>}>...</Popover>`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(Popover, {
					trigger: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(Button, {
						variant: "secondary",
						children: "无箭头"
					}),
					children: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(DemoBody, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(Popover, {
					hasArrow: true,
					trigger: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(Button, {
						variant: "secondary",
						children: "有箭头"
					}),
					children: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(DemoBody, {})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(DemoBlock, {
				title: "受控开关（open + onOpenChange）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)(import_jsx_runtime$13.Fragment, { children: [
					"外部传 ",
					/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("code", { children: "open" }),
					" + ",
					/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("code", { children: "onOpenChange" }),
					" 受控浮层开合，常见于「外部按钮 关闭浮层」「状态机驱动浮层」等场景。下方示例点击「Close」按钮也能关闭浮层。"
				] }),
				code: `const [open, setOpen] = useState(false);

<Popover
  open={open}
  onOpenChange={setOpen}
  hasArrow
  trigger={<Button>{open ? '已打开（点击关闭）' : '关闭中（点击打开）'}</Button>}
>
  <strong>受控浮层内容</strong>
  <Button size="small" onClick={() => setOpen(false)}>Close</Button>
</Popover>`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(ControlledPopoverExample, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(DemoBlock, {
				title: "禁用态（disabled）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)(import_jsx_runtime$13.Fragment, { children: [
					"传 ",
					/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("code", { children: "disabled" }),
					" 后 trigger 仍可见但不响应交互。设计稿未规定 disabled 的视觉，详见能力缺口。"
				] }),
				code: `<Popover disabled trigger={<Button variant="grey">disabled</Button>}>
  <DemoBody />
</Popover>`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(Popover, {
					disabled: true,
					trigger: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(Button, {
						variant: "grey",
						children: "disabled"
					}),
					children: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(DemoBody, {})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(PopoverGapsBlock, {})
		]
	});
}
function ControlledPopoverExample() {
	const [open, setOpen] = (0, import_react$13.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 8,
			alignItems: "flex-start"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(Popover, {
			open,
			onOpenChange: setOpen,
			hasArrow: true,
			trigger: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(Button, {
				variant: "primary",
				children: open ? "已打开（点击关闭）" : "关闭中（点击打开）"
			}),
			children: /* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", {
				style: {
					display: "flex",
					flexDirection: "column",
					gap: 8,
					minWidth: 200
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("strong", { children: "受控浮层内容" }), /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(Button, {
					size: "small",
					variant: "grey",
					onClick: () => setOpen(false),
					children: "Close"
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("span", {
			style: {
				fontSize: "var(--wb-font-caption-size)",
				color: "var(--wb-color-text-tertiary)"
			},
			children: ["外部状态：", /* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("code", { children: ["open = ", String(open)] })]
		})]
	});
}
/**
* PlacementGrid —— 仿 antd Popover 文档的 3×3 网格陈列
*
*        ┌────── TL ─ Top ─ TR ──────┐
*   LT ──│                            │── RT
*   L   ─│         (中间锚区)         │─ R
*   LB ──│                            │── RB
*        └────── BL ─ Bottom ─ BR ────┘
*
*  顶/底两行：触发器锚点在 Popover 上方 / 下方，分别对齐 start / center / end
*  左/右两列：触发器锚点在 Popover 左/右侧，分别对齐 start / center / end
*  中央：仅作占位与视觉锚点参考
*/
function PlacementGrid() {
	const renderTrigger = (label) => /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(Button, {
		variant: "secondary",
		size: "small",
		children: label
	});
	const buildPopover = (placement, label) => /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(Popover, {
		placement,
		hasArrow: true,
		trigger: renderTrigger(label),
		children: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(DemoBody, {})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", {
		style: gridWrapperStyle,
		"aria-label": "Popover 12 方向预览",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", {
				style: {
					...rowStyle,
					justifyContent: "center",
					gap: 8
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("div", { style: spacerColStyle }),
					/* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", {
						style: centerRowStyle,
						children: [
							buildPopover("top-start", "TL"),
							buildPopover("top", "Top"),
							buildPopover("top-end", "TR")
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("div", { style: spacerColStyle })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", {
				style: {
					...rowStyle,
					alignItems: "stretch",
					gap: 8
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", {
						style: sideColStyle,
						children: [
							buildPopover("left-start", "LT"),
							buildPopover("left", "Left"),
							buildPopover("left-end", "LB")
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("div", {
						style: centerAnchorStyle,
						"aria-hidden": "true",
						children: "Trigger area"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", {
						style: sideColStyle,
						children: [
							buildPopover("right-start", "RT"),
							buildPopover("right", "Right"),
							buildPopover("right-end", "RB")
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", {
				style: {
					...rowStyle,
					justifyContent: "center",
					gap: 8
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("div", { style: spacerColStyle }),
					/* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", {
						style: centerRowStyle,
						children: [
							buildPopover("bottom-start", "BL"),
							buildPopover("bottom", "Bottom"),
							buildPopover("bottom-end", "BR")
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("div", { style: spacerColStyle })
				]
			})
		]
	});
}
/**
* 能力缺口公示 —— 与 docs/popover-design-gaps.md 保持一致。
* 任一项落地后，把它从两份文档中同时移除。
*/
function PopoverGapsBlock() {
	return /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(GapsBlock, {
		gapDocPath: "docs/popover-design-gaps.md",
		blocking: [
			{
				title: "入场 / 出场动画",
				description: "当前直接 mount/unmount，无 fade-in；待设计师确认是否补 100~150ms 淡入。"
			},
			{
				title: "浮层最大宽度 / 高度",
				description: "长内容会一直撑到 viewport，列表/段落场景需要明确边界。"
			},
			{
				title: "触发器 disabled 视觉",
				description: "当前仅不响应交互，trigger 自身视觉不变，待设计师确认是否需要禁用感。"
			}
		],
		pending: [
			{
				title: "首帧 visibility hidden",
				description: "为防止从 (0,0) 跳到目标位置而隐掉首帧，慢速设备会感知\"延迟一帧\"。"
			},
			{
				title: "浮层背景色 token",
				description: "当前用 --wb-bg-primary，建议设计师确认是否需要 --wb-popover-bg 专属 token。"
			},
			{
				title: "圆角 / 阴影 / 内边距",
				description: "radius=md(8) / shadow=lg / padding=spacing-3(12) 均从历史 token 继承。"
			},
			{
				title: "z-index 层级",
				description: "用 floating-ui 默认 portal 顺序，多层弹层（Modal 上 Popover）可能错乱。"
			}
		],
		footer: /* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)(import_jsx_runtime$13.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("code", { children: "title 分区" }),
			" / ",
			/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("code", { children: "trigger=\"focus\"" }),
			" /",
			/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("code", { children: "destroyTooltipOnHide" }),
			" / Tooltip 子组件等本次明确不做（详见 GAP 长版第 3 段）。"
		] })
	});
}
var import_react$13, import_jsx_runtime$13, ALL_TRIGGERS, gridWrapperStyle, rowStyle, spacerColStyle, centerRowStyle, sideColStyle, centerAnchorStyle;
var init_PopoverPage = __esmMin((() => {
	import_react$13 = /* @__PURE__ */ __toESM(require_react());
	init_Button();
	init_Popover();
	init_DemoBlock();
	init_GapsBlock();
	import_jsx_runtime$13 = require_jsx_runtime();
	ALL_TRIGGERS = ["click", "hover"];
	gridWrapperStyle = {
		display: "flex",
		flexDirection: "column",
		gap: 12,
		width: "100%",
		minWidth: 360,
		padding: "8px 0"
	};
	rowStyle = {
		display: "flex",
		alignItems: "center",
		width: "100%"
	};
	spacerColStyle = {
		width: 90,
		flexShrink: 0
	};
	centerRowStyle = {
		display: "flex",
		gap: 8,
		flex: "0 0 auto"
	};
	sideColStyle = {
		display: "flex",
		flexDirection: "column",
		gap: 8,
		width: 90,
		flexShrink: 0,
		alignItems: "flex-start"
	};
	centerAnchorStyle = {
		flex: 1,
		minHeight: 120,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		border: "1px dashed var(--wb-border-default)",
		borderRadius: 8,
		color: "var(--wb-color-text-tertiary)",
		fontSize: "var(--wb-font-caption-size)",
		background: "var(--wb-bg-secondary)",
		margin: "0 8px"
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/playbook/pages/components/ProgressPage.tsx
function ProgressPage(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("div", {
		style: { width: 320 },
		children: /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(Progress, {
			size: props.size,
			tone: props.tone,
			shape: props.shape,
			status: props.status,
			showInfo: props.showInfo,
			indeterminate: props.indeterminate,
			percent: props.indeterminate ? void 0 : props.percent
		})
	});
}
function ProgressVariants() {
	return /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 16
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(DemoBlock, {
				title: "设计稿默认形态（容量条）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)(import_jsx_runtime$12.Fragment, { children: [
					"对齐 ardot 368:1544 设计稿：高 4px、直角、轨道黑 8%、填充黑 96%。 外层标题与右侧百分比由调用方自由组合，",
					/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("code", { children: "Progress" }),
					" 只画那条 4px。"
				] }),
				code: `{/* 调用方拼标题 + 进度条；Progress 只画细条 */}
<div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 240 }}>
  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
    <span>3.8 GB 可用</span>
    <span style={{ color: 'var(--wb-text-medium)' }}>62%</span>
  </div>
  <Progress percent={62} />
</div>`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(CapacityBarDemo, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(DemoBlock, {
				title: "业务上传 / 下载场景（标题 + 右侧 %）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)(import_jsx_runtime$12.Fragment, { children: [
					"给 ",
					/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("code", { children: "showInfo" }),
					" 后右侧自动渲染 ",
					/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("code", { children: "NN%" }),
					"， 默认黑色填充。如果想强调\"正在进行中\"，传 ",
					/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("code", { children: "tone=\"brand\"" }),
					" 切到品牌色。"
				] }),
				code: `<Progress percent={42} showInfo />
<Progress percent={42} showInfo tone="brand" />`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("div", {
					style: {
						display: "flex",
						flexDirection: "column",
						gap: 12,
						width: 320
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(Progress, {
						percent: 42,
						showInfo: true
					}), /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(Progress, {
						percent: 42,
						showInfo: true,
						tone: "brand"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(DemoBlock, {
				title: "两档尺寸（size）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)(import_jsx_runtime$12.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("code", { children: "sm" }),
					" = 4px（设计稿默认 / 容量条 / toast 进度）；",
					/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("code", { children: "md" }),
					" = 6px（更醒目，用于独立任务卡片）。"
				] }),
				code: `<Progress percent={60} size="sm" showInfo />
<Progress percent={60} size="md" showInfo />`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("div", {
					style: {
						display: "flex",
						flexDirection: "column",
						gap: 12,
						width: 320
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(Progress, {
						percent: 60,
						size: "sm",
						showInfo: true
					}), /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(Progress, {
						percent: 60,
						size: "md",
						showInfo: true
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(DemoBlock, {
				title: "色调（tone）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)(import_jsx_runtime$12.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("code", { children: "neutral" }),
					"（黑 96%，设计稿默认）= 中性\"用量\"含义；",
					/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("code", { children: "brand" }),
					"（品牌绿）= 引导注意力的\"进行中\"含义。 业务里很少用 brand，仅在\"上传 / 下载\"等需要主动反馈的场景使用。"
				] }),
				code: `<Progress percent={70} tone="neutral" showInfo />
<Progress percent={70} tone="brand" showInfo />`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("div", {
					style: {
						display: "flex",
						flexDirection: "column",
						gap: 12,
						width: 320
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(Progress, {
						percent: 70,
						tone: "neutral",
						showInfo: true
					}), /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(Progress, {
						percent: 70,
						tone: "brand",
						showInfo: true
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(DemoBlock, {
				title: "形状（shape）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)(import_jsx_runtime$12.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("code", { children: "square" }),
					"（直角，设计稿默认）= 紧凑容量条；",
					/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("code", { children: "pill" }),
					"（胶囊圆角）= antd 风格，用于\"任务进度卡片\"等独立场景。"
				] }),
				code: `<Progress percent={55} shape="square" showInfo />
<Progress percent={55} shape="pill" showInfo />`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("div", {
					style: {
						display: "flex",
						flexDirection: "column",
						gap: 12,
						width: 320
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(Progress, {
						percent: 55,
						shape: "square",
						showInfo: true
					}), /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(Progress, {
						percent: 55,
						shape: "pill",
						showInfo: true
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(DemoBlock, {
				title: "状态色（status）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)(import_jsx_runtime$12.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("code", { children: "success" }),
					" / ",
					/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("code", { children: "error" }),
					" 优先级高于 ",
					/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("code", { children: "tone" }),
					"； 百分比文字也跟着染色。",
					/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("code", { children: "showInfo" }),
					" 默认在 success 时渲染 ✓，error 时渲染 ✕， 可通过 ",
					/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("code", { children: "format" }),
					" 覆盖。"
				] }),
				code: `<Progress percent={100} status="success" showInfo />
<Progress percent={64} status="error" showInfo />
<Progress percent={100} status="success" showInfo format={() => '已完成'} />`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("div", {
					style: {
						display: "flex",
						flexDirection: "column",
						gap: 12,
						width: 320
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(Progress, {
							percent: 100,
							status: "success",
							showInfo: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(Progress, {
							percent: 64,
							status: "error",
							showInfo: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(Progress, {
							percent: 100,
							status: "success",
							showInfo: true,
							format: () => "已完成"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(DemoBlock, {
				title: "未知进度（indeterminate）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)(import_jsx_runtime$12.Fragment, { children: [
					"当后端无法返回 percent，或在\"准备 / 入库\"等无明确耗时的阶段时， 传 ",
					/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("code", { children: "indeterminate" }),
					" 走左右滑动动画。",
					/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("code", { children: "prefers-reduced-motion" }),
					"下自动退化为静态半透明占位条。"
				] }),
				code: `<Progress indeterminate />
<Progress indeterminate tone="brand" />`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("div", {
					style: {
						display: "flex",
						flexDirection: "column",
						gap: 12,
						width: 320
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(Progress, { indeterminate: true }), /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(Progress, {
						indeterminate: true,
						tone: "brand"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(DemoBlock, {
				title: "受控（动态 percent）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(import_jsx_runtime$12.Fragment, { children: "由父组件维护 percent，模拟\"5 秒上传\"的播放过程。" }),
				code: `const [percent, setPercent] = useState(0);

useEffect(() => {
  const t = setInterval(() => {
    setPercent(p => (p >= 100 ? 0 : p + 5));
  }, 250);
  return () => clearInterval(t);
}, []);

<Progress percent={percent} tone="brand" showInfo />`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(ControlledProgressDemo, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(DemoBlock, {
				title: "自定义颜色（strokeColor，v0.2.3 自落地）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)(import_jsx_runtime$12.Fragment, { children: [
					"对齐 antd ",
					/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("code", { children: "Progress.strokeColor" }),
					"。可传字符串（单色）或",
					/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("code", { children: "{ from, to }" }),
					"（线性渐变 90deg）。优先级 ",
					/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("strong", { children: "高于" }),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("code", { children: "tone" }),
					" / ",
					/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("code", { children: "status" }),
					"。底层走 inline style 注入，自带覆盖优先级。"
				] }),
				code: `{/* 单色 */}
<Progress percent={62} strokeColor="#7c3aed" showInfo />

{/* 线性渐变 */}
<Progress
  percent={62}
  strokeColor={{ from: '#667eea', to: '#764ba2' }}
  showInfo
/>`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("div", {
					style: {
						display: "flex",
						flexDirection: "column",
						gap: 12,
						width: 320
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(Progress, {
							percent: 62,
							strokeColor: "#7c3aed",
							showInfo: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(Progress, {
							percent: 72,
							strokeColor: {
								from: "#667eea",
								to: "#764ba2"
							},
							showInfo: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(Progress, {
							percent: 88,
							strokeColor: {
								from: "#43e97b",
								to: "#38f9d7"
							},
							showInfo: true
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(ProgressGapsBlock, {})
		]
	});
}
function CapacityBarDemo() {
	return /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 6,
			width: 240
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("div", {
			style: {
				display: "flex",
				justifyContent: "space-between",
				alignItems: "baseline",
				fontSize: 12
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("span", {
				style: { color: "var(--wb-text-strong)" },
				children: "3.8 GB 可用"
			}), /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("span", {
				style: { color: "var(--wb-text-medium)" },
				children: "62%"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(Progress, { percent: 62 })]
	});
}
function ControlledProgressDemo() {
	const [percent, setPercent] = (0, import_react$12.useState)(0);
	(0, import_react$12.useEffect)(() => {
		const t = window.setInterval(() => {
			setPercent((p) => p >= 100 ? 0 : p + 5);
		}, 250);
		return () => window.clearInterval(t);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 12,
			width: 320
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(Progress, {
			percent,
			tone: "brand",
			showInfo: true
		}), /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("div", {
			style: {
				fontSize: 12,
				color: "var(--wb-color-text-tertiary)"
			},
			children: ["父组件状态：", /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("code", { children: ["percent = ", percent] })]
		})]
	});
}
/**
* 能力缺口公示 —— 与 docs/progress-design-gaps.md 同步。
*/
function ProgressGapsBlock() {
	return /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(GapsBlock, {
		gapDocPath: "docs/progress-design-gaps.md",
		blocking: [{
			title: "圆形 / Steps / Dashboard 进度（type=circle/dashboard/steps）",
			description: "antd 三种额外形态，目前只做了 line。设计稿暂无圆形进度，待补稿。"
		}],
		pending: [
			{
				title: "strokeColor 渐变方向（v0.2.3 自落地）",
				description: "渐变默认 90deg（horizontal），与 antd 默认一致；未来如需 to-bottom / radial 等再扩。"
			},
			{
				title: "dark 主题下 tone=\"neutral\" 会\"消失\"",
				description: "复用 --wb-text-strong = rgba(0,0,0,0.96)，dark 主题该 token 仍为黑色。临时建议 dark 下用 tone=\"brand\"。Token 升级方案待与设计师对齐。"
			},
			{
				title: "没有专门的 --wb-progress-track / fill token",
				description: "当前直接复用 --wb-bg-active（轨道）/ --wb-text-strong（填充）。值一致，语义不完全一致，未来可独立出 token。"
			},
			{
				title: "status=\"active\" 闪烁动画",
				description: "antd 选中态有\"光带流过\"动画，目前未做。优先级低，业务侧用 indeterminate 即可达到类似效果。"
			},
			{
				title: "文字位置仅\"右侧 inline\"一种",
				description: "antd 支持 top / right / 隐藏。设计稿\"标题在上、% 在上方右\"由调用方自己拼，组件不内置 top 槽。"
			}
		],
		footer: /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)(import_jsx_runtime$12.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("code", { children: "strokeWidth / trailColor" }),
			" 等 antd 能力暂未暴露—— 走 ",
			/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("code", { children: "className" }),
			" + 局部样式覆盖即可，本次不进类型签名。"
		] })
	});
}
var import_react$12, import_jsx_runtime$12;
var init_ProgressPage = __esmMin((() => {
	import_react$12 = /* @__PURE__ */ __toESM(require_react());
	init_Progress();
	init_DemoBlock();
	init_GapsBlock();
	import_jsx_runtime$12 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/playbook/pages/components/RegionPickerPage.tsx
function RegionPickerPage(props) {
	const [singleVal, setSingleVal] = (0, import_react$11.useState)([]);
	const [multiVal, setMultiVal] = (0, import_react$11.useState)([]);
	const [locale, setLocale] = (0, import_react$11.useState)("zh");
	const dataSource = locale === "en" ? enRegionDataSource : chinaRegionDataSource;
	return /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
		style: {
			minWidth: 240,
			minHeight: 200
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
			style: {
				marginBottom: 12,
				display: "flex",
				gap: 4
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("button", {
					type: "button",
					onClick: () => setLocale("zh"),
					style: {
						padding: "4px 12px",
						fontSize: 12,
						borderRadius: 4,
						border: "1px solid var(--cb-border)",
						background: locale === "zh" ? "var(--cb-button-primary)" : "transparent",
						color: locale === "zh" ? "var(--cb-button-primary-foreground)" : "var(--cb-text-primary)",
						cursor: "pointer"
					},
					children: "中文"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("button", {
					type: "button",
					onClick: () => setLocale("en"),
					style: {
						padding: "4px 12px",
						fontSize: 12,
						borderRadius: 4,
						border: "1px solid var(--cb-border)",
						background: locale === "en" ? "var(--cb-button-primary)" : "transparent",
						color: locale === "en" ? "var(--cb-button-primary-foreground)" : "var(--cb-text-primary)",
						cursor: "pointer"
					},
					children: "English"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("span", {
					style: {
						fontSize: 11,
						color: "var(--cb-text-secondary)",
						alignSelf: "center",
						marginLeft: 8
					},
					children: ["当前：", locale === "zh" ? "中文数据源" : "English data source"]
				})
			]
		}), props.multiple ? /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(RegionPicker, {
			multiple: true,
			size: props.size,
			disabled: props.disabled,
			invalid: props.invalid,
			showSearch: props.showSearch,
			allowClear: props.allowClear,
			placeholder: props.placeholder,
			dataSource,
			value: multiVal,
			onChange: (paths) => {
				console.log("[RegionPicker] onChange (multiple):", JSON.stringify(paths, null, 2));
				setMultiVal(paths);
			}
		}) : /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(RegionPicker, {
			size: props.size,
			disabled: props.disabled,
			invalid: props.invalid,
			showSearch: props.showSearch,
			allowClear: props.allowClear,
			placeholder: props.placeholder,
			dataSource,
			value: singleVal[0] ?? null,
			onChange: (paths) => {
				console.log("[RegionPicker] onChange (single):", JSON.stringify(paths, null, 2));
				setSingleVal(paths);
			}
		})]
	});
}
function RegionPickerVariants() {
	const [locale, setLocale] = (0, import_react$11.useState)("zh");
	const [flat, setFlat] = (0, import_react$11.useState)(null);
	const [multiFlat, setMultiFlat] = (0, import_react$11.useState)([]);
	const [echoPath, setEchoPath] = (0, import_react$11.useState)([]);
	const [echoFlat, setEchoFlat] = (0, import_react$11.useState)(null);
	const dataSource = locale === "en" ? enRegionDataSource : chinaRegionDataSource;
	const [presetSingle, setPresetSingle] = (0, import_react$11.useState)([[
		{
			value: "330000",
			label: "浙江省"
		},
		{
			value: "330100",
			label: "杭州市"
		},
		{
			value: "330106",
			label: "西湖区"
		}
	]]);
	const [presetMulti, setPresetMulti] = (0, import_react$11.useState)([
		[
			{
				value: "440000",
				label: "广东省"
			},
			{
				value: "440300",
				label: "深圳市"
			},
			{
				value: "440305",
				label: "南山区"
			}
		],
		[
			{
				value: "510000",
				label: "四川省"
			},
			{
				value: "510100",
				label: "成都市"
			},
			{
				value: "510107",
				label: "武侯区"
			}
		],
		[{
			value: "320000",
			label: "江苏省"
		}, {
			value: "320100",
			label: "南京市"
		}]
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 16
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
				style: {
					display: "flex",
					gap: 4,
					alignItems: "center"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("button", {
						type: "button",
						onClick: () => setLocale("zh"),
						style: {
							padding: "4px 12px",
							fontSize: 12,
							borderRadius: 4,
							border: "1px solid var(--cb-border)",
							background: locale === "zh" ? "var(--cb-button-primary)" : "transparent",
							color: locale === "zh" ? "var(--cb-button-primary-foreground)" : "var(--cb-text-primary)",
							cursor: "pointer"
						},
						children: "中文"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("button", {
						type: "button",
						onClick: () => setLocale("en"),
						style: {
							padding: "4px 12px",
							fontSize: 12,
							borderRadius: 4,
							border: "1px solid var(--cb-border)",
							background: locale === "en" ? "var(--cb-button-primary)" : "transparent",
							color: locale === "en" ? "var(--cb-button-primary-foreground)" : "var(--cb-text-primary)",
							cursor: "pointer"
						},
						children: "English"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("span", {
						style: {
							fontSize: 11,
							color: "var(--cb-text-secondary)",
							marginLeft: 8
						},
						children: ["当前：", locale === "zh" ? "中文数据源" : "English data source (async loaded)"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(DemoBlock, {
				title: "预选中回显（受控 value + mock 数据）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)(import_jsx_runtime$11.Fragment, { children: [
					"通过 ",
					/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("code", { children: "value" }),
					" 预设已有的 ",
					/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("code", { children: "CascaderPath" }),
					" 实现回显。 单选预选了\"浙江省 / 杭州市 / 西湖区\"，多选预选了\"深圳南山区\"\"成都武侯区\"\"江苏南京市\"。 可以在选择器里重新选择其他值，下方同步显示更新后的 JSON 结构。"
				] }),
				code: `// 单选预选中回显（onChange 统一返回 CascaderPath[]）
const [val, setVal] = useState<CascaderPath[]>([
  [
    { value: '330000', label: '浙江省' },
    { value: '330100', label: '杭州市' },
    { value: '330106', label: '西湖区' },
  ],
]);

<RegionPicker value={val[0] ?? null} onChange={paths => setVal(paths)} />

// 多选预选中回显
const [multi, setMulti] = useState<CascaderPath[]>([
  [
    { value: '440000', label: '广东省' },
    { value: '440300', label: '深圳市' },
    { value: '440305', label: '南山区' },
  ],
  [
    { value: '320000', label: '江苏省' },
    { value: '320100', label: '南京市' },
  ],
]);

<RegionPicker multiple value={multi} onChange={ps => setMulti(ps)} />`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
					style: {
						display: "flex",
						flexDirection: "column",
						gap: 16,
						width: "100%"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
							style: {
								fontSize: 12,
								marginBottom: 6,
								color: "var(--wb-color-text-secondary)"
							},
							children: "单选回显（已选：浙江省 / 杭州市 / 西湖区）"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(RegionPicker, {
							width: 360,
							dataSource,
							value: presetSingle[0] ?? null,
							onChange: (paths) => {
								console.log("[RegionPicker] preset single onChange:", JSON.stringify(paths, null, 2));
								setPresetSingle(paths);
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
							style: {
								marginTop: 8,
								fontSize: 11,
								color: "var(--wb-color-text-tertiary)",
								fontFamily: "monospace"
							},
							children: ["value(adcode) = ", presetSingle[0] ? `[${presetSingle[0].map((n) => `"${n.value}"`).join(" → ")}]` : "[]"]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
							style: {
								fontSize: 12,
								marginBottom: 6,
								color: "var(--wb-color-text-secondary)"
							},
							children: "多选回显（已选：南山区、武侯区、南京市）"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(RegionPicker, {
							multiple: true,
							width: 460,
							dataSource,
							value: presetMulti,
							onChange: (ps) => {
								console.log("[RegionPicker] preset multi onChange:", JSON.stringify(ps, null, 2));
								setPresetMulti(ps);
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
							style: {
								marginTop: 8,
								fontSize: 11,
								color: "var(--wb-color-text-tertiary)",
								fontFamily: "monospace"
							},
							children: [
								"value(adcode) = [",
								presetMulti.map((p) => p.map((n) => n.value).join("/")).join(", "),
								"]"
							]
						})
					] })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)(DemoBlock, {
				title: "点击回显数据",
				description: /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)(import_jsx_runtime$11.Fragment, { children: [
					"选中任意地区后，下方完整展示 ",
					/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("code", { children: "onChange" }),
					" 返回的",
					/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("code", { children: "CascaderPath[]" }),
					"（路径数组）和 ",
					/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("code", { children: "onChangeFlat" }),
					"返回的扁平结构（province/city/district/codes/text）。"
				] }),
				children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(RegionPicker, {
					width: 360,
					dataSource,
					onChange: (paths) => {
						console.log("[RegionPicker] echo onChange:", JSON.stringify(paths, null, 2));
						setEchoPath(paths);
					},
					onChangeFlat: (v) => {
						console.log("[RegionPicker] echo onChangeFlat:", JSON.stringify(v, null, 2));
						setEchoFlat(v);
					}
				}), echoPath.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
					style: {
						marginTop: 12,
						padding: 12,
						borderRadius: 6,
						background: "var(--cb-bg-secondary)",
						fontSize: 12,
						lineHeight: 1.8
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("strong", { children: "展示文本：" }), echoPath[0].map((n) => n.label).join(" / ")] }),
						/* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("strong", { children: "value 序列：" }),
							"[",
							echoPath[0].map((n) => `"${n.value}"`).join(", "),
							"]"
						] }),
						echoFlat && /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
							style: { marginTop: 8 },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("strong", { children: "onChangeFlat：" }),
								echoFlat.text,
								"（codes: [",
								echoFlat.codes.join(", "),
								"]）"
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)(DemoBlock, {
				title: "开箱即用：默认带搜索、可清除、任意层级可选",
				description: /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)(import_jsx_runtime$11.Fragment, { children: [
					"无需准备 dataSource、无需写 placeholder，直接",
					/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("code", { children: "<RegionPicker />" }),
					" 就能用。默认开启搜索（输入\"朝阳\" / \"天河\"快速定位），右侧 × 清除已选。"
				] }),
				children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(RegionPicker, {
					width: 360,
					dataSource,
					onChangeFlat: (v) => {
						console.log("[RegionPicker] basic onChangeFlat:", JSON.stringify(v, null, 2));
						setFlat(v);
					}
				}), /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
					style: {
						marginTop: 8,
						fontSize: 12,
						opacity: .7
					},
					children: ["onChangeFlat 回调：", flat ? `${flat.text}（codes=${JSON.stringify(flat.codes)}）` : "尚未选择"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)(DemoBlock, {
				title: "多选：父子联动 + 扁平回调",
				description: /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)(import_jsx_runtime$11.Fragment, { children: [
					"多选下，选中父节点（如\"天津市\"）= 选择整个区域，数据里只存父级。 展开已选父节点时子节点全显示为选中；取消某个子节点时父级自动拆分为 其余兄弟节点。",
					/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("code", { children: "onChangeFlat" }),
					" 把每条 path 拆成 province/city/district 字段，直接落到表单字段里。"
				] }),
				children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(RegionPicker, {
					multiple: true,
					width: 460,
					dataSource,
					onChangeFlat: (vs) => {
						console.log("[RegionPicker] multi onChangeFlat:", JSON.stringify(vs, null, 2));
						setMultiFlat(vs);
					}
				}), /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
					style: {
						marginTop: 8,
						fontSize: 12,
						opacity: .7
					},
					children: [
						"已选 ",
						multiFlat.length,
						" 项：",
						multiFlat.map((v) => v.text).join("；") || "尚未选择"
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(DemoBlock, {
				title: "禁用 / 失败态 / 三档尺寸",
				description: "与 Select 一致的视觉档位；视觉/交互完全继承通用 Cascader。",
				children: /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
					style: {
						display: "flex",
						flexDirection: "column",
						gap: 12
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(RegionPicker, {
							size: "small",
							placeholder: "small",
							dataSource
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(RegionPicker, {
							size: "medium",
							placeholder: "medium",
							dataSource
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(RegionPicker, {
							size: "large",
							placeholder: "large",
							dataSource
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(RegionPicker, {
							disabled: true,
							placeholder: "disabled",
							dataSource
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(RegionPicker, {
							invalid: true,
							placeholder: "invalid",
							dataSource
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(DemoBlock, {
				title: "与通用 Cascader 的边界",
				description: /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)(import_jsx_runtime$11.Fragment, { children: [
					"RegionPicker 锁定 dataSource = 中国行政区。 若要选别的层级数据（模型分类、组织架构、技能树…）， 请直接用 ",
					/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("code", { children: "Cascader" }),
					" + 自己的 ",
					/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("code", { children: "buildStaticDataSource" }),
					"。 两者共用底层 UI，所以视觉/键盘交互完全一致。"
				] }),
				children: /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
					style: {
						fontSize: 12,
						opacity: .7
					},
					children: "无 demo —— 这是文档级提示。"
				})
			})
		]
	});
}
var import_react$11, import_jsx_runtime$11;
var init_RegionPickerPage = __esmMin((() => {
	import_react$11 = /* @__PURE__ */ __toESM(require_react());
	init_RegionPicker();
	init_DemoBlock();
	import_jsx_runtime$11 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/playbook/pages/components/SegmentedPage.tsx
/** 演示用的几个简单 SVG，避免引入业务 icon */
function GridSvg() {
	return /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 16 16",
		fill: "currentColor",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("rect", {
				x: "1",
				y: "1",
				width: "6",
				height: "6",
				rx: "1"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("rect", {
				x: "9",
				y: "1",
				width: "6",
				height: "6",
				rx: "1"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("rect", {
				x: "1",
				y: "9",
				width: "6",
				height: "6",
				rx: "1"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("rect", {
				x: "9",
				y: "9",
				width: "6",
				height: "6",
				rx: "1"
			})
		]
	});
}
function ListSvg() {
	return /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 16 16",
		fill: "currentColor",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("rect", {
				x: "1",
				y: "2",
				width: "14",
				height: "2",
				rx: "1"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("rect", {
				x: "1",
				y: "7",
				width: "14",
				height: "2",
				rx: "1"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("rect", {
				x: "1",
				y: "12",
				width: "14",
				height: "2",
				rx: "1"
			})
		]
	});
}
function KanbanSvg() {
	return /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 16 16",
		fill: "currentColor",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("rect", {
				x: "1",
				y: "1",
				width: "4",
				height: "14",
				rx: "1"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("rect", {
				x: "6",
				y: "1",
				width: "4",
				height: "10",
				rx: "1"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("rect", {
				x: "11",
				y: "1",
				width: "4",
				height: "6",
				rx: "1"
			})
		]
	});
}
function SegmentedPage(props) {
	const [value, setValue] = (0, import_react$10.useState)("week");
	return /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 12,
			width: "100%"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(Segmented, {
			options: OPTIONS,
			value,
			onChange: setValue,
			size: props.size,
			fullWidth: props.fullWidth,
			disabled: props.disabled,
			"aria-label": "时间范围"
		}), /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
			style: {
				fontSize: "var(--wb-font-caption-size)",
				color: "var(--wb-color-text-tertiary)"
			},
			children: ["value: ", /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("code", { children: value })]
		})]
	});
}
function SegmentedVariants() {
	const opts = [
		{
			value: "grid",
			label: "Grid"
		},
		{
			value: "list",
			label: "List"
		},
		{
			value: "kanban",
			label: "Kanban"
		}
	];
	const [theme, setTheme] = (0, import_react$10.useState)("light");
	return /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 24
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)(VariantSection, {
				title: "对齐设计稿（ardot 1280:91 主题切换）",
				direction: "column",
				gap: 12,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(VariantItem, {
					propsLabel: "浅色 / 深色",
					note: "设计稿场景：仅两段，圆角 8px，选中段白底 + 柔和阴影、字重 Semibold",
					code: `const [theme, setTheme] = useState<'light' | 'dark'>('light');

<Segmented
  options={[
    { value: 'light', label: '浅色' },
    { value: 'dark', label: '深色' },
  ]}
  value={theme}
  onChange={setTheme}
/>`,
					children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(Segmented, {
						options: [{
							value: "light",
							label: "浅色"
						}, {
							value: "dark",
							label: "深色"
						}],
						value: theme,
						onChange: (v) => setTheme(v)
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(VariantItem, {
					propsLabel: "options[i].count",
					note: "每段附带计数 badge（设计稿留位「数字 (8)」），number 自动套括号",
					code: `<Segmented
  options={[
    { value: 'all', label: '全部', count: 12 },
    { value: 'done', label: '已完成', count: 3 },
    { value: 'todo', label: '待处理', count: 9 },
  ]}
  defaultValue="all"
/>`,
					children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(Segmented, {
						options: [
							{
								value: "all",
								label: "全部",
								count: 12
							},
							{
								value: "done",
								label: "已完成",
								count: 3
							},
							{
								value: "todo",
								label: "待处理",
								count: 9
							}
						],
						defaultValue: "all"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)(VariantSection, {
				title: "size",
				direction: "column",
				gap: 12,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(VariantItem, {
					propsLabel: "size=\"medium\"",
					code: `const [view, setView] = useState('grid');

<Segmented
  options={[
    { value: 'grid', label: 'Grid' },
    { value: 'list', label: 'List' },
    { value: 'kanban', label: 'Kanban' },
  ]}
  value={view}
  // 用户点击某段时，onChange 拿到新 value
  onChange={setView}
/>`,
					children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(Segmented, {
						options: opts,
						defaultValue: "grid"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(VariantItem, {
					propsLabel: "size=\"small\"",
					code: `<Segmented
  options={opts}
  defaultValue="grid"
  size="small"
  onChange={value => console.log('selected', value)}
/>`,
					children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(Segmented, {
						options: opts,
						defaultValue: "grid",
						size: "small"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)(VariantSection, {
				title: "状态",
				direction: "column",
				gap: 12,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(VariantItem, {
					propsLabel: "disabled",
					note: "整体禁用",
					block: true,
					code: "<Segmented options={opts} defaultValue=\"list\" disabled />",
					children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(Segmented, {
						options: opts,
						defaultValue: "list",
						disabled: true
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(VariantItem, {
					propsLabel: "options[i].disabled",
					note: "单项禁用（kanban 不可点）",
					block: true,
					code: `<Segmented
  options={[
    { value: 'grid', label: 'Grid' },
    { value: 'list', label: 'List' },
    { value: 'kanban', label: 'Kanban', disabled: true },
  ]}
  defaultValue="grid"
  // 点击 kanban 不会触发 onChange
  onChange={value => setView(value)}
/>`,
					children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(Segmented, {
						options: [
							{
								value: "grid",
								label: "Grid"
							},
							{
								value: "list",
								label: "List"
							},
							{
								value: "kanban",
								label: "Kanban",
								disabled: true
							}
						],
						defaultValue: "grid"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)(VariantSection, {
				title: "options[i].icon（v0.2.3 自落地）",
				direction: "column",
				gap: 12,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(VariantItem, {
					propsLabel: "options[i].icon + label",
					note: "段前图标 + 文字；icon 与 label 间距 4px，颜色 inherit 跟随 active/inactive 自动切换",
					block: true,
					code: `<Segmented
  options={[
    { value: 'grid',  label: 'Grid',   icon: <GridSvg /> },
    { value: 'list',  label: 'List',   icon: <ListSvg /> },
    { value: 'kanban', label: 'Kanban', icon: <KanbanSvg /> },
  ]}
  defaultValue="grid"
  onChange={value => setView(value)}
/>`,
					children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(Segmented, {
						options: [
							{
								value: "grid",
								label: "Grid",
								icon: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(GridSvg, {})
							},
							{
								value: "list",
								label: "List",
								icon: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(ListSvg, {})
							},
							{
								value: "kanban",
								label: "Kanban",
								icon: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(KanbanSvg, {})
							}
						],
						defaultValue: "grid"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(VariantItem, {
					propsLabel: "仅 icon（无 label）",
					note: "label 留空字符串走纯 icon 段，业务里常见于编辑器视图切换",
					block: true,
					code: `<Segmented
  options={[
    { value: 'grid', label: '', icon: <GridSvg /> },
    { value: 'list', label: '', icon: <ListSvg /> },
    { value: 'kanban', label: '', icon: <KanbanSvg /> },
  ]}
  defaultValue="grid"
/>`,
					children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(Segmented, {
						options: [
							{
								value: "grid",
								label: "",
								icon: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(GridSvg, {})
							},
							{
								value: "list",
								label: "",
								icon: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(ListSvg, {})
							},
							{
								value: "kanban",
								label: "",
								icon: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(KanbanSvg, {})
							}
						],
						defaultValue: "grid"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(VariantSection, {
				title: "fullWidth",
				children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(VariantItem, {
					propsLabel: "fullWidth",
					block: true,
					code: `<Segmented
  options={opts}
  defaultValue="list"
  fullWidth
  onChange={value => setView(value)}
/>`,
					children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(Segmented, {
						options: opts,
						defaultValue: "list",
						fullWidth: true
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(SegmentedGapsBlock, {})
		]
	});
}
/**
* 能力缺口公示（精简版） —— 与 antd Segmented 标准能力对照。
*
* 长版见 docs/segmented-design-gaps.md；任何一项落地后，**同时**从两处移除。
*/
function SegmentedGapsBlock() {
	return /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(GapsBlock, {
		gapDocPath: "docs/segmented-design-gaps.md",
		blocking: [
			{
				title: "激活段滑块动画",
				description: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(import_jsx_runtime$10.Fragment, { children: "当前激活段直接换 background 跳变；antd 5.x 在切换时会\"滑过去\"。希望设计师评估是否需要 indicator 动画。" })
			},
			{
				title: "容器底色精确值",
				description: /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)(import_jsx_runtime$10.Fragment, { children: [
					"设计稿（ardot 1280:91）容器底 ",
					/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("code", { children: "#F2F2F2" }),
					"；当前用全局 ",
					/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("code", { children: "--wb-bg-tertiary" }),
					"(#EBEBEB)，差 ~3%。希望设计师确认是改全局 token 还是新增 Segmented 专用 token。"
				] })
			},
			{
				title: "激活段阴影精确值",
				description: /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)(import_jsx_runtime$10.Fragment, { children: [
					"设计稿阴影 ",
					/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("code", { children: "0 1px 4px rgba(0,0,0,0.05)" }),
					"；当前用全局 ",
					/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("code", { children: "--wb-shadow-sm" }),
					"(0 1px 2px rgba(0,0,0,0.08))，更硬一些。希望设计师确认是否要 Segmented 专用阴影 token。"
				] })
			},
			{
				title: "字号 12 / 行高 20 缺 token",
				description: /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)(import_jsx_runtime$10.Fragment, { children: [
					"设计稿走 12/20，但 token 体系只有 caption(12/18) 和 body(14/22)，本组件**写死 12/20**。建议补一档 ",
					/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("code", { children: "--wb-font-control-*" }),
					"，Switch / Chip / Tag / Segmented 共享。"
				] })
			},
			{
				title: "size=small 没有设计稿",
				description: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(import_jsx_runtime$10.Fragment, { children: "当前 small（字号 11/高 20/padding 4/圆角 8px）是业务推断，无设计稿背书。希望设计师明确 small spec，或裁掉只保留 medium。" })
			},
			{
				title: "size: large 档位",
				description: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(import_jsx_runtime$10.Fragment, { children: "仅有 medium / small，业务上设置页主切换器需要 large（24/16 padding / 16 字号）。" })
			}
		],
		pending: [
			{
				title: "options[i].icon 视觉规格（v0.2.3 自落地）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)(import_jsx_runtime$10.Fragment, { children: [
					"icon 默认 14×14，与 label 间距 ",
					/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("code", { children: "--wb-spacing-2" }),
					"(4px)，颜色 ",
					/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("code", { children: "inherit" }),
					" 跟随 active/inactive 自动切换。设计师未明示，按 antd Segmented 默认 + 业务实测兜底。"
				] })
			},
			{
				title: "vertical 形态",
				description: /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)(import_jsx_runtime$10.Fragment, { children: [
					"侧边栏切换场景（每段一行），当前钉死横向。需要 ",
					/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("code", { children: "direction" }),
					" 维度。"
				] })
			},
			{
				title: "单段 loading 态",
				description: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(import_jsx_runtime$10.Fragment, { children: "切换异步操作时显示 spinner，当前不支持。" })
			},
			{
				title: "激活段 hover 反馈",
				description: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(import_jsx_runtime$10.Fragment, { children: "当前激活段 hover 不变；希望设计师确认是否要更深一档背景。" })
			},
			{
				title: "disabled 整体 opacity",
				description: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(import_jsx_runtime$10.Fragment, { children: "整体 0.6 + 单段颜色变 tertiary 双重叠加，灰得过头。希望确认是否只走颜色不走 opacity。" })
			}
		],
		footer: /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)(import_jsx_runtime$10.Fragment, { children: [
			"v0.2 类型签名：",
			/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("code", { children: "options" }),
			"（含 ",
			/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("code", { children: "count" }),
			" 槽位）/ ",
			/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("code", { children: "value" }),
			" / ",
			/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("code", { children: "defaultValue" }),
			" / ",
			/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("code", { children: "onChange" }),
			" /",
			/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("code", { children: " size" }),
			"（medium / small）/ ",
			/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("code", { children: "fullWidth" }),
			" / ",
			/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("code", { children: "disabled" }),
			"。 底层用 ARIA Radio Group 模式 + 完整方向键 / Home / End 导航。"
		] })
	});
}
var import_react$10, import_jsx_runtime$10, OPTIONS;
var init_SegmentedPage = __esmMin((() => {
	import_react$10 = /* @__PURE__ */ __toESM(require_react());
	init_Segmented();
	init_GapsBlock();
	init_VariantSection();
	import_jsx_runtime$10 = require_jsx_runtime();
	OPTIONS = [
		{
			value: "day",
			label: "日"
		},
		{
			value: "week",
			label: "周"
		},
		{
			value: "month",
			label: "月"
		},
		{
			value: "year",
			label: "年",
			disabled: true
		}
	];
}));
//#endregion
//#region ../../packages/agent-ui/src/playbook/pages/components/SelectPage.tsx
function SelectPage(props) {
	const [val, setVal] = (0, import_react$9.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
		style: {
			minWidth: 220,
			minHeight: 200
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(Select, {
			size: props.size,
			disabled: props.disabled,
			invalid: props.invalid,
			fullWidth: props.fullWidth,
			placeholder: props.placeholder || "Pick a fruit",
			options: FRUITS,
			value: val,
			onChange: (v) => setVal(v)
		})
	});
}
function SelectVariants() {
	return /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 16
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(DemoBlock, {
				title: "基础用法",
				description: /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)(import_jsx_runtime$9.Fragment, { children: [
					"最简单的用法。传入 ",
					/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("code", { children: "options" }),
					" 数组，组件内部维护选中状态（非受控）。",
					/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("code", { children: "option.disabled" }),
					" 可标记单个候选为禁用（如下方\"榴莲\"）。"
				] }),
				code: `const FRUITS = [
  { value: 'apple', label: '苹果' },
  { value: 'banana', label: '香蕉' },
  { value: 'cherry', label: '樱桃' },
  { value: 'durian', label: '榴莲（断货）', disabled: true },
];

<Select options={FRUITS} placeholder="请选择水果" />`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(Select, {
					options: FRUITS,
					placeholder: "请选择水果"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(DemoBlock, {
				title: "三档尺寸（size）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)(import_jsx_runtime$9.Fragment, { children: [
					"与 Input 共用同一套高度 token：",
					/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("code", { children: "small" }),
					"（24px）/ ",
					/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("code", { children: "medium" }),
					"（32px，默认）/ ",
					/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("code", { children: "large" }),
					"（40px）。"
				] }),
				code: `<Select size="small" options={FRUITS} placeholder="size=small" />
<Select options={FRUITS} placeholder="size=medium" />
<Select size="large" options={FRUITS} placeholder="size=large" />`,
				children: ALL_SIZES$2.map((s) => /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(Select, {
					size: s,
					options: FRUITS,
					placeholder: `size=${s}`
				}, s))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(DemoBlock, {
				title: "受控（value + onChange）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)(import_jsx_runtime$9.Fragment, { children: [
					"传 ",
					/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("code", { children: "value" }),
					" 时进入受控模式，由父组件维护选中状态。 清空时 ",
					/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("code", { children: "onChange" }),
					" 收到 ",
					/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("code", { children: "('', null)" }),
					"。"
				] }),
				code: `const [value, setValue] = useState('apple');

<Select
  options={FRUITS}
  value={value}
  onChange={v => setValue(v)}
  allowClear
  placeholder="请选择"
/>`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(ControlledSelectExample, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(DemoBlock, {
				title: "可清除（allowClear）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)(import_jsx_runtime$9.Fragment, { children: [
					"传 ",
					/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("code", { children: "allowClear" }),
					" 后，选中时 hover 触发器，右侧 ▾ 箭头会变成 × 清除按钮，点击清空选择。对齐 antd ",
					/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("code", { children: "Select.allowClear" }),
					"。"
				] }),
				code: `<Select
  allowClear
  options={FRUITS}
  defaultValue="banana"
  placeholder="hover 试试 ×"
/>`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(Select, {
					allowClear: true,
					options: FRUITS,
					defaultValue: "banana",
					placeholder: "hover 试试 ×"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(DemoBlock, {
				title: "撑满宽度（fullWidth）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)(import_jsx_runtime$9.Fragment, { children: [
					"传 ",
					/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("code", { children: "fullWidth" }),
					" 后触发器宽度 100%，常用于表单内单列布局。"
				] }),
				code: "<Select fullWidth options={FRUITS} placeholder=\"宽度撑满父容器\" />",
				children: /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
					style: { width: 360 },
					children: /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(Select, {
						fullWidth: true,
						options: FRUITS,
						placeholder: "宽度撑满父容器"
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)(DemoBlock, {
				title: "禁用与失败态（disabled / invalid）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)(import_jsx_runtime$9.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("code", { children: "disabled" }),
					" 整体禁用（透明度 0.6 + cursor not-allowed）；",
					/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("code", { children: "invalid" }),
					" 边框变红色，搭配表单错误提示使用。"
				] }),
				code: `<Select disabled options={FRUITS} placeholder="disabled" />
<Select invalid options={FRUITS} placeholder="校验失败" />`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(Select, {
					disabled: true,
					options: FRUITS,
					placeholder: "disabled"
				}), /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(Select, {
					invalid: true,
					options: FRUITS,
					placeholder: "校验失败"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(DemoBlock, {
				title: "多选（mode=multiple，v0.2.3 自落地）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)(import_jsx_runtime$9.Fragment, { children: [
					"对齐 antd ",
					/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("code", { children: "Select.mode=multiple" }),
					"。触发器内显示已选 Tag 列表， 每个 Tag 自带 × 可单独移除；浮层不在选中后关闭，可继续多选。 受控 ",
					/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("code", { children: "value" }),
					" 类型为 ",
					/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("code", { children: "string[]" }),
					"。",
					/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("br", {}),
					"额外提供 ",
					/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("code", { children: "maxCount" }),
					" 限制最多可选数量；超过后剩余选项自动 disabled。"
				] }),
				code: `{/* 非受控多选 */}
<Select
  mode="multiple"
  options={FRUITS}
  defaultValue={['apple', 'banana']}
  placeholder="请选择多个水果"
/>

{/* 受控多选 + maxCount */}
const [values, setValues] = useState<string[]>([]);

<Select
  mode="multiple"
  options={FRUITS}
  value={values}
  onChange={(next) => setValues(next)}
  maxCount={2}
  allowClear
/>`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(MultipleSelectExample, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(DemoBlock, {
				title: "可搜索（showSearch，v0.2.3 自落地）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)(import_jsx_runtime$9.Fragment, { children: [
					"对齐 antd ",
					/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("code", { children: "Select.showSearch" }),
					"。启用后浮层顶部出现搜索框， 按 ",
					/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("code", { children: "label" }),
					" / ",
					/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("code", { children: "value" }),
					" 子串匹配过滤候选。 多选 + 可搜索是「标签筛选 / 多账号选择」最常见的组合。"
				] }),
				code: `{/* 单选 + 搜索 */}
<Select showSearch options={CITIES} placeholder="搜城市" />

{/* 多选 + 搜索 */}
<Select
  mode="multiple"
  showSearch
  options={CITIES}
  placeholder="搜并选多个"
/>`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(SearchableSelectExample, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(SelectGapsBlock, {})
		]
	});
}
function ControlledSelectExample() {
	const [value, setValue] = (0, import_react$9.useState)("apple");
	return /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 12,
			alignItems: "flex-start"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(Select, {
				options: FRUITS,
				value,
				onChange: (v) => setValue(v),
				allowClear: true,
				placeholder: "请选择"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
				style: {
					fontSize: 12,
					color: "var(--wb-color-text-tertiary)"
				},
				children: ["当前值：", /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("code", { children: value || "(empty)" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("button", {
				type: "button",
				onClick: () => setValue("cherry"),
				style: {
					padding: "4px 12px",
					border: "1px solid var(--wb-border-default)",
					borderRadius: 6,
					background: "var(--wb-bg-secondary)",
					color: "var(--wb-color-text-secondary)",
					cursor: "pointer",
					fontSize: 12
				},
				children: "外部设置为「樱桃」"
			})
		]
	});
}
/** 多选 demo：非受控 + 受控 + maxCount */
function MultipleSelectExample() {
	const [values, setValues] = (0, import_react$9.useState)([]);
	return /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 12,
			alignItems: "flex-start",
			width: 360
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
			style: {
				display: "flex",
				flexDirection: "column",
				gap: 4,
				width: "100%"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
				style: {
					fontSize: 12,
					color: "var(--wb-color-text-tertiary)"
				},
				children: "非受控（默认选中两项）"
			}), /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(Select, {
				mode: "multiple",
				options: FRUITS,
				defaultValue: ["apple", "banana"],
				placeholder: "请选择多个水果"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
			style: {
				display: "flex",
				flexDirection: "column",
				gap: 4,
				width: "100%"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
				style: {
					fontSize: 12,
					color: "var(--wb-color-text-tertiary)"
				},
				children: ["受控 + maxCount=2，当前 ", /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("code", { children: JSON.stringify(values) })]
			}), /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(Select, {
				mode: "multiple",
				options: FRUITS,
				value: values,
				onChange: (next) => setValues(next),
				maxCount: 2,
				allowClear: true,
				placeholder: "最多选 2 个"
			})]
		})]
	});
}
/** 搜索 demo：单选 + 多选 都加 showSearch */
function SearchableSelectExample() {
	return /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 12,
			alignItems: "flex-start",
			width: 360
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
			style: {
				display: "flex",
				flexDirection: "column",
				gap: 4,
				width: "100%"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
				style: {
					fontSize: 12,
					color: "var(--wb-color-text-tertiary)"
				},
				children: "单选 + 搜索"
			}), /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(Select, {
				showSearch: true,
				options: CITIES,
				placeholder: "搜城市"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
			style: {
				display: "flex",
				flexDirection: "column",
				gap: 4,
				width: "100%"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
				style: {
					fontSize: 12,
					color: "var(--wb-color-text-tertiary)"
				},
				children: "多选 + 搜索"
			}), /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(Select, {
				mode: "multiple",
				showSearch: true,
				options: CITIES,
				placeholder: "搜并选多个"
			})]
		})]
	});
}
/**
* 能力缺口公示 —— 与 docs/select-design-gaps.md 保持一致。
* 任一项落地后，把它从两份文档中同时移除。
*/
function SelectGapsBlock() {
	return /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(GapsBlock, {
		gapDocPath: "docs/select-design-gaps.md",
		blocking: [{
			title: "加载中态（loading）",
			description: "异步拉取候选时浮层内显示 spinner，目前会渲染空列表。"
		}, {
			title: "空态占位（notFoundContent）",
			description: "候选为空时浮层显示\"暂无数据\"占位文案，待设计师补图。"
		}],
		pending: [
			{
				title: "多选 Tag 视觉规格（v0.2.3 自落地）",
				description: "Tag 高 22px、--wb-radius-sm、--wb-bg-tertiary 底；× 按钮 14×14。按 antd 默认 + 业务实测兜底，待设计师补 token。"
			},
			{
				title: "搜索框视觉规格（v0.2.3 自落地）",
				description: "搜索框高 28px、--wb-bg-secondary 底，置于浮层顶部。设计稿未画，按 antd 默认 + 业务实测兜底。"
			},
			{
				title: "showSearch 过滤算法",
				description: "内置 label/value 子串小写匹配；尚未暴露 filterOption 自定义过滤函数，业务侧若需要拼音 / 高亮命中再扩。"
			},
			{
				title: "触发器最小宽度 120px",
				description: "从 antd 兜底，设计师未明确表单内默认宽度。"
			},
			{
				title: "清除按钮 hover 底色",
				description: "当前 rgba(0,0,0,0.08) 是兜底，建议抽成 ghost button 通用 token。"
			},
			{
				title: "清除按钮尺寸 16×16",
				description: "与 Tag 关闭（14×14）有 2px 差异，待设计师确认是否统一。"
			},
			{
				title: "选中态视觉信号叠加",
				description: "加粗 + 蓝色 + ✓ 三个信号同时出现，可能略重，待设计师确认是否简化。"
			}
		],
		footer: /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)(import_jsx_runtime$9.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("code", { children: "mode=\"tags\"" }),
			" / ",
			/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("code", { children: "bordered=false" }),
			" / ",
			/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("code", { children: "labelInValue" }),
			"与设计系统语义冲突或归属其他组件，本次明确不做（详见 GAP 长版第 3 段）。"
		] })
	});
}
var import_react$9, import_jsx_runtime$9, FRUITS, CITIES, ALL_SIZES$2;
var init_SelectPage = __esmMin((() => {
	import_react$9 = /* @__PURE__ */ __toESM(require_react());
	init_Select();
	init_DemoBlock();
	init_GapsBlock();
	import_jsx_runtime$9 = require_jsx_runtime();
	FRUITS = [
		{
			value: "apple",
			label: "苹果"
		},
		{
			value: "banana",
			label: "香蕉"
		},
		{
			value: "cherry",
			label: "樱桃"
		},
		{
			value: "durian",
			label: "榴莲（断货）",
			disabled: true
		}
	];
	CITIES = [
		{
			value: "beijing",
			label: "北京 Beijing"
		},
		{
			value: "shanghai",
			label: "上海 Shanghai"
		},
		{
			value: "guangzhou",
			label: "广州 Guangzhou"
		},
		{
			value: "shenzhen",
			label: "深圳 Shenzhen"
		},
		{
			value: "hangzhou",
			label: "杭州 Hangzhou"
		},
		{
			value: "chengdu",
			label: "成都 Chengdu"
		},
		{
			value: "wuhan",
			label: "武汉 Wuhan"
		},
		{
			value: "nanjing",
			label: "南京 Nanjing"
		},
		{
			value: "xian",
			label: "西安 Xi’an"
		},
		{
			value: "tianjin",
			label: "天津 Tianjin"
		}
	];
	ALL_SIZES$2 = [
		"small",
		"medium",
		"large"
	];
}));
//#endregion
//#region ../../packages/agent-ui/src/playbook/pages/components/SkillRecommendBarPage.tsx
function takeCandidates(count, installingFirst) {
	return MOCK_CANDIDATES.slice(0, count).map((c, i) => ({
		...c,
		installing: installingFirst && i === 0 ? true : c.installing
	}));
}
function SkillRecommendBarPage(props) {
	const [adoptedLog, setAdoptedLog] = (0, import_react$8.useState)([]);
	const [dismissed, setDismissed] = (0, import_react$8.useState)(false);
	if (dismissed) return /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("div", {
		style: {
			color: "var(--wb-text-tertiary)",
			fontSize: 12
		},
		children: [
			"已 dismiss（实际场景下父级状态机会切到 `dismissed`，bar 不再渲染）。",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("button", {
				type: "button",
				onClick: () => setDismissed(false),
				children: "重置"
			})
		]
	});
	const candidates = takeCandidates(props.candidateCount, props.installingFirst);
	return /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 12
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(SkillRecommendBar, {
			isLoading: props.isLoading,
			candidates,
			onAdopt: (id) => setAdoptedLog((prev) => [...prev, id]),
			onDismiss: () => setDismissed(true)
		}), /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
			style: {
				fontSize: 12,
				color: "var(--wb-text-tertiary)"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("div", { children: ["采纳事件日志：", adoptedLog.length === 0 ? "（暂无）" : adoptedLog.join(", ")] })
		})]
	});
}
function SkillRecommendBarVariants() {
	return /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 16
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(DemoBlock, {
				title: "① loading",
				description: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(import_jsx_runtime$8.Fragment, { children: "双 chip 骨架 shimmer。控时由父级 hook 管（min 600ms / max 2500ms）。" }),
				code: "<SkillRecommendBar isLoading={true} candidates={[]} onAdopt={...} onDismiss={...} />",
				children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(SkillRecommendBar, {
					isLoading: true,
					candidates: [],
					onAdopt: () => {},
					onDismiss: () => {}
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(DemoBlock, {
				title: "② 1 候选",
				description: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(import_jsx_runtime$8.Fragment, { children: "仅 1 个推荐 chip。" }),
				code: "candidates = [{ id: \"bug-fix\", name: \"Bug Fix\", description: \"...\" }]",
				children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(SkillRecommendBar, {
					isLoading: false,
					candidates: takeCandidates(1, false),
					onAdopt: () => {},
					onDismiss: () => {}
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(DemoBlock, {
				title: "③ 2 候选（PRD 上限）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(import_jsx_runtime$8.Fragment, { children: "双 chip 平铺。" }),
				code: "candidates.length === 2",
				children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(SkillRecommendBar, {
					isLoading: false,
					candidates: takeCandidates(2, false),
					onAdopt: () => {},
					onDismiss: () => {}
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(DemoBlock, {
				title: "④ 采纳进行中（installing 状态）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(import_jsx_runtime$8.Fragment, { children: "第 1 个 chip 已被采纳并触发静默 install；视觉上以降透明度 + spinner 反馈，禁止重复点击。" }),
				code: "candidates[0].installing === true",
				children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(SkillRecommendBar, {
					isLoading: false,
					candidates: takeCandidates(2, true),
					onAdopt: () => {},
					onDismiss: () => {}
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(DemoBlock, {
				title: "⑤ 空结果态（自动触发完成 + RPC 返回 0 候选）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(import_jsx_runtime$8.Fragment, { children: "左侧渲染搜索图标 + 「暂无技能推荐」,bar 仍保留(右侧可有 refresh / ✕)。 与「容器 return null」分支区分:这里是「真触发了一次,但确实没匹配到」,而不是「调度器没决定要触发」。" }),
				code: "<SkillRecommendBar isLoading={false} candidates={[]} isEmptyResult onAdopt={...} onDismiss={...} />",
				children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(SkillRecommendBar, {
					isLoading: false,
					candidates: [],
					isEmptyResult: true,
					onAdopt: () => {},
					onDismiss: () => {}
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(DemoBlock, {
				title: "⑥ 容器 return null（错误降级 / 空 catalog / 还没触发）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)(import_jsx_runtime$8.Fragment, { children: [
					"- 错误降级：所有错误（auth_unavailable / http_error / parse_error / timeout / unknown） 都归一化为静默，父级 hook 不挂 bar；",
					/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("br", {}),
					"- 空 catalog：marketplace 返回空集 / model 给的 ID 不在 catalog 中 → 父级也不挂 bar；",
					/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("br", {}),
					"- 防御性：strict 写 ",
					"<SkillRecommendBar isLoading={false} candidates={[]} />",
					"（不带 isEmptyResult / placeholderText）, 本组件返回 null（避免空 bar 闪烁）。"
				] }),
				code: "<SkillRecommendBar isLoading={false} candidates={[]} ... /> // → null",
				children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
					style: {
						padding: 12,
						border: "1px dashed var(--wb-border-weak, rgba(0,0,0,0.15))",
						borderRadius: 8,
						fontSize: 12,
						color: "var(--wb-text-tertiary)"
					},
					children: "（此处不渲染任何元素 —— 容器 return null）"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(DemoBlock, {
				title: "附：单独的骨架与 chip",
				description: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(import_jsx_runtime$8.Fragment, { children: "分别预览 atomic 部件。" }),
				children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("div", {
					style: {
						display: "flex",
						flexDirection: "column",
						gap: 8
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(SkillRecommendLoading, { count: 2 }), /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("div", {
						style: {
							display: "flex",
							gap: 4
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(SkillCandidateChip, {
							id: "bug-fix",
							name: "Bug Fix",
							description: "帮助快速定位与修复代码中的常见 bug",
							onAdopt: () => {}
						}), /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(SkillCandidateChip, {
							id: "code-review",
							name: "Code Review",
							description: "对当前代码片段进行风格 / 设计 / 性能多维度审查",
							installing: true,
							onAdopt: () => {}
						})]
					})]
				})
			})
		]
	});
}
var import_react$8, import_jsx_runtime$8, MOCK_CANDIDATES;
var init_SkillRecommendBarPage = __esmMin((() => {
	import_react$8 = /* @__PURE__ */ __toESM(require_react());
	init_skill_recommend();
	init_DemoBlock();
	import_jsx_runtime$8 = require_jsx_runtime();
	MOCK_CANDIDATES = [{
		id: "bug-fix",
		name: "Bug Fix",
		description: "帮助快速定位与修复代码中的常见 bug。"
	}, {
		id: "code-review",
		name: "Code Review",
		description: "对当前代码片段进行风格 / 设计 / 性能多维度审查。"
	}];
}));
//#endregion
//#region ../../packages/agent-ui/src/playbook/pages/components/SwitchPage.tsx
function SwitchPage(props) {
	const [checked, setChecked] = (0, import_react$7.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(Switch, {
		size: props.size,
		disabled: props.disabled,
		label: props.label || void 0,
		checked,
		onChange: (e) => setChecked(e.target.checked)
	});
}
function SwitchVariants() {
	return /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 16
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)(DemoBlock, {
				title: "基础用法",
				description: /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)(import_jsx_runtime$7.Fragment, { children: [
					"最简单的用法。不传 ",
					/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("code", { children: "checked" }),
					" 时，组件内部维护状态（非受控）； 可通过 ",
					/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("code", { children: "defaultChecked" }),
					" 设置初始值。"
				] }),
				code: `{/* 非受控，组件内部维护开关状态 */}
<Switch onChange={e => console.log('checked =', e.target.checked)} />

{/* 通过 defaultChecked 设置初始值 */}
<Switch defaultChecked onChange={e => console.log('checked =', e.target.checked)} />`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(Switch, {}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(Switch, { defaultChecked: true })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(DemoBlock, {
				title: "两档尺寸（size）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)(import_jsx_runtime$7.Fragment, { children: [
					"提供两档尺寸：",
					/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("code", { children: "small" }),
					"（24×14，表格行内用）/ ",
					/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("code", { children: "medium" }),
					"（32×18，默认）。"
				] }),
				code: `<Switch
  size="small"
  defaultChecked
  label="small"
  onChange={e => setEnabled(e.target.checked)}
/>
<Switch
  size="medium"
  defaultChecked
  label="medium"
  onChange={e => setEnabled(e.target.checked)}
/>`,
				children: ALL_SIZES$1.map((s) => /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(Switch, {
					size: s,
					defaultChecked: true,
					label: s
				}, s))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(DemoBlock, {
				title: "受控（checked + onChange）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)(import_jsx_runtime$7.Fragment, { children: [
					"传 ",
					/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("code", { children: "checked" }),
					" 时进入受控模式，由父组件维护状态。 常用于「保存到服务器后才视为切换成功」的场景：先 setLoading， 请求成功后再 setChecked。"
				] }),
				code: `const [checked, setChecked] = useState(false);

<Switch
  checked={checked}
  onChange={e => setChecked(e.target.checked)}
  label={checked ? '已开启' : '已关闭'}
/>`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(ControlledSwitchExample, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)(DemoBlock, {
				title: "带标签（label）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)(import_jsx_runtime$7.Fragment, { children: [
					"传 ",
					/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("code", { children: "label" }),
					" 时右侧显示文字，点击文字也会切换状态（基于原生 label 关联）。"
				] }),
				code: `<Switch
  label="启用通知"
  onChange={e => updateUserPref({ notify: e.target.checked })}
/>
<Switch
  defaultChecked
  label="自动保存"
  onChange={e => updateUserPref({ autoSave: e.target.checked })}
/>`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(Switch, { label: "启用通知" }), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(Switch, {
					defaultChecked: true,
					label: "自动保存"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(DemoBlock, {
				title: "加载中（loading）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)(import_jsx_runtime$7.Fragment, { children: [
					"传 ",
					/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("code", { children: "loading" }),
					" 后滑块变成旋转 spinner，整体 disabled、cursor 变 wait。 常用于\"保存到服务器期间\"的反馈。对齐 antd ",
					/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("code", { children: "Switch.loading" }),
					"。"
				] }),
				code: `const [checked, setChecked] = useState(false);
const [loading, setLoading] = useState(false);

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const next = e.target.checked;
  setLoading(true);
  // 模拟接口耗时 1.5s
  window.setTimeout(() => {
    setChecked(next);
    setLoading(false);
  }, 1500);
};

<Switch
  checked={checked}
  loading={loading}
  onChange={handleChange}
  label={loading ? '保存中…' : checked ? '已开启' : '点击切换'}
/>`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(LoadingSwitchExample, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)(DemoBlock, {
				title: "禁用态（disabled）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)(import_jsx_runtime$7.Fragment, { children: [
					"传 ",
					/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("code", { children: "disabled" }),
					" 后整体降透明度（50%），cursor 变 not-allowed， 不响应点击。开 / 关两态都会保持视觉。"
				] }),
				code: `<Switch disabled label="disabled + off" />
<Switch disabled defaultChecked label="disabled + on" />`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(Switch, {
					disabled: true,
					label: "disabled + off"
				}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(Switch, {
					disabled: true,
					defaultChecked: true,
					label: "disabled + on"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(SwitchGapsBlock, {})
		]
	});
}
function ControlledSwitchExample() {
	const [checked, setChecked] = (0, import_react$7.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 12,
			alignItems: "flex-start"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(Switch, {
			checked,
			onChange: (e) => setChecked(e.target.checked),
			label: checked ? "已开启" : "已关闭"
		}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
			style: {
				fontSize: 12,
				color: "var(--wb-color-text-tertiary)"
			},
			children: ["父组件状态：", /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("code", { children: String(checked) })]
		})]
	});
}
function LoadingSwitchExample() {
	const [checked, setChecked] = (0, import_react$7.useState)(false);
	const [loading, setLoading] = (0, import_react$7.useState)(false);
	const handleChange = (e) => {
		const next = e.target.checked;
		setLoading(true);
		window.setTimeout(() => {
			setChecked(next);
			setLoading(false);
		}, 1500);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 12,
			alignItems: "flex-start"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(Switch, {
			checked,
			loading,
			onChange: handleChange,
			label: loading ? "保存中…" : checked ? "已开启" : "点击切换"
		}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
			style: {
				fontSize: 12,
				color: "var(--wb-color-text-tertiary)"
			},
			children: "点击后等待 1.5 秒，模拟接口调用过程。"
		})]
	});
}
/**
* 能力缺口公示 —— 与 docs/switch-design-gaps.md 保持一致。
* 任一项落地后，把它从两份文档中同时移除。
*/
function SwitchGapsBlock() {
	return /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(GapsBlock, {
		gapDocPath: "docs/switch-design-gaps.md",
		blocking: [
			{
				title: "开关内文字（checkedChildren / unCheckedChildren）",
				description: "antd 支持在 track 内显示「开/关」「ON/OFF」文字，目前未做，待设计师评审。"
			},
			{
				title: "大尺寸（large）",
				description: "移动端常用 44×24 大开关方便点击，目前最大只到 medium（32×18）。"
			},
			{
				title: "危险开关配色",
				description: "\"开启高耗操作\"等危险操作场景需紫红色 track，目前只有品牌主色。"
			}
		],
		pending: [
			{
				title: "track 尺寸 32×18 / 24×14",
				description: "设计稿目测 + antd 兜底，未拿到设计师 --wb-switch-track-* token。"
			},
			{
				title: "滑块过渡时长 150ms",
				description: "直接复用 motion-duration-fast，开关切换时 200~250ms 更流畅。"
			},
			{
				title: "loading spinner 颜色",
				description: "直接用 thumb 的白色描边，未选中状态下灰底白 spinner 对比度可能不够。"
			},
			{
				title: "loading 透明度 0.7",
				description: "从 antd 兜底，未拿到设计师明确数值。"
			},
			{
				title: "disabled 透明度 0.5",
				description: "与 Tag 一致、与 Select（0.6）不一致，希望全局统一 token。"
			}
		],
		footer: /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)(import_jsx_runtime$7.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("code", { children: "三态开关 / autoFocus / inheritDisabled" }), " 等 antd 能力归属于其他组件 或 HTML 标准透传，本次明确不做（详见 GAP 长版第 3 段）。"] })
	});
}
var import_react$7, import_jsx_runtime$7, ALL_SIZES$1;
var init_SwitchPage = __esmMin((() => {
	import_react$7 = /* @__PURE__ */ __toESM(require_react());
	init_Switch();
	init_DemoBlock();
	init_GapsBlock();
	import_jsx_runtime$7 = require_jsx_runtime();
	ALL_SIZES$1 = ["small", "medium"];
}));
//#endregion
//#region ../../packages/agent-ui/src/playbook/pages/components/TablePage.tsx
function TablePage(props) {
	const [sort, setSort] = (0, import_react$6.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Table, {
		columns: [
			{
				key: "id",
				title: "ID",
				dataIndex: "id",
				width: 64,
				align: "right",
				sortable: true
			},
			{
				key: "name",
				title: "Name",
				dataIndex: "name",
				sortable: true
			},
			{
				key: "role",
				title: "Role",
				dataIndex: "role"
			},
			{
				key: "status",
				title: "Status",
				render: (row) => /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Tag, {
					tone: STATUS_TONE[row.status],
					dot: true,
					size: "small",
					children: row.status
				})
			},
			{
				key: "createdAt",
				title: "Created",
				dataIndex: "createdAt",
				sortable: true,
				width: 140
			}
		],
		dataSource: (0, import_react$6.useMemo)(() => {
			if (!sort) return USERS;
			const cmp = (a, b) => {
				const av = a[sort.key];
				const bv = b[sort.key];
				if (typeof av === "number" && typeof bv === "number") return av - bv;
				return String(av ?? "").localeCompare(String(bv ?? ""));
			};
			const arr = [...USERS].sort(cmp);
			return sort.direction === "desc" ? arr.reverse() : arr;
		}, [sort]),
		rowKey: "id",
		sort,
		onSortChange: setSort,
		size: props.size,
		striped: props.striped,
		hover: props.hover,
		bordered: props.bordered,
		loading: props.loading
	});
}
function TableVariants() {
	return /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 16
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(DemoBlock, {
				title: "基础用法",
				description: /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)(import_jsx_runtime$6.Fragment, { children: [
					"通过 ",
					/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("code", { children: "columns" }),
					"（列定义）+ ",
					/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("code", { children: "dataSource" }),
					"（行数据）配置式渲染表格。 每列可指定 ",
					/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("code", { children: "width" }),
					"/",
					/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("code", { children: "align" }),
					"/自定义 ",
					/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("code", { children: "render" }),
					"。"
				] }),
				code: `const columns: TableColumn<User>[] = [
  { key: 'id', title: 'ID', dataIndex: 'id', width: 64, align: 'right' },
  { key: 'name', title: 'Name', dataIndex: 'name' },
  { key: 'role', title: 'Role', dataIndex: 'role' },
  // render(row) 拿到整行数据，可在列里挂任意 ReactNode（含按钮 / Tag / 图标）
  {
    key: 'actions',
    title: 'Actions',
    width: 120,
    render: row => (
      <Button size="small" onClick={() => handleEdit(row.id)}>
        编辑
      </Button>
    ),
  },
];

<Table<User> columns={columns} dataSource={users} rowKey="id" bordered />`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Table, {
					columns: BASE_COLS,
					dataSource: USERS,
					rowKey: "id",
					bordered: true
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)(DemoBlock, {
				title: "两档密度（size）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)(import_jsx_runtime$6.Fragment, { children: [
					"提供两档行高：",
					/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("code", { children: "compact" }),
					"（32px，紧凑场景）/ ",
					/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("code", { children: "default" }),
					"（40px，默认）。"
				] }),
				code: `<Table<User> columns={cols} dataSource={users} rowKey="id" bordered />
<Table<User> columns={cols} dataSource={users} rowKey="id" size="compact" bordered />`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Table, {
					columns: BASE_COLS,
					dataSource: USERS,
					rowKey: "id",
					bordered: true
				}), /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Table, {
					columns: BASE_COLS,
					dataSource: USERS,
					rowKey: "id",
					size: "compact",
					bordered: true
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)(DemoBlock, {
				title: "视觉装饰（striped / hover / bordered）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)(import_jsx_runtime$6.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("code", { children: "striped" }),
					" 斑马纹；",
					/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("code", { children: "hover" }),
					" 行悬停高亮（默认开启）；",
					/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("code", { children: "bordered" }),
					" 显示外边框（默认无）。"
				] }),
				code: `<Table<User> columns={cols} dataSource={users} rowKey="id" striped bordered />
<Table<User> columns={cols} dataSource={users} rowKey="id" />`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Table, {
					columns: BASE_COLS,
					dataSource: USERS,
					rowKey: "id",
					striped: true,
					bordered: true
				}), /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Table, {
					columns: BASE_COLS,
					dataSource: USERS,
					rowKey: "id"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(DemoBlock, {
				title: "可排序列（sortable）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)(import_jsx_runtime$6.Fragment, { children: [
					"在 ",
					/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("code", { children: "columns[i]" }),
					" 上设置 ",
					/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("code", { children: "sortable: true" }),
					"，表头会变成可点击按钮， 切换 asc → desc → 无；通过 ",
					/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("code", { children: "defaultSort" }),
					" 设置初始方向。"
				] }),
				code: `const [sort, setSort] = useState<TableSortState | null>({ key: 'id', direction: 'asc' });

const cols: TableColumn<User>[] = [
  { key: 'id', title: 'ID', dataIndex: 'id', width: 64, align: 'right', sortable: true },
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'role', title: 'Role', dataIndex: 'role' },
];

<Table<User>
  columns={cols}
  dataSource={sortedRows}
  rowKey="id"
  sort={sort}
  onSortChange={setSort}
  bordered
/>`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(SortableExample, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(DemoBlock, {
				title: "行点击（onRowClick）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)(import_jsx_runtime$6.Fragment, { children: [
					"传入 ",
					/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("code", { children: "onRowClick" }),
					" 后，整行变 cursor: pointer，点击触发回调。 常用于\"点击行进入详情页\"。"
				] }),
				code: `const [clicked, setClicked] = useState<string | null>(null);

<Table<User>
  columns={cols}
  dataSource={users}
  rowKey="id"
  bordered
  onRowClick={row => setClicked(\`\${row.name} (\${row.role})\`)}
/>`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(RowClickExample, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(DemoBlock, {
				title: "行选择 · 基础多选（rowSelection）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)(import_jsx_runtime$6.Fragment, { children: [
					"传入 ",
					/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("code", { children: "rowSelection" }),
					" 即在最左侧插入选择列。表头自动变成「全选 + 半选」复选框：未选 / 部分选中（半选）/ 全选三态联动。复用 foundation Checkbox，size 跟 Table size 联动（compact→small）。"
				] }),
				code: `const [keys, setKeys] = useState<TableRowKey[]>([]);

<Table<User>
  columns={cols}
  dataSource={users}
  rowKey="id"
  bordered
  rowSelection={{
    selectedRowKeys: keys,
    onChange: (nextKeys, nextRows) => {
      setKeys(nextKeys);
      console.log('选中行：', nextRows);
    },
  }}
/>`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(BasicSelectionExample, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(DemoBlock, {
				title: "行选择 · 部分行禁选（getCheckboxProps）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)(import_jsx_runtime$6.Fragment, { children: [
					"通过 ",
					/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("code", { children: "getCheckboxProps(row)" }),
					" 让某些行不可勾选； 全选/半选状态会自动忽略这些行，避免「无法全选」的死循环。 典型场景：禁用账号、只读条目、权限不足的资源。"
				] }),
				code: `<Table<User>
  columns={cols}
  dataSource={users}
  rowKey="id"
  bordered
  rowSelection={{
    onChange: (keys, rows) => console.log(keys, rows),
    // inactive 状态的行不可勾选
    getCheckboxProps: row => ({ disabled: row.status === 'inactive' }),
  }}
/>`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(DisabledSelectionExample, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(DemoBlock, {
				title: "行选择 · 受控 + 外部反控（selectedRowKeys）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)(import_jsx_runtime$6.Fragment, { children: [
					"传 ",
					/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("code", { children: "selectedRowKeys" }),
					" 进入受控；外部按钮可直接改写选中集合， Table 仅作\"展示 + 抛 onChange\"。常用于「批量操作」工具栏。"
				] }),
				code: `const [keys, setKeys] = useState<TableRowKey[]>([1, 3]);

<>
  <Button onClick={() => setKeys([])}>清空选择</Button>
  <Button onClick={() => setKeys(users.map(u => u.id))}>全选所有</Button>
  <Table<User>
    columns={cols}
    dataSource={users}
    rowKey="id"
    bordered
    rowSelection={{ selectedRowKeys: keys, onChange: setKeys }}
  />
</>`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(ControlledSelectionExample, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)(DemoBlock, {
				title: "边界态（loading / empty）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)(import_jsx_runtime$6.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("code", { children: "loading" }),
					" 表格上覆盖半透明遮罩 + spinner；",
					/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("code", { children: "empty" }),
					" 自定义空态文本（默认 \"No data\"）。"
				] }),
				code: `{/* 空态 */}
<Table<User> columns={cols} dataSource={[]} rowKey="id" bordered empty="暂无用户" />

{/* loading */}
<Table<User> columns={cols} dataSource={users} rowKey="id" bordered loading />`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Table, {
					columns: BASE_COLS,
					dataSource: [],
					rowKey: "id",
					bordered: true,
					empty: "暂无用户"
				}), /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Table, {
					columns: BASE_COLS,
					dataSource: USERS,
					rowKey: "id",
					bordered: true,
					loading: true
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(DemoBlock, {
				title: "宽表横向滚动 + 固定列（scroll + columns.fixed，v0.2.3 自落地）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)(import_jsx_runtime$6.Fragment, { children: [
					"对齐 antd ",
					/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("code", { children: "Table.scroll.x" }),
					" + ",
					/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("code", { children: "columns[i].fixed" }),
					"。 传 ",
					/* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("code", { children: [
						"scroll=",
						"{",
						" x: 1200 ",
						"}"
					] }),
					" 后表格内出现横向滚动条； 给某列加 ",
					/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("code", { children: "fixed: 'left'" }),
					" / ",
					/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("code", { children: "fixed: 'right'" }),
					" 后该列在滚动时 sticky 不动，分界线自带阴影提示。",
					/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("br", {}),
					"如果同时传 ",
					/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("code", { children: "scroll.y" }),
					"，表头会 sticky 在顶部（z-index 高于固定列）。"
				] }),
				code: `const cols: TableColumn<Wide>[] = [
  { key: 'name',  title: '名称',  dataIndex: 'name',  width: 160, fixed: 'left' },
  { key: 'role',  title: '角色',  dataIndex: 'role',  width: 120 },
  { key: 'team',  title: '团队',  dataIndex: 'team',  width: 160 },
  { key: 'email', title: '邮箱',  dataIndex: 'email', width: 240 },
  { key: 'phone', title: '手机',  dataIndex: 'phone', width: 160 },
  { key: 'addr',  title: '地址',  dataIndex: 'addr',  width: 280 },
  { key: 'opt',   title: '操作',  width: 120, fixed: 'right',
    render: row => <Button size="small">编辑</Button> },
];

<Table<Wide>
  columns={cols}
  dataSource={rows}
  rowKey="id"
  bordered
  scroll={{ x: 1200, y: 240 }}
/>`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(FixedColumnExample, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(TableGapsBlock, {})
		]
	});
}
function SortableExample() {
	const [sort, setSort] = (0, import_react$6.useState)({
		key: "id",
		direction: "asc"
	});
	const cols = [
		{
			key: "id",
			title: "ID",
			dataIndex: "id",
			width: 64,
			align: "right",
			sortable: true
		},
		{
			key: "name",
			title: "Name",
			dataIndex: "name",
			sortable: true
		},
		{
			key: "role",
			title: "Role",
			dataIndex: "role"
		}
	];
	const sorted = (0, import_react$6.useMemo)(() => {
		if (!sort) return USERS;
		const cmp = (a, b) => {
			const av = a[sort.key];
			const bv = b[sort.key];
			if (typeof av === "number" && typeof bv === "number") return av - bv;
			return String(av ?? "").localeCompare(String(bv ?? ""));
		};
		const arr = [...USERS].sort(cmp);
		return sort.direction === "desc" ? arr.reverse() : arr;
	}, [sort]);
	return /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 8,
			alignItems: "flex-start",
			width: "100%"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
			style: {
				fontSize: 12,
				color: "var(--wb-color-text-tertiary)"
			},
			children: ["当前排序：", /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("code", { children: sort ? `${sort.key} ${sort.direction}` : "(无)" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Table, {
			columns: cols,
			dataSource: sorted,
			rowKey: "id",
			sort,
			onSortChange: setSort,
			bordered: true
		})]
	});
}
function RowClickExample() {
	const [clicked, setClicked] = (0, import_react$6.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 8,
			alignItems: "flex-start",
			width: "100%"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
			style: {
				fontSize: 12,
				color: "var(--wb-color-text-tertiary)"
			},
			children: ["最后点击：", /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("code", { children: clicked ?? "(无)" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Table, {
			columns: BASE_COLS,
			dataSource: USERS,
			rowKey: "id",
			bordered: true,
			onRowClick: (row) => setClicked(`${row.name} (${row.role})`)
		})]
	});
}
/** 基础多选：非受控（仅展示选中数量） */
function BasicSelectionExample() {
	const [keys, setKeys] = (0, import_react$6.useState)([]);
	return /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 8,
			alignItems: "flex-start",
			width: "100%"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
			style: {
				fontSize: 12,
				color: "var(--wb-color-text-tertiary)"
			},
			children: [
				"已选 ",
				/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("code", { children: keys.length }),
				" 行：",
				/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("code", { children: JSON.stringify(keys) })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Table, {
			columns: BASE_COLS,
			dataSource: USERS,
			rowKey: "id",
			bordered: true,
			rowSelection: {
				selectedRowKeys: keys,
				onChange: setKeys
			}
		})]
	});
}
/** 部分禁选：inactive 状态的行不可勾选；全选只覆盖可选行 */
function DisabledSelectionExample() {
	const [keys, setKeys] = (0, import_react$6.useState)([]);
	return /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 8,
			alignItems: "flex-start",
			width: "100%"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
			style: {
				fontSize: 12,
				color: "var(--wb-color-text-tertiary)"
			},
			children: [
				"已选 ",
				/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("code", { children: keys.length }),
				" 行（",
				/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("code", { children: "inactive" }),
				" 行不可勾选 / 不计入全选）"
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Table, {
			columns: BASE_COLS,
			dataSource: USERS,
			rowKey: "id",
			bordered: true,
			rowSelection: {
				selectedRowKeys: keys,
				onChange: setKeys,
				getCheckboxProps: (row) => ({ disabled: row.status === "inactive" })
			}
		})]
	});
}
/** 受控 + 外部反控：清空 / 全选所有按钮 */
function ControlledSelectionExample() {
	const [keys, setKeys] = (0, import_react$6.useState)([1, 3]);
	return /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 8,
			alignItems: "flex-start",
			width: "100%"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
			style: {
				display: "flex",
				gap: 8
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("button", {
					type: "button",
					onClick: () => setKeys([]),
					style: {
						padding: "4px 10px",
						fontSize: 12,
						background: "var(--wb-bg-tertiary)",
						color: "var(--wb-color-text-primary)",
						border: "1px solid var(--wb-border-default)",
						borderRadius: "var(--wb-radius-sm)",
						cursor: "pointer"
					},
					children: "清空选择"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("button", {
					type: "button",
					onClick: () => setKeys(USERS.map((u) => u.id)),
					style: {
						padding: "4px 10px",
						fontSize: 12,
						background: "var(--wb-bg-tertiary)",
						color: "var(--wb-color-text-primary)",
						border: "1px solid var(--wb-border-default)",
						borderRadius: "var(--wb-radius-sm)",
						cursor: "pointer"
					},
					children: "全选所有"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("span", {
					style: {
						fontSize: 12,
						color: "var(--wb-color-text-tertiary)",
						alignSelf: "center"
					},
					children: ["当前选中：", /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("code", { children: JSON.stringify(keys) })]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Table, {
			columns: BASE_COLS,
			dataSource: USERS,
			rowKey: "id",
			bordered: true,
			rowSelection: {
				selectedRowKeys: keys,
				onChange: setKeys
			}
		})]
	});
}
function FixedColumnExample() {
	return /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
		style: { width: "100%" },
		children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Table, {
			columns: [
				{
					key: "name",
					title: "名称",
					dataIndex: "name",
					width: 160,
					fixed: "left"
				},
				{
					key: "role",
					title: "角色",
					dataIndex: "role",
					width: 120
				},
				{
					key: "team",
					title: "团队",
					dataIndex: "team",
					width: 160
				},
				{
					key: "email",
					title: "邮箱",
					dataIndex: "email",
					width: 240
				},
				{
					key: "phone",
					title: "手机",
					dataIndex: "phone",
					width: 160
				},
				{
					key: "addr",
					title: "地址",
					dataIndex: "addr",
					width: 320
				},
				{
					key: "opt",
					title: "操作",
					width: 120,
					fixed: "right",
					align: "center",
					render: () => /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", {
						style: {
							color: "var(--wb-text-link, #0a84ff)",
							cursor: "pointer"
						},
						children: "编辑"
					})
				}
			],
			dataSource: WIDE_ROWS,
			rowKey: "id",
			bordered: true,
			scroll: {
				x: 1280,
				y: 200
			}
		}), /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
			style: {
				fontSize: 12,
				color: "var(--wb-color-text-tertiary)",
				marginTop: 8
			},
			children: "横向拖拽滚动条试试：左侧\"名称\"和右侧\"操作\"列保持 sticky；表头 sticky 在顶部。"
		})]
	});
}
/**
* 能力缺口公示 —— 与 docs/table-design-gaps.md 保持一致。
* 任一项落地后，把它从两份文档中同时移除。
*/
function TableGapsBlock() {
	return /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(GapsBlock, {
		gapDocPath: "docs/table-design-gaps.md",
		blocking: [{
			title: "⚠️ \"列表行\"语义请勿误用 Table",
			description: "聊天会话/用户头像列表等\"卡片化\"行应使用 List（v0.3 计划新增），不要用 Table 单列 render hack。"
		}, {
			title: "行展开（expandable）",
			description: "点击行展开嵌套表格 / 详情区，目前不支持。"
		}],
		pending: [
			{
				title: "固定列阴影分界（v0.2.3 自落地）",
				description: "左固定列最右一列、右固定列最左一列各自挂分界阴影；颜色复用 --wb-shadow-sm，按 antd 默认 + 业务实测兜底，待设计师补 token。"
			},
			{
				title: "rowSelection 仅多选（type=checkbox）",
				description: "当前 v0.2 仅支持多选；radio 单选 / 跨页保留选择 / 自定义全选表头 等若有诉求再扩。"
			},
			{
				title: "行高 32 / 40px",
				description: "从设计稿目测 + antd 兜底，希望抽 --wb-table-row-height-{size} token。"
			},
			{
				title: "排序指示器 ▲▼↕",
				description: "用 ASCII 字符，跨字体渲染有差异，希望切到 SVG。"
			},
			{
				title: "loading 遮罩样式",
				description: "当前表格内独立写 spinner，与全局 Loading 组件不统一。"
			},
			{
				title: "空态默认文本 \"No data\"",
				description: "英文 + 无插画/icon，应改成「暂无数据」并支持 i18n。"
			},
			{
				title: "行 active 视觉反馈",
				description: "点击时只有 cursor: pointer，缺少按下色，希望设计师补色。"
			},
			{
				title: "selected 行高亮色 ⚠️ 缺 token",
				description: "写死 rgba(0,194,154,0.12)（hover 0.18），未新建 token；希望设计师补 --wb-table-row-selected-bg{,-hover} 并核 light/dark 视觉。"
			}
		],
		footer: /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)(import_jsx_runtime$6.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("code", { children: "分页 / 虚拟滚动 / 嵌套表" }), " 等 antd 能力归属其他组件 或会引入重依赖，本次明确不做（详见 GAP 长版第 3 段）。"] })
	});
}
var import_react$6, import_jsx_runtime$6, USERS, STATUS_TONE, BASE_COLS, WIDE_ROWS;
var init_TablePage = __esmMin((() => {
	import_react$6 = /* @__PURE__ */ __toESM(require_react());
	init_Table();
	init_Tag();
	init_DemoBlock();
	init_GapsBlock();
	import_jsx_runtime$6 = require_jsx_runtime();
	USERS = [
		{
			id: 1,
			name: "Alice",
			role: "Admin",
			status: "active",
			createdAt: "2026-01-12"
		},
		{
			id: 2,
			name: "Bob",
			role: "Editor",
			status: "inactive",
			createdAt: "2026-02-08"
		},
		{
			id: 3,
			name: "Carol",
			role: "Viewer",
			status: "pending",
			createdAt: "2026-03-30"
		},
		{
			id: 4,
			name: "Dave",
			role: "Editor",
			status: "active",
			createdAt: "2026-04-15"
		}
	];
	STATUS_TONE = {
		active: "success",
		pending: "warning",
		inactive: "default"
	};
	BASE_COLS = [
		{
			key: "id",
			title: "ID",
			dataIndex: "id",
			width: 64,
			align: "right"
		},
		{
			key: "name",
			title: "Name",
			dataIndex: "name"
		},
		{
			key: "role",
			title: "Role",
			dataIndex: "role"
		}
	];
	WIDE_ROWS = [
		{
			id: 1,
			name: "Alice",
			role: "Admin",
			team: "Platform",
			email: "alice@example.com",
			phone: "13800001111",
			addr: "北京市朝阳区望京 SOHO T1 1208"
		},
		{
			id: 2,
			name: "Bob",
			role: "Editor",
			team: "Growth",
			email: "bob@example.com",
			phone: "13800002222",
			addr: "上海市黄浦区南京东路 100 号"
		},
		{
			id: 3,
			name: "Carol",
			role: "Viewer",
			team: "Mobile",
			email: "carol@example.com",
			phone: "13800003333",
			addr: "广州市天河区珠江新城花城广场"
		},
		{
			id: 4,
			name: "Dave",
			role: "Editor",
			team: "Design System",
			email: "dave@example.com",
			phone: "13800004444",
			addr: "深圳市南山区科技园南区腾讯大厦"
		},
		{
			id: 5,
			name: "Eve",
			role: "Admin",
			team: "Infra",
			email: "eve@example.com",
			phone: "13800005555",
			addr: "杭州市余杭区文一西路 969 号"
		}
	];
}));
//#endregion
//#region ../../packages/agent-ui/src/playbook/pages/components/TabsPage.tsx
function PanelText({ label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
		style: panelStyle,
		children: [
			"这是 ",
			/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("strong", { children: label }),
			" 面板内容"
		]
	});
}
function TabsPage(props) {
	const { itemCount, disabledIndex, defaultActive, withPanel } = props;
	const disabledIdxNum = disabledIndex === "none" ? -1 : Number(disabledIndex);
	const items = ALL_KEYS.slice(0, itemCount).map((key, idx) => ({
		key,
		label: ALL_LABELS[idx],
		disabled: idx === disabledIdxNum,
		children: withPanel ? /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(PanelText, { label: ALL_LABELS[idx] }) : void 0
	}));
	const targetIdx = defaultActive === "first" ? 0 : defaultActive === "last" ? items.length - 1 : Math.floor((items.length - 1) / 2);
	return /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 16,
			alignItems: "flex-start",
			width: "100%"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(Tabs, {
			items,
			defaultActiveKey: items[targetIdx]?.disabled ? items.find((i) => !i.disabled)?.key : items[targetIdx]?.key
		}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
			style: {
				fontSize: "var(--wb-font-caption-size)",
				color: "var(--wb-color-text-tertiary)"
			},
			children: [
				"Foundation Tabs 视觉对齐 ardot 229:23 TAB导航；v0.2 仅暴露设计稿钉死的单一形态。 其余能力详见 ",
				/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("code", { children: "docs/tabs-design-gaps.md" }),
				"。"
			]
		})]
	});
}
/**
* 仿 antd 文档的"分块 demo"版式。每块独立的演示区 + 标题 + 中文说明。
* 严格按 v0.2 设计稿，不展示设计稿未定义的形态。
*/
function TabsVariants() {
	return /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 16
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(DemoBlock, {
				title: "基础用法",
				description: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(import_jsx_runtime$5.Fragment, { children: "最简单的用法。选中 tab 文字加粗（12 / 600 / 黑 96%）+ 下方 24×3 居中 indicator； 非选中 tab 文字 12 / 400 / 黑 76%。" }),
				code: `<Tabs
  defaultActiveKey="a"
  // 非受控也能监听切换：onChange 拿到目标 tab 的 key
  onChange={key => console.log('switched to', key)}
  items={[
    { key: 'a', label: '动态', children: <PanelText label="动态" /> },
    { key: 'b', label: '文档', children: <PanelText label="文档" /> },
    { key: 'c', label: '任务', children: <PanelText label="任务" /> },
  ]}
/>`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(TabsBasicDemo, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(DemoBlock, {
				title: "受控模式",
				description: /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)(import_jsx_runtime$5.Fragment, { children: [
					"通过 ",
					/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("code", { children: "activeKey" }),
					" 和 ",
					/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("code", { children: "onChange" }),
					" 完全由调用方控制， 典型场景是和路由 / 表单联动。"
				] }),
				code: `const [active, setActive] = useState('detail');

<Tabs
  activeKey={active}
  onChange={setActive}
  items={[
    { key: 'overview', label: '概览', children: <PanelText label="概览" /> },
    { key: 'detail', label: '详情', children: <PanelText label="详情" /> },
    { key: 'logs', label: '日志', children: <PanelText label="日志" /> },
  ]}
/>`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(TabsControlledDemo, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(DemoBlock, {
				title: "禁用某一项",
				description: /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)(import_jsx_runtime$5.Fragment, { children: [
					"在 ",
					/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("code", { children: "items" }),
					" 中给单项加 ",
					/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("code", { children: "disabled: true" }),
					" 即可。 键盘左右切换会自动跳过被禁用的 tab。",
					/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("br", {}),
					/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("em", {
						style: { color: "var(--wb-color-text-tertiary)" },
						children: "注：禁用态视觉为 a11y 兜底，设计稿未给规格，详见缺口清单。"
					})
				] }),
				code: `<Tabs
  // 键盘左右切换时，onChange 不会回传被禁用的 'c'
  onChange={key => console.log('current', key)}
  items={[
    { key: 'a', label: '可用' },
    { key: 'b', label: '可用' },
    { key: 'c', label: '禁用', disabled: true },
  ]}
/>`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(Tabs, { items: [
					{
						key: "a",
						label: "可用"
					},
					{
						key: "b",
						label: "可用"
					},
					{
						key: "c",
						label: "禁用",
						disabled: true
					}
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(DemoBlock, {
				title: "左侧 tab 布局（tabPosition='left'，v0.2.3 自落地）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)(import_jsx_runtime$5.Fragment, { children: [
					"对齐 antd ",
					/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("code", { children: "Tabs.tabPosition" }),
					"。设置 ",
					/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("code", { children: "tabPosition='left'" }),
					" ",
					"后 tab 列表竖向排在左边，indicator（ink-bar）也变为竖向 3px 宽，沿 tab 右侧滑动。 典型场景：设置页左侧导航 + 右侧面板。",
					/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("br", {}),
					/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("em", {
						style: { color: "var(--wb-color-text-tertiary)" },
						children: "键盘上下方向键代替左右键切换；其余 a11y / disabled 行为与 top 模式完全一致。"
					})
				] }),
				code: `<Tabs
  tabPosition="left"
  items={[
    { key: 'profile',  label: '个人资料', children: <ProfilePanel /> },
    { key: 'security', label: '安全',     children: <SecurityPanel /> },
    { key: 'billing',  label: '订阅',     children: <BillingPanel /> },
    { key: 'team',     label: '团队',     children: <TeamPanel /> },
  ]}
/>`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(TabsLeftDemo, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(TabsGapsBlock, {})
		]
	});
}
function TabsBasicDemo() {
	return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
		style: { width: "100%" },
		children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(Tabs, { items: [
			{
				key: "a",
				label: "动态",
				children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(PanelText, { label: "动态" })
			},
			{
				key: "b",
				label: "文档",
				children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(PanelText, { label: "文档" })
			},
			{
				key: "c",
				label: "任务",
				children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(PanelText, { label: "任务" })
			}
		] })
	});
}
function TabsControlledDemo() {
	const [active, setActive] = (0, import_react$5.useState)("detail");
	return /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 8,
			width: "100%"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
			style: {
				fontSize: 12,
				color: "var(--wb-color-text-tertiary)"
			},
			children: ["当前 activeKey = ", /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("code", { children: active })]
		}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(Tabs, {
			activeKey: active,
			onChange: setActive,
			items: [
				{
					key: "overview",
					label: "概览",
					children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(PanelText, { label: "概览" })
				},
				{
					key: "detail",
					label: "详情",
					children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(PanelText, { label: "详情" })
				},
				{
					key: "logs",
					label: "日志",
					children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(PanelText, { label: "日志" })
				}
			]
		})]
	});
}
function TabsLeftDemo() {
	return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
		style: {
			width: "100%",
			minHeight: 200
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(Tabs, {
			tabPosition: "left",
			items: [
				{
					key: "profile",
					label: "个人资料",
					children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(PanelText, { label: "个人资料" })
				},
				{
					key: "security",
					label: "安全",
					children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(PanelText, { label: "安全" })
				},
				{
					key: "billing",
					label: "订阅",
					children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(PanelText, { label: "订阅" })
				},
				{
					key: "team",
					label: "团队",
					children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(PanelText, { label: "团队" })
				}
			]
		})
	});
}
/**
* 能力缺口公示 —— 与 docs/tabs-design-gaps.md 保持一致。
*
* 与 ButtonGapsBlock 同款样式；任何一项落地后，把它从 docs 和这里同步移除。
*/
function TabsGapsBlock() {
	return /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
		style: gapsBlockStyle,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
				style: gapsHeaderStyle,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
					style: gapsTitleStyle,
					children: "能力缺口（v0.2 现状）"
				}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
					style: gapsSubtitleStyle,
					children: [
						"与 ",
						/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("code", { children: "docs/tabs-design-gaps.md" }),
						" 保持一致。Foundation 层只暴露设计稿 钉死的形态；下列能力尚未支持，待补稿后再由 foundation 二次落地。"
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
				style: gapsSectionStyle,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
					style: gapsSectionTitleStyle,
					children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("span", {
						style: gapsBadgeBlockingStyle,
						children: "阻塞"
					}), "必须补稿才能做"]
				}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("ul", {
					style: gapsListStyle,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("strong", { children: "hover / focus-visible 视觉" }), "：默认态被 hover 时文字色 / indicator 是否预览出现未定义。"] }),
						/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("strong", { children: "disabled 视觉" }), "：文字色 / 透明度 / 鼠标光标未定义。"] }),
						/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("strong", { children: "size 体系" }), "：当前只有 1 档（h=48 / 12px 字）； 是否需要 small / large、各自高度 / 字号 / indicator 尺寸均未定义。"] }),
						/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("strong", { children: "tab 之间间距" }), "：设计稿 itemSpacing=0； 多 tab 排列时是否需要水平间距未定义。"] }),
						/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("li", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("strong", { children: "容器分隔线" }),
							"：line variant 是否需要保留",
							/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("code", { children: "border-bottom" }),
							" 灰线未定义。"
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("strong", { children: "indicator 切换动画" }), "：滑动 / 渐显 / 直切 / 时长 / 缓动未定义。"] }),
						/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("strong", { children: "fullWidth 形态" }), "：tab 平均分布并撑满；设计稿未出图。"] })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
				style: gapsSectionStyle,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
					style: gapsSectionTitleStyle,
					children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("span", {
						style: gapsBadgePendingStyle,
						children: "不阻塞"
					}), "暂无类型签名暴露，可后补"]
				}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("ul", {
					style: gapsListStyle,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("strong", { children: "tabPosition='left' 视觉细节（v0.2.3 自落地）" }), "： 竖向 ink-bar 复用 top 模式同一对 CSS variable，宽度 3px / 颜色复用激活字色； 与设计稿同步性按 antd 默认 + 业务实测兜底，待设计师补 spec。"] }),
						/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("strong", { children: "card variant" }), "：设计稿未给；类型签名已移除，待补稿后重设。"] }),
						/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("strong", { children: "可关闭 tab / editable-card" }), "：不在 v0.2 范围。"] }),
						/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("strong", { children: "icon 前缀 / badge 后缀" }), "：不在 v0.2 范围。"] })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
				style: gapsFooterStyle,
				children: [
					"v0.2 类型签名保留 ",
					/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("code", { children: "items" }),
					" / ",
					/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("code", { children: "activeKey" }),
					" / ",
					/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("code", { children: "defaultActiveKey" }),
					" /",
					/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("code", { children: "onChange" }),
					" / ",
					/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("code", { children: "tabPosition" }),
					"(top/left) /",
					/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("code", { children: "className" }),
					"；",
					/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("code", { children: "variant='card'" }),
					" / ",
					/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("code", { children: "variant='segmented'" }),
					" / ",
					/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("code", { children: "size" }),
					" / ",
					/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("code", { children: "fullWidth" }),
					" 仍未暴露， 避免业务误用历史兜底视觉，设计稿补齐后再二次落地。"
				]
			})
		]
	});
}
var import_react$5, import_jsx_runtime$5, ALL_LABELS, ALL_KEYS, panelStyle, gapsBlockStyle, gapsHeaderStyle, gapsTitleStyle, gapsSubtitleStyle, gapsSectionStyle, gapsSectionTitleStyle, gapsBadgeBaseStyle, gapsBadgeBlockingStyle, gapsBadgePendingStyle, gapsListStyle, gapsFooterStyle;
var init_TabsPage = __esmMin((() => {
	import_react$5 = /* @__PURE__ */ __toESM(require_react());
	init_Tabs();
	init_DemoBlock();
	import_jsx_runtime$5 = require_jsx_runtime();
	ALL_LABELS = [
		"概览",
		"详情",
		"日志",
		"归档"
	];
	ALL_KEYS = [
		"overview",
		"detail",
		"logs",
		"archived"
	];
	panelStyle = {
		padding: 12,
		fontSize: 13,
		color: "var(--wb-color-text-secondary)"
	};
	gapsBlockStyle = {
		border: "1px solid var(--wb-border-default)",
		borderRadius: 8,
		overflow: "hidden",
		background: "var(--wb-bg-secondary)",
		display: "flex",
		flexDirection: "column"
	};
	gapsHeaderStyle = {
		padding: "16px 24px",
		borderBottom: "1px solid var(--wb-border-default)",
		background: "var(--wb-bg-primary)"
	};
	gapsTitleStyle = {
		fontSize: 14,
		fontWeight: 600,
		color: "var(--wb-color-text-primary)",
		marginBottom: 4
	};
	gapsSubtitleStyle = {
		fontSize: 13,
		lineHeight: 1.6,
		color: "var(--wb-color-text-secondary)"
	};
	gapsSectionStyle = { padding: "12px 24px 4px" };
	gapsSectionTitleStyle = {
		fontSize: 13,
		fontWeight: 600,
		color: "var(--wb-color-text-primary)",
		marginBottom: 4,
		display: "flex",
		alignItems: "center",
		gap: 8
	};
	gapsBadgeBaseStyle = {
		fontSize: 11,
		fontWeight: 600,
		padding: "2px 8px",
		borderRadius: 999,
		lineHeight: 1.4
	};
	gapsBadgeBlockingStyle = {
		...gapsBadgeBaseStyle,
		background: "var(--wb-status-error-soft, rgba(220, 53, 69, 0.12))",
		color: "var(--wb-status-error, #dc3545)"
	};
	gapsBadgePendingStyle = {
		...gapsBadgeBaseStyle,
		background: "var(--wb-status-warning-soft, rgba(245, 158, 11, 0.14))",
		color: "var(--wb-status-warning, #f59e0b)"
	};
	gapsListStyle = {
		margin: 0,
		paddingLeft: 20,
		fontSize: 13,
		lineHeight: 1.7,
		color: "var(--wb-color-text-secondary)"
	};
	gapsFooterStyle = {
		padding: "12px 24px 16px",
		fontSize: 12,
		lineHeight: 1.6,
		color: "var(--wb-color-text-tertiary)"
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/playbook/pages/components/TagPage.tsx
function TagPage(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 16
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(Tag, {
			tone: props.tone,
			size: props.size,
			dot: props.dot,
			children: props.label || "Status"
		})
	});
}
function TagVariants() {
	return /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 16
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)(DemoBlock, {
				title: "基础用法",
				description: /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)(import_jsx_runtime$4.Fragment, { children: [
					"最简单的用法。Tag 默认 ",
					/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("code", { children: "tone=\"default\"" }),
					"、",
					/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("code", { children: "size=\"medium\"" }),
					"，传入文字即可。"
				] }),
				code: `<Tag>Default</Tag>
<Tag tone="success">Success</Tag>`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(Tag, { children: "Default" }), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(Tag, {
					tone: "success",
					children: "Success"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(DemoBlock, {
				title: "五种语义色（tone）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)(import_jsx_runtime$4.Fragment, { children: [
					"提供五种语义色：",
					/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("code", { children: "default" }),
					"（中性，带边框）/ ",
					/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("code", { children: "success" }),
					"（成功，绿） / ",
					/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("code", { children: "warning" }),
					"（警告，黄）/ ",
					/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("code", { children: "error" }),
					"（错误，红）/ ",
					/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("code", { children: "info" }),
					"（信息，蓝）。设计稿钉死这五种，与系统状态色一致。"
				] }),
				code: `<Tag tone="default">default</Tag>
<Tag tone="success">success</Tag>
<Tag tone="warning">warning</Tag>
<Tag tone="error">error</Tag>
<Tag tone="info">info</Tag>`,
				children: ALL_TONES.map((tone) => /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(Tag, {
					tone,
					children: tone
				}, tone))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(DemoBlock, {
				title: "状态指示（dot）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)(import_jsx_runtime$4.Fragment, { children: [
					"传 ",
					/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("code", { children: "dot" }),
					" 时，文字左侧渲染一个 6×6 圆点，颜色随 tone 变化。常用于 \"在线/离线\"等状态指示，比纯文字更直观。"
				] }),
				code: `<Tag tone="success" dot>在线</Tag>
<Tag tone="warning" dot>离线 5 分钟</Tag>
<Tag tone="error" dot>已断连</Tag>`,
				children: ALL_TONES.map((tone) => /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(Tag, {
					tone,
					dot: true,
					children: tone
				}, tone))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(DemoBlock, {
				title: "两档尺寸（size）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)(import_jsx_runtime$4.Fragment, { children: [
					"提供两档尺寸：",
					/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("code", { children: "small" }),
					"（高 20px，表格行内用）/ ",
					/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("code", { children: "medium" }),
					"（高 24px，默认）。"
				] }),
				code: `<Tag size="small" tone="success">small</Tag>
<Tag size="medium" tone="success">medium</Tag>`,
				children: ALL_SIZES.map((size) => /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(Tag, {
					size,
					tone: "success",
					children: size
				}, size))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(DemoBlock, {
				title: "可关闭（closable + onClose）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)(import_jsx_runtime$4.Fragment, { children: [
					"传 ",
					/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("code", { children: "closable" }),
					" 时右侧渲染 × 按钮，点击触发 ",
					/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("code", { children: "onClose" }),
					"。 组件不内置消失动画，由调用方自行控制（如下方示例从列表中移除）。 对齐 antd ",
					/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("code", { children: "Tag.closable" }),
					"。"
				] }),
				code: `const [tags, setTags] = useState([
  { id: 't1', tone: 'success', label: 'TypeScript' },
  { id: 't2', tone: 'info', label: 'React' },
]);

{tags.map(t => (
  <Tag
    key={t.id}
    tone={t.tone}
    closable
    onClose={() => setTags(prev => prev.filter(x => x.id !== t.id))}
  >
    {t.label}
  </Tag>
))}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(ClosableExample, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)(DemoBlock, {
				title: "禁用态（disabled）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)(import_jsx_runtime$4.Fragment, { children: [
					"传 ",
					/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("code", { children: "disabled" }),
					" 后整体降透明度（50%），cursor 变 not-allowed，",
					/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("code", { children: "onClose" }),
					" 不会触发。用于「该标签不可移除」的明示场景。"
				] }),
				code: `<Tag tone="success" closable disabled onClose={() => undefined}>Locked</Tag>
<Tag tone="info" dot disabled>Disabled</Tag>`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(Tag, {
					tone: "success",
					closable: true,
					disabled: true,
					onClose: () => void 0,
					children: "Locked"
				}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(Tag, {
					tone: "info",
					dot: true,
					disabled: true,
					children: "Disabled"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(TagGapsBlock, {})
		]
	});
}
function ClosableExample() {
	const [tags, setTags] = import_react$4.useState([
		{
			id: "t1",
			tone: "success",
			label: "TypeScript"
		},
		{
			id: "t2",
			tone: "info",
			label: "React"
		},
		{
			id: "t3",
			tone: "warning",
			label: "experimental"
		},
		{
			id: "t4",
			tone: "error",
			label: "deprecated"
		}
	]);
	const handleClose = (id) => () => {
		setTags((prev) => prev.filter((t) => t.id !== id));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
		style: {
			display: "flex",
			flexWrap: "wrap",
			gap: 8,
			alignItems: "center"
		},
		children: [tags.map((t) => /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(Tag, {
			tone: t.tone,
			closable: true,
			onClose: handleClose(t.id),
			children: t.label
		}, t.id)), tags.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("button", {
			type: "button",
			onClick: () => setTags([
				{
					id: "t1",
					tone: "success",
					label: "TypeScript"
				},
				{
					id: "t2",
					tone: "info",
					label: "React"
				},
				{
					id: "t3",
					tone: "warning",
					label: "experimental"
				},
				{
					id: "t4",
					tone: "error",
					label: "deprecated"
				}
			]),
			style: {
				padding: "4px 12px",
				border: "1px solid var(--wb-border-default)",
				borderRadius: 6,
				background: "var(--wb-bg-secondary)",
				color: "var(--wb-color-text-secondary)",
				cursor: "pointer",
				fontSize: 12
			},
			children: "Reset"
		})]
	});
}
/**
* 能力缺口公示 —— 与 docs/tag-design-gaps.md 保持一致。
* 任一项落地后，把它从两份文档中同时移除。
*/
function TagGapsBlock() {
	return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(GapsBlock, {
		gapDocPath: "docs/tag-design-gaps.md",
		blocking: [
			{
				title: "可点击形态（CheckableTag）",
				description: "点击切换选中态视觉，\"标签筛选器\"等场景需要，设计稿未出图。"
			},
			{
				title: "图标前缀（icon prefix）",
				description: "antd Tag 支持文字左侧放图标，设计稿目前只有 dot，待设计师评审。"
			},
			{
				title: "关闭按钮 hover 视觉",
				description: "当前 rgba(0,0,0,0.08) 是兜底，未拿到设计师 token。"
			}
		],
		pending: [
			{
				title: "status 软底色 alpha",
				description: "当前用 rgba(_, _, _, 0.12)，应抽成 --wb-status-{tone}-soft token。"
			},
			{
				title: "disabled 透明度 0.5",
				description: "从 antd 兜底，未拿到设计师明确数值。"
			},
			{
				title: "关闭按钮尺寸 14×14",
				description: "从 antd 兜底，设计稿无明示。"
			},
			{
				title: "small 字号 11px",
				description: "强制覆盖 caption-size，设计师确认是否需要单独 caption-small token。"
			}
		],
		footer: /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)(import_jsx_runtime$4.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("code", { children: "color=\"cyan\"" }), " 等 antd 自定义颜色与 tone 重叠，破坏设计系统一致性， 本次明确不做（详见 GAP 长版第 3 段）。"] })
	});
}
var import_react$4, import_jsx_runtime$4, ALL_TONES, ALL_SIZES;
var init_TagPage = __esmMin((() => {
	import_react$4 = /* @__PURE__ */ __toESM(require_react());
	init_Tag();
	init_DemoBlock();
	init_GapsBlock();
	import_jsx_runtime$4 = require_jsx_runtime();
	ALL_TONES = [
		"default",
		"success",
		"warning",
		"error",
		"info"
	];
	ALL_SIZES = ["small", "medium"];
}));
//#endregion
//#region ../../packages/agent-ui/src/playbook/pages/components/TooltipPage.tsx
function TooltipPage(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
		style: {
			minHeight: 220,
			display: "flex",
			alignItems: "center",
			justifyContent: "center"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Tooltip, {
			content: props.content || "提示内容",
			placement: props.placement,
			interactive: props.interactive,
			noPadding: props.noPadding,
			delay: props.delay,
			maxWidth: props.maxWidth || void 0,
			textAlign: props.textAlign,
			children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Button, {
				variant: "primary",
				children: props.label || "Hover me"
			})
		})
	});
}
function TooltipVariants() {
	return /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 16
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(DemoBlock, {
				title: "基础用法",
				description: /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)(import_jsx_runtime$3.Fragment, { children: [
					"最简单的用法，传 ",
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("code", { children: "content" }),
					"（字符串或任意 ReactNode）+ ",
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("code", { children: "children" }),
					"（任意 ReactElement）即可。鼠标 hover 或键盘 focus 触发器时显示，移开/失焦后隐藏。",
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("br", {}),
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("strong", { children: "content 为 falsy（空串 / undefined / null）时，组件直接返回 children 不渲染浮层" }),
					"， 因此可以用「内容溢出才传值」的写法实现「省略号 + hover 显示完整文本」。"
				] }),
				code: `<Tooltip content="完整文件路径 /path/to/file.txt">
  <span className="truncate">file.txt</span>
</Tooltip>

{/* 仅当内容溢出时才显示 tooltip：falsy content 直接 return children，零开销 */}
<Tooltip content={isOverflow ? label : undefined}>
  <span>{label}</span>
</Tooltip>`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Tooltip, {
					content: "完整文件路径 /path/to/very-long-file-name.txt",
					children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Button, {
						variant: "secondary",
						children: "file.txt"
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)(DemoBlock, {
				title: "位置（placement）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)(import_jsx_runtime$3.Fragment, { children: [
					"通过 ",
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("code", { children: "placement" }),
					" 控制浮层相对触发器的方向，支持",
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("code", { children: "top" }),
					" / ",
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("code", { children: "bottom" }),
					" / ",
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("code", { children: "left" }),
					" / ",
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("code", { children: "right" }),
					"4 主方向，视口空间不够时自动 flip 到反向。",
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("br", {}),
					"Tooltip 不支持 antd 的 12 方向（带 ",
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("code", { children: "-start" }),
					" / ",
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("code", { children: "-end" }),
					"）， 因为工具提示一般不需要精细对齐；如需精细方向请用 ",
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("code", { children: "Popover" }),
					"。"
				] }),
				code: `<Tooltip placement="top"    content="顶部提示"><Button>Top</Button></Tooltip>
<Tooltip placement="right"  content="右侧提示"><Button>Right</Button></Tooltip>
<Tooltip placement="bottom" content="底部提示"><Button>Bottom</Button></Tooltip>
<Tooltip placement="left"   content="左侧提示"><Button>Left</Button></Tooltip>`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Tooltip, {
						placement: "top",
						content: "顶部提示",
						children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Button, {
							variant: "secondary",
							children: "Top"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Tooltip, {
						placement: "right",
						content: "右侧提示",
						children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Button, {
							variant: "secondary",
							children: "Right"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Tooltip, {
						placement: "bottom",
						content: "底部提示",
						children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Button, {
							variant: "secondary",
							children: "Bottom"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Tooltip, {
						placement: "left",
						content: "左侧提示",
						children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Button, {
							variant: "secondary",
							children: "Left"
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)(DemoBlock, {
				title: "触发延迟（delay / mouseEnterDelay）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)(import_jsx_runtime$3.Fragment, { children: [
					"通过 ",
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("code", { children: "delay" }),
					" 控制鼠标进入到浮层显示的延迟（毫秒），默认 ",
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("code", { children: "300" }),
					"。 关闭无延迟，鼠标移开立即隐藏。",
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("br", {}),
					"密集列表项里建议用更长 delay（如 500），避免一行行划过时反复弹出。",
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("br", {}),
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("strong", { children: ["v0.2.2 新增 antd 风格别名 ", /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("code", { children: "mouseEnterDelay" })] }),
					"（同样毫秒）， 从 antd 迁移过来的代码可直接保留写法；同时传时 ",
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("code", { children: "delay" }),
					" 优先。",
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("br", {}),
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("code", { children: "mouseLeaveDelay" }),
					"（关闭延迟）当前 cb-chat-ui 内核钉死为 0，",
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("strong", { children: "暂不支持" }),
					"， 需要\"鼠标离开后稍后再关\"请用 ",
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("code", { children: "interactive" }),
					" 的 safePolygon 模式。"
				] }),
				code: `<Tooltip content="立即显示" delay={0}><Button>delay=0</Button></Tooltip>
<Tooltip content="默认 300ms"><Button>delay=300（默认）</Button></Tooltip>
<Tooltip content="慢速 800ms" delay={800}><Button>delay=800</Button></Tooltip>

{/* antd 风格别名 */}
<Tooltip content="antd 风格" mouseEnterDelay={500}>
  <Button>mouseEnterDelay=500</Button>
</Tooltip>`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Tooltip, {
						content: "立即显示",
						delay: 0,
						children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Button, {
							variant: "secondary",
							children: "delay=0"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Tooltip, {
						content: "默认 300ms",
						children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Button, {
							variant: "secondary",
							children: "delay=300（默认）"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Tooltip, {
						content: "慢速 800ms",
						delay: 800,
						children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Button, {
							variant: "secondary",
							children: "delay=800"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Tooltip, {
						content: "antd 风格 500ms",
						mouseEnterDelay: 500,
						children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Button, {
							variant: "secondary",
							children: "mouseEnterDelay=500"
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)(DemoBlock, {
				title: "宽度限制与文字对齐（maxWidth / width / textAlign）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)(import_jsx_runtime$3.Fragment, { children: [
					"长内容场景下传 ",
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("code", { children: "maxWidth" }),
					" 防止浮层撑过宽；需要固定列宽用 ",
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("code", { children: "width" }),
					"。",
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("code", { children: "textAlign" }),
					" 控制内部文字水平对齐，默认 ",
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("code", { children: "center" }),
					"。"
				] }),
				code: `<Tooltip
  content="这是一段比较长的提示文字，用来演示 maxWidth 折行；超出 200px 后会自动换行。"
  maxWidth={200}
  textAlign="left"
>
  <Button>maxWidth=200 / left</Button>
</Tooltip>`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Tooltip, {
					content: "这是一段比较长的提示文字，用来演示 maxWidth 折行；超出 200px 后会自动换行。",
					maxWidth: 200,
					textAlign: "left",
					children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Button, {
						variant: "secondary",
						children: "maxWidth=200 / textAlign=left"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Tooltip, {
					content: "短文字 center 居中（默认）",
					maxWidth: 200,
					children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Button, {
						variant: "secondary",
						children: "maxWidth=200 / textAlign=center"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(DemoBlock, {
				title: "交互式（interactive）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)(import_jsx_runtime$3.Fragment, { children: [
					"默认 ",
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("code", { children: "interactive=false" }),
					"，鼠标离开触发器后浮层立即隐藏。 传 ",
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("code", { children: "interactive" }),
					" 后启用 floating-ui 的 safePolygon， 鼠标可沿三角形安全区域移到浮层上停留 / 点击内部链接，期间不会消失。",
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("br", {}),
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("strong", { children: "仅在浮层内确实有可点击元素时开启" }),
					"，纯文字提示用默认即可。"
				] }),
				code: `<Tooltip
  interactive
  content={
    <span>
      详情见
      <a href="/docs/tooltip" style={{ marginLeft: 4 }}>文档</a>
    </span>
  }
>
  <Button>hover 然后移到 tooltip 上点链接</Button>
</Tooltip>`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Tooltip, {
					interactive: true,
					content: /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("span", { children: ["详情见", /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("a", {
						href: "#",
						style: {
							marginLeft: 4,
							color: "var(--wb-text-link, #4c9aff)"
						},
						children: "文档"
					})] }),
					children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Button, {
						variant: "secondary",
						children: "interactive: hover → 移到浮层上点链接"
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(DemoBlock, {
				title: "无内边距（noPadding）",
				description: /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)(import_jsx_runtime$3.Fragment, { children: [
					"传 ",
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("code", { children: "noPadding" }),
					" 后浮层去掉默认内边距，常用于自带边距的复杂内容（如自带 padding 的图片预览、卡片片段）。"
				] }),
				code: `<Tooltip
  noPadding
  content={
    <div style={{ padding: '12px 16px', minWidth: 160 }}>
      自带 padding 的内容
    </div>
  }
>
  <Button>noPadding</Button>
</Tooltip>`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Tooltip, {
					noPadding: true,
					content: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
						style: {
							padding: "12px 16px",
							minWidth: 160
						},
						children: "自带 padding 的内容"
					}),
					children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Button, {
						variant: "secondary",
						children: "noPadding"
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(DemoBlock, {
				title: "ReactNode 内容",
				description: /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)(import_jsx_runtime$3.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("code", { children: "content" }), " 不止接受字符串，任何 ReactNode 都行：图标 + 文本、多行说明、列表均可。"] }),
				code: `<Tooltip
  content={
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, textAlign: 'left' }}>
      <strong>快捷键</strong>
      <span>⌘ + K 打开命令面板</span>
      <span>⌘ + / 显示全部快捷键</span>
    </div>
  }
  maxWidth={220}
  textAlign="left"
>
  <Button>ReactNode 内容</Button>
</Tooltip>`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Tooltip, {
					content: /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
						style: {
							display: "flex",
							flexDirection: "column",
							gap: 4,
							textAlign: "left"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("strong", { children: "快捷键" }),
							/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", { children: "⌘ + K 打开命令面板" }),
							/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", { children: "⌘ + / 显示全部快捷键" })
						]
					}),
					maxWidth: 220,
					textAlign: "left",
					children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Button, {
						variant: "secondary",
						children: "ReactNode 内容"
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(TooltipGapsBlock, {})
		]
	});
}
/**
* 能力缺口公示 —— 与 docs/tooltip-design-gaps.md 同步。
*
* Tooltip 当前是 cb-chat-ui Tooltip 的薄包装，所有缺口实质是 cb-chat-ui 的能力边界。
* 待补能力都先以"业务真踩到再升级 cb-chat-ui"为原则推进。
*/
function TooltipGapsBlock() {
	return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(GapsBlock, {
		gapDocPath: "docs/tooltip-design-gaps.md",
		blocking: [{
			title: "没有 disabled prop",
			description: "antd 的 Tooltip 在 disabled button 上自动用 wrapper 解决 hover 失效；当前实现下 <Tooltip><Button disabled /></Tooltip> 浮层不显示。临时建议给 disabled 元素外包 <span>。"
		}, {
			title: "没有箭头（arrow）",
			description: "设计稿无箭头；如未来设计师补稿要求\"指向触发器\"的箭头，需要在 cb-chat-ui Tooltip 层补 arrow 能力。"
		}],
		pending: [
			{
				title: "只支持 4 主方向，不支持 12 方向（top-start / right-end 等）",
				description: "工具提示一般不需要精细对齐；如需\"按钮左上角对齐\"等场景，请用 Popover。"
			},
			{
				title: "没有受控 open",
				description: "cb-chat-ui Tooltip 不暴露 open / onOpenChange，无法做\"程序化\"打开。需要\"引导提示 / 新功能 hint\"等场景请用 Popover。"
			},
			{
				title: "触发模式钉死 hover + focus，没有 trigger=\"click\"",
				description: "antd 支持 trigger=hover/click/focus 任意组合；本组件钉死 hover + focus，符合 tooltip 语义。需要 click 触发请用 Popover。"
			},
			{
				title: "没有 mouseLeaveDelay（关闭延迟）",
				description: "v0.2.2 已补 mouseEnterDelay（作为 delay 的 antd 风格别名）；但 mouseLeaveDelay 仍不支持——cb-chat-ui Tooltip 内核 delay.close 钉死为 0。需要\"鼠标离开后稍后再关\"请用 interactive 的 safePolygon 模式（已部分覆盖此诉求）。"
			}
		],
		footer: /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)(import_jsx_runtime$3.Fragment, { children: [
			"实现策略：薄包装 cb-chat-ui Tooltip，不在 wb 层重做浮层引擎。 所有\"antd 有但本组件没有\"的能力，要么是 cb-chat-ui 边界，要么明确建议用 ",
			/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("code", { children: "Popover" }),
			" 实现。"
		] })
	});
}
var import_jsx_runtime$3;
var init_TooltipPage = __esmMin((() => {
	require_react();
	init_Button();
	init_Tooltip();
	init_DemoBlock();
	init_GapsBlock();
	import_jsx_runtime$3 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/playbook/pages/tokens/ColorsPage.tsx
function ColorsPage() {
	const grouped = (0, import_react$2.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const cat of SECTION_ORDER) map.set(cat, []);
		for (const token of colorTokens) map.get(token.category)?.push(token);
		return map;
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: "var(--wb-spacing-7)",
			color: "var(--wb-color-text-primary)"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("h2", {
			style: {
				margin: 0,
				fontSize: "var(--wb-font-h1-size)",
				lineHeight: "var(--wb-font-h1-line-height)",
				fontWeight: "var(--wb-font-h1-weight)"
			},
			children: "Colors"
		}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
			style: {
				margin: "var(--wb-spacing-2) 0 0",
				fontSize: "var(--wb-font-body-size)",
				color: "var(--wb-color-text-secondary)"
			},
			children: "基础颜色 token（别名层），切换 dark 主题查看双视觉。semantic 底层变量和组件级 token 不在此展示。"
		})] }), SECTION_ORDER.map((cat) => {
			const tokens = grouped.get(cat) ?? [];
			if (tokens.length === 0) return null;
			return /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("h3", {
				style: {
					margin: "0 0 var(--wb-spacing-4)",
					fontSize: "var(--wb-font-h3-size)",
					lineHeight: "var(--wb-font-h3-line-height)",
					fontWeight: "var(--wb-font-h3-weight)",
					color: "var(--wb-color-text-primary)"
				},
				children: SECTION_TITLE$1[cat]
			}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
				style: {
					display: "grid",
					gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
					gap: "var(--wb-spacing-4)"
				},
				children: tokens.map((t) => /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(ColorCard, { token: t }, t.name))
			})] }, cat);
		})]
	});
}
function ColorCard({ token }) {
	return /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: "var(--wb-spacing-3)",
			padding: "var(--wb-spacing-4)",
			background: "var(--wb-bg-secondary)",
			border: "1px solid var(--wb-border-default)",
			borderRadius: "var(--wb-radius-md)"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
			style: {
				width: "100%",
				height: 64,
				background: `var(${token.name})`,
				borderRadius: "var(--wb-radius-sm)",
				border: "1px solid var(--wb-border-default)"
			},
			"aria-label": `色样 ${token.name}`
		}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
			style: {
				display: "flex",
				flexDirection: "column",
				gap: "var(--wb-spacing-2)"
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("code", {
					style: {
						fontSize: "var(--wb-font-code-size)",
						lineHeight: "var(--wb-font-code-line-height)",
						color: "var(--wb-color-text-primary)",
						wordBreak: "break-all"
					},
					children: token.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
					style: {
						fontSize: "var(--wb-font-caption-size)",
						lineHeight: "var(--wb-font-caption-line-height)",
						color: "var(--wb-color-text-secondary)"
					},
					children: [
						"light: ",
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("code", { children: token.value.light }),
						" · dark: ",
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("code", { children: token.value.dark })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
					style: {
						fontSize: "var(--wb-font-caption-size)",
						color: "var(--wb-color-text-tertiary)"
					},
					children: token.usage
				})
			]
		})]
	});
}
var import_react$2, import_jsx_runtime$2, SECTION_ORDER, SECTION_TITLE$1;
var init_ColorsPage = __esmMin((() => {
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
	init_tokens$1();
	import_jsx_runtime$2 = require_jsx_runtime();
	SECTION_ORDER = [
		"text",
		"bg",
		"border",
		"button",
		"icon",
		"status"
	];
	SECTION_TITLE$1 = {
		text: "文本 Text",
		bg: "背景 Background",
		border: "边框 Border",
		button: "按钮 Button",
		icon: "图标 Icon",
		status: "状态 Status"
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/playbook/playbook-registry.tsx
/** 按 section 分组，sidebar 用；components 内按 title 字母序排列，便于查找 */
function groupEntriesBySection() {
	const grouped = {
		tokens: [],
		components: []
	};
	for (const entry of playbookEntries) grouped[entry.section].push(entry);
	grouped.components.sort((a, b) => a.title.localeCompare(b.title));
	return grouped;
}
var import_jsx_runtime$1, playbookEntries;
var init_playbook_registry = __esmMin((() => {
	require_react();
	init_AvatarPage();
	init_BreadcrumbPage();
	init_ButtonPage();
	init_CardPage();
	init_CascaderPage();
	init_CheckboxPage();
	init_ColorPickerPage();
	init_DrawerPage();
	init_DropdownPage();
	init_IconPage();
	init_InputPage();
	init_LoadingPage();
	init_MessagePage();
	init_ModalPage();
	init_NotificationPage();
	init_PoiDialogPage();
	init_PopconfirmPage();
	init_PopoverPage();
	init_ProgressPage();
	init_RegionPickerPage();
	init_SegmentedPage();
	init_SelectPage();
	init_SkillRecommendBarPage();
	init_SwitchPage();
	init_TablePage();
	init_TabsPage();
	init_TagPage();
	init_TooltipPage();
	init_ColorsPage();
	import_jsx_runtime$1 = require_jsx_runtime();
	playbookEntries = [
		{
			id: "colors",
			title: "Colors",
			section: "tokens",
			schema: {},
			render: () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ColorsPage, {}),
			description: "Foundation 颜色 token 色板，按语义分类展示当前主题下的所有 --wb-* 颜色变量。"
		},
		{
			id: "button",
			title: "Button",
			section: "components",
			description: "通用按钮（v0.3 设计稿对齐）：5 种 variant（含 wb 自有 ghost / link）+ 3 档 size（small/medium/large），支持 leftIcon / rightIcon / iconOnly / shape=circle / fullWidth。",
			schema: {
				variant: {
					type: "select",
					options: [
						"primary",
						"secondary",
						"grey",
						"ghost",
						"link"
					],
					default: "primary",
					typeLabel: "'primary' | 'secondary' | 'grey' | 'ghost' | 'link'",
					description: "视觉风格。primary 主操作；secondary 次操作；grey 浅灰底次按钮（wb 专属）；ghost 透明底，仅 hover/press 显形（wb 专属，常用于 titlebar / 操作条）；link 无背景纯文字按钮，用于行内跳转或次要文本操作。"
				},
				size: {
					type: "select",
					options: [
						"small",
						"medium",
						"large"
					],
					default: "medium",
					typeLabel: "'small' | 'medium' | 'large'",
					description: "尺寸；设计稿 v0.3 三档：small(24) / medium(32，默认) / large(48)。"
				},
				shape: {
					type: "select",
					options: ["rounded", "circle"],
					default: "rounded",
					typeLabel: "'rounded' | 'circle'",
					description: "形状。rounded 圆角 8px（默认）；circle 正圆，仅在 iconOnly 时生效（带文字按钮不该是圆的，传了也会被忽略）。"
				},
				leftIcon: {
					type: "boolean",
					default: false,
					typeLabel: "ReactNode",
					description: "左侧 16×16 图标；颜色继承文字色。Playbook 中用 boolean 切换是否演示（开启时填入 + 号）；业务侧直接传入 SVG ReactNode。"
				},
				rightIcon: {
					type: "boolean",
					default: false,
					typeLabel: "ReactNode",
					description: "右侧 16×16 图标；常用于\"展开 / 下拉\"语义。Playbook 中用 boolean 切换是否演示（开启时填入 ▾）；业务侧直接传入 SVG ReactNode。"
				},
				iconOnly: {
					type: "boolean",
					default: false,
					description: "仅图标形态。等高方形按钮（large=48 / medium=32 / small=24），开启时文案不渲染。配合 shape=\"circle\" 可得正圆热区。"
				},
				loading: {
					type: "boolean",
					default: false,
					description: "加载状态。开启后自动 disabled 防止重复点击，内容半透明 + 显示旋转 spinner。适用于异步操作（保存、提交、删除确认等）。"
				},
				fullWidth: {
					type: "boolean",
					default: false,
					description: "是否撑满父容器宽度，常用于移动端或表单底部主按钮。"
				},
				label: {
					type: "string",
					default: "Click me",
					placeholder: "Button text",
					description: "按钮文案（仅 Playbook 用于驱动 children；iconOnly 开启时不生效）。"
				}
			},
			render: (props) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ButtonPage, {
				variant: props.variant,
				size: props.size,
				shape: props.shape,
				fullWidth: props.fullWidth,
				loading: props.loading,
				label: props.label,
				leftIcon: props.leftIcon,
				rightIcon: props.rightIcon,
				iconOnly: props.iconOnly
			}),
			renderVariants: () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ButtonVariants, {}),
			sampleCode: `import { Button } from '@genie/agent-ui/foundation';

<Button variant="primary" leftIcon={<PlusIcon />}>新建</Button>
<Button variant="secondary" iconOnly leftIcon={<SearchIcon />} aria-label="搜索" />
<Button variant="ghost" iconOnly shape="circle" leftIcon={<CloseIcon />} aria-label="关闭" />`
		},
		{
			id: "icon",
			title: "Icon",
			section: "components",
			description: "图标基座（v0.2 对齐 antd Icon 公开 API 子集）：1 个 <Icon> + N 份资产；支持 size / spin / rotate / color / strokeWidth；`createIcon` 工厂等价 antd 自动生成的 <HomeOutlined />。100+ 业务图标在 src/components/icons/ 全部走基座。",
			schema: {
				size: {
					type: "select",
					options: [
						"sm",
						"md",
						"lg",
						"xl"
					],
					default: "md",
					typeLabel: "'sm' | 'md' | 'lg' | 'xl' | number | string",
					description: "尺寸；预设档位 sm=14 / md=16 / lg=20 / xl=24，对齐 wb-spacing。也可直传 number。"
				},
				spin: {
					type: "boolean",
					default: false,
					description: "是否旋转；1.2s/圈匀速，与 Loading spinner 节奏一致。spin 与 rotate 共存时 spin 优先。"
				},
				rotate: {
					type: "select",
					options: [
						"0",
						"90",
						"180",
						"270"
					],
					default: "0",
					typeLabel: "0 | 90 | 180 | 270",
					description: "静态旋转角度，4 档 90° 步进，对齐 antd Icon.rotate。"
				},
				color: {
					type: "select",
					options: [
						"inherit",
						"primary",
						"success",
						"warning",
						"error"
					],
					default: "inherit",
					typeLabel: "string（CSS color 或 var(...)）",
					description: "颜色；默认 inherit（继承父级 currentColor）。Playbook 提供 wb-* 状态色快捷档；业务侧直接传任意 CSS 值。"
				}
			},
			render: (props) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(IconPage, {
				size: props.size,
				spin: props.spin,
				rotate: props.rotate,
				color: props.color
			}),
			renderVariants: () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(IconVariants, {}),
			sampleCode: `import { Icon, createIcon } from '@genie/agent-ui/foundation';
import { Settings } from 'lucide-react';

// 直接用基座
<Icon component={Settings} size='lg' spin />

// 工厂生成具名组件（推荐）
const SettingsIcon = createIcon(Settings);
<SettingsIcon size='lg' />

// 品牌色资源
import logoUrl from './my-logo.svg';
const MyLogo = createIcon({ url: logoUrl, themable: true });
<MyLogo size='md' />`
		},
		{
			id: "input",
			title: "Input",
			section: "components",
			description: "原生 input 的薄包装，对齐 antd 公开 API 子集：size / status / 受控 / prefix / suffix / allowClear / onPressEnter。",
			schema: {
				size: {
					type: "select",
					options: [
						"small",
						"medium",
						"large"
					],
					default: "medium",
					description: "尺寸；与 Button 的 size 对齐。"
				},
				disabled: {
					type: "boolean",
					default: false,
					description: "禁用状态。"
				},
				error: {
					type: "boolean",
					default: false,
					description: "校验失败态（status=\"error\"），边框使用 error 色。"
				},
				placeholder: {
					type: "string",
					default: "Type here...",
					placeholder: "placeholder",
					description: "空值占位文案。"
				}
			},
			render: (props) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(InputPage, {
				size: props.size,
				disabled: props.disabled,
				error: props.error,
				placeholder: props.placeholder
			}),
			renderVariants: () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(InputVariants, {}),
			sampleCode: `import { Input } from '@genie/agent-ui/foundation';

<Input placeholder="Type here..." />
<Input prefix={<SearchIcon />} allowClear onPressEnter={onSearch} />`
		},
		{
			id: "tag",
			title: "Tag",
			section: "components",
			description: "标签 / 状态徽章，对齐 antd Tag 公开 API 子集：5 种语义 tone × 2 档 size + dot / closable / disabled。",
			schema: {
				tone: {
					type: "select",
					options: [
						"default",
						"success",
						"warning",
						"error",
						"info"
					],
					default: "default",
					description: "语义色；与系统状态色（success/warning/error/info）一致。"
				},
				size: {
					type: "select",
					options: ["small", "medium"],
					default: "medium",
					description: "尺寸；表格内一般用 small。"
				},
				dot: {
					type: "boolean",
					default: false,
					description: "是否在文本左侧显示一个小圆点，常用于\"在线/离线\"等状态指示。"
				},
				label: {
					type: "string",
					default: "Status",
					placeholder: "文案",
					description: "徽章文案（仅 Playbook 用于驱动 children）。"
				}
			},
			render: (props) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(TagPage, {
				tone: props.tone,
				size: props.size,
				dot: props.dot,
				label: props.label
			}),
			renderVariants: () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(TagVariants, {}),
			sampleCode: `import { Tag } from '@genie/agent-ui/foundation';

<Tag tone='success' dot>Active</Tag>
<Tag tone='info' closable onClose={() => removeTag(id)}>React</Tag>`
		},
		{
			id: "avatar",
			title: "Avatar",
			section: "components",
			description: "头像 / 用户标识（v0.2 对齐 antd Avatar 公开 API 子集）：shape（circle/square）× size（small/medium/large/number）+ src/icon/children 三层 fallback；业务专属的 URL 解析、渐变色板留在业务层，Avatar 仅接收已解析好的 src + style 透传。",
			schema: {
				size: {
					type: "select",
					options: [
						"small",
						"medium",
						"large"
					],
					default: "medium",
					typeLabel: "'small' | 'medium' | 'large' | number",
					description: "尺寸；预设档位 small=24 / medium=32 / large=40，也可直传 number。"
				},
				shape: {
					type: "select",
					options: ["circle", "square"],
					default: "circle",
					description: "形状；circle 圆形（默认），square 方形（圆角 6px）。"
				},
				useImage: {
					type: "boolean",
					default: true,
					typeLabel: "演示参数（驱动是否传 src）",
					description: "是否使用图片头像；关闭后走 fallback 链（icon → children）。"
				},
				useIcon: {
					type: "boolean",
					default: false,
					typeLabel: "演示参数（驱动是否传 icon）",
					description: "是否使用图标 fallback；优先级**高于** children。仅当 useImage=false 时生效。"
				},
				label: {
					type: "string",
					default: "Tencent",
					placeholder: "名字 / 昵称",
					description: "文字 fallback（仅 Playbook 用于驱动 children）；组件内自动取首字符并大写。"
				}
			},
			render: (props) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AvatarPage, {
				size: props.size,
				shape: props.shape,
				useImage: props.useImage,
				useIcon: props.useIcon,
				label: props.label
			}),
			renderVariants: () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AvatarVariants, {}),
			sampleCode: `import { Avatar } from '@genie/agent-ui/foundation';

{/* 图片头像 */}
<Avatar src={user.avatar} alt={user.name} />

{/* 文字 fallback：自动取首字符大写 */}
<Avatar shape="square" size="large">{user.name}</Avatar>

{/* 图标 fallback：未登录 / 默认头像 */}
<Avatar icon={<UserIcon />} />

{/* 加载失败自动兜底；防盗链场景透传 referrerPolicy */}
<Avatar
  src={lexiangAvatarUrl}
  referrerPolicy="no-referrer"
  alt={user.name}
>
  {user.name}
</Avatar>

{/* 业务自定义渐变背景：通过 style 透传 */}
<Avatar style={{ background: gradient }}>{user.name}</Avatar>`
		},
		{
			id: "card",
			title: "Card",
			section: "components",
			description: "通用卡片容器，对齐 antd 公开 API 子集：variant（elevated/outlined/flat） / padding 四档 / hoverable / loading。详见组件页内\"能力缺口\"。",
			schema: {
				variant: {
					type: "select",
					options: [
						"elevated",
						"outlined",
						"flat"
					],
					default: "outlined",
					description: "视觉变体。elevated 带阴影、outlined 仅边框（默认）、flat 仅背景色。"
				},
				padding: {
					type: "select",
					options: [
						"none",
						"small",
						"medium",
						"large"
					],
					default: "medium",
					description: "内边距档位（0/12/20/28），none 表示由调用方自行控制。"
				},
				hoverable: {
					type: "boolean",
					default: false,
					description: "是否启用 hover 强化视觉（鼠标指针变 pointer、背景/阴影/边框加重）。对齐 antd Card.hoverable，v0.2 破坏性替换旧的 interactive。"
				},
				loading: {
					type: "boolean",
					default: false,
					description: "加载占位：用骨架屏（三行宽度递减灰色矩形 + shimmer 动画）替换内容，并禁用 hoverable / onClick。"
				}
			},
			render: (props) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(CardPage, {
				variant: props.variant,
				padding: props.padding,
				hoverable: props.hoverable,
				loading: props.loading
			}),
			renderVariants: () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(CardVariants, {}),
			sampleCode: `import { Card } from '@genie/agent-ui/foundation';

<Card variant='outlined' hoverable onClick={onSelect}>
  ...
</Card>

<Card loading />`
		},
		{
			id: "loading",
			title: "Loading",
			section: "components",
			description: "加载指示器（v0.2 对齐 antd Spin 公开 API 子集）；支持独立 spinner / 包裹模式 / 受控 spinning / delay 延迟显示。",
			schema: {
				size: {
					type: "select",
					options: [
						"small",
						"medium",
						"large"
					],
					default: "medium",
					description: "spinner 尺寸；列表项内一般用 small，整页加载用 large。"
				},
				tip: {
					type: "string",
					default: "",
					placeholder: "可选文案",
					description: "可选旁注文案，竖排显示在 spinner 下方；命名对齐 antd Spin.tip。"
				}
			},
			render: (props) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(LoadingPage, {
				size: props.size,
				tip: props.tip
			}),
			renderVariants: () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(LoadingVariants, {}),
			sampleCode: `import { Loading } from '@genie/agent-ui/foundation';

// 独立 spinner
<Loading tip="加载中..." />

// 包裹模式
<Loading spinning={loading} tip="保存中…">
  <ContentArea />
</Loading>`
		},
		{
			id: "popover",
			title: "Popover",
			section: "components",
			description: "通用浮层；基于 @floating-ui/react 完成定位 / 外点击关闭 / ESC / ARIA，复用 wb-* 视觉 token。",
			schema: {
				placement: {
					type: "select",
					options: [
						"top",
						"top-start",
						"top-end",
						"bottom",
						"bottom-start",
						"bottom-end",
						"left",
						"left-start",
						"left-end",
						"right",
						"right-start",
						"right-end"
					],
					default: "bottom",
					description: "浮层相对触发器的位置（12 个方向，与 antd 一致）；超出视口时会自动 flip 到反向。"
				},
				triggerMode: {
					type: "select",
					options: ["click", "hover"],
					default: "click",
					description: "触发方式；click 适合菜单 / 详情，hover 适合补充提示。"
				},
				hasArrow: {
					type: "boolean",
					default: false,
					description: "是否在浮层与触发器之间渲染连接箭头。"
				},
				disabled: {
					type: "boolean",
					default: false,
					description: "禁用时点击 / 悬停均不会打开浮层。"
				},
				label: {
					type: "string",
					default: "Open popover",
					placeholder: "Trigger 文案",
					description: "触发按钮的文案（仅 Playbook 用于驱动 children）。"
				}
			},
			render: (props) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(PopoverPage, {
				placement: props.placement,
				triggerMode: props.triggerMode,
				hasArrow: props.hasArrow,
				disabled: props.disabled,
				label: props.label
			}),
			renderVariants: () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(PopoverVariants, {}),
			sampleCode: `import { Popover, Button } from '@genie/agent-ui/foundation';

<Popover hasArrow trigger={<Button variant="primary">Open</Button>}>
  <div>Popover content</div>
</Popover>`
		},
		{
			id: "popconfirm",
			title: "Popconfirm",
			section: "components",
			description: "气泡确认框（v0.2 对齐 antd Popconfirm 公开 API 子集）；基于 Foundation Popover + Button 复用，不重复实现浮层基础能力。支持 title/description/icon、12 方向 placement、click/hover 触发、受控/非受控、onConfirm 返回 Promise 时自动 loading + 关闭。详见组件页内\"能力缺口\"。",
			schema: {
				placement: {
					type: "select",
					options: [
						"top",
						"top-start",
						"top-end",
						"bottom",
						"bottom-start",
						"bottom-end",
						"left",
						"left-start",
						"left-end",
						"right",
						"right-start",
						"right-end"
					],
					default: "top",
					typeLabel: "PopconfirmPlacement",
					description: "气泡相对触发器的位置；默认 top（与 antd 一致），与 Popover 同枚举。"
				},
				trigger: {
					type: "select",
					options: ["click", "hover"],
					default: "click",
					typeLabel: "'click' | 'hover'",
					description: "触发方式。v0.2 默认 'click'（防误触；这点**有意偏离 antd 默认 'hover'**，已记入缺口文档）。antd 还支持 'focus' / 'contextMenu'，本期不做。"
				},
				showCancel: {
					type: "boolean",
					default: true,
					description: "是否显示 Cancel 按钮。设为 false 退化为\"单按钮确认气泡\"。"
				},
				disabled: {
					type: "boolean",
					default: false,
					description: "禁用：不响应任何触发，children 行为不变（仍可点）。"
				},
				arrow: {
					type: "boolean",
					default: true,
					description: "是否在气泡与触发器之间渲染连接箭头（与 antd 默认一致：开）。"
				},
				title: {
					type: "string",
					default: "确认删除？",
					placeholder: "气泡标题",
					description: "气泡标题（ReactNode，这里 string 凑合演示；富内容 title 见下方 DemoBlock）。"
				},
				description: {
					type: "string",
					default: "删除后无法恢复",
					placeholder: "描述（留空则不渲染）",
					description: "详细描述（antd 5.1+），留空则不渲染 description 行。"
				},
				okText: {
					type: "string",
					default: "OK",
					placeholder: "OK 按钮文案",
					description: "确认按钮文案。"
				},
				cancelText: {
					type: "string",
					default: "Cancel",
					placeholder: "Cancel 按钮文案",
					description: "取消按钮文案。"
				},
				iconMode: {
					type: "select",
					options: [
						"default",
						"custom",
						"none"
					],
					default: "default",
					typeLabel: "'default' | 'custom' | 'none'",
					description: "左侧 icon 槽位映射：default → HelpCircleIcon；custom → DeleteIcon（演示传 ReactNode）；none → 传 null 隐藏 icon。PropsPanel 不能直接传 JSX，这里做成枚举。"
				},
				okVariant: {
					type: "select",
					options: [
						"primary",
						"grey",
						"secondary"
					],
					default: "primary",
					typeLabel: "'primary' | 'grey' | 'secondary'",
					description: "演示 okButtonProps 透传：等价于 okButtonProps={{ variant: ... }}。在 Foundation Button 补出 danger variant 之前，删除场景的\"危险红\"也走这条路。"
				},
				label: {
					type: "string",
					default: "删除",
					placeholder: "Trigger 文案",
					description: "触发按钮的文案（仅 Playbook 用于驱动 children）。"
				}
			},
			render: (props) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(PopconfirmPage, {
				placement: props.placement,
				trigger: props.trigger,
				showCancel: props.showCancel,
				disabled: props.disabled,
				arrow: props.arrow,
				title: props.title,
				description: props.description,
				okText: props.okText,
				cancelText: props.cancelText,
				iconMode: props.iconMode,
				okVariant: props.okVariant,
				label: props.label
			}),
			renderVariants: () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(PopconfirmVariants, {}),
			sampleCode: `import { Popconfirm, Button } from '@genie/agent-ui/foundation';

{/* 基础：删除二次确认 */}
<Popconfirm
  title="确认删除？"
  description="删除后无法恢复"
  onConfirm={() => deleteItem(id)}
>
  <Button variant="primary">删除</Button>
</Popconfirm>

{/* 异步关闭：onConfirm 返回 Promise，自动给 OK 按钮 loading；
    resolve 后自动关闭，reject 不关闭，由调用方决定 */}
<Popconfirm
  title="发布到生产？"
  onConfirm={async () => {
    await api.deploy();
  }}
>
  <Button variant="primary">发布</Button>
</Popconfirm>

{/* 受控 + 条件触发：表单未填完时不弹气泡 */}
<Popconfirm
  open={open}
  onOpenChange={setOpen}
  title="提交申请？"
  onConfirm={submit}
>
  <Button onClick={() => isValid && setOpen(true)}>提交</Button>
</Popconfirm>`
		},
		{
			id: "modal",
			title: "Modal",
			section: "components",
			description: "模态对话框；基于 @floating-ui/react FloatingPortal + FocusManager + Overlay，支持焦点陷阱 / body scroll lock / ESC 关闭。",
			schema: {
				size: {
					type: "select",
					options: [
						"small",
						"medium",
						"large"
					],
					default: "medium",
					description: "尺寸；决定 modal 最大宽度（small=480 / medium=640 / large=960）。"
				},
				closeOnOverlayClick: {
					type: "boolean",
					default: true,
					description: "点击遮罩是否关闭。"
				},
				closeOnEscape: {
					type: "boolean",
					default: true,
					description: "按 ESC 是否关闭。"
				},
				title: {
					type: "string",
					default: "Confirm action",
					placeholder: "标题",
					description: "可选标题；不传则不渲染 header。"
				}
			},
			render: (props) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ModalPage, {
				size: props.size,
				closeOnOverlayClick: props.closeOnOverlayClick,
				closeOnEscape: props.closeOnEscape,
				title: props.title
			}),
			renderVariants: () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ModalVariants, {}),
			sampleCode: `import { Modal, ModalBody, ModalFooter, Button } from '@genie/agent-ui/foundation';

const [open, setOpen] = useState(false);

<Modal open={open} onOpenChange={setOpen} title="Confirm">
  <ModalBody>Are you sure?</ModalBody>
  <ModalFooter>
    <Button onClick={() => setOpen(false)}>Cancel</Button>
    <Button variant="primary" onClick={() => setOpen(false)}>OK</Button>
  </ModalFooter>
</Modal>`
		},
		{
			id: "drawer",
			title: "Drawer",
			section: "components",
			description: "侧滑抽屉（v0.2 对齐 antd Drawer 公开 API 子集）；与 Modal 共用 @floating-ui/react 底层（Portal + FocusManager + Overlay + lockScroll），仅在容器形态、动画方向与默认尺寸上分化。设计稿未单独出图，缺口见组件页底部。",
			schema: {
				placement: {
					type: "select",
					options: [
						"right",
						"left",
						"top",
						"bottom"
					],
					default: "right",
					typeLabel: "'right' | 'left' | 'top' | 'bottom'",
					description: "滑入方向；right 最常用（详情 / 设置面板），bottom 多用于移动端 sheet 形态。"
				},
				size: {
					type: "select",
					options: ["default", "large"],
					default: "default",
					description: "预设尺寸，对齐 antd 默认值：default=378 / large=736。水平方向控制 width，垂直方向控制 height。"
				},
				closable: {
					type: "boolean",
					default: true,
					description: "是否显示关闭按钮（header 右侧 32×32 圆 ×）。"
				},
				mask: {
					type: "boolean",
					default: true,
					description: "是否显示遮罩。关闭后背景仍可交互（仅容器拿事件），常用于\"侧边检索面板\"。"
				},
				maskClosable: {
					type: "boolean",
					default: true,
					description: "点击遮罩是否关闭。"
				},
				keyboard: {
					type: "boolean",
					default: true,
					description: "按 ESC 是否关闭。"
				},
				title: {
					type: "string",
					default: "设置",
					placeholder: "标题",
					description: "可选标题；不传则不渲染 header（除非 extra / closable 任一为真）。"
				}
			},
			render: (props) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(DrawerPage, {
				placement: props.placement,
				size: props.size,
				closable: props.closable,
				mask: props.mask,
				maskClosable: props.maskClosable,
				keyboard: props.keyboard,
				title: props.title
			}),
			renderVariants: () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(DrawerVariants, {}),
			sampleCode: `import { Drawer, DrawerBody, DrawerFooter, Button } from '@genie/agent-ui/foundation';

const [open, setOpen] = useState(false);

<Drawer
  open={open}
  onOpenChange={setOpen}
  title="设置"
  footer={
    <DrawerFooter>
      <Button onClick={() => setOpen(false)}>取消</Button>
      <Button variant="primary" onClick={save}>保存</Button>
    </DrawerFooter>
  }
>
  <DrawerBody>...</DrawerBody>
</Drawer>`
		},
		{
			id: "dropdown",
			title: "Dropdown",
			section: "components",
			description: "下拉菜单；底层复用 Popover 处理定位/关闭，仅额外提供菜单项视觉与语义。",
			schema: {
				placement: {
					type: "select",
					options: [
						"top",
						"bottom",
						"left",
						"right"
					],
					default: "bottom",
					description: "浮层位置。"
				},
				disabled: {
					type: "boolean",
					default: false,
					description: "整体禁用。"
				},
				label: {
					type: "string",
					default: "Actions",
					placeholder: "触发器文案",
					description: "触发按钮的文案。"
				}
			},
			render: (props) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(DropdownPage, {
				placement: props.placement,
				disabled: props.disabled,
				label: props.label
			}),
			renderVariants: () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(DropdownVariants, {}),
			sampleCode: `import { Dropdown, Button } from '@genie/agent-ui/foundation';

<Dropdown
  items={[
    { key: 'edit', label: '编辑' },
    { key: 'delete', label: '删除', danger: true, divider: true },
  ]}
  onSelect={key => console.log(key)}
  trigger={<Button>Actions ▾</Button>}
/>`
		},
		{
			id: "select",
			title: "Select",
			section: "components",
			description: "下拉选择（v0.2 对齐 antd Select 公开 API 子集，单选）；底层复用 Popover，trigger 视觉与 Input 对齐，支持 allowClear。",
			schema: {
				size: {
					type: "select",
					options: [
						"small",
						"medium",
						"large"
					],
					default: "medium",
					description: "尺寸；与 Input 对齐。"
				},
				disabled: {
					type: "boolean",
					default: false,
					description: "禁用状态。"
				},
				invalid: {
					type: "boolean",
					default: false,
					description: "校验失败态。"
				},
				fullWidth: {
					type: "boolean",
					default: false,
					description: "是否撑满父容器宽度。"
				},
				placeholder: {
					type: "string",
					default: "Pick a fruit",
					placeholder: "占位文案",
					description: "空值占位文案。"
				}
			},
			render: (props) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(SelectPage, {
				size: props.size,
				disabled: props.disabled,
				invalid: props.invalid,
				fullWidth: props.fullWidth,
				placeholder: props.placeholder
			}),
			renderVariants: () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(SelectVariants, {}),
			sampleCode: `import { Select } from '@genie/agent-ui/foundation';

<Select
  allowClear
  options={[
    { value: 'apple', label: '苹果' },
    { value: 'banana', label: '香蕉' },
  ]}
  onChange={v => console.log(v)}
/>`
		},
		{
			id: "cascader",
			title: "Cascader",
			section: "components",
			description: "级联选择器（fork cascader-shadcn 适配 wb 设计系统）；多列并排（expandedPath 驱动），展开路径与选中路径分离，选到叶子才提交。底层复用 Popover（PC）/ Drawer（窄屏），图标走 foundation Icon，支持 allowClear / expandTrigger / displayRender / 受控非受控。典型场景：省市区级联（含直辖市省→区两级特例）。",
			schema: {
				disabled: {
					type: "boolean",
					default: false,
					description: "整体禁用。"
				},
				allowClear: {
					type: "boolean",
					default: true,
					description: "有值时触发器右侧 ▾ 变为 × 清除按钮。"
				},
				expandTrigger: {
					type: "select",
					options: ["click", "hover"],
					default: "click",
					typeLabel: "'click' | 'hover'",
					description: "展开下级的触发方式；hover 适合层级深、快速浏览的场景。"
				},
				fullWidth: {
					type: "boolean",
					default: false,
					description: "触发器是否撑满父容器宽度。"
				},
				placeholder: {
					type: "string",
					default: "请选择地区",
					placeholder: "占位文案",
					description: "空值占位文案。"
				}
			},
			render: (props) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(CascaderPage, {
				size: props.size,
				disabled: props.disabled,
				invalid: props.invalid,
				multiple: props.multiple,
				showSearch: props.showSearch,
				changeOnSelect: props.changeOnSelect,
				placeholder: props.placeholder
			}),
			renderVariants: () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(CascaderVariants, {}),
			sampleCode: `import { AddressCascader } from '@genie/agent-ui/poiAddress/components/AddressCascader';

<AddressCascader
  allowClear
  options={[
    {
      value: 'zhejiang',
      label: '浙江',
      children: [
        { value: 'hangzhou', label: '杭州', children: [
          { value: 'xihu', label: '西湖区' },
        ] },
      ],
    },
  ]}
  onChange={(value, options) => console.log(value, options)}
/>`
		},
		{
			id: "poi-dialog",
			title: "PoiDialog",
			section: "components",
			description: "对话流位置流程（genie#52769 阶段四）：授权卡 / 地址单选卡 / 内嵌表单卡 / 错误弹层 / 结果卡片，由 usePoiFlow 状态机串联（授权 → IP 定位 → 表单 → 终态）。数据走 Mock，阶段五接后端。",
			schema: {},
			render: () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(PoiDialogPage, {}),
			renderVariants: () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(PoiDialogVariants, {}),
			sampleCode: `import { usePoiFlow, PoiAuthCard, PoiLocationFormCard } from '@genie/agent-ui/.../poi/dialog';

const flow = usePoiFlow({ service, onComplete: result => {/* PoiToolResult */} });
flow.start(); // → ask_auth / ask_use_saved / ip_locating`
		},
		{
			id: "message",
			title: "Message",
			section: "components",
			description: "全局 toast（imperative API）。v0.2 起转发到 @genie/cb-chat-ui 的 toast，不再维护内联 Message。",
			schema: {
				tone: {
					type: "select",
					options: [
						"success",
						"info",
						"warning",
						"error"
					],
					default: "info",
					description: "语义色；与系统状态色对齐。"
				},
				body: {
					type: "string",
					default: "这是一条 toast",
					placeholder: "内容",
					description: "toast 文案。"
				}
			},
			render: (props) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(MessagePage, {
				tone: props.tone,
				title: "",
				body: props.body
			}),
			renderVariants: () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(MessageVariants, {}),
			sampleCode: `import { message } from '@genie/agent-ui/foundation';

// 全局 toast：容器由 cb-chat-ui 自动注入，无需手动挂载
message.success('已保存');
message.error('Something went wrong');

// 返回 close 函数；duration=0 表示不自动消失
const close = message.info('上传中…', 0);
// close();`
		},
		{
			id: "switch",
			title: "Switch",
			section: "components",
			description: "开关（v0.2 对齐 antd Switch 公开 API 子集）；基于原生 input[type=\"checkbox\"]，复用 keyboard / focus / ARIA；支持 loading 状态。",
			schema: {
				size: {
					type: "select",
					options: ["small", "medium"],
					default: "medium",
					description: "尺寸；列表行内一般用 small。"
				},
				disabled: {
					type: "boolean",
					default: false,
					description: "禁用状态。"
				},
				label: {
					type: "string",
					default: "启用通知",
					placeholder: "标签",
					description: "右侧文字标签；点击文字也会切换。"
				}
			},
			render: (props) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(SwitchPage, {
				size: props.size,
				disabled: props.disabled,
				label: props.label
			}),
			renderVariants: () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(SwitchVariants, {}),
			sampleCode: `import { Switch } from '@genie/agent-ui/foundation';

<Switch label="启用通知" defaultChecked />`
		},
		{
			id: "color-picker",
			title: "ColorPicker",
			section: "components",
			description: "通用色盘（网格选色）；纯泛化，色值由调用方通过 colors 传入，foundation 只负责渲染色块 + 选中态 + 无障碍。业务标签色盘从 @tencent/xtable-common 拼装后传入。",
			schema: {
				columns: {
					type: "select",
					options: [
						"6",
						"9",
						"12"
					],
					default: "9",
					description: "每行列数；标签色盘为 9 列（3×9 = 27 色）。"
				},
				swatchSize: {
					type: "select",
					options: [
						"16",
						"20",
						"24",
						"28"
					],
					default: "20",
					description: "单个色块尺寸（px）。"
				},
				disabled: {
					type: "boolean",
					default: false,
					description: "禁用整个色盘。"
				}
			},
			render: (props) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ColorPickerPage, {
				columns: Number(props.columns),
				swatchSize: Number(props.swatchSize),
				disabled: props.disabled
			}),
			renderVariants: () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ColorPickerVariants, {}),
			sampleCode: `import { ColorPicker } from '@genie/agent-ui/foundation';

<ColorPicker
  colors={[{ value: 1, color: '#d8f5e3', title: '浅绿' }]}
  value={1}
  onChange={(v) => console.log(v)}
/>`
		},
		{
			id: "checkbox",
			title: "Checkbox",
			section: "components",
			description: "复选框（v0.2 对齐 antd Checkbox 公开 API 子集）；基于原生 input[type=\"checkbox\"]，支持受控/非受控 + indeterminate 半选 + 两档尺寸。为 Table rowSelection 铺路。",
			schema: {
				size: {
					type: "select",
					options: ["small", "medium"],
					default: "medium",
					description: "尺寸；表格行内一般用 small（14×14），其它场景用 medium（16×16）。"
				},
				disabled: {
					type: "boolean",
					default: false,
					description: "禁用状态。"
				},
				indeterminate: {
					type: "boolean",
					default: false,
					description: "半选态：方框内显示横线，仅视觉态、不改变 checked 实际值。常用于树形 / 表格全选表头。"
				},
				label: {
					type: "string",
					default: "同意《用户协议》",
					placeholder: "标签",
					description: "右侧文字标签；点击文字也会切换。"
				}
			},
			render: (props) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(CheckboxPage, {
				size: props.size,
				disabled: props.disabled,
				indeterminate: props.indeterminate,
				label: props.label
			}),
			renderVariants: () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(CheckboxVariants, {}),
			sampleCode: `import { Checkbox } from '@genie/agent-ui/foundation';

<Checkbox label="同意《用户协议》" defaultChecked />

{/* 表格全选表头：父子联动 */}
<Checkbox
  checked={allChecked}
  indeterminate={!allChecked && someChecked}
  onChange={e => toggleAll(e.target.checked)}
  label="全选"
/>`
		},
		{
			id: "tabs",
			title: "Tabs",
			section: "components",
			description: "标签页（v0.2 视觉对齐 ardot 229:23）：选中加粗 12/600 + 24×3 居中 indicator；非选中 12/400 黑 76%。受控/非受控、keyboard a11y（Left/Right/Home/End）。设计稿未给 variant / size / fullWidth，已从类型签名移除，详见 docs/tabs-design-gaps.md。",
			schema: {
				itemCount: {
					type: "select",
					options: [
						"2",
						"3",
						"4"
					],
					default: "3",
					typeLabel: "演示参数（驱动 items 长度）",
					description: "演示 items 数量；切换时观察 ink-bar 在不同布局下的滑动表现。"
				},
				disabledIndex: {
					type: "select",
					options: [
						"none",
						"0",
						"1",
						"2",
						"3"
					],
					default: "none",
					typeLabel: "演示参数（驱动 items[i].disabled）",
					description: "把第 N 个 item 设为 disabled。配合键盘 Left/Right 验证是否会跳过被禁用项。取值 'none' 表示不禁用；超出 itemCount 时自动忽略。"
				},
				defaultActive: {
					type: "select",
					options: [
						"first",
						"middle",
						"last"
					],
					default: "first",
					typeLabel: "演示参数（驱动 defaultActiveKey）",
					description: "初始选中位置（语义档位）。Tabs 真实 prop 是 defaultActiveKey: string，这里仅做语义化映射。"
				},
				withPanel: {
					type: "boolean",
					default: true,
					typeLabel: "演示参数（驱动 items[i].children）",
					description: "是否渲染面板内容（即给 items 配 children）。关闭后只展示 tab 头，验证「无 panel」用法。"
				}
			},
			render: (props) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(TabsPage, {
				itemCount: Number(props.itemCount),
				disabledIndex: props.disabledIndex,
				defaultActive: props.defaultActive,
				withPanel: props.withPanel
			}),
			renderVariants: () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(TabsVariants, {}),
			sampleCode: `import { Tabs } from '@genie/agent-ui/foundation';

<Tabs
  items={[
    { key: 'overview', label: '概览', children: <Overview /> },
    { key: 'detail', label: '详情', children: <Detail /> },
  ]}
  onChange={key => console.log(key)}
/>`
		},
		{
			id: "segmented",
			title: "Segmented",
			section: "components",
			description: "分段控件（单选）；用于工具栏切换状态值，没有 panel 区，视觉上是一组紧贴的胶囊。",
			schema: {
				size: {
					type: "select",
					options: ["small", "medium"],
					default: "medium",
					description: "尺寸；与 Tabs 对齐。"
				},
				fullWidth: {
					type: "boolean",
					default: false,
					description: "是否撑满父容器宽度。"
				},
				disabled: {
					type: "boolean",
					default: false,
					description: "整体禁用。"
				}
			},
			render: (props) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(SegmentedPage, {
				size: props.size,
				fullWidth: props.fullWidth,
				disabled: props.disabled
			}),
			renderVariants: () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(SegmentedVariants, {}),
			sampleCode: `import { Segmented } from '@genie/agent-ui/foundation';

<Segmented
  options={[
    { value: 'day', label: '日' },
    { value: 'week', label: '周' },
    { value: 'month', label: '月' },
  ]}
  defaultValue='week'
  onChange={v => console.log(v)}
/>`
		},
		{
			id: "table",
			title: "Table",
			section: "components",
			description: "数据表格；columns + dataSource 配置式，支持可排序列 / loading / empty / 行点击 / compact 密度。",
			schema: {
				size: {
					type: "select",
					options: ["default", "compact"],
					default: "default",
					description: "行高 / 内边距密度。"
				},
				striped: {
					type: "boolean",
					default: false,
					description: "斑马纹；偶数行不同底色。"
				},
				hover: {
					type: "boolean",
					default: true,
					description: "鼠标悬停高亮。"
				},
				bordered: {
					type: "boolean",
					default: false,
					description: "是否显示外边框。"
				},
				loading: {
					type: "boolean",
					default: false,
					description: "加载中：空数据时占位文案改为 Loading...，有数据时叠加半透明 spinner。"
				}
			},
			render: (props) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(TablePage, {
				size: props.size,
				striped: props.striped,
				hover: props.hover,
				bordered: props.bordered,
				loading: props.loading
			}),
			renderVariants: () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(TableVariants, {}),
			sampleCode: `import { Table, type TableColumn } from '@genie/agent-ui/foundation';

interface User { id: number; name: string; role: string }

const columns: TableColumn<User>[] = [
  { key: 'id', title: 'ID', dataIndex: 'id', sortable: true, width: 64, align: 'right' },
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'role', title: 'Role', dataIndex: 'role' },
];

<Table<User>
  columns={columns}
  dataSource={users}
  rowKey='id'
  bordered
/>`
		},
		{
			id: "breadcrumb",
			title: "Breadcrumb",
			section: "components",
			description: "面包屑导航（v0.2 设计稿对齐 ardot 674:548）：items 配置 + 自定义 separator + 可选 leadingIcon。视觉钉死单一形态：项 / 分隔符 / icon 统一黑 65%，14/22。详见组件页内\"能力缺口\"。",
			schema: {
				levels: {
					type: "select",
					options: [
						"1",
						"2",
						"3"
					],
					default: "2",
					typeLabel: "1 | 2 | 3",
					description: "演示层级数。设计稿动态/计划/任务 1 层；子任务变体 2 层；3 层为扩展演示。"
				},
				separator: {
					type: "select",
					options: [
						"/",
						"›",
						">",
						"|"
					],
					default: "/",
					typeLabel: "ReactNode",
					description: "分隔符。设计稿默认 '/'；可切换为 '›'/'>'/任意 ReactNode。"
				},
				leadingIcon: {
					type: "boolean",
					default: false,
					typeLabel: "ReactNode",
					description: "首项前的 16×16 图标槽位。设计稿默认 visible=false；开启时演示一个 folder svg。"
				},
				interactive: {
					type: "boolean",
					default: true,
					description: "前 N-1 项是否传 href（变成可点击链接）。最后一项始终为当前页文本。"
				},
				highlightLast: {
					type: "boolean",
					default: false,
					typeLabel: "boolean",
					description: "末项是否加深（黑 96%，复用 --wb-text-strong）。对齐 ardot 368:1544 交互稿；其它项 / 分隔符 / icon 仍为黑 65%。"
				}
			},
			render: (props) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(BreadcrumbPage, {
				levels: Number(props.levels),
				separator: props.separator,
				leadingIcon: props.leadingIcon,
				interactive: props.interactive,
				highlightLast: props.highlightLast
			}),
			renderVariants: () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(BreadcrumbVariants, {}),
			sampleCode: `import { Breadcrumb } from '@genie/agent-ui/foundation';

<Breadcrumb
  items={[
    { key: 'p', label: '项目', href: '/projects' },
    { key: 'd', label: '设计系统全流程周期' },
  ]}
/>`
		},
		{
			id: "tooltip",
			title: "Tooltip",
			section: "components",
			description: "工具提示（薄包装 cb-chat-ui Tooltip）；hover + focus 触发，4 主方向自动 flip，支持 maxWidth / textAlign / interactive（safePolygon）/ noPadding。content 为 falsy 时直接返回 children 不渲染浮层，可用于「省略号才提示」模式。",
			schema: {
				placement: {
					type: "select",
					options: [
						"top",
						"bottom",
						"left",
						"right"
					],
					default: "top",
					typeLabel: "'top' | 'bottom' | 'left' | 'right'",
					description: "浮层位置（4 主方向，与 cb-chat-ui 一致）；视口空间不够时自动 flip 到反向。"
				},
				interactive: {
					type: "boolean",
					default: false,
					description: "是否启用 safePolygon —— 鼠标可沿安全区域移到浮层上点击。仅在浮层内有可点击元素时开启。"
				},
				noPadding: {
					type: "boolean",
					default: false,
					description: "去掉默认内边距，用于自带 padding 的复杂内容（如卡片片段 / 图片预览）。"
				},
				delay: {
					type: "select",
					options: [
						"0",
						"150",
						"300",
						"500",
						"800"
					],
					default: "300",
					typeLabel: "演示参数（驱动 delay 数值）",
					description: "hover 进入到显示的延迟（毫秒）。密集列表用更长 delay 防止反复弹出。"
				},
				maxWidth: {
					type: "select",
					options: [
						"0",
						"160",
						"200",
						"320"
					],
					default: "0",
					typeLabel: "演示参数（驱动 maxWidth 数值，0 表示不限制）",
					description: "最大宽度（px）；长内容场景必传，0 表示不限制。"
				},
				textAlign: {
					type: "select",
					options: [
						"left",
						"center",
						"right"
					],
					default: "center",
					description: "浮层内文字水平对齐方式。"
				},
				label: {
					type: "string",
					default: "Hover me",
					placeholder: "Trigger 文案",
					description: "触发器按钮文案（仅 Playbook 用于驱动 children）。"
				},
				content: {
					type: "string",
					default: "完整文件路径 /path/to/file.txt",
					placeholder: "提示内容",
					description: "提示内容文案。空串时组件直接 return children 不渲染浮层（\"省略号才提示\"模式）。"
				}
			},
			render: (props) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(TooltipPage, {
				placement: props.placement,
				interactive: props.interactive,
				noPadding: props.noPadding,
				delay: Number(props.delay),
				maxWidth: Number(props.maxWidth),
				textAlign: props.textAlign,
				label: props.label,
				content: props.content
			}),
			renderVariants: () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(TooltipVariants, {}),
			sampleCode: `import { Tooltip } from '@genie/agent-ui/foundation';

<Tooltip content="完整文件路径 /path/to/file.txt">
  <span>file.txt</span>
</Tooltip>

{/* 仅当内容溢出时才显示：falsy content 直接 return children */}
<Tooltip content={isOverflow ? label : undefined}>
  <span>{label}</span>
</Tooltip>`
		},
		{
			id: "progress",
			title: "Progress",
			section: "components",
			description: "进度条 / 容量条（v0.2 设计稿对齐 ardot 368:1544;368:380）：高 4px / 直角 / 黑 96% 填充。同一组件兼顾\"容量条（neutral/square）\"和\"上传进度（brand/square）\"两种业务形态；不传 percent 走 indeterminate 左右滑动动画。详见组件页内\"能力缺口\"。",
			schema: {
				size: {
					type: "select",
					options: ["sm", "md"],
					default: "sm",
					typeLabel: "'sm' | 'md'",
					description: "尺寸；sm=4px（设计稿默认 / 容量条 / toast 进度），md=6px（更醒目）。"
				},
				tone: {
					type: "select",
					options: ["neutral", "brand"],
					default: "neutral",
					typeLabel: "'neutral' | 'brand'",
					description: "neutral=黑 96%（设计稿默认 / 中性\"用量\"），brand=品牌绿（强调\"进行中\"）。"
				},
				shape: {
					type: "select",
					options: ["square", "pill"],
					default: "square",
					typeLabel: "'square' | 'pill'",
					description: "square=直角（设计稿默认），pill=胶囊圆角（antd 风）。"
				},
				status: {
					type: "select",
					options: [
						"normal",
						"success",
						"error"
					],
					default: "normal",
					typeLabel: "'normal' | 'success' | 'error'",
					description: "状态色；优先级高于 tone。success/error 时百分比文字默认渲染 ✓ / ✕。"
				},
				showInfo: {
					type: "boolean",
					default: false,
					description: "是否显示右侧百分比文字。设计稿\"标题 + 上方 %\"由调用方自己拼，组件内不做。"
				},
				indeterminate: {
					type: "boolean",
					default: false,
					description: "未知进度模式（左右滑动动画）。开启后 percent 失效，\"无明确耗时\"场景使用。"
				},
				percent: {
					type: "select",
					options: [
						"0",
						"25",
						"50",
						"75",
						"100"
					],
					default: "50",
					typeLabel: "演示参数（驱动 percent 数值）",
					description: "当前进度（仅 indeterminate=false 时生效）。"
				}
			},
			render: (props) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ProgressPage, {
				size: props.size,
				tone: props.tone,
				shape: props.shape,
				status: props.status,
				showInfo: props.showInfo,
				indeterminate: props.indeterminate,
				percent: Number(props.percent)
			}),
			renderVariants: () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ProgressVariants, {}),
			sampleCode: `import { Progress } from '@genie/agent-ui/foundation';

{/* 设计稿默认形态：容量条 */}
<Progress percent={62} />

{/* 上传进度：品牌色 + 右侧百分比 */}
<Progress percent={42} tone='brand' showInfo />

{/* 未知进度：左右滑动 */}
<Progress indeterminate tone='brand' />

{/* 完成 / 失败 */}
<Progress percent={100} status='success' showInfo />
<Progress percent={64} status='error' showInfo />`
		},
		{
			id: "skill-recommend-bar",
			title: "SkillRecommendBar",
			section: "components",
			description: "Pre-send 技能推荐 bar（OpenSpec change `add-skill-pre-send-recommend`）。挂在 chat input 上方 BottomSlotPositions.ABOVE_INPUT 槽位，根据父级 hook 提供的快照在 loading / 1~2 候选 / 静默不渲染 之间切换；不持有任何 RPC / 计时器。",
			schema: {
				isLoading: {
					type: "boolean",
					default: false,
					description: "loading 态：双 chip 骨架。控时（min 600ms / max 2500ms）由父级 hook 决定。"
				},
				candidateCount: {
					type: "select",
					options: [
						"0",
						"1",
						"2"
					],
					default: "2",
					typeLabel: "0 | 1 | 2",
					description: "候选数；0 时 bar 不渲染（防御性 null）。PRD 上限为 2。"
				},
				installingFirst: {
					type: "boolean",
					default: false,
					description: "模拟\"第 1 个 chip 已被采纳并触发静默 install\"：chip 降透明 + spinner，禁用重复点击。"
				}
			},
			render: (props) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(SkillRecommendBarPage, {
				isLoading: props.isLoading,
				candidateCount: Number(props.candidateCount),
				installingFirst: props.installingFirst
			}),
			renderVariants: () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(SkillRecommendBarVariants, {}),
			sampleCode: `import { SkillRecommendBar } from '@genie/agent-ui';

{/* 父级 hook 决定 isLoading / candidates / 错误降级时直接不挂 */}
<SkillRecommendBar
  isLoading={state.kind === 'loading'}
  candidates={state.kind === 'showing' ? state.candidates : []}
  onAdopt={(id) => hook.adopt(id)}
  onDismiss={() => hook.dismiss()}
/>`
		},
		{
			id: "notification",
			title: "Notification",
			section: "components",
			description: "通用通知卡片（v0.2 设计稿对齐 ardot 686772472881246）：典型场景是渲染 msg-center 中 notify_displays 包含 \"in_app\" 的消息，也可复用于任意\"通知 / 公告 / 提醒卡片\"场景。actions 完全数据驱动（按 CLIENT_API.md §6.6 约定，最后一个自动主按钮、其余次按钮）；支持「查看详情」展开 + 长内容滚动。注：与 antd Notification（imperative toast API）同名但定位不同——本组件是声明式卡片形态；imperative 短时 toast 请用 foundation 已有的 Message。",
			schema: {
				actionsCount: {
					type: "select",
					options: [
						"0",
						"1",
						"2"
					],
					default: "2",
					typeLabel: "演示参数（驱动 data.actions 数量）",
					description: "操作按钮数量。actions 完全数据驱动：0=纯通知 / 1=仅 ack / 2=view_detail + ack。最后一个 action 自动渲染为 primary 按钮。"
				},
				hasContent: {
					type: "boolean",
					default: true,
					typeLabel: "演示参数（驱动 data.content 是否传入）",
					description: "是否提供 content。提供后才会显示「查看详情 / 收起」切换。"
				},
				expandable: {
					type: "boolean",
					default: true,
					description: "是否允许展开「查看详情」。即便 hasContent=true，也可显式禁用展开。"
				},
				closable: {
					type: "boolean",
					default: true,
					typeLabel: "演示参数（驱动是否传 onClose）",
					description: "是否显示右上角关闭 X。组件内部不维护 close 态，业务层在回调里自行卸载。"
				}
			},
			render: (props) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(NotificationPage, {
				actionsCount: props.actionsCount,
				hasContent: props.hasContent,
				closable: props.closable,
				expandable: props.expandable
			}),
			renderVariants: () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(NotificationVariants, {}),
			sampleCode: `import { Notification } from '@genie/agent-ui/foundation';

// 业务侧把 msg-center API 响应 map 成 NotificationData 子集后传入
<Notification
  data={{
    msgId: msg.msg_id,
    title: msg.title,
    summary: msg.summary,
    content: msg.content,
    actions: msg.actions, // [{ key, text, url? }]
  }}
  expandText="查看详情"
  collapseText="收起"
  closeAriaLabel="关闭"
  onActionClick={action => {
    if (action.key === 'view_detail' && action.url) {
      window.open(action.url, '_blank', 'noopener,noreferrer');
    } else if (action.key === 'ack') {
      dismiss(msg.msg_id);
    }
  }}
  onClose={() => dismiss(msg.msg_id)}
/>`
		},
		{
			id: "cascader",
			title: "Cascader",
			section: "components",
			description: "级联选择器：多列联动 + 可选搜索 + 单选/多选；数据源可切换（CascaderDataSource），内置中国行政区数据。",
			schema: {
				size: {
					type: "select",
					options: [
						"small",
						"medium",
						"large"
					],
					default: "medium",
					description: "尺寸；与 Select / Input 对齐。"
				},
				disabled: {
					type: "boolean",
					default: false,
					description: "禁用状态。"
				},
				invalid: {
					type: "boolean",
					default: false,
					description: "校验失败态。"
				},
				multiple: {
					type: "boolean",
					default: false,
					description: "是否多选；多选时触发器以 Tag 列表展示，叶子节点可勾选。"
				},
				showSearch: {
					type: "boolean",
					default: false,
					description: "是否启用搜索；启用后浮层顶部出现搜索框，按 dataSource.search 过滤。"
				},
				changeOnSelect: {
					type: "boolean",
					default: true,
					description: "任意层级是否可选；默认 true，省/市/区任一级都能被选中。关掉则只有叶子可选。"
				},
				placeholder: {
					type: "string",
					default: "请选择省/市/区",
					placeholder: "占位文案",
					description: "空值占位文案。"
				}
			},
			render: (props) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(CascaderPage, {
				size: props.size,
				disabled: props.disabled,
				invalid: props.invalid,
				multiple: props.multiple,
				showSearch: props.showSearch,
				changeOnSelect: props.changeOnSelect,
				placeholder: props.placeholder
			}),
			renderVariants: () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(CascaderVariants, {}),
			sampleCode: `import { Cascader, buildStaticDataSource } from '@genie/agent-ui/foundation';
import { chinaRegionDataSource } from '@genie/agent-ui/foundation';

// 中国行政区，任意层级可选（默认 changeOnSelect=true）
<Cascader
  dataSource={chinaRegionDataSource}
  showSearch
  onChange={path => console.log(path)}
/>

// 多选 + 跨级混合
<Cascader
  multiple
  dataSource={chinaRegionDataSource}
  onChange={paths => console.log(paths)}
/>

// 严格叶子选中
<Cascader
  changeOnSelect={false}
  dataSource={chinaRegionDataSource}
/>

// 自定义层级数据
const ds = buildStaticDataSource(myTree);
<Cascader dataSource={ds} />`
		},
		{
			id: "region-picker",
			title: "RegionPicker",
			section: "components",
			description: "中国行政区选择器（开箱即用）：基于 Cascader 包一层，预绑定 chinaRegionDataSource，默认开启 showSearch / allowClear / changeOnSelect；提供扁平回调 onChangeFlat（拆出 province/city/district）。若需要别的层级数据，请直接用通用 Cascader + 自定义 dataSource。",
			schema: {
				size: {
					type: "select",
					options: [
						"small",
						"medium",
						"large"
					],
					default: "medium",
					description: "尺寸；与 Select / Input / Cascader 对齐。"
				},
				disabled: {
					type: "boolean",
					default: false,
					description: "禁用状态。"
				},
				invalid: {
					type: "boolean",
					default: false,
					description: "校验失败态。"
				},
				multiple: {
					type: "boolean",
					default: false,
					description: "是否多选。"
				},
				showSearch: {
					type: "boolean",
					default: true,
					description: "是否启用搜索（默认开启，地区搜索友好）。"
				},
				allowClear: {
					type: "boolean",
					default: true,
					description: "是否允许清除（默认开启）。"
				},
				placeholder: {
					type: "string",
					default: "请选择省/市/区",
					placeholder: "占位文案",
					description: "空值占位文案。"
				}
			},
			render: (props) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(RegionPickerPage, {
				size: props.size,
				disabled: props.disabled,
				invalid: props.invalid,
				multiple: props.multiple,
				showSearch: props.showSearch,
				allowClear: props.allowClear,
				placeholder: props.placeholder
			}),
			renderVariants: () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(RegionPickerVariants, {}),
			sampleCode: `import { RegionPicker } from '@genie/agent-ui/foundation';

// 单选：开箱即用
<RegionPicker onChange={path => console.log(path)} />

// 扁平回调：直接拆出 province / city / district
<RegionPicker
  onChangeFlat={v => {
    if (!v) { return; }
    form.setFieldsValue({
      province: v.province,
      city: v.city,
      district: v.district,
      codes: v.codes,
    });
  }}
/>

// 多选
<RegionPicker
  multiple
  onChangeFlat={vs => console.log(vs)}
/>`
		}
	];
}));
//#endregion
//#region ../../packages/agent-ui/src/playbook/PlaybookApp.tsx
/** Playbook 主入口 —— 由 PlaybookApp.tsx 默认导出 */
function PlaybookApp() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: layoutStyle,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaybookSidebar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			style: mainStyle,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Routes, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
					index: true,
					element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaybookHome, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
					path: ":section/:id",
					element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaybookFrame, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
					path: "*",
					element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
						to: "/playbook",
						replace: true
					})
				})
			] })
		})]
	});
}
function PlaybookSidebar() {
	const navigate = useNavigate();
	const location = useLocation();
	const grouped = (0, import_react.useMemo)(() => groupEntriesBySection(), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
		style: sidebarStyle,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: sidebarTitleStyle,
				children: "WB Playbook"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeSwitcher, {}),
			Object.keys(grouped).map((section) => {
				const entries = grouped[section];
				if (entries.length === 0) return null;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					style: sectionBlockStyle,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: sectionHeadingStyle,
						children: SECTION_TITLE[section]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						style: listStyle,
						children: entries.map((entry) => {
							const path = `/playbook/${section}/${entry.id}`;
							const isActive = location.pathname === path;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavItem, {
								label: entry.title,
								active: isActive,
								onClick: () => navigate(path)
							}) }, entry.id);
						})
					})]
				}, section);
			})
		]
	});
}
function NavItem({ label, active, onClick }) {
	const [hover, setHover] = (0, import_react.useState)(false);
	const style = {
		...navItemStyle,
		background: active ? "var(--wb-bg-tertiary)" : hover ? "var(--wb-bg-hover)" : "transparent",
		color: "var(--wb-color-text-primary)",
		fontWeight: active ? "var(--wb-font-body-strong-weight)" : "normal"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-current": active ? "page" : void 0,
		style,
		onClick,
		onMouseEnter: () => setHover(true),
		onMouseLeave: () => setHover(false),
		children: label
	});
}
/**
* Playbook 主题切换器 —— 复用 utils/useTheme 真源
*
* 用 foundation 的 Segmented 做两档（Light / Dark），
* 直接驱动全局 ThemeManager.setTheme()。Auto（跟随系统）已下线。
*
* 视觉变化生效路径（不需要额外改 DOM）：
*   setTheme('dark') → ThemeManager 给 body 加
*     data-vscode-theme-name="IDE Night" + class="dark cb-dark vscode-dark"
*   foundation/tokens/colors.scss 的 `body[data-vscode-theme-name="IDE Night"]`
*   规则块命中，所有 --wb-* 切到 dark token，整个 Playbook 同步变色
*/
function ThemeSwitcher() {
	const { theme, setTheme } = useTheme();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: themeSwitcherWrapStyle,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: sectionHeadingStyle,
			children: "Theme"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segmented, {
			size: "small",
			fullWidth: true,
			value: theme === "dark" ? "dark" : "light",
			onChange: setTheme,
			options: [{
				value: "light",
				label: "Light"
			}, {
				value: "dark",
				label: "Dark"
			}],
			"aria-label": "Toggle Playbook theme"
		})]
	});
}
function PlaybookHome() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: { color: "var(--wb-color-text-primary)" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				style: {
					fontSize: "var(--wb-font-display-size)",
					lineHeight: "var(--wb-font-display-line-height)",
					margin: 0
				},
				children: "Foundation Playbook"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				style: {
					color: "var(--wb-color-text-secondary)",
					marginTop: "var(--wb-spacing-4)"
				},
				children: "左侧选择 Token 或 Component 查看真实视觉。本路由仅在 dev/staging 启用，生产构建会被 tree-shake。"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				style: {
					color: "var(--wb-color-text-tertiary)",
					marginTop: "var(--wb-spacing-3)"
				},
				children: ["当前注册条目：", playbookEntries.length]
			})
		]
	});
}
function PlaybookFrame() {
	const params = useParams();
	const entry = (0, import_react.useMemo)(() => playbookEntries.find((e) => e.section === params.section && e.id === params.id), [params.section, params.id]);
	if (!entry) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		to: "/playbook",
		replace: true
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaybookFrameInner, { entry }, `${entry.section}/${entry.id}`);
}
function PlaybookFrameInner({ entry }) {
	const [propsValue, setPropsValue] = (0, import_react.useState)(() => getDefaultValuesFromSchema(entry.schema));
	const handleChange = (0, import_react.useCallback)((next) => {
		setPropsValue(next);
	}, []);
	const hasSchema = Object.keys(entry.schema).length > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: frameStyle,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				style: { gridArea: "header" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					style: {
						margin: 0,
						fontSize: "var(--wb-font-h1-size)",
						lineHeight: "var(--wb-font-h1-line-height)",
						color: "var(--wb-color-text-primary)"
					},
					children: entry.title
				}), entry.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					style: {
						margin: "var(--wb-spacing-2) 0 0",
						color: "var(--wb-color-text-secondary)",
						fontSize: "var(--wb-font-body-size)",
						lineHeight: "var(--wb-font-body-line-height)"
					},
					children: entry.description
				})]
			}),
			entry.renderVariants && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				style: variantsStyle,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, { children: "Variants 一览" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: entry.renderVariants() })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				style: previewStyle,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, { children: "实时调试" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: entry.render(propsValue) })]
			}),
			hasSchema && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				style: asideStyle,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, { children: "Props" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropsPanel, {
					schema: entry.schema,
					value: propsValue,
					onChange: handleChange
				})]
			}),
			hasSchema && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				style: propsTableStyle,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, { children: "属性说明" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropsTable, { schema: entry.schema })]
			}),
			entry.sampleCode && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
				style: codeStyle,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
					style: { fontFamily: "monospace" },
					children: entry.sampleCode
				})
			})
		]
	});
}
function SectionHeading({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		style: {
			margin: "0 0 var(--wb-spacing-3)",
			fontSize: "var(--wb-font-h3-size)",
			color: "var(--wb-color-text-primary)"
		},
		children
	});
}
var import_react, import_jsx_runtime, SECTION_TITLE, layoutStyle, sidebarStyle, sidebarTitleStyle, sectionBlockStyle, themeSwitcherWrapStyle, sectionHeadingStyle, listStyle, navItemStyle, mainStyle, frameStyle, variantsStyle, previewStyle, asideStyle, propsTableStyle, codeStyle;
//#endregion
__esmMin((() => {
	init_tokens();
	init_cb_bridge();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_dist();
	init_Segmented();
	init_useTheme();
	init_PropsPanel();
	init_playbook_registry();
	import_jsx_runtime = require_jsx_runtime();
	SECTION_TITLE = {
		tokens: "Tokens",
		components: "Components"
	};
	layoutStyle = {
		display: "flex",
		minHeight: "100vh",
		background: "var(--wb-bg-primary)",
		color: "var(--wb-color-text-primary)"
	};
	sidebarStyle = {
		width: 240,
		flexShrink: 0,
		borderRight: "1px solid var(--wb-border-default)",
		padding: "var(--wb-spacing-5)",
		background: "var(--wb-bg-secondary)",
		position: "sticky",
		top: 0,
		height: "100vh",
		overflowY: "auto"
	};
	sidebarTitleStyle = {
		fontSize: "var(--wb-font-h2-size)",
		fontWeight: "var(--wb-font-h2-weight)",
		marginBottom: "var(--wb-spacing-5)"
	};
	sectionBlockStyle = { marginBottom: "var(--wb-spacing-5)" };
	themeSwitcherWrapStyle = {
		marginBottom: "var(--wb-spacing-5)",
		display: "flex",
		flexDirection: "column",
		gap: "var(--wb-spacing-2)"
	};
	sectionHeadingStyle = {
		fontSize: "var(--wb-font-caption-size)",
		color: "var(--wb-color-text-tertiary)",
		textTransform: "uppercase",
		letterSpacing: 1,
		marginBottom: "var(--wb-spacing-2)"
	};
	listStyle = {
		listStyle: "none",
		padding: 0,
		margin: 0,
		display: "flex",
		flexDirection: "column",
		gap: "var(--wb-spacing-1)"
	};
	navItemStyle = {
		width: "100%",
		textAlign: "left",
		padding: "6px 8px",
		border: "none",
		background: "transparent",
		color: "var(--wb-color-text-primary)",
		cursor: "pointer",
		borderRadius: "var(--wb-radius-sm)",
		fontSize: "var(--wb-font-body-size)"
	};
	mainStyle = {
		flex: 1,
		minWidth: 0,
		padding: "var(--wb-spacing-7)",
		overflow: "hidden"
	};
	frameStyle = {
		display: "grid",
		gridTemplateColumns: "1fr 280px",
		gridTemplateAreas: "'header header' 'variants variants' 'preview aside' 'propsTable propsTable' 'code code'",
		gap: "var(--wb-spacing-5)"
	};
	variantsStyle = {
		gridArea: "variants",
		padding: "var(--wb-spacing-5)",
		background: "var(--wb-bg-secondary)",
		border: "1px solid var(--wb-border-default)",
		borderRadius: "var(--wb-radius-md)",
		overflow: "hidden"
	};
	previewStyle = {
		gridArea: "preview",
		padding: "var(--wb-spacing-5)",
		background: "var(--wb-bg-secondary)",
		border: "1px solid var(--wb-border-default)",
		borderRadius: "var(--wb-radius-md)",
		overflow: "hidden"
	};
	asideStyle = {
		gridArea: "aside",
		padding: "var(--wb-spacing-5)",
		background: "var(--wb-bg-secondary)",
		border: "1px solid var(--wb-border-default)",
		borderRadius: "var(--wb-radius-md)",
		height: "fit-content"
	};
	propsTableStyle = {
		gridArea: "propsTable",
		padding: "var(--wb-spacing-5)",
		background: "var(--wb-bg-secondary)",
		border: "1px solid var(--wb-border-default)",
		borderRadius: "var(--wb-radius-md)",
		overflow: "hidden"
	};
	codeStyle = {
		gridArea: "code",
		margin: 0,
		padding: "var(--wb-spacing-4)",
		background: "var(--wb-bg-tertiary)",
		border: "1px solid var(--wb-border-default)",
		borderRadius: "var(--wb-radius-md)",
		fontSize: "var(--wb-font-code-size)",
		lineHeight: "var(--wb-font-code-line-height)",
		color: "var(--wb-color-text-primary)",
		overflowX: "auto"
	};
}))();
export { PlaybookApp as default };
