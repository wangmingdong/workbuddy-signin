import { o as __toCommonJS, t as __commonJSMin } from "./chunk-BRZcfu7K.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { m as tslib_es6_exports, p as init_tslib_es6 } from "./tslib.es6-8NkKEYUK.js";
import { n as init_esm, t as esm_exports } from "./esm-mgJiqgJI.js";
import { r as require_assignWith, t as require_set } from "./set-CN3NcsdP.js";
import { n as require_i18next, t as require_i18nextBrowserLanguageDetector } from "./i18nextBrowserLanguageDetector-Bv7nntNh.js";
//#region ../../node_modules/@tencent/dui/lib/components/Snackbar/context.js
var require_context = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ContainerContext = void 0;
	exports.ContainerContext = (init_tslib_es6(), __toCommonJS(tslib_es6_exports)).__importStar(require_react()).createContext(null);
}));
//#endregion
//#region ../../node_modules/@tencent/dui/lib/common/wording.js
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
		],
		rotate: [
			"Rotate",
			"旋转",
			"หมุน",
			"Xoay",
			"Putar",
			"Paikutin",
			"Memutar",
			"Rotar",
			"Drehen",
			"回転",
			"旋轉"
		]
	};
}));
//#endregion
//#region ../../node_modules/@tencent/dui/lib/common/locale.js
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
export { require_context as n, require_locale as t };
