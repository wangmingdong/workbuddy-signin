//#region ../../packages/workbuddy-server/src/perf/startup-context.ts
/** 下传给 fork 子进程的 env key —— main spawn daemon 时注入，daemon 早期读取。 */
var STARTUP_CONTEXT_ENV = {
	PID: "WORKBUDDY_STARTUP_PID",
	DATE: "WORKBUDDY_STARTUP_DATE",
	TIME: "WORKBUDDY_STARTUP_TIME"
};
var current;
/** performance.timeOrigin 不可用时退化为 Date.now()（保证 telemetry best-effort）。 */
function safeTimeOrigin() {
	try {
		return performance.timeOrigin;
	} catch {
		return Date.now();
	}
}
/** 本地时区 `YYYY-MM-DD`（用于日期目录名，与 mtime 无关）。 */
function formatStartupDate(date = /* @__PURE__ */ new Date()) {
	const pad = (n) => String(n).padStart(2, "0");
	return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}
/** 本地时区 `HHmmss`（用于文件名 `<pid>-<time>.jsonl`，与 mtime 无关）。 */
function formatStartupTime(date = /* @__PURE__ */ new Date()) {
	const pad = (n) => String(n).padStart(2, "0");
	return `${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;
}
function getStartupContext() {
	return current;
}
function setStartupContext(ctx) {
	current = ctx;
	return ctx;
}
/** main 进程建会话：pid=自身，date/time=此刻，proc=main。幂等：重复调用覆盖为最新。 */
function initMainStartupContext() {
	const now = /* @__PURE__ */ new Date();
	return setStartupContext({
		pid: process.pid,
		date: formatStartupDate(now),
		time: formatStartupTime(now),
		proc: "main",
		timeOrigin: safeTimeOrigin()
	});
}
/**
* fork 出的子进程（daemon）从 env 恢复 main 传来的 pid/date。
*
* env 缺失/非法时退化为「自身 pid + 当前时间」——保证仍能落盘，代价是可能与 main
* 分裂到另一个启动文件；main 聚合通常无法自动合并该分片，只能作为 best-effort 证据保留。
*/
function initStartupContextFromEnv(proc) {
	const envPid = Number(process.env[STARTUP_CONTEXT_ENV.PID]);
	const envDate = process.env[STARTUP_CONTEXT_ENV.DATE];
	const envTime = process.env[STARTUP_CONTEXT_ENV.TIME];
	const validDate = typeof envDate === "string" && /^\d{4}-\d{2}-\d{2}$/.test(envDate);
	const validTime = typeof envTime === "string" && /^\d{6}$/.test(envTime);
	const now = /* @__PURE__ */ new Date();
	return setStartupContext({
		pid: Number.isFinite(envPid) && envPid > 0 ? envPid : process.pid,
		date: validDate ? envDate : formatStartupDate(now),
		time: validTime ? envTime : formatStartupTime(now),
		proc,
		timeOrigin: safeTimeOrigin()
	});
}
/**
* 构造下传给 fork 子进程的 env 片段（main 侧 spawn daemon 时并入）。
* 未初始化时兜底先建 main context，保证总能拿到 pid/date。
*/
function buildStartupContextEnv() {
	const ctx = current ?? initMainStartupContext();
	return {
		[STARTUP_CONTEXT_ENV.PID]: String(ctx.pid),
		[STARTUP_CONTEXT_ENV.DATE]: ctx.date,
		[STARTUP_CONTEXT_ENV.TIME]: ctx.time
	};
}
//#endregion
Object.defineProperty(exports, "buildStartupContextEnv", {
	enumerable: true,
	get: function() {
		return buildStartupContextEnv;
	}
});
Object.defineProperty(exports, "getStartupContext", {
	enumerable: true,
	get: function() {
		return getStartupContext;
	}
});
Object.defineProperty(exports, "initMainStartupContext", {
	enumerable: true,
	get: function() {
		return initMainStartupContext;
	}
});
Object.defineProperty(exports, "initStartupContextFromEnv", {
	enumerable: true,
	get: function() {
		return initStartupContextFromEnv;
	}
});
