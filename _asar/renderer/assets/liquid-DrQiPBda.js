import { n as __esmMin } from "./chunk-BRZcfu7K.js";
import { $ as init_inlayHintsContribution, A as init_wordOperations, At as init_bracketMatching, B as init_documentSemanticTokens, C as init_inspectTokens, Ct as init_codeActionContributions, D as init_contribution$1, Dt as init_inlineProgress, E as init_floatingMenu_contribution, Et as init_clipboard, F as init_tokenization, G as init_multicursor, H as init_rename, I as init_suggestInlineCompletions, J as init_links, K as init_middleScroll_contribution, L as init_stickyScrollContribution, M as init_unusualLineTerminators, Mt as init_diffEditor_contribution, N as init_unicodeHighlighter, Nt as init_codeEditorWidget, O as init_contribution, Ot as init_transpose, P as init_toggleTabFocusMode, Pt as init_coreCommands, Q as init_inPlaceReplace, R as init_smartSelect, S as init_standaloneHelpQuickAccess, St as init_codelensController, T as init_standaloneStrings, Tt as init_codicon, U as init_placeholderText_contribution, V as init_sectionHeaders, W as init_parameterHints, X as init_lineSelection, Y as init_linkedEditing, Z as init_insertFinalNewLine, _ as init_toggleHighContrast, _t as init_contextmenu, at as init_suggestController, b as init_standaloneGotoSymbolQuickAccess, bt as init_gotoError, ct as init_documentSymbols, dt as init_folding, et as init_indentation, ft as init_findController, g as languages, gt as init_cursorUndo, h as init_editor_api2, ht as init_dnd, it as init_inlineCompletions_contribution, j as init_wordHighlighter, jt as init_anchorSelect, k as init_wordPartOperations, kt as init_caretOperations, lt as init_formatActions, mt as init_copyPasteContribution, nt as init_gpuActions, ot as init_snippetController2, pt as init_dropIntoEditorContribution, q as init_longLinesHelper, rt as init_goToDefinitionAtPosition, st as init_linesOperations, tt as init_hoverContribution, ut as init_fontZoom, v as init_standaloneReferenceSearch, vt as init_comment, w as init_iPadShowKeyboard, wt as init_codicon_modifiers, x as init_standaloneGotoLineQuickAccess, xt as init_goToCommands, y as init_standaloneCommandsQuickAccess, yt as init_colorPickerContribution, z as init_viewportSemanticTokens } from "./editor.api2-Bx-U9mA4.js";
//#region ../../node_modules/monaco-editor/esm/vs/basic-languages/liquid/liquid.js
var EMPTY_ELEMENTS, conf, language;
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
		"area",
		"base",
		"br",
		"col",
		"embed",
		"hr",
		"img",
		"input",
		"keygen",
		"link",
		"menuitem",
		"meta",
		"param",
		"source",
		"track",
		"wbr"
	];
	conf = {
		wordPattern: /(-?\d*\.\d\w*)|([^\`\~\!\@\$\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\s]+)/g,
		brackets: [
			["<!--", "-->"],
			["<", ">"],
			["{{", "}}"],
			["{%", "%}"],
			["{", "}"],
			["(", ")"]
		],
		autoClosingPairs: [
			{
				open: "{",
				close: "}"
			},
			{
				open: "%",
				close: "%"
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
				close: "\""
			},
			{
				open: "'",
				close: "'"
			}
		],
		surroundingPairs: [
			{
				open: "<",
				close: ">"
			},
			{
				open: "\"",
				close: "\""
			},
			{
				open: "'",
				close: "'"
			}
		],
		onEnterRules: [{
			beforeText: new RegExp(`<(?!(?:${EMPTY_ELEMENTS.join("|")}))(\\w[\\w\\d]*)([^/>]*(?!/)>)[^<]*$`, "i"),
			afterText: /^<\/(\w[\w\d]*)\s*>$/i,
			action: { indentAction: languages.IndentAction.IndentOutdent }
		}, {
			beforeText: new RegExp(`<(?!(?:${EMPTY_ELEMENTS.join("|")}))(\\w[\\w\\d]*)([^/>]*(?!/)>)[^<]*$`, "i"),
			action: { indentAction: languages.IndentAction.Indent }
		}]
	};
	language = {
		defaultToken: "",
		tokenPostfix: "",
		builtinTags: [
			"if",
			"else",
			"elseif",
			"endif",
			"render",
			"assign",
			"capture",
			"endcapture",
			"case",
			"endcase",
			"comment",
			"endcomment",
			"cycle",
			"decrement",
			"for",
			"endfor",
			"include",
			"increment",
			"layout",
			"raw",
			"endraw",
			"render",
			"tablerow",
			"endtablerow",
			"unless",
			"endunless"
		],
		builtinFilters: [
			"abs",
			"append",
			"at_least",
			"at_most",
			"capitalize",
			"ceil",
			"compact",
			"date",
			"default",
			"divided_by",
			"downcase",
			"escape",
			"escape_once",
			"first",
			"floor",
			"join",
			"json",
			"last",
			"lstrip",
			"map",
			"minus",
			"modulo",
			"newline_to_br",
			"plus",
			"prepend",
			"remove",
			"remove_first",
			"replace",
			"replace_first",
			"reverse",
			"round",
			"rstrip",
			"size",
			"slice",
			"sort",
			"sort_natural",
			"split",
			"strip",
			"strip_html",
			"strip_newlines",
			"times",
			"truncate",
			"truncatewords",
			"uniq",
			"upcase",
			"url_decode",
			"url_encode",
			"where"
		],
		constants: ["true", "false"],
		operators: [
			"==",
			"!=",
			">",
			"<",
			">=",
			"<="
		],
		symbol: /[=><!]+/,
		identifier: /[a-zA-Z_][\w]*/,
		tokenizer: {
			root: [
				[
					/\{\%\s*comment\s*\%\}/,
					"comment.start.liquid",
					"@comment"
				],
				[/\{\{/, {
					token: "@rematch",
					switchTo: "@liquidState.root"
				}],
				[/\{\%/, {
					token: "@rematch",
					switchTo: "@liquidState.root"
				}],
				[/(<)([\w\-]+)(\/>)/, [
					"delimiter.html",
					"tag.html",
					"delimiter.html"
				]],
				[/(<)([:\w]+)/, ["delimiter.html", {
					token: "tag.html",
					next: "@otherTag"
				}]],
				[/(<\/)([\w\-]+)/, ["delimiter.html", {
					token: "tag.html",
					next: "@otherTag"
				}]],
				[/</, "delimiter.html"],
				[/\{/, "delimiter.html"],
				[/[^<{]+/]
			],
			comment: [[
				/\{\%\s*endcomment\s*\%\}/,
				"comment.end.liquid",
				"@pop"
			], [/./, "comment.content.liquid"]],
			otherTag: [
				[/\{\{/, {
					token: "@rematch",
					switchTo: "@liquidState.otherTag"
				}],
				[/\{\%/, {
					token: "@rematch",
					switchTo: "@liquidState.otherTag"
				}],
				[
					/\/?>/,
					"delimiter.html",
					"@pop"
				],
				[/"([^"]*)"/, "attribute.value"],
				[/'([^']*)'/, "attribute.value"],
				[/[\w\-]+/, "attribute.name"],
				[/=/, "delimiter"],
				[/[ \t\r\n]+/]
			],
			liquidState: [
				[/\{\{/, "delimiter.output.liquid"],
				[/\}\}/, {
					token: "delimiter.output.liquid",
					switchTo: "@$S2.$S3"
				}],
				[/\{\%/, "delimiter.tag.liquid"],
				[
					/raw\s*\%\}/,
					"delimiter.tag.liquid",
					"@liquidRaw"
				],
				[/\%\}/, {
					token: "delimiter.tag.liquid",
					switchTo: "@$S2.$S3"
				}],
				{ include: "liquidRoot" }
			],
			liquidRaw: [
				[/^(?!\{\%\s*endraw\s*\%\}).+/],
				[/\{\%/, "delimiter.tag.liquid"],
				[/@identifier/],
				[/\%\}/, {
					token: "delimiter.tag.liquid",
					next: "@root"
				}]
			],
			liquidRoot: [
				[/\d+(\.\d+)?/, "number.liquid"],
				[/"[^"]*"/, "string.liquid"],
				[/'[^']*'/, "string.liquid"],
				[/\s+/],
				[/@symbol/, { cases: {
					"@operators": "operator.liquid",
					"@default": ""
				} }],
				[/\./],
				[/@identifier/, { cases: {
					"@constants": "keyword.liquid",
					"@builtinFilters": "predefined.liquid",
					"@builtinTags": "predefined.liquid",
					"@default": "variable.liquid"
				} }],
				[/[^}|%]/, "variable.liquid"]
			]
		}
	};
}))();
export { conf, language };
