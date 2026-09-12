import { a as __require, n as __esmMin, s as __toESM, t as __commonJSMin } from "./chunk-BRZcfu7K.js";
import { n as init_dist, t as Buffer } from "./dist-DNjXzICC.js";
//#region ../../node_modules/js-binary-schema-parser/lib/index.js
var require_lib$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.loop = exports.conditional = exports.parse = void 0;
	exports.parse = function parse(stream, schema) {
		var result = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
		var parent = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : result;
		if (Array.isArray(schema)) schema.forEach(function(partSchema) {
			return parse(stream, partSchema, result, parent);
		});
		else if (typeof schema === "function") schema(stream, result, parent, parse);
		else {
			var key = Object.keys(schema)[0];
			if (Array.isArray(schema[key])) {
				parent[key] = {};
				parse(stream, schema[key], result, parent[key]);
			} else parent[key] = schema[key](stream, result, parent, parse);
		}
		return result;
	};
	exports.conditional = function conditional(schema, conditionFunc) {
		return function(stream, result, parent, parse) {
			if (conditionFunc(stream, result, parent)) parse(stream, schema, result, parent);
		};
	};
	exports.loop = function loop(schema, continueFunc) {
		return function(stream, result, parent, parse) {
			var arr = [];
			var lastStreamPos = stream.pos;
			while (continueFunc(stream, result, parent)) {
				var newParent = {};
				parse(stream, schema, result, newParent);
				if (stream.pos === lastStreamPos) break;
				lastStreamPos = stream.pos;
				arr.push(newParent);
			}
			return arr;
		};
	};
}));
//#endregion
//#region ../../node_modules/js-binary-schema-parser/lib/parsers/uint8.js
var require_uint8 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.readBits = exports.readArray = exports.readUnsigned = exports.readString = exports.peekBytes = exports.readBytes = exports.peekByte = exports.readByte = exports.buildStream = void 0;
	exports.buildStream = function buildStream(uint8Data) {
		return {
			data: uint8Data,
			pos: 0
		};
	};
	var readByte = function readByte() {
		return function(stream) {
			return stream.data[stream.pos++];
		};
	};
	exports.readByte = readByte;
	exports.peekByte = function peekByte() {
		var offset = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
		return function(stream) {
			return stream.data[stream.pos + offset];
		};
	};
	var readBytes = function readBytes(length) {
		return function(stream) {
			return stream.data.subarray(stream.pos, stream.pos += length);
		};
	};
	exports.readBytes = readBytes;
	exports.peekBytes = function peekBytes(length) {
		return function(stream) {
			return stream.data.subarray(stream.pos, stream.pos + length);
		};
	};
	exports.readString = function readString(length) {
		return function(stream) {
			return Array.from(readBytes(length)(stream)).map(function(value) {
				return String.fromCharCode(value);
			}).join("");
		};
	};
	exports.readUnsigned = function readUnsigned(littleEndian) {
		return function(stream) {
			var bytes = readBytes(2)(stream);
			return littleEndian ? (bytes[1] << 8) + bytes[0] : (bytes[0] << 8) + bytes[1];
		};
	};
	exports.readArray = function readArray(byteSize, totalOrFunc) {
		return function(stream, result, parent) {
			var total = typeof totalOrFunc === "function" ? totalOrFunc(stream, result, parent) : totalOrFunc;
			var parser = readBytes(byteSize);
			var arr = new Array(total);
			for (var i = 0; i < total; i++) arr[i] = parser(stream);
			return arr;
		};
	};
	var subBitsTotal = function subBitsTotal(bits, startIndex, length) {
		var result = 0;
		for (var i = 0; i < length; i++) result += bits[startIndex + i] && Math.pow(2, length - i - 1);
		return result;
	};
	exports.readBits = function readBits(schema) {
		return function(stream) {
			var _byte = readByte()(stream);
			var bits = new Array(8);
			for (var i = 0; i < 8; i++) bits[7 - i] = !!(_byte & 1 << i);
			return Object.keys(schema).reduce(function(res, key) {
				var def = schema[key];
				if (def.length) res[key] = subBitsTotal(bits, def.index, def.length);
				else res[key] = bits[def.index];
				return res;
			}, {});
		};
	};
}));
//#endregion
//#region ../../node_modules/js-binary-schema-parser/lib/schemas/gif.js
var require_gif$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports["default"] = void 0;
	var _ = require_lib$1();
	var _uint = require_uint8();
	var subBlocksSchema = { blocks: function blocks(stream) {
		var terminator = 0;
		var chunks = [];
		var streamSize = stream.data.length;
		var total = 0;
		for (var size = (0, _uint.readByte)()(stream); size !== terminator; size = (0, _uint.readByte)()(stream)) {
			if (!size) break;
			if (stream.pos + size >= streamSize) {
				var availableSize = streamSize - stream.pos;
				chunks.push((0, _uint.readBytes)(availableSize)(stream));
				total += availableSize;
				break;
			}
			chunks.push((0, _uint.readBytes)(size)(stream));
			total += size;
		}
		var result = new Uint8Array(total);
		var offset = 0;
		for (var i = 0; i < chunks.length; i++) {
			result.set(chunks[i], offset);
			offset += chunks[i].length;
		}
		return result;
	} };
	var gceSchema = (0, _.conditional)({ gce: [
		{ codes: (0, _uint.readBytes)(2) },
		{ byteSize: (0, _uint.readByte)() },
		{ extras: (0, _uint.readBits)({
			future: {
				index: 0,
				length: 3
			},
			disposal: {
				index: 3,
				length: 3
			},
			userInput: { index: 6 },
			transparentColorGiven: { index: 7 }
		}) },
		{ delay: (0, _uint.readUnsigned)(true) },
		{ transparentColorIndex: (0, _uint.readByte)() },
		{ terminator: (0, _uint.readByte)() }
	] }, function(stream) {
		var codes = (0, _uint.peekBytes)(2)(stream);
		return codes[0] === 33 && codes[1] === 249;
	});
	var imageSchema = (0, _.conditional)({ image: [
		{ code: (0, _uint.readByte)() },
		{ descriptor: [
			{ left: (0, _uint.readUnsigned)(true) },
			{ top: (0, _uint.readUnsigned)(true) },
			{ width: (0, _uint.readUnsigned)(true) },
			{ height: (0, _uint.readUnsigned)(true) },
			{ lct: (0, _uint.readBits)({
				exists: { index: 0 },
				interlaced: { index: 1 },
				sort: { index: 2 },
				future: {
					index: 3,
					length: 2
				},
				size: {
					index: 5,
					length: 3
				}
			}) }
		] },
		(0, _.conditional)({ lct: (0, _uint.readArray)(3, function(stream, result, parent) {
			return Math.pow(2, parent.descriptor.lct.size + 1);
		}) }, function(stream, result, parent) {
			return parent.descriptor.lct.exists;
		}),
		{ data: [{ minCodeSize: (0, _uint.readByte)() }, subBlocksSchema] }
	] }, function(stream) {
		return (0, _uint.peekByte)()(stream) === 44;
	});
	var textSchema = (0, _.conditional)({ text: [
		{ codes: (0, _uint.readBytes)(2) },
		{ blockSize: (0, _uint.readByte)() },
		{ preData: function preData(stream, result, parent) {
			return (0, _uint.readBytes)(parent.text.blockSize)(stream);
		} },
		subBlocksSchema
	] }, function(stream) {
		var codes = (0, _uint.peekBytes)(2)(stream);
		return codes[0] === 33 && codes[1] === 1;
	});
	var applicationSchema = (0, _.conditional)({ application: [
		{ codes: (0, _uint.readBytes)(2) },
		{ blockSize: (0, _uint.readByte)() },
		{ id: function id(stream, result, parent) {
			return (0, _uint.readString)(parent.blockSize)(stream);
		} },
		subBlocksSchema
	] }, function(stream) {
		var codes = (0, _uint.peekBytes)(2)(stream);
		return codes[0] === 33 && codes[1] === 255;
	});
	var commentSchema = (0, _.conditional)({ comment: [{ codes: (0, _uint.readBytes)(2) }, subBlocksSchema] }, function(stream) {
		var codes = (0, _uint.peekBytes)(2)(stream);
		return codes[0] === 33 && codes[1] === 254;
	});
	exports["default"] = [
		{ header: [{ signature: (0, _uint.readString)(3) }, { version: (0, _uint.readString)(3) }] },
		{ lsd: [
			{ width: (0, _uint.readUnsigned)(true) },
			{ height: (0, _uint.readUnsigned)(true) },
			{ gct: (0, _uint.readBits)({
				exists: { index: 0 },
				resolution: {
					index: 1,
					length: 3
				},
				sort: { index: 4 },
				size: {
					index: 5,
					length: 3
				}
			}) },
			{ backgroundColorIndex: (0, _uint.readByte)() },
			{ pixelAspectRatio: (0, _uint.readByte)() }
		] },
		(0, _.conditional)({ gct: (0, _uint.readArray)(3, function(stream, result) {
			return Math.pow(2, result.lsd.gct.size + 1);
		}) }, function(stream, result) {
			return result.lsd.gct.exists;
		}),
		{ frames: (0, _.loop)([
			gceSchema,
			applicationSchema,
			commentSchema,
			imageSchema,
			textSchema
		], function(stream) {
			var nextCode = (0, _uint.peekByte)()(stream);
			return nextCode === 33 || nextCode === 44;
		}) }
	];
}));
//#endregion
//#region ../../node_modules/gifuct-js/lib/deinterlace.js
var require_deinterlace = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.deinterlace = void 0;
	exports.deinterlace = function deinterlace(pixels, width) {
		var newPixels = new Array(pixels.length);
		var rows = pixels.length / width;
		var cpRow = function cpRow(toRow, fromRow) {
			var fromPixels = pixels.slice(fromRow * width, (fromRow + 1) * width);
			newPixels.splice.apply(newPixels, [toRow * width, width].concat(fromPixels));
		};
		var offsets = [
			0,
			4,
			2,
			1
		];
		var steps = [
			8,
			8,
			4,
			2
		];
		var fromRow = 0;
		for (var pass = 0; pass < 4; pass++) for (var toRow = offsets[pass]; toRow < rows; toRow += steps[pass]) {
			cpRow(toRow, fromRow);
			fromRow++;
		}
		return newPixels;
	};
}));
//#endregion
//#region ../../node_modules/gifuct-js/lib/lzw.js
var require_lzw = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.lzw = void 0;
	exports.lzw = function lzw(minCodeSize, data, pixelCount) {
		var MAX_STACK_SIZE = 4096;
		var nullCode = -1;
		var npix = pixelCount;
		var available, clear, code_mask, code_size, end_of_information, in_code, old_code, bits, code, i, datum, data_size, first, top, bi, pi;
		var dstPixels = new Array(pixelCount);
		var prefix = new Array(MAX_STACK_SIZE);
		var suffix = new Array(MAX_STACK_SIZE);
		var pixelStack = new Array(MAX_STACK_SIZE + 1);
		data_size = minCodeSize;
		clear = 1 << data_size;
		end_of_information = clear + 1;
		available = clear + 2;
		old_code = nullCode;
		code_size = data_size + 1;
		code_mask = (1 << code_size) - 1;
		for (code = 0; code < clear; code++) {
			prefix[code] = 0;
			suffix[code] = code;
		}
		var datum = bits = first = top = pi = bi = 0, bits, first, top, pi, bi;
		for (i = 0; i < npix;) {
			if (top === 0) {
				if (bits < code_size) {
					datum += data[bi] << bits;
					bits += 8;
					bi++;
					continue;
				}
				code = datum & code_mask;
				datum >>= code_size;
				bits -= code_size;
				if (code > available || code == end_of_information) break;
				if (code == clear) {
					code_size = data_size + 1;
					code_mask = (1 << code_size) - 1;
					available = clear + 2;
					old_code = nullCode;
					continue;
				}
				if (old_code == nullCode) {
					pixelStack[top++] = suffix[code];
					old_code = code;
					first = code;
					continue;
				}
				in_code = code;
				if (code == available) {
					pixelStack[top++] = first;
					code = old_code;
				}
				while (code > clear) {
					pixelStack[top++] = suffix[code];
					code = prefix[code];
				}
				first = suffix[code] & 255;
				pixelStack[top++] = first;
				if (available < MAX_STACK_SIZE) {
					prefix[available] = old_code;
					suffix[available] = first;
					available++;
					if ((available & code_mask) === 0 && available < MAX_STACK_SIZE) {
						code_size++;
						code_mask += available;
					}
				}
				old_code = in_code;
			}
			top--;
			dstPixels[pi++] = pixelStack[top];
			i++;
		}
		for (i = pi; i < npix; i++) dstPixels[i] = 0;
		return dstPixels;
	};
}));
//#endregion
//#region ../../node_modules/gifuct-js/lib/index.js
var require_lib = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.decompressFrames = exports.decompressFrame = exports.parseGIF = void 0;
	var _gif = _interopRequireDefault(require_gif$1());
	var _jsBinarySchemaParser = require_lib$1();
	var _uint = require_uint8();
	var _deinterlace = require_deinterlace();
	var _lzw = require_lzw();
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { "default": obj };
	}
	exports.parseGIF = function parseGIF(arrayBuffer) {
		var byteData = new Uint8Array(arrayBuffer);
		return (0, _jsBinarySchemaParser.parse)((0, _uint.buildStream)(byteData), _gif["default"]);
	};
	var generatePatch = function generatePatch(image) {
		var totalPixels = image.pixels.length;
		var patchData = new Uint8ClampedArray(totalPixels * 4);
		for (var i = 0; i < totalPixels; i++) {
			var pos = i * 4;
			var colorIndex = image.pixels[i];
			var color = image.colorTable[colorIndex] || [
				0,
				0,
				0
			];
			patchData[pos] = color[0];
			patchData[pos + 1] = color[1];
			patchData[pos + 2] = color[2];
			patchData[pos + 3] = colorIndex !== image.transparentIndex ? 255 : 0;
		}
		return patchData;
	};
	var decompressFrame = function decompressFrame(frame, gct, buildImagePatch) {
		if (!frame.image) {
			console.warn("gif frame does not have associated image.");
			return;
		}
		var image = frame.image;
		var totalPixels = image.descriptor.width * image.descriptor.height;
		var pixels = (0, _lzw.lzw)(image.data.minCodeSize, image.data.blocks, totalPixels);
		if (image.descriptor.lct.interlaced) pixels = (0, _deinterlace.deinterlace)(pixels, image.descriptor.width);
		var resultImage = {
			pixels,
			dims: {
				top: frame.image.descriptor.top,
				left: frame.image.descriptor.left,
				width: frame.image.descriptor.width,
				height: frame.image.descriptor.height
			}
		};
		if (image.descriptor.lct && image.descriptor.lct.exists) resultImage.colorTable = image.lct;
		else resultImage.colorTable = gct;
		if (frame.gce) {
			resultImage.delay = (frame.gce.delay || 10) * 10;
			resultImage.disposalType = frame.gce.extras.disposal;
			if (frame.gce.extras.transparentColorGiven) resultImage.transparentIndex = frame.gce.transparentColorIndex;
		}
		if (buildImagePatch) resultImage.patch = generatePatch(resultImage);
		return resultImage;
	};
	exports.decompressFrame = decompressFrame;
	exports.decompressFrames = function decompressFrames(parsedGif, buildImagePatches) {
		return parsedGif.frames.filter(function(f) {
			return f.image;
		}).map(function(f) {
			return decompressFrame(f, parsedGif.gct, buildImagePatches);
		});
	};
}));
//#endregion
//#region ../../node_modules/super-image-cropper/esm/lib/decoder.js
var import_lib, a$1;
var init_decoder = __esmMin((() => {
	import_lib = require_lib();
	a$1 = class {
		url;
		parseGIF;
		constructor(e) {
			this.url = e;
		}
		async decode() {
			return this.parseGIF = (0, import_lib.parseGIF)(await this.fetchImageData(this.url)), this.validateAndFixFrame(this.parseGIF), this.parseGIF;
		}
		async decompressFrames() {
			this.parseGIF || await this.decode();
			const e = await (0, import_lib.decompressFrames)(this.parseGIF, !0);
			return {
				frames: this.generate2ImageData(e),
				delays: e.map(((e) => e.delay)),
				parsedFrames: e
			};
		}
		validateAndFixFrame = (e) => {
			let t = null;
			for (const a of e.frames) t = a.gce ? a.gce : t, "image" in a && !("gce" in a) && (a.gce = t);
		};
		generate2ImageData(e) {
			return e.map(((e) => {
				const t = e?.dims, a = new ImageData(t.width, t.height);
				return a.data.set(e.patch), a;
			}));
		}
		generate2ImageDataWithPixelsModified(e, t) {
			return e.map(((e, a) => {
				t[a];
				const r = this.parseGIF.lsd, s = new ImageData(r.width, r.height);
				return s.data.set(new Uint8ClampedArray(e)), s;
			}));
		}
		fetchImageData(e) {
			return new Promise(((t, a) => {
				const r = new XMLHttpRequest();
				r.open("GET", e, !0), r.responseType = "arraybuffer", r.onload = (e) => {
					if (!(e.target instanceof XMLHttpRequest)) return;
					if (200 !== e.target.status && 304 !== e.target.status) return void a("Status Error: " + e.target.status);
					let r = e.target.response;
					r.toString().indexOf("ArrayBuffer") > 0 && (r = new Uint8Array(r)), t(r);
				}, r.onerror = (e) => {
					a(e);
				}, r.send();
			}));
		}
		handlePixels(e) {
			const t = this.parseGIF.lsd, a = t.width * t.height * 4, r = [];
			for (let s = 0; s < e.length; ++s) {
				const i = e[s], n = 0 === s || 2 === e[s - 1].disposalType ? new Uint8ClampedArray(a) : r[s - 1].slice();
				r.push(this.putPixels(n, i, t));
			}
			return r;
		}
		putPixels(e, t, a) {
			if (!t.dims) return e;
			const { width: r, height: s, top: i, left: n } = t.dims, o = i * a.width + n;
			for (let i = 0; i < s; i++) for (let s = 0; s < r; s++) {
				const n = i * r + s, d = t.pixels[n], h = o + i * a.width + s, l = t.colorTable[d] || [
					0,
					0,
					0
				];
				d === t.transparentIndex ? (e[4 * h] = 0, e[4 * h + 1] = 0, e[4 * h + 2] = 0, e[4 * h + 3] = 0) : (e[4 * h] = l[0], e[4 * h + 1] = l[1], e[4 * h + 2] = l[2], e[4 * h + 3] = 255);
			}
			return e;
		}
	};
}));
//#endregion
//#region ../../node_modules/gif-build-worker-js/esm/lib/gif.worker.js
var t$2;
var init_gif_worker = __esmMin((() => {
	t$2 = "(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require==\"function\"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error(\"Cannot find module '\"+o+\"'\");throw f.code=\"MODULE_NOT_FOUND\",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require==\"function\"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){var NeuQuant=require(\"./TypedNeuQuant.js\");var LZWEncoder=require(\"./LZWEncoder.js\");function ByteArray(){this.page=-1;this.pages=[];this.newPage()}ByteArray.pageSize=4096;ByteArray.charMap={};for(var i=0;i<256;i++)ByteArray.charMap[i]=String.fromCharCode(i);ByteArray.prototype.newPage=function(){this.pages[++this.page]=new Uint8Array(ByteArray.pageSize);this.cursor=0};ByteArray.prototype.getData=function(){var rv=\"\";for(var p=0;p<this.pages.length;p++){for(var i=0;i<ByteArray.pageSize;i++){rv+=ByteArray.charMap[this.pages[p][i]]}}return rv};ByteArray.prototype.writeByte=function(val){if(this.cursor>=ByteArray.pageSize)this.newPage();this.pages[this.page][this.cursor++]=val};ByteArray.prototype.writeUTFBytes=function(string){for(var l=string.length,i=0;i<l;i++)this.writeByte(string.charCodeAt(i))};ByteArray.prototype.writeBytes=function(array,offset,length){for(var l=length||array.length,i=offset||0;i<l;i++)this.writeByte(array[i])};function GIFEncoder(width,height){this.width=~~width;this.height=~~height;this.transparent=null;this.transIndex=0;this.repeat=-1;this.delay=0;this.image=null;this.pixels=null;this.indexedPixels=null;this.colorDepth=null;this.colorTab=null;this.neuQuant=null;this.usedEntry=new Array;this.palSize=7;this.dispose=-1;this.firstFrame=true;this.sample=10;this.dither=false;this.globalPalette=false;this.out=new ByteArray}GIFEncoder.prototype.setDelay=function(milliseconds){this.delay=Math.round(milliseconds/10)};GIFEncoder.prototype.setFrameRate=function(fps){this.delay=Math.round(100/fps)};GIFEncoder.prototype.setDispose=function(disposalCode){if(disposalCode>=0)this.dispose=disposalCode};GIFEncoder.prototype.setRepeat=function(repeat){this.repeat=repeat};GIFEncoder.prototype.setTransparent=function(color){this.transparent=color};GIFEncoder.prototype.addFrame=function(imageData){this.image=imageData;this.colorTab=this.globalPalette&&this.globalPalette.slice?this.globalPalette:null;this.getImagePixels();this.analyzePixels();if(this.globalPalette===true)this.globalPalette=this.colorTab;if(this.firstFrame){this.writeLSD();this.writePalette();if(this.repeat>=0){this.writeNetscapeExt()}}this.writeGraphicCtrlExt();this.writeImageDesc();if(!this.firstFrame&&!this.globalPalette)this.writePalette();this.writePixels();this.firstFrame=false};GIFEncoder.prototype.finish=function(){this.out.writeByte(59)};GIFEncoder.prototype.setQuality=function(quality){if(quality<1)quality=1;this.sample=quality};GIFEncoder.prototype.setDither=function(dither){if(dither===true)dither=\"FloydSteinberg\";this.dither=dither};GIFEncoder.prototype.setGlobalPalette=function(palette){this.globalPalette=palette};GIFEncoder.prototype.getGlobalPalette=function(){return this.globalPalette&&this.globalPalette.slice&&this.globalPalette.slice(0)||this.globalPalette};GIFEncoder.prototype.writeHeader=function(){this.out.writeUTFBytes(\"GIF89a\")};GIFEncoder.prototype.analyzePixels=function(){if(!this.colorTab){this.neuQuant=new NeuQuant(this.pixels,this.sample);this.neuQuant.buildColormap();this.colorTab=this.neuQuant.getColormap()}if(this.dither){this.ditherPixels(this.dither.replace(\"-serpentine\",\"\"),this.dither.match(/-serpentine/)!==null)}else{this.indexPixels()}this.pixels=null;this.colorDepth=8;this.palSize=7;if(this.transparent!==null){this.transIndex=this.findClosest(this.transparent,true)}};GIFEncoder.prototype.indexPixels=function(imgq){var nPix=this.pixels.length/3;this.indexedPixels=new Uint8Array(nPix);var k=0;for(var j=0;j<nPix;j++){var index=this.findClosestRGB(this.pixels[k++]&255,this.pixels[k++]&255,this.pixels[k++]&255);this.usedEntry[index]=true;this.indexedPixels[j]=index}};GIFEncoder.prototype.ditherPixels=function(kernel,serpentine){var kernels={FalseFloydSteinberg:[[3/8,1,0],[3/8,0,1],[2/8,1,1]],FloydSteinberg:[[7/16,1,0],[3/16,-1,1],[5/16,0,1],[1/16,1,1]],Stucki:[[8/42,1,0],[4/42,2,0],[2/42,-2,1],[4/42,-1,1],[8/42,0,1],[4/42,1,1],[2/42,2,1],[1/42,-2,2],[2/42,-1,2],[4/42,0,2],[2/42,1,2],[1/42,2,2]],Atkinson:[[1/8,1,0],[1/8,2,0],[1/8,-1,1],[1/8,0,1],[1/8,1,1],[1/8,0,2]]};if(!kernel||!kernels[kernel]){throw\"Unknown dithering kernel: \"+kernel}var ds=kernels[kernel];var index=0,height=this.height,width=this.width,data=this.pixels;var direction=serpentine?-1:1;this.indexedPixels=new Uint8Array(this.pixels.length/3);for(var y=0;y<height;y++){if(serpentine)direction=direction*-1;for(var x=direction==1?0:width-1,xend=direction==1?width:0;x!==xend;x+=direction){index=y*width+x;var idx=index*3;var r1=data[idx];var g1=data[idx+1];var b1=data[idx+2];idx=this.findClosestRGB(r1,g1,b1);this.usedEntry[idx]=true;this.indexedPixels[index]=idx;idx*=3;var r2=this.colorTab[idx];var g2=this.colorTab[idx+1];var b2=this.colorTab[idx+2];var er=r1-r2;var eg=g1-g2;var eb=b1-b2;for(var i=direction==1?0:ds.length-1,end=direction==1?ds.length:0;i!==end;i+=direction){var x1=ds[i][1];var y1=ds[i][2];if(x1+x>=0&&x1+x<width&&y1+y>=0&&y1+y<height){var d=ds[i][0];idx=index+x1+y1*width;idx*=3;data[idx]=Math.max(0,Math.min(255,data[idx]+er*d));data[idx+1]=Math.max(0,Math.min(255,data[idx+1]+eg*d));data[idx+2]=Math.max(0,Math.min(255,data[idx+2]+eb*d))}}}}};GIFEncoder.prototype.findClosest=function(c,used){return this.findClosestRGB((c&16711680)>>16,(c&65280)>>8,c&255,used)};GIFEncoder.prototype.findClosestRGB=function(r,g,b,used){if(this.colorTab===null)return-1;if(this.neuQuant&&!used){return this.neuQuant.lookupRGB(r,g,b)}var c=b|g<<8|r<<16;var minpos=0;var dmin=256*256*256;var len=this.colorTab.length;for(var i=0,index=0;i<len;index++){var dr=r-(this.colorTab[i++]&255);var dg=g-(this.colorTab[i++]&255);var db=b-(this.colorTab[i++]&255);var d=dr*dr+dg*dg+db*db;if((!used||this.usedEntry[index])&&d<dmin){dmin=d;minpos=index}}return minpos};GIFEncoder.prototype.getImagePixels=function(){var w=this.width;var h=this.height;this.pixels=new Uint8Array(w*h*3);var data=this.image;var srcPos=0;var count=0;for(var i=0;i<h;i++){for(var j=0;j<w;j++){this.pixels[count++]=data[srcPos++];this.pixels[count++]=data[srcPos++];this.pixels[count++]=data[srcPos++];srcPos++}}};GIFEncoder.prototype.writeGraphicCtrlExt=function(){this.out.writeByte(33);this.out.writeByte(249);this.out.writeByte(4);var transp,disp;if(this.transparent===null){transp=0;disp=0}else{transp=1;disp=2}if(this.dispose>=0){disp=dispose&7}disp<<=2;this.out.writeByte(0|disp|0|transp);this.writeShort(this.delay);this.out.writeByte(this.transIndex);this.out.writeByte(0)};GIFEncoder.prototype.writeImageDesc=function(){this.out.writeByte(44);this.writeShort(0);this.writeShort(0);this.writeShort(this.width);this.writeShort(this.height);if(this.firstFrame||this.globalPalette){this.out.writeByte(0)}else{this.out.writeByte(128|0|0|0|this.palSize)}};GIFEncoder.prototype.writeLSD=function(){this.writeShort(this.width);this.writeShort(this.height);this.out.writeByte(128|112|0|this.palSize);this.out.writeByte(0);this.out.writeByte(0)};GIFEncoder.prototype.writeNetscapeExt=function(){this.out.writeByte(33);this.out.writeByte(255);this.out.writeByte(11);this.out.writeUTFBytes(\"NETSCAPE2.0\");this.out.writeByte(3);this.out.writeByte(1);this.writeShort(this.repeat);this.out.writeByte(0)};GIFEncoder.prototype.writePalette=function(){this.out.writeBytes(this.colorTab);var n=3*256-this.colorTab.length;for(var i=0;i<n;i++)this.out.writeByte(0)};GIFEncoder.prototype.writeShort=function(pValue){this.out.writeByte(pValue&255);this.out.writeByte(pValue>>8&255)};GIFEncoder.prototype.writePixels=function(){var enc=new LZWEncoder(this.width,this.height,this.indexedPixels,this.colorDepth);enc.encode(this.out)};GIFEncoder.prototype.stream=function(){return this.out};module.exports=GIFEncoder},{\"./LZWEncoder.js\":2,\"./TypedNeuQuant.js\":3}],2:[function(require,module,exports){var EOF=-1;var BITS=12;var HSIZE=5003;var masks=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535];function LZWEncoder(width,height,pixels,colorDepth){var initCodeSize=Math.max(2,colorDepth);var accum=new Uint8Array(256);var htab=new Int32Array(HSIZE);var codetab=new Int32Array(HSIZE);var cur_accum,cur_bits=0;var a_count;var free_ent=0;var maxcode;var clear_flg=false;var g_init_bits,ClearCode,EOFCode;function char_out(c,outs){accum[a_count++]=c;if(a_count>=254)flush_char(outs)}function cl_block(outs){cl_hash(HSIZE);free_ent=ClearCode+2;clear_flg=true;output(ClearCode,outs)}function cl_hash(hsize){for(var i=0;i<hsize;++i)htab[i]=-1}function compress(init_bits,outs){var fcode,c,i,ent,disp,hsize_reg,hshift;g_init_bits=init_bits;clear_flg=false;n_bits=g_init_bits;maxcode=MAXCODE(n_bits);ClearCode=1<<init_bits-1;EOFCode=ClearCode+1;free_ent=ClearCode+2;a_count=0;ent=nextPixel();hshift=0;for(fcode=HSIZE;fcode<65536;fcode*=2)++hshift;hshift=8-hshift;hsize_reg=HSIZE;cl_hash(hsize_reg);output(ClearCode,outs);outer_loop:while((c=nextPixel())!=EOF){fcode=(c<<BITS)+ent;i=c<<hshift^ent;if(htab[i]===fcode){ent=codetab[i];continue}else if(htab[i]>=0){disp=hsize_reg-i;if(i===0)disp=1;do{if((i-=disp)<0)i+=hsize_reg;if(htab[i]===fcode){ent=codetab[i];continue outer_loop}}while(htab[i]>=0)}output(ent,outs);ent=c;if(free_ent<1<<BITS){codetab[i]=free_ent++;htab[i]=fcode}else{cl_block(outs)}}output(ent,outs);output(EOFCode,outs)}function encode(outs){outs.writeByte(initCodeSize);remaining=width*height;curPixel=0;compress(initCodeSize+1,outs);outs.writeByte(0)}function flush_char(outs){if(a_count>0){outs.writeByte(a_count);outs.writeBytes(accum,0,a_count);a_count=0}}function MAXCODE(n_bits){return(1<<n_bits)-1}function nextPixel(){if(remaining===0)return EOF;--remaining;var pix=pixels[curPixel++];return pix&255}function output(code,outs){cur_accum&=masks[cur_bits];if(cur_bits>0)cur_accum|=code<<cur_bits;else cur_accum=code;cur_bits+=n_bits;while(cur_bits>=8){char_out(cur_accum&255,outs);cur_accum>>=8;cur_bits-=8}if(free_ent>maxcode||clear_flg){if(clear_flg){maxcode=MAXCODE(n_bits=g_init_bits);clear_flg=false}else{++n_bits;if(n_bits==BITS)maxcode=1<<BITS;else maxcode=MAXCODE(n_bits)}}if(code==EOFCode){while(cur_bits>0){char_out(cur_accum&255,outs);cur_accum>>=8;cur_bits-=8}flush_char(outs)}}this.encode=encode}module.exports=LZWEncoder},{}],3:[function(require,module,exports){var ncycles=100;var netsize=256;var maxnetpos=netsize-1;var netbiasshift=4;var intbiasshift=16;var intbias=1<<intbiasshift;var gammashift=10;var gamma=1<<gammashift;var betashift=10;var beta=intbias>>betashift;var betagamma=intbias<<gammashift-betashift;var initrad=netsize>>3;var radiusbiasshift=6;var radiusbias=1<<radiusbiasshift;var initradius=initrad*radiusbias;var radiusdec=30;var alphabiasshift=10;var initalpha=1<<alphabiasshift;var alphadec;var radbiasshift=8;var radbias=1<<radbiasshift;var alpharadbshift=alphabiasshift+radbiasshift;var alpharadbias=1<<alpharadbshift;var prime1=499;var prime2=491;var prime3=487;var prime4=503;var minpicturebytes=3*prime4;function NeuQuant(pixels,samplefac){var network;var netindex;var bias;var freq;var radpower;function init(){network=[];netindex=new Int32Array(256);bias=new Int32Array(netsize);freq=new Int32Array(netsize);radpower=new Int32Array(netsize>>3);var i,v;for(i=0;i<netsize;i++){v=(i<<netbiasshift+8)/netsize;network[i]=new Float64Array([v,v,v,0]);freq[i]=intbias/netsize;bias[i]=0}}function unbiasnet(){for(var i=0;i<netsize;i++){network[i][0]>>=netbiasshift;network[i][1]>>=netbiasshift;network[i][2]>>=netbiasshift;network[i][3]=i}}function altersingle(alpha,i,b,g,r){network[i][0]-=alpha*(network[i][0]-b)/initalpha;network[i][1]-=alpha*(network[i][1]-g)/initalpha;network[i][2]-=alpha*(network[i][2]-r)/initalpha}function alterneigh(radius,i,b,g,r){var lo=Math.abs(i-radius);var hi=Math.min(i+radius,netsize);var j=i+1;var k=i-1;var m=1;var p,a;while(j<hi||k>lo){a=radpower[m++];if(j<hi){p=network[j++];p[0]-=a*(p[0]-b)/alpharadbias;p[1]-=a*(p[1]-g)/alpharadbias;p[2]-=a*(p[2]-r)/alpharadbias}if(k>lo){p=network[k--];p[0]-=a*(p[0]-b)/alpharadbias;p[1]-=a*(p[1]-g)/alpharadbias;p[2]-=a*(p[2]-r)/alpharadbias}}}function contest(b,g,r){var bestd=~(1<<31);var bestbiasd=bestd;var bestpos=-1;var bestbiaspos=bestpos;var i,n,dist,biasdist,betafreq;for(i=0;i<netsize;i++){n=network[i];dist=Math.abs(n[0]-b)+Math.abs(n[1]-g)+Math.abs(n[2]-r);if(dist<bestd){bestd=dist;bestpos=i}biasdist=dist-(bias[i]>>intbiasshift-netbiasshift);if(biasdist<bestbiasd){bestbiasd=biasdist;bestbiaspos=i}betafreq=freq[i]>>betashift;freq[i]-=betafreq;bias[i]+=betafreq<<gammashift}freq[bestpos]+=beta;bias[bestpos]-=betagamma;return bestbiaspos}function inxbuild(){var i,j,p,q,smallpos,smallval,previouscol=0,startpos=0;for(i=0;i<netsize;i++){p=network[i];smallpos=i;smallval=p[1];for(j=i+1;j<netsize;j++){q=network[j];if(q[1]<smallval){smallpos=j;smallval=q[1]}}q=network[smallpos];if(i!=smallpos){j=q[0];q[0]=p[0];p[0]=j;j=q[1];q[1]=p[1];p[1]=j;j=q[2];q[2]=p[2];p[2]=j;j=q[3];q[3]=p[3];p[3]=j}if(smallval!=previouscol){netindex[previouscol]=startpos+i>>1;for(j=previouscol+1;j<smallval;j++)netindex[j]=i;previouscol=smallval;startpos=i}}netindex[previouscol]=startpos+maxnetpos>>1;for(j=previouscol+1;j<256;j++)netindex[j]=maxnetpos}function inxsearch(b,g,r){var a,p,dist;var bestd=1e3;var best=-1;var i=netindex[g];var j=i-1;while(i<netsize||j>=0){if(i<netsize){p=network[i];dist=p[1]-g;if(dist>=bestd)i=netsize;else{i++;if(dist<0)dist=-dist;a=p[0]-b;if(a<0)a=-a;dist+=a;if(dist<bestd){a=p[2]-r;if(a<0)a=-a;dist+=a;if(dist<bestd){bestd=dist;best=p[3]}}}}if(j>=0){p=network[j];dist=g-p[1];if(dist>=bestd)j=-1;else{j--;if(dist<0)dist=-dist;a=p[0]-b;if(a<0)a=-a;dist+=a;if(dist<bestd){a=p[2]-r;if(a<0)a=-a;dist+=a;if(dist<bestd){bestd=dist;best=p[3]}}}}}return best}function learn(){var i;var lengthcount=pixels.length;var alphadec=30+(samplefac-1)/3;var samplepixels=lengthcount/(3*samplefac);var delta=~~(samplepixels/ncycles);var alpha=initalpha;var radius=initradius;var rad=radius>>radiusbiasshift;if(rad<=1)rad=0;for(i=0;i<rad;i++)radpower[i]=alpha*((rad*rad-i*i)*radbias/(rad*rad));var step;if(lengthcount<minpicturebytes){samplefac=1;step=3}else if(lengthcount%prime1!==0){step=3*prime1}else if(lengthcount%prime2!==0){step=3*prime2}else if(lengthcount%prime3!==0){step=3*prime3}else{step=3*prime4}var b,g,r,j;var pix=0;i=0;while(i<samplepixels){b=(pixels[pix]&255)<<netbiasshift;g=(pixels[pix+1]&255)<<netbiasshift;r=(pixels[pix+2]&255)<<netbiasshift;j=contest(b,g,r);altersingle(alpha,j,b,g,r);if(rad!==0)alterneigh(rad,j,b,g,r);pix+=step;if(pix>=lengthcount)pix-=lengthcount;i++;if(delta===0)delta=1;if(i%delta===0){alpha-=alpha/alphadec;radius-=radius/radiusdec;rad=radius>>radiusbiasshift;if(rad<=1)rad=0;for(j=0;j<rad;j++)radpower[j]=alpha*((rad*rad-j*j)*radbias/(rad*rad))}}}function buildColormap(){init();learn();unbiasnet();inxbuild()}this.buildColormap=buildColormap;function getColormap(){var map=[];var index=[];for(var i=0;i<netsize;i++)index[network[i][3]]=i;var k=0;for(var l=0;l<netsize;l++){var j=index[l];map[k++]=network[j][0];map[k++]=network[j][1];map[k++]=network[j][2]}return map}this.getColormap=getColormap;this.lookupRGB=inxsearch}module.exports=NeuQuant},{}],4:[function(require,module,exports){var GIFEncoder,renderFrame;GIFEncoder=require(\"./GIFEncoder.js\");renderFrame=function(frame){var encoder,page,stream,transfer;encoder=new GIFEncoder(frame.width,frame.height);if(frame.index===0){encoder.writeHeader()}else{encoder.firstFrame=false}encoder.setTransparent(frame.transparent);encoder.setRepeat(frame.repeat);encoder.setDelay(frame.delay);encoder.setQuality(frame.quality);encoder.setDither(frame.dither);encoder.setGlobalPalette(frame.globalPalette);encoder.addFrame(frame.data);if(frame.last){encoder.finish()}if(frame.globalPalette===true){frame.globalPalette=encoder.getGlobalPalette()}stream=encoder.stream();frame.data=stream.pages;frame.cursor=stream.cursor;frame.pageSize=stream.constructor.pageSize;if(frame.canTransfer){transfer=function(){var i,len,ref,results;ref=frame.data;results=[];for(i=0,len=ref.length;i<len;i++){page=ref[i];results.push(page.buffer)}return results}();return self.postMessage(frame,transfer)}else{return self.postMessage(frame)}};self.onmessage=function(event){return renderFrame(event.data)}},{\"./GIFEncoder.js\":1}]},{},[4]);";
}));
//#endregion
//#region ../../node_modules/gif-build-worker-js/esm/index.js
var r$2, e$1;
var init_esm$1 = __esmMin((() => {
	init_gif_worker();
	r$2 = () => {
		const t = new Blob([e$1], { type: "application/javascript" });
		return URL.createObjectURL(t);
	}, e$1 = t$2;
}));
//#endregion
//#region ../../node_modules/gif.js/dist/gif.js
var require_gif = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(f) {
		if (typeof exports === "object" && typeof module !== "undefined") module.exports = f();
		else if (typeof define === "function" && define.amd) define([], f);
		else {
			var g;
			if (typeof window !== "undefined") g = window;
			else if (typeof globalThis !== "undefined") g = globalThis;
			else if (typeof self !== "undefined") g = self;
			else g = this;
			g.GIF = f();
		}
	})(function() {
		return function e(t, n, r) {
			function s(o, u) {
				if (!n[o]) {
					if (!t[o]) {
						var a = typeof __require == "function" && __require;
						if (!u && a) return a(o, !0);
						if (i) return i(o, !0);
						var f = /* @__PURE__ */ new Error("Cannot find module '" + o + "'");
						throw f.code = "MODULE_NOT_FOUND", f;
					}
					var l = n[o] = { exports: {} };
					t[o][0].call(l.exports, function(e) {
						var n = t[o][1][e];
						return s(n ? n : e);
					}, l, l.exports, e, t, n, r);
				}
				return n[o].exports;
			}
			var i = typeof __require == "function" && __require;
			for (var o = 0; o < r.length; o++) s(r[o]);
			return s;
		}({
			1: [function(require, module$1, exports$1) {
				function EventEmitter() {
					this._events = this._events || {};
					this._maxListeners = this._maxListeners || void 0;
				}
				module$1.exports = EventEmitter;
				EventEmitter.EventEmitter = EventEmitter;
				EventEmitter.prototype._events = void 0;
				EventEmitter.prototype._maxListeners = void 0;
				EventEmitter.defaultMaxListeners = 10;
				EventEmitter.prototype.setMaxListeners = function(n) {
					if (!isNumber(n) || n < 0 || isNaN(n)) throw TypeError("n must be a positive number");
					this._maxListeners = n;
					return this;
				};
				EventEmitter.prototype.emit = function(type) {
					var er, handler, len, args, i, listeners;
					if (!this._events) this._events = {};
					if (type === "error") {
						if (!this._events.error || isObject(this._events.error) && !this._events.error.length) {
							er = arguments[1];
							if (er instanceof Error) throw er;
							else {
								var err = /* @__PURE__ */ new Error("Uncaught, unspecified \"error\" event. (" + er + ")");
								err.context = er;
								throw err;
							}
						}
					}
					handler = this._events[type];
					if (isUndefined(handler)) return false;
					if (isFunction(handler)) switch (arguments.length) {
						case 1:
							handler.call(this);
							break;
						case 2:
							handler.call(this, arguments[1]);
							break;
						case 3:
							handler.call(this, arguments[1], arguments[2]);
							break;
						default:
							args = Array.prototype.slice.call(arguments, 1);
							handler.apply(this, args);
					}
					else if (isObject(handler)) {
						args = Array.prototype.slice.call(arguments, 1);
						listeners = handler.slice();
						len = listeners.length;
						for (i = 0; i < len; i++) listeners[i].apply(this, args);
					}
					return true;
				};
				EventEmitter.prototype.addListener = function(type, listener) {
					var m;
					if (!isFunction(listener)) throw TypeError("listener must be a function");
					if (!this._events) this._events = {};
					if (this._events.newListener) this.emit("newListener", type, isFunction(listener.listener) ? listener.listener : listener);
					if (!this._events[type]) this._events[type] = listener;
					else if (isObject(this._events[type])) this._events[type].push(listener);
					else this._events[type] = [this._events[type], listener];
					if (isObject(this._events[type]) && !this._events[type].warned) {
						if (!isUndefined(this._maxListeners)) m = this._maxListeners;
						else m = EventEmitter.defaultMaxListeners;
						if (m && m > 0 && this._events[type].length > m) {
							this._events[type].warned = true;
							console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[type].length);
							if (typeof console.trace === "function") console.trace();
						}
					}
					return this;
				};
				EventEmitter.prototype.on = EventEmitter.prototype.addListener;
				EventEmitter.prototype.once = function(type, listener) {
					if (!isFunction(listener)) throw TypeError("listener must be a function");
					var fired = false;
					function g() {
						this.removeListener(type, g);
						if (!fired) {
							fired = true;
							listener.apply(this, arguments);
						}
					}
					g.listener = listener;
					this.on(type, g);
					return this;
				};
				EventEmitter.prototype.removeListener = function(type, listener) {
					var list, position, length, i;
					if (!isFunction(listener)) throw TypeError("listener must be a function");
					if (!this._events || !this._events[type]) return this;
					list = this._events[type];
					length = list.length;
					position = -1;
					if (list === listener || isFunction(list.listener) && list.listener === listener) {
						delete this._events[type];
						if (this._events.removeListener) this.emit("removeListener", type, listener);
					} else if (isObject(list)) {
						for (i = length; i-- > 0;) if (list[i] === listener || list[i].listener && list[i].listener === listener) {
							position = i;
							break;
						}
						if (position < 0) return this;
						if (list.length === 1) {
							list.length = 0;
							delete this._events[type];
						} else list.splice(position, 1);
						if (this._events.removeListener) this.emit("removeListener", type, listener);
					}
					return this;
				};
				EventEmitter.prototype.removeAllListeners = function(type) {
					var key, listeners;
					if (!this._events) return this;
					if (!this._events.removeListener) {
						if (arguments.length === 0) this._events = {};
						else if (this._events[type]) delete this._events[type];
						return this;
					}
					if (arguments.length === 0) {
						for (key in this._events) {
							if (key === "removeListener") continue;
							this.removeAllListeners(key);
						}
						this.removeAllListeners("removeListener");
						this._events = {};
						return this;
					}
					listeners = this._events[type];
					if (isFunction(listeners)) this.removeListener(type, listeners);
					else if (listeners) while (listeners.length) this.removeListener(type, listeners[listeners.length - 1]);
					delete this._events[type];
					return this;
				};
				EventEmitter.prototype.listeners = function(type) {
					var ret;
					if (!this._events || !this._events[type]) ret = [];
					else if (isFunction(this._events[type])) ret = [this._events[type]];
					else ret = this._events[type].slice();
					return ret;
				};
				EventEmitter.prototype.listenerCount = function(type) {
					if (this._events) {
						var evlistener = this._events[type];
						if (isFunction(evlistener)) return 1;
						else if (evlistener) return evlistener.length;
					}
					return 0;
				};
				EventEmitter.listenerCount = function(emitter, type) {
					return emitter.listenerCount(type);
				};
				function isFunction(arg) {
					return typeof arg === "function";
				}
				function isNumber(arg) {
					return typeof arg === "number";
				}
				function isObject(arg) {
					return typeof arg === "object" && arg !== null;
				}
				function isUndefined(arg) {
					return arg === void 0;
				}
			}, {}],
			2: [function(require, module$2, exports$2) {
				var UA, browser, mode, platform, ua = navigator.userAgent.toLowerCase();
				platform = navigator.platform.toLowerCase();
				UA = ua.match(/(opera|ie|firefox|chrome|version)[\s\/:]([\w\d\.]+)?.*?(safari|version[\s\/:]([\w\d\.]+)|$)/) || [
					null,
					"unknown",
					0
				];
				mode = UA[1] === "ie" && document.documentMode;
				browser = {
					name: UA[1] === "version" ? UA[3] : UA[1],
					version: mode || parseFloat(UA[1] === "opera" && UA[4] ? UA[4] : UA[2]),
					platform: { name: ua.match(/ip(?:ad|od|hone)/) ? "ios" : (ua.match(/(?:webos|android)/) || platform.match(/mac|win|linux/) || ["other"])[0] }
				};
				browser[browser.name] = true;
				browser[browser.name + parseInt(browser.version, 10)] = true;
				browser.platform[browser.platform.name] = true;
				module$2.exports = browser;
			}, {}],
			3: [function(require, module$3, exports$3) {
				var EventEmitter, GIF, browser, extend = function(child, parent) {
					for (var key in parent) if (hasProp.call(parent, key)) child[key] = parent[key];
					function ctor() {
						this.constructor = child;
					}
					ctor.prototype = parent.prototype;
					child.prototype = new ctor();
					child.__super__ = parent.prototype;
					return child;
				}, hasProp = {}.hasOwnProperty, indexOf = [].indexOf || function(item) {
					for (var i = 0, l = this.length; i < l; i++) if (i in this && this[i] === item) return i;
					return -1;
				}, slice = [].slice;
				EventEmitter = require("events").EventEmitter;
				browser = require("./browser.coffee");
				GIF = function(superClass) {
					var defaults, frameDefaults;
					extend(GIF, superClass);
					defaults = {
						workerScript: "gif.worker.js",
						workers: 2,
						repeat: 0,
						background: "#fff",
						quality: 10,
						width: null,
						height: null,
						transparent: null,
						debug: false,
						dither: false
					};
					frameDefaults = {
						delay: 500,
						copy: false
					};
					function GIF(options) {
						var base, key, value;
						this.running = false;
						this.options = {};
						this.frames = [];
						this.freeWorkers = [];
						this.activeWorkers = [];
						this.setOptions(options);
						for (key in defaults) {
							value = defaults[key];
							if ((base = this.options)[key] == null) base[key] = value;
						}
					}
					GIF.prototype.setOption = function(key, value) {
						this.options[key] = value;
						if (this._canvas != null && (key === "width" || key === "height")) return this._canvas[key] = value;
					};
					GIF.prototype.setOptions = function(options) {
						var key, results = [], value;
						for (key in options) {
							if (!hasProp.call(options, key)) continue;
							value = options[key];
							results.push(this.setOption(key, value));
						}
						return results;
					};
					GIF.prototype.addFrame = function(image, options) {
						var frame, key;
						if (options == null) options = {};
						frame = {};
						frame.transparent = this.options.transparent;
						for (key in frameDefaults) frame[key] = options[key] || frameDefaults[key];
						if (this.options.width == null) this.setOption("width", image.width);
						if (this.options.height == null) this.setOption("height", image.height);
						if (typeof ImageData !== "undefined" && ImageData !== null && image instanceof ImageData) frame.data = image.data;
						else if (typeof CanvasRenderingContext2D !== "undefined" && CanvasRenderingContext2D !== null && image instanceof CanvasRenderingContext2D || typeof WebGLRenderingContext !== "undefined" && WebGLRenderingContext !== null && image instanceof WebGLRenderingContext) if (options.copy) frame.data = this.getContextData(image);
						else frame.context = image;
						else if (image.childNodes != null) if (options.copy) frame.data = this.getImageData(image);
						else frame.image = image;
						else throw new Error("Invalid image");
						return this.frames.push(frame);
					};
					GIF.prototype.render = function() {
						var j, numWorkers, ref;
						if (this.running) throw new Error("Already running");
						if (this.options.width == null || this.options.height == null) throw new Error("Width and height must be set prior to rendering");
						this.running = true;
						this.nextFrame = 0;
						this.finishedFrames = 0;
						this.imageParts = function() {
							var j, ref, results = [];
							for (j = 0, ref = this.frames.length; 0 <= ref ? j < ref : j > ref; 0 <= ref ? ++j : --j) results.push(null);
							return results;
						}.call(this);
						numWorkers = this.spawnWorkers();
						if (this.options.globalPalette === true) this.renderNextFrame();
						else for (j = 0, ref = numWorkers; 0 <= ref ? j < ref : j > ref; 0 <= ref ? ++j : --j) this.renderNextFrame();
						this.emit("start");
						return this.emit("progress", 0);
					};
					GIF.prototype.abort = function() {
						var worker;
						while (true) {
							worker = this.activeWorkers.shift();
							if (worker == null) break;
							this.log("killing active worker");
							worker.terminate();
						}
						this.running = false;
						return this.emit("abort");
					};
					GIF.prototype.spawnWorkers = function() {
						var numWorkers = Math.min(this.options.workers, this.frames.length), ref, results;
						(function() {
							results = [];
							for (var j = ref = this.freeWorkers.length; ref <= numWorkers ? j < numWorkers : j > numWorkers; ref <= numWorkers ? j++ : j--) results.push(j);
							return results;
						}).apply(this).forEach(function(_this) {
							return function(i) {
								var worker;
								_this.log("spawning worker " + i);
								worker = new Worker(_this.options.workerScript);
								worker.onmessage = function(event) {
									_this.activeWorkers.splice(_this.activeWorkers.indexOf(worker), 1);
									_this.freeWorkers.push(worker);
									return _this.frameFinished(event.data);
								};
								return _this.freeWorkers.push(worker);
							};
						}(this));
						return numWorkers;
					};
					GIF.prototype.frameFinished = function(frame) {
						var j, ref;
						this.log("frame " + frame.index + " finished - " + this.activeWorkers.length + " active");
						this.finishedFrames++;
						this.emit("progress", this.finishedFrames / this.frames.length);
						this.imageParts[frame.index] = frame;
						if (this.options.globalPalette === true) {
							this.options.globalPalette = frame.globalPalette;
							this.log("global palette analyzed");
							if (this.frames.length > 2) for (j = 1, ref = this.freeWorkers.length; 1 <= ref ? j < ref : j > ref; 1 <= ref ? ++j : --j) this.renderNextFrame();
						}
						if (indexOf.call(this.imageParts, null) >= 0) return this.renderNextFrame();
						else return this.finishRendering();
					};
					GIF.prototype.finishRendering = function() {
						var data, frame, i, image, j, k, l, len = 0, len1, len2, len3, offset, page, ref = this.imageParts, ref1, ref2;
						for (j = 0, len1 = ref.length; j < len1; j++) {
							frame = ref[j];
							len += (frame.data.length - 1) * frame.pageSize + frame.cursor;
						}
						len += frame.pageSize - frame.cursor;
						this.log("rendering finished - filesize " + Math.round(len / 1e3) + "kb");
						data = new Uint8Array(len);
						offset = 0;
						ref1 = this.imageParts;
						for (k = 0, len2 = ref1.length; k < len2; k++) {
							frame = ref1[k];
							ref2 = frame.data;
							for (i = l = 0, len3 = ref2.length; l < len3; i = ++l) {
								page = ref2[i];
								data.set(page, offset);
								if (i === frame.data.length - 1) offset += frame.cursor;
								else offset += frame.pageSize;
							}
						}
						image = new Blob([data], { type: "image/gif" });
						return this.emit("finished", image, data);
					};
					GIF.prototype.renderNextFrame = function() {
						var frame, task, worker;
						if (this.freeWorkers.length === 0) throw new Error("No free workers");
						if (this.nextFrame >= this.frames.length) return;
						frame = this.frames[this.nextFrame++];
						worker = this.freeWorkers.shift();
						task = this.getTask(frame);
						this.log("starting frame " + (task.index + 1) + " of " + this.frames.length);
						this.activeWorkers.push(worker);
						return worker.postMessage(task);
					};
					GIF.prototype.getContextData = function(ctx) {
						return ctx.getImageData(0, 0, this.options.width, this.options.height).data;
					};
					GIF.prototype.getImageData = function(image) {
						var ctx;
						if (this._canvas == null) {
							this._canvas = document.createElement("canvas");
							this._canvas.width = this.options.width;
							this._canvas.height = this.options.height;
						}
						ctx = this._canvas.getContext("2d");
						ctx.setFill = this.options.background;
						ctx.fillRect(0, 0, this.options.width, this.options.height);
						ctx.drawImage(image, 0, 0);
						return this.getContextData(ctx);
					};
					GIF.prototype.getTask = function(frame) {
						var index = this.frames.indexOf(frame), task = {
							index,
							last: index === this.frames.length - 1,
							delay: frame.delay,
							transparent: frame.transparent,
							width: this.options.width,
							height: this.options.height,
							quality: this.options.quality,
							dither: this.options.dither,
							globalPalette: this.options.globalPalette,
							repeat: this.options.repeat,
							canTransfer: browser.name === "chrome"
						};
						if (frame.data != null) task.data = frame.data;
						else if (frame.context != null) task.data = this.getContextData(frame.context);
						else if (frame.image != null) task.data = this.getImageData(frame.image);
						else throw new Error("Invalid frame");
						return task;
					};
					GIF.prototype.log = function() {
						var args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
						if (!this.options.debug) return;
						return console.log.apply(console, args);
					};
					return GIF;
				}(EventEmitter);
				module$3.exports = GIF;
			}, {
				"./browser.coffee": 2,
				events: 1
			}]
		}, {}, [3])(3);
	});
}));
//#endregion
//#region ../../node_modules/super-image-cropper/esm/lib/synthetic-gif.js
var import_gif, r$1;
var init_synthetic_gif = __esmMin((() => {
	init_esm$1();
	import_gif = /* @__PURE__ */ __toESM(require_gif(), 1);
	init_esm();
	r$1 = class {
		cropperJsOpts;
		frames;
		frameDelays;
		gifJsOptions;
		outputType;
		constructor({ frames: t, commonCropOptions: s, frameDelays: e, gifJsOptions: r = {}, outputType: o }) {
			this.cropperJsOpts = s.cropperJsOpts, this.frames = t, this.frameDelays = e, this.gifJsOptions = r, this.outputType = o;
		}
		bootstrap() {
			return new Promise(((r, o$1) => {
				const i = r$2(), a = new import_gif.default(Object.assign({
					workers: 2,
					quality: 10,
					workerScript: i,
					width: this.cropperJsOpts.width,
					height: this.cropperJsOpts.height,
					transparent: "transparent"
				}, this.gifJsOptions || {}));
				a.on("finished", ((t) => {
					if (this.outputType === o.BLOB) r(t);
					else if (this.outputType === o.BASE64) r(this.convertBlob2Base64(t));
					else r(window.URL.createObjectURL(t));
				})), this.frames.forEach(((t, s) => {
					a.addFrame(t, {
						delay: this.frameDelays[s],
						copy: !0
					});
				})), a.render();
			}));
		}
		convertBlob2Base64(t) {
			return new Promise(((s, e) => {
				const r = new FileReader();
				r.onload = function(t) {
					s(t?.target?.result);
				}, r.onerror = (t) => {
					e(t);
				}, r.readAsDataURL(t);
			}));
		}
	};
}));
//#endregion
//#region ../../node_modules/super-image-cropper/esm/lib/cropper.js
var t$1;
var init_cropper = __esmMin((() => {
	t$1 = class {
		frames;
		parsedFrames;
		commonCropOptions;
		convertorCanvas;
		containerCanvas;
		convertCtx;
		containerCtx;
		cropperJsOpts;
		offsetX = 0;
		offsetY = 0;
		containerCenterX = 0;
		containerCenterY = 0;
		resultFrames = [];
		constructor(t) {
			this.init(t);
		}
		init({ commonCropOptions: t }) {
			this.commonCropOptions = t, this.cropperJsOpts = t.cropperJsOpts, this.resultFrames = [], this.containerCanvas && this.convertorCanvas || this.setupCanvas(), this.setCanvasWH();
		}
		async cropGif(t) {
			const { frames: s, parsedFrames: e } = t;
			this.frames = s, this.parsedFrames = e;
			let a = 0;
			for (; a < this.frames.length;) {
				const t = this.frames[a];
				if (1 !== this.parsedFrames[a].disposalType && this.containerCtx.clearRect(0, 0, this.containerCanvas.width, this.containerCanvas.height), this.containerCtx.globalCompositeOperation && this.cropperJsOpts?.background && (this.containerCtx.fillStyle = this.cropperJsOpts?.background || "", this.containerCtx.globalCompositeOperation = "destination-over", this.containerCtx.fillRect(0, 0, this.containerCanvas.width, this.containerCanvas.height), this.containerCtx.globalCompositeOperation = "source-over"), !t) continue;
				const s = this.transformFrame(this.drawImgDataToCanvas(t, a));
				this.resultFrames.push(s), this.ifDebugRun(s, a), a++;
			}
			return this.resultFrames;
		}
		cropStaticImage(t) {
			return this.transformFrame(t);
		}
		transformFrame(t) {
			this.containerCtx.save(), this.containerCtx.translate(this.containerCenterX, this.containerCenterY), this.containerCtx.rotate(this.cropperJsOpts.rotate * Math.PI / 180), this.containerCtx.scale(this.cropperJsOpts.scaleX, this.cropperJsOpts.scaleY), this.containerCtx.drawImage(t, -this.convertorCanvas.width / 2, -this.convertorCanvas.height / 2), this.containerCtx.restore();
			return this.containerCtx.getImageData(1 * this.cropperJsOpts.x + this.offsetX, 1 * this.cropperJsOpts.y + this.offsetY, this.cropperJsOpts.width, this.cropperJsOpts.height);
		}
		drawImgDataToCanvas(t, s) {
			const e = this.parsedFrames[s]?.dims;
			return this.convertCtx.clearRect(0, 0, this.convertorCanvas.width, this.convertorCanvas.height), this.convertCtx.putImageData(t, e.left, e.top), this.convertorCanvas;
		}
		ifDebugRun(t, s) {
			location.search.includes("isCropDebug=true") && s && this.renderEachFrame(t, s);
		}
		renderEachFrame(t, s) {
			const e = this.parsedFrames[s]?.dims, a = document.createElement("canvas");
			a.width = this.convertorCanvas.width, a.height = this.convertorCanvas.height;
			const r = a.getContext("2d");
			r && (r?.putImageData(t, e.left, e.top), r.fillStyle = "red", r.strokeStyle = "blue", r.lineWidth = 5, r.save(), r.beginPath(), r.font = "70px orbitron", r.fillText(String(s), 10, 50), r.restore(), r.closePath(), document.body.appendChild(a));
		}
		setupCanvas() {
			const t = this.containerCanvas = document.createElement("canvas"), s = this.convertorCanvas = document.createElement("canvas");
			t.className = "containerCanvas", s.className = "convertorCanvas", t.style.display = "none", s.style.display = "none";
			const e = t.getContext("2d", { willReadFrequently: !0 }), a = s.getContext("2d");
			e && (this.containerCtx = e), a && (this.convertCtx = a), document.body.appendChild(s), document.body.appendChild(t);
		}
		setCanvasWH() {
			this.cropperJsOpts.rotate;
			const t = this.commonCropOptions.imageData, s = t.naturalWidth, e = t.naturalHeight;
			this.offsetX = -Math.min(this.cropperJsOpts.x, 0), this.offsetY = -Math.min(this.cropperJsOpts.y, 0), this.containerCenterX = this.offsetX + s / 2, this.containerCenterY = this.offsetY + e / 2, this.containerCanvas.width = Math.max(this.offsetX + s, this.offsetX + this.cropperJsOpts.width, this.cropperJsOpts.x + this.cropperJsOpts.width), this.containerCanvas.height = Math.max(this.offsetY + e, this.offsetY + this.cropperJsOpts.height, this.cropperJsOpts.y + this.cropperJsOpts.height), this.convertorCanvas.width = t.naturalWidth, this.convertorCanvas.height = t.naturalHeight, this.containerCtx.clearRect(0, 0, this.containerCanvas.width, this.containerCanvas.height), this.convertCtx.clearRect(0, 0, this.convertorCanvas.width, this.convertorCanvas.height);
		}
		frameToImgData(t, s) {
			if (!t) return;
			const e = s.pixels.length, a = t.createImageData(s.dims.width, s.dims.height), r = a.data;
			for (let t = 0; t < e; t++) {
				const e = 4 * t, a = s.pixels[t], n = s.colorTable[a];
				r[e] = n[0], r[e + 1] = n[1], r[e + 2] = n[2], r[e + 3] = a !== s.transparentIndex ? 255 : 0;
			}
			return a;
		}
	};
}));
//#endregion
//#region ../../node_modules/image-type/node_modules/file-type/index.js
var require_file_type = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	init_dist();
	var toBytes = (s) => [...s].map((c) => c.charCodeAt(0));
	var xpiZipFilename = toBytes("META-INF/mozilla.rsa");
	var oxmlContentTypes = toBytes("[Content_Types].xml");
	var oxmlRels = toBytes("_rels/.rels");
	function readUInt64LE(buf, offset = 0) {
		let n = buf[offset];
		let mul = 1;
		let i = 0;
		while (++i < 8) {
			mul *= 256;
			n += buf[offset + i] * mul;
		}
		return n;
	}
	var fileType = (input) => {
		if (!(input instanceof Uint8Array || input instanceof ArrayBuffer || Buffer.isBuffer(input))) throw new TypeError(`Expected the \`input\` argument to be of type \`Uint8Array\` or \`Buffer\` or \`ArrayBuffer\`, got \`${typeof input}\``);
		const buf = input instanceof Uint8Array ? input : new Uint8Array(input);
		if (!(buf && buf.length > 1)) return null;
		const check = (header, options) => {
			options = Object.assign({ offset: 0 }, options);
			for (let i = 0; i < header.length; i++) if (options.mask) {
				if (header[i] !== (options.mask[i] & buf[i + options.offset])) return false;
			} else if (header[i] !== buf[i + options.offset]) return false;
			return true;
		};
		const checkString = (header, options) => check(toBytes(header), options);
		if (check([
			255,
			216,
			255
		])) return {
			ext: "jpg",
			mime: "image/jpeg"
		};
		if (check([
			137,
			80,
			78,
			71,
			13,
			10,
			26,
			10
		])) return {
			ext: "png",
			mime: "image/png"
		};
		if (check([
			71,
			73,
			70
		])) return {
			ext: "gif",
			mime: "image/gif"
		};
		if (check([
			87,
			69,
			66,
			80
		], { offset: 8 })) return {
			ext: "webp",
			mime: "image/webp"
		};
		if (check([
			70,
			76,
			73,
			70
		])) return {
			ext: "flif",
			mime: "image/flif"
		};
		if ((check([
			73,
			73,
			42,
			0
		]) || check([
			77,
			77,
			0,
			42
		])) && check([67, 82], { offset: 8 })) return {
			ext: "cr2",
			mime: "image/x-canon-cr2"
		};
		if (check([
			73,
			73,
			42,
			0
		]) || check([
			77,
			77,
			0,
			42
		])) return {
			ext: "tif",
			mime: "image/tiff"
		};
		if (check([66, 77])) return {
			ext: "bmp",
			mime: "image/bmp"
		};
		if (check([
			73,
			73,
			188
		])) return {
			ext: "jxr",
			mime: "image/vnd.ms-photo"
		};
		if (check([
			56,
			66,
			80,
			83
		])) return {
			ext: "psd",
			mime: "image/vnd.adobe.photoshop"
		};
		if (check([
			80,
			75,
			3,
			4
		])) {
			if (check([
				109,
				105,
				109,
				101,
				116,
				121,
				112,
				101,
				97,
				112,
				112,
				108,
				105,
				99,
				97,
				116,
				105,
				111,
				110,
				47,
				101,
				112,
				117,
				98,
				43,
				122,
				105,
				112
			], { offset: 30 })) return {
				ext: "epub",
				mime: "application/epub+zip"
			};
			if (check(xpiZipFilename, { offset: 30 })) return {
				ext: "xpi",
				mime: "application/x-xpinstall"
			};
			if (checkString("mimetypeapplication/vnd.oasis.opendocument.text", { offset: 30 })) return {
				ext: "odt",
				mime: "application/vnd.oasis.opendocument.text"
			};
			if (checkString("mimetypeapplication/vnd.oasis.opendocument.spreadsheet", { offset: 30 })) return {
				ext: "ods",
				mime: "application/vnd.oasis.opendocument.spreadsheet"
			};
			if (checkString("mimetypeapplication/vnd.oasis.opendocument.presentation", { offset: 30 })) return {
				ext: "odp",
				mime: "application/vnd.oasis.opendocument.presentation"
			};
			const findNextZipHeaderIndex = (arr, startAt = 0) => arr.findIndex((el, i, arr) => i >= startAt && arr[i] === 80 && arr[i + 1] === 75 && arr[i + 2] === 3 && arr[i + 3] === 4);
			let zipHeaderIndex = 0;
			let oxmlFound = false;
			let type = null;
			do {
				const offset = zipHeaderIndex + 30;
				if (!oxmlFound) oxmlFound = check(oxmlContentTypes, { offset }) || check(oxmlRels, { offset });
				if (!type) {
					if (checkString("word/", { offset })) type = {
						ext: "docx",
						mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
					};
					else if (checkString("ppt/", { offset })) type = {
						ext: "pptx",
						mime: "application/vnd.openxmlformats-officedocument.presentationml.presentation"
					};
					else if (checkString("xl/", { offset })) type = {
						ext: "xlsx",
						mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
					};
				}
				if (oxmlFound && type) return type;
				zipHeaderIndex = findNextZipHeaderIndex(buf, offset);
			} while (zipHeaderIndex >= 0);
			if (type) return type;
		}
		if (check([80, 75]) && (buf[2] === 3 || buf[2] === 5 || buf[2] === 7) && (buf[3] === 4 || buf[3] === 6 || buf[3] === 8)) return {
			ext: "zip",
			mime: "application/zip"
		};
		if (check([
			117,
			115,
			116,
			97,
			114
		], { offset: 257 })) return {
			ext: "tar",
			mime: "application/x-tar"
		};
		if (check([
			82,
			97,
			114,
			33,
			26,
			7
		]) && (buf[6] === 0 || buf[6] === 1)) return {
			ext: "rar",
			mime: "application/x-rar-compressed"
		};
		if (check([
			31,
			139,
			8
		])) return {
			ext: "gz",
			mime: "application/gzip"
		};
		if (check([
			66,
			90,
			104
		])) return {
			ext: "bz2",
			mime: "application/x-bzip2"
		};
		if (check([
			55,
			122,
			188,
			175,
			39,
			28
		])) return {
			ext: "7z",
			mime: "application/x-7z-compressed"
		};
		if (check([120, 1])) return {
			ext: "dmg",
			mime: "application/x-apple-diskimage"
		};
		if (check([
			51,
			103,
			112,
			53
		]) || check([
			0,
			0,
			0
		]) && check([
			102,
			116,
			121,
			112
		], { offset: 4 }) && (check([
			109,
			112,
			52,
			49
		], { offset: 8 }) || check([
			109,
			112,
			52,
			50
		], { offset: 8 }) || check([
			105,
			115,
			111,
			109
		], { offset: 8 }) || check([
			105,
			115,
			111,
			50
		], { offset: 8 }) || check([
			109,
			109,
			112,
			52
		], { offset: 8 }) || check([
			77,
			52,
			86
		], { offset: 8 }) || check([
			100,
			97,
			115,
			104
		], { offset: 8 }))) return {
			ext: "mp4",
			mime: "video/mp4"
		};
		if (check([
			77,
			84,
			104,
			100
		])) return {
			ext: "mid",
			mime: "audio/midi"
		};
		if (check([
			26,
			69,
			223,
			163
		])) {
			const sliced = buf.subarray(4, 4100);
			const idPos = sliced.findIndex((el, i, arr) => arr[i] === 66 && arr[i + 1] === 130);
			if (idPos !== -1) {
				const docTypePos = idPos + 3;
				const findDocType = (type) => [...type].every((c, i) => sliced[docTypePos + i] === c.charCodeAt(0));
				if (findDocType("matroska")) return {
					ext: "mkv",
					mime: "video/x-matroska"
				};
				if (findDocType("webm")) return {
					ext: "webm",
					mime: "video/webm"
				};
			}
		}
		if (check([
			0,
			0,
			0,
			20,
			102,
			116,
			121,
			112,
			113,
			116,
			32,
			32
		]) || check([
			102,
			114,
			101,
			101
		], { offset: 4 }) || check([
			102,
			116,
			121,
			112,
			113,
			116,
			32,
			32
		], { offset: 4 }) || check([
			109,
			100,
			97,
			116
		], { offset: 4 }) || check([
			109,
			111,
			111,
			118
		], { offset: 4 }) || check([
			119,
			105,
			100,
			101
		], { offset: 4 })) return {
			ext: "mov",
			mime: "video/quicktime"
		};
		if (check([
			82,
			73,
			70,
			70
		])) {
			if (check([
				65,
				86,
				73
			], { offset: 8 })) return {
				ext: "avi",
				mime: "video/vnd.avi"
			};
			if (check([
				87,
				65,
				86,
				69
			], { offset: 8 })) return {
				ext: "wav",
				mime: "audio/vnd.wave"
			};
			if (check([
				81,
				76,
				67,
				77
			], { offset: 8 })) return {
				ext: "qcp",
				mime: "audio/qcelp"
			};
		}
		if (check([
			48,
			38,
			178,
			117,
			142,
			102,
			207,
			17,
			166,
			217
		])) {
			let offset = 30;
			do {
				const objectSize = readUInt64LE(buf, offset + 16);
				if (check([
					145,
					7,
					220,
					183,
					183,
					169,
					207,
					17,
					142,
					230,
					0,
					192,
					12,
					32,
					83,
					101
				], { offset })) {
					if (check([
						64,
						158,
						105,
						248,
						77,
						91,
						207,
						17,
						168,
						253,
						0,
						128,
						95,
						92,
						68,
						43
					], { offset: offset + 24 })) return {
						ext: "wma",
						mime: "audio/x-ms-wma"
					};
					if (check([
						192,
						239,
						25,
						188,
						77,
						91,
						207,
						17,
						168,
						253,
						0,
						128,
						95,
						92,
						68,
						43
					], { offset: offset + 24 })) return {
						ext: "wmv",
						mime: "video/x-ms-asf"
					};
					break;
				}
				offset += objectSize;
			} while (offset + 24 <= buf.length);
			return {
				ext: "asf",
				mime: "application/vnd.ms-asf"
			};
		}
		if (check([
			0,
			0,
			1,
			186
		]) || check([
			0,
			0,
			1,
			179
		])) return {
			ext: "mpg",
			mime: "video/mpeg"
		};
		if (check([
			102,
			116,
			121,
			112,
			51,
			103
		], { offset: 4 })) return {
			ext: "3gp",
			mime: "video/3gpp"
		};
		for (let start = 0; start < 2 && start < buf.length - 16; start++) {
			if (check([
				73,
				68,
				51
			], { offset: start }) || check([255, 226], {
				offset: start,
				mask: [255, 226]
			})) return {
				ext: "mp3",
				mime: "audio/mpeg"
			};
			if (check([255, 228], {
				offset: start,
				mask: [255, 228]
			})) return {
				ext: "mp2",
				mime: "audio/mpeg"
			};
			if (check([255, 248], {
				offset: start,
				mask: [255, 252]
			})) return {
				ext: "mp2",
				mime: "audio/mpeg"
			};
			if (check([255, 240], {
				offset: start,
				mask: [255, 252]
			})) return {
				ext: "mp4",
				mime: "audio/mpeg"
			};
		}
		if (check([
			102,
			116,
			121,
			112,
			77,
			52,
			65
		], { offset: 4 })) return {
			ext: "m4a",
			mime: "audio/mp4"
		};
		if (check([
			79,
			112,
			117,
			115,
			72,
			101,
			97,
			100
		], { offset: 28 })) return {
			ext: "opus",
			mime: "audio/opus"
		};
		if (check([
			79,
			103,
			103,
			83
		])) {
			if (check([
				128,
				116,
				104,
				101,
				111,
				114,
				97
			], { offset: 28 })) return {
				ext: "ogv",
				mime: "video/ogg"
			};
			if (check([
				1,
				118,
				105,
				100,
				101,
				111,
				0
			], { offset: 28 })) return {
				ext: "ogm",
				mime: "video/ogg"
			};
			if (check([
				127,
				70,
				76,
				65,
				67
			], { offset: 28 })) return {
				ext: "oga",
				mime: "audio/ogg"
			};
			if (check([
				83,
				112,
				101,
				101,
				120,
				32,
				32
			], { offset: 28 })) return {
				ext: "spx",
				mime: "audio/ogg"
			};
			if (check([
				1,
				118,
				111,
				114,
				98,
				105,
				115
			], { offset: 28 })) return {
				ext: "ogg",
				mime: "audio/ogg"
			};
			return {
				ext: "ogx",
				mime: "application/ogg"
			};
		}
		if (check([
			102,
			76,
			97,
			67
		])) return {
			ext: "flac",
			mime: "audio/x-flac"
		};
		if (check([
			77,
			65,
			67,
			32
		])) return {
			ext: "ape",
			mime: "audio/ape"
		};
		if (check([
			119,
			118,
			112,
			107
		])) return {
			ext: "wv",
			mime: "audio/wavpack"
		};
		if (check([
			35,
			33,
			65,
			77,
			82,
			10
		])) return {
			ext: "amr",
			mime: "audio/amr"
		};
		if (check([
			37,
			80,
			68,
			70
		])) return {
			ext: "pdf",
			mime: "application/pdf"
		};
		if (check([77, 90])) return {
			ext: "exe",
			mime: "application/x-msdownload"
		};
		if ((buf[0] === 67 || buf[0] === 70) && check([87, 83], { offset: 1 })) return {
			ext: "swf",
			mime: "application/x-shockwave-flash"
		};
		if (check([
			123,
			92,
			114,
			116,
			102
		])) return {
			ext: "rtf",
			mime: "application/rtf"
		};
		if (check([
			0,
			97,
			115,
			109
		])) return {
			ext: "wasm",
			mime: "application/wasm"
		};
		if (check([
			119,
			79,
			70,
			70
		]) && (check([
			0,
			1,
			0,
			0
		], { offset: 4 }) || check([
			79,
			84,
			84,
			79
		], { offset: 4 }))) return {
			ext: "woff",
			mime: "font/woff"
		};
		if (check([
			119,
			79,
			70,
			50
		]) && (check([
			0,
			1,
			0,
			0
		], { offset: 4 }) || check([
			79,
			84,
			84,
			79
		], { offset: 4 }))) return {
			ext: "woff2",
			mime: "font/woff2"
		};
		if (check([76, 80], { offset: 34 }) && (check([
			0,
			0,
			1
		], { offset: 8 }) || check([
			1,
			0,
			2
		], { offset: 8 }) || check([
			2,
			0,
			2
		], { offset: 8 }))) return {
			ext: "eot",
			mime: "application/vnd.ms-fontobject"
		};
		if (check([
			0,
			1,
			0,
			0,
			0
		])) return {
			ext: "ttf",
			mime: "font/ttf"
		};
		if (check([
			79,
			84,
			84,
			79,
			0
		])) return {
			ext: "otf",
			mime: "font/otf"
		};
		if (check([
			0,
			0,
			1,
			0
		])) return {
			ext: "ico",
			mime: "image/x-icon"
		};
		if (check([
			0,
			0,
			2,
			0
		])) return {
			ext: "cur",
			mime: "image/x-icon"
		};
		if (check([
			70,
			76,
			86,
			1
		])) return {
			ext: "flv",
			mime: "video/x-flv"
		};
		if (check([37, 33])) return {
			ext: "ps",
			mime: "application/postscript"
		};
		if (check([
			253,
			55,
			122,
			88,
			90,
			0
		])) return {
			ext: "xz",
			mime: "application/x-xz"
		};
		if (check([
			83,
			81,
			76,
			105
		])) return {
			ext: "sqlite",
			mime: "application/x-sqlite3"
		};
		if (check([
			78,
			69,
			83,
			26
		])) return {
			ext: "nes",
			mime: "application/x-nintendo-nes-rom"
		};
		if (check([
			67,
			114,
			50,
			52
		])) return {
			ext: "crx",
			mime: "application/x-google-chrome-extension"
		};
		if (check([
			77,
			83,
			67,
			70
		]) || check([
			73,
			83,
			99,
			40
		])) return {
			ext: "cab",
			mime: "application/vnd.ms-cab-compressed"
		};
		if (check([
			33,
			60,
			97,
			114,
			99,
			104,
			62,
			10,
			100,
			101,
			98,
			105,
			97,
			110,
			45,
			98,
			105,
			110,
			97,
			114,
			121
		])) return {
			ext: "deb",
			mime: "application/x-deb"
		};
		if (check([
			33,
			60,
			97,
			114,
			99,
			104,
			62
		])) return {
			ext: "ar",
			mime: "application/x-unix-archive"
		};
		if (check([
			237,
			171,
			238,
			219
		])) return {
			ext: "rpm",
			mime: "application/x-rpm"
		};
		if (check([31, 160]) || check([31, 157])) return {
			ext: "Z",
			mime: "application/x-compress"
		};
		if (check([
			76,
			90,
			73,
			80
		])) return {
			ext: "lz",
			mime: "application/x-lzip"
		};
		if (check([
			208,
			207,
			17,
			224,
			161,
			177,
			26,
			225
		])) return {
			ext: "msi",
			mime: "application/x-msi"
		};
		if (check([
			6,
			14,
			43,
			52,
			2,
			5,
			1,
			1,
			13,
			1,
			2,
			1,
			1,
			2
		])) return {
			ext: "mxf",
			mime: "application/mxf"
		};
		if (check([71], { offset: 4 }) && (check([71], { offset: 192 }) || check([71], { offset: 196 }))) return {
			ext: "mts",
			mime: "video/mp2t"
		};
		if (check([
			66,
			76,
			69,
			78,
			68,
			69,
			82
		])) return {
			ext: "blend",
			mime: "application/x-blender"
		};
		if (check([
			66,
			80,
			71,
			251
		])) return {
			ext: "bpg",
			mime: "image/bpg"
		};
		if (check([
			0,
			0,
			0,
			12,
			106,
			80,
			32,
			32,
			13,
			10,
			135,
			10
		])) {
			if (check([
				106,
				112,
				50,
				32
			], { offset: 20 })) return {
				ext: "jp2",
				mime: "image/jp2"
			};
			if (check([
				106,
				112,
				120,
				32
			], { offset: 20 })) return {
				ext: "jpx",
				mime: "image/jpx"
			};
			if (check([
				106,
				112,
				109,
				32
			], { offset: 20 })) return {
				ext: "jpm",
				mime: "image/jpm"
			};
			if (check([
				109,
				106,
				112,
				50
			], { offset: 20 })) return {
				ext: "mj2",
				mime: "image/mj2"
			};
		}
		if (check([
			70,
			79,
			82,
			77
		])) return {
			ext: "aif",
			mime: "audio/aiff"
		};
		if (checkString("<?xml ")) return {
			ext: "xml",
			mime: "application/xml"
		};
		if (check([
			66,
			79,
			79,
			75,
			77,
			79,
			66,
			73
		], { offset: 60 })) return {
			ext: "mobi",
			mime: "application/x-mobipocket-ebook"
		};
		if (check([
			102,
			116,
			121,
			112
		], { offset: 4 })) {
			if (check([
				109,
				105,
				102,
				49
			], { offset: 8 })) return {
				ext: "heic",
				mime: "image/heif"
			};
			if (check([
				109,
				115,
				102,
				49
			], { offset: 8 })) return {
				ext: "heic",
				mime: "image/heif-sequence"
			};
			if (check([
				104,
				101,
				105,
				99
			], { offset: 8 }) || check([
				104,
				101,
				105,
				120
			], { offset: 8 })) return {
				ext: "heic",
				mime: "image/heic"
			};
			if (check([
				104,
				101,
				118,
				99
			], { offset: 8 }) || check([
				104,
				101,
				118,
				120
			], { offset: 8 })) return {
				ext: "heic",
				mime: "image/heic-sequence"
			};
		}
		if (check([
			171,
			75,
			84,
			88,
			32,
			49,
			49,
			187,
			13,
			10,
			26,
			10
		])) return {
			ext: "ktx",
			mime: "image/ktx"
		};
		if (check([
			68,
			73,
			67,
			77
		], { offset: 128 })) return {
			ext: "dcm",
			mime: "application/dicom"
		};
		if (check([
			77,
			80,
			43
		])) return {
			ext: "mpc",
			mime: "audio/x-musepack"
		};
		if (check([
			77,
			80,
			67,
			75
		])) return {
			ext: "mpc",
			mime: "audio/x-musepack"
		};
		if (check([
			66,
			69,
			71,
			73,
			78,
			58
		])) return {
			ext: "ics",
			mime: "text/calendar"
		};
		if (check([
			103,
			108,
			84,
			70,
			2,
			0,
			0,
			0
		])) return {
			ext: "glb",
			mime: "model/gltf-binary"
		};
		if (check([
			212,
			195,
			178,
			161
		]) || check([
			161,
			178,
			195,
			212
		])) return {
			ext: "pcap",
			mime: "application/vnd.tcpdump.pcap"
		};
		return null;
	};
	module.exports = fileType;
	module.exports.default = fileType;
	Object.defineProperty(fileType, "minimumBytes", { value: 4100 });
	module.exports.stream = (readableStream) => new Promise((resolve, reject) => {
		const stream = eval("require")("stream");
		readableStream.once("readable", () => {
			const pass = new stream.PassThrough();
			const chunk = readableStream.read(module.exports.minimumBytes) || readableStream.read();
			try {
				pass.fileType = fileType(chunk);
			} catch (error) {
				reject(error);
			}
			readableStream.unshift(chunk);
			if (stream.pipeline) resolve(stream.pipeline(readableStream, pass, () => {}));
			else resolve(readableStream.pipe(pass));
		});
	});
}));
//#endregion
//#region ../../node_modules/image-type/index.js
var require_image_type = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var fileType = require_file_type();
	var imageExts = new Set([
		"jpg",
		"png",
		"gif",
		"webp",
		"flif",
		"cr2",
		"tif",
		"bmp",
		"jxr",
		"psd",
		"ico",
		"bpg",
		"jp2",
		"jpm",
		"jpx",
		"heic",
		"cur",
		"dcm"
	]);
	var imageType = (input) => {
		const ret = fileType(input);
		return imageExts.has(ret && ret.ext) ? ret : null;
	};
	module.exports = imageType;
	module.exports.default = imageType;
	Object.defineProperty(imageType, "minimumBytes", { value: fileType.minimumBytes });
}));
//#endregion
//#region ../../node_modules/super-image-cropper/esm/lib/helper.js
var import_image_type, n, a, e, r;
var init_helper = __esmMin((() => {
	import_image_type = /* @__PURE__ */ __toESM(require_image_type(), 1);
	n = async (t) => {
		const { src: n = "" } = t;
		if (!n) return {
			width: 0,
			height: 0,
			naturalWidth: 0,
			naturalHeight: 0
		};
		const { imageInstance: a } = await e(t);
		return {
			width: a.width,
			height: a.height,
			naturalWidth: a.naturalWidth,
			naturalHeight: a.naturalHeight
		};
	}, a = async (n) => (0, import_image_type.default)(new Uint8Array(n)), e = async (t) => {
		const { src: n = "", crossOrigin: e } = t;
		return {
			...await new Promise(((t, a) => {
				const r = new Image();
				void 0 !== e && (r.crossOrigin = e), r.onload = async (n) => {
					t({
						imageInstance: r,
						data: n
					});
				}, r.src = n, r.onerror = a;
			})),
			imageType: await a(await r(n))
		};
	}, r = (t = "") => new Promise(((n, a) => {
		const e = new XMLHttpRequest();
		e.open("GET", t), e.responseType = "arraybuffer", e.onload = () => {
			n(e.response);
		}, e.onerror = a, e.send();
	}));
}));
//#endregion
//#region ../../node_modules/super-image-cropper/esm/index.js
var o, p;
var init_esm = __esmMin((() => {
	init_decoder();
	init_synthetic_gif();
	init_cropper();
	init_helper();
	(function(t) {
		t.BASE64 = "base64", t.BLOB = "blob", t.BLOB_URL = "blobURL";
	})(o || (o = {}));
	p = class {
		cropperJsInstance;
		parsedFrameInfo;
		commonCropOptions;
		frameCropperInstance;
		inputCropperOptions;
		imageTypeInfo = null;
		async crop(t) {
			this.userInputValidator(t), this.inputCropperOptions = this.cleanUserInput(t), await this.init(), await this.decodeGIF();
			const e = await this.checkIsStaticImage();
			if (e.isStatic) return this.handleStaticImage(e.imageInfo.imageInstance);
			{
				const t = await this.cropFrames();
				return this.saveGif(t, this.parsedFrameInfo?.delays || []);
			}
		}
		async init() {
			this.cropperJsInstance = this.inputCropperOptions.cropperInstance;
			const t = Object.assign({
				width: 100,
				height: 100,
				scaleX: 1,
				scaleY: 1,
				x: 0,
				y: 0,
				rotate: 0,
				left: 0,
				top: 0
			}, this.inputCropperOptions.cropperJsOpts || {}, this.cropperJsInstance?.getData() || {}), e = this.cropperJsInstance?.getImageData() || await n({
				src: this.inputCropperOptions.src,
				crossOrigin: this.inputCropperOptions.crossOrigin
			}) || {};
			this.commonCropOptions = {
				cropperJsOpts: this.imageDataFormat(t, e),
				imageData: e,
				cropBoxData: this.cropperJsInstance?.getCropBoxData() || t
			}, this.commonCropOptions.cropperJsOpts.rotate = this.normalizeRotate(this.commonCropOptions.cropperJsOpts.rotate);
		}
		cleanUserInput(t) {
			const { cropperInstance: e } = t;
			return e && (delete t.cropperJsOpts, delete t.src), t;
		}
		userInputValidator(t) {
			const { cropperInstance: e, cropperJsOpts: r, src: s } = t;
			if (!e) {
				if (!r) throw new Error("If cropperInstance is not specified, cropperJsOpts must be specified.");
				if (!s) throw new Error("If cropperInstance is not specified, src must be specified.");
			}
		}
		normalizeRotate(t) {
			return t < 0 ? 360 + t % 360 : t;
		}
		imageDataFormat(t, e) {
			return t.left = t.x, t.top = t.y, t.width = t.width || e.naturalWidth, t.height = t.height || e.naturalHeight, t;
		}
		async decodeGIF() {
			this.parsedFrameInfo = await new a$1(this.inputCropperOptions.src || this.cropperJsInstance?.url || "").decompressFrames();
		}
		ensureFrameCropperExist() {
			this.frameCropperInstance || (this.frameCropperInstance = new t$1({ commonCropOptions: this.commonCropOptions }));
		}
		async cropFrames() {
			return this.ensureFrameCropperExist(), this.frameCropperInstance.init({ commonCropOptions: this.commonCropOptions }), this.frameCropperInstance.cropGif(this.parsedFrameInfo);
		}
		async saveGif(t, r) {
			return new r$1({
				frames: t,
				commonCropOptions: this.commonCropOptions,
				frameDelays: r,
				gifJsOptions: this.inputCropperOptions.gifJsOptions,
				outputType: this.inputCropperOptions.outputType
			}).bootstrap();
		}
		async checkIsStaticImage() {
			const e$3 = await e({
				src: this.cropperJsInstance?.url ?? this.inputCropperOptions?.src,
				crossOrigin: this.inputCropperOptions.crossOrigin
			});
			return {
				isStatic: "image/gif" !== e$3?.imageType?.mime,
				imageInfo: e$3
			};
		}
		async handleStaticImage(t) {
			const e = document.createElement("canvas"), r = e.getContext("2d");
			e.width = t.width, e.height = t.height, r?.drawImage(t, 0, 0), this.ensureFrameCropperExist(), this.frameCropperInstance.init({ commonCropOptions: this.commonCropOptions });
			const s = await this.frameCropperInstance.cropStaticImage(e);
			return r?.clearRect(0, 0, e.width, e.height), e.width = s.width, e.height = s.height, r?.putImageData(s, 0, 0), new Promise(((t, r) => {
				const { outputType: s = o.BLOB_URL } = this.inputCropperOptions;
				s === o.BASE64 ? t(e.toDataURL(this.imageTypeInfo?.mime)) : e.toBlob(((e) => {
					if (!e) return r(null);
					if (s === o.BLOB) t(e);
					else t(window.URL.createObjectURL(e));
				}), this.imageTypeInfo?.mime);
			}));
		}
	};
}));
//#endregion
init_esm();
export { o as OutputType, p as SuperImageCropper };
