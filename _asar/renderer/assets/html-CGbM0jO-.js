import { n as __esmMin } from "./chunk-BRZcfu7K.js";
import { $ as init_inlayHintsContribution, A as init_wordOperations, At as init_bracketMatching, B as init_documentSemanticTokens, C as init_inspectTokens, Ct as init_codeActionContributions, D as init_contribution$1, Dt as init_inlineProgress, E as init_floatingMenu_contribution, Et as init_clipboard, F as init_tokenization, G as init_multicursor, H as init_rename, I as init_suggestInlineCompletions, J as init_links, K as init_middleScroll_contribution, L as init_stickyScrollContribution, M as init_unusualLineTerminators, Mt as init_diffEditor_contribution, N as init_unicodeHighlighter, Nt as init_codeEditorWidget, O as init_contribution, Ot as init_transpose, P as init_toggleTabFocusMode, Pt as init_coreCommands, Q as init_inPlaceReplace, R as init_smartSelect, S as init_standaloneHelpQuickAccess, St as init_codelensController, T as init_standaloneStrings, Tt as init_codicon, U as init_placeholderText_contribution, V as init_sectionHeaders, W as init_parameterHints, X as init_lineSelection, Y as init_linkedEditing, Z as init_insertFinalNewLine, _ as init_toggleHighContrast, _t as init_contextmenu, at as init_suggestController, b as init_standaloneGotoSymbolQuickAccess, bt as init_gotoError, ct as init_documentSymbols, dt as init_folding, et as init_indentation, ft as init_findController, g as languages, gt as init_cursorUndo, h as init_editor_api2, ht as init_dnd, it as init_inlineCompletions_contribution, j as init_wordHighlighter, jt as init_anchorSelect, k as init_wordPartOperations, kt as init_caretOperations, lt as init_formatActions, mt as init_copyPasteContribution, nt as init_gpuActions, ot as init_snippetController2, pt as init_dropIntoEditorContribution, q as init_longLinesHelper, rt as init_goToDefinitionAtPosition, st as init_linesOperations, tt as init_hoverContribution, ut as init_fontZoom, v as init_standaloneReferenceSearch, vt as init_comment, w as init_iPadShowKeyboard, wt as init_codicon_modifiers, x as init_standaloneGotoLineQuickAccess, xt as init_goToCommands, y as init_standaloneCommandsQuickAccess, yt as init_colorPickerContribution, z as init_viewportSemanticTokens } from "./editor.api2-Bx-U9mA4.js";
//#region ../../node_modules/monaco-editor/esm/vs/basic-languages/html/html.js
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
		comments: { blockComment: ["<!--", "-->"] },
		brackets: [
			["<!--", "-->"],
			["<", ">"],
			["{", "}"],
			["(", ")"]
		],
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
				close: "\""
			},
			{
				open: "'",
				close: "'"
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
		onEnterRules: [{
			beforeText: new RegExp(`<(?!(?:${EMPTY_ELEMENTS.join("|")}))([_:\\w][_:\\w-.\\d]*)([^/>]*(?!/)>)[^<]*$`, "i"),
			afterText: /^<\/([_:\w][_:\w-.\d]*)\s*>$/i,
			action: { indentAction: languages.IndentAction.IndentOutdent }
		}, {
			beforeText: new RegExp(`<(?!(?:${EMPTY_ELEMENTS.join("|")}))(\\w[\\w\\d]*)([^/>]*(?!/)>)[^<]*$`, "i"),
			action: { indentAction: languages.IndentAction.Indent }
		}],
		folding: { markers: {
			start: /* @__PURE__ */ new RegExp("^\\s*<!--\\s*#region\\b.*-->"),
			end: /* @__PURE__ */ new RegExp("^\\s*<!--\\s*#endregion\\b.*-->")
		} }
	};
	language = {
		defaultToken: "",
		tokenPostfix: ".html",
		ignoreCase: true,
		tokenizer: {
			root: [
				[
					/<!DOCTYPE/,
					"metatag",
					"@doctype"
				],
				[
					/<!--/,
					"comment",
					"@comment"
				],
				[/(<)((?:[\w\-]+:)?[\w\-]+)(\s*)(\/>)/, [
					"delimiter",
					"tag",
					"",
					"delimiter"
				]],
				[/(<)(script)/, ["delimiter", {
					token: "tag",
					next: "@script"
				}]],
				[/(<)(style)/, ["delimiter", {
					token: "tag",
					next: "@style"
				}]],
				[/(<)((?:[\w\-]+:)?[\w\-]+)/, ["delimiter", {
					token: "tag",
					next: "@otherTag"
				}]],
				[/(<\/)((?:[\w\-]+:)?[\w\-]+)/, ["delimiter", {
					token: "tag",
					next: "@otherTag"
				}]],
				[/</, "delimiter"],
				[/[^<]+/]
			],
			doctype: [[/[^>]+/, "metatag.content"], [
				/>/,
				"metatag",
				"@pop"
			]],
			comment: [
				[
					/-->/,
					"comment",
					"@pop"
				],
				[/[^-]+/, "comment.content"],
				[/./, "comment.content"]
			],
			otherTag: [
				[
					/\/?>/,
					"delimiter",
					"@pop"
				],
				[/"([^"]*)"/, "attribute.value"],
				[/'([^']*)'/, "attribute.value"],
				[/[\w\-]+/, "attribute.name"],
				[/=/, "delimiter"],
				[/[ \t\r\n]+/]
			],
			script: [
				[
					/type/,
					"attribute.name",
					"@scriptAfterType"
				],
				[/"([^"]*)"/, "attribute.value"],
				[/'([^']*)'/, "attribute.value"],
				[/[\w\-]+/, "attribute.name"],
				[/=/, "delimiter"],
				[/>/, {
					token: "delimiter",
					next: "@scriptEmbedded",
					nextEmbedded: "text/javascript"
				}],
				[/[ \t\r\n]+/],
				[/(<\/)(script\s*)(>)/, [
					"delimiter",
					"tag",
					{
						token: "delimiter",
						next: "@pop"
					}
				]]
			],
			scriptAfterType: [
				[
					/=/,
					"delimiter",
					"@scriptAfterTypeEquals"
				],
				[/>/, {
					token: "delimiter",
					next: "@scriptEmbedded",
					nextEmbedded: "text/javascript"
				}],
				[/[ \t\r\n]+/],
				[/<\/script\s*>/, {
					token: "@rematch",
					next: "@pop"
				}]
			],
			scriptAfterTypeEquals: [
				[/"module"/, {
					token: "attribute.value",
					switchTo: "@scriptWithCustomType.text/javascript"
				}],
				[/'module'/, {
					token: "attribute.value",
					switchTo: "@scriptWithCustomType.text/javascript"
				}],
				[/"([^"]*)"/, {
					token: "attribute.value",
					switchTo: "@scriptWithCustomType.$1"
				}],
				[/'([^']*)'/, {
					token: "attribute.value",
					switchTo: "@scriptWithCustomType.$1"
				}],
				[/>/, {
					token: "delimiter",
					next: "@scriptEmbedded",
					nextEmbedded: "text/javascript"
				}],
				[/[ \t\r\n]+/],
				[/<\/script\s*>/, {
					token: "@rematch",
					next: "@pop"
				}]
			],
			scriptWithCustomType: [
				[/>/, {
					token: "delimiter",
					next: "@scriptEmbedded.$S2",
					nextEmbedded: "$S2"
				}],
				[/"([^"]*)"/, "attribute.value"],
				[/'([^']*)'/, "attribute.value"],
				[/[\w\-]+/, "attribute.name"],
				[/=/, "delimiter"],
				[/[ \t\r\n]+/],
				[/<\/script\s*>/, {
					token: "@rematch",
					next: "@pop"
				}]
			],
			scriptEmbedded: [[/<\/script/, {
				token: "@rematch",
				next: "@pop",
				nextEmbedded: "@pop"
			}], [/[^<]+/, ""]],
			style: [
				[
					/type/,
					"attribute.name",
					"@styleAfterType"
				],
				[/"([^"]*)"/, "attribute.value"],
				[/'([^']*)'/, "attribute.value"],
				[/[\w\-]+/, "attribute.name"],
				[/=/, "delimiter"],
				[/>/, {
					token: "delimiter",
					next: "@styleEmbedded",
					nextEmbedded: "text/css"
				}],
				[/[ \t\r\n]+/],
				[/(<\/)(style\s*)(>)/, [
					"delimiter",
					"tag",
					{
						token: "delimiter",
						next: "@pop"
					}
				]]
			],
			styleAfterType: [
				[
					/=/,
					"delimiter",
					"@styleAfterTypeEquals"
				],
				[/>/, {
					token: "delimiter",
					next: "@styleEmbedded",
					nextEmbedded: "text/css"
				}],
				[/[ \t\r\n]+/],
				[/<\/style\s*>/, {
					token: "@rematch",
					next: "@pop"
				}]
			],
			styleAfterTypeEquals: [
				[/"([^"]*)"/, {
					token: "attribute.value",
					switchTo: "@styleWithCustomType.$1"
				}],
				[/'([^']*)'/, {
					token: "attribute.value",
					switchTo: "@styleWithCustomType.$1"
				}],
				[/>/, {
					token: "delimiter",
					next: "@styleEmbedded",
					nextEmbedded: "text/css"
				}],
				[/[ \t\r\n]+/],
				[/<\/style\s*>/, {
					token: "@rematch",
					next: "@pop"
				}]
			],
			styleWithCustomType: [
				[/>/, {
					token: "delimiter",
					next: "@styleEmbedded.$S2",
					nextEmbedded: "$S2"
				}],
				[/"([^"]*)"/, "attribute.value"],
				[/'([^']*)'/, "attribute.value"],
				[/[\w\-]+/, "attribute.name"],
				[/=/, "delimiter"],
				[/[ \t\r\n]+/],
				[/<\/style\s*>/, {
					token: "@rematch",
					next: "@pop"
				}]
			],
			styleEmbedded: [[/<\/style/, {
				token: "@rematch",
				next: "@pop",
				nextEmbedded: "@pop"
			}], [/[^<]+/, ""]]
		}
	};
}))();
export { conf, language };
