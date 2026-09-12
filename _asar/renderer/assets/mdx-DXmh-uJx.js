import { n as __esmMin } from "./chunk-BRZcfu7K.js";
import { $ as init_inlayHintsContribution, A as init_wordOperations, At as init_bracketMatching, B as init_documentSemanticTokens, C as init_inspectTokens, Ct as init_codeActionContributions, D as init_contribution$1, Dt as init_inlineProgress, E as init_floatingMenu_contribution, Et as init_clipboard, F as init_tokenization, G as init_multicursor, H as init_rename, I as init_suggestInlineCompletions, J as init_links, K as init_middleScroll_contribution, L as init_stickyScrollContribution, M as init_unusualLineTerminators, Mt as init_diffEditor_contribution, N as init_unicodeHighlighter, Nt as init_codeEditorWidget, O as init_contribution, Ot as init_transpose, P as init_toggleTabFocusMode, Pt as init_coreCommands, Q as init_inPlaceReplace, R as init_smartSelect, S as init_standaloneHelpQuickAccess, St as init_codelensController, T as init_standaloneStrings, Tt as init_codicon, U as init_placeholderText_contribution, V as init_sectionHeaders, W as init_parameterHints, X as init_lineSelection, Y as init_linkedEditing, Z as init_insertFinalNewLine, _ as init_toggleHighContrast, _t as init_contextmenu, at as init_suggestController, b as init_standaloneGotoSymbolQuickAccess, bt as init_gotoError, ct as init_documentSymbols, dt as init_folding, et as init_indentation, ft as init_findController, g as languages, gt as init_cursorUndo, h as init_editor_api2, ht as init_dnd, it as init_inlineCompletions_contribution, j as init_wordHighlighter, jt as init_anchorSelect, k as init_wordPartOperations, kt as init_caretOperations, lt as init_formatActions, mt as init_copyPasteContribution, nt as init_gpuActions, ot as init_snippetController2, pt as init_dropIntoEditorContribution, q as init_longLinesHelper, rt as init_goToDefinitionAtPosition, st as init_linesOperations, tt as init_hoverContribution, ut as init_fontZoom, v as init_standaloneReferenceSearch, vt as init_comment, w as init_iPadShowKeyboard, wt as init_codicon_modifiers, x as init_standaloneGotoLineQuickAccess, xt as init_goToCommands, y as init_standaloneCommandsQuickAccess, yt as init_colorPickerContribution, z as init_viewportSemanticTokens } from "./editor.api2-Bx-U9mA4.js";
//#region ../../node_modules/monaco-editor/esm/vs/basic-languages/mdx/mdx.js
var conf, language;
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
	conf = {
		comments: { blockComment: ["{/*", "*/}"] },
		brackets: [["{", "}"]],
		autoClosingPairs: [
			{
				open: "\"",
				close: "\""
			},
			{
				open: "'",
				close: "'"
			},
			{
				open: "“",
				close: "”"
			},
			{
				open: "‘",
				close: "’"
			},
			{
				open: "`",
				close: "`"
			},
			{
				open: "{",
				close: "}"
			},
			{
				open: "(",
				close: ")"
			},
			{
				open: "_",
				close: "_"
			},
			{
				open: "**",
				close: "**"
			},
			{
				open: "<",
				close: ">"
			}
		],
		onEnterRules: [
			{
				beforeText: /^\s*- .+/,
				action: {
					indentAction: languages.IndentAction.None,
					appendText: "- "
				}
			},
			{
				beforeText: /^\s*\+ .+/,
				action: {
					indentAction: languages.IndentAction.None,
					appendText: "+ "
				}
			},
			{
				beforeText: /^\s*\* .+/,
				action: {
					indentAction: languages.IndentAction.None,
					appendText: "* "
				}
			},
			{
				beforeText: /^> /,
				action: {
					indentAction: languages.IndentAction.None,
					appendText: "> "
				}
			},
			{
				beforeText: /<\w+/,
				action: { indentAction: languages.IndentAction.Indent }
			},
			{
				beforeText: /\s+>\s*$/,
				action: { indentAction: languages.IndentAction.Indent }
			},
			{
				beforeText: /<\/\w+>/,
				action: { indentAction: languages.IndentAction.Outdent }
			},
			...Array.from({ length: 100 }, (_, index) => ({
				beforeText: new RegExp(`^${index}\\. .+`),
				action: {
					indentAction: languages.IndentAction.None,
					appendText: `${index + 1}. `
				}
			}))
		]
	};
	language = {
		defaultToken: "",
		tokenPostfix: ".mdx",
		control: /[!#()*+.[\\\]_`{}\-]/,
		escapes: /\\@control/,
		tokenizer: {
			root: [
				[/^---$/, {
					token: "meta.content",
					next: "@frontmatter",
					nextEmbedded: "yaml"
				}],
				[/^\s*import/, {
					token: "keyword",
					next: "@import",
					nextEmbedded: "js"
				}],
				[/^\s*export/, {
					token: "keyword",
					next: "@export",
					nextEmbedded: "js"
				}],
				[/<\w+/, {
					token: "type.identifier",
					next: "@jsx"
				}],
				[/<\/?\w+>/, "type.identifier"],
				[/^(\s*)(>*\s*)(#{1,6}\s)/, [
					{ token: "white" },
					{ token: "comment" },
					{
						token: "keyword",
						next: "@header"
					}
				]],
				[/^(\s*)(>*\s*)([*+-])(\s+)/, [
					"white",
					"comment",
					"keyword",
					"white"
				]],
				[/^(\s*)(>*\s*)(\d{1,9}\.)(\s+)/, [
					"white",
					"comment",
					"number",
					"white"
				]],
				[/^(\s*)(>*\s*)(\d{1,9}\.)(\s+)/, [
					"white",
					"comment",
					"number",
					"white"
				]],
				[/^(\s*)(>*\s*)(-{3,}|\*{3,}|_{3,})$/, [
					"white",
					"comment",
					"keyword"
				]],
				[/`{3,}(\s.*)?$/, {
					token: "string",
					next: "@codeblock_backtick"
				}],
				[/~{3,}(\s.*)?$/, {
					token: "string",
					next: "@codeblock_tilde"
				}],
				[/`{3,}(\S+).*$/, {
					token: "string",
					next: "@codeblock_highlight_backtick",
					nextEmbedded: "$1"
				}],
				[/~{3,}(\S+).*$/, {
					token: "string",
					next: "@codeblock_highlight_tilde",
					nextEmbedded: "$1"
				}],
				[/^(\s*)(-{4,})$/, ["white", "comment"]],
				[/^(\s*)(>+)/, ["white", "comment"]],
				{ include: "content" }
			],
			content: [
				[/(\[)(.+)(]\()(.+)(\s+".*")(\))/, [
					"",
					"string.link",
					"",
					"type.identifier",
					"string.link",
					""
				]],
				[/(\[)(.+)(]\()(.+)(\))/, [
					"",
					"type.identifier",
					"",
					"string.link",
					""
				]],
				[/(\[)(.+)(]\[)(.+)(])/, [
					"",
					"type.identifier",
					"",
					"type.identifier",
					""
				]],
				[/(\[)(.+)(]:\s+)(\S*)/, [
					"",
					"type.identifier",
					"",
					"string.link"
				]],
				[/(\[)(.+)(])/, [
					"",
					"type.identifier",
					""
				]],
				[/`.*`/, "variable.source"],
				[/_/, {
					token: "emphasis",
					next: "@emphasis_underscore"
				}],
				[/\*(?!\*)/, {
					token: "emphasis",
					next: "@emphasis_asterisk"
				}],
				[/\*\*/, {
					token: "strong",
					next: "@strong"
				}],
				[/{/, {
					token: "delimiter.bracket",
					next: "@expression",
					nextEmbedded: "js"
				}]
			],
			import: [[/'\s*(;|$)/, {
				token: "string",
				next: "@pop",
				nextEmbedded: "@pop"
			}]],
			expression: [[/{/, {
				token: "delimiter.bracket",
				next: "@expression"
			}], [/}/, {
				token: "delimiter.bracket",
				next: "@pop",
				nextEmbedded: "@pop"
			}]],
			export: [[/^\s*$/, {
				token: "delimiter.bracket",
				next: "@pop",
				nextEmbedded: "@pop"
			}]],
			jsx: [
				[/\s+/, ""],
				[/(\w+)(=)("(?:[^"\\]|\\.)*")/, [
					"attribute.name",
					"operator",
					"string"
				]],
				[/(\w+)(=)('(?:[^'\\]|\\.)*')/, [
					"attribute.name",
					"operator",
					"string"
				]],
				[/(\w+(?=\s|>|={|$))/, ["attribute.name"]],
				[/={/, {
					token: "delimiter.bracket",
					next: "@expression",
					nextEmbedded: "js"
				}],
				[/>/, {
					token: "type.identifier",
					next: "@pop"
				}]
			],
			header: [
				[/.$/, {
					token: "keyword",
					next: "@pop"
				}],
				{ include: "content" },
				[/./, { token: "keyword" }]
			],
			strong: [
				[/\*\*/, {
					token: "strong",
					next: "@pop"
				}],
				{ include: "content" },
				[/./, { token: "strong" }]
			],
			emphasis_underscore: [
				[/_/, {
					token: "emphasis",
					next: "@pop"
				}],
				{ include: "content" },
				[/./, { token: "emphasis" }]
			],
			emphasis_asterisk: [
				[/\*(?!\*)/, {
					token: "emphasis",
					next: "@pop"
				}],
				{ include: "content" },
				[/./, { token: "emphasis" }]
			],
			frontmatter: [[/^---$/, {
				token: "meta.content",
				nextEmbedded: "@pop",
				next: "@pop"
			}]],
			codeblock_highlight_backtick: [[/\s*`{3,}\s*$/, {
				token: "string",
				next: "@pop",
				nextEmbedded: "@pop"
			}], [/.*$/, "variable.source"]],
			codeblock_highlight_tilde: [[/\s*~{3,}\s*$/, {
				token: "string",
				next: "@pop",
				nextEmbedded: "@pop"
			}], [/.*$/, "variable.source"]],
			codeblock_backtick: [[/\s*`{3,}\s*$/, {
				token: "string",
				next: "@pop"
			}], [/.*$/, "variable.source"]],
			codeblock_tilde: [[/\s*~{3,}\s*$/, {
				token: "string",
				next: "@pop"
			}], [/.*$/, "variable.source"]]
		}
	};
}))();
export { conf, language };
