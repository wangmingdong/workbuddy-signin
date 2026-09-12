const require_chunk = require("./chunk.js");
const require_common$1 = require("./common.js");
const require_workbuddy_product_config = require("./workbuddy-product-config.js");
const require_menu_i18n = require("./menu-i18n.js");
const require_dev_env_override = require("./dev-env-override.js");
const require_startup_context = require("./startup-context.js");
const require_marks = require("./marks.js");
const require_logger = require("./logger2.js");
const require_app_instance = require("./app-instance.js");
const require_cdp_profiler = require("./cdp-profiler.js");
const require_startup_perf_exporters = require("./startup-perf-exporters.js");
const require_dev_env_actions = require("./dev-env-actions2.js");
const require_ioa_im_override = require("./ioa-im-override.js");
let electron = require("electron");
let fs = require("fs");
fs = require_chunk.__toESM(fs);
let path = require("path");
path = require_chunk.__toESM(path);
let url = require("url");
let node_fs = require("node:fs");
node_fs = require_chunk.__toESM(node_fs);
let node_path = require("node:path");
node_path = require_chunk.__toESM(node_path);
//#region ../../packages/workbuddy-app/src/shared/menu.ts
var MENU_COMMAND_IDS = {
	SHOW_ABOUT_DIALOG: "menu.showAboutDialog",
	CHECK_FOR_UPDATES: "menu.checkForUpdates",
	DOWNLOAD_UPDATE: "menu.downloadUpdate",
	INSTALL_UPDATE: "menu.installUpdate",
	QUIT_APP: "menu.quitApp",
	CLOSE_WINDOW: "menu.closeWindow",
	TOGGLE_DEVTOOLS: "menu.toggleDevTools",
	OPEN_LOGS_FOLDER: "menu.openLogsFolder",
	HELP_FEEDBACK: "menu.helpFeedback",
	COPY_USER_ID: "menu.copyUserId",
	NETWORK_CHECK: "menu.networkCheck",
	EDIT_UNDO: "menu.edit.undo",
	EDIT_REDO: "menu.edit.redo",
	EDIT_CUT: "menu.edit.cut",
	EDIT_COPY: "menu.edit.copy",
	EDIT_PASTE: "menu.edit.paste",
	EDIT_SELECT_ALL: "menu.edit.selectAll",
	DEV_ENV_SWITCH_STAGING: "menu.devEnv.switchStaging",
	DEV_ENV_SWITCH_PROD: "menu.devEnv.switchProd",
	DEV_ENV_DISABLE: "menu.devEnv.disable",
	PERF_START_RECORDING: "menu.perf.startRecording",
	PERF_STOP_RECORDING: "menu.perf.stopRecording",
	PERF_STOP_AND_ANALYZE: "menu.perf.stopAndAnalyze",
	IOA_IM_WHITELIST_TOGGLE: "menu.ioaIm.toggle"
};
var UpdateStateType = /* @__PURE__ */ function(UpdateStateType) {
	UpdateStateType["Idle"] = "idle";
	UpdateStateType["Checking"] = "checking";
	UpdateStateType["Available"] = "available";
	UpdateStateType["Downloading"] = "downloading";
	UpdateStateType["Downloaded"] = "downloaded";
	UpdateStateType["Error"] = "error";
	return UpdateStateType;
}({});
function buildSharedMenuDefinitions(texts, updateState = UpdateStateType.Idle, options = {}) {
	const { includeDevTools = true } = options;
	return [
		{
			id: "app",
			label: texts.productName,
			items: [
				{
					id: "about",
					label: texts.about(texts.productName),
					commandId: MENU_COMMAND_IDS.SHOW_ABOUT_DIALOG
				},
				getUpdateMenuItem(texts, updateState),
				{
					id: "app-separator",
					label: "",
					role: "separator"
				},
				{
					id: "quit",
					label: texts.quit(texts.productName),
					accelerator: "Alt+F4",
					commandId: MENU_COMMAND_IDS.QUIT_APP
				}
			]
		},
		{
			id: "edit",
			label: texts.edit,
			items: [
				{
					id: "undo",
					label: texts.undo,
					accelerator: "Ctrl+Z",
					commandId: MENU_COMMAND_IDS.EDIT_UNDO
				},
				{
					id: "redo",
					label: texts.redo,
					accelerator: "Ctrl+Y",
					commandId: MENU_COMMAND_IDS.EDIT_REDO
				},
				{
					id: "edit-separator-1",
					label: "",
					role: "separator"
				},
				{
					id: "cut",
					label: texts.cut,
					accelerator: "Ctrl+X",
					commandId: MENU_COMMAND_IDS.EDIT_CUT
				},
				{
					id: "copy",
					label: texts.copy,
					accelerator: "Ctrl+C",
					commandId: MENU_COMMAND_IDS.EDIT_COPY
				},
				{
					id: "paste",
					label: texts.paste,
					accelerator: "Ctrl+V",
					commandId: MENU_COMMAND_IDS.EDIT_PASTE
				},
				{
					id: "edit-separator-2",
					label: "",
					role: "separator"
				},
				{
					id: "selectAll",
					label: texts.selectAll,
					accelerator: "Ctrl+A",
					commandId: MENU_COMMAND_IDS.EDIT_SELECT_ALL
				}
			]
		},
		{
			id: "window",
			label: texts.window,
			items: [{
				id: "closeWindow",
				label: texts.closeWindow,
				accelerator: "Ctrl+W",
				commandId: MENU_COMMAND_IDS.CLOSE_WINDOW
			}]
		},
		{
			id: "help",
			label: texts.help,
			items: [
				{
					id: "openLogsFolder",
					label: texts.openLogsFolder,
					commandId: MENU_COMMAND_IDS.OPEN_LOGS_FOLDER
				},
				{
					id: "helpFeedback",
					label: texts.helpFeedback,
					commandId: MENU_COMMAND_IDS.HELP_FEEDBACK
				},
				...includeDevTools ? [{
					id: "help-separator",
					label: "",
					role: "separator"
				}, {
					id: "toggleDevTools",
					label: texts.toggleDevTools,
					accelerator: "Ctrl+Shift+I",
					commandId: MENU_COMMAND_IDS.TOGGLE_DEVTOOLS
				}] : []
			]
		}
	];
}
function getUpdateMenuItem(texts, updateState) {
	switch (updateState) {
		case UpdateStateType.Checking: return {
			id: "checkForUpdates",
			label: texts.checkingForUpdates,
			disabled: true,
			commandId: MENU_COMMAND_IDS.CHECK_FOR_UPDATES
		};
		case UpdateStateType.Available: return {
			id: "checkForUpdates",
			label: texts.downloadUpdate,
			commandId: MENU_COMMAND_IDS.DOWNLOAD_UPDATE
		};
		case UpdateStateType.Downloading: return {
			id: "checkForUpdates",
			label: texts.downloadingUpdate,
			disabled: true,
			commandId: MENU_COMMAND_IDS.DOWNLOAD_UPDATE
		};
		case UpdateStateType.Downloaded: return {
			id: "checkForUpdates",
			label: texts.installUpdate,
			commandId: MENU_COMMAND_IDS.INSTALL_UPDATE
		};
		default: return {
			id: "checkForUpdates",
			label: texts.checkForUpdates,
			commandId: MENU_COMMAND_IDS.CHECK_FOR_UPDATES
		};
	}
}
//#endregion
//#region ../../packages/workbuddy-server/src/perf/startup-align.ts
/** 中位数（偶数个取中间两数均值）；空数组返回 undefined。 */
function median(values) {
	if (values.length === 0) return;
	const sorted = [...values].sort((a, b) => a - b);
	const mid = sorted.length >> 1;
	return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
}
/**
* 计算每个进程的时钟 offset（`epochMs − timestamp` 的中位数），key 为 `source`。
* 只对同时具备 `timestamp` 与 `epochMs` 的 mark 计入；某进程无有效样本则不产生条目。
*/
function computeClockOffsets(marks) {
	const samples = /* @__PURE__ */ new Map();
	for (const m of marks) {
		if (typeof m.timestamp !== "number" || typeof m.epochMs !== "number") continue;
		const key = m.source ?? "unknown";
		let bucket = samples.get(key);
		if (!bucket) {
			bucket = [];
			samples.set(key, bucket);
		}
		bucket.push(m.epochMs - m.timestamp);
	}
	const offsets = /* @__PURE__ */ new Map();
	for (const [key, vals] of samples) {
		const off = median(vals);
		if (off !== void 0) offsets.set(key, off);
	}
	return offsets;
}
/**
* 把一条 mark 映射到统一墙上时钟（epoch ms）：`absEpoch = timestamp + offset(source)`。
*
* offset 缺失（该进程无有效样本）时退化为该 mark 自身的 `epochMs`（若有）；
* 二者皆无 → 返回 undefined（无法定位到绝对时间轴）。
*/
function markAbsEpoch(mark, offsets) {
	const off = offsets.get(mark.source ?? "unknown");
	if (off !== void 0 && typeof mark.timestamp === "number") return mark.timestamp + off;
	return typeof mark.epochMs === "number" ? mark.epochMs : void 0;
}
/**
* 真·端到端耗时（ms）：所有 mark 对齐到统一墙上时钟后 `max − min`。
*
* 无任何可定位到绝对时间轴的 mark 时返回 undefined —— 调用方据此走兜底
* （如老格式无 epochMs 的历史数据，退回 summary 的 totalDurationMs）。
*/
function computeEndToEndMs(marks) {
	const offsets = computeClockOffsets(marks);
	let min = Infinity;
	let max = -Infinity;
	for (const m of marks) {
		const abs = markAbsEpoch(m, offsets);
		if (abs === void 0) continue;
		if (abs < min) min = abs;
		if (abs > max) max = abs;
	}
	if (!Number.isFinite(min) || !Number.isFinite(max)) return;
	return Math.round((max - min) * 100) / 100;
}
//#endregion
//#region src/main/features/telemetry/startup-type.ts
/**
* Startup Type 判定（启动类型维度）
*
* 性能打点上报需要一个 `startup_type` 维度，用于区分本次启动属于哪种场景：
*
* | startup_type   | 判定依据                                            |
* | -------------- | --------------------------------------------------- |
* | `first_install`| 无历史启动记录（`last-launch.json` 不存在）         |
* | `upgrade`      | 记录中的 version/build 与当前进程不一致             |
* | `cold`         | 进程全新启动（默认；version/build 一致）            |
* | `warm`         | 进程复用（同一进程内二次激活：dock 点击 / second-instance）|
*
* 实现要点：
* - `first_install` / `upgrade` / `cold` 三者靠持久化的 `last-launch.json`
*   （存于 `~/.workbuddy/last-launch.json`）比对 version+build 得出，进程启动
*   早期调用一次 `resolveStartupType()` 即可。
* - `warm` 是运行期状态：进程已经活着、再次被激活（macOS dock、Windows
*   second-instance）时，由激活回调显式调用 `markWarmActivation()` 切到 warm。
* - 所有 IO 异常吞掉，判定失败时降级为 `cold`，绝不阻塞启动。
*/
var startup_type_exports = /* @__PURE__ */ require_chunk.__exportAll({
	__resetStartupTypeForTest: () => __resetStartupTypeForTest,
	getStartupType: () => getStartupType,
	markWarmActivation: () => markWarmActivation,
	resolveStartupType: () => resolveStartupType
});
function getLastLaunchPath() {
	return path.join(require_app_instance.getWorkbuddyConfigDir(), LAST_LAUNCH_FILE);
}
function safe(fn) {
	try {
		return fn();
	} catch {
		return;
	}
}
function getCurrentVersion() {
	return safe(() => electron.app.getVersion()) ?? "unknown";
}
function getCurrentBuild() {
	return safe(() => require_workbuddy_product_config.tryGetWorkbuddyProductCommit()) ?? "unknown";
}
function readLastLaunch() {
	return safe(() => {
		const raw = fs.readFileSync(getLastLaunchPath(), "utf-8");
		const parsed = JSON.parse(raw);
		if (typeof parsed.version === "string" && typeof parsed.build === "string") return {
			version: parsed.version,
			build: parsed.build,
			timestamp: parsed.timestamp ?? ""
		};
	});
}
function writeLastLaunch(version, build) {
	safe(() => {
		const dir = require_app_instance.getWorkbuddyConfigDir();
		if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
		const record = {
			version,
			build,
			timestamp: (/* @__PURE__ */ new Date()).toISOString()
		};
		fs.writeFileSync(getLastLaunchPath(), JSON.stringify(record), "utf-8");
	});
}
/**
* 判定本次进程启动类型并持久化当前 version/build。
*
* 进程启动早期调用一次。结果会被缓存（进程级单例），后续重复调用直接返回缓存值
* （除非已被 `markWarmActivation()` 标记为 warm）。
*
* 副作用：把当前 version+build 写回 `last-launch.json`，供下次启动比对。
*/
function resolveStartupType() {
	if (resolvedType) return resolvedType;
	const version = getCurrentVersion();
	const build = getCurrentBuild();
	const last = readLastLaunch();
	let type;
	if (!last) type = "first_install";
	else if (last.version !== version || last.build !== build) type = "upgrade";
	else type = "cold";
	writeLastLaunch(version, build);
	resolvedType = type;
	return type;
}
/**
* 标记本次为热启动（进程复用：macOS dock 点击已有实例 / Windows second-instance）。
*
* 在 app 的 `activate` / `second-instance` 回调里调用。一旦标记为 warm，
* 后续 `getStartupType()` 固定返回 warm，直到进程退出。
*/
function markWarmActivation() {
	resolvedType = "warm";
}
/**
* 取当前已判定的启动类型。
*
* 若 `resolveStartupType()` 尚未被调用过，则惰性触发一次判定。
*/
function getStartupType() {
	return resolvedType ?? resolveStartupType();
}
/** 仅供测试：重置进程级缓存。 */
function __resetStartupTypeForTest() {
	resolvedType = void 0;
}
var LAST_LAUNCH_FILE, resolvedType;
var init_startup_type = require_chunk.__esmMin((() => {
	require_app_instance.init_app_instance();
	require_workbuddy_product_config.init_workbuddy_product_config();
	LAST_LAUNCH_FILE = "last-launch.json";
}));
//#endregion
//#region src/main/features/telemetry/startup-perf-aggregator.ts
/**
* 启动性能聚合器 — 把 startup flow 的 JSONL marks 归段成 StartupPerfSummary。
*
* 背景：64 个标准打点全是**单点** `mark()`（无 `_start/_end` 配对），所以
* `WorkbuddyPerfLogger.getSummary()` 的成对统计算不出 phases。本聚合器从落盘的
* JSONL 直接读回全部 marks，按段名（data.phase，即 A~F 六段）分组，
* 段内用 `max(elapsed) − min(elapsed)` 求段耗时，产出 `phases{}` 喂 Log + Metric + Trace 出口。
*
* ⚠️ 时间基准约束：A/B/C 与 main-observed F 在 main 进程、daemon F 在 daemon、D 在 preload、E 在 renderer，
* `elapsed` 各自基于本进程 startTime，**跨进程不可裸做差**。因此段耗时只做**段内**做差
* （同段同 source 同基准，可靠）。
*
* 端到端 totalMs 则用**时钟 offset 校准**跨进程算出（见 startup-align.ts）：每条 mark
* 自带 `(timestamp=performance.now, epochMs=Date.now)`，据此反算每进程 offset，把各进程
* 单调时间轴归一到共享墙上时钟，`max(absEpoch) − min(absEpoch)` 即真端到端。老格式（无
* epochMs）拿不到对齐结果时，退回 summary 行的 totalDurationMs。
*/
/**
* 惰性解析启动类型。`startup-type` 顶层 import 了 electron 的 `app`，为避免本聚合器
* 在非 electron 运行时（单测 / 纯 node driver）被 import 时即触发 electron 加载，
* 这里改用惰性 require + 兜底。
*/
function resolveStartupTypeSafe() {
	try {
		return (init_startup_type(), require_chunk.__toCommonJS(startup_type_exports)).getStartupType();
	} catch {
		return "cold";
	}
}
/** 段名展示顺序，保证 phases 输出稳定（dashboard/grep 友好） */
var PHASE_ORDER = [
	"A_process",
	"B_bootstrap",
	"C_window",
	"D_preload",
	"E_renderer",
	"F_daemon"
];
/**
* 解析一行 JSONL。每行格式为 `[ISO时间] {json}`（见 logger.appendLine），
* 需先剥掉时间前缀再 JSON.parse。无法解析的行返回 null。
*/
function parseLine(line) {
	const trimmed = line.trim();
	if (!trimmed) return null;
	const braceIdx = trimmed.indexOf("{");
	if (braceIdx < 0) return null;
	try {
		return JSON.parse(trimmed.slice(braceIdx));
	} catch {
		return null;
	}
}
/**
* 收集同一次启动的 startup JSONL。
*
* 当前新结构下一次启动就是 `startup/<date>/<pid>-<time>.jsonl` 单文件，
* main/daemon/D/E relay 都写入这一个文件；行内 `source/proc` 标识来源。
* 旧结构保留兼容：如果锚文件位于旧 `<pid>/<proc>.jsonl` 或扁平 perf 目录，
* 才扫描同目录匹配分片合并。
*
* 归并策略（去 mtime 化）：
* - **新结构** `startup/<date>/<pid>-<time>.jsonl`：一次启动就一个文件（pid+time 唯一），
*   父目录是日期、同目录下是别次启动的 `<pid>-<time>.jsonl`，故**只读锚文件自身**，不扫同目录
*   （否则会并入别次启动）。每行自带 `source`/`proc`，跨进程对齐按行内字段进行（见 startup-align）。
* - **旧结构 / 兜底**：旧 `startup/<date>/<pid>/<proc>.jsonl`（父目录是 pid）与扁平
*   `logs/perf/startup-<ts>.jsonl`（父目录是 perf），仍读同目录下匹配的 `*.jsonl` 合并。
*/
/** 是否为一次启动的分片文件：旧按进程分文件 <proc>.jsonl / marks.jsonl，或扁平 startup-*.jsonl。 */
function isStartupShardName(name) {
	if (!name.endsWith(".jsonl")) return false;
	if (/^(marks|main|daemon|preload|renderer)\.jsonl$/.test(name)) return true;
	return name.startsWith("startup-");
}
function collectStartupShards(logFilePath) {
	try {
		const dir = node_path.dirname(logFilePath);
		if (/^\d{4}-\d{2}-\d{2}$/.test(node_path.basename(dir))) return [logFilePath];
		const shards = node_fs.readdirSync(dir).filter(isStartupShardName).map((name) => node_path.join(dir, name));
		return shards.length > 0 ? shards : [logFilePath];
	} catch {
		return [logFilePath];
	}
}
/**
* 从 startup JSONL 聚合出一次启动的 {summary, marks}。
*
* 会自动读取当前启动 JSONL；仅旧结构才合并同目录进程分片（见 collectStartupShards）：
* - **段耗时**：段内 `max(elapsed) − min(elapsed)`（同段同进程同基准，可靠）；
* - **端到端 totalMs**：跨进程时钟 offset 校准后 `max(absEpoch) − min(absEpoch)`
*   （见 startup-align），老格式无 epochMs 时退回 summary 行 totalDurationMs / 段 max；
* - **marks**：每条 mark 归一到统一墙上时钟（absEpoch），按 absEpoch 升序，供 trace/per-mark log。
*
* @param logFilePath 分片归并的锚文件（同目录所有 startup 分片一起读）
* @param startupTypeOverride 可选注入启动类型（测试/纯 node driver，避免依赖 electron app）
*/
function aggregateStartupSession(logFilePath, startupTypeOverride) {
	const phases = {};
	let totalMs = 0;
	let totalMarks = 0;
	let firstInteractiveMs;
	let flowType = "startup";
	let alignedMarks = [];
	try {
		const segBounds = /* @__PURE__ */ new Map();
		const rawMarks = [];
		const shards = collectStartupShards(logFilePath);
		for (const shard of shards) {
			let raw;
			try {
				raw = node_fs.readFileSync(shard, "utf-8");
			} catch {
				continue;
			}
			for (const line of raw.split("\n")) {
				const obj = parseLine(line);
				if (!obj) continue;
				if (obj._type === "mark") {
					const data = obj.data ?? {};
					const seg = typeof data.phase === "string" ? data.phase : "";
					rawMarks.push({
						id: typeof data.id === "string" ? data.id : "",
						key: typeof obj.phase === "string" ? obj.phase : "",
						phase: seg,
						source: typeof obj.source === "string" ? obj.source : void 0,
						timestamp: typeof obj.timestamp === "number" ? obj.timestamp : void 0,
						epochMs: typeof obj.epochMs === "number" ? obj.epochMs : void 0
					});
					const elapsed = typeof obj.elapsed === "number" ? obj.elapsed : void 0;
					if (!seg || elapsed === void 0) continue;
					const cur = segBounds.get(seg);
					if (cur) {
						cur.min = Math.min(cur.min, elapsed);
						cur.max = Math.max(cur.max, elapsed);
					} else segBounds.set(seg, {
						min: elapsed,
						max: elapsed
					});
				} else if (obj._type === "summary") {
					const s = obj;
					if (typeof s.totalDurationMs === "number") totalMs = Math.max(totalMs, s.totalDurationMs);
					if (typeof s.flowType === "string") flowType = s.flowType;
				}
			}
		}
		for (const [seg, b] of segBounds.entries()) phases[seg] = Math.round((b.max - b.min) * 100) / 100;
		totalMarks = rawMarks.length;
		const offsets = computeClockOffsets(rawMarks);
		alignedMarks = rawMarks.map((m) => ({
			id: m.id,
			key: m.key,
			phase: m.phase,
			proc: m.source ?? "unknown",
			absEpoch: markAbsEpoch(m, offsets)
		})).sort((a, b) => (a.absEpoch ?? Infinity) - (b.absEpoch ?? Infinity));
		const locatedMarks = alignedMarks.filter((m) => typeof m.absEpoch === "number");
		const e8 = locatedMarks.find((m) => m.id === "E8");
		if (e8) {
			const start = Math.min(...locatedMarks.map((m) => m.absEpoch));
			firstInteractiveMs = Math.round((e8.absEpoch - start) * 100) / 100;
		}
		const e2e = computeEndToEndMs(rawMarks);
		if (e2e !== void 0) totalMs = e2e;
		else if (!totalMs && segBounds.size > 0) totalMs = Math.round(Math.max(...[...segBounds.values()].map((b) => b.max)));
	} catch {}
	const ordered = {};
	for (const seg of PHASE_ORDER) if (seg in phases) ordered[seg] = phases[seg];
	for (const seg of Object.keys(phases)) if (!(seg in ordered)) ordered[seg] = phases[seg];
	return {
		summary: {
			startupType: startupTypeOverride ?? resolveStartupTypeSafe(),
			totalMs,
			firstInteractiveMs,
			totalMarks,
			phases: ordered,
			flowType
		},
		marks: alignedMarks
	};
}
//#endregion
//#region src/main/features/telemetry/perf-marks.ts
/**
* Startup Performance Marks — 主进程薄封装
*
* 64 点 schema 的单一真相已迁到 `@genie/workbuddy-server/perf/marks`（双端共享，
* 见该文件头注释）。本文件只保留**主进程专用**的打点/flush 封装，并 re-export
* schema 常量，使既有 `import { markStartup, STARTUP_MARKS } from '.../perf-marks'`
* 的调用方无需改动。
*
* - markStartup / flushStartupPerf：主进程直接拿 logger 单例落点（A/B/C 段）。
* - preload(D) / renderer(E) 段拿不到主进程 logger 单例，改用
*   `buildStartupMarkLine()` 构造 JSONL 行后经 RPC `perf:appendLine` relay。
*/
/**
* 主进程打一个启动打点。`mark()` 会落进 `startup` flow 的 JSONL，
* phase 名作为 `data.phase` 一起记下，便于 summary 归段。
*
* 全程吞异常——打点绝不阻塞启动主流程。
*
* @param id 标准节点 id（主进程打 A/B/C 与 main-observed F 点；A0 使用 `markProcessCreated`）
* @param data 可选附加字段（如分支耗时、命中标记）
*/
function markStartup(id, data) {
	try {
		const def = require_marks.STARTUP_MARKS[id];
		if (!def) return;
		require_marks.getWorkbuddyPerfLogger(require_marks.PerfFlow.STARTUP).mark(def.key, {
			id: def.id,
			phase: def.phase,
			...data ?? {}
		});
	} catch {}
}
/**
* main 侧观测 daemon RPC 返回时使用：把 mark 放到 daemon-rpc 泳道/F 段，但只带 epochMs，
* 不带 main 的 performance.now，避免污染 daemon 进程 offset 计算；也避免和 daemon 内部 F1~F13 连成误导段。
*/
function markDaemonObservedFromMain(id, data) {
	try {
		const def = require_marks.STARTUP_MARKS[id];
		const ctx = require_startup_context.getStartupContext();
		if (!def || !ctx) return;
		require_marks.getWorkbuddyPerfLogger(require_marks.PerfFlow.STARTUP).appendRendererLine(JSON.stringify({
			_type: "mark",
			epochMs: Date.now(),
			phase: def.key,
			source: "daemon-rpc",
			proc: "daemon-rpc",
			pid: ctx.pid,
			data: {
				id: def.id,
				phase: def.phase,
				...data ?? {}
			}
		}));
	} catch {}
}
/**
* 打 A0（process_created）——进程被 OS 创建的时刻，端到端真起点。
*
* 取 Electron 在 main 进程暴露的 `process.getCreationTime()`（返回进程创建的 epoch ms，
* 早于 A1 首行 JS）。它补齐「进程创建 → native 初始化 + 重型 import → JS 入口」这段原本
* 被丢掉的耗时。用 `markAbsolute` 落盘（只带 epochMs，不参与 offset/段耗时，见其注释）。
*
* `process.getCreationTime` 是 Electron 扩展（Node 类型无此声明），故做能力探测 + 断言；
* 非 Electron / 返回 null 时直接跳过 —— 端到端退回以 A1 为起点，行为不回归。
* 全程吞异常，绝不阻塞启动。仅 main 进程调用一次。
*/
function markProcessCreated() {
	try {
		const getCreationTime = process.getCreationTime;
		if (typeof getCreationTime !== "function") return;
		const creationMs = getCreationTime();
		if (creationMs == null || !Number.isFinite(creationMs)) return;
		const def = require_marks.STARTUP_MARKS.A0;
		require_marks.getWorkbuddyPerfLogger(require_marks.PerfFlow.STARTUP).markAbsolute(def.key, creationMs, {
			id: def.id,
			phase: def.phase
		});
	} catch {}
}
/**
* startup.perf 桥接事件名。daemon 子进程经此名把 startup JSONL 的 logFilePath
* 桥回 main 进程；main 侧 reportEvent 路由识别此名后重聚合并跑 Log + Metric + Trace 出口（而非走普通
* aegis event）。main / daemon 两端共用此常量，避免字符串漂移。
*/
var STARTUP_PERF_BRIDGE_EVENT = "startup.perf.bridge";
var latestStartupTraceId;
function getLatestStartupTraceId() {
	return latestStartupTraceId;
}
/**
* main 侧统一跑 StartupTelemetry Log + Metric + Trace 出口。仅在持有 monitor 单例的
* main 进程有效（无单例直接返回）。
* - Log summary：collector.recordStartupPerf
* - Log raw：collector.recordStartupJsonl（供外部 startup-report.html 复用）
* - Log per-mark：collector.recordStartupMarks（有 marks 才发）
* - Metric：exportStartupMetric → recordDuration 总耗时 / E8 首屏可交互 / 分段
* - Trace：exportStartupTrace → span 树 exportTraces
*
* 动态 import monitor：仅在 main 执行，静态加载链不触达 electron（守卫约束）。
*/
function safeReadStartupJsonl(logFilePath) {
	if (!logFilePath) return;
	try {
		return node_fs.readFileSync(logFilePath, "utf-8");
	} catch {
		return;
	}
}
function hasStartupFinalMark(rawJsonl) {
	return !!rawJsonl && /"id"\s*:\s*"B15"/.test(rawJsonl);
}
async function waitForStartupJsonlFinalMark(logFilePath) {
	const deadline = Date.now() + 3e3;
	let latest = safeReadStartupJsonl(logFilePath);
	while (!hasStartupFinalMark(latest) && Date.now() < deadline) {
		await new Promise((resolve) => setTimeout(resolve, 100));
		latest = safeReadStartupJsonl(logFilePath) ?? latest;
	}
	return latest;
}
async function exportStartupSignalsMain(session, rawJsonl) {
	const { DesktopMonitorService } = await Promise.resolve().then(() => require("./desktop-monitor-service2.js"));
	const monitor = DesktopMonitorService.getSharedInstance();
	if (!monitor) return;
	const startupTraceId = require_startup_perf_exporters.createStartupTraceId();
	latestStartupTraceId = startupTraceId;
	const collector = monitor.getStartupPerfCollector();
	collector.recordStartupPerf(session.summary, startupTraceId);
	if (rawJsonl) collector.recordStartupJsonl(rawJsonl, session.summary, startupTraceId);
	if (session.marks.length > 0) collector.recordStartupMarks(session.marks, session.summary, startupTraceId);
	require_startup_perf_exporters.exportStartupMetric(monitor, session.summary);
	await require_startup_perf_exporters.exportStartupTrace(monitor, session, startupTraceId);
}
/**
* 把一次启动的遥测在 main 侧落地 Log + Metric 出口与本地 AppStartup.log（通道 B）。
* daemon 子进程拿不到 monitor 单例，经 RPC 桥把 **logFilePath** 发回 main，
* 由 main 重聚合出完整 session（含 marks）并读取原始 JSONL 后再调用本函数。
*
* 入参用 unknown：跨 RPC 桥回来的 ext 已序列化，形状为 `{ logFilePath }`；
* 兼容旧形状（直接传 StartupPerfSummary，此时无 marks/raw JSONL）。
*/
async function recordStartupPerfToCollector(payload) {
	try {
		const withPath = payload;
		const logFilePath = typeof withPath.logFilePath === "string" ? withPath.logFilePath : void 0;
		const rawJsonl = await waitForStartupJsonlFinalMark(logFilePath);
		const session = logFilePath ? aggregateStartupSession(logFilePath) : {
			summary: payload,
			marks: []
		};
		require_marks.logStartupPerf(session.summary);
		await exportStartupSignalsMain(session, rawJsonl);
	} catch {}
}
//#endregion
//#region src/main/features/telemetry/startup-report-window.ts
require_app_instance.init_app_instance();
init_startup_type();
var startupReportWindow = null;
function createStartupReportWindowBounds() {
	const { workArea } = electron.screen.getPrimaryDisplay();
	const width = Math.min(1320, workArea.width);
	const height = Math.min(900, workArea.height);
	return {
		x: Math.round(workArea.x + (workArea.width - width) / 2),
		y: Math.round(workArea.y + (workArea.height - height) / 2),
		width,
		height
	};
}
function installStartupReportExternalLinks(win, reportHtmlPath) {
	const allowedFileUrl = reportHtmlPath ? (0, url.pathToFileURL)(reportHtmlPath).toString() : void 0;
	const openExternal = (url$1) => {
		if (/^(rtx|wxwork):/i.test(url$1)) electron.shell.openExternal(url$1).catch(() => void 0);
	};
	win.webContents.setWindowOpenHandler((details) => {
		openExternal(details.url);
		return { action: "deny" };
	});
	win.webContents.on("will-navigate", (event) => {
		const url$2 = event.url;
		if (allowedFileUrl && url$2 === allowedFileUrl) return;
		event.preventDefault();
		if (/^(rtx|wxwork):/i.test(url$2)) openExternal(url$2);
	});
}
function installStartupReportCloseShortcuts(win) {
	const webContents = win.webContents;
	const onBeforeInput = (event, input) => {
		if (input.type !== "keyDown") return;
		if (!(input.key === "Escape" || (process.platform === "darwin" ? input.meta : input.control) && input.key.toLowerCase() === "w")) return;
		event.preventDefault();
		win.close();
	};
	webContents.on("before-input-event", onBeforeInput);
	win.once("closed", () => {
		if (!webContents.isDestroyed()) webContents.removeListener("before-input-event", onBeforeInput);
	});
}
function resolveStartupReportHtmlPath() {
	const candidates = [
		path.resolve(electron.app.getAppPath(), "tools", "startup-report.html"),
		path.resolve(__dirname, "../../../../tools/startup-report.html"),
		path.join(process.resourcesPath, "startup-report.html"),
		path.resolve(electron.app.getAppPath(), "resources", "startup-report.html")
	];
	for (const filePath of candidates) try {
		if (fs.existsSync(filePath)) return filePath;
	} catch {}
	return null;
}
async function resolveCurrentStartupJsonlPath() {
	const ctx = require_startup_context.getStartupContext();
	const candidates = [];
	if (ctx) candidates.push(path.join(require_app_instance.getWorkbuddyLogsDir("startup"), ctx.date, `${ctx.pid}-${ctx.time}.jsonl`));
	const todayDir = ctx?.date ? path.join(require_app_instance.getWorkbuddyLogsDir("startup"), ctx.date) : path.join(require_app_instance.getWorkbuddyLogsDir("startup"), (/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
	try {
		const names = await fs.promises.readdir(todayDir);
		const latest = (await Promise.all(names.filter((name) => /^\d+-\d{6}\.jsonl$/.test(name)).map(async (name) => {
			const filePath = path.join(todayDir, name);
			return {
				filePath,
				mtimeMs: (await fs.promises.stat(filePath)).mtimeMs
			};
		}))).sort((a, b) => b.mtimeMs - a.mtimeMs)[0]?.filePath;
		if (latest) candidates.push(latest);
	} catch {}
	for (const filePath of candidates) try {
		await fs.promises.access(filePath, fs.constants.R_OK);
		return filePath;
	} catch {}
	return candidates[0] ?? null;
}
async function injectCurrentStartupJsonl(win) {
	const jsonlPath = await resolveCurrentStartupJsonlPath();
	if (!jsonlPath) {
		await win.webContents.executeJavaScript("window.__showStartupReportError?.(\"未找到当前启动 jsonl\")", true);
		return;
	}
	try {
		const text = await fs.promises.readFile(jsonlPath, "utf-8");
		const payload = JSON.stringify({
			name: path.basename(jsonlPath),
			path: jsonlPath,
			text,
			startupType: getStartupType()
		});
		await win.webContents.executeJavaScript(`window.__loadStartupReportText?.(${payload})`, true);
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		await win.webContents.executeJavaScript(`window.__showStartupReportError?.(${JSON.stringify(message)})`, true);
	}
}
async function openStartupReportWindow() {
	if (startupReportWindow && !startupReportWindow.isDestroyed()) {
		startupReportWindow.show();
		startupReportWindow.focus();
		await injectCurrentStartupJsonl(startupReportWindow);
		return;
	}
	const reportHtmlPath = resolveStartupReportHtmlPath();
	const bounds = createStartupReportWindowBounds();
	startupReportWindow = new electron.BrowserWindow({
		...bounds,
		minWidth: Math.min(960, bounds.width),
		minHeight: Math.min(640, bounds.height),
		title: "WorkBuddy 启动报告",
		show: false,
		webPreferences: {
			contextIsolation: true,
			nodeIntegration: false,
			sandbox: true
		}
	});
	installStartupReportExternalLinks(startupReportWindow, reportHtmlPath);
	installStartupReportCloseShortcuts(startupReportWindow);
	startupReportWindow.once("closed", () => {
		startupReportWindow = null;
	});
	startupReportWindow.once("ready-to-show", () => {
		startupReportWindow?.show();
	});
	if (!reportHtmlPath) {
		await startupReportWindow.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent("<h2>startup-report.html not found</h2>")}`);
		return;
	}
	await startupReportWindow.loadFile(reportHtmlPath);
	await injectCurrentStartupJsonl(startupReportWindow);
}
//#endregion
//#region src/main/system/runtime/ioa-im-actions.ts
/**
* IOA IM whitelist toggle actions — Electron main process.
*
* Handles toggling the "allow non-Tencent IM channels" switch for
* whitelisted IOA users. Syncs state to renderer localStorage for
* the Windows custom menubar, then rebuilds the native menu.
*/
/**
* Write IOA IM override state to renderer localStorage so the Windows
* custom menubar can synchronously read it on next render.
* Also dispatches a CustomEvent so the settings panel can re-fetch the state.
*/
function syncIOAImStateToAllWindows(eligible, allowed) {
	const js = `${eligible ? `localStorage.setItem('__ioa_im_state__', JSON.stringify({eligible:true,allowed:${allowed}}))` : "localStorage.removeItem('__ioa_im_state__')"}; ${`window.dispatchEvent(new CustomEvent('ioa-im-override-changed', { detail: { allowNonTencentIM: ${allowed} } }))`}`;
	for (const win of electron.BrowserWindow.getAllWindows()) win.webContents.executeJavaScript(js).catch(() => {});
}
/**
* Sync IOA IM eligibility to renderer localStorage so the Windows custom
* menubar can show/hide the menu item correctly after eligibility changes
* (e.g. login / logout / account switch).
* The `allowed` value is read from the persisted override file so the
* checked state is also accurate.
*/
function syncIOAImEligibilityToAllWindows(eligible) {
	syncIOAImStateToAllWindows(eligible, eligible ? require_ioa_im_override.readIOAImOverride() : false);
}
/**
* Sync IOA IM state to a specific window on load.
* Call this in `did-finish-load` to ensure the Windows custom menubar
* can read the state immediately after page load.
*/
function syncIOAImStateToWindow(win) {
	if (!getIOAImWhitelistMenuVisible()) return;
	const js = `localStorage.setItem('__ioa_im_state__', JSON.stringify({eligible:true,allowed:${require_ioa_im_override.readIOAImOverride()}}))`;
	win.webContents.executeJavaScript(js).catch(() => {});
}
/**
* Toggle the IOA IM whitelist override.
* Flips the current state, persists it, syncs to all renderer windows, and rebuilds menu.
*/
function toggleIOAImWhitelist() {
	const next = !require_ioa_im_override.readIOAImOverride();
	require_ioa_im_override.writeIOAImOverride(next);
	syncIOAImStateToAllWindows(true, next);
	buildAndSetApplicationMenu();
}
//#endregion
//#region src/main/system/platform/menu-builder.ts
var import_common = require_common$1.require_common$1();
require_common$1.init_common();
require_common$1.init_common$3();
require_app_instance.init_app_instance();
require_workbuddy_product_config.init_bundled_assets();
require_dev_env_override.init_dev_env_override();
require_workbuddy_product_config.init_workbuddy_product_config();
var BUILD_COMMIT = "e9991e2be9d";
/**
* 是否禁用"使用文档"菜单项。
*
* 来源：product.json 的 productFeatures.DisableDocumentation（专享版等渠道置 true）。
* 读取失败时默认 false（保持原行为：显示"使用文档"），避免误隐藏。
*
* 主进程同步读取姿势与 `system/proxy.ts::isDetectionEnabled` 一致。
*/
function isDocumentationDisabled() {
	try {
		return require_workbuddy_product_config.getWorkbuddyBootstrapProductConfiguration()?.productFeatures?.[require_common$1.ProductFeature.DisableDocumentation] === true;
	} catch {
		return false;
	}
}
/**
* 是否禁用"意见反馈"菜单项。
*
* 来源：product.json 的 productFeatures.DisableHelpFeedback（专享版等渠道置 true）。
* 与 Settings 左侧导航 "帮助与反馈" Tab 共用同一开关，语义为
* "统一隐藏所有帮助与反馈相关入口"（详见 `use-help-feedback-feature.ts` 注释）。
*
* 读取失败时默认 false（保持原行为：显示"意见反馈"），避免误隐藏。
*/
function isHelpFeedbackDisabled() {
	try {
		return require_workbuddy_product_config.getWorkbuddyBootstrapProductConfiguration()?.productFeatures?.[require_common$1.ProductFeature.DisableHelpFeedback] === true;
	} catch {
		return false;
	}
}
function isGalileoEnabled() {
	try {
		return require_workbuddy_product_config.getWorkbuddyBootstrapProductConfiguration()?.galileo?.enable === true;
	} catch {
		return false;
	}
}
var devEnvMenuUnlocked = (() => {
	if (process.env.NODE_ENV === "development" || require_dev_env_override.isDevEnvSwitchBuildEnabled()) {
		if (!require_dev_env_override.devEnvFileExists()) require_dev_env_override.writeDevEnv("prod");
		require_dev_env_override.forceEnableDevEnvOverride();
		return true;
	}
	if (require_dev_env_override.devEnvFileExists()) require_dev_env_override.removeDevEnvFile();
	return false;
})();
var reloadMenuEnabled = process.env.NODE_ENV === "development" || require_dev_env_override.isDevEnvSwitchBuildEnabled();
var devToolsMenuEnabled = process.env.NODE_ENV === "development" || require_dev_env_override.isDevEnvSwitchBuildEnabled() && require_dev_env_override.readDevEnv() !== "prod";
var IOA_ENTERPRISE_IDS = new Set(["esoikz80kd8g", "etahzsqej0n4"]);
var ioaImWhitelistMenuVisible = false;
var startupReportMenuVisible = false;
function isIoaLogin(enterpriseId) {
	return !!enterpriseId && IOA_ENTERPRISE_IDS.has(enterpriseId);
}
function setIOAImWhitelistMenuVisible(value) {
	ioaImWhitelistMenuVisible = value;
}
function getIOAImWhitelistMenuVisible() {
	return ioaImWhitelistMenuVisible;
}
function canOpenStartupReportWindow() {
	return !!_loggedInUserId && startupReportMenuVisible;
}
/** Module-level logged-in user ID. Updated via {@link setMenuUserId}. */
var _loggedInUserId;
var menuCommandHandler;
function setMenuCommandHandler(handler) {
	menuCommandHandler = handler;
}
/**
* Update the cached user ID and rebuild the application menu.
* Call this when the auth state changes (login / logout).
*/
function setMenuUserId(userId, enterpriseId) {
	_loggedInUserId = userId;
	startupReportMenuVisible = isIoaLogin(enterpriseId);
	buildAndSetApplicationMenu();
}
function buildAndSetApplicationMenu() {
	const menu = buildApplicationMenu();
	electron.Menu.setApplicationMenu(menu);
}
function setupMenuStateListeners(win) {
	const webContents = win.webContents;
	const rebuild = () => buildAndSetApplicationMenu();
	win.on("minimize", rebuild);
	win.on("restore", rebuild);
	win.on("maximize", rebuild);
	win.on("unmaximize", rebuild);
	win.on("hide", rebuild);
	win.on("show", rebuild);
	win.on("enter-full-screen", rebuild);
	win.on("leave-full-screen", rebuild);
	webContents.on("zoom-changed", rebuild);
	let shortcutRecording = false;
	const SHORTCUT_RECORDING_CHANNEL = "shortcut:set-recording-state";
	const onRecordingStateChange = (_event, recording) => {
		shortcutRecording = recording === true;
	};
	electron.ipcMain.on(SHORTCUT_RECORDING_CHANNEL, onRecordingStateChange);
	const onBeforeInput = (event, input) => {
		if (input.type !== "keyDown") return;
		if (!(process.platform === "darwin" ? input.meta : input.control)) return;
		if (shortcutRecording) return;
		if (sdkIframeFocusedByWebContentsId.get(webContents.id) === true) return;
		if (input.key === "=" || input.key === "+") {
			event.preventDefault();
			applyZoom(1);
		} else if (input.key === "-") {
			event.preventDefault();
			applyZoom(-1);
		} else if (input.key === "0") {
			event.preventDefault();
			applyZoom(0);
		}
	};
	webContents.on("before-input-event", onBeforeInput);
	let disposed = false;
	const dispose = () => {
		if (disposed) return;
		disposed = true;
		win.removeListener("minimize", rebuild);
		win.removeListener("restore", rebuild);
		win.removeListener("maximize", rebuild);
		win.removeListener("unmaximize", rebuild);
		win.removeListener("hide", rebuild);
		win.removeListener("show", rebuild);
		win.removeListener("enter-full-screen", rebuild);
		win.removeListener("leave-full-screen", rebuild);
		win.removeListener("closed", dispose);
		electron.ipcMain.removeListener(SHORTCUT_RECORDING_CHANNEL, onRecordingStateChange);
		if (!webContents.isDestroyed()) {
			webContents.removeListener("zoom-changed", rebuild);
			webContents.removeListener("before-input-event", onBeforeInput);
		}
	};
	win.on("closed", dispose);
	return dispose;
}
/**
* 拦截 Chromium 自带的 Ctrl/Cmd + = / - / 0——**仅在 SDK iframe 拿到焦点时**
* 拦截，其它情况放行 Chromium 默认 host zoom。
*
* 背景：
* - Chromium zoom shortcut 是浏览器级 chrome command，main 端
*   `before-input-event` 是唯一能拦的地方；preventDefault 同时阻止 keydown
*   传给 page。
* - Chromium `setZoomLevel` 是 per-webContents——host 和 iframe 共享 zoom
*   level。用户在 iframe 内按 Ctrl+= 时不希望 host UI 一起缩，所以这种焦点
*   下要拦截，转发 IPC 给 OOPIF preload，由 preload 注入 main world 调腾讯
*   文档 SDK 自己的 zoom API（详见 mqq-subframe-preload.ts 的
*   `installHostZoomShortcutBridge`）。
* - 焦点在 chat / sidebar 时放行——Chromium 默认 zoom 让 host + iframe 一起
*   缩，视觉上"chat 区文字按比例缩"就是这个效果。
*
* 焦点状态由 renderer 通过 'workbuddy:set-sdk-iframe-focused' IPC 同步：
* SdkDocumentPreview 在 iframe focus/blur 时上报，main 端按 webContentsId
* 维护 Map。
*/
var sdkIframeFocusedByWebContentsId = /* @__PURE__ */ new Map();
function setSdkIframeFocused(webContentsId, focused) {
	if (focused) sdkIframeFocusedByWebContentsId.set(webContentsId, true);
	else sdkIframeFocusedByWebContentsId.delete(webContentsId);
}
function setupZoomShortcutInterception(win) {
	const webContents = win.webContents;
	const webContentsId = webContents.id;
	const onBeforeInput = (event, input) => {
		if (input.type !== "keyDown") return;
		if (!(process.platform === "darwin" ? input.meta : input.control)) return;
		let direction = null;
		if (input.key === "=" || input.key === "+") direction = "in";
		else if (input.key === "-") direction = "out";
		else if (input.key === "0") direction = "reset";
		if (!direction) return;
		if (!(sdkIframeFocusedByWebContentsId.get(webContentsId) === true)) return;
		event.preventDefault();
		const payload = { direction };
		try {
			webContents.send("workbuddy:zoom-shortcut", payload);
		} catch {}
		try {
			const frames = webContents.mainFrame?.framesInSubtree ?? [];
			for (const frame of frames) {
				if (frame === webContents.mainFrame) continue;
				try {
					frame.send("workbuddy:zoom-shortcut", payload);
				} catch {}
			}
		} catch {}
	};
	webContents.on("before-input-event", onBeforeInput);
	const dispose = () => {
		sdkIframeFocusedByWebContentsId.delete(webContentsId);
		try {
			if (!webContents.isDestroyed()) webContents.removeListener("before-input-event", onBeforeInput);
		} catch {}
	};
	win.on("closed", dispose);
	return dispose;
}
/**
* 在线文档（docs.qq.com）走 `<webview partition="persist:tdoc-preview">`——它是**独立的
* guest webContents**，不在主窗口 webContents 的 frame 树内。所以上面那套面向本地文档
* OOPIF iframe 的链路对它完全失效：
* - `setupZoomShortcutInterception` 监听的是主窗口 webContents 的 before-input-event，
*   焦点在 webview guest 内时**根本不触发**；
* - `workbuddy:zoom-shortcut` 的 webFrameMain.send 只遍历 host 的 framesInSubtree，
*   **不包含 webview guest**。
*
* 结果焦点在在线文档里按 Ctrl/Cmd +/- 时：docs.qq.com 的腾讯文档 SDK 自己 preventDefault
* keydown 想做逻辑缩放、却被 SDK `detectZoom()` 守卫挡住（webview 下 outerWidth/innerWidth
* 比例异常 → 误判浏览器在缩放而拒绝执行），而 Chromium 默认 page zoom 又被 SDK 的
* preventDefault 吃掉 → 两头落空，完全不缩。
*
* 这里给 guest webContents 单独装一套 **page zoom**：拦下 Ctrl/Cmd + =/-/0，preventDefault
* 阻止事件进入页面（绕开 docs.qq.com SDK 的 keydown 拦截），直接对 guest `setZoomLevel`。
* 等同"在浏览器里打开腾讯文档按 Ctrl+/-"的原生体验（工具栏 + 正文一起缩，正是腾讯文档
* 在线版的设计）。
*
* 之所以 webview 能直接走 page zoom 而本地文档 OOPIF iframe 不能：iframe 与 host 共享同一
* webContents，page zoom 会把整个客户端 UI 一起缩；而 webview 是独立 webContents，
* setZoomLevel 只作用于它自身、不波及 host UI。
*
* 与本地文档链路**完全隔离**：本函数只监听传入的 guest webContents，不触碰主窗口
* webContents、不发 workbuddy:zoom-shortcut、不读写 sdkIframeFocused。
*/
function setupGuestWebviewZoomForwarding(guestContents) {
	const GUEST_MAX_ZOOM_LEVEL = 6;
	const GUEST_MIN_ZOOM_LEVEL = -6;
	const onBeforeInput = (event, input) => {
		if (input.type !== "keyDown") return;
		if (!(process.platform === "darwin" ? input.meta : input.control)) return;
		let target = null;
		if (input.key === "=" || input.key === "+") target = guestContents.getZoomLevel() + 1;
		else if (input.key === "-") target = guestContents.getZoomLevel() - 1;
		else if (input.key === "0") target = 0;
		if (target === null) return;
		event.preventDefault();
		const clamped = Math.max(GUEST_MIN_ZOOM_LEVEL, Math.min(GUEST_MAX_ZOOM_LEVEL, target));
		try {
			guestContents.setZoomLevel(clamped);
		} catch {}
	};
	guestContents.on("before-input-event", onBeforeInput);
	guestContents.once("destroyed", () => {
		guestContents.removeListener("before-input-event", onBeforeInput);
	});
}
function getWindowZoomLevel(win) {
	if (!win || win.isDestroyed()) return 0;
	const webContents = win.webContents;
	return webContents.isDestroyed() ? 0 : webContents.getZoomLevel();
}
function executeMenuCommand(commandId) {
	if (menuCommandHandler) {
		Promise.resolve(menuCommandHandler(commandId)).catch(() => {
			executeMenuCommandFallback(commandId).catch(() => void 0);
		});
		return;
	}
	executeMenuCommandFallback(commandId).catch(() => void 0);
}
async function executeMenuCommandFallback(commandId) {
	switch (commandId) {
		case MENU_COMMAND_IDS.PERF_START_RECORDING: {
			const { startProfiling } = await Promise.resolve().then(() => require("./cdp-profiler2.js"));
			await startProfiling();
			buildAndSetApplicationMenu();
			return;
		}
		case MENU_COMMAND_IDS.PERF_STOP_RECORDING: {
			const { stopProfilingOnly } = await Promise.resolve().then(() => require("./cdp-profiler2.js"));
			await stopProfilingOnly();
			buildAndSetApplicationMenu();
			return;
		}
		case MENU_COMMAND_IDS.PERF_STOP_AND_ANALYZE: {
			const { stopProfilingAndAnalyze } = await Promise.resolve().then(() => require("./cdp-profiler2.js"));
			await stopProfilingAndAnalyze();
			buildAndSetApplicationMenu();
			return;
		}
		case MENU_COMMAND_IDS.SHOW_ABOUT_DIALOG:
			await electron.dialog.showMessageBox({
				type: "info",
				title: `关于 ${electron.app.name}`,
				message: electron.app.name,
				detail: `版本: ${electron.app.getVersion()} (${BUILD_COMMIT})\nElectron: ${process.versions.electron}\nChrome: ${process.versions.chrome}\nNode.js: ${process.versions.node}`,
				buttons: ["确定"],
				noLink: true
			});
			return;
		case MENU_COMMAND_IDS.OPEN_LOGS_FOLDER: {
			const logFilePath = require_logger.getLogFilePath();
			const primaryLogsDir = logFilePath ? path.dirname(logFilePath) : require_app_instance.getWorkbuddyLogsDir();
			await require_marks.packageAndShowLog(primaryLogsDir, { showItemInFolder: (targetPath) => electron.shell.showItemInFolder(targetPath) }, [require_app_instance.getWorkbuddyLogsDir(), require_app_instance.getWorkbuddyPendingTelemetryDir()].filter((d) => d !== primaryLogsDir));
			return;
		}
		case MENU_COMMAND_IDS.TOGGLE_DEVTOOLS:
			if (!devToolsMenuEnabled && !require_cdp_profiler.isPerfProfilingEnabled()) return;
			(electron.BrowserWindow.getFocusedWindow() || electron.BrowserWindow.getAllWindows()[0])?.webContents.toggleDevTools();
			return;
		case MENU_COMMAND_IDS.CLOSE_WINDOW:
			(electron.BrowserWindow.getFocusedWindow() || electron.BrowserWindow.getAllWindows()[0])?.close();
			return;
		case MENU_COMMAND_IDS.HELP_FEEDBACK: return;
		case MENU_COMMAND_IDS.QUIT_APP:
			electron.app.quit();
			return;
		default: return;
	}
}
function createSharedTexts(t) {
	return {
		productName: electron.app.name,
		edit: t("edit"),
		window: t("window"),
		help: t("help"),
		about: (name) => `${t("about")} ${name}`,
		checkForUpdates: t("checkForUpdates"),
		checkingForUpdates: t("checkingForUpdates") || t("checkForUpdates"),
		downloadUpdate: t("downloadUpdate") || t("checkForUpdates"),
		downloadingUpdate: t("downloadingUpdate") || t("checkForUpdates"),
		installUpdate: t("installUpdate") || t("checkForUpdates"),
		quit: (name) => `${t("quit")} ${name}`,
		closeWindow: t("closeWindow") || t("quit"),
		undo: t("undo"),
		redo: t("redo"),
		cut: t("cut"),
		copy: t("copy"),
		paste: t("paste"),
		selectAll: t("selectAll"),
		openLogsFolder: t("openLogsFolder"),
		helpFeedback: t("helpFeedback"),
		copyUserId: t("copyUserId"),
		toggleDevTools: t("toggleDevTools")
	};
}
function toCommandMenuItem(item) {
	if (item.role === "separator") return { type: "separator" };
	const result = {
		label: item.label,
		enabled: !item.disabled
	};
	if (item.accelerator) result.accelerator = item.accelerator;
	if (item.commandId) result.click = () => executeMenuCommand(item.commandId);
	return result;
}
function getWindowMenuState(win) {
	if (!win || win.isDestroyed()) return {
		canUseWindowActions: false,
		canCloseWindow: false
	};
	const isMinimized = win.isMinimized();
	const isVisible = win.isVisible();
	const isFullScreen = win.isFullScreen();
	return {
		canUseWindowActions: !isMinimized && isVisible && !isFullScreen,
		canCloseWindow: !isMinimized && isVisible
	};
}
function buildApplicationMenu(locale) {
	const currentLocale = locale || require_menu_i18n.getMenuLocale();
	const t = (key) => require_menu_i18n.getMenuTranslation(key, currentLocale);
	const sharedMenus = buildSharedMenuDefinitions(createSharedTexts(t), void 0, { includeDevTools: devToolsMenuEnabled });
	const appMenuItems = sharedMenus.find((menu) => menu.id === "app")?.items ?? [];
	const helpMenuItems = sharedMenus.find((menu) => menu.id === "help")?.items ?? [];
	const win = electron.BrowserWindow.getFocusedWindow() || electron.BrowserWindow.getAllWindows()[0];
	const { canUseWindowActions, canCloseWindow } = getWindowMenuState(win);
	const template = [
		{
			label: electron.app.name,
			submenu: [
				...appMenuItems.map(toCommandMenuItem).slice(0, 2),
				{ type: "separator" },
				{
					role: "services",
					label: t("services")
				},
				{ type: "separator" },
				{
					role: "hide",
					label: `${t("hide")} ${electron.app.name}`
				},
				{
					role: "hideOthers",
					label: t("hideOthers")
				},
				{
					role: "unhide",
					label: t("unhide")
				},
				{ type: "separator" },
				{
					role: "quit",
					label: `${t("quit")} ${electron.app.name}`
				}
			]
		},
		{
			label: t("edit"),
			submenu: [
				{
					role: "undo",
					label: t("undo")
				},
				{
					role: "redo",
					label: t("redo")
				},
				{ type: "separator" },
				{
					role: "cut",
					label: t("cut")
				},
				{
					role: "copy",
					label: t("copy")
				},
				{
					role: "paste",
					label: t("paste")
				},
				{
					role: "selectAll",
					label: t("selectAll")
				}
			]
		},
		{
			label: t("view"),
			submenu: [
				...reloadMenuEnabled ? [{
					role: "reload",
					label: t("reload")
				}, {
					role: "forceReload",
					label: t("forceReload")
				}] : [],
				...devToolsMenuEnabled ? [{
					role: "toggleDevTools",
					label: t("toggleDevTools")
				}] : [],
				{ type: "separator" },
				...buildZoomMenuItems(t, getWindowZoomLevel(win)),
				{ type: "separator" },
				{
					label: t("toggleFullscreen"),
					accelerator: "Ctrl+Cmd+F",
					click: (_menuItem, win) => {
						win?.setFullScreen(!win.isFullScreen());
					}
				},
				...buildDevEnvMenuItems(t),
				...buildIOAImWhitelistMenuItems(t)
			]
		},
		{
			label: t("window"),
			submenu: [
				...canUseWindowActions ? [{
					role: "minimize",
					label: t("minimize")
				}, {
					role: "zoom",
					label: t("zoom")
				}] : [{
					label: t("minimize"),
					accelerator: "CmdOrCtrl+M",
					enabled: false
				}, {
					label: t("zoom"),
					enabled: false
				}],
				{
					label: t("closeWindow") || t("quit"),
					accelerator: "CmdOrCtrl+W",
					enabled: canCloseWindow,
					click: () => executeMenuCommand(MENU_COMMAND_IDS.CLOSE_WINDOW)
				},
				{ type: "separator" },
				{
					label: t("front"),
					click: () => {
						const win = electron.BrowserWindow.getAllWindows()[0];
						if (win && !win.isDestroyed()) {
							if (win.isMinimized()) win.restore();
							if (!win.isVisible()) win.show();
							win.focus();
						}
					}
				}
			]
		},
		{
			label: t("help"),
			submenu: [
				...isDocumentationDisabled() ? [] : [{
					label: t("documentation"),
					click: async () => {
						await electron.shell.openExternal("https://www.codebuddy.cn/docs/workbuddy/Overview");
					}
				}],
				{
					label: t("networkCheck"),
					click: () => executeMenuCommand(MENU_COMMAND_IDS.NETWORK_CHECK)
				},
				...helpMenuItems.filter((item) => item.id !== "helpFeedback" || !isHelpFeedbackDisabled()).map(toCommandMenuItem),
				...require_cdp_profiler.isPerfProfilingEnabled() ? [
					{ type: "separator" },
					{
						label: t("openApiConsole"),
						click: () => {
							const w = electron.BrowserWindow.getFocusedWindow() || electron.BrowserWindow.getAllWindows()[0];
							if (w && !w.isDestroyed()) w.webContents.executeJavaScript("window.wb.navigation.goto('/api-console')").catch(() => void 0);
						}
					},
					{ type: "separator" },
					...!devToolsMenuEnabled ? [{
						label: t("toggleDevTools"),
						accelerator: "CmdOrCtrl+Shift+I",
						click: () => {
							(electron.BrowserWindow.getFocusedWindow() || electron.BrowserWindow.getAllWindows()[0])?.webContents.toggleDevTools();
						}
					}] : [],
					{
						label: t("perfStartRecording"),
						enabled: require_cdp_profiler.getProfilingState() === "idle",
						click: () => executeMenuCommand(MENU_COMMAND_IDS.PERF_START_RECORDING)
					},
					{
						label: t("perfStopRecording"),
						enabled: require_cdp_profiler.getProfilingState() === "recording",
						click: () => executeMenuCommand(MENU_COMMAND_IDS.PERF_STOP_RECORDING)
					},
					{
						label: t("perfStopAndAnalyze"),
						enabled: require_cdp_profiler.getProfilingState() === "recording",
						click: () => executeMenuCommand(MENU_COMMAND_IDS.PERF_STOP_AND_ANALYZE)
					}
				] : [],
				..._loggedInUserId ? [
					{ type: "separator" },
					{
						label: t("copyUserId"),
						click: () => {
							electron.clipboard.writeText(_loggedInUserId);
							const iconPath = require_workbuddy_product_config.resolveBundledAsset("resources", "icon.png") ?? require_workbuddy_product_config.resolveBundledAsset("icon.png");
							const icon = iconPath ? electron.nativeImage.createFromPath(iconPath) : void 0;
							electron.dialog.showMessageBox({
								type: "info",
								icon: icon && !icon.isEmpty() ? icon : void 0,
								message: t("copyUserId"),
								detail: currentLocale === "zh-CN" ? "已复制用户 ID，仅用于问题反馈" : "User ID copied, for issue reporting only",
								buttons: [currentLocale === "zh-CN" ? "确定" : "OK"],
								noLink: true
							}).catch(() => {});
						}
					},
					...isGalileoEnabled() ? [{
						label: currentLocale === "zh-CN" ? "复制启动 Trace ID" : "Copy Startup Trace ID",
						click: () => {
							const traceId = getLatestStartupTraceId();
							if (traceId) electron.clipboard.writeText(traceId);
							electron.dialog.showMessageBox({
								type: traceId ? "info" : "warning",
								message: currentLocale === "zh-CN" ? "复制启动 Trace ID" : "Copy Startup Trace ID",
								detail: traceId ? currentLocale === "zh-CN" ? `已复制：${traceId}` : `Copied: ${traceId}` : currentLocale === "zh-CN" ? "当前还没有启动 Trace ID，请等待启动遥测上报后再试。" : "No startup Trace ID is available yet.",
								buttons: [currentLocale === "zh-CN" ? "确定" : "OK"],
								noLink: true
							}).catch(() => void 0);
						}
					}] : [],
					...startupReportMenuVisible ? [{
						label: currentLocale === "zh-CN" ? "启动报告" : "Startup Report",
						click: () => {
							openStartupReportWindow().catch(() => void 0);
						}
					}] : []
				] : []
			]
		}
	];
	return electron.Menu.buildFromTemplate(template);
}
function buildDevEnvMenuItems(t) {
	if (!devEnvMenuUnlocked) return [];
	const currentEnv = require_dev_env_override.readDevEnv();
	const customEnvs = require_dev_env_override.readCustomEnvs();
	const customEnvItems = customEnvs.map((entry) => ({
		label: `${entry.name} (${entry.endpoint})`,
		type: "radio",
		checked: currentEnv === `custom:${entry.name}`,
		click: () => require_dev_env_actions.switchDevEnv(`custom:${entry.name}`)
	}));
	return [{ type: "separator" }, {
		label: t("switchEnv"),
		submenu: [
			{
				label: t("envProd"),
				type: "radio",
				checked: currentEnv === "prod",
				click: () => require_dev_env_actions.switchDevEnv("prod")
			},
			{
				label: t("envStaging"),
				type: "radio",
				checked: currentEnv === "staging",
				click: () => require_dev_env_actions.switchDevEnv("staging")
			},
			...customEnvItems.length > 0 ? [{ type: "separator" }, ...customEnvItems] : [],
			{ type: "separator" },
			{
				label: t("addCustomEnv"),
				click: () => showCustomEnvDialog(t)
			},
			...customEnvs.length > 0 ? [{
				label: t("clearCustomEnvs"),
				click: async () => {
					const wasCustom = currentEnv.startsWith("custom:");
					require_dev_env_override.clearAllCustomEnvs();
					if (wasCustom) {
						require_dev_env_override.writeDevEnv("prod");
						try {
							import_common.ContainerUtil.get(require_common$1.AuthenticationManager)?.logout();
						} catch {}
						for (const win of electron.BrowserWindow.getAllWindows()) win.webContents.reload();
					}
					buildAndSetApplicationMenu();
				}
			}] : []
		]
	}];
}
function buildIOAImWhitelistMenuItems(t) {
	if (!ioaImWhitelistMenuVisible) return [];
	return [{ type: "separator" }, {
		label: t("allowNonTencentIM"),
		type: "checkbox",
		checked: require_ioa_im_override.readIOAImOverride(),
		click: () => toggleIOAImWhitelist()
	}];
}
/**
* 弹出对话框让用户输入/编辑自定义环境。
* 传入 existing 时为编辑模式，回填已有值。
*
* 使用 ipcMain 一次性 handle 接收表单结果，比 page-title-updated 更可靠。
*/
async function showCustomEnvDialog(_t, existing) {
	const { BrowserWindow: BWin, ipcMain } = await import("electron");
	const parent = BWin.getFocusedWindow() ?? BWin.getAllWindows()[0];
	if (!parent) return;
	const isEdit = !!existing;
	const ipcChannel = `__custom_env_result_${Date.now()}`;
	const promptWin = new BWin({
		parent,
		modal: true,
		width: 420,
		height: 240,
		resizable: false,
		minimizable: false,
		maximizable: false,
		show: false,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false
		}
	});
	const nameVal = existing?.name ?? "";
	const endpointVal = existing?.endpoint ?? "";
	const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><style>
body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; padding: 20px; background: #1e1e1e; color: #ccc; margin: 0; }
h3 { margin: 0 0 16px 0; font-size: 14px; font-weight: 500; color: #eee; }
label { display: block; margin-bottom: 4px; font-size: 13px; }
input { width: 100%; box-sizing: border-box; padding: 6px 8px; border: 1px solid #555; border-radius: 4px; background: #2d2d2d; color: #eee; font-size: 13px; margin-bottom: 12px; outline: none; }
input:focus { border-color: #007acc; }
.buttons { display: flex; justify-content: flex-end; gap: 8px; margin-top: 4px; }
button { padding: 6px 16px; border: none; border-radius: 4px; font-size: 13px; cursor: pointer; }
.cancel { background: #3a3a3a; color: #ccc; }
.ok { background: #007acc; color: #fff; }
.ok:disabled { opacity: 0.5; cursor: default; }
</style></head><body>
<h3>${isEdit ? "编辑自定义环境" : "添加自定义环境"}</h3>
<label>环境名称</label>
<input id="name" placeholder="例如: test1" value="${nameVal}" ${isEdit ? "readonly style=\"opacity:0.6\"" : "autofocus"} />
<label>域名</label>
<input id="endpoint" placeholder="例如: https://test1.codebuddy.cn" value="${endpointVal}" ${isEdit ? "autofocus" : ""} />
<div class="buttons">
  <button class="cancel" onclick="cancel()">取消</button>
  <button class="ok" id="ok" onclick="submit()">${isEdit ? "保存" : "添加"}</button>
</div>
<script>
const { ipcRenderer } = require('electron');
const nameEl = document.getElementById('name');
const endpointEl = document.getElementById('endpoint');
const okBtn = document.getElementById('ok');
function validate() { okBtn.disabled = !nameEl.value.trim() || !endpointEl.value.trim(); }
validate();
nameEl.addEventListener('input', validate);
endpointEl.addEventListener('input', validate);
nameEl.addEventListener('keydown', e => { if (e.key === 'Enter') endpointEl.focus(); });
endpointEl.addEventListener('keydown', e => { if (e.key === 'Enter' && !okBtn.disabled) submit(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') cancel(); });
function submit() {
  const name = nameEl.value.trim();
  let endpoint = endpointEl.value.trim();
  if (!endpoint.startsWith('http')) endpoint = 'https://' + endpoint;
  ipcRenderer.send('${ipcChannel}', JSON.stringify({ name, endpoint }));
}
function cancel() {
  ipcRenderer.send('${ipcChannel}', '');
}
<\/script></body></html>`;
	promptWin.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(html)}`);
	promptWin.once("ready-to-show", () => promptWin.show());
	await new Promise((resolve) => {
		const handler = (_e, data) => {
			ipcMain.removeListener(ipcChannel, handler);
			try {
				if (data) {
					const result = JSON.parse(data);
					if (result.name && result.endpoint) {
						require_dev_env_override.addCustomEnv(result);
						buildAndSetApplicationMenu();
					}
				}
			} catch {}
			if (!promptWin.isDestroyed()) promptWin.close();
			resolve();
		};
		ipcMain.on(ipcChannel, handler);
		promptWin.on("closed", () => {
			ipcMain.removeListener(ipcChannel, handler);
			resolve();
		});
	});
}
var MAX_ZOOM_LEVEL = 6;
var MIN_ZOOM_LEVEL = -6;
function applyZoom(delta) {
	const win = electron.BrowserWindow.getFocusedWindow() ?? electron.BrowserWindow.getAllWindows()[0];
	if (!win) return;
	const target = delta === 0 ? 0 : win.webContents.getZoomLevel() + delta;
	if (target > MAX_ZOOM_LEVEL || target < MIN_ZOOM_LEVEL) return;
	win.webContents.setZoomLevel(target);
	buildAndSetApplicationMenu();
}
function buildZoomMenuItems(t, zoomLevel) {
	const skipAccelerator = process.platform === "darwin";
	return [
		{
			label: t("resetZoom"),
			accelerator: "CmdOrCtrl+0",
			...skipAccelerator && { registerAccelerator: false },
			enabled: zoomLevel !== 0,
			click: () => applyZoom(0)
		},
		{
			label: t("zoomIn"),
			accelerator: "CmdOrCtrl+Plus",
			...skipAccelerator && { registerAccelerator: false },
			enabled: zoomLevel < MAX_ZOOM_LEVEL,
			click: () => applyZoom(1)
		},
		{
			label: t("zoomOut"),
			accelerator: "CmdOrCtrl+-",
			...skipAccelerator && { registerAccelerator: false },
			enabled: zoomLevel > MIN_ZOOM_LEVEL,
			click: () => applyZoom(-1)
		}
	];
}
//#endregion
Object.defineProperty(exports, "STARTUP_PERF_BRIDGE_EVENT", {
	enumerable: true,
	get: function() {
		return STARTUP_PERF_BRIDGE_EVENT;
	}
});
Object.defineProperty(exports, "buildAndSetApplicationMenu", {
	enumerable: true,
	get: function() {
		return buildAndSetApplicationMenu;
	}
});
Object.defineProperty(exports, "buildApplicationMenu", {
	enumerable: true,
	get: function() {
		return buildApplicationMenu;
	}
});
Object.defineProperty(exports, "canOpenStartupReportWindow", {
	enumerable: true,
	get: function() {
		return canOpenStartupReportWindow;
	}
});
Object.defineProperty(exports, "devToolsMenuEnabled", {
	enumerable: true,
	get: function() {
		return devToolsMenuEnabled;
	}
});
Object.defineProperty(exports, "getIOAImWhitelistMenuVisible", {
	enumerable: true,
	get: function() {
		return getIOAImWhitelistMenuVisible;
	}
});
Object.defineProperty(exports, "getLatestStartupTraceId", {
	enumerable: true,
	get: function() {
		return getLatestStartupTraceId;
	}
});
Object.defineProperty(exports, "init_startup_type", {
	enumerable: true,
	get: function() {
		return init_startup_type;
	}
});
Object.defineProperty(exports, "markDaemonObservedFromMain", {
	enumerable: true,
	get: function() {
		return markDaemonObservedFromMain;
	}
});
Object.defineProperty(exports, "markProcessCreated", {
	enumerable: true,
	get: function() {
		return markProcessCreated;
	}
});
Object.defineProperty(exports, "markStartup", {
	enumerable: true,
	get: function() {
		return markStartup;
	}
});
Object.defineProperty(exports, "markWarmActivation", {
	enumerable: true,
	get: function() {
		return markWarmActivation;
	}
});
Object.defineProperty(exports, "openStartupReportWindow", {
	enumerable: true,
	get: function() {
		return openStartupReportWindow;
	}
});
Object.defineProperty(exports, "recordStartupPerfToCollector", {
	enumerable: true,
	get: function() {
		return recordStartupPerfToCollector;
	}
});
Object.defineProperty(exports, "resolveStartupType", {
	enumerable: true,
	get: function() {
		return resolveStartupType;
	}
});
Object.defineProperty(exports, "setIOAImWhitelistMenuVisible", {
	enumerable: true,
	get: function() {
		return setIOAImWhitelistMenuVisible;
	}
});
Object.defineProperty(exports, "setMenuCommandHandler", {
	enumerable: true,
	get: function() {
		return setMenuCommandHandler;
	}
});
Object.defineProperty(exports, "setMenuUserId", {
	enumerable: true,
	get: function() {
		return setMenuUserId;
	}
});
Object.defineProperty(exports, "setSdkIframeFocused", {
	enumerable: true,
	get: function() {
		return setSdkIframeFocused;
	}
});
Object.defineProperty(exports, "setupGuestWebviewZoomForwarding", {
	enumerable: true,
	get: function() {
		return setupGuestWebviewZoomForwarding;
	}
});
Object.defineProperty(exports, "setupMenuStateListeners", {
	enumerable: true,
	get: function() {
		return setupMenuStateListeners;
	}
});
Object.defineProperty(exports, "setupZoomShortcutInterception", {
	enumerable: true,
	get: function() {
		return setupZoomShortcutInterception;
	}
});
Object.defineProperty(exports, "syncIOAImEligibilityToAllWindows", {
	enumerable: true,
	get: function() {
		return syncIOAImEligibilityToAllWindows;
	}
});
Object.defineProperty(exports, "syncIOAImStateToWindow", {
	enumerable: true,
	get: function() {
		return syncIOAImStateToWindow;
	}
});
Object.defineProperty(exports, "toggleIOAImWhitelist", {
	enumerable: true,
	get: function() {
		return toggleIOAImWhitelist;
	}
});
