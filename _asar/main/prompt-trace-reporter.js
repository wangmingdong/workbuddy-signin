require("./chunk.js");
//#region src/main/features/monitor/prompt-trace-reporter.ts
async function getDesktopMonitorService() {
	try {
		return (await Promise.resolve().then(() => require("./desktop-monitor-service2.js"))).DesktopMonitorService;
	} catch {
		return;
	}
}
/** 「main 即将发给 cli」瞬时事件，与其他事件 timestamp 差可推算 main 内部 / cli 段耗时。 */
function reportPromptForwardingEvent(payload) {
	getDesktopMonitorService().then((DesktopMonitorService) => {
		if (!DesktopMonitorService) return;
		DesktopMonitorService.getSharedInstance()?.reportAegisEvent("wb_main_prompt_forwarding", {
			ext1: payload.promptRequestId,
			ext2: payload.conversationId,
			...payload.traceId ? {
				ext3: payload.traceId,
				trace: payload.traceId
			} : {},
			prompt_request_id: payload.promptRequestId,
			conversation_id: payload.conversationId,
			uid: payload.userId
		});
	}).catch(() => void 0);
}
/** 「main 转发完成」事件（成功/失败均上报），带耗时与错误信息。 */
function reportPromptDoneEvent(payload) {
	getDesktopMonitorService().then((DesktopMonitorService) => {
		if (!DesktopMonitorService) return;
		const durationMs = Date.now() - payload.mainReceiveTime;
		const eventName = payload.ok ? "wb_main_prompt_done" : "wb_main_prompt_failed";
		const resolvedTraceId = payload.cliTraceId ?? payload.traceId;
		DesktopMonitorService.getSharedInstance()?.reportAegisEvent(eventName, {
			ext1: payload.promptRequestId,
			ext2: payload.conversationId,
			...resolvedTraceId ? { ext3: resolvedTraceId } : {},
			prompt_request_id: payload.promptRequestId,
			conversation_id: payload.conversationId,
			uid: payload.userId,
			duration_ms: durationMs,
			ok: payload.ok ? 1 : 0,
			...resolvedTraceId ? { trace: resolvedTraceId } : {},
			...payload.outcome ? { outcome: payload.outcome } : {},
			...payload.errorMessage ? { error_message: payload.errorMessage } : {}
		});
	}).catch(() => void 0);
}
/**
* @deprecated `renderer.send-prompt` span 已退休：其覆盖的 renderer→main 区间
* 已由 `renderer.prompt.prepare`/`transport_sent`（agent-ui 全链路 OTel 体系）
* 间接覆盖，且该 span 无 parentSpanId、未挂到 `renderer.prompt.send` root span
* 下，属于同 trace 下孤立节点，保留意义不大。当前整段直接 noop，仅为兼容
* 现有调用方签名（daemon-bootstrap / app-server-events / workbuddy-server 均
* 有引用），后续可评估整体下掉本函数及相关 RPC 通道。
*/
async function reportPromptTrace(_payload) {}
//#endregion
exports.reportPromptDoneEvent = reportPromptDoneEvent;
exports.reportPromptForwardingEvent = reportPromptForwardingEvent;
exports.reportPromptTrace = reportPromptTrace;
