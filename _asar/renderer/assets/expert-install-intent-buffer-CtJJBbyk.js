import { n as __esmMin } from "./chunk-BRZcfu7K.js";
//#region ../../packages/agent-ui/src/utils/expert-install-intent-buffer.ts
function getState() {
	const g = globalThis;
	if (!g[GLOBAL_KEY]) g[GLOBAL_KEY] = {
		intent: null,
		listeners: /* @__PURE__ */ new Set()
	};
	return g[GLOBAL_KEY];
}
/** 缓冲专家导入 intent，避免 deep link 早于 React 后台服务挂载时事件丢失。 */
function setPendingExpertInstallIntent(intent) {
	if (!intent.expertName || !intent.shareCode) return;
	const state = getState();
	state.intent = intent;
	const snapshot = Array.from(state.listeners);
	for (const listener of snapshot) try {
		listener(intent);
		if (state.intent === intent) state.intent = null;
	} catch {}
}
/** 订阅专家导入 intent；订阅时会立即回放并消费挂起的 intent。 */
function subscribePendingExpertInstallIntent(listener) {
	const state = getState();
	state.listeners.add(listener);
	if (state.intent) {
		const intent = state.intent;
		state.intent = null;
		try {
			listener(intent);
		} catch {}
	}
	return () => {
		state.listeners.delete(listener);
	};
}
var GLOBAL_KEY;
var init_expert_install_intent_buffer = __esmMin((() => {
	GLOBAL_KEY = "__GENIE_PENDING_EXPERT_INSTALL_INTENT__";
}));
//#endregion
export { setPendingExpertInstallIntent as n, subscribePendingExpertInstallIntent as r, init_expert_install_intent_buffer as t };
