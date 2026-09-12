import { n as __esmMin } from "./chunk-BRZcfu7K.js";
//#region ../../packages/agent-ui/src/app-core/index.ts
/**
* 启动期注入 SDK 单例。各端 provider 组装好 domains 后调用：
* `initAppCore(createWorkbuddySDK({ domains, platform }))`。
*
* 幂等：重复调用会覆盖（HMR / 多次初始化场景安全）。
*/
function initAppCore(sdk) {
	_wb = sdk;
	if (typeof globalThis !== "undefined") globalThis.wb = sdk;
}
/**
* 是否已初始化。模块在不确定启动顺序时可先判一下。
*/
function isAppCoreReady() {
	return _wb !== void 0;
}
/**
* 获取 SDK 单例。未初始化时抛错（提示调用方启动顺序问题）。
* 大多数消费方直接用 `import { wb }` 即可，无需调本函数。
*/
function getWb() {
	if (!_wb) throw new Error("[app-core] WorkbuddySDK 尚未初始化，请确认 provider 启动时已调用 initAppCore()");
	return _wb;
}
var _wb, wb;
var init_app_core = __esmMin((() => {
	wb = new Proxy({}, {
		get(_target, prop, receiver) {
			return Reflect.get(getWb(), prop, receiver);
		},
		has(_target, prop) {
			return Reflect.has(getWb(), prop);
		}
	});
}));
//#endregion
export { wb as a, isAppCoreReady as i, initAppCore as n, init_app_core as r, getWb as t };
