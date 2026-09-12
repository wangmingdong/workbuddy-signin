require("./chunk.js");
let electron = require("electron");
//#region src/main/system/runtime/tdoc-dev-env-cookies.ts
/**
* 切回 prod 或关闭 dev-env 开关时，清除 `docs.qq.com` 域的灰度路由 cookie
* (`env_name` / `env_id`)，避免下一次请求继续被路由到 staging 灰度环境。
*
* 这是 host-owned Electron session 能力，不放在 server core-services 里。
*/
async function clearTdocDevEnvCookiesFromJar() {
	const cookieNames = ["env_name", "env_id"];
	const urls = ["https://docs.qq.com/", "https://.docs.qq.com/"];
	await Promise.all(cookieNames.flatMap((name) => urls.map((url) => electron.session.defaultSession.cookies.remove(url, name).catch(() => {}))));
}
//#endregion
exports.clearTdocDevEnvCookiesFromJar = clearTdocDevEnvCookiesFromJar;
