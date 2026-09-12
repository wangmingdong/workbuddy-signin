import { n as __esmMin, r as __exportAll } from "./chunk-BRZcfu7K.js";
import { n as init_index_dom, t as decodeNamedCharacterReference } from "./index.dom-Hjybw7gi.js";
import { At as init_esm, C as init_mermaid_59c9be08, E as log$1, M as sanitizeText$2, kt as dedent, u as decodeEntities, v as getConfig$1 } from "./mermaid-59c9be08-DUdjYWP7.js";
import { a as decodeNumericCharacterReference, c as normalizeIdentifier, d as init_mdast_util_to_string, f as toString, i as init_micromark_util_decode_string, l as init_micromark_util_subtokenize, n as stringifyPosition, o as init_micromark_util_decode_numeric_character_reference, r as decodeString, s as init_micromark_util_normalize_identifier, t as init_unist_util_stringify_position, u as subtokenize } from "./unist-util-stringify-position-C9NpagKm.js";
//#region ../../node_modules/mermaid/node_modules/micromark-util-chunked/index.js
/**
* Like `Array#splice`, but smarter for giant arrays.
*
* `Array#splice` takes all items to be inserted as individual argument which
* causes a stack overflow in V8 when trying to insert 100k items for instance.
*
* Otherwise, this does not return the removed items, and takes `items` as an
* array instead of rest parameters.
*
* @template {unknown} T
*   Item type.
* @param {Array<T>} list
*   List to operate on.
* @param {number} start
*   Index to remove/insert at (can be negative).
* @param {number} remove
*   Number of items to remove.
* @param {Array<T>} items
*   Items to inject into `list`.
* @returns {void}
*   Nothing.
*/
function splice(list, start, remove, items) {
	const end = list.length;
	let chunkStart = 0;
	/** @type {Array<unknown>} */
	let parameters;
	if (start < 0) start = -start > end ? 0 : end + start;
	else start = start > end ? end : start;
	remove = remove > 0 ? remove : 0;
	if (items.length < 1e4) {
		parameters = Array.from(items);
		parameters.unshift(start, remove);
		list.splice(...parameters);
	} else {
		if (remove) list.splice(start, remove);
		while (chunkStart < items.length) {
			parameters = items.slice(chunkStart, chunkStart + 1e4);
			parameters.unshift(start, 0);
			list.splice(...parameters);
			chunkStart += 1e4;
			start += 1e4;
		}
	}
}
/**
* Append `items` (an array) at the end of `list` (another array).
* When `list` was empty, returns `items` instead.
*
* This prevents a potentially expensive operation when `list` is empty,
* and adds items in batches to prevent V8 from hanging.
*
* @template {unknown} T
*   Item type.
* @param {Array<T>} list
*   List to operate on.
* @param {Array<T>} items
*   Items to add to `list`.
* @returns {Array<T>}
*   Either `list` or `items`.
*/
function push(list, items) {
	if (list.length > 0) {
		splice(list, list.length, 0, items);
		return list;
	}
	return items;
}
var init_micromark_util_chunked = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/mermaid/node_modules/micromark-util-combine-extensions/index.js
/**
* Combine multiple syntax extensions into one.
*
* @param {Array<Extension>} extensions
*   List of syntax extensions.
* @returns {NormalizedExtension}
*   A single combined extension.
*/
function combineExtensions(extensions) {
	/** @type {NormalizedExtension} */
	const all = {};
	let index = -1;
	while (++index < extensions.length) syntaxExtension(all, extensions[index]);
	return all;
}
/**
* Merge `extension` into `all`.
*
* @param {NormalizedExtension} all
*   Extension to merge into.
* @param {Extension} extension
*   Extension to merge.
* @returns {void}
*/
function syntaxExtension(all, extension) {
	/** @type {keyof Extension} */
	let hook;
	for (hook in extension) {
		/** @type {Record<string, unknown>} */
		const left = (hasOwnProperty.call(all, hook) ? all[hook] : void 0) || (all[hook] = {});
		/** @type {Record<string, unknown> | undefined} */
		const right = extension[hook];
		/** @type {string} */
		let code;
		if (right) for (code in right) {
			if (!hasOwnProperty.call(left, code)) left[code] = [];
			const value = right[code];
			constructs(left[code], Array.isArray(value) ? value : value ? [value] : []);
		}
	}
}
/**
* Merge `list` into `existing` (both lists of constructs).
* Mutates `existing`.
*
* @param {Array<unknown>} existing
* @param {Array<unknown>} list
* @returns {void}
*/
function constructs(existing, list) {
	let index = -1;
	/** @type {Array<unknown>} */
	const before = [];
	while (++index < list.length) (list[index].add === "after" ? existing : before).push(list[index]);
	splice(existing, 0, 0, before);
}
var hasOwnProperty;
var init_micromark_util_combine_extensions = __esmMin((() => {
	init_micromark_util_chunked();
	hasOwnProperty = {}.hasOwnProperty;
}));
//#endregion
//#region ../../node_modules/mermaid/node_modules/micromark-util-character/lib/unicode-punctuation-regex.js
var unicodePunctuationRegex;
var init_unicode_punctuation_regex = __esmMin((() => {
	unicodePunctuationRegex = /[!-\/:-@\[-`\{-~\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]/;
}));
//#endregion
//#region ../../node_modules/mermaid/node_modules/micromark-util-character/index.js
/**
* Check whether a character code is an ASCII control character.
*
* An **ASCII control** is a character in the inclusive range U+0000 NULL (NUL)
* to U+001F (US), or U+007F (DEL).
*
* @param {Code} code
*   Code.
* @returns {boolean}
*   Whether it matches.
*/
function asciiControl(code) {
	return code !== null && (code < 32 || code === 127);
}
/**
* Check whether a character code is a markdown line ending.
*
* A **markdown line ending** is the virtual characters M-0003 CARRIAGE RETURN
* LINE FEED (CRLF), M-0004 LINE FEED (LF) and M-0005 CARRIAGE RETURN (CR).
*
* In micromark, the actual character U+000A LINE FEED (LF) and U+000D CARRIAGE
* RETURN (CR) are replaced by these virtual characters depending on whether
* they occurred together.
*
* @param {Code} code
*   Code.
* @returns {boolean}
*   Whether it matches.
*/
function markdownLineEnding(code) {
	return code !== null && code < -2;
}
/**
* Check whether a character code is a markdown line ending (see
* `markdownLineEnding`) or markdown space (see `markdownSpace`).
*
* @param {Code} code
*   Code.
* @returns {boolean}
*   Whether it matches.
*/
function markdownLineEndingOrSpace(code) {
	return code !== null && (code < 0 || code === 32);
}
/**
* Check whether a character code is a markdown space.
*
* A **markdown space** is the concrete character U+0020 SPACE (SP) and the
* virtual characters M-0001 VIRTUAL SPACE (VS) and M-0002 HORIZONTAL TAB (HT).
*
* In micromark, the actual character U+0009 CHARACTER TABULATION (HT) is
* replaced by one M-0002 HORIZONTAL TAB (HT) and between 0 and 3 M-0001 VIRTUAL
* SPACE (VS) characters, depending on the column at which the tab occurred.
*
* @param {Code} code
*   Code.
* @returns {boolean}
*   Whether it matches.
*/
function markdownSpace(code) {
	return code === -2 || code === -1 || code === 32;
}
/**
* Create a code check from a regex.
*
* @param {RegExp} regex
* @returns {(code: Code) => boolean}
*/
function regexCheck(regex) {
	return check;
	/**
	* Check whether a code matches the bound regex.
	*
	* @param {Code} code
	*   Character code.
	* @returns {boolean}
	*   Whether the character code matches the bound regex.
	*/
	function check(code) {
		return code !== null && regex.test(String.fromCharCode(code));
	}
}
var asciiAlpha, asciiAlphanumeric, asciiAtext, asciiDigit, asciiHexDigit, asciiPunctuation, unicodePunctuation, unicodeWhitespace;
var init_micromark_util_character = __esmMin((() => {
	init_unicode_punctuation_regex();
	asciiAlpha = regexCheck(/[A-Za-z]/);
	asciiAlphanumeric = regexCheck(/[\dA-Za-z]/);
	asciiAtext = regexCheck(/[#-'*+\--9=?A-Z^-~]/);
	asciiDigit = regexCheck(/\d/);
	asciiHexDigit = regexCheck(/[\dA-Fa-f]/);
	asciiPunctuation = regexCheck(/[!-/:-@[-`{-~]/);
	unicodePunctuation = regexCheck(unicodePunctuationRegex);
	unicodeWhitespace = regexCheck(/\s/);
}));
//#endregion
//#region ../../node_modules/mermaid/node_modules/micromark-factory-space/index.js
/**
* Parse spaces and tabs.
*
* There is no `nok` parameter:
*
* *   spaces in markdown are often optional, in which case this factory can be
*     used and `ok` will be switched to whether spaces were found or not
* *   one line ending or space can be detected with `markdownSpace(code)` right
*     before using `factorySpace`
*
* ###### Examples
*
* Where `␉` represents a tab (plus how much it expands) and `␠` represents a
* single space.
*
* ```markdown
* ␉
* ␠␠␠␠
* ␉␠
* ```
*
* @param {Effects} effects
*   Context.
* @param {State} ok
*   State switched to when successful.
* @param {TokenType} type
*   Type (`' \t'`).
* @param {number | undefined} [max=Infinity]
*   Max (exclusive).
* @returns
*   Start state.
*/
function factorySpace(effects, ok, type, max) {
	const limit = max ? max - 1 : Number.POSITIVE_INFINITY;
	let size = 0;
	return start;
	/** @type {State} */
	function start(code) {
		if (markdownSpace(code)) {
			effects.enter(type);
			return prefix(code);
		}
		return ok(code);
	}
	/** @type {State} */
	function prefix(code) {
		if (markdownSpace(code) && size++ < limit) {
			effects.consume(code);
			return prefix;
		}
		effects.exit(type);
		return ok(code);
	}
}
var init_micromark_factory_space = __esmMin((() => {
	init_micromark_util_character();
}));
//#endregion
//#region ../../node_modules/mermaid/node_modules/micromark/lib/initialize/content.js
/**
* @this {TokenizeContext}
* @type {Initializer}
*/
function initializeContent(effects) {
	const contentStart = effects.attempt(this.parser.constructs.contentInitial, afterContentStartConstruct, paragraphInitial);
	/** @type {Token} */
	let previous;
	return contentStart;
	/** @type {State} */
	function afterContentStartConstruct(code) {
		if (code === null) {
			effects.consume(code);
			return;
		}
		effects.enter("lineEnding");
		effects.consume(code);
		effects.exit("lineEnding");
		return factorySpace(effects, contentStart, "linePrefix");
	}
	/** @type {State} */
	function paragraphInitial(code) {
		effects.enter("paragraph");
		return lineStart(code);
	}
	/** @type {State} */
	function lineStart(code) {
		const token = effects.enter("chunkText", {
			contentType: "text",
			previous
		});
		if (previous) previous.next = token;
		previous = token;
		return data(code);
	}
	/** @type {State} */
	function data(code) {
		if (code === null) {
			effects.exit("chunkText");
			effects.exit("paragraph");
			effects.consume(code);
			return;
		}
		if (markdownLineEnding(code)) {
			effects.consume(code);
			effects.exit("chunkText");
			return lineStart;
		}
		effects.consume(code);
		return data;
	}
}
var content$1;
var init_content$1 = __esmMin((() => {
	init_micromark_factory_space();
	init_micromark_util_character();
	content$1 = { tokenize: initializeContent };
}));
//#endregion
//#region ../../node_modules/mermaid/node_modules/micromark/lib/initialize/document.js
/**
* @this {TokenizeContext}
* @type {Initializer}
*/
function initializeDocument(effects) {
	const self = this;
	/** @type {Array<StackItem>} */
	const stack = [];
	let continued = 0;
	/** @type {TokenizeContext | undefined} */
	let childFlow;
	/** @type {Token | undefined} */
	let childToken;
	/** @type {number} */
	let lineStartOffset;
	return start;
	/** @type {State} */
	function start(code) {
		if (continued < stack.length) {
			const item = stack[continued];
			self.containerState = item[1];
			return effects.attempt(item[0].continuation, documentContinue, checkNewContainers)(code);
		}
		return checkNewContainers(code);
	}
	/** @type {State} */
	function documentContinue(code) {
		continued++;
		if (self.containerState._closeFlow) {
			self.containerState._closeFlow = void 0;
			if (childFlow) closeFlow();
			const indexBeforeExits = self.events.length;
			let indexBeforeFlow = indexBeforeExits;
			/** @type {Point | undefined} */
			let point;
			while (indexBeforeFlow--) if (self.events[indexBeforeFlow][0] === "exit" && self.events[indexBeforeFlow][1].type === "chunkFlow") {
				point = self.events[indexBeforeFlow][1].end;
				break;
			}
			exitContainers(continued);
			let index = indexBeforeExits;
			while (index < self.events.length) {
				self.events[index][1].end = Object.assign({}, point);
				index++;
			}
			splice(self.events, indexBeforeFlow + 1, 0, self.events.slice(indexBeforeExits));
			self.events.length = index;
			return checkNewContainers(code);
		}
		return start(code);
	}
	/** @type {State} */
	function checkNewContainers(code) {
		if (continued === stack.length) {
			if (!childFlow) return documentContinued(code);
			if (childFlow.currentConstruct && childFlow.currentConstruct.concrete) return flowStart(code);
			self.interrupt = Boolean(childFlow.currentConstruct && !childFlow._gfmTableDynamicInterruptHack);
		}
		self.containerState = {};
		return effects.check(containerConstruct, thereIsANewContainer, thereIsNoNewContainer)(code);
	}
	/** @type {State} */
	function thereIsANewContainer(code) {
		if (childFlow) closeFlow();
		exitContainers(continued);
		return documentContinued(code);
	}
	/** @type {State} */
	function thereIsNoNewContainer(code) {
		self.parser.lazy[self.now().line] = continued !== stack.length;
		lineStartOffset = self.now().offset;
		return flowStart(code);
	}
	/** @type {State} */
	function documentContinued(code) {
		self.containerState = {};
		return effects.attempt(containerConstruct, containerContinue, flowStart)(code);
	}
	/** @type {State} */
	function containerContinue(code) {
		continued++;
		stack.push([self.currentConstruct, self.containerState]);
		return documentContinued(code);
	}
	/** @type {State} */
	function flowStart(code) {
		if (code === null) {
			if (childFlow) closeFlow();
			exitContainers(0);
			effects.consume(code);
			return;
		}
		childFlow = childFlow || self.parser.flow(self.now());
		effects.enter("chunkFlow", {
			contentType: "flow",
			previous: childToken,
			_tokenizer: childFlow
		});
		return flowContinue(code);
	}
	/** @type {State} */
	function flowContinue(code) {
		if (code === null) {
			writeToChild(effects.exit("chunkFlow"), true);
			exitContainers(0);
			effects.consume(code);
			return;
		}
		if (markdownLineEnding(code)) {
			effects.consume(code);
			writeToChild(effects.exit("chunkFlow"));
			continued = 0;
			self.interrupt = void 0;
			return start;
		}
		effects.consume(code);
		return flowContinue;
	}
	/**
	* @param {Token} token
	* @param {boolean | undefined} [eof]
	* @returns {void}
	*/
	function writeToChild(token, eof) {
		const stream = self.sliceStream(token);
		if (eof) stream.push(null);
		token.previous = childToken;
		if (childToken) childToken.next = token;
		childToken = token;
		childFlow.defineSkip(token.start);
		childFlow.write(stream);
		if (self.parser.lazy[token.start.line]) {
			let index = childFlow.events.length;
			while (index--) if (childFlow.events[index][1].start.offset < lineStartOffset && (!childFlow.events[index][1].end || childFlow.events[index][1].end.offset > lineStartOffset)) return;
			const indexBeforeExits = self.events.length;
			let indexBeforeFlow = indexBeforeExits;
			/** @type {boolean | undefined} */
			let seen;
			/** @type {Point | undefined} */
			let point;
			while (indexBeforeFlow--) if (self.events[indexBeforeFlow][0] === "exit" && self.events[indexBeforeFlow][1].type === "chunkFlow") {
				if (seen) {
					point = self.events[indexBeforeFlow][1].end;
					break;
				}
				seen = true;
			}
			exitContainers(continued);
			index = indexBeforeExits;
			while (index < self.events.length) {
				self.events[index][1].end = Object.assign({}, point);
				index++;
			}
			splice(self.events, indexBeforeFlow + 1, 0, self.events.slice(indexBeforeExits));
			self.events.length = index;
		}
	}
	/**
	* @param {number} size
	* @returns {void}
	*/
	function exitContainers(size) {
		let index = stack.length;
		while (index-- > size) {
			const entry = stack[index];
			self.containerState = entry[1];
			entry[0].exit.call(self, effects);
		}
		stack.length = size;
	}
	function closeFlow() {
		childFlow.write([null]);
		childToken = void 0;
		childFlow = void 0;
		self.containerState._closeFlow = void 0;
	}
}
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeContainer(effects, ok, nok) {
	return factorySpace(effects, effects.attempt(this.parser.constructs.document, ok, nok), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
var document$1, containerConstruct;
var init_document = __esmMin((() => {
	init_micromark_factory_space();
	init_micromark_util_character();
	init_micromark_util_chunked();
	document$1 = { tokenize: initializeDocument };
	containerConstruct = { tokenize: tokenizeContainer };
}));
//#endregion
//#region ../../node_modules/mermaid/node_modules/micromark-util-classify-character/index.js
/**
* Classify whether a code represents whitespace, punctuation, or something
* else.
*
* Used for attention (emphasis, strong), whose sequences can open or close
* based on the class of surrounding characters.
*
* > 👉 **Note**: eof (`null`) is seen as whitespace.
*
* @param {Code} code
*   Code.
* @returns {typeof constants.characterGroupWhitespace | typeof constants.characterGroupPunctuation | undefined}
*   Group.
*/
function classifyCharacter(code) {
	if (code === null || markdownLineEndingOrSpace(code) || unicodeWhitespace(code)) return 1;
	if (unicodePunctuation(code)) return 2;
}
var init_micromark_util_classify_character = __esmMin((() => {
	init_micromark_util_character();
}));
//#endregion
//#region ../../node_modules/mermaid/node_modules/micromark-util-resolve-all/index.js
/**
* @typedef {import('micromark-util-types').Event} Event
* @typedef {import('micromark-util-types').Resolver} Resolver
* @typedef {import('micromark-util-types').TokenizeContext} TokenizeContext
*/
/**
* Call all `resolveAll`s.
*
* @param {Array<{resolveAll?: Resolver | undefined}>} constructs
*   List of constructs, optionally with `resolveAll`s.
* @param {Array<Event>} events
*   List of events.
* @param {TokenizeContext} context
*   Context used by `tokenize`.
* @returns {Array<Event>}
*   Changed events.
*/
function resolveAll(constructs, events, context) {
	/** @type {Array<Resolver>} */
	const called = [];
	let index = -1;
	while (++index < constructs.length) {
		const resolve = constructs[index].resolveAll;
		if (resolve && !called.includes(resolve)) {
			events = resolve(events, context);
			called.push(resolve);
		}
	}
	return events;
}
var init_micromark_util_resolve_all = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/mermaid/node_modules/micromark-core-commonmark/lib/attention.js
/**
* Take all events and resolve attention to emphasis or strong.
*
* @type {Resolver}
*/
function resolveAllAttention(events, context) {
	let index = -1;
	/** @type {number} */
	let open;
	/** @type {Token} */
	let group;
	/** @type {Token} */
	let text;
	/** @type {Token} */
	let openingSequence;
	/** @type {Token} */
	let closingSequence;
	/** @type {number} */
	let use;
	/** @type {Array<Event>} */
	let nextEvents;
	/** @type {number} */
	let offset;
	while (++index < events.length) if (events[index][0] === "enter" && events[index][1].type === "attentionSequence" && events[index][1]._close) {
		open = index;
		while (open--) if (events[open][0] === "exit" && events[open][1].type === "attentionSequence" && events[open][1]._open && context.sliceSerialize(events[open][1]).charCodeAt(0) === context.sliceSerialize(events[index][1]).charCodeAt(0)) {
			if ((events[open][1]._close || events[index][1]._open) && (events[index][1].end.offset - events[index][1].start.offset) % 3 && !((events[open][1].end.offset - events[open][1].start.offset + events[index][1].end.offset - events[index][1].start.offset) % 3)) continue;
			use = events[open][1].end.offset - events[open][1].start.offset > 1 && events[index][1].end.offset - events[index][1].start.offset > 1 ? 2 : 1;
			const start = Object.assign({}, events[open][1].end);
			const end = Object.assign({}, events[index][1].start);
			movePoint(start, -use);
			movePoint(end, use);
			openingSequence = {
				type: use > 1 ? "strongSequence" : "emphasisSequence",
				start,
				end: Object.assign({}, events[open][1].end)
			};
			closingSequence = {
				type: use > 1 ? "strongSequence" : "emphasisSequence",
				start: Object.assign({}, events[index][1].start),
				end
			};
			text = {
				type: use > 1 ? "strongText" : "emphasisText",
				start: Object.assign({}, events[open][1].end),
				end: Object.assign({}, events[index][1].start)
			};
			group = {
				type: use > 1 ? "strong" : "emphasis",
				start: Object.assign({}, openingSequence.start),
				end: Object.assign({}, closingSequence.end)
			};
			events[open][1].end = Object.assign({}, openingSequence.start);
			events[index][1].start = Object.assign({}, closingSequence.end);
			nextEvents = [];
			if (events[open][1].end.offset - events[open][1].start.offset) nextEvents = push(nextEvents, [[
				"enter",
				events[open][1],
				context
			], [
				"exit",
				events[open][1],
				context
			]]);
			nextEvents = push(nextEvents, [
				[
					"enter",
					group,
					context
				],
				[
					"enter",
					openingSequence,
					context
				],
				[
					"exit",
					openingSequence,
					context
				],
				[
					"enter",
					text,
					context
				]
			]);
			nextEvents = push(nextEvents, resolveAll(context.parser.constructs.insideSpan.null, events.slice(open + 1, index), context));
			nextEvents = push(nextEvents, [
				[
					"exit",
					text,
					context
				],
				[
					"enter",
					closingSequence,
					context
				],
				[
					"exit",
					closingSequence,
					context
				],
				[
					"exit",
					group,
					context
				]
			]);
			if (events[index][1].end.offset - events[index][1].start.offset) {
				offset = 2;
				nextEvents = push(nextEvents, [[
					"enter",
					events[index][1],
					context
				], [
					"exit",
					events[index][1],
					context
				]]);
			} else offset = 0;
			splice(events, open - 1, index - open + 3, nextEvents);
			index = open + nextEvents.length - offset - 2;
			break;
		}
	}
	index = -1;
	while (++index < events.length) if (events[index][1].type === "attentionSequence") events[index][1].type = "data";
	return events;
}
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeAttention(effects, ok) {
	const attentionMarkers = this.parser.constructs.attentionMarkers.null;
	const previous = this.previous;
	const before = classifyCharacter(previous);
	/** @type {NonNullable<Code>} */
	let marker;
	return start;
	/**
	* Before a sequence.
	*
	* ```markdown
	* > | **
	*     ^
	* ```
	*
	* @type {State}
	*/
	function start(code) {
		marker = code;
		effects.enter("attentionSequence");
		return inside(code);
	}
	/**
	* In a sequence.
	*
	* ```markdown
	* > | **
	*     ^^
	* ```
	*
	* @type {State}
	*/
	function inside(code) {
		if (code === marker) {
			effects.consume(code);
			return inside;
		}
		const token = effects.exit("attentionSequence");
		const after = classifyCharacter(code);
		const open = !after || after === 2 && before || attentionMarkers.includes(code);
		const close = !before || before === 2 && after || attentionMarkers.includes(previous);
		token._open = Boolean(marker === 42 ? open : open && (before || !close));
		token._close = Boolean(marker === 42 ? close : close && (after || !open));
		return ok(code);
	}
}
/**
* Move a point a bit.
*
* Note: `move` only works inside lines! It’s not possible to move past other
* chunks (replacement characters, tabs, or line endings).
*
* @param {Point} point
* @param {number} offset
* @returns {void}
*/
function movePoint(point, offset) {
	point.column += offset;
	point.offset += offset;
	point._bufferIndex += offset;
}
var attention;
var init_attention = __esmMin((() => {
	init_micromark_util_chunked();
	init_micromark_util_classify_character();
	init_micromark_util_resolve_all();
	attention = {
		name: "attention",
		tokenize: tokenizeAttention,
		resolveAll: resolveAllAttention
	};
}));
//#endregion
//#region ../../node_modules/mermaid/node_modules/micromark-core-commonmark/lib/autolink.js
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeAutolink(effects, ok, nok) {
	let size = 0;
	return start;
	/**
	* Start of an autolink.
	*
	* ```markdown
	* > | a<https://example.com>b
	*      ^
	* > | a<user@example.com>b
	*      ^
	* ```
	*
	* @type {State}
	*/
	function start(code) {
		effects.enter("autolink");
		effects.enter("autolinkMarker");
		effects.consume(code);
		effects.exit("autolinkMarker");
		effects.enter("autolinkProtocol");
		return open;
	}
	/**
	* After `<`, at protocol or atext.
	*
	* ```markdown
	* > | a<https://example.com>b
	*       ^
	* > | a<user@example.com>b
	*       ^
	* ```
	*
	* @type {State}
	*/
	function open(code) {
		if (asciiAlpha(code)) {
			effects.consume(code);
			return schemeOrEmailAtext;
		}
		return emailAtext(code);
	}
	/**
	* At second byte of protocol or atext.
	*
	* ```markdown
	* > | a<https://example.com>b
	*        ^
	* > | a<user@example.com>b
	*        ^
	* ```
	*
	* @type {State}
	*/
	function schemeOrEmailAtext(code) {
		if (code === 43 || code === 45 || code === 46 || asciiAlphanumeric(code)) {
			size = 1;
			return schemeInsideOrEmailAtext(code);
		}
		return emailAtext(code);
	}
	/**
	* In ambiguous protocol or atext.
	*
	* ```markdown
	* > | a<https://example.com>b
	*        ^
	* > | a<user@example.com>b
	*        ^
	* ```
	*
	* @type {State}
	*/
	function schemeInsideOrEmailAtext(code) {
		if (code === 58) {
			effects.consume(code);
			size = 0;
			return urlInside;
		}
		if ((code === 43 || code === 45 || code === 46 || asciiAlphanumeric(code)) && size++ < 32) {
			effects.consume(code);
			return schemeInsideOrEmailAtext;
		}
		size = 0;
		return emailAtext(code);
	}
	/**
	* After protocol, in URL.
	*
	* ```markdown
	* > | a<https://example.com>b
	*             ^
	* ```
	*
	* @type {State}
	*/
	function urlInside(code) {
		if (code === 62) {
			effects.exit("autolinkProtocol");
			effects.enter("autolinkMarker");
			effects.consume(code);
			effects.exit("autolinkMarker");
			effects.exit("autolink");
			return ok;
		}
		if (code === null || code === 32 || code === 60 || asciiControl(code)) return nok(code);
		effects.consume(code);
		return urlInside;
	}
	/**
	* In email atext.
	*
	* ```markdown
	* > | a<user.name@example.com>b
	*              ^
	* ```
	*
	* @type {State}
	*/
	function emailAtext(code) {
		if (code === 64) {
			effects.consume(code);
			return emailAtSignOrDot;
		}
		if (asciiAtext(code)) {
			effects.consume(code);
			return emailAtext;
		}
		return nok(code);
	}
	/**
	* In label, after at-sign or dot.
	*
	* ```markdown
	* > | a<user.name@example.com>b
	*                 ^       ^
	* ```
	*
	* @type {State}
	*/
	function emailAtSignOrDot(code) {
		return asciiAlphanumeric(code) ? emailLabel(code) : nok(code);
	}
	/**
	* In label, where `.` and `>` are allowed.
	*
	* ```markdown
	* > | a<user.name@example.com>b
	*                   ^
	* ```
	*
	* @type {State}
	*/
	function emailLabel(code) {
		if (code === 46) {
			effects.consume(code);
			size = 0;
			return emailAtSignOrDot;
		}
		if (code === 62) {
			effects.exit("autolinkProtocol").type = "autolinkEmail";
			effects.enter("autolinkMarker");
			effects.consume(code);
			effects.exit("autolinkMarker");
			effects.exit("autolink");
			return ok;
		}
		return emailValue(code);
	}
	/**
	* In label, where `.` and `>` are *not* allowed.
	*
	* Though, this is also used in `emailLabel` to parse other values.
	*
	* ```markdown
	* > | a<user.name@ex-ample.com>b
	*                    ^
	* ```
	*
	* @type {State}
	*/
	function emailValue(code) {
		if ((code === 45 || asciiAlphanumeric(code)) && size++ < 63) {
			const next = code === 45 ? emailValue : emailLabel;
			effects.consume(code);
			return next;
		}
		return nok(code);
	}
}
var autolink;
var init_autolink = __esmMin((() => {
	init_micromark_util_character();
	autolink = {
		name: "autolink",
		tokenize: tokenizeAutolink
	};
}));
//#endregion
//#region ../../node_modules/mermaid/node_modules/micromark-core-commonmark/lib/blank-line.js
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeBlankLine(effects, ok, nok) {
	return start;
	/**
	* Start of blank line.
	*
	* > 👉 **Note**: `␠` represents a space character.
	*
	* ```markdown
	* > | ␠␠␊
	*     ^
	* > | ␊
	*     ^
	* ```
	*
	* @type {State}
	*/
	function start(code) {
		return markdownSpace(code) ? factorySpace(effects, after, "linePrefix")(code) : after(code);
	}
	/**
	* At eof/eol, after optional whitespace.
	*
	* > 👉 **Note**: `␠` represents a space character.
	*
	* ```markdown
	* > | ␠␠␊
	*       ^
	* > | ␊
	*     ^
	* ```
	*
	* @type {State}
	*/
	function after(code) {
		return code === null || markdownLineEnding(code) ? ok(code) : nok(code);
	}
}
var blankLine;
var init_blank_line = __esmMin((() => {
	init_micromark_factory_space();
	init_micromark_util_character();
	blankLine = {
		tokenize: tokenizeBlankLine,
		partial: true
	};
}));
//#endregion
//#region ../../node_modules/mermaid/node_modules/micromark-core-commonmark/lib/block-quote.js
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeBlockQuoteStart(effects, ok, nok) {
	const self = this;
	return start;
	/**
	* Start of block quote.
	*
	* ```markdown
	* > | > a
	*     ^
	* ```
	*
	* @type {State}
	*/
	function start(code) {
		if (code === 62) {
			const state = self.containerState;
			if (!state.open) {
				effects.enter("blockQuote", { _container: true });
				state.open = true;
			}
			effects.enter("blockQuotePrefix");
			effects.enter("blockQuoteMarker");
			effects.consume(code);
			effects.exit("blockQuoteMarker");
			return after;
		}
		return nok(code);
	}
	/**
	* After `>`, before optional whitespace.
	*
	* ```markdown
	* > | > a
	*      ^
	* ```
	*
	* @type {State}
	*/
	function after(code) {
		if (markdownSpace(code)) {
			effects.enter("blockQuotePrefixWhitespace");
			effects.consume(code);
			effects.exit("blockQuotePrefixWhitespace");
			effects.exit("blockQuotePrefix");
			return ok;
		}
		effects.exit("blockQuotePrefix");
		return ok(code);
	}
}
/**
* Start of block quote continuation.
*
* ```markdown
*   | > a
* > | > b
*     ^
* ```
*
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeBlockQuoteContinuation(effects, ok, nok) {
	const self = this;
	return contStart;
	/**
	* Start of block quote continuation.
	*
	* Also used to parse the first block quote opening.
	*
	* ```markdown
	*   | > a
	* > | > b
	*     ^
	* ```
	*
	* @type {State}
	*/
	function contStart(code) {
		if (markdownSpace(code)) return factorySpace(effects, contBefore, "linePrefix", self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code);
		return contBefore(code);
	}
	/**
	* At `>`, after optional whitespace.
	*
	* Also used to parse the first block quote opening.
	*
	* ```markdown
	*   | > a
	* > | > b
	*     ^
	* ```
	*
	* @type {State}
	*/
	function contBefore(code) {
		return effects.attempt(blockQuote, ok, nok)(code);
	}
}
/** @type {Exiter} */
function exit(effects) {
	effects.exit("blockQuote");
}
var blockQuote;
var init_block_quote = __esmMin((() => {
	init_micromark_factory_space();
	init_micromark_util_character();
	blockQuote = {
		name: "blockQuote",
		tokenize: tokenizeBlockQuoteStart,
		continuation: { tokenize: tokenizeBlockQuoteContinuation },
		exit
	};
}));
//#endregion
//#region ../../node_modules/mermaid/node_modules/micromark-core-commonmark/lib/character-escape.js
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeCharacterEscape(effects, ok, nok) {
	return start;
	/**
	* Start of character escape.
	*
	* ```markdown
	* > | a\*b
	*      ^
	* ```
	*
	* @type {State}
	*/
	function start(code) {
		effects.enter("characterEscape");
		effects.enter("escapeMarker");
		effects.consume(code);
		effects.exit("escapeMarker");
		return inside;
	}
	/**
	* After `\`, at punctuation.
	*
	* ```markdown
	* > | a\*b
	*       ^
	* ```
	*
	* @type {State}
	*/
	function inside(code) {
		if (asciiPunctuation(code)) {
			effects.enter("characterEscapeValue");
			effects.consume(code);
			effects.exit("characterEscapeValue");
			effects.exit("characterEscape");
			return ok;
		}
		return nok(code);
	}
}
var characterEscape;
var init_character_escape = __esmMin((() => {
	init_micromark_util_character();
	characterEscape = {
		name: "characterEscape",
		tokenize: tokenizeCharacterEscape
	};
}));
//#endregion
//#region ../../node_modules/mermaid/node_modules/micromark-core-commonmark/lib/character-reference.js
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeCharacterReference(effects, ok, nok) {
	const self = this;
	let size = 0;
	/** @type {number} */
	let max;
	/** @type {(code: Code) => boolean} */
	let test;
	return start;
	/**
	* Start of character reference.
	*
	* ```markdown
	* > | a&amp;b
	*      ^
	* > | a&#123;b
	*      ^
	* > | a&#x9;b
	*      ^
	* ```
	*
	* @type {State}
	*/
	function start(code) {
		effects.enter("characterReference");
		effects.enter("characterReferenceMarker");
		effects.consume(code);
		effects.exit("characterReferenceMarker");
		return open;
	}
	/**
	* After `&`, at `#` for numeric references or alphanumeric for named
	* references.
	*
	* ```markdown
	* > | a&amp;b
	*       ^
	* > | a&#123;b
	*       ^
	* > | a&#x9;b
	*       ^
	* ```
	*
	* @type {State}
	*/
	function open(code) {
		if (code === 35) {
			effects.enter("characterReferenceMarkerNumeric");
			effects.consume(code);
			effects.exit("characterReferenceMarkerNumeric");
			return numeric;
		}
		effects.enter("characterReferenceValue");
		max = 31;
		test = asciiAlphanumeric;
		return value(code);
	}
	/**
	* After `#`, at `x` for hexadecimals or digit for decimals.
	*
	* ```markdown
	* > | a&#123;b
	*        ^
	* > | a&#x9;b
	*        ^
	* ```
	*
	* @type {State}
	*/
	function numeric(code) {
		if (code === 88 || code === 120) {
			effects.enter("characterReferenceMarkerHexadecimal");
			effects.consume(code);
			effects.exit("characterReferenceMarkerHexadecimal");
			effects.enter("characterReferenceValue");
			max = 6;
			test = asciiHexDigit;
			return value;
		}
		effects.enter("characterReferenceValue");
		max = 7;
		test = asciiDigit;
		return value(code);
	}
	/**
	* After markers (`&#x`, `&#`, or `&`), in value, before `;`.
	*
	* The character reference kind defines what and how many characters are
	* allowed.
	*
	* ```markdown
	* > | a&amp;b
	*       ^^^
	* > | a&#123;b
	*        ^^^
	* > | a&#x9;b
	*         ^
	* ```
	*
	* @type {State}
	*/
	function value(code) {
		if (code === 59 && size) {
			const token = effects.exit("characterReferenceValue");
			if (test === asciiAlphanumeric && !decodeNamedCharacterReference(self.sliceSerialize(token))) return nok(code);
			effects.enter("characterReferenceMarker");
			effects.consume(code);
			effects.exit("characterReferenceMarker");
			effects.exit("characterReference");
			return ok;
		}
		if (test(code) && size++ < max) {
			effects.consume(code);
			return value;
		}
		return nok(code);
	}
}
var characterReference;
var init_character_reference = __esmMin((() => {
	init_index_dom();
	init_micromark_util_character();
	characterReference = {
		name: "characterReference",
		tokenize: tokenizeCharacterReference
	};
}));
//#endregion
//#region ../../node_modules/mermaid/node_modules/micromark-core-commonmark/lib/code-fenced.js
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeCodeFenced(effects, ok, nok) {
	const self = this;
	/** @type {Construct} */
	const closeStart = {
		tokenize: tokenizeCloseStart,
		partial: true
	};
	let initialPrefix = 0;
	let sizeOpen = 0;
	/** @type {NonNullable<Code>} */
	let marker;
	return start;
	/**
	* Start of code.
	*
	* ```markdown
	* > | ~~~js
	*     ^
	*   | alert(1)
	*   | ~~~
	* ```
	*
	* @type {State}
	*/
	function start(code) {
		return beforeSequenceOpen(code);
	}
	/**
	* In opening fence, after prefix, at sequence.
	*
	* ```markdown
	* > | ~~~js
	*     ^
	*   | alert(1)
	*   | ~~~
	* ```
	*
	* @type {State}
	*/
	function beforeSequenceOpen(code) {
		const tail = self.events[self.events.length - 1];
		initialPrefix = tail && tail[1].type === "linePrefix" ? tail[2].sliceSerialize(tail[1], true).length : 0;
		marker = code;
		effects.enter("codeFenced");
		effects.enter("codeFencedFence");
		effects.enter("codeFencedFenceSequence");
		return sequenceOpen(code);
	}
	/**
	* In opening fence sequence.
	*
	* ```markdown
	* > | ~~~js
	*      ^
	*   | alert(1)
	*   | ~~~
	* ```
	*
	* @type {State}
	*/
	function sequenceOpen(code) {
		if (code === marker) {
			sizeOpen++;
			effects.consume(code);
			return sequenceOpen;
		}
		if (sizeOpen < 3) return nok(code);
		effects.exit("codeFencedFenceSequence");
		return markdownSpace(code) ? factorySpace(effects, infoBefore, "whitespace")(code) : infoBefore(code);
	}
	/**
	* In opening fence, after the sequence (and optional whitespace), before info.
	*
	* ```markdown
	* > | ~~~js
	*        ^
	*   | alert(1)
	*   | ~~~
	* ```
	*
	* @type {State}
	*/
	function infoBefore(code) {
		if (code === null || markdownLineEnding(code)) {
			effects.exit("codeFencedFence");
			return self.interrupt ? ok(code) : effects.check(nonLazyContinuation, atNonLazyBreak, after)(code);
		}
		effects.enter("codeFencedFenceInfo");
		effects.enter("chunkString", { contentType: "string" });
		return info(code);
	}
	/**
	* In info.
	*
	* ```markdown
	* > | ~~~js
	*        ^
	*   | alert(1)
	*   | ~~~
	* ```
	*
	* @type {State}
	*/
	function info(code) {
		if (code === null || markdownLineEnding(code)) {
			effects.exit("chunkString");
			effects.exit("codeFencedFenceInfo");
			return infoBefore(code);
		}
		if (markdownSpace(code)) {
			effects.exit("chunkString");
			effects.exit("codeFencedFenceInfo");
			return factorySpace(effects, metaBefore, "whitespace")(code);
		}
		if (code === 96 && code === marker) return nok(code);
		effects.consume(code);
		return info;
	}
	/**
	* In opening fence, after info and whitespace, before meta.
	*
	* ```markdown
	* > | ~~~js eval
	*           ^
	*   | alert(1)
	*   | ~~~
	* ```
	*
	* @type {State}
	*/
	function metaBefore(code) {
		if (code === null || markdownLineEnding(code)) return infoBefore(code);
		effects.enter("codeFencedFenceMeta");
		effects.enter("chunkString", { contentType: "string" });
		return meta(code);
	}
	/**
	* In meta.
	*
	* ```markdown
	* > | ~~~js eval
	*           ^
	*   | alert(1)
	*   | ~~~
	* ```
	*
	* @type {State}
	*/
	function meta(code) {
		if (code === null || markdownLineEnding(code)) {
			effects.exit("chunkString");
			effects.exit("codeFencedFenceMeta");
			return infoBefore(code);
		}
		if (code === 96 && code === marker) return nok(code);
		effects.consume(code);
		return meta;
	}
	/**
	* At eol/eof in code, before a non-lazy closing fence or content.
	*
	* ```markdown
	* > | ~~~js
	*          ^
	* > | alert(1)
	*             ^
	*   | ~~~
	* ```
	*
	* @type {State}
	*/
	function atNonLazyBreak(code) {
		return effects.attempt(closeStart, after, contentBefore)(code);
	}
	/**
	* Before code content, not a closing fence, at eol.
	*
	* ```markdown
	*   | ~~~js
	* > | alert(1)
	*             ^
	*   | ~~~
	* ```
	*
	* @type {State}
	*/
	function contentBefore(code) {
		effects.enter("lineEnding");
		effects.consume(code);
		effects.exit("lineEnding");
		return contentStart;
	}
	/**
	* Before code content, not a closing fence.
	*
	* ```markdown
	*   | ~~~js
	* > | alert(1)
	*     ^
	*   | ~~~
	* ```
	*
	* @type {State}
	*/
	function contentStart(code) {
		return initialPrefix > 0 && markdownSpace(code) ? factorySpace(effects, beforeContentChunk, "linePrefix", initialPrefix + 1)(code) : beforeContentChunk(code);
	}
	/**
	* Before code content, after optional prefix.
	*
	* ```markdown
	*   | ~~~js
	* > | alert(1)
	*     ^
	*   | ~~~
	* ```
	*
	* @type {State}
	*/
	function beforeContentChunk(code) {
		if (code === null || markdownLineEnding(code)) return effects.check(nonLazyContinuation, atNonLazyBreak, after)(code);
		effects.enter("codeFlowValue");
		return contentChunk(code);
	}
	/**
	* In code content.
	*
	* ```markdown
	*   | ~~~js
	* > | alert(1)
	*     ^^^^^^^^
	*   | ~~~
	* ```
	*
	* @type {State}
	*/
	function contentChunk(code) {
		if (code === null || markdownLineEnding(code)) {
			effects.exit("codeFlowValue");
			return beforeContentChunk(code);
		}
		effects.consume(code);
		return contentChunk;
	}
	/**
	* After code.
	*
	* ```markdown
	*   | ~~~js
	*   | alert(1)
	* > | ~~~
	*        ^
	* ```
	*
	* @type {State}
	*/
	function after(code) {
		effects.exit("codeFenced");
		return ok(code);
	}
	/**
	* @this {TokenizeContext}
	* @type {Tokenizer}
	*/
	function tokenizeCloseStart(effects, ok, nok) {
		let size = 0;
		return startBefore;
		/**
		*
		*
		* @type {State}
		*/
		function startBefore(code) {
			effects.enter("lineEnding");
			effects.consume(code);
			effects.exit("lineEnding");
			return start;
		}
		/**
		* Before closing fence, at optional whitespace.
		*
		* ```markdown
		*   | ~~~js
		*   | alert(1)
		* > | ~~~
		*     ^
		* ```
		*
		* @type {State}
		*/
		function start(code) {
			effects.enter("codeFencedFence");
			return markdownSpace(code) ? factorySpace(effects, beforeSequenceClose, "linePrefix", self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code) : beforeSequenceClose(code);
		}
		/**
		* In closing fence, after optional whitespace, at sequence.
		*
		* ```markdown
		*   | ~~~js
		*   | alert(1)
		* > | ~~~
		*     ^
		* ```
		*
		* @type {State}
		*/
		function beforeSequenceClose(code) {
			if (code === marker) {
				effects.enter("codeFencedFenceSequence");
				return sequenceClose(code);
			}
			return nok(code);
		}
		/**
		* In closing fence sequence.
		*
		* ```markdown
		*   | ~~~js
		*   | alert(1)
		* > | ~~~
		*     ^
		* ```
		*
		* @type {State}
		*/
		function sequenceClose(code) {
			if (code === marker) {
				size++;
				effects.consume(code);
				return sequenceClose;
			}
			if (size >= sizeOpen) {
				effects.exit("codeFencedFenceSequence");
				return markdownSpace(code) ? factorySpace(effects, sequenceCloseAfter, "whitespace")(code) : sequenceCloseAfter(code);
			}
			return nok(code);
		}
		/**
		* After closing fence sequence, after optional whitespace.
		*
		* ```markdown
		*   | ~~~js
		*   | alert(1)
		* > | ~~~
		*        ^
		* ```
		*
		* @type {State}
		*/
		function sequenceCloseAfter(code) {
			if (code === null || markdownLineEnding(code)) {
				effects.exit("codeFencedFence");
				return ok(code);
			}
			return nok(code);
		}
	}
}
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeNonLazyContinuation(effects, ok, nok) {
	const self = this;
	return start;
	/**
	*
	*
	* @type {State}
	*/
	function start(code) {
		if (code === null) return nok(code);
		effects.enter("lineEnding");
		effects.consume(code);
		effects.exit("lineEnding");
		return lineStart;
	}
	/**
	*
	*
	* @type {State}
	*/
	function lineStart(code) {
		return self.parser.lazy[self.now().line] ? nok(code) : ok(code);
	}
}
var nonLazyContinuation, codeFenced;
var init_code_fenced = __esmMin((() => {
	init_micromark_factory_space();
	init_micromark_util_character();
	nonLazyContinuation = {
		tokenize: tokenizeNonLazyContinuation,
		partial: true
	};
	codeFenced = {
		name: "codeFenced",
		tokenize: tokenizeCodeFenced,
		concrete: true
	};
}));
//#endregion
//#region ../../node_modules/mermaid/node_modules/micromark-core-commonmark/lib/code-indented.js
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeCodeIndented(effects, ok, nok) {
	const self = this;
	return start;
	/**
	* Start of code (indented).
	*
	* > **Parsing note**: it is not needed to check if this first line is a
	* > filled line (that it has a non-whitespace character), because blank lines
	* > are parsed already, so we never run into that.
	*
	* ```markdown
	* > |     aaa
	*     ^
	* ```
	*
	* @type {State}
	*/
	function start(code) {
		effects.enter("codeIndented");
		return factorySpace(effects, afterPrefix, "linePrefix", 5)(code);
	}
	/**
	* At start, after 1 or 4 spaces.
	*
	* ```markdown
	* > |     aaa
	*         ^
	* ```
	*
	* @type {State}
	*/
	function afterPrefix(code) {
		const tail = self.events[self.events.length - 1];
		return tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4 ? atBreak(code) : nok(code);
	}
	/**
	* At a break.
	*
	* ```markdown
	* > |     aaa
	*         ^  ^
	* ```
	*
	* @type {State}
	*/
	function atBreak(code) {
		if (code === null) return after(code);
		if (markdownLineEnding(code)) return effects.attempt(furtherStart, atBreak, after)(code);
		effects.enter("codeFlowValue");
		return inside(code);
	}
	/**
	* In code content.
	*
	* ```markdown
	* > |     aaa
	*         ^^^^
	* ```
	*
	* @type {State}
	*/
	function inside(code) {
		if (code === null || markdownLineEnding(code)) {
			effects.exit("codeFlowValue");
			return atBreak(code);
		}
		effects.consume(code);
		return inside;
	}
	/** @type {State} */
	function after(code) {
		effects.exit("codeIndented");
		return ok(code);
	}
}
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeFurtherStart(effects, ok, nok) {
	const self = this;
	return furtherStart;
	/**
	* At eol, trying to parse another indent.
	*
	* ```markdown
	* > |     aaa
	*            ^
	*   |     bbb
	* ```
	*
	* @type {State}
	*/
	function furtherStart(code) {
		if (self.parser.lazy[self.now().line]) return nok(code);
		if (markdownLineEnding(code)) {
			effects.enter("lineEnding");
			effects.consume(code);
			effects.exit("lineEnding");
			return furtherStart;
		}
		return factorySpace(effects, afterPrefix, "linePrefix", 5)(code);
	}
	/**
	* At start, after 1 or 4 spaces.
	*
	* ```markdown
	* > |     aaa
	*         ^
	* ```
	*
	* @type {State}
	*/
	function afterPrefix(code) {
		const tail = self.events[self.events.length - 1];
		return tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4 ? ok(code) : markdownLineEnding(code) ? furtherStart(code) : nok(code);
	}
}
var codeIndented, furtherStart;
var init_code_indented = __esmMin((() => {
	init_micromark_factory_space();
	init_micromark_util_character();
	codeIndented = {
		name: "codeIndented",
		tokenize: tokenizeCodeIndented
	};
	furtherStart = {
		tokenize: tokenizeFurtherStart,
		partial: true
	};
}));
//#endregion
//#region ../../node_modules/mermaid/node_modules/micromark-core-commonmark/lib/code-text.js
/** @type {Resolver} */
function resolveCodeText(events) {
	let tailExitIndex = events.length - 4;
	let headEnterIndex = 3;
	/** @type {number} */
	let index;
	/** @type {number | undefined} */
	let enter;
	if ((events[headEnterIndex][1].type === "lineEnding" || events[headEnterIndex][1].type === "space") && (events[tailExitIndex][1].type === "lineEnding" || events[tailExitIndex][1].type === "space")) {
		index = headEnterIndex;
		while (++index < tailExitIndex) if (events[index][1].type === "codeTextData") {
			events[headEnterIndex][1].type = "codeTextPadding";
			events[tailExitIndex][1].type = "codeTextPadding";
			headEnterIndex += 2;
			tailExitIndex -= 2;
			break;
		}
	}
	index = headEnterIndex - 1;
	tailExitIndex++;
	while (++index <= tailExitIndex) if (enter === void 0) {
		if (index !== tailExitIndex && events[index][1].type !== "lineEnding") enter = index;
	} else if (index === tailExitIndex || events[index][1].type === "lineEnding") {
		events[enter][1].type = "codeTextData";
		if (index !== enter + 2) {
			events[enter][1].end = events[index - 1][1].end;
			events.splice(enter + 2, index - enter - 2);
			tailExitIndex -= index - enter - 2;
			index = enter + 2;
		}
		enter = void 0;
	}
	return events;
}
/**
* @this {TokenizeContext}
* @type {Previous}
*/
function previous(code) {
	return code !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeCodeText(effects, ok, nok) {
	let sizeOpen = 0;
	/** @type {number} */
	let size;
	/** @type {Token} */
	let token;
	return start;
	/**
	* Start of code (text).
	*
	* ```markdown
	* > | `a`
	*     ^
	* > | \`a`
	*      ^
	* ```
	*
	* @type {State}
	*/
	function start(code) {
		effects.enter("codeText");
		effects.enter("codeTextSequence");
		return sequenceOpen(code);
	}
	/**
	* In opening sequence.
	*
	* ```markdown
	* > | `a`
	*     ^
	* ```
	*
	* @type {State}
	*/
	function sequenceOpen(code) {
		if (code === 96) {
			effects.consume(code);
			sizeOpen++;
			return sequenceOpen;
		}
		effects.exit("codeTextSequence");
		return between(code);
	}
	/**
	* Between something and something else.
	*
	* ```markdown
	* > | `a`
	*      ^^
	* ```
	*
	* @type {State}
	*/
	function between(code) {
		if (code === null) return nok(code);
		if (code === 32) {
			effects.enter("space");
			effects.consume(code);
			effects.exit("space");
			return between;
		}
		if (code === 96) {
			token = effects.enter("codeTextSequence");
			size = 0;
			return sequenceClose(code);
		}
		if (markdownLineEnding(code)) {
			effects.enter("lineEnding");
			effects.consume(code);
			effects.exit("lineEnding");
			return between;
		}
		effects.enter("codeTextData");
		return data(code);
	}
	/**
	* In data.
	*
	* ```markdown
	* > | `a`
	*      ^
	* ```
	*
	* @type {State}
	*/
	function data(code) {
		if (code === null || code === 32 || code === 96 || markdownLineEnding(code)) {
			effects.exit("codeTextData");
			return between(code);
		}
		effects.consume(code);
		return data;
	}
	/**
	* In closing sequence.
	*
	* ```markdown
	* > | `a`
	*       ^
	* ```
	*
	* @type {State}
	*/
	function sequenceClose(code) {
		if (code === 96) {
			effects.consume(code);
			size++;
			return sequenceClose;
		}
		if (size === sizeOpen) {
			effects.exit("codeTextSequence");
			effects.exit("codeText");
			return ok(code);
		}
		token.type = "codeTextData";
		return data(code);
	}
}
var codeText;
var init_code_text = __esmMin((() => {
	init_micromark_util_character();
	codeText = {
		name: "codeText",
		tokenize: tokenizeCodeText,
		resolve: resolveCodeText,
		previous
	};
}));
//#endregion
//#region ../../node_modules/mermaid/node_modules/micromark-core-commonmark/lib/content.js
/**
* Content is transparent: it’s parsed right now. That way, definitions are also
* parsed right now: before text in paragraphs (specifically, media) are parsed.
*
* @type {Resolver}
*/
function resolveContent(events) {
	subtokenize(events);
	return events;
}
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeContent(effects, ok) {
	/** @type {Token | undefined} */
	let previous;
	return chunkStart;
	/**
	* Before a content chunk.
	*
	* ```markdown
	* > | abc
	*     ^
	* ```
	*
	* @type {State}
	*/
	function chunkStart(code) {
		effects.enter("content");
		previous = effects.enter("chunkContent", { contentType: "content" });
		return chunkInside(code);
	}
	/**
	* In a content chunk.
	*
	* ```markdown
	* > | abc
	*     ^^^
	* ```
	*
	* @type {State}
	*/
	function chunkInside(code) {
		if (code === null) return contentEnd(code);
		if (markdownLineEnding(code)) return effects.check(continuationConstruct, contentContinue, contentEnd)(code);
		effects.consume(code);
		return chunkInside;
	}
	/**
	*
	*
	* @type {State}
	*/
	function contentEnd(code) {
		effects.exit("chunkContent");
		effects.exit("content");
		return ok(code);
	}
	/**
	*
	*
	* @type {State}
	*/
	function contentContinue(code) {
		effects.consume(code);
		effects.exit("chunkContent");
		previous.next = effects.enter("chunkContent", {
			contentType: "content",
			previous
		});
		previous = previous.next;
		return chunkInside;
	}
}
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeContinuation(effects, ok, nok) {
	const self = this;
	return startLookahead;
	/**
	*
	*
	* @type {State}
	*/
	function startLookahead(code) {
		effects.exit("chunkContent");
		effects.enter("lineEnding");
		effects.consume(code);
		effects.exit("lineEnding");
		return factorySpace(effects, prefixed, "linePrefix");
	}
	/**
	*
	*
	* @type {State}
	*/
	function prefixed(code) {
		if (code === null || markdownLineEnding(code)) return nok(code);
		const tail = self.events[self.events.length - 1];
		if (!self.parser.constructs.disable.null.includes("codeIndented") && tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4) return ok(code);
		return effects.interrupt(self.parser.constructs.flow, nok, ok)(code);
	}
}
var content, continuationConstruct;
var init_content = __esmMin((() => {
	init_micromark_factory_space();
	init_micromark_util_character();
	init_micromark_util_subtokenize();
	content = {
		tokenize: tokenizeContent,
		resolve: resolveContent
	};
	continuationConstruct = {
		tokenize: tokenizeContinuation,
		partial: true
	};
}));
//#endregion
//#region ../../node_modules/mermaid/node_modules/micromark-factory-destination/index.js
/**
* Parse destinations.
*
* ###### Examples
*
* ```markdown
* <a>
* <a\>b>
* <a b>
* <a)>
* a
* a\)b
* a(b)c
* a(b)
* ```
*
* @param {Effects} effects
*   Context.
* @param {State} ok
*   State switched to when successful.
* @param {State} nok
*   State switched to when unsuccessful.
* @param {TokenType} type
*   Type for whole (`<a>` or `b`).
* @param {TokenType} literalType
*   Type when enclosed (`<a>`).
* @param {TokenType} literalMarkerType
*   Type for enclosing (`<` and `>`).
* @param {TokenType} rawType
*   Type when not enclosed (`b`).
* @param {TokenType} stringType
*   Type for the value (`a` or `b`).
* @param {number | undefined} [max=Infinity]
*   Depth of nested parens (inclusive).
* @returns {State}
*   Start state.
*/ function factoryDestination(effects, ok, nok, type, literalType, literalMarkerType, rawType, stringType, max) {
	const limit = max || Number.POSITIVE_INFINITY;
	let balance = 0;
	return start;
	/**
	* Start of destination.
	*
	* ```markdown
	* > | <aa>
	*     ^
	* > | aa
	*     ^
	* ```
	*
	* @type {State}
	*/
	function start(code) {
		if (code === 60) {
			effects.enter(type);
			effects.enter(literalType);
			effects.enter(literalMarkerType);
			effects.consume(code);
			effects.exit(literalMarkerType);
			return enclosedBefore;
		}
		if (code === null || code === 32 || code === 41 || asciiControl(code)) return nok(code);
		effects.enter(type);
		effects.enter(rawType);
		effects.enter(stringType);
		effects.enter("chunkString", { contentType: "string" });
		return raw(code);
	}
	/**
	* After `<`, at an enclosed destination.
	*
	* ```markdown
	* > | <aa>
	*      ^
	* ```
	*
	* @type {State}
	*/
	function enclosedBefore(code) {
		if (code === 62) {
			effects.enter(literalMarkerType);
			effects.consume(code);
			effects.exit(literalMarkerType);
			effects.exit(literalType);
			effects.exit(type);
			return ok;
		}
		effects.enter(stringType);
		effects.enter("chunkString", { contentType: "string" });
		return enclosed(code);
	}
	/**
	* In enclosed destination.
	*
	* ```markdown
	* > | <aa>
	*      ^
	* ```
	*
	* @type {State}
	*/
	function enclosed(code) {
		if (code === 62) {
			effects.exit("chunkString");
			effects.exit(stringType);
			return enclosedBefore(code);
		}
		if (code === null || code === 60 || markdownLineEnding(code)) return nok(code);
		effects.consume(code);
		return code === 92 ? enclosedEscape : enclosed;
	}
	/**
	* After `\`, at a special character.
	*
	* ```markdown
	* > | <a\*a>
	*        ^
	* ```
	*
	* @type {State}
	*/
	function enclosedEscape(code) {
		if (code === 60 || code === 62 || code === 92) {
			effects.consume(code);
			return enclosed;
		}
		return enclosed(code);
	}
	/**
	* In raw destination.
	*
	* ```markdown
	* > | aa
	*     ^
	* ```
	*
	* @type {State}
	*/
	function raw(code) {
		if (!balance && (code === null || code === 41 || markdownLineEndingOrSpace(code))) {
			effects.exit("chunkString");
			effects.exit(stringType);
			effects.exit(rawType);
			effects.exit(type);
			return ok(code);
		}
		if (balance < limit && code === 40) {
			effects.consume(code);
			balance++;
			return raw;
		}
		if (code === 41) {
			effects.consume(code);
			balance--;
			return raw;
		}
		if (code === null || code === 32 || code === 40 || asciiControl(code)) return nok(code);
		effects.consume(code);
		return code === 92 ? rawEscape : raw;
	}
	/**
	* After `\`, at special character.
	*
	* ```markdown
	* > | a\*a
	*       ^
	* ```
	*
	* @type {State}
	*/
	function rawEscape(code) {
		if (code === 40 || code === 41 || code === 92) {
			effects.consume(code);
			return raw;
		}
		return raw(code);
	}
}
var init_micromark_factory_destination = __esmMin((() => {
	init_micromark_util_character();
}));
//#endregion
//#region ../../node_modules/mermaid/node_modules/micromark-factory-label/index.js
/**
* Parse labels.
*
* > 👉 **Note**: labels in markdown are capped at 999 characters in the string.
*
* ###### Examples
*
* ```markdown
* [a]
* [a
* b]
* [a\]b]
* ```
*
* @this {TokenizeContext}
*   Tokenize context.
* @param {Effects} effects
*   Context.
* @param {State} ok
*   State switched to when successful.
* @param {State} nok
*   State switched to when unsuccessful.
* @param {TokenType} type
*   Type of the whole label (`[a]`).
* @param {TokenType} markerType
*   Type for the markers (`[` and `]`).
* @param {TokenType} stringType
*   Type for the identifier (`a`).
* @returns {State}
*   Start state.
*/ function factoryLabel(effects, ok, nok, type, markerType, stringType) {
	const self = this;
	let size = 0;
	/** @type {boolean} */
	let seen;
	return start;
	/**
	* Start of label.
	*
	* ```markdown
	* > | [a]
	*     ^
	* ```
	*
	* @type {State}
	*/
	function start(code) {
		effects.enter(type);
		effects.enter(markerType);
		effects.consume(code);
		effects.exit(markerType);
		effects.enter(stringType);
		return atBreak;
	}
	/**
	* In label, at something, before something else.
	*
	* ```markdown
	* > | [a]
	*      ^
	* ```
	*
	* @type {State}
	*/
	function atBreak(code) {
		if (size > 999 || code === null || code === 91 || code === 93 && !seen || code === 94 && !size && "_hiddenFootnoteSupport" in self.parser.constructs) return nok(code);
		if (code === 93) {
			effects.exit(stringType);
			effects.enter(markerType);
			effects.consume(code);
			effects.exit(markerType);
			effects.exit(type);
			return ok;
		}
		if (markdownLineEnding(code)) {
			effects.enter("lineEnding");
			effects.consume(code);
			effects.exit("lineEnding");
			return atBreak;
		}
		effects.enter("chunkString", { contentType: "string" });
		return labelInside(code);
	}
	/**
	* In label, in text.
	*
	* ```markdown
	* > | [a]
	*      ^
	* ```
	*
	* @type {State}
	*/
	function labelInside(code) {
		if (code === null || code === 91 || code === 93 || markdownLineEnding(code) || size++ > 999) {
			effects.exit("chunkString");
			return atBreak(code);
		}
		effects.consume(code);
		if (!seen) seen = !markdownSpace(code);
		return code === 92 ? labelEscape : labelInside;
	}
	/**
	* After `\`, at a special character.
	*
	* ```markdown
	* > | [a\*a]
	*        ^
	* ```
	*
	* @type {State}
	*/
	function labelEscape(code) {
		if (code === 91 || code === 92 || code === 93) {
			effects.consume(code);
			size++;
			return labelInside;
		}
		return labelInside(code);
	}
}
var init_micromark_factory_label = __esmMin((() => {
	init_micromark_util_character();
}));
//#endregion
//#region ../../node_modules/mermaid/node_modules/micromark-factory-title/index.js
/**
* Parse titles.
*
* ###### Examples
*
* ```markdown
* "a"
* 'b'
* (c)
* "a
* b"
* 'a
*     b'
* (a\)b)
* ```
*
* @param {Effects} effects
*   Context.
* @param {State} ok
*   State switched to when successful.
* @param {State} nok
*   State switched to when unsuccessful.
* @param {TokenType} type
*   Type of the whole title (`"a"`, `'b'`, `(c)`).
* @param {TokenType} markerType
*   Type for the markers (`"`, `'`, `(`, and `)`).
* @param {TokenType} stringType
*   Type for the value (`a`).
* @returns {State}
*   Start state.
*/ function factoryTitle(effects, ok, nok, type, markerType, stringType) {
	/** @type {NonNullable<Code>} */
	let marker;
	return start;
	/**
	* Start of title.
	*
	* ```markdown
	* > | "a"
	*     ^
	* ```
	*
	* @type {State}
	*/
	function start(code) {
		if (code === 34 || code === 39 || code === 40) {
			effects.enter(type);
			effects.enter(markerType);
			effects.consume(code);
			effects.exit(markerType);
			marker = code === 40 ? 41 : code;
			return begin;
		}
		return nok(code);
	}
	/**
	* After opening marker.
	*
	* This is also used at the closing marker.
	*
	* ```markdown
	* > | "a"
	*      ^
	* ```
	*
	* @type {State}
	*/
	function begin(code) {
		if (code === marker) {
			effects.enter(markerType);
			effects.consume(code);
			effects.exit(markerType);
			effects.exit(type);
			return ok;
		}
		effects.enter(stringType);
		return atBreak(code);
	}
	/**
	* At something, before something else.
	*
	* ```markdown
	* > | "a"
	*      ^
	* ```
	*
	* @type {State}
	*/
	function atBreak(code) {
		if (code === marker) {
			effects.exit(stringType);
			return begin(marker);
		}
		if (code === null) return nok(code);
		if (markdownLineEnding(code)) {
			effects.enter("lineEnding");
			effects.consume(code);
			effects.exit("lineEnding");
			return factorySpace(effects, atBreak, "linePrefix");
		}
		effects.enter("chunkString", { contentType: "string" });
		return inside(code);
	}
	/**
	*
	*
	* @type {State}
	*/
	function inside(code) {
		if (code === marker || code === null || markdownLineEnding(code)) {
			effects.exit("chunkString");
			return atBreak(code);
		}
		effects.consume(code);
		return code === 92 ? escape : inside;
	}
	/**
	* After `\`, at a special character.
	*
	* ```markdown
	* > | "a\*b"
	*      ^
	* ```
	*
	* @type {State}
	*/
	function escape(code) {
		if (code === marker || code === 92) {
			effects.consume(code);
			return inside;
		}
		return inside(code);
	}
}
var init_micromark_factory_title = __esmMin((() => {
	init_micromark_factory_space();
	init_micromark_util_character();
}));
//#endregion
//#region ../../node_modules/mermaid/node_modules/micromark-factory-whitespace/index.js
/**
* Parse spaces and tabs.
*
* There is no `nok` parameter:
*
* *   line endings or spaces in markdown are often optional, in which case this
*     factory can be used and `ok` will be switched to whether spaces were found
*     or not
* *   one line ending or space can be detected with
*     `markdownLineEndingOrSpace(code)` right before using `factoryWhitespace`
*
* @param {Effects} effects
*   Context.
* @param {State} ok
*   State switched to when successful.
* @returns
*   Start state.
*/
function factoryWhitespace(effects, ok) {
	/** @type {boolean} */
	let seen;
	return start;
	/** @type {State} */
	function start(code) {
		if (markdownLineEnding(code)) {
			effects.enter("lineEnding");
			effects.consume(code);
			effects.exit("lineEnding");
			seen = true;
			return start;
		}
		if (markdownSpace(code)) return factorySpace(effects, start, seen ? "linePrefix" : "lineSuffix")(code);
		return ok(code);
	}
}
var init_micromark_factory_whitespace = __esmMin((() => {
	init_micromark_factory_space();
	init_micromark_util_character();
}));
//#endregion
//#region ../../node_modules/mermaid/node_modules/micromark-core-commonmark/lib/definition.js
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeDefinition(effects, ok, nok) {
	const self = this;
	/** @type {string} */
	let identifier;
	return start;
	/**
	* At start of a definition.
	*
	* ```markdown
	* > | [a]: b "c"
	*     ^
	* ```
	*
	* @type {State}
	*/
	function start(code) {
		effects.enter("definition");
		return before(code);
	}
	/**
	* After optional whitespace, at `[`.
	*
	* ```markdown
	* > | [a]: b "c"
	*     ^
	* ```
	*
	* @type {State}
	*/
	function before(code) {
		return factoryLabel.call(self, effects, labelAfter, nok, "definitionLabel", "definitionLabelMarker", "definitionLabelString")(code);
	}
	/**
	* After label.
	*
	* ```markdown
	* > | [a]: b "c"
	*        ^
	* ```
	*
	* @type {State}
	*/
	function labelAfter(code) {
		identifier = normalizeIdentifier(self.sliceSerialize(self.events[self.events.length - 1][1]).slice(1, -1));
		if (code === 58) {
			effects.enter("definitionMarker");
			effects.consume(code);
			effects.exit("definitionMarker");
			return markerAfter;
		}
		return nok(code);
	}
	/**
	* After marker.
	*
	* ```markdown
	* > | [a]: b "c"
	*         ^
	* ```
	*
	* @type {State}
	*/
	function markerAfter(code) {
		return markdownLineEndingOrSpace(code) ? factoryWhitespace(effects, destinationBefore)(code) : destinationBefore(code);
	}
	/**
	* Before destination.
	*
	* ```markdown
	* > | [a]: b "c"
	*          ^
	* ```
	*
	* @type {State}
	*/
	function destinationBefore(code) {
		return factoryDestination(effects, destinationAfter, nok, "definitionDestination", "definitionDestinationLiteral", "definitionDestinationLiteralMarker", "definitionDestinationRaw", "definitionDestinationString")(code);
	}
	/**
	* After destination.
	*
	* ```markdown
	* > | [a]: b "c"
	*           ^
	* ```
	*
	* @type {State}
	*/
	function destinationAfter(code) {
		return effects.attempt(titleBefore, after, after)(code);
	}
	/**
	* After definition.
	*
	* ```markdown
	* > | [a]: b
	*           ^
	* > | [a]: b "c"
	*               ^
	* ```
	*
	* @type {State}
	*/
	function after(code) {
		return markdownSpace(code) ? factorySpace(effects, afterWhitespace, "whitespace")(code) : afterWhitespace(code);
	}
	/**
	* After definition, after optional whitespace.
	*
	* ```markdown
	* > | [a]: b
	*           ^
	* > | [a]: b "c"
	*               ^
	* ```
	*
	* @type {State}
	*/
	function afterWhitespace(code) {
		if (code === null || markdownLineEnding(code)) {
			effects.exit("definition");
			self.parser.defined.push(identifier);
			return ok(code);
		}
		return nok(code);
	}
}
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeTitleBefore(effects, ok, nok) {
	return titleBefore;
	/**
	* After destination, at whitespace.
	*
	* ```markdown
	* > | [a]: b
	*           ^
	* > | [a]: b "c"
	*           ^
	* ```
	*
	* @type {State}
	*/
	function titleBefore(code) {
		return markdownLineEndingOrSpace(code) ? factoryWhitespace(effects, beforeMarker)(code) : nok(code);
	}
	/**
	* At title.
	*
	* ```markdown
	*   | [a]: b
	* > | "c"
	*     ^
	* ```
	*
	* @type {State}
	*/
	function beforeMarker(code) {
		return factoryTitle(effects, titleAfter, nok, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(code);
	}
	/**
	* After title.
	*
	* ```markdown
	* > | [a]: b "c"
	*               ^
	* ```
	*
	* @type {State}
	*/
	function titleAfter(code) {
		return markdownSpace(code) ? factorySpace(effects, titleAfterOptionalWhitespace, "whitespace")(code) : titleAfterOptionalWhitespace(code);
	}
	/**
	* After title, after optional whitespace.
	*
	* ```markdown
	* > | [a]: b "c"
	*               ^
	* ```
	*
	* @type {State}
	*/
	function titleAfterOptionalWhitespace(code) {
		return code === null || markdownLineEnding(code) ? ok(code) : nok(code);
	}
}
var definition, titleBefore;
var init_definition = __esmMin((() => {
	init_micromark_factory_destination();
	init_micromark_factory_label();
	init_micromark_factory_space();
	init_micromark_factory_title();
	init_micromark_factory_whitespace();
	init_micromark_util_character();
	init_micromark_util_normalize_identifier();
	definition = {
		name: "definition",
		tokenize: tokenizeDefinition
	};
	titleBefore = {
		tokenize: tokenizeTitleBefore,
		partial: true
	};
}));
//#endregion
//#region ../../node_modules/mermaid/node_modules/micromark-core-commonmark/lib/hard-break-escape.js
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeHardBreakEscape(effects, ok, nok) {
	return start;
	/**
	* Start of a hard break (escape).
	*
	* ```markdown
	* > | a\
	*      ^
	*   | b
	* ```
	*
	* @type {State}
	*/
	function start(code) {
		effects.enter("hardBreakEscape");
		effects.consume(code);
		return after;
	}
	/**
	* After `\`, at eol.
	*
	* ```markdown
	* > | a\
	*       ^
	*   | b
	* ```
	*
	*  @type {State}
	*/
	function after(code) {
		if (markdownLineEnding(code)) {
			effects.exit("hardBreakEscape");
			return ok(code);
		}
		return nok(code);
	}
}
var hardBreakEscape;
var init_hard_break_escape = __esmMin((() => {
	init_micromark_util_character();
	hardBreakEscape = {
		name: "hardBreakEscape",
		tokenize: tokenizeHardBreakEscape
	};
}));
//#endregion
//#region ../../node_modules/mermaid/node_modules/micromark-core-commonmark/lib/heading-atx.js
/** @type {Resolver} */
function resolveHeadingAtx(events, context) {
	let contentEnd = events.length - 2;
	let contentStart = 3;
	/** @type {Token} */
	let content;
	/** @type {Token} */
	let text;
	if (events[contentStart][1].type === "whitespace") contentStart += 2;
	if (contentEnd - 2 > contentStart && events[contentEnd][1].type === "whitespace") contentEnd -= 2;
	if (events[contentEnd][1].type === "atxHeadingSequence" && (contentStart === contentEnd - 1 || contentEnd - 4 > contentStart && events[contentEnd - 2][1].type === "whitespace")) contentEnd -= contentStart + 1 === contentEnd ? 2 : 4;
	if (contentEnd > contentStart) {
		content = {
			type: "atxHeadingText",
			start: events[contentStart][1].start,
			end: events[contentEnd][1].end
		};
		text = {
			type: "chunkText",
			start: events[contentStart][1].start,
			end: events[contentEnd][1].end,
			contentType: "text"
		};
		splice(events, contentStart, contentEnd - contentStart + 1, [
			[
				"enter",
				content,
				context
			],
			[
				"enter",
				text,
				context
			],
			[
				"exit",
				text,
				context
			],
			[
				"exit",
				content,
				context
			]
		]);
	}
	return events;
}
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeHeadingAtx(effects, ok, nok) {
	let size = 0;
	return start;
	/**
	* Start of a heading (atx).
	*
	* ```markdown
	* > | ## aa
	*     ^
	* ```
	*
	* @type {State}
	*/
	function start(code) {
		effects.enter("atxHeading");
		return before(code);
	}
	/**
	* After optional whitespace, at `#`.
	*
	* ```markdown
	* > | ## aa
	*     ^
	* ```
	*
	* @type {State}
	*/
	function before(code) {
		effects.enter("atxHeadingSequence");
		return sequenceOpen(code);
	}
	/**
	* In opening sequence.
	*
	* ```markdown
	* > | ## aa
	*     ^
	* ```
	*
	* @type {State}
	*/
	function sequenceOpen(code) {
		if (code === 35 && size++ < 6) {
			effects.consume(code);
			return sequenceOpen;
		}
		if (code === null || markdownLineEndingOrSpace(code)) {
			effects.exit("atxHeadingSequence");
			return atBreak(code);
		}
		return nok(code);
	}
	/**
	* After something, before something else.
	*
	* ```markdown
	* > | ## aa
	*       ^
	* ```
	*
	* @type {State}
	*/
	function atBreak(code) {
		if (code === 35) {
			effects.enter("atxHeadingSequence");
			return sequenceFurther(code);
		}
		if (code === null || markdownLineEnding(code)) {
			effects.exit("atxHeading");
			return ok(code);
		}
		if (markdownSpace(code)) return factorySpace(effects, atBreak, "whitespace")(code);
		effects.enter("atxHeadingText");
		return data(code);
	}
	/**
	* In further sequence (after whitespace).
	*
	* Could be normal “visible” hashes in the heading or a final sequence.
	*
	* ```markdown
	* > | ## aa ##
	*           ^
	* ```
	*
	* @type {State}
	*/
	function sequenceFurther(code) {
		if (code === 35) {
			effects.consume(code);
			return sequenceFurther;
		}
		effects.exit("atxHeadingSequence");
		return atBreak(code);
	}
	/**
	* In text.
	*
	* ```markdown
	* > | ## aa
	*        ^
	* ```
	*
	* @type {State}
	*/
	function data(code) {
		if (code === null || code === 35 || markdownLineEndingOrSpace(code)) {
			effects.exit("atxHeadingText");
			return atBreak(code);
		}
		effects.consume(code);
		return data;
	}
}
var headingAtx;
var init_heading_atx = __esmMin((() => {
	init_micromark_factory_space();
	init_micromark_util_character();
	init_micromark_util_chunked();
	headingAtx = {
		name: "headingAtx",
		tokenize: tokenizeHeadingAtx,
		resolve: resolveHeadingAtx
	};
}));
//#endregion
//#region ../../node_modules/mermaid/node_modules/micromark-util-html-tag-name/index.js
var htmlBlockNames, htmlRawNames;
var init_micromark_util_html_tag_name = __esmMin((() => {
	htmlBlockNames = [
		"address",
		"article",
		"aside",
		"base",
		"basefont",
		"blockquote",
		"body",
		"caption",
		"center",
		"col",
		"colgroup",
		"dd",
		"details",
		"dialog",
		"dir",
		"div",
		"dl",
		"dt",
		"fieldset",
		"figcaption",
		"figure",
		"footer",
		"form",
		"frame",
		"frameset",
		"h1",
		"h2",
		"h3",
		"h4",
		"h5",
		"h6",
		"head",
		"header",
		"hr",
		"html",
		"iframe",
		"legend",
		"li",
		"link",
		"main",
		"menu",
		"menuitem",
		"nav",
		"noframes",
		"ol",
		"optgroup",
		"option",
		"p",
		"param",
		"search",
		"section",
		"summary",
		"table",
		"tbody",
		"td",
		"tfoot",
		"th",
		"thead",
		"title",
		"tr",
		"track",
		"ul"
	];
	htmlRawNames = [
		"pre",
		"script",
		"style",
		"textarea"
	];
}));
//#endregion
//#region ../../node_modules/mermaid/node_modules/micromark-core-commonmark/lib/html-flow.js
/** @type {Resolver} */
function resolveToHtmlFlow(events) {
	let index = events.length;
	while (index--) if (events[index][0] === "enter" && events[index][1].type === "htmlFlow") break;
	if (index > 1 && events[index - 2][1].type === "linePrefix") {
		events[index][1].start = events[index - 2][1].start;
		events[index + 1][1].start = events[index - 2][1].start;
		events.splice(index - 2, 2);
	}
	return events;
}
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeHtmlFlow(effects, ok, nok) {
	const self = this;
	/** @type {number} */
	let marker;
	/** @type {boolean} */
	let closingTag;
	/** @type {string} */
	let buffer;
	/** @type {number} */
	let index;
	/** @type {Code} */
	let markerB;
	return start;
	/**
	* Start of HTML (flow).
	*
	* ```markdown
	* > | <x />
	*     ^
	* ```
	*
	* @type {State}
	*/
	function start(code) {
		return before(code);
	}
	/**
	* At `<`, after optional whitespace.
	*
	* ```markdown
	* > | <x />
	*     ^
	* ```
	*
	* @type {State}
	*/
	function before(code) {
		effects.enter("htmlFlow");
		effects.enter("htmlFlowData");
		effects.consume(code);
		return open;
	}
	/**
	* After `<`, at tag name or other stuff.
	*
	* ```markdown
	* > | <x />
	*      ^
	* > | <!doctype>
	*      ^
	* > | <!--xxx-->
	*      ^
	* ```
	*
	* @type {State}
	*/
	function open(code) {
		if (code === 33) {
			effects.consume(code);
			return declarationOpen;
		}
		if (code === 47) {
			effects.consume(code);
			closingTag = true;
			return tagCloseStart;
		}
		if (code === 63) {
			effects.consume(code);
			marker = 3;
			return self.interrupt ? ok : continuationDeclarationInside;
		}
		if (asciiAlpha(code)) {
			effects.consume(code);
			buffer = String.fromCharCode(code);
			return tagName;
		}
		return nok(code);
	}
	/**
	* After `<!`, at declaration, comment, or CDATA.
	*
	* ```markdown
	* > | <!doctype>
	*       ^
	* > | <!--xxx-->
	*       ^
	* > | <![CDATA[>&<]]>
	*       ^
	* ```
	*
	* @type {State}
	*/
	function declarationOpen(code) {
		if (code === 45) {
			effects.consume(code);
			marker = 2;
			return commentOpenInside;
		}
		if (code === 91) {
			effects.consume(code);
			marker = 5;
			index = 0;
			return cdataOpenInside;
		}
		if (asciiAlpha(code)) {
			effects.consume(code);
			marker = 4;
			return self.interrupt ? ok : continuationDeclarationInside;
		}
		return nok(code);
	}
	/**
	* After `<!-`, inside a comment, at another `-`.
	*
	* ```markdown
	* > | <!--xxx-->
	*        ^
	* ```
	*
	* @type {State}
	*/
	function commentOpenInside(code) {
		if (code === 45) {
			effects.consume(code);
			return self.interrupt ? ok : continuationDeclarationInside;
		}
		return nok(code);
	}
	/**
	* After `<![`, inside CDATA, expecting `CDATA[`.
	*
	* ```markdown
	* > | <![CDATA[>&<]]>
	*        ^^^^^^
	* ```
	*
	* @type {State}
	*/
	function cdataOpenInside(code) {
		if (code === "CDATA[".charCodeAt(index++)) {
			effects.consume(code);
			if (index === 6) return self.interrupt ? ok : continuation;
			return cdataOpenInside;
		}
		return nok(code);
	}
	/**
	* After `</`, in closing tag, at tag name.
	*
	* ```markdown
	* > | </x>
	*       ^
	* ```
	*
	* @type {State}
	*/
	function tagCloseStart(code) {
		if (asciiAlpha(code)) {
			effects.consume(code);
			buffer = String.fromCharCode(code);
			return tagName;
		}
		return nok(code);
	}
	/**
	* In tag name.
	*
	* ```markdown
	* > | <ab>
	*      ^^
	* > | </ab>
	*       ^^
	* ```
	*
	* @type {State}
	*/
	function tagName(code) {
		if (code === null || code === 47 || code === 62 || markdownLineEndingOrSpace(code)) {
			const slash = code === 47;
			const name = buffer.toLowerCase();
			if (!slash && !closingTag && htmlRawNames.includes(name)) {
				marker = 1;
				return self.interrupt ? ok(code) : continuation(code);
			}
			if (htmlBlockNames.includes(buffer.toLowerCase())) {
				marker = 6;
				if (slash) {
					effects.consume(code);
					return basicSelfClosing;
				}
				return self.interrupt ? ok(code) : continuation(code);
			}
			marker = 7;
			return self.interrupt && !self.parser.lazy[self.now().line] ? nok(code) : closingTag ? completeClosingTagAfter(code) : completeAttributeNameBefore(code);
		}
		if (code === 45 || asciiAlphanumeric(code)) {
			effects.consume(code);
			buffer += String.fromCharCode(code);
			return tagName;
		}
		return nok(code);
	}
	/**
	* After closing slash of a basic tag name.
	*
	* ```markdown
	* > | <div/>
	*          ^
	* ```
	*
	* @type {State}
	*/
	function basicSelfClosing(code) {
		if (code === 62) {
			effects.consume(code);
			return self.interrupt ? ok : continuation;
		}
		return nok(code);
	}
	/**
	* After closing slash of a complete tag name.
	*
	* ```markdown
	* > | <x/>
	*        ^
	* ```
	*
	* @type {State}
	*/
	function completeClosingTagAfter(code) {
		if (markdownSpace(code)) {
			effects.consume(code);
			return completeClosingTagAfter;
		}
		return completeEnd(code);
	}
	/**
	* At an attribute name.
	*
	* At first, this state is used after a complete tag name, after whitespace,
	* where it expects optional attributes or the end of the tag.
	* It is also reused after attributes, when expecting more optional
	* attributes.
	*
	* ```markdown
	* > | <a />
	*        ^
	* > | <a :b>
	*        ^
	* > | <a _b>
	*        ^
	* > | <a b>
	*        ^
	* > | <a >
	*        ^
	* ```
	*
	* @type {State}
	*/
	function completeAttributeNameBefore(code) {
		if (code === 47) {
			effects.consume(code);
			return completeEnd;
		}
		if (code === 58 || code === 95 || asciiAlpha(code)) {
			effects.consume(code);
			return completeAttributeName;
		}
		if (markdownSpace(code)) {
			effects.consume(code);
			return completeAttributeNameBefore;
		}
		return completeEnd(code);
	}
	/**
	* In attribute name.
	*
	* ```markdown
	* > | <a :b>
	*         ^
	* > | <a _b>
	*         ^
	* > | <a b>
	*         ^
	* ```
	*
	* @type {State}
	*/
	function completeAttributeName(code) {
		if (code === 45 || code === 46 || code === 58 || code === 95 || asciiAlphanumeric(code)) {
			effects.consume(code);
			return completeAttributeName;
		}
		return completeAttributeNameAfter(code);
	}
	/**
	* After attribute name, at an optional initializer, the end of the tag, or
	* whitespace.
	*
	* ```markdown
	* > | <a b>
	*         ^
	* > | <a b=c>
	*         ^
	* ```
	*
	* @type {State}
	*/
	function completeAttributeNameAfter(code) {
		if (code === 61) {
			effects.consume(code);
			return completeAttributeValueBefore;
		}
		if (markdownSpace(code)) {
			effects.consume(code);
			return completeAttributeNameAfter;
		}
		return completeAttributeNameBefore(code);
	}
	/**
	* Before unquoted, double quoted, or single quoted attribute value, allowing
	* whitespace.
	*
	* ```markdown
	* > | <a b=c>
	*          ^
	* > | <a b="c">
	*          ^
	* ```
	*
	* @type {State}
	*/
	function completeAttributeValueBefore(code) {
		if (code === null || code === 60 || code === 61 || code === 62 || code === 96) return nok(code);
		if (code === 34 || code === 39) {
			effects.consume(code);
			markerB = code;
			return completeAttributeValueQuoted;
		}
		if (markdownSpace(code)) {
			effects.consume(code);
			return completeAttributeValueBefore;
		}
		return completeAttributeValueUnquoted(code);
	}
	/**
	* In double or single quoted attribute value.
	*
	* ```markdown
	* > | <a b="c">
	*           ^
	* > | <a b='c'>
	*           ^
	* ```
	*
	* @type {State}
	*/
	function completeAttributeValueQuoted(code) {
		if (code === markerB) {
			effects.consume(code);
			markerB = null;
			return completeAttributeValueQuotedAfter;
		}
		if (code === null || markdownLineEnding(code)) return nok(code);
		effects.consume(code);
		return completeAttributeValueQuoted;
	}
	/**
	* In unquoted attribute value.
	*
	* ```markdown
	* > | <a b=c>
	*          ^
	* ```
	*
	* @type {State}
	*/
	function completeAttributeValueUnquoted(code) {
		if (code === null || code === 34 || code === 39 || code === 47 || code === 60 || code === 61 || code === 62 || code === 96 || markdownLineEndingOrSpace(code)) return completeAttributeNameAfter(code);
		effects.consume(code);
		return completeAttributeValueUnquoted;
	}
	/**
	* After double or single quoted attribute value, before whitespace or the
	* end of the tag.
	*
	* ```markdown
	* > | <a b="c">
	*            ^
	* ```
	*
	* @type {State}
	*/
	function completeAttributeValueQuotedAfter(code) {
		if (code === 47 || code === 62 || markdownSpace(code)) return completeAttributeNameBefore(code);
		return nok(code);
	}
	/**
	* In certain circumstances of a complete tag where only an `>` is allowed.
	*
	* ```markdown
	* > | <a b="c">
	*             ^
	* ```
	*
	* @type {State}
	*/
	function completeEnd(code) {
		if (code === 62) {
			effects.consume(code);
			return completeAfter;
		}
		return nok(code);
	}
	/**
	* After `>` in a complete tag.
	*
	* ```markdown
	* > | <x>
	*        ^
	* ```
	*
	* @type {State}
	*/
	function completeAfter(code) {
		if (code === null || markdownLineEnding(code)) return continuation(code);
		if (markdownSpace(code)) {
			effects.consume(code);
			return completeAfter;
		}
		return nok(code);
	}
	/**
	* In continuation of any HTML kind.
	*
	* ```markdown
	* > | <!--xxx-->
	*          ^
	* ```
	*
	* @type {State}
	*/
	function continuation(code) {
		if (code === 45 && marker === 2) {
			effects.consume(code);
			return continuationCommentInside;
		}
		if (code === 60 && marker === 1) {
			effects.consume(code);
			return continuationRawTagOpen;
		}
		if (code === 62 && marker === 4) {
			effects.consume(code);
			return continuationClose;
		}
		if (code === 63 && marker === 3) {
			effects.consume(code);
			return continuationDeclarationInside;
		}
		if (code === 93 && marker === 5) {
			effects.consume(code);
			return continuationCdataInside;
		}
		if (markdownLineEnding(code) && (marker === 6 || marker === 7)) {
			effects.exit("htmlFlowData");
			return effects.check(blankLineBefore, continuationAfter, continuationStart)(code);
		}
		if (code === null || markdownLineEnding(code)) {
			effects.exit("htmlFlowData");
			return continuationStart(code);
		}
		effects.consume(code);
		return continuation;
	}
	/**
	* In continuation, at eol.
	*
	* ```markdown
	* > | <x>
	*        ^
	*   | asd
	* ```
	*
	* @type {State}
	*/
	function continuationStart(code) {
		return effects.check(nonLazyContinuationStart, continuationStartNonLazy, continuationAfter)(code);
	}
	/**
	* In continuation, at eol, before non-lazy content.
	*
	* ```markdown
	* > | <x>
	*        ^
	*   | asd
	* ```
	*
	* @type {State}
	*/
	function continuationStartNonLazy(code) {
		effects.enter("lineEnding");
		effects.consume(code);
		effects.exit("lineEnding");
		return continuationBefore;
	}
	/**
	* In continuation, before non-lazy content.
	*
	* ```markdown
	*   | <x>
	* > | asd
	*     ^
	* ```
	*
	* @type {State}
	*/
	function continuationBefore(code) {
		if (code === null || markdownLineEnding(code)) return continuationStart(code);
		effects.enter("htmlFlowData");
		return continuation(code);
	}
	/**
	* In comment continuation, after one `-`, expecting another.
	*
	* ```markdown
	* > | <!--xxx-->
	*             ^
	* ```
	*
	* @type {State}
	*/
	function continuationCommentInside(code) {
		if (code === 45) {
			effects.consume(code);
			return continuationDeclarationInside;
		}
		return continuation(code);
	}
	/**
	* In raw continuation, after `<`, at `/`.
	*
	* ```markdown
	* > | <script>console.log(1)<\/script>
	*                            ^
	* ```
	*
	* @type {State}
	*/
	function continuationRawTagOpen(code) {
		if (code === 47) {
			effects.consume(code);
			buffer = "";
			return continuationRawEndTag;
		}
		return continuation(code);
	}
	/**
	* In raw continuation, after `</`, in a raw tag name.
	*
	* ```markdown
	* > | <script>console.log(1)<\/script>
	*                             ^^^^^^
	* ```
	*
	* @type {State}
	*/
	function continuationRawEndTag(code) {
		if (code === 62) {
			const name = buffer.toLowerCase();
			if (htmlRawNames.includes(name)) {
				effects.consume(code);
				return continuationClose;
			}
			return continuation(code);
		}
		if (asciiAlpha(code) && buffer.length < 8) {
			effects.consume(code);
			buffer += String.fromCharCode(code);
			return continuationRawEndTag;
		}
		return continuation(code);
	}
	/**
	* In cdata continuation, after `]`, expecting `]>`.
	*
	* ```markdown
	* > | <![CDATA[>&<]]>
	*                  ^
	* ```
	*
	* @type {State}
	*/
	function continuationCdataInside(code) {
		if (code === 93) {
			effects.consume(code);
			return continuationDeclarationInside;
		}
		return continuation(code);
	}
	/**
	* In declaration or instruction continuation, at `>`.
	*
	* ```markdown
	* > | <!-->
	*         ^
	* > | <?>
	*       ^
	* > | <!q>
	*        ^
	* > | <!--ab-->
	*             ^
	* > | <![CDATA[>&<]]>
	*                   ^
	* ```
	*
	* @type {State}
	*/
	function continuationDeclarationInside(code) {
		if (code === 62) {
			effects.consume(code);
			return continuationClose;
		}
		if (code === 45 && marker === 2) {
			effects.consume(code);
			return continuationDeclarationInside;
		}
		return continuation(code);
	}
	/**
	* In closed continuation: everything we get until the eol/eof is part of it.
	*
	* ```markdown
	* > | <!doctype>
	*               ^
	* ```
	*
	* @type {State}
	*/
	function continuationClose(code) {
		if (code === null || markdownLineEnding(code)) {
			effects.exit("htmlFlowData");
			return continuationAfter(code);
		}
		effects.consume(code);
		return continuationClose;
	}
	/**
	* Done.
	*
	* ```markdown
	* > | <!doctype>
	*               ^
	* ```
	*
	* @type {State}
	*/
	function continuationAfter(code) {
		effects.exit("htmlFlow");
		return ok(code);
	}
}
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeNonLazyContinuationStart(effects, ok, nok) {
	const self = this;
	return start;
	/**
	* At eol, before continuation.
	*
	* ```markdown
	* > | * ```js
	*            ^
	*   | b
	* ```
	*
	* @type {State}
	*/
	function start(code) {
		if (markdownLineEnding(code)) {
			effects.enter("lineEnding");
			effects.consume(code);
			effects.exit("lineEnding");
			return after;
		}
		return nok(code);
	}
	/**
	* A continuation.
	*
	* ```markdown
	*   | * ```js
	* > | b
	*     ^
	* ```
	*
	* @type {State}
	*/
	function after(code) {
		return self.parser.lazy[self.now().line] ? nok(code) : ok(code);
	}
}
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeBlankLineBefore(effects, ok, nok) {
	return start;
	/**
	* Before eol, expecting blank line.
	*
	* ```markdown
	* > | <div>
	*          ^
	*   |
	* ```
	*
	* @type {State}
	*/
	function start(code) {
		effects.enter("lineEnding");
		effects.consume(code);
		effects.exit("lineEnding");
		return effects.attempt(blankLine, ok, nok);
	}
}
var htmlFlow, blankLineBefore, nonLazyContinuationStart;
var init_html_flow = __esmMin((() => {
	init_micromark_util_character();
	init_micromark_util_html_tag_name();
	init_blank_line();
	htmlFlow = {
		name: "htmlFlow",
		tokenize: tokenizeHtmlFlow,
		resolveTo: resolveToHtmlFlow,
		concrete: true
	};
	blankLineBefore = {
		tokenize: tokenizeBlankLineBefore,
		partial: true
	};
	nonLazyContinuationStart = {
		tokenize: tokenizeNonLazyContinuationStart,
		partial: true
	};
}));
//#endregion
//#region ../../node_modules/mermaid/node_modules/micromark-core-commonmark/lib/html-text.js
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeHtmlText(effects, ok, nok) {
	const self = this;
	/** @type {NonNullable<Code> | undefined} */
	let marker;
	/** @type {number} */
	let index;
	/** @type {State} */
	let returnState;
	return start;
	/**
	* Start of HTML (text).
	*
	* ```markdown
	* > | a <b> c
	*       ^
	* ```
	*
	* @type {State}
	*/
	function start(code) {
		effects.enter("htmlText");
		effects.enter("htmlTextData");
		effects.consume(code);
		return open;
	}
	/**
	* After `<`, at tag name or other stuff.
	*
	* ```markdown
	* > | a <b> c
	*        ^
	* > | a <!doctype> c
	*        ^
	* > | a <!--b--> c
	*        ^
	* ```
	*
	* @type {State}
	*/
	function open(code) {
		if (code === 33) {
			effects.consume(code);
			return declarationOpen;
		}
		if (code === 47) {
			effects.consume(code);
			return tagCloseStart;
		}
		if (code === 63) {
			effects.consume(code);
			return instruction;
		}
		if (asciiAlpha(code)) {
			effects.consume(code);
			return tagOpen;
		}
		return nok(code);
	}
	/**
	* After `<!`, at declaration, comment, or CDATA.
	*
	* ```markdown
	* > | a <!doctype> c
	*         ^
	* > | a <!--b--> c
	*         ^
	* > | a <![CDATA[>&<]]> c
	*         ^
	* ```
	*
	* @type {State}
	*/
	function declarationOpen(code) {
		if (code === 45) {
			effects.consume(code);
			return commentOpenInside;
		}
		if (code === 91) {
			effects.consume(code);
			index = 0;
			return cdataOpenInside;
		}
		if (asciiAlpha(code)) {
			effects.consume(code);
			return declaration;
		}
		return nok(code);
	}
	/**
	* In a comment, after `<!-`, at another `-`.
	*
	* ```markdown
	* > | a <!--b--> c
	*          ^
	* ```
	*
	* @type {State}
	*/
	function commentOpenInside(code) {
		if (code === 45) {
			effects.consume(code);
			return commentEnd;
		}
		return nok(code);
	}
	/**
	* In comment.
	*
	* ```markdown
	* > | a <!--b--> c
	*           ^
	* ```
	*
	* @type {State}
	*/
	function comment(code) {
		if (code === null) return nok(code);
		if (code === 45) {
			effects.consume(code);
			return commentClose;
		}
		if (markdownLineEnding(code)) {
			returnState = comment;
			return lineEndingBefore(code);
		}
		effects.consume(code);
		return comment;
	}
	/**
	* In comment, after `-`.
	*
	* ```markdown
	* > | a <!--b--> c
	*             ^
	* ```
	*
	* @type {State}
	*/
	function commentClose(code) {
		if (code === 45) {
			effects.consume(code);
			return commentEnd;
		}
		return comment(code);
	}
	/**
	* In comment, after `--`.
	*
	* ```markdown
	* > | a <!--b--> c
	*              ^
	* ```
	*
	* @type {State}
	*/
	function commentEnd(code) {
		return code === 62 ? end(code) : code === 45 ? commentClose(code) : comment(code);
	}
	/**
	* After `<![`, in CDATA, expecting `CDATA[`.
	*
	* ```markdown
	* > | a <![CDATA[>&<]]> b
	*          ^^^^^^
	* ```
	*
	* @type {State}
	*/
	function cdataOpenInside(code) {
		if (code === "CDATA[".charCodeAt(index++)) {
			effects.consume(code);
			return index === 6 ? cdata : cdataOpenInside;
		}
		return nok(code);
	}
	/**
	* In CDATA.
	*
	* ```markdown
	* > | a <![CDATA[>&<]]> b
	*                ^^^
	* ```
	*
	* @type {State}
	*/
	function cdata(code) {
		if (code === null) return nok(code);
		if (code === 93) {
			effects.consume(code);
			return cdataClose;
		}
		if (markdownLineEnding(code)) {
			returnState = cdata;
			return lineEndingBefore(code);
		}
		effects.consume(code);
		return cdata;
	}
	/**
	* In CDATA, after `]`, at another `]`.
	*
	* ```markdown
	* > | a <![CDATA[>&<]]> b
	*                    ^
	* ```
	*
	* @type {State}
	*/
	function cdataClose(code) {
		if (code === 93) {
			effects.consume(code);
			return cdataEnd;
		}
		return cdata(code);
	}
	/**
	* In CDATA, after `]]`, at `>`.
	*
	* ```markdown
	* > | a <![CDATA[>&<]]> b
	*                     ^
	* ```
	*
	* @type {State}
	*/
	function cdataEnd(code) {
		if (code === 62) return end(code);
		if (code === 93) {
			effects.consume(code);
			return cdataEnd;
		}
		return cdata(code);
	}
	/**
	* In declaration.
	*
	* ```markdown
	* > | a <!b> c
	*          ^
	* ```
	*
	* @type {State}
	*/
	function declaration(code) {
		if (code === null || code === 62) return end(code);
		if (markdownLineEnding(code)) {
			returnState = declaration;
			return lineEndingBefore(code);
		}
		effects.consume(code);
		return declaration;
	}
	/**
	* In instruction.
	*
	* ```markdown
	* > | a <?b?> c
	*         ^
	* ```
	*
	* @type {State}
	*/
	function instruction(code) {
		if (code === null) return nok(code);
		if (code === 63) {
			effects.consume(code);
			return instructionClose;
		}
		if (markdownLineEnding(code)) {
			returnState = instruction;
			return lineEndingBefore(code);
		}
		effects.consume(code);
		return instruction;
	}
	/**
	* In instruction, after `?`, at `>`.
	*
	* ```markdown
	* > | a <?b?> c
	*           ^
	* ```
	*
	* @type {State}
	*/
	function instructionClose(code) {
		return code === 62 ? end(code) : instruction(code);
	}
	/**
	* After `</`, in closing tag, at tag name.
	*
	* ```markdown
	* > | a </b> c
	*         ^
	* ```
	*
	* @type {State}
	*/
	function tagCloseStart(code) {
		if (asciiAlpha(code)) {
			effects.consume(code);
			return tagClose;
		}
		return nok(code);
	}
	/**
	* After `</x`, in a tag name.
	*
	* ```markdown
	* > | a </b> c
	*          ^
	* ```
	*
	* @type {State}
	*/
	function tagClose(code) {
		if (code === 45 || asciiAlphanumeric(code)) {
			effects.consume(code);
			return tagClose;
		}
		return tagCloseBetween(code);
	}
	/**
	* In closing tag, after tag name.
	*
	* ```markdown
	* > | a </b> c
	*          ^
	* ```
	*
	* @type {State}
	*/
	function tagCloseBetween(code) {
		if (markdownLineEnding(code)) {
			returnState = tagCloseBetween;
			return lineEndingBefore(code);
		}
		if (markdownSpace(code)) {
			effects.consume(code);
			return tagCloseBetween;
		}
		return end(code);
	}
	/**
	* After `<x`, in opening tag name.
	*
	* ```markdown
	* > | a <b> c
	*         ^
	* ```
	*
	* @type {State}
	*/
	function tagOpen(code) {
		if (code === 45 || asciiAlphanumeric(code)) {
			effects.consume(code);
			return tagOpen;
		}
		if (code === 47 || code === 62 || markdownLineEndingOrSpace(code)) return tagOpenBetween(code);
		return nok(code);
	}
	/**
	* In opening tag, after tag name.
	*
	* ```markdown
	* > | a <b> c
	*         ^
	* ```
	*
	* @type {State}
	*/
	function tagOpenBetween(code) {
		if (code === 47) {
			effects.consume(code);
			return end;
		}
		if (code === 58 || code === 95 || asciiAlpha(code)) {
			effects.consume(code);
			return tagOpenAttributeName;
		}
		if (markdownLineEnding(code)) {
			returnState = tagOpenBetween;
			return lineEndingBefore(code);
		}
		if (markdownSpace(code)) {
			effects.consume(code);
			return tagOpenBetween;
		}
		return end(code);
	}
	/**
	* In attribute name.
	*
	* ```markdown
	* > | a <b c> d
	*          ^
	* ```
	*
	* @type {State}
	*/
	function tagOpenAttributeName(code) {
		if (code === 45 || code === 46 || code === 58 || code === 95 || asciiAlphanumeric(code)) {
			effects.consume(code);
			return tagOpenAttributeName;
		}
		return tagOpenAttributeNameAfter(code);
	}
	/**
	* After attribute name, before initializer, the end of the tag, or
	* whitespace.
	*
	* ```markdown
	* > | a <b c> d
	*           ^
	* ```
	*
	* @type {State}
	*/
	function tagOpenAttributeNameAfter(code) {
		if (code === 61) {
			effects.consume(code);
			return tagOpenAttributeValueBefore;
		}
		if (markdownLineEnding(code)) {
			returnState = tagOpenAttributeNameAfter;
			return lineEndingBefore(code);
		}
		if (markdownSpace(code)) {
			effects.consume(code);
			return tagOpenAttributeNameAfter;
		}
		return tagOpenBetween(code);
	}
	/**
	* Before unquoted, double quoted, or single quoted attribute value, allowing
	* whitespace.
	*
	* ```markdown
	* > | a <b c=d> e
	*            ^
	* ```
	*
	* @type {State}
	*/
	function tagOpenAttributeValueBefore(code) {
		if (code === null || code === 60 || code === 61 || code === 62 || code === 96) return nok(code);
		if (code === 34 || code === 39) {
			effects.consume(code);
			marker = code;
			return tagOpenAttributeValueQuoted;
		}
		if (markdownLineEnding(code)) {
			returnState = tagOpenAttributeValueBefore;
			return lineEndingBefore(code);
		}
		if (markdownSpace(code)) {
			effects.consume(code);
			return tagOpenAttributeValueBefore;
		}
		effects.consume(code);
		return tagOpenAttributeValueUnquoted;
	}
	/**
	* In double or single quoted attribute value.
	*
	* ```markdown
	* > | a <b c="d"> e
	*             ^
	* ```
	*
	* @type {State}
	*/
	function tagOpenAttributeValueQuoted(code) {
		if (code === marker) {
			effects.consume(code);
			marker = void 0;
			return tagOpenAttributeValueQuotedAfter;
		}
		if (code === null) return nok(code);
		if (markdownLineEnding(code)) {
			returnState = tagOpenAttributeValueQuoted;
			return lineEndingBefore(code);
		}
		effects.consume(code);
		return tagOpenAttributeValueQuoted;
	}
	/**
	* In unquoted attribute value.
	*
	* ```markdown
	* > | a <b c=d> e
	*            ^
	* ```
	*
	* @type {State}
	*/
	function tagOpenAttributeValueUnquoted(code) {
		if (code === null || code === 34 || code === 39 || code === 60 || code === 61 || code === 96) return nok(code);
		if (code === 47 || code === 62 || markdownLineEndingOrSpace(code)) return tagOpenBetween(code);
		effects.consume(code);
		return tagOpenAttributeValueUnquoted;
	}
	/**
	* After double or single quoted attribute value, before whitespace or the end
	* of the tag.
	*
	* ```markdown
	* > | a <b c="d"> e
	*               ^
	* ```
	*
	* @type {State}
	*/
	function tagOpenAttributeValueQuotedAfter(code) {
		if (code === 47 || code === 62 || markdownLineEndingOrSpace(code)) return tagOpenBetween(code);
		return nok(code);
	}
	/**
	* In certain circumstances of a tag where only an `>` is allowed.
	*
	* ```markdown
	* > | a <b c="d"> e
	*               ^
	* ```
	*
	* @type {State}
	*/
	function end(code) {
		if (code === 62) {
			effects.consume(code);
			effects.exit("htmlTextData");
			effects.exit("htmlText");
			return ok;
		}
		return nok(code);
	}
	/**
	* At eol.
	*
	* > 👉 **Note**: we can’t have blank lines in text, so no need to worry about
	* > empty tokens.
	*
	* ```markdown
	* > | a <!--a
	*            ^
	*   | b-->
	* ```
	*
	* @type {State}
	*/
	function lineEndingBefore(code) {
		effects.exit("htmlTextData");
		effects.enter("lineEnding");
		effects.consume(code);
		effects.exit("lineEnding");
		return lineEndingAfter;
	}
	/**
	* After eol, at optional whitespace.
	*
	* > 👉 **Note**: we can’t have blank lines in text, so no need to worry about
	* > empty tokens.
	*
	* ```markdown
	*   | a <!--a
	* > | b-->
	*     ^
	* ```
	*
	* @type {State}
	*/
	function lineEndingAfter(code) {
		return markdownSpace(code) ? factorySpace(effects, lineEndingAfterPrefix, "linePrefix", self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code) : lineEndingAfterPrefix(code);
	}
	/**
	* After eol, after optional whitespace.
	*
	* > 👉 **Note**: we can’t have blank lines in text, so no need to worry about
	* > empty tokens.
	*
	* ```markdown
	*   | a <!--a
	* > | b-->
	*     ^
	* ```
	*
	* @type {State}
	*/
	function lineEndingAfterPrefix(code) {
		effects.enter("htmlTextData");
		return returnState(code);
	}
}
var htmlText;
var init_html_text = __esmMin((() => {
	init_micromark_factory_space();
	init_micromark_util_character();
	htmlText = {
		name: "htmlText",
		tokenize: tokenizeHtmlText
	};
}));
//#endregion
//#region ../../node_modules/mermaid/node_modules/micromark-core-commonmark/lib/label-end.js
/** @type {Resolver} */
function resolveAllLabelEnd(events) {
	let index = -1;
	while (++index < events.length) {
		const token = events[index][1];
		if (token.type === "labelImage" || token.type === "labelLink" || token.type === "labelEnd") {
			events.splice(index + 1, token.type === "labelImage" ? 4 : 2);
			token.type = "data";
			index++;
		}
	}
	return events;
}
/** @type {Resolver} */
function resolveToLabelEnd(events, context) {
	let index = events.length;
	let offset = 0;
	/** @type {Token} */
	let token;
	/** @type {number | undefined} */
	let open;
	/** @type {number | undefined} */
	let close;
	/** @type {Array<Event>} */
	let media;
	while (index--) {
		token = events[index][1];
		if (open) {
			if (token.type === "link" || token.type === "labelLink" && token._inactive) break;
			if (events[index][0] === "enter" && token.type === "labelLink") token._inactive = true;
		} else if (close) {
			if (events[index][0] === "enter" && (token.type === "labelImage" || token.type === "labelLink") && !token._balanced) {
				open = index;
				if (token.type !== "labelLink") {
					offset = 2;
					break;
				}
			}
		} else if (token.type === "labelEnd") close = index;
	}
	const group = {
		type: events[open][1].type === "labelLink" ? "link" : "image",
		start: Object.assign({}, events[open][1].start),
		end: Object.assign({}, events[events.length - 1][1].end)
	};
	const label = {
		type: "label",
		start: Object.assign({}, events[open][1].start),
		end: Object.assign({}, events[close][1].end)
	};
	const text = {
		type: "labelText",
		start: Object.assign({}, events[open + offset + 2][1].end),
		end: Object.assign({}, events[close - 2][1].start)
	};
	media = [[
		"enter",
		group,
		context
	], [
		"enter",
		label,
		context
	]];
	media = push(media, events.slice(open + 1, open + offset + 3));
	media = push(media, [[
		"enter",
		text,
		context
	]]);
	media = push(media, resolveAll(context.parser.constructs.insideSpan.null, events.slice(open + offset + 4, close - 3), context));
	media = push(media, [
		[
			"exit",
			text,
			context
		],
		events[close - 2],
		events[close - 1],
		[
			"exit",
			label,
			context
		]
	]);
	media = push(media, events.slice(close + 1));
	media = push(media, [[
		"exit",
		group,
		context
	]]);
	splice(events, open, events.length, media);
	return events;
}
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeLabelEnd(effects, ok, nok) {
	const self = this;
	let index = self.events.length;
	/** @type {Token} */
	let labelStart;
	/** @type {boolean} */
	let defined;
	while (index--) if ((self.events[index][1].type === "labelImage" || self.events[index][1].type === "labelLink") && !self.events[index][1]._balanced) {
		labelStart = self.events[index][1];
		break;
	}
	return start;
	/**
	* Start of label end.
	*
	* ```markdown
	* > | [a](b) c
	*       ^
	* > | [a][b] c
	*       ^
	* > | [a][] b
	*       ^
	* > | [a] b
	* ```
	*
	* @type {State}
	*/
	function start(code) {
		if (!labelStart) return nok(code);
		if (labelStart._inactive) return labelEndNok(code);
		defined = self.parser.defined.includes(normalizeIdentifier(self.sliceSerialize({
			start: labelStart.end,
			end: self.now()
		})));
		effects.enter("labelEnd");
		effects.enter("labelMarker");
		effects.consume(code);
		effects.exit("labelMarker");
		effects.exit("labelEnd");
		return after;
	}
	/**
	* After `]`.
	*
	* ```markdown
	* > | [a](b) c
	*       ^
	* > | [a][b] c
	*       ^
	* > | [a][] b
	*       ^
	* > | [a] b
	*       ^
	* ```
	*
	* @type {State}
	*/
	function after(code) {
		if (code === 40) return effects.attempt(resourceConstruct, labelEndOk, defined ? labelEndOk : labelEndNok)(code);
		if (code === 91) return effects.attempt(referenceFullConstruct, labelEndOk, defined ? referenceNotFull : labelEndNok)(code);
		return defined ? labelEndOk(code) : labelEndNok(code);
	}
	/**
	* After `]`, at `[`, but not at a full reference.
	*
	* > 👉 **Note**: we only get here if the label is defined.
	*
	* ```markdown
	* > | [a][] b
	*        ^
	* > | [a] b
	*        ^
	* ```
	*
	* @type {State}
	*/
	function referenceNotFull(code) {
		return effects.attempt(referenceCollapsedConstruct, labelEndOk, labelEndNok)(code);
	}
	/**
	* Done, we found something.
	*
	* ```markdown
	* > | [a](b) c
	*           ^
	* > | [a][b] c
	*           ^
	* > | [a][] b
	*          ^
	* > | [a] b
	*        ^
	* ```
	*
	* @type {State}
	*/
	function labelEndOk(code) {
		return ok(code);
	}
	/**
	* Done, it’s nothing.
	*
	* There was an okay opening, but we didn’t match anything.
	*
	* ```markdown
	* > | [a](b c
	*        ^
	* > | [a][b c
	*        ^
	* > | [a] b
	*        ^
	* ```
	*
	* @type {State}
	*/
	function labelEndNok(code) {
		labelStart._balanced = true;
		return nok(code);
	}
}
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeResource(effects, ok, nok) {
	return resourceStart;
	/**
	* At a resource.
	*
	* ```markdown
	* > | [a](b) c
	*        ^
	* ```
	*
	* @type {State}
	*/
	function resourceStart(code) {
		effects.enter("resource");
		effects.enter("resourceMarker");
		effects.consume(code);
		effects.exit("resourceMarker");
		return resourceBefore;
	}
	/**
	* In resource, after `(`, at optional whitespace.
	*
	* ```markdown
	* > | [a](b) c
	*         ^
	* ```
	*
	* @type {State}
	*/
	function resourceBefore(code) {
		return markdownLineEndingOrSpace(code) ? factoryWhitespace(effects, resourceOpen)(code) : resourceOpen(code);
	}
	/**
	* In resource, after optional whitespace, at `)` or a destination.
	*
	* ```markdown
	* > | [a](b) c
	*         ^
	* ```
	*
	* @type {State}
	*/
	function resourceOpen(code) {
		if (code === 41) return resourceEnd(code);
		return factoryDestination(effects, resourceDestinationAfter, resourceDestinationMissing, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(code);
	}
	/**
	* In resource, after destination, at optional whitespace.
	*
	* ```markdown
	* > | [a](b) c
	*          ^
	* ```
	*
	* @type {State}
	*/
	function resourceDestinationAfter(code) {
		return markdownLineEndingOrSpace(code) ? factoryWhitespace(effects, resourceBetween)(code) : resourceEnd(code);
	}
	/**
	* At invalid destination.
	*
	* ```markdown
	* > | [a](<<) b
	*         ^
	* ```
	*
	* @type {State}
	*/
	function resourceDestinationMissing(code) {
		return nok(code);
	}
	/**
	* In resource, after destination and whitespace, at `(` or title.
	*
	* ```markdown
	* > | [a](b ) c
	*           ^
	* ```
	*
	* @type {State}
	*/
	function resourceBetween(code) {
		if (code === 34 || code === 39 || code === 40) return factoryTitle(effects, resourceTitleAfter, nok, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(code);
		return resourceEnd(code);
	}
	/**
	* In resource, after title, at optional whitespace.
	*
	* ```markdown
	* > | [a](b "c") d
	*              ^
	* ```
	*
	* @type {State}
	*/
	function resourceTitleAfter(code) {
		return markdownLineEndingOrSpace(code) ? factoryWhitespace(effects, resourceEnd)(code) : resourceEnd(code);
	}
	/**
	* In resource, at `)`.
	*
	* ```markdown
	* > | [a](b) d
	*          ^
	* ```
	*
	* @type {State}
	*/
	function resourceEnd(code) {
		if (code === 41) {
			effects.enter("resourceMarker");
			effects.consume(code);
			effects.exit("resourceMarker");
			effects.exit("resource");
			return ok;
		}
		return nok(code);
	}
}
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeReferenceFull(effects, ok, nok) {
	const self = this;
	return referenceFull;
	/**
	* In a reference (full), at the `[`.
	*
	* ```markdown
	* > | [a][b] d
	*        ^
	* ```
	*
	* @type {State}
	*/
	function referenceFull(code) {
		return factoryLabel.call(self, effects, referenceFullAfter, referenceFullMissing, "reference", "referenceMarker", "referenceString")(code);
	}
	/**
	* In a reference (full), after `]`.
	*
	* ```markdown
	* > | [a][b] d
	*          ^
	* ```
	*
	* @type {State}
	*/
	function referenceFullAfter(code) {
		return self.parser.defined.includes(normalizeIdentifier(self.sliceSerialize(self.events[self.events.length - 1][1]).slice(1, -1))) ? ok(code) : nok(code);
	}
	/**
	* In reference (full) that was missing.
	*
	* ```markdown
	* > | [a][b d
	*        ^
	* ```
	*
	* @type {State}
	*/
	function referenceFullMissing(code) {
		return nok(code);
	}
}
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeReferenceCollapsed(effects, ok, nok) {
	return referenceCollapsedStart;
	/**
	* In reference (collapsed), at `[`.
	*
	* > 👉 **Note**: we only get here if the label is defined.
	*
	* ```markdown
	* > | [a][] d
	*        ^
	* ```
	*
	* @type {State}
	*/
	function referenceCollapsedStart(code) {
		effects.enter("reference");
		effects.enter("referenceMarker");
		effects.consume(code);
		effects.exit("referenceMarker");
		return referenceCollapsedOpen;
	}
	/**
	* In reference (collapsed), at `]`.
	*
	* > 👉 **Note**: we only get here if the label is defined.
	*
	* ```markdown
	* > | [a][] d
	*         ^
	* ```
	*
	*  @type {State}
	*/
	function referenceCollapsedOpen(code) {
		if (code === 93) {
			effects.enter("referenceMarker");
			effects.consume(code);
			effects.exit("referenceMarker");
			effects.exit("reference");
			return ok;
		}
		return nok(code);
	}
}
var labelEnd, resourceConstruct, referenceFullConstruct, referenceCollapsedConstruct;
var init_label_end = __esmMin((() => {
	init_micromark_factory_destination();
	init_micromark_factory_label();
	init_micromark_factory_title();
	init_micromark_factory_whitespace();
	init_micromark_util_character();
	init_micromark_util_chunked();
	init_micromark_util_normalize_identifier();
	init_micromark_util_resolve_all();
	labelEnd = {
		name: "labelEnd",
		tokenize: tokenizeLabelEnd,
		resolveTo: resolveToLabelEnd,
		resolveAll: resolveAllLabelEnd
	};
	resourceConstruct = { tokenize: tokenizeResource };
	referenceFullConstruct = { tokenize: tokenizeReferenceFull };
	referenceCollapsedConstruct = { tokenize: tokenizeReferenceCollapsed };
}));
//#endregion
//#region ../../node_modules/mermaid/node_modules/micromark-core-commonmark/lib/label-start-image.js
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeLabelStartImage(effects, ok, nok) {
	const self = this;
	return start;
	/**
	* Start of label (image) start.
	*
	* ```markdown
	* > | a ![b] c
	*       ^
	* ```
	*
	* @type {State}
	*/
	function start(code) {
		effects.enter("labelImage");
		effects.enter("labelImageMarker");
		effects.consume(code);
		effects.exit("labelImageMarker");
		return open;
	}
	/**
	* After `!`, at `[`.
	*
	* ```markdown
	* > | a ![b] c
	*        ^
	* ```
	*
	* @type {State}
	*/
	function open(code) {
		if (code === 91) {
			effects.enter("labelMarker");
			effects.consume(code);
			effects.exit("labelMarker");
			effects.exit("labelImage");
			return after;
		}
		return nok(code);
	}
	/**
	* After `![`.
	*
	* ```markdown
	* > | a ![b] c
	*         ^
	* ```
	*
	* This is needed in because, when GFM footnotes are enabled, images never
	* form when started with a `^`.
	* Instead, links form:
	*
	* ```markdown
	* ![^a](b)
	*
	* ![^a][b]
	*
	* [b]: c
	* ```
	*
	* ```html
	* <p>!<a href=\"b\">^a</a></p>
	* <p>!<a href=\"c\">^a</a></p>
	* ```
	*
	* @type {State}
	*/
	function after(code) {
		/* c8 ignore next 3 */
		return code === 94 && "_hiddenFootnoteSupport" in self.parser.constructs ? nok(code) : ok(code);
	}
}
var labelStartImage;
var init_label_start_image = __esmMin((() => {
	init_label_end();
	labelStartImage = {
		name: "labelStartImage",
		tokenize: tokenizeLabelStartImage,
		resolveAll: labelEnd.resolveAll
	};
}));
//#endregion
//#region ../../node_modules/mermaid/node_modules/micromark-core-commonmark/lib/label-start-link.js
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeLabelStartLink(effects, ok, nok) {
	const self = this;
	return start;
	/**
	* Start of label (link) start.
	*
	* ```markdown
	* > | a [b] c
	*       ^
	* ```
	*
	* @type {State}
	*/
	function start(code) {
		effects.enter("labelLink");
		effects.enter("labelMarker");
		effects.consume(code);
		effects.exit("labelMarker");
		effects.exit("labelLink");
		return after;
	}
	/** @type {State} */
	function after(code) {
		/* c8 ignore next 3 */
		return code === 94 && "_hiddenFootnoteSupport" in self.parser.constructs ? nok(code) : ok(code);
	}
}
var labelStartLink;
var init_label_start_link = __esmMin((() => {
	init_label_end();
	labelStartLink = {
		name: "labelStartLink",
		tokenize: tokenizeLabelStartLink,
		resolveAll: labelEnd.resolveAll
	};
}));
//#endregion
//#region ../../node_modules/mermaid/node_modules/micromark-core-commonmark/lib/line-ending.js
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeLineEnding(effects, ok) {
	return start;
	/** @type {State} */
	function start(code) {
		effects.enter("lineEnding");
		effects.consume(code);
		effects.exit("lineEnding");
		return factorySpace(effects, ok, "linePrefix");
	}
}
var lineEnding;
var init_line_ending = __esmMin((() => {
	init_micromark_factory_space();
	lineEnding = {
		name: "lineEnding",
		tokenize: tokenizeLineEnding
	};
}));
//#endregion
//#region ../../node_modules/mermaid/node_modules/micromark-core-commonmark/lib/thematic-break.js
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeThematicBreak(effects, ok, nok) {
	let size = 0;
	/** @type {NonNullable<Code>} */
	let marker;
	return start;
	/**
	* Start of thematic break.
	*
	* ```markdown
	* > | ***
	*     ^
	* ```
	*
	* @type {State}
	*/
	function start(code) {
		effects.enter("thematicBreak");
		return before(code);
	}
	/**
	* After optional whitespace, at marker.
	*
	* ```markdown
	* > | ***
	*     ^
	* ```
	*
	* @type {State}
	*/
	function before(code) {
		marker = code;
		return atBreak(code);
	}
	/**
	* After something, before something else.
	*
	* ```markdown
	* > | ***
	*     ^
	* ```
	*
	* @type {State}
	*/
	function atBreak(code) {
		if (code === marker) {
			effects.enter("thematicBreakSequence");
			return sequence(code);
		}
		if (size >= 3 && (code === null || markdownLineEnding(code))) {
			effects.exit("thematicBreak");
			return ok(code);
		}
		return nok(code);
	}
	/**
	* In sequence.
	*
	* ```markdown
	* > | ***
	*     ^
	* ```
	*
	* @type {State}
	*/
	function sequence(code) {
		if (code === marker) {
			effects.consume(code);
			size++;
			return sequence;
		}
		effects.exit("thematicBreakSequence");
		return markdownSpace(code) ? factorySpace(effects, atBreak, "whitespace")(code) : atBreak(code);
	}
}
var thematicBreak;
var init_thematic_break = __esmMin((() => {
	init_micromark_factory_space();
	init_micromark_util_character();
	thematicBreak = {
		name: "thematicBreak",
		tokenize: tokenizeThematicBreak
	};
}));
//#endregion
//#region ../../node_modules/mermaid/node_modules/micromark-core-commonmark/lib/list.js
/**
* @type {Tokenizer}
* @this {TokenizeContext}
*/
function tokenizeListStart(effects, ok, nok) {
	const self = this;
	const tail = self.events[self.events.length - 1];
	let initialSize = tail && tail[1].type === "linePrefix" ? tail[2].sliceSerialize(tail[1], true).length : 0;
	let size = 0;
	return start;
	/** @type {State} */
	function start(code) {
		const kind = self.containerState.type || (code === 42 || code === 43 || code === 45 ? "listUnordered" : "listOrdered");
		if (kind === "listUnordered" ? !self.containerState.marker || code === self.containerState.marker : asciiDigit(code)) {
			if (!self.containerState.type) {
				self.containerState.type = kind;
				effects.enter(kind, { _container: true });
			}
			if (kind === "listUnordered") {
				effects.enter("listItemPrefix");
				return code === 42 || code === 45 ? effects.check(thematicBreak, nok, atMarker)(code) : atMarker(code);
			}
			if (!self.interrupt || code === 49) {
				effects.enter("listItemPrefix");
				effects.enter("listItemValue");
				return inside(code);
			}
		}
		return nok(code);
	}
	/** @type {State} */
	function inside(code) {
		if (asciiDigit(code) && ++size < 10) {
			effects.consume(code);
			return inside;
		}
		if ((!self.interrupt || size < 2) && (self.containerState.marker ? code === self.containerState.marker : code === 41 || code === 46)) {
			effects.exit("listItemValue");
			return atMarker(code);
		}
		return nok(code);
	}
	/**
	* @type {State}
	**/
	function atMarker(code) {
		effects.enter("listItemMarker");
		effects.consume(code);
		effects.exit("listItemMarker");
		self.containerState.marker = self.containerState.marker || code;
		return effects.check(blankLine, self.interrupt ? nok : onBlank, effects.attempt(listItemPrefixWhitespaceConstruct, endOfPrefix, otherPrefix));
	}
	/** @type {State} */
	function onBlank(code) {
		self.containerState.initialBlankLine = true;
		initialSize++;
		return endOfPrefix(code);
	}
	/** @type {State} */
	function otherPrefix(code) {
		if (markdownSpace(code)) {
			effects.enter("listItemPrefixWhitespace");
			effects.consume(code);
			effects.exit("listItemPrefixWhitespace");
			return endOfPrefix;
		}
		return nok(code);
	}
	/** @type {State} */
	function endOfPrefix(code) {
		self.containerState.size = initialSize + self.sliceSerialize(effects.exit("listItemPrefix"), true).length;
		return ok(code);
	}
}
/**
* @type {Tokenizer}
* @this {TokenizeContext}
*/
function tokenizeListContinuation(effects, ok, nok) {
	const self = this;
	self.containerState._closeFlow = void 0;
	return effects.check(blankLine, onBlank, notBlank);
	/** @type {State} */
	function onBlank(code) {
		self.containerState.furtherBlankLines = self.containerState.furtherBlankLines || self.containerState.initialBlankLine;
		return factorySpace(effects, ok, "listItemIndent", self.containerState.size + 1)(code);
	}
	/** @type {State} */
	function notBlank(code) {
		if (self.containerState.furtherBlankLines || !markdownSpace(code)) {
			self.containerState.furtherBlankLines = void 0;
			self.containerState.initialBlankLine = void 0;
			return notInCurrentItem(code);
		}
		self.containerState.furtherBlankLines = void 0;
		self.containerState.initialBlankLine = void 0;
		return effects.attempt(indentConstruct, ok, notInCurrentItem)(code);
	}
	/** @type {State} */
	function notInCurrentItem(code) {
		self.containerState._closeFlow = true;
		self.interrupt = void 0;
		return factorySpace(effects, effects.attempt(list, ok, nok), "linePrefix", self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code);
	}
}
/**
* @type {Tokenizer}
* @this {TokenizeContext}
*/
function tokenizeIndent(effects, ok, nok) {
	const self = this;
	return factorySpace(effects, afterPrefix, "listItemIndent", self.containerState.size + 1);
	/** @type {State} */
	function afterPrefix(code) {
		const tail = self.events[self.events.length - 1];
		return tail && tail[1].type === "listItemIndent" && tail[2].sliceSerialize(tail[1], true).length === self.containerState.size ? ok(code) : nok(code);
	}
}
/**
* @type {Exiter}
* @this {TokenizeContext}
*/
function tokenizeListEnd(effects) {
	effects.exit(this.containerState.type);
}
/**
* @type {Tokenizer}
* @this {TokenizeContext}
*/
function tokenizeListItemPrefixWhitespace(effects, ok, nok) {
	const self = this;
	return factorySpace(effects, afterPrefix, "listItemPrefixWhitespace", self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
	/** @type {State} */
	function afterPrefix(code) {
		const tail = self.events[self.events.length - 1];
		return !markdownSpace(code) && tail && tail[1].type === "listItemPrefixWhitespace" ? ok(code) : nok(code);
	}
}
var list, listItemPrefixWhitespaceConstruct, indentConstruct;
var init_list = __esmMin((() => {
	init_micromark_factory_space();
	init_micromark_util_character();
	init_blank_line();
	init_thematic_break();
	list = {
		name: "list",
		tokenize: tokenizeListStart,
		continuation: { tokenize: tokenizeListContinuation },
		exit: tokenizeListEnd
	};
	listItemPrefixWhitespaceConstruct = {
		tokenize: tokenizeListItemPrefixWhitespace,
		partial: true
	};
	indentConstruct = {
		tokenize: tokenizeIndent,
		partial: true
	};
}));
//#endregion
//#region ../../node_modules/mermaid/node_modules/micromark-core-commonmark/lib/setext-underline.js
/** @type {Resolver} */
function resolveToSetextUnderline(events, context) {
	let index = events.length;
	/** @type {number | undefined} */
	let content;
	/** @type {number | undefined} */
	let text;
	/** @type {number | undefined} */
	let definition;
	while (index--) if (events[index][0] === "enter") {
		if (events[index][1].type === "content") {
			content = index;
			break;
		}
		if (events[index][1].type === "paragraph") text = index;
	} else {
		if (events[index][1].type === "content") events.splice(index, 1);
		if (!definition && events[index][1].type === "definition") definition = index;
	}
	const heading = {
		type: "setextHeading",
		start: Object.assign({}, events[text][1].start),
		end: Object.assign({}, events[events.length - 1][1].end)
	};
	events[text][1].type = "setextHeadingText";
	if (definition) {
		events.splice(text, 0, [
			"enter",
			heading,
			context
		]);
		events.splice(definition + 1, 0, [
			"exit",
			events[content][1],
			context
		]);
		events[content][1].end = Object.assign({}, events[definition][1].end);
	} else events[content][1] = heading;
	events.push([
		"exit",
		heading,
		context
	]);
	return events;
}
/**
* @this {TokenizeContext}
* @type {Tokenizer}
*/
function tokenizeSetextUnderline(effects, ok, nok) {
	const self = this;
	/** @type {NonNullable<Code>} */
	let marker;
	return start;
	/**
	* At start of heading (setext) underline.
	*
	* ```markdown
	*   | aa
	* > | ==
	*     ^
	* ```
	*
	* @type {State}
	*/
	function start(code) {
		let index = self.events.length;
		/** @type {boolean | undefined} */
		let paragraph;
		while (index--) if (self.events[index][1].type !== "lineEnding" && self.events[index][1].type !== "linePrefix" && self.events[index][1].type !== "content") {
			paragraph = self.events[index][1].type === "paragraph";
			break;
		}
		if (!self.parser.lazy[self.now().line] && (self.interrupt || paragraph)) {
			effects.enter("setextHeadingLine");
			marker = code;
			return before(code);
		}
		return nok(code);
	}
	/**
	* After optional whitespace, at `-` or `=`.
	*
	* ```markdown
	*   | aa
	* > | ==
	*     ^
	* ```
	*
	* @type {State}
	*/
	function before(code) {
		effects.enter("setextHeadingLineSequence");
		return inside(code);
	}
	/**
	* In sequence.
	*
	* ```markdown
	*   | aa
	* > | ==
	*     ^
	* ```
	*
	* @type {State}
	*/
	function inside(code) {
		if (code === marker) {
			effects.consume(code);
			return inside;
		}
		effects.exit("setextHeadingLineSequence");
		return markdownSpace(code) ? factorySpace(effects, after, "lineSuffix")(code) : after(code);
	}
	/**
	* After sequence, after optional whitespace.
	*
	* ```markdown
	*   | aa
	* > | ==
	*       ^
	* ```
	*
	* @type {State}
	*/
	function after(code) {
		if (code === null || markdownLineEnding(code)) {
			effects.exit("setextHeadingLine");
			return ok(code);
		}
		return nok(code);
	}
}
var setextUnderline;
var init_setext_underline = __esmMin((() => {
	init_micromark_factory_space();
	init_micromark_util_character();
	setextUnderline = {
		name: "setextUnderline",
		tokenize: tokenizeSetextUnderline,
		resolveTo: resolveToSetextUnderline
	};
}));
//#endregion
//#region ../../node_modules/mermaid/node_modules/micromark-core-commonmark/index.js
var init_micromark_core_commonmark = __esmMin((() => {
	init_attention();
	init_autolink();
	init_blank_line();
	init_block_quote();
	init_character_escape();
	init_character_reference();
	init_code_fenced();
	init_code_indented();
	init_code_text();
	init_content();
	init_definition();
	init_hard_break_escape();
	init_heading_atx();
	init_html_flow();
	init_html_text();
	init_label_end();
	init_label_start_image();
	init_label_start_link();
	init_line_ending();
	init_list();
	init_setext_underline();
	init_thematic_break();
}));
//#endregion
//#region ../../node_modules/mermaid/node_modules/micromark/lib/initialize/flow.js
/**
* @this {TokenizeContext}
* @type {Initializer}
*/
function initializeFlow(effects) {
	const self = this;
	const initial = effects.attempt(blankLine, atBlankEnding, effects.attempt(this.parser.constructs.flowInitial, afterConstruct, factorySpace(effects, effects.attempt(this.parser.constructs.flow, afterConstruct, effects.attempt(content, afterConstruct)), "linePrefix")));
	return initial;
	/** @type {State} */
	function atBlankEnding(code) {
		if (code === null) {
			effects.consume(code);
			return;
		}
		effects.enter("lineEndingBlank");
		effects.consume(code);
		effects.exit("lineEndingBlank");
		self.currentConstruct = void 0;
		return initial;
	}
	/** @type {State} */
	function afterConstruct(code) {
		if (code === null) {
			effects.consume(code);
			return;
		}
		effects.enter("lineEnding");
		effects.consume(code);
		effects.exit("lineEnding");
		self.currentConstruct = void 0;
		return initial;
	}
}
var flow$1;
var init_flow = __esmMin((() => {
	init_micromark_core_commonmark();
	init_micromark_factory_space();
	flow$1 = { tokenize: initializeFlow };
}));
//#endregion
//#region ../../node_modules/mermaid/node_modules/micromark/lib/initialize/text.js
/**
* @param {'string' | 'text'} field
* @returns {InitialConstruct}
*/
function initializeFactory(field) {
	return {
		tokenize: initializeText,
		resolveAll: createResolver(field === "text" ? resolveAllLineSuffixes : void 0)
	};
	/**
	* @this {TokenizeContext}
	* @type {Initializer}
	*/
	function initializeText(effects) {
		const self = this;
		const constructs = this.parser.constructs[field];
		const text = effects.attempt(constructs, start, notText);
		return start;
		/** @type {State} */
		function start(code) {
			return atBreak(code) ? text(code) : notText(code);
		}
		/** @type {State} */
		function notText(code) {
			if (code === null) {
				effects.consume(code);
				return;
			}
			effects.enter("data");
			effects.consume(code);
			return data;
		}
		/** @type {State} */
		function data(code) {
			if (atBreak(code)) {
				effects.exit("data");
				return text(code);
			}
			effects.consume(code);
			return data;
		}
		/**
		* @param {Code} code
		* @returns {boolean}
		*/
		function atBreak(code) {
			if (code === null) return true;
			const list = constructs[code];
			let index = -1;
			if (list) while (++index < list.length) {
				const item = list[index];
				if (!item.previous || item.previous.call(self, self.previous)) return true;
			}
			return false;
		}
	}
}
/**
* @param {Resolver | undefined} [extraResolver]
* @returns {Resolver}
*/
function createResolver(extraResolver) {
	return resolveAllText;
	/** @type {Resolver} */
	function resolveAllText(events, context) {
		let index = -1;
		/** @type {number | undefined} */
		let enter;
		while (++index <= events.length) if (enter === void 0) {
			if (events[index] && events[index][1].type === "data") {
				enter = index;
				index++;
			}
		} else if (!events[index] || events[index][1].type !== "data") {
			if (index !== enter + 2) {
				events[enter][1].end = events[index - 1][1].end;
				events.splice(enter + 2, index - enter - 2);
				index = enter + 2;
			}
			enter = void 0;
		}
		return extraResolver ? extraResolver(events, context) : events;
	}
}
/**
* A rather ugly set of instructions which again looks at chunks in the input
* stream.
* The reason to do this here is that it is *much* faster to parse in reverse.
* And that we can’t hook into `null` to split the line suffix before an EOF.
* To do: figure out if we can make this into a clean utility, or even in core.
* As it will be useful for GFMs literal autolink extension (and maybe even
* tables?)
*
* @type {Resolver}
*/
function resolveAllLineSuffixes(events, context) {
	let eventIndex = 0;
	while (++eventIndex <= events.length) if ((eventIndex === events.length || events[eventIndex][1].type === "lineEnding") && events[eventIndex - 1][1].type === "data") {
		const data = events[eventIndex - 1][1];
		const chunks = context.sliceStream(data);
		let index = chunks.length;
		let bufferIndex = -1;
		let size = 0;
		/** @type {boolean | undefined} */
		let tabs;
		while (index--) {
			const chunk = chunks[index];
			if (typeof chunk === "string") {
				bufferIndex = chunk.length;
				while (chunk.charCodeAt(bufferIndex - 1) === 32) {
					size++;
					bufferIndex--;
				}
				if (bufferIndex) break;
				bufferIndex = -1;
			} else if (chunk === -2) {
				tabs = true;
				size++;
			} else if (chunk === -1) {} else {
				index++;
				break;
			}
		}
		if (size) {
			const token = {
				type: eventIndex === events.length || tabs || size < 2 ? "lineSuffix" : "hardBreakTrailing",
				start: {
					line: data.end.line,
					column: data.end.column - size,
					offset: data.end.offset - size,
					_index: data.start._index + index,
					_bufferIndex: index ? bufferIndex : data.start._bufferIndex + bufferIndex
				},
				end: Object.assign({}, data.end)
			};
			data.end = Object.assign({}, token.start);
			if (data.start.offset === data.end.offset) Object.assign(data, token);
			else {
				events.splice(eventIndex, 0, [
					"enter",
					token,
					context
				], [
					"exit",
					token,
					context
				]);
				eventIndex += 2;
			}
		}
		eventIndex++;
	}
	return events;
}
var resolver, string$1, text$1;
var init_text = __esmMin((() => {
	resolver = { resolveAll: createResolver() };
	string$1 = initializeFactory("string");
	text$1 = initializeFactory("text");
}));
//#endregion
//#region ../../node_modules/mermaid/node_modules/micromark/lib/create-tokenizer.js
/**
* Create a tokenizer.
* Tokenizers deal with one type of data (e.g., containers, flow, text).
* The parser is the object dealing with it all.
* `initialize` works like other constructs, except that only its `tokenize`
* function is used, in which case it doesn’t receive an `ok` or `nok`.
* `from` can be given to set the point before the first character, although
* when further lines are indented, they must be set with `defineSkip`.
*
* @param {ParseContext} parser
* @param {InitialConstruct} initialize
* @param {Omit<Point, '_bufferIndex' | '_index'> | undefined} [from]
* @returns {TokenizeContext}
*/
function createTokenizer(parser, initialize, from) {
	/** @type {Point} */
	let point = Object.assign(from ? Object.assign({}, from) : {
		line: 1,
		column: 1,
		offset: 0
	}, {
		_index: 0,
		_bufferIndex: -1
	});
	/** @type {Record<string, number>} */
	const columnStart = {};
	/** @type {Array<Construct>} */
	const resolveAllConstructs = [];
	/** @type {Array<Chunk>} */
	let chunks = [];
	/** @type {Array<Token>} */
	let stack = [];
	/**
	* Tools used for tokenizing.
	*
	* @type {Effects}
	*/
	const effects = {
		consume,
		enter,
		exit,
		attempt: constructFactory(onsuccessfulconstruct),
		check: constructFactory(onsuccessfulcheck),
		interrupt: constructFactory(onsuccessfulcheck, { interrupt: true })
	};
	/**
	* State and tools for resolving and serializing.
	*
	* @type {TokenizeContext}
	*/
	const context = {
		previous: null,
		code: null,
		containerState: {},
		events: [],
		parser,
		sliceStream,
		sliceSerialize,
		now,
		defineSkip,
		write
	};
	/**
	* The state function.
	*
	* @type {State | void}
	*/
	let state = initialize.tokenize.call(context, effects);
	if (initialize.resolveAll) resolveAllConstructs.push(initialize);
	return context;
	/** @type {TokenizeContext['write']} */
	function write(slice) {
		chunks = push(chunks, slice);
		main();
		if (chunks[chunks.length - 1] !== null) return [];
		addResult(initialize, 0);
		context.events = resolveAll(resolveAllConstructs, context.events, context);
		return context.events;
	}
	/** @type {TokenizeContext['sliceSerialize']} */
	function sliceSerialize(token, expandTabs) {
		return serializeChunks(sliceStream(token), expandTabs);
	}
	/** @type {TokenizeContext['sliceStream']} */
	function sliceStream(token) {
		return sliceChunks(chunks, token);
	}
	/** @type {TokenizeContext['now']} */
	function now() {
		const { line, column, offset, _index, _bufferIndex } = point;
		return {
			line,
			column,
			offset,
			_index,
			_bufferIndex
		};
	}
	/** @type {TokenizeContext['defineSkip']} */
	function defineSkip(value) {
		columnStart[value.line] = value.column;
		accountForPotentialSkip();
	}
	/**
	* Main loop (note that `_index` and `_bufferIndex` in `point` are modified by
	* `consume`).
	* Here is where we walk through the chunks, which either include strings of
	* several characters, or numerical character codes.
	* The reason to do this in a loop instead of a call is so the stack can
	* drain.
	*
	* @returns {void}
	*/
	function main() {
		/** @type {number} */
		let chunkIndex;
		while (point._index < chunks.length) {
			const chunk = chunks[point._index];
			if (typeof chunk === "string") {
				chunkIndex = point._index;
				if (point._bufferIndex < 0) point._bufferIndex = 0;
				while (point._index === chunkIndex && point._bufferIndex < chunk.length) go(chunk.charCodeAt(point._bufferIndex));
			} else go(chunk);
		}
	}
	/**
	* Deal with one code.
	*
	* @param {Code} code
	* @returns {void}
	*/
	function go(code) {
		state = state(code);
	}
	/** @type {Effects['consume']} */
	function consume(code) {
		if (markdownLineEnding(code)) {
			point.line++;
			point.column = 1;
			point.offset += code === -3 ? 2 : 1;
			accountForPotentialSkip();
		} else if (code !== -1) {
			point.column++;
			point.offset++;
		}
		if (point._bufferIndex < 0) point._index++;
		else {
			point._bufferIndex++;
			if (point._bufferIndex === chunks[point._index].length) {
				point._bufferIndex = -1;
				point._index++;
			}
		}
		context.previous = code;
	}
	/** @type {Effects['enter']} */
	function enter(type, fields) {
		/** @type {Token} */
		const token = fields || {};
		token.type = type;
		token.start = now();
		context.events.push([
			"enter",
			token,
			context
		]);
		stack.push(token);
		return token;
	}
	/** @type {Effects['exit']} */
	function exit(type) {
		const token = stack.pop();
		token.end = now();
		context.events.push([
			"exit",
			token,
			context
		]);
		return token;
	}
	/**
	* Use results.
	*
	* @type {ReturnHandle}
	*/
	function onsuccessfulconstruct(construct, info) {
		addResult(construct, info.from);
	}
	/**
	* Discard results.
	*
	* @type {ReturnHandle}
	*/
	function onsuccessfulcheck(_, info) {
		info.restore();
	}
	/**
	* Factory to attempt/check/interrupt.
	*
	* @param {ReturnHandle} onreturn
	* @param {{interrupt?: boolean | undefined} | undefined} [fields]
	*/
	function constructFactory(onreturn, fields) {
		return hook;
		/**
		* Handle either an object mapping codes to constructs, a list of
		* constructs, or a single construct.
		*
		* @param {Array<Construct> | Construct | ConstructRecord} constructs
		* @param {State} returnState
		* @param {State | undefined} [bogusState]
		* @returns {State}
		*/
		function hook(constructs, returnState, bogusState) {
			/** @type {Array<Construct>} */
			let listOfConstructs;
			/** @type {number} */
			let constructIndex;
			/** @type {Construct} */
			let currentConstruct;
			/** @type {Info} */
			let info;
			return Array.isArray(constructs) ? handleListOfConstructs(constructs) : "tokenize" in constructs ? handleListOfConstructs([constructs]) : handleMapOfConstructs(constructs);
			/**
			* Handle a list of construct.
			*
			* @param {ConstructRecord} map
			* @returns {State}
			*/
			function handleMapOfConstructs(map) {
				return start;
				/** @type {State} */
				function start(code) {
					const def = code !== null && map[code];
					const all = code !== null && map.null;
					return handleListOfConstructs([...Array.isArray(def) ? def : def ? [def] : [], ...Array.isArray(all) ? all : all ? [all] : []])(code);
				}
			}
			/**
			* Handle a list of construct.
			*
			* @param {Array<Construct>} list
			* @returns {State}
			*/
			function handleListOfConstructs(list) {
				listOfConstructs = list;
				constructIndex = 0;
				if (list.length === 0) return bogusState;
				return handleConstruct(list[constructIndex]);
			}
			/**
			* Handle a single construct.
			*
			* @param {Construct} construct
			* @returns {State}
			*/
			function handleConstruct(construct) {
				return start;
				/** @type {State} */
				function start(code) {
					info = store();
					currentConstruct = construct;
					if (!construct.partial) context.currentConstruct = construct;
					if (construct.name && context.parser.constructs.disable.null.includes(construct.name)) return nok(code);
					return construct.tokenize.call(fields ? Object.assign(Object.create(context), fields) : context, effects, ok, nok)(code);
				}
			}
			/** @type {State} */
			function ok(code) {
				onreturn(currentConstruct, info);
				return returnState;
			}
			/** @type {State} */
			function nok(code) {
				info.restore();
				if (++constructIndex < listOfConstructs.length) return handleConstruct(listOfConstructs[constructIndex]);
				return bogusState;
			}
		}
	}
	/**
	* @param {Construct} construct
	* @param {number} from
	* @returns {void}
	*/
	function addResult(construct, from) {
		if (construct.resolveAll && !resolveAllConstructs.includes(construct)) resolveAllConstructs.push(construct);
		if (construct.resolve) splice(context.events, from, context.events.length - from, construct.resolve(context.events.slice(from), context));
		if (construct.resolveTo) context.events = construct.resolveTo(context.events, context);
	}
	/**
	* Store state.
	*
	* @returns {Info}
	*/
	function store() {
		const startPoint = now();
		const startPrevious = context.previous;
		const startCurrentConstruct = context.currentConstruct;
		const startEventsIndex = context.events.length;
		const startStack = Array.from(stack);
		return {
			restore,
			from: startEventsIndex
		};
		/**
		* Restore state.
		*
		* @returns {void}
		*/
		function restore() {
			point = startPoint;
			context.previous = startPrevious;
			context.currentConstruct = startCurrentConstruct;
			context.events.length = startEventsIndex;
			stack = startStack;
			accountForPotentialSkip();
		}
	}
	/**
	* Move the current point a bit forward in the line when it’s on a column
	* skip.
	*
	* @returns {void}
	*/
	function accountForPotentialSkip() {
		if (point.line in columnStart && point.column < 2) {
			point.column = columnStart[point.line];
			point.offset += columnStart[point.line] - 1;
		}
	}
}
/**
* Get the chunks from a slice of chunks in the range of a token.
*
* @param {Array<Chunk>} chunks
* @param {Pick<Token, 'end' | 'start'>} token
* @returns {Array<Chunk>}
*/
function sliceChunks(chunks, token) {
	const startIndex = token.start._index;
	const startBufferIndex = token.start._bufferIndex;
	const endIndex = token.end._index;
	const endBufferIndex = token.end._bufferIndex;
	/** @type {Array<Chunk>} */
	let view;
	if (startIndex === endIndex) view = [chunks[startIndex].slice(startBufferIndex, endBufferIndex)];
	else {
		view = chunks.slice(startIndex, endIndex);
		if (startBufferIndex > -1) {
			const head = view[0];
			if (typeof head === "string") view[0] = head.slice(startBufferIndex);
			else view.shift();
		}
		if (endBufferIndex > 0) view.push(chunks[endIndex].slice(0, endBufferIndex));
	}
	return view;
}
/**
* Get the string value of a slice of chunks.
*
* @param {Array<Chunk>} chunks
* @param {boolean | undefined} [expandTabs=false]
* @returns {string}
*/
function serializeChunks(chunks, expandTabs) {
	let index = -1;
	/** @type {Array<string>} */
	const result = [];
	/** @type {boolean | undefined} */
	let atTab;
	while (++index < chunks.length) {
		const chunk = chunks[index];
		/** @type {string} */
		let value;
		if (typeof chunk === "string") value = chunk;
		else switch (chunk) {
			case -5:
				value = "\r";
				break;
			case -4:
				value = "\n";
				break;
			case -3:
				value = "\r\n";
				break;
			case -2:
				value = expandTabs ? " " : "	";
				break;
			case -1:
				if (!expandTabs && atTab) continue;
				value = " ";
				break;
			default: value = String.fromCharCode(chunk);
		}
		atTab = chunk === -2;
		result.push(value);
	}
	return result.join("");
}
var init_create_tokenizer = __esmMin((() => {
	init_micromark_util_character();
	init_micromark_util_chunked();
	init_micromark_util_resolve_all();
}));
//#endregion
//#region ../../node_modules/mermaid/node_modules/micromark/lib/constructs.js
var constructs_exports = /* @__PURE__ */ __exportAll({
	attentionMarkers: () => attentionMarkers,
	contentInitial: () => contentInitial,
	disable: () => disable,
	document: () => document,
	flow: () => flow,
	flowInitial: () => flowInitial,
	insideSpan: () => insideSpan,
	string: () => string,
	text: () => text
});
var document, contentInitial, flowInitial, flow, string, text, insideSpan, attentionMarkers, disable;
var init_constructs = __esmMin((() => {
	init_micromark_core_commonmark();
	init_text();
	document = {
		[42]: list,
		[43]: list,
		[45]: list,
		[48]: list,
		[49]: list,
		[50]: list,
		[51]: list,
		[52]: list,
		[53]: list,
		[54]: list,
		[55]: list,
		[56]: list,
		[57]: list,
		[62]: blockQuote
	};
	contentInitial = { [91]: definition };
	flowInitial = {
		[-2]: codeIndented,
		[-1]: codeIndented,
		[32]: codeIndented
	};
	flow = {
		[35]: headingAtx,
		[42]: thematicBreak,
		[45]: [setextUnderline, thematicBreak],
		[60]: htmlFlow,
		[61]: setextUnderline,
		[95]: thematicBreak,
		[96]: codeFenced,
		[126]: codeFenced
	};
	string = {
		[38]: characterReference,
		[92]: characterEscape
	};
	text = {
		[-5]: lineEnding,
		[-4]: lineEnding,
		[-3]: lineEnding,
		[33]: labelStartImage,
		[38]: characterReference,
		[42]: attention,
		[60]: [autolink, htmlText],
		[91]: labelStartLink,
		[92]: [hardBreakEscape, characterEscape],
		[93]: labelEnd,
		[95]: attention,
		[96]: codeText
	};
	insideSpan = { null: [attention, resolver] };
	attentionMarkers = { null: [42, 95] };
	disable = { null: [] };
}));
//#endregion
//#region ../../node_modules/mermaid/node_modules/micromark/lib/parse.js
/**
* @param {ParseOptions | null | undefined} [options]
* @returns {ParseContext}
*/
function parse(options) {
	/** @type {ParseContext} */
	const parser = {
		defined: [],
		lazy: {},
		constructs: combineExtensions([constructs_exports, ...(options || {}).extensions || []]),
		content: create(content$1),
		document: create(document$1),
		flow: create(flow$1),
		string: create(string$1),
		text: create(text$1)
	};
	return parser;
	/**
	* @param {InitialConstruct} initial
	*/
	function create(initial) {
		return creator;
		/** @type {Create} */
		function creator(from) {
			return createTokenizer(parser, initial, from);
		}
	}
}
var init_parse = __esmMin((() => {
	init_micromark_util_combine_extensions();
	init_content$1();
	init_document();
	init_flow();
	init_text();
	init_create_tokenizer();
	init_constructs();
}));
//#endregion
//#region ../../node_modules/mermaid/node_modules/micromark/lib/preprocess.js
/**
* @returns {Preprocessor}
*/
function preprocess() {
	let column = 1;
	let buffer = "";
	/** @type {boolean | undefined} */
	let start = true;
	/** @type {boolean | undefined} */
	let atCarriageReturn;
	return preprocessor;
	/** @type {Preprocessor} */
	function preprocessor(value, encoding, end) {
		/** @type {Array<Chunk>} */
		const chunks = [];
		/** @type {RegExpMatchArray | null} */
		let match;
		/** @type {number} */
		let next;
		/** @type {number} */
		let startPosition;
		/** @type {number} */
		let endPosition;
		/** @type {Code} */
		let code;
		value = buffer + value.toString(encoding);
		startPosition = 0;
		buffer = "";
		if (start) {
			if (value.charCodeAt(0) === 65279) startPosition++;
			start = void 0;
		}
		while (startPosition < value.length) {
			search.lastIndex = startPosition;
			match = search.exec(value);
			endPosition = match && match.index !== void 0 ? match.index : value.length;
			code = value.charCodeAt(endPosition);
			if (!match) {
				buffer = value.slice(startPosition);
				break;
			}
			if (code === 10 && startPosition === endPosition && atCarriageReturn) {
				chunks.push(-3);
				atCarriageReturn = void 0;
			} else {
				if (atCarriageReturn) {
					chunks.push(-5);
					atCarriageReturn = void 0;
				}
				if (startPosition < endPosition) {
					chunks.push(value.slice(startPosition, endPosition));
					column += endPosition - startPosition;
				}
				switch (code) {
					case 0:
						chunks.push(65533);
						column++;
						break;
					case 9:
						next = Math.ceil(column / 4) * 4;
						chunks.push(-2);
						while (column++ < next) chunks.push(-1);
						break;
					case 10:
						chunks.push(-4);
						column = 1;
						break;
					default:
						atCarriageReturn = true;
						column = 1;
				}
			}
			startPosition = endPosition + 1;
		}
		if (end) {
			if (atCarriageReturn) chunks.push(-5);
			if (buffer) chunks.push(buffer);
			chunks.push(null);
		}
		return chunks;
	}
}
var search;
var init_preprocess = __esmMin((() => {
	search = /[\0\t\n\r]/g;
}));
//#endregion
//#region ../../node_modules/mermaid/node_modules/micromark/lib/postprocess.js
/**
* @param {Array<Event>} events
* @returns {Array<Event>}
*/
function postprocess(events) {
	while (!subtokenize(events));
	return events;
}
var init_postprocess = __esmMin((() => {
	init_micromark_util_subtokenize();
}));
//#endregion
//#region ../../node_modules/mermaid/node_modules/mdast-util-from-markdown/lib/index.js
/**
* Note this compiler only understand complete buffering, not streaming.
*
* @param {Options | null | undefined} [options]
*/
function compiler(options) {
	/** @type {Config} */
	const config = {
		transforms: [],
		canContainEols: [
			"emphasis",
			"fragment",
			"heading",
			"paragraph",
			"strong"
		],
		enter: {
			autolink: opener(link),
			autolinkProtocol: onenterdata,
			autolinkEmail: onenterdata,
			atxHeading: opener(heading),
			blockQuote: opener(blockQuote),
			characterEscape: onenterdata,
			characterReference: onenterdata,
			codeFenced: opener(codeFlow),
			codeFencedFenceInfo: buffer,
			codeFencedFenceMeta: buffer,
			codeIndented: opener(codeFlow, buffer),
			codeText: opener(codeText, buffer),
			codeTextData: onenterdata,
			data: onenterdata,
			codeFlowValue: onenterdata,
			definition: opener(definition),
			definitionDestinationString: buffer,
			definitionLabelString: buffer,
			definitionTitleString: buffer,
			emphasis: opener(emphasis),
			hardBreakEscape: opener(hardBreak),
			hardBreakTrailing: opener(hardBreak),
			htmlFlow: opener(html, buffer),
			htmlFlowData: onenterdata,
			htmlText: opener(html, buffer),
			htmlTextData: onenterdata,
			image: opener(image),
			label: buffer,
			link: opener(link),
			listItem: opener(listItem),
			listItemValue: onenterlistitemvalue,
			listOrdered: opener(list, onenterlistordered),
			listUnordered: opener(list),
			paragraph: opener(paragraph),
			reference: onenterreference,
			referenceString: buffer,
			resourceDestinationString: buffer,
			resourceTitleString: buffer,
			setextHeading: opener(heading),
			strong: opener(strong),
			thematicBreak: opener(thematicBreak)
		},
		exit: {
			atxHeading: closer(),
			atxHeadingSequence: onexitatxheadingsequence,
			autolink: closer(),
			autolinkEmail: onexitautolinkemail,
			autolinkProtocol: onexitautolinkprotocol,
			blockQuote: closer(),
			characterEscapeValue: onexitdata,
			characterReferenceMarkerHexadecimal: onexitcharacterreferencemarker,
			characterReferenceMarkerNumeric: onexitcharacterreferencemarker,
			characterReferenceValue: onexitcharacterreferencevalue,
			codeFenced: closer(onexitcodefenced),
			codeFencedFence: onexitcodefencedfence,
			codeFencedFenceInfo: onexitcodefencedfenceinfo,
			codeFencedFenceMeta: onexitcodefencedfencemeta,
			codeFlowValue: onexitdata,
			codeIndented: closer(onexitcodeindented),
			codeText: closer(onexitcodetext),
			codeTextData: onexitdata,
			data: onexitdata,
			definition: closer(),
			definitionDestinationString: onexitdefinitiondestinationstring,
			definitionLabelString: onexitdefinitionlabelstring,
			definitionTitleString: onexitdefinitiontitlestring,
			emphasis: closer(),
			hardBreakEscape: closer(onexithardbreak),
			hardBreakTrailing: closer(onexithardbreak),
			htmlFlow: closer(onexithtmlflow),
			htmlFlowData: onexitdata,
			htmlText: closer(onexithtmltext),
			htmlTextData: onexitdata,
			image: closer(onexitimage),
			label: onexitlabel,
			labelText: onexitlabeltext,
			lineEnding: onexitlineending,
			link: closer(onexitlink),
			listItem: closer(),
			listOrdered: closer(),
			listUnordered: closer(),
			paragraph: closer(),
			referenceString: onexitreferencestring,
			resourceDestinationString: onexitresourcedestinationstring,
			resourceTitleString: onexitresourcetitlestring,
			resource: onexitresource,
			setextHeading: closer(onexitsetextheading),
			setextHeadingLineSequence: onexitsetextheadinglinesequence,
			setextHeadingText: onexitsetextheadingtext,
			strong: closer(),
			thematicBreak: closer()
		}
	};
	configure(config, (options || {}).mdastExtensions || []);
	/** @type {CompileData} */
	const data = {};
	return compile;
	/**
	* Turn micromark events into an mdast tree.
	*
	* @param {Array<Event>} events
	*   Events.
	* @returns {Root}
	*   mdast tree.
	*/
	function compile(events) {
		/** @type {Root} */
		let tree = {
			type: "root",
			children: []
		};
		/** @type {Omit<CompileContext, 'sliceSerialize'>} */
		const context = {
			stack: [tree],
			tokenStack: [],
			config,
			enter,
			exit,
			buffer,
			resume,
			setData,
			getData
		};
		/** @type {Array<number>} */
		const listStack = [];
		let index = -1;
		while (++index < events.length) if (events[index][1].type === "listOrdered" || events[index][1].type === "listUnordered") if (events[index][0] === "enter") listStack.push(index);
		else index = prepareList(events, listStack.pop(), index);
		index = -1;
		while (++index < events.length) {
			const handler = config[events[index][0]];
			if (own.call(handler, events[index][1].type)) handler[events[index][1].type].call(Object.assign({ sliceSerialize: events[index][2].sliceSerialize }, context), events[index][1]);
		}
		if (context.tokenStack.length > 0) {
			const tail = context.tokenStack[context.tokenStack.length - 1];
			(tail[1] || defaultOnError).call(context, void 0, tail[0]);
		}
		tree.position = {
			start: point(events.length > 0 ? events[0][1].start : {
				line: 1,
				column: 1,
				offset: 0
			}),
			end: point(events.length > 0 ? events[events.length - 2][1].end : {
				line: 1,
				column: 1,
				offset: 0
			})
		};
		index = -1;
		while (++index < config.transforms.length) tree = config.transforms[index](tree) || tree;
		return tree;
	}
	/**
	* @param {Array<Event>} events
	* @param {number} start
	* @param {number} length
	* @returns {number}
	*/
	function prepareList(events, start, length) {
		let index = start - 1;
		let containerBalance = -1;
		let listSpread = false;
		/** @type {Token | undefined} */
		let listItem;
		/** @type {number | undefined} */
		let lineIndex;
		/** @type {number | undefined} */
		let firstBlankLineIndex;
		/** @type {boolean | undefined} */
		let atMarker;
		while (++index <= length) {
			const event = events[index];
			if (event[1].type === "listUnordered" || event[1].type === "listOrdered" || event[1].type === "blockQuote") {
				if (event[0] === "enter") containerBalance++;
				else containerBalance--;
				atMarker = void 0;
			} else if (event[1].type === "lineEndingBlank") {
				if (event[0] === "enter") {
					if (listItem && !atMarker && !containerBalance && !firstBlankLineIndex) firstBlankLineIndex = index;
					atMarker = void 0;
				}
			} else if (event[1].type === "linePrefix" || event[1].type === "listItemValue" || event[1].type === "listItemMarker" || event[1].type === "listItemPrefix" || event[1].type === "listItemPrefixWhitespace") {} else atMarker = void 0;
			if (!containerBalance && event[0] === "enter" && event[1].type === "listItemPrefix" || containerBalance === -1 && event[0] === "exit" && (event[1].type === "listUnordered" || event[1].type === "listOrdered")) {
				if (listItem) {
					let tailIndex = index;
					lineIndex = void 0;
					while (tailIndex--) {
						const tailEvent = events[tailIndex];
						if (tailEvent[1].type === "lineEnding" || tailEvent[1].type === "lineEndingBlank") {
							if (tailEvent[0] === "exit") continue;
							if (lineIndex) {
								events[lineIndex][1].type = "lineEndingBlank";
								listSpread = true;
							}
							tailEvent[1].type = "lineEnding";
							lineIndex = tailIndex;
						} else if (tailEvent[1].type === "linePrefix" || tailEvent[1].type === "blockQuotePrefix" || tailEvent[1].type === "blockQuotePrefixWhitespace" || tailEvent[1].type === "blockQuoteMarker" || tailEvent[1].type === "listItemIndent") {} else break;
					}
					if (firstBlankLineIndex && (!lineIndex || firstBlankLineIndex < lineIndex)) listItem._spread = true;
					listItem.end = Object.assign({}, lineIndex ? events[lineIndex][1].start : event[1].end);
					events.splice(lineIndex || index, 0, [
						"exit",
						listItem,
						event[2]
					]);
					index++;
					length++;
				}
				if (event[1].type === "listItemPrefix") {
					listItem = {
						type: "listItem",
						_spread: false,
						start: Object.assign({}, event[1].start),
						end: void 0
					};
					events.splice(index, 0, [
						"enter",
						listItem,
						event[2]
					]);
					index++;
					length++;
					firstBlankLineIndex = void 0;
					atMarker = true;
				}
			}
		}
		events[start][1]._spread = listSpread;
		return length;
	}
	/**
	* Set data.
	*
	* @template {keyof CompileData} Key
	*   Field type.
	* @param {Key} key
	*   Key of field.
	* @param {CompileData[Key]} [value]
	*   New value.
	* @returns {void}
	*   Nothing.
	*/
	function setData(key, value) {
		data[key] = value;
	}
	/**
	* Get data.
	*
	* @template {keyof CompileData} Key
	*   Field type.
	* @param {Key} key
	*   Key of field.
	* @returns {CompileData[Key]}
	*   Value.
	*/
	function getData(key) {
		return data[key];
	}
	/**
	* Create an opener handle.
	*
	* @param {(token: Token) => Node} create
	*   Create a node.
	* @param {Handle} [and]
	*   Optional function to also run.
	* @returns {Handle}
	*   Handle.
	*/
	function opener(create, and) {
		return open;
		/**
		* @this {CompileContext}
		* @param {Token} token
		* @returns {void}
		*/
		function open(token) {
			enter.call(this, create(token), token);
			if (and) and.call(this, token);
		}
	}
	/**
	* @this {CompileContext}
	* @returns {void}
	*/
	function buffer() {
		this.stack.push({
			type: "fragment",
			children: []
		});
	}
	/**
	* @template {Node} Kind
	*   Node type.
	* @this {CompileContext}
	*   Context.
	* @param {Kind} node
	*   Node to enter.
	* @param {Token} token
	*   Corresponding token.
	* @param {OnEnterError | undefined} [errorHandler]
	*   Handle the case where this token is open, but it is closed by something else.
	* @returns {Kind}
	*   The given node.
	*/
	function enter(node, token, errorHandler) {
		this.stack[this.stack.length - 1].children.push(node);
		this.stack.push(node);
		this.tokenStack.push([token, errorHandler]);
		node.position = { start: point(token.start) };
		return node;
	}
	/**
	* Create a closer handle.
	*
	* @param {Handle} [and]
	*   Optional function to also run.
	* @returns {Handle}
	*   Handle.
	*/
	function closer(and) {
		return close;
		/**
		* @this {CompileContext}
		* @param {Token} token
		* @returns {void}
		*/
		function close(token) {
			if (and) and.call(this, token);
			exit.call(this, token);
		}
	}
	/**
	* @this {CompileContext}
	*   Context.
	* @param {Token} token
	*   Corresponding token.
	* @param {OnExitError | undefined} [onExitError]
	*   Handle the case where another token is open.
	* @returns {Node}
	*   The closed node.
	*/
	function exit(token, onExitError) {
		const node = this.stack.pop();
		const open = this.tokenStack.pop();
		if (!open) throw new Error("Cannot close `" + token.type + "` (" + stringifyPosition({
			start: token.start,
			end: token.end
		}) + "): it’s not open");
		else if (open[0].type !== token.type) if (onExitError) onExitError.call(this, token, open[0]);
		else (open[1] || defaultOnError).call(this, token, open[0]);
		node.position.end = point(token.end);
		return node;
	}
	/**
	* @this {CompileContext}
	* @returns {string}
	*/
	function resume() {
		return toString(this.stack.pop());
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onenterlistordered() {
		setData("expectingFirstListItemValue", true);
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onenterlistitemvalue(token) {
		if (getData("expectingFirstListItemValue")) {
			const ancestor = this.stack[this.stack.length - 2];
			ancestor.start = Number.parseInt(this.sliceSerialize(token), 10);
			setData("expectingFirstListItemValue");
		}
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onexitcodefencedfenceinfo() {
		const data = this.resume();
		const node = this.stack[this.stack.length - 1];
		node.lang = data;
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onexitcodefencedfencemeta() {
		const data = this.resume();
		const node = this.stack[this.stack.length - 1];
		node.meta = data;
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onexitcodefencedfence() {
		if (getData("flowCodeInside")) return;
		this.buffer();
		setData("flowCodeInside", true);
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onexitcodefenced() {
		const data = this.resume();
		const node = this.stack[this.stack.length - 1];
		node.value = data.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, "");
		setData("flowCodeInside");
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onexitcodeindented() {
		const data = this.resume();
		const node = this.stack[this.stack.length - 1];
		node.value = data.replace(/(\r?\n|\r)$/g, "");
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onexitdefinitionlabelstring(token) {
		const label = this.resume();
		const node = this.stack[this.stack.length - 1];
		node.label = label;
		node.identifier = normalizeIdentifier(this.sliceSerialize(token)).toLowerCase();
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onexitdefinitiontitlestring() {
		const data = this.resume();
		const node = this.stack[this.stack.length - 1];
		node.title = data;
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onexitdefinitiondestinationstring() {
		const data = this.resume();
		const node = this.stack[this.stack.length - 1];
		node.url = data;
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onexitatxheadingsequence(token) {
		const node = this.stack[this.stack.length - 1];
		if (!node.depth) node.depth = this.sliceSerialize(token).length;
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onexitsetextheadingtext() {
		setData("setextHeadingSlurpLineEnding", true);
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onexitsetextheadinglinesequence(token) {
		const node = this.stack[this.stack.length - 1];
		node.depth = this.sliceSerialize(token).charCodeAt(0) === 61 ? 1 : 2;
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onexitsetextheading() {
		setData("setextHeadingSlurpLineEnding");
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onenterdata(token) {
		const node = this.stack[this.stack.length - 1];
		let tail = node.children[node.children.length - 1];
		if (!tail || tail.type !== "text") {
			tail = text();
			tail.position = { start: point(token.start) };
			node.children.push(tail);
		}
		this.stack.push(tail);
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onexitdata(token) {
		const tail = this.stack.pop();
		tail.value += this.sliceSerialize(token);
		tail.position.end = point(token.end);
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onexitlineending(token) {
		const context = this.stack[this.stack.length - 1];
		if (getData("atHardBreak")) {
			const tail = context.children[context.children.length - 1];
			tail.position.end = point(token.end);
			setData("atHardBreak");
			return;
		}
		if (!getData("setextHeadingSlurpLineEnding") && config.canContainEols.includes(context.type)) {
			onenterdata.call(this, token);
			onexitdata.call(this, token);
		}
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onexithardbreak() {
		setData("atHardBreak", true);
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onexithtmlflow() {
		const data = this.resume();
		const node = this.stack[this.stack.length - 1];
		node.value = data;
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onexithtmltext() {
		const data = this.resume();
		const node = this.stack[this.stack.length - 1];
		node.value = data;
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onexitcodetext() {
		const data = this.resume();
		const node = this.stack[this.stack.length - 1];
		node.value = data;
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onexitlink() {
		const node = this.stack[this.stack.length - 1];
		if (getData("inReference")) {
			/** @type {ReferenceType} */
			const referenceType = getData("referenceType") || "shortcut";
			node.type += "Reference";
			node.referenceType = referenceType;
			delete node.url;
			delete node.title;
		} else {
			delete node.identifier;
			delete node.label;
		}
		setData("referenceType");
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onexitimage() {
		const node = this.stack[this.stack.length - 1];
		if (getData("inReference")) {
			/** @type {ReferenceType} */
			const referenceType = getData("referenceType") || "shortcut";
			node.type += "Reference";
			node.referenceType = referenceType;
			delete node.url;
			delete node.title;
		} else {
			delete node.identifier;
			delete node.label;
		}
		setData("referenceType");
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onexitlabeltext(token) {
		const string = this.sliceSerialize(token);
		const ancestor = this.stack[this.stack.length - 2];
		ancestor.label = decodeString(string);
		ancestor.identifier = normalizeIdentifier(string).toLowerCase();
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onexitlabel() {
		const fragment = this.stack[this.stack.length - 1];
		const value = this.resume();
		const node = this.stack[this.stack.length - 1];
		setData("inReference", true);
		if (node.type === "link") node.children = fragment.children;
		else node.alt = value;
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onexitresourcedestinationstring() {
		const data = this.resume();
		const node = this.stack[this.stack.length - 1];
		node.url = data;
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onexitresourcetitlestring() {
		const data = this.resume();
		const node = this.stack[this.stack.length - 1];
		node.title = data;
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onexitresource() {
		setData("inReference");
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onenterreference() {
		setData("referenceType", "collapsed");
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onexitreferencestring(token) {
		const label = this.resume();
		const node = this.stack[this.stack.length - 1];
		node.label = label;
		node.identifier = normalizeIdentifier(this.sliceSerialize(token)).toLowerCase();
		setData("referenceType", "full");
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onexitcharacterreferencemarker(token) {
		setData("characterReferenceType", token.type);
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onexitcharacterreferencevalue(token) {
		const data = this.sliceSerialize(token);
		const type = getData("characterReferenceType");
		/** @type {string} */
		let value;
		if (type) {
			value = decodeNumericCharacterReference(data, type === "characterReferenceMarkerNumeric" ? 10 : 16);
			setData("characterReferenceType");
		} else value = decodeNamedCharacterReference(data);
		const tail = this.stack.pop();
		tail.value += value;
		tail.position.end = point(token.end);
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onexitautolinkprotocol(token) {
		onexitdata.call(this, token);
		const node = this.stack[this.stack.length - 1];
		node.url = this.sliceSerialize(token);
	}
	/**
	* @this {CompileContext}
	* @type {Handle}
	*/
	function onexitautolinkemail(token) {
		onexitdata.call(this, token);
		const node = this.stack[this.stack.length - 1];
		node.url = "mailto:" + this.sliceSerialize(token);
	}
	/** @returns {Blockquote} */
	function blockQuote() {
		return {
			type: "blockquote",
			children: []
		};
	}
	/** @returns {Code} */
	function codeFlow() {
		return {
			type: "code",
			lang: null,
			meta: null,
			value: ""
		};
	}
	/** @returns {InlineCode} */
	function codeText() {
		return {
			type: "inlineCode",
			value: ""
		};
	}
	/** @returns {Definition} */
	function definition() {
		return {
			type: "definition",
			identifier: "",
			label: null,
			title: null,
			url: ""
		};
	}
	/** @returns {Emphasis} */
	function emphasis() {
		return {
			type: "emphasis",
			children: []
		};
	}
	/** @returns {Heading} */
	function heading() {
		return {
			type: "heading",
			depth: void 0,
			children: []
		};
	}
	/** @returns {Break} */
	function hardBreak() {
		return { type: "break" };
	}
	/** @returns {HTML} */
	function html() {
		return {
			type: "html",
			value: ""
		};
	}
	/** @returns {Image} */
	function image() {
		return {
			type: "image",
			title: null,
			url: "",
			alt: null
		};
	}
	/** @returns {Link} */
	function link() {
		return {
			type: "link",
			title: null,
			url: "",
			children: []
		};
	}
	/**
	* @param {Token} token
	* @returns {List}
	*/
	function list(token) {
		return {
			type: "list",
			ordered: token.type === "listOrdered",
			start: null,
			spread: token._spread,
			children: []
		};
	}
	/**
	* @param {Token} token
	* @returns {ListItem}
	*/
	function listItem(token) {
		return {
			type: "listItem",
			spread: token._spread,
			checked: null,
			children: []
		};
	}
	/** @returns {Paragraph} */
	function paragraph() {
		return {
			type: "paragraph",
			children: []
		};
	}
	/** @returns {Strong} */
	function strong() {
		return {
			type: "strong",
			children: []
		};
	}
	/** @returns {Text} */
	function text() {
		return {
			type: "text",
			value: ""
		};
	}
	/** @returns {ThematicBreak} */
	function thematicBreak() {
		return { type: "thematicBreak" };
	}
}
/**
* Copy a point-like value.
*
* @param {Point} d
*   Point-like value.
* @returns {Point}
*   unist point.
*/
function point(d) {
	return {
		line: d.line,
		column: d.column,
		offset: d.offset
	};
}
/**
* @param {Config} combined
* @param {Array<Extension | Array<Extension>>} extensions
* @returns {void}
*/
function configure(combined, extensions) {
	let index = -1;
	while (++index < extensions.length) {
		const value = extensions[index];
		if (Array.isArray(value)) configure(combined, value);
		else extension(combined, value);
	}
}
/**
* @param {Config} combined
* @param {Extension} extension
* @returns {void}
*/
function extension(combined, extension) {
	/** @type {keyof Extension} */
	let key;
	for (key in extension) if (own.call(extension, key)) {
		if (key === "canContainEols") {
			const right = extension[key];
			if (right) combined[key].push(...right);
		} else if (key === "transforms") {
			const right = extension[key];
			if (right) combined[key].push(...right);
		} else if (key === "enter" || key === "exit") {
			const right = extension[key];
			if (right) Object.assign(combined[key], right);
		}
	}
}
/** @type {OnEnterError} */
function defaultOnError(left, right) {
	if (left) throw new Error("Cannot close `" + left.type + "` (" + stringifyPosition({
		start: left.start,
		end: left.end
	}) + "): a different token (`" + right.type + "`, " + stringifyPosition({
		start: right.start,
		end: right.end
	}) + ") is open");
	else throw new Error("Cannot close document, a token (`" + right.type + "`, " + stringifyPosition({
		start: right.start,
		end: right.end
	}) + ") is still open");
}
var own, fromMarkdown;
var init_lib = __esmMin((() => {
	init_mdast_util_to_string();
	init_parse();
	init_preprocess();
	init_postprocess();
	init_micromark_util_decode_numeric_character_reference();
	init_micromark_util_decode_string();
	init_micromark_util_normalize_identifier();
	init_index_dom();
	init_unist_util_stringify_position();
	own = {}.hasOwnProperty;
	fromMarkdown = function(value, encoding, options) {
		if (typeof encoding !== "string") {
			options = encoding;
			encoding = void 0;
		}
		return compiler(options)(postprocess(parse(options).document().write(preprocess()(value, encoding, true))));
	};
}));
//#endregion
//#region ../../node_modules/mermaid/node_modules/mdast-util-from-markdown/index.js
var init_mdast_util_from_markdown = __esmMin((() => {
	init_lib();
}));
//#endregion
//#region ../../node_modules/mermaid/dist/createText-31840e8c.js
function preprocessMarkdown(markdown) {
	return dedent(markdown.replace(/\n{2,}/g, "\n"));
}
function markdownToLines(markdown) {
	const { children } = fromMarkdown(preprocessMarkdown(markdown));
	const lines = [[]];
	let currentLine = 0;
	function processNode(node, parentType = "normal") {
		if (node.type === "text") node.value.split("\n").forEach((textLine, index) => {
			if (index !== 0) {
				currentLine++;
				lines.push([]);
			}
			textLine.split(" ").forEach((word) => {
				if (word) lines[currentLine].push({
					content: word,
					type: parentType
				});
			});
		});
		else if (node.type === "strong" || node.type === "emphasis") node.children.forEach((contentNode) => {
			processNode(contentNode, node.type);
		});
	}
	children.forEach((treeNode) => {
		if (treeNode.type === "paragraph") treeNode.children.forEach((contentNode) => {
			processNode(contentNode);
		});
	});
	return lines;
}
function markdownToHTML(markdown) {
	const { children } = fromMarkdown(markdown);
	function output(node) {
		if (node.type === "text") return node.value.replace(/\n/g, "<br/>");
		else if (node.type === "strong") return `<strong>${node.children.map(output).join("")}</strong>`;
		else if (node.type === "emphasis") return `<em>${node.children.map(output).join("")}</em>`;
		else if (node.type === "paragraph") return `<p>${node.children.map(output).join("")}</p>`;
		return `Unsupported markdown: ${node.type}`;
	}
	return children.map(output).join("");
}
function splitTextToChars(text) {
	if (Intl.Segmenter) return [...new Intl.Segmenter().segment(text)].map((s) => s.segment);
	return [...text];
}
function splitWordToFitWidth(checkFit, word) {
	return splitWordToFitWidthRecursion(checkFit, [], splitTextToChars(word.content), word.type);
}
function splitWordToFitWidthRecursion(checkFit, usedChars, remainingChars, type) {
	if (remainingChars.length === 0) return [{
		content: usedChars.join(""),
		type
	}, {
		content: "",
		type
	}];
	const [nextChar, ...rest] = remainingChars;
	const newWord = [...usedChars, nextChar];
	if (checkFit([{
		content: newWord.join(""),
		type
	}])) return splitWordToFitWidthRecursion(checkFit, newWord, rest, type);
	if (usedChars.length === 0 && nextChar) {
		usedChars.push(nextChar);
		remainingChars.shift();
	}
	return [{
		content: usedChars.join(""),
		type
	}, {
		content: remainingChars.join(""),
		type
	}];
}
function splitLineToFitWidth(line, checkFit) {
	if (line.some(({ content }) => content.includes("\n"))) throw new Error("splitLineToFitWidth does not support newlines in the line");
	return splitLineToFitWidthRecursion(line, checkFit);
}
function splitLineToFitWidthRecursion(words, checkFit, lines = [], newLine = []) {
	if (words.length === 0) {
		if (newLine.length > 0) lines.push(newLine);
		return lines.length > 0 ? lines : [];
	}
	let joiner = "";
	if (words[0].content === " ") {
		joiner = " ";
		words.shift();
	}
	const nextWord = words.shift() ?? {
		content: " ",
		type: "normal"
	};
	const lineWithNextWord = [...newLine];
	if (joiner !== "") lineWithNextWord.push({
		content: joiner,
		type: "normal"
	});
	lineWithNextWord.push(nextWord);
	if (checkFit(lineWithNextWord)) return splitLineToFitWidthRecursion(words, checkFit, lines, lineWithNextWord);
	if (newLine.length > 0) {
		lines.push(newLine);
		words.unshift(nextWord);
	} else if (nextWord.content) {
		const [line, rest] = splitWordToFitWidth(checkFit, nextWord);
		lines.push([line]);
		if (rest.content) words.unshift(rest);
	}
	return splitLineToFitWidthRecursion(words, checkFit, lines);
}
function applyStyle(dom, styleFn) {
	if (styleFn) dom.attr("style", styleFn);
}
function addHtmlSpan(element, node, width, classes, addBackground = false) {
	const fo = element.append("foreignObject");
	const div = fo.append("xhtml:div");
	const label = node.label;
	const labelClass = node.isNode ? "nodeLabel" : "edgeLabel";
	div.html(sanitizeText$2(`
    <span class="${labelClass} ${classes}" ` + (node.labelStyle ? "style=\"" + node.labelStyle + "\"" : "") + ">" + label + "</span>", getConfig$1()));
	applyStyle(div, node.labelStyle);
	div.style("display", "table-cell");
	div.style("white-space", "nowrap");
	div.style("max-width", width + "px");
	div.attr("xmlns", "http://www.w3.org/1999/xhtml");
	if (addBackground) div.attr("class", "labelBkg");
	let bbox = div.node().getBoundingClientRect();
	if (bbox.width === width) {
		div.style("display", "table");
		div.style("white-space", "break-spaces");
		div.style("width", width + "px");
		bbox = div.node().getBoundingClientRect();
	}
	fo.style("width", bbox.width);
	fo.style("height", bbox.height);
	return fo.node();
}
function createTspan(textElement, lineIndex, lineHeight) {
	return textElement.append("tspan").attr("class", "text-outer-tspan").attr("x", 0).attr("y", lineIndex * lineHeight - .1 + "em").attr("dy", lineHeight + "em");
}
function computeWidthOfText(parentNode, lineHeight, line) {
	const testElement = parentNode.append("text");
	const testSpan = createTspan(testElement, 1, lineHeight);
	updateTextContentAndStyles(testSpan, line);
	const textLength = testSpan.node().getComputedTextLength();
	testElement.remove();
	return textLength;
}
function computeDimensionOfText(parentNode, lineHeight, text) {
	var _a;
	const testElement = parentNode.append("text");
	const testSpan = createTspan(testElement, 1, lineHeight);
	updateTextContentAndStyles(testSpan, [{
		content: text,
		type: "normal"
	}]);
	const textDimension = (_a = testSpan.node()) == null ? void 0 : _a.getBoundingClientRect();
	if (textDimension) testElement.remove();
	return textDimension;
}
function createFormattedText(width, g, structuredText, addBackground = false) {
	const lineHeight = 1.1;
	const labelGroup = g.append("g");
	const bkg = labelGroup.insert("rect").attr("class", "background");
	const textElement = labelGroup.append("text").attr("y", "-10.1");
	let lineIndex = 0;
	for (const line of structuredText) {
		const checkWidth = (line2) => computeWidthOfText(labelGroup, lineHeight, line2) <= width;
		const linesUnderWidth = checkWidth(line) ? [line] : splitLineToFitWidth(line, checkWidth);
		for (const preparedLine of linesUnderWidth) {
			updateTextContentAndStyles(createTspan(textElement, lineIndex, lineHeight), preparedLine);
			lineIndex++;
		}
	}
	if (addBackground) {
		const bbox = textElement.node().getBBox();
		const padding = 2;
		bkg.attr("x", -padding).attr("y", -padding).attr("width", bbox.width + 2 * padding).attr("height", bbox.height + 2 * padding);
		return labelGroup.node();
	} else return textElement.node();
}
function updateTextContentAndStyles(tspan, wrappedLine) {
	tspan.text("");
	wrappedLine.forEach((word, index) => {
		const innerTspan = tspan.append("tspan").attr("font-style", word.type === "emphasis" ? "italic" : "normal").attr("class", "text-inner-tspan").attr("font-weight", word.type === "strong" ? "bold" : "normal");
		if (index === 0) innerTspan.text(word.content);
		else innerTspan.text(" " + word.content);
	});
}
var createText;
var init_createText_31840e8c = __esmMin((() => {
	init_mermaid_59c9be08();
	init_mdast_util_from_markdown();
	init_esm();
	createText = (el, text = "", { style = "", isTitle = false, classes = "", useHtmlLabels = true, isNode = true, width = 200, addSvgBackground = false } = {}) => {
		log$1.info("createText", text, style, isTitle, classes, useHtmlLabels, isNode, addSvgBackground);
		if (useHtmlLabels) return addHtmlSpan(el, {
			isNode,
			label: decodeEntities(markdownToHTML(text)).replace(/fa[blrs]?:fa-[\w-]+/g, (s) => `<i class='${s.replace(":", " ")}'></i>`),
			labelStyle: style.replace("fill:", "color:")
		}, width, classes, addSvgBackground);
		else return createFormattedText(width, el, markdownToLines(text), addSvgBackground);
	};
}));
//#endregion
export { createText as n, init_createText_31840e8c as r, computeDimensionOfText as t };
