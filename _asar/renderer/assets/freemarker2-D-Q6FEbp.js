import { n as __esmMin } from "./chunk-BRZcfu7K.js";
import { $ as init_inlayHintsContribution, A as init_wordOperations, At as init_bracketMatching, B as init_documentSemanticTokens, C as init_inspectTokens, Ct as init_codeActionContributions, D as init_contribution$1, Dt as init_inlineProgress, E as init_floatingMenu_contribution, Et as init_clipboard, F as init_tokenization, G as init_multicursor, H as init_rename, I as init_suggestInlineCompletions, J as init_links, K as init_middleScroll_contribution, L as init_stickyScrollContribution, M as init_unusualLineTerminators, Mt as init_diffEditor_contribution, N as init_unicodeHighlighter, Nt as init_codeEditorWidget, O as init_contribution, Ot as init_transpose, P as init_toggleTabFocusMode, Pt as init_coreCommands, Q as init_inPlaceReplace, R as init_smartSelect, S as init_standaloneHelpQuickAccess, St as init_codelensController, T as init_standaloneStrings, Tt as init_codicon, U as init_placeholderText_contribution, V as init_sectionHeaders, W as init_parameterHints, X as init_lineSelection, Y as init_linkedEditing, Z as init_insertFinalNewLine, _ as init_toggleHighContrast, _t as init_contextmenu, at as init_suggestController, b as init_standaloneGotoSymbolQuickAccess, bt as init_gotoError, ct as init_documentSymbols, dt as init_folding, et as init_indentation, ft as init_findController, g as languages, gt as init_cursorUndo, h as init_editor_api2, ht as init_dnd, it as init_inlineCompletions_contribution, j as init_wordHighlighter, jt as init_anchorSelect, k as init_wordPartOperations, kt as init_caretOperations, lt as init_formatActions, mt as init_copyPasteContribution, nt as init_gpuActions, ot as init_snippetController2, pt as init_dropIntoEditorContribution, q as init_longLinesHelper, rt as init_goToDefinitionAtPosition, st as init_linesOperations, tt as init_hoverContribution, ut as init_fontZoom, v as init_standaloneReferenceSearch, vt as init_comment, w as init_iPadShowKeyboard, wt as init_codicon_modifiers, x as init_standaloneGotoLineQuickAccess, xt as init_goToCommands, y as init_standaloneCommandsQuickAccess, yt as init_colorPickerContribution, z as init_viewportSemanticTokens } from "./editor.api2-Bx-U9mA4.js";
//#region ../../node_modules/monaco-editor/esm/vs/basic-languages/freemarker2/freemarker2.js
function createLangConfiguration(ts) {
	return {
		brackets: [
			["<", ">"],
			["[", "]"],
			["(", ")"],
			["{", "}"]
		],
		comments: { blockComment: [`${ts.open}--`, `--${ts.close}`] },
		autoCloseBefore: "\n\r	 }]),.:;=",
		autoClosingPairs: [
			{
				open: "{",
				close: "}"
			},
			{
				open: "[",
				close: "]"
			},
			{
				open: "(",
				close: ")"
			},
			{
				open: "\"",
				close: "\"",
				notIn: ["string"]
			},
			{
				open: "'",
				close: "'",
				notIn: ["string"]
			}
		],
		surroundingPairs: [
			{
				open: "\"",
				close: "\""
			},
			{
				open: "'",
				close: "'"
			},
			{
				open: "{",
				close: "}"
			},
			{
				open: "[",
				close: "]"
			},
			{
				open: "(",
				close: ")"
			},
			{
				open: "<",
				close: ">"
			}
		],
		folding: { markers: {
			start: new RegExp(`${ts.open}#(?:${BLOCK_ELEMENTS.join("|")})([^/${ts.close}]*(?!/)${ts.close})[^${ts.open}]*$`),
			end: new RegExp(`${ts.open}/#(?:${BLOCK_ELEMENTS.join("|")})[\\r\\n\\t ]*>`)
		} },
		onEnterRules: [{
			beforeText: new RegExp(`${ts.open}#(?!(?:${EMPTY_ELEMENTS.join("|")}))([a-zA-Z_]+)([^/${ts.close}]*(?!/)${ts.close})[^${ts.open}]*$`),
			afterText: new RegExp(`^${ts.open}/#([a-zA-Z_]+)[\\r\\n\\t ]*${ts.close}$`),
			action: { indentAction: languages.IndentAction.IndentOutdent }
		}, {
			beforeText: new RegExp(`${ts.open}#(?!(?:${EMPTY_ELEMENTS.join("|")}))([a-zA-Z_]+)([^/${ts.close}]*(?!/)${ts.close})[^${ts.open}]*$`),
			action: { indentAction: languages.IndentAction.Indent }
		}]
	};
}
function createLangConfigurationAuto() {
	return {
		brackets: [
			["<", ">"],
			["[", "]"],
			["(", ")"],
			["{", "}"]
		],
		autoCloseBefore: "\n\r	 }]),.:;=",
		autoClosingPairs: [
			{
				open: "{",
				close: "}"
			},
			{
				open: "[",
				close: "]"
			},
			{
				open: "(",
				close: ")"
			},
			{
				open: "\"",
				close: "\"",
				notIn: ["string"]
			},
			{
				open: "'",
				close: "'",
				notIn: ["string"]
			}
		],
		surroundingPairs: [
			{
				open: "\"",
				close: "\""
			},
			{
				open: "'",
				close: "'"
			},
			{
				open: "{",
				close: "}"
			},
			{
				open: "[",
				close: "]"
			},
			{
				open: "(",
				close: ")"
			},
			{
				open: "<",
				close: ">"
			}
		],
		folding: { markers: {
			start: new RegExp(`[<\\[]#(?:${BLOCK_ELEMENTS.join("|")})([^/>\\]]*(?!/)[>\\]])[^<\\[]*$`),
			end: new RegExp(`[<\\[]/#(?:${BLOCK_ELEMENTS.join("|")})[\\r\\n\\t ]*>`)
		} },
		onEnterRules: [{
			beforeText: new RegExp(`[<\\[]#(?!(?:${EMPTY_ELEMENTS.join("|")}))([a-zA-Z_]+)([^/>\\]]*(?!/)[>\\]])[^[<\\[]]*$`),
			afterText: new RegExp(`^[<\\[]/#([a-zA-Z_]+)[\\r\\n\\t ]*[>\\]]$`),
			action: { indentAction: languages.IndentAction.IndentOutdent }
		}, {
			beforeText: new RegExp(`[<\\[]#(?!(?:${EMPTY_ELEMENTS.join("|")}))([a-zA-Z_]+)([^/>\\]]*(?!/)[>\\]])[^[<\\[]]*$`),
			action: { indentAction: languages.IndentAction.Indent }
		}]
	};
}
function createMonarchLanguage(ts, is) {
	const id = `_${ts.id}_${is.id}`;
	const s = (name) => name.replace(/__id__/g, id);
	const r = (regexp) => {
		const source = regexp.source.replace(/__id__/g, id);
		return new RegExp(source, regexp.flags);
	};
	return {
		unicode: true,
		includeLF: false,
		start: s("default__id__"),
		ignoreCase: false,
		defaultToken: "invalid",
		tokenPostfix: `.freemarker2`,
		brackets: [
			{
				open: "{",
				close: "}",
				token: "delimiter.curly"
			},
			{
				open: "[",
				close: "]",
				token: "delimiter.square"
			},
			{
				open: "(",
				close: ")",
				token: "delimiter.parenthesis"
			},
			{
				open: "<",
				close: ">",
				token: "delimiter.angle"
			}
		],
		[s("open__id__")]: new RegExp(ts.open),
		[s("close__id__")]: new RegExp(ts.close),
		[s("iOpen1__id__")]: new RegExp(is.open1),
		[s("iOpen2__id__")]: new RegExp(is.open2),
		[s("iClose__id__")]: new RegExp(is.close),
		[s("startTag__id__")]: r(/(@open__id__)(#)/),
		[s("endTag__id__")]: r(/(@open__id__)(\/#)/),
		[s("startOrEndTag__id__")]: r(/(@open__id__)(\/?#)/),
		[s("closeTag1__id__")]: r(/((?:@blank)*)(@close__id__)/),
		[s("closeTag2__id__")]: r(/((?:@blank)*\/?)(@close__id__)/),
		blank: /[ \t\n\r]/,
		keywords: [
			"false",
			"true",
			"in",
			"as",
			"using"
		],
		directiveStartCloseTag1: /attempt|recover|sep|auto[eE]sc|no(?:autoe|AutoE)sc|compress|default|no[eE]scape|comment|no[pP]arse/,
		directiveStartCloseTag2: /else|break|continue|return|stop|flush|t|lt|rt|nt|nested|recurse|fallback|ftl/,
		directiveStartBlank: /if|else[iI]f|list|for[eE]ach|switch|case|assign|global|local|include|import|function|macro|transform|visit|stop|return|call|setting|output[fF]ormat|nested|recurse|escape|ftl|items/,
		directiveEndCloseTag1: /if|list|items|sep|recover|attempt|for[eE]ach|local|global|assign|function|macro|output[fF]ormat|auto[eE]sc|no(?:autoe|AutoE)sc|compress|transform|switch|escape|no[eE]scape/,
		escapedChar: /\\(?:[ntrfbgla\\'"\{=]|(?:x[0-9A-Fa-f]{1,4}))/,
		asciiDigit: /[0-9]/,
		integer: /[0-9]+/,
		nonEscapedIdStartChar: /[\$@-Z_a-z\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u1FFF\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183-\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3006\u3031-\u3035\u303B-\u303C\u3040-\u318F\u31A0-\u31BA\u31F0-\u31FF\u3300-\u337F\u3400-\u4DB5\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8D0-\uA8D9\uA8F2-\uA8F7\uA8FB\uA900-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF-\uA9D9\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA50-\uAA59\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5-\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40-\uFB41\uFB43-\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/,
		escapedIdChar: /\\[\-\.:#]/,
		idStartChar: /(?:@nonEscapedIdStartChar)|(?:@escapedIdChar)/,
		id: /(?:@idStartChar)(?:(?:@idStartChar)|(?:@asciiDigit))*/,
		specialHashKeys: /\*\*|\*|false|true|in|as|using/,
		namedSymbols: /&lt;=|&gt;=|\\lte|\\lt|&lt;|\\gte|\\gt|&gt;|&amp;&amp;|\\and|-&gt;|->|==|!=|\+=|-=|\*=|\/=|%=|\+\+|--|<=|&&|\|\||:|\.\.\.|\.\.\*|\.\.<|\.\.!|\?\?|=|<|\+|-|\*|\/|%|\||\.\.|\?|!|&|\.|,|;/,
		arrows: ["->", "-&gt;"],
		delimiters: [
			";",
			":",
			",",
			"."
		],
		stringOperators: [
			"lte",
			"lt",
			"gte",
			"gt"
		],
		noParseTags: [
			"noparse",
			"noParse",
			"comment"
		],
		tokenizer: {
			[s("default__id__")]: [{ include: s("@directive_token__id__") }, { include: s("@interpolation_and_text_token__id__") }],
			[s("fmExpression__id__.directive")]: [
				{ include: s("@blank_and_expression_comment_token__id__") },
				{ include: s("@directive_end_token__id__") },
				{ include: s("@expression_token__id__") }
			],
			[s("fmExpression__id__.interpolation")]: [
				{ include: s("@blank_and_expression_comment_token__id__") },
				{ include: s("@expression_token__id__") },
				{ include: s("@greater_operators_token__id__") }
			],
			[s("inParen__id__.plain")]: [
				{ include: s("@blank_and_expression_comment_token__id__") },
				{ include: s("@directive_end_token__id__") },
				{ include: s("@expression_token__id__") }
			],
			[s("inParen__id__.gt")]: [
				{ include: s("@blank_and_expression_comment_token__id__") },
				{ include: s("@expression_token__id__") },
				{ include: s("@greater_operators_token__id__") }
			],
			[s("noSpaceExpression__id__")]: [
				{ include: s("@no_space_expression_end_token__id__") },
				{ include: s("@directive_end_token__id__") },
				{ include: s("@expression_token__id__") }
			],
			[s("unifiedCall__id__")]: [{ include: s("@unified_call_token__id__") }],
			[s("singleString__id__")]: [{ include: s("@string_single_token__id__") }],
			[s("doubleString__id__")]: [{ include: s("@string_double_token__id__") }],
			[s("rawSingleString__id__")]: [{ include: s("@string_single_raw_token__id__") }],
			[s("rawDoubleString__id__")]: [{ include: s("@string_double_raw_token__id__") }],
			[s("expressionComment__id__")]: [{ include: s("@expression_comment_token__id__") }],
			[s("noParse__id__")]: [{ include: s("@no_parse_token__id__") }],
			[s("terseComment__id__")]: [{ include: s("@terse_comment_token__id__") }],
			[s("directive_token__id__")]: [
				[r(/(?:@startTag__id__)(@directiveStartCloseTag1)(?:@closeTag1__id__)/), ts.id === "auto" ? { cases: {
					"$1==<": {
						token: "@rematch",
						switchTo: `@default_angle_${is.id}`
					},
					"$1==[": {
						token: "@rematch",
						switchTo: `@default_bracket_${is.id}`
					}
				} } : [
					{ token: "@brackets.directive" },
					{ token: "delimiter.directive" },
					{ cases: {
						"@noParseTags": {
							token: "tag",
							next: s("@noParse__id__.$3")
						},
						"@default": { token: "tag" }
					} },
					{ token: "delimiter.directive" },
					{ token: "@brackets.directive" }
				]],
				[r(/(?:@startTag__id__)(@directiveStartCloseTag2)(?:@closeTag2__id__)/), ts.id === "auto" ? { cases: {
					"$1==<": {
						token: "@rematch",
						switchTo: `@default_angle_${is.id}`
					},
					"$1==[": {
						token: "@rematch",
						switchTo: `@default_bracket_${is.id}`
					}
				} } : [
					{ token: "@brackets.directive" },
					{ token: "delimiter.directive" },
					{ token: "tag" },
					{ token: "delimiter.directive" },
					{ token: "@brackets.directive" }
				]],
				[r(/(?:@startTag__id__)(@directiveStartBlank)(@blank)/), ts.id === "auto" ? { cases: {
					"$1==<": {
						token: "@rematch",
						switchTo: `@default_angle_${is.id}`
					},
					"$1==[": {
						token: "@rematch",
						switchTo: `@default_bracket_${is.id}`
					}
				} } : [
					{ token: "@brackets.directive" },
					{ token: "delimiter.directive" },
					{ token: "tag" },
					{
						token: "",
						next: s("@fmExpression__id__.directive")
					}
				]],
				[r(/(?:@endTag__id__)(@directiveEndCloseTag1)(?:@closeTag1__id__)/), ts.id === "auto" ? { cases: {
					"$1==<": {
						token: "@rematch",
						switchTo: `@default_angle_${is.id}`
					},
					"$1==[": {
						token: "@rematch",
						switchTo: `@default_bracket_${is.id}`
					}
				} } : [
					{ token: "@brackets.directive" },
					{ token: "delimiter.directive" },
					{ token: "tag" },
					{ token: "delimiter.directive" },
					{ token: "@brackets.directive" }
				]],
				[r(/(@open__id__)(@)/), ts.id === "auto" ? { cases: {
					"$1==<": {
						token: "@rematch",
						switchTo: `@default_angle_${is.id}`
					},
					"$1==[": {
						token: "@rematch",
						switchTo: `@default_bracket_${is.id}`
					}
				} } : [{ token: "@brackets.directive" }, {
					token: "delimiter.directive",
					next: s("@unifiedCall__id__")
				}]],
				[r(/(@open__id__)(\/@)((?:(?:@id)(?:\.(?:@id))*)?)(?:@closeTag1__id__)/), [
					{ token: "@brackets.directive" },
					{ token: "delimiter.directive" },
					{ token: "tag" },
					{ token: "delimiter.directive" },
					{ token: "@brackets.directive" }
				]],
				[r(/(@open__id__)#--/), ts.id === "auto" ? { cases: {
					"$1==<": {
						token: "@rematch",
						switchTo: `@default_angle_${is.id}`
					},
					"$1==[": {
						token: "@rematch",
						switchTo: `@default_bracket_${is.id}`
					}
				} } : {
					token: "comment",
					next: s("@terseComment__id__")
				}],
				[r(/(?:@startOrEndTag__id__)([a-zA-Z_]+)/), ts.id === "auto" ? { cases: {
					"$1==<": {
						token: "@rematch",
						switchTo: `@default_angle_${is.id}`
					},
					"$1==[": {
						token: "@rematch",
						switchTo: `@default_bracket_${is.id}`
					}
				} } : [
					{ token: "@brackets.directive" },
					{ token: "delimiter.directive" },
					{
						token: "tag.invalid",
						next: s("@fmExpression__id__.directive")
					}
				]]
			],
			[s("interpolation_and_text_token__id__")]: [[r(/(@iOpen1__id__)(@iOpen2__id__)/), [{ token: is.id === "bracket" ? "@brackets.interpolation" : "delimiter.interpolation" }, {
				token: is.id === "bracket" ? "delimiter.interpolation" : "@brackets.interpolation",
				next: s("@fmExpression__id__.interpolation")
			}]], [/[\$#<\[\{]|(?:@blank)+|[^\$<#\[\{\n\r\t ]+/, { token: "source" }]],
			[s("string_single_token__id__")]: [
				[/[^'\\]/, { token: "string" }],
				[/@escapedChar/, { token: "string.escape" }],
				[/'/, {
					token: "string",
					next: "@pop"
				}]
			],
			[s("string_double_token__id__")]: [
				[/[^"\\]/, { token: "string" }],
				[/@escapedChar/, { token: "string.escape" }],
				[/"/, {
					token: "string",
					next: "@pop"
				}]
			],
			[s("string_single_raw_token__id__")]: [[/[^']+/, { token: "string.raw" }], [/'/, {
				token: "string.raw",
				next: "@pop"
			}]],
			[s("string_double_raw_token__id__")]: [[/[^"]+/, { token: "string.raw" }], [/"/, {
				token: "string.raw",
				next: "@pop"
			}]],
			[s("expression_token__id__")]: [
				[/(r?)(['"])/, { cases: {
					"r'": [{ token: "keyword" }, {
						token: "string.raw",
						next: s("@rawSingleString__id__")
					}],
					"r\"": [{ token: "keyword" }, {
						token: "string.raw",
						next: s("@rawDoubleString__id__")
					}],
					"'": [{ token: "source" }, {
						token: "string",
						next: s("@singleString__id__")
					}],
					"\"": [{ token: "source" }, {
						token: "string",
						next: s("@doubleString__id__")
					}]
				} }],
				[/(?:@integer)(?:\.(?:@integer))?/, { cases: {
					"(?:@integer)": { token: "number" },
					"@default": { token: "number.float" }
				} }],
				[/(\.)(@blank*)(@specialHashKeys)/, [
					{ token: "delimiter" },
					{ token: "" },
					{ token: "identifier" }
				]],
				[/(?:@namedSymbols)/, { cases: {
					"@arrows": { token: "meta.arrow" },
					"@delimiters": { token: "delimiter" },
					"@default": { token: "operators" }
				} }],
				[/@id/, { cases: {
					"@keywords": { token: "keyword.$0" },
					"@stringOperators": { token: "operators" },
					"@default": { token: "identifier" }
				} }],
				[/[\[\]\(\)\{\}]/, { cases: {
					"\\[": { cases: {
						"$S2==gt": {
							token: "@brackets",
							next: s("@inParen__id__.gt")
						},
						"@default": {
							token: "@brackets",
							next: s("@inParen__id__.plain")
						}
					} },
					"\\]": { cases: {
						...is.id === "bracket" ? { "$S2==interpolation": {
							token: "@brackets.interpolation",
							next: "@popall"
						} } : {},
						...ts.id === "bracket" ? { "$S2==directive": {
							token: "@brackets.directive",
							next: "@popall"
						} } : {},
						[s("$S1==inParen__id__")]: {
							token: "@brackets",
							next: "@pop"
						},
						"@default": { token: "@brackets" }
					} },
					"\\(": {
						token: "@brackets",
						next: s("@inParen__id__.gt")
					},
					"\\)": { cases: {
						[s("$S1==inParen__id__")]: {
							token: "@brackets",
							next: "@pop"
						},
						"@default": { token: "@brackets" }
					} },
					"\\{": { cases: {
						"$S2==gt": {
							token: "@brackets",
							next: s("@inParen__id__.gt")
						},
						"@default": {
							token: "@brackets",
							next: s("@inParen__id__.plain")
						}
					} },
					"\\}": { cases: {
						...is.id === "bracket" ? {} : { "$S2==interpolation": {
							token: "@brackets.interpolation",
							next: "@popall"
						} },
						[s("$S1==inParen__id__")]: {
							token: "@brackets",
							next: "@pop"
						},
						"@default": { token: "@brackets" }
					} }
				} }],
				[/\$\{/, { token: "delimiter.invalid" }]
			],
			[s("blank_and_expression_comment_token__id__")]: [[/(?:@blank)+/, { token: "" }], [/[<\[][#!]--/, {
				token: "comment",
				next: s("@expressionComment__id__")
			}]],
			[s("directive_end_token__id__")]: [[/>/, ts.id === "bracket" ? { token: "operators" } : {
				token: "@brackets.directive",
				next: "@popall"
			}], [r(/(\/)(@close__id__)/), [{ token: "delimiter.directive" }, {
				token: "@brackets.directive",
				next: "@popall"
			}]]],
			[s("greater_operators_token__id__")]: [[/>/, { token: "operators" }], [/>=/, { token: "operators" }]],
			[s("no_space_expression_end_token__id__")]: [[/(?:@blank)+/, {
				token: "",
				switchTo: s("@fmExpression__id__.directive")
			}]],
			[s("unified_call_token__id__")]: [
				[/(@id)((?:@blank)+)/, [{ token: "tag" }, {
					token: "",
					next: s("@fmExpression__id__.directive")
				}]],
				[r(/(@id)(\/?)(@close__id__)/), [
					{ token: "tag" },
					{ token: "delimiter.directive" },
					{
						token: "@brackets.directive",
						next: "@popall"
					}
				]],
				[/./, {
					token: "@rematch",
					next: s("@noSpaceExpression__id__")
				}]
			],
			[s("no_parse_token__id__")]: [[r(/(@open__id__)(\/#?)([a-zA-Z]+)((?:@blank)*)(@close__id__)/), { cases: {
				"$S2==$3": [
					{ token: "@brackets.directive" },
					{ token: "delimiter.directive" },
					{ token: "tag" },
					{ token: "" },
					{
						token: "@brackets.directive",
						next: "@popall"
					}
				],
				"$S2==comment": [
					{ token: "comment" },
					{ token: "comment" },
					{ token: "comment" },
					{ token: "comment" },
					{ token: "comment" }
				],
				"@default": [
					{ token: "source" },
					{ token: "source" },
					{ token: "source" },
					{ token: "source" },
					{ token: "source" }
				]
			} }], [/[^<\[\-]+|[<\[\-]/, { cases: {
				"$S2==comment": { token: "comment" },
				"@default": { token: "source" }
			} }]],
			[s("expression_comment_token__id__")]: [[/--[>\]]/, {
				token: "comment",
				next: "@pop"
			}], [/[^\->\]]+|[>\]\-]/, { token: "comment" }]],
			[s("terse_comment_token__id__")]: [[r(/--(?:@close__id__)/), {
				token: "comment",
				next: "@popall"
			}], [/[^<\[\-]+|[<\[\-]/, { token: "comment" }]]
		}
	};
}
function createMonarchLanguageAuto(is) {
	const angle = createMonarchLanguage(TagSyntaxAngle, is);
	const bracket = createMonarchLanguage(TagSyntaxBracket, is);
	const auto = createMonarchLanguage(TagSyntaxAuto, is);
	return {
		...angle,
		...bracket,
		...auto,
		unicode: true,
		includeLF: false,
		start: `default_auto_${is.id}`,
		ignoreCase: false,
		defaultToken: "invalid",
		tokenPostfix: `.freemarker2`,
		brackets: [
			{
				open: "{",
				close: "}",
				token: "delimiter.curly"
			},
			{
				open: "[",
				close: "]",
				token: "delimiter.square"
			},
			{
				open: "(",
				close: ")",
				token: "delimiter.parenthesis"
			},
			{
				open: "<",
				close: ">",
				token: "delimiter.angle"
			}
		],
		tokenizer: {
			...angle.tokenizer,
			...bracket.tokenizer,
			...auto.tokenizer
		}
	};
}
var EMPTY_ELEMENTS, BLOCK_ELEMENTS, TagSyntaxAngle, TagSyntaxBracket, TagSyntaxAuto, InterpolationSyntaxDollar, InterpolationSyntaxBracket, TagAngleInterpolationDollar, TagBracketInterpolationDollar, TagAngleInterpolationBracket, TagBracketInterpolationBracket, TagAutoInterpolationDollar, TagAutoInterpolationBracket;
//#endregion
__esmMin((() => {
	init_coreCommands();
	init_codeEditorWidget();
	init_diffEditor_contribution();
	init_anchorSelect();
	init_bracketMatching();
	init_caretOperations();
	init_transpose();
	init_clipboard();
	init_codeActionContributions();
	init_codelensController();
	init_colorPickerContribution();
	init_comment();
	init_contextmenu();
	init_cursorUndo();
	init_dnd();
	init_copyPasteContribution();
	init_dropIntoEditorContribution();
	init_findController();
	init_folding();
	init_fontZoom();
	init_formatActions();
	init_documentSymbols();
	init_inlineCompletions_contribution();
	init_inlineProgress();
	init_goToCommands();
	init_goToDefinitionAtPosition();
	init_gotoError();
	init_gpuActions();
	init_hoverContribution();
	init_indentation();
	init_inlayHintsContribution();
	init_inPlaceReplace();
	init_insertFinalNewLine();
	init_lineSelection();
	init_linesOperations();
	init_linkedEditing();
	init_links();
	init_longLinesHelper();
	init_middleScroll_contribution();
	init_multicursor();
	init_parameterHints();
	init_placeholderText_contribution();
	init_rename();
	init_sectionHeaders();
	init_documentSemanticTokens();
	init_viewportSemanticTokens();
	init_smartSelect();
	init_snippetController2();
	init_stickyScrollContribution();
	init_suggestController();
	init_suggestInlineCompletions();
	init_tokenization();
	init_toggleTabFocusMode();
	init_unicodeHighlighter();
	init_unusualLineTerminators();
	init_wordHighlighter();
	init_wordOperations();
	init_wordPartOperations();
	init_contribution();
	init_contribution$1();
	init_floatingMenu_contribution();
	init_standaloneStrings();
	init_codicon();
	init_codicon_modifiers();
	init_iPadShowKeyboard();
	init_inspectTokens();
	init_standaloneHelpQuickAccess();
	init_standaloneGotoLineQuickAccess();
	init_standaloneGotoSymbolQuickAccess();
	init_standaloneCommandsQuickAccess();
	init_standaloneReferenceSearch();
	init_toggleHighContrast();
	init_editor_api2();
	EMPTY_ELEMENTS = [
		"assign",
		"flush",
		"ftl",
		"return",
		"global",
		"import",
		"include",
		"break",
		"continue",
		"local",
		"nested",
		"nt",
		"setting",
		"stop",
		"t",
		"lt",
		"rt",
		"fallback"
	];
	BLOCK_ELEMENTS = [
		"attempt",
		"autoesc",
		"autoEsc",
		"compress",
		"comment",
		"escape",
		"noescape",
		"function",
		"if",
		"list",
		"items",
		"sep",
		"macro",
		"noparse",
		"noParse",
		"noautoesc",
		"noAutoEsc",
		"outputformat",
		"switch",
		"visit",
		"recurse"
	];
	TagSyntaxAngle = {
		close: ">",
		id: "angle",
		open: "<"
	};
	TagSyntaxBracket = {
		close: "\\]",
		id: "bracket",
		open: "\\["
	};
	TagSyntaxAuto = {
		close: "[>\\]]",
		id: "auto",
		open: "[<\\[]"
	};
	InterpolationSyntaxDollar = {
		close: "\\}",
		id: "dollar",
		open1: "\\$",
		open2: "\\{"
	};
	InterpolationSyntaxBracket = {
		close: "\\]",
		id: "bracket",
		open1: "\\[",
		open2: "="
	};
	TagAngleInterpolationDollar = {
		conf: createLangConfiguration(TagSyntaxAngle),
		language: createMonarchLanguage(TagSyntaxAngle, InterpolationSyntaxDollar)
	};
	TagBracketInterpolationDollar = {
		conf: createLangConfiguration(TagSyntaxBracket),
		language: createMonarchLanguage(TagSyntaxBracket, InterpolationSyntaxDollar)
	};
	TagAngleInterpolationBracket = {
		conf: createLangConfiguration(TagSyntaxAngle),
		language: createMonarchLanguage(TagSyntaxAngle, InterpolationSyntaxBracket)
	};
	TagBracketInterpolationBracket = {
		conf: createLangConfiguration(TagSyntaxBracket),
		language: createMonarchLanguage(TagSyntaxBracket, InterpolationSyntaxBracket)
	};
	TagAutoInterpolationDollar = {
		conf: createLangConfigurationAuto(),
		language: createMonarchLanguageAuto(InterpolationSyntaxDollar)
	};
	TagAutoInterpolationBracket = {
		conf: createLangConfigurationAuto(),
		language: createMonarchLanguageAuto(InterpolationSyntaxBracket)
	};
}))();
export { TagAngleInterpolationBracket, TagAngleInterpolationDollar, TagAutoInterpolationBracket, TagAutoInterpolationDollar, TagBracketInterpolationBracket, TagBracketInterpolationDollar };
