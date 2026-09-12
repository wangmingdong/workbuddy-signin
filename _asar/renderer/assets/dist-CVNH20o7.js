import { n as __esmMin, r as __exportAll } from "./chunk-BRZcfu7K.js";
//#region ../../node_modules/oniguruma-parser/dist/utils.js
function r$2(e) {
	if ([...e].length !== 1) throw new Error(`Expected "${e}" to be a single code point`);
	return e.codePointAt(0);
}
function l$1(e, t, n) {
	return e.has(t) || e.set(t, n), e.get(t);
}
function u(e, t) {
	if (e == null) throw new Error(t ?? "Value expected");
	return e;
}
var i, o$1;
var init_utils = __esmMin((() => {
	i = new Set([
		"alnum",
		"alpha",
		"ascii",
		"blank",
		"cntrl",
		"digit",
		"graph",
		"lower",
		"print",
		"punct",
		"space",
		"upper",
		"word",
		"xdigit"
	]), o$1 = String.raw;
}));
//#endregion
//#region ../../node_modules/oniguruma-parser/dist/tokenizer/tokenize.js
function M$1(e, n = {}) {
	const t = {
		flags: "",
		...n,
		rules: {
			captureGroup: !1,
			singleline: !1,
			...n.rules
		}
	};
	if (typeof e != "string") throw new Error("String expected as pattern");
	const o = Y(t.flags), s = [o.extended], a = {
		captureGroup: t.rules.captureGroup,
		getCurrentModX() {
			return s.at(-1);
		},
		numOpenGroups: 0,
		popModX() {
			s.pop();
		},
		pushModX(u) {
			s.push(u);
		},
		replaceCurrentModX(u) {
			s[s.length - 1] = u;
		},
		singleline: t.rules.singleline
	};
	let r = [], i;
	for (C$1.lastIndex = 0; i = C$1.exec(e);) {
		const u = F$1(a, e, i[0], C$1.lastIndex);
		u.tokens ? r.push(...u.tokens) : u.token && r.push(u.token), u.lastIndex !== void 0 && (C$1.lastIndex = u.lastIndex);
	}
	const l = [];
	let c = 0;
	r.filter((u) => u.type === "GroupOpen").forEach((u) => {
		u.kind === "capturing" ? u.number = ++c : u.raw === "(" && l.push(u);
	}), c || l.forEach((u, S) => {
		u.kind = "capturing", u.number = S + 1;
	});
	const g = c || l.length;
	return {
		tokens: r.map((u) => u.type === "EscapedNumber" ? ee$1(u, g) : u).flat(),
		flags: o
	};
}
function F$1(e, n, t, o) {
	const [s, a] = t;
	if (t === "[" || t === "[^") {
		const r = K$1(n, t, o);
		return {
			tokens: r.tokens,
			lastIndex: r.lastIndex
		};
	}
	if (s === "\\") {
		if ("AbBGyYzZ".includes(a)) return { token: w$1(t, t) };
		if (/^\\g[<']/.test(t)) {
			if (!/^\\g(?:<[^>]+>|'[^']+')$/.test(t)) throw new Error(`Invalid group name "${t}"`);
			return { token: R$1(t) };
		}
		if (/^\\k[<']/.test(t)) {
			if (!/^\\k(?:<[^>]+>|'[^']+')$/.test(t)) throw new Error(`Invalid group name "${t}"`);
			return { token: A$1(t) };
		}
		if (a === "K") return { token: I$1("keep", t) };
		if (a === "N" || a === "R") return { token: k$1("newline", t, { negate: a === "N" }) };
		if (a === "O") return { token: k$1("any", t) };
		if (a === "X") return { token: k$1("text_segment", t) };
		const r = x(t, { inCharClass: !1 });
		return Array.isArray(r) ? { tokens: r } : { token: r };
	}
	if (s === "(") {
		if (a === "*") return { token: j(t) };
		if (t === "(?{") throw new Error(`Unsupported callout "${t}"`);
		if (t.startsWith("(?#")) {
			if (n[o] !== ")") throw new Error("Unclosed comment group \"(?#\"");
			return { lastIndex: o + 1 };
		}
		if (/^\(\?[-imx]+[:)]$/.test(t)) return { token: L$1(t, e) };
		if (e.pushModX(e.getCurrentModX()), e.numOpenGroups++, t === "(" && !e.captureGroup || t === "(?:") return { token: f$1("group", t) };
		if (t === "(?>") return { token: f$1("atomic", t) };
		if (t === "(?=" || t === "(?!" || t === "(?<=" || t === "(?<!") return { token: f$1(t[2] === "<" ? "lookbehind" : "lookahead", t, { negate: t.endsWith("!") }) };
		if (t === "(" && e.captureGroup || t.startsWith("(?<") && t.endsWith(">") || t.startsWith("(?'") && t.endsWith("'")) return { token: f$1("capturing", t, { ...t !== "(" && { name: t.slice(3, -1) } }) };
		if (t.startsWith("(?~")) {
			if (t === "(?~|") throw new Error(`Unsupported absence function kind "${t}"`);
			return { token: f$1("absence_repeater", t) };
		}
		throw t === "(?(" ? /* @__PURE__ */ new Error(`Unsupported conditional "${t}"`) : /* @__PURE__ */ new Error(`Invalid or unsupported group option "${t}"`);
	}
	if (t === ")") {
		if (e.popModX(), e.numOpenGroups--, e.numOpenGroups < 0) throw new Error("Unmatched \")\"");
		return { token: Q$1(t) };
	}
	if (e.getCurrentModX()) {
		if (t === "#") {
			const r = n.indexOf(`
`, o);
			return { lastIndex: r === -1 ? n.length : r };
		}
		if (/^\s$/.test(t)) {
			const r = /\s+/y;
			return r.lastIndex = o, { lastIndex: r.exec(n) ? r.lastIndex : o };
		}
	}
	if (t === ".") return { token: k$1("dot", t) };
	if (t === "^" || t === "$") return { token: w$1(e.singleline ? {
		"^": o$1`\A`,
		$: o$1`\Z`
	}[t] : t, t) };
	return t === "|" ? { token: P$1(t) } : y$1.test(t) ? { tokens: te$1(t) } : { token: d(r$2(t), t) };
}
function K$1(e, n, t) {
	const o = [E$1(n[1] === "^", n)];
	let s = 1, a;
	for (T$1.lastIndex = t; a = T$1.exec(e);) {
		const r = a[0];
		if (r[0] === "[" && r[1] !== ":") s++, o.push(E$1(r[1] === "^", r));
		else if (r === "]") {
			if (o.at(-1).type === "CharacterClassOpen") o.push(d(93, r));
			else if (s--, o.push(z$1(r)), !s) break;
		} else {
			const i = X$1(r);
			Array.isArray(i) ? o.push(...i) : o.push(i);
		}
	}
	return {
		tokens: o,
		lastIndex: T$1.lastIndex || e.length
	};
}
function X$1(e) {
	if (e[0] === "\\") return x(e, { inCharClass: !0 });
	if (e[0] === "[") {
		const n = /\[:(?<negate>\^?)(?<name>[a-z]+):\]/.exec(e);
		if (!n || !i.has(n.groups.name)) throw new Error(`Invalid POSIX class "${e}"`);
		return k$1("posix", e, {
			value: n.groups.name,
			negate: !!n.groups.negate
		});
	}
	return e === "-" ? U$1(e) : e === "&&" ? H(e) : d(r$2(e), e);
}
function x(e, { inCharClass: n }) {
	const t = e[1];
	if (t === "c" || t === "C") return Z(e);
	if ("dDhHsSwW".includes(t)) return q(e);
	if (e.startsWith(o$1`\o{`)) throw new Error(`Incomplete, invalid, or unsupported octal code point "${e}"`);
	if (/^\\[pP]\{/.test(e)) {
		if (e.length === 3) throw new Error(`Incomplete or invalid Unicode property "${e}"`);
		return V$1(e);
	}
	if (/^\\x[89A-Fa-f]\p{AHex}/u.test(e)) try {
		const o = e.split(/\\x/).slice(1).map((i) => parseInt(i, 16)), s = new TextDecoder("utf-8", {
			ignoreBOM: !0,
			fatal: !0
		}).decode(new Uint8Array(o)), a = new TextEncoder();
		return [...s].map((i) => {
			const l = [...a.encode(i)].map((c) => `\\x${c.toString(16)}`).join("");
			return d(r$2(i), l);
		});
	} catch {
		throw new Error(`Multibyte code "${e}" incomplete or invalid in Oniguruma`);
	}
	if (t === "u" || t === "x") return d(J$1(e), e);
	if ($$1.has(t)) return d($$1.get(t), e);
	if (/\d/.test(t)) return W$1(n, e);
	if (e === "\\") throw new Error(o$1`Incomplete escape "\"`);
	if (t === "M") throw new Error(`Unsupported meta "${e}"`);
	if ([...e].length === 2) return d(e.codePointAt(1), e);
	throw new Error(`Unexpected escape "${e}"`);
}
function P$1(e) {
	return {
		type: "Alternator",
		raw: e
	};
}
function w$1(e, n) {
	return {
		type: "Assertion",
		kind: e,
		raw: n
	};
}
function A$1(e) {
	return {
		type: "Backreference",
		raw: e
	};
}
function d(e, n) {
	return {
		type: "Character",
		value: e,
		raw: n
	};
}
function z$1(e) {
	return {
		type: "CharacterClassClose",
		raw: e
	};
}
function U$1(e) {
	return {
		type: "CharacterClassHyphen",
		raw: e
	};
}
function H(e) {
	return {
		type: "CharacterClassIntersector",
		raw: e
	};
}
function E$1(e, n) {
	return {
		type: "CharacterClassOpen",
		negate: e,
		raw: n
	};
}
function k$1(e, n, t = {}) {
	return {
		type: "CharacterSet",
		kind: e,
		...t,
		raw: n
	};
}
function I$1(e, n, t = {}) {
	return e === "keep" ? {
		type: "Directive",
		kind: e,
		raw: n
	} : {
		type: "Directive",
		kind: e,
		flags: u(t.flags),
		raw: n
	};
}
function W$1(e, n) {
	return {
		type: "EscapedNumber",
		inCharClass: e,
		raw: n
	};
}
function Q$1(e) {
	return {
		type: "GroupClose",
		raw: e
	};
}
function f$1(e, n, t = {}) {
	return {
		type: "GroupOpen",
		kind: e,
		...t,
		raw: n
	};
}
function D$1(e, n, t, o) {
	return {
		type: "NamedCallout",
		kind: e,
		tag: n,
		arguments: t,
		raw: o
	};
}
function _$1(e, n, t, o) {
	return {
		type: "Quantifier",
		kind: e,
		min: n,
		max: t,
		raw: o
	};
}
function R$1(e) {
	return {
		type: "Subroutine",
		raw: e
	};
}
function Z(e) {
	const n = e[1] === "c" ? e[2] : e[3];
	if (!n || !/[A-Za-z]/.test(n)) throw new Error(`Unsupported control character "${e}"`);
	return d(r$2(n.toUpperCase()) - 64, e);
}
function L$1(e, n) {
	let { on: t, off: o } = /^\(\?(?<on>[imx]*)(?:-(?<off>[-imx]*))?/.exec(e).groups;
	o ??= "";
	const s = (n.getCurrentModX() || t.includes("x")) && !o.includes("x"), a = v(t), r = v(o), i = {};
	if (a && (i.enable = a), r && (i.disable = r), e.endsWith(")")) return n.replaceCurrentModX(s), I$1("flags", e, { flags: i });
	if (e.endsWith(":")) return n.pushModX(s), n.numOpenGroups++, f$1("group", e, { ...(a || r) && { flags: i } });
	throw new Error(`Unexpected flag modifier "${e}"`);
}
function j(e) {
	const n = /\(\*(?<name>[A-Za-z_]\w*)?(?:\[(?<tag>(?:[A-Za-z_]\w*)?)\])?(?:\{(?<args>[^}]*)\})?\)/.exec(e);
	if (!n) throw new Error(`Incomplete or invalid named callout "${e}"`);
	const { name: t, tag: o, args: s } = n.groups;
	if (!t) throw new Error(`Invalid named callout "${e}"`);
	if (o === "") throw new Error(`Named callout tag with empty value not allowed "${e}"`);
	const a = s ? s.split(",").filter((g) => g !== "").map((g) => /^[+-]?\d+$/.test(g) ? +g : g) : [], [r, i, l] = a, c = B$1.has(t) ? t.toLowerCase() : "custom";
	switch (c) {
		case "fail":
		case "mismatch":
		case "skip":
			if (a.length > 0) throw new Error(`Named callout arguments not allowed "${a}"`);
			break;
		case "error":
			if (a.length > 1) throw new Error(`Named callout allows only one argument "${a}"`);
			if (typeof r == "string") throw new Error(`Named callout argument must be a number "${r}"`);
			break;
		case "max":
			if (!a.length || a.length > 2) throw new Error(`Named callout must have one or two arguments "${a}"`);
			if (typeof r == "string" && !/^[A-Za-z_]\w*$/.test(r)) throw new Error(`Named callout argument one must be a tag or number "${r}"`);
			if (a.length === 2 && (typeof i == "number" || !/^[<>X]$/.test(i))) throw new Error(`Named callout optional argument two must be '<', '>', or 'X' "${i}"`);
			break;
		case "count":
		case "total_count":
			if (a.length > 1) throw new Error(`Named callout allows only one argument "${a}"`);
			if (a.length === 1 && (typeof r == "number" || !/^[<>X]$/.test(r))) throw new Error(`Named callout optional argument must be '<', '>', or 'X' "${r}"`);
			break;
		case "cmp":
			if (a.length !== 3) throw new Error(`Named callout must have three arguments "${a}"`);
			if (typeof r == "string" && !/^[A-Za-z_]\w*$/.test(r)) throw new Error(`Named callout argument one must be a tag or number "${r}"`);
			if (typeof i == "number" || !/^(?:[<>!=]=|[<>])$/.test(i)) throw new Error(`Named callout argument two must be '==', '!=', '>', '<', '>=', or '<=' "${i}"`);
			if (typeof l == "string" && !/^[A-Za-z_]\w*$/.test(l)) throw new Error(`Named callout argument three must be a tag or number "${l}"`);
			break;
		case "custom": throw new Error(`Undefined callout name "${t}"`);
		default: throw new Error(`Unexpected named callout kind "${c}"`);
	}
	return D$1(c, o ?? null, s?.split(",") ?? null, e);
}
function O$1(e) {
	let n = null, t, o;
	if (e[0] === "{") {
		const { minStr: s, maxStr: a } = /^\{(?<minStr>\d*)(?:,(?<maxStr>\d*))?/.exec(e).groups, r = 1e5;
		if (+s > r || a && +a > r) throw new Error("Quantifier value unsupported in Oniguruma");
		if (t = +s, o = a === void 0 ? +s : a === "" ? Infinity : +a, t > o && (n = "possessive", [t, o] = [o, t]), e.endsWith("?")) {
			if (n === "possessive") throw new Error("Unsupported possessive interval quantifier chain with \"?\"");
			n = "lazy";
		} else n || (n = "greedy");
	} else t = e[0] === "+" ? 1 : 0, o = e[0] === "?" ? 1 : Infinity, n = e[1] === "+" ? "possessive" : e[1] === "?" ? "lazy" : "greedy";
	return _$1(n, t, o, e);
}
function q(e) {
	const n = e[1].toLowerCase();
	return k$1({
		d: "digit",
		h: "hex",
		s: "space",
		w: "word"
	}[n], e, { negate: e[1] !== n });
}
function V$1(e) {
	const { p: n, neg: t, value: o } = /^\\(?<p>[pP])\{(?<neg>\^?)(?<value>[^}]+)/.exec(e).groups;
	return k$1("property", e, {
		value: o,
		negate: n === "P" && !t || n === "p" && !!t
	});
}
function v(e) {
	const n = {};
	return e.includes("i") && (n.ignoreCase = !0), e.includes("m") && (n.dotAll = !0), e.includes("x") && (n.extended = !0), Object.keys(n).length ? n : null;
}
function Y(e) {
	const n = {
		ignoreCase: !1,
		dotAll: !1,
		extended: !1,
		digitIsAscii: !1,
		posixIsAscii: !1,
		spaceIsAscii: !1,
		wordIsAscii: !1,
		textSegmentMode: null
	};
	for (let t = 0; t < e.length; t++) {
		const o = e[t];
		if (!"imxDPSWy".includes(o)) throw new Error(`Invalid flag "${o}"`);
		if (o === "y") {
			if (!/^y{[gw]}/.test(e.slice(t))) throw new Error("Invalid or unspecified flag \"y\" mode");
			n.textSegmentMode = e[t + 2] === "g" ? "grapheme" : "word", t += 3;
			continue;
		}
		n[{
			i: "ignoreCase",
			m: "dotAll",
			x: "extended",
			D: "digitIsAscii",
			P: "posixIsAscii",
			S: "spaceIsAscii",
			W: "wordIsAscii"
		}[o]] = !0;
	}
	return n;
}
function J$1(e) {
	if (/^(?:\\u(?!\p{AHex}{4})|\\x(?!\p{AHex}{1,2}|\{\p{AHex}{1,8}\}))/u.test(e)) throw new Error(`Incomplete or invalid escape "${e}"`);
	const n = e[2] === "{" ? /^\\x\{\s*(?<hex>\p{AHex}+)/u.exec(e).groups.hex : e.slice(2);
	return parseInt(n, 16);
}
function ee$1(e, n) {
	const { raw: t, inCharClass: o } = e, s = t.slice(1);
	if (!o && (s !== "0" && s.length === 1 || s[0] !== "0" && +s <= n)) return [A$1(t)];
	const a = [], r = s.match(/^[0-7]+|\d/g);
	for (let i = 0; i < r.length; i++) {
		const l = r[i];
		let c;
		if (i === 0 && l !== "8" && l !== "9") {
			if (c = parseInt(l, 8), c > 127) throw new Error(o$1`Octal encoded byte above 177 unsupported "${t}"`);
		} else c = r$2(l);
		a.push(d(c, (i === 0 ? "\\" : "") + l));
	}
	return a;
}
function te$1(e) {
	const n = [], t = new RegExp(y$1, "gy");
	let o;
	for (; o = t.exec(e);) {
		const s = o[0];
		if (s[0] === "{") {
			const a = /^\{(?<min>\d+),(?<max>\d+)\}\??$/.exec(s);
			if (a) {
				const { min: r, max: i } = a.groups;
				if (+r > +i && s.endsWith("?")) {
					t.lastIndex--, n.push(O$1(s.slice(0, -1)));
					continue;
				}
			}
		}
		n.push(O$1(s));
	}
	return n;
}
var m$1, b$1, y$1, C$1, T$1, B$1, $$1;
var init_tokenize = __esmMin((() => {
	init_utils();
	m$1 = o$1`\[\^?`, b$1 = `c.? | C(?:-.?)?|${o$1`[pP]\{(?:\^?[-\x20_]*[A-Za-z][-\x20\w]*\})?`}|${o$1`x[89A-Fa-f]\p{AHex}(?:\\x[89A-Fa-f]\p{AHex})*`}|${o$1`u(?:\p{AHex}{4})? | x\{[^\}]*\}? | x\p{AHex}{0,2}`}|${o$1`o\{[^\}]*\}?`}|${o$1`\d{1,3}`}`, y$1 = /[?*+][?+]?|\{(?:\d+(?:,\d*)?|,\d+)\}\??/, C$1 = new RegExp(o$1`
  \\ (?:
    ${b$1}
    | [gk]<[^>]*>?
    | [gk]'[^']*'?
    | .
  )
  | \( (?:
    \? (?:
      [:=!>({]
      | <[=!]
      | <[^>]*>
      | '[^']*'
      | ~\|?
      | #(?:[^)\\]|\\.?)*
      | [^:)]*[:)]
    )?
    | \*[^\)]*\)?
  )?
  | (?:${y$1.source})+
  | ${m$1}
  | .
`.replace(/\s+/g, ""), "gsu"), T$1 = new RegExp(o$1`
  \\ (?:
    ${b$1}
    | .
  )
  | \[:(?:\^?\p{Alpha}+|\^):\]
  | ${m$1}
  | &&
  | .
`.replace(/\s+/g, ""), "gsu");
	B$1 = new Set([
		"COUNT",
		"CMP",
		"ERROR",
		"FAIL",
		"MAX",
		"MISMATCH",
		"SKIP",
		"TOTAL_COUNT"
	]), $$1 = new Map([
		["a", 7],
		["b", 8],
		["e", 27],
		["f", 12],
		["n", 10],
		["r", 13],
		["t", 9],
		["v", 11]
	]);
}));
//#endregion
//#region ../../node_modules/oniguruma-parser/dist/parser/node-utils.js
function o(e, t) {
	if (!Array.isArray(e.body)) throw new Error("Expected node with body array");
	if (e.body.length !== 1) return !1;
	const r = e.body[0];
	return !t || Object.keys(t).every((n) => t[n] === r[n]);
}
function s(e) {
	return y.has(e.type);
}
var y;
var init_node_utils = __esmMin((() => {
	y = new Set([
		"AbsenceFunction",
		"Backreference",
		"CapturingGroup",
		"Character",
		"CharacterClass",
		"CharacterSet",
		"Group",
		"Quantifier",
		"Subroutine"
	]);
}));
//#endregion
//#region ../../node_modules/oniguruma-parser/dist/parser/parse.js
function J(e, r = {}) {
	const n = {
		flags: "",
		normalizeUnknownPropertyNames: !1,
		skipBackrefValidation: !1,
		skipLookbehindValidation: !1,
		skipPropertyNameValidation: !1,
		unicodePropertyMap: null,
		...r,
		rules: {
			captureGroup: !1,
			singleline: !1,
			...r.rules
		}
	}, t = M$1(e, {
		flags: n.flags,
		rules: {
			captureGroup: n.rules.captureGroup,
			singleline: n.rules.singleline
		}
	}), s = (p, N) => {
		const u = t.tokens[o.nextIndex];
		switch (o.parent = p, o.nextIndex++, u.type) {
			case "Alternator": return b();
			case "Assertion": return W(u);
			case "Backreference": return X(u, o);
			case "Character": return m(u.value, { useLastValid: !!N.isCheckingRangeEnd });
			case "CharacterClassHyphen": return ee(u, o, N);
			case "CharacterClassOpen": return re(u, o, N);
			case "CharacterSet": return ne(u, o);
			case "Directive": return I(u.kind, { flags: u.flags });
			case "GroupOpen": return te(u, o, N);
			case "NamedCallout": return U(u.kind, u.tag, u.arguments);
			case "Quantifier": return oe(u, o);
			case "Subroutine": return ae(u, o);
			default: throw new Error(`Unexpected token type "${u.type}"`);
		}
	}, o = {
		capturingGroups: [],
		hasNumberedRef: !1,
		namedGroupsByName: /* @__PURE__ */ new Map(),
		nextIndex: 0,
		normalizeUnknownPropertyNames: n.normalizeUnknownPropertyNames,
		parent: null,
		skipBackrefValidation: n.skipBackrefValidation,
		skipLookbehindValidation: n.skipLookbehindValidation,
		skipPropertyNameValidation: n.skipPropertyNameValidation,
		subroutines: [],
		tokens: t.tokens,
		unicodePropertyMap: n.unicodePropertyMap,
		walk: s
	}, i = B(T(t.flags));
	let d = i.body[0];
	for (; o.nextIndex < t.tokens.length;) {
		const p = s(d, {});
		p.type === "Alternative" ? (i.body.push(p), d = p) : d.body.push(p);
	}
	const { capturingGroups: a, hasNumberedRef: l, namedGroupsByName: c, subroutines: f } = o;
	if (l && c.size && !n.rules.captureGroup) throw new Error("Numbered backref/subroutine not allowed when using named capture");
	for (const { ref: p } of f) if (typeof p == "number") {
		if (p > a.length) throw new Error("Subroutine uses a group number that's not defined");
		p && (a[p - 1].isSubroutined = !0);
	} else if (c.has(p)) {
		if (c.get(p).length > 1) throw new Error(o$1`Subroutine uses a duplicate group name "\g<${p}>"`);
		c.get(p)[0].isSubroutined = !0;
	} else throw new Error(o$1`Subroutine uses a group name that's not defined "\g<${p}>"`);
	return i;
}
function W({ kind: e }) {
	return F(u({
		"^": "line_start",
		$: "line_end",
		"\\A": "string_start",
		"\\b": "word_boundary",
		"\\B": "word_boundary",
		"\\G": "search_start",
		"\\y": "text_segment_boundary",
		"\\Y": "text_segment_boundary",
		"\\z": "string_end",
		"\\Z": "string_end_newline"
	}[e], `Unexpected assertion kind "${e}"`), { negate: e === o$1`\B` || e === o$1`\Y` });
}
function X({ raw: e }, r) {
	const n = /^\\k[<']/.test(e), t = n ? e.slice(3, -1) : e.slice(1), s = (o, i = !1) => {
		const d = r.capturingGroups.length;
		let a = !1;
		if (o > d) if (r.skipBackrefValidation) a = !0;
		else throw new Error(`Not enough capturing groups defined to the left "${e}"`);
		return r.hasNumberedRef = !0, k(i ? d + 1 - o : o, { orphan: a });
	};
	if (n) {
		const o = /^(?<sign>-?)0*(?<num>[1-9]\d*)$/.exec(t);
		if (o) return s(+o.groups.num, !!o.groups.sign);
		if (/[-+]/.test(t)) throw new Error(`Invalid backref name "${e}"`);
		if (!r.namedGroupsByName.has(t)) throw new Error(`Group name not defined to the left "${e}"`);
		return k(t);
	}
	return s(+t);
}
function ee(e, r, n) {
	const { tokens: t, walk: s } = r, o = r.parent, i = o.body.at(-1), d = t[r.nextIndex];
	if (!n.isCheckingRangeEnd && i && i.type !== "CharacterClass" && i.type !== "CharacterClassRange" && d && d.type !== "CharacterClassOpen" && d.type !== "CharacterClassClose" && d.type !== "CharacterClassIntersector") {
		const a = s(o, {
			...n,
			isCheckingRangeEnd: !0
		});
		if (i.type === "Character" && a.type === "Character") return o.body.pop(), L(i, a);
		throw new Error("Invalid character class range");
	}
	return m(r$2("-"));
}
function re({ negate: e }, r, n) {
	const { tokens: t, walk: s } = r, o = t[r.nextIndex], i = [C()];
	let d = z(o);
	for (; d.type !== "CharacterClassClose";) {
		if (d.type === "CharacterClassIntersector") i.push(C()), r.nextIndex++;
		else {
			const l = i.at(-1);
			l.body.push(s(l, n));
		}
		d = z(t[r.nextIndex], o);
	}
	const a = C({ negate: e });
	return i.length === 1 ? a.body = i[0].body : (a.kind = "intersection", a.body = i.map((l) => l.body.length === 1 ? l.body[0] : l)), r.nextIndex++, a;
}
function ne({ kind: e, negate: r, value: n }, t) {
	const { normalizeUnknownPropertyNames: s, skipPropertyNameValidation: o, unicodePropertyMap: i$1 } = t;
	if (e === "property") {
		const d = w(n);
		if (i.has(d) && !i$1?.has(d)) e = "posix", n = d;
		else return Q(n, {
			negate: r,
			normalizeUnknownPropertyNames: s,
			skipPropertyNameValidation: o,
			unicodePropertyMap: i$1
		});
	}
	return e === "posix" ? R(n, { negate: r }) : E(e, { negate: r });
}
function te(e, r, n) {
	const { tokens: t, capturingGroups: s, namedGroupsByName: o, skipLookbehindValidation: i, walk: d } = r, a = ie(e), l = a.type === "AbsenceFunction", c = $(a), f = c && a.negate;
	if (a.type === "CapturingGroup" && (s.push(a), a.name && l$1(o, a.name, []).push(a)), l && n.isInAbsenceFunction) throw new Error("Nested absence function not supported by Oniguruma");
	let p = D(t[r.nextIndex]);
	for (; p.type !== "GroupClose";) {
		if (p.type === "Alternator") a.body.push(b()), r.nextIndex++;
		else {
			const N = a.body.at(-1), u = d(N, {
				...n,
				isInAbsenceFunction: n.isInAbsenceFunction || l,
				isInLookbehind: n.isInLookbehind || c,
				isInNegLookbehind: n.isInNegLookbehind || f
			});
			if (N.body.push(u), (c || n.isInLookbehind) && !i) {
				const v = "Lookbehind includes a pattern not allowed by Oniguruma";
				if (f || n.isInNegLookbehind) {
					if (M(u) || u.type === "CapturingGroup") throw new Error(v);
				} else if (M(u) || $(u) && u.negate) throw new Error(v);
			}
		}
		p = D(t[r.nextIndex]);
	}
	return r.nextIndex++, a;
}
function oe({ kind: e, min: r, max: n }, t) {
	const s$1 = t.parent, o = s$1.body.at(-1);
	if (!o || !s(o)) throw new Error("Quantifier requires a repeatable token");
	const i = _(e, r, n, o);
	return s$1.body.pop(), i;
}
function ae({ raw: e }, r) {
	const { capturingGroups: n, subroutines: t } = r;
	let s = e.slice(3, -1);
	const o = /^(?<sign>[-+]?)0*(?<num>[1-9]\d*)$/.exec(s);
	if (o) {
		const d = +o.groups.num, a = n.length;
		if (r.hasNumberedRef = !0, s = {
			"": d,
			"+": a + d,
			"-": a + 1 - d
		}[o.groups.sign], s < 1) throw new Error("Invalid subroutine number");
	} else s === "0" && (s = 0);
	const i = O(s);
	return t.push(i), i;
}
function G(e, r) {
	if (e !== "repeater") throw new Error(`Unexpected absence function kind "${e}"`);
	return {
		type: "AbsenceFunction",
		kind: e,
		body: h(r?.body)
	};
}
function b(e) {
	return {
		type: "Alternative",
		body: V(e?.body)
	};
}
function F(e, r) {
	const n = {
		type: "Assertion",
		kind: e
	};
	return (e === "word_boundary" || e === "text_segment_boundary") && (n.negate = !!r?.negate), n;
}
function k(e, r) {
	const n = !!r?.orphan;
	return {
		type: "Backreference",
		ref: e,
		...n && { orphan: n }
	};
}
function P(e, r) {
	const n = {
		name: void 0,
		isSubroutined: !1,
		...r
	};
	if (n.name !== void 0 && !se(n.name)) throw new Error(`Group name "${n.name}" invalid in Oniguruma`);
	return {
		type: "CapturingGroup",
		number: e,
		...n.name && { name: n.name },
		...n.isSubroutined && { isSubroutined: n.isSubroutined },
		body: h(r?.body)
	};
}
function m(e, r) {
	const n = {
		useLastValid: !1,
		...r
	};
	if (e > 1114111) {
		const t = e.toString(16);
		if (n.useLastValid) e = 1114111;
		else throw e > 1310719 ? /* @__PURE__ */ new Error(`Invalid code point out of range "\\x{${t}}"`) : /* @__PURE__ */ new Error(`Invalid code point out of range in JS "\\x{${t}}"`);
	}
	return {
		type: "Character",
		value: e
	};
}
function C(e) {
	const r = {
		kind: "union",
		negate: !1,
		...e
	};
	return {
		type: "CharacterClass",
		kind: r.kind,
		negate: r.negate,
		body: V(e?.body)
	};
}
function L(e, r) {
	if (r.value < e.value) throw new Error("Character class range out of order");
	return {
		type: "CharacterClassRange",
		min: e,
		max: r
	};
}
function E(e, r) {
	const n = !!r?.negate, t = {
		type: "CharacterSet",
		kind: e
	};
	return (e === "digit" || e === "hex" || e === "newline" || e === "space" || e === "word") && (t.negate = n), (e === "text_segment" || e === "newline" && !n) && (t.variableLength = !0), t;
}
function I(e, r = {}) {
	if (e === "keep") return {
		type: "Directive",
		kind: e
	};
	if (e === "flags") return {
		type: "Directive",
		kind: e,
		flags: u(r.flags)
	};
	throw new Error(`Unexpected directive kind "${e}"`);
}
function T(e) {
	return {
		type: "Flags",
		...e
	};
}
function A(e) {
	const r = e?.atomic, n = e?.flags;
	if (r && n) throw new Error("Atomic group cannot have flags");
	return {
		type: "Group",
		...r && { atomic: r },
		...n && { flags: n },
		body: h(e?.body)
	};
}
function K(e) {
	const r = {
		behind: !1,
		negate: !1,
		...e
	};
	return {
		type: "LookaroundAssertion",
		kind: r.behind ? "lookbehind" : "lookahead",
		negate: r.negate,
		body: h(e?.body)
	};
}
function U(e, r, n) {
	return {
		type: "NamedCallout",
		kind: e,
		tag: r,
		arguments: n
	};
}
function R(e, r) {
	const n = !!r?.negate;
	if (!i.has(e)) throw new Error(`Invalid POSIX class "${e}"`);
	return {
		type: "CharacterSet",
		kind: "posix",
		value: e,
		negate: n
	};
}
function _(e, r, n, t) {
	if (r > n) throw new Error("Invalid reversed quantifier range");
	return {
		type: "Quantifier",
		kind: e,
		min: r,
		max: n,
		body: t
	};
}
function B(e, r) {
	return {
		type: "Regex",
		body: h(r?.body),
		flags: e
	};
}
function O(e) {
	return {
		type: "Subroutine",
		ref: e
	};
}
function Q(e, r) {
	const n = {
		negate: !1,
		normalizeUnknownPropertyNames: !1,
		skipPropertyNameValidation: !1,
		unicodePropertyMap: null,
		...r
	};
	let t = n.unicodePropertyMap?.get(w(e));
	if (!t) {
		if (n.normalizeUnknownPropertyNames) t = de(e);
		else if (n.unicodePropertyMap && !n.skipPropertyNameValidation) throw new Error(o$1`Invalid Unicode property "\p{${e}}"`);
	}
	return {
		type: "CharacterSet",
		kind: "property",
		value: t ?? e,
		negate: n.negate
	};
}
function ie({ flags: e, kind: r, name: n, negate: t, number: s }) {
	switch (r) {
		case "absence_repeater": return G("repeater");
		case "atomic": return A({ atomic: !0 });
		case "capturing": return P(s, { name: n });
		case "group": return A({ flags: e });
		case "lookahead":
		case "lookbehind": return K({
			behind: r === "lookbehind",
			negate: t
		});
		default: throw new Error(`Unexpected group kind "${r}"`);
	}
}
function h(e) {
	if (e === void 0) e = [b()];
	else if (!Array.isArray(e) || !e.length || !e.every((r) => r.type === "Alternative")) throw new Error("Invalid body; expected array of one or more Alternative nodes");
	return e;
}
function V(e) {
	if (e === void 0) e = [];
	else if (!Array.isArray(e) || !e.every((r) => !!r.type)) throw new Error("Invalid body; expected array of nodes");
	return e;
}
function M(e) {
	return e.type === "LookaroundAssertion" && e.kind === "lookahead";
}
function $(e) {
	return e.type === "LookaroundAssertion" && e.kind === "lookbehind";
}
function se(e) {
	return /^[\p{Alpha}\p{Pc}][^)]*$/u.test(e);
}
function de(e) {
	return e.trim().replace(/[- _]+/g, "_").replace(/[A-Z][a-z]+(?=[A-Z])/g, "$&_").replace(/[A-Za-z]+/g, (r) => r[0].toUpperCase() + r.slice(1).toLowerCase());
}
function w(e) {
	return e.replace(/[- _]+/g, "").toLowerCase();
}
function z(e, r) {
	return u(e, `${r?.type === "Character" && r.value === 93 ? "Empty" : "Unclosed"} character class`);
}
function D(e) {
	return u(e, "Unclosed group");
}
var init_parse = __esmMin((() => {
	init_tokenize();
	init_utils();
	init_node_utils();
}));
//#endregion
//#region ../../node_modules/oniguruma-parser/dist/traverser/traverse.js
function S(a, v, N = null) {
	function u$1(e, s) {
		for (let t = 0; t < e.length; t++) {
			const r = n(e[t], s, t, e);
			t = Math.max(-1, t + r);
		}
	}
	function n(e, s = null, t = null, r = null) {
		let i = 0, c = !1;
		const d = {
			node: e,
			parent: s,
			key: t,
			container: r,
			root: a,
			remove() {
				f(r).splice(Math.max(0, l(t) + i), 1), i--, c = !0;
			},
			removeAllNextSiblings() {
				return f(r).splice(l(t) + 1);
			},
			removeAllPrevSiblings() {
				const o = l(t) + i;
				return i -= o, f(r).splice(0, Math.max(0, o));
			},
			replaceWith(o, y = {}) {
				const b = !!y.traverse;
				r ? r[Math.max(0, l(t) + i)] = o : u(s, "Can't replace root node")[t] = o, b && n(o, s, t, r), c = !0;
			},
			replaceWithMultiple(o, y = {}) {
				const b = !!y.traverse;
				if (f(r).splice(Math.max(0, l(t) + i), 1, ...o), i += o.length - 1, b) {
					let g = 0;
					for (let x = 0; x < o.length; x++) g += n(o[x], s, l(t) + x + g, r);
				}
				c = !0;
			},
			skip() {
				c = !0;
			}
		}, { type: m } = e, h = v["*"], p = v[m], R = typeof h == "function" ? h : h?.enter, P = typeof p == "function" ? p : p?.enter;
		if (R?.(d, N), P?.(d, N), !c) switch (m) {
			case "AbsenceFunction":
			case "CapturingGroup":
			case "Group":
				u$1(e.body, e);
				break;
			case "Alternative":
			case "CharacterClass":
				u$1(e.body, e);
				break;
			case "Assertion":
			case "Backreference":
			case "Character":
			case "CharacterSet":
			case "Directive":
			case "Flags":
			case "NamedCallout":
			case "Subroutine": break;
			case "CharacterClassRange":
				n(e.min, e, "min"), n(e.max, e, "max");
				break;
			case "LookaroundAssertion":
				u$1(e.body, e);
				break;
			case "Quantifier":
				n(e.body, e, "body");
				break;
			case "Regex":
				u$1(e.body, e), n(e.flags, e, "flags");
				break;
			default: throw new Error(`Unexpected node type "${m}"`);
		}
		return p?.exit?.(d, N), h?.exit?.(d, N), i;
	}
	return n(a), a;
}
function f(a) {
	if (!Array.isArray(a)) throw new Error("Container expected");
	return a;
}
function l(a) {
	if (typeof a != "number") throw new Error("Numeric key expected");
	return a;
}
var init_traverse = __esmMin((() => {
	init_utils();
}));
//#endregion
//#region ../../node_modules/regex/src/utils-internals.js
/**
Updates the array in place by incrementing each value greater than or equal to the threshold.
@param {Array<number>} arr
@param {number} threshold
*/
function incrementIfAtLeast$1(arr, threshold) {
	for (let i = 0; i < arr.length; i++) if (arr[i] >= threshold) arr[i]++;
}
/**
@param {string} str
@param {number} pos
@param {string} oldValue
@param {string} newValue
@returns {string}
*/
function spliceStr(str, pos, oldValue, newValue) {
	return str.slice(0, pos) + newValue + str.slice(pos + oldValue.length);
}
var noncapturingDelim;
var init_utils_internals = __esmMin((() => {
	noncapturingDelim = String.raw`\(\?(?:[:=!>A-Za-z\-]|<[=!]|\(DEFINE\))`;
}));
//#endregion
//#region ../../node_modules/regex-utilities/src/index.js
/**
Replaces all unescaped instances of a regex pattern in the given context, using a replacement
string or callback.

Doesn't skip over complete multicharacter tokens (only `\` plus its folowing char) so must be used
with knowledge of what's safe to do given regex syntax. Assumes UnicodeSets-mode syntax.
@param {string} expression Search target
@param {string} needle Search as a regex pattern, with flags `su` applied
@param {string | (match: RegExpExecArray, details: {
context: 'DEFAULT' | 'CHAR_CLASS';
negated: boolean;
}) => string} replacement
@param {'DEFAULT' | 'CHAR_CLASS'} [context] All contexts if not specified
@returns {string} Updated expression
@example
const str = '.\\.\\\\.[[\\.].].';
replaceUnescaped(str, '\\.', '@');
// → '@\\.\\\\@[[\\.]@]@'
replaceUnescaped(str, '\\.', '@', Context.DEFAULT);
// → '@\\.\\\\@[[\\.].]@'
replaceUnescaped(str, '\\.', '@', Context.CHAR_CLASS);
// → '.\\.\\\\.[[\\.]@].'
*/
function replaceUnescaped(expression, needle, replacement, context) {
	const re = new RegExp(String.raw`${needle}|(?<$skip>\[\^?|\\?.)`, "gsu");
	const negated = [false];
	let numCharClassesOpen = 0;
	let result = "";
	for (const match of expression.matchAll(re)) {
		const { 0: m, groups: { $skip } } = match;
		if (!$skip && (!context || context === Context.DEFAULT === !numCharClassesOpen)) {
			if (replacement instanceof Function) result += replacement(match, {
				context: numCharClassesOpen ? Context.CHAR_CLASS : Context.DEFAULT,
				negated: negated[negated.length - 1]
			});
			else result += replacement;
			continue;
		}
		if (m[0] === "[") {
			numCharClassesOpen++;
			negated.push(m[1] === "^");
		} else if (m === "]" && numCharClassesOpen) {
			numCharClassesOpen--;
			negated.pop();
		}
		result += m;
	}
	return result;
}
/**
Runs a callback for each unescaped instance of a regex pattern in the given context.

Doesn't skip over complete multicharacter tokens (only `\` plus its folowing char) so must be used
with knowledge of what's safe to do given regex syntax. Assumes UnicodeSets-mode syntax.
@param {string} expression Search target
@param {string} needle Search as a regex pattern, with flags `su` applied
@param {(match: RegExpExecArray, details: {
context: 'DEFAULT' | 'CHAR_CLASS';
negated: boolean;
}) => void} callback
@param {'DEFAULT' | 'CHAR_CLASS'} [context] All contexts if not specified
*/
function forEachUnescaped(expression, needle, callback, context) {
	replaceUnescaped(expression, needle, callback, context);
}
/**
Returns a match object for the first unescaped instance of a regex pattern in the given context, or
`null`.

Doesn't skip over complete multicharacter tokens (only `\` plus its folowing char) so must be used
with knowledge of what's safe to do given regex syntax. Assumes UnicodeSets-mode syntax.
@param {string} expression Search target
@param {string} needle Search as a regex pattern, with flags `su` applied
@param {number} [pos] Offset to start the search
@param {'DEFAULT' | 'CHAR_CLASS'} [context] All contexts if not specified
@returns {RegExpExecArray | null}
*/
function execUnescaped(expression, needle, pos = 0, context) {
	if (!new RegExp(needle, "su").test(expression)) return null;
	const re = new RegExp(`${needle}|(?<$skip>\\\\?.)`, "gsu");
	re.lastIndex = pos;
	let numCharClassesOpen = 0;
	let match;
	while (match = re.exec(expression)) {
		const { 0: m, groups: { $skip } } = match;
		if (!$skip && (!context || context === Context.DEFAULT === !numCharClassesOpen)) return match;
		if (m === "[") numCharClassesOpen++;
		else if (m === "]" && numCharClassesOpen) numCharClassesOpen--;
		if (re.lastIndex == match.index) re.lastIndex++;
	}
	return null;
}
/**
Checks whether an unescaped instance of a regex pattern appears in the given context.

Doesn't skip over complete multicharacter tokens (only `\` plus its folowing char) so must be used
with knowledge of what's safe to do given regex syntax. Assumes UnicodeSets-mode syntax.
@param {string} expression Search target
@param {string} needle Search as a regex pattern, with flags `su` applied
@param {'DEFAULT' | 'CHAR_CLASS'} [context] All contexts if not specified
@returns {boolean} Whether the pattern was found
*/
function hasUnescaped(expression, needle, context) {
	return !!execUnescaped(expression, needle, 0, context);
}
/**
Extracts the full contents of a group (subpattern) from the given expression, accounting for
escaped characters, nested groups, and character classes. The group is identified by the position
where its contents start (the string index just after the group's opening delimiter). Returns the
rest of the string if the group is unclosed.

Assumes UnicodeSets-mode syntax.
@param {string} expression Search target
@param {number} contentsStartPos
@returns {string}
*/
function getGroupContents(expression, contentsStartPos) {
	const token = /\\?./gsu;
	token.lastIndex = contentsStartPos;
	let contentsEndPos = expression.length;
	let numCharClassesOpen = 0;
	let numGroupsOpen = 1;
	let match;
	while (match = token.exec(expression)) {
		const [m] = match;
		if (m === "[") numCharClassesOpen++;
		else if (!numCharClassesOpen) {
			if (m === "(") numGroupsOpen++;
			else if (m === ")") {
				numGroupsOpen--;
				if (!numGroupsOpen) {
					contentsEndPos = match.index;
					break;
				}
			}
		} else if (m === "]") numCharClassesOpen--;
	}
	return expression.slice(contentsStartPos, contentsEndPos);
}
var Context;
var init_src$1 = __esmMin((() => {
	Context = Object.freeze({
		DEFAULT: "DEFAULT",
		CHAR_CLASS: "CHAR_CLASS"
	});
}));
//#endregion
//#region ../../node_modules/regex/src/atomic.js
/**
Apply transformations for atomic groups: `(?>…)`.
@param {string} expression
@param {PluginData} [data]
@returns {Required<PluginResult>}
*/
function atomic(expression, data) {
	const hiddenCaptures = data?.hiddenCaptures ?? [];
	let captureTransfers = data?.captureTransfers ?? /* @__PURE__ */ new Map();
	if (!/\(\?>/.test(expression)) return {
		pattern: expression,
		captureTransfers,
		hiddenCaptures
	};
	const aGDelim = "(?>";
	const emulatedAGDelim = "(?:(?=(";
	const captureNumMap = [0];
	const addedHiddenCaptures = [];
	let numCapturesBeforeAG = 0;
	let numAGs = 0;
	let aGPos = NaN;
	let hasProcessedAG;
	do {
		hasProcessedAG = false;
		let numCharClassesOpen = 0;
		let numGroupsOpenInAG = 0;
		let inAG = false;
		let match;
		atomicPluginToken.lastIndex = Number.isNaN(aGPos) ? 0 : aGPos + 7;
		while (match = atomicPluginToken.exec(expression)) {
			const { 0: m, index, groups: { capturingStart, noncapturingStart } } = match;
			if (m === "[") numCharClassesOpen++;
			else if (!numCharClassesOpen) {
				if (m === aGDelim && !inAG) {
					aGPos = index;
					inAG = true;
				} else if (inAG && noncapturingStart) numGroupsOpenInAG++;
				else if (capturingStart) if (inAG) numGroupsOpenInAG++;
				else {
					numCapturesBeforeAG++;
					captureNumMap.push(numCapturesBeforeAG + numAGs);
				}
				else if (m === ")" && inAG) {
					if (!numGroupsOpenInAG) {
						numAGs++;
						const addedCaptureNum = numCapturesBeforeAG + numAGs;
						expression = `${expression.slice(0, aGPos)}${emulatedAGDelim}${expression.slice(aGPos + 3, index)}))<$$${addedCaptureNum}>)${expression.slice(index + 1)}`;
						hasProcessedAG = true;
						addedHiddenCaptures.push(addedCaptureNum);
						incrementIfAtLeast$1(hiddenCaptures, addedCaptureNum);
						if (captureTransfers.size) {
							const newCaptureTransfers = /* @__PURE__ */ new Map();
							captureTransfers.forEach((from, to) => {
								newCaptureTransfers.set(to >= addedCaptureNum ? to + 1 : to, from.map((f) => f >= addedCaptureNum ? f + 1 : f));
							});
							captureTransfers = newCaptureTransfers;
						}
						break;
					}
					numGroupsOpenInAG--;
				}
			} else if (m === "]") numCharClassesOpen--;
		}
	} while (hasProcessedAG);
	hiddenCaptures.push(...addedHiddenCaptures);
	expression = replaceUnescaped(expression, String.raw`\\(?<backrefNum>[1-9]\d*)|<\$\$(?<wrappedBackrefNum>\d+)>`, ({ 0: m, groups: { backrefNum, wrappedBackrefNum } }) => {
		if (backrefNum) {
			const bNum = +backrefNum;
			if (bNum > captureNumMap.length - 1) throw new Error(`Backref "${m}" greater than number of captures`);
			return `\\${captureNumMap[bNum]}`;
		}
		return `\\${wrappedBackrefNum}`;
	}, Context.DEFAULT);
	return {
		pattern: expression,
		captureTransfers,
		hiddenCaptures
	};
}
/**
Transform posessive quantifiers into atomic groups. The posessessive quantifiers are:
`?+`, `*+`, `++`, `{N}+`, `{N,}+`, `{N,N}+`.
This follows Java, PCRE, Perl, and Python.
Possessive quantifiers in Oniguruma and Onigmo are only: `?+`, `*+`, `++`.
@param {string} expression
@returns {PluginResult}
*/
function possessive(expression) {
	if (!new RegExp(`${baseQuantifier}\\+`).test(expression)) return { pattern: expression };
	const openGroupIndices = [];
	let lastGroupIndex = null;
	let lastCharClassIndex = null;
	let lastToken = "";
	let numCharClassesOpen = 0;
	let match;
	possessivePluginToken.lastIndex = 0;
	while (match = possessivePluginToken.exec(expression)) {
		const { 0: m, index, groups: { qBase, qMod, invalidQ } } = match;
		if (m === "[") {
			if (!numCharClassesOpen) lastCharClassIndex = index;
			numCharClassesOpen++;
		} else if (m === "]") if (numCharClassesOpen) numCharClassesOpen--;
		else lastCharClassIndex = null;
		else if (!numCharClassesOpen) {
			if (qMod === "+" && lastToken && !lastToken.startsWith("(")) {
				if (invalidQ) throw new Error(`Invalid quantifier "${m}"`);
				let charsAdded = -1;
				if (/^\{\d+\}$/.test(qBase)) expression = spliceStr(expression, index + qBase.length, qMod, "");
				else {
					if (lastToken === ")" || lastToken === "]") {
						const nodeIndex = lastToken === ")" ? lastGroupIndex : lastCharClassIndex;
						if (nodeIndex === null) throw new Error(`Invalid unmatched "${lastToken}"`);
						expression = `${expression.slice(0, nodeIndex)}(?>${expression.slice(nodeIndex, index)}${qBase})${expression.slice(index + m.length)}`;
					} else expression = `${expression.slice(0, index - lastToken.length)}(?>${lastToken}${qBase})${expression.slice(index + m.length)}`;
					charsAdded += 4;
				}
				possessivePluginToken.lastIndex += charsAdded;
			} else if (m[0] === "(") openGroupIndices.push(index);
			else if (m === ")") lastGroupIndex = openGroupIndices.length ? openGroupIndices.pop() : null;
		}
		lastToken = m;
	}
	return { pattern: expression };
}
var atomicPluginToken, baseQuantifier, possessivePluginToken;
var init_atomic = __esmMin((() => {
	init_utils_internals();
	init_src$1();
	atomicPluginToken = new RegExp(String.raw`(?<noncapturingStart>${noncapturingDelim})|(?<capturingStart>\((?:\?<[^>]+>)?)|\\?.`, "gsu");
	baseQuantifier = String.raw`(?:[?*+]|\{\d+(?:,\d*)?\})`;
	possessivePluginToken = new RegExp(String.raw`
\\(?: \d+
  | c[A-Za-z]
  | [gk]<[^>]+>
  | [pPu]\{[^\}]+\}
  | u[A-Fa-f\d]{4}
  | x[A-Fa-f\d]{2}
  )
| \((?: \? (?: [:=!>]
  | <(?:[=!]|[^>]+>)
  | [A-Za-z\-]+:
  | \(DEFINE\)
  ))?
| (?<qBase>${baseQuantifier})(?<qMod>[?+]?)(?<invalidQ>[?*+\{]?)
| \\?.
`.replace(/\s+/g, ""), "gsu");
}));
//#endregion
//#region ../../node_modules/regex/src/internals.js
var init_internals = __esmMin((() => {
	init_atomic();
}));
//#endregion
//#region ../../node_modules/regex-recursion/src/index.js
/**
@param {string} pattern
@param {{
flags?: string;
captureTransfers?: Map<number, Array<number>>;
hiddenCaptures?: Array<number>;
mode?: 'plugin' | 'external';
}} [data]
@returns {{
pattern: string;
captureTransfers: Map<number, Array<number>>;
hiddenCaptures: Array<number>;
}}
*/
function recursion(pattern, data) {
	const { hiddenCaptures, mode } = {
		hiddenCaptures: [],
		mode: "plugin",
		...data
	};
	let captureTransfers = data?.captureTransfers ?? /* @__PURE__ */ new Map();
	if (!new RegExp(recursiveToken, "su").test(pattern)) return {
		pattern,
		captureTransfers,
		hiddenCaptures
	};
	if (mode === "plugin" && hasUnescaped(pattern, r$1`\(\?\(DEFINE\)`, Context.DEFAULT)) throw new Error("DEFINE groups cannot be used with recursion");
	const addedHiddenCaptures = [];
	const hasNumberedBackref = hasUnescaped(pattern, r$1`\\[1-9]`, Context.DEFAULT);
	const groupContentsStartPos = /* @__PURE__ */ new Map();
	const openGroups = [];
	let hasRecursed = false;
	let numCharClassesOpen = 0;
	let numCapturesPassed = 0;
	let match;
	token.lastIndex = 0;
	while (match = token.exec(pattern)) {
		const { 0: m, groups: { captureName, rDepth, gRNameOrNum, gRDepth } } = match;
		if (m === "[") numCharClassesOpen++;
		else if (!numCharClassesOpen) {
			if (rDepth) {
				assertMaxInBounds(rDepth);
				if (hasRecursed) throw new Error(overlappingRecursionMsg);
				if (hasNumberedBackref) throw new Error(`${mode === "external" ? "Backrefs" : "Numbered backrefs"} cannot be used with global recursion`);
				const left = pattern.slice(0, match.index);
				const right = pattern.slice(token.lastIndex);
				if (hasUnescaped(right, recursiveToken, Context.DEFAULT)) throw new Error(overlappingRecursionMsg);
				const reps = +rDepth - 1;
				pattern = makeRecursive(left, right, reps, false, hiddenCaptures, addedHiddenCaptures, numCapturesPassed);
				captureTransfers = mapCaptureTransfers(captureTransfers, left, reps, addedHiddenCaptures.length, 0, numCapturesPassed);
				break;
			} else if (gRNameOrNum) {
				assertMaxInBounds(gRDepth);
				let isWithinReffedGroup = false;
				for (const g of openGroups) if (g.name === gRNameOrNum || g.num === +gRNameOrNum) {
					isWithinReffedGroup = true;
					if (g.hasRecursedWithin) throw new Error(overlappingRecursionMsg);
					break;
				}
				if (!isWithinReffedGroup) throw new Error(r$1`Recursive \g cannot be used outside the referenced group "${mode === "external" ? gRNameOrNum : r$1`\g<${gRNameOrNum}&R=${gRDepth}>`}"`);
				const startPos = groupContentsStartPos.get(gRNameOrNum);
				const groupContents = getGroupContents(pattern, startPos);
				if (hasNumberedBackref && hasUnescaped(groupContents, r$1`${namedCaptureDelim}|\((?!\?)`, Context.DEFAULT)) throw new Error(`${mode === "external" ? "Backrefs" : "Numbered backrefs"} cannot be used with recursion of capturing groups`);
				const groupContentsLeft = pattern.slice(startPos, match.index);
				const groupContentsRight = groupContents.slice(groupContentsLeft.length + m.length);
				const numAddedHiddenCapturesPreExpansion = addedHiddenCaptures.length;
				const reps = +gRDepth - 1;
				const expansion = makeRecursive(groupContentsLeft, groupContentsRight, reps, true, hiddenCaptures, addedHiddenCaptures, numCapturesPassed);
				captureTransfers = mapCaptureTransfers(captureTransfers, groupContentsLeft, reps, addedHiddenCaptures.length - numAddedHiddenCapturesPreExpansion, numAddedHiddenCapturesPreExpansion, numCapturesPassed);
				pattern = `${pattern.slice(0, startPos)}${expansion}${pattern.slice(startPos + groupContents.length)}`;
				token.lastIndex += expansion.length - m.length - groupContentsLeft.length - groupContentsRight.length;
				openGroups.forEach((g) => g.hasRecursedWithin = true);
				hasRecursed = true;
			} else if (captureName) {
				numCapturesPassed++;
				groupContentsStartPos.set(String(numCapturesPassed), token.lastIndex);
				groupContentsStartPos.set(captureName, token.lastIndex);
				openGroups.push({
					num: numCapturesPassed,
					name: captureName
				});
			} else if (m[0] === "(") {
				const isUnnamedCapture = m === "(";
				if (isUnnamedCapture) {
					numCapturesPassed++;
					groupContentsStartPos.set(String(numCapturesPassed), token.lastIndex);
				}
				openGroups.push(isUnnamedCapture ? { num: numCapturesPassed } : {});
			} else if (m === ")") openGroups.pop();
		} else if (m === "]") numCharClassesOpen--;
	}
	hiddenCaptures.push(...addedHiddenCaptures);
	return {
		pattern,
		captureTransfers,
		hiddenCaptures
	};
}
/**
@param {string} max
*/
function assertMaxInBounds(max) {
	const errMsg = `Max depth must be integer between 2 and 100; used ${max}`;
	if (!/^[1-9]\d*$/.test(max)) throw new Error(errMsg);
	max = +max;
	if (max < 2 || max > 100) throw new Error(errMsg);
}
/**
@param {string} left
@param {string} right
@param {number} reps
@param {boolean} isSubpattern
@param {Array<number>} hiddenCaptures
@param {Array<number>} addedHiddenCaptures
@param {number} numCapturesPassed
@returns {string}
*/
function makeRecursive(left, right, reps, isSubpattern, hiddenCaptures, addedHiddenCaptures, numCapturesPassed) {
	const namesInRecursed = /* @__PURE__ */ new Set();
	if (isSubpattern) forEachUnescaped(left + right, namedCaptureDelim, ({ groups: { captureName } }) => {
		namesInRecursed.add(captureName);
	}, Context.DEFAULT);
	const rest = [
		reps,
		isSubpattern ? namesInRecursed : null,
		hiddenCaptures,
		addedHiddenCaptures,
		numCapturesPassed
	];
	return `${left}${repeatWithDepth(`(?:${left}`, "forward", ...rest)}(?:)${repeatWithDepth(`${right})`, "backward", ...rest)}${right}`;
}
/**
@param {string} pattern
@param {'forward' | 'backward'} direction
@param {number} reps
@param {Set<string> | null} namesInRecursed
@param {Array<number>} hiddenCaptures
@param {Array<number>} addedHiddenCaptures
@param {number} numCapturesPassed
@returns {string}
*/
function repeatWithDepth(pattern, direction, reps, namesInRecursed, hiddenCaptures, addedHiddenCaptures, numCapturesPassed) {
	const startNum = 2;
	const getDepthNum = (i) => direction === "forward" ? i + startNum : reps - i + startNum - 1;
	let result = "";
	for (let i = 0; i < reps; i++) {
		const depthNum = getDepthNum(i);
		result += replaceUnescaped(pattern, r$1`${captureDelim}|\\k<(?<backref>[^>]+)>`, ({ 0: m, groups: { captureName, unnamed, backref } }) => {
			if (backref && namesInRecursed && !namesInRecursed.has(backref)) return m;
			const suffix = `_$${depthNum}`;
			if (unnamed || captureName) {
				const addedCaptureNum = numCapturesPassed + addedHiddenCaptures.length + 1;
				addedHiddenCaptures.push(addedCaptureNum);
				incrementIfAtLeast(hiddenCaptures, addedCaptureNum);
				return unnamed ? m : `(?<${captureName}${suffix}>`;
			}
			return r$1`\k<${backref}${suffix}>`;
		}, Context.DEFAULT);
	}
	return result;
}
/**
Updates the array in place by incrementing each value greater than or equal to the threshold.
@param {Array<number>} arr
@param {number} threshold
*/
function incrementIfAtLeast(arr, threshold) {
	for (let i = 0; i < arr.length; i++) if (arr[i] >= threshold) arr[i]++;
}
/**
@param {Map<number, Array<number>>} captureTransfers
@param {string} left
@param {number} reps
@param {number} numCapturesAddedInExpansion
@param {number} numAddedHiddenCapturesPreExpansion
@param {number} numCapturesPassed
@returns {Map<number, Array<number>>}
*/
function mapCaptureTransfers(captureTransfers, left, reps, numCapturesAddedInExpansion, numAddedHiddenCapturesPreExpansion, numCapturesPassed) {
	if (captureTransfers.size && numCapturesAddedInExpansion) {
		let numCapturesInLeft = 0;
		forEachUnescaped(left, captureDelim, () => numCapturesInLeft++, Context.DEFAULT);
		const recursionDelimCaptureNum = numCapturesPassed - numCapturesInLeft + numAddedHiddenCapturesPreExpansion;
		const newCaptureTransfers = /* @__PURE__ */ new Map();
		captureTransfers.forEach((from, to) => {
			const numCapturesInRight = (numCapturesAddedInExpansion - numCapturesInLeft * reps) / reps;
			const numCapturesAddedInLeft = numCapturesInLeft * reps;
			const newTo = to > recursionDelimCaptureNum + numCapturesInLeft ? to + numCapturesAddedInExpansion : to;
			const newFrom = [];
			for (const f of from) if (f <= recursionDelimCaptureNum) newFrom.push(f);
			else if (f > recursionDelimCaptureNum + numCapturesInLeft + numCapturesInRight) newFrom.push(f + numCapturesAddedInExpansion);
			else if (f <= recursionDelimCaptureNum + numCapturesInLeft) for (let i = 0; i <= reps; i++) newFrom.push(f + numCapturesInLeft * i);
			else for (let i = 0; i <= reps; i++) newFrom.push(f + numCapturesAddedInLeft + numCapturesInRight * i);
			newCaptureTransfers.set(newTo, newFrom);
		});
		return newCaptureTransfers;
	}
	return captureTransfers;
}
var r$1, recursiveToken, namedCaptureDelim, captureDelim, token, overlappingRecursionMsg;
var init_src = __esmMin((() => {
	init_src$1();
	r$1 = String.raw;
	recursiveToken = r$1`\(\?R=(?<rDepth>[^\)]+)\)|${r$1`\\g<(?<gRNameOrNum>[^>&]+)&R=(?<gRDepth>[^>]+)>`}`;
	namedCaptureDelim = r$1`\(\?<(?![=!])(?<captureName>[^>]+)>`;
	captureDelim = r$1`${namedCaptureDelim}|(?<unnamed>\()(?!\?)`;
	token = new RegExp(r$1`${namedCaptureDelim}|${recursiveToken}|\(\?|\\?.`, "gsu");
	overlappingRecursionMsg = "Cannot use multiple overlapping recursions";
}));
//#endregion
//#region ../../node_modules/oniguruma-to-es/dist/esm/index.js
function getNewCurrentFlags(current, { enable, disable }) {
	return {
		dotAll: !disable?.dotAll && !!(enable?.dotAll || current.dotAll),
		ignoreCase: !disable?.ignoreCase && !!(enable?.ignoreCase || current.ignoreCase)
	};
}
function getOrInsert(map, key, defaultValue) {
	if (!map.has(key)) map.set(key, defaultValue);
	return map.get(key);
}
function isMinTarget(target, min) {
	return EsVersion[target] >= EsVersion[min];
}
function throwIfNullish(value, msg) {
	if (value == null) throw new Error(msg ?? "Value expected");
	return value;
}
function getOptions(options = {}) {
	if ({}.toString.call(options) !== "[object Object]") throw new Error("Unexpected options");
	if (options.target !== void 0 && !Target[options.target]) throw new Error(`Unexpected target "${options.target}"`);
	const opts = {
		accuracy: "default",
		avoidSubclass: false,
		flags: "",
		global: false,
		hasIndices: false,
		lazyCompileLength: Infinity,
		target: "auto",
		verbose: false,
		...options,
		rules: {
			allowOrphanBackrefs: false,
			asciiWordBoundaries: false,
			captureGroup: false,
			recursionLimit: 20,
			singleline: false,
			...options.rules
		}
	};
	if (opts.target === "auto") opts.target = envFlags.flagGroups ? "ES2025" : envFlags.unicodeSets ? "ES2024" : "ES2018";
	return opts;
}
function getIgnoreCaseMatchChars(char) {
	if (CharsWithoutIgnoreCaseExpansion.has(char)) return [char];
	const set = /* @__PURE__ */ new Set();
	const lower = char.toLowerCase();
	const upper = lower.toUpperCase();
	const title = LowerToTitleCaseMap.get(lower);
	const altLower = LowerToAlternativeLowerCaseMap.get(lower);
	const altUpper = LowerToAlternativeUpperCaseMap.get(lower);
	if ([...upper].length === 1) set.add(upper);
	altUpper && set.add(altUpper);
	title && set.add(title);
	set.add(lower);
	altLower && set.add(altLower);
	return [...set];
}
function range(start, end) {
	const range2 = [];
	for (let i = start; i <= end; i++) range2.push(i);
	return range2;
}
function titleEntry(codePoint) {
	const char = cp(codePoint);
	return [char.toLowerCase(), char];
}
function titleRange(start, end) {
	return range(start, end).map((codePoint) => titleEntry(codePoint));
}
function transform(ast, options) {
	const opts = {
		accuracy: "default",
		asciiWordBoundaries: false,
		avoidSubclass: false,
		bestEffortTarget: "ES2025",
		...options
	};
	addParentProperties(ast);
	const firstPassState = {
		accuracy: opts.accuracy,
		asciiWordBoundaries: opts.asciiWordBoundaries,
		avoidSubclass: opts.avoidSubclass,
		flagDirectivesByAlt: /* @__PURE__ */ new Map(),
		jsGroupNameMap: /* @__PURE__ */ new Map(),
		minTargetEs2024: isMinTarget(opts.bestEffortTarget, "ES2024"),
		passedLookbehind: false,
		strategy: null,
		subroutineRefMap: /* @__PURE__ */ new Map(),
		supportedGNodes: /* @__PURE__ */ new Set(),
		digitIsAscii: ast.flags.digitIsAscii,
		spaceIsAscii: ast.flags.spaceIsAscii,
		wordIsAscii: ast.flags.wordIsAscii
	};
	S(ast, FirstPassVisitor, firstPassState);
	const globalFlags = {
		dotAll: ast.flags.dotAll,
		ignoreCase: ast.flags.ignoreCase
	};
	const secondPassState = {
		currentFlags: globalFlags,
		prevFlags: null,
		globalFlags,
		groupOriginByCopy: /* @__PURE__ */ new Map(),
		groupsByName: /* @__PURE__ */ new Map(),
		multiplexCapturesToLeftByRef: /* @__PURE__ */ new Map(),
		openRefs: /* @__PURE__ */ new Map(),
		reffedNodesByReferencer: /* @__PURE__ */ new Map(),
		subroutineRefMap: firstPassState.subroutineRefMap
	};
	S(ast, SecondPassVisitor, secondPassState);
	S(ast, ThirdPassVisitor, {
		groupsByName: secondPassState.groupsByName,
		highestOrphanBackref: 0,
		numCapturesToLeft: 0,
		reffedNodesByReferencer: secondPassState.reffedNodesByReferencer
	});
	ast._originMap = secondPassState.groupOriginByCopy;
	ast._strategy = firstPassState.strategy;
	return ast;
}
function addParentProperties(root) {
	S(root, { "*"({ node, parent }) {
		node.parent = parent;
	} });
}
function areFlagsEqual(a, b) {
	return a.dotAll === b.dotAll && a.ignoreCase === b.ignoreCase;
}
function canParticipateWithNode(capture, node) {
	let rightmostPoint = node;
	do {
		if (rightmostPoint.type === "Regex") return false;
		if (rightmostPoint.type === "Alternative") continue;
		if (rightmostPoint === capture) return false;
		const kidsOfParent = getKids(rightmostPoint.parent);
		for (const kid of kidsOfParent) {
			if (kid === rightmostPoint) break;
			if (kid === capture || isAncestorOf(kid, capture)) return true;
		}
	} while (rightmostPoint = rightmostPoint.parent);
	throw new Error("Unexpected path");
}
function cloneCapturingGroup(obj, originMap, up, up2) {
	const store = Array.isArray(obj) ? [] : {};
	for (const [key, value] of Object.entries(obj)) if (key === "parent") store.parent = Array.isArray(up) ? up2 : up;
	else if (value && typeof value === "object") store[key] = cloneCapturingGroup(value, originMap, store, up);
	else {
		if (key === "type" && value === "CapturingGroup") originMap.set(store, originMap.get(obj) ?? obj);
		store[key] = value;
	}
	return store;
}
function createRecursion(ref) {
	const node = O(ref);
	node.isRecursive = true;
	return node;
}
function getAllParents(node, filterFn) {
	const results = [];
	while (node = node.parent) if (!filterFn || filterFn(node)) results.push(node);
	return results;
}
function getAndStoreJsGroupName(name, map) {
	if (map.has(name)) return map.get(name);
	const jsName = `$${map.size}_${name.replace(/^[^$_\p{IDS}]|[^$\u200C\u200D\p{IDC}]/gu, "_")}`;
	map.set(name, jsName);
	return jsName;
}
function getCombinedFlagModsFromFlagNodes(flagNodes) {
	const flagProps = ["dotAll", "ignoreCase"];
	const combinedFlags = {
		enable: {},
		disable: {}
	};
	flagNodes.forEach(({ flags }) => {
		flagProps.forEach((prop) => {
			if (flags.enable?.[prop]) {
				delete combinedFlags.disable[prop];
				combinedFlags.enable[prop] = true;
			}
			if (flags.disable?.[prop]) combinedFlags.disable[prop] = true;
		});
	});
	if (!Object.keys(combinedFlags.enable).length) delete combinedFlags.enable;
	if (!Object.keys(combinedFlags.disable).length) delete combinedFlags.disable;
	if (combinedFlags.enable || combinedFlags.disable) return combinedFlags;
	return null;
}
function getFlagModsFromFlags({ dotAll, ignoreCase }) {
	const mods = {};
	if (dotAll || ignoreCase) {
		mods.enable = {};
		dotAll && (mods.enable.dotAll = true);
		ignoreCase && (mods.enable.ignoreCase = true);
	}
	if (!dotAll || !ignoreCase) {
		mods.disable = {};
		!dotAll && (mods.disable.dotAll = true);
		!ignoreCase && (mods.disable.ignoreCase = true);
	}
	return mods;
}
function getKids(node) {
	if (!node) throw new Error("Node expected");
	const { body } = node;
	return Array.isArray(body) ? body : body ? [body] : null;
}
function getLeadingG(els) {
	const firstToConsider = els.find((el) => el.kind === "search_start" || isLoneGLookaround(el, { negate: false }) || !isAlwaysZeroLength(el));
	if (!firstToConsider) return null;
	if (firstToConsider.kind === "search_start") return firstToConsider;
	if (firstToConsider.type === "LookaroundAssertion") return firstToConsider.body[0].body[0];
	if (firstToConsider.type === "CapturingGroup" || firstToConsider.type === "Group") {
		const gNodesForGroup = [];
		for (const alt of firstToConsider.body) {
			const leadingG = getLeadingG(alt.body);
			if (!leadingG) return null;
			Array.isArray(leadingG) ? gNodesForGroup.push(...leadingG) : gNodesForGroup.push(leadingG);
		}
		return gNodesForGroup;
	}
	return null;
}
function isAncestorOf(node, descendant) {
	const kids = getKids(node) ?? [];
	for (const kid of kids) if (kid === descendant || isAncestorOf(kid, descendant)) return true;
	return false;
}
function isAlwaysZeroLength({ type }) {
	return type === "Assertion" || type === "Directive" || type === "LookaroundAssertion";
}
function isAlwaysNonZeroLength(node) {
	const types = [
		"Character",
		"CharacterClass",
		"CharacterSet"
	];
	return types.includes(node.type) || node.type === "Quantifier" && node.min && types.includes(node.body.type);
}
function isLoneGLookaround(node, options) {
	const opts = {
		negate: null,
		...options
	};
	return node.type === "LookaroundAssertion" && (opts.negate === null || node.negate === opts.negate) && node.body.length === 1 && o(node.body[0], {
		type: "Assertion",
		kind: "search_start"
	});
}
function isValidJsGroupName(name) {
	return /^[$_\p{IDS}][$\u200C\u200D\p{IDC}]*$/u.test(name);
}
function parseFragment(pattern, options) {
	const alts = J(pattern, {
		...options,
		unicodePropertyMap: JsUnicodePropertyMap
	}).body;
	if (alts.length > 1 || alts[0].body.length > 1) return A({ body: alts });
	return alts[0].body[0];
}
function setNegate(node, negate) {
	node.negate = negate;
	return node;
}
function setParent(node, parent) {
	node.parent = parent;
	return node;
}
function setParentDeep(node, parent) {
	addParentProperties(node);
	node.parent = parent;
	return node;
}
function generate(ast, options) {
	const opts = getOptions(options);
	const minTargetEs2024 = isMinTarget(opts.target, "ES2024");
	const minTargetEs2025 = isMinTarget(opts.target, "ES2025");
	const recursionLimit = opts.rules.recursionLimit;
	if (!Number.isInteger(recursionLimit) || recursionLimit < 2 || recursionLimit > 20) throw new Error("Invalid recursionLimit; use 2-20");
	let hasCaseInsensitiveNode = null;
	let hasCaseSensitiveNode = null;
	if (!minTargetEs2025) {
		const iStack = [ast.flags.ignoreCase];
		S(ast, FlagModifierVisitor, {
			getCurrentModI: () => iStack.at(-1),
			popModI() {
				iStack.pop();
			},
			pushModI(isIOn) {
				iStack.push(isIOn);
			},
			setHasCasedChar() {
				if (iStack.at(-1)) hasCaseInsensitiveNode = true;
				else hasCaseSensitiveNode = true;
			}
		});
	}
	const appliedGlobalFlags = {
		dotAll: ast.flags.dotAll,
		ignoreCase: !!((ast.flags.ignoreCase || hasCaseInsensitiveNode) && !hasCaseSensitiveNode)
	};
	let lastNode = ast;
	const state = {
		accuracy: opts.accuracy,
		appliedGlobalFlags,
		captureMap: /* @__PURE__ */ new Map(),
		currentFlags: {
			dotAll: ast.flags.dotAll,
			ignoreCase: ast.flags.ignoreCase
		},
		inCharClass: false,
		lastNode,
		originMap: ast._originMap,
		recursionLimit,
		useAppliedIgnoreCase: !!(!minTargetEs2025 && hasCaseInsensitiveNode && hasCaseSensitiveNode),
		useFlagMods: minTargetEs2025,
		useFlagV: minTargetEs2024,
		verbose: opts.verbose
	};
	function gen(node) {
		state.lastNode = lastNode;
		lastNode = node;
		return throwIfNullish(generator[node.type], `Unexpected node type "${node.type}"`)(node, state, gen);
	}
	const result = {
		pattern: ast.body.map(gen).join("|"),
		flags: gen(ast.flags),
		options: { ...ast.options }
	};
	if (!minTargetEs2024) {
		delete result.options.force.v;
		result.options.disable.v = true;
		result.options.unicodeSetsPlugin = null;
	}
	result._captureTransfers = /* @__PURE__ */ new Map();
	result._hiddenCaptures = [];
	state.captureMap.forEach((value, key) => {
		if (value.hidden) result._hiddenCaptures.push(key);
		if (value.transferTo) getOrInsert(result._captureTransfers, value.transferTo, []).push(key);
	});
	return result;
}
function charHasCase(char) {
	return casedRe.test(char);
}
function getCasesOutsideCharClassRange(node, options) {
	const firstOnly = !!options?.firstOnly;
	const min = node.min.value;
	const max = node.max.value;
	const found = [];
	if (min < 65 && (max === 65535 || max >= 131071) || min === 65536 && max >= 131071) return found;
	for (let i = min; i <= max; i++) {
		const char = cp(i);
		if (!charHasCase(char)) continue;
		const charsOutsideRange = getIgnoreCaseMatchChars(char).filter((caseOfChar) => {
			const num = caseOfChar.codePointAt(0);
			return num < min || num > max;
		});
		if (charsOutsideRange.length) {
			found.push(...charsOutsideRange);
			if (firstOnly) break;
		}
	}
	return found;
}
function getCharEscape(codePoint, { escDigit, inCharClass, useFlagV }) {
	if (CharCodeEscapeMap.has(codePoint)) return CharCodeEscapeMap.get(codePoint);
	if (codePoint < 32 || codePoint > 126 && codePoint < 160 || codePoint > 262143 || escDigit && isDigitCharCode(codePoint)) return codePoint > 255 ? `\\u{${codePoint.toString(16).toUpperCase()}}` : `\\x${codePoint.toString(16).toUpperCase().padStart(2, "0")}`;
	const escapeChars = inCharClass ? useFlagV ? CharClassEscapeCharsFlagV : CharClassEscapeChars : BaseEscapeChars;
	const char = cp(codePoint);
	return (escapeChars.has(char) ? "\\" : "") + char;
}
function getCodePointRangesFromChars(chars) {
	const codePoints = chars.map((char) => char.codePointAt(0)).sort((a, b) => a - b);
	const values = [];
	let start = null;
	for (let i = 0; i < codePoints.length; i++) if (codePoints[i + 1] === codePoints[i] + 1) start ??= codePoints[i];
	else if (start === null) values.push(codePoints[i]);
	else {
		values.push([start, codePoints[i]]);
		start = null;
	}
	return values;
}
function getGroupPrefix(atomic2, flagMods, useFlagMods) {
	if (atomic2) return ">";
	let mods = "";
	if (flagMods && useFlagMods) {
		const { enable, disable } = flagMods;
		mods = (enable?.ignoreCase ? "i" : "") + (enable?.dotAll ? "s" : "") + (disable ? "-" : "") + (disable?.ignoreCase ? "i" : "") + (disable?.dotAll ? "s" : "");
	}
	return `${mods}:`;
}
function getQuantifierStr({ kind, max, min }) {
	let base;
	if (!min && max === 1) base = "?";
	else if (!min && max === Infinity) base = "*";
	else if (min === 1 && max === Infinity) base = "+";
	else if (min === max) base = `{${min}}`;
	else base = `{${min},${max === Infinity ? "" : max}}`;
	return base + {
		greedy: "",
		lazy: "?",
		possessive: "+"
	}[kind];
}
function isAnyGroup({ type }) {
	return type === "CapturingGroup" || type === "Group" || type === "LookaroundAssertion";
}
function isDigitCharCode(value) {
	return value > 47 && value < 58;
}
function isLiteralHyphen({ type, value }) {
	return type === "Character" && value === 45;
}
function adjustMatchDetailsForOffset(match, offset, input, hasIndices) {
	match.index += offset;
	match.input = input;
	if (hasIndices) {
		const indices = match.indices;
		for (let i = 0; i < indices.length; i++) {
			const arr = indices[i];
			if (arr) indices[i] = [arr[0] + offset, arr[1] + offset];
		}
		const groupIndices = indices.groups;
		if (groupIndices) Object.keys(groupIndices).forEach((key) => {
			const arr = groupIndices[key];
			if (arr) groupIndices[key] = [arr[0] + offset, arr[1] + offset];
		});
	}
}
function createCaptureMap(hiddenCaptures, transfers) {
	const captureMap = /* @__PURE__ */ new Map();
	for (const num of hiddenCaptures) captureMap.set(num, { hidden: true });
	for (const [to, from] of transfers) for (const num of from) getOrInsert(captureMap, num, {}).transferTo = to;
	return captureMap;
}
function createNameMap(pattern) {
	const re = /(?<capture>\((?:\?<(?![=!])(?<name>[^>]+)>|(?!\?)))|\\?./gsu;
	const map = /* @__PURE__ */ new Map();
	let numCharClassesOpen = 0;
	let numCaptures = 0;
	let match;
	while (match = re.exec(pattern)) {
		const { 0: m, groups: { capture, name } } = match;
		if (m === "[") numCharClassesOpen++;
		else if (!numCharClassesOpen) {
			if (capture) {
				numCaptures++;
				if (name) map.set(numCaptures, name);
			}
		} else if (m === "]") numCharClassesOpen--;
	}
	return map;
}
function toRegExp(pattern, options) {
	const d = toRegExpDetails(pattern, options);
	if (d.options) return new EmulatedRegExp(d.pattern, d.flags, d.options);
	return new RegExp(d.pattern, d.flags);
}
function toRegExpDetails(pattern, options) {
	const opts = getOptions(options);
	const regexPlusAst = transform(J(pattern, {
		flags: opts.flags,
		normalizeUnknownPropertyNames: true,
		rules: {
			captureGroup: opts.rules.captureGroup,
			singleline: opts.rules.singleline
		},
		skipBackrefValidation: opts.rules.allowOrphanBackrefs,
		unicodePropertyMap: JsUnicodePropertyMap
	}), {
		accuracy: opts.accuracy,
		asciiWordBoundaries: opts.rules.asciiWordBoundaries,
		avoidSubclass: opts.avoidSubclass,
		bestEffortTarget: opts.target
	});
	const generated = generate(regexPlusAst, opts);
	const recursionResult = recursion(generated.pattern, {
		captureTransfers: generated._captureTransfers,
		hiddenCaptures: generated._hiddenCaptures,
		mode: "external"
	});
	const atomicResult = atomic(possessive(recursionResult.pattern).pattern, {
		captureTransfers: recursionResult.captureTransfers,
		hiddenCaptures: recursionResult.hiddenCaptures
	});
	const details = {
		pattern: atomicResult.pattern,
		flags: `${opts.hasIndices ? "d" : ""}${opts.global ? "g" : ""}${generated.flags}${generated.options.disable.v ? "u" : "v"}`
	};
	if (opts.avoidSubclass) {
		if (opts.lazyCompileLength !== Infinity) throw new Error("Lazy compilation requires subclass");
	} else {
		const hiddenCaptures = atomicResult.hiddenCaptures.sort((a, b) => a - b);
		const transfers = Array.from(atomicResult.captureTransfers);
		const strategy = regexPlusAst._strategy;
		const lazyCompile = details.pattern.length >= opts.lazyCompileLength;
		if (hiddenCaptures.length || transfers.length || strategy || lazyCompile) details.options = {
			...hiddenCaptures.length && { hiddenCaptures },
			...transfers.length && { transfers },
			...strategy && { strategy },
			...lazyCompile && { lazyCompile }
		};
	}
	return details;
}
var cp, r, envFlags, EsVersion, Target, asciiSpaceChar, CharsWithoutIgnoreCaseExpansion, defaultWordChar, JsUnicodePropertyMap, LowerToAlternativeLowerCaseMap, LowerToAlternativeUpperCaseMap, LowerToTitleCaseMap, PosixClassMap, UnicodePropertiesWithSpecificCase, FirstPassVisitor, SecondPassVisitor, ThirdPassVisitor, FlagModifierVisitor, generator, BaseEscapeChars, CharClassEscapeChars, CharClassEscapeCharsFlagV, CharCodeEscapeMap, casedRe, EmulatedRegExp;
var init_esm = __esmMin((() => {
	init_parse();
	init_traverse();
	init_internals();
	init_src();
	cp = String.fromCodePoint;
	r = String.raw;
	envFlags = {
		flagGroups: true,
		unicodeSets: true
	};
	envFlags.bugFlagVLiteralHyphenIsRange = envFlags.unicodeSets ? (() => {
		try {
			new RegExp(r`[\d\-a]`, "v");
		} catch {
			return true;
		}
		return false;
	})() : false;
	envFlags.bugNestedClassIgnoresNegation = envFlags.unicodeSets && (/* @__PURE__ */ new RegExp("[[^a]]", "v")).test("a");
	EsVersion = {
		ES2025: 2025,
		ES2024: 2024,
		ES2018: 2018
	};
	Target = (
	/** @type {const} */
	{
		auto: "auto",
		ES2025: "ES2025",
		ES2024: "ES2024",
		ES2018: "ES2018"
	});
	asciiSpaceChar = "[	-\r ]";
	CharsWithoutIgnoreCaseExpansion = /* @__PURE__ */ new Set([cp(304), cp(305)]);
	defaultWordChar = r`[\p{L}\p{M}\p{N}\p{Pc}]`;
	JsUnicodePropertyMap = /* @__PURE__ */ new Map(`C Other
Cc Control cntrl
Cf Format
Cn Unassigned
Co Private_Use
Cs Surrogate
L Letter
LC Cased_Letter
Ll Lowercase_Letter
Lm Modifier_Letter
Lo Other_Letter
Lt Titlecase_Letter
Lu Uppercase_Letter
M Mark Combining_Mark
Mc Spacing_Mark
Me Enclosing_Mark
Mn Nonspacing_Mark
N Number
Nd Decimal_Number digit
Nl Letter_Number
No Other_Number
P Punctuation punct
Pc Connector_Punctuation
Pd Dash_Punctuation
Pe Close_Punctuation
Pf Final_Punctuation
Pi Initial_Punctuation
Po Other_Punctuation
Ps Open_Punctuation
S Symbol
Sc Currency_Symbol
Sk Modifier_Symbol
Sm Math_Symbol
So Other_Symbol
Z Separator
Zl Line_Separator
Zp Paragraph_Separator
Zs Space_Separator
ASCII
ASCII_Hex_Digit AHex
Alphabetic Alpha
Any
Assigned
Bidi_Control Bidi_C
Bidi_Mirrored Bidi_M
Case_Ignorable CI
Cased
Changes_When_Casefolded CWCF
Changes_When_Casemapped CWCM
Changes_When_Lowercased CWL
Changes_When_NFKC_Casefolded CWKCF
Changes_When_Titlecased CWT
Changes_When_Uppercased CWU
Dash
Default_Ignorable_Code_Point DI
Deprecated Dep
Diacritic Dia
Emoji
Emoji_Component EComp
Emoji_Modifier EMod
Emoji_Modifier_Base EBase
Emoji_Presentation EPres
Extended_Pictographic ExtPict
Extender Ext
Grapheme_Base Gr_Base
Grapheme_Extend Gr_Ext
Hex_Digit Hex
IDS_Binary_Operator IDSB
IDS_Trinary_Operator IDST
ID_Continue IDC
ID_Start IDS
Ideographic Ideo
Join_Control Join_C
Logical_Order_Exception LOE
Lowercase Lower
Math
Noncharacter_Code_Point NChar
Pattern_Syntax Pat_Syn
Pattern_White_Space Pat_WS
Quotation_Mark QMark
Radical
Regional_Indicator RI
Sentence_Terminal STerm
Soft_Dotted SD
Terminal_Punctuation Term
Unified_Ideograph UIdeo
Uppercase Upper
Variation_Selector VS
White_Space space
XID_Continue XIDC
XID_Start XIDS`.split(/\s/).map((p) => [w(p), p]));
	LowerToAlternativeLowerCaseMap = /* @__PURE__ */ new Map([["s", cp(383)], [cp(383), "s"]]);
	LowerToAlternativeUpperCaseMap = /* @__PURE__ */ new Map([
		[cp(223), cp(7838)],
		[cp(107), cp(8490)],
		[cp(229), cp(8491)],
		[cp(969), cp(8486)]
	]);
	LowerToTitleCaseMap = new Map([
		titleEntry(453),
		titleEntry(456),
		titleEntry(459),
		titleEntry(498),
		...titleRange(8072, 8079),
		...titleRange(8088, 8095),
		...titleRange(8104, 8111),
		titleEntry(8124),
		titleEntry(8140),
		titleEntry(8188)
	]);
	PosixClassMap = /* @__PURE__ */ new Map([
		["alnum", r`[\p{Alpha}\p{Nd}]`],
		["alpha", r`\p{Alpha}`],
		["ascii", r`\p{ASCII}`],
		["blank", r`[\p{Zs}\t]`],
		["cntrl", r`\p{Cc}`],
		["digit", r`\p{Nd}`],
		["graph", r`[\P{space}&&\P{Cc}&&\P{Cn}&&\P{Cs}]`],
		["lower", r`\p{Lower}`],
		["print", r`[[\P{space}&&\P{Cc}&&\P{Cn}&&\P{Cs}]\p{Zs}]`],
		["punct", r`[\p{P}\p{S}]`],
		["space", r`\p{space}`],
		["upper", r`\p{Upper}`],
		["word", r`[\p{Alpha}\p{M}\p{Nd}\p{Pc}]`],
		["xdigit", r`\p{AHex}`]
	]);
	UnicodePropertiesWithSpecificCase = /* @__PURE__ */ new Set([
		"Lower",
		"Lowercase",
		"Upper",
		"Uppercase",
		"Ll",
		"Lowercase_Letter",
		"Lt",
		"Titlecase_Letter",
		"Lu",
		"Uppercase_Letter"
	]);
	FirstPassVisitor = {
		AbsenceFunction({ node, parent, replaceWith }) {
			const { body, kind } = node;
			if (kind === "repeater") {
				const innerGroup = A();
				innerGroup.body[0].body.push(K({
					negate: true,
					body
				}), Q("Any"));
				const outerGroup = A();
				outerGroup.body[0].body.push(_("greedy", 0, Infinity, innerGroup));
				replaceWith(setParentDeep(outerGroup, parent), { traverse: true });
			} else throw new Error(`Unsupported absence function "(?~|"`);
		},
		Alternative: {
			enter({ node, parent, key }, { flagDirectivesByAlt }) {
				const flagDirectives = node.body.filter((el) => el.kind === "flags");
				for (let i = key + 1; i < parent.body.length; i++) {
					const forwardSiblingAlt = parent.body[i];
					getOrInsert(flagDirectivesByAlt, forwardSiblingAlt, []).push(...flagDirectives);
				}
			},
			exit({ node }, { flagDirectivesByAlt }) {
				if (flagDirectivesByAlt.get(node)?.length) {
					const flags = getCombinedFlagModsFromFlagNodes(flagDirectivesByAlt.get(node));
					if (flags) {
						const flagGroup = A({ flags });
						flagGroup.body[0].body = node.body;
						node.body = [setParentDeep(flagGroup, node)];
					}
				}
			}
		},
		Assertion({ node, parent, key, container, root, remove, replaceWith }, state) {
			const { kind, negate } = node;
			const { asciiWordBoundaries, avoidSubclass, supportedGNodes, wordIsAscii } = state;
			if (kind === "text_segment_boundary") throw new Error(`Unsupported text segment boundary "\\${negate ? "Y" : "y"}"`);
			else if (kind === "line_end") replaceWith(setParentDeep(K({ body: [b({ body: [F("string_end")] }), b({ body: [m(10)] })] }), parent));
			else if (kind === "line_start") replaceWith(setParentDeep(parseFragment(r`(?<=\A|\n(?!\z))`, { skipLookbehindValidation: true }), parent));
			else if (kind === "search_start") if (supportedGNodes.has(node)) {
				root.flags.sticky = true;
				remove();
			} else {
				const prev = container[key - 1];
				if (prev && isAlwaysNonZeroLength(prev)) replaceWith(setParentDeep(K({ negate: true }), parent));
				else if (avoidSubclass) throw new Error(r`Uses "\G" in a way that requires a subclass`);
				else {
					replaceWith(setParent(F("string_start"), parent));
					state.strategy = "clip_search";
				}
			}
			else if (kind === "string_end" || kind === "string_start") {} else if (kind === "string_end_newline") replaceWith(setParentDeep(parseFragment(r`(?=\n?\z)`), parent));
			else if (kind === "word_boundary") {
				if (!wordIsAscii && !asciiWordBoundaries) {
					const b = `(?:(?<=${defaultWordChar})(?!${defaultWordChar})|(?<!${defaultWordChar})(?=${defaultWordChar}))`;
					const B = `(?:(?<=${defaultWordChar})(?=${defaultWordChar})|(?<!${defaultWordChar})(?!${defaultWordChar}))`;
					replaceWith(setParentDeep(parseFragment(negate ? B : b), parent));
				}
			} else throw new Error(`Unexpected assertion kind "${kind}"`);
		},
		Backreference({ node }, { jsGroupNameMap }) {
			let { ref } = node;
			if (typeof ref === "string" && !isValidJsGroupName(ref)) {
				ref = getAndStoreJsGroupName(ref, jsGroupNameMap);
				node.ref = ref;
			}
		},
		CapturingGroup({ node }, { jsGroupNameMap, subroutineRefMap }) {
			let { name } = node;
			if (name && !isValidJsGroupName(name)) {
				name = getAndStoreJsGroupName(name, jsGroupNameMap);
				node.name = name;
			}
			subroutineRefMap.set(node.number, node);
			if (name) subroutineRefMap.set(name, node);
		},
		CharacterClassRange({ node, parent, replaceWith }) {
			if (parent.kind === "intersection") replaceWith(setParentDeep(C({ body: [node] }), parent), { traverse: true });
		},
		CharacterSet({ node, parent, replaceWith }, { accuracy, minTargetEs2024, digitIsAscii, spaceIsAscii, wordIsAscii }) {
			const { kind, negate, value } = node;
			if (digitIsAscii && (kind === "digit" || value === "digit")) {
				replaceWith(setParent(E("digit", { negate }), parent));
				return;
			}
			if (spaceIsAscii && (kind === "space" || value === "space")) {
				replaceWith(setParentDeep(setNegate(parseFragment(asciiSpaceChar), negate), parent));
				return;
			}
			if (wordIsAscii && (kind === "word" || value === "word")) {
				replaceWith(setParent(E("word", { negate }), parent));
				return;
			}
			if (kind === "any") replaceWith(setParent(Q("Any"), parent));
			else if (kind === "digit") replaceWith(setParent(Q("Nd", { negate }), parent));
			else if (kind === "dot") {} else if (kind === "text_segment") {
				if (accuracy === "strict") throw new Error(r`Use of "\X" requires non-strict accuracy`);
				const eBase = "\\p{Emoji}(?:\\p{EMod}|\\uFE0F\\u20E3?|[\\x{E0020}-\\x{E007E}]+\\x{E007F})?";
				const emoji = r`\p{RI}{2}|${eBase}(?:\u200D${eBase})*`;
				replaceWith(setParentDeep(parseFragment(r`(?>\r\n|${minTargetEs2024 ? r`\p{RGI_Emoji}` : emoji}|\P{M}\p{M}*)`, { skipPropertyNameValidation: true }), parent));
			} else if (kind === "hex") replaceWith(setParent(Q("AHex", { negate }), parent));
			else if (kind === "newline") replaceWith(setParentDeep(parseFragment(negate ? "[^\n]" : "(?>\r\n?|[\n\v\f\u2028\u2029])"), parent));
			else if (kind === "posix") if (!minTargetEs2024 && (value === "graph" || value === "print")) {
				if (accuracy === "strict") throw new Error(`POSIX class "${value}" requires min target ES2024 or non-strict accuracy`);
				let ascii = {
					graph: "!-~",
					print: " -~"
				}[value];
				if (negate) ascii = `\0-${cp(ascii.codePointAt(0) - 1)}${cp(ascii.codePointAt(2) + 1)}-\u{10FFFF}`;
				replaceWith(setParentDeep(parseFragment(`[${ascii}]`), parent));
			} else replaceWith(setParentDeep(setNegate(parseFragment(PosixClassMap.get(value)), negate), parent));
			else if (kind === "property") {
				if (!JsUnicodePropertyMap.has(w(value))) node.key = "sc";
			} else if (kind === "space") replaceWith(setParent(Q("space", { negate }), parent));
			else if (kind === "word") replaceWith(setParentDeep(setNegate(parseFragment(defaultWordChar), negate), parent));
			else throw new Error(`Unexpected character set kind "${kind}"`);
		},
		Directive({ node, parent, root, remove, replaceWith, removeAllPrevSiblings, removeAllNextSiblings }) {
			const { kind, flags } = node;
			if (kind === "flags") if (!flags.enable && !flags.disable) remove();
			else {
				const flagGroup = A({ flags });
				flagGroup.body[0].body = removeAllNextSiblings();
				replaceWith(setParentDeep(flagGroup, parent), { traverse: true });
			}
			else if (kind === "keep") {
				const firstAlt = root.body[0];
				const topLevel = root.body.length === 1 && o(firstAlt, { type: "Group" }) && firstAlt.body[0].body.length === 1 ? firstAlt.body[0] : root;
				if (parent.parent !== topLevel || topLevel.body.length > 1) throw new Error(r`Uses "\K" in a way that's unsupported`);
				const lookbehind = K({ behind: true });
				lookbehind.body[0].body = removeAllPrevSiblings();
				replaceWith(setParentDeep(lookbehind, parent));
			} else throw new Error(`Unexpected directive kind "${kind}"`);
		},
		Flags({ node, parent }) {
			if (node.posixIsAscii) throw new Error("Unsupported flag \"P\"");
			if (node.textSegmentMode === "word") throw new Error("Unsupported flag \"y{w}\"");
			[
				"digitIsAscii",
				"extended",
				"posixIsAscii",
				"spaceIsAscii",
				"wordIsAscii",
				"textSegmentMode"
			].forEach((f) => delete node[f]);
			Object.assign(node, {
				global: false,
				hasIndices: false,
				multiline: false,
				sticky: node.sticky ?? false
			});
			parent.options = {
				disable: {
					x: true,
					n: true
				},
				force: { v: true }
			};
		},
		Group({ node }) {
			if (!node.flags) return;
			const { enable, disable } = node.flags;
			enable?.extended && delete enable.extended;
			disable?.extended && delete disable.extended;
			enable?.dotAll && disable?.dotAll && delete enable.dotAll;
			enable?.ignoreCase && disable?.ignoreCase && delete enable.ignoreCase;
			enable && !Object.keys(enable).length && delete node.flags.enable;
			disable && !Object.keys(disable).length && delete node.flags.disable;
			!node.flags.enable && !node.flags.disable && delete node.flags;
		},
		LookaroundAssertion({ node }, state) {
			const { kind } = node;
			if (kind === "lookbehind") state.passedLookbehind = true;
		},
		NamedCallout({ node, parent, replaceWith }) {
			const { kind } = node;
			if (kind === "fail") replaceWith(setParentDeep(K({ negate: true }), parent));
			else throw new Error(`Unsupported named callout "(*${kind.toUpperCase()}"`);
		},
		Quantifier({ node }) {
			if (node.body.type === "Quantifier") {
				const group = A();
				group.body[0].body.push(node.body);
				node.body = setParentDeep(group, node);
			}
		},
		Regex: {
			enter({ node }, { supportedGNodes }) {
				const leadingGs = [];
				let hasAltWithLeadG = false;
				let hasAltWithoutLeadG = false;
				for (const alt of node.body) if (alt.body.length === 1 && alt.body[0].kind === "search_start") alt.body.pop();
				else {
					const leadingG = getLeadingG(alt.body);
					if (leadingG) {
						hasAltWithLeadG = true;
						Array.isArray(leadingG) ? leadingGs.push(...leadingG) : leadingGs.push(leadingG);
					} else hasAltWithoutLeadG = true;
				}
				if (hasAltWithLeadG && !hasAltWithoutLeadG) leadingGs.forEach((g) => supportedGNodes.add(g));
			},
			exit(_, { accuracy, passedLookbehind, strategy }) {
				if (accuracy === "strict" && passedLookbehind && strategy) throw new Error(r`Uses "\G" in a way that requires non-strict accuracy`);
			}
		},
		Subroutine({ node }, { jsGroupNameMap }) {
			let { ref } = node;
			if (typeof ref === "string" && !isValidJsGroupName(ref)) {
				ref = getAndStoreJsGroupName(ref, jsGroupNameMap);
				node.ref = ref;
			}
		}
	};
	SecondPassVisitor = {
		Backreference({ node }, { multiplexCapturesToLeftByRef, reffedNodesByReferencer }) {
			const { orphan, ref } = node;
			if (!orphan) reffedNodesByReferencer.set(node, [...multiplexCapturesToLeftByRef.get(ref).map(({ node: node2 }) => node2)]);
		},
		CapturingGroup: {
			enter({ node, parent, replaceWith, skip }, { groupOriginByCopy, groupsByName, multiplexCapturesToLeftByRef, openRefs, reffedNodesByReferencer }) {
				const origin = groupOriginByCopy.get(node);
				if (origin && openRefs.has(node.number)) {
					const recursion2 = setParent(createRecursion(node.number), parent);
					reffedNodesByReferencer.set(recursion2, openRefs.get(node.number));
					replaceWith(recursion2);
					return;
				}
				openRefs.set(node.number, node);
				multiplexCapturesToLeftByRef.set(node.number, []);
				if (node.name) getOrInsert(multiplexCapturesToLeftByRef, node.name, []);
				const multiplexNodes = multiplexCapturesToLeftByRef.get(node.name ?? node.number);
				for (let i = 0; i < multiplexNodes.length; i++) {
					const multiplex = multiplexNodes[i];
					if (origin === multiplex.node || origin && origin === multiplex.origin || node === multiplex.origin) {
						multiplexNodes.splice(i, 1);
						break;
					}
				}
				multiplexCapturesToLeftByRef.get(node.number).push({
					node,
					origin
				});
				if (node.name) multiplexCapturesToLeftByRef.get(node.name).push({
					node,
					origin
				});
				if (node.name) {
					const groupsWithSameName = getOrInsert(groupsByName, node.name, /* @__PURE__ */ new Map());
					let hasDuplicateNameToRemove = false;
					if (origin) hasDuplicateNameToRemove = true;
					else for (const groupInfo of groupsWithSameName.values()) if (!groupInfo.hasDuplicateNameToRemove) {
						hasDuplicateNameToRemove = true;
						break;
					}
					groupsByName.get(node.name).set(node, {
						node,
						hasDuplicateNameToRemove
					});
				}
			},
			exit({ node }, { openRefs }) {
				openRefs.delete(node.number);
			}
		},
		Group: {
			enter({ node }, state) {
				state.prevFlags = state.currentFlags;
				if (node.flags) state.currentFlags = getNewCurrentFlags(state.currentFlags, node.flags);
			},
			exit(_, state) {
				state.currentFlags = state.prevFlags;
			}
		},
		Subroutine({ node, parent, replaceWith }, state) {
			const { isRecursive, ref } = node;
			if (isRecursive) {
				let reffed = parent;
				while (reffed = reffed.parent) if (reffed.type === "CapturingGroup" && (reffed.name === ref || reffed.number === ref)) break;
				state.reffedNodesByReferencer.set(node, reffed);
				return;
			}
			const reffedGroupNode = state.subroutineRefMap.get(ref);
			const isGlobalRecursion = ref === 0;
			const expandedSubroutine = isGlobalRecursion ? createRecursion(0) : cloneCapturingGroup(reffedGroupNode, state.groupOriginByCopy, null);
			let replacement = expandedSubroutine;
			if (!isGlobalRecursion) {
				const reffedGroupFlagMods = getCombinedFlagModsFromFlagNodes(getAllParents(reffedGroupNode, (p) => p.type === "Group" && !!p.flags));
				const reffedGroupFlags = reffedGroupFlagMods ? getNewCurrentFlags(state.globalFlags, reffedGroupFlagMods) : state.globalFlags;
				if (!areFlagsEqual(reffedGroupFlags, state.currentFlags)) {
					replacement = A({ flags: getFlagModsFromFlags(reffedGroupFlags) });
					replacement.body[0].body.push(expandedSubroutine);
				}
			}
			replaceWith(setParentDeep(replacement, parent), { traverse: !isGlobalRecursion });
		}
	};
	ThirdPassVisitor = {
		Backreference({ node, parent, replaceWith }, state) {
			if (node.orphan) {
				state.highestOrphanBackref = Math.max(state.highestOrphanBackref, node.ref);
				return;
			}
			const participants = state.reffedNodesByReferencer.get(node).filter((reffed) => canParticipateWithNode(reffed, node));
			if (!participants.length) replaceWith(setParentDeep(K({ negate: true }), parent));
			else if (participants.length > 1) replaceWith(setParentDeep(A({
				atomic: true,
				body: participants.reverse().map((reffed) => b({ body: [k(reffed.number)] }))
			}), parent));
			else node.ref = participants[0].number;
		},
		CapturingGroup({ node }, state) {
			node.number = ++state.numCapturesToLeft;
			if (node.name) {
				if (state.groupsByName.get(node.name).get(node).hasDuplicateNameToRemove) delete node.name;
			}
		},
		Regex: { exit({ node }, state) {
			const numCapsNeeded = Math.max(state.highestOrphanBackref - state.numCapturesToLeft, 0);
			for (let i = 0; i < numCapsNeeded; i++) {
				const emptyCapture = P();
				node.body.at(-1).body.push(emptyCapture);
			}
		} },
		Subroutine({ node }, state) {
			if (!node.isRecursive || node.ref === 0) return;
			node.ref = state.reffedNodesByReferencer.get(node).number;
		}
	};
	FlagModifierVisitor = {
		"*": {
			enter({ node }, state) {
				if (isAnyGroup(node)) {
					const currentModI = state.getCurrentModI();
					state.pushModI(node.flags ? getNewCurrentFlags({ ignoreCase: currentModI }, node.flags).ignoreCase : currentModI);
				}
			},
			exit({ node }, state) {
				if (isAnyGroup(node)) state.popModI();
			}
		},
		Backreference(_, state) {
			state.setHasCasedChar();
		},
		Character({ node }, state) {
			if (charHasCase(cp(node.value))) state.setHasCasedChar();
		},
		CharacterClassRange({ node, skip }, state) {
			skip();
			if (getCasesOutsideCharClassRange(node, { firstOnly: true }).length) state.setHasCasedChar();
		},
		CharacterSet({ node }, state) {
			if (node.kind === "property" && UnicodePropertiesWithSpecificCase.has(node.value)) state.setHasCasedChar();
		}
	};
	generator = {
		Alternative({ body }, _, gen) {
			return body.map(gen).join("");
		},
		Assertion({ kind, negate }) {
			if (kind === "string_end") return "$";
			if (kind === "string_start") return "^";
			if (kind === "word_boundary") return negate ? r`\B` : r`\b`;
			throw new Error(`Unexpected assertion kind "${kind}"`);
		},
		Backreference({ ref }, state) {
			if (typeof ref !== "number") throw new Error("Unexpected named backref in transformed AST");
			if (!state.useFlagMods && state.accuracy === "strict" && state.currentFlags.ignoreCase && !state.captureMap.get(ref).ignoreCase) throw new Error("Use of case-insensitive backref to case-sensitive group requires target ES2025 or non-strict accuracy");
			return "\\" + ref;
		},
		CapturingGroup(node, state, gen) {
			const { body, name, number } = node;
			const data = { ignoreCase: state.currentFlags.ignoreCase };
			const origin = state.originMap.get(node);
			if (origin) {
				data.hidden = true;
				if (number > origin.number) data.transferTo = origin.number;
			}
			state.captureMap.set(number, data);
			return `(${name ? `?<${name}>` : ""}${body.map(gen).join("|")})`;
		},
		Character({ value }, state) {
			const char = cp(value);
			const escaped = getCharEscape(value, {
				escDigit: state.lastNode.type === "Backreference",
				inCharClass: state.inCharClass,
				useFlagV: state.useFlagV
			});
			if (escaped !== char) return escaped;
			if (state.useAppliedIgnoreCase && state.currentFlags.ignoreCase && charHasCase(char)) {
				const cases = getIgnoreCaseMatchChars(char);
				return state.inCharClass ? cases.join("") : cases.length > 1 ? `[${cases.join("")}]` : cases[0];
			}
			return char;
		},
		CharacterClass(node, state, gen) {
			const { kind, negate, parent } = node;
			let { body } = node;
			if (kind === "intersection" && !state.useFlagV) throw new Error("Use of character class intersection requires min target ES2024");
			if (envFlags.bugFlagVLiteralHyphenIsRange && state.useFlagV && body.some(isLiteralHyphen)) body = [m(45), ...body.filter((kid) => !isLiteralHyphen(kid))];
			const genClass = () => `[${negate ? "^" : ""}${body.map(gen).join(kind === "intersection" ? "&&" : "")}]`;
			if (!state.inCharClass) {
				if ((!state.useFlagV || envFlags.bugNestedClassIgnoresNegation) && !negate) {
					const negatedChildClasses = body.filter((kid) => kid.type === "CharacterClass" && kid.kind === "union" && kid.negate);
					if (negatedChildClasses.length) {
						const group = A();
						const groupFirstAlt = group.body[0];
						group.parent = parent;
						groupFirstAlt.parent = group;
						body = body.filter((kid) => !negatedChildClasses.includes(kid));
						node.body = body;
						if (body.length) {
							node.parent = groupFirstAlt;
							groupFirstAlt.body.push(node);
						} else group.body.pop();
						negatedChildClasses.forEach((cc) => {
							const newAlt = b({ body: [cc] });
							cc.parent = newAlt;
							newAlt.parent = group;
							group.body.push(newAlt);
						});
						return gen(group);
					}
				}
				state.inCharClass = true;
				const result = genClass();
				state.inCharClass = false;
				return result;
			}
			const firstEl = body[0];
			if (kind === "union" && !negate && firstEl && ((!state.useFlagV || !state.verbose) && parent.kind === "union" && !(envFlags.bugFlagVLiteralHyphenIsRange && state.useFlagV) || !state.verbose && parent.kind === "intersection" && body.length === 1 && firstEl.type !== "CharacterClassRange")) return body.map(gen).join("");
			if (!state.useFlagV && parent.type === "CharacterClass") throw new Error("Uses nested character class in a way that requires min target ES2024");
			return genClass();
		},
		CharacterClassRange(node, state) {
			const min = node.min.value;
			const max = node.max.value;
			const escOpts = {
				escDigit: false,
				inCharClass: true,
				useFlagV: state.useFlagV
			};
			const minStr = getCharEscape(min, escOpts);
			const maxStr = getCharEscape(max, escOpts);
			const extraChars = /* @__PURE__ */ new Set();
			if (state.useAppliedIgnoreCase && state.currentFlags.ignoreCase) getCodePointRangesFromChars(getCasesOutsideCharClassRange(node)).forEach((value) => {
				extraChars.add(Array.isArray(value) ? `${getCharEscape(value[0], escOpts)}-${getCharEscape(value[1], escOpts)}` : getCharEscape(value, escOpts));
			});
			return `${minStr}-${maxStr}${[...extraChars].join("")}`;
		},
		CharacterSet({ kind, negate, value, key }, state) {
			if (kind === "dot") return state.currentFlags.dotAll ? state.appliedGlobalFlags.dotAll || state.useFlagMods ? "." : "[^]" : r`[^\n]`;
			if (kind === "digit") return negate ? r`\D` : r`\d`;
			if (kind === "property") {
				if (state.useAppliedIgnoreCase && state.currentFlags.ignoreCase && UnicodePropertiesWithSpecificCase.has(value)) throw new Error(`Unicode property "${value}" can't be case-insensitive when other chars have specific case`);
				return `${negate ? r`\P` : r`\p`}{${key ? `${key}=` : ""}${value}}`;
			}
			if (kind === "word") return negate ? r`\W` : r`\w`;
			throw new Error(`Unexpected character set kind "${kind}"`);
		},
		Flags(node, state) {
			return (state.appliedGlobalFlags.ignoreCase ? "i" : "") + (node.dotAll ? "s" : "") + (node.sticky ? "y" : "");
		},
		Group({ atomic: atomic2, body, flags, parent }, state, gen) {
			const currentFlags = state.currentFlags;
			if (flags) state.currentFlags = getNewCurrentFlags(currentFlags, flags);
			const contents = body.map(gen).join("|");
			const result = !state.verbose && body.length === 1 && parent.type !== "Quantifier" && !atomic2 && (!state.useFlagMods || !flags) ? contents : `(?${getGroupPrefix(atomic2, flags, state.useFlagMods)}${contents})`;
			state.currentFlags = currentFlags;
			return result;
		},
		LookaroundAssertion({ body, kind, negate }, _, gen) {
			return `(?${`${kind === "lookahead" ? "" : "<"}${negate ? "!" : "="}`}${body.map(gen).join("|")})`;
		},
		Quantifier(node, _, gen) {
			return gen(node.body) + getQuantifierStr(node);
		},
		Subroutine({ isRecursive, ref }, state) {
			if (!isRecursive) throw new Error("Unexpected non-recursive subroutine in transformed AST");
			const limit = state.recursionLimit;
			return ref === 0 ? `(?R=${limit})` : r`\g<${ref}&R=${limit}>`;
		}
	};
	BaseEscapeChars = /* @__PURE__ */ new Set([
		"$",
		"(",
		")",
		"*",
		"+",
		".",
		"?",
		"[",
		"\\",
		"]",
		"^",
		"{",
		"|",
		"}"
	]);
	CharClassEscapeChars = /* @__PURE__ */ new Set([
		"-",
		"\\",
		"]",
		"^",
		"["
	]);
	CharClassEscapeCharsFlagV = /* @__PURE__ */ new Set([
		"(",
		")",
		"-",
		"/",
		"[",
		"\\",
		"]",
		"^",
		"{",
		"|",
		"}",
		"!",
		"#",
		"$",
		"%",
		"&",
		"*",
		"+",
		",",
		".",
		":",
		";",
		"<",
		"=",
		">",
		"?",
		"@",
		"`",
		"~"
	]);
	CharCodeEscapeMap = /* @__PURE__ */ new Map([
		[9, r`\t`],
		[10, r`\n`],
		[11, r`\v`],
		[12, r`\f`],
		[13, r`\r`],
		[8232, r`\u2028`],
		[8233, r`\u2029`],
		[65279, r`\uFEFF`]
	]);
	casedRe = /^\p{Cased}$/u;
	EmulatedRegExp = class _EmulatedRegExp extends RegExp {
		/**
		@type {Map<number, {
		hidden?: true;
		transferTo?: number;
		}>}
		*/
		#captureMap = /* @__PURE__ */ new Map();
		/**
		@type {RegExp | EmulatedRegExp | null}
		*/
		#compiled = null;
		/**
		@type {string}
		*/
		#pattern;
		/**
		@type {Map<number, string>?}
		*/
		#nameMap = null;
		/**
		@type {string?}
		*/
		#strategy = null;
		/**
		Can be used to serialize the instance.
		@type {EmulatedRegExpOptions}
		*/
		rawOptions = {};
		get source() {
			return this.#pattern || "(?:)";
		}
		/**
		@overload
		@param {string} pattern
		@param {string} [flags]
		@param {EmulatedRegExpOptions} [options]
		*/
		/**
		@overload
		@param {EmulatedRegExp} pattern
		@param {string} [flags]
		*/
		constructor(pattern, flags, options) {
			const lazyCompile = !!options?.lazyCompile;
			if (pattern instanceof RegExp) {
				if (options) throw new Error("Cannot provide options when copying a regexp");
				const re = pattern;
				super(re, flags);
				this.#pattern = re.source;
				if (re instanceof _EmulatedRegExp) {
					this.#captureMap = re.#captureMap;
					this.#nameMap = re.#nameMap;
					this.#strategy = re.#strategy;
					this.rawOptions = re.rawOptions;
				}
			} else {
				const opts = {
					hiddenCaptures: [],
					strategy: null,
					transfers: [],
					...options
				};
				super(lazyCompile ? "" : pattern, flags);
				this.#pattern = pattern;
				this.#captureMap = createCaptureMap(opts.hiddenCaptures, opts.transfers);
				this.#strategy = opts.strategy;
				this.rawOptions = options ?? {};
			}
			if (!lazyCompile) this.#compiled = this;
		}
		/**
		Called internally by all String/RegExp methods that use regexes.
		@override
		@param {string} str
		@returns {RegExpExecArray?}
		*/
		exec(str) {
			if (!this.#compiled) {
				const { lazyCompile, ...rest } = this.rawOptions;
				this.#compiled = new _EmulatedRegExp(this.#pattern, this.flags, rest);
			}
			const useLastIndex = this.global || this.sticky;
			const pos = this.lastIndex;
			if (this.#strategy === "clip_search" && useLastIndex && pos) {
				this.lastIndex = 0;
				const match = this.#execCore(str.slice(pos));
				if (match) {
					adjustMatchDetailsForOffset(match, pos, str, this.hasIndices);
					this.lastIndex += pos;
				}
				return match;
			}
			return this.#execCore(str);
		}
		/**
		Adds support for hidden and transfer captures.
		@param {string} str
		@returns
		*/
		#execCore(str) {
			this.#compiled.lastIndex = this.lastIndex;
			const match = super.exec.call(this.#compiled, str);
			this.lastIndex = this.#compiled.lastIndex;
			if (!match || !this.#captureMap.size) return match;
			const matchCopy = [...match];
			match.length = 1;
			let indicesCopy;
			if (this.hasIndices) {
				indicesCopy = [...match.indices];
				match.indices.length = 1;
			}
			const mappedNums = [0];
			for (let i = 1; i < matchCopy.length; i++) {
				const { hidden, transferTo } = this.#captureMap.get(i) ?? {};
				if (hidden) mappedNums.push(null);
				else {
					mappedNums.push(match.length);
					match.push(matchCopy[i]);
					if (this.hasIndices) match.indices.push(indicesCopy[i]);
				}
				if (transferTo && matchCopy[i] !== void 0) {
					const to = mappedNums[transferTo];
					if (!to) throw new Error(`Invalid capture transfer to "${to}"`);
					match[to] = matchCopy[i];
					if (this.hasIndices) match.indices[to] = indicesCopy[i];
					if (match.groups) {
						if (!this.#nameMap) this.#nameMap = createNameMap(this.source);
						const name = this.#nameMap.get(transferTo);
						if (name) {
							match.groups[name] = matchCopy[i];
							if (this.hasIndices) match.indices.groups[name] = indicesCopy[i];
						}
					}
				}
			}
			return match;
		}
	};
}));
//#endregion
//#region ../../node_modules/@shikijs/engine-javascript/dist/shared/engine-javascript.hzpS1_41.mjs
var MAX, JavaScriptScanner;
var init_engine_javascript_hzpS1_41 = __esmMin((() => {
	MAX = 4294967295;
	JavaScriptScanner = class {
		constructor(patterns, options = {}) {
			this.patterns = patterns;
			this.options = options;
			const { forgiving = false, cache, regexConstructor } = options;
			if (!regexConstructor) throw new Error("Option `regexConstructor` is not provided");
			this.regexps = patterns.map((p) => {
				if (typeof p !== "string") return p;
				const cached = cache?.get(p);
				if (cached) {
					if (cached instanceof RegExp) return cached;
					if (forgiving) return null;
					throw cached;
				}
				try {
					const regex = regexConstructor(p);
					cache?.set(p, regex);
					return regex;
				} catch (e) {
					cache?.set(p, e);
					if (forgiving) return null;
					throw e;
				}
			});
		}
		regexps;
		findNextMatchSync(string, startPosition, _options) {
			const str = typeof string === "string" ? string : string.content;
			const pending = [];
			function toResult(index, match, offset = 0) {
				return {
					index,
					captureIndices: match.indices.map((indice) => {
						if (indice == null) return {
							start: MAX,
							end: MAX,
							length: 0
						};
						return {
							start: indice[0] + offset,
							end: indice[1] + offset,
							length: indice[1] - indice[0]
						};
					})
				};
			}
			for (let i = 0; i < this.regexps.length; i++) {
				const regexp = this.regexps[i];
				if (!regexp) continue;
				try {
					regexp.lastIndex = startPosition;
					const match = regexp.exec(str);
					if (!match) continue;
					if (match.index === startPosition) return toResult(i, match, 0);
					pending.push([
						i,
						match,
						0
					]);
				} catch (e) {
					if (this.options.forgiving) continue;
					throw e;
				}
			}
			if (pending.length) {
				const minIndex = Math.min(...pending.map((m) => m[1].index));
				for (const [i, match, offset] of pending) if (match.index === minIndex) return toResult(i, match, offset);
			}
			return null;
		}
	};
}));
//#endregion
//#region ../../node_modules/@shikijs/engine-javascript/dist/engine-compile.mjs
function defaultJavaScriptRegexConstructor(pattern, options) {
	return toRegExp(pattern, {
		global: true,
		hasIndices: true,
		lazyCompileLength: 3e3,
		rules: {
			allowOrphanBackrefs: true,
			asciiWordBoundaries: true,
			captureGroup: true,
			recursionLimit: 5,
			singleline: true
		},
		...options
	});
}
function createJavaScriptRegexEngine(options = {}) {
	const _options = Object.assign({
		target: "auto",
		cache: /* @__PURE__ */ new Map()
	}, options);
	_options.regexConstructor ||= (pattern) => defaultJavaScriptRegexConstructor(pattern, { target: _options.target });
	return {
		createScanner(patterns) {
			return new JavaScriptScanner(patterns, _options);
		},
		createString(s) {
			return { content: s };
		}
	};
}
var init_engine_compile = __esmMin((() => {
	init_esm();
	init_engine_javascript_hzpS1_41();
}));
//#endregion
//#region ../../node_modules/@shikijs/engine-javascript/dist/index.mjs
var dist_exports = /* @__PURE__ */ __exportAll({ createJavaScriptRegexEngine: () => createJavaScriptRegexEngine });
var init_dist = __esmMin((() => {
	init_engine_compile();
	init_engine_javascript_hzpS1_41();
}));
//#endregion
export { init_dist as n, createJavaScriptRegexEngine as r, dist_exports as t };
