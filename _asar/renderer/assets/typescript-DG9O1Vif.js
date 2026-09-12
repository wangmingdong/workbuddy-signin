import { n as __esmMin } from "./chunk-BRZcfu7K.js";
import { n as javascript, t as init_javascript } from "./javascript-DMTrGEJM.js";
//#region ../../node_modules/refractor/lang/typescript.js
/** @param {Refractor} Prism */
function typescript(Prism) {
	Prism.register(javascript);
	(function(Prism) {
		Prism.languages.typescript = Prism.languages.extend("javascript", {
			"class-name": {
				pattern: /(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,
				lookbehind: true,
				greedy: true,
				inside: null
			},
			builtin: /\b(?:Array|Function|Promise|any|boolean|console|never|number|string|symbol|unknown)\b/
		});
		Prism.languages.typescript.keyword.push(/\b(?:abstract|declare|is|keyof|readonly|require)\b/, /\b(?:asserts|infer|interface|module|namespace|type)\b(?=\s*(?:[{_$a-zA-Z\xA0-\uFFFF]|$))/, /\btype\b(?=\s*(?:[\{*]|$))/);
		delete Prism.languages.typescript["parameter"];
		delete Prism.languages.typescript["literal-property"];
		var typeInside = Prism.languages.extend("typescript", {});
		delete typeInside["class-name"];
		Prism.languages.typescript["class-name"].inside = typeInside;
		Prism.languages.insertBefore("typescript", "function", {
			decorator: {
				pattern: /@[$\w\xA0-\uFFFF]+/,
				inside: {
					at: {
						pattern: /^@/,
						alias: "operator"
					},
					function: /^[\s\S]+/
				}
			},
			"generic-function": {
				pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,
				greedy: true,
				inside: {
					function: /^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,
					generic: {
						pattern: /<[\s\S]+/,
						alias: "class-name",
						inside: typeInside
					}
				}
			}
		});
		Prism.languages.ts = Prism.languages.typescript;
	})(Prism);
}
var init_typescript = __esmMin((() => {
	init_javascript();
	typescript.displayName = "typescript";
	typescript.aliases = ["ts"];
}));
//#endregion
init_typescript();
export { typescript as default, init_typescript as t };
