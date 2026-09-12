import { t as __commonJSMin } from "./chunk-BRZcfu7K.js";
import { t as require_katex } from "./katex-sFwAzkhG.js";
//#region ../../node_modules/markdown-it-texmath/texmath.js
var require_texmath = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function escapeHTML(text) {
		return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
	}
	function texmath(md, options) {
		const delimiters = texmath.mergeDelimiters(options && options.delimiters);
		const outerSpace = options && options.outerSpace || false;
		const katexOptions = options && options.katexOptions || {};
		katexOptions.throwOnError = katexOptions.throwOnError || false;
		katexOptions.macros = katexOptions.macros || options && options.macros;
		if (!texmath.katex) if (options && typeof options.engine === "object") texmath.katex = options.engine;
		else if (typeof module === "object") texmath.katex = require_katex();
		else texmath.katex = { renderToString() {
			return "No math renderer found.";
		} };
		for (const rule of delimiters.inline) {
			if (!!outerSpace && "outerSpace" in rule) rule.outerSpace = true;
			md.inline.ruler.before("escape", rule.name, texmath.inline(rule));
			md.renderer.rules[rule.name] = (tokens, idx) => rule.tmpl.replace(/\$1/, texmath.render(tokens[idx].content, !!rule.displayMode, katexOptions));
		}
		for (const rule of delimiters.block) {
			md.block.ruler.before("fence", rule.name, texmath.block(rule));
			md.renderer.rules[rule.name] = (tokens, idx) => rule.tmpl.replace(/\$2/, escapeHTML(tokens[idx].info)).replace(/\$1/, texmath.render(tokens[idx].content, true, katexOptions));
		}
	}
	texmath.mergeDelimiters = function(delims) {
		const delimsArr = Array.isArray(delims) ? delims : typeof delims === "string" ? [delims] : ["dollars"];
		const delimiters = {
			inline: [],
			block: []
		};
		for (const delim of delimsArr) if (delim in texmath.rules) {
			delimiters.inline.push(...texmath.rules[delim].inline);
			delimiters.block.push(...texmath.rules[delim].block);
		}
		return delimiters;
	};
	texmath.inline = (rule) => function(state, silent) {
		const pos = state.pos;
		const str = state.src;
		const match = str.startsWith(rule.tag, rule.rex.lastIndex = pos) && (!rule.pre || rule.pre(str, rule.outerSpace, pos)) && rule.rex.exec(str);
		const res = !!match && pos < rule.rex.lastIndex && (!rule.post || rule.post(str, rule.outerSpace, rule.rex.lastIndex - 1));
		if (res) {
			if (!silent) {
				const token = state.push(rule.name, "math", 0);
				token.content = match[1];
				token.markup = rule.tag;
			}
			state.pos = rule.rex.lastIndex;
		}
		return res;
	};
	texmath.block = (rule) => function block(state, begLine, endLine, silent) {
		const pos = state.bMarks[begLine] + state.tShift[begLine];
		const str = state.src;
		const match = str.startsWith(rule.tag, rule.rex.lastIndex = pos) && (!rule.pre || rule.pre(str, false, pos)) && rule.rex.exec(str);
		const res = !!match && pos < rule.rex.lastIndex && (!rule.post || rule.post(str, false, rule.rex.lastIndex - 1));
		if (res && !silent) {
			const endpos = rule.rex.lastIndex - 1;
			let curline;
			for (curline = begLine; curline < endLine; curline++) if (endpos >= state.bMarks[curline] + state.tShift[curline] && endpos <= state.eMarks[curline]) break;
			const lineMax = state.lineMax;
			const parentType = state.parentType;
			state.lineMax = curline;
			state.parentType = "math";
			if (parentType === "blockquote") match[1] = match[1].replace(/(\n*?^(?:\s*>)+)/gm, "");
			let token = state.push(rule.name, "math", 0);
			token.block = true;
			token.tag = rule.tag;
			token.markup = "";
			token.content = match[1];
			token.info = match[match.length - 1];
			token.map = [begLine, curline + 1];
			state.parentType = parentType;
			state.lineMax = lineMax;
			state.line = curline + 1;
		}
		return res;
	};
	texmath.render = function(tex, displayMode, options) {
		options.displayMode = displayMode;
		let res;
		try {
			res = texmath.katex.renderToString(tex, options);
		} catch (err) {
			res = escapeHTML(`${tex}:${err.message}`);
		}
		return res;
	};
	texmath.use = function(katex) {
		texmath.katex = katex;
		return texmath;
	};
	texmath.inlineRuleNames = ["math_inline", "math_inline_double"];
	texmath.blockRuleNames = ["math_block", "math_block_eqno"];
	texmath.$_pre = (str, outerSpace, beg) => {
		const prv = beg > 0 ? str[beg - 1].charCodeAt(0) : false;
		return outerSpace ? !prv || prv === 32 : !prv || prv !== 92 && (prv < 48 || prv > 57);
	};
	texmath.$_post = (str, outerSpace, end) => {
		const nxt = str[end + 1] && str[end + 1].charCodeAt(0);
		return outerSpace ? !nxt || nxt === 32 || nxt === 46 || nxt === 44 || nxt === 59 : !nxt || nxt < 48 || nxt > 57;
	};
	texmath.rules = {
		brackets: {
			inline: [{
				name: "math_inline",
				rex: /\\\((.+?)\\\)/gy,
				tmpl: "<eq>$1</eq>",
				tag: "\\("
			}],
			block: [{
				name: "math_block_eqno",
				rex: /\\\[(((?!\\\]|\\\[)[\s\S])+?)\\\]\s*?\(([^)$\r\n]+?)\)/gmy,
				tmpl: "<section class=\"eqno\"><eqn>$1</eqn><span>($2)</span></section>",
				tag: "\\["
			}, {
				name: "math_block",
				rex: /\\\[([\s\S]+?)\\\]/gmy,
				tmpl: "<section><eqn>$1</eqn></section>",
				tag: "\\["
			}]
		},
		doxygen: {
			inline: [{
				name: "math_inline",
				rex: /\\f\$(.+?)\\f\$/gy,
				tmpl: "<eq>$1</eq>",
				tag: "\\f$"
			}],
			block: [{
				name: "math_block_eqno",
				rex: /\\f\[([^]+?)\\f\]\s*?\(([^)\s]+?)\)/gmy,
				tmpl: "<section class=\"eqno\"><eqn>$1</eqn><span>($2)</span></section>",
				tag: "\\f["
			}, {
				name: "math_block",
				rex: /\\f\[([^]+?)\\f\]/gmy,
				tmpl: "<section><eqn>$1</eqn></section>",
				tag: "\\f["
			}]
		},
		gitlab: {
			inline: [{
				name: "math_inline",
				rex: /\$`(.+?)`\$/gy,
				tmpl: "<eq>$1</eq>",
				tag: "$`"
			}],
			block: [{
				name: "math_block_eqno",
				rex: /`{3}math\s*([^`]+?)\s*?`{3}\s*\(([^)\r\n]+?)\)/gm,
				tmpl: "<section class=\"eqno\"><eqn>$1</eqn><span>($2)</span></section>",
				tag: "```math"
			}, {
				name: "math_block",
				rex: /`{3}math\s*([^`]*?)\s*`{3}/gm,
				tmpl: "<section><eqn>$1</eqn></section>",
				tag: "```math"
			}]
		},
		julia: {
			inline: [{
				name: "math_inline",
				rex: /`{2}([^`]+?)`{2}/gy,
				tmpl: "<eq>$1</eq>",
				tag: "``"
			}, {
				name: "math_inline",
				rex: /\$((?:\S?)|(?:\S.*?\S))\$/gy,
				tmpl: "<eq>$1</eq>",
				tag: "$",
				spaceEnclosed: false,
				pre: texmath.$_pre,
				post: texmath.$_post
			}],
			block: [{
				name: "math_block_eqno",
				rex: /`{3}math\s+?([^`]+?)\s+?`{3}\s*?\(([^)$\r\n]+?)\)/gmy,
				tmpl: "<section class=\"eqno\"><eqn>$1</eqn><span>($2)</span></section>",
				tag: "```math"
			}, {
				name: "math_block",
				rex: /`{3}math\s+?([^`]+?)\s+?`{3}/gmy,
				tmpl: "<section><eqn>$1</eqn></section>",
				tag: "```math"
			}]
		},
		kramdown: {
			inline: [{
				name: "math_inline",
				rex: /\${2}(.+?)\${2}/gy,
				tmpl: "<eq>$1</eq>",
				tag: "$$"
			}],
			block: [{
				name: "math_block_eqno",
				rex: /\${2}([^$]+?)\${2}\s*?\(([^)\s]+?)\)/gmy,
				tmpl: "<section class=\"eqno\"><eqn>$1</eqn><span>($2)</span></section>",
				tag: "$$"
			}, {
				name: "math_block",
				rex: /\${2}([^$]+?)\${2}/gmy,
				tmpl: "<section><eqn>$1</eqn></section>",
				tag: "$$"
			}]
		},
		beg_end: {
			inline: [],
			block: [{
				name: "math_block",
				rex: /(\\(?:begin)\{([a-z]+)\}[\s\S]+?\\(?:end)\{\2\})/gmy,
				tmpl: "<section><eqn>$1</eqn></section>",
				tag: "\\"
			}]
		},
		dollars: {
			inline: [{
				name: "math_inline_double",
				rex: /\${2}([^$]*?[^\\])\${2}/gy,
				tmpl: "<section><eqn>$1</eqn></section>",
				tag: "$$",
				displayMode: true,
				pre: texmath.$_pre,
				post: texmath.$_post
			}, {
				name: "math_inline",
				rex: /\$((?:[^\s\\])|(?:\S.*?[^\s\\]))\$/gy,
				tmpl: "<eq>$1</eq>",
				tag: "$",
				outerSpace: false,
				pre: texmath.$_pre,
				post: texmath.$_post
			}],
			block: [{
				name: "math_block_eqno",
				rex: /\${2}([^$]*?[^\\])\${2}\s*?\(([^)\s]+?)\)/gmy,
				tmpl: "<section class=\"eqno\"><eqn>$1</eqn><span>($2)</span></section>",
				tag: "$$"
			}, {
				name: "math_block",
				rex: /\${2}([^$]*?[^\\])\${2}/gmy,
				tmpl: "<section><eqn>$1</eqn></section>",
				tag: "$$"
			}]
		}
	};
	if (typeof module === "object" && module.exports) module.exports = texmath;
}));
//#endregion
export { require_texmath as t };
