const require_chunk = require("./chunk.js");
const require_runtime_context = require("./runtime-context.js");
const require_workbuddy_product_config = require("./workbuddy-product-config.js");
const require_startup_context = require("./startup-context.js");
const require_src$1 = require("./src.js");
const require_logger = require("./logger2.js");
let path = require("path");
path = require_chunk.__toESM(path);
let node_fs = require("node:fs");
node_fs = require_chunk.__toESM(node_fs);
let node_path = require("node:path");
node_path = require_chunk.__toESM(node_path);
let node_worker_threads = require("node:worker_threads");
//#region ../../packages/workbuddy-server/src/perf/logger.ts
/**
* Performance Logger
*
* Records performance marks to JSONL files for tracing flow durations.
*
* This logger is the single writer for perf log files. Main/app-server callers
* and renderer callers via RPC relay write through this module.
*/
var PerfFlow = {
	SESSION_CREATION: "session-creation",
	SESSION_LOAD: "session-load",
	STARTUP: "startup"
};
var WorkbuddyPerfLogger = class {
	flowType;
	startTime;
	logFilePath;
	marks = [];
	phaseStartTimes = /* @__PURE__ */ new Map();
	summaryWritten = false;
	/** 距上一条 mark 的计时锚（算 delta 用），初始为进程内 startTime。 */
	lastMarkTime;
	/** startup flow 的跨进程会话身份；非 startup flow / context 未就位时为 undefined。 */
	startupCtx;
	constructor(flowType) {
		this.flowType = flowType;
		this.startTime = performance.now();
		this.lastMarkTime = this.startTime;
		this.startupCtx = flowType === PerfFlow.STARTUP ? require_startup_context.getStartupContext() : void 0;
		this.logFilePath = this.resolveLogFilePath(flowType, this.startupCtx);
	}
	/**
	* 解析落盘路径。
	* - startup flow 且 context 就位：`logs/startup/<date>/<pid>-<time>.jsonl`
	*   —— **一次启动一个文件**（pid=main pid 天然隔离不同启动，time=HHmmss 便于人读/排序）。
	*   各进程（main 直写、daemon 直写、preload/renderer relay 到 daemon）都 append 到这同一个
	*   文件；每行自带 `proc`/`source` 字段区分来源，聚合按行内字段归类（见 startup-perf-aggregator）。
	*   pid/time 均取自跨进程一致的 StartupContext，保证四进程落到同一文件。
	*   跨进程并发 append 在本地 FS 上按行原子（每条 mark 一次 write），不会串行/损坏。
	* - 其余（非 startup / context 未就位）：沿用 `logs/perf/<flowType>-<ts>.jsonl` 扁平命名。
	*/
	resolveLogFilePath(flowType, ctx) {
		if (ctx) {
			const dir = require_runtime_context.getWorkbuddyRuntimeLogsDir("startup", ctx.date);
			this.ensureDir(dir);
			return node_path.join(dir, `${ctx.pid}-${ctx.time}.jsonl`);
		}
		const logDir = require_runtime_context.getWorkbuddyRuntimeLogsDir("perf");
		this.ensureDir(logDir);
		const ts = this.formatTimestamp(/* @__PURE__ */ new Date());
		return node_path.join(logDir, `${flowType}-${ts}.jsonl`);
	}
	/**
	* Get the log file path (used by renderer RPC relay to write to the same file)
	*/
	getLogFilePath() {
		return this.logFilePath;
	}
	/**
	* Record a performance mark
	*/
	mark(phase, data) {
		const now = performance.now();
		const epochMs = Date.now();
		const elapsed = now - this.startTime;
		const delta = now - this.lastMarkTime;
		this.lastMarkTime = now;
		const mark = {
			timestamp: now,
			epochMs,
			phase,
			elapsed: Math.round(elapsed * 100) / 100,
			delta: Math.round(delta * 100) / 100,
			source: this.startupCtx?.proc ?? "main",
			...this.startupCtx ? {
				pid: this.startupCtx.pid,
				proc: this.startupCtx.proc,
				timeOrigin: this.startupCtx.timeOrigin
			} : {},
			...data ? { data } : {}
		};
		this.marks.push(mark);
		this.appendLine(JSON.stringify({
			_type: "mark",
			...mark
		}));
	}
	/**
	* 记录一条「绝对时刻」mark：只带 `epochMs`（墙上时钟），**不带 timestamp/elapsed/delta**。
	*
	* 用于表达一个**过去的、已知 epoch 的时刻**（如进程创建 `process.getCreationTime()`），
	* 它不是"现在采样"的 (performance.now, Date.now) 对，因此若按普通 mark 写会污染对齐/段耗时：
	* - 不带 `timestamp` → 聚合器 `computeClockOffsets` 跳过它（不污染本进程 offset 中位数），
	*   `markAbsEpoch` 直接用它的 `epochMs` 作为绝对时间轴坐标；
	* - 不带 `elapsed` → 聚合器段内 max-min 跳过它（不扭曲段时长）；
	* - 不 push 进 `this.marks`（本进程 summary 用 timestamp 算，A0 无 timestamp 不参与）。
	*
	* 全程吞异常——绝不阻塞启动。
	*/
	markAbsolute(phase, epochMs, data) {
		const mark = {
			_type: "mark",
			epochMs,
			phase,
			source: this.startupCtx?.proc ?? "main",
			...this.startupCtx ? {
				pid: this.startupCtx.pid,
				proc: this.startupCtx.proc,
				timeOrigin: this.startupCtx.timeOrigin
			} : {},
			...data ? { data } : {}
		};
		this.appendLine(JSON.stringify(mark));
	}
	/**
	* Mark phase start
	*/
	startPhase(phaseName) {
		this.phaseStartTimes.set(phaseName, performance.now());
		this.mark(`${phaseName}_start`);
	}
	/**
	* Mark phase end, returns duration in ms
	*/
	endPhase(phaseName) {
		const start = this.phaseStartTimes.get(phaseName) ?? this.startTime;
		const duration = performance.now() - start;
		this.mark(`${phaseName}_end`, { durationMs: Math.round(duration) });
		this.phaseStartTimes.delete(phaseName);
		return duration;
	}
	/**
	* Append a raw JSONL line from renderer (RPC relay)
	*/
	appendRendererLine(jsonLine) {
		this.appendLine(jsonLine.trimEnd());
	}
	/**
	* Write summary and finalize the log file
	*/
	flush() {
		if (this.summaryWritten) return;
		const summary = this.getSummary();
		this.appendLine(JSON.stringify({
			_type: "summary",
			...summary
		}));
		this.summaryWritten = true;
	}
	getSummary() {
		const phases = {};
		const starts = /* @__PURE__ */ new Map();
		for (const m of this.marks) if (m.phase.endsWith("_start")) {
			const name = m.phase.slice(0, -6);
			starts.set(name, {
				time: m.timestamp,
				count: (starts.get(name)?.count ?? 0) + 1
			});
		} else if (m.phase.endsWith("_end")) {
			const name = m.phase.slice(0, -4);
			const s = starts.get(name);
			if (s) phases[name] = {
				durationMs: m.data?.durationMs ?? Math.round(m.timestamp - s.time),
				markCount: s.count + 1
			};
		}
		return {
			flowType: this.flowType,
			totalDurationMs: Math.round(performance.now() - this.startTime),
			totalMarks: this.marks.length,
			phases
		};
	}
	appendLine(line) {
		try {
			const timestamped = `[${(/* @__PURE__ */ new Date()).toISOString()}] ${line}`;
			node_fs.appendFileSync(this.logFilePath, `${timestamped}\n`, "utf-8");
		} catch {}
	}
	ensureDir(dir) {
		try {
			if (!node_fs.existsSync(dir)) node_fs.mkdirSync(dir, { recursive: true });
		} catch {}
	}
	formatTimestamp(date) {
		const pad = (n) => String(n).padStart(2, "0");
		return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}-${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;
	}
};
var perfLoggers = /* @__PURE__ */ new Map();
/**
* Get or create a perf logger for a specific flow type.
* Same flowType always returns the same instance.
*/
function getWorkbuddyPerfLogger(flowType) {
	if (!perfLoggers.has(flowType)) perfLoggers.set(flowType, new WorkbuddyPerfLogger(flowType));
	return perfLoggers.get(flowType);
}
/**
* 清理超过 keepDays 天的 startup 遥测日期目录（`logs/startup/<YYYY-MM-DD>/`）。
*
* 按**目录名日期**判定，不依赖 mtime——删整天目录连同其下所有 pid 分片。
* 只在 main 进程启动早期调一次即可（子进程不必重复）。全程吞异常，绝不阻塞启动。
*/
function cleanupOldStartupLogs(keepDays = 5) {
	try {
		const root = require_runtime_context.getWorkbuddyRuntimeLogsDir("startup");
		if (!node_fs.existsSync(root)) return;
		const cutoff = Date.now() - keepDays * 864e5;
		for (const dayDir of node_fs.readdirSync(root)) {
			const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dayDir);
			if (!m) continue;
			const t = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])).getTime();
			if (Number.isFinite(t) && t < cutoff) node_fs.rmSync(node_path.join(root, dayDir), {
				recursive: true,
				force: true
			});
		}
	} catch {}
}
//#endregion
//#region src/main/features/logs/package-and-show-log.ts
require_workbuddy_product_config.init_workbuddy_product_config();
/** Default: only include logs from the last N days. */
var MAX_LOG_AGE_DAYS = 1;
/**
* Resolve the worker script path.
*
* In development the TS source lives next to this file; after compilation
* the JS output is emitted to the same relative location under dist/.
*/
function resolveWorkerScript() {
	return node_path.join(__dirname, "package-log-worker.js");
}
/**
* Package log directories into a zip archive and return the archive path.
*
* The CPU-intensive staging + zip compression runs in a **worker thread** so
* the Electron main process stays responsive.
*
* Unlike {@link packageAndShowLog}, this helper does *not* reveal the file in
* the OS file manager — callers that want to attach the archive programmatically
* (e.g. the user-feedback submission path) can use this directly.
*
* @param logsDir  Primary logs directory (electron-log output).
* @param options  Extra directories, age window, or todayOnly flag.
* @returns        Absolute path to the produced zip archive.
*/
async function packageLogs(logsDir, options = {}) {
	if (!logsDir) throw new Error("[packageLogs] Logs directory is empty");
	const { extraLogDirs, maxAgeDays = MAX_LOG_AGE_DAYS, todayOnly = false } = options;
	require_logger.mainLog.info("[packageLogs] Starting log archive in worker thread", {
		logsDir,
		extraLogDirs,
		maxAgeDays,
		todayOnly
	});
	const workerScript = resolveWorkerScript();
	return await new Promise((resolve, reject) => {
		const product = require_workbuddy_product_config.tryGetWorkbuddyBaseProductConfiguration();
		const archivePrefix = product?.applicationName || "workbuddy-desktop";
		const darwinBundleIdentifier = product?.darwinBundleIdentifier;
		const worker = new node_worker_threads.Worker(workerScript, { workerData: {
			logsDir,
			extraLogDirs,
			maxAgeDays,
			todayOnly,
			archivePrefix,
			darwinBundleIdentifier: typeof darwinBundleIdentifier === "string" ? darwinBundleIdentifier : void 0,
			executablePath: process.execPath
		} });
		worker.on("message", (msg) => {
			if (msg.ok && msg.zipPath) resolve(msg.zipPath);
			else reject(new Error(msg.error ?? "Worker failed without error message"));
		});
		worker.on("error", (error) => {
			require_logger.mainLog.error("[packageLogs] Worker thread error", error);
			reject(error);
		});
		worker.on("exit", (code) => {
			if (code !== 0) reject(/* @__PURE__ */ new Error(`Log archive worker exited with code ${code}`));
		});
	});
}
/**
* Package log directories into a zip archive and reveal it in the file manager.
*
* Thin wrapper over {@link packageLogs} used by the "Open Logs Folder" command.
*
* @param logsDir       Primary logs directory (electron-log output).
* @param platform      Platform services for showItemInFolder.
* @param extraLogDirs  Additional log directories to include (e.g. CLI sidecar logs at ~/.workbuddy/logs).
*/
async function packageAndShowLog(logsDir, platform, extraLogDirs) {
	if (!logsDir) {
		require_logger.mainLog.warn("[packageAndShowLog] Logs directory is empty");
		return;
	}
	const zipPath = await packageLogs(logsDir, { extraLogDirs });
	require_logger.mainLog.info("[packageAndShowLog] Archive created, revealing in file manager", { zipPath });
	platform.showItemInFolder(zipPath);
}
//#endregion
//#region src/main/features/logs/app-startup-logger.ts
var import_src = /* @__PURE__ */ require_chunk.__toESM(require_src$1.require_src());
require_workbuddy_product_config.init_workbuddy_product_config();
var APP_STARTUP_LOG_ID = "appstartup";
var APP_STARTUP_LOG_FILE = "AppStartup.log";
var cachedLogger;
var userIdProvider;
/**
* 注入 userId provider。设计成 lazy 函数而非静态值，是因为：
* - 用户可能登出再登入，userId 会变；
* - 启动早期 auth 没就绪，注入时机和首次取值时机往往是分离的。
*
* 任意时刻只保留最后一次注入的 provider；传 `undefined` 视为撤销。
*/
function setUserIdProvider(provider) {
	userIdProvider = provider;
}
/**
* 把 Date 格式化成 ISO 8601 本地时间字符串，带时区偏移。
*
* 例：上海 2026-05-08 16:24:31.123 → `"2026-05-08T16:24:31.123+08:00"`
*
* 为何不用 `Date.prototype.toISOString()`：
*   `toISOString()` 永远输出 UTC（`...Z` 后缀），用户排查问题时还要心算时差。
*
* 为何不用 `Intl.DateTimeFormat` / `toLocaleString`：
*   它们的输出格式不严格符合 ISO 8601（分隔符、零填充、毫秒、时区写法都因
*   locale 而异），不利于解析和稳定 grep。
*
* 这里手动拼字段，保证：
*   - 严格 ISO 8601：`YYYY-MM-DDTHH:mm:ss.SSS±HH:MM`
*   - 始终零填充
*   - 时区偏移用 `±HH:MM`（不是 `±HHMM`），与 RFC 3339 兼容
*   - 半小时偏移地区（印度 +05:30、纽芬兰 -03:30）也能正确表达
*/
function formatLocalIsoTimestamp(date) {
	const pad = (n, width = 2) => String(n).padStart(width, "0");
	const year = date.getFullYear();
	const month = pad(date.getMonth() + 1);
	const day = pad(date.getDate());
	const hour = pad(date.getHours());
	const minute = pad(date.getMinutes());
	const second = pad(date.getSeconds());
	const ms = pad(date.getMilliseconds(), 3);
	const tzOffsetMinutes = -date.getTimezoneOffset();
	const sign = tzOffsetMinutes >= 0 ? "+" : "-";
	const absMinutes = Math.abs(tzOffsetMinutes);
	return `${year}-${month}-${day}T${hour}:${minute}:${second}.${ms}${sign}${pad(Math.floor(absMinutes / 60))}:${pad(absMinutes % 60)}`;
}
function createAppStartupLogger() {
	const appStartupLog = import_src.default.create({ logId: APP_STARTUP_LOG_ID });
	appStartupLog.transports.file.fileName = APP_STARTUP_LOG_FILE;
	appStartupLog.transports.file.resolvePathFn = () => path.join(require_runtime_context.getWorkbuddyRuntimeLogsDir(), APP_STARTUP_LOG_FILE);
	appStartupLog.transports.file.maxSize = 5 * 1024 * 1024;
	appStartupLog.transports.file.format = ({ message }) => {
		const body = message.data.map((d) => typeof d === "string" ? d : String(d)).join(" ");
		return [`${formatLocalIsoTimestamp(message.date instanceof Date ? message.date : /* @__PURE__ */ new Date())} ${body}`];
	};
	appStartupLog.transports.console.level = false;
	if (appStartupLog.transports.ipc) appStartupLog.transports.ipc.level = false;
	if (appStartupLog.transports.remote) appStartupLog.transports.remote.level = false;
	return appStartupLog;
}
function getLogger() {
	if (!cachedLogger) cachedLogger = createAppStartupLogger();
	return cachedLogger;
}
function safe(fn) {
	try {
		return fn();
	} catch {
		return;
	}
}
/**
* 采集当前进程的环境字段。所有取值失败时返回 'unknown'，保证日志永远可打印。
*
* 每次调用都会重新跑一遍 provider —— uptime / userId 等会随时间变化的字段
* 必须实时取，不能缓存。
*/
function collectEnvFields() {
	const product = safe(() => require_workbuddy_product_config.tryGetWorkbuddyBaseProductConfiguration());
	const channel = product?.networkEnvironment ?? "unknown";
	const productConfigType = product?.platform ?? "unknown";
	let userId = "unknown";
	if (userIdProvider) {
		const got = safe(() => userIdProvider());
		if (got && got.length > 0) userId = got;
	}
	return {
		appName: safe(() => require_runtime_context.getWorkbuddyRuntimeAppName()) ?? "unknown",
		appVersion: safe(() => require_runtime_context.getWorkbuddyRuntimeAppVersion()) ?? "unknown",
		build: safe(() => require_workbuddy_product_config.tryGetWorkbuddyProductCommit()) ?? "unknown",
		platform: process.platform,
		arch: process.arch,
		electron: process.versions.electron ?? "unknown",
		node: process.versions.node ?? "unknown",
		chrome: process.versions.chrome ?? "unknown",
		channel,
		productConfigType,
		userId,
		uptimeSec: Math.floor(process.uptime())
	};
}
/**
* 将字段按插入顺序序列化成 `k=v k=v` 单行。
*
* 值里如果出现空格 / `=` 会破坏 grep，这里用一份保守的转义：
* - 出现 ` `、`=`、`"`、换行时，包一层双引号并把内部双引号转义为 `\"`。
* - 简单值原样输出。
*
* 不覆盖 JSON 全部转义规则——这里输出的目标是日志而非反序列化。
*/
function formatLine(tag, fields) {
	const parts = [`[${tag}]`];
	for (const [key, raw] of Object.entries(fields)) {
		const value = String(raw);
		const escaped = /[\s="\n\r]/.test(value) ? `"${value.replace(/"/g, "\\\"").replace(/\n/g, "\\n").replace(/\r/g, "\\r")}"` : value;
		parts.push(`${key}=${escaped}`);
	}
	return parts.join(" ");
}
/**
* 打一条生命周期日志。
*
* - `tag` 直接作为方括号内的标签（不要带 `[]`）；常见取值：
*   `AppStartup`、`AppShutdown`、`AuthReady`、`WindowFocus`、`WindowBlur`、
*   `WindowHide`、`SessionSwitch`、`MenuSwitch`。
* - `extra` 会与 `collectEnvFields()` 合并，**extra 优先**。需要在标准字段
*   之外补充上下文（例如关闭原因 / 目标会话 ID）时通过它传入。
*
* 所有异常吞掉，永不阻塞调用方。
*/
function logLifecycleEvent(tag, extra) {
	try {
		const line = formatLine(tag, {
			...collectEnvFields(),
			...extra ?? {}
		});
		getLogger().info(line);
	} catch {}
}
/** 启动时调用一次，写入 AppStartup.log。所有异常吞掉，绝不阻塞启动。 */
function logAppStartup() {
	logLifecycleEvent("AppStartup", { source: "app_startup" });
}
/**
* 把一次启动性能 summary 以 `[Perf]` 行并入 AppStartup.log（通道 B 落点）。
*
* 复用 `logLifecycleEvent('Perf', ...)`，因此自动带上 appVersion / build / platform /
* arch / userId / ISO 本地时间等环境字段，无需重复采集。
*
* 输出形如：
*   `2026-06-14T17:51:00.123+08:00 [Perf] appVersion=... userId=... startup_type=cold
*    total_ms=4210 total_marks=37 phase_A_process_ms=820 phase_B_bootstrap_ms=1823 ...`
*
* 各 phase 展开成 `phase_<name>_ms=<n>`，CI / grep 友好。所有异常吞掉。
*/
function logStartupPerf(summary) {
	try {
		const extra = {
			startup_type: summary.startupType,
			flow_type: summary.flowType,
			total_ms: summary.totalMs,
			...typeof summary.firstInteractiveMs === "number" ? { first_interactive_ms: summary.firstInteractiveMs } : {},
			total_marks: summary.totalMarks
		};
		for (const [phase, durationMs] of Object.entries(summary.phases)) extra[`phase_${phase}_ms`] = durationMs;
		logLifecycleEvent("Perf", extra);
	} catch {}
}
//#endregion
//#region ../../packages/workbuddy-server/src/perf/marks.ts
/**
* Startup Performance Marks — 单一真相 schema
*
* 定义桌面端首屏启动链路的 64 个标准打点，按 6 个 Phase 分组：
*   A 进程启动     （process spawn → app.whenReady）         A0~A9
*   B bootstrap   （平台/DB/daemon 桥接/wsRpc/后台服务）      B1~B15
*   C 窗口创建     （WindowManager → BrowserWindow → show）   C1~C7
*   D preload     （preload 注入 → __bootstrap → RPC 就绪）   D1~D5
*   E renderer    （renderer 加载 → adapter 就绪 → 首屏可交互）E1~E8
*   F daemon      （daemon 子进程 + main 观测 daemon RPC）    F1~F19（与 C/D/E 并行）
*
* A/B/C 段在主进程打点（index.ts + main-bootstrap.ts + window-manager.ts），
* D 段在 preload、E 段在 renderer，经 daemon perf RPC（perf:appendLine，
* flowType='startup'）写入同一条 startup JSONL。main 侧拿到 logFilePath 后重新聚合，
* 再输出 summary / per-mark log / metric / trace。
*
* ⚠️ 这是双端共享的单一真相（main / preload / renderer 都从这里取 id/phase/key）。
* 放在 workbuddy-server/perf 是因为它是 perf logger 基建所在地，且 desktop 与
* workbuddy-app 都依赖 workbuddy-server（依赖方向干净，避免 app 反向依赖 desktop）。
*
* 节点 id / phase 归属以本表为准，调用方一律引用这里的常量，不写裸字符串。
* schema 共建：jshzhang × zochen × stanwei × dicky。
*/
/** Phase 分组标识（与 summary 里的 phase key 对齐）。 */
var PerfPhase = {
	A: "A_process",
	B: "B_bootstrap",
	C: "C_window",
	D: "D_preload",
	E: "E_renderer",
	F: "F_daemon"
};
var STARTUP_MARKS = {
	A0: {
		id: "A0",
		phase: PerfPhase.A,
		key: "process_created"
	},
	A1: {
		id: "A1",
		phase: PerfPhase.A,
		key: "process_started"
	},
	A2: {
		id: "A2",
		phase: PerfPhase.A,
		key: "imports_completed"
	},
	A3: {
		id: "A3",
		phase: PerfPhase.A,
		key: "bundled_assets_root_set"
	},
	A4: {
		id: "A4",
		phase: PerfPhase.A,
		key: "logger_configured"
	},
	A5: {
		id: "A5",
		phase: PerfPhase.A,
		key: "crash_writer_installed"
	},
	A6: {
		id: "A6",
		phase: PerfPhase.A,
		key: "shell_env_loaded"
	},
	A7: {
		id: "A7",
		phase: PerfPhase.A,
		key: "electron_app_configured"
	},
	A8: {
		id: "A8",
		phase: PerfPhase.A,
		key: "single_instance_locked"
	},
	A9: {
		id: "A9",
		phase: PerfPhase.A,
		key: "app_ready"
	},
	B1: {
		id: "B1",
		phase: PerfPhase.B,
		key: "bootstrap_entered"
	},
	B2: {
		id: "B2",
		phase: PerfPhase.B,
		key: "platform_created"
	},
	B3: {
		id: "B3",
		phase: PerfPhase.B,
		key: "celljs_container_ready"
	},
	B4: {
		id: "B4",
		phase: PerfPhase.B,
		key: "database_initialized"
	},
	B5: {
		id: "B5",
		phase: PerfPhase.B,
		key: "migration_context_ready"
	},
	B6: {
		id: "B6",
		phase: PerfPhase.B,
		key: "daemon_bridge_handlers_registered"
	},
	B7: {
		id: "B7",
		phase: PerfPhase.B,
		key: "daemon_env_ready"
	},
	B8: {
		id: "B8",
		phase: PerfPhase.B,
		key: "daemon_process_started"
	},
	B9: {
		id: "B9",
		phase: PerfPhase.B,
		key: "daemon_connection_created"
	},
	B10: {
		id: "B10",
		phase: PerfPhase.B,
		key: "renderer_migration_bridge_ready"
	},
	B11: {
		id: "B11",
		phase: PerfPhase.B,
		key: "daemon_event_bridges_registered"
	},
	B12: {
		id: "B12",
		phase: PerfPhase.B,
		key: "desktop_host_rpc_registered"
	},
	B13: {
		id: "B13",
		phase: PerfPhase.B,
		key: "wsrpc_ready"
	},
	B14: {
		id: "B14",
		phase: PerfPhase.B,
		key: "background_services_kicked"
	},
	B15: {
		id: "B15",
		phase: PerfPhase.B,
		key: "bootstrap_complete"
	},
	C1: {
		id: "C1",
		phase: PerfPhase.C,
		key: "window_manager_created"
	},
	C2: {
		id: "C2",
		phase: PerfPhase.C,
		key: "splash_shown"
	},
	C3: {
		id: "C3",
		phase: PerfPhase.C,
		key: "vendor_ensured"
	},
	C4: {
		id: "C4",
		phase: PerfPhase.C,
		key: "main_window_creating"
	},
	C5: {
		id: "C5",
		phase: PerfPhase.C,
		key: "main_window_created"
	},
	C6: {
		id: "C6",
		phase: PerfPhase.C,
		key: "browser_window_load_url"
	},
	C7: {
		id: "C7",
		phase: PerfPhase.C,
		key: "window_ready_to_show"
	},
	D1: {
		id: "D1",
		phase: PerfPhase.D,
		key: "preload_start"
	},
	D2: {
		id: "D2",
		phase: PerfPhase.D,
		key: "preload_bootstrap_requested"
	},
	D3: {
		id: "D3",
		phase: PerfPhase.D,
		key: "preload_bootstrap_resolved"
	},
	D4: {
		id: "D4",
		phase: PerfPhase.D,
		key: "preload_rpc_connected"
	},
	D5: {
		id: "D5",
		phase: PerfPhase.D,
		key: "preload_exposed"
	},
	E1: {
		id: "E1",
		phase: PerfPhase.E,
		key: "renderer_script_start"
	},
	E2: {
		id: "E2",
		phase: PerfPhase.E,
		key: "renderer_dom_ready"
	},
	E3: {
		id: "E3",
		phase: PerfPhase.E,
		key: "renderer_react_mounted"
	},
	E4: {
		id: "E4",
		phase: PerfPhase.E,
		key: "renderer_adapter_init_start"
	},
	E5: {
		id: "E5",
		phase: PerfPhase.E,
		key: "renderer_adapter_connected"
	},
	E6: {
		id: "E6",
		phase: PerfPhase.E,
		key: "renderer_first_paint"
	},
	E7: {
		id: "E7",
		phase: PerfPhase.E,
		key: "renderer_skeleton_gone"
	},
	E8: {
		id: "E8",
		phase: PerfPhase.E,
		key: "renderer_app_ready"
	},
	F1: {
		id: "F1",
		phase: PerfPhase.F,
		key: "daemon_started"
	},
	F2: {
		id: "F2",
		phase: PerfPhase.F,
		key: "daemon_db_ready"
	},
	F3: {
		id: "F3",
		phase: PerfPhase.F,
		key: "daemon_celljs_deps_resolved"
	},
	F4: {
		id: "F4",
		phase: PerfPhase.F,
		key: "daemon_tencent_docs_ready"
	},
	F5: {
		id: "F5",
		phase: PerfPhase.F,
		key: "daemon_migration_service_ready"
	},
	F6: {
		id: "F6",
		phase: PerfPhase.F,
		key: "daemon_sidecar_manager_ready"
	},
	F7: {
		id: "F7",
		phase: PerfPhase.F,
		key: "daemon_rpc_ready"
	},
	F8: {
		id: "F8",
		phase: PerfPhase.F,
		key: "daemon_domain_ready"
	},
	F9: {
		id: "F9",
		phase: PerfPhase.F,
		key: "daemon_ready"
	},
	F10: {
		id: "F10",
		phase: PerfPhase.F,
		key: "daemon_startup_migration_done"
	},
	F11: {
		id: "F11",
		phase: PerfPhase.F,
		key: "daemon_mcp_apps_host_ready"
	},
	F12: {
		id: "F12",
		phase: PerfPhase.F,
		key: "daemon_services_kicked"
	},
	F13: {
		id: "F13",
		phase: PerfPhase.F,
		key: "daemon_background_completed"
	},
	F14: {
		id: "F14",
		phase: PerfPhase.F,
		key: "daemon_state_refresh_started"
	},
	F15: {
		id: "F15",
		phase: PerfPhase.F,
		key: "daemon_auth_account_ready"
	},
	F16: {
		id: "F16",
		phase: PerfPhase.F,
		key: "daemon_auth_token_ready"
	},
	F17: {
		id: "F17",
		phase: PerfPhase.F,
		key: "daemon_config_request_sent"
	},
	F18: {
		id: "F18",
		phase: PerfPhase.F,
		key: "daemon_config_response_received"
	},
	F19: {
		id: "F19",
		phase: PerfPhase.F,
		key: "daemon_state_ready"
	}
};
//#endregion
Object.defineProperty(exports, "PerfFlow", {
	enumerable: true,
	get: function() {
		return PerfFlow;
	}
});
Object.defineProperty(exports, "STARTUP_MARKS", {
	enumerable: true,
	get: function() {
		return STARTUP_MARKS;
	}
});
Object.defineProperty(exports, "cleanupOldStartupLogs", {
	enumerable: true,
	get: function() {
		return cleanupOldStartupLogs;
	}
});
Object.defineProperty(exports, "getWorkbuddyPerfLogger", {
	enumerable: true,
	get: function() {
		return getWorkbuddyPerfLogger;
	}
});
Object.defineProperty(exports, "logAppStartup", {
	enumerable: true,
	get: function() {
		return logAppStartup;
	}
});
Object.defineProperty(exports, "logLifecycleEvent", {
	enumerable: true,
	get: function() {
		return logLifecycleEvent;
	}
});
Object.defineProperty(exports, "logStartupPerf", {
	enumerable: true,
	get: function() {
		return logStartupPerf;
	}
});
Object.defineProperty(exports, "packageAndShowLog", {
	enumerable: true,
	get: function() {
		return packageAndShowLog;
	}
});
Object.defineProperty(exports, "packageLogs", {
	enumerable: true,
	get: function() {
		return packageLogs;
	}
});
Object.defineProperty(exports, "setUserIdProvider", {
	enumerable: true,
	get: function() {
		return setUserIdProvider;
	}
});
