const require_chunk = require("./chunk.js");
//#region ../../node_modules/adm-zip/util/constants.js
var require_constants = /* @__PURE__ */ require_chunk.__commonJSMin(((exports, module) => {
	module.exports = {
		LOCHDR: 30,
		LOCSIG: 67324752,
		LOCVER: 4,
		LOCFLG: 6,
		LOCHOW: 8,
		LOCTIM: 10,
		LOCCRC: 14,
		LOCSIZ: 18,
		LOCLEN: 22,
		LOCNAM: 26,
		LOCEXT: 28,
		EXTSIG: 134695760,
		EXTHDR: 16,
		EXTCRC: 4,
		EXTSIZ: 8,
		EXTLEN: 12,
		CENHDR: 46,
		CENSIG: 33639248,
		CENVEM: 4,
		CENVER: 6,
		CENFLG: 8,
		CENHOW: 10,
		CENTIM: 12,
		CENCRC: 16,
		CENSIZ: 20,
		CENLEN: 24,
		CENNAM: 28,
		CENEXT: 30,
		CENCOM: 32,
		CENDSK: 34,
		CENATT: 36,
		CENATX: 38,
		CENOFF: 42,
		ENDHDR: 22,
		ENDSIG: 101010256,
		ENDSUB: 8,
		ENDTOT: 10,
		ENDSIZ: 12,
		ENDOFF: 16,
		ENDCOM: 20,
		END64HDR: 20,
		END64SIG: 117853008,
		END64START: 4,
		END64OFF: 8,
		END64NUMDISKS: 16,
		ZIP64SIG: 101075792,
		ZIP64HDR: 56,
		ZIP64LEAD: 12,
		ZIP64SIZE: 4,
		ZIP64VEM: 12,
		ZIP64VER: 14,
		ZIP64DSK: 16,
		ZIP64DSKDIR: 20,
		ZIP64SUB: 24,
		ZIP64TOT: 32,
		ZIP64SIZB: 40,
		ZIP64OFF: 48,
		ZIP64EXTRA: 56,
		STORED: 0,
		SHRUNK: 1,
		REDUCED1: 2,
		REDUCED2: 3,
		REDUCED3: 4,
		REDUCED4: 5,
		IMPLODED: 6,
		DEFLATED: 8,
		ENHANCED_DEFLATED: 9,
		PKWARE: 10,
		BZIP2: 12,
		LZMA: 14,
		IBM_TERSE: 18,
		IBM_LZ77: 19,
		AES_ENCRYPT: 99,
		FLG_ENC: 1,
		FLG_COMP1: 2,
		FLG_COMP2: 4,
		FLG_DESC: 8,
		FLG_ENH: 16,
		FLG_PATCH: 32,
		FLG_STR: 64,
		FLG_EFS: 2048,
		FLG_MSK: 4096,
		FILE: 2,
		BUFFER: 1,
		NONE: 0,
		EF_ID: 0,
		EF_SIZE: 2,
		ID_ZIP64: 1,
		ID_AVINFO: 7,
		ID_PFS: 8,
		ID_OS2: 9,
		ID_NTFS: 10,
		ID_OPENVMS: 12,
		ID_UNIX: 13,
		ID_FORK: 14,
		ID_PATCH: 15,
		ID_X509_PKCS7: 20,
		ID_X509_CERTID_F: 21,
		ID_X509_CERTID_C: 22,
		ID_STRONGENC: 23,
		ID_RECORD_MGT: 24,
		ID_X509_PKCS7_RL: 25,
		ID_IBM1: 101,
		ID_IBM2: 102,
		ID_POSZIP: 18064,
		EF_ZIP64_OR_32: 4294967295,
		EF_ZIP64_OR_16: 65535,
		EF_ZIP64_SUNCOMP: 0,
		EF_ZIP64_SCOMP: 8,
		EF_ZIP64_RHO: 16,
		EF_ZIP64_DSN: 24
	};
}));
//#endregion
//#region ../../node_modules/adm-zip/util/errors.js
var require_errors = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	var errors = {
		INVALID_LOC: "Invalid LOC header (bad signature)",
		INVALID_CEN: "Invalid CEN header (bad signature)",
		INVALID_END: "Invalid END header (bad signature)",
		DESCRIPTOR_NOT_EXIST: "No descriptor present",
		DESCRIPTOR_UNKNOWN: "Unknown descriptor format",
		DESCRIPTOR_FAULTY: "Descriptor data is malformed",
		NO_DATA: "Nothing to decompress",
		BAD_CRC: "CRC32 checksum failed {0}",
		FILE_IN_THE_WAY: "There is a file in the way: {0}",
		UNKNOWN_METHOD: "Invalid/unsupported compression method",
		AVAIL_DATA: "inflate::Available inflate data did not terminate",
		INVALID_DISTANCE: "inflate::Invalid literal/length or distance code in fixed or dynamic block",
		TO_MANY_CODES: "inflate::Dynamic block code description: too many length or distance codes",
		INVALID_REPEAT_LEN: "inflate::Dynamic block code description: repeat more than specified lengths",
		INVALID_REPEAT_FIRST: "inflate::Dynamic block code description: repeat lengths with no first length",
		INCOMPLETE_CODES: "inflate::Dynamic block code description: code lengths codes incomplete",
		INVALID_DYN_DISTANCE: "inflate::Dynamic block code description: invalid distance code lengths",
		INVALID_CODES_LEN: "inflate::Dynamic block code description: invalid literal/length code lengths",
		INVALID_STORE_BLOCK: "inflate::Stored block length did not match one's complement",
		INVALID_BLOCK_TYPE: "inflate::Invalid block type (type == 3)",
		CANT_EXTRACT_FILE: "Could not extract the file",
		CANT_OVERRIDE: "Target file already exists",
		DISK_ENTRY_TOO_LARGE: "Number of disk entries is too large",
		NO_ZIP: "No zip file was loaded",
		NO_ENTRY: "Entry doesn't exist",
		DIRECTORY_CONTENT_ERROR: "A directory cannot have content",
		FILE_NOT_FOUND: "File not found: \"{0}\"",
		NOT_IMPLEMENTED: "Not implemented",
		INVALID_FILENAME: "Invalid filename",
		INVALID_FORMAT: "Invalid or unsupported zip format. No END header found",
		INVALID_PASS_PARAM: "Incompatible password parameter",
		WRONG_PASSWORD: "Wrong Password",
		COMMENT_TOO_LONG: "Comment is too long",
		EXTRA_FIELD_PARSE_ERROR: "Extra field parsing error"
	};
	function E(message) {
		return function(...args) {
			if (args.length) message = message.replace(/\{(\d)\}/g, (_, n) => args[n] || "");
			return /* @__PURE__ */ new Error("ADM-ZIP: " + message);
		};
	}
	for (const msg of Object.keys(errors)) exports[msg] = E(errors[msg]);
}));
//#endregion
//#region ../../node_modules/adm-zip/util/utils.js
var require_utils = /* @__PURE__ */ require_chunk.__commonJSMin(((exports, module) => {
	var fsystem = require("fs");
	var pth$2 = require("path");
	var Constants = require_constants();
	var Errors = require_errors();
	var isWin = typeof process === "object" && "win32" === process.platform;
	var is_Obj = (obj) => typeof obj === "object" && obj !== null;
	var crcTable = new Uint32Array(256).map((t, c) => {
		for (let k = 0; k < 8; k++) if ((c & 1) !== 0) c = 3988292384 ^ c >>> 1;
		else c >>>= 1;
		return c >>> 0;
	});
	function Utils(opts) {
		this.sep = pth$2.sep;
		this.fs = fsystem;
		if (is_Obj(opts)) {
			if (is_Obj(opts.fs) && typeof opts.fs.statSync === "function") this.fs = opts.fs;
		}
	}
	module.exports = Utils;
	Utils.prototype.makeDir = function(folder) {
		const self = this;
		function mkdirSync(fpath) {
			let resolvedPath = fpath.split(self.sep)[0];
			fpath.split(self.sep).forEach(function(name) {
				if (!name || name.substr(-1, 1) === ":") return;
				resolvedPath += self.sep + name;
				var stat;
				try {
					stat = self.fs.statSync(resolvedPath);
				} catch (e) {
					self.fs.mkdirSync(resolvedPath);
				}
				if (stat && stat.isFile()) throw Errors.FILE_IN_THE_WAY(`"${resolvedPath}"`);
			});
		}
		mkdirSync(folder);
	};
	Utils.prototype.writeFileTo = function(path, content, overwrite, attr) {
		const self = this;
		if (self.fs.existsSync(path)) {
			if (!overwrite) return false;
			if (self.fs.statSync(path).isDirectory()) return false;
		}
		var folder = pth$2.dirname(path);
		if (!self.fs.existsSync(folder)) self.makeDir(folder);
		var fd;
		try {
			fd = self.fs.openSync(path, "w", 438);
		} catch (e) {
			self.fs.chmodSync(path, 438);
			fd = self.fs.openSync(path, "w", 438);
		}
		if (fd) try {
			self.fs.writeSync(fd, content, 0, content.length, 0);
		} finally {
			self.fs.closeSync(fd);
		}
		self.fs.chmodSync(path, attr || 438);
		return true;
	};
	Utils.prototype.writeFileToAsync = function(path, content, overwrite, attr, callback) {
		if (typeof attr === "function") {
			callback = attr;
			attr = void 0;
		}
		const self = this;
		self.fs.exists(path, function(exist) {
			if (exist && !overwrite) return callback(false);
			self.fs.stat(path, function(err, stat) {
				if (exist && stat.isDirectory()) return callback(false);
				var folder = pth$2.dirname(path);
				self.fs.exists(folder, function(exists) {
					if (!exists) self.makeDir(folder);
					self.fs.open(path, "w", 438, function(err, fd) {
						if (err) self.fs.chmod(path, 438, function() {
							self.fs.open(path, "w", 438, function(err, fd) {
								self.fs.write(fd, content, 0, content.length, 0, function() {
									self.fs.close(fd, function() {
										self.fs.chmod(path, attr || 438, function() {
											callback(true);
										});
									});
								});
							});
						});
						else if (fd) self.fs.write(fd, content, 0, content.length, 0, function() {
							self.fs.close(fd, function() {
								self.fs.chmod(path, attr || 438, function() {
									callback(true);
								});
							});
						});
						else self.fs.chmod(path, attr || 438, function() {
							callback(true);
						});
					});
				});
			});
		});
	};
	Utils.prototype.findFiles = function(path) {
		const self = this;
		function findSync(dir, pattern, recursive) {
			if (typeof pattern === "boolean") {
				recursive = pattern;
				pattern = void 0;
			}
			let files = [];
			self.fs.readdirSync(dir).forEach(function(file) {
				const path = pth$2.join(dir, file);
				const stat = self.fs.statSync(path);
				if (!pattern || pattern.test(path)) files.push(pth$2.normalize(path) + (stat.isDirectory() ? self.sep : ""));
				if (stat.isDirectory() && recursive) files = files.concat(findSync(path, pattern, recursive));
			});
			return files;
		}
		return findSync(path, void 0, true);
	};
	/**
	* Callback for showing if everything was done.
	*
	* @callback filelistCallback
	* @param {Error} err - Error object
	* @param {string[]} list - was request fully completed
	*/
	/**
	*
	* @param {string} dir
	* @param {filelistCallback} cb
	*/
	Utils.prototype.findFilesAsync = function(dir, cb) {
		const self = this;
		let results = [];
		self.fs.readdir(dir, function(err, list) {
			if (err) return cb(err);
			let list_length = list.length;
			if (!list_length) return cb(null, results);
			list.forEach(function(file) {
				file = pth$2.join(dir, file);
				self.fs.stat(file, function(err, stat) {
					if (err) return cb(err);
					if (stat) {
						results.push(pth$2.normalize(file) + (stat.isDirectory() ? self.sep : ""));
						if (stat.isDirectory()) self.findFilesAsync(file, function(err, res) {
							if (err) return cb(err);
							results = results.concat(res);
							if (!--list_length) cb(null, results);
						});
						else if (!--list_length) cb(null, results);
					}
				});
			});
		});
	};
	Utils.prototype.getAttributes = function() {};
	Utils.prototype.setAttributes = function() {};
	Utils.crc32update = function(crc, byte) {
		return crcTable[(crc ^ byte) & 255] ^ crc >>> 8;
	};
	Utils.crc32 = function(buf) {
		if (typeof buf === "string") buf = Buffer.from(buf, "utf8");
		let len = buf.length;
		let crc = -1;
		for (let off = 0; off < len;) crc = Utils.crc32update(crc, buf[off++]);
		return ~crc >>> 0;
	};
	Utils.methodToString = function(method) {
		switch (method) {
			case Constants.STORED: return "STORED (" + method + ")";
			case Constants.DEFLATED: return "DEFLATED (" + method + ")";
			default: return "UNSUPPORTED (" + method + ")";
		}
	};
	/**
	* removes ".." style path elements
	* @param {string} path - fixable path
	* @returns string - fixed filepath
	*/
	Utils.canonical = function(path) {
		if (!path) return "";
		const safeSuffix = pth$2.posix.normalize("/" + path.split("\\").join("/"));
		return pth$2.join(".", safeSuffix);
	};
	/**
	* fix file names in achive
	* @param {string} path - fixable path
	* @returns string - fixed filepath
	*/
	Utils.zipnamefix = function(path) {
		if (!path) return "";
		const safeSuffix = pth$2.posix.normalize("/" + path.split("\\").join("/"));
		return pth$2.posix.join(".", safeSuffix);
	};
	/**
	*
	* @param {Array} arr
	* @param {function} callback
	* @returns
	*/
	Utils.findLast = function(arr, callback) {
		if (!Array.isArray(arr)) throw new TypeError("arr is not array");
		const len = arr.length >>> 0;
		for (let i = len - 1; i >= 0; i--) if (callback(arr[i], i, arr)) return arr[i];
	};
	Utils.sanitize = function(prefix, name) {
		prefix = pth$2.resolve(pth$2.normalize(prefix));
		var parts = name.split("/");
		for (var i = 0, l = parts.length; i < l; i++) {
			var path = pth$2.normalize(pth$2.join(prefix, parts.slice(i, l).join(pth$2.sep)));
			if (path.indexOf(prefix) === 0) return path;
		}
		return pth$2.normalize(pth$2.join(prefix, pth$2.basename(name)));
	};
	Utils.toBuffer = function toBuffer(input, encoder) {
		if (Buffer.isBuffer(input)) return input;
		else if (input instanceof Uint8Array) return Buffer.from(input);
		else return typeof input === "string" ? encoder(input) : Buffer.alloc(0);
	};
	Utils.readBigUInt64LE = function(buffer, index) {
		var slice = Buffer.from(buffer.slice(index, index + 8));
		slice.swap64();
		return parseInt(`0x${slice.toString("hex")}`);
	};
	Utils.fromDOS2Date = function(val) {
		return new Date((val >> 25 & 127) + 1980, Math.max((val >> 21 & 15) - 1, 0), Math.max(val >> 16 & 31, 1), val >> 11 & 31, val >> 5 & 63, (val & 31) << 1);
	};
	Utils.fromDate2DOS = function(val) {
		let date = 0;
		let time = 0;
		if (val.getFullYear() > 1979) {
			date = (val.getFullYear() - 1980 & 127) << 9 | val.getMonth() + 1 << 5 | val.getDate();
			time = val.getHours() << 11 | val.getMinutes() << 5 | val.getSeconds() >> 1;
		}
		return date << 16 | time;
	};
	Utils.isWin = isWin;
	Utils.crcTable = crcTable;
}));
//#endregion
//#region ../../node_modules/adm-zip/util/fattr.js
var require_fattr = /* @__PURE__ */ require_chunk.__commonJSMin(((exports, module) => {
	var pth$1 = require("path");
	module.exports = function(path, { fs }) {
		var _path = path || "", _obj = newAttr(), _stat = null;
		function newAttr() {
			return {
				directory: false,
				readonly: false,
				hidden: false,
				executable: false,
				mtime: 0,
				atime: 0
			};
		}
		if (_path && fs.existsSync(_path)) {
			_stat = fs.statSync(_path);
			_obj.directory = _stat.isDirectory();
			_obj.mtime = _stat.mtime;
			_obj.atime = _stat.atime;
			_obj.executable = (73 & _stat.mode) !== 0;
			_obj.readonly = (128 & _stat.mode) === 0;
			_obj.hidden = pth$1.basename(_path)[0] === ".";
		} else console.warn("Invalid path: " + _path);
		return {
			get directory() {
				return _obj.directory;
			},
			get readOnly() {
				return _obj.readonly;
			},
			get hidden() {
				return _obj.hidden;
			},
			get mtime() {
				return _obj.mtime;
			},
			get atime() {
				return _obj.atime;
			},
			get executable() {
				return _obj.executable;
			},
			decodeAttributes: function() {},
			encodeAttributes: function() {},
			toJSON: function() {
				return {
					path: _path,
					isDirectory: _obj.directory,
					isReadOnly: _obj.readonly,
					isHidden: _obj.hidden,
					isExecutable: _obj.executable,
					mTime: _obj.mtime,
					aTime: _obj.atime
				};
			},
			toString: function() {
				return JSON.stringify(this.toJSON(), null, "	");
			}
		};
	};
}));
//#endregion
//#region ../../node_modules/adm-zip/util/decoder.js
var require_decoder = /* @__PURE__ */ require_chunk.__commonJSMin(((exports, module) => {
	module.exports = {
		efs: true,
		encode: (data) => Buffer.from(data, "utf8"),
		decode: (data) => data.toString("utf8")
	};
}));
//#endregion
//#region ../../node_modules/adm-zip/util/index.js
var require_util = /* @__PURE__ */ require_chunk.__commonJSMin(((exports, module) => {
	module.exports = require_utils();
	module.exports.Constants = require_constants();
	module.exports.Errors = require_errors();
	module.exports.FileAttr = require_fattr();
	module.exports.decoder = require_decoder();
}));
//#endregion
//#region ../../node_modules/adm-zip/headers/entryHeader.js
var require_entryHeader = /* @__PURE__ */ require_chunk.__commonJSMin(((exports, module) => {
	var Utils = require_util(), Constants = Utils.Constants;
	module.exports = function() {
		var _verMade = 20, _version = 10, _flags = 0, _method = 0, _time = 0, _crc = 0, _compressedSize = 0, _size = 0, _fnameLen = 0, _extraLen = 0, _comLen = 0, _diskStart = 0, _inattr = 0, _attr = 0, _offset = 0;
		_verMade |= Utils.isWin ? 2560 : 768;
		_flags |= Constants.FLG_EFS;
		const _localHeader = { extraLen: 0 };
		const uint32 = (val) => Math.max(0, val) >>> 0;
		const uint8 = (val) => Math.max(0, val) & 255;
		_time = Utils.fromDate2DOS(/* @__PURE__ */ new Date());
		return {
			get made() {
				return _verMade;
			},
			set made(val) {
				_verMade = val;
			},
			get version() {
				return _version;
			},
			set version(val) {
				_version = val;
			},
			get flags() {
				return _flags;
			},
			set flags(val) {
				_flags = val;
			},
			get flags_efs() {
				return (_flags & Constants.FLG_EFS) > 0;
			},
			set flags_efs(val) {
				if (val) _flags |= Constants.FLG_EFS;
				else _flags &= ~Constants.FLG_EFS;
			},
			get flags_desc() {
				return (_flags & Constants.FLG_DESC) > 0;
			},
			set flags_desc(val) {
				if (val) _flags |= Constants.FLG_DESC;
				else _flags &= ~Constants.FLG_DESC;
			},
			get method() {
				return _method;
			},
			set method(val) {
				switch (val) {
					case Constants.STORED: this.version = 10;
					case Constants.DEFLATED:
					default: this.version = 20;
				}
				_method = val;
			},
			get time() {
				return Utils.fromDOS2Date(this.timeval);
			},
			set time(val) {
				this.timeval = Utils.fromDate2DOS(val);
			},
			get timeval() {
				return _time;
			},
			set timeval(val) {
				_time = uint32(val);
			},
			get timeHighByte() {
				return uint8(_time >>> 8);
			},
			get crc() {
				return _crc;
			},
			set crc(val) {
				_crc = uint32(val);
			},
			get compressedSize() {
				return _compressedSize;
			},
			set compressedSize(val) {
				_compressedSize = uint32(val);
			},
			get size() {
				return _size;
			},
			set size(val) {
				_size = uint32(val);
			},
			get fileNameLength() {
				return _fnameLen;
			},
			set fileNameLength(val) {
				_fnameLen = val;
			},
			get extraLength() {
				return _extraLen;
			},
			set extraLength(val) {
				_extraLen = val;
			},
			get extraLocalLength() {
				return _localHeader.extraLen;
			},
			set extraLocalLength(val) {
				_localHeader.extraLen = val;
			},
			get commentLength() {
				return _comLen;
			},
			set commentLength(val) {
				_comLen = val;
			},
			get diskNumStart() {
				return _diskStart;
			},
			set diskNumStart(val) {
				_diskStart = uint32(val);
			},
			get inAttr() {
				return _inattr;
			},
			set inAttr(val) {
				_inattr = uint32(val);
			},
			get attr() {
				return _attr;
			},
			set attr(val) {
				_attr = uint32(val);
			},
			get fileAttr() {
				return (_attr || 0) >> 16 & 4095;
			},
			get offset() {
				return _offset;
			},
			set offset(val) {
				_offset = uint32(val);
			},
			get encrypted() {
				return (_flags & Constants.FLG_ENC) === Constants.FLG_ENC;
			},
			get centralHeaderSize() {
				return Constants.CENHDR + _fnameLen + _extraLen + _comLen;
			},
			get realDataOffset() {
				return _offset + Constants.LOCHDR + _localHeader.fnameLen + _localHeader.extraLen;
			},
			get localHeader() {
				return _localHeader;
			},
			loadLocalHeaderFromBinary: function(input) {
				var data = input.slice(_offset, _offset + Constants.LOCHDR);
				if (data.readUInt32LE(0) !== Constants.LOCSIG) throw Utils.Errors.INVALID_LOC();
				_localHeader.version = data.readUInt16LE(Constants.LOCVER);
				_localHeader.flags = data.readUInt16LE(Constants.LOCFLG);
				_localHeader.method = data.readUInt16LE(Constants.LOCHOW);
				_localHeader.time = data.readUInt32LE(Constants.LOCTIM);
				_localHeader.crc = data.readUInt32LE(Constants.LOCCRC);
				_localHeader.compressedSize = data.readUInt32LE(Constants.LOCSIZ);
				_localHeader.size = data.readUInt32LE(Constants.LOCLEN);
				_localHeader.fnameLen = data.readUInt16LE(Constants.LOCNAM);
				_localHeader.extraLen = data.readUInt16LE(Constants.LOCEXT);
				const extraStart = _offset + Constants.LOCHDR + _localHeader.fnameLen;
				const extraEnd = extraStart + _localHeader.extraLen;
				return input.slice(extraStart, extraEnd);
			},
			loadFromBinary: function(data) {
				if (data.length !== Constants.CENHDR || data.readUInt32LE(0) !== Constants.CENSIG) throw Utils.Errors.INVALID_CEN();
				_verMade = data.readUInt16LE(Constants.CENVEM);
				_version = data.readUInt16LE(Constants.CENVER);
				_flags = data.readUInt16LE(Constants.CENFLG);
				_method = data.readUInt16LE(Constants.CENHOW);
				_time = data.readUInt32LE(Constants.CENTIM);
				_crc = data.readUInt32LE(Constants.CENCRC);
				_compressedSize = data.readUInt32LE(Constants.CENSIZ);
				_size = data.readUInt32LE(Constants.CENLEN);
				_fnameLen = data.readUInt16LE(Constants.CENNAM);
				_extraLen = data.readUInt16LE(Constants.CENEXT);
				_comLen = data.readUInt16LE(Constants.CENCOM);
				_diskStart = data.readUInt16LE(Constants.CENDSK);
				_inattr = data.readUInt16LE(Constants.CENATT);
				_attr = data.readUInt32LE(Constants.CENATX);
				_offset = data.readUInt32LE(Constants.CENOFF);
			},
			localHeaderToBinary: function() {
				var data = Buffer.alloc(Constants.LOCHDR);
				data.writeUInt32LE(Constants.LOCSIG, 0);
				data.writeUInt16LE(_version, Constants.LOCVER);
				data.writeUInt16LE(_flags, Constants.LOCFLG);
				data.writeUInt16LE(_method, Constants.LOCHOW);
				data.writeUInt32LE(_time, Constants.LOCTIM);
				data.writeUInt32LE(_crc, Constants.LOCCRC);
				data.writeUInt32LE(_compressedSize, Constants.LOCSIZ);
				data.writeUInt32LE(_size, Constants.LOCLEN);
				data.writeUInt16LE(_fnameLen, Constants.LOCNAM);
				data.writeUInt16LE(_localHeader.extraLen, Constants.LOCEXT);
				return data;
			},
			centralHeaderToBinary: function() {
				var data = Buffer.alloc(Constants.CENHDR + _fnameLen + _extraLen + _comLen);
				data.writeUInt32LE(Constants.CENSIG, 0);
				data.writeUInt16LE(_verMade, Constants.CENVEM);
				data.writeUInt16LE(_version, Constants.CENVER);
				data.writeUInt16LE(_flags, Constants.CENFLG);
				data.writeUInt16LE(_method, Constants.CENHOW);
				data.writeUInt32LE(_time, Constants.CENTIM);
				data.writeUInt32LE(_crc, Constants.CENCRC);
				data.writeUInt32LE(_compressedSize, Constants.CENSIZ);
				data.writeUInt32LE(_size, Constants.CENLEN);
				data.writeUInt16LE(_fnameLen, Constants.CENNAM);
				data.writeUInt16LE(_extraLen, Constants.CENEXT);
				data.writeUInt16LE(_comLen, Constants.CENCOM);
				data.writeUInt16LE(_diskStart, Constants.CENDSK);
				data.writeUInt16LE(_inattr, Constants.CENATT);
				data.writeUInt32LE(_attr, Constants.CENATX);
				data.writeUInt32LE(_offset, Constants.CENOFF);
				return data;
			},
			toJSON: function() {
				const bytes = function(nr) {
					return nr + " bytes";
				};
				return {
					made: _verMade,
					version: _version,
					flags: _flags,
					method: Utils.methodToString(_method),
					time: this.time,
					crc: "0x" + _crc.toString(16).toUpperCase(),
					compressedSize: bytes(_compressedSize),
					size: bytes(_size),
					fileNameLength: bytes(_fnameLen),
					extraLength: bytes(_extraLen),
					commentLength: bytes(_comLen),
					diskNumStart: _diskStart,
					inAttr: _inattr,
					attr: _attr,
					offset: _offset,
					centralHeaderSize: bytes(Constants.CENHDR + _fnameLen + _extraLen + _comLen)
				};
			},
			toString: function() {
				return JSON.stringify(this.toJSON(), null, "	");
			}
		};
	};
}));
//#endregion
//#region ../../node_modules/adm-zip/headers/mainHeader.js
var require_mainHeader = /* @__PURE__ */ require_chunk.__commonJSMin(((exports, module) => {
	var Utils = require_util(), Constants = Utils.Constants;
	module.exports = function() {
		var _volumeEntries = 0, _totalEntries = 0, _size = 0, _offset = 0, _commentLength = 0;
		return {
			get diskEntries() {
				return _volumeEntries;
			},
			set diskEntries(val) {
				_volumeEntries = _totalEntries = val;
			},
			get totalEntries() {
				return _totalEntries;
			},
			set totalEntries(val) {
				_totalEntries = _volumeEntries = val;
			},
			get size() {
				return _size;
			},
			set size(val) {
				_size = val;
			},
			get offset() {
				return _offset;
			},
			set offset(val) {
				_offset = val;
			},
			get commentLength() {
				return _commentLength;
			},
			set commentLength(val) {
				_commentLength = val;
			},
			get mainHeaderSize() {
				return Constants.ENDHDR + _commentLength;
			},
			loadFromBinary: function(data) {
				if ((data.length !== Constants.ENDHDR || data.readUInt32LE(0) !== Constants.ENDSIG) && (data.length < Constants.ZIP64HDR || data.readUInt32LE(0) !== Constants.ZIP64SIG)) throw Utils.Errors.INVALID_END();
				if (data.readUInt32LE(0) === Constants.ENDSIG) {
					_volumeEntries = data.readUInt16LE(Constants.ENDSUB);
					_totalEntries = data.readUInt16LE(Constants.ENDTOT);
					_size = data.readUInt32LE(Constants.ENDSIZ);
					_offset = data.readUInt32LE(Constants.ENDOFF);
					_commentLength = data.readUInt16LE(Constants.ENDCOM);
				} else {
					_volumeEntries = Utils.readBigUInt64LE(data, Constants.ZIP64SUB);
					_totalEntries = Utils.readBigUInt64LE(data, Constants.ZIP64TOT);
					_size = Utils.readBigUInt64LE(data, Constants.ZIP64SIZE);
					_offset = Utils.readBigUInt64LE(data, Constants.ZIP64OFF);
					_commentLength = 0;
				}
			},
			toBinary: function() {
				var b = Buffer.alloc(Constants.ENDHDR + _commentLength);
				b.writeUInt32LE(Constants.ENDSIG, 0);
				b.writeUInt32LE(0, 4);
				b.writeUInt16LE(_volumeEntries, Constants.ENDSUB);
				b.writeUInt16LE(_totalEntries, Constants.ENDTOT);
				b.writeUInt32LE(_size, Constants.ENDSIZ);
				b.writeUInt32LE(_offset, Constants.ENDOFF);
				b.writeUInt16LE(_commentLength, Constants.ENDCOM);
				b.fill(" ", Constants.ENDHDR);
				return b;
			},
			toJSON: function() {
				const offset = function(nr, len) {
					let offs = nr.toString(16).toUpperCase();
					while (offs.length < len) offs = "0" + offs;
					return "0x" + offs;
				};
				return {
					diskEntries: _volumeEntries,
					totalEntries: _totalEntries,
					size: _size + " bytes",
					offset: offset(_offset, 4),
					commentLength: _commentLength
				};
			},
			toString: function() {
				return JSON.stringify(this.toJSON(), null, "	");
			}
		};
	};
}));
//#endregion
//#region ../../node_modules/adm-zip/headers/index.js
var require_headers = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	exports.EntryHeader = require_entryHeader();
	exports.MainHeader = require_mainHeader();
}));
//#endregion
//#region ../../node_modules/adm-zip/methods/deflater.js
var require_deflater = /* @__PURE__ */ require_chunk.__commonJSMin(((exports, module) => {
	module.exports = function(inbuf) {
		var zlib = require("zlib");
		var opts = { chunkSize: (parseInt(inbuf.length / 1024) + 1) * 1024 };
		return {
			deflate: function() {
				return zlib.deflateRawSync(inbuf, opts);
			},
			deflateAsync: function(callback) {
				var tmp = zlib.createDeflateRaw(opts), parts = [], total = 0;
				tmp.on("data", function(data) {
					parts.push(data);
					total += data.length;
				});
				tmp.on("end", function() {
					var buf = Buffer.alloc(total), written = 0;
					buf.fill(0);
					for (var i = 0; i < parts.length; i++) {
						var part = parts[i];
						part.copy(buf, written);
						written += part.length;
					}
					callback && callback(buf);
				});
				tmp.end(inbuf);
			}
		};
	};
}));
//#endregion
//#region ../../node_modules/adm-zip/methods/inflater.js
var require_inflater = /* @__PURE__ */ require_chunk.__commonJSMin(((exports, module) => {
	var version = +(process.versions ? process.versions.node : "").split(".")[0] || 0;
	module.exports = function(inbuf, expectedLength) {
		var zlib = require("zlib");
		const option = version >= 15 && expectedLength > 0 ? { maxOutputLength: expectedLength } : {};
		return {
			inflate: function() {
				return zlib.inflateRawSync(inbuf, option);
			},
			inflateAsync: function(callback) {
				var tmp = zlib.createInflateRaw(option), parts = [], total = 0;
				tmp.on("data", function(data) {
					parts.push(data);
					total += data.length;
				});
				tmp.on("end", function() {
					var buf = Buffer.alloc(total), written = 0;
					buf.fill(0);
					for (var i = 0; i < parts.length; i++) {
						var part = parts[i];
						part.copy(buf, written);
						written += part.length;
					}
					callback && callback(buf);
				});
				tmp.end(inbuf);
			}
		};
	};
}));
//#endregion
//#region ../../node_modules/adm-zip/methods/zipcrypto.js
var require_zipcrypto = /* @__PURE__ */ require_chunk.__commonJSMin(((exports, module) => {
	var { randomFillSync } = require("crypto");
	var Errors = require_errors();
	var crctable = new Uint32Array(256).map((t, crc) => {
		for (let j = 0; j < 8; j++) if (0 !== (crc & 1)) crc = crc >>> 1 ^ 3988292384;
		else crc >>>= 1;
		return crc >>> 0;
	});
	var uMul = (a, b) => Math.imul(a, b) >>> 0;
	var crc32update = (pCrc32, bval) => {
		return crctable[(pCrc32 ^ bval) & 255] ^ pCrc32 >>> 8;
	};
	var genSalt = () => {
		if ("function" === typeof randomFillSync) return randomFillSync(Buffer.alloc(12));
		else return genSalt.node();
	};
	genSalt.node = () => {
		const salt = Buffer.alloc(12);
		const len = salt.length;
		for (let i = 0; i < len; i++) salt[i] = Math.random() * 256 & 255;
		return salt;
	};
	var config = { genSalt };
	function Initkeys(pw) {
		const pass = Buffer.isBuffer(pw) ? pw : Buffer.from(pw);
		this.keys = new Uint32Array([
			305419896,
			591751049,
			878082192
		]);
		for (let i = 0; i < pass.length; i++) this.updateKeys(pass[i]);
	}
	Initkeys.prototype.updateKeys = function(byteValue) {
		const keys = this.keys;
		keys[0] = crc32update(keys[0], byteValue);
		keys[1] += keys[0] & 255;
		keys[1] = uMul(keys[1], 134775813) + 1;
		keys[2] = crc32update(keys[2], keys[1] >>> 24);
		return byteValue;
	};
	Initkeys.prototype.next = function() {
		const k = (this.keys[2] | 2) >>> 0;
		return uMul(k, k ^ 1) >> 8 & 255;
	};
	function make_decrypter(pwd) {
		const keys = new Initkeys(pwd);
		return function(data) {
			const result = Buffer.alloc(data.length);
			let pos = 0;
			for (let c of data) result[pos++] = keys.updateKeys(c ^ keys.next());
			return result;
		};
	}
	function make_encrypter(pwd) {
		const keys = new Initkeys(pwd);
		return function(data, result, pos = 0) {
			if (!result) result = Buffer.alloc(data.length);
			for (let c of data) {
				const k = keys.next();
				result[pos++] = c ^ k;
				keys.updateKeys(c);
			}
			return result;
		};
	}
	function decrypt(data, header, pwd) {
		if (!data || !Buffer.isBuffer(data) || data.length < 12) return Buffer.alloc(0);
		const decrypter = make_decrypter(pwd);
		const salt = decrypter(data.slice(0, 12));
		const verifyByte = (header.flags & 8) === 8 ? header.timeHighByte : header.crc >>> 24;
		if (salt[11] !== verifyByte) throw Errors.WRONG_PASSWORD();
		return decrypter(data.slice(12));
	}
	function _salter(data) {
		if (Buffer.isBuffer(data) && data.length >= 12) config.genSalt = function() {
			return data.slice(0, 12);
		};
		else if (data === "node") config.genSalt = genSalt.node;
		else config.genSalt = genSalt;
	}
	function encrypt(data, header, pwd, oldlike = false) {
		if (data == null) data = Buffer.alloc(0);
		if (!Buffer.isBuffer(data)) data = Buffer.from(data.toString());
		const encrypter = make_encrypter(pwd);
		const salt = config.genSalt();
		salt[11] = header.crc >>> 24 & 255;
		if (oldlike) salt[10] = header.crc >>> 16 & 255;
		const result = Buffer.alloc(data.length + 12);
		encrypter(salt, result);
		return encrypter(data, result, 12);
	}
	module.exports = {
		decrypt,
		encrypt,
		_salter
	};
}));
//#endregion
//#region ../../node_modules/adm-zip/methods/index.js
var require_methods = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	exports.Deflater = require_deflater();
	exports.Inflater = require_inflater();
	exports.ZipCrypto = require_zipcrypto();
}));
//#endregion
//#region ../../node_modules/adm-zip/zipEntry.js
var require_zipEntry = /* @__PURE__ */ require_chunk.__commonJSMin(((exports, module) => {
	var Utils = require_util(), Headers = require_headers(), Constants = Utils.Constants, Methods = require_methods();
	module.exports = function(options, input) {
		var _centralHeader = new Headers.EntryHeader(), _entryName = Buffer.alloc(0), _comment = Buffer.alloc(0), _isDirectory = false, uncompressedData = null, _extra = Buffer.alloc(0), _extralocal = Buffer.alloc(0), _efs = true;
		const opts = options;
		const decoder = typeof opts.decoder === "object" ? opts.decoder : Utils.decoder;
		_efs = decoder.hasOwnProperty("efs") ? decoder.efs : false;
		function getCompressedDataFromZip() {
			if (!input || !(input instanceof Uint8Array)) return Buffer.alloc(0);
			_extralocal = _centralHeader.loadLocalHeaderFromBinary(input);
			return input.slice(_centralHeader.realDataOffset, _centralHeader.realDataOffset + _centralHeader.compressedSize);
		}
		function crc32OK(data) {
			if (!_centralHeader.flags_desc) {
				if (Utils.crc32(data) !== _centralHeader.localHeader.crc) return false;
			} else {
				const descriptor = {};
				const dataEndOffset = _centralHeader.realDataOffset + _centralHeader.compressedSize;
				if (input.readUInt32LE(dataEndOffset) == Constants.LOCSIG || input.readUInt32LE(dataEndOffset) == Constants.CENSIG) throw Utils.Errors.DESCRIPTOR_NOT_EXIST();
				if (input.readUInt32LE(dataEndOffset) == Constants.EXTSIG) {
					descriptor.crc = input.readUInt32LE(dataEndOffset + Constants.EXTCRC);
					descriptor.compressedSize = input.readUInt32LE(dataEndOffset + Constants.EXTSIZ);
					descriptor.size = input.readUInt32LE(dataEndOffset + Constants.EXTLEN);
				} else if (input.readUInt16LE(dataEndOffset + 12) === 19280) {
					descriptor.crc = input.readUInt32LE(dataEndOffset + Constants.EXTCRC - 4);
					descriptor.compressedSize = input.readUInt32LE(dataEndOffset + Constants.EXTSIZ - 4);
					descriptor.size = input.readUInt32LE(dataEndOffset + Constants.EXTLEN - 4);
				} else throw Utils.Errors.DESCRIPTOR_UNKNOWN();
				if (descriptor.compressedSize !== _centralHeader.compressedSize || descriptor.size !== _centralHeader.size || descriptor.crc !== _centralHeader.crc) throw Utils.Errors.DESCRIPTOR_FAULTY();
				if (Utils.crc32(data) !== descriptor.crc) return false;
			}
			return true;
		}
		function decompress(async, callback, pass) {
			if (typeof callback === "undefined" && typeof async === "string") {
				pass = async;
				async = void 0;
			}
			if (_isDirectory) {
				if (async && callback) callback(Buffer.alloc(0), Utils.Errors.DIRECTORY_CONTENT_ERROR());
				return Buffer.alloc(0);
			}
			var compressedData = getCompressedDataFromZip();
			if (compressedData.length === 0) {
				if (async && callback) callback(compressedData);
				return compressedData;
			}
			if (_centralHeader.encrypted) {
				if ("string" !== typeof pass && !Buffer.isBuffer(pass)) throw Utils.Errors.INVALID_PASS_PARAM();
				compressedData = Methods.ZipCrypto.decrypt(compressedData, _centralHeader, pass);
			}
			var data = Buffer.alloc(_centralHeader.size);
			switch (_centralHeader.method) {
				case Utils.Constants.STORED:
					compressedData.copy(data);
					if (!crc32OK(data)) {
						if (async && callback) callback(data, Utils.Errors.BAD_CRC());
						throw Utils.Errors.BAD_CRC();
					} else {
						if (async && callback) callback(data);
						return data;
					}
				case Utils.Constants.DEFLATED:
					var inflater = new Methods.Inflater(compressedData, _centralHeader.size);
					if (!async) {
						inflater.inflate(data).copy(data, 0);
						if (!crc32OK(data)) throw Utils.Errors.BAD_CRC(`"${decoder.decode(_entryName)}"`);
						return data;
					} else inflater.inflateAsync(function(result) {
						result.copy(result, 0);
						if (callback) if (!crc32OK(result)) callback(result, Utils.Errors.BAD_CRC());
						else callback(result);
					});
					break;
				default:
					if (async && callback) callback(Buffer.alloc(0), Utils.Errors.UNKNOWN_METHOD());
					throw Utils.Errors.UNKNOWN_METHOD();
			}
		}
		function compress(async, callback) {
			if ((!uncompressedData || !uncompressedData.length) && Buffer.isBuffer(input)) {
				if (async && callback) callback(getCompressedDataFromZip());
				return getCompressedDataFromZip();
			}
			if (uncompressedData.length && !_isDirectory) {
				var compressedData;
				switch (_centralHeader.method) {
					case Utils.Constants.STORED:
						_centralHeader.compressedSize = _centralHeader.size;
						compressedData = Buffer.alloc(uncompressedData.length);
						uncompressedData.copy(compressedData);
						if (async && callback) callback(compressedData);
						return compressedData;
					default:
					case Utils.Constants.DEFLATED:
						var deflater = new Methods.Deflater(uncompressedData);
						if (!async) {
							var deflated = deflater.deflate();
							_centralHeader.compressedSize = deflated.length;
							return deflated;
						} else deflater.deflateAsync(function(data) {
							compressedData = Buffer.alloc(data.length);
							_centralHeader.compressedSize = data.length;
							data.copy(compressedData);
							callback && callback(compressedData);
						});
						deflater = null;
						break;
				}
			} else if (async && callback) callback(Buffer.alloc(0));
			else return Buffer.alloc(0);
		}
		function readUInt64LE(buffer, offset) {
			return (buffer.readUInt32LE(offset + 4) << 4) + buffer.readUInt32LE(offset);
		}
		function parseExtra(data) {
			try {
				var offset = 0;
				var signature, size, part;
				while (offset + 4 < data.length) {
					signature = data.readUInt16LE(offset);
					offset += 2;
					size = data.readUInt16LE(offset);
					offset += 2;
					part = data.slice(offset, offset + size);
					offset += size;
					if (Constants.ID_ZIP64 === signature) parseZip64ExtendedInformation(part);
				}
			} catch (error) {
				throw Utils.Errors.EXTRA_FIELD_PARSE_ERROR();
			}
		}
		function parseZip64ExtendedInformation(data) {
			var size, compressedSize, offset, diskNumStart;
			if (data.length >= Constants.EF_ZIP64_SCOMP) {
				size = readUInt64LE(data, Constants.EF_ZIP64_SUNCOMP);
				if (_centralHeader.size === Constants.EF_ZIP64_OR_32) _centralHeader.size = size;
			}
			if (data.length >= Constants.EF_ZIP64_RHO) {
				compressedSize = readUInt64LE(data, Constants.EF_ZIP64_SCOMP);
				if (_centralHeader.compressedSize === Constants.EF_ZIP64_OR_32) _centralHeader.compressedSize = compressedSize;
			}
			if (data.length >= Constants.EF_ZIP64_DSN) {
				offset = readUInt64LE(data, Constants.EF_ZIP64_RHO);
				if (_centralHeader.offset === Constants.EF_ZIP64_OR_32) _centralHeader.offset = offset;
			}
			if (data.length >= Constants.EF_ZIP64_DSN + 4) {
				diskNumStart = data.readUInt32LE(Constants.EF_ZIP64_DSN);
				if (_centralHeader.diskNumStart === Constants.EF_ZIP64_OR_16) _centralHeader.diskNumStart = diskNumStart;
			}
		}
		return {
			get entryName() {
				return decoder.decode(_entryName);
			},
			get rawEntryName() {
				return _entryName;
			},
			set entryName(val) {
				_entryName = Utils.toBuffer(val, decoder.encode);
				var lastChar = _entryName[_entryName.length - 1];
				_isDirectory = lastChar === 47 || lastChar === 92;
				_centralHeader.fileNameLength = _entryName.length;
			},
			get efs() {
				if (typeof _efs === "function") return _efs(this.entryName);
				else return _efs;
			},
			get extra() {
				return _extra;
			},
			set extra(val) {
				_extra = val;
				_centralHeader.extraLength = val.length;
				parseExtra(val);
			},
			get comment() {
				return decoder.decode(_comment);
			},
			set comment(val) {
				_comment = Utils.toBuffer(val, decoder.encode);
				_centralHeader.commentLength = _comment.length;
				if (_comment.length > 65535) throw Utils.Errors.COMMENT_TOO_LONG();
			},
			get name() {
				var n = decoder.decode(_entryName);
				return _isDirectory ? n.substr(n.length - 1).split("/").pop() : n.split("/").pop();
			},
			get isDirectory() {
				return _isDirectory;
			},
			getCompressedData: function() {
				return compress(false, null);
			},
			getCompressedDataAsync: function(callback) {
				compress(true, callback);
			},
			setData: function(value) {
				uncompressedData = Utils.toBuffer(value, Utils.decoder.encode);
				if (!_isDirectory && uncompressedData.length) {
					_centralHeader.size = uncompressedData.length;
					_centralHeader.method = Utils.Constants.DEFLATED;
					_centralHeader.crc = Utils.crc32(value);
					_centralHeader.changed = true;
				} else _centralHeader.method = Utils.Constants.STORED;
			},
			getData: function(pass) {
				if (_centralHeader.changed) return uncompressedData;
				else return decompress(false, null, pass);
			},
			getDataAsync: function(callback, pass) {
				if (_centralHeader.changed) callback(uncompressedData);
				else decompress(true, callback, pass);
			},
			set attr(attr) {
				_centralHeader.attr = attr;
			},
			get attr() {
				return _centralHeader.attr;
			},
			set header(data) {
				_centralHeader.loadFromBinary(data);
			},
			get header() {
				return _centralHeader;
			},
			packCentralHeader: function() {
				_centralHeader.flags_efs = this.efs;
				_centralHeader.extraLength = _extra.length;
				var header = _centralHeader.centralHeaderToBinary();
				var addpos = Utils.Constants.CENHDR;
				_entryName.copy(header, addpos);
				addpos += _entryName.length;
				_extra.copy(header, addpos);
				addpos += _centralHeader.extraLength;
				_comment.copy(header, addpos);
				return header;
			},
			packLocalHeader: function() {
				let addpos = 0;
				_centralHeader.flags_efs = this.efs;
				_centralHeader.extraLocalLength = _extralocal.length;
				const localHeaderBuf = _centralHeader.localHeaderToBinary();
				const localHeader = Buffer.alloc(localHeaderBuf.length + _entryName.length + _centralHeader.extraLocalLength);
				localHeaderBuf.copy(localHeader, addpos);
				addpos += localHeaderBuf.length;
				_entryName.copy(localHeader, addpos);
				addpos += _entryName.length;
				_extralocal.copy(localHeader, addpos);
				addpos += _extralocal.length;
				return localHeader;
			},
			toJSON: function() {
				const bytes = function(nr) {
					return "<" + (nr && nr.length + " bytes buffer" || "null") + ">";
				};
				return {
					entryName: this.entryName,
					name: this.name,
					comment: this.comment,
					isDirectory: this.isDirectory,
					header: _centralHeader.toJSON(),
					compressedData: bytes(input),
					data: bytes(uncompressedData)
				};
			},
			toString: function() {
				return JSON.stringify(this.toJSON(), null, "	");
			}
		};
	};
}));
//#endregion
//#region ../../node_modules/adm-zip/zipFile.js
var require_zipFile = /* @__PURE__ */ require_chunk.__commonJSMin(((exports, module) => {
	var ZipEntry = require_zipEntry();
	var Headers = require_headers();
	var Utils = require_util();
	module.exports = function(inBuffer, options) {
		var entryList = [], entryTable = {}, _comment = Buffer.alloc(0), mainHeader = new Headers.MainHeader(), loadedEntries = false;
		const temporary = /* @__PURE__ */ new Set();
		const opts = options;
		const { noSort, decoder } = opts;
		if (inBuffer) readMainHeader(opts.readEntries);
		else loadedEntries = true;
		function makeTemporaryFolders() {
			const foldersList = /* @__PURE__ */ new Set();
			for (const elem of Object.keys(entryTable)) {
				const elements = elem.split("/");
				elements.pop();
				if (!elements.length) continue;
				for (let i = 0; i < elements.length; i++) {
					const sub = elements.slice(0, i + 1).join("/") + "/";
					foldersList.add(sub);
				}
			}
			for (const elem of foldersList) if (!(elem in entryTable)) {
				const tempfolder = new ZipEntry(opts);
				tempfolder.entryName = elem;
				tempfolder.attr = 16;
				tempfolder.temporary = true;
				entryList.push(tempfolder);
				entryTable[tempfolder.entryName] = tempfolder;
				temporary.add(tempfolder);
			}
		}
		function readEntries() {
			loadedEntries = true;
			entryTable = {};
			if (mainHeader.diskEntries > (inBuffer.length - mainHeader.offset) / Utils.Constants.CENHDR) throw Utils.Errors.DISK_ENTRY_TOO_LARGE();
			entryList = new Array(mainHeader.diskEntries);
			var index = mainHeader.offset;
			for (var i = 0; i < entryList.length; i++) {
				var tmp = index, entry = new ZipEntry(opts, inBuffer);
				entry.header = inBuffer.slice(tmp, tmp += Utils.Constants.CENHDR);
				entry.entryName = inBuffer.slice(tmp, tmp += entry.header.fileNameLength);
				if (entry.header.extraLength) entry.extra = inBuffer.slice(tmp, tmp += entry.header.extraLength);
				if (entry.header.commentLength) entry.comment = inBuffer.slice(tmp, tmp + entry.header.commentLength);
				index += entry.header.centralHeaderSize;
				entryList[i] = entry;
				entryTable[entry.entryName] = entry;
			}
			temporary.clear();
			makeTemporaryFolders();
		}
		function readMainHeader(readNow) {
			var i = inBuffer.length - Utils.Constants.ENDHDR, max = Math.max(0, i - 65535), n = max, endStart = inBuffer.length, endOffset = -1, commentEnd = 0;
			if (typeof opts.trailingSpace === "boolean" ? opts.trailingSpace : false) max = 0;
			for (; i >= n; i--) {
				if (inBuffer[i] !== 80) continue;
				if (inBuffer.readUInt32LE(i) === Utils.Constants.ENDSIG) {
					endOffset = i;
					commentEnd = i;
					endStart = i + Utils.Constants.ENDHDR;
					n = i - Utils.Constants.END64HDR;
					continue;
				}
				if (inBuffer.readUInt32LE(i) === Utils.Constants.END64SIG) {
					n = max;
					continue;
				}
				if (inBuffer.readUInt32LE(i) === Utils.Constants.ZIP64SIG) {
					endOffset = i;
					endStart = i + Utils.readBigUInt64LE(inBuffer, i + Utils.Constants.ZIP64SIZE) + Utils.Constants.ZIP64LEAD;
					break;
				}
			}
			if (endOffset == -1) throw Utils.Errors.INVALID_FORMAT();
			mainHeader.loadFromBinary(inBuffer.slice(endOffset, endStart));
			if (mainHeader.commentLength) _comment = inBuffer.slice(commentEnd + Utils.Constants.ENDHDR);
			if (readNow) readEntries();
		}
		function sortEntries() {
			if (entryList.length > 1 && !noSort) entryList.sort((a, b) => a.entryName.toLowerCase().localeCompare(b.entryName.toLowerCase()));
		}
		return {
			get entries() {
				if (!loadedEntries) readEntries();
				return entryList.filter((e) => !temporary.has(e));
			},
			get comment() {
				return decoder.decode(_comment);
			},
			set comment(val) {
				_comment = Utils.toBuffer(val, decoder.encode);
				mainHeader.commentLength = _comment.length;
			},
			getEntryCount: function() {
				if (!loadedEntries) return mainHeader.diskEntries;
				return entryList.length;
			},
			forEach: function(callback) {
				this.entries.forEach(callback);
			},
			getEntry: function(entryName) {
				if (!loadedEntries) readEntries();
				return entryTable[entryName] || null;
			},
			setEntry: function(entry) {
				if (!loadedEntries) readEntries();
				entryList.push(entry);
				entryTable[entry.entryName] = entry;
				mainHeader.totalEntries = entryList.length;
			},
			deleteFile: function(entryName, withsubfolders = true) {
				if (!loadedEntries) readEntries();
				const entry = entryTable[entryName];
				this.getEntryChildren(entry, withsubfolders).map((child) => child.entryName).forEach(this.deleteEntry);
			},
			deleteEntry: function(entryName) {
				if (!loadedEntries) readEntries();
				const entry = entryTable[entryName];
				const index = entryList.indexOf(entry);
				if (index >= 0) {
					entryList.splice(index, 1);
					delete entryTable[entryName];
					mainHeader.totalEntries = entryList.length;
				}
			},
			getEntryChildren: function(entry, subfolders = true) {
				if (!loadedEntries) readEntries();
				if (typeof entry === "object") if (entry.isDirectory && subfolders) {
					const list = [];
					const name = entry.entryName;
					for (const zipEntry of entryList) if (zipEntry.entryName.startsWith(name)) list.push(zipEntry);
					return list;
				} else return [entry];
				return [];
			},
			getChildCount: function(entry) {
				if (entry && entry.isDirectory) {
					const list = this.getEntryChildren(entry);
					return list.includes(entry) ? list.length - 1 : list.length;
				}
				return 0;
			},
			compressToBuffer: function() {
				if (!loadedEntries) readEntries();
				sortEntries();
				const dataBlock = [];
				const headerBlocks = [];
				let totalSize = 0;
				let dindex = 0;
				mainHeader.size = 0;
				mainHeader.offset = 0;
				let totalEntries = 0;
				for (const entry of this.entries) {
					const compressedData = entry.getCompressedData();
					entry.header.offset = dindex;
					const localHeader = entry.packLocalHeader();
					const dataLength = localHeader.length + compressedData.length;
					dindex += dataLength;
					dataBlock.push(localHeader);
					dataBlock.push(compressedData);
					const centralHeader = entry.packCentralHeader();
					headerBlocks.push(centralHeader);
					mainHeader.size += centralHeader.length;
					totalSize += dataLength + centralHeader.length;
					totalEntries++;
				}
				totalSize += mainHeader.mainHeaderSize;
				mainHeader.offset = dindex;
				mainHeader.totalEntries = totalEntries;
				dindex = 0;
				const outBuffer = Buffer.alloc(totalSize);
				for (const content of dataBlock) {
					content.copy(outBuffer, dindex);
					dindex += content.length;
				}
				for (const content of headerBlocks) {
					content.copy(outBuffer, dindex);
					dindex += content.length;
				}
				const mh = mainHeader.toBinary();
				if (_comment) _comment.copy(mh, Utils.Constants.ENDHDR);
				mh.copy(outBuffer, dindex);
				inBuffer = outBuffer;
				loadedEntries = false;
				return outBuffer;
			},
			toAsyncBuffer: function(onSuccess, onFail, onItemStart, onItemEnd) {
				try {
					if (!loadedEntries) readEntries();
					sortEntries();
					const dataBlock = [];
					const centralHeaders = [];
					let totalSize = 0;
					let dindex = 0;
					let totalEntries = 0;
					mainHeader.size = 0;
					mainHeader.offset = 0;
					const compress2Buffer = function(entryLists) {
						if (entryLists.length > 0) {
							const entry = entryLists.shift();
							const name = entry.entryName + entry.extra.toString();
							if (onItemStart) onItemStart(name);
							entry.getCompressedDataAsync(function(compressedData) {
								if (onItemEnd) onItemEnd(name);
								entry.header.offset = dindex;
								const localHeader = entry.packLocalHeader();
								const dataLength = localHeader.length + compressedData.length;
								dindex += dataLength;
								dataBlock.push(localHeader);
								dataBlock.push(compressedData);
								const centalHeader = entry.packCentralHeader();
								centralHeaders.push(centalHeader);
								mainHeader.size += centalHeader.length;
								totalSize += dataLength + centalHeader.length;
								totalEntries++;
								compress2Buffer(entryLists);
							});
						} else {
							totalSize += mainHeader.mainHeaderSize;
							mainHeader.offset = dindex;
							mainHeader.totalEntries = totalEntries;
							dindex = 0;
							const outBuffer = Buffer.alloc(totalSize);
							dataBlock.forEach(function(content) {
								content.copy(outBuffer, dindex);
								dindex += content.length;
							});
							centralHeaders.forEach(function(content) {
								content.copy(outBuffer, dindex);
								dindex += content.length;
							});
							const mh = mainHeader.toBinary();
							if (_comment) _comment.copy(mh, Utils.Constants.ENDHDR);
							mh.copy(outBuffer, dindex);
							inBuffer = outBuffer;
							loadedEntries = false;
							onSuccess(outBuffer);
						}
					};
					compress2Buffer(Array.from(this.entries));
				} catch (e) {
					onFail(e);
				}
			}
		};
	};
}));
//#endregion
//#region ../../node_modules/adm-zip/adm-zip.js
var require_adm_zip = /* @__PURE__ */ require_chunk.__commonJSMin(((exports, module) => {
	var Utils = require_util();
	var pth = require("path");
	var ZipEntry = require_zipEntry();
	var ZipFile = require_zipFile();
	var get_Bool = (...val) => Utils.findLast(val, (c) => typeof c === "boolean");
	var get_Str = (...val) => Utils.findLast(val, (c) => typeof c === "string");
	var get_Fun = (...val) => Utils.findLast(val, (c) => typeof c === "function");
	var defaultOptions = {
		noSort: false,
		readEntries: false,
		method: Utils.Constants.NONE,
		fs: null
	};
	module.exports = function(input, options) {
		let inBuffer = null;
		const opts = Object.assign(Object.create(null), defaultOptions);
		if (input && "object" === typeof input) {
			if (!(input instanceof Uint8Array)) {
				Object.assign(opts, input);
				input = opts.input ? opts.input : void 0;
				if (opts.input) delete opts.input;
			}
			if (Buffer.isBuffer(input)) {
				inBuffer = input;
				opts.method = Utils.Constants.BUFFER;
				input = void 0;
			}
		}
		Object.assign(opts, options);
		const filetools = new Utils(opts);
		if (typeof opts.decoder !== "object" || typeof opts.decoder.encode !== "function" || typeof opts.decoder.decode !== "function") opts.decoder = Utils.decoder;
		if (input && "string" === typeof input) if (filetools.fs.existsSync(input)) {
			opts.method = Utils.Constants.FILE;
			opts.filename = input;
			inBuffer = filetools.fs.readFileSync(input);
		} else throw Utils.Errors.INVALID_FILENAME();
		const _zip = new ZipFile(inBuffer, opts);
		const { canonical, sanitize, zipnamefix } = Utils;
		function getEntry(entry) {
			if (entry && _zip) {
				var item;
				if (typeof entry === "string") item = _zip.getEntry(pth.posix.normalize(entry));
				if (typeof entry === "object" && typeof entry.entryName !== "undefined" && typeof entry.header !== "undefined") item = _zip.getEntry(entry.entryName);
				if (item) return item;
			}
			return null;
		}
		function fixPath(zipPath) {
			const { join, normalize, sep } = pth.posix;
			return join(".", normalize(sep + zipPath.split("\\").join(sep) + sep));
		}
		function filenameFilter(filterfn) {
			if (filterfn instanceof RegExp) return (function(rx) {
				return function(filename) {
					return rx.test(filename);
				};
			})(filterfn);
			else if ("function" !== typeof filterfn) return () => true;
			return filterfn;
		}
		const relativePath = (local, entry) => {
			let lastChar = entry.slice(-1);
			lastChar = lastChar === filetools.sep ? filetools.sep : "";
			return pth.relative(local, entry) + lastChar;
		};
		return {
			readFile: function(entry, pass) {
				var item = getEntry(entry);
				return item && item.getData(pass) || null;
			},
			childCount: function(entry) {
				const item = getEntry(entry);
				if (item) return _zip.getChildCount(item);
			},
			readFileAsync: function(entry, callback) {
				var item = getEntry(entry);
				if (item) item.getDataAsync(callback);
				else callback(null, "getEntry failed for:" + entry);
			},
			readAsText: function(entry, encoding) {
				var item = getEntry(entry);
				if (item) {
					var data = item.getData();
					if (data && data.length) return data.toString(encoding || "utf8");
				}
				return "";
			},
			readAsTextAsync: function(entry, callback, encoding) {
				var item = getEntry(entry);
				if (item) item.getDataAsync(function(data, err) {
					if (err) {
						callback(data, err);
						return;
					}
					if (data && data.length) callback(data.toString(encoding || "utf8"));
					else callback("");
				});
				else callback("");
			},
			deleteFile: function(entry, withsubfolders = true) {
				var item = getEntry(entry);
				if (item) _zip.deleteFile(item.entryName, withsubfolders);
			},
			deleteEntry: function(entry) {
				var item = getEntry(entry);
				if (item) _zip.deleteEntry(item.entryName);
			},
			addZipComment: function(comment) {
				_zip.comment = comment;
			},
			getZipComment: function() {
				return _zip.comment || "";
			},
			addZipEntryComment: function(entry, comment) {
				var item = getEntry(entry);
				if (item) item.comment = comment;
			},
			getZipEntryComment: function(entry) {
				var item = getEntry(entry);
				if (item) return item.comment || "";
				return "";
			},
			updateFile: function(entry, content) {
				var item = getEntry(entry);
				if (item) item.setData(content);
			},
			addLocalFile: function(localPath, zipPath, zipName, comment) {
				if (filetools.fs.existsSync(localPath)) {
					zipPath = zipPath ? fixPath(zipPath) : "";
					const p = pth.win32.basename(pth.win32.normalize(localPath));
					zipPath += zipName ? zipName : p;
					const _attr = filetools.fs.statSync(localPath);
					const data = _attr.isFile() ? filetools.fs.readFileSync(localPath) : Buffer.alloc(0);
					if (_attr.isDirectory()) zipPath += filetools.sep;
					this.addFile(zipPath, data, comment, _attr);
				} else throw Utils.Errors.FILE_NOT_FOUND(localPath);
			},
			addLocalFileAsync: function(options, callback) {
				options = typeof options === "object" ? options : { localPath: options };
				const localPath = pth.resolve(options.localPath);
				const { comment } = options;
				let { zipPath, zipName } = options;
				const self = this;
				filetools.fs.stat(localPath, function(err, stats) {
					if (err) return callback(err, false);
					zipPath = zipPath ? fixPath(zipPath) : "";
					const p = pth.win32.basename(pth.win32.normalize(localPath));
					zipPath += zipName ? zipName : p;
					if (stats.isFile()) filetools.fs.readFile(localPath, function(err, data) {
						if (err) return callback(err, false);
						self.addFile(zipPath, data, comment, stats);
						return setImmediate(callback, void 0, true);
					});
					else if (stats.isDirectory()) {
						zipPath += filetools.sep;
						self.addFile(zipPath, Buffer.alloc(0), comment, stats);
						return setImmediate(callback, void 0, true);
					}
				});
			},
			addLocalFolder: function(localPath, zipPath, filter) {
				filter = filenameFilter(filter);
				zipPath = zipPath ? fixPath(zipPath) : "";
				localPath = pth.normalize(localPath);
				if (filetools.fs.existsSync(localPath)) {
					const items = filetools.findFiles(localPath);
					const self = this;
					if (items.length) for (const filepath of items) {
						const p = pth.join(zipPath, relativePath(localPath, filepath));
						if (filter(p)) self.addLocalFile(filepath, pth.dirname(p));
					}
				} else throw Utils.Errors.FILE_NOT_FOUND(localPath);
			},
			addLocalFolderAsync: function(localPath, callback, zipPath, filter) {
				filter = filenameFilter(filter);
				zipPath = zipPath ? fixPath(zipPath) : "";
				localPath = pth.normalize(localPath);
				var self = this;
				filetools.fs.open(localPath, "r", function(err) {
					if (err && err.code === "ENOENT") callback(void 0, Utils.Errors.FILE_NOT_FOUND(localPath));
					else if (err) callback(void 0, err);
					else {
						var items = filetools.findFiles(localPath);
						var i = -1;
						var next = function() {
							i += 1;
							if (i < items.length) {
								var filepath = items[i];
								var p = relativePath(localPath, filepath).split("\\").join("/");
								p = p.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\x20-\x7E]/g, "");
								if (filter(p)) filetools.fs.stat(filepath, function(er0, stats) {
									if (er0) callback(void 0, er0);
									if (stats.isFile()) filetools.fs.readFile(filepath, function(er1, data) {
										if (er1) callback(void 0, er1);
										else {
											self.addFile(zipPath + p, data, "", stats);
											next();
										}
									});
									else {
										self.addFile(zipPath + p + "/", Buffer.alloc(0), "", stats);
										next();
									}
								});
								else process.nextTick(() => {
									next();
								});
							} else callback(true, void 0);
						};
						next();
					}
				});
			},
			addLocalFolderAsync2: function(options, callback) {
				const self = this;
				options = typeof options === "object" ? options : { localPath: options };
				localPath = pth.resolve(fixPath(options.localPath));
				let { zipPath, filter, namefix } = options;
				if (filter instanceof RegExp) filter = (function(rx) {
					return function(filename) {
						return rx.test(filename);
					};
				})(filter);
				else if ("function" !== typeof filter) filter = function() {
					return true;
				};
				zipPath = zipPath ? fixPath(zipPath) : "";
				if (namefix == "latin1") namefix = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\x20-\x7E]/g, "");
				if (typeof namefix !== "function") namefix = (str) => str;
				const relPathFix = (entry) => pth.join(zipPath, namefix(relativePath(localPath, entry)));
				const fileNameFix = (entry) => pth.win32.basename(pth.win32.normalize(namefix(entry)));
				filetools.fs.open(localPath, "r", function(err) {
					if (err && err.code === "ENOENT") callback(void 0, Utils.Errors.FILE_NOT_FOUND(localPath));
					else if (err) callback(void 0, err);
					else filetools.findFilesAsync(localPath, function(err, fileEntries) {
						if (err) return callback(err);
						fileEntries = fileEntries.filter((dir) => filter(relPathFix(dir)));
						if (!fileEntries.length) callback(void 0, false);
						setImmediate(fileEntries.reverse().reduce(function(next, entry) {
							return function(err, done) {
								if (err || done === false) return setImmediate(next, err, false);
								self.addLocalFileAsync({
									localPath: entry,
									zipPath: pth.dirname(relPathFix(entry)),
									zipName: fileNameFix(entry)
								}, next);
							};
						}, callback));
					});
				});
			},
			addLocalFolderPromise: function(localPath, props) {
				return new Promise((resolve, reject) => {
					this.addLocalFolderAsync2(Object.assign({ localPath }, props), (err, done) => {
						if (err) reject(err);
						if (done) resolve(this);
					});
				});
			},
			addFile: function(entryName, content, comment, attr) {
				entryName = zipnamefix(entryName);
				let entry = getEntry(entryName);
				const update = entry != null;
				if (!update) {
					entry = new ZipEntry(opts);
					entry.entryName = entryName;
				}
				entry.comment = comment || "";
				const isStat = "object" === typeof attr && attr instanceof filetools.fs.Stats;
				if (isStat) entry.header.time = attr.mtime;
				var fileattr = entry.isDirectory ? 16 : 0;
				let unix = entry.isDirectory ? 16384 : 32768;
				if (isStat) unix |= 4095 & attr.mode;
				else if ("number" === typeof attr) unix |= 4095 & attr;
				else unix |= entry.isDirectory ? 493 : 420;
				fileattr = (fileattr | unix << 16) >>> 0;
				entry.attr = fileattr;
				entry.setData(content);
				if (!update) _zip.setEntry(entry);
				return entry;
			},
			getEntries: function(password) {
				_zip.password = password;
				return _zip ? _zip.entries : [];
			},
			getEntry: function(name) {
				return getEntry(name);
			},
			getEntryCount: function() {
				return _zip.getEntryCount();
			},
			forEach: function(callback) {
				return _zip.forEach(callback);
			},
			extractEntryTo: function(entry, targetPath, maintainEntryPath, overwrite, keepOriginalPermission, outFileName) {
				overwrite = get_Bool(false, overwrite);
				keepOriginalPermission = get_Bool(false, keepOriginalPermission);
				maintainEntryPath = get_Bool(true, maintainEntryPath);
				outFileName = get_Str(keepOriginalPermission, outFileName);
				var item = getEntry(entry);
				if (!item) throw Utils.Errors.NO_ENTRY();
				var entryName = canonical(item.entryName);
				var target = sanitize(targetPath, outFileName && !item.isDirectory ? outFileName : maintainEntryPath ? entryName : pth.basename(entryName));
				if (item.isDirectory) {
					_zip.getEntryChildren(item).forEach(function(child) {
						if (child.isDirectory) return;
						var content = child.getData();
						if (!content) throw Utils.Errors.CANT_EXTRACT_FILE();
						var name = canonical(child.entryName);
						var childName = sanitize(targetPath, maintainEntryPath ? name : pth.basename(name));
						const fileAttr = keepOriginalPermission ? child.header.fileAttr : void 0;
						filetools.writeFileTo(childName, content, overwrite, fileAttr);
					});
					return true;
				}
				var content = item.getData(_zip.password);
				if (!content) throw Utils.Errors.CANT_EXTRACT_FILE();
				if (filetools.fs.existsSync(target) && !overwrite) throw Utils.Errors.CANT_OVERRIDE();
				const fileAttr = keepOriginalPermission ? entry.header.fileAttr : void 0;
				filetools.writeFileTo(target, content, overwrite, fileAttr);
				return true;
			},
			test: function(pass) {
				if (!_zip) return false;
				for (var entry in _zip.entries) try {
					if (entry.isDirectory) continue;
					if (!_zip.entries[entry].getData(pass)) return false;
				} catch (err) {
					return false;
				}
				return true;
			},
			extractAllTo: function(targetPath, overwrite, keepOriginalPermission, pass) {
				keepOriginalPermission = get_Bool(false, keepOriginalPermission);
				pass = get_Str(keepOriginalPermission, pass);
				overwrite = get_Bool(false, overwrite);
				if (!_zip) throw Utils.Errors.NO_ZIP();
				_zip.entries.forEach(function(entry) {
					var entryName = sanitize(targetPath, canonical(entry.entryName));
					if (entry.isDirectory) {
						filetools.makeDir(entryName);
						return;
					}
					var content = entry.getData(pass);
					if (!content) throw Utils.Errors.CANT_EXTRACT_FILE();
					const fileAttr = keepOriginalPermission ? entry.header.fileAttr : void 0;
					filetools.writeFileTo(entryName, content, overwrite, fileAttr);
					try {
						filetools.fs.utimesSync(entryName, entry.header.time, entry.header.time);
					} catch (err) {
						throw Utils.Errors.CANT_EXTRACT_FILE();
					}
				});
			},
			extractAllToAsync: function(targetPath, overwrite, keepOriginalPermission, callback) {
				callback = get_Fun(overwrite, keepOriginalPermission, callback);
				keepOriginalPermission = get_Bool(false, keepOriginalPermission);
				overwrite = get_Bool(false, overwrite);
				if (!callback) return new Promise((resolve, reject) => {
					this.extractAllToAsync(targetPath, overwrite, keepOriginalPermission, function(err) {
						if (err) reject(err);
						else resolve(this);
					});
				});
				if (!_zip) {
					callback(Utils.Errors.NO_ZIP());
					return;
				}
				targetPath = pth.resolve(targetPath);
				const getPath = (entry) => sanitize(targetPath, pth.normalize(canonical(entry.entryName)));
				const getError = (msg, file) => /* @__PURE__ */ new Error(msg + ": \"" + file + "\"");
				const dirEntries = [];
				const fileEntries = [];
				_zip.entries.forEach((e) => {
					if (e.isDirectory) dirEntries.push(e);
					else fileEntries.push(e);
				});
				for (const entry of dirEntries) {
					const dirPath = getPath(entry);
					const dirAttr = keepOriginalPermission ? entry.header.fileAttr : void 0;
					try {
						filetools.makeDir(dirPath);
						if (dirAttr) filetools.fs.chmodSync(dirPath, dirAttr);
						filetools.fs.utimesSync(dirPath, entry.header.time, entry.header.time);
					} catch (er) {
						callback(getError("Unable to create folder", dirPath));
					}
				}
				fileEntries.reverse().reduce(function(next, entry) {
					return function(err) {
						if (err) next(err);
						else {
							const entryName = pth.normalize(canonical(entry.entryName));
							const filePath = sanitize(targetPath, entryName);
							entry.getDataAsync(function(content, err_1) {
								if (err_1) next(err_1);
								else if (!content) next(Utils.Errors.CANT_EXTRACT_FILE());
								else {
									const fileAttr = keepOriginalPermission ? entry.header.fileAttr : void 0;
									filetools.writeFileToAsync(filePath, content, overwrite, fileAttr, function(succ) {
										if (!succ) next(getError("Unable to write file", filePath));
										filetools.fs.utimes(filePath, entry.header.time, entry.header.time, function(err_2) {
											if (err_2) next(getError("Unable to set times", filePath));
											else next();
										});
									});
								}
							});
						}
					};
				}, callback)();
			},
			writeZip: function(targetFileName, callback) {
				if (arguments.length === 1) {
					if (typeof targetFileName === "function") {
						callback = targetFileName;
						targetFileName = "";
					}
				}
				if (!targetFileName && opts.filename) targetFileName = opts.filename;
				if (!targetFileName) return;
				var zipData = _zip.compressToBuffer();
				if (zipData) {
					var ok = filetools.writeFileTo(targetFileName, zipData, true);
					if (typeof callback === "function") callback(!ok ? /* @__PURE__ */ new Error("failed") : null, "");
				}
			},
			writeZipPromise: function(targetFileName, props) {
				const { overwrite, perm } = Object.assign({ overwrite: true }, props);
				return new Promise((resolve, reject) => {
					if (!targetFileName && opts.filename) targetFileName = opts.filename;
					if (!targetFileName) reject("ADM-ZIP: ZIP File Name Missing");
					this.toBufferPromise().then((zipData) => {
						const ret = (done) => done ? resolve(done) : reject("ADM-ZIP: Wasn't able to write zip file");
						filetools.writeFileToAsync(targetFileName, zipData, overwrite, perm, ret);
					}, reject);
				});
			},
			toBufferPromise: function() {
				return new Promise((resolve, reject) => {
					_zip.toAsyncBuffer(resolve, reject);
				});
			},
			toBuffer: function(onSuccess, onFail, onItemStart, onItemEnd) {
				if (typeof onSuccess === "function") {
					_zip.toAsyncBuffer(onSuccess, onFail, onItemStart, onItemEnd);
					return null;
				}
				return _zip.compressToBuffer();
			}
		};
	};
}));
//#endregion
Object.defineProperty(exports, "require_adm_zip", {
	enumerable: true,
	get: function() {
		return require_adm_zip;
	}
});
