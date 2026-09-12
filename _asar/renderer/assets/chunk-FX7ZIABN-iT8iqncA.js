const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./file-open-002ab408-BDfohlpj.js","./chunk-BRZcfu7K.js","./file-open-7c801643-jonOQc__.js","./directory-open-4ed118d0-BMoE_cIz.js","./directory-open-01563666-f2vZSMtj.js","./file-save-745eba88-Dv7mE7jW.js","./file-save-3189631c-CzNMGs6C.js","./subset-worker.chunk-BlAHLP4D.js","./chunk-EIO257PC-Dep-Zt0A.js","./chunk-SRAX5OIU-BVXI1KDg.js","./dist-DNjXzICC.js","./dist-CSHw4oQX.js","./subset-shared.chunk-Da7L08kE.js","./image-7KUKJ7J4-DWHZHYOd.js","./pica-hdwT5SCC.js","./image-blob-reduce.esm-B8teUfI2.js"])))=>i.map(i=>d[i]);
import { n as __esmMin, s as __toESM, t as __commonJSMin } from "./chunk-BRZcfu7K.js";
import { n as init_preload_helper, t as __vitePreload } from "./preload-helper-E3UYCQGP.js";
import { n as process$1, t as init_dist$1 } from "./dist-CSHw4oQX.js";
import { n as init_dist$2, t as Buffer } from "./dist-DNjXzICC.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { n as init_chunk_SQ5PDB2P, t as c } from "./chunk-SQ5PDB2P-Be7JcPOa.js";
import { a as init_chunk_SRAX5OIU, i as i$1 } from "./chunk-SRAX5OIU-BVXI1KDg.js";
//#region ../../node_modules/png-chunks-extract/node_modules/crc-32/crc32.js
var require_crc32$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	init_dist$2();
	(function(factory) {
		if (typeof DO_NOT_EXPORT_CRC === "undefined") if ("object" === typeof exports) factory(exports);
		else if ("function" === typeof define && define.amd) define(function() {
			var module$2 = {};
			factory(module$2);
			return module$2;
		});
		else factory({});
		else factory({});
	})(function(CRC32) {
		CRC32.version = "0.3.0";
		function signed_crc_table() {
			var c = 0, table = new Array(256);
			for (var n = 0; n != 256; ++n) {
				c = n;
				c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
				c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
				c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
				c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
				c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
				c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
				c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
				c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
				table[n] = c;
			}
			return typeof Int32Array !== "undefined" ? new Int32Array(table) : table;
		}
		var table = signed_crc_table();
		var use_buffer = typeof Buffer !== "undefined";
		function crc32_bstr(bstr) {
			if (bstr.length > 32768) {
				if (use_buffer) return crc32_buf_8(new Buffer(bstr));
			}
			var crc = -1, L = bstr.length - 1;
			for (var i = 0; i < L;) {
				crc = table[(crc ^ bstr.charCodeAt(i++)) & 255] ^ crc >>> 8;
				crc = table[(crc ^ bstr.charCodeAt(i++)) & 255] ^ crc >>> 8;
			}
			if (i === L) crc = crc >>> 8 ^ table[(crc ^ bstr.charCodeAt(i)) & 255];
			return crc ^ -1;
		}
		function crc32_buf(buf) {
			if (buf.length > 1e4) return crc32_buf_8(buf);
			for (var crc = -1, i = 0, L = buf.length - 3; i < L;) {
				crc = crc >>> 8 ^ table[(crc ^ buf[i++]) & 255];
				crc = crc >>> 8 ^ table[(crc ^ buf[i++]) & 255];
				crc = crc >>> 8 ^ table[(crc ^ buf[i++]) & 255];
				crc = crc >>> 8 ^ table[(crc ^ buf[i++]) & 255];
			}
			while (i < L + 3) crc = crc >>> 8 ^ table[(crc ^ buf[i++]) & 255];
			return crc ^ -1;
		}
		function crc32_buf_8(buf) {
			for (var crc = -1, i = 0, L = buf.length - 7; i < L;) {
				crc = crc >>> 8 ^ table[(crc ^ buf[i++]) & 255];
				crc = crc >>> 8 ^ table[(crc ^ buf[i++]) & 255];
				crc = crc >>> 8 ^ table[(crc ^ buf[i++]) & 255];
				crc = crc >>> 8 ^ table[(crc ^ buf[i++]) & 255];
				crc = crc >>> 8 ^ table[(crc ^ buf[i++]) & 255];
				crc = crc >>> 8 ^ table[(crc ^ buf[i++]) & 255];
				crc = crc >>> 8 ^ table[(crc ^ buf[i++]) & 255];
				crc = crc >>> 8 ^ table[(crc ^ buf[i++]) & 255];
			}
			while (i < L + 7) crc = crc >>> 8 ^ table[(crc ^ buf[i++]) & 255];
			return crc ^ -1;
		}
		function crc32_str(str) {
			for (var crc = -1, i = 0, L = str.length, c, d; i < L;) {
				c = str.charCodeAt(i++);
				if (c < 128) crc = crc >>> 8 ^ table[(crc ^ c) & 255];
				else if (c < 2048) {
					crc = crc >>> 8 ^ table[(crc ^ (192 | c >> 6 & 31)) & 255];
					crc = crc >>> 8 ^ table[(crc ^ (128 | c & 63)) & 255];
				} else if (c >= 55296 && c < 57344) {
					c = (c & 1023) + 64;
					d = str.charCodeAt(i++) & 1023;
					crc = crc >>> 8 ^ table[(crc ^ (240 | c >> 8 & 7)) & 255];
					crc = crc >>> 8 ^ table[(crc ^ (128 | c >> 2 & 63)) & 255];
					crc = crc >>> 8 ^ table[(crc ^ (128 | d >> 6 & 15 | c & 3)) & 255];
					crc = crc >>> 8 ^ table[(crc ^ (128 | d & 63)) & 255];
				} else {
					crc = crc >>> 8 ^ table[(crc ^ (224 | c >> 12 & 15)) & 255];
					crc = crc >>> 8 ^ table[(crc ^ (128 | c >> 6 & 63)) & 255];
					crc = crc >>> 8 ^ table[(crc ^ (128 | c & 63)) & 255];
				}
			}
			return crc ^ -1;
		}
		CRC32.table = table;
		CRC32.bstr = crc32_bstr;
		CRC32.buf = crc32_buf;
		CRC32.str = crc32_str;
	});
}));
//#endregion
//#region ../../node_modules/png-chunks-extract/index.js
var require_png_chunks_extract = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var crc32 = require_crc32$1();
	module.exports = extractChunks;
	var uint8 = new Uint8Array(4);
	var int32 = new Int32Array(uint8.buffer);
	var uint32 = new Uint32Array(uint8.buffer);
	function extractChunks(data) {
		if (data[0] !== 137) throw new Error("Invalid .png file header");
		if (data[1] !== 80) throw new Error("Invalid .png file header");
		if (data[2] !== 78) throw new Error("Invalid .png file header");
		if (data[3] !== 71) throw new Error("Invalid .png file header");
		if (data[4] !== 13) throw new Error("Invalid .png file header: possibly caused by DOS-Unix line ending conversion?");
		if (data[5] !== 10) throw new Error("Invalid .png file header: possibly caused by DOS-Unix line ending conversion?");
		if (data[6] !== 26) throw new Error("Invalid .png file header");
		if (data[7] !== 10) throw new Error("Invalid .png file header: possibly caused by DOS-Unix line ending conversion?");
		var ended = false;
		var chunks = [];
		var idx = 8;
		while (idx < data.length) {
			uint8[3] = data[idx++];
			uint8[2] = data[idx++];
			uint8[1] = data[idx++];
			uint8[0] = data[idx++];
			var length = uint32[0] + 4;
			var chunk = new Uint8Array(length);
			chunk[0] = data[idx++];
			chunk[1] = data[idx++];
			chunk[2] = data[idx++];
			chunk[3] = data[idx++];
			var name = String.fromCharCode(chunk[0]) + String.fromCharCode(chunk[1]) + String.fromCharCode(chunk[2]) + String.fromCharCode(chunk[3]);
			if (!chunks.length && name !== "IHDR") throw new Error("IHDR header missing");
			if (name === "IEND") {
				ended = true;
				chunks.push({
					name,
					data: new Uint8Array(0)
				});
				break;
			}
			for (var i = 4; i < length; i++) chunk[i] = data[idx++];
			uint8[3] = data[idx++];
			uint8[2] = data[idx++];
			uint8[1] = data[idx++];
			uint8[0] = data[idx++];
			var crcActual = int32[0];
			if (crc32.buf(chunk) !== crcActual) throw new Error("CRC values for " + name + " header do not match, PNG file is likely corrupted");
			var chunkData = new Uint8Array(chunk.buffer.slice(4));
			chunks.push({
				name,
				data: chunkData
			});
		}
		if (!ended) throw new Error(".png file ended prematurely: no IEND header was found");
		return chunks;
	}
}));
//#endregion
//#region ../../node_modules/png-chunk-text/encode.js
var require_encode = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = encode;
	function encode(keyword, content) {
		keyword = String(keyword);
		content = String(content);
		if (!/^[\x00-\xFF]+$/.test(keyword) || !/^[\x00-\xFF]+$/.test(content)) throw new Error("Only Latin-1 characters are permitted in PNG tEXt chunks. You might want to consider base64 encoding and/or zEXt compression");
		if (keyword.length >= 80) throw new Error("Keyword \"" + keyword + "\" is longer than the 79-character limit imposed by the PNG specification");
		var totalSize = keyword.length + content.length + 1;
		var output = new Uint8Array(totalSize);
		var idx = 0;
		var code;
		for (var i = 0; i < keyword.length; i++) {
			if (!(code = keyword.charCodeAt(i))) throw new Error("0x00 character is not permitted in tEXt keywords");
			output[idx++] = code;
		}
		output[idx++] = 0;
		for (var j = 0; j < content.length; j++) {
			if (!(code = content.charCodeAt(j))) throw new Error("0x00 character is not permitted in tEXt content");
			output[idx++] = code;
		}
		return {
			name: "tEXt",
			data: output
		};
	}
}));
//#endregion
//#region ../../node_modules/png-chunk-text/decode.js
var require_decode = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = decode;
	function decode(data) {
		if (data.data && data.name) data = data.data;
		var naming = true;
		var text = "";
		var name = "";
		for (var i = 0; i < data.length; i++) {
			var code = data[i];
			if (naming) if (code) name += String.fromCharCode(code);
			else naming = false;
			else if (code) text += String.fromCharCode(code);
			else throw new Error("Invalid NULL character found. 0x00 character is not permitted in tEXt content");
		}
		return {
			keyword: name,
			text
		};
	}
}));
//#endregion
//#region ../../node_modules/png-chunk-text/index.js
var require_png_chunk_text = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.encode = require_encode();
	exports.decode = require_decode();
}));
//#endregion
//#region ../../node_modules/sliced/index.js
var require_sliced = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* An Array.prototype.slice.call(arguments) alternative
	*
	* @param {Object} args something with a length
	* @param {Number} slice
	* @param {Number} sliceEnd
	* @api public
	*/
	module.exports = function(args, slice, sliceEnd) {
		var ret = [];
		var len = args.length;
		if (0 === len) return ret;
		var start = slice < 0 ? Math.max(0, slice + len) : slice || 0;
		if (sliceEnd !== void 0) len = sliceEnd < 0 ? sliceEnd + len : sliceEnd;
		while (len-- > start) ret[len - start] = args[len];
		return ret;
	};
}));
//#endregion
//#region ../../node_modules/png-chunks-encode/node_modules/crc-32/crc32.js
var require_crc32 = /* @__PURE__ */ __commonJSMin(((exports) => {
	init_dist$2();
	(function(factory) {
		if (typeof DO_NOT_EXPORT_CRC === "undefined") if ("object" === typeof exports) factory(exports);
		else if ("function" === typeof define && define.amd) define(function() {
			var module$1 = {};
			factory(module$1);
			return module$1;
		});
		else factory({});
		else factory({});
	})(function(CRC32) {
		CRC32.version = "0.3.0";
		function signed_crc_table() {
			var c = 0, table = new Array(256);
			for (var n = 0; n != 256; ++n) {
				c = n;
				c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
				c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
				c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
				c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
				c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
				c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
				c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
				c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
				table[n] = c;
			}
			return typeof Int32Array !== "undefined" ? new Int32Array(table) : table;
		}
		var table = signed_crc_table();
		var use_buffer = typeof Buffer !== "undefined";
		function crc32_bstr(bstr) {
			if (bstr.length > 32768) {
				if (use_buffer) return crc32_buf_8(new Buffer(bstr));
			}
			var crc = -1, L = bstr.length - 1;
			for (var i = 0; i < L;) {
				crc = table[(crc ^ bstr.charCodeAt(i++)) & 255] ^ crc >>> 8;
				crc = table[(crc ^ bstr.charCodeAt(i++)) & 255] ^ crc >>> 8;
			}
			if (i === L) crc = crc >>> 8 ^ table[(crc ^ bstr.charCodeAt(i)) & 255];
			return crc ^ -1;
		}
		function crc32_buf(buf) {
			if (buf.length > 1e4) return crc32_buf_8(buf);
			for (var crc = -1, i = 0, L = buf.length - 3; i < L;) {
				crc = crc >>> 8 ^ table[(crc ^ buf[i++]) & 255];
				crc = crc >>> 8 ^ table[(crc ^ buf[i++]) & 255];
				crc = crc >>> 8 ^ table[(crc ^ buf[i++]) & 255];
				crc = crc >>> 8 ^ table[(crc ^ buf[i++]) & 255];
			}
			while (i < L + 3) crc = crc >>> 8 ^ table[(crc ^ buf[i++]) & 255];
			return crc ^ -1;
		}
		function crc32_buf_8(buf) {
			for (var crc = -1, i = 0, L = buf.length - 7; i < L;) {
				crc = crc >>> 8 ^ table[(crc ^ buf[i++]) & 255];
				crc = crc >>> 8 ^ table[(crc ^ buf[i++]) & 255];
				crc = crc >>> 8 ^ table[(crc ^ buf[i++]) & 255];
				crc = crc >>> 8 ^ table[(crc ^ buf[i++]) & 255];
				crc = crc >>> 8 ^ table[(crc ^ buf[i++]) & 255];
				crc = crc >>> 8 ^ table[(crc ^ buf[i++]) & 255];
				crc = crc >>> 8 ^ table[(crc ^ buf[i++]) & 255];
				crc = crc >>> 8 ^ table[(crc ^ buf[i++]) & 255];
			}
			while (i < L + 7) crc = crc >>> 8 ^ table[(crc ^ buf[i++]) & 255];
			return crc ^ -1;
		}
		function crc32_str(str) {
			for (var crc = -1, i = 0, L = str.length, c, d; i < L;) {
				c = str.charCodeAt(i++);
				if (c < 128) crc = crc >>> 8 ^ table[(crc ^ c) & 255];
				else if (c < 2048) {
					crc = crc >>> 8 ^ table[(crc ^ (192 | c >> 6 & 31)) & 255];
					crc = crc >>> 8 ^ table[(crc ^ (128 | c & 63)) & 255];
				} else if (c >= 55296 && c < 57344) {
					c = (c & 1023) + 64;
					d = str.charCodeAt(i++) & 1023;
					crc = crc >>> 8 ^ table[(crc ^ (240 | c >> 8 & 7)) & 255];
					crc = crc >>> 8 ^ table[(crc ^ (128 | c >> 2 & 63)) & 255];
					crc = crc >>> 8 ^ table[(crc ^ (128 | d >> 6 & 15 | c & 3)) & 255];
					crc = crc >>> 8 ^ table[(crc ^ (128 | d & 63)) & 255];
				} else {
					crc = crc >>> 8 ^ table[(crc ^ (224 | c >> 12 & 15)) & 255];
					crc = crc >>> 8 ^ table[(crc ^ (128 | c >> 6 & 63)) & 255];
					crc = crc >>> 8 ^ table[(crc ^ (128 | c & 63)) & 255];
				}
			}
			return crc ^ -1;
		}
		CRC32.table = table;
		CRC32.bstr = crc32_bstr;
		CRC32.buf = crc32_buf;
		CRC32.str = crc32_str;
	});
}));
//#endregion
//#region ../../node_modules/png-chunks-encode/index.js
var require_png_chunks_encode = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var sliced = require_sliced();
	var crc32 = require_crc32();
	module.exports = encodeChunks;
	var uint8 = new Uint8Array(4);
	var int32 = new Int32Array(uint8.buffer);
	var uint32 = new Uint32Array(uint8.buffer);
	function encodeChunks(chunks) {
		var totalSize = 8;
		var idx = totalSize;
		var i;
		for (i = 0; i < chunks.length; i++) {
			totalSize += chunks[i].data.length;
			totalSize += 12;
		}
		var output = new Uint8Array(totalSize);
		output[0] = 137;
		output[1] = 80;
		output[2] = 78;
		output[3] = 71;
		output[4] = 13;
		output[5] = 10;
		output[6] = 26;
		output[7] = 10;
		for (i = 0; i < chunks.length; i++) {
			var chunk = chunks[i];
			var name = chunk.name;
			var data = chunk.data;
			var size = data.length;
			var nameChars = [
				name.charCodeAt(0),
				name.charCodeAt(1),
				name.charCodeAt(2),
				name.charCodeAt(3)
			];
			uint32[0] = size;
			output[idx++] = uint8[3];
			output[idx++] = uint8[2];
			output[idx++] = uint8[1];
			output[idx++] = uint8[0];
			output[idx++] = nameChars[0];
			output[idx++] = nameChars[1];
			output[idx++] = nameChars[2];
			output[idx++] = nameChars[3];
			for (var j = 0; j < size;) output[idx++] = data[j++];
			var crcCheck = nameChars.concat(sliced(data));
			int32[0] = crc32.buf(crcCheck);
			output[idx++] = uint8[3];
			output[idx++] = uint8[2];
			output[idx++] = uint8[1];
			output[idx++] = uint8[0];
		}
		return output;
	}
}));
//#endregion
//#region ../../node_modules/@excalidraw/excalidraw/node_modules/pako/dist/pako.esm.mjs
function zero(buf) {
	let len = buf.length;
	while (--len >= 0) buf[len] = 0;
}
function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {
	this.static_tree = static_tree;
	this.extra_bits = extra_bits;
	this.extra_base = extra_base;
	this.elems = elems;
	this.max_length = max_length;
	this.has_stree = static_tree && static_tree.length;
}
function TreeDesc(dyn_tree, stat_desc) {
	this.dyn_tree = dyn_tree;
	this.max_code = 0;
	this.stat_desc = stat_desc;
}
function Config(good_length, max_lazy, nice_length, max_chain, func) {
	this.good_length = good_length;
	this.max_lazy = max_lazy;
	this.nice_length = nice_length;
	this.max_chain = max_chain;
	this.func = func;
}
function DeflateState() {
	this.strm = null;
	this.status = 0;
	this.pending_buf = null;
	this.pending_buf_size = 0;
	this.pending_out = 0;
	this.pending = 0;
	this.wrap = 0;
	this.gzhead = null;
	this.gzindex = 0;
	this.method = Z_DEFLATED;
	this.last_flush = -1;
	this.w_size = 0;
	this.w_bits = 0;
	this.w_mask = 0;
	this.window = null;
	this.window_size = 0;
	this.prev = null;
	this.head = null;
	this.ins_h = 0;
	this.hash_size = 0;
	this.hash_bits = 0;
	this.hash_mask = 0;
	this.hash_shift = 0;
	this.block_start = 0;
	this.match_length = 0;
	this.prev_match = 0;
	this.match_available = 0;
	this.strstart = 0;
	this.match_start = 0;
	this.lookahead = 0;
	this.prev_length = 0;
	this.max_chain_length = 0;
	this.max_lazy_match = 0;
	this.level = 0;
	this.strategy = 0;
	this.good_match = 0;
	this.nice_match = 0;
	this.dyn_ltree = new Uint16Array(HEAP_SIZE$1 * 2);
	this.dyn_dtree = new Uint16Array((2 * D_CODES$1 + 1) * 2);
	this.bl_tree = new Uint16Array((2 * BL_CODES$1 + 1) * 2);
	zero$1(this.dyn_ltree);
	zero$1(this.dyn_dtree);
	zero$1(this.bl_tree);
	this.l_desc = null;
	this.d_desc = null;
	this.bl_desc = null;
	this.bl_count = new Uint16Array(MAX_BITS$1 + 1);
	this.heap = new Uint16Array(2 * L_CODES$1 + 1);
	zero$1(this.heap);
	this.heap_len = 0;
	this.heap_max = 0;
	this.depth = new Uint16Array(2 * L_CODES$1 + 1);
	zero$1(this.depth);
	this.l_buf = 0;
	this.lit_bufsize = 0;
	this.last_lit = 0;
	this.d_buf = 0;
	this.opt_len = 0;
	this.static_len = 0;
	this.matches = 0;
	this.insert = 0;
	this.bi_buf = 0;
	this.bi_valid = 0;
}
function ZStream() {
	this.input = null;
	this.next_in = 0;
	this.avail_in = 0;
	this.total_in = 0;
	this.output = null;
	this.next_out = 0;
	this.avail_out = 0;
	this.total_out = 0;
	this.msg = "";
	this.state = null;
	this.data_type = 2;
	this.adler = 0;
}
/**
* class Deflate
*
* Generic JS-style wrapper for zlib calls. If you don't need
* streaming behaviour - use more simple functions: [[deflate]],
* [[deflateRaw]] and [[gzip]].
**/
/**
* Deflate.result -> Uint8Array
*
* Compressed result, generated by default [[Deflate#onData]]
* and [[Deflate#onEnd]] handlers. Filled after you push last chunk
* (call [[Deflate#push]] with `Z_FINISH` / `true` param).
**/
/**
* Deflate.err -> Number
*
* Error code after deflate finished. 0 (Z_OK) on success.
* You will not need it in real life, because deflate errors
* are possible only on wrong options or bad `onData` / `onEnd`
* custom handlers.
**/
/**
* Deflate.msg -> String
*
* Error message, if [[Deflate.err]] != 0
**/
/**
* new Deflate(options)
* - options (Object): zlib deflate options.
*
* Creates new deflator instance with specified params. Throws exception
* on bad params. Supported options:
*
* - `level`
* - `windowBits`
* - `memLevel`
* - `strategy`
* - `dictionary`
*
* [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
* for more information on these.
*
* Additional options, for internal needs:
*
* - `chunkSize` - size of generated data chunks (16K by default)
* - `raw` (Boolean) - do raw deflate
* - `gzip` (Boolean) - create gzip wrapper
* - `header` (Object) - custom header for gzip
*   - `text` (Boolean) - true if compressed data believed to be text
*   - `time` (Number) - modification time, unix timestamp
*   - `os` (Number) - operation system code
*   - `extra` (Array) - array of bytes with extra data (max 65536)
*   - `name` (String) - file name (binary string)
*   - `comment` (String) - comment (binary string)
*   - `hcrc` (Boolean) - true if header crc should be added
*
* ##### Example:
*
* ```javascript
* const pako = require('pako')
*   , chunk1 = new Uint8Array([1,2,3,4,5,6,7,8,9])
*   , chunk2 = new Uint8Array([10,11,12,13,14,15,16,17,18,19]);
*
* const deflate = new pako.Deflate({ level: 3});
*
* deflate.push(chunk1, false);
* deflate.push(chunk2, true);  // true -> last chunk
*
* if (deflate.err) { throw new Error(deflate.err); }
*
* console.log(deflate.result);
* ```
**/
function Deflate(options) {
	this.options = common.assign({
		level: Z_DEFAULT_COMPRESSION$1,
		method: Z_DEFLATED$1,
		chunkSize: 16384,
		windowBits: 15,
		memLevel: 8,
		strategy: Z_DEFAULT_STRATEGY$1
	}, options || {});
	let opt = this.options;
	if (opt.raw && opt.windowBits > 0) opt.windowBits = -opt.windowBits;
	else if (opt.gzip && opt.windowBits > 0 && opt.windowBits < 16) opt.windowBits += 16;
	this.err = 0;
	this.msg = "";
	this.ended = false;
	this.chunks = [];
	this.strm = new zstream();
	this.strm.avail_out = 0;
	let status = deflate_1.deflateInit2(this.strm, opt.level, opt.method, opt.windowBits, opt.memLevel, opt.strategy);
	if (status !== Z_OK$1) throw new Error(messages[status]);
	if (opt.header) deflate_1.deflateSetHeader(this.strm, opt.header);
	if (opt.dictionary) {
		let dict;
		if (typeof opt.dictionary === "string") dict = strings.string2buf(opt.dictionary);
		else if (toString.call(opt.dictionary) === "[object ArrayBuffer]") dict = new Uint8Array(opt.dictionary);
		else dict = opt.dictionary;
		status = deflate_1.deflateSetDictionary(this.strm, dict);
		if (status !== Z_OK$1) throw new Error(messages[status]);
		this._dict_set = true;
	}
}
/**
* deflate(data[, options]) -> Uint8Array
* - data (Uint8Array|String): input data to compress.
* - options (Object): zlib deflate options.
*
* Compress `data` with deflate algorithm and `options`.
*
* Supported options are:
*
* - level
* - windowBits
* - memLevel
* - strategy
* - dictionary
*
* [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
* for more information on these.
*
* Sugar (options):
*
* - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
*   negative windowBits implicitly.
*
* ##### Example:
*
* ```javascript
* const pako = require('pako')
* const data = new Uint8Array([1,2,3,4,5,6,7,8,9]);
*
* console.log(pako.deflate(data));
* ```
**/
function deflate$1(input, options) {
	const deflator = new Deflate(options);
	deflator.push(input, true);
	if (deflator.err) throw deflator.msg || messages[deflator.err];
	return deflator.result;
}
/**
* deflateRaw(data[, options]) -> Uint8Array
* - data (Uint8Array|String): input data to compress.
* - options (Object): zlib deflate options.
*
* The same as [[deflate]], but creates raw data, without wrapper
* (header and adler32 crc).
**/
function deflateRaw(input, options) {
	options = options || {};
	options.raw = true;
	return deflate$1(input, options);
}
/**
* gzip(data[, options]) -> Uint8Array
* - data (Uint8Array|String): input data to compress.
* - options (Object): zlib deflate options.
*
* The same as [[deflate]], but create gzip wrapper instead of
* deflate one.
**/
function gzip(input, options) {
	options = options || {};
	options.gzip = true;
	return deflate$1(input, options);
}
function InflateState() {
	this.mode = 0;
	this.last = false;
	this.wrap = 0;
	this.havedict = false;
	this.flags = 0;
	this.dmax = 0;
	this.check = 0;
	this.total = 0;
	this.head = null;
	this.wbits = 0;
	this.wsize = 0;
	this.whave = 0;
	this.wnext = 0;
	this.window = null;
	this.hold = 0;
	this.bits = 0;
	this.length = 0;
	this.offset = 0;
	this.extra = 0;
	this.lencode = null;
	this.distcode = null;
	this.lenbits = 0;
	this.distbits = 0;
	this.ncode = 0;
	this.nlen = 0;
	this.ndist = 0;
	this.have = 0;
	this.next = null;
	this.lens = new Uint16Array(320);
	this.work = new Uint16Array(288);
	this.lendyn = null;
	this.distdyn = null;
	this.sane = 0;
	this.back = 0;
	this.was = 0;
}
function GZheader() {
	this.text = 0;
	this.time = 0;
	this.xflags = 0;
	this.os = 0;
	this.extra = null;
	this.extra_len = 0;
	this.name = "";
	this.comment = "";
	this.hcrc = 0;
	this.done = false;
}
/**
* class Inflate
*
* Generic JS-style wrapper for zlib calls. If you don't need
* streaming behaviour - use more simple functions: [[inflate]]
* and [[inflateRaw]].
**/
/**
* Inflate.result -> Uint8Array|String
*
* Uncompressed result, generated by default [[Inflate#onData]]
* and [[Inflate#onEnd]] handlers. Filled after you push last chunk
* (call [[Inflate#push]] with `Z_FINISH` / `true` param).
**/
/**
* Inflate.err -> Number
*
* Error code after inflate finished. 0 (Z_OK) on success.
* Should be checked if broken data possible.
**/
/**
* Inflate.msg -> String
*
* Error message, if [[Inflate.err]] != 0
**/
/**
* new Inflate(options)
* - options (Object): zlib inflate options.
*
* Creates new inflator instance with specified params. Throws exception
* on bad params. Supported options:
*
* - `windowBits`
* - `dictionary`
*
* [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
* for more information on these.
*
* Additional options, for internal needs:
*
* - `chunkSize` - size of generated data chunks (16K by default)
* - `raw` (Boolean) - do raw inflate
* - `to` (String) - if equal to 'string', then result will be converted
*   from utf8 to utf16 (javascript) string. When string output requested,
*   chunk length can differ from `chunkSize`, depending on content.
*
* By default, when no options set, autodetect deflate/gzip data format via
* wrapper header.
*
* ##### Example:
*
* ```javascript
* const pako = require('pako')
* const chunk1 = new Uint8Array([1,2,3,4,5,6,7,8,9])
* const chunk2 = new Uint8Array([10,11,12,13,14,15,16,17,18,19]);
*
* const inflate = new pako.Inflate({ level: 3});
*
* inflate.push(chunk1, false);
* inflate.push(chunk2, true);  // true -> last chunk
*
* if (inflate.err) { throw new Error(inflate.err); }
*
* console.log(inflate.result);
* ```
**/
function Inflate(options) {
	this.options = common.assign({
		chunkSize: 1024 * 64,
		windowBits: 15,
		to: ""
	}, options || {});
	const opt = this.options;
	if (opt.raw && opt.windowBits >= 0 && opt.windowBits < 16) {
		opt.windowBits = -opt.windowBits;
		if (opt.windowBits === 0) opt.windowBits = -15;
	}
	if (opt.windowBits >= 0 && opt.windowBits < 16 && !(options && options.windowBits)) opt.windowBits += 32;
	if (opt.windowBits > 15 && opt.windowBits < 48) {
		if ((opt.windowBits & 15) === 0) opt.windowBits |= 15;
	}
	this.err = 0;
	this.msg = "";
	this.ended = false;
	this.chunks = [];
	this.strm = new zstream();
	this.strm.avail_out = 0;
	let status = inflate_1.inflateInit2(this.strm, opt.windowBits);
	if (status !== Z_OK$3) throw new Error(messages[status]);
	this.header = new gzheader();
	inflate_1.inflateGetHeader(this.strm, this.header);
	if (opt.dictionary) {
		if (typeof opt.dictionary === "string") opt.dictionary = strings.string2buf(opt.dictionary);
		else if (toString$1.call(opt.dictionary) === "[object ArrayBuffer]") opt.dictionary = new Uint8Array(opt.dictionary);
		if (opt.raw) {
			status = inflate_1.inflateSetDictionary(this.strm, opt.dictionary);
			if (status !== Z_OK$3) throw new Error(messages[status]);
		}
	}
}
/**
* inflate(data[, options]) -> Uint8Array|String
* - data (Uint8Array): input data to decompress.
* - options (Object): zlib inflate options.
*
* Decompress `data` with inflate/ungzip and `options`. Autodetect
* format via wrapper header by default. That's why we don't provide
* separate `ungzip` method.
*
* Supported options are:
*
* - windowBits
*
* [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
* for more information.
*
* Sugar (options):
*
* - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
*   negative windowBits implicitly.
* - `to` (String) - if equal to 'string', then result will be converted
*   from utf8 to utf16 (javascript) string. When string output requested,
*   chunk length can differ from `chunkSize`, depending on content.
*
*
* ##### Example:
*
* ```javascript
* const pako = require('pako');
* const input = pako.deflate(new Uint8Array([1,2,3,4,5,6,7,8,9]));
* let output;
*
* try {
*   output = pako.inflate(input);
* } catch (err)
*   console.log(err);
* }
* ```
**/
function inflate$1(input, options) {
	const inflator = new Inflate(options);
	inflator.push(input);
	if (inflator.err) throw inflator.msg || messages[inflator.err];
	return inflator.result;
}
/**
* inflateRaw(data[, options]) -> Uint8Array|String
* - data (Uint8Array): input data to decompress.
* - options (Object): zlib inflate options.
*
* The same as [[inflate]], but creates raw data, without wrapper
* (header and adler32 crc).
**/
function inflateRaw(input, options) {
	options = options || {};
	options.raw = true;
	return inflate$1(input, options);
}
var Z_FIXED, Z_BINARY, Z_TEXT, Z_UNKNOWN, STORED_BLOCK, STATIC_TREES, DYN_TREES, MIN_MATCH, MAX_MATCH, LENGTH_CODES, LITERALS, L_CODES, D_CODES, BL_CODES, HEAP_SIZE, MAX_BITS, Buf_size, MAX_BL_BITS, END_BLOCK, REP_3_6, REPZ_3_10, REPZ_11_138, extra_lbits, extra_dbits, extra_blbits, bl_order, DIST_CODE_LEN, static_ltree, static_dtree, _dist_code, _length_code, base_length, base_dist, static_l_desc, static_d_desc, static_bl_desc, d_code, put_short, send_bits, send_code, bi_reverse, bi_flush, gen_bitlen, gen_codes, tr_static_init, init_block, bi_windup, copy_block, smaller, pqdownheap, compress_block, build_tree, scan_tree, send_tree, build_bl_tree, send_all_trees, detect_data_type, static_init_done, _tr_init, _tr_stored_block, _tr_align, _tr_flush_block, _tr_tally, trees, adler32, adler32_1, makeTable, crcTable, crc32, crc32_1, messages, constants, _tr_init$1, _tr_stored_block$1, _tr_flush_block$1, _tr_tally$1, _tr_align$1, Z_NO_FLUSH, Z_PARTIAL_FLUSH, Z_FULL_FLUSH, Z_FINISH, Z_BLOCK, Z_OK, Z_STREAM_END, Z_STREAM_ERROR, Z_DATA_ERROR, Z_BUF_ERROR, Z_DEFAULT_COMPRESSION, Z_FILTERED, Z_HUFFMAN_ONLY, Z_RLE, Z_FIXED$1, Z_DEFAULT_STRATEGY, Z_UNKNOWN$1, Z_DEFLATED, MAX_MEM_LEVEL, MAX_WBITS, DEF_MEM_LEVEL, L_CODES$1, D_CODES$1, BL_CODES$1, HEAP_SIZE$1, MAX_BITS$1, MIN_MATCH$1, MAX_MATCH$1, MIN_LOOKAHEAD, PRESET_DICT, INIT_STATE, EXTRA_STATE, NAME_STATE, COMMENT_STATE, HCRC_STATE, BUSY_STATE, FINISH_STATE, BS_NEED_MORE, BS_BLOCK_DONE, BS_FINISH_STARTED, BS_FINISH_DONE, OS_CODE, err, rank, zero$1, HASH_ZLIB, HASH, flush_pending, flush_block_only, put_byte, putShortMSB, read_buf, longest_match, fill_window, deflate_stored, deflate_fast, deflate_slow, deflate_rle, deflate_huff, configuration_table, lm_init, deflateResetKeep, deflateReset, deflateSetHeader, deflateInit2, deflateInit, deflate, deflateEnd, deflateSetDictionary, deflate_1, _has, assign, flattenChunks, common, STR_APPLY_UIA_OK, _utf8len, string2buf, buf2binstring, buf2string, utf8border, strings, zstream, toString, Z_NO_FLUSH$1, Z_SYNC_FLUSH, Z_FULL_FLUSH$1, Z_FINISH$1, Z_OK$1, Z_STREAM_END$1, Z_DEFAULT_COMPRESSION$1, Z_DEFAULT_STRATEGY$1, Z_DEFLATED$1, deflate_1$1, BAD, TYPE, inffast, MAXBITS, ENOUGH_LENS, ENOUGH_DISTS, CODES, LENS, DISTS, lbase, lext, dbase, dext, inflate_table, inftrees, CODES$1, LENS$1, DISTS$1, Z_FINISH$2, Z_BLOCK$1, Z_TREES, Z_OK$2, Z_STREAM_END$2, Z_NEED_DICT, Z_STREAM_ERROR$1, Z_DATA_ERROR$1, Z_MEM_ERROR, Z_BUF_ERROR$1, Z_DEFLATED$2, HEAD, FLAGS, TIME, OS, EXLEN, EXTRA, NAME, COMMENT, HCRC, DICTID, DICT, TYPE$1, TYPEDO, STORED, COPY_, COPY, TABLE, LENLENS, CODELENS, LEN_, LEN, LENEXT, DIST, DISTEXT, MATCH, LIT, CHECK, LENGTH, DONE, BAD$1, MEM, SYNC, ENOUGH_LENS$1, ENOUGH_DISTS$1, DEF_WBITS, zswap32, inflateResetKeep, inflateReset, inflateReset2, inflateInit2, inflateInit, virgin, lenfix, distfix, fixedtables, updatewindow, inflate, inflateEnd, inflateGetHeader, inflateSetDictionary, inflate_1, gzheader, toString$1, Z_NO_FLUSH$2, Z_FINISH$3, Z_OK$3, Z_STREAM_END$3, Z_NEED_DICT$1, Z_STREAM_ERROR$2, Z_DATA_ERROR$2, Z_MEM_ERROR$1, inflate_1$1, Deflate$1, deflate$2, deflateRaw$1, gzip$1, Inflate$1, inflate$2, inflateRaw$1, ungzip$1, deflate_1$2, inflate_1$2;
var init_pako_esm = __esmMin((() => {
	Z_FIXED = 4;
	Z_BINARY = 0;
	Z_TEXT = 1;
	Z_UNKNOWN = 2;
	STORED_BLOCK = 0;
	STATIC_TREES = 1;
	DYN_TREES = 2;
	MIN_MATCH = 3;
	MAX_MATCH = 258;
	LENGTH_CODES = 29;
	LITERALS = 256;
	L_CODES = LITERALS + 1 + LENGTH_CODES;
	D_CODES = 30;
	BL_CODES = 19;
	HEAP_SIZE = 2 * L_CODES + 1;
	MAX_BITS = 15;
	Buf_size = 16;
	MAX_BL_BITS = 7;
	END_BLOCK = 256;
	REP_3_6 = 16;
	REPZ_3_10 = 17;
	REPZ_11_138 = 18;
	extra_lbits = new Uint8Array([
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		1,
		1,
		1,
		1,
		2,
		2,
		2,
		2,
		3,
		3,
		3,
		3,
		4,
		4,
		4,
		4,
		5,
		5,
		5,
		5,
		0
	]);
	extra_dbits = new Uint8Array([
		0,
		0,
		0,
		0,
		1,
		1,
		2,
		2,
		3,
		3,
		4,
		4,
		5,
		5,
		6,
		6,
		7,
		7,
		8,
		8,
		9,
		9,
		10,
		10,
		11,
		11,
		12,
		12,
		13,
		13
	]);
	extra_blbits = new Uint8Array([
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		2,
		3,
		7
	]);
	bl_order = new Uint8Array([
		16,
		17,
		18,
		0,
		8,
		7,
		9,
		6,
		10,
		5,
		11,
		4,
		12,
		3,
		13,
		2,
		14,
		1,
		15
	]);
	DIST_CODE_LEN = 512;
	static_ltree = new Array((L_CODES + 2) * 2);
	zero(static_ltree);
	static_dtree = new Array(D_CODES * 2);
	zero(static_dtree);
	_dist_code = new Array(DIST_CODE_LEN);
	zero(_dist_code);
	_length_code = new Array(MAX_MATCH - MIN_MATCH + 1);
	zero(_length_code);
	base_length = new Array(LENGTH_CODES);
	zero(base_length);
	base_dist = new Array(D_CODES);
	zero(base_dist);
	d_code = (dist) => {
		return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
	};
	put_short = (s, w) => {
		s.pending_buf[s.pending++] = w & 255;
		s.pending_buf[s.pending++] = w >>> 8 & 255;
	};
	send_bits = (s, value, length) => {
		if (s.bi_valid > Buf_size - length) {
			s.bi_buf |= value << s.bi_valid & 65535;
			put_short(s, s.bi_buf);
			s.bi_buf = value >> Buf_size - s.bi_valid;
			s.bi_valid += length - Buf_size;
		} else {
			s.bi_buf |= value << s.bi_valid & 65535;
			s.bi_valid += length;
		}
	};
	send_code = (s, c, tree) => {
		send_bits(s, tree[c * 2], tree[c * 2 + 1]);
	};
	bi_reverse = (code, len) => {
		let res = 0;
		do {
			res |= code & 1;
			code >>>= 1;
			res <<= 1;
		} while (--len > 0);
		return res >>> 1;
	};
	bi_flush = (s) => {
		if (s.bi_valid === 16) {
			put_short(s, s.bi_buf);
			s.bi_buf = 0;
			s.bi_valid = 0;
		} else if (s.bi_valid >= 8) {
			s.pending_buf[s.pending++] = s.bi_buf & 255;
			s.bi_buf >>= 8;
			s.bi_valid -= 8;
		}
	};
	gen_bitlen = (s, desc) => {
		const tree = desc.dyn_tree;
		const max_code = desc.max_code;
		const stree = desc.stat_desc.static_tree;
		const has_stree = desc.stat_desc.has_stree;
		const extra = desc.stat_desc.extra_bits;
		const base = desc.stat_desc.extra_base;
		const max_length = desc.stat_desc.max_length;
		let h;
		let n, m;
		let bits;
		let xbits;
		let f;
		let overflow = 0;
		for (bits = 0; bits <= MAX_BITS; bits++) s.bl_count[bits] = 0;
		tree[s.heap[s.heap_max] * 2 + 1] = 0;
		for (h = s.heap_max + 1; h < HEAP_SIZE; h++) {
			n = s.heap[h];
			bits = tree[tree[n * 2 + 1] * 2 + 1] + 1;
			if (bits > max_length) {
				bits = max_length;
				overflow++;
			}
			tree[n * 2 + 1] = bits;
			if (n > max_code) continue;
			s.bl_count[bits]++;
			xbits = 0;
			if (n >= base) xbits = extra[n - base];
			f = tree[n * 2];
			s.opt_len += f * (bits + xbits);
			if (has_stree) s.static_len += f * (stree[n * 2 + 1] + xbits);
		}
		if (overflow === 0) return;
		do {
			bits = max_length - 1;
			while (s.bl_count[bits] === 0) bits--;
			s.bl_count[bits]--;
			s.bl_count[bits + 1] += 2;
			s.bl_count[max_length]--;
			overflow -= 2;
		} while (overflow > 0);
		for (bits = max_length; bits !== 0; bits--) {
			n = s.bl_count[bits];
			while (n !== 0) {
				m = s.heap[--h];
				if (m > max_code) continue;
				if (tree[m * 2 + 1] !== bits) {
					s.opt_len += (bits - tree[m * 2 + 1]) * tree[m * 2];
					tree[m * 2 + 1] = bits;
				}
				n--;
			}
		}
	};
	gen_codes = (tree, max_code, bl_count) => {
		const next_code = new Array(MAX_BITS + 1);
		let code = 0;
		let bits;
		let n;
		for (bits = 1; bits <= MAX_BITS; bits++) next_code[bits] = code = code + bl_count[bits - 1] << 1;
		for (n = 0; n <= max_code; n++) {
			let len = tree[n * 2 + 1];
			if (len === 0) continue;
			tree[n * 2] = bi_reverse(next_code[len]++, len);
		}
	};
	tr_static_init = () => {
		let n;
		let bits;
		let length;
		let code;
		let dist;
		const bl_count = new Array(MAX_BITS + 1);
		length = 0;
		for (code = 0; code < LENGTH_CODES - 1; code++) {
			base_length[code] = length;
			for (n = 0; n < 1 << extra_lbits[code]; n++) _length_code[length++] = code;
		}
		_length_code[length - 1] = code;
		dist = 0;
		for (code = 0; code < 16; code++) {
			base_dist[code] = dist;
			for (n = 0; n < 1 << extra_dbits[code]; n++) _dist_code[dist++] = code;
		}
		dist >>= 7;
		for (; code < D_CODES; code++) {
			base_dist[code] = dist << 7;
			for (n = 0; n < 1 << extra_dbits[code] - 7; n++) _dist_code[256 + dist++] = code;
		}
		for (bits = 0; bits <= MAX_BITS; bits++) bl_count[bits] = 0;
		n = 0;
		while (n <= 143) {
			static_ltree[n * 2 + 1] = 8;
			n++;
			bl_count[8]++;
		}
		while (n <= 255) {
			static_ltree[n * 2 + 1] = 9;
			n++;
			bl_count[9]++;
		}
		while (n <= 279) {
			static_ltree[n * 2 + 1] = 7;
			n++;
			bl_count[7]++;
		}
		while (n <= 287) {
			static_ltree[n * 2 + 1] = 8;
			n++;
			bl_count[8]++;
		}
		gen_codes(static_ltree, L_CODES + 1, bl_count);
		for (n = 0; n < D_CODES; n++) {
			static_dtree[n * 2 + 1] = 5;
			static_dtree[n * 2] = bi_reverse(n, 5);
		}
		static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS + 1, L_CODES, MAX_BITS);
		static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0, D_CODES, MAX_BITS);
		static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0, BL_CODES, MAX_BL_BITS);
	};
	init_block = (s) => {
		let n;
		for (n = 0; n < L_CODES; n++) s.dyn_ltree[n * 2] = 0;
		for (n = 0; n < D_CODES; n++) s.dyn_dtree[n * 2] = 0;
		for (n = 0; n < BL_CODES; n++) s.bl_tree[n * 2] = 0;
		s.dyn_ltree[END_BLOCK * 2] = 1;
		s.opt_len = s.static_len = 0;
		s.last_lit = s.matches = 0;
	};
	bi_windup = (s) => {
		if (s.bi_valid > 8) put_short(s, s.bi_buf);
		else if (s.bi_valid > 0) s.pending_buf[s.pending++] = s.bi_buf;
		s.bi_buf = 0;
		s.bi_valid = 0;
	};
	copy_block = (s, buf, len, header) => {
		bi_windup(s);
		if (header) {
			put_short(s, len);
			put_short(s, ~len);
		}
		s.pending_buf.set(s.window.subarray(buf, buf + len), s.pending);
		s.pending += len;
	};
	smaller = (tree, n, m, depth) => {
		const _n2 = n * 2;
		const _m2 = m * 2;
		return tree[_n2] < tree[_m2] || tree[_n2] === tree[_m2] && depth[n] <= depth[m];
	};
	pqdownheap = (s, tree, k) => {
		const v = s.heap[k];
		let j = k << 1;
		while (j <= s.heap_len) {
			if (j < s.heap_len && smaller(tree, s.heap[j + 1], s.heap[j], s.depth)) j++;
			if (smaller(tree, v, s.heap[j], s.depth)) break;
			s.heap[k] = s.heap[j];
			k = j;
			j <<= 1;
		}
		s.heap[k] = v;
	};
	compress_block = (s, ltree, dtree) => {
		let dist;
		let lc;
		let lx = 0;
		let code;
		let extra;
		if (s.last_lit !== 0) do {
			dist = s.pending_buf[s.d_buf + lx * 2] << 8 | s.pending_buf[s.d_buf + lx * 2 + 1];
			lc = s.pending_buf[s.l_buf + lx];
			lx++;
			if (dist === 0) send_code(s, lc, ltree);
			else {
				code = _length_code[lc];
				send_code(s, code + LITERALS + 1, ltree);
				extra = extra_lbits[code];
				if (extra !== 0) {
					lc -= base_length[code];
					send_bits(s, lc, extra);
				}
				dist--;
				code = d_code(dist);
				send_code(s, code, dtree);
				extra = extra_dbits[code];
				if (extra !== 0) {
					dist -= base_dist[code];
					send_bits(s, dist, extra);
				}
			}
		} while (lx < s.last_lit);
		send_code(s, END_BLOCK, ltree);
	};
	build_tree = (s, desc) => {
		const tree = desc.dyn_tree;
		const stree = desc.stat_desc.static_tree;
		const has_stree = desc.stat_desc.has_stree;
		const elems = desc.stat_desc.elems;
		let n, m;
		let max_code = -1;
		let node;
		s.heap_len = 0;
		s.heap_max = HEAP_SIZE;
		for (n = 0; n < elems; n++) if (tree[n * 2] !== 0) {
			s.heap[++s.heap_len] = max_code = n;
			s.depth[n] = 0;
		} else tree[n * 2 + 1] = 0;
		while (s.heap_len < 2) {
			node = s.heap[++s.heap_len] = max_code < 2 ? ++max_code : 0;
			tree[node * 2] = 1;
			s.depth[node] = 0;
			s.opt_len--;
			if (has_stree) s.static_len -= stree[node * 2 + 1];
		}
		desc.max_code = max_code;
		for (n = s.heap_len >> 1; n >= 1; n--) pqdownheap(s, tree, n);
		node = elems;
		do {
			/*** pqremove ***/
			n = s.heap[1];
			s.heap[1] = s.heap[s.heap_len--];
			pqdownheap(s, tree, 1);
			m = s.heap[1];
			s.heap[--s.heap_max] = n;
			s.heap[--s.heap_max] = m;
			tree[node * 2] = tree[n * 2] + tree[m * 2];
			s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
			tree[n * 2 + 1] = tree[m * 2 + 1] = node;
			s.heap[1] = node++;
			pqdownheap(s, tree, 1);
		} while (s.heap_len >= 2);
		s.heap[--s.heap_max] = s.heap[1];
		gen_bitlen(s, desc);
		gen_codes(tree, max_code, s.bl_count);
	};
	scan_tree = (s, tree, max_code) => {
		let n;
		let prevlen = -1;
		let curlen;
		let nextlen = tree[1];
		let count = 0;
		let max_count = 7;
		let min_count = 4;
		if (nextlen === 0) {
			max_count = 138;
			min_count = 3;
		}
		tree[(max_code + 1) * 2 + 1] = 65535;
		for (n = 0; n <= max_code; n++) {
			curlen = nextlen;
			nextlen = tree[(n + 1) * 2 + 1];
			if (++count < max_count && curlen === nextlen) continue;
			else if (count < min_count) s.bl_tree[curlen * 2] += count;
			else if (curlen !== 0) {
				if (curlen !== prevlen) s.bl_tree[curlen * 2]++;
				s.bl_tree[REP_3_6 * 2]++;
			} else if (count <= 10) s.bl_tree[REPZ_3_10 * 2]++;
			else s.bl_tree[REPZ_11_138 * 2]++;
			count = 0;
			prevlen = curlen;
			if (nextlen === 0) {
				max_count = 138;
				min_count = 3;
			} else if (curlen === nextlen) {
				max_count = 6;
				min_count = 3;
			} else {
				max_count = 7;
				min_count = 4;
			}
		}
	};
	send_tree = (s, tree, max_code) => {
		let n;
		let prevlen = -1;
		let curlen;
		let nextlen = tree[1];
		let count = 0;
		let max_count = 7;
		let min_count = 4;
		if (nextlen === 0) {
			max_count = 138;
			min_count = 3;
		}
		for (n = 0; n <= max_code; n++) {
			curlen = nextlen;
			nextlen = tree[(n + 1) * 2 + 1];
			if (++count < max_count && curlen === nextlen) continue;
			else if (count < min_count) do
				send_code(s, curlen, s.bl_tree);
			while (--count !== 0);
			else if (curlen !== 0) {
				if (curlen !== prevlen) {
					send_code(s, curlen, s.bl_tree);
					count--;
				}
				send_code(s, REP_3_6, s.bl_tree);
				send_bits(s, count - 3, 2);
			} else if (count <= 10) {
				send_code(s, REPZ_3_10, s.bl_tree);
				send_bits(s, count - 3, 3);
			} else {
				send_code(s, REPZ_11_138, s.bl_tree);
				send_bits(s, count - 11, 7);
			}
			count = 0;
			prevlen = curlen;
			if (nextlen === 0) {
				max_count = 138;
				min_count = 3;
			} else if (curlen === nextlen) {
				max_count = 6;
				min_count = 3;
			} else {
				max_count = 7;
				min_count = 4;
			}
		}
	};
	build_bl_tree = (s) => {
		let max_blindex;
		scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
		scan_tree(s, s.dyn_dtree, s.d_desc.max_code);
		build_tree(s, s.bl_desc);
		for (max_blindex = BL_CODES - 1; max_blindex >= 3; max_blindex--) if (s.bl_tree[bl_order[max_blindex] * 2 + 1] !== 0) break;
		s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
		return max_blindex;
	};
	send_all_trees = (s, lcodes, dcodes, blcodes) => {
		let rank;
		send_bits(s, lcodes - 257, 5);
		send_bits(s, dcodes - 1, 5);
		send_bits(s, blcodes - 4, 4);
		for (rank = 0; rank < blcodes; rank++) send_bits(s, s.bl_tree[bl_order[rank] * 2 + 1], 3);
		send_tree(s, s.dyn_ltree, lcodes - 1);
		send_tree(s, s.dyn_dtree, dcodes - 1);
	};
	detect_data_type = (s) => {
		let black_mask = 4093624447;
		let n;
		for (n = 0; n <= 31; n++, black_mask >>>= 1) if (black_mask & 1 && s.dyn_ltree[n * 2] !== 0) return Z_BINARY;
		if (s.dyn_ltree[18] !== 0 || s.dyn_ltree[20] !== 0 || s.dyn_ltree[26] !== 0) return Z_TEXT;
		for (n = 32; n < LITERALS; n++) if (s.dyn_ltree[n * 2] !== 0) return Z_TEXT;
		return Z_BINARY;
	};
	static_init_done = false;
	_tr_init = (s) => {
		if (!static_init_done) {
			tr_static_init();
			static_init_done = true;
		}
		s.l_desc = new TreeDesc(s.dyn_ltree, static_l_desc);
		s.d_desc = new TreeDesc(s.dyn_dtree, static_d_desc);
		s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);
		s.bi_buf = 0;
		s.bi_valid = 0;
		init_block(s);
	};
	_tr_stored_block = (s, buf, stored_len, last) => {
		send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3);
		copy_block(s, buf, stored_len, true);
	};
	_tr_align = (s) => {
		send_bits(s, STATIC_TREES << 1, 3);
		send_code(s, END_BLOCK, static_ltree);
		bi_flush(s);
	};
	_tr_flush_block = (s, buf, stored_len, last) => {
		let opt_lenb, static_lenb;
		let max_blindex = 0;
		if (s.level > 0) {
			if (s.strm.data_type === Z_UNKNOWN) s.strm.data_type = detect_data_type(s);
			build_tree(s, s.l_desc);
			build_tree(s, s.d_desc);
			max_blindex = build_bl_tree(s);
			opt_lenb = s.opt_len + 3 + 7 >>> 3;
			static_lenb = s.static_len + 3 + 7 >>> 3;
			if (static_lenb <= opt_lenb) opt_lenb = static_lenb;
		} else opt_lenb = static_lenb = stored_len + 5;
		if (stored_len + 4 <= opt_lenb && buf !== -1) _tr_stored_block(s, buf, stored_len, last);
		else if (s.strategy === Z_FIXED || static_lenb === opt_lenb) {
			send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
			compress_block(s, static_ltree, static_dtree);
		} else {
			send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3);
			send_all_trees(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1);
			compress_block(s, s.dyn_ltree, s.dyn_dtree);
		}
		init_block(s);
		if (last) bi_windup(s);
	};
	_tr_tally = (s, dist, lc) => {
		s.pending_buf[s.d_buf + s.last_lit * 2] = dist >>> 8 & 255;
		s.pending_buf[s.d_buf + s.last_lit * 2 + 1] = dist & 255;
		s.pending_buf[s.l_buf + s.last_lit] = lc & 255;
		s.last_lit++;
		if (dist === 0) s.dyn_ltree[lc * 2]++;
		else {
			s.matches++;
			dist--;
			s.dyn_ltree[(_length_code[lc] + LITERALS + 1) * 2]++;
			s.dyn_dtree[d_code(dist) * 2]++;
		}
		return s.last_lit === s.lit_bufsize - 1;
	};
	trees = {
		_tr_init,
		_tr_stored_block,
		_tr_flush_block,
		_tr_tally,
		_tr_align
	};
	adler32 = (adler, buf, len, pos) => {
		let s1 = adler & 65535 | 0, s2 = adler >>> 16 & 65535 | 0, n = 0;
		while (len !== 0) {
			n = len > 2e3 ? 2e3 : len;
			len -= n;
			do {
				s1 = s1 + buf[pos++] | 0;
				s2 = s2 + s1 | 0;
			} while (--n);
			s1 %= 65521;
			s2 %= 65521;
		}
		return s1 | s2 << 16 | 0;
	};
	adler32_1 = adler32;
	makeTable = () => {
		let c, table = [];
		for (var n = 0; n < 256; n++) {
			c = n;
			for (var k = 0; k < 8; k++) c = c & 1 ? 3988292384 ^ c >>> 1 : c >>> 1;
			table[n] = c;
		}
		return table;
	};
	crcTable = new Uint32Array(makeTable());
	crc32 = (crc, buf, len, pos) => {
		const t = crcTable;
		const end = pos + len;
		crc ^= -1;
		for (let i = pos; i < end; i++) crc = crc >>> 8 ^ t[(crc ^ buf[i]) & 255];
		return crc ^ -1;
	};
	crc32_1 = crc32;
	messages = {
		2: "need dictionary",
		1: "stream end",
		0: "",
		"-1": "file error",
		"-2": "stream error",
		"-3": "data error",
		"-4": "insufficient memory",
		"-5": "buffer error",
		"-6": "incompatible version"
	};
	constants = {
		Z_NO_FLUSH: 0,
		Z_PARTIAL_FLUSH: 1,
		Z_SYNC_FLUSH: 2,
		Z_FULL_FLUSH: 3,
		Z_FINISH: 4,
		Z_BLOCK: 5,
		Z_TREES: 6,
		Z_OK: 0,
		Z_STREAM_END: 1,
		Z_NEED_DICT: 2,
		Z_ERRNO: -1,
		Z_STREAM_ERROR: -2,
		Z_DATA_ERROR: -3,
		Z_MEM_ERROR: -4,
		Z_BUF_ERROR: -5,
		Z_NO_COMPRESSION: 0,
		Z_BEST_SPEED: 1,
		Z_BEST_COMPRESSION: 9,
		Z_DEFAULT_COMPRESSION: -1,
		Z_FILTERED: 1,
		Z_HUFFMAN_ONLY: 2,
		Z_RLE: 3,
		Z_FIXED: 4,
		Z_DEFAULT_STRATEGY: 0,
		Z_BINARY: 0,
		Z_TEXT: 1,
		Z_UNKNOWN: 2,
		Z_DEFLATED: 8
	};
	({_tr_init: _tr_init$1, _tr_stored_block: _tr_stored_block$1, _tr_flush_block: _tr_flush_block$1, _tr_tally: _tr_tally$1, _tr_align: _tr_align$1} = trees);
	({Z_NO_FLUSH, Z_PARTIAL_FLUSH, Z_FULL_FLUSH, Z_FINISH, Z_BLOCK, Z_OK, Z_STREAM_END, Z_STREAM_ERROR, Z_DATA_ERROR, Z_BUF_ERROR, Z_DEFAULT_COMPRESSION, Z_FILTERED, Z_HUFFMAN_ONLY, Z_RLE, Z_FIXED: Z_FIXED$1, Z_DEFAULT_STRATEGY, Z_UNKNOWN: Z_UNKNOWN$1, Z_DEFLATED} = constants);
	MAX_MEM_LEVEL = 9;
	MAX_WBITS = 15;
	DEF_MEM_LEVEL = 8;
	L_CODES$1 = 286;
	D_CODES$1 = 30;
	BL_CODES$1 = 19;
	HEAP_SIZE$1 = 2 * L_CODES$1 + 1;
	MAX_BITS$1 = 15;
	MIN_MATCH$1 = 3;
	MAX_MATCH$1 = 258;
	MIN_LOOKAHEAD = MAX_MATCH$1 + MIN_MATCH$1 + 1;
	PRESET_DICT = 32;
	INIT_STATE = 42;
	EXTRA_STATE = 69;
	NAME_STATE = 73;
	COMMENT_STATE = 91;
	HCRC_STATE = 103;
	BUSY_STATE = 113;
	FINISH_STATE = 666;
	BS_NEED_MORE = 1;
	BS_BLOCK_DONE = 2;
	BS_FINISH_STARTED = 3;
	BS_FINISH_DONE = 4;
	OS_CODE = 3;
	err = (strm, errorCode) => {
		strm.msg = messages[errorCode];
		return errorCode;
	};
	rank = (f) => {
		return (f << 1) - (f > 4 ? 9 : 0);
	};
	zero$1 = (buf) => {
		let len = buf.length;
		while (--len >= 0) buf[len] = 0;
	};
	HASH_ZLIB = (s, prev, data) => (prev << s.hash_shift ^ data) & s.hash_mask;
	HASH = HASH_ZLIB;
	flush_pending = (strm) => {
		const s = strm.state;
		let len = s.pending;
		if (len > strm.avail_out) len = strm.avail_out;
		if (len === 0) return;
		strm.output.set(s.pending_buf.subarray(s.pending_out, s.pending_out + len), strm.next_out);
		strm.next_out += len;
		s.pending_out += len;
		strm.total_out += len;
		strm.avail_out -= len;
		s.pending -= len;
		if (s.pending === 0) s.pending_out = 0;
	};
	flush_block_only = (s, last) => {
		_tr_flush_block$1(s, s.block_start >= 0 ? s.block_start : -1, s.strstart - s.block_start, last);
		s.block_start = s.strstart;
		flush_pending(s.strm);
	};
	put_byte = (s, b) => {
		s.pending_buf[s.pending++] = b;
	};
	putShortMSB = (s, b) => {
		s.pending_buf[s.pending++] = b >>> 8 & 255;
		s.pending_buf[s.pending++] = b & 255;
	};
	read_buf = (strm, buf, start, size) => {
		let len = strm.avail_in;
		if (len > size) len = size;
		if (len === 0) return 0;
		strm.avail_in -= len;
		buf.set(strm.input.subarray(strm.next_in, strm.next_in + len), start);
		if (strm.state.wrap === 1) strm.adler = adler32_1(strm.adler, buf, len, start);
		else if (strm.state.wrap === 2) strm.adler = crc32_1(strm.adler, buf, len, start);
		strm.next_in += len;
		strm.total_in += len;
		return len;
	};
	longest_match = (s, cur_match) => {
		let chain_length = s.max_chain_length;
		let scan = s.strstart;
		let match;
		let len;
		let best_len = s.prev_length;
		let nice_match = s.nice_match;
		const limit = s.strstart > s.w_size - MIN_LOOKAHEAD ? s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0;
		const _win = s.window;
		const wmask = s.w_mask;
		const prev = s.prev;
		const strend = s.strstart + MAX_MATCH$1;
		let scan_end1 = _win[scan + best_len - 1];
		let scan_end = _win[scan + best_len];
		if (s.prev_length >= s.good_match) chain_length >>= 2;
		if (nice_match > s.lookahead) nice_match = s.lookahead;
		do {
			match = cur_match;
			if (_win[match + best_len] !== scan_end || _win[match + best_len - 1] !== scan_end1 || _win[match] !== _win[scan] || _win[++match] !== _win[scan + 1]) continue;
			scan += 2;
			match++;
			do			;
while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && scan < strend);
			len = MAX_MATCH$1 - (strend - scan);
			scan = strend - MAX_MATCH$1;
			if (len > best_len) {
				s.match_start = cur_match;
				best_len = len;
				if (len >= nice_match) break;
				scan_end1 = _win[scan + best_len - 1];
				scan_end = _win[scan + best_len];
			}
		} while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);
		if (best_len <= s.lookahead) return best_len;
		return s.lookahead;
	};
	fill_window = (s) => {
		const _w_size = s.w_size;
		let p, n, m, more, str;
		do {
			more = s.window_size - s.lookahead - s.strstart;
			if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {
				s.window.set(s.window.subarray(_w_size, _w_size + _w_size), 0);
				s.match_start -= _w_size;
				s.strstart -= _w_size;
				s.block_start -= _w_size;
				n = s.hash_size;
				p = n;
				do {
					m = s.head[--p];
					s.head[p] = m >= _w_size ? m - _w_size : 0;
				} while (--n);
				n = _w_size;
				p = n;
				do {
					m = s.prev[--p];
					s.prev[p] = m >= _w_size ? m - _w_size : 0;
				} while (--n);
				more += _w_size;
			}
			if (s.strm.avail_in === 0) break;
			n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
			s.lookahead += n;
			if (s.lookahead + s.insert >= MIN_MATCH$1) {
				str = s.strstart - s.insert;
				s.ins_h = s.window[str];
				s.ins_h = HASH(s, s.ins_h, s.window[str + 1]);
				while (s.insert) {
					s.ins_h = HASH(s, s.ins_h, s.window[str + MIN_MATCH$1 - 1]);
					s.prev[str & s.w_mask] = s.head[s.ins_h];
					s.head[s.ins_h] = str;
					str++;
					s.insert--;
					if (s.lookahead + s.insert < MIN_MATCH$1) break;
				}
			}
		} while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);
	};
	deflate_stored = (s, flush) => {
		let max_block_size = 65535;
		if (max_block_size > s.pending_buf_size - 5) max_block_size = s.pending_buf_size - 5;
		for (;;) {
			if (s.lookahead <= 1) {
				fill_window(s);
				if (s.lookahead === 0 && flush === Z_NO_FLUSH) return BS_NEED_MORE;
				if (s.lookahead === 0) break;
			}
			s.strstart += s.lookahead;
			s.lookahead = 0;
			const max_start = s.block_start + max_block_size;
			if (s.strstart === 0 || s.strstart >= max_start) {
				s.lookahead = s.strstart - max_start;
				s.strstart = max_start;
				/*** FLUSH_BLOCK(s, 0); ***/
				flush_block_only(s, false);
				if (s.strm.avail_out === 0) return BS_NEED_MORE;
			}
			if (s.strstart - s.block_start >= s.w_size - MIN_LOOKAHEAD) {
				/*** FLUSH_BLOCK(s, 0); ***/
				flush_block_only(s, false);
				if (s.strm.avail_out === 0) return BS_NEED_MORE;
			}
		}
		s.insert = 0;
		if (flush === Z_FINISH) {
			/*** FLUSH_BLOCK(s, 1); ***/
			flush_block_only(s, true);
			if (s.strm.avail_out === 0) return BS_FINISH_STARTED;
			return BS_FINISH_DONE;
		}
		if (s.strstart > s.block_start) {
			/*** FLUSH_BLOCK(s, 0); ***/
			flush_block_only(s, false);
			if (s.strm.avail_out === 0) return BS_NEED_MORE;
		}
		return BS_NEED_MORE;
	};
	deflate_fast = (s, flush) => {
		let hash_head;
		let bflush;
		for (;;) {
			if (s.lookahead < MIN_LOOKAHEAD) {
				fill_window(s);
				if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) return BS_NEED_MORE;
				if (s.lookahead === 0) break;
			}
			hash_head = 0;
			if (s.lookahead >= MIN_MATCH$1) {
				/*** INSERT_STRING(s, s.strstart, hash_head); ***/
				s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH$1 - 1]);
				hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
				s.head[s.ins_h] = s.strstart;
			}
			if (hash_head !== 0 && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD) s.match_length = longest_match(s, hash_head);
			if (s.match_length >= MIN_MATCH$1) {
				/*** _tr_tally_dist(s, s.strstart - s.match_start,
				s.match_length - MIN_MATCH, bflush); ***/
				bflush = _tr_tally$1(s, s.strstart - s.match_start, s.match_length - MIN_MATCH$1);
				s.lookahead -= s.match_length;
				if (s.match_length <= s.max_lazy_match && s.lookahead >= MIN_MATCH$1) {
					s.match_length--;
					do {
						s.strstart++;
						/*** INSERT_STRING(s, s.strstart, hash_head); ***/
						s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH$1 - 1]);
						hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
						s.head[s.ins_h] = s.strstart;
					} while (--s.match_length !== 0);
					s.strstart++;
				} else {
					s.strstart += s.match_length;
					s.match_length = 0;
					s.ins_h = s.window[s.strstart];
					s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + 1]);
				}
			} else {
				/*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
				bflush = _tr_tally$1(s, 0, s.window[s.strstart]);
				s.lookahead--;
				s.strstart++;
			}
			if (bflush) {
				/*** FLUSH_BLOCK(s, 0); ***/
				flush_block_only(s, false);
				if (s.strm.avail_out === 0) return BS_NEED_MORE;
			}
		}
		s.insert = s.strstart < MIN_MATCH$1 - 1 ? s.strstart : MIN_MATCH$1 - 1;
		if (flush === Z_FINISH) {
			/*** FLUSH_BLOCK(s, 1); ***/
			flush_block_only(s, true);
			if (s.strm.avail_out === 0) return BS_FINISH_STARTED;
			return BS_FINISH_DONE;
		}
		if (s.last_lit) {
			/*** FLUSH_BLOCK(s, 0); ***/
			flush_block_only(s, false);
			if (s.strm.avail_out === 0) return BS_NEED_MORE;
		}
		return BS_BLOCK_DONE;
	};
	deflate_slow = (s, flush) => {
		let hash_head;
		let bflush;
		let max_insert;
		for (;;) {
			if (s.lookahead < MIN_LOOKAHEAD) {
				fill_window(s);
				if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) return BS_NEED_MORE;
				if (s.lookahead === 0) break;
			}
			hash_head = 0;
			if (s.lookahead >= MIN_MATCH$1) {
				/*** INSERT_STRING(s, s.strstart, hash_head); ***/
				s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH$1 - 1]);
				hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
				s.head[s.ins_h] = s.strstart;
			}
			s.prev_length = s.match_length;
			s.prev_match = s.match_start;
			s.match_length = MIN_MATCH$1 - 1;
			if (hash_head !== 0 && s.prev_length < s.max_lazy_match && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD) {
				s.match_length = longest_match(s, hash_head);
				if (s.match_length <= 5 && (s.strategy === Z_FILTERED || s.match_length === MIN_MATCH$1 && s.strstart - s.match_start > 4096)) s.match_length = MIN_MATCH$1 - 1;
			}
			if (s.prev_length >= MIN_MATCH$1 && s.match_length <= s.prev_length) {
				max_insert = s.strstart + s.lookahead - MIN_MATCH$1;
				/***_tr_tally_dist(s, s.strstart - 1 - s.prev_match,
				s.prev_length - MIN_MATCH, bflush);***/
				bflush = _tr_tally$1(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH$1);
				s.lookahead -= s.prev_length - 1;
				s.prev_length -= 2;
				do
					if (++s.strstart <= max_insert) {
						/*** INSERT_STRING(s, s.strstart, hash_head); ***/
						s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH$1 - 1]);
						hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
						s.head[s.ins_h] = s.strstart;
					}
				while (--s.prev_length !== 0);
				s.match_available = 0;
				s.match_length = MIN_MATCH$1 - 1;
				s.strstart++;
				if (bflush) {
					/*** FLUSH_BLOCK(s, 0); ***/
					flush_block_only(s, false);
					if (s.strm.avail_out === 0) return BS_NEED_MORE;
				}
			} else if (s.match_available) {
				/*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
				bflush = _tr_tally$1(s, 0, s.window[s.strstart - 1]);
				if (bflush)
 /*** FLUSH_BLOCK_ONLY(s, 0) ***/
				flush_block_only(s, false);
				s.strstart++;
				s.lookahead--;
				if (s.strm.avail_out === 0) return BS_NEED_MORE;
			} else {
				s.match_available = 1;
				s.strstart++;
				s.lookahead--;
			}
		}
		if (s.match_available) {
			/*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
			bflush = _tr_tally$1(s, 0, s.window[s.strstart - 1]);
			s.match_available = 0;
		}
		s.insert = s.strstart < MIN_MATCH$1 - 1 ? s.strstart : MIN_MATCH$1 - 1;
		if (flush === Z_FINISH) {
			/*** FLUSH_BLOCK(s, 1); ***/
			flush_block_only(s, true);
			if (s.strm.avail_out === 0) return BS_FINISH_STARTED;
			return BS_FINISH_DONE;
		}
		if (s.last_lit) {
			/*** FLUSH_BLOCK(s, 0); ***/
			flush_block_only(s, false);
			if (s.strm.avail_out === 0) return BS_NEED_MORE;
		}
		return BS_BLOCK_DONE;
	};
	deflate_rle = (s, flush) => {
		let bflush;
		let prev;
		let scan, strend;
		const _win = s.window;
		for (;;) {
			if (s.lookahead <= MAX_MATCH$1) {
				fill_window(s);
				if (s.lookahead <= MAX_MATCH$1 && flush === Z_NO_FLUSH) return BS_NEED_MORE;
				if (s.lookahead === 0) break;
			}
			s.match_length = 0;
			if (s.lookahead >= MIN_MATCH$1 && s.strstart > 0) {
				scan = s.strstart - 1;
				prev = _win[scan];
				if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
					strend = s.strstart + MAX_MATCH$1;
					do					;
while (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && scan < strend);
					s.match_length = MAX_MATCH$1 - (strend - scan);
					if (s.match_length > s.lookahead) s.match_length = s.lookahead;
				}
			}
			if (s.match_length >= MIN_MATCH$1) {
				/*** _tr_tally_dist(s, 1, s.match_length - MIN_MATCH, bflush); ***/
				bflush = _tr_tally$1(s, 1, s.match_length - MIN_MATCH$1);
				s.lookahead -= s.match_length;
				s.strstart += s.match_length;
				s.match_length = 0;
			} else {
				/*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
				bflush = _tr_tally$1(s, 0, s.window[s.strstart]);
				s.lookahead--;
				s.strstart++;
			}
			if (bflush) {
				/*** FLUSH_BLOCK(s, 0); ***/
				flush_block_only(s, false);
				if (s.strm.avail_out === 0) return BS_NEED_MORE;
			}
		}
		s.insert = 0;
		if (flush === Z_FINISH) {
			/*** FLUSH_BLOCK(s, 1); ***/
			flush_block_only(s, true);
			if (s.strm.avail_out === 0) return BS_FINISH_STARTED;
			return BS_FINISH_DONE;
		}
		if (s.last_lit) {
			/*** FLUSH_BLOCK(s, 0); ***/
			flush_block_only(s, false);
			if (s.strm.avail_out === 0) return BS_NEED_MORE;
		}
		return BS_BLOCK_DONE;
	};
	deflate_huff = (s, flush) => {
		let bflush;
		for (;;) {
			if (s.lookahead === 0) {
				fill_window(s);
				if (s.lookahead === 0) {
					if (flush === Z_NO_FLUSH) return BS_NEED_MORE;
					break;
				}
			}
			s.match_length = 0;
			/*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
			bflush = _tr_tally$1(s, 0, s.window[s.strstart]);
			s.lookahead--;
			s.strstart++;
			if (bflush) {
				/*** FLUSH_BLOCK(s, 0); ***/
				flush_block_only(s, false);
				if (s.strm.avail_out === 0) return BS_NEED_MORE;
			}
		}
		s.insert = 0;
		if (flush === Z_FINISH) {
			/*** FLUSH_BLOCK(s, 1); ***/
			flush_block_only(s, true);
			if (s.strm.avail_out === 0) return BS_FINISH_STARTED;
			return BS_FINISH_DONE;
		}
		if (s.last_lit) {
			/*** FLUSH_BLOCK(s, 0); ***/
			flush_block_only(s, false);
			if (s.strm.avail_out === 0) return BS_NEED_MORE;
		}
		return BS_BLOCK_DONE;
	};
	configuration_table = [
		new Config(0, 0, 0, 0, deflate_stored),
		new Config(4, 4, 8, 4, deflate_fast),
		new Config(4, 5, 16, 8, deflate_fast),
		new Config(4, 6, 32, 32, deflate_fast),
		new Config(4, 4, 16, 16, deflate_slow),
		new Config(8, 16, 32, 32, deflate_slow),
		new Config(8, 16, 128, 128, deflate_slow),
		new Config(8, 32, 128, 256, deflate_slow),
		new Config(32, 128, 258, 1024, deflate_slow),
		new Config(32, 258, 258, 4096, deflate_slow)
	];
	lm_init = (s) => {
		s.window_size = 2 * s.w_size;
		/*** CLEAR_HASH(s); ***/
		zero$1(s.head);
		s.max_lazy_match = configuration_table[s.level].max_lazy;
		s.good_match = configuration_table[s.level].good_length;
		s.nice_match = configuration_table[s.level].nice_length;
		s.max_chain_length = configuration_table[s.level].max_chain;
		s.strstart = 0;
		s.block_start = 0;
		s.lookahead = 0;
		s.insert = 0;
		s.match_length = s.prev_length = MIN_MATCH$1 - 1;
		s.match_available = 0;
		s.ins_h = 0;
	};
	deflateResetKeep = (strm) => {
		if (!strm || !strm.state) return err(strm, Z_STREAM_ERROR);
		strm.total_in = strm.total_out = 0;
		strm.data_type = Z_UNKNOWN$1;
		const s = strm.state;
		s.pending = 0;
		s.pending_out = 0;
		if (s.wrap < 0) s.wrap = -s.wrap;
		s.status = s.wrap ? INIT_STATE : BUSY_STATE;
		strm.adler = s.wrap === 2 ? 0 : 1;
		s.last_flush = Z_NO_FLUSH;
		_tr_init$1(s);
		return Z_OK;
	};
	deflateReset = (strm) => {
		const ret = deflateResetKeep(strm);
		if (ret === Z_OK) lm_init(strm.state);
		return ret;
	};
	deflateSetHeader = (strm, head) => {
		if (!strm || !strm.state) return Z_STREAM_ERROR;
		if (strm.state.wrap !== 2) return Z_STREAM_ERROR;
		strm.state.gzhead = head;
		return Z_OK;
	};
	deflateInit2 = (strm, level, method, windowBits, memLevel, strategy) => {
		if (!strm) return Z_STREAM_ERROR;
		let wrap = 1;
		if (level === Z_DEFAULT_COMPRESSION) level = 6;
		if (windowBits < 0) {
			wrap = 0;
			windowBits = -windowBits;
		} else if (windowBits > 15) {
			wrap = 2;
			windowBits -= 16;
		}
		if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED || windowBits < 8 || windowBits > 15 || level < 0 || level > 9 || strategy < 0 || strategy > Z_FIXED$1) return err(strm, Z_STREAM_ERROR);
		if (windowBits === 8) windowBits = 9;
		const s = new DeflateState();
		strm.state = s;
		s.strm = strm;
		s.wrap = wrap;
		s.gzhead = null;
		s.w_bits = windowBits;
		s.w_size = 1 << s.w_bits;
		s.w_mask = s.w_size - 1;
		s.hash_bits = memLevel + 7;
		s.hash_size = 1 << s.hash_bits;
		s.hash_mask = s.hash_size - 1;
		s.hash_shift = ~~((s.hash_bits + MIN_MATCH$1 - 1) / MIN_MATCH$1);
		s.window = new Uint8Array(s.w_size * 2);
		s.head = new Uint16Array(s.hash_size);
		s.prev = new Uint16Array(s.w_size);
		s.lit_bufsize = 1 << memLevel + 6;
		s.pending_buf_size = s.lit_bufsize * 4;
		s.pending_buf = new Uint8Array(s.pending_buf_size);
		s.d_buf = 1 * s.lit_bufsize;
		s.l_buf = 3 * s.lit_bufsize;
		s.level = level;
		s.strategy = strategy;
		s.method = method;
		return deflateReset(strm);
	};
	deflateInit = (strm, level) => {
		return deflateInit2(strm, level, Z_DEFLATED, MAX_WBITS, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY);
	};
	deflate = (strm, flush) => {
		let beg, val;
		if (!strm || !strm.state || flush > Z_BLOCK || flush < 0) return strm ? err(strm, Z_STREAM_ERROR) : Z_STREAM_ERROR;
		const s = strm.state;
		if (!strm.output || !strm.input && strm.avail_in !== 0 || s.status === FINISH_STATE && flush !== Z_FINISH) return err(strm, strm.avail_out === 0 ? Z_BUF_ERROR : Z_STREAM_ERROR);
		s.strm = strm;
		const old_flush = s.last_flush;
		s.last_flush = flush;
		if (s.status === INIT_STATE) if (s.wrap === 2) {
			strm.adler = 0;
			put_byte(s, 31);
			put_byte(s, 139);
			put_byte(s, 8);
			if (!s.gzhead) {
				put_byte(s, 0);
				put_byte(s, 0);
				put_byte(s, 0);
				put_byte(s, 0);
				put_byte(s, 0);
				put_byte(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0);
				put_byte(s, OS_CODE);
				s.status = BUSY_STATE;
			} else {
				put_byte(s, (s.gzhead.text ? 1 : 0) + (s.gzhead.hcrc ? 2 : 0) + (!s.gzhead.extra ? 0 : 4) + (!s.gzhead.name ? 0 : 8) + (!s.gzhead.comment ? 0 : 16));
				put_byte(s, s.gzhead.time & 255);
				put_byte(s, s.gzhead.time >> 8 & 255);
				put_byte(s, s.gzhead.time >> 16 & 255);
				put_byte(s, s.gzhead.time >> 24 & 255);
				put_byte(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0);
				put_byte(s, s.gzhead.os & 255);
				if (s.gzhead.extra && s.gzhead.extra.length) {
					put_byte(s, s.gzhead.extra.length & 255);
					put_byte(s, s.gzhead.extra.length >> 8 & 255);
				}
				if (s.gzhead.hcrc) strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending, 0);
				s.gzindex = 0;
				s.status = EXTRA_STATE;
			}
		} else {
			let header = Z_DEFLATED + (s.w_bits - 8 << 4) << 8;
			let level_flags = -1;
			if (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2) level_flags = 0;
			else if (s.level < 6) level_flags = 1;
			else if (s.level === 6) level_flags = 2;
			else level_flags = 3;
			header |= level_flags << 6;
			if (s.strstart !== 0) header |= PRESET_DICT;
			header += 31 - header % 31;
			s.status = BUSY_STATE;
			putShortMSB(s, header);
			if (s.strstart !== 0) {
				putShortMSB(s, strm.adler >>> 16);
				putShortMSB(s, strm.adler & 65535);
			}
			strm.adler = 1;
		}
		if (s.status === EXTRA_STATE) if (s.gzhead.extra) {
			beg = s.pending;
			while (s.gzindex < (s.gzhead.extra.length & 65535)) {
				if (s.pending === s.pending_buf_size) {
					if (s.gzhead.hcrc && s.pending > beg) strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
					flush_pending(strm);
					beg = s.pending;
					if (s.pending === s.pending_buf_size) break;
				}
				put_byte(s, s.gzhead.extra[s.gzindex] & 255);
				s.gzindex++;
			}
			if (s.gzhead.hcrc && s.pending > beg) strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
			if (s.gzindex === s.gzhead.extra.length) {
				s.gzindex = 0;
				s.status = NAME_STATE;
			}
		} else s.status = NAME_STATE;
		if (s.status === NAME_STATE) if (s.gzhead.name) {
			beg = s.pending;
			do {
				if (s.pending === s.pending_buf_size) {
					if (s.gzhead.hcrc && s.pending > beg) strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
					flush_pending(strm);
					beg = s.pending;
					if (s.pending === s.pending_buf_size) {
						val = 1;
						break;
					}
				}
				if (s.gzindex < s.gzhead.name.length) val = s.gzhead.name.charCodeAt(s.gzindex++) & 255;
				else val = 0;
				put_byte(s, val);
			} while (val !== 0);
			if (s.gzhead.hcrc && s.pending > beg) strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
			if (val === 0) {
				s.gzindex = 0;
				s.status = COMMENT_STATE;
			}
		} else s.status = COMMENT_STATE;
		if (s.status === COMMENT_STATE) if (s.gzhead.comment) {
			beg = s.pending;
			do {
				if (s.pending === s.pending_buf_size) {
					if (s.gzhead.hcrc && s.pending > beg) strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
					flush_pending(strm);
					beg = s.pending;
					if (s.pending === s.pending_buf_size) {
						val = 1;
						break;
					}
				}
				if (s.gzindex < s.gzhead.comment.length) val = s.gzhead.comment.charCodeAt(s.gzindex++) & 255;
				else val = 0;
				put_byte(s, val);
			} while (val !== 0);
			if (s.gzhead.hcrc && s.pending > beg) strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
			if (val === 0) s.status = HCRC_STATE;
		} else s.status = HCRC_STATE;
		if (s.status === HCRC_STATE) if (s.gzhead.hcrc) {
			if (s.pending + 2 > s.pending_buf_size) flush_pending(strm);
			if (s.pending + 2 <= s.pending_buf_size) {
				put_byte(s, strm.adler & 255);
				put_byte(s, strm.adler >> 8 & 255);
				strm.adler = 0;
				s.status = BUSY_STATE;
			}
		} else s.status = BUSY_STATE;
		if (s.pending !== 0) {
			flush_pending(strm);
			if (strm.avail_out === 0) {
				s.last_flush = -1;
				return Z_OK;
			}
		} else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) && flush !== Z_FINISH) return err(strm, Z_BUF_ERROR);
		if (s.status === FINISH_STATE && strm.avail_in !== 0) return err(strm, Z_BUF_ERROR);
		if (strm.avail_in !== 0 || s.lookahead !== 0 || flush !== Z_NO_FLUSH && s.status !== FINISH_STATE) {
			let bstate = s.strategy === Z_HUFFMAN_ONLY ? deflate_huff(s, flush) : s.strategy === Z_RLE ? deflate_rle(s, flush) : configuration_table[s.level].func(s, flush);
			if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) s.status = FINISH_STATE;
			if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
				if (strm.avail_out === 0) s.last_flush = -1;
				return Z_OK;
			}
			if (bstate === BS_BLOCK_DONE) {
				if (flush === Z_PARTIAL_FLUSH) _tr_align$1(s);
				else if (flush !== Z_BLOCK) {
					_tr_stored_block$1(s, 0, 0, false);
					if (flush === Z_FULL_FLUSH) {
						/*** CLEAR_HASH(s); ***/ zero$1(s.head);
						if (s.lookahead === 0) {
							s.strstart = 0;
							s.block_start = 0;
							s.insert = 0;
						}
					}
				}
				flush_pending(strm);
				if (strm.avail_out === 0) {
					s.last_flush = -1;
					return Z_OK;
				}
			}
		}
		if (flush !== Z_FINISH) return Z_OK;
		if (s.wrap <= 0) return Z_STREAM_END;
		if (s.wrap === 2) {
			put_byte(s, strm.adler & 255);
			put_byte(s, strm.adler >> 8 & 255);
			put_byte(s, strm.adler >> 16 & 255);
			put_byte(s, strm.adler >> 24 & 255);
			put_byte(s, strm.total_in & 255);
			put_byte(s, strm.total_in >> 8 & 255);
			put_byte(s, strm.total_in >> 16 & 255);
			put_byte(s, strm.total_in >> 24 & 255);
		} else {
			putShortMSB(s, strm.adler >>> 16);
			putShortMSB(s, strm.adler & 65535);
		}
		flush_pending(strm);
		if (s.wrap > 0) s.wrap = -s.wrap;
		return s.pending !== 0 ? Z_OK : Z_STREAM_END;
	};
	deflateEnd = (strm) => {
		if (!strm || !strm.state) return Z_STREAM_ERROR;
		const status = strm.state.status;
		if (status !== INIT_STATE && status !== EXTRA_STATE && status !== NAME_STATE && status !== COMMENT_STATE && status !== HCRC_STATE && status !== BUSY_STATE && status !== FINISH_STATE) return err(strm, Z_STREAM_ERROR);
		strm.state = null;
		return status === BUSY_STATE ? err(strm, Z_DATA_ERROR) : Z_OK;
	};
	deflateSetDictionary = (strm, dictionary) => {
		let dictLength = dictionary.length;
		if (!strm || !strm.state) return Z_STREAM_ERROR;
		const s = strm.state;
		const wrap = s.wrap;
		if (wrap === 2 || wrap === 1 && s.status !== INIT_STATE || s.lookahead) return Z_STREAM_ERROR;
		if (wrap === 1) strm.adler = adler32_1(strm.adler, dictionary, dictLength, 0);
		s.wrap = 0;
		if (dictLength >= s.w_size) {
			if (wrap === 0) {
				/*** CLEAR_HASH(s); ***/
				zero$1(s.head);
				s.strstart = 0;
				s.block_start = 0;
				s.insert = 0;
			}
			let tmpDict = new Uint8Array(s.w_size);
			tmpDict.set(dictionary.subarray(dictLength - s.w_size, dictLength), 0);
			dictionary = tmpDict;
			dictLength = s.w_size;
		}
		const avail = strm.avail_in;
		const next = strm.next_in;
		const input = strm.input;
		strm.avail_in = dictLength;
		strm.next_in = 0;
		strm.input = dictionary;
		fill_window(s);
		while (s.lookahead >= MIN_MATCH$1) {
			let str = s.strstart;
			let n = s.lookahead - (MIN_MATCH$1 - 1);
			do {
				s.ins_h = HASH(s, s.ins_h, s.window[str + MIN_MATCH$1 - 1]);
				s.prev[str & s.w_mask] = s.head[s.ins_h];
				s.head[s.ins_h] = str;
				str++;
			} while (--n);
			s.strstart = str;
			s.lookahead = MIN_MATCH$1 - 1;
			fill_window(s);
		}
		s.strstart += s.lookahead;
		s.block_start = s.strstart;
		s.insert = s.lookahead;
		s.lookahead = 0;
		s.match_length = s.prev_length = MIN_MATCH$1 - 1;
		s.match_available = 0;
		strm.next_in = next;
		strm.input = input;
		strm.avail_in = avail;
		s.wrap = wrap;
		return Z_OK;
	};
	deflate_1 = {
		deflateInit,
		deflateInit2,
		deflateReset,
		deflateResetKeep,
		deflateSetHeader,
		deflate,
		deflateEnd,
		deflateSetDictionary,
		deflateInfo: "pako deflate (from Nodeca project)"
	};
	_has = (obj, key) => {
		return Object.prototype.hasOwnProperty.call(obj, key);
	};
	assign = function(obj) {
		const sources = Array.prototype.slice.call(arguments, 1);
		while (sources.length) {
			const source = sources.shift();
			if (!source) continue;
			if (typeof source !== "object") throw new TypeError(source + "must be non-object");
			for (const p in source) if (_has(source, p)) obj[p] = source[p];
		}
		return obj;
	};
	flattenChunks = (chunks) => {
		let len = 0;
		for (let i = 0, l = chunks.length; i < l; i++) len += chunks[i].length;
		const result = new Uint8Array(len);
		for (let i = 0, pos = 0, l = chunks.length; i < l; i++) {
			let chunk = chunks[i];
			result.set(chunk, pos);
			pos += chunk.length;
		}
		return result;
	};
	common = {
		assign,
		flattenChunks
	};
	STR_APPLY_UIA_OK = true;
	try {
		String.fromCharCode.apply(null, new Uint8Array(1));
	} catch (__) {
		STR_APPLY_UIA_OK = false;
	}
	_utf8len = new Uint8Array(256);
	for (let q = 0; q < 256; q++) _utf8len[q] = q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1;
	_utf8len[254] = _utf8len[254] = 1;
	string2buf = (str) => {
		let buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;
		for (m_pos = 0; m_pos < str_len; m_pos++) {
			c = str.charCodeAt(m_pos);
			if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
				c2 = str.charCodeAt(m_pos + 1);
				if ((c2 & 64512) === 56320) {
					c = 65536 + (c - 55296 << 10) + (c2 - 56320);
					m_pos++;
				}
			}
			buf_len += c < 128 ? 1 : c < 2048 ? 2 : c < 65536 ? 3 : 4;
		}
		buf = new Uint8Array(buf_len);
		for (i = 0, m_pos = 0; i < buf_len; m_pos++) {
			c = str.charCodeAt(m_pos);
			if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
				c2 = str.charCodeAt(m_pos + 1);
				if ((c2 & 64512) === 56320) {
					c = 65536 + (c - 55296 << 10) + (c2 - 56320);
					m_pos++;
				}
			}
			if (c < 128) buf[i++] = c;
			else if (c < 2048) {
				buf[i++] = 192 | c >>> 6;
				buf[i++] = 128 | c & 63;
			} else if (c < 65536) {
				buf[i++] = 224 | c >>> 12;
				buf[i++] = 128 | c >>> 6 & 63;
				buf[i++] = 128 | c & 63;
			} else {
				buf[i++] = 240 | c >>> 18;
				buf[i++] = 128 | c >>> 12 & 63;
				buf[i++] = 128 | c >>> 6 & 63;
				buf[i++] = 128 | c & 63;
			}
		}
		return buf;
	};
	buf2binstring = (buf, len) => {
		if (len < 65534) {
			if (buf.subarray && STR_APPLY_UIA_OK) return String.fromCharCode.apply(null, buf.length === len ? buf : buf.subarray(0, len));
		}
		let result = "";
		for (let i = 0; i < len; i++) result += String.fromCharCode(buf[i]);
		return result;
	};
	buf2string = (buf, max) => {
		let i, out;
		const len = max || buf.length;
		const utf16buf = new Array(len * 2);
		for (out = 0, i = 0; i < len;) {
			let c = buf[i++];
			if (c < 128) {
				utf16buf[out++] = c;
				continue;
			}
			let c_len = _utf8len[c];
			if (c_len > 4) {
				utf16buf[out++] = 65533;
				i += c_len - 1;
				continue;
			}
			c &= c_len === 2 ? 31 : c_len === 3 ? 15 : 7;
			while (c_len > 1 && i < len) {
				c = c << 6 | buf[i++] & 63;
				c_len--;
			}
			if (c_len > 1) {
				utf16buf[out++] = 65533;
				continue;
			}
			if (c < 65536) utf16buf[out++] = c;
			else {
				c -= 65536;
				utf16buf[out++] = 55296 | c >> 10 & 1023;
				utf16buf[out++] = 56320 | c & 1023;
			}
		}
		return buf2binstring(utf16buf, out);
	};
	utf8border = (buf, max) => {
		max = max || buf.length;
		if (max > buf.length) max = buf.length;
		let pos = max - 1;
		while (pos >= 0 && (buf[pos] & 192) === 128) pos--;
		if (pos < 0) return max;
		if (pos === 0) return max;
		return pos + _utf8len[buf[pos]] > max ? pos : max;
	};
	strings = {
		string2buf,
		buf2string,
		utf8border
	};
	zstream = ZStream;
	toString = Object.prototype.toString;
	({Z_NO_FLUSH: Z_NO_FLUSH$1, Z_SYNC_FLUSH, Z_FULL_FLUSH: Z_FULL_FLUSH$1, Z_FINISH: Z_FINISH$1, Z_OK: Z_OK$1, Z_STREAM_END: Z_STREAM_END$1, Z_DEFAULT_COMPRESSION: Z_DEFAULT_COMPRESSION$1, Z_DEFAULT_STRATEGY: Z_DEFAULT_STRATEGY$1, Z_DEFLATED: Z_DEFLATED$1} = constants);
	/**
	* Deflate#push(data[, flush_mode]) -> Boolean
	* - data (Uint8Array|ArrayBuffer|String): input data. Strings will be
	*   converted to utf8 byte sequence.
	* - flush_mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.
	*   See constants. Skipped or `false` means Z_NO_FLUSH, `true` means Z_FINISH.
	*
	* Sends input data to deflate pipe, generating [[Deflate#onData]] calls with
	* new compressed chunks. Returns `true` on success. The last data block must
	* have `flush_mode` Z_FINISH (or `true`). That will flush internal pending
	* buffers and call [[Deflate#onEnd]].
	*
	* On fail call [[Deflate#onEnd]] with error code and return false.
	*
	* ##### Example
	*
	* ```javascript
	* push(chunk, false); // push one of data chunks
	* ...
	* push(chunk, true);  // push last chunk
	* ```
	**/
	Deflate.prototype.push = function(data, flush_mode) {
		const strm = this.strm;
		const chunkSize = this.options.chunkSize;
		let status, _flush_mode;
		if (this.ended) return false;
		if (flush_mode === ~~flush_mode) _flush_mode = flush_mode;
		else _flush_mode = flush_mode === true ? Z_FINISH$1 : Z_NO_FLUSH$1;
		if (typeof data === "string") strm.input = strings.string2buf(data);
		else if (toString.call(data) === "[object ArrayBuffer]") strm.input = new Uint8Array(data);
		else strm.input = data;
		strm.next_in = 0;
		strm.avail_in = strm.input.length;
		for (;;) {
			if (strm.avail_out === 0) {
				strm.output = new Uint8Array(chunkSize);
				strm.next_out = 0;
				strm.avail_out = chunkSize;
			}
			if ((_flush_mode === Z_SYNC_FLUSH || _flush_mode === Z_FULL_FLUSH$1) && strm.avail_out <= 6) {
				this.onData(strm.output.subarray(0, strm.next_out));
				strm.avail_out = 0;
				continue;
			}
			status = deflate_1.deflate(strm, _flush_mode);
			if (status === Z_STREAM_END$1) {
				if (strm.next_out > 0) this.onData(strm.output.subarray(0, strm.next_out));
				status = deflate_1.deflateEnd(this.strm);
				this.onEnd(status);
				this.ended = true;
				return status === Z_OK$1;
			}
			if (strm.avail_out === 0) {
				this.onData(strm.output);
				continue;
			}
			if (_flush_mode > 0 && strm.next_out > 0) {
				this.onData(strm.output.subarray(0, strm.next_out));
				strm.avail_out = 0;
				continue;
			}
			if (strm.avail_in === 0) break;
		}
		return true;
	};
	/**
	* Deflate#onData(chunk) -> Void
	* - chunk (Uint8Array): output data.
	*
	* By default, stores data blocks in `chunks[]` property and glue
	* those in `onEnd`. Override this handler, if you need another behaviour.
	**/
	Deflate.prototype.onData = function(chunk) {
		this.chunks.push(chunk);
	};
	/**
	* Deflate#onEnd(status) -> Void
	* - status (Number): deflate status. 0 (Z_OK) on success,
	*   other if not.
	*
	* Called once after you tell deflate that the input stream is
	* complete (Z_FINISH). By default - join collected chunks,
	* free memory and fill `results` / `err` properties.
	**/
	Deflate.prototype.onEnd = function(status) {
		if (status === Z_OK$1) this.result = common.flattenChunks(this.chunks);
		this.chunks = [];
		this.err = status;
		this.msg = this.strm.msg;
	};
	deflate_1$1 = {
		Deflate,
		deflate: deflate$1,
		deflateRaw,
		gzip,
		constants
	};
	BAD = 30;
	TYPE = 12;
	inffast = function inflate_fast(strm, start) {
		let _in;
		let last;
		let _out;
		let beg;
		let end;
		let dmax;
		let wsize;
		let whave;
		let wnext;
		let s_window;
		let hold;
		let bits;
		let lcode;
		let dcode;
		let lmask;
		let dmask;
		let here;
		let op;
		let len;
		let dist;
		let from;
		let from_source;
		let input, output;
		const state = strm.state;
		_in = strm.next_in;
		input = strm.input;
		last = _in + (strm.avail_in - 5);
		_out = strm.next_out;
		output = strm.output;
		beg = _out - (start - strm.avail_out);
		end = _out + (strm.avail_out - 257);
		dmax = state.dmax;
		wsize = state.wsize;
		whave = state.whave;
		wnext = state.wnext;
		s_window = state.window;
		hold = state.hold;
		bits = state.bits;
		lcode = state.lencode;
		dcode = state.distcode;
		lmask = (1 << state.lenbits) - 1;
		dmask = (1 << state.distbits) - 1;
		top: do {
			if (bits < 15) {
				hold += input[_in++] << bits;
				bits += 8;
				hold += input[_in++] << bits;
				bits += 8;
			}
			here = lcode[hold & lmask];
			dolen: for (;;) {
				op = here >>> 24;
				hold >>>= op;
				bits -= op;
				op = here >>> 16 & 255;
				if (op === 0) output[_out++] = here & 65535;
				else if (op & 16) {
					len = here & 65535;
					op &= 15;
					if (op) {
						if (bits < op) {
							hold += input[_in++] << bits;
							bits += 8;
						}
						len += hold & (1 << op) - 1;
						hold >>>= op;
						bits -= op;
					}
					if (bits < 15) {
						hold += input[_in++] << bits;
						bits += 8;
						hold += input[_in++] << bits;
						bits += 8;
					}
					here = dcode[hold & dmask];
					dodist: for (;;) {
						op = here >>> 24;
						hold >>>= op;
						bits -= op;
						op = here >>> 16 & 255;
						if (op & 16) {
							dist = here & 65535;
							op &= 15;
							if (bits < op) {
								hold += input[_in++] << bits;
								bits += 8;
								if (bits < op) {
									hold += input[_in++] << bits;
									bits += 8;
								}
							}
							dist += hold & (1 << op) - 1;
							if (dist > dmax) {
								strm.msg = "invalid distance too far back";
								state.mode = BAD;
								break top;
							}
							hold >>>= op;
							bits -= op;
							op = _out - beg;
							if (dist > op) {
								op = dist - op;
								if (op > whave) {
									if (state.sane) {
										strm.msg = "invalid distance too far back";
										state.mode = BAD;
										break top;
									}
								}
								from = 0;
								from_source = s_window;
								if (wnext === 0) {
									from += wsize - op;
									if (op < len) {
										len -= op;
										do
											output[_out++] = s_window[from++];
										while (--op);
										from = _out - dist;
										from_source = output;
									}
								} else if (wnext < op) {
									from += wsize + wnext - op;
									op -= wnext;
									if (op < len) {
										len -= op;
										do
											output[_out++] = s_window[from++];
										while (--op);
										from = 0;
										if (wnext < len) {
											op = wnext;
											len -= op;
											do
												output[_out++] = s_window[from++];
											while (--op);
											from = _out - dist;
											from_source = output;
										}
									}
								} else {
									from += wnext - op;
									if (op < len) {
										len -= op;
										do
											output[_out++] = s_window[from++];
										while (--op);
										from = _out - dist;
										from_source = output;
									}
								}
								while (len > 2) {
									output[_out++] = from_source[from++];
									output[_out++] = from_source[from++];
									output[_out++] = from_source[from++];
									len -= 3;
								}
								if (len) {
									output[_out++] = from_source[from++];
									if (len > 1) output[_out++] = from_source[from++];
								}
							} else {
								from = _out - dist;
								do {
									output[_out++] = output[from++];
									output[_out++] = output[from++];
									output[_out++] = output[from++];
									len -= 3;
								} while (len > 2);
								if (len) {
									output[_out++] = output[from++];
									if (len > 1) output[_out++] = output[from++];
								}
							}
						} else if ((op & 64) === 0) {
							here = dcode[(here & 65535) + (hold & (1 << op) - 1)];
							continue dodist;
						} else {
							strm.msg = "invalid distance code";
							state.mode = BAD;
							break top;
						}
						break;
					}
				} else if ((op & 64) === 0) {
					here = lcode[(here & 65535) + (hold & (1 << op) - 1)];
					continue dolen;
				} else if (op & 32) {
					state.mode = TYPE;
					break top;
				} else {
					strm.msg = "invalid literal/length code";
					state.mode = BAD;
					break top;
				}
				break;
			}
		} while (_in < last && _out < end);
		len = bits >> 3;
		_in -= len;
		bits -= len << 3;
		hold &= (1 << bits) - 1;
		strm.next_in = _in;
		strm.next_out = _out;
		strm.avail_in = _in < last ? 5 + (last - _in) : 5 - (_in - last);
		strm.avail_out = _out < end ? 257 + (end - _out) : 257 - (_out - end);
		state.hold = hold;
		state.bits = bits;
	};
	MAXBITS = 15;
	ENOUGH_LENS = 852;
	ENOUGH_DISTS = 592;
	CODES = 0;
	LENS = 1;
	DISTS = 2;
	lbase = new Uint16Array([
		3,
		4,
		5,
		6,
		7,
		8,
		9,
		10,
		11,
		13,
		15,
		17,
		19,
		23,
		27,
		31,
		35,
		43,
		51,
		59,
		67,
		83,
		99,
		115,
		131,
		163,
		195,
		227,
		258,
		0,
		0
	]);
	lext = new Uint8Array([
		16,
		16,
		16,
		16,
		16,
		16,
		16,
		16,
		17,
		17,
		17,
		17,
		18,
		18,
		18,
		18,
		19,
		19,
		19,
		19,
		20,
		20,
		20,
		20,
		21,
		21,
		21,
		21,
		16,
		72,
		78
	]);
	dbase = new Uint16Array([
		1,
		2,
		3,
		4,
		5,
		7,
		9,
		13,
		17,
		25,
		33,
		49,
		65,
		97,
		129,
		193,
		257,
		385,
		513,
		769,
		1025,
		1537,
		2049,
		3073,
		4097,
		6145,
		8193,
		12289,
		16385,
		24577,
		0,
		0
	]);
	dext = new Uint8Array([
		16,
		16,
		16,
		16,
		17,
		17,
		18,
		18,
		19,
		19,
		20,
		20,
		21,
		21,
		22,
		22,
		23,
		23,
		24,
		24,
		25,
		25,
		26,
		26,
		27,
		27,
		28,
		28,
		29,
		29,
		64,
		64
	]);
	inflate_table = (type, lens, lens_index, codes, table, table_index, work, opts) => {
		const bits = opts.bits;
		let len = 0;
		let sym = 0;
		let min = 0, max = 0;
		let root = 0;
		let curr = 0;
		let drop = 0;
		let left = 0;
		let used = 0;
		let huff = 0;
		let incr;
		let fill;
		let low;
		let mask;
		let next;
		let base = null;
		let base_index = 0;
		let end;
		const count = new Uint16Array(MAXBITS + 1);
		const offs = new Uint16Array(MAXBITS + 1);
		let extra = null;
		let extra_index = 0;
		let here_bits, here_op, here_val;
		for (len = 0; len <= MAXBITS; len++) count[len] = 0;
		for (sym = 0; sym < codes; sym++) count[lens[lens_index + sym]]++;
		root = bits;
		for (max = MAXBITS; max >= 1; max--) if (count[max] !== 0) break;
		if (root > max) root = max;
		if (max === 0) {
			table[table_index++] = 20971520;
			table[table_index++] = 20971520;
			opts.bits = 1;
			return 0;
		}
		for (min = 1; min < max; min++) if (count[min] !== 0) break;
		if (root < min) root = min;
		left = 1;
		for (len = 1; len <= MAXBITS; len++) {
			left <<= 1;
			left -= count[len];
			if (left < 0) return -1;
		}
		if (left > 0 && (type === CODES || max !== 1)) return -1;
		offs[1] = 0;
		for (len = 1; len < MAXBITS; len++) offs[len + 1] = offs[len] + count[len];
		for (sym = 0; sym < codes; sym++) if (lens[lens_index + sym] !== 0) work[offs[lens[lens_index + sym]]++] = sym;
		if (type === CODES) {
			base = extra = work;
			end = 19;
		} else if (type === LENS) {
			base = lbase;
			base_index -= 257;
			extra = lext;
			extra_index -= 257;
			end = 256;
		} else {
			base = dbase;
			extra = dext;
			end = -1;
		}
		huff = 0;
		sym = 0;
		len = min;
		next = table_index;
		curr = root;
		drop = 0;
		low = -1;
		used = 1 << root;
		mask = used - 1;
		if (type === LENS && used > ENOUGH_LENS || type === DISTS && used > ENOUGH_DISTS) return 1;
		for (;;) {
			here_bits = len - drop;
			if (work[sym] < end) {
				here_op = 0;
				here_val = work[sym];
			} else if (work[sym] > end) {
				here_op = extra[extra_index + work[sym]];
				here_val = base[base_index + work[sym]];
			} else {
				here_op = 96;
				here_val = 0;
			}
			incr = 1 << len - drop;
			fill = 1 << curr;
			min = fill;
			do {
				fill -= incr;
				table[next + (huff >> drop) + fill] = here_bits << 24 | here_op << 16 | here_val | 0;
			} while (fill !== 0);
			incr = 1 << len - 1;
			while (huff & incr) incr >>= 1;
			if (incr !== 0) {
				huff &= incr - 1;
				huff += incr;
			} else huff = 0;
			sym++;
			if (--count[len] === 0) {
				if (len === max) break;
				len = lens[lens_index + work[sym]];
			}
			if (len > root && (huff & mask) !== low) {
				if (drop === 0) drop = root;
				next += min;
				curr = len - drop;
				left = 1 << curr;
				while (curr + drop < max) {
					left -= count[curr + drop];
					if (left <= 0) break;
					curr++;
					left <<= 1;
				}
				used += 1 << curr;
				if (type === LENS && used > ENOUGH_LENS || type === DISTS && used > ENOUGH_DISTS) return 1;
				low = huff & mask;
				table[low] = root << 24 | curr << 16 | next - table_index | 0;
			}
		}
		if (huff !== 0) table[next + huff] = len - drop << 24 | 4194304;
		opts.bits = root;
		return 0;
	};
	inftrees = inflate_table;
	CODES$1 = 0;
	LENS$1 = 1;
	DISTS$1 = 2;
	({Z_FINISH: Z_FINISH$2, Z_BLOCK: Z_BLOCK$1, Z_TREES, Z_OK: Z_OK$2, Z_STREAM_END: Z_STREAM_END$2, Z_NEED_DICT, Z_STREAM_ERROR: Z_STREAM_ERROR$1, Z_DATA_ERROR: Z_DATA_ERROR$1, Z_MEM_ERROR, Z_BUF_ERROR: Z_BUF_ERROR$1, Z_DEFLATED: Z_DEFLATED$2} = constants);
	HEAD = 1;
	FLAGS = 2;
	TIME = 3;
	OS = 4;
	EXLEN = 5;
	EXTRA = 6;
	NAME = 7;
	COMMENT = 8;
	HCRC = 9;
	DICTID = 10;
	DICT = 11;
	TYPE$1 = 12;
	TYPEDO = 13;
	STORED = 14;
	COPY_ = 15;
	COPY = 16;
	TABLE = 17;
	LENLENS = 18;
	CODELENS = 19;
	LEN_ = 20;
	LEN = 21;
	LENEXT = 22;
	DIST = 23;
	DISTEXT = 24;
	MATCH = 25;
	LIT = 26;
	CHECK = 27;
	LENGTH = 28;
	DONE = 29;
	BAD$1 = 30;
	MEM = 31;
	SYNC = 32;
	ENOUGH_LENS$1 = 852;
	ENOUGH_DISTS$1 = 592;
	DEF_WBITS = 15;
	zswap32 = (q) => {
		return (q >>> 24 & 255) + (q >>> 8 & 65280) + ((q & 65280) << 8) + ((q & 255) << 24);
	};
	inflateResetKeep = (strm) => {
		if (!strm || !strm.state) return Z_STREAM_ERROR$1;
		const state = strm.state;
		strm.total_in = strm.total_out = state.total = 0;
		strm.msg = "";
		if (state.wrap) strm.adler = state.wrap & 1;
		state.mode = HEAD;
		state.last = 0;
		state.havedict = 0;
		state.dmax = 32768;
		state.head = null;
		state.hold = 0;
		state.bits = 0;
		state.lencode = state.lendyn = new Int32Array(ENOUGH_LENS$1);
		state.distcode = state.distdyn = new Int32Array(ENOUGH_DISTS$1);
		state.sane = 1;
		state.back = -1;
		return Z_OK$2;
	};
	inflateReset = (strm) => {
		if (!strm || !strm.state) return Z_STREAM_ERROR$1;
		const state = strm.state;
		state.wsize = 0;
		state.whave = 0;
		state.wnext = 0;
		return inflateResetKeep(strm);
	};
	inflateReset2 = (strm, windowBits) => {
		let wrap;
		if (!strm || !strm.state) return Z_STREAM_ERROR$1;
		const state = strm.state;
		if (windowBits < 0) {
			wrap = 0;
			windowBits = -windowBits;
		} else {
			wrap = (windowBits >> 4) + 1;
			if (windowBits < 48) windowBits &= 15;
		}
		if (windowBits && (windowBits < 8 || windowBits > 15)) return Z_STREAM_ERROR$1;
		if (state.window !== null && state.wbits !== windowBits) state.window = null;
		state.wrap = wrap;
		state.wbits = windowBits;
		return inflateReset(strm);
	};
	inflateInit2 = (strm, windowBits) => {
		if (!strm) return Z_STREAM_ERROR$1;
		const state = new InflateState();
		strm.state = state;
		state.window = null;
		const ret = inflateReset2(strm, windowBits);
		if (ret !== Z_OK$2) strm.state = null;
		return ret;
	};
	inflateInit = (strm) => {
		return inflateInit2(strm, DEF_WBITS);
	};
	virgin = true;
	fixedtables = (state) => {
		if (virgin) {
			lenfix = new Int32Array(512);
			distfix = new Int32Array(32);
			let sym = 0;
			while (sym < 144) state.lens[sym++] = 8;
			while (sym < 256) state.lens[sym++] = 9;
			while (sym < 280) state.lens[sym++] = 7;
			while (sym < 288) state.lens[sym++] = 8;
			inftrees(LENS$1, state.lens, 0, 288, lenfix, 0, state.work, { bits: 9 });
			sym = 0;
			while (sym < 32) state.lens[sym++] = 5;
			inftrees(DISTS$1, state.lens, 0, 32, distfix, 0, state.work, { bits: 5 });
			virgin = false;
		}
		state.lencode = lenfix;
		state.lenbits = 9;
		state.distcode = distfix;
		state.distbits = 5;
	};
	updatewindow = (strm, src, end, copy) => {
		let dist;
		const state = strm.state;
		if (state.window === null) {
			state.wsize = 1 << state.wbits;
			state.wnext = 0;
			state.whave = 0;
			state.window = new Uint8Array(state.wsize);
		}
		if (copy >= state.wsize) {
			state.window.set(src.subarray(end - state.wsize, end), 0);
			state.wnext = 0;
			state.whave = state.wsize;
		} else {
			dist = state.wsize - state.wnext;
			if (dist > copy) dist = copy;
			state.window.set(src.subarray(end - copy, end - copy + dist), state.wnext);
			copy -= dist;
			if (copy) {
				state.window.set(src.subarray(end - copy, end), 0);
				state.wnext = copy;
				state.whave = state.wsize;
			} else {
				state.wnext += dist;
				if (state.wnext === state.wsize) state.wnext = 0;
				if (state.whave < state.wsize) state.whave += dist;
			}
		}
		return 0;
	};
	inflate = (strm, flush) => {
		let state;
		let input, output;
		let next;
		let put;
		let have, left;
		let hold;
		let bits;
		let _in, _out;
		let copy;
		let from;
		let from_source;
		let here = 0;
		let here_bits, here_op, here_val;
		let last_bits, last_op, last_val;
		let len;
		let ret;
		const hbuf = new Uint8Array(4);
		let opts;
		let n;
		const order = new Uint8Array([
			16,
			17,
			18,
			0,
			8,
			7,
			9,
			6,
			10,
			5,
			11,
			4,
			12,
			3,
			13,
			2,
			14,
			1,
			15
		]);
		if (!strm || !strm.state || !strm.output || !strm.input && strm.avail_in !== 0) return Z_STREAM_ERROR$1;
		state = strm.state;
		if (state.mode === TYPE$1) state.mode = TYPEDO;
		put = strm.next_out;
		output = strm.output;
		left = strm.avail_out;
		next = strm.next_in;
		input = strm.input;
		have = strm.avail_in;
		hold = state.hold;
		bits = state.bits;
		_in = have;
		_out = left;
		ret = Z_OK$2;
		inf_leave: for (;;) switch (state.mode) {
			case HEAD:
				if (state.wrap === 0) {
					state.mode = TYPEDO;
					break;
				}
				while (bits < 16) {
					if (have === 0) break inf_leave;
					have--;
					hold += input[next++] << bits;
					bits += 8;
				}
				if (state.wrap & 2 && hold === 35615) {
					state.check = 0;
					hbuf[0] = hold & 255;
					hbuf[1] = hold >>> 8 & 255;
					state.check = crc32_1(state.check, hbuf, 2, 0);
					hold = 0;
					bits = 0;
					state.mode = FLAGS;
					break;
				}
				state.flags = 0;
				if (state.head) state.head.done = false;
				if (!(state.wrap & 1) || (((hold & 255) << 8) + (hold >> 8)) % 31) {
					strm.msg = "incorrect header check";
					state.mode = BAD$1;
					break;
				}
				if ((hold & 15) !== Z_DEFLATED$2) {
					strm.msg = "unknown compression method";
					state.mode = BAD$1;
					break;
				}
				hold >>>= 4;
				bits -= 4;
				len = (hold & 15) + 8;
				if (state.wbits === 0) state.wbits = len;
				else if (len > state.wbits) {
					strm.msg = "invalid window size";
					state.mode = BAD$1;
					break;
				}
				state.dmax = 1 << state.wbits;
				strm.adler = state.check = 1;
				state.mode = hold & 512 ? DICTID : TYPE$1;
				hold = 0;
				bits = 0;
				break;
			case FLAGS:
				while (bits < 16) {
					if (have === 0) break inf_leave;
					have--;
					hold += input[next++] << bits;
					bits += 8;
				}
				state.flags = hold;
				if ((state.flags & 255) !== Z_DEFLATED$2) {
					strm.msg = "unknown compression method";
					state.mode = BAD$1;
					break;
				}
				if (state.flags & 57344) {
					strm.msg = "unknown header flags set";
					state.mode = BAD$1;
					break;
				}
				if (state.head) state.head.text = hold >> 8 & 1;
				if (state.flags & 512) {
					hbuf[0] = hold & 255;
					hbuf[1] = hold >>> 8 & 255;
					state.check = crc32_1(state.check, hbuf, 2, 0);
				}
				hold = 0;
				bits = 0;
				state.mode = TIME;
			case TIME:
				while (bits < 32) {
					if (have === 0) break inf_leave;
					have--;
					hold += input[next++] << bits;
					bits += 8;
				}
				if (state.head) state.head.time = hold;
				if (state.flags & 512) {
					hbuf[0] = hold & 255;
					hbuf[1] = hold >>> 8 & 255;
					hbuf[2] = hold >>> 16 & 255;
					hbuf[3] = hold >>> 24 & 255;
					state.check = crc32_1(state.check, hbuf, 4, 0);
				}
				hold = 0;
				bits = 0;
				state.mode = OS;
			case OS:
				while (bits < 16) {
					if (have === 0) break inf_leave;
					have--;
					hold += input[next++] << bits;
					bits += 8;
				}
				if (state.head) {
					state.head.xflags = hold & 255;
					state.head.os = hold >> 8;
				}
				if (state.flags & 512) {
					hbuf[0] = hold & 255;
					hbuf[1] = hold >>> 8 & 255;
					state.check = crc32_1(state.check, hbuf, 2, 0);
				}
				hold = 0;
				bits = 0;
				state.mode = EXLEN;
			case EXLEN:
				if (state.flags & 1024) {
					while (bits < 16) {
						if (have === 0) break inf_leave;
						have--;
						hold += input[next++] << bits;
						bits += 8;
					}
					state.length = hold;
					if (state.head) state.head.extra_len = hold;
					if (state.flags & 512) {
						hbuf[0] = hold & 255;
						hbuf[1] = hold >>> 8 & 255;
						state.check = crc32_1(state.check, hbuf, 2, 0);
					}
					hold = 0;
					bits = 0;
				} else if (state.head) state.head.extra = null;
				state.mode = EXTRA;
			case EXTRA:
				if (state.flags & 1024) {
					copy = state.length;
					if (copy > have) copy = have;
					if (copy) {
						if (state.head) {
							len = state.head.extra_len - state.length;
							if (!state.head.extra) state.head.extra = new Uint8Array(state.head.extra_len);
							state.head.extra.set(input.subarray(next, next + copy), len);
						}
						if (state.flags & 512) state.check = crc32_1(state.check, input, copy, next);
						have -= copy;
						next += copy;
						state.length -= copy;
					}
					if (state.length) break inf_leave;
				}
				state.length = 0;
				state.mode = NAME;
			case NAME:
				if (state.flags & 2048) {
					if (have === 0) break inf_leave;
					copy = 0;
					do {
						len = input[next + copy++];
						if (state.head && len && state.length < 65536) state.head.name += String.fromCharCode(len);
					} while (len && copy < have);
					if (state.flags & 512) state.check = crc32_1(state.check, input, copy, next);
					have -= copy;
					next += copy;
					if (len) break inf_leave;
				} else if (state.head) state.head.name = null;
				state.length = 0;
				state.mode = COMMENT;
			case COMMENT:
				if (state.flags & 4096) {
					if (have === 0) break inf_leave;
					copy = 0;
					do {
						len = input[next + copy++];
						if (state.head && len && state.length < 65536) state.head.comment += String.fromCharCode(len);
					} while (len && copy < have);
					if (state.flags & 512) state.check = crc32_1(state.check, input, copy, next);
					have -= copy;
					next += copy;
					if (len) break inf_leave;
				} else if (state.head) state.head.comment = null;
				state.mode = HCRC;
			case HCRC:
				if (state.flags & 512) {
					while (bits < 16) {
						if (have === 0) break inf_leave;
						have--;
						hold += input[next++] << bits;
						bits += 8;
					}
					if (hold !== (state.check & 65535)) {
						strm.msg = "header crc mismatch";
						state.mode = BAD$1;
						break;
					}
					hold = 0;
					bits = 0;
				}
				if (state.head) {
					state.head.hcrc = state.flags >> 9 & 1;
					state.head.done = true;
				}
				strm.adler = state.check = 0;
				state.mode = TYPE$1;
				break;
			case DICTID:
				while (bits < 32) {
					if (have === 0) break inf_leave;
					have--;
					hold += input[next++] << bits;
					bits += 8;
				}
				strm.adler = state.check = zswap32(hold);
				hold = 0;
				bits = 0;
				state.mode = DICT;
			case DICT:
				if (state.havedict === 0) {
					strm.next_out = put;
					strm.avail_out = left;
					strm.next_in = next;
					strm.avail_in = have;
					state.hold = hold;
					state.bits = bits;
					return Z_NEED_DICT;
				}
				strm.adler = state.check = 1;
				state.mode = TYPE$1;
			case TYPE$1: if (flush === Z_BLOCK$1 || flush === Z_TREES) break inf_leave;
			case TYPEDO:
				if (state.last) {
					hold >>>= bits & 7;
					bits -= bits & 7;
					state.mode = CHECK;
					break;
				}
				while (bits < 3) {
					if (have === 0) break inf_leave;
					have--;
					hold += input[next++] << bits;
					bits += 8;
				}
				state.last = hold & 1;
				hold >>>= 1;
				bits -= 1;
				switch (hold & 3) {
					case 0:
						state.mode = STORED;
						break;
					case 1:
						fixedtables(state);
						state.mode = LEN_;
						if (flush === Z_TREES) {
							hold >>>= 2;
							bits -= 2;
							break inf_leave;
						}
						break;
					case 2:
						state.mode = TABLE;
						break;
					case 3:
						strm.msg = "invalid block type";
						state.mode = BAD$1;
				}
				hold >>>= 2;
				bits -= 2;
				break;
			case STORED:
				hold >>>= bits & 7;
				bits -= bits & 7;
				while (bits < 32) {
					if (have === 0) break inf_leave;
					have--;
					hold += input[next++] << bits;
					bits += 8;
				}
				if ((hold & 65535) !== (hold >>> 16 ^ 65535)) {
					strm.msg = "invalid stored block lengths";
					state.mode = BAD$1;
					break;
				}
				state.length = hold & 65535;
				hold = 0;
				bits = 0;
				state.mode = COPY_;
				if (flush === Z_TREES) break inf_leave;
			case COPY_: state.mode = COPY;
			case COPY:
				copy = state.length;
				if (copy) {
					if (copy > have) copy = have;
					if (copy > left) copy = left;
					if (copy === 0) break inf_leave;
					output.set(input.subarray(next, next + copy), put);
					have -= copy;
					next += copy;
					left -= copy;
					put += copy;
					state.length -= copy;
					break;
				}
				state.mode = TYPE$1;
				break;
			case TABLE:
				while (bits < 14) {
					if (have === 0) break inf_leave;
					have--;
					hold += input[next++] << bits;
					bits += 8;
				}
				state.nlen = (hold & 31) + 257;
				hold >>>= 5;
				bits -= 5;
				state.ndist = (hold & 31) + 1;
				hold >>>= 5;
				bits -= 5;
				state.ncode = (hold & 15) + 4;
				hold >>>= 4;
				bits -= 4;
				if (state.nlen > 286 || state.ndist > 30) {
					strm.msg = "too many length or distance symbols";
					state.mode = BAD$1;
					break;
				}
				state.have = 0;
				state.mode = LENLENS;
			case LENLENS:
				while (state.have < state.ncode) {
					while (bits < 3) {
						if (have === 0) break inf_leave;
						have--;
						hold += input[next++] << bits;
						bits += 8;
					}
					state.lens[order[state.have++]] = hold & 7;
					hold >>>= 3;
					bits -= 3;
				}
				while (state.have < 19) state.lens[order[state.have++]] = 0;
				state.lencode = state.lendyn;
				state.lenbits = 7;
				opts = { bits: state.lenbits };
				ret = inftrees(CODES$1, state.lens, 0, 19, state.lencode, 0, state.work, opts);
				state.lenbits = opts.bits;
				if (ret) {
					strm.msg = "invalid code lengths set";
					state.mode = BAD$1;
					break;
				}
				state.have = 0;
				state.mode = CODELENS;
			case CODELENS:
				while (state.have < state.nlen + state.ndist) {
					for (;;) {
						here = state.lencode[hold & (1 << state.lenbits) - 1];
						here_bits = here >>> 24;
						here_op = here >>> 16 & 255;
						here_val = here & 65535;
						if (here_bits <= bits) break;
						if (have === 0) break inf_leave;
						have--;
						hold += input[next++] << bits;
						bits += 8;
					}
					if (here_val < 16) {
						hold >>>= here_bits;
						bits -= here_bits;
						state.lens[state.have++] = here_val;
					} else {
						if (here_val === 16) {
							n = here_bits + 2;
							while (bits < n) {
								if (have === 0) break inf_leave;
								have--;
								hold += input[next++] << bits;
								bits += 8;
							}
							hold >>>= here_bits;
							bits -= here_bits;
							if (state.have === 0) {
								strm.msg = "invalid bit length repeat";
								state.mode = BAD$1;
								break;
							}
							len = state.lens[state.have - 1];
							copy = 3 + (hold & 3);
							hold >>>= 2;
							bits -= 2;
						} else if (here_val === 17) {
							n = here_bits + 3;
							while (bits < n) {
								if (have === 0) break inf_leave;
								have--;
								hold += input[next++] << bits;
								bits += 8;
							}
							hold >>>= here_bits;
							bits -= here_bits;
							len = 0;
							copy = 3 + (hold & 7);
							hold >>>= 3;
							bits -= 3;
						} else {
							n = here_bits + 7;
							while (bits < n) {
								if (have === 0) break inf_leave;
								have--;
								hold += input[next++] << bits;
								bits += 8;
							}
							hold >>>= here_bits;
							bits -= here_bits;
							len = 0;
							copy = 11 + (hold & 127);
							hold >>>= 7;
							bits -= 7;
						}
						if (state.have + copy > state.nlen + state.ndist) {
							strm.msg = "invalid bit length repeat";
							state.mode = BAD$1;
							break;
						}
						while (copy--) state.lens[state.have++] = len;
					}
				}
				if (state.mode === BAD$1) break;
				if (state.lens[256] === 0) {
					strm.msg = "invalid code -- missing end-of-block";
					state.mode = BAD$1;
					break;
				}
				state.lenbits = 9;
				opts = { bits: state.lenbits };
				ret = inftrees(LENS$1, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
				state.lenbits = opts.bits;
				if (ret) {
					strm.msg = "invalid literal/lengths set";
					state.mode = BAD$1;
					break;
				}
				state.distbits = 6;
				state.distcode = state.distdyn;
				opts = { bits: state.distbits };
				ret = inftrees(DISTS$1, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
				state.distbits = opts.bits;
				if (ret) {
					strm.msg = "invalid distances set";
					state.mode = BAD$1;
					break;
				}
				state.mode = LEN_;
				if (flush === Z_TREES) break inf_leave;
			case LEN_: state.mode = LEN;
			case LEN:
				if (have >= 6 && left >= 258) {
					strm.next_out = put;
					strm.avail_out = left;
					strm.next_in = next;
					strm.avail_in = have;
					state.hold = hold;
					state.bits = bits;
					inffast(strm, _out);
					put = strm.next_out;
					output = strm.output;
					left = strm.avail_out;
					next = strm.next_in;
					input = strm.input;
					have = strm.avail_in;
					hold = state.hold;
					bits = state.bits;
					if (state.mode === TYPE$1) state.back = -1;
					break;
				}
				state.back = 0;
				for (;;) {
					here = state.lencode[hold & (1 << state.lenbits) - 1];
					here_bits = here >>> 24;
					here_op = here >>> 16 & 255;
					here_val = here & 65535;
					if (here_bits <= bits) break;
					if (have === 0) break inf_leave;
					have--;
					hold += input[next++] << bits;
					bits += 8;
				}
				if (here_op && (here_op & 240) === 0) {
					last_bits = here_bits;
					last_op = here_op;
					last_val = here_val;
					for (;;) {
						here = state.lencode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
						here_bits = here >>> 24;
						here_op = here >>> 16 & 255;
						here_val = here & 65535;
						if (last_bits + here_bits <= bits) break;
						if (have === 0) break inf_leave;
						have--;
						hold += input[next++] << bits;
						bits += 8;
					}
					hold >>>= last_bits;
					bits -= last_bits;
					state.back += last_bits;
				}
				hold >>>= here_bits;
				bits -= here_bits;
				state.back += here_bits;
				state.length = here_val;
				if (here_op === 0) {
					state.mode = LIT;
					break;
				}
				if (here_op & 32) {
					state.back = -1;
					state.mode = TYPE$1;
					break;
				}
				if (here_op & 64) {
					strm.msg = "invalid literal/length code";
					state.mode = BAD$1;
					break;
				}
				state.extra = here_op & 15;
				state.mode = LENEXT;
			case LENEXT:
				if (state.extra) {
					n = state.extra;
					while (bits < n) {
						if (have === 0) break inf_leave;
						have--;
						hold += input[next++] << bits;
						bits += 8;
					}
					state.length += hold & (1 << state.extra) - 1;
					hold >>>= state.extra;
					bits -= state.extra;
					state.back += state.extra;
				}
				state.was = state.length;
				state.mode = DIST;
			case DIST:
				for (;;) {
					here = state.distcode[hold & (1 << state.distbits) - 1];
					here_bits = here >>> 24;
					here_op = here >>> 16 & 255;
					here_val = here & 65535;
					if (here_bits <= bits) break;
					if (have === 0) break inf_leave;
					have--;
					hold += input[next++] << bits;
					bits += 8;
				}
				if ((here_op & 240) === 0) {
					last_bits = here_bits;
					last_op = here_op;
					last_val = here_val;
					for (;;) {
						here = state.distcode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
						here_bits = here >>> 24;
						here_op = here >>> 16 & 255;
						here_val = here & 65535;
						if (last_bits + here_bits <= bits) break;
						if (have === 0) break inf_leave;
						have--;
						hold += input[next++] << bits;
						bits += 8;
					}
					hold >>>= last_bits;
					bits -= last_bits;
					state.back += last_bits;
				}
				hold >>>= here_bits;
				bits -= here_bits;
				state.back += here_bits;
				if (here_op & 64) {
					strm.msg = "invalid distance code";
					state.mode = BAD$1;
					break;
				}
				state.offset = here_val;
				state.extra = here_op & 15;
				state.mode = DISTEXT;
			case DISTEXT:
				if (state.extra) {
					n = state.extra;
					while (bits < n) {
						if (have === 0) break inf_leave;
						have--;
						hold += input[next++] << bits;
						bits += 8;
					}
					state.offset += hold & (1 << state.extra) - 1;
					hold >>>= state.extra;
					bits -= state.extra;
					state.back += state.extra;
				}
				if (state.offset > state.dmax) {
					strm.msg = "invalid distance too far back";
					state.mode = BAD$1;
					break;
				}
				state.mode = MATCH;
			case MATCH:
				if (left === 0) break inf_leave;
				copy = _out - left;
				if (state.offset > copy) {
					copy = state.offset - copy;
					if (copy > state.whave) {
						if (state.sane) {
							strm.msg = "invalid distance too far back";
							state.mode = BAD$1;
							break;
						}
					}
					if (copy > state.wnext) {
						copy -= state.wnext;
						from = state.wsize - copy;
					} else from = state.wnext - copy;
					if (copy > state.length) copy = state.length;
					from_source = state.window;
				} else {
					from_source = output;
					from = put - state.offset;
					copy = state.length;
				}
				if (copy > left) copy = left;
				left -= copy;
				state.length -= copy;
				do
					output[put++] = from_source[from++];
				while (--copy);
				if (state.length === 0) state.mode = LEN;
				break;
			case LIT:
				if (left === 0) break inf_leave;
				output[put++] = state.length;
				left--;
				state.mode = LEN;
				break;
			case CHECK:
				if (state.wrap) {
					while (bits < 32) {
						if (have === 0) break inf_leave;
						have--;
						hold |= input[next++] << bits;
						bits += 8;
					}
					_out -= left;
					strm.total_out += _out;
					state.total += _out;
					if (_out) strm.adler = state.check = state.flags ? crc32_1(state.check, output, _out, put - _out) : adler32_1(state.check, output, _out, put - _out);
					_out = left;
					if ((state.flags ? hold : zswap32(hold)) !== state.check) {
						strm.msg = "incorrect data check";
						state.mode = BAD$1;
						break;
					}
					hold = 0;
					bits = 0;
				}
				state.mode = LENGTH;
			case LENGTH:
				if (state.wrap && state.flags) {
					while (bits < 32) {
						if (have === 0) break inf_leave;
						have--;
						hold += input[next++] << bits;
						bits += 8;
					}
					if (hold !== (state.total & 4294967295)) {
						strm.msg = "incorrect length check";
						state.mode = BAD$1;
						break;
					}
					hold = 0;
					bits = 0;
				}
				state.mode = DONE;
			case DONE:
				ret = Z_STREAM_END$2;
				break inf_leave;
			case BAD$1:
				ret = Z_DATA_ERROR$1;
				break inf_leave;
			case MEM: return Z_MEM_ERROR;
			case SYNC:
			default: return Z_STREAM_ERROR$1;
		}
		strm.next_out = put;
		strm.avail_out = left;
		strm.next_in = next;
		strm.avail_in = have;
		state.hold = hold;
		state.bits = bits;
		if (state.wsize || _out !== strm.avail_out && state.mode < BAD$1 && (state.mode < CHECK || flush !== Z_FINISH$2)) {
			if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out));
		}
		_in -= strm.avail_in;
		_out -= strm.avail_out;
		strm.total_in += _in;
		strm.total_out += _out;
		state.total += _out;
		if (state.wrap && _out) strm.adler = state.check = state.flags ? crc32_1(state.check, output, _out, strm.next_out - _out) : adler32_1(state.check, output, _out, strm.next_out - _out);
		strm.data_type = state.bits + (state.last ? 64 : 0) + (state.mode === TYPE$1 ? 128 : 0) + (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
		if ((_in === 0 && _out === 0 || flush === Z_FINISH$2) && ret === Z_OK$2) ret = Z_BUF_ERROR$1;
		return ret;
	};
	inflateEnd = (strm) => {
		if (!strm || !strm.state) return Z_STREAM_ERROR$1;
		let state = strm.state;
		if (state.window) state.window = null;
		strm.state = null;
		return Z_OK$2;
	};
	inflateGetHeader = (strm, head) => {
		if (!strm || !strm.state) return Z_STREAM_ERROR$1;
		const state = strm.state;
		if ((state.wrap & 2) === 0) return Z_STREAM_ERROR$1;
		state.head = head;
		head.done = false;
		return Z_OK$2;
	};
	inflateSetDictionary = (strm, dictionary) => {
		const dictLength = dictionary.length;
		let state;
		let dictid;
		let ret;
		if (!strm || !strm.state) return Z_STREAM_ERROR$1;
		state = strm.state;
		if (state.wrap !== 0 && state.mode !== DICT) return Z_STREAM_ERROR$1;
		if (state.mode === DICT) {
			dictid = 1;
			dictid = adler32_1(dictid, dictionary, dictLength, 0);
			if (dictid !== state.check) return Z_DATA_ERROR$1;
		}
		ret = updatewindow(strm, dictionary, dictLength, dictLength);
		if (ret) {
			state.mode = MEM;
			return Z_MEM_ERROR;
		}
		state.havedict = 1;
		return Z_OK$2;
	};
	inflate_1 = {
		inflateReset,
		inflateReset2,
		inflateResetKeep,
		inflateInit,
		inflateInit2,
		inflate,
		inflateEnd,
		inflateGetHeader,
		inflateSetDictionary,
		inflateInfo: "pako inflate (from Nodeca project)"
	};
	gzheader = GZheader;
	toString$1 = Object.prototype.toString;
	({Z_NO_FLUSH: Z_NO_FLUSH$2, Z_FINISH: Z_FINISH$3, Z_OK: Z_OK$3, Z_STREAM_END: Z_STREAM_END$3, Z_NEED_DICT: Z_NEED_DICT$1, Z_STREAM_ERROR: Z_STREAM_ERROR$2, Z_DATA_ERROR: Z_DATA_ERROR$2, Z_MEM_ERROR: Z_MEM_ERROR$1} = constants);
	/**
	* Inflate#push(data[, flush_mode]) -> Boolean
	* - data (Uint8Array|ArrayBuffer): input data
	* - flush_mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE
	*   flush modes. See constants. Skipped or `false` means Z_NO_FLUSH,
	*   `true` means Z_FINISH.
	*
	* Sends input data to inflate pipe, generating [[Inflate#onData]] calls with
	* new output chunks. Returns `true` on success. If end of stream detected,
	* [[Inflate#onEnd]] will be called.
	*
	* `flush_mode` is not needed for normal operation, because end of stream
	* detected automatically. You may try to use it for advanced things, but
	* this functionality was not tested.
	*
	* On fail call [[Inflate#onEnd]] with error code and return false.
	*
	* ##### Example
	*
	* ```javascript
	* push(chunk, false); // push one of data chunks
	* ...
	* push(chunk, true);  // push last chunk
	* ```
	**/
	Inflate.prototype.push = function(data, flush_mode) {
		const strm = this.strm;
		const chunkSize = this.options.chunkSize;
		const dictionary = this.options.dictionary;
		let status, _flush_mode, last_avail_out;
		if (this.ended) return false;
		if (flush_mode === ~~flush_mode) _flush_mode = flush_mode;
		else _flush_mode = flush_mode === true ? Z_FINISH$3 : Z_NO_FLUSH$2;
		if (toString$1.call(data) === "[object ArrayBuffer]") strm.input = new Uint8Array(data);
		else strm.input = data;
		strm.next_in = 0;
		strm.avail_in = strm.input.length;
		for (;;) {
			if (strm.avail_out === 0) {
				strm.output = new Uint8Array(chunkSize);
				strm.next_out = 0;
				strm.avail_out = chunkSize;
			}
			status = inflate_1.inflate(strm, _flush_mode);
			if (status === Z_NEED_DICT$1 && dictionary) {
				status = inflate_1.inflateSetDictionary(strm, dictionary);
				if (status === Z_OK$3) status = inflate_1.inflate(strm, _flush_mode);
				else if (status === Z_DATA_ERROR$2) status = Z_NEED_DICT$1;
			}
			while (strm.avail_in > 0 && status === Z_STREAM_END$3 && strm.state.wrap > 0 && data[strm.next_in] !== 0) {
				inflate_1.inflateReset(strm);
				status = inflate_1.inflate(strm, _flush_mode);
			}
			switch (status) {
				case Z_STREAM_ERROR$2:
				case Z_DATA_ERROR$2:
				case Z_NEED_DICT$1:
				case Z_MEM_ERROR$1:
					this.onEnd(status);
					this.ended = true;
					return false;
			}
			last_avail_out = strm.avail_out;
			if (strm.next_out) {
				if (strm.avail_out === 0 || status === Z_STREAM_END$3) if (this.options.to === "string") {
					let next_out_utf8 = strings.utf8border(strm.output, strm.next_out);
					let tail = strm.next_out - next_out_utf8;
					let utf8str = strings.buf2string(strm.output, next_out_utf8);
					strm.next_out = tail;
					strm.avail_out = chunkSize - tail;
					if (tail) strm.output.set(strm.output.subarray(next_out_utf8, next_out_utf8 + tail), 0);
					this.onData(utf8str);
				} else this.onData(strm.output.length === strm.next_out ? strm.output : strm.output.subarray(0, strm.next_out));
			}
			if (status === Z_OK$3 && last_avail_out === 0) continue;
			if (status === Z_STREAM_END$3) {
				status = inflate_1.inflateEnd(this.strm);
				this.onEnd(status);
				this.ended = true;
				return true;
			}
			if (strm.avail_in === 0) break;
		}
		return true;
	};
	/**
	* Inflate#onData(chunk) -> Void
	* - chunk (Uint8Array|String): output data. When string output requested,
	*   each chunk will be string.
	*
	* By default, stores data blocks in `chunks[]` property and glue
	* those in `onEnd`. Override this handler, if you need another behaviour.
	**/
	Inflate.prototype.onData = function(chunk) {
		this.chunks.push(chunk);
	};
	/**
	* Inflate#onEnd(status) -> Void
	* - status (Number): inflate status. 0 (Z_OK) on success,
	*   other if not.
	*
	* Called either after you tell inflate that the input stream is
	* complete (Z_FINISH). By default - join collected chunks,
	* free memory and fill `results` / `err` properties.
	**/
	Inflate.prototype.onEnd = function(status) {
		if (status === Z_OK$3) if (this.options.to === "string") this.result = this.chunks.join("");
		else this.result = common.flattenChunks(this.chunks);
		this.chunks = [];
		this.err = status;
		this.msg = this.strm.msg;
	};
	inflate_1$1 = {
		Inflate,
		inflate: inflate$1,
		inflateRaw,
		ungzip: inflate$1,
		constants
	};
	({Deflate: Deflate$1, deflate: deflate$2, deflateRaw: deflateRaw$1, gzip: gzip$1} = deflate_1$1);
	({Inflate: Inflate$1, inflate: inflate$2, inflateRaw: inflateRaw$1, ungzip: ungzip$1} = inflate_1$1);
	deflate_1$2 = deflate$2;
	inflate_1$2 = inflate$2;
}));
//#endregion
//#region ../../node_modules/open-color/open-color.json
var white, black, gray, red, pink, grape, violet, indigo, blue, cyan, teal, green, lime, yellow, orange, open_color_default;
var init_open_color = __esmMin((() => {
	white = "#ffffff";
	black = "#000000";
	gray = [
		"#f8f9fa",
		"#f1f3f5",
		"#e9ecef",
		"#dee2e6",
		"#ced4da",
		"#adb5bd",
		"#868e96",
		"#495057",
		"#343a40",
		"#212529"
	];
	red = [
		"#fff5f5",
		"#ffe3e3",
		"#ffc9c9",
		"#ffa8a8",
		"#ff8787",
		"#ff6b6b",
		"#fa5252",
		"#f03e3e",
		"#e03131",
		"#c92a2a"
	];
	pink = [
		"#fff0f6",
		"#ffdeeb",
		"#fcc2d7",
		"#faa2c1",
		"#f783ac",
		"#f06595",
		"#e64980",
		"#d6336c",
		"#c2255c",
		"#a61e4d"
	];
	grape = [
		"#f8f0fc",
		"#f3d9fa",
		"#eebefa",
		"#e599f7",
		"#da77f2",
		"#cc5de8",
		"#be4bdb",
		"#ae3ec9",
		"#9c36b5",
		"#862e9c"
	];
	violet = [
		"#f3f0ff",
		"#e5dbff",
		"#d0bfff",
		"#b197fc",
		"#9775fa",
		"#845ef7",
		"#7950f2",
		"#7048e8",
		"#6741d9",
		"#5f3dc4"
	];
	indigo = [
		"#edf2ff",
		"#dbe4ff",
		"#bac8ff",
		"#91a7ff",
		"#748ffc",
		"#5c7cfa",
		"#4c6ef5",
		"#4263eb",
		"#3b5bdb",
		"#364fc7"
	];
	blue = [
		"#e7f5ff",
		"#d0ebff",
		"#a5d8ff",
		"#74c0fc",
		"#4dabf7",
		"#339af0",
		"#228be6",
		"#1c7ed6",
		"#1971c2",
		"#1864ab"
	];
	cyan = [
		"#e3fafc",
		"#c5f6fa",
		"#99e9f2",
		"#66d9e8",
		"#3bc9db",
		"#22b8cf",
		"#15aabf",
		"#1098ad",
		"#0c8599",
		"#0b7285"
	];
	teal = [
		"#e6fcf5",
		"#c3fae8",
		"#96f2d7",
		"#63e6be",
		"#38d9a9",
		"#20c997",
		"#12b886",
		"#0ca678",
		"#099268",
		"#087f5b"
	];
	green = [
		"#ebfbee",
		"#d3f9d8",
		"#b2f2bb",
		"#8ce99a",
		"#69db7c",
		"#51cf66",
		"#40c057",
		"#37b24d",
		"#2f9e44",
		"#2b8a3e"
	];
	lime = [
		"#f4fce3",
		"#e9fac8",
		"#d8f5a2",
		"#c0eb75",
		"#a9e34b",
		"#94d82d",
		"#82c91e",
		"#74b816",
		"#66a80f",
		"#5c940d"
	];
	yellow = [
		"#fff9db",
		"#fff3bf",
		"#ffec99",
		"#ffe066",
		"#ffd43b",
		"#fcc419",
		"#fab005",
		"#f59f00",
		"#f08c00",
		"#e67700"
	];
	orange = [
		"#fff4e6",
		"#ffe8cc",
		"#ffd8a8",
		"#ffc078",
		"#ffa94d",
		"#ff922b",
		"#fd7e14",
		"#f76707",
		"#e8590c",
		"#d9480f"
	];
	open_color_default = {
		white,
		black,
		gray,
		red,
		pink,
		grape,
		violet,
		indigo,
		blue,
		cyan,
		teal,
		green,
		lime,
		yellow,
		orange
	};
}));
//#endregion
//#region ../../node_modules/@excalidraw/excalidraw/node_modules/nanoid/index.browser.js
var nanoid;
var init_index_browser = __esmMin((() => {
	nanoid = (size = 21) => crypto.getRandomValues(new Uint8Array(size)).reduce((id, byte) => {
		byte &= 63;
		if (byte < 36) id += byte.toString(36);
		else if (byte < 62) id += (byte - 26).toString(36).toUpperCase();
		else if (byte > 62) id += "-";
		else id += "_";
		return id;
	}, "");
}));
//#endregion
//#region ../../node_modules/lodash.throttle/index.js
var require_lodash_throttle = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* lodash (Custom Build) <https://lodash.com/>
	* Build: `lodash modularize exports="npm" -o ./`
	* Copyright jQuery Foundation and other contributors <https://jquery.org/>
	* Released under MIT license <https://lodash.com/license>
	* Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	* Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	*/
	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = "Expected a function";
	/** Used as references for various `Number` constants. */
	var NAN = NaN;
	/** `Object#toString` result references. */
	var symbolTag = "[object Symbol]";
	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;
	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;
	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;
	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;
	/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof globalThis == "object" && globalThis && globalThis.Object === Object && globalThis;
	/** Detect free variable `self`. */
	var freeSelf = typeof self == "object" && self && self.Object === Object && self;
	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function("return this")();
	/**
	* Used to resolve the
	* [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	* of values.
	*/
	var objectToString = Object.prototype.toString;
	var nativeMax = Math.max, nativeMin = Math.min;
	/**
	* Gets the timestamp of the number of milliseconds that have elapsed since
	* the Unix epoch (1 January 1970 00:00:00 UTC).
	*
	* @static
	* @memberOf _
	* @since 2.4.0
	* @category Date
	* @returns {number} Returns the timestamp.
	* @example
	*
	* _.defer(function(stamp) {
	*   console.log(_.now() - stamp);
	* }, _.now());
	* // => Logs the number of milliseconds it took for the deferred invocation.
	*/
	var now = function() {
		return root.Date.now();
	};
	/**
	* Creates a debounced function that delays invoking `func` until after `wait`
	* milliseconds have elapsed since the last time the debounced function was
	* invoked. The debounced function comes with a `cancel` method to cancel
	* delayed `func` invocations and a `flush` method to immediately invoke them.
	* Provide `options` to indicate whether `func` should be invoked on the
	* leading and/or trailing edge of the `wait` timeout. The `func` is invoked
	* with the last arguments provided to the debounced function. Subsequent
	* calls to the debounced function return the result of the last `func`
	* invocation.
	*
	* **Note:** If `leading` and `trailing` options are `true`, `func` is
	* invoked on the trailing edge of the timeout only if the debounced function
	* is invoked more than once during the `wait` timeout.
	*
	* If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	* until to the next tick, similar to `setTimeout` with a timeout of `0`.
	*
	* See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	* for details over the differences between `_.debounce` and `_.throttle`.
	*
	* @static
	* @memberOf _
	* @since 0.1.0
	* @category Function
	* @param {Function} func The function to debounce.
	* @param {number} [wait=0] The number of milliseconds to delay.
	* @param {Object} [options={}] The options object.
	* @param {boolean} [options.leading=false]
	*  Specify invoking on the leading edge of the timeout.
	* @param {number} [options.maxWait]
	*  The maximum time `func` is allowed to be delayed before it's invoked.
	* @param {boolean} [options.trailing=true]
	*  Specify invoking on the trailing edge of the timeout.
	* @returns {Function} Returns the new debounced function.
	* @example
	*
	* // Avoid costly calculations while the window size is in flux.
	* jQuery(window).on('resize', _.debounce(calculateLayout, 150));
	*
	* // Invoke `sendMail` when clicked, debouncing subsequent calls.
	* jQuery(element).on('click', _.debounce(sendMail, 300, {
	*   'leading': true,
	*   'trailing': false
	* }));
	*
	* // Ensure `batchLog` is invoked once after 1 second of debounced calls.
	* var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
	* var source = new EventSource('/stream');
	* jQuery(source).on('message', debounced);
	*
	* // Cancel the trailing debounced invocation.
	* jQuery(window).on('popstate', debounced.cancel);
	*/
	function debounce(func, wait, options) {
		var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
		if (typeof func != "function") throw new TypeError(FUNC_ERROR_TEXT);
		wait = toNumber(wait) || 0;
		if (isObject(options)) {
			leading = !!options.leading;
			maxing = "maxWait" in options;
			maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
			trailing = "trailing" in options ? !!options.trailing : trailing;
		}
		function invokeFunc(time) {
			var args = lastArgs, thisArg = lastThis;
			lastArgs = lastThis = void 0;
			lastInvokeTime = time;
			result = func.apply(thisArg, args);
			return result;
		}
		function leadingEdge(time) {
			lastInvokeTime = time;
			timerId = setTimeout(timerExpired, wait);
			return leading ? invokeFunc(time) : result;
		}
		function remainingWait(time) {
			var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, result = wait - timeSinceLastCall;
			return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
		}
		function shouldInvoke(time) {
			var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
			return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
		}
		function timerExpired() {
			var time = now();
			if (shouldInvoke(time)) return trailingEdge(time);
			timerId = setTimeout(timerExpired, remainingWait(time));
		}
		function trailingEdge(time) {
			timerId = void 0;
			if (trailing && lastArgs) return invokeFunc(time);
			lastArgs = lastThis = void 0;
			return result;
		}
		function cancel() {
			if (timerId !== void 0) clearTimeout(timerId);
			lastInvokeTime = 0;
			lastArgs = lastCallTime = lastThis = timerId = void 0;
		}
		function flush() {
			return timerId === void 0 ? result : trailingEdge(now());
		}
		function debounced() {
			var time = now(), isInvoking = shouldInvoke(time);
			lastArgs = arguments;
			lastThis = this;
			lastCallTime = time;
			if (isInvoking) {
				if (timerId === void 0) return leadingEdge(lastCallTime);
				if (maxing) {
					timerId = setTimeout(timerExpired, wait);
					return invokeFunc(lastCallTime);
				}
			}
			if (timerId === void 0) timerId = setTimeout(timerExpired, wait);
			return result;
		}
		debounced.cancel = cancel;
		debounced.flush = flush;
		return debounced;
	}
	/**
	* Creates a throttled function that only invokes `func` at most once per
	* every `wait` milliseconds. The throttled function comes with a `cancel`
	* method to cancel delayed `func` invocations and a `flush` method to
	* immediately invoke them. Provide `options` to indicate whether `func`
	* should be invoked on the leading and/or trailing edge of the `wait`
	* timeout. The `func` is invoked with the last arguments provided to the
	* throttled function. Subsequent calls to the throttled function return the
	* result of the last `func` invocation.
	*
	* **Note:** If `leading` and `trailing` options are `true`, `func` is
	* invoked on the trailing edge of the timeout only if the throttled function
	* is invoked more than once during the `wait` timeout.
	*
	* If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	* until to the next tick, similar to `setTimeout` with a timeout of `0`.
	*
	* See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	* for details over the differences between `_.throttle` and `_.debounce`.
	*
	* @static
	* @memberOf _
	* @since 0.1.0
	* @category Function
	* @param {Function} func The function to throttle.
	* @param {number} [wait=0] The number of milliseconds to throttle invocations to.
	* @param {Object} [options={}] The options object.
	* @param {boolean} [options.leading=true]
	*  Specify invoking on the leading edge of the timeout.
	* @param {boolean} [options.trailing=true]
	*  Specify invoking on the trailing edge of the timeout.
	* @returns {Function} Returns the new throttled function.
	* @example
	*
	* // Avoid excessively updating the position while scrolling.
	* jQuery(window).on('scroll', _.throttle(updatePosition, 100));
	*
	* // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
	* var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
	* jQuery(element).on('click', throttled);
	*
	* // Cancel the trailing throttled invocation.
	* jQuery(window).on('popstate', throttled.cancel);
	*/
	function throttle(func, wait, options) {
		var leading = true, trailing = true;
		if (typeof func != "function") throw new TypeError(FUNC_ERROR_TEXT);
		if (isObject(options)) {
			leading = "leading" in options ? !!options.leading : leading;
			trailing = "trailing" in options ? !!options.trailing : trailing;
		}
		return debounce(func, wait, {
			"leading": leading,
			"maxWait": wait,
			"trailing": trailing
		});
	}
	/**
	* Checks if `value` is the
	* [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	* of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	*
	* @static
	* @memberOf _
	* @since 0.1.0
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is an object, else `false`.
	* @example
	*
	* _.isObject({});
	* // => true
	*
	* _.isObject([1, 2, 3]);
	* // => true
	*
	* _.isObject(_.noop);
	* // => true
	*
	* _.isObject(null);
	* // => false
	*/
	function isObject(value) {
		var type = typeof value;
		return !!value && (type == "object" || type == "function");
	}
	/**
	* Checks if `value` is object-like. A value is object-like if it's not `null`
	* and has a `typeof` result of "object".
	*
	* @static
	* @memberOf _
	* @since 4.0.0
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	* @example
	*
	* _.isObjectLike({});
	* // => true
	*
	* _.isObjectLike([1, 2, 3]);
	* // => true
	*
	* _.isObjectLike(_.noop);
	* // => false
	*
	* _.isObjectLike(null);
	* // => false
	*/
	function isObjectLike(value) {
		return !!value && typeof value == "object";
	}
	/**
	* Checks if `value` is classified as a `Symbol` primitive or object.
	*
	* @static
	* @memberOf _
	* @since 4.0.0
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	* @example
	*
	* _.isSymbol(Symbol.iterator);
	* // => true
	*
	* _.isSymbol('abc');
	* // => false
	*/
	function isSymbol(value) {
		return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
	}
	/**
	* Converts `value` to a number.
	*
	* @static
	* @memberOf _
	* @since 4.0.0
	* @category Lang
	* @param {*} value The value to process.
	* @returns {number} Returns the number.
	* @example
	*
	* _.toNumber(3.2);
	* // => 3.2
	*
	* _.toNumber(Number.MIN_VALUE);
	* // => 5e-324
	*
	* _.toNumber(Infinity);
	* // => Infinity
	*
	* _.toNumber('3.2');
	* // => 3.2
	*/
	function toNumber(value) {
		if (typeof value == "number") return value;
		if (isSymbol(value)) return NAN;
		if (isObject(value)) {
			var other = typeof value.valueOf == "function" ? value.valueOf() : value;
			value = isObject(other) ? other + "" : other;
		}
		if (typeof value != "string") return value === 0 ? value : +value;
		value = value.replace(reTrim, "");
		var isBinary = reIsBinary.test(value);
		return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
	}
	module.exports = throttle;
}));
//#endregion
//#region ../../node_modules/es6-promise-pool/es6-promise-pool.js
var require_es6_promise_pool = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(root, factory) {
		/* istanbul ignore next */
		if (typeof define === "function" && define.amd) define([], factory);
		else if (typeof exports === "object") module.exports = factory();
		else {
			root.PromisePool = factory();
			root.promisePool = root.PromisePool;
		}
	})(exports, function() {
		"use strict";
		var EventTarget = function() {
			this._listeners = {};
		};
		EventTarget.prototype.addEventListener = function(type, listener) {
			this._listeners[type] = this._listeners[type] || [];
			if (this._listeners[type].indexOf(listener) < 0) this._listeners[type].push(listener);
		};
		EventTarget.prototype.removeEventListener = function(type, listener) {
			if (this._listeners[type]) {
				var p = this._listeners[type].indexOf(listener);
				if (p >= 0) this._listeners[type].splice(p, 1);
			}
		};
		EventTarget.prototype.dispatchEvent = function(evt) {
			if (this._listeners[evt.type] && this._listeners[evt.type].length) {
				var listeners = this._listeners[evt.type].slice();
				for (var i = 0, l = listeners.length; i < l; ++i) listeners[i].call(this, evt);
			}
		};
		var isGenerator = function(func) {
			return typeof func.constructor === "function" && func.constructor.name === "GeneratorFunction";
		};
		var functionToIterator = function(func) {
			return { next: function() {
				var promise = func();
				return promise ? { value: promise } : { done: true };
			} };
		};
		var promiseToIterator = function(promise) {
			var called = false;
			return { next: function() {
				if (called) return { done: true };
				called = true;
				return { value: promise };
			} };
		};
		var toIterator = function(obj, Promise) {
			var type = typeof obj;
			if (type === "object") {
				if (typeof obj.next === "function") return obj;
				/* istanbul ignore else */
				if (typeof obj.then === "function") return promiseToIterator(obj);
			}
			if (type === "function") return isGenerator(obj) ? obj() : functionToIterator(obj);
			return promiseToIterator(Promise.resolve(obj));
		};
		var PromisePoolEvent = function(target, type, data) {
			this.target = target;
			this.type = type;
			this.data = data;
		};
		var PromisePool = function(source, concurrency, options) {
			EventTarget.call(this);
			if (typeof concurrency !== "number" || Math.floor(concurrency) !== concurrency || concurrency < 1) throw new Error("Invalid concurrency");
			this._concurrency = concurrency;
			this._options = options || {};
			this._options.promise = this._options.promise || Promise;
			this._iterator = toIterator(source, this._options.promise);
			this._done = false;
			this._size = 0;
			this._promise = null;
			this._callbacks = null;
		};
		PromisePool.prototype = new EventTarget();
		PromisePool.prototype.constructor = PromisePool;
		PromisePool.prototype.concurrency = function(value) {
			if (typeof value !== "undefined") {
				this._concurrency = value;
				if (this.active()) this._proceed();
			}
			return this._concurrency;
		};
		PromisePool.prototype.size = function() {
			return this._size;
		};
		PromisePool.prototype.active = function() {
			return !!this._promise;
		};
		PromisePool.prototype.promise = function() {
			return this._promise;
		};
		PromisePool.prototype.start = function() {
			var that = this;
			var Promise = this._options.promise;
			this._promise = new Promise(function(resolve, reject) {
				that._callbacks = {
					reject,
					resolve
				};
				that._proceed();
			});
			return this._promise;
		};
		PromisePool.prototype._fireEvent = function(type, data) {
			this.dispatchEvent(new PromisePoolEvent(this, type, data));
		};
		PromisePool.prototype._settle = function(error) {
			if (error) this._callbacks.reject(error);
			else this._callbacks.resolve();
			this._promise = null;
			this._callbacks = null;
		};
		PromisePool.prototype._onPooledPromiseFulfilled = function(promise, result) {
			this._size--;
			if (this.active()) {
				this._fireEvent("fulfilled", {
					promise,
					result
				});
				this._proceed();
			}
		};
		PromisePool.prototype._onPooledPromiseRejected = function(promise, error) {
			this._size--;
			if (this.active()) {
				this._fireEvent("rejected", {
					promise,
					error
				});
				this._settle(error || /* @__PURE__ */ new Error("Unknown error"));
			}
		};
		PromisePool.prototype._trackPromise = function(promise) {
			var that = this;
			promise.then(function(result) {
				that._onPooledPromiseFulfilled(promise, result);
			}, function(error) {
				that._onPooledPromiseRejected(promise, error);
			})["catch"](function(err) {
				that._settle(/* @__PURE__ */ new Error("Promise processing failed: " + err));
			});
		};
		PromisePool.prototype._proceed = function() {
			if (!this._done) {
				var result = { done: false };
				while (this._size < this._concurrency && !(result = this._iterator.next()).done) {
					this._size++;
					this._trackPromise(result.value);
				}
				this._done = result === null || !!result.done;
			}
			if (this._done && this._size === 0) this._settle();
		};
		PromisePool.PromisePoolEvent = PromisePoolEvent;
		PromisePool.PromisePool = PromisePool;
		return PromisePool;
	});
}));
//#endregion
//#region ../../node_modules/hachure-fill/bin/hachure.js
function rotatePoints(points, center, degrees) {
	if (points && points.length) {
		const [cx, cy] = center;
		const angle = Math.PI / 180 * degrees;
		const cos = Math.cos(angle);
		const sin = Math.sin(angle);
		for (const p of points) {
			const [x, y] = p;
			p[0] = (x - cx) * cos - (y - cy) * sin + cx;
			p[1] = (x - cx) * sin + (y - cy) * cos + cy;
		}
	}
}
function rotateLines(lines, center, degrees) {
	const points = [];
	lines.forEach((line) => points.push(...line));
	rotatePoints(points, center, degrees);
}
function areSamePoints(p1, p2) {
	return p1[0] === p2[0] && p1[1] === p2[1];
}
function hachureLines(polygons, hachureGap, hachureAngle, hachureStepOffset = 1) {
	const angle = hachureAngle;
	const gap = Math.max(hachureGap, .1);
	const polygonList = polygons[0] && polygons[0][0] && typeof polygons[0][0] === "number" ? [polygons] : polygons;
	const rotationCenter = [0, 0];
	if (angle) for (const polygon of polygonList) rotatePoints(polygon, rotationCenter, angle);
	const lines = straightHachureLines(polygonList, gap, hachureStepOffset);
	if (angle) {
		for (const polygon of polygonList) rotatePoints(polygon, rotationCenter, -angle);
		rotateLines(lines, rotationCenter, -angle);
	}
	return lines;
}
function straightHachureLines(polygons, gap, hachureStepOffset) {
	const vertexArray = [];
	for (const polygon of polygons) {
		const vertices = [...polygon];
		if (!areSamePoints(vertices[0], vertices[vertices.length - 1])) vertices.push([vertices[0][0], vertices[0][1]]);
		if (vertices.length > 2) vertexArray.push(vertices);
	}
	const lines = [];
	gap = Math.max(gap, .1);
	const edges = [];
	for (const vertices of vertexArray) for (let i = 0; i < vertices.length - 1; i++) {
		const p1 = vertices[i];
		const p2 = vertices[i + 1];
		if (p1[1] !== p2[1]) {
			const ymin = Math.min(p1[1], p2[1]);
			edges.push({
				ymin,
				ymax: Math.max(p1[1], p2[1]),
				x: ymin === p1[1] ? p1[0] : p2[0],
				islope: (p2[0] - p1[0]) / (p2[1] - p1[1])
			});
		}
	}
	edges.sort((e1, e2) => {
		if (e1.ymin < e2.ymin) return -1;
		if (e1.ymin > e2.ymin) return 1;
		if (e1.x < e2.x) return -1;
		if (e1.x > e2.x) return 1;
		if (e1.ymax === e2.ymax) return 0;
		return (e1.ymax - e2.ymax) / Math.abs(e1.ymax - e2.ymax);
	});
	if (!edges.length) return lines;
	let activeEdges = [];
	let y = edges[0].ymin;
	let iteration = 0;
	while (activeEdges.length || edges.length) {
		if (edges.length) {
			let ix = -1;
			for (let i = 0; i < edges.length; i++) {
				if (edges[i].ymin > y) break;
				ix = i;
			}
			edges.splice(0, ix + 1).forEach((edge) => {
				activeEdges.push({
					s: y,
					edge
				});
			});
		}
		activeEdges = activeEdges.filter((ae) => {
			if (ae.edge.ymax <= y) return false;
			return true;
		});
		activeEdges.sort((ae1, ae2) => {
			if (ae1.edge.x === ae2.edge.x) return 0;
			return (ae1.edge.x - ae2.edge.x) / Math.abs(ae1.edge.x - ae2.edge.x);
		});
		if (hachureStepOffset !== 1 || iteration % gap === 0) {
			if (activeEdges.length > 1) for (let i = 0; i < activeEdges.length; i = i + 2) {
				const nexti = i + 1;
				if (nexti >= activeEdges.length) break;
				const ce = activeEdges[i].edge;
				const ne = activeEdges[nexti].edge;
				lines.push([[Math.round(ce.x), y], [Math.round(ne.x), y]]);
			}
		}
		y += hachureStepOffset;
		activeEdges.forEach((ae) => {
			ae.edge.x = ae.edge.x + hachureStepOffset * ae.edge.islope;
		});
		iteration++;
	}
	return lines;
}
var init_hachure = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@excalidraw/excalidraw/node_modules/roughjs/bin/fillers/scan-line-hachure.js
function polygonHachureLines(polygonList, o) {
	var _a;
	const angle = o.hachureAngle + 90;
	let gap = o.hachureGap;
	if (gap < 0) gap = o.strokeWidth * 4;
	gap = Math.max(gap, .1);
	let skipOffset = 1;
	if (o.roughness >= 1) {
		if ((((_a = o.randomizer) === null || _a === void 0 ? void 0 : _a.next()) || Math.random()) > .7) skipOffset = gap;
	}
	return hachureLines(polygonList, gap, angle, skipOffset || 1);
}
var init_scan_line_hachure = __esmMin((() => {
	init_hachure();
}));
//#endregion
//#region ../../node_modules/@excalidraw/excalidraw/node_modules/roughjs/bin/fillers/hachure-filler.js
var HachureFiller;
var init_hachure_filler = __esmMin((() => {
	init_scan_line_hachure();
	HachureFiller = class {
		constructor(helper) {
			this.helper = helper;
		}
		fillPolygons(polygonList, o) {
			return this._fillPolygons(polygonList, o);
		}
		_fillPolygons(polygonList, o) {
			const lines = polygonHachureLines(polygonList, o);
			return {
				type: "fillSketch",
				ops: this.renderLines(lines, o)
			};
		}
		renderLines(lines, o) {
			const ops = [];
			for (const line of lines) ops.push(...this.helper.doubleLineOps(line[0][0], line[0][1], line[1][0], line[1][1], o));
			return ops;
		}
	};
}));
//#endregion
//#region ../../node_modules/@excalidraw/excalidraw/node_modules/roughjs/bin/geometry.js
function lineLength(line) {
	const p1 = line[0];
	const p2 = line[1];
	return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2));
}
var init_geometry = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@excalidraw/excalidraw/node_modules/roughjs/bin/fillers/zigzag-filler.js
var ZigZagFiller;
var init_zigzag_filler = __esmMin((() => {
	init_hachure_filler();
	init_scan_line_hachure();
	init_geometry();
	ZigZagFiller = class extends HachureFiller {
		fillPolygons(polygonList, o) {
			let gap = o.hachureGap;
			if (gap < 0) gap = o.strokeWidth * 4;
			gap = Math.max(gap, .1);
			const lines = polygonHachureLines(polygonList, Object.assign({}, o, { hachureGap: gap }));
			const zigZagAngle = Math.PI / 180 * o.hachureAngle;
			const zigzagLines = [];
			const dgx = gap * .5 * Math.cos(zigZagAngle);
			const dgy = gap * .5 * Math.sin(zigZagAngle);
			for (const [p1, p2] of lines) if (lineLength([p1, p2])) zigzagLines.push([[p1[0] - dgx, p1[1] + dgy], [...p2]], [[p1[0] + dgx, p1[1] - dgy], [...p2]]);
			return {
				type: "fillSketch",
				ops: this.renderLines(zigzagLines, o)
			};
		}
	};
}));
//#endregion
//#region ../../node_modules/@excalidraw/excalidraw/node_modules/roughjs/bin/fillers/hatch-filler.js
var HatchFiller;
var init_hatch_filler = __esmMin((() => {
	init_hachure_filler();
	HatchFiller = class extends HachureFiller {
		fillPolygons(polygonList, o) {
			const set = this._fillPolygons(polygonList, o);
			const o2 = Object.assign({}, o, { hachureAngle: o.hachureAngle + 90 });
			const set2 = this._fillPolygons(polygonList, o2);
			set.ops = set.ops.concat(set2.ops);
			return set;
		}
	};
}));
//#endregion
//#region ../../node_modules/@excalidraw/excalidraw/node_modules/roughjs/bin/fillers/dot-filler.js
var DotFiller;
var init_dot_filler = __esmMin((() => {
	init_geometry();
	init_scan_line_hachure();
	DotFiller = class {
		constructor(helper) {
			this.helper = helper;
		}
		fillPolygons(polygonList, o) {
			o = Object.assign({}, o, { hachureAngle: 0 });
			const lines = polygonHachureLines(polygonList, o);
			return this.dotsOnLines(lines, o);
		}
		dotsOnLines(lines, o) {
			const ops = [];
			let gap = o.hachureGap;
			if (gap < 0) gap = o.strokeWidth * 4;
			gap = Math.max(gap, .1);
			let fweight = o.fillWeight;
			if (fweight < 0) fweight = o.strokeWidth / 2;
			const ro = gap / 4;
			for (const line of lines) {
				const length = lineLength(line);
				const dl = length / gap;
				const count = Math.ceil(dl) - 1;
				const offset = length - count * gap;
				const x = (line[0][0] + line[1][0]) / 2 - gap / 4;
				const minY = Math.min(line[0][1], line[1][1]);
				for (let i = 0; i < count; i++) {
					const y = minY + offset + i * gap;
					const cx = x - ro + Math.random() * 2 * ro;
					const cy = y - ro + Math.random() * 2 * ro;
					const el = this.helper.ellipse(cx, cy, fweight, fweight, o);
					ops.push(...el.ops);
				}
			}
			return {
				type: "fillSketch",
				ops
			};
		}
	};
}));
//#endregion
//#region ../../node_modules/@excalidraw/excalidraw/node_modules/roughjs/bin/fillers/dashed-filler.js
var DashedFiller;
var init_dashed_filler = __esmMin((() => {
	init_geometry();
	init_scan_line_hachure();
	DashedFiller = class {
		constructor(helper) {
			this.helper = helper;
		}
		fillPolygons(polygonList, o) {
			const lines = polygonHachureLines(polygonList, o);
			return {
				type: "fillSketch",
				ops: this.dashedLine(lines, o)
			};
		}
		dashedLine(lines, o) {
			const offset = o.dashOffset < 0 ? o.hachureGap < 0 ? o.strokeWidth * 4 : o.hachureGap : o.dashOffset;
			const gap = o.dashGap < 0 ? o.hachureGap < 0 ? o.strokeWidth * 4 : o.hachureGap : o.dashGap;
			const ops = [];
			lines.forEach((line) => {
				const length = lineLength(line);
				const count = Math.floor(length / (offset + gap));
				const startOffset = (length + gap - count * (offset + gap)) / 2;
				let p1 = line[0];
				let p2 = line[1];
				if (p1[0] > p2[0]) {
					p1 = line[1];
					p2 = line[0];
				}
				const alpha = Math.atan((p2[1] - p1[1]) / (p2[0] - p1[0]));
				for (let i = 0; i < count; i++) {
					const lstart = i * (offset + gap);
					const lend = lstart + offset;
					const start = [p1[0] + lstart * Math.cos(alpha) + startOffset * Math.cos(alpha), p1[1] + lstart * Math.sin(alpha) + startOffset * Math.sin(alpha)];
					const end = [p1[0] + lend * Math.cos(alpha) + startOffset * Math.cos(alpha), p1[1] + lend * Math.sin(alpha) + startOffset * Math.sin(alpha)];
					ops.push(...this.helper.doubleLineOps(start[0], start[1], end[0], end[1], o));
				}
			});
			return ops;
		}
	};
}));
//#endregion
//#region ../../node_modules/@excalidraw/excalidraw/node_modules/roughjs/bin/fillers/zigzag-line-filler.js
var ZigZagLineFiller;
var init_zigzag_line_filler = __esmMin((() => {
	init_geometry();
	init_scan_line_hachure();
	ZigZagLineFiller = class {
		constructor(helper) {
			this.helper = helper;
		}
		fillPolygons(polygonList, o) {
			const gap = o.hachureGap < 0 ? o.strokeWidth * 4 : o.hachureGap;
			const zo = o.zigzagOffset < 0 ? gap : o.zigzagOffset;
			o = Object.assign({}, o, { hachureGap: gap + zo });
			const lines = polygonHachureLines(polygonList, o);
			return {
				type: "fillSketch",
				ops: this.zigzagLines(lines, zo, o)
			};
		}
		zigzagLines(lines, zo, o) {
			const ops = [];
			lines.forEach((line) => {
				const length = lineLength(line);
				const count = Math.round(length / (2 * zo));
				let p1 = line[0];
				let p2 = line[1];
				if (p1[0] > p2[0]) {
					p1 = line[1];
					p2 = line[0];
				}
				const alpha = Math.atan((p2[1] - p1[1]) / (p2[0] - p1[0]));
				for (let i = 0; i < count; i++) {
					const lstart = i * 2 * zo;
					const lend = (i + 1) * 2 * zo;
					const dz = Math.sqrt(2 * Math.pow(zo, 2));
					const start = [p1[0] + lstart * Math.cos(alpha), p1[1] + lstart * Math.sin(alpha)];
					const end = [p1[0] + lend * Math.cos(alpha), p1[1] + lend * Math.sin(alpha)];
					const middle = [start[0] + dz * Math.cos(alpha + Math.PI / 4), start[1] + dz * Math.sin(alpha + Math.PI / 4)];
					ops.push(...this.helper.doubleLineOps(start[0], start[1], middle[0], middle[1], o), ...this.helper.doubleLineOps(middle[0], middle[1], end[0], end[1], o));
				}
			});
			return ops;
		}
	};
}));
//#endregion
//#region ../../node_modules/@excalidraw/excalidraw/node_modules/roughjs/bin/fillers/filler.js
function getFiller(o, helper) {
	let fillerName = o.fillStyle || "hachure";
	if (!fillers[fillerName]) switch (fillerName) {
		case "zigzag":
			if (!fillers[fillerName]) fillers[fillerName] = new ZigZagFiller(helper);
			break;
		case "cross-hatch":
			if (!fillers[fillerName]) fillers[fillerName] = new HatchFiller(helper);
			break;
		case "dots":
			if (!fillers[fillerName]) fillers[fillerName] = new DotFiller(helper);
			break;
		case "dashed":
			if (!fillers[fillerName]) fillers[fillerName] = new DashedFiller(helper);
			break;
		case "zigzag-line":
			if (!fillers[fillerName]) fillers[fillerName] = new ZigZagLineFiller(helper);
			break;
		default:
			fillerName = "hachure";
			if (!fillers[fillerName]) fillers[fillerName] = new HachureFiller(helper);
			break;
	}
	return fillers[fillerName];
}
var fillers;
var init_filler = __esmMin((() => {
	init_hachure_filler();
	init_zigzag_filler();
	init_hatch_filler();
	init_dot_filler();
	init_dashed_filler();
	init_zigzag_line_filler();
	fillers = {};
}));
//#endregion
//#region ../../node_modules/@excalidraw/excalidraw/node_modules/roughjs/bin/math.js
function randomSeed() {
	return Math.floor(Math.random() * 2 ** 31);
}
var Random;
var init_math = __esmMin((() => {
	Random = class {
		constructor(seed) {
			this.seed = seed;
		}
		next() {
			if (this.seed) return (2 ** 31 - 1 & (this.seed = Math.imul(48271, this.seed))) / 2 ** 31;
			else return Math.random();
		}
	};
}));
//#endregion
//#region ../../node_modules/path-data-parser/lib/parser.js
function tokenize(d) {
	const tokens = new Array();
	while (d !== "") if (d.match(/^([ \t\r\n,]+)/)) d = d.substr(RegExp.$1.length);
	else if (d.match(/^([aAcChHlLmMqQsStTvVzZ])/)) {
		tokens[tokens.length] = {
			type: COMMAND,
			text: RegExp.$1
		};
		d = d.substr(RegExp.$1.length);
	} else if (d.match(/^(([-+]?[0-9]+(\.[0-9]*)?|[-+]?\.[0-9]+)([eE][-+]?[0-9]+)?)/)) {
		tokens[tokens.length] = {
			type: NUMBER,
			text: `${parseFloat(RegExp.$1)}`
		};
		d = d.substr(RegExp.$1.length);
	} else return [];
	tokens[tokens.length] = {
		type: EOD,
		text: ""
	};
	return tokens;
}
function isType(token, type) {
	return token.type === type;
}
function parsePath(d) {
	const segments = [];
	const tokens = tokenize(d);
	let mode = "BOD";
	let index = 0;
	let token = tokens[index];
	while (!isType(token, EOD)) {
		let paramsCount = 0;
		const params = [];
		if (mode === "BOD") if (token.text === "M" || token.text === "m") {
			index++;
			paramsCount = PARAMS[token.text];
			mode = token.text;
		} else return parsePath("M0,0" + d);
		else if (isType(token, NUMBER)) paramsCount = PARAMS[mode];
		else {
			index++;
			paramsCount = PARAMS[token.text];
			mode = token.text;
		}
		if (index + paramsCount < tokens.length) {
			for (let i = index; i < index + paramsCount; i++) {
				const numbeToken = tokens[i];
				if (isType(numbeToken, NUMBER)) params[params.length] = +numbeToken.text;
				else throw new Error("Param not a number: " + mode + "," + numbeToken.text);
			}
			if (typeof PARAMS[mode] === "number") {
				const segment = {
					key: mode,
					data: params
				};
				segments.push(segment);
				index += paramsCount;
				token = tokens[index];
				if (mode === "M") mode = "L";
				if (mode === "m") mode = "l";
			} else throw new Error("Bad segment: " + mode);
		} else throw new Error("Path data ended short");
	}
	return segments;
}
var COMMAND, NUMBER, EOD, PARAMS;
var init_parser = __esmMin((() => {
	COMMAND = 0;
	NUMBER = 1;
	EOD = 2;
	PARAMS = {
		A: 7,
		a: 7,
		C: 6,
		c: 6,
		H: 1,
		h: 1,
		L: 2,
		l: 2,
		M: 2,
		m: 2,
		Q: 4,
		q: 4,
		S: 4,
		s: 4,
		T: 2,
		t: 2,
		V: 1,
		v: 1,
		Z: 0,
		z: 0
	};
}));
//#endregion
//#region ../../node_modules/path-data-parser/lib/absolutize.js
function absolutize(segments) {
	let cx = 0, cy = 0;
	let subx = 0, suby = 0;
	const out = [];
	for (const { key, data } of segments) switch (key) {
		case "M":
			out.push({
				key: "M",
				data: [...data]
			});
			[cx, cy] = data;
			[subx, suby] = data;
			break;
		case "m":
			cx += data[0];
			cy += data[1];
			out.push({
				key: "M",
				data: [cx, cy]
			});
			subx = cx;
			suby = cy;
			break;
		case "L":
			out.push({
				key: "L",
				data: [...data]
			});
			[cx, cy] = data;
			break;
		case "l":
			cx += data[0];
			cy += data[1];
			out.push({
				key: "L",
				data: [cx, cy]
			});
			break;
		case "C":
			out.push({
				key: "C",
				data: [...data]
			});
			cx = data[4];
			cy = data[5];
			break;
		case "c": {
			const newdata = data.map((d, i) => i % 2 ? d + cy : d + cx);
			out.push({
				key: "C",
				data: newdata
			});
			cx = newdata[4];
			cy = newdata[5];
			break;
		}
		case "Q":
			out.push({
				key: "Q",
				data: [...data]
			});
			cx = data[2];
			cy = data[3];
			break;
		case "q": {
			const newdata = data.map((d, i) => i % 2 ? d + cy : d + cx);
			out.push({
				key: "Q",
				data: newdata
			});
			cx = newdata[2];
			cy = newdata[3];
			break;
		}
		case "A":
			out.push({
				key: "A",
				data: [...data]
			});
			cx = data[5];
			cy = data[6];
			break;
		case "a":
			cx += data[5];
			cy += data[6];
			out.push({
				key: "A",
				data: [
					data[0],
					data[1],
					data[2],
					data[3],
					data[4],
					cx,
					cy
				]
			});
			break;
		case "H":
			out.push({
				key: "H",
				data: [...data]
			});
			cx = data[0];
			break;
		case "h":
			cx += data[0];
			out.push({
				key: "H",
				data: [cx]
			});
			break;
		case "V":
			out.push({
				key: "V",
				data: [...data]
			});
			cy = data[0];
			break;
		case "v":
			cy += data[0];
			out.push({
				key: "V",
				data: [cy]
			});
			break;
		case "S":
			out.push({
				key: "S",
				data: [...data]
			});
			cx = data[2];
			cy = data[3];
			break;
		case "s": {
			const newdata = data.map((d, i) => i % 2 ? d + cy : d + cx);
			out.push({
				key: "S",
				data: newdata
			});
			cx = newdata[2];
			cy = newdata[3];
			break;
		}
		case "T":
			out.push({
				key: "T",
				data: [...data]
			});
			cx = data[0];
			cy = data[1];
			break;
		case "t":
			cx += data[0];
			cy += data[1];
			out.push({
				key: "T",
				data: [cx, cy]
			});
			break;
		case "Z":
		case "z":
			out.push({
				key: "Z",
				data: []
			});
			cx = subx;
			cy = suby;
			break;
	}
	return out;
}
var init_absolutize = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/path-data-parser/lib/normalize.js
function normalize(segments) {
	const out = [];
	let lastType = "";
	let cx = 0, cy = 0;
	let subx = 0, suby = 0;
	let lcx = 0, lcy = 0;
	for (const { key, data } of segments) {
		switch (key) {
			case "M":
				out.push({
					key: "M",
					data: [...data]
				});
				[cx, cy] = data;
				[subx, suby] = data;
				break;
			case "C":
				out.push({
					key: "C",
					data: [...data]
				});
				cx = data[4];
				cy = data[5];
				lcx = data[2];
				lcy = data[3];
				break;
			case "L":
				out.push({
					key: "L",
					data: [...data]
				});
				[cx, cy] = data;
				break;
			case "H":
				cx = data[0];
				out.push({
					key: "L",
					data: [cx, cy]
				});
				break;
			case "V":
				cy = data[0];
				out.push({
					key: "L",
					data: [cx, cy]
				});
				break;
			case "S": {
				let cx1 = 0, cy1 = 0;
				if (lastType === "C" || lastType === "S") {
					cx1 = cx + (cx - lcx);
					cy1 = cy + (cy - lcy);
				} else {
					cx1 = cx;
					cy1 = cy;
				}
				out.push({
					key: "C",
					data: [
						cx1,
						cy1,
						...data
					]
				});
				lcx = data[0];
				lcy = data[1];
				cx = data[2];
				cy = data[3];
				break;
			}
			case "T": {
				const [x, y] = data;
				let x1 = 0, y1 = 0;
				if (lastType === "Q" || lastType === "T") {
					x1 = cx + (cx - lcx);
					y1 = cy + (cy - lcy);
				} else {
					x1 = cx;
					y1 = cy;
				}
				const cx1 = cx + 2 * (x1 - cx) / 3;
				const cy1 = cy + 2 * (y1 - cy) / 3;
				const cx2 = x + 2 * (x1 - x) / 3;
				const cy2 = y + 2 * (y1 - y) / 3;
				out.push({
					key: "C",
					data: [
						cx1,
						cy1,
						cx2,
						cy2,
						x,
						y
					]
				});
				lcx = x1;
				lcy = y1;
				cx = x;
				cy = y;
				break;
			}
			case "Q": {
				const [x1, y1, x, y] = data;
				const cx1 = cx + 2 * (x1 - cx) / 3;
				const cy1 = cy + 2 * (y1 - cy) / 3;
				const cx2 = x + 2 * (x1 - x) / 3;
				const cy2 = y + 2 * (y1 - y) / 3;
				out.push({
					key: "C",
					data: [
						cx1,
						cy1,
						cx2,
						cy2,
						x,
						y
					]
				});
				lcx = x1;
				lcy = y1;
				cx = x;
				cy = y;
				break;
			}
			case "A": {
				const r1 = Math.abs(data[0]);
				const r2 = Math.abs(data[1]);
				const angle = data[2];
				const largeArcFlag = data[3];
				const sweepFlag = data[4];
				const x = data[5];
				const y = data[6];
				if (r1 === 0 || r2 === 0) {
					out.push({
						key: "C",
						data: [
							cx,
							cy,
							x,
							y,
							x,
							y
						]
					});
					cx = x;
					cy = y;
				} else if (cx !== x || cy !== y) {
					arcToCubicCurves(cx, cy, x, y, r1, r2, angle, largeArcFlag, sweepFlag).forEach(function(curve) {
						out.push({
							key: "C",
							data: curve
						});
					});
					cx = x;
					cy = y;
				}
				break;
			}
			case "Z":
				out.push({
					key: "Z",
					data: []
				});
				cx = subx;
				cy = suby;
				break;
		}
		lastType = key;
	}
	return out;
}
function degToRad(degrees) {
	return Math.PI * degrees / 180;
}
function rotate(x, y, angleRad) {
	return [x * Math.cos(angleRad) - y * Math.sin(angleRad), x * Math.sin(angleRad) + y * Math.cos(angleRad)];
}
function arcToCubicCurves(x1, y1, x2, y2, r1, r2, angle, largeArcFlag, sweepFlag, recursive) {
	const angleRad = degToRad(angle);
	let params = [];
	let f1 = 0, f2 = 0, cx = 0, cy = 0;
	if (recursive) [f1, f2, cx, cy] = recursive;
	else {
		[x1, y1] = rotate(x1, y1, -angleRad);
		[x2, y2] = rotate(x2, y2, -angleRad);
		const x = (x1 - x2) / 2;
		const y = (y1 - y2) / 2;
		let h = x * x / (r1 * r1) + y * y / (r2 * r2);
		if (h > 1) {
			h = Math.sqrt(h);
			r1 = h * r1;
			r2 = h * r2;
		}
		const sign = largeArcFlag === sweepFlag ? -1 : 1;
		const r1Pow = r1 * r1;
		const r2Pow = r2 * r2;
		const left = r1Pow * r2Pow - r1Pow * y * y - r2Pow * x * x;
		const right = r1Pow * y * y + r2Pow * x * x;
		const k = sign * Math.sqrt(Math.abs(left / right));
		cx = k * r1 * y / r2 + (x1 + x2) / 2;
		cy = k * -r2 * x / r1 + (y1 + y2) / 2;
		f1 = Math.asin(parseFloat(((y1 - cy) / r2).toFixed(9)));
		f2 = Math.asin(parseFloat(((y2 - cy) / r2).toFixed(9)));
		if (x1 < cx) f1 = Math.PI - f1;
		if (x2 < cx) f2 = Math.PI - f2;
		if (f1 < 0) f1 = Math.PI * 2 + f1;
		if (f2 < 0) f2 = Math.PI * 2 + f2;
		if (sweepFlag && f1 > f2) f1 = f1 - Math.PI * 2;
		if (!sweepFlag && f2 > f1) f2 = f2 - Math.PI * 2;
	}
	let df = f2 - f1;
	if (Math.abs(df) > Math.PI * 120 / 180) {
		const f2old = f2;
		const x2old = x2;
		const y2old = y2;
		if (sweepFlag && f2 > f1) f2 = f1 + Math.PI * 120 / 180 * 1;
		else f2 = f1 + Math.PI * 120 / 180 * -1;
		x2 = cx + r1 * Math.cos(f2);
		y2 = cy + r2 * Math.sin(f2);
		params = arcToCubicCurves(x2, y2, x2old, y2old, r1, r2, angle, 0, sweepFlag, [
			f2,
			f2old,
			cx,
			cy
		]);
	}
	df = f2 - f1;
	const c1 = Math.cos(f1);
	const s1 = Math.sin(f1);
	const c2 = Math.cos(f2);
	const s2 = Math.sin(f2);
	const t = Math.tan(df / 4);
	const hx = 4 / 3 * r1 * t;
	const hy = 4 / 3 * r2 * t;
	const m1 = [x1, y1];
	const m2 = [x1 + hx * s1, y1 - hy * c1];
	const m3 = [x2 + hx * s2, y2 - hy * c2];
	const m4 = [x2, y2];
	m2[0] = 2 * m1[0] - m2[0];
	m2[1] = 2 * m1[1] - m2[1];
	if (recursive) return [
		m2,
		m3,
		m4
	].concat(params);
	else {
		params = [
			m2,
			m3,
			m4
		].concat(params);
		const curves = [];
		for (let i = 0; i < params.length; i += 3) {
			const r1 = rotate(params[i][0], params[i][1], angleRad);
			const r2 = rotate(params[i + 1][0], params[i + 1][1], angleRad);
			const r3 = rotate(params[i + 2][0], params[i + 2][1], angleRad);
			curves.push([
				r1[0],
				r1[1],
				r2[0],
				r2[1],
				r3[0],
				r3[1]
			]);
		}
		return curves;
	}
}
var init_normalize = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/path-data-parser/lib/index.js
var init_lib$4 = __esmMin((() => {
	init_parser();
	init_absolutize();
	init_normalize();
}));
//#endregion
//#region ../../node_modules/@excalidraw/excalidraw/node_modules/roughjs/bin/renderer.js
function line(x1, y1, x2, y2, o) {
	return {
		type: "path",
		ops: _doubleLine(x1, y1, x2, y2, o)
	};
}
function linearPath(points, close, o) {
	const len = (points || []).length;
	if (len > 2) {
		const ops = [];
		for (let i = 0; i < len - 1; i++) ops.push(..._doubleLine(points[i][0], points[i][1], points[i + 1][0], points[i + 1][1], o));
		if (close) ops.push(..._doubleLine(points[len - 1][0], points[len - 1][1], points[0][0], points[0][1], o));
		return {
			type: "path",
			ops
		};
	} else if (len === 2) return line(points[0][0], points[0][1], points[1][0], points[1][1], o);
	return {
		type: "path",
		ops: []
	};
}
function polygon(points, o) {
	return linearPath(points, true, o);
}
function rectangle(x, y, width, height, o) {
	return polygon([
		[x, y],
		[x + width, y],
		[x + width, y + height],
		[x, y + height]
	], o);
}
function curve(points, o) {
	let o1 = _curveWithOffset(points, 1 * (1 + o.roughness * .2), o);
	if (!o.disableMultiStroke) {
		const o2 = _curveWithOffset(points, 1.5 * (1 + o.roughness * .22), cloneOptionsAlterSeed(o));
		o1 = o1.concat(o2);
	}
	return {
		type: "path",
		ops: o1
	};
}
function ellipse(x, y, width, height, o) {
	return ellipseWithParams(x, y, o, generateEllipseParams(width, height, o)).opset;
}
function generateEllipseParams(width, height, o) {
	const psq = Math.sqrt(Math.PI * 2 * Math.sqrt((Math.pow(width / 2, 2) + Math.pow(height / 2, 2)) / 2));
	const stepCount = Math.ceil(Math.max(o.curveStepCount, o.curveStepCount / Math.sqrt(200) * psq));
	const increment = Math.PI * 2 / stepCount;
	let rx = Math.abs(width / 2);
	let ry = Math.abs(height / 2);
	const curveFitRandomness = 1 - o.curveFitting;
	rx += _offsetOpt(rx * curveFitRandomness, o);
	ry += _offsetOpt(ry * curveFitRandomness, o);
	return {
		increment,
		rx,
		ry
	};
}
function ellipseWithParams(x, y, o, ellipseParams) {
	const [ap1, cp1] = _computeEllipsePoints(ellipseParams.increment, x, y, ellipseParams.rx, ellipseParams.ry, 1, ellipseParams.increment * _offset(.1, _offset(.4, 1, o), o), o);
	let o1 = _curve(ap1, null, o);
	if (!o.disableMultiStroke && o.roughness !== 0) {
		const [ap2] = _computeEllipsePoints(ellipseParams.increment, x, y, ellipseParams.rx, ellipseParams.ry, 1.5, 0, o);
		const o2 = _curve(ap2, null, o);
		o1 = o1.concat(o2);
	}
	return {
		estimatedPoints: cp1,
		opset: {
			type: "path",
			ops: o1
		}
	};
}
function arc(x, y, width, height, start, stop, closed, roughClosure, o) {
	const cx = x;
	const cy = y;
	let rx = Math.abs(width / 2);
	let ry = Math.abs(height / 2);
	rx += _offsetOpt(rx * .01, o);
	ry += _offsetOpt(ry * .01, o);
	let strt = start;
	let stp = stop;
	while (strt < 0) {
		strt += Math.PI * 2;
		stp += Math.PI * 2;
	}
	if (stp - strt > Math.PI * 2) {
		strt = 0;
		stp = Math.PI * 2;
	}
	const ellipseInc = Math.PI * 2 / o.curveStepCount;
	const arcInc = Math.min(ellipseInc / 2, (stp - strt) / 2);
	const ops = _arc(arcInc, cx, cy, rx, ry, strt, stp, 1, o);
	if (!o.disableMultiStroke) {
		const o2 = _arc(arcInc, cx, cy, rx, ry, strt, stp, 1.5, o);
		ops.push(...o2);
	}
	if (closed) if (roughClosure) ops.push(..._doubleLine(cx, cy, cx + rx * Math.cos(strt), cy + ry * Math.sin(strt), o), ..._doubleLine(cx, cy, cx + rx * Math.cos(stp), cy + ry * Math.sin(stp), o));
	else ops.push({
		op: "lineTo",
		data: [cx, cy]
	}, {
		op: "lineTo",
		data: [cx + rx * Math.cos(strt), cy + ry * Math.sin(strt)]
	});
	return {
		type: "path",
		ops
	};
}
function svgPath(path, o) {
	const segments = normalize(absolutize(parsePath(path)));
	const ops = [];
	let first = [0, 0];
	let current = [0, 0];
	for (const { key, data } of segments) switch (key) {
		case "M":
			current = [data[0], data[1]];
			first = [data[0], data[1]];
			break;
		case "L":
			ops.push(..._doubleLine(current[0], current[1], data[0], data[1], o));
			current = [data[0], data[1]];
			break;
		case "C": {
			const [x1, y1, x2, y2, x, y] = data;
			ops.push(..._bezierTo(x1, y1, x2, y2, x, y, current, o));
			current = [x, y];
			break;
		}
		case "Z":
			ops.push(..._doubleLine(current[0], current[1], first[0], first[1], o));
			current = [first[0], first[1]];
			break;
	}
	return {
		type: "path",
		ops
	};
}
function solidFillPolygon(polygonList, o) {
	const ops = [];
	for (const points of polygonList) if (points.length) {
		const offset = o.maxRandomnessOffset || 0;
		const len = points.length;
		if (len > 2) {
			ops.push({
				op: "move",
				data: [points[0][0] + _offsetOpt(offset, o), points[0][1] + _offsetOpt(offset, o)]
			});
			for (let i = 1; i < len; i++) ops.push({
				op: "lineTo",
				data: [points[i][0] + _offsetOpt(offset, o), points[i][1] + _offsetOpt(offset, o)]
			});
		}
	}
	return {
		type: "fillPath",
		ops
	};
}
function patternFillPolygons(polygonList, o) {
	return getFiller(o, helper).fillPolygons(polygonList, o);
}
function patternFillArc(x, y, width, height, start, stop, o) {
	const cx = x;
	const cy = y;
	let rx = Math.abs(width / 2);
	let ry = Math.abs(height / 2);
	rx += _offsetOpt(rx * .01, o);
	ry += _offsetOpt(ry * .01, o);
	let strt = start;
	let stp = stop;
	while (strt < 0) {
		strt += Math.PI * 2;
		stp += Math.PI * 2;
	}
	if (stp - strt > Math.PI * 2) {
		strt = 0;
		stp = Math.PI * 2;
	}
	const increment = (stp - strt) / o.curveStepCount;
	const points = [];
	for (let angle = strt; angle <= stp; angle = angle + increment) points.push([cx + rx * Math.cos(angle), cy + ry * Math.sin(angle)]);
	points.push([cx + rx * Math.cos(stp), cy + ry * Math.sin(stp)]);
	points.push([cx, cy]);
	return patternFillPolygons([points], o);
}
function randOffset(x, o) {
	return _offsetOpt(x, o);
}
function randOffsetWithRange(min, max, o) {
	return _offset(min, max, o);
}
function doubleLineFillOps(x1, y1, x2, y2, o) {
	return _doubleLine(x1, y1, x2, y2, o, true);
}
function cloneOptionsAlterSeed(ops) {
	const result = Object.assign({}, ops);
	result.randomizer = void 0;
	if (ops.seed) result.seed = ops.seed + 1;
	return result;
}
function random(ops) {
	if (!ops.randomizer) ops.randomizer = new Random(ops.seed || 0);
	return ops.randomizer.next();
}
function _offset(min, max, ops, roughnessGain = 1) {
	return ops.roughness * roughnessGain * (random(ops) * (max - min) + min);
}
function _offsetOpt(x, ops, roughnessGain = 1) {
	return _offset(-x, x, ops, roughnessGain);
}
function _doubleLine(x1, y1, x2, y2, o, filling = false) {
	const singleStroke = filling ? o.disableMultiStrokeFill : o.disableMultiStroke;
	const o1 = _line(x1, y1, x2, y2, o, true, false);
	if (singleStroke) return o1;
	const o2 = _line(x1, y1, x2, y2, o, true, true);
	return o1.concat(o2);
}
function _line(x1, y1, x2, y2, o, move, overlay) {
	const lengthSq = Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
	const length = Math.sqrt(lengthSq);
	let roughnessGain = 1;
	if (length < 200) roughnessGain = 1;
	else if (length > 500) roughnessGain = .4;
	else roughnessGain = -.0016668 * length + 1.233334;
	let offset = o.maxRandomnessOffset || 0;
	if (offset * offset * 100 > lengthSq) offset = length / 10;
	const halfOffset = offset / 2;
	const divergePoint = .2 + random(o) * .2;
	let midDispX = o.bowing * o.maxRandomnessOffset * (y2 - y1) / 200;
	let midDispY = o.bowing * o.maxRandomnessOffset * (x1 - x2) / 200;
	midDispX = _offsetOpt(midDispX, o, roughnessGain);
	midDispY = _offsetOpt(midDispY, o, roughnessGain);
	const ops = [];
	const randomHalf = () => _offsetOpt(halfOffset, o, roughnessGain);
	const randomFull = () => _offsetOpt(offset, o, roughnessGain);
	const preserveVertices = o.preserveVertices;
	if (move) if (overlay) ops.push({
		op: "move",
		data: [x1 + (preserveVertices ? 0 : randomHalf()), y1 + (preserveVertices ? 0 : randomHalf())]
	});
	else ops.push({
		op: "move",
		data: [x1 + (preserveVertices ? 0 : _offsetOpt(offset, o, roughnessGain)), y1 + (preserveVertices ? 0 : _offsetOpt(offset, o, roughnessGain))]
	});
	if (overlay) ops.push({
		op: "bcurveTo",
		data: [
			midDispX + x1 + (x2 - x1) * divergePoint + randomHalf(),
			midDispY + y1 + (y2 - y1) * divergePoint + randomHalf(),
			midDispX + x1 + 2 * (x2 - x1) * divergePoint + randomHalf(),
			midDispY + y1 + 2 * (y2 - y1) * divergePoint + randomHalf(),
			x2 + (preserveVertices ? 0 : randomHalf()),
			y2 + (preserveVertices ? 0 : randomHalf())
		]
	});
	else ops.push({
		op: "bcurveTo",
		data: [
			midDispX + x1 + (x2 - x1) * divergePoint + randomFull(),
			midDispY + y1 + (y2 - y1) * divergePoint + randomFull(),
			midDispX + x1 + 2 * (x2 - x1) * divergePoint + randomFull(),
			midDispY + y1 + 2 * (y2 - y1) * divergePoint + randomFull(),
			x2 + (preserveVertices ? 0 : randomFull()),
			y2 + (preserveVertices ? 0 : randomFull())
		]
	});
	return ops;
}
function _curveWithOffset(points, offset, o) {
	const ps = [];
	ps.push([points[0][0] + _offsetOpt(offset, o), points[0][1] + _offsetOpt(offset, o)]);
	ps.push([points[0][0] + _offsetOpt(offset, o), points[0][1] + _offsetOpt(offset, o)]);
	for (let i = 1; i < points.length; i++) {
		ps.push([points[i][0] + _offsetOpt(offset, o), points[i][1] + _offsetOpt(offset, o)]);
		if (i === points.length - 1) ps.push([points[i][0] + _offsetOpt(offset, o), points[i][1] + _offsetOpt(offset, o)]);
	}
	return _curve(ps, null, o);
}
function _curve(points, closePoint, o) {
	const len = points.length;
	const ops = [];
	if (len > 3) {
		const b = [];
		const s = 1 - o.curveTightness;
		ops.push({
			op: "move",
			data: [points[1][0], points[1][1]]
		});
		for (let i = 1; i + 2 < len; i++) {
			const cachedVertArray = points[i];
			b[0] = [cachedVertArray[0], cachedVertArray[1]];
			b[1] = [cachedVertArray[0] + (s * points[i + 1][0] - s * points[i - 1][0]) / 6, cachedVertArray[1] + (s * points[i + 1][1] - s * points[i - 1][1]) / 6];
			b[2] = [points[i + 1][0] + (s * points[i][0] - s * points[i + 2][0]) / 6, points[i + 1][1] + (s * points[i][1] - s * points[i + 2][1]) / 6];
			b[3] = [points[i + 1][0], points[i + 1][1]];
			ops.push({
				op: "bcurveTo",
				data: [
					b[1][0],
					b[1][1],
					b[2][0],
					b[2][1],
					b[3][0],
					b[3][1]
				]
			});
		}
		if (closePoint && closePoint.length === 2) {
			const ro = o.maxRandomnessOffset;
			ops.push({
				op: "lineTo",
				data: [closePoint[0] + _offsetOpt(ro, o), closePoint[1] + _offsetOpt(ro, o)]
			});
		}
	} else if (len === 3) {
		ops.push({
			op: "move",
			data: [points[1][0], points[1][1]]
		});
		ops.push({
			op: "bcurveTo",
			data: [
				points[1][0],
				points[1][1],
				points[2][0],
				points[2][1],
				points[2][0],
				points[2][1]
			]
		});
	} else if (len === 2) ops.push(..._doubleLine(points[0][0], points[0][1], points[1][0], points[1][1], o));
	return ops;
}
function _computeEllipsePoints(increment, cx, cy, rx, ry, offset, overlap, o) {
	const coreOnly = o.roughness === 0;
	const corePoints = [];
	const allPoints = [];
	if (coreOnly) {
		increment = increment / 4;
		allPoints.push([cx + rx * Math.cos(-increment), cy + ry * Math.sin(-increment)]);
		for (let angle = 0; angle <= Math.PI * 2; angle = angle + increment) {
			const p = [cx + rx * Math.cos(angle), cy + ry * Math.sin(angle)];
			corePoints.push(p);
			allPoints.push(p);
		}
		allPoints.push([cx + rx * Math.cos(0), cy + ry * Math.sin(0)]);
		allPoints.push([cx + rx * Math.cos(increment), cy + ry * Math.sin(increment)]);
	} else {
		const radOffset = _offsetOpt(.5, o) - Math.PI / 2;
		allPoints.push([_offsetOpt(offset, o) + cx + .9 * rx * Math.cos(radOffset - increment), _offsetOpt(offset, o) + cy + .9 * ry * Math.sin(radOffset - increment)]);
		const endAngle = Math.PI * 2 + radOffset - .01;
		for (let angle = radOffset; angle < endAngle; angle = angle + increment) {
			const p = [_offsetOpt(offset, o) + cx + rx * Math.cos(angle), _offsetOpt(offset, o) + cy + ry * Math.sin(angle)];
			corePoints.push(p);
			allPoints.push(p);
		}
		allPoints.push([_offsetOpt(offset, o) + cx + rx * Math.cos(radOffset + Math.PI * 2 + overlap * .5), _offsetOpt(offset, o) + cy + ry * Math.sin(radOffset + Math.PI * 2 + overlap * .5)]);
		allPoints.push([_offsetOpt(offset, o) + cx + .98 * rx * Math.cos(radOffset + overlap), _offsetOpt(offset, o) + cy + .98 * ry * Math.sin(radOffset + overlap)]);
		allPoints.push([_offsetOpt(offset, o) + cx + .9 * rx * Math.cos(radOffset + overlap * .5), _offsetOpt(offset, o) + cy + .9 * ry * Math.sin(radOffset + overlap * .5)]);
	}
	return [allPoints, corePoints];
}
function _arc(increment, cx, cy, rx, ry, strt, stp, offset, o) {
	const radOffset = strt + _offsetOpt(.1, o);
	const points = [];
	points.push([_offsetOpt(offset, o) + cx + .9 * rx * Math.cos(radOffset - increment), _offsetOpt(offset, o) + cy + .9 * ry * Math.sin(radOffset - increment)]);
	for (let angle = radOffset; angle <= stp; angle = angle + increment) points.push([_offsetOpt(offset, o) + cx + rx * Math.cos(angle), _offsetOpt(offset, o) + cy + ry * Math.sin(angle)]);
	points.push([cx + rx * Math.cos(stp), cy + ry * Math.sin(stp)]);
	points.push([cx + rx * Math.cos(stp), cy + ry * Math.sin(stp)]);
	return _curve(points, null, o);
}
function _bezierTo(x1, y1, x2, y2, x, y, current, o) {
	const ops = [];
	const ros = [o.maxRandomnessOffset || 1, (o.maxRandomnessOffset || 1) + .3];
	let f = [0, 0];
	const iterations = o.disableMultiStroke ? 1 : 2;
	const preserveVertices = o.preserveVertices;
	for (let i = 0; i < iterations; i++) {
		if (i === 0) ops.push({
			op: "move",
			data: [current[0], current[1]]
		});
		else ops.push({
			op: "move",
			data: [current[0] + (preserveVertices ? 0 : _offsetOpt(ros[0], o)), current[1] + (preserveVertices ? 0 : _offsetOpt(ros[0], o))]
		});
		f = preserveVertices ? [x, y] : [x + _offsetOpt(ros[i], o), y + _offsetOpt(ros[i], o)];
		ops.push({
			op: "bcurveTo",
			data: [
				x1 + _offsetOpt(ros[i], o),
				y1 + _offsetOpt(ros[i], o),
				x2 + _offsetOpt(ros[i], o),
				y2 + _offsetOpt(ros[i], o),
				f[0],
				f[1]
			]
		});
	}
	return ops;
}
var helper;
var init_renderer = __esmMin((() => {
	init_filler();
	init_math();
	init_lib$4();
	helper = {
		randOffset,
		randOffsetWithRange,
		ellipse,
		doubleLineOps: doubleLineFillOps
	};
}));
//#endregion
//#region ../../node_modules/@excalidraw/excalidraw/node_modules/roughjs/node_modules/points-on-curve/lib/curve-to-bezier.js
function clone(p) {
	return [...p];
}
function curveToBezier(pointsIn, curveTightness = 0) {
	const len = pointsIn.length;
	if (len < 3) throw new Error("A curve must have at least three points.");
	const out = [];
	if (len === 3) out.push(clone(pointsIn[0]), clone(pointsIn[1]), clone(pointsIn[2]), clone(pointsIn[2]));
	else {
		const points = [];
		points.push(pointsIn[0], pointsIn[0]);
		for (let i = 1; i < pointsIn.length; i++) {
			points.push(pointsIn[i]);
			if (i === pointsIn.length - 1) points.push(pointsIn[i]);
		}
		const b = [];
		const s = 1 - curveTightness;
		out.push(clone(points[0]));
		for (let i = 1; i + 2 < points.length; i++) {
			const cachedVertArray = points[i];
			b[0] = [cachedVertArray[0], cachedVertArray[1]];
			b[1] = [cachedVertArray[0] + (s * points[i + 1][0] - s * points[i - 1][0]) / 6, cachedVertArray[1] + (s * points[i + 1][1] - s * points[i - 1][1]) / 6];
			b[2] = [points[i + 1][0] + (s * points[i][0] - s * points[i + 2][0]) / 6, points[i + 1][1] + (s * points[i][1] - s * points[i + 2][1]) / 6];
			b[3] = [points[i + 1][0], points[i + 1][1]];
			out.push(b[1], b[2], b[3]);
		}
	}
	return out;
}
var init_curve_to_bezier = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@excalidraw/excalidraw/node_modules/roughjs/node_modules/points-on-curve/lib/index.js
function distance$2(p1, p2) {
	return Math.sqrt(distanceSq$2(p1, p2));
}
function distanceSq$2(p1, p2) {
	return Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2);
}
function distanceToSegmentSq$2(p, v, w) {
	const l2 = distanceSq$2(v, w);
	if (l2 === 0) return distanceSq$2(p, v);
	let t = ((p[0] - v[0]) * (w[0] - v[0]) + (p[1] - v[1]) * (w[1] - v[1])) / l2;
	t = Math.max(0, Math.min(1, t));
	return distanceSq$2(p, lerp$2(v, w, t));
}
function lerp$2(a, b, t) {
	return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
}
function flatness$2(points, offset) {
	const p1 = points[offset + 0];
	const p2 = points[offset + 1];
	const p3 = points[offset + 2];
	const p4 = points[offset + 3];
	let ux = 3 * p2[0] - 2 * p1[0] - p4[0];
	ux *= ux;
	let uy = 3 * p2[1] - 2 * p1[1] - p4[1];
	uy *= uy;
	let vx = 3 * p3[0] - 2 * p4[0] - p1[0];
	vx *= vx;
	let vy = 3 * p3[1] - 2 * p4[1] - p1[1];
	vy *= vy;
	if (ux < vx) ux = vx;
	if (uy < vy) uy = vy;
	return ux + uy;
}
function getPointsOnBezierCurveWithSplitting$2(points, offset, tolerance, newPoints) {
	const outPoints = newPoints || [];
	if (flatness$2(points, offset) < tolerance) {
		const p0 = points[offset + 0];
		if (outPoints.length) {
			if (distance$2(outPoints[outPoints.length - 1], p0) > 1) outPoints.push(p0);
		} else outPoints.push(p0);
		outPoints.push(points[offset + 3]);
	} else {
		const t = .5;
		const p1 = points[offset + 0];
		const p2 = points[offset + 1];
		const p3 = points[offset + 2];
		const p4 = points[offset + 3];
		const q1 = lerp$2(p1, p2, t);
		const q2 = lerp$2(p2, p3, t);
		const q3 = lerp$2(p3, p4, t);
		const r1 = lerp$2(q1, q2, t);
		const r2 = lerp$2(q2, q3, t);
		const red = lerp$2(r1, r2, t);
		getPointsOnBezierCurveWithSplitting$2([
			p1,
			q1,
			r1,
			red
		], 0, tolerance, outPoints);
		getPointsOnBezierCurveWithSplitting$2([
			red,
			r2,
			q3,
			p4
		], 0, tolerance, outPoints);
	}
	return outPoints;
}
function simplifyPoints$2(points, start, end, epsilon, newPoints) {
	const outPoints = newPoints || [];
	const s = points[start];
	const e = points[end - 1];
	let maxDistSq = 0;
	let maxNdx = 1;
	for (let i = start + 1; i < end - 1; ++i) {
		const distSq = distanceToSegmentSq$2(points[i], s, e);
		if (distSq > maxDistSq) {
			maxDistSq = distSq;
			maxNdx = i;
		}
	}
	if (Math.sqrt(maxDistSq) > epsilon) {
		simplifyPoints$2(points, start, maxNdx + 1, epsilon, outPoints);
		simplifyPoints$2(points, maxNdx, end, epsilon, outPoints);
	} else {
		if (!outPoints.length) outPoints.push(s);
		outPoints.push(e);
	}
	return outPoints;
}
function pointsOnBezierCurves$2(points, tolerance = .15, distance) {
	const newPoints = [];
	const numSegments = (points.length - 1) / 3;
	for (let i = 0; i < numSegments; i++) getPointsOnBezierCurveWithSplitting$2(points, i * 3, tolerance, newPoints);
	if (distance && distance > 0) return simplifyPoints$2(newPoints, 0, newPoints.length, distance);
	return newPoints;
}
var init_lib$3 = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/points-on-curve/lib/index.js
function distance$1(p1, p2) {
	return Math.sqrt(distanceSq$1(p1, p2));
}
function distanceSq$1(p1, p2) {
	return Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2);
}
function distanceToSegmentSq$1(p, v, w) {
	const l2 = distanceSq$1(v, w);
	if (l2 === 0) return distanceSq$1(p, v);
	let t = ((p[0] - v[0]) * (w[0] - v[0]) + (p[1] - v[1]) * (w[1] - v[1])) / l2;
	t = Math.max(0, Math.min(1, t));
	return distanceSq$1(p, lerp$1(v, w, t));
}
function lerp$1(a, b, t) {
	return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
}
function flatness$1(points, offset) {
	const p1 = points[offset + 0];
	const p2 = points[offset + 1];
	const p3 = points[offset + 2];
	const p4 = points[offset + 3];
	let ux = 3 * p2[0] - 2 * p1[0] - p4[0];
	ux *= ux;
	let uy = 3 * p2[1] - 2 * p1[1] - p4[1];
	uy *= uy;
	let vx = 3 * p3[0] - 2 * p4[0] - p1[0];
	vx *= vx;
	let vy = 3 * p3[1] - 2 * p4[1] - p1[1];
	vy *= vy;
	if (ux < vx) ux = vx;
	if (uy < vy) uy = vy;
	return ux + uy;
}
function getPointsOnBezierCurveWithSplitting$1(points, offset, tolerance, newPoints) {
	const outPoints = newPoints || [];
	if (flatness$1(points, offset) < tolerance) {
		const p0 = points[offset + 0];
		if (outPoints.length) {
			if (distance$1(outPoints[outPoints.length - 1], p0) > 1) outPoints.push(p0);
		} else outPoints.push(p0);
		outPoints.push(points[offset + 3]);
	} else {
		const t = .5;
		const p1 = points[offset + 0];
		const p2 = points[offset + 1];
		const p3 = points[offset + 2];
		const p4 = points[offset + 3];
		const q1 = lerp$1(p1, p2, t);
		const q2 = lerp$1(p2, p3, t);
		const q3 = lerp$1(p3, p4, t);
		const r1 = lerp$1(q1, q2, t);
		const r2 = lerp$1(q2, q3, t);
		const red = lerp$1(r1, r2, t);
		getPointsOnBezierCurveWithSplitting$1([
			p1,
			q1,
			r1,
			red
		], 0, tolerance, outPoints);
		getPointsOnBezierCurveWithSplitting$1([
			red,
			r2,
			q3,
			p4
		], 0, tolerance, outPoints);
	}
	return outPoints;
}
function simplify$1(points, distance) {
	return simplifyPoints$1(points, 0, points.length, distance);
}
function simplifyPoints$1(points, start, end, epsilon, newPoints) {
	const outPoints = newPoints || [];
	const s = points[start];
	const e = points[end - 1];
	let maxDistSq = 0;
	let maxNdx = 1;
	for (let i = start + 1; i < end - 1; ++i) {
		const distSq = distanceToSegmentSq$1(points[i], s, e);
		if (distSq > maxDistSq) {
			maxDistSq = distSq;
			maxNdx = i;
		}
	}
	if (Math.sqrt(maxDistSq) > epsilon) {
		simplifyPoints$1(points, start, maxNdx + 1, epsilon, outPoints);
		simplifyPoints$1(points, maxNdx, end, epsilon, outPoints);
	} else {
		if (!outPoints.length) outPoints.push(s);
		outPoints.push(e);
	}
	return outPoints;
}
function pointsOnBezierCurves$1(points, tolerance = .15, distance) {
	const newPoints = [];
	const numSegments = (points.length - 1) / 3;
	for (let i = 0; i < numSegments; i++) getPointsOnBezierCurveWithSplitting$1(points, i * 3, tolerance, newPoints);
	if (distance && distance > 0) return simplifyPoints$1(newPoints, 0, newPoints.length, distance);
	return newPoints;
}
var init_lib$2 = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/points-on-path/lib/index.js
function pointsOnPath(path, tolerance, distance) {
	const normalized = normalize(absolutize(parsePath(path)));
	const sets = [];
	let currentPoints = [];
	let start = [0, 0];
	let pendingCurve = [];
	const appendPendingCurve = () => {
		if (pendingCurve.length >= 4) currentPoints.push(...pointsOnBezierCurves$1(pendingCurve, tolerance));
		pendingCurve = [];
	};
	const appendPendingPoints = () => {
		appendPendingCurve();
		if (currentPoints.length) {
			sets.push(currentPoints);
			currentPoints = [];
		}
	};
	for (const { key, data } of normalized) switch (key) {
		case "M":
			appendPendingPoints();
			start = [data[0], data[1]];
			currentPoints.push(start);
			break;
		case "L":
			appendPendingCurve();
			currentPoints.push([data[0], data[1]]);
			break;
		case "C":
			if (!pendingCurve.length) {
				const lastPoint = currentPoints.length ? currentPoints[currentPoints.length - 1] : start;
				pendingCurve.push([lastPoint[0], lastPoint[1]]);
			}
			pendingCurve.push([data[0], data[1]]);
			pendingCurve.push([data[2], data[3]]);
			pendingCurve.push([data[4], data[5]]);
			break;
		case "Z":
			appendPendingCurve();
			currentPoints.push([start[0], start[1]]);
			break;
	}
	appendPendingPoints();
	if (!distance) return sets;
	const out = [];
	for (const set of sets) {
		const simplifiedSet = simplify$1(set, distance);
		if (simplifiedSet.length) out.push(simplifiedSet);
	}
	return out;
}
var init_lib$1 = __esmMin((() => {
	init_lib$2();
	init_lib$4();
}));
//#endregion
//#region ../../node_modules/@excalidraw/excalidraw/node_modules/roughjs/bin/generator.js
var NOS, RoughGenerator;
var init_generator = __esmMin((() => {
	init_renderer();
	init_math();
	init_curve_to_bezier();
	init_lib$3();
	init_lib$1();
	NOS = "none";
	RoughGenerator = class {
		constructor(config) {
			this.defaultOptions = {
				maxRandomnessOffset: 2,
				roughness: 1,
				bowing: 1,
				stroke: "#000",
				strokeWidth: 1,
				curveTightness: 0,
				curveFitting: .95,
				curveStepCount: 9,
				fillStyle: "hachure",
				fillWeight: -1,
				hachureAngle: -41,
				hachureGap: -1,
				dashOffset: -1,
				dashGap: -1,
				zigzagOffset: -1,
				seed: 0,
				disableMultiStroke: false,
				disableMultiStrokeFill: false,
				preserveVertices: false,
				fillShapeRoughnessGain: .8
			};
			this.config = config || {};
			if (this.config.options) this.defaultOptions = this._o(this.config.options);
		}
		static newSeed() {
			return randomSeed();
		}
		_o(options) {
			return options ? Object.assign({}, this.defaultOptions, options) : this.defaultOptions;
		}
		_d(shape, sets, options) {
			return {
				shape,
				sets: sets || [],
				options: options || this.defaultOptions
			};
		}
		line(x1, y1, x2, y2, options) {
			const o = this._o(options);
			return this._d("line", [line(x1, y1, x2, y2, o)], o);
		}
		rectangle(x, y, width, height, options) {
			const o = this._o(options);
			const paths = [];
			const outline = rectangle(x, y, width, height, o);
			if (o.fill) {
				const points = [
					[x, y],
					[x + width, y],
					[x + width, y + height],
					[x, y + height]
				];
				if (o.fillStyle === "solid") paths.push(solidFillPolygon([points], o));
				else paths.push(patternFillPolygons([points], o));
			}
			if (o.stroke !== NOS) paths.push(outline);
			return this._d("rectangle", paths, o);
		}
		ellipse(x, y, width, height, options) {
			const o = this._o(options);
			const paths = [];
			const ellipseParams = generateEllipseParams(width, height, o);
			const ellipseResponse = ellipseWithParams(x, y, o, ellipseParams);
			if (o.fill) if (o.fillStyle === "solid") {
				const shape = ellipseWithParams(x, y, o, ellipseParams).opset;
				shape.type = "fillPath";
				paths.push(shape);
			} else paths.push(patternFillPolygons([ellipseResponse.estimatedPoints], o));
			if (o.stroke !== NOS) paths.push(ellipseResponse.opset);
			return this._d("ellipse", paths, o);
		}
		circle(x, y, diameter, options) {
			const ret = this.ellipse(x, y, diameter, diameter, options);
			ret.shape = "circle";
			return ret;
		}
		linearPath(points, options) {
			const o = this._o(options);
			return this._d("linearPath", [linearPath(points, false, o)], o);
		}
		arc(x, y, width, height, start, stop, closed = false, options) {
			const o = this._o(options);
			const paths = [];
			const outline = arc(x, y, width, height, start, stop, closed, true, o);
			if (closed && o.fill) if (o.fillStyle === "solid") {
				const fillOptions = Object.assign({}, o);
				fillOptions.disableMultiStroke = true;
				const shape = arc(x, y, width, height, start, stop, true, false, fillOptions);
				shape.type = "fillPath";
				paths.push(shape);
			} else paths.push(patternFillArc(x, y, width, height, start, stop, o));
			if (o.stroke !== NOS) paths.push(outline);
			return this._d("arc", paths, o);
		}
		curve(points, options) {
			const o = this._o(options);
			const paths = [];
			const outline = curve(points, o);
			if (o.fill && o.fill !== NOS && points.length >= 3) if (o.fillStyle === "solid") {
				const fillShape = curve(points, Object.assign(Object.assign({}, o), {
					disableMultiStroke: true,
					roughness: o.roughness ? o.roughness + o.fillShapeRoughnessGain : 0
				}));
				paths.push({
					type: "fillPath",
					ops: this._mergedShape(fillShape.ops)
				});
			} else {
				const polyPoints = pointsOnBezierCurves$2(curveToBezier(points), 10, (1 + o.roughness) / 2);
				paths.push(patternFillPolygons([polyPoints], o));
			}
			if (o.stroke !== NOS) paths.push(outline);
			return this._d("curve", paths, o);
		}
		polygon(points, options) {
			const o = this._o(options);
			const paths = [];
			const outline = linearPath(points, true, o);
			if (o.fill) if (o.fillStyle === "solid") paths.push(solidFillPolygon([points], o));
			else paths.push(patternFillPolygons([points], o));
			if (o.stroke !== NOS) paths.push(outline);
			return this._d("polygon", paths, o);
		}
		path(d, options) {
			const o = this._o(options);
			const paths = [];
			if (!d) return this._d("path", paths, o);
			d = (d || "").replace(/\n/g, " ").replace(/(-\s)/g, "-").replace("/(ss)/g", " ");
			const hasFill = o.fill && o.fill !== "transparent" && o.fill !== NOS;
			const hasStroke = o.stroke !== NOS;
			const simplified = !!(o.simplification && o.simplification < 1);
			const distance = simplified ? 4 - 4 * (o.simplification || 1) : (1 + o.roughness) / 2;
			const sets = pointsOnPath(d, 1, distance);
			const shape = svgPath(d, o);
			if (hasFill) if (o.fillStyle === "solid") if (sets.length === 1) {
				const fillShape = svgPath(d, Object.assign(Object.assign({}, o), {
					disableMultiStroke: true,
					roughness: o.roughness ? o.roughness + o.fillShapeRoughnessGain : 0
				}));
				paths.push({
					type: "fillPath",
					ops: this._mergedShape(fillShape.ops)
				});
			} else paths.push(solidFillPolygon(sets, o));
			else paths.push(patternFillPolygons(sets, o));
			if (hasStroke) if (simplified) sets.forEach((set) => {
				paths.push(linearPath(set, false, o));
			});
			else paths.push(shape);
			return this._d("path", paths, o);
		}
		opsToPath(drawing, fixedDecimals) {
			let path = "";
			for (const item of drawing.ops) {
				const data = typeof fixedDecimals === "number" && fixedDecimals >= 0 ? item.data.map((d) => +d.toFixed(fixedDecimals)) : item.data;
				switch (item.op) {
					case "move":
						path += `M${data[0]} ${data[1]} `;
						break;
					case "bcurveTo":
						path += `C${data[0]} ${data[1]}, ${data[2]} ${data[3]}, ${data[4]} ${data[5]} `;
						break;
					case "lineTo":
						path += `L${data[0]} ${data[1]} `;
						break;
				}
			}
			return path.trim();
		}
		toPaths(drawable) {
			const sets = drawable.sets || [];
			const o = drawable.options || this.defaultOptions;
			const paths = [];
			for (const drawing of sets) {
				let path = null;
				switch (drawing.type) {
					case "path":
						path = {
							d: this.opsToPath(drawing),
							stroke: o.stroke,
							strokeWidth: o.strokeWidth,
							fill: NOS
						};
						break;
					case "fillPath":
						path = {
							d: this.opsToPath(drawing),
							stroke: NOS,
							strokeWidth: 0,
							fill: o.fill || NOS
						};
						break;
					case "fillSketch":
						path = this.fillSketch(drawing, o);
						break;
				}
				if (path) paths.push(path);
			}
			return paths;
		}
		fillSketch(drawing, o) {
			let fweight = o.fillWeight;
			if (fweight < 0) fweight = o.strokeWidth / 2;
			return {
				d: this.opsToPath(drawing),
				stroke: o.fill || NOS,
				strokeWidth: fweight,
				fill: NOS
			};
		}
		_mergedShape(input) {
			return input.filter((d, i) => {
				if (i === 0) return true;
				if (d.op === "move") return false;
				return true;
			});
		}
	};
}));
//#endregion
//#region ../../node_modules/@excalidraw/excalidraw/node_modules/roughjs/bin/canvas.js
var RoughCanvas;
var init_canvas = __esmMin((() => {
	init_generator();
	RoughCanvas = class {
		constructor(canvas, config) {
			this.canvas = canvas;
			this.ctx = this.canvas.getContext("2d");
			this.gen = new RoughGenerator(config);
		}
		draw(drawable) {
			const sets = drawable.sets || [];
			const o = drawable.options || this.getDefaultOptions();
			const ctx = this.ctx;
			const precision = drawable.options.fixedDecimalPlaceDigits;
			for (const drawing of sets) switch (drawing.type) {
				case "path":
					ctx.save();
					ctx.strokeStyle = o.stroke === "none" ? "transparent" : o.stroke;
					ctx.lineWidth = o.strokeWidth;
					if (o.strokeLineDash) ctx.setLineDash(o.strokeLineDash);
					if (o.strokeLineDashOffset) ctx.lineDashOffset = o.strokeLineDashOffset;
					this._drawToContext(ctx, drawing, precision);
					ctx.restore();
					break;
				case "fillPath": {
					ctx.save();
					ctx.fillStyle = o.fill || "";
					const fillRule = drawable.shape === "curve" || drawable.shape === "polygon" || drawable.shape === "path" ? "evenodd" : "nonzero";
					this._drawToContext(ctx, drawing, precision, fillRule);
					ctx.restore();
					break;
				}
				case "fillSketch":
					this.fillSketch(ctx, drawing, o);
					break;
			}
		}
		fillSketch(ctx, drawing, o) {
			let fweight = o.fillWeight;
			if (fweight < 0) fweight = o.strokeWidth / 2;
			ctx.save();
			if (o.fillLineDash) ctx.setLineDash(o.fillLineDash);
			if (o.fillLineDashOffset) ctx.lineDashOffset = o.fillLineDashOffset;
			ctx.strokeStyle = o.fill || "";
			ctx.lineWidth = fweight;
			this._drawToContext(ctx, drawing, o.fixedDecimalPlaceDigits);
			ctx.restore();
		}
		_drawToContext(ctx, drawing, fixedDecimals, rule = "nonzero") {
			ctx.beginPath();
			for (const item of drawing.ops) {
				const data = typeof fixedDecimals === "number" && fixedDecimals >= 0 ? item.data.map((d) => +d.toFixed(fixedDecimals)) : item.data;
				switch (item.op) {
					case "move":
						ctx.moveTo(data[0], data[1]);
						break;
					case "bcurveTo":
						ctx.bezierCurveTo(data[0], data[1], data[2], data[3], data[4], data[5]);
						break;
					case "lineTo":
						ctx.lineTo(data[0], data[1]);
						break;
				}
			}
			if (drawing.type === "fillPath") ctx.fill(rule);
			else ctx.stroke();
		}
		get generator() {
			return this.gen;
		}
		getDefaultOptions() {
			return this.gen.defaultOptions;
		}
		line(x1, y1, x2, y2, options) {
			const d = this.gen.line(x1, y1, x2, y2, options);
			this.draw(d);
			return d;
		}
		rectangle(x, y, width, height, options) {
			const d = this.gen.rectangle(x, y, width, height, options);
			this.draw(d);
			return d;
		}
		ellipse(x, y, width, height, options) {
			const d = this.gen.ellipse(x, y, width, height, options);
			this.draw(d);
			return d;
		}
		circle(x, y, diameter, options) {
			const d = this.gen.circle(x, y, diameter, options);
			this.draw(d);
			return d;
		}
		linearPath(points, options) {
			const d = this.gen.linearPath(points, options);
			this.draw(d);
			return d;
		}
		polygon(points, options) {
			const d = this.gen.polygon(points, options);
			this.draw(d);
			return d;
		}
		arc(x, y, width, height, start, stop, closed = false, options) {
			const d = this.gen.arc(x, y, width, height, start, stop, closed, options);
			this.draw(d);
			return d;
		}
		curve(points, options) {
			const d = this.gen.curve(points, options);
			this.draw(d);
			return d;
		}
		path(d, options) {
			const drawing = this.gen.path(d, options);
			this.draw(drawing);
			return drawing;
		}
	};
}));
//#endregion
//#region ../../node_modules/@excalidraw/excalidraw/node_modules/roughjs/bin/core.js
var SVGNS;
var init_core = __esmMin((() => {
	SVGNS = "http://www.w3.org/2000/svg";
}));
//#endregion
//#region ../../node_modules/@excalidraw/excalidraw/node_modules/roughjs/bin/svg.js
var RoughSVG;
var init_svg = __esmMin((() => {
	init_core();
	init_generator();
	RoughSVG = class {
		constructor(svg, config) {
			this.svg = svg;
			this.gen = new RoughGenerator(config);
		}
		draw(drawable) {
			const sets = drawable.sets || [];
			const o = drawable.options || this.getDefaultOptions();
			const doc = this.svg.ownerDocument || window.document;
			const g = doc.createElementNS(SVGNS, "g");
			const precision = drawable.options.fixedDecimalPlaceDigits;
			for (const drawing of sets) {
				let path = null;
				switch (drawing.type) {
					case "path":
						path = doc.createElementNS(SVGNS, "path");
						path.setAttribute("d", this.opsToPath(drawing, precision));
						path.setAttribute("stroke", o.stroke);
						path.setAttribute("stroke-width", o.strokeWidth + "");
						path.setAttribute("fill", "none");
						if (o.strokeLineDash) path.setAttribute("stroke-dasharray", o.strokeLineDash.join(" ").trim());
						if (o.strokeLineDashOffset) path.setAttribute("stroke-dashoffset", `${o.strokeLineDashOffset}`);
						break;
					case "fillPath":
						path = doc.createElementNS(SVGNS, "path");
						path.setAttribute("d", this.opsToPath(drawing, precision));
						path.setAttribute("stroke", "none");
						path.setAttribute("stroke-width", "0");
						path.setAttribute("fill", o.fill || "");
						if (drawable.shape === "curve" || drawable.shape === "polygon") path.setAttribute("fill-rule", "evenodd");
						break;
					case "fillSketch":
						path = this.fillSketch(doc, drawing, o);
						break;
				}
				if (path) g.appendChild(path);
			}
			return g;
		}
		fillSketch(doc, drawing, o) {
			let fweight = o.fillWeight;
			if (fweight < 0) fweight = o.strokeWidth / 2;
			const path = doc.createElementNS(SVGNS, "path");
			path.setAttribute("d", this.opsToPath(drawing, o.fixedDecimalPlaceDigits));
			path.setAttribute("stroke", o.fill || "");
			path.setAttribute("stroke-width", fweight + "");
			path.setAttribute("fill", "none");
			if (o.fillLineDash) path.setAttribute("stroke-dasharray", o.fillLineDash.join(" ").trim());
			if (o.fillLineDashOffset) path.setAttribute("stroke-dashoffset", `${o.fillLineDashOffset}`);
			return path;
		}
		get generator() {
			return this.gen;
		}
		getDefaultOptions() {
			return this.gen.defaultOptions;
		}
		opsToPath(drawing, fixedDecimalPlaceDigits) {
			return this.gen.opsToPath(drawing, fixedDecimalPlaceDigits);
		}
		line(x1, y1, x2, y2, options) {
			const d = this.gen.line(x1, y1, x2, y2, options);
			return this.draw(d);
		}
		rectangle(x, y, width, height, options) {
			const d = this.gen.rectangle(x, y, width, height, options);
			return this.draw(d);
		}
		ellipse(x, y, width, height, options) {
			const d = this.gen.ellipse(x, y, width, height, options);
			return this.draw(d);
		}
		circle(x, y, diameter, options) {
			const d = this.gen.circle(x, y, diameter, options);
			return this.draw(d);
		}
		linearPath(points, options) {
			const d = this.gen.linearPath(points, options);
			return this.draw(d);
		}
		polygon(points, options) {
			const d = this.gen.polygon(points, options);
			return this.draw(d);
		}
		arc(x, y, width, height, start, stop, closed = false, options) {
			const d = this.gen.arc(x, y, width, height, start, stop, closed, options);
			return this.draw(d);
		}
		curve(points, options) {
			const d = this.gen.curve(points, options);
			return this.draw(d);
		}
		path(d, options) {
			const drawing = this.gen.path(d, options);
			return this.draw(drawing);
		}
	};
}));
//#endregion
//#region ../../node_modules/@excalidraw/excalidraw/node_modules/roughjs/bin/rough.js
var rough_default;
var init_rough = __esmMin((() => {
	init_canvas();
	init_generator();
	init_svg();
	rough_default = {
		canvas(canvas, config) {
			return new RoughCanvas(canvas, config);
		},
		svg(svg, config) {
			return new RoughSVG(svg, config);
		},
		generator(config) {
			return new RoughGenerator(config);
		},
		newSeed() {
			return RoughGenerator.newSeed();
		}
	};
}));
//#endregion
//#region ../../node_modules/perfect-freehand/dist/esm/index.js
function $(e, t, u, x = (h) => h) {
	return e * x(.5 - t * (.5 - u));
}
function se$1(e) {
	return [-e[0], -e[1]];
}
function l(e, t) {
	return [e[0] + t[0], e[1] + t[1]];
}
function a(e, t) {
	return [e[0] - t[0], e[1] - t[1]];
}
function b(e, t) {
	return [e[0] * t, e[1] * t];
}
function he$1(e, t) {
	return [e[0] / t, e[1] / t];
}
function R$1(e) {
	return [e[1], -e[0]];
}
function B(e, t) {
	return e[0] * t[0] + e[1] * t[1];
}
function ue$1(e, t) {
	return e[0] === t[0] && e[1] === t[1];
}
function ge$1(e) {
	return Math.hypot(e[0], e[1]);
}
function de$1(e) {
	return e[0] * e[0] + e[1] * e[1];
}
function A$1(e, t) {
	return de$1(a(e, t));
}
function G$1(e) {
	return he$1(e, ge$1(e));
}
function ie$1(e, t) {
	return Math.hypot(e[1] - t[1], e[0] - t[0]);
}
function L$1(e, t, u) {
	let x = Math.sin(u), h = Math.cos(u), y = e[0] - t[0], n = e[1] - t[1], f = y * h - n * x, d = y * x + n * h;
	return [f + t[0], d + t[1]];
}
function K$1(e, t, u) {
	return l(e, b(a(t, e), u));
}
function ee$1(e, t, u) {
	return l(e, b(t, u));
}
function ce(e, t = {}) {
	let { size: u = 16, smoothing: x = .5, thinning: h = .5, simulatePressure: y = !0, easing: n = (r) => r, start: f = {}, end: d = {}, last: D = !1 } = t, { cap: S = !0, easing: j = (r) => r * (2 - r) } = f, { cap: q = !0, easing: c = (r) => --r * r * r + 1 } = d;
	if (e.length === 0 || u <= 0) return [];
	let p = e[e.length - 1].runningLength, g = f.taper === !1 ? 0 : f.taper === !0 ? Math.max(u, p) : f.taper, T = d.taper === !1 ? 0 : d.taper === !0 ? Math.max(u, p) : d.taper, te = Math.pow(u * x, 2), _ = [], M = [], H = e.slice(0, 10).reduce((r, i) => {
		let o = i.pressure;
		if (y) {
			let s = C$1(1, i.distance / u);
			o = C$1(1, r + (C$1(1, 1 - s) - r) * (s * pe$1));
		}
		return (r + o) / 2;
	}, e[0].pressure), m = $(u, h, e[e.length - 1].pressure, n), U, X = e[0].vector, z = e[0].point, F = z, O = z, E = F, J = !1;
	for (let r = 0; r < e.length; r++) {
		let { pressure: i } = e[r], { point: o, vector: s, distance: W, runningLength: I } = e[r];
		if (r < e.length - 1 && p - I < 3) continue;
		if (h) {
			if (y) {
				let v = C$1(1, W / u), Z = C$1(1, 1 - v);
				i = C$1(1, H + (Z - H) * (v * pe$1));
			}
			m = $(u, h, i, n);
		} else m = u / 2;
		U === void 0 && (U = m);
		let le = I < g ? j(I / g) : 1, fe = p - I < T ? c((p - I) / T) : 1;
		m = Math.max(.01, m * Math.min(le, fe));
		let re = (r < e.length - 1 ? e[r + 1] : e[r]).vector, Y = r < e.length - 1 ? B(s, re) : 1, be = B(s, X) < 0 && !J, ne = Y !== null && Y < 0;
		if (be || ne) {
			let v = b(R$1(X), m);
			for (let Z = 1 / 13, w = 0; w <= 1; w += Z) O = L$1(a(o, v), o, V * w), _.push(O), E = L$1(l(o, v), o, V * -w), M.push(E);
			z = O, F = E, ne && (J = !0);
			continue;
		}
		if (J = !1, r === e.length - 1) {
			let v = b(R$1(s), m);
			_.push(a(o, v)), M.push(l(o, v));
			continue;
		}
		let oe = b(R$1(K$1(re, s, Y)), m);
		O = a(o, oe), (r <= 1 || A$1(z, O) > te) && (_.push(O), z = O), E = l(o, oe), (r <= 1 || A$1(F, E) > te) && (M.push(E), F = E), H = i, X = s;
	}
	let P = e[0].point.slice(0, 2), k = e.length > 1 ? e[e.length - 1].point.slice(0, 2) : l(e[0].point, [1, 1]), Q = [], N = [];
	if (e.length === 1) {
		if (!(g || T) || D) {
			let r = ee$1(P, G$1(R$1(a(P, k))), -(U || m)), i = [];
			for (let o = 1 / 13, s = o; s <= 1; s += o) i.push(L$1(r, P, V * 2 * s));
			return i;
		}
	} else {
		if (!(g || T && e.length === 1)) if (S) for (let i = 1 / 13, o = i; o <= 1; o += i) {
			let s = L$1(M[0], P, V * o);
			Q.push(s);
		}
		else {
			let i = a(_[0], M[0]), o = b(i, .5), s = b(i, .51);
			Q.push(a(P, o), a(P, s), l(P, s), l(P, o));
		}
		let r = R$1(se$1(e[e.length - 1].vector));
		if (T || g && e.length === 1) N.push(k);
		else if (q) {
			let i = ee$1(k, r, m);
			for (let o = 1 / 29, s = o; s < 1; s += o) N.push(L$1(i, k, V * 3 * s));
		} else N.push(l(k, b(r, m)), l(k, b(r, m * .99)), a(k, b(r, m * .99)), a(k, b(r, m)));
	}
	return _.concat(N, M.reverse(), Q);
}
function me$1(e, t = {}) {
	var q;
	let { streamline: u = .5, size: x = 16, last: h = !1 } = t;
	if (e.length === 0) return [];
	let y = .15 + (1 - u) * .85, n = Array.isArray(e[0]) ? e : e.map(({ x: c, y: p, pressure: g = .5 }) => [
		c,
		p,
		g
	]);
	if (n.length === 2) {
		let c = n[1];
		n = n.slice(0, -1);
		for (let p = 1; p < 5; p++) n.push(K$1(n[0], c, p / 4));
	}
	n.length === 1 && (n = [...n, [...l(n[0], [1, 1]), ...n[0].slice(2)]]);
	let f = [{
		point: [n[0][0], n[0][1]],
		pressure: n[0][2] >= 0 ? n[0][2] : .25,
		vector: [1, 1],
		distance: 0,
		runningLength: 0
	}], d = !1, D = 0, S = f[0], j = n.length - 1;
	for (let c = 1; c < n.length; c++) {
		let p = h && c === j ? n[c].slice(0, 2) : K$1(S.point, n[c], y);
		if (ue$1(S.point, p)) continue;
		let g = ie$1(p, S.point);
		if (D += g, c < j && !d) {
			if (D < x) continue;
			d = !0;
		}
		S = {
			point: p,
			pressure: n[c][2] >= 0 ? n[c][2] : .5,
			vector: G$1(a(S.point, p)),
			distance: g,
			runningLength: D
		}, f.push(S);
	}
	return f[0].vector = ((q = f[1]) == null ? void 0 : q.vector) || [0, 0], f;
}
function ae$1(e, t = {}) {
	return ce(me$1(e, t), t);
}
var C$1, xe$1, pe$1, V;
var init_esm = __esmMin((() => {
	({min: C$1, PI: xe$1} = Math), pe$1 = .275, V = xe$1 + 1e-4;
}));
//#endregion
//#region ../../node_modules/@excalidraw/excalidraw/node_modules/clsx/dist/clsx.m.js
function toVal(mix) {
	var k, y, str = "";
	if (typeof mix === "string" || typeof mix === "number") str += mix;
	else if (typeof mix === "object") {
		if (Array.isArray(mix)) {
			for (k = 0; k < mix.length; k++) if (mix[k]) {
				if (y = toVal(mix[k])) {
					str && (str += " ");
					str += y;
				}
			}
		} else for (k in mix) if (mix[k]) {
			str && (str += " ");
			str += k;
		}
	}
	return str;
}
function clsx_m_default() {
	var i = 0, tmp, x, str = "";
	while (i < arguments.length) if (tmp = arguments[i++]) {
		if (x = toVal(tmp)) {
			str && (str += " ");
			str += x;
		}
	}
	return str;
}
var init_clsx_m = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@excalidraw/excalidraw/node_modules/points-on-curve/lib/index.js
function distance(p1, p2) {
	return Math.sqrt(distanceSq(p1, p2));
}
function distanceSq(p1, p2) {
	return Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2);
}
function distanceToSegmentSq(p, v, w) {
	const l2 = distanceSq(v, w);
	if (l2 === 0) return distanceSq(p, v);
	let t = ((p[0] - v[0]) * (w[0] - v[0]) + (p[1] - v[1]) * (w[1] - v[1])) / l2;
	t = Math.max(0, Math.min(1, t));
	return distanceSq(p, lerp(v, w, t));
}
function lerp(a, b, t) {
	return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
}
function flatness(points, offset) {
	const p1 = points[offset + 0];
	const p2 = points[offset + 1];
	const p3 = points[offset + 2];
	const p4 = points[offset + 3];
	let ux = 3 * p2[0] - 2 * p1[0] - p4[0];
	ux *= ux;
	let uy = 3 * p2[1] - 2 * p1[1] - p4[1];
	uy *= uy;
	let vx = 3 * p3[0] - 2 * p4[0] - p1[0];
	vx *= vx;
	let vy = 3 * p3[1] - 2 * p4[1] - p1[1];
	vy *= vy;
	if (ux < vx) ux = vx;
	if (uy < vy) uy = vy;
	return ux + uy;
}
function getPointsOnBezierCurveWithSplitting(points, offset, tolerance, newPoints) {
	const outPoints = newPoints || [];
	if (flatness(points, offset) < tolerance) {
		const p0 = points[offset + 0];
		if (outPoints.length) {
			if (distance(outPoints[outPoints.length - 1], p0) > 1) outPoints.push(p0);
		} else outPoints.push(p0);
		outPoints.push(points[offset + 3]);
	} else {
		const t = .5;
		const p1 = points[offset + 0];
		const p2 = points[offset + 1];
		const p3 = points[offset + 2];
		const p4 = points[offset + 3];
		const q1 = lerp(p1, p2, t);
		const q2 = lerp(p2, p3, t);
		const q3 = lerp(p3, p4, t);
		const r1 = lerp(q1, q2, t);
		const r2 = lerp(q2, q3, t);
		const red = lerp(r1, r2, t);
		getPointsOnBezierCurveWithSplitting([
			p1,
			q1,
			r1,
			red
		], 0, tolerance, outPoints);
		getPointsOnBezierCurveWithSplitting([
			red,
			r2,
			q3,
			p4
		], 0, tolerance, outPoints);
	}
	return outPoints;
}
function simplify(points, distance) {
	return simplifyPoints(points, 0, points.length, distance);
}
function simplifyPoints(points, start, end, epsilon, newPoints) {
	const outPoints = newPoints || [];
	const s = points[start];
	const e = points[end - 1];
	let maxDistSq = 0;
	let maxNdx = 1;
	for (let i = start + 1; i < end - 1; ++i) {
		const distSq = distanceToSegmentSq(points[i], s, e);
		if (distSq > maxDistSq) {
			maxDistSq = distSq;
			maxNdx = i;
		}
	}
	if (Math.sqrt(maxDistSq) > epsilon) {
		simplifyPoints(points, start, maxNdx + 1, epsilon, outPoints);
		simplifyPoints(points, maxNdx, end, epsilon, outPoints);
	} else {
		if (!outPoints.length) outPoints.push(s);
		outPoints.push(e);
	}
	return outPoints;
}
function pointsOnBezierCurves(points, tolerance = .15, distance) {
	const newPoints = [];
	const numSegments = (points.length - 1) / 3;
	for (let i = 0; i < numSegments; i++) getPointsOnBezierCurveWithSplitting(points, i * 3, tolerance, newPoints);
	if (distance && distance > 0) return simplifyPoints(newPoints, 0, newPoints.length, distance);
	return newPoints;
}
var init_lib = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@excalidraw/excalidraw/node_modules/@braintree/sanitize-url/dist/index.js
var require_dist = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.sanitizeUrl = void 0;
	var invalidProtocolRegex = /^([^\w]*)(javascript|data|vbscript)/im;
	var htmlEntitiesRegex = /&#(\w+)(^\w|;)?/g;
	var htmlCtrlEntityRegex = /&(newline|tab);/gi;
	var ctrlCharactersRegex = /[\u0000-\u001F\u007F-\u009F\u2000-\u200D\uFEFF]/gim;
	var urlSchemeRegex = /^.+(:|&colon;)/gim;
	var relativeFirstCharacters = [".", "/"];
	function isRelativeUrlWithoutProtocol(url) {
		return relativeFirstCharacters.indexOf(url[0]) > -1;
	}
	function decodeHtmlCharacters(str) {
		return str.replace(htmlEntitiesRegex, function(match, dec) {
			return String.fromCharCode(dec);
		});
	}
	function sanitizeUrl(url) {
		var sanitizedUrl = decodeHtmlCharacters(url || "").replace(htmlCtrlEntityRegex, "").replace(ctrlCharactersRegex, "").trim();
		if (!sanitizedUrl) return "about:blank";
		if (isRelativeUrlWithoutProtocol(sanitizedUrl)) return sanitizedUrl;
		var urlSchemeParseResults = sanitizedUrl.match(urlSchemeRegex);
		if (!urlSchemeParseResults) return sanitizedUrl;
		var urlScheme = urlSchemeParseResults[0];
		if (invalidProtocolRegex.test(urlScheme)) return "about:blank";
		return sanitizedUrl;
	}
	exports.sanitizeUrl = sanitizeUrl;
}));
//#endregion
//#region ../../node_modules/fractional-indexing/src/index.js
/**
* @param {string} a
* @param {string | null | undefined} b
* @param {string} digits
* @returns {string}
*/
function midpoint(a, b, digits) {
	const zero = digits[0];
	if (b != null && a >= b) throw new Error(a + " >= " + b);
	if (a.slice(-1) === zero || b && b.slice(-1) === zero) throw new Error("trailing zero");
	if (b) {
		let n = 0;
		while ((a[n] || zero) === b[n]) n++;
		if (n > 0) return b.slice(0, n) + midpoint(a.slice(n), b.slice(n), digits);
	}
	const digitA = a ? digits.indexOf(a[0]) : 0;
	const digitB = b != null ? digits.indexOf(b[0]) : digits.length;
	if (digitB - digitA > 1) return digits[Math.round(.5 * (digitA + digitB))];
	else if (b && b.length > 1) return b.slice(0, 1);
	else return digits[digitA] + midpoint(a.slice(1), null, digits);
}
/**
* @param {string} int
* @return {void}
*/
function validateInteger(int) {
	if (int.length !== getIntegerLength(int[0])) throw new Error("invalid integer part of order key: " + int);
}
/**
* @param {string} head
* @return {number}
*/
function getIntegerLength(head) {
	if (head >= "a" && head <= "z") return head.charCodeAt(0) - "a".charCodeAt(0) + 2;
	else if (head >= "A" && head <= "Z") return "Z".charCodeAt(0) - head.charCodeAt(0) + 2;
	else throw new Error("invalid order key head: " + head);
}
/**
* @param {string} key
* @return {string}
*/
function getIntegerPart(key) {
	const integerPartLength = getIntegerLength(key[0]);
	if (integerPartLength > key.length) throw new Error("invalid order key: " + key);
	return key.slice(0, integerPartLength);
}
/**
* @param {string} key
* @param {string} digits
* @return {void}
*/
function validateOrderKey(key, digits) {
	if (key === "A" + digits[0].repeat(26)) throw new Error("invalid order key: " + key);
	const i = getIntegerPart(key);
	if (key.slice(i.length).slice(-1) === digits[0]) throw new Error("invalid order key: " + key);
}
/**
* @param {string} x
* @param {string} digits
* @return {string | null}
*/
function incrementInteger(x, digits) {
	validateInteger(x);
	const [head, ...digs] = x.split("");
	let carry = true;
	for (let i = digs.length - 1; carry && i >= 0; i--) {
		const d = digits.indexOf(digs[i]) + 1;
		if (d === digits.length) digs[i] = digits[0];
		else {
			digs[i] = digits[d];
			carry = false;
		}
	}
	if (carry) {
		if (head === "Z") return "a" + digits[0];
		if (head === "z") return null;
		const h = String.fromCharCode(head.charCodeAt(0) + 1);
		if (h > "a") digs.push(digits[0]);
		else digs.pop();
		return h + digs.join("");
	} else return head + digs.join("");
}
/**
* @param {string} x
* @param {string} digits
* @return {string | null}
*/
function decrementInteger(x, digits) {
	validateInteger(x);
	const [head, ...digs] = x.split("");
	let borrow = true;
	for (let i = digs.length - 1; borrow && i >= 0; i--) {
		const d = digits.indexOf(digs[i]) - 1;
		if (d === -1) digs[i] = digits.slice(-1);
		else {
			digs[i] = digits[d];
			borrow = false;
		}
	}
	if (borrow) {
		if (head === "a") return "Z" + digits.slice(-1);
		if (head === "A") return null;
		const h = String.fromCharCode(head.charCodeAt(0) - 1);
		if (h < "Z") digs.push(digits.slice(-1));
		else digs.pop();
		return h + digs.join("");
	} else return head + digs.join("");
}
/**
* @param {string | null | undefined} a
* @param {string | null | undefined} b
* @param {string=} digits
* @return {string}
*/
function generateKeyBetween(a, b, digits = BASE_62_DIGITS) {
	if (a != null) validateOrderKey(a, digits);
	if (b != null) validateOrderKey(b, digits);
	if (a != null && b != null && a >= b) throw new Error(a + " >= " + b);
	if (a == null) {
		if (b == null) return "a" + digits[0];
		const ib = getIntegerPart(b);
		const fb = b.slice(ib.length);
		if (ib === "A" + digits[0].repeat(26)) return ib + midpoint("", fb, digits);
		if (ib < b) return ib;
		const res = decrementInteger(ib, digits);
		if (res == null) throw new Error("cannot decrement any more");
		return res;
	}
	if (b == null) {
		const ia = getIntegerPart(a);
		const fa = a.slice(ia.length);
		const i = incrementInteger(ia, digits);
		return i == null ? ia + midpoint(fa, null, digits) : i;
	}
	const ia = getIntegerPart(a);
	const fa = a.slice(ia.length);
	const ib = getIntegerPart(b);
	const fb = b.slice(ib.length);
	if (ia === ib) return ia + midpoint(fa, fb, digits);
	const i = incrementInteger(ia, digits);
	if (i == null) throw new Error("cannot increment any more");
	if (i < b) return i;
	return ia + midpoint(fa, null, digits);
}
/**
* same preconditions as generateKeysBetween.
* n >= 0.
* Returns an array of n distinct keys in sorted order.
* If a and b are both null, returns [a0, a1, ...]
* If one or the other is null, returns consecutive "integer"
* keys.  Otherwise, returns relatively short keys between
* a and b.
* @param {string | null | undefined} a
* @param {string | null | undefined} b
* @param {number} n
* @param {string} digits
* @return {string[]}
*/
function generateNKeysBetween(a, b, n, digits = BASE_62_DIGITS) {
	if (n === 0) return [];
	if (n === 1) return [generateKeyBetween(a, b, digits)];
	if (b == null) {
		let c = generateKeyBetween(a, b, digits);
		const result = [c];
		for (let i = 0; i < n - 1; i++) {
			c = generateKeyBetween(c, b, digits);
			result.push(c);
		}
		return result;
	}
	if (a == null) {
		let c = generateKeyBetween(a, b, digits);
		const result = [c];
		for (let i = 0; i < n - 1; i++) {
			c = generateKeyBetween(a, c, digits);
			result.push(c);
		}
		result.reverse();
		return result;
	}
	const mid = Math.floor(n / 2);
	const c = generateKeyBetween(a, b, digits);
	return [
		...generateNKeysBetween(a, c, mid, digits),
		c,
		...generateNKeysBetween(c, b, n - mid - 1, digits)
	];
}
var BASE_62_DIGITS;
var init_src = __esmMin((() => {
	BASE_62_DIGITS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
}));
//#endregion
//#region ../../node_modules/browser-fs-access/dist/index.mjs
async function n(...e) {
	return (await t).default(...e);
}
async function s(...e) {
	return (await o).default(...e);
}
var e, t, o;
var init_dist = __esmMin((() => {
	init_preload_helper();
	e = (() => {
		if ("undefined" == typeof self) return !1;
		if ("top" in self && self !== top);
		else if ("showOpenFilePicker" in self) return "showOpenFilePicker";
		return !1;
	})(), t = e ? __vitePreload(() => import("./file-open-002ab408-BDfohlpj.js"), __vite__mapDeps([0,1]), import.meta.url) : __vitePreload(() => import("./file-open-7c801643-jonOQc__.js"), __vite__mapDeps([2,1]), import.meta.url);
	e ? __vitePreload(() => import("./directory-open-4ed118d0-BMoE_cIz.js"), __vite__mapDeps([3,1]), import.meta.url) : __vitePreload(() => import("./directory-open-01563666-f2vZSMtj.js"), __vite__mapDeps([4,1]), import.meta.url);
	o = e ? __vitePreload(() => import("./file-save-745eba88-Dv7mE7jW.js"), __vite__mapDeps([5,1]), import.meta.url) : __vitePreload(() => import("./file-save-3189631c-CzNMGs6C.js"), __vite__mapDeps([6,1]), import.meta.url);
}));
//#endregion
//#region ../../node_modules/@excalidraw/excalidraw/dist/prod/chunk-FX7ZIABN.js
function yr(e) {
	return e * Math.PI / 180;
}
function rd(e) {
	return e * 180 / Math.PI;
}
function od(e) {
	return Math.abs(Math.sin(2 * e)) < 1e-4;
}
function Be(e, t, n = 0, r = 0) {
	return [e - n, t - r];
}
function O(e, t = [0, 0]) {
	return Be(e[0] - t[0], e[1] - t[1]);
}
function Me(e, t) {
	return e[0] * t[1] - t[0] * e[1];
}
function h6(e, t) {
	return e[0] * t[0] + e[1] * t[1];
}
function st(e, t) {
	return [e[0] + t[0], e[1] + t[1]];
}
function Lo(e, t) {
	return [e[0] - t[0], e[1] - t[1]];
}
function ue(e, t) {
	return Be(e[0] * t, e[1] * t);
}
function y6(e) {
	return e[0] * e[0] + e[1] * e[1];
}
function I6(e) {
	return Math.sqrt(y6(e));
}
function u(e, t) {
	return [e, t];
}
function Ir(e) {
	return e.length === 2 ? u(e[0], e[1]) : void 0;
}
function q(e, t = u(0, 0)) {
	return u(t[0] + e[0], t[1] + e[1]);
}
function Do(e) {
	return Array.isArray(e) && e.length === 2 && typeof e[0] == "number" && !isNaN(e[0]) && typeof e[1] == "number" && !isNaN(e[1]);
}
function _e(e, t) {
	let n = Math.abs;
	return n(e[0] - t[0]) < 1e-4 && n(e[1] - t[1]) < 1e-4;
}
function T([e, t], [n, r], o) {
	return u((e - n) * Math.cos(o) - (t - r) * Math.sin(o) + n, (e - n) * Math.sin(o) + (t - r) * Math.cos(o) + r);
}
function wr(e, t = [0, 0]) {
	return u(e[0] + t[0], e[1] + t[1]);
}
function Zt(e, t) {
	return u((e[0] + t[0]) / 2, (e[1] + t[1]) / 2);
}
function ie(e, t) {
	return Math.hypot(t[0] - e[0], t[1] - e[1]);
}
function Xn(e, t) {
	let n = t[0] - e[0], r = t[1] - e[1];
	return n * n + r * r;
}
function Rr(e, t) {
	return [e, t];
}
function id(e, t) {
	let n = e[1][1] - e[0][1], r = e[0][0] - e[1][0], o = t[1][1] - t[0][1], i = t[0][0] - t[1][0], a = n * i - o * r;
	if (a !== 0) {
		let s = n * e[0][0] + r * e[0][1], d = o * t[0][0] + i * t[0][1];
		return u((s * i - d * r) / a, (n * d - o * s) / a);
	}
	return null;
}
function A(e, t) {
	return [e, t];
}
function pn(e, t) {
	let n = id(Rr(e[0], e[1]), Rr(t[0], t[1]));
	return !n || !Bt(n, t) || !Bt(n, e) ? null : n;
}
function Tr(e, t) {
	return [e, t];
}
function ad(e, t) {
	return [
		A(e[0], u(e[1][0], e[0][1])),
		A(u(e[1][0], e[0][1]), e[1]),
		A(e[1], u(e[0][0], e[1][1])),
		A(u(e[0][0], e[1][1]), e[0])
	].map((n) => pn(t, n)).filter((n) => !!n);
}
function Et(e, t, n, r) {
	return [
		e,
		t,
		n,
		r
	];
}
function sd(e, t, n, r = 1e-6) {
	return [(e(t + r, n) - e(t - r, n)) / (2 * r), (e(t, n + r) - e(t, n - r)) / (2 * r)];
}
function w6(e, t, n, r = .001, o = 10) {
	let i = Infinity, a = 0;
	for (; i >= r;) {
		if (a >= o) return null;
		let s = e(t, n), d = [sd((E, g) => e(E, g)[0], t, n), sd((E, g) => e(E, g)[1], t, n)], c = [[-s[0]], [-s[1]]], l = d[0][0] * d[1][1] - d[0][1] * d[1][0];
		if (l === 0) return null;
		let U = [[d[1][1] / l, -d[0][1] / l], [-d[1][0] / l, d[0][0] / l]], p = [[U[0][0] * c[0][0] + U[0][1] * c[1][0]], [U[1][0] * c[0][0] + U[1][1] * c[1][0]]];
		t = t + p[0][0], n = n + p[1][0];
		let [m, b] = e(t, n);
		i = Math.max(Math.abs(m), Math.abs(b)), a += 1;
	}
	return [t, n];
}
function Wi(e, t) {
	let n = T6(e);
	if (ad(Tr(u(n[0], n[1]), u(n[2], n[3])), t).length === 0) return [];
	let r = (s) => u(t[0][0] + s * (t[1][0] - t[0][0]), t[0][1] + s * (t[1][1] - t[0][1])), o = [
		[.5, 0],
		[.2, 0],
		[.8, 0]
	], i = ([s, d]) => {
		let c = w6((p, m) => {
			let b = Mr(e, p), E = r(m);
			return [b[0] - E[0], b[1] - E[1]];
		}, s, d);
		if (!c) return null;
		let [l, U] = c;
		return l < 0 || l > 1 || U < 0 || U > 1 ? null : Mr(e, l);
	}, a = i(o[0]);
	return a ? [a] : (a = i(o[1]), a ? [a] : (a = i(o[2]), a ? [a] : []));
}
function R6(e, t, n = .001) {
	let r = (c, l, U, p = n) => {
		let m = c, b = l, E;
		for (; b - m > p;) E = (b + m) / 2, U(E - p) < U(E + p) ? b = E : m = E;
		return E;
	}, i = 0;
	for (let c = Infinity, l = 0; l < 30; l++) {
		let U = ie(t, Mr(e, l / 30));
		U < c && (c = U, i = l);
	}
	let d = r(Math.max((i - 1) / 30, 0), Math.min((i + 1) / 30, 1), (c) => ie(t, Mr(e, c)));
	return d ? Mr(e, d) : null;
}
function zi(e, t) {
	let n = R6(e, t);
	return n ? ie(t, n) : 0;
}
function T6(e) {
	let [t, n, r, o] = e, i = [
		t[0],
		n[0],
		r[0],
		o[0]
	], a = [
		t[1],
		n[1],
		r[1],
		o[1]
	];
	return [
		Math.min(...i),
		Math.min(...a),
		Math.max(...i),
		Math.max(...a)
	];
}
function Qi(...e) {
	return cd(e);
}
function Gn(e) {
	return cd(e);
}
function cd(e) {
	return M6(e) ? e : [...e, e[0]];
}
function M6(e) {
	return _e(e[0], e[e.length - 1]);
}
function Oe(e, t) {
	return tt([e, t]);
}
function Ln([e, t, n], r) {
	let o = (l, U, p) => (l[0] - p[0]) * (U[1] - p[1]) - (U[0] - p[0]) * (l[1] - p[1]), i = o(r, e, t), a = o(r, t, n), s = o(r, n, e);
	return !((i < 0 || a < 0 || s < 0) && (i > 0 || a > 0 || s > 0));
}
function Ae(e, t) {
	if (!e) throw new Error(t);
}
function Sg(e, t, n, r) {
	return e ? (e?.addEventListener?.(t, n, r), () => {
		e?.removeEventListener?.(t, n, r);
	}) : () => {};
}
function vg(e, t = !0) {
	let n = e.length;
	if (n < 4) return "";
	let r = e[0], o = e[1], i = e[2], a = `M${r[0].toFixed(2)},${r[1].toFixed(2)} Q${o[0].toFixed(2)},${o[1].toFixed(2)} ${xr(o[0], i[0]).toFixed(2)},${xr(o[1], i[1]).toFixed(2)} T`;
	for (let s = 2, d = n - 1; s < d; s++) r = e[s], o = e[s + 1], a += `${xr(r[0], o[0]).toFixed(2)},${xr(r[1], o[1]).toFixed(2)} `;
	return t && (a += "Z"), a;
}
function zo(e, t, n) {
	return {
		center: e,
		halfWidth: t,
		halfHeight: n
	};
}
function M1({ center: e, halfWidth: t, halfHeight: n }, [r, o]) {
	let [i, a] = e, s = r[0] - i, d = r[1] - a, c = o[0] - i, l = o[1] - a, U = Math.pow(c - s, 2) / Math.pow(t, 2) + Math.pow(l - d, 2) / Math.pow(n, 2), p = 2 * (s * (c - s) / Math.pow(t, 2) + d * (l - d) / Math.pow(n, 2)), m = Math.pow(s, 2) / Math.pow(t, 2) + Math.pow(d, 2) / Math.pow(n, 2) - 1, b = (-p + Math.sqrt(Math.pow(p, 2) - 4 * U * m)) / (2 * U), E = (-p - Math.sqrt(Math.pow(p, 2) - 4 * U * m)) / (2 * U), g = [u(s + b * (c - s) + i, d + b * (l - d) + a), u(s + E * (c - s) + i, d + E * (l - d) + a)].filter((h) => !isNaN(h[0]) && !isNaN(h[1]));
	return g.length === 2 && _e(g[0], g[1]) ? [g[0]] : g;
}
function Qo(e, t = 0) {
	let n = it(Math.min(e.width, e.height), e);
	if (n <= 0) {
		let p = Tr(u(e.x - t, e.y - t), u(e.x + e.width + t, e.y + e.height + t));
		return [[
			A(u(p[0][0] + n, p[0][1]), u(p[1][0] - n, p[0][1])),
			A(u(p[1][0], p[0][1] + n), u(p[1][0], p[1][1] - n)),
			A(u(p[0][0] + n, p[1][1]), u(p[1][0] - n, p[1][1])),
			A(u(p[0][0], p[1][1] - n), u(p[0][0], p[0][1] + n))
		], []];
	}
	let r = u(e.x + e.width / 2, e.y + e.height / 2), o = Tr(u(e.x, e.y), u(e.x + e.width, e.y + e.height)), i = A(u(o[0][0] + n, o[0][1]), u(o[1][0] - n, o[0][1])), a = A(u(o[1][0], o[0][1] + n), u(o[1][0], o[1][1] - n)), s = A(u(o[0][0] + n, o[1][1]), u(o[1][0] - n, o[1][1])), d = A(u(o[0][0], o[1][1] - n), u(o[0][0], o[0][1] + n)), c = [
		ue(Je(O(u(o[0][0] - t, o[0][1] - t), r)), t),
		ue(Je(O(u(o[1][0] + t, o[0][1] - t), r)), t),
		ue(Je(O(u(o[1][0] + t, o[1][1] + t), r)), t),
		ue(Je(O(u(o[0][0] - t, o[1][1] + t), r)), t)
	], l = [
		Et(q(c[0], d[1]), q(c[0], u(d[1][0] + 2 / 3 * (o[0][0] - d[1][0]), d[1][1] + 2 / 3 * (o[0][1] - d[1][1]))), q(c[0], u(i[0][0] + 2 / 3 * (o[0][0] - i[0][0]), i[0][1] + 2 / 3 * (o[0][1] - i[0][1]))), q(c[0], i[0])),
		Et(q(c[1], i[1]), q(c[1], u(i[1][0] + 2 / 3 * (o[1][0] - i[1][0]), i[1][1] + 2 / 3 * (o[0][1] - i[1][1]))), q(c[1], u(a[0][0] + 2 / 3 * (o[1][0] - a[0][0]), a[0][1] + 2 / 3 * (o[0][1] - a[0][1]))), q(c[1], a[0])),
		Et(q(c[2], a[1]), q(c[2], u(a[1][0] + 2 / 3 * (o[1][0] - a[1][0]), a[1][1] + 2 / 3 * (o[1][1] - a[1][1]))), q(c[2], u(s[1][0] + 2 / 3 * (o[1][0] - s[1][0]), s[1][1] + 2 / 3 * (o[1][1] - s[1][1]))), q(c[2], s[1])),
		Et(q(c[3], s[0]), q(c[3], u(s[0][0] + 2 / 3 * (o[0][0] - s[0][0]), s[0][1] + 2 / 3 * (o[1][1] - s[0][1]))), q(c[3], u(d[0][0] + 2 / 3 * (o[0][0] - d[0][0]), d[0][1] + 2 / 3 * (o[1][1] - d[0][1]))), q(c[3], d[0]))
	];
	return [[
		A(l[0][3], l[1][0]),
		A(l[1][3], l[2][0]),
		A(l[2][3], l[3][0]),
		A(l[3][3], l[0][0])
	], l];
}
function jo(e, t = 0) {
	let [n, r, o, i, a, s, d, c] = Or(e), l = it(Math.abs(n - d), e), U = it(Math.abs(i - r), e);
	if (e.roundness?.type == null) {
		let [w, I, S, v] = [
			u(e.x + n, e.y + r - t),
			u(e.x + o + t, e.y + i),
			u(e.x + a, e.y + s + t),
			u(e.x + d - t, e.y + c)
		];
		return [[
			A(u(w[0] + l, w[1] + U), u(I[0] - l, I[1] - U)),
			A(u(I[0] - l, I[1] + U), u(S[0] + l, S[1] - U)),
			A(u(S[0] - l, S[1] - U), u(v[0] + l, v[1] + U)),
			A(u(v[0] + l, v[1] - U), u(w[0] - l, w[1] + U))
		], []];
	}
	let p = u(e.x + e.width / 2, e.y + e.height / 2), [m, b, E, g] = [
		u(e.x + n, e.y + r),
		u(e.x + o, e.y + i),
		u(e.x + a, e.y + s),
		u(e.x + d, e.y + c)
	], h = [
		ue(Je(O(b, p)), t),
		ue(Je(O(E, p)), t),
		ue(Je(O(g, p)), t),
		ue(Je(O(m, p)), t)
	], x = [
		Et(q(h[0], u(b[0] - l, b[1] - U)), q(h[0], b), q(h[0], b), q(h[0], u(b[0] - l, b[1] + U))),
		Et(q(h[1], u(E[0] + l, E[1] - U)), q(h[1], E), q(h[1], E), q(h[1], u(E[0] - l, E[1] - U))),
		Et(q(h[2], u(g[0] + l, g[1] + U)), q(h[2], g), q(h[2], g), q(h[2], u(g[0] + l, g[1] - U))),
		Et(q(h[3], u(m[0] - l, m[1] + U)), q(h[3], m), q(h[3], m), q(h[3], u(m[0] + l, m[1] + U)))
	];
	return [[
		A(x[0][3], x[1][0]),
		A(x[1][3], x[2][0]),
		A(x[2][3], x[3][0]),
		A(x[3][3], x[0][0])
	], x];
}
function V1(e) {
	let t = wa(e), n = new Path2D(t);
	return C1.set(e, n), n;
}
function Bm(e) {
	return C1.get(e);
}
function wa(e) {
	return Om(ae$1(e.simulatePressure ? e.points : e.points.length ? e.points.map(([r, o], i) => [
		r,
		o,
		e.pressures[i]
	]) : [[
		0,
		0,
		.5
	]], {
		simulatePressure: e.simulatePressure,
		size: e.strokeWidth * 4.25,
		thinning: .6,
		smoothing: .5,
		streamline: .5,
		easing: (r) => Math.sin(r * Math.PI / 2),
		last: !!e.lastCommittedPoint
	}));
}
function B1(e, t) {
	return [(e[0] + t[0]) / 2, (e[1] + t[1]) / 2];
}
function Om(e) {
	if (!e.length) return "";
	let t = e.length - 1;
	return e.reduce((n, r, o, i) => (o === t ? n.push(r, B1(r, i[0]), "L", i[0], "Z") : n.push(r, B1(r, i[o + 1])), n), [
		"M",
		e[0],
		"Q"
	]).join(" ").replace(_m, "$1");
}
function Vm(e) {
	let t = e.roughness, n = Math.max(e.width, e.height), r = Math.min(e.width, e.height);
	return r >= 20 && n >= 50 || r >= 15 && e.roundness && Ta(e.type) || ae(e) && n >= 50 ? t : Math.min(t / (n < 10 ? 3 : 2), 2.5);
}
function Fp(e) {
	let t = [];
	for (let n of e.childNodes) if (n.nodeType === 3) {
		let r = n.textContent?.trim();
		r && t.push({
			type: "text",
			value: r
		});
	} else if (n instanceof HTMLImageElement) {
		let r = n.getAttribute("src");
		r && r.startsWith("http") && t.push({
			type: "imageUrl",
			value: r
		});
	} else t = t.concat(Fp(n));
	return t;
}
function Jp(e) {
	return [
		Math.min(e[0][0], e[1][0]),
		Math.min(e[0][1], e[1][1]),
		Math.max(e[0][0], e[1][0]),
		Math.max(e[0][1], e[1][1])
	];
}
function s9(e, t) {
	return e[0] <= t[2] && e[2] >= t[0] && e[1] <= t[3] && e[3] >= t[1];
}
function Yp(e, t) {
	let o = Me(O(e[1], e[0]), O(t, e[0]));
	return Math.abs(o) < d9;
}
function ys(e, t) {
	return Me(O(e[1], e[0]), O(t, e[0])) < 0;
}
function Cp(e, t) {
	return Yp(e, t[0]) || Yp(e, t[1]) || (ys(e, t[0]) ? !ys(e, t[1]) : ys(e, t[1]));
}
function Vp(e, t) {
	return s9(Jp(e), Jp(t)) && Cp(e, t) && Cp(t, e);
}
function Is(e, t, n) {
	let r = Sa(t, n), o = Sa(e, n);
	return r.some((a) => o.some((s) => Vp(a, s)));
}
var import_png_chunks_extract, import_png_chunk_text, import_png_chunks_encode, import_lodash_throttle, import_es6_promise_pool, import_react, import_jsx_runtime, import_dist, p6, Ps, ft, pt, Z, Ns, W9, z9, Q9, j9, eE, Fs, tE, uo, iE, Bs, aE, sE, _s, dE, cE, lE, Os, Nt, mo, mE, bE, EE, je, gE, Mn, Tn, Ie, Un, bo, ke, Pe, Eo, Ft, Vn, Er, xE, hE, yE, IE, ho, yo, H, Hs, wE, Ze, Ci, DE, Js, Io, vE, $E, PE, FE, _E, qn, Cs, OE, AE, re, qi, Vs, qs, kt, Xi, Xs, wo, Gs, ot, Gi, KE, we, b6, HE, ks, JE, fn, YE, Zs, ki, Ws, zs, gr, Qs, E6, g6, mt, x6, js, Ro, ed, td, nd, se, To, WE, xr, Mo, Zi, hr, Je, bt, So, Bt, vo, Mr, ji, dd, Lr, Dr, Sr, ld, ng, rg, og, D6, ig, ag, ea, Ee, $o, pd, ud, Ud, sg, dg, dt, $r, cg, Dn, ta, lg, $6, Po, un, Ug, fg, pg, Wt, No, ug, mg, bg, md, zt, te, gg, _t, xg, Ot, hg, bd, yg, Ig, wg, Fo, Rg, fd, Qt, Tg, Sn, Mg, Ed, Lg, Dg, gd, tt, mn, xd, vr, kn, $g, At, Ye, Bo, _o, gt, k, hd, yd, de, Ce, P6, ae, ee, X, na, Pr, N6, xt, Id, F6, ra, Og, bn, Ne, Oo, wd, Ag, Kg, vn, ht, Rd, Td, Ko, Vg, ia, aa, Md, Zn, Ld, Ao, oa, En, Dd, B6, $n, _6, sa, Ho, da, Sd, O6, ca, ct, jt, Pn, A6, K6, H6, le, De, J6, en, Y6, C6, V6, q6, X6, Xe, he, yt, $d, R, F, G, Ux, fx, px, ux, mx, bx, Ex, gx, xx, Pd, Nd, Fd, Bd, _d, Od, yx, Nr, Ad, Kd, Hd, Ix, wx, Rx, Tx, Mx, Lx, Dx, Sx, vx, $x, Px, Nx, Fx, Bx, _x, Ox, Ax, Kx, Hx, Jx, Yx, Vx, qx, Xx, Gx, Wx, Qx, jx, eh, th, Jd, Yd, sh, dh, ch, lh, Uh, fh, ph, uh, mh, bh, Eh, gh, xh, Ih, Mh, Lh, Dh, Sh, vh, $h, Ph, Nh, Fh, _h, Oh, Ah, Kh, Hh, Jh, Yh, Ch, Vh, qh, Xh, Gh, kh, Zh, Wh, zh, Qh, jh, e4, t4, n4, r4, o4, i4, Cd, la, Ua, a4, s4, d4, c4, l4, U4, f4, p4, m4, b4, E4, g4, x4, I4, w4, R4, T4, M4, L4, D4, S4, v4, N4, F4, B4, _4, O4, A4, K4, H4, J4, Y4, C4, V4, q4, X4, G4, k4, Z4, W4, z4, Q4, j4, ty, ny, ry, oy, iy, ay, sy, dy, cy, ly, Uy, Fr, tn, Wn, Yo, Co, nn, Vo, zn, Qn, Br, fa, qo, Vd, qd, pa, ua, W6, z6, ma, Q6, jn, Xo, Gd, Qd, jd, sc, dc, lc, pc, xc, yc, b1, ne, Nn, Go, ko, Zo, f$, E1, It, g1, um, x1, h1, mm, y1, I1, _r, Wo, bm, Em, gm, w1, R1, T1, ei, xm, ba, A$, hm, Ea, ym, Im, wm, D1, Q, Rm, Tm, Y$, C$, V$, q$, ga, Mm, iP, ti, L1, xa, ha, Lm, v1, $1, P1, wt, gn, it, Kt, lP, Dm, N1, er, Sm, UP, Ia, $m, O1, A1, ri, Pm, Nm, K1, H1, J1, Y1, Fm, ni, Jo, F1, ya, vP, Fn, C1, _m, Am, NP, Km, Hm, Ta, FP, Jm, Re, Fe, nt, ze, oi, Ht, tr, Mt, ve, Lt, q1, Ma, Cm, k1, rt, X1, G1, vd, qm, xn, nr, rr, La, C, Sa, Or, Z1, W1, Xm, Hr, va, Gm, km, Zm, ii, Wm, zm, Ke, $e, ai, Rt, $a, Pa, Na, fN, Kr, z1, or, Qm, jm, eb, FN, Fa, me, tb, Ba, Q1, nb, r2, rb, ob, BN, _N, ON, ib, di, o2, ab, i2, sb, Bn, db, cb, lb, Jt, Ub, fb, a2, pb, fi, ub, mb, s2, bb, d2, j1, ir, c2, AN, e2, KN, Jr, si, pi, Eb, gb, l2, ci, li, rn, on, Ui, xb, U2, Yr, hb, yb, _a, Oa, Aa, Ka, Tb, aF, sF, Mb, dF, p2, cF, Lb, an, lF, u2, UF, fF, Ja, m2, b2, E2, Db, g2, bi, Qe, mi, Sb, sr, vb, Cr, y2, IF, x2, wF, ar, RF, Te, h2, Ya, $b, Pb, TF, MF, LF, DF, Vr, sn, K, z, Nb, qr, I2, w2, WF, Xa, dB, _n, R2, Yt, oe, qe, cB, Ra, lB, UB, fB, Fb, pB, qa, Tt, Ar, Bb, dn, gB, T2, M2, L2, S2, Ob, v2, Ab, Kb, Hb, Jb, Ct, D2, Yb, $2, qb, Xb, Vt, Dt, St, Xr, VB, qB, XB, GB, P2, qt, Gb, kb, Ga, kB, On, Zb, Wb, gi, Gr, N2, xi, zb, ZB, Za, B2, Zr, An, jb, e7, ka, _2, F2, Le, Wr, Ue, zr, hi, A2, Qr, t7, dr, Wa, O2, yi, Xt, n7, r7, o7, K2, i7, H2, a7, s7, d7, J2, Y2, c7, Qa, C2, za, V2, Ii, ja, J_, Y_, jr, eo, wi, q2, G2, Z2, es, f7, to, hO, yO, Q2, ns, p7, IO, u7, ep, tp, m7, LO, rs, os, is, b7, BO, KO, np, rp, qO, XO, E7, op, GO, Ti, g7, ip, ap, sp, dp, x7, cp, h7, y7, Up, fp, pp, no, up, I7, mp, ss, TA, ro, Us, pe, w7, R7, T7, M7, ge, Pi, fs, ps, yn, L7, D7, ls, S7, v7, gp, $7, P7, oo, $i, wp, cr, In, us, ms, N7, xp, hp, yp, Ip, Ni, F7, B7, lr, wn, _7, O7, A7, K7, Mp, H7, Rp, J7, io, Tp, Lp, $t, xe, Rn, Sp, Kn, Ur, so, gs, Dp, Y7, vp, Fi, lt, $p, C7, V7, q7, Pp, X7, G7, uK, k7, LK, Z7, DK, W7, Np, z7, Q7, SK, j7, vK, Bp, hs, e9, t9, r9, o9, i9, Op, Kp, Ap, a9, Hp, d9, uH, qp, ws, Bi, hn, mH, bH, co, ds, cs, EH, gH, c9, We, xH, l9, Xp, U9, hH, yH, _i, Mi, Gp, as, bp, Ep, IH, f9, ui, Ca, Ib, wb, at, Rb, Ha, Zp, u9, m9, Wp, Hn, Ts, Y, vt, kr, ao, kp, iJ, Oi, Va, bs, Qp, b9, e6, jp, Ms, cn, Ai, Ls, Ki, Ds, fJ, vs, t6, E9, g9, Ss, x9, h9, n6, y9, I9, r6, $s, w9, R9, T9, M9, L9, D9, S9, v9, $9, P9, N9, F9, o6, B9, _9, O9, X2, f2, Es, zp, i6, j2, Ri, s6, K9, DY, W2, xs, Hi, H9, z2, J9, SY, vY, $Y, PY, NY, FY, BY, _Y, OY, AY, KY, Y9, a6, fr, ts, ln, lo, d6, c6, Li, Di, Si, vi, X9, _p, iC;
var init_chunk_FX7ZIABN = __esmMin((() => {
	init_dist$1();
	init_chunk_SQ5PDB2P();
	init_chunk_SRAX5OIU();
	import_png_chunks_extract = /* @__PURE__ */ __toESM(require_png_chunks_extract(), 1);
	import_png_chunk_text = /* @__PURE__ */ __toESM(require_png_chunk_text(), 1);
	import_png_chunks_encode = /* @__PURE__ */ __toESM(require_png_chunks_encode(), 1);
	init_pako_esm();
	init_open_color();
	init_index_browser();
	import_lodash_throttle = /* @__PURE__ */ __toESM(require_lodash_throttle(), 1);
	import_es6_promise_pool = /* @__PURE__ */ __toESM(require_es6_promise_pool(), 1);
	init_rough();
	init_esm();
	init_generator();
	import_react = /* @__PURE__ */ __toESM(require_react(), 1);
	init_clsx_m();
	import_jsx_runtime = require_jsx_runtime();
	init_lib();
	import_dist = require_dist();
	init_math();
	init_src();
	init_dist();
	init_preload_helper();
	p6 = (e, t) => t.reduce((n, r) => (r in e && (n[r] = e[r]), n), {}), Ps = 4, ft = [
		0,
		2,
		4,
		6,
		8
	];
	pt = (e, t) => t.map((n) => open_color_default[e][n]), Z = {
		transparent: "transparent",
		black: "#1e1e1e",
		white: "#ffffff",
		gray: pt("gray", ft),
		red: pt("red", ft),
		pink: pt("pink", ft),
		grape: pt("grape", ft),
		violet: pt("violet", ft),
		blue: pt("blue", ft),
		cyan: pt("cyan", ft),
		teal: pt("teal", ft),
		green: pt("green", ft),
		yellow: pt("yellow", ft),
		orange: pt("orange", ft),
		bronze: [
			"#f8f1ee",
			"#eaddd7",
			"#d2bab0",
			"#a18072",
			"#846358"
		]
	}, Ns = p6(Z, [
		"cyan",
		"blue",
		"violet",
		"grape",
		"pink",
		"green",
		"teal",
		"yellow",
		"orange",
		"red"
	]), W9 = [
		Z.black,
		Z.red[4],
		Z.green[4],
		Z.blue[4],
		Z.yellow[4]
	], z9 = [
		Z.transparent,
		Z.red[1],
		Z.green[1],
		Z.blue[1],
		Z.yellow[1]
	], Q9 = [
		Z.white,
		"#f8f9fa",
		"#f5faff",
		"#fffce8",
		"#fdf8f6"
	], j9 = {
		transparent: Z.transparent,
		white: Z.white,
		gray: Z.gray,
		black: Z.black,
		bronze: Z.bronze,
		...Ns
	}, eE = {
		transparent: Z.transparent,
		white: Z.white,
		gray: Z.gray,
		black: Z.black,
		bronze: Z.bronze,
		...Ns
	}, Fs = (e) => [
		Z.cyan[e],
		Z.blue[e],
		Z.violet[e],
		Z.grape[e],
		Z.pink[e],
		Z.green[e],
		Z.teal[e],
		Z.yellow[e],
		Z.orange[e],
		Z.red[e]
	], tE = (e, t, n) => `#${((1 << 24) + (e << 16) + (t << 8) + n).toString(16).slice(1)}`;
	uo = /Mac|iPod|iPhone|iPad/.test(navigator.platform), iE = /^Win/.test(navigator.platform), Bs = /\b(android)\b/i.test(navigator.userAgent), aE = "netscape" in window && navigator.userAgent.indexOf("rv:") > 1 && navigator.userAgent.indexOf("Gecko") > 1, sE = !(navigator.userAgent.indexOf("Chrome") !== -1) && navigator.userAgent.indexOf("Safari") !== -1, _s = /iPad|iPhone/.test(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend" in document, dE = () => navigator.brave?.isBrave?.name === "isBrave", cE = typeof window < "u" && "ResizeObserver" in window, lE = "Excalidraw", Os = 36, Nt = Math.PI / 12, mo = {
		TEXT: "text",
		CROSSHAIR: "crosshair",
		GRABBING: "grabbing",
		GRAB: "grab",
		POINTER: "pointer",
		MOVE: "move",
		AUTO: ""
	}, mE = {
		MAIN: 0,
		WHEEL: 1,
		SECONDARY: 2,
		TOUCH: -1,
		ERASER: 5
	}, bE = {
		enabled: "all",
		disabled: "none",
		inheritFromUI: "var(--ui-pointerEvents)"
	};
	EE = {
		UNSTARTED: -1,
		ENDED: 0,
		PLAYING: 1,
		PAUSED: 2,
		BUFFERING: 3,
		CUED: 5
	}, je = {
		TEST: "test",
		DEVELOPMENT: "development"
	}, gE = {
		SHAPE_ACTIONS_MENU: "App-menu__left",
		ZOOM_ACTIONS: "zoom-actions",
		SEARCH_MENU_INPUT_WRAPPER: "layer-ui__search-inputWrapper"
	}, Mn = "Xiaolai", Tn = "Segoe UI Emoji", Ie = {
		Virgil: 1,
		Helvetica: 2,
		Cascadia: 3,
		Excalifont: 5,
		Nunito: 6,
		"Lilita One": 7,
		"Comic Shanns": 8,
		"Liberation Sans": 9
	}, Un = {
		[Mn]: 100,
		[Tn]: 1e3
	}, bo = (e) => {
		switch (e) {
			case Ie.Excalifont: return [Mn, Tn];
			default: return [Tn];
		}
	}, ke = {
		LIGHT: "light",
		DARK: "dark"
	}, Pe = {
		strokeColor: "#bbb",
		strokeWidth: 2,
		strokeStyle: "solid",
		fillStyle: "solid",
		roughness: 0,
		roundness: null,
		backgroundColor: "transparent",
		radius: 8,
		nameOffsetY: 3,
		nameColorLightTheme: "#999999",
		nameColorDarkTheme: "#7a7a7a",
		nameFontSize: 14,
		nameLineHeight: 1.25
	}, Eo = 1, Ft = Ie.Excalifont, Vn = "left";
	Er = 4, xE = 2 * Er - 1e-5, hE = "#ffffff", yE = "#1e1e1e", IE = "#a2f1a6";
	ho = 5, yo = {
		svg: "image/svg+xml",
		png: "image/png",
		jpg: "image/jpeg",
		gif: "image/gif",
		webp: "image/webp",
		bmp: "image/bmp",
		ico: "image/x-icon",
		avif: "image/avif",
		jfif: "image/jfif"
	}, H = {
		text: "text/plain",
		html: "text/html",
		json: "application/json",
		excalidraw: "application/vnd.excalidraw+json",
		excalidrawlib: "application/vnd.excalidrawlib+json",
		"excalidraw.svg": "image/svg+xml",
		"excalidraw.png": "image/png",
		binary: "application/octet-stream",
		...yo
	}, Hs = [
		H.text,
		H.html,
		...Object.values(yo)
	], wE = {
		png: "png",
		svg: "svg",
		clipboard: "clipboard"
	}, Ze = {
		excalidraw: "excalidraw",
		excalidrawClipboard: "excalidraw/clipboard",
		excalidrawLibrary: "excalidrawlib",
		excalidrawClipboardWithAPI: "excalidraw-api/clipboard"
	}, Ci = window.EXCALIDRAW_EXPORT_SOURCE || window.location.origin;
	DE = .1, Js = .1;
	Io = "invert(93%) hue-rotate(180deg)", vE = { addLibrary: "addLibrary" }, $E = { addLibrary: "addLibrary" }, PE = {
		canvasActions: {
			changeViewBackgroundColor: !0,
			clearCanvas: !0,
			export: { saveFileToDisk: !0 },
			loadScene: !0,
			saveToActiveFile: !0,
			toggleTheme: null,
			saveAsImage: !0
		},
		tools: { image: !0 }
	}, FE = 1e3, _E = 1229, qn = 2, Cs = [
		1,
		2,
		3
	], OE = 1440, AE = 4 * 1024 * 1024, re = "http://www.w3.org/2000/svg";
	qi = {
		excalidraw: 2,
		excalidrawLibrary: 2
	}, Vs = .7, qs = 11, kt = {
		TOP: "top",
		MIDDLE: "middle",
		BOTTOM: "bottom"
	}, Xi = {
		LEFT: "left",
		CENTER: "center",
		RIGHT: "right"
	}, Xs = 20, wo = .25, Gs = 32, ot = {
		LEGACY: 1,
		PROPORTIONAL_RADIUS: 2,
		ADAPTIVE_RADIUS: 3
	}, Gi = {
		architect: 0,
		artist: 1,
		cartoonist: 2
	}, KE = {
		thin: 1,
		bold: 2,
		extraBold: 4
	}, we = {
		strokeColor: Z.black,
		backgroundColor: Z.transparent,
		fillStyle: "solid",
		strokeWidth: 2,
		strokeStyle: "solid",
		roughness: Gi.artist,
		opacity: 100,
		locked: !1
	}, b6 = "library", HE = "search", ks = {
		name: "default",
		defaultTab: b6
	}, JE = new Set([
		"iframe",
		"embeddable",
		"image"
	]), fn = {
		selection: "selection",
		rectangle: "rectangle",
		diamond: "diamond",
		ellipse: "ellipse",
		arrow: "arrow",
		line: "line",
		freedraw: "freedraw",
		text: "text",
		image: "image",
		eraser: "eraser",
		hand: "hand",
		frame: "frame",
		magicframe: "magicframe",
		embeddable: "embeddable",
		laser: "laser"
	}, YE = {
		OAI_API_KEY: "excalidraw-oai-api-key",
		MERMAID_TO_EXCALIDRAW: "mermaid-to-excalidraw",
		PUBLISH_LIBRARY: "publish-library-data"
	}, Zs = "Untitled", ki = {
		generalStats: 1,
		elementProperties: 2
	}, Ws = {
		sharp: "sharp",
		round: "round",
		elbow: "elbow"
	}, zs = .3, gr = "element", Qs = Symbol.for("__test__originalId__"), E6 = ((r) => (r.ACTIVE = "active", r.AWAY = "away", r.IDLE = "idle", r))(E6 || {});
	g6 = Cs.includes(devicePixelRatio) ? devicePixelRatio : 1, mt = () => ({
		showWelcomeScreen: !1,
		theme: ke.LIGHT,
		collaborators: /* @__PURE__ */ new Map(),
		currentChartType: "bar",
		currentItemBackgroundColor: we.backgroundColor,
		currentItemEndArrowhead: "arrow",
		currentItemFillStyle: we.fillStyle,
		currentItemFontFamily: Ft,
		currentItemFontSize: 20,
		currentItemOpacity: we.opacity,
		currentItemRoughness: we.roughness,
		currentItemStartArrowhead: null,
		currentItemStrokeColor: we.strokeColor,
		currentItemRoundness: "round",
		currentItemArrowType: Ws.round,
		currentItemStrokeStyle: we.strokeStyle,
		currentItemStrokeWidth: we.strokeWidth,
		currentItemTextAlign: Vn,
		currentHoveredFontFamily: null,
		cursorButton: "up",
		activeEmbeddable: null,
		newElement: null,
		editingTextElement: null,
		editingGroupId: null,
		editingLinearElement: null,
		activeTool: {
			type: "selection",
			customType: null,
			locked: we.locked,
			lastActiveTool: null
		},
		penMode: !1,
		penDetected: !1,
		errorMessage: null,
		exportBackground: !0,
		exportScale: g6,
		exportEmbedScene: !1,
		exportWithDarkMode: !1,
		fileHandle: null,
		gridSize: 20,
		gridStep: ho,
		gridModeEnabled: !1,
		isBindingEnabled: !0,
		defaultSidebarDockedPreference: !1,
		isLoading: !1,
		isResizing: !1,
		isRotating: !1,
		lastPointerDownWith: "mouse",
		multiElement: null,
		name: null,
		contextMenu: null,
		openMenu: null,
		openPopup: null,
		openSidebar: null,
		openDialog: null,
		pasteDialog: {
			shown: !1,
			data: null
		},
		previousSelectedElementIds: {},
		resizingElement: null,
		scrolledOutside: !1,
		scrollX: 0,
		scrollY: 0,
		selectedElementIds: {},
		hoveredElementIds: {},
		selectedGroupIds: {},
		selectedElementsAreBeingDragged: !1,
		selectionElement: null,
		shouldCacheIgnoreZoom: !1,
		stats: {
			open: !1,
			panels: ki.generalStats | ki.elementProperties
		},
		startBoundElement: null,
		suggestedBindings: [],
		frameRendering: {
			enabled: !0,
			clip: !0,
			name: !0,
			outline: !0
		},
		frameToHighlight: null,
		editingFrame: null,
		elementsToHighlight: null,
		toast: null,
		viewBackgroundColor: Z.white,
		zenModeEnabled: !1,
		zoom: { value: 1 },
		viewModeEnabled: !1,
		pendingImageElementId: null,
		showHyperlinkPopup: !1,
		selectedLinearElement: null,
		snapLines: [],
		originSnapOffset: {
			x: 0,
			y: 0
		},
		objectsSnapModeEnabled: !1,
		userToFollow: null,
		followedBy: /* @__PURE__ */ new Set(),
		isCropping: !1,
		croppingElementId: null,
		searchMatches: []
	}), x6 = ((e) => e)({
		showWelcomeScreen: {
			browser: !0,
			export: !1,
			server: !1
		},
		theme: {
			browser: !0,
			export: !1,
			server: !1
		},
		collaborators: {
			browser: !1,
			export: !1,
			server: !1
		},
		currentChartType: {
			browser: !0,
			export: !1,
			server: !1
		},
		currentItemBackgroundColor: {
			browser: !0,
			export: !1,
			server: !1
		},
		currentItemEndArrowhead: {
			browser: !0,
			export: !1,
			server: !1
		},
		currentItemFillStyle: {
			browser: !0,
			export: !1,
			server: !1
		},
		currentItemFontFamily: {
			browser: !0,
			export: !1,
			server: !1
		},
		currentItemFontSize: {
			browser: !0,
			export: !1,
			server: !1
		},
		currentItemRoundness: {
			browser: !0,
			export: !1,
			server: !1
		},
		currentItemArrowType: {
			browser: !0,
			export: !1,
			server: !1
		},
		currentItemOpacity: {
			browser: !0,
			export: !1,
			server: !1
		},
		currentItemRoughness: {
			browser: !0,
			export: !1,
			server: !1
		},
		currentItemStartArrowhead: {
			browser: !0,
			export: !1,
			server: !1
		},
		currentItemStrokeColor: {
			browser: !0,
			export: !1,
			server: !1
		},
		currentItemStrokeStyle: {
			browser: !0,
			export: !1,
			server: !1
		},
		currentItemStrokeWidth: {
			browser: !0,
			export: !1,
			server: !1
		},
		currentItemTextAlign: {
			browser: !0,
			export: !1,
			server: !1
		},
		currentHoveredFontFamily: {
			browser: !1,
			export: !1,
			server: !1
		},
		cursorButton: {
			browser: !0,
			export: !1,
			server: !1
		},
		activeEmbeddable: {
			browser: !1,
			export: !1,
			server: !1
		},
		newElement: {
			browser: !1,
			export: !1,
			server: !1
		},
		editingTextElement: {
			browser: !1,
			export: !1,
			server: !1
		},
		editingGroupId: {
			browser: !0,
			export: !1,
			server: !1
		},
		editingLinearElement: {
			browser: !1,
			export: !1,
			server: !1
		},
		activeTool: {
			browser: !0,
			export: !1,
			server: !1
		},
		penMode: {
			browser: !0,
			export: !1,
			server: !1
		},
		penDetected: {
			browser: !0,
			export: !1,
			server: !1
		},
		errorMessage: {
			browser: !1,
			export: !1,
			server: !1
		},
		exportBackground: {
			browser: !0,
			export: !1,
			server: !1
		},
		exportEmbedScene: {
			browser: !0,
			export: !1,
			server: !1
		},
		exportScale: {
			browser: !0,
			export: !1,
			server: !1
		},
		exportWithDarkMode: {
			browser: !0,
			export: !1,
			server: !1
		},
		fileHandle: {
			browser: !1,
			export: !1,
			server: !1
		},
		gridSize: {
			browser: !0,
			export: !0,
			server: !0
		},
		gridStep: {
			browser: !0,
			export: !0,
			server: !0
		},
		gridModeEnabled: {
			browser: !0,
			export: !0,
			server: !0
		},
		height: {
			browser: !1,
			export: !1,
			server: !1
		},
		isBindingEnabled: {
			browser: !1,
			export: !1,
			server: !1
		},
		defaultSidebarDockedPreference: {
			browser: !0,
			export: !1,
			server: !1
		},
		isLoading: {
			browser: !1,
			export: !1,
			server: !1
		},
		isResizing: {
			browser: !1,
			export: !1,
			server: !1
		},
		isRotating: {
			browser: !1,
			export: !1,
			server: !1
		},
		lastPointerDownWith: {
			browser: !0,
			export: !1,
			server: !1
		},
		multiElement: {
			browser: !1,
			export: !1,
			server: !1
		},
		name: {
			browser: !0,
			export: !1,
			server: !1
		},
		offsetLeft: {
			browser: !1,
			export: !1,
			server: !1
		},
		offsetTop: {
			browser: !1,
			export: !1,
			server: !1
		},
		contextMenu: {
			browser: !1,
			export: !1,
			server: !1
		},
		openMenu: {
			browser: !0,
			export: !1,
			server: !1
		},
		openPopup: {
			browser: !1,
			export: !1,
			server: !1
		},
		openSidebar: {
			browser: !0,
			export: !1,
			server: !1
		},
		openDialog: {
			browser: !1,
			export: !1,
			server: !1
		},
		pasteDialog: {
			browser: !1,
			export: !1,
			server: !1
		},
		previousSelectedElementIds: {
			browser: !0,
			export: !1,
			server: !1
		},
		resizingElement: {
			browser: !1,
			export: !1,
			server: !1
		},
		scrolledOutside: {
			browser: !0,
			export: !1,
			server: !1
		},
		scrollX: {
			browser: !0,
			export: !1,
			server: !1
		},
		scrollY: {
			browser: !0,
			export: !1,
			server: !1
		},
		selectedElementIds: {
			browser: !0,
			export: !1,
			server: !1
		},
		hoveredElementIds: {
			browser: !1,
			export: !1,
			server: !1
		},
		selectedGroupIds: {
			browser: !0,
			export: !1,
			server: !1
		},
		selectedElementsAreBeingDragged: {
			browser: !1,
			export: !1,
			server: !1
		},
		selectionElement: {
			browser: !1,
			export: !1,
			server: !1
		},
		shouldCacheIgnoreZoom: {
			browser: !0,
			export: !1,
			server: !1
		},
		stats: {
			browser: !0,
			export: !1,
			server: !1
		},
		startBoundElement: {
			browser: !1,
			export: !1,
			server: !1
		},
		suggestedBindings: {
			browser: !1,
			export: !1,
			server: !1
		},
		frameRendering: {
			browser: !1,
			export: !1,
			server: !1
		},
		frameToHighlight: {
			browser: !1,
			export: !1,
			server: !1
		},
		editingFrame: {
			browser: !1,
			export: !1,
			server: !1
		},
		elementsToHighlight: {
			browser: !1,
			export: !1,
			server: !1
		},
		toast: {
			browser: !1,
			export: !1,
			server: !1
		},
		viewBackgroundColor: {
			browser: !0,
			export: !0,
			server: !0
		},
		width: {
			browser: !1,
			export: !1,
			server: !1
		},
		zenModeEnabled: {
			browser: !0,
			export: !1,
			server: !1
		},
		zoom: {
			browser: !0,
			export: !1,
			server: !1
		},
		viewModeEnabled: {
			browser: !1,
			export: !1,
			server: !1
		},
		pendingImageElementId: {
			browser: !1,
			export: !1,
			server: !1
		},
		showHyperlinkPopup: {
			browser: !1,
			export: !1,
			server: !1
		},
		selectedLinearElement: {
			browser: !0,
			export: !1,
			server: !1
		},
		snapLines: {
			browser: !1,
			export: !1,
			server: !1
		},
		originSnapOffset: {
			browser: !1,
			export: !1,
			server: !1
		},
		objectsSnapModeEnabled: {
			browser: !0,
			export: !1,
			server: !1
		},
		userToFollow: {
			browser: !1,
			export: !1,
			server: !1
		},
		followedBy: {
			browser: !1,
			export: !1,
			server: !1
		},
		isCropping: {
			browser: !1,
			export: !1,
			server: !1
		},
		croppingElementId: {
			browser: !1,
			export: !1,
			server: !1
		},
		searchMatches: {
			browser: !1,
			export: !1,
			server: !1
		}
	}), js = (e, t) => {
		let n = {};
		for (let r of Object.keys(e)) if (x6[r]?.[t]) n[r] = e[r];
		return n;
	};
	Ro = (e) => js(e, "export"), ed = (e) => js(e, "server"), td = ({ activeTool: e }) => e.type === "eraser", nd = ({ activeTool: e }) => e.type === "hand";
	se = (e, t, n) => Math.min(Math.max(e, t), n), To = (e, t, n = "round") => {
		let r = Math.pow(10, t);
		return Math[n]((e + Number.EPSILON) * r) / r;
	}, WE = (e, t, n = "round") => {
		let r = 1 / t;
		return Math[n](e * r) / r;
	}, xr = (e, t) => (e + t) / 2, Mo = (e) => typeof e == "number" && Number.isFinite(e), Zi = (e, t, n = 1e-4) => Math.abs(e - t) < n;
	hr = (e) => e < 0 ? e + 2 * Math.PI : e >= 2 * Math.PI ? e - 2 * Math.PI : e;
	Je = (e) => {
		let t = I6(e);
		return t === 0 ? Be(0, 0) : Be(e[0] / t, e[1] / t);
	};
	bt = (e, t, n) => wr(t, ue(O(e, t), n)), So = (e, t, n) => t[0] <= Math.max(e[0], n[0]) && t[0] >= Math.min(e[0], n[0]) && t[1] <= Math.max(e[1], n[1]) && t[1] >= Math.min(e[1], n[1]);
	Bt = (e, t, n = 1e-4) => {
		let r = vo(e, t);
		return r === 0 ? !0 : r < n;
	}, vo = (e, t) => {
		let [n, r] = e, [[o, i], [a, s]] = t, d = n - o, c = r - i, l = a - o, U = s - i, p = d * l + c * U, m = l * l + U * U, b = -1;
		m !== 0 && (b = p / m);
		let E, g;
		b < 0 ? (E = o, g = i) : b > 1 ? (E = a, g = s) : (E = o + b * l, g = i + b * U);
		let h = n - E, x = r - g;
		return Math.sqrt(h * h + x * x);
	};
	Mr = (e, t) => u((1 - t) ** 3 * e[0][0] + 3 * (1 - t) ** 2 * t * e[1][0] + 3 * (1 - t) * t ** 2 * e[2][0] + t ** 3 * e[3][0], (1 - t) ** 3 * e[0][1] + 3 * (1 - t) ** 2 * t * e[1][1] + 3 * (1 - t) * t ** 2 * e[2][1] + t ** 3 * e[3][1]);
	ji = (e, t) => {
		let n = e[0], r = e[1], o = !1;
		for (let i = 0, a = t.length - 1; i < t.length; a = i++) {
			let s = t[i][0], d = t[i][1], c = t[a][0], l = t[a][1];
			(d > r && l <= r || d <= r && l > r) && n < (c - s) * (r - d) / (l - d) + s && (o = !o);
		}
		return o;
	}, dd = (e, t, n = 1e-4) => {
		let r = !1;
		for (let o = 0, i = t.length - 1; o < i; o++) if (Bt(e, A(t[o], t[o + 1]), n)) {
			r = !0;
			break;
		}
		return r;
	};
	Lr = ([e, t], [n, r]) => e <= n ? t >= n : e >= n ? r >= e : !1, Dr = ([e, t], [n, r]) => {
		let o = Math.max(e, n), i = Math.min(t, r);
		return o <= i ? tt([o, i]) : null;
	}, Sr = (e, [t, n]) => e >= t && e <= n;
	ld = null;
	ng = () => {
		if (ld) return ld;
		let e = /* @__PURE__ */ new Date();
		return `${e.getFullYear()}-${`${e.getMonth() + 1}`.padStart(2, "0")}-${`${e.getDate()}`.padStart(2, "0")}-${`${e.getHours()}`.padStart(2, "0")}${`${e.getMinutes()}`.padStart(2, "0")}`;
	}, rg = (e) => e.charAt(0).toUpperCase() + e.slice(1), og = (e) => e instanceof HTMLElement && e.className.includes("ToolIcon"), D6 = (e) => e instanceof HTMLElement && e.dataset.type === "wysiwyg" || e instanceof HTMLBRElement || e instanceof HTMLInputElement || e instanceof HTMLTextAreaElement || e instanceof HTMLSelectElement, ig = (e) => D6(e) || e instanceof Element && !!e.closest("label, button"), ag = (e) => e instanceof HTMLElement && e.dataset.type === "wysiwyg" || e instanceof HTMLBRElement || e instanceof HTMLTextAreaElement || e instanceof HTMLInputElement && (e.type === "text" || e.type === "number" || e.type === "password"), ea = ({ fontFamily: e }) => {
		for (let [t, n] of Object.entries(Ie)) if (n === e) return `${t}${bo(n).map((r) => `, ${r}`).join("")}`;
		return Tn;
	}, Ee = ({ fontSize: e, fontFamily: t }) => `${e}px ${ea({ fontFamily: t })}`, $o = (e, t) => {
		let n = 0, r = null, o = (...i) => {
			r = i, clearTimeout(n), n = window.setTimeout(() => {
				r = null, e(...i);
			}, t);
		};
		return o.flush = () => {
			if (clearTimeout(n), r) {
				let i = r;
				r = null, e(...i);
			}
		}, o.cancel = () => {
			r = null, clearTimeout(n);
		}, o;
	}, pd = (e, t) => {
		let n = null, r = null, o = null, i = (s) => {
			n = window.requestAnimationFrame(() => {
				n = null, e(...s), r = null, o && (r = o, o = null, i(r));
			});
		}, a = (...s) => {
			if (c.MODE === "test") {
				e(...s);
				return;
			}
			r = s, n === null ? i(r) : t?.trailing && (o = s);
		};
		return a.flush = () => {
			n !== null && (cancelAnimationFrame(n), n = null), r && (e(...o || r), r = o = null);
		}, a.cancel = () => {
			r = o = null, n !== null && (cancelAnimationFrame(n), n = null);
		}, a;
	}, ud = (e) => 1 - Math.pow(1 - e, 4), Ud = (e, t, n) => (t - e) * ud(n) + e, sg = ({ fromValues: e, toValues: t, onStep: n, duration: r = 250, interpolateValue: o, onStart: i, onEnd: a, onCancel: s }) => {
		let d = !1, c = 0, l;
		function U(p) {
			if (d) return;
			l === void 0 && (l = p, i?.());
			let m = Math.min(p - l, r), b = ud(m / r), E = {};
			if (Object.keys(e).forEach((g) => {
				let h = g;
				E[h] = (t[h] - e[h]) * b + e[h];
			}), n(E), m < r) {
				let g = m / r, h = {};
				Object.keys(e).forEach((x) => {
					let y = x, w = e[y], I = t[y], S;
					S = o ? o(w, I, g, y) : Ud(w, I, g), S ??= Ud(w, I, g), h[y] = S;
				}), n(h), c = window.requestAnimationFrame(U);
			} else n(t), a?.();
		}
		return c = window.requestAnimationFrame(U), () => {
			s?.(), d = !0, window.cancelAnimationFrame(c);
		};
	}, dg = (e, t) => {
		if (!e.length || t < 1) return [];
		let n = 0, r = 0, o = Array(Math.ceil(e.length / t));
		for (; n < e.length;) o[r++] = e.slice(n, n += t);
		return o;
	};
	dt = (e, t) => Math.abs(e - t), $r = (e, t) => t.type === "custom" ? {
		...e.activeTool,
		type: "custom",
		customType: t.customType,
		locked: t.locked ?? e.activeTool.locked
	} : {
		...e.activeTool,
		lastActiveTool: t.lastActiveToolBeforeEraser === void 0 ? e.activeTool.lastActiveTool : t.lastActiveToolBeforeEraser,
		type: t.type,
		customType: null,
		locked: t.locked ?? e.activeTool.locked
	};
	cg = (e) => (e = e.replace(/\bAlt\b/i, "Alt").replace(/\bShift\b/i, "Shift").replace(/\b(Enter|Return)\b/i, "Enter"), uo ? e.replace(/\bCtrlOrCmd\b/gi, "Cmd").replace(/\bAlt\b/i, "Option") : e.replace(/\bCtrlOrCmd\b/gi, "Ctrl")), Dn = ({ clientX: e, clientY: t }, { zoom: n, offsetLeft: r, offsetTop: o, scrollX: i, scrollY: a }) => {
		return {
			x: (e - r) / n.value - i,
			y: (t - o) / n.value - a
		};
	}, ta = ({ sceneX: e, sceneY: t }, { zoom: n, offsetLeft: r, offsetTop: o, scrollX: i, scrollY: a }) => {
		return {
			x: (e + i) * n.value + r,
			y: (t + a) * n.value + o
		};
	}, lg = (e) => getComputedStyle(document.documentElement).getPropertyValue(`--${e}`), $6 = new RegExp(`^[^A-Za-zÀ-ÖØ-öø-ʸ̀-֐ࠀ-῿Ⰰ-﬜﷾-﹯﻽-￿]*[֑-߿יִ-﷽ﹰ-ﻼ]`), Po = (e) => $6.test(e), un = (e) => {
		let [t, n] = e;
		return {
			x: t,
			y: n
		};
	}, Ug = (e) => {
		if (e?.name === "AbortError") {
			console.warn(e);
			return;
		}
		throw e;
	}, fg = (e, t, n = 0) => {
		n < 0 && (n = e.length + n), n = Math.min(e.length, Math.max(n, 0));
		let r = n - 1;
		for (; ++r < e.length;) if (t(e[r], r, e)) return r;
		return -1;
	}, pg = (e, t, n = e.length - 1) => {
		n < 0 && (n = e.length + n), n = Math.min(e.length - 1, Math.max(n, 0));
		let r = n + 1;
		for (; --r > -1;) if (t(e[r], r, e)) return r;
		return -1;
	}, Wt = (e) => {
		let t = e.length === 5 && e.substr(4, 1) === "0", n = e.length === 9 && e.substr(7, 2) === "00";
		return t || n || e === Z.transparent;
	}, No = (e) => e.fillStyle !== "solid" || Wt(e.backgroundColor), ug = () => {
		let e, t, n = new Promise((r, o) => {
			e = r, t = o;
		});
		return n.resolve = e, n.reject = t, n;
	};
	mg = (e) => {
		let t = e.parentElement;
		for (; t;) {
			if (t === document.body) return document;
			let { overflowY: n } = window.getComputedStyle(t);
			if (t.scrollHeight > t.clientHeight && (n === "auto" || n === "scroll" || n === "overlay")) return t;
			t = t.parentElement;
		}
		return document;
	}, bg = (e) => {
		let t = e.parentElement;
		for (; t;) {
			if (t.tabIndex > -1) {
				t.focus();
				return;
			}
			t = t.parentElement;
		}
	}, md = (e) => Array.from(e).map((t) => `0${t.toString(16)}`.slice(-2)).join(""), zt = () => Ot() ? 1 : Date.now(), te = (e) => e instanceof Map ? e : e.reduce((t, n) => (t.set(typeof n == "string" ? n : n.id, n), t), /* @__PURE__ */ new Map()), gg = (e) => e.reduce((t, n, r) => (t.set(n.id, [n, r]), t), /* @__PURE__ */ new Map()), _t = (e, t) => e.reduce((n, r) => (n[t ? t(r) : String(r)] = r, n), {}), xg = (e) => e.reduce((t, n, r) => {
		let o = {
			...n,
			prev: null,
			next: null
		};
		if (r !== 0) {
			let i = t[r - 1];
			if (o.prev = i, i.next = o, r === e.length - 1) {
				let a = t[0];
				o.next = a, a.prev = o;
			}
		}
		return t.push(o), t;
	}, []), Ot = () => c.MODE === "test", hg = () => c.MODE === "development", bd = () => typeof process$1 < "u" && !0, yg = (e, t) => new CustomEvent(e, {
		detail: { nativeEvent: t },
		cancelable: !0
	}), Ig = (e, t) => {
		let n = !1;
		for (let r in t) {
			let o = t[r];
			if (typeof o < "u") {
				if (e[r] === o && (typeof o != "object" || o === null)) continue;
				n = !0;
			}
		}
		return n ? {
			...e,
			...t
		} : e;
	};
	wg = () => {
		try {
			return window.self === window.top ? "top" : "iframe";
		} catch {
			return "iframe";
		}
	};
	Fo = (e) => !!e && typeof e == "object" && "then" in e && "catch" in e && "finally" in e, Rg = (e) => {
		let t = e?.querySelectorAll("button, a, input, select, textarea, div[tabindex], label[tabindex]");
		return t ? Array.from(t).filter((n) => n.tabIndex > -1 && !n.disabled) : [];
	}, fd = (e, t) => Array.isArray(e) && Array.isArray(t) && e.length === 0 && t.length === 0 ? !0 : e === t, Qt = (e, t, n, r = !1) => {
		let o = Object.keys(e), i = Object.keys(t);
		if (o.length !== i.length) return r && console.warn("%cisShallowEqual: objects don't have same properties ->", "color: #8B4000", e, t), !1;
		if (n && Array.isArray(n)) {
			for (let a of n) if (!(e[a] === t[a] || fd(e[a], t[a]))) return r && console.warn(`%cisShallowEqual: ${a} not equal ->`, "color: #8B4000", e[a], t[a]), !1;
			return !0;
		}
		return o.every((a) => {
			let s = n?.[a], d = s ? s(e[a], t[a]) : e[a] === t[a] || fd(e[a], t[a]);
			return !d && r && console.warn(`%cisShallowEqual: ${a} not equal ->`, "color: #8B4000", e[a], t[a]), d;
		});
	}, Tg = (e, t, { checkForDefaultPrevented: n = !0 } = {}) => function(o) {
		if (e?.(o), !n || !o?.defaultPrevented) return t?.(o);
	}, Sn = (e, t, n) => {
		if (!t) return e;
		if (n) return console.error(t), e;
		throw new Error(t);
	};
	Mg = (e) => {
		let t, n, r = function(o) {
			let i = Object.entries(o);
			if (t) {
				let s = !0;
				for (let [d, c] of i) if (t.get(d) !== c) {
					s = !1;
					break;
				}
				if (s) return n;
			}
			let a = e(o);
			return t = new Map(i), n = a, a;
		};
		return r.clear = () => {
			t = void 0, n = void 0;
		}, r;
	}, Ed = (e, t) => e instanceof Set || e instanceof Map ? e.has(t) : "includes" in e ? e.includes(t) : e.hasOwnProperty(t), Lg = (e) => JSON.parse(JSON.stringify(e)), Dg = (e, t) => Qt(e, t) ? e : t;
	gd = (e) => e.replace(/\r?\n|\r/g, `
`), tt = (e) => e, mn = async (e, ...t) => new Promise((n) => {
		n(e(...t));
	}), xd = (...e) => Math.max(...e.map((t) => t ? 1 : 0)) > 0;
	vr = class {
		constructor(t, n) {
			i$1(this, "pool");
			i$1(this, "entries", {});
			this.pool = new import_es6_promise_pool.default(t, n);
		}
		all() {
			let t = (n) => {
				if (n.data.result) {
					let [r, o] = n.data.result;
					this.entries[r] = o;
				}
			};
			return this.pool.addEventListener("fulfilled", t), this.pool.start().then(() => (setTimeout(() => {
				this.pool.removeEventListener("fulfilled", t);
			}), Object.values(this.entries)));
		}
	}, kn = (e) => e.replace(/"/g, "&quot;"), $g = (e) => Array.isArray(e) ? e : [e];
	At = (e) => !!e && e.type === "image" && !!e.fileId, Ye = (e) => !!e && e.type === "image", Bo = (e) => !!e && e.type === "embeddable", _o = (e) => !!e && e.type === "iframe", gt = (e) => !!e && (e.type === "iframe" || e.type === "embeddable"), k = (e) => e != null && e.type === "text", hd = (e) => e != null && e.type === "frame", yd = (e) => e != null && e.type === "magicframe", de = (e) => e != null && (e.type === "frame" || e.type === "magicframe"), Ce = (e) => e != null && P6(e.type), P6 = (e) => e === "freedraw", ae = (e) => e != null && na(e.type), ee = (e) => e != null && e.type === "arrow", X = (e) => ee(e) && e.elbowed, na = (e) => e === "arrow" || e === "line", Pr = (e, t = !0) => e != null && (!e.locked || t === !0) && N6(e.type), N6 = (e) => e === "arrow", xt = (e, t = !0) => e != null && (!e.locked || t === !0) && (e.type === "rectangle" || e.type === "diamond" || e.type === "ellipse" || e.type === "image" || e.type === "iframe" || e.type === "embeddable" || e.type === "frame" || e.type === "magicframe" || e.type === "text" && !e.containerId), Id = (e) => e != null && (e.type === "rectangle" || e.type === "diamond" || e.type === "image" || e.type === "iframe" || e.type === "embeddable" || e.type === "frame" || e.type === "magicframe" || e.type === "text" && !e.containerId);
	F6 = (e, t = !0) => e != null && (!e.locked || t === !0) && (e.type === "rectangle" || e.type === "diamond" || e.type === "ellipse" || ee(e)), ra = (e) => {
		let t = e?.type;
		if (!t) return !1;
		switch (t) {
			case "text":
			case "diamond":
			case "rectangle":
			case "iframe":
			case "embeddable":
			case "ellipse":
			case "arrow":
			case "freedraw":
			case "line":
			case "frame":
			case "magicframe":
			case "image":
			case "selection": return !0;
			default: return Sn(t, null), !1;
		}
	}, Og = (e) => e.type === "rectangle" || e.type === "ellipse" || e.type === "diamond", bn = (e) => F6(e) && !!e.boundElements?.some(({ type: t }) => t === "text"), Ne = (e) => e !== null && "containerId" in e && e.containerId !== null && k(e), Oo = (e) => e === "rectangle" || e === "embeddable" || e === "iframe" || e === "image", wd = (e) => e === "line" || e === "arrow" || e === "diamond", Ag = (e, t) => !!((e === ot.ADAPTIVE_RADIUS || e === ot.LEGACY) && Oo(t.type) || e === ot.PROPORTIONAL_RADIUS && wd(t.type)), Kg = (e) => wd(e.type) ? { type: ot.PROPORTIONAL_RADIUS } : Oo(e.type) ? { type: ot.ADAPTIVE_RADIUS } : null, vn = (e) => Object.hasOwn(e, "fixedPoint") && e.fixedPoint != null;
	ht = (e, t, n) => {
		let r = e.split(`
`).map((s) => s || " ").join(`
`), i = B6(r, parseFloat(t), n);
		return {
			width: Dd(r, t),
			height: i
		};
	}, Rd = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".toLocaleUpperCase(), Td = (e, t) => {
		let n = _6(e);
		return n === 0 ? ht(Rd.split("").join(`
`), e, t).width + 10 : n + 10;
	}, Ko = (e, t) => ht("", e, t).width + 10, Vg = () => Dd(Rd, Ee({
		fontSize: 20,
		fontFamily: Ft
	})) > 0, ia = (e) => gd(e).replace(/\t/g, "        "), aa = (e) => ia(e).split(`
`), Md = (e) => {
		let t = aa(e.text).length;
		return e.height / t / e.fontSize;
	}, Zn = (e, t) => e * t, Ld = (e, t) => Zn(e, t) + 10, oa = class {
		constructor() {
			i$1(this, "canvas");
			this.canvas = document.createElement("canvas");
		}
		getLineWidth(t, n) {
			let r = this.canvas.getContext("2d");
			r.font = n;
			let i = r.measureText(t).width;
			return Ot() ? i * 10 : i;
		}
	}, En = (e, t) => (Ao || (Ao = new oa()), Ao.getLineWidth(e, t)), Dd = (e, t) => {
		let n = aa(e), r = 0;
		return n.forEach((o) => {
			r = Math.max(r, En(o, t));
		}), r;
	}, B6 = (e, t, n) => {
		let r = aa(e).length;
		return Zn(t, n) * r;
	}, $n = (() => {
		let e = {};
		return {
			calculate: (o, i) => {
				let a = o.charCodeAt(0);
				if (e[i] || (e[i] = []), !e[i][a]) {
					let s = En(o, i);
					e[i][a] = s;
				}
				return e[i][a];
			},
			getCache: (o) => e[o],
			clearCache: (o) => {
				e[o] = [];
			}
		};
	})();
	_6 = (e) => {
		let t = $n.getCache(e);
		if (!t) return 0;
		let n = t.filter((r) => r !== void 0);
		return Math.max(...n);
	};
	Sd = (e) => (sa || (sa = le.class(...Object.values(jt))), sa.test(e)), O6 = () => {
		if (!Ho) try {
			Ho = K6();
		} catch {
			Ho = A6();
		}
		return Ho;
	}, ca = () => (da || (da = H6()), da), ct = {
		WHITESPACE: /\s/u,
		HYPHEN: /-/u,
		OPENING: /<\(\[\{/u,
		CLOSING: />\)\]\}.,:;!\?…\//u
	}, jt = {
		CHAR: /\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}｀＇＾〃〰〆＃＆＊＋－ー／＼＝｜￤〒￢￣/u,
		OPENING: /（［｛〈《｟｢「『【〖〔〘〚＜〝/u,
		CLOSING: /）］｝〉》｠｣」』】〗〕〙〛＞。．，、〟‥？！：；・〜〞/u,
		CURRENCY: /￥￦￡￠＄/u
	}, Pn = {
		FLAG: /\p{RI}\p{RI}/u,
		JOINER: /(?:\p{Emoji_Modifier}|\uFE0F\u20E3?|[\u{E0020}-\u{E007E}]+\u{E007F})?/u,
		ZWJ: /\u200D/u,
		ANY: /[\p{Emoji}]/u,
		MOST: /[\p{Extended_Pictographic}\p{Emoji_Presentation}]/u
	}, A6 = () => le.or(ca(), De.On(ct.HYPHEN, ct.WHITESPACE, jt.CHAR)), K6 = () => le.or(ca(), De.Before(ct.WHITESPACE).Build(), De.After(ct.WHITESPACE, ct.HYPHEN).Build(), De.Before(jt.CHAR, jt.CURRENCY).NotPrecededBy(ct.OPENING, jt.OPENING).Build(), De.After(jt.CHAR).NotFollowedBy(ct.HYPHEN, ct.CLOSING, jt.CLOSING).Build(), De.BeforeMany(jt.OPENING).NotPrecededBy(ct.OPENING).Build(), De.AfterMany(jt.CLOSING).NotFollowedBy(ct.CLOSING).Build(), De.AfterMany(ct.CLOSING).FollowedBy(ct.OPENING).Build()), H6 = () => le.group(le.or(Pn.FLAG, le.and(Pn.MOST, Pn.JOINER, le.build(`(?:${Pn.ZWJ.source}(?:${Pn.FLAG.source}|${Pn.ANY.source}${Pn.JOINER.source}))*`)))), le = {
		build: (e) => new RegExp(e, "u"),
		join: (...e) => e.map((t) => t.source).join(""),
		and: (...e) => le.build(le.join(...e)),
		or: (...e) => le.build(e.map((t) => t.source).join("|")),
		group: (...e) => le.build(`(${le.join(...e)})`),
		class: (...e) => le.build(`[${le.join(...e)}]`)
	}, De = {
		On: (...e) => {
			let t = le.join(...e);
			return le.build(`([${t}])`);
		},
		Before: (...e) => {
			let t = le.join(...e), n = () => le.build(`(?=[${t}])`);
			return De.Chain(n);
		},
		After: (...e) => {
			let t = le.join(...e), n = () => le.build(`(?<=[${t}])`);
			return De.Chain(n);
		},
		BeforeMany: (...e) => {
			let t = le.join(...e), n = () => le.build(`(?<![${t}])(?=[${t}])`);
			return De.Chain(n);
		},
		AfterMany: (...e) => {
			let t = le.join(...e), n = () => le.build(`(?<=[${t}])(?![${t}])`);
			return De.Chain(n);
		},
		NotBefore: (...e) => {
			let t = le.join(...e), n = () => le.build(`(?![${t}])`);
			return De.Chain(n);
		},
		NotAfter: (...e) => {
			let t = le.join(...e), n = () => le.build(`(?<![${t}])`);
			return De.Chain(n);
		},
		Chain: (e) => ({
			Build: e,
			PreceededBy: (...t) => {
				let n = e(), r = De.After(...t).Build(), o = () => le.and(r, n);
				return De.Chain(o);
			},
			FollowedBy: (...t) => {
				let n = e(), r = De.Before(...t).Build(), o = () => le.and(n, r);
				return De.Chain(o);
			},
			NotPrecededBy: (...t) => {
				let n = e(), r = De.NotAfter(...t).Build(), o = () => le.and(r, n);
				return De.Chain(o);
			},
			NotFollowedBy: (...t) => {
				let n = e(), r = De.NotBefore(...t).Build(), o = () => le.and(n, r);
				return De.Chain(o);
			}
		})
	}, J6 = (e) => {
		let t = O6();
		return e.normalize("NFC").split(t).filter(Boolean);
	}, en = (e, t, n) => {
		if (!Number.isFinite(n) || n < 0) return e;
		let r = [], o = e.split(`
`);
		for (let i of o) {
			if (En(i, t) <= n) {
				r.push(i);
				continue;
			}
			let s = Y6(i, t, n);
			r.push(...s);
		}
		return r.join(`
`);
	}, Y6 = (e, t, n) => {
		let r = [], i = J6(e)[Symbol.iterator](), a = "", s = 0, d = i.next();
		for (; !d.done;) {
			let c = d.value, l = a + c, U = q6(c) ? s + $n.calculate(c, t) : En(l, t);
			if (/\s/.test(c) || U <= n) {
				a = l, s = U, d = i.next();
				continue;
			}
			if (a) r.push(a.trimEnd()), a = "", s = 0;
			else {
				let p = C6(c, t, n), m = p[p.length - 1] ?? "", b = p.slice(0, -1);
				r.push(...b), a = m, s = En(m, t), d = i.next();
			}
		}
		if (a) {
			let c = V6(a, t, n);
			r.push(c);
		}
		return r;
	}, C6 = (e, t, n) => {
		if (ca().test(e)) return [e];
		X6(e);
		let r = [], o = Array.from(e), i = "", a = 0;
		for (let s of o) {
			let d = $n.calculate(s, t), c = a + d;
			if (c <= n) {
				i = i + s, a = c;
				continue;
			}
			i && r.push(i), i = s, a = d;
		}
		return i && r.push(i), r;
	}, V6 = (e, t, n) => {
		if (!(En(e, t) > n)) return e;
		let [, o, i] = e.match(/^(.+?)(\s+)$/) ?? [
			e,
			e.trimEnd(),
			""
		], a = En(o, t);
		for (let s of Array.from(i)) {
			let d = $n.calculate(s, t), c = a + d;
			if (c > n) break;
			o = o + s, a = c;
		}
		return o;
	}, q6 = (e) => e.codePointAt(0) !== void 0 && e.codePointAt(1) === void 0, X6 = (e) => {
		if ((c.MODE === je.TEST || c.DEV) && /\s/.test(e)) throw new Error("Word should not contain any whitespaces!");
	};
	Xe = class Xe {};
	i$1(Xe, "rg", new RoughGenerator()), i$1(Xe, "cache", /* @__PURE__ */ new WeakMap()), i$1(Xe, "get", (t) => Xe.cache.get(t)), i$1(Xe, "set", (t, n) => Xe.cache.set(t, n)), i$1(Xe, "delete", (t) => Xe.cache.delete(t)), i$1(Xe, "destroy", () => {
		Xe.cache = /* @__PURE__ */ new WeakMap();
	}), i$1(Xe, "generateElementShape", (t, n) => {
		let r = n?.isExporting ? void 0 : Xe.get(t);
		if (r !== void 0) return r;
		Jo.delete(t);
		let o = vd(t, Xe.rg, n || {
			isExporting: !1,
			canvasBackgroundColor: Z.white,
			embedsValidationStatus: null
		});
		return Xe.cache.set(t, o), o;
	});
	he = Xe;
	yt = (e) => "var(--icon-fill-color)", $d = (e) => e === ke.LIGHT ? open_color_default.white : "#1e1e1e", R = (e, t = 512) => {
		let { width: n = 512, height: r = n, mirror: o, style: i, ...a } = typeof t == "number" ? { width: t } : t;
		return (0, import_jsx_runtime.jsx)("svg", {
			"aria-hidden": "true",
			focusable: "false",
			role: "img",
			viewBox: `0 0 ${n} ${r}`,
			className: clsx_m_default({ "rtl-mirror": o }),
			style: i,
			...a,
			children: typeof e == "string" ? (0, import_jsx_runtime.jsx)("path", {
				fill: "currentColor",
				d: e
			}) : e
		});
	}, F = {
		width: 24,
		height: 24,
		fill: "none",
		strokeWidth: 2,
		stroke: "currentColor",
		strokeLinecap: "round",
		strokeLinejoin: "round"
	}, G = {
		width: 20,
		height: 20,
		fill: "none",
		stroke: "currentColor",
		strokeLinecap: "round",
		strokeLinejoin: "round"
	};
	R((0, import_jsx_runtime.jsxs)("g", {
		strokeWidth: "1.5",
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				stroke: "none",
				d: "M0 0h24v24H0z",
				fill: "none"
			}),
			(0, import_jsx_runtime.jsx)("rect", {
				x: 3,
				y: 8,
				width: 18,
				height: 4,
				rx: 1
			}),
			(0, import_jsx_runtime.jsx)("line", {
				x1: 12,
				y1: 8,
				x2: 12,
				y2: 21
			}),
			(0, import_jsx_runtime.jsx)("path", { d: "M19 12v7a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-7" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M7.5 8a2.5 2.5 0 0 1 0 -5a4.8 8 0 0 1 4.5 5a4.8 8 0 0 1 4.5 -5a2.5 2.5 0 0 1 0 5" })
		]
	}), F);
	Ux = R((0, import_jsx_runtime.jsxs)("g", {
		strokeWidth: "1.25",
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				stroke: "none",
				d: "M0 0h24v24H0z",
				fill: "none"
			}),
			(0, import_jsx_runtime.jsx)("path", { d: "M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" }),
			(0, import_jsx_runtime.jsx)("line", {
				x1: "3",
				y1: "6",
				x2: "3",
				y2: "19"
			}),
			(0, import_jsx_runtime.jsx)("line", {
				x1: "12",
				y1: "6",
				x2: "12",
				y2: "19"
			}),
			(0, import_jsx_runtime.jsx)("line", {
				x1: "21",
				y1: "6",
				x2: "21",
				y2: "19"
			})
		]
	}), F), fx = R((0, import_jsx_runtime.jsxs)("svg", {
		strokeWidth: "1.5",
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				stroke: "none",
				d: "M0 0h24v24H0z",
				fill: "none"
			}),
			(0, import_jsx_runtime.jsx)("line", {
				x1: "12",
				y1: "5",
				x2: "12",
				y2: "19"
			}),
			(0, import_jsx_runtime.jsx)("line", {
				x1: "5",
				y1: "12",
				x2: "19",
				y2: "12"
			})
		]
	}), F), px = R((0, import_jsx_runtime.jsxs)("g", {
		strokeWidth: "1.5",
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				stroke: "none",
				d: "M0 0h24v24H0z",
				fill: "none"
			}),
			(0, import_jsx_runtime.jsx)("circle", {
				cx: "12",
				cy: "12",
				r: "1"
			}),
			(0, import_jsx_runtime.jsx)("circle", {
				cx: "12",
				cy: "19",
				r: "1"
			}),
			(0, import_jsx_runtime.jsx)("circle", {
				cx: "12",
				cy: "5",
				r: "1"
			})
		]
	}), F), ux = R((0, import_jsx_runtime.jsxs)("svg", {
		strokeWidth: "1.5",
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				stroke: "none",
				d: "M0 0h24v24H0z",
				fill: "none"
			}),
			(0, import_jsx_runtime.jsx)("path", { d: "M9 4v6l-2 4v2h10v-2l-2 -4v-6" }),
			(0, import_jsx_runtime.jsx)("line", {
				x1: "12",
				y1: "16",
				x2: "12",
				y2: "21"
			}),
			(0, import_jsx_runtime.jsx)("line", {
				x1: "8",
				y1: "4",
				x2: "16",
				y2: "4"
			})
		]
	}), F), mx = R((0, import_jsx_runtime.jsxs)("g", { children: [
		(0, import_jsx_runtime.jsx)("path", {
			d: "M13.542 8.542H6.458a2.5 2.5 0 0 0-2.5 2.5v3.75a2.5 2.5 0 0 0 2.5 2.5h7.084a2.5 2.5 0 0 0 2.5-2.5v-3.75a2.5 2.5 0 0 0-2.5-2.5Z",
			stroke: "currentColor",
			strokeWidth: "1.25"
		}),
		(0, import_jsx_runtime.jsx)("path", {
			d: "M10 13.958a1.042 1.042 0 1 0 0-2.083 1.042 1.042 0 0 0 0 2.083Z",
			stroke: "currentColor",
			strokeWidth: "1.25"
		}),
		(0, import_jsx_runtime.jsx)("mask", {
			id: "UnlockedIcon",
			style: { maskType: "alpha" },
			maskUnits: "userSpaceOnUse",
			x: 6,
			y: 1,
			width: 9,
			height: 9,
			children: (0, import_jsx_runtime.jsx)("path", {
				stroke: "none",
				d: "M6.399 9.561V5.175c0-.93.401-1.823 1.116-2.48a3.981 3.981 0 0 1 2.693-1.028c1.01 0 1.98.37 2.694 1.027.715.658 1.116 1.55 1.116 2.481",
				fill: "#fff"
			})
		}),
		(0, import_jsx_runtime.jsx)("g", {
			mask: "url(#UnlockedIcon)",
			children: (0, import_jsx_runtime.jsx)("path", {
				stroke: "none",
				d: "M5.149 9.561v1.25h2.5v-1.25h-2.5Zm5.06-7.894V.417v1.25Zm2.559 3.508v1.25h2.5v-1.25h-2.5ZM7.648 8.51V5.175h-2.5V8.51h2.5Zm0-3.334c0-.564.243-1.128.713-1.561L6.668 1.775c-.959.883-1.52 2.104-1.52 3.4h2.5Zm.713-1.561a2.732 2.732 0 0 1 1.847-.697v-2.5c-1.31 0-2.585.478-3.54 1.358L8.36 3.614Zm1.847-.697c.71 0 1.374.26 1.847.697l1.694-1.839a5.231 5.231 0 0 0-3.54-1.358v2.5Zm1.847.697c.47.433.713.997.713 1.561h2.5c0-1.296-.56-2.517-1.52-3.4l-1.693 1.839Z",
				fill: "currentColor"
			})
		})
	] }), G), bx = R((0, import_jsx_runtime.jsxs)("g", {
		strokeWidth: "1.25",
		children: [
			(0, import_jsx_runtime.jsx)("path", { d: "M13.542 8.542H6.458a2.5 2.5 0 0 0-2.5 2.5v3.75a2.5 2.5 0 0 0 2.5 2.5h7.084a2.5 2.5 0 0 0 2.5-2.5v-3.75a2.5 2.5 0 0 0-2.5-2.5Z" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M10 13.958a1.042 1.042 0 1 0 0-2.083 1.042 1.042 0 0 0 0 2.083Z" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M6.667 8.333V5.417C6.667 3.806 8.159 2.5 10 2.5c1.841 0 3.333 1.306 3.333 2.917v2.916" })
		]
	}), G), Ex = R((0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		(0, import_jsx_runtime.jsx)("path", {
			d: "M38.5 83.5c-14-2-17.833-10.473-21-22.5C14.333 48.984 12 22 12 12.5",
			stroke: "currentColor",
			strokeWidth: 2,
			strokeLinecap: "round"
		}),
		(0, import_jsx_runtime.jsx)("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "m12.005 10.478 7.905 14.423L6 25.75l6.005-15.273Z",
			fill: "currentColor"
		}),
		(0, import_jsx_runtime.jsx)("path", {
			d: "M12.005 10.478c1.92 3.495 3.838 7 7.905 14.423m-7.905-14.423c3.11 5.683 6.23 11.368 7.905 14.423m0 0c-3.68.226-7.35.455-13.91.85m13.91-.85c-5.279.33-10.566.647-13.91.85m0 0c1.936-4.931 3.882-9.86 6.005-15.273M6 25.75c2.069-5.257 4.135-10.505 6.005-15.272",
			stroke: "currentColor",
			strokeWidth: 2,
			strokeLinecap: "round"
		})
	] }), {
		width: 41,
		height: 94,
		fill: "none"
	}), gx = R((0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		(0, import_jsx_runtime.jsx)("path", {
			d: "M18.026 1.232c-5.268 13.125-5.548 33.555 3.285 42.311 8.823 8.75 33.31 12.304 42.422 13.523",
			stroke: "currentColor",
			strokeWidth: 2,
			strokeLinecap: "round"
		}),
		(0, import_jsx_runtime.jsx)("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "m72.181 59.247-13.058-10-2.948 13.62 16.006-3.62Z",
			fill: "currentColor"
		}),
		(0, import_jsx_runtime.jsx)("path", {
			d: "M72.181 59.247c-3.163-2.429-6.337-4.856-13.058-10m13.058 10c-5.145-3.936-10.292-7.882-13.058-10m0 0c-.78 3.603-1.563 7.196-2.948 13.62m2.948-13.62c-1.126 5.168-2.24 10.346-2.948 13.62m0 0c5.168-1.166 10.334-2.343 16.006-3.62m-16.006 3.62c5.51-1.248 11.01-2.495 16.006-3.62",
			stroke: "currentColor",
			strokeWidth: 2,
			strokeLinecap: "round"
		})
	] }), {
		width: 85,
		height: 71,
		fill: "none"
	}), xx = R((0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		(0, import_jsx_runtime.jsx)("path", {
			d: "M1 77c14-2 31.833-11.973 35-24 3.167-12.016-6-35-9.5-43.5",
			stroke: "currentColor",
			strokeWidth: 2,
			strokeLinecap: "round"
		}),
		(0, import_jsx_runtime.jsx)("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "m24.165 1.093-2.132 16.309 13.27-4.258-11.138-12.05Z",
			fill: "currentColor"
		}),
		(0, import_jsx_runtime.jsx)("path", {
			d: "M24.165 1.093c-.522 3.953-1.037 7.916-2.132 16.309m2.131-16.309c-.835 6.424-1.68 12.854-2.13 16.308m0 0c3.51-1.125 7.013-2.243 13.27-4.257m-13.27 4.257c5.038-1.608 10.08-3.232 13.27-4.257m0 0c-3.595-3.892-7.197-7.777-11.14-12.05m11.14 12.05c-3.837-4.148-7.667-8.287-11.14-12.05",
			stroke: "currentColor",
			strokeWidth: 2,
			strokeLinecap: "round"
		})
	] }), {
		width: 38,
		height: 78,
		fill: "none"
	});
	R((0, import_jsx_runtime.jsx)("g", {
		fill: "currentColor",
		children: (0, import_jsx_runtime.jsx)("path", {
			d: "M39.9 32.889a.326.326 0 0 0-.279-.056c-2.094-3.083-4.774-6-7.343-8.833l-.419-.472a.212.212 0 0 0-.056-.139.586.586 0 0 0-.167-.111l-.084-.083-.056-.056c-.084-.167-.28-.278-.475-.167-.782.39-1.507.973-2.206 1.528-.92.722-1.842 1.445-2.708 2.25a8.405 8.405 0 0 0-.977 1.028c-.14.194-.028.361.14.444-.615.611-1.23 1.223-1.843 1.861a.315.315 0 0 0-.084.223c0 .083.056.166.111.194l1.09.833v.028c1.535 1.528 4.244 3.611 7.12 5.861.418.334.865.667 1.284 1 .195.223.39.473.558.695.084.11.28.139.391.055.056.056.14.111.196.167a.398.398 0 0 0 .167.056.255.255 0 0 0 .224-.111.394.394 0 0 0 .055-.167c.029 0 .028.028.056.028a.318.318 0 0 0 .224-.084l5.082-5.528a.309.309 0 0 0 0-.444Zm-14.63-1.917a.485.485 0 0 0 .111.14c.586.5 1.2 1 1.843 1.555l-2.569-1.945-.251-.166c-.056-.028-.112-.084-.168-.111l-.195-.167.056-.056.055-.055.112-.111c.866-.861 2.346-2.306 3.1-3.028-.81.805-2.43 3.167-2.095 3.944Zm8.767 6.89-2.122-1.612a44.713 44.713 0 0 0-2.625-2.5c1.145.861 2.122 1.611 2.262 1.75 1.117.972 1.06.806 1.815 1.445l.921.666a1.06 1.06 0 0 1-.251.25Zm.558.416-.056-.028c.084-.055.168-.111.252-.194l-.196.222ZM1.089 5.75c.055.361.14.722.195 1.056.335 1.833.67 3.5 1.284 4.75l.252.944c.084.361.223.806.363.917 1.424 1.25 3.602 3.11 5.947 4.889a.295.295 0 0 0 .363 0s0 .027.028.027a.254.254 0 0 0 .196.084.318.318 0 0 0 .223-.084c2.988-3.305 5.221-6.027 6.813-8.305.112-.111.14-.278.14-.417.111-.111.195-.25.307-.333.111-.111.111-.306 0-.39l-.028-.027c0-.055-.028-.139-.084-.167-.698-.666-1.2-1.138-1.731-1.638-.922-.862-1.871-1.75-3.881-3.75l-.028-.028c-.028-.028-.056-.056-.112-.056-.558-.194-1.703-.389-3.127-.639C6.087 2.223 3.21 1.723.614.944c0 0-.168 0-.196.028l-.083.084c-.028.027-.056.055-.224.11h.056-.056c.028.167.028.278.084.473 0 .055.112.5.112.555l.782 3.556Zm15.496 3.278-.335-.334c.084.112.196.195.335.334Zm-3.546 4.666-.056.056c0-.028.028-.056.056-.056Zm-2.038-10c.168.167.866.834 1.033.973-.726-.334-2.54-1.167-3.379-1.445.838.167 1.983.334 2.346.472ZM1.424 2.306c.419.722.754 3.222 1.089 5.666-.196-.778-.335-1.555-.503-2.278-.251-1.277-.503-2.416-.838-3.416.056 0 .14 0 .252.028Zm-.168-.584c-.112 0-.223-.028-.307-.028 0-.027 0-.055-.028-.055.14 0 .223.028.335.083Zm-1.089.222c0-.027 0-.027 0 0ZM39.453 1.333c.028-.11-.558-.61-.363-.639.42-.027.42-.666 0-.666-.558.028-1.144.166-1.675.25-.977.194-1.982.389-2.96.61-2.205.473-4.383.973-6.561 1.557-.67.194-1.424.333-2.066.666-.224.111-.196.333-.084.472-.056.028-.084.028-.14.056-.195.028-.363.056-.558.083-.168.028-.252.167-.224.334 0 .027.028.083.028.11-1.173 1.556-2.485 3.195-3.909 4.945-1.396 1.611-2.876 3.306-4.356 5.056-4.719 5.5-10.052 11.75-15.943 17.25a.268.268 0 0 0 0 .389c.028.027.056.055.084.055-.084.084-.168.14-.252.222-.056.056-.084.111-.084.167a.605.605 0 0 0-.111.139c-.112.111-.112.305.028.389.111.11.307.11.39-.028.029-.028.029-.056.056-.056a.44.44 0 0 1 .615 0c.335.362.67.723.977 1.028l-.698-.583c-.112-.111-.307-.083-.39.028-.113.11-.085.305.027.389l7.427 6.194c.056.056.112.056.196.056s.14-.028.195-.084l.168-.166c.028.027.083.027.111.027.084 0 .14-.027.196-.083 10.052-10.055 18.15-17.639 27.42-24.417.083-.055.111-.166.111-.25.112 0 .196-.083.251-.194 1.704-5.194 2.039-9.806 2.15-12.083v-.028c0-.028.028-.056.028-.083.028-.056.028-.084.028-.084a1.626 1.626 0 0 0-.111-1.028ZM21.472 9.5c.446-.5.893-1.028 1.34-1.5-2.876 3.778-7.65 9.583-14.408 16.5 4.607-5.083 9.242-10.333 13.068-15ZM5.193 35.778h.084-.084Zm3.462 3.194c-.027-.028-.027-.028 0-.028v.028Zm4.16-3.583c.224-.25.448-.472.699-.722 0 0 0 .027.028.027-.252.223-.475.445-.726.695Zm1.146-1.111c.14-.14.279-.334.446-.5l.028-.028c1.648-1.694 3.351-3.389 5.082-5.111l.028-.028c.419-.333.921-.694 1.368-1.028a379.003 379.003 0 0 0-6.952 6.695ZM24.794 6.472c-.921 1.195-1.954 2.778-2.82 4.028-2.736 3.944-11.532 13.583-11.727 13.75a1976.983 1976.983 0 0 1-8.042 7.639l-.167.167c-.14-.167-.14-.417.028-.556C14.49 19.861 22.03 10.167 25.074 5.917c-.084.194-.14.36-.28.555Zm4.83 5.695c-1.116-.64-1.646-1.64-1.34-2.611l.084-.334c.028-.083.084-.194.14-.277.307-.5.754-.917 1.257-1.167.027 0 .055 0 .083-.028-.028-.056-.028-.139-.028-.222.028-.167.14-.278.335-.278.335 0 1.369.306 1.76.639.111.083.223.194.335.305.14.167.363.445.474.667.056.028.112.306.196.445.056.222.111.472.084.694-.028.028 0 .194-.028.194a2.668 2.668 0 0 1-.363 1.028c-.028.028-.028.056-.056.084l-.028.027c-.14.223-.335.417-.53.556-.643.444-1.369.583-2.095.389 0 0-.195-.084-.28-.111Zm8.154-.834a39.098 39.098 0 0 1-.893 3.167c0 .028-.028.083 0 .111-.056 0-.084.028-.14.056-2.206 1.61-4.356 3.305-6.506 5.028 1.843-1.64 3.686-3.306 5.613-4.945.558-.5.949-1.139 1.06-1.861l.28-1.667v-.055c.14-.334.67-.195.586.166Z",
			fill: "currentColor"
		})
	}), {
		width: 40,
		height: 40,
		fill: "none"
	});
	Pd = R((0, import_jsx_runtime.jsxs)("g", {
		stroke: "currentColor",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				stroke: "none",
				d: "M0 0h24v24H0z",
				fill: "none"
			}),
			(0, import_jsx_runtime.jsx)("path", { d: "M6 6l4.153 11.793a0.365 .365 0 0 0 .331 .207a0.366 .366 0 0 0 .332 -.207l2.184 -4.793l4.787 -1.994a0.355 .355 0 0 0 .213 -.323a0.355 .355 0 0 0 -.213 -.323l-11.787 -4.36z" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M13.5 13.5l4.5 4.5" })
		]
	}), {
		fill: "none",
		width: 22,
		height: 22,
		strokeWidth: 1.25
	}), Nd = R((0, import_jsx_runtime.jsxs)("g", {
		strokeWidth: "1.5",
		children: [(0, import_jsx_runtime.jsx)("path", {
			stroke: "none",
			d: "M0 0h24v24H0z",
			fill: "none"
		}), (0, import_jsx_runtime.jsx)("rect", {
			x: "4",
			y: "4",
			width: "16",
			height: "16",
			rx: "2"
		})]
	}), F), Fd = R((0, import_jsx_runtime.jsxs)("g", {
		strokeWidth: "1.5",
		children: [(0, import_jsx_runtime.jsx)("path", {
			stroke: "none",
			d: "M0 0h24v24H0z",
			fill: "none"
		}), (0, import_jsx_runtime.jsx)("path", { d: "M10.5 20.4l-6.9 -6.9c-.781 -.781 -.781 -2.219 0 -3l6.9 -6.9c.781 -.781 2.219 -.781 3 0l6.9 6.9c.781 .781 .781 2.219 0 3l-6.9 6.9c-.781 .781 -2.219 .781 -3 0z" })]
	}), F), Bd = R((0, import_jsx_runtime.jsxs)("g", {
		strokeWidth: "1.5",
		children: [(0, import_jsx_runtime.jsx)("path", {
			stroke: "none",
			d: "M0 0h24v24H0z",
			fill: "none"
		}), (0, import_jsx_runtime.jsx)("circle", {
			cx: "12",
			cy: "12",
			r: "9"
		})]
	}), F), _d = R((0, import_jsx_runtime.jsxs)("g", {
		strokeWidth: "1.5",
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				stroke: "none",
				d: "M0 0h24v24H0z",
				fill: "none"
			}),
			(0, import_jsx_runtime.jsx)("line", {
				x1: "5",
				y1: "12",
				x2: "19",
				y2: "12"
			}),
			(0, import_jsx_runtime.jsx)("line", {
				x1: "15",
				y1: "16",
				x2: "19",
				y2: "12"
			}),
			(0, import_jsx_runtime.jsx)("line", {
				x1: "15",
				y1: "8",
				x2: "19",
				y2: "12"
			})
		]
	}), F), Od = R((0, import_jsx_runtime.jsx)("path", {
		d: "M4.167 10h11.666",
		strokeWidth: "1.5"
	}), G), yx = R((0, import_jsx_runtime.jsxs)("g", {
		strokeWidth: "1.25",
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				stroke: "none",
				d: "M0 0h24v24H0z",
				fill: "none"
			}),
			(0, import_jsx_runtime.jsx)("path", { d: "M20 17v-12c0 -1.121 -.879 -2 -2 -2s-2 .879 -2 2v12l2 2l2 -2z" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M16 7h4" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M18 19h-13a2 2 0 1 1 0 -4h4a2 2 0 1 0 0 -4h-3" })
		]
	}), F), Nr = R((0, import_jsx_runtime.jsxs)("g", {
		strokeWidth: "1.25",
		children: [(0, import_jsx_runtime.jsx)("path", {
			clipRule: "evenodd",
			d: "m7.643 15.69 7.774-7.773a2.357 2.357 0 1 0-3.334-3.334L4.31 12.357a3.333 3.333 0 0 0-.977 2.357v1.953h1.953c.884 0 1.732-.352 2.357-.977Z"
		}), (0, import_jsx_runtime.jsx)("path", { d: "m11.25 5.417 3.333 3.333" })]
	}), G), Ad = R((0, import_jsx_runtime.jsxs)("g", {
		strokeWidth: "1.5",
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				stroke: "none",
				d: "M0 0h24v24H0z",
				fill: "none"
			}),
			(0, import_jsx_runtime.jsx)("line", {
				x1: "4",
				y1: "20",
				x2: "7",
				y2: "20"
			}),
			(0, import_jsx_runtime.jsx)("line", {
				x1: "14",
				y1: "20",
				x2: "21",
				y2: "20"
			}),
			(0, import_jsx_runtime.jsx)("line", {
				x1: "6.9",
				y1: "15",
				x2: "13.8",
				y2: "15"
			}),
			(0, import_jsx_runtime.jsx)("line", {
				x1: "10.2",
				y1: "6.3",
				x2: "16",
				y2: "20"
			}),
			(0, import_jsx_runtime.jsx)("polyline", { points: "5 20 11 4 13 4 20 20" })
		]
	}), F), Kd = R((0, import_jsx_runtime.jsxs)("g", {
		strokeWidth: "1.25",
		children: [
			(0, import_jsx_runtime.jsx)("path", { d: "M12.5 6.667h.01" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M4.91 2.625h10.18a2.284 2.284 0 0 1 2.285 2.284v10.182a2.284 2.284 0 0 1-2.284 2.284H4.909a2.284 2.284 0 0 1-2.284-2.284V4.909a2.284 2.284 0 0 1 2.284-2.284Z" }),
			(0, import_jsx_runtime.jsx)("path", { d: "m3.333 12.5 3.334-3.333c.773-.745 1.726-.745 2.5 0l4.166 4.166" }),
			(0, import_jsx_runtime.jsx)("path", { d: "m11.667 11.667.833-.834c.774-.744 1.726-.744 2.5 0l1.667 1.667" })
		]
	}), G), Hd = R((0, import_jsx_runtime.jsxs)("g", {
		strokeWidth: "1.5",
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				stroke: "none",
				d: "M0 0h24v24H0z",
				fill: "none"
			}),
			(0, import_jsx_runtime.jsx)("path", { d: "M19 20h-10.5l-4.21 -4.3a1 1 0 0 1 0 -1.41l10 -10a1 1 0 0 1 1.41 0l5 5a1 1 0 0 1 0 1.41l-9.2 9.3" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M18 13.3l-6.3 -6.3" })
		]
	}), F), Ix = R((0, import_jsx_runtime.jsx)("path", {
		strokeWidth: "1.25",
		d: "M10 4.167v11.666M4.167 10h11.666"
	}), G), wx = R((0, import_jsx_runtime.jsx)("path", {
		d: "M5 10h10",
		strokeWidth: "1.25"
	}), G), Rx = R((0, import_jsx_runtime.jsxs)("g", {
		strokeWidth: 1.25,
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				stroke: "none",
				d: "M0 0h24v24H0z",
				fill: "none"
			}),
			(0, import_jsx_runtime.jsx)("path", { d: "M21 21l-6 -6" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M3.268 12.043a7.017 7.017 0 0 0 6.634 4.957a7.012 7.012 0 0 0 7.043 -6.131a7 7 0 0 0 -5.314 -7.672a7.021 7.021 0 0 0 -8.241 4.403" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M3 4v4h4" })
		]
	}), F), Tx = R((0, import_jsx_runtime.jsx)("path", {
		strokeWidth: "1.25",
		d: "M3.333 5.833h13.334M8.333 9.167v5M11.667 9.167v5M4.167 5.833l.833 10c0 .92.746 1.667 1.667 1.667h6.666c.92 0 1.667-.746 1.667-1.667l.833-10M7.5 5.833v-2.5c0-.46.373-.833.833-.833h3.334c.46 0 .833.373.833.833v2.5"
	}), G), Mx = R((0, import_jsx_runtime.jsxs)("g", {
		strokeWidth: "1.25",
		children: [(0, import_jsx_runtime.jsx)("polyline", { points: "12 16 18 10 12 4" }), (0, import_jsx_runtime.jsx)("polyline", { points: "8 4 2 10 8 16" })]
	}), G), Lx = R((0, import_jsx_runtime.jsxs)("g", {
		strokeWidth: "1.25",
		children: [(0, import_jsx_runtime.jsx)("path", { d: "M14.375 6.458H8.958a2.5 2.5 0 0 0-2.5 2.5v5.417a2.5 2.5 0 0 0 2.5 2.5h5.417a2.5 2.5 0 0 0 2.5-2.5V8.958a2.5 2.5 0 0 0-2.5-2.5Z" }), (0, import_jsx_runtime.jsx)("path", {
			clipRule: "evenodd",
			d: "M11.667 3.125c.517 0 .986.21 1.325.55.34.338.55.807.55 1.325v1.458H8.333c-.485 0-.927.185-1.26.487-.343.312-.57.75-.609 1.24l-.005 5.357H5a1.87 1.87 0 0 1-1.326-.55 1.87 1.87 0 0 1-.549-1.325V5c0-.518.21-.987.55-1.326.338-.34.807-.549 1.325-.549h6.667Z"
		})]
	}), G), Dx = R((0, import_jsx_runtime.jsx)("path", {
		clipRule: "evenodd",
		d: "M10 2.5h.328a6.25 6.25 0 0 0 6.6 10.372A7.5 7.5 0 1 1 10 2.493V2.5Z",
		stroke: "currentColor"
	}), G), Sx = R((0, import_jsx_runtime.jsx)("g", {
		stroke: "currentColor",
		strokeLinejoin: "round",
		children: (0, import_jsx_runtime.jsx)("path", { d: "M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM10 4.167V2.5M14.167 5.833l1.166-1.166M15.833 10H17.5M14.167 14.167l1.166 1.166M10 15.833V17.5M5.833 14.167l-1.166 1.166M5 10H3.333M5.833 5.833 4.667 4.667" })
	}), {
		...G,
		strokeWidth: 1.5
	}), vx = R((0, import_jsx_runtime.jsxs)("g", {
		strokeWidth: "1.5",
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				stroke: "none",
				d: "M0 0h24v24H0z",
				fill: "none"
			}),
			(0, import_jsx_runtime.jsx)("line", {
				x1: "4",
				y1: "6",
				x2: "20",
				y2: "6"
			}),
			(0, import_jsx_runtime.jsx)("line", {
				x1: "4",
				y1: "12",
				x2: "20",
				y2: "12"
			}),
			(0, import_jsx_runtime.jsx)("line", {
				x1: "4",
				y1: "18",
				x2: "20",
				y2: "18"
			})
		]
	}), F), $x = R((0, import_jsx_runtime.jsx)("path", {
		strokeWidth: "1.25",
		d: "M3.333 14.167v1.666c0 .92.747 1.667 1.667 1.667h10c.92 0 1.667-.746 1.667-1.667v-1.666M5.833 9.167 10 13.333l4.167-4.166M10 3.333v10"
	}), G), Px = R((0, import_jsx_runtime.jsxs)("g", {
		strokeWidth: "1.5",
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				stroke: "none",
				d: "M0 0h24v24H0z",
				fill: "none"
			}),
			(0, import_jsx_runtime.jsx)("circle", {
				cx: "12",
				cy: "12",
				r: "9"
			}),
			(0, import_jsx_runtime.jsx)("line", {
				x1: "12",
				y1: "17",
				x2: "12",
				y2: "17.01"
			}),
			(0, import_jsx_runtime.jsx)("path", { d: "M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4" })
		]
	}), F), Nx = R((0, import_jsx_runtime.jsxs)("g", {
		strokeWidth: "1.25",
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				stroke: "none",
				d: "M0 0h24v24H0z",
				fill: "none"
			}),
			(0, import_jsx_runtime.jsx)("circle", {
				cx: "12",
				cy: "12",
				r: "9"
			}),
			(0, import_jsx_runtime.jsx)("line", {
				x1: "12",
				y1: "17",
				x2: "12",
				y2: "17.01"
			}),
			(0, import_jsx_runtime.jsx)("path", { d: "M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4" })
		]
	}), F), Fx = R((0, import_jsx_runtime.jsx)("path", {
		strokeWidth: "1.25",
		d: "M9.167 5.833H5.833c-1.254 0-2.5 1.282-2.5 2.5v5.834c0 1.283 1.252 2.5 2.5 2.5h5.834c1.251 0 2.5-1.25 2.5-2.5v-3.334M8.333 11.667l8.334-8.334M12.5 3.333h4.167V7.5"
	}), G), Bx = R((0, import_jsx_runtime.jsx)("path", {
		d: "M7.5 15.833c-3.583 1.167-3.583-2.083-5-2.5m10 4.167v-2.917c0-.833.083-1.166-.417-1.666 2.334-.25 4.584-1.167 4.584-5a3.833 3.833 0 0 0-1.084-2.667 3.5 3.5 0 0 0-.083-2.667s-.917-.25-2.917 1.084a10.25 10.25 0 0 0-5.166 0C5.417 2.333 4.5 2.583 4.5 2.583a3.5 3.5 0 0 0-.083 2.667 3.833 3.833 0 0 0-1.084 2.667c0 3.833 2.25 4.75 4.584 5-.5.5-.5 1-.417 1.666V17.5",
		strokeWidth: "1.25"
	}), G), _x = R((0, import_jsx_runtime.jsxs)("g", {
		strokeWidth: "1.25",
		children: [(0, import_jsx_runtime.jsx)("path", { d: "M7.5 10.833a.833.833 0 1 0 0-1.666.833.833 0 0 0 0 1.666ZM12.5 10.833a.833.833 0 1 0 0-1.666.833.833 0 0 0 0 1.666ZM6.25 6.25c2.917-.833 4.583-.833 7.5 0M5.833 13.75c2.917.833 5.417.833 8.334 0" }), (0, import_jsx_runtime.jsx)("path", { d: "M12.917 14.167c0 .833 1.25 2.5 1.666 2.5 1.25 0 2.361-1.39 2.917-2.5.556-1.39.417-4.861-1.25-9.584-1.214-.846-2.5-1.116-3.75-1.25l-.833 2.084M7.083 14.167c0 .833-1.13 2.5-1.526 2.5-1.191 0-2.249-1.39-2.778-2.5-.529-1.39-.397-4.861 1.19-9.584 1.157-.846 2.318-1.116 3.531-1.25l.833 2.084" })]
	}), G), Ox = R((0, import_jsx_runtime.jsxs)("g", {
		strokeWidth: "1.25",
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				stroke: "none",
				d: "M0 0h24v24H0z",
				fill: "none"
			}),
			(0, import_jsx_runtime.jsx)("path", { d: "M4 4l11.733 16h4.267l-11.733 -16z" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" })
		]
	}), F), Ax = R((0, import_jsx_runtime.jsx)("polyline", {
		fill: "none",
		stroke: "currentColor",
		points: "20 6 9 17 4 12"
	}), {
		width: 24,
		height: 24
	}), Kx = R((0, import_jsx_runtime.jsxs)("g", {
		strokeWidth: "1.25",
		children: [(0, import_jsx_runtime.jsx)("path", { d: "M8.333 11.667a2.917 2.917 0 0 0 4.167 0l3.333-3.334a2.946 2.946 0 1 0-4.166-4.166l-.417.416" }), (0, import_jsx_runtime.jsx)("path", { d: "M11.667 8.333a2.917 2.917 0 0 0-4.167 0l-3.333 3.334a2.946 2.946 0 0 0 4.166 4.166l.417-.416" })]
	}), G), Hx = R("M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM224 416c-35.346 0-64-28.654-64-64 0-35.346 28.654-64 64-64s64 28.654 64 64c0 35.346-28.654 64-64 64zm96-304.52V212c0 6.627-5.373 12-12 12H76c-6.627 0-12-5.373-12-12V108c0-6.627 5.373-12 12-12h228.52c3.183 0 6.235 1.264 8.485 3.515l3.48 3.48A11.996 11.996 0 0 1 320 111.48z", {
		width: 448,
		height: 512
	}), Jx = R("M252 54L203 8a28 27 0 00-20-8H28C12 0 0 12 0 27v195c0 15 12 26 28 26h204c15 0 28-11 28-26V73a28 27 0 00-8-19zM130 213c-21 0-37-16-37-36 0-19 16-35 37-35 20 0 37 16 37 35 0 20-17 36-37 36zm56-169v56c0 4-4 6-7 6H44c-4 0-7-2-7-6V42c0-4 3-7 7-7h133l4 2 3 2a7 7 0 012 5z M296 201l87 95-188 205-78 9c-10 1-19-8-18-20l9-84zm141-14l-41-44a31 31 0 00-46 0l-38 41 87 95 38-42c13-14 13-36 0-50z", {
		width: 448,
		height: 512
	}), Yx = R((0, import_jsx_runtime.jsx)("path", {
		d: "m9.257 6.351.183.183H15.819c.34 0 .727.182 1.051.506.323.323.505.708.505 1.05v5.819c0 .316-.183.7-.52 1.035-.337.338-.723.522-1.037.522H4.182c-.352 0-.74-.181-1.058-.5-.318-.318-.499-.705-.499-1.057V5.182c0-.351.181-.736.5-1.054.32-.321.71-.503 1.057-.503H6.53l2.726 2.726Z",
		strokeWidth: "1.25"
	}), G);
	R("M384 112v352c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h80c0-35.29 28.71-64 64-64s64 28.71 64 64h80c26.51 0 48 21.49 48 48zM192 40c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24m96 114v-20a6 6 0 0 0-6-6H102a6 6 0 0 0-6 6v20a6 6 0 0 0 6 6h180a6 6 0 0 0 6-6z", {
		width: 384,
		height: 512
	});
	Vx = R("M204.3 5C104.9 24.4 24.8 104.3 5.2 203.4c-37 187 131.7 326.4 258.8 306.7 41.2-6.4 61.4-54.6 42.5-91.7-23.1-45.4 9.9-98.4 60.9-98.4h79.7c35.8 0 64.8-29.6 64.9-65.3C511.5 97.1 368.1-26.9 204.3 5zM96 320c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm32-128c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128-64c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128 64c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"), qx = R((0, import_jsx_runtime.jsxs)("g", {
		strokeWidth: 1.25,
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				stroke: "none",
				d: "M0 0h24v24H0z",
				fill: "none"
			}),
			(0, import_jsx_runtime.jsx)("path", { d: "M5 16l1.465 1.638a2 2 0 1 1 -3.015 .099l1.55 -1.737z" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M13.737 9.737c2.299 -2.3 3.23 -5.095 2.081 -6.245c-1.15 -1.15 -3.945 -.217 -6.244 2.082c-2.3 2.299 -3.231 5.095 -2.082 6.244c1.15 1.15 3.946 .218 6.245 -2.081z" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M7.492 11.818c.362 .362 .768 .676 1.208 .934l6.895 4.047c1.078 .557 2.255 -.075 3.692 -1.512c1.437 -1.437 2.07 -2.614 1.512 -3.692c-.372 -.718 -1.72 -3.017 -4.047 -6.895a6.015 6.015 0 0 0 -.934 -1.208" })
		]
	}), F), Xx = R((0, import_jsx_runtime.jsxs)("g", {
		strokeWidth: "1.25",
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				stroke: "none",
				d: "M0 0h24v24H0z",
				fill: "none"
			}),
			(0, import_jsx_runtime.jsx)("path", { d: "M15 8h.01" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M12 20h-5a3 3 0 0 1 -3 -3v-10a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v5" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M4 15l4 -4c.928 -.893 2.072 -.893 3 0l4 4" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M14 14l1 -1c.617 -.593 1.328 -.793 2.009 -.598" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M19 16v6" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M22 19l-3 3l-3 -3" })
		]
	}), F), Gx = R("M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z", {
		width: 512,
		height: 512
	});
	R("M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z", {
		width: 448,
		height: 512
	});
	R("M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z", {
		width: 448,
		height: 512
	});
	Wx = R("M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z");
	R("M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z");
	Qx = R((0, import_jsx_runtime.jsx)("path", {
		d: "M7.5 10.833 4.167 7.5 7.5 4.167M4.167 7.5h9.166a3.333 3.333 0 0 1 0 6.667H12.5",
		strokeWidth: "1.25"
	}), G), jx = R((0, import_jsx_runtime.jsx)("path", {
		d: "M12.5 10.833 15.833 7.5 12.5 4.167M15.833 7.5H6.667a3.333 3.333 0 1 0 0 6.667H7.5",
		strokeWidth: "1.25"
	}), G), eh = R("M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z", { mirror: !0 }), th = R((0, import_jsx_runtime.jsx)("path", {
		d: "M5 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM15 7.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM15 17.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM7.25 8.917l5.5-2.834M7.25 11.083l5.5 2.834",
		strokeWidth: "1.5"
	}), G);
	R("M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z");
	R("M16 5l-1.42 1.42-1.59-1.59V16h-1.98V4.83L9.42 6.42 8 5l4-4 4 4zm4 5v11c0 1.1-.9 2-2 2H6c-1.11 0-2-.9-2-2V10c0-1.11.89-2 2-2h3v2H6v11h12V10h-3V8h3c1.1 0 2 .89 2 2z", {
		width: 24,
		height: 24
	});
	R((0, import_jsx_runtime.jsxs)("g", {
		strokeWidth: 1.25,
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				stroke: "none",
				d: "M0 0h24v24H0z",
				fill: "none"
			}),
			(0, import_jsx_runtime.jsx)("path", { d: "M8 9h-1a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-8a2 2 0 0 0 -2 -2h-1" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M12 14v-11" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M9 6l3 -3l3 3" })
		]
	}), F);
	R((0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [(0, import_jsx_runtime.jsx)("path", {
		fill: "currentColor",
		d: "M40 5.6v6.1l-4.1.7c-8.9 1.4-16.5 6.9-20.6 15C13 32 10.9 43 12.4 43c.4 0 2.4-1.3 4.4-3 5-3.9 12.1-7 18.2-7.7l5-.6v12.8l11.2-11.3L62.5 22 51.2 10.8 40-.5v6.1zm10.2 22.6L44 34.5v-6.8l-6.9.6c-3.9.3-9.8 1.7-13.2 3.1-3.5 1.4-6.5 2.4-6.7 2.2-.9-1 3-7.5 6.4-10.8C28 18.6 34.4 16 40.1 16c3.7 0 3.9-.1 3.9-3.2V9.5l6.2 6.3 6.3 6.2-6.3 6.2z"
	}), (0, import_jsx_runtime.jsx)("path", {
		stroke: "currentColor",
		fill: "currentColor",
		d: "M0 36v20h48v-6.2c0-6 0-6.1-2-4.3-1.1 1-2 2.9-2 4.2V52H4V34c0-17.3-.1-18-2-18s-2 .7-2 20z"
	})] }), {
		width: 64,
		height: 64
	});
	R((0, import_jsx_runtime.jsx)("path", {
		stroke: "currentColor",
		strokeWidth: "40",
		fill: "currentColor",
		d: "M148 560a318 318 0 0 0 522 110 316 316 0 0 0 0-450 316 316 0 0 0-450 0c-11 11-21 22-30 34v4h47c25 0 46 21 46 46s-21 45-46 45H90c-13 0-25-6-33-14-9-9-14-20-14-33V156c0-25 20-45 45-45s45 20 45 45v32l1 1a401 401 0 0 1 623 509l212 212a42 42 0 0 1-59 59L698 757A401 401 0 0 1 65 570a42 42 0 0 1 83-10z"
	}), { width: 1024 });
	Jd = (0, import_jsx_runtime.jsxs)("g", {
		strokeWidth: 1.5,
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				stroke: "none",
				d: "M0 0h24v24H0z",
				fill: "none"
			}),
			(0, import_jsx_runtime.jsx)("path", { d: "M12 10l0 10" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M12 10l4 4" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M12 10l-4 4" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M4 4l16 0" })
		]
	}), Yd = (0, import_jsx_runtime.jsxs)("g", {
		strokeWidth: 1.5,
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				stroke: "none",
				d: "M0 0h24v24H0z",
				fill: "none"
			}),
			(0, import_jsx_runtime.jsx)("path", { d: "M12 5l0 14" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M16 9l-4 -4" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M8 9l4 -4" })
		]
	}), sh = R(Yd, F), dh = R(Yd, {
		...F,
		style: { transform: "rotate(180deg)" }
	}), ch = R(Jd, F), lh = R(Jd, {
		...F,
		style: { transform: "rotate(180deg)" }
	}), Uh = R((0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [(0, import_jsx_runtime.jsxs)("g", {
		clipPath: "url(#a)",
		stroke: "currentColor",
		strokeWidth: "1.25",
		children: [(0, import_jsx_runtime.jsx)("path", {
			d: "M3.333 3.333h13.334",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		}), (0, import_jsx_runtime.jsx)("path", { d: "M13.542 6.458h-.417c-.92 0-1.667.747-1.667 1.667v7.083c0 .92.746 1.667 1.667 1.667h.417c.92 0 1.666-.746 1.666-1.667V8.125c0-.92-.746-1.667-1.666-1.667ZM6.875 6.458h-.417c-.92 0-1.666.747-1.666 1.667v3.75c0 .92.746 1.667 1.666 1.667h.417c.92 0 1.667-.746 1.667-1.667v-3.75c0-.92-.747-1.667-1.667-1.667Z" })]
	}), (0, import_jsx_runtime.jsx)("defs", { children: (0, import_jsx_runtime.jsx)("clipPath", {
		id: "a",
		children: (0, import_jsx_runtime.jsx)("path", {
			fill: "#fff",
			d: "M0 0h20v20H0z"
		})
	}) })] }), G), fh = R((0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [(0, import_jsx_runtime.jsxs)("g", {
		clipPath: "url(#a)",
		stroke: "currentColor",
		strokeWidth: "1.25",
		children: [(0, import_jsx_runtime.jsx)("path", {
			d: "M3.333 16.667h13.334",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		}), (0, import_jsx_runtime.jsx)("path", { d: "M6.875 3.125h-.417c-.92 0-1.666.746-1.666 1.667v7.083c0 .92.746 1.667 1.666 1.667h.417c.92 0 1.667-.746 1.667-1.667V4.792c0-.92-.747-1.667-1.667-1.667ZM13.542 5.817h-.417c-.92 0-1.667.747-1.667 1.667v4.391c0 .92.746 1.667 1.667 1.667h.417c.92 0 1.666-.746 1.666-1.667V7.484c0-.92-.746-1.667-1.666-1.667Z" })]
	}), (0, import_jsx_runtime.jsx)("defs", { children: (0, import_jsx_runtime.jsx)("clipPath", {
		id: "a",
		children: (0, import_jsx_runtime.jsx)("path", {
			fill: "#fff",
			d: "M0 0h20v20H0z"
		})
	}) })] }), G), ph = R((0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [(0, import_jsx_runtime.jsxs)("g", {
		clipPath: "url(#a)",
		stroke: "currentColor",
		strokeWidth: "1.25",
		children: [(0, import_jsx_runtime.jsx)("path", {
			d: "M3.333 3.333v13.334",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		}), (0, import_jsx_runtime.jsx)("path", { d: "M15.208 4.792H8.125c-.92 0-1.667.746-1.667 1.666v.417c0 .92.747 1.667 1.667 1.667h7.083c.92 0 1.667-.747 1.667-1.667v-.417c0-.92-.746-1.666-1.667-1.666ZM12.516 11.458H8.125c-.92 0-1.667.746-1.667 1.667v.417c0 .92.747 1.666 1.667 1.666h4.391c.92 0 1.667-.746 1.667-1.666v-.417c0-.92-.746-1.667-1.667-1.667Z" })]
	}), (0, import_jsx_runtime.jsx)("defs", { children: (0, import_jsx_runtime.jsx)("clipPath", {
		id: "a",
		children: (0, import_jsx_runtime.jsx)("path", {
			fill: "#fff",
			d: "M0 0h20v20H0z"
		})
	}) })] }), G), uh = R((0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [(0, import_jsx_runtime.jsxs)("g", {
		clipPath: "url(#a)",
		stroke: "currentColor",
		strokeWidth: "1.25",
		children: [(0, import_jsx_runtime.jsx)("path", {
			d: "M16.667 3.333v13.334",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		}), (0, import_jsx_runtime.jsx)("path", { d: "M11.875 4.792H4.792c-.92 0-1.667.746-1.667 1.666v.417c0 .92.746 1.667 1.667 1.667h7.083c.92 0 1.667-.747 1.667-1.667v-.417c0-.92-.746-1.666-1.667-1.666ZM11.683 11.458H7.292c-.92 0-1.667.746-1.667 1.667v.417c0 .92.746 1.666 1.667 1.666h4.39c.921 0 1.667-.746 1.667-1.666v-.417c0-.92-.746-1.667-1.666-1.667Z" })]
	}), (0, import_jsx_runtime.jsx)("defs", { children: (0, import_jsx_runtime.jsx)("clipPath", {
		id: "a",
		children: (0, import_jsx_runtime.jsx)("path", {
			fill: "#fff",
			d: "M0 0h20v20H0z"
		})
	}) })] }), G), mh = R((0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [(0, import_jsx_runtime.jsxs)("g", {
		clipPath: "url(#a)",
		stroke: "currentColor",
		strokeWidth: "1.25",
		children: [(0, import_jsx_runtime.jsx)("path", {
			d: "M16.667 3.333v13.334M3.333 3.333v13.334",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		}), (0, import_jsx_runtime.jsx)("path", { d: "M14.375 10.208v-.416c0-.92-.746-1.667-1.667-1.667H7.292c-.92 0-1.667.746-1.667 1.667v.416c0 .92.746 1.667 1.667 1.667h5.416c.92 0 1.667-.746 1.667-1.667Z" })]
	}), (0, import_jsx_runtime.jsx)("defs", { children: (0, import_jsx_runtime.jsx)("clipPath", {
		id: "a",
		children: (0, import_jsx_runtime.jsx)("path", {
			fill: "#fff",
			d: "M0 0h20v20H0z"
		})
	}) })] }), G), bh = R((0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [(0, import_jsx_runtime.jsxs)("g", {
		clipPath: "url(#a)",
		stroke: "currentColor",
		strokeWidth: "1.25",
		children: [(0, import_jsx_runtime.jsx)("path", {
			d: "M3.333 3.333h13.334M3.333 16.667h13.334",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		}), (0, import_jsx_runtime.jsx)("path", { d: "M10.208 5.625h-.416c-.92 0-1.667.746-1.667 1.667v5.416c0 .92.746 1.667 1.667 1.667h.416c.92 0 1.667-.746 1.667-1.667V7.292c0-.92-.746-1.667-1.667-1.667Z" })]
	}), (0, import_jsx_runtime.jsx)("defs", { children: (0, import_jsx_runtime.jsx)("clipPath", {
		id: "a",
		children: (0, import_jsx_runtime.jsx)("path", {
			fill: "#fff",
			d: "M0 0h20v20H0z"
		})
	}) })] }), G), Eh = R((0, import_jsx_runtime.jsxs)("g", {
		stroke: "currentColor",
		strokeWidth: "1.25",
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				d: "M1.667 10h2.916",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			}),
			(0, import_jsx_runtime.jsx)("path", {
				d: "M8.333 10h3.334",
				strokeLinejoin: "round"
			}),
			(0, import_jsx_runtime.jsx)("path", {
				d: "M15.417 10h2.916",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			}),
			(0, import_jsx_runtime.jsx)("path", { d: "M6.875 4.792h-.417c-.92 0-1.666.746-1.666 1.666v7.084c0 .92.746 1.666 1.666 1.666h.417c.92 0 1.667-.746 1.667-1.666V6.458c0-.92-.747-1.666-1.667-1.666ZM13.542 6.458h-.417c-.92 0-1.667.747-1.667 1.667v3.75c0 .92.746 1.667 1.667 1.667h.417c.92 0 1.666-.746 1.666-1.667v-3.75c0-.92-.746-1.667-1.666-1.667Z" })
		]
	}), G), gh = R((0, import_jsx_runtime.jsxs)("g", {
		stroke: "currentColor",
		strokeWidth: "1.25",
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				d: "M10 18.333v-2.916",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			}),
			(0, import_jsx_runtime.jsx)("path", {
				d: "M10 11.667V8.333",
				strokeLinejoin: "round"
			}),
			(0, import_jsx_runtime.jsx)("path", {
				d: "M10 4.583V1.667",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			}),
			(0, import_jsx_runtime.jsx)("path", { d: "M4.792 13.125v.417c0 .92.746 1.666 1.666 1.666h7.084c.92 0 1.666-.746 1.666-1.666v-.417c0-.92-.746-1.667-1.666-1.667H6.458c-.92 0-1.666.746-1.666 1.667ZM6.458 6.458v.417c0 .92.747 1.667 1.667 1.667h3.75c.92 0 1.667-.747 1.667-1.667v-.417c0-.92-.746-1.666-1.667-1.666h-3.75c-.92 0-1.667.746-1.667 1.666Z" })
		]
	}), G), xh = R((0, import_jsx_runtime.jsxs)("g", {
		strokeWidth: "1.5",
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				stroke: "none",
				d: "M0 0h24v24H0z",
				fill: "none"
			}),
			(0, import_jsx_runtime.jsx)("circle", {
				cx: "9",
				cy: "7",
				r: "4"
			}),
			(0, import_jsx_runtime.jsx)("path", { d: "M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M16 3.13a4 4 0 0 1 0 7.75" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M21 21v-2a4 4 0 0 0 -3 -3.85" })
		]
	}), F);
	R("M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm115.7 272l-176 101c-15.8 8.8-35.7-2.5-35.7-21V152c0-18.4 19.8-29.8 35.7-21l176 107c16.4 9.2 16.4 32.9 0 42z");
	R("M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm96 328c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h160c8.8 0 16 7.2 16 16v160z");
	Ih = R((0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [(0, import_jsx_runtime.jsx)("g", {
		clipPath: "url(#a)",
		stroke: "currentColor",
		strokeWidth: "1.25",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: (0, import_jsx_runtime.jsx)("path", { d: "M15 5 5 15M5 5l10 10" })
	}), (0, import_jsx_runtime.jsx)("defs", { children: (0, import_jsx_runtime.jsx)("clipPath", {
		id: "a",
		children: (0, import_jsx_runtime.jsx)("path", {
			fill: "#fff",
			d: "M0 0h20v20H0z"
		})
	}) })] }), G);
	R("M464 0c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48H176c-26.51 0-48-21.49-48-48V48c0-26.51 21.49-48 48-48h288M176 416c-44.112 0-80-35.888-80-80V128H48c-26.51 0-48 21.49-48 48v288c0 26.51 21.49 48 48 48h288c26.51 0 48-21.49 48-48v-48H176z", { mirror: !0 });
	R("M11.553 22.894a.998.998 0 00.894 0s3.037-1.516 5.465-4.097C19.616 16.987 21 14.663 21 12V5a1 1 0 00-.649-.936l-8-3a.998.998 0 00-.702 0l-8 3A1 1 0 003 5v7c0 2.663 1.384 4.987 3.088 6.797 2.428 2.581 5.465 4.097 5.465 4.097zm-1.303-8.481l6.644-6.644a.856.856 0 111.212 1.212l-7.25 7.25a.856.856 0 01-1.212 0l-3.75-3.75a.856.856 0 111.212-1.212l3.144 3.144z", { width: 24 });
	R("M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zM332.1 128H256V51.9l76.1 76.1zM48 464V48h160v104c0 13.3 10.7 24 24 24h104v288H48zm32-48h224V288l-23.5-23.5c-4.7-4.7-12.3-4.7-17 0L176 352l-39.5-39.5c-4.7-4.7-12.3-4.7-17 0L80 352v64zm48-240c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48z", {
		width: 384,
		height: 512
	});
	Mh = import_react.memo(({ theme: e }) => R((0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		(0, import_jsx_runtime.jsx)("path", {
			d: "M25 26H111V111H25",
			fill: yt(e)
		}),
		(0, import_jsx_runtime.jsx)("path", {
			d: "M25 111C25 80.2068 25 49.4135 25 26M25 26C48.6174 26 72.2348 26 111 26H25ZM25 26C53.3671 26 81.7343 26 111 26H25ZM111 26C111 52.303 111 78.606 111 111V26ZM111 26C111 51.2947 111 76.5893 111 111V26ZM111 111C87.0792 111 63.1585 111 25 111H111ZM111 111C87.4646 111 63.9293 111 25 111H111ZM25 111C25 81.1514 25 51.3028 25 26V111Z",
			stroke: yt(e),
			strokeWidth: "2"
		}),
		(0, import_jsx_runtime.jsx)("path", {
			d: "M100 100H160V160H100",
			fill: yt(e)
		}),
		(0, import_jsx_runtime.jsx)("path", {
			d: "M100 160C100 144.106 100 128.211 100 100M100 100C117.706 100 135.412 100 160 100H100ZM100 100C114.214 100 128.428 100 160 100H100ZM160 100C160 120.184 160 140.369 160 160V100ZM160 100C160 113.219 160 126.437 160 160V100ZM160 160C145.534 160 131.068 160 100 160H160ZM160 160C143.467 160 126.934 160 100 160H160ZM100 160C100 143.661 100 127.321 100 100V160Z",
			stroke: yt(e),
			strokeWidth: "2"
		}),
		(0, import_jsx_runtime.jsxs)("g", {
			fill: $d(e),
			stroke: yt(e),
			strokeWidth: "6",
			children: [
				(0, import_jsx_runtime.jsx)("rect", {
					x: "2.5",
					y: "2.5",
					width: "30",
					height: "30"
				}),
				(0, import_jsx_runtime.jsx)("rect", {
					x: "2.5",
					y: "149.5",
					width: "30",
					height: "30"
				}),
				(0, import_jsx_runtime.jsx)("rect", {
					x: "147.5",
					y: "149.5",
					width: "30",
					height: "30"
				}),
				(0, import_jsx_runtime.jsx)("rect", {
					x: "147.5",
					y: "2.5",
					width: "30",
					height: "30"
				})
			]
		})
	] }), {
		width: 182,
		height: 182,
		mirror: !0
	})), Lh = import_react.memo(({ theme: e }) => R((0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		(0, import_jsx_runtime.jsx)("path", {
			d: "M25 26H111V111H25",
			fill: yt(e)
		}),
		(0, import_jsx_runtime.jsx)("path", {
			d: "M25 111C25 80.2068 25 49.4135 25 26M25 26C48.6174 26 72.2348 26 111 26H25ZM25 26C53.3671 26 81.7343 26 111 26H25ZM111 26C111 52.303 111 78.606 111 111V26ZM111 26C111 51.2947 111 76.5893 111 111V26ZM111 111C87.0792 111 63.1585 111 25 111H111ZM111 111C87.4646 111 63.9293 111 25 111H111ZM25 111C25 81.1514 25 51.3028 25 26V111Z",
			stroke: yt(e),
			strokeWidth: "2"
		}),
		(0, import_jsx_runtime.jsx)("path", {
			d: "M100 100H160V160H100",
			fill: yt(e)
		}),
		(0, import_jsx_runtime.jsx)("path", {
			d: "M100 160C100 144.106 100 128.211 100 100M100 100C117.706 100 135.412 100 160 100H100ZM100 100C114.214 100 128.428 100 160 100H100ZM160 100C160 120.184 160 140.369 160 160V100ZM160 100C160 113.219 160 126.437 160 160V100ZM160 160C145.534 160 131.068 160 100 160H160ZM160 160C143.467 160 126.934 160 100 160H160ZM100 160C100 143.661 100 127.321 100 100V160Z",
			stroke: yt(e),
			strokeWidth: "2"
		}),
		(0, import_jsx_runtime.jsxs)("g", {
			fill: $d(e),
			stroke: yt(e),
			strokeWidth: "6",
			children: [
				(0, import_jsx_runtime.jsx)("rect", {
					x: "2.5",
					y: "2.5",
					width: "30",
					height: "30"
				}),
				(0, import_jsx_runtime.jsx)("rect", {
					x: "78.5",
					y: "149.5",
					width: "30",
					height: "30"
				}),
				(0, import_jsx_runtime.jsx)("rect", {
					x: "147.5",
					y: "149.5",
					width: "30",
					height: "30"
				}),
				(0, import_jsx_runtime.jsx)("rect", {
					x: "147.5",
					y: "78.5",
					width: "30",
					height: "30"
				}),
				(0, import_jsx_runtime.jsx)("rect", {
					x: "105.5",
					y: "2.5",
					width: "30",
					height: "30"
				}),
				(0, import_jsx_runtime.jsx)("rect", {
					x: "2.5",
					y: "102.5",
					width: "30",
					height: "30"
				})
			]
		})
	] }), {
		width: 182,
		height: 182,
		mirror: !0
	})), Dh = R((0, import_jsx_runtime.jsx)("g", {
		strokeWidth: 1.25,
		children: (0, import_jsx_runtime.jsx)("path", { d: "M5.879 2.625h8.242a3.27 3.27 0 0 1 3.254 3.254v8.242a3.27 3.27 0 0 1-3.254 3.254H5.88a3.27 3.27 0 0 1-3.254-3.254V5.88A3.27 3.27 0 0 1 5.88 2.626l-.001-.001ZM4.518 16.118l7.608-12.83m.198 13.934 5.051-9.897M2.778 9.675l9.348-6.387m-7.608 12.83 12.857-8.793" })
	}), G), Sh = R((0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		(0, import_jsx_runtime.jsx)("path", {
			d: "M5.879 2.625h8.242a3.254 3.254 0 0 1 3.254 3.254v8.242a3.254 3.254 0 0 1-3.254 3.254H5.88a3.254 3.254 0 0 1-3.254-3.254V5.88a3.254 3.254 0 0 1 3.254-3.254Z",
			stroke: "currentColor",
			strokeWidth: "1.25"
		}),
		(0, import_jsx_runtime.jsx)("mask", {
			id: "FillHachureIcon",
			style: { maskType: "alpha" },
			maskUnits: "userSpaceOnUse",
			x: 2,
			y: 2,
			width: 16,
			height: 16,
			children: (0, import_jsx_runtime.jsx)("path", {
				d: "M5.879 2.625h8.242a3.254 3.254 0 0 1 3.254 3.254v8.242a3.254 3.254 0 0 1-3.254 3.254H5.88a3.254 3.254 0 0 1-3.254-3.254V5.88a3.254 3.254 0 0 1 3.254-3.254Z",
				fill: "currentColor",
				stroke: "currentColor",
				strokeWidth: "1.25"
			})
		}),
		(0, import_jsx_runtime.jsx)("g", {
			mask: "url(#FillHachureIcon)",
			children: (0, import_jsx_runtime.jsx)("path", {
				d: "M2.258 15.156 15.156 2.258M7.324 20.222 20.222 7.325m-20.444 5.35L12.675-.222m-8.157 18.34L17.416 5.22",
				stroke: "currentColor",
				strokeWidth: "1.25",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			})
		})
	] }), G), vh = R((0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [(0, import_jsx_runtime.jsxs)("g", {
		clipPath: "url(#a)",
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				d: "M5.879 2.625h8.242a3.254 3.254 0 0 1 3.254 3.254v8.242a3.254 3.254 0 0 1-3.254 3.254H5.88a3.254 3.254 0 0 1-3.254-3.254V5.88a3.254 3.254 0 0 1 3.254-3.254Z",
				stroke: "currentColor",
				strokeWidth: "1.25"
			}),
			(0, import_jsx_runtime.jsx)("mask", {
				id: "FillCrossHatchIcon",
				style: { maskType: "alpha" },
				maskUnits: "userSpaceOnUse",
				x: -1,
				y: -1,
				width: 22,
				height: 22,
				children: (0, import_jsx_runtime.jsx)("path", {
					d: "M2.426 15.044 15.044 2.426M7.383 20 20 7.383M0 12.617 12.617 0m-7.98 17.941L17.256 5.324m-2.211 12.25L2.426 4.956M20 12.617 7.383 0m5.234 20L0 7.383m17.941 7.98L5.324 2.745",
					stroke: "currentColor",
					strokeWidth: "1.25",
					strokeLinecap: "round",
					strokeLinejoin: "round"
				})
			}),
			(0, import_jsx_runtime.jsx)("g", {
				mask: "url(#FillCrossHatchIcon)",
				children: (0, import_jsx_runtime.jsx)("path", {
					d: "M14.121 2H5.88A3.879 3.879 0 0 0 2 5.879v8.242A3.879 3.879 0 0 0 5.879 18h8.242A3.879 3.879 0 0 0 18 14.121V5.88A3.879 3.879 0 0 0 14.121 2Z",
					fill: "currentColor"
				})
			})
		]
	}), (0, import_jsx_runtime.jsx)("defs", { children: (0, import_jsx_runtime.jsx)("clipPath", {
		id: "a",
		children: (0, import_jsx_runtime.jsx)("path", {
			fill: "#fff",
			d: "M0 0h20v20H0z"
		})
	}) })] }), G), $h = R((0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [(0, import_jsx_runtime.jsx)("g", {
		clipPath: "url(#a)",
		children: (0, import_jsx_runtime.jsx)("path", {
			d: "M4.91 2.625h10.18a2.284 2.284 0 0 1 2.285 2.284v10.182a2.284 2.284 0 0 1-2.284 2.284H4.909a2.284 2.284 0 0 1-2.284-2.284V4.909a2.284 2.284 0 0 1 2.284-2.284Z",
			stroke: "currentColor",
			strokeWidth: "1.25"
		})
	}), (0, import_jsx_runtime.jsx)("defs", { children: (0, import_jsx_runtime.jsx)("clipPath", {
		id: "a",
		children: (0, import_jsx_runtime.jsx)("path", {
			fill: "#fff",
			d: "M0 0h20v20H0z"
		})
	}) })] }), {
		...G,
		fill: "currentColor"
	}), Ph = R((0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: (0, import_jsx_runtime.jsx)("path", {
		d: "M4.167 10h11.666",
		stroke: "currentColor",
		strokeWidth: "1.25",
		strokeLinecap: "round",
		strokeLinejoin: "round"
	}) }), G), Nh = R((0, import_jsx_runtime.jsx)("path", {
		d: "M5 10h10",
		stroke: "currentColor",
		strokeWidth: "2.5",
		strokeLinecap: "round",
		strokeLinejoin: "round"
	}), G), Fh = R((0, import_jsx_runtime.jsx)("path", {
		d: "M5 10h10",
		stroke: "currentColor",
		strokeWidth: "3.75",
		strokeLinecap: "round",
		strokeLinejoin: "round"
	}), G);
	import_react.memo(({ theme: e }) => R((0, import_jsx_runtime.jsx)("path", {
		d: "M6 10H34",
		stroke: yt(e),
		strokeWidth: 2,
		fill: "none",
		strokeLinecap: "round"
	}), {
		width: 40,
		height: 20
	}));
	_h = R((0, import_jsx_runtime.jsxs)("g", {
		strokeWidth: "2",
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				stroke: "none",
				d: "M0 0h24v24H0z",
				fill: "none"
			}),
			(0, import_jsx_runtime.jsx)("path", { d: "M5 12h2" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M17 12h2" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M11 12h2" })
		]
	}), F), Oh = R((0, import_jsx_runtime.jsxs)("g", {
		strokeWidth: "2",
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				stroke: "none",
				d: "M0 0h24v24H0z",
				fill: "none"
			}),
			(0, import_jsx_runtime.jsx)("path", { d: "M4 12v.01" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M8 12v.01" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M12 12v.01" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M16 12v.01" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M20 12v.01" })
		]
	}), F), Ah = R((0, import_jsx_runtime.jsx)("path", {
		d: "M2.5 12.038c1.655-.885 5.9-3.292 8.568-4.354 2.668-1.063.101 2.821 1.32 3.104 1.218.283 5.112-1.814 5.112-1.814",
		strokeWidth: "1.25"
	}), G), Kh = R((0, import_jsx_runtime.jsx)("path", {
		d: "M2.5 12.563c1.655-.886 5.9-3.293 8.568-4.355 2.668-1.062.101 2.822 1.32 3.105 1.218.283 5.112-1.814 5.112-1.814m-13.469 2.23c2.963-1.586 6.13-5.62 7.468-4.998 1.338.623-1.153 4.11-.132 5.595 1.02 1.487 6.133-1.43 6.133-1.43",
		strokeWidth: "1.25"
	}), G), Hh = R((0, import_jsx_runtime.jsx)("path", {
		d: "M2.5 11.936c1.737-.879 8.627-5.346 10.42-5.268 1.795.078-.418 5.138.345 5.736.763.598 3.53-1.789 4.235-2.147M2.929 9.788c1.164-.519 5.47-3.28 6.987-3.114 1.519.165 1 3.827 2.121 4.109 1.122.281 3.839-2.016 4.606-2.42",
		strokeWidth: "1.25"
	}), G), Jh = R((0, import_jsx_runtime.jsxs)("svg", {
		strokeWidth: "1.5",
		children: [
			(0, import_jsx_runtime.jsx)("path", { d: "M3.33334 9.99998V6.66665C3.33334 6.04326 3.33403 4.9332 3.33539 3.33646C4.95233 3.33436 6.06276 3.33331 6.66668 3.33331H10" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M13.3333 3.33331V3.34331" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M16.6667 3.33331V3.34331" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M16.6667 6.66669V6.67669" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M16.6667 10V10.01" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M3.33334 13.3333V13.3433" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M16.6667 13.3333V13.3433" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M3.33334 16.6667V16.6767" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M6.66666 16.6667V16.6767" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M10 16.6667V16.6767" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M13.3333 16.6667V16.6767" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M16.6667 16.6667V16.6767" })
		]
	}), G), Yh = R((0, import_jsx_runtime.jsxs)("g", {
		strokeWidth: "1.5",
		stroke: "currentColor",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				stroke: "none",
				d: "M0 0h24v24H0z",
				fill: "none"
			}),
			(0, import_jsx_runtime.jsx)("path", { d: "M4 12v-4a4 4 0 0 1 4 -4h4" }),
			(0, import_jsx_runtime.jsx)("line", {
				x1: "16",
				y1: "4",
				x2: "16",
				y2: "4.01"
			}),
			(0, import_jsx_runtime.jsx)("line", {
				x1: "20",
				y1: "4",
				x2: "20",
				y2: "4.01"
			}),
			(0, import_jsx_runtime.jsx)("line", {
				x1: "20",
				y1: "8",
				x2: "20",
				y2: "8.01"
			}),
			(0, import_jsx_runtime.jsx)("line", {
				x1: "20",
				y1: "12",
				x2: "20",
				y2: "12.01"
			}),
			(0, import_jsx_runtime.jsx)("line", {
				x1: "4",
				y1: "16",
				x2: "4",
				y2: "16.01"
			}),
			(0, import_jsx_runtime.jsx)("line", {
				x1: "20",
				y1: "16",
				x2: "20",
				y2: "16.01"
			}),
			(0, import_jsx_runtime.jsx)("line", {
				x1: "4",
				y1: "20",
				x2: "4",
				y2: "20.01"
			}),
			(0, import_jsx_runtime.jsx)("line", {
				x1: "8",
				y1: "20",
				x2: "8",
				y2: "20.01"
			}),
			(0, import_jsx_runtime.jsx)("line", {
				x1: "12",
				y1: "20",
				x2: "12",
				y2: "20.01"
			}),
			(0, import_jsx_runtime.jsx)("line", {
				x1: "16",
				y1: "20",
				x2: "16",
				y2: "20.01"
			}),
			(0, import_jsx_runtime.jsx)("line", {
				x1: "20",
				y1: "20",
				x2: "20",
				y2: "20.01"
			})
		]
	}), F), Ch = R((0, import_jsx_runtime.jsxs)("g", {
		stroke: "currentColor",
		opacity: .3,
		strokeWidth: 2,
		children: [
			(0, import_jsx_runtime.jsx)("path", { d: "M12 12l9 0" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M3 9l6 6" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M3 15l6 -6" })
		]
	}), F), Vh = import_react.memo(({ flip: e = !1 }) => R((0, import_jsx_runtime.jsxs)("g", {
		transform: e ? "translate(40, 0) scale(-1, 1)" : "",
		stroke: "currentColor",
		strokeWidth: 2,
		fill: "none",
		children: [(0, import_jsx_runtime.jsx)("path", { d: "M34 10H6M34 10L27 5M34 10L27 15" }), (0, import_jsx_runtime.jsx)("path", { d: "M27.5 5L34.5 10L27.5 15" })]
	}), {
		width: 40,
		height: 20
	})), qh = import_react.memo(({ flip: e = !1 }) => R((0, import_jsx_runtime.jsxs)("g", {
		stroke: "currentColor",
		fill: "currentColor",
		transform: e ? "translate(40, 0) scale(-1, 1)" : "",
		children: [(0, import_jsx_runtime.jsx)("path", {
			d: "M32 10L6 10",
			strokeWidth: 2
		}), (0, import_jsx_runtime.jsx)("circle", {
			r: "4",
			transform: "matrix(-1 0 0 1 30 10)"
		})]
	}), {
		width: 40,
		height: 20
	})), Xh = import_react.memo(({ flip: e = !1 }) => R((0, import_jsx_runtime.jsxs)("g", {
		stroke: "currentColor",
		fill: "none",
		transform: e ? "translate(40, 0) scale(-1, 1)" : "",
		strokeWidth: 2,
		children: [(0, import_jsx_runtime.jsx)("path", { d: "M26 10L6 10" }), (0, import_jsx_runtime.jsx)("circle", {
			r: "4",
			transform: "matrix(-1 0 0 1 30 10)"
		})]
	}), {
		width: 40,
		height: 20
	})), Gh = import_react.memo(({ flip: e = !1 }) => R((0, import_jsx_runtime.jsx)("g", {
		transform: e ? "translate(40, 0) scale(-1, 1)" : "",
		children: (0, import_jsx_runtime.jsx)("path", {
			d: "M34 10H5.99996M34 10L34 5M34 10L34 15",
			stroke: "currentColor",
			strokeWidth: 2,
			fill: "none"
		})
	}), {
		width: 40,
		height: 20
	})), kh = import_react.memo(({ flip: e = !1 }) => R((0, import_jsx_runtime.jsxs)("g", {
		stroke: "currentColor",
		fill: "currentColor",
		transform: e ? "translate(40, 0) scale(-1, 1)" : "",
		children: [(0, import_jsx_runtime.jsx)("path", {
			d: "M32 10L6 10",
			strokeWidth: 2
		}), (0, import_jsx_runtime.jsx)("path", { d: "M27.5 5.5L34.5 10L27.5 14.5L27.5 5.5" })]
	}), {
		width: 40,
		height: 20
	})), Zh = import_react.memo(({ flip: e = !1 }) => R((0, import_jsx_runtime.jsxs)("g", {
		stroke: "currentColor",
		fill: "none",
		transform: e ? "translate(40, 0) scale(-1, 1)" : "",
		strokeWidth: 2,
		strokeLinejoin: "round",
		children: [(0, import_jsx_runtime.jsx)("path", { d: "M6,9.5H27" }), (0, import_jsx_runtime.jsx)("path", {
			d: "M27,5L34,10L27,14Z",
			fill: "none"
		})]
	}), {
		width: 40,
		height: 20
	})), Wh = import_react.memo(({ flip: e = !1 }) => R((0, import_jsx_runtime.jsxs)("g", {
		stroke: "currentColor",
		fill: "currentColor",
		transform: e ? "translate(40, 0) scale(-1, 1)" : "",
		strokeLinejoin: "round",
		strokeWidth: 2,
		children: [(0, import_jsx_runtime.jsx)("path", { d: "M6,9.5H20" }), (0, import_jsx_runtime.jsx)("path", { d: "M27,5L34,10L27,14L20,9.5Z" })]
	}), {
		width: 40,
		height: 20
	})), zh = import_react.memo(({ flip: e = !1 }) => R((0, import_jsx_runtime.jsxs)("g", {
		stroke: "currentColor",
		fill: "none",
		transform: e ? "translate(40, 0) scale(-1, 1)" : "",
		strokeLinejoin: "round",
		strokeWidth: 2,
		children: [(0, import_jsx_runtime.jsx)("path", { d: "M6,9.5H20" }), (0, import_jsx_runtime.jsx)("path", { d: "M27,5L34,10L27,14L20,9.5Z" })]
	}), {
		width: 40,
		height: 20
	})), Qh = import_react.memo(({ flip: e = !1 }) => R((0, import_jsx_runtime.jsx)("g", {
		stroke: "currentColor",
		fill: "none",
		transform: e ? "" : "translate(40, 0) scale(-1, 1)",
		strokeLinejoin: "round",
		strokeWidth: 2,
		children: (0, import_jsx_runtime.jsx)("path", { d: "M34,10 H6 M15,10 L7,5 M15,10 L7,15" })
	}), {
		width: 40,
		height: 20
	})), jh = import_react.memo(({ flip: e = !1 }) => R((0, import_jsx_runtime.jsx)("g", {
		stroke: "currentColor",
		fill: "none",
		transform: e ? "" : "translate(40, 0) scale(-1, 1)",
		strokeLinejoin: "round",
		strokeWidth: 2,
		children: (0, import_jsx_runtime.jsx)("path", { d: "M34,10 H6 M15,10 L15,15 L15,5" })
	}), {
		width: 40,
		height: 20
	})), e4 = import_react.memo(({ flip: e = !1 }) => R((0, import_jsx_runtime.jsx)("g", {
		stroke: "currentColor",
		fill: "none",
		transform: e ? "" : "translate(40, 0) scale(-1, 1)",
		strokeLinejoin: "round",
		strokeWidth: 2,
		children: (0, import_jsx_runtime.jsx)("path", { d: "M34,10 H6 M15,10 L15,16 L15,4 M15,10 L7,5 M15,10 L7,15" })
	}), {
		width: 40,
		height: 20
	})), t4 = R((0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [(0, import_jsx_runtime.jsx)("g", {
		clipPath: "url(#a)",
		children: (0, import_jsx_runtime.jsx)("path", {
			d: "M14.167 6.667a3.333 3.333 0 0 0-3.334-3.334H9.167a3.333 3.333 0 0 0 0 6.667h1.666a3.333 3.333 0 0 1 0 6.667H9.167a3.333 3.333 0 0 1-3.334-3.334",
			stroke: "currentColor",
			strokeWidth: "1.25",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	}), (0, import_jsx_runtime.jsx)("defs", { children: (0, import_jsx_runtime.jsx)("clipPath", {
		id: "a",
		children: (0, import_jsx_runtime.jsx)("path", {
			fill: "#fff",
			d: "M0 0h20v20H0z"
		})
	}) })] }), G), n4 = R((0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [(0, import_jsx_runtime.jsx)("g", {
		clipPath: "url(#a)",
		children: (0, import_jsx_runtime.jsx)("path", {
			d: "M5 16.667V3.333L10 15l5-11.667v13.334",
			stroke: "currentColor",
			strokeWidth: "1.25",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	}), (0, import_jsx_runtime.jsx)("defs", { children: (0, import_jsx_runtime.jsx)("clipPath", {
		id: "a",
		children: (0, import_jsx_runtime.jsx)("path", {
			fill: "#fff",
			d: "M0 0h20v20H0z"
		})
	}) })] }), G), r4 = R((0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [(0, import_jsx_runtime.jsx)("g", {
		clipPath: "url(#a)",
		children: (0, import_jsx_runtime.jsx)("path", {
			d: "M5.833 3.333v13.334h8.334",
			stroke: "currentColor",
			strokeWidth: "1.25",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	}), (0, import_jsx_runtime.jsx)("defs", { children: (0, import_jsx_runtime.jsx)("clipPath", {
		id: "a",
		children: (0, import_jsx_runtime.jsx)("path", {
			fill: "#fff",
			d: "M0 0h20v20H0z"
		})
	}) })] }), G), o4 = R((0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: (0, import_jsx_runtime.jsx)("path", {
		d: "m1.667 3.333 6.666 13.334M8.333 3.333 1.667 16.667M11.667 3.333v13.334h6.666",
		stroke: "currentColor",
		strokeWidth: "1.25",
		strokeLinecap: "round",
		strokeLinejoin: "round"
	}) }), G), i4 = R((0, import_jsx_runtime.jsxs)("g", {
		strokeWidth: 1.25,
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				stroke: "none",
				d: "M0 0h24v24H0z",
				fill: "none"
			}),
			(0, import_jsx_runtime.jsx)("path", { d: "M3 7v-2h13v2" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M10 5v14" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M12 19h-4" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M15 13v-1h6v1" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M18 12v7" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M17 19h2" })
		]
	}), F), Cd = R((0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: (0, import_jsx_runtime.jsxs)("g", {
		stroke: "currentColor",
		strokeWidth: "1.25",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				stroke: "none",
				d: "M0 0h24v24H0z",
				fill: "none"
			}),
			(0, import_jsx_runtime.jsx)("path", { d: "M7 12h10" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M7 5v14" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M17 5v14" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M15 19h4" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M15 5h4" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M5 19h4" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M5 5h4" })
		]
	}) }), F), la = R((0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: (0, import_jsx_runtime.jsx)("g", {
		stroke: "currentColor",
		strokeWidth: "1.25",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: (0, import_jsx_runtime.jsx)("path", { d: "M5.833 16.667v-10a3.333 3.333 0 0 1 3.334-3.334h1.666a3.333 3.333 0 0 1 3.334 3.334v10M5.833 10.833h8.334" })
	}) }), G), Ua = R((0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [(0, import_jsx_runtime.jsx)("g", {
		clipPath: "url(#a)",
		stroke: "currentColor",
		strokeWidth: "1.25",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: (0, import_jsx_runtime.jsx)("path", { d: "M5.833 6.667 2.5 10l3.333 3.333M14.167 6.667 17.5 10l-3.333 3.333M11.667 3.333 8.333 16.667" })
	}), (0, import_jsx_runtime.jsx)("defs", { children: (0, import_jsx_runtime.jsx)("clipPath", {
		id: "a",
		children: (0, import_jsx_runtime.jsx)("path", {
			fill: "#fff",
			d: "M0 0h20v20H0z"
		})
	}) })] }), G), a4 = R((0, import_jsx_runtime.jsxs)("g", {
		stroke: "currentColor",
		fill: "none",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		strokeWidth: 2,
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				stroke: "none",
				d: "M0 0h24v24H0z",
				fill: "none"
			}),
			(0, import_jsx_runtime.jsx)("line", {
				x1: "4",
				y1: "8",
				x2: "20",
				y2: "8"
			}),
			(0, import_jsx_runtime.jsx)("line", {
				x1: "4",
				y1: "12",
				x2: "12",
				y2: "12"
			}),
			(0, import_jsx_runtime.jsx)("line", {
				x1: "4",
				y1: "16",
				x2: "16",
				y2: "16"
			})
		]
	}), F), s4 = R((0, import_jsx_runtime.jsxs)("g", {
		stroke: "currentColor",
		fill: "none",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				stroke: "none",
				d: "M0 0h24v24H0z",
				fill: "none"
			}),
			(0, import_jsx_runtime.jsx)("line", {
				x1: "4",
				y1: "8",
				x2: "20",
				y2: "8"
			}),
			(0, import_jsx_runtime.jsx)("line", {
				x1: "8",
				y1: "12",
				x2: "16",
				y2: "12"
			}),
			(0, import_jsx_runtime.jsx)("line", {
				x1: "6",
				y1: "16",
				x2: "18",
				y2: "16"
			})
		]
	}), F), d4 = R((0, import_jsx_runtime.jsxs)("g", {
		stroke: "currentColor",
		fill: "none",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				stroke: "none",
				d: "M0 0h24v24H0z",
				fill: "none"
			}),
			(0, import_jsx_runtime.jsx)("line", {
				x1: "4",
				y1: "8",
				x2: "20",
				y2: "8"
			}),
			(0, import_jsx_runtime.jsx)("line", {
				x1: "10",
				y1: "12",
				x2: "20",
				y2: "12"
			}),
			(0, import_jsx_runtime.jsx)("line", {
				x1: "8",
				y1: "16",
				x2: "20",
				y2: "16"
			})
		]
	}), F), c4 = import_react.memo(({ theme: e }) => R((0, import_jsx_runtime.jsxs)("g", {
		strokeWidth: "1.5",
		stroke: "currentColor",
		fill: "none",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				stroke: "none",
				d: "M0 0h24v24H0z",
				fill: "none"
			}),
			(0, import_jsx_runtime.jsx)("line", {
				x1: "4",
				y1: "4",
				x2: "20",
				y2: "4"
			}),
			(0, import_jsx_runtime.jsx)("rect", {
				x: "9",
				y: "8",
				width: "6",
				height: "12",
				rx: "2"
			})
		]
	}), F)), l4 = import_react.memo(({ theme: e }) => R((0, import_jsx_runtime.jsxs)("g", {
		strokeWidth: "2",
		stroke: "currentColor",
		fill: "none",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				stroke: "none",
				d: "M0 0h24v24H0z",
				fill: "none"
			}),
			(0, import_jsx_runtime.jsx)("line", {
				x1: "4",
				y1: "20",
				x2: "20",
				y2: "20"
			}),
			(0, import_jsx_runtime.jsx)("rect", {
				x: "9",
				y: "4",
				width: "6",
				height: "12",
				rx: "2"
			})
		]
	}), F)), U4 = import_react.memo(({ theme: e }) => R((0, import_jsx_runtime.jsxs)("g", {
		strokeWidth: "1.5",
		stroke: "currentColor",
		fill: "none",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				stroke: "none",
				d: "M0 0h24v24H0z",
				fill: "none"
			}),
			(0, import_jsx_runtime.jsx)("line", {
				x1: "4",
				y1: "12",
				x2: "9",
				y2: "12"
			}),
			(0, import_jsx_runtime.jsx)("line", {
				x1: "15",
				y1: "12",
				x2: "20",
				y2: "12"
			}),
			(0, import_jsx_runtime.jsx)("rect", {
				x: "9",
				y: "6",
				width: "6",
				height: "12",
				rx: "2"
			})
		]
	}), F)), f4 = R((0, import_jsx_runtime.jsxs)("g", { children: [
		(0, import_jsx_runtime.jsx)("path", {
			stroke: "none",
			d: "M0 0h24v24H0z",
			fill: "none"
		}),
		(0, import_jsx_runtime.jsx)("path", { d: "M21 19h-18l9 -15" }),
		(0, import_jsx_runtime.jsx)("path", { d: "M20.615 15.171h.015" }),
		(0, import_jsx_runtime.jsx)("path", { d: "M19.515 11.771h.015" }),
		(0, import_jsx_runtime.jsx)("path", { d: "M17.715 8.671h.015" }),
		(0, import_jsx_runtime.jsx)("path", { d: "M15.415 5.971h.015" })
	] }), F), p4 = R((0, import_jsx_runtime.jsx)("path", {
		d: "M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7.1 5.4.2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4zM393.4 288H328v112c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V288h-65.4c-14.3 0-21.4-17.2-11.3-27.3l105.4-105.4c6.2-6.2 16.4-6.2 22.6 0l105.4 105.4c10.1 10.1 2.9 27.3-11.3 27.3z",
		fill: "currentColor"
	}), {
		width: 640,
		height: 512
	});
	R((0, import_jsx_runtime.jsx)("path", { d: "M480 416C497.7 416 512 430.3 512 448C512 465.7 497.7 480 480 480H150.6C133.7 480 117.4 473.3 105.4 461.3L25.37 381.3C.3786 356.3 .3786 315.7 25.37 290.7L258.7 57.37C283.7 32.38 324.3 32.38 349.3 57.37L486.6 194.7C511.6 219.7 511.6 260.3 486.6 285.3L355.9 416H480zM265.4 416L332.7 348.7L195.3 211.3L70.63 336L150.6 416L265.4 416z" }));
	m4 = R((0, import_jsx_runtime.jsxs)("g", {
		strokeWidth: 1.25,
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				stroke: "none",
				d: "M0 0h24v24H0z",
				fill: "none"
			}),
			(0, import_jsx_runtime.jsx)("path", { d: "M8 13v-7.5a1.5 1.5 0 0 1 3 0v6.5" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M11 5.5v-2a1.5 1.5 0 1 1 3 0v8.5" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M14 5.5a1.5 1.5 0 0 1 3 0v6.5" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M17 7.5a1.5 1.5 0 0 1 3 0v8.5a6 6 0 0 1 -6 6h-2h.208a6 6 0 0 1 -5.012 -2.7a69.74 69.74 0 0 1 -.196 -.3c-.312 -.479 -1.407 -2.388 -3.286 -5.728a1.5 1.5 0 0 1 .536 -2.022a1.867 1.867 0 0 1 2.28 .28l1.47 1.47" })
		]
	}), F), b4 = R((0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		(0, import_jsx_runtime.jsx)("path", {
			stroke: "none",
			d: "M0 0h24v24H0z",
			fill: "none"
		}),
		(0, import_jsx_runtime.jsx)("path", { d: "M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" }),
		(0, import_jsx_runtime.jsx)("path", { d: "M7 11l5 5l5 -5" }),
		(0, import_jsx_runtime.jsx)("path", { d: "M12 4l0 12" })
	] }), F), E4 = R((0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		(0, import_jsx_runtime.jsx)("path", {
			stroke: "none",
			d: "M0 0h24v24H0z",
			fill: "none"
		}),
		(0, import_jsx_runtime.jsx)("path", { d: "M8 8m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z" }),
		(0, import_jsx_runtime.jsx)("path", { d: "M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" })
	] }), F), g4 = R((0, import_jsx_runtime.jsxs)("g", {
		strokeWidth: 1.25,
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				stroke: "none",
				d: "M0 0h24v24H0z",
				fill: "none"
			}),
			(0, import_jsx_runtime.jsx)("path", { d: "M7 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M9.15 14.85l8.85 -10.85" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M6 4l8.85 10.85" })
		]
	}), F), x4 = R((0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		(0, import_jsx_runtime.jsx)("path", {
			stroke: "none",
			d: "M0 0h24v24H0z",
			fill: "none"
		}),
		(0, import_jsx_runtime.jsx)("path", { d: "M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" }),
		(0, import_jsx_runtime.jsx)("path", { d: "M12 17l0 .01" }),
		(0, import_jsx_runtime.jsx)("path", { d: "M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4" })
	] }), F);
	R((0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [(0, import_jsx_runtime.jsx)("path", {
		stroke: "none",
		d: "M0 0h24v24H0z",
		fill: "none"
	}), (0, import_jsx_runtime.jsx)("path", { d: "M7 4v16l13 -8z" })] }), F);
	R((0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [(0, import_jsx_runtime.jsx)("path", {
		stroke: "none",
		d: "M0 0h24v24H0z",
		fill: "none"
	}), (0, import_jsx_runtime.jsx)("path", {
		d: "M17 4h-10a3 3 0 0 0 -3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3 -3v-10a3 3 0 0 0 -3 -3z",
		strokeWidth: "0",
		fill: "currentColor"
	})] }), F);
	I4 = R((0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [(0, import_jsx_runtime.jsx)("path", {
		stroke: "none",
		d: "M0 0h24v24H0z",
		fill: "none"
	}), (0, import_jsx_runtime.jsx)("path", { d: "M5 12l5 5l10 -10" })] }), F), w4 = R((0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		(0, import_jsx_runtime.jsx)("path", {
			stroke: "none",
			d: "M0 0h24v24H0z",
			fill: "none"
		}),
		(0, import_jsx_runtime.jsx)("path", { d: "M10.24 3.957l-8.422 14.06a1.989 1.989 0 0 0 1.7 2.983h16.845a1.989 1.989 0 0 0 1.7 -2.983l-8.423 -14.06a1.989 1.989 0 0 0 -3.4 0z" }),
		(0, import_jsx_runtime.jsx)("path", { d: "M12 9v4" }),
		(0, import_jsx_runtime.jsx)("path", { d: "M12 17h.01" })
	] }), F), R4 = R((0, import_jsx_runtime.jsxs)("g", {
		strokeWidth: 1.25,
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				stroke: "none",
				d: "M0 0h24v24H0z",
				fill: "none"
			}),
			(0, import_jsx_runtime.jsx)("path", { d: "M11 7l6 6" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M4 16l11.7 -11.7a1 1 0 0 1 1.4 0l2.6 2.6a1 1 0 0 1 0 1.4l-11.7 11.7h-4v-4z" })
		]
	}), F), T4 = R((0, import_jsx_runtime.jsxs)("g", {
		strokeWidth: 1.5,
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				stroke: "none",
				d: "M0 0h24v24H0z",
				fill: "none"
			}),
			(0, import_jsx_runtime.jsx)("path", { d: "M12 3l-4 7h8z" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M4 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" })
		]
	}), F), M4 = R((0, import_jsx_runtime.jsxs)("g", {
		strokeWidth: 1.5,
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				stroke: "none",
				d: "M0 0h24v24H0z",
				fill: "none"
			}),
			(0, import_jsx_runtime.jsx)("path", { d: "M4 7l16 0" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M4 17l16 0" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M7 4l0 16" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M17 4l0 16" })
		]
	}), F), L4 = R((0, import_jsx_runtime.jsx)("path", {
		fill: "currentColor",
		d: "M407.48,111.18C335.587,108.103 269.573,152.338 245.08,220C220.587,152.338 154.573,108.103 82.68,111.18C80.285,168.229 107.577,222.632 154.74,254.82C178.908,271.419 193.35,298.951 193.27,328.27L193.27,379.13L296.9,379.13L296.9,328.27C296.816,298.953 311.255,271.42 335.42,254.82C382.596,222.644 409.892,168.233 407.48,111.18Z"
	})), D4 = R((0, import_jsx_runtime.jsxs)("g", {
		strokeWidth: "1.25",
		children: [
			(0, import_jsx_runtime.jsx)("path", { d: "M4.16602 10H15.8327" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M12.5 13.3333L15.8333 10" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M12.5 6.66666L15.8333 9.99999" })
		]
	}), G), S4 = R((0, import_jsx_runtime.jsxs)("g", {
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.25",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		transform: "rotate(90 10 10)",
		children: [(0, import_jsx_runtime.jsx)("path", {
			clipRule: "evenodd",
			d: "m9.644 13.69 7.774-7.773a2.357 2.357 0 0 0-3.334-3.334l-7.773 7.774L8 12l1.643 1.69Z"
		}), (0, import_jsx_runtime.jsx)("path", { d: "m13.25 3.417 3.333 3.333M10 10l2-2M5 15l3-3M2.156 17.894l1-1M5.453 19.029l-.144-1.407M2.377 11.887l.866 1.118M8.354 17.273l-1.194-.758M.953 14.652l1.408.13" })]
	}), 20), v4 = R((0, import_jsx_runtime.jsxs)("g", {
		stroke: "currentColor",
		fill: "none",
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				stroke: "none",
				d: "M0 0h24v24H0z"
			}),
			(0, import_jsx_runtime.jsx)("path", { d: "M6 21l15 -15l-3 -3l-15 15l3 3" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M15 6l3 3" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M9 3a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M19 13a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" })
		]
	}), F);
	R((0, import_jsx_runtime.jsxs)("g", {
		strokeWidth: 1.25,
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				stroke: "none",
				d: "M0 0h24v24H0z"
			}),
			(0, import_jsx_runtime.jsx)("path", { d: "M6 21l15 -15l-3 -3l-15 15l3 3" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M15 6l3 3" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M9 3a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M19 13a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" })
		]
	}), F);
	R((0, import_jsx_runtime.jsxs)("g", {
		stroke: "currentColor",
		fill: "none",
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				stroke: "none",
				d: "M0 0h24v24H0z",
				fill: "none"
			}),
			(0, import_jsx_runtime.jsx)("path", { d: "M11.217 19.384a3.501 3.501 0 0 0 6.783 -1.217v-5.167l-6 -3.35" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M5.214 15.014a3.501 3.501 0 0 0 4.446 5.266l4.34 -2.534v-6.946" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M6 7.63c-1.391 -.236 -2.787 .395 -3.534 1.689a3.474 3.474 0 0 0 1.271 4.745l4.263 2.514l6 -3.348" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M12.783 4.616a3.501 3.501 0 0 0 -6.783 1.217v5.067l6 3.45" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M18.786 8.986a3.501 3.501 0 0 0 -4.446 -5.266l-4.34 2.534v6.946" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M18 16.302c1.391 .236 2.787 -.395 3.534 -1.689a3.474 3.474 0 0 0 -1.271 -4.745l-4.308 -2.514l-5.955 3.42" })
		]
	}), F);
	N4 = R((0, import_jsx_runtime.jsxs)("g", {
		stroke: "currentColor",
		fill: "none",
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				stroke: "none",
				d: "M0 0h24v24H0z",
				fill: "none"
			}),
			(0, import_jsx_runtime.jsx)("path", { d: "M4 8v-2a2 2 0 0 1 2 -2h2" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M4 16v2a2 2 0 0 0 2 2h2" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M16 4h2a2 2 0 0 1 2 2v2" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M16 20h2a2 2 0 0 0 2 -2v-2" })
		]
	}), F), F4 = R((0, import_jsx_runtime.jsxs)("g", {
		stroke: "currentColor",
		fill: "none",
		strokeWidth: 1.5,
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				stroke: "none",
				d: "M0 0h24v24H0z",
				fill: "none"
			}),
			(0, import_jsx_runtime.jsx)("path", { d: "M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" })
		]
	}), F), B4 = R((0, import_jsx_runtime.jsxs)("g", {
		stroke: "currentColor",
		fill: "none",
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				stroke: "none",
				d: "M0 0h24v24H0z",
				fill: "none"
			}),
			(0, import_jsx_runtime.jsx)("path", { d: "M10.585 10.587a2 2 0 0 0 2.829 2.828" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M3 3l18 18" })
		]
	}), F), _4 = R((0, import_jsx_runtime.jsxs)("g", {
		stroke: "currentColor",
		fill: "none",
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				stroke: "none",
				d: "M0 0h24v24H0z",
				fill: "none"
			}),
			(0, import_jsx_runtime.jsx)("path", { d: "M15.5 13a3.5 3.5 0 0 0 -3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1 -7 0v-1.8" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M17.5 16a3.5 3.5 0 0 0 0 -7h-.5" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M19 9.3v-2.8a3.5 3.5 0 0 0 -7 0" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M6.5 16a3.5 3.5 0 0 1 0 -7h.5" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M5 9.3v-2.8a3.5 3.5 0 0 1 7 0v10" })
		]
	}), F), O4 = R((0, import_jsx_runtime.jsxs)("g", {
		strokeWidth: 1.25,
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				stroke: "none",
				d: "M0 0h24v24H0z",
				fill: "none"
			}),
			(0, import_jsx_runtime.jsx)("path", { d: "M15.5 13a3.5 3.5 0 0 0 -3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1 -7 0v-1.8" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M17.5 16a3.5 3.5 0 0 0 0 -7h-.5" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M19 9.3v-2.8a3.5 3.5 0 0 0 -7 0" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M6.5 16a3.5 3.5 0 0 1 0 -7h.5" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M5 9.3v-2.8a3.5 3.5 0 0 1 7 0v10" })
		]
	}), F), A4 = R((0, import_jsx_runtime.jsxs)("g", {
		strokeWidth: 1.5,
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				stroke: "none",
				d: "M0 0h24v24H0z",
				fill: "none"
			}),
			(0, import_jsx_runtime.jsx)("path", { d: "M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M21 21l-6 -6" })
		]
	}), F), K4 = R((0, import_jsx_runtime.jsxs)("g", {
		strokeWidth: 1.5,
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				stroke: "none",
				d: "M0 0h24v24H0z",
				fill: "none"
			}),
			(0, import_jsx_runtime.jsx)("path", { d: "M20.984 12.53a9 9 0 1 0 -7.552 8.355" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M12 7v5l3 3" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M19 16l-2 3h4l-2 3" })
		]
	}), F), H4 = R((0, import_jsx_runtime.jsxs)("g", {
		strokeWidth: 1.5,
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				stroke: "none",
				d: "M0 0h24v24H0z",
				fill: "none"
			}),
			(0, import_jsx_runtime.jsx)("path", { d: "M9 2m0 3a3 3 0 0 1 3 -3h0a3 3 0 0 1 3 3v5a3 3 0 0 1 -3 3h0a3 3 0 0 1 -3 -3z" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M5 10a7 7 0 0 0 14 0" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M8 21l8 0" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M12 17l0 4" })
		]
	}), F), J4 = R((0, import_jsx_runtime.jsxs)("g", {
		strokeWidth: 1.5,
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				stroke: "none",
				d: "M0 0h24v24H0z",
				fill: "none"
			}),
			(0, import_jsx_runtime.jsx)("path", { d: "M3 3l18 18" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M9 5a3 3 0 0 1 6 0v5a3 3 0 0 1 -.13 .874m-2 2a3 3 0 0 1 -3.87 -2.872v-1" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M5 10a7 7 0 0 0 10.846 5.85m2 -2a6.967 6.967 0 0 0 1.152 -3.85" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M8 21l8 0" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M12 17l0 4" })
		]
	}), F), Y4 = R((0, import_jsx_runtime.jsxs)("g", {
		strokeWidth: 1.25,
		children: [(0, import_jsx_runtime.jsx)("path", {
			stroke: "none",
			d: "M0 0h24v24H0z",
			fill: "none"
		}), (0, import_jsx_runtime.jsx)("path", { d: "M13 3l0 7l6 0l-8 11l0 -7l-6 0l8 -11" })]
	}), F), C4 = R((0, import_jsx_runtime.jsxs)("g", { children: [
		(0, import_jsx_runtime.jsx)("path", {
			stroke: "none",
			d: "M0 0h24v24H0z",
			fill: "none"
		}),
		(0, import_jsx_runtime.jsx)("path", { d: "M8 8m0 1a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-6a1 1 0 0 1 -1 -1z" }),
		(0, import_jsx_runtime.jsx)("path", { d: "M12 20v.01" }),
		(0, import_jsx_runtime.jsx)("path", { d: "M16 20v.01" }),
		(0, import_jsx_runtime.jsx)("path", { d: "M8 20v.01" }),
		(0, import_jsx_runtime.jsx)("path", { d: "M4 20v.01" }),
		(0, import_jsx_runtime.jsx)("path", { d: "M4 16v.01" }),
		(0, import_jsx_runtime.jsx)("path", { d: "M4 12v.01" }),
		(0, import_jsx_runtime.jsx)("path", { d: "M4 8v.01" }),
		(0, import_jsx_runtime.jsx)("path", { d: "M4 4v.01" }),
		(0, import_jsx_runtime.jsx)("path", { d: "M8 4v.01" }),
		(0, import_jsx_runtime.jsx)("path", { d: "M12 4v.01" }),
		(0, import_jsx_runtime.jsx)("path", { d: "M16 4v.01" }),
		(0, import_jsx_runtime.jsx)("path", { d: "M20 4v.01" }),
		(0, import_jsx_runtime.jsx)("path", { d: "M20 8v.01" }),
		(0, import_jsx_runtime.jsx)("path", { d: "M20 12v.01" }),
		(0, import_jsx_runtime.jsx)("path", { d: "M20 16v.01" }),
		(0, import_jsx_runtime.jsx)("path", { d: "M20 20v.01" })
	] }), F), V4 = R((0, import_jsx_runtime.jsxs)("g", {
		strokeWidth: 1.25,
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				stroke: "none",
				d: "M0 0h24v24H0z",
				fill: "none"
			}),
			(0, import_jsx_runtime.jsx)("path", { d: "M5 3v18" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M19 21v-18" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M5 7h14" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M5 15h14" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M8 13v4" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M11 13v4" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M16 13v4" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M14 5v4" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M11 5v4" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M8 5v4" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M3 21h18" })
		]
	}), F), q4 = R((0, import_jsx_runtime.jsxs)("g", {
		strokeWidth: 1.25,
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				stroke: "none",
				d: "M0 0h24v24H0z",
				fill: "none"
			}),
			(0, import_jsx_runtime.jsx)("path", { d: "M3 12l18 0" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M7 16l10 0l-10 5l0 -5" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M7 8l10 0l-10 -5l0 5" })
		]
	}), F), X4 = R((0, import_jsx_runtime.jsxs)("g", {
		strokeWidth: 1.25,
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				stroke: "none",
				d: "M0 0h24v24H0z",
				fill: "none"
			}),
			(0, import_jsx_runtime.jsx)("path", { d: "M12 3l0 18" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M16 7l0 10l5 0l-5 -10" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M8 7l0 10l-5 0l5 -10" })
		]
	}), F), G4 = R((0, import_jsx_runtime.jsxs)("g", {
		strokeWidth: 1.25,
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				stroke: "none",
				d: "M0 0h24v24H0z",
				fill: "none"
			}),
			(0, import_jsx_runtime.jsx)("path", { d: "M5 3m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M19 6h1a2 2 0 0 1 2 2a5 5 0 0 1 -5 5l-5 0v2" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M10 15m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" })
		]
	}), F), k4 = R((0, import_jsx_runtime.jsxs)("g", {
		strokeWidth: 1.25,
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				stroke: "none",
				d: "M0 0h24v24H0z",
				fill: "none"
			}),
			(0, import_jsx_runtime.jsx)("path", { d: "M15 15m-5 0a5 5 0 1 0 10 0a5 5 0 1 0 -10 0" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M22 22l-3 -3" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M6 18h-1a2 2 0 0 1 -2 -2v-1" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M3 11v-1" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M3 6v-1a2 2 0 0 1 2 -2h1" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M10 3h1" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M15 3h1a2 2 0 0 1 2 2v1" })
		]
	}), F), Z4 = R((0, import_jsx_runtime.jsxs)("g", {
		strokeWidth: 1.25,
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				stroke: "none",
				d: "M0 0h24v24H0z",
				fill: "none"
			}),
			(0, import_jsx_runtime.jsx)("path", { d: "M14 3v4a1 1 0 0 0 1 1h4" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M4 20.25c0 .414 .336 .75 .75 .75h1.25a1 1 0 0 0 1 -1v-1a1 1 0 0 0 -1 -1h-1a1 1 0 0 1 -1 -1v-1a1 1 0 0 1 1 -1h1.25a.75 .75 0 0 1 .75 .75" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M10 15l2 6l2 -6" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M20 15h-1a2 2 0 0 0 -2 2v2a2 2 0 0 0 2 2h1v-3" })
		]
	}), F), W4 = R((0, import_jsx_runtime.jsxs)("g", {
		strokeWidth: 1.25,
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				stroke: "none",
				d: "M0 0h24v24H0z",
				fill: "none"
			}),
			(0, import_jsx_runtime.jsx)("path", { d: "M14 3v4a1 1 0 0 0 1 1h4" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M20 15h-1a2 2 0 0 0 -2 2v2a2 2 0 0 0 2 2h1v-3" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M5 18h1.5a1.5 1.5 0 0 0 0 -3h-1.5v6" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M11 21v-6l3 6v-6" })
		]
	}), F), z4 = R((0, import_jsx_runtime.jsxs)("g", {
		strokeWidth: 1.25,
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				stroke: "none",
				d: "M0 0h24v24H0z",
				fill: "none"
			}),
			(0, import_jsx_runtime.jsx)("path", { d: "M4 13v-8a2 2 0 0 1 2 -2h1a2 2 0 0 1 2 2v8a2 2 0 0 0 6 0v-8a2 2 0 0 1 2 -2h1a2 2 0 0 1 2 2v8a8 8 0 0 1 -16 0" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M4 8l5 0" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M15 8l4 0" })
		]
	}), F), Q4 = R((0, import_jsx_runtime.jsxs)("g", {
		strokeWidth: 1.25,
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				stroke: "none",
				d: "M0 0h24v24H0z",
				fill: "none"
			}),
			(0, import_jsx_runtime.jsx)("path", { d: "M3 14c.83 .642 2.077 1.017 3.5 1c1.423 .017 2.67 -.358 3.5 -1c.83 -.642 2.077 -1.017 3.5 -1c1.423 -.017 2.67 .358 3.5 1" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M8 3a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M12 3a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M3 10h14v5a6 6 0 0 1 -6 6h-2a6 6 0 0 1 -6 -6v-5z" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M16.746 16.726a3 3 0 1 0 .252 -5.555" })
		]
	}), F), j4 = R((0, import_jsx_runtime.jsxs)("g", {
		stroke: "currentColor",
		children: [(0, import_jsx_runtime.jsx)("path", {
			stroke: "none",
			d: "M0 0h24v24H0z",
			fill: "none"
		}), (0, import_jsx_runtime.jsx)("path", { d: "M3 5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-16a1 1 0 0 1-1-1v-10zM7 20h10M9 16v4M15 16v4" })]
	}), {
		...F,
		strokeWidth: 1.5
	});
	R((0, import_jsx_runtime.jsxs)("g", {
		strokeWidth: 1.5,
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				stroke: "none",
				d: "M0 0h24v24H0z",
				fill: "none"
			}),
			(0, import_jsx_runtime.jsx)("path", { d: "M15 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M21 12h-13l3 -3" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M11 15l-3 -3" })
		]
	}), F);
	ty = R((0, import_jsx_runtime.jsxs)("g", { children: [
		(0, import_jsx_runtime.jsx)("path", {
			stroke: "none",
			d: "M0 0h24v24H0z",
			fill: "none"
		}),
		(0, import_jsx_runtime.jsx)("path", { d: "M2 8a4 4 0 0 1 4 -4h12a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-12a4 4 0 0 1 -4 -4v-8z" }),
		(0, import_jsx_runtime.jsx)("path", { d: "M10 9l5 3l-5 3z" })
	] }), F), ny = R((0, import_jsx_runtime.jsxs)("g", {
		strokeWidth: 1.5,
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				stroke: "none",
				d: "M0 0h24v24H0z",
				fill: "none"
			}),
			(0, import_jsx_runtime.jsx)("path", { d: "M3 6h18" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M3 12h18" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M3 18h18" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M6 3v18" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M12 3v18" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M18 3v18" })
		]
	}), F), ry = R((0, import_jsx_runtime.jsxs)("g", {
		strokeWidth: 1.5,
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				stroke: "none",
				d: "M0 0h24v24H0z",
				fill: "none"
			}),
			(0, import_jsx_runtime.jsx)("path", { d: "M17 3m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M3 17m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M17 5c-6.627 0 -12 5.373 -12 12" })
		]
	}), F), oy = R((0, import_jsx_runtime.jsxs)("g", { children: [
		(0, import_jsx_runtime.jsx)("path", {
			stroke: "none",
			d: "M0 0h24v24H0z",
			fill: "none"
		}),
		(0, import_jsx_runtime.jsx)("path", { d: "M6 18l12 -12" }),
		(0, import_jsx_runtime.jsx)("path", { d: "M18 10v-4h-4" })
	] }), F), iy = R((0, import_jsx_runtime.jsxs)("g", { children: [
		(0, import_jsx_runtime.jsx)("path", {
			stroke: "none",
			d: "M0 0h24v24H0z",
			fill: "none"
		}),
		(0, import_jsx_runtime.jsx)("path", { d: "M4,19L10,19C11.097,19 12,18.097 12,17L12,9C12,7.903 12.903,7 14,7L21,7" }),
		(0, import_jsx_runtime.jsx)("path", { d: "M18 4l3 3l-3 3" })
	] }), F), ay = R((0, import_jsx_runtime.jsxs)("g", { children: [(0, import_jsx_runtime.jsx)("path", { d: "M16,12L20,9L16,6" }), (0, import_jsx_runtime.jsx)("path", { d: "M6 20c0 -6.075 4.925 -11 11 -11h3" })] }), F), sy = R((0, import_jsx_runtime.jsxs)("g", { children: [(0, import_jsx_runtime.jsx)("path", {
		stroke: "none",
		d: "M0 0h24v24H0z",
		fill: "none"
	}), (0, import_jsx_runtime.jsx)("path", { d: "M6 9l6 6l6 -6" })] }), F), dy = R((0, import_jsx_runtime.jsxs)("g", { children: [(0, import_jsx_runtime.jsx)("path", {
		stroke: "none",
		d: "M0 0h24v24H0z",
		fill: "none"
	}), (0, import_jsx_runtime.jsx)("path", { d: "M6 15l6 -6l6 6" })] }), F), cy = R((0, import_jsx_runtime.jsxs)("g", { children: [(0, import_jsx_runtime.jsx)("path", {
		stroke: "none",
		d: "M0 0h24v24H0z",
		fill: "none"
	}), (0, import_jsx_runtime.jsx)("path", { d: "M6 15l6 -6l6 6" })] }), F), ly = R((0, import_jsx_runtime.jsxs)("g", {
		strokeWidth: "1.25",
		children: [
			(0, import_jsx_runtime.jsx)("path", {
				stroke: "none",
				d: "M0 0h24v24H0z",
				fill: "none"
			}),
			(0, import_jsx_runtime.jsx)("path", { d: "M8 5v10a1 1 0 0 0 1 1h10" }),
			(0, import_jsx_runtime.jsx)("path", { d: "M5 8h10a1 1 0 0 1 1 1v10" })
		]
	}), F), Uy = R((0, import_jsx_runtime.jsxs)("g", { children: [
		(0, import_jsx_runtime.jsx)("path", {
			stroke: "none",
			d: "M0 0h24v24H0z",
			fill: "none"
		}),
		(0, import_jsx_runtime.jsx)("path", { d: "M5 5m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" }),
		(0, import_jsx_runtime.jsx)("path", { d: "M19 5m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" }),
		(0, import_jsx_runtime.jsx)("path", { d: "M5 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" }),
		(0, import_jsx_runtime.jsx)("path", { d: "M19 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" }),
		(0, import_jsx_runtime.jsx)("path", { d: "M5 7l0 10" }),
		(0, import_jsx_runtime.jsx)("path", { d: "M7 5l10 0" }),
		(0, import_jsx_runtime.jsx)("path", { d: "M7 19l10 0" }),
		(0, import_jsx_runtime.jsx)("path", { d: "M19 7l0 10" })
	] }), F);
	Fr = {
		[Ie.Excalifont]: {
			metrics: {
				unitsPerEm: 1e3,
				ascender: 886,
				descender: -374,
				lineHeight: 1.25
			},
			icon: Nr
		},
		[Ie.Nunito]: {
			metrics: {
				unitsPerEm: 1e3,
				ascender: 1011,
				descender: -353,
				lineHeight: 1.35
			},
			icon: la
		},
		[Ie["Lilita One"]]: {
			metrics: {
				unitsPerEm: 1e3,
				ascender: 923,
				descender: -220,
				lineHeight: 1.15
			},
			icon: Cd
		},
		[Ie["Comic Shanns"]]: {
			metrics: {
				unitsPerEm: 1e3,
				ascender: 750,
				descender: -250,
				lineHeight: 1.25
			},
			icon: Ua
		},
		[Ie.Virgil]: {
			metrics: {
				unitsPerEm: 1e3,
				ascender: 886,
				descender: -374,
				lineHeight: 1.25
			},
			icon: Nr,
			deprecated: !0
		},
		[Ie.Helvetica]: {
			metrics: {
				unitsPerEm: 2048,
				ascender: 1577,
				descender: -471,
				lineHeight: 1.15
			},
			icon: la,
			deprecated: !0,
			local: !0
		},
		[Ie.Cascadia]: {
			metrics: {
				unitsPerEm: 2048,
				ascender: 1900,
				descender: -480,
				lineHeight: 1.2
			},
			icon: Ua,
			deprecated: !0
		},
		[Ie["Liberation Sans"]]: {
			metrics: {
				unitsPerEm: 2048,
				ascender: 1854,
				descender: -434,
				lineHeight: 1.15
			},
			serverSide: !0
		},
		[Un.Xiaolai]: {
			metrics: {
				unitsPerEm: 1e3,
				ascender: 880,
				descender: -144,
				lineHeight: 1.15
			},
			fallback: !0
		},
		[Un["Segoe UI Emoji"]]: {
			metrics: {
				unitsPerEm: 1e3,
				ascender: 886,
				descender: -374,
				lineHeight: 1.25
			},
			local: !0,
			fallback: !0
		}
	}, tn = {
		LATIN: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
		LATIN_EXT: "U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF",
		CYRILIC_EXT: "U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F",
		CYRILIC: "U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116",
		VIETNAMESE: "U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB"
	}, Wn = "local:";
	Yo = class extends Error {
		constructor(t = "Couldn't export canvas.", n = "CANVAS_ERROR") {
			super(), this.name = n, this.message = t;
		}
	}, Co = class extends DOMException {
		constructor(t = "Request Aborted") {
			super(t, "AbortError");
		}
	}, nn = class extends Error {
		constructor(n = "Image Scene Data Error", r = "IMAGE_SCENE_DATA_ERROR") {
			super(n);
			i$1(this, "code");
			this.name = "EncodingError", this.code = r;
		}
	}, Vo = class extends Error {
		constructor() {
			super(...arguments);
			i$1(this, "code", "ELEMENT_HAS_INVALID_INDEX");
		}
	}, zn = class extends Error {
		constructor(n = "Worker URL is not defined!", r = "WORKER_URL_NOT_DEFINED") {
			super(n);
			i$1(this, "code");
			this.name = "WorkerUrlNotDefinedError", this.code = r;
		}
	}, Qn = class extends Error {
		constructor(n = "Worker has to be in a separate chunk!", r = "WORKER_IN_THE_MAIN_CHUNK") {
			super(n);
			i$1(this, "code");
			this.name = "WorkerInTheMainChunkError", this.code = r;
		}
	}, Br = class extends Error {
		constructor(t) {
			super(t), this.name = "ExcalidrawError";
		}
	};
	fa = class {
		constructor(t) {
			i$1(this, "instance");
			i$1(this, "debounceTerminate");
			this.instance = new Worker(t, { type: "module" });
		}
	}, qo = class e {
		constructor(t, n) {
			i$1(this, "idleWorkers", /* @__PURE__ */ new Set());
			i$1(this, "workerUrl");
			i$1(this, "workerTTL");
			this.workerUrl = t, this.workerTTL = n.ttl || 1e3;
		}
		static create(t, n = {}) {
			if (!t) throw new zn();
			if (!import.meta.url || t.toString() === import.meta.url) throw new Qn();
			return new e(t, n);
		}
		async postMessage(t, n) {
			let r, o = Array.from(this.idleWorkers).shift();
			return o ? (this.idleWorkers.delete(o), r = o) : r = await this.createWorker(), new Promise((i, a) => {
				r.instance.onmessage = this.onMessageHandler(r, i), r.instance.onerror = this.onErrorHandler(r, a), r.instance.postMessage(t, n), r.debounceTerminate(() => a(/* @__PURE__ */ new Error(`Active worker did not respond for ${this.workerTTL}ms!`)));
			});
		}
		async clear() {
			for (let t of this.idleWorkers) t.debounceTerminate.cancel(), t.instance.terminate();
			this.idleWorkers.clear();
		}
		async createWorker() {
			let t = new fa(this.workerUrl);
			return t.debounceTerminate = $o((n) => {
				t.instance.terminate(), this.idleWorkers.has(t) ? (this.idleWorkers.delete(t), console.debug("Job finished! Idle worker has been released from the pool.")) : n ? n() : console.error("Worker has been terminated!");
			}, this.workerTTL), t;
		}
		onMessageHandler(t, n) {
			return (r) => {
				t.debounceTerminate(), this.idleWorkers.add(t), n(r.data);
			};
		}
		onErrorHandler(t, n) {
			return (r) => {
				t.debounceTerminate(() => n(r)), t.debounceTerminate.flush(), this.clear();
			};
		}
	};
	Vd = typeof Worker < "u", qd = async (e, t) => {
		let { Commands: n, subsetToBase64: r, toBase64: o } = await z6();
		return Vd ? mn(async () => {
			try {
				let i = await Q6(), a = e.slice(0);
				return o(await i.postMessage({
					command: n.Subset,
					arrayBuffer: a,
					codePoints: t
				}, { transfer: [a] }));
			} catch (i) {
				return Vd = !1, bd() && (i instanceof zn || i instanceof Qn) || console.error("Failed to use workers for subsetting, falling back to the main thread.", i), r(e, t);
			}
		}) : r(e, t);
	}, pa = null, ua = null, W6 = async () => (pa || (pa = __vitePreload(() => import("./subset-worker.chunk-BlAHLP4D.js"), __vite__mapDeps([7,1,8,9,10,11]), import.meta.url)), pa), z6 = async () => (ua || (ua = __vitePreload(() => import("./subset-shared.chunk-Da7L08kE.js"), __vite__mapDeps([12,1,8,9,10,11]), import.meta.url)), ua), ma = null, Q6 = () => (ma || (ma = mn(async () => {
		let { WorkerUrl: e } = await W6();
		return qo.create(e);
	})), ma);
	jn = class jn {
		constructor(t, n, r) {
			i$1(this, "urls");
			i$1(this, "fontFace");
			this.urls = jn.createUrls(n);
			let o = this.urls.map((i) => `url(${i}) ${jn.getFormat(i)}`).join(", ");
			this.fontFace = new FontFace(t, o, {
				display: "swap",
				style: "normal",
				weight: "400",
				...r
			});
		}
		toCSS(t) {
			if (!this.getUnicodeRangeRegex().test(t)) return;
			let n = Array.from(t).map((r) => r.codePointAt(0));
			return this.getContent(n).then((r) => `@font-face { font-family: ${this.fontFace.family}; src: url(${r}); }`);
		}
		async getContent(t) {
			let n = 0, r = [];
			for (; n < this.urls.length;) {
				let o = this.urls[n];
				try {
					return await qd(await this.fetchFont(o), t);
				} catch (i) {
					r.push(`"${o.toString()}" returned error "${i}"`);
				}
				n++;
			}
			return console.error(`Failed to fetch font family "${this.fontFace.family}"`, JSON.stringify(r, void 0, 2)), this.urls.length ? this.urls[this.urls.length - 1].toString() : "";
		}
		fetchFont(t) {
			return mn(async () => {
				let n = await fetch(t, {
					cache: "force-cache",
					headers: { Accept: "font/woff2" }
				});
				if (!n.ok) {
					let o = t instanceof URL ? t.toString() : "dataurl";
					throw new Error(`Failed to fetch "${o}": ${n.statusText}`);
				}
				return await n.arrayBuffer();
			});
		}
		getUnicodeRangeRegex() {
			let t = this.fontFace.unicodeRange.split(/,\s*/).map((n) => {
				let [r, o] = n.replace("U+", "").split("-");
				return o ? `\\u{${r}}-\\u{${o}}` : `\\u{${r}}`;
			}).join("");
			return new RegExp(`[${t}]`, "u");
		}
		static createUrls(t) {
			if (t.startsWith("data")) return [t];
			if (t.startsWith(Wn)) return [];
			if (t.startsWith("http")) return [new URL(t)];
			let n = t.replace(/^\/+/, ""), r = [];
			if (typeof window.EXCALIDRAW_ASSET_PATH == "string") {
				let o = this.normalizeBaseUrl(window.EXCALIDRAW_ASSET_PATH);
				r.push(new URL(n, o));
			} else Array.isArray(window.EXCALIDRAW_ASSET_PATH) && window.EXCALIDRAW_ASSET_PATH.forEach((o) => {
				let i = this.normalizeBaseUrl(o);
				r.push(new URL(n, i));
			});
			return r.push(new URL(n, jn.ASSETS_FALLBACK_URL)), r;
		}
		static getFormat(t) {
			if (!(t instanceof URL)) return "";
			try {
				let n = new URL(t).pathname.split(".");
				return n.length === 1 ? "" : `format('${n.pop()}')`;
			} catch {
				return "";
			}
		}
		static normalizeBaseUrl(t) {
			let n = t;
			return /^\.?\//.test(n) && (n = new URL(n.replace(/^\.?\/+/, ""), window?.location?.origin).toString()), n = `${n.replace(/\/+$/, "")}/`, n;
		}
	};
	i$1(jn, "ASSETS_FALLBACK_URL", `https://esm.sh/${c.PKG_NAME ? `${c.PKG_NAME}@${c.PKG_VERSION}` : "@excalidraw/excalidraw"}/dist/prod/`);
	Xo = jn;
	Gd = [{ uri: "./fonts/Cascadia/CascadiaCode-Regular.woff2" }];
	Qd = [
		{
			uri: "./fonts/ComicShanns/ComicShanns-Regular-279a7b317d12eb88de06167bd672b4b4.woff2",
			descriptors: { unicodeRange: "U+20-7e,U+a1-a6,U+a8,U+ab-ac,U+af-b1,U+b4,U+b8,U+bb-bc,U+bf-cf,U+d1-d7,U+d9-de,U+e0-ef,U+f1-f7,U+f9-ff,U+131,U+152-153,U+2c6,U+2da,U+2dc,U+2013-2014,U+2018-201a,U+201c-201d,U+2020-2022,U+2026,U+2039-203a,U+2044,U+20ac,U+2191,U+2193,U+2212" }
		},
		{
			uri: "./fonts/ComicShanns/ComicShanns-Regular-fcb0fc02dcbee4c9846b3e2508668039.woff2",
			descriptors: { unicodeRange: "U+100-10f,U+112-125,U+128-130,U+134-137,U+139-13c,U+141-148,U+14c-151,U+154-161,U+164-165,U+168-17f,U+1bf,U+1f7,U+218-21b,U+237,U+1e80-1e85,U+1ef2-1ef3,U+a75b" }
		},
		{
			uri: "./fonts/ComicShanns/ComicShanns-Regular-dc6a8806fa96795d7b3be5026f989a17.woff2",
			descriptors: { unicodeRange: "U+2c7,U+2d8-2d9,U+2db,U+2dd,U+315,U+2190,U+2192,U+2200,U+2203-2204,U+2264-2265,U+f6c3" }
		},
		{
			uri: "./fonts/ComicShanns/ComicShanns-Regular-6e066e8de2ac57ea9283adb9c24d7f0c.woff2",
			descriptors: { unicodeRange: "U+3bb" }
		}
	];
	jd = [{ uri: Wn }];
	sc = [
		{
			uri: "./fonts/Excalifont/Excalifont-Regular-a88b72a24fb54c9f94e3b5fdaa7481c9.woff2",
			descriptors: { unicodeRange: "U+20-7e,U+a0-a3,U+a5-a6,U+a8-ab,U+ad-b1,U+b4,U+b6-b8,U+ba-ff,U+131,U+152-153,U+2bc,U+2c6,U+2da,U+2dc,U+304,U+308,U+2013-2014,U+2018-201a,U+201c-201e,U+2020,U+2022,U+2024-2026,U+2030,U+2039-203a,U+20ac,U+2122,U+2212" }
		},
		{
			uri: "./fonts/Excalifont/Excalifont-Regular-be310b9bcd4f1a43f571c46df7809174.woff2",
			descriptors: { unicodeRange: "U+100-130,U+132-137,U+139-149,U+14c-151,U+154-17e,U+192,U+1fc-1ff,U+218-21b,U+237,U+1e80-1e85,U+1ef2-1ef3,U+2113" }
		},
		{
			uri: "./fonts/Excalifont/Excalifont-Regular-b9dcf9d2e50a1eaf42fc664b50a3fd0d.woff2",
			descriptors: { unicodeRange: "U+400-45f,U+490-491,U+2116" }
		},
		{
			uri: "./fonts/Excalifont/Excalifont-Regular-41b173a47b57366892116a575a43e2b6.woff2",
			descriptors: { unicodeRange: "U+37e,U+384-38a,U+38c,U+38e-393,U+395-3a1,U+3a3-3a8,U+3aa-3cf,U+3d7" }
		},
		{
			uri: "./fonts/Excalifont/Excalifont-Regular-3f2c5db56cc93c5a6873b1361d730c16.woff2",
			descriptors: { unicodeRange: "U+2c7,U+2d8-2d9,U+2db,U+2dd,U+302,U+306-307,U+30a-30c,U+326-328,U+212e,U+2211,U+fb01-fb02" }
		},
		{
			uri: "./fonts/Excalifont/Excalifont-Regular-349fac6ca4700ffec595a7150a0d1e1d.woff2",
			descriptors: { unicodeRange: "U+462-463,U+472-475,U+4d8-4d9,U+4e2-4e3,U+4e6-4e9,U+4ee-4ef" }
		},
		{
			uri: "./fonts/Excalifont/Excalifont-Regular-623ccf21b21ef6b3a0d87738f77eb071.woff2",
			descriptors: { unicodeRange: "U+300-301,U+303" }
		}
	];
	dc = [{ uri: Wn }];
	lc = [{ uri: "./fonts/Liberation/LiberationSans-Regular.woff2" }];
	pc = [{
		uri: "./fonts/Lilita/Lilita-Regular-i7dPIFZ9Zz-WBtRtedDbYE98RXi4EwSsbg.woff2",
		descriptors: { unicodeRange: tn.LATIN_EXT }
	}, {
		uri: "./fonts/Lilita/Lilita-Regular-i7dPIFZ9Zz-WBtRtedDbYEF8RXi4EwQ.woff2",
		descriptors: { unicodeRange: tn.LATIN }
	}];
	xc = [
		{
			uri: "./fonts/Nunito/Nunito-Regular-XRXI3I6Li01BKofiOc5wtlZ2di8HDIkhdTk3j6zbXWjgevT5.woff2",
			descriptors: {
				unicodeRange: tn.CYRILIC_EXT,
				weight: "500"
			}
		},
		{
			uri: "./fonts/Nunito/Nunito-Regular-XRXI3I6Li01BKofiOc5wtlZ2di8HDIkhdTA3j6zbXWjgevT5.woff2",
			descriptors: {
				unicodeRange: tn.CYRILIC,
				weight: "500"
			}
		},
		{
			uri: "./fonts/Nunito/Nunito-Regular-XRXI3I6Li01BKofiOc5wtlZ2di8HDIkhdTs3j6zbXWjgevT5.woff2",
			descriptors: {
				unicodeRange: tn.VIETNAMESE,
				weight: "500"
			}
		},
		{
			uri: "./fonts/Nunito/Nunito-Regular-XRXI3I6Li01BKofiOc5wtlZ2di8HDIkhdTo3j6zbXWjgevT5.woff2",
			descriptors: {
				unicodeRange: tn.LATIN_EXT,
				weight: "500"
			}
		},
		{
			uri: "./fonts/Nunito/Nunito-Regular-XRXI3I6Li01BKofiOc5wtlZ2di8HDIkhdTQ3j6zbXWjgeg.woff2",
			descriptors: {
				unicodeRange: tn.LATIN,
				weight: "500"
			}
		}
	];
	yc = [{ uri: "./fonts/Virgil/Virgil-Regular.woff2" }];
	b1 = [
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-09850c4077f3fffe707905872e0e2460.woff2",
			descriptors: { unicodeRange: "U+f9b8-fa6d,U+fe32,U+fe45-fe4f,U+ff02-ff0b,U+ff0d-ff1e,U+ff20-ff2a" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-7eb9fffd1aa890d07d0f88cc82e6cfe4.woff2",
			descriptors: { unicodeRange: "U+20dd-20de,U+25ef,U+ff2b-ffbe,U+ffc2-ffc7,U+ffca-ffcf,U+ffd2-ffd7,U+ffda-ffdc,U+ffe0-ffe6,U+ffe8-ffee" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-60a3089806700d379f11827ee9843b6b.woff2",
			descriptors: { unicodeRange: "U+d7eb-d7fb,U+f900-f9b7" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-6fe5c5973cc06f74b2387a631ea36b88.woff2",
			descriptors: { unicodeRange: "U+d6f2-d7a3,U+d7b0-d7c6,U+d7cb-d7ea" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-b96d9226ce77ec94ceca043d712182e6.woff2",
			descriptors: { unicodeRange: "U+d609-d6f1" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-6ae5b42180ad70b971c91e7eefb8eba2.woff2",
			descriptors: { unicodeRange: "U+d520-d608" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-a4c34be6d42152e64b0df90bc4607f64.woff2",
			descriptors: { unicodeRange: "U+d437-d51f" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-c69f61a4ab18d0488c8d1fc12e7028e8.woff2",
			descriptors: { unicodeRange: "U+d34e-d436" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-e3fcf5180fd466c8915c4e8069491054.woff2",
			descriptors: { unicodeRange: "U+d265-d34d" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-c1f94158256bb1f3bf665b053d895af9.woff2",
			descriptors: { unicodeRange: "U+d17c-d264" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-544fc28abe2c5c30e62383fd4dac255f.woff2",
			descriptors: { unicodeRange: "U+d093-d17b" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-7197d6fda6cba7c3874c53d6381ca239.woff2",
			descriptors: { unicodeRange: "U+cfaa-d092" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-70c2eb8d64e71a42a834eb857ea9df51.woff2",
			descriptors: { unicodeRange: "U+cec1-cfa9" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-069e77aac84590e2e991d0a0176d34f2.woff2",
			descriptors: { unicodeRange: "U+cdd8-cec0" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-41521fade99856108931b4768b1b2648.woff2",
			descriptors: { unicodeRange: "U+ccf1-cdd7" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-a004ddfcb26e67bd6e678c8ed19e25ce.woff2",
			descriptors: { unicodeRange: "U+cc08-ccf0" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-04b718e5623574919c8b0dea5f301444.woff2",
			descriptors: { unicodeRange: "U+cb43-cc07" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-7e4bde7e9c7f84cd34d8a845e384c746.woff2",
			descriptors: { unicodeRange: "U+ca83-cb42" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-23686f7f29da6e8008c36dd3a80c83d6.woff2",
			descriptors: { unicodeRange: "U+c9a1-ca82" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-69c09cc5fa3e55c74fc4821f76909cc3.woff2",
			descriptors: { unicodeRange: "U+c8b8-c9a0" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-25b7f38e18f035f96cb5e547bd2bd08c.woff2",
			descriptors: { unicodeRange: "U+c7cf-c8b7" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-ba3de316d63c7e339987b16f41a0b879.woff2",
			descriptors: { unicodeRange: "U+c6e6-c7ce" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-12b52b58eb3df36804b9a654ec9ee194.woff2",
			descriptors: { unicodeRange: "U+c5fd-c6e5" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-b1220a3c61f85cc0408deedb4c5f57a2.woff2",
			descriptors: { unicodeRange: "U+c514-c5fc" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-4535823663ad81405188a528d8f2b1a2.woff2",
			descriptors: { unicodeRange: "U+c42b-c513" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-3eaa538115d76932653c21d8dc28f207.woff2",
			descriptors: { unicodeRange: "U+c341-c34e,U+c350-c42a" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-7e929f262f30c8ee78bf398150b1a7cd.woff2",
			descriptors: { unicodeRange: "U+c258-c340" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-73e309718fd16cea44b4d54a33581811.woff2",
			descriptors: { unicodeRange: "U+c16f-c257" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-9eb5a99df4e76ac3363453ac9ca288b1.woff2",
			descriptors: { unicodeRange: "U+c086-c16e" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-3e63ed8162808a9e425ed80a8bc79114.woff2",
			descriptors: { unicodeRange: "U+bf9d-c085" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-cb17fc3db95f6d139afc9d31a8e93293.woff2",
			descriptors: { unicodeRange: "U+beb4-bf9c" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-c8b71798409ccc126ee264a00aadcf21.woff2",
			descriptors: { unicodeRange: "U+bdcb-beb3" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-11c345711937f0ba4b8f7b6b919c8440.woff2",
			descriptors: { unicodeRange: "U+bce2-bdca" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-e480d9c614742d05f0e78f274f1e69e6.woff2",
			descriptors: { unicodeRange: "U+bbf9-bce1" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-95429962233afd82db1c27df1500a28c.woff2",
			descriptors: { unicodeRange: "U+bb10-bbf8" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-2cf96d082d35ea3d8106851223ad0d16.woff2",
			descriptors: { unicodeRange: "U+ba27-bb0f" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-2d43040e86ff03ba677f6f9c04cd0805.woff2",
			descriptors: { unicodeRange: "U+b93e-ba26" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-2a26d20a23b00898ce82f09d2ee47c3f.woff2",
			descriptors: { unicodeRange: "U+b855-b93d" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-a365e82ed54697a52f27adcea1315fe8.woff2",
			descriptors: { unicodeRange: "U+b76c-b854" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-f5d079153c99a25b9be5b8583c4cc8a7.woff2",
			descriptors: { unicodeRange: "U+b683-b76b" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-10a7ae9a371830a80c3d844acf1c02d7.woff2",
			descriptors: { unicodeRange: "U+b59a-b682" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-e4bca6cfa53e499cae0a6be4894a90e9.woff2",
			descriptors: { unicodeRange: "U+b4b1-b599" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-60a41c7e1c68f22424e6d22df544bc82.woff2",
			descriptors: { unicodeRange: "U+11fb-11ff,U+b3cd-b4b0" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-7ab2bed91166a9dca83a5ebfbe2a7f38.woff2",
			descriptors: { unicodeRange: "U+11e6-11fa,U+b2f9-b3cc" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-670ba603758d94268e8606f240a42e12.woff2",
			descriptors: { unicodeRange: "U+11d1-11e5,U+b225-b2f8" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-e656f091b9dc4709722c9f4b84d3c797.woff2",
			descriptors: { unicodeRange: "U+11bc-11d0,U+b151-b224" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-15dc6d811c9cd078f9086a740d5a1038.woff2",
			descriptors: { unicodeRange: "U+11a7-11bb,U+b07d-b150" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-f0f13b5c60e0af5553bd359f5513be1b.woff2",
			descriptors: { unicodeRange: "U+1191-11a6,U+afaa-b07c" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-8c2f33cee3993174f7e87c28e4bf42ee.woff2",
			descriptors: { unicodeRange: "U+117c-1190,U+aed6-afa9" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-761d05e3cd968cf574166867998ef06a.woff2",
			descriptors: { unicodeRange: "U+1167-117b,U+ae02-aed5" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-642b26e2e5f5fb780b51b593dbc8c851.woff2",
			descriptors: { unicodeRange: "U+1152-115e,U+1160-1166,U+ad2d-ae01" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-5572b3513ba8df57a3d5d7303ee6b11b.woff2",
			descriptors: { unicodeRange: "U+113d-1151,U+ac59-ad2c" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-3c9de2ae0ea4bc91a510942dfa4be8d2.woff2",
			descriptors: { unicodeRange: "U+1100-113c,U+9f95-9f98,U+9f9c-9f9e,U+9fa1-9fce,U+9fd0,U+a960-a97c,U+ac00-ac58" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-671a2c20b1eb9e4ef8a192833940e319.woff2",
			descriptors: { unicodeRange: "U+9771-9772,U+9775,U+9777-977b,U+977d-9784,U+9786-978a,U+978c,U+978e-9790,U+9793,U+9795-9797,U+9799-979f,U+97a1-97a2,U+97a4-97aa,U+97ac,U+97ae,U+97b0-97b1,U+97b3,U+97b5-97e5,U+97e8,U+97ee-97f2,U+97f4,U+97f7-982d" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-4dc6d5f188d5c96d44815cd1e81aa885.woff2",
			descriptors: { unicodeRange: "U+9491,U+9496,U+9498,U+94c7,U+94cf,U+94d3-94d4,U+94da,U+94e6,U+94fb,U+951c,U+9520,U+9527,U+9533,U+953d,U+9543,U+9548,U+954b,U+9555,U+955a,U+9560,U+956e,U+9574-9575,U+9577-957e,U+9580-95e7,U+95ec,U+95ff,U+9607,U+9613,U+9618,U+961b,U+961e,U+9620,U+9623-9629,U+962b-962d,U+962f-9630,U+9637-963a,U+963e,U+9641,U+9643,U+964a,U+964e-964f,U+9651-9653,U+9656-965a,U+965c-965e,U+9660,U+9663,U+9665-9666,U+966b,U+966d-9671,U+9673,U+9678-9684,U+9687,U+9689-968a,U+968c,U+968e,U+9691-9693" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-ce4884f96f11589608b76b726a755803.woff2",
			descriptors: { unicodeRange: "U+923c-9273,U+9275-928d,U+928f-92ad,U+92af-92c7,U+92c9-92ee" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-8f476c4c99813d57cbe6eca4727388ad.woff2",
			descriptors: { unicodeRange: "U+9159,U+915b-915c,U+915f-9160,U+9166-9168,U+916b,U+916d,U+9173,U+917a-917c,U+9180-9184,U+9186,U+9188,U+918a,U+918e-918f,U+9193-9199,U+919c-91a1,U+91a4-91a9,U+91ab-91ac,U+91b0-91b3,U+91b6-91b9,U+91bb-91c6,U+91c8,U+91cb,U+91d0,U+91d2-91db,U+91dd-923b" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-5935a5775af3d5c6307ac667bd9ae74e.woff2",
			descriptors: { unicodeRange: "U+902b-902c,U+9030-9034,U+9037,U+9039-903a,U+903d,U+903f-9040,U+9043,U+9045-9046,U+9048-904c,U+904e,U+9054-9056,U+9059-905a,U+905c-9061,U+9064,U+9066-9067,U+9069-906c,U+906f-9073,U+9076-907c,U+907e,U+9081,U+9084-9087,U+9089-908a,U+908c-9090,U+9092,U+9094,U+9096,U+9098,U+909a,U+909c,U+909e-90a0,U+90a4-90a5,U+90a7-90a9,U+90ab,U+90ad,U+90b2,U+90b7,U+90bc-90bd,U+90bf-90c0,U+90c2-90c3,U+90c6,U+90c8-90c9,U+90cb-90cd,U+90d2,U+90d4-90d6,U+90d8-90da,U+90de-90e0,U+90e3-90e5,U+90e9-90ea,U+90ec,U+90ee,U+90f0-90f3,U+90f5-90f7,U+90f9-90fc,U+90ff-9101,U+9103,U+9105-9118,U+911a-911d,U+911f-9121,U+9124-912e,U+9130,U+9132-9138,U+913a-9142,U+9144-9145,U+9147-9148,U+9151,U+9153-9156,U+9158" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-79f007c1c6d07557120982951ea67998.woff2",
			descriptors: { unicodeRange: "U+8f03-8f65,U+8f6a,U+8f80,U+8f8c,U+8f92,U+8f9d,U+8fa0-8fa2,U+8fa4-8fa7,U+8faa,U+8fac-8faf,U+8fb2-8fb5,U+8fb7-8fb8,U+8fba-8fbc,U+8fbf-8fc0,U+8fc3,U+8fc6,U+8fc9-8fcd,U+8fcf,U+8fd2,U+8fd6-8fd7,U+8fda,U+8fe0-8fe1,U+8fe3,U+8fe7,U+8fec,U+8fef,U+8ff1-8ff2,U+8ff4-8ff6,U+8ffa-8ffc,U+8ffe-8fff,U+9007-9008,U+900c,U+900e,U+9013,U+9015,U+9018-9019,U+901c,U+9023-9025,U+9027-902a" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-bafff7a14c27403dcc6cf1432e8ea836.woff2",
			descriptors: { unicodeRange: "U+8d03-8d1c,U+8d20,U+8d51-8d52,U+8d57,U+8d5f,U+8d65,U+8d68-8d6a,U+8d6c,U+8d6e-8d6f,U+8d71-8d72,U+8d78-8d80,U+8d82-8d83,U+8d86-8d89,U+8d8c-8d90,U+8d92-8d93,U+8d95-8d9e,U+8da0-8da2,U+8da4-8db0,U+8db2,U+8db6-8db7,U+8db9,U+8dbb,U+8dbd,U+8dc0-8dc2,U+8dc5,U+8dc7-8dca,U+8dcd,U+8dd0,U+8dd2-8dd5,U+8dd8-8dd9,U+8ddc,U+8de0-8de2,U+8de5-8de7,U+8de9,U+8ded-8dee,U+8df0-8df2,U+8df4,U+8df6,U+8dfc,U+8dfe-8e04,U+8e06-8e08,U+8e0b,U+8e0d-8e0e,U+8e10-8e13,U+8e15-8e1c,U+8e20-8e21,U+8e24-8e28,U+8e2b,U+8e2d,U+8e30,U+8e32-8e34,U+8e36-8e38,U+8e3b-8e3c,U+8e3e-8e3f,U+8e43,U+8e45-8e46" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-543fa46ace099a7099dad69123399400.woff2",
			descriptors: { unicodeRange: "U+8bea,U+8c09,U+8c1e,U+8c38-8c40,U+8c42-8c45,U+8c48,U+8c4a-8c4b,U+8c4d-8c54,U+8c56-8c59,U+8c5b-8c60,U+8c63-8c69,U+8c6c-8c72,U+8c74-8c77,U+8c7b-8c81,U+8c83-8c84,U+8c86-8c88,U+8c8b,U+8c8d-8c93,U+8c95-8c97,U+8c99-8d02" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-4ddc14ed3eb0c3e46364317dfc0144a3.woff2",
			descriptors: { unicodeRange: "U+8a64-8a78,U+8a7a-8a88,U+8a8b-8a92,U+8a94-8b06,U+8b08-8b1b" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-0fa55a080fcd0f9dc2e0b0058b793df8.woff2",
			descriptors: { unicodeRange: "U+8987-89c0,U+89c3,U+89cd,U+89d3-89d5,U+89d7-89d9,U+89db,U+89dd,U+89df-89e2,U+89e4,U+89e7-89ea,U+89ec-89ee,U+89f0-89f2,U+89f4-89ff,U+8a01-8a06,U+8a08-8a3d,U+8a3f-8a47,U+8a49-8a63" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-66493ba5a8367f2928812f446f47b56a.woff2",
			descriptors: { unicodeRange: "U+87e3-87e4,U+87e6-87e9,U+87eb-87ed,U+87ef-87f8,U+87fa-87fd,U+87ff-8802,U+8804-8809,U+880b-8812,U+8814,U+8817-881a,U+881c-8820,U+8823-8831,U+8833-8838,U+883a-883b,U+883d-883f,U+8841-8843,U+8846-884b,U+884e-8853,U+8855-8856,U+8858,U+885a-8860,U+8866-8867,U+886a,U+886d,U+886f,U+8871,U+8873-8876,U+8878-887c,U+8880,U+8883,U+8886-8887,U+8889-888a,U+888c,U+888e-8891,U+8893-8895,U+8897-889b,U+889d-88a1,U+88a3,U+88a5-88aa,U+88ac,U+88ae-88b0,U+88b2-88b6,U+88b8-88bb" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-57862b464a55b18c7bf234ce22907d73.woff2",
			descriptors: { unicodeRange: "U+86e7-86e8,U+86ea-86ec,U+86ef,U+86f5-86f7,U+86fa-86fd,U+86ff,U+8701,U+8704-8706,U+870b-870c,U+870e-8711,U+8714,U+8716,U+8719,U+871b,U+871d,U+871f-8720,U+8724,U+8726-8728,U+872a-872d,U+872f-8730,U+8732-8733,U+8735-8736,U+8738-873a,U+873c-873d,U+8740-8746,U+874a-874b,U+874d,U+874f-8752,U+8754-8756,U+8758,U+875a-875f,U+8761-8762,U+8766-876d,U+876f,U+8771-8773,U+8775,U+8777-877a,U+877f-8781,U+8784,U+8786-8787,U+8789-878a,U+878c,U+878e-8792,U+8794-8796,U+8798-879e,U+87a0-87a7,U+87a9-87aa,U+87ae,U+87b0-87b2,U+87b4,U+87b6-87b9,U+87bb-87bc,U+87be-87bf,U+87c1-87c5,U+87c7-87c9,U+87cc-87d0,U+87d4-87da,U+87dc-87df,U+87e1-87e2" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-8d3bcabb847b56243b16afe62adaaf21.woff2",
			descriptors: { unicodeRange: "U+8604,U+8606-8610,U+8612-8615,U+8617-8626,U+8628,U+862a-8637,U+8639-863b,U+863d-864c,U+8652-8653,U+8655-8659,U+865b-865d,U+865f-8661,U+8663-866a,U+866d,U+866f-8670,U+8672-8678,U+8683-8689,U+868e-8692,U+8694,U+8696-869b,U+869e-86a2,U+86a5-86a6,U+86ab,U+86ad-86ae,U+86b2-86b3,U+86b7-86b9,U+86bb-86bf,U+86c1-86c3,U+86c5,U+86c8,U+86cc-86cd,U+86d2-86d3,U+86d5-86d7,U+86da,U+86dc-86dd,U+86e0-86e3,U+86e5-86e6" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-2b77e8ebfb2367ab2662396a60e7d320.woff2",
			descriptors: { unicodeRange: "U+8456,U+8458,U+845d-8460,U+8462,U+8464-8468,U+846a,U+846e-8470,U+8472,U+8474,U+8477,U+8479,U+847b-8481,U+8483-8486,U+848a,U+848d,U+848f-8496,U+8498,U+849a-849b,U+849d-84a0,U+84a2-84ae,U+84b0-84b1,U+84b3,U+84b5-84b7,U+84bb-84bc,U+84be,U+84c0,U+84c2-84c3,U+84c5-84c8,U+84cb-84cc,U+84ce-84cf,U+84d2,U+84d4-84d5,U+84d7-84dc,U+84de,U+84e1-84e2,U+84e4,U+84e7-84eb,U+84ed-84ef,U+84f1-84fb,U+84fd-84fe,U+8500-850b,U+850d-8510,U+8512,U+8514-8516,U+8518-8519,U+851b-851e,U+8520,U+8522-852a,U+852d-8536,U+853e-8542,U+8544-8547,U+854b-854f" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-0b5d723fdc4e249c140f0909e87d03b4.woff2",
			descriptors: { unicodeRange: "U+82c2-82c3,U+82c5-82c6,U+82c9,U+82d0,U+82d6,U+82d9-82da,U+82dd,U+82e2,U+82e7-82ea,U+82ec-82ee,U+82f0,U+82f2-82f3,U+82f5-82f6,U+82f8,U+82fa,U+82fc-8300,U+830a-830b,U+830d,U+8310,U+8312-8313,U+8316,U+8318-8319,U+831d-8326,U+8329-832a,U+832e,U+8330,U+8332,U+8337,U+833b,U+833d-833f,U+8341-8342,U+8344-8345,U+8348,U+834a-834e,U+8353,U+8355-8359,U+835d,U+8362,U+8370-8376,U+8379-837a,U+837e-8384,U+8387-8388,U+838a-838d,U+838f-8391,U+8394-8397,U+8399-839a,U+839d,U+839f,U+83a1-83a7,U+83ac-83af,U+83b5,U+83bb,U+83be-83bf,U+83c2-83c4,U+83c6,U+83c8-83c9,U+83cb,U+83cd-83ce,U+83d0-83d3,U+83d5,U+83d7,U+83d9-83db,U+83de,U+83e2-83e4,U+83e6-83e8,U+83eb-83ef,U+83f3-83f7,U+83fa-83fc,U+83fe-8400,U+8402,U+8405,U+8407-840a,U+8410,U+8412-8417,U+8419-841b,U+841e-8423,U+8429-8430,U+8432-8437,U+8439-843b,U+843e-8445,U+8447-8450,U+8452-8455" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-cdbce89e82cc1ab53a2decbf5819278f.woff2",
			descriptors: { unicodeRange: "U+81a4-81a5,U+81a7,U+81a9,U+81ab-81b2,U+81b4-81b9,U+81bc-81bf,U+81c4-81c5,U+81c7-81c9,U+81cb,U+81cd-81e2,U+81e4-81e6,U+81e8-81e9,U+81eb,U+81ee-81f2,U+81f5-81fa,U+81fd,U+81ff,U+8203,U+8207-820b,U+820e-820f,U+8211,U+8213,U+8215-821a,U+821d,U+8220,U+8224-8227,U+8229,U+822e,U+8232,U+823a,U+823c-823d,U+823f-8243,U+8245-8246,U+8248,U+824a,U+824c-824e,U+8250-8257,U+8259,U+825b-825e,U+8260-8267,U+8269-826d,U+8271,U+8275-8278,U+827b-827c,U+8280-8281,U+8283,U+8285-8287,U+8289,U+828c,U+8290,U+8293-8296,U+829a-829b,U+829e,U+82a0,U+82a2-82a3,U+82a7,U+82b2,U+82b5-82b6,U+82ba-82bc,U+82bf-82c0" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-739bc1a567439c7cffcd1614644593d2.woff2",
			descriptors: { unicodeRange: "U+8059,U+805b-8068,U+806b-8070,U+8072-807e,U+8081-8082,U+8085,U+8088,U+808a,U+808d-8092,U+8094-8095,U+8097,U+8099,U+809e,U+80a3,U+80a6-80a8,U+80ac,U+80b0,U+80b3,U+80b5-80b6,U+80b8-80b9,U+80bb,U+80c5,U+80c7-80cb,U+80cf-80d5,U+80d8,U+80df-80e0,U+80e2-80e3,U+80e6,U+80ee,U+80f5,U+80f7,U+80f9,U+80fb,U+80fe-8101,U+8103-8105,U+8107-8108,U+810b-810c,U+8115,U+8117,U+8119,U+811b-811d,U+811f-812b,U+812d-812e,U+8130,U+8133-8135,U+8137,U+8139-813d,U+813f-8145,U+8147,U+8149,U+814d-814f,U+8152,U+8156-8158,U+815b-815f,U+8161-8164,U+8166,U+8168,U+816a-816c,U+816f,U+8172-8173,U+8175-8178,U+8181,U+8183-8187,U+8189,U+818b-818e,U+8190,U+8192-8197,U+8199-819a,U+819e-81a2" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-72252d73220fa3cd856677888cee1635.woff2",
			descriptors: { unicodeRange: "U+7f3c-7f41,U+7f43,U+7f46-7f4f,U+7f52-7f53,U+7f56,U+7f59,U+7f5b-7f5e,U+7f60,U+7f63-7f67,U+7f6b-7f6d,U+7f6f-7f70,U+7f73,U+7f75-7f78,U+7f7a-7f7d,U+7f7f-7f80,U+7f82-7f89,U+7f8b,U+7f8d,U+7f8f-7f93,U+7f95-7f99,U+7f9b-7f9c,U+7fa0,U+7fa2-7fa3,U+7fa5-7fa6,U+7fa8-7fae,U+7fb1,U+7fb3-7fb7,U+7fba-7fbb,U+7fbe,U+7fc0,U+7fc2-7fc4,U+7fc6-7fc9,U+7fcb,U+7fcd,U+7fcf-7fd3,U+7fd6-7fd7,U+7fd9-7fde,U+7fe2-7fe4,U+7fe7-7fe8,U+7fea-7fed,U+7fef,U+7ff2,U+7ff4-7ffa,U+7ffd-7fff,U+8002,U+8007-800a,U+800e-800f,U+8011,U+8013,U+801a-801b,U+801d-801f,U+8021,U+8023-8024,U+802b-8030,U+8032,U+8034,U+8039-803a,U+803c,U+803e,U+8040-8041,U+8044-8045,U+8047-8049,U+804e-8051,U+8053,U+8055-8057" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-08e0dc436ad0ad61ba5558db0674d762.woff2",
			descriptors: { unicodeRange: "U+7cd8,U+7cda-7cdb,U+7cdd-7cde,U+7ce1-7ce7,U+7ce9-7cee,U+7cf0-7cf7,U+7cf9-7cfa,U+7cfc-7d09,U+7d0b-7d1f,U+7d21,U+7d23-7d26,U+7d28-7d2a,U+7d2c-7d2e,U+7d30-7d6d,U+7d6f-7d76,U+7d78-7d94" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-cf6ff4e0f491ca0cf3038187a997b9b4.woff2",
			descriptors: { unicodeRange: "U+7afe,U+7b00-7b02,U+7b05,U+7b07,U+7b09,U+7b0c-7b0e,U+7b10,U+7b12-7b13,U+7b16-7b18,U+7b1a,U+7b1c-7b1d,U+7b1f,U+7b21-7b23,U+7b27,U+7b29,U+7b2d,U+7b2f-7b30,U+7b32,U+7b34-7b37,U+7b39,U+7b3b,U+7b3d,U+7b3f-7b44,U+7b46,U+7b48,U+7b4a,U+7b4d-7b4e,U+7b53,U+7b55,U+7b57,U+7b59,U+7b5c,U+7b5e-7b5f,U+7b61,U+7b63-7b6d,U+7b6f-7b70,U+7b73-7b74,U+7b76,U+7b78,U+7b7a,U+7b7c-7b7d,U+7b7f,U+7b81-7b84,U+7b86-7b8c,U+7b8e-7b8f,U+7b91-7b93,U+7b96,U+7b98-7b9b,U+7b9e-7ba0,U+7ba3-7ba5,U+7bae-7bb0,U+7bb2-7bb3,U+7bb5-7bb7,U+7bb9-7bc0,U+7bc2-7bc5,U+7bc8-7bcb,U+7bcd-7bd0,U+7bd2,U+7bd4-7bd8,U+7bdb-7bdc,U+7bde-7be0,U+7be2-7be4,U+7be7-7be9,U+7beb-7bed,U+7bef-7bf0,U+7bf2-7bf6,U+7bf8-7bfb,U+7bfd,U+7bff-7c06,U+7c08-7c0a,U+7c0d-7c0e,U+7c10-7c13" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-9cfb2a77a4e45025105ad29a1748b90d.woff2",
			descriptors: { unicodeRange: "U+7a10-7a13,U+7a15-7a16,U+7a18-7a19,U+7a1b-7a1d,U+7a1f,U+7a21-7a22,U+7a24-7a32,U+7a34-7a36,U+7a38,U+7a3a,U+7a3e,U+7a40-7a45,U+7a47-7a50,U+7a52-7a56,U+7a58-7a6f,U+7a71-7a73,U+7a75,U+7a7b-7a7e,U+7a82,U+7a85,U+7a87,U+7a89-7a8c,U+7a8e-7a90,U+7a93-7a94,U+7a99-7a9b,U+7a9e,U+7aa1-7aa4,U+7aa7,U+7aa9-7aab,U+7aae-7ab2,U+7ab4-7abe,U+7ac0-7aca,U+7acc-7ad5,U+7ad7-7ad8,U+7ada-7add,U+7ae1-7ae2,U+7ae4,U+7ae7-7aec,U+7aee,U+7af0-7af8,U+7afb-7afc" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-450da755d5bcb70906e1295e559b9602.woff2",
			descriptors: { unicodeRange: "U+790d-7912,U+7914-791d,U+791f-7923,U+7925-7933,U+7935-7939,U+793d,U+793f,U+7942-7945,U+7947,U+794a-7952,U+7954-7955,U+7958-7959,U+7961,U+7963-7964,U+7966,U+7969-796c,U+796e,U+7970-7976,U+7979,U+797b-797f,U+7982-7983,U+7986-7989,U+798b-798e,U+7990-7999,U+799b-79a6,U+79a8-79b2,U+79b4-79b8,U+79bc,U+79bf,U+79c2,U+79c4-79c5,U+79c7-79c8,U+79ca,U+79cc,U+79ce-79d0,U+79d3-79d4,U+79d6-79d7,U+79d9-79de,U+79e0-79e2,U+79e5,U+79e8,U+79ea,U+79ec,U+79ee,U+79f1-79f7,U+79f9-79fa,U+79fc,U+79fe-79ff,U+7a01,U+7a04-7a05,U+7a07-7a0a,U+7a0c,U+7a0f" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-0986d134c05864f5025962eef9f994a0.woff2",
			descriptors: { unicodeRange: "U+77d8-77da,U+77dd-77e1,U+77e4,U+77e6,U+77e8,U+77ea,U+77ef-77f2,U+77f4-77f5,U+77f7,U+77f9-77fc,U+7803-7808,U+780a-780b,U+780e-7810,U+7813,U+7815,U+7819,U+781b,U+781e,U+7820-7822,U+7824,U+7828,U+782a-782b,U+782e-782f,U+7831-7833,U+7835-7836,U+783d,U+783f,U+7841-7844,U+7846,U+7848-784b,U+784d,U+784f,U+7851,U+7853-7854,U+7858-785c,U+785e-7869,U+786f-7876,U+7878-787b,U+787d-7886,U+7888,U+788a-788b,U+788f-7890,U+7892,U+7894-7896,U+7899,U+789d-789e,U+78a0,U+78a2,U+78a4,U+78a6,U+78a8-78af,U+78b5-78b8,U+78ba-78bd,U+78bf-78c0,U+78c2-78c4,U+78c6-78c8,U+78cc-78cf,U+78d1-78d3,U+78d6-78d8,U+78da-78e7,U+78e9-78eb,U+78ed-78f1,U+78f3,U+78f5-78f6,U+78f8-78f9,U+78fb-7900,U+7902-7904,U+7906-790c" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-1ee544f0f1dac422545c505baa788992.woff2",
			descriptors: { unicodeRange: "U+76af-76b0,U+76b3,U+76b5-76be,U+76c0-76c1,U+76c3-76c4,U+76c7,U+76c9,U+76cb-76cc,U+76d3,U+76d5,U+76d9-76da,U+76dc-76de,U+76e0-76e4,U+76e6-76ed,U+76f0,U+76f3,U+76f5-76f7,U+76fa-76fb,U+76fd,U+76ff-7703,U+7705-7706,U+770a,U+770c,U+770e-7718,U+771b-771e,U+7721,U+7723-7725,U+7727,U+772a-772c,U+772e,U+7730-7734,U+7739,U+773b,U+773d-773f,U+7742,U+7744-7746,U+7748-774f,U+7752-7759,U+775c-7760,U+7764,U+7767,U+7769-776a,U+776d-7778,U+777a-777c,U+7781-7783,U+7786-778b,U+778f-7790,U+7793-779e,U+77a1,U+77a3-77a4,U+77a6,U+77a8,U+77ab,U+77ad-77af,U+77b1-77b2,U+77b4,U+77b6-77ba,U+77bc,U+77be,U+77c0-77cc,U+77ce-77d6" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-4806e761d750087c2d734fc64596eaff.woff2",
			descriptors: { unicodeRange: "U+7589-758a,U+758c-758e,U+7590,U+7593,U+7595,U+7598,U+759b-759c,U+759e,U+75a2,U+75a6-75aa,U+75ad,U+75b6-75b7,U+75ba-75bb,U+75bf-75c1,U+75c6,U+75cb-75cc,U+75ce-75d1,U+75d3,U+75d7,U+75d9-75da,U+75dc-75dd,U+75df-75e1,U+75e5,U+75e9,U+75ec-75ef,U+75f2-75f3,U+75f5-75f8,U+75fa-75fb,U+75fd-75fe,U+7602,U+7604,U+7606-7609,U+760b,U+760d-760f,U+7611-7614,U+7616,U+761a,U+761c-761e,U+7621,U+7623,U+7627-7628,U+762c,U+762e-762f,U+7631-7632,U+7636-7637,U+7639-763b,U+763d,U+7641-7642,U+7644-764b,U+764e-7653,U+7655,U+7657-765b,U+765d,U+765f-7662,U+7664-766a,U+766c-766e,U+7670-7677,U+7679-767a,U+767c,U+767f-7681,U+7683,U+7685,U+7689-768a,U+768c-768d,U+768f-7690,U+7692,U+7694-7695,U+7697-7698,U+769a-76a3,U+76a5-76ad" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-33432927cd87d40cfe393c7482bf221f.woff2",
			descriptors: { unicodeRange: "U+7492-749b,U+749d,U+749f-74a6,U+74aa-74b9,U+74bb-74d1,U+74d3-74db,U+74dd,U+74df,U+74e1,U+74e5,U+74e7-74ed,U+74f0-74f3,U+74f5,U+74f8-74fe,U+7500-7503,U+7505-750c,U+750e,U+7510,U+7512,U+7514-7517,U+751b,U+751d-751e,U+7520-7524,U+7526-7527,U+752a,U+752e,U+7534,U+7536,U+7539,U+753c-753d,U+753f,U+7541-7544,U+7546-7547,U+7549-754a,U+754d,U+7550-7553,U+7555-7558,U+755d-7564,U+7567-7569,U+756b-7571,U+7573,U+7575-7577,U+757a-757e,U+7580-7582,U+7584-7585,U+7587-7588" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-be549ab72f0719d606a5c01e2c0219b6.woff2",
			descriptors: { unicodeRange: "U+7372-737d,U+737f-7383,U+7385-7386,U+7388,U+738a,U+738c-738d,U+738f-7390,U+7392-7395,U+7397-739a,U+739c-739e,U+73a0-73a1,U+73a3-73a8,U+73aa,U+73ac-73ad,U+73b1,U+73b4-73b6,U+73b8-73b9,U+73bc-73bf,U+73c1,U+73c3-73c7,U+73cb-73cc,U+73ce,U+73d2-73d8,U+73da-73dd,U+73df,U+73e1-73e4,U+73e6,U+73e8,U+73ea-73ec,U+73ee-73f1,U+73f3-7402,U+7404,U+7407-7408,U+740b-740e,U+7411-7419,U+741c-7421,U+7423-7424,U+7427,U+7429,U+742b,U+742d,U+742f,U+7431-7432,U+7437-743b,U+743d-7440,U+7442-7454,U+7456,U+7458,U+745d,U+7460-746c,U+746e-746f,U+7471-7475,U+7478-747d,U+747f,U+7482,U+7484-7486,U+7488-748a,U+748c-748d,U+748f,U+7491" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-019d66dcad46dc156b162d267f981c20.woff2",
			descriptors: { unicodeRange: "U+7054-705d,U+705f-706a,U+706e,U+7071-7074,U+7077,U+7079-707b,U+707d,U+7081-7084,U+7086-7088,U+708b-708d,U+708f-7091,U+7093,U+7097-7098,U+709a-709b,U+709e-70aa,U+70b0,U+70b2,U+70b4-70b6,U+70ba,U+70be-70bf,U+70c4-70c7,U+70c9,U+70cb-70d7,U+70da,U+70dc-70de,U+70e0-70e3,U+70e5,U+70ea,U+70ee,U+70f0-70f6,U+70f8,U+70fa-70fc,U+70fe-7108,U+710b-710f,U+7111-7112,U+7114,U+7117,U+711b-7125,U+7127-712e,U+7132-7135,U+7137-7144,U+7146-7149,U+714b,U+714d,U+714f-715b,U+715d,U+715f-7163,U+7165,U+7169-716d,U+716f-7171,U+7174-7177" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-b5c1596551c256e0e9cf02028595b092.woff2",
			descriptors: { unicodeRange: "U+722e-722f,U+7232-7234,U+723a,U+723c,U+723e,U+7240-7246,U+7249-724b,U+724e-7251,U+7253-7255,U+7257-7258,U+725a,U+725c,U+725e,U+7260,U+7263-7265,U+7268,U+726a-726d,U+7270-7271,U+7273-7274,U+7276-7278,U+727b-727d,U+7282-7283,U+7285-7289,U+728c,U+728e,U+7290-7291,U+7293-729e,U+72a0-72ab,U+72ae,U+72b1-72b3,U+72b5,U+72ba-72c0,U+72c5-72c7,U+72c9-72cc,U+72cf,U+72d1,U+72d3-72d6,U+72d8,U+72da-72dd,U+72df,U+72e2-72e7,U+72ea-72eb,U+72f5-72f6,U+72f9,U+72fd-7300,U+7302,U+7304-7309,U+730b-730d,U+730f-7312,U+7314,U+7318-731a,U+731f-7320,U+7323-7324,U+7326-7328,U+732d,U+732f-7330,U+7332-7333,U+7335-7336,U+733a-733d,U+7340-734c,U+734e-734f,U+7351,U+7353-7356,U+7358-735f,U+7361-736b,U+736e,U+7370-7371" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-e5f453bb04da18eed01675eeebd88bf8.woff2",
			descriptors: { unicodeRange: "U+6ec5-6ec6,U+6ec8-6eca,U+6ecc-6ece,U+6ed0,U+6ed2,U+6ed6,U+6ed8-6ed9,U+6edb-6edd,U+6ee3,U+6ee7,U+6eea-6ef3,U+6ef5-6ef8,U+6efa-6f01,U+6f03-6f05,U+6f07-6f08,U+6f0a-6f0e,U+6f10-6f12,U+6f16-6f1f,U+6f21-6f23,U+6f25-6f28,U+6f2c,U+6f2e,U+6f30,U+6f32,U+6f34-6f35,U+6f37-6f3d,U+6f3f-6f45,U+6f48-6f4a,U+6f4c,U+6f4e-6f57,U+6f59-6f5b,U+6f5d,U+6f5f-6f61,U+6f63-6f65,U+6f67-6f6c,U+6f6f-6f71,U+6f73,U+6f75-6f77,U+6f79,U+6f7b,U+6f7d-6f83,U+6f85-6f87,U+6f8a-6f8b,U+6f8f-6f9b,U+6f9d-6fa0,U+6fa2-6fa6,U+6fa8-6fb1" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-cf2cc71752631e579e35b0e423bf2638.woff2",
			descriptors: { unicodeRange: "U+6d73,U+6d75-6d76,U+6d79-6d7b,U+6d7d-6d81,U+6d83-6d84,U+6d86-6d87,U+6d8a-6d8b,U+6d8d,U+6d8f-6d90,U+6d92,U+6d96-6d9a,U+6d9c,U+6da2,U+6da5,U+6dac-6dad,U+6db0-6db1,U+6db3-6db4,U+6db6-6db7,U+6db9-6dbe,U+6dc1-6dc3,U+6dc8-6dca,U+6dcd-6dd0,U+6dd2-6dd5,U+6dd7,U+6dda-6ddc,U+6ddf,U+6de2-6de3,U+6de5,U+6de7-6dea,U+6ded,U+6def-6df0,U+6df2,U+6df4-6df6,U+6df8,U+6dfa,U+6dfd-6e04,U+6e06-6e09,U+6e0b,U+6e0f,U+6e12-6e13,U+6e15,U+6e18-6e19,U+6e1b-6e1c,U+6e1e-6e1f,U+6e22,U+6e26-6e28,U+6e2a,U+6e2c,U+6e2e,U+6e30-6e31,U+6e33,U+6e35-6e37,U+6e39,U+6e3b-6e42,U+6e45-6e4c,U+6e4f-6e52,U+6e55,U+6e57,U+6e59-6e5a,U+6e5c-6e5e,U+6e60-6e6a,U+6e6c-6e6d,U+6e6f-6e7d,U+6e80-6e82,U+6e84,U+6e87-6e88,U+6e8a-6e8e,U+6e91-6e97,U+6e99-6e9b,U+6e9d-6e9e,U+6ea0-6ea1,U+6ea3-6ea4,U+6ea6,U+6ea8-6ea9,U+6eab-6eae,U+6eb0,U+6eb3,U+6eb5,U+6eb8-6eb9,U+6ebc,U+6ebe-6ec0,U+6ec3-6ec4" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-6f3256af8454371776bc46670d33cc65.woff2",
			descriptors: { unicodeRange: "U+6bbb-6bbe,U+6bc0,U+6bc3-6bc4,U+6bc6-6bca,U+6bcc,U+6bce,U+6bd0-6bd1,U+6bd8,U+6bda,U+6bdc-6be0,U+6be2-6be9,U+6bec-6bee,U+6bf0-6bf2,U+6bf4,U+6bf6-6bf8,U+6bfa-6bfc,U+6bfe-6c04,U+6c08-6c0c,U+6c0e,U+6c12,U+6c17,U+6c1c-6c1e,U+6c20,U+6c23,U+6c25,U+6c2b-6c2d,U+6c31,U+6c33,U+6c36-6c37,U+6c39-6c3c,U+6c3e-6c3f,U+6c43-6c45,U+6c48,U+6c4b-6c4f,U+6c51-6c53,U+6c56,U+6c58-6c5a,U+6c62-6c63,U+6c65-6c67,U+6c6b-6c6f,U+6c71,U+6c73,U+6c75,U+6c77-6c78,U+6c7a-6c7c,U+6c7f-6c80,U+6c84,U+6c87,U+6c8a-6c8b,U+6c8d-6c8e,U+6c91-6c92,U+6c95-6c98,U+6c9a,U+6c9c-6c9e,U+6ca0,U+6ca2,U+6ca8,U+6cac,U+6caf-6cb0,U+6cb4-6cb7,U+6cba,U+6cc0-6cc3,U+6cc6-6cc8,U+6ccb,U+6ccd-6ccf,U+6cd1-6cd2,U+6cd8-6cda,U+6cdc-6cdd,U+6cdf,U+6ce4,U+6ce6-6ce7,U+6ce9,U+6cec-6ced,U+6cf2,U+6cf4,U+6cf9,U+6cff-6d00,U+6d02-6d03,U+6d05-6d06,U+6d08-6d0a,U+6d0d,U+6d0f-6d11,U+6d13-6d16,U+6d18,U+6d1c-6d1d,U+6d1f-6d24,U+6d26,U+6d28-6d29,U+6d2c-6d2d,U+6d2f-6d30,U+6d34,U+6d36-6d38,U+6d3a,U+6d3f-6d40,U+6d42,U+6d44,U+6d49,U+6d4c,U+6d50,U+6d55-6d58,U+6d5b,U+6d5d,U+6d5f,U+6d61-6d62,U+6d64-6d65,U+6d67-6d68,U+6d6b-6d6d,U+6d70-6d72" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-23f228f3999c01983860012330e4be08.woff2",
			descriptors: { unicodeRange: "U+6967-696a,U+696c-696d,U+696f-6970,U+6972-6976,U+697a-697b,U+697d-697f,U+6981,U+6983,U+6985,U+698a-698c,U+698e-6993,U+6996-6997,U+6999-699a,U+699d-69a6,U+69a9-69aa,U+69ac,U+69ae-69b0,U+69b2-69b3,U+69b5-69b6,U+69b8-69ba,U+69bc-69c0,U+69c2-69c9,U+69cb,U+69cd,U+69cf,U+69d1-69d3,U+69d5-69da,U+69dc-69de,U+69e1-69ec,U+69ee-69f1,U+69f3-69fc,U+69fe,U+6a00-6a09,U+6a0b-6a16,U+6a19-6a1e,U+6a20,U+6a22-6a27,U+6a29,U+6a2b-6a2e,U+6a30,U+6a32-6a34,U+6a36-6a3c,U+6a3f-6a43,U+6a45-6a46,U+6a48-6a4a" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-21430ee05a1248901da8d0de08744d47.woff2",
			descriptors: { unicodeRange: "U+6830-6831,U+6834-6836,U+683a-683b,U+683f,U+6847,U+684b,U+684d,U+684f,U+6852,U+6856-685f,U+686a,U+686c-6873,U+6875,U+6878-6880,U+6882,U+6884,U+6887-688e,U+6890-6892,U+6894-6896,U+6898-68a1,U+68a3-68a5,U+68a9-68ac,U+68ae,U+68b1-68b2,U+68b4,U+68b6-68bf,U+68c1,U+68c3-68c8,U+68ca,U+68cc,U+68ce-68d1,U+68d3-68d4,U+68d6-68d7,U+68d9,U+68db-68df,U+68e1-68e2,U+68e4-68ed,U+68ef,U+68f2-68f4,U+68f6-68f8,U+68fb,U+68fd-6900,U+6902-6904,U+6906-690a,U+690c,U+690f,U+6911,U+6913-691e,U+6921-6923,U+6925-692c,U+692e-692f,U+6931-6933,U+6935-6938,U+693a-693c,U+693e,U+6940-6941,U+6943-6953,U+6955-6956,U+6958-6959,U+695b-695c,U+695f,U+6961-6962,U+6964-6965" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-5330a2119a716e4e7224ed108b085dac.woff2",
			descriptors: { unicodeRange: "U+66b8,U+66ba-66bd,U+66bf-66d8,U+66da,U+66de-66e5,U+66e7-66e8,U+66ea-66ef,U+66f1,U+66f5-66f6,U+66f8,U+66fa-66fb,U+66fd,U+6701-6707,U+670c,U+670e-670f,U+6711-6713,U+6716,U+6718-671a,U+671c,U+671e,U+6720-6725,U+6727,U+6729,U+672e,U+6730,U+6732-6733,U+6736-6739,U+673b-673c,U+673e-673f,U+6741,U+6744-6745,U+6747,U+674a-674b,U+674d,U+6752,U+6754-6755,U+6757-675b,U+675d,U+6762-6764,U+6766-6767,U+676b-676c,U+676e,U+6771,U+6774,U+6776,U+6778-677b,U+677d,U+6780,U+6782-6783,U+6785-6786,U+6788,U+678a,U+678c-678f,U+6791-6794,U+6796,U+6799,U+679b,U+679f-67a1,U+67a4,U+67a6,U+67a9,U+67ac,U+67ae,U+67b1-67b2,U+67b4,U+67b9-67c0,U+67c2,U+67c5-67ce,U+67d5-67d7,U+67db,U+67df,U+67e1,U+67e3-67e4,U+67e6-67e8,U+67ea-67eb,U+67ed-67ee,U+67f2,U+67f5-67fc,U+67fe,U+6801-6804,U+6806,U+680d,U+6810,U+6812,U+6814-6815,U+6818-681c,U+681e-6820,U+6822-6828,U+682b-682f" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-cd145ce4a0ea18469358df53c207bc1b.woff2",
			descriptors: { unicodeRange: "U+6569-656a,U+656d-656f,U+6571,U+6573,U+6575-6576,U+6578-6586,U+6588-658a,U+658d-658f,U+6592,U+6594-6596,U+6598,U+659a,U+659d-659e,U+65a0,U+65a2-65a3,U+65a6,U+65a8,U+65aa,U+65ac,U+65ae,U+65b1-65b8,U+65ba-65bb,U+65be-65c0,U+65c2,U+65c7-65ca,U+65cd,U+65d0-65d1,U+65d3-65d5,U+65d8-65df,U+65e1,U+65e3-65e4,U+65ea-65eb,U+65f2-65f5,U+65f8-65f9,U+65fb-65ff,U+6601,U+6604-6605,U+6607-6609,U+660b,U+660d,U+6610-6612,U+6616-6618,U+661a-661c,U+661e,U+6621-6624,U+6626,U+6629-662c,U+662e,U+6630,U+6632-6633,U+6637-663b,U+663d,U+663f-6640,U+6642,U+6644-664a,U+664d-664e,U+6650-6651,U+6658-6659,U+665b-665e,U+6660,U+6662-6663,U+6665,U+6667,U+6669-666d,U+6671-6673,U+6675,U+6678-6679,U+667b-667d,U+667f-6681,U+6683,U+6685-6686,U+6688-668b,U+668d-6690,U+6692-6695,U+6698-669c,U+669e-66a6,U+66a9-66ad,U+66af-66b3,U+66b5-66b7" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-36925dfe329a45086cbb7fc5c20d45ac.woff2",
			descriptors: { unicodeRange: "U+5f30,U+5f32-5f38,U+5f3b,U+5f3d-5f3f,U+5f41-5f4f,U+5f51,U+5f54,U+5f59-5f5c,U+5f5e-5f60,U+5f63,U+5f65,U+5f67-5f68,U+5f6b,U+5f6e-5f6f,U+5f72,U+5f74-5f76,U+5f78,U+5f7a,U+5f7d-5f7f,U+5f83,U+5f86,U+5f8d-5f8f,U+5f91,U+5f93-5f94,U+5f96,U+5f9a-5f9b,U+5f9d-5fa0,U+5fa2-5fa7,U+5fa9,U+5fab-5fac,U+5faf-5fb4,U+5fb6,U+5fb8-5fbb,U+5fbe-5fc2,U+5fc7-5fc8,U+5fca-5fcb,U+5fce,U+5fd3-5fd5,U+5fda-5fdc,U+5fde-5fdf,U+5fe2-5fe3,U+5fe5-5fe6,U+5fe8-5fe9,U+5fec,U+5fef-5ff0,U+5ff2-5ff4,U+5ff6-5ff7,U+5ff9-5ffa,U+5ffc,U+6007-6009,U+600b-600c,U+6010-6011,U+6013,U+6017-6018,U+601a,U+601e-601f,U+6022-6024,U+602c-602e,U+6030-6034,U+6036-603a,U+603d-603e,U+6040,U+6044-604a,U+604c,U+604e-604f,U+6051,U+6053-6054,U+6056-6058,U+605b-605c,U+605e-6061,U+6065-6066,U+606e,U+6071-6072,U+6074-6075,U+6077,U+607e,U+6080-6082,U+6085-6088,U+608a-608b,U+608e-6091,U+6093,U+6095,U+6097-6099,U+609c,U+609e,U+60a1-60a2,U+60a4-60a5,U+60a7,U+60a9-60aa,U+60ae,U+60b0,U+60b3,U+60b5-60b7,U+60b9-60ba,U+60bd-60c4,U+60c7-60c9,U+60cc" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-4bfaa8ffa64c5ee560aa2daba7c9cbd3.woff2",
			descriptors: { unicodeRange: "U+635a-635d,U+6360,U+6364-6366,U+6368,U+636a-636c,U+636f-6370,U+6372-6375,U+6378-6379,U+637c-637f,U+6381,U+6383-6386,U+638b,U+638d,U+6391,U+6393-6395,U+6397,U+6399-639f,U+63a1,U+63a4,U+63a6,U+63ab,U+63af,U+63b1-63b2,U+63b5-63b6,U+63b9,U+63bb,U+63bd,U+63bf-63c3,U+63c5,U+63c7-63c8,U+63ca-63cc,U+63d1,U+63d3-63d5,U+63d7-63dd,U+63df,U+63e2,U+63e4-63e8,U+63eb-63ec,U+63ee-63f1,U+63f3,U+63f5,U+63f7,U+63f9-63fc,U+63fe,U+6403-6404,U+6406-640a,U+640d-640e,U+6411-6412,U+6415-641a,U+641d,U+641f,U+6422-6425,U+6427-6429,U+642b,U+642e-6433,U+6435-6439,U+643b-643c,U+643e,U+6440,U+6442-6443,U+6449,U+644b-6451,U+6453,U+6455-6457,U+6459-645d,U+645f-6466,U+6468,U+646a-646c,U+646e-6477,U+647b-6481,U+6483,U+6486,U+6488-648f" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-112c051027b2d766c19a519f6ee1f4f7.woff2",
			descriptors: { unicodeRange: "U+61c5-61c7,U+61c9,U+61cc-61d0,U+61d3,U+61d5-61e5,U+61e7-61f4,U+61f6-61fe,U+6200-6205,U+6207,U+6209,U+6213-6214,U+6219,U+621c-621e,U+6220,U+6223,U+6226-6229,U+622b,U+622d,U+622f-6232,U+6235-6236,U+6238-623c,U+6242,U+6244-6246,U+624a,U+624f-6250,U+6255-6257,U+6259-625a,U+625c-6262,U+6264-6265,U+6268,U+6271-6272,U+6274-6275,U+6277-6278,U+627a-627b,U+627d,U+6281-6283,U+6285-6288,U+628b-6290,U+6294,U+6299,U+629c-629e,U+62a3,U+62a6-62a7,U+62a9-62aa,U+62ad-62b0,U+62b2-62b4,U+62b6-62b8,U+62ba,U+62be,U+62c0-62c1,U+62c3,U+62cb,U+62cf,U+62d1,U+62d5,U+62dd-62de,U+62e0-62e1,U+62e4,U+62ea-62eb,U+62f0,U+62f2,U+62f5,U+62f8-62fb,U+6300,U+6303-6306,U+630a-630d,U+630f-6310,U+6312-6315,U+6317-6319,U+631c,U+6326-6327,U+6329,U+632c-632e,U+6330-6331,U+6333-6338,U+633b-633c,U+633e-6341,U+6344,U+6347-6348,U+634a,U+6351-6354,U+6356-6359" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-5b0ed6971aaab9c8ad563230bd5471a7.woff2",
			descriptors: { unicodeRange: "U+5dd0-5dda,U+5ddc,U+5ddf-5de0,U+5de3-5de4,U+5dea,U+5dec-5ded,U+5df0,U+5df5-5df6,U+5df8-5dfc,U+5dff-5e00,U+5e04,U+5e07,U+5e09-5e0b,U+5e0d-5e0e,U+5e12-5e13,U+5e17,U+5e1e-5e25,U+5e28-5e2c,U+5e2f-5e30,U+5e32-5e36,U+5e39-5e3a,U+5e3e-5e41,U+5e43,U+5e46-5e4b,U+5e4d-5e53,U+5e56-5e5a,U+5e5c-5e5d,U+5e5f-5e60,U+5e63-5e71,U+5e75,U+5e77,U+5e79,U+5e7e,U+5e81-5e83,U+5e85,U+5e88-5e89,U+5e8c-5e8e,U+5e92,U+5e98,U+5e9b,U+5e9d,U+5ea1-5ea4,U+5ea8-5eac,U+5eae-5eb2,U+5eb4,U+5eba-5ebd,U+5ebf-5ec8,U+5ecb-5ed0,U+5ed4-5ed5,U+5ed7-5eda,U+5edc-5ee7,U+5ee9,U+5eeb-5ef3,U+5ef5,U+5ef8-5ef9,U+5efb-5efd,U+5f05-5f07,U+5f09,U+5f0c-5f0e,U+5f10,U+5f12,U+5f14,U+5f16,U+5f19-5f1a,U+5f1c-5f1e,U+5f21-5f24,U+5f28,U+5f2b-5f2c,U+5f2e" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-98f2ad84457de7f3740d9920b8fa8667.woff2",
			descriptors: { unicodeRange: "U+60cd-60d0,U+60d2-60d4,U+60d6-60d7,U+60d9,U+60db,U+60de,U+60e1-60e5,U+60ea,U+60f1-60f2,U+60f5,U+60f7-60f8,U+60fb-60ff,U+6102-6105,U+6107,U+610a-610c,U+6110-6114,U+6116-6119,U+611b-611e,U+6121-6122,U+6125,U+6128-612a,U+612c-613e,U+6140-6147,U+6149,U+614b,U+614d,U+614f-6150,U+6152-6154,U+6156-615c,U+615e-6161,U+6163-6166,U+6169-616f,U+6171-6174,U+6176,U+6178-618a,U+618c-618d,U+618f-6193,U+6195-619c,U+619e-61a6,U+61aa-61ab,U+61ad-61b6,U+61b8-61bd,U+61bf-61c1,U+61c3-61c4" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-733171b4ffcd17ea1fe1c0ba627173bf.woff2",
			descriptors: { unicodeRange: "U+5cf4-5cfa,U+5cfc-5d01,U+5d04-5d05,U+5d08-5d0d,U+5d0f-5d13,U+5d15,U+5d17-5d1a,U+5d1c-5d1d,U+5d1f-5d23,U+5d25,U+5d28,U+5d2a-5d2c,U+5d2f-5d33,U+5d35-5d3c,U+5d3f-5d46,U+5d48-5d49,U+5d4d-5d57,U+5d59-5d5a,U+5d5c,U+5d5e-5d68,U+5d6a,U+5d6d-5d6e,U+5d70-5d73,U+5d75-5d81,U+5d83-5d98,U+5d9a-5d9c,U+5d9e-5db6,U+5db8-5dc4,U+5dc6-5dcc,U+5dce-5dcf" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-684d65f1793cac449dde5d59cb3c47fb.woff2",
			descriptors: { unicodeRange: "U+5b52,U+5b56,U+5b5e,U+5b60-5b61,U+5b67-5b68,U+5b6b,U+5b6d-5b6f,U+5b72,U+5b74,U+5b76-5b79,U+5b7b-5b7c,U+5b7e-5b7f,U+5b82,U+5b86,U+5b8a,U+5b8d-5b8e,U+5b90-5b92,U+5b94,U+5b96,U+5b9f,U+5ba7-5ba9,U+5bac-5baf,U+5bb1-5bb2,U+5bb7,U+5bba-5bbc,U+5bc0-5bc1,U+5bc3,U+5bc8-5bcb,U+5bcd-5bcf,U+5bd1,U+5bd4-5bdc,U+5be0,U+5be2-5be3,U+5be6-5be7,U+5be9-5bed,U+5bef,U+5bf1-5bf7,U+5bfd-5bfe,U+5c00,U+5c02-5c03,U+5c05,U+5c07-5c08,U+5c0b-5c0e,U+5c10,U+5c12-5c13,U+5c17,U+5c19,U+5c1b,U+5c1e-5c21,U+5c23,U+5c26,U+5c28-5c2b,U+5c2d-5c30,U+5c32-5c33,U+5c35-5c37,U+5c43-5c44,U+5c46-5c47,U+5c4c-5c4d,U+5c52-5c54,U+5c56-5c58,U+5c5a-5c5d,U+5c5f,U+5c62,U+5c64,U+5c67-5c6d,U+5c70,U+5c72-5c78,U+5c7b-5c7e,U+5c80,U+5c83-5c87,U+5c89-5c8b,U+5c8e-5c8f,U+5c92-5c93,U+5c95,U+5c9d-5ca1,U+5ca4-5ca8,U+5caa,U+5cae-5cb0,U+5cb2,U+5cb4,U+5cb6,U+5cb9-5cbc,U+5cbe,U+5cc0,U+5cc2-5cc3,U+5cc5-5cca,U+5ccc-5cd1,U+5cd3-5cd8,U+5cda-5ce0,U+5ce2-5ce3,U+5ce7,U+5ce9,U+5ceb-5cec,U+5cee-5cef,U+5cf1-5cf3" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-cbaaefaaf326668277aa24dfa93c4d28.woff2",
			descriptors: { unicodeRange: "U+593b,U+593d-5940,U+5943,U+5945-5946,U+594a,U+594c-594d,U+5950,U+5952-5953,U+5959,U+595b-595f,U+5961,U+5963-5964,U+5966-5972,U+5975,U+5977,U+597a-597c,U+597e-5980,U+5985,U+5989,U+598b-598c,U+598e-5991,U+5994-5995,U+5998,U+599a-599d,U+599f-59a2,U+59a6-59a7,U+59ac-59ad,U+59b0-59b1,U+59b3-59b8,U+59ba,U+59bc-59bd,U+59bf-59c5,U+59c7-59c9,U+59cc-59cf,U+59d5-59d6,U+59d9,U+59db,U+59de-59e2,U+59e4,U+59e6-59e7,U+59e9-59eb,U+59ed-59f8,U+59fa,U+59fc-59fe,U+5a00,U+5a02,U+5a0a-5a0b,U+5a0d-5a10,U+5a12,U+5a14-5a17,U+5a19-5a1b,U+5a1d-5a1e,U+5a21-5a22,U+5a24,U+5a26-5a28,U+5a2a-5a30,U+5a33,U+5a35,U+5a37-5a3b,U+5a3d-5a3f,U+5a41-5a45,U+5a47-5a48,U+5a4b-5a54,U+5a56-5a59,U+5a5b-5a61,U+5a63-5a66,U+5a68-5a69,U+5a6b-5a73,U+5a78-5a79,U+5a7b-5a7e,U+5a80-5a90" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-58fd02350d0bc52cf1ca3bb32ce9766e.woff2",
			descriptors: { unicodeRange: "U+5a91,U+5a93-5a99,U+5a9c-5aa9,U+5aab-5ab1,U+5ab4,U+5ab6-5ab7,U+5ab9-5abd,U+5abf-5ac0,U+5ac3-5ac8,U+5aca-5acb,U+5acd-5ad1,U+5ad3,U+5ad5,U+5ad7,U+5ad9-5adb,U+5add-5adf,U+5ae2,U+5ae4-5ae5,U+5ae7-5ae8,U+5aea,U+5aec-5af0,U+5af2-5b08,U+5b0a-5b15,U+5b18-5b31,U+5b33,U+5b35-5b36,U+5b38-5b3f,U+5b41-5b4f" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-7ccce86603f80a099ddb0cb21d4ae3e3.woff2",
			descriptors: { unicodeRange: "U+5843,U+5845-584b,U+584e-5850,U+5852-5853,U+5855-5857,U+5859-585d,U+585f-5864,U+5866-586a,U+586d-587d,U+587f,U+5882,U+5884,U+5886-5888,U+588a-5891,U+5894-5898,U+589b-589d,U+58a0-58a7,U+58aa-58bb,U+58bd-58c0,U+58c2-58c4,U+58c6-58d0,U+58d2-58d4,U+58d6-58e3,U+58e5-58ea,U+58ed,U+58ef,U+58f1-58f2,U+58f4-58f5,U+58f7-58f8,U+58fa-5901,U+5903,U+5905-5906,U+5908-590c,U+590e,U+5910-5913,U+5917-5918,U+591b,U+591d-591e,U+5920-5923,U+5926,U+5928,U+592c,U+5930,U+5932-5933,U+5935-5936" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-3717077e38f98d89eae729b6c14e56dc.woff2",
			descriptors: { unicodeRange: "U+56d0-56d3,U+56d5-56d6,U+56d8-56d9,U+56dc,U+56e3,U+56e5-56ea,U+56ec,U+56ee-56ef,U+56f2-56f3,U+56f6-56f8,U+56fb-56fc,U+5700-5702,U+5705,U+5707,U+570b-571b,U+571d-571e,U+5720-5722,U+5724-5727,U+572b,U+5731-5732,U+5734-5738,U+573c-573d,U+573f,U+5741,U+5743-5746,U+5748-5749,U+574b,U+5752-5756,U+5758-5759,U+5762-5763,U+5765,U+5767,U+576c,U+576e,U+5770-5772,U+5774-5775,U+5778-577a,U+577d-5781,U+5787-578a,U+578d-5791,U+5794-579a,U+579c-579f,U+57a5,U+57a8,U+57aa,U+57ac,U+57af-57b1,U+57b3,U+57b5-57b7,U+57b9-57c1,U+57c4-57ca,U+57cc-57cd,U+57d0-57d1,U+57d3,U+57d6-57d7,U+57db-57dc,U+57de,U+57e1-57e3,U+57e5-57ec,U+57ee,U+57f0-57f3,U+57f5-57f7,U+57fb-57fc,U+57fe-57ff,U+5801,U+5803-5805,U+5808-580a,U+580c,U+580e-5810,U+5812-5814,U+5816-5818,U+581a-581d,U+581f,U+5822-5823,U+5825-5829,U+582b-582f,U+5831-5834,U+5836-5842" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-dbea1af6dcd9860be40c3d18254338f5.woff2",
			descriptors: { unicodeRange: "U+55f9-55fc,U+55ff,U+5602-5607,U+560a-560b,U+560d,U+5610-5617,U+5619-561a,U+561c-561d,U+5620-5622,U+5625-5626,U+5628-562b,U+562e-5630,U+5633,U+5635,U+5637-5638,U+563a,U+563c-563e,U+5640-564b,U+564f-5653,U+5655-5656,U+565a-565b,U+565d-5661,U+5663,U+5665-5667,U+566d-5670,U+5672-5675,U+5677-567a,U+567d-5684,U+5687-568d,U+5690-5692,U+5694-56a2,U+56a4-56ae,U+56b0-56b6,U+56b8-56bb,U+56bd-56c9,U+56cb-56cf" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-4a0fdb40036e87b40aa08dd30584cb85.woff2",
			descriptors: { unicodeRange: "U+5286-5287,U+5289-528f,U+5291-5292,U+5294-529a,U+529c,U+52a4-52a7,U+52ae-52b0,U+52b4-52bd,U+52c0-52c2,U+52c4-52c6,U+52c8,U+52ca,U+52cc-52cf,U+52d1,U+52d3-52d5,U+52d7,U+52d9-52de,U+52e0-52e3,U+52e5-52ef,U+52f1-52f8,U+52fb-52fd,U+5301-5304,U+5307,U+5309-530c,U+530e,U+5311-5314,U+5318,U+531b-531c,U+531e-531f,U+5322,U+5324-5325,U+5327-5329,U+532b-532d,U+532f-5338,U+533c-533d,U+5340,U+5342,U+5344,U+5346,U+534b-534d,U+5350,U+5354,U+5358-5359,U+535b,U+535d,U+5365,U+5368,U+536a,U+536c-536d,U+5372,U+5376,U+5379,U+537b-537e,U+5380-5381,U+5383,U+5387-5388,U+538a,U+538e-5394,U+5396-5397,U+5399,U+539b-539c,U+539e,U+53a0-53a1,U+53a4,U+53a7,U+53aa-53ad,U+53af-53b5,U+53b7-53ba,U+53bc-53be,U+53c0,U+53c3-53c7,U+53ce-53d0,U+53d2-53d3,U+53d5,U+53da,U+53dc-53de,U+53e1-53e2,U+53e7,U+53f4,U+53fa,U+53fe-5400,U+5402,U+5405,U+5407,U+540b,U+5414,U+5418-541a,U+541c,U+5422,U+5424-5425,U+542a,U+5430,U+5433,U+5436-5437,U+543a" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-0f626226ba1272e832aea87bafd9720e.woff2",
			descriptors: { unicodeRange: "U+5101-5105,U+5108-510a,U+510c-5111,U+5113-5120,U+5122-513e,U+5142,U+5147,U+514a,U+514c,U+514e-5150,U+5152-5153,U+5157-5159,U+515b,U+515d-5161,U+5163-5164,U+5166-5167,U+5169-516a,U+516f,U+5172,U+517a,U+517e-517f,U+5183-5184,U+5186-5187,U+518a-518b,U+518e-5191,U+5193-5194,U+5198,U+519a,U+519d-519f,U+51a1,U+51a3,U+51a6-51aa,U+51ad-51ae,U+51b4,U+51b8-51ba,U+51be-51bf,U+51c1-51c3,U+51c5,U+51c8,U+51ca,U+51cd-51ce,U+51d0,U+51d2-51da,U+51dc,U+51de-51df,U+51e2-51e3,U+51e5-51ea,U+51ec,U+51ee,U+51f1-51f2,U+51f4,U+51f7,U+51fe,U+5204-5205,U+5209,U+520b-520c,U+520f-5210,U+5213-5215,U+521c,U+521e-521f,U+5221-5223,U+5225-5227,U+522a,U+522c,U+522f,U+5231-5232,U+5234-5235,U+523c,U+523e,U+5244-5249,U+524b,U+524e-524f,U+5252-5253,U+5255,U+5257-525b,U+525d,U+525f-5260,U+5262-5264,U+5266,U+5268,U+526b-526e,U+5270-5271,U+5273-527c,U+527e,U+5280,U+5283-5285" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-938d90c10ff8c20386af7f242c05d6b0.woff2",
			descriptors: { unicodeRange: "U+543d,U+543f,U+5441-5442,U+5444-5445,U+5447,U+5449,U+544c-544f,U+5451,U+545a,U+545d-5461,U+5463,U+5465,U+5467,U+5469-5470,U+5474,U+5479-547a,U+547e-547f,U+5481,U+5483,U+5485,U+5487-548a,U+548d,U+5491,U+5493,U+5497-5498,U+549c,U+549e-54a2,U+54a5,U+54ae,U+54b0,U+54b2,U+54b5-54b7,U+54b9-54ba,U+54bc,U+54be,U+54c3,U+54c5,U+54ca-54cb,U+54d6,U+54d8,U+54db,U+54e0-54e4,U+54eb-54ec,U+54ef-54f1,U+54f4-54f9,U+54fb,U+54fe,U+5500,U+5502-5505,U+5508,U+550a-550e,U+5512-5513,U+5515-551a,U+551c-551f,U+5521,U+5525-5526,U+5528-5529,U+552b,U+552d,U+5532,U+5534-5536,U+5538-553b,U+553d,U+5540,U+5542,U+5545,U+5547-5548,U+554b-554f,U+5551-5554,U+5557-555b,U+555d-5560,U+5562-5563,U+5568-5569,U+556b,U+556f-5574,U+5579-557a,U+557d,U+557f,U+5585-5586,U+558c-558e,U+5590,U+5592-5593,U+5595-5597,U+559a-559b,U+559e,U+55a0-55a6,U+55a8-55b0,U+55b2,U+55b4,U+55b6,U+55b8,U+55ba,U+55bc,U+55bf-55c3,U+55c6-55c8,U+55ca-55cb,U+55ce-55d0,U+55d5,U+55d7-55db,U+55de,U+55e0,U+55e2,U+55e7,U+55e9,U+55ed-55ee,U+55f0-55f1,U+55f4,U+55f6,U+55f8" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-b6d128682ee29e471486354d486a1b90.woff2",
			descriptors: { unicodeRange: "U+4fe0,U+4fe2,U+4fe4-4fe5,U+4fe7,U+4feb-4fec,U+4ff0,U+4ff2,U+4ff4-4ff7,U+4ff9,U+4ffb-4ffd,U+4fff-500b,U+500e,U+5010-5011,U+5013,U+5015-5017,U+501b,U+501d-501e,U+5020,U+5022-5024,U+5027,U+502b,U+502f-5039,U+503b,U+503d,U+503f-5042,U+5044-5046,U+5049-504b,U+504d,U+5050-5054,U+5056-5059,U+505b,U+505d-5064,U+5066-506b,U+506d-5075,U+5078-507a,U+507c-507d,U+5081-5084,U+5086-5087,U+5089-508c,U+508e-50a2,U+50a4,U+50a6,U+50aa-50ab,U+50ad-50b1,U+50b3-50b9,U+50bc-50ce,U+50d0-50d5,U+50d7-50d9,U+50db-50e5,U+50e8-50eb,U+50ef-50f2,U+50f4,U+50f6-50fa,U+50fc-5100" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-e51ef413167c6e14e0c0fdcc585f2fc9.woff2",
			descriptors: { unicodeRange: "U+49d5-4a77" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-9d81066dd2b337c938df6e90380a00dc.woff2",
			descriptors: { unicodeRange: "U+4dac-4dad,U+4daf-4db5,U+4e02,U+4e04-4e06,U+4e0f,U+4e12,U+4e17,U+4e1f-4e21,U+4e23,U+4e26,U+4e29,U+4e2e-4e2f,U+4e31,U+4e33,U+4e35,U+4e37,U+4e3c,U+4e40-4e42,U+4e44,U+4e46,U+4e4a,U+4e51,U+4e55,U+4e57,U+4e5a-4e5b,U+4e62-4e65,U+4e67-4e68,U+4e6a-4e6f,U+4e72,U+4e74-4e7d,U+4e7f-4e85,U+4e87,U+4e8a,U+4e90,U+4e96-4e97,U+4e99,U+4e9c-4e9e,U+4ea3,U+4eaa,U+4eaf-4eb1,U+4eb4,U+4eb6-4eb9,U+4ebc-4ebe,U+4ec8,U+4ecc,U+4ecf-4ed0,U+4ed2,U+4eda-4edc,U+4ee0,U+4ee2,U+4ee6-4ee7,U+4ee9,U+4eed-4eef,U+4ef1,U+4ef4,U+4ef8-4efa,U+4efc,U+4efe,U+4f00,U+4f02-4f08,U+4f0b-4f0c,U+4f12-4f16,U+4f1c-4f1d,U+4f21,U+4f23,U+4f28-4f29,U+4f2c-4f2e,U+4f31,U+4f33,U+4f35,U+4f37,U+4f39,U+4f3b,U+4f3e-4f42,U+4f44-4f45,U+4f47-4f4c,U+4f52,U+4f54,U+4f56,U+4f61-4f62,U+4f66,U+4f68,U+4f6a-4f6b,U+4f6d-4f6e,U+4f71-4f72,U+4f75,U+4f77-4f7a,U+4f7d,U+4f80-4f82,U+4f85-4f87,U+4f8a,U+4f8c,U+4f8e,U+4f90,U+4f92-4f93,U+4f95-4f96,U+4f98-4f9a,U+4f9c,U+4f9e-4f9f,U+4fa1-4fa2,U+4fa4,U+4fab,U+4fad,U+4fb0-4fb4,U+4fb6-4fbe,U+4fc0-4fc2,U+4fc6-4fc9,U+4fcb-4fcd,U+4fd2-4fd6,U+4fd9,U+4fdb" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-20e7bf72fa05de9adf7dbcc7bf51dde6.woff2",
			descriptors: { unicodeRange: "U+4933-49d4" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-4095eb84ef3874e2600247bee0b04026.woff2",
			descriptors: { unicodeRange: "U+487a-4932" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-4ee10ae43505e2e0bc62656ced49c0fa.woff2",
			descriptors: { unicodeRange: "U+47d2-4879,U+2ce7c,U+2ce88,U+2ce93" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-7494dc504ae00ee9cd0505f990f88c5d.woff2",
			descriptors: { unicodeRange: "U+4756-47d1,U+2ca02,U+2ca0e,U+2ca7d,U+2caa9,U+2cb29,U+2cb2e,U+2cb31,U+2cb38-2cb39,U+2cb3f,U+2cb41,U+2cb4e,U+2cb5a,U+2cb64,U+2cb69,U+2cb6c,U+2cb6f,U+2cb76,U+2cb78,U+2cb7c,U+2cbb1,U+2cbbf-2cbc0,U+2cbce,U+2cc5f,U+2ccf5-2ccf6,U+2ccfd,U+2ccff,U+2cd02-2cd03,U+2cd0a,U+2cd8b,U+2cd8d,U+2cd8f-2cd90,U+2cd9f-2cda0,U+2cda8,U+2cdad-2cdae,U+2cdd5,U+2ce18,U+2ce1a,U+2ce23,U+2ce26,U+2ce2a" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-8de5b863cb50dfefdd07cb11c774d579.woff2",
			descriptors: { unicodeRange: "U+46c3-4755,U+2c488,U+2c494,U+2c497,U+2c542,U+2c613,U+2c618,U+2c621,U+2c629,U+2c62b-2c62d,U+2c62f,U+2c642,U+2c64a-2c64b,U+2c72c,U+2c72f,U+2c79f,U+2c7c1,U+2c7fd,U+2c8d9,U+2c8de,U+2c8e1,U+2c8f3,U+2c907,U+2c90a,U+2c91d" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-3e1f8f654357353bf0e04ba5c34b5f7f.woff2",
			descriptors: { unicodeRange: "U+4629-46c2,U+2bdf7,U+2be29,U+2c029-2c02a,U+2c0a9,U+2c0ca,U+2c1d5,U+2c1d9,U+2c1f9,U+2c27c,U+2c288,U+2c2a4,U+2c317,U+2c35b,U+2c361,U+2c364" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-2e33e8dc771ef5e1d9127d60a6b73679.woff2",
			descriptors: { unicodeRange: "U+458e-4628,U+2b7a9,U+2b7c5,U+2b7e6,U+2b7f9,U+2b806,U+2b80a,U+2b81c,U+2b8b8,U+2bac7,U+2bb5f,U+2bb62,U+2bb7c,U+2bb83,U+2bc1b,U+2bd77,U+2bd87" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-173945821411c09f70c95f98d590e697.woff2",
			descriptors: { unicodeRange: "U+4449-4511,U+2afa2,U+2b127-2b128,U+2b137-2b138,U+2b1ed" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-b358f7a51ece39a3247942b1feabdb29.woff2",
			descriptors: { unicodeRange: "U+439b-4448,U+2a437,U+2a5f1,U+2a602,U+2a61a,U+2a6b2,U+2a7dd,U+2a8fb,U+2a917,U+2aa30,U+2aa36,U+2aa58" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-23ad2d71b280f00b1363b95b7bea94eb.woff2",
			descriptors: { unicodeRange: "U+4275-430d,U+298c6,U+29a72,U+29d98,U+29ddb,U+29e15,U+29e3d,U+29e49" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-5882ffa04f32584d26109137e2da4352.woff2",
			descriptors: { unicodeRange: "U+4132-41de,U+28bef,U+28c47,U+28c4f,U+28c51,U+28c54,U+28d10,U+28d71,U+28dfb,U+28e1f,U+28e36,U+28e89,U+28e99,U+28eeb,U+28f32,U+28ff8,U+292a0" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-a203b91dad570bf05a58c3c3ddb529bf.woff2",
			descriptors: { unicodeRange: "U+41df-4274,U+292b1,U+29490,U+295cf,U+2967f,U+296f0,U+29719,U+29750" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-bd77e3c7f9e0b072d96af37f73d1aa32.woff2",
			descriptors: { unicodeRange: "U+408e-4131,U+285c8-285c9,U+28678,U+28695,U+286d7,U+286fa,U+287e0,U+28946,U+28949,U+2896b,U+28987-28988,U+289ba-289bb,U+28a1e,U+28a29,U+28a43,U+28a71,U+28a99,U+28acd,U+28add,U+28ae4,U+28b49,U+28bc1" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-5a45d991244d4c7140217e1e5f5ca4f4.woff2",
			descriptors: { unicodeRange: "U+3e83-3f2f,U+27139,U+273da-273db,U+273fe,U+27410,U+27449,U+27614-27615,U+27631,U+27684,U+27693,U+2770e,U+27723,U+27752" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-f56414bf9bced67990def8660e306759.woff2",
			descriptors: { unicodeRange: "U+3f30-3fdb,U+27985,U+27a84,U+27bb3,U+27bbe,U+27bc7,U+27cb8,U+27da0,U+27e10" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-583d166e56ba0de4b77eabb47ef67839.woff2",
			descriptors: { unicodeRange: "U+3fdc-408d,U+27fb7,U+27ff9,U+2808a,U+280bb,U+2815d,U+28277,U+28282,U+282e2,U+282f3,U+283cd,U+28408,U+2840c,U+28455,U+28468,U+2856b" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-7f855356ab893b0d2b9c1c83b8116f0e.woff2",
			descriptors: { unicodeRange: "U+3dd2-3e82,U+26a58,U+26a8c,U+26ab7,U+26aff,U+26b5c,U+26c21,U+26c29,U+26c73,U+26cdd,U+26e40,U+26e65,U+26f94,U+26ff6-26ff8,U+270f4,U+2710d" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-b57aaedfd8ebdf3931f25119dc6a5eb2.woff2",
			descriptors: { unicodeRange: "U+3d34-3dd1,U+2648d,U+26676,U+2667e,U+266b0,U+2671d,U+2677c,U+267cc,U+268dd,U+268ea,U+26951,U+2696f,U+269dd,U+269fa,U+26a1e" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-b6fd38ca30869792244804b04bc058da.woff2",
			descriptors: { unicodeRange: "U+3c76-3d33,U+25d0a,U+25da1,U+25e2e,U+25e56,U+25e62,U+25e65,U+25ec2,U+25ed7-25ed8,U+25ee8,U+25f23,U+25f5c,U+25fd4,U+25fe0,U+25ffb,U+2600c,U+26017,U+26060,U+260ed,U+26221,U+26270,U+26286,U+2634c,U+26402" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-452225341522a7942f0f6aab1a5c91a3.woff2",
			descriptors: { unicodeRange: "U+3bda-3c75,U+25771,U+257a9,U+257b4,U+259c4,U+259d4,U+25ae3-25ae4,U+25af1,U+25bb2,U+25c14,U+25c4b,U+25c64" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-866fa7613df6b3fd272bcfd4530c0bb9.woff2",
			descriptors: { unicodeRange: "U+3b25-3bd9,U+2504a,U+25055,U+25122,U+2512b,U+251a9,U+251cd,U+251e5,U+2521e,U+2524c,U+2542e,U+2548e,U+254d9,U+2550e,U+25532,U+25562,U+255a7-255a8" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-52a84a22fd1369bffeaf21da2d6158dc.woff2",
			descriptors: { unicodeRange: "U+3a6b-3b24,U+24896,U+249db,U+24a4d,U+24a7d,U+24ac9,U+24b56,U+24b6f,U+24c16,U+24d14,U+24dea,U+24e0e,U+24e37,U+24e6a,U+24e8b,U+24eaa" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-829615148e6357d826b9242eb7fbbd1e.woff2",
			descriptors: { unicodeRange: "U+39a9-3a6a,U+24096,U+24103,U+241ac,U+241c6,U+241fe,U+243bc,U+243f8,U+244d3,U+24629,U+246a5,U+247f1" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-c99eda15fc26a2941579560f76c3a5cf.woff2",
			descriptors: { unicodeRange: "U+38e3-39a8,U+23a98,U+23c7f,U+23c97-23c98,U+23cfe,U+23d00,U+23d0e,U+23d40,U+23dd3,U+23df9-23dfa,U+23e23,U+23f7e" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-395c35dd584b56b0789f58a0559beaf1.woff2",
			descriptors: { unicodeRange: "U+3760-382a,U+22ab8,U+22b43,U+22b46,U+22b4f-22b50,U+22ba6,U+22bca,U+22c1d,U+22c24,U+22c55,U+22d4c,U+22de1" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-203b0e569e3b14aac86a003dc3fa523e.woff2",
			descriptors: { unicodeRange: "U+382b-38e2,U+231b6,U+231c3-231c4,U+231f5,U+23350,U+23372,U+233d0,U+233d2-233d3,U+233d5,U+233da,U+233df,U+233e4,U+2344a-2344b,U+23451,U+23465,U+234e4,U+2355a,U+23594,U+235c4,U+235cb,U+23638-2363a,U+23647,U+2370c,U+2371c,U+2373f,U+23763-23764,U+237e7,U+237ff,U+23824,U+2383d" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-51a0e808bbc8361236ac521a119758a3.woff2",
			descriptors: { unicodeRange: "U+3698-375f,U+22218,U+2231e,U+223ad,U+224dc,U+226f3,U+2285b,U+228ab,U+2298f" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-6e092f71c1e634059ada0e52abadce67.woff2",
			descriptors: { unicodeRange: "U+35e6-3697,U+21c56,U+21cde,U+21d2d,U+21d45,U+21d62,U+21d78,U+21d92,U+21d9c,U+21da1,U+21db7,U+21de0,U+21e33-21e34,U+21f1e,U+21f76,U+21ffa,U+2217b" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-0f7fb1e0d5015bb1371343153ecf7ce3.woff2",
			descriptors: { unicodeRange: "U+3444-350e,U+20ad3,U+20b1d,U+20b9f,U+20c41,U+20cbf,U+20cd0,U+20d45,U+20de1,U+20e64,U+20e6d,U+20e95,U+20e9d,U+20ea2,U+20f5f,U+210c1,U+21201,U+2123d,U+21255,U+21274,U+2127b" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-d0cf73942fea1c74edbdf0b3011f4656.woff2",
			descriptors: { unicodeRange: "U+350f-35e5,U+212d7,U+212e4,U+212fd,U+2131b,U+21336,U+21344,U+2139a,U+213c4,U+21413,U+2146d-2146e,U+215d7,U+21647,U+216b4,U+21706,U+21742,U+218bd,U+219c3" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-968cffdc8ee679da094e77ebf50f58ef.woff2",
			descriptors: { unicodeRange: "U+336d-3443,U+2032b,U+20371,U+20381,U+203f9,U+2044a,U+20509,U+20547,U+205d6,U+20628,U+20676,U+2074f,U+20779,U+20807,U+2083a,U+20895,U+208b9,U+2097c,U+2099d" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-7a07ddc0f0c0f5f4a9bad6ee3dda66b5.woff2",
			descriptors: { unicodeRange: "U+328b-336c,U+2000b,U+20089,U+200a2,U+200a4,U+20164,U+201a2,U+20213" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-ec181b795ac1fb5a50d700b6e996d745.woff2",
			descriptors: { unicodeRange: "U+3192-31ba,U+31c0-31e3,U+31f0-321e,U+3220-328a,U+1f250-1f251" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-cfb211578629b7e8153b37240de6a9d5.woff2",
			descriptors: { unicodeRange: "U+2f74-2fd5,U+3000,U+3003-3007,U+3012-3013,U+3018-301c,U+3020-3029,U+302f-303f,U+3041-3096,U+3099-30a1" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-59e9ff77b0efaf684bc09274fb6908c9.woff2",
			descriptors: { unicodeRange: "U+30a2-30ff,U+3105-312f,U+3131-318e,U+3190-3191" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-2adbc89c11e65905393d3dfc468b9d5b.woff2",
			descriptors: { unicodeRange: "U+4e36,U+4ea0,U+4f74,U+4f91,U+4f94,U+4fc5,U+507e,U+50ed,U+5182,U+51f5,U+525e,U+5282,U+52f9,U+5326,U+537a,U+53a3,U+5423,U+5459,U+54b4,U+54d9,U+55c9,U+57f4,U+580b,U+5902,U+5925,U+5a08,U+5ab5,U+5b84,U+5be4,U+5c22,U+5cb5,U+5cbd,U+5d3e,U+5e31,U+5e5e,U+5e80,U+5ee8,U+5f82,U+5fc9,U+5fed,U+600a,U+605d,U+609b,U+609d,U+60dd,U+6243,U+6322,U+63ce,U+640c,U+643f,U+6445,U+64d7,U+6534,U+6549,U+656b,U+6603,U+674c,U+680a,U+6864,U+69d4,U+6a65,U+6c2a,U+6c46,U+6c5c,U+6d0e,U+6d48,U+6e2b,U+6eb2,U+6eb7,U+6f89,U+706c,U+70b1,U+7113,U+71d4,U+727f,U+72f3,U+7303,U+7321,U+736c,U+736f,U+74a9,U+74de,U+750d,U+7513,U+7592,U+75c4,U+7605,U+760a,U+761b,U+7625,U+762d,U+7643,U+7707,U+7747,U+77b5,U+7839,U+784e,U+78a5,U+7924,U+793b,U+798a,U+7a03,U+7a06,U+7a78,U+7a80,U+7aad,U+7ba8,U+7be5,U+7cc8,U+7ec1,U+7f0b,U+7f0f,U+7f12,U+7f68,U+7f9d,U+8025,U+809c,U+80ad,U+80b7,U+80e8,U+811e,U+8204,U+8223,U+822d,U+823b,U+824b,U+825a,U+827d,U+827f,U+828f,U+82c8,U+8307,U+831b,U+8347,U+837d,U+839b,U+83a9,U+83f9,U+84b9,U+8579,U+864d,U+867f,U+86b0,U+86d1,U+86d8,U+86f2,U+8764,U+8770,U+8788,U+8797,U+87ac-87ad,U+87b5,U+881b,U+8844,U+88bc,U+88fc,U+8930,U+89cf,U+89d6,U+8ba0,U+8bd4,U+8c02,U+8c2b,U+8c85,U+8e23,U+8f81-8f82,U+8fd5,U+90b6,U+90db,U+914e,U+9164,U+91ad,U+943e,U+94b7-94b8,U+94eb,U+950d,U+9514,U+9516,U+9518,U+9529,U+9538,U+953f,U+954e,U+955f,U+95fc,U+9667,U+96b3,U+9792,U+97b2,U+98a1,U+9969,U+9987,U+9998,U+9a80,U+9a92,U+9a96,U+9adf,U+9cb4,U+9cbd,U+9cd0,U+9cd4,U+9e31,U+9e3a,U+9e71,U+9ee5,U+9eea,U+9ef9,U+9fa0" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-70e811fd7994e61f408c923de6ddd078.woff2",
			descriptors: { unicodeRange: "U+4e0c,U+4e28,U+4e3f,U+4ec2,U+502e,U+50ba,U+5155,U+5181,U+522d,U+5281,U+5290,U+5369,U+53b6,U+54d5,U+54dc,U+54ff,U+552a,U+553c,U+5588,U+55b5,U+5686,U+570a,U+5776,U+5786,U+57a4,U+5820,U+5865,U+58bc,U+5b32,U+5b65,U+5c1c,U+5c66,U+5c6e,U+5c8d,U+5ddb,U+5f2a,U+5f50,U+5f61,U+6067,U+614a,U+615d,U+619d,U+61d4,U+620b,U+6224-6225,U+6343,U+63ad,U+63f2,U+640b,U+6420,U+6434,U+6496,U+64d0,U+6509,U+652e,U+67a8,U+6833,U+6844,U+684a,U+6920,U+6957,U+6971,U+6a8e,U+6a91,U+6aa0,U+6b43,U+6bea,U+6bf5,U+6c15,U+6cd0,U+6ee0,U+6f24,U+6f2d,U+70c0,U+721d,U+728b,U+72c3,U+72e8,U+730a,U+7338-7339,U+734d,U+746d,U+752f,U+754e,U+770d,U+7735,U+778d,U+77a2,U+77e7,U+7857,U+786d,U+78c9,U+78f2,U+791e,U+7953,U+7b58,U+7b9d,U+7bda,U+7cd7,U+7f32-7f33,U+8022,U+8028-8029,U+8035,U+804d,U+8080,U+80c2,U+80e9,U+80ec,U+80f2,U+810e,U+8221,U+8274,U+82b0,U+82e0,U+83b0,U+8487-8488,U+848e,U+84cd,U+84d0,U+8539,U+857a,U+85a8,U+85b7,U+867c,U+871e,U+8723,U+877e,U+878b,U+8793,U+8803,U+88d2,U+8966,U+89cc,U+89eb,U+8b26,U+8c8a,U+8c98,U+8d33,U+8d47,U+8d55,U+8dbc,U+8e40,U+8e94,U+8f77,U+8f79,U+9058,U+91a2,U+91b5,U+928e,U+9494,U+94b6,U+94de,U+94f4,U+94f9,U+950a,U+950e,U+951e,U+952b,U+953c,U+953e,U+9544,U+9561,U+9564,U+9569,U+95f6,U+9603,U+960d,U+963d,U+9674,U+9794,U+97ab,U+98a5,U+9a9f,U+9ab1,U+9ad1,U+9b0f,U+9b2f,U+9c92,U+9c95,U+9cba,U+9cbc,U+9cc6,U+9ccb,U+9cd8,U+9e32,U+9e38,U+9e5b,U+9e7e,U+9eb4,U+9efb-9efc,U+9f3d" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-c4a687ac4f0c2766eefc9f77ed99cddf.woff2",
			descriptors: { unicodeRange: "U+2e3b,U+2e80-2e99,U+2e9b-2ef3,U+2f00-2f73,U+ffffd" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-51502f1206be09c565f1547c406e9558.woff2",
			descriptors: { unicodeRange: "U+4e69,U+4f1b,U+4f67,U+4f7e,U+4fdc,U+50e6,U+5196,U+5202,U+5233,U+523f,U+52a2,U+536e,U+5476,U+54ad,U+54cf,U+5537,U+561e,U+56dd,U+56df,U+5709,U+572c,U+57cf,U+57f8,U+580d,U+5881,U+589a,U+5941,U+59b2,U+5c25,U+5d24,U+5d74,U+5e42,U+5e8b,U+5eb3,U+5ed2,U+5fad,U+6003,U+603c,U+6083,U+6100,U+6126,U+6206,U+62ca,U+638e,U+63b4,U+6426,U+646d,U+6535,U+65c4,U+66db,U+6715,U+6769,U+6798,U+67c3,U+6861,U+698d,U+69ca,U+69ed,U+69f2,U+69ff,U+6a18,U+6b39,U+6bb3,U+6c0d,U+6cb2,U+6cd6,U+6cf7,U+6cfa,U+6d33,U+6e16,U+6e53-6e54,U+6ebb,U+6fb6,U+709d,U+72ad,U+72f7,U+72fb,U+7313,U+739f,U+74ba,U+754b,U+755b,U+758b,U+75ac,U+75d6,U+7617,U+7635,U+7640,U+76a4,U+76b2,U+775a,U+77bd,U+781f,U+79b3,U+7b2b,U+7b31,U+7b3e,U+7b6e,U+7b9c,U+7c0b,U+7c9e,U+7cc1,U+7ce8,U+7ea5,U+7f21,U+7f27,U+7f74,U+7fb0,U+8031,U+8071,U+80ea,U+8114,U+8160,U+81a6,U+81c1,U+829f,U+82a4,U+82fb,U+831a,U+8333,U+836c,U+83b6,U+83f8,U+8411,U+841c,U+8489,U+848c,U+85a4,U+8627,U+8629,U+866e,U+86b5,U+872e,U+8731,U+877b,U+877d,U+87ea,U+8813,U+8816,U+8864,U+88ce,U+88e5,U+897b,U+89cb,U+89f3,U+8bfc,U+8c35,U+8d46,U+8d4d,U+8dba,U+8e3a,U+8f75,U+8f7e,U+8fd3,U+9161,U+9179,U+917e,U+91a3,U+94ac,U+94d7,U+94e5,U+952a,U+952c,U+9545,U+9565,U+9568,U+956a,U+961d,U+96e0,U+972a,U+9730,U+989f,U+98e7,U+990d,U+9967,U+9993,U+9aa3,U+9ac0,U+9ae1,U+9aeb,U+9af9,U+9c86,U+9c8b,U+9ca0-9ca1,U+9ca3,U+9ce2,U+9e48,U+9e6a,U+9e87,U+9ee2,U+9ee9,U+9f17,U+9f19,U+9f2c,U+9f80" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-1fdc0c67ed57263a80fd108c1f6ccf24.woff2",
			descriptors: { unicodeRange: "U+4ef3,U+50d6,U+50ec,U+51ab,U+51b1,U+52d6,U+54a9,U+54da,U+55be,U+55cd,U+564d,U+572f,U+574c,U+576b,U+57d8,U+57fd,U+5844,U+59d2,U+5ae0,U+5b16,U+5b37,U+5b5b,U+5b80,U+5d1e,U+5d6b,U+5efe,U+5f11,U+5f56,U+5f58,U+5f73,U+5f8c,U+5fc4,U+5fe4,U+602b,U+6106,U+610d,U+63de,U+63f8,U+641b,U+64e4,U+6634,U+676a,U+67b5,U+681d,U+6883,U+69b1,U+69e0,U+6b37,U+6b9b,U+6d7c,U+6ed7,U+6f36,U+6f72,U+6f8c,U+7035,U+7039,U+7173,U+7178,U+7228,U+728f,U+72b4,U+72ef,U+72f4,U+7331,U+7481,U+74e0,U+7540,U+75c3,U+75e6,U+763c,U+764d,U+76cd,U+7704,U+7743,U+7780,U+7847,U+786a,U+78b9,U+7962,U+7a02,U+7aac,U+7ab3,U+7b0a,U+7b4c,U+7b7b,U+7bfc,U+7c0f,U+7c16,U+7c40,U+7ca2,U+7cc7,U+7cf8,U+7d77,U+7e3b,U+7ea1,U+7ea9,U+7ef2,U+7f02,U+7f07,U+7f0c,U+7f23,U+7f2f,U+7fbc,U+8016,U+8020,U+812c,U+8136,U+8182,U+822f,U+8233,U+825f,U+8268,U+8284,U+8288,U+8291,U+8308,U+8311,U+835b,U+836d,U+83dd,U+8406,U+840f,U+845c,U+84b4,U+84e3,U+850c,U+855e,U+863c,U+86ba,U+86c4,U+86de,U+86f1,U+873e,U+87bd,U+87db,U+880a,U+883c,U+887f,U+88f0,U+890a,U+892b,U+895e,U+89ef,U+8a48,U+8bdc,U+8c18,U+8c33,U+8c94,U+8db1,U+8dcf,U+8dd6,U+8de3,U+8e6f,U+8e90,U+8f7a,U+8fb6,U+902d,U+90be,U+91af,U+936a,U+948b,U+94d8,U+9513,U+953a,U+956c,U+963c,U+9654,U+966c,U+9688,U+97b4,U+996b,U+9a75,U+9a7a,U+9aba,U+9aed,U+9b08,U+9b43,U+9c8e,U+9c94,U+9c9a,U+9e2b,U+9e36,U+9e4b,U+9e4e,U+9e55,U+9e63,U+9e68-9e69,U+9ebd,U+9ec9,U+9f0d,U+9f37,U+9f51" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-e11567fd2accf9957cd0d3c2be937d87.woff2",
			descriptors: { unicodeRange: "U+50a7,U+5240,U+5261,U+52ac,U+531a,U+5363,U+5432,U+5452,U+5456,U+5472,U+5478,U+553f,U+5575,U+5581,U+55cc,U+55fe,U+5601,U+572e,U+57d2,U+57ef,U+581e,U+5924,U+5981,U+5997,U+59a3,U+5aaa,U+5ab8,U+5b34,U+5d5d,U+5def,U+5e11,U+5e91,U+5ed1,U+5ef4,U+5f40,U+600d,U+6019,U+601b,U+605a,U+6092,U+60ab,U+6217,U+623d,U+6369,U+65d2,U+6661,U+670a,U+6753,U+67a7,U+6855,U+68f9,U+6939,U+696e,U+6980,U+6a7c,U+6aab,U+6b82,U+6bf3,U+6bf9,U+6c05,U+6c19-6c1a,U+6ca9,U+6cf6,U+6d1a,U+6dab,U+6f74,U+7085,U+7198,U+71b5,U+7256,U+725d,U+727e,U+72fa,U+7322,U+738e,U+73e5,U+750f,U+755a,U+7594,U+75b3,U+760c,U+7615,U+7630,U+763f,U+77ec,U+7817,U+78a1,U+78d9,U+7905,U+7b2a,U+7b2e,U+7b62,U+7b85,U+7bcc,U+7bea,U+7c26,U+7c74,U+7c9c-7c9d,U+7e47,U+7e9b,U+7e9f,U+7ee0,U+7ee8,U+7ef1,U+7f01,U+7f11,U+7f17,U+7f36,U+7f7e,U+7fee,U+802a,U+80cd,U+8112,U+8169,U+8234,U+8279,U+8298,U+82ca,U+82d8,U+82e1,U+83c0,U+83d4,U+83df,U+8401,U+8451,U+845a,U+8476,U+8478,U+84ba,U+84bd,U+84e0,U+851f,U+8548,U+8556,U+8585,U+868d,U+86e9,U+86f4,U+86f8,U+8765,U+8785,U+87ab,U+87ee,U+8832,U+8872,U+88b7,U+88e2-88e3,U+89da,U+8bce,U+8bd3,U+8bd6,U+8bf9,U+8c16,U+8c73,U+8d5c,U+8dde,U+8f6d,U+8f94,U+8fe8,U+9011,U+915e,U+9185,U+918c,U+94ab,U+94d1,U+94f3,U+9515,U+951d,U+9558,U+9567,U+96ce,U+96e9,U+9785,U+9878,U+987c,U+9883,U+98d1,U+9954,U+9963,U+9a93,U+9ac1,U+9acc,U+9b1f,U+9b49,U+9b4d,U+9b51,U+9ca7,U+9cae,U+9cce,U+9cd3,U+9e37,U+9e39,U+9e41,U+9e46,U+9f22,U+9f2f,U+9f39,U+9f85" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-20cc1bbf50e7efb442756cb605672c1f.woff2",
			descriptors: { unicodeRange: "U+4e5c,U+4edf,U+4f25,U+4f32,U+4f5e,U+4f76,U+4faa,U+4fe6,U+5028,U+5048,U+5250,U+535f,U+538d,U+53c1,U+5412,U+5443,U+54d4,U+54dd,U+5541,U+5550,U+5577,U+55dd,U+55f3,U+560f,U+562c,U+5657-5658,U+5664,U+56af,U+575c,U+577c,U+57b2,U+57da,U+5800,U+5a62,U+5aeb,U+5c3b,U+5ca3,U+5d26,U+5d9d,U+5f01,U+5fb5,U+5fdd,U+5ff8,U+6029,U+6041,U+6079,U+60b1,U+6222,U+629f,U+6332,U+63bc,U+63e0,U+6485,U+65ab,U+65c3,U+65c6,U+668c,U+669d,U+66be,U+67fd,U+6800,U+68fc,U+690b,U+6924,U+6978,U+69a7,U+6a3e,U+6a50,U+6a5b,U+6a97,U+6b24,U+6b8d,U+6baa,U+6c10,U+6c54,U+6ceb,U+6d04,U+6d4d,U+6eb1,U+6ebd,U+7110,U+71b3,U+71f9,U+7230,U+728d,U+7292,U+72b8,U+72d2,U+7360,U+73a2,U+7511,U+75a0,U+75c8,U+779f,U+7826,U+7877,U+7a39,U+7aa8,U+7ae6,U+7b04,U+7b0f,U+7baa,U+7bac,U+7c1f,U+7ccd,U+7ecb,U+7ed4,U+7ed7,U+7efb,U+7f0d,U+7f5f,U+7faf,U+7fd5,U+7fe5,U+8027,U+80bc,U+80dd,U+80fc,U+8132,U+815a,U+8167,U+816d,U+81ca,U+8228,U+82a1,U+82a9,U+82ab,U+82cc,U+8351,U+8368,U+83b8,U+83d8,U+83ea,U+83f0,U+8497,U+84c1,U+858f,U+85ff,U+867b,U+86a8-86a9,U+870a,U+8722,U+876e,U+877c,U+87e5,U+8888,U+88df,U+8919,U+8bcc,U+8bdf,U+8be8,U+8bee,U+8c20,U+8c2f,U+8d36,U+8df8,U+8e05,U+8e2f,U+8f9a,U+9021,U+908b,U+90b4,U+90ba,U+90d0,U+90eb,U+90fe,U+91aa,U+933e,U+9486-9487,U+948d,U+9490,U+94ad,U+94bd,U+94d6,U+94d9,U+9507,U+9546,U+955e,U+956b,U+95e9,U+9604,U+960b,U+9612,U+9615,U+9617,U+96b9,U+989a-989b,U+989e,U+9a78,U+9a7d,U+9aa0,U+9aa2,U+9ac2,U+9b23,U+9b3b,U+9c82,U+9cca,U+9cd9,U+9e28,U+9e5a,U+9e5e,U+9e6c,U+9efe,U+9f0b" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-5d2898fbc097a7e24c6f38d80587621e.woff2",
			descriptors: { unicodeRange: "U+4e47,U+4e8d,U+4f65,U+4f89,U+50ee,U+520e,U+5416,U+5454,U+54bb,U+54c2,U+54d3,U+54de,U+5591,U+55e5,U+560c,U+566b,U+5769,U+578c,U+5793,U+57e4,U+5889,U+593c,U+59ab,U+5ad4,U+5ad8,U+5af1,U+5b53,U+5ba5,U+5c59,U+5c63,U+5d5b,U+5e0f,U+5e14,U+5edb,U+5fbc,U+6004,U+60ad,U+610e,U+61b7,U+624c,U+634c,U+647a,U+64ba,U+65f0,U+6600,U+66f7,U+67e2,U+67f0,U+680c,U+686b,U+6874,U+691f,U+6989,U+6a17,U+6b81,U+6b84,U+6c06-6c07,U+6c3d,U+6d07,U+6d27,U+6d2b,U+6d91,U+6e6b,U+6e8f,U+6fde,U+70bb,U+723b,U+726e,U+72b0,U+72ce,U+72f2,U+7301,U+731e,U+737e,U+7477,U+748e,U+74ff,U+7633,U+7654,U+771a,U+7726,U+7765,U+7768,U+781c,U+7829,U+78d4,U+7913,U+7957,U+79d5,U+79eb,U+7a70,U+7a86,U+7b25,U+7b38,U+7b47,U+7b72,U+7ba6-7ba7,U+7dae,U+7ee1,U+7efe,U+7f26,U+7f31,U+7f35,U+801c,U+8043,U+809f,U+80ab,U+80d7,U+8118,U+8188,U+81cc,U+823e,U+8244,U+824f,U+82b4,U+82c1,U+82e4,U+82f4,U+8306,U+833a,U+835c,U+839c,U+83b3,U+83bc,U+846d,U+867a,U+868b,U+8734,U+87ca,U+886e,U+887e,U+88a2,U+88c9,U+8921,U+8bb5,U+8bf3,U+8c04,U+8c17,U+8c1d,U+8c25,U+8c36,U+8c55,U+8c78,U+8d3d,U+8d40,U+8d59,U+8d67,U+8d91,U+8dbf,U+8deb-8dec,U+8dfd,U+8e14,U+8e41,U+8f8e,U+900b,U+9044,U+9062,U+90cf,U+9123,U+9146,U+9162,U+9172,U+918d,U+9190,U+92c8,U+93ca,U+948c,U+94aa,U+94b2,U+94c8,U+94ca,U+94d5,U+94df,U+94e9-94ea,U+94f7,U+94fc-94fd,U+951b,U+954f,U+9554,U+9559,U+9566,U+9571-9572,U+95f1,U+9608,U+960f,U+97af,U+988f,U+98d5,U+992e,U+9955,U+9ab0,U+9b32,U+9c90,U+9c9e,U+9ca5,U+9ca9,U+9cad,U+9cb1,U+9cc3,U+9e47,U+9ee7,U+9f87" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-ac9ceb44437becc3e9c4dbfebab7fc2d.woff2",
			descriptors: { unicodeRange: "U+4e93,U+4ec4,U+4ef5,U+4f27,U+4f7b,U+4fe3,U+5080,U+5121,U+51eb,U+5208,U+52f0,U+53f5,U+5453,U+5466,U+54a6,U+54bf,U+54d0,U+5533,U+5549,U+5556,U+556d,U+558f,U+55f2,U+55f5,U+5627,U+567b,U+56d4,U+571c,U+5739,U+57b4,U+5807,U+58c5,U+59a4,U+59af,U+59d8,U+5a09,U+5a0c,U+5a4a,U+5ad2,U+5b6c,U+5ca2,U+5cac,U+5d03,U+5d6c,U+5db7,U+5ebe,U+5f2d,U+5fea,U+6042,U+6120,U+6175,U+6221,U+623e,U+6339,U+638a,U+643d,U+64b8,U+64e2,U+66e9,U+67b3,U+67c1,U+67d2,U+6832,U+6877,U+68f0,U+6934,U+6966,U+6987,U+6998,U+69c1,U+69ce,U+6a3d,U+6a84,U+6aa9,U+6b87,U+6bd6,U+6c16,U+6c18,U+6cd4,U+6cee,U+6de0,U+6e0c,U+6ecf,U+6f4b,U+70b7,U+7168,U+72d9,U+7352,U+73b3,U+73d0,U+7441,U+74d2,U+75a5,U+75e7-75e8,U+7610,U+7619,U+765e,U+772d,U+7812,U+782c,U+784c,U+7850,U+7856,U+789b,U+78f4,U+7a51,U+7b15,U+7b1e,U+7b24,U+7b5a,U+7bb8,U+7bc1,U+7bd9,U+7ed0,U+7ee6,U+7efa,U+7f1b,U+7f1f,U+7f22,U+7f45,U+7f71,U+7fa7,U+7fbf,U+7ff3,U+8052,U+80b1,U+80db,U+80f4,U+81bb,U+81ec,U+8202,U+8210,U+8249,U+828a,U+828e,U+82e3,U+8315,U+8369,U+8378,U+83a8,U+83aa,U+83b4,U+83e1,U+84fc,U+8538,U+853b,U+859c,U+85ae,U+86b4,U+86c9,U+86cf,U+8725,U+879f,U+87b3,U+887d,U+88fe,U+8a8a,U+8ba7,U+8c07,U+8c14,U+8c30,U+8c47,U+8db5,U+8dd7,U+8e1f,U+8e69,U+8e70,U+8e85,U+8f78,U+8f87,U+8f8b,U+8f8f,U+90c4,U+9143,U+917d,U+948f,U+94cd,U+94d2,U+94ef,U+954a,U+9609-960a,U+96d2,U+9708,U+9765,U+97ea,U+9880,U+98a7,U+996c,U+9980,U+9991,U+9a88,U+9ab6,U+9afb,U+9b47,U+9c87,U+9c9b,U+9cb5,U+9cc7,U+9e2c,U+9e42,U+9e58,U+9ecd,U+9ecf,U+9f8a,U+9f8c" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-c16ed9740b85badf16e86ea782a3062f.woff2",
			descriptors: { unicodeRange: "U+4ebb,U+4edd,U+4fa9,U+502c,U+50a5,U+51c7,U+51fc,U+523d,U+5241,U+530f,U+5464,U+549d,U+54a3,U+5514,U+5527,U+555c,U+556e,U+5576,U+55b1,U+55b9,U+55eb,U+5624,U+564c,U+5671,U+5685,U+568f,U+56d7,U+56e1,U+57a1,U+57d9,U+5942,U+5a67,U+5c50,U+5c7a,U+5c98,U+5d06,U+5d27,U+5d6f,U+5df3,U+5dfd,U+5e19,U+5ea0,U+5eb9,U+5eea,U+5ffe,U+600f,U+606b,U+6215,U+622c,U+6266,U+62bb,U+62bf,U+6308,U+6387,U+63b8,U+63c4,U+63c6,U+63f6,U+6441,U+6555,U+659b,U+6677,U+66a7,U+6775,U+678b,U+679e,U+6840,U+6849,U+6860,U+68c2,U+6910,U+6a28,U+6a2f,U+6a79,U+6b92-6b93,U+6bc2,U+6bfd,U+6c29,U+6c32,U+6c86,U+6cc5,U+6d0c,U+6d60,U+6da0,U+6ddd,U+6e86,U+6ed3,U+6edf,U+6fb9,U+6fd1,U+6fef,U+7023,U+7080,U+70ca,U+712f,U+7145,U+7284,U+732c,U+73c8,U+73d9,U+740a,U+7457,U+7596,U+759d,U+75a3,U+75d8,U+75e3-75e4,U+75ff,U+7622,U+7688,U+76b4,U+76e5,U+7818,U+7887,U+789a,U+78b2,U+7b08,U+7b33,U+7c2a,U+7ccc,U+7ea8,U+7ec0,U+7fe6,U+8012,U+8084,U+8093,U+80e4,U+80ef,U+8297,U+82a8,U+82be,U+8331,U+8366,U+83c5,U+83fd,U+8473,U+84a1,U+84ca,U+84d1,U+857b,U+85c1,U+85d3,U+8605,U+8662,U+86aa,U+86b1,U+86d4,U+86ed,U+86f3,U+8709,U+8748,U+874c,U+8763,U+89c7,U+89de,U+89e5,U+8a3e,U+8ba6,U+8c00,U+8c21,U+8c49,U+8c7a,U+8d30,U+8df9,U+8e51,U+8e59,U+8f6b,U+8f73,U+8ff3,U+9016,U+9026,U+902f,U+9099,U+909b,U+90c7,U+914a,U+91ae,U+91ba,U+9495,U+94a3,U+94af,U+94ba,U+94bf,U+94cc,U+94e1,U+94f0,U+9531,U+955d,U+95f3,U+9697,U+96bc,U+975b,U+977c,U+98a2,U+998a,U+9994-9995,U+9a9b,U+9ab7,U+9ac5,U+9c91,U+9ccf,U+9cd5,U+9e29,U+9edc,U+9edf,U+9f83,U+9f88-9f89" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-aa0d470430e6391eca720c7cfa44446f.woff2",
			descriptors: { unicodeRange: "U+4ee8,U+4f22,U+4f43,U+4f57,U+4f5d,U+4f6f,U+4ff8,U+502d,U+507b,U+5345,U+53df,U+53fb,U+544b,U+5482,U+54a7,U+54cc,U+550f,U+5544,U+5555,U+5594,U+55e8,U+55ec,U+55ef,U+564e,U+56f9,U+5704,U+576d,U+5785,U+57ad,U+5914,U+5958,U+599e,U+59aa,U+59be,U+5a06,U+5abe,U+5ae1,U+5b40,U+5bee,U+5cbf,U+5cc4,U+5ccb,U+5d47,U+603f,U+6078,U+607d,U+607f,U+608c,U+609a,U+60fa,U+61ff,U+621b,U+622e,U+626a,U+6371,U+63ae,U+63cd,U+63d6,U+6410,U+6414,U+6421,U+6448,U+64d8,U+6710,U+6748,U+6772,U+680e,U+6954,U+69ab,U+6c68,U+6c8f,U+6ca4,U+6d2e,U+6e4e,U+6e98,U+6fe0,U+7094,U+70e9,U+7116,U+7119,U+723f,U+73c9,U+74e4,U+753e,U+7548,U+75bd,U+75cd,U+7618,U+7634,U+76c5,U+76f1,U+7708,U+7719,U+777e,U+7791,U+77b3,U+7823,U+7827,U+7830,U+7889,U+7893,U+7949,U+795c,U+79e3,U+7a14,U+7a88,U+7a95,U+7aa0,U+7afd,U+7b90,U+7bd1,U+7bfe,U+7da6,U+7ec2,U+7eef,U+7f03-7f04,U+7f08,U+7f58,U+7f61,U+7f9f,U+8174,U+8200,U+828d,U+82c4,U+82d5,U+82dc,U+82f7,U+832d,U+835a,U+840b,U+8438,U+852b,U+869d,U+86ac,U+86d0,U+86f0,U+8782,U+87a8,U+87d1-87d2,U+87e0,U+8839,U+8913,U+891b,U+8934,U+8941,U+89ca,U+89ce,U+8a07,U+8ba3,U+8bc5,U+8bcb,U+8bdb,U+8c11,U+8c15,U+8c29,U+8c32,U+8dc4,U+8dce,U+8ddb,U+8dfa,U+8e09,U+8e1d,U+8e39,U+8e42,U+8e49,U+8e4b,U+8e8f,U+8f71-8f72,U+9004,U+9036,U+9097,U+90dc,U+90e2,U+90e6,U+90ef,U+9104,U+919a,U+91b4,U+938f,U+9497,U+950f,U+9557,U+9562-9563,U+9573,U+9606,U+9649,U+972d,U+973e,U+97a3,U+97eb,U+988c,U+9894,U+98a6,U+9974,U+9977,U+997d,U+9a90,U+9a9d,U+9aef,U+9ca2,U+9ccd,U+9cdf,U+9e20,U+9e4c,U+9e6b,U+9f3e" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-f2b54d4e7be0eaefe1c2c56836fa5368.woff2",
			descriptors: { unicodeRange: "U+4ede,U+4ee1,U+4eeb,U+4fda,U+4ffe,U+5025,U+506c,U+50f3,U+5106,U+520d,U+525c,U+52ad,U+530d,U+5310,U+539d,U+53a9,U+53fc,U+5421,U+5477,U+54e7,U+551b,U+5530,U+557e,U+5599,U+55c4,U+55d1,U+55d4,U+55df,U+55e4,U+55ea,U+5623,U+562d,U+5654,U+56eb,U+56f5,U+57a7,U+57d5,U+57dd,U+584d,U+5880,U+58ec,U+59dd,U+5a32,U+5a55,U+5a75,U+5b51,U+5b71,U+5b73,U+5cd2,U+5ce4,U+5e5b,U+5e96,U+5fd2,U+607b,U+61d1,U+634b,U+636d,U+63b3,U+63ff,U+64c0,U+661d,U+6657,U+66dc,U+67a5,U+6841,U+6867,U+6901,U+699b,U+6a47,U+6b46,U+6c21,U+6c24,U+6c35,U+6c4a,U+6c94,U+6ca3,U+6d39,U+6d63,U+6d6f,U+6d94,U+705e,U+71e7,U+726f,U+72cd,U+72de,U+72f0,U+7325,U+7350,U+7391,U+741a,U+757f,U+7583,U+75b1,U+75b4,U+75b8,U+75c2,U+75f1,U+766f,U+7699,U+7751,U+789c,U+7a17,U+7be6,U+7cb2,U+7ea3,U+7eb0,U+7ebe,U+7eeb,U+7f25,U+7f2c,U+7fb8,U+8026,U+8037,U+8153,U+8171,U+8191,U+8214,U+821b,U+8222,U+826e,U+82eb,U+830c,U+8314,U+8334,U+83d6,U+8418,U+843c,U+84ff,U+8564,U+8572,U+8616,U+866c,U+8693,U+86a3,U+86a7,U+86af,U+86b6,U+86c6,U+86ca,U+8708,U+870d,U+8759,U+8760,U+87af,U+87c6,U+8869,U+88c6,U+89d0,U+8b07,U+8baa-8bab,U+8bc2,U+8be4,U+8bf0,U+8c2a,U+8c62,U+8c89,U+8d49,U+8d6d,U+8d84,U+8d94,U+8db8,U+8dc6,U+8e2e,U+8e3d,U+8e47,U+8e7f,U+9005,U+9051,U+907d,U+9082,U+9088,U+90b0,U+90d3,U+9150,U+949c,U+94a4,U+94b9,U+94cb,U+94e0,U+9509,U+9512,U+951f,U+9534,U+9552-9553,U+965f,U+96b0,U+9791,U+9889,U+9990,U+9a9c,U+9aa7,U+9c88,U+9cb2-9cb3,U+9cb6-9cb7,U+9cc5,U+9cdc,U+9e22,U+9e2a,U+9e57,U+9e67,U+9e73,U+9e82,U+9eb8,U+9ee0,U+9f9b" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-99a16ef6a64934d5781933dbd9c46b2e.woff2",
			descriptors: { unicodeRange: "U+4eb5,U+4f09,U+4f5a,U+4f8f,U+4fce,U+4fdf,U+4fea,U+4ff3,U+500c,U+500f,U+504e,U+5088,U+52be,U+5420,U+5457,U+5499,U+549b,U+54c6,U+54d2,U+558b,U+559f,U+55bd,U+55d6,U+565c,U+567c,U+568e,U+5768,U+577b,U+57a9,U+57ed,U+59f9,U+5a11,U+5a40,U+5ae6,U+5b6a,U+5b93,U+5bb8,U+5c15,U+5c99,U+5c9c,U+5cc1,U+5d2e,U+5d4b,U+5d99,U+5e54,U+5e61,U+5fcf-5fd1,U+6002,U+6006,U+6014,U+60af,U+60c6,U+60da,U+60f4,U+621f,U+62c8,U+631b,U+631e,U+63e9,U+64b5,U+655d,U+6619,U+6635,U+6641,U+67ad,U+67b0,U+67b7,U+67e9,U+684e,U+688f,U+695d,U+696b,U+69b7,U+6a58,U+6c26,U+6d35,U+6d43,U+6d9e,U+6dd9,U+6dec,U+6e11,U+6e6e,U+6e9f,U+6ec2,U+6ee2,U+6ef9,U+6f09,U+6f66,U+6f8d,U+6fc2,U+6fc9,U+729f,U+72c8,U+73de,U+7430,U+7566,U+7579,U+75c9,U+75e2,U+75fc,U+762a,U+7638,U+7678,U+76c2,U+76f9,U+778c,U+77cd,U+77dc,U+7800,U+781d,U+782d,U+783b-783c,U+78a3,U+78ec,U+7980,U+7a23,U+7b95,U+7bdd,U+7c0c,U+7c41,U+7c91,U+7cb3,U+7cc5,U+7ecc,U+7f19,U+7fca,U+8006,U+8069,U+807f,U+80bd,U+80ed,U+814b,U+8198,U+82cb,U+82d2,U+834f,U+8360,U+847a,U+84d6,U+84e5,U+8537,U+85d0,U+8671,U+86a4,U+86ce,U+86f9,U+8703,U+8707,U+8737,U+873b,U+8815,U+8936,U+8bc3,U+8bcf,U+8bd2,U+8bd8,U+8be9,U+8c0c,U+8c0f,U+8c4c,U+8d45,U+8d5d,U+8d73,U+8e31,U+8e6d,U+8e76,U+8fe4,U+9041,U+90d7,U+9169,U+92ae,U+94a1,U+94c4,U+94c9,U+94db,U+94e7,U+9503,U+9506,U+9517,U+9528,U+9537,U+9542,U+9549,U+95fe,U+9616,U+961a,U+96c9,U+96f3,U+9701,U+970e,U+9739,U+9753,U+9798,U+98d2-98d3,U+98d9-98da,U+9968,U+996f,U+9984,U+9997,U+9acb,U+9b03,U+9c85,U+9ca8,U+9cab,U+9e49,U+9e51,U+9e66,U+9f10" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-c40533fdf4cc57177b12803598af7e59.woff2",
			descriptors: { unicodeRange: "U+4e15,U+4e1e,U+4e2b,U+4eb3,U+4ec9,U+4f0e,U+4f64,U+501c,U+50a9,U+510b,U+51a2,U+51bc,U+527d,U+52d0,U+53fd,U+5429,U+542e,U+5486,U+54af,U+5506,U+5511,U+5522,U+552c,U+556c,U+55b3,U+55d2,U+55e6,U+55fd,U+561f,U+5639,U+5659,U+5662,U+5693,U+572a,U+5892,U+598a,U+5992,U+59a9,U+5a20,U+5ae3,U+5b17,U+5b7d,U+5d34,U+5d3d,U+5d4a,U+5d82,U+5e1a-5e1b,U+5ea5,U+5f0b,U+5f77,U+5fd6,U+5fff,U+6026,U+6035,U+6063,U+60b4,U+60bb,U+60ee,U+612b,U+6194,U+61ca,U+61e6,U+61f5,U+620a,U+6248,U+62a1,U+62d7,U+6376,U+637b,U+652b,U+65bc,U+65cc,U+65ce,U+65d6,U+664c,U+665f,U+6666,U+6684,U+66b9,U+6773,U+6777,U+6787,U+67de,U+6845,U+693d,U+6994,U+6a35,U+6d54,U+6d5c,U+6d8e,U+6dd6,U+6eb4,U+6f2a,U+6f78,U+704f,U+70ec,U+7118,U+714a,U+7172,U+71b9,U+724d,U+728a,U+7337,U+733e,U+7396,U+73b7,U+73cf,U+7428,U+742c,U+742e,U+74ee,U+74f4,U+7525,U+753a,U+7572,U+75d4,U+765c,U+768e,U+7762,U+777d,U+77fd,U+7825,U+7837,U+78b4,U+795f,U+79ed,U+7a1e,U+7b06,U+7b20,U+7ba9,U+7bab,U+7c7c,U+7cbd,U+7cdc,U+7ec9,U+7ef6,U+7f30,U+7f42,U+7f44,U+7f54,U+7f94,U+8004,U+800b,U+8019,U+809b,U+80ae,U+80c4,U+80f1,U+8146,U+816e,U+817c,U+81c0,U+81fc,U+81fe,U+822b,U+830f,U+832f,U+8340,U+8365,U+8385,U+8392,U+83a0,U+8424,U+84af,U+869c,U+8713,U+8717-8718,U+87c0,U+87cb,U+87fe,U+8821,U+8902,U+89d1,U+8bb9,U+8c12,U+8d32,U+8d53,U+8df7,U+8e7c,U+8f7c,U+8f95,U+8fab,U+9052,U+905b,U+9095,U+909d,U+90c5,U+911e,U+9122,U+916a,U+919b,U+948e,U+9492,U+949a,U+94b5,U+94bc,U+94c6,U+94f1,U+9502,U+9511,U+9536,U+956f-9570,U+9602,U+9621,U+9631,U+998b,U+99a5,U+9a81,U+9a9e,U+9ebe,U+9f8b" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-91ddb2969bf2d31ba02ad82998d1314c.woff2",
			descriptors: { unicodeRange: "U+4f2b,U+4f3d,U+4fac,U+5043,U+5055,U+5140,U+5156,U+51cb,U+5243,U+531d,U+536f,U+53a5,U+53ae,U+53f1,U+541d,U+5431,U+547b,U+5492,U+5494,U+54a4,U+54aa,U+54ce,U+54fd,U+5509,U+5520,U+553e,U+557b,U+55c5,U+55e1,U+55f7,U+5608,U+5636,U+563b,U+5773,U+57a0,U+5811,U+587e,U+58d5,U+59e3,U+5a29,U+5a6a,U+5a76,U+5a7a,U+5ac9,U+5b62,U+5b95,U+5c49,U+5c8c,U+5cab,U+5cb7,U+5d02,U+5d58,U+5e44,U+5e7a,U+5eff,U+5f29,U+5f89,U+5f9c,U+5fa8,U+6005,U+6043,U+60b8,U+60d8,U+60ec,U+60f0,U+6115,U+618e,U+630e,U+637a,U+6390,U+63ac,U+63b0,U+64de,U+6525,U+6538,U+65ee-65ef,U+6631,U+6636,U+6654,U+677c,U+67b8,U+67d8,U+683e,U+6886,U+68b5,U+692d,U+6963,U+6979,U+6988,U+6b59,U+6b9a,U+6c69,U+6c74,U+6cae,U+6ce0,U+6cef,U+6d95,U+6dc5,U+6dde,U+6de6,U+6dfc,U+6ea7,U+6f15,U+6f29,U+7096,U+70c3,U+7131,U+715c,U+7166,U+7266,U+7317,U+731d,U+7329,U+73e9,U+7425,U+7455,U+7490,U+74ef,U+7519,U+75b5,U+75b9,U+75de,U+7656,U+7663,U+7691,U+7729,U+77fe,U+783e,U+787c,U+795a,U+7a79,U+7abf,U+7b3a,U+7b4f,U+7b60,U+7b75,U+7b8d,U+7bb4,U+7bd3,U+7be1,U+7cbc,U+7edb,U+7f1c,U+7f8c,U+7fb2,U+7fb9,U+7fce,U+7ff1,U+810d,U+81c6,U+82a5,U+82aa,U+82de,U+8317,U+8343,U+835e,U+8364,U+836a,U+853a,U+8543,U+854a,U+8559,U+8568,U+85b0,U+85b9,U+864f,U+86e4,U+8715,U+8845,U+8884,U+88e8,U+88f1,U+8983,U+8be1,U+8c1f,U+8c27,U+8c5a,U+8c82,U+8d58,U+8dbe,U+8f98,U+9035,U+9074,U+90a1,U+9149,U+9157,U+93d6,U+949d,U+94c2,U+94e3-94e4,U+95eb,U+95f0,U+9611,U+9619,U+9642,U+968d,U+9706,U+970f,U+97ed,U+988a,U+9893,U+98e8,U+9a77,U+9a87,U+9aa1,U+9abc,U+9cdd,U+9e2f,U+9e33,U+9e44,U+9e5c,U+9e9d,U+9edd" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-774d4f764a1299da5d28ec2f2ffe0d69.woff2",
			descriptors: { unicodeRange: "U+4f58,U+4f6c,U+4f70,U+4fd0,U+5014,U+51bd,U+524c,U+5315,U+5323,U+535e,U+540f,U+542d,U+545b,U+548e,U+549a,U+54ab,U+54fc,U+5567,U+556a,U+5600,U+5618,U+563f,U+5669,U+56f1,U+56ff,U+573b,U+574d,U+579b,U+57b8,U+57c2,U+586c,U+58f9,U+595a,U+598d,U+5993,U+5996,U+59d7,U+5b7a,U+5ba6,U+5c4e,U+5c96,U+5ce5,U+5eb6,U+5f08,U+5f99,U+602f,U+6059,U+606c,U+607a,U+60ed,U+61a9,U+620c,U+6249,U+62a8,U+62c4,U+62ed,U+62fd,U+6342,U+6345,U+6396,U+63a3,U+6402,U+6413,U+642a,U+6487,U+64a9,U+64ac,U+64ae,U+64b7,U+659f,U+65a1,U+667e,U+66f3,U+67e0,U+69db,U+69df,U+6aac,U+6b86,U+6c50,U+6c5e,U+6c76,U+6c85,U+6c8c,U+6cde,U+6d19,U+6d52,U+6da7,U+6db8,U+6e1a,U+6e25,U+6e4d,U+6e5f,U+6ec1,U+6f31,U+6f7a,U+6fa7,U+6fe1,U+701b,U+70ab,U+70f7,U+717d,U+71a8,U+7252,U+72c4,U+72e1,U+7315,U+736d,U+73ae,U+73c0,U+73c2,U+740f,U+75a4,U+7600-7601,U+768b,U+76bf,U+76d4,U+7728,U+772f,U+776c,U+77a0,U+77b0,U+77f8,U+783a,U+78d0,U+78fa,U+7977,U+7a37,U+7a92,U+7afa,U+7b71,U+7b94,U+7cef,U+7f28,U+7fe1,U+808b,U+80e5,U+80eb,U+8110,U+8113,U+812f,U+814c,U+81c3,U+8235,U+82d4,U+8309,U+83c1,U+8431,U+8469,U+84bf,U+84d3,U+84df,U+84e6,U+8511,U+8638,U+86c0,U+86db,U+86fe,U+8757,U+8822,U+8882,U+8885,U+8892,U+88f3,U+892a,U+8ba5,U+8bd9,U+8be0,U+8be7,U+8bfd,U+8c1a,U+8d4a,U+8d4e,U+8d66,U+8dda,U+8e0c,U+8e52,U+8e74,U+8e87,U+8f76,U+8fc2,U+8fe6,U+900d,U+9068,U+90ac,U+90b3,U+90b8,U+90e7,U+9119,U+9131,U+915a,U+916e,U+94b4,U+94d0,U+94e2,U+94ec,U+94ff,U+9522,U+9535,U+9556,U+965b,U+96f9,U+9774,U+9981,U+998d,U+998f,U+9a6e,U+9a7f,U+9a8a,U+9b13,U+9c9f,U+9e3e,U+9e43,U+9e6d,U+9e8b,U+9e92,U+9edb,U+9eef" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-7718fe60986d8b42b1be9c5ace5ccf25.woff2",
			descriptors: { unicodeRange: "U+4e10,U+4e56,U+4e98,U+4ec3,U+4f3a,U+4f5f,U+4f88,U+4f97,U+4fa5,U+4fe8,U+504c,U+5197,U+52fa,U+5364,U+53e8,U+5406,U+543c,U+545c,U+5471,U+5480,U+5495,U+54b3,U+54df,U+54e6,U+54ee,U+557c,U+5583,U+55dc,U+55e3,U+566c,U+592f,U+5944,U+5983,U+59ca,U+59e5,U+5a13,U+5a7f,U+5b09,U+5bd0,U+5e4c,U+5eb5,U+5f1b,U+5f3c,U+608d,U+60cb,U+61a7,U+61ac,U+61cb,U+6233,U+62a0,U+62e7,U+62ee,U+62f4,U+62f7,U+634e,U+6382,U+63c9,U+63ea,U+6400,U+645e,U+6482,U+6556,U+6593,U+6615,U+664f,U+66e6,U+672d,U+675e,U+67da,U+6805,U+6808,U+6868,U+68a2,U+695e,U+69ad,U+6a80,U+6a90,U+6b83,U+6be1,U+6c30,U+6cad,U+6cb1,U+6cf1,U+6d31,U+6d93,U+6dae,U+6dbf,U+6dc6-6dc7,U+6e0d,U+6e32,U+6e3a,U+6e85,U+6eba,U+6f3e,U+6f5e,U+6f7c,U+6fee,U+71ee,U+722a,U+72b7,U+72e9,U+73ba,U+73d1,U+7409,U+7435-7436,U+7459-745a,U+747e,U+7487,U+74e2,U+7504,U+752c-752d,U+7599,U+759f,U+75a1,U+75ca,U+75f0,U+761f,U+7629,U+777f,U+7785,U+77a5,U+77bf,U+78d5,U+7934,U+7940,U+79a7,U+7b19,U+7c38,U+7c95,U+7cb1,U+7ce0,U+7eca,U+7ef7,U+7f2b,U+7f81,U+7fcc,U+8046,U+8148,U+8165,U+819b,U+81ba,U+828b,U+82ae,U+82b7,U+82d3,U+8301,U+830e,U+831c,U+8338,U+837c,U+8393,U+8398,U+83ba,U+83e0,U+83e9,U+853c,U+8654,U+86df,U+8712,U+873f,U+874e,U+8783,U+8859,U+88a4,U+8925,U+8bb7,U+8bff,U+8c19,U+8c1b,U+8c24,U+8c2c,U+8d61,U+8db4,U+8e6c,U+8f8a,U+8fe5,U+8ff8,U+901e,U+90f4,U+912f,U+9163,U+9170,U+91dc,U+949b,U+94a8,U+94b3,U+94c0,U+94e8,U+9525,U+9530,U+9539,U+954c-954d,U+9550,U+955b,U+962a,U+9685,U+96cc,U+9776,U+988d,U+9975,U+9985,U+9a6f,U+9aa5,U+9ab8,U+9c7f,U+9ca4,U+9cb8,U+9e25,U+9e35,U+9e4a" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-aa5c9ca6cf4fba00433b7aa3fa10671a.woff2",
			descriptors: { unicodeRange: "U+4ea2,U+4ea5,U+4f36,U+4f84,U+4f8d,U+501a,U+5029,U+516e,U+51a5,U+51c4,U+51f8,U+5201,U+527f,U+5321,U+5352,U+5366,U+53e9,U+54c7,U+5632,U+5676,U+56b7,U+56bc,U+56da,U+56e4,U+5703,U+5729,U+5742,U+57a2-57a3,U+5815,U+58d1,U+5919,U+592d,U+5955,U+5a05,U+5a25,U+5a34,U+5b70,U+5b75,U+5bdd,U+5bf0,U+5c41,U+5c79,U+5c91,U+5c94,U+5ce6,U+5ced,U+5d69,U+5dc5,U+5e16,U+5e27,U+5f27,U+5f95,U+5ffb,U+6020,U+604d,U+6055,U+60e6,U+60eb,U+6123,U+618b,U+61a8,U+620d,U+62c7,U+62ce,U+62d9,U+631f,U+634d,U+6452,U+6479,U+64ce,U+64d2,U+655b,U+660a,U+6726,U+67c4,U+6809,U+6853,U+68e3,U+68f1,U+68fa,U+693f,U+6942,U+6995,U+69a8,U+69b4,U+6a71,U+6b89,U+6bcb,U+6bd3,U+6bd9,U+6c40,U+6cf8,U+6cfe,U+6d85,U+6da3,U+6daa,U+6e0e,U+6e43-6e44,U+6f88,U+7078,U+7099,U+70bd,U+70d9,U+70fd,U+7109,U+7184,U+7239,U+733f,U+73f2,U+748b,U+749c,U+749e,U+759a,U+75d2,U+75eb,U+7620,U+766b,U+7693,U+76cf,U+7738,U+773a,U+776b,U+778e,U+77aa,U+7852,U+78be,U+7948,U+795b,U+7960,U+796f,U+79ba,U+7a20,U+7a96,U+7aa5,U+7b03,U+7b28,U+7b50,U+7b77,U+7bc6,U+7bf1,U+7c27,U+7d0a,U+7ead,U+7ec5,U+7ee2,U+7ef0,U+7efd,U+7f0e,U+7f2e,U+7f79,U+7f9a,U+8098,U+80da,U+80e7,U+80f0,U+80f3,U+80fa,U+818a,U+81e7,U+8237-8238,U+8299,U+82b8,U+82ce,U+837b,U+83bd,U+83cf,U+8426,U+8475,U+85c9,U+85d5,U+85dc,U+85e9,U+871a,U+8747,U+8749,U+888d,U+8910,U+891a,U+8bb4,U+8be3,U+8bec,U+8bf2,U+8c06,U+8c0d,U+8d31,U+8d48,U+8de4,U+8e1e,U+8e4a,U+8e66,U+8f84,U+8f97,U+9083,U+90e1,U+9165,U+91c9,U+94b0,U+94f5,U+9504,U+9532,U+956d,U+95f5,U+95fa,U+9668,U+9698,U+96bd,U+9704,U+9773,U+9890,U+996a,U+997a,U+9a74,U+9a8b,U+9cc4,U+9ccc" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-4f50e5136e136527280bc902c5817561.woff2",
			descriptors: { unicodeRange: "U+4ea8,U+4f1e,U+4f51,U+4f63,U+4f7c,U+4f83,U+4fa0,U+4fd1,U+4ffa,U+5018,U+5026,U+508d,U+50bb,U+50f5,U+50fb,U+5162,U+5319,U+5320,U+538c,U+5413,U+541f,U+5475,U+54bd,U+54d1,U+5589,U+5598,U+575f,U+57ae,U+57e0,U+5937,U+5974,U+5978,U+59ae,U+5a1f,U+5a49,U+5ab3,U+5b99,U+5b9b,U+5ba0,U+5be1,U+5be5,U+5c09,U+5c27,U+5de2,U+5e9a,U+5f26,U+5f8a,U+5f98,U+6021,U+606d,U+60bc,U+60d5,U+60e7,U+611a,U+614c,U+6254,U+626f,U+6292,U+6296,U+62b9,U+62e2,U+631a,U+631d,U+6320,U+6346,U+63ba,U+6467,U+64bc,U+658b,U+663c,U+6643,U+6652,U+6656,U+6687,U+66d9,U+66dd,U+66f0,U+673d,U+67ab,U+6816-6817,U+68a7,U+68ad,U+68cd,U+68e0,U+6986,U+69fd,U+6b47,U+6bd7,U+6c1f,U+6c2e-6c2f,U+6cbe,U+6de4,U+6e1d,U+6e83,U+6e9c,U+6ed4-6ed5,U+6f4d,U+70f9,U+7130,U+716e,U+718f,U+71ac,U+71e5,U+72fc,U+731c,U+7334,U+73ca,U+7422,U+7426,U+745f,U+7470,U+75af,U+75f4,U+762b,U+763e,U+7696,U+7737,U+7741,U+77a7,U+77bb,U+77ee,U+785d,U+788c,U+78ca,U+7901,U+796d,U+7985,U+79fd,U+7a3c,U+7a57,U+7a74,U+7b5b,U+7caa,U+7cb9,U+7cd5,U+7eac,U+7eb6,U+7ed1,U+7ee5,U+7f20,U+7f2a,U+7f38,U+7f69,U+7fa1,U+8018,U+8038,U+803f,U+804b,U+80a2,U+80be,U+80d6,U+817a,U+81fb,U+820c,U+82ad,U+82af,U+82bd,U+8327,U+8354,U+835f,U+8367,U+836b,U+840c,U+841d,U+8471,U+849c,U+84b2,U+84c9,U+8517,U+851a,U+8549,U+8681,U+8721,U+8776,U+88d9,U+88f9,U+89c5,U+8c1c,U+8c34,U+8d81,U+8d9f,U+8e0a,U+8e72,U+8eb2,U+8fed,U+901b,U+902e,U+906e,U+9091,U+90aa,U+90af,U+915d,U+9171,U+946b,U+9489,U+9499,U+94a5,U+9508,U+9524,U+952d,U+9551,U+9576,U+95f7,U+9600,U+96b6,U+96c0,U+9756,U+97f6,U+98a0,U+98a4,U+997f,U+9a73,U+9a86,U+9ad3,U+9e3d,U+9ed4" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-093b9ef39a46ceae95a1df18a0a3a326.woff2",
			descriptors: { unicodeRange: "U+4e4d,U+4e5e,U+4ec7,U+4ed5,U+50da,U+50e7,U+515c,U+51a4,U+51ff,U+5203,U+5254,U+5300,U+533e,U+5375,U+53ee,U+5435,U+543b,U+5455,U+548b,U+548f,U+54d7,U+54fa,U+5578,U+5587,U+55a7,U+560e,U+5760,U+576f,U+5777,U+5830,U+58a9,U+5962,U+59e8,U+5a07,U+5a23,U+5a3c,U+5b5a,U+5bb5,U+5bc5,U+5bde,U+5c7f,U+5cb1,U+5ce8,U+5cea,U+5d29,U+5d4c,U+5e18,U+5f57,U+5f5d,U+5f87,U+5ff1,U+6016,U+601c,U+6064,U+6177,U+61d2,U+625b,U+62e3,U+62f1,U+634f,U+63a0,U+6401,U+6405,U+6495,U+64c2,U+6512,U+6577,U+6590,U+65a7,U+65a9,U+65f7,U+6627,U+6655,U+6714,U+6795,U+67d1,U+67ff,U+68b3,U+68d5,U+68d8,U+6930,U+6960,U+6977,U+69bb,U+69d0,U+6a31,U+6b7c,U+6bb4,U+6c22,U+6c72,U+6c79,U+6c7e,U+6c81,U+6c93,U+6ca5,U+6cbc,U+6ce3,U+6cfb,U+6d3c,U+6da9,U+6df3,U+6e2d,U+6eaf,U+6ec7,U+6f13,U+6f33,U+6f62,U+6fa1,U+7011,U+707c,U+708a,U+70c1,U+70d8,U+70eb,U+711a,U+7194,U+7281,U+7316,U+7357,U+7384,U+7405,U+742a,U+745b,U+7574,U+7578,U+75ea,U+7682,U+7792,U+77d7,U+77e9,U+77eb,U+77f6,U+780c,U+78c5,U+7941,U+79e4,U+7a1a,U+7a9c,U+7ad6,U+7b5d,U+7bf7,U+7c07,U+7c3f,U+7c9f,U+7ca5,U+7cdf,U+7e82,U+7eab,U+7ece,U+7eda,U+7f09,U+7f15,U+7f9e,U+7fdf,U+7fe9,U+803b,U+803d,U+80aa,U+80b4,U+813e,U+8155,U+817b,U+819d,U+821c,U+82b9,U+82df,U+82ef,U+8304,U+83b9,U+8446,U+853d,U+85af,U+85fb,U+8650,U+865e,U+86d9,U+86ee,U+8700,U+8862,U+889c,U+88d4,U+88f8,U+895f,U+8a79,U+8bb3,U+8bb6,U+8bc0,U+8beb,U+8bf5,U+8c23,U+8c79,U+8d1e,U+8dcb,U+8e29,U+8e44,U+8e81,U+8eac,U+8eaf,U+8f8d,U+9050,U+90f8,U+914b,U+948a,U+94be,U+94ee,U+950c,U+9540,U+962e,U+9647,U+9661,U+9699,U+96cf,U+9716,U+9761,U+97a0,U+97e7,U+9a7c,U+9a8f,U+9ae6,U+9cd6,U+9e26" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-a0ca5df4258213d7fc9fce80f65ce760.woff2",
			descriptors: { unicodeRange: "U+4fa3,U+4fae,U+4fd8,U+4fef,U+50a3,U+5189,U+5195,U+51db,U+51f3,U+51f9,U+5220,U+5228,U+5288,U+52ff,U+532e,U+533f,U+5351,U+53db,U+53ed,U+5450,U+5484,U+5490,U+54c9,U+54e9,U+5501,U+5507,U+5543,U+55d3,U+56a3,U+575e,U+589f,U+5984,U+59ec,U+5a04,U+5a36,U+5a77,U+5a9a-5a9b,U+5ab2,U+5ac2,U+5ad6,U+5bc7,U+5c2c,U+5c34,U+5c51,U+5cd9,U+5d0e,U+5deb,U+5e3c,U+5e87,U+5ed3,U+5f13,U+5f64,U+5fe1,U+606a,U+6096,U+60df,U+60f6,U+60f9,U+6151,U+620e,U+6241,U+6252,U+6273,U+627c,U+6289,U+62c2,U+62cc,U+62ef,U+6361,U+6363,U+63b7,U+63e3,U+6518,U+66ae,U+6756,U+6789,U+6813,U+6829,U+6862,U+6866,U+6893,U+6897,U+690e,U+6984,U+69cc,U+6a1f,U+6a44,U+6a59,U+6ba1,U+6c13,U+6c90,U+6ca6,U+6cbd,U+6ccc,U+6cd3,U+6cd7,U+6d4a,U+6d4f,U+6d5a,U+6d9f,U+6da1,U+6dcc,U+6ea5,U+6ee4,U+6ee6,U+6f2f,U+6f8e,U+701a,U+7095,U+709c,U+70af,U+70db,U+70e8,U+714e,U+715e,U+71a0,U+71ce,U+7235,U+7280,U+72d0,U+72f8,U+73ab,U+7410,U+745c,U+7480,U+74a7-74a8,U+74e3,U+75ae,U+75f9,U+76b1,U+76ce,U+7736,U+77e2-77e3,U+781a,U+789f,U+797a,U+79be,U+79c3,U+79c6,U+79f8,U+7a8d,U+7a98,U+7aa6,U+7aff,U+7b1b,U+7cd9,U+7d6e,U+7ede,U+7eee,U+7f00,U+7f24,U+7f2d,U+7fd8,U+800d,U+8116,U+8151,U+81b3,U+8205,U+82c7,U+82db,U+832c,U+8335,U+8339,U+8386,U+846b,U+8587,U+8611,U+8682,U+868a,U+868c,U+8774,U+88d8,U+88f4,U+8912,U+8b6c,U+8bbd,U+8c0e,U+8c41,U+8d26,U+8d3b-8d3c,U+8d50,U+8dea,U+8e35,U+8f99,U+8fe2,U+8fe9,U+9017,U+914c,U+916f,U+9175-9176,U+918b,U+94a0,U+94ae,U+94ce,U+94f2,U+951a,U+952f,U+9541,U+9640,U+9672,U+968b,U+96cd,U+96ef,U+9713,U+97ec,U+9885,U+9992,U+9a6d,U+9a79,U+9a85,U+9cbb,U+9cd7,U+9cde,U+9e93,U+9f9f" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-d2666cbed13462c5dc36fa2f15c202ca.woff2",
			descriptors: { unicodeRange: "U+4e11,U+4ed7,U+4fcf,U+4fe9,U+4fed,U+50ac,U+50b2,U+5112,U+5180,U+5188,U+51f6,U+522e,U+5265,U+52cb,U+52df,U+5349,U+5367,U+5378,U+537f,U+5395,U+5398,U+53d4,U+543e,U+5440,U+5446,U+54b8,U+5565-5566,U+5580,U+55bb,U+56ca,U+572d,U+573e,U+574e,U+5782-5784,U+58f3,U+5938-5939,U+5948,U+594e,U+5a1c,U+5a74,U+5ae9,U+5b55,U+5b5c,U+5bb0,U+5bd3,U+5bf8,U+5c3f,U+5d14,U+5d2d,U+5df7,U+5dfe,U+5e05-5e06,U+5e1c,U+5e62,U+5e7b,U+5e7d,U+5ed6,U+5f2f,U+5f66,U+5f6c,U+5fa1,U+604b,U+609f,U+60a6,U+60e8,U+6101,U+6124,U+6127,U+6148,U+61be,U+6247,U+62d8,U+62da,U+633d,U+635e,U+6367,U+6380,U+638f,U+63a9,U+63fd,U+641c,U+64e6,U+655e,U+6572,U+6591,U+65a5,U+6691,U+6735,U+67a2-67a3,U+67ef,U+680b,U+6876,U+6905,U+6a0a,U+6a61,U+6b79,U+6bb7,U+6bbf,U+6c41,U+6c55,U+6c83,U+6c9b,U+6ca7,U+6cfc,U+6d46,U+6d51,U+6d74,U+6d9d,U+6daf,U+6dc0,U+6deb,U+6e17,U+6e24,U+6e89,U+6ea2,U+6ef4,U+6f6d,U+707f,U+70b3,U+70e4,U+70ef,U+710a,U+722c,U+725f,U+7261,U+72ee,U+72f1,U+730e,U+732b,U+7433,U+7538,U+75bc,U+7624,U+7709,U+7750,U+7779,U+7802,U+7898,U+78a7,U+78b1,U+78cb,U+78f7,U+7984,U+7a83,U+7aed,U+7b3c,U+7b4b,U+7c92,U+7c98,U+7ca4,U+7eb9,U+7ee3,U+7ef3,U+7ef5,U+7f05,U+7f55,U+7f62,U+7fc1,U+7fd4,U+7fe0,U+8042,U+806a,U+80a0,U+80a4,U+80c3,U+8102,U+8106,U+814a,U+8154,U+8247,U+8258,U+82cd,U+8328,U+832b,U+8389,U+83ca,U+845b,U+846c,U+84b8,U+8574,U+859b,U+8680,U+8695,U+86c7,U+8702,U+886c,U+8896,U+88b1,U+88e4,U+8bc8,U+8c10,U+8c26,U+8c28,U+8c2d,U+8d4c,U+8d63,U+8f67,U+8f74,U+8fc4,U+9006,U+9063,U+90a2,U+90b1,U+90c1,U+9177,U+9189,U+9493,U+949e,U+94fe,U+9610,U+961c,U+96a7,U+96fe,U+978d,U+97f5,U+9888,U+997c,U+9a84,U+9b3c,U+9b44-9b45,U+9b54,U+9e64,U+9f0e,U+9f9a" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-1e6fd68f1f3902ce48ce8c69df385622.woff2",
			descriptors: { unicodeRange: "U+4e19,U+4e38,U+4e53,U+4e7e,U+4e9f,U+4ec6,U+4f50,U+4fde,U+502a,U+5154,U+517d,U+51d1,U+51f0,U+5239,U+5256,U+52c9,U+52fe,U+5308,U+532a,U+535c,U+5384,U+53a2,U+53a8,U+53c9,U+53e0,U+5496,U+54ac,U+54c0,U+54c4,U+54e8,U+5561,U+5582,U+561b,U+5631,U+566a,U+5764,U+576a,U+5792,U+57ab,U+584c,U+5885,U+58f6,U+59a8,U+5acc,U+5bc2,U+5c38-5c39,U+5c60,U+5c6f,U+5c82,U+5c90,U+5d16,U+5dcd,U+5e37,U+5e90,U+5eb8,U+5f6a,U+5fcc,U+6012,U+6068,U+6073,U+607c,U+6094,U+6109,U+621a,U+626e,U+6284,U+62d0,U+62e6,U+62fe,U+6321,U+6328,U+632b,U+6349,U+6454,U+65ed,U+660f,U+6674,U+66a8,U+6749,U+674f,U+6760,U+67af,U+6850,U+6854,U+6869,U+68a8,U+68d2,U+68f5,U+6912,U+6b49,U+6b6a,U+6bef,U+6c28,U+6c5d,U+6c82,U+6cab,U+6cb8,U+6cc4,U+6cf5,U+6d47,U+6d78,U+6da4,U+6dc4,U+6dcb,U+6df9,U+6e0a,U+6e23,U+6e5b,U+6eb6,U+6f06,U+6f47,U+6f84,U+6f9c,U+6fd2,U+7076,U+70ac,U+7199,U+723d,U+72ac,U+72ed,U+7476,U+7529,U+752b,U+754f,U+7554,U+75d5,U+7626,U+76ef,U+7720,U+7766,U+7784,U+77ac,U+780d,U+7838,U+7845,U+786b,U+78b3,U+7978,U+79b9,U+79c9,U+79e7,U+7a3d,U+7a84,U+7a9f,U+7b0b,U+7b52,U+7c7d,U+7f1a,U+7fc5,U+7ff0,U+804a,U+8086-8087,U+808c,U+809a,U+80ba,U+810a,U+8180,U+818f,U+81c2,U+81ed,U+8231,U+8292,U+829c,U+82a6,U+82d1,U+8346,U+838e,U+839e,U+83c7,U+83f1,U+8403,U+840e,U+8513,U+857e,U+85e4,U+867e,U+871c,U+87ba,U+87f9,U+884d,U+8944,U+8a93,U+8c05,U+8d2c,U+8d2e,U+8d42-8d43,U+8dfb,U+8e22,U+8eba,U+8f69,U+8f9c,U+8fa3,U+8fa8,U+8fb1,U+900a,U+9038,U+903b,U+9042,U+904f,U+90b5,U+90dd,U+9102,U+9187,U+94a7,U+94c5,U+9523,U+95f8,U+95fd,U+960e,U+964b-964c,U+96c1,U+9709,U+971c,U+97ad,U+9882,U+9965,U+9976,U+9988,U+99a8,U+9a82,U+9a9a,U+9b41,U+9c8d,U+9e45,U+9e70,U+9e9f,U+9f3b,U+9f7f" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-87599f94b6cc129d505b375798d0d751.woff2",
			descriptors: { unicodeRange: "U+4e08,U+4e18,U+4e1b,U+4e22,U+4e27,U+4e32,U+4e52,U+4e73,U+4ead,U+4ed4,U+4ed9,U+4ef0,U+4fa6,U+5076,U+5179,U+51bb,U+51c9,U+51ef,U+51fd,U+524a,U+526a,U+529d,U+52ab,U+5306,U+5339,U+53d9,U+540a,U+5410,U+541e,U+5439,U+54b1,U+54ed,U+5564,U+558a,U+55b7,U+5634,U+574a,U+5751,U+57a6,U+57cb,U+57d4,U+5824,U+582a,U+5835,U+5858,U+5893,U+58e4,U+5951,U+5986,U+59da,U+59fb,U+59ff,U+5a03,U+5a46,U+5ac1,U+5b5d,U+5bfa,U+5c18,U+5c3a,U+5c48,U+5c4f,U+5c61,U+5cb3,U+5d1b,U+5e15,U+5e3d,U+5e99,U+5e9e,U+5eca,U+5f0a,U+5f17-5f18,U+5f25,U+5f7c,U+5fcd,U+6028,U+60a0,U+60ac,U+60d1,U+614e,U+6155,U+6168,U+61c8,U+6208,U+6212,U+6251,U+629a-629b,U+62ab-62ac,U+62fc,U+6323,U+632a,U+63d2,U+643a,U+6491-6492,U+649e,U+64b0,U+64c5,U+659c,U+6614,U+662d,U+6664,U+6670,U+6676,U+6746,U+67cf,U+67d4,U+682a,U+6843,U+6846,U+68da,U+6b3a,U+6b67,U+6c27,U+6c5b,U+6c64,U+6c70,U+6caa,U+6cca,U+6ce1,U+6d12,U+6d45,U+6dd1,U+6dd8,U+6e34,U+6e7f,U+6ee5,U+6f02,U+7092,U+70c2,U+70e6,U+7115,U+7237,U+7272,U+727a,U+72c2,U+739b,U+73b2,U+743c,U+751c,U+758f,U+75b2,U+7686,U+76c6,U+76d2,U+76fc,U+775b,U+77a9,U+7816,U+788e,U+7897,U+78b0,U+79bd,U+7a0d,U+7a91,U+7a9d,U+7ae3,U+7bad,U+7cca,U+7d2b,U+7eb1,U+7f06,U+7f14,U+7f1d,U+7f50,U+7ffc,U+8036,U+80bf,U+80c1,U+80ce,U+80f8,U+8109,U+810f,U+8170,U+8179,U+819c,U+821f,U+8230,U+8236,U+8273,U+829d,U+82f9,U+8305,U+8350,U+83b2,U+83cc,U+8404,U+840d,U+8427,U+8482,U+8679,U+8854,U+886b,U+8bbc,U+8be6,U+8c31,U+8c6b,U+8d4b,U+8dcc,U+8e2a,U+8e48,U+8f90,U+8fb0,U+9022,U+903c,U+903e,U+9065,U+916c,U+917f,U+94a9,U+94c3,U+94dd,U+94ed,U+9510,U+953b,U+96c7,U+970d,U+9738,U+9877,U+987d,U+989c,U+98d8,U+9a70,U+9a91,U+9aa4,U+9b42,U+9b4f,U+9e2d,U+9e3f,U+9e7f,U+9f20" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-06c77b8c66e51ed6c63ccb502dd8b8af.woff2",
			descriptors: { unicodeRange: "U+4e59,U+4ed3,U+4f0f,U+4f38,U+4f69,U+4fa7,U+4faf,U+4ff1,U+5077,U+5085,U+5144,U+5151,U+51af,U+51b6,U+51cc,U+523a,U+5251,U+5269,U+5272,U+52d8,U+5353,U+5389,U+53f9,U+5401,U+5415,U+541b,U+54f2,U+5524,U+554a,U+559d,U+5609,U+5740,U+575d,U+5806,U+5821,U+586b,U+5915,U+594f,U+5960,U+5999,U+59a5,U+59b9,U+59c6,U+59d1,U+59dc,U+5b5f,U+5b64,U+5b87,U+5bb4,U+5bbf,U+5c16,U+5c1d,U+5c3e,U+5c9a,U+5ca9,U+5cad,U+5cfb,U+5de1,U+5de7,U+5de9,U+5ef7,U+5f04,U+5f70,U+5f79,U+5fc6,U+602a,U+6050,U+6052,U+6070,U+6084,U+60b2,U+60dc,U+60e9,U+6167,U+6170,U+61c2,U+6270,U+6291,U+62b1,U+62bc,U+62dc,U+62df,U+62f3,U+6324,U+633a,U+6377,U+6398,U+63cf,U+640f,U+642c-642d,U+6458,U+6478,U+6500,U+654c,U+6566,U+658c,U+65c1,U+65cb,U+65e8,U+65ec,U+6696-6697,U+6734,U+679a,U+679d,U+67dc,U+67f3-67f4,U+680f,U+683d,U+684c,U+68af,U+699c,U+6bc1,U+6c0f,U+6c1b,U+6c57,U+6c6a,U+6d3d,U+6d6e,U+6d82,U+6db5,U+6dee,U+6e58,U+6eaa,U+6ecb,U+6ede,U+6ee9,U+6f0f,U+6f20,U+6f58,U+704c,U+7070,U+70b8,U+718a,U+7238,U+7262,U+7275,U+72b9,U+72d7,U+72e0,U+741b,U+7434,U+7483,U+74f6-74f7,U+75ab,U+764c,U+7761,U+7855,U+7891,U+78c1,U+79d2,U+7a00,U+7a3b,U+7c97,U+7ea4,U+7eb2,U+7ed2,U+7eea,U+7ef8,U+7f18,U+7fbd,U+8000,U+8010,U+8096,U+809d,U+80a9,U+817f,U+81e3,U+8206,U+8212,U+82ac,U+8302,U+8361,U+8377,U+83f2,U+8461,U+848b,U+84ec,U+8521,U+85aa,U+8870,U+8877,U+8881,U+888b,U+88ad,U+88c2,U+8986,U+8bd1,U+8bf1,U+8d24,U+8d2a,U+8d3e-8d3f,U+8d41,U+8d56,U+8d64,U+8d6b,U+8e0f,U+8f70,U+8f85,U+8f88,U+8fa9,U+9003,U+901d,U+90b9,U+90ce,U+94a6,U+94f8,U+9505,U+95ea,U+95ef,U+95f2,U+95f9,U+9601,U+9605,U+9634,U+966a,U+9677,U+9690,U+9694,U+96d5,U+971e,U+9896-9897,U+9972,U+9a71,U+9a76,U+9a7e,U+9e1f,U+9e23" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-13ae07ed2e272d26d59bc0691cd7117a.woff2",
			descriptors: { unicodeRange: "U+4e01,U+4e43,U+4ea6,U+4ef2,U+4eff,U+4f26,U+4f2a,U+4f2f,U+4f5b,U+4fa8,U+4fca,U+4fd7,U+5021,U+504f,U+5141,U+51c0,U+51dd,U+51e4,U+51ed,U+5200,U+5237,U+5427,U+5448,U+54a8,U+5706,U+5708,U+5723,U+575b,U+57c3,U+5899,U+58a8,U+58c1,U+5976,U+5988,U+59bb,U+59d0,U+59d3,U+5a18,U+5a31,U+5a92,U+5b54,U+5b85,U+5baa-5bab,U+5bc4,U+5bd2,U+5be8,U+5bff,U+5c65,U+5d07,U+5e1d,U+5e78,U+5e7c,U+5f03,U+5f1f,U+5f39,U+5f6d,U+5f92,U+5faa,U+5fbd,U+5fe7,U+5ffd,U+60a8,U+60ef,U+6108,U+6162,U+622a,U+6234,U+626b,U+626d,U+62c6,U+62d2,U+62d4,U+62d6,U+62e8,U+6316,U+6355,U+63ed,U+6447,U+64a4,U+65f1,U+6606,U+6628,U+664b,U+6668,U+6682,U+66f9,U+66fc,U+66ff,U+6717,U+6740,U+676d,U+67aa,U+67ec,U+67f1,U+6842,U+6851,U+695a,U+6982,U+6a2a,U+6b20,U+6b23,U+6b32,U+6b96,U+6bc5,U+6beb,U+6c60,U+6c9f,U+6cea,U+6cf3,U+6d1e,U+6d53,U+6d66,U+6d69,U+6d8c,U+6d9b,U+6db2,U+6de1,U+6dfb,U+6e14,U+6ed1,U+6eda,U+6ee8,U+6f2b,U+706d,U+7089,U+708e,U+70ad-70ae,U+70e7,U+7126,U+714c,U+71c3,U+71d5,U+7206,U+7259,U+731b,U+73a9,U+73bb,U+74dc,U+7532,U+7545,U+755c,U+75c7,U+7687,U+76d7,U+76f2,U+788d,U+78e8,U+79e6,U+79e9,U+7a3f,U+7a46,U+7a97,U+7af9,U+7bee,U+7c4d,U+7c89,U+7cd6,U+7eb5,U+7ebd,U+7ed8,U+8017,U+8033,U+80c0,U+80de,U+80f6,U+8138,U+817e,U+81a8,U+820d,U+827e,U+82b3,U+82d7,U+83b1,U+84c4,U+84dd,U+8584,U+864e,U+865a,U+866b,U+86cb,U+88d5,U+89e6,U+8bca,U+8bde,U+8bfa,U+8c0a,U+8c37,U+8c46,U+8c6a,U+8c8c,U+8d1d,U+8d29,U+8d4f,U+8d54,U+8d5a,U+8d60,U+8d62,U+8f7f,U+8f96,U+8f9e-8f9f,U+8fc1,U+8fdf,U+8fea,U+8ff7,U+9012,U+906d,U+9075,U+90a6,U+90bb,U+90ca,U+9178,U+9192,U+91ca,U+94bb,U+94dc,U+94fa,U+9501,U+950b,U+9521,U+955c,U+963b,U+9655,U+9675-9676,U+9887,U+9891,U+9971,U+9a97,U+9ece,U+9ed8" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-353f33792a8f60dc69323ddf635a269e.woff2",
			descriptors: { unicodeRange: "U+4e1d,U+4e39,U+4e4c,U+4e4f,U+4e54,U+4e58,U+4e95,U+4ea1,U+4eab,U+4eae,U+4ec1,U+4f10,U+4f19,U+4f30,U+4f34,U+4fb5,U+503e,U+518c,U+5192,U+51a0,U+51ac,U+51b0,U+51e1,U+5211,U+5242,U+52a3,U+52b2,U+52c3,U+52c7,U+52d2,U+52e4,U+5377,U+539a,U+53a6,U+53e5,U+5417,U+5510,U+552f,U+5531,U+574f-5750,U+5761,U+5851,U+5854,U+58ee,U+593a,U+5949,U+5954,U+5a5a,U+5b8b,U+5bbd,U+5c04,U+5c0a,U+5c4b,U+5ce1,U+5cf0,U+5e10,U+5e8a,U+5e9f,U+5ec9,U+5f31,U+5f84,U+5fd8-5fd9,U+5fe0,U+6015,U+6062,U+6069,U+6076,U+6089,U+60a3,U+60ca,U+620f,U+624e,U+6263,U+6298,U+62a2,U+62bd,U+6311,U+6350,U+6389,U+638c,U+63f4,U+6446,U+644a,U+6469,U+64cd,U+654f,U+6562,U+656c,U+65d7,U+65e6,U+65fa,U+660c,U+6653,U+66b4,U+670b,U+672b,U+676f-6770,U+6881,U+6885,U+68a6,U+68cb,U+68ee,U+6b8a,U+6c88-6c89,U+6cc9,U+6ce5,U+6d01,U+6d17,U+6d1b,U+6d59,U+6d6a,U+6da8,U+6df7,U+6e10,U+6e20-6e21,U+6f5c,U+706f,U+70bc,U+719f,U+7267,U+732a,U+73cd,U+7518,U+756a,U+7586,U+7591,U+75db,U+76c8,U+76d0,U+76d6,U+76d8,U+76df,U+76fe,U+77db,U+7801,U+786c,U+795d,U+7965,U+79cb,U+7a77,U+7a7f,U+7aef,U+7b11,U+7bb1,U+7bc7,U+7ea0,U+7eaf,U+7ed5,U+7edc,U+7f13,U+7f29,U+7f34,U+7f8a,U+7ffb,U+8015,U+8058,U+805a,U+8083,U+80af,U+80c6,U+80cc,U+811a,U+8150,U+82e5,U+8336,U+8352,U+83ab,U+8428,U+8463,U+852c,U+8861,U+89c8,U+8bcd,U+8bd7,U+8bda,U+8be2,U+8bef,U+8bf8,U+8c0b,U+8c13,U+8d34,U+8d3a,U+8d74,U+8d76,U+8da3,U+8dd1,U+8ddd,U+8ddf,U+8df3,U+8f68,U+8f6f,U+8f7d,U+8f91,U+8f9b,U+8fbd,U+8fc8,U+8fd4,U+8feb,U+8ff9,U+900f,U+9057,U+907f-9080,U+90d1,U+90ed,U+91ce,U+9519,U+9526,U+95ed,U+9614,U+9635,U+9644,U+9686,U+96c5,U+96ea,U+9707,U+9732,U+9759,U+978b,U+9876,U+9881,U+9910,U+996e,U+9970,U+9c81,U+9e21,U+9ebb,U+9f84" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-0facdf1ea213ba40261022f5d5ed4493.woff2",
			descriptors: { unicodeRange: "U+4e3d,U+4e4e,U+4e71,U+4e8f,U+4ed8,U+4eea,U+4f0a,U+4f0d,U+4f11,U+4f1f,U+4f24,U+4f3c,U+4f73,U+4fc4,U+500d,U+5012,U+501f,U+503a,U+505c,U+507f,U+50a8,U+514d,U+5178,U+517c,U+51b2,U+51b7,U+520a,U+5238,U+523b,U+52b1,U+535a,U+5371,U+5385,U+53eb-53ec,U+53f3,U+53f6,U+5409,U+542b,U+542f,U+5434,U+5462,U+5473,U+547c,U+54c8,U+54ea,U+56fa,U+5733,U+5757,U+5766,U+5802,U+585e,U+590f,U+591c,U+591f,U+5947,U+594b,U+5987,U+5a01,U+5b59,U+5b63,U+5b88,U+5b97,U+5b9c,U+5bbe,U+5bfb,U+5c01,U+5c1a,U+5c24,U+5c3c,U+5c97,U+5c9b,U+5cb8,U+5de6,U+5e01,U+5e2e,U+5e45,U+5e55,U+5e84,U+5ef6,U+5f02,U+5f52,U+5f69,U+5f7b,U+5f90,U+5fae,U+6000,U+600e,U+6025,U+60e0,U+6276,U+6297,U+62b5,U+62cd,U+62d3,U+62e5,U+62e9,U+62ff,U+6302,U+632f,U+63e1,U+6444,U+64ad,U+653b,U+6551,U+6563,U+65a4,U+65e7,U+6620,U+667a,U+66f2,U+671d,U+6731,U+6742,U+675f,U+6768,U+677e-677f,U+6790,U+67b6,U+67d3,U+6863,U+68b0,U+68c9,U+690d,U+6b8b,U+6bcd,U+6bd2,U+6bd5,U+6c38,U+6c61,U+6cbf,U+6cdb,U+6cf0,U+6d2a,U+6d89,U+6da6,U+6f6e,U+6fb3,U+7075,U+707e,U+70df,U+7164,U+7236,U+725b,U+7389,U+73e0,U+745e,U+74e6,U+751a,U+7537,U+75be,U+76ae,U+76db,U+793c,U+7956,U+7981,U+79d8,U+79df,U+79fb,U+7adf,U+7ae5,U+7b14,U+7b26,U+7b54,U+7b79,U+7d2f,U+7eb8,U+7eba,U+7ec6,U+7ee9,U+7eff,U+7f5a,U+7f6a,U+7f72,U+8089,U+80a5,U+80e1,U+8111,U+8131,U+821e,U+822c,U+8270,U+8499,U+8651,U+867d,U+8840,U+8857,U+8863,U+88c1,U+89c9,U+89d2,U+8a89,U+8bed,U+8bfe,U+8c01,U+8c22,U+8d21,U+8d25,U+8d2f,U+8d5e,U+8d75,U+8d8b,U+8dc3,U+8de8,U+8df5,U+8f6e,U+8f86,U+8f89,U+8fc5,U+8ff0,U+8ffd,U+9014,U+904d,U+90ae,U+9274,U+949f,U+952e,U+969c,U+96c4,U+96e8,U+96f6-96f7,U+97e9,U+987f,U+996d,U+9a7b,U+9aa8,U+9c7c,U+9c9c,U+9e4f,U+9f13,U+9f50" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-f8ee5d36068a42b51d0e4a1116cfcec1.woff2",
			descriptors: { unicodeRange: "U+4e13,U+4e16,U+4e1c,U+4e24,U+4e3e,U+4e49,U+4e61,U+4e66,U+4e89,U+4e8c,U+4e94,U+4e9b,U+4ea4,U+4eac,U+4ebf,U+4eca,U+4ef6-4ef7,U+4efb,U+4f18,U+4f20,U+4f46,U+4f7f,U+4fe1,U+503c,U+505a,U+5146,U+5148,U+515a,U+5171,U+5177,U+519b,U+51b3,U+51c6,U+51e0,U+5212,U+521b,U+522b,U+529e,U+52bf,U+534e-534f,U+5355,U+5357,U+5382,U+539f,U+53bb,U+53bf,U+53c2,U+53c8,U+53ca,U+53d6-53d8,U+53e3,U+53ea,U+53f0,U+540d,U+5411,U+56db,U+56de,U+56e0,U+56e2,U+578b,U+57ce,U+57fa,U+589e,U+5904,U+5934,U+5982,U+5b89,U+5b8c,U+5bfc,U+5c06,U+5c11,U+5c40,U+5c71,U+5e38,U+5e72,U+5e76,U+5e7f,U+5e94,U+5e9c,U+5f0f,U+5f15,U+5f20,U+5f3a,U+5f62,U+5f88,U+5fc5,U+5fd7,U+5feb,U+601d,U+6027,U+60c5,U+60f3,U+610f,U+6216,U+6218,U+624b,U+624d,U+6279,U+628a,U+6295,U+6301,U+6307,U+636e,U+63a5,U+63a8,U+652f,U+6536,U+653e,U+6548,U+6559,U+6570,U+65bd,U+65e0,U+6602,U+660e,U+6613,U+66f4,U+6700,U+670d,U+671f,U+672f,U+6743,U+674e,U+6751,U+6761,U+6784,U+6797,U+679c,U+67e5,U+6807,U+6837,U+683c,U+6b21,U+6b63-6b65,U+6bcf,U+6bd4,U+6c42,U+6c5f,U+6ca1,U+6cbb,U+6d3b,U+6d41,U+6d88,U+6df1,U+70b9,U+7136,U+7269,U+7279,U+7531,U+754c,U+767e,U+76ca,U+76f8,U+770b,U+7740,U+7814,U+79ef,U+7a0b,U+7a0e,U+7a76,U+7b80,U+7cbe,U+7cfb,U+7e41,U+7ea7,U+7ec4,U+7ec7,U+7ed3,U+7ed9,U+7edf,U+7f8e,U+8001,U+804c,U+8054,U+80b2,U+81f3,U+8425,U+8868,U+88ab,U+897f,U+89c1-89c2,U+89c4,U+89c6,U+89e3,U+8ba1,U+8ba4,U+8bae,U+8bb0,U+8bba,U+8bc1,U+8c03,U+8d28,U+8d39,U+8def,U+8f66,U+8f6c,U+8fd0-8fd1,U+9020,U+9053,U+90a3,U+90fd,U+91cc,U+9500,U+9547,U+95e8,U+95f4,U+961f,U+9645,U+9662,U+96be,U+96c6,U+9700,U+9769,U+97e6,U+9875,U+9879,U+9886,U+9898,U+98ce,U+9996,U+2b5af,U+2cc56,U+2e9f5,U+30edd-30ede" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-79d494361ae093b69e74ee9dbe65bfd4.woff2",
			descriptors: { unicodeRange: "U+4e03,U+4e30,U+4e34,U+4e45,U+4e60,U+4e70,U+4e88,U+4e91-4e92,U+4ea9,U+4eb2,U+4ec0,U+4ecb,U+4ecd,U+4ee4,U+4fee,U+5019,U+5047,U+50cf,U+5145,U+516d,U+5170,U+5175,U+5199,U+51cf,U+51fb,U+521a,U+5224,U+5267,U+52aa,U+5347-5348,U+534a,U+5356,U+5361,U+536b,U+5370,U+538b,U+53e4,U+53e6,U+5403,U+5426,U+5428,U+542c,U+5438,U+5668,U+56ed,U+56f4,U+56fe,U+57df,U+592a,U+5957,U+5b69,U+5b81,U+5b8f,U+5b98,U+5b9d,U+5ba1,U+5ba4,U+5bb3,U+5bc6,U+5bdf,U+5c3d,U+5c5e,U+5c81,U+5ddd,U+5de8,U+5dee,U+5e0c,U+5e86,U+5e8f,U+5e93,U+5e95,U+5e97,U+5ea7,U+5ead,U+5eb7,U+5f55,U+5f81,U+5f85,U+5ff5,U+6001,U+613f,U+6258,U+6267,U+6269,U+626c,U+627e,U+62db,U+62ec,U+6325,U+635f,U+6362,U+6388,U+6392,U+63a2,U+63a7,U+63aa,U+641e,U+6545,U+6597,U+65e2,U+65e9,U+661f,U+665a,U+666e-666f,U+66fe,U+6728,U+67d0,U+6811,U+6838,U+6865,U+697c,U+6b22,U+6b27,U+6b4c,U+6b62,U+6b66,U+6b7b,U+6bdb,U+6c47,U+6c49,U+6c7d,U+6c99,U+6cfd,U+6d0b,U+6d25,U+6d32,U+6d3e,U+6d4b,U+6e29,U+6e56,U+6e7e,U+6f14,U+6fc0,U+706b,U+70c8,U+7247,U+72af,U+72b6,U+72ec,U+732e,U+73ed,U+7403,U+7533,U+753b,U+7559,U+7565,U+7597,U+767b,U+773c,U+7763,U+77ed,U+77ff,U+7968,U+798f,U+79bb,U+79c0-79c1,U+7ad9,U+7ae0,U+7b51,U+7b7e,U+7cae,U+7d22,U+7ea2,U+7eb3,U+7eb7,U+7ec3,U+7ec8,U+7ecd,U+7edd,U+7efc,U+7f16,U+7f3a,U+7f51,U+7f57,U+7f6e,U+80dc,U+822a,U+8239,U+826f,U+82cf,U+82e6,U+8349,U+8363,U+83dc,U+8457,U+85cf,U+878d,U+8865,U+8a00,U+8b66,U+8ba2,U+8ba8,U+8bad,U+8bb2,U+8bc9,U+8bd5,U+8bfb,U+8d2b,U+8d35,U+8d37,U+8f7b,U+8f93,U+8fce,U+8fdd,U+9000-9002,U+9010,U+9047,U+9093,U+9152,U+9488,U+94a2,U+9633,U+9636,U+963f,U+9646,U+9648,U+964d,U+9664,U+9669,U+9760,U+97f3,U+987a,U+987e,U+9884,U+98de,U+9986,U+9ed1" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-74e2263a91439c25b91d5132ce9f4d62.woff2",
			descriptors: { unicodeRange: "U+4e14,U+4e25,U+4e48,U+4e50,U+4e5d,U+4e9a,U+4ec5,U+4efd,U+4f17,U+4f4e-4f4f,U+4f55,U+4f59,U+4f60,U+4f8b,U+4f9b,U+4f9d,U+4fbf,U+4fc3,U+5065,U+513f,U+5149,U+514b,U+516b,U+5174,U+517b,U+518d,U+51b5,U+5207,U+5217-5219,U+521d,U+526f,U+529f,U+52a9,U+52b3,U+5305,U+533b,U+5343,U+5360,U+5373-5374,U+5386,U+53cb-53cd,U+53f2,U+53f7,U+544a,U+5468,U+547d,U+54cd,U+552e,U+5584,U+56f0,U+571f,U+5747,U+575a,U+57f9,U+5883,U+58eb,U+58f0,U+5907,U+590d,U+592e,U+5931,U+5956,U+5965,U+5973,U+5979,U+59cb,U+5b57-5b58,U+5b83,U+5ba2-5ba3,U+5bb9,U+5bcc,U+5c42,U+5c45,U+5c4a,U+5dde,U+5df1,U+5df4,U+5e03,U+5e08,U+5e26,U+5e2d,U+5f71,U+5f80,U+5f8b,U+5fb7,U+606f,U+611f,U+6237,U+623f,U+6253,U+627f,U+6293,U+62a4,U+62c5,U+62c9,U+6309,U+6574,U+6599,U+65ad,U+65af,U+65c5,U+65cf,U+6625,U+663e,U+671b,U+672a,U+6750,U+6781,U+6821,U+6839,U+6848,U+68c0,U+6a21,U+6b3e,U+6bb5,U+6c14,U+6cb3,U+6cb9,U+6ce8,U+6e05,U+6e2f,U+6e38,U+6e90,U+6ee1,U+70ed,U+7167,U+7231,U+7248,U+724c,U+7387,U+738b,U+73af,U+7530,U+75c5,U+767d,U+76d1,U+76f4,U+771f,U+77e5,U+77f3,U+7834,U+7840,U+786e,U+793a,U+795e,U+79f0,U+7a33,U+7a7a,U+7a81,U+7ade,U+7b56,U+7b97,U+7c73,U+7c7b,U+7d20,U+7d27,U+7ea6,U+7eaa,U+7ebf,U+7ee7,U+7eed,U+7ef4,U+7fa4,U+8003,U+80a1,U+81f4,U+8272,U+827a,U+8282,U+82b1,U+82f1,U+8303,U+836f,U+83b7,U+843d,U+88c5,U+8ba9,U+8baf,U+8bb8,U+8bbf,U+8bc4,U+8bc6,U+8bdd,U+8be5,U+8bf7,U+8c08,U+8c61,U+8d1f,U+8d22-8d23,U+8d27,U+8d2d,U+8d38,U+8d5b,U+8d70,U+8d85,U+8d8a,U+8db3,U+8eab,U+8f83,U+8fb9,U+8fdc,U+8fde,U+9009,U+901f,U+914d,U+91c7,U+94b1,U+94c1,U+94f6,U+95fb,U+9632,U+9650,U+968f,U+9752,U+975e,U+987b,U+989d,U+98df,U+9999,U+9a6c,U+9a8c,U+9ec4,U+9feb-9fec" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-ee8bae97908d5147b423f77ad0d3c1bb.woff2",
			descriptors: { unicodeRange: "U+98fb-990c,U+990e-990f,U+9911-992d,U+992f-9953,U+9956-9962,U+9964,U+9966,U+9973,U+9978-9979,U+997b,U+997e,U+9982-9983,U+9989,U+998c,U+998e,U+999a-99a4,U+99a6-99a7,U+99a9-99c8" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-56467a5c8840c4d23a60b2f935114848.woff2",
			descriptors: { unicodeRange: "U+8e4c-8e50,U+8e53-8e58,U+8e5a-8e65,U+8e67-8e68,U+8e6a-8e6b,U+8e6e,U+8e71,U+8e73,U+8e75,U+8e77-8e7b,U+8e7d-8e7e,U+8e80,U+8e82-8e84,U+8e86,U+8e88-8e8e,U+8e91-8e93,U+8e95-8e9b,U+8e9d,U+8e9f-8eaa,U+8ead-8eae,U+8eb0-8eb1,U+8eb3-8eb9,U+8ebb-8ecd,U+8ecf-8f02" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-145aa02cdd91946e67dc934e1acffe75.woff2",
			descriptors: { unicodeRange: "U+2e3a,U+3001-3002,U+3008-3011,U+3014-3017,U+301d-301f,U+4dae,U+4e00,U+4e07,U+4e09-4e0b,U+4e0d-4e0e,U+4e1a,U+4e2a,U+4e2d,U+4e3a-4e3b,U+4e4b,U+4e5f,U+4e86,U+4e8b,U+4e8e,U+4ea7,U+4eba,U+4ece,U+4ed1,U+4ed6,U+4ee3,U+4ee5,U+4eec,U+4f01,U+4f1a,U+4f4d,U+4f53,U+4f5c,U+4fdd,U+5143,U+5165,U+5168,U+516c,U+5173,U+5176,U+5185,U+519c,U+51fa,U+5206,U+5229,U+5230,U+5236,U+524d,U+529b,U+52a0-52a1,U+52a8,U+5316-5317,U+533a,U+5341,U+5362,U+53d1,U+53ef,U+53f8,U+5404,U+5408,U+540c,U+540e,U+5458,U+548c,U+54c1,U+54e5,U+5546,U+559c,U+56fd,U+5728,U+5730,U+573a,U+5916,U+591a,U+5927,U+5929,U+592b,U+597d,U+59d4,U+5b50,U+5b66,U+5b9a,U+5b9e,U+5bb6,U+5bf9,U+5c0f,U+5c14,U+5c31,U+5c55,U+5de5,U+5df2,U+5e02,U+5e73-5e74,U+5ea6,U+5efa,U+5f00,U+5f53,U+5f97,U+5fc3,U+603b,U+6210-6211,U+6240,U+6280,U+62a5,U+63d0,U+6539,U+653f,U+6587,U+65b0,U+65b9,U+65e5,U+65f6,U+662f,U+6708-6709,U+672c,U+673a,U+675c,U+6765,U+6c11,U+6c34,U+6cd5,U+6ce2,U+6d4e,U+6d77,U+73b0,U+7406,U+751f,U+7528,U+7535,U+7684,U+76ee,U+793e,U+79cd,U+79d1,U+7acb,U+7b2c,U+7b49,U+7ba1,U+7ecf,U+8005,U+800c,U+80fd,U+81ea,U+884c,U+8981,U+8bbe,U+8bf4,U+8d44,U+8d77,U+8fbe,U+8fc7,U+8fd8-8fd9,U+8fdb,U+901a,U+90e8,U+91cd,U+91cf,U+91d1,U+9485,U+957f,U+95ee,U+9762,U+9ad8,U+9ea6,U+9f99,U+9fcf,U+9fd4,U+9fed,U+fe10-fe19,U+fe30-fe31,U+fe33-fe44,U+ff01,U+ff0c,U+ff1f,U+2b4e7,U+2b7f7,U+2b7fc,U+2cb2d,U+2cb3b,U+2cb4a,U+2cb5b,U+2cb73" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-54acdfc2166ad7fcbd074f75fd4a56ba.woff2",
			descriptors: { unicodeRange: "U+6490,U+6493-6494,U+6497-6498,U+649a-649d,U+649f-64a3,U+64a5-64a8,U+64aa-64ab,U+64af,U+64b1-64b4,U+64b6,U+64b9,U+64bb,U+64bd-64bf,U+64c1,U+64c3-64c4,U+64c6-64cc,U+64cf,U+64d1,U+64d3-64d6,U+64d9-64dd,U+64df-64e1,U+64e3,U+64e5,U+64e7-64ff,U+6501-6508,U+650a-6511,U+6513-6517,U+6519-6524,U+6526-652a,U+652c-652d,U+6530-6533,U+6537,U+653a,U+653c-653d,U+6540-6544,U+6546-6547,U+654a-654b,U+654d-654e,U+6550,U+6552-6554,U+6557-6558,U+655a,U+655c,U+655f-6561,U+6564-6565,U+6567-6568" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-29cec36cd205b211da97acabaa62f055.woff2",
			descriptors: { unicodeRange: "U+9695-9696,U+969a-969b,U+969d-96a6,U+96a8-96af,U+96b1-96b2,U+96b4-96b5,U+96b7-96b8,U+96ba-96bb,U+96bf,U+96c2-96c3,U+96c8,U+96ca-96cb,U+96d0-96d1,U+96d3-96d4,U+96d6-96df,U+96e1-96e7,U+96eb-96ee,U+96f0-96f2,U+96f4-96f5,U+96f8,U+96fa-96fd,U+96ff,U+9702-9703,U+9705,U+970a-970c,U+9710-9712,U+9714-9715,U+9717-971b,U+971d,U+971f-9729,U+972b-972c,U+972e-972f,U+9731,U+9733-9737,U+973a-973d,U+973f-9751,U+9754-9755,U+9757-9758,U+975a,U+975c-975d,U+975f,U+9763-9764,U+9766-9768,U+976a-9770" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-3756e81d3e149cf6099163ee79944fec.woff2",
			descriptors: { unicodeRange: "U+6af0-6b1f,U+6b25-6b26,U+6b28-6b31,U+6b33-6b36,U+6b38,U+6b3b-6b3d,U+6b3f-6b42,U+6b44-6b45,U+6b48,U+6b4a-6b4b,U+6b4d-6b58,U+6b5a-6b61,U+6b68-6b69,U+6b6b-6b78,U+6b7a,U+6b7d-6b80,U+6b85,U+6b88,U+6b8c,U+6b8e-6b91,U+6b94-6b95,U+6b97-6b99,U+6b9c-6ba0,U+6ba2-6ba9,U+6bab-6bb2,U+6bb6,U+6bb8-6bba" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-8e9f97f01034820170065b2921b4fb5e.woff2",
			descriptors: { unicodeRange: "U+430e-439a,U+29e8a,U+29ec4,U+29edb,U+29ee9,U+29f7e,U+29f83,U+29f8c,U+29fce,U+2a01a,U+2a02f,U+2a082,U+2a0f9,U+2a190,U+2a38c" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-13d2887ec8ee73c43acdabc52a05af7b.woff2",
			descriptors: { unicodeRange: "U+92ef-933d,U+933f-9369,U+936b-9388" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-72536a3d71b694a0d53dd90ddceae41e.woff2",
			descriptors: { unicodeRange: "U+4512-458d,U+2b300,U+2b363,U+2b36f,U+2b372,U+2b37d,U+2b404,U+2b410,U+2b413,U+2b461,U+2b4ef,U+2b4f6,U+2b4f9,U+2b50d-2b50e,U+2b536,U+2b5ae,U+2b5b3,U+2b5e7,U+2b5f4,U+2b61c-2b61d,U+2b626-2b628,U+2b62a,U+2b62c,U+2b695-2b696,U+2b6ad,U+2b6ed" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-603aefd23e350ba7eb124273e3c9bcf1.woff2",
			descriptors: { unicodeRange: "U+88bd-88c0,U+88c3-88c4,U+88c7-88c8,U+88ca-88cd,U+88cf-88d1,U+88d3,U+88d6-88d7,U+88da-88de,U+88e0-88e1,U+88e6-88e7,U+88e9-88ef,U+88f2,U+88f5-88f7,U+88fa-88fb,U+88fd,U+88ff-8901,U+8903-8909,U+890b-890f,U+8911,U+8914-8918,U+891c-8920,U+8922-8924,U+8926-8929,U+892c-892f,U+8931-8933,U+8935,U+8937-8940,U+8942-8943,U+8945-895d,U+8960-8965,U+8967-897a,U+897c-897e,U+8980,U+8982,U+8984-8985" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-095c169f3314805276f603a362766abd.woff2",
			descriptors: { unicodeRange: "U+4b0b-4ba0" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-9544732d2e62d1a429674f8ee41b5d3a.woff2",
			descriptors: { unicodeRange: "U+7179,U+717b-717c,U+717e-7183,U+7185-7189,U+718b-718e,U+7190-7193,U+7195-7197,U+719a-719e,U+71a1-71a7,U+71a9-71ab,U+71ad-71b2,U+71b4,U+71b6-71b8,U+71ba-71c2,U+71c4-71cd,U+71cf-71d3,U+71d6-71df,U+71e1-71e4,U+71e6,U+71e8-71ed,U+71ef-71f8,U+71fa-7205,U+7207-721c,U+721e-7227,U+7229,U+722b,U+722d" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-d3716376641d615e2995605b29bca7b6.woff2",
			descriptors: { unicodeRange: "U+982e-9874,U+988b,U+988e,U+9892,U+9895,U+9899,U+98a3,U+98a8-98cd,U+98cf-98d0,U+98d4,U+98d6-98d7,U+98db-98dd,U+98e0-98e6,U+98e9-98fa" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-5a1ce3117cfe90c48e8fb4a9a00f694d.woff2",
			descriptors: { unicodeRange: "U+7c14-7c15,U+7c17-7c1e,U+7c20-7c25,U+7c28-7c29,U+7c2b-7c37,U+7c39-7c3e,U+7c42-7c4c,U+7c4e-7c72,U+7c75-7c7a,U+7c7e-7c88,U+7c8a-7c90,U+7c93-7c94,U+7c96,U+7c99-7c9b,U+7ca0-7ca1,U+7ca3,U+7ca6-7ca9,U+7cab-7cad,U+7caf-7cb0,U+7cb4-7cb8,U+7cba-7cbb,U+7cbf-7cc0,U+7cc2-7cc4,U+7cc6,U+7cc9,U+7ccb,U+7cce-7cd4" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-b7d203b051eff504ff59ddca7576b6a9.woff2",
			descriptors: { unicodeRange: "U+7d95-7da5,U+7da7-7dad,U+7daf-7e2a" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-4a38cc3e9cf104e69ba246d37f8cf135.woff2",
			descriptors: { unicodeRange: "U+4a78-4b0a" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-982b630266d87db93d2539affb1275c6.woff2",
			descriptors: { unicodeRange: "U+9b30-9b31,U+9b33-9b3a,U+9b3d-9b40,U+9b46,U+9b4a-9b4c,U+9b4e,U+9b50,U+9b52-9b53,U+9b55-9bcf" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-9592bfc861f07bcb8d75c196b370e548.woff2",
			descriptors: { unicodeRange: "U+6a4b-6a4f,U+6a51-6a57,U+6a5a,U+6a5c-6a60,U+6a62-6a64,U+6a66-6a70,U+6a72-6a78,U+6a7a-6a7b,U+6a7d-6a7f,U+6a81-6a83,U+6a85-6a8d,U+6a8f,U+6a92-6a96,U+6a98-6a9f,U+6aa1-6aa8,U+6aaa,U+6aad-6aef" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-a7accba310e821da5505f71c03b76bdb.woff2",
			descriptors: { unicodeRange: "U+99c9-9a53" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-dac48066b5883d8b4551fc584f0c2a3e.woff2",
			descriptors: { unicodeRange: "U+8550-8555,U+8557-8558,U+855a-855d,U+855f-8563,U+8565-8567,U+8569-8571,U+8573,U+8575-8578,U+857c-857d,U+857f-8583,U+8586,U+8588-858e,U+8590-859a,U+859d-85a3,U+85a5-85a7,U+85a9,U+85ab-85ad,U+85b1-85b6,U+85b8,U+85ba-85c0,U+85c2-85c8,U+85ca-85ce,U+85d1-85d2,U+85d4,U+85d6-85db,U+85dd-85e3,U+85e5-85e8,U+85ea-85fa,U+85fc-85fe,U+8600-8603" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-a1f916d6039285c4ffb900cd654e418f.woff2",
			descriptors: { unicodeRange: "U+6fb2,U+6fb4-6fb5,U+6fb7-6fb8,U+6fba-6fbf,U+6fc1,U+6fc3-6fc8,U+6fca-6fd0,U+6fd3-6fdd,U+6fdf,U+6fe2-6fed,U+6ff0-7010,U+7012-7019,U+701c-7022,U+7024-7034,U+7036-7038,U+703a-704b,U+704d-704e,U+7050-7053" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-95bfd249da4902577b4b7d76ebdd0b44.woff2",
			descriptors: { unicodeRange: "U+4ba1-4c2c" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-93fc8f28a33234bcadf1527cafabd502.woff2",
			descriptors: { unicodeRange: "U+9a54-9a6b,U+9a72,U+9a83,U+9a89,U+9a8d-9a8e,U+9a94-9a95,U+9a99,U+9aa6,U+9aa9-9aaf,U+9ab2-9ab5,U+9ab9,U+9abb,U+9abd-9abf,U+9ac3-9ac4,U+9ac6-9aca,U+9acd-9ad0,U+9ad2,U+9ad4-9ad7,U+9ad9-9ade,U+9ae0,U+9ae2-9ae5,U+9ae7-9aea,U+9aec,U+9aee,U+9af0-9af8,U+9afa,U+9afc-9b02,U+9b04-9b07,U+9b09-9b0e,U+9b10-9b12,U+9b14-9b1e,U+9b20-9b22,U+9b24-9b2e" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-903bb6865f3452e2fda42e3a25547bc5.woff2",
			descriptors: { unicodeRange: "U+9d1a-9da1" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-4aca6a43e59aceee2166b0c7e4e85ef1.woff2",
			descriptors: { unicodeRange: "U+9e13-9e1e,U+9e24,U+9e27,U+9e2e,U+9e30,U+9e34,U+9e3b-9e3c,U+9e40,U+9e4d,U+9e50,U+9e52-9e54,U+9e56,U+9e59,U+9e5d,U+9e5f-9e62,U+9e65,U+9e6e-9e6f,U+9e72,U+9e74-9e7d,U+9e80-9e81,U+9e83-9e86,U+9e89-9e8a,U+9e8c-9e91,U+9e94-9e9c,U+9e9e,U+9ea0-9ea5,U+9ea7-9eb3,U+9eb5-9eb7,U+9eb9-9eba,U+9ebc,U+9ebf-9ec3,U+9ec5-9ec8,U+9eca-9ecc,U+9ed0,U+9ed2-9ed3,U+9ed5-9ed7,U+9ed9-9eda,U+9ede,U+9ee1,U+9ee3-9ee4,U+9ee6,U+9ee8,U+9eeb-9eee,U+9ef0-9ef8" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-24476a126f129212beb33f66853ea151.woff2",
			descriptors: { unicodeRange: "U+8b1c-8b25,U+8b27-8b65,U+8b67-8b6b,U+8b6d-8b9f,U+8bac,U+8bb1,U+8bbb,U+8bc7,U+8bd0" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-1b611157cd46bb184d4fa4dae2d6a2b8.woff2",
			descriptors: { unicodeRange: "U+4cad-4d2f" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-56a32a7689abd0326e57c10c6c069bb4.woff2",
			descriptors: { unicodeRange: "U+9c4b-9c7b,U+9c7d-9c7e,U+9c80,U+9c83-9c84,U+9c89-9c8a,U+9c8c,U+9c8f,U+9c93,U+9c96-9c99,U+9c9d,U+9caa,U+9cac,U+9caf,U+9cb9,U+9cbe-9cc2,U+9cc8-9cc9,U+9cd1-9cd2,U+9cda-9cdb,U+9ce0-9ce1,U+9ce3-9d19" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-3cc70dbb64df5b21f1326cc24dee2195.woff2",
			descriptors: { unicodeRange: "U+9389-938e,U+9390-93c9,U+93cb-93d5,U+93d7-9410" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-f6032fc06eb20480f096199713f70885.woff2",
			descriptors: { unicodeRange: "U+20a0-20b5,U+20b9-20ba,U+20bc-20bd,U+4e2c,U+5107,U+5216,U+5293,U+54f3,U+5523,U+5819,U+5adc,U+5c88,U+5e3b,U+5fee,U+62f6,U+63be,U+6484,U+6499,U+67d9,U+67dd,U+6d5e,U+6f46,U+717a,U+71e0,U+72c1,U+73e7,U+75b0,U+7603,U+7722,U+7809,U+7811,U+7946,U+7967,U+799a,U+7b45,U+7ba2,U+8014,U+80d9,U+8159,U+817d,U+81a3,U+81aa,U+8201,U+833c,U+836e,U+83e5,U+8459,U+84f0,U+8729,U+8753,U+87d3,U+89dc,U+8bf6,U+8c2e,U+8e2c,U+8e9c,U+8e9e,U+8ece,U+8fee,U+9139,U+914f,U+9174,U+9191,U+960c,U+9622,U+9a98,U+9b48,U+9ca6,U+9cb0,U+9da2-9e12,U+9e88,U+9f44,U+9f86" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-e2ead7ea7da0437f085f42ffc05f8d13.woff2",
			descriptors: { unicodeRange: "U+9bd0-9c4a" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-97f7f48ce90c9429bf32ae51469db74d.woff2",
			descriptors: { unicodeRange: "U+4c2d-4cac" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-24a21c1e4449222e8d1898d69ff3a404.woff2",
			descriptors: { unicodeRange: "U+4d30-4dab" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-726303e0774b4e678bff8c2deb6ca603.woff2",
			descriptors: { unicodeRange: "U+9411-943d,U+943f-946a,U+946c-9484" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-5a7fac4b8b23a6e4e5ba0c9bf1756c91.woff2",
			descriptors: { unicodeRange: "U+9efa,U+9efd,U+9eff-9f0a,U+9f0c,U+9f0f,U+9f11-9f12,U+9f14-9f16,U+9f18,U+9f1a-9f1f,U+9f21,U+9f23-9f2b,U+9f2d-9f2e,U+9f30-9f36,U+9f38,U+9f3a,U+9f3c,U+9f3f-9f43,U+9f45-9f4f,U+9f52-9f7e,U+9f81-9f82,U+9f8d-9f94" }
		},
		{
			uri: "./fonts/Xiaolai/Xiaolai-Regular-2b7441d46298788ac94e610ffcc709b6.woff2",
			descriptors: { unicodeRange: "U+7e2b-7e3a,U+7e3c-7e40,U+7e42-7e46,U+7e48-7e81,U+7e83-7e9a,U+7e9c-7e9e,U+7eae,U+7eb4,U+7ebb-7ebc,U+7ed6,U+7ee4,U+7eec,U+7ef9,U+7f0a,U+7f10,U+7f1e,U+7f37,U+7f39,U+7f3b" }
		}
	];
	ne = class ne {
		constructor(t) {
			i$1(this, "scene");
			i$1(this, "getSceneFamilies", () => ne.getUniqueFamilies(this.scene.getNonDeletedElements()));
			i$1(this, "onLoaded", (t) => {
				let n = !0;
				for (let i of t) {
					let a = `${i.family}-${i.style}-${i.weight}-${i.unicodeRange}`;
					ne.loadedFontsCache.has(a) || (ne.loadedFontsCache.add(a), n = !1);
				}
				if (n) return;
				let r = !1, o = this.scene.getNonDeletedElementsMap();
				for (let i of this.scene.getNonDeletedElements()) if (k(i)) {
					r = !0, he.delete(i), $n.clearCache(Ee(i));
					let a = qe(i, o);
					a && he.delete(a);
				}
				r && this.scene.triggerUpdate();
			});
			i$1(this, "loadSceneFonts", async () => {
				let t = this.getSceneFamilies(), n = ne.getCharsPerFamily(this.scene.getNonDeletedElements());
				return ne.loadFontFaces(t, n);
			});
			this.scene = t;
		}
		static get registered() {
			return ne._registered ? ne._initialized || (ne._registered = new Map([...ne.init().entries(), ...ne._registered.entries()])) : ne._registered = ne.init(), ne._registered;
		}
		get registered() {
			return ne.registered;
		}
		static async generateFontFaceDeclarations(t) {
			let n = ne.getUniqueFamilies(t), r = ne.getCharsPerFamily(t), o = n.find((d) => bo(d).includes(Mn));
			if (o) {
				let d = ne.getCharacters(r, o);
				if (Sd(d)) {
					let c = Un[Mn];
					r[c] = new Set(d), n.unshift(Un[Mn]);
				}
			}
			let s = await new vr(ne.fontFacesStylesGenerator(n, r), 3).all();
			return Array.from(new Set(s));
		}
		static async loadFontFaces(t, n) {
			for (let { fontFaces: a, metadata: s } of ne.registered.values()) if (!s.local) for (let { fontFace: d } of a) window.document.fonts.has(d) || window.document.fonts.add(d);
			return (await new vr(ne.fontFacesLoader(t, n), 10).all()).flat().filter(Boolean);
		}
		static *fontFacesLoader(t, n) {
			for (let [r, o] of t.entries()) {
				let i = Ee({
					fontFamily: o,
					fontSize: 16
				}), a = ne.getCharacters(n, o);
				window.document.fonts.check(i, a) || (yield mn(async () => {
					try {
						return [r, await window.document.fonts.load(i, a)];
					} catch (s) {
						console.error(`Failed to load font "${i}" from urls "${ne.registered.get(o)?.fontFaces.map((d) => d.urls)}"`, s);
					}
				}));
			}
		}
		static *fontFacesStylesGenerator(t, n) {
			for (let [r, o] of t.entries()) {
				let { fontFaces: i, metadata: a } = ne.registered.get(o) ?? {};
				if (!Array.isArray(i)) {
					console.error(`Couldn't find registered fonts for font-family "${o}"`, ne.registered);
					continue;
				}
				if (!a?.local) for (let [s, d] of i.entries()) yield mn(async () => {
					try {
						let c = ne.getCharacters(n, o), l = await d.toCSS(c);
						return l ? [r * 1e4 + s, l] : void 0;
					} catch (c) {
						console.error(`Couldn't transform font-face to css for family "${d.fontFace.family}"`, c);
					}
				});
			}
		}
		static register(t, n, ...r) {
			let o = Ie[t] ?? Un[t];
			return this.registered.get(o) || this.registered.set(o, {
				metadata: n,
				fontFaces: r.map(({ uri: a, descriptors: s }) => new Xo(t, a, s))
			}), this.registered;
		}
		static init() {
			let t = { registered: /* @__PURE__ */ new Map() }, n = (r, ...o) => {
				let a = Fr[Ie[r] ?? Un[r]] ?? Fr[Ie.Excalifont];
				ne.register.call(t, r, a, ...o);
			};
			return n("Cascadia", ...Gd), n("Comic Shanns", ...Qd), n("Excalifont", ...sc), n("Helvetica", ...dc), n("Liberation Sans", ...lc), n("Lilita One", ...pc), n("Nunito", ...xc), n("Virgil", ...yc), n(Mn, ...b1), n(Tn, ...jd), ne._initialized = !0, t.registered;
		}
		static getUniqueFamilies(t) {
			return Array.from(t.reduce((n, r) => (k(r) && n.add(r.fontFamily), n), /* @__PURE__ */ new Set()));
		}
		static getCharsPerFamily(t) {
			let n = {};
			for (let r of t) if (k(r)) for (let o of r.originalText) n[r.fontFamily] || (n[r.fontFamily] = /* @__PURE__ */ new Set()), n[r.fontFamily].add(o);
			return n;
		}
		static getCharacters(t, n) {
			return t[n] ? Array.from(t[n]).join("") : "";
		}
		static getAllFamilies() {
			return Array.from(ne.registered.keys());
		}
	};
	i$1(ne, "loadedFontsCache", /* @__PURE__ */ new Set()), i$1(ne, "_registered"), i$1(ne, "_initialized", !1), i$1(ne, "loadElementsFonts", async (t) => {
		let n = ne.getUniqueFamilies(t), r = ne.getCharsPerFamily(t);
		return ne.loadFontFaces(n, r);
	});
	Nn = ne, Go = (e, t, n) => {
		let { unitsPerEm: r, ascender: o, descender: i } = Nn.registered.get(e)?.metadata.metrics || Fr[Ie.Virgil].metrics, a = t / r, s = (n - a * o + a * i) / 2;
		return a * o + s;
	}, ko = (e) => {
		let { lineHeight: t } = Nn.registered.get(e)?.metadata.metrics || Fr[Ie.Excalifont].metrics;
		return t;
	};
	Zo = (e) => {
		let { angle: t, width: n, height: r, x: o, y: i } = e, a = o + n / 2, s = i + r / 2, d = u(a, s), c;
		return e.type === "diamond" ? c = Qi(T(u(a, i), d, t), T(u(o + n, s), d, t), T(u(a, i + r), d, t), T(u(o, s), d, t)) : c = Qi(T(u(o, i), d, t), T(u(o + n, i), d, t), T(u(o + n, i + r), d, t), T(u(o, i + r), d, t)), {
			type: "polygon",
			data: c
		};
	}, f$ = (e, t, n = 10) => {
		let [r, o, i, a, s, d] = C(e, t, !0);
		r -= n, i += n, o -= n, a += n;
		let c = u(s, d), l = T(u(r, o), c, e.angle), U = T(u(i, o), c, e.angle), p = T(u(r, a), c, e.angle);
		return {
			type: "polygon",
			data: [
				l,
				U,
				T(u(i, a), c, e.angle),
				p
			]
		};
	}, E1 = (e) => {
		let { width: t, height: n, angle: r, x: o, y: i } = e;
		return {
			type: "ellipse",
			data: {
				center: u(o + t / 2, i + n / 2),
				angle: r,
				halfWidth: t / 2,
				halfHeight: n / 2
			}
		};
	}, It = (e) => {
		if (!e) return [];
		for (let t of e.sets) if (t.type === "path") return t.ops;
		return e.sets[0].ops;
	}, g1 = (e, t = u(0, 0), n, r) => {
		let o = (d) => T(u(d[0] + t[0], d[1] + t[1]), r, n), i = It(e), a = [], s = u(0, 0);
		for (let d of i) {
			if (d.op === "move") {
				let c = Ir(d.data);
				Ae(c != null, "Ops data is not a point"), s = o(c);
			}
			if (d.op === "bcurveTo") {
				let c = o(u(d.data[0], d.data[1])), l = o(u(d.data[2], d.data[3])), U = o(u(d.data[4], d.data[5]));
				a.push(Et(s, c, l, U)), s = U;
			}
		}
		return {
			type: "polycurve",
			data: a
		};
	}, um = (e) => {
		let t = e[0], n = [];
		for (let r = 1; r < e.length; r++) {
			let o = e[r];
			n.push(A(t, o)), t = o;
		}
		return n;
	}, x1 = (e, t, n = !1) => {
		let r = (i) => T(q(st(O(i), Be(e.x, e.y))), t, e.angle), o = um(e.points.map((i) => r(i)));
		return n ? {
			type: "polygon",
			data: Gn(o.flat())
		} : {
			type: "polyline",
			data: o
		};
	}, h1 = (e, t, n = u(0, 0), r, o) => {
		let i = (l) => T(u(l[0] + n[0], l[1] + n[1]), o, r);
		if (e.roundness === null) return {
			type: "polygon",
			data: Gn(e.points.map((l) => i(l)))
		};
		let a = It(t), s = [], d = !1;
		for (let l of a) l.op === "move" ? (d = !d, d && s.push(u(l.data[0], l.data[1]))) : l.op === "bcurveTo" ? d && (s.push(u(l.data[0], l.data[1])), s.push(u(l.data[2], l.data[3])), s.push(u(l.data[4], l.data[5]))) : l.op === "lineTo" && d && s.push(u(l.data[0], l.data[1]));
		return {
			type: "polygon",
			data: Gn(pointsOnBezierCurves(s, 10, 5).map((l) => i(l)))
		};
	};
	mm = (e, t) => {
		let { angle: n, halfWidth: r, halfHeight: o, center: i } = t, a = r, s = o, [c, l] = T(q(st(O(e), ue(O(i), -1))), u(0, 0), -n), U = Math.abs(c), p = Math.abs(l), m = .707, b = .707;
		for (let h = 0; h < 3; h++) {
			let x = a * m, y = s * b, w = (a * a - s * s) * m ** 3 / a, I = (s * s - a * a) * b ** 3 / s, S = x - w, v = y - I, D = U - w, $ = p - I, N = Math.hypot(v, S), B = Math.hypot($, D);
			m = Math.min(1, Math.max(0, (D * N / B + w) / a)), b = Math.min(1, Math.max(0, ($ * N / B + I) / s));
			let _ = Math.hypot(b, m);
			m /= _, b /= _;
		}
		let [E, g] = [a * m * Math.sign(c), s * b * Math.sign(l)];
		return ie(u(c, l), u(E, g));
	}, y1 = (e, t, n = 1e-4) => mm(e, t) <= n, I1 = (e, t) => {
		let { center: n, angle: r, halfWidth: o, halfHeight: i } = t, [s, d] = T(q(st(O(e), ue(O(n), -1))), u(0, 0), -r);
		return s / o * (s / o) + d / i * (d / i) <= 1;
	};
	_r = (e, t, n = 0) => {
		switch (t.type) {
			case "polygon": return dd(e, t.data, n);
			case "ellipse": return y1(e, t.data, n);
			case "line": return Bt(e, t.data, n);
			case "polyline": return R1(e, t.data, n);
			case "curve": return w1(e, t.data, n);
			case "polycurve": return bm(e, t.data, n);
			default: throw Error(`shape ${t} is not implemented`);
		}
	}, Wo = (e, t) => {
		switch (t.type) {
			case "polygon": return ji(e, t.data);
			case "line": return !1;
			case "curve": return !1;
			case "ellipse": return I1(e, t.data);
			case "polyline": return ji(e, Gn(t.data.flat()));
			case "polycurve": return !1;
			default: throw Error(`shape ${t} is not implemented`);
		}
	};
	bm = (e, t, n) => t.some((r) => w1(e, r, n)), Em = (e) => {
		let [t, n, r, o] = e;
		return (i, a) => Math.pow(1 - i, 3) * o[a] + 3 * i * Math.pow(1 - i, 2) * r[a] + 3 * Math.pow(i, 2) * (1 - i) * n[a] + t[a] * Math.pow(i, 3);
	}, gm = (e, t = 10) => {
		let n = Em(e), r = [n(0, 0), n(0, 1)], o = [], i = 0, a = 1 / t;
		for (let s = 0; s < t; s++) if (i += a, i <= 1) {
			let d = u(n(i, 0), n(i, 1));
			o.push(A(r, d)), r = d;
		}
		return o;
	}, w1 = (e, t, n) => R1(e, gm(t), n), R1 = (e, t, n = 1e-4) => t.some((r) => Bt(e, r, n));
	T1 = (e, t) => {
		let { halfWidth: n, halfHeight: r, center: o } = t, i = n, a = r, s = st(O(e), ue(O(o), -1)), d = Math.abs(s[0]), c = Math.abs(s[1]), l = .707, U = .707;
		for (let b = 0; b < 3; b++) {
			let E = i * l, g = a * U, h = (i * i - a * a) * l ** 3 / i, x = (a * a - i * i) * U ** 3 / a, y = E - h, w = g - x, I = d - h, S = c - x, v = Math.hypot(w, y), D = Math.hypot(S, I);
			l = Math.min(1, Math.max(0, (I * v / D + h) / i)), U = Math.min(1, Math.max(0, (S * v / D + x) / a));
			let $ = Math.hypot(U, l);
			l /= $, U /= $;
		}
		let [p, m] = [i * l * Math.sign(s[0]), a * U * Math.sign(s[1])];
		return ie(q(s), u(p, m));
	};
	ei = (e) => {
		if (e.type === "arrow") return !1;
		let t = !Wt(e.backgroundColor) || bn(e) || gt(e) || k(e);
		return e.type === "line" ? t && Kt(e.points) : e.type === "freedraw" ? t && Kt(e.points) : t || Ye(e);
	}, xm = ({ x: e, y: t, element: n, shape: r, threshold: o = 10, frameNameBound: i = null }) => {
		let a = ei(n) ? Wo(u(e, t), r) || _r(u(e, t), r, o) : _r(u(e, t), r, o);
		return !a && i && (a = Wo(u(e, t), {
			type: "polygon",
			data: Zo(i).data
		})), a;
	}, ba = (e, t, n, r, o = 0) => {
		let [i, a, s, d] = Ke(n, r);
		return i -= o, a -= o, s += o, d += o, So(u(i, a), u(e, t), u(s, d));
	}, A$ = (e, t) => !xm(e) && !hm(e.x, e.y, L1(e.element, t)) && ba(e.x, e.y, e.element, t), hm = (e, t, n) => !!n && Wo(u(e, t), n), Ea = (e, t, n = 0) => {
		switch (e.type) {
			case "rectangle":
			case "image":
			case "text":
			case "iframe":
			case "embeddable":
			case "frame":
			case "magicframe": return ym(e, t, n);
			case "diamond": return Im(e, t, n);
			case "ellipse": return wm(e, t, n);
			default: throw new Error(`Unimplemented element type '${e.type}'`);
		}
	}, ym = (e, t, n = 0) => {
		let r = u(e.x + e.width / 2, e.y + e.height / 2), o = T(t[0], r, -e.angle), i = T(t[1], r, -e.angle), [a, s] = Qo(e, n);
		return [...a.map((d) => pn(A(o, i), d)).filter((d) => d != null).map((d) => T(d, r, e.angle)), ...s.flatMap((d) => Wi(d, A(o, i))).filter((d) => d != null).map((d) => T(d, r, e.angle))].filter((d, c, l) => l.findIndex((U) => _e(d, U)) === c);
	}, Im = (e, t, n = 0) => {
		let r = u(e.x + e.width / 2, e.y + e.height / 2), o = T(t[0], r, -e.angle), i = T(t[1], r, -e.angle), [a, s] = jo(e, n);
		return [...a.map((d) => pn(A(o, i), d)).filter((d) => d != null).map((d) => T(d, r, e.angle)), ...s.flatMap((d) => Wi(d, A(o, i))).filter((d) => d != null).map((d) => T(d, r, e.angle))].filter((d, c, l) => l.findIndex((U) => _e(d, U)) === c);
	}, wm = (e, t, n = 0) => {
		let r = u(e.x + e.width / 2, e.y + e.height / 2), o = T(t[0], r, -e.angle), i = T(t[1], r, -e.angle);
		return M1(zo(r, e.width / 2 + n, e.height / 2 + n), Rr(o, i)).map((a) => T(a, r, e.angle));
	};
	D1 = {
		EQUAL: "Equal",
		MINUS: "Minus",
		NUM_ADD: "NumpadAdd",
		NUM_SUBTRACT: "NumpadSubtract",
		NUM_ZERO: "Numpad0",
		BRACKET_RIGHT: "BracketRight",
		BRACKET_LEFT: "BracketLeft",
		ONE: "Digit1",
		TWO: "Digit2",
		THREE: "Digit3",
		NINE: "Digit9",
		QUOTE: "Quote",
		ZERO: "Digit0",
		SLASH: "Slash",
		C: "KeyC",
		D: "KeyD",
		H: "KeyH",
		V: "KeyV",
		Z: "KeyZ",
		Y: "KeyY",
		R: "KeyR",
		S: "KeyS"
	}, Q = {
		ARROW_DOWN: "ArrowDown",
		ARROW_LEFT: "ArrowLeft",
		ARROW_RIGHT: "ArrowRight",
		ARROW_UP: "ArrowUp",
		PAGE_UP: "PageUp",
		PAGE_DOWN: "PageDown",
		BACKSPACE: "Backspace",
		ALT: "Alt",
		CTRL_OR_CMD: uo ? "metaKey" : "ctrlKey",
		DELETE: "Delete",
		ENTER: "Enter",
		ESCAPE: "Escape",
		QUESTION_MARK: "?",
		SPACE: " ",
		TAB: "Tab",
		CHEVRON_LEFT: "<",
		CHEVRON_RIGHT: ">",
		PERIOD: ".",
		COMMA: ",",
		SUBTRACT: "-",
		SLASH: "/",
		A: "a",
		C: "c",
		D: "d",
		E: "e",
		F: "f",
		G: "g",
		H: "h",
		I: "i",
		L: "l",
		O: "o",
		P: "p",
		Q: "q",
		R: "r",
		S: "s",
		T: "t",
		V: "v",
		X: "x",
		Y: "y",
		Z: "z",
		K: "k",
		W: "w",
		0: "0",
		1: "1",
		2: "2",
		3: "3",
		4: "4",
		5: "5",
		6: "6",
		7: "7",
		8: "8",
		9: "9"
	}, Rm = new Map([[Q.Z, D1.Z], [Q.Y, D1.Y]]), Tm = (e) => /^[a-z]$/.test(e.toLowerCase()), Y$ = (e, t) => {
		if (t === e.key.toLowerCase()) return !0;
		let n = Rm.get(t);
		return !!(n && !Tm(e.key) && e.code === n);
	}, C$ = (e) => e === Q.ARROW_LEFT || e === Q.ARROW_RIGHT || e === Q.ARROW_DOWN || e === Q.ARROW_UP, V$ = (e) => e.altKey, q$ = (e) => e.shiftKey, ga = (e) => e.shiftKey;
	Mm = [
		{
			icon: Pd,
			value: "selection",
			key: Q.V,
			numericKey: Q[1],
			fillable: !0
		},
		{
			icon: Nd,
			value: "rectangle",
			key: Q.R,
			numericKey: Q[2],
			fillable: !0
		},
		{
			icon: Fd,
			value: "diamond",
			key: Q.D,
			numericKey: Q[3],
			fillable: !0
		},
		{
			icon: Bd,
			value: "ellipse",
			key: Q.O,
			numericKey: Q[4],
			fillable: !0
		},
		{
			icon: _d,
			value: "arrow",
			key: Q.A,
			numericKey: Q[5],
			fillable: !0
		},
		{
			icon: Od,
			value: "line",
			key: Q.L,
			numericKey: Q[6],
			fillable: !0
		},
		{
			icon: Nr,
			value: "freedraw",
			key: [Q.P, Q.X],
			numericKey: Q[7],
			fillable: !1
		},
		{
			icon: Ad,
			value: "text",
			key: Q.T,
			numericKey: Q[8],
			fillable: !1
		},
		{
			icon: Kd,
			value: "image",
			key: null,
			numericKey: Q[9],
			fillable: !1
		},
		{
			icon: Hd,
			value: "eraser",
			key: Q.E,
			numericKey: Q[0],
			fillable: !1
		}
	], iP = (e) => Mm.find((n, r) => n.numericKey != null && e === n.numericKey.toString() || n.key && (typeof n.key == "string" ? n.key === e : n.key.includes(e)))?.value || null, ti = (e, t) => {
		switch (e.type) {
			case "rectangle":
			case "diamond":
			case "frame":
			case "magicframe":
			case "embeddable":
			case "image":
			case "iframe":
			case "text":
			case "selection": return Zo(e);
			case "arrow":
			case "line": {
				let n = he.get(e)?.[0] ?? he.generateElementShape(e, null)[0], [, , , , r, o] = C(e, t);
				return ei(e) ? h1(e, n, u(e.x, e.y), e.angle, u(r, o)) : g1(n, u(e.x, e.y), e.angle, u(r, o));
			}
			case "ellipse": return E1(e);
			case "freedraw": {
				let [, , , , n, r] = C(e, t);
				return x1(e, u(n, r), ei(e));
			}
		}
	}, L1 = (e, t) => {
		let n = oe(e, t);
		return n ? e.type === "arrow" ? ti({
			...n,
			...z.getBoundTextElementPosition(e, n, t)
		}, t) : ti(n, t) : null;
	}, xa = (e, t) => {
		let n = he.generateElementShape(e, null);
		if (!n) return null;
		let r = It(n[0]), o = u(0, 0), i = 0, a = Infinity, s = null;
		for (; i < r.length;) {
			let { op: d, data: c } = r[i];
			if (d === "move" && (Ae(Do(c), "The returned ops is not compatible with a point"), o = c), d === "bcurveTo") {
				let l = o, U = u(c[0], c[1]), p = u(c[2], c[3]), m = u(c[4], c[5]), b = ie(m, t);
				b < a && (a = b, s = [
					l,
					U,
					p,
					m
				]), o = m;
			}
			i++;
		}
		return s;
	}, ha = (e, t, n, r, o) => {
		let i = (d, c) => Math.pow(1 - d, 3) * r[c] + 3 * d * Math.pow(1 - d, 2) * n[c] + 3 * Math.pow(d, 2) * (1 - d) * t[c] + e[c] * Math.pow(d, 3);
		return u(i(o, 0), i(o, 1));
	}, Lm = (e, t) => {
		let n = xa(e, t);
		if (!n) return [];
		let r = [], o = 1;
		for (; o > 0;) {
			let i = ha(n[0], n[1], n[2], n[3], o);
			r.push(u(i[0], i[1])), o -= .05;
		}
		return r.length && _e(r.at(-1), t) && r.push(u(t[0], t[1])), r;
	}, v1 = (e, t) => {
		let n = [];
		n[0] = 0;
		let r = Lm(e, t), o = 0, i = 0;
		for (; o < r.length - 1;) {
			let a = ie(r[o], r[o + 1]);
			i += a, n.push(i), o++;
		}
		return n;
	}, $1 = (e, t) => v1(e, t).at(-1), P1 = (e, t, n) => {
		let r = v1(e, t), o = r.length - 1, a = n * r.at(-1), s = 0, d = o, c = 0;
		for (; s < d;) c = Math.floor(s + (d - s) / 2), r[c] < a ? s = c + 1 : d = c;
		return r[c] > a && c--, r[c] === a ? c / o : 1 - (c + (a - r[c]) / (r[c + 1] - r[c])) / o;
	}, wt = (e, t) => {
		let n = {
			minX: e.x,
			minY: e.y,
			maxX: e.x + e.width,
			maxY: e.y + e.height,
			midX: e.x + e.width / 2,
			midY: e.y + e.height / 2
		}, r = u(n.midX, n.midY), [o, i] = T(u(n.minX, n.minY), r, e.angle), [a, s] = T(u(n.maxX, n.minY), r, e.angle), [d, c] = T(u(n.maxX, n.maxY), r, e.angle), [l, U] = T(u(n.minX, n.maxY), r, e.angle), p = [
			Math.min(o, a, d, l),
			Math.min(i, s, c, U),
			Math.max(o, a, d, l),
			Math.max(i, s, c, U)
		];
		if (t) {
			let [m, b, E, g] = t;
			return [
				p[0] - g,
				p[1] - m,
				p[2] + b,
				p[3] + E
			];
		}
		return p;
	}, gn = (e, t) => e[0] > t[0] && e[0] < t[2] && e[1] > t[1] && e[1] < t[3];
	it = (e, t) => {
		if (t.roundness?.type === ot.PROPORTIONAL_RADIUS || t.roundness?.type === ot.LEGACY) return e * wo;
		if (t.roundness?.type === ot.ADAPTIVE_RADIUS) {
			let n = t.roundness?.value ?? Gs;
			return e <= n / wo ? e * wo : n;
		}
		return 0;
	}, Kt = (e, t = 1) => {
		if (e.length >= 3) {
			let [n, r] = [e[0], e[e.length - 1]];
			return ie(n, r) <= 8 / t;
		}
		return !1;
	};
	lP = (e, t, n, r, o, i, a) => {
		let { width: s, height: d } = er(e), c = n / s, l = r / d, U = (e.crop?.x ?? 0) / c, p = (e.crop?.y ?? 0) / l, m = T(u(o, i), u(e.x + e.width / 2, e.y + e.height / 2), -e.angle);
		o = m[0], i = m[1];
		let b = e.width, E = e.height, g = e.crop ?? {
			x: 0,
			y: 0,
			width: n,
			height: r,
			naturalWidth: n,
			naturalHeight: r
		}, h = g.height, x = g.width, y = e.scale[0] === -1, w = e.scale[1] === -1, I = i - e.y, S = o - e.x;
		t.includes("n") && (E = se(e.height - I, 10, w ? d - p : e.height + p)), t.includes("s") && (I = i - e.y - e.height, E = se(e.height + I, 10, w ? e.height + p : d - p)), t.includes("e") && (S = o - e.x - e.width, b = se(e.width + S, 10, y ? e.width + U : s - U)), t.includes("w") && (b = se(e.width - S, 10, y ? s - U : e.width + U));
		let v = (N) => {
			N.height = E * l, N.width = b * c;
		};
		v(g);
		let D = (N, B) => {
			v(B), N.includes("n") && (w || (B.y += h - B.height)), N.includes("s") && w && (B.y += h - B.height), N.includes("e") && y && (B.x += x - B.width), N.includes("w") && (y || (B.x += x - B.width));
		};
		switch (t) {
			case "n":
				if (a) {
					let N = U + e.width / 2, B = s - U - e.width / 2, _ = Math.min(N, B) * 2;
					b = se(E * a, 10, _), E = b / a;
				}
				D(t, g), a && (g.x += (x - g.width) / 2);
				break;
			case "s":
				if (a) {
					let N = U + e.width / 2, B = s - U - e.width / 2, _ = Math.min(N, B) * 2;
					b = se(E * a, 10, _), E = b / a;
				}
				D(t, g), a && (g.x += (x - g.width) / 2);
				break;
			case "w":
				if (a) {
					let N = p + e.height / 2, B = d - p - e.height / 2, _ = Math.min(N, B) * 2;
					E = se(b / a, 10, _), b = E * a;
				}
				D(t, g), a && (g.y += (h - g.height) / 2);
				break;
			case "e":
				if (a) {
					let N = p + e.height / 2, B = d - p - e.height / 2, _ = Math.min(N, B) * 2;
					E = se(b / a, 10, _), b = E * a;
				}
				D(t, g), a && (g.y += (h - g.height) / 2);
				break;
			case "ne":
				if (a) if (S > -I) {
					let N = w ? d - p : p + e.height;
					E = se(b / a, 10, N), b = E * a;
				} else {
					let N = y ? U + e.width : s - U;
					b = se(E * a, 10, N), E = b / a;
				}
				D(t, g);
				break;
			case "nw":
				if (a) if (S < I) {
					let N = w ? d - p : p + e.height;
					E = se(b / a, 10, N), b = E * a;
				} else {
					let N = y ? s - U : U + e.width;
					b = se(E * a, 10, N), E = b / a;
				}
				D(t, g);
				break;
			case "se":
				if (a) if (S > I) {
					let N = w ? p + e.height : d - p;
					E = se(b / a, 10, N), b = E * a;
				} else {
					let N = y ? U + e.width : s - U;
					b = se(E * a, 10, N), E = b / a;
				}
				D(t, g);
				break;
			case "sw":
				if (a) if (-S > I) {
					let N = w ? p + e.height : d - p;
					E = se(b / a, 10, N), b = E * a;
				} else {
					let N = y ? s - U : U + e.width;
					b = se(E * a, 10, N), E = b / a;
				}
				D(t, g);
				break;
			default: break;
		}
		let $ = Dm(e, t, b, E, !!a);
		return Zi(g.width, g.naturalWidth) && Zi(g.height, g.naturalHeight) && (g = null), {
			x: $[0],
			y: $[1],
			width: b,
			height: E,
			crop: g
		};
	}, Dm = (e, t, n, r, o) => {
		let [i, a, s, d] = Rt(e, e.width, e.height, !0), c = u(i, a), l = u(s, d), U = Zt(c, l), [p, m, b, E] = Rt(e, n, r, !0), g = b - p, h = E - m, x = [...c];
		if ([
			"n",
			"w",
			"nw"
		].includes(t) && (x = [l[0] - Math.abs(g), l[1] - Math.abs(h)]), t === "ne") {
			let D = [c[0], l[1]];
			x = [D[0], D[1] - Math.abs(h)];
		}
		if (t === "sw") {
			let D = [l[0], c[1]];
			x = [D[0] - Math.abs(g), D[1]];
		}
		o && (["s", "n"].includes(t) && (x[0] = U[0] - g / 2), ["e", "w"].includes(t) && (x[1] = U[1] - h / 2));
		let y = e.angle;
		x = T(T(x, U, y), T([x[0] + Math.abs(g) / 2, x[1] + Math.abs(h) / 2], U, y), -y);
		let v = [...x];
		return v[0] += e.x - p, v[1] += e.y - m, v;
	}, N1 = (e, t) => {
		if (e.crop) {
			let { width: n, height: r } = er(e), [o, i, a, s, d, c] = C(e, t), l = O(T(u(o, i), u(d, c), e.angle)), p = Je(Lo(O(T(u(a, i), u(d, c), e.angle)), l)), E = Je(Lo(O(T(u(o, s), u(d, c), e.angle)), l)), { cropX: g, cropY: h } = Sm(e.crop, e.scale), x = st(st(l, ue(p, -g * n / e.crop.naturalWidth)), ue(E, -h * r / e.crop.naturalHeight)), y = q(st(st(x, ue(p, n / 2)), ue(E, r / 2))), w = T(q(x), y, -e.angle);
			return {
				...e,
				x: w[0],
				y: w[1],
				width: n,
				height: r,
				crop: null
			};
		}
		return e;
	}, er = (e) => {
		if (e.crop) return {
			width: e.width / (e.crop.width / e.crop.naturalWidth),
			height: e.height / (e.crop.height / e.crop.naturalHeight)
		};
		return {
			width: e.width,
			height: e.height
		};
	}, Sm = (e, t) => {
		let n = e.x, r = e.y, o = t[0] === -1, i = t[1] === -1;
		return o && (n = e.naturalWidth - Math.abs(n) - e.width), i && (r = e.naturalHeight - Math.abs(r) - e.height), {
			cropX: n,
			cropY: r
		};
	}, UP = (e, t = !1) => {
		let n = e.crop;
		if (!n) return null;
		let r = e.scale[0] === -1, o = e.scale[1] === -1, i = n.x, a = n.y;
		if (r && (i = n.naturalWidth - n.width - n.x), o && (a = n.naturalHeight - n.height - n.y), t) return {
			x: i,
			y: a
		};
		let { width: s, height: d } = er(e);
		return {
			x: i / (n.naturalWidth / s),
			y: a / (n.naturalHeight / d)
		};
	};
	Ia = "invert(100%) hue-rotate(180deg) saturate(1.25)", $m = mt(), O1 = (e, t) => At(e) && !t.imageCache.has(e.fileId), A1 = (e, t, n) => n.theme === ke.DARK && At(e) && !O1(e, t) && t.imageCache.get(e.fileId)?.mimeType !== H.svg, ri = (e) => {
		switch (e.type) {
			case "freedraw": return e.strokeWidth * 12;
			case "text": return e.fontSize / 2;
			default: return 20;
		}
	}, Pm = (e, t, n, r, o = 1) => {
		let i = (t?.opacity ?? 100) * e.opacity / 1e4 * o;
		return (n.has(e.id) || r && r.some((a) => a.id === e.id) || t && n.has(t.id)) && (i *= Xs / 100), i;
	}, Nm = (e, t, n) => {
		let i = ri(e), [a, s, d, c] = C(e, t), l = ae(e) || Ce(e) ? dt(a, d) : e.width, U = ae(e) || Ce(e) ? dt(s, c) : e.height, p = l * window.devicePixelRatio + i * 2, m = U * window.devicePixelRatio + i * 2, b = n.value;
		return (p * b > 32767 || m * b > 32767) && (b = Math.min(32767 / p, 32767 / m)), p * m * b * b > 16777216 && (b = Math.sqrt(16777216 / (p * m))), p = Math.floor(p * b), m = Math.floor(m * b), {
			width: p,
			height: m,
			scale: b
		};
	}, K1 = (e, t, n, r, o) => {
		let i = document.createElement("canvas"), a = i.getContext("2d"), s = ri(e), { width: d, height: c, scale: l } = Nm(e, t, n);
		if (!d || !c) return null;
		i.width = d, i.height = c;
		let U = -100, p = 0;
		if (ae(e) || Ce(e)) {
			let [h, x] = C(e, t);
			U = e.x > h ? dt(e.x, h) * window.devicePixelRatio * l : 0, p = e.y > x ? dt(e.y, x) * window.devicePixelRatio * l : 0, a.translate(U, p);
		}
		a.save(), a.translate(s * l, s * l), a.scale(window.devicePixelRatio * l, window.devicePixelRatio * l);
		let m = rough_default.canvas(i);
		A1(e, r, o) && (a.filter = Ia), ni(e, m, a, r, o), a.restore();
		let b = oe(e, t), E = document.createElement("canvas"), g = E.getContext("2d");
		if (ee(e) && b) {
			let [h, x, y, w] = C(e, t), I = Math.max(dt(h, y), dt(x, w));
			E.width = I * window.devicePixelRatio * l + s * l * 10, E.height = I * window.devicePixelRatio * l + s * l * 10, g.translate(E.width / 2, E.height / 2), g.rotate(e.angle), g.drawImage(i, -i.width / 2, -i.height / 2, i.width, i.height);
			let [, , , , S, v] = C(b, t);
			g.rotate(-e.angle);
			let D = (E.width - i.width) / 2, $ = (E.height - i.height) / 2, N = E.width / 2 - (S - h) * window.devicePixelRatio * l - D - s * l, B = E.height / 2 - (v - x) * window.devicePixelRatio * l - $ - s * l;
			g.translate(-N, -B), g.clearRect(-(b.width / 2 + 5) * window.devicePixelRatio * l, -(b.height / 2 + 5) * window.devicePixelRatio * l, (b.width + 10) * window.devicePixelRatio * l, (b.height + 10) * window.devicePixelRatio * l);
		}
		return {
			element: e,
			canvas: i,
			theme: o.theme,
			scale: l,
			zoomValue: n.value,
			canvasOffsetX: U,
			canvasOffsetY: p,
			boundTextElementVersion: oe(e, t)?.version || null,
			containingFrameOpacity: We(e, t)?.opacity || 100,
			boundTextCanvas: E,
			angle: e.angle,
			imageCrop: Ye(e) ? e.crop : null
		};
	}, H1 = 14, J1 = document.createElement("img");
	J1.src = `data:${H.svg},${encodeURIComponent("<svg aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fas\" data-icon=\"image\" class=\"svg-inline--fa fa-image fa-w-16\" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path fill=\"#888\" d=\"M464 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM112 120c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56-25.072-56-56-56zM64 384h384V272l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L208 320l-55.515-55.515c-4.686-4.686-12.284-4.686-16.971 0L64 336v48z\"></path></svg>")}`;
	Y1 = document.createElement("img");
	Y1.src = `data:${H.svg},${encodeURIComponent("<svg viewBox=\"0 0 668 668\" xmlns=\"http://www.w3.org/2000/svg\" xml:space=\"preserve\" style=\"fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2\"><path d=\"M464 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48ZM112 120c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56-25.072-56-56-56ZM64 384h384V272l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L208 320l-55.515-55.515c-4.686-4.686-12.284-4.686-16.971 0L64 336v48Z\" style=\"fill:#888;fill-rule:nonzero\" transform=\"matrix(.81709 0 0 .81709 124.825 145.825)\"/><path d=\"M256 8C119.034 8 8 119.033 8 256c0 136.967 111.034 248 248 248s248-111.034 248-248S392.967 8 256 8Zm130.108 117.892c65.448 65.448 70 165.481 20.677 235.637L150.47 105.216c70.204-49.356 170.226-44.735 235.638 20.676ZM125.892 386.108c-65.448-65.448-70-165.481-20.677-235.637L361.53 406.784c-70.203 49.356-170.226 44.736-235.638-20.676Z\" style=\"fill:#888;fill-rule:nonzero\" transform=\"matrix(.30366 0 0 .30366 506.822 60.065)\"/></svg>")}`;
	Fm = (e, t) => {
		t.fillStyle = "#E7E7E7", t.fillRect(0, 0, e.width, e.height);
		let n = Math.min(e.width, e.height), r = Math.min(n, Math.min(n * .4, 100));
		t.drawImage(e.status === "error" ? Y1 : J1, e.width / 2 - r / 2, e.height / 2 - r / 2, r, r);
	}, ni = (e, t, n, r, o) => {
		switch (e.type) {
			case "rectangle":
			case "iframe":
			case "embeddable":
			case "diamond":
			case "ellipse":
				n.lineJoin = "round", n.lineCap = "round", t.draw(he.get(e));
				break;
			case "arrow":
			case "line":
				n.lineJoin = "round", n.lineCap = "round", he.get(e).forEach((i) => {
					t.draw(i);
				});
				break;
			case "freedraw": {
				n.save(), n.fillStyle = e.strokeColor;
				let i = Bm(e), a = he.get(e);
				a && t.draw(a), n.fillStyle = e.strokeColor, n.fill(i), n.restore();
				break;
			}
			case "image": {
				let i = At(e) ? r.imageCache.get(e.fileId)?.image : void 0;
				if (i != null && !(i instanceof Promise)) {
					e.roundness && n.roundRect && (n.beginPath(), n.roundRect(0, 0, e.width, e.height, it(Math.min(e.width, e.height), e)), n.clip());
					let { x: a, y: s, width: d, height: c } = e.crop ? e.crop : {
						x: 0,
						y: 0,
						width: i.naturalWidth,
						height: i.naturalHeight
					};
					n.drawImage(i, a, s, d, c, 0, 0, e.width, e.height);
				} else Fm(e, n);
				break;
			}
			default: if (k(e)) {
				let i = Po(e.text), a = i && !n.canvas.isConnected;
				a && document.body.appendChild(n.canvas), n.canvas.setAttribute("dir", i ? "rtl" : "ltr"), n.save(), n.font = Ee(e), n.fillStyle = e.strokeColor, n.textAlign = e.textAlign;
				let s = e.text.replace(/\r\n?/g, `
`).split(`
`), d = e.textAlign === "center" ? e.width / 2 : e.textAlign === "right" ? e.width : 0, c = Zn(e.fontSize, e.lineHeight), l = Go(e.fontFamily, e.fontSize, c);
				for (let U = 0; U < s.length; U++) n.fillText(s[U], d, U * c + l);
				n.restore(), a && n.canvas.remove();
			} else throw new Error(`Unimplemented type ${e.type}`);
		}
	}, Jo = /* @__PURE__ */ new WeakMap(), F1 = (e, t, n, r) => {
		let o = n ? r.zoom : $m.zoom, i = Jo.get(e), a = i && i.zoomValue !== o.value && !r?.shouldCacheIgnoreZoom, s = oe(e, t), d = s?.version || null, c = Ye(e) ? e.crop : null, l = We(e, t)?.opacity || 100;
		if (!i || a || i.theme !== r.theme || i.boundTextElementVersion !== d || i.imageCrop !== c || i.containingFrameOpacity !== l || ee(e) && s && e.angle !== i.angle) {
			let U = K1(e, t, o, n, r);
			return U ? (Jo.set(e, U), U) : null;
		}
		return i;
	}, ya = (e, t, n, r, o) => {
		let i = e.element, a = ri(i), s = e.scale, [d, c$1, l, U] = C(i, o), p = ((d + l) / 2 + r.scrollX) * window.devicePixelRatio, m = ((c$1 + U) / 2 + r.scrollY) * window.devicePixelRatio;
		t.save(), t.scale(1 / window.devicePixelRatio, 1 / window.devicePixelRatio);
		let b = oe(i, o);
		if (ee(i) && b) {
			let E = (e.boundTextCanvas.width - e.canvas.width) / 2, g = (e.boundTextCanvas.height - e.canvas.height) / 2;
			t.translate(p, m), t.drawImage(e.boundTextCanvas, -(l - d) / 2 * window.devicePixelRatio - E / s - a, -(U - c$1) / 2 * window.devicePixelRatio - g / s - a, e.boundTextCanvas.width / s, e.boundTextCanvas.height / s);
		} else if (t.translate(p, m), t.rotate(i.angle), "scale" in e.element && !O1(i, n) && t.scale(e.element.scale[0], e.element.scale[1]), t.translate(-p, -m), t.drawImage(e.canvas, (d + r.scrollX) * window.devicePixelRatio - a * e.scale / e.scale, (c$1 + r.scrollY) * window.devicePixelRatio - a * e.scale / e.scale, e.canvas.width / e.scale, e.canvas.height / e.scale), c.VITE_APP_DEBUG_ENABLE_TEXT_CONTAINER_BOUNDING_BOX === "true" && bn(i)) {
			let E = oe(i, o), g = Ra(i);
			t.strokeStyle = "#c92a2a", t.lineWidth = 3, t.strokeRect((g.x + r.scrollX) * window.devicePixelRatio, (g.y + r.scrollY) * window.devicePixelRatio, Tt(i, E) * window.devicePixelRatio, Ar(i, E) * window.devicePixelRatio);
		}
		t.restore();
	}, vP = (e, t, n, r) => {
		t.save(), t.translate(e.x + n.scrollX, e.y + n.scrollY), t.fillStyle = "rgba(0, 0, 200, 0.04)";
		let o = .5 / n.zoom.value;
		t.fillRect(o, o, e.width, e.height), t.lineWidth = 1 / n.zoom.value, t.strokeStyle = r, t.strokeRect(o, o, e.width, e.height), t.restore();
	}, Fn = (e, t, n, r, o, i, a) => {
		let s = a.openDialog?.name === "elementLinkSelector" && !a.selectedElementIds[e.id] && !a.hoveredElementIds[e.id];
		switch (o.globalAlpha = Pm(e, We(e, t), i.elementsPendingErasure, i.pendingFlowchartNodes, s ? zs : 1), e.type) {
			case "magicframe":
			case "frame":
				a.frameRendering.enabled && a.frameRendering.outline && (o.save(), o.translate(e.x + a.scrollX, e.y + a.scrollY), o.fillStyle = "rgba(0, 0, 200, 0.04)", o.lineWidth = Pe.strokeWidth / a.zoom.value, o.strokeStyle = Pe.strokeColor, yd(e) && (o.strokeStyle = a.theme === ke.LIGHT ? "#7affd7" : "#1d8264"), Pe.radius && o.roundRect ? (o.beginPath(), o.roundRect(0, 0, e.width, e.height, Pe.radius / a.zoom.value), o.stroke(), o.closePath()) : o.strokeRect(0, 0, e.width, e.height), o.restore());
				break;
			case "freedraw":
				if (he.generateElementShape(e, null), i.isExporting) {
					let [d, c, l, U] = C(e, t), p = (d + l) / 2 + a.scrollX, m = (c + U) / 2 + a.scrollY, b = (l - d) / 2 - (e.x - d), E = (U - c) / 2 - (e.y - c);
					o.save(), o.translate(p, m), o.rotate(e.angle), o.translate(-b, -E), ni(e, r, o, i, a), o.restore();
				} else {
					let d = F1(e, n, i, a);
					if (!d) return;
					ya(d, o, i, a, n);
				}
				break;
			case "rectangle":
			case "diamond":
			case "ellipse":
			case "line":
			case "arrow":
			case "image":
			case "text":
			case "iframe":
			case "embeddable":
				if (he.generateElementShape(e, i), i.isExporting) {
					let [d, c, l, U] = C(e, t), p = (d + l) / 2 + a.scrollX, m = (c + U) / 2 + a.scrollY, b = (l - d) / 2 - (e.x - d), E = (U - c) / 2 - (e.y - c);
					if (k(e)) {
						let h = qe(e, t);
						if (ee(h)) {
							let x = z.getBoundTextElementPosition(h, e, t);
							b = (l - d) / 2 - (x.x - d), E = (U - c) / 2 - (x.y - c);
						}
					}
					o.save(), o.translate(p, m), A1(e, i, a) && (o.filter = "none");
					let g = oe(e, t);
					if (ee(e) && g) {
						let h = document.createElement("canvas"), x = h.getContext("2d"), y = Math.max(dt(d, l), dt(c, U)), w = ri(e);
						h.width = y * a.exportScale + w * 10 * a.exportScale, h.height = y * a.exportScale + w * 10 * a.exportScale, x.translate(h.width / 2, h.height / 2), x.scale(a.exportScale, a.exportScale), b = e.width / 2 - (e.x - d), E = e.height / 2 - (e.y - c), x.rotate(e.angle);
						let I = rough_default.canvas(h);
						x.translate(-b, -E), ni(e, I, x, i, a), x.translate(b, E), x.rotate(-e.angle);
						let [, , , , S, v] = C(g, t), D = (d + l) / 2 - S, $ = (c + U) / 2 - v;
						x.translate(-D, -$), x.clearRect(-g.width / 2, -g.height / 2, g.width, g.height), o.scale(1 / a.exportScale, 1 / a.exportScale), o.drawImage(h, -h.width / 2, -h.height / 2, h.width, h.height);
					} else o.rotate(e.angle), e.type === "image" && o.scale(e.scale[0], e.scale[1]), o.translate(-b, -E), ni(e, r, o, i, a);
					o.restore();
				} else {
					let d = F1(e, n, i, a);
					if (!d) return;
					let c = o.imageSmoothingEnabled;
					if (!a?.shouldCacheIgnoreZoom && (!e.angle || od(e.angle)) && (o.imageSmoothingEnabled = !1), e.id === a.croppingElementId && Ye(d.element) && d.element.crop !== null) {
						o.save(), o.globalAlpha = .1;
						let l = K1(N1(d.element, t), n, a.zoom, i, a);
						l && ya(l, o, i, a, n), o.restore();
					}
					ya(d, o, i, a, n), o.imageSmoothingEnabled = c;
				}
				break;
			default: throw new Error(`Unimplemented type ${e.type}`);
		}
		o.globalAlpha = 1;
	}, C1 = /* @__PURE__ */ new WeakMap([]);
	_m = /(\s?[A-Z]?,?-?[0-9]*\.[0-9]{0,2})(([0-9]|e|-)*)/g;
	Am = (e) => e === "rectangle" || e === "iframe" || e === "embeddable" || e === "ellipse" || e === "diamond" || e === "line" || e === "freedraw", NP = (e) => e !== "image" && e !== "frame" && e !== "magicframe", Km = (e) => e === "rectangle" || e === "iframe" || e === "embeddable" || e === "ellipse" || e === "diamond" || e === "freedraw" || e === "arrow" || e === "line", Hm = (e) => e === "rectangle" || e === "iframe" || e === "embeddable" || e === "ellipse" || e === "diamond" || e === "arrow" || e === "line", Ta = (e) => e === "rectangle" || e === "iframe" || e === "embeddable" || e === "line" || e === "diamond" || e === "image", FP = (e) => e === "arrow", Jm = (e) => e === "arrow";
	Re = [1, 0], Fe = [0, 1], nt = [-1, 0], ze = [0, -1], oi = (e, t) => {
		let n = rd(Math.atan2(t[1] - e[1], t[0] - e[0]));
		return n >= 315 || n < 45 ? ze : n >= 45 && n < 135 ? Re : n >= 135 && n < 225 ? Fe : nt;
	}, Ht = (e) => {
		let [t, n] = e, r = Math.abs(t), o = Math.abs(n);
		return t > o ? Re : t <= -o ? nt : n > r ? Fe : ze;
	}, tr = (e, t) => Ht(O(e, t)), Mt = (e, t) => Lt(tr(e, t)), ve = (e, t) => e[0] === t[0] && e[1] === t[1], Lt = (e) => ve(e, Re) || ve(e, nt);
	q1 = (e, t, n) => {
		let o = Kr(t);
		if (e.type === "diamond") {
			if (n[0] < e.x) return nt;
			if (n[1] < e.y) return ze;
			if (n[0] > e.x + e.width) return Re;
			if (n[1] > e.y + e.height) return Fe;
			let c = T(bt(u(e.x + e.width / 2, e.y), o, 2), o, e.angle), l = T(bt(u(e.x + e.width, e.y + e.height / 2), o, 2), o, e.angle), U = T(bt(u(e.x + e.width / 2, e.y + e.height), o, 2), o, e.angle), p = T(bt(u(e.x, e.y + e.height / 2), o, 2), o, e.angle);
			return Ln([
				c,
				l,
				o
			], n) ? oi(c, l) : Ln([
				l,
				U,
				o
			], n) ? oi(l, U) : Ln([
				U,
				p,
				o
			], n) ? oi(U, p) : oi(p, c);
		}
		let i = bt(u(t[0], t[1]), o, 2), a = bt(u(t[2], t[1]), o, 2), s = bt(u(t[0], t[3]), o, 2), d = bt(u(t[2], t[3]), o, 2);
		return Ln([
			i,
			a,
			o
		], n) ? ze : Ln([
			a,
			d,
			o
		], n) ? Re : Ln([
			d,
			s,
			o
		], n) ? Fe : nt;
	}, Ma = (e) => [e[0] === 0 ? 0 : e[0] > 0 ? -1 : 1, e[1] === 0 ? 0 : e[1] > 0 ? -1 : 1];
	Cm = (e) => [8, 8 + e], k1 = (e) => [1.5, 6 + e];
	rt = (e, t = !1) => {
		let n = {
			seed: e.seed,
			strokeLineDash: e.strokeStyle === "dashed" ? Cm(e.strokeWidth) : e.strokeStyle === "dotted" ? k1(e.strokeWidth) : void 0,
			disableMultiStroke: e.strokeStyle !== "solid",
			strokeWidth: e.strokeStyle !== "solid" ? e.strokeWidth + .5 : e.strokeWidth,
			fillWeight: e.strokeWidth / 2,
			hachureGap: e.strokeWidth * 4,
			roughness: Vm(e),
			stroke: e.strokeColor,
			preserveVertices: t || e.roughness < Gi.cartoonist
		};
		switch (e.type) {
			case "rectangle":
			case "iframe":
			case "embeddable":
			case "diamond":
			case "ellipse": return n.fillStyle = e.fillStyle, n.fill = Wt(e.backgroundColor) ? void 0 : e.backgroundColor, e.type === "ellipse" && (n.curveFitting = 1), n;
			case "line":
			case "freedraw": return Kt(e.points) && (n.fillStyle = e.fillStyle, n.fill = e.backgroundColor === "transparent" ? void 0 : e.backgroundColor), n;
			case "arrow": return n;
			default: throw new Error(`Unimplemented type ${e.type}`);
		}
	}, X1 = (e, t, n) => gt(e) && (t || Bo(e) && n?.get(e.id) !== !0) && Wt(e.backgroundColor) && Wt(e.strokeColor) ? {
		...e,
		roughness: 0,
		backgroundColor: "#d3d3d3",
		fillStyle: "solid"
	} : _o(e) ? {
		...e,
		strokeColor: Wt(e.strokeColor) ? "#000000" : e.strokeColor,
		backgroundColor: Wt(e.backgroundColor) ? "#f4f4f6" : e.backgroundColor
	} : e, G1 = (e, t, n, r, o, i, a) => {
		let s = ii(e, t, n, r);
		if (s === null) return [];
		let d = (c, l) => {
			if (c === null) return [];
			let [, , U, p, m, b] = c;
			return [o.line(U, p, m, b, l)];
		};
		switch (r) {
			case "dot":
			case "circle":
			case "circle_outline": {
				let [c, l, U] = s;
				return delete i.strokeLineDash, [o.circle(c, l, U, {
					...i,
					fill: r === "circle_outline" ? a : e.strokeColor,
					fillStyle: "solid",
					stroke: e.strokeColor,
					roughness: Math.min(.5, i.roughness || 0)
				})];
			}
			case "triangle":
			case "triangle_outline": {
				let [c, l, U, p, m, b] = s;
				return delete i.strokeLineDash, [o.polygon([
					[c, l],
					[U, p],
					[m, b],
					[c, l]
				], {
					...i,
					fill: r === "triangle_outline" ? a : e.strokeColor,
					fillStyle: "solid",
					roughness: Math.min(1, i.roughness || 0)
				})];
			}
			case "diamond":
			case "diamond_outline": {
				let [c, l, U, p, m, b, E, g] = s;
				return delete i.strokeLineDash, [o.polygon([
					[c, l],
					[U, p],
					[m, b],
					[E, g],
					[c, l]
				], {
					...i,
					fill: r === "diamond_outline" ? a : e.strokeColor,
					fillStyle: "solid",
					roughness: Math.min(1, i.roughness || 0)
				})];
			}
			case "crowfoot_one": return d(s, i);
			default: {
				let [c, l, U, p, m, b] = s;
				if (e.strokeStyle === "dotted") {
					let E = k1(e.strokeWidth - 1);
					i.strokeLineDash = [E[0], E[1] - 1];
				} else delete i.strokeLineDash;
				return i.roughness = Math.min(1, i.roughness || 0), [
					o.line(U, p, c, l, i),
					o.line(m, b, c, l, i),
					...r === "crowfoot_one_or_many" ? d(ii(e, t, n, "crowfoot_one"), i) : []
				];
			}
		}
	}, vd = (e, t, { isExporting: n, canvasBackgroundColor: r, embedsValidationStatus: o }) => {
		switch (e.type) {
			case "rectangle":
			case "iframe":
			case "embeddable": {
				let i;
				if (e.roundness) {
					let a = e.width, s = e.height, d = it(Math.min(a, s), e);
					i = t.path(`M ${d} 0 L ${a - d} 0 Q ${a} 0, ${a} ${d} L ${a} ${s - d} Q ${a} ${s}, ${a - d} ${s} L ${d} ${s} Q 0 ${s}, 0 ${s - d} L 0 ${d} Q 0 0, ${d} 0`, rt(X1(e, n, o), !0));
				} else i = t.rectangle(0, 0, e.width, e.height, rt(X1(e, n, o), !1));
				return i;
			}
			case "diamond": {
				let i, [a, s, d, c, l, U, p, m] = Or(e);
				if (e.roundness) {
					let b = it(Math.abs(a - p), e), E = it(Math.abs(c - s), e);
					i = t.path(`M ${a + b} ${s + E} L ${d - b} ${c - E}
            C ${d} ${c}, ${d} ${c}, ${d - b} ${c + E}
            L ${l + b} ${U - E}
            C ${l} ${U}, ${l} ${U}, ${l - b} ${U - E}
            L ${p + b} ${m + E}
            C ${p} ${m}, ${p} ${m}, ${p + b} ${m - E}
            L ${a - b} ${s + E}
            C ${a} ${s}, ${a} ${s}, ${a + b} ${s + E}`, rt(e, !0));
				} else i = t.polygon([
					[a, s],
					[d, c],
					[l, U],
					[p, m]
				], rt(e));
				return i;
			}
			case "ellipse": return t.ellipse(e.width / 2, e.height / 2, e.width, e.height, rt(e));
			case "line":
			case "arrow": {
				let i, a = rt(e), s = e.points.length ? e.points : [u(0, 0)];
				if (X(e) ? s.every((d) => Math.abs(d[0]) <= 1e6 && Math.abs(d[1]) <= 1e6) ? i = [t.path(qm(s, 16), rt(e, !0))] : (console.error("Elbow arrow with extreme point positions detected. Arrow not rendered.", e.id, JSON.stringify(s)), i = []) : e.roundness ? i = [t.curve(s, a)] : a.fill ? i = [t.polygon(s, a)] : i = [t.linearPath(s, a)], e.type === "arrow") {
					let { startArrowhead: d = null, endArrowhead: c = "arrow" } = e;
					if (d !== null) {
						let l = G1(e, i, "start", d, t, a, r);
						i.push(...l);
					}
					if (c !== null) {
						let l = G1(e, i, "end", c, t, a, r);
						i.push(...l);
					}
				}
				return i;
			}
			case "freedraw": {
				let i;
				if (V1(e), Kt(e.points)) {
					let a = simplify(e.points, .75);
					i = t.curve(a, {
						...rt(e),
						stroke: "none"
					});
				} else i = null;
				return i;
			}
			case "frame":
			case "magicframe":
			case "text":
			case "image": return null;
			default: return Sn(e, `generateElementShape(): Unimplemented type ${e?.type}`), null;
		}
	}, qm = (e, t) => {
		let n = [];
		for (let o = 1; o < e.length - 1; o += 1) {
			let i = e[o - 1], a = e[o + 1], s = e[o], d = Mt(s, i), c = Mt(a, s), l = Math.min(t, ie(e[o], a) / 2, ie(e[o], i) / 2);
			d ? i[0] < s[0] ? n.push([e[o][0] - l, e[o][1]]) : n.push([e[o][0] + l, e[o][1]]) : i[1] < s[1] ? n.push([e[o][0], e[o][1] - l]) : n.push([e[o][0], e[o][1] + l]), n.push(e[o]), c ? a[0] < s[0] ? n.push([e[o][0] - l, e[o][1]]) : n.push([e[o][0] + l, e[o][1]]) : a[1] < s[1] ? n.push([e[o][0], e[o][1] - l]) : n.push([e[o][0], e[o][1] + l]);
		}
		let r = [`M ${e[0][0]} ${e[0][1]}`];
		for (let o = 0; o < n.length; o += 3) r.push(`L ${n[o][0]} ${n[o][1]}`), r.push(`Q ${n[o + 1][0]} ${n[o + 1][1]}, ${n[o + 2][0]} ${n[o + 2][1]}`);
		return r.push(`L ${e[e.length - 1][0]} ${e[e.length - 1][1]}`), r.join(" ");
	};
	xn = (e) => {
		let t = e.map((r) => r[0]), n = e.map((r) => r[1]);
		return {
			width: Math.max(...t) - Math.min(...t),
			height: Math.max(...n) - Math.min(...n)
		};
	}, nr = (e, t, n, r) => {
		let o = n.map((m) => m[e]), i = Math.max(...o), a = Math.min(...o), s = i - a, d = s === 0 ? 1 : t / s, c = Infinity, l = n.map((m) => {
			let b = m[e] * d, E = [...m];
			return E[e] = b, b < c && (c = b), E;
		});
		if (!r || l.length === 2) return l;
		let U = a - c;
		return l.map((m) => m.map((b, E) => E === e ? b + U : b));
	};
	rr = class rr {
		static getBounds(t, n) {
			let r = rr.boundsCache.get(t);
			if (r?.version && r.version === t.version && !Ne(t)) return r.bounds;
			let o = rr.calculateBounds(t, n);
			return rr.boundsCache.set(t, {
				version: t.version,
				bounds: o
			}), o;
		}
		static calculateBounds(t, n) {
			let r, [o, i, a, s, d, c] = C(t, n);
			if (Ce(t)) {
				let [l, U, p, m] = va(t.points.map(([b, E]) => T(u(b, E), u(d - t.x, c - t.y), t.angle)));
				return [
					l + t.x,
					U + t.y,
					p + t.x,
					m + t.y
				];
			} else if (ae(t)) r = zm(t, d, c, n);
			else if (t.type === "diamond") {
				let [l, U] = T(u(d, i), u(d, c), t.angle), [p, m] = T(u(d, s), u(d, c), t.angle), [b, E] = T(u(o, c), u(d, c), t.angle), [g, h] = T(u(a, c), u(d, c), t.angle);
				r = [
					Math.min(l, p, b, g),
					Math.min(U, m, E, h),
					Math.max(l, p, b, g),
					Math.max(U, m, E, h)
				];
			} else if (t.type === "ellipse") {
				let l = (a - o) / 2, U = (s - i) / 2, p = Math.cos(t.angle), m = Math.sin(t.angle), b = Math.hypot(l * p, U * m), E = Math.hypot(U * p, l * m);
				r = [
					d - b,
					c - E,
					d + b,
					c + E
				];
			} else {
				let [l, U] = T(u(o, i), u(d, c), t.angle), [p, m] = T(u(o, s), u(d, c), t.angle), [b, E] = T(u(a, s), u(d, c), t.angle), [g, h] = T(u(a, i), u(d, c), t.angle);
				r = [
					Math.min(l, p, b, g),
					Math.min(U, m, E, h),
					Math.max(l, p, b, g),
					Math.max(U, m, E, h)
				];
			}
			return r;
		}
	};
	i$1(rr, "boundsCache", /* @__PURE__ */ new WeakMap());
	La = rr, C = (e, t, n = !1) => {
		if (Ce(e)) return Gm(e);
		if (ae(e)) return z.getElementAbsoluteCoords(e, t, n);
		if (k(e)) {
			let r = t ? qe(e, t) : null;
			if (ee(r)) {
				let { x: o, y: i } = z.getBoundTextElementPosition(r, e, t);
				return [
					o,
					i,
					o + e.width,
					i + e.height,
					o + e.width / 2,
					i + e.height / 2
				];
			}
		}
		return [
			e.x,
			e.y,
			e.x + e.width,
			e.y + e.height,
			e.x + e.width / 2,
			e.y + e.height / 2
		];
	}, Sa = (e, t) => {
		let [n, r, o, i, a, s] = C(e, t), d = u(a, s);
		if (ae(e) || Ce(e)) {
			let h = [], x = 0;
			for (; x < e.points.length - 1;) h.push(A(T(u(e.points[x][0] + e.x, e.points[x][1] + e.y), d, e.angle), T(u(e.points[x + 1][0] + e.x, e.points[x + 1][1] + e.y), d, e.angle))), x++;
			return h;
		}
		let [c, l, U, p, m, b, E, g] = [
			[n, r],
			[o, r],
			[n, i],
			[o, i],
			[a, r],
			[a, i],
			[n, s],
			[o, s]
		].map((h) => T(h, d, e.angle));
		return e.type === "diamond" ? [
			A(m, E),
			A(m, g),
			A(b, E),
			A(b, g)
		] : e.type === "ellipse" ? [
			A(m, E),
			A(m, g),
			A(b, E),
			A(b, g),
			A(m, E),
			A(m, g),
			A(b, E),
			A(b, g)
		] : [
			A(c, l),
			A(U, p),
			A(c, U),
			A(l, p),
			A(c, g),
			A(U, g),
			A(l, E),
			A(p, E)
		];
	};
	Or = (e) => {
		let t = Math.floor(e.width / 2) + 1, n = 0, r = e.width, o = Math.floor(e.height / 2) + 1;
		return [
			t,
			n,
			r,
			o,
			t,
			e.height,
			0,
			o
		];
	}, Z1 = (e, t, n, r, o) => {
		let i = 1 - e;
		return Math.pow(i, 3) * t + 3 * Math.pow(i, 2) * e * n + 3 * i * Math.pow(e, 2) * r + Math.pow(e, 3) * o;
	}, W1 = (e, t, n, r) => {
		let o = t - e, i = n - t, a = r - n, s = 3 * o - 6 * i + 3 * a, d = 6 * i - 6 * o, c = 3 * o, l = d * d - 4 * s * c;
		if (!(l >= 0)) return !1;
		let p = null, m = null, b = Infinity, E = Infinity;
		return s === 0 ? b = E = -c / d : (b = (-d + Math.sqrt(l)) / (2 * s), E = (-d - Math.sqrt(l)) / (2 * s)), b >= 0 && b <= 1 && (p = Z1(b, e, t, n, r)), E >= 0 && E <= 1 && (m = Z1(E, e, t, n, r)), [p, m];
	}, Xm = (e, t, n, r) => {
		let o = W1(e[0], t[0], n[0], r[0]), i = W1(e[1], t[1], n[1], r[1]), a = Math.min(e[0], r[0]), s = Math.max(e[0], r[0]);
		if (o) {
			let l = o.filter((U) => U !== null);
			a = Math.min(a, ...l), s = Math.max(s, ...l);
		}
		let d = Math.min(e[1], r[1]), c = Math.max(e[1], r[1]);
		if (i) {
			let l = i.filter((U) => U !== null);
			d = Math.min(d, ...l), c = Math.max(c, ...l);
		}
		return [
			a,
			d,
			s,
			c
		];
	}, Hr = (e, t) => {
		let n = u(0, 0), { minX: r, minY: o, maxX: i, maxY: a } = e.reduce((s, { op: d, data: c }) => {
			if (d === "move") {
				let l = Ir(c);
				Ae(l != null, "Op data is not a point"), n = l;
			} else if (d === "bcurveTo") {
				let l = u(c[0], c[1]), U = u(c[2], c[3]), p = u(c[4], c[5]), m = t ? t(l) : l, b = t ? t(U) : U, E = t ? t(p) : p, g = t ? t(n) : n;
				n = p;
				let [h, x, y, w] = Xm(g, m, b, E);
				s.minX = Math.min(s.minX, h), s.minY = Math.min(s.minY, x), s.maxX = Math.max(s.maxX, y), s.maxY = Math.max(s.maxY, w);
			}
			return s;
		}, {
			minX: Infinity,
			minY: Infinity,
			maxX: -Infinity,
			maxY: -Infinity
		});
		return [
			r,
			o,
			i,
			a
		];
	}, va = (e) => {
		let t = Infinity, n = Infinity, r = -Infinity, o = -Infinity;
		for (let [i, a] of e) t = Math.min(t, i), n = Math.min(n, a), r = Math.max(r, i), o = Math.max(o, a);
		return [
			t,
			n,
			r,
			o
		];
	}, Gm = (e) => {
		let [t, n, r, o] = va(e.points), i = t + e.x, a = n + e.y, s = r + e.x, d = o + e.y;
		return [
			i,
			a,
			s,
			d,
			(i + s) / 2,
			(a + d) / 2
		];
	}, km = (e) => {
		switch (e) {
			case "arrow": return 25;
			case "diamond":
			case "diamond_outline": return 12;
			case "crowfoot_many":
			case "crowfoot_one":
			case "crowfoot_one_or_many": return 20;
			default: return 15;
		}
	}, Zm = (e) => {
		switch (e) {
			case "bar": return 90;
			case "arrow": return 20;
			default: return 25;
		}
	}, ii = (e, t, n, r) => {
		if (t.length < 1) return null;
		let o = It(t[0]);
		if (o.length < 1) return null;
		let i = n === "start" ? 1 : o.length - 1, a = o[i].data;
		Ae(a.length === 6, "Op data length is not 6");
		let s = u(a[4], a[5]), d = u(a[2], a[3]), c = u(a[0], a[1]), l = o[i - 1], U = u(0, 0);
		if (l.op === "move") {
			let V = Ir(l.data);
			Ae(V != null, "Op data is not a point"), U = V;
		} else l.op === "bcurveTo" && (U = u(l.data[4], l.data[5]));
		let p = (V, ce) => Math.pow(1 - V, 3) * s[ce] + 3 * V * Math.pow(1 - V, 2) * d[ce] + 3 * Math.pow(V, 2) * (1 - V) * c[ce] + U[ce] * Math.pow(V, 3), [m, b] = n === "start" ? U : s, [E, g] = [p(.3, 0), p(.3, 1)], h = Math.hypot(m - E, b - g), x = (m - E) / h, y = (b - g) / h, w = km(r), I = 0;
		{
			let [V, ce] = n === "end" ? e.points[e.points.length - 1] : e.points[0], [J, j] = e.points.length > 1 ? n === "end" ? e.points[e.points.length - 2] : e.points[1] : [0, 0];
			I = Math.hypot(V - J, ce - j);
		}
		let v = Math.min(w, I * (r === "diamond" || r === "diamond_outline" ? .25 : .5)), D = m - x * v, $ = b - y * v;
		if (r === "dot" || r === "circle" || r === "circle_outline") return [
			m,
			b,
			Math.hypot($ - b, D - m) + e.strokeWidth - 2
		];
		let N = Zm(r);
		if (r === "crowfoot_many" || r === "crowfoot_one_or_many") {
			let [V, ce] = T(u(m, b), u(D, $), yr(-N)), [J, j] = T(u(m, b), u(D, $), yr(N));
			return [
				D,
				$,
				V,
				ce,
				J,
				j
			];
		}
		let [B, _] = T(u(D, $), u(m, b), -N * Math.PI / 180), [W, be] = T(u(D, $), u(m, b), yr(N));
		if (r === "diamond" || r === "diamond_outline") {
			let V, ce;
			if (n === "start") {
				let [J, j] = e.points.length > 1 ? e.points[1] : [0, 0];
				[V, ce] = T(u(m + v * 2, b), u(m, b), Math.atan2(j - b, J - m));
			} else {
				let [J, j] = e.points.length > 1 ? e.points[e.points.length - 2] : [0, 0];
				[V, ce] = T(u(m - v * 2, b), u(m, b), Math.atan2(b - j, m - J));
			}
			return [
				m,
				b,
				B,
				_,
				V,
				ce,
				W,
				be
			];
		}
		return [
			m,
			b,
			B,
			_,
			W,
			be
		];
	}, Wm = (e) => {
		let t = rough_default.generator(), n = rt(e);
		return t[e.roundness ? "curve" : n.fill ? "polygon" : "linearPath"](e.points, n);
	}, zm = (e, t, n, r) => {
		let o = oe(e, r);
		if (e.points.length < 2) {
			let [U, p] = e.points[0], [m, b] = T(u(e.x + U, e.y + p), u(t, n), e.angle), E = [
				m,
				b,
				m,
				b
			];
			if (o) {
				let g = z.getMinMaxXYWithBoundText(e, r, [
					m,
					b,
					m,
					b
				], o);
				E = [
					g[0],
					g[1],
					g[2],
					g[3]
				];
			}
			return E;
		}
		let c = Hr(It(he.get(e)?.[0] ?? Wm(e)), ([U, p]) => T(u(e.x + U, e.y + p), u(t, n), e.angle)), l = [
			c[0],
			c[1],
			c[2],
			c[3]
		];
		if (o) {
			let U = z.getMinMaxXYWithBoundText(e, r, l, o);
			l = [
				U[0],
				U[1],
				U[2],
				U[3]
			];
		}
		return l;
	}, Ke = (e, t) => La.getBounds(e, t), $e = (e, t) => {
		if (!e.length) return [
			0,
			0,
			0,
			0
		];
		let n = Infinity, r = -Infinity, o = Infinity, i = -Infinity, a = t || te(e);
		return e.forEach((s) => {
			let [d, c, l, U] = Ke(s, a);
			n = Math.min(n, d), o = Math.min(o, c), r = Math.max(r, l), i = Math.max(i, U);
		}), [
			n,
			o,
			r,
			i
		];
	}, ai = (e, t) => {
		let [n, r, o, i] = $e(e);
		return [
			n + t.x,
			r + t.y,
			o + t.x,
			i + t.y
		];
	}, Rt = (e, t, n, r) => {
		if (!(ae(e) || Ce(e))) return [
			e.x,
			e.y,
			e.x + t,
			e.y + n
		];
		let o = nr(0, t, nr(1, n, e.points, r), r), i;
		if (Ce(e)) i = va(o);
		else {
			let l = rough_default.generator();
			i = Hr(It(e.roundness ? l.curve(o, rt(e)) : l.linearPath(o, rt(e))));
		}
		let [a, s, d, c] = i;
		return [
			a + e.x,
			s + e.y,
			d + e.x,
			c + e.y
		];
	}, $a = (e, t) => {
		let n = rough_default.generator(), [i, a, s, d] = Hr(It(e.roundness == null ? n.linearPath(t, rt(e)) : n.curve(t, rt(e))));
		return [
			i + e.x,
			a + e.y,
			s + e.x,
			d + e.y
		];
	}, Pa = (e, t) => {
		if (!e.length) return [
			0,
			0,
			0,
			0
		];
		let n = Infinity, r = e[0], o = te(e);
		return e.forEach((i) => {
			let [a, s, d, c] = Ke(i, o), l = ie(u((a + d) / 2, (s + c) / 2), u(t.x, t.y));
			l < n && (n = l, r = i);
		}), Ke(r, o);
	}, Na = (e) => {
		let [t, n, r, o] = $e(e);
		return {
			minX: t,
			minY: n,
			maxX: r,
			maxY: o,
			width: r - t,
			height: o - n,
			midX: (t + r) / 2,
			midY: (n + o) / 2
		};
	}, fN = ({ scrollX: e, scrollY: t, width: n, height: r, zoom: o }) => [
		-e,
		-t,
		-e + n / o.value,
		-t + r / o.value
	], Kr = (e) => u(e[0] + (e[2] - e[0]) / 2, e[1] + (e[3] - e[1]) / 2), z1 = (e, t) => {
		if (e == null || t == null) return !1;
		let [n, r, o, i] = e, [a, s, d, c] = t;
		return n < d && o > a && r < c && i > s;
	};
	or = (e, t) => {
		switch (e.type) {
			case "rectangle":
			case "image":
			case "text":
			case "iframe":
			case "embeddable":
			case "frame":
			case "magicframe": return Qm(e, t);
			case "diamond": return jm(e, t);
			case "ellipse": return eb(e, t);
		}
	}, Qm = (e, t) => {
		let r = T(t, u(e.x + e.width / 2, e.y + e.height / 2), -e.angle), [o, i] = Qo(e);
		return Math.min(...o.map((a) => vo(r, a)), ...i.map((a) => zi(a, r)).filter((a) => a !== null));
	}, jm = (e, t) => {
		let r = T(t, u(e.x + e.width / 2, e.y + e.height / 2), -e.angle), [o, i] = jo(e);
		return Math.min(...o.map((a) => vo(r, a)), ...i.map((a) => zi(a, r)).filter((a) => a !== null));
	}, eb = (e, t) => {
		let n = u(e.x + e.width / 2, e.y + e.height / 2);
		return T1(T(t, n, -e.angle), zo(n, e.width / 2, e.height / 2));
	};
	FN = (e) => !e[Q.CTRL_OR_CMD], Fa = (e) => e.isBindingEnabled, me = 5, tb = (e, t) => {
		let n = [];
		return t.forEach((r) => {
			let o = e.getNonDeletedElement(r);
			o != null && n.push(o);
		}), n;
	}, Ba = (e, t, n, r, o) => {
		let i = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set();
		Q1(e, t, n, "start", i, a, r), Q1(e, n, t, "end", i, a, r);
		tb(o, Array.from(a).filter((d) => !i.has(d))).forEach((d) => {
			Y(d, { boundElements: d.boundElements?.filter((c) => c.type !== "arrow" || c.id !== e.id) });
		});
	}, Q1 = (e, t, n, r, o, i, a) => {
		if (t !== "keep") {
			if (t === null) {
				let s = sb(e, r);
				s != null && i.add(s);
				return;
			}
			i2(e) ? (n == null || (n === "keep" ? !o2(e, t, r) : r === "start" || n.id !== t.id)) && (di(e, t, r, a), o.add(t.id)) : (di(e, t, r, a), o.add(t.id));
		}
	}, nb = (e, t, n, r) => {
		let o = c2(e, t, n), i = t === "start" ? e.startBinding?.elementId : e.endBinding?.elementId;
		if (i) {
			let a = n.get(i);
			if (xt(a) && si(a, o, n, r)) return a;
		}
		return null;
	}, r2 = (e, t, n) => ["start", "end"].map((r) => nb(e, r, t, n)), rb = (e, t, n, r, o, i) => {
		let s = e.points.length - 1, d = n.findIndex((p) => p === 0) > -1, c = n.findIndex((p) => p === s) > -1;
		return [d ? t ? ir(e, "start", r, o, i) : null : X(e) ? "keep" : ir(e, "start", r, o, i), c ? t ? ir(e, "end", r, o, i) : null : X(e) ? "keep" : ir(e, "end", r, o, i)];
	}, ob = (e, t, n, r, o) => {
		if (X(e)) return ["keep", "keep"];
		let [i, a] = r2(e, t, o);
		return [i && r ? ir(e, "start", t, n, o) : null, a && r ? ir(e, "end", t, n, o) : null];
	}, BN = (e, t, n, r, o, i, a) => {
		e.forEach((s) => {
			let [d, c] = i?.length ? rb(s, o, i ?? [], t, n, a) : ob(s, t, n, o, a);
			Ba(s, d, c, t, r);
		});
	}, _N = (e, t, n) => e.length > 50 ? [] : e.filter(ae).flatMap((r) => r2(r, t, n)).filter((r) => r !== null).filter((r) => e.filter((o) => o.id === r?.id).length === 0), ON = (e, t, n, r, o) => {
		t.startBoundElement != null && di(e, t.startBoundElement, "start", r);
		let i = Bn(n, o, r, t.zoom, X(e), X(e));
		i !== null && (o2(e, i, "end") || di(e, i, "end", r));
	}, ib = (e, t) => {
		let n = e.gap, r = pi(t, t.width, t.height);
		return n > r && (n = 14), {
			...e,
			gap: n
		};
	}, di = (e, t, n, r) => {
		if (!ee(e)) return;
		let o = {
			elementId: t.id,
			...X(e) ? {
				...d2(e, t, n, r),
				focus: 0,
				gap: 0
			} : { ...ib(lb(e, t, n, r), t) }
		};
		Y(e, { [n === "start" ? "startBinding" : "endBinding"]: o }), te(t.boundElements || []).has(e.id) || Y(t, { boundElements: (t.boundElements || []).concat({
			id: e.id,
			type: "arrow"
		}) });
	}, o2 = (e, t, n) => {
		let r = e[n === "start" ? "endBinding" : "startBinding"];
		return ab(e, r?.elementId, t);
	}, ab = (e, t, n) => t === n.id && i2(e), i2 = (e) => e.points.length < 3, sb = (e, t) => {
		let n = t === "start" ? "startBinding" : "endBinding", r = e[n];
		return r == null ? null : (Y(e, { [n]: null }), r.elementId);
	}, Bn = (e, t, n, r, o, i) => {
		if (i) {
			let s = !1, d = cb(t, (l) => xt(l, !1) && si(l, e, n, r, (o || !No(l)) && !de(l))).filter((l) => s ? !1 : (No(l) || (s = !0), !0));
			if (!d || d.length === 0) return null;
			if (d.length === 1) return d[0];
			let c = d.filter((l) => si(l, e, n, r, !1));
			return c.length === 1 ? c[0] : d.sort((l, U) => U.width ** 2 + U.height ** 2 - (l.width ** 2 + l.height ** 2)).pop();
		}
		return db(t, (s) => xt(s, !1) && si(s, e, n, r, (o || !No(s)) && !de(s)));
	}, db = (e, t) => {
		let n = null;
		for (let r = e.length - 1; r >= 0; --r) {
			let o = e[r];
			if (!o.isDeleted && t(o)) {
				n = o;
				break;
			}
		}
		return n;
	}, cb = (e, t) => {
		let n = [];
		for (let r = e.length - 1; r >= 0; --r) {
			let o = e[r];
			o.isDeleted || t(o) && n.push(o);
		}
		return n;
	}, lb = (e, t, n, r) => {
		let o = n === "start" ? -1 : 1, i = o === -1 ? 0 : e.points.length - 1, a = i - o, s = z.getPointAtIndexGlobalCoordinates(e, i, r);
		return {
			focus: Eb(t, z.getPointAtIndexGlobalCoordinates(e, a, r), s),
			gap: Math.max(1, or(t, s))
		};
	}, Jt = (e, t, n) => {
		let { newSize: r, simultaneouslyUpdated: o } = n ?? {}, i = fb(o);
		xt(e) && ci(t, e, (a) => {
			if (!ae(a) || a.isDeleted || !Ub(a, e)) return;
			let s = a.startBinding ? t.get(a.startBinding.elementId) : null, d = a.endBinding ? t.get(a.endBinding.elementId) : null, c = null, l = null;
			s && d && (c = Ke(s, t), l = Ke(d, t));
			let U = {
				startBinding: j1(e, a.startBinding, r),
				endBinding: j1(e, a.endBinding, r)
			};
			if (i.has(a.id)) {
				Y(a, U, !0);
				return;
			}
			let p = li(t, a, (b, E) => {
				if (b && xt(b) && (E === "startBinding" || E === "endBinding") && (e.id === a[E]?.elementId || e.id === a[E === "startBinding" ? "endBinding" : "startBinding"]?.elementId && !z1(c, l))) {
					let g = bb(a, E, U[E], b, t);
					if (g) return {
						index: E === "startBinding" ? 0 : a.points.length - 1,
						point: g
					};
				}
				return null;
			}).filter((b) => b !== null);
			z.movePoints(a, p, {
				...e.id === a.startBinding?.elementId ? { startBinding: U.startBinding } : {},
				...e.id === a.endBinding?.elementId ? { endBinding: U.endBinding } : {}
			});
			let m = oe(a, t);
			m && !m.isDeleted && _n(a, t, !1);
		});
	}, Ub = (e, t) => e.startBinding?.elementId === t.id || e.endBinding?.elementId === t.id, fb = (e) => new Set((e || []).map((t) => t.id)), a2 = (e, t, n, r, o, i, a) => {
		let s = Ht(O(t, e));
		return !n || !r ? s : pb(i, n, o, a) ? q1(n, r, e) : Ht(O(e, u(n.x + n.width / 2, n.y + n.height / 2)));
	}, pb = (e, t, n, r) => {
		let o = or(t, e);
		return o > pi(t, t.width, t.height, r) ? null : o;
	}, fi = (e, t, n) => {
		let r = t && wt(t), o = e.points[n === "start" ? 0 : e.points.length - 1], i = u(e.x + o[0], e.y + o[1]), a = Id(t) ? mb(t, i) : i;
		if (t && r) {
			let s = Kr(r), d = Ea(t, A(s, q(ue(Je(O(a, s)), Math.max(t.width, t.height)), s)))[0], c = ie(a, s), l = Math.max(ie(d ?? a, s), 1e-4), U = To(c / l, 6);
			switch (!0) {
				case U > .9: return c - l > me || Xn(a, d) < 1e-4 ? a : q(ue(Je(O(a, d ?? s)), U > 1 ? me : -me), d ?? s);
				default: return ub(a, t, r);
			}
		}
		return a;
	}, ub = (e, t, n) => {
		let r = Kr(n), o = Ht(O(e, r));
		switch (!0) {
			case ve(o, ze): return T(u((n[0] + n[2]) / 2 + .1, n[1]), r, t.angle);
			case ve(o, Re): return T(u(n[2], (n[1] + n[3]) / 2 + .1), r, t.angle);
			case ve(o, Fe): return T(u((n[0] + n[2]) / 2 - .1, n[3]), r, t.angle);
			default: return T(u(n[0], (n[1] + n[3]) / 2 - .1), r, t.angle);
		}
	}, mb = (e, t) => {
		let n = u(e.x + e.width / 2, e.y + e.height / 2), r = T(t, n, -e.angle);
		return r[0] < e.x && r[1] < e.y ? r[1] - e.y > -me ? T(u(e.x - me, e.y), n, e.angle) : T(u(e.x, e.y - me), n, e.angle) : r[0] < e.x && r[1] > e.y + e.height ? r[0] - e.x > -me ? T(u(e.x, e.y + e.height + me), n, e.angle) : T(u(e.x - me, e.y + e.height), n, e.angle) : r[0] > e.x + e.width && r[1] > e.y + e.height ? r[0] - e.x < e.width + me ? T(u(e.x + e.width, e.y + e.height + me), n, e.angle) : T(u(e.x + e.width + me, e.y + e.height), n, e.angle) : r[0] > e.x + e.width && r[1] < e.y ? r[0] - e.x < e.width + me ? T(u(e.x + e.width, e.y - me), n, e.angle) : T(u(e.x + e.width + me, e.y), n, e.angle) : t;
	}, s2 = (e, t, n = .05) => {
		let { x: r, y: o, width: i, height: a, angle: s } = e, d = u(r + i / 2 - .1, o + a / 2 - .1), c = T(t, d, -s), l = se(n * a, 5, 80), U = se(n * i, 5, 80);
		return c[0] <= r + i / 2 && c[1] > d[1] - l && c[1] < d[1] + l ? T(u(r - me, d[1]), d, s) : c[1] <= o + a / 2 && c[0] > d[0] - U && c[0] < d[0] + U ? T(u(d[0], o - me), d, s) : c[0] >= r + i / 2 && c[1] > d[1] - l && c[1] < d[1] + l ? T(u(r + i + me, d[1]), d, s) : c[1] >= o + a / 2 && c[0] > d[0] - U && c[0] < d[0] + U ? T(u(d[0], o + a + me), d, s) : t;
	}, bb = (e, t, n, r, o) => {
		if (n == null || n.elementId !== r.id && e.points.length > 2) return null;
		let i = t === "startBinding" ? -1 : 1, a = i === -1 ? 0 : e.points.length - 1;
		if (X(e) && vn(n)) {
			let U = Yr(n.fixedPoint) ?? d2(e, r, t === "startBinding" ? "start" : "end", o).fixedPoint, p = u(r.x + r.width / 2, r.y + r.height / 2), b = T(u(r.x + U[0] * r.width, r.y + U[1] * r.height), p, r.angle);
			return z.pointFromAbsoluteCoords(e, b, o);
		}
		let s = a - i, d = z.getPointAtIndexGlobalCoordinates(e, s, o), c = gb(r, n.focus, d), l;
		if (n.gap === 0) l = c;
		else {
			let U = z.getPointAtIndexGlobalCoordinates(e, a, o), p = u(r.x + r.width / 2, r.y + r.height / 2), m = ie(d, U) + ie(d, p) + Math.max(r.width, r.height) * 2, b = Ea(r, A(d, q(ue(Je(O(c, d)), m), d)), n.gap).sort((E, g) => Xn(E, d) - Xn(g, d));
			b.length > 1 ? l = b[0] : b.length === 1 ? l = c : l = U;
		}
		return z.pointFromAbsoluteCoords(e, l, o);
	}, d2 = (e, t, n, r) => {
		let o = [
			t.x,
			t.y,
			t.x + t.width,
			t.y + t.height
		], s = T(fi(e, t, n), u(o[0] + (o[2] - o[0]) / 2, o[1] + (o[3] - o[1]) / 2), -t.angle);
		return { fixedPoint: Yr([(s[0] - t.x) / t.width, (s[1] - t.y) / t.height]) };
	}, j1 = (e, t, n) => {
		if (t == null || n == null) return t;
		let { width: r, height: o } = n, { width: i, height: a } = e, s = Math.max(1, Math.min(pi(e, r, o), t.gap * (r < o ? r / i : o / a)));
		return {
			...t,
			gap: s
		};
	}, ir = (e, t, n, r, o) => Bn(c2(e, t, n), r, n, o, X(e), X(e)), c2 = (e, t, n) => {
		let r = t === "start" ? 0 : -1;
		return un(z.getPointAtIndexGlobalCoordinates(e, r, n));
	}, AN = (e, t, n, r) => {
		let o = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Set(), a = r === "duplicatesServeAsOld", s = new Map([...n].map(([d, c]) => [c, d]));
		t.forEach((d) => {
			let { boundElements: c } = d;
			if (c != null && c.length > 0 && (c.forEach((l) => {
				a && !n.has(l.id) && o.add(l.id);
			}), i.add(n.get(d.id))), Pr(d)) {
				if (d.startBinding != null) {
					let { elementId: l } = d.startBinding;
					a && !n.has(l) && i.add(l);
				}
				if (d.endBinding != null) {
					let { elementId: l } = d.endBinding;
					a && !n.has(l) && i.add(l);
				}
				(d.startBinding != null || d.endBinding != null) && o.add(n.get(d.id));
			}
		}), e.filter(({ id: d }) => o.has(d)).forEach((d) => {
			let { startBinding: c, endBinding: l } = d;
			Y(d, {
				startBinding: e2(c, n),
				endBinding: e2(l, n)
			});
		}), e.filter(({ id: d }) => i.has(d)).forEach((d) => {
			let c = s.get(d.id), l = e.find(({ id: U }) => U === c)?.boundElements;
			l && l.length > 0 && Y(d, { boundElements: l.map((U) => n.has(U.id) ? {
				id: n.get(U.id),
				type: U.type
			} : U) });
		});
	}, e2 = (e, t) => e == null ? null : {
		...e,
		elementId: t.get(e.elementId) ?? e.elementId
	}, KN = (e, t) => {
		let n = te(e);
		for (let r of t) rn.unbindAffected(n, r, Y), on.unbindAffected(n, r, Y);
	}, Jr = (e, t, n = []) => {
		if (!e) return null;
		let r = e.filter((o) => !t.has(o.id));
		return r.push(...n.map((o) => ({
			id: o.id,
			type: o.type
		}))), r;
	}, si = (e, { x: t, y: n }, r, o, i) => {
		let a = pi(e, e.width, e.height, o), s = ti(e, r);
		return _r(u(t, n), s, a) || i === !0 && gn(u(t, n), wt(e));
	}, pi = (e, t, n, r) => {
		let o = r?.value && r.value < 1 ? r.value : 1, a = (e.type === "diamond" ? 1 / Math.sqrt(2) : 1) * Math.min(t, n);
		return Math.max(16, Math.min(.25 * a, 32), 10 / o + 4);
	}, Eb = (e, t, n) => {
		let r = u(e.x + e.width / 2, e.y + e.height / 2);
		if (_e(t, n)) return 0;
		let o = T(t, r, -e.angle), i = T(n, r, -e.angle), a = Math.sign(Me(O(i, t), O(i, r))) * -1, s = A(i, q(ue(Je(O(i, o)), Math.max(e.width * 2, e.height * 2)), i)), d = e.type === "diamond" ? [A(u(e.x + e.width / 2, e.y), u(e.x + e.width / 2, e.y + e.height)), A(u(e.x, e.y + e.height / 2), u(e.x + e.width, e.y + e.height / 2))] : [A(u(e.x, e.y), u(e.x + e.width, e.y + e.height)), A(u(e.x + e.width, e.y), u(e.x, e.y + e.height))], c = e.type === "diamond" ? [A(u(e.x + e.width / 2, e.y - e.height), u(e.x + e.width / 2, e.y + e.height * 2)), A(u(e.x - e.width, e.y + e.height / 2), u(e.x + e.width * 2, e.y + e.height / 2))] : [A(u(e.x - e.width, e.y - e.height), u(e.x + e.width * 2, e.y + e.height * 2)), A(u(e.x + e.width * 2, e.y - e.height), u(e.x - e.width, e.y + e.height * 2))];
		return [pn(s, c[0]), pn(s, c[1])].filter((p) => p !== null).sort((p, m) => Xn(p, n) - Xn(m, n)).map((p, m) => a * ie(r, p) / (e.type === "diamond" ? ie(d[m][0], d[m][1]) / 2 : Math.sqrt(e.width ** 2 + e.height ** 2) / 2)).sort((p, m) => Math.abs(p) - Math.abs(m))[0] ?? 0;
	}, gb = (e, t, n) => {
		let r = u(e.x + e.width / 2, e.y + e.height / 2);
		if (t === 0) return r;
		let o = (e.type === "diamond" ? [
			u(e.x, e.y + e.height / 2),
			u(e.x + e.width / 2, e.y),
			u(e.x + e.width, e.y + e.height / 2),
			u(e.x + e.width / 2, e.y + e.height)
		] : [
			u(e.x, e.y),
			u(e.x + e.width, e.y),
			u(e.x + e.width, e.y + e.height),
			u(e.x, e.y + e.height)
		]).map((s) => q(ue(O(s, r), Math.abs(t)), r)).map((s) => T(s, r, e.angle)), i = [
			Me(O(n, o[0]), O(o[1], o[0])) > 0 && (t > 0 ? Me(O(n, o[1]), O(o[2], o[1])) < 0 : Me(O(n, o[3]), O(o[0], o[3])) < 0),
			Me(O(n, o[1]), O(o[2], o[1])) > 0 && (t > 0 ? Me(O(n, o[2]), O(o[3], o[2])) < 0 : Me(O(n, o[0]), O(o[1], o[0])) < 0),
			Me(O(n, o[2]), O(o[3], o[2])) > 0 && (t > 0 ? Me(O(n, o[3]), O(o[0], o[3])) < 0 : Me(O(n, o[1]), O(o[2], o[1])) < 0),
			Me(O(n, o[3]), O(o[0], o[3])) > 0 && (t > 0 ? Me(O(n, o[0]), O(o[1], o[0])) < 0 : Me(O(n, o[2]), O(o[3], o[2])) < 0)
		];
		return i[0] ? t > 0 ? o[1] : o[0] : i[1] ? t > 0 ? o[2] : o[1] : i[2] ? t > 0 ? o[3] : o[2] : t > 0 ? o[0] : o[3];
	}, l2 = new Set([
		"boundElements",
		"frameId",
		"containerId",
		"startBinding",
		"endBinding"
	]), ci = (e, t, n) => {
		xt(t) && (t.boundElements?.slice() ?? []).forEach(({ id: o }) => {
			n(e.get(o), "boundElements", o);
		});
	}, li = (e, t, n) => {
		let r = [];
		if (t.frameId) {
			let o = t.frameId;
			r.push(n(e.get(o), "frameId", o));
		}
		if (Ne(t)) {
			let o = t.containerId;
			r.push(n(e.get(o), "containerId", o));
		}
		if (ee(t)) {
			if (t.startBinding) {
				let o = t.startBinding.elementId;
				r.push(n(e.get(o), "startBinding", o));
			}
			if (t.endBinding) {
				let o = t.endBinding.elementId;
				r.push(n(e.get(o), "endBinding", o));
			}
		}
		return r;
	}, rn = class {
		static unbindAffected(t, n, r) {
			n && li(t, n, (o) => {
				!o || o.isDeleted || ci(t, o, (i, a, s) => {
					s === n.id && r(o, { boundElements: Jr(o.boundElements, new Set([s])) });
				});
			});
		}
	};
	i$1(rn, "rebindAffected", (t, n, r) => {
		!n || n.isDeleted || li(t, n, (o, i) => {
			if (!o || o.isDeleted) {
				r(n, { [i]: null });
				return;
			}
			i !== "frameId" && (o.boundElements?.find((a) => a.id === n.id) || (ee(n) && r(o, { boundElements: Jr(o.boundElements, /* @__PURE__ */ new Set(), new Array(n)) }), k(n) && (o.boundElements?.find((a) => a.type === "text") ? r(n, { [i]: null }) : r(o, { boundElements: Jr(o.boundElements, /* @__PURE__ */ new Set(), new Array(n)) }))));
		});
	});
	on = class {
		static unbindAffected(t, n, r) {
			n && ci(t, n, (o) => {
				!o || o.isDeleted || li(t, o, (i, a, s) => {
					s === n.id && r(o, { [a]: null });
				});
			});
		}
	};
	i$1(on, "rebindAffected", (t, n, r) => {
		!n || n.isDeleted || ci(t, n, (o, i, a) => {
			if (!o || o.isDeleted) {
				r(n, { boundElements: Jr(n.boundElements, new Set([a])) });
				return;
			}
			k(o) && ((n.boundElements?.slice() ?? []).reverse().find((d) => d.type === "text")?.id === o.id ? o.containerId !== n.id && r(o, { containerId: n.id }) : (o.containerId !== null && r(o, { containerId: null }), r(n, { boundElements: Jr(n.boundElements, new Set([o.id])) })));
		});
	});
	Ui = (e, t) => {
		let [n, r] = Yr(e);
		return T(u(t.x + t.width * n, t.y + t.height * r), u(t.x + t.width / 2, t.y + t.height / 2), t.angle);
	}, xb = (e, t) => {
		let n = e.startBinding && t.get(e.startBinding.elementId), r = e.endBinding && t.get(e.endBinding.elementId);
		return [n && e.startBinding ? Ui(e.startBinding.fixedPoint, n) : u(e.x + e.points[0][0], e.y + e.points[0][1]), r && e.endBinding ? Ui(e.endBinding.fixedPoint, r) : u(e.x + e.points[e.points.length - 1][0], e.y + e.points[e.points.length - 1][1])];
	}, U2 = (e, t) => {
		let [n, r] = xb(e, t);
		return [z.pointFromAbsoluteCoords(e, n, t), z.pointFromAbsoluteCoords(e, r, t)];
	}, Yr = (e) => e && (Math.abs(e[0] - .5) < 1e-4 || Math.abs(e[1] - .5) < 1e-4) ? e.map((t) => Math.abs(t - .5) < 1e-4 ? .5001 : t) : e;
	hb = (e, t) => {
		let [n, r, o, i] = t, { x: a, y: s } = ta({
			sceneX: n,
			sceneY: r
		}, e), { x: d, y: c } = ta({
			sceneX: o,
			sceneY: i
		}, e);
		return d - a > e.width || c - s > e.height;
	}, yb = ({ scenePoint: e, viewportDimensions: t, zoom: n, offsets: r }) => {
		let o = (t.width - (r?.right ?? 0)) / 2 / n.value - e.x;
		o += (r?.left ?? 0) / 2 / n.value;
		let i = (t.height - (r?.bottom ?? 0)) / 2 / n.value - e.y;
		return i += (r?.top ?? 0) / 2 / n.value, {
			scrollX: o,
			scrollY: i
		};
	}, _a = (e, t) => {
		if (e = f2(e), !e.length) return {
			scrollX: 0,
			scrollY: 0
		};
		let [n, r, o, i] = $e(e);
		hb(t, [
			n,
			r,
			o,
			i
		]) && ([n, r, o, i] = Pa(e, Dn({
			clientX: t.scrollX,
			clientY: t.scrollY
		}, t)));
		return yb({
			scenePoint: {
				x: (n + o) / 2,
				y: (r + i) / 2
			},
			viewportDimensions: {
				width: t.width,
				height: t.height
			},
			zoom: t.zoom
		});
	};
	Oa = (e) => se(To(e, 6), Js, 30), Aa = (e) => se(Math.round(e), 1, 100), Ka = (e) => se(Math.round(e), 1, 100);
	Tb = (e, t, n) => {
		let r = n.reduce((o, i) => (i.groupIds.includes(e) && (o[i.id] = !0), o), {});
		return Object.keys(r).length < 2 ? t.selectedGroupIds[e] || t.editingGroupId === e ? {
			selectedElementIds: t.selectedElementIds,
			selectedGroupIds: {
				...t.selectedGroupIds,
				[e]: !1
			},
			editingGroupId: null
		} : t : {
			editingGroupId: t.editingGroupId,
			selectedGroupIds: {
				...t.selectedGroupIds,
				[e]: !0
			},
			selectedElementIds: {
				...t.selectedElementIds,
				...r
			}
		};
	}, aF = function() {
		let e = null, t = null, n = null, r = (i, a, s, d) => {
			if (n !== void 0 && a === t && i === e && s.editingGroupId === n?.editingGroupId) return n;
			let c = {};
			for (let p of i) {
				let m = p.groupIds;
				if (s.editingGroupId) {
					let b = m.indexOf(s.editingGroupId);
					b > -1 && (m = m.slice(0, b));
				}
				if (m.length > 0) {
					let b = m[m.length - 1];
					c[b] = !0;
				}
			}
			let l = {}, U = a.reduce((p, m) => {
				if (m.isDeleted) return p;
				let b = m.groupIds.find((E) => c[E]);
				return b && (p[m.id] = !0, Array.isArray(l[b]) ? l[b].push(m.id) : l[b] = [m.id]), p;
			}, {});
			for (let p of Object.keys(l)) l[p].length < 2 && c[p] && (c[p] = !1);
			return t = a, e = i, n = {
				editingGroupId: s.editingGroupId,
				selectedGroupIds: c,
				selectedElementIds: Ha({
					...s.selectedElementIds,
					...U
				}, d)
			}, n;
		}, o = (i, a, s, d) => {
			let c = d ? d.scene.getSelectedElements({
				selectedElementIds: i.selectedElementIds,
				elements: a
			}) : at(a, i);
			return c.length ? r(c, a, i, s) : {
				selectedGroupIds: {},
				editingGroupId: null,
				selectedElementIds: Ha(i.selectedElementIds, s)
			};
		};
		return o.clearCache = () => {
			t = null, e = null, n = null;
		}, o;
	}(), sF = (e, t) => Mb(e, t) != null, Mb = (e, t) => t.groupIds.filter((n) => n !== e.editingGroupId).find((n) => e.selectedGroupIds[n]), dF = (e) => Object.entries(e.selectedGroupIds).filter(([t, n]) => n).map(([t, n]) => t), p2 = (e, t) => {
		let n = {
			...t,
			selectedGroupIds: {}
		};
		for (let r of e) {
			let o = r.groupIds;
			if (t.editingGroupId) {
				let i = o.indexOf(t.editingGroupId);
				i > -1 && (o = o.slice(0, i));
			}
			if (o.length > 0) {
				let i = o[o.length - 1];
				n = {
					...n,
					...Tb(i, n, e)
				};
			}
		}
		return n.selectedGroupIds;
	}, cF = (e, t) => ({
		...e,
		editingGroupId: t.groupIds.length ? t.groupIds[0] : null,
		selectedGroupIds: {},
		selectedElementIds: { [t.id]: !0 }
	}), Lb = (e, t) => e.groupIds.includes(t), an = (e, t) => {
		let n = [];
		for (let r of e.values()) Lb(r, t) && n.push(r);
		return n;
	}, lF = (e, t) => e.groupIds.find((n) => t[n]), u2 = (e, t, n) => {
		let r = [...e], o = t ? e.indexOf(t) : -1, i = o > -1 ? o : e.length;
		for (let a = 0; a < i; a++) r[a] = n(r[a]);
		return r;
	}, UF = (e, t, n) => {
		let r = [...e], o = n ? r.indexOf(n) : -1, i = o > -1 ? o : r.length;
		return r.splice(i, 0, t), r;
	}, fF = (e, t) => e.filter((n) => !t[n]), Ja = (e, t) => {
		let n = /* @__PURE__ */ new Map();
		return e.forEach((r) => {
			let o = r.groupIds.length === 0 ? r.id : r.groupIds[r.groupIds.length - 1], i = n.get(o) || [], a = oe(r, t);
			a && i.push(a), n.set(o, [...i, r]);
		}), Array.from(n.values());
	}, m2 = (e) => {
		let t = /* @__PURE__ */ new Set();
		for (let [, n] of e) if (!n.isDeleted) for (let r of n.groupIds ?? []) t.add(r);
		return t;
	}, b2 = (e) => {
		let t = e.flatMap((o) => o.groupIds), n = /* @__PURE__ */ new Map(), r = 0;
		for (let o of t) n.set(o, (n.get(o) ?? 0) + 1), n.get(o) > r && (r = n.get(o));
		return r === e.length;
	}, E2 = (e) => e.groupIds.length > 0;
	Db = 8, g2 = 99999, bi = (e) => Db / e, Qe = class Qe {};
	i$1(Qe, "referenceSnapPoints", null), i$1(Qe, "visibleGaps", null), i$1(Qe, "setReferenceSnapPoints", (t) => {
		Qe.referenceSnapPoints = t;
	}), i$1(Qe, "getReferenceSnapPoints", () => Qe.referenceSnapPoints), i$1(Qe, "setVisibleGaps", (t) => {
		Qe.visibleGaps = t;
	}), i$1(Qe, "getVisibleGaps", () => Qe.visibleGaps), i$1(Qe, "destroy", () => {
		Qe.referenceSnapPoints = null, Qe.visibleGaps = null;
	});
	mi = Qe, Sb = (e) => e.props.gridModeEnabled ?? e.state.gridModeEnabled, sr = ({ event: e, app: t, selectedElements: n }) => e ? t.state.objectsSnapModeEnabled && !e[Q.CTRL_OR_CMD] || !t.state.objectsSnapModeEnabled && e[Q.CTRL_OR_CMD] && !Sb(t) : n.length === 1 && n[0].type === "arrow" ? !1 : t.state.objectsSnapModeEnabled, vb = (e, t, n = .01) => Math.abs(e - t) <= n, Cr = (e, t, { omitCenter: n, boundingBoxCorners: r, dragOffset: o } = {
		omitCenter: !1,
		boundingBoxCorners: !1
	}) => {
		let i = [];
		if (e.length === 1) {
			let a = e[0], [s, d, c, l, U, p] = C(a, t);
			o && (s += o.x, c += o.x, U += o.x, d += o.y, l += o.y, p += o.y);
			let m = (c - s) / 2, b = (l - d) / 2;
			if ((a.type === "diamond" || a.type === "ellipse") && !r) {
				let E = T(u(s, d + b), u(U, p), a.angle), g = T(u(s + m, d), u(U, p), a.angle), h = T(u(c, d + b), u(U, p), a.angle), x = T(u(s + m, l), u(U, p), a.angle), y = u(U, p);
				i = n ? [
					E,
					g,
					h,
					x
				] : [
					E,
					g,
					h,
					x,
					y
				];
			} else {
				let E = T(u(s, d), u(U, p), a.angle), g = T(u(c, d), u(U, p), a.angle), h = T(u(s, l), u(U, p), a.angle), x = T(u(c, l), u(U, p), a.angle), y = u(U, p);
				i = n ? [
					E,
					g,
					h,
					x
				] : [
					E,
					g,
					h,
					x,
					y
				];
			}
		} else if (e.length > 1) {
			let [a, s, d, c] = ai(e, o ?? {
				x: 0,
				y: 0
			}), l = d - a, U = c - s, p = u(a, s), m = u(d, s), b = u(a, c), E = u(d, c), g = u(a + l / 2, s + U / 2);
			i = n ? [
				p,
				m,
				b,
				E
			] : [
				p,
				m,
				b,
				E,
				g
			];
		}
		return i.map((a) => u(Te(a[0]), Te(a[1])));
	}, y2 = (e, t, n, r) => {
		let o = t.filter((i) => de(i)).map((i) => i.id);
		return Ca(e, t, n, r).filter((i) => !(i.frameId && o.includes(i.frameId)));
	}, IF = (e, t, n, r) => {
		let i = Ja(y2(e, t, n, r), r).filter((U) => !(U.length === 1 && Ne(U[0]))).map((U) => $e(U).map((p) => Te(p))), a = i.sort((U, p) => U[0] - p[0]), s = [], d = 0;
		e: for (let U = 0; U < a.length; U++) {
			let p = a[U];
			for (let m = U + 1; m < a.length; m++) {
				if (++d > g2) break e;
				let b = a[m], [, E, g, h] = p, [x, y, , w] = b;
				g < x && Lr(Oe(E, h), Oe(y, w)) && s.push({
					startBounds: p,
					endBounds: b,
					startSide: [u(g, E), u(g, h)],
					endSide: [u(x, y), u(x, w)],
					length: x - g,
					overlap: Dr(Oe(E, h), Oe(y, w))
				});
			}
		}
		let c = i.sort((U, p) => U[1] - p[1]), l = [];
		d = 0;
		e: for (let U = 0; U < c.length; U++) {
			let p = c[U];
			for (let m = U + 1; m < c.length; m++) {
				if (++d > g2) break e;
				let b = c[m], [E, , g, h] = p, [x, y, w] = b;
				h < y && Lr(Oe(E, g), Oe(x, w)) && l.push({
					startBounds: p,
					endBounds: b,
					startSide: [u(E, h), u(g, h)],
					endSide: [u(x, y), u(w, y)],
					length: y - h,
					overlap: Dr(Oe(E, g), Oe(x, w))
				});
			}
		}
		return {
			horizontalGaps: s,
			verticalGaps: l
		};
	}, x2 = (e, t, n, r, o, i, a) => {
		if (!sr({
			app: n,
			event: r,
			selectedElements: e
		})) return [];
		if (e.length === 0) return [];
		let s = mi.getVisibleGaps();
		if (s) {
			let { horizontalGaps: d, verticalGaps: c } = s, [l, U, p, m] = ai(e, t).map((g) => Te(g)), b = (l + p) / 2, E = (U + m) / 2;
			for (let g of d) {
				if (!Lr(Oe(U, m), g.overlap)) continue;
				let x = Te(g.startSide[0][0] + g.length / 2 - b);
				if (g.length > p - l && Math.abs(x) <= a.x) {
					Math.abs(x) < a.x && (o.length = 0), a.x = Math.abs(x);
					let N = {
						type: "gap",
						direction: "center_horizontal",
						gap: g,
						offset: x
					};
					o.push(N);
					continue;
				}
				let [, , w] = g.endBounds, I = l - w, S = Te(g.length - I);
				if (Math.abs(S) <= a.x) {
					Math.abs(S) < a.x && (o.length = 0), a.x = Math.abs(S);
					let N = {
						type: "gap",
						direction: "side_right",
						gap: g,
						offset: S
					};
					o.push(N);
					continue;
				}
				let [v, , ,] = g.startBounds, $ = Te(v - p - g.length);
				if (Math.abs($) <= a.x) {
					Math.abs($) < a.x && (o.length = 0), a.x = Math.abs($);
					let N = {
						type: "gap",
						direction: "side_left",
						gap: g,
						offset: $
					};
					o.push(N);
					continue;
				}
			}
			for (let g of c) {
				if (!Lr(Oe(l, p), g.overlap)) continue;
				let x = Te(g.startSide[0][1] + g.length / 2 - E);
				if (g.length > m - U && Math.abs(x) <= a.y) {
					Math.abs(x) < a.y && (i.length = 0), a.y = Math.abs(x);
					let N = {
						type: "gap",
						direction: "center_vertical",
						gap: g,
						offset: x
					};
					i.push(N);
					continue;
				}
				let [, w, ,] = g.startBounds, S = Te(w - m - g.length);
				if (Math.abs(S) <= a.y) {
					Math.abs(S) < a.y && (i.length = 0), a.y = Math.abs(S);
					let N = {
						type: "gap",
						direction: "side_top",
						gap: g,
						offset: S
					};
					i.push(N);
					continue;
				}
				let [, , , v] = g.endBounds, D = Te(U - v), $ = g.length - D;
				if (Math.abs($) <= a.y) {
					Math.abs($) < a.y && (i.length = 0), a.y = Math.abs($);
					let N = {
						type: "gap",
						direction: "side_bottom",
						gap: g,
						offset: $
					};
					i.push(N);
					continue;
				}
			}
		}
	}, wF = (e, t, n, r) => {
		return Ja(y2(e, t, n, r), r).filter((i) => !(i.length === 1 && Ne(i[0]))).flatMap((i) => Cr(i, r));
	}, ar = (e, t, n, r, o, i, a) => {
		if (!sr({
			app: n,
			event: r,
			selectedElements: e
		}) || e.length === 0 && t.length === 0) return [];
		let s = mi.getReferenceSnapPoints();
		if (s) for (let d of t) for (let c of s) {
			let l = c[0] - d[0], U = c[1] - d[1];
			Math.abs(l) <= a.x && (Math.abs(l) < a.x && (o.length = 0), o.push({
				type: "point",
				points: [d, c],
				offset: l
			}), a.x = Math.abs(l)), Math.abs(U) <= a.y && (Math.abs(U) < a.y && (i.length = 0), i.push({
				type: "point",
				points: [d, c],
				offset: U
			}), a.y = Math.abs(U));
		}
	}, RF = (e, t, n, r, o) => {
		let i = n.state, a = at(e, i);
		if (!sr({
			app: n,
			event: r,
			selectedElements: a
		}) || a.length === 0) return {
			snapOffset: {
				x: 0,
				y: 0
			},
			snapLines: []
		};
		t.x = Te(t.x), t.y = Te(t.y);
		let s = [], d = [], c = bi(i.zoom.value), l = {
			x: c,
			y: c
		};
		ar(a, Cr(a, o, { dragOffset: t }), n, r, s, d, l), x2(a, t, n, r, s, d, l);
		let p = {
			x: s[0]?.offset ?? 0,
			y: d[0]?.offset ?? 0
		};
		l.x = 0, l.y = 0, s.length = 0, d.length = 0;
		let m = {
			x: Te(t.x + p.x),
			y: Te(t.y + p.y)
		};
		ar(a, Cr(a, o, { dragOffset: m }), n, r, s, d, l), x2(a, m, n, r, s, d, l);
		let b = Ya(s, d), E = Pb(a, m, [...s, ...d].filter((g) => g.type === "gap"));
		return {
			snapOffset: p,
			snapLines: [...b, ...E]
		};
	}, Te = (e) => Math.round(e * 10 ** 6) / 10 ** 6, h2 = (e) => {
		let t = /* @__PURE__ */ new Map();
		for (let n of e) {
			let r = n.join(",");
			t.has(r) || t.set(r, n);
		}
		return Array.from(t.values());
	}, Ya = (e, t) => {
		let n = {}, r = {};
		if (e.length > 0) {
			for (let o of e) if (o.type === "point") {
				let i = Te(o.points[0][0]);
				n[i] || (n[i] = []), n[i].push(...o.points.map((a) => u(Te(a[0]), Te(a[1]))));
			}
		}
		if (t.length > 0) {
			for (let o of t) if (o.type === "point") {
				let i = Te(o.points[0][1]);
				r[i] || (r[i] = []), r[i].push(...o.points.map((a) => u(Te(a[0]), Te(a[1]))));
			}
		}
		return Object.entries(n).map(([o, i]) => ({
			type: "points",
			points: h2(i.map((a) => u(Number(o), a[1])).sort((a, s) => a[1] - s[1]))
		})).concat(Object.entries(r).map(([o, i]) => ({
			type: "points",
			points: h2(i.map((a) => u(a[0], Number(o))).sort((a, s) => a[0] - s[0]))
		})));
	}, $b = (e) => {
		let t = /* @__PURE__ */ new Map();
		for (let n of e) {
			let r = n.points.flat().map((o) => [Te(o)]).join(",");
			t.has(r) || t.set(r, n);
		}
		return Array.from(t.values());
	}, Pb = (e, t, n) => {
		let [r, o, i, a] = ai(e, t), s = [];
		for (let d of n) {
			let [c, l, U, p] = d.gap.startBounds, [m, b, E, g] = d.gap.endBounds, h = Dr(Oe(o, a), d.gap.overlap), x = Dr(Oe(r, i), d.gap.overlap);
			switch (d.direction) {
				case "center_horizontal":
					if (h) {
						let y = (h[0] + h[1]) / 2;
						s.push({
							type: "gap",
							direction: "horizontal",
							points: [u(d.gap.startSide[0][0], y), u(r, y)]
						}, {
							type: "gap",
							direction: "horizontal",
							points: [u(i, y), u(d.gap.endSide[0][0], y)]
						});
					}
					break;
				case "center_vertical":
					if (x) {
						let y = (x[0] + x[1]) / 2;
						s.push({
							type: "gap",
							direction: "vertical",
							points: [u(y, d.gap.startSide[0][1]), u(y, o)]
						}, {
							type: "gap",
							direction: "vertical",
							points: [u(y, a), u(y, d.gap.endSide[0][1])]
						});
					}
					break;
				case "side_right":
					if (h) {
						let y = (h[0] + h[1]) / 2;
						s.push({
							type: "gap",
							direction: "horizontal",
							points: [u(U, y), u(m, y)]
						}, {
							type: "gap",
							direction: "horizontal",
							points: [u(E, y), u(r, y)]
						});
					}
					break;
				case "side_left":
					if (h) {
						let y = (h[0] + h[1]) / 2;
						s.push({
							type: "gap",
							direction: "horizontal",
							points: [u(i, y), u(c, y)]
						}, {
							type: "gap",
							direction: "horizontal",
							points: [u(U, y), u(m, y)]
						});
					}
					break;
				case "side_top":
					if (x) {
						let y = (x[0] + x[1]) / 2;
						s.push({
							type: "gap",
							direction: "vertical",
							points: [u(y, a), u(y, l)]
						}, {
							type: "gap",
							direction: "vertical",
							points: [u(y, p), u(y, b)]
						});
					}
					break;
				case "side_bottom":
					if (x) {
						let y = (x[0] + x[1]) / 2;
						s.push({
							type: "gap",
							direction: "vertical",
							points: [u(y, p), u(y, b)]
						}, {
							type: "gap",
							direction: "vertical",
							points: [u(y, g), u(y, o)]
						});
					}
					break;
			}
		}
		return $b(s.map((d) => ({
			...d,
			points: d.points.map((c) => u(Te(c[0]), Te(c[1])))
		})));
	}, TF = (e, t, n, r, o, i) => {
		if (!sr({
			event: r,
			selectedElements: e,
			app: n
		}) || e.length === 0 || e.length === 1 && !vb(e[0].angle, 0)) return {
			snapOffset: {
				x: 0,
				y: 0
			},
			snapLines: []
		};
		let [a, s, d, c] = $e(t);
		i && (i.includes("e") ? d += o.x : i.includes("w") && (a += o.x), i.includes("n") ? s += o.y : i.includes("s") && (c += o.y));
		let l = [];
		if (i) switch (i) {
			case "e":
				l.push(u(d, s), u(d, c));
				break;
			case "w":
				l.push(u(a, s), u(a, c));
				break;
			case "n":
				l.push(u(a, s), u(d, s));
				break;
			case "s":
				l.push(u(a, c), u(d, c));
				break;
			case "ne":
				l.push(u(d, s));
				break;
			case "nw":
				l.push(u(a, s));
				break;
			case "se":
				l.push(u(d, c));
				break;
			case "sw":
				l.push(u(a, c));
				break;
		}
		let U = bi(n.state.zoom.value), p = {
			x: U,
			y: U
		}, m = [], b = [];
		ar(t, l, n, r, m, b, p);
		let E = {
			x: m[0]?.offset ?? 0,
			y: b[0]?.offset ?? 0
		};
		p.x = 0, p.y = 0, m.length = 0, b.length = 0;
		let [g, h, x, y] = $e(e).map((S) => Te(S));
		ar(e, [
			u(g, h),
			u(g, y),
			u(x, h),
			u(x, y)
		], n, r, m, b, p);
		return {
			snapOffset: E,
			snapLines: Ya(m, b)
		};
	}, MF = (e, t, n, r, o, i) => {
		if (!sr({
			event: n,
			selectedElements: [e],
			app: t
		})) return {
			snapOffset: {
				x: 0,
				y: 0
			},
			snapLines: []
		};
		let a = [u(r.x + o.x, r.y + o.y)], s = bi(t.state.zoom.value), d = {
			x: s,
			y: s
		}, c = [], l = [];
		ar([e], a, t, n, c, l, d);
		let U = {
			x: c[0]?.offset ?? 0,
			y: l[0]?.offset ?? 0
		};
		d.x = 0, d.y = 0, c.length = 0, l.length = 0;
		let p = Cr([e], i, {
			boundingBoxCorners: !0,
			omitCenter: !0
		});
		ar([e], p, t, n, c, l, d);
		return {
			snapOffset: U,
			snapLines: Ya(c, l)
		};
	}, LF = (e, t, n, r, o) => {
		if (!sr({
			event: r,
			selectedElements: [],
			app: t
		})) return {
			originOffset: {
				x: 0,
				y: 0
			},
			snapLines: []
		};
		let i = Ca(e, [], t.state, o), a = bi(t.state.zoom.value), s = {
			x: a,
			y: a
		}, d = [], c = [];
		for (let l of i) {
			let U = Cr([l], o);
			for (let p of U) {
				let m = p[0] - n.x;
				Math.abs(m) <= Math.abs(s.x) && (Math.abs(m) < Math.abs(s.x) && (c.length = 0), c.push({
					type: "pointer",
					points: [p, u(p[0], n.y)],
					direction: "vertical"
				}), s.x = m);
				let b = p[1] - n.y;
				Math.abs(b) <= Math.abs(s.y) && (Math.abs(b) < Math.abs(s.y) && (d.length = 0), d.push({
					type: "pointer",
					points: [p, u(n.x, p[1])],
					direction: "horizontal"
				}), s.y = b);
			}
		}
		return {
			originOffset: {
				x: c.length > 0 ? c[0].points[0][0] - n.x : 0,
				y: d.length > 0 ? d[0].points[0][1] - n.y : 0
			},
			snapLines: [...c, ...d]
		};
	}, DF = (e) => e === fn.rectangle || e === fn.ellipse || e === fn.diamond || e === fn.frame || e === fn.magicframe || e === fn.image || e === fn.text, Vr = (e, t, n) => n ? [Math.round(e / n) * n, Math.round(t / n) * n] : [e, t];
	sn = {
		version: null,
		points: [],
		zoom: null
	}, K = class K {
		constructor(t) {
			i$1(this, "elementId");
			i$1(this, "selectedPointsIndices");
			i$1(this, "pointerDownState");
			i$1(this, "isDragging");
			i$1(this, "lastUncommittedPoint");
			i$1(this, "pointerOffset");
			i$1(this, "startBindingElement");
			i$1(this, "endBindingElement");
			i$1(this, "hoverPointIndex");
			i$1(this, "segmentMidPointHoveredCoords");
			i$1(this, "elbowed");
			this.elementId = t.id, _e(t.points[0], u(0, 0)) || console.error("Linear element is not normalized", Error().stack), this.selectedPointsIndices = null, this.lastUncommittedPoint = null, this.isDragging = !1, this.pointerOffset = {
				x: 0,
				y: 0
			}, this.startBindingElement = "keep", this.endBindingElement = "keep", this.pointerDownState = {
				prevSelectedPointsIndices: null,
				lastClickedPoint: -1,
				lastClickedIsEndPoint: !1,
				origin: null,
				segmentMidpoint: {
					value: null,
					index: null,
					added: !1
				}
			}, this.hoverPointIndex = -1, this.segmentMidPointHoveredCoords = null, this.elbowed = X(t) && t.elbowed;
		}
		static getElement(t, n) {
			return n.get(t) || null;
		}
		static handleBoxSelection(t, n, r, o) {
			if (!n.editingLinearElement || !n.selectionElement) return !1;
			let { editingLinearElement: i } = n, { selectedPointsIndices: a, elementId: s } = i, d = K.getElement(s, o);
			if (!d) return !1;
			let [c, l, U, p] = C(n.selectionElement, o), b = K.getPointsGlobalCoordinates(d, o).reduce((E, g, h) => ((g[0] >= c && g[0] <= U && g[1] >= l && g[1] <= p || t.shiftKey && a?.includes(h)) && E.push(h), E), []).filter((E) => !(X(d) && E !== 0 && E !== d.points.length - 1));
			r({ editingLinearElement: {
				...i,
				selectedPointsIndices: b.length ? b : null
			} });
		}
		static handlePointDragging(t, n, r, o, i, a, s) {
			if (!a) return !1;
			let { elementId: d } = a, c = s.getNonDeletedElementsMap(), l = K.getElement(d, c);
			if (!l || X(l) && !a.pointerDownState.lastClickedIsEndPoint && a.pointerDownState.lastClickedPoint !== 0) return !1;
			let U = X(l) ? a.selectedPointsIndices?.reduce((b, E) => E === 0 ? [0, b[1]] : [b[0], l.points.length - 1], [!1, !1]).filter((b) => typeof b == "number") : a.selectedPointsIndices, p = X(l) ? a.pointerDownState.lastClickedPoint > 0 ? l.points.length - 1 : 0 : a.pointerDownState.lastClickedPoint, m = l.points[p];
			if (U && m) {
				if (ga(t) && U.length === 1 && l.points.length > 1) {
					let E = U[0], g = l.points[E === 0 ? 1 : E - 1], [h, x] = K._getShiftLockedDelta(l, c, g, u(r, o), t[Q.CTRL_OR_CMD] ? null : n.getEffectiveGridSize());
					K.movePoints(l, [{
						index: E,
						point: u(h + g[0], x + g[1]),
						isDragging: E === p
					}]);
				} else {
					let E = K.createPointAt(l, c, r - a.pointerOffset.x, o - a.pointerOffset.y, t[Q.CTRL_OR_CMD] ? null : n.getEffectiveGridSize()), g = E[0] - m[0], h = E[1] - m[1];
					K.movePoints(l, U.map((x) => {
						return {
							index: x,
							point: x === p ? K.createPointAt(l, c, r - a.pointerOffset.x, o - a.pointerOffset.y, t[Q.CTRL_OR_CMD] ? null : n.getEffectiveGridSize()) : u(l.points[x][0] + g, l.points[x][1] + h),
							isDragging: x === p
						};
					}));
				}
				if (oe(l, c) && _n(l, c, !1), Pr(l, !1)) {
					let E = [];
					U[0] === 0 && E.push(un(K.getPointGlobalCoordinates(l, l.points[0], c)));
					let h = U[U.length - 1];
					h === l.points.length - 1 && E.push(un(K.getPointGlobalCoordinates(l, l.points[h], c))), E.length && i(l, E);
				}
				return !0;
			}
			return !1;
		}
		static handlePointerUp(t, n, r, o) {
			let i = o.getNonDeletedElementsMap(), a = o.getNonDeletedElements(), { elementId: s, selectedPointsIndices: d, isDragging: c, pointerDownState: l } = n, U = K.getElement(s, i);
			if (!U) return n;
			let p = {};
			if (c && d) {
				for (let m of d) if (m === 0 || m === U.points.length - 1) {
					Kt(U.points, r.zoom.value) && K.movePoints(U, [{
						index: m,
						point: m === 0 ? U.points[U.points.length - 1] : U.points[0]
					}]);
					p[m === 0 ? "startBindingElement" : "endBindingElement"] = Fa(r) ? Bn(un(K.getPointAtIndexGlobalCoordinates(U, m, i)), a, i, r.zoom, X(U), X(U)) : null;
				}
			}
			return {
				...n,
				...p,
				selectedPointsIndices: c || t.shiftKey ? !c && t.shiftKey && l.prevSelectedPointsIndices?.includes(l.lastClickedPoint) ? d && d.filter((m) => m !== l.lastClickedPoint) : d : d?.includes(l.lastClickedPoint) ? [l.lastClickedPoint] : d,
				isDragging: !1,
				pointerOffset: {
					x: 0,
					y: 0
				}
			};
		}
		static isSegmentTooShort(t, n, r, o, i) {
			if (X(t)) return o >= 0 && o < t.points.length ? ie(n, r) * i.value < K.POINT_HANDLE_SIZE / 2 : !1;
			let a = ie(n, r);
			return t.points.length > 2 && t.roundness && (a = $1(t, r)), a * i.value < K.POINT_HANDLE_SIZE * 4;
		}
		static getSegmentMidPoint(t, n, r, o, i) {
			let a = Zt(n, r);
			if (t.points.length > 2 && t.roundness) {
				let s = xa(t, t.points[o]);
				if (s) {
					let d = P1(t, t.points[o], .5);
					a = K.getPointGlobalCoordinates(t, ha(s[0], s[1], s[2], s[3], d), i);
				}
			}
			return a;
		}
		static getSegmentMidPointIndex(t, n, r, o) {
			let i = K.getElement(t.elementId, o);
			if (!i) return -1;
			let a = K.getEditorMidPoints(i, o, n), s = 0;
			for (; s < a.length;) {
				if (K.arePointsEqual(r, a[s])) return s + 1;
				s++;
			}
			return -1;
		}
		static handlePointerDown(t, n, r, o, i, a) {
			let s = n.state, d = a.getNonDeletedElementsMap(), c = a.getNonDeletedElements(), l = {
				didAddPoint: !1,
				hitElement: null,
				linearElementEditor: null
			};
			if (!i) return l;
			let { elementId: U } = i, p = K.getElement(U, d);
			if (!p) return l;
			let m = K.getSegmentMidpointHitCoords(i, o, s, d), b = null;
			if (m) b = K.getSegmentMidPointIndex(i, s, m, d);
			else if (t.altKey && s.editingLinearElement) return i.lastUncommittedPoint ?? (Y(p, { points: [...p.points, K.createPointAt(p, d, o.x, o.y, t[Q.CTRL_OR_CMD] ? null : n.getEffectiveGridSize())] }), l.didAddPoint = !0), r.shouldCaptureIncrement(), l.linearElementEditor = {
				...i,
				pointerDownState: {
					prevSelectedPointsIndices: i.selectedPointsIndices,
					lastClickedPoint: -1,
					lastClickedIsEndPoint: !1,
					origin: {
						x: o.x,
						y: o.y
					},
					segmentMidpoint: {
						value: m,
						index: b,
						added: !1
					}
				},
				selectedPointsIndices: [p.points.length - 1],
				lastUncommittedPoint: null,
				endBindingElement: Bn(o, c, d, n.state.zoom, i.elbowed)
			}, l.didAddPoint = !0, l;
			let E = K.getPointIndexUnderCursor(p, d, s.zoom, o.x, o.y);
			if (E >= 0 || m) l.hitElement = p;
			else {
				let { startBindingElement: D, endBindingElement: $ } = i;
				Fa(s) && Pr(p) && Ba(p, D, $, d, a);
			}
			let [g, h, x, y] = C(p, d), w = (g + x) / 2, I = (h + y) / 2, S = E > -1 && T(u(p.x + p.points[E][0], p.y + p.points[E][1]), u(w, I), p.angle), v = E > -1 || t.shiftKey ? t.shiftKey || i.selectedPointsIndices?.includes(E) ? Nb([...i.selectedPointsIndices || [], E]) : [E] : null;
			return l.linearElementEditor = {
				...i,
				pointerDownState: {
					prevSelectedPointsIndices: i.selectedPointsIndices,
					lastClickedPoint: E,
					lastClickedIsEndPoint: E === p.points.length - 1,
					origin: {
						x: o.x,
						y: o.y
					},
					segmentMidpoint: {
						value: m,
						index: b,
						added: !1
					}
				},
				selectedPointsIndices: v,
				pointerOffset: S ? {
					x: o.x - S[0],
					y: o.y - S[1]
				} : {
					x: 0,
					y: 0
				}
			}, l;
		}
		static arePointsEqual(t, n) {
			return !t && !n ? !0 : !t || !n ? !1 : _e(t, n);
		}
		static handlePointerMove(t, n, r, o, i) {
			let a = o.state;
			if (!a.editingLinearElement) return null;
			let { elementId: s, lastUncommittedPoint: d } = a.editingLinearElement, c = K.getElement(s, i);
			if (!c) return a.editingLinearElement;
			let { points: l } = c, U = l[l.length - 1];
			if (!t.altKey) return U === d && K.deletePoints(c, [l.length - 1]), {
				...a.editingLinearElement,
				lastUncommittedPoint: null
			};
			let p;
			if (ga(t) && l.length >= 2) {
				let m = l[l.length - 2], [b, E] = K._getShiftLockedDelta(c, i, m, u(n, r), t[Q.CTRL_OR_CMD] ? null : o.getEffectiveGridSize());
				p = u(b + m[0], E + m[1]);
			} else p = K.createPointAt(c, i, n - a.editingLinearElement.pointerOffset.x, r - a.editingLinearElement.pointerOffset.y, t[Q.CTRL_OR_CMD] || X(c) ? null : o.getEffectiveGridSize());
			return U === d ? K.movePoints(c, [{
				index: c.points.length - 1,
				point: p
			}]) : K.addPoints(c, [{ point: p }]), {
				...a.editingLinearElement,
				lastUncommittedPoint: c.points[c.points.length - 1]
			};
		}
		static getPointGlobalCoordinates(t, n, r) {
			let [o, i, a, s] = C(t, r), d = (o + a) / 2, c = (i + s) / 2, { x: l, y: U } = t;
			return T(u(l + n[0], U + n[1]), u(d, c), t.angle);
		}
		static getPointsGlobalCoordinates(t, n) {
			let [r, o, i, a] = C(t, n), s = (r + i) / 2, d = (o + a) / 2;
			return t.points.map((c) => {
				let { x: l, y: U } = t;
				return T(u(l + c[0], U + c[1]), u(s, d), t.angle);
			});
		}
		static getPointAtIndexGlobalCoordinates(t, n, r) {
			let o = n < 0 ? t.points.length + n : n, [i, a, s, d] = C(t, r), c = (i + s) / 2, l = (a + d) / 2, U = t.points[o], { x: p, y: m } = t;
			return U ? T(u(p + U[0], m + U[1]), u(c, l), t.angle) : T(u(p, m), u(c, l), t.angle);
		}
		static pointFromAbsoluteCoords(t, n, r) {
			if (X(t)) return u(n[0] - t.x, n[1] - t.y);
			let [o, i, a, s] = C(t, r), d = (o + a) / 2, c = (i + s) / 2, [l, U] = T(u(n[0], n[1]), u(d, c), -t.angle);
			return u(l - t.x, U - t.y);
		}
		static getPointIndexUnderCursor(t, n, r, o, i) {
			let a = K.getPointsGlobalCoordinates(t, n), s = a.length;
			for (; --s > -1;) {
				let d = a[s];
				if (ie(u(o, i), u(d[0], d[1])) * r.value < K.POINT_HANDLE_SIZE + 1) return s;
			}
			return -1;
		}
		static createPointAt(t, n, r, o, i) {
			let a = Vr(r, o, i), [s, d, c, l] = C(t, n), U = (s + c) / 2, p = (d + l) / 2, [m, b] = T(u(a[0], a[1]), u(U, p), -t.angle);
			return u(m - t.x, b - t.y);
		}
		static getNormalizedPoints(t) {
			let { points: n } = t, r = n[0][0], o = n[0][1];
			return {
				points: n.map((i) => u(i[0] - r, i[1] - o)),
				x: t.x + r,
				y: t.y + o
			};
		}
		static normalizePoints(t) {
			Y(t, K.getNormalizedPoints(t));
		}
		static duplicateSelectedPoints(t, n) {
			Ae(t.editingLinearElement, "Not currently editing a linear element");
			let { selectedPointsIndices: r, elementId: o } = t.editingLinearElement, i = K.getElement(o, n);
			Ae(i, "The linear element does not exist in the provided Scene"), Ae(r != null, "There are no selected points to duplicate");
			let { points: a } = i, s = [], d = !1, c = -1;
			if (Y(i, { points: a.reduce((U, p, m) => {
				if (++c, U.push(p), r.includes(m)) {
					let E = a[m + 1];
					E || (d = !0), U.push(E ? u((p[0] + E[0]) / 2, (p[1] + E[1]) / 2) : u(p[0], p[1])), s.push(c + 1), ++c;
				}
				return U;
			}, []) }), d) {
				let U = i.points[i.points.length - 1];
				K.movePoints(i, [{
					index: i.points.length - 1,
					point: u(U[0] + 30, U[1] + 30)
				}]);
			}
			return {
				...t,
				editingLinearElement: {
					...t.editingLinearElement,
					selectedPointsIndices: s
				}
			};
		}
		static deletePoints(t, n) {
			let r = 0, o = 0;
			if (n.includes(0)) {
				let s = t.points.find((d, c) => !n.includes(c));
				s && (r = s[0], o = s[1]);
			}
			let a = t.points.reduce((s, d, c) => (n.includes(c) || s.push(s.length ? u(d[0] - r, d[1] - o) : u(0, 0)), s), []);
			K._updatePoints(t, a, r, o);
		}
		static addPoints(t, n) {
			let i = [...t.points, ...n.map((a) => a.point)];
			K._updatePoints(t, i, 0, 0);
		}
		static movePoints(t, n, r) {
			let { points: o } = t, [i, a] = n.find(({ index: l }) => l === 0)?.point ?? u(0, 0), [s, d] = u(i - o[0][0], a - o[0][1]), c = X(t) ? [n.find((l) => l.index === 0)?.point ?? o[0], n.find((l) => l.index === o.length - 1)?.point ?? o[o.length - 1]] : o.map((l, U) => {
				let p = n.find((m) => m.index === U)?.point ?? l;
				return u(p[0] - s, p[1] - d);
			});
			K._updatePoints(t, c, s, d, r, { isDragging: n.reduce((l, U) => l || U.isDragging === !0, !1) });
		}
		static shouldAddMidpoint(t, n, r, o) {
			let i = K.getElement(t.elementId, o);
			if (i && X(i) || !i) return !1;
			let { segmentMidpoint: a } = t.pointerDownState;
			if (a.added || a.value === null || a.index === null || t.pointerDownState.origin === null) return !1;
			let s = t.pointerDownState.origin, d = ie(u(s.x, s.y), u(n.x, n.y));
			return !(!r.editingLinearElement && d < 10 / r.zoom.value);
		}
		static addMidpoint(t, n, r, o, i) {
			let a = K.getElement(t.elementId, i);
			if (!a) return;
			let { segmentMidpoint: s } = t.pointerDownState, d = {
				pointerDownState: t.pointerDownState,
				selectedPointsIndices: t.selectedPointsIndices
			}, c = K.createPointAt(a, i, n.x, n.y, o && !X(a) ? r.getEffectiveGridSize() : null);
			return Y(a, { points: [
				...a.points.slice(0, s.index),
				c,
				...a.points.slice(s.index)
			] }), d.pointerDownState = {
				...t.pointerDownState,
				segmentMidpoint: {
					...t.pointerDownState.segmentMidpoint,
					added: !0
				},
				lastClickedPoint: s.index
			}, d.selectedPointsIndices = [s.index], d;
		}
		static _updatePoints(t, n, r, o, i, a) {
			if (X(t)) {
				let s = {};
				i?.startBinding !== void 0 && (s.startBinding = i.startBinding !== null && vn(i.startBinding) ? i.startBinding : null), i?.endBinding !== void 0 && (s.endBinding = i.endBinding !== null && vn(i.endBinding) ? i.endBinding : null), s.points = Array.from(n), Y(t, s, !0, { isDragging: a?.isDragging });
			} else {
				let s = $a(t, n), d = $a(t, t.points), c = (s[0] + s[2]) / 2, l = (s[1] + s[3]) / 2, U = (d[0] + d[2]) / 2, p = (d[1] + d[3]) / 2, m = U - c, b = p - l, E = T(u(r, o), u(m, b), t.angle);
				Y(t, {
					...i,
					points: n,
					x: t.x + E[0],
					y: t.y + E[1]
				});
			}
		}
		static _getShiftLockedDelta(t, n, r, o, i) {
			let a = K.getPointGlobalCoordinates(t, r, n);
			if (X(t)) return [o[0] - a[0], o[1] - a[1]];
			let [s, d] = Vr(o[0], o[1], i), { width: c, height: l } = Va(a[0], a[1], s, d);
			return T(u(c, l), u(0, 0), -t.angle);
		}
		static moveFixedSegment(t, n, r, o, i) {
			let a = K.getElement(t.elementId, i);
			if (!a || !X(a)) return t;
			if (n && n > 0 && n < a.points.length) {
				let s = Lt(Ht(O(a.points[n], a.points[n - 1]))), d = (a.fixedSegments ?? []).reduce((p, m) => (p[m.index] = m, p), {});
				d[n] = {
					index: n,
					start: u(s ? a.points[n - 1][0] : r - a.x, s ? o - a.y : a.points[n - 1][1]),
					end: u(s ? a.points[n][0] : r - a.x, s ? o - a.y : a.points[n][1])
				};
				let c = Object.values(d).sort((p, m) => p.index - m.index), l = c.map((p) => p.index).reduce((p, m) => m < n ? p + 1 : p, 0);
				Y(a, { fixedSegments: c });
				let U = u(a.x + (a.fixedSegments[l].start[0] + a.fixedSegments[l].end[0]) / 2, a.y + (a.fixedSegments[l].start[1] + a.fixedSegments[l].end[1]) / 2);
				return {
					...t,
					segmentMidPointHoveredCoords: U,
					pointerDownState: {
						...t.pointerDownState,
						segmentMidpoint: {
							added: !1,
							index: a.fixedSegments[l].index,
							value: U
						}
					}
				};
			}
			return t;
		}
		static deleteFixedSegment(t, n) {
			Y(t, { fixedSegments: t.fixedSegments?.filter((r) => r.index !== n) }), Y(t, {}, !0);
		}
	};
	i$1(K, "POINT_HANDLE_SIZE", 10), i$1(K, "getEditorMidPoints", (t, n, r) => {
		let o = oe(t, n);
		return !X(t) && !r.editingLinearElement && t.points.length > 2 && !o ? [] : (sn.version === t.version && sn.zoom === r.zoom.value || K.updateEditorMidPointsCache(t, n, r), sn.points);
	}), i$1(K, "updateEditorMidPointsCache", (t, n, r) => {
		let o = K.getPointsGlobalCoordinates(t, n), i = 0, a = [];
		for (; i < o.length - 1;) {
			if (K.isSegmentTooShort(t, t.points[i], t.points[i + 1], i, r.zoom)) {
				a.push(null), i++;
				continue;
			}
			let s = K.getSegmentMidPoint(t, o[i], o[i + 1], i + 1, n);
			a.push(s), i++;
		}
		sn.points = a, sn.version = t.version, sn.zoom = r.zoom.value;
	}), i$1(K, "getSegmentMidpointHitCoords", (t, n, r, o) => {
		let { elementId: i } = t, a = K.getElement(i, o);
		if (!a) return null;
		let s = K.getPointIndexUnderCursor(a, o, r.zoom, n.x, n.y);
		if (!X(a) && s >= 0 || K.getPointsGlobalCoordinates(a, o).length >= 3 && !r.editingLinearElement && !X(a)) return null;
		let c = (K.POINT_HANDLE_SIZE + 1) / r.zoom.value, l = t.segmentMidPointHoveredCoords;
		if (l && ie(u(l[0], l[1]), u(n.x, n.y)) <= c) return l;
		let U = 0, p = K.getEditorMidPoints(a, o, r);
		for (; U < p.length;) {
			if (p[U] !== null && ie(p[U], u(n.x, n.y)) <= c) return p[U];
			U++;
		}
		return null;
	}), i$1(K, "getBoundTextElementPosition", (t, n, r) => {
		let o = K.getPointsGlobalCoordinates(t, r);
		o.length < 2 && Y(n, { isDeleted: !0 });
		let i = 0, a = 0;
		if (t.points.length % 2 === 1) {
			let s = Math.floor(t.points.length / 2), d = K.getPointGlobalCoordinates(t, t.points[s], r);
			i = d[0] - n.width / 2, a = d[1] - n.height / 2;
		} else {
			let s = t.points.length / 2 - 1, d = sn.points[s];
			t.points.length === 2 && (d = Zt(o[0], o[1])), (!d || sn.version !== t.version) && (d = K.getSegmentMidPoint(t, o[s], o[s + 1], s + 1, r)), i = d[0] - n.width / 2, a = d[1] - n.height / 2;
		}
		return {
			x: i,
			y: a
		};
	}), i$1(K, "getMinMaxXYWithBoundText", (t, n, r, o) => {
		let [i, a, s, d] = r, c = (i + s) / 2, l = (a + d) / 2, { x: U, y: p } = K.getBoundTextElementPosition(t, o, n), m = U + o.width, b = p + o.height, E = u(c, l), g = T(u(i, a), E, t.angle), h = T(u(s, a), E, t.angle), x = T(u(U, p), E, -t.angle), y = T(u(m, p), E, -t.angle), w = T(u(U, b), E, -t.angle), I = T(u(m, b), E, -t.angle);
		return g[0] < h[0] && g[1] >= h[1] ? (i = Math.min(i, w[0]), s = Math.max(s, Math.max(y[0], I[0])), a = Math.min(a, x[1]), d = Math.max(d, I[1])) : g[0] >= h[0] && g[1] > h[1] ? (i = Math.min(i, I[0]), s = Math.max(s, Math.max(x[0], y[0])), a = Math.min(a, w[1]), d = Math.max(d, y[1])) : g[0] >= h[0] ? (i = Math.min(i, y[0]), s = Math.max(s, w[0]), a = Math.min(a, I[1]), d = Math.max(d, x[1])) : g[1] <= h[1] && (i = Math.min(i, Math.min(y[0], x[0])), s = Math.max(s, I[0]), a = Math.min(a, y[1]), d = Math.max(d, w[1])), [
			i,
			a,
			s,
			d,
			c,
			l
		];
	}), i$1(K, "getElementAbsoluteCoords", (t, n, r = !1) => {
		let o, i, a, s, d;
		if (t.points.length < 2 || !he.get(t)) {
			let { minX: p, minY: m, maxX: b, maxY: E } = t.points.reduce((g, [h, x]) => (g.minY = Math.min(g.minY, x), g.minX = Math.min(g.minX, h), g.maxX = Math.max(g.maxX, h), g.maxY = Math.max(g.maxY, x), g), {
				minX: Infinity,
				minY: Infinity,
				maxX: -Infinity,
				maxY: -Infinity
			});
			i = p + t.x, a = m + t.y, s = b + t.x, d = E + t.y;
		} else {
			let [b, E, g, h] = Hr(It(he.generateElementShape(t, null)[0]));
			i = b + t.x, a = E + t.y, s = g + t.x, d = h + t.y;
		}
		let c = (i + s) / 2, l = (a + d) / 2;
		if (o = [
			i,
			a,
			s,
			d,
			c,
			l
		], !r) return o;
		let U = oe(t, n);
		return U && (o = K.getMinMaxXYWithBoundText(t, n, [
			i,
			a,
			s,
			d
		], U)), o;
	});
	z = K, Nb = (e) => {
		let t = [...new Set(e.filter((n) => n !== null && n !== -1))];
		return t = t.sort((n, r) => n - r), t.length ? t : null;
	};
	qr = {}, I2 = (e, t) => {
		let n = qr[e] || (qr[e] = { height: t });
		return n.height = t, n;
	}, w2 = (e) => {
		qr[e] && delete qr[e];
	}, WF = (e) => qr[e]?.height ?? null;
	Xa = (e, t, n, r = !0) => {
		let o, i = {
			x: e.x,
			y: e.y,
			text: e.text,
			width: e.width,
			height: e.height,
			angle: t?.angle ?? e.angle
		};
		i.text = e.text, (t || !e.autoResize) && (o = t ? Tt(t, e) : e.width, i.text = en(e.originalText, Ee(e), o));
		let a = ht(i.text, Ee(e), e.lineHeight);
		if (e.autoResize && (i.width = a.width), i.height = a.height, t) {
			let s = Ar(t, e), d = Tt(t, e);
			if (!ee(t) && a.height > s) {
				let p = qa(a.height, t.type);
				Y(t, { height: p }, r), I2(t.id, p);
			}
			if (a.width > d) Y(t, { width: qa(a.width, t.type) }, r);
			let { x: l, y: U } = R2(t, {
				...e,
				...i
			}, n);
			i.x = l, i.y = U;
		}
		Y(e, i, r);
	}, dB = (e, t, n) => {
		let r = te(e);
		t.forEach((o) => {
			let i = n.get(o.id), a = Yt(o);
			if (a) {
				let s = n.get(a);
				if (s) {
					let d = r.get(i);
					d && Y(d, { boundElements: (o.boundElements || []).filter((l) => l.id !== s && l.id !== a).concat({
						type: "text",
						id: s
					}) });
					let c = r.get(s);
					c && k(c) && Y(c, { containerId: d ? i : null });
				}
			}
		});
	}, _n = (e, t, n, r = !1) => {
		if (!Yt(e)) return;
		w2(e.id);
		let i = oe(e, t);
		if (i && i.text) {
			if (!e) return;
			let a = i.text, s = i.height, d = i.width, c = Tt(e, i), l = Ar(e, i), U = e.height;
			if (r || n !== "n" && n !== "s") {
				a && (a = en(i.originalText, Ee(i), c));
				let p = ht(a, Ee(i), i.lineHeight);
				s = p.height, d = p.width;
			}
			if (s > l) {
				U = qa(s, e.type);
				let p = U - e.height, m = !ee(e) && (n === "ne" || n === "nw" || n === "n") ? e.y - p : e.y;
				Y(e, {
					height: U,
					y: m
				});
			}
			Y(i, {
				text: a,
				width: d,
				height: s
			}), ee(e) || Y(i, R2(e, i, t));
		}
	}, R2 = (e, t, n) => {
		if (ee(e)) return z.getBoundTextElementPosition(e, t, n);
		let r = Ra(e), o = Ar(e, t), i = Tt(e, t), a, s;
		return t.verticalAlign === kt.TOP ? s = r.y : t.verticalAlign === kt.BOTTOM ? s = r.y + (o - t.height) : s = r.y + (o / 2 - t.height / 2), t.textAlign === Xi.LEFT ? a = r.x : t.textAlign === Xi.RIGHT ? a = r.x + (i - t.width) : a = r.x + (i / 2 - t.width / 2), {
			x: a,
			y: s
		};
	}, Yt = (e) => e?.boundElements?.length && e?.boundElements?.find((t) => t.type === "text")?.id || null, oe = (e, t) => {
		if (!e) return null;
		let n = Yt(e);
		return n && t.get(n) || null;
	}, qe = (e, t) => e && e.containerId && t.get(e.containerId) || null, cB = (e, t, n) => {
		if (!ee(e)) return {
			x: e.x + e.width / 2,
			y: e.y + e.height / 2
		};
		let r = z.getPointsGlobalCoordinates(e, n);
		if (r.length % 2 === 1) {
			let a = Math.floor(e.points.length / 2), s = z.getPointGlobalCoordinates(e, e.points[a], n);
			return {
				x: s[0],
				y: s[1]
			};
		}
		let o = e.points.length / 2 - 1, i = z.getEditorMidPoints(e, n, t)[o];
		return i || (i = z.getSegmentMidPoint(e, r[o], r[o + 1], o + 1, n)), {
			x: i[0],
			y: i[1]
		};
	}, Ra = (e) => {
		let t = 5, n = 5;
		return e.type === "ellipse" && (t += e.width / 2 * (1 - Math.sqrt(2) / 2), n += e.height / 2 * (1 - Math.sqrt(2) / 2)), e.type === "diamond" && (t += e.width / 4, n += e.height / 4), {
			x: e.x + t,
			y: e.y + n
		};
	}, lB = (e, t) => !t || ee(t) ? e.angle : t.angle;
	UB = (e, t) => e.some((n) => {
		if (Ne(n)) return !ee(qe(n, t));
		return !1;
	}), fB = (e, t) => e.some((n) => {
		if (Ne(n)) return !ee(qe(n, t));
		return k(n);
	}), Fb = new Set([
		"rectangle",
		"ellipse",
		"diamond",
		"arrow"
	]), pB = (e) => Fb.has(e.type), qa = (e, t) => {
		e = Math.ceil(e);
		let n = 10;
		return t === "ellipse" ? Math.round((e + n) / Math.sqrt(2) * 2) : t === "arrow" ? e + n * 8 : t === "diamond" ? 2 * (e + n) : e + n;
	}, Tt = (e, t) => {
		let { width: n } = e;
		if (ee(e)) {
			let r = (t?.fontSize ?? 20) * qs;
			return Math.max(Vs * n, r);
		}
		return e.type === "ellipse" ? Math.round(n / 2 * Math.sqrt(2)) - 10 : e.type === "diamond" ? Math.round(n / 2) - 10 : n - 10;
	}, Ar = (e, t) => {
		let { height: n } = e;
		return ee(e) ? n - 80 <= 0 ? t.height : n : e.type === "ellipse" ? Math.round(n / 2 * Math.sqrt(2)) - 10 : e.type === "diamond" ? Math.round(n / 2) - 10 : n - 10;
	}, Bb = (e, t = `

`) => e.reduce((r, o) => (k(o) && r.push(o.text), r), []).join(t);
	dn = (e) => (e = e.trim(), e && (0, import_dist.sanitizeUrl)(kn(e))), gB = (e) => !!(e?.includes(location.origin) || e?.startsWith("/")), T2 = (e) => {
		if (e = dn(e), e.startsWith("/")) return `${location.origin}${e}`;
		try {
			new URL(e);
		} catch {
			return "about:blank";
		}
		return e;
	};
	M2 = [], L2 = (e) => (M2 = M2.concat(e), e);
	S2 = "<svg viewBox=\"0 0 24 24\" stroke-width=\"1\" width=\"28\" height=\"28\" xmlns=\"http://www.w3.org/2000/svg\">", Ob = "<path d=\"M6.164 11.755a5.314 5.314 0 0 1-4.932-5.298 5.314 5.314 0 0 1 5.311-5.311 5.314 5.314 0 0 1 5.307 5.113l8.773 8.773a3.322 3.322 0 0 1 0 4.696l-.895.895a3.322 3.322 0 0 1-4.696 0l-8.868-8.868Z\" style=\"fill:#fff\"/>", v2 = "<path stroke=\"#1b1b1f\" fill=\"#fff\" d=\"m7.868 11.113 7.773 7.774a2.359 2.359 0 0 0 1.667.691 2.368 2.368 0 0 0 2.357-2.358c0-.625-.248-1.225-.69-1.667L11.201 7.78 9.558 9.469l-1.69 1.643v.001Zm10.273 3.606-3.333 3.333m-3.25-6.583 2 2m-7-7 3 3M3.664 3.625l1 1M2.529 6.922l1.407-.144m5.735-2.932-1.118.866M4.285 9.823l.758-1.194m1.863-6.207-.13 1.408\"/>", Ab = `data:${H.svg},${encodeURIComponent(`${S2}${v2}</svg>`)}`, Kb = `data:${H.svg},${encodeURIComponent(`${S2}${Ob}${v2}</svg>`)}`, Hb = (e) => {
		e && (e.style.cursor = "");
	}, Jb = (e, t) => {
		e && (e.style.cursor = t);
	}, Yb = (e, t) => {
		let r = () => {
			let o = t === ke.DARK;
			Ct = document.createElement("canvas"), Ct.theme = t, Ct.height = 20, Ct.width = 20;
			let i = Ct.getContext("2d");
			i.lineWidth = 1, i.beginPath(), i.arc(Ct.width / 2, Ct.height / 2, 5, 0, 2 * Math.PI), i.fillStyle = o ? open_color_default.black : open_color_default.white, i.fill(), i.strokeStyle = o ? open_color_default.white : open_color_default.black, i.stroke(), D2 = Ct.toDataURL(H.svg);
		};
		(!Ct || Ct.theme !== t) && r(), Jb(e, `url(${D2}) ${20 / 2} ${20 / 2}, auto`);
	}, $2 = (e, t) => {
		if (e) if (t.activeTool.type === "selection") Hb(e);
		else if (nd(t)) e.style.cursor = mo.GRAB;
		else if (td(t)) Yb(e, t.theme);
		else if (t.activeTool.type === "laser") {
			let n = t.theme === ke.LIGHT ? Ab : Kb;
			e.style.cursor = `url(${n}), auto`;
		} else ["image", "custom"].includes(t.activeTool.type) ? t.activeTool.type !== "image" && (e.style.cursor = mo.AUTO) : e.style.cursor = mo.CROSSHAIR;
	};
	qb = new Random(Date.now()), Xb = 0, Vt = () => Math.floor(qb.next() * 2 ** 31);
	Dt = () => Ot() ? `id${Xb++}` : nanoid();
	St = (e, { x: t, y: n, strokeColor: r = we.strokeColor, backgroundColor: o = we.backgroundColor, fillStyle: i = we.fillStyle, strokeWidth: a = we.strokeWidth, strokeStyle: s = we.strokeStyle, roughness: d = we.roughness, opacity: c = we.opacity, width: l = 0, height: U = 0, angle: p = 0, groupIds: m = [], frameId: b = null, index: E = null, roundness: g = null, boundElements: h = null, link: x = null, locked: y = we.locked, ...w }) => ((t < -1e6 || t > 1e6 || n < -1e6 || n > 1e6 || l < -1e6 || l > 1e6 || U < -1e6 || U > 1e6) && console.error("New element size or position is too large", {
		x: t,
		y: n,
		width: l,
		height: U,
		points: w.points
	}), {
		id: w.id || Dt(),
		type: e,
		x: t,
		y: n,
		width: l,
		height: U,
		angle: p,
		strokeColor: r,
		backgroundColor: o,
		fillStyle: i,
		strokeWidth: a,
		strokeStyle: s,
		roughness: d,
		opacity: c,
		groupIds: m,
		frameId: b,
		index: E,
		roundness: g,
		seed: w.seed ?? Vt(),
		version: w.version || 1,
		versionNonce: w.versionNonce ?? 0,
		isDeleted: !1,
		boundElements: h,
		updated: zt(),
		link: x,
		locked: y,
		customData: w.customData
	}), Xr = (e) => St(e.type, e), VB = (e) => St("embeddable", e), qB = (e) => ({ ...St("iframe", e) }), XB = (e) => vt({
		...St("frame", e),
		type: "frame",
		name: e?.name || null
	}, {}), GB = (e) => vt({
		...St("magicframe", e),
		type: "magicframe",
		name: e?.name || null
	}, {}), P2 = (e, t) => ({
		x: e.textAlign === "center" ? t.width / 2 : e.textAlign === "right" ? t.width : 0,
		y: e.verticalAlign === "middle" ? t.height / 2 : 0
	}), qt = (e) => {
		let t = e.fontFamily || Ft, n = e.fontSize || 20, r = e.lineHeight || ko(t), o = ia(e.text), i = ht(o, Ee({
			fontFamily: t,
			fontSize: n
		}), r), a = e.textAlign || "left", s = e.verticalAlign || "top", d = P2({
			textAlign: a,
			verticalAlign: s
		}, i);
		return vt({
			...St("text", e),
			text: o,
			fontSize: n,
			fontFamily: t,
			textAlign: a,
			verticalAlign: s,
			x: e.x - d.x,
			y: e.y - d.y,
			width: i.width,
			height: i.height,
			containerId: e.containerId || null,
			originalText: e.originalText ?? o,
			autoResize: e.autoResize ?? !0,
			lineHeight: r
		}, {});
	}, Gb = (e, t, n) => {
		let { width: r, height: o } = ht(n, Ee(e), e.lineHeight);
		e.autoResize || (r = e.width);
		let { textAlign: i, verticalAlign: a } = e, s, d;
		if (i === "center" && a === kt.MIDDLE && !e.containerId && e.autoResize) {
			let c = ht(e.text, Ee(e), e.lineHeight), l = P2(e, {
				width: r - c.width,
				height: o - c.height
			});
			s = e.x - l.x, d = e.y - l.y;
		} else {
			let [c, l, U, p] = C(e, t), [m, b, E, g] = Rt(e, r, o, !1), h = (c - m) / 2, x = (l - b) / 2, y = (U - E) / 2, w = (p - g) / 2;
			[s, d] = kb({
				s: !0,
				e: i === "center" || i === "left",
				w: i === "center" || i === "right"
			}, e.x, e.y, e.angle, h, x, y, w);
		}
		return {
			width: r,
			height: o,
			x: Number.isFinite(s) ? s : e.x,
			y: Number.isFinite(d) ? d : e.y
		};
	}, kb = (e, t, n, r, o, i, a, s) => {
		let d = Math.cos(r), c = Math.sin(r);
		return e.e && e.w ? t += o + a : e.e ? (t += o * (1 + d), n += o * c, t += a * (1 - d), n += a * -c) : e.w && (t += o * (1 - d), n += o * -c, t += a * (1 + d), n += a * c), e.n && e.s ? n += i + s : e.n ? (t += i * c, n += i * (1 - d), t += s * -c, n += s * (1 + d)) : e.s && (t += i * -c, n += i * (1 + d), t += s * c, n += s * (1 - d)), [t, n];
	}, Ga = (e, t, n, r = e.text) => {
		if (e.isDeleted) return;
		(t || !e.autoResize) && (r = en(r, Ee(e), t ? Tt(t, e) : e.width));
		let o = Gb(e, n, r);
		return {
			text: r,
			...o
		};
	}, kB = (e) => ({
		...St(e.type, e),
		points: e.points || [],
		pressures: e.pressures || [],
		simulatePressure: e.simulatePressure,
		lastCommittedPoint: null
	}), On = (e) => ({
		...St(e.type, e),
		points: e.points || [],
		lastCommittedPoint: null,
		startBinding: null,
		endBinding: null,
		startArrowhead: null,
		endArrowhead: null
	}), Zb = (e) => e.elbowed ? {
		...St(e.type, e),
		points: e.points || [],
		lastCommittedPoint: null,
		startBinding: null,
		endBinding: null,
		startArrowhead: e.startArrowhead || null,
		endArrowhead: e.endArrowhead || null,
		elbowed: !0,
		fixedSegments: e.fixedSegments || [],
		startIsSpecial: !1,
		endIsSpecial: !1
	} : {
		...St(e.type, e),
		points: e.points || [],
		lastCommittedPoint: null,
		startBinding: null,
		endBinding: null,
		startArrowhead: e.startArrowhead || null,
		endArrowhead: e.endArrowhead || null,
		elbowed: !1
	}, Wb = (e) => ({
		...St("image", e),
		strokeColor: "transparent",
		status: e.status ?? "pending",
		fileId: e.fileId ?? null,
		scale: e.scale ?? [1, 1],
		crop: e.crop ?? null
	}), gi = (e, t = 0) => {
		if (e == null || typeof e != "object") return e;
		let n = Object.prototype.toString.call(e);
		if (n === "[object Object]") {
			let r = typeof e.constructor == "function" ? Object.create(Object.getPrototypeOf(e)) : {};
			for (let o in e) if (e.hasOwnProperty(o)) {
				if (t === 0 && (o === "shape" || o === "canvas")) continue;
				r[o] = gi(e[o], t + 1);
			}
			return r;
		}
		if (Array.isArray(e)) {
			let r = e.length, o = new Array(r);
			for (; r--;) o[r] = gi(e[r], t + 1);
			return o;
		}
		return c.DEV && n !== "[object Object]" && n !== "[object Array]" && n.startsWith("[object ") && console.warn(`_deepCloneElement: unexpected object type ${n}. This value will not be cloned!`), e;
	}, Gr = (e) => gi(e), N2 = (e, t) => {
		Object.defineProperty(e, Qs, {
			value: t,
			writable: !1,
			enumerable: !1
		});
	}, xi = () => Dt(), zb = (e, t, n, r) => {
		let o = Gr(n);
		return Ot() && N2(o, n.id), o.id = xi(), o.boundElements = null, o.updated = zt(), o.seed = Vt(), o.groupIds = u2(o.groupIds, e, (i) => (t.has(i) || t.set(i, xi()), t.get(i))), r && (o = Object.assign(o, r)), o;
	}, ZB = (e, t) => {
		let n = [], r = te(e), o = /* @__PURE__ */ new Map(), i = (s) => {
			if (o.has(s)) return o.get(s);
			if (r.has(s)) {
				let d = xi();
				return o.set(s, d), d;
			}
			return null;
		}, a = /* @__PURE__ */ new Map();
		for (let s of e) {
			let d = gi(s);
			if (d.id = i(s.id), Ot() && N2(d, s.id), t?.randomizeSeed && (d.seed = Vt(), kr(d)), d.groupIds && (d.groupIds = d.groupIds.map((c) => (a.has(c) || a.set(c, xi()), a.get(c)))), "containerId" in d && d.containerId) d.containerId = i(d.containerId);
			if ("boundElements" in d && d.boundElements && (d.boundElements = d.boundElements.reduce((c, l) => {
				let U = i(l.id);
				return U && c.push({
					...l,
					id: U
				}), c;
			}, [])), "endBinding" in d && d.endBinding) {
				let c = i(d.endBinding.elementId);
				d.endBinding = c ? {
					...d.endBinding,
					elementId: c
				} : null;
			}
			if ("startBinding" in d && d.startBinding) {
				let c = i(d.startBinding.elementId);
				d.startBinding = c ? {
					...d.startBinding,
					elementId: c
				} : null;
			}
			d.frameId && (d.frameId = i(d.frameId)), n.push(d);
		}
		return n;
	};
	Za = (e, { shouldThrow: t = !1, includeBoundTextValidation: n = !1, ignoreLogs: r, reconciliationContext: o }) => {
		let i = [], a = (d) => `${d?.index}:${d?.id}:${d?.type}:${d?.isDeleted}:${d?.version}:${d?.versionNonce}`, s = e.map((d) => d.index);
		for (let [d, c] of s.entries()) {
			let l = s[d - 1], U = s[d + 1];
			if (ka(c, l, U) || i.push(`Fractional indices invariant has been compromised: "${a(e[d - 1])}", "${a(e[d])}", "${a(e[d + 1])}"`), n && bn(e[d])) {
				let p = e[d], m = oe(p, te(e));
				m && m.index <= p.index && i.push(`Fractional indices invariant for bound elements has been compromised: "${a(m)}", "${a(p)}"`);
			}
		}
		if (i.length) {
			let d = new Vo(), c = [];
			if (o && (c.push("Additional reconciliation context:"), c.push(o.localElements.map((l) => a(l))), c.push(o.remoteElements.map((l) => a(l)))), r || console.error(i.join(`

`), d.stack, e.map((l) => a(l)), ...c), t) throw d;
		}
	}, B2 = (e) => e.sort((t, n) => F2(t) && F2(n) ? t.index < n.index ? -1 : t.index > n.index ? 1 : t.id < n.id ? -1 : 1 : 1), Zr = (e, t) => {
		try {
			let r = _2(e, jb(e, t));
			Za(e.map((i) => r.has(i) ? {
				...i,
				...r.get(i)
			} : i), {
				includeBoundTextValidation: !1,
				shouldThrow: !0,
				ignoreLogs: !0
			});
			for (let [i, a] of r) Y(i, a, !1);
		} catch {
			An(e);
		}
		return e;
	}, An = (e) => {
		let n = _2(e, e7(e));
		for (let [r, o] of n) Y(r, o, !1);
		return e;
	}, jb = (e, t) => {
		let n = [], r = 0;
		for (; r < e.length;) if (t.has(e[r].id)) {
			let o = [r - 1, r];
			for (; ++r < e.length && t.has(e[r].id);) o.push(r);
			o.push(r), n.push(o);
		} else r++;
		return n;
	}, e7 = (e) => {
		let t = [], n, r, o = -1, i = 0, a = (c) => {
			let l = e[o] ? e[o].index : void 0, U = e[c - 1]?.index;
			return !l && U || l && U && U > l ? [U, c - 1] : [l, o];
		}, s = (c) => {
			let l = e[i] ? e[i].index : void 0;
			if (l && c < i) return [l, i];
			let U = i;
			for (; ++U < e.length;) {
				let p = e[U]?.index;
				if (!l && p || l && p && p > l) return [p, U];
			}
			return [void 0, U];
		}, d = 0;
		for (; d < e.length;) {
			let c = e[d].index;
			if ([n, o] = a(d), [r, i] = s(d), ka(c, n, r)) d++;
			else {
				let l = [o, d];
				for (; ++d < e.length;) {
					let U = e[d].index, [p, m] = a(d), [b, E] = s(d);
					if (ka(U, p, b)) break;
					[n, o] = [p, m], [r, i] = [b, E], l.push(d);
				}
				l.push(i), t.push(l);
			}
		}
		return t;
	}, ka = (e, t, n) => e ? t && n ? t < e && e < n : !t && n ? e < n : t && !n ? t < e : !!e : !1, _2 = (e, t) => {
		let n = /* @__PURE__ */ new Map();
		for (let r of t) {
			let o = r.shift(), i = r.pop(), a = generateNKeysBetween(e[o]?.index, e[i]?.index, r.length);
			for (let s = 0; s < r.length; s++) {
				let d = e[r[s]];
				n.set(d, { index: a[s] });
			}
		}
		return n;
	}, F2 = (e) => !!e.index;
	Le = class e {
		constructor(t, n) {
			this.deleted = t;
			this.inserted = n;
		}
		static create(t, n, r, o) {
			return new e(r && o !== "inserted" ? r(t) : t, r && o !== "deleted" ? r(n) : n);
		}
		static calculate(t, n, r, o) {
			if (t === n) return e.empty();
			let i = {}, a = {};
			for (let c of this.distinctKeysIterator("full", t, n)) i[c] = t[c], a[c] = n[c];
			let [s, d] = o ? o(i, a) : [i, a];
			return e.create(s, d, r);
		}
		static empty() {
			return new e({}, {});
		}
		static isEmpty(t) {
			return !Object.keys(t.deleted).length && !Object.keys(t.inserted).length;
		}
		static mergeObjects(t, n, r) {
			let o = { ...t };
			for (let i of Object.keys(r)) delete o[i];
			return {
				...o,
				...n
			};
		}
		static mergeArrays(t, n, r, o) {
			return Object.values(e.mergeObjects(_t(t ?? [], o), _t(n ?? [], o), _t(r ?? [], o)));
		}
		static diffObjects(t, n, r, o) {
			if (!(!t[r] && !n[r]) && (typeof t[r] == "object" || typeof n[r] == "object")) {
				let i = t[r] ?? {}, a = n[r] ?? {}, s = e.getLeftDifferences(i, a).reduce((c, l) => (c[l] = o(i[l]), c), {}), d = e.getRightDifferences(i, a).reduce((c, l) => (c[l] = o(a[l]), c), {});
				Object.keys(s).length || Object.keys(d).length ? (Reflect.set(t, r, s), Reflect.set(n, r, d)) : (Reflect.deleteProperty(t, r), Reflect.deleteProperty(n, r));
			}
		}
		static diffArrays(t, n, r, o) {
			if (!(!t[r] && !n[r]) && (Array.isArray(t[r]) || Array.isArray(n[r]))) {
				let i = Array.isArray(t[r]) ? t[r] : [], a = Array.isArray(n[r]) ? n[r] : [], s = _t(e.getLeftDifferences(_t(i, o), _t(a, o))), d = _t(e.getRightDifferences(_t(i, o), _t(a, o)));
				if (Object.keys(s).length || Object.keys(d).length) {
					let c = i.filter((U) => s[o ? o(U) : String(U)]), l = a.filter((U) => d[o ? o(U) : String(U)]);
					Reflect.set(t, r, c), Reflect.set(n, r, l);
				} else Reflect.deleteProperty(t, r), Reflect.deleteProperty(n, r);
			}
		}
		static isLeftDifferent(t, n, r = !1) {
			return !!this.distinctKeysIterator("left", t, n, r).next().value;
		}
		static isRightDifferent(t, n, r = !1) {
			return !!this.distinctKeysIterator("right", t, n, r).next().value;
		}
		static getLeftDifferences(t, n, r = !1) {
			return Array.from(this.distinctKeysIterator("left", t, n, r));
		}
		static getRightDifferences(t, n, r = !1) {
			return Array.from(this.distinctKeysIterator("right", t, n, r));
		}
		static *distinctKeysIterator(t, n, r, o = !1) {
			if (n === r) return;
			let i = [];
			t === "left" ? i = Object.keys(n) : t === "right" ? i = Object.keys(r) : t === "full" ? i = Array.from(new Set([...Object.keys(n), ...Object.keys(r)])) : Sn(t, `Unknown distinctKeysIterator's join param "${t}"`, !0);
			for (let a of i) {
				let s = n[a], d = r[a];
				if (s !== d) {
					if (!o && typeof s == "object" && typeof d == "object" && s !== null && d !== null && Qt(s, d)) continue;
					yield a;
				}
			}
		}
	}, Wr = class e {
		constructor(t) {
			this.delta = t;
		}
		static calculate(t, n) {
			return new e(Le.calculate(t, n, void 0, e.postProcess));
		}
		static empty() {
			return new e(Le.create({}, {}));
		}
		inverse() {
			return new e(Le.create(this.delta.inserted, this.delta.deleted));
		}
		applyTo(t, n) {
			try {
				let { selectedElementIds: r = {}, selectedGroupIds: o = {} } = this.delta.deleted, { selectedElementIds: i = {}, selectedGroupIds: a = {}, selectedLinearElementId: s, editingLinearElementId: d, ...c } = this.delta.inserted, l = Le.mergeObjects(t.selectedElementIds, i, r), U = Le.mergeObjects(t.selectedGroupIds, a, o), p = s && n.has(s) ? new z(n.get(s)) : null, m = d && n.has(d) ? new z(n.get(d)) : null, b = {
					...t,
					...c,
					selectedElementIds: l,
					selectedGroupIds: U,
					selectedLinearElement: typeof s < "u" ? p : t.selectedLinearElement,
					editingLinearElement: typeof d < "u" ? m : t.editingLinearElement
				};
				return [b, this.filterInvisibleChanges(t, b, n)];
			} catch (r) {
				if (console.error("Couldn't apply appstate change", r), c.DEV || c.MODE === je.TEST) throw r;
				return [t, !1];
			}
		}
		isEmpty() {
			return Le.isEmpty(this.delta);
		}
		static postProcess(t, n) {
			try {
				Le.diffObjects(t, n, "selectedElementIds", (r) => !0), Le.diffObjects(t, n, "selectedGroupIds", (r) => r ?? !1);
			} catch (r) {
				if (console.error("Couldn't postprocess appstate change deltas."), c.DEV || c.MODE === je.TEST) throw r;
			} finally {
				return [t, n];
			}
		}
		filterInvisibleChanges(t, n, r) {
			let o = Qr(t), i = Qr(n), a = Le.isRightDifferent(e.stripElementsProps(o), e.stripElementsProps(i)), s = Le.isRightDifferent(e.stripStandaloneProps(o), e.stripStandaloneProps(i));
			if (!a && !s) return !1;
			let d = { value: a };
			if (s) {
				let c = Le.getRightDifferences(e.stripStandaloneProps(o), e.stripStandaloneProps(i)), l = /* @__PURE__ */ new Set();
				(c.includes("editingGroupId") || c.includes("selectedGroupIds")) && (l = m2(r));
				for (let U of c) switch (U) {
					case "selectedElementIds":
						n[U] = e.filterSelectedElements(n[U], r, d);
						break;
					case "selectedGroupIds":
						n[U] = e.filterSelectedGroups(n[U], l, d);
						break;
					case "croppingElementId": {
						let E = n[U], g = E && r.get(E);
						g && !g.isDeleted ? d.value = !0 : n[U] = null;
						break;
					}
					case "editingGroupId":
						let p = n[U];
						p ? l.has(p) ? d.value = !0 : n[U] = null : d.value = !0;
						break;
					case "selectedLinearElementId":
					case "editingLinearElementId":
						let m = e.convertToAppStateKey(U), b = n[m];
						if (!b) d.value = !0;
						else {
							let E = r.get(b.elementId);
							E && !E.isDeleted ? d.value = !0 : n[m] = null;
						}
						break;
					default: Sn(U, `Unknown ObservedElementsAppState's key "${U}"`, !0);
				}
			}
			return d.value;
		}
		static convertToAppStateKey(t) {
			switch (t) {
				case "selectedLinearElementId": return "selectedLinearElement";
				case "editingLinearElementId": return "editingLinearElement";
			}
		}
		static filterSelectedElements(t, n, r) {
			let o = Object.keys(t);
			if (!o.length) return r.value = !0, t;
			let i = { ...t };
			for (let a of o) {
				let s = n.get(a);
				s && !s.isDeleted ? r.value = !0 : delete i[a];
			}
			return i;
		}
		static filterSelectedGroups(t, n, r) {
			if (!Object.keys(t).length) return r.value = !0, t;
			let i = { ...t };
			for (let a of Object.keys(i)) n.has(a) ? r.value = !0 : delete i[a];
			return i;
		}
		static stripElementsProps(t) {
			let { editingGroupId: n, selectedGroupIds: r, selectedElementIds: o, editingLinearElementId: i, selectedLinearElementId: a, croppingElementId: s, ...d } = t;
			return d;
		}
		static stripStandaloneProps(t) {
			let { name: n, viewBackgroundColor: r, ...o } = t;
			return o;
		}
	}, Ue = class Ue {
		constructor(t, n, r) {
			this.added = t;
			this.removed = n;
			this.updated = r;
		}
		static create(t, n, r, o = { shouldRedistribute: !1 }) {
			let i;
			if (o.shouldRedistribute) {
				let a = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Map(), c = [
					...t,
					...n,
					...r
				];
				for (let [l, U] of c) this.satisfiesAddition(U) ? a.set(l, U) : this.satisfiesRemoval(U) ? s.set(l, U) : d.set(l, U);
				i = new Ue(a, s, d);
			} else i = new Ue(t, n, r);
			return (c.DEV || c.MODE === je.TEST) && (Ue.validate(i, "added", this.satisfiesAddition), Ue.validate(i, "removed", this.satisfiesRemoval), Ue.validate(i, "updated", this.satisfiesUpdate)), i;
		}
		static validate(t, n, r) {
			for (let [o, i] of t[n].entries()) if (!r(i)) throw console.error(`Broken invariant for "${n}" delta, element "${o}", delta:`, i), /* @__PURE__ */ new Error(`ElementsChange invariant broken for element "${o}".`);
		}
		static calculate(t, n) {
			if (t === n) return Ue.empty();
			let r = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
			for (let a of t.values()) if (!n.get(a.id)) {
				let d = {
					...a,
					isDeleted: !1
				}, l = Le.create(d, { isDeleted: !0 }, Ue.stripIrrelevantProps);
				o.set(a.id, l);
			}
			for (let a of n.values()) {
				let s = t.get(a.id);
				if (!s) {
					let d = { isDeleted: !0 }, c = {
						...a,
						isDeleted: !1
					}, l = Le.create(d, c, Ue.stripIrrelevantProps);
					r.set(a.id, l);
					continue;
				}
				if (s.versionNonce !== a.versionNonce) {
					let d = Le.calculate(s, a, Ue.stripIrrelevantProps, Ue.postProcess);
					if (typeof s.isDeleted == "boolean" && typeof a.isDeleted == "boolean" && s.isDeleted !== a.isDeleted) {
						s.isDeleted && !a.isDeleted ? r.set(a.id, d) : o.set(a.id, d);
						continue;
					}
					Le.isEmpty(d) || i.set(a.id, d);
				}
			}
			return Ue.create(r, o, i);
		}
		static empty() {
			return Ue.create(/* @__PURE__ */ new Map(), /* @__PURE__ */ new Map(), /* @__PURE__ */ new Map());
		}
		inverse() {
			let t = (i) => {
				let a = /* @__PURE__ */ new Map();
				for (let [s, d] of i.entries()) a.set(s, Le.create(d.inserted, d.deleted));
				return a;
			}, n = t(this.added), r = t(this.removed), o = t(this.updated);
			return Ue.create(r, n, o);
		}
		isEmpty() {
			return this.added.size === 0 && this.removed.size === 0 && this.updated.size === 0;
		}
		applyLatestChanges(t) {
			let n = (s) => (d) => {
				let c = {};
				for (let l of Object.keys(d)) switch (l) {
					case "boundElements":
						c[l] = d[l];
						break;
					default: c[l] = s[l];
				}
				return c;
			}, r = (s) => {
				let d = /* @__PURE__ */ new Map();
				for (let [c, l] of s.entries()) {
					let U = t.get(c);
					if (U) {
						let p = Le.create(l.deleted, l.inserted, n(U), "inserted");
						d.set(c, p);
					} else d.set(c, l);
				}
				return d;
			}, o = r(this.added), i = r(this.removed), a = r(this.updated);
			return Ue.create(o, i, a, { shouldRedistribute: !0 });
		}
		applyTo(t, n) {
			let r = tt(new Map(t)), o, i = {
				containsVisibleDifference: !1,
				containsZindexDifference: !1
			};
			try {
				let a = Ue.createApplier(r, n, i), s = a(this.added), d = a(this.removed), c = a(this.updated), l = this.resolveConflicts(t, r);
				o = new Map([
					...s,
					...d,
					...c,
					...l
				]);
			} catch (a) {
				if (console.error("Couldn't apply elements change", a), c.DEV || c.MODE === je.TEST) throw a;
				return [t, !0];
			}
			try {
				Ue.redrawTextBoundingBoxes(r, o), r = Ue.reorderElements(r, o, i), Ue.redrawBoundArrows(r, o);
			} catch (a) {
				if (console.error("Couldn't mutate elements after applying elements change", a), c.DEV || c.MODE === je.TEST) throw a;
			} finally {
				return [r, i.containsVisibleDifference];
			}
		}
		static applyDelta(t, n, r = {
			containsVisibleDifference: !0,
			containsZindexDifference: !0
		}) {
			let { boundElements: o, ...i } = n.inserted;
			if (n.deleted.boundElements?.length || n.inserted.boundElements?.length) {
				let a = Le.mergeArrays(t.boundElements, n.inserted.boundElements, n.deleted.boundElements, (s) => s.id);
				Object.assign(i, { boundElements: a });
			}
			if (Ye(t)) {
				let a = n;
				(a.deleted.crop || a.inserted.crop) && Object.assign(i, { crop: a.inserted.crop ?? null });
			}
			if (!r.containsVisibleDifference) {
				let { index: a, ...s } = i;
				r.containsVisibleDifference = Ue.checkForVisibleDifference(t, s);
			}
			return r.containsZindexDifference || (r.containsZindexDifference = n.deleted.index !== n.inserted.index), vt(t, i);
		}
		static checkForVisibleDifference(t, n) {
			return t.isDeleted && n.isDeleted !== !1 ? !1 : t.isDeleted && n.isDeleted === !1 || t.isDeleted === !1 && n.isDeleted ? !0 : Le.isRightDifferent(t, n);
		}
		resolveConflicts(t, n) {
			let r = /* @__PURE__ */ new Map(), o = (c, l) => {
				let U = n.get(c.id);
				if (!U) return;
				let p;
				t.get(c.id) === U ? p = vt(U, l) : p = Y(U, l), r.set(p.id, p), n.set(p.id, p);
			};
			for (let [c] of this.removed) Ue.unbindAffected(t, n, c, o);
			for (let [c] of this.added) Ue.rebindAffected(t, n, c, o);
			for (let [c] of Array.from(this.updated).filter(([l, U]) => Object.keys({
				...U.deleted,
				...U.inserted
			}).find((p) => l2.has(p)))) {
				let l = n.get(c);
				!l || l.isDeleted || Ue.rebindAffected(t, n, c, o);
			}
			let i = new Map(Array.from(t).filter(([c]) => r.has(c))), { added: a, removed: s, updated: d } = Ue.calculate(i, r);
			for (let [c, l] of a) this.added.set(c, l);
			for (let [c, l] of s) this.removed.set(c, l);
			for (let [c, l] of d) this.updated.set(c, l);
			return r;
		}
		static unbindAffected(t, n, r, o) {
			let i = () => t.get(r), a = () => n.get(r);
			rn.unbindAffected(n, i(), o), rn.unbindAffected(n, a(), o), on.unbindAffected(n, i(), o), on.unbindAffected(n, a(), o);
		}
		static rebindAffected(t, n, r, o) {
			let i = () => t.get(r), a = () => n.get(r);
			rn.unbindAffected(n, i(), o), rn.rebindAffected(n, a(), o), on.unbindAffected(n, i(), (s, d) => {
				k(s) && o(s, d);
			}), on.rebindAffected(n, a(), o);
		}
		static redrawTextBoundingBoxes(t, n) {
			let r = /* @__PURE__ */ new Map();
			for (let o of n.values()) {
				if (Ne(o)) {
					let { containerId: i } = o, a = i ? t.get(i) : void 0;
					a && r.set(a.id, {
						container: a,
						boundText: o
					});
				}
				if (bn(o)) {
					let i = Yt(o), a = i ? t.get(i) : void 0;
					a && r.set(o.id, {
						container: o,
						boundText: a
					});
				}
			}
			for (let { container: o, boundText: i } of r.values()) o.isDeleted || i.isDeleted || Xa(i, o, t, !1);
		}
		static redrawBoundArrows(t, n) {
			for (let r of n.values()) !r.isDeleted && xt(r) && Jt(r, t, { changedElements: n });
		}
		static reorderElements(t, n, r) {
			if (!r.containsZindexDifference) return t;
			let o = Array.from(t.values()), i = B2([...o]), a = Le.getRightDifferences(o, i, !0).reduce((s, d) => {
				let c = o[Number(d)];
				return c && n.has(c.id) && s.set(c.id, c), s;
			}, /* @__PURE__ */ new Map());
			return !r.containsVisibleDifference && a.size && (r.containsVisibleDifference = !0), te(Zr(i, a));
		}
		static postProcess(t, n) {
			try {
				Le.diffArrays(t, n, "boundElements", (r) => r.id);
			} catch (r) {
				if (console.error("Couldn't postprocess elements change deltas."), c.DEV || c.MODE === je.TEST) throw r;
			} finally {
				return [t, n];
			}
		}
		static stripIrrelevantProps(t) {
			let { id: n, updated: r, version: o, versionNonce: i, seed: a, ...s } = t;
			return s;
		}
	};
	i$1(Ue, "satisfiesAddition", ({ deleted: t, inserted: n }) => t.isDeleted === !0 && !n.isDeleted), i$1(Ue, "satisfiesRemoval", ({ deleted: t, inserted: n }) => !t.isDeleted && n.isDeleted === !0), i$1(Ue, "satisfiesUpdate", ({ deleted: t, inserted: n }) => !!t.isDeleted == !!n.isDeleted), i$1(Ue, "createApplier", (t, n, r) => {
		let o = Ue.createGetter(t, n, r);
		return (i) => Array.from(i.entries()).reduce((a, [s, d]) => {
			let c = o(s, d.inserted);
			if (c) {
				let l = Ue.applyDelta(c, d, r);
				t.set(l.id, l), a.set(l.id, l);
			}
			return a;
		}, /* @__PURE__ */ new Map());
	}), i$1(Ue, "createGetter", (t, n, r) => (o, i) => {
		let a = t.get(o);
		return a || (a = n.get(o), a && (r.containsZindexDifference = !0, (i.isDeleted === !1 || i.isDeleted !== !0 && a.isDeleted === !1) && (r.containsVisibleDifference = !0))), a;
	});
	zr = Ue;
	hi = class {
		constructor() {
			i$1(this, "subscribers", []);
		}
		on(...t) {
			let n = t.flat().filter((r) => typeof r == "function");
			return this.subscribers.push(...n), () => this.off(n);
		}
		once(...t) {
			let n = t.flat().filter((o) => typeof o == "function");
			n.push(() => r());
			let r = this.on(...n);
			return r;
		}
		off(...t) {
			let n = t.flat();
			this.subscribers = this.subscribers.filter((r) => !n.includes(r));
		}
		trigger(...t) {
			for (let n of this.subscribers) n(...t);
			return this;
		}
		clear() {
			this.subscribers = [];
		}
	};
	A2 = "__observedAppState", Qr = (e) => {
		let t = {
			name: e.name,
			editingGroupId: e.editingGroupId,
			viewBackgroundColor: e.viewBackgroundColor,
			selectedElementIds: e.selectedElementIds,
			selectedGroupIds: e.selectedGroupIds,
			editingLinearElementId: e.editingLinearElement?.elementId || null,
			selectedLinearElementId: e.selectedLinearElement?.elementId || null,
			croppingElementId: e.croppingElementId
		};
		return Reflect.defineProperty(t, A2, {
			value: !0,
			enumerable: !1
		}), t;
	}, t7 = (e) => !!Reflect.get(e, A2), dr = {
		IMMEDIATELY: "IMMEDIATELY",
		NEVER: "NEVER",
		EVENTUALLY: "EVENTUALLY"
	}, Wa = class {
		constructor(t, n) {
			this.elementsChange = t;
			this.appStateChange = n;
		}
	}, O2 = class {
		constructor() {
			i$1(this, "onStoreIncrementEmitter", new hi());
			i$1(this, "scheduledActions", /* @__PURE__ */ new Set());
			i$1(this, "_snapshot", yi.empty());
			i$1(this, "shouldCaptureIncrement", () => {
				this.scheduleAction(dr.IMMEDIATELY);
			});
			i$1(this, "shouldUpdateSnapshot", () => {
				this.scheduleAction(dr.NEVER);
			});
			i$1(this, "scheduleAction", (t) => {
				this.scheduledActions.add(t), this.satisfiesScheduledActionsInvariant();
			});
			i$1(this, "commit", (t, n) => {
				try {
					this.scheduledActions.has(dr.IMMEDIATELY) ? this.captureIncrement(t, n) : this.scheduledActions.has(dr.NEVER) && this.updateSnapshot(t, n);
				} finally {
					this.satisfiesScheduledActionsInvariant(), this.scheduledActions = /* @__PURE__ */ new Set();
				}
			});
			i$1(this, "captureIncrement", (t, n) => {
				let r = this.snapshot, o = this.snapshot.maybeClone(t, n);
				if (r !== o) {
					let i = o.meta.didElementsChange ? zr.calculate(r.elements, o.elements) : zr.empty(), a = o.meta.didAppStateChange ? Wr.calculate(r.appState, o.appState) : Wr.empty();
					(!i.isEmpty() || !a.isEmpty()) && this.onStoreIncrementEmitter.trigger(new Wa(i, a)), this.snapshot = o;
				}
			});
			i$1(this, "updateSnapshot", (t, n) => {
				let r = this.snapshot.maybeClone(t, n);
				this.snapshot !== r && (this.snapshot = r);
			});
			i$1(this, "filterUncomittedElements", (t, n) => {
				for (let [r, o] of t.entries()) {
					if (!n.get(r)) continue;
					let a = this.snapshot.elements.get(r);
					a ? a.version < o.version && n.set(r, a) : n.delete(r);
				}
				return n;
			});
			i$1(this, "clear", () => {
				this.snapshot = yi.empty(), this.scheduledActions = /* @__PURE__ */ new Set();
			});
			i$1(this, "satisfiesScheduledActionsInvariant", () => {
				if (!(this.scheduledActions.size >= 0 && this.scheduledActions.size <= 3)) {
					let t = `There can be at most three store actions scheduled at the same time, but there are "${this.scheduledActions.size}".`;
					if (console.error(t, this.scheduledActions.values()), c.DEV || c.MODE === je.TEST) throw new Error(t);
				}
			});
		}
		get snapshot() {
			return this._snapshot;
		}
		set snapshot(t) {
			this._snapshot = t;
		}
	}, yi = class e {
		constructor(t, n, r = {
			didElementsChange: !1,
			didAppStateChange: !1,
			isEmpty: !1
		}) {
			this.elements = t;
			this.appState = n;
			this.meta = r;
		}
		static empty() {
			return new e(/* @__PURE__ */ new Map(), Qr(mt()), {
				didElementsChange: !1,
				didAppStateChange: !1,
				isEmpty: !0
			});
		}
		isEmpty() {
			return this.meta.isEmpty;
		}
		maybeClone(t, n) {
			let r = this.maybeCreateElementsSnapshot(t), o = this.maybeCreateAppStateSnapshot(n), i = !1, a = !1;
			return this.elements !== r && (i = !0), this.appState !== o && (a = !0), !i && !a ? this : new e(r, o, {
				didElementsChange: i,
				didAppStateChange: a
			});
		}
		maybeCreateAppStateSnapshot(t) {
			if (!t) return this.appState;
			let n = t7(t) ? t : Qr(t);
			return this.detectChangedAppState(n) ? n : this.appState;
		}
		detectChangedAppState(t) {
			return !Qt(this.appState, t, {
				selectedElementIds: Qt,
				selectedGroupIds: Qt
			});
		}
		maybeCreateElementsSnapshot(t) {
			return t ? this.detectChangedElements(t) ? this.createElementsSnapshot(t) : this.elements : this.elements;
		}
		detectChangedElements(t) {
			if (this.elements === t) return !1;
			if (this.elements.size !== t.size) return !0;
			let n = Array.from(t.keys());
			for (let r = n.length - 1; r >= 0; r--) {
				let o = this.elements.get(n[r]), i = t.get(n[r]);
				if (!o || !i || o.id !== i.id || o.versionNonce !== i.versionNonce) return !0;
			}
			return !1;
		}
		createElementsSnapshot(t) {
			let n = /* @__PURE__ */ new Map();
			for (let [r, o] of this.elements.entries()) t.get(r) ? n.set(r, o) : n.set(r, vt(o, { isDeleted: !0 }));
			for (let [r, o] of t.entries()) {
				let i = n.get(r);
				(!i || i && i.versionNonce !== o.versionNonce) && n.set(r, Gr(o));
			}
			return n;
		}
	}, Xt = /* @__PURE__ */ new Map(), n7 = /^(?:http(?:s)?:\/\/)?(?:www\.)?youtu(?:be\.com|\.be)\/(embed\/|watch\?v=|shorts\/|playlist\?list=|embed\/videoseries\?list=)?([a-zA-Z0-9_-]+)(?:\?t=|&t=|\?start=|&start=)?([a-zA-Z0-9_-]+)?[^\s]*$/, r7 = /^(?:http(?:s)?:\/\/)?(?:(?:w){3}\.)?(?:player\.)?vimeo\.com\/(?:video\/)?([^?\s]+)(?:\?.*)?$/, o7 = /^https:\/\/(?:www\.)?figma\.com/, K2 = /^https:\/\/gist\.github\.com\/([\w_-]+)\/([\w_-]+)/, i7 = /^<script[\s\S]*?\ssrc=["'](https:\/\/gist\.github\.com\/.*?)\.js["']/i, H2 = /(?:https?:\/\/)?(?:(?:w){3}\.)?(?:twitter|x)\.com\/[^/]+\/status\/(\d+)/, a7 = /^<blockquote[\s\S]*?\shref=["'](https?:\/\/(?:twitter|x)\.com\/[^"']*)/i, s7 = /^https:\/\/(?:www\.)?val\.town\/(v|embed)\/[a-zA-Z_$][0-9a-zA-Z_$]+\.[a-zA-Z_$][0-9a-zA-Z_$]+/, d7 = /^<(?:iframe|blockquote)[\s\S]*?\s(?:src|href)=["']([^"']*)["'][\s\S]*?>$/i, J2 = /giphy.com\/(?:clips|embed|gifs)\/[a-zA-Z0-9]*?-?([a-zA-Z0-9]+)(?:[^a-zA-Z0-9]|$)/, Y2 = /^(?:http(?:s)?:\/\/)?(?:www\.)?reddit\.com\/r\/([a-zA-Z0-9_]+)\/comments\/([a-zA-Z0-9_]+)\/([a-zA-Z0-9_]+)\/?(?:\?[^#\s]*)?(?:#[^\s]*)?$/, c7 = /^<blockquote[\s\S]*?\shref=["'](https?:\/\/(?:www\.)?reddit\.com\/[^"']*)/i, Qa = new Set([
		"youtube.com",
		"youtu.be",
		"vimeo.com",
		"player.vimeo.com",
		"figma.com",
		"link.excalidraw.com",
		"gist.github.com",
		"twitter.com",
		"x.com",
		"*.simplepdf.eu",
		"stackblitz.com",
		"val.town",
		"giphy.com",
		"reddit.com"
	]), C2 = new Set([
		"youtube.com",
		"youtu.be",
		"vimeo.com",
		"player.vimeo.com",
		"figma.com",
		"twitter.com",
		"x.com",
		"*.simplepdf.eu",
		"stackblitz.com",
		"reddit.com"
	]), za = (e) => `<html><body>${e}</body></html>`, V2 = (e) => {
		if (!e) return null;
		if (Xt.has(e)) return Xt.get(e);
		let t = e, n = C2.has(ja(e, C2) || ""), r = "generic", o = {
			w: 560,
			h: 840
		}, i = e.match(n7);
		if (i?.[2]) {
			let c = i[3] ? `&start=${i[3]}` : "", l = e.includes("shorts");
			switch (r = "video", i[1]) {
				case "embed/":
				case "watch?v=":
				case "shorts/":
					e = `https://www.youtube.com/embed/${i[2]}?enablejsapi=1${c}`;
					break;
				case "playlist?list=":
				case "embed/videoseries?list=":
					e = `https://www.youtube.com/embed/videoseries?list=${i[2]}&enablejsapi=1${c}`;
					break;
				default:
					e = `https://www.youtube.com/embed/${i[2]}?enablejsapi=1${c}`;
					break;
			}
			return o = l ? {
				w: 315,
				h: 560
			} : {
				w: 560,
				h: 315
			}, Xt.set(t, {
				link: e,
				intrinsicSize: o,
				type: r,
				sandbox: { allowSameOrigin: n }
			}), {
				link: e,
				intrinsicSize: o,
				type: r,
				sandbox: { allowSameOrigin: n }
			};
		}
		let a = e.match(r7);
		if (a?.[1]) {
			let c = a?.[1], l = /^\d+$/.test(c) ? void 0 : /* @__PURE__ */ new URIError("Invalid embed link format");
			return r = "video", e = `https://player.vimeo.com/video/${c}?api=1`, o = {
				w: 560,
				h: 315
			}, Xt.set(t, {
				link: e,
				intrinsicSize: o,
				type: r,
				sandbox: { allowSameOrigin: n }
			}), {
				link: e,
				intrinsicSize: o,
				type: r,
				error: l,
				sandbox: { allowSameOrigin: n }
			};
		}
		if (e.match(o7)) return r = "generic", e = `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(e)}`, o = {
			w: 550,
			h: 550
		}, Xt.set(t, {
			link: e,
			intrinsicSize: o,
			type: r,
			sandbox: { allowSameOrigin: n }
		}), {
			link: e,
			intrinsicSize: o,
			type: r,
			sandbox: { allowSameOrigin: n }
		};
		let d = e.match(s7);
		if (d) return e = d[1] === "embed" ? d[0] : d[0].replace("/v", "/embed"), Xt.set(t, {
			link: e,
			intrinsicSize: o,
			type: r,
			sandbox: { allowSameOrigin: n }
		}), {
			link: e,
			intrinsicSize: o,
			type: r,
			sandbox: { allowSameOrigin: n }
		};
		if (H2.test(e)) {
			let c = e.match(H2)[1], l = kn(`https://twitter.com/x/status/${c}`), U = {
				type: "document",
				srcdoc: (p) => za(`<blockquote class="twitter-tweet" data-dnt="true" data-theme="${p}"><a href="${l}"></a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"><\/script>`),
				intrinsicSize: {
					w: 480,
					h: 480
				},
				sandbox: { allowSameOrigin: n }
			};
			return Xt.set(t, U), U;
		}
		if (Y2.test(e)) {
			let [, c, l, U] = e.match(Y2), p = kn(`https://reddit.com/r/${c}/comments/${l}/${U}`), m = {
				type: "document",
				srcdoc: (b) => za(`<blockquote class="reddit-embed-bq" data-embed-theme="${b}"><a href="${p}"></a><br></blockquote><script async="" src="https://embed.reddit.com/widgets.js" charset="UTF-8"><\/script>`),
				intrinsicSize: {
					w: 480,
					h: 480
				},
				sandbox: { allowSameOrigin: n }
			};
			return Xt.set(t, m), m;
		}
		if (K2.test(e)) {
			let [, c, l] = e.match(K2), U = kn(`https://gist.github.com/${c}/${l}`), p = {
				type: "document",
				srcdoc: () => za(`
          <script src="${U}.js"><\/script>
          <style type="text/css">
            * { margin: 0px; }
            table, .gist { height: 100%; }
            .gist .gist-file { height: calc(100vh - 2px); padding: 0px; display: grid; grid-template-rows: 1fr auto; }
          </style>
        `),
				intrinsicSize: {
					w: 550,
					h: 720
				},
				sandbox: { allowSameOrigin: n }
			};
			return Xt.set(e, p), p;
		}
		return Xt.set(e, {
			link: e,
			intrinsicSize: o,
			type: r,
			sandbox: { allowSameOrigin: n }
		}), {
			link: e,
			intrinsicSize: o,
			type: r,
			sandbox: { allowSameOrigin: n }
		};
	}, Ii = (e) => {
		let t;
		_o(e) ? t = "IFrame element" : t = !e.link || e?.link === "" ? "Empty Web-Embed" : e.link;
		let n = Math.max(Math.min(e.width / 2, e.width / t.length), e.width / 30), r = Ie.Helvetica, o = Ee({
			fontSize: n,
			fontFamily: r
		});
		return qt({
			x: e.x + e.width / 2,
			y: e.y + e.height / 2,
			strokeColor: e.strokeColor !== "transparent" ? e.strokeColor : "black",
			backgroundColor: "transparent",
			fontFamily: r,
			fontSize: n,
			text: en(t, o, e.width - 20),
			textAlign: "center",
			verticalAlign: kt.MIDDLE,
			angle: e.angle ?? 0
		});
	};
	L2({
		name: "setEmbeddableAsActiveTool",
		trackEvent: { category: "toolbar" },
		target: "Tool",
		label: "toolBar.embeddable",
		perform: (e, t, n, r) => {
			let o = $r(t, { type: "embeddable" });
			return $2(r.canvas, {
				...t,
				activeTool: o
			}), {
				elements: e,
				appState: {
					...t,
					activeTool: $r(t, { type: "embeddable" })
				},
				captureUpdate: dr.EVENTUALLY
			};
		}
	});
	ja = (e, t) => {
		try {
			let { hostname: n } = new URL(e), r = n.replace(/^www\./, "");
			if (t instanceof Set) {
				if (Qa.has(r)) return r;
				let i = r.replace(/^([^.]+)/, "*");
				return Qa.has(i) ? i : null;
			}
			let o = t.replace(/^www\./, "");
			if (r === o) return o;
		} catch {}
		return null;
	}, J_ = (e) => {
		let t = e.match(a7);
		if (t && t.length === 2) return t[1];
		let n = e.match(c7);
		if (n && n.length === 2) return n[1];
		let r = e.match(i7);
		if (r && r.length === 2) return r[1];
		if (J2.test(e)) return `https://giphy.com/embed/${J2.exec(e)[1]}`;
		let o = e.match(d7);
		return o && o.length === 2 ? o[1] : e;
	}, Y_ = (e, t) => {
		if (!e) return !1;
		if (t != null) if (typeof t == "function") {
			let n = t(e);
			if (typeof n == "boolean") return n;
		} else {
			if (typeof t == "boolean") return t;
			if (t instanceof RegExp) return t.test(e);
			if (Array.isArray(t)) {
				for (let n of t) if (n instanceof RegExp) {
					if (e.match(n)) return !0;
				} else if (ja(e, n)) return !0;
				return !1;
			}
		}
		return !!ja(e, Qa);
	};
	jr = (e, t, n) => {
		if (typeof n > "u") return e.draw(t);
		let r = {
			sets: t.sets,
			shape: t.shape,
			options: {
				...t.options,
				fixedDecimalPlaceDigits: n
			}
		};
		return e.draw(r);
	}, eo = (e, t, n, r, o) => {
		if (!r.enabled || !r.clip) return null;
		let i = We(e, o);
		if (i) {
			let a = t.ownerDocument.createElementNS(re, "g");
			return a.setAttributeNS(re, "clip-path", `url(#${i.id})`), n.forEach((s) => a.appendChild(s)), a;
		}
		return null;
	}, wi = (e, t, n, r, o, i, a, s) => {
		let d = {
			x: i,
			y: a
		}, [c, l, U, p] = C(e, t), m = (U - c) / 2 - (e.x - c), b = (p - l) / 2 - (e.y - l);
		if (k(e)) {
			let y = qe(e, t);
			if (ee(y)) {
				let [w, I, S, v] = C(y, t), D = z.getBoundTextElementPosition(y, e, t);
				m = (S - w) / 2 - (D.x - w), b = (v - I) / 2 - (D.y - I), i = i + D.x - e.x, a = a + D.y - e.y;
			}
		}
		let E = 180 * e.angle / Math.PI, g = r;
		if (e.link) {
			let y = r.ownerDocument.createElementNS(re, "a");
			y.setAttribute("href", dn(e.link)), g.appendChild(y), g = y;
		}
		let h = (y, w) => {
			Ot() && y.setAttribute("data-id", w.id), g.appendChild(y);
		}, x = (We(e, t)?.opacity ?? 100) * e.opacity / 1e4;
		switch (e.type) {
			case "selection": throw new Error("Selection rendering is not supported for SVG");
			case "rectangle":
			case "diamond":
			case "ellipse": {
				let w = jr(n, he.generateElementShape(e, null), qn);
				x !== 1 && (w.setAttribute("stroke-opacity", `${x}`), w.setAttribute("fill-opacity", `${x}`)), w.setAttribute("stroke-linecap", "round"), w.setAttribute("transform", `translate(${i || 0} ${a || 0}) rotate(${E} ${m} ${b})`);
				h(eo(e, g, [w], s.frameRendering, t) || w, e);
				break;
			}
			case "iframe":
			case "embeddable": {
				let y = he.generateElementShape(e, s), w = jr(n, y, qn), I = e.opacity / 100;
				I !== 1 && (w.setAttribute("stroke-opacity", `${I}`), w.setAttribute("fill-opacity", `${I}`)), w.setAttribute("stroke-linecap", "round"), w.setAttribute("transform", `translate(${i || 0} ${a || 0}) rotate(${E} ${m} ${b})`), h(w, e);
				let S = Ii(e);
				wi(S, t, n, g, o, S.x + d.x - e.x, S.y + d.y - e.y, s);
				let v = jr(n, y, qn);
				for (v.setAttribute("stroke-linecap", "round"), v.setAttribute("transform", `translate(${i || 0} ${a || 0}) rotate(${E} ${m} ${b})`); v.firstChild;) v.removeChild(v.firstChild);
				let D = it(Math.min(e.width, e.height), e), $ = V2(T2(e.link || ""));
				if (s.renderEmbeddables === !1 || $?.type === "document") {
					let N = r.ownerDocument.createElementNS(re, "a");
					N.setAttribute("href", dn(e.link || "")), N.setAttribute("target", "_blank"), N.setAttribute("rel", "noopener noreferrer"), N.style.borderRadius = `${D}px`, v.appendChild(N);
				} else {
					let N = r.ownerDocument.createElementNS(re, "foreignObject");
					N.style.width = `${e.width}px`, N.style.height = `${e.height}px`, N.style.border = "none";
					let B = N.ownerDocument.createElementNS(re, "div");
					B.setAttribute("xmlns", "http://www.w3.org/1999/xhtml"), B.style.width = "100%", B.style.height = "100%";
					let _ = B.ownerDocument.createElement("iframe");
					_.src = $?.link ?? "", _.style.width = "100%", _.style.height = "100%", _.style.border = "none", _.style.borderRadius = `${D}px`, _.style.top = "0", _.style.left = "0", _.allowFullscreen = !0, B.appendChild(_), N.appendChild(B), v.appendChild(N);
				}
				h(v, e);
				break;
			}
			case "line":
			case "arrow": {
				let y = oe(e, t), w = r.ownerDocument.createElementNS(re, "mask");
				if (y) {
					w.setAttribute("id", `mask-${e.id}`);
					let D = r.ownerDocument.createElementNS(re, "rect");
					i = i || 0, a = a || 0, D.setAttribute("x", "0"), D.setAttribute("y", "0"), D.setAttribute("fill", "#fff"), D.setAttribute("width", `${e.width + 100 + i}`), D.setAttribute("height", `${e.height + 100 + a}`), w.appendChild(D);
					let $ = r.ownerDocument.createElementNS(re, "rect"), N = z.getBoundTextElementPosition(e, y, t), B = i + N.x - e.x, _ = a + N.y - e.y;
					$.setAttribute("x", B.toString()), $.setAttribute("y", _.toString()), $.setAttribute("fill", "#000"), $.setAttribute("width", `${y.width}`), $.setAttribute("height", `${y.height}`), $.setAttribute("opacity", "1"), w.appendChild($);
				}
				let I = r.ownerDocument.createElementNS(re, "g");
				y && I.setAttribute("mask", `url(#mask-${e.id})`), I.setAttribute("stroke-linecap", "round"), he.generateElementShape(e, s).forEach((D) => {
					let $ = jr(n, D, qn);
					x !== 1 && ($.setAttribute("stroke-opacity", `${x}`), $.setAttribute("fill-opacity", `${x}`)), $.setAttribute("transform", `translate(${i || 0} ${a || 0}) rotate(${E} ${m} ${b})`), e.type === "line" && Kt(e.points) && e.backgroundColor !== "transparent" && $.setAttribute("fill-rule", "evenodd"), I.appendChild($);
				});
				let v = eo(e, g, [I, w], s.frameRendering, t);
				v ? (h(v, e), g.appendChild(v)) : (h(I, e), g.append(w));
				break;
			}
			case "freedraw": {
				let y = he.generateElementShape(e, s), w = y ? jr(n, y, qn) : r.ownerDocument.createElementNS(re, "g");
				x !== 1 && (w.setAttribute("stroke-opacity", `${x}`), w.setAttribute("fill-opacity", `${x}`)), w.setAttribute("transform", `translate(${i || 0} ${a || 0}) rotate(${E} ${m} ${b})`), w.setAttribute("stroke", "none");
				let I = r.ownerDocument.createElementNS(re, "path");
				I.setAttribute("fill", e.strokeColor), I.setAttribute("d", wa(e)), w.appendChild(I);
				h(eo(e, g, [w], s.frameRendering, t) || w, e);
				break;
			}
			case "image": {
				let y = Math.round(e.width), w = Math.round(e.height), I = At(e) && o[e.fileId];
				if (I) {
					let { reuseImages: S = !0 } = s, v = `image-${I.id}`, D = e.width, $ = e.height;
					e.crop && ({width: D, height: $} = er(e), v = `image-crop-${I.id}-${X2(`${D}x${$}`)}`), S || (v = `image-${e.id}`);
					let N = r.querySelector(`#${v}`);
					if (!N) {
						N = r.ownerDocument.createElementNS(re, "symbol"), N.id = v;
						let j = r.ownerDocument.createElementNS(re, "image");
						j.setAttribute("href", I.dataURL), j.setAttribute("preserveAspectRatio", "none"), e.crop || !S ? (j.setAttribute("width", `${D}`), j.setAttribute("height", `${$}`)) : (j.setAttribute("width", "100%"), j.setAttribute("height", "100%")), N.appendChild(j), (g.querySelector("defs") || g).prepend(N);
					}
					let B = r.ownerDocument.createElementNS(re, "use");
					B.setAttribute("href", `#${v}`), s.exportWithDarkMode && I.mimeType !== H.svg && B.setAttribute("filter", Ia);
					let _ = 0, W = 0;
					if (e.crop) {
						let { width: j, height: ye } = er(e);
						_ = e.crop.x / (e.crop.naturalWidth / j), W = e.crop.y / (e.crop.naturalHeight / ye);
					}
					let be = m + _, V = b + W;
					B.setAttribute("width", `${y + _}`), B.setAttribute("height", `${w + W}`), B.setAttribute("opacity", `${x}`), (e.scale[0] !== 1 || e.scale[1] !== 1) && B.setAttribute("transform", `translate(${be} ${V}) scale(${e.scale[0]} ${e.scale[1]}) translate(${-be} ${-V})`);
					let ce = r.ownerDocument.createElementNS(re, "g");
					if (e.crop) {
						let j = r.ownerDocument.createElementNS(re, "mask");
						j.setAttribute("id", `mask-image-crop-${e.id}`), j.setAttribute("fill", "#fff");
						let ye = r.ownerDocument.createElementNS(re, "rect");
						ye.setAttribute("x", `${_}`), ye.setAttribute("y", `${W}`), ye.setAttribute("width", `${y}`), ye.setAttribute("height", `${w}`), j.appendChild(ye), g.appendChild(j), ce.setAttribute("mask", `url(#${j.id})`);
					}
					if (ce.appendChild(B), ce.setAttribute("transform", `translate(${i - _} ${a - W}) rotate(${E} ${be} ${V})`), e.roundness) {
						let j = r.ownerDocument.createElementNS(re, "clipPath");
						j.id = `image-clipPath-${e.id}`;
						let ye = r.ownerDocument.createElementNS(re, "rect"), He = it(Math.min(e.width, e.height), e);
						ye.setAttribute("width", `${e.width}`), ye.setAttribute("height", `${e.height}`), ye.setAttribute("rx", `${He}`), ye.setAttribute("ry", `${He}`), j.appendChild(ye), h(j, e), ce.setAttributeNS(re, "clip-path", `url(#${j.id})`);
					}
					h(eo(e, g, [ce], s.frameRendering, t) || ce, e);
				}
				break;
			}
			case "frame":
			case "magicframe":
				if (s.frameRendering.enabled && s.frameRendering.outline) {
					let y = document.createElementNS(re, "rect");
					y.setAttribute("transform", `translate(${i || 0} ${a || 0}) rotate(${E} ${m} ${b})`), y.setAttribute("width", `${e.width}px`), y.setAttribute("height", `${e.height}px`), y.setAttribute("rx", Pe.radius.toString()), y.setAttribute("ry", Pe.radius.toString()), y.setAttribute("fill", "none"), y.setAttribute("stroke", Pe.strokeColor), y.setAttribute("stroke-width", Pe.strokeWidth.toString()), h(y, e);
				}
				break;
			default: if (k(e)) {
				let y = r.ownerDocument.createElementNS(re, "g");
				x !== 1 && (y.setAttribute("stroke-opacity", `${x}`), y.setAttribute("fill-opacity", `${x}`)), y.setAttribute("transform", `translate(${i || 0} ${a || 0}) rotate(${E} ${m} ${b})`);
				let w = e.text.replace(/\r\n?/g, `
`).split(`
`), I = Zn(e.fontSize, e.lineHeight), S = e.textAlign === "center" ? e.width / 2 : e.textAlign === "right" ? e.width : 0, v = Go(e.fontFamily, e.fontSize, I), D = Po(e.text) ? "rtl" : "ltr", $ = e.textAlign === "center" ? "middle" : e.textAlign === "right" || D === "rtl" ? "end" : "start";
				for (let B = 0; B < w.length; B++) {
					let _ = r.ownerDocument.createElementNS(re, "text");
					_.textContent = w[B], _.setAttribute("x", `${S}`), _.setAttribute("y", `${B * I + v}`), _.setAttribute("font-family", ea(e)), _.setAttribute("font-size", `${e.fontSize}px`), _.setAttribute("fill", e.strokeColor), _.setAttribute("text-anchor", $), _.setAttribute("style", "white-space: pre;"), _.setAttribute("direction", D), _.setAttribute("dominant-baseline", "alphabetic"), y.appendChild(_);
				}
				h(eo(e, g, [y], s.frameRendering, t) || y, e);
			} else throw new Error(`Unimplemented type ${e.type}`);
		}
	}, q2 = (e, t, n, r, o, i) => {
		r && (e.filter((a) => !gt(a)).forEach((a) => {
			if (!a.isDeleted) {
				if (k(a) && a.containerId && t.has(a.containerId)) return;
				try {
					wi(a, t, n, r, o, a.x + i.offsetX, a.y + i.offsetY, i);
					let s = oe(a, t);
					s && wi(s, t, n, r, o, s.x + i.offsetX, s.y + i.offsetY, i);
				} catch (s) {
					console.error(s);
				}
			}
		}), e.filter((a) => gt(a)).forEach((a) => {
			if (!a.isDeleted) try {
				wi(a, t, n, r, o, a.x + i.offsetX, a.y + i.offsetY, i);
			} catch (s) {
				console.error(s);
			}
		}));
	};
	G2 = 500, Z2 = (e) => {
		let t = e.extensions?.reduce((r, o) => (r.push(H[o]), r), []), n$1 = e.extensions?.reduce((r, o) => o === "jpg" ? r.concat(".jpg", ".jpeg") : r.concat(`.${o}`), []);
		return n({
			description: e.description,
			extensions: n$1,
			mimeTypes: t,
			multiple: e.multiple ?? !1,
			legacySetup: (r, o, i) => {
				let a = $o(o, G2), s = () => {
					d(), document.addEventListener("keyup", a), document.addEventListener("pointerup", a), a();
				}, d = () => {
					if (i.files?.length) r(e.multiple ? [...i.files] : i.files[0]);
				};
				requestAnimationFrame(() => {
					window.addEventListener("focus", s);
				});
				let c = window.setInterval(() => {
					d();
				}, G2);
				return (l) => {
					clearInterval(c), a.cancel(), window.removeEventListener("focus", s), document.removeEventListener("keyup", a), document.removeEventListener("pointerup", a), l && (console.warn("Opening the file was canceled (legacy-fs)."), l(new Co()));
				};
			}
		});
	}, es = (e, t) => s(e, {
		fileName: `${t.name}.${t.extension}`,
		description: t.description,
		extensions: [`.${t.extension}`],
		mimeTypes: t.mimeTypes
	}, t.fileHandle);
	f7 = (e, t) => {
		let n = {};
		for (let r of e) !r.isDeleted && "fileId" in r && r.fileId && t[r.fileId] && (n[r.fileId] = t[r.fileId]);
		return n;
	}, to = (e, t, n, r) => {
		let o = {
			type: Ze.excalidraw,
			version: qi.excalidraw,
			source: Ci,
			elements: r === "local" ? Ri(e) : j2(e),
			appState: r === "local" ? Ro(t) : ed(t),
			files: r === "local" ? f7(e, n) : void 0
		};
		return JSON.stringify(o, null, 2);
	}, hO = async (e, t, n, r = t.name || "Untitled") => {
		let o = to(e, t, n, "local");
		return { fileHandle: await es(new Blob([o], { type: H.excalidraw }), {
			name: r,
			extension: "excalidraw",
			description: "Excalidraw file",
			fileHandle: W2(t.fileHandle) ? null : t.fileHandle
		}) };
	}, yO = async (e, t) => {
		let n = await Z2({ description: "Excalidraw files" });
		return z2(await ts(n), e, t, n.handle);
	}, Q2 = (e) => e?.type === Ze.excalidraw && (!e.elements || Array.isArray(e.elements) && (!e.appState || typeof e.appState == "object")), ns = (e) => typeof e == "object" && e && e.type === Ze.excalidrawLibrary && (e.version === 1 || e.version === 2), p7 = (e) => {
		let t = {
			type: Ze.excalidrawLibrary,
			version: qi.excalidrawLibrary,
			source: Ci,
			libraryItems: e
		};
		return JSON.stringify(t, null, 2);
	}, IO = async (e) => {
		let t = p7(e);
		await es(new Blob([t], { type: H.excalidrawlib }), {
			name: "library",
			extension: "excalidrawlib",
			description: "Excalidraw library file"
		});
	};
	u7 = (e) => new Promise((t, n) => {
		let r = new Image();
		r.onload = () => {
			t(r);
		}, r.onerror = (o) => {
			n(o);
		}, r.src = e;
	}), ep = async ({ fileIds: e, files: t, imageCache: n }) => {
		let r = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
		return await Promise.all(e.reduce((i, a) => {
			let s = t[a];
			return s && !r.has(a) ? (r.set(a, !0), i.concat((async () => {
				try {
					if (s.mimeType === H.binary) throw new Error("Only images can be added to ImageCache");
					let d = u7(s.dataURL), c = {
						image: d,
						mimeType: s.mimeType
					};
					n.set(a, c);
					let l = await d;
					n.set(a, {
						...c,
						image: l
					});
				} catch {
					o.set(a, !0);
				}
			})())) : i;
		}, [])), {
			imageCache: n,
			updatedFiles: r,
			erroredFiles: o
		};
	}, tp = (e) => e.filter((t) => At(t)), m7 = (e) => e?.nodeName.toLowerCase() === "svg", LO = (e) => {
		let t = new DOMParser().parseFromString(e, H.svg), n = t.querySelector("svg");
		if (t.querySelector("parsererror") || !m7(n)) throw new Error("Invalid SVG");
		{
			n.hasAttribute("xmlns") || n.setAttribute("xmlns", "http://www.w3.org/2000/svg");
			let o = n.getAttribute("width"), i = n.getAttribute("height");
			(o?.includes("%") || o === "auto") && (o = null), (i?.includes("%") || i === "auto") && (i = null);
			let a = n.getAttribute("viewBox");
			if (!o || !i) {
				if (o = o || "50", i = i || "50", a) {
					let s = a.match(/\d+ +\d+ +(\d+(?:\.\d+)?) +(\d+(?:\.\d+)?)/);
					s && ([, o, i] = s);
				}
				n.setAttribute("width", o), n.setAttribute("height", i);
			}
			return a || n.setAttribute("viewBox", `0 0 ${o} ${i}`), n.outerHTML;
		}
	};
	rs = document.createElement("img");
	rs.src = `data:${H.svg}, ${encodeURIComponent("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#1971c2\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"feather feather-external-link\"><path d=\"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6\"></path><polyline points=\"15 3 21 3 21 9\"></polyline><line x1=\"10\" y1=\"14\" x2=\"21\" y2=\"3\"></line></svg>")}`;
	os = document.createElement("img");
	os.src = `data:${H.svg}, ${encodeURIComponent("<svg  xmlns=\"http://www.w3.org/2000/svg\"  width=\"16\"  height=\"16\"  viewBox=\"0 0 24 24\"  fill=\"none\"  stroke=\"#1971c2\"  stroke-width=\"2\"  stroke-linecap=\"round\"  stroke-linejoin=\"round\"  class=\"icon icon-tabler icons-tabler-outline icon-tabler-arrow-big-right-line\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M12 9v-3.586a1 1 0 0 1 1.707 -.707l6.586 6.586a1 1 0 0 1 0 1.414l-6.586 6.586a1 1 0 0 1 -1.707 -.707v-3.586h-6v-6h6z\" /><path d=\"M3 9v6\" /></svg>")}`;
	is = ([e, t, n, r], o, i) => {
		let a = H1, s = a / i.zoom.value, d = a / i.zoom.value, c = a / i.zoom.value, l = (e + n) / 2, U = (t + r) / 2, p = (a - 8) / (2 * i.zoom.value), m = 4 / i.zoom.value, b = n + m - p, E = t - m - c + p, [g, h] = T(u(b + s / 2, E + d / 2), u(l, U), o);
		return [
			g - s / 2,
			h - d / 2,
			s,
			d
		];
	}, b7 = (e, t, n, [r, o]) => {
		let i = 4 / n.zoom.value, [a, s, d, c] = C(e, t), [l, U, p, m] = is([
			a,
			s,
			d,
			c
		], e.angle, n);
		return r > l - i && r < l + i + p && o > U - i && o < U + m + i;
	}, BO = (e, t, n, [r, o], i) => !e.link || n.selectedElementIds[e.id] ? !1 : !i && n.viewModeEnabled && ba(r, o, e, t) ? !0 : b7(e, t, n, u(r, o));
	KO = (e, t, n, r, o = !0) => {
		e.beginPath(), e.arc(t, n, r, 0, Math.PI * 2), e.fill(), o && e.stroke();
	}, np = (e, t) => [e.width / t, e.height / t], rp = ({ canvas: e, scale: t, normalizedWidth: n, normalizedHeight: r, theme: o, isExporting: i, viewBackgroundColor: a }) => {
		let s = e.getContext("2d");
		return s.setTransform(1, 0, 0, 1, 0, 0), s.scale(t, t), i && o === ke.DARK && (s.filter = "invert(93%) hue-rotate(180deg)"), typeof a == "string" ? ((a === "transparent" || a.length === 5 || a.length === 9 || /(hsla|rgba)\(/.test(a)) && s.clearRect(0, 0, n, r), s.save(), s.fillStyle = a, s.fillRect(0, 0, n, r), s.restore()) : s.clearRect(0, 0, n, r), s;
	};
	qO = (e, t) => {
		let n = window.location.href;
		try {
			let r = new URL(n);
			return r.searchParams.set(gr, e), dn(r.toString());
		} catch (r) {
			console.error(r);
		}
		return dn(n);
	}, XO = (e, t) => {
		if (e.length > 0 && E7(e)) {
			if (e.length === 1) return {
				id: e[0].id,
				type: "element"
			};
			if (e.length > 1) {
				let n = Object.keys(t.selectedGroupIds)[0];
				return n ? {
					id: n,
					type: "group"
				} : {
					id: e[0].groupIds[0],
					type: "group"
				};
			}
		}
		return null;
	}, E7 = (e) => !!(e.length === 1 || e.length > 1 && b2(e)), op = (e) => {
		try {
			let t = new URL(e);
			return t.searchParams.has(gr) && t.host === window.location.host;
		} catch {
			return !1;
		}
	}, GO = (e) => {
		try {
			let { searchParams: t } = new URL(e);
			if (t.has(gr)) return t.get(gr);
		} catch {}
		return null;
	};
	Ti = {
		Bold: "#dddddd",
		Regular: "#e5e5e5"
	}, g7 = (e, t, n, r, o, i, a, s) => {
		let d = r % t - t, c = o % t - t, l = t * i.value, U = 1 / i.value;
		e.save(), i.value === 1 && e.translate(d % 1 ? 0 : .5, c % 1 ? 0 : .5);
		for (let p = d; p < d + a + t * 2; p += t) {
			let m = n > 1 && Math.round(p - r) % (n * t) === 0;
			if (!m && l < 10) continue;
			let b = Math.min(1 / i.value, m ? 4 : 1);
			e.lineWidth = b;
			let E = [b * 3, U + (b + U)];
			e.beginPath(), e.setLineDash(m ? [] : E), e.strokeStyle = m ? Ti.Bold : Ti.Regular, e.moveTo(p, c - t), e.lineTo(p, Math.ceil(c + s + t * 2)), e.stroke();
		}
		for (let p = c; p < c + s + t * 2; p += t) {
			let m = n > 1 && Math.round(p - o) % (n * t) === 0;
			if (!m && l < 10) continue;
			let b = Math.min(1 / i.value, m ? 4 : 1);
			e.lineWidth = b;
			let E = [b * 3, U + (b + U)];
			e.beginPath(), e.setLineDash(m ? [] : E), e.strokeStyle = m ? Ti.Bold : Ti.Regular, e.moveTo(d - t, p), e.lineTo(Math.ceil(d + a + t * 2), p), e.stroke();
		}
		e.restore();
	}, ip = (e, t, n, r) => {
		t.translate(e.x + r.scrollX, e.y + r.scrollY), t.beginPath(), t.roundRect ? t.roundRect(0, 0, e.width, e.height, Pe.radius / r.zoom.value) : t.rect(0, 0, e.width, e.height), t.clip(), t.translate(-(e.x + r.scrollX), -(e.y + r.scrollY));
	}, ap = {
		regularLink: null,
		elementLink: null
	}, sp = (e, t, n, r) => {
		if (e.link && !n.selectedElementIds[e.id]) {
			let [o, i, a, s] = C(e, r), [d, c, l, U] = is([
				o,
				i,
				a,
				s
			], e.angle, n), p = d + l / 2, m = c + U / 2;
			t.save(), t.translate(n.scrollX + p, n.scrollY + m), t.rotate(e.angle);
			let b = op(e.link) ? "elementLink" : "regularLink", E = ap[b];
			if (!E || E.zoom !== n.zoom.value) {
				E = Object.assign(document.createElement("canvas"), { zoom: n.zoom.value }), E.width = l * window.devicePixelRatio * n.zoom.value, E.height = U * window.devicePixelRatio * n.zoom.value, ap[b] = E;
				let g = E.getContext("2d");
				g.scale(window.devicePixelRatio * n.zoom.value, window.devicePixelRatio * n.zoom.value), g.fillStyle = "#fff", g.fillRect(0, 0, l, U), b === "elementLink" ? g.drawImage(os, 0, 0, l, U) : g.drawImage(rs, 0, 0, l, U), g.restore();
			}
			t.drawImage(E, d - p, c - m, l, U), t.restore();
		}
	}, dp = ({ canvas: e, rc: t, elementsMap: n, allElementsMap: r, visibleElements: o, scale: i, appState: a, renderConfig: s }) => {
		if (e === null) return;
		let { renderGrid: d = !0, isExporting: c } = s, [l, U] = np(e, i), p = rp({
			canvas: e,
			scale: i,
			normalizedWidth: l,
			normalizedHeight: U,
			theme: a.theme,
			isExporting: c,
			viewBackgroundColor: a.viewBackgroundColor
		});
		p.scale(a.zoom.value, a.zoom.value), d && g7(p, a.gridSize, a.gridStep, a.scrollX, a.scrollY, a.zoom, l / a.zoom.value, U / a.zoom.value);
		let m = /* @__PURE__ */ new Set();
		o.forEach((E) => {
			E.groupIds.length > 0 && a.frameToHighlight && a.selectedElementIds[E.id] && (hn(E, a.frameToHighlight, n) || E.groupIds.find((g) => m.has(g))) && E.groupIds.forEach((g) => m.add(g));
		});
		let b = /* @__PURE__ */ new Map();
		o.filter((E) => !gt(E)).forEach((E) => {
			try {
				let g = E.frameId || a.frameToHighlight?.id;
				if (k(E) && E.containerId && n.has(E.containerId)) return;
				if (p.save(), g && a.frameRendering.enabled && a.frameRendering.clip) {
					let x = Mi(E, n, a);
					x && as(E, x, a, n, b) && ip(x, p, s, a), Fn(E, n, r, t, p, s, a);
				} else Fn(E, n, r, t, p, s, a);
				let h = oe(E, n);
				h && Fn(h, n, r, t, p, s, a), p.restore(), c || sp(E, p, a, n);
			} catch (g) {
				console.error(g, E.id, E.x, E.y, E.width, E.height);
			}
		}), o.filter((E) => gt(E)).forEach((E) => {
			try {
				let g = () => {
					if (Fn(E, n, r, t, p, s, a), gt(E) && (c || Bo(E) && s.embedsValidationStatus.get(E.id) !== !0) && E.width && E.height) Fn(Ii(E), n, r, t, p, s, a);
					c || sp(E, p, a, n);
				};
				if ((E.frameId || a.frameToHighlight?.id) && a.frameRendering.enabled && a.frameRendering.clip) {
					p.save();
					let x = Mi(E, n, a);
					x && as(E, x, a, n, b) && ip(x, p, s, a), g(), p.restore();
				} else g();
			} catch (g) {
				console.error(g);
			}
		}), s.pendingFlowchartNodes?.forEach((E) => {
			try {
				Fn(E, n, r, t, p, s, a);
			} catch (g) {
				console.error(g);
			}
		});
	}, x7 = pd((e) => {
		dp(e);
	}, { trailing: !0 }), cp = (e, t) => {
		if (t) {
			x7(e);
			return;
		}
		dp(e);
	};
	h7 = (e, t) => {
		if (e.width <= t) return e;
		let r = document.createElement("canvas").getContext("2d");
		r.font = Ee({
			fontFamily: e.fontFamily,
			fontSize: e.fontSize
		});
		let o = e.text;
		if (r.measureText(o).width > t) for (let a = o.length; a > 0; a--) {
			let s = `${o.slice(0, a)}...`;
			if (r.measureText(s).width <= t) {
				o = s;
				break;
			}
		}
		return vt(e, {
			text: o,
			width: t
		});
	}, y7 = (e, t) => {
		let n = [];
		for (let r of e) {
			if (de(r)) {
				let o = qt({
					x: r.x,
					y: r.y - Pe.nameOffsetY,
					fontFamily: Ie.Helvetica,
					fontSize: Pe.nameFontSize,
					lineHeight: Pe.nameLineHeight,
					strokeColor: t.exportWithDarkMode ? Pe.nameColorDarkTheme : Pe.nameColorLightTheme,
					text: bp(r)
				});
				o.y -= o.height, o = h7(o, r.width), n.push(o);
			}
			n.push(r);
		}
		return n;
	}, Up = (e, t) => (t = t || mt().frameRendering, {
		enabled: e ? !0 : t.enabled,
		outline: e ? !1 : t.outline,
		name: e ? !1 : t.name,
		clip: e ? !0 : t.clip
	}), fp = ({ elements: e, exportingFrame: t, frameRendering: n, exportWithDarkMode: r }) => {
		let o;
		return t ? o = Ep(e, t) : n.enabled && n.name ? o = y7(e, { exportWithDarkMode: r }) : o = e, o;
	}, pp = async (e, t, n, { exportBackground: r, exportPadding: o = 10, viewBackgroundColor: i, exportingFrame: a }, s = (c, l) => {
		let U = document.createElement("canvas");
		return U.width = c * t.exportScale, U.height = l * t.exportScale, {
			canvas: U,
			scale: t.exportScale
		};
	}, d = async () => {
		await Nn.loadElementsFonts(e);
	}) => {
		await d();
		let c = Up(a ?? null, t.frameRendering ?? null);
		a && (c.clip = !1);
		let l = fp({
			elements: e,
			exportingFrame: a,
			exportWithDarkMode: t.exportWithDarkMode,
			frameRendering: c
		});
		a && (o = 0);
		let [U, p, m, b] = ss(a ? [a] : cs(l), o), { canvas: E, scale: g = 1 } = s(m, b), h = mt(), { imageCache: x } = await ep({
			imageCache: /* @__PURE__ */ new Map(),
			fileIds: tp(l).map((y) => y.fileId),
			files: n
		});
		return cp({
			canvas: E,
			rc: rough_default.canvas(E),
			elementsMap: tt(te(l)),
			allElementsMap: tt(te(An(e))),
			visibleElements: l,
			scale: g,
			appState: {
				...t,
				frameRendering: c,
				viewBackgroundColor: r ? i : null,
				scrollX: -U + o,
				scrollY: -p + o,
				zoom: h.zoom,
				shouldCacheIgnoreZoom: !1,
				theme: t.exportWithDarkMode ? ke.DARK : ke.LIGHT
			},
			renderConfig: {
				canvasBackgroundColor: i,
				imageCache: x,
				renderGrid: !1,
				isExporting: !0,
				embedsValidationStatus: /* @__PURE__ */ new Map(),
				elementsPendingErasure: /* @__PURE__ */ new Set(),
				pendingFlowchartNodes: null
			}
		}), E;
	}, no = (e) => document.createComment(` ${e} `), up = async (e, t, n, r) => {
		let o = Up(r?.exportingFrame ?? null, t.frameRendering ?? null), { exportPadding: i = 10, exportWithDarkMode: a = !1, viewBackgroundColor: s, exportScale: d = 1, exportEmbedScene: c } = t, { exportingFrame: l = null } = r || {}, U = fp({
			elements: e,
			exportingFrame: l,
			exportWithDarkMode: a,
			frameRendering: o
		});
		l && (i = 0);
		let [p, m, b, E] = ss(l ? [l] : cs(U), i), g = -p + i, h = -m + i, x = document.createElementNS(re, "svg");
		x.setAttribute("version", "1.1"), x.setAttribute("xmlns", re), x.setAttribute("viewBox", `0 0 ${b} ${E}`), x.setAttribute("width", `${b * d}`), x.setAttribute("height", `${E * d}`), a && x.setAttribute("filter", "invert(93%) hue-rotate(180deg)");
		let y = x.ownerDocument.createElementNS(re, "defs"), w = x.ownerDocument.createElementNS(re, "metadata");
		if (x.appendChild(no("svg-source:excalidraw")), x.appendChild(w), x.appendChild(y), c) try {
			I7({
				metadataElement: w,
				payload: to(e, t, n || {}, "local")
			});
		} catch (B) {
			console.error(B);
		}
		let I = ds(e);
		if (I.length) {
			let B = te(e);
			for (let _ of I) {
				let W = x.ownerDocument.createElementNS(re, "clipPath");
				W.setAttribute("id", _.id);
				let [be, V, ce, J] = C(_, B), j = (ce - be) / 2 - (_.x - be), ye = (J - V) / 2 - (_.y - V), He = x.ownerDocument.createElementNS(re, "rect");
				He.setAttribute("transform", `translate(${_.x + g} ${_.y + h}) rotate(${_.angle} ${j} ${ye})`), He.setAttribute("width", `${_.width}`), He.setAttribute("height", `${_.height}`), l || (He.setAttribute("rx", `${Pe.radius}`), He.setAttribute("ry", `${Pe.radius}`)), W.appendChild(He), y.appendChild(W);
			}
		}
		let S = r?.skipInliningFonts ? [] : await Nn.generateFontFaceDeclarations(e), v = `
      `, D = x.ownerDocument.createElementNS(re, "style");
		if (D.classList.add("style-fonts"), D.appendChild(document.createTextNode(`${v}${S.join(v)}`)), y.appendChild(D), t.exportBackground && s) {
			let B = x.ownerDocument.createElementNS(re, "rect");
			B.setAttribute("x", "0"), B.setAttribute("y", "0"), B.setAttribute("width", `${b}`), B.setAttribute("height", `${E}`), B.setAttribute("fill", s), x.appendChild(B);
		}
		let $ = rough_default.svg(x), N = r?.renderEmbeddables ?? !1;
		return q2(U, tt(te(U)), $, x, n || {}, {
			offsetX: g,
			offsetY: h,
			isExporting: !0,
			exportWithDarkMode: a,
			renderEmbeddables: N,
			frameRendering: o,
			canvasBackgroundColor: s,
			embedsValidationStatus: N ? new Map(U.filter((B) => de(B)).map((B) => [B.id, !0])) : /* @__PURE__ */ new Map(),
			reuseImages: r?.reuseImages ?? !0
		}), x;
	}, I7 = ({ payload: e, metadataElement: t }) => {
		let n = Li(JSON.stringify(Si({ text: e })), !0);
		t.appendChild(no(`payload-type:${H.excalidraw}`)), t.appendChild(no("payload-version:2")), t.appendChild(no("payload-start")), t.appendChild(document.createTextNode(n)), t.appendChild(no("payload-end"));
	}, mp = ({ svg: e }) => {
		if (e.includes(`payload-type:${H.excalidraw}`)) {
			let t = e.match(/<!-- payload-start -->\s*(.+?)\s*<!-- payload-end -->/);
			if (!t) throw new Error("INVALID");
			let o = (e.match(/<!-- payload-version:(\d+) -->/)?.[1] || "1") !== "1";
			try {
				let i = Di(t[1], o), a = JSON.parse(i);
				if (!("encoded" in a)) {
					if ("type" in a && a.type === Ze.excalidraw) return i;
					throw new Error("FAILED");
				}
				return vi(a);
			} catch (i) {
				throw console.error(i), /* @__PURE__ */ new Error("FAILED");
			}
		}
		throw new Error("INVALID");
	}, ss = (e, t) => {
		let [n, r, o, i] = $e(e);
		return [
			n,
			r,
			dt(n, o) + t * 2,
			dt(r, i) + t * 2
		];
	}, TA = (e, t, n) => {
		let [, , r, o] = ss(e, t).map((i) => Math.trunc(i * n));
		return [r, o];
	};
	ro = class {
		constructor(t) {
			this.scoreFunction = t;
			i$1(this, "content", []);
		}
		sinkDown(t) {
			let n = this.content[t];
			for (; t > 0;) {
				let r = (t + 1 >> 1) - 1, o = this.content[r];
				if (this.scoreFunction(n) < this.scoreFunction(o)) this.content[r] = n, this.content[t] = o, t = r;
				else break;
			}
		}
		bubbleUp(t) {
			let n = this.content.length, r = this.content[t], o = this.scoreFunction(r);
			for (;;) {
				let i = t + 1 << 1, a = i - 1, s = null, d = 0;
				if (a < n) {
					let c = this.content[a];
					d = this.scoreFunction(c), d < o && (s = a);
				}
				if (i < n) {
					let c = this.content[i];
					this.scoreFunction(c) < (s === null ? o : d) && (s = i);
				}
				if (s !== null) this.content[t] = this.content[s], this.content[s] = r, t = s;
				else break;
			}
		}
		push(t) {
			this.content.push(t), this.sinkDown(this.content.length - 1);
		}
		pop() {
			if (this.content.length === 0) return null;
			let t = this.content[0], n = this.content.pop();
			return this.content.length > 0 && (this.content[0] = n, this.bubbleUp(0)), t;
		}
		remove(t) {
			if (this.content.length === 0) return;
			let n = this.content.indexOf(t), r = this.content.pop();
			n < this.content.length && (this.content[n] = r, this.scoreFunction(r) < this.scoreFunction(t) ? this.sinkDown(n) : this.bubbleUp(n));
		}
		size() {
			return this.content.length;
		}
		rescoreElement(t) {
			this.sinkDown(this.content.indexOf(t));
		}
	};
	Us = 1, pe = 40, w7 = (e, t) => {
		let n = e.fixedSegments ? e.fixedSegments.slice() : null;
		if (n) {
			let r = [];
			e.points.map((a) => u(e.x + a[0], e.y + a[1])).forEach((a, s, d) => {
				if (s < 2) return r.push(a);
				if (ve(tr(a, d[s - 1]), tr(d[s - 1], d[s - 2]))) {
					let U = n?.findIndex((m) => m.index === s - 1) ?? -1, p = n?.findIndex((m) => m.index === s) ?? -1;
					p !== -1 && (n[p].start = u(d[s - 2][0] - e.x, d[s - 2][1] - e.y)), U !== -1 && n.splice(U, 1), r.splice(-1, 1), n.forEach((m) => {
						m.index > s - 1 && (m.index -= 1);
					});
				}
				return r.push(a);
			});
			let o = [];
			r.forEach((a, s, d) => {
				if (s < 3) return o.push(a);
				if (ie(d[s - 2], d[s - 1]) < Us) {
					let c = n?.findIndex((p) => p.index === s - 2) ?? -1, l = n?.findIndex((p) => p.index === s - 1) ?? -1;
					l !== -1 && n.splice(l, 1), c !== -1 && n.splice(c, 1), o.splice(-2, 2), n.forEach((p) => {
						p.index > s - 2 && (p.index -= 2);
					});
					let U = Mt(a, d[s - 1]);
					return o.push(u(U ? a[0] : d[s - 2][0], U ? d[s - 2][1] : a[1]));
				}
				o.push(a);
			});
			let i = n.filter((a) => a.index !== 1 && a.index !== o.length - 1);
			return i.length === 0 ? In(us(ms(ps(e, fs(e, t, o.map((a) => u(a[0] - e.x, a[1] - e.y)), e.startBinding && cr(e.startBinding.elementId, t), e.endBinding && cr(e.endBinding.elementId, t))) ?? [])), i, null, null) : (c.DEV && Ae(Ni(o), "Invalid elbow points with fixed segments"), In(o, i, e.startIsSpecial, e.endIsSpecial));
		}
		return {
			x: e.x,
			y: e.y,
			points: e.points,
			fixedSegments: e.fixedSegments,
			startIsSpecial: e.startIsSpecial,
			endIsSpecial: e.endIsSpecial
		};
	}, R7 = (e, t, n) => {
		let r = t.map(($) => $.index), i = (e.fixedSegments?.map(($) => $.index) ?? []).findIndex(($) => !r.includes($));
		if (i === -1 || !e.fixedSegments?.[i]) return { points: e.points };
		let a = e.fixedSegments[i].index, s = e.fixedSegments[i - 1], d = e.fixedSegments[i + 1], c = e.x + (s ? s.end[0] : 0), l = e.y + (s ? s.end[1] : 0), U = s ? null : e.startBinding, p = d ? null : e.endBinding, { startHeading: m, endHeading: b, startGlobalPoint: E, endGlobalPoint: g, hoveredStartElement: h, hoveredEndElement: x, ...y } = fs({
			x: c,
			y: l,
			startBinding: U,
			endBinding: p,
			startArrowhead: null,
			endArrowhead: null,
			points: e.points
		}, n, [u(0, 0), u(e.x + (d?.start[0] ?? e.points[e.points.length - 1][0]) - c, e.y + (d?.start[1] ?? e.points[e.points.length - 1][1]) - l)], U && cr(U.elementId, n), p && cr(p.elementId, n), { isDragging: !1 }), { points: w } = In(us(ms(ps(e, {
			startHeading: m,
			endHeading: b,
			startGlobalPoint: E,
			endGlobalPoint: g,
			hoveredStartElement: h,
			hoveredEndElement: x,
			...y
		}) ?? [])), t, null, null), I = [];
		if (s) for (let $ = 0; $ < s.index; $++) I.push(u(e.x + e.points[$][0], e.y + e.points[$][1]));
		if (w.forEach(($) => {
			I.push(u(e.x + (s ? s.end[0] : 0) + $[0], e.y + (s ? s.end[1] : 0) + $[1]));
		}), d) for (let $ = d.index; $ < e.points.length; $++) I.push(u(e.x + e.points[$][0], e.y + e.points[$][1]));
		let S = (d?.index ?? e.points.length) - (s?.index ?? 0) - 1, v = t.map(($) => $.index > a ? {
			...$,
			index: $.index - S + (w.length - 1)
		} : $);
		return In(I.flatMap(($, N) => {
			let B = I[N - 1], _ = I[N + 1];
			if (B && _) {
				let W = tr($, B), be = tr(_, $);
				if (ve(W, be)) return v.forEach((V) => {
					V.index > N && (V.index -= 1);
				}), [];
				if (ve(W, Ma(be))) return v.forEach((V) => {
					V.index > N && (V.index += 1);
				}), [$, $];
			}
			return [$];
		}), v, !1, !1);
	}, T7 = (e, t, n, r, o, i) => {
		let a = t.map((I, S) => e.fixedSegments == null || e.fixedSegments[S] === void 0 || e.fixedSegments[S].index !== I.index || (I.start[0] !== e.fixedSegments[S].start[0] && I.end[0] !== e.fixedSegments[S].end[0]) != (I.start[1] !== e.fixedSegments[S].start[1] && I.end[1] !== e.fixedSegments[S].end[1]) ? S : null).filter((I) => I !== null).shift();
		if (a == null) return { points: e.points };
		let s = e.fixedSegments?.findIndex((I) => I.index === 1) ?? -1, d = e.fixedSegments?.findIndex((I) => I.index === e.points.length - 1) ?? -1, c = ie(t[a].start, t[a].end), l = c < pe + 5;
		if (s === -1 && t[a].index === 1 && o) {
			let I = Lt(n), v = (I ? ve(n, Re) : ve(n, Fe)) ? l ? c / 2 : pe : l ? -c / 2 : -pe;
			t[a].start = u(t[a].start[0] + (I ? v : 0), t[a].start[1] + (I ? 0 : v));
		}
		if (d === -1 && t[a].index === e.points.length - 1 && i) {
			let I = Lt(r), v = (I ? ve(r, Re) : ve(r, Fe)) ? l ? c / 2 : pe : l ? -c / 2 : -pe;
			t[a].end = u(t[a].end[0] + (I ? v : 0), t[a].end[1] + (I ? 0 : v));
		}
		let U = t.map((I) => ({
			...I,
			start: u(e.x + I.start[0], e.y + I.start[1]),
			end: u(e.x + I.end[0], e.y + I.end[1])
		})), p = e.points.map((I, S) => u(e.x + I[0], e.y + I[1])), m = U[a].index - 1, b = U[a].index, E = U[a].start, g = U[a].end, h = p[m - 1] && !_e(p[m], p[m - 1]) ? Mt(p[m - 1], p[m]) : void 0, x = p[b + 1] && !_e(p[b], p[b + 1]) ? Mt(p[b + 1], p[b]) : void 0;
		if (h !== void 0) {
			let I = h ? 1 : 0;
			p[m - 1][I] = E[I];
		}
		if (p[m] = E, p[b] = g, x !== void 0) {
			let I = x ? 1 : 0;
			p[b + 1][I] = g[I];
		}
		let y = U.findIndex((I) => I.index === m);
		if (y !== -1) {
			let I = Mt(U[y].end, U[y].start) ? 1 : 0;
			U[y].start[I] = E[I], U[y].end = E;
		}
		let w = U.findIndex((I) => I.index === b + 1);
		if (w !== -1) {
			let I = Mt(U[w].end, U[w].start) ? 1 : 0;
			U[w].end[I] = g[I], U[w].start = g;
		}
		if (s === -1 && m === 0) {
			let I = o ? Lt(n) : Mt(p[1], p[0]);
			p.unshift(u(I ? E[0] : e.x + e.points[0][0], I ? e.y + e.points[0][1] : E[1])), o && p.unshift(u(e.x + e.points[0][0], e.y + e.points[0][1]));
			for (let S of U) S.index += o ? 2 : 1;
		}
		if (d === -1 && b === e.points.length - 1) {
			let I = Lt(r);
			p.push(u(I ? g[0] : e.x + e.points[e.points.length - 1][0], I ? e.y + e.points[e.points.length - 1][1] : g[1])), i && p.push(u(e.x + e.points[e.points.length - 1][0], e.y + e.points[e.points.length - 1][1]));
		}
		return In(p, U.map((I) => ({
			...I,
			start: u(I.start[0] - e.x, I.start[1] - e.y),
			end: u(I.end[0] - e.x, I.end[1] - e.y)
		})), !1, !1);
	}, M7 = (e, t, n, r, o, i, a, s, d) => {
		let c = e.startIsSpecial ?? null, l = e.endIsSpecial ?? null, U = t.map((g, h) => h === 0 ? u(e.x + g[0], e.y + g[1]) : h === t.length - 1 ? u(e.x + g[0], e.y + g[1]) : u(e.x + e.points[h][0], e.y + e.points[h][1])), p = n.map((g) => ({
			...g,
			start: u(e.x + (g.start[0] - t[0][0]), e.y + (g.start[1] - t[0][1])),
			end: u(e.x + (g.end[0] - t[0][0]), e.y + (g.end[1] - t[0][1]))
		})), m = [], b = 2 + (c ? 1 : 0), E = 2 + (l ? 1 : 0);
		for (; m.length + b < U.length - E;) m.push(U[m.length + b]);
		{
			let g = U[c ? 2 : 1], h = U[c ? 3 : 2], x = Lt(r), y = Lt(Ht(O(g, h)));
			if (s && x === y) {
				let w = x ? ve(r, Re) : ve(r, Fe);
				if (m.unshift(u(y ? i[0] + (w ? pe : -pe) : h[0], y ? h[1] : i[1] + (w ? pe : -pe))), m.unshift(u(x ? i[0] + (w ? pe : -pe) : i[0], x ? i[1] : i[1] + (w ? pe : -pe))), !c) {
					c = !0;
					for (let I of p) I.index > 1 && (I.index += 1);
				}
			} else if (m.unshift(u(y ? i[0] : g[0], y ? g[1] : i[1])), c) {
				c = !1;
				for (let w of p) w.index > 1 && (w.index -= 1);
			}
			m.unshift(i);
		}
		{
			let g = U[U.length - (l ? 3 : 2)], h = U[U.length - (l ? 4 : 3)], x = Lt(o), y = Mt(h, g);
			if (d && x === y) {
				let w = x ? ve(o, Re) : ve(o, Fe);
				m.push(u(y ? a[0] + (w ? pe : -pe) : h[0], y ? h[1] : a[1] + (w ? pe : -pe))), m.push(u(x ? a[0] + (w ? pe : -pe) : a[0], x ? a[1] : a[1] + (w ? pe : -pe))), l || (l = !0);
			} else m.push(u(y ? a[0] : g[0], y ? g[1] : a[1])), l && (l = !1);
		}
		return m.push(a), In(m, p.map(({ index: g }) => ({
			index: g,
			start: m[g - 1],
			end: m[g]
		})).map((g) => ({
			...g,
			start: u(g.start[0] - i[0], g.start[1] - i[1]),
			end: u(g.end[0] - i[0], g.end[1] - i[1])
		})), c, l);
	}, ge = 1e6, Pi = (e, t, n, r) => {
		if (e.points.length < 2) return { points: n.points ?? e.points };
		(e.x < -ge || e.x > ge || e.y < -ge || e.y > ge || e.x + (n?.points?.[n?.points?.length - 1]?.[0] ?? 0) < -ge || e.x + (n?.points?.[n?.points?.length - 1]?.[0] ?? 0) > ge || e.y + (n?.points?.[n?.points?.length - 1]?.[1] ?? 0) < -ge || e.y + (n?.points?.[n?.points?.length - 1]?.[1] ?? 0) > ge || e.x + (e?.points?.[e?.points?.length - 1]?.[0] ?? 0) < -ge || e.x + (e?.points?.[e?.points?.length - 1]?.[0] ?? 0) > ge || e.y + (e?.points?.[e?.points?.length - 1]?.[1] ?? 0) < -ge || e.y + (e?.points?.[e?.points?.length - 1]?.[1] ?? 0) > ge) && console.error("Elbow arrow (or update) is outside reasonable bounds (> 1e6)", {
			arrow: e,
			updates: n
		}), e.x = se(e.x, -ge, ge), e.y = se(e.y, -ge, ge), n.points && (n.points = n.points.map(([h, x]) => u(se(h, -ge, ge), se(x, -ge, ge)))), c.PROD || (Ae(!n.points || n.points.length >= 2, "Updated point array length must match the arrow point length, contain exactly the new start and end points or not be specified at all (i.e. you can't add new points between start and end manually to elbow arrows)"), Ae(!e.fixedSegments || e.fixedSegments.map((h) => h.start[0] === h.end[0] || h.start[1] === h.end[1]).every(Boolean), "Fixed segments must be either horizontal or vertical"), Ae(!n.fixedSegments || n.fixedSegments.map((h) => h.start[0] === h.end[0] || h.start[1] === h.end[1]).every(Boolean), "Updates to fixed segments must be either horizontal or vertical"), Ae(e.points.slice(1).map((h, x) => h[0] === e.points[x][0] || h[1] === e.points[x][1]), "Elbow arrow segments must be either horizontal or vertical"));
		let o = n.points ? n.points && n.points.length === 2 ? e.points.map((h, x) => x === 0 ? n.points[0] : x === e.points.length - 1 ? n.points[1] : h) : n.points.slice() : e.points.slice(), i = typeof n.startBinding < "u" ? n.startBinding : e.startBinding, a = typeof n.endBinding < "u" ? n.endBinding : e.endBinding, s = i && cr(i.elementId, t), d = a && cr(a.elementId, t);
		if (t.size === 0 && Ni(o) || s?.id !== i?.elementId || d?.id !== a?.elementId) return In(o.map((h) => u(e.x + h[0], e.y + h[1])), e.fixedSegments, e.startIsSpecial, e.endIsSpecial);
		let { startHeading: c$2, endHeading: l, startGlobalPoint: U, endGlobalPoint: p, hoveredStartElement: m, hoveredEndElement: b, ...E } = fs({
			x: e.x,
			y: e.y,
			startBinding: i,
			endBinding: a,
			startArrowhead: e.startArrowhead,
			endArrowhead: e.endArrowhead,
			points: e.points
		}, t, o, s, d, r), g = n.fixedSegments ?? e.fixedSegments ?? [];
		return !n.points && !n.fixedSegments && !n.startBinding && !n.endBinding ? w7(e, t) : n.startBinding === e.startBinding && n.endBinding === e.endBinding && (n.points ?? []).every((h, x) => _e(h, e.points[x] ?? u(Infinity, Infinity))) ? {} : g.length === 0 ? In(us(ms(ps(e, {
			startHeading: c$2,
			endHeading: l,
			startGlobalPoint: U,
			endGlobalPoint: p,
			hoveredStartElement: m,
			hoveredEndElement: b,
			...E
		}) ?? [])), g, null, null) : (e.fixedSegments?.length ?? 0) > g.length ? R7(e, g, t) : n.points ? n.points && n.fixedSegments ? n : M7(e, o, g, c$2, l, U, p, m, b) : T7(e, g, c$2, l, m, b);
	}, fs = (e, t, n, r, o, i) => {
		let a = wr(n[0], Be(e.x, e.y)), s = wr(n[n.length - 1], Be(e.x, e.y)), d = r, c = o;
		if (i?.isDragging) {
			let v = Array.from(t.values());
			d = yp(a, t, v, i?.zoom) || r, c = yp(s, t, v, i?.zoom) || o;
		}
		let l = xp({
			...e,
			elbowed: !0,
			points: n
		}, "start", e.startBinding?.fixedPoint, a, r, d, i?.isDragging), U = xp({
			...e,
			elbowed: !0,
			points: n
		}, "end", e.endBinding?.fixedPoint, s, o, c, i?.isDragging), p = hp(l, U, t, d, a), m = hp(U, l, t, c, s), b = [
			l[0] - 2,
			l[1] - 2,
			l[0] + 2,
			l[1] + 2
		], E = [
			U[0] - 2,
			U[1] - 2,
			U[0] + 2,
			U[1] + 2
		], g = d ? wt(d, yn(p, e.startArrowhead ? me * 6 : me * 2, 1)) : b, h = c ? wt(c, yn(m, e.endArrowhead ? me * 6 : me * 2, 1)) : E, x = gn(l, c ? wt(c, yn(m, pe, pe)) : E) || gn(U, d ? wt(d, yn(p, pe, pe)) : b), y = wp(x ? [b, E] : [g, h]), w = S7(x ? b : g, x ? E : h, y, x ? yn(p, !d && !c ? 0 : pe, 0) : yn(p, !d && !c ? 0 : pe - (e.startArrowhead ? me * 6 : me * 2), pe), x ? yn(m, !d && !c ? 0 : pe, 0) : yn(m, !d && !c ? 0 : pe - (e.endArrowhead ? me * 6 : me * 2), pe), x, d && wt(d), c && wt(c));
		return {
			dynamicAABBs: w,
			startDonglePosition: gp(w[0], p, l),
			startGlobalPoint: l,
			startHeading: p,
			endDonglePosition: gp(w[1], m, U),
			endGlobalPoint: U,
			endHeading: m,
			commonBounds: y,
			hoveredStartElement: d,
			hoveredEndElement: c,
			boundsOverlap: x,
			startElementBounds: g,
			endElementBounds: h
		};
	}, ps = (e, t) => {
		let { dynamicAABBs: n, startDonglePosition: r, startGlobalPoint: o, startHeading: i, endDonglePosition: a, endGlobalPoint: s, endHeading: d, commonBounds: c, hoveredEndElement: l } = t, U = v7(n, r || o, i, a || s, d, c), p = r && $i(r, U), m = a && $i(a, U), b = $i(s, U);
		b && l && (b.closed = !0);
		let E = $i(o, U);
		E && e.startBinding && (E.closed = !0);
		let g = p && m && (gn(p.pos, n[1]) || gn(m.pos, n[0])), h = L7(p || E, m || b, U, i || Re, d || Re, g ? [] : n);
		if (h) {
			let x = h.map((y) => [y.pos[0], y.pos[1]]);
			return p && x.unshift(o), m && x.push(s), x;
		}
		return null;
	}, yn = (e, t, n) => {
		switch (e) {
			case ze: return [
				t,
				n,
				n,
				n
			];
			case Re: return [
				n,
				t,
				n,
				n
			];
			case Fe: return [
				n,
				n,
				t,
				n
			];
		}
		return [
			n,
			n,
			n,
			t
		];
	}, L7 = (e, t, n, r, o, i) => {
		let a = ls(e.pos, t.pos), s = new ro((d) => d.f);
		for (s.push(e); s.size() > 0;) {
			let d = s.pop();
			if (!d || d.closed) continue;
			if (d === t) return D7(e, d);
			d.closed = !0;
			let c = P7(d.addr, n);
			for (let l = 0; l < 4; l++) {
				let U = c[l];
				if (!U || U.closed) continue;
				let p = bt(U.pos, d.pos, .5);
				if (xd(...i.map((w) => gn(p, w)))) continue;
				let m = N7(l), b = d.parent ? Ht(O(d.pos, d.parent.pos)) : r;
				if (ve(Ma(b), m) || Ip(e.addr, U.addr) && ve(m, r) || Ip(t.addr, U.addr) && ve(m, o)) continue;
				let h = b !== m, x = d.g + ls(U.pos, d.pos) + (h ? Math.pow(a, 3) : 0), y = U.visited;
				if (!y || x < U.g) {
					let w = $7(U, t, m, o);
					U.visited = !0, U.parent = d, U.h = ls(t.pos, U.pos) + w * Math.pow(a, 2), U.g = x, U.f = U.g + U.h, y ? s.rescoreElement(U) : s.push(U);
				}
			}
		}
		return null;
	}, D7 = (e, t) => {
		let n = t, r = [];
		for (; n.parent;) r.unshift(n), n = n.parent;
		return r.unshift(e), r;
	}, ls = (e, t) => Math.abs(e[0] - t[0]) + Math.abs(e[1] - t[1]), S7 = (e, t, n, r, o, i, a, s) => {
		let d = a ?? e, c = s ?? t, [l, U, p, m] = r ?? [
			0,
			0,
			0,
			0
		], [b, E, g, h] = o ?? [
			0,
			0,
			0,
			0
		], x = [
			e[0] > t[2] ? e[1] > t[3] || e[3] < t[1] ? Math.min((d[0] + c[2]) / 2, e[0] - m) : (d[0] + c[2]) / 2 : e[0] > t[0] ? e[0] - m : n[0] - m,
			e[1] > t[3] ? e[0] > t[2] || e[2] < t[0] ? Math.min((d[1] + c[3]) / 2, e[1] - l) : (d[1] + c[3]) / 2 : e[1] > t[1] ? e[1] - l : n[1] - l,
			e[2] < t[0] ? e[1] > t[3] || e[3] < t[1] ? Math.max((d[2] + c[0]) / 2, e[2] + U) : (d[2] + c[0]) / 2 : e[2] < t[2] ? e[2] + U : n[2] + U,
			e[3] < t[1] ? e[0] > t[2] || e[2] < t[0] ? Math.max((d[3] + c[1]) / 2, e[3] + p) : (d[3] + c[1]) / 2 : e[3] < t[3] ? e[3] + p : n[3] + p
		], y = [
			t[0] > e[2] ? t[1] > e[3] || t[3] < e[1] ? Math.min((c[0] + d[2]) / 2, t[0] - h) : (c[0] + d[2]) / 2 : t[0] > e[0] ? t[0] - h : n[0] - h,
			t[1] > e[3] ? t[0] > e[2] || t[2] < e[0] ? Math.min((c[1] + d[3]) / 2, t[1] - b) : (c[1] + d[3]) / 2 : t[1] > e[1] ? t[1] - b : n[1] - b,
			t[2] < e[0] ? t[1] > e[3] || t[3] < e[1] ? Math.max((c[2] + d[0]) / 2, t[2] + E) : (c[2] + d[0]) / 2 : t[2] < e[2] ? t[2] + E : n[2] + E,
			t[3] < e[1] ? t[0] > e[2] || t[2] < e[0] ? Math.max((c[3] + d[1]) / 2, t[3] + g) : (c[3] + d[1]) / 2 : t[3] < e[3] ? t[3] + g : n[3] + g
		], w = wp([x, y]);
		if (!i && x[2] - x[0] + y[2] - y[0] > w[2] - w[0] + 1e-11 && x[3] - x[1] + y[3] - y[1] > w[3] - w[1] + 1e-11) {
			let [I, S] = [(y[0] + y[2]) / 2, (y[1] + y[3]) / 2];
			if (t[0] > e[2] && e[1] > t[3]) {
				let v = x[2] + (y[0] - x[2]) / 2, D = y[3] + (x[1] - y[3]) / 2;
				return Me(Be(e[2] - I, e[1] - S), Be(e[0] - I, e[3] - S)) > 0 ? [[
					x[0],
					x[1],
					v,
					x[3]
				], [
					v,
					y[1],
					y[2],
					y[3]
				]] : [[
					x[0],
					D,
					x[2],
					x[3]
				], [
					y[0],
					y[1],
					y[2],
					D
				]];
			} else if (e[2] < t[0] && e[3] < t[1]) {
				let v = x[2] + (y[0] - x[2]) / 2, D = x[3] + (y[1] - x[3]) / 2;
				return Me(Be(e[0] - I, e[1] - S), Be(e[2] - I, e[3] - S)) > 0 ? [[
					x[0],
					x[1],
					x[2],
					D
				], [
					y[0],
					D,
					y[2],
					y[3]
				]] : [[
					x[0],
					x[1],
					v,
					x[3]
				], [
					v,
					y[1],
					y[2],
					y[3]
				]];
			} else if (e[0] > t[2] && e[3] < t[1]) {
				let v = y[2] + (x[0] - y[2]) / 2, D = x[3] + (y[1] - x[3]) / 2;
				return Me(Be(e[2] - I, e[1] - S), Be(e[0] - I, e[3] - S)) > 0 ? [[
					v,
					x[1],
					x[2],
					x[3]
				], [
					y[0],
					y[1],
					v,
					y[3]
				]] : [[
					x[0],
					x[1],
					x[2],
					D
				], [
					y[0],
					D,
					y[2],
					y[3]
				]];
			} else if (e[0] > t[2] && e[1] > t[3]) {
				let v = y[2] + (x[0] - y[2]) / 2, D = y[3] + (x[1] - y[3]) / 2;
				return Me(Be(e[0] - I, e[1] - S), Be(e[2] - I, e[3] - S)) > 0 ? [[
					v,
					x[1],
					x[2],
					x[3]
				], [
					y[0],
					y[1],
					v,
					y[3]
				]] : [[
					x[0],
					D,
					x[2],
					x[3]
				], [
					y[0],
					y[1],
					y[2],
					D
				]];
			}
		}
		return [x, y];
	}, v7 = (e, t, n, r, o, i) => {
		let a = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set();
		n === nt || n === Re ? s.add(t[1]) : a.add(t[0]), o === nt || o === Re ? s.add(r[1]) : a.add(r[0]), e.forEach((l) => {
			a.add(l[0]), a.add(l[2]), s.add(l[1]), s.add(l[3]);
		}), a.add(i[0]), a.add(i[2]), s.add(i[1]), s.add(i[3]);
		let d = Array.from(s).sort((l, U) => l - U), c = Array.from(a).sort((l, U) => l - U);
		return {
			row: d.length,
			col: c.length,
			data: d.flatMap((l, U) => c.map((p, m) => ({
				f: 0,
				g: 0,
				h: 0,
				closed: !1,
				visited: !1,
				parent: null,
				addr: [m, U],
				pos: [p, l]
			})))
		};
	}, gp = (e, t, n) => {
		switch (t) {
			case ze: return u(n[0], e[1]);
			case Re: return u(e[2], n[1]);
			case Fe: return u(n[0], e[3]);
		}
		return u(e[0], n[1]);
	}, $7 = (e, t, n, r) => {
		if (r === Re) switch (n) {
			case Re: return e.pos[0] >= t.pos[0] ? 4 : e.pos[1] === t.pos[1] ? 0 : 2;
			case ze: return e.pos[1] > t.pos[1] && e.pos[0] < t.pos[0] ? 1 : 3;
			case Fe: return e.pos[1] < t.pos[1] && e.pos[0] < t.pos[0] ? 1 : 3;
			case nt: return e.pos[1] === t.pos[1] ? 4 : 2;
		}
		else if (r === nt) switch (n) {
			case Re: return e.pos[1] === t.pos[1] ? 4 : 2;
			case ze: return e.pos[1] > t.pos[1] && e.pos[0] > t.pos[0] ? 1 : 3;
			case Fe: return e.pos[1] < t.pos[1] && e.pos[0] > t.pos[0] ? 1 : 3;
			case nt: return e.pos[0] <= t.pos[0] ? 4 : e.pos[1] === t.pos[1] ? 0 : 2;
		}
		else if (r === ze) switch (n) {
			case Re: return e.pos[1] > t.pos[1] && e.pos[0] < t.pos[0] ? 1 : 3;
			case ze: return e.pos[1] >= t.pos[1] ? 4 : e.pos[0] === t.pos[0] ? 0 : 2;
			case Fe: return e.pos[0] === t.pos[0] ? 4 : 2;
			case nt: return e.pos[1] > t.pos[1] && e.pos[0] > t.pos[0] ? 1 : 3;
		}
		else if (r === Fe) switch (n) {
			case Re: return e.pos[1] < t.pos[1] && e.pos[0] < t.pos[0] ? 1 : 3;
			case ze: return e.pos[0] === t.pos[0] ? 4 : 2;
			case Fe: return e.pos[1] <= t.pos[1] ? 4 : e.pos[0] === t.pos[0] ? 0 : 2;
			case nt: return e.pos[1] < t.pos[1] && e.pos[0] > t.pos[0] ? 1 : 3;
		}
		return 0;
	}, P7 = ([e, t], n) => [
		oo([e, t - 1], n),
		oo([e + 1, t], n),
		oo([e, t + 1], n),
		oo([e - 1, t], n)
	], oo = ([e, t], n) => e < 0 || e >= n.col || t < 0 || t >= n.row ? null : n.data[t * n.col + e] ?? null, $i = (e, t) => {
		for (let n = 0; n < t.col; n++) for (let r = 0; r < t.row; r++) {
			let o = oo([n, r], t);
			if (o && e[0] === o.pos[0] && e[1] === o.pos[1]) return o;
		}
		return null;
	}, wp = (e) => [
		Math.min(...e.map((t) => t[0])),
		Math.min(...e.map((t) => t[1])),
		Math.max(...e.map((t) => t[2])),
		Math.max(...e.map((t) => t[3]))
	], cr = (e, t) => {
		let n = t.get(e);
		return n && xt(n) ? n : null;
	}, In = (e, t, n, r) => {
		let o = e[0][0], i = e[0][1], a = e.map((s) => wr(s, ue(O(e[0]), -1)));
		return (o < -ge || o > ge || i < -ge || i > ge || o + a[a.length - 1][0] < -ge || i + a[a.length - 1][0] > ge || o + a[a.length - 1][1] < -ge || i + a[a.length - 1][1] > ge) && console.error("Elbow arrow normalization is outside reasonable bounds (> 1e6)", {
			x: o,
			y: i,
			points: a,
			...xn(a)
		}), a = a.map(([s, d]) => u(se(s, -1e6, 1e6), se(d, -1e6, 1e6))), {
			points: a,
			x: se(o, -1e6, 1e6),
			y: se(i, -1e6, 1e6),
			fixedSegments: (t?.length ?? 0) > 0 ? t : null,
			...xn(a),
			startIsSpecial: n,
			endIsSpecial: r
		};
	}, us = (e) => {
		if (e.length > 1) {
			let t = Math.abs(e[0][1] - e[1][1]) < Math.abs(e[0][0] - e[1][0]);
			return e.filter((n, r) => {
				if (r === 0 || r === e.length - 1) return !0;
				let o = e[r + 1], i = Math.abs(n[1] - o[1]) < Math.abs(n[0] - o[0]);
				return t === i ? (t = i, !1) : (t = i, !0);
			});
		}
		return e;
	}, ms = (e) => e.length >= 4 ? e.filter((t, n) => {
		if (n === 0 || n === e.length - 1) return !0;
		let r = e[n - 1];
		return ie(r, t) > Us;
	}) : e, N7 = (e) => {
		switch (e) {
			case 0: return ze;
			case 1: return Re;
			case 2: return Fe;
		}
		return nt;
	}, xp = (e, t, n, r, o, i, a) => {
		if (a) {
			if (i) return s2(i, fi(e, i, t));
			return r;
		}
		if (o) {
			let s = Ui(n || [0, 0], o);
			return Math.abs(or(o, s) - me) > .01 ? fi(e, o, t) : s;
		}
		return r;
	}, hp = (e, t, n, r, o) => a2(e, t, r, r && wt(r, Array(4).fill(or(r, e))), n, o), yp = (e, t, n, r) => Bn(un(e), n, t, r, !0, !0), Ip = (e, t) => e[0] === t[0] && e[1] === t[1], Ni = (e, t = Us) => e.slice(1).map((n, r) => Math.abs(n[0] - e[r][0]) < t || Math.abs(n[1] - e[r][1]) < t).every(Boolean);
	F7 = {
		selection: !0,
		text: !0,
		rectangle: !0,
		diamond: !0,
		ellipse: !0,
		line: !0,
		image: !0,
		arrow: !0,
		freedraw: !0,
		eraser: !1,
		custom: !0,
		frame: !0,
		embeddable: !0,
		hand: !0,
		laser: !1,
		magicframe: !1
	}, B7 = (e) => Object.keys(Ie).includes(e) ? Ie[e] : Ft, lr = (e, t) => {
		if (!t) return null;
		let n = t.focus || 0;
		return X(e) ? vn(t) ? {
			...t,
			focus: n,
			fixedPoint: Yr(t.fixedPoint ?? [0, 0])
		} : null : {
			...t,
			focus: n
		};
	}, wn = (e, t) => {
		let n = {
			type: t.type || e.type,
			version: e.version || 1,
			versionNonce: e.versionNonce ?? 0,
			index: e.index ?? null,
			isDeleted: e.isDeleted ?? !1,
			id: e.id || Dt(),
			fillStyle: e.fillStyle || we.fillStyle,
			strokeWidth: e.strokeWidth || we.strokeWidth,
			strokeStyle: e.strokeStyle ?? we.strokeStyle,
			roughness: e.roughness ?? we.roughness,
			opacity: e.opacity == null ? we.opacity : e.opacity,
			angle: e.angle || 0,
			x: t.x ?? e.x ?? 0,
			y: t.y ?? e.y ?? 0,
			strokeColor: e.strokeColor || we.strokeColor,
			backgroundColor: e.backgroundColor || we.backgroundColor,
			width: e.width || 0,
			height: e.height || 0,
			seed: e.seed ?? 1,
			groupIds: e.groupIds ?? [],
			frameId: e.frameId ?? null,
			roundness: e.roundness ? e.roundness : e.strokeSharpness === "round" ? { type: Oo(e.type) ? ot.LEGACY : ot.PROPORTIONAL_RADIUS } : null,
			boundElements: e.boundElementIds ? e.boundElementIds.map((r) => ({
				type: "arrow",
				id: r
			})) : e.boundElements ?? [],
			updated: e.updated ?? zt(),
			link: e.link ? dn(e.link) : null,
			locked: e.locked ?? !1
		};
		return ("customData" in e || "customData" in t) && (n.customData = "customData" in t ? t.customData : e.customData), {
			...e,
			...n,
			...bs(n),
			...t
		};
	}, _7 = (e) => {
		switch (e = { ...e }, e.type) {
			case "text":
				delete e.rawText;
				let t = e.fontSize, n = e.fontFamily;
				if ("font" in e) {
					let [l, U] = e.font.split(" ");
					t = parseFloat(l), n = B7(U);
				}
				let r = typeof e.text == "string" && e.text || "", o = e.lineHeight || (e.height ? Md(e) : ko(e.fontFamily));
				return e = wn(e, {
					fontSize: t,
					fontFamily: n,
					text: r,
					textAlign: e.textAlign || "left",
					verticalAlign: e.verticalAlign || "top",
					containerId: e.containerId ?? null,
					originalText: e.originalText || r,
					autoResize: e.autoResize ?? !0,
					lineHeight: o
				}), !r && !e.isDeleted && (e = {
					...e,
					originalText: r,
					isDeleted: !0
				}, e = kr(e)), e;
			case "freedraw": return wn(e, {
				points: e.points,
				lastCommittedPoint: null,
				simulatePressure: e.simulatePressure,
				pressures: e.pressures
			});
			case "image": return wn(e, {
				status: e.status || "pending",
				fileId: e.fileId,
				scale: e.scale || [1, 1],
				crop: e.crop ?? null
			});
			case "line":
			case "draw":
				let { startArrowhead: i = null, endArrowhead: a = null } = e, s = e.x, d = e.y, c = !Array.isArray(e.points) || e.points.length < 2 ? [u(0, 0), u(e.width, e.height)] : e.points;
				return (c[0][0] !== 0 || c[0][1] !== 0) && ({points: c, x: s, y: d} = z.getNormalizedPoints(e)), wn(e, {
					type: e.type === "draw" ? "line" : e.type,
					startBinding: lr(e, e.startBinding),
					endBinding: lr(e, e.endBinding),
					lastCommittedPoint: null,
					startArrowhead: i,
					endArrowhead: a,
					points: c,
					x: s,
					y: d,
					...xn(c)
				});
			case "arrow": {
				let { startArrowhead: l = null, endArrowhead: U = "arrow" } = e, p = e.x, m = e.y, b = !Array.isArray(e.points) || e.points.length < 2 ? [u(0, 0), u(e.width, e.height)] : e.points;
				(b[0][0] !== 0 || b[0][1] !== 0) && ({points: b, x: p, y: m} = z.getNormalizedPoints(e));
				let E = {
					type: e.type,
					startBinding: lr(e, e.startBinding),
					endBinding: lr(e, e.endBinding),
					lastCommittedPoint: null,
					startArrowhead: l,
					endArrowhead: U,
					points: b,
					x: p,
					y: m,
					elbowed: e.elbowed,
					...xn(b)
				};
				return X(e) ? wn(e, {
					...E,
					elbowed: !0,
					startBinding: lr(e, e.startBinding),
					endBinding: lr(e, e.endBinding),
					fixedSegments: e.fixedSegments,
					startIsSpecial: e.startIsSpecial,
					endIsSpecial: e.endIsSpecial
				}) : wn(e, E);
			}
			case "ellipse":
			case "rectangle":
			case "diamond":
			case "iframe":
			case "embeddable": return wn(e, {});
			case "magicframe":
			case "frame": return wn(e, { name: e.name ?? null });
		}
		return null;
	}, O7 = (e, t) => {
		if (e.boundElements) {
			let n = e.boundElements.slice(), r = /* @__PURE__ */ new Set();
			e.boundElements = n.reduce((o, i) => {
				let a = t.get(i.id);
				if (a && !r.has(i.id)) {
					if (r.add(i.id), a.isDeleted) return o;
					o.push(i), k(a) && !a.containerId && (a.containerId = e.id);
				}
				return o;
			}, []);
		}
	}, A7 = (e, t) => {
		let n = e.containerId ? t.get(e.containerId) : null;
		if (!n) {
			e.containerId = null;
			return;
		}
		if (!e.isDeleted && n.boundElements && !n.boundElements.find((r) => r.id === e.id)) {
			let r = (n.boundElements || (n.boundElements = [])).slice();
			r.push({
				type: "text",
				id: e.id
			}), n.boundElements = r;
		}
	}, K7 = (e, t) => {
		e.frameId && (t.get(e.frameId) || (e.frameId = null));
	}, Mp = (e, t, n) => {
		let r = /* @__PURE__ */ new Set(), o = t ? te(t) : null, i = An((e || []).reduce((s, d) => {
			if (d.type !== "selection" && !ao(d)) {
				let c = _7(d);
				if (c) {
					let l = o?.get(d.id);
					l && l.version > c.version && (c = kr(c, l.version)), r.has(c.id) && (c = {
						...c,
						id: Dt()
					}), r.add(c.id), s.push(c);
				}
			}
			return s;
		}, []));
		if (!n?.repairBindings) return i;
		let a = te(i);
		for (let s of i) s.frameId && K7(s, a), k(s) && s.containerId ? A7(s, a) : s.boundElements && O7(s, a), n.refreshDimensions && k(s) && Object.assign(s, Ga(s, qe(s, a), a)), ae(s) && (s.startBinding && (!a.has(s.startBinding.elementId) || !ee(s)) && (s.startBinding = null), s.endBinding && (!a.has(s.endBinding.elementId) || !ee(s)) && (s.endBinding = null));
		return i.map((s) => {
			if (X(s) && s.startBinding == null && s.endBinding == null && !Ni(s.points)) return {
				...s,
				...Pi(s, a, { points: [u(0, 0), s.points[s.points.length - 1]] }),
				index: s.index
			};
			if (X(s) && s.startBinding && s.endBinding && s.startBinding.elementId === s.endBinding.elementId && s.points.length > 1 && s.points.some(([d, c]) => Math.abs(d) > 1e6 || Math.abs(c) > 1e6)) {
				console.error("Fixing self-bound elbow arrow", s.id);
				let d = a.get(s.startBinding.elementId);
				return d ? {
					...s,
					x: d.x + d.width / 2,
					y: d.y - 5,
					width: d.width,
					height: d.height,
					points: [
						u(0, 0),
						u(0, -10),
						u(d.width / 2 + 5, -10),
						u(d.width / 2 + 5, d.height / 2 + 5)
					]
				} : (console.error("Bound element not found", s.startBinding.elementId), s);
			}
			return s;
		});
	}, H7 = (e, t, n) => {
		let r = t[e];
		return r !== void 0 ? r : n[e];
	}, Rp = { isSidebarDocked: (e, t) => ["defaultSidebarDockedPreference", e.isSidebarDocked ?? H7("defaultSidebarDockedPreference", e, t)] }, J7 = (e, t) => {
		e = e || {};
		let n = mt(), r = {};
		for (let o of Object.keys(Rp)) if (o in e) {
			let [i, a] = Rp[o](e, n);
			r[i] = a;
		}
		for (let [o, i] of Object.entries(n)) {
			let a = e[o], s = t ? t[o] : void 0;
			r[o] = a !== void 0 ? a : s !== void 0 ? s : i;
		}
		return {
			...r,
			cursorButton: t?.cursorButton || "up",
			penDetected: t?.penDetected ?? (e.penMode ? e.penDetected ?? !1 : !1),
			activeTool: {
				...$r(n, r.activeTool.type && F7[r.activeTool.type] ? r.activeTool : { type: "selection" }),
				lastActiveTool: null,
				locked: r.activeTool.locked ?? !1
			},
			zoom: { value: Oa(Mo(e.zoom) ? e.zoom : e.zoom?.value ?? n.zoom.value) },
			openSidebar: typeof e.openSidebar == "string" ? { name: ks.name } : r.openSidebar,
			gridSize: Aa(Mo(e.gridSize) ? e.gridSize : 20),
			gridStep: Ka(Mo(e.gridStep) ? e.gridStep : ho),
			editingFrame: null
		};
	}, io = (e, t, n, r) => ({
		elements: Mp(e?.elements, n, r),
		appState: J7(e?.appState, t || null),
		files: e?.files || {}
	}), Tp = (e) => {
		let t = Mp(Es(e.elements), null);
		return t.length ? {
			...e,
			elements: t
		} : null;
	}, Lp = (e = [], t) => {
		let n = [];
		for (let r of e) if (Array.isArray(r)) {
			let o = Tp({
				status: t,
				elements: r,
				id: Dt(),
				created: Date.now()
			});
			o && n.push(o);
		} else {
			let o = r, i = Tp({
				...o,
				id: o.id || Dt(),
				status: o.status || t,
				created: o.created || Date.now()
			});
			i && n.push(i);
		}
		return n;
	};
	$t = 32, xe = 12, Rn = 256, Sp = 50, Kn = "NOT_SPREADSHEET", Ur = "VALID_SPREADSHEET", so = (e) => {
		let t = /^([-+]?)[$€£¥₩]?([-+]?)([\d.,]+)[%]?$/.exec(e);
		return t ? parseFloat(`${(t[1] || t[2]) + t[3]}`.replace(/,/g, "")) : null;
	}, gs = (e, t) => e.slice(1).every((n) => so(n[t]) !== null), Dp = (e) => {
		let t = e[0].length;
		if (t > 2) return {
			type: Kn,
			reason: "More than 2 columns"
		};
		if (t === 1) {
			if (!gs(e, 0)) return {
				type: Kn,
				reason: "Value is not numeric"
			};
			let d = so(e[0][0]) === null, c = (d ? e.slice(1) : e).map((l) => so(l[0]));
			return c.length < 2 ? {
				type: Kn,
				reason: "Less than two rows"
			} : {
				type: Ur,
				spreadsheet: {
					title: d ? e[0][0] : null,
					labels: null,
					values: c
				}
			};
		}
		let n = gs(e, 0), r = gs(e, 1);
		if (!n && !r) return {
			type: Kn,
			reason: "Value is not numeric"
		};
		let [o, i] = r ? [0, 1] : [1, 0], a = so(e[0][i]) === null, s = a ? e.slice(1) : e;
		return s.length < 2 ? {
			type: Kn,
			reason: "Less than 2 rows"
		} : {
			type: Ur,
			spreadsheet: {
				title: a ? e[0][i] : null,
				labels: s.map((d) => d[o]),
				values: s.map((d) => so(d[i]))
			}
		};
	}, Y7 = (e) => {
		let t = [];
		for (let n = 0; n < e[0].length; n++) {
			let r = [];
			for (let o = 0; o < e.length; o++) r.push(e[o][n]);
			t.push(r);
		}
		return t;
	}, vp = (e) => {
		let t = e.trim().split(`
`).map((i) => i.trim().split("	"));
		if (t.length && t[0].length !== 2 && (t = e.trim().split(`
`).map((i) => i.trim().split(","))), t.length === 0) return {
			type: Kn,
			reason: "No values"
		};
		let n = t[0].length;
		if (!t.every((i) => i.length === n)) return {
			type: Kn,
			reason: "All rows don't have same number of columns"
		};
		let o = Dp(t);
		if (o.type !== Ur) {
			let i = Dp(Y7(t));
			if (i.type === Ur) return i;
		}
		return o;
	}, Fi = Fs(Ps), lt = {
		fillStyle: "hachure",
		fontFamily: Ft,
		fontSize: 20,
		opacity: 100,
		roughness: 1,
		strokeColor: Z.black,
		roundness: null,
		strokeStyle: "solid",
		strokeWidth: 1,
		verticalAlign: kt.MIDDLE,
		locked: !1
	}, $p = (e) => {
		return {
			chartWidth: ($t + xe) * e.values.length + xe,
			chartHeight: Rn + xe * 2
		};
	}, C7 = (e, t, n, r, o) => e.labels?.map((i, a) => qt({
		groupIds: [r],
		backgroundColor: o,
		...lt,
		text: i.length > 8 ? `${i.slice(0, 5)}...` : i,
		x: t + a * ($t + xe) + xe * 2,
		y: n + xe / 2,
		width: $t,
		angle: 5.87,
		fontSize: 16,
		textAlign: "center",
		verticalAlign: "top"
	})) || [], V7 = (e, t, n, r, o) => {
		let i = qt({
			groupIds: [r],
			backgroundColor: o,
			...lt,
			x: t - xe,
			y: n - xe,
			text: "0",
			textAlign: "right"
		});
		return [i, qt({
			groupIds: [r],
			backgroundColor: o,
			...lt,
			x: t - xe,
			y: n - Rn - i.height / 2,
			text: Math.max(...e.values).toLocaleString(),
			textAlign: "right"
		})];
	}, q7 = (e, t, n, r, o) => {
		let { chartWidth: i, chartHeight: a } = $p(e);
		return [
			On({
				backgroundColor: o,
				groupIds: [r],
				...lt,
				type: "line",
				x: t,
				y: n,
				width: i,
				points: [u(0, 0), u(i, 0)]
			}),
			On({
				backgroundColor: o,
				groupIds: [r],
				...lt,
				type: "line",
				x: t,
				y: n,
				height: a,
				points: [u(0, 0), u(0, -a)]
			}),
			On({
				backgroundColor: o,
				groupIds: [r],
				...lt,
				type: "line",
				x: t,
				y: n - Rn - xe,
				strokeStyle: "dotted",
				width: i,
				opacity: Sp,
				points: [u(0, 0), u(i, 0)]
			})
		];
	}, Pp = (e, t, n, r, o, i) => {
		let { chartWidth: a, chartHeight: s } = $p(e), d = e.title ? qt({
			backgroundColor: o,
			groupIds: [r],
			...lt,
			text: e.title,
			x: t + a / 2,
			y: n - Rn - xe * 2 - 20,
			roundness: null,
			textAlign: "center"
		}) : null, c = i ? Xr({
			backgroundColor: o,
			groupIds: [r],
			...lt,
			type: "rectangle",
			x: t,
			y: n - s,
			width: a,
			height: s,
			strokeColor: Z.black,
			fillStyle: "solid",
			opacity: 6
		}) : null;
		return [
			...c ? [c] : [],
			...d ? [d] : [],
			...C7(e, t, n, r, o),
			...V7(e, t, n, r, o),
			...q7(e, t, n, r, o)
		];
	}, X7 = (e, t, n) => {
		let r = Math.max(...e.values), o = Dt(), i = Fi[Math.floor(Math.random() * Fi.length)];
		return [...e.values.map((s, d) => {
			let c = s / r * Rn;
			return Xr({
				backgroundColor: i,
				groupIds: [o],
				...lt,
				type: "rectangle",
				x: t + d * ($t + xe) + xe,
				y: n - c - xe,
				width: $t,
				height: c
			});
		}), ...Pp(e, t, n, o, i, c.DEV)];
	}, G7 = (e, t, n) => {
		let r = Math.max(...e.values), o = Dt(), i = Fi[Math.floor(Math.random() * Fi.length)], a = 0, s = [];
		for (let E of e.values) {
			let g = a * ($t + xe), h = -(E / r) * Rn;
			s.push([g, h]), a++;
		}
		let d = Math.max(...s.map((E) => E[0])), c$3 = Math.max(...s.map((E) => E[1])), l = Math.min(...s.map((E) => E[0])), U = Math.min(...s.map((E) => E[1])), p = On({
			backgroundColor: i,
			groupIds: [o],
			...lt,
			type: "line",
			x: t + xe + $t / 2,
			y: n - xe,
			height: c$3 - U,
			width: d - l,
			strokeWidth: 2,
			points: s
		}), m = e.values.map((E, g) => {
			let h = g * ($t + xe) + xe / 2, x = -(E / r) * Rn + xe / 2;
			return Xr({
				backgroundColor: i,
				groupIds: [o],
				...lt,
				fillStyle: "solid",
				strokeWidth: 2,
				type: "ellipse",
				x: t + h + $t / 2,
				y: n + x - xe * 2,
				width: xe,
				height: xe
			});
		}), b = e.values.map((E, g) => {
			let h = g * ($t + xe) + xe / 2, x = E / r * Rn + xe / 2 + xe;
			return On({
				backgroundColor: i,
				groupIds: [o],
				...lt,
				type: "line",
				x: t + h + $t / 2 + xe / 2,
				y: n - x,
				height: x,
				strokeStyle: "dotted",
				opacity: Sp,
				points: [u(0, 0), u(0, x)]
			});
		});
		return [
			...Pp(e, t, n, o, i, c.DEV),
			p,
			...b,
			...m
		];
	}, uK = (e, t, n, r) => e === "line" ? G7(t, n, r) : X7(t, n, r);
	"clipboard" in navigator && "readText" in navigator.clipboard;
	k7 = "clipboard" in navigator && "writeText" in navigator.clipboard, LK = "clipboard" in navigator && "write" in navigator.clipboard && "ClipboardItem" in window && "toBlob" in HTMLCanvasElement.prototype, Z7 = (e) => !!([
		Ze.excalidraw,
		Ze.excalidrawClipboard,
		Ze.excalidrawClipboardWithAPI
	].includes(e?.type) && Array.isArray(e.elements)), DK = ({ types: e, files: t }) => {
		!e && !t && console.warn("createPasteEvent: no types or files provided");
		let n = new ClipboardEvent("paste", { clipboardData: new DataTransfer() });
		if (e) for (let [r, o] of Object.entries(e)) {
			if (typeof o != "string") {
				t = t || [], t.push(o);
				continue;
			}
			try {
				if (n.clipboardData?.setData(r, o), n.clipboardData?.getData(r) !== o) throw new Error(`Failed to set "${r}" as clipboardData item`);
			} catch (i) {
				throw new Error(i.message);
			}
		}
		if (t) {
			let r = -1;
			for (let o of t) {
				r++;
				try {
					if (n.clipboardData?.items.add(o), n.clipboardData?.files[r] !== o) throw new Error(`Failed to set file "${o.name}" as clipboardData item`);
				} catch (i) {
					throw new Error(i.message);
				}
			}
		}
		return n;
	}, W7 = ({ elements: e, files: t }) => {
		let n = te(e), r = new Set(e.filter((s) => de(s))), o = !1, i = e.reduce((s, d) => (At(d) && (o = !0, t && t[d.fileId] && (s[d.fileId] = t[d.fileId])), s), {});
		o && !t && console.warn("copyToClipboard: attempting to file element(s) without providing associated `files` object.");
		let a = {
			type: Ze.excalidrawClipboard,
			elements: e.map((s) => {
				if (We(s, n) && !r.has(We(s, n))) {
					let d = Gr(s);
					return Y(d, { frameId: null }), d;
				}
				return s;
			}),
			files: t ? i : void 0
		};
		return JSON.stringify(a);
	}, Np = async (e, t, n) => {
		await hs(W7({
			elements: e,
			files: t
		}), n);
	}, z7 = (e) => {
		let t = vp(e);
		return t.type === Ur ? { spreadsheet: t.spreadsheet } : null;
	};
	Q7 = (e) => {
		let t = e.clipboardData?.getData(H.html);
		if (!t) return null;
		try {
			let r = Fp(new DOMParser().parseFromString(t, H.html).body);
			if (r.length) return {
				type: "mixedContent",
				value: r
			};
		} catch (n) {
			console.error(`error in parseHTMLFromPaste: ${n.message}`);
		}
		return null;
	}, SK = async () => {
		let e = {}, t;
		try {
			t = await navigator.clipboard?.read();
		} catch (n) {
			try {
				if (navigator.clipboard?.readText) {
					console.warn(`navigator.clipboard.readText() failed (${n.message}). Failling back to navigator.clipboard.read()`);
					let r = await navigator.clipboard?.readText();
					if (r) return { [H.text]: r };
				}
			} catch (r) {
				if (navigator.clipboard?.read) console.warn(`navigator.clipboard.readText() failed (${r.message}). Failling back to navigator.clipboard.read()`);
				else {
					if (r.name === "DataError") return console.warn(`navigator.clipboard.read() error, clipboard is probably empty: ${r.message}`), e;
					throw r;
				}
			}
			throw n;
		}
		for (let n of t) for (let r of n.types) if (Ed(Hs, r)) try {
			if (r === H.text || r === H.html) e[r] = await (await n.getType(r)).text();
			else if (xs(r)) e[r] = fr(await n.getType(r), r, void 0);
			else throw new Br(`Unsupported clipboard type: ${r}`);
		} catch (o) {
			console.warn(o instanceof Br ? o.message : `Cannot retrieve ${r} from clipboardItem: ${o.message}`);
		}
		return Object.keys(e).length === 0 && console.warn("No clipboard data found from clipboard.read()."), e;
	}, j7 = async (e, t = !1) => {
		try {
			let n = !t && e && Q7(e);
			return n ? n.value.every((o) => o.type === "text") ? {
				type: "text",
				value: e.clipboardData?.getData(H.text) || n.value.map((o) => o.value).join(`
`).trim()
			} : n : {
				type: "text",
				value: (e.clipboardData?.getData(H.text) || "").trim()
			};
		} catch {
			return {
				type: "text",
				value: ""
			};
		}
	}, vK = async (e, t = !1) => {
		let n = await j7(e, t);
		if (n.type === "mixedContent") return { mixedContent: n.value };
		try {
			let r = !t && z7(n.value);
			if (r) return r;
		} catch (r) {
			console.error(r);
		}
		try {
			let r = JSON.parse(n.value), o = r.type === Ze.excalidrawClipboardWithAPI;
			if (Z7(r)) return {
				elements: r.elements,
				files: r.files,
				text: t ? JSON.stringify(r.elements, null, 2) : void 0,
				programmaticAPI: o
			};
		} catch {}
		return { text: n.value };
	}, Bp = async (e) => {
		try {
			await navigator.clipboard.write([new window.ClipboardItem({ [H.png]: e })]);
		} catch (t) {
			if (Fo(e)) await navigator.clipboard.write([new window.ClipboardItem({ [H.png]: await e })]);
			else throw t;
		}
	}, hs = async (e, t) => {
		if (k7) try {
			await navigator.clipboard.writeText(e || "");
			return;
		} catch (n) {
			console.error(n);
		}
		try {
			if (t) {
				if (t.clipboardData?.setData(H.text, e || ""), t.clipboardData?.getData(H.text) !== e) throw new Error("Failed to setData on clipboardEvent");
				return;
			}
		} catch (n) {
			console.error(n);
		}
		if (!e9(e)) throw new Error("Error copying to clipboard.");
	}, e9 = (e) => {
		e || (e = " ");
		let t = document.documentElement.getAttribute("dir") === "rtl", n = document.createElement("textarea");
		n.style.border = "0", n.style.padding = "0", n.style.margin = "0", n.style.position = "absolute", n.style[t ? "right" : "left"] = "-9999px";
		let r = window.pageYOffset || document.documentElement.scrollTop;
		n.style.top = `${r}px`, n.style.fontSize = "12pt", n.setAttribute("readonly", ""), n.value = e, document.body.appendChild(n);
		let o = !1;
		try {
			n.select(), n.setSelectionRange(0, n.value.length), o = document.execCommand("copy");
		} catch (i) {
			console.error(i);
		}
		return n.remove(), o;
	};
	t9 = ({ elements: e, appState: t, files: n, maxWidthOrHeight: r, getDimensions: o, exportPadding: i, exportingFrame: a }) => {
		let { elements: s, appState: d } = io({
			elements: e,
			appState: t
		}, null, null), { exportBackground: c, viewBackgroundColor: l } = d;
		return pp(s, {
			...d,
			offsetTop: 0,
			offsetLeft: 0,
			width: 0,
			height: 0
		}, n || {}, {
			exportBackground: c,
			exportPadding: i,
			viewBackgroundColor: l,
			exportingFrame: a
		}, (U, p) => {
			let m = document.createElement("canvas");
			if (r) {
				typeof o == "function" && console.warn("`getDimensions()` is ignored when `maxWidthOrHeight` is supplied.");
				let E = Math.max(U, p), g = r < E ? r / E : t?.exportScale ?? 1;
				return m.width = U * g, m.height = p * g, {
					canvas: m,
					scale: g
				};
			}
			let b = o?.(U, p) || {
				width: U,
				height: p
			};
			return m.width = b.width, m.height = b.height, {
				canvas: m,
				scale: b.scale ?? 1
			};
		});
	}, r9 = async ({ elements: e, appState: t = mt(), files: n = {}, exportPadding: r, renderEmbeddables: o, exportingFrame: i, skipInliningFonts: a, reuseImages: s }) => {
		let { elements: d, appState: c } = io({
			elements: e,
			appState: t
		}, null, null);
		return up(d, {
			...c,
			exportPadding: r
		}, n, {
			exportingFrame: i,
			renderEmbeddables: o,
			skipInliningFonts: a,
			reuseImages: s
		});
	};
	o9 = (e) => e.type === "diamond" ? [
		u(e.width / 2, 0),
		u(e.width, e.height / 2),
		u(e.width / 2, e.height),
		u(0, e.height / 2)
	] : [
		u(0, 0),
		u(0 + e.width, 0),
		u(0 + e.width, e.height),
		u(0, e.height)
	], i9 = (e) => ae(e) || Ce(e) ? e.points : o9(e), Op = (e) => {
		let t = e.reduce((n, [r, o]) => (n.minY = Math.min(n.minY, o), n.minX = Math.min(n.minX, r), n.maxX = Math.max(n.maxX, r), n.maxY = Math.max(n.maxY, o), n), {
			minX: Infinity,
			minY: Infinity,
			maxX: -Infinity,
			maxY: -Infinity,
			cx: 0,
			cy: 0
		});
		return t.cx = (t.maxX + t.minX) / 2, t.cy = (t.maxY + t.minY) / 2, t;
	}, Kp = (e) => {
		let t = i9(e), { cx: n, cy: r } = Op(t), o = u(n, r), { minX: a, minY: s, maxX: d, maxY: c } = Op(t.map((l) => T(l, o, e.angle)));
		return [
			a + e.x,
			s + e.y,
			d + e.x,
			c + e.y
		];
	}, Ap = (e, t, n = !1) => {
		let r = Kp(e), o = t[0] <= r[0] && t[2] >= r[2] && t[1] <= r[1] && t[3] >= r[3];
		return n ? o ? !0 : r[0] <= t[0] && r[2] >= t[2] && r[1] <= t[1] && r[3] >= t[3] : o;
	}, a9 = (e, t) => {
		let n = Kp(e);
		return (Sr(n[0], Oe(t[0], t[2])) || Sr(t[0], Oe(n[0], n[2]))) && (Sr(n[1], Oe(t[1], t[3])) || Sr(t[1], Oe(n[1], n[3])));
	}, Hp = ({ elements: e, bounds: t, type: n, errorMargin: r = 0 }) => {
		ra(t) && (t = Ke(t, te(e)));
		let o = [
			t[0] - r,
			t[1] - r,
			t[2] + r,
			t[3] + r
		], i = /* @__PURE__ */ new Set();
		for (let a of e) {
			if (i.has(a.id)) continue;
			if (n === "overlap" ? a9(a, o) : n === "inside" ? Ap(a, o) : Ap(a, o, !0)) {
				if (i.add(a.id), a.boundElements) for (let d of a.boundElements) i.add(d.id);
				k(a) && a.containerId && i.add(a.containerId), ee(a) && (a.startBinding && i.add(a.startBinding.elementId), a.endBinding && i.add(a.endBinding?.elementId));
			}
		}
		return e.filter((a) => i.has(a.id));
	};
	d9 = 1e-6;
	uH = (e, t, n) => {
		let r = te(e);
		for (let o of t) if (o.frameId) {
			let i = n.get(o.id), a = n.get(o.frameId);
			if (i) {
				let s = r.get(i);
				s && Y(s, { frameId: a ?? o.frameId }, !1);
			}
		}
	};
	qp = (e, t, n) => _i(ui(e, t, n, !1)).filter((r) => !de(r) && !r.frameId || r.frameId === t.id), ws = (e, t, n) => ui([t], e, n).some((r) => r.id === t.id);
	Bi = (e, t, n) => {
		let [r, o, i, a] = C(t, n), [s, d, c, l] = $e(e);
		return r <= s && o <= d && i >= c && a >= l;
	}, hn = (e, t, n) => Bi([e], t, n) || Is(e, t, n) || ws(e, t, n), mH = (e, t, n) => {
		let [r, o, i, a] = C(t, n);
		return So(u(r, o), u(e.x, e.y), u(i, a));
	};
	bH = (e) => {
		let t = /* @__PURE__ */ new Map();
		for (let n of e) {
			let r = de(n) ? n.id : n.frameId;
			r && !t.has(r) && t.set(r, co(e, r));
		}
		return t;
	}, co = (e, t) => {
		let n = [];
		for (let r of e.values()) r.frameId === t && n.push(r);
		return n;
	}, ds = (e) => e.filter((t) => de(t)), cs = (e) => {
		let t = te(ds(e));
		return e.filter((n) => t.has(n.id) || !n.frameId || !t.has(n.frameId));
	}, EH = (e, t, n, r) => {
		let o = co(e, t.id), i = new Set(o), a = new Set([...qp(e, t, r), ...o.filter((p) => ws(p, t, r))]), s = o.filter((p) => !a.has(p)), d = new Set(Array.from(a).flatMap((p) => p.groupIds));
		for (let p of s) if (!Is(p, t, r)) p.groupIds.length === 0 && i.delete(p);
		else if (p.groupIds.length > 0) for (let m of p.groupIds) d.add(m);
		for (let p of s) if (p.groupIds.length > 0) {
			let m = !0;
			for (let b of p.groupIds) d.has(b) && (m = !1);
			m && i.delete(p);
		}
		let c = Array.from(a).filter((p) => p.groupIds.length === 0);
		for (let p of c) i.add(p);
		let U = p2(Array.from(a).filter((p) => p.groupIds.length > 0), n);
		for (let [p, m] of Object.entries(U)) if (m) {
			let b = an(e, p);
			if (Bi(b, t, r)) for (let E of b) i.add(E);
		}
		return [...i].filter((p) => !(k(p) && p.containerId));
	}, gH = (e, t, n) => c9(_i(e, qp(e, t, n)), t, n), c9 = (e, t, n) => {
		let r = [], o = /* @__PURE__ */ new Map();
		for (let i of e) {
			let a = !1;
			if (i.groupIds.length > 0) {
				if (i.groupIds.some((s) => o.get(s))) a = !0;
				else {
					let s = new Set(i.groupIds.flatMap((d) => an(n, d)));
					a = !Bi(Array.from(s), t, n);
				}
				i.groupIds.forEach((s) => {
					o.set(s, a);
				});
			}
			a || r.push(i);
		}
		return r;
	}, We = (e, t) => e.frameId && t.get(e.frameId) || null, xH = (e, t) => {
		let n = /* @__PURE__ */ new Set(), r = te(e);
		e = _i(e);
		for (let a of e) de(a) && a.id !== t.id && n.add(a.id);
		let o = /* @__PURE__ */ new Set(), i = [];
		for (let a of e) if (!(de(a) || a.frameId && n.has(a.frameId))) if (a.groupIds.length) {
			let s = a.groupIds.at(-1);
			if (!o.has(s)) {
				o.add(s);
				let d = an(e, s);
				if (d.some((c) => hn(c, t, r))) for (let c of d) i.push(c);
			}
		} else hn(a, t, r) && i.push(a);
		return i;
	}, l9 = (e, t, n, r) => {
		let o = te(e), i = /* @__PURE__ */ new Map();
		for (let c of e.values()) c.frameId === n.id && i.set(c.id, !0);
		let a = new Set(t.map((c) => c.id)), s = [], d = /* @__PURE__ */ new Set();
		for (let c of t) de(c) && c.id !== n.id && d.add(c.id);
		for (let c of _i(e, t)) {
			if (de(c) || c.frameId && d.has(c.frameId) || c.frameId && r.selectedElementIds[c.id] && r.selectedElementIds[c.frameId]) continue;
			i.has(c.id) || s.push(c);
			let l = oe(c, o);
			l && !a.has(l.id) && !i.has(l.id) && s.push(l);
		}
		for (let c of s) Y(c, { frameId: n.id }, !1);
		return e;
	}, Xp = (e, t) => {
		let n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
		for (let o of e) if (o.frameId) {
			n.set(o.id, o);
			let i = r.get(o.frameId) || [];
			i.push(o);
			let a = oe(o, t);
			a && (n.set(a.id, a), i.push(a)), r.set(o.frameId, i);
		}
		for (let [, o] of n) Y(o, { frameId: null }, !1);
	}, U9 = (e, t) => {
		return Xp(co(e, t.id), te(e)), e;
	}, hH = (e, t, n, r) => l9(U9(e, n), t, n, r.state).slice(), yH = (e, t, n) => {
		let r = n.scene.getSelectedElements({
			selectedElementIds: t.selectedElementIds,
			elements: e
		}), o = new Set(r);
		if (t.editingGroupId) for (let s of r) s.groupIds.length === 0 ? o.add(s) : s.groupIds.flatMap((d) => an(e, d)).forEach((d) => o.add(d));
		let i = /* @__PURE__ */ new Set(), a = te(e);
		return o.forEach((s) => {
			s.frameId && !de(s) && !Gp(s, a, t) && i.add(s);
		}), i.size > 0 && Xp(i, a), e;
	}, _i = (e, t) => {
		let n = /* @__PURE__ */ new Set(), r = t || e;
		for (let a of r.values()) {
			let s = a.groupIds[a.groupIds.length - 1];
			s && n.add(s);
		}
		let o = /* @__PURE__ */ new Set();
		for (let a of n) an(e, a).some((s) => de(s)) && o.add(a);
		let i = [];
		for (let a of r.values()) o.has(a.groupIds[a.groupIds.length - 1]) || i.push(a);
		return i;
	}, Mi = (e, t, n) => {
		let r = k(e) && qe(e, t) || e;
		return r.frameId && n.selectedElementIds[r.id] && n.selectedElementIds[r.frameId] ? We(r, t) : n.selectedElementIds[r.id] && n.selectedElementsAreBeingDragged ? n.frameToHighlight : We(r, t);
	}, Gp = (e, t, n, r) => {
		let o = r?.targetFrame ?? Mi(e, t, n);
		if (!o) return !1;
		let i = k(e) && qe(e, t) || e, a = (d) => {
			r?.checkedGroups && i.groupIds.forEach((c) => {
				r.checkedGroups?.set(c, d);
			});
		};
		if (!n.selectedElementIds[i.id] || !n.selectedElementsAreBeingDragged || n.selectedElementIds[i.id] && n.selectedElementIds[o.id]) return !0;
		if (i.groupIds.length === 0) return hn(i, o, t);
		for (let d of i.groupIds) if (r?.checkedGroups?.has(d)) return r.checkedGroups.get(d);
		let s = new Set(i.groupIds.filter((d) => r?.checkedGroups ? !r.checkedGroups.has(d) : !0).flatMap((d) => an(t, d)));
		if (n.editingGroupId && n.selectedElementsAreBeingDragged) {
			let d = new Set(at(t, n));
			if (n.frameToHighlight !== null) return !0;
			d.forEach((l) => {
				s.delete(l);
			});
		}
		for (let d of s) if (de(d)) return a(!1), !1;
		for (let d of s) if (hn(d, o, t)) return a(!0), !0;
		return !1;
	}, as = (e, t, n, r, o) => {
		if (!n.frameRendering || !n.frameRendering.clip) return !1;
		let i = Is(e, t, r) || ws(e, t, r);
		if (i) {
			for (let a of e.groupIds) o?.set(a, !0);
			return !0;
		}
		if (!i && e.groupIds.length > 0 && !Bi([e], t, r)) {
			let a = !1;
			if (n.selectedElementsAreBeingDragged) a = Gp(e, r, n, {
				targetFrame: t,
				checkedGroups: o
			});
			else {
				a = e.frameId === t.id;
				for (let s of e.groupIds) o?.set(s, a);
			}
			for (let s of e.groupIds) o?.set(s, a);
			return a;
		}
		return !1;
	}, bp = (e) => e.name === null ? hd(e) ? "Frame" : "AI Frame" : e.name, Ep = (e, t) => Hp({
		elements: e,
		bounds: t,
		type: "overlap"
	}).filter((n) => !n.frameId || n.frameId === t.id), IH = (e) => {
		let t = te(e);
		return e.length > 1 && e.some((n) => n.frameId && t.has(n.frameId));
	};
	f9 = (e) => {
		let t = /* @__PURE__ */ new Set();
		return e.forEach((n) => {
			de(n) && t.add(n.id);
		}), e.filter((n) => !(n.frameId && t.has(n.frameId)));
	}, ui = (e, t, n, r = !0) => {
		let [o, i, a, s] = C(t, n), d = e.filter((c) => {
			let [l, U, p, m] = Ke(c, n), b = We(c, n);
			if (b) {
				let [E, g, h, x] = Ke(b, n);
				l = Math.max(E, l), U = Math.max(g, U), p = Math.min(h, p), m = Math.min(x, m);
			}
			return c.locked === !1 && c.type !== "selection" && !Ne(c) && o <= l && i <= U && a >= p && s >= m;
		});
		return d = r ? f9(d) : d, d = d.filter((c) => {
			let l = We(c, n);
			return l ? hn(c, l, n) : !0;
		}), d;
	}, Ca = (e, t, n, r) => {
		let o = new Set(t.map((i) => i.id));
		return e.filter((i) => {
			let a = kp(i, n.width, n.height, n, r);
			return !o.has(i.id) && a;
		});
	}, Ib = function() {
		let e = null, t = null, n = null, r = (o, i) => (n != null && o === e && i.selectedElementIds === t || (n = o.some((a) => i.selectedElementIds[a.id]), e = o, t = i.selectedElementIds), n);
		return r.clearCache = () => {
			e = null, t = null, n = null;
		}, r;
	}(), wb = (e, t, n) => {
		let r = Array.from(new Set(at(e, t).map((o) => n(o))));
		return r.length === 1 ? r[0] : null;
	}, at = (e, t, n) => {
		let r = /* @__PURE__ */ new Set(), o = [];
		for (let i of e.values()) {
			if (t.selectedElementIds[i.id]) {
				o.push(i), r.add(i.id);
				continue;
			}
			if (n?.includeBoundTextElement && Ne(i) && t.selectedElementIds[i?.containerId]) {
				o.push(i), r.add(i.id);
				continue;
			}
		}
		if (n?.includeElementsInFrames) {
			let i = [];
			return o.forEach((a) => {
				de(a) && co(e, a.id).forEach((s) => !r.has(s.id) && i.push(s)), i.push(a);
			}), i;
		}
		return o;
	}, Rb = (e, t) => t.editingTextElement ? [t.editingTextElement] : t.newElement ? [t.newElement] : at(e, t, { includeBoundTextElement: !0 }), Ha = (e, t) => Qt(t.selectedElementIds, e) ? t.selectedElementIds : e;
	Zp = (e) => {
		let t = /* @__PURE__ */ new Map(), n = [];
		for (let r of e) r.isDeleted || (n.push(r), t.set(r.id, r));
		return {
			elementsMap: t,
			elements: n
		};
	}, u9 = (0, import_lodash_throttle.default)((e) => {
		(c.DEV || c.MODE === je.TEST || window?.DEBUG_FRACTIONAL_INDICES) && Za(e, {
			shouldThrow: c.DEV || c.MODE === je.TEST,
			includeBoundTextValidation: !0
		});
	}, 1e3 * 60, {
		leading: !0,
		trailing: !1
	}), m9 = (e) => {
		let t = ["includeBoundTextElement", "includeElementsInFrames"], n = "";
		for (let r of t) n += `${r}:${e[r] ? "1" : "0"}`;
		return n;
	}, Wp = (e) => typeof e == "string", Hn = class Hn {
		constructor() {
			i$1(this, "callbacks", /* @__PURE__ */ new Set());
			i$1(this, "nonDeletedElements", []);
			i$1(this, "nonDeletedElementsMap", tt(/* @__PURE__ */ new Map()));
			i$1(this, "elements", []);
			i$1(this, "nonDeletedFramesLikes", []);
			i$1(this, "frames", []);
			i$1(this, "elementsMap", tt(/* @__PURE__ */ new Map()));
			i$1(this, "selectedElementsCache", {
				selectedElementIds: null,
				elements: null,
				cache: /* @__PURE__ */ new Map()
			});
			i$1(this, "sceneNonce");
			i$1(this, "insertElement", (t) => {
				let n = t.frameId ? this.getElementIndex(t.frameId) : this.elements.length;
				this.insertElementAtIndex(t, n);
			});
			i$1(this, "insertElements", (t) => {
				if (!t.length) return;
				let n = t[0]?.frameId ? this.getElementIndex(t[0].frameId) : this.elements.length;
				this.insertElementsAtIndex(t, n);
			});
			i$1(this, "getContainerElement", (t) => t && t.containerId && this.getElement(t.containerId) || null);
			i$1(this, "getElementsFromId", (t) => {
				let n = this.getNonDeletedElementsMap(), r = n.get(t);
				return r ? [r] : an(n, t);
			});
		}
		static mapElementToScene(t, n) {
			Wp(t) ? this.sceneMapById.set(t, n) : (this.sceneMapByElement.set(t, n), this.sceneMapById.set(t.id, n));
		}
		static getScene(t) {
			return Wp(t) ? this.sceneMapById.get(t) || null : this.sceneMapByElement.get(t) || null;
		}
		getSceneNonce() {
			return this.sceneNonce;
		}
		getNonDeletedElementsMap() {
			return this.nonDeletedElementsMap;
		}
		getElementsIncludingDeleted() {
			return this.elements;
		}
		getElementsMapIncludingDeleted() {
			return this.elementsMap;
		}
		getNonDeletedElements() {
			return this.nonDeletedElements;
		}
		getFramesIncludingDeleted() {
			return this.frames;
		}
		getSelectedElements(t) {
			let n = m9(t), r = t?.elements || this.nonDeletedElements;
			if (this.selectedElementsCache.elements === r && this.selectedElementsCache.selectedElementIds === t.selectedElementIds) {
				let i = this.selectedElementsCache.cache.get(n);
				if (i) return i;
			} else t?.elements ?? this.selectedElementsCache.cache.clear();
			let o = at(r, { selectedElementIds: t.selectedElementIds }, t);
			return t?.elements ?? (this.selectedElementsCache.selectedElementIds = t.selectedElementIds, this.selectedElementsCache.elements = this.nonDeletedElements, this.selectedElementsCache.cache.set(n, o)), o;
		}
		getNonDeletedFramesLikes() {
			return this.nonDeletedFramesLikes;
		}
		getElement(t) {
			return this.elementsMap.get(t) || null;
		}
		getNonDeletedElement(t) {
			let n = this.getElement(t);
			return n && zp(n) ? n : null;
		}
		mapElements(t) {
			let n = !1, r = this.elements.map((o) => {
				let i = t(o);
				return i !== o && (n = !0), i;
			});
			return n && this.replaceAllElements(r), n;
		}
		replaceAllElements(t) {
			let n = t instanceof Array ? t : Array.from(t.values()), r = [];
			u9(n), this.elements = An(n), this.elementsMap.clear(), this.elements.forEach((i) => {
				de(i) && r.push(i), this.elementsMap.set(i.id, i), Hn.mapElementToScene(i, this);
			});
			let o = Zp(this.elements);
			this.nonDeletedElements = o.elements, this.nonDeletedElementsMap = o.elementsMap, this.frames = r, this.nonDeletedFramesLikes = Zp(this.frames).elements, this.triggerUpdate();
		}
		triggerUpdate() {
			this.sceneNonce = Vt();
			for (let t of Array.from(this.callbacks)) t();
		}
		onUpdate(t) {
			if (this.callbacks.has(t)) throw new Error();
			return this.callbacks.add(t), () => {
				if (!this.callbacks.has(t)) throw new Error();
				this.callbacks.delete(t);
			};
		}
		destroy() {
			this.elements = [], this.nonDeletedElements = [], this.nonDeletedFramesLikes = [], this.frames = [], this.elementsMap.clear(), this.selectedElementsCache.selectedElementIds = null, this.selectedElementsCache.elements = null, this.selectedElementsCache.cache.clear(), Hn.sceneMapById.forEach((t, n) => {
				t === this && Hn.sceneMapById.delete(n);
			}), this.callbacks.clear();
		}
		insertElementAtIndex(t, n) {
			if (!Number.isFinite(n) || n < 0) throw new Error("insertElementAtIndex can only be called with index >= 0");
			let r = [
				...this.elements.slice(0, n),
				t,
				...this.elements.slice(n)
			];
			Zr(r, te([t])), this.replaceAllElements(r);
		}
		insertElementsAtIndex(t, n) {
			if (!t.length) return;
			if (!Number.isFinite(n) || n < 0) throw new Error("insertElementAtIndex can only be called with index >= 0");
			let r = [
				...this.elements.slice(0, n),
				...t,
				...this.elements.slice(n)
			];
			Zr(r, te(t)), this.replaceAllElements(r);
		}
		getElementIndex(t) {
			return this.elements.findIndex((n) => n.id === t);
		}
	};
	i$1(Hn, "sceneMapByElement", /* @__PURE__ */ new WeakMap()), i$1(Hn, "sceneMapById", /* @__PURE__ */ new Map());
	Ts = Hn;
	Y = (e, t, n = !0, r) => {
		let o = !1, { points: i, fixedSegments: a, fileId: s, startBinding: d, endBinding: c } = t;
		if (X(e) && (Object.keys(t).length === 0 || typeof i < "u" || typeof a < "u" || typeof d < "u" || typeof c < "u")) {
			let l = tt(Ts.getScene(e)?.getNonDeletedElementsMap() ?? /* @__PURE__ */ new Map());
			t = {
				...t,
				angle: 0,
				...Pi({
					...e,
					x: t.x || e.x,
					y: t.y || e.y
				}, l, {
					fixedSegments: a,
					points: i,
					startBinding: d,
					endBinding: c
				}, { isDragging: r?.isDragging })
			};
		} else typeof i < "u" && (t = {
			...xn(i),
			...t
		});
		for (let l in t) {
			let U = t[l];
			if (typeof U < "u") {
				if (e[l] === U && (typeof U != "object" || U === null || l === "groupIds" || l === "scale")) continue;
				if (l === "scale") {
					let p = e[l], m = U;
					if (p[0] === m[0] && p[1] === m[1]) continue;
				} else if (l === "points") {
					let p = e[l], m = U;
					if (p.length === m.length) {
						let b = !1, E = p.length;
						for (; --E;) {
							let g = p[E], h = m[E];
							if (g[0] !== h[0] || g[1] !== h[1]) {
								b = !0;
								break;
							}
						}
						if (!b) continue;
					}
				}
				e[l] = U, o = !0;
			}
		}
		return o && ((typeof t.height < "u" || typeof t.width < "u" || typeof s < "u" || typeof i < "u") && he.delete(e), e.version++, e.versionNonce = Vt(), e.updated = zt(), n && Ts.getScene(e)?.triggerUpdate()), e;
	}, vt = (e, t, n = !1) => {
		let r = !1;
		for (let o in t) {
			let i = t[o];
			if (typeof i < "u") {
				if (e[o] === i && (typeof i != "object" || i === null)) continue;
				r = !0;
			}
		}
		return !r && !n ? e : {
			...e,
			...t,
			updated: zt(),
			version: e.version + 1,
			versionNonce: Vt()
		};
	}, kr = (e, t) => (e.version = (t ?? e.version) + 1, e.versionNonce = Vt(), e.updated = zt(), e);
	ao = (e) => ae(e) || Ce(e) ? e.points.length < 2 : e.width === 0 && e.height === 0, kp = (e, t, n, r, o) => {
		let [i, a, s, d] = Ke(e, o), c = Dn({
			clientX: r.offsetLeft,
			clientY: r.offsetTop
		}, r), l = Dn({
			clientX: r.offsetLeft + t,
			clientY: r.offsetTop + n
		}, r);
		return c.x <= s && c.y <= d && l.x >= i && l.y >= a;
	}, iJ = (e, t, n, r, o, i) => {
		let [a, s, d, c] = $e(e, o), l = Dn({
			clientX: r.offsetLeft + (i?.left || 0),
			clientY: r.offsetTop + (i?.top || 0)
		}, r), U = Dn({
			clientX: r.offsetLeft + t - (i?.right || 0),
			clientY: r.offsetTop + n - (i?.bottom || 0)
		}, r);
		return a >= l.x && s >= l.y && d <= U.x && c <= U.y;
	}, Oi = (e, t, n) => {
		let r = Math.abs(t), o = Math.abs(n);
		if (e === "line" || e === "arrow" || e === "freedraw") {
			let i = Math.round(Math.atan(o / r) / Nt) * Nt;
			i === 0 ? n = 0 : i === Math.PI / 2 ? t = 0 : n = r * Math.tan(i) * Math.sign(n) || n;
		} else e !== "selection" && (n = r * Math.sign(n));
		return {
			width: t,
			height: n
		};
	}, Va = (e, t, n, r) => {
		let o = n - e, i = r - t, a = Math.round(Math.atan(i / o) / Nt) * Nt;
		if (a === 0) i = 0;
		else if (a === Math.PI / 2) o = 0;
		else {
			let s = Math.tan(a), d = -1, c = t - s * e, l = -1 / s, U = -1, p = r - l * n, m = (d * p - U * c) / (s * U - l * d), b = (c * l - p * s) / (s * U - l * d);
			o = m - e, i = b - t;
		}
		return {
			width: o,
			height: i
		};
	};
	bs = (e) => {
		let t = {
			width: e.width,
			height: e.height,
			x: e.x,
			y: e.y
		};
		if (e.width < 0) {
			let n = Math.abs(e.width);
			t.width = n, t.x = e.x - n;
		}
		if (e.height < 0) {
			let n = Math.abs(e.height);
			t.height = n, t.y = e.y - n;
		}
		return t;
	};
	Qp = {
		mouse: 8,
		pen: 16,
		touch: 28
	}, b9 = 16, e6 = {
		e: !0,
		s: !0,
		n: !0,
		w: !0
	};
	jp = {
		e: !0,
		s: !0,
		n: !0,
		w: !0,
		nw: !0,
		se: !0
	}, Ms = {
		e: !0,
		s: !0,
		n: !0,
		w: !0
	}, cn = (e, t, n, r, o, i, a) => {
		let [s, d] = T(u(e + n / 2, t + r / 2), u(o, i), a);
		return [
			s - n / 2,
			d - r / 2,
			n,
			r
		];
	}, Ai = (e) => !(e.viewport.isMobile || e.isTouchScreen && (Bs || _s)), Ls = (e) => Ai(e) ? e6 : {}, Ki = ([e, t, n, r, o, i], a, s, d, c = {}, l = 4, U = 2) => {
		let p = Qp[d], m = p / s.value, b = p / s.value, E = p / s.value, g = p / s.value, h = n - e, x = r - t, y = l / s.value, w = (p - U * 2) / (2 * s.value), I = {
			nw: c.nw ? void 0 : cn(e - y - E + w, t - y - g + w, m, b, o, i, a),
			ne: c.ne ? void 0 : cn(n + y - w, t - y - g + w, m, b, o, i, a),
			sw: c.sw ? void 0 : cn(e - y - E + w, r + y - w, m, b, o, i, a),
			se: c.se ? void 0 : cn(n + y - w, r + y - w, m, b, o, i, a),
			rotation: c.rotation ? void 0 : cn(e + h / 2 - m / 2, t - y - g + w - b9 / s.value, m, b, o, i, a)
		}, S = 5 * Qp.mouse / s.value;
		return Math.abs(h) > S && (c.n || (I.n = cn(e + h / 2 - m / 2, t - y - g + w, m, b, o, i, a)), c.s || (I.s = cn(e + h / 2 - m / 2, r + y - w, m, b, o, i, a))), Math.abs(x) > S && (c.w || (I.w = cn(e - y - E + w, t + x / 2 - b / 2, m, b, o, i, a)), c.e || (I.e = cn(n + y - w, t + x / 2 - b / 2, m, b, o, i, a))), I;
	}, Ds = (e, t, n, r = "mouse", o = e6) => {
		if (e.locked || X(e)) return {};
		if (e.type === "freedraw" || ae(e)) {
			if (e.points.length === 2) {
				let [, a] = e.points;
				a[0] === 0 || a[1] === 0 ? o = Ms : a[0] > 0 && a[1] < 0 ? o = jp : a[0] > 0 && a[1] > 0 ? o = Ms : a[0] < 0 && a[1] > 0 ? o = jp : a[0] < 0 && a[1] < 0 && (o = Ms);
			}
		} else de(e) && (o = {
			...o,
			rotation: !0
		});
		let i = ae(e) ? 10 : Ye(e) ? 0 : 2;
		return Ki(C(e, n, !0), e.angle, t, r, o, i, Ye(e) ? 0 : void 0);
	}, fJ = (e, t) => {
		if (t.editingLinearElement) return !1;
		if (e.length > 1) return !0;
		let n = e[0];
		return X(n) ? !1 : ae(n) ? n.points.length > 2 : !0;
	};
	vs = (e, t, n) => t >= e[0] && t <= e[0] + e[2] && n >= e[1] && n <= e[1] + e[3], t6 = (e, t, n, r, o, i, a, s) => {
		if (!n.selectedElementIds[e.id]) return !1;
		let { rotation: d, ...c } = Ds(e, i, t, a, Ls(s));
		if (d && vs(d, r, o)) return "rotation";
		let l = Object.keys(c).filter((U) => {
			let p = c[U];
			return p ? vs(p, r, o) : !1;
		});
		if (l.length > 0) return l[0];
		if (Ai(s)) {
			let [U, p, m, b, E, g] = C(e, t);
			if (!(ae(e) && e.points.length <= 2)) {
				let h = Ye(e) ? 0 : Er / i.value, x = Er / i.value, y = n6(u(U - h, p - h), u(m + h, b + h), u(E, g), e.angle);
				for (let [w, I] of Object.entries(y)) if (Bt(u(r, o), I, x)) return w;
			}
		}
		return !1;
	}, E9 = (e, t, n, r, o, i, a, s) => e.reduce((d, c) => {
		if (d) return d;
		let l = t6(c, a, t, n, r, o, i, s);
		return l ? {
			element: c,
			transformHandleType: l
		} : null;
	}, null), g9 = ([e, t, n, r], o, i, a, s, d) => {
		let c = Ki([
			e,
			t,
			n,
			r,
			(e + n) / 2,
			(t + r) / 2
		], 0, a, s, Ls(d)), l = Object.keys(c).find((U) => {
			let p = c[U];
			return p && vs(p, o, i);
		});
		if (l) return l;
		if (Ai(d)) {
			let U = (e + n) / 2, p = (t + r) / 2, m = Er / a.value, b = n6(u(e - m, t - m), u(n + m, r + m), u(U, p), 0);
			for (let [E, g] of Object.entries(b)) if (Bt(u(o, i), g, m)) return E;
		}
		return !1;
	}, Ss = [
		"ns",
		"nesw",
		"ew",
		"nwse"
	], x9 = (e, t) => {
		let n = Ss.indexOf(e);
		if (n >= 0) e = Ss[(n + Math.round(t / (Math.PI / 4))) % Ss.length];
		return e;
	}, h9 = (e) => {
		let { element: t, transformHandleType: n } = e, r = t && Math.sign(t.height) * Math.sign(t.width) === -1, o = null;
		switch (n) {
			case "n":
			case "s":
				o = "ns";
				break;
			case "w":
			case "e":
				o = "ew";
				break;
			case "nw":
			case "se":
				r ? o = "nesw" : o = "nwse";
				break;
			case "ne":
			case "sw":
				r ? o = "nwse" : o = "nesw";
				break;
			case "rotation": return "grab";
		}
		return o && t && (o = x9(o, t.angle)), o ? `${o}-resize` : "";
	}, n6 = ([e, t], [n, r], o, i) => {
		let a = T(u(e, t), o, i), s = T(u(n, t), o, i), d = T(u(e, r), o, i), c = T(u(n, r), o, i);
		return {
			n: [a, s],
			e: [s, c],
			s: [c, d],
			w: [d, a]
		};
	};
	y9 = (e, t, n, r, o, i, a, s, d, c, l, U) => {
		if (n.length === 1) {
			let [p] = n;
			if (t === "rotation") X(p) || (I9(p, r, o, d, c, i), Jt(p, r));
			else {
				if (k(p) && t) return w9(e, p, r, t, a, d, c), Jt(p, r), !0;
				if (t) {
					let m = n[0].id, b = r.get(m), E = e.get(m);
					if (b && E) {
						let { nextWidth: g, nextHeight: h } = v9(b, E, r, e, t, d, c, {
							shouldMaintainAspectRatio: s,
							shouldResizeFromCenter: a
						});
						S9(g, h, b, E, r, e, t, {
							shouldMaintainAspectRatio: s,
							shouldResizeFromCenter: a
						});
					}
				}
			}
			return !0;
		} else if (n.length > 1) {
			if (t === "rotation") return R9(e, n, r, o, d, c, i, l, U), !0;
			if (t) {
				let { nextWidth: p, nextHeight: m, flipByX: b, flipByY: E, originalBoundingBox: g } = $9(n, e, r, t, d, c, {
					shouldMaintainAspectRatio: s,
					shouldResizeFromCenter: a
				});
				return P9(n, r, t, o, e, {
					shouldResizeFromCenter: a,
					shouldMaintainAspectRatio: s,
					flipByX: b,
					flipByY: E,
					nextWidth: p,
					nextHeight: m,
					originalBoundingBox: g
				}), !0;
			}
		}
		return !1;
	}, I9 = (e, t, n, r, o, i) => {
		let [a, s, d, c] = C(e, t), l = (a + d) / 2, U = (s + c) / 2, p;
		de(e) ? p = 0 : (p = 5 * Math.PI / 2 + Math.atan2(o - U, r - l), i && (p = p + Nt / 2, p = p - p % Nt), p = hr(p));
		let m = Yt(e);
		if (Y(e, { angle: p }), m) {
			let b = n.getElement(m);
			b && !ee(e) && Y(b, { angle: p });
		}
	}, r6 = (e, t, n, r) => ae(e) || Ce(e) ? { points: nr(0, t, nr(1, n, e.points, r), r) } : {}, $s = (e, t, n) => {
		let r = e.width;
		if (Ne(e)) {
			let a = qe(e, t);
			a && (r = Tt(a, e));
		}
		let i = e.fontSize * (n / r);
		return i < Eo ? null : { size: i };
	}, w9 = (e, t, n, r, o, i, a) => {
		let [s, d, c, l, U, p] = C(t, n), [m, b] = T(u(i, a), u(U, p), -t.angle), E = 0, g = 0;
		r !== "e" && r !== "w" && (r.includes("e") && (E = (m - s) / (c - s)), r.includes("w") && (E = (c - m) / (c - s)), r.includes("n") && (g = (l - b) / (l - d)), r.includes("s") && (g = (b - d) / (l - d)));
		let h = Math.max(E, g);
		if (h > 0) {
			let x = t.width * h, y = t.height * h, w = $s(t, n, x);
			if (w === null) return;
			let I = [s, d], S = [c, l], v = [U, p], D = u(s, d);
			if ([
				"n",
				"w",
				"nw"
			].includes(r) && (D = u(S[0] - Math.abs(x), S[1] - Math.abs(y))), r === "ne") {
				let V = [I[0], S[1]];
				D = u(V[0], V[1] - Math.abs(y));
			}
			if (r === "sw") {
				let V = [S[0], I[1]];
				D = u(V[0] - Math.abs(x), V[1]);
			}
			["s", "n"].includes(r) && (D[0] = v[0] - x / 2), ["e", "w"].includes(r) && (D[1] = v[1] - y / 2), o && (D[0] = v[0] - Math.abs(x) / 2, D[1] = v[1] - Math.abs(y) / 2);
			let $ = t.angle;
			D = T(T(D, u(U, p), $), T(u(D[0] + Math.abs(x) / 2, D[1] + Math.abs(y) / 2), u(U, p), $), -$);
			let [W, be] = D;
			Y(t, {
				fontSize: w.size,
				width: x,
				height: y,
				x: W,
				y: be
			});
		}
		if (r === "e" || r === "w") {
			let x = e.get(t.id), [y, w, I, S] = Rt(x, x.width, x.height, !0), v = u(y, w), D = u(I, S), $ = Zt(v, D), N = T(u(i, a), $, -x.angle), [B, , _] = Rt(t, t.width, t.height, !0), W = _ - B, be = D[0] - v[0], V = Ko(Ee({
				fontSize: t.fontSize,
				fontFamily: t.fontFamily
			}), t.lineHeight), ce = be / W;
			r.includes("e") && (ce = (N[0] - v[0]) / W), r.includes("w") && (ce = (D[0] - N[0]) / W);
			let J = t.width * ce < V ? V : t.width * ce, j = en(t.originalText, Ee(t), Math.abs(J)), ye = ht(j, Ee(t), t.lineHeight), He = ye.height, [pr, Jn, Yn, Ji] = Rt(x, J, He, !0), Uo = Yn - pr, Yi = Ji - Jn, Gt = [...v];
			[
				"n",
				"w",
				"nw"
			].includes(r) && (Gt = [D[0] - Math.abs(Uo), v[1]]);
			let ur = x.angle;
			Gt = T(T(Gt, $, ur), T(u(Gt[0] + Math.abs(Uo) / 2, Gt[1] + Math.abs(Yi) / 2), $, ur), -ur);
			Y(t, {
				width: Math.abs(J),
				height: Math.abs(ye.height),
				x: Gt[0],
				y: Gt[1],
				text: j,
				autoResize: !1
			});
		}
	}, R9 = (e, t, n, r, o, i, a, s, d) => {
		let c = 5 * Math.PI / 2 + Math.atan2(i - d, o - s);
		a && (c += Nt / 2, c -= c % Nt);
		for (let l of t) if (!de(l)) {
			let [U, p, m, b] = C(l, n), E = (U + m) / 2, g = (p + b) / 2, h = e.get(l.id)?.angle ?? l.angle, [x, y] = T(u(E, g), u(s, d), c + h - l.angle);
			X(l) ? Y(l, { points: U2(l, n) }) : Y(l, {
				x: l.x + (x - E),
				y: l.y + (y - g),
				angle: hr(c + h)
			}, !1), Jt(l, n, { simultaneouslyUpdated: t });
			let w = oe(l, n);
			w && !ee(l) && Y(w, {
				x: w.x + (x - E),
				y: w.y + (y - g),
				angle: hr(c + h)
			}, !1);
		}
		r.triggerUpdate();
	}, T9 = (e, t, n, r, o) => {
		let [i, a, s, d] = t.length === 1 ? C(t[0], n) : $e(t), c = (i + s) / 2, l = (a + d) / 2, U = t.length === 1 ? t[0].angle : 0;
		switch ([r, o] = T(u(r, o), u(c, l), -U), e) {
			case "n": return T(u(r - (i + s) / 2, o - a), u(0, 0), U);
			case "s": return T(u(r - (i + s) / 2, o - d), u(0, 0), U);
			case "w": return T(u(r - i, o - (a + d) / 2), u(0, 0), U);
			case "e": return T(u(r - s, o - (a + d) / 2), u(0, 0), U);
			case "nw": return T(u(r - i, o - a), u(0, 0), U);
			case "ne": return T(u(r - s, o - a), u(0, 0), U);
			case "sw": return T(u(r - i, o - d), u(0, 0), U);
			case "se": return T(u(r - s, o - d), u(0, 0), U);
			default: return [0, 0];
		}
	}, M9 = (e, t) => {
		let [, [n, r]] = t.points;
		return e === "nw" && (n < 0 || r < 0) || e === "ne" && n >= 0 || e === "sw" && n <= 0 || e === "se" && (n > 0 || r > 0) ? "end" : "origin";
	}, L9 = (e, t, n) => {
		if (n) return "center";
		if (t) switch (e) {
			case "n": return "south-side";
			case "e": return "west-side";
			case "s": return "north-side";
			case "w": return "east-side";
			case "ne": return "bottom-left";
			case "nw": return "bottom-right";
			case "se": return "top-left";
			case "sw": return "top-right";
		}
		return [
			"e",
			"se",
			"s"
		].includes(e) ? "top-left" : [
			"n",
			"nw",
			"w"
		].includes(e) ? "bottom-right" : e === "ne" ? "bottom-left" : "top-right";
	}, D9 = (e, t, n, r, o, i, a, s, d) => {
		let c = L9(a, s, d), [l, U] = e;
		switch (c) {
			case "top-left": return {
				x: l + (t - r) / 2 + (r - t) / 2 * Math.cos(i) + (n - o) / 2 * Math.sin(i),
				y: U + (n - o) / 2 + (r - t) / 2 * Math.sin(i) + (o - n) / 2 * Math.cos(i)
			};
			case "top-right": return {
				x: l + (t - r) / 2 * (Math.cos(i) + 1) + (n - o) / 2 * Math.sin(i),
				y: U + (n - o) / 2 + (t - r) / 2 * Math.sin(i) + (o - n) / 2 * Math.cos(i)
			};
			case "bottom-left": return {
				x: l + (t - r) / 2 * (1 - Math.cos(i)) + (o - n) / 2 * Math.sin(i),
				y: U + (n - o) / 2 * (Math.cos(i) + 1) + (r - t) / 2 * Math.sin(i)
			};
			case "bottom-right": return {
				x: l + (t - r) / 2 * (Math.cos(i) + 1) + (o - n) / 2 * Math.sin(i),
				y: U + (n - o) / 2 * (Math.cos(i) + 1) + (t - r) / 2 * Math.sin(i)
			};
			case "center": return {
				x: l - (r - t) / 2,
				y: U - (o - n) / 2
			};
			case "east-side": return {
				x: l + (t - r) / 2 * (Math.cos(i) + 1),
				y: U + (t - r) / 2 * Math.sin(i) + (n - o) / 2
			};
			case "west-side": return {
				x: l + (t - r) / 2 * (1 - Math.cos(i)),
				y: U + (r - t) / 2 * Math.sin(i) + (n - o) / 2
			};
			case "north-side": return {
				x: l + (t - r) / 2 + (n - o) / 2 * Math.sin(i),
				y: U + (o - n) / 2 * (Math.cos(i) - 1)
			};
			case "south-side": return {
				x: l + (t - r) / 2 + (o - n) / 2 * Math.sin(i),
				y: U + (n - o) / 2 * (Math.cos(i) + 1)
			};
		}
	}, S9 = (e, t, n, r, o, i, a, { shouldInformMutation: s = !0, shouldMaintainAspectRatio: d = !1, shouldResizeFromCenter: c = !1 } = {}) => {
		let l = {}, U = oe(n, o);
		if (U) {
			let E = i.get(U.id);
			if (E && (l = { fontSize: E.fontSize }), d) {
				let h = $s(U, o, Tt({
					...n,
					width: e,
					height: t
				}, U));
				if (h === null) return;
				l = { fontSize: h.size };
			} else {
				let g = Td(Ee(U), U.lineHeight), h = Ld(U.fontSize, U.lineHeight);
				e = Math.max(e, g), t = Math.max(t, h);
			}
		}
		let p = r6(r, e, t, !0), m = u(r.x, r.y);
		if (ae(r)) {
			let [E, g] = Ke(r, i);
			m = u(E, g);
		}
		let b = D9(m, r.width, r.height, e, t, r.angle, a, d, c);
		if (ae(r) && p.points) {
			let E = r.x - m[0], g = r.y - m[1];
			b.x += E, b.y += g;
			let h = p.points[0][0], x = p.points[0][1];
			b.x += h, b.y += x, p.points = p.points.map((y) => u(y[0] - h, y[1] - x));
		}
		if (e < 0 && (b.x = b.x + e), t < 0 && (b.y = b.y + t), "scale" in n && "scale" in r && Y(n, { scale: [(Math.sign(e) || r.scale[0]) * r.scale[0], (Math.sign(t) || r.scale[1]) * r.scale[1]] }), ee(n) && U && d) {
			let E = e / n.width * U.fontSize;
			if (E < Eo) return;
			l.fontSize = E;
		}
		if (e !== 0 && t !== 0 && Number.isFinite(b.x) && Number.isFinite(b.y)) Y(n, {
			...b,
			width: Math.abs(e),
			height: Math.abs(t),
			...p
		}, s), Jt(n, o, { newSize: {
			width: e,
			height: t
		} }), U && l != null && Y(U, { fontSize: l.fontSize }), _n(n, o, a, d);
	}, v9 = (e, t, n, r, o, i, a, { shouldMaintainAspectRatio: s = !1, shouldResizeFromCenter: d = !1 } = {}) => {
		let [c, l, U, p] = Rt(t, t.width, t.height, !0), m = u(c, l), b = u(U, p), E = Zt(m, b), g = T(u(i, a), E, -t.angle), [h, x, y, w] = Rt(e, e.width, e.height, !0), I = y - h, S = w - x, v = b[0] - m[0], D = b[1] - m[1], $ = v / I, N = D / S;
		o.includes("e") && ($ = (g[0] - m[0]) / I), o.includes("s") && (N = (g[1] - m[1]) / S), o.includes("w") && ($ = (b[0] - g[0]) / I), o.includes("n") && (N = (b[1] - g[1]) / S);
		let B = e.width * $, _ = e.height * N;
		if (d && (B = 2 * B - t.width, _ = 2 * _ - t.height), s) {
			let W = Math.abs(B) / t.width, be = Math.abs(_) / t.height;
			if (o.length === 1 && (_ *= W, B *= be), o.length === 2) {
				let V = Math.max(W, be);
				B = t.width * V * Math.sign(B), _ = t.height * V * Math.sign(_);
			}
		}
		return {
			nextWidth: B,
			nextHeight: _
		};
	}, $9 = (e, t, n, r, o, i, { shouldMaintainAspectRatio: a = !1, shouldResizeFromCenter: s = !1 } = {}) => {
		let d = e.map((W) => t.get(W.id)), c = d.reduce((W, be) => {
			if (!ae(be)) return W;
			let V = Yt(be);
			if (!V) return W;
			let ce = t.get(V) ?? null;
			return Ne(ce) ? [...W, {
				...ce,
				...z.getBoundTextElementPosition(be, ce, n)
			}] : W;
		}, []), l = Na(d.map((W) => W).concat(c)), { minX: U, minY: p, maxX: m, maxY: b, midX: E, midY: g } = l, h = m - U, x = b - p, y = {
			ne: [U, b],
			se: [U, p],
			sw: [m, p],
			nw: [m, b],
			e: [U, p + x / 2],
			w: [m, p + x / 2],
			n: [U + h / 2, b],
			s: [U + h / 2, p]
		}, [w, I] = s ? [E, g] : y[r], S = s ? 2 : 1, v = Math.max(Math.abs(o - w) / h || 0, Math.abs(i - I) / x || 0) * S, D = r.includes("e") || r.includes("w") ? Math.abs(o - w) * S : h, $ = r.includes("n") || r.includes("s") ? Math.abs(i - I) * S : x;
		a && (D = h * v * Math.sign(o - w), $ = x * v * Math.sign(i - I));
		let [B, _] = {
			ne: [o < w, i > I],
			se: [o < w, i < I],
			sw: [o > w, i < I],
			nw: [o > w, i > I],
			e: [o < w, !1],
			w: [o > w, !1],
			n: [!1, i > I],
			s: [!1, i < I]
		}[r].map((W) => W);
		return {
			originalBoundingBox: l,
			nextWidth: D,
			nextHeight: $,
			flipByX: B,
			flipByY: _
		};
	}, P9 = (e, t, n, r, o, { shouldMaintainAspectRatio: i = !1, shouldResizeFromCenter: a = !1, flipByX: s = !1, flipByY: d = !1, nextHeight: c, nextWidth: l, originalBoundingBox: U } = {}) => {
		if (l === void 0 && c === void 0 && s === void 0 && d === void 0 || c === 0 || l === 0) return;
		o || (o = t);
		let p = e.reduce((S, v) => {
			let D = o.get(v.id);
			return D && S.push({
				orig: D,
				latest: v
			}), S;
		}, []), m;
		if (U) m = U;
		else {
			let S = p.reduce((v, { orig: D }) => {
				if (!ae(D)) return v;
				let $ = Yt(D);
				if (!$) return v;
				let N = o.get($) ?? null;
				return Ne(N) ? [...v, {
					...N,
					...z.getBoundTextElementPosition(D, N, t)
				}] : v;
			}, []);
			m = Na(p.map(({ orig: v }) => v).concat(S));
		}
		let { minX: b, minY: E, maxX: g, maxY: h, midX: x, midY: y } = m, w = g - b, I = h - E;
		if (l === void 0 && c === void 0 && (l = w, c = I), i && (l === void 0 ? l = c * (w / I) : c === void 0 ? c = l * (I / w) : Math.abs(l / c - w / I) > .001 && (l = c * (w / I))), l && c) {
			let S = n.includes("e") || n.includes("w") ? Math.abs(l) / w : 1, v = n.includes("n") || n.includes("s") ? Math.abs(c) / I : 1, D;
			n.length === 1 ? D = n.includes("e") || n.includes("w") ? S : v : D = Math.max(Math.abs(l) / w || 0, Math.abs(c) / I || 0);
			let $ = {
				ne: [b, h],
				se: [b, E],
				sw: [g, E],
				nw: [g, h],
				e: [b, E + I / 2],
				w: [g, E + I / 2],
				n: [b + w / 2, h],
				s: [b + w / 2, E]
			}, [N, B] = a ? [x, y] : $[n], _ = i || p.some((J) => J.latest.angle !== 0 || k(J.latest) || E2(J.latest));
			_ && (S = D, v = D);
			let [W, be] = [s ? -1 : 1, d ? -1 : 1], V = [];
			for (let { orig: J, latest: j } of p) {
				if (k(J) && Ne(J)) continue;
				let ye = J.width * S, He = J.height * v, pr = hr(J.angle * W * be), Jn = ae(J) || Ce(J), Yn = J.x - N, Ji = J.y - B, Uo = s && !Jn ? ye : 0, Yi = d && !Jn ? He : 0, Gt = N + W * (Yn * S + Uo), ur = B + be * (Ji * v + Yi), Cn = r6(J, ye * W, He * be, !1), Pt = {
					x: Gt,
					y: ur,
					width: ye,
					height: He,
					angle: pr,
					...Cn
				};
				if (X(J) && (J.startBinding && (Pt.startBinding = {
					...J.startBinding,
					fixedPoint: [s ? -J.startBinding.fixedPoint[0] + 1 : J.startBinding.fixedPoint[0], d ? -J.startBinding.fixedPoint[1] + 1 : J.startBinding.fixedPoint[1]]
				}), J.endBinding && (Pt.endBinding = {
					...J.endBinding,
					fixedPoint: [s ? -J.endBinding.fixedPoint[0] + 1 : J.endBinding.fixedPoint[0], d ? -J.endBinding.fixedPoint[1] + 1 : J.endBinding.fixedPoint[1]]
				}), J.fixedSegments && Cn.points && (Pt.fixedSegments = J.fixedSegments.map((Ut) => ({
					...Ut,
					start: Cn.points[Ut.index - 1],
					end: Cn.points[Ut.index]
				})))), Ye(J) && (Pt.scale = [J.scale[0] * W, J.scale[1] * be]), k(J)) {
					let Ut = $s(J, t, ye);
					if (!Ut) return;
					Pt.fontSize = Ut.size;
				}
				let mr = o.get(Yt(J) ?? "");
				if (mr) if (_) {
					let Ut = mr.fontSize * D;
					if (Ut < Eo) return;
					Pt.boundTextFontSize = Ut;
				} else Pt.boundTextFontSize = mr.fontSize;
				V.push({
					element: j,
					update: Pt
				});
			}
			let ce = V.map(({ element: J }) => J);
			for (let { element: J, update: { boundTextFontSize: j, ...ye } } of V) {
				let { width: He, height: pr, angle: Jn } = ye;
				Y(J, ye, !1, { isDragging: !0 }), Jt(J, t, {
					simultaneouslyUpdated: ce,
					newSize: {
						width: He,
						height: pr
					}
				});
				let Yn = oe(J, t);
				Yn && j && (Y(Yn, {
					fontSize: j,
					angle: ae(J) ? void 0 : Jn
				}, !1), _n(J, t, n, !0));
			}
			r.triggerUpdate();
		}
	};
	N9 = (e, t, n, r, o, i) => {
		if (t.length === 1 && X(t[0]) && (t[0].startBinding || t[0].endBinding)) return;
		let a = t.filter((U) => {
			if (X(U) && U.startBinding && U.endBinding) {
				let p = t.find((b) => b.id === U.startBinding?.elementId), m = t.find((b) => b.id === U.endBinding?.elementId);
				return p && m;
			}
			return !0;
		}), s = new Set(a), d = a.filter((U) => de(U)).map((U) => U.id);
		if (d.length > 0) for (let U of r.getNonDeletedElements()) U.frameId !== null && d.includes(U.frameId) && s.add(U);
		let l = F9($e(Array.from(s).map((U) => e.originalElements.get(U.id) ?? U)), n, o, i);
		s.forEach((U) => {
			if (o6(e, U, l), !ee(U)) {
				let p = oe(U, r.getNonDeletedElementsMap());
				p && o6(e, p, l), Jt(U, r.getElementsMapIncludingDeleted(), { simultaneouslyUpdated: Array.from(s) });
			}
		});
	}, F9 = (e, t, n, r) => {
		let [o, i] = e, a = o + t.x + n.x, s = i + t.y + n.y;
		if (n.x === 0 || n.y === 0) {
			let [d, c] = Vr(o + t.x, i + t.y, r);
			n.x === 0 && (a = d), n.y === 0 && (s = c);
		}
		return {
			x: a - o,
			y: s - i
		};
	}, o6 = (e, t, n) => {
		let r = e.originalElements.get(t.id) ?? t;
		Y(t, {
			x: r.x + n.x,
			y: r.y + n.y
		});
	}, B9 = (e, t, n) => {
		let [r, o] = $e(e);
		return [t - r, n - o];
	}, _9 = ({ newElement: e, elementType: t, originX: n, originY: r, x: o, y: i, width: a, height: s, shouldMaintainAspectRatio: d, shouldResizeFromCenter: c, zoom: l, widthAspectRatio: U = null, originOffset: p = null, informMutation: m = !0 }) => {
		d && e.type !== "selection" && (U ? s = a / U : (Math.abs(i - r) > Math.abs(o - n) ? {width: a, height: s} = Oi(t, s, o < n ? -a : a) : {width: a, height: s} = Oi(t, a, i < r ? -s : s), s < 0 && (s = -s)));
		let b = o < n ? n - a : n, E = i < r ? r - s : r;
		c && (a += a, s += s, b = n - a / 2, E = r - s / 2);
		let g = null;
		if (k(e)) {
			s = e.height;
			let h = Ko(Ee({
				fontSize: e.fontSize,
				fontFamily: e.fontFamily
			}), e.lineHeight);
			a = Math.max(a, h), Math.abs(o - n) > Os / l && (g = { autoResize: !1 }), E = r, c && (b = n - a / 2);
		}
		if (a !== 0 && s !== 0) {
			let h = null;
			Ye(e) && (h = {
				initialWidth: a,
				initialHeight: s
			}), Y(e, {
				x: b + (p?.x ?? 0),
				y: E + (p?.y ?? 0),
				width: a,
				height: s,
				...g,
				...h
			}, m);
		}
	};
	O9 = (e, t) => !!(!e.viewModeEnabled && e.openDialog?.name !== "elementLinkSelector" && (e.activeTool.type !== "custom" && (e.editingTextElement || e.activeTool.type !== "selection" && e.activeTool.type !== "eraser" && e.activeTool.type !== "hand" && e.activeTool.type !== "laser") || at(t, e).length));
	X2 = (e) => {
		let t = 5381;
		for (let n = 0; n < e.length; n++) {
			let r = e.charCodeAt(n);
			t = (t << 5) + t + r;
		}
		return t >>> 0;
	}, f2 = (e) => e.filter((t) => !t.isDeleted && !ao(t)), Es = (e) => e.filter((t) => !t.isDeleted), zp = (e) => !e.isDeleted, i6 = (e) => Es(e).map((t) => na(t.type) ? {
		...t,
		lastCommittedPoint: null
	} : t), j2 = (e) => i6(e), Ri = (e) => i6(e);
	s6 = async (e) => {
		let t;
		if (e.type === H.png) try {
			return await (await __vitePreload(async () => {
				const { decodePngMetadata } = await import("./image-7KUKJ7J4-DWHZHYOd.js");
				return { decodePngMetadata };
			}, __vite__mapDeps([13,1,9]), import.meta.url)).decodePngMetadata(e);
		} catch (n) {
			throw n.message === "INVALID" ? new nn("Image doesn't contain scene", "IMAGE_NOT_CONTAINS_SCENE_DATA") : new nn("Error: cannot restore image");
		}
		else if ("text" in Blob ? t = await e.text() : t = await new Promise((n) => {
			let r = new FileReader();
			r.readAsText(e, "utf8"), r.onloadend = () => {
				r.readyState === FileReader.DONE && n(r.result);
			};
		}), e.type === H.svg) try {
			return mp({ svg: t });
		} catch (n) {
			throw n.message === "INVALID" ? new nn("Image doesn't contain scene", "IMAGE_NOT_CONTAINS_SCENE_DATA") : new nn("Error: cannot restore image");
		}
		return t;
	};
	K9 = (e) => e && e.name.match(/\.(json|excalidraw|png|svg)$/)?.[1] || null, DY = (e) => e === "png" || e === "svg", W2 = (e) => {
		let t = K9(e);
		return t === "png" || t === "svg";
	}, xs = (e) => !!e && Object.values(yo).includes(e), Hi = (e) => {
		let { type: t } = e || {};
		return xs(t);
	}, H9 = async (e, t, n, r) => {
		let o = await s6(e), i;
		try {
			try {
				i = JSON.parse(o);
			} catch (a) {
				throw Hi(e) ? new nn("Image doesn't contain scene", "IMAGE_NOT_CONTAINS_SCENE_DATA") : a;
			}
			if (Q2(i)) return {
				type: H.excalidraw,
				data: io({
					elements: Ri(i.elements || []),
					appState: {
						theme: t?.theme,
						fileHandle: r || e.handle || null,
						...Ro(i.appState || {}),
						...t ? _a(i.elements || [], t) : {}
					},
					files: i.files
				}, t, n, {
					repairBindings: !0,
					refreshDimensions: !1
				})
			};
			if (ns(i)) return {
				type: H.excalidrawlib,
				data: i
			};
			throw new Error("Error: invalid file");
		} catch (a) {
			throw a instanceof nn ? a : /* @__PURE__ */ new Error("Error: invalid file");
		}
	}, z2 = async (e, t, n, r) => {
		let o = await H9(e, t, n, r);
		if (o.type !== H.excalidraw) throw new Error("Error: invalid file");
		return o.data;
	}, J9 = (e, t = "unpublished") => {
		let n = JSON.parse(e);
		if (!ns(n)) throw new Error("Invalid library");
		return Lp(n.libraryItems || n.library, t);
	}, SY = async (e, t = "unpublished") => J9(await s6(e), t), vY = async (e) => new Promise(async (t, n) => {
		try {
			Fo(e) && (e = await e), e.toBlob((r) => {
				if (!r) return n(new Yo("Error: Canvas too big", "CANVAS_POSSIBLY_TOO_BIG"));
				t(r);
			});
		} catch (r) {
			n(r);
		}
	}), $Y = async (e) => {
		try {
			let t = await window.crypto.subtle.digest("SHA-1", await ln(e));
			return md(new Uint8Array(t));
		} catch (t) {
			return console.error(t), nanoid(40);
		}
	}, PY = async (e) => new Promise((t, n) => {
		let r = new FileReader();
		r.onload = () => {
			let o = r.result;
			t(o);
		}, r.onerror = (o) => n(o), r.readAsDataURL(e);
	}), NY = (e, t) => `data:${t};base64,${Li(lo(e), !0)}`, FY = (e, t = "") => {
		let n = e.indexOf(","), r = atob(e.slice(n + 1)), o = e.slice(0, n).split(":")[1].split(";")[0], i = new ArrayBuffer(r.length), a = new Uint8Array(i);
		for (let s = 0; s < r.length; s++) a[s] = r.charCodeAt(s);
		return new File([i], t, { type: o });
	}, BY = (e) => Di(e.slice(e.indexOf(",") + 1)), _Y = async (e, t) => {
		if (e.type === H.svg) return e;
		let [n, r] = await Promise.all([__vitePreload(() => import("./pica-hdwT5SCC.js").then((m) => /* @__PURE__ */ __toESM(m.default, 1)).then((i) => i.default), __vite__mapDeps([14,1]), import.meta.url), __vitePreload(() => import("./image-blob-reduce.esm-B8teUfI2.js").then((i) => i.default), __vite__mapDeps([15,1]), import.meta.url)]), o = r({ pica: n({ features: ["js", "wasm"] }) });
		if (t.outputType) {
			let { outputType: i } = t;
			o._create_blob = function(a) {
				return this.pica.toBlob(a.out_canvas, i, .8).then((s) => (a.out_blob = s, a));
			};
		}
		if (!Hi(e)) throw new Error("Error: unsupported file type", { cause: "UNSUPPORTED" });
		return new File([await o.toBlob(e, {
			max: t.maxWidthOrHeight,
			alpha: !0
		})], e.name, { type: t.outputType || e.type });
	}, OY = (e, t = "") => new File([new TextEncoder().encode(e)], t, { type: H.svg }), AY = async (e, t = "") => {
		let n;
		try {
			n = await fetch(e);
		} catch {
			throw new Error("Error: failed to fetch image", { cause: "FETCH_ERROR" });
		}
		if (!n.ok) throw new Error("Error: failed to fetch image", { cause: "FETCH_ERROR" });
		let r = await n.blob();
		if (r.type && Hi(r)) {
			let o = t || r.name || "";
			return new File([r], o, { type: r.type });
		}
		throw new Error("Error: unsupported file type", { cause: "UNSUPPORTED" });
	}, KY = async (e) => {
		let t = e.dataTransfer.files.item(0), n = await Y9(e);
		return {
			file: t ? await ts(t) : null,
			fileHandle: n
		};
	}, Y9 = async (e$1) => {
		if (e) try {
			return await e$1.dataTransfer.items[0].getAsFileSystemHandle() || null;
		} catch (t) {
			return console.warn(t.name, t.message), null;
		}
		return null;
	}, a6 = (e) => {
		let t = null, n = `${[...new Uint8Array(e).slice(0, 8)].join(" ")} `, r = {
			png: "137 80 78 71 13 10 26 10 ",
			jpg: "255 216 255 ",
			gif: "71 73 70 56 57 97 "
		};
		return n === r.png ? t = H.png : n.startsWith(r.jpg) ? t = H.jpg : n.startsWith(r.gif) && (t = H.gif), t;
	}, fr = (e, t, n) => new File([e], n || "", { type: t }), ts = async (e) => {
		if (e.type) {
			if (Hi(e)) {
				let t = await ln(e), n = a6(t);
				n && n !== e.type && (e = fr(t, n, e.name));
			}
		} else if (e?.name?.endsWith(".excalidrawlib")) e = fr(await ln(e), H.excalidrawlib, e.name);
		else if (e?.name?.endsWith(".excalidraw")) e = fr(await ln(e), H.excalidraw, e.name);
		else {
			let t = await ln(e), n = a6(t);
			n && (e = fr(t, n, e.name));
		}
		return e;
	}, ln = (e) => "arrayBuffer" in e ? e.arrayBuffer() : new Promise((t, n) => {
		let r = new FileReader();
		r.onload = (o) => {
			if (!o.target?.result) return n(/* @__PURE__ */ new Error("Couldn't convert blob to ArrayBuffer"));
			t(o.target.result);
		}, r.readAsArrayBuffer(e);
	});
	lo = (e) => {
		let t = typeof e == "string" ? new TextEncoder().encode(e) : e instanceof Uint8Array ? e : new Uint8Array(e), n = "";
		for (let r of t) n += String.fromCharCode(r);
		return n;
	}, d6 = (e) => {
		let t = new ArrayBuffer(e.length), n = new Uint8Array(t);
		for (let r = 0, o = e.length; r < o; r++) n[r] = e.charCodeAt(r);
		return t;
	}, c6 = (e) => new TextDecoder("utf-8").decode(d6(e)), Li = (e, t = !1) => t ? window.btoa(e) : window.btoa(lo(e)), Di = (e, t = !1) => t ? window.atob(e) : c6(window.atob(e));
	Si = ({ text: e, compress: t }) => {
		let n;
		if (t !== !1) try {
			n = lo(deflate_1$2(e));
		} catch (r) {
			console.error("encode: cannot deflate", r);
		}
		return {
			version: "1",
			encoding: "bstring",
			compressed: !!n,
			encoded: n || lo(e)
		};
	}, vi = (e) => {
		let t;
		switch (e.encoding) {
			case "bstring":
				t = e.compressed ? e.encoded : c6(e.encoded);
				break;
			default: throw new Error(`decode: unknown encoding "${e.encoding}"`);
		}
		return e.compressed ? inflate_1$2(new Uint8Array(d6(t)), { to: "string" }) : t;
	};
	X9 = async (e) => {
		let n = (0, import_png_chunks_extract.default)(new Uint8Array(await ln(e))).find((r) => r.name === "tEXt");
		return n ? import_png_chunk_text.decode(n.data) : null;
	}, _p = async ({ blob: e, metadata: t }) => {
		let n = (0, import_png_chunks_extract.default)(new Uint8Array(await ln(e))), r = import_png_chunk_text.encode(H.excalidraw, JSON.stringify(Si({
			text: t,
			compress: !0
		})));
		return n.splice(-1, 0, r), new Blob([(0, import_png_chunks_encode.default)(n)], { type: H.png });
	}, iC = async (e) => {
		let t = await X9(e);
		if (t?.keyword === H.excalidraw) try {
			let n = JSON.parse(t.text);
			if (!("encoded" in n)) {
				if ("type" in n && n.type === Ze.excalidraw) return t.text;
				throw new Error("FAILED");
			}
			return vi(n);
		} catch (n) {
			throw console.error(n), /* @__PURE__ */ new Error("FAILED");
		}
		throw new Error("INVALID");
	};
}));
//#endregion
export { Dg as $, b2 as $a, qe as $c, X as $i, ve as $l, Mm as $n, fh as $o, SK as $r, kp as $s, IO as $t, Ba as A, Zs as Aa, ny as Ac, V$ as Ai, to as Al, Kt as An, di as Ao, PE as Ar, iJ as As, G4 as At, yr as Au, C4 as B, _p as Ba, pB as Bc, Vx as Bi, ue as Bl, Lg as Bn, eh as Bo, Q9 as Br, j4 as Bs, H9 as Bt, zp as Bu, Ax as C, ZB as Ca, n4 as Cc, UF as Ci, t9 as Cl, KY as Cn, d4 as Co, Og as Cr, hm as Cs, Fa as Ct, yE as Cu, BN as D, Zh as Da, nn as Dc, Uh as Di, te as Dl, Ki as Dn, de as Do, Ot as Dr, i4 as Ds, Fo as Dt, yd as Du, B9 as E, Ze as Ea, ng as Ec, Ug as Ei, td as El, Kh as En, dF as Eo, Oo as Er, ht as Es, Fn as Et, yb as Eu, Bo as F, _Y as Fa, ot as Fc, Vg as Fi, u as Fl, LF as Fn, dy as Fo, Pm as Fr, init_chunk_FX7ZIABN as Fs, Gp as Ft, z9 as Fu, D1 as G, aF as Ga, pp as Gc, WF as Gi, uo as Gl, Lx as Gn, f$ as Go, R4 as Gr, k as Gs, Hi as Gt, init_rough as Gu, Ci as H, _x as Ha, pg as Hc, W4 as Hi, uh as Hl, Lo as Hn, ep as Ho, Qt as Hr, je as Hs, Ha as Ht, e as Hu, Bp as I, _a as Ia, oy as Ic, Vh as Ii, u7 as Il, LK as In, e4 as Io, Pr as Ir, io as Is, Gr as It, za as Iu, DE as J, ag as Ja, q1 as Jc, Wh as Ji, v4 as Jl, M9 as Jn, fB as Jo, Re as Jr, kB as Js, I2 as Jt, init_index_browser as Ju, D4 as K, ab as Ka, px as Kc, Wb as Ki, up as Kl, M2 as Kn, f4 as Ko, RF as Kr, k4 as Ks, Hm as Kt, rough_default as Ku, Bx as L, _h as La, p2 as Lc, Vn as Li, uH as Ll, LO as Ln, eE as Lo, Px as Lr, is as Ls, Gx as Lt, zb as Lu, Be as M, _9 as Ma, oe as Mc, V4 as Mi, ts as Ml, L1 as Mn, dr as Mo, Pe as Mr, ia as Ms, GO as Mt, z as Mu, Bi as N, _E as Na, og as Nc, VB as Ni, tt as Nl, L2 as Nn, ds as No, Ph as Nr, ie as Ns, Ga as Nt, z2 as Nu, BO as O, Zn as Oa, np as Oc, Ux as Oi, th as Ol, Km as On, dg as Oo, Ox as Or, iC as Os, Ft as Ot, yg as Ou, Bn as P, _N as Pa, op as Pc, Va as Pi, ty as Pl, L4 as Pn, dt as Po, Pi as Pr, ig as Ps, Gh as Pt, z4 as Pu, Dd as Q, ay as Qa, qa as Qc, Wx as Qi, vY as Ql, Mh as Qn, fg as Qo, S9 as Qr, ko as Qs, IH as Qt, C as R, _n as Ra, p4 as Rc, Vr as Ri, uK as Rl, Lb as Rn, ea as Ro, Q as Rr, it as Rs, H as Rt, ze as Ru, At as S, Z4 as Sa, mx as Sc, UB as Si, t4 as Sl, KO as Sn, d2 as So, Oa as Sr, hi as Ss, FY as St, y9 as Su, B4 as T, Zb as Ta, nd as Tc, Ua as Ti, ta as Tl, Kg as Tn, dE as To, On as Tr, hs as Ts, Fh as Tt, yO as Tu, Co as U, a4 as Ua, ph as Uc, W9 as Ui, ui as Ul, Lp as Un, er as Uo, Qx as Ur, jh as Us, Hb as Ut, clsx_m_default as Uu, Ch as V, _s as Va, pd as Vc, W2 as Vi, ug as Vl, Lh as Vn, en as Vo, Qh as Vr, j9 as Vs, HE as Vt, zs as Vu, Cs as W, aE as Wa, pi as Wc, WE as Wi, un as Wl, Ls as Wn, es as Wo, R2 as Wr, jx as Ws, Hh as Wt, init_clsx_m as Wu, DK as X, ao as Xa, qB as Xc, Ws as Xi, vK as Xl, Mb as Xn, fJ as Xo, Rx as Xr, kh as Xs, IE as Xt, init_open_color as Xu, DF as Y, an as Ya, q4 as Yc, Wo as Yi, vE as Yl, MF as Yn, fF as Yo, Rg as Yr, ke as Ys, I4 as Yt, nanoid as Yu, DY as Z, at as Za, qO as Zc, Wt as Zi, vP as Zl, Mg as Zn, fN as Zo, S4 as Zr, ki as Zs, IF as Zt, open_color_default as Zu, Ag as _, Yh as _a, mh as _c, Ts as _i, se as _l, Jx as _n, ch as _o, O4 as _r, hH as _s, F4 as _t, xh as _u, $g as a, Xh as aa, lB as ac, Sx as ai, r4 as al, Ix as an, ba as ao, N9 as ar, gB as as, E2 as at, w4 as au, An as b, Z as ba, mo as bc, U4 as bi, sr as bl, KE as bn, cs as bo, ON as br, he as bs, FN as bt, xt as bu, $r as c, Xr as ca, lP as cc, T4 as ci, ra as cl, JE as cn, bn as co, Na as cr, ga as cs, E9 as ct, wb as cu, A4 as d, Y$ as da, lh as dc, TF as di, rg as dl, Jb as dn, bx as do, Nn as dr, gh as ds, Ed as dt, wx as du, X4 as ea, kr as ec, SY as ei, qh as el, Ib as en, b4 as eo, Mo as er, fi as es, Dh as et, vg as eu, AE as f, Y4 as fa, ly as fc, Ta as fi, rp as fl, Je as fn, c4 as fo, Np as fr, gt as fs, Ee as ft, x4 as fu, Ae as g, Ye as ga, mg as gc, To as gi, sF as gl, Jt as gn, cg as go, O2 as gr, hE as gs, Ex as gt, xg as gu, Ad as h, Yb as ha, mH as hc, Tg as hi, sE as hl, Js as hn, cF as ho, O as hr, h9 as hs, Es as ht, xH as hu, $e as i, Xa as ia, l9 as ic, Sn as ii, qx as il, Io as in, bH as io, N6 as ir, g9 as is, Dx as it, w2 as iu, Bb as j, _4 as ja, o4 as jc, V2 as ji, tp as jl, Kx as jn, dn as jo, PY as jr, iP as js, GB as jt, yx as ju, BY as k, Zr as ka, nt as kc, Uy as ki, ti as kl, Ko as kn, dh as ko, P9 as kr, iE as ks, Fx as kt, yo as ku, $x as l, Xx as la, la as lc, T9 as li, rd as ll, J_ as ln, bp as lo, Ne as lr, gd as ls, EE as lt, wg as lu, AY as m, Y_ as ma, mE as mc, Td as mi, s4 as ml, Jm as mn, cE as mo, Nx as mr, h6 as ms, Ep as mt, xE as mu, $E as n, XB as na, kt as nc, Sg as ni, qr as nl, Ig as nn, b7 as no, Mx as nr, fx as ns, Ds as nt, vt as nu, $h as o, Xi as oa, lE as oc, T as oi, r6 as ol, J4 as on, bg as oo, NP as or, gE as os, E4 as ot, wE as ou, AN as p, YE as pa, m4 as pc, Tb as pi, ry as pl, Jh as pn, cB as po, Nr as pr, gx as ps, Eh as pt, x7 as pu, D6 as q, ae as qa, q$ as qc, We as qi, ux as ql, M4 as qn, f9 as qo, Rb as qr, k7 as qs, Hx as qt, require_lodash_throttle as qu, $Y as r, XO as ra, l4 as rc, Sh as ri, qt as rl, Ih as rn, bE as ro, N4 as rr, g4 as rs, Dt as rt, vx as ru, $o as s, Xp as sa, lF as sc, T2 as si, r9 as sl, J9 as sn, bh as so, NY as sr, gH as ss, E7 as st, wF as su, $2 as t, X9 as ta, ks as tc, Sb as ti, qi as tl, Ie as tn, b6 as to, Mp as tr, fn as ts, Dn as tt, vh as tu, A$ as u, Y as ua, lg as uc, TA as ui, re as ul, Ja as un, bs as uo, Nh as ur, gg as us, EH as ut, wt as uu, Ah as v, Yt as va, mi as vc, Tt as vi, sg as vl, K4 as vn, co as vo, O9 as vr, hO as vs, F6 as vt, xm as vu, B2 as w, Za as wa, na as wc, UP as wi, tE as wl, Ka as wn, dB as wo, Oh as wr, hn as ws, Fe as wt, yH as wu, Ar as x, Z2 as xa, mt as xc, U9 as xi, sy as xl, KN as xn, cy as xo, OY as xr, hg as xs, FP as xt, xx as xu, Am as y, Yx as ya, mn as yc, Tx as yi, sh as yl, K9 as yn, cp as yo, OE as yr, hd as ys, FE as yt, xn as yu, C$ as z, _o as za, p7 as zc, Vt as zi, ud as zl, Ld as zn, ee as zo, Q4 as zr, iy as zs, H4 as zt, zh as zu };
