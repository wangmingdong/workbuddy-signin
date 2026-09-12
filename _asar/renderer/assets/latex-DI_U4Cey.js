import { n as __esmMin } from "./chunk-BRZcfu7K.js";
//#region ../../node_modules/refractor/lang/latex.js
/** @param {Refractor} Prism */
function latex(Prism) {
	(function(Prism) {
		var funcPattern = /\\(?:[^a-z()[\]]|[a-z*]+)/i;
		var insideEqu = { "equation-command": {
			pattern: funcPattern,
			alias: "regex"
		} };
		Prism.languages.latex = {
			comment: /%.*/,
			cdata: {
				pattern: /(\\begin\{((?:lstlisting|verbatim)\*?)\})[\s\S]*?(?=\\end\{\2\})/,
				lookbehind: true
			},
			equation: [{
				pattern: /\$\$(?:\\[\s\S]|[^\\$])+\$\$|\$(?:\\[\s\S]|[^\\$])+\$|\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\]/,
				inside: insideEqu,
				alias: "string"
			}, {
				pattern: /(\\begin\{((?:align|eqnarray|equation|gather|math|multline)\*?)\})[\s\S]*?(?=\\end\{\2\})/,
				lookbehind: true,
				inside: insideEqu,
				alias: "string"
			}],
			keyword: {
				pattern: /(\\(?:begin|cite|documentclass|end|label|ref|usepackage)(?:\[[^\]]+\])?\{)[^}]+(?=\})/,
				lookbehind: true
			},
			url: {
				pattern: /(\\url\{)[^}]+(?=\})/,
				lookbehind: true
			},
			headline: {
				pattern: /(\\(?:chapter|frametitle|paragraph|part|section|subparagraph|subsection|subsubparagraph|subsubsection|subsubsubparagraph)\*?(?:\[[^\]]+\])?\{)[^}]+(?=\})/,
				lookbehind: true,
				alias: "class-name"
			},
			function: {
				pattern: funcPattern,
				alias: "selector"
			},
			punctuation: /[[\]{}&]/
		};
		Prism.languages.tex = Prism.languages.latex;
		Prism.languages.context = Prism.languages.latex;
	})(Prism);
}
//#endregion
__esmMin((() => {
	/**
	* @import {Refractor} from '../lib/core.js'
	*/
	latex.displayName = "latex";
	latex.aliases = ["context", "tex"];
}))();
export { latex as default };
