require("../chunk.js");
let electron = require("electron");
//#region src/main/window/splash/splash-preload.ts
/**
* Splash window preload
*
* Exposes a tiny, isolated API to the splash HTML:
*   window.splashAPI.onUpdate(handler)  — subscribe to progress updates
*   window.splashAPI.getLogoDataUrl()    — async fetch of base64 logo
*
* Keep this file dependency-free — it's loaded by a minimal BrowserWindow
* that must render instantly, and must not pull in any of the main app's
* heavy modules.
*/
var UPDATE_CHANNEL = "splash:update";
var GET_LOGO_CHANNEL = "splash:getLogo";
var GET_LAST_UPDATE_CHANNEL = "splash:getLastUpdate";
var handlers = [];
electron.ipcRenderer.on(UPDATE_CHANNEL, (_event, update) => {
	for (const h of handlers) try {
		h(update);
	} catch {}
});
electron.contextBridge.exposeInMainWorld("splashAPI", {
	onUpdate(handler) {
		handlers.push(handler);
		return () => {
			const idx = handlers.indexOf(handler);
			if (idx >= 0) handlers.splice(idx, 1);
		};
	},
	getLastUpdate() {
		return electron.ipcRenderer.invoke(GET_LAST_UPDATE_CHANNEL).catch(() => null);
	},
	getLogoDataUrl() {
		return electron.ipcRenderer.invoke(GET_LOGO_CHANNEL).catch(() => null);
	}
});
//#endregion
