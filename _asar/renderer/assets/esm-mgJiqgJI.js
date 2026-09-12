import { n as __esmMin, r as __exportAll } from "./chunk-BRZcfu7K.js";
//#region ../../node_modules/@tencent/docs-user-agent/esm/constant.js
var TOGGLE_KEY_NAME, TOGGLE_KEY_PATTERN, TDBitToggle, TDocFlag;
var init_constant = __esmMin((() => {
	TOGGLE_KEY_NAME = "AppBitShiftToggle";
	TOGGLE_KEY_PATTERN = new RegExp("".concat(TOGGLE_KEY_NAME, "/(\\d+)"));
	(function(TDBitToggle) {
		/**
		* 支持全离线能力(离线编辑&离线打开)
		*/
		TDBitToggle[TDBitToggle["fullOfflineModeAvailable"] = 1] = "fullOfflineModeAvailable";
		/**
		* 支持客户端数据库
		*/
		TDBitToggle[TDBitToggle["nativeDatabaseAvailable"] = 2] = "nativeDatabaseAvailable";
		/**
		*  客户端数据库当前可用，即将废弃
		*/
		TDBitToggle[TDBitToggle["nativeDatabaseWillDeprecated"] = 4] = "nativeDatabaseWillDeprecated";
	})(TDBitToggle || (TDBitToggle = {}));
	(function(TDocFlag) {
		/**
		* 支持全离线能力 && 支持客户端数据库
		*/
		TDocFlag[TDocFlag["nativeDatabaseAndFullOfflineModeAvailable"] = 2] = "nativeDatabaseAndFullOfflineModeAvailable";
	})(TDocFlag || (TDocFlag = {}));
}));
//#endregion
//#region ../../node_modules/@tencent/docs-user-agent/esm/util.js
/**
* 从字符串中取出连续的数字和小数点/下划线作为版本号
* - 始终取字符串中第一段有数字和小数点/下划线（可以没有小数点/下划线）的连续子串，忽略其他字符
* - 将下划线转换成小数点
* - 如果字符串中根本没有数字，返回 null
* @param versionString 可能含有版本号的字符串
*/
function normalizeVersion(versionString) {
	var _a;
	var match = versionRegExp.exec(versionString);
	return (_a = match === null || match === void 0 ? void 0 : match[0].replace(/_/g, ".")) !== null && _a !== void 0 ? _a : null;
}
/**
* 版本号转换为整数列表
* - 始终取字符串中第一段有数字和小数点/下划线（可以没有小数点/下划线）的连续子串，忽略其他字符
* - 如果字符串中根本没有数字，返回空列表
* - 由小数点/下划线隔开的每一段数字当作整数处理，例如 1.02 中的 02 当作 2 处理
* - 末尾如果有 0 会被保留，例如 3.0.0 -> [3, 0, 0]
* @param version 版本号
*/
function versionToList(versionString) {
	var version = normalizeVersion(versionString);
	return (version === null || version === void 0 ? void 0 : version.split(".").map(Number)) || [];
}
/**
* 比较两个整数列表
* @param list1 第一个数字列表
* @param list2 第二个数字列表
* @returns -1(list1<list2) | 0(list1=list2) | 1(list1>list2)
*/
function compareList(list1, list2) {
	var result = Array(Math.max(list1.length, list2.length)).fill(0).map(function(_, i) {
		return (list1[i] || 0) - (list2[i] || 0);
	}).find(function(k) {
		return k !== 0;
	}) || 0;
	if (result < 0) return -1;
	if (result > 0) return 1;
	return 0;
}
/**
* 比较两个版本号字符串
* - 始终取字符串中第一段有数字和小数点/下划线（可以没有小数点/下划线）的连续子串，忽略其他字符
* - 如果字符串中根本没有数字，当作 0 版本处理
* - 由小数点/下划线隔开的每一段数字当作整数处理，例如 1.02 和 1.2 是一样的，请注意适用范围
* - 末尾有 .0 会被忽略，例如 2 = 2.0 = 2.0.0
* @param ver1 第一个版本号字符串
* @param ver2 第二个版本号字符串
* @returns -1(ver1<ver2) | 0(ver1=ver2) | 1(ver1>ver2)
*/
function compareVersion(ver1, ver2) {
	return compareList(versionToList(ver1), versionToList(ver2));
}
/**
* 从 userAgent 中取出以某前缀后面（可以隔一个符号，例如空格或者斜杠）出现的版本号
* - 在前缀之前没有出现字母数字，才会匹配
* - 前缀不区分大小写，例如 micromessenger 可以匹配 MicroMessenger/6.2
* - 如果找不到或者后面根本没有数字，返回 null
* @param prefix 要提取的平台前缀，例如 MicroMessenger
* @param ua 原始 userAgent
*/
function getVersionFromUA(prefix, ua) {
	var regExp;
	try {
		regExp = namedVersionRegExp(prefix);
	} catch (e) {
		return null;
	}
	var match = regExp.exec(ua);
	if (!match) return null;
	return normalizeVersion(match[1]);
}
function withDefaultUA(fn) {
	return function(userAgent) {
		return fn(userAgent || getUserAgent());
	};
}
function withDefaultUAAndVersion(fn) {
	return function(version, userAgent) {
		return fn(userAgent || getUserAgent(), version);
	};
}
/**
* 桌面端获取UA设置使用
* @param option
* @returns
*/
function getBitToggleSetting(option) {
	var flags = 0;
	if (option.fullOffline) flags |= TDBitToggle.fullOfflineModeAvailable;
	if (option.nativeDatabase) flags |= TDBitToggle.nativeDatabaseAvailable;
	if (option.nativeDatabaseWillDeprecated) flags |= TDBitToggle.nativeDatabaseWillDeprecated;
	return "".concat(TOGGLE_KEY_NAME, "/").concat(flags);
}
var versionRegExp, namedVersionRegExp, getUserAgent;
var init_util = __esmMin((() => {
	init_constant();
	versionRegExp = /\d+([._]\d+)*/;
	namedVersionRegExp = function(name) {
		return new RegExp("\\b".concat(name, "\\W+(\\d+([\\._]\\d+)*)"), "i");
	};
	getUserAgent = /* @__PURE__ */ (function() {
		var userAgent;
		return function() {
			if (userAgent === void 0) userAgent = typeof navigator !== "undefined" ? navigator.userAgent : "";
			return userAgent;
		};
	})();
}));
//#endregion
//#region ../../node_modules/@tencent/docs-user-agent/esm/pure.js
var isMobile, isMobilePhone, isIPhone, isIPad, isAndroidPhone, isAndroidPad, isHarmonyPhone, isHarmonyPad, isHarmonyPC, isPC, isMac, isIPadEmulatedMac, isAndroid, getAndroidVersion, isAndroidVersionAboveOrEqual, isHarmony, getHarmonyVersion, getHarmonyFullVersion, isHarmonyVersionAboveOrEqual, isHarmonyFullVersionAboveOrEqual, isIOS, getIOSVersion, isIOSVersionAboveOrEqual, getMacOSVersion, isMacOSVersionAboveOrEqual, isWindows, isWindowsUWP, isLinux, isLinuxKylin, isLinuxUOS, isPCQQBrowser, getPCQQBrowserVersion, isPCQQBrowserVersionAboveOrEqual, isMobileQQBrowser, getMobileQQBrowserVersion, isMobileQQBrowserVersionAboveOrEqual, isQQBrowser, isHarmonyBrowser, isChrome, isWxWorkWindowsCEF, getChromeVersion, isChromeVersionAboveOrEqual, isSafari, getSafariVersion, isSafariVersionAboveOrEqual, isIE, isOldEdge, isChromiumEdge, isFirefox, getFirefoxVersion, isFirefoxVersionAboveOrEqual, isWeChat, getWeChatVersion, isWeChatVersionAboveOrEqual, isWxWork, isWxWorkQt, isWxWorkCustom, isWxWorkCEF, getWxWorkCEFVersion, isWxWorkCEFVersionAboveOrEqual, isWxWorkPrivate, isWxDrive, getWxDriveVersion, isWxDriveVersionAboveOrEqual, getWxWorkVersion, isWxWorkVersionAboveOrEqual, getWxWorkPrivateVersion, isWxWorkPrivateVersionAboveOrEqual, isQQ, isQQForGooglePlay, getQQVersion, isQQVersionAboveOrEqual, isTim, isPCTim, getTimVersion, isTimVersionAboveOrEqual, isTimOrQQ, isTimOrQQFamily, isQQDesktopDocsClient, isQQMobileDocsClient, isQQMobileOnlinePreview, isQQMobileLocalPreview, isMiniProgram, isWxMiniProgram, isQQMiniProgram, isLuggageWxMiniProgram, isQQOpenWxMiniProgram, isTencentDocsApp, getTencentDocsAppVersion, isTencentDocsAppVersionAboveOrEqual, isPCTencentDocsClient, isPCTencentDocsApp, getPCTencentDocsClientVersion, isPCTencentDocsClientVersionAboveOrEqual, isElectronTencentDocsClient, getElectronTencentDocsClientVersion, isElectronTencentDocsClientVersionAboveOrEqual, isMacAppStoreTencentDocsClient, isMacAppStoreTencentDocsClientForReview, isWeiYunApp, isWatermarkApp, isSouGou, isTencentMeeting, isYuanBao, isWxWorkTencentMeeting, isTencentMeetingRooms, isQClaw, getQClawVersion, isQClawVersionAboveOrEqual, isWorkBuddy, getWorkBuddyVersion, isWorkBuddyVersionAboveOrEqual, isElectron, getElectronVersion, isElectronVersionAboveOrEqual, getBitToggleSettings, isSupportNativeDatabase, isSupportFullOfflineMode, isNativeDatabaseWillDeprecated;
var init_pure = __esmMin((() => {
	init_constant();
	init_util();
	isMobile = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return /(mobile)/i.test(userAgent) || isAndroidPad(userAgent) || isHarmonyPad(userAgent);
	});
	isMobilePhone = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return /(mobile)/i.test(userAgent) && !isIPad(userAgent);
	});
	isIPhone = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return /(iphone)/i.test(userAgent);
	});
	isIPad = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return /(ipad)/i.test(userAgent);
	});
	isAndroidPhone = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return /(mobile)/i.test(userAgent) && isAndroid(userAgent);
	});
	isAndroidPad = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return (!/(mobile)/i.test(userAgent) || /(tdocsIsPad)/i.test(userAgent)) && isAndroid(userAgent);
	});
	isHarmonyPhone = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return isHarmony(userAgent) && /mobile/i.test(userAgent);
	});
	isHarmonyPad = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return isHarmony(userAgent) && !/mobile/i.test(userAgent) && !/\bPC;|WindowsWechat/.test(userAgent);
	});
	isHarmonyPC = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return isHarmony(userAgent) && !/mobile/i.test(userAgent) && /\bPC;|WindowsWechat/.test(userAgent);
	});
	isPC = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return !isMobile(userAgent);
	});
	isMac = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return !isMobile(userAgent) && /Mac OS X/i.test(userAgent);
	});
	isIPadEmulatedMac = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		var _a;
		return isMac(userAgent) && isSafari(userAgent) && (navigator.maxTouchPoints > 1 || ((_a = navigator.vendor) === null || _a === void 0 ? void 0 : _a.startsWith("Google")));
	});
	isAndroid = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return /android|adr/i.test(userAgent);
	});
	getAndroidVersion = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return isAndroid(userAgent) ? getVersionFromUA("Android", userAgent) : null;
	});
	isAndroidVersionAboveOrEqual = /* @__PURE__ */ withDefaultUAAndVersion(function(userAgent, version) {
		return compareVersion(getAndroidVersion(userAgent) || "", version) >= 0;
	});
	isHarmony = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return /OpenHarmony|HarmonyOS|OHOS/i.test(userAgent);
	});
	getHarmonyVersion = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return isHarmony(userAgent) ? getVersionFromUA("OpenHarmony", userAgent) : null;
	});
	getHarmonyFullVersion = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		if (!isHarmony(userAgent)) return null;
		if (!isWxWork(userAgent)) return null;
		return getVersionFromUA("HarmonyOSVersion", userAgent);
	});
	isHarmonyVersionAboveOrEqual = /* @__PURE__ */ withDefaultUAAndVersion(function(userAgent, version) {
		return compareVersion(getHarmonyVersion(userAgent) || "", version) >= 0;
	});
	isHarmonyFullVersionAboveOrEqual = /* @__PURE__ */ withDefaultUAAndVersion(function(userAgent, version) {
		return compareVersion(getHarmonyFullVersion(userAgent) || "", version) >= 0;
	});
	isIOS = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return /(iphone|ipad|ipod)/i.test(userAgent);
	});
	getIOSVersion = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		if (!isIOS(userAgent)) return null;
		var safariVersion = getVersionFromUA("Version", userAgent);
		if (safariVersion && compareVersion(safariVersion, "26.0") >= 0) return safariVersion;
		return getVersionFromUA("OS", userAgent);
	});
	isIOSVersionAboveOrEqual = /* @__PURE__ */ withDefaultUAAndVersion(function(userAgent, version) {
		return compareVersion(getIOSVersion(userAgent) || "", version) >= 0;
	});
	getMacOSVersion = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		if (!isMac(userAgent)) return null;
		var safariVersion = getVersionFromUA("Version", userAgent);
		if (safariVersion && compareVersion(safariVersion, "26.0") >= 0) return safariVersion;
		return getVersionFromUA("Mac OS X", userAgent);
	});
	isMacOSVersionAboveOrEqual = /* @__PURE__ */ withDefaultUAAndVersion(function(userAgent, version) {
		return compareVersion(getMacOSVersion(userAgent) || "", version) >= 0;
	});
	isWindows = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return /(win64|wow64|win32|wow32|windows nt)/i.test(userAgent);
	});
	isWindowsUWP = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return /MSAppHost/i.test(userAgent);
	});
	isLinux = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return /linux/i.test(userAgent) && !isAndroid(userAgent);
	});
	isLinuxKylin = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return /linux-kylin/i.test(userAgent);
	});
	isLinuxUOS = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return /linux-uos/i.test(userAgent);
	});
	isPCQQBrowser = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return !isMobile(userAgent) && /QQBrowser/i.test(userAgent) && !/QBCore/i.test(userAgent);
	});
	getPCQQBrowserVersion = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return isPCQQBrowser(userAgent) ? getVersionFromUA("QQBrowser", userAgent) : null;
	});
	isPCQQBrowserVersionAboveOrEqual = /* @__PURE__ */ withDefaultUAAndVersion(function(userAgent, version) {
		return compareVersion(getPCQQBrowserVersion(userAgent) || "", version) >= 0;
	});
	isMobileQQBrowser = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return isMobile(userAgent) && /MQQBrowser/i.test(userAgent) && !isTimOrQQ(userAgent) && !isWeChat(userAgent) && !isWxWork(userAgent) && !isTencentDocsApp(userAgent) && !isWeiYunApp(userAgent) && !isMiniProgram(userAgent) && !isTencentMeeting(userAgent) && !isYuanBao(userAgent);
	});
	getMobileQQBrowserVersion = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return isMobileQQBrowser(userAgent) ? getVersionFromUA("MQQBrowser", userAgent) : null;
	});
	isMobileQQBrowserVersionAboveOrEqual = /* @__PURE__ */ withDefaultUAAndVersion(function(userAgent, version) {
		return compareVersion(getMobileQQBrowserVersion(userAgent) || "", version) >= 0;
	});
	isQQBrowser = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return isMobile(userAgent) ? isMobileQQBrowser(userAgent) : isPCQQBrowser(userAgent);
	});
	isHarmonyBrowser = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return isHarmony(userAgent) && !isTimOrQQ(userAgent) && !isWeChat(userAgent) && !isWxWork(userAgent) && !isTencentDocsApp(userAgent) && !isWeiYunApp(userAgent) && !isMiniProgram(userAgent) && !isTencentMeeting(userAgent) && !isYuanBao(userAgent);
	});
	isChrome = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return /(Chrome|CriOS)\/\S+( Mobile\S*)? Safari\/\S+$/i.test(userAgent);
	});
	isWxWorkWindowsCEF = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return /Chrome\/\S+ Safari\/\S+ /i.test(userAgent) && isWxWork(userAgent);
	});
	getChromeVersion = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return getVersionFromUA("Chrome", userAgent);
	});
	isChromeVersionAboveOrEqual = /* @__PURE__ */ withDefaultUAAndVersion(function(userAgent, version) {
		return compareVersion(getChromeVersion(userAgent) || "", version) >= 0;
	});
	isSafari = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return /Version\/\S+( Mobile\S*)? Safari\/\S+$/i.test(userAgent);
	});
	getSafariVersion = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return isSafari(userAgent) ? getVersionFromUA("Version", userAgent) : null;
	});
	isSafariVersionAboveOrEqual = /* @__PURE__ */ withDefaultUAAndVersion(function(userAgent, version) {
		return compareVersion(getSafariVersion(userAgent) || "", version) >= 0;
	});
	isIE = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return /MSIE/i.test(userAgent) && !/opera/i.test(userAgent) || /Trident/i.test(userAgent);
	});
	isOldEdge = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return /Edge/i.test(userAgent);
	});
	isChromiumEdge = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return /Edg\//i.test(userAgent);
	});
	isFirefox = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return /(Firefox|Focus|FxiOS)\//i.test(userAgent);
	});
	getFirefoxVersion = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return isFirefox(userAgent) ? getVersionFromUA("(?:Firefox|Focus|FxiOS)", userAgent) : null;
	});
	isFirefoxVersionAboveOrEqual = /* @__PURE__ */ withDefaultUAAndVersion(function(userAgent, version) {
		return compareVersion(getFirefoxVersion(userAgent) || "", version) >= 0;
	});
	isWeChat = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return /MicroMessenger/i.test(userAgent) && !isWxWork(userAgent) && !isWxMiniProgram(userAgent);
	});
	getWeChatVersion = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return isWeChat(userAgent) || isWxMiniProgram(userAgent) ? getVersionFromUA("MicroMessenger", userAgent) : null;
	});
	isWeChatVersionAboveOrEqual = /* @__PURE__ */ withDefaultUAAndVersion(function(userAgent, version) {
		return compareVersion(getWeChatVersion(userAgent) || "", version) >= 0;
	});
	isWxWork = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return /(wxwork)/i.test(userAgent);
	});
	isWxWorkQt = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return /(wxworkQt)/i.test(userAgent);
	});
	isWxWorkCustom = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return /WeComCEF/i.test(userAgent) && isWxWork(userAgent);
	});
	isWxWorkCEF = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		if (isWxWork(userAgent) && isPC(userAgent)) if (isMac(userAgent)) return isWxWorkCustom(userAgent);
		else return isWxWorkWindowsCEF(userAgent);
		return false;
	});
	getWxWorkCEFVersion = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		if (isWxWork(userAgent) && isPC(userAgent)) if (isMac(userAgent)) return getVersionFromUA("WeComCEF", userAgent);
		else return getChromeVersion(userAgent);
		return null;
	});
	isWxWorkCEFVersionAboveOrEqual = /* @__PURE__ */ withDefaultUAAndVersion(function(userAgent, version) {
		return compareVersion(getWxWorkCEFVersion(userAgent) || "", version) >= 0;
	});
	isWxWorkPrivate = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return /(wxworklocal)/i.test(userAgent);
	});
	isWxDrive = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return /WXDrive/i.test(userAgent);
	});
	getWxDriveVersion = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return isWxDrive(userAgent) ? getVersionFromUA("WXDrive", userAgent) : null;
	});
	isWxDriveVersionAboveOrEqual = /* @__PURE__ */ withDefaultUAAndVersion(function(userAgent, version) {
		return compareVersion(getWxDriveVersion(userAgent) || "", version) >= 0;
	});
	getWxWorkVersion = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return isWxWork(userAgent) ? getVersionFromUA("wxwork", userAgent) : null;
	});
	isWxWorkVersionAboveOrEqual = /* @__PURE__ */ withDefaultUAAndVersion(function(userAgent, version) {
		return compareVersion(getWxWorkVersion(userAgent) || "", version) >= 0;
	});
	getWxWorkPrivateVersion = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return isWxWorkPrivate(userAgent) ? getVersionFromUA("wxworklocal", userAgent) : null;
	});
	isWxWorkPrivateVersionAboveOrEqual = /* @__PURE__ */ withDefaultUAAndVersion(function(userAgent, version) {
		return compareVersion(getWxWorkPrivateVersion(userAgent) || "", version) >= 0;
	});
	isQQ = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return /QQ\//i.test(userAgent) && !isTencentDocsApp(userAgent) && !isMiniProgram(userAgent) && !isTim(userAgent);
	});
	isQQForGooglePlay = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return /QQ\//i.test(userAgent) && /_GM/i.test(userAgent);
	});
	getQQVersion = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return isQQ(userAgent) || isQQMiniProgram(userAgent) || isQQOpenWxMiniProgram(userAgent) ? getVersionFromUA("QQ", userAgent) : null;
	});
	isQQVersionAboveOrEqual = /* @__PURE__ */ withDefaultUAAndVersion(function(userAgent, version) {
		return compareVersion(getQQVersion(userAgent) || "", version) >= 0;
	});
	isTim = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return /(TIM|MIT)\//i.test(userAgent);
	});
	isPCTim = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return /QBCore/i.test(userAgent) && /TIM2.0/i.test(userAgent);
	});
	getTimVersion = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return isTim(userAgent) ? getVersionFromUA("TIM", userAgent) || getVersionFromUA("MIT", userAgent) : null;
	});
	isTimVersionAboveOrEqual = /* @__PURE__ */ withDefaultUAAndVersion(function(userAgent, version) {
		return compareVersion(getTimVersion(userAgent) || "", version) >= 0;
	});
	isTimOrQQ = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return isTim(userAgent) && !isQQMiniProgram(userAgent) || isQQ(userAgent);
	});
	isTimOrQQFamily = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return isTim(userAgent) || /QQ/i.test(userAgent);
	});
	isQQDesktopDocsClient = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return /QQEX/i.test(userAgent) && isElectronTencentDocsClient(userAgent);
	});
	isQQMobileDocsClient = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return /TDMobileQQMini/i.test(userAgent);
	});
	isQQMobileOnlinePreview = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return /TDMobileQQOnlinePreview/i.test(userAgent);
	});
	isQQMobileLocalPreview = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return /TDMobileQQLocalPreview/i.test(userAgent);
	});
	isMiniProgram = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return /miniprogram|miniapp(?!enable)/i.test(userAgent) || typeof __wxjs_environment !== "undefined" && __wxjs_environment === "miniprogram";
	});
	isWxMiniProgram = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return /MicroMessenger/i.test(userAgent) && isMiniProgram(userAgent);
	});
	isQQMiniProgram = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return /QQ\/|TIM/i.test(userAgent) && isMiniProgram(userAgent) && !isWxMiniProgram(userAgent);
	});
	isLuggageWxMiniProgram = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return isWxMiniProgram(userAgent) && /Luggage\//i.test(userAgent);
	});
	isQQOpenWxMiniProgram = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return /QQ\/|TIM/i.test(userAgent) && isLuggageWxMiniProgram(userAgent);
	});
	isTencentDocsApp = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return /TencentDocs/i.test(userAgent);
	});
	getTencentDocsAppVersion = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return getVersionFromUA("TencentDocs", userAgent);
	});
	isTencentDocsAppVersionAboveOrEqual = /* @__PURE__ */ withDefaultUAAndVersion(function(userAgent, version) {
		return compareVersion(getTencentDocsAppVersion(userAgent) || "", version) >= 0;
	});
	isPCTencentDocsClient = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return /TxDocsPC/i.test(userAgent);
	});
	isPCTencentDocsApp = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return isPCTencentDocsClient(userAgent);
	});
	getPCTencentDocsClientVersion = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return getVersionFromUA("TxDocsPC", userAgent);
	});
	isPCTencentDocsClientVersionAboveOrEqual = /* @__PURE__ */ withDefaultUAAndVersion(function(userAgent, version) {
		return compareVersion(getPCTencentDocsClientVersion(userAgent) || "", version) >= 0;
	});
	isElectronTencentDocsClient = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return /TDAppDesktop/i.test(userAgent);
	});
	getElectronTencentDocsClientVersion = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return getVersionFromUA("TDAppDesktop", userAgent);
	});
	isElectronTencentDocsClientVersionAboveOrEqual = /* @__PURE__ */ withDefaultUAAndVersion(function(userAgent, version) {
		return compareVersion(getElectronTencentDocsClientVersion(userAgent) || "", version) >= 0;
	});
	isMacAppStoreTencentDocsClient = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return getVersionFromUA("TDAppDesktopChannel", userAgent) === "30020";
	});
	isMacAppStoreTencentDocsClientForReview = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return isMacAppStoreTencentDocsClient(userAgent) && /MASReview/i.test(userAgent);
	});
	isWeiYunApp = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return /weiyun/i.test(userAgent);
	});
	isWatermarkApp = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return /WatermarkCamera/i.test(userAgent);
	});
	isSouGou = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return /SE 2\.X MetaSr 1\.0/i.test(userAgent);
	});
	isTencentMeeting = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return /tencent_wemeet/i.test(userAgent);
	});
	isYuanBao = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return /YuanBao/i.test(userAgent);
	});
	isWxWorkTencentMeeting = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return isTencentMeeting(userAgent) && /meeting_wework/i.test(userAgent);
	});
	isTencentMeetingRooms = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return /TencentMeetingRooms/i.test(userAgent);
	});
	isQClaw = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return /QClaw\//i.test(userAgent);
	});
	getQClawVersion = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return isQClaw(userAgent) ? getVersionFromUA("QClaw", userAgent) : null;
	});
	isQClawVersionAboveOrEqual = /* @__PURE__ */ withDefaultUAAndVersion(function(userAgent, version) {
		return compareVersion(getQClawVersion(userAgent) || "", version) >= 0;
	});
	isWorkBuddy = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return /WorkBuddy\//i.test(userAgent);
	});
	getWorkBuddyVersion = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return isWorkBuddy(userAgent) ? getVersionFromUA("WorkBuddy", userAgent) : null;
	});
	isWorkBuddyVersionAboveOrEqual = /* @__PURE__ */ withDefaultUAAndVersion(function(userAgent, version) {
		return compareVersion(getWorkBuddyVersion(userAgent) || "", version) >= 0;
	});
	isElectron = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return /Electron\//i.test(userAgent);
	});
	getElectronVersion = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		return isElectron(userAgent) ? getVersionFromUA("Electron", userAgent) : null;
	});
	isElectronVersionAboveOrEqual = /* @__PURE__ */ withDefaultUAAndVersion(function(userAgent, version) {
		return compareVersion(getElectronVersion(userAgent) || "", version) >= 0;
	});
	getBitToggleSettings = function(option) {
		return getBitToggleSetting(option);
	};
	isSupportNativeDatabase = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		var tdocFlag = userAgent.match(/_tdocFlag\/(\d+)/);
		if (tdocFlag === null || tdocFlag === void 0 ? void 0 : tdocFlag[1]) {
			var num = parseInt(tdocFlag[1], 10);
			return !!(num & TDocFlag.nativeDatabaseAndFullOfflineModeAvailable);
		}
		var bitToggle = userAgent.match(TOGGLE_KEY_PATTERN);
		if (bitToggle === null || bitToggle === void 0 ? void 0 : bitToggle[1]) {
			var num = parseInt(bitToggle[1], 10);
			return !!(num & TDBitToggle.nativeDatabaseAvailable);
		}
		return false;
	});
	isSupportFullOfflineMode = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		var tdocFlag = userAgent.match(/_tdocFlag\/(\d+)/);
		if (tdocFlag === null || tdocFlag === void 0 ? void 0 : tdocFlag[1]) {
			var num = parseInt(tdocFlag[1], 10);
			return !!(num & TDocFlag.nativeDatabaseAndFullOfflineModeAvailable);
		}
		var bitToggle = userAgent.match(TOGGLE_KEY_PATTERN);
		if (bitToggle === null || bitToggle === void 0 ? void 0 : bitToggle[1]) {
			var num = parseInt(bitToggle[1], 10);
			return !!(num & TDBitToggle.fullOfflineModeAvailable);
		}
		return false;
	});
	isNativeDatabaseWillDeprecated = /* @__PURE__ */ withDefaultUA(function(userAgent) {
		var bitToggle = userAgent.match(TOGGLE_KEY_PATTERN);
		if (bitToggle === null || bitToggle === void 0 ? void 0 : bitToggle[1]) return !!(parseInt(bitToggle[1], 10) & TDBitToggle.nativeDatabaseWillDeprecated);
		return false;
	});
}));
//#endregion
//#region ../../node_modules/@tencent/docs-user-agent/esm/index.js
var esm_exports = /* @__PURE__ */ __exportAll({
	UserAgent: () => UserAgent,
	compareVersion: () => compareVersion,
	default: () => ua,
	getVersionFromUA: () => getVersionFromUA
});
var UserAgent, ua;
var init_esm = __esmMin((() => {
	init_pure();
	init_util();
	UserAgent = function() {
		function UserAgent(userAgent) {
			if (userAgent === void 0) userAgent = getUserAgent();
			var _this = this;
			/**
			* 获取 Android 版本
			*/
			this.getAndroidVersion = function() {
				return getAndroidVersion(_this.userAgent);
			};
			/**
			* 判断 Android 是否高于指定的版本
			*/
			this.isAndroidVersionAboveOrEqual = function(version) {
				return isAndroidVersionAboveOrEqual(version, _this.userAgent);
			};
			/**
			* 获取 Harmony 版本
			*/
			this.getHarmonyVersion = function() {
				return getHarmonyVersion(_this.userAgent);
			};
			/**
			* 判断 Harmony 是否高于指定的版本
			*/
			this.isHarmonyVersionAboveOrEqual = function(version) {
				return isHarmonyVersionAboveOrEqual(version, _this.userAgent);
			};
			/**
			* 获取 Harmony 详细版本号（只有企微鸿蒙 APP 提供）
			* eg. HarmonyOSVersion/5.1.0.128
			*/
			this.getHarmonyFullVersion = function() {
				return getHarmonyFullVersion(_this.userAgent);
			};
			/**
			* 判断 Harmony 详细版本号是否高于指定的版本
			*/
			this.isHarmonyFullVersionAboveOrEqual = function(version) {
				return isHarmonyFullVersionAboveOrEqual(version, _this.userAgent);
			};
			/**
			* 获取 iOS 版本
			*/
			this.getIOSVersion = function() {
				return getIOSVersion(_this.userAgent);
			};
			/**
			* 判断 iOS 是否高于指定的版本
			*/
			this.isIOSVersionAboveOrEqual = function(version) {
				return isIOSVersionAboveOrEqual(version, _this.userAgent);
			};
			/**
			* 获取 macOS 版本
			*/
			this.getMacOSVersion = function() {
				return getMacOSVersion(_this.userAgent);
			};
			/**
			* 判断 macOS 是否高于指定的版本
			*/
			this.isMacOSVersionAboveOrEqual = function(version) {
				return isMacOSVersionAboveOrEqual(version, _this.userAgent);
			};
			/**
			* 获取 PC QQ 浏览器版本
			*/
			this.getPCQQBrowserVersion = function() {
				return getPCQQBrowserVersion(_this.userAgent);
			};
			/**
			* 判断 PC QQ 浏览器是否高于指定的版本
			*/
			this.isPCQQBrowserVersionAboveOrEqual = function(version) {
				return isPCQQBrowserVersionAboveOrEqual(version, _this.userAgent);
			};
			/**
			* 获取移动端 QQ 浏览器版本
			*/
			this.getMobileQQBrowserVersion = function() {
				return getMobileQQBrowserVersion(_this.userAgent);
			};
			/**
			* 判断移动端 QQ 浏览器是否高于指定的版本
			*/
			this.isMobileQQBrowserVersionAboveOrEqual = function(version) {
				return isMobileQQBrowserVersionAboveOrEqual(version, _this.userAgent);
			};
			/**
			* 获取 Chrome 版本
			* 注意不代表一定是 Chrome 浏览器，也可能是 Chrome 内核的 Android 客户端 H5、浏览器、小程序等，如果没有 Chrome 内核则为 null；iOS Chrome 不是 Chrome 内核，也为 null
			*/
			this.getChromeVersion = function() {
				return getChromeVersion(_this.userAgent);
			};
			/**
			* 判断 Chrome 是否高于指定的版本
			* 支持 Chrome 内核的 Android 客户端 H5、浏览器、小程序等，如果没有 Chrome 内核则为 false；iOS Chrome 不是 Chrome 内核，也为 false
			*/
			this.isChromeVersionAboveOrEqual = function(version) {
				return isChromeVersionAboveOrEqual(version, _this.userAgent);
			};
			/**
			* 获取 safari 的版本
			*/
			this.getSafariVersion = function() {
				return getSafariVersion(_this.userAgent);
			};
			/**
			* 判断 safari 是否高于指定的版本
			*/
			this.isSafariVersionAboveOrEqual = function(version) {
				return isSafariVersionAboveOrEqual(version, _this.userAgent);
			};
			/**
			* 获取 Firefox 的版本
			*/
			this.getFirefoxVersion = function() {
				return getFirefoxVersion(_this.userAgent);
			};
			/**
			* 判断 Firefox 是否高于指定的版本
			*/
			this.isFirefoxVersionAboveOrEqual = function(version) {
				return isFirefoxVersionAboveOrEqual(version, _this.userAgent);
			};
			/**
			* 获取微信版本
			* 同时支持微信 H5 和小程序 webview
			*/
			this.getWeChatVersion = function() {
				return getWeChatVersion(_this.userAgent);
			};
			/**
			* 判断微信是否高于指定的版本
			* 同时支持微信 H5 和小程序 webview
			*/
			this.isWeChatVersionAboveOrEqual = function(version) {
				return isWeChatVersionAboveOrEqual(version, _this.userAgent);
			};
			/**
			* 判断企业微信定制 CEF 版本是否高于指定的版本
			*/
			this.isWxWorkCEFVersionAboveOrEqual = function(version) {
				return isWxWorkCEFVersionAboveOrEqual(version, _this.userAgent);
			};
			/**
			* 获取微盘版本
			*/
			this.getWxDriveVersion = function() {
				return getWxDriveVersion(_this.userAgent);
			};
			/**
			* 判断微盘版本是否高于指定的版本
			*/
			this.isWxDriveVersionAboveOrEqual = function(version) {
				return isWxDriveVersionAboveOrEqual(version, _this.userAgent);
			};
			/**
			* 获取企业微信版本
			*/
			this.getWxWorkVersion = function() {
				return getWxWorkVersion(_this.userAgent);
			};
			/**
			* 判断企业微信是否高于指定的版本
			*/
			this.isWxWorkVersionAboveOrEqual = function(version) {
				return isWxWorkVersionAboveOrEqual(version, _this.userAgent);
			};
			/**
			* 获取私有化企业微信版本
			*/
			this.getWxWorkPrivateVersion = function() {
				return getWxWorkPrivateVersion(_this.userAgent);
			};
			/**
			* 判断私有化企业微信是否高于指定的版本
			*/
			this.isWxWorkPrivateVersionAboveOrEqual = function(version) {
				return isWxWorkPrivateVersionAboveOrEqual(version, _this.userAgent);
			};
			/**
			* 获取 QQ 版本
			* 同时支持 QQ H5 和小程序 webview
			*/
			this.getQQVersion = function() {
				return getQQVersion(_this.userAgent);
			};
			/**
			* 判断 QQ 是否高于指定的版本
			* 同时支持 QQ H5 和小程序 webview
			*/
			this.isQQVersionAboveOrEqual = function(version) {
				return isQQVersionAboveOrEqual(version, _this.userAgent);
			};
			/**
			* 获取 TIM 版本
			*/
			this.getTimVersion = function() {
				return getTimVersion(_this.userAgent);
			};
			/**
			* 判断 TIM 是否高于指定的版本
			*/
			this.isTimVersionAboveOrEqual = function(version) {
				return isTimVersionAboveOrEqual(version, _this.userAgent);
			};
			/**
			* 获取腾讯文档移动客户端版本
			*/
			this.getTencentDocsAppVersion = function() {
				return getTencentDocsAppVersion(_this.userAgent);
			};
			/**
			* 判断腾讯文档移动客户端是否高于指定的版本
			*/
			this.isTencentDocsAppVersionAboveOrEqual = function(version) {
				return isTencentDocsAppVersionAboveOrEqual(version, _this.userAgent);
			};
			/**
			* 获取腾讯文档 PC 客户端版本
			* @deprecated 此为老的 Windows 客户端，现在已经不再使用，判断新客户端请改用 getElectronTencentDocsClientVersion
			*/
			this.getPCTencentDocsClientVersion = function() {
				return getPCTencentDocsClientVersion(_this.userAgent);
			};
			/**
			* 判断腾讯文档 PC 客户端是否高于指定的版本
			* @deprecated 此为老的 Windows 客户端，现在已经不再使用，判断新客户端请改用 isElectronTencentDocsClientVersionAboveOrEqual
			*/
			this.isPCTencentDocsClientVersionAboveOrEqual = function(version) {
				return isPCTencentDocsClientVersionAboveOrEqual(version, _this.userAgent);
			};
			/**
			* 获取腾讯文档 Electron 客户端版本
			*/
			this.getElectronTencentDocsClientVersion = function() {
				return getElectronTencentDocsClientVersion(_this.userAgent);
			};
			/**
			* 判断腾讯文档 Electron 客户端是否高于指定的版本
			*/
			this.isElectronTencentDocsClientVersionAboveOrEqual = function(version) {
				return isElectronTencentDocsClientVersionAboveOrEqual(version, _this.userAgent);
			};
			/**
			* 获取 QClaw 客户端版本
			*/
			this.getQClawVersion = function() {
				return getQClawVersion(_this.userAgent);
			};
			/**
			* 判断 QClaw 客户端是否高于指定的版本
			*/
			this.isQClawVersionAboveOrEqual = function(version) {
				return isQClawVersionAboveOrEqual(version, _this.userAgent);
			};
			/**
			* 获取 WorkBuddy 客户端版本
			*/
			this.getWorkBuddyVersion = function() {
				return getWorkBuddyVersion(_this.userAgent);
			};
			/**
			* 判断 WorkBuddy 客户端是否高于指定的版本
			*/
			this.isWorkBuddyVersionAboveOrEqual = function(version) {
				return isWorkBuddyVersionAboveOrEqual(version, _this.userAgent);
			};
			/**
			* 获取 Electron 平台版本
			*/
			this.getElectronVersion = function() {
				return getElectronVersion(_this.userAgent);
			};
			/**
			* 判断 Electron 平台是否高于指定的版本
			*/
			this.isElectronVersionAboveOrEqual = function(version) {
				return isElectronVersionAboveOrEqual(version, _this.userAgent);
			};
			this.getBitToggleSettings = function(option) {
				return getBitToggleSettings(option);
			};
			Object.defineProperty(this, "userAgent", {
				value: userAgent,
				writable: false
			});
		}
		Object.defineProperty(UserAgent.prototype, "isMobile", {
			get: function() {
				return isMobile(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isMobilePhone", {
			get: function() {
				return isMobilePhone(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isIPhone", {
			get: function() {
				return isIPhone(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isIPad", {
			get: function() {
				return isIPad(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isAndroidPhone", {
			get: function() {
				return isAndroidPhone(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isAndroidPad", {
			get: function() {
				return isAndroidPad(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isHarmonyPhone", {
			get: function() {
				return isHarmonyPhone(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isHarmonyPad", {
			get: function() {
				return isHarmonyPad(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isHarmonyPC", {
			get: function() {
				return isHarmonyPC(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isPC", {
			get: function() {
				return isPC(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isMac", {
			get: function() {
				return isMac(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isIPadEmulatedMac", {
			get: function() {
				return isIPadEmulatedMac(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isAndroid", {
			get: function() {
				return isAndroid(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isHarmony", {
			get: function() {
				return isHarmony(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isIOS", {
			get: function() {
				return isIOS(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isWindows", {
			get: function() {
				return isWindows(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isWindowsUWP", {
			get: function() {
				return isWindowsUWP(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isLinux", {
			get: function() {
				return isLinux(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isLinuxKylin", {
			get: function() {
				return isLinuxKylin(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isLinuxUOS", {
			get: function() {
				return isLinuxUOS(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isPCQQBrowser", {
			get: function() {
				return isPCQQBrowser(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isMobileQQBrowser", {
			get: function() {
				return isMobileQQBrowser(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isQQBrowser", {
			get: function() {
				return isQQBrowser(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isHarmonyBrowser", {
			get: function() {
				return isHarmonyBrowser(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isChrome", {
			get: function() {
				return isChrome(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isSafari", {
			get: function() {
				return isSafari(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isIE", {
			get: function() {
				return isIE(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isOldEdge", {
			get: function() {
				return isOldEdge(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isChromiumEdge", {
			get: function() {
				return isChromiumEdge(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isFirefox", {
			get: function() {
				return isFirefox(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isWeChat", {
			get: function() {
				return isWeChat(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isWxWork", {
			get: function() {
				return isWxWork(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isWxWorkQt", {
			get: function() {
				return isWxWorkQt(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isWxWorkCustom", {
			get: function() {
				return isWxWorkCustom(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isWxWorkCEF", {
			get: function() {
				return isWxWorkCEF(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		/**
		* 获取企业微信定制 CEF 版本
		*/
		UserAgent.prototype.getWxWorkCEFVersion = function() {
			return getWxWorkCEFVersion(this.userAgent);
		};
		Object.defineProperty(UserAgent.prototype, "isWxWorkPrivate", {
			get: function() {
				return isWxWorkPrivate(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isWxDrive", {
			get: function() {
				return isWxDrive(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isQQ", {
			get: function() {
				return isQQ(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isQQForGooglePlay", {
			get: function() {
				return isQQForGooglePlay(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isTim", {
			get: function() {
				return isTim(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isPCTim", {
			get: function() {
				return isPCTim(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isTimOrQQ", {
			get: function() {
				return isTimOrQQ(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isTimOrQQFamily", {
			get: function() {
				return isTimOrQQFamily(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isQQDesktopDocsClient", {
			get: function() {
				return isQQDesktopDocsClient(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isQQMobileDocsClient", {
			get: function() {
				return isQQMobileDocsClient(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isQQMobileOnlinePreview", {
			get: function() {
				return isQQMobileOnlinePreview(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isQQMobileLocalPreview", {
			get: function() {
				return isQQMobileLocalPreview(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isMiniProgram", {
			get: function() {
				return isMiniProgram(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isWxMiniProgram", {
			get: function() {
				return isWxMiniProgram(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isQQMiniProgram", {
			get: function() {
				return isQQMiniProgram(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isLuggageWxMiniProgram", {
			get: function() {
				return isLuggageWxMiniProgram(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isQQOpenWxMiniProgram", {
			get: function() {
				return isQQOpenWxMiniProgram(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isTencentDocsApp", {
			get: function() {
				return isTencentDocsApp(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isPCTencentDocsClient", {
			get: function() {
				return isPCTencentDocsClient(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isPCTencentDocsApp", {
			get: function() {
				return isPCTencentDocsApp(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isElectronTencentDocsClient", {
			get: function() {
				return isElectronTencentDocsClient(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isMacAppStoreTencentDocsClient", {
			get: function() {
				return isMacAppStoreTencentDocsClient(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isMacAppStoreTencentDocsClientForReview", {
			get: function() {
				return isMacAppStoreTencentDocsClientForReview(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isWeiYunApp", {
			get: function() {
				return isWeiYunApp(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isWatermarkApp", {
			get: function() {
				return isWatermarkApp(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isSouGou", {
			get: function() {
				return isSouGou(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isTencentMeeting", {
			get: function() {
				return isTencentMeeting(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isWxWorkTencentMeeting", {
			get: function() {
				return isWxWorkTencentMeeting(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isTencentMeetingRooms", {
			get: function() {
				return isTencentMeetingRooms(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isQClaw", {
			get: function() {
				return isQClaw(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isWorkBuddy", {
			get: function() {
				return isWorkBuddy(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isElectron", {
			get: function() {
				return isElectron(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isSupportNativeDatabase", {
			get: function() {
				return isSupportNativeDatabase(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isSupportFullOfflineMode", {
			get: function() {
				return isSupportFullOfflineMode(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isNativeDatabaseWillDeprecated", {
			get: function() {
				return isNativeDatabaseWillDeprecated(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(UserAgent.prototype, "isYuanBao", {
			get: function() {
				return isYuanBao(this.userAgent);
			},
			enumerable: false,
			configurable: true
		});
		return UserAgent;
	}();
	ua = new UserAgent();
}));
//#endregion
export { getUserAgent as A, isTencentDocsAppVersionAboveOrEqual as C, isWxMiniProgram as D, isWindows as E, isWxWork as O, isTencentDocsApp as S, isWeChat as T, isPC as _, getIOSVersion as a, isQQMiniProgram as b, isElectronTencentDocsClient as c, isMac as d, isMacAppStoreTencentDocsClient as f, isMobileQQBrowser as g, isMobilePhone as h, getAndroidVersion as i, init_util as j, isWxWorkPrivate as k, isHarmony as l, isMobile as m, init_esm as n, init_pure as o, isMiniProgram as p, ua as r, isAndroid as s, esm_exports as t, isIOS as u, isPCTencentDocsClient as v, isTimOrQQ as w, isQQMobileDocsClient as x, isQQDesktopDocsClient as y };
