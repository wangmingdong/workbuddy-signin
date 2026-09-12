import { n as __esmMin } from "./chunk-BRZcfu7K.js";
//#region ../../packages/agent-ui/src/components/main-content-core/utils/cancel-barrier.ts
/**
* 设置屏障：从 now 起 CANCEL_BARRIER_MS 内 isBarrierActive 返回 true。
* 必须在任何 await 之前同步调用，否则 race 期间新 prompt 可能漏过屏障。
*/
function armCancelBarrier(ref, now = Date.now()) {
	ref.current = now + 500;
}
/**
* 清除屏障：将 ref.current 置为 0。
* 用户主动发送新消息的路径应同步首行调用此函数，避免屏障误伤合法输入。
*/
function clearCancelBarrier(ref) {
	ref.current = 0;
}
/**
* 判定屏障是否仍在生效窗口内。
* 严格大于，窗口末尾时刻视为已失效（与后端 isCancelBarrierActive 的严格小于语义对称）。
*/
function isBarrierActive(ref, now = Date.now()) {
	return ref.current > now;
}
var init_cancel_barrier = __esmMin((() => {}));
//#endregion
export { isBarrierActive as i, clearCancelBarrier as n, init_cancel_barrier as r, armCancelBarrier as t };
