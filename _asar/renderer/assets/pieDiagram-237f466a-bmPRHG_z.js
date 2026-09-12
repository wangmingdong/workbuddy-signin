import { n as __esmMin } from "./chunk-BRZcfu7K.js";
import { $ as arc_default, C as init_mermaid_59c9be08, Dt as require_dist, E as log$1, F as setAccTitle, J as init_src, L as setDiagramTitle, M as sanitizeText$2, N as selectSvgElement, O as parseFontSize, Ot as require_dayjs_min, P as setAccDescription, X as pie_default, _ as getConfig$1, a as cleanAndMerge, f as defaultConfig$2, g as getAccTitle, h as getAccDescription, l as configureSvgSize, o as clear$1, vt as ordinal, y as getDiagramTitle } from "./mermaid-59c9be08-DUdjYWP7.js";
import { t as init_purify_es } from "./purify.es-CUVKlOTh.js";
//#region ../../node_modules/mermaid/dist/pieDiagram-237f466a.js
var parser, parser$1, DEFAULT_PIE_CONFIG, DEFAULT_PIE_DB, sections, showData, config, getConfig, clear, addSection, getSections, cleanupValue, setShowData, getShowData, db, getStyles, styles, createPieArcs, draw, diagram;
//#endregion
__esmMin((() => {
	init_mermaid_59c9be08();
	init_src();
	require_dayjs_min();
	require_dist();
	init_purify_es();
	parser = function() {
		var o = function(k, v, o2, l) {
			for (o2 = o2 || {}, l = k.length; l--; o2[k[l]] = v);
			return o2;
		}, $V0 = [1, 3], $V1 = [1, 4], $V2 = [1, 5], $V3 = [1, 6], $V4 = [
			1,
			10,
			12,
			14,
			16,
			18,
			19,
			20,
			21,
			22
		], $V5 = [2, 4], $V6 = [
			1,
			5,
			10,
			12,
			14,
			16,
			18,
			19,
			20,
			21,
			22
		], $V7 = [
			20,
			21,
			22
		], $V8 = [2, 7], $V9 = [1, 12], $Va = [1, 13], $Vb = [1, 14], $Vc = [1, 15], $Vd = [1, 16], $Ve = [1, 17];
		var parser2 = {
			trace: function trace() {},
			yy: {},
			symbols_: {
				"error": 2,
				"start": 3,
				"eol": 4,
				"PIE": 5,
				"document": 6,
				"showData": 7,
				"line": 8,
				"statement": 9,
				"txt": 10,
				"value": 11,
				"title": 12,
				"title_value": 13,
				"acc_title": 14,
				"acc_title_value": 15,
				"acc_descr": 16,
				"acc_descr_value": 17,
				"acc_descr_multiline_value": 18,
				"section": 19,
				"NEWLINE": 20,
				";": 21,
				"EOF": 22,
				"$accept": 0,
				"$end": 1
			},
			terminals_: {
				2: "error",
				5: "PIE",
				7: "showData",
				10: "txt",
				11: "value",
				12: "title",
				13: "title_value",
				14: "acc_title",
				15: "acc_title_value",
				16: "acc_descr",
				17: "acc_descr_value",
				18: "acc_descr_multiline_value",
				19: "section",
				20: "NEWLINE",
				21: ";",
				22: "EOF"
			},
			productions_: [
				0,
				[3, 2],
				[3, 2],
				[3, 3],
				[6, 0],
				[6, 2],
				[8, 2],
				[9, 0],
				[9, 2],
				[9, 2],
				[9, 2],
				[9, 2],
				[9, 1],
				[9, 1],
				[4, 1],
				[4, 1],
				[4, 1]
			],
			performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$) {
				var $0 = $$.length - 1;
				switch (yystate) {
					case 3:
						yy.setShowData(true);
						break;
					case 6:
						this.$ = $$[$0 - 1];
						break;
					case 8:
						yy.addSection($$[$0 - 1], yy.cleanupValue($$[$0]));
						break;
					case 9:
						this.$ = $$[$0].trim();
						yy.setDiagramTitle(this.$);
						break;
					case 10:
						this.$ = $$[$0].trim();
						yy.setAccTitle(this.$);
						break;
					case 11:
					case 12:
						this.$ = $$[$0].trim();
						yy.setAccDescription(this.$);
						break;
					case 13:
						yy.addSection($$[$0].substr(8));
						this.$ = $$[$0].substr(8);
						break;
				}
			},
			table: [
				{
					3: 1,
					4: 2,
					5: $V0,
					20: $V1,
					21: $V2,
					22: $V3
				},
				{ 1: [3] },
				{
					3: 7,
					4: 2,
					5: $V0,
					20: $V1,
					21: $V2,
					22: $V3
				},
				o($V4, $V5, {
					6: 8,
					7: [1, 9]
				}),
				o($V6, [2, 14]),
				o($V6, [2, 15]),
				o($V6, [2, 16]),
				{ 1: [2, 1] },
				o($V7, $V8, {
					8: 10,
					9: 11,
					1: [2, 2],
					10: $V9,
					12: $Va,
					14: $Vb,
					16: $Vc,
					18: $Vd,
					19: $Ve
				}),
				o($V4, $V5, { 6: 18 }),
				o($V4, [2, 5]),
				{
					4: 19,
					20: $V1,
					21: $V2,
					22: $V3
				},
				{ 11: [1, 20] },
				{ 13: [1, 21] },
				{ 15: [1, 22] },
				{ 17: [1, 23] },
				o($V7, [2, 12]),
				o($V7, [2, 13]),
				o($V7, $V8, {
					8: 10,
					9: 11,
					1: [2, 3],
					10: $V9,
					12: $Va,
					14: $Vb,
					16: $Vc,
					18: $Vd,
					19: $Ve
				}),
				o($V4, [2, 6]),
				o($V7, [2, 8]),
				o($V7, [2, 9]),
				o($V7, [2, 10]),
				o($V7, [2, 11])
			],
			defaultActions: { 7: [2, 1] },
			parseError: function parseError(str, hash) {
				if (hash.recoverable) this.trace(str);
				else {
					var error = new Error(str);
					error.hash = hash;
					throw error;
				}
			},
			parse: function parse(input) {
				var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = "", yylineno = 0, yyleng = 0, TERROR = 2, EOF = 1;
				var args = lstack.slice.call(arguments, 1);
				var lexer2 = Object.create(this.lexer);
				var sharedState = { yy: {} };
				for (var k in this.yy) if (Object.prototype.hasOwnProperty.call(this.yy, k)) sharedState.yy[k] = this.yy[k];
				lexer2.setInput(input, sharedState.yy);
				sharedState.yy.lexer = lexer2;
				sharedState.yy.parser = this;
				if (typeof lexer2.yylloc == "undefined") lexer2.yylloc = {};
				var yyloc = lexer2.yylloc;
				lstack.push(yyloc);
				var ranges = lexer2.options && lexer2.options.ranges;
				if (typeof sharedState.yy.parseError === "function") this.parseError = sharedState.yy.parseError;
				else this.parseError = Object.getPrototypeOf(this).parseError;
				function lex() {
					var token = tstack.pop() || lexer2.lex() || EOF;
					if (typeof token !== "number") {
						if (token instanceof Array) {
							tstack = token;
							token = tstack.pop();
						}
						token = self.symbols_[token] || token;
					}
					return token;
				}
				var symbol, state, action, r, yyval = {}, p, len, newState, expected;
				while (true) {
					state = stack[stack.length - 1];
					if (this.defaultActions[state]) action = this.defaultActions[state];
					else {
						if (symbol === null || typeof symbol == "undefined") symbol = lex();
						action = table[state] && table[state][symbol];
					}
					if (typeof action === "undefined" || !action.length || !action[0]) {
						var errStr = "";
						expected = [];
						for (p in table[state]) if (this.terminals_[p] && p > TERROR) expected.push("'" + this.terminals_[p] + "'");
						if (lexer2.showPosition) errStr = "Parse error on line " + (yylineno + 1) + ":\n" + lexer2.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'";
						else errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == EOF ? "end of input" : "'" + (this.terminals_[symbol] || symbol) + "'");
						this.parseError(errStr, {
							text: lexer2.match,
							token: this.terminals_[symbol] || symbol,
							line: lexer2.yylineno,
							loc: yyloc,
							expected
						});
					}
					if (action[0] instanceof Array && action.length > 1) throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
					switch (action[0]) {
						case 1:
							stack.push(symbol);
							vstack.push(lexer2.yytext);
							lstack.push(lexer2.yylloc);
							stack.push(action[1]);
							symbol = null;
							yyleng = lexer2.yyleng;
							yytext = lexer2.yytext;
							yylineno = lexer2.yylineno;
							yyloc = lexer2.yylloc;
							break;
						case 2:
							len = this.productions_[action[1]][1];
							yyval.$ = vstack[vstack.length - len];
							yyval._$ = {
								first_line: lstack[lstack.length - (len || 1)].first_line,
								last_line: lstack[lstack.length - 1].last_line,
								first_column: lstack[lstack.length - (len || 1)].first_column,
								last_column: lstack[lstack.length - 1].last_column
							};
							if (ranges) yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
							r = this.performAction.apply(yyval, [
								yytext,
								yyleng,
								yylineno,
								sharedState.yy,
								action[1],
								vstack,
								lstack
							].concat(args));
							if (typeof r !== "undefined") return r;
							if (len) {
								stack = stack.slice(0, -1 * len * 2);
								vstack = vstack.slice(0, -1 * len);
								lstack = lstack.slice(0, -1 * len);
							}
							stack.push(this.productions_[action[1]][0]);
							vstack.push(yyval.$);
							lstack.push(yyval._$);
							newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
							stack.push(newState);
							break;
						case 3: return true;
					}
				}
				return true;
			}
		};
		parser2.lexer = function() {
			return {
				EOF: 1,
				parseError: function parseError(str, hash) {
					if (this.yy.parser) this.yy.parser.parseError(str, hash);
					else throw new Error(str);
				},
				setInput: function(input, yy) {
					this.yy = yy || this.yy || {};
					this._input = input;
					this._more = this._backtrack = this.done = false;
					this.yylineno = this.yyleng = 0;
					this.yytext = this.matched = this.match = "";
					this.conditionStack = ["INITIAL"];
					this.yylloc = {
						first_line: 1,
						first_column: 0,
						last_line: 1,
						last_column: 0
					};
					if (this.options.ranges) this.yylloc.range = [0, 0];
					this.offset = 0;
					return this;
				},
				input: function() {
					var ch = this._input[0];
					this.yytext += ch;
					this.yyleng++;
					this.offset++;
					this.match += ch;
					this.matched += ch;
					if (ch.match(/(?:\r\n?|\n).*/g)) {
						this.yylineno++;
						this.yylloc.last_line++;
					} else this.yylloc.last_column++;
					if (this.options.ranges) this.yylloc.range[1]++;
					this._input = this._input.slice(1);
					return ch;
				},
				unput: function(ch) {
					var len = ch.length;
					var lines = ch.split(/(?:\r\n?|\n)/g);
					this._input = ch + this._input;
					this.yytext = this.yytext.substr(0, this.yytext.length - len);
					this.offset -= len;
					var oldLines = this.match.split(/(?:\r\n?|\n)/g);
					this.match = this.match.substr(0, this.match.length - 1);
					this.matched = this.matched.substr(0, this.matched.length - 1);
					if (lines.length - 1) this.yylineno -= lines.length - 1;
					var r = this.yylloc.range;
					this.yylloc = {
						first_line: this.yylloc.first_line,
						last_line: this.yylineno + 1,
						first_column: this.yylloc.first_column,
						last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
					};
					if (this.options.ranges) this.yylloc.range = [r[0], r[0] + this.yyleng - len];
					this.yyleng = this.yytext.length;
					return this;
				},
				more: function() {
					this._more = true;
					return this;
				},
				reject: function() {
					if (this.options.backtrack_lexer) this._backtrack = true;
					else return this.parseError("Lexical error on line " + (this.yylineno + 1) + ". You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n" + this.showPosition(), {
						text: "",
						token: null,
						line: this.yylineno
					});
					return this;
				},
				less: function(n) {
					this.unput(this.match.slice(n));
				},
				pastInput: function() {
					var past = this.matched.substr(0, this.matched.length - this.match.length);
					return (past.length > 20 ? "..." : "") + past.substr(-20).replace(/\n/g, "");
				},
				upcomingInput: function() {
					var next = this.match;
					if (next.length < 20) next += this._input.substr(0, 20 - next.length);
					return (next.substr(0, 20) + (next.length > 20 ? "..." : "")).replace(/\n/g, "");
				},
				showPosition: function() {
					var pre = this.pastInput();
					var c = new Array(pre.length + 1).join("-");
					return pre + this.upcomingInput() + "\n" + c + "^";
				},
				test_match: function(match, indexed_rule) {
					var token, lines, backup;
					if (this.options.backtrack_lexer) {
						backup = {
							yylineno: this.yylineno,
							yylloc: {
								first_line: this.yylloc.first_line,
								last_line: this.last_line,
								first_column: this.yylloc.first_column,
								last_column: this.yylloc.last_column
							},
							yytext: this.yytext,
							match: this.match,
							matches: this.matches,
							matched: this.matched,
							yyleng: this.yyleng,
							offset: this.offset,
							_more: this._more,
							_input: this._input,
							yy: this.yy,
							conditionStack: this.conditionStack.slice(0),
							done: this.done
						};
						if (this.options.ranges) backup.yylloc.range = this.yylloc.range.slice(0);
					}
					lines = match[0].match(/(?:\r\n?|\n).*/g);
					if (lines) this.yylineno += lines.length;
					this.yylloc = {
						first_line: this.yylloc.last_line,
						last_line: this.yylineno + 1,
						first_column: this.yylloc.last_column,
						last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length
					};
					this.yytext += match[0];
					this.match += match[0];
					this.matches = match;
					this.yyleng = this.yytext.length;
					if (this.options.ranges) this.yylloc.range = [this.offset, this.offset += this.yyleng];
					this._more = false;
					this._backtrack = false;
					this._input = this._input.slice(match[0].length);
					this.matched += match[0];
					token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
					if (this.done && this._input) this.done = false;
					if (token) return token;
					else if (this._backtrack) {
						for (var k in backup) this[k] = backup[k];
						return false;
					}
					return false;
				},
				next: function() {
					if (this.done) return this.EOF;
					if (!this._input) this.done = true;
					var token, match, tempMatch, index;
					if (!this._more) {
						this.yytext = "";
						this.match = "";
					}
					var rules = this._currentRules();
					for (var i = 0; i < rules.length; i++) {
						tempMatch = this._input.match(this.rules[rules[i]]);
						if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
							match = tempMatch;
							index = i;
							if (this.options.backtrack_lexer) {
								token = this.test_match(tempMatch, rules[i]);
								if (token !== false) return token;
								else if (this._backtrack) {
									match = false;
									continue;
								} else return false;
							} else if (!this.options.flex) break;
						}
					}
					if (match) {
						token = this.test_match(match, rules[index]);
						if (token !== false) return token;
						return false;
					}
					if (this._input === "") return this.EOF;
					else return this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {
						text: "",
						token: null,
						line: this.yylineno
					});
				},
				lex: function lex() {
					var r = this.next();
					if (r) return r;
					else return this.lex();
				},
				begin: function begin(condition) {
					this.conditionStack.push(condition);
				},
				popState: function popState() {
					if (this.conditionStack.length - 1 > 0) return this.conditionStack.pop();
					else return this.conditionStack[0];
				},
				_currentRules: function _currentRules() {
					if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
					else return this.conditions["INITIAL"].rules;
				},
				topState: function topState(n) {
					n = this.conditionStack.length - 1 - Math.abs(n || 0);
					if (n >= 0) return this.conditionStack[n];
					else return "INITIAL";
				},
				pushState: function pushState(condition) {
					this.begin(condition);
				},
				stateStackSize: function stateStackSize() {
					return this.conditionStack.length;
				},
				options: { "case-insensitive": true },
				performAction: function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
					switch ($avoiding_name_collisions) {
						case 0: break;
						case 1: break;
						case 2: return 20;
						case 3: break;
						case 4: break;
						case 5:
							this.begin("title");
							return 12;
						case 6:
							this.popState();
							return "title_value";
						case 7:
							this.begin("acc_title");
							return 14;
						case 8:
							this.popState();
							return "acc_title_value";
						case 9:
							this.begin("acc_descr");
							return 16;
						case 10:
							this.popState();
							return "acc_descr_value";
						case 11:
							this.begin("acc_descr_multiline");
							break;
						case 12:
							this.popState();
							break;
						case 13: return "acc_descr_multiline_value";
						case 14:
							this.begin("string");
							break;
						case 15:
							this.popState();
							break;
						case 16: return "txt";
						case 17: return 5;
						case 18: return 7;
						case 19: return "value";
						case 20: return 22;
					}
				},
				rules: [
					/^(?:%%(?!\{)[^\n]*)/i,
					/^(?:[^\}]%%[^\n]*)/i,
					/^(?:[\n\r]+)/i,
					/^(?:%%[^\n]*)/i,
					/^(?:[\s]+)/i,
					/^(?:title\b)/i,
					/^(?:(?!\n||)*[^\n]*)/i,
					/^(?:accTitle\s*:\s*)/i,
					/^(?:(?!\n||)*[^\n]*)/i,
					/^(?:accDescr\s*:\s*)/i,
					/^(?:(?!\n||)*[^\n]*)/i,
					/^(?:accDescr\s*\{\s*)/i,
					/^(?:[\}])/i,
					/^(?:[^\}]*)/i,
					/^(?:["])/i,
					/^(?:["])/i,
					/^(?:[^"]*)/i,
					/^(?:pie\b)/i,
					/^(?:showData\b)/i,
					/^(?::[\s]*[\d]+(?:\.[\d]+)?)/i,
					/^(?:$)/i
				],
				conditions: {
					"acc_descr_multiline": {
						"rules": [12, 13],
						"inclusive": false
					},
					"acc_descr": {
						"rules": [10],
						"inclusive": false
					},
					"acc_title": {
						"rules": [8],
						"inclusive": false
					},
					"title": {
						"rules": [6],
						"inclusive": false
					},
					"string": {
						"rules": [15, 16],
						"inclusive": false
					},
					"INITIAL": {
						"rules": [
							0,
							1,
							2,
							3,
							4,
							5,
							7,
							9,
							11,
							14,
							17,
							18,
							19,
							20
						],
						"inclusive": true
					}
				}
			};
		}();
		function Parser() {
			this.yy = {};
		}
		Parser.prototype = parser2;
		parser2.Parser = Parser;
		return new Parser();
	}();
	parser.parser = parser;
	parser$1 = parser;
	DEFAULT_PIE_CONFIG = defaultConfig$2.pie;
	DEFAULT_PIE_DB = {
		sections: {},
		showData: false,
		config: DEFAULT_PIE_CONFIG
	};
	sections = DEFAULT_PIE_DB.sections;
	showData = DEFAULT_PIE_DB.showData;
	config = structuredClone(DEFAULT_PIE_CONFIG);
	getConfig = () => structuredClone(config);
	clear = () => {
		sections = structuredClone(DEFAULT_PIE_DB.sections);
		showData = DEFAULT_PIE_DB.showData;
		clear$1();
	};
	addSection = (label, value) => {
		label = sanitizeText$2(label, getConfig$1());
		if (sections[label] === void 0) {
			sections[label] = value;
			log$1.debug(`added new section: ${label}, with value: ${value}`);
		}
	};
	getSections = () => sections;
	cleanupValue = (value) => {
		if (value.substring(0, 1) === ":") value = value.substring(1).trim();
		return Number(value.trim());
	};
	setShowData = (toggle) => {
		showData = toggle;
	};
	getShowData = () => showData;
	db = {
		getConfig,
		clear,
		setDiagramTitle,
		getDiagramTitle,
		setAccTitle,
		getAccTitle,
		setAccDescription,
		getAccDescription,
		addSection,
		getSections,
		cleanupValue,
		setShowData,
		getShowData
	};
	getStyles = (options) => `
  .pieCircle{
    stroke: ${options.pieStrokeColor};
    stroke-width : ${options.pieStrokeWidth};
    opacity : ${options.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${options.pieOuterStrokeColor};
    stroke-width: ${options.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${options.pieTitleTextSize};
    fill: ${options.pieTitleTextColor};
    font-family: ${options.fontFamily};
  }
  .slice {
    font-family: ${options.fontFamily};
    fill: ${options.pieSectionTextColor};
    font-size:${options.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${options.pieLegendTextColor};
    font-family: ${options.fontFamily};
    font-size: ${options.pieLegendTextSize};
  }
`;
	styles = getStyles;
	createPieArcs = (sections2) => {
		const pieData = Object.entries(sections2).map((element) => {
			return {
				label: element[0],
				value: element[1]
			};
		}).sort((a, b) => {
			return b.value - a.value;
		});
		return pie_default().value((d3Section) => d3Section.value)(pieData);
	};
	draw = (text, id, _version, diagObj) => {
		log$1.debug("rendering pie chart\n" + text);
		const db2 = diagObj.db;
		const globalConfig = getConfig$1();
		const pieConfig = cleanAndMerge(db2.getConfig(), globalConfig.pie);
		const MARGIN = 40;
		const LEGEND_RECT_SIZE = 18;
		const LEGEND_SPACING = 4;
		const height = 450;
		const pieWidth = height;
		const svg = selectSvgElement(id);
		const group = svg.append("g");
		const sections2 = db2.getSections();
		group.attr("transform", "translate(" + pieWidth / 2 + "," + height / 2 + ")");
		const { themeVariables } = globalConfig;
		let [outerStrokeWidth] = parseFontSize(themeVariables.pieOuterStrokeWidth);
		outerStrokeWidth ?? (outerStrokeWidth = 2);
		const textPosition = pieConfig.textPosition;
		const radius = Math.min(pieWidth, height) / 2 - MARGIN;
		const arcGenerator = arc_default().innerRadius(0).outerRadius(radius);
		const labelArcGenerator = arc_default().innerRadius(radius * textPosition).outerRadius(radius * textPosition);
		group.append("circle").attr("cx", 0).attr("cy", 0).attr("r", radius + outerStrokeWidth / 2).attr("class", "pieOuterCircle");
		const arcs = createPieArcs(sections2);
		const color = ordinal([
			themeVariables.pie1,
			themeVariables.pie2,
			themeVariables.pie3,
			themeVariables.pie4,
			themeVariables.pie5,
			themeVariables.pie6,
			themeVariables.pie7,
			themeVariables.pie8,
			themeVariables.pie9,
			themeVariables.pie10,
			themeVariables.pie11,
			themeVariables.pie12
		]);
		group.selectAll("mySlices").data(arcs).enter().append("path").attr("d", arcGenerator).attr("fill", (datum) => {
			return color(datum.data.label);
		}).attr("class", "pieCircle");
		let sum = 0;
		Object.keys(sections2).forEach((key) => {
			sum += sections2[key];
		});
		group.selectAll("mySlices").data(arcs).enter().append("text").text((datum) => {
			return (datum.data.value / sum * 100).toFixed(0) + "%";
		}).attr("transform", (datum) => {
			return "translate(" + labelArcGenerator.centroid(datum) + ")";
		}).style("text-anchor", "middle").attr("class", "slice");
		group.append("text").text(db2.getDiagramTitle()).attr("x", 0).attr("y", -(height - 50) / 2).attr("class", "pieTitleText");
		const legend = group.selectAll(".legend").data(color.domain()).enter().append("g").attr("class", "legend").attr("transform", (_datum, index) => {
			const height2 = LEGEND_RECT_SIZE + LEGEND_SPACING;
			const offset = height2 * color.domain().length / 2;
			const horizontal = 12 * LEGEND_RECT_SIZE;
			const vertical = index * height2 - offset;
			return "translate(" + horizontal + "," + vertical + ")";
		});
		legend.append("rect").attr("width", LEGEND_RECT_SIZE).attr("height", LEGEND_RECT_SIZE).style("fill", color).style("stroke", color);
		legend.data(arcs).append("text").attr("x", LEGEND_RECT_SIZE + LEGEND_SPACING).attr("y", LEGEND_RECT_SIZE - LEGEND_SPACING).text((datum) => {
			const { label, value } = datum.data;
			if (db2.getShowData()) return `${label} [${value}]`;
			return label;
		});
		const longestTextWidth = Math.max(...legend.selectAll("text").nodes().map((node) => (node == null ? void 0 : node.getBoundingClientRect().width) ?? 0));
		const totalWidth = pieWidth + MARGIN + LEGEND_RECT_SIZE + LEGEND_SPACING + longestTextWidth;
		svg.attr("viewBox", `0 0 ${totalWidth} ${height}`);
		configureSvgSize(svg, height, totalWidth, pieConfig.useMaxWidth);
	};
	diagram = {
		parser: parser$1,
		db,
		renderer: { draw },
		styles
	};
}))();
export { diagram };
