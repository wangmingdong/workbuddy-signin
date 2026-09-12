import { n as __esmMin, r as __exportAll } from "./chunk-BRZcfu7K.js";
//#region ../../node_modules/refractor/lang/clike.js
var clike_exports = /* @__PURE__ */ __exportAll({ default: () => clike });
/** @param {Refractor} Prism */
function clike(Prism) {
	Prism.languages.clike = {
		comment: [{
			pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
			lookbehind: true,
			greedy: true
		}, {
			pattern: /(^|[^\\:])\/\/.*/,
			lookbehind: true,
			greedy: true
		}],
		string: {
			pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
			greedy: true
		},
		"class-name": {
			pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
			lookbehind: true,
			inside: { punctuation: /[.\\]/ }
		},
		keyword: /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
		boolean: /\b(?:false|true)\b/,
		function: /\b\w+(?=\()/,
		number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
		operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
		punctuation: /[{}[\];(),.:]/
	};
}
var init_clike = __esmMin((() => {
	/**
	* @import {Refractor} from '../lib/core.js'
	*/
	clike.displayName = "clike";
	clike.aliases = [];
}));
//#endregion
export { clike_exports as n, init_clike as r, clike as t };
