import { n as __esmMin } from "./chunk-BRZcfu7K.js";
//#region ../../node_modules/character-entities-legacy/index.js
var characterEntitiesLegacy;
var init_character_entities_legacy = __esmMin((() => {
	characterEntitiesLegacy = [
		"AElig",
		"AMP",
		"Aacute",
		"Acirc",
		"Agrave",
		"Aring",
		"Atilde",
		"Auml",
		"COPY",
		"Ccedil",
		"ETH",
		"Eacute",
		"Ecirc",
		"Egrave",
		"Euml",
		"GT",
		"Iacute",
		"Icirc",
		"Igrave",
		"Iuml",
		"LT",
		"Ntilde",
		"Oacute",
		"Ocirc",
		"Ograve",
		"Oslash",
		"Otilde",
		"Ouml",
		"QUOT",
		"REG",
		"THORN",
		"Uacute",
		"Ucirc",
		"Ugrave",
		"Uuml",
		"Yacute",
		"aacute",
		"acirc",
		"acute",
		"aelig",
		"agrave",
		"amp",
		"aring",
		"atilde",
		"auml",
		"brvbar",
		"ccedil",
		"cedil",
		"cent",
		"copy",
		"curren",
		"deg",
		"divide",
		"eacute",
		"ecirc",
		"egrave",
		"eth",
		"euml",
		"frac12",
		"frac14",
		"frac34",
		"gt",
		"iacute",
		"icirc",
		"iexcl",
		"igrave",
		"iquest",
		"iuml",
		"laquo",
		"lt",
		"macr",
		"micro",
		"middot",
		"nbsp",
		"not",
		"ntilde",
		"oacute",
		"ocirc",
		"ograve",
		"ordf",
		"ordm",
		"oslash",
		"otilde",
		"ouml",
		"para",
		"plusmn",
		"pound",
		"quot",
		"raquo",
		"reg",
		"sect",
		"shy",
		"sup1",
		"sup2",
		"sup3",
		"szlig",
		"thorn",
		"times",
		"uacute",
		"ucirc",
		"ugrave",
		"uml",
		"uuml",
		"yacute",
		"yen",
		"yuml"
	];
}));
//#endregion
//#region ../../node_modules/stringify-entities/lib/core.js
/**
* Encode certain characters in `value`.
*
* @param {string} value
* @param {CoreWithFormatOptions} options
* @returns {string}
*/
function core(value, options) {
	value = value.replace(options.subset ? charactersToExpressionCached(options.subset) : defaultSubsetRegex, basic);
	if (options.subset || options.escapeOnly) return value;
	return value.replace(surrogatePairsRegex, surrogate).replace(controlCharactersRegex, basic);
	/**
	* @param {string} pair
	* @param {number} index
	* @param {string} all
	*/
	function surrogate(pair, index, all) {
		return options.format((pair.charCodeAt(0) - 55296) * 1024 + pair.charCodeAt(1) - 56320 + 65536, all.charCodeAt(index + 2), options);
	}
	/**
	* @param {string} character
	* @param {number} index
	* @param {string} all
	*/
	function basic(character, index, all) {
		return options.format(character.charCodeAt(0), all.charCodeAt(index + 1), options);
	}
}
/**
* A wrapper function that caches the result of `charactersToExpression` with a WeakMap.
* This can improve performance when tooling calls `charactersToExpression` repeatedly
* with the same subset.
*
* @param {ReadonlyArray<string>} subset
* @returns {RegExp}
*/
function charactersToExpressionCached(subset) {
	let cached = subsetToRegexCache.get(subset);
	if (!cached) {
		cached = charactersToExpression(subset);
		subsetToRegexCache.set(subset, cached);
	}
	return cached;
}
/**
* @param {ReadonlyArray<string>} subset
* @returns {RegExp}
*/
function charactersToExpression(subset) {
	/** @type {Array<string>} */
	const groups = [];
	let index = -1;
	while (++index < subset.length) groups.push(subset[index].replace(regexEscapeRegex, "\\$&"));
	return new RegExp("(?:" + groups.join("|") + ")", "g");
}
var defaultSubsetRegex, surrogatePairsRegex, controlCharactersRegex, regexEscapeRegex, subsetToRegexCache;
var init_core = __esmMin((() => {
	defaultSubsetRegex = /["&'<>`]/g;
	surrogatePairsRegex = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
	controlCharactersRegex = /[\x01-\t\v\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g;
	regexEscapeRegex = /[|\\{}()[\]^$+*?.]/g;
	subsetToRegexCache = /* @__PURE__ */ new WeakMap();
}));
//#endregion
//#region ../../node_modules/stringify-entities/lib/util/to-hexadecimal.js
/**
* Configurable ways to encode characters as hexadecimal references.
*
* @param {number} code
* @param {number} next
* @param {boolean|undefined} omit
* @returns {string}
*/
function toHexadecimal(code, next, omit) {
	const value = "&#x" + code.toString(16).toUpperCase();
	return omit && next && !hexadecimalRegex.test(String.fromCharCode(next)) ? value : value + ";";
}
var hexadecimalRegex;
var init_to_hexadecimal = __esmMin((() => {
	hexadecimalRegex = /[\dA-Fa-f]/;
}));
//#endregion
//#region ../../node_modules/stringify-entities/lib/util/to-decimal.js
/**
* Configurable ways to encode characters as decimal references.
*
* @param {number} code
* @param {number} next
* @param {boolean|undefined} omit
* @returns {string}
*/
function toDecimal(code, next, omit) {
	const value = "&#" + String(code);
	return omit && next && !decimalRegex.test(String.fromCharCode(next)) ? value : value + ";";
}
var decimalRegex;
var init_to_decimal = __esmMin((() => {
	decimalRegex = /\d/;
}));
//#endregion
//#region ../../node_modules/character-entities-html4/index.js
var characterEntitiesHtml4;
var init_character_entities_html4 = __esmMin((() => {
	characterEntitiesHtml4 = {
		nbsp: "\xA0",
		iexcl: "¡",
		cent: "¢",
		pound: "£",
		curren: "¤",
		yen: "¥",
		brvbar: "¦",
		sect: "§",
		uml: "¨",
		copy: "©",
		ordf: "ª",
		laquo: "«",
		not: "¬",
		shy: "­",
		reg: "®",
		macr: "¯",
		deg: "°",
		plusmn: "±",
		sup2: "²",
		sup3: "³",
		acute: "´",
		micro: "µ",
		para: "¶",
		middot: "·",
		cedil: "¸",
		sup1: "¹",
		ordm: "º",
		raquo: "»",
		frac14: "¼",
		frac12: "½",
		frac34: "¾",
		iquest: "¿",
		Agrave: "À",
		Aacute: "Á",
		Acirc: "Â",
		Atilde: "Ã",
		Auml: "Ä",
		Aring: "Å",
		AElig: "Æ",
		Ccedil: "Ç",
		Egrave: "È",
		Eacute: "É",
		Ecirc: "Ê",
		Euml: "Ë",
		Igrave: "Ì",
		Iacute: "Í",
		Icirc: "Î",
		Iuml: "Ï",
		ETH: "Ð",
		Ntilde: "Ñ",
		Ograve: "Ò",
		Oacute: "Ó",
		Ocirc: "Ô",
		Otilde: "Õ",
		Ouml: "Ö",
		times: "×",
		Oslash: "Ø",
		Ugrave: "Ù",
		Uacute: "Ú",
		Ucirc: "Û",
		Uuml: "Ü",
		Yacute: "Ý",
		THORN: "Þ",
		szlig: "ß",
		agrave: "à",
		aacute: "á",
		acirc: "â",
		atilde: "ã",
		auml: "ä",
		aring: "å",
		aelig: "æ",
		ccedil: "ç",
		egrave: "è",
		eacute: "é",
		ecirc: "ê",
		euml: "ë",
		igrave: "ì",
		iacute: "í",
		icirc: "î",
		iuml: "ï",
		eth: "ð",
		ntilde: "ñ",
		ograve: "ò",
		oacute: "ó",
		ocirc: "ô",
		otilde: "õ",
		ouml: "ö",
		divide: "÷",
		oslash: "ø",
		ugrave: "ù",
		uacute: "ú",
		ucirc: "û",
		uuml: "ü",
		yacute: "ý",
		thorn: "þ",
		yuml: "ÿ",
		fnof: "ƒ",
		Alpha: "Α",
		Beta: "Β",
		Gamma: "Γ",
		Delta: "Δ",
		Epsilon: "Ε",
		Zeta: "Ζ",
		Eta: "Η",
		Theta: "Θ",
		Iota: "Ι",
		Kappa: "Κ",
		Lambda: "Λ",
		Mu: "Μ",
		Nu: "Ν",
		Xi: "Ξ",
		Omicron: "Ο",
		Pi: "Π",
		Rho: "Ρ",
		Sigma: "Σ",
		Tau: "Τ",
		Upsilon: "Υ",
		Phi: "Φ",
		Chi: "Χ",
		Psi: "Ψ",
		Omega: "Ω",
		alpha: "α",
		beta: "β",
		gamma: "γ",
		delta: "δ",
		epsilon: "ε",
		zeta: "ζ",
		eta: "η",
		theta: "θ",
		iota: "ι",
		kappa: "κ",
		lambda: "λ",
		mu: "μ",
		nu: "ν",
		xi: "ξ",
		omicron: "ο",
		pi: "π",
		rho: "ρ",
		sigmaf: "ς",
		sigma: "σ",
		tau: "τ",
		upsilon: "υ",
		phi: "φ",
		chi: "χ",
		psi: "ψ",
		omega: "ω",
		thetasym: "ϑ",
		upsih: "ϒ",
		piv: "ϖ",
		bull: "•",
		hellip: "…",
		prime: "′",
		Prime: "″",
		oline: "‾",
		frasl: "⁄",
		weierp: "℘",
		image: "ℑ",
		real: "ℜ",
		trade: "™",
		alefsym: "ℵ",
		larr: "←",
		uarr: "↑",
		rarr: "→",
		darr: "↓",
		harr: "↔",
		crarr: "↵",
		lArr: "⇐",
		uArr: "⇑",
		rArr: "⇒",
		dArr: "⇓",
		hArr: "⇔",
		forall: "∀",
		part: "∂",
		exist: "∃",
		empty: "∅",
		nabla: "∇",
		isin: "∈",
		notin: "∉",
		ni: "∋",
		prod: "∏",
		sum: "∑",
		minus: "−",
		lowast: "∗",
		radic: "√",
		prop: "∝",
		infin: "∞",
		ang: "∠",
		and: "∧",
		or: "∨",
		cap: "∩",
		cup: "∪",
		int: "∫",
		there4: "∴",
		sim: "∼",
		cong: "≅",
		asymp: "≈",
		ne: "≠",
		equiv: "≡",
		le: "≤",
		ge: "≥",
		sub: "⊂",
		sup: "⊃",
		nsub: "⊄",
		sube: "⊆",
		supe: "⊇",
		oplus: "⊕",
		otimes: "⊗",
		perp: "⊥",
		sdot: "⋅",
		lceil: "⌈",
		rceil: "⌉",
		lfloor: "⌊",
		rfloor: "⌋",
		lang: "〈",
		rang: "〉",
		loz: "◊",
		spades: "♠",
		clubs: "♣",
		hearts: "♥",
		diams: "♦",
		quot: "\"",
		amp: "&",
		lt: "<",
		gt: ">",
		OElig: "Œ",
		oelig: "œ",
		Scaron: "Š",
		scaron: "š",
		Yuml: "Ÿ",
		circ: "ˆ",
		tilde: "˜",
		ensp: " ",
		emsp: " ",
		thinsp: " ",
		zwnj: "‌",
		zwj: "‍",
		lrm: "‎",
		rlm: "‏",
		ndash: "–",
		mdash: "—",
		lsquo: "‘",
		rsquo: "’",
		sbquo: "‚",
		ldquo: "“",
		rdquo: "”",
		bdquo: "„",
		dagger: "†",
		Dagger: "‡",
		permil: "‰",
		lsaquo: "‹",
		rsaquo: "›",
		euro: "€"
	};
}));
//#endregion
//#region ../../node_modules/stringify-entities/lib/constant/dangerous.js
var dangerous;
var init_dangerous = __esmMin((() => {
	dangerous = [
		"cent",
		"copy",
		"divide",
		"gt",
		"lt",
		"not",
		"para",
		"times"
	];
}));
//#endregion
//#region ../../node_modules/stringify-entities/lib/util/to-named.js
/**
* Configurable ways to encode characters as named references.
*
* @param {number} code
* @param {number} next
* @param {boolean|undefined} omit
* @param {boolean|undefined} attribute
* @returns {string}
*/
function toNamed(code, next, omit, attribute) {
	const character = String.fromCharCode(code);
	if (own.call(characters, character)) {
		const name = characters[character];
		const value = "&" + name;
		if (omit && characterEntitiesLegacy.includes(name) && !dangerous.includes(name) && (!attribute || next && next !== 61 && notAlphanumericRegex.test(String.fromCharCode(next)))) return value;
		return value + ";";
	}
	return "";
}
var own, characters, key, notAlphanumericRegex;
var init_to_named = __esmMin((() => {
	init_character_entities_legacy();
	init_character_entities_html4();
	init_dangerous();
	own = {}.hasOwnProperty;
	characters = {};
	for (key in characterEntitiesHtml4) if (own.call(characterEntitiesHtml4, key)) characters[characterEntitiesHtml4[key]] = key;
	notAlphanumericRegex = /[^\dA-Za-z]/;
}));
//#endregion
//#region ../../node_modules/stringify-entities/lib/util/format-smart.js
/**
* Configurable ways to encode a character yielding pretty or small results.
*
* @param {number} code
* @param {number} next
* @param {FormatSmartOptions} options
* @returns {string}
*/
function formatSmart(code, next, options) {
	let numeric = toHexadecimal(code, next, options.omitOptionalSemicolons);
	/** @type {string|undefined} */
	let named;
	if (options.useNamedReferences || options.useShortestReferences) named = toNamed(code, next, options.omitOptionalSemicolons, options.attribute);
	if ((options.useShortestReferences || !named) && options.useShortestReferences) {
		const decimal = toDecimal(code, next, options.omitOptionalSemicolons);
		if (decimal.length < numeric.length) numeric = decimal;
	}
	return named && (!options.useShortestReferences || named.length < numeric.length) ? named : numeric;
}
var init_format_smart = __esmMin((() => {
	init_to_hexadecimal();
	init_to_decimal();
	init_to_named();
}));
//#endregion
//#region ../../node_modules/stringify-entities/lib/util/format-basic.js
/**
* The smallest way to encode a character.
*
* @param {number} code
* @returns {string}
*/
function formatBasic(code) {
	return "&#x" + code.toString(16).toUpperCase() + ";";
}
var init_format_basic = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/stringify-entities/lib/index.js
/**
* Encode special characters in `value`.
*
* @param {string} value
*   Value to encode.
* @param {Options} [options]
*   Configuration.
* @returns {string}
*   Encoded value.
*/
function stringifyEntities(value, options) {
	return core(value, Object.assign({ format: formatSmart }, options));
}
/**
* Encode special characters in `value` as hexadecimals.
*
* @param {string} value
*   Value to encode.
* @param {LightOptions} [options]
*   Configuration.
* @returns {string}
*   Encoded value.
*/
function stringifyEntitiesLight(value, options) {
	return core(value, Object.assign({ format: formatBasic }, options));
}
var init_lib = __esmMin((() => {
	init_core();
	init_format_smart();
	init_format_basic();
}));
//#endregion
//#region ../../node_modules/stringify-entities/index.js
var init_stringify_entities = __esmMin((() => {
	init_lib();
}));
//#endregion
export { init_character_entities_legacy as a, characterEntitiesLegacy as i, stringifyEntities as n, stringifyEntitiesLight as r, init_stringify_entities as t };
