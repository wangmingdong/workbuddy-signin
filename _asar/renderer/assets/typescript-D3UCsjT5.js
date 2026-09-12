import { n as __esmMin } from "./chunk-BRZcfu7K.js";
import { $ as init_inlayHintsContribution, A as init_wordOperations, At as init_bracketMatching, B as init_documentSemanticTokens, C as init_inspectTokens, Ct as init_codeActionContributions, D as init_contribution$1, Dt as init_inlineProgress, E as init_floatingMenu_contribution, Et as init_clipboard, F as init_tokenization, G as init_multicursor, H as init_rename, I as init_suggestInlineCompletions, J as init_links, K as init_middleScroll_contribution, L as init_stickyScrollContribution, M as init_unusualLineTerminators, Mt as init_diffEditor_contribution, N as init_unicodeHighlighter, Nt as init_codeEditorWidget, O as init_contribution, Ot as init_transpose, P as init_toggleTabFocusMode, Pt as init_coreCommands, Q as init_inPlaceReplace, R as init_smartSelect, S as init_standaloneHelpQuickAccess, St as init_codelensController, T as init_standaloneStrings, Tt as init_codicon, U as init_placeholderText_contribution, V as init_sectionHeaders, W as init_parameterHints, X as init_lineSelection, Y as init_linkedEditing, Z as init_insertFinalNewLine, _ as init_toggleHighContrast, _t as init_contextmenu, at as init_suggestController, b as init_standaloneGotoSymbolQuickAccess, bt as init_gotoError, ct as init_documentSymbols, dt as init_folding, et as init_indentation, ft as init_findController, g as languages, gt as init_cursorUndo, h as init_editor_api2, ht as init_dnd, it as init_inlineCompletions_contribution, j as init_wordHighlighter, jt as init_anchorSelect, k as init_wordPartOperations, kt as init_caretOperations, lt as init_formatActions, mt as init_copyPasteContribution, nt as init_gpuActions, ot as init_snippetController2, pt as init_dropIntoEditorContribution, q as init_longLinesHelper, rt as init_goToDefinitionAtPosition, st as init_linesOperations, tt as init_hoverContribution, ut as init_fontZoom, v as init_standaloneReferenceSearch, vt as init_comment, w as init_iPadShowKeyboard, wt as init_codicon_modifiers, x as init_standaloneGotoLineQuickAccess, xt as init_goToCommands, y as init_standaloneCommandsQuickAccess, yt as init_colorPickerContribution, z as init_viewportSemanticTokens } from "./editor.api2-Bx-U9mA4.js";
//#region ../../node_modules/monaco-editor/esm/vs/basic-languages/typescript/typescript.js
var conf, language;
var init_typescript = __esmMin((() => {
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
		wordPattern: /(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
		comments: {
			lineComment: "//",
			blockComment: ["/*", "*/"]
		},
		brackets: [
			["{", "}"],
			["[", "]"],
			["(", ")"]
		],
		onEnterRules: [
			{
				beforeText: /^\s*\/\*\*(?!\/)([^\*]|\*(?!\/))*$/,
				afterText: /^\s*\*\/$/,
				action: {
					indentAction: languages.IndentAction.IndentOutdent,
					appendText: " * "
				}
			},
			{
				beforeText: /^\s*\/\*\*(?!\/)([^\*]|\*(?!\/))*$/,
				action: {
					indentAction: languages.IndentAction.None,
					appendText: " * "
				}
			},
			{
				beforeText: /^(\t|(\ \ ))*\ \*(\ ([^\*]|\*(?!\/))*)?$/,
				action: {
					indentAction: languages.IndentAction.None,
					appendText: "* "
				}
			},
			{
				beforeText: /^(\t|(\ \ ))*\ \*\/\s*$/,
				action: {
					indentAction: languages.IndentAction.None,
					removeText: 1
				}
			}
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
				close: "\"",
				notIn: ["string"]
			},
			{
				open: "'",
				close: "'",
				notIn: ["string", "comment"]
			},
			{
				open: "`",
				close: "`",
				notIn: ["string", "comment"]
			},
			{
				open: "/**",
				close: " */",
				notIn: ["string"]
			}
		],
		folding: { markers: {
			start: /* @__PURE__ */ new RegExp("^\\s*//\\s*#?region\\b"),
			end: /* @__PURE__ */ new RegExp("^\\s*//\\s*#?endregion\\b")
		} }
	};
	language = {
		defaultToken: "invalid",
		tokenPostfix: ".ts",
		keywords: [
			"abstract",
			"any",
			"as",
			"asserts",
			"bigint",
			"boolean",
			"break",
			"case",
			"catch",
			"class",
			"continue",
			"const",
			"constructor",
			"debugger",
			"declare",
			"default",
			"delete",
			"do",
			"else",
			"enum",
			"export",
			"extends",
			"false",
			"finally",
			"for",
			"from",
			"function",
			"get",
			"if",
			"implements",
			"import",
			"in",
			"infer",
			"instanceof",
			"interface",
			"is",
			"keyof",
			"let",
			"module",
			"namespace",
			"never",
			"new",
			"null",
			"number",
			"object",
			"out",
			"package",
			"private",
			"protected",
			"public",
			"override",
			"readonly",
			"require",
			"global",
			"return",
			"satisfies",
			"set",
			"static",
			"string",
			"super",
			"switch",
			"symbol",
			"this",
			"throw",
			"true",
			"try",
			"type",
			"typeof",
			"undefined",
			"unique",
			"unknown",
			"var",
			"void",
			"while",
			"with",
			"yield",
			"async",
			"await",
			"of"
		],
		operators: [
			"<=",
			">=",
			"==",
			"!=",
			"===",
			"!==",
			"=>",
			"+",
			"-",
			"**",
			"*",
			"/",
			"%",
			"++",
			"--",
			"<<",
			"</",
			">>",
			">>>",
			"&",
			"|",
			"^",
			"!",
			"~",
			"&&",
			"||",
			"??",
			"?",
			":",
			"=",
			"+=",
			"-=",
			"*=",
			"**=",
			"/=",
			"%=",
			"<<=",
			">>=",
			">>>=",
			"&=",
			"|=",
			"^=",
			"@"
		],
		symbols: /[=><!~?:&|+\-*\/\^%]+/,
		escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
		digits: /\d+(_+\d+)*/,
		octaldigits: /[0-7]+(_+[0-7]+)*/,
		binarydigits: /[0-1]+(_+[0-1]+)*/,
		hexdigits: /[[0-9a-fA-F]+(_+[0-9a-fA-F]+)*/,
		regexpctl: /[(){}\[\]\$\^|\-*+?\.]/,
		regexpesc: /\\(?:[bBdDfnrstvwWn0\\\/]|@regexpctl|c[A-Z]|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4})/,
		tokenizer: {
			root: [[/[{}]/, "delimiter.bracket"], { include: "common" }],
			common: [
				[/#?[a-z_$][\w$]*/, { cases: {
					"@keywords": "keyword",
					"@default": "identifier"
				} }],
				[/[A-Z][\w\$]*/, "type.identifier"],
				{ include: "@whitespace" },
				[/\/(?=([^\\\/]|\\.)+\/([dgimsuy]*)(\s*)(\.|;|,|\)|\]|\}|$))/, {
					token: "regexp",
					bracket: "@open",
					next: "@regexp"
				}],
				[/[()\[\]]/, "@brackets"],
				[/[<>](?!@symbols)/, "@brackets"],
				[/!(?=([^=]|$))/, "delimiter"],
				[/@symbols/, { cases: {
					"@operators": "delimiter",
					"@default": ""
				} }],
				[/(@digits)[eE]([\-+]?(@digits))?/, "number.float"],
				[/(@digits)\.(@digits)([eE][\-+]?(@digits))?/, "number.float"],
				[/0[xX](@hexdigits)n?/, "number.hex"],
				[/0[oO]?(@octaldigits)n?/, "number.octal"],
				[/0[bB](@binarydigits)n?/, "number.binary"],
				[/(@digits)n?/, "number"],
				[/[;,.]/, "delimiter"],
				[/"([^"\\]|\\.)*$/, "string.invalid"],
				[/'([^'\\]|\\.)*$/, "string.invalid"],
				[
					/"/,
					"string",
					"@string_double"
				],
				[
					/'/,
					"string",
					"@string_single"
				],
				[
					/`/,
					"string",
					"@string_backtick"
				]
			],
			whitespace: [
				[/[ \t\r\n]+/, ""],
				[
					/\/\*\*(?!\/)/,
					"comment.doc",
					"@jsdoc"
				],
				[
					/\/\*/,
					"comment",
					"@comment"
				],
				[/\/\/.*$/, "comment"]
			],
			comment: [
				[/[^\/*]+/, "comment"],
				[
					/\*\//,
					"comment",
					"@pop"
				],
				[/[\/*]/, "comment"]
			],
			jsdoc: [
				[/[^\/*]+/, "comment.doc"],
				[
					/\*\//,
					"comment.doc",
					"@pop"
				],
				[/[\/*]/, "comment.doc"]
			],
			regexp: [
				[/(\{)(\d+(?:,\d*)?)(\})/, [
					"regexp.escape.control",
					"regexp.escape.control",
					"regexp.escape.control"
				]],
				[/(\[)(\^?)(?=(?:[^\]\\\/]|\\.)+)/, ["regexp.escape.control", {
					token: "regexp.escape.control",
					next: "@regexrange"
				}]],
				[/(\()(\?:|\?=|\?!)/, ["regexp.escape.control", "regexp.escape.control"]],
				[/[()]/, "regexp.escape.control"],
				[/@regexpctl/, "regexp.escape.control"],
				[/[^\\\/]/, "regexp"],
				[/@regexpesc/, "regexp.escape"],
				[/\\\./, "regexp.invalid"],
				[/(\/)([dgimsuy]*)/, [{
					token: "regexp",
					bracket: "@close",
					next: "@pop"
				}, "keyword.other"]]
			],
			regexrange: [
				[/-/, "regexp.escape.control"],
				[/\^/, "regexp.invalid"],
				[/@regexpesc/, "regexp.escape"],
				[/[^\]]/, "regexp"],
				[/\]/, {
					token: "regexp.escape.control",
					next: "@pop",
					bracket: "@close"
				}]
			],
			string_double: [
				[/[^\\"]+/, "string"],
				[/@escapes/, "string.escape"],
				[/\\./, "string.escape.invalid"],
				[
					/"/,
					"string",
					"@pop"
				]
			],
			string_single: [
				[/[^\\']+/, "string"],
				[/@escapes/, "string.escape"],
				[/\\./, "string.escape.invalid"],
				[
					/'/,
					"string",
					"@pop"
				]
			],
			string_backtick: [
				[/\$\{/, {
					token: "delimiter.bracket",
					next: "@bracketCounting"
				}],
				[/[^\\`$]+/, "string"],
				[/@escapes/, "string.escape"],
				[/\\./, "string.escape.invalid"],
				[
					/`/,
					"string",
					"@pop"
				]
			],
			bracketCounting: [
				[
					/\{/,
					"delimiter.bracket",
					"@bracketCounting"
				],
				[
					/\}/,
					"delimiter.bracket",
					"@pop"
				],
				{ include: "common" }
			]
		}
	};
}));
//#endregion
init_typescript();
export { conf, language, init_typescript as t };
