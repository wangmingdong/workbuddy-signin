import { n as __esmMin } from "./chunk-BRZcfu7K.js";
import { $ as init_inlayHintsContribution, A as init_wordOperations, At as init_bracketMatching, B as init_documentSemanticTokens, C as init_inspectTokens, Ct as init_codeActionContributions, D as init_contribution$1, Dt as init_inlineProgress, E as init_floatingMenu_contribution, Et as init_clipboard, F as init_tokenization, G as init_multicursor, H as init_rename, I as init_suggestInlineCompletions, J as init_links, K as init_middleScroll_contribution, L as init_stickyScrollContribution, M as init_unusualLineTerminators, Mt as init_diffEditor_contribution, N as init_unicodeHighlighter, Nt as init_codeEditorWidget, O as init_contribution, Ot as init_transpose, P as init_toggleTabFocusMode, Pt as init_coreCommands, Q as init_inPlaceReplace, R as init_smartSelect, S as init_standaloneHelpQuickAccess, St as init_codelensController, T as init_standaloneStrings, Tt as init_codicon, U as init_placeholderText_contribution, V as init_sectionHeaders, W as init_parameterHints, X as init_lineSelection, Y as init_linkedEditing, Z as init_insertFinalNewLine, _ as init_toggleHighContrast, _t as init_contextmenu, at as init_suggestController, b as init_standaloneGotoSymbolQuickAccess, bt as init_gotoError, ct as init_documentSymbols, dt as init_folding, et as init_indentation, ft as init_findController, g as languages, gt as init_cursorUndo, h as init_editor_api2, ht as init_dnd, it as init_inlineCompletions_contribution, j as init_wordHighlighter, jt as init_anchorSelect, k as init_wordPartOperations, kt as init_caretOperations, lt as init_formatActions, mt as init_copyPasteContribution, nt as init_gpuActions, ot as init_snippetController2, pt as init_dropIntoEditorContribution, q as init_longLinesHelper, rt as init_goToDefinitionAtPosition, st as init_linesOperations, tt as init_hoverContribution, ut as init_fontZoom, v as init_standaloneReferenceSearch, vt as init_comment, w as init_iPadShowKeyboard, wt as init_codicon_modifiers, x as init_standaloneGotoLineQuickAccess, xt as init_goToCommands, y as init_standaloneCommandsQuickAccess, yt as init_colorPickerContribution, z as init_viewportSemanticTokens } from "./editor.api2-Bx-U9mA4.js";
//#region ../../node_modules/monaco-editor/esm/vs/basic-languages/python/python.js
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
		comments: {
			lineComment: "#",
			blockComment: ["'''", "'''"]
		},
		brackets: [
			["{", "}"],
			["[", "]"],
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
				close: "\"",
				notIn: ["string"]
			},
			{
				open: "'",
				close: "'",
				notIn: ["string", "comment"]
			}
		],
		surroundingPairs: [
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
		onEnterRules: [{
			beforeText: /* @__PURE__ */ new RegExp("^\\s*(?:def|class|for|if|elif|else|while|try|with|finally|except|async|match|case).*?:\\s*$"),
			action: { indentAction: languages.IndentAction.Indent }
		}],
		folding: {
			offSide: true,
			markers: {
				start: /* @__PURE__ */ new RegExp("^\\s*#region\\b"),
				end: /* @__PURE__ */ new RegExp("^\\s*#endregion\\b")
			}
		}
	};
	language = {
		defaultToken: "",
		tokenPostfix: ".python",
		keywords: [
			"False",
			"None",
			"True",
			"_",
			"and",
			"as",
			"assert",
			"async",
			"await",
			"break",
			"case",
			"class",
			"continue",
			"def",
			"del",
			"elif",
			"else",
			"except",
			"exec",
			"finally",
			"for",
			"from",
			"global",
			"if",
			"import",
			"in",
			"is",
			"lambda",
			"match",
			"nonlocal",
			"not",
			"or",
			"pass",
			"print",
			"raise",
			"return",
			"try",
			"type",
			"while",
			"with",
			"yield",
			"int",
			"float",
			"long",
			"complex",
			"hex",
			"abs",
			"all",
			"any",
			"apply",
			"basestring",
			"bin",
			"bool",
			"buffer",
			"bytearray",
			"callable",
			"chr",
			"classmethod",
			"cmp",
			"coerce",
			"compile",
			"complex",
			"delattr",
			"dict",
			"dir",
			"divmod",
			"enumerate",
			"eval",
			"execfile",
			"file",
			"filter",
			"format",
			"frozenset",
			"getattr",
			"globals",
			"hasattr",
			"hash",
			"help",
			"id",
			"input",
			"intern",
			"isinstance",
			"issubclass",
			"iter",
			"len",
			"locals",
			"list",
			"map",
			"max",
			"memoryview",
			"min",
			"next",
			"object",
			"oct",
			"open",
			"ord",
			"pow",
			"print",
			"property",
			"reversed",
			"range",
			"raw_input",
			"reduce",
			"reload",
			"repr",
			"reversed",
			"round",
			"self",
			"set",
			"setattr",
			"slice",
			"sorted",
			"staticmethod",
			"str",
			"sum",
			"super",
			"tuple",
			"type",
			"unichr",
			"unicode",
			"vars",
			"xrange",
			"zip",
			"__dict__",
			"__methods__",
			"__members__",
			"__class__",
			"__bases__",
			"__name__",
			"__mro__",
			"__subclasses__",
			"__init__",
			"__import__"
		],
		brackets: [
			{
				open: "{",
				close: "}",
				token: "delimiter.curly"
			},
			{
				open: "[",
				close: "]",
				token: "delimiter.bracket"
			},
			{
				open: "(",
				close: ")",
				token: "delimiter.parenthesis"
			}
		],
		tokenizer: {
			root: [
				{ include: "@whitespace" },
				{ include: "@numbers" },
				{ include: "@strings" },
				[/[,:;]/, "delimiter"],
				[/[{}\[\]()]/, "@brackets"],
				[/@[a-zA-Z_]\w*/, "tag"],
				[/[a-zA-Z_]\w*/, { cases: {
					"@keywords": "keyword",
					"@default": "identifier"
				} }]
			],
			whitespace: [
				[/\s+/, "white"],
				[/(^#.*$)/, "comment"],
				[
					/'''/,
					"string",
					"@endDocString"
				],
				[
					/"""/,
					"string",
					"@endDblDocString"
				]
			],
			endDocString: [
				[/[^']+/, "string"],
				[/\\'/, "string"],
				[
					/'''/,
					"string",
					"@popall"
				],
				[/'/, "string"]
			],
			endDblDocString: [
				[/[^"]+/, "string"],
				[/\\"/, "string"],
				[
					/"""/,
					"string",
					"@popall"
				],
				[/"/, "string"]
			],
			numbers: [[/-?0x([abcdef]|[ABCDEF]|\d)+[lL]?/, "number.hex"], [/-?(\d*\.)?\d+([eE][+\-]?\d+)?[jJ]?[lL]?/, "number"]],
			strings: [
				[
					/'$/,
					"string.escape",
					"@popall"
				],
				[
					/f'{1,3}/,
					"string.escape",
					"@fStringBody"
				],
				[
					/'/,
					"string.escape",
					"@stringBody"
				],
				[
					/"$/,
					"string.escape",
					"@popall"
				],
				[
					/f"{1,3}/,
					"string.escape",
					"@fDblStringBody"
				],
				[
					/"/,
					"string.escape",
					"@dblStringBody"
				]
			],
			fStringBody: [
				[
					/[^\\'\{\}]+$/,
					"string",
					"@popall"
				],
				[/[^\\'\{\}]+/, "string"],
				[
					/\{[^\}':!=]+/,
					"identifier",
					"@fStringDetail"
				],
				[/\\./, "string"],
				[
					/'/,
					"string.escape",
					"@popall"
				],
				[/\\$/, "string"]
			],
			stringBody: [
				[
					/[^\\']+$/,
					"string",
					"@popall"
				],
				[/[^\\']+/, "string"],
				[/\\./, "string"],
				[
					/'/,
					"string.escape",
					"@popall"
				],
				[/\\$/, "string"]
			],
			fDblStringBody: [
				[
					/[^\\"\{\}]+$/,
					"string",
					"@popall"
				],
				[/[^\\"\{\}]+/, "string"],
				[
					/\{[^\}':!=]+/,
					"identifier",
					"@fStringDetail"
				],
				[/\\./, "string"],
				[
					/"/,
					"string.escape",
					"@popall"
				],
				[/\\$/, "string"]
			],
			dblStringBody: [
				[
					/[^\\"]+$/,
					"string",
					"@popall"
				],
				[/[^\\"]+/, "string"],
				[/\\./, "string"],
				[
					/"/,
					"string.escape",
					"@popall"
				],
				[/\\$/, "string"]
			],
			fStringDetail: [
				[/[:][^}]+/, "string"],
				[/[!][ars]/, "string"],
				[/=/, "string"],
				[
					/\}/,
					"identifier",
					"@pop"
				]
			]
		}
	};
}))();
export { conf, language };
