import { n as __esmMin } from "./chunk-BRZcfu7K.js";
//#region ../../node_modules/monaco-editor/esm/vs/basic-languages/typespec/typespec.js
var bounded, notBefore, identifier, directive, keywords, namedLiterals, nonCommentWs, numericLiteral, conf, language;
//#endregion
__esmMin((() => {
	bounded = (text) => `\\b${text}\\b`;
	notBefore = (regex) => `(?!${regex})`;
	identifier = bounded(`[_a-zA-Z][_a-zA-Z0-9]*`);
	directive = bounded(`[_a-zA-Z-0-9]+`);
	keywords = [
		"import",
		"model",
		"scalar",
		"namespace",
		"op",
		"interface",
		"union",
		"using",
		"is",
		"extends",
		"enum",
		"alias",
		"return",
		"void",
		"if",
		"else",
		"projection",
		"dec",
		"extern",
		"fn"
	];
	namedLiterals = [
		"true",
		"false",
		"null",
		"unknown",
		"never"
	];
	nonCommentWs = `[ \\t\\r\\n]`;
	numericLiteral = `[0-9]+`;
	conf = {
		comments: {
			lineComment: "//",
			blockComment: ["/*", "*/"]
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
				close: "\""
			},
			{
				open: "/**",
				close: " */",
				notIn: ["string"]
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
			}
		],
		indentationRules: {
			decreaseIndentPattern: /* @__PURE__ */ new RegExp("^((?!.*?/\\*).*\\*/)?\\s*[\\}\\]].*$"),
			increaseIndentPattern: /* @__PURE__ */ new RegExp("^((?!//).)*(\\{([^}\"'`/]*|(\\t|[ ])*//.*)|\\([^)\"'`/]*|\\[[^\\]\"'`/]*)$"),
			unIndentedLinePattern: /* @__PURE__ */ new RegExp("^(\\t|[ ])*[ ]\\*[^/]*\\*/\\s*$|^(\\t|[ ])*[ ]\\*/\\s*$|^(\\t|[ ])*[ ]\\*([ ]([^\\*]|\\*(?!/))*)?$")
		}
	};
	language = {
		defaultToken: "",
		tokenPostfix: ".tsp",
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
			}
		],
		symbols: /[=:;<>]+/,
		keywords,
		namedLiterals,
		escapes: `\\\\(u{[0-9A-Fa-f]+}|n|r|t|\\\\|"|\\\${)`,
		tokenizer: {
			root: [{ include: "@expression" }, { include: "@whitespace" }],
			stringVerbatim: [{
				regex: `(|"|"")[^"]`,
				action: { token: "string" }
			}, {
				regex: `"""${notBefore(`"`)}`,
				action: {
					token: "string",
					next: "@pop"
				}
			}],
			stringLiteral: [
				{
					regex: `\\\${`,
					action: {
						token: "delimiter.bracket",
						next: "@bracketCounting"
					}
				},
				{
					regex: `[^\\\\"$]+`,
					action: { token: "string" }
				},
				{
					regex: "@escapes",
					action: { token: "string.escape" }
				},
				{
					regex: `\\\\.`,
					action: { token: "string.escape.invalid" }
				},
				{
					regex: `"`,
					action: {
						token: "string",
						next: "@pop"
					}
				}
			],
			bracketCounting: [
				{
					regex: `{`,
					action: {
						token: "delimiter.bracket",
						next: "@bracketCounting"
					}
				},
				{
					regex: `}`,
					action: {
						token: "delimiter.bracket",
						next: "@pop"
					}
				},
				{ include: "@expression" }
			],
			comment: [
				{
					regex: `[^\\*]+`,
					action: { token: "comment" }
				},
				{
					regex: `\\*\\/`,
					action: {
						token: "comment",
						next: "@pop"
					}
				},
				{
					regex: `[\\/*]`,
					action: { token: "comment" }
				}
			],
			whitespace: [
				{ regex: nonCommentWs },
				{
					regex: `\\/\\*`,
					action: {
						token: "comment",
						next: "@comment"
					}
				},
				{
					regex: `\\/\\/.*$`,
					action: { token: "comment" }
				}
			],
			expression: [
				{
					regex: `"""`,
					action: {
						token: "string",
						next: "@stringVerbatim"
					}
				},
				{
					regex: `"${notBefore(`""`)}`,
					action: {
						token: "string",
						next: "@stringLiteral"
					}
				},
				{
					regex: numericLiteral,
					action: { token: "number" }
				},
				{
					regex: identifier,
					action: { cases: {
						"@keywords": { token: "keyword" },
						"@namedLiterals": { token: "keyword" },
						"@default": { token: "identifier" }
					} }
				},
				{
					regex: `@${identifier}`,
					action: { token: "tag" }
				},
				{
					regex: `#${directive}`,
					action: { token: "directive" }
				}
			]
		}
	};
}))();
export { conf, language };
