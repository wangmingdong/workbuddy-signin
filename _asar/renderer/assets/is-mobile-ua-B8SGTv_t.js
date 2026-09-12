import { n as __esmMin } from "./chunk-BRZcfu7K.js";
//#region ../../packages/agent-ui/src/utils/ua.ts
/**
* 是否在微信小程序内嵌 webview 中。
* 普通微信浏览器（MicroMessenger）不会注入 'miniProgram'，只有 web-view 组件
* 加载的页面 UA 才会含此关键字。
*/
function isWXMiniProgram() {
	if (typeof navigator === "undefined") return false;
	const ua = navigator.userAgent || "";
	return /miniProgram/i.test(ua);
}
var init_ua = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/share-preview/utils/is-mobile-ua.ts
/**
* userAgent 移动端判断（share-preview 公共工具）
*
* 同时被 task / artifact / OpenOrDownloadWorkBuddyButton 等多个分享页入口使用：
* - ShareTaskPreview / ShareArtifactPreview：移动端隐藏产物区（issue #40423）
* - OpenOrDownloadWorkBuddyButton：移动端直接走下载链接，跳过 deeplink 探测
*
* 设计要点：
* - 在模块加载时一次性计算（每次访问读 navigator.userAgent 也行，
*   但分享页生命周期内 UA 不会变化，缓存即可）。
* - SSR 安全：navigator 不存在时按桌面端处理（false）。
* - 同时识别 iPad（iPadOS 13+ 在 desktop mode 下 UA 不再含 "iPad"，
*   需要通过 maxTouchPoints + Mac UA 组合判断）。
*/
/**
* 是否为移动端 UA。
*
* 覆盖：iOS / Android / Windows Phone / BlackBerry / iPadOS（含桌面伪装）。
*/
function isMobileUserAgent() {
	if (typeof navigator === "undefined") return false;
	const ua = navigator.userAgent || "";
	if (/(Android|iPhone|iPod|Windows Phone|IEMobile|BlackBerry|webOS|Opera Mini|Mobile)/i.test(ua)) return true;
	if (/Macintosh/i.test(ua) && typeof navigator.maxTouchPoints === "number" && navigator.maxTouchPoints > 1) return true;
	return false;
}
var IS_MOBILE_UA;
var init_is_mobile_ua = __esmMin((() => {
	IS_MOBILE_UA = isMobileUserAgent();
}));
//#endregion
export { isWXMiniProgram as i, init_is_mobile_ua as n, init_ua as r, IS_MOBILE_UA as t };
