import { o as __toCommonJS, t as __commonJSMin } from "./chunk-BRZcfu7K.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_react_dom } from "./react-dom-IYSM6kDg.js";
import { m as tslib_es6_exports, p as init_tslib_es6 } from "./tslib.es6-8NkKEYUK.js";
import { n as init_esm, t as esm_exports } from "./esm-mgJiqgJI.js";
import { r as require_assignWith, t as require_set } from "./set-CN3NcsdP.js";
import { n as require_i18next, t as require_i18nextBrowserLanguageDetector } from "./i18nextBrowserLanguageDetector-Bv7nntNh.js";
import { a as require_keepDom, i as require_style, n as require_show, o as require_helper, r as require_theme, s as require_createElement, t as require_preventScrollPenetrate } from "./preventScrollPenetrate-D7xvP-pE.js";
import { t as require_Button } from "./Button-CoSiBNM5.js";
//#region ../../node_modules/@tencent/dui-mobile/lib/common/wording.js
var require_wording = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.translationMap = exports.languages = void 0;
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
			"搜索",
			"ค้นหา",
			"Tìm kiếm",
			"Cari",
			"Paghahanap",
			"Mencari",
			"Buscar",
			"Suchen",
			"検索",
			"搜尋"
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
		title: [
			"Title",
			"标题",
			"ชื่อเรื่อง",
			"Tiêu đề",
			"Tajuk",
			"Pamagat",
			"Gelar",
			"Título",
			"Titel",
			"タイトル",
			"標題"
		],
		done: [
			"Done",
			"完成",
			"เสร็จสิ้น",
			"Hoàn thành",
			"Selesai",
			"Tapos na",
			"Selesai",
			"Listo",
			"Erledigt",
			"完了",
			"完成"
		],
		saveImage: [
			"Save Image",
			"保存图片",
			"บันทึกรูปภาพ",
			"Lưu ảnh",
			"Simpan foto",
			"I-save ang larawan",
			"Simpan foto",
			"Guadar foto",
			"Foto speichern",
			"写真を保存する",
			"儲存圖片"
		],
		saveImageSucceeded: [
			"Saving Image Succeeded",
			"保存图片成功",
			"บันทึกภาพสำเร็จแล้ว",
			"Hình ảnh đã được lưu thành công",
			"Gambar berjaya disimpan",
			"Matagumpay na na-save ang larawan",
			"Sukses menyimpan gambar",
			"Imagen guardada con éxito",
			"Bild erfolgreich gespeichert",
			"画像は保存されました",
			"儲存圖片成功"
		],
		saveImageFailed: [
			"Saving Image Failed",
			"保存图片失败",
			"การบันทึกภาพล้มเหลว",
			"Không thể lưu hình ảnh",
			"Gagal menyimpan gambar",
			"Nabigong i-save ang larawan",
			"Gagal menyimpan gambar",
			"Error al guardar la imagen",
			"Bild konnte nicht gespeichert werden",
			"画像の保存に失敗しました",
			"儲存圖片失敗"
		],
		yearPostfix: [
			"",
			"年",
			"",
			"",
			"",
			"",
			"",
			"",
			"",
			"",
			"年"
		],
		monthPostfix: [
			"",
			"月",
			"",
			"",
			"",
			"",
			"",
			"",
			"",
			"",
			"月"
		],
		dayPostfix: [
			"",
			"日",
			"",
			"",
			"",
			"",
			"",
			"",
			"",
			"",
			"日"
		],
		hourPosfix: [
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
		minutePostfix: [
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
		secondPostfix: [
			"S",
			"秒",
			"s",
			"giây",
			"s",
			"s",
			"s",
			"s",
			"s",
			"秒",
			"秒"
		],
		yearMonthFormat: [
			"MM/YYYY",
			"YYYY年 M月",
			"MM/YYYY",
			"MM/YYYY",
			"MM/YYYY",
			"MM/YYYY",
			"MM/YYYY",
			"MM/YYYY",
			"MM/YYYY",
			"YYYY/MM",
			"YYYY年 M月"
		]
	};
}));
//#endregion
//#region ../../node_modules/@tencent/dui-mobile/lib/common/locale.js
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
				"cookie",
				"navigator"
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
//#region ../../node_modules/@tencent/dui-mobile/lib/utils/stylusAdapter.js
var require_stylusAdapter = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.WithStylusClick = exports.StylusAdapter = void 0;
	var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
	var react_1 = tslib_1.__importDefault(require_react());
	var docs_user_agent_1 = tslib_1.__importDefault((init_esm(), __toCommonJS(esm_exports)));
	var TouchType;
	(function(TouchType) {
		TouchType["direct"] = "direct";
		TouchType["stylus"] = "stylus";
	})(TouchType || (TouchType = {}));
	var StylusAdapter = function() {
		function StylusAdapter() {}
		StylusAdapter.supportStylus = function(event, callback) {
			if (!this.isIPadStylusTouch(event)) return;
			if (event.nativeEvent.type === "touchstart") {
				this.startPos = [event.changedTouches[0].clientX, event.changedTouches[0].clientY];
				return;
			}
			if (event.nativeEvent.type === "touchend") {
				var endPos = [event.changedTouches[0].clientX, event.changedTouches[0].clientY];
				if (this.isEqualPos(this.startPos, endPos) && callback) callback();
				event.preventDefault();
			}
		};
		StylusAdapter.startPos = [0, 0];
		StylusAdapter.isIPadStylusTouch = function(event) {
			return docs_user_agent_1.default.isIPad && event.changedTouches[0] && event.changedTouches[0].touchType === TouchType.stylus;
		};
		StylusAdapter.isEqualPos = function(pos1, pos2) {
			return Math.abs(pos1[0] - pos2[0]) < 10 && Math.abs(pos1[1] - pos2[1]) < 10;
		};
		return StylusAdapter;
	}();
	exports.StylusAdapter = StylusAdapter;
	exports.WithStylusClick = function(_a) {
		var children = _a.children, clickHandler = _a.clickHandler;
		return react_1.default.cloneElement(children, {
			onClick: clickHandler,
			onTouchStart: function(e) {
				return StylusAdapter.supportStylus(e, clickHandler);
			},
			onTouchEnd: function(e) {
				return StylusAdapter.supportStylus(e, clickHandler);
			}
		});
	};
}));
//#endregion
//#region ../../node_modules/@tencent/dui-mobile/lib/components/Modal/Modal.js
var require_Modal$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.MODAL_TRANSITION_DURATION = void 0;
	var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
	var h = require_createElement().h;
	var React = tslib_1.__importStar(require_react());
	var react_dom_1 = tslib_1.__importDefault(require_react_dom());
	var helper_1 = require_helper();
	var index_1 = tslib_1.__importDefault(require_Button());
	var keepDom_1 = require_keepDom();
	var theme_1 = require_theme();
	var preventScrollPenetrate_1 = require_preventScrollPenetrate();
	var stylusAdapter_1 = require_stylusAdapter();
	var locale_1 = require_locale();
	exports.MODAL_TRANSITION_DURATION = 200;
	var Modal = function(_super) {
		tslib_1.__extends(Modal, _super);
		function Modal() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.handleCancel = function(e) {
				_this.props.onCancel(e);
			};
			_this.handleOk = function(e) {
				var _a = _this.props, okDisabled = _a.okDisabled, onOk = _a.onOk;
				if (okDisabled) return;
				onOk(e);
			};
			_this.handleClose = function(e) {
				var _a = _this.props, onClose = _a.onClose, onCancel = _a.onCancel;
				(onClose || onCancel)(e);
			};
			_this.handleMaskClick = function(e) {
				var _a = _this.props, maskClosable = _a.maskClosable, onClickMask = _a.onClickMask;
				if (maskClosable === true) _this.handleClose(e);
				onClickMask(e);
			};
			_this.handleModalClick = function(e) {
				e.stopPropagation();
			};
			_this.themedRender = function(classNames) {
				var _a, _b;
				var _c = _this.props, prefixCls = _c.prefixCls, className = _c.className, style = _c.style, title = _c.title, content = _c.content, visible = _c.visible, closable = _c.closable, mask = _c.mask, children = _c.children, destroyOnClose = _c.destroyOnClose, maskStyle = _c.maskStyle, zIndex = _c.zIndex, titleAlignment = _c.titleAlignment, testId = _c.testId, containerDom = _c.containerDom, disablePreventScroll = _c.disablePreventScroll;
				var classes = classNames(prefixCls, className, (_a = {}, _a[prefixCls + "-hidden"] = !visible, _a[prefixCls + "-no-mask"] = !mask, _a));
				var maskClasses = classNames(prefixCls + "-mask", (_b = {}, _b[prefixCls + "-mask-display"] = mask, _b[prefixCls + "-mask-hidden"] = !visible, _b));
				var titleClasses = classNames(prefixCls + "-title", prefixCls + "-title-" + titleAlignment);
				if (destroyOnClose && !keepDom_1.decideKeepDom.call(_this, exports.MODAL_TRANSITION_DURATION, visible)) return null;
				return react_dom_1.default.createPortal(h(preventScrollPenetrate_1.PreventScrollPenetrateContainer, {
					className: maskClasses,
					style: tslib_1.__assign({ zIndex }, maskStyle),
					onClick: _this.handleMaskClick,
					disabled: disablePreventScroll
				}, h("div", {
					className: classes,
					style: tslib_1.__assign({ overflow: "initial" }, style),
					onClick: _this.handleModalClick,
					"data-testid": testId
				}, title ? h("div", { className: titleClasses }, title) : null, h("div", { className: classNames(prefixCls + "-content") }, content || children), _this.renderFooter(classNames), closable ? h(stylusAdapter_1.WithStylusClick, { clickHandler: _this.handleClose }, h("div", { className: classNames(prefixCls + "-close") })) : null)), containerDom || document.body);
			};
			return _this;
		}
		Modal.prototype.render = function() {
			return theme_1.consumeTheme(this.themedRender);
		};
		Modal.prototype.renderFooter = function(classNames) {
			var _a = this.props, prefixCls = _a.prefixCls, footer = _a.footer, okText = _a.okText, cancelText = _a.cancelText, actions = _a.actions, okStyle = _a.okStyle, cancelStyle = _a.cancelStyle, footerType = _a.footerType, okButtonType = _a.okButtonType, okDisabled = _a.okDisabled;
			if (footer === null) return null;
			if (footer) return footer;
			if (actions) return h("div", { className: classNames(prefixCls + "-actions") }, actions.map(function(a, index) {
				return h(stylusAdapter_1.WithStylusClick, {
					clickHandler: a.onClick,
					key: index
				}, h(index_1.default, null, a.text));
			}));
			var isVerticalFooter = footerType === "vertical";
			var buttonSize = isVerticalFooter ? "large" : "default";
			var okButton = h(stylusAdapter_1.WithStylusClick, { clickHandler: this.handleOk }, h(index_1.default, {
				type: okButtonType || (isVerticalFooter ? "primary" : "default"),
				style: okStyle,
				size: buttonSize,
				disabled: okDisabled
			}, okText));
			var cancelButton = cancelText ? h(stylusAdapter_1.WithStylusClick, { clickHandler: this.handleCancel }, h(index_1.default, {
				type: isVerticalFooter ? "plain" : "default",
				style: cancelStyle,
				size: buttonSize
			}, cancelText)) : null;
			return h("div", { className: classNames(isVerticalFooter ? prefixCls + "-footer-vertical" : prefixCls + "-footer") }, cancelButton, okButton);
		};
		return Modal;
	}(React.Component);
	exports.default = Modal;
	Modal.defaultProps = {
		prefixCls: "dui-m-modal",
		title: "",
		content: "",
		footer: "",
		onCancel: helper_1.emptyFn,
		onOk: helper_1.emptyFn,
		cancelText: locale_1.i18n("cancel"),
		okText: locale_1.i18n("ok"),
		visible: false,
		mask: true,
		destroyOnClose: false,
		onClickMask: helper_1.emptyFn,
		maskClosable: false,
		titleAlignment: "center",
		footerType: "horizontal",
		closable: false
	};
}));
//#endregion
//#region ../../node_modules/@tencent/dui-mobile/lib/components/Modal/confirm.js
var require_confirm = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var Modal_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports)).__importStar(require_Modal$1());
	var show_1 = require_show();
	exports.default = require_helper().wrapWithConfigDefaults(function(config) {
		config.onClose = config.onClose || config.onCancel;
		return show_1.showWithTransition({
			Component: Modal_1.default,
			transitionDuration: Modal_1.MODAL_TRANSITION_DURATION,
			autoClose: false,
			props: config,
			forcedProps: { destroyOnClose: true },
			injectClosePropNames: [
				"onOk",
				"onCancel",
				"onClose"
			],
			deepInjectClosePaths: ["actions.onClick"],
			contexts: config.contexts
		});
	});
}));
//#endregion
//#region ../../node_modules/@tencent/dui-mobile/lib/components/Modal/index.js
var require_Modal = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Modal = void 0;
	var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
	var Modal_1 = tslib_1.__importDefault(require_Modal$1());
	exports.Modal = Modal_1.default;
	var confirm_1 = tslib_1.__importDefault(require_confirm());
	require_style().injectStyle("components/Modal/style/index.css", "@-webkit-keyframes dui-m-modal-fade-in{0%{opacity:0}to{opacity:1}}@keyframes dui-m-modal-fade-in{0%{opacity:0}to{opacity:1}}@-webkit-keyframes dui-m-modal-pop-up{0%{opacity:0;-webkit-transform:scale3d(.95,.95,1);transform:scale3d(.95,.95,1)}to{opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1)}}@keyframes dui-m-modal-pop-up{0%{opacity:0;-webkit-transform:scale3d(.95,.95,1);transform:scale3d(.95,.95,1)}to{opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1)}}[data-duim-1-9-0~=\"dui-m-modal\"]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-flow:column nowrap;flex-flow:column nowrap;-webkit-box-align:center;-webkit-align-items:center;align-items:center;width:320px;min-height:160px;padding-top:36px;-webkit-box-sizing:border-box;box-sizing:border-box;border-radius:8px;border:none;background-color:var(--bg-lv3-default,#fff);pointer-events:auto;-webkit-animation:dui-m-modal-pop-up .2s ease-out;animation:dui-m-modal-pop-up .2s ease-out;-webkit-transition:all .2s ease-out;transition:all .2s ease-out;position:relative;color:var(--text-ultrastrong,rgba(0,0,0,.9));opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1)}[data-duim-1-9-0~=\"dui-m-modal-hidden\"]{opacity:0;-webkit-transform:scale3d(.95,.95,1);transform:scale3d(.95,.95,1);pointer-events:none}[data-duim-1-9-0~=\"dui-m-modal-no-mask\"]{-webkit-box-shadow:0 8px 32px 0 rgba(0,0,0,.16);box-shadow:0 8px 32px 0 rgba(0,0,0,.16);border:1px solid var(--border-medium,rgba(0,0,0,.08));background-color:var(--bg-lv3-default,#fff)}@supports ((-webkit-backdrop-filter:blur(23px)) or (backdrop-filter:blur(23px))){[data-duim-1-9-0~=\"dui-m-modal-no-mask\"]{background-color:var(--duim-blur-minor-bg-color,hsla(0,0%,100%,.92));-webkit-backdrop-filter:blur(23px);backdrop-filter:blur(23px)}}[data-duim-1-9-0~=\"dui-m-modal-mask\"]{position:fixed;z-index:9998;top:0;left:0;right:0;bottom:0;opacity:1;pointer-events:none;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-animation:dui-m-modal-fade-in .2s linear;animation:dui-m-modal-fade-in .2s linear;-webkit-transition:all .2s linear;transition:all .2s linear}[data-duim-1-9-0~=\"dui-m-modal-mask-display\"]{pointer-events:auto;background-color:rgba(0,0,0,.3)}[data-duim-1-9-0~=\"dui-m-modal-mask-hidden\"]{opacity:0;visibility:hidden}[data-duim-1-9-0~=\"dui-m-modal-title\"]{-webkit-box-sizing:border-box;box-sizing:border-box;font-weight:500;font-size:18px;margin-bottom:16px;padding:0 24px;width:100%;line-height:22px}[data-duim-1-9-0~=\"dui-m-modal-title-center\"]{text-align:center}[data-duim-1-9-0~=\"dui-m-modal-title-left\"]{text-align:left}[data-duim-1-9-0~=\"dui-m-modal-content\"]{-webkit-box-flex:1;-webkit-flex:1;flex:1;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-flow:column nowrap;flex-flow:column nowrap;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:stretch;-webkit-align-items:stretch;align-items:stretch;-webkit-box-sizing:border-box;box-sizing:border-box;font-size:16px;line-height:24px;padding:0 24px;width:100%;margin-bottom:36px;text-align:center}[data-duim-1-9-0~=\"dui-m-modal-actions\"]>[data-duim-1-9-0~=\"dui-m-button\"],[data-duim-1-9-0~=\"dui-m-modal-footer\"]>[data-duim-1-9-0~=\"dui-m-button\"]{position:relative;display:inline-block;border:none;border-radius:0;font-size:17px;font-weight:400;color:var(--text-ultrastrong,rgba(0,0,0,.9))}[data-duim-1-9-0~=\"dui-m-modal-footer\"],[data-duim-1-9-0~=\"dui-m-modal-footer-vertical\"]{position:relative;display:-webkit-box;display:-webkit-flex;display:flex;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box;border-radius:0 0 8px 8px;overflow:hidden}[data-duim-1-9-0~=\"dui-m-modal-footer\"]{-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}[data-duim-1-9-0~=\"dui-m-modal-footer\"]:before{content:\" \";position:absolute;height:1px;width:100%;background:var(--border-medium,rgba(0,0,0,.08));-webkit-transform:scaleY(.5);transform:scaleY(.5);top:0;left:0;z-index:1}[data-duim-1-9-0~=\"dui-m-modal-footer\"]>[data-duim-1-9-0~=\"dui-m-button\"]{-webkit-box-flex:1;-webkit-flex:1;flex:1;height:56px}[data-duim-1-9-0~=\"dui-m-modal-footer\"]>[data-duim-1-9-0~=\"dui-m-button\"]:last-child{font-weight:500}[data-duim-1-9-0~=\"dui-m-modal-footer\"]>[data-duim-1-9-0~=\"dui-m-button\"]:disabled{color:var(--text-weak,rgba(0,0,0,.26));background:var(--bg-lv1-default,#fff)}[data-duim-1-9-0~=\"dui-m-modal-footer-vertical\"]{-webkit-box-orient:vertical;-webkit-box-direction:reverse;-webkit-flex-flow:column-reverse nowrap;flex-flow:column-reverse nowrap;padding:0 30px 30px}[data-duim-1-9-0~=\"dui-m-modal-footer-vertical\"]>[data-duim-1-9-0~=\"dui-m-button\"]:not(:last-child){margin-top:12px}[data-duim-1-9-0~=\"dui-m-modal-actions\"]{width:100%;border-radius:0 0 8px 8px;overflow:hidden}[data-duim-1-9-0~=\"dui-m-modal-actions\"]>[data-duim-1-9-0~=\"dui-m-button\"]{width:100%;height:44px}[data-duim-1-9-0~=\"dui-m-modal-actions\"]>[data-duim-1-9-0~=\"dui-m-button\"]:after{content:\" \";position:absolute;height:1px;width:100%;background:var(--border-medium,rgba(0,0,0,.08));-webkit-transform:scaleY(.5);transform:scaleY(.5);top:0;left:0}[data-duim-1-9-0~=\"dui-m-modal-close\"]{position:absolute;width:32px;height:32px;bottom:-56px;background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' fill='none' fill-rule='evenodd'%3E%3Ccircle stroke='%23fff' stroke-width='3' cx='32' cy='32' r='30.5'/%3E%3Cpath d='M41.627 19l2.828 2.828-9.9 9.9 9.9 9.899-2.828 2.828-9.899-9.9-9.9 9.9L19 41.627l9.9-9.899-9.9-9.9L21.828 19l9.9 9.9 9.899-9.9z' fill='%23fff'/%3E%3C/svg%3E\");background-size:contain;background-position:50%;background-repeat:no-repeat}[data-duim-1-9-0~=\"dui-m-modal-close\"]:active{opacity:.5}");
	Modal_1.default.confirm = confirm_1.default;
	exports.default = Modal_1.default;
}));
//#endregion
export default require_Modal();
export { require_Modal as t };
