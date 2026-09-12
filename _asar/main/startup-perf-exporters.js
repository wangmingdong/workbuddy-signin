require("./chunk.js");
let node_crypto = require("node:crypto");
//#region src/main/features/telemetry/startup-perf-exporters.ts
/**
* StartupTelemetry Metric / Trace 出口。
*
* 复用 `DesktopMonitorService` 现成的信号出口，不另接 SDK：
* - **Metric**（2.3-B）：整启动 → `recordDuration('workbuddy.startup.total', totalMs)`，
*   E8 首屏可交互 → `recordDuration('workbuddy.startup.first_interactive', firstInteractiveMs)`，
*   各段 → `recordDuration('workbuddy.startup.phase', ms, {phase})` → Aegis。
* - **Trace**：跨进程对齐后的 mark → span 树（root=整启动，child=各 phase + 64 个 mark 点）
*   → `exportTraces` → 伽利略 /v1/traces。
*
* 仅在**持有 monitor 单例的 main 进程**调用有效；daemon 子进程无单例，须先把
* logFilePath 桥回 main 再由 main 重聚合调用（见 perf-marks.flushStartupPerf）。
* 全程吞异常，绝不阻塞启动。
*/
function createStartupTraceId() {
	return (0, node_crypto.randomBytes)(16).toString("hex");
}
function stableSpanId(traceId, ...parts) {
	return (0, node_crypto.createHash)("sha256").update([traceId, ...parts].join("\0")).digest("hex").slice(0, 16);
}
function getStartupRootSpanId(traceId) {
	return stableSpanId(traceId, "startup", "root");
}
function getStartupPhaseSpanId(traceId, phase) {
	return stableSpanId(traceId, "startup", "phase", phase || "unknown");
}
function getStartupMarkSpanId(traceId, mark) {
	return stableSpanId(traceId, "startup", "mark", mark.proc || "unknown", mark.id || "unknown", mark.key || "unknown");
}
/**
* 2.3-B · MetricExporter：整启动总耗时 + E8 首屏可交互 + 各段耗时打到 Aegis（recordDuration）。
* value 维度需 string，这里统一 String()。
*/
function exportStartupMetric(monitor, summary) {
	try {
		const appVersion = typeof monitor.getAppVersion === "function" ? monitor.getAppVersion() : void 0;
		const baseDims = {
			startup_type: String(summary.startupType),
			flow_type: String(summary.flowType),
			...appVersion ? { app_version: String(appVersion) } : {}
		};
		if (summary.totalMs > 0) monitor.recordDuration("workbuddy.startup.total", summary.totalMs, baseDims);
		if (typeof summary.firstInteractiveMs === "number" && summary.firstInteractiveMs > 0) monitor.recordDuration("workbuddy.startup.first_interactive", summary.firstInteractiveMs, baseDims);
		for (const [phase, ms] of Object.entries(summary.phases)) if (ms > 0) {
			monitor.recordDuration("workbuddy.startup.phase", ms, {
				...baseDims,
				phase
			});
			monitor.recordDuration(`workbuddy.startup.phase.${phase}`, ms, {
				...baseDims,
				phase
			});
		}
	} catch {}
}
/**
* 由对齐后的 mark 构造 span 树：root=整启动，child=各 phase，phase 下挂具体 mark 点。
* 无可定位 mark（absEpoch 全缺）时返回空数组。导出为纯函数，便于单测。
*/
function buildStartupSpans(marks, summary, target, traceId = createStartupTraceId()) {
	const located = marks.filter((m) => typeof m.absEpoch === "number").sort((a, b) => a.absEpoch - b.absEpoch);
	if (located.length === 0) return [];
	const rootSpanId = getStartupRootSpanId(traceId);
	const rootStart = Math.min(...located.map((m) => m.absEpoch));
	const rootEnd = Math.max(...located.map((m) => m.absEpoch));
	const baseAttrs = {
		"service.target": target,
		"startup.type": summary.startupType,
		"startup.flow_type": summary.flowType,
		"trpc.status_type": "success"
	};
	const spans = [{
		traceId,
		spanId: rootSpanId,
		name: "workbuddy.startup",
		kind: "internal",
		startTime: rootStart,
		endTime: rootEnd,
		attributes: {
			...baseAttrs,
			"startup.total_ms": summary.totalMs,
			...typeof summary.firstInteractiveMs === "number" ? { "startup.first_interactive_ms": summary.firstInteractiveMs } : {},
			"startup.total_marks": summary.totalMarks
		},
		status: "ok"
	}];
	const segBounds = /* @__PURE__ */ new Map();
	for (const m of located) {
		if (!m.phase) continue;
		const cur = segBounds.get(m.phase);
		if (cur) {
			cur.min = Math.min(cur.min, m.absEpoch);
			cur.max = Math.max(cur.max, m.absEpoch);
			cur.count += 1;
		} else segBounds.set(m.phase, {
			min: m.absEpoch,
			max: m.absEpoch,
			count: 1
		});
	}
	const phaseSpanIds = /* @__PURE__ */ new Map();
	for (const [phase, b] of segBounds) {
		const phaseSpanId = getStartupPhaseSpanId(traceId, phase);
		phaseSpanIds.set(phase, phaseSpanId);
		spans.push({
			traceId,
			spanId: phaseSpanId,
			parentSpanId: rootSpanId,
			name: `startup.${phase}`,
			kind: "internal",
			startTime: b.min,
			endTime: b.max,
			attributes: {
				...baseAttrs,
				"startup.phase": phase,
				"startup.phase_marks": b.count
			},
			status: "ok"
		});
	}
	const previousMarkByProc = /* @__PURE__ */ new Map();
	for (const m of located) {
		const prev = previousMarkByProc.get(m.proc);
		const markStart = prev?.absEpoch ?? m.absEpoch;
		const durationMs = Math.round((m.absEpoch - markStart) * 100) / 100;
		previousMarkByProc.set(m.proc, m);
		spans.push({
			traceId,
			spanId: getStartupMarkSpanId(traceId, m),
			parentSpanId: phaseSpanIds.get(m.phase) ?? rootSpanId,
			name: `startup.mark.${m.id || "unknown"}.${m.key || "unknown"}`,
			kind: "internal",
			startTime: markStart,
			endTime: m.absEpoch,
			attributes: {
				...baseAttrs,
				"startup.mark.id": m.id,
				"startup.mark.key": m.key,
				"startup.mark.duration_ms": durationMs,
				...prev ? { "startup.mark.prev_id": prev.id } : {},
				"startup.phase": m.phase,
				"startup.proc": m.proc
			},
			...m.id === "E8" ? { events: [{
				name: "首屏可交互",
				timestamp: m.absEpoch,
				attributes: {
					"startup.mark.id": m.id,
					"startup.mark.key": m.key,
					"startup.first_interactive": true
				}
			}] } : {},
			status: "ok"
		});
	}
	return spans;
}
/**
* 2.3-C · TraceExporter：把一次启动的 span 树上报伽利略。
*/
async function exportStartupTrace(monitor, session, traceId) {
	try {
		const target = monitor.getGalileoTarget();
		const spans = buildStartupSpans(session.marks, session.summary, target, traceId);
		if (spans.length === 0) return;
		await monitor.exportTraces(spans);
	} catch {}
}
//#endregion
Object.defineProperty(exports, "createStartupTraceId", {
	enumerable: true,
	get: function() {
		return createStartupTraceId;
	}
});
Object.defineProperty(exports, "exportStartupMetric", {
	enumerable: true,
	get: function() {
		return exportStartupMetric;
	}
});
Object.defineProperty(exports, "exportStartupTrace", {
	enumerable: true,
	get: function() {
		return exportStartupTrace;
	}
});
Object.defineProperty(exports, "getStartupMarkSpanId", {
	enumerable: true,
	get: function() {
		return getStartupMarkSpanId;
	}
});
Object.defineProperty(exports, "getStartupRootSpanId", {
	enumerable: true,
	get: function() {
		return getStartupRootSpanId;
	}
});
