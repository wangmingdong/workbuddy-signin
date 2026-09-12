import { o as __toCommonJS, t as __commonJSMin } from "./chunk-BRZcfu7K.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_react_dom } from "./react-dom-IYSM6kDg.js";
import { t as require_classnames } from "./classnames-BYn3_ESJ.js";
import { m as tslib_es6_exports, p as init_tslib_es6 } from "./tslib.es6-8NkKEYUK.js";
import { n as init_esm, t as esm_exports } from "./esm-mgJiqgJI.js";
import { r as memoize_one_esm_exports, t as init_memoize_one_esm } from "./memoize-one.esm-vG75mWtZ.js";
import { r as require_assignWith, t as require_set } from "./set-CN3NcsdP.js";
import { n as require_i18next, t as require_i18nextBrowserLanguageDetector } from "./i18nextBrowserLanguageDetector-Bv7nntNh.js";
//#region ../../node_modules/@tencent/xtable-common/node_modules/@tencent/dui/lib/common/version.js
var require_version = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = "1.7.3-beta-enterprise.64";
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-common/node_modules/@tencent/dui/lib/common/attribute.js
var require_attribute = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = "data-dui-" + (init_tslib_es6(), __toCommonJS(tslib_es6_exports)).__importDefault(require_version()).default.replace(/\./g, "-");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-common/node_modules/@tencent/dui/lib/utils/helper.js
var require_helper = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.createContextValueGetter = exports.shallowEqual = exports.isBrowser = exports.isDom = exports.wrapWithConfigDefaults = exports.inject = exports.assert = exports.isIE = exports.createStringParamFunc = exports.canBeDivided = exports.roundByStep = exports.castInto = exports.nullFn = exports.trueFn = exports.falseFn = exports.emptyFn = void 0;
	var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
	var memoize_one_1 = tslib_1.__importDefault((init_memoize_one_esm(), __toCommonJS(memoize_one_esm_exports)));
	function emptyFn() {}
	exports.emptyFn = emptyFn;
	function falseFn() {
		return false;
	}
	exports.falseFn = falseFn;
	function trueFn() {
		return true;
	}
	exports.trueFn = trueFn;
	function nullFn() {
		return null;
	}
	exports.nullFn = nullFn;
	function castInto(value, targetRange) {
		if (value > targetRange[1]) return targetRange[1];
		if (value < targetRange[0]) return targetRange[0];
		return value;
	}
	exports.castInto = castInto;
	function roundByStep(value, step) {
		if (value < 0) return -roundByStep(-value, step);
		var diff = value % step;
		if (diff < step / 2) return value - diff;
		else return value - diff + step;
	}
	exports.roundByStep = roundByStep;
	function canBeDivided(dividend, divisor) {
		var divideResult = dividend / divisor;
		return divideResult >> 0 === divideResult;
	}
	exports.canBeDivided = canBeDivided;
	function createStringParamFunc(numberParamFunc) {
		return function() {
			var stringValues = [];
			for (var _i = 0; _i < arguments.length; _i++) stringValues[_i] = arguments[_i];
			var numberValues = stringValues.map(function(str) {
				return Number(str);
			});
			return numberParamFunc.apply(void 0, numberValues);
		};
	}
	exports.createStringParamFunc = createStringParamFunc;
	var isIEBrowser;
	function isIE() {
		if (typeof isIEBrowser === "boolean") return isIEBrowser;
		var ua = navigator.userAgent;
		if (/compatible/.test(ua) && /MSIE/.test(ua)) isIEBrowser = true;
		else if (/Trident/.test(ua) && /rv:11\.0/.test(ua)) isIEBrowser = true;
		else isIEBrowser = false;
		return isIEBrowser;
	}
	exports.isIE = isIE;
	function assert(condition, errorMessage) {
		if (!condition) console.error(errorMessage);
	}
	exports.assert = assert;
	function inject(originalFn, additionalFn) {
		return function() {
			var args = [];
			for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
			var result = originalFn.apply(null, args);
			if (result !== false) additionalFn();
			return result;
		};
	}
	exports.inject = inject;
	function wrapWithConfigDefaults(originalFn) {
		var defaultConfig = {};
		function configDefaults(defaults) {
			defaultConfig = defaults;
		}
		var wrappedFn = function(passedConfig) {
			return originalFn(tslib_1.__assign(tslib_1.__assign({}, defaultConfig), passedConfig));
		};
		wrappedFn.configDefaults = configDefaults;
		return wrappedFn;
	}
	exports.wrapWithConfigDefaults = wrapWithConfigDefaults;
	function isDom(node) {
		return node && typeof node === "object" && node.nodeType === 1;
	}
	exports.isDom = isDom;
	exports.isBrowser = typeof window !== "undefined" && typeof document !== "undefined";
	function shallowEqual(paramA, paramB) {
		if (paramA === paramB) return true;
		if (typeof paramA !== typeof paramB) return false;
		if (typeof paramA !== "object" || paramA === null || typeof paramB !== "object" || paramB === null) return false;
		var keysOfA = Object.keys(paramA);
		var keysOfB = Object.keys(paramB);
		if (keysOfA.length !== keysOfB.length) return false;
		return keysOfA.every(function(key) {
			return paramA[key] === paramB[key];
		});
	}
	exports.shallowEqual = shallowEqual;
	function createContextValueGetter() {
		return memoize_one_1.default(function(context) {
			return context;
		}, function(newArgs, lastArgs) {
			return shallowEqual(newArgs[0], lastArgs[0]);
		});
	}
	exports.createContextValueGetter = createContextValueGetter;
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-common/node_modules/@tencent/dui/lib/utils/createElement.js
var require_createElement = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.h = exports.isScopedAttributeDisabled = void 0;
	var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
	var react_1 = require_react();
	var attribute_1 = tslib_1.__importDefault(require_attribute());
	var helper_1 = require_helper();
	exports.isScopedAttributeDisabled = shouldDisableScopedAttribute();
	if (helper_1.isBrowser) window.__dui_disable_auto_focus_map__ = window.__dui_disable_auto_focus_map__ || {};
	function h(type, props) {
		var children = [];
		for (var _i = 2; _i < arguments.length; _i++) children[_i - 2] = arguments[_i];
		var mergedProps = props;
		if ((props === null || props === void 0 ? void 0 : props.className) && typeof type === "string" && !exports.isScopedAttributeDisabled) mergedProps[attribute_1.default] = props.className;
		return react_1.createElement.apply(void 0, tslib_1.__spreadArray([type, mergedProps], children));
	}
	exports.h = h;
	function shouldDisableScopedAttribute() {
		var windowDisable;
		if (typeof window === "object") windowDisable = window.__dui_disable_scoped_attribute__;
		var globalDisable;
		if (typeof globalThis === "object") globalDisable = globalThis.__dui_disable_scoped_attribute__;
		return Boolean(windowDisable || globalDisable);
	}
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-common/node_modules/@tencent/dui/lib/utils/keepDom.js
var require_keepDom = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.decideKeepDom = void 0;
	function decideKeepDom(animationDuration, visible) {
		var _this = this;
		var willLeave = !visible && this._ALC_HELPER_prevVisible;
		this._ALC_HELPER_prevVisible = visible;
		if (visible) return true;
		if (!willLeave) return false;
		setTimeout(function() {
			_this.forceUpdate();
		}, animationDuration);
		return true;
	}
	exports.decideKeepDom = decideKeepDom;
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-common/node_modules/@tencent/dui/lib/utils/style.js
var require_style = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.injectStyle = void 0;
	var version_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports)).__importDefault(require_version());
	var createElement_1 = require_createElement();
	var helper_1 = require_helper();
	var bundledBy = "1";
	var styleRegistryManage = new (function() {
		function StyleRegistryManage() {
			var globalObj = helper_1.isBrowser ? window : globalThis;
			globalObj.__dui_style_registry__ = globalObj.__dui_style_registry__ || {};
			this.registry = globalObj.__dui_style_registry__;
		}
		Object.defineProperty(StyleRegistryManage.prototype, "length", {
			get: function() {
				return Object.keys(this.registry).length;
			},
			enumerable: false,
			configurable: true
		});
		StyleRegistryManage.prototype.set = function(key, bundledsBy) {
			this.registry[key] = bundledsBy;
		};
		StyleRegistryManage.prototype.get = function(key) {
			return this.registry[key];
		};
		StyleRegistryManage.prototype.add = function(key, bundledBy) {
			if (!this.registry[key]) this.registry[key] = [];
			this.registry[key].push(bundledBy);
		};
		return StyleRegistryManage;
	}())();
	function injectStyle(fileKey, css) {
		var key = version_1.default + "-" + fileKey;
		var domKey = createElement_1.isScopedAttributeDisabled ? fileKey : key;
		var hasElement = Boolean(helper_1.isBrowser && document.querySelector("style[data-dui-key=\"" + domKey + "\"]") || !helper_1.isBrowser);
		if (Array.isArray(styleRegistryManage.get(key)) && hasElement) {
			styleRegistryManage.add(key, bundledBy);
			warnRedundantInject(key);
			return;
		}
		styleRegistryManage.set(key, [bundledBy]);
		var versions = getFileVersions(fileKey);
		if (versions.length > 1) warnMultipleVersions(fileKey, versions);
		if (helper_1.isBrowser) {
			var styleElement = document.createElement("style");
			styleElement.setAttribute("type", "text/css");
			styleElement.setAttribute("data-dui-key", domKey);
			styleElement.innerText = css;
			document.head.appendChild(styleElement);
		} else if (typeof injectContentBeforeRoot === "function") {
			var styleElement = "<style type=\"text/css\" data-dui-key=\"" + domKey + "\">" + css + "</style>";
			injectContentBeforeRoot(styleElement);
		}
	}
	exports.injectStyle = injectStyle;
	var CONSOLE_DEBOUNCE = 3e3;
	function warnRedundantInject(key) {
		if (!helper_1.isBrowser || !styleRegistryManage.length || !Array.isArray(styleRegistryManage.get(key))) return;
		var count = styleRegistryManage.get(key).length;
		setTimeout(function() {
			if (styleRegistryManage.get(key).length > count) return;
			console.warn("[DUI] " + key + " 重复引入了 " + count + " 次");
		}, CONSOLE_DEBOUNCE);
	}
	function warnMultipleVersions(fileKey, versions) {
		if (!helper_1.isBrowser) return;
		setTimeout(function() {
			if (getFileVersions(fileKey).length > versions.length) return;
			console.warn("[DUI] " + fileKey + " 存在多个版本:  " + versions.join("  "));
		}, CONSOLE_DEBOUNCE);
	}
	function getFileVersions(fileKey) {
		if (!styleRegistryManage.length) return [];
		return Object.getOwnPropertyNames(styleRegistryManage.registry).filter(function(k) {
			return k.indexOf(fileKey) !== -1;
		}).map(function(k) {
			return k.split("-")[0];
		});
	}
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-common/node_modules/@tencent/dui/lib/utils/polyfill.js
var require_polyfill = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	if (typeof String.prototype.repeat !== "function") String.prototype.repeat = function(count) {
		"use strict";
		if (this == null) throw new TypeError("can't convert " + this + " to object");
		var str = "" + this;
		count = +count;
		if (count != count) count = 0;
		if (count < 0) throw new RangeError("repeat count must be non-negative");
		if (count == Infinity) throw new RangeError("repeat count must be less than infinity");
		count = Math.floor(count);
		if (str.length == 0 || count == 0) return "";
		if (str.length * count >= 1 << 28) throw new RangeError("repeat count must not overflow maximum string size");
		var maxCount = str.length * count;
		count = Math.floor(Math.log(count) / Math.log(2));
		while (count) {
			str += str;
			count--;
		}
		str += str.substring(0, maxCount - str.length);
		return str;
	};
	if (typeof String.prototype.padStart !== "function") String.prototype.padStart = function padStart(maxLength, fillString) {
		maxLength = maxLength >> 0;
		fillString = String(typeof fillString !== "undefined" ? fillString : " ");
		if (this.length > maxLength) return String(this);
		else {
			maxLength = maxLength - this.length;
			if (maxLength > fillString.length) fillString += fillString.repeat(maxLength / fillString.length);
			return fillString.slice(0, maxLength) + String(this);
		}
	};
	if (typeof Array.prototype.fill !== "function") Array.prototype.fill = function fill(value) {
		if (this == null) throw new TypeError("this is null or not defined");
		var O = Object(this);
		var len = O.length >>> 0;
		var relativeStart = arguments[1] >> 0;
		var k = relativeStart < 0 ? Math.max(len + relativeStart, 0) : Math.min(relativeStart, len);
		var end = arguments[2];
		var relativeEnd = end === void 0 ? len : end >> 0;
		var final = relativeEnd < 0 ? Math.max(len + relativeEnd, 0) : Math.min(relativeEnd, len);
		while (k < final) {
			O[k] = value;
			k++;
		}
		return O;
	};
	if (typeof Element !== "undefined" && typeof Element.prototype.remove !== "function") Element.prototype.remove = function() {
		if (this.parentNode) this.parentNode.removeChild(this);
	};
	if (!Array.prototype.findIndex) Array.prototype.findIndex = function(predicate) {
		if (this == null) throw new TypeError("\"this\" is null or not defined");
		var o = Object(this);
		var len = o.length >>> 0;
		if (typeof predicate !== "function") throw new TypeError("predicate must be a function");
		var thisArg = arguments[1];
		var k = 0;
		while (k < len) {
			var kValue = o[k];
			if (predicate.call(thisArg, kValue, k, o)) return k;
			k++;
		}
		return -1;
	};
	if (!Array.prototype.includes) Array.prototype.includes = function(valueToFind, fromIndex) {
		if (this == null) throw new TypeError("\"this\" is null or not defined");
		var o = Object(this);
		var len = o.length >>> 0;
		if (len === 0) return false;
		var n = fromIndex | 0;
		var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
		function sameValueZero(x, y) {
			return x === y || typeof x === "number" && typeof y === "number" && isNaN(x) && isNaN(y);
		}
		while (k < len) {
			if (sameValueZero(o[k], valueToFind)) return true;
			k++;
		}
		return false;
	};
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-common/node_modules/@tencent/dui/lib/utils/theme.js
var require_theme = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.createThemedClassNames = exports.consumeTheme = void 0;
	var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
	var h = require_createElement().h;
	var React = tslib_1.__importStar(require_react());
	var classnames_1 = tslib_1.__importDefault(require_classnames());
	var docs_user_agent_1 = tslib_1.__importDefault((init_esm(), __toCommonJS(esm_exports)));
	require_polyfill();
	require_style().injectStyle("common/global.css", "[data-dui-1-7-3-beta-enterprise-64]{font-family:-apple-system,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif,TdocsUncommon}[data-dui-1-7-3-beta-enterprise-64]:focus{outline:none}");
	if (docs_user_agent_1.default.isMac && !docs_user_agent_1.default.isIPadEmulatedMac && !docs_user_agent_1.default.isFirefox) require_style().injectStyle("common/anti-alias.css", "[data-dui-1-7-3-beta-enterprise-64]{-webkit-font-smoothing:antialiased}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button\"]{font-weight:500}");
	var ThemeContext = React.createContext(null);
	function consumeTheme(renderProp) {
		return h(ThemeContext.Consumer, null, function(themeConfig) {
			return renderProp(createThemedClassNames(themeConfig));
		});
	}
	exports.consumeTheme = consumeTheme;
	function appendThemeClassNames(themeConfig, className) {
		if (!className || !themeConfig) return className;
		var currentClassList = className.split(/\s+/);
		return currentClassList.concat.apply(currentClassList, currentClassList.map(function(name) {
			return themeConfig[name];
		}).filter(function(name) {
			return name;
		})).join(" ");
	}
	function createThemedClassNames(themeConfig) {
		return function() {
			var classes = [];
			for (var _i = 0; _i < arguments.length; _i++) classes[_i] = arguments[_i];
			return appendThemeClassNames(themeConfig, classnames_1.default.apply(void 0, classes));
		};
	}
	exports.createThemedClassNames = createThemedClassNames;
	exports.default = ThemeContext;
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-common/node_modules/@tencent/dui/lib/components/Snackbar/context.js
var require_context = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ContainerContext = void 0;
	exports.ContainerContext = (init_tslib_es6(), __toCommonJS(tslib_es6_exports)).__importStar(require_react()).createContext(null);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-common/node_modules/@tencent/dui/lib/common/wording.js
var require_wording = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.translationMap = exports.languages = void 0;
	var controlKeyName = (init_tslib_es6(), __toCommonJS(tslib_es6_exports)).__importDefault((init_esm(), __toCommonJS(esm_exports))).default.isMac ? "Command" : "Ctrl";
	exports.languages = [
		"en",
		"zh-CN",
		"th",
		"vi",
		"ms",
		"tl-PH",
		"id-ID",
		"es-MX",
		"de",
		"ja",
		"zh-HK"
	];
	exports.translationMap = {
		avatar: [
			"Avatar",
			"头像",
			"รูปโปรไฟล์",
			"Ảnh hồ sơ",
			"Foto Profil",
			"Profile Photo",
			"Foto Profil",
			"Foto del perfil",
			"Profilfoto",
			"プロフィール写真",
			"頭像"
		],
		ok: [
			"OK",
			"确定",
			"ตกลง",
			"OK",
			"OK",
			"OK",
			"OK",
			"OK",
			"OK",
			"OK",
			"確定"
		],
		cancel: [
			"Cancel",
			"取消",
			"ยกเลิก",
			"Hủy",
			"Batalkan",
			"Kanselahin",
			"Batalkan",
			"Cancelar",
			"Abbrechen",
			"キャンセルする",
			"取消"
		],
		select: [
			"Select",
			"请选择",
			"โปรดเลือก",
			"Vui lòng lựa chọn",
			"Sila pilih",
			"Pumili",
			"Silakan pilih",
			"Por favor selecciona",
			"Bitte auswählen",
			"選択してください",
			"請選擇"
		],
		search: [
			"Search",
			"搜索选项",
			"ตัวเลือกการค้นหา",
			"Tùy chọn tìm kiếm",
			"Pilihan carian",
			"Mga opsyon sa paghahanap",
			"Opsi penelusuran",
			"Buscar opciones",
			"Options-Suche",
			"検索オプション",
			"搜尋選項"
		],
		hour: [
			"H",
			"时",
			"h",
			"giờ",
			"h",
			"h",
			"h",
			"h",
			"h",
			"時",
			"時"
		],
		minute: [
			"M",
			"分",
			"m",
			"phút",
			"m",
			"m",
			"m",
			"m",
			"m",
			"分",
			"分"
		],
		second: [
			"S",
			"秒",
			"s",
			"giây",
			"saat",
			"s",
			"s",
			"s",
			"s",
			"秒",
			"秒"
		],
		now: [
			"Now",
			"此刻",
			"ตอนนี้",
			"Ngay bây giờ",
			"Sekarang",
			"Ngayon",
			"Sekarang",
			"Ahora",
			"Jetzt",
			"今",
			"此刻"
		],
		inputHour: [
			"Enter Hour",
			"输入小时",
			"ใส่ชั่วโมง",
			"Nhập giờ",
			"Masukkan jam",
			"Ilagay ang mga oras",
			"Masukkan jam",
			"Introducir horas",
			"Stunden eingeben",
			"時間を入力します",
			"輸入小時"
		],
		inputMinute: [
			"Enter Minute",
			"输入分",
			"ใส่นาที",
			"Nhập phút",
			"Masukkan minit",
			"Ilagay ang mga minuto",
			"Masukkan menit",
			"Introducir minutos",
			"Minuten eingeben",
			"分を入力します",
			"輸入分"
		],
		inputSecond: [
			"Enter Second",
			"输入秒",
			"ใส่วินาที",
			"Nhập giây",
			"Masukkan saat",
			"Ilagay ang mga segundo",
			"Masukkan detik",
			"Introducir segundos",
			"Sekunden eingeben",
			"秒を入力します",
			"輸入秒"
		],
		close: [
			"Close",
			"关闭",
			"ปิด",
			"Đóng",
			"Tutup",
			"Isara",
			"Tutup",
			"Cerrar",
			"Schließen",
			"閉じる",
			"關閉"
		],
		loadingFailed: [
			"Loading Failed",
			"加载失败",
			"โหลดไม่สำเร็จ",
			"Tải không thành công",
			"Memuatkan tidak berjaya",
			"Hindi matagumpay ang pag-load",
			"Gagal memuat",
			"Error al cargar",
			"Laden erfolglos",
			"読み込みに失敗しました",
			"載入失敗"
		],
		noOptions: [
			"No Options Available",
			"暂无选项",
			"ไม่มีตัวเลือกที่พร้อมใช้งาน",
			"Không có tùy chọn khả dụng",
			"Tiada pilihan tersedia",
			"Walang mga opsyon na available",
			"Tidak ada opsi tersedia",
			"No hay opciones disponibles",
			"Keine Optionen verfügbar",
			"利用可能なオプションはありません",
			"暫無選項"
		],
		copySuccessed: [
			"Copy Succeeded",
			"复制成功",
			"คัดลอกสำเร็จแล้ว",
			"Sao chép thành công",
			"Berjaya menyalin",
			"Matagumpay na nakopya",
			"Berhasil disalin",
			"Copiar con éxito",
			"Erfolgreich kopiert",
			"コピーが成功しました",
			"複製成功"
		],
		copyFailed: [
			"Copy Failed",
			"复制失败",
			"การคัดลอกล้มเหลว",
			"Sao chép không thành công",
			"Gagal menyalin",
			"Hindi nakopya",
			"Gagal menyalin",
			"Error al copiar",
			"Kopieren fehlgeschlagen",
			"コピーに失敗しました",
			"複製失敗"
		],
		eyedropper: [
			"Eyedropper",
			"取色器",
			"ตัวเลือกสี",
			"Bộ chọn màu",
			"Pemilih warna",
			"Color picker",
			"Pemilih warna",
			"Selector de color",
			"Farbwähler",
			"カラーピッカー",
			"取色器"
		],
		eyedropperFailedBrowser: [
			"Eyedropper is not supported by this browser. Please open it in Chrome",
			"取色器暂不支持本浏览器, 请在 Chrome 中使用",
			"ขณะนี้เบราว์เซอร์นี้ไม่รองรับตัวเลือกสี โปรดใช้ใน Chrome",
			"Bộ chọn màu không được hỗ trợ trong trình duyệt này, vui lòng sử dụng Chrome",
			"Pemilih warna tidak disokong dalam pelayar ini pada masa ini, sila gunakannya dalam Chrome",
			"Ang color picker ay kasalukuyang hindi sinusuportahan sa browser na ito, mangyaring gamitin ito sa Chrome",
			"Pemilih warna saat ini tidak didukung di browser ini, silakan gunakan di Chrome",
			"El selector de color no es compatible actualmente con este navegador, utilícelo en Chrome",
			"Der Farbwähler wird in diesem Browser derzeit nicht unterstützt, bitte verwenden Sie ihn in Chrome",
			"カラーピッカーは現在このブラウザではサポートされていません。Chromeで使用してください",
			"取色器暫不支援本瀏覽器，請在Chrome中使用"
		],
		zoomIn: [
			"Zoom In",
			"放大",
			"ซูมเข้า",
			"Phóng to",
			"Zum masuk",
			"Mag-zoom in",
			"Perbesar",
			"Acercar",
			"Zoomen Sie herein",
			"ズームイン",
			"放大"
		],
		zoomOut: [
			"Zoom Out",
			"缩小",
			"ซูมออก",
			"Thu nhỏ",
			"Zum keluar",
			"Mag-zoom out",
			"Perkecil",
			"Alejar",
			"Zoomen Sie heraus",
			"ズームアウト",
			"縮小"
		],
		fitScreen: [
			"Fit to Screen",
			"适应屏幕",
			"ปรับให้พอดีกับหน้าจอ",
			"Vừa màn hình",
			"Muat pada skrin",
			"I-fit sa screen",
			"Sesuaikan dengan layar",
			"Ajustar a la pantalla",
			"An Bildschirm anpassen",
			"画面に合わせます",
			"適應螢幕"
		],
		actualSize: [
			"Full Image",
			"原图",
			"ภาพเต็ม",
			"Hình ảnh đầy đủ",
			"Imej penuh",
			"Buong larawan",
			"Gambar penuh",
			"Imagen Completa",
			"Volles Bild",
			"フルイメージ",
			"原圖"
		],
		download: [
			"Download",
			"下载",
			"ดาวน์โหลด",
			"Tải xuống",
			"Muat Turun",
			"I-download",
			"Unduh",
			"Descargar",
			"Herunterladen",
			"ダウンロード",
			"下載"
		],
		monthPostfix: [
			"",
			"月",
			"เดือน",
			"Tháng",
			"Bulan",
			"Buwan",
			"Bulan",
			"Mes",
			"Monat",
			"月",
			"月"
		],
		name: exports.languages,
		today: [
			"Today",
			"今天",
			"วันนี้",
			"Hôm nay",
			"Hari ini",
			"Ngayong araw",
			"Hari ini",
			"Hoy",
			"Heute",
			"今日",
			"今天"
		],
		backToToday: [
			"Back to Today",
			"返回今天",
			"ย้อนกลับไปยังวันนี้",
			"Quay lại hôm nay",
			"Kembali ke hari ini",
			"Bumalik sa ngayon",
			"Kembali ke hari ini",
			"Volver a hoy",
			"Zum heutigen Tag zurückkehren",
			"今日に戻ります",
			"返回今天"
		],
		timeSelect: [
			"Select Time",
			"选择时间",
			"เลือกเวลา",
			"Chọn thời gian",
			"Pilih masa",
			"Piliin ang oras",
			"Pilih waktu",
			"Seleccionar hora",
			"Zeit auswählen",
			"時間を選択します",
			"選擇時間"
		],
		dateSelect: [
			"Select Date",
			"选择日期",
			"เลือกวันที่",
			"Chọn ngày",
			"Pilih tarikh",
			"Pumili ng petsa",
			"Pilih tanggal",
			"Seleccionar fecha",
			"Datum auswählen",
			"日付を選択してください",
			"選擇日期"
		],
		weekSelect: [
			"Select Week",
			"选择周",
			"เลือกสัปดาห์",
			"Chọn tuần",
			"Pilih minggu",
			"Piliin ang linggo",
			"Pilih minggu",
			"Seleccionar semana",
			"Woche wählen",
			"週を選択します",
			"選擇週"
		],
		clear: [
			"Clear",
			"清除",
			"ล้าง",
			"Xóa",
			"Kosongkan",
			"I-clear",
			"Bersihkan",
			"Borrar",
			"Löschen",
			"削除します",
			"清除"
		],
		month: [
			"Month",
			"月",
			"เดือน",
			"Tháng",
			"Bulan",
			"Buwan",
			"Bulan",
			"Mes",
			"Monat",
			"月",
			"月"
		],
		year: [
			"Year",
			"年",
			"ปี",
			"Năm",
			"Tahun",
			"Taon",
			"Tahun",
			"Año",
			"Jahr",
			"年",
			"年"
		],
		previousMonth: [
			"Previous month (PageUp)",
			"上个月 (翻页上键)",
			"เดือนที่แล้ว (ปุ่ม Page Up)",
			"Tháng trước (Phím Page Up)",
			"Bulan lepas (kekunci Halaman Atas)",
			"Nakaraang buwan (Page Up key)",
			"Bulan lalu (tombol Page Up)",
			"Último mes (Tecla Previa página)",
			"Letzter Monat (Taste Seite hoch)",
			"先月（PageUp キー）",
			"上個月（翻頁上鍵）"
		],
		nextMonth: [
			"Next month (PageDown)",
			"下个月 (翻页下键)",
			"เดือนถัดไป (ปุ่ม Page Down)",
			"Tháng sau (Phím Page Down)",
			"Bulan depan (kekunci Halaman Bawah)",
			"Susunod na buwan (Page Down key)",
			"Bulan berikutnya (tombol Page Down)",
			"Siguiente Mes (Tecla Siguiente página)",
			"Nächster Monat (Taste Bild ab)",
			"翌月（PageDown キー）",
			"下個月（翻頁下鍵）"
		],
		monthSelect: [
			"Select Month",
			"选择月份",
			"เลือกเดือน",
			"Chọn tháng",
			"Pilih bulan",
			"Piliin ang buwan",
			"Pilih bulan",
			"Seleccionar mes",
			"Monat auswählen",
			"月を選択",
			"選擇月份"
		],
		yearSelect: [
			"Select Year",
			"选择年份",
			"เลือกปี",
			"Chọn năm",
			"Pilih tahun",
			"Piliin ang taon",
			"Pilih tahun",
			"Seleccionar año",
			"Jahr wählen",
			"年を選択します",
			"選擇年份"
		],
		decadeSelect: [
			"Select Decade",
			"选择年代",
			"เลือกทศวรรษ",
			"Chọn một thập kỷ",
			"Pilih satu dekad",
			"Pumili ng dekada",
			"Pilih dekade",
			"Seleccionar una década",
			"Wählen Sie ein Jahrzehnt",
			"10年を選択します",
			"選擇年代"
		],
		yearFormat: [
			"YYYY",
			"YYYY年",
			"YYYY",
			"YYYY",
			"YYYY",
			"YYYY",
			"YYYY",
			"YYYY",
			"YYYY",
			"YYYY",
			"YYYY年"
		],
		monthFormat: [
			"M",
			"M月",
			"M",
			"M",
			"M",
			"M",
			"M",
			"M",
			"M",
			"M",
			"M月"
		],
		dayFormat: [
			"D",
			"D日",
			"D",
			"D",
			"D",
			"D",
			"D",
			"D",
			"D",
			"D",
			"D日"
		],
		dateFormat: [
			"M/D/YYYY",
			"YYYY年M月D日",
			"DD/MM/YYYY",
			"DD/MM/YYYY",
			"DD/MM/YYYY",
			"DD/MM/YYYY",
			"DD/MM/YYYY",
			"DD/MM/YYYY",
			"DD/MM/YYYY",
			"YYYY/MM/DD",
			"YYYY年M月D日"
		],
		dateTimeFormat: [
			"M/D/YYYY HH:mm:ss",
			"YYYY年M月D日 HH时mm分ss秒",
			"DD/MM/YYYY HH:mm:ss",
			"DD/MM/YYYY HH:mm:ss",
			"DD/MM/YYYY HH:mm:ss",
			"DD/MM/YYYY HH:mm:ss",
			"DD/MM/YYYY HH:mm:ss",
			"DD/MM/YYYY HH:mm:ss",
			"DD/MM/YYYY HH:mm:ss",
			"YYYY/MM/DD HH:mm:ss",
			"YYYY年M月D日 HH時mm分ss秒"
		],
		monthBeforeYear: [
			"true",
			"",
			"true",
			"true",
			"true",
			"true",
			"true",
			"true",
			"true",
			"",
			""
		],
		previousYear: [
			"Previous Year (" + controlKeyName + " + Left)",
			"上一年 (" + controlKeyName + "键加左方向键)",
			"ปีก่อนหน้า (ปุ่ม " + controlKeyName + " + ปุ่มลูกศรซ้าย)",
			"Năm trước (phím " + controlKeyName + " + phím Mũi tên Trái)",
			"Tahun sebelumnya (" + controlKeyName + " kekunci + Kekunci Anak Panah Kiri)",
			"Nakaraang taon (" + controlKeyName + " key + Left Arrow key)",
			"Tahun sebelumnya (tombol " + controlKeyName + " + tombol Panah Kiri)",
			"Año anterior (" + controlKeyName + " tecla + tecla de flecha izquierda)",
			"Vorheriges Jahr (" + controlKeyName + "Taste + Linke Pfeiltaste)",
			"前年（" + controlKeyName + "キー + 左矢印キー）",
			"上一年 (" + controlKeyName + "鍵加左方向鍵)"
		],
		nextYear: [
			"Next Year (" + controlKeyName + " + Right)",
			"下一年 (" + controlKeyName + "键加右方向键)",
			"ปีถัดไป (ปุ่ม " + controlKeyName + " + ปุ่มลูกศรขวา)",
			"Năm sau (phím " + controlKeyName + " + phím Mũi tên Phải)",
			"Tahun depan (" + controlKeyName + " kekunci + Kekunci Anak Panah Kanan)",
			"Susunod na taon (" + controlKeyName + " key + Right Arrow key)",
			"Tahun berikutnya (tombol " + controlKeyName + " + tombol Panah Kanan)",
			"Año siguiente (" + controlKeyName + " tecla + tecla de flecha derecha)",
			"Nächstes Jahr (" + controlKeyName + "Taste + Rechte Pfeiltaste)",
			"翌年（" + controlKeyName + "キー + 右矢印キー）",
			"下一年 (" + controlKeyName + "鍵加右方向鍵)"
		],
		previousDecade: [
			"Previous Decade",
			"上一年代",
			"ทศวรรษก่อนหน้า",
			"Thập kỷ trước",
			"Dekad sebelumnya",
			"Nakaraang dekada",
			"Dekade sebelumnya",
			"Década anterior",
			"Vorheriges Jahrzehnt",
			"前の10年",
			"上一年代"
		],
		nextDecade: [
			"Next Decade",
			"下一年代",
			"ทศวรรษหน้า",
			"Thập kỷ tiếp theo",
			"Dekad depan",
			"Susunod na dekada",
			"Dekade selanjutnya",
			"Década siguiente",
			"Nächstes Jahrzehnt",
			"次の10年",
			"下一年代"
		],
		previousCentury: [
			"Previous Century",
			"上一世纪",
			"ศตวรรษก่อนหน้า",
			"Thế kỷ trước",
			"Abad sebelumnya",
			"Nakaraang siglo",
			"Abad sebelumnya",
			"Siglo anterior",
			"Vorheriges Jahrhundert",
			"前の世紀",
			"上一世紀"
		],
		nextCentury: [
			"Next Century",
			"下一世纪",
			"ศตวรรษหน้า",
			"Thế kỷ tiếp theo",
			"Abad depan",
			"Susunod na siglo",
			"Abad selanjutnya",
			"Siglo siguiente",
			"Nächstes Jahrhundert",
			"次の世紀",
			"下一世紀"
		],
		time: [
			"Time",
			"时间",
			"เวลา",
			"Thời gian",
			"Masa",
			"Oras",
			"Waktu",
			"Hora",
			"Zeit",
			"時間",
			"時間"
		]
	};
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-common/node_modules/@tencent/dui/lib/common/locale.js
var require_locale = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.i18n = exports.i18nInstance = void 0;
	var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
	var assignWith_1 = tslib_1.__importDefault(require_assignWith());
	var set_1 = tslib_1.__importDefault(require_set());
	var i18next_1 = tslib_1.__importDefault(require_i18next());
	var i18next_browser_languagedetector_1 = tslib_1.__importDefault(require_i18nextBrowserLanguageDetector());
	var wording_1 = require_wording();
	var detector = new i18next_browser_languagedetector_1.default();
	if (!(typeof window === "undefined")) detector.addDetector({
		name: "userAgent",
		lookup: function() {
			var match = navigator.userAgent.match(/language\/([a-zA-Z'-_]+)/i);
			if (match) return match[1].replace("_", "-");
		}
	});
	var resources = {};
	wording_1.languages.forEach(function(lang, index) {
		var translation = assignWith_1.default({}, wording_1.translationMap, function(objectValue, sourceValue) {
			return sourceValue[index];
		});
		set_1.default(resources, [lang, "translation"], translation);
	});
	exports.i18nInstance = i18next_1.default.createInstance();
	exports.i18nInstance.use(detector).init({
		resources,
		fallbackLng: {
			"zh-TW": ["zh-HK", "zh-CN"],
			fil: ["tl-PH"],
			id: ["id-ID"],
			es: ["es-MX"],
			default: ["zh-CN"]
		},
		detection: {
			order: [
				"querystring",
				"userAgent",
				"cookie"
			],
			lookupCookie: "language",
			caches: []
		}
	});
	function i18n(key) {
		return exports.i18nInstance.t(key);
	}
	exports.i18n = i18n;
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-common/node_modules/@tencent/dui/lib/utils/show.js
var require_show = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.showWithTransition = void 0;
	var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
	var h = require_createElement().h;
	var react_dom_1 = tslib_1.__importDefault(require_react_dom());
	var helper_1 = require_helper();
	function showWithTransition(_a) {
		var Component = _a.Component, transitionDuration = _a.transitionDuration, autoClose = _a.autoClose, props = _a.props, forcedProps = _a.forcedProps, _b = _a.injectClosePropNames, injectClosePropNames = _b === void 0 ? [] : _b, _c = _a.deepInjectClose, deepInjectClose = _c === void 0 ? [] : _c, contexts = _a.contexts;
		var div = document.createElement("div");
		document.body.appendChild(div);
		var timer;
		var closed = false;
		injectClosePropNames.forEach(function(key) {
			overrideSingle(props, key);
		});
		deepInjectClose.forEach(function(_a) {
			var reference = _a[0], key = _a[1];
			if (Array.isArray(reference)) {
				reference.forEach(function(obj) {
					return overrideSingle(obj, key);
				});
				return;
			}
			overrideSingle(reference, key);
		});
		var currentProps = tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, props), forcedProps), { visible: true });
		function overrideSingle(obj, key) {
			var originalValue = obj[key] || helper_1.emptyFn;
			obj[key] = helper_1.inject(originalValue, close);
		}
		function update(newProps) {
			if (closed) return;
			currentProps = tslib_1.__assign(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, currentProps), newProps), forcedProps), { visible: true });
			render(currentProps);
		}
		function close() {
			if (closed) return;
			closed = true;
			clearTimeout(timer);
			currentProps = tslib_1.__assign(tslib_1.__assign({}, currentProps), { visible: false });
			render(currentProps);
			setTimeout(function() {
				react_dom_1.default.unmountComponentAtNode(div);
				div.remove();
			}, transitionDuration + 20);
		}
		function render(props) {
			var element = (contexts === null || contexts === void 0 ? void 0 : contexts.length) ? composeContexts(contexts, h(Component, tslib_1.__assign({}, props))) : h(Component, tslib_1.__assign({}, props));
			react_dom_1.default.render(element, div);
		}
		render(currentProps);
		if (autoClose) timer = setTimeout(close, props.duration || 2e3);
		return {
			update,
			close
		};
	}
	exports.showWithTransition = showWithTransition;
	function composeContexts(contexts, children) {
		return contexts.reduce(function(child, _a) {
			var Provider = _a.provider, value = _a.value;
			return h(Provider, { value }, child);
		}, children);
	}
}));
//#endregion
export { require_style as a, require_helper as c, require_theme as i, require_locale as n, require_keepDom as o, require_context as r, require_createElement as s, require_show as t };
