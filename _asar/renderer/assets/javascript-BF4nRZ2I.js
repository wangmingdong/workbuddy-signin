import { n as __esmMin } from "./chunk-BRZcfu7K.js";
import { conf as conf$1, language as language$1, t as init_typescript } from "./typescript-D3UCsjT5.js";
//#region ../../node_modules/monaco-editor/esm/vs/basic-languages/javascript/javascript.js
var conf, language;
//#endregion
__esmMin((() => {
	init_typescript();
	conf = conf$1;
	language = {
		defaultToken: "invalid",
		tokenPostfix: ".js",
		keywords: [
			"break",
			"case",
			"catch",
			"class",
			"continue",
			"const",
			"constructor",
			"debugger",
			"default",
			"delete",
			"do",
			"else",
			"export",
			"extends",
			"false",
			"finally",
			"for",
			"from",
			"function",
			"get",
			"if",
			"import",
			"in",
			"instanceof",
			"let",
			"new",
			"null",
			"return",
			"set",
			"static",
			"super",
			"switch",
			"symbol",
			"this",
			"throw",
			"true",
			"try",
			"typeof",
			"undefined",
			"var",
			"void",
			"while",
			"with",
			"yield",
			"async",
			"await",
			"of"
		],
		typeKeywords: [],
		operators: language$1.operators,
		symbols: language$1.symbols,
		escapes: language$1.escapes,
		digits: language$1.digits,
		octaldigits: language$1.octaldigits,
		binarydigits: language$1.binarydigits,
		hexdigits: language$1.hexdigits,
		regexpctl: language$1.regexpctl,
		regexpesc: language$1.regexpesc,
		tokenizer: language$1.tokenizer
	};
}))();
export { conf, language };
