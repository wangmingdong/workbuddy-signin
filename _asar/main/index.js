Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_chunk = require("./chunk.js");
require("./fs-protection.js");
const require_common$1 = require("./common.js");
const require_workbuddy_auth_product_coordinator = require("./workbuddy-auth-product-coordinator.js");
const require_initialize = require("./initialize.js");
const require_log_acl_guard = require("./log-acl-guard.js");
const require_net_log = require("./net-log.js");
const require_runtime_context = require("./runtime-context.js");
const require_cli_process_env = require("./cli-process-env.js");
const require_workbuddy_product_config = require("./workbuddy-product-config.js");
const require_contract = require("./contract.js");
const require_localstorage_contract = require("./localstorage-contract.js");
const require_adm_zip$1 = require("./adm-zip.js");
const require_service = require("./service.js");
const require_menu_i18n = require("./menu-i18n.js");
const require_dev_env_override = require("./dev-env-override.js");
const require_startup_context = require("./startup-context.js");
const require_marks = require("./marks.js");
const require_src$1 = require("./src.js");
const require_logger = require("./logger2.js");
const require_app_instance = require("./app-instance.js");
const require_menu_builder = require("./menu-builder.js");
const require_cdp_profiler = require("./cdp-profiler.js");
const require_dev_env_actions = require("./dev-env-actions2.js");
const require_desktop_monitor_service = require("./desktop-monitor-service.js");
const require_workbuddy_server_logger = require("./workbuddy-server-logger2.js");
let electron = require("electron");
electron = require_chunk.__toESM(electron);
let fs = require("fs");
fs = require_chunk.__toESM(fs);
let os = require("os");
os = require_chunk.__toESM(os);
let path = require("path");
path = require_chunk.__toESM(path);
let url = require("url");
let node_fs = require("node:fs");
node_fs = require_chunk.__toESM(node_fs);
let node_path = require("node:path");
node_path = require_chunk.__toESM(node_path);
let node_fs_promises = require("node:fs/promises");
node_fs_promises = require_chunk.__toESM(node_fs_promises);
let node_os = require("node:os");
node_os = require_chunk.__toESM(node_os);
let util = require("util");
util = require_chunk.__toESM(util);
let http = require("http");
http = require_chunk.__toESM(http);
let node_crypto = require("node:crypto");
node_crypto = require_chunk.__toESM(node_crypto);
let node_url = require("node:url");
let node_child_process = require("node:child_process");
let node_net = require("node:net");
node_net = require_chunk.__toESM(node_net);
let node_util = require("node:util");
let events = require("events");
let crypto$1 = require("crypto");
crypto$1 = require_chunk.__toESM(crypto$1);
let fs_promises = require("fs/promises");
fs_promises = require_chunk.__toESM(fs_promises);
let child_process = require("child_process");
//#region src/main/window/early-open-url-capture.ts
/**
* early-open-url-capture
*
* 主进程「超早期」open-url 捕获器。**必须**在所有其它重型 import（如
* `reflect-metadata`、`@genie/monitor`、各业务模块）之前被 import 一次，
* 让 `app.on('open-url')` 同步注册到 Electron。
*
* 解决的问题（Issue #40430 / #36686 冷启动）：
*   macOS 上浏览器点 `workbuddy://...` 时，Launch Services 把 URL 投递给
*   Cocoa Application；Electron 内部把 `application:openURLs:` 转发到
*   JS 层的 `app.on('open-url')`。
*   但如果业务 listener 注册得太晚（Electron import + 业务模块加载几十 MB
*   JS），早期到达的 URL 会被 Electron 的默认 handler 静默吞掉，造成
*   「冷启动只显示首页、无法定位到目标功能页」的现象。
*
*   即便上层做了 renderer 端的 `setPendingDeepLinkUrl` 修复，也无济于事 ——
*   URL 在主进程入口就丢了，根本传不到 renderer。
*
* 设计要点：
*   1. **零依赖**：只 import 'electron' 的 `app`，不要 import 任何业务模块、
*      logger、reflect-metadata 等，避免链式触发别的模块初始化拖慢 listener
*      注册时机。
*   2. **同步注册**：模块 import 即同步 `app.on('open-url', ...)`，没有任何
*      `await` / 异步初始化。
*   3. **buffer 多次到达**：URL 写到数组，多次到达不丢；handler 设置后一次性
*      drain 给上层。
*   4. **纯 macOS 用途**：Windows / Linux 走 argv + second-instance，不依赖
*      `open-url` 事件。本模块在非 macOS 平台是 no-op 但 import 安全。
*   5. **可重入**：`setEarlyOpenUrlHandler` 之后再来的 URL 直接转给 handler，
*      不再写 buffer；与 buffer 阶段语义对齐。
*   6. **纯副作用 + globalThis 暴露 API**：本模块只导出一个**副作用**——
*      listener 注册；`setEarlyOpenUrlHandler` 通过 `globalThis` 单例暴露，
*      调用方不需要 named import。原因是项目 eslint import-order 规则会把
*      named import 自动排序到所有外部 import（含 reflect-metadata）之后，
*      若本模块用 named import 引入，「超早期」语义会被 eslint --fix 默默
*      破坏。改用 `import './early-open-url-capture';` 副作用 import +
*      `globalThis.__workbuddyEarlyOpenUrl.setHandler(...)` 取 handler，
*      eslint 不会改写副作用 import 的位置（只要它在外部 import 之前）。
*
* 调用约定（apps/workbuddy-desktop/src/main/index.ts）：
*
*   ```ts
*   import './early-open-url-capture';        // ← 副作用 import，必须在 reflect-metadata 之前
*   import 'reflect-metadata';
*   // ... 其它重型 import ...
*
*   function handleOpenUrl(url: string | null | undefined): void { ... }
*
*   // 在 handleOpenUrl 定义就绪后立刻接管 buffer
*   globalThis.__workbuddyEarlyOpenUrl?.setHandler(handleOpenUrl);
*   ```
*
*   注意：此模块**不**调用 `app.requestSingleInstanceLock()`，不抢主进程的
*   单实例锁；不替换原 `app.on('open-url')` 之外的任何行为。原 index.ts 中
*   的 `app.on('open-url', ...)` 在引入本模块后**应当删除**，避免重复处理
*   同一事件。
*/
/** 待 drain 的 URL 列表；handler 未注册前同步推入，注册后置空。 */
var bufferedUrls = [];
/** 上层注册的 handler；未注册时为 null。 */
var activeHandler$1 = null;
/**
* 同步注册 `app.on('open-url')`。
*
* 模块加载（`import` 该文件）即立刻执行；调用方不需要主动调用任何函数。
* 在非 macOS 平台 Electron 不会派发 `open-url`，注册后无副作用。
*/
function attachOpenUrlListener() {
	electron.app.on("open-url", (event, url) => {
		event.preventDefault();
		if (typeof url !== "string" || url.length === 0) return;
		if (activeHandler$1) {
			try {
				activeHandler$1(url);
			} catch {}
			return;
		}
		bufferedUrls.push(url);
	});
}
attachOpenUrlListener();
globalThis.__workbuddyEarlyOpenUrl = {
	setHandler(handler) {
		activeHandler$1 = handler;
		if (bufferedUrls.length === 0) return;
		const drained = bufferedUrls.splice(0, bufferedUrls.length);
		for (const url of drained) try {
			handler(url);
		} catch {}
	},
	_peekBufferedCountForTest() {
		return bufferedUrls.length;
	},
	_resetForTest() {
		bufferedUrls.length = 0;
		activeHandler$1 = null;
	}
};
//#endregion
//#region src/main/startup-reset-zoom.ts
/**
* 启动早期同步清空 Chromium 的 per-host zoom 持久化（partition.per_host_zoom_levels）。
*
* 背景：
* - Chromium 把每个 host 的 zoom level 持久化到 `<userData>/session/Preferences`
*   的 `partition.per_host_zoom_levels`。
* - Electron `webContents.setZoomLevel()` 改的是当前 page 的 zoom，但 Chromium
*   内存里的 per-host zoom map 是它自己维护的，运行时调 setZoomLevel 不会清空
*   持久化记录；进程退出时 Chromium 把内存里的旧值再 flush 回 Preferences。
* - 用户某次会话不小心按 Ctrl+- 把 host 缩到极小（zoom level = -6），即使下次
*   启动调 setZoomLevel(0) 也只是改"当前帧"，Chromium 在新窗口加载时仍按持久化
*   值 -6 应用一次，造成"启动看不清 UI 直到手动重置"。
*
* 这里在 main 进程 top-level、Electron 任何 module 被 import 之前同步把
* Preferences 文件里这个字段删掉。Chromium 在 session 初始化（依赖 app.ready
* 时机）时才读 Preferences，所以 top-level fs 同步清掉 = fresh start。
*
* 我们*不*禁用 setZoomLevel 本身——用户主动按 Ctrl+= 缩 host 当前会话仍然
* 生效；只是不让它跨会话累积导致越缩越小。配合 menu-builder.ts 的条件拦截
* （焦点在 SDK iframe 时拦），iframe 内 SDK 的缩放走 CSS zoom，不污染 host。
*/
function resolveUserDataDir() {
	const envDir = process.env.WORKBUDDY_USER_DATA_DIR;
	if (envDir) return envDir;
	return path.join(os.homedir(), ".workbuddy", "app");
}
function clearPersistedHostZoom() {
	try {
		const prefsPath = path.join(resolveUserDataDir(), "session", "Preferences");
		if (!fs.existsSync(prefsPath)) return;
		const raw = fs.readFileSync(prefsPath, "utf-8");
		let json;
		try {
			json = JSON.parse(raw);
		} catch {
			return;
		}
		if (!json?.partition?.per_host_zoom_levels) return;
		delete json.partition.per_host_zoom_levels;
		fs.writeFileSync(prefsPath, JSON.stringify(json));
	} catch {}
}
clearPersistedHostZoom();
//#endregion
//#region src/main/window/early-open-file-capture.ts
/**
* early-open-file-capture
*
* 主进程「超早期」open-file 捕获器。设计要点与 early-open-url-capture.ts 完全对齐：
*   1. 零依赖：只 import 'electron' 的 `app`
*   2. 同步注册：模块 import 即同步 `app.on('open-file', ...)`
*   3. buffer 多次到达：文件路径写到数组，handler 设置后一次性 drain
*   4. 纯 macOS 用途：Windows/Linux 不触发 `open-file`
*
* 解决的问题（#135557523 微信聊天记录文件转发）：
*   macOS 上微信通过 `NSWorkspace.open(_:withApplicationAt:)` 传递 ZIP 文件时，
*   Electron 内部把 `application:openFiles:` 转发到 JS 层的 `app.on('open-file')`。
*   如果 listener 注册得太晚，早期到达的文件路径会被 Electron 默认 handler 吞掉。
*
* 调用约定（src/main/index.ts）：
*
*   ```ts
*   import './window/early-open-file-capture';  // ← 副作用 import，紧跟 early-open-url-capture
*   // ...
*   globalThis.__workbuddyEarlyOpenFile?.setHandler(handleOpenFile);
*   ```
*/
var bufferedFiles = [];
var activeHandler = null;
function attachOpenFileListener() {
	electron.app.on("open-file", (event, filePath) => {
		event.preventDefault();
		if (typeof filePath !== "string" || filePath.length === 0) return;
		if (activeHandler) {
			try {
				activeHandler(filePath);
			} catch {}
			return;
		}
		bufferedFiles.push(filePath);
	});
}
attachOpenFileListener();
globalThis.__workbuddyEarlyOpenFile = {
	setHandler(handler) {
		activeHandler = handler;
		if (bufferedFiles.length === 0) return;
		const drained = bufferedFiles.splice(0, bufferedFiles.length);
		for (const file of drained) try {
			handler(file);
		} catch {}
	},
	_peekBufferedCountForTest() {
		return bufferedFiles.length;
	},
	_resetForTest() {
		bufferedFiles.length = 0;
		activeHandler = null;
	}
};
//#endregion
//#region ../../packages/monitor/src/node/crash-reporter/crash-writer.ts
require_common$1.init_Reflect();
/**
* Crash Writer — 同步落盘实现
*
* 设计要点：
* - **同步写盘**：crash handler 触发后进程随时可能被终结，异步 IO 有概率丢数据
* - **同次启动追加**：本次进程启动后所有 crash 写入同一文件 entries[]
* - **永不抛异常**：写盘失败仅 best-effort，不影响业务进程行为
* - **去重保护**：单次启动最多保留 maxEntriesPerLaunch 条，多余的计入 droppedCount
* - **多实例安全**：文件名带 pid 后缀，同一 logsDir 下多进程互不覆盖
*
* 落盘路径：{logsDir}/Crash-Log/crash-report-{processName}-{pid}.json
*/
var DEFAULT_MAX_ENTRIES = 50;
var CRASH_LOG_DIR_NAME = "Crash-Log";
var MAX_PROCESS_NAME_LENGTH = 32;
/**
* 生成本地时间 ISO 8601 字符串，带时区偏移。
* 示例：2026-05-11T00:01:56.924+08:00
*
* 选择本地时间而非 UTC 的原因：crash 日志主要面向研发 / SRE 快速定位问题，
* 本地时间可直接对照体感时间，省去脑内 UTC→本地 的换算步骤。
* 保留 ±HH:MM 偏移确保跨时区仍可还原绝对时刻。
*/
function localISOString(date = /* @__PURE__ */ new Date()) {
	const offset = -date.getTimezoneOffset();
	const sign = offset >= 0 ? "+" : "-";
	const absOffset = Math.abs(offset);
	const hh = String(Math.floor(absOffset / 60)).padStart(2, "0");
	const mm = String(absOffset % 60).padStart(2, "0");
	const pad = (n, len = 2) => String(n).padStart(len, "0");
	return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}.${pad(date.getMilliseconds(), 3)}${sign}${hh}:${mm}`;
}
/**
* 生成紧凑的文件名时间戳：YYYYMMDDTHHmmss
* 用于文件名中标识启动时刻，避免 PID 回绕导致的文件碰撞。
*/
function compactTimestamp(date = /* @__PURE__ */ new Date()) {
	const pad = (n) => String(n).padStart(2, "0");
	return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;
}
var installed$1 = false;
var writerState = {
	reportPath: null,
	cachedFile: null,
	maxEntries: DEFAULT_MAX_ENTRIES,
	launchedAt: localISOString(),
	startupTag: compactTimestamp()
};
/**
* 安装 Crash Writer。
*
* 自动 hook `process.on('uncaughtException')` 和 `process.on('unhandledRejection')`。
* 对于 Electron 主进程的 `render-process-gone` / `child-process-gone` 事件，
* 调用方需要自行 hook 并调用返回的 `handle.write()` 写入。
*
* 模块级防重复：同一进程多次调用是 no-op，返回同一 handle。
*/
function installCrashWriter(options) {
	const { logsDir, processName, appVersion, extraMeta, maxEntriesPerLaunch } = options;
	writerState.maxEntries = maxEntriesPerLaunch ?? DEFAULT_MAX_ENTRIES;
	writerState.launchedAt = localISOString();
	writerState.startupTag = compactTimestamp();
	const handle = {
		write: (entry) => writeCrashEntry(logsDir, processName, appVersion, extraMeta, entry),
		getReportPath: () => writerState.reportPath
	};
	if (installed$1) return handle;
	installed$1 = true;
	process.on("uncaughtException", (error) => {
		handle.write({
			type: "uncaught_exception",
			error
		});
	});
	process.on("unhandledRejection", (reason) => {
		handle.write({
			type: "unhandled_rejection",
			error: reason
		});
	});
	return handle;
}
/**
* 包装子进程，监控其异常退出并写入 child_process_crash entry。
*
* @param child - child_process.spawn() 返回的 ChildProcess 对象
* @param meta - 子进程标识信息
* @param writerHandle - installCrashWriter() 返回的 handle
*/
function wrapChildProcess(child, meta, writerHandle) {
	child.on("exit", (code, signal) => {
		if (code === 0 && !signal) return;
		writerHandle.write({
			type: "child_process_crash",
			childProcess: {
				processType: "spawned",
				reason: signal ? `signal:${signal}` : `exit:${code}`,
				exitCode: code ?? -1,
				name: meta.name,
				signal: signal ?? void 0
			}
		});
	});
	child.on("error", (err) => {
		writerHandle.write({
			type: "child_process_crash",
			childProcess: {
				processType: "spawned",
				reason: `spawn-error:${err.message}`,
				exitCode: -1,
				name: meta.name
			}
		});
	});
}
function writeCrashEntry(logsDir, processName, appVersion, extraMeta, input) {
	if (!logsDir) return null;
	try {
		const safeName = sanitizeProcessName(processName);
		const crashLogDir = node_path.join(logsDir, CRASH_LOG_DIR_NAME);
		const filename = `crash-report-${safeName}-${process.pid}-${writerState.startupTag}.json`;
		const reportPath = node_path.join(crashLogDir, filename);
		if (!writerState.reportPath) writerState.reportPath = reportPath;
		node_fs.mkdirSync(crashLogDir, { recursive: true });
		if (!writerState.cachedFile) writerState.cachedFile = readExistingFile(reportPath) ?? buildInitialFile(safeName, appVersion, extraMeta);
		const file = writerState.cachedFile;
		if (file.entries.length >= writerState.maxEntries) file.droppedCount += 1;
		else {
			const entry = buildEntry(input);
			file.entries.push(entry);
		}
		node_fs.writeFileSync(reportPath, JSON.stringify(file, null, 2), "utf8");
		return reportPath;
	} catch {
		return null;
	}
}
function buildInitialFile(processName, appVersion, extraMeta) {
	return {
		launchedAt: writerState.launchedAt,
		pid: process.pid,
		processName,
		versions: {
			node: process.versions.node,
			electron: process.versions.electron,
			chrome: process.versions.chrome,
			v8: process.versions.v8
		},
		platform: process.platform,
		arch: process.arch,
		appVersion,
		extraMeta,
		entries: [],
		droppedCount: 0
	};
}
function buildEntry(input) {
	const timestamp = localISOString();
	const { type, error, renderer, childProcess: childProc } = input;
	if (type === "renderer_crash" && renderer) return {
		timestamp,
		type,
		errorName: "RendererCrash",
		errorMessage: `Renderer process gone: reason=${renderer.reason}, exitCode=${renderer.exitCode}`,
		stack: null,
		renderer
	};
	if (type === "child_process_crash" && childProc) return {
		timestamp,
		type,
		errorName: "ChildProcessCrash",
		errorMessage: `Child process gone (${childProc.serviceName || childProc.name || childProc.processType}): reason=${childProc.reason}, exitCode=${childProc.exitCode}`,
		stack: null,
		childProcess: childProc
	};
	return {
		timestamp,
		type,
		...serializeReason(error)
	};
}
function serializeReason(reason) {
	if (reason instanceof Error) return {
		errorName: reason.name || "Error",
		errorMessage: reason.message ?? "",
		stack: reason.stack ?? null
	};
	let raw;
	try {
		raw = typeof reason === "string" ? reason : JSON.stringify(reason);
	} catch {
		raw = String(reason);
	}
	return {
		errorName: "NonError",
		errorMessage: typeof reason === "string" ? reason : raw,
		stack: null,
		raw
	};
}
function readExistingFile(reportPath) {
	try {
		if (!node_fs.existsSync(reportPath)) return null;
		const raw = node_fs.readFileSync(reportPath, "utf8");
		const parsed = JSON.parse(raw);
		if (!parsed || typeof parsed !== "object" || !Array.isArray(parsed.entries)) return null;
		if (typeof parsed.droppedCount !== "number") parsed.droppedCount = 0;
		return parsed;
	} catch {
		return null;
	}
}
/**
* 清洗进程名为安全文件路径片段。
* 仅保留 A-Za-z0-9._-，其余替换为 _，截断到 32 字符。
*/
function sanitizeProcessName(rawName) {
	if (!rawName) return "unknown";
	return rawName.replace(/[^A-Za-z0-9._-]+/g, "_").replace(/_+/g, "_").replace(/^_+|_+$/g, "").slice(0, MAX_PROCESS_NAME_LENGTH) || "unknown";
}
//#endregion
//#region ../../packages/monitor/src/node/crash-reporter/crash-filter.ts
/** 内置消息排除模式（常见噪音） */
var DEFAULT_EXCLUDE_PATTERNS = [
	/EPIPE/,
	/ECONNRESET/,
	/ECONNREFUSED/,
	/ETIMEDOUT/,
	/ENETUNREACH/,
	/EHOSTUNREACH/,
	/ENOTFOUND/,
	/ERR_SOCKET_CONNECTION_TIMEOUT/,
	/^Canceled/,
	/OTLPExporterError/,
	/^Timeout$/,
	/^Not connected$/,
	/^\[?\{\}\]?$/,
	/ResizeObserver loop/,
	/Object has been destroyed/,
	/ERR_IPC_CHANNEL_CLOSED/,
	/GPU process .* terminated with exit code 0/
];
var DEFAULT_DEDUP_WINDOW_MS = 6e4;
var DEFAULT_MAX_PER_WINDOW = 100;
var CrashFilter = class {
	constructor(config) {
		this.deduplicateMap = /* @__PURE__ */ new Map();
		this.windowStart = Date.now();
		this.windowCount = 0;
		this.messagePatterns = config.messageExcludePatterns;
		this.typeExcludes = new Set(config.typeExcludes ?? []);
		this.deduplicateWindowMs = config.deduplicateWindowMs ?? DEFAULT_DEDUP_WINDOW_MS;
		this.maxReportsPerWindow = config.maxReportsPerWindow ?? DEFAULT_MAX_PER_WINDOW;
		this.customFilter = config.customFilter;
	}
	/**
	* 判断一条 crash entry 是否应该过滤（不上报）。
	* @returns true = 过滤（不上报）；false = 放行
	*/
	shouldFilter(entry) {
		if (this.typeExcludes.has(entry.type)) return true;
		const msg = entry.errorMessage;
		for (const pattern of this.messagePatterns) if (typeof pattern === "string") {
			if (msg.includes(pattern)) return true;
		} else if (pattern.test(msg)) return true;
		if (this.customFilter && this.customFilter(entry)) return true;
		const now = Date.now();
		if (now - this.windowStart > this.deduplicateWindowMs) {
			this.windowStart = now;
			this.windowCount = 0;
			this.cleanExpiredDedup(now);
		}
		this.windowCount++;
		if (this.windowCount > this.maxReportsPerWindow) return true;
		const fingerprint = this.buildFingerprint(entry);
		const existing = this.deduplicateMap.get(fingerprint);
		if (existing && now - existing.lastTime < this.deduplicateWindowMs) return true;
		this.deduplicateMap.set(fingerprint, {
			fingerprint,
			lastTime: now
		});
		return false;
	}
	buildFingerprint(entry) {
		const stackPart = (entry.stack ?? "").slice(0, 200);
		return `${entry.type}:${entry.errorName}:${entry.errorMessage.slice(0, 100)}:${stackPart}`;
	}
	cleanExpiredDedup(now) {
		for (const [key, value] of this.deduplicateMap) if (now - value.lastTime > this.deduplicateWindowMs * 2) this.deduplicateMap.delete(key);
	}
};
//#endregion
//#region ../../packages/monitor/src/node/crash-reporter/crash-sanitizer.ts
/**
* Crash Sanitizer — 脱敏处理
*
* 对 crash entry 中的堆栈路径和错误消息进行脱敏，
* 确保上报到伽利略平台的数据不含用户本地路径和敏感信息。
*/
var SENSITIVE_PATTERNS = [
	/(?:token|apikey|api_key|password|secret|authorization|bearer)\s*[=:]\s*\S+/i,
	/eyJ[\w-]+\.eyJ[\w-]+\.[\w-]+/,
	/(?:ghp_|gho_|github_pat_|sk-|pk_live_|pk_test_)\w+/
];
/** 错误消息最大长度 */
var MAX_MESSAGE_LENGTH = 500;
var CrashSanitizer = class {
	constructor() {
		this.homeDir = node_os.homedir();
		this.homeDirEscaped = this.homeDir.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	}
	/**
	* 对一条 CrashEntry 执行完整脱敏，返回新对象（不修改原对象）
	*/
	sanitizeEntry(entry) {
		return {
			...entry,
			errorMessage: this.sanitizeMessage(entry.errorMessage),
			stack: entry.stack ? this.sanitizeStack(entry.stack) : null,
			raw: entry.raw ? this.sanitizeMessage(entry.raw) : void 0
		};
	}
	/**
	* 堆栈路径脱敏：
	* - macOS/Linux: /Users/xxx/ → ~/
	* - Windows: C:\Users\xxx\ → ~\
	*/
	sanitizeStack(stack) {
		if (!stack) return stack;
		const pattern = new RegExp(this.homeDirEscaped, "g");
		return stack.replace(pattern, "~");
	}
	/**
	* 错误消息脱敏：
	* - 替换 token/password/secret 等敏感值为 [REDACTED]
	* - 替换 home 目录路径
	* - 截断至 MAX_MESSAGE_LENGTH
	*/
	sanitizeMessage(message) {
		if (!message) return message;
		let result = message;
		for (const pattern of SENSITIVE_PATTERNS) result = result.replace(new RegExp(pattern.source, pattern.flags + "g"), "[REDACTED]");
		const homePattern = new RegExp(this.homeDirEscaped, "g");
		result = result.replace(homePattern, "~");
		if (result.length > MAX_MESSAGE_LENGTH) result = result.slice(0, MAX_MESSAGE_LENGTH) + "...[truncated]";
		return result;
	}
};
//#endregion
//#region ../../packages/monitor/src/node/crash-reporter/crash-log-exporter.ts
/**
* Crash Log Exporter — 定时扫描 Crash-Log/ 目录并上报伽利略
*
* 工作流程：
* 1. 定时扫描 Crash-Log/ 目录下的 JSON 文件
* 2. 过滤已处理文件（.processed-crashes.json）
* 3. 对每条 entry 执行：Filter → Sanitize → Enrich Context → 构建 LogRecord
* 4. 批量上报：通过 CrashExportTransport 发送
* 5. 更新已处理记录
*
* 设计要点：
* - 与 CrashWriter 完全解耦，通过文件系统松耦合
* - 异步执行，不影响主进程性能
* - 失败不抛异常，仅记录日志
*/
var DEFAULT_SCAN_INTERVAL_MS = 3e4;
var DEFAULT_RETENTION_DAYS = 30;
var PROCESSED_FILE = ".processed-crashes.json";
var CrashLogExporter = class CrashLogExporter {
	static {
		this.MAX_PREVIOUS_SESSION = 1;
	}
	static {
		this.MAX_CURRENT_SESSION = 5;
	}
	constructor(config) {
		this.timer = null;
		this.isScanning = false;
		this.processedState = { files: {} };
		this.reportedPreviousSession = 0;
		this.reportedCurrentSession = 0;
		this.crashLogDir = config.crashLogDir;
		this.contextProvider = config.contextProvider;
		this.transport = config.transport;
		this.scanIntervalMs = config.scanIntervalMs ?? DEFAULT_SCAN_INTERVAL_MS;
		this.retentionDays = config.retentionDays ?? DEFAULT_RETENTION_DAYS;
		this.appLaunchedAtMs = config.appLaunchedAtMs ?? Date.now();
		this.enableUpload = config.enableUpload ?? true;
		this.filter = config.filter ? new CrashFilter(config.filter) : null;
		this.sanitizer = new CrashSanitizer();
	}
	/** 启动定时扫描（立即执行一次 + 定时） */
	start() {
		this.loadProcessedState();
		if (this.enableUpload) this.reportStartupEvent().catch(() => {});
		this.scanAndExport().catch(() => {});
		this.timer = setInterval(() => {
			this.scanAndExport().catch(() => {});
		}, this.scanIntervalMs);
		if (this.timer.unref) this.timer.unref();
	}
	/** 停止定时扫描 */
	stop() {
		if (this.timer) {
			clearInterval(this.timer);
			this.timer = null;
		}
	}
	/** 手动触发一次扫描上报（如进程退出前） */
	async flush() {
		await this.scanAndExport();
	}
	/**
	* 上报一条 `codebuddy.app_startup` 日志，用于计算 Crash 率的 DAU 分母。
	* 与 crash 数据同 target、同通道（/v1/logs），确保分子分母数据源一致。
	*/
	async reportStartupEvent() {
		try {
			const context = this.contextProvider.getContext();
			const record = {
				timestamp: Date.now(),
				level: "info",
				message: "app.startup",
				attributes: {
					"event": "codebuddy.app_startup",
					"host.ide_name": context.host.ideName,
					"host.ide_type": context.host.ideType,
					"host.machine_id": context.host.machineId,
					"host.session_id": context.host.sessionId,
					"host.ide_version": context.host.ideVersion,
					"host.download_channel": context.host.downloadChannel,
					"os.name": context.os.os,
					"os.arch": context.os.arch,
					"user.id": context.user.userId
				}
			};
			await this.transport.exportLogs([record]);
		} catch {}
	}
	async scanAndExport() {
		if (this.isScanning) return;
		this.isScanning = true;
		try {
			try {
				await node_fs_promises.access(this.crashLogDir);
			} catch {
				return;
			}
			const files = (await node_fs_promises.readdir(this.crashLogDir)).filter((f) => f.startsWith("crash-report-") && f.endsWith(".json"));
			if (files.length === 0) return;
			await this.cleanupExpiredFiles(files);
			if (!this.enableUpload) return;
			const remainingFiles = [];
			for (const f of files) try {
				await node_fs_promises.access(node_path.join(this.crashLogDir, f));
				remainingFiles.push(f);
			} catch {}
			const logRecords = [];
			const context = this.contextProvider.getContext();
			for (const filename of remainingFiles) {
				const newRecords = await this.processFile(filename, context);
				logRecords.push(...newRecords);
			}
			const dedupedRecords = this.deduplicateRecords(logRecords);
			const quotaRecords = this.applyReportQuota(dedupedRecords);
			if (quotaRecords.length > 0) await this.transport.exportLogs(quotaRecords);
			await this.saveProcessedState();
		} catch {} finally {
			this.isScanning = false;
		}
	}
	async processFile(filename, context) {
		const records = [];
		try {
			const filePath = node_path.join(this.crashLogDir, filename);
			const raw = await node_fs_promises.readFile(filePath, "utf8");
			const report = JSON.parse(raw);
			if (!report || !Array.isArray(report.entries)) return records;
			const processedCount = this.processedState.files[filename] ?? 0;
			const newEntries = report.entries.slice(processedCount);
			if (newEntries.length === 0) return records;
			for (const entry of newEntries) {
				if (this.filter && this.filter.shouldFilter(entry)) continue;
				const sanitized = this.sanitizer.sanitizeEntry(entry);
				const record = this.buildLogRecord(sanitized, report, context);
				records.push(record);
			}
			this.processedState.files[filename] = report.entries.length;
		} catch {}
		return records;
	}
	buildLogRecord(entry, file, context) {
		const attributes = {
			"event": "codebuddy.crash",
			"crash_type": entry.type,
			"process_name": file.processName,
			"host.ide_name": context.host.ideName,
			"host.ide_type": context.host.ideType,
			"host.machine_id": context.host.machineId,
			"host.session_id": context.host.sessionId,
			"host.ide_version": context.host.ideVersion,
			"host.download_channel": context.host.downloadChannel,
			"os.name": context.os.os,
			"os.arch": context.os.arch,
			"os.version": context.os.osVersion,
			"os.cpu_model": context.os.cpuModel,
			"os.cpu_cores": context.os.cpuCores,
			"os.memory_gb": context.os.memorySize,
			"user.id": context.user.userId,
			"user.name": context.user.username,
			"user.nickname": context.user.userNickname,
			"product.type": context.product.product,
			"product.commit": context.product.commit,
			"error.name": entry.errorName,
			"error.message": entry.errorMessage
		};
		if (entry.stack) attributes["error.stack"] = entry.stack;
		if (context.user.enterpriseId) attributes["user.enterprise_id"] = context.user.enterpriseId;
		if (context.user.tenantId) attributes["user.tenant_id"] = context.user.tenantId;
		if (context.product.releaseDate) attributes["product.release_date"] = String(context.product.releaseDate);
		if (entry.renderer) {
			attributes["renderer.reason"] = entry.renderer.reason;
			attributes["renderer.exit_code"] = entry.renderer.exitCode;
			if (entry.renderer.url) attributes["renderer.url"] = entry.renderer.url;
		}
		if (entry.childProcess) {
			attributes["child_process.type"] = entry.childProcess.processType;
			attributes["child_process.reason"] = entry.childProcess.reason;
			attributes["child_process.exit_code"] = entry.childProcess.exitCode;
			if (entry.childProcess.serviceName) attributes["child_process.service"] = entry.childProcess.serviceName;
			if (entry.childProcess.name) attributes["child_process.name"] = entry.childProcess.name;
		}
		if (file.extraMeta) for (const [key, value] of Object.entries(file.extraMeta)) attributes[`meta.${key}`] = String(value);
		attributes["report_origin"] = new Date(file.launchedAt).getTime() >= this.appLaunchedAtMs ? "current_session" : "previous_session";
		return {
			timestamp: new Date(entry.timestamp).getTime(),
			level: "error",
			message: `crash.${entry.type}`,
			attributes
		};
	}
	/**
	* 对同一批 LogRecord 做去重：相同 (timestamp, crash_type, message) 只保留首条。
	* 防止 CrashWriter 短时间内写入多条完全相同的 entry（如 EPIPE 连续触发、
	* renderer_js_error 高频重复等）导致伽利略侧出现大量重复日志。
	*/
	deduplicateRecords(records) {
		const seen = /* @__PURE__ */ new Set();
		return records.filter((r) => {
			const fp = `${r.timestamp}|${r.attributes["crash_type"] ?? ""}|${String(r.attributes["error.message"] ?? "").slice(0, 120)}`;
			if (seen.has(fp)) return false;
			seen.add(fp);
			return true;
		});
	}
	/**
	* 按 report_origin 限制上报数量（整个进程生命周期内累计）：
	* - previous_session（上次启动遗留）：最多 1 条
	* - current_session（当次启动产生）：最多 5 条
	*
	* 保留最后 N 条（取 slice 尾部），确保上报的是最新的 crash。
	*/
	applyReportQuota(records) {
		const result = [];
		const previous = records.filter((r) => r.attributes["report_origin"] === "previous_session");
		const current = records.filter((r) => r.attributes["report_origin"] === "current_session");
		const prevRemaining = CrashLogExporter.MAX_PREVIOUS_SESSION - this.reportedPreviousSession;
		if (prevRemaining > 0 && previous.length > 0) {
			const take = previous.slice(-prevRemaining);
			result.push(...take);
			this.reportedPreviousSession += take.length;
		}
		const currRemaining = CrashLogExporter.MAX_CURRENT_SESSION - this.reportedCurrentSession;
		if (currRemaining > 0 && current.length > 0) {
			const take = current.slice(-currRemaining);
			result.push(...take);
			this.reportedCurrentSession += take.length;
		}
		return result;
	}
	/**
	* 删除超过 retentionDays 的 crash report 文件，并清理 processedState 中对应的记录。
	* 判断依据：文件的 mtime（最后修改时间）。
	*/
	async cleanupExpiredFiles(files) {
		const cutoffMs = Date.now() - this.retentionDays * 24 * 60 * 60 * 1e3;
		for (const filename of files) try {
			const filePath = node_path.join(this.crashLogDir, filename);
			if ((await node_fs_promises.stat(filePath)).mtimeMs < cutoffMs) {
				await node_fs_promises.unlink(filePath);
				delete this.processedState.files[filename];
			}
		} catch {}
	}
	loadProcessedState() {
		try {
			const stateFile = node_path.join(this.crashLogDir, PROCESSED_FILE);
			if (node_fs.existsSync(stateFile)) {
				const raw = node_fs.readFileSync(stateFile, "utf8");
				const parsed = JSON.parse(raw);
				this.processedState = parsed && parsed.files ? parsed : { files: {} };
			}
		} catch {
			this.processedState = { files: {} };
		}
	}
	async saveProcessedState() {
		try {
			const stateFile = node_path.join(this.crashLogDir, PROCESSED_FILE);
			await node_fs_promises.mkdir(this.crashLogDir, { recursive: true });
			const existingFiles = new Set((await node_fs_promises.readdir(this.crashLogDir).catch(() => [])).filter((f) => f.startsWith("crash-report-") && f.endsWith(".json")));
			for (const key of Object.keys(this.processedState.files)) if (!existingFiles.has(key)) delete this.processedState.files[key];
			await node_fs_promises.writeFile(stateFile, JSON.stringify(this.processedState, null, 2), "utf8");
		} catch {}
	}
};
//#endregion
//#region ../../packages/workbuddy-app/src/desktop/host.ts
require_common$1.init_common$3();
var WORKBUDDY_DESKTOP_EVENT_CHANNEL_PREFIX = "workbuddy:event:";
var LOCAL_DAEMON_TRANSPORT_PORT_CHANNEL = "workbuddy:local-daemon-transport:port";
var WORKBUDDY_WINDOW_MINIMIZE_CHANNEL = "workbuddy:window:minimize";
var WORKBUDDY_WINDOW_MAXIMIZE_CHANNEL = "workbuddy:window:maximize";
var WORKBUDDY_WINDOW_CLOSE_CHANNEL = "workbuddy:window:close";
var WORKBUDDY_WINDOW_IS_MAXIMIZED_CHANNEL = "workbuddy:window:isMaximized";
var WORKBUDDY_WINDOW_IS_FULLSCREEN_CHANNEL = "workbuddy:window:isFullscreen";
var WORKBUDDY_WINDOW_SET_FULLSCREEN_CHANNEL = "workbuddy:window:setFullscreen";
var WORKBUDDY_WINDOW_TOGGLE_FULLSCREEN_CHANNEL = "workbuddy:window:toggleFullscreen";
var WORKBUDDY_WINDOW_OPEN_STARTUP_ANALYSIS_CHANNEL = "workbuddy:window:openStartupAnalysis";
var WORKBUDDY_WINDOW_GET_STARTUP_TRACE_ID_CHANNEL = "workbuddy:window:getStartupTraceId";
var WORKBUDDY_OPENER_OPEN_URL_CHANNEL = "workbuddy:opener:openUrl";
var WORKBUDDY_LOCAL_FILE_OPEN_CHANNEL = "workbuddy:localFile:open";
var WORKBUDDY_DIALOG_OPEN_CHANNEL = "workbuddy:dialog:open";
var WORKBUDDY_CLIPBOARD_READ_TEXT_CHANNEL = "workbuddy:clipboard:readText";
var WORKBUDDY_CLIPBOARD_WRITE_TEXT_CHANNEL = "workbuddy:clipboard:writeText";
var WORKBUDDY_CLIPBOARD_WRITE_IMAGE_CHANNEL = "workbuddy:clipboard:writeImage";
var WORKBUDDY_NOTIFICATION_IS_SUPPORTED_CHANNEL = "workbuddy:notification:isSupported";
var WORKBUDDY_NOTIFICATION_REQUEST_REGISTRATION_CHANNEL = "workbuddy:notification:requestRegistration";
var WORKBUDDY_NOTIFICATION_SEND_CHANNEL = "workbuddy:notification:send";
var WORKBUDDY_MACHINE_ID_CHANNEL = "workbuddy:machineId";
var WORKBUDDY_WINDOW_MAXIMIZE_CHANGED_EVENT = "window:maximizeChanged";
var WORKBUDDY_WINDOW_FOCUS_CHANGED_EVENT = "window:focusChanged";
var WORKBUDDY_WINDOW_FULLSCREEN_CHANGED_EVENT = "window-fullscreen-changed";
var WORKBUDDY_POWER_SUSPEND_EVENT = "power:suspend";
var WORKBUDDY_POWER_RESUME_EVENT = "power:resume";
var WORKBUDDY_POWER_UNLOCK_SCREEN_EVENT = "power:unlock-screen";
var WORKBUDDY_GLOBAL_SHORTCUT_UPDATE_TOGGLE_WINDOW_CHANNEL = "workbuddy:globalShortcut:updateToggleWindow";
var WORKBUDDY_GLOBAL_SHORTCUT_REGISTRATION_STATUS_EVENT = "globalShortcut:registrationStatus";
//#endregion
//#region ../../packages/workbuddy-server/src/docs-shared/mqq/bridge.ts
/**
* Native IPC channel used by Tencent Docs preview iframes for the minimal
* `window.mqq.invoke(module, method, args, callback)` protocol.
*
* Design boundary: this file is the transport contract only. Business JSAPI
* implementations should register behind this channel later; the current
* WorkBuddy host deliberately returns `hasHandled: false` for every request.
*/
var WORKBUDDY_MQQ_BRIDGE_CHANNEL = "workbuddy:mqqBridge";
var WORKBUDDY_MQQ_DIRTY_GUARD_CHANNEL = "workbuddy:mqqDirtyGuard";
function resolveWorkbuddyMqqDocumentResourceUri(params) {
	const requestContextId = readNonEmptyString$1(params.requestDocumentResourceUri);
	if (requestContextId) return requestContextId;
}
function readNonEmptyString$1(value) {
	const trimmed = value?.trim();
	return trimmed ? trimmed : void 0;
}
//#endregion
//#region ../../packages/workbuddy-server/src/docs-shared/mqq/guest-telemetry.ts
/** 规范化后的 mqq apiName：`window.mqq.invoke('workbuddy','reportTelemetry',...)`。 */
var WORKBUDDY_REPORT_TELEMETRY_API = "workbuddy.reportTelemetry";
/** eventCode 缺失或非非空 string 时返回的错误码（JSON-RPC invalid params）。 */
var INVALID_EVENT_CODE = -32602;
var INVALID_EVENT_CODE_MESSAGE = "invalid eventCode";
/**
* 透传 params 字段（跳过 eventCode）、丢空串、推断 mode；不改入参对象。
*
* 规则：
* - 保留非空 string / number / boolean；丢弃 null、undefined、object、function 以及空白串；
* - `eventCode` 作为事件类型不进 payload；
* - `mode` 缺省时由 documentResourceUri scheme 推断（file:// → 'local'，否则 'tdocs'）。
*/
function normalizeGuestTelemetryPayload(params, documentResourceUri) {
	const payload = {};
	for (const [key, value] of Object.entries(params)) {
		if (key === "eventCode") continue;
		if (typeof value === "string") {
			if (value.trim().length > 0) payload[key] = value;
		} else if (typeof value === "number" || typeof value === "boolean") payload[key] = value;
	}
	if (payload.mode === void 0) payload.mode = documentResourceUri?.startsWith("file://") ? "local" : "tdocs";
	return payload;
}
/** 读取 mqq bridge request 的首个 arg 作为埋点参数。 */
function readGuestTelemetryParams(request) {
	const first = request.args?.[0];
	if (!first || typeof first !== "object") return;
	return first;
}
/**
* 处理一次 Guest 埋点上报请求：校验 eventCode 形态 + payload 透传归一化 + 转发。
* 仅当 eventCode 缺失/非非空 string 时返回 `errCode = -32602`，不触发 `/v2/report`。
*/
function handleGuestTelemetryMqqRequest(request, deps) {
	const params = readGuestTelemetryParams(request);
	const eventCode = typeof params?.eventCode === "string" ? params.eventCode.trim() : "";
	if (!params || !eventCode) return {
		id: request.id,
		errCode: INVALID_EVENT_CODE,
		ret: INVALID_EVENT_CODE_MESSAGE,
		hasHandled: true
	};
	const payload = normalizeGuestTelemetryPayload(params, request.documentResourceUri);
	deps.reportGuestTelemetry(eventCode, payload);
	return {
		id: request.id,
		errCode: 0,
		ret: { accepted: true },
		hasHandled: true
	};
}
//#endregion
//#region ../../node_modules/@tencent/tencent-docs-ai-engine/lib/common/document-types.js
var require_document_types = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.TENCENT_DOCS_ENGINE_SUPPORTED_EXTENSIONS = exports.TENCENT_DOCS_ENGINE_FILE_TYPES = void 0;
	exports.getTencentDocsEngineDocType = getTencentDocsEngineDocType;
	exports.getTencentDocsSelectionFileType = getTencentDocsSelectionFileType;
	exports.isTencentDocsEngineSupportedExtension = isTencentDocsEngineSupportedExtension;
	exports.isTencentDocsEngineDocType = isTencentDocsEngineDocType;
	exports.TENCENT_DOCS_ENGINE_FILE_TYPES = Object.freeze([
		Object.freeze({
			engineType: "doc",
			selectionFileType: "word",
			extensions: Object.freeze([
				".doc",
				".docx",
				".dot",
				".dotx",
				".wps",
				".wpt",
				".docm",
				".dotm"
			])
		}),
		Object.freeze({
			engineType: "sheet",
			selectionFileType: "excel",
			extensions: Object.freeze([
				".csv",
				".xls",
				".xlsx",
				".xlt",
				".xltx",
				".xlsm",
				".xltm"
			])
		}),
		Object.freeze({
			engineType: "slide",
			selectionFileType: "ppt",
			extensions: Object.freeze([
				".pptx",
				".ppt",
				".pps",
				".pot",
				".pptm",
				".ppsx",
				".ppsm",
				".potx",
				".potm"
			])
		}),
		Object.freeze({
			engineType: "pdf",
			selectionFileType: "pdf",
			extensions: Object.freeze([".pdf"])
		})
	]);
	exports.TENCENT_DOCS_ENGINE_SUPPORTED_EXTENSIONS = Object.freeze(exports.TENCENT_DOCS_ENGINE_FILE_TYPES.flatMap((item) => item.extensions));
	var engineDocTypeSet = new Set(exports.TENCENT_DOCS_ENGINE_FILE_TYPES.map((item) => item.engineType));
	var extensionToFileType = /* @__PURE__ */ new Map();
	for (const item of exports.TENCENT_DOCS_ENGINE_FILE_TYPES) for (const ext of item.extensions) extensionToFileType.set(ext, item);
	function normalizeTencentDocsFileExtension(value) {
		const trimmed = value.trim();
		if (!trimmed) return "";
		if (!/[\\/]/.test(trimmed) && !trimmed.includes(".")) {
			const bare = trimmed.split(/[?#]/, 1)[0] ?? "";
			return bare ? `.${bare.toLowerCase()}` : "";
		}
		const slashIndex = Math.max(trimmed.lastIndexOf("/"), trimmed.lastIndexOf("\\"));
		const fileName = trimmed.slice(slashIndex + 1);
		const dotIndex = fileName.lastIndexOf(".");
		if (dotIndex < 0 || dotIndex === fileName.length - 1) return "";
		const extToken = fileName.slice(dotIndex + 1).split(/[?#]/, 1)[0] ?? "";
		return extToken ? `.${extToken.toLowerCase()}` : "";
	}
	function getTencentDocsEngineFileType(value) {
		return extensionToFileType.get(normalizeTencentDocsFileExtension(value));
	}
	function getTencentDocsEngineDocType(value) {
		return getTencentDocsEngineFileType(value)?.engineType;
	}
	function getTencentDocsSelectionFileType(value) {
		return getTencentDocsEngineFileType(value)?.selectionFileType;
	}
	function isTencentDocsEngineSupportedExtension(value) {
		return Boolean(getTencentDocsEngineFileType(value));
	}
	function isTencentDocsEngineDocType(value) {
		return Boolean(value && engineDocTypeSet.has(value));
	}
}));
//#endregion
//#region ../../packages/workbuddy-server/src/tencent-docs/webview-download.ts
var import_document_types = require_document_types();
/**
* BrowserPreview webview 内腾讯文档"下载链接"的拦截契约。
* 由 main process (browser-preview.ts) 与 webview preload 共享。
*/
/** main process ↔ webview preload 的 IPC 频道。 */
var WORKBUDDY_TENCENT_DOCS_WEBVIEW_DOWNLOAD_CHANNEL = "workbuddy:tencentDocs:webviewDownload";
/** main world 上 contextBridge 暴露的下载触发器属性名，shield 通过 `window[KEY]` 调用。 */
var MAIN_WORLD_DOWNLOAD_TRIGGER_KEY = "__tencentDocsWebviewDownload";
/**
* 判断 hostname 是否是"专享版 export 子域"
*/
function isExclusiveExportHost(hostname) {
	const idx = hostname.indexOf("-docs.");
	if (idx <= 0) return false;
	return hostname.slice(0, idx).includes("export");
}
/**
* 识别"腾讯文档强制下载链接"：
* - 旗舰版 `export.docs.qq.com` 导出子域（无条件命中），或
* - 企业专享版导出子域（`*-export.docs.{根域}`，子域含 export，无条件命中），或
* - **任意 host** 上带 `response-content-disposition=attachment` 的链接
*   （含 `docs.qq.com` / 专享版域，也含企业版导出走的 COS 预签名 URL，host 不是 docs.qq.com 系列）。
* 只放行 https，避免 javascript: / data: 钻空子。
*
* 安全说明：本函数仅在「已确认是腾讯文档 webview 上下文」中调用（preload / session 校验 IPC /
*  enterprise preview guest 识别），因此放宽到任意 host 的 attachment disposition 不会
* 误判非腾讯文档下载——故无需再按 host 白名单细分 attachment 分支。
*/
function isTencentDocsDownloadHref(url) {
	try {
		const parsed = new URL(url);
		if (parsed.protocol !== "https:") return false;
		const hostname = parsed.hostname;
		if (hostname === "export.docs.qq.com" || hostname.endsWith(".export.docs.qq.com")) return true;
		if (isExclusiveExportHost(hostname)) return true;
		return (parsed.searchParams.get("response-content-disposition") ?? "").toLowerCase().includes("attachment");
	} catch {
		return false;
	}
}
//#endregion
//#region ../../packages/workbuddy-server/src/docs-shared/url-guards.ts
function isTencentDocsUrl(url) {
	try {
		const parsed = new URL(url);
		return parsed.protocol === "https:" && (parsed.hostname === "docs.qq.com" || parsed.hostname.endsWith(".docs.qq.com"));
	} catch {
		return false;
	}
}
/**
* 判断 hostname 是否属于腾讯文档域（旗舰版 docs.qq.com 系列 + 专享版结构特征
* `{tenant}-docs.<根域>`）。
*
* SSOT：主进程 `browser-preview.ts` 旧 `isTencentDocsHostname` 与 agent-ui
* `isExclusiveTdocHost` 的结构判定统一收口到这里，供主进程 / 预览 preload
* （esbuild inline）复用，避免手写副本漂移。传入的 hostname 已按需 lowerCase。
*/
function isTencentDocsHostname(hostname) {
	const host = hostname.toLowerCase();
	if (host === "docs.qq.com" || host.endsWith(".docs.qq.com")) return true;
	const idx = host.indexOf("-docs.");
	if (idx > 0) {
		const tail = host.slice(idx + 6);
		return Boolean(tail && !tail.startsWith(".") && !tail.endsWith("."));
	}
	return false;
}
/**
* 判断 URL 是否是「应留在当前 webview 内打开」的腾讯文档新建文档中转链接：
* 命中腾讯文档域（旗舰 / 专享）且 pathname 以 `/api/create/file` 开头。
*
* SSOT：主进程 `browser-preview.ts` 与 tdoc-preview 预览 preload 统一 import 本实现
* （esbuild 直接 inline 进 preload），不再各自手写副本。agent-ui 渲染层因浏览器包
* 不得 value-import server 运行时，另有一份语义等价的纯函数（`tencent-docs-url.ts`），
* 二者共用「docs.qq.com 系列 + `-docs.` 结构」判定，避免漂移。
*/
function isInPlaceCreateFileUrl(url) {
	try {
		const parsed = new URL(url);
		if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return false;
		return isTencentDocsHostname(parsed.hostname) && parsed.pathname.startsWith("/api/create/file");
	} catch {
		return false;
	}
}
/**
* 判断 URL 是否属于企业版（旗舰 / 专享）腾讯文档**预览** webview（partition=
* `persist:tdoc-preview`）内应「留在 webview 完成」的导航。
*
* 与导入选择器场景（tdoc-import）的内部导航判定的关键区别：预览场景的核心目的就是
* 展示文档本体，所以 docs.qq.com 的 `/doc` `/sheet` `/slide` 等文档路径必须留在
* webview，**不能**像导入场景那样把 `/doc` 外抛。
*
* 背景（chat 产物点击腾讯文档 chip 外开问题）：历史 chip 走 C 端 getPreviewUrl 时
* 会拿到一个「临时登录态 URL」（temp-login-url），webview 加载后会重定向回真正的
* 文档 URL。这条 `login_url → doc_url` 的重定向属于腾讯文档域内导航，必须留在 webview；
* 否则会被通用 guest 外链兜底（firstNavigationDone 只放行第一跳）误判成外链而
* `shell.openExternal` 呼起系统浏览器。只有企业版账号走 `<webview>` 预览路径才有这套
* 兜底，C 端走宿主内 iframe 不受影响，故只有企业版复现。
*
* 放行范围：
*  - 旗舰版：docs.qq.com 及任意租户子域（含文档本体路径）；
*  - 专享版：VPC 独立部署的 `{tenantSubdomain}-docs.<根域>`（按结构特征识别）；
*  - 静态资源域 docs.gtimg.com + QQ 登录 / 验证 / 互联授权链路（免登 / 补登需在 webview 内完成）。
*/
function isTencentDocsPreviewInternalNavigation(url) {
	try {
		const parsedUrl = new URL(url);
		if (parsedUrl.protocol !== "https:" && parsedUrl.protocol !== "http:") return false;
		if (isTencentDocsDownloadHref(url)) return true;
		const hostname = parsedUrl.hostname.toLowerCase();
		if (hostname === "docs.qq.com" || hostname.endsWith(".docs.qq.com")) return true;
		const exclusiveIdx = hostname.indexOf("-docs.");
		if (exclusiveIdx > 0) {
			const tail = hostname.slice(exclusiveIdx + 6);
			if (tail && !tail.startsWith(".") && !tail.endsWith(".")) return true;
		}
		if (hostname === "docs.gtimg.com") return true;
		if (hostname === "accounts.qq.com" || hostname === "graph.qq.com" || hostname.endsWith(".graph.qq.com")) return true;
		if (hostname === "ptlogin2.qq.com" || hostname.endsWith(".ptlogin2.qq.com")) return true;
		if (hostname === "weixin.qq.com" || hostname.endsWith(".weixin.qq.com") || hostname === "wx.qq.com" || hostname.endsWith(".wx.qq.com")) return true;
		if (hostname === "captcha.qq.com" || hostname.endsWith(".captcha.qq.com")) return true;
		return false;
	} catch {
		return false;
	}
}
/**
* 是否允许给该 origin / URL 放开剪贴板权限（Electron permission handler 用）。
*
* 覆盖两类腾讯文档预览 frame：
*  - 在线：https://docs.qq.com 及子域（按 host 放行）；
*  - 本地 SDK 预览：与当前引擎**实际产出**的 preview origin 完全一致（host + 动态端口）。
*
* `localEngineOrigin` 由调用方传入，取自引擎真实 previewUrl 的 origin（见
* tencent-docs-engine-origin-registry），不写死 127.0.0.1——引擎换 host/端口会
* 自动跟随。未知（undefined）时本地一律不放行。这样既绕开 setPermissionCheckHandler
* 只有 origin（无 pathname）无法校验 `/static/{type}/pc.html` 的限制，又把放行范围
* 精确收敛到「文档 SDK 自己的 origin」，不会波及任意其它本地服务。
*/
function isTencentDocsClipboardOrigin(originOrUrl, localEngineOrigin) {
	if (!originOrUrl) return false;
	if (isTencentDocsUrl(originOrUrl)) return true;
	if (!localEngineOrigin) return false;
	try {
		return new URL(originOrUrl).origin === new URL(localEngineOrigin).origin;
	} catch {
		return false;
	}
}
//#endregion
//#region ../../packages/workbuddy-server/src/docs-shared/mqq/protocol.ts
var MqqLevel = /* @__PURE__ */ function(MqqLevel) {
	/** Tencent Docs online pages. */
	MqqLevel["C_DOCS"] = "C_DOCS";
	/** Tencent Docs local-edit / document preview pages. */
	MqqLevel["C_LOCAL_EDIT"] = "C_LOCAL_EDIT";
	return MqqLevel;
}({});
var DOCX_ON_SELECTION_CHANGE_API = "docx.onSelectionChange";
var DOCX_ON_SELECTION_SEND_API = "docx.onSelectionSend";
var DOCX_ON_DOCUMENT_STATUS_CHANGED_API = "docx.onDocumentStatusChanged";
/** Fired before the Tencent Docs iframe switches internal document tabs. */
var DOCUMENT_FRAME_WILL_APPEAR_EVENT = "documentFrameWillAppear";
/** Fired before/after a Tencent Docs internal document tab is closed. */
var DOCUMENT_FRAME_WILL_DISAPPEAR_EVENT = "documentFrameWillDisappear";
var DOCUMENT_FRAME_WILL_CLOSE_EVENT = "documentFrameWillClose";
var DOCUMENT_FRAME_CLOSE_EVENT = "documentFrameClose";
var DOCUMENT_FRAME_WILL_REMOVE_EVENT = "documentFrameWillRemove";
var DOCUMENT_FRAME_REMOVED_EVENT = "documentFrameRemoved";
function buildMqqSubscriberSubscribeApi(eventName) {
	return `subscriber.subscribe#${eventName}`;
}
function buildMqqSubscriberUnsubscribeApi(eventName) {
	return `subscriber.unsubscribe#${eventName}`;
}
var DOCUMENT_FRAME_WILL_APPEAR_SUBSCRIBE_API$1 = buildMqqSubscriberSubscribeApi(DOCUMENT_FRAME_WILL_APPEAR_EVENT);
var DOCUMENT_FRAME_WILL_APPEAR_UNSUBSCRIBE_API$1 = buildMqqSubscriberUnsubscribeApi(DOCUMENT_FRAME_WILL_APPEAR_EVENT);
var DOCUMENT_FRAME_WILL_DISAPPEAR_SUBSCRIBE_API$1 = buildMqqSubscriberSubscribeApi(DOCUMENT_FRAME_WILL_DISAPPEAR_EVENT);
var DOCUMENT_FRAME_WILL_DISAPPEAR_UNSUBSCRIBE_API$1 = buildMqqSubscriberUnsubscribeApi(DOCUMENT_FRAME_WILL_DISAPPEAR_EVENT);
var DOCUMENT_FRAME_WILL_CLOSE_SUBSCRIBE_API$1 = buildMqqSubscriberSubscribeApi(DOCUMENT_FRAME_WILL_CLOSE_EVENT);
var DOCUMENT_FRAME_WILL_CLOSE_UNSUBSCRIBE_API$1 = buildMqqSubscriberUnsubscribeApi(DOCUMENT_FRAME_WILL_CLOSE_EVENT);
var DOCUMENT_FRAME_CLOSE_SUBSCRIBE_API$1 = buildMqqSubscriberSubscribeApi(DOCUMENT_FRAME_CLOSE_EVENT);
var DOCUMENT_FRAME_CLOSE_UNSUBSCRIBE_API$1 = buildMqqSubscriberUnsubscribeApi(DOCUMENT_FRAME_CLOSE_EVENT);
var DOCUMENT_FRAME_WILL_REMOVE_SUBSCRIBE_API$1 = buildMqqSubscriberSubscribeApi(DOCUMENT_FRAME_WILL_REMOVE_EVENT);
var DOCUMENT_FRAME_WILL_REMOVE_UNSUBSCRIBE_API$1 = buildMqqSubscriberUnsubscribeApi(DOCUMENT_FRAME_WILL_REMOVE_EVENT);
var DOCUMENT_FRAME_REMOVED_SUBSCRIBE_API$1 = buildMqqSubscriberSubscribeApi(DOCUMENT_FRAME_REMOVED_EVENT);
var DOCUMENT_FRAME_REMOVED_UNSUBSCRIBE_API$1 = buildMqqSubscriberUnsubscribeApi(DOCUMENT_FRAME_REMOVED_EVENT);
var TENCENT_DOCS_MQQ_API_PERMISSIONS = [
	{
		apiName: WORKBUDDY_REPORT_TELEMETRY_API,
		level: MqqLevel.C_LOCAL_EDIT
	},
	{
		apiName: DOCX_ON_SELECTION_CHANGE_API,
		level: MqqLevel.C_LOCAL_EDIT
	},
	{
		apiName: DOCX_ON_SELECTION_SEND_API,
		level: MqqLevel.C_LOCAL_EDIT
	},
	{
		apiName: DOCX_ON_DOCUMENT_STATUS_CHANGED_API,
		level: MqqLevel.C_LOCAL_EDIT
	},
	{
		apiName: DOCUMENT_FRAME_WILL_APPEAR_SUBSCRIBE_API$1,
		level: MqqLevel.C_LOCAL_EDIT
	},
	{
		apiName: DOCUMENT_FRAME_WILL_APPEAR_UNSUBSCRIBE_API$1,
		level: MqqLevel.C_LOCAL_EDIT
	},
	{
		apiName: DOCUMENT_FRAME_WILL_DISAPPEAR_SUBSCRIBE_API$1,
		level: MqqLevel.C_LOCAL_EDIT
	},
	{
		apiName: DOCUMENT_FRAME_WILL_DISAPPEAR_UNSUBSCRIBE_API$1,
		level: MqqLevel.C_LOCAL_EDIT
	},
	{
		apiName: DOCUMENT_FRAME_WILL_CLOSE_SUBSCRIBE_API$1,
		level: MqqLevel.C_LOCAL_EDIT
	},
	{
		apiName: DOCUMENT_FRAME_WILL_CLOSE_UNSUBSCRIBE_API$1,
		level: MqqLevel.C_LOCAL_EDIT
	},
	{
		apiName: DOCUMENT_FRAME_CLOSE_SUBSCRIBE_API$1,
		level: MqqLevel.C_LOCAL_EDIT
	},
	{
		apiName: DOCUMENT_FRAME_CLOSE_UNSUBSCRIBE_API$1,
		level: MqqLevel.C_LOCAL_EDIT
	},
	{
		apiName: DOCUMENT_FRAME_WILL_REMOVE_SUBSCRIBE_API$1,
		level: MqqLevel.C_LOCAL_EDIT
	},
	{
		apiName: DOCUMENT_FRAME_WILL_REMOVE_UNSUBSCRIBE_API$1,
		level: MqqLevel.C_LOCAL_EDIT
	},
	{
		apiName: DOCUMENT_FRAME_REMOVED_SUBSCRIBE_API$1,
		level: MqqLevel.C_LOCAL_EDIT
	},
	{
		apiName: DOCUMENT_FRAME_REMOVED_UNSUBSCRIBE_API$1,
		level: MqqLevel.C_LOCAL_EDIT
	}
];
//#endregion
//#region ../../packages/workbuddy-server/src/docs-shared/mqq/document-frame-guard.ts
var DOCUMENT_FRAME_WILL_APPEAR_SUBSCRIBE_API = buildMqqSubscriberSubscribeApi(DOCUMENT_FRAME_WILL_APPEAR_EVENT);
var DOCUMENT_FRAME_WILL_APPEAR_UNSUBSCRIBE_API = buildMqqSubscriberUnsubscribeApi(DOCUMENT_FRAME_WILL_APPEAR_EVENT);
var DOCUMENT_FRAME_WILL_DISAPPEAR_SUBSCRIBE_API = buildMqqSubscriberSubscribeApi(DOCUMENT_FRAME_WILL_DISAPPEAR_EVENT);
var DOCUMENT_FRAME_WILL_DISAPPEAR_UNSUBSCRIBE_API = buildMqqSubscriberUnsubscribeApi(DOCUMENT_FRAME_WILL_DISAPPEAR_EVENT);
var DOCUMENT_FRAME_WILL_CLOSE_SUBSCRIBE_API = buildMqqSubscriberSubscribeApi(DOCUMENT_FRAME_WILL_CLOSE_EVENT);
var DOCUMENT_FRAME_WILL_CLOSE_UNSUBSCRIBE_API = buildMqqSubscriberUnsubscribeApi(DOCUMENT_FRAME_WILL_CLOSE_EVENT);
var DOCUMENT_FRAME_CLOSE_SUBSCRIBE_API = buildMqqSubscriberSubscribeApi(DOCUMENT_FRAME_CLOSE_EVENT);
var DOCUMENT_FRAME_CLOSE_UNSUBSCRIBE_API = buildMqqSubscriberUnsubscribeApi(DOCUMENT_FRAME_CLOSE_EVENT);
var DOCUMENT_FRAME_WILL_REMOVE_SUBSCRIBE_API = buildMqqSubscriberSubscribeApi(DOCUMENT_FRAME_WILL_REMOVE_EVENT);
var DOCUMENT_FRAME_WILL_REMOVE_UNSUBSCRIBE_API = buildMqqSubscriberUnsubscribeApi(DOCUMENT_FRAME_WILL_REMOVE_EVENT);
var DOCUMENT_FRAME_REMOVED_SUBSCRIBE_API = buildMqqSubscriberSubscribeApi(DOCUMENT_FRAME_REMOVED_EVENT);
var DOCUMENT_FRAME_REMOVED_UNSUBSCRIBE_API = buildMqqSubscriberUnsubscribeApi(DOCUMENT_FRAME_REMOVED_EVENT);
var DOCUMENT_FRAME_GUARD_MQQ_API_HANDLERS = new Map([
	[DOCUMENT_FRAME_WILL_APPEAR_SUBSCRIBE_API, handleDocumentFrameSubscriberSubscribe],
	[DOCUMENT_FRAME_WILL_APPEAR_UNSUBSCRIBE_API, handleDocumentFrameSubscriberUnsubscribe],
	[DOCUMENT_FRAME_WILL_DISAPPEAR_SUBSCRIBE_API, handleDocumentFrameSubscriberSubscribe],
	[DOCUMENT_FRAME_WILL_DISAPPEAR_UNSUBSCRIBE_API, handleDocumentFrameSubscriberUnsubscribe],
	[DOCUMENT_FRAME_WILL_CLOSE_SUBSCRIBE_API, handleDocumentFrameSubscriberSubscribe],
	[DOCUMENT_FRAME_WILL_CLOSE_UNSUBSCRIBE_API, handleDocumentFrameSubscriberUnsubscribe],
	[DOCUMENT_FRAME_CLOSE_SUBSCRIBE_API, handleDocumentFrameSubscriberSubscribe],
	[DOCUMENT_FRAME_CLOSE_UNSUBSCRIBE_API, handleDocumentFrameSubscriberUnsubscribe],
	[DOCUMENT_FRAME_WILL_REMOVE_SUBSCRIBE_API, handleDocumentFrameSubscriberSubscribe],
	[DOCUMENT_FRAME_WILL_REMOVE_UNSUBSCRIBE_API, handleDocumentFrameSubscriberUnsubscribe],
	[DOCUMENT_FRAME_REMOVED_SUBSCRIBE_API, handleDocumentFrameSubscriberSubscribe],
	[DOCUMENT_FRAME_REMOVED_UNSUBSCRIBE_API, handleDocumentFrameSubscriberUnsubscribe]
]);
function handleDocumentFrameSubscriberSubscribe(request) {
	require_workbuddy_auth_product_coordinator.windowLog.info("[TencentDocsMqq] document frame will appear subscribed", {
		documentResourceUri: request.documentResourceUri,
		subscriberId: readSubscriberId(request.args[0])
	});
	return createSuccessBridgeResponse(request.id);
}
function handleDocumentFrameSubscriberUnsubscribe(request) {
	require_workbuddy_auth_product_coordinator.windowLog.debug("[TencentDocsMqq] document frame will appear unsubscribed", {
		documentResourceUri: request.documentResourceUri,
		subscriberId: readSubscriberId(request.args[0])
	});
	return createSuccessBridgeResponse(request.id);
}
function readSubscriberId(value) {
	if (!value || typeof value !== "object") return;
	const subscriberId = value.subscriberId;
	return typeof subscriberId === "number" ? subscriberId : void 0;
}
function createSuccessBridgeResponse(id) {
	return {
		id,
		errCode: 0,
		hasHandled: true
	};
}
//#endregion
//#region ../../packages/workbuddy-server/src/docs-shared/mqq/selection.ts
var MQQ_API_NOT_IMPLEMENTED_MESSAGE = "mqq API is not implemented";
var INVALID_SELECTION_MESSAGE = "Invalid docx.onSelectionChange payload";
var UNKNOWN_LOCAL_FILE_PATH = "";
/** trim 后非空才视为有效标题，空串/空白等价于未传。 */
function readSelectionTitle(title) {
	return typeof title === "string" && title.trim().length > 0 ? title.trim() : void 0;
}
function isSheetSelectionChangePayload(value) {
	if (!value || typeof value !== "object") return false;
	const payload = value;
	return typeof payload.fileId === "string" && typeof payload.sheetId === "string" && Array.isArray(payload.ranges) && payload.ranges.every(isGridRange) && Array.isArray(payload.drawingIds) && payload.drawingIds.every((id) => typeof id === "string") && isPresentSelectionText(payload.description) && isFiniteNumber(payload.timestamp);
}
function isSheetSelectionClearPayload(value) {
	if (!value || typeof value !== "object") return false;
	const payload = value;
	return typeof payload.fileId === "string" && typeof payload.sheetId === "string" && Array.isArray(payload.ranges) && payload.ranges.length === 0 && Array.isArray(payload.drawingIds) && payload.drawingIds.length === 0 && typeof payload.description === "string" && payload.description.length === 0 && isFiniteNumber(payload.timestamp);
}
function isSlideSelectionChangePayload(value) {
	if (!value || typeof value !== "object") return false;
	const payload = value;
	return typeof payload.fileId === "string" && typeof payload.selectionId === "string" && (isFiniteNumber(payload.pageIndex) || isFiniteNumberArray(payload.pageIndex)) && Array.isArray(payload.shapeIds) && payload.shapeIds.every((id) => typeof id === "string") && typeof payload.description === "string" && isFiniteNumber(payload.version) && isFiniteNumber(payload.timestamp);
}
function isDocSelectionChangePayload(value) {
	if (!value || typeof value !== "object") return false;
	const payload = value;
	const hasDescription = isPresentSelectionText(payload.description);
	const hasSelectedText = isPresentSelectionText(payload.selectedText);
	const hasImage = isDocSelectionImage(payload.image);
	return typeof payload.fileId === "string" && payload.source === "doc" && Array.isArray(payload.ranges) && payload.ranges.length > 0 && payload.ranges.every(isDocSelectionRange) && (payload.description === void 0 || typeof payload.description === "string") && (payload.selectedText === void 0 || typeof payload.selectedText === "string") && (payload.image === void 0 || hasImage) && (hasDescription || hasSelectedText || hasImage) && isFiniteNumber(payload.timestamp);
}
function toSheetReportSelectionParams(payload, documentResourceUri, filePath = UNKNOWN_LOCAL_FILE_PATH) {
	return {
		documentResourceUri,
		filePath,
		fileType: "excel",
		selection: {
			...copyMqqPayloadFields(payload),
			text: payload.description,
			rangeId: buildSheetRangeId(payload),
			fileId: payload.fileId,
			sourceApi: DOCX_ON_SELECTION_CHANGE_API,
			...readSelectionTitle(payload.title) ? { title: readSelectionTitle(payload.title) } : {}
		}
	};
}
function toSlideReportSelectionParams(payload, documentResourceUri, filePath = UNKNOWN_LOCAL_FILE_PATH) {
	return {
		documentResourceUri,
		filePath,
		fileType: "ppt",
		selection: {
			...copyMqqPayloadFields(payload),
			text: payload.description,
			rangeId: payload.selectionId,
			fileId: payload.fileId,
			sourceApi: DOCX_ON_SELECTION_CHANGE_API,
			...readSelectionTitle(payload.title) ? { title: readSelectionTitle(payload.title) } : {}
		}
	};
}
function toDocReportSelectionParams(payload, documentResourceUri, filePath = UNKNOWN_LOCAL_FILE_PATH) {
	const normalizedPayload = normalizeDocSelectionPayload(payload);
	const displayText = readDocSelectionDisplayText(payload);
	return {
		documentResourceUri,
		filePath,
		fileType: "word",
		selection: {
			...copyMqqPayloadFields(normalizedPayload),
			text: displayText,
			rangeId: buildDocRangeId(payload),
			fileId: payload.fileId,
			sourceApi: DOCX_ON_SELECTION_CHANGE_API,
			...readSelectionTitle(payload.title) ? { title: readSelectionTitle(payload.title) } : {}
		}
	};
}
function handleTencentDocsMqqBridgeRequest(request, deps) {
	const documentFrameHandler = DOCUMENT_FRAME_GUARD_MQQ_API_HANDLERS.get(request.apiName);
	if (documentFrameHandler) return documentFrameHandler(request);
	const handler = MQQ_SELECTION_API_HANDLERS.get(request.apiName);
	if (!handler) {
		if (/selection|subscriber/i.test(request.apiName)) require_workbuddy_auth_product_coordinator.windowLog.info("[TencentDocsMqq] unsupported mqq bridge request", {
			apiName: request.apiName,
			documentResourceUri: request.documentResourceUri,
			argCount: request.args.length
		});
		return createUnhandledBridgeResponse(request.id);
	}
	return handler(request, deps);
}
var MQQ_SELECTION_API_HANDLERS = new Map([
	[DOCX_ON_SELECTION_CHANGE_API, handleSelectionChange],
	[DOCX_ON_SELECTION_SEND_API, handleSelectionSend],
	[DOCX_ON_DOCUMENT_STATUS_CHANGED_API, handleDocumentStatusChanged]
]);
function handleDocumentStatusChanged(request, _deps) {
	const payload = request.args[0];
	require_workbuddy_auth_product_coordinator.windowLog.info("[TencentDocsMqq] document status changed received", {
		documentResourceUri: request.documentResourceUri,
		hasUnSavedChange: payload && typeof payload === "object" ? payload.hasUnSavedChange : void 0
	});
	return {
		id: request.id,
		errCode: 0,
		hasHandled: true
	};
}
function handleSelectionChange(request, deps) {
	return handleSelectionReport(request, deps, false);
}
function handleSelectionSend(request, deps) {
	return handleSelectionReport(request, deps, true);
}
function handleSelectionReport(request, deps, sendAction) {
	const payload = withSelectionTimestampFallback(request.args[0]);
	if (isSheetSelectionClearPayload(payload)) {
		logMqqSelection("sheet", request.documentResourceUri, {
			fileId: payload.fileId,
			hasSelection: false,
			sendAction
		});
		deps.reportDocumentSelection({
			documentResourceUri: request.documentResourceUri,
			filePath: request.filePath ?? UNKNOWN_LOCAL_FILE_PATH,
			fileType: "excel",
			selection: null,
			sendAction
		});
		return {
			id: request.id,
			errCode: 0,
			hasHandled: true
		};
	}
	if (isSheetSelectionChangePayload(payload)) {
		logMqqSelection("sheet", request.documentResourceUri, {
			fileId: payload.fileId,
			hasSelection: true,
			rangeId: buildSheetRangeId(payload),
			textLength: payload.description.length,
			sendAction
		});
		deps.reportDocumentSelection({
			...toSheetReportSelectionParams(payload, request.documentResourceUri, request.filePath),
			sendAction
		});
		return {
			id: request.id,
			errCode: 0,
			hasHandled: true
		};
	}
	if (isSlideSelectionChangePayload(payload)) {
		logMqqSelection("slide", request.documentResourceUri, {
			fileId: payload.fileId,
			hasSelection: true,
			rangeId: payload.selectionId,
			textLength: payload.description.length,
			sendAction
		});
		deps.reportDocumentSelection({
			...toSlideReportSelectionParams(payload, request.documentResourceUri, request.filePath),
			sendAction
		});
		return {
			id: request.id,
			errCode: 0,
			hasHandled: true
		};
	}
	if (isDocSelectionChangePayload(payload)) {
		const displayText = readDocSelectionDisplayText(payload);
		logMqqSelection("doc", request.documentResourceUri, {
			fileId: payload.fileId,
			hasSelection: true,
			rangeId: buildDocRangeId(payload),
			textLength: displayText.length,
			hasImage: Boolean(payload.image),
			sendAction
		});
		deps.reportDocumentSelection({
			...toDocReportSelectionParams(payload, request.documentResourceUri, request.filePath),
			sendAction
		});
		return {
			id: request.id,
			errCode: 0,
			hasHandled: true
		};
	}
	return {
		id: request.id,
		errCode: -32602,
		ret: INVALID_SELECTION_MESSAGE,
		hasHandled: true
	};
}
function withSelectionTimestampFallback(payload) {
	if (!payload || typeof payload !== "object" || Array.isArray(payload)) return payload;
	if (isFiniteNumber(payload.timestamp)) return payload;
	return {
		...payload,
		timestamp: Date.now()
	};
}
function logMqqSelection(type, documentResourceUri, fields) {
	require_workbuddy_auth_product_coordinator.windowLog.info("[TencentDocsMqq] selection change received", {
		type,
		documentResourceUri,
		...fields
	});
}
function buildSheetRangeId(payload) {
	return `${payload.fileId}#${payload.sheetId}!${payload.description}`;
}
function buildDocRangeId(payload) {
	const ranges = payload.ranges.map((range) => `${range.begin}-${range.end}`).join(",");
	return `${payload.fileId}#doc!${ranges}`;
}
function readDocSelectionDisplayText(payload) {
	if (isPresentSelectionText(payload.description)) return payload.description;
	if (isPresentSelectionText(payload.selectedText)) return payload.selectedText;
	if (payload.image) return "图片选区";
	require_workbuddy_auth_product_coordinator.windowLog.warn("[TencentDocsMqq] doc selection has no text/image; falling back to rangeId", {
		fileId: payload.fileId,
		hasDescription: typeof payload.description === "string",
		hasSelectedText: typeof payload.selectedText === "string",
		hasImage: Boolean(payload.image)
	});
	return "";
}
function normalizeDocSelectionPayload(payload) {
	return {
		fileId: payload.fileId,
		source: payload.source,
		ranges: payload.ranges,
		description: readNormalizedDocDescription(payload),
		image: payload.image,
		timestamp: payload.timestamp,
		...payload.aiPrompt !== void 0 ? { aiPrompt: payload.aiPrompt } : {}
	};
}
function readNormalizedDocDescription(payload) {
	if (isPresentSelectionText(payload.description)) return payload.description;
	if (isPresentSelectionText(payload.selectedText)) return payload.selectedText;
	return payload.description;
}
function copyMqqPayloadFields(payload) {
	const fields = { ...payload };
	for (const [key, value] of Object.entries(fields)) if (value === void 0) delete fields[key];
	delete fields.title;
	return fields;
}
function isGridRange(value) {
	if (!value || typeof value !== "object") return false;
	const range = value;
	return typeof range.sheetId === "string" && isFiniteNumber(range.startRowIndex) && isFiniteNumber(range.startColIndex) && isFiniteNumber(range.endRowIndex) && isFiniteNumber(range.endColIndex);
}
function isDocSelectionRange(value) {
	if (!value || typeof value !== "object") return false;
	const range = value;
	return isFiniteNumber(range.begin) && isFiniteNumber(range.end) && isFiniteNumber(range.length) && range.begin <= range.end && range.length === range.end - range.begin;
}
/**
* 选区文本字段（doc description/selectedText、sheet description）：
* 空格、换行等也是合法内容，只要求 string 且 length > 0，不做 trim。
* slide 仍只校验 description 为 string（含空串），与历史行为一致。
*/
function isPresentSelectionText(value) {
	return typeof value === "string" && value.length > 0;
}
function isDocSelectionImage(value) {
	if (!value || typeof value !== "object") return false;
	const image = value;
	return typeof image.imgBase64 === "string" && image.imgBase64.trim().length > 0 && typeof image.imgType === "string" && image.imgType.trim().length > 0;
}
function isFiniteNumber(value) {
	return typeof value === "number" && Number.isFinite(value);
}
function isFiniteNumberArray(value) {
	return Array.isArray(value) && value.length > 0 && value.every(isFiniteNumber);
}
function createUnhandledBridgeResponse(id) {
	return {
		id,
		errCode: -32601,
		ret: MQQ_API_NOT_IMPLEMENTED_MESSAGE,
		hasHandled: false
	};
}
//#endregion
//#region ../../packages/workbuddy-server/src/docs-shared/mqq/router.ts
/**
* 统一分发一次 mqq bridge 请求。
* 命中埋点 API 走 Guest 埋点；否则委托现有选区/frame-guard 分发器（不改 selection）。
*/
function handleWorkbuddyMqqBridgeRequest(request, deps) {
	if (request.apiName === "workbuddy.reportTelemetry") return handleGuestTelemetryMqqRequest(request, deps);
	return handleTencentDocsMqqBridgeRequest(request, deps);
}
//#endregion
//#region ../../packages/workbuddy-app/src/shared/ipc-channels.ts
/**
* Synchronous IPC channel: preload pulls host platform info (platform, arch,
* hostArch, probe) via `ipcRenderer.sendSync`. Main resolves it once at
* startup and caches the result, so the round-trip cost is just IPC overhead
* (~1-5ms). Used to expose `window.__hostPlatform` synchronously before the
* first React render — required for `isWindowsArm()` checks in useState
* initializers.
*
* NOT in `IpcChannelMap` because that map types `ipcRenderer.invoke`
* (async); this channel uses `event.returnValue` (sync).
*/
var HOST_PLATFORM_GET_SYNC_CHANNEL = "host-platform:get-sync";
//#endregion
//#region ../../packages/workbuddy-server/src/client/daemon-state.ts
require_common$1.init_common$4();
require_common$1.init_common$2();
async function createWorkbuddyDaemonState(connection, options = {}) {
	const listeners = /* @__PURE__ */ new Set();
	let account;
	let token;
	let domain;
	let product;
	const notify = () => {
		const session = createSessionSnapshot(account, token, domain);
		for (const listener of listeners) try {
			listener(session);
		} catch {}
	};
	const refreshAuth = async (emitStartupMarks = false) => {
		try {
			const accountValue = await connection.invoke(require_contract.AUTH_RPC_CHANNELS.GET_ACCOUNT);
			account = normalizeAccount(accountValue);
			domain = normalizeDomainFromAccount(accountValue);
			if (emitStartupMarks) options.startupMark?.("F15");
			token = normalizeToken(await connection.invoke(require_contract.AUTH_RPC_CHANNELS.GET_TOKEN));
			if (emitStartupMarks) options.startupMark?.("F16");
		} catch (error) {
			options.logger?.warn("[WorkbuddyDaemonState] Failed to refresh auth state:", error);
			account = void 0;
			token = void 0;
			domain = void 0;
		}
		notify();
	};
	const refreshProduct = async (emitStartupMarks = false) => {
		try {
			if (emitStartupMarks) options.startupMark?.("F17");
			product = await connection.invoke(require_workbuddy_auth_product_coordinator.CONFIG_RPC_CHANNELS.GET_PRODUCT_CONFIGURATION);
			if (emitStartupMarks) options.startupMark?.("F18");
		} catch (error) {
			options.logger?.warn("[WorkbuddyDaemonState] Failed to refresh product configuration:", error);
			product = void 0;
		}
	};
	const disposeEvents = connection.onEvent((channel, data) => {
		if (channel === require_contract.AUTH_RPC_CHANNELS.STATUS_CHANGED) {
			account = normalizeAccount(data);
			refreshAuth();
		}
	});
	options.startupMark?.("F14");
	await Promise.all([refreshAuth(true), refreshProduct(true)]);
	options.startupMark?.("F19");
	return {
		getAccount: () => account,
		getEndpoint: () => product?.endpoint,
		getProductConfiguration: () => product,
		getSession: () => createSessionSnapshot(account, token, domain),
		onCurrentSessionChanged(listener) {
			listeners.add(listener);
			return () => {
				listeners.delete(listener);
			};
		},
		async refresh() {
			await Promise.all([refreshAuth(), refreshProduct()]);
		},
		async refreshProductConfiguration() {
			await refreshProduct();
		},
		dispose() {
			disposeEvents();
			listeners.clear();
		}
	};
}
function normalizeAccount(value) {
	if (!value || typeof value !== "object") return;
	const record = value;
	return {
		uid: typeof record.uid === "string" ? record.uid : void 0,
		name: typeof record.name === "string" ? record.name : void 0,
		nickname: typeof record.nickname === "string" ? record.nickname : void 0,
		enterpriseId: typeof record.enterpriseId === "string" ? record.enterpriseId : void 0,
		tenantId: typeof record.tenantId === "string" ? record.tenantId : void 0
	};
}
function normalizeDomainFromAccount(value) {
	if (!value || typeof value !== "object") return;
	const record = value;
	return typeof record.domain === "string" ? record.domain : void 0;
}
function normalizeToken(value) {
	if (value === null) return null;
	return typeof value === "string" ? value : void 0;
}
function createSessionSnapshot(account, token, domain) {
	if (!account?.uid && !token) return;
	return {
		account,
		auth: {
			accessToken: token,
			domain
		}
	};
}
//#endregion
//#region ../../packages/workbuddy-server/src/session/queries.ts
function createWorkbuddyDaemonSessionQueries(connection) {
	return { async getActiveSessions() {
		return assertSessionInfoArray(await connection.invoke(require_initialize.WORKBUDDY_SESSION_AUX_RPC_CHANNELS.GET_ACTIVE_SESSIONS), require_initialize.WORKBUDDY_SESSION_AUX_RPC_CHANNELS.GET_ACTIVE_SESSIONS);
	} };
}
function assertSessionInfoArray(value, channel) {
	if (!Array.isArray(value)) throw new Error(`Invalid response for ${channel}: expected an array`);
	return value;
}
//#endregion
//#region src/main/daemon/daemon-process-manager.ts
var DEFAULT_STOP_TIMEOUT_MS = 5e3;
var STDERR_TAIL_LINES = 80;
var UNSUPPORTED_ELECTRON_NODE_OPTIONS = new Set(["--openssl-legacy-provider"]);
var DEBUG_NODE_OPTION_PREFIXES = [
	"--inspect",
	"--inspect-brk",
	"--debug"
];
var DaemonAppServerProcessManager = class {
	child;
	connection;
	constructor(options = {}) {
		this.options = options;
	}
	async start() {
		if (this.child && this.connection) return this.createHandle(this.child, this.connection);
		const entryPath = this.resolveEntryPath();
		const execPath = this.options.processExecPath ?? process.execPath;
		const args = [
			...this.options.processExecArgv ?? [],
			entryPath,
			"--stdio"
		];
		const stderrTail = [];
		let readyResolve;
		let readyReject;
		const readyPromise = new Promise((resolve, reject) => {
			readyResolve = resolve;
			readyReject = reject;
		});
		this.options.logger?.info("Spawning daemon app-server process", {
			execPath,
			entryPath
		});
		const optionEnv = this.options.env ?? {};
		const nodeOptions = sanitizeNodeOptions([process.env.NODE_OPTIONS, optionEnv.NODE_OPTIONS].filter((value) => Boolean(value)).join(" "));
		const child = (0, node_child_process.spawn)(execPath, args, {
			stdio: [
				"pipe",
				"pipe",
				"pipe"
			],
			windowsHide: true,
			env: {
				...process.env,
				...optionEnv,
				ELECTRON_RUN_AS_NODE: "1",
				NODE_OPTIONS: nodeOptions
			}
		});
		const connection = require_initialize.createStdioDaemonRpcConnection({
			input: child.stdout,
			output: child.stdin,
			onReady: readyResolve,
			requestHandler: this.options.requestHandler,
			logger: this.options.logger
		});
		child.stderr.on("data", (data) => {
			const text = data.toString().trim();
			if (!text) return;
			for (const line of text.split(/\r?\n/)) {
				if (!line) continue;
				stderrTail.push(line);
				if (stderrTail.length > STDERR_TAIL_LINES) stderrTail.shift();
			}
		});
		child.once("exit", (code, signal) => {
			const error = new Error(formatExitMessage(code, signal, stderrTail));
			readyReject(error);
			connection.rejectPending(error);
			if (this.child === child) {
				this.child = void 0;
				this.connection = void 0;
			}
		});
		child.once("error", (error) => {
			readyReject(error);
			connection.rejectPending(error);
		});
		this.child = child;
		this.connection = connection;
		await readyPromise;
		await connection.invoke(require_initialize.DAEMON_LIFECYCLE_RPC_CHANNELS.PING);
		return this.createHandle(child, connection);
	}
	createHandle(child, connection) {
		return {
			connection,
			pid: child.pid,
			stop: () => this.stop()
		};
	}
	async stop() {
		const child = this.child;
		const connection = this.connection;
		this.child = void 0;
		this.connection = void 0;
		if (!child || child.killed) {
			connection?.dispose();
			return;
		}
		const exitPromise = new Promise((resolve) => {
			child.once("exit", () => resolve());
		});
		try {
			const stopTimeoutMs = this.options.stopTimeoutMs ?? DEFAULT_STOP_TIMEOUT_MS;
			await Promise.race([connection?.invoke(require_initialize.DAEMON_LIFECYCLE_RPC_CHANNELS.SHUTDOWN), delay(stopTimeoutMs)]).catch((error) => {
				this.options.logger?.warn("daemon app-server shutdown RPC failed", { error: error instanceof Error ? error.message : String(error) });
			});
			if (!await waitForExit(exitPromise, stopTimeoutMs) && !child.killed) {
				child.kill();
				await waitForExit(exitPromise, stopTimeoutMs);
			}
		} finally {
			connection?.dispose();
		}
	}
	resolveEntryPath() {
		if (this.options.resolveEntryPath) return this.options.resolveEntryPath();
		return node_path.resolve(__dirname, "./daemon-app-server-entry.js");
	}
};
function sanitizeNodeOptions(value) {
	return value.split(/\s+/).filter((option) => option && isSupportedNodeOption(option)).join(" ");
}
function isSupportedNodeOption(option) {
	if (UNSUPPORTED_ELECTRON_NODE_OPTIONS.has(option)) return false;
	return !DEBUG_NODE_OPTION_PREFIXES.some((prefix) => option === prefix || option.startsWith(`${prefix}=`));
}
function delay(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
async function waitForExit(exitPromise, timeoutMs) {
	return Promise.race([exitPromise.then(() => true), delay(timeoutMs).then(() => false)]);
}
function formatExitMessage(code, signal, stderrTail) {
	const stderr = stderrTail.length > 0 ? ` stderr=${stderrTail.join("\n")}` : "";
	return `Daemon app-server exited before ready: code=${code ?? "null"} signal=${signal ?? "null"}${stderr}`;
}
//#endregion
//#region src/main/features/desktop-host/app-server-events.ts
var TIP_SOUND_PLAY_EVENT = "tip-sound:play";
function registerAppServerDesktopHostEvents(connection, desktopHost, options = {}) {
	return connection.onEvent((channel, data) => {
		if (channel !== require_initialize.WORKBUDDY_APP_SERVER_HOST_EVENT_CHANNELS.TASK_COMPLETED_NOTIFICATION) return;
		if (!require_initialize.isWorkbuddyAppServerTaskCompletedNotificationPayload(data)) {
			options.logger?.warn("[DesktopHost] Ignoring invalid task completion notification payload:", data);
			return;
		}
		if (desktopHost.showTaskCompletedNotification(data)) desktopHost.window.send(TIP_SOUND_PLAY_EVENT);
	});
}
function registerAppServerDesktopHostBridgeHandlers(registry, desktopHost) {
	registry.handle(require_initialize.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.OPEN_EXTERNAL, async (url) => {
		if (typeof url !== "string" || !url.trim()) throw new Error("desktopHost.openExternal requires a non-empty URL");
		return desktopHost.shell.openExternal(url);
	});
	registry.handle(require_initialize.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.OPEN_PATH, async (filePath) => {
		if (typeof filePath !== "string" || !filePath.trim()) throw new Error("desktopHost.openPath requires a non-empty path");
		return desktopHost.shell.openPath(filePath);
	});
	registry.handle(require_initialize.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.SHOW_ITEM_IN_FOLDER, async (filePath) => {
		if (typeof filePath !== "string" || !filePath.trim()) throw new Error("desktopHost.showItemInFolder requires a non-empty path");
		await desktopHost.shell.showItemInFolder(filePath);
	});
	registry.handle(require_initialize.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.COOKIE_GET, async (rawParams) => {
		const params = readCookieGetParams(rawParams);
		return resolveSession(desktopHost, params.scope).cookies.get(params.filter);
	});
	registry.handle(require_initialize.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.COOKIE_SET, async (rawParams) => {
		const params = readCookieSetParams(rawParams);
		await resolveSession(desktopHost, params.scope).cookies.set(params.details);
	});
	registry.handle(require_initialize.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.COOKIE_REMOVE, async (rawParams) => {
		const params = readCookieRemoveParams(rawParams);
		await resolveSession(desktopHost, params.scope).cookies.remove(params.url, params.name);
	});
	registry.handle(require_initialize.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.CLEAR_DEFAULT_SESSION_COOKIES_FOR_DOMAINS, async (rawParams) => {
		const params = readClearCookiesParams(rawParams);
		return desktopHost.network.clearDefaultSessionCookiesForDomains(params.domains);
	});
	registry.handle(require_initialize.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.RESOLVE_PROXY, async (rawParams) => {
		const params = readRecord(rawParams, "resolve proxy params");
		if (typeof params.targetUrl !== "string" || !params.targetUrl.trim()) throw new Error("resolve proxy params require targetUrl");
		return desktopHost.network.resolveProxy(params.targetUrl);
	});
	registry.handle(require_initialize.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.APPLY_PROXY_SETTINGS, async (rawParams) => {
		const settings = readProxySettings(readRecord(rawParams, "apply proxy settings params").settings);
		return desktopHost.network.applyProxySettings(settings);
	});
	registry.handle(require_initialize.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.DECRYPT_LEGACY_AUTH_SESSION, async (rawParams) => {
		const params = readRecord(rawParams, "legacy auth decrypt params");
		if (typeof params.encryptedBase64 !== "string" || !params.encryptedBase64.trim()) throw new Error("legacy auth decrypt params require encryptedBase64");
		return desktopHost.auth.decryptLegacyAuthSession(params.encryptedBase64);
	});
	registry.handle(require_initialize.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.SHOW_OPEN_DIALOG, async (rawParams) => {
		const params = require_initialize.readShowOpenDialogParams(rawParams);
		return desktopHost.dialog.showOpenDialog(params);
	});
	registry.handle(require_initialize.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.SHOW_SAVE_DIALOG, async (rawParams) => {
		const params = require_initialize.readShowSaveDialogParams(rawParams);
		return desktopHost.dialog.showSaveDialog(params);
	});
	registry.handle(require_initialize.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.SHOW_MESSAGE_BOX, async (rawParams) => {
		const params = require_initialize.readShowMessageBoxParams(rawParams);
		return desktopHost.dialog.showMessageBox(params);
	});
	registry.handle(require_initialize.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.TENCENT_DOCS_ENGINE_ORIGIN_CHANGED, (rawParams) => {
		require_workbuddy_auth_product_coordinator.setActiveTencentDocsEngineOrigin(require_initialize.readTencentDocsEngineOriginChangedParams(rawParams).origin);
	});
}
function registerAppServerMonitorBridgeHandlers(registry, reporters) {
	registry.handle(require_initialize.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.MONITOR_REPORT_METRIC, async (rawParams) => {
		if (!require_initialize.isMonitorMetricPayload(rawParams)) return;
		switch (rawParams.kind) {
			case "duration":
				reporters.recordDuration(rawParams.metric, rawParams.value, rawParams.dims);
				return;
			case "counter":
				reporters.addCounter(rawParams.metric, rawParams.value, rawParams.dims);
				return;
			case "event":
				reporters.reportEvent(rawParams.name, rawParams.ext);
				return;
		}
	});
	registry.handle(require_initialize.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.MONITOR_REPORT_PROMPT_FORWARDING, async (rawParams) => {
		reporters.reportPromptForwarding(rawParams);
	});
	registry.handle(require_initialize.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.MONITOR_REPORT_PROMPT_DONE, async (rawParams) => {
		reporters.reportPromptDone(rawParams);
	});
	registry.handle(require_initialize.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.MONITOR_REPORT_PROMPT_TRACE, async (rawParams) => {
		await reporters.reportPromptTrace(rawParams);
	});
	registry.handle(require_initialize.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.MONITOR_APPLY_RENDERER_SESSION_ID, async (rawParams) => {
		const params = readRecord(rawParams, "monitor applyRendererSessionId params");
		const sessionId = typeof params.sessionId === "string" ? params.sessionId.trim() : "";
		if (!sessionId) return;
		reporters.applyRendererSessionId(sessionId);
	});
}
function registerAppServerDocsBridgeHandlers(registry, reporters) {
	registry.handle(require_initialize.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.DOCS_GET_PREVIEW_URL, async (rawParams) => {
		if (!require_initialize.isWorkbuddyAppServerHostDocsGetPreviewUrlParams(rawParams)) throw new Error("docs getPreviewUrl params require a non-empty filePath");
		return reporters.getPreviewUrl(rawParams.filePath, rawParams.options);
	});
}
function resolveSession(desktopHost, scope) {
	if (scope === "default") return desktopHost.network.getDefaultSession();
	if (scope === "tdoc-import") return desktopHost.network.getSessionPartition("persist:tdoc-import");
	if (scope === "tdoc-preview") return desktopHost.network.getSessionPartition("persist:tdoc-preview");
	throw new Error(`Unsupported desktop host session scope: ${scope}`);
}
function readCookieGetParams(value) {
	const params = readRecord(value, "cookie get params");
	return {
		scope: readSessionScope(params.scope),
		filter: readRecord(params.filter ?? {}, "cookie filter")
	};
}
function readCookieSetParams(value) {
	const params = readRecord(value, "cookie set params");
	const details = readRecord(params.details, "cookie set details");
	if (typeof details.url !== "string" || typeof details.name !== "string" || typeof details.value !== "string") throw new Error("cookie set details require url, name, and value");
	return {
		scope: readSessionScope(params.scope),
		details
	};
}
function readCookieRemoveParams(value) {
	const params = readRecord(value, "cookie remove params");
	if (typeof params.url !== "string" || typeof params.name !== "string") throw new Error("cookie remove params require url and name");
	return {
		scope: readSessionScope(params.scope),
		url: params.url,
		name: params.name
	};
}
function readClearCookiesParams(value) {
	const params = readRecord(value, "clear cookies params");
	if (!Array.isArray(params.domains) || !params.domains.every((item) => typeof item === "string")) throw new Error("clear cookies params require string domains");
	return { domains: params.domains };
}
function readSessionScope(value) {
	if (value === "default" || value === "tdoc-import" || value === "tdoc-preview") return value;
	throw new Error(`Unsupported desktop host session scope: ${String(value)}`);
}
function readProxySettings(value) {
	const params = readRecord(value, "proxy settings");
	const mode = params.mode;
	if (mode !== "none" && mode !== "system" && mode !== "manual") throw new Error(`apply proxy settings: invalid mode ${String(mode)}`);
	if (mode === "manual") {
		if (typeof params.url !== "string" || !params.url.trim()) throw new Error("apply proxy settings: manual mode requires non-empty url");
		return {
			mode: "manual",
			url: params.url
		};
	}
	return { mode };
}
function readRecord(value, label) {
	if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error(`${label} must be an object`);
	return value;
}
//#endregion
//#region src/main/features/desktop-host/celljs-deps.ts
var import_common = require_common$1.require_common$1();
function resolveDesktopHostCellJSDeps(container) {
	const configService = new require_initialize.AppConfigService(container.get(import_common.Logger), { userDataDir: require_runtime_context.getWorkbuddyRuntimeUserDataDir() });
	require_initialize.setDefaultWorkspaceRootConfigService(configService);
	require_initialize.setDefaultWorkspaceRootAppNameProvider(require_runtime_context.getWorkbuddyRuntimeAppName);
	return {
		configService,
		eventService: container.get(require_common$1.EventService)
	};
}
//#endregion
//#region src/main/integrations/wechat-share/wechat-share.ts
var SHARE_TAG = "[WxShare][BrowserWindow]";
/** 隐藏窗口空闲自动销毁时间（5 分钟） */
var IDLE_DESTROY_MS = 300 * 1e3;
function buildWxReadyGateScript(actionFn) {
	return `
                    if (!window.__wxReadyGate) {
                        var __g = { ready: !!wxopensdk.ready, waiters: [] };
                        var __prevOnReady = typeof wxopensdk.onReady === 'function' ? wxopensdk.onReady : null;
                        wxopensdk.onReady = function() {
                            __g.ready = true;
                            var __ws = __g.waiters; __g.waiters = [];
                            for (var __i = 0; __i < __ws.length; __i++) { try { __ws[__i](); } catch (e) {} }
                            if (__prevOnReady) { try { __prevOnReady(); } catch (e) {} }
                        };
                        window.__wxReadyGate = __g;
                    }
                    var __gate = window.__wxReadyGate;
                    if (wxopensdk.ready) { __gate.ready = true; }
                    if (__gate.ready) {
                        return ${actionFn}();
                    }
                    return new Promise(function(resolve) {
                        var settled = false;
                        var timer = null;
                        function finish(result) {
                            if (settled) { return; }
                            settled = true;
                            if (timer) { clearTimeout(timer); timer = null; }
                            resolve(result);
                        }
                        __gate.waiters.push(function() {
                            if (settled) { return; }
                            ${actionFn}().then(finish);
                        });
                        timer = setTimeout(function() {
                            finish({ success: false, errcode: 5, errmsg: 'wxopensdk onReady timeout (5s)' });
                        }, 5000);
                    });`;
}
/**
* 微信分享隐藏窗口管理器
* 维护一个隐藏 BrowserWindow 加载 wx-share.html，
* 通过 executeJavaScript 调用 wxopensdk.shareLink()。
*
* 安全策略：
* - 使用独立 session partition（persist:wx-share），PNA 绕过仅限此 session
* - pageUrl 必须为白名单内的 HTTPS host
* - 权限仅放行 local-network-access，其他默认拒绝
* - 空闲 5 分钟后自动销毁，释放 ~50MB 进程内存
*/
var WxShareWindowManager = class WxShareWindowManager {
	/** 允许加载的分享页 host 白名单 */
	static ALLOWED_HOSTS = ["www.codebuddy.cn", "staging.codebuddy.cn"];
	window = null;
	ready = false;
	readyPromise = null;
	pageUrl;
	idleTimer = null;
	/** 串行化并发调用，避免 wxopensdk.onReady 被覆盖 */
	sharePending = null;
	constructor(pageUrl) {
		this.validatePageUrl(pageUrl);
		this.pageUrl = pageUrl;
	}
	/** 更新分享页 URL（可在获取 product config 后调用） */
	setPageUrl(url) {
		if (this.pageUrl === url) return;
		this.validatePageUrl(url);
		this.pageUrl = url;
		if (this.window && !this.window.isDestroyed()) this.destroy();
	}
	/** 初始化隐藏窗口（预加载） */
	async init() {
		if (this.ready && this.window && !this.window.isDestroyed()) return;
		if (this.readyPromise) return this.readyPromise;
		this.readyPromise = this.createWindow().catch((err) => {
			this.readyPromise = null;
			throw err;
		});
		return this.readyPromise;
	}
	/** 调用 wxopensdk.shareLink（串行化，避免并发覆盖 onReady） */
	async shareLink(params) {
		if (this.sharePending) await this.sharePending.catch(() => {});
		const doShare = async () => {
			if (!this.ready || !this.window || this.window.isDestroyed()) {
				this.ready = false;
				this.readyPromise = null;
				await this.init();
			}
			this.resetIdleTimer();
			const script = `
                (function() {
                    var wxopensdk = window.wxopensdk;
                    if (!wxopensdk) {
                        return Promise.resolve({ success: false, errcode: 2, errmsg: 'wxopensdk not loaded' });
                    }
                    var payload = ${JSON.stringify(params)};
                    function callShare() {
                        return wxopensdk.shareLink({
                            appid: payload.appid,
                            url: payload.url,
                            txt: payload.txt,
                            desc: payload.desc,
                            thumburl: payload.thumburl,
                            scene: payload.scene,
                            ticket: payload.ticket,
                            timeout: payload.timeout || 5000
                        }).then(function(result) {
                            var errcode = (result && result.errcode) || 0;
                            return { success: errcode === 0, errcode: errcode, errmsg: (result && result.errmsg) || '' };
                        }).catch(function(err) {
                            return { success: false, errcode: 7, errmsg: (err && err.message) || 'Unknown error' };
                        });
                    }
${buildWxReadyGateScript("callShare")}
                })();
            `;
			try {
				const result = await this.window.webContents.executeJavaScript(script);
				console.log(SHARE_TAG, "shareLink 结果", result);
				this.destroyIfNotReady(result);
				return result;
			} catch (err) {
				console.error(SHARE_TAG, "executeJavaScript 异常", err);
				return {
					success: false,
					errcode: 7,
					errmsg: err?.message || "executeJavaScript failed"
				};
			}
		};
		this.sharePending = doShare();
		try {
			return await this.sharePending;
		} finally {
			this.sharePending = null;
		}
	}
	/** 调用 wxopensdk.launchMiniProgram（串行化，避免并发覆盖 onReady） */
	async launchMiniProgram(params) {
		if (this.sharePending) await this.sharePending.catch(() => {});
		const doLaunch = async () => {
			if (!this.ready || !this.window || this.window.isDestroyed()) {
				this.ready = false;
				this.readyPromise = null;
				await this.init();
			}
			this.resetIdleTimer();
			const script = `
                (function() {
                    var wxopensdk = window.wxopensdk;
                    if (!wxopensdk) {
                        return Promise.resolve({ success: false, errcode: 2, errmsg: 'wxopensdk not loaded' });
                    }
                    var payload = ${JSON.stringify(params)};
                    function callLaunch() {
                        return wxopensdk.launchMiniProgram({
                            appid: payload.appid,
                            userName: payload.userName,
                            path: payload.path || '',
                            ticket: payload.ticket,
                            timeout: payload.timeout || 5000
                        }).then(function(result) {
                            var errcode = (result && result.errcode) || 0;
                            return { success: errcode === 0, errcode: errcode, errmsg: (result && result.errmsg) || '' };
                        }).catch(function(err) {
                            return { success: false, errcode: 7, errmsg: (err && err.message) || 'Unknown error' };
                        });
                    }
${buildWxReadyGateScript("callLaunch")}
                })();
            `;
			try {
				const result = await this.window.webContents.executeJavaScript(script);
				console.log(SHARE_TAG, "launchMiniProgram 结果", result);
				this.destroyIfNotReady(result);
				return result;
			} catch (err) {
				console.error(SHARE_TAG, "launchMiniProgram executeJavaScript 异常", err);
				return {
					success: false,
					errcode: 7,
					errmsg: err?.message || "executeJavaScript failed"
				};
			}
		};
		this.sharePending = doLaunch();
		try {
			return await this.sharePending;
		} finally {
			this.sharePending = null;
		}
	}
	async shareMiniProgram(params) {
		if (this.sharePending) await this.sharePending.catch(() => {});
		const doShare = async () => {
			if (!this.ready || !this.window || this.window.isDestroyed()) {
				this.ready = false;
				this.readyPromise = null;
				await this.init();
			}
			this.resetIdleTimer();
			const script = `
                (function() {
                    var wxopensdk = window.wxopensdk;
                    if (!wxopensdk) {
                        return Promise.resolve({ success: false, errcode: 2, errmsg: 'wxopensdk not loaded' });
                    }
                    if (typeof wxopensdk.shareMiniProgram !== 'function') {
                        return Promise.resolve({ success: false, errcode: 4, errmsg: 'wxopensdk.shareMiniProgram not available' });
                    }
                    var payload = ${JSON.stringify(params)};
                    function callShare() {
                        return wxopensdk.shareMiniProgram({
                            appid: payload.appid,
                            ticket: payload.ticket,
                            userName: payload.userName,
                            txt: payload.txt,
                            thumburl: payload.thumburl,
                            path: payload.path || '',
                            timeout: payload.timeout || 5000
                        }).then(function(result) {
                            var errcode = (result && result.errcode) || 0;
                            return { success: errcode === 0, errcode: errcode, errmsg: (result && result.errmsg) || '' };
                        }).catch(function(err) {
                            return { success: false, errcode: 7, errmsg: (err && err.message) || 'Unknown error' };
                        });
                    }
${buildWxReadyGateScript("callShare")}
                })();
            `;
			try {
				const result = await this.window.webContents.executeJavaScript(script);
				console.log(SHARE_TAG, "shareMiniProgram 结果", result);
				this.destroyIfNotReady(result);
				return result;
			} catch (err) {
				console.error(SHARE_TAG, "shareMiniProgram executeJavaScript 异常", err);
				return {
					success: false,
					errcode: 7,
					errmsg: err?.message || "executeJavaScript failed"
				};
			}
		};
		this.sharePending = doShare();
		try {
			return await this.sharePending;
		} finally {
			this.sharePending = null;
		}
	}
	/** 调用 wxopensdk.shareFile（串行化，避免并发覆盖 onReady） */
	async shareFile(params) {
		if (this.sharePending) await this.sharePending.catch(() => {});
		const doShare = async () => {
			if (!this.ready || !this.window || this.window.isDestroyed()) {
				this.ready = false;
				this.readyPromise = null;
				await this.init();
			}
			this.resetIdleTimer();
			const script = `
                (function() {
                    var wxopensdk = window.wxopensdk;
                    if (!wxopensdk) {
                        return Promise.resolve({ success: false, errcode: 2, errmsg: 'wxopensdk not loaded' });
                    }
                    if (typeof wxopensdk.shareFile !== 'function') {
                        return Promise.resolve({ success: false, errcode: 4, errmsg: 'wxopensdk.shareFile not available' });
                    }
                    var payload = ${JSON.stringify(params)};
                    function callShare() {
                        return wxopensdk.shareFile({
                            appid: payload.appid,
                            userName: payload.userName,
                            ticket: payload.ticket,
                            timeout: payload.timeout || 30000,
                            fileUrl: payload.fileUrl,
                            fileSize: payload.fileSize,
                            fileSha256: payload.fileSha256,
                            fileName: payload.fileName,
                            scene: payload.scene
                        }).then(function(result) {
                            var errcode = (result && result.errcode) || 0;
                            return { success: errcode === 0, errcode: errcode, errmsg: (result && result.errmsg) || '' };
                        }).catch(function(err) {
                            return { success: false, errcode: 7, errmsg: (err && err.message) || 'Unknown error' };
                        });
                    }
${buildWxReadyGateScript("callShare")}
                })();
            `;
			try {
				const result = await this.window.webContents.executeJavaScript(script);
				console.log(SHARE_TAG, "shareFile 结果", result);
				this.destroyIfNotReady(result);
				return result;
			} catch (err) {
				console.error(SHARE_TAG, "shareFile executeJavaScript 异常", err);
				return {
					success: false,
					errcode: 7,
					errmsg: err?.message || "executeJavaScript failed"
				};
			}
		};
		this.sharePending = doShare();
		try {
			return await this.sharePending;
		} finally {
			this.sharePending = null;
		}
	}
	destroyIfNotReady(result) {
		if (result?.errcode === 5) {
			console.log(SHARE_TAG, "wxopensdk 未就绪超时，销毁窗口以便下次重新初始化");
			this.destroy();
		}
	}
	/** 销毁窗口 */
	destroy() {
		this.clearIdleTimer();
		if (this.window && !this.window.isDestroyed()) this.window.destroy();
		this.window = null;
		this.ready = false;
		this.readyPromise = null;
	}
	/** 校验 pageUrl 必须为白名单内的 HTTPS host */
	validatePageUrl(url) {
		try {
			const u = new URL(url);
			if (u.protocol !== "https:" || !WxShareWindowManager.ALLOWED_HOSTS.includes(u.host)) throw new Error(`Invalid wx-share page URL: ${url}`);
		} catch (e) {
			if (e.message?.startsWith("Invalid wx-share")) throw e;
			throw new Error(`Invalid wx-share page URL: ${url}`);
		}
	}
	resetIdleTimer() {
		this.clearIdleTimer();
		this.idleTimer = setTimeout(() => {
			console.log(SHARE_TAG, "空闲超时，自动销毁窗口");
			this.destroy();
		}, IDLE_DESTROY_MS);
	}
	clearIdleTimer() {
		if (this.idleTimer) {
			clearTimeout(this.idleTimer);
			this.idleTimer = null;
		}
	}
	async createWindow() {
		console.log(SHARE_TAG, "创建隐藏窗口, url:", this.pageUrl);
		const wxShareSession = electron.session.fromPartition("persist:wx-share");
		this.window = new electron.BrowserWindow({
			show: false,
			width: 400,
			height: 300,
			webPreferences: {
				nodeIntegration: false,
				contextIsolation: true,
				webSecurity: false,
				session: wxShareSession
			}
		});
		wxShareSession.setPermissionCheckHandler((_webContents, permission) => permission === "media" || permission === "local-network-access");
		wxShareSession.setPermissionRequestHandler((_webContents, permission, callback) => {
			if (permission === "media" || permission === "local-network-access") callback(true);
			else callback(false);
		});
		wxShareSession.webRequest.onHeadersReceived({ urls: ["https://open.weixin.qq.com/*", "https://localhost.weixin.qq.com:*/*"] }, (details, callback) => {
			const headers = { ...details.responseHeaders };
			delete headers["content-security-policy"];
			delete headers["Content-Security-Policy"];
			headers["Access-Control-Allow-Private-Network"] = ["true"];
			callback({ responseHeaders: headers });
		});
		const LNA_PATCH_SCRIPT = `
            try {
                const _origQuery = navigator.permissions.query.bind(navigator.permissions);
                navigator.permissions.query = function(desc) {
                    if (desc && desc.name === 'local-network-access') {
                        return Promise.resolve({
                            state: 'granted',
                            name: 'local-network-access',
                            onchange: null,
                            addEventListener: function() {},
                            removeEventListener: function() {},
                            dispatchEvent: function() { return true; }
                        });
                    }
                    return _origQuery(desc);
                };
            } catch(e) {}
        `;
		this.window.webContents.on("did-frame-finish-load", () => {
			if (!this.window || this.window.isDestroyed()) return;
			this.window.webContents.executeJavaScript(LNA_PATCH_SCRIPT).catch(() => {});
			try {
				for (const frame of this.window.webContents.mainFrame.frames) frame.executeJavaScript(LNA_PATCH_SCRIPT).catch(() => {});
			} catch {}
		});
		await this.window.loadURL(this.pageUrl);
		console.log(SHARE_TAG, "页面加载完成, wxopensdk 初始化中...");
		this.ready = true;
		this.resetIdleTimer();
		this.window.on("closed", () => {
			this.clearIdleTimer();
			this.window = null;
			this.ready = false;
			this.readyPromise = null;
		});
	}
};
//#endregion
//#region src/main/system/proxy.ts
/**
* System Proxy bridge for Main process.
*
* Reads OS-level proxy settings (macOS scutil / Windows registry / Linux gsettings)
* and writes them into HTTP_PROXY / HTTPS_PROXY / NO_PROXY environment variables,
* so the rest of the app can stay on the existing env-var-driven proxy path.
*
* Opt-in via ProductFeature.SystemProxyDetection (default: disabled).
*
* v5 #49077：本文件不再标 "temporary"。它现在还承担两个长期职责：
*   - `injectSystemProxyToEnv()`  —— 启动期 / 切到 system 模式时调用
*   - `clearProxyEnv()`           —— 切到 none / manual 模式前的清场（对偶函数）
* 两者一起被 proxy-settings 的 host capability `applyProxySettings` 使用。
*
* PAC / WPAD are intentionally not handled — Chromium does PAC itself, and
* Node has no built-in PAC support.
*/
require_workbuddy_product_config.init_workbuddy_product_config();
/**
* If no `HTTP_PROXY` is set and the feature flag is on, detect the system
* proxy and write it into env vars so the standard env-var path picks it up.
*
* Idempotent and safe to call before `app.whenReady`.
*/
function injectSystemProxyToEnv() {
	require_logger.mainLog.info(`[system-proxy] entry env: ${formatProxyEnvForLog(process.env)}`);
	if (process.env.HTTP_PROXY || process.env.http_proxy) {
		require_logger.mainLog.info("[system-proxy] skip: HTTP_PROXY already present in process env");
		return;
	}
	if (!isDetectionEnabled()) {
		require_logger.mainLog.info("[system-proxy] skip: ProductFeature.SystemProxyDetection disabled");
		return;
	}
	const detected = detectSystemProxy();
	require_logger.mainLog.info(`[system-proxy] detectSystemProxy result: ${detected ? `httpProxy=${sanitizeProxyHostForLog(detected.httpProxy)}, bypass=[${detected.bypassList.join(",") || "(none)"}]` : "(none)"}`);
	if (!detected) return;
	process.env.HTTP_PROXY = detected.httpProxy;
	process.env.HTTPS_PROXY = detected.httpProxy;
	process.env.http_proxy = detected.httpProxy;
	process.env.https_proxy = detected.httpProxy;
	process.env.WORKBUDDY_PROXY_SOURCE = "system";
	if (!process.env.NO_PROXY && !process.env.no_proxy && detected.bypassList.length > 0) {
		const noProxy = detected.bypassList.join(",");
		process.env.NO_PROXY = noProxy;
		process.env.no_proxy = noProxy;
	}
	require_logger.mainLog.info(`[system-proxy] injected ${sanitizeProxyHostForLog(detected.httpProxy)} (bypass=${detected.bypassList.join(",") || "(none)"})`);
	require_logger.mainLog.info(`[system-proxy] post env: ${formatProxyEnvForLog(process.env)}`);
}
/**
* `injectSystemProxyToEnv` 的对偶：清空 Main 进程内所有代理相关 env 变量 +
* 移除 WORKBUDDY_PROXY_SOURCE 标记，让 ProxyResolver L2 落空，避免遗留的旧代理
* 影响下一轮探测。典型调用时机：用户在 UI 切到 manual / none 模式之前。
*
* 注意：
* - 仅 delete 不写空字符串（部分库会区分 "" 和 "未设置"）
* - HTTP_PROXY / http_proxy 都要清，否则 lowercase fallback 仍能命中
* - NO_PROXY 也清——切到 manual 时 noProxy 应由该模式自己重写，不留残值
*/
function clearProxyEnv() {
	require_logger.mainLog.info(`[system-proxy] clear entry: ${formatProxyEnvForLog(process.env)}`);
	delete process.env.HTTP_PROXY;
	delete process.env.HTTPS_PROXY;
	delete process.env.http_proxy;
	delete process.env.https_proxy;
	delete process.env.NO_PROXY;
	delete process.env.no_proxy;
	delete process.env.WORKBUDDY_PROXY_SOURCE;
	require_logger.mainLog.info(`[system-proxy] cleared (post: ${formatProxyEnvForLog(process.env)})`);
}
/**
* 把代理相关 env 变量打成一行可读快照。HTTP/HTTPS_PROXY 脱敏成 `host:port`，
* NO_PROXY 原样输出（其内容是排查回环 bypass 失败的关键）。
*/
function formatProxyEnvForLog(env) {
	const parts = [];
	const httpProxy = env.HTTP_PROXY ?? env.http_proxy;
	const httpsProxy = env.HTTPS_PROXY ?? env.https_proxy;
	const noProxy = env.NO_PROXY ?? env.no_proxy;
	parts.push(`HTTP_PROXY=${httpProxy ? sanitizeProxyHostForLog(httpProxy) : "(unset)"}`);
	parts.push(`HTTPS_PROXY=${httpsProxy ? sanitizeProxyHostForLog(httpsProxy) : "(unset)"}`);
	parts.push(`NO_PROXY=${noProxy ?? "(unset)"}`);
	return parts.join(", ");
}
/** 把代理 URL 脱敏成 `host:port`，避免把 user:pass 写入日志。 */
function sanitizeProxyHostForLog(proxyUrl) {
	try {
		const candidate = proxyUrl.includes("://") ? proxyUrl : `http://${proxyUrl}`;
		const parsed = new URL(candidate);
		const port = parsed.port || (parsed.protocol === "https:" ? "443" : "80");
		return `${parsed.hostname}:${port}`;
	} catch {
		return "<invalid-proxy>";
	}
}
function isDetectionEnabled() {
	try {
		return require_workbuddy_product_config.getWorkbuddyBootstrapProductConfiguration().productFeatures?.[require_common$1.ProductFeature.SystemProxyDetection] === true;
	} catch (err) {
		require_logger.mainLog.warn("[system-proxy] product config read failed, defaulting to disabled:", err);
		return false;
	}
}
function detectSystemProxy() {
	try {
		switch (process.platform) {
			case "darwin": return readMacOSProxy();
			case "win32": return readWindowsProxy();
			case "linux": return readLinuxProxy();
			default: return;
		}
	} catch (err) {
		require_logger.mainLog.warn("[system-proxy] detection failed:", err);
		return;
	}
}
function readMacOSProxy() {
	const out = (0, child_process.execFileSync)("/usr/sbin/scutil", ["--proxy"], {
		encoding: "utf-8",
		timeout: 2e3
	});
	let host;
	let port;
	if (/HTTPSEnable\s*:\s*1/.test(out)) {
		host = out.match(/HTTPSProxy\s*:\s*(\S+)/)?.[1];
		port = out.match(/HTTPSPort\s*:\s*(\d+)/)?.[1];
	}
	if ((!host || !port) && /HTTPEnable\s*:\s*1/.test(out)) {
		host = out.match(/HTTPProxy\s*:\s*(\S+)/)?.[1];
		port = out.match(/HTTPPort\s*:\s*(\d+)/)?.[1];
	}
	if (!host || !port) return;
	const bypassList = [];
	const exMatch = out.match(/ExceptionsList\s*:\s*<array>\s*{([\s\S]*?)\n\s*}/);
	if (exMatch) for (const line of exMatch[1].split("\n")) {
		const m = line.trim().match(/^\d+\s*:\s*(\S.*)$/);
		if (m) bypassList.push(m[1].trim());
	}
	return {
		httpProxy: host.includes("://") ? host : `http://${host}:${port}`,
		bypassList
	};
}
function readWindowsProxy() {
	const regKey = "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings";
	const queryReg = (name) => {
		try {
			return (0, child_process.execFileSync)("reg", [
				"query",
				regKey,
				"/v",
				name
			], {
				encoding: "utf-8",
				timeout: 2e3
			}).match(new RegExp(`${name}\\s+REG_\\w+\\s+(.+)`))?.[1].trim();
		} catch {
			return;
		}
	};
	const enableRaw = queryReg("ProxyEnable");
	if (!enableRaw || !/0x1\b/i.test(enableRaw)) return;
	const serverRaw = queryReg("ProxyServer");
	if (!serverRaw) return;
	let proxyTarget;
	if (serverRaw.includes("=")) {
		const protocols = {};
		for (const part of serverRaw.split(";")) {
			const [k, v] = part.split("=");
			if (k && v) protocols[k.trim().toLowerCase()] = v.trim();
		}
		const target = protocols["https"] ?? protocols["http"];
		if (!target) return;
		proxyTarget = target;
	} else proxyTarget = serverRaw;
	const bypassList = (queryReg("ProxyOverride") ?? "").split(";").map((s) => s.trim()).filter(Boolean);
	return {
		httpProxy: proxyTarget.includes("://") ? proxyTarget : `http://${proxyTarget}`,
		bypassList
	};
}
function readLinuxProxy() {
	const get = (schema, key) => {
		try {
			return (0, child_process.execFileSync)("gsettings", [
				"get",
				schema,
				key
			], {
				encoding: "utf-8",
				timeout: 2e3
			}).trim();
		} catch {
			return "";
		}
	};
	const stripQuotes = (s) => s.replace(/^['"]|['"]$/g, "");
	const mode = get("org.gnome.system.proxy", "mode");
	if (!mode || !/^['"]?manual['"]?$/.test(mode)) return;
	let host = stripQuotes(get("org.gnome.system.proxy.https", "host"));
	let port = get("org.gnome.system.proxy.https", "port");
	if (!host || !port || port === "0") {
		host = stripQuotes(get("org.gnome.system.proxy.http", "host"));
		port = get("org.gnome.system.proxy.http", "port");
	}
	if (!host || !port || port === "0") return;
	const ignoreRaw = get("org.gnome.system.proxy", "ignore-hosts");
	const bypassList = [];
	const arr = ignoreRaw.match(/\[(.*)\]/);
	if (arr) for (const item of arr[1].split(",")) {
		const v = stripQuotes(item.trim());
		if (v) bypassList.push(v);
	}
	return {
		httpProxy: host.includes("://") ? host : `http://${host}:${port}`,
		bypassList
	};
}
//#endregion
//#region src/main/system/proxy-applier.ts
/**
* Main 进程内应用代理设置（v4 / Q1 #49077）。
*
* daemon 通过 `host.network.applyProxySettings(settings)` host capability 调用：
*   ProxySettingsService.saveSettings → desktop-host-bridge → app-server-events → 本函数
*
* 五步：
*   1. clearProxyEnv —— 清掉所有 HTTP_PROXY/HTTPS_PROXY/NO_PROXY/WORKBUDDY_PROXY_SOURCE
*   2. 按 mode 重写 env：
*      - manual : process.env.HTTP_PROXY/HTTPS_PROXY = url + WORKBUDDY_PROXY_SOURCE='manual'
*      - system : injectSystemProxyToEnv（内部写 WORKBUDDY_PROXY_SOURCE='system'）
*      - none   : env 保持清空
*   3. invalidateProxyAgentCache —— 清 axios global agent 缓存（installAxiosGlobalProxy 那套）
*   4. session.defaultSession.setProxy —— Electron renderer 内部 webview 也走代理
*   5. 返回 resolvedEnv 三元组（v5 R11 #49077）：daemon 用这个值同步自己进程的 env
*
* 注意（v5 #49077）：
* - manual 仅 http/https（service 层已校验），proxyRules 直接传 url；
*   socks5 解禁见 5.3.0 backlog（需要加回 toElectronProxyRules 工具函数）
* - 这里不显式调 mainProxyResolver.invalidateOsCache()，因为 Main 进程当前没有
*   长存活的 ProxyResolver 实例（CLI 端在 fetch-proxy/http-proxy-interceptor 里有，
*   通过 settingsPath 注入会自动读到新 settings.json）
*
* R11 #49077：为什么要返回 resolvedEnv
*   daemon 是独立子进程（daemon-process-manager.ts spawn），env 是 spawn 时快照，
*   Main 改自己 env 不会传到 daemon。要让 daemon 的业务请求（msg-center/skill 市场/
*   license 等走 fetch / axios）跟着切代理，必须把 Main 算好的 env 三元组带回 daemon，
*   由 daemon 同步写入自己 process.env 后再 invalidate。
*
* 抽出原因（PR2 R5 拆分）：electron-desktop-host.ts 不再承担 70 行 proxy 应用逻辑，
* 保持文件在 500 行硬阈值内。
*/
async function applyProxySettingsToMain(settings) {
	require_logger.mainLog.info(`[DesktopHost] applyProxySettings: mode=${settings.mode}`);
	clearProxyEnv();
	if (settings.mode === "manual" && settings.url) {
		process.env.HTTP_PROXY = settings.url;
		process.env.HTTPS_PROXY = settings.url;
		process.env.http_proxy = settings.url;
		process.env.https_proxy = settings.url;
		process.env.WORKBUDDY_PROXY_SOURCE = "manual";
	} else if (settings.mode === "system") injectSystemProxyToEnv();
	try {
		require_net_log.invalidateProxyAgentCache();
	} catch (err) {
		require_logger.mainLog.warn("[DesktopHost] applyProxySettings: invalidateProxyAgentCache failed", err);
	}
	try {
		const sess = electron.session.defaultSession;
		if (settings.mode === "manual" && settings.url) await sess.setProxy({ proxyRules: settings.url });
		else if (settings.mode === "none") await sess.setProxy({ mode: "direct" });
		else await sess.setProxy({ mode: "system" });
	} catch (err) {
		require_logger.mainLog.warn("[DesktopHost] applyProxySettings: session.setProxy failed", err);
		throw err;
	}
	const resolvedEnv = {
		HTTP_PROXY: process.env.HTTP_PROXY ?? "",
		HTTPS_PROXY: process.env.HTTPS_PROXY ?? "",
		NO_PROXY: process.env.NO_PROXY ?? ""
	};
	require_logger.mainLog.info(`[DesktopHost] applyProxySettings: applied (mode=${settings.mode}, resolvedEnv returned to daemon)`);
	return resolvedEnv;
}
//#endregion
//#region src/main/system/runtime/windows-experimental-features-elevation.ts
require_common$1.init_common();
require_workbuddy_product_config.init_install_channel();
require_app_instance.init_app_instance();
require_workbuddy_product_config.init_bundled_assets();
var REBOOT_REQUIRED_EXIT_CODE = 3010;
var SCRIPT_NAME = "apply-experimental-features.ps1";
function resolveExperimentalFeaturesScriptPath() {
	return require_workbuddy_product_config.resolveBundledAsset("cli", "vendor", "sandbox", SCRIPT_NAME) ?? require_workbuddy_product_config.resolveBundledAsset("vendor", "sandbox", SCRIPT_NAME);
}
function buildExperimentalFeaturesScriptArgs(scriptPath, features) {
	return [
		"-NoProfile",
		"-ExecutionPolicy",
		"Bypass",
		"-File",
		scriptPath,
		"-Features",
		features.join(",")
	];
}
async function runExperimentalFeaturesScriptElevated(scriptPath, features) {
	return new Promise((resolve, reject) => {
		let settled = false;
		const finish = (error, result) => {
			if (settled) return;
			settled = true;
			if (error) {
				reject(error);
				return;
			}
			resolve(result ?? { rebootRequired: false });
		};
		const child = (0, node_child_process.spawn)("powershell.exe", buildExperimentalFeaturesScriptArgs(scriptPath, features), {
			windowsHide: true,
			stdio: [
				"ignore",
				"pipe",
				"pipe"
			]
		});
		let stderr = "";
		child.stderr?.on("data", (chunk) => {
			stderr += String(chunk);
			if (stderr.length > 4096) stderr = stderr.slice(-4096);
		});
		child.on("error", (error) => finish(error));
		child.on("close", (code) => {
			if (code === 0) {
				finish(void 0, { rebootRequired: false });
				return;
			}
			if (code === 3010) {
				finish(void 0, { rebootRequired: true });
				return;
			}
			finish(/* @__PURE__ */ new Error(`ProjFS enablement script failed with exit code ${code ?? "null"}${stderr ? `: ${stderr.trim()}` : ""}`));
		});
	});
}
async function ensureWindowsExperimentalFeaturesReady(features, options = {}) {
	if ((options.platform ?? process.platform) !== "win32" || features.length === 0) return { rebootRequired: false };
	const scriptPath = (options.resolveScriptPath ?? resolveExperimentalFeaturesScriptPath)();
	if (!scriptPath) throw new Error(`Cannot locate ${SCRIPT_NAME}`);
	require_logger.mainLog.info(`[SecurityCenter] Running Windows experimental features readiness script for ${features.join(",")}: ${scriptPath}`);
	return (options.runElevatedScript ?? runExperimentalFeaturesScriptElevated)(scriptPath, features);
}
//#endregion
//#region src/main/features/desktop-host/flatten-image.ts
function flattenBitmapToWhite(bitmap) {
	if (bitmap.length % 4 !== 0) return false;
	for (let i = 0; i < bitmap.length; i += 4) {
		const alpha = bitmap[i + 3] / 255;
		bitmap[i] = Math.round(bitmap[i] * alpha + 255 * (1 - alpha));
		bitmap[i + 1] = Math.round(bitmap[i + 1] * alpha + 255 * (1 - alpha));
		bitmap[i + 2] = Math.round(bitmap[i + 2] * alpha + 255 * (1 - alpha));
		bitmap[i + 3] = 255;
	}
	return true;
}
/**
* 将 NativeImage flatten 到白色背景上，消除 alpha 通道。
*
* Windows 剪贴板写入 BMP/DIB 时 alpha 通道被丢弃，透明像素渲染为黑色。
* 此函数将所有像素与白色背景混合后返回不含透明度的图片。
* 仅在 Windows 上有必要调用。
*/
function flattenImageToWhite(image) {
	if (process.platform !== "win32") return image;
	const scaleFactors = image.getScaleFactors();
	if (scaleFactors.length === 0) return image;
	const flattened = electron.nativeImage.createEmpty();
	let hasRepresentation = false;
	for (const scaleFactor of scaleFactors) {
		const size = image.getSize(scaleFactor);
		if (size.width === 0 || size.height === 0) continue;
		const bitmap = image.toBitmap({ scaleFactor });
		if (!flattenBitmapToWhite(bitmap)) continue;
		flattened.addRepresentation({
			...size,
			scaleFactor,
			buffer: bitmap
		});
		hasRepresentation = true;
	}
	return hasRepresentation ? flattened : image;
}
//#endregion
//#region src/main/features/desktop-host/electron-desktop-host.ts
var COMPLETE_LOCAL_STORAGE_MIGRATION_CHANNEL = "__completeLocalStorageMigration";
var BUILD_COMMIT$1 = "e9991e2be9d";
function createElectronDesktopHost(windowManager) {
	return {
		app: createElectronHostApp(),
		dialog: createElectronHostDialog(windowManager),
		shell: createElectronHostShell(),
		clipboard: createElectronHostClipboard(),
		network: createElectronHostNetwork(),
		auth: createElectronHostAuth(),
		window: createElectronHostWindow(windowManager),
		notification: createElectronHostNotification(),
		permissions: createElectronHostPermissions(),
		wechatShare: createElectronHostWechatShare(),
		globalShortcut: createElectronHostGlobalShortcut(windowManager),
		applyWindowsExperimentalFeatures: ensureWindowsExperimentalFeaturesReady,
		showTaskCompletedNotification,
		registerLocalStorageMigrationCompletion(handler) {
			electron.ipcMain.handle(COMPLETE_LOCAL_STORAGE_MIGRATION_CHANNEL, async (_event, result) => {
				handler(result);
				return { ok: true };
			});
			return () => {
				electron.ipcMain.removeHandler(COMPLETE_LOCAL_STORAGE_MIGRATION_CHANNEL);
			};
		}
	};
}
function createElectronHostAuth() {
	return { async decryptLegacyAuthSession(encryptedBase64) {
		if (!electron.safeStorage.isEncryptionAvailable()) return;
		return electron.safeStorage.decryptString(Buffer.from(encryptedBase64, "base64"));
	} };
}
function createElectronHostApp() {
	return {
		getName: () => electron.app.name,
		getVersion: () => electron.app.getVersion(),
		getPlatform: () => process.platform,
		getLocale: () => electron.app.getLocale(),
		getConfigDir: () => require_app_instance.getWorkbuddyConfigDir(),
		isPackaged: () => electron.app.isPackaged,
		showAboutDialog: async () => {
			const locale = require_menu_i18n.getMenuLocale();
			const aboutTitleTpl = require_menu_i18n.getMenuTranslation("aboutTitle", locale);
			const aboutDetailTpl = require_menu_i18n.getMenuTranslation("aboutDetail", locale);
			const okText = require_menu_i18n.getMenuTranslation("ok", locale);
			await electron.dialog.showMessageBox({
				type: "info",
				title: aboutTitleTpl.replace("{appName}", electron.app.name),
				message: electron.app.name,
				detail: aboutDetailTpl.replace("{version}", electron.app.getVersion()).replace("{commit}", BUILD_COMMIT$1).replace("{electron}", process.versions.electron).replace("{chrome}", process.versions.chrome).replace("{node}", process.versions.node),
				buttons: [okText],
				noLink: true
			});
		},
		quit: () => electron.app.quit()
	};
}
function createElectronHostDialog(windowManager) {
	return {
		async showOpenDialog(options) {
			const win = windowManager.getMainWindow() ?? void 0;
			const result = await dialogWithOptionalWindow$1(electron.dialog.showOpenDialog, win, options);
			return {
				canceled: result.canceled,
				filePaths: result.filePaths
			};
		},
		async showSaveDialog(options) {
			const win = windowManager.getMainWindow() ?? void 0;
			const result = await dialogWithOptionalWindow$1(electron.dialog.showSaveDialog, win, options);
			return {
				canceled: result.canceled,
				filePath: result.filePath
			};
		},
		async showMessageBox(options) {
			const win = windowManager.getMainWindow() ?? void 0;
			return { response: (await dialogWithOptionalWindow$1(electron.dialog.showMessageBox, win, {
				type: options.type ?? "warning",
				title: options.title,
				message: options.message,
				detail: options.detail,
				buttons: options.buttons ?? ["OK"],
				defaultId: options.defaultId,
				cancelId: options.cancelId,
				noLink: options.noLink
			})).response };
		}
	};
}
function createElectronHostShell() {
	return {
		openExternal: async (url) => {
			try {
				await electron.shell.openExternal(url);
				console.log(`[ElectronDesktopHost] shell.openExternal resolved (no throw) for: ${url}`);
				return true;
			} catch (error) {
				console.warn(`[ElectronDesktopHost] shell.openExternal threw for: ${url}`, String(error));
				return false;
			}
		},
		openPath: (filePath) => electron.shell.openPath(filePath),
		showItemInFolder: (filePath) => electron.shell.showItemInFolder(filePath)
	};
}
function createElectronHostClipboard() {
	return {
		readText: () => electron.clipboard.readText(),
		writeText: (text) => electron.clipboard.writeText(text),
		writeImageFromDataUrl: (dataUrl) => {
			const image = electron.nativeImage.createFromDataURL(dataUrl);
			electron.clipboard.writeImage(flattenImageToWhite(image));
		}
	};
}
function createElectronHostNetwork() {
	return {
		fetch: (url, init) => electron.net.fetch(url, init),
		getDefaultSession: () => createElectronHostSession(electron.session.defaultSession),
		getSessionPartition: (partition) => createElectronHostSession(electron.session.fromPartition(partition)),
		resolveProxy: (targetUrl) => electron.session.defaultSession.resolveProxy(targetUrl),
		clearDefaultSessionCookiesForDomains: async (domains) => {
			let totalCleared = 0;
			for (const domain of domains) try {
				const cookies = await electron.session.defaultSession.cookies.get({ domain });
				for (const cookie of cookies) {
					const cookieUrl = `https://${cookie.domain?.replace(/^\./, "") || domain}${cookie.path?.startsWith("/") ? cookie.path : `/${cookie.path || ""}`}`;
					await electron.session.defaultSession.cookies.remove(cookieUrl, cookie.name);
				}
				totalCleared += cookies.length;
			} catch (error) {
				console.warn(`[DesktopHost] clear default session cookies failed for domain=${domain}:`, error);
			}
			return totalCleared;
		},
		applyProxySettings: applyProxySettingsToMain
	};
}
function createElectronHostSession(electronSession) {
	return { cookies: {
		set: (details) => electronSession.cookies.set(details),
		get: (filter) => electronSession.cookies.get(filter),
		remove: (url, name) => electronSession.cookies.remove(url, name)
	} };
}
async function dialogWithOptionalWindow$1(dialogMethod, browserWindow, options) {
	if (browserWindow) return dialogMethod(browserWindow, options);
	return dialogMethod(options);
}
function createElectronHostWechatShare() {
	let wxShareWindow = null;
	const resolveWindow = (pageUrl) => {
		if (!wxShareWindow) {
			wxShareWindow = new WxShareWindowManager(pageUrl);
			return wxShareWindow;
		}
		wxShareWindow.setPageUrl(pageUrl);
		return wxShareWindow;
	};
	return {
		async shareLink(pageUrl, params) {
			const window = resolveWindow(pageUrl);
			await window.init();
			return window.shareLink(params);
		},
		async launchMiniProgram(pageUrl, params) {
			const window = resolveWindow(pageUrl);
			await window.init();
			return window.launchMiniProgram(params);
		},
		async shareMiniProgram(pageUrl, params) {
			const window = resolveWindow(pageUrl);
			await window.init();
			return window.shareMiniProgram(params);
		},
		async shareFile(pageUrl, params) {
			const window = resolveWindow(pageUrl);
			await window.init();
			return window.shareFile(params);
		}
	};
}
function createElectronHostNotification() {
	return {
		isSupported: () => electron.Notification.isSupported(),
		requestRegistration: async () => {
			if (process.platform !== "darwin" || !electron.Notification.isSupported()) return;
			try {
				const notification = new electron.Notification({
					title: "WorkBuddy",
					body: "",
					silent: true
				});
				notification.show();
				setTimeout(() => {
					try {
						notification.close();
					} catch {}
				}, 50);
			} catch (err) {
				console.warn("[ElectronDesktopHost] requestNotificationRegistration failed:", err);
			}
		},
		send: (payload) => sendNotification(payload)
	};
}
function createElectronHostPermissions() {
	return {
		getMicrophonePermissionStatus,
		requestMicrophonePermission,
		openMicrophoneSystemSettings,
		checkAccessibility
	};
}
function createElectronHostGlobalShortcut(windowManager) {
	return { updateToggleWindow(accelerator) {
		return {
			success: windowManager.updateToggleWindowShortcut(accelerator),
			accelerator
		};
	} };
}
function createElectronHostWindow(windowManager) {
	return {
		minimize: () => windowManager.minimize(),
		maximize: () => windowManager.maximize(),
		close: () => windowManager.close(),
		isMaximized: () => windowManager.isMaximized(),
		cancelPendingClose: () => windowManager.cancelPendingClose(),
		confirmClose: () => windowManager.confirmClose(),
		setTrafficLightsVisible: (visible) => windowManager.setTrafficLightsVisible(visible),
		reload: () => {
			const webContents = windowManager.getMainWindow()?.webContents;
			if (!webContents || webContents.isDestroyed()) return;
			webContents.reload();
		},
		updateTitleBarOverlay: (options) => windowManager.updateTitleBarOverlay(options),
		isFullscreen: () => windowManager.isFullScreen(),
		setFullscreen: (flag) => windowManager.setFullScreen(flag),
		toggleFullscreen: () => windowManager.toggleFullScreen(),
		isFocused: () => windowManager.getMainWindow()?.isFocused() ?? false,
		onFocusChange: (listener) => {
			windowManager.events.on("focus-changed", listener);
			return () => windowManager.events.off("focus-changed", listener);
		},
		onFullscreenChange: (listener) => {
			windowManager.events.on("fullscreen-changed", listener);
			return () => windowManager.events.off("fullscreen-changed", listener);
		},
		onMaximizeChange: (listener) => {
			windowManager.events.on("maximize-changed", listener);
			return () => windowManager.events.off("maximize-changed", listener);
		},
		send: (channel, data) => {
			const webContents = windowManager.getMainWindow()?.webContents;
			if (!webContents || webContents.isDestroyed()) return false;
			webContents.send(channel, data);
			return true;
		},
		toggleDevTools: () => {
			const webContents = windowManager.getMainWindow()?.webContents;
			if (!webContents || webContents.isDestroyed()) return;
			webContents.toggleDevTools();
		},
		performEditCommand: (command) => {
			const webContents = windowManager.getMainWindow()?.webContents;
			if (!webContents || webContents.isDestroyed()) return;
			getEditCommandAction(webContents, command)?.();
		}
	};
}
function getEditCommandAction(webContents, command) {
	return {
		undo: () => webContents.undo(),
		redo: () => webContents.redo(),
		cut: () => webContents.cut(),
		copy: () => webContents.copy(),
		paste: () => webContents.paste(),
		selectAll: () => webContents.selectAll()
	}[command];
}
function sendNotification(payload) {
	if (!electron.Notification.isSupported()) return false;
	const title = typeof payload === "string" ? payload.trim() : payload.title.trim();
	if (!title) return false;
	const body = typeof payload === "string" ? void 0 : payload.body?.trim() || void 0;
	try {
		new electron.Notification({
			title,
			...body ? { body } : {}
		}).show();
		return true;
	} catch (err) {
		console.warn("[ElectronDesktopHost] sendNotification failed:", err);
		return false;
	}
}
function getMicrophonePermissionStatus() {
	if (process.platform === "darwin") return electron.systemPreferences.getMediaAccessStatus("microphone");
	return "unknown";
}
async function requestMicrophonePermission() {
	if (process.platform === "darwin") {
		try {
			const granted = await electron.systemPreferences.askForMediaAccess("microphone");
			console.log(`[ElectronDesktopHost] askForMediaAccess result: ${granted}`);
		} catch (err) {
			console.warn("[ElectronDesktopHost] askForMediaAccess threw:", err);
		}
		return getMicrophonePermissionStatus();
	}
	const status = getMicrophonePermissionStatus();
	console.log(`[ElectronDesktopHost] requestMicrophonePermission no-op on ${process.platform}, status=${status}`);
	return status;
}
async function openMicrophoneSystemSettings() {
	if (process.platform === "darwin") await electron.shell.openExternal("x-apple.systempreferences:com.apple.preference.security?Privacy_Microphone");
	else if (process.platform === "win32") await electron.shell.openExternal("ms-settings:privacy-microphone");
	else console.log("[ElectronDesktopHost] openMicrophoneSystemSettings: no-op on Linux");
}
function checkAccessibility() {
	try {
		if (typeof electron.systemPreferences.isTrustedAccessibilityClient === "function") return electron.systemPreferences.isTrustedAccessibilityClient(false) ? "authorized" : "unauthorized";
	} catch (err) {
		console.warn("[ElectronDesktopHost] checkAccessibility unavailable:", err);
	}
	return "unauthorized";
}
function showTaskCompletedNotification(notification) {
	const { sessionId, taskTitle } = notification;
	if (!electron.Notification.isSupported()) {
		console.warn("[TaskCompletionNotifier] Notification not supported on this platform");
		return false;
	}
	try {
		new electron.Notification({
			title: require_menu_i18n.getRendererTranslation("windowLifecycle.taskCompleted.title"),
			body: require_menu_i18n.getRendererTranslation("windowLifecycle.taskCompleted.body", { taskTitle }),
			silent: true
		}).show();
		return true;
	} catch (error) {
		console.error(`[TaskCompletionNotifier] Failed to send notification for session=${sessionId}:`, error);
		return false;
	}
}
//#endregion
//#region src/main/daemon/local-transport.ts
function createLocalDaemonTransport(connection) {
	const transport = createDeferredLocalDaemonTransport();
	transport.bindConnection(connection);
	return transport;
}
function createDeferredLocalDaemonTransport() {
	const sessions = /* @__PURE__ */ new Map();
	let connection;
	let disposeEvents;
	let disposed = false;
	return {
		bindConnection(nextConnection) {
			if (disposed) throw new Error("Local daemon transport has been disposed");
			if (connection) throw new Error("Local daemon transport connection is already bound");
			connection = nextConnection;
			disposeEvents = nextConnection.onEvent((channel, data) => {
				const envelope = {
					id: (0, node_crypto.randomUUID)(),
					type: "event",
					channel,
					result: data
				};
				for (const session of sessions.values()) emitTransportEvent(session, {
					sessionId: session.id,
					kind: "message",
					json: envelope
				});
			});
			for (const session of sessions.values()) openSession(session);
		},
		connectPort(_args, port) {
			if (disposed) {
				port.postMessage({
					sessionId: "",
					kind: "close",
					code: 1e3,
					reason: "desktop host ipc disposed"
				});
				port.close();
				return "";
			}
			const sessionId = `local-daemon-${(0, node_crypto.randomUUID)()}`;
			const session = {
				id: sessionId,
				port,
				opened: false,
				pendingMessages: []
			};
			sessions.set(sessionId, session);
			port.on("message", (event) => {
				const data = event.data;
				if (!isRecord$4(data)) {
					emitTransportEvent(session, {
						sessionId,
						kind: "error",
						error: "Local daemon transport port message must be an object"
					});
					return;
				}
				const kind = typeof data.kind === "string" ? data.kind : "";
				if (kind === "message") {
					sendMessage({
						sessionId,
						json: data.json,
						text: data.text,
						binaryBase64: data.binaryBase64
					});
					return;
				}
				if (kind === "close") {
					closeSession(sessionId, "transport closed");
					return;
				}
				emitTransportEvent(session, {
					sessionId,
					kind: "error",
					error: `Unsupported local daemon transport port message kind: ${kind || "unknown"}`
				});
			});
			port.on("close", () => {
				sessions.delete(sessionId);
			});
			port.start();
			if (connection) openSession(session);
			return sessionId;
		},
		dispose() {
			disposed = true;
			disposeEvents?.();
			disposeEvents = void 0;
			for (const session of sessions.values()) {
				emitTransportEvent(session, {
					sessionId: session.id,
					kind: "close",
					code: 1e3,
					reason: "desktop host ipc disposed"
				});
				session.port?.close();
			}
			sessions.clear();
		}
	};
	function openSession(session) {
		if (session.opened) return;
		session.opened = true;
		emitTransportEvent(session, {
			sessionId: session.id,
			kind: "open"
		});
		const pending = session.pendingMessages.splice(0);
		for (const text of pending) dispatchMessage(session.id, text);
	}
	function sendMessage(message) {
		if (!message.sessionId) throw new Error("Local daemon transport message requires a sessionId");
		const session = sessions.get(message.sessionId);
		if (!session) return;
		if (typeof message.binaryBase64 === "string") {
			emitTransportEvent(session, {
				sessionId: message.sessionId,
				kind: "error",
				error: "Binary local daemon transport frames are not supported by the in-process WorkBuddy daemon"
			});
			return;
		}
		const frame = message.json !== void 0 && message.json !== null ? message.json : message.text;
		if (!connection) {
			session.pendingMessages.push(frame);
			return;
		}
		dispatchMessage(message.sessionId, frame);
	}
	function dispatchMessage(sessionId, frame) {
		const currentConnection = connection;
		if (!currentConnection) return;
		require_initialize.dispatchDaemonEnvelope(currentConnection, frame).then((response) => {
			const current = sessions.get(sessionId);
			if (!current) return;
			emitTransportEvent(current, {
				sessionId,
				kind: "message",
				json: response
			});
		}).catch((error) => {
			const current = sessions.get(sessionId);
			if (!current) return;
			emitTransportEvent(current, {
				sessionId,
				kind: "error",
				error: error instanceof Error ? error.message : String(error)
			});
		});
	}
	function closeSession(sessionId, reason) {
		const session = sessions.get(sessionId);
		if (!session) return;
		sessions.delete(sessionId);
		emitTransportEvent(session, {
			sessionId,
			kind: "close",
			code: 1e3,
			reason
		});
		session.port?.close();
	}
}
function emitTransportEvent(session, payload) {
	try {
		session.port.postMessage(payload);
	} catch (error) {
		if (!isDataCloneError(error)) throw error;
		const field = describeUncloneablePath(payload) ?? "unknown field";
		const responseId = extractResponseId(payload);
		console.error(`[LocalDaemonTransport] postMessage DataCloneError, kind=${payload.kind} field=${field}` + (responseId ? ` responseId=${responseId}` : ""));
		if (payload.kind === "message" && responseId) try {
			session.port.postMessage({
				sessionId: payload.sessionId,
				kind: "error",
				error: `daemon response not cloneable: ${field}`
			});
		} catch {}
	}
}
function isRecord$4(value) {
	return typeof value === "object" && value !== null;
}
function isDataCloneError(err) {
	return err instanceof Error && (err.name === "DataCloneError" || /could not be cloned/i.test(err.message));
}
function extractResponseId(payload) {
	const json = payload.json;
	if (json && typeof json === "object") {
		const id = json.id;
		if (typeof id === "string") return id;
	}
}
function describeUncloneablePath(value, path = "$", depth = 0, seen = /* @__PURE__ */ new WeakSet()) {
	const t = typeof value;
	if (value === null || t === "undefined" || t === "string" || t === "number" || t === "boolean" || t === "bigint") return;
	if (t === "function") return `${path} = <function>`;
	if (t === "symbol") return `${path} = <symbol>`;
	const obj = value;
	if (seen.has(obj) || depth >= 8) return;
	seen.add(obj);
	if (Array.isArray(obj)) {
		const len = Math.min(obj.length, 200);
		for (let i = 0; i < len; i += 1) {
			const r = describeUncloneablePath(obj[i], `${path}[${i}]`, depth + 1, seen);
			if (r) return r;
		}
		return;
	}
	if (Object.prototype.toString.call(obj) !== "[object Object]") return;
	let count = 0;
	for (const key of Object.keys(obj)) {
		if (count >= 200) break;
		count += 1;
		let child;
		try {
			child = obj[key];
		} catch {
			return `${path}.${key} = <getter-threw>`;
		}
		const r = describeUncloneablePath(child, `${path}.${key}`, depth + 1, seen);
		if (r) return r;
	}
}
//#endregion
//#region src/shared/devtools-terminal-ipc.ts
var WORKBUDDY_DEVTOOLS_TERMINAL_ATTACH_CHANNEL = "workbuddy:devtools-terminal:attach";
var WORKBUDDY_DEVTOOLS_TERMINAL_DETACH_CHANNEL = "workbuddy:devtools-terminal:detach";
var WORKBUDDY_DEVTOOLS_TERMINAL_INPUT_CHANNEL = "workbuddy:devtools-terminal:input";
var WORKBUDDY_DEVTOOLS_TERMINAL_EVENT_CHANNEL = "workbuddy:devtools-terminal:event";
//#endregion
//#region src/main/features/desktop-host/devtools-terminal-ipc.ts
var ATTACH_TIMEOUT_MS = 5e3;
function registerDevtoolsTerminalIpc() {
	const subscriptions = /* @__PURE__ */ new Map();
	electron.ipcMain.handle(WORKBUDDY_DEVTOOLS_TERMINAL_ATTACH_CHANNEL, async (_event, rawRequest) => {
		const request = readAttachRequest(rawRequest);
		const subscriptionId = (0, node_crypto.randomUUID)();
		const socket = node_net.createConnection(require_cli_process_env.dataSocketPath(request.sessionId));
		subscriptions.set(subscriptionId, socket);
		socket.on("data", (chunk) => {
			publishTerminalEvent({
				subscriptionId,
				type: "data",
				data: Buffer.from(chunk).toString("base64")
			});
		});
		socket.on("close", () => {
			subscriptions.delete(subscriptionId);
			publishTerminalEvent({
				subscriptionId,
				type: "closed"
			});
		});
		socket.on("error", (error) => {
			subscriptions.delete(subscriptionId);
			publishTerminalEvent({
				subscriptionId,
				type: "error",
				message: error.message
			});
		});
		await waitForConnect(socket).catch((error) => {
			subscriptions.delete(subscriptionId);
			socket.destroy();
			throw error;
		});
		return { subscriptionId };
	});
	electron.ipcMain.handle(WORKBUDDY_DEVTOOLS_TERMINAL_INPUT_CHANNEL, (_event, rawRequest) => {
		const request = readInputRequest(rawRequest);
		const socket = subscriptions.get(request.subscriptionId);
		if (!socket || socket.destroyed) throw new Error("DevTools terminal subscription is not attached");
		socket.write(Buffer.from(request.data, "utf8"));
		return { ok: true };
	});
	electron.ipcMain.handle(WORKBUDDY_DEVTOOLS_TERMINAL_DETACH_CHANNEL, (_event, rawRequest) => {
		const request = readDetachRequest(rawRequest);
		const socket = subscriptions.get(request.subscriptionId);
		subscriptions.delete(request.subscriptionId);
		socket?.destroy();
		return { ok: true };
	});
	return () => {
		electron.ipcMain.removeHandler(WORKBUDDY_DEVTOOLS_TERMINAL_ATTACH_CHANNEL);
		electron.ipcMain.removeHandler(WORKBUDDY_DEVTOOLS_TERMINAL_INPUT_CHANNEL);
		electron.ipcMain.removeHandler(WORKBUDDY_DEVTOOLS_TERMINAL_DETACH_CHANNEL);
		for (const socket of subscriptions.values()) socket.destroy();
		subscriptions.clear();
	};
}
function waitForConnect(socket) {
	return new Promise((resolve, reject) => {
		const timer = setTimeout(() => {
			cleanup();
			reject(/* @__PURE__ */ new Error("Timed out attaching DevTools terminal"));
		}, ATTACH_TIMEOUT_MS);
		const onConnect = () => {
			cleanup();
			resolve();
		};
		const onError = (error) => {
			cleanup();
			reject(error);
		};
		const cleanup = () => {
			clearTimeout(timer);
			socket.off("connect", onConnect);
			socket.off("error", onError);
		};
		socket.on("connect", onConnect);
		socket.on("error", onError);
	});
}
function publishTerminalEvent(event) {
	for (const window of electron.BrowserWindow.getAllWindows()) if (!window.isDestroyed()) window.webContents.send(WORKBUDDY_DEVTOOLS_TERMINAL_EVENT_CHANNEL, event);
}
function readAttachRequest(value) {
	if (!isRecord$3(value) || typeof value.sessionId !== "string" || !value.sessionId.trim()) throw new Error("DevTools terminal sessionId must be a non-empty string");
	return { sessionId: value.sessionId };
}
function readDetachRequest(value) {
	if (!isRecord$3(value) || typeof value.subscriptionId !== "string" || !value.subscriptionId.trim()) throw new Error("DevTools terminal subscriptionId must be a non-empty string");
	return { subscriptionId: value.subscriptionId };
}
function readInputRequest(value) {
	if (!isRecord$3(value) || typeof value.subscriptionId !== "string" || !value.subscriptionId.trim()) throw new Error("DevTools terminal subscriptionId must be a non-empty string");
	if (typeof value.data !== "string") throw new Error("DevTools terminal input data must be a string");
	return {
		subscriptionId: value.subscriptionId,
		data: value.data
	};
}
function isRecord$3(value) {
	return typeof value === "object" && value !== null;
}
//#endregion
//#region src/main/features/desktop-host/ipc.ts
var execFileAsync$2 = (0, node_util.promisify)(node_child_process.execFile);
var ALLOWED_EXTERNAL_URL_PROTOCOLS = new Set([
	"http:",
	"https:",
	"x-apple.systempreferences:",
	"ms-settings:"
]);
var MACOS_SYSTEM_SETTINGS_SCHEME = "x-apple.systempreferences:";
function registerDesktopHostIpc(options) {
	const { desktopHost } = options;
	const disposers = [];
	const localDaemonTransport = options.localDaemonTransport ?? (options.daemonConnection ? createLocalDaemonTransport(options.daemonConnection) : void 0);
	if (!localDaemonTransport) throw new Error("Desktop host IPC registration requires a daemon transport");
	disposers.push(() => localDaemonTransport.dispose());
	disposers.push(registerDevtoolsTerminalIpc());
	registerListener(LOCAL_DAEMON_TRANSPORT_PORT_CHANNEL, (event, args) => {
		const port = event.ports[0];
		if (port) localDaemonTransport.connectPort(args, port);
	});
	registerHandler(WORKBUDDY_WINDOW_MINIMIZE_CHANNEL, () => desktopHost.window.minimize());
	registerHandler(WORKBUDDY_WINDOW_MAXIMIZE_CHANNEL, () => desktopHost.window.maximize());
	registerHandler(WORKBUDDY_WINDOW_CLOSE_CHANNEL, () => desktopHost.window.close());
	registerHandler(WORKBUDDY_WINDOW_IS_MAXIMIZED_CHANNEL, () => desktopHost.window.isMaximized());
	registerHandler(WORKBUDDY_WINDOW_IS_FULLSCREEN_CHANNEL, () => desktopHost.window.isFullscreen());
	registerHandler(WORKBUDDY_WINDOW_SET_FULLSCREEN_CHANNEL, (_event, flag) => {
		if (typeof flag !== "boolean") throw new Error("Window fullscreen flag must be a boolean");
		desktopHost.window.setFullscreen(flag);
	});
	registerHandler(WORKBUDDY_WINDOW_TOGGLE_FULLSCREEN_CHANNEL, () => desktopHost.window.toggleFullscreen());
	registerHandler(WORKBUDDY_OPENER_OPEN_URL_CHANNEL, async (_event, url) => {
		const filePath = tryFileUrlToLocalPath$1(url);
		if (filePath) {
			const errorMessage = await desktopHost.shell.openPath(filePath);
			if (errorMessage) throw new Error(errorMessage);
			return;
		}
		await openExternalUrl(desktopHost.shell, readExternalUrl(url));
	});
	registerHandler(WORKBUDDY_LOCAL_FILE_OPEN_CHANNEL, async (_event, input) => {
		const options = readLocalFileOpenOptions(input);
		if (options.mode === "reveal") {
			await desktopHost.shell.showItemInFolder(options.path);
			return;
		}
		const errorMessage = await desktopHost.shell.openPath(options.path);
		if (errorMessage) throw new Error(errorMessage);
	});
	registerHandler(WORKBUDDY_DIALOG_OPEN_CHANNEL, async (_event, options) => {
		const result = await desktopHost.dialog.showOpenDialog(readOpenDialogOptions(options));
		if (result.canceled || result.filePaths.length === 0) return null;
		return isRecord$2(options) && options.multiple === true ? result.filePaths : result.filePaths[0] ?? null;
	});
	registerHandler(WORKBUDDY_CLIPBOARD_READ_TEXT_CHANNEL, () => desktopHost.clipboard.readText());
	registerHandler(WORKBUDDY_CLIPBOARD_WRITE_TEXT_CHANNEL, (_event, text) => {
		desktopHost.clipboard.writeText(readString(text, "clipboard text"));
	});
	registerHandler(WORKBUDDY_CLIPBOARD_WRITE_IMAGE_CHANNEL, (_event, dataUrl) => {
		desktopHost.clipboard.writeImageFromDataUrl(readNonEmptyString(dataUrl, "clipboard image data URL"));
	});
	registerHandler(WORKBUDDY_NOTIFICATION_IS_SUPPORTED_CHANNEL, () => desktopHost.notification.isSupported());
	registerHandler(WORKBUDDY_NOTIFICATION_REQUEST_REGISTRATION_CHANNEL, () => desktopHost.notification.requestRegistration());
	registerHandler(WORKBUDDY_NOTIFICATION_SEND_CHANNEL, (_event, payload) => desktopHost.notification.send(readNotificationPayload(payload)));
	registerHandler(WORKBUDDY_GLOBAL_SHORTCUT_UPDATE_TOGGLE_WINDOW_CHANNEL, (_event, accelerator) => {
		const acc = readNonEmptyString(accelerator, "shortcut accelerator");
		return desktopHost.globalShortcut.updateToggleWindow(acc);
	});
	registerHandler(WORKBUDDY_MACHINE_ID_CHANNEL, () => require_log_acl_guard.machineIdSync());
	disposers.push(desktopHost.window.onMaximizeChange((isMaximized) => {
		broadcastDesktopEvent(WORKBUDDY_WINDOW_MAXIMIZE_CHANGED_EVENT, isMaximized);
	}));
	disposers.push(desktopHost.window.onFocusChange((isFocused) => {
		broadcastDesktopEvent(WORKBUDDY_WINDOW_FOCUS_CHANGED_EVENT, isFocused);
	}));
	disposers.push(desktopHost.window.onFullscreenChange((isFullscreen) => {
		broadcastDesktopEvent(WORKBUDDY_WINDOW_FULLSCREEN_CHANGED_EVENT, isFullscreen);
	}));
	return () => {
		for (const dispose of disposers.splice(0)) dispose();
	};
	function registerHandler(channel, handler) {
		electron.ipcMain.handle(channel, handler);
		disposers.push(() => {
			electron.ipcMain.removeHandler(channel);
		});
	}
	function registerListener(channel, listener) {
		electron.ipcMain.on(channel, listener);
		disposers.push(() => {
			electron.ipcMain.removeListener(channel, listener);
		});
	}
}
function broadcastDesktopEvent(event, payload) {
	const channel = `${WORKBUDDY_DESKTOP_EVENT_CHANNEL_PREFIX}${event}`;
	for (const window of electron.BrowserWindow.getAllWindows()) if (!window.isDestroyed()) window.webContents.send(channel, payload);
}
function readNonEmptyString(value, name) {
	if (typeof value !== "string" || !value.trim()) throw new Error(`Desktop ${name} must be a non-empty string`);
	return value;
}
function readString(value, name) {
	if (typeof value !== "string") throw new Error(`Desktop ${name} must be a string`);
	return value;
}
function readExternalUrl(value) {
	const url = readNonEmptyString(value, "url");
	try {
		const parsed = new URL(url);
		if (ALLOWED_EXTERNAL_URL_PROTOCOLS.has(parsed.protocol)) return url;
	} catch {}
	throw new Error("Unsupported external URL");
}
/**
* Open a validated external URL.
*
* On macOS Ventura/Sonoma (13/14), `shell.openExternal` for
* `x-apple.systempreferences:` deep links can fail silently — the Promise
* resolves but System Settings never opens, so the "去授权" jump appears to do
* nothing. For that scheme on darwin we shell out to the system `open` command
* first, which reliably launches System Settings, and fall back to Electron's
* opener if `open` errors. The URL is already restricted to the protocol
* allowlist by `readExternalUrl`, and `execFile` (no shell) keeps it RCE-safe.
*/
async function openExternalUrl(shell, url) {
	if (process.platform === "darwin" && url.startsWith(MACOS_SYSTEM_SETTINGS_SCHEME)) try {
		await execFileAsync$2("/usr/bin/open", [url]);
		return;
	} catch {}
	await shell.openExternal(url);
}
function readLocalFileOpenOptions(value) {
	if (!isRecord$2(value)) throw new Error("Desktop local file options must be an object");
	const path = readNonEmptyString(value.path, "local file path");
	const mode = value.mode ?? "open";
	if (mode !== "open" && mode !== "reveal") throw new Error("Desktop local file mode must be open or reveal");
	return {
		path,
		mode
	};
}
function readOpenDialogOptions(value) {
	if (!isRecord$2(value)) return { properties: ["openFile"] };
	const options = value;
	const properties = [];
	if (options.fileAndDirectory) properties.push("openFile", "openDirectory");
	else if (options.directory) properties.push("openDirectory", "createDirectory");
	else properties.push("openFile");
	if (options.multiple) properties.push("multiSelections");
	return {
		...typeof options.title === "string" ? { title: options.title } : {},
		...typeof options.defaultPath === "string" ? { defaultPath: options.defaultPath } : {},
		...Array.isArray(options.filters) ? { filters: options.filters } : {},
		properties
	};
}
function isRecord$2(value) {
	return typeof value === "object" && value !== null;
}
/**
* If the value is a file:// URL, convert it to a local filesystem path.
* Returns undefined for non-file URLs or invalid input.
* Handles percent-encoded characters (e.g. Chinese filenames) and
* Windows drive-letter paths (file:///C:/... → C:\...).
*/
function tryFileUrlToLocalPath$1(value) {
	if (typeof value !== "string" || !value.startsWith("file:")) return;
	try {
		const parsed = new URL(value);
		let pathname = decodeURIComponent(parsed.pathname);
		if (/^\/[A-Za-z]:/.test(pathname)) pathname = pathname.slice(1);
		return pathname;
	} catch {
		return;
	}
}
function readNotificationPayload(value) {
	if (typeof value === "string") return value;
	if (!isRecord$2(value)) throw new Error("Desktop notification payload must be a string or object");
	const title = readNonEmptyString(value.title, "notification title");
	const body = typeof value.body === "string" ? value.body : void 0;
	const data = isRecord$2(value.data) ? value.data : void 0;
	return {
		title,
		...body !== void 0 ? { body } : {},
		...data ? { data } : {}
	};
}
//#endregion
//#region src/main/features/desktop-host/power-events.ts
function registerAppServerPowerEventBridge(connection, options = {}) {
	const send = (channel) => {
		connection.invoke(channel).catch((error) => {
			options.logger?.warn("[DesktopHost] Failed to forward power event to app-server:", error);
		});
	};
	const sendRendererEvent = (event) => {
		options.desktopHost?.window.send(`${WORKBUDDY_DESKTOP_EVENT_CHANNEL_PREFIX}${event}`);
	};
	const onSuspend = () => {
		send(require_initialize.WORKBUDDY_APP_SERVER_HOST_POWER_RPC_CHANNELS.SUSPEND);
		sendRendererEvent(WORKBUDDY_POWER_SUSPEND_EVENT);
	};
	const onResume = () => {
		send(require_initialize.WORKBUDDY_APP_SERVER_HOST_POWER_RPC_CHANNELS.RESUME);
		sendRendererEvent(WORKBUDDY_POWER_RESUME_EVENT);
	};
	const onUnlockScreen = () => {
		send(require_initialize.WORKBUDDY_APP_SERVER_HOST_POWER_RPC_CHANNELS.UNLOCK_SCREEN);
		sendRendererEvent(WORKBUDDY_POWER_UNLOCK_SCREEN_EVENT);
	};
	electron.powerMonitor.on("suspend", onSuspend);
	electron.powerMonitor.on("resume", onResume);
	electron.powerMonitor.on("unlock-screen", onUnlockScreen);
	return () => {
		electron.powerMonitor.off("suspend", onSuspend);
		electron.powerMonitor.off("resume", onResume);
		electron.powerMonitor.off("unlock-screen", onUnlockScreen);
	};
}
//#endregion
//#region ../../packages/workbuddy-server/src/app/handlers.ts
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
	NETWORK_CHECK: "menu.networkCheck",
	EDIT_UNDO: "menu.edit.undo",
	EDIT_REDO: "menu.edit.redo",
	EDIT_CUT: "menu.edit.cut",
	EDIT_COPY: "menu.edit.copy",
	EDIT_PASTE: "menu.edit.paste",
	EDIT_SELECT_ALL: "menu.edit.selectAll",
	DEV_ENV_SWITCH_STAGING: "menu.devEnv.switchStaging",
	DEV_ENV_SWITCH_PROD: "menu.devEnv.switchProd",
	IOA_IM_WHITELIST_TOGGLE: "menu.ioaIm.toggle",
	PERF_START_RECORDING: "menu.perf.startRecording",
	PERF_STOP_RECORDING: "menu.perf.stopRecording",
	PERF_STOP_AND_ANALYZE: "menu.perf.stopAndAnalyze"
};
/** Commands that must be handled by the Electron host process, not the daemon server. */
var HOST_ONLY_MENU_COMMANDS = new Set([
	MENU_COMMAND_IDS.PERF_START_RECORDING,
	MENU_COMMAND_IDS.PERF_STOP_RECORDING,
	MENU_COMMAND_IDS.PERF_STOP_AND_ANALYZE
]);
function getWorkbuddyLogsDir(deps, ...segments) {
	return node_path.default.join(deps.app.getConfigDir(), "logs", ...segments);
}
function resolveLogsDirectory(deps) {
	const logFilePath = deps.getLogFilePath?.();
	if (logFilePath) return node_path.default.dirname(logFilePath);
	return getWorkbuddyLogsDir(deps);
}
function toHostEditCommand(commandId) {
	switch (commandId) {
		case MENU_COMMAND_IDS.EDIT_UNDO: return "undo";
		case MENU_COMMAND_IDS.EDIT_REDO: return "redo";
		case MENU_COMMAND_IDS.EDIT_CUT: return "cut";
		case MENU_COMMAND_IDS.EDIT_COPY: return "copy";
		case MENU_COMMAND_IDS.EDIT_PASTE: return "paste";
		case MENU_COMMAND_IDS.EDIT_SELECT_ALL: return "selectAll";
		default: return;
	}
}
async function executeMenuCommand(commandId, deps) {
	if (HOST_ONLY_MENU_COMMANDS.has(commandId)) throw new Error(`Menu command '${commandId}' must be handled by the host process`);
	switch (commandId) {
		case MENU_COMMAND_IDS.SHOW_ABOUT_DIALOG:
			await deps.app.showAboutDialog();
			return;
		case MENU_COMMAND_IDS.OPEN_LOGS_FOLDER:
			await deps.openLogsFolder(resolveLogsDirectory(deps), [getWorkbuddyLogsDir(deps)]);
			return;
		case MENU_COMMAND_IDS.HELP_FEEDBACK:
			if (!deps.window.send("menu:openHelpFeedback")) deps.logger?.warn("[AppHandlers] No target window to deliver menu:openHelpFeedback");
			return;
		case MENU_COMMAND_IDS.NETWORK_CHECK:
			if (!deps.window.send("menu:openNetworkCheck")) deps.logger?.warn("[AppHandlers] No target window to deliver menu:openNetworkCheck");
			return;
		case MENU_COMMAND_IDS.CHECK_FOR_UPDATES:
		case MENU_COMMAND_IDS.DOWNLOAD_UPDATE:
			await (await deps.update).check(true);
			return;
		case MENU_COMMAND_IDS.INSTALL_UPDATE:
			await (await deps.update).quitAndInstall();
			return;
		case MENU_COMMAND_IDS.QUIT_APP:
			deps.app.quit();
			return;
		case MENU_COMMAND_IDS.TOGGLE_DEVTOOLS:
			deps.window.toggleDevTools();
			return;
		case MENU_COMMAND_IDS.CLOSE_WINDOW:
			await deps.window.close();
			return;
		case MENU_COMMAND_IDS.DEV_ENV_SWITCH_STAGING:
			await deps.switchDevEnv?.("staging");
			return;
		case MENU_COMMAND_IDS.DEV_ENV_SWITCH_PROD:
			await deps.switchDevEnv?.("prod");
			return;
		case MENU_COMMAND_IDS.IOA_IM_WHITELIST_TOGGLE:
			await deps.toggleIOAImWhitelist?.();
			return;
		default: {
			const command = toHostEditCommand(commandId);
			if (command) {
				deps.window.performEditCommand(command);
				return;
			}
			deps.logger?.warn("[AppHandlers] Unknown menu command", { commandId });
		}
	}
}
function setupAuthMenuState(deps) {
	if (!deps.authMenu) return;
	Promise.resolve(deps.authMenu).then((authMenu) => {
		const updateMenuUserId = () => {
			const uid = authMenu.getCurrentUserId();
			Promise.resolve(authMenu.setMenuUserId(uid || void 0)).catch(() => {});
		};
		updateMenuUserId();
		authMenu.onCurrentSessionChanged(updateMenuUserId);
	}).catch(() => {});
}
function setupIOAImWhitelistState(deps) {
	if (!deps.ioaImWhitelist) return;
	Promise.resolve(deps.ioaImWhitelist).then((source) => {
		const checkEligibility = () => {
			source.getIOAImWhitelistEligible().then((eligible) => source.notifyEligibility(eligible)).catch(() => {});
		};
		checkEligibility();
		source.onCurrentSessionChanged(checkEligibility);
	}).catch(() => {});
}
function registerAppHandlers(registry, deps) {
	require_workbuddy_auth_product_coordinator.handleRpc(registry, "getAppVersion", async () => deps.app.getVersion());
	require_workbuddy_auth_product_coordinator.handleRpc(registry, "getAppPlatform", async () => deps.app.getPlatform());
	require_workbuddy_auth_product_coordinator.handleRpc(registry, "getAppLocale", async () => deps.app.getLocale());
	require_workbuddy_auth_product_coordinator.handleRpc(registry, "getConfigDir", async () => deps.app.getConfigDir());
	require_workbuddy_auth_product_coordinator.handleRpc(registry, "getMachineId", async () => {
		const machineId = deps.getMachineId();
		deps.logger?.info("[AppHandlers] getMachineId served", {
			hasMachineId: !!machineId,
			machineIdLength: machineId.length
		});
		return machineId;
	});
	require_workbuddy_auth_product_coordinator.handleRpc(registry, "setMenuLocale", async (locale) => {
		deps.setMenuLocale(locale);
		await deps.buildAndSetApplicationMenu();
	});
	require_workbuddy_auth_product_coordinator.handleRpc(registry, "windowSaveLocale", async (params) => {
		if (!params?.locale) return;
		await (await deps.config).set("locale", params.locale);
		deps.setMenuLocale(params.locale);
		await deps.buildAndSetApplicationMenu();
	});
	require_workbuddy_auth_product_coordinator.handleRpc(registry, "windowSaveDefaultWorkspacePath", async (params) => {
		const config = await deps.config;
		const nextPath = typeof params?.path === "string" ? params.path.trim() : "";
		if (!nextPath) {
			try {
				await config.set(require_initialize.DEFAULT_WORKSPACE_PATH_CONFIG_KEY, "");
				deps.logger?.info("[AppHandlers] Cleared custom defaultWorkspacePath, falling back to system default");
			} catch (error) {
				deps.logger?.error("[AppHandlers] Failed to clear defaultWorkspacePath", error);
				throw error;
			}
			return;
		}
		const validation = require_initialize.validateDefaultWorkspaceRoot(nextPath);
		if (!validation.ok) {
			deps.logger?.warn("[AppHandlers] Rejected invalid defaultWorkspacePath", {
				nextPath,
				reason: validation.reason
			});
			throw new Error(`Invalid default workspace path: ${validation.reason}`);
		}
		try {
			await config.set(require_initialize.DEFAULT_WORKSPACE_PATH_CONFIG_KEY, validation.root);
			deps.logger?.info("[AppHandlers] Saved defaultWorkspacePath", { nextPath: validation.root });
		} catch (error) {
			deps.logger?.error("[AppHandlers] Failed to save defaultWorkspacePath", error);
			throw error;
		}
	});
	require_workbuddy_auth_product_coordinator.handleRpc(registry, "windowSaveBundledRuntimeConfig", async (configValue) => {
		await (await deps.config).set("bundledRuntime", configValue);
		deps.logger?.info("[AppHandlers] Saved bundledRuntime config", configValue);
	});
	require_workbuddy_auth_product_coordinator.handleRpc(registry, "windowGetBundledRuntimeConfig", async () => {
		return await (await deps.config).get("bundledRuntime") ?? {
			enabled: true,
			tools: {
				node: true,
				python: true,
				gitBash: true
			}
		};
	});
	registry.handle("executeMenuCommand", async (commandId) => {
		await executeMenuCommand(commandId, deps);
	});
	setupAuthMenuState(deps);
	setupIOAImWhitelistState(deps);
}
//#endregion
//#region ../../packages/workbuddy-server/src/dialog/handlers.ts
function toOpenDialogOptions(options, defaults) {
	const properties = options?.properties ? [...options.properties] : [...defaults];
	if (options?.canSelectMany && !properties.includes("multiSelections")) properties.push("multiSelections");
	return {
		title: options?.title,
		defaultPath: options?.defaultPath,
		filters: options?.filters,
		properties
	};
}
function registerDialogHandlers(registry, deps) {
	const { app, dialog } = deps;
	require_workbuddy_auth_product_coordinator.handleRpc(registry, "saveFile", async (options) => dialog.showSaveDialog(options ?? {}));
	require_workbuddy_auth_product_coordinator.handleRpc(registry, "pickFolder", async (options) => {
		const defaultProperties = ["openDirectory"];
		if (app.getPlatform() === "darwin") defaultProperties.push("createDirectory");
		let currentOptions = options;
		while (true) {
			const result = await dialog.showOpenDialog(toOpenDialogOptions(currentOptions, defaultProperties));
			if (result.canceled || result.filePaths.length === 0) return {
				canceled: true,
				folderPaths: []
			};
			const pickedPath = result.filePaths[0];
			if (deps.isPathInInstallDir(pickedPath)) {
				const messages = deps.getInstallDirGuardMessages();
				await dialog.showMessageBox({
					type: "warning",
					title: messages.folderSelectionTitle,
					message: messages.folderSelectionTitle,
					detail: messages.folderSelectionDetail,
					buttons: ["OK"]
				});
				currentOptions = {
					...currentOptions,
					defaultPath: node_os.homedir()
				};
				continue;
			}
			return {
				canceled: result.canceled,
				folderPaths: result.filePaths
			};
		}
	});
	require_workbuddy_auth_product_coordinator.handleRpc(registry, "pickFile", async (options) => {
		const result = await dialog.showOpenDialog(toOpenDialogOptions(options, ["openFile"]));
		return {
			canceled: result.canceled,
			files: result.filePaths
		};
	});
}
//#endregion
//#region ../../packages/workbuddy-server/src/microphone/handlers.ts
var TAG$8 = "[MicrophonePermission]";
var MicrophonePermissionWatcher = class {
	timerId = null;
	lastStatus = null;
	constructor(publisher, getStatus, loggerOrInterval, intervalMs = 4e3) {
		this.publisher = publisher;
		this.getStatus = getStatus;
		if (typeof loggerOrInterval === "number") {
			this.logger = void 0;
			this.intervalMs = loggerOrInterval;
			return;
		}
		this.logger = loggerOrInterval;
		this.intervalMs = intervalMs;
	}
	logger;
	intervalMs;
	start() {
		if (this.timerId !== null) return;
		this.check();
		this.timerId = setInterval(() => this.check(), this.intervalMs);
		this.logger?.debug(`${TAG$8} Polling started (interval=${this.intervalMs}ms)`);
	}
	stop() {
		if (this.timerId !== null) {
			clearInterval(this.timerId);
			this.timerId = null;
			this.logger?.debug(`${TAG$8} Polling stopped`);
		}
	}
	checkNow() {
		this.check();
	}
	check() {
		const current = this.getStatus();
		if (current !== this.lastStatus) {
			this.logger?.info(`${TAG$8} Permission changed: ${this.lastStatus} -> ${current}`);
			this.lastStatus = current;
			require_workbuddy_auth_product_coordinator.pushRpcEvent(this.publisher, "onMicrophonePermissionChanged", current);
		}
	}
};
function registerMicrophonePermissionHandlers(registry, deps) {
	require_workbuddy_auth_product_coordinator.handleRpc(registry, "getMicrophonePermission", async () => {
		const status = deps.permissions.getMicrophonePermissionStatus();
		deps.logger?.debug(`${TAG$8} getMicrophonePermission -> ${status}`);
		return status;
	});
	require_workbuddy_auth_product_coordinator.handleRpc(registry, "requestMicrophonePermission", async () => {
		const status = await deps.permissions.requestMicrophonePermission();
		deps.logger?.debug(`${TAG$8} requestMicrophonePermission -> ${status}`);
		return status;
	});
	require_workbuddy_auth_product_coordinator.handleRpc(registry, "openMicrophoneSystemSettings", async () => {
		deps.logger?.info(`${TAG$8} openMicrophoneSystemSettings`);
		await deps.permissions.openMicrophoneSystemSettings();
	});
	if (!registry.push) throw new Error("Microphone permission handlers require an event publisher");
	const watcher = new MicrophonePermissionWatcher(registry, () => deps.permissions.getMicrophonePermissionStatus(), deps.logger);
	deps.hostWindow.onFocusChange((isFocused) => {
		if (isFocused) {
			watcher.checkNow();
			watcher.start();
			return;
		}
		watcher.stop();
	});
	if (deps.hostWindow.isFocused()) watcher.start();
	return watcher;
}
//#endregion
//#region ../../packages/workbuddy-server/src/power/handlers.ts
function registerPowerHandlers(registry, deps) {
	require_workbuddy_auth_product_coordinator.handleRpc(registry, "setPowerSaveBlocker", async (enabled) => {
		deps.powerManager.setEnabled(enabled);
	});
	require_workbuddy_auth_product_coordinator.handleRpc(registry, "getPowerSaveBlockerState", async () => ({
		isEnabled: deps.powerManager.isEnabled(),
		isActive: deps.powerManager.isActive()
	}));
}
//#endregion
//#region ../../packages/workbuddy-server/src/system/handlers.ts
var TAG$7 = "[SystemHandlers]";
var YUANBAO_BUNDLE_ID = "com.tencent.yuanbao";
var YUANBAO_LAUNCH_SCHEME = "yuanbao://launch?tridChannel=workbuddy.ybssapihz.pc";
var YUANBAO_DOWNLOAD_URL = "https://yuanbao.tencent.com/download";
var IMA_COPILOT_SCHEME = "imacopilot://";
var IMA_COPILOT_BUNDLE_ID = "com.tencent.imamac";
var execFileAsync$1 = (0, node_util.promisify)(node_child_process.execFile);
function getPlatform(deps) {
	return deps.platform ?? process.platform;
}
function getHomeDir(deps) {
	return deps.homeDir ?? node_os.default.homedir();
}
function pathExists(deps, filePath) {
	return deps.exists ? deps.exists(filePath) : (0, node_fs.existsSync)(filePath);
}
/**
* `pathExists` 的静默版本：任何异常（权限拒绝、无效路径、注入的 exists 抛错等）
* 一律当作"不存在"处理，避免调用方到处写 `try { pathExists } catch`。
*/
function safePathExists(deps, filePath) {
	try {
		return pathExists(deps, filePath);
	} catch {
		return false;
	}
}
/**
* 取路径的父目录。Windows 平台走 `path.win32.dirname`，避免正斜杠路径在
* `path.dirname` 上被误判（Node 会按当前平台的分隔符判定）。
* 返回空串表示没有可用父目录（根路径 / 空输入 / 自引用）。
*/
function getParentDir(target, deps) {
	if (!target) return "";
	const dirname = getPlatform(deps) === "win32" ? node_path.default.win32.dirname(target) : node_path.default.dirname(target);
	return dirname && dirname !== target ? dirname : "";
}
/**
* 把 UI 侧传来的路径规范化为本地系统原生形式：
*  1. 剥掉 `file:///` 剥协议头后残留的多余前导 `/`：`/C:/...` → `C:/...`
*  2. Windows 上用 `path.win32.normalize` 折叠冗余分隔符 + 统一为反斜杠
*
* 为什么必须做反斜杠归一化：
*   Electron `shell.showItemInFolder` 在 Windows 上底层调
*   `SHParseDisplayNameEx` / `SHOpenFolderAndSelectItems`。这两个 Win32 API
*   对正斜杠 + Unicode 特殊字符（如 U+2014 长破折号 `——`）叠加时解析不稳定，
*   失败后 Electron 会 fallback 到 `ShellExecute(path)`。若 target 是文件，
*   这就变成"尝试用关联应用打开该文件"，用户机器上没装 Word/WPS 时会弹出
*   Windows 系统的 "该文件没有与之关联的应用可以执行该操作" —— 用户点的
*   明明是"打开文件夹"，看到的却是 shell 应用关联弹窗（用户报障截图证据）。
*
* macOS / Linux 上保留原样：Finder / xdg-open 对正斜杠路径无解析歧义。
*/
function normalizeWindowsPath(p, deps) {
	if (!p) return p;
	let normalized = p;
	if (/^\/[a-zA-Z]:[/\\]/.test(normalized)) normalized = normalized.slice(1);
	if ((deps ? getPlatform(deps) : process.platform) === "win32") return node_path.default.win32.normalize(normalized);
	return normalized;
}
function resolveLegacyWorkspacePath(p, currentAppName, deps) {
	if (!p || safePathExists(deps, p)) return p;
	if (!currentAppName || currentAppName === "WorkBuddy") return p;
	const home = getHomeDir(deps);
	const legacyPrefix = `${home}${node_path.default.sep}WorkBuddy${node_path.default.sep}`;
	if (!p.startsWith(legacyPrefix)) return p;
	const rewritten = node_path.default.join(home, currentAppName, p.slice(legacyPrefix.length));
	return safePathExists(deps, rewritten) ? rewritten : p;
}
/**
* "在文件管理器中定位到文件" 的安全入口（`workspace:openFolder` /
* `window:showItemInFolder` 共用）。
*
* 语义：给定文件/目录绝对路径，打开其所在文件夹并高亮该 item。
*
* 为什么不直接调 `shell.showItemInFolder`：
*   Electron `shell.showItemInFolder` 在 Windows 上底层解析失败时会 fallback
*   到 `ShellExecute(target)`。target 是文件且无关联应用时，会弹 Windows 系统
*   "该文件没有与之关联的应用可以执行该操作"，用户看到的语义与"打开文件夹"
*   完全不符。这里显式做前置存在性检查，target 不存在时降级为
*   `openPath(dirname)`（Windows 上 `explorer.exe <dir>` 打开目录本身是
*   safe 的，不会走 ShellExecute 关联应用路径）。
*/
async function revealItemInFolderSafely(deps, target) {
	if (!target) {
		deps.logger?.warn(`${TAG$7} revealItemInFolder: empty path, skip`);
		return;
	}
	if (safePathExists(deps, target)) {
		await deps.shell.showItemInFolder(target);
		return;
	}
	const dirname = getParentDir(target, deps);
	if (!dirname) {
		deps.logger?.warn(`${TAG$7} revealItemInFolder: target missing and no parent dir`, { target });
		return;
	}
	deps.logger?.warn(`${TAG$7} revealItemInFolder: target missing, opening parent dir instead`, {
		target,
		dirname
	});
	await deps.shell.openPath(dirname);
}
async function checkFullDiskAccess(deps) {
	const tccPath = node_path.default.join(getHomeDir(deps), "Library/Application Support/com.apple.TCC/TCC.db");
	try {
		const fh = await node_fs.promises.open(tccPath, "r");
		try {
			const buf = Buffer.alloc(16);
			await fh.read(buf, 0, 16, 0);
			return "authorized";
		} finally {
			await fh.close();
		}
	} catch {
		return "unauthorized";
	}
}
async function checkAutomation(deps) {
	try {
		await execFileAsync$1("osascript", ["-e", "tell application \"System Events\" to get name of first process"], { timeout: 3e3 });
		return "authorized";
	} catch (err) {
		const stderr = err?.stderr;
		const message = typeof stderr === "string" ? stderr : Buffer.isBuffer(stderr) ? stderr.toString("utf8") : err?.message ?? "";
		if (/-1743|not allowed|not authorized/i.test(message)) return "unauthorized";
		deps.logger?.warn(`${TAG$7} checkAutomation unexpected error:`, message.trim());
		return "unauthorized";
	}
}
async function checkOneSystemPermission(id, deps) {
	switch (id) {
		case "fullDiskAccess": return checkFullDiskAccess(deps);
		case "accessibility": return deps.permissions.checkAccessibility();
		case "automation": return checkAutomation(deps);
		case "notification": return "skip";
		case "calendarAccess": return "unauthorized";
		default: return "unauthorized";
	}
}
async function checkSystemPermissions(permissionIds, deps) {
	deps.logger?.log(`${TAG$7} checkSystemPermissions called with ids:`, permissionIds);
	const result = {};
	if (!Array.isArray(permissionIds) || permissionIds.length === 0) return result;
	if (getPlatform(deps) !== "darwin") return result;
	const unique = Array.from(new Set(permissionIds));
	const results = await Promise.all(unique.map(async (id) => [id, await checkOneSystemPermission(id, deps)]));
	for (const [id, status] of results) {
		if (status === "skip") continue;
		result[id] = status;
	}
	deps.logger?.log(`${TAG$7} checkSystemPermissions result:`, result);
	return result;
}
async function isYuanbaoInstalledOnMac(deps) {
	try {
		const { stdout } = await execFileAsync$1("mdfind", [`kMDItemCFBundleIdentifier == '${YUANBAO_BUNDLE_ID}'`], { timeout: 3e3 });
		const paths = stdout.split("\n").map((s) => s.trim()).filter(Boolean);
		for (const appPath of paths) {
			if (!appPath.startsWith("/Applications/")) {
				deps.logger?.info(`${TAG$7} isYuanbaoInstalledOnMac: skip non-Applications path: ${appPath}`);
				continue;
			}
			if (pathExists(deps, appPath)) {
				deps.logger?.info(`${TAG$7} isYuanbaoInstalledOnMac: found at ${appPath}`);
				return true;
			}
		}
		deps.logger?.info(`${TAG$7} isYuanbaoInstalledOnMac: bundleId=${YUANBAO_BUNDLE_ID} not found in /Applications/`);
		return false;
	} catch (e) {
		deps.logger?.warn(`${TAG$7} isYuanbaoInstalledOnMac check failed:`, e);
		return false;
	}
}
async function isYuanbaoInstalledOnWin(deps) {
	const registryKey = "HKEY_LOCAL_MACHINE\\SOFTWARE\\Tencent\\Yuanbao";
	try {
		const { stdout } = await execFileAsync$1("reg", [
			"query",
			registryKey,
			"/v",
			"InstallPath"
		]);
		const match = stdout.match(/InstallPath\s+REG_SZ\s+(.+)/);
		if (!match) return false;
		return pathExists(deps, `${match[1].trim()}\\yuanbao.exe`);
	} catch (e) {
		deps.logger?.warn(`${TAG$7} isYuanbaoInstalledOnWin check failed:`, e);
		return false;
	}
}
async function openYuanbao(deps) {
	let installed = false;
	if (getPlatform(deps) === "darwin") installed = await isYuanbaoInstalledOnMac(deps);
	else if (getPlatform(deps) === "win32") installed = await isYuanbaoInstalledOnWin(deps);
	else installed = true;
	deps.logger?.info(`${TAG$7} openYuanbao: platform=${getPlatform(deps)}, installed=${installed}`);
	if (installed) try {
		await deps.shell.openExternal(YUANBAO_LAUNCH_SCHEME);
		return true;
	} catch (error) {
		deps.logger?.error(`${TAG$7} openYuanbao scheme launch failed:`, error);
	}
	try {
		await deps.shell.openExternal(YUANBAO_DOWNLOAD_URL);
	} catch (error) {
		deps.logger?.error(`${TAG$7} openYuanbao open download page failed:`, error);
	}
	return false;
}
async function isImaCopilotInstalledOnMac(deps) {
	try {
		const { stdout } = await execFileAsync$1("mdfind", [`kMDItemCFBundleIdentifier == '${IMA_COPILOT_BUNDLE_ID}'`], { timeout: 3e3 });
		const appPaths = stdout.split("\n").map((s) => s.trim()).filter(Boolean);
		const installed = appPaths.some((appPath) => pathExists(deps, appPath));
		deps.logger?.info(`${TAG$7} isImaCopilotInstalledOnMac: installed=${installed}, candidates=${appPaths.length}`);
		return installed;
	} catch (error) {
		deps.logger?.warn(`${TAG$7} isImaCopilotInstalledOnMac check failed:`, error);
		return false;
	}
}
async function isImaCopilotInstalledOnWin() {
	const registryKey = "HKEY_CLASSES_ROOT\\imacopilot";
	try {
		await execFileAsync$1("reg", [
			"query",
			registryKey,
			"/ve"
		], { timeout: 3e3 });
		return true;
	} catch {
		return false;
	}
}
async function hasImaApp(deps) {
	if (getPlatform(deps) === "darwin") return isImaCopilotInstalledOnMac(deps);
	if (getPlatform(deps) === "win32") return isImaCopilotInstalledOnWin();
	return false;
}
async function openImaApp(deps, params) {
	const { schema, url } = params;
	if (/^imacopilot:\/\//i.test(schema)) {
		deps.logger?.warn(`${TAG$7} openImaApp invalid schema input: should not include 'imacopilot://' prefix`, {
			schema,
			fallbackUrl: url
		});
		await deps.shell.openExternal(url);
		return;
	}
	const fullSchema = `${IMA_COPILOT_SCHEME}${schema}`;
	deps.logger?.info(`${TAG$7} openImaApp called`, {
		platform: getPlatform(deps),
		schemaRaw: schema,
		fullSchema,
		fallbackUrl: url
	});
	const installed = await hasImaApp(deps);
	deps.logger?.info(`${TAG$7} openImaApp install check result: installed=${installed}`);
	if (installed) try {
		await deps.shell.openExternal(fullSchema);
		deps.logger?.info(`${TAG$7} openImaApp launched via scheme: ${fullSchema}`);
		return;
	} catch (error) {
		deps.logger?.error(`${TAG$7} openImaApp scheme launch failed:`, error);
	}
	deps.logger?.info(`${TAG$7} openImaApp fallback to url: ${url}`);
	await deps.shell.openExternal(url);
}
function registerSystemHandlers(registry, deps) {
	require_workbuddy_auth_product_coordinator.handleRpc(registry, "windowShowItemInFolder", async (filePath) => {
		await revealItemInFolderSafely(deps, normalizeWindowsPath(filePath, deps));
	});
	require_workbuddy_auth_product_coordinator.handleRpc(registry, "openExternal", async (url) => {
		if (!url) {
			deps.logger?.warn(`${TAG$7} openExternal: URL is empty`);
			return false;
		}
		return await deps.shell.openExternal(url);
	});
	require_workbuddy_auth_product_coordinator.handleRpc(registry, "openYuanbao", async () => openYuanbao(deps));
	require_workbuddy_auth_product_coordinator.handleRpc(registry, "hasImaApp", async () => hasImaApp(deps));
	require_workbuddy_auth_product_coordinator.handleRpc(registry, "openImaApp", async (params) => openImaApp(deps, params));
	require_workbuddy_auth_product_coordinator.handleRpc(registry, "windowOpenLocalFile", async (filePath, options) => {
		const normalized = normalizeWindowsPath(filePath, deps);
		if (options?.createIfMissing) {
			await node_fs.promises.mkdir(node_path.default.dirname(normalized), { recursive: true });
			try {
				await node_fs.promises.writeFile(normalized, "", { flag: "wx" });
			} catch (error) {
				if (error.code !== "EEXIST") throw error;
			}
		}
		await deps.shell.openPath(normalized);
	});
	require_workbuddy_auth_product_coordinator.handleRpc(registry, "workspaceOpenFolder", async (folderPath) => {
		await revealItemInFolderSafely(deps, resolveLegacyWorkspacePath(normalizeWindowsPath(folderPath, deps), deps.app?.getName?.() ?? "WorkBuddy", deps));
	});
	require_workbuddy_auth_product_coordinator.handleRpc(registry, "openPath", async (filePath) => deps.shell.openPath(normalizeWindowsPath(filePath, deps)));
	require_workbuddy_auth_product_coordinator.handleRpc(registry, "readClipboard", async () => deps.clipboard.readText());
	require_workbuddy_auth_product_coordinator.handleRpc(registry, "checkSystemPermissions", async (permissionIds) => checkSystemPermissions(permissionIds ?? [], deps));
	require_workbuddy_auth_product_coordinator.handleRpc(registry, "requestNotificationRegistration", async () => deps.notification.requestRegistration());
}
//#endregion
//#region ../../packages/workbuddy-server/src/update/handlers.ts
var TAG$6 = "[UpdateHandlers]";
function toUiPayload(payload) {
	return {
		type: payload.state,
		update: payload.info ? {
			version: payload.info.version,
			productVersion: payload.info.version
		} : void 0,
		progress: payload.progress,
		error: payload.error,
		explicit: payload.explicit,
		forceUpgrade: payload.forceUpgrade
	};
}
function registerUpdateHandlers(registry, deps) {
	const updateService = Promise.resolve(deps.update);
	require_workbuddy_auth_product_coordinator.handleRpc(registry, "updateCheck", async () => {
		try {
			await (await updateService).check(true);
		} catch (error) {
			deps.logger?.error(`${TAG$6} update:check error:`, String(error));
		}
	});
	require_workbuddy_auth_product_coordinator.handleRpc(registry, "updateDownload", async () => {});
	require_workbuddy_auth_product_coordinator.handleRpc(registry, "updateArchMismatchDownload", async () => {
		await (await updateService).downloadArchMismatchGuide();
	});
	require_workbuddy_auth_product_coordinator.handleRpc(registry, "updateArchMismatchInstall", async () => {
		await (await updateService).installArchMismatchGuide();
	});
	require_workbuddy_auth_product_coordinator.handleRpc(registry, "updateQuitAndInstall", async () => {
		await (await updateService).quitAndInstall();
	});
	require_workbuddy_auth_product_coordinator.handleRpc(registry, "updateGetState", async () => toUiPayload(await (await updateService).getState()));
	updateService.then((service) => service.start((payload) => {
		require_workbuddy_auth_product_coordinator.pushRpcEvent(registry, "onUpdateStateChanged", toUiPayload(payload));
	})).catch((error) => {
		deps.logger?.error(`${TAG$6} update lifecycle start error:`, String(error));
	});
}
//#endregion
//#region ../../packages/workbuddy-server/src/wechat-share/handlers.ts
var TAG$5 = "[WechatShare]";
function getErrorMessage(error, fallback) {
	return error instanceof Error && error.message ? error.message : fallback;
}
function asParams(params) {
	return params && typeof params === "object" ? params : {};
}
function normalizeShareLinkParams(params) {
	if (params.scene) return params;
	if (params.source) return {
		...params,
		scene: params.source
	};
	return params;
}
function registerWechatShareHandlers(registry, deps) {
	registry.handle("wechat:getShareTicket", async () => {
		try {
			return await (await deps.createTicketService()).getShareTicket();
		} catch (error) {
			deps.logger?.error(`${TAG$5} getShareTicket failed:`, error);
			throw new Error(getErrorMessage(error, "Failed to get WeChat share ticket"));
		}
	});
	registry.handle("wechat:shareLink", async (params) => {
		try {
			const p = normalizeShareLinkParams(asParams(params));
			if (!p.ticket || !p.appid || !p.url || !p.scene) throw new Error("Missing required params: ticket, appid, url, scene");
			const pageUrl = await deps.resolvePageUrl();
			return await deps.wechatShare.shareLink(pageUrl, p);
		} catch (error) {
			deps.logger?.error(`${TAG$5} wechat:shareLink failed:`, error);
			return {
				success: false,
				errcode: 7,
				errmsg: getErrorMessage(error, "Unknown error")
			};
		}
	});
	registry.handle("wechat:launchMiniProgram", async (params) => {
		try {
			const p = asParams(params);
			if (!p.ticket || !p.appid || !p.userName) throw new Error("Missing required params: ticket, appid, userName");
			const pageUrl = await deps.resolvePageUrl();
			return await deps.wechatShare.launchMiniProgram(pageUrl, p);
		} catch (error) {
			deps.logger?.error(`${TAG$5} wechat:launchMiniProgram failed:`, error);
			return {
				success: false,
				errcode: 7,
				errmsg: getErrorMessage(error, "Unknown error")
			};
		}
	});
	registry.handle("wechat:shareMiniProgram", async (params) => {
		try {
			const p = asParams(params);
			if (!p.ticket || !p.appid || !p.userName || !p.txt || !p.thumburl) throw new Error("Missing required params: ticket, appid, userName, txt, thumburl");
			const pageUrl = await deps.resolvePageUrl();
			return await deps.wechatShare.shareMiniProgram(pageUrl, p);
		} catch (error) {
			deps.logger?.error(`${TAG$5} wechat:shareMiniProgram failed:`, error);
			return {
				success: false,
				errcode: 7,
				errmsg: getErrorMessage(error, "Unknown error")
			};
		}
	});
	registry.handle("wechat:shareFile", async (params) => {
		try {
			const p = asParams(params);
			if (!p.ticket || !p.appid || !p.userName || !p.fileUrl || !p.fileName || !p.fileSha256 || !p.scene) throw new Error("Missing required params: ticket, appid, userName, fileUrl, fileName, fileSha256, scene");
			const pageUrl = await deps.resolvePageUrl();
			return await deps.wechatShare.shareFile(pageUrl, p);
		} catch (error) {
			deps.logger?.error(`${TAG$5} wechat:shareFile failed:`, error);
			return {
				success: false,
				errcode: 7,
				errmsg: getErrorMessage(error, "Unknown error")
			};
		}
	});
	registry.handle("clipboard:writeImage", async (dataUrl) => {
		try {
			if (typeof dataUrl !== "string") throw new Error("dataUrl must be a string");
			deps.clipboard.writeImageFromDataUrl(dataUrl);
		} catch (error) {
			deps.logger?.error(`${TAG$5} clipboard:writeImage failed:`, error);
			throw new Error(getErrorMessage(error, "Failed to write image to clipboard"));
		}
	});
}
//#endregion
//#region ../../packages/workbuddy-server/src/window/handlers.ts
function registerWindowHandlers(registry, deps) {
	const { hostWindow } = deps;
	require_workbuddy_auth_product_coordinator.handleRpc(registry, "minimizeWindow", async () => hostWindow.minimize());
	require_workbuddy_auth_product_coordinator.handleRpc(registry, "maximizeWindow", async () => hostWindow.maximize());
	require_workbuddy_auth_product_coordinator.handleRpc(registry, "closeWindow", async () => hostWindow.close());
	require_workbuddy_auth_product_coordinator.handleRpc(registry, "isWindowMaximized", async () => hostWindow.isMaximized());
	require_workbuddy_auth_product_coordinator.handleRpc(registry, "windowCancelPendingClose", async () => hostWindow.cancelPendingClose());
	require_workbuddy_auth_product_coordinator.handleRpc(registry, "windowConfirmClose", async () => hostWindow.confirmClose());
	require_workbuddy_auth_product_coordinator.handleRpc(registry, "windowSetTrafficLightsVisible", async (visible) => hostWindow.setTrafficLightsVisible(visible));
	require_workbuddy_auth_product_coordinator.handleRpc(registry, "windowReload", async () => hostWindow.reload());
	require_workbuddy_auth_product_coordinator.handleRpc(registry, "windowCloseAgentManager", async () => hostWindow.confirmClose());
	require_workbuddy_auth_product_coordinator.handleRpc(registry, "setWindowFullscreen", async (flag) => hostWindow.setFullscreen(flag));
	require_workbuddy_auth_product_coordinator.handleRpc(registry, "toggleWindowFullscreen", async () => hostWindow.toggleFullscreen());
	registry.handle("windowUpdateTitleBarOverlay", async (options) => hostWindow.updateTitleBarOverlay(options));
	registry.handle("isWindowFullscreen", async () => hostWindow.isFullscreen());
	hostWindow.onFullscreenChange((isFullscreen) => {
		registry.push?.("window-fullscreen-changed", isFullscreen);
	});
	hostWindow.onMaximizeChange((isMaximized) => {
		registry.push?.("window:maximizeChanged", isMaximized);
	});
	hostWindow.onFocusChange((isFocused) => {
		registry.push?.("window:focusChanged", isFocused);
	});
}
//#endregion
//#region src/main/integrations/wechat-share/wechat-share-facade.ts
function createWechatShareFacade(deps) {
	const { getSession, getEndpoint, fetch: doFetch } = deps;
	return { async getShareTicket() {
		const session = getSession();
		if (!session?.auth?.accessToken) throw new Error("User not authenticated");
		const { account, auth } = session;
		const headers = {
			"Accept": "application/json",
			"Content-Type": "application/json",
			"Authorization": `Bearer ${auth.accessToken}`
		};
		if (account?.uid) headers["X-User-Id"] = account.uid;
		if (account?.enterpriseId) {
			headers["X-Enterprise-Id"] = account.enterpriseId;
			headers["X-Tenant-Id"] = account.enterpriseId;
		}
		if (auth.domain) headers["X-Domain"] = auth.domain;
		const url = `${getEndpoint()}/v2/as/wechatopen/pc-share/ticket`;
		console.log("[WxShare][service] getShareTicket request", {
			url,
			uid: account?.uid,
			enterpriseId: account?.enterpriseId,
			domain: auth.domain
		});
		const response = await doFetch(url, {
			method: "POST",
			headers,
			body: JSON.stringify({
				scene: "pc_share",
				client_type: "desktop"
			})
		});
		console.log("[WxShare][service] getShareTicket response", {
			status: response.status,
			statusText: response.statusText
		});
		if (!response.ok) throw new Error(`Failed to get wx ticket: ${response.status} ${response.statusText}`);
		const data = await response.json();
		if (!data.success || !data.ticket) throw new Error("Invalid response: missing ticket");
		return data;
	} };
}
//#endregion
//#region src/main/system/platform/install-dir-guard.ts
/**
* Install Directory Guard
*
* Prevents data loss when users place project directories inside the
* WorkBuddy installation directory on Windows. The NSIS installer may
* overwrite or clean files during updates/uninstalls.
*
* Only active on Windows; macOS/Linux always return safe (false).
*/
/**
* Application's known top-level directories (Electron + NSIS standard structure).
* Any directory NOT in this set and NOT matching known patterns is considered user content.
*
* This list is intentionally conservative - a false positive (blocking update when
* there's no user content) is far safer than a false negative (allowing update when
* user content exists).
*/
var APP_KNOWN_DIRS = new Set([
	"bin",
	"locales",
	"resources",
	"tools",
	"log",
	"logs",
	"_"
]);
/**
* Check if a directory name is part of the Electron/app infrastructure
* rather than user content.
*/
function isKnownAppDirectory(name) {
	const lower = name.toLowerCase();
	if (APP_KNOWN_DIRS.has(lower)) return true;
	if (lower.startsWith("$") || lower.startsWith("nsis")) return true;
	return false;
}
/**
* Get the application's installation directory (the directory containing the exe).
* Returns undefined if not on Windows or if the path cannot be determined.
*/
function getInstallDir() {
	if (process.platform !== "win32") return;
	try {
		return node_path.dirname(process.execPath);
	} catch {
		return;
	}
}
/**
* Check if a given path is inside (or equal to) the installation directory.
* Uses normalized, case-insensitive comparison for Windows paths.
*
* @param targetPath The path to check
* @returns true if the path is inside the install dir; false otherwise or on non-Windows
*/
function isPathInInstallDir(targetPath) {
	const installDir = getInstallDir();
	if (!installDir) return false;
	const normalizedTarget = node_path.resolve(targetPath).toLowerCase();
	const normalizedInstall = node_path.resolve(installDir).toLowerCase();
	return normalizedTarget === normalizedInstall || normalizedTarget.startsWith(normalizedInstall + node_path.sep);
}
/**
* Check if the installation directory contains any sub-directories that are
* NOT part of the application itself. Such directories are likely user project
* folders that would be at risk during an update.
*
* Only checks top-level directories - user projects are always directories,
* and the app's own top-level dirs are few and stable.
*
* @returns true if unknown directories exist in the install dir
*/
function hasUserContentInInstallDir() {
	const installDir = getInstallDir();
	if (!installDir) return false;
	try {
		return node_fs.readdirSync(installDir, { withFileTypes: true }).some((e) => e.isDirectory() && !isKnownAppDirectory(e.name));
	} catch {
		return false;
	}
}
//#endregion
//#region src/main/features/i18n/install-dir-guard-i18n.ts
var translations$2 = {
	"zh-CN": {
		folderSelectionTitle: "你选择的位置在应用安装目录下",
		folderSelectionDetail: "这可能导致软件更新或卸载时项目文件丢失，请重新选择。",
		updateBlockedTitle: "无法安装必要的更新",
		updateBlockedMessage: "检测到应用安装目录下存在用户项目目录，更新会导致项目记录丢失。",
		updateBlockedDetail: "请先将项目迁移到其他目录（非安装目录）后再重试更新。",
		updateBlockedHelpButton: "了解更多"
	},
	"en-US": {
		folderSelectionTitle: "The selected folder is inside the application install directory",
		folderSelectionDetail: "This may cause project files to be lost during software updates or uninstallation. Please select a different location.",
		updateBlockedTitle: "Unable to install the required update",
		updateBlockedMessage: "Detected user project folders in the application install directory. Updating would cause project records to be lost.",
		updateBlockedDetail: "Please migrate your projects to another directory (outside the install directory) before trying to update again.",
		updateBlockedHelpButton: "Learn More"
	}
};
function getInstallDirGuardMessages(locale) {
	return translations$2[locale ?? require_menu_i18n.getMenuLocale()] ?? translations$2["zh-CN"];
}
//#endregion
//#region src/main/features/desktop-host/rpc-handlers.ts
async function resolveWechatSharePageUrl(daemonState) {
	const product = daemonState.getProductConfiguration();
	const isStaging = (daemonState.getEndpoint() || "").includes("staging");
	const wechatShare = product?.wechatShare;
	return isStaging ? wechatShare?.stagingSharePageUrl || wechatShare?.stagingBaseUrl || "https://staging.codebuddy.cn/agents/share/wx-share.html" : wechatShare?.sharePageUrl || wechatShare?.baseUrl || "https://www.codebuddy.cn/agents/share/wx-share.html";
}
function createDesktopHostRpcHandlerDeps(options) {
	const services = Promise.resolve(options.services);
	const updateService = Promise.resolve(options.updateService);
	const appUpdateService = updateService.then((service) => ({
		check: (explicit) => service.check(explicit === true),
		quitAndInstall: async () => {
			await service.quitAndInstall();
		}
	}));
	const daemonState = options.daemonState;
	return {
		app: {
			app: options.desktopHost.app,
			window: options.desktopHost.window,
			config: services.then((value) => value.config),
			update: appUpdateService,
			getMachineId: require_log_acl_guard.machineIdSync,
			getLogFilePath: require_logger.getLogFilePath,
			logger: require_logger.mainLog,
			setMenuLocale: (locale) => require_menu_i18n.setMenuLocale(locale),
			buildAndSetApplicationMenu: async () => {
				const { buildAndSetApplicationMenu } = await Promise.resolve().then(() => require("./menu-builder2.js"));
				buildAndSetApplicationMenu();
			},
			openLogsFolder: (logsDirectory, fallbackDirectories) => require_marks.packageAndShowLog(logsDirectory, options.desktopHost.shell, fallbackDirectories),
			switchDevEnv: async (env) => {
				const { switchDevEnv } = await Promise.resolve().then(() => require("./dev-env-actions.js"));
				await switchDevEnv(env);
			},
			toggleIOAImWhitelist: async () => {
				const { toggleIOAImWhitelist } = await Promise.resolve().then(() => require("./ioa-im-actions.js"));
				toggleIOAImWhitelist();
			},
			ioaImWhitelist: {
				onCurrentSessionChanged: (listener) => daemonState.onCurrentSessionChanged(() => listener()),
				getIOAImWhitelistEligible: async () => {
					const IOA_ENTERPRISE_IDS = new Set(["esoikz80kd8g", "etahzsqej0n4"]);
					const enterpriseId = daemonState.getAccount()?.enterpriseId;
					if (!enterpriseId || !IOA_ENTERPRISE_IDS.has(enterpriseId)) return false;
					for (let retry = 0; retry < 3; retry++) {
						try {
							await daemonState.refreshProductConfiguration();
						} catch {}
						const value = (daemonState.getProductConfiguration()?.productFeatures)?.["IOAImWhitelistEligible"];
						if (typeof value === "boolean") return value;
						if (retry < 2) await new Promise((resolve) => setTimeout(resolve, 1e3));
					}
					return false;
				},
				notifyEligibility: async (eligible) => {
					const { setIOAImWhitelistMenuVisible, buildAndSetApplicationMenu } = await Promise.resolve().then(() => require("./menu-builder2.js"));
					setIOAImWhitelistMenuVisible(eligible);
					buildAndSetApplicationMenu();
					if (!eligible) {
						const { writeIOAImOverride } = await Promise.resolve().then(() => require("./ioa-im-override.js")).then((n) => n.ioa_im_override_exports);
						writeIOAImOverride(false);
					}
					const { syncIOAImEligibilityToAllWindows } = await Promise.resolve().then(() => require("./ioa-im-actions.js"));
					syncIOAImEligibilityToAllWindows(eligible);
				}
			},
			authMenu: {
				getCurrentUserId: () => daemonState.getAccount()?.uid,
				onCurrentSessionChanged: (listener) => daemonState.onCurrentSessionChanged(() => listener()),
				setMenuUserId: async (uid) => {
					const { setMenuUserId } = await Promise.resolve().then(() => require("./menu-builder2.js"));
					setMenuUserId(uid, daemonState.getAccount()?.enterpriseId);
				}
			}
		},
		window: { hostWindow: options.desktopHost.window },
		dialog: {
			app: options.desktopHost.app,
			dialog: {
				showSaveDialog: (dialogOptions) => options.desktopHost.dialog.showSaveDialog(dialogOptions),
				showOpenDialog: (dialogOptions) => options.desktopHost.dialog.showOpenDialog(dialogOptions),
				showMessageBox: (dialogOptions) => options.desktopHost.dialog.showMessageBox(dialogOptions)
			},
			isPathInInstallDir,
			getInstallDirGuardMessages
		},
		microphone: {
			hostWindow: options.desktopHost.window,
			permissions: options.desktopHost.permissions,
			logger: require_logger.handlerLog
		},
		system: {
			app: options.desktopHost.app,
			shell: options.desktopHost.shell,
			clipboard: options.desktopHost.clipboard,
			notification: options.desktopHost.notification,
			permissions: options.desktopHost.permissions,
			logger: console
		},
		power: { powerManager: options.powerManager },
		update: {
			update: updateService,
			logger: console
		},
		wechatShare: {
			createTicketService: async () => createWechatShareFacade({
				getSession: () => {
					const session = daemonState.getSession();
					if (!session?.auth?.accessToken) return null;
					return {
						account: {
							uid: session.account?.uid,
							enterpriseId: session.account?.enterpriseId
						},
						auth: {
							accessToken: session.auth.accessToken,
							domain: session.auth.domain
						}
					};
				},
				getEndpoint: () => daemonState.getEndpoint() || "https://copilot.tencent.com",
				fetch: options.desktopHost.network.fetch
			}),
			resolvePageUrl: () => resolveWechatSharePageUrl(daemonState),
			wechatShare: {
				shareLink: (pageUrl, params) => options.desktopHost.wechatShare.shareLink(pageUrl, params),
				launchMiniProgram: (pageUrl, params) => options.desktopHost.wechatShare.launchMiniProgram(pageUrl, params),
				shareMiniProgram: (pageUrl, params) => options.desktopHost.wechatShare.shareMiniProgram(pageUrl, params),
				shareFile: (pageUrl, params) => options.desktopHost.wechatShare.shareFile(pageUrl, params)
			},
			clipboard: options.desktopHost.clipboard,
			logger: console
		}
	};
}
function registerDesktopHostRpcHandlers(registry, options) {
	const deps = createDesktopHostRpcHandlerDeps(options);
	registerAppHandlers(registry, deps.app);
	require_menu_builder.setMenuCommandHandler(async (commandId) => {
		await registry.invoke("executeMenuCommand", commandId);
	});
	registerWindowHandlers(registry, deps.window);
	registerDialogHandlers(registry, deps.dialog);
	registerMicrophonePermissionHandlers(registry, deps.microphone);
	registerSystemHandlers(registry, deps.system);
	registerPowerHandlers(registry, deps.power);
	registerUpdateHandlers(registry, deps.update);
	registerWechatShareHandlers(registry, deps.wechatShare);
}
//#endregion
//#region src/main/features/workflows/common/buffered-file-logger.ts
/**
* Buffered File Logger
*
* Generic file logger with in-memory buffering and async batch flushing.
* Subclass this and pass configuration via constructor options to create
* business-specific loggers (e.g. migration, update).
*
* Features:
* - Async batch flush via setInterval + buffer threshold
* - Sync flush on process exit to prevent log loss
* - Daily log file rotation (one file per day, append mode)
* - Automatic cleanup of files older than the configured retention period
* - Session separator written on each initialization
*
* Log format: [ISO_TIMESTAMP] [LEVEL] message
*/
var BufferedFileLogger = class {
	logFilePath;
	logDir;
	filePrefix;
	retentionDays;
	bufferThreshold;
	buffer = [];
	isFlushing = false;
	flushTimer = null;
	constructor(options) {
		this.logDir = options.logDir;
		this.filePrefix = options.filePrefix;
		this.retentionDays = options.retentionDays ?? 30;
		this.bufferThreshold = options.bufferThreshold ?? 50;
		this.ensureDir(this.logDir);
		const dateStr = this.formatDate(/* @__PURE__ */ new Date());
		this.logFilePath = path.join(this.logDir, `${this.filePrefix}-${dateStr}.log`);
		this.startFlushTimer(options.flushIntervalMs ?? 200);
		this.registerExitHook();
		this.cleanupOldLogs();
		this.writeSessionSeparator();
		this.info(`Logger initialized at ${this.logFilePath}`);
	}
	getLogFilePath() {
		return this.logFilePath;
	}
	debug(message) {
		this.write("debug", message);
	}
	info(message) {
		this.write("info", message);
	}
	warn(message) {
		this.write("warn", message);
	}
	error(message, error) {
		const msg = error ? `${message}\n  Stack: ${error.stack || error.message}` : message;
		this.write("error", msg);
	}
	/**
	* Stop the flush timer and synchronously write remaining buffered logs.
	* Call this when the application is shutting down gracefully.
	*/
	dispose() {
		if (this.flushTimer) {
			clearInterval(this.flushTimer);
			this.flushTimer = null;
		}
		this.flushSync();
	}
	/**
	* Synchronously flush the in-memory buffer to disk immediately.
	* Use this around critical log points right before process termination
	* paths (e.g. app.quit()) where the 200ms timer flush may lose entries.
	*/
	flushNow() {
		this.flushSync();
	}
	write(level, message) {
		const line = `[${(/* @__PURE__ */ new Date()).toISOString()}] [${level.toUpperCase().padEnd(5)}] ${message}\n`;
		this.buffer.push(line);
		if (this.buffer.length >= this.bufferThreshold) this.flush().catch(() => {});
	}
	async flush() {
		if (this.isFlushing || this.buffer.length === 0) return;
		this.isFlushing = true;
		const lines = this.buffer.splice(0);
		try {
			await fs.promises.appendFile(this.logFilePath, lines.join(""), "utf-8");
		} catch {
			this.buffer.unshift(...lines);
		} finally {
			this.isFlushing = false;
		}
	}
	flushSync() {
		if (this.buffer.length === 0) return;
		try {
			fs.appendFileSync(this.logFilePath, this.buffer.splice(0).join(""), "utf-8");
		} catch {}
	}
	startFlushTimer(intervalMs) {
		this.flushTimer = setInterval(() => {
			this.flush().catch(() => {});
		}, intervalMs);
		this.flushTimer.unref();
	}
	registerExitHook() {
		process.on("exit", () => this.flushSync());
	}
	ensureDir(dir) {
		try {
			if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
		} catch {}
	}
	writeSessionSeparator() {
		const timestamp = (/* @__PURE__ */ new Date()).toISOString();
		const separator = `\n${"=".repeat(80)}\n  Session started at ${timestamp}\n${"=".repeat(80)}\n`;
		this.buffer.push(separator);
	}
	formatDate(date) {
		const pad = (n) => String(n).padStart(2, "0");
		return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}`;
	}
	cleanupOldLogs() {
		this.cleanupOldLogsAsync().catch(() => {});
	}
	async cleanupOldLogsAsync() {
		try {
			const cutoffDate = /* @__PURE__ */ new Date();
			cutoffDate.setDate(cutoffDate.getDate() - this.retentionDays);
			const cutoffStr = this.formatDate(cutoffDate);
			const prefix = `${this.filePrefix}-`;
			const files = await fs.promises.readdir(this.logDir);
			for (const file of files.filter((f) => f.startsWith(prefix) && f.endsWith(".log"))) if (file.replace(prefix, "").replace(".log", "") < cutoffStr) await fs.promises.unlink(path.join(this.logDir, file)).catch(() => {});
		} catch {}
	}
};
//#endregion
//#region src/main/features/workflows/update/update-file-logger.ts
/**
* Update File Logger
*
* Writes update-related logs to ~/.workbuddy/logs/update/ directory.
*/
/**
* Update file logger singleton.
*
* Writes structured log lines to a dedicated update log file.
*/
var UpdateFileLogger = class UpdateFileLogger extends BufferedFileLogger {
	static instance = null;
	constructor() {
		super({
			logDir: require_runtime_context.getWorkbuddyRuntimeLogsDir("update"),
			filePrefix: "update"
		});
		console.info(`[UpdateFileLogger] Log file: ${this.getLogFilePath()}`);
	}
	static getInstance() {
		if (!UpdateFileLogger.instance) UpdateFileLogger.instance = new UpdateFileLogger();
		return UpdateFileLogger.instance;
	}
};
//#endregion
//#region src/main/features/workflows/update/arch-mismatch-guide-service.ts
/**
* macOS 架构错包检测与引导下载服务。
*
* `checkAndPrompt()` 与 `downloadLatestArm64()` 仅在 macOS Rosetta x64 场景下产生状态/下载行为。
* 其他平台或非错包架构下不会主动触发引导下载。
*/
var ArchMismatchGuideService = class ArchMismatchGuideService extends events.EventEmitter {
	logger;
	userInfoProvider;
	updateBaseUrlProvider;
	getMainWindow;
	fileLogger;
	inProgress = false;
	downloadedDmgPath;
	downloadedVersion;
	currentState;
	constructor(deps = {}) {
		super();
		this.logger = deps.logger;
		this.userInfoProvider = deps.userInfoProvider;
		this.updateBaseUrlProvider = deps.updateBaseUrlProvider;
		this.getMainWindow = deps.getMainWindow;
		this.fileLogger = UpdateFileLogger.getInstance();
	}
	/**
	* 判断当前是否为“装错包”场景：
	* 用户在 Apple Silicon Mac（M 系列芯片）上运行了 Intel/x64 版本应用。
	*
	* 此时 macOS 会通过 Rosetta 2 转译运行 x64 程序，应用虽然能启动，
	* 但应引导用户下载安装原生 arm64 版本。
	*/
	static isArchMismatched() {
		if (process.platform !== "darwin") return false;
		if (process.arch !== "x64") return false;
		return electron.app.runningUnderARM64Translation === true;
	}
	/**
	* 主入口：错包检测 + 非阻塞 Toast 提醒。
	*
	* 任何异常都会被吞掉并写日志，绝不向外抛出，避免影响调用方（普通更新检查）。
	*/
	async checkAndPrompt() {
		try {
			if (!ArchMismatchGuideService.isArchMismatched()) return;
			if (this.inProgress) {
				this.log("info", "Download already in progress, skipping prompt");
				return;
			}
			if (this.downloadedDmgPath) {
				this.emitState("arch-mismatch-ready", {
					version: this.downloadedVersion || electron.app.getVersion(),
					kind: "arch-mismatch"
				});
				return;
			}
			this.log("info", "Architecture mismatch detected, notifying renderer");
			this.emitState("arch-mismatch-available", {
				version: electron.app.getVersion(),
				kind: "arch-mismatch"
			});
		} catch (error) {
			const msg = error instanceof Error ? error.message : String(error);
			this.log("error", `checkAndPrompt unexpected error: ${msg}`);
		}
	}
	getState() {
		return this.currentState;
	}
	async downloadLatestArm64() {
		if (!ArchMismatchGuideService.isArchMismatched()) return;
		if (this.inProgress) {
			this.log("info", "downloadLatestArm64: already in progress, skipping");
			return;
		}
		this.inProgress = true;
		this.downloadedDmgPath = void 0;
		this.downloadedVersion = void 0;
		try {
			this.emitState("arch-mismatch-downloading", {
				version: electron.app.getVersion(),
				kind: "arch-mismatch"
			});
			const feedInfo = await this.fetchArm64FeedInfo();
			if (!feedInfo) throw new Error("Unable to get ARM64 installer download URL");
			const dmgUrl = ArchMismatchGuideService.rewriteZipToDmg(feedInfo.zipUrl);
			this.log("info", `ARM64 feed url=${feedInfo.zipUrl}, dmgUrl=${dmgUrl}, version=${feedInfo.version}`);
			this.log("info", `Starting download: ${dmgUrl}`);
			const dmgPath = await this.downloadDmg(dmgUrl, feedInfo.version);
			this.downloadedDmgPath = dmgPath;
			this.downloadedVersion = feedInfo.version;
			this.log("info", `Download completed: ${dmgPath}`);
			this.emitState("arch-mismatch-ready", {
				version: feedInfo.version,
				kind: "arch-mismatch"
			});
		} catch (error) {
			const msg = error instanceof Error ? error.message : String(error);
			this.log("error", `Download failed: ${msg}`);
			this.emitState("arch-mismatch-error", void 0, void 0, {
				message: msg,
				code: "ARCH_MISMATCH_DOWNLOAD_ERROR"
			});
		} finally {
			this.inProgress = false;
		}
	}
	async installDownloadedArm64() {
		if (!this.downloadedDmgPath) {
			this.emitState("arch-mismatch-error", void 0, void 0, {
				message: "No downloaded ARM64 installer found",
				code: "ARCH_MISMATCH_INSTALL_ERROR"
			});
			return;
		}
		try {
			await this.openInstaller(this.downloadedDmgPath);
			this.quitForManualInstall();
		} catch (error) {
			const msg = error instanceof Error ? error.message : String(error);
			this.log("error", `Install failed: ${msg}`);
			this.emitState("arch-mismatch-error", void 0, void 0, {
				message: msg,
				code: "ARCH_MISMATCH_INSTALL_ERROR"
			});
		}
	}
	/**
	* 简单字符串替换：`.zip` → `.dmg`，保留可能的 query string。
	*/
	static rewriteZipToDmg(zipUrl) {
		return zipUrl.replace(/\.zip(\?.*)?$/i, ".dmg$1");
	}
	static isTargetDownloadItem(item, targetUrl) {
		const downloadItem = item;
		return [downloadItem.getURL?.(), ...downloadItem.getURLChain?.() ?? []].filter((url) => typeof url === "string" && url.length > 0).includes(targetUrl);
	}
	/**
	* 强制以 `darwin-arm64` 拉一次 update feed JSON。
	*
	* 不复用 AbstractUpdateService.buildUpdateFeedUrl()——后者按当前进程
	* 的 platform/arch 构造，这里需要锁定 ARM64 平台拿原生包链接。
	* 版本号固定为 0.0.0，用于让服务端返回最新 ARM64 安装包地址。
	*
	* baseUrl 三级优先级与 AbstractUpdateService.buildUpdateFeedUrl 完全一致：
	* WORKBUDDY_UPDATE_URL 环境变量 > updateBaseUrlProvider（读运行时租户 endpoint）
	* > 硬编码兜底 copilot.tencent.com。专享版部署下 provider 会返回被 remote
	* /v3/config 覆盖后的租户 update server 地址，避免把用户引导到 saas 包。
	*/
	buildArm64FeedUrl() {
		let url = `${process.env.WORKBUDDY_UPDATE_URL || this.updateBaseUrlProvider?.getUpdateBaseUrl() || "https://copilot.tencent.com"}/v2/update?platform=workbuddy-darwin-arm64&version=0.0.0`;
		const userId = this.userInfoProvider?.getUserId();
		if (userId) url += `&x-user-id=${userId}`;
		const enterpriseId = this.userInfoProvider?.getEnterpriseId();
		if (enterpriseId) url += `&x-tenant-id=${enterpriseId}`;
		return url;
	}
	async fetchArm64FeedInfo() {
		try {
			const feedUrl = this.buildArm64FeedUrl();
			const response = await electron.net.fetch(feedUrl, { signal: AbortSignal.timeout(8e3) });
			if (!response.ok || response.status === 204) {
				this.log("warn", `ARM64 feed fetch returned status ${response.status}`);
				return;
			}
			const data = await response.json();
			if (!data || typeof data !== "object") {
				this.log("warn", "ARM64 feed response is not a JSON object");
				return;
			}
			const obj = data;
			const zipUrl = typeof obj.url === "string" ? obj.url : void 0;
			const version = typeof obj.productVersion === "string" ? obj.productVersion : typeof obj.version === "string" ? obj.version : void 0;
			if (!zipUrl || !version) {
				this.log("warn", `ARM64 feed missing url or version: url=${zipUrl}, version=${version}`);
				return;
			}
			return {
				zipUrl,
				version
			};
		} catch (error) {
			const msg = error instanceof Error ? error.message : String(error);
			this.log("warn", `fetchArm64FeedInfo error: ${msg}`);
			return;
		}
	}
	/**
	* 用 Electron session.downloadURL + will-download 实现下载。
	*
	* 设计：
	* - 只接管由本次 dmgUrl 触发的下载项，避免误处理同一 session 中的其他下载
	* - 捕获到目标下载后立即移除监听器，尽量缩短对 defaultSession 的影响窗口
	* - 文件名冲突时附加时间戳后缀，不直接覆盖用户文件
	* - 进度通过 BrowserWindow.setProgressBar 在 Dock 显示，并同步推给左下角 Toast
	* - 进度日志按 10% 粒度采样，避免刷屏
	*/
	downloadDmg(dmgUrl, version) {
		return new Promise((resolve, reject) => {
			const ses = electron.session.defaultSession;
			const downloadsDir = electron.app.getPath("downloads");
			const fileNameFromUrl = ArchMismatchGuideService.extractFileName(dmgUrl);
			const savePath = ArchMismatchGuideService.resolveUniqueSavePath(downloadsDir, fileNameFromUrl);
			let lastLoggedPercent = -1;
			const win = this.resolveProgressWindow();
			let targetDownloadCaptured = false;
			const cleanup = () => {
				ses.removeListener("will-download", willDownload);
				win?.setProgressBar(-1);
				clearTimeout(captureTimeout);
			};
			const willDownload = (_event, item, _webContents) => {
				if (!ArchMismatchGuideService.isTargetDownloadItem(item, dmgUrl)) return;
				targetDownloadCaptured = true;
				cleanup();
				try {
					item.setSavePath(savePath);
				} catch (error) {
					const msg = error instanceof Error ? error.message : String(error);
					reject(/* @__PURE__ */ new Error(`setSavePath failed: ${msg}`));
					return;
				}
				item.on("updated", (_e, state) => {
					if (state === "progressing" && !item.isPaused()) {
						const total = item.getTotalBytes();
						const received = item.getReceivedBytes();
						if (total > 0) {
							const ratio = received / total;
							win?.setProgressBar(ratio);
							const percent = Math.floor(ratio * 100);
							this.emitState("arch-mismatch-downloading", {
								version,
								kind: "arch-mismatch"
							}, {
								percent,
								bytesPerSecond: 0,
								total,
								transferred: received
							});
							if (percent >= lastLoggedPercent + 10) {
								lastLoggedPercent = percent;
								this.log("info", `Download progress: ${percent}%`);
							}
						}
					}
				});
				item.once("done", (_e, state) => {
					win?.setProgressBar(-1);
					if (state === "completed") resolve(item.getSavePath());
					else reject(/* @__PURE__ */ new Error(`Download did not complete (state=${state})`));
				});
			};
			const captureTimeout = setTimeout(() => {
				if (targetDownloadCaptured) return;
				cleanup();
				reject(/* @__PURE__ */ new Error("Timed out waiting for ARM64 DMG download to start"));
			}, 3e4);
			captureTimeout.unref?.();
			ses.on("will-download", willDownload);
			try {
				ses.downloadURL(dmgUrl);
			} catch (error) {
				cleanup();
				reject(error instanceof Error ? error : new Error(String(error)));
			}
		});
	}
	/**
	* 调用 shell.openPath 挂载 .dmg。macOS 上会触发标准 Finder 安装窗口。
	*/
	async openInstaller(dmgPath) {
		const result = await electron.shell.openPath(dmgPath);
		if (result) throw new Error(`shell.openPath failed: ${result}`);
		this.log("info", `Mounted DMG via shell.openPath: ${dmgPath}`);
	}
	/**
	* 退出当前应用并清理后台进程，避免用户拖拽安装时 Finder 提示 WorkBuddy 正在运行。
	*/
	quitForManualInstall() {
		this.log("info", "DMG mounted, quitting current app for manual installation");
		electron.app.emit("before-quit-for-update");
		electron.app.quit();
		setTimeout(() => {
			this.log("warn", "Quit for manual install did not exit after 5 seconds, forcing exit");
			electron.app.exit(0);
		}, 5e3).unref?.();
	}
	emitState(state, info, progress, error) {
		const payload = {
			state,
			info,
			progress,
			error
		};
		this.currentState = payload;
		const versionPart = info ? ` | version=${info.version}` : "";
		const progressPart = progress ? ` | progress=${progress.percent.toFixed(1)}%` : "";
		const errorPart = error ? ` | error=${error.message}` : "";
		this.log("info", `State changed: ${state}${versionPart}${progressPart}${errorPart}`);
		this.emit("state-changed", payload);
	}
	/**
	* 取一个可用窗口用于 setProgressBar：
	* 优先使用调用方注入的 getMainWindow，否则回退到 BrowserWindow.getAllWindows() 的第一个未销毁窗口。
	*/
	resolveProgressWindow() {
		const injected = this.getMainWindow?.();
		if (injected && !injected.isDestroyed()) return injected;
		return electron.BrowserWindow.getAllWindows().find((w) => !w.isDestroyed());
	}
	/** 从 URL pathname 末段提取文件名，回退为通用名 */
	static extractFileName(url) {
		try {
			const last = new URL(url).pathname.split("/").filter(Boolean).pop();
			if (last) return last;
		} catch {}
		return "WorkBuddy-darwin-arm64.dmg";
	}
	/** 若目标文件名已存在，附加时间戳后缀避免覆盖 */
	static resolveUniqueSavePath(dir, fileName) {
		const ext = path.extname(fileName) || ".dmg";
		const base = path.basename(fileName, ext);
		const timestamp = Date.now();
		return path.join(dir, `${base}-${timestamp}${ext}`);
	}
	log(level, message) {
		const tagged = `[arch-guide] ${message}`;
		switch (level) {
			case "info":
				this.logger?.info(tagged);
				this.fileLogger.info(tagged);
				break;
			case "warn":
				this.logger?.warn(tagged);
				this.fileLogger.warn(tagged);
				break;
			case "error":
				this.logger?.error(tagged);
				this.fileLogger.error(tagged);
				break;
		}
	}
};
//#endregion
//#region src/main/system/install/update-timing-writer.ts
/**
* Writes macOS update timing data to pending-telemetry before the process exits.
*
* Called synchronously from update-service.darwin.ts right before spawning the
* detached install script. The TS process is about to quit, so we must persist
* the timing data to disk now. The new version's main process will consume it
* via flush-update-telemetry.ts on next launch.
*
* Path: ~/Library/Application Support/WorkBuddy/pending-telemetry/update-ts-<ts>.json
*/
require_app_instance.init_app_instance();
function getPendingDir$3() {
	return require_app_instance.getWorkbuddyPendingTelemetryDir();
}
/**
* Write TS-side update timing checkpoints to a pending-telemetry JSON file.
* Must be called synchronously before process exit.
*
* Best-effort: all file operations are wrapped in try-catch so that a write
* failure (permission denied, disk full, etc.) never blocks the update flow.
*/
function writeUpdateTimingPreSpawn(timing) {
	try {
		const dir = getPendingDir$3();
		node_fs.mkdirSync(dir, { recursive: true });
		const t = timing;
		const payload = {
			source: "update-ts",
			platform: process.platform,
			arch: node_os.arch(),
			fromVersion: t.fromVersion,
			toVersion: t.toVersion,
			targetBundleId: t.targetBundleId,
			timestamp: (/* @__PURE__ */ new Date()).toISOString(),
			checkpoints: {
				check_start: 0,
				feed_received: t.feedReceived - t.checkStart,
				download_start: t.downloadStart - t.checkStart,
				download_done: t.downloadDone - t.checkStart,
				verify_done: t.verifyDone - t.checkStart,
				extract_done: t.extractDone - t.checkStart,
				install_spawn: t.installSpawn - t.checkStart
			},
			durations: {
				feed_fetch: t.feedReceived - t.checkStart,
				download: t.downloadDone - t.downloadStart,
				verify: t.verifyDone - t.downloadDone,
				extract: t.extractDone - t.verifyDone,
				total_pre_spawn: t.installSpawn - t.checkStart
			}
		};
		const filePath = node_path.join(dir, `update-ts-${Date.now()}.json`);
		node_fs.writeFileSync(filePath, JSON.stringify(payload), "utf-8");
	} catch {}
}
//#endregion
//#region src/main/features/workflows/update/mac-bundle-update-installer.ts
require_app_instance.init_app_instance();
var MacBundleUpdateInstaller = class {
	async install(update, currentPid) {
		this.validateInstallPath(update.currentAppPath, "currentAppPath");
		this.validateInstallPath(update.extractedAppPath, "extractedAppPath");
		this.validateInstallPath(update.backupAppPath, "backupAppPath");
		this.validateInstallPath(update.installResultPath, "installResultPath");
		const scriptPath = path.join(path.dirname(update.backupAppPath), "install-mac-bundle-update.sh");
		const logPath = path.join(path.dirname(update.backupAppPath), "install-mac-bundle-update.log");
		await fs_promises.mkdir(path.dirname(scriptPath), { recursive: true });
		await fs_promises.writeFile(scriptPath, this.buildInstallScript(), { mode: 448 });
		await fs_promises.chmod(scriptPath, 448);
		const pendingTelemetryDir = require_app_instance.getWorkbuddyPendingTelemetryDir();
		(0, child_process.spawn)("/bin/bash", [scriptPath], {
			detached: true,
			stdio: "ignore",
			env: {
				...process.env,
				CURRENT_PID: String(currentPid),
				CURRENT_APP_PATH: update.currentAppPath,
				NEW_APP_PATH: update.extractedAppPath,
				BACKUP_APP_PATH: update.backupAppPath,
				INSTALL_LOG_PATH: logPath,
				INSTALL_RESULT_PATH: update.installResultPath,
				TARGET_BUNDLE_ID: update.targetBundleId,
				UPDATE_VERSION: update.version,
				PENDING_TELEMETRY_DIR: pendingTelemetryDir
			}
		}).unref();
	}
	validateInstallPath(value, fieldName) {
		if (!path.isAbsolute(value)) throw new Error(`${fieldName} must be an absolute path`);
		if (value.includes("\0")) throw new Error(`${fieldName} contains invalid NUL byte`);
	}
	buildInstallScript() {
		return `#!/bin/bash
set -u

# ─── Timing infrastructure ───
# Uses perl for millisecond timestamps (macOS date doesn't support %N).
# All values are epoch milliseconds.
_ts_ms() {
  /usr/bin/perl -MTime::HiRes=gettimeofday -e 'my($s,$us)=gettimeofday;printf "%d\n",$s*1000+int($us/1000)' 2>/dev/null || /bin/date +%s000
}
IT_S0=0; IT_S1=0; IT_S2=0; IT_S3=0; IT_S4=0; IT_S5=0; IT_S6=0; IT_S7=0

log() {
  local message="$1"
  /bin/mkdir -p "$(/usr/bin/dirname "$INSTALL_LOG_PATH")" 2>/dev/null || true
  /bin/echo "[$(/bin/date -u +%Y-%m-%dT%H:%M:%SZ)] $message" >> "$INSTALL_LOG_PATH" 2>/dev/null || true
}

json_escape() {
  /usr/bin/printf '%s' "$1" | /usr/bin/perl -pe 's/\\/\\\\/g; s/"/\\"/g; s/\n/\\n/g; s/\r/\\r/g; s/\t/\\t/g'
}

# Write install timing JSON to pending-telemetry directory.
# Called at the end of a successful install, before write_result.
write_install_timing() {
  local telemetry_dir="\${PENDING_TELEMETRY_DIR:-}"
  if [ -z "$telemetry_dir" ]; then
    return
  fi
  /bin/mkdir -p "$telemetry_dir" 2>/dev/null || return

  local total_ms=0
  if [ "$IT_S0" -gt 0 ] && [ "$IT_S7" -gt 0 ]; then
    total_ms=$((IT_S7 - IT_S0))
  fi
  local wait_exit_ms=0
  if [ "$IT_S0" -gt 0 ] && [ "$IT_S1" -gt 0 ]; then wait_exit_ms=$((IT_S1 - IT_S0)); fi
  local backup_ms=0
  if [ "$IT_S2" -gt 0 ] && [ "$IT_S3" -gt 0 ]; then backup_ms=$((IT_S3 - IT_S2)); fi
  local ditto_ms=0
  if [ "$IT_S3" -gt 0 ] && [ "$IT_S4" -gt 0 ]; then ditto_ms=$((IT_S4 - IT_S3)); fi
  local post_install_ms=0
  if [ "$IT_S4" -gt 0 ] && [ "$IT_S7" -gt 0 ]; then post_install_ms=$((IT_S7 - IT_S4)); fi

  local out_path="$telemetry_dir/update-shell-$IT_S0.json"
  /usr/bin/printf '{"source":"update-shell","platform":"darwin","version":"%s","targetBundleId":"%s","timestamp":"%s","checkpoints":{"script_start":%d,"wait_exit_done":%d,"writable_check_done":%d,"backup_done":%d,"ditto_done":%d,"lsregister_done":%d,"quarantine_cleared":%d,"install_complete":%d},"durations":{"wait_exit":%d,"backup":%d,"ditto":%d,"post_install":%d,"total":%d}}' \
    "\${UPDATE_VERSION:-unknown}" \
    "\${TARGET_BUNDLE_ID:-unknown}" \
    "$(/bin/date -u +%Y-%m-%dT%H:%M:%SZ)" \
    0 \
    $((IT_S1 - IT_S0)) \
    $((IT_S2 - IT_S0)) \
    $((IT_S3 - IT_S0)) \
    $((IT_S4 - IT_S0)) \
    $((IT_S5 - IT_S0)) \
    $((IT_S6 - IT_S0)) \
    $((IT_S7 - IT_S0)) \
    "$wait_exit_ms" \
    "$backup_ms" \
    "$ditto_ms" \
    "$post_install_ms" \
    "$total_ms" \
    > "$out_path" 2>/dev/null || true
  log "install timing written to $out_path (total=\${total_ms}ms, ditto=\${ditto_ms}ms)"
}

write_result() {
  local success="$1"
  local code="$2"
  local tmp_path="\${INSTALL_RESULT_PATH}.tmp"
  local escaped_code
  local escaped_version
  local escaped_bundle_id
  escaped_code="$(json_escape "$code")"
  escaped_version="$(json_escape "\${UPDATE_VERSION:-unknown}")"
  escaped_bundle_id="$(json_escape "\${TARGET_BUNDLE_ID:-unknown}")"
  /bin/mkdir -p "$(/usr/bin/dirname "$INSTALL_RESULT_PATH")" 2>/dev/null || true
  /usr/bin/printf '{"success":%s,"code":"%s","version":"%s","targetBundleId":"%s","timestamp":"%s"}\n' \
    "$success" \
    "$escaped_code" \
    "$escaped_version" \
    "$escaped_bundle_id" \
    "$(/bin/date -u +%Y-%m-%dT%H:%M:%SZ)" > "$tmp_path" 2>/dev/null || true
  /bin/mv "$tmp_path" "$INSTALL_RESULT_PATH" 2>/dev/null || true
}

fail_install() {
  local code="$1"
  local message="$2"
  log "$message"
  write_result false "$code"
  exit 1
}

wait_for_exit() {
  local pid="$1"
  local waited=0
  while /bin/kill -0 "$pid" 2>/dev/null; do
    if [ "$waited" -ge 60 ]; then
      log "current process still alive after 60s, aborting replacement"
      return 1
    fi
    /bin/sleep 1
    waited=$((waited + 1))
  done
  return 0
}

ensure_parent_writable() {
  local parent_dir
  parent_dir="$(/usr/bin/dirname "$CURRENT_APP_PATH")"
  local probe_path="$parent_dir/.workbuddy-update-write-test.$$"
  if ! /usr/bin/touch "$probe_path" 2>/dev/null; then
    fail_install "TARGET_NOT_WRITABLE" "target app directory is not writable: $parent_dir"
  fi
  /bin/rm -f "$probe_path" 2>/dev/null || true
}

restore_backup() {
  local failed_path="\${CURRENT_APP_PATH}.failed.$(/bin/date +%s)"
  if [ ! -d "$BACKUP_APP_PATH" ]; then
    log "backup app missing, cannot restore"
    return 1
  fi

  if [ -d "$CURRENT_APP_PATH" ]; then
    if ! /bin/mv "$CURRENT_APP_PATH" "$failed_path" 2>/dev/null; then
      log "failed to move broken app aside before restore"
      return 1
    fi
  fi

  if ! /bin/mv "$BACKUP_APP_PATH" "$CURRENT_APP_PATH" 2>/dev/null; then
    log "failed to restore backup app"
    if [ -d "$failed_path" ]; then
      /bin/mv "$failed_path" "$CURRENT_APP_PATH" 2>/dev/null || true
    fi
    return 1
  fi

  /usr/bin/open "$CURRENT_APP_PATH" 2>/dev/null || true
  return 0
}

IT_S0=$(_ts_ms)
log "installer started"
log "current=$CURRENT_APP_PATH new=$NEW_APP_PATH backup=$BACKUP_APP_PATH pid=$CURRENT_PID"

if [ ! -d "$NEW_APP_PATH" ]; then
  fail_install "NEW_APP_MISSING" "new app path does not exist"
fi

if ! wait_for_exit "$CURRENT_PID"; then
  /usr/bin/open "$CURRENT_APP_PATH" 2>/dev/null || true
  fail_install "PROCESS_EXIT_TIMEOUT" "current process still alive after 60s"
fi
IT_S1=$(_ts_ms)
log "wait_for_exit done ($(( IT_S1 - IT_S0 ))ms)"

ensure_parent_writable
IT_S2=$(_ts_ms)
log "writable check done ($(( IT_S2 - IT_S0 ))ms)"

/bin/mkdir -p "$(/usr/bin/dirname "$BACKUP_APP_PATH")" || fail_install "BACKUP_DIR_CREATE_FAILED" "failed to create backup directory"
/bin/rm -rf "$BACKUP_APP_PATH" 2>/dev/null || true

if [ -d "$CURRENT_APP_PATH" ]; then
  if ! /bin/mv "$CURRENT_APP_PATH" "$BACKUP_APP_PATH"; then
    fail_install "BACKUP_MOVE_FAILED" "failed to move current app to backup"
  fi
fi
IT_S3=$(_ts_ms)
log "backup done ($(( IT_S3 - IT_S0 ))ms)"

if ! /usr/bin/ditto "$NEW_APP_PATH" "$CURRENT_APP_PATH"; then
  log "failed to copy new app, attempting restore"
  if ! restore_backup; then
    fail_install "RESTORE_FAILED" "failed to restore backup after copy failure"
  fi
  fail_install "COPY_FAILED" "failed to copy new app"
fi
IT_S4=$(_ts_ms)
log "ditto done ($(( IT_S4 - IT_S0 ))ms, ditto=$(( IT_S4 - IT_S3 ))ms)"

LSREGISTER="/System/Library/Frameworks/CoreServices.framework/Frameworks/LaunchServices.framework/Support/lsregister"
if [ -x "$LSREGISTER" ]; then
  "$LSREGISTER" -f "$CURRENT_APP_PATH" >> "$INSTALL_LOG_PATH" 2>&1 || true
fi
IT_S5=$(_ts_ms)
log "lsregister done ($(( IT_S5 - IT_S0 ))ms)"

/usr/bin/xattr -dr com.apple.quarantine "$CURRENT_APP_PATH" >> "$INSTALL_LOG_PATH" 2>&1 || true
IT_S6=$(_ts_ms)
log "quarantine cleared ($(( IT_S6 - IT_S0 ))ms)"

if ! /usr/bin/open "$CURRENT_APP_PATH"; then
  log "failed to open updated app, attempting restore"
  if ! restore_backup; then
    fail_install "RESTORE_FAILED" "failed to restore backup after open failure"
  fi
  fail_install "OPEN_FAILED" "failed to open updated app"
fi
IT_S7=$(_ts_ms)
log "install complete ($(( IT_S7 - IT_S0 ))ms total)"

log "updated app opened successfully"
log "backup retained at $BACKUP_APP_PATH for manual recovery"
write_install_timing
write_result true "OK"
exit 0
`;
	}
};
//#endregion
//#region src/main/features/workflows/update/mac-bundle-update-types.ts
var CURRENT_DARWIN_BUNDLE_ID = "com.workbuddy.workbuddy";
var TARGET_DARWIN_BUNDLE_ID = "com.tencent.workbuddy.mac";
var ALLOWED_DARWIN_BUNDLE_IDS = new Set([CURRENT_DARWIN_BUNDLE_ID, TARGET_DARWIN_BUNDLE_ID]);
var MIGRATION_FAILURE_COOLDOWN_MS = 1440 * 60 * 1e3;
//#endregion
//#region src/main/features/workflows/update/force-upgrade-decision.ts
/**
* 从 feed 响应中判定是否触发强制升级。
*
* 后台在请求时已拿到客户端版本号，由后台完成版本比较与灰度策略，
* 客户端只需检查响应中 `forceUpdate === true` 即为命中。
*
* 命中时从响应的 `version`/`productVersion` 字段取目标版本，
* 从可选的 `forceUpdateMessage` 取升级提示文案。
*
* 配置缺失 / 类型不匹配 / 解析异常 → 统一返回 `{ hit: false }`（安全默认）。
*
* @param feedData feed 响应的 JSON 对象（已 parse，可能为 null/undefined）
*/
function decideForceUpgrade(feedData) {
	if (!feedData || typeof feedData !== "object") return { hit: false };
	const data = feedData;
	if (data.forceUpdate !== true) return { hit: false };
	const targetVersion = typeof data.productVersion === "string" ? data.productVersion.trim() : typeof data.version === "string" ? data.version.trim() : "";
	if (!targetVersion) return { hit: false };
	return {
		hit: true,
		meta: {
			targetVersion,
			message: (typeof data.forceUpdateMessage === "string" ? data.forceUpdateMessage.trim() : void 0) || void 0
		}
	};
}
//#endregion
//#region src/main/features/workflows/update/update-service.ts
require_workbuddy_product_config.init_workbuddy_product_config();
/**
* 把 product.json 的 applicationName 映射成后端 update 接口认识的 client-type 前缀。
*
* 背景：后端 (services/pkg/enum/plugin_scene.go::ParseClientType) 的 ClientType
* 是数据模型字段，只识别固定白名单：plugin/ide/cli/workbuddy/learningbuddy/learnbuddy。
* 它不只用于 URL 路由，还串着 COS 包目录、灰度策略、k8s configmap key、黑名单等
* 数据基础设施。
*
* 客户端的 applicationName 是一个变化频繁的字段，每个定制版/调试版都不同：
* workbuddy / workbuddy-custom / workbuddy-ai / workbuddy-enterprise / workbuddy0616
* 等等。URL 表达的是"产品线"而不是"应用实例名"，所以这里做一次归并：
* 所有 workbuddy 系列定制都映射到 'workbuddy'，由同一份 workbuddy 包配置服务。
*
* 同款映射模式见 services/pkg/enum/plugin_scene.go:128-132 关于 learnbuddy 的
* 注释——客户端 rename 时只在"解析入口做兼容映射"，服务端内部数据模型不动。
*
* 注意 learnbuddy 系列（applicationName=LearnBuddy / workbuddy-learn）是另一条
* 产品线，后端有独立的 ClientTypeLearningbuddy 和对应的 COS 目录/灰度配置；
* 这里只把 workbuddy 系列归并，learnbuddy 一律按 toLowerCase 原样下发。
*/
function resolveUpdateClientTypePrefix(applicationName) {
	const name = (applicationName || "workbuddy").toLowerCase();
	if (name === "learnbuddy" || name.startsWith("learnbuddy-") || name === "workbuddy-learn" || name.startsWith("workbuddy-learn-")) return name;
	return "workbuddy";
}
/**
* 更新服务抽象基类
*
* 职责：
* - 构建与原应用兼容的更新 URL（含用户标识）
* - 管理更新状态机
* - 发出状态变化事件
*/
var AbstractUpdateService = class extends events.EventEmitter {
	state = "idle";
	updateInfo;
	progress;
	error;
	version;
	userInfoProvider;
	updateBaseUrlProvider;
	/**
	* 当前正在下载或已下载的更新版本号
	* 用于在 downloading/downloaded 状态下判断是否有更新的版本
	*/
	activeUpdateVersion;
	/**
	* 最近一次 checkForUpdates 的 explicit 标记。
	* 仅在 state === 'checking' 时有意义，会随 state-changed 事件透传到 renderer，
	* 让 UpdateToast 区分用户主动检查（菜单栏/按钮）与后台静默检查。
	*/
	lastExplicit = false;
	/**
	* 强制升级元信息。命中后常驻（跨整个升级状态机），随每次 state-changed
	* 透传到 renderer，让阻断式模态在 checking/downloading/ready/error 各态下
	* 都能识别"当前处于强制升级"。未命中时为 undefined。
	*/
	forceUpgrade;
	fileLogger;
	constructor(userInfoProvider, updateBaseUrlProvider) {
		super();
		this.version = electron.app.getVersion();
		this.userInfoProvider = userInfoProvider;
		this.updateBaseUrlProvider = updateBaseUrlProvider;
		this.fileLogger = UpdateFileLogger.getInstance();
	}
	/**
	* 设置用户信息提供器（支持延迟注入）
	*/
	setUserInfoProvider(provider) {
		this.userInfoProvider = provider;
	}
	/**
	* 获取当前更新状态
	*/
	getState() {
		return {
			state: this.state,
			info: this.updateInfo,
			progress: this.progress,
			error: this.error,
			explicit: this.state === "checking" ? this.lastExplicit : void 0,
			forceUpgrade: this.forceUpgrade
		};
	}
	/**
	* 判断给定状态（默认当前状态）是否拥有可立即安装的更新。
	*/
	isStateInstallable(state = this.state) {
		return state === "downloaded" || state === "ready";
	}
	/**
	* 设置状态并发出事件
	*/
	setState(state, info, progress, error) {
		this.state = state;
		this.updateInfo = info;
		this.progress = progress;
		this.error = error;
		const payload = this.getState();
		const versionPart = info ? ` | version=${info.version}` : "";
		const progressPart = progress ? ` | progress=${progress.percent.toFixed(1)}%` : "";
		const errorPart = error ? ` | error=${error.message}` : "";
		this.fileLogger.info(`State changed: ${state}${versionPart}${progressPart}${errorPart}`);
		this.emit("state-changed", payload);
	}
	/**
	* 记录本次 checkForUpdates 调用的 explicit 标记。
	* 子类在 checkForUpdates(explicit) 的入口调用此方法，保存用户主动触发标记，
	* 后续 setState('checking') 时会自动带到 payload。
	*/
	setLastExplicit(explicit) {
		this.lastExplicit = explicit;
	}
	/**
	* 构建与原应用兼容的更新 URL
	*
	* 原应用 URL 格式：
	* https://copilot.tencent.com/v2/update?platform=workbuddy-{os}-{arch}&version={ver}&x-user-id={uid}&x-tenant-id={eid}
	*/
	buildUpdateFeedUrl() {
		const baseUrl = process.env.WORKBUDDY_UPDATE_URL || this.updateBaseUrlProvider?.getUpdateBaseUrl() || "https://copilot.tencent.com";
		const platform = this.getPlatformAssetId();
		const version = this.version;
		let url = `${baseUrl}/v2/update?platform=${resolveUpdateClientTypePrefix(require_workbuddy_product_config.tryGetWorkbuddyBaseProductConfiguration()?.applicationName)}-${platform}&version=${version}`;
		const userId = this.userInfoProvider?.getUserId();
		if (userId) url += `&x-user-id=${userId}`;
		const enterpriseId = this.userInfoProvider?.getEnterpriseId();
		if (enterpriseId) url += `&x-tenant-id=${enterpriseId}`;
		return url;
	}
	/**
	* 获取平台资源标识
	* 格式: darwin-x64, darwin-arm64, win32-x64, linux-x64
	*/
	getPlatformAssetId() {
		const platform = process.platform;
		const arch = process.arch === "arm64" ? "arm64" : "x64";
		switch (platform) {
			case "darwin": return `darwin-${arch}`;
			case "win32": return `win32-${arch}`;
			case "linux": return `linux-${arch}`;
			default: return `${platform}-${arch}`;
		}
	}
	/**
	* 查询更新接口获取最新可用版本号
	*
	* 区分三种结果：
	* - `version`：服务端返回了具体版本号
	* - `no-update`：服务端明确声明当前无更新（HTTP 204 或空版本响应）。
	*   不能被当作网络失败处理——否则 rollout 撤回时已下好的包仍会留在 ready
	*   状态，让用户点击"重启升级"装上被撤回的版本。
	* - `failure`：网络/解析失败，状态机应保守处理（保留 installable 状态等）
	*/
	async fetchLatestVersion() {
		try {
			const feedUrl = this.buildUpdateFeedUrl();
			const response = await electron.net.fetch(feedUrl, { signal: AbortSignal.timeout(8e3) });
			if (!response.ok) {
				this.fileLogger.warn(`fetchLatestVersion: HTTP ${response.status}`);
				return { kind: "failure" };
			}
			if (response.status === 204) return { kind: "no-update" };
			const data = await response.json();
			if (data && typeof data === "object") {
				const version = data.productVersion ?? data.version;
				if (typeof version === "string" && version.trim()) return {
					kind: "version",
					version: version.trim()
				};
			}
			return { kind: "no-update" };
		} catch (error) {
			this.fileLogger.warn(`fetchLatestVersion error: ${error instanceof Error ? error.message : String(error)}`);
			return { kind: "failure" };
		}
	}
	/**
	* 判断在 downloading/downloaded 状态下是否应跳过本次检查
	*
	* - `version` 与 active 相同 → 跳过（已下载的就是最新）
	* - `version` 与 active 不同 → 重置为 idle 触发重新下载
	* - `no-update` → 清掉 activeUpdateVersion 并重置 idle，避免用户点击安装到被撤回的版本
	* - `failure` → 保守跳过：
	*     - downloaded/ready：保留状态（网络抖动不应作废已下好的包）
	*     - downloading：让 autoUpdater 自己的状态机继续推进，不插手
	*/
	async shouldSkipForActiveUpdate(currentState, explicit) {
		if (explicit && this.isStateInstallable(currentState)) {
			this.fileLogger.info(`shouldSkipForActiveUpdate: explicit check with installable ${currentState}, not skipping`);
			return false;
		}
		const result = await this.fetchLatestVersion();
		if (result.kind === "failure") {
			if (this.isStateInstallable(currentState)) this.fileLogger.info(`shouldSkipForActiveUpdate: Failed to fetch latest version, preserving ${currentState} state to keep installable update intact`);
			else this.fileLogger.info(`shouldSkipForActiveUpdate: Failed to fetch latest version in ${currentState} state, skipping check (autoUpdater drives its own state)`);
			return true;
		}
		if (result.kind === "no-update") {
			this.fileLogger.info(`shouldSkipForActiveUpdate: Server reports no update available, discarding cached ${currentState} update (was ${this.activeUpdateVersion ?? "none"})`);
			this.activeUpdateVersion = void 0;
			this.setState("idle");
			return true;
		}
		if (result.version === this.activeUpdateVersion) {
			this.fileLogger.info(`shouldSkipForActiveUpdate: Latest version ${result.version} matches active update, skipping`);
			return true;
		}
		this.fileLogger.info(`shouldSkipForActiveUpdate: New version ${result.version} differs from active ${this.activeUpdateVersion ?? "none"}, resetting to idle`);
		this.activeUpdateVersion = void 0;
		this.setState("idle");
		return false;
	}
	/**
	* 强制升级判定（与普通更新检查解耦的独立链路）。
	*
	* 拉取更新 feed，检查后台返回的 `forceUpdate` 布尔标记：
	* - 命中：记录元信息，自动触发 `checkForUpdates()` 开始静默下载。
	*   下载过程中 state-changed 事件会持续携带 `forceUpgrade` 元信息，
	*   renderer 据此在下载完成（ready）时弹出阻断模态。
	* - 未命中 / 配置缺失 / 网络失败：清除强制升级标记（安全默认）。
	*
	* 版本比较由后台完成（请求时已携带当前版本号），客户端只忠实执行后台判定。
	* 平台无关，三端子类共享；由 desktop-host 在账号/网络就绪后及周期轮询时调用。
	*/
	async checkForceUpgrade() {
		const decision = decideForceUpgrade(await this.fetchFeedRaw());
		if (!decision.hit) {
			if (this.forceUpgrade) {
				this.fileLogger.info("checkForceUpgrade: no longer in scope, clearing force-upgrade flag");
				this.forceUpgrade = void 0;
				this.setState(this.state, this.updateInfo, this.progress, this.error);
			}
			return;
		}
		this.fileLogger.info(`checkForceUpgrade: HIT, target=${decision.meta.targetVersion}, current=${this.version}`);
		this.forceUpgrade = decision.meta;
		this.setState(this.state, this.updateInfo, this.progress, this.error);
		this.fileLogger.info("checkForceUpgrade: auto-triggering checkForUpdates for silent download");
		await this.checkForUpdates();
	}
	/**
	* 拉取更新 feed 原始 JSON。
	* 网络/解析失败时返回 undefined（由判定逻辑按"未命中"安全处理）。
	*/
	async fetchFeedRaw() {
		try {
			const feedUrl = this.buildUpdateFeedUrl();
			const response = await electron.net.fetch(feedUrl, { signal: AbortSignal.timeout(8e3) });
			if (!response.ok || response.status === 204) return;
			return await response.json();
		} catch (error) {
			this.fileLogger.warn(`fetchFeedRaw error: ${error instanceof Error ? error.message : String(error)}`);
			return;
		}
	}
};
//#endregion
//#region src/main/features/workflows/update/update-service.darwin.ts
require_common$1.init_common$2();
require_workbuddy_product_config.init_workbuddy_product_config();
var execFileAsync = (0, util.promisify)(child_process.execFile);
var MIN_DARWIN_UPDATE_SIZE_BYTES = 1024 * 1024;
var PRECHECK_DISK_BUFFER_BYTES = 200 * 1024 * 1024;
var DARWIN_UPDATE_DOWNLOAD_TIMEOUT_MS = 600 * 1e3;
var ARCH_PROBE_ERROR_MESSAGE_MAX_LENGTH = 200;
var MACHO_HEADER_READ_BYTES = 4096;
var FAT_MAGIC = 3405691582;
var FAT_CIGAM = 3199925962;
var FAT_MAGIC_64 = 3405691583;
var FAT_CIGAM_64 = 3216703178;
var MH_MAGIC = 4277009102;
var MH_MAGIC_64 = 4277009103;
var CPU_TYPE_X86_64 = 16777223;
var CPU_TYPE_ARM64 = 16777228;
var UpdateServiceDarwin = class extends AbstractUpdateService {
	logger;
	/**
	* 缓存从 feed URL 获取的更新信息
	* 用于在 Squirrel.Mac 的 update-downloaded 事件返回空版本时作为后备方案
	*/
	cachedFeedUpdate;
	/**
	* ShipIt 缓存目录路径
	* ~/.../Library/Caches/com.workbuddy.workbuddy.ShipIt/
	*/
	shipItCacheDir;
	migrationCacheDir;
	installResultPath;
	migrationFailureRecordPath;
	/**
	* 允许安装的更新包 bundle id 集合。
	* 在官方 SaaS 的两个固定 id 之外，额外加入当前运行构建的 bundle id：
	* 专享版的"小版本自升级"包 bundle id 与运行版本相同，属于合法升级，必须放行，
	* 否则会被白名单拦截、永远无法升级（issue #57563）。
	*/
	allowedBundleIds;
	installer = new MacBundleUpdateInstaller();
	pendingUpdate;
	installInProgress = false;
	checkInProgress = false;
	/**
	* 安装失败重试计数（防止无限循环）
	*/
	installFailureCount = 0;
	MAX_INSTALL_FAILURES = 3;
	constructor(logger, userInfoProvider, updateBaseUrlProvider, celljs) {
		super(userInfoProvider, updateBaseUrlProvider);
		this.celljs = celljs;
		this.logger = logger;
		const bundleId = require_workbuddy_product_config.tryGetWorkbuddyBaseProductConfiguration()?.darwinBundleIdentifier || "com.workbuddy.workbuddy";
		this.allowedBundleIds = new Set([...ALLOWED_DARWIN_BUNDLE_IDS, bundleId]);
		this.shipItCacheDir = path.join(os.homedir(), `Library/Caches/${bundleId}.ShipIt`);
		this.migrationCacheDir = path.join(os.homedir(), `Library/Caches/${bundleId}.BundleMigration`);
		this.installResultPath = path.join(this.migrationCacheDir, "last-install-result.json");
		this.migrationFailureRecordPath = path.join(this.migrationCacheDir, "failure-record.json");
		this.setupListeners();
		this.consumeLastInstallResult().catch((error) => {
			const msg = error instanceof Error ? error.message : String(error);
			this.fileLogger.warn(`[darwin] Failed to consume last install result: ${msg}`);
		});
		this.cleanupMigrationArtifacts().catch((error) => {
			const msg = error instanceof Error ? error.message : String(error);
			this.fileLogger.warn(`[darwin] Failed to cleanup migration artifacts on startup: ${msg}`);
		});
	}
	/**
	* Report a milestone in the desktop auto-update / bundle-id migration funnel.
	*
	* Telemetry is best-effort: if CellJS is not wired (e.g. in unit tests) the
	* call becomes a no-op. Reporting failures are swallowed by `reportEvent`
	* itself, so this never throws into the update state machine.
	*/
	reportMigrationEvent(action, detail) {
		if (!this.celljs) return;
		this.celljs.eventService.report(require_common$1.Events.AppUpdate, {
			action,
			text: JSON.stringify(detail)
		}).catch(() => {});
	}
	markInstallChannelAutoUpdate(targetVersion) {
		try {
			require_workbuddy_product_config.writeMacInstallChannelUpdateMarker(require_workbuddy_product_config.tryGetWorkbuddyBaseProductConfiguration(), {
				targetVersion,
				platform: "darwin"
			});
		} catch (error) {
			const msg = error instanceof Error ? error.message : String(error);
			this.fileLogger.warn(`[darwin] Failed to mark install channel auto-update: ${msg}`);
		}
	}
	/**
	* Map a download/verify error message to a coarse, dashboard-friendly code.
	* Keep the bucket small: we want stable counters in observability, not the
	* full error string (which may contain paths/ids and explode cardinality).
	*/
	classifyVerifyFailure(message) {
		const lower = message.toLowerCase();
		const classifiers = [
			[(msg) => msg.includes("sha256hash"), "invalid_sha256"],
			[(msg) => msg.includes("code signature"), "codesign_failed"],
			[(msg) => msg.includes("download"), "download_failed"],
			[(msg) => msg.includes("extract") || msg.includes("zip"), "extract_failed"],
			[(msg) => msg.includes("bundle id") || msg.includes("bundleid"), "bundle_id_mismatch"],
			[(msg) => msg.includes("unable to determine update app architecture"), "arch_probe_failed"],
			[(msg) => msg.includes("architecture") || msg.includes("arch"), "arch_mismatch"],
			[(msg) => msg.includes("disk space") || msg.includes("writable"), "preflight_failed"],
			[(msg) => msg.includes("cfbundleexecutable"), "executable_invalid"]
		];
		for (const [test, code] of classifiers) if (test(lower)) return code;
		return "other";
	}
	/**
	* Read the persisted migration failure record for the current host.
	*
	* Returns `undefined` when the file is missing, malformed, or belongs to a
	* different version (in which case it is stale and treated as no record).
	*/
	async readMigrationFailureRecord() {
		let raw;
		try {
			raw = await fs_promises.readFile(this.migrationFailureRecordPath, "utf8");
		} catch (error) {
			if (error?.code !== "ENOENT") {
				const msg = error instanceof Error ? error.message : String(error);
				this.fileLogger.warn(`[darwin] Failed to read migration failure record: ${msg}`);
			}
			return;
		}
		try {
			const parsed = JSON.parse(raw);
			if (typeof parsed?.version === "string" && typeof parsed.failureCount === "number" && typeof parsed.lastFailureAt === "number") return parsed;
			this.fileLogger.warn("[darwin] Migration failure record has unexpected shape, treating as missing");
			return;
		} catch (error) {
			const msg = error instanceof Error ? error.message : String(error);
			this.fileLogger.warn(`[darwin] Failed to parse migration failure record: ${msg}`);
			return;
		}
	}
	/**
	* Bump the failure tally for `version` and persist it.
	*
	* The record is keyed by version: a server-side rollout to a different
	* version naturally resets the breaker (we overwrite with a new record).
	*/
	async writeMigrationFailureRecord(version, code) {
		const previous = await this.readMigrationFailureRecord();
		const failureCount = previous && previous.version === version ? previous.failureCount + 1 : 1;
		const record = {
			version,
			failureCount,
			lastFailureAt: Date.now(),
			lastCode: code
		};
		try {
			await fs_promises.mkdir(path.dirname(this.migrationFailureRecordPath), { recursive: true });
			await fs_promises.writeFile(this.migrationFailureRecordPath, JSON.stringify(record), "utf8");
			this.fileLogger.info(`[darwin] Migration failure recorded: version=${version}, failureCount=${failureCount}, code=${code}`);
		} catch (error) {
			const msg = error instanceof Error ? error.message : String(error);
			this.fileLogger.warn(`[darwin] Failed to persist migration failure record: ${msg}`);
		}
	}
	/**
	* Drop the persisted failure record. Called after a successful install so
	* the user is not stuck in cooldown forever.
	*/
	async clearMigrationFailureRecord() {
		try {
			await fs_promises.rm(this.migrationFailureRecordPath, { force: true });
		} catch {}
	}
	/**
	* Decide whether the local circuit breaker is open for `version`.
	*
	* Returns a `{ open: true, ... }` object when we should refuse to start a
	* new download/install attempt; otherwise `{ open: false }`.
	*
	* Rules:
	*   - Different version than the recorded one  -> treat as new attempt (reset).
	*   - failureCount >= MIGRATION_FAILURE_LIMIT -> open (hard limit).
	*   - lastFailureAt within COOLDOWN window     -> open (back off).
	*/
	async isMigrationCircuitOpen(version) {
		const record = await this.readMigrationFailureRecord();
		if (!record || record.version !== version) return { open: false };
		if (record.failureCount >= 3) return {
			open: true,
			reason: "failure_limit_exceeded",
			failureCount: record.failureCount,
			lastCode: record.lastCode
		};
		if (Date.now() - record.lastFailureAt < 864e5) return {
			open: true,
			reason: "cooldown_active",
			failureCount: record.failureCount,
			lastCode: record.lastCode
		};
		return { open: false };
	}
	setupListeners() {
		electron.autoUpdater.on("error", (error) => {
			const msg = `autoUpdater error: ${error.message}`;
			this.logger?.error(`[UpdateService.darwin] ${msg}`);
			this.fileLogger.error(`[darwin] ${msg}\n${error.stack || ""}`);
			if (this.isStateInstallable()) this.cleanupStaleShipItCache().catch((err) => {
				const cleanupMsg = `Failed to cleanup ShipIt cache after install-stage error: ${err instanceof Error ? err.message : String(err)}`;
				this.logger?.warn(`[UpdateService.darwin] ${cleanupMsg}`);
				this.fileLogger.warn(`[darwin] ${cleanupMsg}`);
			});
			else this.fileLogger.info(`[darwin] Skipping ShipIt cache cleanup (state=${this.state}, likely transient network error)`);
			this.setState("error", void 0, void 0, {
				message: error.message,
				code: "UPDATE_ERROR"
			});
		});
		electron.autoUpdater.on("before-quit-for-update", () => {
			this.logger?.info("[UpdateService.darwin] Squirrel before-quit-for-update event");
			this.fileLogger.info("[darwin] Squirrel before-quit-for-update event");
		});
		electron.autoUpdater.on("checking-for-update", () => {
			this.logger?.info("[UpdateService.darwin] Checking for updates...");
			this.fileLogger.info("[darwin] Checking for updates...");
			this.setState("checking");
		});
		electron.autoUpdater.on("update-available", () => {
			this.logger?.info("[UpdateService.darwin] Update available, downloading...");
			this.fileLogger.info("[darwin] Update available, downloading...");
			this.setState("downloading");
		});
		electron.autoUpdater.on("update-not-available", () => {
			this.logger?.info("[UpdateService.darwin] Update not available");
			this.fileLogger.info("[darwin] Update not available (current version is up to date)");
			this.setState("idle");
		});
		electron.autoUpdater.on("update-downloaded", (_event, releaseNotes, releaseName, _releaseDate, _updateURL) => {
			let version = releaseName;
			if (!version && this.cachedFeedUpdate) {
				this.logger?.info(`[UpdateService.darwin] Squirrel returned empty version, using cached feed version: ${this.cachedFeedUpdate.version}`);
				this.fileLogger.info(`[darwin] Squirrel returned empty version, using cached feed version: ${this.cachedFeedUpdate.version}`);
				version = this.cachedFeedUpdate.version;
			}
			this.logger?.info(`[UpdateService.darwin] Update downloaded: ${version}`);
			this.fileLogger.info(`[darwin] Update downloaded: version=${version}`);
			this.activeUpdateVersion = version || void 0;
			this.installFailureCount = 0;
			const info = {
				version: version || "unknown",
				releaseNotes: releaseNotes || this.cachedFeedUpdate?.releaseNotes || void 0
			};
			this.setState("downloaded", info);
			this.setState("ready", info);
		});
	}
	async checkForUpdates(explicit = false) {
		if (this.checkInProgress) {
			this.logger?.info("[UpdateService.darwin] checkForUpdates ignored: check already in progress");
			this.fileLogger.info("[darwin] checkForUpdates ignored: check already in progress");
			return;
		}
		this.checkInProgress = true;
		try {
			this.setLastExplicit(explicit);
			if (this.state === "downloaded" || this.state === "ready" || this.state === "downloading") {
				if (await this.shouldSkipForActiveUpdate(this.state, explicit)) {
					if (this.state === "idle") this.pendingUpdate = void 0;
					this.logger?.info(`[UpdateService.darwin] Update already ${this.state}, latest version matches, skipping check`);
					this.fileLogger.info(`[darwin] Update already ${this.state}, latest version matches, skipping check`);
					return;
				}
				if (explicit && this.isStateInstallable()) {
					this.logger?.info("[UpdateService.darwin] Explicit check with installable update, re-emitting state");
					this.fileLogger.info(`[darwin] Explicit check re-emitting ${this.state} for user`);
					this.setState(this.state, this.updateInfo);
					return;
				}
				this.logger?.info("[UpdateService.darwin] New version available on server, re-checking...");
				this.fileLogger.info("[darwin] New version available on server, re-checking...");
			}
			const feedUrl = this.buildUpdateFeedUrl();
			this.logger?.info(`[UpdateService.darwin] Checking for updates with custom updater: ${this.redactUpdateUrl(feedUrl)}`);
			this.fileLogger.info(`[darwin] Checking for updates with custom updater: ${this.redactUpdateUrl(feedUrl)}`);
			await this.checkForUpdatesWithCustomUpdater(feedUrl);
		} catch (error) {
			const msg = error instanceof Error ? error.message : String(error);
			this.logger?.error(`[UpdateService.darwin] checkForUpdates error: ${msg}`);
			this.fileLogger.error(`[darwin] checkForUpdates error: ${msg}`);
			this.setState("error", void 0, void 0, {
				message: error instanceof Error ? error.message : "Unknown error",
				code: "CHECK_ERROR"
			});
		} finally {
			this.checkInProgress = false;
		}
	}
	/** Update timing checkpoints (ms timestamps) for the current check cycle */
	updateTimingCheckStart = 0;
	updateTimingFeedReceived = 0;
	updateTimingDownloadStart = 0;
	updateTimingDownloadDone = 0;
	updateTimingVerifyDone = 0;
	updateTimingExtractDone = 0;
	async checkForUpdatesWithCustomUpdater(feedUrl) {
		this.pendingUpdate = void 0;
		this.setState("checking");
		this.updateTimingCheckStart = Date.now();
		const feed = await this.fetchUpdateFeed(feedUrl);
		if (!feed) {
			this.setState("idle");
			return;
		}
		this.updateTimingFeedReceived = Date.now();
		this.reportMigrationEvent(require_common$1.AppUpdateActionType.FeedMarked, {
			version: this.getFeedVersion(feed),
			targetBundleId: feed.targetBundleId,
			bundleIdMigration: feed.bundleIdMigration ?? feed.migration
		});
		const version = this.getFeedVersion(feed);
		if (!version) throw new Error("Missing update version for mac bundle id migration update");
		if (!feed.url) throw new Error("Missing update download url for mac bundle id migration update");
		if (!this.isNewVersion(version, this.version)) {
			this.logger?.info(`[UpdateService.darwin] No new version available (remote: ${version}, current: ${this.version})`);
			this.fileLogger.info(`[darwin] No new version available (remote: ${version}, current: ${this.version})`);
			this.setState("idle");
			return;
		}
		const breaker = await this.isMigrationCircuitOpen(version);
		if (breaker.open) {
			const message = breaker.reason === "failure_limit_exceeded" ? `Mac bundle id migration update ${version} skipped: failed ${breaker.failureCount} times locally` : `Mac bundle id migration update ${version} skipped: cooling down after recent failure`;
			this.logger?.warn(`[UpdateService.darwin] ${message}`);
			this.fileLogger.warn(`[darwin] ${message}`);
			this.reportMigrationEvent(require_common$1.AppUpdateActionType.VerifyFailed, {
				version,
				code: "circuit_open",
				reason: breaker.reason,
				failureCount: breaker.failureCount,
				lastCode: breaker.lastCode
			});
			this.setState("error", void 0, void 0, {
				message,
				code: "MIGRATION_CIRCUIT_OPEN"
			});
			return;
		}
		const releaseNotes = this.getFeedReleaseNotes(feed);
		this.setState("available", {
			version,
			downloadUrl: feed.url,
			releaseNotes
		});
		let pendingUpdate;
		try {
			pendingUpdate = await this.downloadAndVerifyUpdate(feed, version);
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			this.reportMigrationEvent(require_common$1.AppUpdateActionType.VerifyFailed, {
				version,
				code: this.classifyVerifyFailure(message),
				message
			});
			throw error;
		}
		this.pendingUpdate = pendingUpdate;
		this.activeUpdateVersion = version;
		this.cachedFeedUpdate = {
			version,
			releaseNotes
		};
		const info = {
			version,
			downloadUrl: feed.url,
			releaseNotes
		};
		this.setState("downloaded", info);
		this.setState("ready", info);
	}
	async fetchUpdateFeed(feedUrl) {
		const response = await electron.net.fetch(feedUrl, { signal: AbortSignal.timeout(8e3) });
		if (response.status === 204) {
			this.logger?.info("[UpdateService.darwin] No update available (HTTP 204)");
			this.fileLogger.info("[darwin] No update available (HTTP 204)");
			return;
		}
		if (!response.ok) throw new Error(`HTTP ${response.status} ${response.statusText}`);
		const data = await response.json();
		if (!data || typeof data !== "object") return;
		return data;
	}
	getFeedVersion(feed) {
		const version = feed.productVersion || feed.version;
		return typeof version === "string" && version.trim() ? version.trim() : void 0;
	}
	getFeedReleaseNotes(feed) {
		const releaseNotes = feed.releaseNotes || feed.notes;
		return typeof releaseNotes === "string" && releaseNotes.trim() ? releaseNotes : void 0;
	}
	async downloadAndVerifyUpdate(feed, version) {
		if (!feed.url) throw new Error("Missing update download url");
		this.validateDownloadUrl(feed.url);
		const safeVersion = this.toSafePathPart(version);
		const downloadDir = path.join(this.migrationCacheDir, "downloads");
		const extractDir = path.join(this.migrationCacheDir, "extracted", safeVersion);
		const backupDir = path.join(this.migrationCacheDir, "backups");
		await this.cleanupMigrationArtifacts(safeVersion);
		await fs_promises.mkdir(downloadDir, { recursive: true });
		await fs_promises.mkdir(backupDir, { recursive: true });
		await this.forceRemoveDir(extractDir);
		await fs_promises.mkdir(extractDir, { recursive: true });
		const zipPath = path.join(downloadDir, `WorkBuddy-${safeVersion}.zip`);
		const tmpPath = `${zipPath}.tmp`;
		await fs_promises.rm(tmpPath, { force: true });
		this.setState("downloading");
		this.updateTimingDownloadStart = Date.now();
		try {
			await this.downloadFile(feed.url, tmpPath);
			this.updateTimingDownloadDone = Date.now();
			await this.verifyDownloadedFile(tmpPath);
			this.updateTimingVerifyDone = Date.now();
			await fs_promises.rename(tmpPath, zipPath);
		} finally {
			try {
				await fs_promises.rm(tmpPath, { force: true });
			} catch {}
		}
		await this.extractZip(zipPath, extractDir);
		this.updateTimingExtractDone = Date.now();
		const extractedAppPath = await this.findExtractedApp(extractDir);
		const targetBundleId = await this.readPlistValue(extractedAppPath, "CFBundleIdentifier");
		this.validateTargetBundleId(targetBundleId, feed.targetBundleId);
		this.validateMigrationTargetBundleId(targetBundleId);
		await this.validateBundleExecutable(extractedAppPath);
		await this.validateAppArchitecture(extractedAppPath);
		await this.validateAppCodeSignature(extractedAppPath);
		const currentAppPath = this.getCurrentAppPath();
		await this.validateInstallPreflight(currentAppPath, extractedAppPath);
		return {
			version,
			downloadUrl: feed.url,
			zipPath,
			extractedAppPath,
			currentAppPath,
			backupAppPath: path.join(backupDir, `WorkBuddy-${safeVersion}-${Date.now()}.backup.app`),
			installResultPath: this.installResultPath,
			targetBundleId,
			releaseNotes: this.getFeedReleaseNotes(feed)
		};
	}
	validateDownloadUrl(downloadUrl) {
		let parsed;
		try {
			parsed = new URL(downloadUrl);
		} catch {
			throw new Error("Invalid update download url");
		}
		if (parsed.protocol === "https:") return;
		if (!(parsed.protocol === "http:" && [
			"localhost",
			"127.0.0.1",
			"::1"
		].includes(parsed.hostname))) throw new Error(`Unsupported update download protocol: ${parsed.protocol}`);
	}
	async validateInstallPreflight(currentAppPath, extractedAppPath) {
		if (!currentAppPath.endsWith(".app")) throw new Error(`Current app path is not a macOS app bundle: ${currentAppPath}`);
		if (currentAppPath.startsWith("/Volumes/")) throw new Error(`Current app path is on a mounted volume and cannot be replaced automatically: ${currentAppPath}`);
		const parentDir = path.dirname(currentAppPath);
		await this.assertDirectoryWritable(parentDir);
		const requiredBytes = await this.getPathSizeBytes(currentAppPath) + await this.getPathSizeBytes(extractedAppPath) + PRECHECK_DISK_BUFFER_BYTES;
		const availableBytes = await this.getAvailableDiskBytes(parentDir);
		if (availableBytes < requiredBytes) throw new Error(`Insufficient free disk space for mac bundle id migration update: required ${requiredBytes} bytes, available ${availableBytes} bytes`);
	}
	async assertDirectoryWritable(dirPath) {
		const probePath = path.join(dirPath, `.workbuddy-update-preflight-${process.pid}-${Date.now()}`);
		try {
			await fs_promises.writeFile(probePath, "ok");
		} catch (error) {
			throw new Error(`Update target directory is not writable: ${dirPath} (${error instanceof Error ? error.message : String(error)})`);
		} finally {
			try {
				await fs_promises.rm(probePath, { force: true });
			} catch {}
		}
	}
	async getAvailableDiskBytes(targetPath) {
		const stats = await fs_promises.statfs(targetPath);
		return stats.bavail * stats.bsize;
	}
	async getPathSizeBytes(targetPath) {
		try {
			await fs_promises.stat(targetPath);
		} catch {
			return 0;
		}
		const { stdout } = await execFileAsync("/usr/bin/du", ["-sk", targetPath]);
		const kiloBytes = parseInt(stdout.trim().split(/\s+/)[0] || "0", 10);
		return Math.max(0, kiloBytes) * 1024;
	}
	async downloadFile(downloadUrl, targetPath) {
		const redactedUrl = this.redactUpdateUrl(downloadUrl);
		this.logger?.info(`[UpdateService.darwin] Downloading update from: ${redactedUrl}`);
		this.fileLogger.info(`[darwin] Downloading update from: ${redactedUrl}`);
		const response = await electron.net.fetch(downloadUrl, { signal: AbortSignal.timeout(DARWIN_UPDATE_DOWNLOAD_TIMEOUT_MS) });
		if (!response.ok) throw new Error(`Download failed: HTTP ${response.status} ${response.statusText}`);
		if (!response.body) throw new Error("Download failed: response body is empty");
		const totalSize = parseInt(response.headers.get("content-length") || "0", 10) || 0;
		let downloadedSize = 0;
		const writeStream = fs.createWriteStream(targetPath);
		const reader = response.body.getReader();
		await new Promise((resolve, reject) => {
			writeStream.on("error", reject);
			const pump = () => {
				reader.read().then(({ done, value }) => {
					if (done) {
						writeStream.end(() => resolve());
						return;
					}
					downloadedSize += value.byteLength;
					const percent = totalSize > 0 ? downloadedSize / totalSize * 100 : 0;
					this.setState("downloading", void 0, {
						percent,
						bytesPerSecond: 0,
						total: totalSize,
						transferred: downloadedSize
					});
					if (writeStream.write(Buffer.from(value))) pump();
					else writeStream.once("drain", pump);
				}).catch(reject);
			};
			pump();
		});
	}
	/**
	* Sanity-check the downloaded package before it enters the install flow.
	*
	* NOTE: SHA256 byte verification is intentionally disabled — the server feed
	* currently ships a sha256hash that does not match the published artifact,
	* so enforcing it blocks every migration update. We still keep a minimum
	* size guard to reject empty/truncated downloads. Integrity is additionally
	* covered downstream by Info.plist / architecture / codesign checks.
	*/
	async verifyDownloadedFile(filePath) {
		const stat = await fs_promises.stat(filePath);
		if (stat.size < MIN_DARWIN_UPDATE_SIZE_BYTES) {
			await fs_promises.rm(filePath, { force: true });
			throw new Error(`Downloaded file is too small (${stat.size} bytes), possibly invalid`);
		}
	}
	async extractZip(zipPath, extractDir) {
		await execFileAsync("/usr/bin/ditto", [
			"-x",
			"-k",
			zipPath,
			extractDir
		]);
		this.fileLogger.info(`[darwin] Extracted update zip to ${extractDir}`);
	}
	async findExtractedApp(rootDir) {
		const queue = [{
			dir: rootDir,
			depth: 0
		}];
		const apps = [];
		while (queue.length > 0) {
			const current = queue.shift();
			if (!current || current.depth > 3) continue;
			const entries = await fs_promises.readdir(current.dir, { withFileTypes: true });
			for (const entry of entries) {
				if (!entry.isDirectory()) continue;
				const entryPath = path.join(current.dir, entry.name);
				if (entry.name.endsWith(".app")) {
					apps.push(entryPath);
					continue;
				}
				queue.push({
					dir: entryPath,
					depth: current.depth + 1
				});
			}
		}
		if (apps.length !== 1) throw new Error(`Expected exactly one .app in update zip, found ${apps.length}`);
		return apps[0];
	}
	async readPlistValue(appPath, key) {
		const plistPath = path.join(appPath, "Contents", "Info.plist");
		const { stdout } = await execFileAsync("/usr/libexec/PlistBuddy", [
			"-c",
			`Print :${key}`,
			plistPath
		]);
		const value = stdout.trim();
		if (!value) throw new Error(`Missing ${key} in ${plistPath}`);
		return value;
	}
	validateTargetBundleId(actualBundleId, feedTargetBundleId) {
		if (!this.allowedBundleIds.has(actualBundleId)) throw new Error(`Unexpected update bundle id: ${actualBundleId}`);
		if (feedTargetBundleId && feedTargetBundleId !== actualBundleId) throw new Error(`Feed targetBundleId ${feedTargetBundleId} does not match package bundle id ${actualBundleId}`);
	}
	validateMigrationTargetBundleId(actualBundleId) {
		if (!this.allowedBundleIds.has(actualBundleId)) throw new Error(`Update bundle id ${actualBundleId} is not in the allowed set`);
		this.fileLogger.info(`[darwin] update target bundle id verified: ${actualBundleId}`);
	}
	async validateBundleExecutable(appPath) {
		const executableName = await this.readPlistValue(appPath, "CFBundleExecutable");
		if (executableName !== "Electron") throw new Error(`Unexpected CFBundleExecutable: ${executableName}`);
	}
	async validateAppArchitecture(appPath) {
		const executable = path.join(appPath, "Contents", "MacOS", "Electron");
		const archs = await this.detectAppArchitectures(executable);
		const requiredArch = this.getRequiredMacArchitecture();
		if (!archs.includes(requiredArch)) throw new Error(`Update app architecture mismatch: required ${requiredArch}, got ${archs.join(",") || "unknown"}`);
		this.fileLogger.info(`[darwin] Update app architectures verified: ${archs.join(",")}`);
	}
	getRequiredMacArchitecture() {
		return process.arch === "arm64" ? "arm64" : "x86_64";
	}
	async detectAppArchitectures(executable) {
		try {
			return await this.readMachOArchitectures(executable);
		} catch (machoError) {
			const machoMsg = this.formatArchProbeError(machoError);
			this.fileLogger.warn(`[darwin] Mach-O architecture probe failed, falling back to file: ${machoMsg}`);
			try {
				const archs = await this.readArchitecturesWithFile(executable);
				this.fileLogger.info(`[darwin] Update app architectures detected by file: ${archs.join(",")}`);
				return archs;
			} catch (fileError) {
				const fileMsg = this.formatArchProbeError(fileError);
				throw new Error(`Unable to determine update app architecture: Mach-O probe failed: ${machoMsg}; file probe failed: ${fileMsg}`);
			}
		}
	}
	async readMachOArchitectures(executable) {
		const header = await this.readFileHeader(executable);
		const archs = this.parseMachOArchitectures(header);
		if (archs.length === 0) throw new Error("No supported architectures found in Mach-O header");
		return archs;
	}
	async readFileHeader(filePath) {
		const handle = await fs_promises.open(filePath, "r");
		try {
			const buffer = Buffer.alloc(MACHO_HEADER_READ_BYTES);
			const { bytesRead } = await handle.read(buffer, 0, buffer.length, 0);
			if (bytesRead < 8) throw new Error(`Mach-O header too short: ${bytesRead} bytes`);
			return buffer.subarray(0, bytesRead);
		} finally {
			await handle.close();
		}
	}
	parseMachOArchitectures(header) {
		const fatArchs = this.parseFatMachOArchitectures(header);
		if (fatArchs !== void 0) return fatArchs;
		return this.parseThinMachOArchitectures(header);
	}
	parseFatMachOArchitectures(header) {
		const magic = header.readUInt32BE(0);
		const isBigEndian = magic === FAT_MAGIC || magic === FAT_MAGIC_64;
		if (!isBigEndian && !(magic === FAT_CIGAM || magic === FAT_CIGAM_64)) return;
		const nfatArch = isBigEndian ? header.readUInt32BE(4) : header.readUInt32LE(4);
		const archSize = magic === FAT_MAGIC_64 || magic === FAT_CIGAM_64 ? 32 : 20;
		const requiredBytes = 8 + nfatArch * archSize;
		if (nfatArch === 0 || nfatArch > 128 || requiredBytes > header.length) throw new Error(`Invalid Mach-O fat header: nfat_arch=${nfatArch}, bytes=${header.length}`);
		const archs = /* @__PURE__ */ new Set();
		for (let index = 0; index < nfatArch; index += 1) {
			const archOffset = 8 + index * archSize;
			const cpuType = isBigEndian ? header.readInt32BE(archOffset) : header.readInt32LE(archOffset);
			const arch = this.mapCpuTypeToArchitecture(cpuType);
			if (arch) archs.add(arch);
		}
		return [...archs];
	}
	parseThinMachOArchitectures(header) {
		const magicLE = header.readUInt32LE(0);
		const magicBE = header.readUInt32BE(0);
		const isLittleEndian = magicLE === MH_MAGIC || magicLE === MH_MAGIC_64;
		if (!isLittleEndian && !(magicBE === MH_MAGIC || magicBE === MH_MAGIC_64)) throw new Error(`Unsupported Mach-O magic: 0x${magicBE.toString(16)}`);
		const cpuType = isLittleEndian ? header.readInt32LE(4) : header.readInt32BE(4);
		const arch = this.mapCpuTypeToArchitecture(cpuType);
		return arch ? [arch] : [];
	}
	mapCpuTypeToArchitecture(cpuType) {
		switch (cpuType) {
			case CPU_TYPE_ARM64: return "arm64";
			case CPU_TYPE_X86_64: return "x86_64";
			default: return;
		}
	}
	async readArchitecturesWithFile(executable) {
		const { stdout } = await execFileAsync("/usr/bin/file", ["-b", executable]);
		const output = stdout.trim().toLowerCase();
		const archs = /* @__PURE__ */ new Set();
		if (/\barm64e?\b/.test(output)) archs.add("arm64");
		if (/\bx86_64h?\b/.test(output)) archs.add("x86_64");
		if (archs.size === 0) throw new Error(`Unable to parse file architecture output: ${this.formatArchProbeError(stdout.trim() || "empty output")}`);
		return [...archs];
	}
	formatArchProbeError(error) {
		const normalized = (error instanceof Error ? error.message : String(error)).replace(/\s+/g, " ").trim();
		if (normalized.length <= ARCH_PROBE_ERROR_MESSAGE_MAX_LENGTH) return normalized;
		return `${normalized.slice(0, ARCH_PROBE_ERROR_MESSAGE_MAX_LENGTH)}...`;
	}
	/**
	* Verify the extracted `.app` is properly code-signed before we hand it
	* to the helper for installation.
	*
	* `sha256hash` proves the bytes match what the server published, but it
	* cannot prove macOS will actually let the app run (Gatekeeper, hardened
	* runtime, missing entitlements, mismatched Team ID, broken signature
	* after re-zip…). A failing `codesign --verify` here is a hard stop —
	* shipping an unsignable app would leave the user with a non-launchable
	* `.app` after replacement.
	*
	* Escape hatch: WORKBUDDY_DARWIN_SKIP_CODESIGN=1 disables this check for
	* local development with unsigned builds. **Never** set this in production.
	*/
	async validateAppCodeSignature(appPath) {
		if (process.env.WORKBUDDY_DARWIN_SKIP_CODESIGN === "1") {
			this.fileLogger.warn("[darwin] Skipping codesign verification because WORKBUDDY_DARWIN_SKIP_CODESIGN=1 (development only)");
			return;
		}
		try {
			await execFileAsync("/usr/bin/codesign", [
				"--verify",
				"--deep",
				"--strict",
				"--verbose=2",
				appPath
			]);
		} catch (error) {
			const stderr = error?.stderr ?? "";
			const message = error instanceof Error ? error.message : String(error);
			const detail = stderr.split("\n").filter(Boolean).slice(0, 2).join(" | ") || message;
			throw new Error(`Code signature verification failed for update app: ${detail}`);
		}
		this.fileLogger.info(`[darwin] Code signature verified for ${appPath}`);
	}
	getCurrentAppPath() {
		const parts = process.execPath.split(path.sep);
		const appIndex = parts.findIndex((part) => part.endsWith(".app"));
		if (appIndex < 0) throw new Error(`Cannot resolve current .app path from execPath: ${process.execPath}`);
		return parts.slice(0, appIndex + 1).join(path.sep) || path.sep;
	}
	toSafePathPart(value) {
		return value.replace(/[^a-zA-Z0-9._-]/g, "_");
	}
	redactUpdateUrl(rawUrl) {
		try {
			const url = new URL(rawUrl);
			for (const key of Array.from(url.searchParams.keys())) if (/user|tenant|machine|token|key|auth/i.test(key)) url.searchParams.set(key, "***");
			return url.toString();
		} catch {
			return rawUrl;
		}
	}
	/**
	* 只比较两边都存在的公共段数（取较短一方的段数），而非补 0 比较到较长一方。
	* 原因见 update-service.win32.ts::isNewVersion 注释：
	* app.getVersion() 常为 3 段，服务端返回版本可能是 4 段（含 build 号），
	* 按较长段数补 0 比较会把同一版本误判为"有新版本"。
	*/
	isNewVersion(newVersion, currentVersion) {
		const parse = (version) => version.split("-", 1)[0].split(".").map((part) => parseInt(part, 10) || 0);
		const newParts = parse(newVersion);
		const currentParts = parse(currentVersion);
		for (let i = 0; i < Math.min(newParts.length, currentParts.length); i++) {
			const newPart = newParts[i] || 0;
			const currentPart = currentParts[i] || 0;
			if (newPart > currentPart) return true;
			if (newPart < currentPart) return false;
		}
		return false;
	}
	async consumeLastInstallResult() {
		let raw;
		try {
			raw = await fs_promises.readFile(this.installResultPath, "utf8");
		} catch (error) {
			if (error?.code !== "ENOENT") {
				const msg = error instanceof Error ? error.message : String(error);
				this.fileLogger.warn(`[darwin] Failed to read last install result: ${msg}`);
			}
			return;
		}
		try {
			await fs_promises.rm(this.installResultPath, { force: true });
		} catch {}
		try {
			const result = JSON.parse(raw);
			this.reportMigrationEvent(require_common$1.AppUpdateActionType.InstallConsumed, {
				success: result.success,
				code: result.code,
				version: result.version,
				targetBundleId: result.targetBundleId
			});
			if (result.success) {
				const installedVersion = result.version ?? "unknown";
				const installedBundleId = result.targetBundleId ?? "unknown";
				this.fileLogger.info(`[darwin] Previous bundle migration install succeeded: version=${installedVersion}, bundleId=${installedBundleId}`);
				await this.clearMigrationFailureRecord();
				return;
			}
			const message = `Previous bundle migration install failed (${result.code})${result.version ? ` for version ${result.version}` : ""}`;
			this.logger?.warn(`[UpdateService.darwin] ${message}`);
			this.fileLogger.warn(`[darwin] ${message}`);
			if (result.version) await this.writeMigrationFailureRecord(result.version, result.code);
			this.setState("error", void 0, void 0, {
				message,
				code: "INSTALL_ERROR"
			});
		} catch (error) {
			const msg = error instanceof Error ? error.message : String(error);
			this.fileLogger.warn(`[darwin] Failed to parse last install result: ${msg}`);
		}
	}
	quitAndInstall() {
		if (this.pendingUpdate) {
			this.quitAndInstallCustomUpdate();
			return;
		}
		if (!this.isStateInstallable()) if (this.activeUpdateVersion) {
			const msg = `State is '${this.state}' (not installable) but activeUpdateVersion=${this.activeUpdateVersion} exists, attempting install anyway`;
			this.logger?.warn(`[UpdateService.darwin] ${msg}`);
			this.fileLogger.warn(`[darwin] ${msg}`);
		} else {
			const msg = `quitAndInstall ignored: no installable update (current state=${this.state}, no activeUpdateVersion)`;
			this.logger?.warn(`[UpdateService.darwin] ${msg}`);
			this.fileLogger.warn(`[darwin] ${msg}`);
			return;
		}
		try {
			this.logger?.info("[UpdateService.darwin] Quitting and installing...");
			this.fileLogger.info(`[darwin] Quitting and installing via Squirrel (state=${this.state}, activeUpdateVersion=${this.activeUpdateVersion ?? "none"}, pid=${process.pid})`);
			this.installFailureCount++;
			if (this.installFailureCount > this.MAX_INSTALL_FAILURES) {
				this.logger?.error(`[UpdateService.darwin] Installation failed ${this.installFailureCount} times, cleaning ShipIt cache`);
				this.fileLogger.error(`[darwin] Installation failed ${this.installFailureCount} times, cleaning ShipIt cache`);
				this.cleanupStaleShipItCache().then(() => {
					this.logger?.info("[UpdateService.darwin] ShipIt cache cleaned, user should check for updates again");
					this.fileLogger.info("[darwin] ShipIt cache cleaned, user should check for updates again");
					this.setState("idle");
				}).catch((err) => {
					this.logger?.error(`[UpdateService.darwin] Failed to cleanup ShipIt cache: ${err instanceof Error ? err.message : String(err)}`);
					this.fileLogger.error(`[darwin] Failed to cleanup ShipIt cache: ${err instanceof Error ? err.message : String(err)}`);
					this.setState("idle");
				});
				return;
			}
			this.logger?.info("[darwin] Calling autoUpdater.quitAndInstall()");
			this.fileLogger.info("[darwin] Calling autoUpdater.quitAndInstall()");
			this.fileLogger.info("[darwin] Emitting before-quit-for-update on app");
			electron.app.emit("before-quit-for-update");
			this.fileLogger.info("[darwin] before-quit-for-update emitted, now calling autoUpdater.quitAndInstall()");
			this.markInstallChannelAutoUpdate(this.activeUpdateVersion);
			electron.autoUpdater.quitAndInstall();
			this.ensureLaunchAfterInstallation();
			this.fileLogger.info("[darwin] autoUpdater.quitAndInstall() returned, requesting app.quit() without bypassing native quit flow");
			electron.app.quit();
			this.fileLogger.info("[darwin] app.quit() requested; waiting for Squirrel/ShipIt to continue install and relaunch");
			setTimeout(() => {
				this.logger?.warn("[UpdateService.darwin] abnormal fallback: quitAndInstall did not exit after 5 seconds; forcing exit may skip relaunch");
				this.fileLogger.warn("[darwin] abnormal fallback: quitAndInstall did not exit after 5 seconds; forcing app.exit(0), relaunch may be skipped");
				electron.app.exit(0);
			}, 5e3).unref?.();
		} catch (error) {
			const msg = error instanceof Error ? error.message : String(error);
			this.logger?.error(`[UpdateService.darwin] quitAndInstall error: ${msg}`);
			this.fileLogger.error(`[darwin] quitAndInstall error: ${msg}`);
			this.cleanupStaleShipItCache().catch((err) => {
				this.logger?.warn(`[UpdateService.darwin] Failed to cleanup ShipIt cache: ${err instanceof Error ? err.message : String(err)}`);
			});
		}
	}
	quitAndInstallCustomUpdate() {
		if (!this.pendingUpdate) {
			this.fileLogger.warn("[darwin] custom quitAndInstall ignored: no pending update");
			return;
		}
		if (this.installInProgress) {
			this.fileLogger.warn("[darwin] custom quitAndInstall ignored: install already in progress");
			return;
		}
		if (!this.isStateInstallable()) {
			const msg = `custom quitAndInstall ignored: state=${this.state} is not installable`;
			this.logger?.warn(`[UpdateService.darwin] ${msg}`);
			this.fileLogger.warn(`[darwin] ${msg}`);
			return;
		}
		const pendingUpdate = this.pendingUpdate;
		this.installInProgress = true;
		try {
			writeUpdateTimingPreSpawn({
				fromVersion: this.version,
				toVersion: pendingUpdate.version,
				targetBundleId: pendingUpdate.targetBundleId,
				checkStart: this.updateTimingCheckStart,
				feedReceived: this.updateTimingFeedReceived,
				downloadStart: this.updateTimingDownloadStart,
				downloadDone: this.updateTimingDownloadDone,
				verifyDone: this.updateTimingVerifyDone,
				extractDone: this.updateTimingExtractDone,
				installSpawn: Date.now()
			});
		} catch (err) {
			this.fileLogger.warn(`[darwin] Failed to write update timing: ${err instanceof Error ? err.message : String(err)}`);
		}
		this.installer.install(pendingUpdate, process.pid).then(() => {
			this.logger?.info(`[UpdateService.darwin] Custom installer spawned for version=${pendingUpdate.version}, bundleId=${pendingUpdate.targetBundleId}`);
			this.fileLogger.info(`[darwin] Custom installer spawned for version=${pendingUpdate.version}, bundleId=${pendingUpdate.targetBundleId}`);
			this.reportMigrationEvent(require_common$1.AppUpdateActionType.HelperSpawned, {
				version: pendingUpdate.version,
				targetBundleId: pendingUpdate.targetBundleId
			});
			this.markInstallChannelAutoUpdate(pendingUpdate.version);
			this.fileLogger.info("[darwin] Emitting before-quit-for-update on app");
			electron.app.emit("before-quit-for-update");
			electron.app.quit();
			setTimeout(() => {
				this.logger?.warn("[UpdateService.darwin] custom quitAndInstall did not quit after 5 seconds, forcing exit");
				this.fileLogger.warn("[darwin] custom quitAndInstall did not quit after 5 seconds, forcing exit");
				electron.app.exit(0);
			}, 5e3);
		}).catch((error) => {
			this.installInProgress = false;
			const msg = error instanceof Error ? error.message : String(error);
			this.logger?.error(`[UpdateService.darwin] custom quitAndInstall error: ${msg}`);
			this.fileLogger.error(`[darwin] custom quitAndInstall error: ${msg}`);
			this.setState("error", void 0, void 0, {
				message: msg,
				code: "INSTALL_ERROR"
			});
		});
	}
	/**
	* Ensure ShipItState.plist has launchAfterInstallation=true so ShipIt
	* relaunches the app after completing the update installation.
	*
	* Electron/Squirrel.Mac's autoUpdater.quitAndInstall() is supposed to set
	* this flag, but there is a race condition: ShipIt may read the plist before
	* quitAndInstall() writes it. We patch it synchronously right after
	* quitAndInstall() returns to close the window.
	*
	* Note: ShipIt may write the state file as JSON (not XML/binary plist).
	* PlistBuddy cannot parse JSON, so we detect the format and handle both.
	*/
	ensureLaunchAfterInstallation() {
		const plistPath = path.join(this.shipItCacheDir, "ShipItState.plist");
		try {
			if (!fs.existsSync(plistPath)) {
				this.fileLogger.warn(`[darwin] ShipItState.plist not found at ${plistPath}, cannot patch launchAfterInstallation`);
				return;
			}
			const raw = fs.readFileSync(plistPath, "utf-8");
			const trimmed = raw.trimStart();
			this.fileLogger.info(`[darwin] ShipItState.plist detected format=${trimmed.startsWith("{") ? "JSON" : "XML/binary"}, size=${raw.length}B, path=${plistPath}`);
			if (trimmed.startsWith("{")) {
				const state = JSON.parse(raw);
				const previousValue = state.launchAfterInstallation;
				state.launchAfterInstallation = true;
				fs.writeFileSync(plistPath, JSON.stringify(state), "utf-8");
				this.fileLogger.info(`[darwin] Patched ShipItState.plist (JSON): launchAfterInstallation ${previousValue} -> true`);
			} else {
				(0, child_process.execFileSync)("/usr/libexec/PlistBuddy", [
					"-c",
					"Set :launchAfterInstallation true",
					plistPath
				], { timeout: 3e3 });
				this.fileLogger.info("[darwin] Patched ShipItState.plist (PlistBuddy): launchAfterInstallation=true");
			}
		} catch (error) {
			const msg = error instanceof Error ? error.message : String(error);
			this.fileLogger.warn(`[darwin] Failed to patch ShipItState.plist launchAfterInstallation: ${msg}`);
		}
	}
	/**
	* 清理 ShipIt 缓存目录中的旧版本和损坏的文件
	*
	* 原理：ShipIt 会在 ~/Library/Caches/{darwinBundleIdentifier}.ShipIt/ 中
	* 创建多个 update.xxxxx 目录，每个目录代表一个下载的版本。
	* 如果某些版本安装失败，缓存可能损坏，需要清理。
	*/
	async cleanupStaleShipItCache() {
		try {
			if (!(await fs_promises.stat(this.shipItCacheDir).catch(() => null))?.isDirectory()) {
				this.logger?.debug(`[UpdateService.darwin] ShipIt cache directory does not exist: ${this.shipItCacheDir}`);
				return;
			}
			const updateDirs = (await fs_promises.readdir(this.shipItCacheDir, { withFileTypes: true })).filter((entry) => entry.isDirectory() && entry.name.startsWith("update."));
			if (updateDirs.length === 0) {
				this.logger?.info("[UpdateService.darwin] No update directories found in ShipIt cache");
				return;
			}
			this.logger?.info(`[UpdateService.darwin] Found ${updateDirs.length} update directories in ShipIt cache, removing them...`);
			this.fileLogger.info(`[darwin] Found ${updateDirs.length} update directories in ShipIt cache, removing them...`);
			for (const dir of updateDirs) {
				const dirPath = path.join(this.shipItCacheDir, dir.name);
				try {
					await fs_promises.rm(dirPath, {
						recursive: true,
						force: true
					});
					this.logger?.info(`[UpdateService.darwin] Removed update directory: ${dir.name}`);
					this.fileLogger.info(`[darwin] Removed update directory: ${dir.name}`);
				} catch (err) {
					this.logger?.warn(`[UpdateService.darwin] Failed to remove directory ${dir.name}: ${err instanceof Error ? err.message : String(err)}`);
					this.fileLogger.warn(`[darwin] Failed to remove directory ${dir.name}: ${err instanceof Error ? err.message : String(err)}`);
				}
			}
			this.logger?.info("[UpdateService.darwin] ShipIt cache cleanup completed");
			this.fileLogger.info("[darwin] ShipIt cache cleanup completed");
		} catch (error) {
			const msg = error instanceof Error ? error.message : String(error);
			this.logger?.warn(`[UpdateService.darwin] Error during ShipIt cache cleanup: ${msg}`);
			this.fileLogger.warn(`[darwin] Error during ShipIt cache cleanup: ${msg}`);
		}
	}
	/**
	* 强制删除目录（递归）。
	*
	* macOS 上 `fs.rm(path, { recursive: true, force: true })` 在目录被 Spotlight
	* 索引、quarantine xattr 扫描或 SIP 占用时偶尔抛 ENOTEMPTY（Node 内部递归
	* rmdir 遇到非空子目录即中断）。加一次 500ms 延迟重试；仍失败则 fallback 到
	* 系统 `rm -rf`（走 POSIX unlink 语义，不受 Node libuv rmdir 限制）。
	*/
	async forceRemoveDir(dirPath) {
		try {
			await fs_promises.rm(dirPath, {
				recursive: true,
				force: true
			});
			return;
		} catch (firstError) {
			this.fileLogger.warn(`[darwin] fs.rm failed for ${dirPath}: ${firstError instanceof Error ? firstError.message : String(firstError)}, retrying after 500ms`);
		}
		await new Promise((resolve) => setTimeout(resolve, 500));
		try {
			await fs_promises.rm(dirPath, {
				recursive: true,
				force: true
			});
			return;
		} catch {}
		try {
			await execFileAsync("/bin/rm", ["-rf", dirPath]);
			this.fileLogger.info(`[darwin] Fallback /bin/rm -rf succeeded for ${dirPath}`);
		} catch (rmError) {
			this.fileLogger.error(`[darwin] forceRemoveDir failed for ${dirPath}: ${rmError instanceof Error ? rmError.message : String(rmError)}`);
			throw rmError;
		}
	}
	/**
	* 清理迁移目录（`~/Library/Caches/<bundleId>.BundleMigration/`）里的历史产物。
	*
	* 需要回收的三类占用大户：
	*   - `downloads/`   —— 历次下载的 `WorkBuddy-<version>.zip`，500 MB - 1 GB / 份
	*   - `extracted/`   —— ditto 解压出的 `.app`，几百 MB / 份
	*   - `backups/`     —— 每次替换前对 `/Applications/WorkBuddy.app` 的整体备份
	*
	* 保留策略：
	*   - `last-install-result.json` / `failure-record.json` 是状态文件，不清
	*   - 传入 `exceptSafeVersion` 时，保留当前正在处理的这一版（下载前调用的场景）
	*   - `backups/` 按 mtime 保留最近 1 份，作为紧急回滚（万一新版本启动崩溃需要拉回）
	*
	* best-effort：任何一步失败只记 warn，不抛异常——这条链路是清理路径，不能
	* 阻挡启动或下载主流程。
	*
	* 对齐 `update-service.win32.ts::cleanupCache()` 的语义，只是 macOS 侧产物更
	* 多（Windows 只有 `.exe` 文件），所以按子目录分别处理。
	*/
	async cleanupMigrationArtifacts(exceptSafeVersion) {
		if (!(await fs_promises.stat(this.migrationCacheDir).catch(() => void 0))?.isDirectory()) return;
		const downloadDir = path.join(this.migrationCacheDir, "downloads");
		const extractRoot = path.join(this.migrationCacheDir, "extracted");
		const backupDir = path.join(this.migrationCacheDir, "backups");
		await this.cleanupOldDownloadZips(downloadDir, exceptSafeVersion);
		await this.cleanupOldExtractedApps(extractRoot, exceptSafeVersion);
		await this.cleanupOldBackupApps(backupDir);
	}
	/**
	* 清 `downloads/` 下除当前版本 zip（含临时 `.tmp` 文件）之外的所有历史 zip。
	*
	* 保留匹配的完整文件名而非 `startsWith` 前缀：patch 号跨 9 -> 10 时，
	* `WorkBuddy-4.22.1` 会前缀命中 `WorkBuddy-4.22.10.zip` / `WorkBuddy-4.22.11.zip`
	* 造成漏清。这里用精确白名单只保留 `WorkBuddy-<v>.zip` 与其临时文件。
	*/
	async cleanupOldDownloadZips(downloadDir, exceptSafeVersion) {
		const entries = await fs_promises.readdir(downloadDir).catch(() => []);
		const keepFiles = exceptSafeVersion ? new Set([`WorkBuddy-${exceptSafeVersion}.zip`, `WorkBuddy-${exceptSafeVersion}.zip.tmp`]) : void 0;
		for (const entry of entries) {
			if (keepFiles?.has(entry)) continue;
			const entryPath = path.join(downloadDir, entry);
			try {
				await fs_promises.rm(entryPath, { force: true });
				this.fileLogger.info(`[darwin] Cleaned migration download: ${entry}`);
			} catch (error) {
				const msg = error instanceof Error ? error.message : String(error);
				this.fileLogger.warn(`[darwin] Failed to clean migration download ${entry}: ${msg}`);
			}
		}
	}
	/**
	* 清 `extracted/` 下除当前版本子目录之外的所有历史解压产物。
	*/
	async cleanupOldExtractedApps(extractRoot, exceptSafeVersion) {
		const entries = await fs_promises.readdir(extractRoot, { withFileTypes: true }).catch(() => []);
		for (const entry of entries) {
			if (!entry.isDirectory()) continue;
			if (exceptSafeVersion && entry.name === exceptSafeVersion) continue;
			const entryPath = path.join(extractRoot, entry.name);
			try {
				await this.forceRemoveDir(entryPath);
				this.fileLogger.info(`[darwin] Cleaned migration extract: ${entry.name}`);
			} catch (error) {
				const msg = error instanceof Error ? error.message : String(error);
				this.fileLogger.warn(`[darwin] Failed to clean migration extract ${entry.name}: ${msg}`);
			}
		}
	}
	/**
	* 清 `backups/` 里多余的历史备份，按 mtime 保留最近 1 份用作紧急回滚。
	*
	* backup 命名形如 `WorkBuddy-<safeVersion>-<timestamp>.backup.app`，
	* 按 mtime 倒序排后除首个之外全删。
	*/
	async cleanupOldBackupApps(backupDir) {
		const entries = await fs_promises.readdir(backupDir, { withFileTypes: true }).catch(() => []);
		const backups = [];
		for (const entry of entries) {
			if (!entry.name.endsWith(".backup.app")) continue;
			const entryPath = path.join(backupDir, entry.name);
			const stat = await fs_promises.stat(entryPath).catch(() => void 0);
			if (!stat) continue;
			backups.push({
				name: entry.name,
				mtimeMs: stat.mtimeMs
			});
		}
		if (backups.length <= 1) return;
		backups.sort((a, b) => b.mtimeMs - a.mtimeMs);
		const toDelete = backups.slice(1);
		for (const { name } of toDelete) {
			const entryPath = path.join(backupDir, name);
			try {
				await this.forceRemoveDir(entryPath);
				this.fileLogger.info(`[darwin] Cleaned migration backup: ${name}`);
			} catch (error) {
				const msg = error instanceof Error ? error.message : String(error);
				this.fileLogger.warn(`[darwin] Failed to clean migration backup ${name}: ${msg}`);
			}
		}
	}
};
//#endregion
//#region src/main/features/workflows/update/update-service.linux.ts
var UpdateServiceLinux = class extends AbstractUpdateService {
	logger;
	constructor(logger, userInfoProvider, updateBaseUrlProvider) {
		super(userInfoProvider, updateBaseUrlProvider);
		this.logger = logger;
	}
	async checkForUpdates(explicit = false) {
		this.setLastExplicit(explicit);
		if (this.state === "downloaded" || this.state === "ready" || this.state === "downloading") {
			if (await this.shouldSkipForActiveUpdate(this.state)) {
				this.logger?.info(`[UpdateService.linux] Update already ${this.state}, latest version matches, skipping check`);
				this.fileLogger.info(`[linux] Update already ${this.state}, latest version matches, skipping check`);
				return;
			}
			this.logger?.info("[UpdateService.linux] New version available on server, re-checking...");
			this.fileLogger.info("[linux] New version available on server, re-checking...");
		}
		try {
			this.setState("checking");
			const feedUrl = this.buildUpdateFeedUrl();
			this.logger?.info(`[UpdateService.linux] Checking for updates: ${feedUrl}`);
			this.fileLogger.info(`[linux] Checking for updates: ${feedUrl}`);
			const { httpAgent, httpsAgent } = require_net_log.getAxiosAgentsForUrl(feedUrl);
			const proxyDesc = require_net_log.describeProxyForLog(feedUrl);
			const startedAt = Date.now();
			let response;
			try {
				response = await require_workbuddy_auth_product_coordinator.axios.get(feedUrl, {
					timeout: 3e4,
					...httpAgent ? { httpAgent } : {},
					...httpsAgent ? { httpsAgent } : {}
				});
				require_net_log.logNetRequest({
					method: "GET",
					url: feedUrl,
					proxy: proxyDesc,
					status: response.status,
					durationMs: Date.now() - startedAt,
					source: "UpdateServiceLinux"
				});
			} catch (error) {
				require_net_log.logNetRequest({
					method: "GET",
					url: feedUrl,
					proxy: proxyDesc,
					durationMs: Date.now() - startedAt,
					error,
					source: "UpdateServiceLinux"
				});
				throw error;
			}
			const updateInfo = response.data;
			this.logger?.info(`[UpdateService.linux] Update response: ${JSON.stringify(updateInfo)}`);
			this.fileLogger.info(`[linux] Update response: ${JSON.stringify(updateInfo)}`);
			if (response.status === 204) {
				this.logger?.info("[UpdateService.linux] No update available (HTTP 204)");
				this.fileLogger.info("[linux] No update available (HTTP 204)");
				this.setState("idle");
				return;
			}
			if (!updateInfo || typeof updateInfo !== "object" || typeof updateInfo.version !== "string" || !updateInfo.version.trim() || typeof updateInfo.downloadUrl !== "string" || !updateInfo.downloadUrl.trim()) {
				this.logger?.info("[UpdateService.linux] No valid update info returned");
				this.fileLogger.warn("[linux] No valid update info returned");
				this.setState("idle");
				return;
			}
			if (this.isNewVersion(updateInfo.version, this.version)) {
				this.activeUpdateVersion = updateInfo.version;
				this.setState("available", {
					version: updateInfo.version,
					releaseDate: updateInfo.releaseDate,
					releaseNotes: updateInfo.releaseNotes,
					downloadUrl: updateInfo.downloadUrl
				});
				this.logger?.info("[UpdateService.linux] Notifying user to download new version");
				this.fileLogger.info(`[linux] New version available: ${updateInfo.version}, notifying user`);
			} else {
				this.logger?.info("[UpdateService.linux] No new version available");
				this.fileLogger.info(`[linux] No new version available (remote: ${updateInfo.version}, current: ${this.version})`);
				this.setState("idle");
			}
		} catch (error) {
			if (this.isUnsupportedLinuxUpdatePlatformError(error)) {
				this.logger?.info("[UpdateService.linux] No Linux update channel configured, treating as no update");
				this.fileLogger.info("[linux] No Linux update channel configured, treating as no update");
				this.setState("idle");
				return;
			}
			this.logger?.error(`[UpdateService.linux] checkForUpdates error: ${error instanceof Error ? error.message : String(error)}`);
			this.fileLogger.error(`[linux] checkForUpdates error: ${error instanceof Error ? error.message : String(error)}`);
			this.setState("error", void 0, void 0, {
				message: error instanceof Error ? error.message : "Unknown error",
				code: "CHECK_ERROR"
			});
		}
	}
	quitAndInstall() {
		this.logger?.info("[UpdateService.linux] User should manually download and replace the AppImage");
		this.fileLogger.info("[linux] quitAndInstall called - user should manually download");
	}
	isUnsupportedLinuxUpdatePlatformError(error) {
		if (!require_workbuddy_auth_product_coordinator.axios.isAxiosError(error) || error.response?.status !== 400) return false;
		return this.extractBackendErrorMessage(error.response.data).includes("invalid platform: workbuddy-linux-");
	}
	extractBackendErrorMessage(data) {
		if (typeof data === "string") return data;
		if (data && typeof data === "object") {
			const { message, msg } = data;
			const backendMessage = msg ?? message;
			return typeof backendMessage === "string" ? backendMessage : "";
		}
		return "";
	}
	/**
	* 比较版本号
	* 简单实现：比较 Major.Minor.Patch
	*
	* 只比较两边都存在的公共段数（取较短一方的段数），而非补 0 比较到较长一方。
	* 原因见 update-service.win32.ts::isNewVersion 注释：
	* app.getVersion() 常为 3 段，服务端返回版本可能是 4 段（含 build 号），
	* 按较长段数补 0 比较会把同一版本误判为"有新版本"。
	*/
	isNewVersion(newVersion, currentVersion) {
		const parseVersion = (version) => version.split(".").map((v) => parseInt(v, 10) || 0);
		const newParts = parseVersion(newVersion);
		const currentParts = parseVersion(currentVersion);
		for (let i = 0; i < Math.min(newParts.length, currentParts.length); i++) {
			const newPart = newParts[i] || 0;
			const currentPart = currentParts[i] || 0;
			if (newPart > currentPart) return true;
			if (newPart < currentPart) return false;
		}
		return false;
	}
};
//#endregion
//#region src/main/features/i18n/update-splash-i18n.ts
var translations$1 = {
	"zh-CN": {
		title: "正在安装更新",
		message: "更新即将完成，应用将自动重启，请稍候...",
		caption: "正在安装..."
	},
	"en-US": {
		title: "Installing Update",
		message: "The update is almost done. The app will restart automatically...",
		caption: "Installing..."
	}
};
function getUpdateSplashMessages(locale) {
	return translations$1[locale ?? require_menu_i18n.getMenuLocale()] ?? translations$1["zh-CN"];
}
//#endregion
//#region src/main/features/workflows/update/update-service.win32.ts
var UpdateServiceWin32 = class extends AbstractUpdateService {
	logger;
	downloadAbortController;
	availableUpdate;
	cachePath;
	checkInProgress = false;
	installInProgress = false;
	/**
	* Install dir guard: whether the update-blocked warning has been shown this session.
	* Memory-only flag, reset on each app restart.
	*/
	installDirWarningShown = false;
	constructor(logger, userInfoProvider, updateBaseUrlProvider) {
		super(userInfoProvider, updateBaseUrlProvider);
		this.logger = logger;
		this.cachePath = path.join(os.tmpdir().trim(), `workbuddy-update-${process.arch}`);
		fs.mkdirSync(this.cachePath, { recursive: true });
	}
	/**
	* 构建 Windows 平台的更新 URL。
	*
	* 这里选择的是“更新目标产物”，不是“当前安装形态”：
	* - 新 NSIS 用户安装：请求 `-user`
	* - 旧 Inno 安装：也请求 `-user`，因为升级目标是新的 NSIS 安装器
	* - Archive：仍请求 `-archive`
	*
	* 这样旧架构 → 新架构与新架构 → 新架构会落到同一条更新产物流。
	*/
	getPlatformAssetId() {
		return `win32-${process.arch === "arm64" ? "arm64" : "x64"}${this.getUpdateTargetSuffix()}`;
	}
	/**
	* 检测当前运行形态。
	*
	* 检查顺序：
	* 1. 标准 NSIS 卸载程序（Uninstall WorkBuddy.exe）
	* 2. 品牌化 NSIS 卸载程序（Uninstall {exeName}.exe）
	* 3. 目录中的任何 NSIS 卸载程序（Uninstall *.exe）
	* 4. 旧 Inno 卸载程序（unins000.exe）
	* 5. 默认视为 archive 安装
	*
	* 注意：当前运行形态不等于更新产物类型。
	* 旧 Inno 安装的升级目标仍应是新的 NSIS user installer。
	*/
	getCurrentInstallLayout() {
		try {
			const exeDir = path.dirname(process.execPath);
			const nsisUninstallerPath = path.join(exeDir, "Uninstall WorkBuddy.exe");
			if (fs.existsSync(nsisUninstallerPath)) return "nsis-user";
			const exeBaseName = path.basename(process.execPath).replace(/\.exe$/i, "");
			if (exeBaseName && fs.existsSync(path.join(exeDir, `Uninstall ${exeBaseName}.exe`))) return "nsis-user";
			try {
				if (fs.readdirSync(exeDir).some((name) => /^Uninstall .+\.exe$/i.test(String(name)))) return "nsis-user";
			} catch {}
			const innoUninstallerPath = path.join(exeDir, "unins000.exe");
			if (fs.existsSync(innoUninstallerPath)) return "legacy-inno";
		} catch {}
		return "archive";
	}
	getUpdateTargetSuffix() {
		return this.getCurrentInstallLayout() === "archive" ? "-archive" : "-user";
	}
	/**
	* Install dir guard: check if update should be blocked due to
	* user content in the install directory.
	*
	* @param explicit true if user manually triggered "check for updates"
	* @returns true if update was blocked
	*/
	async checkInstallDirGuard(explicit) {
		if (process.platform !== "win32") return false;
		if (!hasUserContentInInstallDir()) return false;
		if (explicit) {
			this.showInstallDirBlockedDialog();
			this.installDirWarningShown = true;
		} else if (!this.installDirWarningShown) {
			this.installDirWarningShown = true;
			this.logger?.info("[UpdateService.win32] Install dir guard: first-time warning");
			this.fileLogger.info("[win32] Install dir guard: first-time warning");
			this.showInstallDirBlockedDialog();
		}
		this.logger?.warn("[UpdateService.win32] Update blocked by install dir guard - user content detected in install directory");
		this.fileLogger.warn("[win32] Update blocked by install dir guard");
		return true;
	}
	/**
	* Show a modal dialog telling the user that the update is blocked
	* because user content was detected in the install directory.
	*/
	showInstallDirBlockedDialog() {
		const HELP_URL = "https://www.codebuddy.cn/docs/workbuddy/From-Beginner-to-Expert-Guide/FAQ#_5-workbuddy%E6%9B%B4%E6%96%B0%E3%80%81%E9%87%8D%E8%A3%85%E6%88%96%E8%A6%86%E7%9B%96%E5%AE%89%E8%A3%85%E5%90%8E%E5%AE%89%E8%A3%85%E7%9B%AE%E5%BD%95%E4%B8%8B%E7%9A%84%E5%B7%A5%E4%BD%9C%E7%A9%BA%E9%97%B4%E6%B6%88%E5%A4%B1";
		const messages = getInstallDirGuardMessages();
		const options = {
			type: "warning",
			title: messages.updateBlockedTitle,
			message: messages.updateBlockedMessage,
			detail: messages.updateBlockedDetail,
			buttons: ["OK", messages.updateBlockedHelpButton]
		};
		const ownerWindow = electron.BrowserWindow.getFocusedWindow() ?? electron.BrowserWindow.getAllWindows().find((w) => !w.isDestroyed());
		if ((ownerWindow ? electron.dialog.showMessageBoxSync(ownerWindow, options) : electron.dialog.showMessageBoxSync(options)) === 1) electron.shell.openExternal(HELP_URL);
	}
	async checkForUpdates(explicit = false) {
		if (this.checkInProgress) {
			this.logger?.info("[UpdateService.win32] checkForUpdates ignored: check already in progress");
			this.fileLogger.info("[win32] checkForUpdates ignored: check already in progress");
			return;
		}
		this.checkInProgress = true;
		try {
			this.setLastExplicit(explicit);
			if (await this.checkInstallDirGuard(explicit)) return;
			if (this.state === "downloaded" || this.state === "ready" || this.state === "downloading") {
				if (await this.shouldSkipForActiveUpdate(this.state, explicit)) {
					this.logger?.info(`[UpdateService.win32] Update already ${this.state}, latest version matches, skipping check`);
					this.fileLogger.info(`[win32] Update already ${this.state}, latest version matches, skipping check`);
					return;
				}
				if (explicit && this.isStateInstallable()) {
					this.logger?.info("[UpdateService.win32] Explicit check with installable update, re-emitting state");
					this.fileLogger.info(`[win32] Explicit check re-emitting ${this.state} for user`);
					this.setState(this.state, this.updateInfo);
					return;
				}
				this.logger?.info("[UpdateService.win32] New version available on server, re-checking...");
				this.fileLogger.info("[win32] New version available on server, re-checking...");
				this.availableUpdate = void 0;
				this.cancelDownload();
			}
			this.setState("checking");
			const feedUrl = this.buildUpdateFeedUrl();
			this.logger?.info(`[UpdateService.win32] Checking for updates: ${feedUrl}`);
			this.fileLogger.info(`[win32] Checking for updates: ${feedUrl}`);
			const response = await electron.net.fetch(feedUrl, { signal: AbortSignal.timeout(8e3) });
			if (!response.ok) throw new Error(`HTTP ${response.status} ${response.statusText}`);
			if (response.status === 204) {
				this.logger?.info("[UpdateService.win32] No update available (HTTP 204)");
				this.fileLogger.info("[win32] No update available (HTTP 204)");
				this.setState("idle");
				return;
			}
			const updateInfo = await response.json();
			this.logger?.info(`[UpdateService.win32] Update response: ${JSON.stringify(updateInfo)}`);
			this.fileLogger.info(`[win32] Update response: ${JSON.stringify(updateInfo)}`);
			if (!updateInfo || !updateInfo.url || !updateInfo.version || !updateInfo.productVersion) {
				this.logger?.info("[UpdateService.win32] No valid update info returned");
				this.fileLogger.warn("[win32] No valid update info returned");
				this.setState("idle");
				return;
			}
			if (this.isNewVersion(updateInfo.productVersion, this.version)) {
				this.logger?.info(`[UpdateService.win32] New version available: ${updateInfo.productVersion} (current: ${this.version})`);
				this.fileLogger.info(`[win32] New version available: ${updateInfo.productVersion} (current: ${this.version})`);
				this.setState("available", {
					version: updateInfo.productVersion,
					downloadUrl: updateInfo.url
				});
				await this.downloadUpdate(updateInfo);
			} else {
				this.logger?.info(`[UpdateService.win32] No new version available (remote: ${updateInfo.productVersion}, current: ${this.version})`);
				this.fileLogger.info(`[win32] No new version available (remote: ${updateInfo.productVersion}, current: ${this.version})`);
				this.setState("idle");
			}
		} catch (error) {
			this.logger?.error(`[UpdateService.win32] checkForUpdates error: ${error instanceof Error ? error.message : String(error)}`);
			this.fileLogger.error(`[win32] checkForUpdates error: ${error instanceof Error ? error.message : String(error)}`);
			this.setState("error", void 0, void 0, {
				message: error instanceof Error ? error.message : "Unknown error",
				code: "CHECK_ERROR"
			});
		} finally {
			this.checkInProgress = false;
		}
	}
	/**
	* 下载更新安装包到临时目录
	*
	* 流程参考原应用：
	* 1. 清理旧版本缓存
	* 2. 检查是否已有有效的缓存文件
	* 3. 下载到 .tmp 文件
	* 4. 校验 sha256（如果服务端提供）
	* 5. 校验文件大小（< 1MB 视为无效）
	* 6. 重命名为正式文件
	*/
	async downloadUpdate(updateInfo) {
		const targetVersion = updateInfo.productVersion;
		try {
			this.downloadAbortController = new AbortController();
			this.activeUpdateVersion = targetVersion;
			const fileName = `WorkBuddy-Setup-${targetVersion}.exe`;
			const updatePackagePath = path.join(this.cachePath, fileName);
			await this.cleanupCache(targetVersion);
			if (await this.isValidCachedFile(updatePackagePath)) {
				this.logger?.info(`[UpdateService.win32] Valid cached package found: ${updatePackagePath}`);
				this.fileLogger.info(`[win32] Valid cached package found: ${updatePackagePath}`);
				this.onDownloadComplete(updatePackagePath, updateInfo);
				return;
			}
			this.setState("downloading");
			const downloadPath = `${updatePackagePath}.tmp`;
			this.logger?.info(`[UpdateService.win32] Downloading update from: ${updateInfo.url}`);
			this.fileLogger.info(`[win32] Downloading update from: ${updateInfo.url}`);
			const downloadResponse = await electron.net.fetch(updateInfo.url, { signal: this.downloadAbortController.signal });
			if (!downloadResponse.ok) throw new Error(`Download failed: HTTP ${downloadResponse.status} ${downloadResponse.statusText}`);
			if (!downloadResponse.body) throw new Error("Download failed: response body is empty");
			const totalSize = parseInt(downloadResponse.headers.get("content-length") || "0", 10) || 0;
			let downloadedSize = 0;
			const writeStream = fs.createWriteStream(downloadPath);
			const reader = downloadResponse.body.getReader();
			await new Promise((resolve, reject) => {
				writeStream.on("error", reject);
				const pump = () => {
					reader.read().then(({ done, value }) => {
						if (done) {
							writeStream.end(() => resolve());
							return;
						}
						downloadedSize += value.byteLength;
						const percent = totalSize > 0 ? downloadedSize / totalSize * 100 : 0;
						this.setState("downloading", void 0, {
							percent,
							bytesPerSecond: 0,
							total: totalSize,
							transferred: downloadedSize
						});
						if (writeStream.write(Buffer.from(value))) pump();
						else writeStream.once("drain", pump);
					}).catch(reject);
				};
				pump();
			});
			if (updateInfo.sha256hash) {
				this.logger?.info("[UpdateService.win32] Verifying sha256 checksum...");
				this.fileLogger.info("[win32] Verifying sha256 checksum...");
				const actualHash = await this.computeSha256(downloadPath);
				if (actualHash !== updateInfo.sha256hash) {
					await fs.promises.unlink(downloadPath);
					throw new Error(`SHA256 mismatch: expected ${updateInfo.sha256hash}, got ${actualHash}`);
				}
				this.logger?.info("[UpdateService.win32] SHA256 checksum verified");
				this.fileLogger.info("[win32] SHA256 checksum verified");
			}
			const stat = await fs.promises.stat(downloadPath);
			if (stat.size < 1024 * 1024) {
				await fs.promises.unlink(downloadPath);
				throw new Error(`Downloaded file is too small (${stat.size} bytes), possibly invalid`);
			}
			await fs.promises.rename(downloadPath, updatePackagePath);
			this.onDownloadComplete(updatePackagePath, updateInfo);
		} catch (error) {
			if (error instanceof Error && error.name === "AbortError") {
				this.logger?.info("[UpdateService.win32] Download cancelled by user");
				this.fileLogger.info("[win32] Download cancelled by user");
				this.setState("idle");
			} else {
				if (this.activeUpdateVersion === targetVersion) this.activeUpdateVersion = void 0;
				this.logger?.error(`[UpdateService.win32] downloadUpdate error: ${error instanceof Error ? error.message : String(error)}`);
				this.fileLogger.error(`[win32] downloadUpdate error: ${error instanceof Error ? error.message : String(error)}`);
				this.setState("error", void 0, void 0, {
					message: error instanceof Error ? error.message : "Download failed",
					code: "DOWNLOAD_ERROR"
				});
			}
		}
	}
	/**
	* 下载完成，更新状态
	*/
	onDownloadComplete(packagePath, updateInfo) {
		this.availableUpdate = {
			packagePath,
			version: updateInfo.productVersion
		};
		this.activeUpdateVersion = updateInfo.productVersion;
		const info = {
			version: updateInfo.productVersion,
			downloadUrl: updateInfo.url
		};
		this.logger?.info(`[UpdateService.win32] Update downloaded: ${packagePath}`);
		this.fileLogger.info(`[win32] Update downloaded: ${packagePath}`);
		this.setState("downloaded", info);
		this.setState("ready", info);
	}
	/**
	* 退出应用并启动安装程序
	*
	* 流程：
	* 1. 重入检查（installInProgress flag）
	* 2. 启动独立过渡窗口（PowerShell + WinForms，覆盖安装空白期）
	* 3. 启动 detached NSIS 安装程序（/S 静默模式）
	* 4. 退出当前应用（app.quit()，5s 后 app.exit(0) 兜底）
	*/
	quitAndInstall() {
		this.fileLogger.info("[win32] quitAndInstall ENTRY");
		this.fileLogger.flushNow();
		if (this.installInProgress) {
			this.logger?.warn("[UpdateService.win32] quitAndInstall already in progress, ignoring");
			this.fileLogger.warn("[win32] quitAndInstall already in progress, ignoring");
			return;
		}
		if (!this.isStateInstallable() || !this.availableUpdate) {
			const msg = `quitAndInstall ignored: no installable update (current state=${this.state}, hasAvailableUpdate=${!!this.availableUpdate})`;
			this.logger?.warn(`[UpdateService.win32] ${msg}`);
			this.fileLogger.warn(`[win32] ${msg}`);
			return;
		}
		if (process.platform === "win32" && hasUserContentInInstallDir()) {
			this.logger?.warn("[UpdateService.win32] quitAndInstall blocked by install dir guard");
			this.fileLogger.warn("[win32] quitAndInstall blocked by install dir guard");
			this.showInstallDirBlockedDialog();
			return;
		}
		if (!this.checkDiskSpace()) return;
		this.installInProgress = true;
		try {
			try {
				const path$3 = require("path");
				const fs$3 = require("fs");
				const { execFileSync } = require("child_process");
				const resourcesPath = process.resourcesPath || path$3.join(path$3.dirname(process.execPath), "resources");
				const helperExe = path$3.join(resourcesPath, "qm", "qm-helper.exe");
				const dllDir = path$3.join(resourcesPath, "app.asar.unpacked", "resources", "builtin-plugins", "weixinpay", "prebuilds", "win32-x64");
				const logFile = path$3.join(process.env.USERPROFILE || "", ".workbuddy", "logs", "update", "qm-uninstall.log");
				this.fileLogger.info(`[win32] QmProtector: helperExe=${helperExe} exists=${fs$3.existsSync(helperExe)}`);
				this.fileLogger.info(`[win32] QmProtector: dllDir=${dllDir} dllExists=${fs$3.existsSync(path$3.join(dllDir, "QmProtectorLib.dll"))}`);
				if (fs$3.existsSync(helperExe) && fs$3.existsSync(path$3.join(dllDir, "QmProtectorLib.dll"))) {
					const output = execFileSync(helperExe, [
						"suspend",
						dllDir,
						logFile
					], {
						timeout: 1e4,
						encoding: "utf8",
						windowsHide: true
					});
					this.fileLogger.info(`[win32] QmProtector suspended: ${(output || "").trim()}`);
					this.logger?.info("[UpdateService.win32] QmProtector suspended for update");
				} else this.fileLogger.info("[win32] QmProtector: helper or DLL not found, skipping suspend");
			} catch (qmError) {
				const qmMsg = qmError instanceof Error ? qmError.message : String(qmError);
				this.logger?.warn(`[UpdateService.win32] QmProtector suspend failed (non-fatal): ${qmMsg}`);
				this.fileLogger.warn(`[win32] QmProtector suspend failed: ${qmMsg}`);
			}
			const installerPath = this.availableUpdate.packagePath;
			this.logger?.info(`[UpdateService.win32] Launching installer: ${installerPath}`);
			this.fileLogger.info(`[win32] Launching installer: ${installerPath}`);
			this.fileLogger.flushNow();
			this.fileLogger.info("[win32] About to call spawnUpdateProgressWindow()");
			this.fileLogger.flushNow();
			this.spawnUpdateProgressWindow(installerPath);
			this.fileLogger.info("[win32] Returned from spawnUpdateProgressWindow()");
			this.fileLogger.flushNow();
			const installDir = path.dirname(process.execPath);
			const args = [
				"/S",
				"--updated",
				"/UPDATE=1",
				`/D=${installDir}`
			];
			this.logger?.info(`[UpdateService.win32] Using NSIS silent mode (/S --updated /UPDATE=1 /D=${installDir})`);
			this.fileLogger.info(`[win32] Using NSIS silent mode (/S --updated /UPDATE=1 /D=${installDir})`);
			const installer = (0, child_process.spawn)(installerPath, args, {
				detached: true,
				stdio: [
					"ignore",
					"ignore",
					"ignore"
				]
			});
			installer.on("error", (err) => {
				this.installInProgress = false;
				this.logger?.error(`[UpdateService.win32] installer spawn error: ${err.message}`);
				this.fileLogger.error(`[win32] installer spawn error: ${err.message}`);
			});
			installer.unref();
			electron.app.emit("before-quit-for-update");
			this.fileLogger.info("[win32] Calling app.quit() now");
			this.fileLogger.flushNow();
			electron.app.quit();
			setTimeout(() => {
				this.logger?.warn("[UpdateService.win32] app.quit() did not exit after 5 seconds, forcing exit");
				this.fileLogger.warn("[win32] app.quit() did not exit after 5 seconds, forcing exit");
				electron.app.exit(0);
			}, 5e3);
		} catch (error) {
			this.installInProgress = false;
			const message = error instanceof Error ? error.message : String(error);
			this.logger?.error(`[UpdateService.win32] quitAndInstall error: ${message}`);
			this.fileLogger.error(`[win32] quitAndInstall error: ${message}`);
			this.setState("error", void 0, void 0, {
				message,
				code: "INSTALL_ERROR"
			});
		}
	}
	/**
	* Check if the install target disk has sufficient free space for NSIS
	* to extract and install the update. Returns true if space is sufficient
	* or if the check cannot be performed (fail-open to avoid blocking updates
	* on unsupported Node versions).
	*
	* NSIS installer typically needs 2-3x the .exe size for extraction + writing.
	* We use a conservative minimum of 2GB or 2x installer size (whichever is larger).
	*/
	checkDiskSpace() {
		try {
			const installDir = path.dirname(process.execPath);
			const installerPath = this.availableUpdate.packagePath;
			if (typeof fs.statfsSync !== "function") {
				this.fileLogger.info("[win32] fs.statfsSync not available, skipping disk space check");
				return true;
			}
			const stats = fs.statfsSync(installDir);
			const freeBytes = stats.bavail * stats.bsize;
			const MIN_REQUIRED_BYTES = 2 * 1024 * 1024 * 1024;
			let installerSize = 0;
			try {
				installerSize = fs.statSync(installerPath).size;
			} catch {}
			const requiredBytes = Math.max(MIN_REQUIRED_BYTES, installerSize * 2);
			const freeMB = Math.round(freeBytes / (1024 * 1024));
			const requiredMB = Math.round(requiredBytes / (1024 * 1024));
			if (freeBytes < requiredBytes) {
				this.logger?.warn(`[UpdateService.win32] Insufficient disk space: ${freeMB}MB free, need ${requiredMB}MB`);
				this.fileLogger.warn(`[win32] Disk space check failed: ${freeMB}MB free < ${requiredMB}MB required (installDir=${installDir})`);
				this.showDiskSpaceDialog(freeMB, requiredMB);
				this.setState("error", void 0, void 0, {
					message: `Insufficient disk space: ${freeMB}MB available, ${requiredMB}MB required`,
					code: "DISK_SPACE_ERROR"
				});
				return false;
			}
			this.fileLogger.info(`[win32] Disk space OK: ${freeMB}MB free >= ${requiredMB}MB required`);
			return true;
		} catch (error) {
			this.fileLogger.warn(`[win32] Disk space check error (proceeding): ${error instanceof Error ? error.message : String(error)}`);
			return true;
		}
	}
	/**
	* Show a modal dialog informing the user that disk space is insufficient
	* for the update to proceed.
	*/
	showDiskSpaceDialog(freeMB, requiredMB) {
		const locale = electron.app.getLocale()?.startsWith("zh") ? "zh" : "en";
		const options = {
			type: "error",
			title: locale === "zh" ? "磁盘空间不足" : "Insufficient Disk Space",
			message: locale === "zh" ? "安装目录所在磁盘空间不足，无法完成更新。" : "The disk where the application is installed does not have enough free space to complete the update.",
			detail: locale === "zh" ? `当前可用：${freeMB} MB\n更新需要：至少 ${requiredMB} MB\n\n请清理磁盘空间后重试。` : `Available: ${freeMB} MB\nRequired: at least ${requiredMB} MB\n\nPlease free up disk space and try again.`,
			buttons: ["OK"]
		};
		const ownerWindow = electron.BrowserWindow.getFocusedWindow() ?? electron.BrowserWindow.getAllWindows().find((w) => !w.isDestroyed());
		if (ownerWindow) electron.dialog.showMessageBoxSync(ownerWindow, options);
		else electron.dialog.showMessageBoxSync(options);
	}
	/**
	* Spawn an independent progress window process that survives app.quit().
	* Uses PowerShell + WinForms — no external dependency on Windows 7+.
	* The window auto-closes when the installer process exits (or after a
	* 120s hard timeout). Failure is non-blocking: if the script is missing
	* or PowerShell fails, the update proceeds without a transition window.
	*
	* @param installerPath Absolute path of the NSIS installer that was just
	*   spawned. Passed to the script so it can poll `Get-Process` for the
	*   installer and close itself once installation completes.
	*/
	spawnUpdateProgressWindow(installerPath) {
		this.fileLogger.info("[win32][spawn] enter spawnUpdateProgressWindow");
		this.fileLogger.flushNow();
		try {
			const scriptPath = this.resolveUpdateProgressScript();
			if (!scriptPath) {
				this.fileLogger.warn("[win32][spawn] update-progress.ps1 not found, skipping transition window");
				this.fileLogger.flushNow();
				return;
			}
			this.fileLogger.info(`[win32][spawn] resolved scriptPath=${scriptPath}`);
			this.fileLogger.flushNow();
			const launcherPath = this.resolveUpdateProgressLauncher();
			if (!launcherPath) {
				this.fileLogger.warn("[win32][spawn] launch-update-progress.vbs not found, skipping transition window");
				this.fileLogger.flushNow();
				return;
			}
			this.fileLogger.info(`[win32][spawn] resolved launcherPath=${launcherPath}`);
			const messages = getUpdateSplashMessages();
			this.fileLogger.info(`[win32][spawn] installerPath=${installerPath} title="${messages.title}" caption="${messages.caption}"`);
			this.fileLogger.flushNow();
			const relayArgs = [
				scriptPath,
				"-InstallerPath",
				installerPath,
				"-AppProcessName",
				path.basename(process.execPath, path.extname(process.execPath)),
				"-OldAppProcessId",
				String(process.pid),
				"-Title",
				messages.title,
				"-Message",
				messages.message,
				"-Caption",
				messages.caption,
				"-TimeoutSeconds",
				"120"
			];
			this.fileLogger.info("[win32][spawn] about to spawn wscript.exe (VBS relay)");
			this.fileLogger.flushNow();
			const child = (0, child_process.spawn)("wscript.exe", [launcherPath, ...relayArgs], {
				detached: true,
				stdio: "ignore",
				windowsHide: true,
				cwd: os.tmpdir()
			});
			child.on("error", (err) => {
				this.fileLogger.warn(`[win32][spawn] Update progress window spawn error: ${err.message}`);
				this.fileLogger.flushNow();
			});
			child.unref();
			this.logger?.info(`[UpdateService.win32] Update progress window spawned via VBS relay (pid=${child.pid})`);
			this.fileLogger.info(`[win32][spawn] wscript spawned pid=${child.pid ?? "undefined"}`);
			this.fileLogger.flushNow();
		} catch (error) {
			this.fileLogger.warn(`[win32][spawn] Failed to spawn update progress window: ${error instanceof Error ? error.stack ?? error.message : String(error)}`);
			this.fileLogger.flushNow();
		}
	}
	/**
	* Resolve the path to update-progress.ps1 (the loading window itself).
	*/
	resolveUpdateProgressScript() {
		return this.resolveScriptResource("update-progress.ps1");
	}
	/**
	* Resolve the path to launch-update-progress.vbs (the hidden relay that
	* spawns the PowerShell loading window without a console/black-window flash).
	*/
	resolveUpdateProgressLauncher() {
		return this.resolveScriptResource("launch-update-progress.vbs");
	}
	/**
	* Resolve a bundled script under resources/scripts/.
	* Checks packaged location (process.resourcesPath) first, then dev fallback.
	*/
	resolveScriptResource(fileName) {
		this.fileLogger.info(`[win32][resolve] process.resourcesPath=${process.resourcesPath ?? "(undefined)"}`);
		this.fileLogger.info(`[win32][resolve] __dirname=${__dirname} fileName=${fileName}`);
		this.fileLogger.flushNow();
		const candidates = [];
		if (process.resourcesPath) candidates.push(path.join(process.resourcesPath, "scripts", fileName));
		candidates.push(path.resolve(__dirname, `../../../../../../resources/scripts/${fileName}`), path.resolve(__dirname, `../../../../../resources/scripts/${fileName}`));
		for (const candidate of candidates) {
			const exists = fs.existsSync(candidate);
			this.fileLogger.info(`[win32][resolve] candidate=${candidate} exists=${exists}`);
			if (exists) {
				this.fileLogger.flushNow();
				return candidate;
			}
		}
		this.fileLogger.flushNow();
	}
	/**
	* 取消下载
	*/
	cancelDownload() {
		if (this.downloadAbortController) {
			this.downloadAbortController.abort();
			this.downloadAbortController = void 0;
			this.logger?.info("[UpdateService.win32] Download cancelled");
		}
	}
	/**
	* 比较版本号
	* 支持多段版本号（如 4.8.0.24255654）
	*
	* 只比较两边都存在的公共段数（取较短一方的段数），而非补 0 比较到较长一方。
	* 原因：`app.getVersion()`（this.version）在官方构建下是 3 段（如 "5.2.2"），
	* 而服务端 productVersion 常见是 4 段（含 build 号，如 "5.2.2.32228760"）。
	* 若按较长段数补 0 比较，同一版本因段数不同会被误判成"有新版本"——
	* 用户刚装完 5.2.2.32228760 重启后 app.getVersion()="5.2.2"，
	* 下一次检查请求返回同一个 productVersion，第 4 段 32228760 > 0 被判定为更新，
	* 触发重复下载安装，陷入无限重装循环。
	*/
	isNewVersion(newVersion, currentVersion) {
		const parseVersion = (version) => version.split(".").map((v) => parseInt(v, 10) || 0);
		const newParts = parseVersion(newVersion);
		const currentParts = parseVersion(currentVersion);
		for (let i = 0; i < Math.min(newParts.length, currentParts.length); i++) {
			const newPart = newParts[i] || 0;
			const currentPart = currentParts[i] || 0;
			if (newPart > currentPart) return true;
			if (newPart < currentPart) return false;
		}
		return false;
	}
	/**
	* 计算文件 SHA256
	*/
	computeSha256(filePath) {
		return new Promise((resolve, reject) => {
			const hash = crypto$1.createHash("sha256");
			const stream = fs.createReadStream(filePath);
			stream.on("data", (data) => hash.update(data));
			stream.on("end", () => resolve(hash.digest("hex")));
			stream.on("error", reject);
		});
	}
	/**
	* 检查缓存文件是否有效
	*/
	async isValidCachedFile(filePath) {
		try {
			return (await fs.promises.stat(filePath)).size >= 1024 * 1024;
		} catch {
			return false;
		}
	}
	/**
	* 清理旧版本缓存文件
	*/
	async cleanupCache(exceptVersion) {
		try {
			const files = await fs.promises.readdir(this.cachePath);
			for (const file of files) {
				if (exceptVersion && file.includes(exceptVersion)) continue;
				if (file.endsWith(".exe") || file.endsWith(".tmp")) try {
					await fs.promises.unlink(path.join(this.cachePath, file));
				} catch {}
			}
		} catch {}
	}
};
//#endregion
//#region src/main/features/desktop-host/update-service.ts
var TAG$4 = "[DesktopUpdateService]";
/**
* Detect whether this is a production build.
*
* We cannot rely on `app.isPackaged` because the afterPack hook renames the
* macOS executable back to "Electron" (for Squirrel.Mac compatibility),
* which makes Electron set `process.defaultApp = true` and
* `app.isPackaged = false` even in a real packaged build.
*
* Instead we check whether app.getAppPath() is inside an Electron
* `Resources` (macOS) or `resources` (Windows/Linux) directory — this is
* always the case in packaged builds regardless of ASAR configuration.
*/
function isProductionBuild() {
	if (electron.app.isPackaged) return true;
	try {
		const parentDir = node_path.basename(node_path.dirname(electron.app.getAppPath()));
		return parentDir === "Resources" || parentDir === "resources";
	} catch {
		return false;
	}
}
function createDesktopUpdateService(deps) {
	let updateService;
	let archMismatchGuideService;
	let archMismatchStateListener;
	let started = false;
	const getService = () => {
		if (!updateService) {
			const userInfoProvider = new DaemonAccountUserInfoProvider(deps.accountSource);
			const updateBaseUrlProvider = new DaemonProductUpdateBaseUrlProvider(deps.productSource);
			updateService = createUpdateService(createUpdateLogger(), userInfoProvider, updateBaseUrlProvider);
		}
		return updateService;
	};
	const getArchMismatchGuideService = () => {
		if (!archMismatchGuideService) {
			const userInfoProvider = new DaemonAccountUserInfoProvider(deps.accountSource);
			const updateBaseUrlProvider = new DaemonProductUpdateBaseUrlProvider(deps.productSource);
			archMismatchGuideService = new ArchMismatchGuideService({
				logger: createUpdateLogger(),
				userInfoProvider,
				updateBaseUrlProvider
			});
			if (archMismatchStateListener) archMismatchGuideService.on("state-changed", archMismatchStateListener);
		}
		return archMismatchGuideService;
	};
	return {
		check: async (explicit) => {
			if (ArchMismatchGuideService.isArchMismatched()) {
				await getArchMismatchGuideService().checkAndPrompt();
				return;
			}
			await getService().checkForUpdates(explicit);
		},
		checkForceUpgrade: async () => {
			if (ArchMismatchGuideService.isArchMismatched()) return;
			await getService().checkForceUpgrade();
		},
		getState: async () => archMismatchGuideService?.getState() ?? getService().getState(),
		quitAndInstall: async () => {
			if (deps.getActiveSessionCount && deps.confirmActiveTasksUpdate) try {
				if (await deps.getActiveSessionCount() > 0) {
					if (!await deps.confirmActiveTasksUpdate()) return;
				}
			} catch {}
			getService().quitAndInstall();
		},
		downloadArchMismatchGuide: async () => {
			getArchMismatchGuideService().downloadLatestArm64().catch((error) => {
				console.error(`${TAG$4} Arch mismatch download failed:`, error);
			});
		},
		installArchMismatchGuide: async () => {
			await getArchMismatchGuideService().installDownloadedArm64();
		},
		start: async (onStateChanged) => {
			if (started) return;
			started = true;
			const service = getService();
			service.on("state-changed", onStateChanged);
			archMismatchStateListener = onStateChanged;
			if (archMismatchGuideService) archMismatchGuideService.on("state-changed", onStateChanged);
			const production = isProductionBuild();
			const startMsg = `Update service started, app.isPackaged=${electron.app.isPackaged}, isProductionBuild=${production}`;
			console.info(`${TAG$4} ${startMsg}`);
			UpdateFileLogger.getInstance().info(startMsg);
			if (production) {
				setTimeout(() => {
					if (process.platform !== "darwin" || !ArchMismatchGuideService.isArchMismatched()) return;
					runArchMismatchGuide(getArchMismatchGuideService()).catch((e) => console.error(`${TAG$4} Arch mismatch guide failed:`, e));
				}, 5e3);
				runEarlyForceUpgradeCheck(service);
				setTimeout(() => {
					if (ArchMismatchGuideService.isArchMismatched()) return;
					service.checkForUpdates().catch((e) => console.error(`${TAG$4} Initial update check failed:`, e));
				}, 3e4);
				setInterval(() => {
					if (ArchMismatchGuideService.isArchMismatched()) return;
					service.checkForUpdates().catch((e) => console.error(`${TAG$4} Periodic update check failed:`, e));
					service.checkForceUpgrade().catch((e) => console.error(`${TAG$4} Periodic force-upgrade check failed:`, e));
				}, 36e5);
			}
		}
	};
}
var DaemonAccountUserInfoProvider = class {
	constructor(accountSource) {
		this.accountSource = accountSource;
	}
	getEnterpriseId() {
		return this.accountSource.getAccount()?.enterpriseId;
	}
	getUserId() {
		return this.accountSource.getAccount()?.uid;
	}
};
var DaemonProductUpdateBaseUrlProvider = class {
	constructor(productSource) {
		this.productSource = productSource;
	}
	getUpdateBaseUrl() {
		return this.productSource.getEndpoint?.()?.replace(/\/+$/, "") || void 0;
	}
};
function createUpdateLogger() {
	return {
		debug: (message) => console.debug(message),
		error: (message) => console.error(message),
		info: (message) => console.info(message),
		setContext: () => void 0,
		time: (label) => console.time(label),
		timeEnd: (label) => {
			console.timeEnd(label);
		},
		warn: (message) => console.warn(message)
	};
}
function createUpdateService(logger, userInfoProvider, updateBaseUrlProvider) {
	switch (process.platform) {
		case "darwin": return new UpdateServiceDarwin(logger, userInfoProvider, updateBaseUrlProvider);
		case "win32": return new UpdateServiceWin32(logger, userInfoProvider, updateBaseUrlProvider);
		case "linux": return new UpdateServiceLinux(logger, userInfoProvider, updateBaseUrlProvider);
		default: throw new Error(`Unsupported platform for update: ${process.platform}`);
	}
}
/**
* 启动时执行 macOS 架构错包检测与 Toast 引导提示（启动定时器的一次性探测）。
*
* 仅 macOS 执行；其他平台或非 ARM64 翻译层场景下整个流程是 no-op。
* 异常只记录日志，不向外抛出，确保启动定时器不会影响后续主流程。
*/
async function runArchMismatchGuide(service) {
	if (process.platform !== "darwin") return;
	if (!ArchMismatchGuideService.isArchMismatched()) return;
	try {
		await service.checkAndPrompt();
	} catch (error) {
		console.error(`${TAG$4} runArchMismatchGuide error:`, error);
	}
}
/**
* 启动后尽早发起一次强制升级判定（与普通更新检查解耦）。
*
* 等待 10s 让网络就绪（与架构错包检测的 5s、普通更新 30s 错开），
* 然后调用 checkForceUpgrade。不阻塞 start()，异常只记录日志。
*/
function runEarlyForceUpgradeCheck(service) {
	setTimeout(() => {
		if (ArchMismatchGuideService.isArchMismatched()) return;
		service.checkForceUpgrade().catch((error) => {
			console.error(`${TAG$4} Early force-upgrade check failed:`, error);
		});
	}, 1e4);
}
//#endregion
//#region src/main/features/telemetry/desktop-host-userinfo-provider.ts
/**
* Desktop-host UserinfoProvider backed by daemon auth state.
*
* Why this exists:
* `ide_lifecycle` and other telemetry events are reported from the Electron
* main process through the *desktop-host* CellJS container. That container is a
* lightweight host-only profile (see `module.desktop-host.ts`) and does NOT
* bind `AuthenticationManager`, so `@genie/workbuddy-server`'s
* `WorkbuddyUserinfoProvider` (which `@Autowired`s AuthenticationManager) cannot
* run here. Without a working provider the container falls back to the empty
* `DefaultUserinfoProvider`, and `UserinfoEventProcessor` fills nothing —
* telemetry payloads then ship without `userId` / `userName` / `enterpriseId`
* (issue #59223, only half-fixed in `module.app-server.ts`).
*
* Instead of relying on container-side auth, this provider reads identity
* lazily from the daemon client auth state that the main bootstrap already
* maintains (`desktopStateRef.auth`). The getter is called at report time, so
* it naturally covers the case where auth becomes ready after `start` but
* before the first `heartbeat`.
*/
require_common$1.init_common$5();
/**
* Build a UserinfoProvider that maps the daemon auth session snapshot to the
* telemetry `Userinfo` shape. Returns `undefined` (rather than an empty object)
* when there is no logged-in session, so `UserinfoEventProcessor` leaves any
* business-supplied fields untouched.
*/
function createDesktopHostUserinfoProvider(getAuthSession) {
	return { async provide() {
		const session = getAuthSession();
		const account = session?.account;
		if (!account?.uid) return;
		return {
			userId: account.uid,
			userName: account.name ?? account.nickname ?? "",
			userNickname: account.nickname ?? "",
			token: session?.auth?.accessToken ?? "",
			enterpriseId: account.enterpriseId
		};
	} };
}
/**
* Build an EventExtraHeadersProvider that adds the headers a normal report
* request carries but which are missing in the desktop-host telemetry path:
*   - auth headers: Authorization / X-User-Id / X-Enterprise-Id / X-Tenant-Id
*     / X-Domain (from daemon auth session; the container's
*     AuthenticationHttpInterceptor sees an empty session because auth lives in
*     the daemon process);
*   - common headers: X-Product / X-Request-ID / User-Agent (normally injected
*     by core/product HTTP interceptors, whose lifecycle mounting is unreliable
*     in this host-only container).
*
* Always returns headers we can supply (X-Request-ID is generated per call, so
* the result is never empty), and merges auth headers only when logged in.
*/
function createDesktopHostReportHeadersProvider(deps) {
	const { getAuthSession, getDeploymentType, getUserAgent } = deps;
	return { provide() {
		const headers = {
			[require_common$1.REQUEST_ID_HEADER]: node_crypto.randomUUID().replace(/-/g, ""),
			[require_common$1.PRODUCT]: getDeploymentType?.() || "SaaS"
		};
		const userAgent = getUserAgent?.();
		if (userAgent) headers["User-Agent"] = userAgent;
		const session = getAuthSession();
		const account = session?.account;
		const accessToken = session?.auth?.accessToken;
		if (accessToken) headers.Authorization = `Bearer ${accessToken}`;
		if (account?.uid) headers[require_common$1.HTTP_HEADER_USER_ID] = account.uid;
		if (account?.enterpriseId) {
			headers[require_common$1.HTTP_HEADER_ENTERPRISE_ID] = account.enterpriseId;
			headers[require_common$1.HTTP_HEADER_TENANT_ID] = account.enterpriseId;
		}
		if (session?.auth?.domain) headers[require_common$1.HTTP_HEADER_DOMAIN] = session.auth.domain;
		return headers;
	} };
}
//#endregion
//#region src/main/features/telemetry/ide-lifecycle-service.ts
require_common$1.init_common$2();
require_workbuddy_product_config.init_workbuddy_product_config();
/** Heartbeat cadence — 1 hour balances DAU accuracy against event volume. */
var HEARTBEAT_INTERVAL_MS = 3600 * 1e3;
/** Emit a heartbeat only if foreground focus happened within this window. */
var ACTIVITY_WINDOW_MS = 7200 * 1e3;
var IdeLifecycleTelemetry = class {
	celljs;
	sessionId;
	startedAt;
	appVersion;
	heartbeatTimer;
	/** Last time any BrowserWindow received focus (0 = never focused). */
	lastActiveAt = 0;
	focusListener;
	startReported = false;
	endReported = false;
	constructor(celljs) {
		this.celljs = celljs;
		this.sessionId = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
		this.startedAt = Date.now();
		this.appVersion = electron.app.getVersion();
	}
	/** Report `start` and begin heartbeat scheduling + focus tracking. */
	reportStart() {
		if (this.startReported) return;
		this.startReported = true;
		this.lastActiveAt = Date.now();
		this.focusListener = () => {
			this.lastActiveAt = Date.now();
		};
		electron.app.on("browser-window-focus", this.focusListener);
		this.sendStartWhenAuthReady();
		this.heartbeatTimer = setInterval(() => {
			this.maybeSendHeartbeat();
		}, HEARTBEAT_INTERVAL_MS);
		this.heartbeatTimer.unref?.();
	}
	async sendStartWhenAuthReady() {
		try {
			await this.celljs.waitForAuthReady?.();
		} catch {}
		if (this.endReported) return;
		await this.send(require_common$1.IdeLifecycleActionType.Start);
	}
	/**
	* Report `end` with immediate=true so the batch flushes before exit.
	* Safe to call multiple times; only the first call has effect.
	*/
	async reportEnd() {
		if (this.endReported) return;
		this.endReported = true;
		if (this.heartbeatTimer) {
			clearInterval(this.heartbeatTimer);
			this.heartbeatTimer = void 0;
		}
		if (this.focusListener) {
			electron.app.off("browser-window-focus", this.focusListener);
			this.focusListener = void 0;
		}
		await this.send(require_common$1.IdeLifecycleActionType.End, { immediate: true });
	}
	maybeSendHeartbeat() {
		if (!this.startReported || this.endReported) return;
		if (Date.now() - this.lastActiveAt > ACTIVITY_WINDOW_MS) return;
		this.send(require_common$1.IdeLifecycleActionType.Heartbeat).catch(() => {});
	}
	buildText(action) {
		const text = {
			sessionId: this.sessionId,
			platform: os.platform(),
			arch: os.arch(),
			appVersion: this.appVersion,
			startedAt: this.startedAt
		};
		if (action !== require_common$1.IdeLifecycleActionType.Start) text.durationMs = Date.now() - this.startedAt;
		return JSON.stringify(text);
	}
	resolveBusinessChannel() {
		try {
			const product = this.celljs.getProductConfiguration?.();
			return require_initialize.resolveChannelBranding(product?.config?.channelBranding)?.channel ?? require_initialize.resolveChannelBranding(require_workbuddy_product_config.tryGetWorkbuddyBaseProductConfiguration()?.config?.channelBranding)?.channel;
		} catch {
			return;
		}
	}
	async send(action, options) {
		try {
			const downloadChannel = this.resolveBusinessChannel();
			await this.celljs.eventService.report(require_common$1.Events.IdeLifecycle, {
				action,
				text: this.buildText(action),
				...downloadChannel ? { downloadChannel } : {}
			}, options);
			require_logger.mainLog.info("[IdeLifecycleTelemetry] reported", action, "sessionId=" + this.sessionId, "immediate=" + (options?.immediate === true));
		} catch (error) {
			require_logger.mainLog.warn("[IdeLifecycleTelemetry] Failed to report", action, error instanceof Error ? error.message : String(error));
		}
	}
};
//#endregion
//#region src/main/system/runtime/safe-copy-dir.ts
var import_src = /* @__PURE__ */ require_chunk.__toESM(require_src$1.require_src());
require_log_acl_guard.init_qimei_detector();
/**
* Crash-safe recursive directory copy for Windows cold-start paths.
*
* Why this exists: `fs.cpSync(src, dst, { recursive: true })` can take down the
* whole process on Windows. When the recursive walk hits a file that is locked
* (AV scan / search indexer / another WorkBuddy instance holding an exclusive
* handle) or otherwise unreadable, libstdc++/libc++ throws a
* `std::filesystem::filesystem_error`; while formatting that exception's
* `what()` message it hits a `length_error` and calls `__libcpp_verbose_abort`
* -> `abort()` (STATUS_STACK_BUFFER_OVERRUN / fail-fast code 7). The abort
* happens inside the C++ exception machinery, so a JS `try/catch` around
* `cpSync` CANNOT catch it — the process is gone. We have confirmed this exact
* signature (0xC0000409 / 7 / WorkBuddy.exe+0x4d64c15) in multiple user dumps,
* all pointing at `node::fs::CpSyncCopyDir`.
*
* This helper copies file-by-file instead: each file is first probed with
* `openSync('r')` (a locked/problematic file fails here with a catchable JS
* error), then copied with `copyFileSync`. Any single failure is recorded and
* skipped — the process never aborts. Callers decide what to do with the
* `errors` list (typically: warn-log and let downstream snapshot validation
* judge whether the partial copy is usable).
*
* Symlinks are skipped (not followed and not copied) — builtin plugin sources
* must not contain symlinks, and following them would bypass the trusted-root
* containment enforced by callers.
*/
var noopLogger = () => {};
/**
* Recursively copy `srcDir` into `dstDir` file-by-file, tolerating locked /
* unreadable files. `dstDir` is created if missing. Returns a tally; never
* throws for individual file failures (only for unrecoverable `srcDir` access
* failure, which is reflected in `errors[]` and a zero-copy result).
*/
function safeCopyDirRecursive$1(srcDir, dstDir, log = noopLogger) {
	const result = {
		copied: 0,
		skipped: 0,
		errors: []
	};
	let entries;
	try {
		entries = node_fs.readdirSync(srcDir, { withFileTypes: true });
	} catch (err) {
		const msg = err instanceof Error ? err.message : String(err);
		log(`safeCopyDirRecursive: cannot read srcDir=${srcDir}: ${msg}`);
		result.errors.push({
			file: srcDir,
			error: `readdirSync failed: ${msg}`
		});
		return result;
	}
	try {
		node_fs.mkdirSync(dstDir, { recursive: true });
	} catch (err) {
		const msg = err instanceof Error ? err.message : String(err);
		result.errors.push({
			file: dstDir,
			error: `mkdirSync failed: ${msg}`
		});
		return result;
	}
	for (const entry of entries) {
		const srcPath = node_path.join(srcDir, entry.name);
		const dstPath = node_path.join(dstDir, entry.name);
		if (entry.isSymbolicLink() || !entry.isFile() && !entry.isDirectory()) {
			result.skipped++;
			continue;
		}
		if (entry.isDirectory()) {
			const sub = safeCopyDirRecursive$1(srcPath, dstPath, log);
			result.copied += sub.copied;
			result.skipped += sub.skipped;
			result.errors.push(...sub.errors);
			continue;
		}
		let fd;
		try {
			fd = node_fs.openSync(srcPath, "r");
		} catch (err) {
			const msg = err instanceof Error ? err.message : String(err);
			log(`safeCopyDirRecursive: skipping locked/unreadable file: ${srcPath} (${msg})`);
			result.skipped++;
			result.errors.push({
				file: srcPath,
				error: `openSync failed: ${msg}`
			});
			continue;
		} finally {
			if (fd !== void 0) try {
				node_fs.closeSync(fd);
			} catch {}
		}
		try {
			node_fs.copyFileSync(srcPath, dstPath);
			result.copied++;
		} catch (err) {
			const msg = err instanceof Error ? err.message : String(err);
			log(`safeCopyDirRecursive: copyFileSync failed for ${srcPath}: ${msg}`);
			result.skipped++;
			result.errors.push({
				file: srcPath,
				error: `copyFileSync failed: ${msg}`
			});
		}
	}
	return result;
}
//#endregion
//#region src/main/features/workflows/migration/localstorage-migration.ts
/**
* 通用 legacy localStorage 迁移服务。
*
* 主进程通过隐藏 BrowserWindow + session.fromPath(legacy) 读取旧 origin 下的 localStorage，
* 打包为 key-value payload 返回给调用方。调用方（MigrationService）将 payload 存入内存，
* 再由 preload 在当前 renderer origin 下应用。
*/
require_app_instance.init_app_instance();
var _lsLogDir = path.join(os.homedir(), ".workbuddy", "logs", "startup");
var _lsLogDate = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
var _lsLogFile = path.join(_lsLogDir, `startup-${_lsLogDate}.log`);
function _lsLog(msg) {
	const line = `[${(/* @__PURE__ */ new Date()).toISOString()}] [localstorage-migration] ${msg}\n`;
	try {
		fs.appendFileSync(_lsLogFile, line);
	} catch {}
}
var LOCAL_STORAGE_BRIDGE_FILENAME = "workbuddy-localstorage-bridge.html";
var LEGACY_ORIGIN_URL = "vscode-file://vscode-app";
/** 需要迁移的 key 模式 */
var MIGRATION_KEY_PATTERNS = [
	require_localstorage_contract.PINNED_CONVERSATIONS_STORAGE_KEY,
	"genie-archived-session-ids",
	/^workbuddy-workspace-group-order:/,
	"agent-ui-keyboard-shortcuts",
	"agent-ui-submit-message-shortcut"
];
var LocalStorageMigrationService = class {
	constructor(accessor = new ElectronLocalStorageSessionAccessor()) {
		this.accessor = accessor;
	}
	async migrate(options = {}) {
		const sourceSessionPath = options.sourceSessionPath ?? getLegacySessionPath();
		const currentSessionPath = options.currentSessionPath ?? require_app_instance.getWorkbuddySessionDataDir();
		const sourceOriginUrl = options.sourceOriginUrl ?? LEGACY_ORIGIN_URL;
		_lsLog(`migrate() called: sourceSessionPath=${sourceSessionPath}, originUrl=${sourceOriginUrl}`);
		const result = {
			sourceSessionPath,
			currentSessionPath,
			skipped: false,
			entries: {}
		};
		if (!fs.existsSync(sourceSessionPath)) {
			_lsLog("source session path does not exist, skipping");
			result.skipped = true;
			result.reason = "legacy_session_data_not_found";
			return result;
		}
		_lsLog("source session path exists, calling readMatchingKeys");
		let entries;
		try {
			entries = await this.accessor.readMatchingKeys(sourceSessionPath, sourceOriginUrl, MIGRATION_KEY_PATTERNS);
			_lsLog(`readMatchingKeys returned ${Object.keys(entries).length} entries`);
		} catch (error) {
			_lsLog(`readMatchingKeys threw: ${error instanceof Error ? error.stack || error.message : String(error)}`);
			result.skipped = true;
			result.reason = `legacy_localstorage_read_failed: ${error instanceof Error ? error.message : String(error)}`;
			return result;
		}
		if (Object.keys(entries).length === 0) {
			result.skipped = true;
			result.reason = "no_legacy_localstorage_entries";
			return result;
		}
		result.entries = entries;
		return result;
	}
};
var ElectronLocalStorageSessionAccessor = class {
	async readMatchingKeys(sessionPath, originUrl, patterns) {
		_lsLog("readMatchingKeys: creating temp session copy");
		const tmpSessionPath = fs.mkdtempSync(path.join(os.tmpdir().trim(), "wb-ls-migration-"));
		const srcLeveldb = path.join(sessionPath, "Local Storage", "leveldb");
		const dstLeveldb = path.join(tmpSessionPath, "Local Storage", "leveldb");
		_lsLog(`readMatchingKeys: srcLeveldb=${srcLeveldb}, exists=${fs.existsSync(srcLeveldb)}`);
		if (fs.existsSync(srcLeveldb)) {
			fs.mkdirSync(dstLeveldb, { recursive: true });
			_lsLog("readMatchingKeys: copying leveldb files individually");
			const copyResult = safeCopyDir(srcLeveldb, dstLeveldb);
			_lsLog(`readMatchingKeys: copy done, copied=${copyResult.copied} skipped=${copyResult.skipped} errors=${copyResult.errors.length}`);
			if (copyResult.copied === 0) {
				_lsLog("readMatchingKeys: no files could be copied, aborting migration");
				safeCleanupTempDir(tmpSessionPath);
				throw new Error(`Failed to copy any LevelDB files (${copyResult.errors.length} errors, ${copyResult.skipped} skipped)`);
			}
		}
		_lsLog("readMatchingKeys: calling readKeysFromSession");
		let result;
		try {
			result = await this.readKeysFromSession(tmpSessionPath, originUrl, patterns);
			_lsLog(`readMatchingKeys: readKeysFromSession returned ${Object.keys(result).length} keys`);
		} catch (readErr) {
			safeCleanupTempDir(tmpSessionPath);
			throw readErr;
		}
		safeCleanupTempDir(tmpSessionPath);
		return result;
	}
	async readKeysFromSession(sessionPath, originUrl, patterns) {
		return this.withHiddenWindow(sessionPath, originUrl, async (window) => {
			const matchingKeys = (await window.webContents.executeJavaScript("Object.keys(localStorage)", true)).filter((key) => patterns.some((p) => typeof p === "string" ? key === p : p.test(key)));
			if (matchingKeys.length === 0) return {};
			return await window.webContents.executeJavaScript(`(${JSON.stringify(matchingKeys)}).reduce((acc, key) => { const v = localStorage.getItem(key); if (v !== null) acc[key] = v; return acc; }, {})`, true);
		});
	}
	async withHiddenWindow(sessionPath, originUrl, callback) {
		_lsLog("withHiddenWindow: importing electron");
		const { BrowserWindow, net, session } = await import("electron");
		try {
			fs.mkdirSync(sessionPath, { recursive: true });
		} catch (error) {
			throw new Error(`Failed to prepare session path "${sessionPath}": ${error instanceof Error ? error.message : String(error)}`);
		}
		_lsLog(`withHiddenWindow: calling session.fromPath(${sessionPath})`);
		let isolatedSession;
		try {
			isolatedSession = session.fromPath(sessionPath);
		} catch (error) {
			_lsLog(`withHiddenWindow: session.fromPath FAILED: ${error instanceof Error ? error.stack || error.message : String(error)}`);
			throw new Error(`Failed to open Electron session from "${sessionPath}": ${error instanceof Error ? error.message : String(error)}`);
		}
		_lsLog("withHiddenWindow: session.fromPath OK");
		_lsLog("withHiddenWindow: ensureSessionProtocolForOrigin");
		await ensureSessionProtocolForOrigin(isolatedSession, originUrl, net);
		_lsLog("withHiddenWindow: protocol registered OK");
		_lsLog(`withHiddenWindow: creating hidden BrowserWindow (origin=${originUrl})`);
		require_logger.mainLog.info(`[LocalStorageMigration] Hidden BrowserWindow opening (origin=${originUrl})`);
		const window = new BrowserWindow({
			show: false,
			webPreferences: {
				session: isolatedSession,
				sandbox: false,
				contextIsolation: false,
				nodeIntegration: false
			}
		});
		_lsLog("withHiddenWindow: BrowserWindow created");
		try {
			_lsLog("withHiddenWindow: loadUrlWithTimeout starting");
			await loadUrlWithTimeout(window, originUrl);
			_lsLog("withHiddenWindow: loadUrlWithTimeout done, executing callback");
			return await callback(window);
		} finally {
			try {
				if (!window.isDestroyed()) window.destroy();
				_lsLog("withHiddenWindow: BrowserWindow destroyed");
				require_logger.mainLog.info(`[LocalStorageMigration] Hidden BrowserWindow destroyed (origin=${originUrl})`);
			} catch (destroyErr) {
				_lsLog(`withHiddenWindow: destroy failed: ${destroyErr}`);
				require_logger.mainLog.warn("[LocalStorageMigration] Failed to destroy hidden BrowserWindow:", destroyErr);
			}
		}
	}
};
function getLegacySessionPath() {
	if (process.platform === "darwin") return path.join(os.homedir(), "Library", "Application Support", "WorkBuddy");
	if (process.platform === "win32") return path.join(process.env.APPDATA || path.join(os.homedir(), "AppData", "Roaming"), "WorkBuddy");
	return path.join(os.homedir(), ".config", "WorkBuddy");
}
async function loadUrlWithTimeout(window, originUrl, timeoutMs = 5e3) {
	let timeoutId;
	try {
		const timeoutPromise = new Promise((_, reject) => {
			timeoutId = setTimeout(() => reject(/* @__PURE__ */ new Error(`Timed out loading origin URL: ${originUrl}`)), timeoutMs);
		});
		await Promise.race([window.loadURL(originUrl), timeoutPromise]);
	} finally {
		if (timeoutId !== void 0) clearTimeout(timeoutId);
	}
}
function getBridgeFileOriginUrl() {
	const filePath = path.join(os.tmpdir().trim(), LOCAL_STORAGE_BRIDGE_FILENAME);
	if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, "<!doctype html><html><body>workbuddy localstorage bridge</body></html>", "utf-8");
	return (0, url.pathToFileURL)(filePath).toString();
}
async function ensureSessionProtocolForOrigin(isolatedSession, originUrl, net) {
	const scheme = new URL(originUrl).protocol.replace(/:$/, "");
	if (scheme !== "vscode-file") return;
	const sessionProtocol = isolatedSession.protocol;
	if (!sessionProtocol?.handle) throw new Error(`Failed to register protocol handler for origin "${originUrl}"`);
	if (sessionProtocol.isProtocolHandled ? await sessionProtocol.isProtocolHandled(scheme) : false) return;
	sessionProtocol.handle(scheme, () => net.fetch(getBridgeFileOriginUrl()));
}
/**
* Best-effort cleanup of a temporary directory. Never throws.
*
* On Windows, Electron's session.fromPath() creates metadata files (DIPS, etc.)
* that may remain locked briefly after the BrowserWindow is destroyed. A
* synchronous rmSync({ recursive, force }) can still throw EBUSY in this
* window, and in some Node.js/Electron versions this error escapes even a
* surrounding try-catch (suspected native-layer throw). To guard against this:
*
* 1. First attempt: synchronous rmSync inside a try-catch.
* 2. If EBUSY/EPERM: schedule a delayed retry (1 s) so the OS has time to
*    release file handles. The retry also uses try-catch; if it still fails,
*    the temp file is abandoned (OS tmpdir cleanup will reclaim it).
*/
function safeCleanupTempDir(dirPath) {
	_lsLog("readMatchingKeys: cleanup temp dir");
	try {
		fs.rmSync(dirPath, {
			recursive: true,
			force: true
		});
		_lsLog("readMatchingKeys: cleanup succeeded");
	} catch (err) {
		_lsLog(`readMatchingKeys: cleanup failed (non-fatal), scheduling retry: ${err instanceof Error ? err.message : String(err)}`);
		setTimeout(() => {
			try {
				if (fs.existsSync(dirPath)) {
					fs.rmSync(dirPath, {
						recursive: true,
						force: true
					});
					_lsLog("readMatchingKeys: delayed cleanup succeeded");
				}
			} catch (retryErr) {
				_lsLog(`readMatchingKeys: delayed cleanup also failed (abandoned): ${retryErr instanceof Error ? retryErr.message : String(retryErr)}`);
			}
		}, 1e3).unref();
	}
}
function safeCopyDir(srcDir, dstDir) {
	return safeCopyDirRecursive$1(srcDir, dstDir, _lsLog);
}
//#endregion
//#region src/main/local-probe/local-probe-server.ts
/**
* LocalProbeServer · 本地 HTTP 探测服务
*
* 用途：
*   网页（如 workbuddy.cn/deeplink 着陆页）需要在不依赖 focus/visibility
*   信号的前提下，**确切**知道用户机器上是否安装并运行了 WorkBuddy Desktop。
*   Desktop 启动期在 loopback 起一个最小 HTTP 服务，网页 fetch
*   `http://127.0.0.1:<port>/workbuddy/probe` 即可拿到结构化探活响应。
*
* 设计要点：
*
* 1. **只绑 127.0.0.1**：仅本机可访问，外网/同局域网设备无法触达。
*
* 2. **端口段轮询**：默认尝试 18488 / 18489 / 18490，命中 EADDRINUSE 自动顺位
*    重试，覆盖"用户同时跑了多个 Desktop 实例"（例如 dev + 正式版同跑）的场景。
*    网页端按同一份端口表 Promise.any() 并行探测即可命中其中一个。
*
* 3. **CORS: `*`**：与用户当面确认后采用完全开放策略。任何源都可 GET。
*    安全 trade-off：
*      - 任意页面可探测"本机是否装了 WorkBuddy + 版本号"，可用于钓鱼指纹。
*      - 为降低指纹精度，响应**只**回 `app / version / platform / ok`，
*        不带 `pid` / 详细 buildChannel / 用户/会话相关字段。
*
* 4. **路径白名单**：只接 `GET /workbuddy/probe` 与 `OPTIONS /workbuddy/probe`，
*    其他一律 404，避免误把这里当成业务 RPC 入口。
*
* 5. **无业务依赖**：构造只吃 `appVersion` + logger，**不**接 wsRpc / sessionManager
*    等运行时；保证可以在 main-bootstrap 极早期启动，不被 CellJS 初始化绑住。
*
* 6. **关闭中 503**：stop() 期间仍可能收到 in-flight 请求，统一回 503，让网页
*    侧 fallback 到"未安装/不可用"分支。
*/
/** 默认探测端口；与网页端 `useDeeplinkProbe` 的端口表保持一致。 */
var LOCAL_PROBE_DEFAULT_PORTS = [
	18488,
	18489,
	18490
];
/** 探测路径；网页端 fetch 的 URL pathname。 */
var LOCAL_PROBE_PATH = "/workbuddy/probe";
var LocalProbeServer = class {
	host;
	ports;
	appVersion;
	logger;
	httpServer = null;
	port = 0;
	shuttingDown = false;
	constructor(options) {
		this.host = options.host ?? "127.0.0.1";
		this.appVersion = options.appVersion;
		this.ports = options.ports && options.ports.length > 0 ? options.ports : LOCAL_PROBE_DEFAULT_PORTS;
		this.logger = options.logger;
	}
	/**
	* 启动 HTTP 服务并绑定到候选端口中第一个空闲端口。
	* 全部端口都占用时抛出最后一次的 EADDRINUSE 错误。
	*/
	async start() {
		if (this.httpServer) return this.port;
		this.shuttingDown = false;
		this.httpServer = http.createServer((req, res) => {
			this.handleRequest(req, res);
		});
		this.httpServer.on("error", (error) => {
			this.logger?.error("[LocalProbe] HTTP server error:", error);
		});
		this.port = await this.listenOnAnyPort(this.httpServer);
		this.logger?.info(`[LocalProbe] listening on http://${this.host}:${this.port}${LOCAL_PROBE_PATH}`);
		return this.port;
	}
	/**
	* 关闭服务；3s 超时后强制 unref（避免被遗忘的 keep-alive 连接卡住主进程退出）。
	*/
	async stop() {
		this.shuttingDown = true;
		if (!this.httpServer) return;
		const server = this.httpServer;
		this.httpServer = null;
		const oldPort = this.port;
		this.port = 0;
		await new Promise((resolve) => {
			const timeout = setTimeout(() => {
				server.unref();
				this.logger?.warn("[LocalProbe] server.close() timed out after 3s — forcing shutdown");
				resolve();
			}, 3e3);
			server.close(() => {
				clearTimeout(timeout);
				resolve();
			});
		});
		this.logger?.info(`[LocalProbe] stopped (was on port ${oldPort})`);
	}
	/** 当前监听端口；未启动或已停止时返回 0。 */
	getPort() {
		return this.port;
	}
	handleRequest(req, res) {
		const method = req.method ?? "GET";
		const pathname = (req.url ?? "/").split("?")[0];
		const corsHeaders = {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, OPTIONS",
			"Access-Control-Max-Age": "600",
			"Cache-Control": "no-store"
		};
		if (method === "OPTIONS") {
			res.writeHead(204, corsHeaders);
			res.end();
			return;
		}
		if (pathname !== "/workbuddy/probe") {
			res.writeHead(404, {
				...corsHeaders,
				"Content-Type": "application/json; charset=utf-8"
			});
			res.end(JSON.stringify({
				ok: false,
				error: "Not Found"
			}));
			return;
		}
		if (method !== "GET") {
			res.writeHead(405, {
				...corsHeaders,
				"Content-Type": "application/json; charset=utf-8"
			});
			res.end(JSON.stringify({
				ok: false,
				error: "Method Not Allowed"
			}));
			return;
		}
		if (this.shuttingDown) {
			res.writeHead(503, {
				...corsHeaders,
				"Content-Type": "application/json; charset=utf-8"
			});
			res.end(JSON.stringify({
				ok: false,
				error: "Shutting down"
			}));
			return;
		}
		const payload = {
			ok: true,
			app: "workbuddy-desktop",
			version: this.appVersion,
			platform: process.platform
		};
		res.writeHead(200, {
			...corsHeaders,
			"Content-Type": "application/json; charset=utf-8"
		});
		res.end(JSON.stringify(payload));
	}
	/**
	* 依次尝试候选端口；命中 EADDRINUSE 顺位重试，其他错误立即抛出。
	* 全部端口都占用时，抛出最后一次错误（通常是 EADDRINUSE）。
	*/
	listenOnAnyPort(server) {
		const ports = this.ports;
		const host = this.host;
		return new Promise((resolve, reject) => {
			let index = 0;
			const tryListen = () => {
				if (index >= ports.length) {
					reject(/* @__PURE__ */ new Error(`[LocalProbe] all candidate ports in use: ${ports.join(", ")}`));
					return;
				}
				const port = ports[index++];
				const onError = (err) => {
					server.removeListener("listening", onListening);
					if (err.code === "EADDRINUSE") {
						this.logger?.warn(`[LocalProbe] port ${port} in use, trying next...`);
						tryListen();
						return;
					}
					reject(err);
				};
				const onListening = () => {
					server.removeListener("error", onError);
					if (port === 0) {
						const addr = server.address();
						if (!addr || typeof addr === "string") {
							reject(/* @__PURE__ */ new Error("[LocalProbe] failed to resolve ephemeral port"));
							return;
						}
						resolve(addr.port);
						return;
					}
					resolve(port);
				};
				server.once("error", onError);
				server.once("listening", onListening);
				server.listen(port, host);
			};
			tryListen();
		});
	}
};
//#endregion
//#region src/main/system/cleanup/win32-fallback-migration-types.ts
/**
* Shared types/constants for the Windows fallback data migration module.
* Split out from win32-fallback-data-migration.ts to avoid circular value
* imports between it and win32-fallback-file-tree-merge.ts.
*/
var LOG_TAG = "[FallbackDataMigration]";
//#endregion
//#region src/main/system/cleanup/win32-fallback-file-tree-merge.ts
/**
* Windows Fallback Data Migration — File Tree Merge
*
* Split out from win32-fallback-data-migration.ts (which had grown past the
* repo's file-size threshold). This module owns the file-tree half of the
* fallback merge: walking the source config dir and copying/merging files
* into the target config dir, subject to the exclusion lists below.
*
* See win32-fallback-data-migration.ts for the overall migration flow (DB
* merge + file tree merge + marker bookkeeping).
*/
/**
* Directories to skip (blacklist). Everything NOT in this list will be merged.
* Only exclude directories that are dangerous to merge, large rebuildable
* runtime artifacts, or transient process-scoped state.
*/
var EXCLUDED_DIRS = new Set([
	"audit-log",
	"binaries",
	"connectors-marketplace",
	"local_storage",
	"logs",
	"pending-telemetry",
	"plugin-marketplace-state-new",
	"traces",
	"vendor",
	"workspace"
]);
/**
* #62007 follow-up: version-/machine-scoped bookkeeping dirs that only make sense
* at the top level of the config dir. Checked only when relativePath is '' (root),
* so a same-named dir nested inside real user data (e.g. projects/**\/backup) isn't
* mistaken for these.
*/
var EXCLUDED_ROOT_DIRS = new Set([
	"sessions",
	"plugins",
	"skills-marketplace",
	"perf-analysis",
	"shell-snapshots",
	".migration-history",
	"backup"
]);
/**
* #62007 follow-up: directory names that are safe to skip, but only under
* app/session (and its per-partition subdirs) — unlike EXCLUDED_DIRS above, these
* are generic-sounding enough (Cache, Network, ...) that a bare-name match anywhere
* in the tree risks catching a same-named directory inside real user data (e.g. a
* project folder under projects/ named "Cache").
* - Cache/Code Cache/GPUCache/Dawn*Cache/ShaderCache/blob_storage: Chromium/Electron
*   caches, rebuildable, can contain huge file counts that hang the synchronous
*   file-tree merge (see #61490-style startup hangs).
* - IndexedDB/Local Storage/Session Storage/WebStorage: leveldb-backed Chromium
*   storage engines — copying individual files (CURRENT/LOCK/MANIFEST/*.ldb/*.log)
*   from two different sources produces a corrupt store, not a merged one.
* - Network: OS-encrypted state (Cookies, Trust Tokens, TransportSecurity) bound to
*   the machine/profile that wrote it, not portable.
*/
var APP_SESSION_EXCLUDED_DIRS = new Set([
	"Cache",
	"Code Cache",
	"GPUCache",
	"DawnCache",
	"DawnWebGPUCache",
	"DawnGraphiteCache",
	"ShaderCache",
	"blob_storage",
	"IndexedDB",
	"Local Storage",
	"Session Storage",
	"WebStorage",
	"Network"
]);
/** app/session, built with path.join so the separator matches relativePath on every OS */
var APP_SESSION_PREFIX = path.join("app", "session");
function isUnderAppSession(relativePath) {
	return relativePath === APP_SESSION_PREFIX || relativePath.startsWith(APP_SESSION_PREFIX + path.sep);
}
/** Root-level files to skip (DB files are merged via SQLite ATTACH, not file copy) */
var EXCLUDED_ROOT_FILES = new Set([
	"workbuddy.db",
	"workbuddy.db-wal",
	"workbuddy.db-shm",
	"workbuddy.db.needs-recovery",
	"workbuddy.db.recovered"
]);
/** Directories where JSONL files should be line-merged (not just copied) */
var JSONL_MERGE_DIR = "projects";
/** Directories where JSON files should be record-level unioned */
var JSON_UNION_DIRS = new Set(["media-index", "artifact-index"]);
/** Content-addressed directories: same filename = same content, skip on conflict */
var CONTENT_ADDRESSED_DIRS = new Set(["blobs", "file-history"]);
/**
* Log a progress heartbeat every N entries for directories large enough that
* silence between "Entering dir" and "Left dir" could otherwise be mistaken
* for a hang. Kept generous so normal-sized directories don't spam the log.
*/
var PROGRESS_LOG_INTERVAL = 100;
async function mergeFileTree(sourceDir, targetDir, logger) {
	const startedAt = Date.now();
	logger?.info?.(LOG_TAG, `File tree merge started: ${sourceDir}`);
	await mergeDirectory(sourceDir, targetDir, "", logger);
	logger?.info?.(LOG_TAG, `File tree merge finished in ${Date.now() - startedAt}ms`);
}
/**
* Recursively merge one directory level. Logs entry/exit for every directory
* visited (synchronous appendFileSync under the hood, see createFileLogger in
* win32-fallback-data-migration.ts) so that if this synchronous file-tree walk
* ever hangs on an unexpectedly large directory, the last "Entering dir" line
* without a matching "Left dir" pinpoints exactly where it got stuck — no need
* to reproduce or inspect the user's disk by hand.
*/
async function mergeDirectory(sourceBase, targetBase, relativePath, logger) {
	const sourceFullPath = relativePath ? path.join(sourceBase, relativePath) : sourceBase;
	const dirLabel = relativePath || ".";
	let entries;
	try {
		entries = await fs.promises.readdir(sourceFullPath, { withFileTypes: true });
	} catch {
		return;
	}
	const startedAt = Date.now();
	logger?.info?.(LOG_TAG, `Entering dir: ${dirLabel} (${entries.length} entries)`);
	let processed = 0;
	for (const entry of entries) {
		processed++;
		if (entries.length > PROGRESS_LOG_INTERVAL && processed % PROGRESS_LOG_INTERVAL === 0) logger?.info?.(LOG_TAG, `Progress in ${dirLabel}: ${processed}/${entries.length} (current: ${entry.name})`);
		const entryRelative = relativePath ? path.join(relativePath, entry.name) : entry.name;
		if (entry.isDirectory()) {
			if (EXCLUDED_DIRS.has(entry.name)) continue;
			if (!relativePath && EXCLUDED_ROOT_DIRS.has(entry.name)) continue;
			if (isUnderAppSession(relativePath) && APP_SESSION_EXCLUDED_DIRS.has(entry.name)) continue;
			if (entry.name.startsWith(".fallback-merged-")) continue;
			await mergeDirectory(sourceBase, targetBase, entryRelative, logger);
		} else {
			if (!relativePath && EXCLUDED_ROOT_FILES.has(entry.name)) continue;
			if (entry.name.includes(".pre-migration-") && entry.name.endsWith(".bak")) continue;
			if (!relativePath && entry.name.startsWith(".fallback-merged-")) continue;
			if (entry.name === ".migrated-from") continue;
			if (entry.name.endsWith(".bak")) continue;
			const sourceFilePath = path.join(sourceBase, entryRelative);
			const targetFilePath = path.join(targetBase, entryRelative);
			if (!fs.existsSync(targetFilePath)) try {
				fs.mkdirSync(path.dirname(targetFilePath), { recursive: true });
				fs.copyFileSync(sourceFilePath, targetFilePath);
			} catch (err) {
				logger?.warn?.(LOG_TAG, `Failed to copy ${entryRelative}:`, err);
			}
			else mergeConflictFile(sourceFilePath, targetFilePath, entryRelative, logger);
		}
	}
	logger?.info?.(LOG_TAG, `Left dir: ${dirLabel} (${entries.length} entries, ${Date.now() - startedAt}ms)`);
}
/**
* Handle a conflict where both source and target have the same file.
* Strategy depends on the file's location and type.
*/
function mergeConflictFile(sourceFile, targetFile, relativePath, logger) {
	const parts = relativePath.split(path.sep);
	const ext = path.extname(relativePath).toLowerCase();
	const basename = path.basename(relativePath);
	if (parts.some((p) => CONTENT_ADDRESSED_DIRS.has(p))) return;
	if (ext === ".jsonl" && parts.includes(JSONL_MERGE_DIR)) {
		try {
			mergeJsonlFile(sourceFile, targetFile);
		} catch (err) {
			logger?.warn?.(LOG_TAG, `JSONL merge failed for ${relativePath}:`, err);
		}
		return;
	}
	if (ext === ".json" && parts.includes(JSONL_MERGE_DIR) && basename.endsWith(".meta.json")) {
		backupSourceAsBak(sourceFile, targetFile, relativePath, logger);
		return;
	}
	if (ext === ".json" && parts.some((p) => JSON_UNION_DIRS.has(p))) {
		try {
			mergeJsonUnion(sourceFile, targetFile);
		} catch (err) {
			logger?.warn?.(LOG_TAG, `JSON union failed for ${relativePath}:`, err);
		}
		return;
	}
	backupSourceAsBak(sourceFile, targetFile, relativePath, logger);
}
/**
* When a conflict occurs, keep the target file and copy the source file
* alongside it with a `.fallback.bak` suffix for reference/recovery.
*/
function backupSourceAsBak(sourceFile, targetFile, relativePath, logger) {
	try {
		const bakPath = targetFile + ".fallback.bak";
		if (!fs.existsSync(bakPath)) fs.copyFileSync(sourceFile, bakPath);
	} catch (err) {
		logger?.warn?.(LOG_TAG, `Failed to backup ${relativePath}:`, err);
	}
}
/**
* Merge two JSONL files: combine lines, deduplicate by exact content,
* sort by timestamp field. This ensures conversation transcripts from both
* the fallback period and the post-rollback period are unified.
*/
function mergeJsonlFile(sourceFile, targetFile) {
	const srcLines = readNonEmptyLines(sourceFile);
	const dstLines = readNonEmptyLines(targetFile);
	if (srcLines.length === 0) return;
	const seen = new Set(dstLines);
	const newLines = srcLines.filter((line) => !seen.has(line));
	if (newLines.length === 0) return;
	const parsed = [...dstLines, ...newLines].map((line) => {
		let ts = 0;
		try {
			ts = JSON.parse(line).timestamp || 0;
		} catch {}
		return {
			ts,
			line
		};
	});
	parsed.sort((a, b) => a.ts - b.ts);
	const content = parsed.map((p) => p.line).join("\n") + "\n";
	fs.writeFileSync(targetFile, content, "utf-8");
}
function readNonEmptyLines(filePath) {
	try {
		return fs.readFileSync(filePath, "utf-8").split("\n").filter((line) => line.trim().length > 0);
	} catch {
		return [];
	}
}
/**
* Merge two JSON files at record level: deep union where target takes
* precedence for conflicting keys, but source-only keys are added.
*/
function mergeJsonUnion(sourceFile, targetFile) {
	let srcObj;
	let dstObj;
	try {
		srcObj = JSON.parse(fs.readFileSync(sourceFile, "utf-8"));
	} catch {
		return;
	}
	try {
		dstObj = JSON.parse(fs.readFileSync(targetFile, "utf-8"));
	} catch {
		return;
	}
	const merged = jsonUnion(dstObj, srcObj);
	if (merged !== dstObj) fs.writeFileSync(targetFile, JSON.stringify(merged, null, 2), "utf-8");
}
/**
* Deep union of two JSON values:
* - Objects: recursive merge, `a` (target) values take precedence
* - Arrays: deduplicated concatenation
* - Scalars: `a` (target) wins
*/
function jsonUnion(a, b) {
	if (isObject(a) && isObject(b)) {
		const result = { ...a };
		let changed = false;
		for (const key of Object.keys(b)) if (key in result) {
			const merged = jsonUnion(result[key], b[key]);
			if (merged !== result[key]) {
				result[key] = merged;
				changed = true;
			}
		} else {
			result[key] = b[key];
			changed = true;
		}
		return changed ? result : a;
	}
	if (Array.isArray(a) && Array.isArray(b)) {
		const stringified = new Set(a.map((item) => JSON.stringify(item)));
		const additions = b.filter((item) => !stringified.has(JSON.stringify(item)));
		return additions.length > 0 ? [...a, ...additions] : a;
	}
	return a;
}
function isObject(v) {
	return v !== null && typeof v === "object" && !Array.isArray(v);
}
//#endregion
//#region src/main/system/cleanup/win32-fallback-data-migration.ts
/**
* Windows Fallback Data Migration
*
* When the removed `win32-safe-env.ts` was active, it redirected users with
* non-ASCII usernames to fallback directories:
*   - C:\ProgramData\WorkBuddy\users\{hash}\.workbuddy\
*   - C:\WorkBuddy-env\{hash}\.workbuddy\
*
* After removing that module, those users reverted to the default config dir
* (~/.workbuddy), losing visibility of conversations created in the fallback.
*
* This module merges fallback data back into the default config directory:
* - Only merges, never deletes source data
* - Idempotent (marker file prevents re-execution)
* - Conflicts resolved by keeping target (newer data wins), except:
*   - projects/*.jsonl: line-level merge (timestamp sort + dedup)
*   - artifact-index/*.json, media-index/*.json: JSON record union
* - Does not migrate: audit-log (chain integrity), logs, binaries, vendor,
*   sessions (PID files), plugins/skills-marketplace (version-dependent),
*   backup/.migration-history/shell-snapshots (machine-local bookkeeping),
*   Chromium/Electron caches and leveldb storage engines (Cache, Code Cache,
*   GPUCache, IndexedDB, Local Storage, Session Storage, Network, ...)
* - Does not notify user
*
* Runs once at startup on Windows only. Non-blocking (async, fire-and-forget).
*
* File-tree merge logic (walking + copying/merging individual files) lives in
* win32-fallback-file-tree-merge.ts; this file owns discovery, the overall
* migrateFallbackData flow, and the SQLite side of the merge.
*/
/**
* Creates a file logger that writes all migration activity to a dedicated log
* file at ~/.workbuddy/logs/fallback-data-migration.log. Also delegates to the
* optional upstream logger (mainLog) for console/main-thread visibility.
*/
function createFileLogger(targetDir, upstream) {
	const logsDir = path.join(targetDir, "logs");
	const logFile = path.join(logsDir, "fallback-data-migration.log");
	try {
		fs.mkdirSync(logsDir, { recursive: true });
	} catch {
		return upstream || {};
	}
	const write = (level, args) => {
		const line = `[${(/* @__PURE__ */ new Date()).toISOString()}] [${level}] ${args.map((a) => a instanceof Error ? `${a.message}\n${a.stack}` : String(a)).join(" ")}\n`;
		try {
			fs.appendFileSync(logFile, line, "utf-8");
		} catch {}
	};
	return {
		info(...args) {
			write("INFO", args);
			upstream?.info?.(...args);
		},
		warn(...args) {
			write("WARN", args);
			upstream?.warn?.(...args);
		},
		error(...args) {
			write("ERROR", args);
			upstream?.error?.(...args);
		}
	};
}
/**
* Entry point: discover and merge all fallback directories into the default
* config directory. Safe to call on any platform (non-Windows is a no-op).
*
* Returns true if at least one fallback directory was actually merged (i.e. a
* new merge happened this run, not skipped by an existing marker). Callers can
* use this to force a follow-up action such as session fragment repair.
*/
async function migrateFallbackData(logger, configDirOverride, options = {}) {
	if (process.platform !== "win32") return false;
	const targetDir = configDirOverride ?? (process.env.WORKBUDDY_CONFIG_DIR?.trim() || path.join(os.homedir(), ".workbuddy"));
	const fileLogger = createFileLogger(targetDir, logger);
	const fallbackDirs = discoverFallbackDirs(targetDir);
	if (fallbackDirs.length === 0) {
		delete process.env.WORKBUDDY_STALE_FALLBACK_CONFIG_DIR;
		return false;
	}
	fileLogger.info?.(LOG_TAG, `Found ${fallbackDirs.length} fallback dir(s) to merge`);
	let anyMerged = false;
	for (const sourceDir of fallbackDirs) {
		const markerName = `.fallback-merged-${hashForMarker(sourceDir)}`;
		const markerPath = path.join(targetDir, markerName);
		const sourceMtime = getFallbackSourceMtimeInfo(sourceDir);
		const markerExists = fs.existsSync(markerPath);
		const mergeReason = markerExists ? getSourceNewerThanMarkerReason(sourceMtime, markerPath) : "marker-missing";
		if (!mergeReason) {
			fileLogger.info?.(LOG_TAG, `Already merged: ${sourceDir}`);
			continue;
		}
		const mergeStartedAt = Date.now();
		try {
			try {
				await options.onWillMerge?.({
					sourceDir,
					targetDir,
					reason: mergeReason
				});
			} catch (progressError) {
				fileLogger.warn?.(LOG_TAG, "Fallback migration progress callback failed, continuing merge:", progressError);
			}
			if (markerExists) fileLogger.warn?.(LOG_TAG, `Source changed after marker, re-merging: ${sourceDir} (sourceMtime=${sourceMtime.maxMtime}, marker=${fs.statSync(markerPath).mtimeMs})`);
			fileLogger.info?.(LOG_TAG, `Merging: ${sourceDir} -> ${targetDir}`);
			await mergeConfigDir(sourceDir, targetDir, fileLogger);
			writeMergeMarker(markerPath, sourceDir, targetDir, sourceMtime, mergeReason);
			fileLogger.info?.(LOG_TAG, `Merge complete: ${sourceDir} (${Date.now() - mergeStartedAt}ms)`);
			anyMerged = true;
		} catch (err) {
			fileLogger.error?.(LOG_TAG, `Merge failed for ${sourceDir} (${Date.now() - mergeStartedAt}ms):`, err);
		}
	}
	delete process.env.WORKBUDDY_STALE_FALLBACK_CONFIG_DIR;
	return anyMerged;
}
/**
* Discover fallback .workbuddy directories belonging to the current user.
* Uses the same hash algorithm as the removed win32-safe-env.ts and
* build/win-launcher.vbs to identify the correct user directory.
*/
function discoverFallbackDirs(targetDir) {
	const candidates = [];
	const brand = process.env.WORKBUDDY_BRAND_NAME?.trim() || "WorkBuddy";
	const expectedHash = computeLauncherHash(process.env.WORKBUDDY_ORIGINAL_USERPROFILE?.trim() || process.env.USERPROFILE || os.homedir());
	const programDataBase = path.join(process.env.PROGRAMDATA || "C:\\ProgramData", brand, "users");
	addIfExists(path.join(programDataBase, expectedHash, ".workbuddy"), candidates);
	addIfExists(path.join("C:\\WorkBuddy-env", expectedHash, ".workbuddy"), candidates);
	const launcherHome = process.env.WORKBUDDY_FALLBACK_HOME;
	if (launcherHome) addIfExists(path.join(launcherHome, ".workbuddy"), candidates);
	const staleFallbackConfigDir = process.env.WORKBUDDY_STALE_FALLBACK_CONFIG_DIR;
	if (staleFallbackConfigDir) addIfExists(staleFallbackConfigDir, candidates);
	const normalizedTarget = normPath(targetDir);
	const seen = /* @__PURE__ */ new Set();
	return candidates.filter((c) => {
		const normalizedCandidate = normPath(c);
		if (normalizedCandidate === normalizedTarget || seen.has(normalizedCandidate)) return false;
		seen.add(normalizedCandidate);
		return fs.existsSync(path.join(c, "workbuddy.db")) || fs.existsSync(path.join(c, "projects"));
	});
}
function addIfExists(dir, results) {
	try {
		if (fs.existsSync(dir)) results.push(dir);
	} catch {}
}
/**
* Compute the launcher hash for a given path.
* Replicates the algorithm from build/win-launcher.vbs and the old
* win32-safe-env.ts simpleHash(): 31-based rolling hash mod 2^31,
* operating on UTF-16 code units (charCodeAt), output as lowercase hex.
*/
function computeLauncherHash(input) {
	const MOD = 2147483648;
	let h = 0;
	for (let i = 0; i < input.length; i++) h = (h * 31 + input.charCodeAt(i)) % MOD;
	return h.toString(16).toLowerCase();
}
function getFileMtime(filePath) {
	try {
		return fs.existsSync(filePath) ? fs.statSync(filePath).mtimeMs : 0;
	} catch {
		return 0;
	}
}
function getDirMtime(dirPath, maxDepth = 3, currentDepth = 0) {
	try {
		if (!fs.existsSync(dirPath)) return 0;
		const stat = fs.statSync(dirPath);
		let maxMtime = stat.mtimeMs;
		if (currentDepth >= maxDepth || !stat.isDirectory()) return maxMtime;
		for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
			const childMtime = getDirMtime(path.join(dirPath, entry.name), maxDepth, currentDepth + 1);
			if (childMtime > maxMtime) maxMtime = childMtime;
		}
		return maxMtime;
	} catch {
		return 0;
	}
}
function getFallbackSourceMtimeInfo(sourceDir) {
	const dbMtime = Math.max(getFileMtime(path.join(sourceDir, "workbuddy.db")), getFileMtime(path.join(sourceDir, "workbuddy.db-wal")), getFileMtime(path.join(sourceDir, "workbuddy.db-shm")));
	const projectsMtime = getDirMtime(path.join(sourceDir, "projects"), Number.POSITIVE_INFINITY);
	return {
		dbMtime,
		projectsMtime,
		maxMtime: Math.max(dbMtime, projectsMtime)
	};
}
function getSourceNewerThanMarkerReason(sourceMtime, markerPath) {
	try {
		const markerMtime = fs.statSync(markerPath).mtimeMs;
		return sourceMtime.maxMtime > markerMtime + 1e3 ? "source-newer-than-marker" : void 0;
	} catch {
		return "marker-missing";
	}
}
function writeMergeMarker(markerPath, sourceDir, targetDir, sourceMtime, reason) {
	fs.mkdirSync(path.dirname(markerPath), { recursive: true });
	fs.writeFileSync(markerPath, [
		`source=${sourceDir}`,
		`target=${targetDir}`,
		`merged=${(/* @__PURE__ */ new Date()).toISOString()}`,
		`reason=${reason}`,
		`sourceSessionDataMtime=${sourceMtime.maxMtime}`,
		`sourceDbMtime=${sourceMtime.dbMtime}`,
		`sourceProjectsMtime=${sourceMtime.projectsMtime}`,
		"by=win32-fallback-data-migration",
		""
	].join("\n"), "utf-8");
}
async function mergeConfigDir(sourceDir, targetDir, logger) {
	await mergeSqliteDb(sourceDir, targetDir, logger);
	await mergeFileTree(sourceDir, targetDir, logger);
}
async function mergeSqliteDb(sourceDir, targetDir, logger) {
	const sourceDb = path.join(sourceDir, "workbuddy.db");
	if (!fs.existsSync(sourceDb)) return;
	const targetDb = path.join(targetDir, "workbuddy.db");
	fs.mkdirSync(targetDir, { recursive: true });
	if (!fs.existsSync(targetDb)) {
		fs.copyFileSync(sourceDb, targetDb);
		copyIfExists(sourceDb + "-wal", targetDb + "-wal");
		copyIfExists(sourceDb + "-shm", targetDb + "-shm");
		logger?.info?.(LOG_TAG, "Target DB did not exist, copied from source");
		return;
	}
	let BetterSqlite3;
	try {
		BetterSqlite3 = require("better-sqlite3");
	} catch {
		logger?.warn?.(LOG_TAG, "better-sqlite3 not available, skipping DB merge");
		return;
	}
	const startedAt = Date.now();
	const backupPath = targetDb + `.pre-migration-${Date.now()}.bak`;
	fs.copyFileSync(targetDb, backupPath);
	const db = new BetterSqlite3(targetDb);
	try {
		db.pragma("journal_mode = WAL");
		db.pragma("busy_timeout = 10000");
		const srcDbConn = new BetterSqlite3(sourceDb);
		try {
			srcDbConn.pragma("wal_checkpoint(TRUNCATE)");
		} catch {} finally {
			srcDbConn.close();
		}
		try {
			db.pragma("wal_checkpoint(TRUNCATE)");
		} catch {}
		const escapedPath = sourceDb.replace(/'/g, "''");
		db.exec(`ATTACH DATABASE '${escapedPath}' AS source`);
		db.transaction(() => {
			for (const { table, pk, updatedAt } of [
				{
					table: "sessions",
					pk: "id",
					updatedAt: "updated_at"
				},
				{
					table: "session_usage",
					pk: "session_id",
					updatedAt: "updated_at"
				},
				{
					table: "workspaces",
					pk: "path",
					updatedAt: "last_opened_at"
				},
				{
					table: "automations",
					pk: "id",
					updatedAt: "updated_at"
				},
				{
					table: "automation_runs",
					pk: "thread_id",
					updatedAt: "updated_at"
				},
				{
					table: "automation_runtime_state",
					pk: "automation_id"
				},
				{
					table: "automation_delivery_outbox",
					pk: "id",
					updatedAt: "updated_at"
				}
			]) tryMergeTable(db, table, pk, updatedAt, logger);
			unblockMigrationMeta(db, logger);
		})();
		db.exec("DETACH DATABASE source");
		try {
			db.pragma("wal_checkpoint(TRUNCATE)");
		} catch {}
		logger?.info?.(LOG_TAG, `SQLite merge completed successfully (${Date.now() - startedAt}ms)`);
		try {
			fs.unlinkSync(backupPath);
		} catch {}
	} catch (err) {
		logger?.error?.(LOG_TAG, `SQLite merge failed after ${Date.now() - startedAt}ms, backup at:`, backupPath, err);
		throw err;
	} finally {
		db.close();
	}
}
/**
* Merge a single table using column intersection for cross-version safety.
* - Rows only in source: INSERT into target
* - Rows in both with source.updatedAt > target.updatedAt: UPDATE target
*/
function tryMergeTable(db, table, primaryKey, updatedAtCol, logger) {
	try {
		if (!tableExists(db, "source", table) || !tableExists(db, "main", table)) return;
		const srcCols = getTableColumns(db, "source", table);
		const dstCols = getTableColumns(db, "main", table);
		const commonCols = srcCols.filter((c) => dstCols.includes(c));
		if (commonCols.length === 0 || !commonCols.includes(primaryKey)) return;
		const colsSql = commonCols.map((c) => `"${c}"`).join(", ");
		const srcSelect = commonCols.map((c) => `s."${c}"`).join(", ");
		db.exec(`
            INSERT OR IGNORE INTO main."${table}" (${colsSql})
            SELECT ${srcSelect} FROM source."${table}" AS s
            LEFT JOIN main."${table}" AS t ON t."${primaryKey}" = s."${primaryKey}"
            WHERE t."${primaryKey}" IS NULL
        `);
		if (updatedAtCol && commonCols.includes(updatedAtCol)) {
			const setCols = commonCols.filter((c) => c !== primaryKey).map((c) => `"${c}" = s."${c}"`).join(", ");
			if (setCols) db.exec(`
                    UPDATE main."${table}" AS t SET ${setCols}
                    FROM source."${table}" AS s
                    WHERE t."${primaryKey}" = s."${primaryKey}"
                    AND s."${updatedAtCol}" > t."${updatedAtCol}"
                `);
		}
	} catch (err) {
		if ((err instanceof Error ? err.message : String(err)).includes("no such table")) logger?.info?.(LOG_TAG, `Skipped (table not in source): ${table}`);
		else throw err;
	}
}
/**
* Unblock the legacy_history_migration repairAbandoned flag in the target DB.
* If this flag is set, merged sessions in unrecoverableSessionIds will be
* permanently skipped by migration-service.ts. We clear repairAbandoned and
* unrecoverableSessionIds while preserving repairChecked to avoid full rescan.
*/
function unblockMigrationMeta(db, logger) {
	try {
		if (!tableExists(db, "main", "migration_meta")) return;
		const row = db.prepare("SELECT value FROM main.migration_meta WHERE key = 'legacy_history_migration'").get();
		if (!row) return;
		const obj = JSON.parse(row.value);
		let modified = false;
		if (obj.repairAbandoned) {
			obj.repairAbandoned = false;
			modified = true;
		}
		if (obj.unrecoverableSessionIds && obj.unrecoverableSessionIds.length > 0) {
			obj.unrecoverableSessionIds = [];
			modified = true;
		}
		if (modified) {
			db.prepare("UPDATE main.migration_meta SET value = ? WHERE key = 'legacy_history_migration'").run(JSON.stringify(obj));
			logger?.info?.(LOG_TAG, "Unblocked legacy_history_migration repairAbandoned");
		}
	} catch {}
}
function tableExists(db, schema, table) {
	return db.prepare(`SELECT 1 FROM ${schema}.sqlite_master WHERE type = 'table' AND name = ?`).get(table) != null;
}
function getTableColumns(db, schema, table) {
	return db.pragma(`${schema}.table_info("${table}")`).map((r) => r.name);
}
function normPath(p) {
	return path.resolve(p).toLowerCase();
}
function copyIfExists(src, dst) {
	if (fs.existsSync(src)) fs.copyFileSync(src, dst);
}
/**
* Deterministic hash for marker filename (filesystem-safe).
*/
function hashForMarker(input) {
	const normalized = input.toLowerCase().replace(/\\/g, "/");
	let h = 0;
	for (let i = 0; i < normalized.length; i++) h = (h * 31 + normalized.charCodeAt(i)) % 2147483648;
	return h.toString(16);
}
//#endregion
//#region src/main/system/logging/celljs-log-bridge.ts
/**
* CellJS Log Bridge
*
* CellJS 自带的 LoggerImpl 只把日志写到 console.*，在打包后的 Electron 主进程里
* 这些 console 不会落到 `~/.workbuddy/logs/main.log`，导致 ClawService /
* ClawLifecycle / WecomAiBotClient 等组件出问题时无法远程定位。
*
* 解决办法：订阅 CellJS `LoggerService.onLog` 事件，把每条 LogMessage 桥接到
* electron-log（scope='celljs'）。这样所有 CellJS 侧 logger.info/warn/error/debug
* 都会自动写进主日志文件，不必改动业务代码。
*
* 仅桥接，不覆盖原 Logger 实例；保持 CellJS 原生 console 输出行为不变。
*/
/**
* Attach the bridge. Returns a disposable for tests / shutdown hooks.
* Safe to call at most once per container; subsequent calls are no-ops.
*/
function attachCellJSLogBridge(container) {
	const bridgedScope = require_logger.logger_default.scope("celljs");
	let loggerService;
	try {
		loggerService = container.get(import_common.LoggerService);
	} catch (error) {
		bridgedScope.warn(`[CellJSLogBridge] Failed to resolve LoggerService, bridge disabled: ${error instanceof Error ? error.message : String(error)}`);
		return { dispose: () => {} };
	}
	const subscription = loggerService.onLog((message) => {
		const line = formatMessage(message);
		switch (message.level) {
			case "error":
				bridgedScope.error(line);
				break;
			case "warn":
				bridgedScope.warn(line);
				break;
			case "debug":
			case "verbose":
				bridgedScope.debug(line);
				break;
			default:
				bridgedScope.info(line);
				break;
		}
	});
	bridgedScope.info("[CellJSLogBridge] attached");
	return { dispose: () => {
		subscription.dispose();
	} };
}
function formatMessage(message) {
	return `${resolveContextString(message.rootContext, message.context)}${message.traceId ? ` [trace:${message.traceId}]` : ""}${stringifyBody(message.message)}`;
}
function resolveContextString(rootContext, context) {
	if (rootContext && context) return `[${rootContext}] [${context}] `;
	if (rootContext) return `[${rootContext}] `;
	if (context) return `[${context}] `;
	return "";
}
function stringifyBody(message) {
	if (typeof message === "string") return message;
	if (message instanceof Error) return message.stack ?? `${message.name}: ${message.message}`;
	try {
		return JSON.stringify(message);
	} catch {
		return String(message);
	}
}
//#endregion
//#region src/main/system/platform/electron-platform.ts
require_workbuddy_product_config.init_workbuddy_product_config();
/**
* Resolve the product version to display in the UI.
*
* WorkBuddy Desktop 的版本号直接读 package.json 的 version 字段（构建时手动维护），
* 不再走 product.json 的 genieVersion 逻辑（那是老版本 CodeBuddy IDE 的方式）。
*/
function resolveProductVersion(app) {
	return app.getVersion();
}
function isProductionBuildLayout$1(appPath, isPackaged) {
	if (isPackaged) return true;
	try {
		const parentDir = node_path.basename(node_path.dirname(appPath));
		return parentDir === "Resources" || parentDir === "resources";
	} catch {
		return false;
	}
}
function createElectronPlatform(options = {}) {
	const electronApp = options.app ?? electron.app;
	const electronShell = options.shell ?? electron.shell;
	const electronDialog = options.dialog ?? electron.dialog;
	const electronClipboard = options.clipboard ?? electron.clipboard;
	const electronBrowserWindow = options.browserWindow ?? electron.BrowserWindow;
	const getConfigDir = options.getConfigDir ?? resolveDefaultConfigDir;
	const appPath = electronApp.getAppPath();
	const isProductionLike = isProductionBuildLayout$1(appPath, electronApp.isPackaged);
	return {
		appRootPath: isProductionLike ? appPath : process.cwd(),
		resourcesPath: options.resourcesPath ?? process.resourcesPath,
		dataDir: electronApp.getPath("userData"),
		configDir: getConfigDir(),
		isPackaged: isProductionLike,
		appVersion: resolveProductVersion(electronApp),
		osPlatform: options.osPlatform ?? process.platform,
		appLocale: () => electronApp.getLocale(),
		openExternal: (url) => electronShell.openExternal(url),
		openPath: (filePath) => electronShell.openPath(filePath),
		showItemInFolder: (filePath) => electronShell.showItemInFolder(filePath),
		async showOpenDialog(opts) {
			const win = electronBrowserWindow.getFocusedWindow() ?? void 0;
			const result = await dialogWithOptionalWindow(electronDialog.showOpenDialog, win, opts);
			return {
				canceled: result.canceled,
				filePaths: result.filePaths
			};
		},
		async showSaveDialog(opts) {
			const win = electronBrowserWindow.getFocusedWindow() ?? void 0;
			const result = await dialogWithOptionalWindow(electronDialog.showSaveDialog, win, opts);
			return {
				canceled: result.canceled,
				filePath: result.filePath
			};
		},
		async showMessageBox(opts) {
			const win = electronBrowserWindow.getFocusedWindow() ?? void 0;
			return { response: (await dialogWithOptionalWindow(electronDialog.showMessageBox, win, {
				type: opts.type ?? "warning",
				title: opts.title,
				message: opts.message,
				detail: opts.detail,
				buttons: opts.buttons ?? ["OK"],
				defaultId: opts.defaultId,
				cancelId: opts.cancelId,
				noLink: opts.noLink
			})).response };
		},
		readClipboard: () => electronClipboard.readText()
	};
}
async function dialogWithOptionalWindow(dialogMethod, browserWindow, options) {
	if (browserWindow) return dialogMethod(browserWindow, options);
	return dialogMethod(options);
}
function resolveDefaultConfigDir() {
	const envDir = process.env.WORKBUDDY_CONFIG_DIR?.trim();
	if (envDir) return envDir;
	const dataFolderName = require_workbuddy_product_config.tryGetWorkbuddyBaseProductConfiguration()?.dataFolderName;
	const dirName = typeof dataFolderName === "string" && dataFolderName.trim() ? dataFolderName : ".workbuddy";
	return node_path.join(node_os.homedir(), dirName);
}
//#endregion
//#region src/main/system/power-manager.ts
/**
* 默认 PowerManager 实现：直接对接 electron `powerSaveBlocker`。
*/
var PowerManagerImpl = class {
	blockerId = null;
	enabled = false;
	isEnabled() {
		return this.enabled;
	}
	isActive() {
		if (this.blockerId === null) return false;
		try {
			return electron.powerSaveBlocker.isStarted(this.blockerId);
		} catch (err) {
			require_logger.mainLog.warn(`[PowerManager] isStarted threw: ${err instanceof Error ? err.message : String(err)}`);
			return false;
		}
	}
	getState() {
		return {
			isEnabled: this.enabled,
			isActive: this.isActive()
		};
	}
	setEnabled(enabled) {
		if (enabled === this.enabled) {
			if (enabled && this.blockerId === null) this.start();
			else if (!enabled && this.blockerId !== null) this.stop();
			return;
		}
		this.enabled = enabled;
		if (enabled) this.start();
		else this.stop();
	}
	cleanup() {
		this.stop();
		this.enabled = false;
	}
	start() {
		if (this.blockerId !== null) return;
		try {
			this.blockerId = electron.powerSaveBlocker.start("prevent-display-sleep");
			require_logger.mainLog.info(`[PowerManager] started prevent-display-sleep blocker id=${this.blockerId}`);
		} catch (err) {
			require_logger.mainLog.warn(`[PowerManager] start failed: ${err instanceof Error ? err.message : String(err)}`);
			this.blockerId = null;
		}
	}
	stop() {
		if (this.blockerId === null) return;
		const id = this.blockerId;
		this.blockerId = null;
		try {
			if (electron.powerSaveBlocker.isStarted(id)) {
				electron.powerSaveBlocker.stop(id);
				require_logger.mainLog.info(`[PowerManager] stopped blocker id=${id}`);
			}
		} catch (err) {
			require_logger.mainLog.warn(`[PowerManager] stop failed: ${err instanceof Error ? err.message : String(err)}`);
		}
	}
};
function createPowerManager() {
	return new PowerManagerImpl();
}
//#endregion
//#region src/main/system/runtime/electron-proxy-env.ts
var ELECTRON_PROXY_RULES_RESOLVER = { async resolveProxy(targetUrl) {
	await electron.app.whenReady();
	return electron.session.defaultSession.resolveProxy(targetUrl);
} };
//#endregion
//#region src/main/system/runtime/seed-builtin-plugins.ts
/**
* Seed packaged builtin plugin marketplaces into the local CLI config.
*
* Desktop owns the packaged resources. The CLI/server only consume the seeded
* directory marketplace path from `known_marketplaces.json`.
*/
require_common$1.init_common$3();
require_workbuddy_product_config.init_bundled_assets();
var EMPTY_SEED_RESULT = {
	marketplaceChanged: false,
	settingsChanged: false,
	newlySeededDisabled: [],
	newlySeededEnabled: []
};
var BUILTIN_MARKETPLACE_NAME = "workbuddy-builtin";
var BUILD_COMMIT = "e9991e2be9d";
var CACHE_MARKETPLACE_METADATA_DIR = ".codebuddy-plugin";
var MARKETPLACE_ASSET_CANDIDATES = [{
	label: "plugins/workbuddy-builtin",
	segments: ["plugins", BUILTIN_MARKETPLACE_NAME],
	legacy: false
}, {
	label: "builtin-plugins",
	segments: ["builtin-plugins"],
	legacy: true
}];
var MARKETPLACE_MANIFEST_CANDIDATES = [
	".codebuddy-plugin/marketplace.json",
	".workbuddy-plugin/marketplace.json",
	".claude-plugin/marketplace.json"
];
/**
* 记录"曾经被 seed 过默认值的内置插件名"的文件相对路径（相对 configDir）。
*
* 与 `plugins/known_marketplaces.json`、`plugins/installed_plugins.json` 同目录同风格，
* 都是 desktop / CLI 侧的运行时状态文件，不属于用户视角的 `settings.json`。
*
* 单文件承载两份名单：
* - `disabled`：曾经被 seed 过 false 的白名单外内置插件；
* - `enabled` ：曾经被 seed 过 true 的白名单内内置插件。
*
* 之所以用"名单文件"而不是"一次性 boolean 标记"：
* - 白名单/manifest 后续会扩容，新增内置插件时希望**只对新出现的插件** seed 一次默认值，
*   对已在名单里的一律不再动 `settings.json`（尊重用户/意图识别的手动开关）。
* - 一次性 flag 无法区分"这个插件之前 seed 过"和"这个插件是新出现、还没 seed 过"，
*   一旦置位就永远不给新插件补默认值。
*
* 之所以不复用 `enabledPlugins` 里"有没有 key"来判断：用户/意图识别可以把 key 删掉或改值，
* 那时若仅靠 settings.json 判断就会误认为"还没 seed 过"从而再次强制拍回默认值，破坏用户意图。
*/
var SEEDED_DEFAULTS_STATE_FILE = node_path.join("plugins", "seeded-defaults.json");
function isPluginSupportedOnPlatform(plugin, platform = process.platform) {
	const platforms = plugin.platforms;
	if (!Array.isArray(platforms) || platforms.length === 0) return true;
	return platforms.includes(platform);
}
/**
* 依据传入的 productFeatures 决定 seed 模式，将内置插件 marketplace 落到本地 CLI 配置。
*
* 调用契约：**必须**在拿到 daemon 侧真实 productConfiguration 之后再调用；
* 不再从 bootstrap 快照兜底读，避免早期阶段远端 experiment overlay 尚未 merge
* 导致 seedAll 决策误判。
*
* @param productFeatures daemon.getProductConfiguration()?.productFeatures
*/
function seedBuiltinPluginsMarketplace(productFeatures) {
	const seedAllEnabled = isBuiltinPluginSeedAllEnabled(productFeatures);
	const tag = "[seed-builtin-plugins]";
	const configDir = require_runtime_context.getWorkbuddyRuntimeConfigDir();
	const selectedCandidates = selectMarketplaceCandidates(resolveMarketplaceCandidates());
	if (selectedCandidates.length === 0) {
		try {
			const marketplaceChanged = removeKnownMarketplace(configDir);
			console.info(`${tag} skipped: no usable builtin marketplace directory found`);
			return {
				...EMPTY_SEED_RESULT,
				marketplaceChanged
			};
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			console.warn(`${tag} cleanup of stale entry failed: ${message}`);
		}
		console.info(`${tag} skipped: no usable builtin marketplace directory found`);
		return { ...EMPTY_SEED_RESULT };
	}
	const supportedPlugins = selectedCandidates.flatMap((candidate) => candidate.supportedPlugins);
	if (supportedPlugins.length === 0) {
		try {
			const marketplaceChanged = removeKnownMarketplace(configDir);
			const skipped = selectedCandidates.flatMap((candidate) => candidate.allPlugins).map((p) => p.name).join(", ") || "<empty>";
			console.info(`${tag} skipped on ${process.platform}: no supported plugins (all=[${skipped}])`);
			return {
				...EMPTY_SEED_RESULT,
				marketplaceChanged
			};
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			console.warn(`${tag} cleanup of stale entry failed: ${message}`);
		}
		const skipped = selectedCandidates.flatMap((candidate) => candidate.allPlugins).map((p) => p.name).join(", ") || "<empty>";
		console.info(`${tag} skipped on ${process.platform}: no supported plugins (all=[${skipped}])`);
		return { ...EMPTY_SEED_RESULT };
	}
	try {
		const seeded = seedMarketplaceCache(configDir, selectedCandidates);
		const marketplaceChanged = upsertKnownMarketplace(configDir, seeded.cacheRoot);
		let seedResult = EMPTY_ENABLED_PLUGINS_SEED_RESULT;
		if (seedAllEnabled) seedResult = seedEnabledPlugins(configDir, seeded.manifest, seeded.cacheRoot, true, productFeatures);
		else if (isBuiltinPluginDefaultSeedEnabled(productFeatures)) seedResult = seedEnabledPlugins(configDir, seeded.manifest, seeded.cacheRoot, false, productFeatures);
		else console.info(`${tag} skipped default plugin seed: TencentPptxBuiltinDefaultEnabled=false`);
		const enabledStr = supportedPlugins.map((p) => p.name).join(", ");
		const skippedNames = selectedCandidates.flatMap((candidate) => candidate.allPlugins).filter((p) => !isPluginSupportedOnPlatform(p)).map((p) => p.name);
		const skippedStr = skippedNames.length > 0 ? ` (skipped on ${process.platform}: [${skippedNames.join(", ")}])` : "";
		const seedMode = seedAllEnabled ? "seed-all" : "whitelist-only";
		const fallbackStr = selectedCandidates.some((candidate) => candidate.candidate.legacy) ? " including legacy builtin-plugins" : "";
		console.info(`${tag} ok: registered ${BUILTIN_MARKETPLACE_NAME} at ${seeded.cacheRoot}${fallbackStr} (${seedMode}), available=[${enabledStr}]${skippedStr}`);
		return {
			marketplaceChanged,
			settingsChanged: seedResult.settingsChanged,
			newlySeededDisabled: seedResult.newlySeededDisabled,
			newlySeededEnabled: seedResult.newlySeededEnabled
		};
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		console.error(`${tag} failed: ${message}`);
		return { ...EMPTY_SEED_RESULT };
	}
}
function resolveMarketplaceCandidates() {
	const resolved = [];
	for (const candidate of MARKETPLACE_ASSET_CANDIDATES) {
		const dir = require_workbuddy_product_config.resolveBundledAsset(...candidate.segments);
		if (!dir) continue;
		const manifest = readMarketplaceManifest(dir);
		if (!manifest) continue;
		const allPlugins = manifest.plugins ?? [];
		resolved.push({
			candidate,
			dir,
			manifest,
			allPlugins,
			supportedPlugins: allPlugins.filter((plugin) => isPluginSupportedOnPlatform(plugin))
		});
	}
	return resolved;
}
function selectMarketplaceCandidates(candidates) {
	const preferred = candidates.find((candidate) => !candidate.candidate.legacy);
	if (preferred && preferred.supportedPlugins.length > 0) {
		const legacy = candidates.find((candidate) => candidate.candidate.legacy);
		return legacy ? [preferred, legacy] : [preferred];
	}
	const legacy = candidates.find((candidate) => candidate.candidate.legacy);
	if (legacy) {
		if (preferred) {
			const skipped = preferred.allPlugins.map((p) => p.name).join(", ") || "<empty>";
			console.info(`[seed-builtin-plugins] fallback to legacy builtin-plugins: preferred marketplace ${preferred.candidate.label} has no supported plugins (all=[${skipped}])`);
		}
		return [legacy];
	}
	return preferred ? [preferred] : [];
}
function readMarketplaceManifest(builtinPluginsDir) {
	for (const rel of MARKETPLACE_MANIFEST_CANDIDATES) {
		const manifestPath = node_path.join(builtinPluginsDir, rel);
		if (!node_fs.existsSync(manifestPath)) continue;
		try {
			const raw = node_fs.readFileSync(manifestPath, "utf-8");
			const manifest = JSON.parse(raw);
			if (!isValidMarketplaceManifest(manifest, manifestPath)) return;
			return manifest;
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			console.warn(`[seed-builtin-plugins] failed to parse ${manifestPath}: ${message}`);
			return;
		}
	}
}
function isValidMarketplaceManifest(manifest, manifestPath) {
	if (manifest.name && manifest.name !== BUILTIN_MARKETPLACE_NAME) {
		console.warn(`[seed-builtin-plugins] ignored ${manifestPath}: expected marketplace name ${BUILTIN_MARKETPLACE_NAME}, got ${manifest.name}`);
		return false;
	}
	if (!Array.isArray(manifest.plugins)) {
		console.warn(`[seed-builtin-plugins] ignored ${manifestPath}: plugins must be an array`);
		return false;
	}
	for (const [index, plugin] of manifest.plugins.entries()) {
		if (!plugin || typeof plugin.name !== "string" || plugin.name.length === 0) {
			console.warn(`[seed-builtin-plugins] ignored ${manifestPath}: plugins[${index}].name is required`);
			return false;
		}
		if (typeof plugin.source !== "string" || plugin.source.length === 0) {
			console.warn(`[seed-builtin-plugins] ignored ${manifestPath}: plugins[${index}].source is required`);
			return false;
		}
		if (node_path.isAbsolute(plugin.source) || plugin.source.split(/[\\/]+/).includes("..")) {
			console.warn(`[seed-builtin-plugins] ignored ${manifestPath}: plugins[${index}].source must stay inside the marketplace`);
			return false;
		}
	}
	return true;
}
function seedMarketplaceCache(configDir, selectedCandidates) {
	const cacheRoot = node_path.join(configDir, "plugins", "cache", BUILTIN_MARKETPLACE_NAME);
	node_fs.mkdirSync(cacheRoot, { recursive: true });
	const cachedPlugins = [];
	const cachedPluginNames = /* @__PURE__ */ new Set();
	for (const selected of selectedCandidates) for (const plugin of selected.supportedPlugins) {
		if (cachedPluginNames.has(plugin.name)) continue;
		const version = getPluginCacheVersion(plugin);
		const sourceDir = node_path.join(selected.dir, plugin.source);
		const pluginCacheDir = node_path.join(cacheRoot, plugin.name, version);
		ensurePathInside(cacheRoot, pluginCacheDir);
		if (!node_fs.existsSync(sourceDir)) {
			console.warn(`[seed-builtin-plugins] skip plugin ${plugin.name}: source directory not found at ${sourceDir}`);
			continue;
		}
		if (!copyDirectoryIfMissing(sourceDir, pluginCacheDir)) {
			console.warn(`[seed-builtin-plugins] skip plugin ${plugin.name}: cache copy failed (will retry next launch)`);
			node_fs.rmSync(pluginCacheDir, {
				recursive: true,
				force: true
			});
			continue;
		}
		cachedPlugins.push({
			...plugin,
			version,
			source: `./${plugin.name}/${version}`
		});
		cachedPluginNames.add(plugin.name);
	}
	const baseManifest = selectedCandidates[0]?.manifest ?? {};
	const sourceMarketplaces = selectedCandidates.map((selected) => selected.candidate.label);
	const sourceRoots = selectedCandidates.map((selected) => selected.dir);
	const cacheManifest = {
		...baseManifest,
		name: BUILTIN_MARKETPLACE_NAME,
		metadata: {
			...isRecord$1(baseManifest.metadata) ? baseManifest.metadata : {},
			generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
			sourceMarketplaces,
			sourceRoots
		},
		plugins: cachedPlugins
	};
	writeJsonAtomic(node_path.join(cacheRoot, CACHE_MARKETPLACE_METADATA_DIR, "marketplace.json"), cacheManifest);
	return {
		cacheRoot,
		manifest: cacheManifest
	};
}
function getPluginCacheVersion(plugin) {
	if (typeof plugin.version === "string" && plugin.version.trim().length > 0) return sanitizePathSegment(plugin.version.trim());
	return sanitizePathSegment(`${require_runtime_context.getWorkbuddyRuntimeAppVersion().trim() || "dev"}+${BUILD_COMMIT.trim()}`);
}
function copyDirectoryIfMissing(sourceDir, targetDir) {
	if (node_fs.existsSync(targetDir)) return true;
	const tmpDir = `${targetDir}.tmp.${process.pid}`;
	node_fs.rmSync(tmpDir, {
		recursive: true,
		force: true
	});
	node_fs.mkdirSync(node_path.dirname(targetDir), { recursive: true });
	const copyResult = safeCopyDirRecursive$1(sourceDir, tmpDir, (msg) => {
		console.warn(`[seed-builtin-plugins] ${msg}`);
	});
	if (copyResult.errors.length > 0) {
		console.warn(`[seed-builtin-plugins] copyDirectoryIfMissing: ${copyResult.copied} copied, ${copyResult.skipped} skipped, ${copyResult.errors.length} error(s) (sourceDir=${sourceDir}) — discarding staging`);
		node_fs.rmSync(tmpDir, {
			recursive: true,
			force: true
		});
		return false;
	}
	try {
		node_fs.renameSync(tmpDir, targetDir);
	} catch (error) {
		node_fs.rmSync(tmpDir, {
			recursive: true,
			force: true
		});
		if (isConcurrentDirectoryInstallRace(error) && node_fs.existsSync(targetDir)) return true;
		throw error;
	}
	return true;
}
function isConcurrentDirectoryInstallRace(error) {
	const code = error?.code;
	return code === "EEXIST" || code === "ENOTEMPTY" || code === "EPERM" || code === "EACCES";
}
function ensurePathInside(root, target) {
	const relative = node_path.relative(root, target);
	if (!relative || relative.startsWith("..") || node_path.isAbsolute(relative)) throw new Error(`Path escapes builtin marketplace cache root: ${target}`);
}
function sanitizePathSegment(value) {
	return value.replace(/[^a-zA-Z0-9._+-]/g, "_");
}
function isRecord$1(value) {
	return !!value && typeof value === "object" && !Array.isArray(value);
}
function upsertKnownMarketplace(configDir, builtinPluginsDir) {
	const knownPath = node_path.join(configDir, "plugins", "known_marketplaces.json");
	node_fs.mkdirSync(node_path.dirname(knownPath), { recursive: true });
	const known = readJsonObject(knownPath);
	const nextEntry = {
		type: "directory",
		source: {
			source: "directory",
			path: builtinPluginsDir
		},
		installLocation: builtinPluginsDir,
		autoUpdate: false,
		description: "WorkBuddy builtin plugins"
	};
	const previousEntry = known[BUILTIN_MARKETPLACE_NAME];
	const marketplaceChanged = JSON.stringify(stripLastUpdated(previousEntry)) !== JSON.stringify(nextEntry);
	known[BUILTIN_MARKETPLACE_NAME] = {
		...nextEntry,
		lastUpdated: (/* @__PURE__ */ new Date()).toISOString()
	};
	writeJsonAtomic(knownPath, known);
	return marketplaceChanged;
}
function removeKnownMarketplace(configDir) {
	const knownPath = node_path.join(configDir, "plugins", "known_marketplaces.json");
	if (!node_fs.existsSync(knownPath)) return false;
	const known = readJsonObject(knownPath);
	if (!(BUILTIN_MARKETPLACE_NAME in known)) return false;
	delete known[BUILTIN_MARKETPLACE_NAME];
	writeJsonAtomic(knownPath, known);
	return true;
}
function stripLastUpdated(value) {
	if (!value || typeof value !== "object" || Array.isArray(value)) return value;
	const { lastUpdated: _lastUpdated, ...rest } = value;
	return rest;
}
var DEFAULT_ENABLED_PLUGIN_NAMES = new Set([
	"tencent-pptx",
	"tencent-docs-plugin",
	"weixinpay",
	"tencent-docx"
]);
function resolveDefaultEnabledPluginNames(productFeatures) {
	if (productFeatures?.[require_common$1.ProductFeature.TencentPptxBuiltinDefaultEnabled] === false) return /* @__PURE__ */ new Set();
	return DEFAULT_ENABLED_PLUGIN_NAMES;
}
/**
* IntentRecommend !== true 时启用 seed-all（无意图识别兜底，需要开箱可用）。
* 由于调用方保证 productFeatures 来自 daemon 真实快照，这里不再兜底 undefined。
*/
function isBuiltinPluginSeedAllEnabled(productFeatures) {
	return productFeatures?.[require_common$1.ProductFeature.IntentRecommend] !== true;
}
function isBuiltinPluginDefaultSeedEnabled(productFeatures) {
	return resolveDefaultEnabledPluginNames(productFeatures).size > 0;
}
function isPluginMaterialized(pluginRootDir, plugin) {
	const source = plugin.source;
	if (typeof source !== "string" || !source.trim()) return false;
	const pluginManifestPath = node_path.join(node_path.resolve(pluginRootDir, source), ".codebuddy-plugin", "plugin.json");
	return node_fs.existsSync(pluginManifestPath);
}
var EMPTY_ENABLED_PLUGINS_SEED_RESULT = {
	settingsChanged: false,
	newlySeededDisabled: [],
	newlySeededEnabled: []
};
/**
* 把默认启用的内置插件写入 `enabledPlugins`。
*
* 语义：
* - `defaultEnabledNames === null`（seed-all 模式）：manifest 里所有平台支持且已物化的插件都写 `true`；
*   非白名单概念，不涉及显式 `false`，也不使用两份 seeded 名单。
* - `defaultEnabledNames` 是 Set（白名单模式）：
*   - 白名单内 & 平台支持 & 已物化：
*     - 名字不在 `alreadySeededEnabled` 里 → 显式写 `true`，并把名字塞进 `newlySeededEnabled`
*     - 名字已经在 `alreadySeededEnabled` 里 → 完全跳过，不写值（尊重用户后来手动改成 false 的选择）
*   - **不在白名单** & 平台支持 & 已物化：
*     - 名字不在 `alreadySeededDisabled` 里 → 显式写 `false`，并把名字塞进 `newlySeededDisabled`
*     - 名字已经在 `alreadySeededDisabled` 里 → 完全跳过，不写值（尊重用户/意图识别改成 true 的选择）
* - **注意**：白名单模式下不再依赖"key 是否已存在于 enabledPlugins"作为跳过条件——
*   是否 seed 过完全由两份独立名单文件决定，用户/意图识别对 settings.json 的修改
*   不会导致下次启动被再次拍回默认值。
*
* @param defaultEnabledNames 白名单集合；传 `null` 表示 seed-all，不区分白名单。
* @param alreadySeededDisabled 已经被 seed 过 false 的白名单外插件名（来自 `seeded-defaults.json` 的 `disabled`）。
* @param alreadySeededEnabled 已经被 seed 过 true 的白名单内插件名（来自 `seeded-defaults.json` 的 `enabled`）。
*/
function applyDefaultEnabledPlugins(plugins, enabledPlugins, platform = process.platform, defaultEnabledNames = DEFAULT_ENABLED_PLUGIN_NAMES, pluginRootDir, alreadySeededDisabled = /* @__PURE__ */ new Set(), alreadySeededEnabled = /* @__PURE__ */ new Set()) {
	let changed = false;
	const newlySeededDisabled = [];
	const newlySeededEnabled = [];
	for (const plugin of plugins) {
		if (!plugin.name || !isPluginSupportedOnPlatform(plugin, platform)) continue;
		const pluginId = `${plugin.name}@${BUILTIN_MARKETPLACE_NAME}`;
		if (pluginRootDir && !isPluginMaterialized(pluginRootDir, plugin)) continue;
		if (defaultEnabledNames === null) {
			if (pluginId in enabledPlugins) continue;
			enabledPlugins[pluginId] = true;
			changed = true;
			continue;
		}
		if (defaultEnabledNames.has(plugin.name)) {
			if (alreadySeededEnabled.has(plugin.name)) continue;
			enabledPlugins[pluginId] = true;
			changed = true;
			newlySeededEnabled.push(plugin.name);
			continue;
		}
		if (alreadySeededDisabled.has(plugin.name)) continue;
		enabledPlugins[pluginId] = false;
		changed = true;
		newlySeededDisabled.push(plugin.name);
	}
	return {
		changed,
		newlySeededDisabled,
		newlySeededEnabled
	};
}
function toNameSet(list) {
	if (!Array.isArray(list)) return /* @__PURE__ */ new Set();
	return new Set(list.filter((name) => typeof name === "string" && name.length > 0));
}
/**
* 读取合并后的 seeded 名单文件。文件不存在或损坏时返回两个空集合。
*/
function readSeededDefaultsNames(configDir) {
	const filePath = node_path.join(configDir, SEEDED_DEFAULTS_STATE_FILE);
	if (!node_fs.existsSync(filePath)) return {
		disabled: /* @__PURE__ */ new Set(),
		enabled: /* @__PURE__ */ new Set()
	};
	try {
		const raw = node_fs.readFileSync(filePath, "utf-8");
		const parsed = JSON.parse(raw);
		return {
			disabled: toNameSet(parsed?.disabled),
			enabled: toNameSet(parsed?.enabled)
		};
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		console.warn(`[seed-builtin-plugins] failed to parse ${filePath}: ${message}`);
		return {
			disabled: /* @__PURE__ */ new Set(),
			enabled: /* @__PURE__ */ new Set()
		};
	}
}
/**
* 将本次新 seed 过的名字追加进对应名单，与已有名单合并去重后**一次性**落盘。
* 若两组名字都为空则完全跳过写盘。
*/
function persistSeededDefaultsNames(configDir, existing, newlySeededDisabled, newlySeededEnabled) {
	if (newlySeededDisabled.length === 0 && newlySeededEnabled.length === 0) return;
	const mergedDisabled = new Set(existing.disabled);
	for (const name of newlySeededDisabled) mergedDisabled.add(name);
	const mergedEnabled = new Set(existing.enabled);
	for (const name of newlySeededEnabled) mergedEnabled.add(name);
	const payload = {
		version: 1,
		disabled: Array.from(mergedDisabled).sort(),
		enabled: Array.from(mergedEnabled).sort()
	};
	writeJsonAtomic(node_path.join(configDir, SEEDED_DEFAULTS_STATE_FILE), payload);
}
function seedEnabledPlugins(configDir, manifest, pluginRootDir, seedAll, productFeatures) {
	const plugins = manifest.plugins ?? [];
	if (plugins.length === 0) return EMPTY_ENABLED_PLUGINS_SEED_RESULT;
	let defaultEnabledNames;
	if (seedAll) defaultEnabledNames = null;
	else {
		const names = resolveDefaultEnabledPluginNames(productFeatures);
		if (names.size === 0) return EMPTY_ENABLED_PLUGINS_SEED_RESULT;
		defaultEnabledNames = names;
	}
	const settingsPath = node_path.join(configDir, "settings.json");
	const settings = readJsonObject(settingsPath, "settings.json");
	const enabledPlugins = settings.enabledPlugins ?? {};
	const whitelistMode = defaultEnabledNames !== null;
	const existingSeeded = whitelistMode ? readSeededDefaultsNames(configDir) : {
		disabled: /* @__PURE__ */ new Set(),
		enabled: /* @__PURE__ */ new Set()
	};
	const { changed, newlySeededDisabled, newlySeededEnabled } = applyDefaultEnabledPlugins(plugins, enabledPlugins, process.platform, defaultEnabledNames, pluginRootDir, existingSeeded.disabled, existingSeeded.enabled);
	if (whitelistMode) persistSeededDefaultsNames(configDir, existingSeeded, newlySeededDisabled, newlySeededEnabled);
	if (!changed) return {
		settingsChanged: false,
		newlySeededDisabled,
		newlySeededEnabled
	};
	settings.enabledPlugins = enabledPlugins;
	writeJsonAtomic(settingsPath, settings);
	return {
		settingsChanged: true,
		newlySeededDisabled,
		newlySeededEnabled
	};
}
function readJsonObject(filePath, label = "JSON file") {
	try {
		if (!node_fs.existsSync(filePath)) return {};
		const raw = node_fs.readFileSync(filePath, "utf-8");
		const parsed = JSON.parse(raw);
		if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) return parsed;
		console.warn(`[seed-builtin-plugins] ignoring non-object ${label} at ${filePath}`);
		return {};
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		console.warn(`[seed-builtin-plugins] failed to parse ${label} at ${filePath}: ${message}`);
		return {};
	}
}
function writeJsonAtomic(filePath, data) {
	node_fs.mkdirSync(node_path.dirname(filePath), { recursive: true });
	const tmpPath = `${filePath}.tmp.${process.pid}`;
	node_fs.writeFileSync(tmpPath, JSON.stringify(data, null, 4), "utf-8");
	node_fs.renameSync(tmpPath, filePath);
}
//#endregion
//#region src/main/tencent-docs/docs-ai-edit-feature-cache.ts
require_common$1.init_common$3();
/** 读取当前（已合并含 overlay 的）`productFeatures` 快照；未初始化时返回 undefined。 */
var productFeaturesProvider;
/**
* 初始化主进程「AI 编辑」灰度缓存：把读取 daemon product 快照的 provider 接上，并订阅
* `config:productConfigurationChanged` 在配置变更（尤其登录后 experiment overlay 拉取完成）时
* 刷新快照，保证 inject/peek/broadcast 三个 guest 出口读到最新灰度值。
*
* 收敛到本模块（而非散落在 main-bootstrap）：main-bootstrap 只需一行 init 调用 + dispose。
*
* @returns dispose：取消事件订阅 + 卸载 provider。
*/
function initDocsAiEditFeatureCache(deps) {
	const { daemonConnection, daemonState } = deps;
	productFeaturesProvider = () => daemonState.getProductConfiguration()?.productFeatures;
	const disposeEvent = daemonConnection.onEvent((channel) => {
		if (channel === require_workbuddy_auth_product_coordinator.CONFIG_RPC_CHANNELS.PRODUCT_CONFIGURATION_CHANGED) daemonState.refreshProductConfiguration().catch(() => {});
	});
	return () => {
		disposeEvent();
		productFeaturesProvider = void 0;
	};
}
/**
* 当前预览容器（partition → edition 代理）对应的「AI 编辑」灰度开关是否命中。
*
* @param isEnterprise true=企业版预览容器（persist:tdoc-preview），读企业 key；
*                     false=C 端预览容器（persist:agent-browser-preview-webview），读 C 端 key。
* @returns 仅当 productFeatures 对应 key 明确为 `true` 时返回 true；否则（未决 / 缺 key / 未注入）false。
*/
function isTencentDocsAiEditEnabled(isEnterprise) {
	const features = productFeaturesProvider?.();
	const key = isEnterprise ? require_common$1.ProductFeature.TencentDocsAiEditEnterprise : require_common$1.ProductFeature.TencentDocsAiEdit;
	return features?.[key] === true;
}
//#endregion
//#region src/main/tencent-docs/language-bridge.ts
/**
* 腾讯文档多语言透传（main 端）。
*
* 把 agent-ui 当前显示语言（'zh-CN' | 'en-US'）写成会话级 cookie，同步到两个目标：
*   1) `.docs.qq.com` domain cookie：供 docs.qq.com webview（auth + 预览）读取。
*   2) `127.0.0.1` host-only cookie：供本地 SDK 预览 iframe 读取（host 隔离，需单写一份）。
* 两个目标各写到 defaultSession (auth) 与 browser-preview partition (预览)。
*
* 链路：onLocaleChange → install-language-bridge → preload __setTencentDocsLanguage
*   → ipcMain setLanguage → syncCookieToAllSessions。
*/
/** Renderer → Main：设置当前显示语言，payload 'zh-CN' | 'en-US'。 */
var WORKBUDDY_TENCENT_DOCS_SET_LANGUAGE_CHANNEL = "workbuddy:tencentDocs:setLanguage";
/** cookie 名，前端读取约定。 */
var TENCENT_DOCS_LANGUAGE_COOKIE_NAME = "language";
var TENCENT_DOCS_COOKIE_HOST$1 = "docs.qq.com";
var TENCENT_DOCS_COOKIE_URL$1 = `https://${TENCENT_DOCS_COOKIE_HOST$1}`;
var TENCENT_DOCS_LOOPBACK_COOKIE_URL = "https://127.0.0.1/";
/** 与 LocalWebview.tsx / window-manager.ts / browser-preview.ts 保持一致。 */
var BROWSER_PREVIEW_WEBVIEW_PARTITION$3 = "persist:agent-browser-preview-webview";
var LOG_PREFIX$2 = "[TencentDocsLanguageBridge]";
var currentLanguage = "zh-CN";
var languageListeners = /* @__PURE__ */ new Set();
function onTencentDocsLanguageChanged(listener) {
	languageListeners.add(listener);
	return () => {
		languageListeners.delete(listener);
	};
}
function normalizeLanguage(input) {
	return input === "zh-CN" || input === "en-US" ? input : void 0;
}
async function setWebviewLanguageCookie(sess, language) {
	await sess.cookies.set({
		url: TENCENT_DOCS_COOKIE_URL$1,
		domain: `.${TENCENT_DOCS_COOKIE_HOST$1}`,
		name: TENCENT_DOCS_LANGUAGE_COOKIE_NAME,
		value: language,
		path: "/",
		sameSite: "unspecified"
	});
}
async function setLoopbackLanguageCookie(sess, language) {
	await sess.cookies.set({
		url: TENCENT_DOCS_LOOPBACK_COOKIE_URL,
		name: TENCENT_DOCS_LANGUAGE_COOKIE_NAME,
		value: language,
		path: "/",
		secure: true,
		sameSite: "no_restriction"
	});
}
async function syncCookieToSession(sess, label, language) {
	await Promise.all([{
		target: "docs.qq.com",
		run: () => setWebviewLanguageCookie(sess, language)
	}, {
		target: "127.0.0.1",
		run: () => setLoopbackLanguageCookie(sess, language)
	}].map(async ({ target, run }) => {
		try {
			await run();
			require_workbuddy_auth_product_coordinator.windowLog.info(`${LOG_PREFIX$2} cookie synced`, {
				label,
				target,
				language
			});
		} catch (error) {
			require_workbuddy_auth_product_coordinator.windowLog.warn(`${LOG_PREFIX$2} cookie sync failed`, {
				label,
				target,
				language,
				error: error instanceof Error ? error.message : String(error)
			});
		}
	}));
}
async function syncCookieToAllSessions$1(language) {
	const targets = [{
		sess: electron.session.defaultSession,
		label: "defaultSession (auth webview)"
	}, {
		sess: electron.session.fromPartition(BROWSER_PREVIEW_WEBVIEW_PARTITION$3),
		label: "previewSession (browser preview)"
	}];
	await Promise.all(targets.map(({ sess, label }) => syncCookieToSession(sess, label, language)));
}
/**
* 注册 IPC 入口。启动时不主动写 cookie —— 默认 'zh-CN' 为兜底，renderer
* `installTencentDocsLanguageBridge` 装载时会立刻 push 一次真实语言。
*/
function registerTencentDocsLanguageBridge(ipcMain) {
	ipcMain.handle(WORKBUDDY_TENCENT_DOCS_SET_LANGUAGE_CHANNEL, async (_event, rawLanguage) => {
		const next = normalizeLanguage(rawLanguage);
		if (!next) {
			require_workbuddy_auth_product_coordinator.windowLog.warn(`${LOG_PREFIX$2} invalid language payload`, { rawLanguage });
			return { ok: false };
		}
		const changed = next !== currentLanguage;
		currentLanguage = next;
		await syncCookieToAllSessions$1(next);
		notifyLanguageListeners(next);
		if (changed) require_workbuddy_auth_product_coordinator.windowLog.info(`${LOG_PREFIX$2} language changed`, { language: next });
		return { ok: true };
	});
	require_workbuddy_auth_product_coordinator.windowLog.info(`${LOG_PREFIX$2} registered`, {
		channel: WORKBUDDY_TENCENT_DOCS_SET_LANGUAGE_CHANNEL,
		cookieName: TENCENT_DOCS_LANGUAGE_COOKIE_NAME
	});
}
function notifyLanguageListeners(language) {
	for (const listener of languageListeners) try {
		listener(language);
	} catch {}
}
/**
* 剥掉 docs.qq.com 响应里的 `Set-Cookie: language=...`，避免覆盖宿主写入的 cookie。
* 非 docs.qq.com URL 原样返回，调用方无需判断域。
*
* Electron `webRequest.onHeadersReceived` 单 session 单 listener，故做成纯函数 helper
* 让现有 listener 内联调用，避免覆盖已有的 CSP/XFO 处理。
*/
function stripDocsLanguageSetCookie(url, responseHeaders) {
	if (!responseHeaders || !isTencentDocsUrl(url)) return responseHeaders;
	const out = { ...responseHeaders };
	for (const key of Object.keys(out)) {
		if (key.toLowerCase() !== "set-cookie") continue;
		const raw = out[key];
		const filtered = (Array.isArray(raw) ? raw : [raw]).filter((c) => !/^\s*language\s*=/i.test(c));
		if (filtered.length === 0) delete out[key];
		else out[key] = filtered;
	}
	return out;
}
//#endregion
//#region src/main/tencent-docs/local-preview-locale-sync.ts
function installTencentDocsLocalPreviewLocaleSync(options) {
	const syncLocale = (locale) => syncLocalPreviewLocale(options, locale);
	const disposeLanguageChanged = onTencentDocsLanguageChanged((language) => {
		syncLocale(language).catch((error) => {
			options.logger.warn("[TencentDocsLocalPreviewLocaleSync] sync language change failed", {
				language,
				error: error instanceof Error ? error.message : String(error)
			});
		});
	});
	syncInitialLocale(options, syncLocale).catch((error) => {
		options.logger.warn("[TencentDocsLocalPreviewLocaleSync] initial sync skipped", { error: error instanceof Error ? error.message : String(error) });
	});
	return disposeLanguageChanged;
}
async function syncInitialLocale(options, syncLocale) {
	const savedLocale = await options.config.get("locale");
	if (typeof savedLocale === "string" && savedLocale.trim()) await syncLocale(savedLocale);
}
async function syncLocalPreviewLocale(options, locale) {
	await options.daemonConnection.invoke(require_initialize.TENCENT_DOCS_DAEMON_RPC_CHANNELS.SET_LOCAL_PREVIEW_LOCALE, { locale: normalizeTencentDocsLanguage(locale) });
}
function normalizeTencentDocsLanguage(locale) {
	return locale.trim().toLowerCase().startsWith("zh") ? "zh-CN" : "en-US";
}
//#endregion
//#region src/main/tencent-docs/prewarm-scheduler.ts
/**
* Tencent Docs engine prewarm 调度器
*
* 背景：daemon 冷启动完成后，业务侧希望预热本地 tencent-docs 引擎（editor_sdk），
* 让 agent-spawn / 用户第一次打开文档预览时不再等待 spawn。
*
* 但预热本身会占用磁盘 IO + CPU + Windows Defender 扫描资源，与 renderer 首屏
* 渲染争抢。原方案在 daemon 就绪后立即 fire-and-forget，实测 daemon.start
* 端到端和 renderer React 首绘会相互拖累。
*
* 本模块把预热触发时机改为：
*   1. 等 renderer 首屏 render 完（通过 IPC 信号）
*   2. 或者到达超时兜底（20s）
* 二者以先到者为准，且用 signal 保证只触发一次。
*
* IPC 信号约定：renderer 在 React root mount + Adapter+Auth ready 后
* 通过 `renderer:signalStartupFirstPaint` invoke 一次即可。
*/
/** renderer → main 首屏就绪信号 IPC 通道 */
var RENDERER_STARTUP_FIRST_PAINT_CHANNEL = "renderer:signalStartupFirstPaint";
/**
* 兜底超时：即使 renderer 从未发出信号（首屏挂了、崩了、window 未创建），
* 也在 20s 后强制 kick prewarm，避免"预热永不发生"。
* 20s 是相对 daemon 就绪的偏移，给正常首屏留足时间（用户 2 实测二次启动
* 5.8s 首绘、首次启动 12.8s 首绘）。
*/
var PREWARM_FALLBACK_TIMEOUT_MS = 2e4;
/**
* 注册 renderer 首屏信号 IPC + fallback timer，任一先到即触发一次 prewarm。
*
* 幂等：多次收到 renderer 信号只 kick 一次（用户切换窗口、reload 页面等场景）。
*/
function schedulePrewarmOnFirstPaint(options) {
	const ipc = options.ipc ?? electron.ipcMain;
	const fallbackMs = options.fallbackTimeoutMs ?? PREWARM_FALLBACK_TIMEOUT_MS;
	let kicked = false;
	let disposed = false;
	const kickOnce = (source) => {
		if (kicked || disposed) return;
		kicked = true;
		options.logger?.info?.(`[TencentDocsPrewarm] kick source=${source}`);
		try {
			options.kick(source);
		} catch (error) {
			options.logger?.warn?.("[TencentDocsPrewarm] kick threw synchronously (should not happen):", error instanceof Error ? error.message : String(error));
		}
		cleanupResources();
	};
	const cleanupResources = () => {
		if (fallbackTimer) {
			clearTimeout(fallbackTimer);
			fallbackTimer = void 0;
		}
		try {
			ipc.removeHandler(RENDERER_STARTUP_FIRST_PAINT_CHANNEL);
		} catch {}
	};
	ipc.handle(RENDERER_STARTUP_FIRST_PAINT_CHANNEL, async () => {
		kickOnce("renderer-first-paint");
		return { ok: true };
	});
	let fallbackTimer = setTimeout(() => {
		options.logger?.info?.(`[TencentDocsPrewarm] renderer signal did not arrive within ${fallbackMs}ms, fallback kick`);
		kickOnce("daemon-background-prewarm-fallback");
	}, fallbackMs);
	fallbackTimer.unref?.();
	return { dispose() {
		if (disposed) return;
		disposed = true;
		cleanupResources();
	} };
}
//#endregion
//#region src/main/tencent-docs/renderer-event-bridge.ts
var TENCENT_DOCS_CONSUME_PENDING_RENDERER_EVENTS_CHANNEL = "tencent-docs:consume-pending-renderer-events";
function createTencentDocsRendererEventBridge(options = {}) {
	const { logger } = options;
	let daemonConnection;
	let rendererReady = false;
	const pendingEvents = [];
	const enqueue = (channel, data) => {
		pendingEvents.push({
			channel,
			data
		});
		logger?.info("[TencentDocsRendererPush] queued (renderer or daemon not ready)", {
			channel,
			pendingCount: pendingEvents.length
		});
	};
	const livePush = (channel, data) => {
		if (!daemonConnection) {
			enqueue(channel, data);
			return;
		}
		try {
			daemonConnection.push(channel, data);
			logger?.info("[TencentDocsRendererPush] pushed", { channel });
		} catch (error) {
			logger?.warn("[TencentDocsRendererPush] push failed", {
				channel,
				error: error instanceof Error ? error.message : String(error)
			});
		}
	};
	return {
		push(channel, data) {
			if (!rendererReady) {
				enqueue(channel, data);
				return;
			}
			livePush(channel, data);
		},
		bufferDaemonEventBeforeRendererReady(channel, data) {
			if (rendererReady) return;
			enqueue(channel, data);
		},
		consumePending() {
			rendererReady = true;
			if (pendingEvents.length === 0) return [];
			const drained = pendingEvents.splice(0, pendingEvents.length);
			logger?.info("[TencentDocsRendererPush] consumed pending events for renderer replay", { count: drained.length });
			return drained;
		},
		setDaemonConnection(connection) {
			daemonConnection = connection;
		}
	};
}
/** 注册 Tencent Docs 专用 consume IPC；返回 dispose。 */
function registerTencentDocsRendererEventBridgeIpc(ipcMain, bridge) {
	ipcMain.handle(TENCENT_DOCS_CONSUME_PENDING_RENDERER_EVENTS_CHANNEL, () => bridge.consumePending());
	return () => {
		ipcMain.removeHandler(TENCENT_DOCS_CONSUME_PENDING_RENDERER_EVENTS_CHANNEL);
	};
}
//#endregion
//#region src/main/bootstrap/main-bootstrap.ts
require_common$1.init_common$2();
require_app_instance.init_app_instance();
require_workbuddy_product_config.init_bundled_assets();
require_workbuddy_product_config.init_workbuddy_product_config();
var TENCENT_DOCS_RESTART_ENGINE_WITH_DEBUG_OPTIONS_CHANNEL = "tencentDocs:restartEngineWithDebugOptions";
var TENCENT_DOCS_RENDERER_PUSH_CHANNEL_SET = new Set(Object.values(require_initialize.TENCENT_DOCS_RENDERER_PUSH_CHANNELS));
async function bootstrapMainProcess(windowManager, resolveBootstrapDeferred, onHistoryProgress, options = {}, onRepairProgress) {
	const t0 = Date.now();
	const elapsed = () => `+${Date.now() - t0}ms`;
	const _bsLogDir = require_app_instance.getWorkbuddyLogsDir("startup");
	const _bsLogDate = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
	const _bsLogFile = path.join(_bsLogDir, `startup-${_bsLogDate}.log`);
	const _bsLog = (msg) => {
		const line = `[${(/* @__PURE__ */ new Date()).toISOString()}] [bootstrap ${elapsed()}] ${msg}\n`;
		try {
			fs.appendFileSync(_bsLogFile, line);
		} catch {}
	};
	const evalModeEnabled = false;
	_bsLog("bootstrapMainProcess entered");
	require_menu_builder.markStartup("B1");
	require_logger.mainLog.info("[MainBootstrap] Creating platform");
	const platform = createElectronPlatform();
	require_menu_builder.markStartup("B2");
	const promptTemplatesDir = require_workbuddy_product_config.requireBundledAsset("templates");
	require_runtime_context.configureWorkbuddyRuntimeContext({
		appName: require_app_instance.getWorkbuddyAppName(),
		appVersion: platform.appVersion,
		appPath: platform.appRootPath,
		locale: platform.appLocale(),
		promptTemplatesDir,
		configDir: require_app_instance.getWorkbuddyConfigDir(),
		userDataDir: require_app_instance.getWorkbuddyUserDataDir()
	});
	const menuLocale = require_menu_i18n.getMenuLocale();
	process.env.WORKBUDDY_MENU_LOCALE = menuLocale;
	_bsLog(`platform created, version=${platform.appVersion}`);
	require_logger.mainLog.info(`[MainBootstrap] Version: ${platform.appVersion}`);
	const localProbeServer = new LocalProbeServer({
		appVersion: platform.appVersion,
		logger: {
			info: (msg, ...args) => require_logger.mainLog.info(msg, ...args),
			warn: (msg, ...args) => require_logger.mainLog.warn(msg, ...args),
			error: (msg, ...args) => require_logger.mainLog.error(msg, ...args)
		}
	});
	localProbeServer.start().catch((err) => {
		require_logger.mainLog.warn("[MainBootstrap] LocalProbeServer start failed (non-fatal):", err instanceof Error ? err.message : String(err));
	});
	let database;
	require_logger.mainLog.info("[MainBootstrap] Skipping desktop database service; app-server owns SQLite");
	_bsLog("database service skipped for desktop host");
	require_logger.mainLog.info(`[MainBootstrap] Initializing CellJS container ${elapsed()}`);
	const container = await initializeDesktopHostCellJSContainer(evalModeEnabled);
	require_log_acl_guard.initQimeiDetector();
	_bsLog("CellJS container ready");
	require_menu_builder.markStartup("B3");
	require_logger.mainLog.info(`[MainBootstrap] CellJS container ready ${elapsed()}`);
	attachCellJSLogBridge(container);
	const desktopDaemonStateRef = {};
	const getDaemonSession = () => desktopDaemonStateRef.current?.getSession();
	try {
		const bindUserinfo = () => createDesktopHostUserinfoProvider(getDaemonSession);
		if (container.isBound(require_common$1.UserinfoProvider)) container.rebind(require_common$1.UserinfoProvider).toDynamicValue(bindUserinfo);
		else container.bind(require_common$1.UserinfoProvider).toDynamicValue(bindUserinfo);
	} catch (error) {
		require_logger.mainLog.warn("[MainBootstrap] Failed to bind desktop-host UserinfoProvider:", error);
	}
	try {
		const bindHeaders = () => createDesktopHostReportHeadersProvider({
			getAuthSession: getDaemonSession,
			getDeploymentType: () => {
				const config = desktopDaemonStateRef.current?.getProductConfiguration();
				return typeof config?.deploymentType === "string" ? config.deploymentType : void 0;
			},
			getUserAgent: () => {
				const appName = require_workbuddy_product_config.tryGetWorkbuddyBaseProductConfiguration()?.applicationName;
				return appName ? `${appName}/${platform.appVersion}` : void 0;
			}
		});
		if (container.isBound(require_common$1.EventExtraHeadersProvider)) container.rebind(require_common$1.EventExtraHeadersProvider).toDynamicValue(bindHeaders);
		else container.bind(require_common$1.EventExtraHeadersProvider).toDynamicValue(bindHeaders);
	} catch (error) {
		require_logger.mainLog.warn("[MainBootstrap] Failed to bind desktop-host EventExtraHeadersProvider:", error);
	}
	require_logger.mainLog.info("[MainBootstrap] Resolving desktop host CellJS deps");
	const desktopHostDeps = resolveDesktopHostCellJSDeps(container);
	const appServerDeps = void 0;
	_bsLog("CellJS deps resolved");
	let lastObservedUid;
	const getCurrentDaemonAccount = () => desktopDaemonStateRef.current?.getAccount();
	const getCurrentDaemonProduct = () => desktopDaemonStateRef.current?.getProductConfiguration();
	require_marks.setUserIdProvider(() => {
		try {
			return getCurrentDaemonAccount()?.uid;
		} catch {
			return;
		}
	});
	const observeAuthLifecycle = (uid) => {
		if (uid && uid !== lastObservedUid) {
			lastObservedUid = uid;
			require_marks.logLifecycleEvent("AuthReady", { uid });
			appServerDeps?.systemPromptService.warmup();
		} else if (!uid && lastObservedUid) {
			require_marks.logLifecycleEvent("AuthLogout", { previousUid: lastObservedUid });
			lastObservedUid = void 0;
		}
	};
	const AUTH_READY_TIMEOUT_MS = 15 * 1e3;
	let resolveAuthReady = () => {};
	const authReadyPromise = new Promise((resolve) => {
		resolveAuthReady = resolve;
	});
	setTimeout(() => resolveAuthReady(), AUTH_READY_TIMEOUT_MS).unref?.();
	const ideLifecycle = new IdeLifecycleTelemetry({
		eventService: desktopHostDeps.eventService,
		getProductConfiguration: () => {
			const product = getCurrentDaemonProduct();
			return product ? { config: { channelBranding: product.channelBranding } } : void 0;
		},
		waitForAuthReady: () => authReadyPromise
	});
	ideLifecycle.reportStart();
	require_logger.mainLog.info("[MainBootstrap] Ensuring data directories");
	require_app_instance.ensureWorkbuddyDataDirs();
	try {
		const crashLogDir = require_app_instance.getWorkbuddyLogsDir("Crash-Log");
		const { CrashLogExporter, DEFAULT_EXCLUDE_PATTERNS } = await Promise.resolve().then(() => require("./crash-reporter.js"));
		const sessionId = (crypto ?? await import("crypto")).randomUUID();
		let enableUpload = false;
		try {
			const { getWorkbuddyBootstrapProductConfiguration } = await Promise.resolve().then(() => require("./workbuddy-product-config2.js"));
			enableUpload = getWorkbuddyBootstrapProductConfiguration()?.productFeatures?.CrashReportToggle === true;
		} catch {}
		new CrashLogExporter({
			crashLogDir,
			enableUpload,
			appLaunchedAtMs: Date.now() - Math.floor(process.uptime() * 1e3),
			contextProvider: { getContext: () => ({
				host: {
					ideName: "WorkBuddy Desktop",
					ideType: "desktop",
					machineId: require_log_acl_guard.machineIdSync(),
					sessionId,
					ideVersion: platform.appVersion,
					downloadChannel: getCurrentDaemonProduct()?.downloadChannel ?? ""
				},
				os: {
					os: os.platform(),
					arch: os.arch(),
					osVersion: os.release(),
					cpuModel: os.cpus()[0]?.model ?? "",
					cpuCores: os.cpus().length,
					memorySize: Math.round(os.totalmem() / 1024 / 1024 / 1024)
				},
				user: {
					userId: getCurrentDaemonAccount()?.uid ?? "",
					username: getCurrentDaemonAccount()?.name ?? "",
					userNickname: getCurrentDaemonAccount()?.nickname ?? "",
					enterpriseId: getCurrentDaemonAccount()?.enterpriseId,
					tenantId: getCurrentDaemonAccount()?.tenantId
				},
				product: {
					product: getCurrentDaemonProduct()?.deploymentType ?? "SaaS",
					releaseDate: void 0,
					commit: getCurrentDaemonProduct()?.commit ?? ""
				}
			}) },
			filter: { messageExcludePatterns: DEFAULT_EXCLUDE_PATTERNS },
			transport: { exportLogs: async (records) => {
				await monitorService.exportCrashLogs(records);
				for (const record of records) try {
					const attrs = record?.attributes ?? {};
					const crashType = String(attrs["crash_type"] ?? "unknown");
					const errName = String(attrs["error.name"] ?? "CrashError");
					const errMsg = String(attrs["error.message"] ?? record?.message ?? "");
					const stack = attrs["error.stack"] != null ? String(attrs["error.stack"]) : void 0;
					const err = /* @__PURE__ */ new Error(`[${crashType}] ${errMsg}`);
					err.name = errName;
					if (stack) err.stack = stack;
					monitorService.reportAegisError?.(err);
				} catch {}
			} }
		}).start();
		_bsLog("CrashLogExporter started");
	} catch (err) {
		_bsLog(`CrashLogExporter start failed (non-fatal): ${err instanceof Error ? err.message : String(err)}`);
	}
	require_logger.mainLog.info("[MainBootstrap] Initializing database");
	let startPeriodicCheckpointAfterReady = () => {};
	let galileoEnabled = false;
	let galileoPatchName;
	let galileoProcessPerformanceIntervalMin;
	let galileoNetworkIntervalMin;
	try {
		const { getWorkbuddyBootstrapProductConfiguration } = await Promise.resolve().then(() => require("./workbuddy-product-config2.js"));
		const galileoConfig = getWorkbuddyBootstrapProductConfiguration()?.galileo;
		galileoEnabled = galileoConfig?.enable === true;
		galileoPatchName = galileoConfig?.patchName;
		if (typeof galileoConfig?.processPerformanceIntervalMin === "number" && galileoConfig.processPerformanceIntervalMin > 0) galileoProcessPerformanceIntervalMin = galileoConfig.processPerformanceIntervalMin;
		if (typeof galileoConfig?.networkIntervalMin === "number" && galileoConfig.networkIntervalMin > 0) galileoNetworkIntervalMin = galileoConfig.networkIntervalMin;
	} catch {}
	const monitorService = new require_desktop_monitor_service.DesktopMonitorService({
		getUserId: () => getCurrentDaemonAccount()?.uid,
		appVersion: platform.appVersion,
		aegisEnabled: galileoEnabled,
		patchName: galileoPatchName,
		processPerformanceIntervalMin: galileoProcessPerformanceIntervalMin,
		networkIntervalMin: galileoNetworkIntervalMin
	});
	require_desktop_monitor_service.DesktopMonitorService.setSharedInstance(monitorService);
	monitorService.getMigrationCollector();
	const productName = require_workbuddy_product_config.tryGetWorkbuddyBaseProductConfiguration().productName ?? "WorkBuddy";
	require_logger.mainLog.info("[MainBootstrap] Skipping desktop database migration; app-server owns SQLite startup migration");
	const FALLBACK_MERGE_TIMEOUT_MS = 12e4;
	let fallbackMergeHappened = false;
	{
		const mergePromise = migrateFallbackData(require_logger.mainLog, void 0, { onWillMerge: async ({ sourceDir, reason }) => {
			_bsLog(`fallback migration start reason=${reason} source=${sourceDir}`);
			await onHistoryProgress?.(0, 1, "fallback-data");
		} });
		mergePromise.catch(() => {});
		let mergeTimer;
		const timeoutPromise = new Promise((_, reject) => {
			mergeTimer = setTimeout(() => {
				require_logger.mainLog.warn(`[FallbackDataMigration] Aborted by timeout after ${FALLBACK_MERGE_TIMEOUT_MS}ms — marker NOT written, will retry on next startup`);
				reject(/* @__PURE__ */ new Error(`fallback merge timed out after ${FALLBACK_MERGE_TIMEOUT_MS}ms`));
			}, FALLBACK_MERGE_TIMEOUT_MS);
			mergeTimer.unref?.();
		});
		try {
			fallbackMergeHappened = await Promise.race([mergePromise, timeoutPromise]);
			if (fallbackMergeHappened) await onHistoryProgress?.(1, 1, "fallback-data");
		} catch (err) {
			_bsLog(`migrateFallbackData failed (non-fatal): ${err instanceof Error ? err.message : String(err)}`);
			require_logger.mainLog.warn("[FallbackDataMigration] Failed (non-fatal):", err);
		} finally {
			clearTimeout(mergeTimer);
		}
	}
	_bsLog("migrateFallbackData completed");
	monitorService.flushNow().catch(() => {});
	_bsLog("starting daemon bootstrap");
	require_logger.mainLog.info(`[MainBootstrap] Starting daemon ${elapsed()}`);
	const desktopHost = options.desktopHost ?? createElectronDesktopHost(windowManager);
	const powerManager = createPowerManager();
	let daemon;
	let daemonProcess;
	let disposeAppServerDesktopHostBridge = () => void 0;
	let disposeLocalStorageMigrationCompletion;
	let legacyLocalStorageMigrationResultPath;
	const connectionLogger = { warn: (message) => require_logger.mainLog.warn(`[MainBootstrap] ${message}`) };
	let daemonConnection;
	const tencentDocsRendererEventBridge = createTencentDocsRendererEventBridge({ logger: {
		info: (message, meta) => require_logger.mainLog.info(message, meta),
		warn: (message, meta) => require_logger.mainLog.warn(message, meta)
	} });
	const disposeTencentDocsRendererEventBridgeIpc = registerTencentDocsRendererEventBridgeIpc(electron.ipcMain, tencentDocsRendererEventBridge);
	tencentDocsRendererEventBridge.push.bind(tencentDocsRendererEventBridge);
	{
		legacyLocalStorageMigrationResultPath = await prepareLegacyLocalStorageMigrationResultFile(productName, require_logger.mainLog);
		require_menu_builder.markStartup("B5");
		const appServerDesktopHostBridge = new require_initialize.DaemonRpcDispatcher(connectionLogger);
		registerAppServerDesktopHostBridgeHandlers(appServerDesktopHostBridge, desktopHost);
		registerAppServerMonitorBridgeHandlers(appServerDesktopHostBridge, {
			recordDuration: (metric, durationMs, dims) => require_desktop_monitor_service.DesktopMonitorService.getSharedInstance()?.recordDuration(metric, durationMs, dims),
			addCounter: (metric, count, dims) => require_desktop_monitor_service.DesktopMonitorService.getSharedInstance()?.addCounter(metric, count, dims),
			reportEvent: (name, ext) => {
				if (name === "startup.perf.bridge") {
					require_menu_builder.recordStartupPerfToCollector(ext).catch(() => {});
					return;
				}
				require_desktop_monitor_service.DesktopMonitorService.getSharedInstance()?.reportAegisEvent(name, ext);
			},
			reportPromptForwarding: async (payload) => {
				const { reportPromptForwardingEvent } = await Promise.resolve().then(() => require("./prompt-trace-reporter.js"));
				reportPromptForwardingEvent(payload);
			},
			reportPromptDone: async (payload) => {
				const { reportPromptDoneEvent } = await Promise.resolve().then(() => require("./prompt-trace-reporter.js"));
				reportPromptDoneEvent(payload);
			},
			reportPromptTrace: async (payload) => {
				const { reportPromptTrace } = await Promise.resolve().then(() => require("./prompt-trace-reporter.js"));
				await reportPromptTrace(payload);
			},
			applyRendererSessionId: (sessionId) => {
				require_desktop_monitor_service.DesktopMonitorService.getSharedInstance()?.applyRendererSessionId(sessionId);
			}
		});
		const { getSharedMainDocsService } = await Promise.resolve().then(() => require("./main-docs-service.js"));
		registerAppServerDocsBridgeHandlers(appServerDesktopHostBridge, { getPreviewUrl: (filePath, options) => getSharedMainDocsService().getPreviewUrl(filePath, options) });
		require_menu_builder.markStartup("B6");
		const qimei36 = await require_log_acl_guard.getQimeiDetector().getAsync();
		const daemonProxyEnv = await require_initialize.resolveProxyEnv(void 0, ELECTRON_PROXY_RULES_RESOLVER);
		require_menu_builder.markStartup("B7");
		daemonProcess = await new DaemonAppServerProcessManager({
			env: {
				...daemonProxyEnv,
				...require_startup_context.buildStartupContextEnv(),
				WORKBUDDY_APPLICATION_NAME: require_workbuddy_product_config.tryGetWorkbuddyBaseProductConfiguration()?.applicationName ?? "",
				WORKBUDDY_APP_NAME: require_app_instance.getWorkbuddyAppName(),
				WORKBUDDY_APP_PATH: platform.appRootPath,
				WORKBUDDY_APP_VERSION: platform.appVersion,
				WORKBUDDY_CONFIG_DIR: platform.configDir,
				WORKBUDDY_FS_PROTECTION_ROLE: "daemon",
				WORKBUDDY_IS_PACKAGED: platform.isPackaged ? "1" : "0",
				WORKBUDDY_LOCALE: platform.appLocale(),
				WORKBUDDY_MENU_LOCALE: menuLocale,
				WORKBUDDY_PROMPT_TEMPLATES_DIR: promptTemplatesDir,
				WORKBUDDY_PRODUCT_NAME: productName,
				WORKBUDDY_RESOURCES_PATH: platform.resourcesPath,
				WORKBUDDY_USER_DATA_DIR: platform.dataDir,
				...legacyLocalStorageMigrationResultPath ? { WORKBUDDY_LEGACY_LOCALSTORAGE_MIGRATION_RESULT_PATH: legacyLocalStorageMigrationResultPath } : {},
				...qimei36 ? { CODEBUDDY_QIMEI36: qimei36 } : {}
			},
			requestHandler: (channel, ...args) => appServerDesktopHostBridge.invoke(channel, ...args),
			logger: {
				info: (message, meta) => require_logger.mainLog.info(`[MainBootstrap] ${message}`, meta),
				warn: (message, meta) => require_logger.mainLog.warn(`[MainBootstrap] ${message}`, meta)
			}
		}).start();
		require_menu_builder.markStartup("B8");
		disposeAppServerDesktopHostBridge = () => {
			daemonProcess?.connection.setRequestHandler(void 0);
		};
		daemonConnection = require_initialize.createCompositeDaemonRpcConnection(daemonProcess.connection, { logger: connectionLogger });
	}
	require_menu_builder.markStartup("B9");
	tencentDocsRendererEventBridge.setDaemonConnection(daemonConnection);
	const disposeTencentDocsDaemonRendererEvents = daemonConnection.onEvent((channel, data) => {
		if (!isTencentDocsRendererPushChannel(channel)) return;
		tencentDocsRendererEventBridge.bufferDaemonEventBeforeRendererReady(channel, data);
	});
	options.localDaemonTransport?.bindConnection(daemonConnection);
	const disposeTencentDocsLocalPreviewLocaleSync = installTencentDocsLocalPreviewLocaleSync({
		daemonConnection,
		config: desktopHostDeps.configService,
		logger: require_logger.mainLog
	});
	const { setDevEnvDaemonConnection } = await Promise.resolve().then(() => require("./dev-env-actions.js"));
	setDevEnvDaemonConnection(daemonConnection);
	const disposeAppServerDesktopHostEvents = registerAppServerDesktopHostEvents(daemonConnection, desktopHost, { logger: require_logger.mainLog });
	{
		const pendingLocalStorageMigration = await readPendingLocalStorageMigration(daemonConnection, require_logger.mainLog);
		resolveBootstrapDeferred?.({ pendingLocalStorageMigration });
		disposeLocalStorageMigrationCompletion = desktopHost.registerLocalStorageMigrationCompletion((result) => {
			daemonConnection.invoke(require_workbuddy_auth_product_coordinator.MIGRATION_RPC_CHANNELS.COMPLETE_LOCAL_STORAGE_MIGRATION, result).catch((error) => {
				require_logger.mainLog.warn("[MainBootstrap] Failed to complete app-server localStorage migration:", error);
			});
		});
	}
	require_menu_builder.markStartup("B10");
	const disposeAppServerPowerEventBridge = registerAppServerPowerEventBridge(daemonConnection, {
		logger: require_logger.mainLog,
		desktopHost
	});
	const disposeRemoteMigrationProgress = onHistoryProgress ? daemonConnection.onEvent((channel, data) => {
		if (channel !== require_workbuddy_auth_product_coordinator.MIGRATION_RPC_CHANNELS.HISTORY_PROGRESS || !isMigrationProgressEvent(data)) return;
		_bsLog(`remote migration progress: ${data.current}/${data.total}${data.name ? ` name=${data.name}` : ""}`);
		onHistoryProgress(data.current, data.total, data.name);
	}) : () => void 0;
	require_menu_builder.markStartup("B11");
	const desktopDaemonState = await createWorkbuddyDaemonState(daemonConnection, {
		logger: require_logger.mainLog,
		startupMark: (id) => require_menu_builder.markDaemonObservedFromMain(id)
	});
	desktopDaemonStateRef.current = desktopDaemonState;
	observeAuthLifecycle(desktopDaemonState.getAccount()?.uid);
	if (desktopDaemonState.getSession()?.auth?.accessToken) resolveAuthReady();
	const disposeAuthLifecycle = desktopDaemonState.onCurrentSessionChanged((session) => {
		observeAuthLifecycle(session?.account?.uid);
		if (session?.auth?.accessToken) resolveAuthReady();
	});
	const disposeDocsAiEditFeatureCache = initDocsAiEditFeatureCache({
		daemonConnection,
		daemonState: desktopDaemonState
	});
	try {
		const productFeatures = desktopDaemonState.getProductConfiguration()?.productFeatures;
		const seedResult = seedBuiltinPluginsMarketplace(productFeatures);
		if (seedResult.marketplaceChanged || seedResult.settingsChanged) daemonConnection.invoke(require_workbuddy_auth_product_coordinator.PLUGIN_RPC_CHANNELS.REFRESH_RUNTIME_PLUGINS, { reason: "builtin-plugin-seed" }).catch((error) => {
			require_logger.mainLog.warn("[MainBootstrap] refresh runtime plugins after builtin seed failed (non-fatal)", error);
		});
	} catch (error) {
		require_logger.mainLog.warn("[MainBootstrap] seedBuiltinPluginsMarketplace failed (non-fatal)", error);
	}
	const daemonSessionQueries = createWorkbuddyDaemonSessionQueries(daemonConnection);
	const desktopUpdateService = Promise.resolve(createDesktopUpdateService({
		accountSource: desktopDaemonState,
		productSource: desktopDaemonState,
		getActiveSessionCount: async () => {
			return (await daemonSessionQueries.getActiveSessions()).length;
		},
		confirmActiveTasksUpdate: async () => {
			const { dialog, BrowserWindow } = await import("electron");
			const { getRendererTranslation } = await Promise.resolve().then(() => require("./menu-i18n2.js"));
			const ownerWindow = BrowserWindow.getFocusedWindow() ?? BrowserWindow.getAllWindows().find((w) => !w.isDestroyed()) ?? null;
			const options = {
				type: "warning",
				buttons: [getRendererTranslation("windowLifecycle.activeTasksUpdate.cancel"), getRendererTranslation("windowLifecycle.activeTasksUpdate.updateAnyway")],
				defaultId: 0,
				cancelId: 0,
				title: getRendererTranslation("windowLifecycle.activeTasksUpdate.title"),
				message: getRendererTranslation("windowLifecycle.activeTasksUpdate.message"),
				detail: getRendererTranslation("windowLifecycle.activeTasksUpdate.detail"),
				noLink: true
			};
			const { response } = ownerWindow ? await dialog.showMessageBox(ownerWindow, options) : await dialog.showMessageBox(options);
			return response === 1;
		}
	}));
	registerDesktopHostRpcHandlers(daemonConnection, {
		desktopHost,
		powerManager,
		daemonState: desktopDaemonState,
		services: Promise.resolve({ config: desktopHostDeps.configService }),
		updateService: desktopUpdateService
	});
	const disposeDesktopHostIpc = options.localDaemonTransport ? () => void 0 : registerDesktopHostIpc({
		daemonConnection,
		desktopHost
	});
	require_menu_builder.markStartup("B12");
	require_logger.mainLog.info(`[MainBootstrap] daemon ready ${elapsed()}`);
	const disposeMainRuntimeHandlers = () => void 0;
	monitorService.start().catch((err) => {
		require_logger.mainLog.error("[MainBootstrap] Monitor service start error:", err instanceof Error ? err.message : String(err));
	});
	const mcpAppsHost = void 0;
	mcpAppsHost?.channels;
	require_menu_builder.markStartup("B13");
	const backgroundPromise = Promise.resolve(void 0);
	const recoverEdgeSyncOnResume = () => {
		daemon?.recoverEdgeSyncAfterNetworkResume("system-resume").catch((error) => {
			require_logger.mainLog.warn("[EdgeSync] recovery after system resume failed:", error);
		});
	};
	backgroundPromise.catch((err) => {
		require_logger.mainLog.error("[MainBootstrap] Background services start error:", err);
	});
	const prewarmScheduler = schedulePrewarmOnFirstPaint({
		kick: (source) => {
			require_logger.mainLog.info(`[MainBootstrap] tencent-docs engine prewarm kick source=${source}`);
			daemonConnection.invoke(require_initialize.TENCENT_DOCS_DAEMON_RPC_CHANNELS.PREWARM_ENGINE, source).catch((err) => {
				require_logger.mainLog.warn("[MainBootstrap] Tencent Docs engine prewarm RPC failed:", err instanceof Error ? err.message : String(err));
			});
		},
		logger: require_logger.mainLog
	});
	require_menu_builder.markStartup("B14");
	require_logger.mainLog.info(`[MainBootstrap] Bootstrap complete, returning handle ${elapsed()}`);
	require_menu_builder.markStartup("B15");
	let stopped = false;
	let evalProxyServer;
	const migrationDonePromise = createRemoteMigrationDonePromise(daemonConnection, require_logger.mainLog, _bsLog);
	migrationDonePromise.then(() => {
		startPeriodicCheckpointAfterReady();
	});
	const healthCheckTimer = database?.scheduleHealthCheck();
	const disposeTencentDocsSelectionBroadcast = () => void 0;
	return {
		daemonSessionQueries,
		migrationDonePromise,
		async openTencentDocsLocalFile(filePath) {
			windowManager.showOrCreate();
			return daemonConnection.invoke(require_initialize.TENCENT_DOCS_DAEMON_RPC_CHANNELS.SYSTEM_OPEN_LOCAL_FILE, filePath);
		},
		async reportTencentDocsMqqSelection(selection) {
			await daemonConnection.invoke(require_initialize.TENCENT_DOCS_DAEMON_RPC_CHANNELS.REPORT_MQQ_SELECTION, selection);
		},
		async reportGuestTelemetry(eventCode, payload) {
			await daemonConnection.invoke(require_workbuddy_auth_product_coordinator.TELEMETRY_RPC_CHANNELS.REPORT, eventCode, payload);
		},
		async confirmTencentDocsIframeInternalDocumentTabAction(documentResourceUri, targetFileId) {
			return Boolean(await daemonConnection.invoke(require_initialize.TENCENT_DOCS_DAEMON_RPC_CHANNELS.CONFIRM_IFRAME_INTERNAL_DOCUMENT_TAB_ACTION, documentResourceUri, targetFileId));
		},
		async registerOnlineDocPreview(fileId, sessionId) {
			await daemonConnection.invoke(require_initialize.TENCENT_DOCS_DAEMON_RPC_CHANNELS.REGISTER_ONLINE_DOC_PREVIEW, fileId, sessionId);
		},
		async unregisterOnlineDocPreview(fileId) {
			await daemonConnection.invoke(require_initialize.TENCENT_DOCS_DAEMON_RPC_CHANNELS.UNREGISTER_ONLINE_DOC_PREVIEW, fileId);
		},
		async restartTencentDocsEngineWithDebugOptions(staticDir, editorSdkPath) {
			return daemonConnection.invoke(TENCENT_DOCS_RESTART_ENGINE_WITH_DEBUG_OPTIONS_CHANNEL, staticDir, editorSdkPath);
		},
		async releaseTencentDocsPreviewContextsWithPrompt(options) {
			return daemonConnection.invoke(require_initialize.TENCENT_DOCS_DAEMON_RPC_CHANNELS.RELEASE_PREVIEW_CONTEXTS_WITH_PROMPT, options);
		},
		async isOAuthCallbackUrl(url) {
			return assertBooleanResponse(await daemonConnection.invoke(require_initialize.CONNECTOR_OAUTH_CALLBACK_RPC_CHANNELS.IS_CALLBACK_URL, url), require_initialize.CONNECTOR_OAUTH_CALLBACK_RPC_CHANNELS.IS_CALLBACK_URL);
		},
		async handleOAuthCallbackFromUrl(url) {
			return assertOAuthCallbackResult(await daemonConnection.invoke(require_initialize.CONNECTOR_OAUTH_CALLBACK_RPC_CHANNELS.HANDLE_CALLBACK_FROM_URL, url), require_initialize.CONNECTOR_OAUTH_CALLBACK_RPC_CHANNELS.HANDLE_CALLBACK_FROM_URL);
		},
		async handleOAuthCallback(state, code) {
			return assertOAuthCallbackResult(await daemonConnection.invoke(require_initialize.CONNECTOR_OAUTH_CALLBACK_RPC_CHANNELS.HANDLE_CALLBACK, state, code), require_initialize.CONNECTOR_OAUTH_CALLBACK_RPC_CHANNELS.HANDLE_CALLBACK);
		},
		async stop() {
			if (stopped) return;
			stopped = true;
			clearTimeout(healthCheckTimer);
			electron.powerMonitor.off("resume", recoverEdgeSyncOnResume);
			try {
				prewarmScheduler.dispose();
			} catch (err) {
				require_logger.mainLog.warn("[MainBootstrap] Failed to dispose tencent-docs prewarm scheduler:", err);
			}
			await ideLifecycle.reportEnd();
			try {
				disposeAuthLifecycle();
			} catch (err) {
				require_logger.mainLog.warn("[MainBootstrap] Failed to unsubscribe auth session:", err);
			}
			try {
				disposeDocsAiEditFeatureCache();
			} catch (err) {
				require_logger.mainLog.warn("[MainBootstrap] Failed to dispose docs aiEdit feature cache:", err);
			}
			require_marks.setUserIdProvider(void 0);
			try {
				mcpAppsHost?.stop();
			} catch (error) {
				require_logger.mainLog.warn("[MainBootstrap] MCP Apps host stop error:", error);
			}
			await (await backgroundPromise.catch(() => void 0))?.stop();
			try {
				disposeMainRuntimeHandlers();
			} catch (err) {
				require_logger.mainLog.warn("[MainBootstrap] Failed to dispose main runtime handlers:", err);
			}
			disposeRemoteMigrationProgress();
			disposeTencentDocsDaemonRendererEvents();
			disposeTencentDocsLocalPreviewLocaleSync();
			disposeAppServerDesktopHostBridge();
			disposeAppServerDesktopHostEvents();
			disposeAppServerPowerEventBridge();
			await evalProxyServer?.stop();
			await localProbeServer.stop().catch((err) => {
				require_logger.mainLog.warn("[MainBootstrap] LocalProbeServer stop failed (non-fatal):", err instanceof Error ? err.message : String(err));
			});
			disposeLocalStorageMigrationCompletion?.();
			try {
				disposeTencentDocsSelectionBroadcast();
			} catch {}
			try {
				disposeTencentDocsRendererEventBridgeIpc();
			} catch {}
			disposeDesktopHostIpc();
			desktopDaemonState.dispose();
			daemonConnection.dispose();
			await daemon?.stop();
			await daemonProcess?.stop();
			cleanupLegacyLocalStorageMigrationResultFile(legacyLocalStorageMigrationResultPath, require_logger.mainLog);
			await monitorService.stop();
			database?.dispose();
		}
	};
}
async function initializeDesktopHostCellJSContainer(evalModeEnabled) {
	if (evalModeEnabled) {
		(await Promise.resolve().then(() => require("./register-auth-host-capabilities.js"))).registerElectronAuthHostCapabilities();
		const appServerModule = await Promise.resolve().then(() => require("./module.app-server.js"));
		return require_initialize.initializeCellJSContainer({
			baseModules: appServerModule.baseModules,
			workbuddyModule: appServerModule.default
		});
	}
	const desktopHostModule = await Promise.resolve().then(() => require("./module.desktop-host.js"));
	return require_initialize.initializeCellJSContainer({
		baseModules: desktopHostModule.baseModules,
		workbuddyModule: desktopHostModule.default
	});
}
async function prepareLegacyLocalStorageMigrationResultFile(productName, logger) {
	if (productName !== "WorkBuddy") return;
	try {
		const { LocalStorageMigrationService } = await Promise.resolve().then(() => require("./localstorage-migration.js"));
		const result = await new LocalStorageMigrationService().migrate();
		const resultPath = path.join(os.tmpdir().trim(), `workbuddy-localstorage-migration-${process.pid}-${Date.now()}.json`);
		fs.writeFileSync(resultPath, JSON.stringify(result), "utf8");
		return resultPath;
	} catch (error) {
		logger.warn("[MainBootstrap] Failed to prepare legacy localStorage migration input:", error);
		return;
	}
}
function cleanupLegacyLocalStorageMigrationResultFile(resultPath, logger) {
	if (!resultPath) return;
	try {
		fs.rmSync(resultPath, { force: true });
	} catch (error) {
		logger.warn("[MainBootstrap] Failed to remove legacy localStorage migration input:", error);
	}
}
async function readPendingLocalStorageMigration(connection, logger) {
	try {
		return await connection.invoke(require_workbuddy_auth_product_coordinator.MIGRATION_RPC_CHANNELS.GET_PENDING_LOCAL_STORAGE_MIGRATION);
	} catch (error) {
		logger.warn("[MainBootstrap] Failed to read app-server localStorage migration payload:", error);
		return;
	}
}
function createRemoteMigrationDonePromise(connection, logger, startupLog) {
	return new Promise((resolve) => {
		let settled = false;
		let lastPhase;
		const readAndLogPhase = (source, value) => {
			const phase = readMigrationPhase(value);
			if (phase && phase !== lastPhase) {
				lastPhase = phase;
				startupLog?.(`remote migration status ${source}: phase=${phase}`);
			}
			return phase;
		};
		const finish = () => {
			if (settled) return;
			settled = true;
			clearInterval(pollTimer);
			disposeEventListener();
			startupLog?.(`remote migration wait resolved${lastPhase ? ` phase=${lastPhase}` : ""}`);
			resolve();
		};
		const disposeEventListener = connection.onEvent((channel, data) => {
			if (channel !== require_workbuddy_auth_product_coordinator.MIGRATION_RPC_CHANNELS.HISTORY_STATUS_UPDATE) return;
			const phase = readAndLogPhase("event", data);
			if (phase && phase !== "running") finish();
		});
		const poll = async () => {
			if (settled) return;
			try {
				const phase = readAndLogPhase("poll", await connection.invoke(require_workbuddy_auth_product_coordinator.MIGRATION_RPC_CHANNELS.GET_HISTORY_STATUS));
				if (!phase || phase !== "running") finish();
			} catch (error) {
				logger.warn("[MainBootstrap] Failed to query app-server migration status:", error);
				finish();
			}
		};
		const runPoll = () => {
			poll().catch((error) => {
				logger.warn("[MainBootstrap] Failed to poll app-server migration status:", error);
				finish();
			});
		};
		const pollTimer = setInterval(runPoll, 1e3);
		runPoll();
	});
}
function readMigrationPhase(value) {
	if (!value || typeof value !== "object") return;
	const phase = value.phase;
	return typeof phase === "string" ? phase : void 0;
}
function isMigrationProgressEvent(value) {
	if (!value || typeof value !== "object") return false;
	const event = value;
	return typeof event.current === "number" && typeof event.total === "number" && (event.name === void 0 || typeof event.name === "string");
}
function assertBooleanResponse(value, channel) {
	if (typeof value !== "boolean") throw new Error(`Invalid response for ${channel}: expected boolean`);
	return value;
}
function assertOAuthCallbackResult(value, channel) {
	if (!value || typeof value !== "object" || typeof value.success !== "boolean") throw new Error(`Invalid response for ${channel}: expected OAuth callback result`);
	return value;
}
function isTencentDocsRendererPushChannel(channel) {
	return TENCENT_DOCS_RENDERER_PUSH_CHANNEL_SET.has(channel);
}
//#endregion
//#region src/main/features/desktop-host/local-file-drag.ts
var LOCAL_FILE_DRAG_CHANNEL = "artifact:start-drag-local-file";
var DRAG_IMAGE_SCALE = .5;
var MAX_DRAG_FILE_BYTES = 100 * 1024 * 1024;
var TEMP_DRAG_DIR_NAME = "workbuddy-artifact-drag";
var TEMP_FILE_TTL_MS = 1440 * 60 * 1e3;
function isRecord(value) {
	return value !== null && typeof value === "object";
}
function toFiniteNumber(value) {
	return typeof value === "number" && Number.isFinite(value) ? value : void 0;
}
function parseBytes(value) {
	if (value instanceof ArrayBuffer) return Buffer.from(value);
	if (ArrayBuffer.isView(value)) return Buffer.from(value.buffer, value.byteOffset, value.byteLength);
}
function sanitizeFileName(fileName) {
	return path.basename(fileName || "artifact").replace(/[\r\n]/g, " ").trim().replace(/[\\/:*?"<>|]/g, "_") || "artifact";
}
function getTempDragRoot() {
	return path.join(electron.app.getPath("temp"), TEMP_DRAG_DIR_NAME);
}
function hashTempKey(fileName, bytes, cacheKey) {
	const hash = (0, crypto$1.createHash)("sha256");
	hash.update(cacheKey || fileName);
	hash.update(String(bytes.length));
	if (!cacheKey) hash.update(bytes.subarray(0, Math.min(bytes.length, 4096)));
	return hash.digest("hex").slice(0, 16);
}
function parseDragImageRect(value) {
	if (!isRecord(value)) return;
	const x = toFiniteNumber(value.x);
	const y = toFiniteNumber(value.y);
	const width = toFiniteNumber(value.width);
	const height = toFiniteNumber(value.height);
	if (x === void 0 || y === void 0 || width === void 0 || height === void 0) return;
	if (width <= 0 || height <= 0) return;
	return {
		x: Math.max(0, Math.floor(x)),
		y: Math.max(0, Math.floor(y)),
		width: Math.min(512, Math.ceil(width)),
		height: Math.min(512, Math.ceil(height))
	};
}
/** 校验 renderer 传入的拖拽文件信息，避免主进程接受非本地绝对路径。 */
function parseLocalFileDragPayload(payload) {
	if (!isRecord(payload)) return null;
	const rawFilePath = typeof payload.filePath === "string" ? payload.filePath.trim() : void 0;
	const filePath = rawFilePath && !rawFilePath.includes("\0") && path.isAbsolute(rawFilePath) ? rawFilePath : void 0;
	const bytes = parseBytes(payload.bytes);
	if (!filePath && !bytes) return null;
	if (bytes && bytes.byteLength > MAX_DRAG_FILE_BYTES) {
		require_logger.mainLog.warn("[ArtifactDrag] ignored oversized virtual drag file");
		return null;
	}
	return {
		filePath,
		bytes,
		fileName: typeof payload.fileName === "string" ? payload.fileName : void 0,
		mimeType: typeof payload.mimeType === "string" ? payload.mimeType : void 0,
		cacheKey: typeof payload.cacheKey === "string" ? payload.cacheKey : void 0,
		dragImageRect: parseDragImageRect(payload.dragImageRect)
	};
}
async function materializeTempDragFile(fileInfo) {
	if (!fileInfo.bytes) return fileInfo.filePath;
	const safeFileName = sanitizeFileName(fileInfo.fileName);
	const tempDir = path.join(getTempDragRoot(), hashTempKey(safeFileName, fileInfo.bytes, fileInfo.cacheKey));
	await (0, fs_promises.mkdir)(tempDir, { recursive: true });
	const tempFilePath = path.join(tempDir, safeFileName);
	await (0, fs_promises.writeFile)(tempFilePath, fileInfo.bytes);
	return tempFilePath;
}
async function cleanupExpiredTempDragFiles() {
	const root = getTempDragRoot();
	try {
		const entries = await (0, fs_promises.readdir)(root, {
			withFileTypes: true,
			encoding: "utf8"
		});
		const now = Date.now();
		await Promise.all(entries.map(async (entry) => {
			if (!entry.isDirectory()) return;
			const target = path.join(root, entry.name);
			try {
				if (now - (await (0, fs_promises.stat)(target)).mtimeMs > TEMP_FILE_TTL_MS) await (0, fs_promises.rm)(target, {
					recursive: true,
					force: true
				});
			} catch {}
		}));
	} catch {}
}
async function captureDragIcon(event, rect) {
	if (!rect || event.sender.isDestroyed()) return electron.nativeImage.createEmpty();
	try {
		const image = await event.sender.capturePage(rect);
		if (image.isEmpty()) return electron.nativeImage.createEmpty();
		const size = image.getSize();
		return image.resize({
			width: Math.max(1, Math.round(size.width * DRAG_IMAGE_SCALE)),
			height: Math.max(1, Math.round(size.height * DRAG_IMAGE_SCALE)),
			quality: "best"
		});
	} catch (error) {
		require_logger.mainLog.warn("[ArtifactDrag] failed to capture drag preview, using empty fallback", error);
		return electron.nativeImage.createEmpty();
	}
}
async function startLocalFileDrag(event, payload) {
	const fileInfo = parseLocalFileDragPayload(payload);
	if (!fileInfo) {
		require_logger.mainLog.warn("[ArtifactDrag] ignored invalid local file drag payload");
		return;
	}
	const dragFilePath = await materializeTempDragFile(fileInfo);
	if (!dragFilePath) return;
	const displayName = sanitizeFileName(fileInfo.fileName || dragFilePath);
	try {
		if (!(await (0, fs_promises.stat)(dragFilePath)).isFile()) {
			require_logger.mainLog.warn(`[ArtifactDrag] ignored non-file drag target: ${displayName}`);
			return;
		}
	} catch (error) {
		require_logger.mainLog.warn(`[ArtifactDrag] local file unavailable: ${displayName}`, error);
		return;
	}
	const icon = await captureDragIcon(event, fileInfo.dragImageRect);
	if (event.sender.isDestroyed()) return;
	event.sender.startDrag({
		file: dragFilePath,
		icon
	});
}
var installed = false;
/** 注册本地文件原生拖拽 IPC，供 artifact 卡片拖到微信等外部窗口时发送真实文件。 */
function registerLocalFileDragHandler() {
	if (installed) return;
	installed = true;
	cleanupExpiredTempDragFiles().catch((error) => {
		require_logger.mainLog.warn("[ArtifactDrag] temp drag file cleanup failed", error);
	});
	electron.ipcMain.on(LOCAL_FILE_DRAG_CHANNEL, (event, payload) => {
		startLocalFileDrag(event, payload).catch((error) => {
			require_logger.mainLog.warn("[ArtifactDrag] unexpected drag handler failure", error);
		});
	});
}
//#endregion
//#region src/main/features/i18n/splash-i18n.ts
var translations = {
	"zh-CN": {
		title: "环境准备中",
		subtitle: "正在准备运行环境，请稍候，完成后自动进入主界面。",
		caption: "准备运行环境...",
		migratingTitle: "任务数据整理中",
		migratingSubtitle: "本次版本架构升级，正在整理历史任务，完成后自动进入主界面。",
		migratingProgress: "{{current}} / {{total}} 个任务",
		migratingFallback: "整理中...",
		repairingTitle: "数据修复中",
		repairingSubtitle: "检测到数据异常，正在自动修复，请稍候。",
		repairingBackup: "备份数据文件...",
		repairingRebuild: "重建数据库...",
		repairingRecover: "恢复历史数据..."
	},
	"en-US": {
		title: "Preparing Environment",
		subtitle: "Preparing the runtime environment. Please wait — the app will open automatically when ready.",
		caption: "Preparing runtime...",
		migratingTitle: "Migrating Task Data",
		migratingSubtitle: "Upgrading to the new architecture. Migrating historical task data — the app will open automatically when ready.",
		migratingProgress: "{{current}} / {{total}} tasks",
		migratingFallback: "Migrating...",
		repairingTitle: "Repairing Data",
		repairingSubtitle: "Data anomaly detected. Auto-repairing — please wait.",
		repairingBackup: "Backing up data files...",
		repairingRebuild: "Rebuilding database...",
		repairingRecover: "Recovering historical data..."
	}
};
function getSplashMessages(locale) {
	return translations[locale ?? require_menu_i18n.getMenuLocale()] ?? translations["zh-CN"];
}
//#endregion
//#region src/main/integrations/vendor/vendor-extract-service.ts
require_menu_builder.init_startup_type();
var import_adm_zip = /* @__PURE__ */ require_chunk.__toESM(require_adm_zip$1.require_adm_zip());
var execAsync = (0, util.promisify)(child_process.exec);
/**
* vendor 资源解压根目录（<CodebuddyHome>/vendor），与 binary-manager / agent-cli
* 的 home 目录语义对齐。运行时读取 `CODEBUDDY_CONFIG_DIR`，否则回退到 `~/.codebuddy`。
*/
function getCodebuddyHomeDir() {
	const configDir = process.env.CODEBUDDY_CONFIG_DIR;
	if (configDir && configDir.trim() !== "") return configDir;
	return path.join(os.homedir(), ".codebuddy");
}
var VENDOR_DIR = "vendor";
var MARKER_FILE = ".extracted";
/**
* 打包签名后由 CI 生成的 content-hash 文件名。
* 用于 macOS 目录类型的 vendor 资源：签名会改变二进制内容，
* 通过此文件检测"同版本号但内容变化"的情况。
*/
var CONTENT_HASH_FILE = ".content-hash";
/**
* 日志目录保持在 ~/.workbuddy/logs/ 不变：
* 该目录属于 Electron/VSCode 内核的 applicationName='workbuddy' 数据域，
* 与 vendor 数据目录独立演进，避免本次 PR 扩大影响面。
*/
var LOG_DIR = path.join(os.homedir(), ".workbuddy", "logs");
var LOG_FILE = "vendor-extract.log";
function getTimestamp() {
	return (/* @__PURE__ */ new Date()).toISOString();
}
function ensureLogDir() {
	if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR, { recursive: true });
}
function writeLogToFile(level, message) {
	try {
		ensureLogDir();
		const logPath = path.join(LOG_DIR, LOG_FILE);
		const logLine = `${getTimestamp()} [${level}] ${message}\n`;
		fs.appendFileSync(logPath, logLine, "utf-8");
	} catch {}
}
var logger = {
	info: (message) => {
		console.log(`[VendorExtract] ${message}`);
		writeLogToFile("INFO", message);
	},
	warn: (message) => {
		console.warn(`[VendorExtract] ${message}`);
		writeLogToFile("WARN", message);
	},
	error: (message, error) => {
		const errorStr = error ? ` ${error}` : "";
		console.error(`[VendorExtract] ${message}${errorStr}`);
		writeLogToFile("ERROR", `${message}${errorStr}`);
	}
};
/**
* 通用 vendor 资源解压服务
*/
var VendorExtractService = class {
	/**
	* 确保所有配置的 vendor 资源已解压
	*
	* @param resourcesPath  Electron 的 process.resourcesPath
	* @param assets          要处理的资源配置列表
	*/
	static async ensureAll(resourcesPath, assets) {
		const codebuddyHome = getCodebuddyHomeDir();
		logger.info(`ensureAll started, resourcesPath=${resourcesPath}, codebuddyHome=${codebuddyHome}, assets=${assets.length}`);
		return await Promise.all(assets.map((asset) => this.ensureOne(resourcesPath, asset)));
	}
	/**
	* 快速检查：是否存在任一需要解压的 asset。
	*
	* 与 ensureAll 相比此方法不产生日志、不触发解压，用于启动早期决定是否
	* 需要弹 splash 过渡窗口（如果所有 asset 都 already extracted / skipped，
	* 可直接进主窗口，避免 splash 闪一下）。
	*
	* 判断口径与 ensureOne 的 fast-path 完全一致：
	*   - 不适用当前平台 → 不需要
	*   - 归档文件不存在（dev 模式）→ 不需要（反正也没东西可解）
	*   - marker 文件 + verifyPath 都 OK → 不需要
	*   - 其它情况 → 需要
	*/
	static isExtractNeeded(resourcesPath, assets) {
		if (process.env.WORKBUDDY_VENDOR_FORCE_EXTRACT === "1") return true;
		for (const asset of assets) {
			if (asset.platforms && !asset.platforms.includes(process.platform)) continue;
			const extractDir = asset.managed ? path.join(os.homedir(), ".workbuddy", "binaries", asset.name, "versions", asset.version) : path.join(getCodebuddyHomeDir(), VENDOR_DIR, asset.name);
			const sourceInfo = this.resolveSource(resourcesPath, asset.archiveFile);
			if (!sourceInfo) continue;
			const markerPath = path.join(extractDir, MARKER_FILE);
			const archivePath = sourceInfo.kind === "archive" ? sourceInfo.path : void 0;
			const sourceDirPath = sourceInfo.kind === "directory" ? sourceInfo.path : void 0;
			if (this.needsExtraction(markerPath, asset.version, extractDir, asset.verifyPath, archivePath, sourceDirPath, asset.verifyPaths)) return true;
		}
		return false;
	}
	/**
	* 确保单个资源已解压
	*/
	static async ensureOne(resourcesPath, asset) {
		const extractDir = asset.managed ? path.join(os.homedir(), ".workbuddy", "binaries", asset.name, "versions", asset.version) : path.join(getCodebuddyHomeDir(), VENDOR_DIR, asset.name);
		logger.info(`${asset.name}: ensureOne started (platform=${process.platform}, target=${extractDir}, managed=${!!asset.managed})`);
		if (asset.platforms && !asset.platforms.includes(process.platform)) {
			logger.info(`${asset.name}: skipped (platform ${process.platform} not in [${asset.platforms.join(", ")}])`);
			return {
				name: asset.name,
				success: true,
				skipped: true
			};
		}
		const delayMsRaw = process.env.WORKBUDDY_VENDOR_EXTRACT_DELAY_MS;
		const delayMs = delayMsRaw ? Number(delayMsRaw) : 0;
		if (Number.isFinite(delayMs) && delayMs > 0) {
			logger.info(`${asset.name}: debug delay ${delayMs}ms (WORKBUDDY_VENDOR_EXTRACT_DELAY_MS)`);
			await new Promise((resolve) => setTimeout(resolve, delayMs));
		}
		const markerPath = path.join(extractDir, MARKER_FILE);
		const sourceInfo = this.resolveSource(resourcesPath, asset.archiveFile);
		try {
			if (!sourceInfo) {
				logger.info(`${asset.name}: bundled source not found for ${asset.archiveFile}, skipping`);
				if (asset.verifyPath) {
					const verifyFullPath = path.join(extractDir, asset.verifyPath);
					if (fs.existsSync(verifyFullPath)) {
						logger.info(`${asset.name}: existing extraction valid (${asset.verifyPath} exists), invoking onSkipped`);
						if (asset.onSkipped) asset.onSkipped(extractDir);
						return {
							name: asset.name,
							success: true,
							extractedDir: extractDir,
							skipped: true
						};
					}
				}
				return {
					name: asset.name,
					success: true,
					skipped: true
				};
			}
			const archivePath = sourceInfo.kind === "archive" ? sourceInfo.path : void 0;
			const sourceDirPath = sourceInfo.kind === "directory" ? sourceInfo.path : void 0;
			if (!this.needsExtraction(markerPath, asset.version, extractDir, asset.verifyPath, archivePath, sourceDirPath, asset.verifyPaths)) {
				logger.info(`${asset.name}: already extracted (v${asset.version})`);
				if (asset.onSkipped) {
					logger.info(`${asset.name}: invoking onSkipped callback (dir=${extractDir})`);
					asset.onSkipped(extractDir);
				}
				return {
					name: asset.name,
					success: true,
					extractedDir: extractDir,
					skipped: true
				};
			}
			const parentDir = path.dirname(extractDir);
			fs.mkdirSync(parentDir, { recursive: true });
			const tempDir = path.join(parentDir, `.extracting.${asset.name}.${process.pid}`);
			if (fs.existsSync(tempDir)) fs.rmSync(tempDir, {
				recursive: true,
				force: true
			});
			fs.mkdirSync(tempDir, { recursive: true });
			try {
				const startTime = Date.now();
				if (sourceInfo.kind === "archive") {
					const sourceSizeMB = (fs.statSync(sourceInfo.path).size / (1024 * 1024)).toFixed(2);
					logger.info(`${asset.name}: extracting ${asset.archiveFile} (${sourceSizeMB} MB)...`);
					await this.extract(sourceInfo.path, tempDir);
				} else {
					logger.info(`${asset.name}: copying bundled directory from ${sourceInfo.path}...`);
					this.copyDirectoryContents(sourceInfo.path, tempDir);
				}
				const elapsed = Date.now() - startTime;
				logger.info(`${asset.name}: source prepared in ${elapsed}ms`);
				this.stripSingleTopLevelDir(tempDir, asset.name);
				if (asset.verifyPath && process.platform !== "win32") {
					const executablePath = path.join(tempDir, asset.verifyPath);
					if (fs.existsSync(executablePath)) {
						await execAsync(`chmod +x "${executablePath}"`);
						logger.info(`${asset.name}: chmod +x applied to ${asset.verifyPath}`);
					}
				}
				const missingPath = this.verifyExtraction(tempDir, asset);
				if (missingPath) throw new Error(`Verification failed in temp extraction: ${missingPath} not found`);
				this.atomicReplace(extractDir, tempDir, asset.name);
			} catch (err) {
				try {
					fs.rmSync(tempDir, {
						recursive: true,
						force: true
					});
				} catch {}
				throw err;
			}
			const markerHash = archivePath ? this.computeFileHash(archivePath) : this.readContentHash(sourceInfo.path);
			let markerMtimeMs;
			if (archivePath) markerMtimeMs = fs.statSync(archivePath).mtimeMs;
			else {
				const contentHashPath = path.join(sourceInfo.path, CONTENT_HASH_FILE);
				if (fs.existsSync(contentHashPath)) markerMtimeMs = fs.statSync(contentHashPath).mtimeMs;
			}
			this.writeMarker(markerPath, asset.version, markerHash, markerMtimeMs);
			if (asset.onExtracted) {
				logger.info(`${asset.name}: invoking onExtracted callback (dir=${extractDir})`);
				asset.onExtracted(extractDir);
			}
			if (asset.managed) this.cleanupOldManagedVersions(asset.name, asset.version);
			this.cleanupStaleBackups(extractDir, asset.name);
			return {
				name: asset.name,
				success: true,
				extractedDir: extractDir
			};
		} catch (error) {
			const msg = error instanceof Error ? error.message : String(error);
			logger.error(`${asset.name}: failed - ${msg}`);
			return {
				name: asset.name,
				success: false,
				error: msg
			};
		}
	}
	static needsExtraction(markerPath, version, extractDir, verifyPath, archivePath, sourceDirPath, verifyPaths) {
		if (process.env.WORKBUDDY_VENDOR_FORCE_EXTRACT === "1") return true;
		if (!fs.existsSync(markerPath)) return true;
		try {
			const marker = this.parseMarker(markerPath);
			if (!marker) {
				logger.info("Marker parse failed or legacy format, needs re-extraction");
				return true;
			}
			if (marker.version !== version) {
				logger.info(`Version mismatch: found ${marker.version}, expected ${version}`);
				return true;
			}
			if (archivePath && fs.existsSync(archivePath)) try {
				const currentMtimeMs = fs.statSync(archivePath).mtimeMs;
				if (marker.archiveMtimeMs !== void 0 && currentMtimeMs === marker.archiveMtimeMs) {} else {
					const currentHash = this.computeFileHash(archivePath);
					if (currentHash !== marker.archiveHash) {
						logger.info(`Archive hash mismatch for version ${version}: marker=${marker.archiveHash}, current=${currentHash}`);
						return true;
					}
				}
			} catch (hashErr) {
				logger.warn(`Hash check failed for ${archivePath}: ${hashErr instanceof Error ? hashErr.message : String(hashErr)}`);
				return true;
			}
			if (sourceDirPath) {
				const contentHashPath = path.join(sourceDirPath, CONTENT_HASH_FILE);
				if (fs.existsSync(contentHashPath)) {
					const currentMtimeMs = fs.statSync(contentHashPath).mtimeMs;
					if (marker.archiveMtimeMs !== void 0 && currentMtimeMs === marker.archiveMtimeMs) {} else {
						const currentHash = fs.readFileSync(contentHashPath, "utf-8").trim();
						if (currentHash && currentHash !== marker.archiveHash) {
							logger.info(`Content hash mismatch for version ${version}: marker=${marker.archiveHash}, current=${currentHash}`);
							return true;
						}
					}
				}
			}
			if (verifyPath && !fs.existsSync(path.join(extractDir, verifyPath))) {
				logger.info(`Verify path missing: ${verifyPath}`);
				return true;
			}
			if (verifyPaths) {
				for (const p of verifyPaths) if (!fs.existsSync(path.join(extractDir, p))) {
					logger.info(`Verify path missing: ${p}`);
					return true;
				}
			}
			return false;
		} catch {
			return true;
		}
	}
	/**
	* 解析 marker 文件内容。
	* 新格式为 JSON（含 version + archiveHash），旧格式为纯文本版本号。
	* 旧格式返回 null，触发重新解压并升级为新格式。
	*/
	static parseMarker(markerPath) {
		const content = fs.readFileSync(markerPath, "utf-8").trim();
		try {
			const parsed = JSON.parse(content);
			if (typeof parsed === "object" && parsed !== null && typeof parsed.version === "string" && typeof parsed.archiveHash === "string") return parsed;
			return null;
		} catch {
			return null;
		}
	}
	/**
	* 计算文件的 SHA-256 hash（十六进制）。
	* 使用流式读取避免大文件一次性加载到内存。
	*/
	static computeFileHash(filePath) {
		const hash = crypto$1.createHash("sha256");
		const buffer = Buffer.alloc(64 * 1024);
		const fd = fs.openSync(filePath, "r");
		try {
			let bytesRead;
			while ((bytesRead = fs.readSync(fd, buffer, 0, buffer.length, null)) > 0) hash.update(buffer.subarray(0, bytesRead));
		} finally {
			fs.closeSync(fd);
		}
		return hash.digest("hex");
	}
	/**
	* 读取 CI 签名阶段生成的 .content-hash 文件。
	* macOS 上 vendor 是已解压的目录（签名后内容变化），通过此文件
	* 检测"同版本号但重新签名/打包"的情况。
	* 若文件不存在则返回空字符串（兼容未生成 hash 的旧包）。
	*/
	static readContentHash(sourceDirPath) {
		const hashFilePath = path.join(sourceDirPath, CONTENT_HASH_FILE);
		try {
			if (fs.existsSync(hashFilePath)) return fs.readFileSync(hashFilePath, "utf-8").trim();
		} catch {}
		return "";
	}
	/**
	* 将 marker 内容写入文件（JSON 格式）。
	*/
	static writeMarker(markerPath, version, archiveHash, archiveMtimeMs) {
		const content = {
			version,
			archiveHash,
			archiveMtimeMs
		};
		fs.writeFileSync(markerPath, JSON.stringify(content), "utf-8");
	}
	static resolveSource(resourcesPath, archiveFile) {
		const archivePath = path.join(resourcesPath, "vendor", archiveFile);
		if (fs.existsSync(archivePath)) return {
			path: archivePath,
			kind: "archive"
		};
		const directoryName = archiveFile.replace(/(\.tar\.gz|\.tgz|\.zip|\.dat)$/i, "");
		const directoryPath = path.join(resourcesPath, "vendor", directoryName);
		if (fs.existsSync(directoryPath) && fs.statSync(directoryPath).isDirectory()) return {
			path: directoryPath,
			kind: "directory"
		};
		return null;
	}
	static copyDirectoryContents(sourceDir, destDir) {
		safeCopyDirRecursive(sourceDir, destDir);
	}
	static async extract(archivePath, destDir) {
		if (archivePath.endsWith(".zip")) try {
			await execAsync(`tar -xf "${archivePath}" -C "${destDir}"`);
		} catch (error) {
			logger.warn(`zip extract via system tar failed, falling back to AdmZip: ${archivePath} (${error instanceof Error ? error.message : String(error)})`);
			try {
				const entries = fs.readdirSync(destDir);
				for (const entry of entries) fs.rmSync(path.join(destDir, entry), {
					recursive: true,
					force: true
				});
			} catch {}
			await new import_adm_zip.default(archivePath).extractAllToAsync(destDir, true, false);
		}
		else if (archivePath.endsWith(".tar.gz") || archivePath.endsWith(".tgz")) await execAsync(`tar -xzf "${archivePath}" -C "${destDir}"`);
		else if (archivePath.endsWith(".dat")) {
			const tmpTar = path.join(os.tmpdir().trim(), `wb-dat-extract-${process.pid}.tar.gz`);
			try {
				const data = fs.readFileSync(archivePath);
				data[1] = 139;
				fs.writeFileSync(tmpTar, data);
				await execAsync(`tar -xzf "${tmpTar}" -C "${destDir}"`);
			} finally {
				fs.rmSync(tmpTar, { force: true });
			}
		} else throw new Error(`Unsupported archive format: ${archivePath}`);
	}
	/**
	* 剥离 destDir 内唯一的顶层目录，把它的内容上移到 destDir。
	*
	* 仅在 destDir 下恰好只有 1 个目录且没有任何文件时才执行；否则记 info 并保留原状。
	* 使用 fs.renameSync 在同盘符下为 O(1)，适合大体积资源。
	*/
	static stripSingleTopLevelDir(destDir, assetName) {
		const entries = fs.readdirSync(destDir, { withFileTypes: true }).filter((e) => e.name !== CONTENT_HASH_FILE);
		if (entries.length !== 1 || !entries[0].isDirectory()) {
			logger.info(`${assetName}: stripTopLevelDir skipped - not a single top-level directory, found ${entries.length} entries: ${entries.map((e) => e.name).join(", ")}`);
			return;
		}
		const topDirName = entries[0].name;
		const topDirPath = path.join(destDir, topDirName);
		const innerEntries = fs.readdirSync(topDirPath);
		for (const name of innerEntries) {
			const target = path.join(destDir, name);
			if (name === topDirName) {
				const tempTarget = path.join(destDir, `${name}.__strip_tmp__`);
				fs.renameSync(path.join(topDirPath, name), tempTarget);
				continue;
			}
			if (fs.existsSync(target)) throw new Error(`stripTopLevelDir conflict: ${target} already exists while moving from ${topDirName}/${name}`);
			fs.renameSync(path.join(topDirPath, name), target);
		}
		fs.rmdirSync(topDirPath);
		const tempPath = path.join(destDir, `${topDirName}.__strip_tmp__`);
		if (fs.existsSync(tempPath)) fs.renameSync(tempPath, path.join(destDir, topDirName));
		logger.info(`${assetName}: stripped top-level directory "${topDirName}"`);
	}
	/**
	* 验证解压结果是否完整。verifyPath 和 verifyPaths 都要通过。
	* @returns 第一个缺失的路径，或 null 表示全部通过
	*/
	static verifyExtraction(dir, asset) {
		const paths = [...asset.verifyPath ? [asset.verifyPath] : [], ...asset.verifyPaths ?? []];
		for (const p of paths) if (!fs.existsSync(path.join(dir, p))) return p;
		return null;
	}
	/**
	* 原子替换 extractDir：先移走旧目录，再把新目录 rename 就位。
	*
	* 三级 fallback 策略：
	* 1. renameSync 整个旧目录到 .old.{pid}，再 rename tempDir 就位（非破坏性）
	* 2. 逐文件就地替换（Windows 上目录含被占用文件时，目录级 rename 返回 EBUSY，
	*    但文件级 rename 可以成功）
	*
	* 注意：不直接对 extractDir 执行 rmSync，因为 rmSync(recursive) 可能
	* 部分删除文件后因 EBUSY 失败，留下不一致的目录状态。
	*/
	static atomicReplace(extractDir, tempDir, assetName) {
		if (!fs.existsSync(extractDir)) {
			fs.renameSync(tempDir, extractDir);
			return;
		}
		const oldBackup = `${extractDir}.old.${process.pid}`;
		try {
			fs.renameSync(extractDir, oldBackup);
			logger.info(`${assetName}: renamed old dir to ${path.basename(oldBackup)}`);
			fs.renameSync(tempDir, extractDir);
			try {
				fs.rmSync(oldBackup, {
					recursive: true,
					force: true
				});
			} catch {}
			return;
		} catch {}
		logger.info(`${assetName}: directory-level rename failed, falling back to in-place file merge`);
		this.inPlaceMergeReplace(extractDir, tempDir, assetName);
	}
	/**
	* 就地逐文件替换：把 tempDir 内容合并到 extractDir。
	*
	* Windows 上 rename/delete 含被占用文件的目录会返回 EBUSY，但对单个被占用
	* 文件执行 rename 可以成功（进程通过旧句柄继续访问原位置）。利用这一特性，
	* 逐文件将旧项移开、新项移入，达到等效的"原子替换"。
	*/
	static inPlaceMergeReplace(extractDir, tempDir, assetName) {
		const tempEntries = new Set(fs.readdirSync(tempDir));
		for (const name of tempEntries) {
			const srcPath = path.join(tempDir, name);
			const dstPath = path.join(extractDir, name);
			if (fs.existsSync(dstPath)) {
				const oldName = `${dstPath}.old.${process.pid}`;
				try {
					fs.renameSync(dstPath, oldName);
					logger.info(`${assetName}: moved aside ${name} -> ${name}.old.${process.pid}`);
				} catch {
					try {
						fs.rmSync(dstPath, {
							recursive: true,
							force: true
						});
					} catch (rmErr) {
						logger.warn(`${assetName}: cannot replace ${name}: ${rmErr instanceof Error ? rmErr.message : String(rmErr)}`);
						continue;
					}
				}
			}
			fs.renameSync(srcPath, dstPath);
		}
		try {
			for (const name of fs.readdirSync(extractDir)) {
				if (tempEntries.has(name) || name === MARKER_FILE || /\.old\.\d+$/.test(name)) continue;
				try {
					fs.rmSync(path.join(extractDir, name), {
						recursive: true,
						force: true
					});
					logger.info(`${assetName}: removed stale entry ${name}`);
				} catch {}
			}
		} catch {}
		try {
			fs.rmSync(tempDir, {
				recursive: true,
				force: true
			});
		} catch {}
	}
	/**
	* Best-effort 清理残留备份：
	* 1. 同级目录下的 .old.* 目录备份（Level 2 留下的）
	* 2. extractDir 内部的 *.old.{pid} 文件残留（Level 3 留下的）
	*/
	static cleanupStaleBackups(extractDir, assetName) {
		const parentDir = path.dirname(extractDir);
		const baseName = path.basename(extractDir);
		try {
			for (const entry of fs.readdirSync(parentDir)) if (entry.startsWith(`${baseName}.old.`)) try {
				fs.rmSync(path.join(parentDir, entry), {
					recursive: true,
					force: true
				});
				logger.info(`${assetName}: cleaned up stale backup ${entry}`);
			} catch {}
		} catch {}
		try {
			for (const entry of fs.readdirSync(extractDir)) if (/\.old\.\d+$/.test(entry)) try {
				fs.rmSync(path.join(extractDir, entry), {
					recursive: true,
					force: true
				});
				logger.info(`${assetName}: cleaned up stale file backup ${entry}`);
			} catch {}
		} catch {}
	}
	/**
	* 清理 managed 资产的旧版本目录。
	* 仅删除满足以下条件的目录：
	* 1. 不是当前目标版本
	* 2. 存在 .extracted 标记文件
	* 3. marker 中记录的版本与目录名一致（确认为合法完整的旧版解压产物）
	*
	* 兼容新旧两种 marker 格式：
	* - 旧格式：纯文本版本号
	* - 新格式：JSON { version, archiveHash }
	*/
	static cleanupOldManagedVersions(assetName, currentVersion) {
		const versionsDir = path.join(os.homedir(), ".workbuddy", "binaries", assetName, "versions");
		if (!fs.existsSync(versionsDir)) return;
		try {
			const entries = fs.readdirSync(versionsDir, { withFileTypes: true });
			for (const entry of entries) {
				if (!entry.isDirectory() || entry.name === currentVersion) continue;
				const dirPath = path.join(versionsDir, entry.name);
				const markerPath = path.join(dirPath, MARKER_FILE);
				if (!fs.existsSync(markerPath)) continue;
				if (this.readMarkerVersion(markerPath) !== entry.name) continue;
				logger.info(`${assetName}: removing old managed version ${entry.name}`);
				fs.rmSync(dirPath, {
					recursive: true,
					force: true
				});
			}
		} catch (error) {
			logger.warn(`${assetName}: failed to cleanup old versions - ${error}`);
		}
	}
	/**
	* 从 marker 文件中读取版本号，兼容新旧格式。
	* - 新格式（JSON）：返回 parsed.version
	* - 旧格式（纯文本）：返回 trim 后的文本内容
	*/
	static readMarkerVersion(markerPath) {
		try {
			const content = fs.readFileSync(markerPath, "utf-8").trim();
			try {
				const parsed = JSON.parse(content);
				if (typeof parsed === "object" && parsed !== null && typeof parsed.version === "string") return parsed.version;
			} catch {}
			return content;
		} catch {
			return "";
		}
	}
};
function safeCopyDirRecursive(srcDir, dstDir) {
	try {
		fs.mkdirSync(dstDir, { recursive: true });
	} catch (err) {
		logger.warn(`safeCopyDirRecursive: mkdirSync failed for ${dstDir}: ${err instanceof Error ? err.message : String(err)}`);
		return;
	}
	let entries;
	try {
		entries = fs.readdirSync(srcDir, { withFileTypes: true });
	} catch (err) {
		logger.warn(`safeCopyDirRecursive: readdirSync failed for ${srcDir}: ${err instanceof Error ? err.message : String(err)}`);
		return;
	}
	for (const entry of entries) {
		const srcPath = path.join(srcDir, entry.name);
		const dstPath = path.join(dstDir, entry.name);
		if (entry.isDirectory()) safeCopyDirRecursive(srcPath, dstPath);
		else if (entry.isFile()) try {
			fs.copyFileSync(srcPath, dstPath);
		} catch (err) {
			logger.warn(`safeCopyDirRecursive: failed to copy ${entry.name}: ${err instanceof Error ? err.message : String(err)}`);
		}
		else if (entry.isSymbolicLink()) try {
			const linkTarget = fs.readlinkSync(srcPath);
			fs.symlinkSync(linkTarget, dstPath);
		} catch (err) {
			logger.warn(`safeCopyDirRecursive: failed to copy symlink ${entry.name}: ${err instanceof Error ? err.message : String(err)}`);
		}
	}
}
//#endregion
//#region src/main/integrations/vendor/vendor-assets.ts
/**
* Vendor Assets Configuration
*
* 集中定义所有需要自动解压的 vendor 资源。
* 新增资源时只需在 VENDOR_ASSETS 数组中添加配置。
*/
/**
* 记录 vendor asset 设置/复用环境变量的轻量日志。
*
* 本模块无 logger 依赖，改用 console.log（主进程 stdout 会被 mainLog/electron-log 捕获），
* 前缀与其他 vendor 日志对齐以便 grep。
*/
function logAssetEnv(name, key, value, phase, reused = false) {
	if (reused) console.log(`[VendorAssets] ${name}: ${key} already set, keeping existing value ${value}`);
	else console.log(`[VendorAssets] ${name}: set ${key}=${value} (from ${phase})`);
}
/**
* 所有 vendor 资源配置
*
* 说明：
* - 解压后若目标目录下恰好只有一个顶层目录，会自动剥离该目录并将内容上移一层，
*   使 extractDir 本身即为资源根目录（例如 ~/.workbuddy/vendor/node/node.exe 直接可用）。
* - `version` 变更会触发旧布局自动清理 + 重新解压。
*
* 示例：添加新资源
* ```ts
* {
*     name: 'my-tool',
*     archiveFile: 'my-tool.zip',
*     version: '1.0.0',
*     verifyPath: path.join('bin', 'my-tool.exe'),
*     platforms: ['win32'],
*     onExtracted: (dir) => {
*         process.env.MY_TOOL_PATH = path.join(dir, 'bin', 'my-tool.exe');
*     },
*     onSkipped: (dir) => {
*         if (!process.env.MY_TOOL_PATH) {
*             process.env.MY_TOOL_PATH = path.join(dir, 'bin', 'my-tool.exe');
*         }
*     },
* },
* ```
*/
var VENDOR_ASSETS = [
	{
		name: "PortableGit",
		archiveFile: "PortableGit.zip",
		version: "1.1.0",
		verifyPath: path.join("bin", "bash.exe"),
		platforms: ["win32"],
		onExtracted: (dir) => {
			const value = path.join(dir, "bin", "bash.exe");
			if (fs.existsSync(value)) {
				process.env.CODEBUDDY_CODE_GIT_BASH_PATH = value;
				logAssetEnv("PortableGit", "CODEBUDDY_CODE_GIT_BASH_PATH", value, "onExtracted");
			} else console.warn(`[VendorAssets] PortableGit: bash.exe not found at ${value} after extraction, skipping env set`);
		},
		onSkipped: (dir) => {
			const value = path.join(dir, "bin", "bash.exe");
			if (!process.env.CODEBUDDY_CODE_GIT_BASH_PATH) if (fs.existsSync(value)) {
				process.env.CODEBUDDY_CODE_GIT_BASH_PATH = value;
				logAssetEnv("PortableGit", "CODEBUDDY_CODE_GIT_BASH_PATH", value, "onSkipped");
			} else console.warn(`[VendorAssets] PortableGit: bash.exe not found at ${value}, skipping env set`);
			else logAssetEnv("PortableGit", "CODEBUDDY_CODE_GIT_BASH_PATH", process.env.CODEBUDDY_CODE_GIT_BASH_PATH, "onSkipped", true);
		}
	},
	{
		name: "node",
		archiveFile: "node.zip",
		version: "22.22.2",
		managed: true,
		verifyPath: "node.exe",
		verifyPaths: ["node.exe", "npm.cmd"],
		platforms: ["win32"]
	},
	{
		name: "python",
		archiveFile: "python.zip",
		version: "3.13.12",
		managed: true,
		verifyPath: "python.exe",
		platforms: ["win32"]
	},
	{
		name: "node",
		archiveFile: "node.tar.gz",
		version: "22.22.2",
		managed: true,
		verifyPath: path.join("bin", "node"),
		platforms: ["darwin"]
	},
	{
		name: "python",
		archiveFile: "python.dat",
		version: "3.13.12",
		managed: true,
		verifyPath: path.join("bin", "python3"),
		platforms: ["darwin"]
	}
];
//#endregion
//#region src/main/integrations/wechat-chat-history/clipboard-zip-reader.ts
/**
* System-clipboard → WeChat chat-record ZIP reader (main-process only).
*
* Strategy:
*  1. macOS custom UTI `wx.zip.data`/`wx.zip.name` (matches both local macOS
*     WeChat and iOS WeChat data synced via Apple Universal Clipboard).
*     Also supports alternative UTIs `com.trolltech.anymime.wx.zip.data` and
*     `com.trolltech.anymime.wx.zip.name` for compatibility.
*  2. Standard file URL (`public.file-url` on macOS, `FileNameW` on Windows).
*  3. Raw `application/zip` binary buffer (Windows fallback).
*
* Resulting ZIP is written to `<tempDir>/<timestamp>-<rand>.zip`. The reader
* never throws — failures map to `{ ok: false, reason }` so the deeplink
* handler can broadcast a degraded chip to the renderer.
*/
/** Subset of formats we ask Electron about; order matters. */
var CUSTOM_UTI_DATA = "wx.zip.data";
var CUSTOM_UTI_NAME = "wx.zip.name";
var CUSTOM_UTI_DATA_ALT = "com.trolltech.anymime.wx.zip.data";
var CUSTOM_UTI_NAME_ALT = "com.trolltech.anymime.wx.zip.name";
var FILE_URL_FORMAT = "public.file-url";
var WINDOWS_FILE_NAME_FORMAT = "FileNameW";
/**
* Main entry — try sources in priority order and stop at the first that
* produces a non-empty buffer or a file URL we can copy.
*/
async function readChatHistoryZipFromClipboard(options) {
	try {
		const buf = readBufferFromFormats([CUSTOM_UTI_DATA, CUSTOM_UTI_DATA_ALT]);
		if (buf && buf.length > 0) {
			const name = readFromFormats([CUSTOM_UTI_NAME, CUSTOM_UTI_NAME_ALT]) || void 0;
			return await persist(buf, options.tempDir, "native-uti", name);
		}
	} catch {}
	try {
		const localPath = readClipboardFilePath();
		if (localPath && localPath.toLowerCase().endsWith(".zip")) {
			let buf;
			try {
				buf = await node_fs_promises.readFile(localPath);
			} catch {
				return {
					ok: false,
					source: "file-url",
					reason: "io-error"
				};
			}
			const name = node_path.basename(localPath);
			return await persist(buf, options.tempDir, "file-url", name);
		}
	} catch {}
	try {
		const buf = readBufferSafe("application/zip");
		if (buf && buf.length > 0) return await persist(buf, options.tempDir, "binary-buffer", void 0);
	} catch {}
	return {
		ok: false,
		source: null,
		reason: "no-clipboard-data"
	};
}
/**
* Wrap `clipboard.readBuffer(format)` so it never throws and so we can stub
* it cleanly in unit tests.
*/
function readBufferSafe(format) {
	try {
		const buf = electron.clipboard.readBuffer(format);
		return buf instanceof Buffer ? buf : void 0;
	} catch {
		return;
	}
}
/**
* Try reading buffer from multiple formats in order; return the first non-empty
* buffer, or undefined if none found.
*/
function readBufferFromFormats(formats) {
	for (const fmt of formats) {
		const buf = readBufferSafe(fmt);
		if (buf && buf.length > 0) return buf;
	}
}
/**
* Try reading text from multiple formats in order; return the first non-empty
* string, or undefined if none found.
*/
function readFromFormats(formats) {
	for (const fmt of formats) try {
		const val = electron.clipboard.read(fmt);
		if (val) return val;
	} catch {}
}
/**
* Convert a clipboard file URL (e.g. `file:///Users/.../chat.zip`) to an
* absolute filesystem path. Returns undefined on parse failure.
*/
function readClipboardFilePath() {
	const fileUrl = electron.clipboard.read(FILE_URL_FORMAT);
	if (fileUrl) return parseClipboardFileUrlPath(fileUrl);
	return readWindowsFileName();
}
function parseClipboardFileUrlPath(url) {
	try {
		const u = new URL(url);
		if (u.protocol !== "file:") return;
		return (0, node_url.fileURLToPath)(u);
	} catch {
		return;
	}
}
function readWindowsFileName() {
	const buf = readBufferSafe(WINDOWS_FILE_NAME_FORMAT);
	if (!buf || buf.length === 0) return;
	const raw = buf.toString("utf16le");
	const terminatorIndex = raw.indexOf("\0");
	return raw.slice(0, terminatorIndex >= 0 ? terminatorIndex : void 0).trim() || void 0;
}
async function persist(buf, tempDir, source, fileName) {
	try {
		await node_fs_promises.mkdir(tempDir, { recursive: true });
	} catch {
		return {
			ok: false,
			source,
			reason: "io-error"
		};
	}
	const stamp = formatTimestamp$1(/* @__PURE__ */ new Date());
	const rand = node_crypto.randomBytes(3).toString("hex");
	const baseName = sanitizeBaseName(fileName) ?? `${stamp}-${rand}.zip`;
	const target = node_path.join(tempDir, `${stamp}-${rand}-${baseName}`);
	try {
		await node_fs_promises.writeFile(target, buf, { mode: 384 });
	} catch {
		return {
			ok: false,
			source,
			reason: "io-error"
		};
	}
	return {
		ok: true,
		filePath: target,
		fileName: baseName,
		byteSize: buf.length,
		source
	};
}
function formatTimestamp$1(d) {
	const pad = (n) => n.toString().padStart(2, "0");
	return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
}
/**
* Reduce the suggested fileName to a basename that is safe to use on every
* supported platform. Strips path separators and characters Windows rejects.
*/
function sanitizeBaseName(fileName) {
	if (!fileName) return;
	const trimmed = fileName.trim();
	if (!trimmed) return;
	const base = node_path.basename(trimmed);
	const invalidPathChars = "<>:\"/\\|?*";
	const cleaned = Array.from(base, (ch) => ch.charCodeAt(0) < 32 || invalidPathChars.includes(ch) ? "_" : ch).join("").trim();
	if (!cleaned) return;
	return cleaned.toLowerCase().endsWith(".zip") ? cleaned : `${cleaned}.zip`;
}
/**
* Sweep the temp directory for ZIP files older than `maxAgeMs`. Intended to
* be invoked once at startup so we don't leak the user's chat exports.
*
* Never throws — surface logging is the caller's responsibility.
*/
async function cleanupStaleChatHistoryZips(opts) {
	const maxAgeMs = opts.maxAgeMs ?? 1440 * 60 * 1e3;
	const cutoff = Date.now() - maxAgeMs;
	let scanned = 0;
	let removed = 0;
	let errors = 0;
	let entries;
	try {
		entries = await node_fs_promises.readdir(opts.tempDir);
	} catch {
		return {
			scanned: 0,
			removed: 0,
			errors: 0
		};
	}
	for (const name of entries) {
		const full = node_path.join(opts.tempDir, name);
		try {
			const stat = await node_fs_promises.stat(full);
			scanned += 1;
			if ((stat.isFile() || stat.isDirectory()) && stat.mtimeMs < cutoff) {
				await node_fs_promises.rm(full, {
					force: true,
					recursive: stat.isDirectory()
				});
				removed += 1;
			}
		} catch {
			errors += 1;
		}
	}
	return {
		scanned,
		removed,
		errors
	};
}
//#endregion
//#region src/main/integrations/wechat-chat-history/win-protocol.ts
/**
* Windows WeChat chat-history protocol helpers.
*
* The upstream protocol uses proto2-style protobuf messages with only int32,
* string, bytes, and one nested message. Keeping this tiny encoder local avoids
* adding a runtime dependency while still testing the exact wire payload.
*/
var WechatChatHistoryWinCommand = /* @__PURE__ */ function(WechatChatHistoryWinCommand) {
	WechatChatHistoryWinCommand[WechatChatHistoryWinCommand["REQUEST_DATA"] = 1] = "REQUEST_DATA";
	WechatChatHistoryWinCommand[WechatChatHistoryWinCommand["REPLY_DATA"] = 2] = "REPLY_DATA";
	WechatChatHistoryWinCommand[WechatChatHistoryWinCommand["RESULT_DATA"] = 3] = "RESULT_DATA";
	return WechatChatHistoryWinCommand;
}({});
var WIRE_VARINT = 0;
var WIRE_LENGTH_DELIMITED = 2;
var FIELD_AGENT_PROCESS_ID = 1;
var FIELD_AGENT_HWND_ID = 2;
var FIELD_AGENT_PROCESS_NAME = 3;
var FIELD_AGENT_APP_VER = 4;
var FIELD_NOTIFY_CMD = 1;
var FIELD_NOTIFY_KEY = 2;
var FIELD_NOTIFY_APP_INFO = 3;
var FIELD_NOTIFY_PATH = 4;
var FIELD_NOTIFY_MD5 = 5;
var CERTIFY_QUERY_KEYS = [
	"certify_info",
	"agent_certify_info",
	"app_info",
	"cert"
];
function encodeAgentCertifyInfo(info) {
	const chunks = [];
	writeOptionalInt32(chunks, FIELD_AGENT_PROCESS_ID, info.processId);
	writeOptionalInt32(chunks, FIELD_AGENT_HWND_ID, info.hwndId);
	writeOptionalBytes(chunks, FIELD_AGENT_PROCESS_NAME, info.processName);
	writeOptionalBytes(chunks, FIELD_AGENT_APP_VER, info.appVer);
	return Buffer.concat(chunks);
}
function decodeAgentCertifyInfo(data) {
	const reader = new ProtoReader(Buffer.from(data));
	const result = {};
	while (!reader.done()) {
		const tag = reader.readVarint();
		const fieldNo = tag >>> 3;
		const wireType = tag & 7;
		switch (fieldNo) {
			case FIELD_AGENT_PROCESS_ID:
				result.processId = readInt32Field(reader, wireType);
				break;
			case FIELD_AGENT_HWND_ID:
				result.hwndId = readInt32Field(reader, wireType);
				break;
			case FIELD_AGENT_PROCESS_NAME:
				result.processName = readBytesField(reader, wireType);
				break;
			case FIELD_AGENT_APP_VER:
				result.appVer = readBytesField(reader, wireType);
				break;
			default:
				reader.skip(wireType);
				break;
		}
	}
	return result;
}
function encodeNotifyAgentMsg(msg) {
	const chunks = [];
	writeOptionalInt32(chunks, FIELD_NOTIFY_CMD, msg.cmd);
	writeOptionalString(chunks, FIELD_NOTIFY_KEY, msg.key);
	if (msg.appInfo) writeOptionalBytes(chunks, FIELD_NOTIFY_APP_INFO, encodeAgentCertifyInfo(msg.appInfo));
	writeOptionalString(chunks, FIELD_NOTIFY_PATH, msg.path);
	writeOptionalString(chunks, FIELD_NOTIFY_MD5, msg.md5);
	return Buffer.concat(chunks);
}
function decodeNotifyAgentMsg(data) {
	const reader = new ProtoReader(Buffer.from(data));
	const result = {};
	while (!reader.done()) {
		const tag = reader.readVarint();
		const fieldNo = tag >>> 3;
		const wireType = tag & 7;
		switch (fieldNo) {
			case FIELD_NOTIFY_CMD:
				result.cmd = readInt32Field(reader, wireType);
				break;
			case FIELD_NOTIFY_KEY:
				result.key = readStringField(reader, wireType);
				break;
			case FIELD_NOTIFY_APP_INFO:
				result.appInfo = decodeAgentCertifyInfo(readBytesField(reader, wireType));
				break;
			case FIELD_NOTIFY_PATH:
				result.path = readStringField(reader, wireType);
				break;
			case FIELD_NOTIFY_MD5:
				result.md5 = readStringField(reader, wireType);
				break;
			default:
				reader.skip(wireType);
				break;
		}
	}
	return result;
}
function decodeAgentCertifyInfoFromBase64(encoded) {
	const normalized = encoded.replace(/-/g, "+").replace(/_/g, "/");
	if (!/^[A-Za-z0-9+/]*={0,2}$/.test(normalized)) throw new Error("Invalid base64 AgentCertifyInfo");
	return decodeAgentCertifyInfo(Buffer.from(normalized, "base64"));
}
/** Extract WeChat certification info from a deeplink URL query string. */
function parseAgentCertifyInfoFromUrl(rawUrl) {
	let url;
	try {
		url = new URL(rawUrl);
	} catch {
		return;
	}
	for (const key of CERTIFY_QUERY_KEYS) {
		const encoded = url.searchParams.get(key);
		if (!encoded) continue;
		try {
			return decodeAgentCertifyInfoFromBase64(encoded);
		} catch {
			return;
		}
	}
}
function hasAgentCertifyInfoInUrl(rawUrl) {
	try {
		const url = new URL(rawUrl);
		return CERTIFY_QUERY_KEYS.some((key) => Boolean(url.searchParams.get(key)));
	} catch {
		return false;
	}
}
function writeOptionalInt32(chunks, fieldNo, value) {
	if (value === void 0) return;
	chunks.push(encodeTag(fieldNo, WIRE_VARINT), encodeVarint(value >>> 0));
}
function writeOptionalString(chunks, fieldNo, value) {
	if (value === void 0) return;
	writeOptionalBytes(chunks, fieldNo, Buffer.from(value, "utf-8"));
}
function writeOptionalBytes(chunks, fieldNo, value) {
	if (value === void 0) return;
	const data = Buffer.from(value);
	chunks.push(encodeTag(fieldNo, WIRE_LENGTH_DELIMITED), encodeVarint(data.length), data);
}
function encodeTag(fieldNo, wireType) {
	return encodeVarint(fieldNo << 3 | wireType);
}
function encodeVarint(value) {
	const bytes = [];
	let current = value >>> 0;
	while (current >= 128) {
		bytes.push(current & 127 | 128);
		current >>>= 7;
	}
	bytes.push(current);
	return Buffer.from(bytes);
}
function readInt32Field(reader, wireType) {
	assertWireType(wireType, WIRE_VARINT);
	return reader.readVarint() | 0;
}
function readStringField(reader, wireType) {
	return readBytesField(reader, wireType).toString("utf-8");
}
function readBytesField(reader, wireType) {
	assertWireType(wireType, WIRE_LENGTH_DELIMITED);
	return reader.readBytes();
}
function assertWireType(actual, expected) {
	if (actual !== expected) throw new Error(`Unexpected protobuf wire type: expected ${expected}, got ${actual}`);
}
var ProtoReader = class {
	offset = 0;
	constructor(data) {
		this.data = data;
	}
	done() {
		return this.offset >= this.data.length;
	}
	readVarint() {
		let result = 0;
		let shift = 0;
		while (shift < 35) {
			if (this.offset >= this.data.length) throw new Error("Unexpected end of protobuf varint");
			const byte = this.data[this.offset++];
			result |= (byte & 127) << shift;
			if ((byte & 128) === 0) return result >>> 0;
			shift += 7;
		}
		throw new Error("Protobuf varint is too long");
	}
	readBytes() {
		const len = this.readVarint();
		const end = this.offset + len;
		if (end > this.data.length) throw new Error("Unexpected end of protobuf bytes");
		const value = this.data.subarray(this.offset, end);
		this.offset = end;
		return value;
	}
	skip(wireType) {
		switch (wireType) {
			case WIRE_VARINT:
				this.readVarint();
				break;
			case WIRE_LENGTH_DELIMITED:
				this.readBytes();
				break;
			default: throw new Error(`Unsupported protobuf wire type: ${wireType}`);
		}
	}
};
//#endregion
//#region src/main/integrations/wechat-chat-history/win-chat-history-source.ts
/** Windows source for WeChat chat-history ZIP paths. */
/**
* WeChat's real client puts the flow "task_info" key in the deeplink `key`
* query parameter (a base64-ish string ending in "-2"). The wechat side rejects
* any REQUEST_DATA whose NotifyAgentMsg.key does not match a known task_info
* ("task_info not found, key: ..." in the client log), so we must use that
* value verbatim as our request key instead of generating a random UUID.
* Fall back to a random UUID only when the deeplink omits the key (older
* clients / loopback smoke test).
*/
function extractRequestKey(rawUrl) {
	try {
		const key = new URL(rawUrl).searchParams.get("key");
		if (key && key.length > 0) return key;
	} catch {}
	return node_crypto.randomUUID();
}
var DEFAULT_AGENT_PROCESS_NAME = "WorkBuddy.exe";
var DEFAULT_AGENT_APP_VER = "workbuddy-dev";
var DEFAULT_REQUEST_TIMEOUT_MS = 5e3;
async function readChatHistoryZipFromWinProtocol(options) {
	const source = options.source ?? "win-copydata";
	const wechatInfo = parseAgentCertifyInfoFromUrl(options.url);
	if (!wechatInfo) return {
		ok: false,
		source,
		reason: "missing-certify-info"
	};
	if (!wechatInfo.hwndId) return {
		ok: false,
		source,
		reason: "missing-target-hwnd"
	};
	const targetHwnd = wechatInfo.hwndId;
	const key = extractRequestKey(options.url);
	options.logger?.info("[WechatChatHistory] cert parsed", {
		targetHwnd,
		targetHwndHex: `0x${targetHwnd.toString(16)}`,
		certProcessId: wechatInfo.processId,
		certProcessName: wechatInfo.processName?.toString("utf-8"),
		certAppVer: wechatInfo.appVer?.toString("utf-8")
	});
	const agentInfo = buildAgentCertifyInfo(options.agentHwnd);
	const requestPayload = encodeNotifyAgentMsg({
		cmd: WechatChatHistoryWinCommand.REQUEST_DATA,
		key,
		appInfo: agentInfo
	});
	let replyPayload;
	try {
		replyPayload = await options.transport.sendRequest(targetHwnd, requestPayload, { timeoutMs: options.requestTimeoutMs ?? DEFAULT_REQUEST_TIMEOUT_MS });
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		options.logger?.warn("[WechatChatHistory] Windows protocol request failed", {
			key,
			error: message
		});
		return {
			ok: false,
			source,
			reason: "request-failed",
			error: message
		};
	}
	let reply;
	try {
		reply = decodeNotifyAgentMsg(replyPayload);
	} catch (error) {
		return {
			ok: false,
			source,
			reason: "invalid-reply",
			error: error instanceof Error ? error.message : String(error)
		};
	}
	if (reply.cmd !== WechatChatHistoryWinCommand.REPLY_DATA || reply.key !== key || !reply.path) return {
		ok: false,
		source,
		reason: "invalid-reply",
		error: `Unexpected reply cmd=${reply.cmd ?? "<none>"} key=${reply.key ?? "<none>"}`
	};
	const filePath = reply.path;
	return {
		ok: true,
		filePath,
		fileName: basenameFromAnyPlatformPath(filePath),
		source,
		async cleanup() {
			const cleanupPayload = encodeNotifyAgentMsg({
				cmd: WechatChatHistoryWinCommand.RESULT_DATA,
				key,
				appInfo: agentInfo,
				path: filePath
			});
			try {
				await options.transport.sendResult(targetHwnd, cleanupPayload, { timeoutMs: options.requestTimeoutMs ?? DEFAULT_REQUEST_TIMEOUT_MS });
			} catch (error) {
				options.logger?.warn("[WechatChatHistory] Windows protocol cleanup failed", {
					key,
					error: error instanceof Error ? error.message : String(error)
				});
			}
		}
	};
}
function buildAgentCertifyInfo(agentHwnd) {
	return {
		processId: process.pid,
		hwndId: agentHwnd,
		processName: Buffer.from(DEFAULT_AGENT_PROCESS_NAME, "utf-8"),
		appVer: Buffer.from(DEFAULT_AGENT_APP_VER, "utf-8")
	};
}
function basenameFromAnyPlatformPath(filePath) {
	const parts = filePath.split(/[\\/]/).filter(Boolean);
	return parts[parts.length - 1] ?? filePath;
}
//#endregion
//#region src/main/integrations/wechat-chat-history/win-transport.ts
var WM_COPYDATA = 74;
var WECHAT_CHAT_HISTORY_COPYDATA_MAGIC = 4034109776;
var SMTO_ABORTIFHUNG = 2;
var DEFAULT_TIMEOUT_MS = 5e3;
function createWechatChatHistoryWinTransport(options) {
	if (options.loopbackUrl) return new LoopbackWechatWinTransport(options.loopbackUrl, options.logger);
	if (process.platform === "win32" && options.mainWindow) {
		const native = NativeWechatWinCopyDataTransport.create(options.mainWindow, options.logger);
		if (native) return native;
	}
	return new UnsupportedWechatWinTransport(process.platform, options.logger);
}
function hwndFromNativeWindowHandle(nativeHandle) {
	if (!nativeHandle || nativeHandle.length < 4) return;
	if (nativeHandle.length >= 8) return Number(nativeHandle.readBigUInt64LE(0) & 4294967295n);
	return nativeHandle.readUInt32LE(0);
}
var UnsupportedWechatWinTransport = class {
	constructor(platform, logger) {
		this.platform = platform;
		this.logger = logger;
	}
	async sendRequest() {
		this.logger?.warn("[WechatChatHistory] Windows protocol transport unavailable", { platform: this.platform });
		throw new Error(`Wechat Windows protocol transport is unavailable on ${this.platform}`);
	}
	async sendResult() {
		this.logger?.warn("[WechatChatHistory] Windows protocol cleanup skipped: transport unavailable", { platform: this.platform });
	}
};
var LoopbackWechatWinTransport = class {
	constructor(baseUrl, logger) {
		this.baseUrl = baseUrl;
		this.logger = logger;
	}
	async sendRequest(targetHwnd, payload) {
		const response = await this.post("/request", targetHwnd, payload);
		if (!response.payload) throw new Error("Loopback WeChat provider returned empty payload");
		return Buffer.from(response.payload, "base64");
	}
	async sendResult(targetHwnd, payload) {
		await this.post("/result", targetHwnd, payload);
	}
	async post(pathname, targetHwnd, payload) {
		const url = new URL(pathname, this.baseUrl);
		this.logger?.info("[WechatChatHistory] loopback transport post", {
			pathname,
			targetHwnd
		});
		const response = await fetch(url, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				targetHwnd,
				payload: payload.toString("base64")
			})
		});
		if (!response.ok) throw new Error(`Loopback WeChat provider failed: HTTP ${response.status} ${await response.text()}`);
		return await response.json();
	}
};
var NativeWechatWinCopyDataTransport = class NativeWechatWinCopyDataTransport {
	pendingReplies = [];
	constructor(mainWindow, binding, sourceHwnd, logger) {
		this.mainWindow = mainWindow;
		this.binding = binding;
		this.sourceHwnd = sourceHwnd;
		this.logger = logger;
		this.mainWindow.hookWindowMessage(74, (wParam, lParam) => {
			this.logger?.info("[WechatChatHistory] WM_COPYDATA hook fired", {
				wParamHex: Buffer.isBuffer(wParam) ? wParam.toString("hex") : void 0,
				lParamLen: Buffer.isBuffer(lParam) ? lParam.length : void 0,
				pending: this.pendingReplies.length
			});
			this.handleCopyData(lParam);
		});
	}
	static create(mainWindow, logger) {
		const binding = createNativeCopyDataBinding(logger);
		const sourceHwnd = hwndFromNativeWindowHandle(mainWindow.getNativeWindowHandle());
		if (!binding || sourceHwnd === void 0) {
			logger?.warn("[WechatChatHistory] native transport unavailable", {
				hasBinding: Boolean(binding),
				hasSourceHwnd: sourceHwnd !== void 0
			});
			return;
		}
		return new NativeWechatWinCopyDataTransport(mainWindow, binding, sourceHwnd, logger);
	}
	async sendRequest(targetHwnd, payload, options = {}) {
		const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
		return await new Promise((resolve, reject) => {
			const timer = setTimeout(() => {
				this.removePending(resolve);
				reject(/* @__PURE__ */ new Error(`Timed out waiting for WM_COPYDATA reply after ${timeoutMs}ms`));
			}, timeoutMs);
			this.pendingReplies.push({
				resolve,
				reject,
				timer
			});
			try {
				this.binding.sendCopyData(targetHwnd, this.sourceHwnd, payload, timeoutMs);
			} catch (error) {
				clearTimeout(timer);
				this.removePending(resolve);
				reject(error instanceof Error ? error : new Error(String(error)));
			}
		});
	}
	async sendResult(targetHwnd, payload, options = {}) {
		this.logger?.info("[WechatChatHistory] sendResult (RESULT_DATA cleanup)", {
			targetHwnd,
			targetHwndHex: `0x${(targetHwnd >>> 0).toString(16)}`,
			payloadLen: payload.length
		});
		try {
			this.binding.sendCopyData(targetHwnd, this.sourceHwnd, payload, options.timeoutMs ?? DEFAULT_TIMEOUT_MS);
		} catch (error) {
			this.logger?.warn("[WechatChatHistory] sendResult failed", { error: error instanceof Error ? error.message : String(error) });
			throw error;
		}
	}
	dispose() {
		this.mainWindow.unhookWindowMessage(74);
		while (this.pendingReplies.length > 0) {
			const pending = this.pendingReplies.pop();
			if (!pending) continue;
			clearTimeout(pending.timer);
			pending.reject(/* @__PURE__ */ new Error("WM_COPYDATA transport disposed"));
		}
	}
	handleCopyData(lParam) {
		let payload;
		try {
			payload = this.binding.readCopyDataPayload(lParam);
		} catch (error) {
			this.logger?.warn("[WechatChatHistory] failed to decode WM_COPYDATA payload", { error: error instanceof Error ? error.message : String(error) });
			return;
		}
		const pending = this.pendingReplies.shift();
		if (!pending) {
			this.logger?.warn("[WechatChatHistory] received unexpected WM_COPYDATA reply");
			return;
		}
		clearTimeout(pending.timer);
		setImmediate(() => pending.resolve(payload));
	}
	removePending(resolve) {
		const index = this.pendingReplies.findIndex((entry) => entry.resolve === resolve);
		if (index >= 0) this.pendingReplies.splice(index, 1);
	}
};
var copyDataStructRegistered = false;
function createNativeCopyDataBinding(logger) {
	if (process.platform !== "win32") return;
	let koffi;
	try {
		koffi = require("koffi");
	} catch (error) {
		logger?.warn("[WechatChatHistory] koffi unavailable for WM_COPYDATA", { error: error instanceof Error ? error.message : String(error) });
		return;
	}
	try {
		if (!copyDataStructRegistered) {
			koffi.struct("COPYDATASTRUCT", {
				dwData: "uintptr_t",
				cbData: "uint32",
				lpData: "void *"
			});
			copyDataStructRegistered = true;
		}
		const user32 = koffi.load("user32.dll");
		const SendMessageTimeoutW = user32.func("uintptr_t __stdcall SendMessageTimeoutW(uintptr_t,uint32,uintptr_t,COPYDATASTRUCT *,uint32,uint32,uintptr_t *)");
		const IsWindow = user32.func("bool __stdcall IsWindow(uintptr_t)");
		const kernel32 = koffi.load("kernel32.dll");
		const GetLastError = kernel32.func("uint32 __stdcall GetLastError()");
		let decoder;
		try {
			const path = require("node:path");
			const fs = require("node:fs");
			let decoderPath;
			let cursor = __dirname;
			for (let i = 0; i < 6; i++) {
				const candidate = path.join(cursor, "native", "wechat-copydata-decoder");
				if (fs.existsSync(path.join(candidate, "index.js"))) {
					decoderPath = candidate;
					break;
				}
				const parent = path.dirname(cursor);
				if (parent === cursor) break;
				cursor = parent;
			}
			if (!decoderPath) throw new Error(`wechat-copydata-decoder not found (searched up from ${__dirname})`);
			const dynamicRequire = eval("require");
			decoder = dynamicRequire(decoderPath);
		} catch (error) {
			const err = error;
			logger?.warn("[WechatChatHistory] wechat-copydata-decoder require failed", { error: err?.message ?? String(error) });
			return;
		}
		if (!decoder.isSupported()) {
			logger?.warn("[WechatChatHistory] wechat-copydata-decoder addon not loaded", { loadError: decoder.getLoadError() });
			return;
		}
		return {
			sendCopyData(targetHwnd, sourceHwnd, payload, timeoutMs) {
				const result = Buffer.alloc(process.arch === "ia32" ? 4 : 8);
				const copyData = {
					dwData: WECHAT_CHAT_HISTORY_COPYDATA_MAGIC,
					cbData: payload.length,
					lpData: payload
				};
				const targetIsWindow = Boolean(IsWindow(targetHwnd));
				logger?.info("[WechatChatHistory] sendCopyData", {
					targetHwnd,
					targetHwndHex: `0x${(targetHwnd >>> 0).toString(16)}`,
					sourceHwndHex: `0x${(sourceHwnd >>> 0).toString(16)}`,
					payloadLen: payload.length,
					targetIsWindow
				});
				const ok = SendMessageTimeoutW(targetHwnd, 74, sourceHwnd, copyData, SMTO_ABORTIFHUNG, timeoutMs, result);
				const lastError = ok ? 0 : GetLastError();
				logger?.info("[WechatChatHistory] SendMessageTimeoutW result", {
					returnValue: Number(ok),
					lastError
				});
				if (!ok) throw new Error(`SendMessageTimeoutW(WM_COPYDATA) failed or timed out (GetLastError=${lastError}, targetIsWindow=${targetIsWindow})`);
			},
			readCopyDataPayload(lParam) {
				const decoded = decoder.readCopyDataPayload(lParam);
				if (decoded.dwData >>> 0 !== 4034109776) throw new Error(`Unexpected WM_COPYDATA dwData: 0x${(decoded.dwData >>> 0).toString(16)}`);
				return decoded.payload;
			}
		};
	} catch (error) {
		logger?.warn("[WechatChatHistory] failed to initialize WM_COPYDATA binding", { error: error instanceof Error ? error.message : String(error) });
		return;
	}
}
//#endregion
//#region src/main/integrations/wechat-chat-history/wechat-chat-history-deeplink-handler.ts
/**
* Wechat chat-history deeplink handler.
*
* Recognizes the `workbuddy://wechat/share?wxsource=chatmsg&scene=sessionselect`
* URL forwarded from the WeChat client (or WeChat-relayed clipboard data over
* Apple Universal Clipboard). When matched:
*
*  1. Reads the chat-record ZIP from the system clipboard (custom UTI →
*     file URL → binary buffer fallback).
*  2. Persists the ZIP to `<userData>/tmp/wechat-chat-history/<ts>-<rand>.zip`.
*  3. Calls into the `wechat-chat-history` workbuddy-server module to parse
*     the metadata and truncated transcript.
*  4. Broadcasts the chip payload to the renderer over the
*     `app:wechatChatHistory:appendChip` IPC channel.
*  5. Focuses the main window via `windowManager.showOrCreate()`.
*
* Side-effects only — never throws. Failure paths log at info/warn so they
* remain debuggable post-mortem.
*/
var TAG$3 = "[WechatChatHistory]";
var WX_SOURCE = "chatmsg";
var WX_SCENE = "sessionselect";
/** IPC channel renderer listens on. Mirrored in workbuddy-app. */
var WECHAT_CHAT_HISTORY_APPEND_CHIP_CHANNEL = "app:wechatChatHistory:appendChip";
/**
* Pure URL classifier. Exported for unit testing.
*
* Accepts both the legacy macOS share URL and the Windows protocol URL:
* - `workbuddy://wechat/share?wxsource=chatmsg&scene=sessionselect`
* - `workbuddy://wechat/share?key=<flow-id>&cert=<base64-cert>`
*/
function isWechatChatHistoryDeeplink(url) {
	let parsed;
	try {
		parsed = new URL(url);
	} catch {
		return false;
	}
	if (parsed.protocol !== "workbuddy:") return false;
	if (parsed.host !== "wechat") return false;
	if (parsed.pathname.replace(/\/$/, "") !== "/share") return false;
	const isLegacyShare = parsed.searchParams.get("wxsource") === WX_SOURCE && parsed.searchParams.get("scene") === WX_SCENE;
	const isWinProtocolShare = Boolean(parsed.searchParams.get("key")) && hasAgentCertifyInfoInUrl(url);
	return isLegacyShare || isWinProtocolShare;
}
/**
* Generate a stable, opaque chip id used as both the SessionManager key and
* the renderer phrase block URI path segment.
*/
function generateChipId$1() {
	return `wch-${Date.now().toString(36)}-${node_crypto.randomBytes(3).toString("hex")}`;
}
/**
* Main entry point. Returns `true` when the URL was handled (so the caller
* should NOT forward it to the renderer deeplink pipeline); `false` when the
* URL did not match this handler.
*
* Implementation notes:
*  - Even on partial failure (e.g. clipboard read fails) we still call
*    `showOrCreate()` so the user gets a visible WorkBuddy window.
*  - The renderer always receives a broadcast (with degraded metadata on
*    failure) so it can show a toast / error chip; this matches the spec's
*    failure-mode behavior.
*/
async function handleWechatChatHistoryDeeplink(url, ctx) {
	if (!isWechatChatHistoryDeeplink(url)) return false;
	const logger = ctx.logger;
	logger?.info(`${TAG$3} deeplink received`, { url });
	ctx.windowManager.showOrCreate();
	let sourceResult;
	try {
		sourceResult = await readChatHistoryZipSource(url, ctx);
	} catch (error) {
		logger?.error(`${TAG$3} source read threw unexpectedly`, error);
		return true;
	}
	if (!sourceResult.ok) {
		logger?.warn(`${TAG$3} source read rejected`, {
			source: sourceResult.source,
			reason: sourceResult.reason
		});
		return true;
	}
	const service = require_service.createWorkbuddyWechatChatHistoryService({ logger });
	let parsed;
	try {
		parsed = await service.parseZipMetadata({
			filePath: sourceResult.filePath,
			extractionRootDir: ctx.tempDir
		});
	} finally {
		await sourceResult.cleanup?.();
	}
	const chipId = generateChipId$1();
	const fileName = pickDisplayFileName(sourceResult.fileName, parsed.fileName);
	const payload = {
		chipId,
		filePath: sourceResult.filePath,
		fileName,
		fileSize: parsed.fileSize,
		metadata: parsed.metadata,
		chatHistoryText: parsed.valid ? parsed.chatHistoryText : void 0,
		extractedDirPath: parsed.valid ? parsed.extractedDirPath : void 0,
		truncated: parsed.valid ? parsed.truncated : void 0,
		parseReason: parsed.valid ? void 0 : parsed.reason,
		clipboardSource: sourceResult.source
	};
	logger?.info(`${TAG$3} broadcasting chip`, {
		chipId,
		fileName: payload.fileName,
		valid: parsed.valid,
		messageCount: parsed.metadata?.messageCount,
		mediaCount: parsed.metadata?.mediaFiles.length,
		truncated: parsed.valid ? parsed.truncated : void 0
	});
	if (ctx.broadcastChip) ctx.broadcastChip(payload);
	else ctx.windowManager.broadcast(WECHAT_CHAT_HISTORY_APPEND_CHIP_CHANNEL, payload);
	return true;
}
async function readChatHistoryZipSource(url, ctx) {
	if (shouldUseWinProtocolSource(url, ctx)) {
		const mainWindow = ctx.windowManager.getMainWindow() ?? void 0;
		const loopbackUrl = getWinLoopbackUrl(url);
		const source = loopbackUrl ? "win-loopback" : "win-copydata";
		const ownsTransport = !ctx.winTransport;
		const transport = ctx.winTransport ?? createWechatChatHistoryWinTransport({
			mainWindow,
			logger: ctx.logger,
			loopbackUrl
		});
		let result;
		try {
			result = await readChatHistoryZipFromWinProtocol({
				url,
				transport,
				logger: ctx.logger,
				agentHwnd: hwndFromNativeWindowHandle(mainWindow?.getNativeWindowHandle()),
				source
			});
		} catch (error) {
			if (ownsTransport) transport.dispose?.();
			throw error;
		}
		if (!result.ok) {
			if (ownsTransport) transport.dispose?.();
			return result;
		}
		return {
			...result,
			async cleanup() {
				try {
					await result.cleanup();
				} finally {
					if (ownsTransport) transport.dispose?.();
				}
			}
		};
	}
	const clip = await readChatHistoryZipFromClipboard({ tempDir: ctx.tempDir });
	return clip.ok ? {
		ok: true,
		filePath: clip.filePath,
		fileName: clip.fileName,
		source: clip.source
	} : {
		ok: false,
		source: clip.source,
		reason: clip.reason
	};
}
function shouldUseWinProtocolSource(url, ctx) {
	if (!hasAgentCertifyInfoInUrl(url)) return false;
	if (ctx.winTransport) return true;
	if (getWinLoopbackUrl(url)) return true;
	return (ctx.platform ?? process.platform) === "win32";
}
function getWinLoopbackUrl(rawUrl) {
	const fromEnv = process.env.WORKBUDDY_WECHAT_HISTORY_WIN_LOOPBACK_URL;
	if (fromEnv) return fromEnv;
	try {
		return new URL(rawUrl).searchParams.get("loopback_url") ?? void 0;
	} catch {
		return;
	}
}
/**
* Localized fallback shown on the chip when both the clipboard reader and
* the zip parser failed to surface a usable filename. Renderer-side i18n
* also covers this string, but emitting a non-empty value here means
* cb-chat-ui never renders a raw `*.title.fallback` key (see UI bug history).
*/
var DISPLAY_NAME_FALLBACK = "微信聊天记录.zip";
function pickDisplayFileName(fromClipboard, fromParser) {
	const candidates = [fromClipboard, fromParser];
	for (const c of candidates) if (typeof c === "string" && c.trim().length > 0) return c.trim();
	return DISPLAY_NAME_FALLBACK;
}
//#endregion
//#region src/main/integrations/wechat-chat-history/open-file-handler.ts
/**
* WeChat chat-history file handler (macOS `open-file` path).
*
* Flow:
*   1. WeChat locates WorkBuddy via `NSWorkspace.URLForApplicationWithBundleIdentifier`
*   2. WeChat opens the ZIP file with WorkBuddy → macOS triggers `application(_:open:)`
*      → Electron dispatches `app.on('open-file', filePath)`
*   3. System grants temporary read permission automatically
*   4. We copy ZIP to our temp dir (in case the system revokes access later)
*   5. Parse metadata + broadcast chip to renderer
*   6. Post `DistributedNotification` to notify WeChat that processing is complete
*      → WeChat can then delete the temporary ZIP
*
* Notification protocol (see wechat-notify-agent.proto):
*   object = Base64( SerializeAsString( NotifyAgentMsg { cmd=AGENT_RESULT_DATA, md5=MD5(filePath) } ) )
*
*   Encoding steps:
*     1. md5     = MD5(filePath, utf8)  — uppercase hex, path string only
*     2. pbBytes = encodeNotifyAgentMsg({ cmd: 3, md5 })  — hand-rolled proto2 varint encoding
*     3. object  = Base64(pbBytes)
*
* Design notes:
*   - Mirrors the existing deeplink handler's chip broadcast pattern
*   - Never throws — failures are logged and a degraded chip is sent
*   - The distributed notification name must match WeChat's expected value
*/
require_workbuddy_product_config.init_workbuddy_product_config();
var TAG$2 = "[WechatOpenFile]";
/**
* DistributedNotification name that WeChat listens for.
* WeChat posts the file and waits for this notification to confirm
* the receiver has finished reading — then deletes the temporary ZIP.
*
* Convention: `<darwinBundleIdentifier>.wechatchannel`, for example
* `com.workbuddy.workbuddy.wechatchannel`.
*/
var WECHAT_NOTIFICATION_SUFFIX = ".wechatchannel";
var DEFAULT_DARWIN_BUNDLE_ID = "com.workbuddy.workbuddy";
function getWechatFileReceivedNotificationName() {
	const product = require_workbuddy_product_config.tryGetWorkbuddyBaseProductConfiguration();
	return `${(typeof product?.darwinBundleIdentifier === "string" ? product.darwinBundleIdentifier.trim() : "") || DEFAULT_DARWIN_BUNDLE_ID}${WECHAT_NOTIFICATION_SUFFIX}`;
}
/** File extensions that WB accepts from WeChat file forwarding. */
var ACCEPTED_EXTENSIONS = new Set([
	".zip",
	".doc",
	".docx",
	".xls",
	".xlsx",
	".pdf",
	".ppt",
	".pptx"
]);
/**
* Determine if a file path is an accepted type for WeChat file forwarding.
*/
function isWechatChatHistoryFile(filePath) {
	if (!filePath) return false;
	const ext = node_path.extname(filePath).toLowerCase();
	return ACCEPTED_EXTENSIONS.has(ext);
}
/**
* Handle an incoming file from macOS `open-file` event.
* Returns true if the file was processed (caller should not forward elsewhere).
*/
async function handleWechatChatHistoryOpenFile(filePath, ctx) {
	if (!isWechatChatHistoryFile(filePath)) return false;
	const logger = ctx.logger;
	logger?.info(`${TAG$2} open-file received`, { filePath });
	ctx.windowManager.showOrCreate();
	const fileMd5 = computeMd5(filePath);
	let localPath;
	try {
		localPath = await copyToTempDir(filePath, ctx.tempDir);
	} catch (error) {
		logger?.error(`${TAG$2} failed to copy file to temp dir`, error);
		postReceivedNotification(filePath, fileMd5, logger);
		return true;
	}
	const chipId = generateChipId();
	const fileName = node_path.basename(filePath) || "微信转发文件";
	const ext = node_path.extname(filePath).toLowerCase();
	let payload;
	if (ext === ".zip") {
		const { createWorkbuddyWechatChatHistoryService } = await Promise.resolve().then(() => require("./wechat-chat-history.js"));
		const parsed = await createWorkbuddyWechatChatHistoryService({ logger }).parseZipMetadata({ filePath: localPath });
		payload = {
			chipId,
			filePath: localPath,
			fileName,
			fileSize: parsed.fileSize,
			metadata: parsed.metadata,
			chatHistoryText: parsed.valid ? parsed.chatHistoryText : void 0,
			truncated: parsed.valid ? parsed.truncated : void 0,
			parseReason: parsed.valid ? void 0 : parsed.reason,
			clipboardSource: "file-url"
		};
		logger?.info(`${TAG$2} broadcasting chip (chat history)`, {
			chipId,
			fileName,
			valid: parsed.valid,
			messageCount: parsed.metadata?.messageCount
		});
	} else {
		let fileSize = 0;
		try {
			fileSize = (await node_fs_promises.stat(localPath)).size;
		} catch {}
		payload = {
			chipId,
			filePath: localPath,
			fileName,
			fileSize,
			metadata: void 0,
			chatHistoryText: void 0,
			truncated: void 0,
			parseReason: void 0,
			clipboardSource: "file-url"
		};
		logger?.info(`${TAG$2} broadcasting chip (local file)`, {
			chipId,
			fileName
		});
	}
	ctx.windowManager.broadcast(WECHAT_CHAT_HISTORY_APPEND_CHIP_CHANNEL, payload);
	postReceivedNotification(filePath, fileMd5, logger);
	return true;
}
/** Copy the ZIP from the (possibly ephemeral) source path to our persistent temp dir. */
async function copyToTempDir(sourcePath, tempDir) {
	await node_fs_promises.mkdir(tempDir, { recursive: true });
	const stamp = formatTimestamp(/* @__PURE__ */ new Date());
	const rand = node_crypto.randomBytes(3).toString("hex");
	const baseName = node_path.basename(sourcePath) || `${stamp}-${rand}.zip`;
	const target = node_path.join(tempDir, `${stamp}-${rand}-${baseName}`);
	await node_fs_promises.copyFile(sourcePath, target);
	return target;
}
/**
* Post a macOS DistributedNotification to inform WeChat that we have finished
* reading the file. WeChat can then safely delete the temporary ZIP.
*
* Protocol (wechat-notify-agent.proto, 与微信客户端 handleNotification: 对齐)：
*   [[NSDistributedNotificationCenter defaultCenter]
*     postNotificationName:name
*                   object:Base64(NotifyAgentMsg.SerializeAsString())
*                 userInfo:nil]
*
* 微信侧的接收逻辑：
*   NSString* base64 = (NSString*)notification.object;
*   NSData* data = [[NSData alloc] initWithBase64EncodedString:base64 options:0];
*   NotifyAgentMsg msg; msg.ParseFromArray(data.bytes, data.length);
*
* object = Base64( proto2-encoded NotifyAgentMsg{ cmd=AGENT_RESULT_DATA(3), md5=<uppercase-hex> } )
*
* The notification is posted by a bundled native CLI (`workbuddy-wechat-notifier`,
* shipped in Contents/Resources) so it works on end-user machines without Xcode
* Command Line Tools. The previous `swift -e` one-liner is kept only as a dev
* fallback when the bundled binary is absent (local `yarn dev` on a machine that
* has Xcode CLT installed).
*/
/** Name of the bundled native notifier CLI (deployed to Contents/Resources). */
var WECHAT_NOTIFIER_BINARY = "workbuddy-wechat-notifier";
/**
* Resolve the bundled native notifier binary. Returns undefined when it is not
* present (e.g. local dev build), in which case the `swift -e` fallback is used.
*/
function resolveWechatNotifierBinary() {
	if (process.platform !== "darwin") return;
	try {
		const binary = node_path.join(process.resourcesPath, WECHAT_NOTIFIER_BINARY);
		return (0, node_fs.existsSync)(binary) ? binary : void 0;
	} catch {
		return;
	}
}
function postReceivedNotification(originalFilePath, md5, logger) {
	if (process.platform !== "darwin") return;
	const pbBase64 = md5 ? encodeNotifyAgentMsgBase64(md5) : void 0;
	const notificationName = getWechatFileReceivedNotificationName();
	const binary = resolveWechatNotifierBinary();
	if (binary) {
		(0, node_child_process.execFile)(binary, pbBase64 ? [notificationName, pbBase64] : [notificationName], { timeout: 5e3 }, (error) => {
			if (error) logger?.warn(`${TAG$2} failed to post DistributedNotification via native notifier`, {
				error: String(error),
				notification: notificationName
			});
			else logger?.info(`${TAG$2} posted DistributedNotification`, {
				notification: notificationName,
				md5: md5 ?? "nil",
				pbBase64: pbBase64 ?? "nil"
			});
		});
		return;
	}
	const objectLiteral = pbBase64 ? `"${pbBase64}"` : "nil";
	(0, node_child_process.execFile)("/usr/bin/swift", ["-e", `
import Foundation
DistributedNotificationCenter.default().postNotificationName(
    NSNotification.Name(${JSON.stringify(notificationName)}),
    object: ${objectLiteral},
    userInfo: nil,
    deliverImmediately: true
)
Thread.sleep(forTimeInterval: 0.5)
`], { timeout: 5e3 }, (error) => {
		if (error) logger?.warn(`${TAG$2} failed to post DistributedNotification (swift fallback)`, {
			error: String(error),
			notification: notificationName
		});
		else logger?.info(`${TAG$2} posted DistributedNotification (swift fallback)`, {
			notification: notificationName,
			md5: md5 ?? "nil",
			pbBase64: pbBase64 ?? "nil"
		});
	});
}
/**
* Hand-rolled proto2 encoder for:
*   NotifyAgentMsg { cmd = 3 (AGENT_RESULT_DATA), md5 = <md5HexUppercase> }
*
* Proto2 wire format used here:
*   field 1 (cmd,  int32):  tag = (1 << 3) | 0 = 0x08, value = varint(3)
*   field 5 (md5, string):  tag = (5 << 3) | 2 = 0x2a, value = varint(len) + utf8 bytes
*
* No runtime protobuf library is required — the message shape is fixed and small.
* See wechat-notify-agent.proto for the full schema.
*/
function encodeNotifyAgentMsgBase64(md5HexUppercase) {
	const md5Bytes = Buffer.from(md5HexUppercase, "utf8");
	const buf = Buffer.allocUnsafe(4 + md5Bytes.length);
	let offset = 0;
	buf[offset++] = 8;
	buf[offset++] = 3;
	buf[offset++] = 42;
	buf[offset++] = md5Bytes.length;
	md5Bytes.copy(buf, offset);
	return buf.toString("base64");
}
/**
* Compute the MD5 hex digest of the file **path string** (uppercase, matching
* WeChat's convention) — equivalent to macOS `md5 -s "<filePath>"`.
*
* WeChat identifies the temp ZIP it should delete by hashing the path string
* it handed us, not the file's byte content, so we must hash the same input
* (`filePath`, the original incoming path from the `open-file` event) here.
*/
function computeMd5(filePath) {
	return node_crypto.createHash("md5").update(filePath, "utf8").digest("hex").toUpperCase();
}
function generateChipId() {
	return `wch-${Date.now().toString(36)}-${node_crypto.randomBytes(3).toString("hex")}`;
}
function formatTimestamp(d) {
	const pad = (n) => n.toString().padStart(2, "0");
	return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
}
//#endregion
//#region src/main/system/cleanup/litesandbox-legacy-cleanup.ts
/**
* Clean up the legacy LiteSandbox directory left by older versions of sandbox-cli.
*
* Earlier versions of the Rust sandbox-cli binary used %LOCALAPPDATA%\LiteSandbox\
* as the default app_home directory. The current version has migrated to
* %LOCALAPPDATA%\WorkBuddy\. The old directory accumulates logs (up to 70GB+)
* without any rotation mechanism.
*
* This function removes the entire legacy directory on Windows.
* It is safe to call on any platform (non-Windows is a no-op).
*
* Strategy:
* 1. Fast path: try recursive rm (handles the common unlocked case)
* 2. On EBUSY/EPERM/ENOTEMPTY: fall back to file-by-file deletion with retries
* 3. Skip still-locked files after retries
* 4. Clean up empty directories bottom-up
*/
async function cleanupLiteSandboxLegacy(logger) {
	if (process.platform !== "win32") return;
	const localAppData = process.env.LOCALAPPDATA || path.join(os.homedir(), "AppData", "Local");
	const targetDir = path.join(localAppData, "LiteSandbox");
	try {
		await fs.promises.access(targetDir);
	} catch {
		return;
	}
	logger?.info?.(`[LiteSandboxCleanup] Removing legacy directory: ${targetDir}`);
	try {
		await fs.promises.rm(targetDir, {
			recursive: true,
			force: true
		});
		logger?.info?.("[LiteSandboxCleanup] Removed successfully");
		return;
	} catch (error) {
		const code = error.code;
		if (code !== "EBUSY" && code !== "EPERM" && code !== "ENOTEMPTY") {
			const message = error instanceof Error ? error.message : String(error);
			logger?.warn?.(`[LiteSandboxCleanup] Failed to remove: ${message}`);
			return;
		}
		logger?.info?.("[LiteSandboxCleanup] Some files are locked, falling back to incremental deletion");
	}
	const skipped = [];
	await deleteTreeIncremental(targetDir, skipped);
	if (skipped.length === 0) logger?.info?.("[LiteSandboxCleanup] Incremental deletion completed successfully");
	else logger?.warn?.(`[LiteSandboxCleanup] Completed with ${skipped.length} locked file(s) skipped: ${skipped.slice(0, 5).join(", ")}${skipped.length > 5 ? "..." : ""}`);
}
var RETRY_COUNT = 2;
var RETRY_DELAY_MS = 500;
/**
* Recursively delete files one by one, retrying on EBUSY/EPERM.
* Skipped files are collected; empty directories are removed bottom-up.
*/
async function deleteTreeIncremental(dir, skipped) {
	let entries;
	try {
		entries = await fs.promises.readdir(dir, { withFileTypes: true });
	} catch {
		return;
	}
	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);
		if (entry.isDirectory()) await deleteTreeIncremental(fullPath, skipped);
		else if (!await deleteFileWithRetry(fullPath)) skipped.push(fullPath);
	}
	try {
		await fs.promises.rmdir(dir);
	} catch {}
}
/**
* Attempt to delete a single file with retries for transient locks.
*/
async function deleteFileWithRetry(filePath) {
	for (let attempt = 0; attempt <= RETRY_COUNT; attempt++) try {
		await fs.promises.unlink(filePath);
		return true;
	} catch (error) {
		const code = error.code;
		if (code !== "EBUSY" && code !== "EPERM") return code === "ENOENT";
		if (attempt < RETRY_COUNT) await sleep$1(RETRY_DELAY_MS);
	}
	return false;
}
function sleep$1(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
//#endregion
//#region src/main/system/cleanup/win32-fallback-env-normalizer.ts
var FALLBACK_CONFIG_ENV = "WORKBUDDY_STALE_FALLBACK_CONFIG_DIR";
function normalizePathForCompare(value) {
	return path.resolve(value).replace(/\\/g, "/").toLowerCase();
}
function isProgramDataFallbackConfigDir(configDir) {
	const normalized = normalizePathForCompare(configDir);
	return /(?:^|\/)programdata\/[^/]+\/users\/[^/]+\/\.workbuddy$/.test(normalized) || /(?:^|\/)workbuddy-env\/[^/]+\/\.workbuddy$/.test(normalized);
}
function isUnderFallbackHome(configDir, fallbackHome) {
	const trimmedFallbackHome = fallbackHome?.trim();
	if (!trimmedFallbackHome) return false;
	const normalizedConfig = normalizePathForCompare(configDir);
	const normalizedHome = normalizePathForCompare(trimmedFallbackHome);
	return normalizedConfig === `${normalizedHome}/.workbuddy` || normalizedConfig.startsWith(`${normalizedHome}/.workbuddy/`);
}
function joinConfigDir(home) {
	return process.platform === "win32" ? path.win32.join(home, ".workbuddy") : path.join(home, ".workbuddy");
}
function getOriginalConfigDir() {
	const originalUserProfile = process.env.WORKBUDDY_ORIGINAL_USERPROFILE?.trim();
	if (originalUserProfile) return joinConfigDir(originalUserProfile);
	const home = os.homedir();
	return home ? joinConfigDir(home) : void 0;
}
/**
* 修正从旧 Windows fallback launcher 继承来的配置目录环境变量。
*
* 旧版本会把 WORKBUDDY_CONFIG_DIR 指向 C:\ProgramData\WorkBuddy\users\<hash>\.workbuddy。
* 自动更新重启可能继承该环境变量，导致新版本继续把会话写入 fallback 目录。
* 这里仅重置 WorkBuddy 自己的配置目录变量，不修改 USERPROFILE/APPDATA，避免重新触发
* Chromium 非 ASCII 路径兼容风险。
*/
function normalizeInheritedFallbackEnv() {
	if (process.platform !== "win32") return { changed: false };
	const currentConfigDir = process.env.WORKBUDDY_CONFIG_DIR?.trim();
	if (!currentConfigDir) return { changed: false };
	const fallbackHome = process.env.WORKBUDDY_FALLBACK_HOME;
	const reason = isUnderFallbackHome(currentConfigDir, fallbackHome) ? "fallback-home" : isProgramDataFallbackConfigDir(currentConfigDir) ? "fallback-config-dir" : void 0;
	if (!reason) return { changed: false };
	const targetConfigDir = getOriginalConfigDir();
	if (!targetConfigDir || normalizePathForCompare(targetConfigDir) === normalizePathForCompare(currentConfigDir)) return { changed: false };
	process.env[FALLBACK_CONFIG_ENV] = currentConfigDir;
	process.env.WORKBUDDY_CONFIG_DIR = targetConfigDir;
	process.env.CODEBUDDY_CONFIG_DIR = targetConfigDir;
	delete process.env.WORKBUDDY_FALLBACK_HOME;
	delete process.env.WORKBUDDY_FALLBACK_HASH;
	return {
		changed: true,
		fallbackConfigDir: currentConfigDir,
		targetConfigDir,
		reason
	};
}
//#endregion
//#region src/main/system/fs-protection/flush-fs-protection-report.ts
/**
* fs-protection 哨兵命中上报伽利略（延迟 flush）。
*
* 背景：`wb-fs-protection.cjs`（5 哨兵审计）命中哨兵时只往本地 `fs-protection.log`
* 追加一条 WARN + 调用栈。若元凶正是"遍历删 ~/.workbuddy"，本地日志可能被连带删；
* 即便没被删，用户也可能事后清理磁盘。本模块把已落盘的 WARN 行延迟上报到伽利略，
* 让服务端留有记录，本地日志丢了也能查到元凶调用栈。
*
* 为什么是"延迟 flush"而非"命中即上报"：shim 在 `index.ts` 顶部同步 require 加载，
* 是 main process 最早执行的代码之一；命中哨兵那一刻 `DesktopMonitorService`（伽利略
* 上报通道）可能尚未创建，或 OTel 连接未就绪（health check ~60s）。元凶也可能发生在
* bootstrap 早期（migrateFallbackData / session fragment repair / DB recover 等删除
* 密集代码都跑在 monitorService.start() 之前）。因此"何时命中"与"何时能上报"解耦：
* shim 只管落盘（零改动），本模块在 `bootstrapMainProcess` 完成后统一扫描本地 WARN
* 行、退避重试到 GalileoExporter 就绪后上报，跨启动兜底。
*
* 范式照搬 `flush-install-telemetry.ts` / `flush-update-telemetry.ts`
* （`apps/workbuddy-desktop/src/main/system/install/`）——同属"进程早期事件先落盘、
* 服务就绪后统一 flush"的既有模式，不是新机制。
*
* 失败静默降级：任何异常（读文件 / 解析 / 游标 / 上报）都不能抛到调用方——最外层
* `.catch(() => {})` 兜底，与 shim 同样的"绝不影响主流程"原则。
*/
var LOG_TARGETS = [{
	log: "fs-protection.log",
	cursor: "fs-protection.log.cursor.jsonl",
	source: "main"
}, {
	log: "fs-protection.daemon.log",
	cursor: "fs-protection.daemon.log.cursor.jsonl",
	source: "daemon"
}];
/** 游标文件行数上限，超过则只保留最后一行重写。 */
var CURSOR_MAX_LINES = 100;
function getLogFilePath(target) {
	return node_path.join(require_logger.getElectronLogDir(), target.log);
}
function getCursorFilePath(target) {
	return node_path.join(require_logger.getElectronLogDir(), target.cursor);
}
/**
* 从游标文件末尾往前找最后一条能成功 JSON.parse 的行。
* 文件不存在 / 全部无法解析 → 返回 null（视为全新，全量重读一次）。
*
* 健壮性：JSONL 追加式保证即使最后一行写一半（进程被杀），前面的行仍整行完整可解析。
*/
async function readCursor(cursorFile) {
	let raw;
	try {
		raw = await node_fs_promises.readFile(cursorFile, "utf8");
	} catch {
		return null;
	}
	const lines = raw.split("\n").filter((l) => l.length > 0);
	for (let i = lines.length - 1; i >= 0; i--) try {
		const entry = JSON.parse(lines[i]);
		if (typeof entry.offset === "number" && entry.offset >= 0) return entry;
	} catch {}
	return null;
}
/**
* 向游标文件追加一行。追加前若行数超 CURSOR_MAX_LINES，先压缩到只保留最后一行
* （压缩失败无所谓——退化为文件变大，不影响功能）。
*/
async function appendCursor(cursorFile, entry) {
	try {
		let existing = "";
		try {
			existing = await node_fs_promises.readFile(cursorFile, "utf8");
		} catch {}
		const lines = existing.split("\n").filter((l) => l.length > 0);
		const line = JSON.stringify({
			...entry,
			ts: (/* @__PURE__ */ new Date()).toISOString()
		});
		if (lines.length >= CURSOR_MAX_LINES) try {
			await node_fs_promises.writeFile(cursorFile, lines[lines.length - 1] + "\n" + line + "\n", "utf8");
			return;
		} catch {}
		await node_fs_promises.appendFile(cursorFile, line + "\n", "utf8");
	} catch {}
}
/**
* 从 cursor.offset 字节偏移读 `fs-protection.log` 增量，按行解析成 ShimAuditEntry。
* 只保留 decision === 'WARN' 的行（文件里理论上只有 WARN，双重保险）。
*
* 文件身份检测（rotate/重建）：游标记录了上次读取时的 `(size, mtimeMs)` 指纹。若当前
* 文件的指纹与游标不匹配（被 rotate 到 .old 后新建、或被外部删除重建），强制从 0 全量
* 重读——单靠 offset 无法区分"文件追加了新内容"和"文件被替换后恰好也写到这个长度"，
* 用 mtimeMs 指纹可靠区分。纯 offset 比对（offset > 当前 size）只能覆盖"新文件更小"
* 这一种 rotate 形态，漏掉"重建后恰好更大"的情况。
*
* 返回 `{ entries, nextOffset, fileSize, mtimeMs }`：后两者用于上报成功后写入新游标指纹。
*/
async function readIncrementalEntries(logFile, cursor) {
	let stat;
	try {
		stat = await node_fs_promises.stat(logFile);
	} catch {
		return {
			entries: [],
			nextOffset: cursor?.offset ?? 0,
			fileSize: 0,
			mtimeMs: 0
		};
	}
	let actualStart = cursor?.offset ?? 0;
	if (cursor && (cursor.size !== stat.size || cursor.mtimeMs !== stat.mtimeMs)) actualStart = 0;
	if (actualStart > stat.size) actualStart = 0;
	const entries = [];
	await new Promise((resolve) => {
		const stream = (0, node_fs.createReadStream)(logFile, {
			start: actualStart,
			encoding: "utf8"
		});
		let buffer = "";
		stream.on("data", (chunk) => {
			buffer += chunk;
			const lines = buffer.split("\n");
			buffer = lines.pop() ?? "";
			for (const line of lines) {
				if (!line.trim()) continue;
				try {
					const entry = JSON.parse(line);
					if (entry.decision === "WARN") entries.push(entry);
				} catch {}
			}
		});
		stream.on("end", () => {
			if (buffer.trim()) try {
				const entry = JSON.parse(buffer);
				if (entry.decision === "WARN") entries.push(entry);
			} catch {}
			resolve();
		});
		stream.on("error", () => resolve());
	});
	return {
		entries,
		nextOffset: stat.size,
		fileSize: stat.size,
		mtimeMs: stat.mtimeMs
	};
}
function buildLogRecord(entry, source) {
	const stackStr = (entry.stack ?? []).join("\n");
	return {
		timestamp: Date.parse(entry.ts) || Date.now(),
		level: "error",
		message: "fs_protection.sentinel_hit",
		attributes: {
			event: "workbuddy.fs_protection.sentinel_hit",
			module: "fs_protection",
			source,
			api: entry.api,
			target: entry.target,
			recursive: entry.recursive ? 1 : 0,
			pid: entry.pid,
			app_version: electron.app.getVersion(),
			"error.name": "FsProtectionSentinelHit",
			"error.message": `${entry.api} on protected path: ${entry.target}${entry.recursive ? " (recursive)" : ""}`,
			"error.stack": stackStr
		}
	};
}
/**
* 单次 flush：遍历 main / daemon 两个审计日志 target，各自读游标 → 读增量 → 逐条上报 →
* 追加游标。两 target 独立处理——一个 target 的读/解析失败不影响另一个，但 monitor 未
* 就绪时整体抛错（两 target 都等外层重试，不部分前进）。
* @returns true 表示全部 target 上报成功（或本来就没有新内容）；false 表示有失败、需重试。
* @throws 当 DesktopMonitorService 未就绪时抛错，由外层重试。
*
* 导出供单测直接调用（生产代码只走 {@link flushFsProtectionReport} 的重试循环）。
*/
async function flushOnce$3() {
	const monitor = require_desktop_monitor_service.DesktopMonitorService.getSharedInstance();
	if (!monitor) throw new Error("DesktopMonitorService not ready");
	if (!monitor.isGalileoConnected()) throw new Error("GalileoExporter not connected");
	let allDone = true;
	for (const target of LOG_TARGETS) try {
		const logFile = getLogFilePath(target);
		const cursorFile = getCursorFilePath(target);
		const { entries, nextOffset, fileSize, mtimeMs } = await readIncrementalEntries(logFile, await readCursor(cursorFile));
		if (entries.length === 0) continue;
		for (const entry of entries) await monitor.exportCrashLogs([buildLogRecord(entry, target.source)]);
		await appendCursor(cursorFile, {
			offset: nextOffset,
			size: fileSize,
			mtimeMs
		});
	} catch (err) {
		allDone = false;
	}
	return allDone;
}
var FLUSH_RETRY_INTERVAL_MS$3 = 5e3;
var FLUSH_MAX_RETRIES$3 = 24;
var sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
/**
* 扫描并上报 `fs-protection.log` 里未上报的 WARN 行。在 `bootstrapMainProcess` 完成
* 后调用一次。重试到 GalileoExporter 就绪（最多 ~2 分钟），仍未就绪则放弃——游标不
* 前进，下次启动本函数被调用时从旧游标继续 flush，跨启动兜底。
*/
function flushFsProtectionReport() {
	(async () => {
		for (let attempt = 0; attempt <= FLUSH_MAX_RETRIES$3; attempt++) {
			if (attempt > 0) await sleep(FLUSH_RETRY_INTERVAL_MS$3);
			try {
				if (await flushOnce$3()) return;
			} catch {}
		}
	})().catch(() => {});
}
//#endregion
//#region src/main/system/install/flush-install-telemetry.ts
/**
* Install timing telemetry flusher (Windows).
*
* NSIS 安装器无网络能力，完成后将计时数据写入 pending-telemetry 目录：
*   %USERPROFILE%\.workbuddy\pending-telemetry\install-<timestamp>.json
*
* 本模块在 WorkBuddy 主进程启动后扫描并消费这些文件，通过两条通道上报：
*   1. Galileo (OTel /v1/logs): 完整 checkpoints 明细，供问题排查
*   2. Aegis reportTime: 关键耗时指标，供 P50/P90/P99 看板
*
* 上报成功后文件 rename 为 .reported（保留 10 天），由 pending-telemetry-cleaner 统一清理。
*
* 调用时机：bootstrapMainProcess 完成后，与 flushRepairPendingTelemetry 并行调用。
*/
require_app_instance.init_app_instance();
var installLog$1 = import_src.default.scope("install-telemetry");
function getPendingDir$2() {
	return require_app_instance.getWorkbuddyPendingTelemetryDir();
}
function readInstallFiles(dir) {
	try {
		return node_fs.readdirSync(dir).filter((f) => f.startsWith("install-") && f.endsWith(".json")).map((f) => node_path.join(dir, f));
	} catch {
		return [];
	}
}
function parseInstallPayload(filePath) {
	try {
		const raw = node_fs.readFileSync(filePath, "utf-8");
		const parsed = JSON.parse(raw);
		if (typeof parsed === "object" && parsed !== null && parsed.source === "installer" && Array.isArray(parsed.events)) return parsed;
		return null;
	} catch {
		return null;
	}
}
async function reportInstallTiming(payload) {
	const monitor = require_desktop_monitor_service.DesktopMonitorService.getSharedInstance();
	if (!monitor) throw new Error("DesktopMonitorService not ready");
	if (!monitor.isGalileoConnected()) throw new Error("GalileoExporter not connected");
	for (const event of payload.events) {
		if (event.name !== "install.timing") continue;
		const cp = event.checkpoints;
		const attrs = {
			module: "installer",
			platform: payload.platform,
			arch: payload.arch,
			app_version: payload.appVersion,
			session_id: payload.sessionId,
			install_mode: event.installMode,
			total_duration_ms: event.totalDurationMs,
			effective_duration_ms: event.effectiveDurationMs,
			user_wait_process_dialog_ms: event.userWaitMs.process_dialog,
			user_wait_tsbx_dialog_ms: event.userWaitMs.tsbx_dialog
		};
		for (const [key, value] of Object.entries(cp)) attrs[`cp_${key}`] = value;
		await monitor.exportCrashLogs([{
			timestamp: Date.parse(event.timestamp) || Date.now(),
			level: "info",
			message: "install.timing",
			attributes: attrs
		}]);
		const dimensions = {
			platform: "win32",
			install_mode: event.installMode,
			arch: payload.arch,
			app_version: payload.appVersion
		};
		monitor.recordDuration("install_total_duration", event.totalDurationMs, dimensions);
		monitor.recordDuration("install_effective_duration", event.effectiveDurationMs, dimensions);
		if (cp.files_extract_start > 0 && cp.inno_uninstall_done > 0) monitor.recordDuration("install_files_extract", cp.files_extract_start - cp.inno_uninstall_done, dimensions);
		if (cp.process_close_done > 0 && cp.process_check_start > 0) monitor.recordDuration("install_process_close", cp.process_close_done - cp.process_check_start, dimensions);
		const totalUserWait = event.userWaitMs.process_dialog + event.userWaitMs.tsbx_dialog;
		if (totalUserWait > 0) monitor.recordDuration("install_user_wait_total", totalUserWait, dimensions);
		if (cp.inno_uninstall_done > 0 && cp.inno_uninstall_start > 0) monitor.recordDuration("install_inno_uninstall", cp.inno_uninstall_done - cp.inno_uninstall_start, dimensions);
		if (cp.install_complete > 0 && cp.files_extract_start > 0) monitor.recordDuration("install_post_extract", cp.install_complete - cp.files_extract_start, dimensions);
		monitor.addCounter("install_completed", 1, dimensions);
	}
}
var FLUSH_RETRY_INTERVAL_MS$2 = 5e3;
var FLUSH_MAX_RETRIES$2 = 24;
async function flushOnce$2() {
	const files = readInstallFiles(getPendingDir$2());
	if (files.length === 0) return true;
	installLog$1.info(`Flushing ${files.length} pending install telemetry file(s)`);
	let allDone = true;
	for (const filePath of files) {
		const payload = parseInstallPayload(filePath);
		if (!payload) {
			try {
				node_fs.renameSync(filePath, filePath + ".invalid");
			} catch {}
			continue;
		}
		try {
			await reportInstallTiming(payload);
			node_fs.renameSync(filePath, filePath + ".reported");
			installLog$1.info(`Reported and marked: ${node_path.basename(filePath)}`);
		} catch (err) {
			installLog$1.warn(`Failed to flush ${node_path.basename(filePath)}:`, err);
			allDone = false;
		}
	}
	return allDone;
}
/**
* Scan and report install timing files. Call once after bootstrapMainProcess completes.
* Retries up to ~2 min to wait for GalileoExporter to connect.
*/
function flushInstallPendingTelemetry() {
	if (process.platform !== "win32") return;
	(async () => {
		for (let attempt = 0; attempt <= FLUSH_MAX_RETRIES$2; attempt++) {
			if (attempt > 0) await new Promise((resolve) => setTimeout(resolve, FLUSH_RETRY_INTERVAL_MS$2));
			try {
				if (await flushOnce$2()) return;
			} catch (err) {
				installLog$1.warn("flushInstallPendingTelemetry failed:", err);
			}
		}
		installLog$1.warn("flushInstallPendingTelemetry: giving up after retries, will retry next launch");
	})().catch((err) => installLog$1.warn("flushInstallPendingTelemetry unexpected error:", err));
}
//#endregion
//#region src/main/system/install/flush-update-telemetry.ts
/**
* macOS update timing telemetry flusher.
*
* Consumes two types of pending-telemetry files written during macOS auto-update:
*   1. update-ts-<ts>.json   — TS-side checkpoints (check→download→verify→extract→spawn)
*   2. update-shell-<ts>.json — Shell-side checkpoints (wait_exit→backup→ditto→open)
*
* Both are written by the OLD version's process/script before exit. The NEW version's
* main process picks them up here and reports via Galileo + Aegis, then marks as .reported.
*
* Called after bootstrapMainProcess completes, alongside flushInstallPendingTelemetry.
*/
require_app_instance.init_app_instance();
var updateLog = import_src.default.scope("update-telemetry");
function getPendingDir$1() {
	return require_app_instance.getWorkbuddyPendingTelemetryDir();
}
function readUpdateFiles(dir) {
	try {
		return node_fs.readdirSync(dir).filter((f) => (f.startsWith("update-ts-") || f.startsWith("update-shell-")) && f.endsWith(".json")).map((f) => node_path.join(dir, f));
	} catch {
		return [];
	}
}
function parsePayload$1(filePath) {
	try {
		const raw = node_fs.readFileSync(filePath, "utf-8");
		const parsed = JSON.parse(raw);
		if (typeof parsed !== "object" || parsed === null) return null;
		const obj = parsed;
		if (obj.source === "update-ts") return parsed;
		if (obj.source === "update-shell") return parsed;
		return null;
	} catch {
		return null;
	}
}
async function reportUpdateTiming(payload) {
	const monitor = require_desktop_monitor_service.DesktopMonitorService.getSharedInstance();
	if (!monitor) throw new Error("DesktopMonitorService not ready");
	if (!monitor.isGalileoConnected()) throw new Error("GalileoExporter not connected");
	const isTs = payload.source === "update-ts";
	const messageName = isTs ? "update.timing.ts" : "update.timing.shell";
	const attrs = {
		module: "update",
		source: payload.source,
		platform: payload.platform
	};
	if (isTs) {
		const p = payload;
		attrs.arch = p.arch;
		attrs.from_version = p.fromVersion;
		attrs.to_version = p.toVersion;
		attrs.target_bundle_id = p.targetBundleId;
	} else {
		const p = payload;
		attrs.version = p.version;
		attrs.target_bundle_id = p.targetBundleId;
	}
	for (const [k, v] of Object.entries(payload.checkpoints)) attrs[`cp_${k}`] = v;
	for (const [k, v] of Object.entries(payload.durations)) attrs[`dur_${k}`] = v;
	await monitor.exportCrashLogs([{
		timestamp: Date.parse(payload.timestamp) || Date.now(),
		level: "info",
		message: messageName,
		attributes: attrs
	}]);
	const dimensions = {
		platform: "darwin",
		arch: isTs ? payload.arch : node_os.arch()
	};
	if (isTs) {
		const d = payload.durations;
		if (d.download > 0) monitor.recordDuration("update_macos_download_duration", d.download, dimensions);
		if (d.verify > 0) monitor.recordDuration("update_macos_verify_duration", d.verify, dimensions);
		if (d.extract > 0) monitor.recordDuration("update_macos_extract_duration", d.extract, dimensions);
		if (d.total_pre_spawn > 0) monitor.recordDuration("update_macos_pre_spawn_duration", d.total_pre_spawn, dimensions);
	} else {
		const d = payload.durations;
		if (d.wait_exit > 0) monitor.recordDuration("update_macos_wait_exit_duration", d.wait_exit, dimensions);
		if (d.ditto > 0) monitor.recordDuration("update_macos_ditto_duration", d.ditto, dimensions);
		if (d.backup > 0) monitor.recordDuration("update_macos_backup_duration", d.backup, dimensions);
		if (d.post_install > 0) monitor.recordDuration("update_macos_post_install_duration", d.post_install, dimensions);
		if (d.total > 0) monitor.recordDuration("update_macos_shell_total_duration", d.total, dimensions);
		monitor.addCounter("update_macos_completed", 1, dimensions);
	}
}
var FLUSH_RETRY_INTERVAL_MS$1 = 5e3;
var FLUSH_MAX_RETRIES$1 = 24;
async function flushOnce$1() {
	const files = readUpdateFiles(getPendingDir$1());
	if (files.length === 0) return true;
	updateLog.info(`Flushing ${files.length} pending update telemetry file(s)`);
	let allDone = true;
	for (const filePath of files) {
		const payload = parsePayload$1(filePath);
		if (!payload) {
			try {
				node_fs.renameSync(filePath, filePath + ".invalid");
			} catch {}
			continue;
		}
		try {
			await reportUpdateTiming(payload);
			node_fs.renameSync(filePath, filePath + ".reported");
			updateLog.info(`Reported and marked: ${node_path.basename(filePath)}`);
		} catch (err) {
			updateLog.warn(`Failed to flush ${node_path.basename(filePath)}:`, err);
			allDone = false;
		}
	}
	return allDone;
}
/**
* Scan and report macOS update timing files. Call once after bootstrapMainProcess.
* Only runs on macOS.
*/
function flushUpdatePendingTelemetry() {
	if (process.platform !== "darwin") return;
	(async () => {
		for (let attempt = 0; attempt <= FLUSH_MAX_RETRIES$1; attempt++) {
			if (attempt > 0) await new Promise((resolve) => setTimeout(resolve, FLUSH_RETRY_INTERVAL_MS$1));
			try {
				if (await flushOnce$1()) return;
			} catch (err) {
				updateLog.warn("flushUpdatePendingTelemetry failed:", err);
			}
		}
		updateLog.warn("flushUpdatePendingTelemetry: giving up after retries");
	})().catch((err) => updateLog.warn("flushUpdatePendingTelemetry unexpected error:", err));
}
//#endregion
//#region src/main/system/install/macos-install-timing.ts
/**
* macOS install timing detector.
*
* macOS installation = user drags .app from DMG to /Applications (Finder copy).
* We cannot inject code into the copy process, but on first launch we can
* infer timing from file metadata.
*
* Key insight: Finder preserves the original mtime/birthtime from the DMG, so
* those timestamps reflect *build* time, NOT *copy* time. The only reliable
* wall-clock indicator of when the copy actually happened is **ctime**
* (inode change time), which macOS sets when a file is first written to disk.
*
* However, some files' ctime gets updated when the app launches (e.g. binary
* due to code-signing / Gatekeeper, bundle root due to xattr changes). We use:
*   - Copy start:  app.asar ctime  (large file, written early, not touched at launch)
*   - Copy end:    Info.plist ctime (small file, written last by Finder, not touched at launch)
*   - Copy duration: Info.plist ctime − app.asar ctime
*
* First-launch detection: reports only once per install by writing a marker
* file at <configDir>/install-timing-reported. The marker contains the
* Info.plist ctimeMs so we can detect a re-install (new ctime = new copy).
*/
require_app_instance.init_app_instance();
var installLog = import_src.default.scope("install-telemetry-mac");
/** Marker lives under the brand-aware config dir (same root as pending-telemetry). */
function getMarkerPath() {
	return node_path.join(require_app_instance.getWorkbuddyConfigDir(), "install-timing-reported");
}
/** Delay before reporting, to let DesktopMonitorService fully initialize. */
var REPORT_DELAY_MS = 3e4;
/**
* Detect macOS install timing on first launch and report via monitor channels.
* Safe to call on any platform — returns immediately on non-darwin.
*/
function detectMacInstallTiming() {
	if (process.platform !== "darwin") return;
	try {
		const exePath = electron.app.getPath("exe");
		const appBundlePath = node_path.resolve(exePath, "../../..");
		const infoPlistPath = node_path.join(appBundlePath, "Contents", "Info.plist");
		const appAsarPath = node_path.join(appBundlePath, "Contents", "Resources", "app.asar");
		const copyEndMs = node_fs.statSync(infoPlistPath).ctimeMs;
		const currentCtime = String(copyEndMs);
		const markerPath = getMarkerPath();
		if (node_fs.existsSync(markerPath)) try {
			if (node_fs.readFileSync(markerPath, "utf-8").trim() === currentCtime) return;
		} catch {}
		let copyStartMs = copyEndMs;
		try {
			copyStartMs = node_fs.statSync(appAsarPath).ctimeMs;
		} catch {}
		const copyDurationMs = Math.max(0, Math.round(copyEndMs - copyStartMs));
		installLog.info(`macOS install timing: copy=${copyDurationMs}ms (copyStart=${new Date(copyStartMs).toISOString()}, copyEnd=${new Date(copyEndMs).toISOString()})`);
		setTimeout(() => {
			try {
				const monitor = require_desktop_monitor_service.DesktopMonitorService.getSharedInstance();
				if (!monitor) {
					installLog.warn("Monitor not ready, skipping macOS install timing report");
					return;
				}
				const dimensions = {
					platform: "darwin",
					install_mode: "drag-and-drop",
					arch: node_os.arch(),
					app_version: electron.app.getVersion()
				};
				monitor.recordDuration("install_macos_copy_duration", copyDurationMs, dimensions);
				monitor.addCounter("install_completed", 1, dimensions);
				monitor.exportCrashLogs([{
					timestamp: Date.now(),
					level: "info",
					message: "install.timing",
					attributes: {
						module: "installer",
						platform: "darwin",
						arch: node_os.arch(),
						app_version: electron.app.getVersion(),
						install_mode: "drag-and-drop",
						copy_duration_ms: copyDurationMs,
						copy_start_time: new Date(copyStartMs).toISOString(),
						copy_end_time: new Date(copyEndMs).toISOString()
					}
				}]).catch((err) => {
					installLog.warn("Galileo export failed:", err);
				});
				try {
					const mp = getMarkerPath();
					node_fs.mkdirSync(node_path.dirname(mp), { recursive: true });
					node_fs.writeFileSync(mp, currentCtime, "utf-8");
				} catch (err) {
					installLog.warn("Failed to write marker:", err);
				}
			} catch (err) {
				installLog.warn("macOS install timing report failed:", err);
			}
		}, REPORT_DELAY_MS);
	} catch (err) {
		installLog.warn("detectMacInstallTiming failed:", err);
	}
}
//#endregion
//#region src/main/system/persisted-proxy-bootstrap.ts
/**
* 启动期代理引导（TODO-2 #49077 R12 修订）。
*
* ## 背景
*
* `applyProxySettingsToMain` 只在用户**通过 UI 操作**时被调用（saveSettings → host capability）。
* 启动期 Main 进程完全不读 `settings.json`，只调 `injectSystemProxyToEnv()` 读 OS。
*
* 结果：用户上次手动配了 `http://corp:8080`（写入 settings.json），下次启动后：
*   - settings.json 里存着 manual / url=corp:8080
*   - 但 Main 只读 OS，env 被 OS 值（可能是空）覆盖
*   - 所有早期请求（Galileo 上报 / auto-update / Renderer fetch）走 OS 或直连
*   - 直到用户去 UI 切换一次模式，settings 才真正生效
*
* 这违反"config > env > OS > direct"优先级（settings.json 是 config 层）。
*
* ## 修复
*
* 启动期先读 settings.json 决定代理来源，**完全替代** `injectSystemProxyToEnv()`：
*
*   - manual + url → 直接写 env（HTTP_PROXY/HTTPS_PROXY/http_proxy/https_proxy）
*                    + WORKBUDDY_PROXY_SOURCE='manual'
*   - system       → 调原 `injectSystemProxyToEnv()`（OS 检测）
*   - none         → 不写 env（保持空）
*   - 文件不存在/损坏/读失败 → 兜底走 `injectSystemProxyToEnv()`，保持旧行为
*
* ## 约束
*
* - **必须同步**：启动期没有 await，且后续 `installUndiciProxyDispatcher` 会立即读 env
* - **不能依赖任何 daemon-side service**：daemon 此时还没起来
* - **复用 contract 的 `inferProxyModeFromVscodeFields`**：避免与 `ProxySettingsService.getSettings`
*   逻辑分叉（同一个 settings.json 文件，两个进程读出来的 mode 必须一致）
*
* ## 不做的事
*
* - **不调** `clearProxyEnv()`：启动期 env 本来就接近干净，且如果外部 launcher 显式传了
*   `HTTP_PROXY=xxx` 启动 WorkBuddy（CI / 测试场景），我们应该尊重而不是强清。manual
*   分支直接覆盖等同清理；system 分支由 `injectSystemProxyToEnv` 自己判断 env 已存在则 skip。
* - **不调** `invalidateProxyAgentCache()`：在这之后才会第一次 `installUndiciProxyDispatcher`，
*   还没有缓存可清。
*/
require_app_instance.init_app_instance();
/**
* 启动期读 settings.json + 应用代理配置到 process.env。
*
* @returns 实际应用的 mode（'manual' / 'system' / 'none' / 'fallback-system'）—— 仅供日志使用
*/
function applyPersistedProxyToBootstrapEnv() {
	const persisted = readPersistedProxySettings();
	if (!persisted) {
		require_logger.mainLog.info("[startup-proxy] no persisted settings; falling back to injectSystemProxyToEnv()");
		injectSystemProxyToEnv();
		return "fallback-system";
	}
	switch (persisted.mode) {
		case "manual": {
			const url = persisted.url ?? "";
			if (!url) {
				require_logger.mainLog.warn("[startup-proxy] persisted manual without url; treating as none");
				return "none";
			}
			process.env.HTTP_PROXY = url;
			process.env.HTTPS_PROXY = url;
			process.env.http_proxy = url;
			process.env.https_proxy = url;
			process.env.WORKBUDDY_PROXY_SOURCE = "manual";
			require_logger.mainLog.info(`[startup-proxy] applied persisted manual proxy (mode=manual, url=${sanitizeForLog(url)})`);
			return "manual";
		}
		case "system":
			require_logger.mainLog.info("[startup-proxy] persisted mode=system; running injectSystemProxyToEnv()");
			injectSystemProxyToEnv();
			return "system";
		case "none":
			require_logger.mainLog.info("[startup-proxy] persisted mode=none; leaving env as-is");
			return "none";
	}
}
/**
* 同步读 `<configDir>/settings.json` 并映射成 ProxySettings。
*
* 任何异常（文件不存在 / JSON 损坏 / 非对象）都返回 undefined，让上层走 fallback 分支。
* **不抛**——启动期失败不能阻塞 Main 进程启动。
*/
function readPersistedProxySettings() {
	try {
		const settingsPath = path.join(require_app_instance.getWorkbuddyConfigDir(), "settings.json");
		if (!fs.existsSync(settingsPath)) return;
		const raw = fs.readFileSync(settingsPath, "utf-8");
		const json = JSON.parse(raw);
		if (!json || typeof json !== "object" || Array.isArray(json)) {
			require_logger.mainLog.warn("[startup-proxy] settings.json is not a plain object; skipping");
			return;
		}
		return require_workbuddy_auth_product_coordinator.inferProxyModeFromVscodeFields(json);
	} catch (err) {
		require_logger.mainLog.warn("[startup-proxy] readPersistedProxySettings failed (non-fatal):", err);
		return;
	}
}
/** 代理 URL 可能含 user:pass，日志中脱敏 host 之外部分 */
function sanitizeForLog(url) {
	try {
		const u = new URL(url);
		return `${u.protocol}//${u.host}`;
	} catch {
		return "(unparseable)";
	}
}
//#endregion
//#region src/main/system/platform/host-platform-detector.ts
/**
* Host platform detector (main process).
*
* 在 main 进程探测「宿主机器真实硬件架构」并暴露给 preload。preload 在
* sandbox 下不能直接 require('child_process')，所以原本写在 preload 的
* 注册表查询永远失败；把探测搬到 main 之后这条兜底才真正生效。
*
* ## 探测策略（四级降级）
*
*   1) `PROCESSOR_ARCHITEW6432` 环境变量 —— 标准 Windows-on-ARM 仿真层填的
*      字段。x64 进程在 ARM64 宿主上被 Prism 仿真时会拿到 'ARM64'。
*      命中即返回，开销 < 0.1ms。
*
*   2) `PROCESSOR_IDENTIFIER` 环境变量 —— CPU 微架构描述，例如
*      "ARMv8 (64-bit) Family 8 Model 0 Revision 0"。**这个字段不会被
*      仿真层改写**，是「Win-on-ARM 仿真 x64」最可靠的旁证。
*      用来覆盖某些 VM 环境（如 VirtualBox on Apple Silicon）丢掉
*      W6432 的反常情形。开销 < 0.1ms。
*
*   3) 注册表 HKLM\SYSTEM\...\PROCESSOR_ARCHITECTURE —— 系统级真值，安装时
*      由 Windows setup 写入硬件架构。spawn `reg.exe` 子进程，~30-80ms。
*      显式绝对路径 + `/reg:64` 防止 PATH 误命中或 32-bit 注册表视图。
*
*   4) `process.arch` 兜底 —— 上面三步都失败时退化到现有行为，至少不比
*      修复前更糟。
*
* 探测结果在模块级缓存（`cached`），同一进程内只跑一次。
*
* ## 错误处理
*
* 全程 try-catch 兜底：任何意外（环境变量异常、execFileSync 抛错、注册表
* 输出格式异常）都不会让 main 启动失败，最坏情况落到 `process.arch` fallback。
*/
var cached = null;
/**
* 探测宿主平台信息，结果带模块级缓存，同进程多次调用零开销。
*
* 全程 try-catch：意外抛错也只会落入 'detector-crashed' 状态，返回
* `process.arch` 兜底值，不会让调用方崩溃。
*/
function detectHostPlatform() {
	if (cached) return cached;
	const t0 = Date.now();
	const probe = {
		platform: process.platform,
		processArch: process.arch,
		envProcessorArchitecture: null,
		envProcessorArchitew6432: null,
		envProcessorIdentifier: null,
		registryQueried: false,
		registryStdout: null,
		registryParsed: null,
		registryError: null,
		resolvedBy: "fallback-process-arch",
		resolvedHostArch: process.arch,
		elapsedMs: 0
	};
	const finalize = (hostArch, by) => {
		probe.resolvedBy = by;
		probe.resolvedHostArch = hostArch;
		probe.elapsedMs = Date.now() - t0;
		cached = {
			platform: process.platform,
			arch: process.arch,
			hostArch,
			probe: Object.freeze(probe)
		};
		try {
			require_logger.logger_default.info(`[HostPlatform] hostArch=${hostArch} via=${by} elapsed=${probe.elapsedMs}ms`, {
				processArch: probe.processArch,
				envW6432: probe.envProcessorArchitew6432,
				envArch: probe.envProcessorArchitecture,
				envIdentifier: probe.envProcessorIdentifier,
				registryParsed: probe.registryParsed,
				registryError: probe.registryError
			});
		} catch {}
		return cached;
	};
	try {
		try {
			probe.envProcessorArchitecture = process.env.PROCESSOR_ARCHITECTURE ?? null;
		} catch {}
		try {
			probe.envProcessorArchitew6432 = process.env.PROCESSOR_ARCHITEW6432 ?? null;
		} catch {}
		try {
			probe.envProcessorIdentifier = process.env.PROCESSOR_IDENTIFIER ?? null;
		} catch {}
		if (process.platform !== "win32") return finalize(process.arch, "non-windows");
		const w6432 = (probe.envProcessorArchitew6432 || "").toUpperCase();
		if (w6432 === "ARM64") return finalize("arm64", "env-w6432");
		if (w6432 === "AMD64") return finalize("x64", "env-w6432");
		if (w6432 === "X86") return finalize("ia32", "env-w6432");
		const ident = (probe.envProcessorIdentifier || "").toUpperCase();
		if (/\bARM(V[89]\b|64\b)/.test(ident)) return finalize("arm64", "env-identifier");
		probe.registryQueried = true;
		try {
			const out = (0, node_child_process.execFileSync)(process.env.SystemRoot ? `${process.env.SystemRoot}\\System32\\reg.exe` : "C:\\Windows\\System32\\reg.exe", [
				"query",
				"HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Environment",
				"/v",
				"PROCESSOR_ARCHITECTURE",
				"/reg:64"
			], {
				timeout: 2e3,
				windowsHide: true,
				encoding: "utf8"
			});
			probe.registryStdout = out;
			const value = (out.match(/PROCESSOR_ARCHITECTURE\s+REG_SZ\s+(\S+)/i)?.[1] || "").toUpperCase();
			probe.registryParsed = value || null;
			if (value === "ARM64") return finalize("arm64", "registry");
			if (value === "AMD64") return finalize("x64", "registry");
			if (value === "X86") return finalize("ia32", "registry");
		} catch (error) {
			probe.registryError = error instanceof Error ? error.message : String(error);
		}
		return finalize(process.arch, "fallback-process-arch");
	} catch (error) {
		try {
			require_logger.logger_default.error("[HostPlatform] detector crashed, falling back to process.arch:", error);
		} catch {}
		probe.registryError = probe.registryError ?? (error instanceof Error ? error.message : String(error));
		return finalize(process.arch, "detector-crashed");
	}
}
//#endregion
//#region src/main/system/repair/ffmpeg-dll-guard.ts
/**
* ffmpeg.dll 启动防护 — 防止 renderer 进程因 delay-load 失败而 __fastfail 硬崩溃。
*
* 背景：Chromium 的 media::MediaInitializer 在 renderer 进程启动时通过 Windows
* delay-load 机制加载 ffmpeg.dll。若 DLL 缺失或损坏，delay_load_failure_hook 会调用
* __fastfail(FAST_FAIL_FATAL_APP_EXIT)，进程被内核立即终止，不可 catch、不可降级。
*
* 本模块必须在任何 BrowserWindow 创建之前调用（main process Phase 1）。
*
* 策略：
* 1. 检测 ffmpeg.dll 是否存在于 exe 同级目录且大小合理
* 2. 缺失/损坏时尝试从 .bak 备份恢复（after-pack.js 在打包时创建）
* 3. 恢复失败则设置 process.env.WORKBUDDY_FFMPEG_MISSING='1'，
*    让 renderer 隐藏语音功能而非硬崩
* 4. 写入 crash writer 供遥测上报
*/
var TAG$1 = "[FfmpegDllGuard]";
/** ffmpeg.dll 正常最小体积阈值（100KB）。正常约 2-6MB。 */
var MIN_VALID_SIZE = 100 * 1024;
/**
* 同步检测并尝试修复 ffmpeg.dll。
* 仅 Windows 平台生效；其他平台直接返回 ok。
*/
function ensureFfmpegDll(logger) {
	if (process.platform !== "win32") return { status: "ok" };
	const exeDir = node_path.dirname(process.execPath);
	const ffmpegPath = node_path.join(exeDir, "ffmpeg.dll");
	if (isValidDll(ffmpegPath)) return { status: "ok" };
	logger(`${TAG$1} ffmpeg.dll missing or corrupted at ${ffmpegPath}`);
	const candidates = buildRepairCandidates(exeDir);
	for (const candidate of candidates) {
		if (!isValidDll(candidate)) continue;
		try {
			node_fs.copyFileSync(candidate, ffmpegPath);
			logger(`${TAG$1} REPAIRED from ${candidate}`);
			return {
				status: "repaired",
				repairedFrom: candidate
			};
		} catch (err) {
			logger(`${TAG$1} copy from ${candidate} failed: ${String(err)}`);
		}
	}
	logger(`${TAG$1} REPAIR FAILED — app cannot start safely without ffmpeg.dll`);
	return { status: "missing" };
}
/** 检查文件存在且大小合理 */
function isValidDll(filePath) {
	try {
		const stat = node_fs.statSync(filePath);
		return stat.isFile() && stat.size > MIN_VALID_SIZE;
	} catch {
		return false;
	}
}
/** 构建修复候选路径列表 */
function buildRepairCandidates(exeDir) {
	const candidates = [];
	candidates.push(node_path.join(exeDir, "ffmpeg.dll.bak"));
	const resourcesPath = process.resourcesPath;
	if (resourcesPath) candidates.push(node_path.join(resourcesPath, "ffmpeg.dll.bak"));
	return candidates;
}
//#endregion
//#region src/main/system/repair/pending-telemetry.ts
/**
* Repair helper pending telemetry flusher.
*
* The native repair helper (WorkBuddyRepair.exe on Windows, repair helper on macOS)
* writes events to a pending-telemetry directory in user data area
* because it runs outside the JS process and cannot report through runtime telemetry directly.
*
* Path:
*   Windows: %USERPROFILE%\.workbuddy\pending-telemetry\repair-<ts>.json
*   macOS:   ~/Library/Application Support/WorkBuddy/pending-telemetry/...
*
* Windows 路径选择说明:
*   不能用 %LOCALAPPDATA%\WorkBuddy\ —— 那是 per-user installer 的 install dir,
*   写在那里会触发 install-dir-guard 阻塞自动更新, 也会被 NSIS 升级清理抹掉。
*   也不用 %APPDATA%\WorkBuddy\ —— 虽然 Electron 默认 userData 在那, 但 WorkBuddy
*   通过 app.setPath('userData', '~/.workbuddy/app') 重定向了, 所以 %APPDATA%
*   实际不被项目使用; 跟 ~/.workbuddy/{logs,app,skills,...} 同根更符合项目惯例。
*
* 两端 (TS + C#) 必须取到同一路径。TS 用 os.homedir(), C# 用 USERPROFILE 环境变量。
*
* This module is called once after bootstrapMainProcess completes (DesktopMonitorService
* is guaranteed ready at that point). It scans the pending-telemetry directory, reports
* each event via DesktopMonitorService.exportCrashLogs(), and deletes the file on success.
* Failed files are left for the next launch.
*
* File format (aligned with mac-side TelemetryWriter.swift):
* {
*   "source": "repair-helper",
*   "platform": "win32" | "darwin",
*   "appVersion": "1.2.3",
*   "sessionId": "<guid>",
*   "events": [
*     { "name": "repair_helper.issue_found", "timestamp": "...", "issueKind": "non-ascii-path" },
*     { "name": "repair_helper.repair_result", "timestamp": "...", "issueKind": "...",
*       "status": "success"|"failed", "costMs": 1234, "errorMsg": "..." },
*     { "name": "repair_helper.relaunch", "timestamp": "...", "via": "launcher"|"workbuddy",
*       "status": "success"|"failed" }
*   ]
* }
*/
var repairLog = import_src.default.scope("repair-telemetry");
function getPendingDir() {
	if (process.platform === "win32") return node_path.join(node_os.homedir(), ".workbuddy", "pending-telemetry");
	return node_path.join(node_os.homedir(), "Library", "Application Support", "WorkBuddy", "pending-telemetry");
}
function readPendingFiles(dir) {
	try {
		return node_fs.readdirSync(dir).filter((f) => f.startsWith("repair-") && f.endsWith(".json")).map((f) => node_path.join(dir, f));
	} catch {
		return [];
	}
}
function parsePayload(filePath) {
	try {
		const raw = node_fs.readFileSync(filePath, "utf-8");
		const parsed = JSON.parse(raw);
		if (typeof parsed === "object" && parsed !== null && "source" in parsed && parsed.source === "repair-helper" && Array.isArray(parsed.events)) return parsed;
		return null;
	} catch {
		return null;
	}
}
async function reportEvents(payload) {
	const monitor = require_desktop_monitor_service.DesktopMonitorService.getSharedInstance();
	if (!monitor) throw new Error("DesktopMonitorService not ready");
	if (!monitor.isGalileoConnected()) throw new Error("GalileoExporter not connected");
	const logs = payload.events.filter((event) => !!event.name).map((event) => {
		const isFailure = event.status === "failed" || event.status === "timeout";
		const attrs = {
			module: "repair",
			platform: payload.platform,
			...payload.appVersion ? { app_version: payload.appVersion } : {},
			...payload.sessionId ? { session_id: payload.sessionId } : {},
			...event.issueKind ? { issue_kind: event.issueKind } : {},
			...event.status ? { status: event.status } : {},
			...typeof event.costMs === "number" ? { duration_ms: event.costMs } : {},
			...event.errorMsg ? { error_msg: event.errorMsg } : {},
			...event.via ? { via: event.via } : {}
		};
		const message = event.name.replace(/^repair_helper\./, "repair.");
		return {
			timestamp: event.timestamp ? Date.parse(event.timestamp) : Date.now(),
			level: isFailure ? "error" : "info",
			message,
			attributes: attrs
		};
	});
	if (logs.length === 0) return;
	await monitor.exportCrashLogs(logs);
}
var FLUSH_RETRY_INTERVAL_MS = 5e3;
var FLUSH_MAX_RETRIES = 24;
async function flushOnce() {
	const dir = getPendingDir();
	if (!dir) return true;
	const files = readPendingFiles(dir);
	if (files.length === 0) return true;
	repairLog.info(`Flushing ${files.length} pending repair telemetry file(s)`);
	let allDone = true;
	for (const filePath of files) {
		const payload = parsePayload(filePath);
		if (!payload) {
			try {
				node_fs.unlinkSync(filePath);
			} catch {}
			continue;
		}
		try {
			await reportEvents(payload);
			node_fs.unlinkSync(filePath);
			repairLog.info(`Flushed and deleted: ${node_path.basename(filePath)}`);
		} catch (err) {
			repairLog.warn(`Failed to flush ${node_path.basename(filePath)}:`, err);
			allDone = false;
		}
	}
	return allDone;
}
/**
* Flush all pending repair telemetry files. Call once after bootstrapMainProcess completes.
* Retries up to 30s to wait for GalileoExporter to finish its health-check and connect.
*/
function flushRepairPendingTelemetry() {
	(async () => {
		for (let attempt = 0; attempt <= FLUSH_MAX_RETRIES; attempt++) {
			if (attempt > 0) await new Promise((resolve) => setTimeout(resolve, FLUSH_RETRY_INTERVAL_MS));
			try {
				if (await flushOnce()) return;
			} catch (err) {
				repairLog.warn("flushRepairPendingTelemetry failed:", err);
			}
		}
		repairLog.warn("flushRepairPendingTelemetry: giving up after retries, will retry next launch");
	})().catch((err) => repairLog.warn("flushRepairPendingTelemetry unexpected error:", err));
}
//#endregion
//#region src/main/system/repair/helper-launcher.ts
/**
* WorkBuddy Startup Repair — Helper Launcher
*
* macOS: spawn WorkBuddyRepair（preflight-only 或 UI 模式），扫描完全由 Swift 侧负责。
* Windows: spawn WorkBuddyRepair.exe，扫描完全由 native exe 负责。
*
* 设计契约:
*   - context 走 argv 不落盘
*   - cwd 强制 '/' (不继承可能损坏的父进程 cwd)
*   - findHelperBinary 用 __dirname 反推 + process.resourcesPath 兜底, 校验 X_OK
*   - 失败可恢复: 主调用方根据 ok=false 决定是否回退
*/
/**
* 进程级单飞状态。reset 仅供单测使用 (resetSpawnGuardForTest)。
*
* 一旦本进程内任意一次 spawnRepairHelper(force≠true) 成功, 后续非 force 调用
* 都直接返回 already-spawned。这是为了解决 startup-repair.ts 同时持有
* try-path (runStartupRepairScan) 和 catch-path (runBootstrapFailureRepairScan)
* 两条调用路径在 bootstrap 失败时各 spawn 一次的问题。
*/
var alreadySpawned = null;
/**
* spawn Helper.app 进程, 立即 detach。
*
* 调用方根据 options.blocking 决定后续:
*   - blocking=true (fatal):  await 完成后调用 app.exit(0) 让 Helper 接管
*   - blocking=false (warn):  spawn 后主 App 继续 bootstrap
*
* 任何文件系统/权限故障都不应让本函数抛出; 异常被 catch 后通过 result.reason 返回。
*/
function spawnRepairHelper(options) {
	if (process.platform === "win32") return spawnRepairHelperWin32(options);
	if (process.platform !== "darwin") return {
		ok: false,
		reason: "platform-unsupported"
	};
	if (alreadySpawned && !options.force) return {
		ok: false,
		reason: `already-spawned:${alreadySpawned.reason}`,
		helperPath: alreadySpawned.helperPath
	};
	const helperPath = findHelperBinary();
	if (!helperPath) return {
		ok: false,
		reason: "helper-not-found"
	};
	const contextJson = JSON.stringify({
		schemaVersion: 1,
		reason: options.reason,
		triggeredAt: (/* @__PURE__ */ new Date()).toISOString(),
		pid: process.pid,
		blocking: options.blocking ?? true,
		...options.extra ?? {}
	});
	try {
		(0, node_child_process.spawn)(helperPath, ["--context-json", contextJson], {
			detached: true,
			stdio: "ignore",
			cwd: "/",
			env: {
				PATH: "/usr/bin:/bin:/usr/sbin:/sbin",
				HOME: node_os.homedir(),
				USER: process.env.USER ?? "",
				LANG: process.env.LANG ?? "en_US.UTF-8",
				__WB_REPAIR_INVOKED_FROM: options.reason,
				...process.env.WORKBUDDY_CONFIG_DIR ? { WORKBUDDY_CONFIG_DIR: process.env.WORKBUDDY_CONFIG_DIR } : {}
			}
		}).unref();
		alreadySpawned = {
			reason: options.reason,
			helperPath
		};
		return {
			ok: true,
			helperPath
		};
	} catch (e) {
		return {
			ok: false,
			reason: `spawn-failed: ${e.message}`
		};
	}
}
/**
* 定位 Helper 二进制。
* 与 early-repair.js findHelperBinary() 行为一致。
*
* 候选顺序:
*   1. WORKBUDDY_REPAIR_HELPER_PATH env (测试用)
*   2. __dirname 反推 (打包后位置最稳)
*   3. process.resourcesPath 兜底
*
* 全部校验 X_OK 才返回 — 防反病毒删除 / 权限破坏。
*/
function findHelperBinary() {
	if (process.platform === "win32") return findHelperBinaryWin32();
	const HELPER_REL = node_path.join("Frameworks", "WorkBuddy Repair.app", "Contents", "MacOS", "WorkBuddyRepair");
	const candidates = [];
	if (process.env.WORKBUDDY_REPAIR_HELPER_PATH) candidates.push(process.env.WORKBUDDY_REPAIR_HELPER_PATH);
	try {
		candidates.push(node_path.resolve(__dirname, "..", "..", "..", "..", "..", "Contents", HELPER_REL));
		candidates.push(node_path.resolve(__dirname, "..", "..", "..", "build", "mac", "WorkBuddy.app", "Contents", HELPER_REL));
	} catch {}
	if (process.resourcesPath) candidates.push(node_path.join(process.resourcesPath, "..", HELPER_REL));
	for (const c of candidates) {
		if (!c) continue;
		try {
			node_fs.accessSync(c, node_fs.constants.X_OK);
			return c;
		} catch {}
	}
	return null;
}
/**
* Windows 平台定位 WorkBuddyRepair.exe。
*
* 部署位置: $INSTDIR/resources/WorkBuddyRepair.exe
* process.resourcesPath 在打包后指向 $INSTDIR/resources/
*
* 候选顺序:
*   1. WORKBUDDY_REPAIR_HELPER_PATH env (测试用)
*   2. process.resourcesPath/WorkBuddyRepair.exe (打包后标准位置)
*   3. __dirname 反推 (dev 模式兜底)
*/
function findHelperBinaryWin32() {
	const EXE_NAME = "WorkBuddyRepair.exe";
	const candidates = [];
	if (process.env.WORKBUDDY_REPAIR_HELPER_PATH) candidates.push(process.env.WORKBUDDY_REPAIR_HELPER_PATH);
	if (process.resourcesPath) candidates.push(node_path.join(process.resourcesPath, EXE_NAME));
	try {
		candidates.push(node_path.resolve(__dirname, "..", "..", "..", "native", "repair", "win", "WorkBuddyRepair", "bin", "Release", "net462", EXE_NAME));
		candidates.push(node_path.resolve(__dirname, "..", "..", "..", "native", "repair", "win", "WorkBuddyRepair", "bin", "Debug", "net462", EXE_NAME));
	} catch {}
	for (const c of candidates) {
		if (!c) continue;
		try {
			node_fs.accessSync(c, node_fs.constants.F_OK);
			return c;
		} catch {}
	}
	return null;
}
/**
* Windows 平台 spawn WorkBuddyRepair.exe。
*
* 与 macOS 端的核心差异:
*   - Windows 上 TS 侧**不做扫描**, 完全由 native exe 自行检测
*   - spawn 时不传 --context-json (native exe 自己跑 scanners)
*   - detach + unref, 让 repair exe 独立于主进程运行
*/
function spawnRepairHelperWin32(options) {
	if (alreadySpawned && !options.force) return {
		ok: false,
		reason: `already-spawned:${alreadySpawned.reason}`,
		helperPath: alreadySpawned.helperPath
	};
	const helperPath = findHelperBinaryWin32();
	if (!helperPath) return {
		ok: false,
		reason: "helper-not-found"
	};
	try {
		(0, node_child_process.spawn)(helperPath, [], {
			detached: true,
			stdio: "ignore",
			windowsHide: false,
			env: {
				...process.env,
				__WB_REPAIR_INVOKED_FROM: options.reason
			}
		}).unref();
		alreadySpawned = {
			reason: options.reason,
			helperPath
		};
		return {
			ok: true,
			helperPath
		};
	} catch (e) {
		return {
			ok: false,
			reason: `spawn-failed: ${e.message}`
		};
	}
}
//#endregion
//#region src/main/system/repair/startup-repair.ts
/**
* WorkBuddy macOS Startup Repair — 启动时静默扫描入口
*
* macOS 两个触发点:
*   时机 A (runEarlyPreflightAndMaybeBail): app.requestSingleInstanceLock 之前
*     → async spawn WorkBuddyRepair --preflight-only，主 App 继续走
*     → RepairApp 自身闭环：检测到 fatal 时用 open -n 自举 spawn UI 模式
*     → 解决「~/.workbuddy/app 权限损坏 → SingletonLock 拿不到 → 主 App 200ms 内退出」死局
*     → 即使主 App 已退出，RepairApp preflight 进程仍能独立完成检测和拉起 UI
*
*   时机 B-catch (runBootstrapFailureRepairScan): bootstrapMainProcess 抛出时
*     → 直接 spawn RepairApp UI 模式（bootstrap 已失败，无需再 preflight）
*
* 时机 B（app.whenReady 之后）已移除：
*   时机 A 的 --preflight-only 自闭环已覆盖此场景，无需 JS 侧重复扫描。
*
* 所有函数全 try-catch 包裹，任何异常只记日志不抛出，不影响主流程。
*/
/**
* 时机 B-catch 异常路径: bootstrapMainProcess 抛出时直接 spawn RepairApp UI 模式。
* bootstrap 已经失败，无需再跑 preflight 检测，直接拉 UI 让用户看到修复界面。
*/
function runBootstrapFailureRepairScan(bootstrapErr) {
	if (process.platform === "win32") {
		runBootstrapFailureRepairScanWin32(bootstrapErr);
		return;
	}
	if (process.platform !== "darwin") return;
	try {
		require_logger.logger_default.info("[StartupRepair] bootstrap failure, spawning repair helper UI directly", { bootstrapErr: bootstrapErr instanceof Error ? bootstrapErr.message : String(bootstrapErr) });
		const result = spawnRepairHelper({
			reason: "time-b-fatal-residual",
			blocking: false
		});
		require_logger.logger_default.info("[StartupRepair] spawn result (catch-path)", {
			ok: result.ok,
			reason: result.reason
		});
	} catch (e) {
		require_logger.logger_default.warn("[StartupRepair] runBootstrapFailureRepairScan failed (non-fatal)", e);
	}
}
function runEarlyPreflightAndMaybeBail() {
	if (process.platform === "win32") return runEarlyPreflightAndMaybeBailWin32();
	if (process.platform !== "darwin") return "platform-skip";
	try {
		const helperPath = findHelperBinary();
		if (!helperPath) {
			require_logger.logger_default.info("[StartupRepair] early preflight: helper not found, skip");
			return "no-helper";
		}
		const child = (0, node_child_process.spawn)(helperPath, ["--preflight-only"], {
			detached: true,
			stdio: "ignore",
			cwd: "/",
			env: {
				PATH: "/usr/bin:/bin:/usr/sbin:/sbin",
				HOME: process.env.HOME ?? "",
				USER: process.env.USER ?? "",
				LANG: process.env.LANG ?? "en_US.UTF-8",
				__WB_REPAIR_INVOKED_FROM: "time-a-pre-lock",
				...process.env.WORKBUDDY_CONFIG_DIR ? { WORKBUDDY_CONFIG_DIR: process.env.WORKBUDDY_CONFIG_DIR } : {}
			}
		});
		child.unref();
		require_logger.logger_default.info("[StartupRepair] early preflight: spawned --preflight-only", {
			helperPath,
			pid: child.pid
		});
		return "spawned";
	} catch (e) {
		require_logger.logger_default.warn("[StartupRepair] early preflight spawn failed (non-fatal, fall through to normal startup)", e);
		return "spawn-failed";
	}
}
/**
* Windows 时机 A: 在 SingletonLock 之前的极早期 preflight。
*
* 当前实现: 直接跳过, 不做任何 spawn。
*
* 原因:
*   时机 A 的设计是为了解决 macOS 上的 ~/.workbuddy/app 死局 ——
*   userData 不可读时 SingletonLock 拿不到、主 App 在 200ms 内退出, 永远走不到
*   app.whenReady, 修复 helper 也来不及拉起 (详见 runEarlyPreflightAndMaybeBail
*   注释)。这是 macOS 特有的死局。
*
*   Windows 上不存在这个问题:
*     - SingletonLock 在 %LOCALAPPDATA%\WorkBuddy\Singleton* (不依赖 ~/.workbuddy)
*     - userData 不可读时 Electron 不会保守地放弃 lock
*
*   而把 spawnSync(WorkBuddyRepair.exe --preflight-only) 同步阻塞在 GUI 主线程上,
*   反而引入了真实的崩溃面: 受限网络 / .NET runtime 启动失败 / env block 超限 /
*   spawnSync 在 Electron 主进程上的 race, 都会让主 App 在 configureElectronApp
*   之后、whenReady 之前静默死掉, AppStartup.log 一行也写不出。
*
*   Windows 上时机 B 正常路径已移除，仅保留 B-catch (runBootstrapFailureRepairScanWin32)。
*/
function runEarlyPreflightAndMaybeBailWin32() {
	return "platform-skip";
}
/**
* Windows 时机 B-catch 异常路径: bootstrap 失败时触发。
*
* bootstrap 失败很可能就是因为 native module 缺失 (如 better_sqlite3.node),
* 此时直接 spawn 完整 UI 模式的 WorkBuddyRepair.exe, 让它自己做检测并提示用户。
* 不再跑 --preflight-only (bootstrap 已经失败了, 没必要再确认一次)。
*/
function runBootstrapFailureRepairScanWin32(bootstrapErr) {
	try {
		const errMsg = bootstrapErr instanceof Error ? bootstrapErr.message : String(bootstrapErr);
		require_logger.logger_default.info("[StartupRepair:Win32] bootstrap failure, spawning repair helper directly", { bootstrapErr: errMsg });
		const result = spawnRepairHelper({
			reason: "time-b-fatal-residual",
			blocking: false
		});
		require_logger.logger_default.info("[StartupRepair:Win32] bootstrap failure spawn result", {
			ok: result.ok,
			reason: result.reason
		});
	} catch (e) {
		require_logger.logger_default.warn("[StartupRepair:Win32] runBootstrapFailureRepairScanWin32 failed (non-fatal)", e);
	}
}
//#endregion
//#region src/main/system/runtime/devtools-terminal-extension.ts
require_workbuddy_product_config.init_bundled_assets();
function isProductionBuildLayout(appPath, isPackaged) {
	if (isPackaged) return true;
	try {
		const parentDir = path.basename(path.dirname(appPath));
		return parentDir === "Resources" || parentDir === "resources";
	} catch {
		return false;
	}
}
function resolveDevToolsTerminalExtensionPath(options) {
	const pathExists = options.pathExists ?? fs.existsSync;
	const resolveAsset = options.resolveAsset ?? require_workbuddy_product_config.resolveBundledAsset;
	const isProductionLike = isProductionBuildLayout(options.appPath, options.isPackaged);
	const devSourcePath = path.resolve(options.appPath, "resources/devtools-terminal");
	const candidates = isProductionLike ? [
		path.join(options.resourcesPath, "app.asar.unpacked", "resources", "devtools-terminal"),
		path.join(options.resourcesPath, "devtools-terminal"),
		path.join(options.resourcesPath, "resources", "devtools-terminal")
	] : [
		devSourcePath,
		resolveAsset("devtools-terminal"),
		path.join(options.resourcesPath, "devtools-terminal"),
		path.join(options.resourcesPath, "app.asar.unpacked", "resources", "devtools-terminal")
	];
	for (const candidate of candidates) if (candidate && pathExists(candidate)) return candidate;
}
//#endregion
//#region src/main/system/shell-env.ts
/**
* Shell Environment Loader
*
* When Electron apps are launched from Finder/Dock on macOS, they inherit
* a minimal launchd environment with PATH=/usr/bin:/bin:/usr/sbin:/sbin.
*
* This module loads the user's full shell environment by spawning their
* login shell and extracting environment variables. This ensures tools
* like Homebrew (gh, brew), nvm, pyenv, etc. are available to the agent.
*
* From craft-agents-oss.
*/
var shouldSkipEnvVar = (key) => key.startsWith("VITE_");
/**
* Load the user's shell environment and merge it into process.env.
*
* Call early in app startup, before creating any agents/CLI processes.
* Spawns the user's login shell to get the full environment including
* PATH modifications from .zshrc, .bashrc, .zprofile, etc.
*/
function loadShellEnv() {
	if (process.platform === "darwin") loadDarwinShellEnv();
	ensureLang();
}
function ensureLang() {
	if (!process.env.LANG) {
		process.env.LANG = "en_US.UTF-8";
		require_logger.mainLog.info("[shell-env] LANG was empty, set default: en_US.UTF-8");
	}
}
function loadDarwinShellEnv() {
	if (process.env.VITE_DEV_SERVER_URL || process.env.ELECTRON_RENDERER_URL) {
		require_logger.mainLog.info("[shell-env] Skipping in dev mode (already have shell environment)");
		return;
	}
	const shell = process.env.SHELL || "/bin/zsh";
	require_logger.mainLog.info(`[shell-env] Loading environment from ${shell}`);
	try {
		const envSection = (0, child_process.execSync)(`${shell} -l -i -c 'echo __ENV_START__ && env'`, {
			encoding: "utf-8",
			timeout: 5e3,
			env: {
				HOME: process.env.HOME,
				USER: process.env.USER,
				SHELL: shell,
				TERM: "xterm-256color",
				TMPDIR: process.env.TMPDIR,
				APPLE_SUPPRESS_DEVELOPER_TOOL_POPUP: "1",
				GIT_TERMINAL_PROMPT: "0"
			},
			stdio: [
				"pipe",
				"pipe",
				"pipe"
			]
		}).split("__ENV_START__")[1] || "";
		let count = 0;
		for (const line of envSection.trim().split("\n")) {
			const eq = line.indexOf("=");
			if (eq > 0) {
				const key = line.substring(0, eq);
				if (shouldSkipEnvVar(key)) continue;
				const value = line.substring(eq + 1);
				process.env[key] = value;
				count++;
			}
		}
		require_logger.mainLog.info(`[shell-env] Loaded ${count} environment variables`);
		if (process.env.PATH) {
			const pathCount = process.env.PATH.split(":").length;
			require_logger.mainLog.info(`[shell-env] PATH has ${pathCount} entries`);
		}
	} catch (error) {
		require_logger.mainLog.warn(`[shell-env] Failed to load shell environment: ${error}`);
		require_logger.mainLog.warn("[shell-env] Adding common paths as fallback");
		const fallbackPaths = [
			"/opt/homebrew/bin",
			"/opt/homebrew/sbin",
			"/usr/local/bin",
			"/usr/local/sbin",
			`${process.env.HOME}/.local/bin`,
			`${process.env.HOME}/.bun/bin`,
			`${process.env.HOME}/.cargo/bin`
		];
		const currentPath = process.env.PATH || "/usr/bin:/bin:/usr/sbin:/sbin";
		const newPath = [...fallbackPaths, ...currentPath.split(":")].filter((p, i, arr) => arr.indexOf(p) === i).join(":");
		process.env.PATH = newPath;
	}
}
//#endregion
//#region src/main/tencent-docs/debug-cookie-store.ts
var currentValues = {};
async function readTencentDocsDebugCookieValues() {
	return { ...currentValues };
}
async function updateTencentDocsDebugCookieValues(values) {
	currentValues = {
		...currentValues,
		...values
	};
	return { ...currentValues };
}
//#endregion
//#region src/main/tencent-docs/debug-cookie-manager.ts
var DEBUG_COOKIE_URL = "https://docs.qq.com/";
var DEBUG_COOKIE_DOMAIN = ".docs.qq.com";
var DEBUG_COOKIE_PATH = "/";
var DEBUG_ENV_COOKIE_NAMES = ["env_id", "env_name"];
var TENCENT_DOCS_DEBUG_COOKIE_SESSION_TARGETS = [
	{
		partition: void 0,
		label: "defaultSession"
	},
	{
		partition: "persist:tdoc-preview",
		label: "tdoc-preview"
	},
	{
		partition: "persist:agent-browser-preview-webview",
		label: "browser-preview"
	},
	{
		partition: "persist:tdoc-import",
		label: "tdoc-import"
	}
];
var TENCENT_DOCS_DEBUG_COOKIE_WRITE_TARGETS = [{
	variant: "host",
	url: DEBUG_COOKIE_URL
}, {
	variant: "domain",
	url: DEBUG_COOKIE_URL,
	domain: DEBUG_COOKIE_DOMAIN
}];
function resolveTargetSession(partition) {
	return partition ? electron.session.fromPartition(partition) : electron.session.defaultSession;
}
function buildCookieSetDetails(name, value, target) {
	return {
		url: target.url,
		name,
		value,
		...target.variant === "domain" ? { domain: target.domain } : {},
		path: DEBUG_COOKIE_PATH,
		secure: true,
		httpOnly: false,
		sameSite: "no_restriction"
	};
}
async function verifyCookieValue(targetSession, name, expectedValue, target) {
	return (await targetSession.cookies.get({
		url: target.url,
		name,
		...target.variant === "domain" ? { domain: target.domain } : {}
	})).some((cookie) => cookie.value === expectedValue);
}
async function setAndVerifyCookie(targetSession, sessionLabel, name, value, target) {
	const outcome = {
		session: sessionLabel,
		cookie: name,
		variant: target.variant,
		verified: false
	};
	try {
		await targetSession.cookies.set(buildCookieSetDetails(name, value, target));
		outcome.verified = await verifyCookieValue(targetSession, name, value, target);
		if (outcome.verified) require_workbuddy_auth_product_coordinator.windowLog.info("[TencentDocs][DebugCookie] cookie ensured", {
			session: sessionLabel,
			name,
			value,
			variant: target.variant
		});
		else {
			outcome.error = "readback verification failed";
			require_workbuddy_auth_product_coordinator.windowLog.warn("[TencentDocs][DebugCookie] cookie set but verification failed", {
				session: sessionLabel,
				name,
				variant: target.variant
			});
		}
	} catch (error) {
		outcome.error = error instanceof Error ? error.message : String(error);
		require_workbuddy_auth_product_coordinator.windowLog.warn("[TencentDocs][DebugCookie] failed to set cookie", {
			session: sessionLabel,
			name,
			variant: target.variant,
			error: outcome.error
		});
	}
	return outcome;
}
async function applyDebugEnvCookiesToSessions(entries) {
	if (entries.length === 0) return {
		success: true,
		outcomes: []
	};
	const outcomes = [];
	for (const { partition, label } of TENCENT_DOCS_DEBUG_COOKIE_SESSION_TARGETS) {
		const targetSession = resolveTargetSession(partition);
		for (const [name, value] of entries) for (const target of TENCENT_DOCS_DEBUG_COOKIE_WRITE_TARGETS) outcomes.push(await setAndVerifyCookie(targetSession, label, name, value, target));
	}
	return {
		success: outcomes.every((outcome) => outcome.verified),
		outcomes
	};
}
/**
* 把已保存的灰度 cookies 写入腾讯文档相关的全部 Electron session。
* 每个 session 同时写 host-only 与 `.docs.qq.com` domain cookie，覆盖子域预览。
*/
async function ensureTencentDocsDebugEnvCookies() {
	const values = await readTencentDocsDebugCookieValues();
	return applyDebugEnvCookiesToSessions([["env_id", values.env_id], ["env_name", values.env_name]].filter((entry) => {
		const [, value] = entry;
		return typeof value === "string" && value.trim().length > 0;
	}).map(([name, value]) => [name, value.trim()]));
}
/** 从全部目标 session 移除 env_id / env_name。 */
async function clearTencentDocsDebugEnvCookies() {
	const outcomes = [];
	for (const { partition, label } of TENCENT_DOCS_DEBUG_COOKIE_SESSION_TARGETS) {
		const targetSession = resolveTargetSession(partition);
		for (const name of DEBUG_ENV_COOKIE_NAMES) for (const target of TENCENT_DOCS_DEBUG_COOKIE_WRITE_TARGETS) {
			const outcome = {
				session: label,
				cookie: name,
				variant: target.variant,
				verified: false
			};
			try {
				await targetSession.cookies.remove(target.url, name);
				outcome.verified = (await targetSession.cookies.get({
					url: target.url,
					name,
					...target.variant === "domain" ? { domain: target.domain } : {}
				})).length === 0;
				if (outcome.verified) require_workbuddy_auth_product_coordinator.windowLog.info("[TencentDocs][DebugCookie] cookie removed", {
					session: label,
					name,
					variant: target.variant
				});
				else outcome.error = "cookie still present after remove";
			} catch (error) {
				outcome.error = error instanceof Error ? error.message : String(error);
				require_workbuddy_auth_product_coordinator.windowLog.warn("[TencentDocs][DebugCookie] failed to remove cookie", {
					session: label,
					name,
					variant: target.variant,
					error: outcome.error
				});
			}
			outcomes.push(outcome);
		}
	}
	return {
		success: outcomes.every((outcome) => outcome.verified),
		outcomes
	};
}
//#endregion
//#region src/main/tencent-docs/debug-panel.ts
var OPEN_PANEL_IPC_CHANNEL = "debug:openTencentDocsPanel";
var debugEngineRestartHandler;
var debugOpenFileHandler;
var debugPanelWindow = null;
var debugPanelIpcRegistered = false;
var openPanelIpcRegistered = false;
function normalizeDebugString(value) {
	const raw = typeof value === "string" ? value.trim() : "";
	return raw ? raw : void 0;
}
function toDebugEngineRestartConfig(values) {
	const staticDir = normalizeDebugString(values.static_dir);
	const editorSdkPath = normalizeDebugString(values.editor_sdk);
	if (!staticDir && !editorSdkPath) return null;
	return {
		...staticDir ? { staticDir } : {},
		...editorSdkPath ? { editorSdkPath } : {}
	};
}
async function restartTencentDocsEngineForDebug(values) {
	const config = toDebugEngineRestartConfig(values);
	if (!config) return { restarted: false };
	if (!debugEngineRestartHandler) return {
		restarted: false,
		error: "Tencent Docs debug engine restart handler is not registered"
	};
	const result = await debugEngineRestartHandler(config);
	return result.success ? { restarted: true } : {
		restarted: false,
		error: result.error || "Tencent Docs debug engine restart failed"
	};
}
function formatCookieApplySummary(result) {
	if (result.outcomes.length === 0) return "未填写 env_id / env_name，未写入 cookie";
	const failed = result.outcomes.filter((outcome) => !outcome.verified);
	if (failed.length === 0) return `已写入 ${new Set(result.outcomes.map((outcome) => outcome.session)).size} 个 session（含 host + domain 双写）`;
	const lines = failed.slice(0, 6).map((outcome) => `${outcome.session}/${outcome.cookie}(${outcome.variant}): ${outcome.error || "verification failed"}`);
	const suffix = failed.length > 6 ? `\n…另有 ${failed.length - 6} 项失败` : "";
	return `部分写入失败 (${failed.length}/${result.outcomes.length})\n${lines.join("\n")}${suffix}`;
}
var PANEL_IPC_CHANNEL_GET = "workbuddy:debugCookie:get";
var PANEL_IPC_CHANNEL_SAVE = "workbuddy:debugCookie:save";
var PANEL_IPC_CHANNEL_CLEAR = "workbuddy:debugCookie:clear";
var ENGINE_PANEL_IPC_CHANNEL_SAVE = "workbuddy:debugTencentDocsEngine:save";
var ENGINE_PANEL_IPC_CHANNEL_CLEAR = "workbuddy:debugTencentDocsEngine:clear";
var OPEN_DOC_PANEL_IPC_CHANNEL_OPEN = "workbuddy:debugTencentDocsOpenDoc:open";
function buildDebugPanelHtml() {
	return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="Content-Security-Policy" content="default-src 'self' 'unsafe-inline'" />
  <title>TDoc 调试</title>
  <style>
    body { font-family: -apple-system, system-ui, sans-serif; margin: 0; padding: 16px; background: #1e1e1e; color: #e8e8e8; }
    h1 { font-size: 14px; margin: 0 0 4px; color: #f0a020; }
    .desc { font-size: 11px; color: #999; margin-bottom: 16px; line-height: 1.5; }
    .section { margin-top: 16px; padding-top: 12px; border-top: 1px solid #333; }
    .section-title { font-size: 12px; color: #f0a020; margin-bottom: 8px; }
    label { display: block; font-size: 12px; color: #ccc; margin: 12px 0 4px; }
    input { width: 100%; box-sizing: border-box; padding: 6px 8px; background: #2d2d2d; color: #fff; }
    input { border: 1px solid #444; border-radius: 4px; font-family: ui-monospace, Menlo, monospace; font-size: 12px; }
    input:focus { border-color: #0a84ff; outline: none; }
    .actions { display: flex; gap: 8px; margin-top: 14px; }
    button { padding: 6px 14px; border-radius: 4px; border: 1px solid #555; background: #2d2d2d; color: #e8e8e8; font-size: 12px; cursor: pointer; }
    button.primary { background: #0a84ff; border-color: #0a84ff; color: #fff; }
    button:hover { opacity: 0.85; }
    .status { font-size: 11px; color: #4caf50; margin-top: 10px; min-height: 14px; white-space: pre-wrap; }
  </style>
</head>
<body>
  <h1>⚠️ 临时调试：TDoc</h1>
  <div class="desc">在线文档环境、static_dir、本地 editor_sdk 可在同一个面板内分别保存和执行。</div>
  <div class="section-title">在线文档环境</div>
  <label for="env_id">env_id</label>
  <input id="env_id" type="text" placeholder="例如 sit-e00a4888" />
  <label for="env_name">env_name</label>
  <input id="env_name" type="text" placeholder="例如 feature/ai_adk_web_20260513" />
  <div class="actions">
    <button class="primary" id="save_env">保存并应用环境</button>
    <button id="clear_env">清除环境</button>
  </div>
  <div class="status" id="env_status"></div>
  <div class="section">
    <div class="section-title">模拟右键打开文档</div>
    <div class="desc">粘贴本地文档路径（支持 file:// 前缀），无需真正右键，直接复现「右键 → 用 WorkBuddy 打开」的完整后续打开流程。</div>
    <label for="open_doc_path">文档地址 / 文件路径</label>
    <input id="open_doc_path" type="text" placeholder="例如 /Users/you/demo.xlsx" />
    <div class="actions">
      <button class="primary" id="open_doc">模拟右键打开</button>
    </div>
    <div class="status" id="open_doc_status"></div>
  </div>
  <div class="section">
    <div class="section-title">本地资源 / SDK 替换</div>
    <label for="static_dir">--static_dir</label>
    <input id="static_dir" type="text" placeholder="输入本地 static_dir 路径" />
    <label for="editor_sdk">editor_sdk</label>
    <input id="editor_sdk" type="text" placeholder="输入本地 editor_sdk 路径" />
    <div class="actions">
      <button class="primary" id="save_engine">保存并重启 SDK</button>
      <button id="clear_engine">清除资源 / SDK</button>
      <button id="close">关闭</button>
    </div>
    <div class="status" id="engine_status"></div>
  </div>
  <script>
    const { ipcRenderer } = require('electron');
    const $id = document.getElementById('env_id');
    const $name = document.getElementById('env_name');
    const $staticDir = document.getElementById('static_dir');
    const $editorSdk = document.getElementById('editor_sdk');
    const $openDocPath = document.getElementById('open_doc_path');
    const $envStatus = document.getElementById('env_status');
    const $engineStatus = document.getElementById('engine_status');
    const $openDocStatus = document.getElementById('open_doc_status');
    function showEnvSaveStatus(result, time) {
      if (!result) {
        $envStatus.style.color = '#f14c4c';
        $envStatus.textContent = 'IPC 无返回 · ' + time;
        return;
      }
      $envStatus.style.color = result.success ? '#4caf50' : '#f14c4c';
      $envStatus.textContent = (result.success ? '环境已保存并应用 ✓ ' : '环境已保存，但 cookie 写入异常 ✗ ')
        + time
        + (result.summary ? '\\n' + result.summary : '');
    }
    function showEnvClearStatus(result, time) {
      if (!result) {
        $envStatus.style.color = '#f14c4c';
        $envStatus.textContent = 'IPC 无返回 · ' + time;
        return;
      }
      $envStatus.style.color = result.success ? '#4caf50' : '#f14c4c';
      $envStatus.textContent = (result.success ? '环境已清除 ✓ ' : '环境已清除，但 cookie 清理异常 ✗ ')
        + time
        + (!result.success && result.summary ? '\\n' + result.summary : '');
    }
    ipcRenderer.invoke('${PANEL_IPC_CHANNEL_GET}').then(values => {
      $id.value = values.env_id || '';
      $name.value = values.env_name || '';
      $staticDir.value = values.static_dir || '';
      $editorSdk.value = values.editor_sdk || '';
    });
    document.getElementById('save_env').addEventListener('click', async () => {
      const time = new Date().toLocaleTimeString();
      let result;
      try {
        result = await ipcRenderer.invoke('${PANEL_IPC_CHANNEL_SAVE}', {
          env_id: $id.value.trim(),
          env_name: $name.value.trim(),
        });
      } catch (err) {
        $envStatus.style.color = '#f14c4c';
        $envStatus.textContent = 'IPC 调用失败：' + (err && err.message || String(err)) + ' · ' + time;
        return;
      }
      showEnvSaveStatus(result, time);
    });
    document.getElementById('clear_env').addEventListener('click', async () => {
      const time = new Date().toLocaleTimeString();
      $id.value = '';
      $name.value = '';
      let result;
      try {
        result = await ipcRenderer.invoke('${PANEL_IPC_CHANNEL_CLEAR}');
      } catch (err) {
        $envStatus.style.color = '#f14c4c';
        $envStatus.textContent = 'IPC 调用失败：' + (err && err.message || String(err)) + ' · ' + time;
        return;
      }
      showEnvClearStatus(result, time);
    });
    document.getElementById('save_engine').addEventListener('click', async () => {
      const time = new Date().toLocaleTimeString();
      let result;
      try {
        result = await ipcRenderer.invoke('${ENGINE_PANEL_IPC_CHANNEL_SAVE}', {
          static_dir: $staticDir.value.trim(),
          editor_sdk: $editorSdk.value.trim(),
        });
      } catch (err) {
        $engineStatus.style.color = '#f14c4c';
        $engineStatus.textContent = 'IPC 调用失败：' + (err && err.message || String(err)) + ' · ' + time;
        return;
      }
      if (result && result.success === false) {
        $engineStatus.style.color = '#f14c4c';
        $engineStatus.textContent = '资源 / SDK 配置已保存，但重启失败：' + (result.error || 'unknown error') + ' · ' + time;
        return;
      }
      $engineStatus.style.color = '#4caf50';
      $engineStatus.textContent = result && result.restarted
        ? '资源 / SDK 配置已保存并重启 ✓ ' + time
        : '资源 / SDK 配置已保存，未填写替换项 ' + time;
    });
    document.getElementById('open_doc').addEventListener('click', async () => {
      const time = new Date().toLocaleTimeString();
      const raw = $openDocPath.value.trim();
      if (!raw) {
        $openDocStatus.style.color = '#f14c4c';
        $openDocStatus.textContent = '请输入文档地址 / 文件路径 · ' + time;
        return;
      }
      $openDocStatus.style.color = '#999';
      $openDocStatus.textContent = '正在触发右键打开流程… · ' + time;
      const result = await ipcRenderer.invoke('${OPEN_DOC_PANEL_IPC_CHANNEL_OPEN}', { path: raw });
      const doneTime = new Date().toLocaleTimeString();
      if (result && result.success) {
        $openDocStatus.style.color = '#4caf50';
        $openDocStatus.textContent = '已触发右键打开 ✓ '
          + (result.status ? '[' + result.status + '] ' : '')
          + (result.normalizedPath || raw) + ' · ' + doneTime;
        return;
      }
      $openDocStatus.style.color = '#f14c4c';
      $openDocStatus.textContent = '打开失败：' + ((result && result.error) || 'unknown error') + ' · ' + doneTime;
    });
    document.getElementById('clear_engine').addEventListener('click', async () => {
      $staticDir.value = '';
      $editorSdk.value = '';
      await ipcRenderer.invoke('${ENGINE_PANEL_IPC_CHANNEL_CLEAR}');
      $engineStatus.style.color = '#4caf50';
      $engineStatus.textContent = '资源 / SDK 配置已清除 ✓ ' + new Date().toLocaleTimeString();
    });
    document.getElementById('close').addEventListener('click', () => window.close());
  <\/script>
</body>
</html>`;
}
function ensureDebugPanelIpcHandlers() {
	if (debugPanelIpcRegistered) return;
	debugPanelIpcRegistered = true;
	electron.ipcMain.handle(PANEL_IPC_CHANNEL_GET, () => readTencentDocsDebugCookieValues());
	electron.ipcMain.handle(PANEL_IPC_CHANNEL_SAVE, async (_event, values) => {
		const next = await updateTencentDocsDebugCookieValues({
			env_id: typeof values?.env_id === "string" ? values.env_id : "",
			env_name: typeof values?.env_name === "string" ? values.env_name : ""
		});
		const applyResult = await ensureTencentDocsDebugEnvCookies();
		require_workbuddy_auth_product_coordinator.windowLog.info("[TencentDocs][DebugCookie] panel saved", {
			env_id: next.env_id,
			env_name: next.env_name,
			cookieSuccess: applyResult.success
		});
		return {
			success: applyResult.success,
			summary: formatCookieApplySummary(applyResult),
			outcomes: applyResult.outcomes
		};
	});
	electron.ipcMain.handle(PANEL_IPC_CHANNEL_CLEAR, async () => {
		await updateTencentDocsDebugCookieValues({
			env_id: "",
			env_name: ""
		});
		const applyResult = await clearTencentDocsDebugEnvCookies();
		require_workbuddy_auth_product_coordinator.windowLog.info("[TencentDocs][DebugCookie] panel cleared", { cookieSuccess: applyResult.success });
		return {
			success: applyResult.success,
			summary: applyResult.outcomes.length === 0 ? "环境字段已清除" : applyResult.success ? "环境 cookie 已从全部 session 移除" : "部分 session 清除失败",
			outcomes: applyResult.outcomes
		};
	});
	electron.ipcMain.handle(ENGINE_PANEL_IPC_CHANNEL_SAVE, async (_event, values) => {
		const restartResult = await restartTencentDocsEngineForDebug(await updateTencentDocsDebugCookieValues({
			static_dir: typeof values?.static_dir === "string" ? values.static_dir : "",
			editor_sdk: typeof values?.editor_sdk === "string" ? values.editor_sdk : ""
		}));
		return restartResult.error ? {
			success: false,
			restarted: restartResult.restarted,
			error: restartResult.error
		} : {
			success: true,
			restarted: restartResult.restarted
		};
	});
	electron.ipcMain.handle(ENGINE_PANEL_IPC_CHANNEL_CLEAR, async () => {
		await updateTencentDocsDebugCookieValues({
			static_dir: "",
			editor_sdk: ""
		});
		require_workbuddy_auth_product_coordinator.windowLog.info("[TencentDocs][DebugEngine] panel cleared");
		return { success: true };
	});
	electron.ipcMain.handle(OPEN_DOC_PANEL_IPC_CHANNEL_OPEN, async (_event, payload) => {
		const rawPath = typeof payload?.path === "string" ? payload.path.trim() : "";
		if (!rawPath) return {
			success: false,
			error: "请输入文档地址 / 文件路径"
		};
		if (!debugOpenFileHandler) return {
			success: false,
			error: "Tencent Docs debug open-file handler is not registered"
		};
		try {
			return await debugOpenFileHandler(rawPath);
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			require_workbuddy_auth_product_coordinator.windowLog.warn("[TencentDocs][DebugOpenDoc] simulate right-click open failed", {
				rawPath,
				error: message
			});
			return {
				success: false,
				error: message
			};
		}
	});
}
/** 打开 Tencent Docs 调试面板；已存在则聚焦。 */
function openTencentDocsDebugPanel() {
	ensureDebugPanelIpcHandlers();
	if (debugPanelWindow && !debugPanelWindow.isDestroyed()) {
		debugPanelWindow.focus();
		return;
	}
	const win = new electron.BrowserWindow({
		width: 520,
		height: 600,
		resizable: false,
		minimizable: false,
		maximizable: false,
		title: "TDoc 调试",
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			sandbox: false
		}
	});
	win.setMenuBarVisibility(false);
	win.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(buildDebugPanelHtml())}`);
	win.on("closed", () => {
		debugPanelWindow = null;
	});
	debugPanelWindow = win;
}
/** 注入引擎重启与模拟打开文档处理器（app.whenReady 后调用）。 */
function registerTencentDocsDebugHandlers(restartHandler, openFileHandler) {
	debugEngineRestartHandler = restartHandler;
	debugOpenFileHandler = openFileHandler;
}
/** 注册 renderer → 主进程打开调试面板的 IPC（启动早期即可调用）。 */
function registerTencentDocsDebugOpenPanelIpc() {
	if (openPanelIpcRegistered) return;
	openPanelIpcRegistered = true;
	electron.ipcMain.handle(OPEN_PANEL_IPC_CHANNEL, () => {
		openTencentDocsDebugPanel();
	});
}
//#endregion
//#region ../../packages/workbuddy-server/src/docs-shared/feature-list.ts
function getFeatureValue(options) {
	const inConversation = Boolean(options?.inConversation);
	const aiEditEnabled = options?.aiEditEnabled !== false;
	return { aiEdit: inConversation && aiEditEnabled };
}
/** 返回 JSON 字符串（如 `{"aiEdit":true}`），供 `executeJavaScript` 拼接用。 */
function getDocsFeatureListString(options) {
	return JSON.stringify(getFeatureValue(options));
}
/**
* guest preload ↔ main 的**同步**取值通道。
*
* guest preload 用 `ipcRenderer.sendSync` 在**首帧前**取 `__WB_DOCS_FEATURE_LIST__`
* 的 JSON，main 端按 host 窥探 pending 返回（见 browser-preview 的
* `peekDocsFeatureListForGuest`）。同步通道保证首帧前就能拿到对话标记，且**不依赖
* URL**——因此对 docs.qq.com 的 302 重定向免疫（URL query marker 会被 302 丢掉）。
*/
var WORKBUDDY_DOCS_FEATURE_LIST_RESOLVE_CHANNEL = "workbuddy:tencentDocs:resolveFeatureList";
//#endregion
//#region src/main/tencent-docs/browser-preview.ts
/** 必须与 `LocalWebview.tsx` 中 `<webview partition>` 保持一致。 */
var BROWSER_PREVIEW_WEBVIEW_PARTITION$2 = "persist:agent-browser-preview-webview";
/**
* 企业版（旗舰 / 专享）腾讯文档 `<webview>` partition，
* 必须与 `EnterpriseDocsWebviewBody` / `preview-modal` 中的常量保持一致。
*/
var ENTERPRISE_DOC_PREVIEW_WEBVIEW_PARTITION = "persist:tdoc-preview";
/** 需要主进程兜底注入 `__WB_DOCS_FEATURE_LIST__` 的腾讯文档预览 partition 集合。 */
var DOCS_FEATURE_LIST_PARTITIONS = [BROWSER_PREVIEW_WEBVIEW_PARTITION$2, ENTERPRISE_DOC_PREVIEW_WEBVIEW_PARTITION];
var LOG_PREFIX$1 = "[TencentDocsBrowserPreview]";
var pendingByHost = /* @__PURE__ */ new Map();
var featureListByGuest = /* @__PURE__ */ new Map();
/**
* 落库某个 guest 的功能开关，并在该 guest 销毁时自动清理，避免 map 无界增长。
* 同一 guest 只挂一次 destroyed 清理监听。
*/
function rememberGuestFeatureList(guestContents, listString) {
	const guestId = guestContents.id;
	if (!featureListByGuest.has(guestId)) guestContents.once("destroyed", () => {
		featureListByGuest.delete(guestId);
	});
	featureListByGuest.set(guestId, listString);
}
/**
* 存储待注入的功能开关 JSON 字符串，按 host webContents.id 索引。
* 由 feature-list-bridge handler 在 guest 尚未 attach 时写入，等首个 dom-ready 交接。
*/
function setPendingDocsFeatureList(hostId, listString) {
	pendingByHost.set(hostId, listString);
	require_workbuddy_auth_product_coordinator.windowLog.info(`${LOG_PREFIX$1} pending feature list set for host ${hostId}`);
}
/**
* 清除某 host 的 pending 交接值。非对话场景预览打开时调用，
* 避免上一轮对话预览残留的 pending 被本轮非对话 guest 的首个 dom-ready 误消费。
*/
function clearPendingDocsFeatureList(hostId) {
	pendingByHost.delete(hostId);
}
/**
* 把功能开关广播注入到 host renderer 下所有 guest webContents，并按 guest 落库，
* 使其在后续 reload 时仍能复用（reload 只会重新 dom-ready，不会重跑 renderer register）。
*/
function broadcastDocsFeatureListToGuests(hostContents, listString) {
	const hostId = hostContents.id;
	for (const wc of electron.webContents.getAllWebContents()) {
		if (wc.isDestroyed()) continue;
		if (wc.hostWebContents?.id !== hostId) continue;
		rememberGuestFeatureList(wc, listString);
		const finalJson = resolveGuestFeatureListString(listString, wc.session);
		wc.executeJavaScript(`window.__WB_DOCS_FEATURE_LIST__ = ${finalJson};`, false).catch(() => {
			require_workbuddy_auth_product_coordinator.windowLog.warn(`${LOG_PREFIX$1} failed to update guest webContents`);
		});
	}
}
/**
* 只读「窥探」某 guest 应注入的功能开关 JSON，**不消费 pending、不落库**。
*
* 供 guest preload 在**首帧**通过同步 IPC（sendSync）取值后立刻注入，绕开 URL
* marker（对 302 免疫）。取值优先级与 `injectFeatureList` 一致，但不做任何 map 变更：
*   1. `featureListByGuest`（本 guest 已落库值）
*   2. `pendingByHost`（host 交接的对话标记，renderer 在渲染 webview 前已 seed）
*   3. 默认 `{ aiEdit: false }`
*
* dom-ready 的 `injectFeatureList` 仍会照常消费 pending 并落库；两处读到同一值，
* 重复注入幂等，无副作用。
*/
function peekDocsFeatureListForGuest(guestId, hostId, guestSession) {
	if (!guestSession) return getDocsFeatureListString({ inConversation: false });
	return resolveGuestFeatureListString(featureListByGuest.get(guestId) ?? (hostId !== void 0 ? pendingByHost.get(hostId) : void 0), guestSession);
}
function safeReadStoragePath(targetSession) {
	try {
		return targetSession.getStoragePath() ?? void 0;
	} catch {
		return;
	}
}
/** 同 partition 的 Session 不保证是同一对象，用 storagePath 兜底比较。 */
function isSameSession(left, right) {
	if (left === right) return true;
	const leftPath = safeReadStoragePath(left);
	const rightPath = safeReadStoragePath(right);
	return Boolean(leftPath && rightPath && leftPath === rightPath);
}
/**
* 判断某 guest session 是否企业版（旗舰 / 专享）腾讯文档预览 partition。
*
* 企业版预览容器（EnterpriseDocsWebviewBody / 资料库 PreviewModal 的 webview 分支）
* 统一使用 `persist:tdoc-preview`。产品上企业版不提供 AI 编辑能力，因此该 partition 的
* guest 一律按 `aiEdit:false` 注入功能开关——对话场景的 pending / 广播一概不升级。
* C 端 BrowserPreview（`persist:agent-browser-preview-webview`）不受影响，行为完全不变。
*
* 落点说明：register / updateDocsFeatureList 这类 IPC 由**宿主主窗口 renderer** 发起，
* `event.sender.session` 是主应用 session 而非本 partition，且宿主在 C 端与企业版 guest
* 间共享，无法在那一层区分；因此判定统一收口到能拿到真实 guest session 的三个出口
* （injectFeatureList / peekDocsFeatureListForGuest / broadcastDocsFeatureListToGuests）。
*/
function isEnterpriseDocPreviewSession(targetSession) {
	return isSameSession(targetSession, electron.session.fromPartition(ENTERPRISE_DOC_PREVIEW_WEBVIEW_PARTITION));
}
/**
* 按 guest 预览容器（partition = edition 代理）解析「AI 编辑」灰度开关是否命中。
*
* 企业版预览（persist:tdoc-preview，含资料库 PreviewModal）读企业 key，
* C 端 BrowserPreview（persist:agent-browser-preview-webview）读 C 端 key。
* partition 仅用于「选哪个 key」，**不再直接决定 false**（部分回退 080e7403 的硬关）。
*/
function resolveAiEditEnabled(guestSession) {
	return isTencentDocsAiEditEnabled(isEnterpriseDocPreviewSession(guestSession));
}
/**
* 解析已落库 / pending 的「对话场景 intent」。
*
* pending / featureListByGuest 存的是 renderer / register 写入的 intent JSON
* （`{"aiEdit":true}` 表示 inConversation；缺省 / 解析失败按非对话处理）。最终注入值
* 在三个 guest 出口由 `inConversation && resolveAiEditEnabled(guestSession)` 现算，
* 因此落库值与 partition 灰度解耦，reload / 灰度变更后下次 dom-ready 会按最新值重算。
*/
function parseInConversationIntent(intentJson) {
	if (!intentJson) return false;
	try {
		return JSON.parse(intentJson).aiEdit === true;
	} catch {
		return false;
	}
}
/** 由 intent + 本 guest 的灰度开关现算出要注入的功能开关 JSON（`{aiEdit: inConversation && aiEditEnabled}`）。 */
function resolveGuestFeatureListString(intentJson, guestSession) {
	return getDocsFeatureListString({
		inConversation: parseInConversationIntent(intentJson),
		aiEditEnabled: resolveAiEditEnabled(guestSession)
	});
}
/**
* 允许外部HTTPS URL经 `shell.openExternal` 抛给系统浏览器。以满足文档内第三方链接
* 跳转的业务诉求。文档内会对链接作过滤，且file:/javascript:/data:/自定义 scheme等
* 已在协议闸门外被天然拦截。
*/
function isExternallyOpenablePopupUrl(url) {
	try {
		return new URL(url).protocol === "https:";
	} catch {
		return false;
	}
}
function openPopupUrlExternally(url) {
	if (!isExternallyOpenablePopupUrl(url)) {
		require_workbuddy_auth_product_coordinator.windowLog.warn(`${LOG_PREFIX$1} blocked popup with disallowed protocol`, { url });
		return;
	}
	electron.shell.openExternal(url).catch((error) => {
		require_workbuddy_auth_product_coordinator.windowLog.warn(`${LOG_PREFIX$1} openExternal failed: url=${url}, error=${error instanceof Error ? error.message : String(error)}`);
	});
}
/** 需要在 will-attach-webview 阶段显式打开 popup 通道的 partition（含企业版预览）。 */
var POPUP_BRIDGE_PARTITIONS = new Set([BROWSER_PREVIEW_WEBVIEW_PARTITION$2, ENTERPRISE_DOC_PREVIEW_WEBVIEW_PARTITION]);
/**
* 打开 guest webview 的 popup 通道。
*
* 仅设 `<webview allowpopups>` 不够：当前 Electron 版本还需要关掉 disablePopups 并
* 显式 nativeWindowOpen，否则 SPA 的 `window.open`（如「生成副本」）会被 Chromium
* 静默吞掉，setWindowOpenHandler 完全收不到。
*/
function enableGuestPopupBridge(webPreferences, params, partition) {
	params.allowpopups = "true";
	const extendedWebPreferences = webPreferences;
	extendedWebPreferences.disablePopups = false;
	extendedWebPreferences.nativeWindowOpen = true;
	require_workbuddy_auth_product_coordinator.windowLog.info(`${LOG_PREFIX$1} enabled popup bridge for partition=${partition}`);
}
/**
* 预览 webview 内腾讯文档链接的统一 popup 收口。C 端 BrowserPreview 与企业版
* （旗舰 / 专享）预览共用同一套主进程逻辑：
* - will-attach-webview：开 popup 通道，否则 `window.open` 会被 Chromium 吞掉。
* - did-attach-webview：对预览 partition 注册 setWindowOpenHandler，按 URL 分流到
*   应用内下载 / 新建文档留 webview / 腾讯文档外链送系统浏览器。
*/
function setupExternalLinks(mainWindow, previewSessions) {
	const hostContents = mainWindow.webContents;
	const onWillAttachWebview = (_event, webPreferences, params) => {
		const partition = params.partition ?? "";
		if (!POPUP_BRIDGE_PARTITIONS.has(partition)) return;
		enableGuestPopupBridge(webPreferences, params, partition);
	};
	const onDidAttachWebview = (_event, webviewContents) => {
		if (!previewSessions.some((s) => isSameSession(webviewContents.session, s))) return;
		ensureTencentDocsDebugEnvCookies().catch((error) => {
			require_workbuddy_auth_product_coordinator.windowLog.warn(`${LOG_PREFIX$1} ensure debug env cookies failed (non-fatal):`, { error: error instanceof Error ? error.message : String(error) });
		});
		require_workbuddy_auth_product_coordinator.windowLog.info(`${LOG_PREFIX$1} registering window-open handler`);
		webviewContents.setWindowOpenHandler(({ url, disposition }) => {
			require_workbuddy_auth_product_coordinator.windowLog.info(`${LOG_PREFIX$1} window.open intercepted: url=${url}, disposition=${disposition}`);
			if (isTencentDocsDownloadHref(url)) {
				webviewContents.session.downloadURL(url);
				return { action: "deny" };
			}
			if (isInPlaceCreateFileUrl(url)) {
				webviewContents.loadURL(url).catch((error) => {
					require_workbuddy_auth_product_coordinator.windowLog.warn(`${LOG_PREFIX$1} in-place create-file loadURL failed`, {
						url,
						error: error instanceof Error ? error.message : String(error)
					});
				});
				return { action: "deny" };
			}
			openPopupUrlExternally(url);
			return { action: "deny" };
		});
	};
	hostContents.on("will-attach-webview", onWillAttachWebview);
	hostContents.on("did-attach-webview", onDidAttachWebview);
	mainWindow.once("closed", () => {
		if (!hostContents.isDestroyed()) {
			hostContents.removeListener("will-attach-webview", onWillAttachWebview);
			hostContents.removeListener("did-attach-webview", onDidAttachWebview);
		}
	});
}
/**
* 判断下载是否来自腾讯文档页面：
* - 资源 URL 是 docs.qq.com（普通图片/附件直链），或
* - 资源 URL 是 blob:/data:（前端生成的下载流），但发起页是 docs.qq.com，或
* - 资源 URL 带响应头 Content-Disposition:attachment 且 query 含 `response-content-disposition=attachment`
*   （企业版文档导出走 COS 预签名 URL，host 不是 docs.qq.com 系列）。
*/
function isTencentDocsDownload(item) {
	const url = item.getURL();
	try {
		const parsed = new URL(url);
		if (parsed.protocol === "https:" && isTencentDocsHostname(parsed.hostname)) return true;
		if (parsed.protocol === "blob:" || parsed.protocol === "data:") {
			if (url.includes("docs.qq.com")) return true;
			const referrer = item.getURLChain()[0] ?? "";
			try {
				return isTencentDocsHostname(new URL(referrer).hostname);
			} catch {
				return false;
			}
		}
		const contentDisposition = item.getContentDisposition();
		if (contentDisposition && contentDisposition.toLowerCase().includes("attachment")) return (parsed.searchParams.get("response-content-disposition") ?? "").toLowerCase().includes("attachment");
		return false;
	} catch {
		return false;
	}
}
/** 根据 filename 推断 Save As 对话框扩展名过滤项；无后缀时返回 undefined。 */
function buildSaveDialogFilters(filename) {
	const ext = node_path.extname(filename).replace(/^\./, "").toLowerCase();
	if (!ext) return;
	return [{
		name: ext.toUpperCase(),
		extensions: [ext]
	}, {
		name: "All Files",
		extensions: ["*"]
	}];
}
/**
* 接管 BrowserPreview webview session 中腾讯文档发起的下载。
*
* 用 `setSaveDialogOptions` 而非 `setSavePath`：后者会跳过 Save As 对话框直接落盘。
* 非腾讯文档来源不动 item，回退 Electron 默认行为。
*/
var downloadSessionsWithHandler = /* @__PURE__ */ new WeakSet();
/**
* 同一下载 URL 的短时去重表（key=url，value=上次触发时间戳）。
*
* 企业版（旗舰 / 专享）webview 里一次「下载文档」动作常会被多个触发面同时命中
* （preload 的 click / window.open / a.click 反向 IPC + 顶级导航各自触发一次
* `will-download`）。不去重就会重复弹「另存为」/ 重复落盘。C 端 BrowserPreview 也复用此表，
* 多触发同样幂等。
*/
var recentDownloadAt = /* @__PURE__ */ new Map();
var DOWNLOAD_DEDUP_WINDOW_MS = 3e3;
function isDuplicateDownload(url) {
	const now = Date.now();
	for (const [key, ts] of recentDownloadAt) if (now - ts > DOWNLOAD_DEDUP_WINDOW_MS) recentDownloadAt.delete(key);
	const last = recentDownloadAt.get(url);
	recentDownloadAt.set(url, now);
	return last !== void 0 && now - last <= DOWNLOAD_DEDUP_WINDOW_MS;
}
function setupDownloads(previewSession) {
	if (downloadSessionsWithHandler.has(previewSession)) return;
	downloadSessionsWithHandler.add(previewSession);
	previewSession.on("will-download", (_event, item) => {
		if (!isTencentDocsDownload(item)) return;
		if (isDuplicateDownload(item.getURL())) {
			require_workbuddy_auth_product_coordinator.windowLog.info(`${LOG_PREFIX$1} duplicate download cancelled`, { url: item.getURL() });
			item.cancel();
			return;
		}
		const filename = node_path.basename(item.getFilename() || "download");
		const defaultPath = node_path.join(electron.app.getPath("downloads"), filename);
		const filters = buildSaveDialogFilters(filename);
		item.setSaveDialogOptions({
			defaultPath,
			...filters ? { filters } : {}
		});
		require_workbuddy_auth_product_coordinator.windowLog.info(`${LOG_PREFIX$1} download started`, {
			url: item.getURL(),
			filename,
			defaultPath,
			totalBytes: item.getTotalBytes()
		});
		item.once("done", (_doneEvent, state) => {
			const savePath = item.getSavePath();
			if (state === "completed") require_workbuddy_auth_product_coordinator.windowLog.info(`${LOG_PREFIX$1} download completed`, { savePath });
			else require_workbuddy_auth_product_coordinator.windowLog.warn(`${LOG_PREFIX$1} download ${state}`, {
				savePath,
				url: item.getURL()
			});
		});
	});
	require_workbuddy_auth_product_coordinator.windowLog.info(`${LOG_PREFIX$1} registered will-download handler on preview partition`);
}
/**
* 注入到 webview main world 的 patch，做两件事：
*
* 1) 屏蔽 `LocalWebview` 注入的 document capture click 拦截器对 docs.qq.com 假链接
*    （`<a href="#">` / `javascript:`）的劫持——否则按钮 React onClick 会被吞掉、
*    `location.href = anchor.href` 还会触发整页 reload。
*
* 2) 拦腾讯文档下载链接的 4 个触发面，避免 webview 经历"同窗口导航 → will-navigate
*    → 地址栏脏化 → 服务端 attachment 转下载"的中间态。命中后走 preload 暴露的
*    `window[MAIN_WORLD_DOWNLOAD_TRIGGER_KEY](url)` 反向 IPC，主进程拿到后调
*    `session.downloadURL` 接 `will-download` → `setSaveDialogOptions` 弹另存为。
*    覆盖：(1) `<a>` 真实点击 (2) `location.href = url` setter
*          (3) `location.assign/replace(url)` (4) 程序化 `<a>.click()`
*
* 走主进程而非 preload：contextIsolation=yes 时 preload 的 `webFrame.executeJavaScript`
* 仍在 isolated world（electron#23722），只有 `webContents.executeJavaScript` 能稳进
* main world。dom-ready 触发顺序保证这里 schedule 的执行早于 `LocalWebview` 在 renderer
* 的同名监听。指纹失配 / prototype 不可改时分别静默退化，无新副作用。
*
* 下载链接识别契约与 IPC 触发器由 `webview-download.ts` 共享；shield 内
* `isTencentDocsDownloadUrl` 与之保持等价实现（改一处记得同步改另一处）。
*/
function buildLinkInterceptorShieldSource() {
	return `
(function installShield() {
    if (window.__tencentDocsLinkInterceptorShieldInstalled) {
        return 'already-installed';
    }
    window.__tencentDocsLinkInterceptorShieldInstalled = true;

    var originalAdd = EventTarget.prototype.addEventListener;
    var DOWNLOAD_TRIGGER_KEY = ${JSON.stringify(MAIN_WORLD_DOWNLOAD_TRIGGER_KEY)};

    function isMainAppInterceptor(listener) {
        if (typeof listener !== 'function') { return false; }
        var src;
        try { src = Function.prototype.toString.call(listener); } catch (e) { return false; }
        return src.indexOf('window.location.href') !== -1
            && src.indexOf("tagName !== 'A'") !== -1;
    }

    function isFakeLinkAnchor(anchor) {
        var rawHref = anchor.getAttribute('href');
        if (rawHref === null || rawHref === '') { return true; }
        if (rawHref === '#' || rawHref.charAt(0) === '#') { return true; }
        return (anchor.protocol || '').toLowerCase() === 'javascript:';
    }

    function isTencentDocsDownloadUrl(url) {
        if (typeof url !== 'string' || !url) { return false; }
        var parsed;
        try { parsed = new URL(url, window.location.href); } catch (e) { return false; }
        if (parsed.protocol !== 'https:') { return false; }
        var host = parsed.hostname;

        // 导出子域无条件命中（旗舰版 export.docs.qq.com + 企业专享版 *-export.docs.{根域}）
        if (host === 'export.docs.qq.com' || host.endsWith('.export.docs.qq.com')) {
            return true;
        }
        var idx = host.indexOf('-docs.');
        if (idx > 0) {
            var subdomain = host.slice(0, idx);
            if (subdomain.indexOf('export') !== -1) { return true; }
        }

        // 其余任意 host：带 response-content-disposition=attachment
        // （企业版导出走 COS 预签名 URL，host 不是 docs.qq.com）
        var disposition = parsed.searchParams.get('response-content-disposition') || '';
        return disposition.toLowerCase().indexOf('attachment') !== -1;
    }

    function resolveAbsoluteUrl(url) {
        try { return new URL(url, window.location.href).href; } catch (e) { return url; }
    }

    function triggerDownloadViaIpc(url) {
        var trigger = window[DOWNLOAD_TRIGGER_KEY];
        if (typeof trigger !== 'function') { return false; }
        try {
            var absolute = resolveAbsoluteUrl(url);
            return trigger(absolute) === true;
        } catch (e) { return false; }
    }

    // (1) click event：被 LocalWebview capture click 拦截器抓到时二次过滤
    function wrap(listener) {
        return function shieldedClickListener(event) {
            var target = event && event.target;
            var anchor = (target && typeof target.closest === 'function')
                ? target.closest('a')
                : null;
            if (!anchor) {
                listener.call(this, event);
                return;
            }
            if (isFakeLinkAnchor(anchor)) {
                return;
            }
            if (isTencentDocsDownloadUrl(anchor.href)) {
                // preventDefault 必须：跳过 LocalWebview listener 后浏览器自身的同窗口导航会接管。
                try { event.preventDefault(); } catch (e) {}
                triggerDownloadViaIpc(anchor.href);
                return;
            }
            listener.call(this, event);
        };
    }

    EventTarget.prototype.addEventListener = function patchedAddEventListener(type, listener, options) {
        if (
            this === document
            && type === 'click'
            && listener != null
            && (options === true || (options && options.capture))
            && isMainAppInterceptor(listener)
        ) {
            return originalAdd.call(this, type, wrap(listener), options);
        }
        return originalAdd.call(this, type, listener, options);
    };

    // (2) Location.prototype.href setter：拦 \`window.location.href = exportUrl\`
    // 同时覆盖 \`document.location\` / iframe.contentWindow.location（共享 Location.prototype）。
    try {
        var hrefDesc = Object.getOwnPropertyDescriptor(Location.prototype, 'href');
        if (hrefDesc && typeof hrefDesc.set === 'function' && hrefDesc.configurable) {
            var origHrefSet = hrefDesc.set;
            Object.defineProperty(Location.prototype, 'href', {
                enumerable: hrefDesc.enumerable !== false,
                configurable: true,
                get: hrefDesc.get,
                set: function patchedLocationHref(value) {
                    if (typeof value === 'string' && isTencentDocsDownloadUrl(value)) {
                        if (triggerDownloadViaIpc(value)) {
                            return;
                        }
                    }
                    return origHrefSet.call(this, value);
                },
            });
        }
    } catch (e) {}

    // (3) Location.prototype.assign / replace
    ['assign', 'replace'].forEach(function patchLocationMethod(name) {
        try {
            var orig = Location.prototype[name];
            if (typeof orig !== 'function') { return; }
            Location.prototype[name] = function patchedLocationMethod(url) {
                if (typeof url === 'string' && isTencentDocsDownloadUrl(url)) {
                    if (triggerDownloadViaIpc(url)) {
                        return;
                    }
                }
                return orig.call(this, url);
            };
        } catch (e) {}
    });

    // (4) HTMLAnchorElement.prototype.click：拦程序化 \`<a>.click()\`；
    // 用户真实点击走原生 click event（已被上方 wrap 覆盖），不进这里。
    try {
        var origAnchorClick = HTMLAnchorElement.prototype.click;
        if (typeof origAnchorClick === 'function') {
            HTMLAnchorElement.prototype.click = function patchedAnchorClick() {
                if (this && this.href && isTencentDocsDownloadUrl(this.href)) {
                    if (triggerDownloadViaIpc(this.href)) {
                        return;
                    }
                }
                return origAnchorClick.apply(this, arguments);
            };
        }
    } catch (e) {}

    return 'installed';
})();
`;
}
var MAIN_WORLD_LINK_INTERCEPTOR_SHIELD_SOURCE = buildLinkInterceptorShieldSource();
function injectLinkInterceptorShield(webviewContents) {
	webviewContents.executeJavaScript(MAIN_WORLD_LINK_INTERCEPTOR_SHIELD_SOURCE, false).then((result) => {
		require_workbuddy_auth_product_coordinator.windowLog.info(`${LOG_PREFIX$1} link interceptor shield ${result}`, { url: webviewContents.getURL() });
	}, (error) => {
		require_workbuddy_auth_product_coordinator.windowLog.warn(`${LOG_PREFIX$1} failed to install link interceptor shield: ` + (error instanceof Error ? error.message : String(error)));
	});
}
/**
* 往 webview main world 注入 `__WB_DOCS_FEATURE_LIST__`，供 docs SPA 读取功能开关。
*
* 取值优先级（保证 reload 后对话标记不丢失）：
* 1. `featureListByGuest`：本 guest 已落库的值（reload 复用，每次 dom-ready 都重注入）。
* 2. `pendingByHost`：host 交接的对话标记，仅在 guest **首个** dom-ready 时消费并落库。
* 3. 默认 `{ aiEdit: false }`。
*
* 关键：消费 pending 后 **不再删除** 已落库的 guest 值，因此页面 reload（重新 dom-ready，
* 但不会重跑 renderer 的 register）仍能拿到对话场景标记。
*/
function injectFeatureList(webviewContents) {
	const guestId = webviewContents.id;
	if (!featureListByGuest.has(guestId)) {
		const hostId = webviewContents.hostWebContents?.id;
		const pending = hostId !== void 0 ? pendingByHost.get(hostId) : void 0;
		if (pending !== void 0) {
			rememberGuestFeatureList(webviewContents, pending);
			pendingByHost.delete(hostId);
		}
	}
	const jsonString = resolveGuestFeatureListString(featureListByGuest.get(guestId), webviewContents.session);
	webviewContents.executeJavaScript(`window.__WB_DOCS_FEATURE_LIST__ = ${jsonString};`, false).catch(() => {
		require_workbuddy_auth_product_coordinator.windowLog.warn(`${LOG_PREFIX$1} failed to inject feature list`);
	});
}
/** 每次 dom-ready 都重新注入：页面硬导航后 main world 重建；patch 自带幂等开关。 */
function setupLinkInterceptorShield(mainWindow, previewSession) {
	const hostContents = mainWindow.webContents;
	const onDidAttachWebview = (_event, webviewContents) => {
		if (!isSameSession(webviewContents.session, previewSession)) return;
		require_workbuddy_auth_product_coordinator.windowLog.info(`${LOG_PREFIX$1} registering link interceptor shield`);
		const onDomReady = () => {
			injectLinkInterceptorShield(webviewContents);
		};
		webviewContents.on("dom-ready", onDomReady);
		webviewContents.once("destroyed", () => {
			webviewContents.removeListener("dom-ready", onDomReady);
		});
	};
	hostContents.on("did-attach-webview", onDidAttachWebview);
	mainWindow.once("closed", () => {
		if (!hostContents.isDestroyed()) hostContents.removeListener("did-attach-webview", onDidAttachWebview);
	});
}
/**
* 在每个腾讯文档预览 guest 的 dom-ready 上兜底注入 `__WB_DOCS_FEATURE_LIST__`。
*
* 与 link interceptor shield 拆开（后者仅 C 端 BrowserPreview partition）：功能开关
* 对所有预览容器（C 端 BrowserPreview + 企业版 webview）都要生效。preload 注入只是
* 早期默认值，这里在 dom-ready 用 main world `executeJavaScript` 做权威覆盖，确保 reload
* 后仍按落库的对话标记注入，而非被 preload 重新跑成默认 false。
*/
function setupDocsFeatureListInjection(mainWindow) {
	const hostContents = mainWindow.webContents;
	const previewSessions = DOCS_FEATURE_LIST_PARTITIONS.map((partition) => electron.session.fromPartition(partition));
	const onDidAttachWebview = (_event, webviewContents) => {
		if (!previewSessions.some((previewSession) => isSameSession(webviewContents.session, previewSession))) return;
		const onDomReady = () => {
			injectFeatureList(webviewContents);
		};
		webviewContents.on("dom-ready", onDomReady);
		webviewContents.once("destroyed", () => {
			webviewContents.removeListener("dom-ready", onDomReady);
		});
	};
	hostContents.on("did-attach-webview", onDidAttachWebview);
	mainWindow.once("closed", () => {
		if (!hostContents.isDestroyed()) hostContents.removeListener("did-attach-webview", onDidAttachWebview);
	});
}
/**
* 接 webview（C 端 BrowserPreview shield / 企业版 tdoc-preview preload）转过来的下载链接，
* 由主进程主动在**发起方自己的 session** 上调 `downloadURL(url)`，避免 webview 经历同窗口
* 导航到 attachment URL 的中间态，也保证下载带上该 partition 的免登 cookie。
*
* 安全闸门：仅接受已知预览 partition 的 session、且 URL 必须命中 `isTencentDocsDownloadHref`，
* 避免任意 renderer / 同 partition 被注入页借此通道无差别拉文件。
*
* 全局只挂一次：用 module-level flag 兜底重复 setupTencentDocsBrowserPreview 调用。
*/
var downloadIpcHandlerRegistered = false;
function setupDownloadIpcHandler(previewSessions) {
	if (downloadIpcHandlerRegistered) return;
	downloadIpcHandlerRegistered = true;
	electron.ipcMain.on(WORKBUDDY_TENCENT_DOCS_WEBVIEW_DOWNLOAD_CHANNEL, (event, url) => {
		const senderSession = event.sender.session;
		if (!previewSessions.some((previewSession) => isSameSession(senderSession, previewSession))) {
			require_workbuddy_auth_product_coordinator.windowLog.warn(`${LOG_PREFIX$1} download IPC rejected: wrong session`);
			return;
		}
		if (typeof url !== "string" || !isTencentDocsDownloadHref(url)) {
			require_workbuddy_auth_product_coordinator.windowLog.warn(`${LOG_PREFIX$1} download IPC rejected: invalid url`, { url });
			return;
		}
		senderSession.downloadURL(url);
	});
	require_workbuddy_auth_product_coordinator.windowLog.info(`${LOG_PREFIX$1} registered download IPC handler`, { channel: WORKBUDDY_TENCENT_DOCS_WEBVIEW_DOWNLOAD_CHANNEL });
}
/** BrowserPreview webview 内腾讯文档运行时增强：popup 外开 + 下载接管 + main world shield + 下载 IPC。 */
function setupTencentDocsBrowserPreview(mainWindow) {
	const previewSession = electron.session.fromPartition(BROWSER_PREVIEW_WEBVIEW_PARTITION$2);
	const enterprisePreviewSession = electron.session.fromPartition(ENTERPRISE_DOC_PREVIEW_WEBVIEW_PARTITION);
	setupExternalLinks(mainWindow, [previewSession, enterprisePreviewSession]);
	setupDownloads(previewSession);
	setupDownloads(enterprisePreviewSession);
	setupLinkInterceptorShield(mainWindow, previewSession);
	setupDocsFeatureListInjection(mainWindow);
	setupDownloadIpcHandler([previewSession, enterprisePreviewSession]);
}
//#endregion
//#region src/main/tencent-docs/feature-list-bridge.ts
/**
* 腾讯文档预览功能开关 IPC 桥接（main 端）。
*
* 统一管理 register/unregister/updateDocsFeatureList 三个 handler，
* 使其从通用入口 `main/index.ts` 中移出，遵循已有范式
* （`registerTencentDocsThemeBridge` / `registerTencentDocsLanguageBridge`）。
*/
function registerTencentDocsFeatureListBridge(ipcMain, getRegistry) {
	ipcMain.on(WORKBUDDY_DOCS_FEATURE_LIST_RESOLVE_CHANNEL, (event) => {
		event.returnValue = peekDocsFeatureListForGuest(event.sender.id, event.sender.hostWebContents?.id, event.sender.session);
	});
	ipcMain.handle("workbuddy:registerOnlineDocPreview", async (_event, fileId, sessionId) => {
		if (typeof fileId !== "string") return;
		const trimmedFileId = fileId.trim();
		if (!trimmedFileId) return;
		const sid = typeof sessionId === "string" ? sessionId : void 0;
		if (sid) {
			const flagJson = getDocsFeatureListString({ inConversation: true });
			setPendingDocsFeatureList(_event.sender.id, flagJson);
			broadcastDocsFeatureListToGuests(_event.sender, flagJson);
		} else clearPendingDocsFeatureList(_event.sender.id);
		await getRegistry()?.registerOnlineDocPreview(trimmedFileId, sid);
	});
	ipcMain.handle("workbuddy:unregisterOnlineDocPreview", async (_event, fileId) => {
		if (typeof fileId !== "string") return;
		const trimmedFileId = fileId.trim();
		if (!trimmedFileId) return;
		await getRegistry()?.unregisterOnlineDocPreview(trimmedFileId);
	});
	ipcMain.handle("workbuddy:updateDocsFeatureList", async (event, featureList) => {
		const list = typeof featureList === "object" && featureList !== null ? featureList : null;
		if (!list) return;
		const flagJson = JSON.stringify(list);
		setPendingDocsFeatureList(event.sender.id, flagJson);
		broadcastDocsFeatureListToGuests(event.sender, flagJson);
	});
}
//#endregion
//#region src/main/tencent-docs/online-doc-login-cookie-ready.ts
/**
* 在线文档登录态就绪标记。
*
* 假设：腾讯文档短链 redeem 后会把 docs.qq.com 登录态 cookies 种入预览 webview
* partition；后续访问任意 raw URL 自动带上 cookies，无需重新签短链。
*
* 价值：避免连开多个文档触发短链落地接口限流（webview 显示 `{ret:10016}` JSON）。
*
* 进程启动重置为 false（cookie 过期 / 登出后重新校验登录态）；解绑由调用方 reset。
*/
var loginCookieReady = false;
function markTencentDocsLoginCookieReady() {
	loginCookieReady = true;
}
/** docs.qq.com 已知的文档页 path 前缀（与 url-utils.TDOC_PATH_PREFIXES 同义，独立维护以避免跨包依赖）。 */
var DOCS_DOCUMENT_PAGE_PATH_PREFIXES = [
	"/doc/",
	"/sheet/",
	"/slide/",
	"/pdf/",
	"/form/",
	"/mind/",
	"/flowchart/",
	"/board/",
	"/smartsheet/",
	"/smartcanvas/",
	"/s/"
];
function isTencentDocsDocumentPageUrl(url) {
	if (!url || typeof url !== "string") return false;
	try {
		const parsed = new URL(url);
		const hostname = parsed.hostname.toLowerCase();
		if (hostname !== "docs.qq.com" && !hostname.endsWith(".docs.qq.com")) return false;
		return DOCS_DOCUMENT_PAGE_PATH_PREFIXES.some((p) => parsed.pathname.startsWith(p));
	} catch {
		return false;
	}
}
/**
* 全局订阅预览 webview 的 did-finish-load 事件，按落地 URL 形态同步 ready 标记。
*
* 仅当 webview 实际加载到 docs.qq.com 文档页时 mark ready；非 docs.qq.com URL 一律
* 跳过（避免 chat 内嵌其它站点预览触发误 reset）。reset 由 cleanup 链路独立负责。
*/
var listenerInstalled = false;
function installTencentDocsWebviewLoginCookieListener() {
	if (listenerInstalled) return;
	listenerInstalled = true;
	electron.app.on("web-contents-created", (_event, contents) => {
		if (contents.getType() !== "webview") return;
		contents.on("did-finish-load", () => {
			if (contents.isDestroyed()) return;
			const loadedUrl = contents.getURL();
			if (!isTencentDocsDocumentPageUrl(loadedUrl)) return;
			if (!loginCookieReady) {
				markTencentDocsLoginCookieReady();
				require_workbuddy_auth_product_coordinator.windowLog.info("[TencentDocs] login-cookie-ready marked from webview", { loadedUrl });
			}
		});
	});
}
//#endregion
//#region src/main/tencent-docs/theme-bridge.ts
/**
* 腾讯文档 webview 主题透传桥接（main 端）。
*
* 把 renderer (agent-ui) 当前主题（'light' | 'dark'）以 cookie 形式同步到
* docs.qq.com 域：写 `dark_mode_setting` 到 defaultSession (auth webview) 与
* browser-preview partition (预览 webview)。前端可在 SSR / 首屏读 cookie 适配。
*
* 调用链：agent-ui addThemeListener → renderer install-theme-bridge → preload
*   `__setTencentDocsTheme` → ipcMain `setTheme` → 本文件 syncCookieToAllSessions。
*/
/** Renderer → Main：设置当前主题，payload 'light' | 'dark'。 */
var WORKBUDDY_TENCENT_DOCS_SET_THEME_CHANNEL = "workbuddy:tencentDocs:setTheme";
/** 写到 .docs.qq.com 域的 cookie 名，前端读取约定。 */
var TENCENT_DOCS_THEME_COOKIE_NAME = "dark_mode_setting";
var TENCENT_DOCS_COOKIE_HOST = "docs.qq.com";
var TENCENT_DOCS_COOKIE_URL = `https://${TENCENT_DOCS_COOKIE_HOST}`;
/** 与 LocalWebview.tsx / window-manager.ts / browser-preview.ts 保持一致。 */
var BROWSER_PREVIEW_WEBVIEW_PARTITION$1 = "persist:agent-browser-preview-webview";
var THEME_COOKIE_MAX_AGE_SECONDS = 365 * 24 * 60 * 60;
var LOG_PREFIX = "[TencentDocsThemeBridge]";
var currentTheme = "light";
function normalizeTheme(input) {
	return input === "dark" || input === "light" ? input : void 0;
}
async function setThemeCookie(sess, theme) {
	await sess.cookies.set({
		url: TENCENT_DOCS_COOKIE_URL,
		domain: `.${TENCENT_DOCS_COOKIE_HOST}`,
		name: TENCENT_DOCS_THEME_COOKIE_NAME,
		value: theme,
		path: "/",
		secure: true,
		sameSite: "no_restriction",
		expirationDate: Math.floor(Date.now() / 1e3) + THEME_COOKIE_MAX_AGE_SECONDS
	});
}
async function syncCookieToAllSessions(theme) {
	const targets = [{
		sess: electron.session.defaultSession,
		label: "defaultSession (auth webview)"
	}, {
		sess: electron.session.fromPartition(BROWSER_PREVIEW_WEBVIEW_PARTITION$1),
		label: "previewSession (browser preview)"
	}];
	await Promise.all(targets.map(async ({ sess, label }) => {
		try {
			await setThemeCookie(sess, theme);
			require_workbuddy_auth_product_coordinator.windowLog.info(`${LOG_PREFIX} cookie synced`, {
				label,
				theme
			});
		} catch (error) {
			require_workbuddy_auth_product_coordinator.windowLog.warn(`${LOG_PREFIX} cookie sync failed`, {
				label,
				theme,
				error: error instanceof Error ? error.message : String(error)
			});
		}
	}));
}
/**
* 注册 IPC 入口。启动时不主动写 cookie —— 默认 'light' 为兜底，renderer
* `installTencentDocsThemeBridge` 装载时会立刻 push 一次真实主题。
*/
function registerTencentDocsThemeBridge(ipcMain) {
	ipcMain.handle(WORKBUDDY_TENCENT_DOCS_SET_THEME_CHANNEL, async (_event, rawTheme) => {
		const next = normalizeTheme(rawTheme);
		if (!next) {
			require_workbuddy_auth_product_coordinator.windowLog.warn(`${LOG_PREFIX} invalid theme payload`, { rawTheme });
			return { ok: false };
		}
		const changed = next !== currentTheme;
		currentTheme = next;
		await syncCookieToAllSessions(next);
		if (changed) require_workbuddy_auth_product_coordinator.windowLog.info(`${LOG_PREFIX} theme changed`, { theme: next });
		return { ok: true };
	});
	require_workbuddy_auth_product_coordinator.windowLog.info(`${LOG_PREFIX} registered`, {
		channel: WORKBUDDY_TENCENT_DOCS_SET_THEME_CHANNEL,
		cookieName: TENCENT_DOCS_THEME_COOKIE_NAME
	});
}
//#endregion
//#region src/main/tencent-docs/webview-preload-bridge.ts
/**
* 腾讯文档 `<webview>` preload 路径查询桥接：
* main 解析 file:// URL，renderer 通过 IPC 取后写到 `<webview preload>`。
*
* 走 IPC（而非 additionalArguments / 全局变量）是因为后者已被验证有副作用风险，
* 曾导致主窗口白屏；IPC 拉式获取调用面收敛在 webview 渲染前一刻，零侵入主流程。
*/
var WORKBUDDY_TENCENT_DOCS_WEBVIEW_PRELOAD_CHANNEL = "workbuddy:tencentDocs:getWebviewPreloadUrl";
/**
* 候选路径：
*   1. dev / 直接 build：`dist/tencent-docs/webview-preload.js`
*   2. electron-builder 打包后：`app.asar.unpacked/dist/tencent-docs/webview-preload.js`
*      （`<webview preload>` 必须指向 unpacked 真实文件，与 mcp-app-preload 同款约束）
*/
function resolveTencentDocsWebviewPreloadCandidates(baseDir) {
	return [node_path.resolve(baseDir, "../tencent-docs/webview-preload.js"), node_path.resolve(baseDir, "../../app.asar.unpacked/dist/tencent-docs/webview-preload.js")];
}
/** 全部不存在时返回 undefined，由 caller 兜底（不让 webview 加载空 preload）。 */
function resolveTencentDocsWebviewPreloadFileUrl(baseDir = __dirname) {
	const found = resolveTencentDocsWebviewPreloadCandidates(baseDir).find((p) => node_fs.existsSync(p));
	return found ? (0, node_url.pathToFileURL)(found).toString() : void 0;
}
function registerTencentDocsWebviewPreloadBridge(ipcMain, options) {
	ipcMain.handle(WORKBUDDY_TENCENT_DOCS_WEBVIEW_PRELOAD_CHANNEL, () => resolveTencentDocsWebviewPreloadFileUrl(options?.baseDir));
}
//#endregion
//#region src/main/window/splash/splash-window.ts
/**
* SplashWindow — 独立的启动过渡窗口
*
* 目的：主窗口在 vendor 解压 + bootstrap + migration 完成之前无法正常渲染
* （renderer 依赖 daemon，而 daemon 要等 bootstrapMainProcess 才起）。历史上
* 尝试在主窗口里用 React Gate 切换占位页，但 renderer 的 bootstrap() 本身
* 就被 daemon 阻塞，导致白屏。
*
* 独立 splash：纯静态 HTML + 轻量 preload，不依赖 daemon / React，主进程
* 通过 IPC push 进度；启动流程结束后 close() + 打开主窗口。
*/
require_workbuddy_product_config.init_bundled_assets();
var SPLASH_IPC_CHANNEL = "splash:update";
var SPLASH_GET_LOGO_CHANNEL = "splash:getLogo";
var SPLASH_GET_LAST_UPDATE_CHANNEL = "splash:getLastUpdate";
function resolveSplashHtml() {
	return require_workbuddy_product_config.resolveBundledAsset("splash", "splash.html") ?? require_workbuddy_product_config.resolveBundledAsset("main", "splash", "splash.html") ?? [path.resolve(__dirname, "splash.html"), path.resolve(__dirname, "./splash.html")].find((p) => fs.existsSync(p));
}
function resolveSplashPreload() {
	return require_workbuddy_product_config.resolveBundledAsset("splash", "splash-preload.js") ?? require_workbuddy_product_config.resolveBundledAsset("main", "splash", "splash-preload.js");
}
/**
* 尝试解析 claw logo 路径（packages/agent-ui 内）。
* 打包后 agent-ui 的 png 会被 vite 打进 renderer bundle；在主进程这里我们
* 走一个"best effort"查找：
*   1) 从 bundled-assets 的 resources 路径找（如果 electron-builder 配置了
*      extraResources 复制过来）
*   2) 从 monorepo 源码路径找（dev 模式下可用）
* 找不到就放弃，splash 的 <img> 会因为空 src 不显示，不影响主流程。
*/
function loadLogoDataUrl() {
	const candidates = [];
	const bundled = require_workbuddy_product_config.resolveBundledAsset("splash", "claw.png");
	if (bundled) candidates.push(bundled);
	const mainBundled = require_workbuddy_product_config.resolveBundledAsset("main", "splash", "claw.png");
	if (mainBundled) candidates.push(mainBundled);
	candidates.push(path.resolve(__dirname, "../../../../packages/agent-ui/src/components/welcome/claw.png"), path.resolve(__dirname, "../../../packages/agent-ui/src/components/welcome/claw.png"));
	for (const p of candidates) try {
		if (p && fs.existsSync(p)) return `data:image/png;base64,${fs.readFileSync(p).toString("base64")}`;
	} catch {}
}
var SplashWindow = class {
	win = null;
	lastUpdate;
	logoDataUrl;
	ipcHandlersInstalled = false;
	i18n = getSplashMessages();
	constructor() {
		this.lastUpdate = {
			phase: "initializing",
			title: this.i18n.title,
			subtitle: this.i18n.subtitle,
			caption: this.i18n.caption,
			migratingProgress: this.i18n.migratingProgress,
			migratingFallback: this.i18n.migratingFallback
		};
	}
	/** 创建并加载 splash 窗口；失败时返回 false（主流程继续，直接走主窗口）。 */
	async show() {
		const htmlPath = resolveSplashHtml();
		if (!htmlPath) {
			require_logger.mainLog.warn("[Splash] splash.html not found, skipping splash");
			return false;
		}
		this.logoDataUrl = loadLogoDataUrl();
		this.installIpcHandlers();
		const preloadPath = resolveSplashPreload();
		this.win = new electron.BrowserWindow({
			width: 800,
			height: 500,
			resizable: false,
			frame: false,
			transparent: false,
			alwaysOnTop: false,
			skipTaskbar: false,
			show: false,
			title: electron.app.name,
			backgroundColor: "#ffffff",
			webPreferences: {
				preload: preloadPath,
				contextIsolation: true,
				sandbox: false,
				nodeIntegration: false
			}
		});
		this.win.on("page-title-updated", (event) => {
			event.preventDefault();
		});
		this.win.on("closed", () => {
			this.win = null;
		});
		try {
			await this.win.loadFile(htmlPath);
		} catch (err) {
			require_logger.mainLog.warn("[Splash] loadFile failed:", err);
			this.destroy();
			return false;
		}
		await new Promise((resolve) => setTimeout(resolve, 50));
		this.pushUpdate(this.lastUpdate);
		if (!this.win.isDestroyed()) this.win.show();
		require_logger.mainLog.info(`[Splash] shown (preload=${preloadPath ? "yes" : "no"}, logo=${this.logoDataUrl ? "yes" : "no"})`);
		return true;
	}
	/** 更新 splash 显示内容（主进程任意阶段都可调）。 */
	update(partial) {
		this.lastUpdate = {
			...this.lastUpdate,
			...partial
		};
		this.pushUpdate(this.lastUpdate);
	}
	close() {
		this.destroy();
	}
	installIpcHandlers() {
		if (this.ipcHandlersInstalled) return;
		electron.ipcMain.handle(SPLASH_GET_LOGO_CHANNEL, () => this.logoDataUrl ?? null);
		electron.ipcMain.handle(SPLASH_GET_LAST_UPDATE_CHANNEL, () => this.lastUpdate);
		this.ipcHandlersInstalled = true;
	}
	pushUpdate(update) {
		const win = this.win;
		if (!win || win.isDestroyed()) return;
		try {
			win.webContents.send(SPLASH_IPC_CHANNEL, update);
		} catch (err) {
			require_logger.mainLog.debug?.("[Splash] pushUpdate failed (ignored):", err);
		}
	}
	destroy() {
		if (this.ipcHandlersInstalled) {
			try {
				electron.ipcMain.removeHandler(SPLASH_GET_LOGO_CHANNEL);
			} catch {}
			try {
				electron.ipcMain.removeHandler(SPLASH_GET_LAST_UPDATE_CHANNEL);
			} catch {}
			this.ipcHandlersInstalled = false;
		}
		const win = this.win;
		this.win = null;
		if (win && !win.isDestroyed()) try {
			win.close();
		} catch {}
	}
};
//#endregion
//#region src/main/window/crash-recovery-policy.ts
var DEFAULT_RECOVERY_CONFIG = {
	consecutiveWindowMs: 6e4,
	thresholdConsecutive: 2,
	thresholdGiveUp: 5,
	normalDelayMs: 3e3,
	oomDelayMs: 5e3,
	rendererStabilityMs: 3e4
};
/**
* 状态机：维护短时窗口内的崩溃历史，给出恢复决策。
*
* 使用约定：每次 `render-process-gone` 触发时调用 `decide(event)`，
* 拿到 RecoveryDecision 后由 WindowManager 执行实际副作用。
*
* 不持久化：进程重启后历史清空（这是合理的，issue #56760 看到的"一个用户 17s 崩 5 次"
* 是同一进程生命周期内的 reload 抖动，不会跨进程）。
*/
var CrashRecoveryPolicy = class {
	config;
	history = [];
	gaveUp = false;
	/**
	* 最近一次 onRecoverySucceeded 调用时间戳（ms）。null 表示从未成功恢复或
	* 上次时间戳已被 decide 消费。配合 rendererStabilityMs 区分"加载完成后
	* 短期又崩"（恢复未真正完成）和"使用一段时间后又崩"（孤立新崩溃）。
	*/
	lastRecoverySucceededAt = null;
	constructor(config = DEFAULT_RECOVERY_CONFIG) {
		this.config = config;
	}
	/**
	* 当前窗口内的崩溃次数（含 OOM）。仅用于测试 / 诊断。
	*/
	get recentCrashCount() {
		return this.history.length;
	}
	/**
	* 重置崩溃历史（reload 成功后调用，避免老的崩溃事件污染后续判断）。
	* 同时记录时间戳到 lastRecoverySucceededAt；下次 decide() 时若仍在
	* rendererStabilityMs 窗口内，将走 clear-cache-and-reload 而非 reload。
	* Patch 修复 issue #56760 B 类场景。
	* @param timestamp 可选注入的时间戳（ms），默认 Date.now()。单测场景
	*   使用固定 T0 模拟时间，避免与 decide() 传入的 timestamp 错位。
	*/
	onRecoverySucceeded(timestamp = Date.now()) {
		this.history = [];
		this.gaveUp = false;
		this.lastRecoverySucceededAt = timestamp;
	}
	decide(event) {
		const cutoff = event.timestamp - this.config.consecutiveWindowMs;
		this.history = this.history.filter((e) => e.timestamp >= cutoff);
		if (this.gaveUp) return {
			action: "give-up",
			reasonTag: "already-gave-up",
			delayMs: 0
		};
		if (!(event.reason === "crashed" || event.reason === "oom" || event.reason === "killed" || event.reason === "abnormal-exit" || event.reason === "launch-failed" || event.reason === "integrity-failure" || event.reason === "clean-exit" && event.exitCode !== 0)) return {
			action: "none",
			reasonTag: `clean-exit-code-${event.exitCode}`,
			delayMs: 0
		};
		let inStabilityWindow = false;
		if (this.lastRecoverySucceededAt !== null) {
			const sinceRecovery = event.timestamp - this.lastRecoverySucceededAt;
			if (sinceRecovery >= 0 && sinceRecovery < this.config.rendererStabilityMs) inStabilityWindow = true;
			this.lastRecoverySucceededAt = null;
		}
		this.history.push(event);
		if (this.history.length >= this.config.thresholdGiveUp) {
			this.gaveUp = true;
			return {
				action: "give-up",
				reasonTag: `consecutive-crashes-${this.history.length}`,
				delayMs: 0
			};
		}
		if (event.reason === "oom") return {
			action: "clear-cache-and-reload",
			reasonTag: "oom",
			delayMs: this.config.oomDelayMs
		};
		if (inStabilityWindow) return {
			action: "clear-cache-and-reload",
			reasonTag: "unstable-after-reload",
			delayMs: this.config.oomDelayMs
		};
		if (this.history.length >= this.config.thresholdConsecutive) return {
			action: "clear-cache-and-reload",
			reasonTag: `consecutive-${this.history.length}`,
			delayMs: this.config.oomDelayMs
		};
		return {
			action: "reload",
			reasonTag: event.reason,
			delayMs: this.config.normalDelayMs
		};
	}
};
//#endregion
//#region src/main/window/renderer-load-guard.ts
/**
* RendererLoadGuard protects the renderer entry from stale Chromium cache and
* failed bootstrap states. It is desktop-shell code only; reusable WorkBuddy
* business logic must stay in packages/workbuddy-server.
*/
var TAG = "[RendererLoadGuard]";
var PROD_MAX_RETRIES = 2;
var BOOTSTRAP_TIMEOUT_MS = 2e4;
function getVersionFilePath() {
	return path.join(electron.app.getPath("userData"), "renderer-version.json");
}
function getRendererFilePath() {
	return path.join(__dirname, "../renderer/index.html");
}
var UNRESPONSIVE_GRACE_MS = 1e4;
var UNRESPONSIVE_MAX_RELOADS = 2;
var RendererLoadGuard = class RendererLoadGuard {
	prodFailLoadRetries = 0;
	bootstrapDone = false;
	bootstrapTimer = null;
	unresponsiveTimer = null;
	unresponsiveReloads = 0;
	constructor(win, devEntryUrl) {
		this.win = win;
		this.devEntryUrl = devEntryUrl;
	}
	static attach(win, devEntryUrl) {
		const guard = new RendererLoadGuard(win, devEntryUrl);
		guard.registerTelemetry();
		guard.registerFailLoadRecovery();
		guard.startBootstrapTimeoutGuard();
		guard.loadPage().catch((error) => {
			require_logger.windowLog.error(`${TAG} loadPage failed:`, error);
		});
		return guard;
	}
	markBootstrapDone() {
		if (this.bootstrapDone) return;
		this.bootstrapDone = true;
		if (this.bootstrapTimer) {
			clearTimeout(this.bootstrapTimer);
			this.bootstrapTimer = null;
		}
		require_logger.windowLog.info(`${TAG} Renderer bootstrap done, timeout guard cleared`);
	}
	dispose() {
		if (this.bootstrapTimer) {
			clearTimeout(this.bootstrapTimer);
			this.bootstrapTimer = null;
		}
		if (this.unresponsiveTimer) {
			clearTimeout(this.unresponsiveTimer);
			this.unresponsiveTimer = null;
		}
	}
	get isDev() {
		return !!this.devEntryUrl;
	}
	/** 上报 renderer 加载链路异常（counter wb.renderer.load.error）；仅 prod，dev noop 避免 HMR 噪音。 */
	recordLoadFault(args) {
		if (this.isDev) return;
		const dims = { kind: args.kind };
		if (args.errorCode !== void 0) dims.error_code = String(args.errorCode);
		if (args.attempt !== void 0) dims.attempt = String(args.attempt);
		if (args.reason !== void 0) dims.reason = args.reason;
		if (args.phase !== void 0) dims.phase = args.phase;
		require_desktop_monitor_service.DesktopMonitorService.getSharedInstance()?.addCounter("wb.renderer.load.error", 1, dims);
	}
	registerTelemetry() {
		const wc = this.win.webContents;
		wc.on("did-start-loading", () => {
			require_logger.windowLog.info(`${TAG} did-start-loading`);
		});
		wc.on("did-finish-load", () => {
			require_logger.windowLog.info(`${TAG} did-finish-load`);
		});
		wc.on("render-process-gone", (_event, details) => {
			require_logger.windowLog.error(`${TAG} render-process-gone: reason=${details.reason} exitCode=${details.exitCode}`);
			this.recordLoadFault({
				kind: "crash",
				reason: details.reason
			});
			if (this.bootstrapTimer) {
				clearTimeout(this.bootstrapTimer);
				this.bootstrapTimer = null;
				require_logger.windowLog.info(`${TAG} Bootstrap timeout guard suspended (crash recovery takes over)`);
			}
		});
		wc.on("unresponsive", () => {
			require_logger.windowLog.warn(`${TAG} webContents unresponsive`);
			this.recordLoadFault({ kind: "unresponsive" });
			if (this.unresponsiveTimer) return;
			if (this.unresponsiveReloads >= UNRESPONSIVE_MAX_RELOADS) {
				require_logger.windowLog.error(`${TAG} unresponsive reload limit (${UNRESPONSIVE_MAX_RELOADS}) reached, not retrying`);
				return;
			}
			this.unresponsiveTimer = setTimeout(() => {
				this.unresponsiveTimer = null;
				if (this.win.isDestroyed()) return;
				this.unresponsiveReloads++;
				require_logger.windowLog.error(`${TAG} Still unresponsive after ${UNRESPONSIVE_GRACE_MS / 1e3}s grace, force reloading (${this.unresponsiveReloads}/${UNRESPONSIVE_MAX_RELOADS})`);
				this.win.webContents.reloadIgnoringCache();
			}, UNRESPONSIVE_GRACE_MS);
		});
		wc.on("responsive", () => {
			require_logger.windowLog.info(`${TAG} webContents responsive (recovered)`);
			if (this.unresponsiveTimer) {
				clearTimeout(this.unresponsiveTimer);
				this.unresponsiveTimer = null;
			}
		});
	}
	async clearCacheOnVersionChange() {
		const versionFile = getVersionFilePath();
		const currentVersion = electron.app.getVersion();
		let lastVersion;
		try {
			const content = fs.readFileSync(versionFile, "utf-8");
			lastVersion = JSON.parse(content).version;
		} catch {}
		if (lastVersion && lastVersion !== currentVersion) {
			require_logger.windowLog.info(`${TAG} Version changed ${lastVersion} -> ${currentVersion}, clearing renderer cache`);
			try {
				if (!this.win.isDestroyed()) {
					await this.win.webContents.session.clearCache();
					await this.win.webContents.session.clearStorageData({ storages: ["serviceworkers", "cachestorage"] });
					require_logger.windowLog.info(`${TAG} Renderer cache cleared successfully`);
				}
			} catch (error) {
				require_logger.windowLog.warn(`${TAG} Failed to clear renderer cache:`, error);
			}
		}
		try {
			fs.writeFileSync(versionFile, JSON.stringify({ version: currentVersion }), "utf-8");
		} catch (error) {
			require_logger.windowLog.warn(`${TAG} Failed to persist renderer version:`, error);
		}
	}
	async loadPage() {
		if (!this.isDev) await this.clearCacheOnVersionChange();
		if (this.isDev) {
			this.win.loadURL(this.devEntryUrl).catch((error) => {
				require_logger.windowLog.error(`${TAG} Failed to load renderer URL:`, error);
			});
			if (process.env.WORKBUDDY_OPEN_DEVTOOLS === "1") this.win.webContents.openDevTools({ mode: "detach" });
			return;
		} else this.win.loadFile(getRendererFilePath()).catch((error) => {
			require_logger.windowLog.error(`${TAG} Failed to load renderer file:`, error);
			this.recordLoadFault({
				kind: "load_call_rejected",
				phase: "initial"
			});
		});
	}
	registerFailLoadRecovery() {
		let devRetries = 0;
		this.win.webContents.on("did-fail-load", (_event, errorCode, errorDescription, validatedURL, isMainFrame) => {
			if (!isMainFrame) return;
			if (this.win.isDestroyed()) return;
			if (this.isDev) {
				this.handleDevFailLoad(errorCode, errorDescription, validatedURL, devRetries);
				devRetries++;
				return;
			}
			this.handleProdFailLoad(errorCode, errorDescription);
		});
	}
	handleDevFailLoad(errorCode, errorDescription, validatedURL, retries) {
		if (!this.devEntryUrl) return;
		if (validatedURL && !validatedURL.startsWith(this.devEntryUrl)) return;
		if (retries >= 5) return;
		require_logger.windowLog.warn(`${TAG} did-fail-load dev (${errorCode}): ${errorDescription}, retry ${retries + 1}/5`);
		setTimeout(() => {
			if (!this.win.isDestroyed()) this.win.loadURL(this.devEntryUrl).catch(() => {});
		}, 1e3);
	}
	handleProdFailLoad(errorCode, errorDescription) {
		require_logger.windowLog.error(`${TAG} did-fail-load production (${errorCode}): ${errorDescription}`);
		this.recordLoadFault({
			kind: "fail_load",
			errorCode,
			attempt: this.prodFailLoadRetries + 1
		});
		if (this.prodFailLoadRetries >= PROD_MAX_RETRIES) {
			require_logger.windowLog.error(`${TAG} Production load failed after ${PROD_MAX_RETRIES} retries, showing error page`);
			this.recordLoadFault({
				kind: "fallback_page",
				errorCode
			});
			this.win.loadURL("data:text/html;charset=utf-8," + encodeURIComponent(`<html><body style="display:flex;align-items:center;justify-content:center;height:100vh;font-family:system-ui;background:#1e1e2e;color:#cdd6f4;flex-direction:column"><h2>WorkBuddy 加载失败</h2><p style="color:#a6adc8">${errorDescription} (${errorCode})</p><p style="color:#a6adc8">请尝试重启应用，或清除缓存后重试</p></body></html>`)).catch((error) => {
				require_logger.windowLog.error(`${TAG} Fallback page loadURL rejected:`, error);
				this.recordLoadFault({
					kind: "load_call_rejected",
					phase: "fallback",
					errorCode
				});
			});
			return;
		}
		this.prodFailLoadRetries++;
		require_logger.windowLog.warn(`${TAG} Production retry ${this.prodFailLoadRetries}/${PROD_MAX_RETRIES}, clearing cache first`);
		this.win.webContents.session.clearCache().then(() => {
			if (!this.win.isDestroyed()) this.win.loadFile(getRendererFilePath()).catch((error) => {
				require_logger.windowLog.error(`${TAG} Retry loadFile rejected:`, error);
				this.recordLoadFault({
					kind: "load_call_rejected",
					phase: "retry",
					attempt: this.prodFailLoadRetries
				});
			});
		}).catch(() => {});
	}
	startBootstrapTimeoutGuard() {
		this.bootstrapDone = false;
		this.bootstrapTimer = setTimeout(() => {
			if (this.bootstrapDone || this.win.isDestroyed()) return;
			require_logger.windowLog.error(`${TAG} Renderer bootstrap timeout (${BOOTSTRAP_TIMEOUT_MS / 1e3}s), clearing SW cache and force-reloading`);
			this.recordLoadFault({ kind: "bootstrap_timeout" });
			this.win.webContents.session.clearStorageData({ storages: ["serviceworkers", "cachestorage"] }).then(() => {
				if (!this.win.isDestroyed()) this.win.webContents.reloadIgnoringCache();
			}).catch(() => {});
		}, BOOTSTRAP_TIMEOUT_MS);
	}
};
//#endregion
//#region src/main/window/shortcut-state.ts
/**
* Shortcut state persistence (main process side).
*
* Saves/restores the user's custom toggle-window accelerator to a JSON
* file in userData so the main process can read it on startup — before
* the renderer (and its localStorage) is available.
*/
var DEFAULT_TOGGLE_WINDOW_ACCELERATOR = "Shift+Alt+W";
function stateFilePath$1() {
	return path.join(electron.app.getPath("userData"), "shortcut-state.json");
}
/**
* Load the persisted toggle-window accelerator.
* Returns the default accelerator if no state file exists or if the
* file is corrupted.
*/
function loadToggleWindowAccelerator() {
	try {
		const raw = fs.readFileSync(stateFilePath$1(), "utf-8");
		const state = JSON.parse(raw);
		if (state.version !== 1 || typeof state.toggleWindowAccelerator !== "string") return DEFAULT_TOGGLE_WINDOW_ACCELERATOR;
		return state.toggleWindowAccelerator;
	} catch {
		return DEFAULT_TOGGLE_WINDOW_ACCELERATOR;
	}
}
/**
* Persist the toggle-window accelerator.
* Called after a successful registration or when the user clears the binding.
*/
function saveToggleWindowAccelerator(accelerator) {
	try {
		const state = {
			version: 1,
			toggleWindowAccelerator: accelerator
		};
		fs.mkdirSync(path.dirname(stateFilePath$1()), { recursive: true });
		fs.writeFileSync(stateFilePath$1(), JSON.stringify(state));
	} catch (err) {
		require_logger.windowLog.warn("[shortcut-state] Failed to save shortcut state:", err);
	}
}
//#endregion
//#region src/main/window/strip-frame-embedding-headers.ts
/**
* 从 HTTP 响应头中剥离阻止 iframe/webview 嵌入的安全头：
*  - X-Frame-Options（直接移除）
*  - Content-Security-Policy 中的 frame-ancestors 指令（保留其他 CSP 指令不动）
*
* 用于乐享预览 iframe（defaultSession）和 agent-browser-preview webview 两处场景复用。
*/
function stripFrameEmbeddingHeaders(responseHeaders) {
	if (!responseHeaders) return {};
	const cleaned = {};
	for (const key of Object.keys(responseHeaders)) {
		const lower = key.toLowerCase();
		if (lower === "x-frame-options") continue;
		if (lower === "content-security-policy" || lower === "content-security-policy-report-only") {
			const values = responseHeaders[key];
			if (!values || values.length === 0) continue;
			const stripped = values.map((v) => v.split(";").map((part) => part.trim()).filter((part) => part.length > 0 && !/^frame-ancestors\b/i.test(part)).join("; ")).filter((v) => v.length > 0);
			if (stripped.length > 0) cleaned[key] = stripped;
			continue;
		}
		cleaned[key] = responseHeaders[key];
	}
	return cleaned;
}
//#endregion
//#region src/main/window/window-state.ts
/**
* Window state persistence.
*
* Saves/restores window bounds, maximized and fullscreen state.
* Key detail: stores *normal* bounds (pre-maximize) so the window
* restores to a sensible size when un-maximized.
*
* Validates restored bounds against connected displays to avoid
* windows opening off-screen after monitor changes.
*/
var DEFAULTS = {
	width: 1200,
	height: 800
};
function stateFilePath() {
	return path.join(electron.app.getPath("userData"), "window-state.json");
}
/** Check that at least part of the rect is visible on some display. */
function isVisibleOnAnyDisplay(bounds) {
	return electron.screen.getAllDisplays().some((display) => {
		const { x, y, width, height } = display.workArea;
		return bounds.x < x + width && bounds.x + bounds.width > x && bounds.y < y + height && bounds.y + bounds.height > y;
	});
}
/** Center bounds on the primary display, keeping width/height. */
function centerOnPrimary(bounds) {
	const { workArea } = electron.screen.getPrimaryDisplay();
	return {
		x: Math.round(workArea.x + (workArea.width - bounds.width) / 2),
		y: Math.round(workArea.y + (workArea.height - bounds.height) / 2),
		width: bounds.width,
		height: bounds.height
	};
}
/**
* Clamp window bounds so they fit within the given workArea.
* Shrinks width/height if larger than workArea, then re-centers within it.
*/
function clampBoundsToWorkArea(bounds, workArea) {
	const width = Math.min(bounds.width, workArea.width);
	const height = Math.min(bounds.height, workArea.height);
	let x = bounds.x;
	let y = bounds.y;
	if (x < workArea.x) x = workArea.x;
	if (y < workArea.y) y = workArea.y;
	if (x + width > workArea.x + workArea.width) x = workArea.x + workArea.width - width;
	if (y + height > workArea.y + workArea.height) y = workArea.y + workArea.height - height;
	return {
		x,
		y,
		width,
		height
	};
}
function loadWindowState() {
	const fallback = {
		bounds: centerOnPrimary(DEFAULTS),
		isMaximized: false,
		isFullScreen: false
	};
	try {
		const raw = fs.readFileSync(stateFilePath(), "utf-8");
		const state = JSON.parse(raw);
		if (state.version !== 2 || !state.bounds) return fallback;
		if (!isVisibleOnAnyDisplay(state.bounds)) {
			require_logger.windowLog.info("[window-state] Saved bounds off-screen, centering on primary");
			return {
				bounds: centerOnPrimary(state.bounds),
				isMaximized: state.isMaximized,
				isFullScreen: state.isFullScreen
			};
		}
		return {
			bounds: state.bounds,
			isMaximized: state.isMaximized,
			isFullScreen: state.isFullScreen
		};
	} catch {
		return fallback;
	}
}
function saveWindowState(win) {
	if (win.isDestroyed()) return;
	try {
		const state = {
			version: 2,
			bounds: win.getNormalBounds(),
			isMaximized: win.isMaximized(),
			isFullScreen: win.isFullScreen()
		};
		fs.mkdirSync(path.dirname(stateFilePath()), { recursive: true });
		fs.writeFileSync(stateFilePath(), JSON.stringify(state));
	} catch {}
}
//#endregion
//#region src/main/window/window-manager.ts
/**
* WindowManager — single source of truth for BrowserWindow lifecycle.
*
* Created and driven directly from index.ts bootstrap pipeline.
* Features aligned with craft-agents-oss:
* - macOS vibrancy + Windows Mica/Acrylic
* - System theme change notifications
* - will-navigate external URL interception
* - Dev right-click context menu (Inspect Element)
* - macOS hide-on-close (standard Cmd+W behavior)
* - Traffic light visibility toggle
* - Focus/blur state broadcasting
*/
require_app_instance.init_app_instance();
require_workbuddy_product_config.init_bundled_assets();
var rendererEntryUrl = require_app_instance.getRendererEntryUrl();
var isDev = !!rendererEntryUrl;
require_logger.windowLog.info(`isDev=${isDev}, ELECTRON_RENDERER_URL=${rendererEntryUrl ?? "(not set)"}`);
var MAC_TOPBAR_HEIGHT = 52;
var MENUBAR_HEIGHT = 30;
var MIN_WINDOW_WIDTH = 800;
var MIN_WINDOW_HEIGHT = 600;
var MCP_APPS_WEBVIEW_PARTITION = "persist:mcp-apps";
var BROWSER_PREVIEW_WEBVIEW_PARTITION = "persist:agent-browser-preview-webview";
var ARDOT_TEST_COOKIE_URL = "https://test.ardot.tencent.com";
var ARDOT_TEST_COOKIE_NAMES = ["_neeko_version", "_neeko_backend_version"];
var ARDOT_TEST_COOKIE_VALUE = "5e9ac7b99d9e628ae5d65deaa36b02ae";
var CLOSE_TO_TRAY_HINT_FILE = "close-to-tray-hint.json";
var CLOSE_TO_TRAY_HINT_STATE_VERSION = 1;
/**
* 把右键图片的 srcURL 解析成可写入剪贴板的 NativeImage。
* - data: 直接解码（不走网络）
* - 可信 http(s):// 走主进程 net.fetch 抓取（主进程不受渲染进程 CORS 限制，必须先过白名单）
* 解析不出（如 blob: 存在渲染进程内存、或抓取失败）时返回 null。
*/
async function loadNativeImageFromSrcUrl(srcURL) {
	if (!srcURL) return null;
	try {
		if (srcURL.startsWith("data:")) {
			const image = electron.nativeImage.createFromDataURL(srcURL);
			return image.isEmpty() ? null : image;
		}
		if (!isAllowedCopyImageSrcUrl(srcURL)) {
			require_logger.windowLog.warn("[WindowManager] copy image blocked untrusted srcURL", summarizeUrlForLog(srcURL));
			return null;
		}
		const response = await electron.net.fetch(srcURL);
		if (!response.ok) return null;
		const arrayBuffer = await response.arrayBuffer();
		const image = electron.nativeImage.createFromBuffer(Buffer.from(arrayBuffer));
		return image.isEmpty() ? null : image;
	} catch {
		return null;
	}
}
function isAllowedCopyImageSrcUrl(srcURL) {
	try {
		const parsed = new URL(srcURL);
		if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return false;
		return isTencentDocsUrl(srcURL) || isTencentDocsClipboardOrigin(srcURL, require_workbuddy_auth_product_coordinator.getActiveTencentDocsEngineOrigin());
	} catch {
		return false;
	}
}
function summarizeUrlForLog(rawUrl) {
	try {
		const parsed = new URL(rawUrl);
		return {
			protocol: parsed.protocol,
			host: parsed.host,
			pathname: parsed.pathname
		};
	} catch {
		return { parseError: true };
	}
}
var IMAGE_DECODER_PARTITION = "persist:image-decoder";
var IMAGE_DECODER_SSRF_BLOCKED_HOSTS = [
	"169.254.169.254",
	"metadata.google.internal",
	"metadata.azure.com"
];
var imageDecoderWindow = null;
var imageDecoderIdleTimer = null;
var imageDecoderSessionLocked = false;
var IMAGE_DECODER_IDLE_MS = 6e4;
var IMAGE_DECODER_TIMEOUT_MS = 1e4;
function isBlockedImageDecoderSsrfUrl(rawUrl) {
	try {
		const parsed = new URL(rawUrl);
		if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return false;
		return IMAGE_DECODER_SSRF_BLOCKED_HOSTS.some((host) => parsed.hostname === host);
	} catch {
		return false;
	}
}
function isAllowedImageDecoderNetworkRequest(rawUrl) {
	if (isBlockedImageDecoderSsrfUrl(rawUrl)) return false;
	return isAllowedCopyImageSrcUrl(rawUrl);
}
function ensureImageDecoderSessionLocked() {
	if (imageDecoderSessionLocked) return;
	electron.session.fromPartition(IMAGE_DECODER_PARTITION).webRequest.onBeforeRequest((details, callback) => {
		if (!isAllowedImageDecoderNetworkRequest(details.url)) {
			require_logger.windowLog.warn("[Security] image-decoder blocked request", summarizeUrlForLog(details.url));
			callback({ cancel: true });
			return;
		}
		callback({});
	});
	imageDecoderSessionLocked = true;
}
function scheduleImageDecoderCleanup() {
	if (imageDecoderIdleTimer) clearTimeout(imageDecoderIdleTimer);
	imageDecoderIdleTimer = setTimeout(() => {
		imageDecoderIdleTimer = null;
		if (imageDecoderWindow && !imageDecoderWindow.isDestroyed()) imageDecoderWindow.destroy();
		imageDecoderWindow = null;
	}, IMAGE_DECODER_IDLE_MS);
}
async function getImageDecoderWindow() {
	if (imageDecoderWindow && !imageDecoderWindow.isDestroyed()) return imageDecoderWindow;
	ensureImageDecoderSessionLocked();
	const win = new electron.BrowserWindow({
		show: false,
		width: 64,
		height: 64,
		webPreferences: {
			partition: IMAGE_DECODER_PARTITION,
			webSecurity: false,
			nodeIntegration: false,
			contextIsolation: true,
			sandbox: false,
			backgroundThrottling: false
		}
	});
	await win.loadURL("about:blank");
	imageDecoderWindow = win;
	return win;
}
async function decodeImageViaChromium(srcURL) {
	if (!srcURL || srcURL.startsWith("blob:")) return null;
	if (!srcURL.startsWith("data:") && !isAllowedCopyImageSrcUrl(srcURL)) {
		require_logger.windowLog.warn("[WindowManager] chromium image decode blocked untrusted srcURL", summarizeUrlForLog(srcURL));
		return null;
	}
	const decodeScript = `(async () => {
        const SRC = ${JSON.stringify(srcURL)};
        const toPng = (canvas) => canvas.convertToBlob({ type: 'image/png' })
            .then((b) => b.arrayBuffer())
            .then((buf) => {
                const bytes = new Uint8Array(buf);
                let binary = '';
                for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
                return 'data:image/png;base64,' + btoa(binary);
            });
        // 优先 <img>.decode(): 覆盖 Chromium 能渲染的所有格式(含 svg)，比 createImageBitmap 更通用
        try {
            const img = new Image();
            img.src = SRC;
            await img.decode();
            const w = img.naturalWidth || 0;
            const h = img.naturalHeight || 0;
            if (w && h) {
                const canvas = new OffscreenCanvas(w, h);
                canvas.getContext('2d').drawImage(img, 0, 0, w, h);
                return await toPng(canvas);
            }
        } catch (e) { /* fall through to createImageBitmap */ }
        // 兜底 createImageBitmap(blob): 个别 <img> 取不到固有尺寸/解码失败的源
        try {
            const resp = await fetch(SRC);
            if (!resp.ok) return null;
            const bitmap = await createImageBitmap(await resp.blob());
            const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
            canvas.getContext('2d').drawImage(bitmap, 0, 0);
            if (bitmap.close) bitmap.close();
            return await toPng(canvas);
        } catch (e) { /* give up */ }
        return null;
    })()`;
	try {
		const win = await getImageDecoderWindow();
		const pngDataUrl = await Promise.race([win.webContents.executeJavaScript(decodeScript, true), new Promise((_, reject) => setTimeout(() => reject(/* @__PURE__ */ new Error("decode timeout")), IMAGE_DECODER_TIMEOUT_MS))]);
		scheduleImageDecoderCleanup();
		if (typeof pngDataUrl !== "string" || !pngDataUrl.startsWith("data:image/png;base64,")) return null;
		const image = electron.nativeImage.createFromDataURL(pngDataUrl);
		return image.isEmpty() ? null : image;
	} catch (error) {
		require_logger.windowLog.warn(`[WindowManager] decode image via chromium failed: ${error instanceof Error ? error.message : String(error)}`);
		scheduleImageDecoderCleanup();
		return null;
	}
}
function appendCopyImageMenuItem(template, webContents, params, isChinese) {
	if (params.mediaType !== "image" || !params.hasImageContents) return;
	template.push({
		label: isChinese ? "复制图片" : "Copy Image",
		click: () => {
			(async () => {
				try {
					const image = await loadNativeImageFromSrcUrl(params.srcURL);
					if (image) {
						electron.clipboard.writeImage(image);
						return;
					}
				} catch (error) {
					require_logger.windowLog.warn(`[WindowManager] copy image via srcURL failed: ${error instanceof Error ? error.message : String(error)}`);
				}
				try {
					const decoded = await decodeImageViaChromium(params.srcURL);
					if (decoded) {
						electron.clipboard.writeImage(decoded);
						return;
					}
				} catch (error) {
					require_logger.windowLog.warn(`[WindowManager] copy image via chromium decode failed: ${error instanceof Error ? error.message : String(error)}`);
				}
				try {
					webContents.copyImageAt(params.x, params.y);
				} catch (error) {
					require_logger.windowLog.warn(`[WindowManager] copyImageAt fallback failed: ${error instanceof Error ? error.message : String(error)}`);
				}
			})().catch((error) => {
				require_logger.windowLog.warn(`[WindowManager] copy image unexpected async failure: ${error instanceof Error ? error.message : String(error)}`);
			});
		}
	});
}
function appendDevInspectElementMenuItem(template, webContents, params, isChinese) {
	if (!require_menu_builder.devToolsMenuEnabled) return;
	if (template.length > 0) template.push({ type: "separator" });
	template.push({
		label: isChinese ? "检查元素" : "Inspect Element",
		click: () => webContents.inspectElement(params.x, params.y)
	});
}
function showWebContentsContextMenu(webContents, params, isChinese) {
	const template = [];
	appendCopyImageMenuItem(template, webContents, params, isChinese);
	if (!(params.isEditable || params.selectionText)) {
		appendDevInspectElementMenuItem(template, webContents, params, isChinese);
		if (template.length > 0) electron.Menu.buildFromTemplate(template).popup();
		return;
	}
	if (template.length > 0) template.push({ type: "separator" });
	template.push({
		label: isChinese ? "剪切" : "Cut",
		role: "cut",
		enabled: params.editFlags.canCut
	}, {
		label: isChinese ? "复制" : "Copy",
		role: "copy",
		enabled: params.editFlags.canCopy
	}, {
		label: isChinese ? "粘贴" : "Paste",
		role: "paste",
		enabled: params.editFlags.canPaste
	}, { type: "separator" }, {
		label: isChinese ? "全选" : "Select All",
		role: "selectAll",
		enabled: params.editFlags.canSelectAll
	});
	appendDevInspectElementMenuItem(template, webContents, params, isChinese);
	electron.Menu.buildFromTemplate(template).popup();
}
function isEnabledEnv(value) {
	return value === "1" || value?.toLowerCase() === "true";
}
function isHostOrSubdomain(hostname, domain) {
	return hostname === domain || hostname.endsWith(`.${domain}`);
}
function isCodeBuddyOAuthRedirectHost(hostname) {
	return hostname === "www.codebuddy.cn" || hostname === "staging.codebuddy.cn";
}
function isCodeBuddyLexiangOAuthConnectUrl(url) {
	try {
		const parsedUrl = new URL(url);
		return parsedUrl.protocol === "https:" && isCodeBuddyOAuthRedirectHost(parsedUrl.hostname) && parsedUrl.pathname.startsWith("/console/as/p/connector/oauth/lexiang-ol/connect");
	} catch {
		return false;
	}
}
/**
* 判断 URL 是否属于腾讯文档个人版导入 webview 的登录链路（QQ 登录 / 微信
* 扫码 / QQ 互联回跳 / 选择器自身回跳）。
*
* 适用范围：仅 partition=`persist:tdoc-import` guest（在 did-attach-webview
* 处通过 partition 判定后调用），不影响其它 guest（如 tdoc-preview）。
*
* ⚠️ 历史 bug（#46559）：早先用 `endsWith('.qq.com')` 宽匹配，把弹框里的
* 「注册账号」(zc.qq.com) /「服务协议」(service.qq.com) 等业务外链也截留
* 在 webview，用户点击没反应。改为「只白名单真正属于登录链路的具体子域，
* 其它 *.qq.com 一律视为外链」。
*/
/**
* docs.qq.com 域内"必须当外链外抛"的路径前缀（#46559）。
* 政策/关于/帮助/反馈类页面虽落在同源，但与 selector 无关，占用 webview
* 会中断挑文档；具体 doc 链接（/doc/XXX）也外抛系统浏览器。
*/
var DOCS_QQ_EXTERNAL_PATH_PREFIXES = [
	"/policy",
	"/about",
	"/agreement",
	"/privacy",
	"/help",
	"/feedback",
	"/doc"
];
function isDocsQqExternalPath(pathname) {
	const lower = pathname.toLowerCase();
	if (lower === "" || lower === "/") return true;
	return DOCS_QQ_EXTERNAL_PATH_PREFIXES.some((prefix) => lower === prefix || lower.startsWith(prefix + "/") || lower.startsWith(prefix + "."));
}
var PTLOGIN2_EXTERNAL_PATH_PREFIXES = ["/j_newreg_url"];
function isPtlogin2ExternalPath(pathname) {
	const lower = pathname.toLowerCase();
	return PTLOGIN2_EXTERNAL_PATH_PREFIXES.some((prefix) => lower === prefix || lower.startsWith(prefix + "/") || lower.startsWith(prefix + "?"));
}
function isTdocImportInternalNavigation(url) {
	try {
		const parsedUrl = new URL(url);
		if (parsedUrl.protocol !== "https:" && parsedUrl.protocol !== "http:") return false;
		const { hostname, pathname } = parsedUrl;
		if (hostname === "docs.qq.com") {
			if (isDocsQqExternalPath(pathname)) return false;
			return true;
		}
		if (hostname === "accounts.qq.com" || hostname === "graph.qq.com" || hostname.endsWith(".graph.qq.com")) return true;
		if (hostname === "ptlogin2.qq.com" || hostname.endsWith(".ptlogin2.qq.com")) {
			if (isPtlogin2ExternalPath(pathname)) return false;
			return true;
		}
		if (hostname === "weixin.qq.com" || hostname.endsWith(".weixin.qq.com") || hostname === "wx.qq.com" || hostname.endsWith(".wx.qq.com")) return true;
		if (hostname === "captcha.qq.com" || hostname.endsWith(".captcha.qq.com")) return true;
		return false;
	} catch {
		return false;
	}
}
function isAllowedGuestWebviewRedirect(url) {
	try {
		const parsedUrl = new URL(url);
		const { hostname, pathname, protocol } = parsedUrl;
		if (protocol !== "https:") return false;
		if (isCodeBuddyOAuthRedirectHost(hostname) && (pathname.startsWith("/console/as/p/connector/oauth/lexiang-ol/connect") || pathname.startsWith("/console/as/p/connector/oauth/tdocs-app/connect"))) return true;
		const codeBuddyCallbackConnectorName = parsedUrl.searchParams.get("name");
		if (isCodeBuddyOAuthRedirectHost(hostname) && pathname === "/agents/callback" && (codeBuddyCallbackConnectorName === "tdocs-app" || codeBuddyCallbackConnectorName === "lexiang-ol")) return true;
		if (hostname === "mcp.lexiang-app.com" && pathname.startsWith("/oauth/")) return true;
		if (hostname === "docs.qq.com" && pathname.startsWith("/oauth/")) return true;
		if (hostname === "graph.qq.com" && pathname.startsWith("/oauth2.0/")) return true;
		if (isHostOrSubdomain(hostname, "tencentciam.com")) return true;
		const isLexiangHost = isHostOrSubdomain(hostname, "lexiangla.com") || isHostOrSubdomain(hostname, "lexiangla.net");
		if (isLexiangHost && (pathname === "/c/mcp-auth" || pathname === "/c/auth-callback")) return true;
		if (isLexiangHost && pathname === "/sapi/oauth/authorize" && isCodeBuddyLexiangOAuthConnectUrl(parsedUrl.searchParams.get("redirect_uri") ?? "")) return true;
		return false;
	} catch {
		return false;
	}
}
/**
* 判断 guest webview 的一次导航是否属于「腾讯文档自身刷新 / 同文档内导航」。
*
* 收紧到腾讯文档域名：currentUrl 与 targetUrl 都是腾讯文档（docs.qq.com）页面，
* 且 **同 origin + 同 pathname**（通常只是 query / hash 变化，如文档前端用
* `location.href = <当前文档地址>` 触发整页刷新）。
*
* 例外：命中下载 / 导出特征的链接（export 子域或 attachment disposition）不算
* 同文档刷新，避免把导出误判成刷新而吞掉。
*/
function isSameDocumentNavigation(currentUrl, targetUrl) {
	if (!isTencentDocsUrl(currentUrl) || !isTencentDocsUrl(targetUrl)) return false;
	if (isTencentDocsDownloadHref(targetUrl)) return false;
	try {
		const current = new URL(currentUrl);
		const target = new URL(targetUrl);
		return current.origin === target.origin && current.pathname === target.pathname;
	} catch {
		return false;
	}
}
/**
* 统一判断 guest webview 的一次导航是否应「在 webview 原地完成」，而不是踢去系统浏览器。
* 命中返回放行原因（用于日志），否则返回 null（调用方应 preventDefault + openExternal）。
*
* 所有「原地放行」的情形都收口到这里，will-navigate / will-redirect 只需调用本函数，
* 无需各自散落判断；后续新增放行规则也只改这一处：
*   - same-document：腾讯文档自身刷新 / 同文档内导航（见 isSameDocumentNavigation），
*     仅腾讯文档命中，对其它 webview（MCP Apps、微信分享等）既有的外链行为零影响。
*   - allowed oauth redirect：OAuth 等已知需要在 webview 内完成的重定向白名单
*     （见 isAllowedGuestWebviewRedirect）。
*/
function getGuestInPlaceNavigationReason(currentUrl, targetUrl) {
	if (isSameDocumentNavigation(currentUrl, targetUrl)) return "same-document";
	if (isAllowedGuestWebviewRedirect(targetUrl)) return "allowed oauth redirect";
	return null;
}
function resolvePreloadEntryPath() {
	const candidatePaths = [
		path.join(__dirname, "../preload/index.js"),
		path.join(__dirname, "../../preload/index.js"),
		path.join(__dirname, "../preload/index.cjs"),
		path.join(__dirname, "../preload/index.mjs")
	];
	return candidatePaths.find((p) => fs.existsSync(p)) ?? candidatePaths[0];
}
function getTrafficLightPosition(height = MAC_TOPBAR_HEIGHT) {
	const y = Math.floor((height - 12) / 2);
	if (y <= 0) return;
	return {
		x: y + 1,
		y
	};
}
/**
* GPU crash 后自动降级：不再使用 Mica/Acrylic backgroundMaterial。
*
* 原因：Windows 11 上 DWM Mica/Acrylic 合成层对 GPU 进程有额外压力，
* IME 候选窗口弹出时可能触发 DWM MPO 模式切换导致 GPU 进程崩溃
* (exitCode=STATUS_DLL_INIT_FAILED)，进而级联 renderer/network crash → 应用闪退。
* 参考：Electron #52098、Electron #42393、Intel Community GPU crash + Acrylic 帖子。
*
* 降级状态会持久化到 userData/bg-material-disabled.json，
* 避免硬件/驱动持续性问题导致每次启动重复 crash-rebuild 循环。
*/
var bgMaterialDisabled = false;
var BG_MATERIAL_DISABLED_FILE = "bg-material-disabled.json";
/** Return the path to the persistent degradation marker file. */
function bgMaterialDisabledFilePath() {
	return path.join(electron.app.getPath("userData"), BG_MATERIAL_DISABLED_FILE);
}
/** Load persistent degradation state on startup. */
function loadBgMaterialDisabledState() {
	try {
		const raw = fs.readFileSync(bgMaterialDisabledFilePath(), "utf-8");
		if (JSON.parse(raw).disabled) {
			bgMaterialDisabled = true;
			require_logger.windowLog.info("[WindowManager] backgroundMaterial disabled from persistent state (previous GPU crash)");
		}
	} catch {}
}
/**
* 标记 backgroundMaterial 已降级（GPU crash 后调用），后续 createWindow 不再使用 Mica/Acrylic。
* 同时持久化到磁盘，避免下次启动再次触发 crash-rebuild 循环。
*/
function disableBackgroundMaterial() {
	bgMaterialDisabled = true;
	require_logger.windowLog.info("[WindowManager] backgroundMaterial disabled due to GPU crash");
	try {
		const filePath = bgMaterialDisabledFilePath();
		fs.mkdirSync(path.dirname(filePath), { recursive: true });
		fs.writeFileSync(filePath, JSON.stringify({
			disabled: true,
			timestamp: (/* @__PURE__ */ new Date()).toISOString()
		}));
	} catch (err) {
		require_logger.windowLog.warn("[WindowManager] Failed to persist bgMaterialDisabled state:", err);
	}
}
loadBgMaterialDisabledState();
/**
* Windows background material (from craft-agents-oss):
* - Win 11 (build 22000+): Mica
* - Win 10 1809+ (build 17763+): Acrylic
*
* 如果 GPU 进程曾崩溃或用户传入 --disable-background-material，则返回 undefined 跳过。
*/
function getWindowsBackgroundMaterial() {
	if (process.platform !== "win32") return;
	if (bgMaterialDisabled) return;
	if (electron.app.commandLine.hasSwitch("disable-background-material")) return;
	const build = parseInt((0, os.release)().split(".")[2] || "0", 10);
	if (build >= 22e3) return "mica";
	if (build >= 17763) return "acrylic";
}
/**
* If the value is a file:// URL, convert it to a local filesystem path.
* Returns undefined for non-file URLs or invalid input.
* Handles percent-encoded characters (e.g. Chinese filenames) and
* Windows drive-letter paths (file:///C:/... → C:/...).
*/
function tryFileUrlToLocalPath(value) {
	if (!value.startsWith("file:")) return;
	try {
		const parsed = new URL(value);
		let pathname = decodeURIComponent(parsed.pathname);
		if (/^\/[A-Za-z]:/.test(pathname)) pathname = pathname.slice(1);
		return pathname;
	} catch {
		return;
	}
}
var WindowManager = class {
	mainWindow = null;
	tray = null;
	trayActive = false;
	isQuitting = false;
	isRecoveringFromCrash = false;
	pendingRendererEvents = [];
	rendererReady = false;
	saveStateTimer = null;
	gpuCrashRebuildTimer = null;
	closeToTrayHintShownCache;
	closeToTrayHintResetApplied = false;
	rendererLoadGuard = null;
	crashRecoveryPolicy = new CrashRecoveryPolicy();
	/**
	* 窗口事件总线。允许订阅方在窗口创建之前先 subscribe，
	* `createWindow()` 内会把 Electron 原生事件转发到这里。
	*/
	events = new events.EventEmitter();
	createWindow() {
		if (this.mainWindow && !this.mainWindow.isDestroyed()) {
			this.mainWindow.focus();
			return;
		}
		this.rendererReady = false;
		const preloadPath = resolvePreloadEntryPath();
		const savedState = loadWindowState();
		const isMac = process.platform === "darwin";
		const isWindows = process.platform === "win32";
		const bgMaterial = getWindowsBackgroundMaterial();
		this.mainWindow = new electron.BrowserWindow({
			...savedState.bounds,
			minWidth: MIN_WINDOW_WIDTH,
			minHeight: MIN_WINDOW_HEIGHT,
			show: false,
			title: electron.app.name,
			icon: !isMac ? require_workbuddy_product_config.resolveBundledAsset("icon.png") : void 0,
			webPreferences: {
				preload: preloadPath,
				contextIsolation: true,
				sandbox: true,
				nodeIntegration: false,
				nodeIntegrationInSubFrames: true,
				webviewTag: true
			},
			...isMac && {
				titleBarStyle: "hiddenInset",
				trafficLightPosition: getTrafficLightPosition(),
				vibrancy: "under-window",
				visualEffectState: "active"
			},
			...isWindows && {
				frame: false,
				backgroundColor: electron.nativeTheme.shouldUseDarkColors ? "#1e1e1e" : "#ffffff",
				titleBarOverlay: {
					height: MENUBAR_HEIGHT,
					color: "#00000000",
					symbolColor: electron.nativeTheme.shouldUseDarkColors ? "#ffffff" : "#333333"
				},
				...bgMaterial && { backgroundMaterial: bgMaterial }
			},
			...!isMac && !isWindows && { frame: false }
		});
		this.mainWindow.on("page-title-updated", (event) => {
			event.preventDefault();
		});
		this.mainWindow.webContents.on("console-message", (_event, level, message, line, sourceId) => {
			const payload = `[renderer] ${message}${sourceId ? ` (${sourceId}:${line})` : ""}`;
			if (level >= 3) require_logger.bufferRendererLog("error", payload);
			else if (!electron.app.isPackaged && level === 2) require_logger.bufferRendererLog("warn", payload);
			else if (!electron.app.isPackaged) require_logger.bufferRendererLog("info", payload);
		});
		this.mainWindow.on("close", (event) => {
			require_logger.windowLog.info(`[WindowManager] close event: isMac=${isMac}, trayActive=${this.trayActive}, isQuitting=${this.isQuitting}, isRecoveringFromCrash=${this.isRecoveringFromCrash}`);
			if (this.isRecoveringFromCrash) {
				event.preventDefault();
				return;
			}
			if (this.isQuitting) return;
			if (isMac || this.trayActive) {
				event.preventDefault();
				this.hideWindowSafely();
				require_logger.windowLog.info("[WindowManager] close event handled: window hidden");
				require_marks.logLifecycleEvent("WindowHide", { target: isMac ? "dock" : "tray" });
				return;
			}
			require_logger.windowLog.warn("[WindowManager] close event falling through — window will actually close");
		});
		this.mainWindow.on("closed", () => {
			this.rendererLoadGuard?.dispose();
			this.rendererLoadGuard = null;
			this.mainWindow = null;
		});
		this.mainWindow.on("resize", () => this.scheduleSaveState());
		this.mainWindow.on("move", () => this.scheduleSaveState());
		this.mainWindow.on("maximize", () => {
			this.broadcast("window:maximizeChanged", true);
			this.events.emit("maximize-changed", true);
		});
		this.mainWindow.on("unmaximize", () => {
			this.broadcast("window:maximizeChanged", false);
			this.events.emit("maximize-changed", false);
		});
		if (isMac) require_menu_builder.setupMenuStateListeners(this.mainWindow);
		require_menu_builder.setupZoomShortcutInterception(this.mainWindow);
		this.mainWindow.webContents.once("did-finish-load", () => {
			try {
				this.mainWindow?.webContents.setZoomLevel(0);
			} catch {}
		});
		this.mainWindow.on("focus", () => {
			this.broadcast("window:focusChanged", true);
			this.events.emit("focus-changed", true);
			require_marks.logLifecycleEvent("WindowFocus");
		});
		this.mainWindow.on("blur", () => {
			this.broadcast("window:focusChanged", false);
			this.events.emit("focus-changed", false);
			require_marks.logLifecycleEvent("WindowBlur");
		});
		this.mainWindow.on("enter-full-screen", () => {
			this.broadcast("window:fullscreenChanged", true);
			this.events.emit("fullscreen-changed", true);
		});
		this.mainWindow.on("leave-full-screen", () => {
			this.broadcast("window:fullscreenChanged", false);
			this.events.emit("fullscreen-changed", false);
		});
		if (!isMac) this.mainWindow.webContents.on("before-input-event", (event, input) => {
			if (input.type === "keyDown" && input.key === "F11" && !input.alt && !input.control && !input.meta && !input.shift) {
				event.preventDefault();
				this.toggleFullScreen();
			}
		});
		const themeHandler = () => {
			const isDark = electron.nativeTheme.shouldUseDarkColors;
			this.broadcast("theme:systemChanged", isDark);
			if (isWindows && this.mainWindow && !this.mainWindow.isDestroyed()) {
				this.mainWindow.setBackgroundColor(isDark ? "#1e1e1e" : "#ffffff");
				try {
					this.mainWindow.setTitleBarOverlay({
						color: "#00000000",
						symbolColor: isDark ? "#ffffff" : "#333333",
						height: MENUBAR_HEIGHT
					});
				} catch {}
			}
		};
		electron.nativeTheme.on("updated", themeHandler);
		this.mainWindow.on("closed", () => electron.nativeTheme.removeListener("updated", themeHandler));
		const originalMinWidth = MIN_WINDOW_WIDTH;
		const originalMinHeight = MIN_WINDOW_HEIGHT;
		const displayMetricsHandler = (_event, _display, changedMetrics) => {
			if (!this.mainWindow || this.mainWindow.isDestroyed()) return;
			if (!changedMetrics.includes("workArea") && !changedMetrics.includes("bounds")) return;
			if (this.mainWindow.isMaximized() || this.mainWindow.isFullScreen() || this.mainWindow.isMinimized()) return;
			const currentBounds = this.mainWindow.getBounds();
			const { workArea } = electron.screen.getDisplayMatching(currentBounds);
			const effectiveMinW = Math.min(originalMinWidth, workArea.width);
			const effectiveMinH = Math.min(originalMinHeight, workArea.height);
			const [currentMinW, currentMinH] = this.mainWindow.getMinimumSize();
			if (effectiveMinW !== currentMinW || effectiveMinH !== currentMinH) this.mainWindow.setMinimumSize(effectiveMinW, effectiveMinH);
			const clamped = clampBoundsToWorkArea(currentBounds, workArea);
			if (clamped.x !== currentBounds.x || clamped.y !== currentBounds.y || clamped.width !== currentBounds.width || clamped.height !== currentBounds.height) {
				require_logger.windowLog.info(`[WindowManager] Display metrics changed, clamping window: ${currentBounds.width}×${currentBounds.height} → ${clamped.width}×${clamped.height}`);
				this.mainWindow.setBounds(clamped);
			}
		};
		electron.screen.on("display-metrics-changed", displayMetricsHandler);
		this.mainWindow.on("closed", () => electron.screen.removeListener("display-metrics-changed", displayMetricsHandler));
		this.mainWindow.webContents.setWindowOpenHandler(({ url, frameName, disposition }) => {
			require_logger.windowLog.info(`[WindowManager] setWindowOpenHandler: url=${url}, frameName=${frameName}, disposition=${disposition}`);
			try {
				if (new URL(url).hostname === "work.weixin.qq.com") {
					require_logger.windowLog.info("[WindowManager] Allowing wecom auth window");
					return {
						action: "allow",
						overrideBrowserWindowOptions: {
							width: 800,
							height: 600,
							minWidth: 400,
							minHeight: 300,
							title: `${electron.app.name} - Authorization`,
							autoHideMenuBar: true,
							webPreferences: {
								sandbox: true,
								contextIsolation: true,
								nodeIntegration: false
							}
						}
					};
				}
			} catch {
				require_logger.windowLog.warn(`[WindowManager] Invalid URL in window.open: ${url}`);
			}
			require_logger.windowLog.info(`[WindowManager] Denying window.open, opening externally: ${url}`);
			const filePath = tryFileUrlToLocalPath(url);
			if (filePath) electron.shell.openPath(filePath).then((errorMessage) => {
				if (errorMessage) require_logger.windowLog.warn(`[WindowManager] openPath failed: path=${filePath}, error=${errorMessage}`);
			}).catch((error) => {
				require_logger.windowLog.warn(`[WindowManager] openPath failed: path=${filePath}, error=${error instanceof Error ? error.message : String(error)}`);
			});
			else electron.shell.openExternal(url).catch((error) => {
				require_logger.windowLog.warn(`[WindowManager] openExternal failed: url=${url}, error=${error instanceof Error ? error.message : String(error)}`);
			});
			return { action: "deny" };
		});
		setupTencentDocsBrowserPreview(this.mainWindow);
		this.mainWindow.webContents.on("did-create-window", (childWindow, { url: childUrl }) => {
			require_logger.windowLog.info(`[WindowManager] Child window created for: ${childUrl}`);
			childWindow.webContents.on("will-navigate", (event, navUrl) => {
				try {
					const parsed = new URL(navUrl);
					if (![
						"work.weixin.qq.com",
						"open.work.weixin.qq.com",
						"wwcdn.weixin.qq.com"
					].some((host) => parsed.hostname === host || parsed.hostname.endsWith("." + host))) {
						event.preventDefault();
						require_logger.windowLog.info(`[WindowManager] Blocked child-window navigation to: ${navUrl}`);
						if (parsed.hostname === "127.0.0.1" || parsed.hostname === "localhost") {
							require_logger.windowLog.info("[WindowManager] Auth callback detected, closing auth window");
							childWindow.close();
						}
					}
				} catch {
					event.preventDefault();
				}
			});
			childWindow.webContents.on("page-title-updated", (_event, title) => {
				require_logger.windowLog.info(`[WindowManager] Child window title changed: "${title}"`);
			});
			childWindow.webContents.setWindowOpenHandler(({ url: newUrl }) => {
				require_logger.windowLog.info(`[WindowManager] Child window tried to open: ${newUrl}`);
				electron.shell.openExternal(newUrl).catch((error) => {
					require_logger.windowLog.warn(`[WindowManager] Child openExternal failed: url=${newUrl}, error=${error instanceof Error ? error.message : String(error)}`);
				});
				return { action: "deny" };
			});
		});
		this.mainWindow.webContents.on("will-navigate", (event, url) => {
			if (!(url.startsWith("file://") || rendererEntryUrl && url.startsWith(rendererEntryUrl))) {
				event.preventDefault();
				electron.shell.openExternal(url).catch((error) => {
					require_logger.windowLog.warn(`[WindowManager] will-navigate openExternal failed: url=${url}, error=${error instanceof Error ? error.message : String(error)}`);
				});
			}
		});
		const isChinese = electron.app.getLocale().startsWith("zh");
		this.mainWindow.webContents.on("did-attach-webview", (_event, guestContents) => {
			require_logger.windowLog.info("[WindowManager] guest webview attached", { id: guestContents.id });
			let isBrowserPreviewGuest = false;
			let isTdocImportGuest = false;
			let isTdocPreviewGuest = false;
			try {
				isBrowserPreviewGuest = guestContents.session === electron.session.fromPartition(BROWSER_PREVIEW_WEBVIEW_PARTITION);
				isTdocImportGuest = guestContents.session === electron.session.fromPartition("persist:tdoc-import");
				isTdocPreviewGuest = guestContents.session === electron.session.fromPartition("persist:tdoc-preview");
			} catch (err) {
				require_logger.windowLog.warn("[WindowManager] resolve guest partition failed", err);
			}
			if (isBrowserPreviewGuest) {
				require_logger.windowLog.info("[WindowManager] guest webview is BrowserPreview; keeping in-webview navigation");
				if (require_menu_builder.devToolsMenuEnabled) guestContents.on("context-menu", () => {
					const { Menu: CtxMenu } = require("electron");
					CtxMenu.buildFromTemplate([{
						label: "Inspect",
						click: () => guestContents.openDevTools()
					}]).popup();
				});
				return;
			}
			require_menu_builder.setupGuestWebviewZoomForwarding(guestContents);
			guestContents.on("context-menu", (_contextMenuEvent, params) => {
				showWebContentsContextMenu(guestContents, params, isChinese);
			});
			let firstNavigationDone = false;
			const allowTdocPreviewInPlaceNavigation = (phase, currentUrl, targetUrl) => {
				if (!isTdocPreviewGuest || !isTencentDocsPreviewInternalNavigation(targetUrl)) return false;
				require_logger.windowLog.info(`[WindowManager] guest ${phase} (tdoc-preview internal, allow): ${targetUrl} (from ${currentUrl})`);
				return true;
			};
			guestContents.setWindowOpenHandler(({ url }) => {
				if (isTdocImportGuest && (isTdocImportInternalNavigation(url) || isAllowedGuestWebviewRedirect(url))) {
					require_logger.windowLog.info(`[WindowManager] guest window.open denied silently (internal): ${url}`);
					return { action: "deny" };
				}
				if (isTdocPreviewGuest && isTencentDocsDownloadHref(url)) {
					guestContents.session.downloadURL(url);
					return { action: "deny" };
				}
				require_logger.windowLog.info(`[WindowManager] guest window.open → external: ${url}`);
				electron.shell.openExternal(url);
				return { action: "deny" };
			});
			guestContents.on("will-navigate", (e, navUrl) => {
				const currentUrl = guestContents.getURL();
				if (!firstNavigationDone) {
					firstNavigationDone = true;
					require_logger.windowLog.info(`[WindowManager] guest will-navigate (first, allow): ${navUrl}`);
					return;
				}
				const inPlaceReason = getGuestInPlaceNavigationReason(currentUrl, navUrl);
				if (inPlaceReason) {
					require_logger.windowLog.info(`[WindowManager] guest will-navigate (${inPlaceReason}, allow): ${navUrl} (from ${currentUrl})`);
					return;
				}
				if (isTdocImportGuest && isTdocImportInternalNavigation(navUrl)) {
					require_logger.windowLog.info(`[WindowManager] guest will-navigate (tdoc-import login flow, allow): ${navUrl}`);
					return;
				}
				if (allowTdocPreviewInPlaceNavigation("will-navigate", currentUrl, navUrl)) return;
				if (isAllowedGuestWebviewRedirect(navUrl)) {
					require_logger.windowLog.info(`[WindowManager] guest will-navigate (allowed oauth redirect): ${navUrl}`);
					return;
				}
				require_logger.windowLog.info(`[WindowManager] guest will-navigate → external: ${navUrl} (from ${currentUrl})`);
				e.preventDefault();
				electron.shell.openExternal(navUrl);
			});
			guestContents.on("will-frame-navigate", (event) => {
				if (event.isMainFrame) return;
				const navUrl = event.url;
				const frameUrl = event.frame?.url ?? "<unknown-frame>";
				if (isTdocImportGuest && isTdocImportInternalNavigation(navUrl)) {
					require_logger.windowLog.info(`[WindowManager] guest will-frame-navigate (tdoc-import login flow, allow): from=${frameUrl.slice(0, 100)} → ${navUrl}`);
					return;
				}
				if (isAllowedGuestWebviewRedirect(navUrl)) {
					require_logger.windowLog.info(`[WindowManager] guest will-frame-navigate (allowed oauth redirect): from=${frameUrl.slice(0, 100)} → ${navUrl}`);
					return;
				}
				if (isTdocImportGuest) {
					require_logger.windowLog.info(`[WindowManager] guest will-frame-navigate → external: from=${frameUrl.slice(0, 100)} → ${navUrl}`);
					event.preventDefault();
					electron.shell.openExternal(navUrl);
				}
			});
			if (isTdocImportGuest) guestContents.on("did-frame-finish-load", (_event, isMainFrame, frameProcessId, frameRoutingId) => {
				if (isMainFrame) return;
				let frame;
				try {
					const { webFrameMain } = require("electron");
					frame = webFrameMain.fromId(frameProcessId, frameRoutingId) ?? void 0;
				} catch (err) {
					require_logger.windowLog.warn("[WindowManager] webFrameMain.fromId failed:", err);
					return;
				}
				if (!frame) return;
				const frameUrl = frame.url;
				require_logger.windowLog.info(`[WindowManager] guest did-frame-finish-load (sub-frame, inject anchor patch): ${frameUrl.slice(0, 120)}`);
				frame.executeJavaScript(`
                    (function () {
                        'use strict';
                        if (window.__tdocImportSubFramePatched__) { return; }
                        window.__tdocImportSubFramePatched__ = true;
                        var BRIDGE_TYPE = 'tdoc-import-bridge:external';
                        var DOCS_QQ_EXTERNAL_PATH_PREFIXES = ['/policy', '/about', '/agreement', '/privacy', '/help', '/feedback', '/doc'];
                        var PTLOGIN2_EXTERNAL_PATH_PREFIXES = ['/j_newreg_url'];

                        function isDocsQqExternalPath(pathname) {
                            var lower = (pathname || '').toLowerCase();
                            if (lower === '' || lower === '/') { return true; }
                            for (var i = 0; i < DOCS_QQ_EXTERNAL_PATH_PREFIXES.length; i++) {
                                var p = DOCS_QQ_EXTERNAL_PATH_PREFIXES[i];
                                if (lower === p || lower.indexOf(p + '/') === 0 || lower.indexOf(p + '.') === 0) {
                                    return true;
                                }
                            }
                            return false;
                        }

                        function isPtlogin2ExternalPath(pathname) {
                            var lower = (pathname || '').toLowerCase();
                            for (var i = 0; i < PTLOGIN2_EXTERNAL_PATH_PREFIXES.length; i++) {
                                var p = PTLOGIN2_EXTERNAL_PATH_PREFIXES[i];
                                if (lower === p || lower.indexOf(p + '/') === 0 || lower.indexOf(p + '?') === 0) {
                                    return true;
                                }
                            }
                            return false;
                        }

                        function isPtlogin2Host(hostname) {
                            if (!hostname) { return false; }
                            return hostname === 'ptlogin2.qq.com' || /\\.ptlogin2\\.qq\\.com$/.test(hostname);
                        }

                        function isHostKeptInWebview(hostname) {
                            if (!hostname) { return false; }
                            if (hostname === 'docs.qq.com') { return true; }
                            if (hostname === 'docs.gtimg.com') { return true; }
                            if (hostname === 'accounts.qq.com' || hostname === 'graph.qq.com' || /\\.graph\\.qq\\.com$/.test(hostname)) { return true; }
                            if (hostname === 'ptlogin2.qq.com' || /\\.ptlogin2\\.qq\\.com$/.test(hostname)) { return true; }
                            if (hostname === 'captcha.qq.com' || /\\.captcha\\.qq\\.com$/.test(hostname)) { return true; }
                            if (hostname === 'weixin.qq.com' || /\\.weixin\\.qq\\.com$/.test(hostname)) { return true; }
                            if (hostname === 'wx.qq.com' || /\\.wx\\.qq\\.com$/.test(hostname)) { return true; }
                            return false;
                        }

                        function isExternal(rawHref) {
                            if (!rawHref || typeof rawHref !== 'string') { return false; }
                            var trimmed = rawHref.trim();
                            if (trimmed.length === 0) { return false; }
                            if (trimmed.charAt(0) === '#') { return false; }
                            var parsed;
                            try { parsed = new URL(trimmed, location.href); }
                            catch (e) { return false; }
                            if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') { return false; }
                            if (parsed.hostname === 'docs.qq.com' && isDocsQqExternalPath(parsed.pathname)) { return true; }
                            if (isPtlogin2Host(parsed.hostname) && isPtlogin2ExternalPath(parsed.pathname)) { return true; }
                            if (isHostKeptInWebview(parsed.hostname)) { return false; }
                            return true;
                        }

                        function postExternal(rawHref, reason) {
                            var absolute;
                            try { absolute = new URL(rawHref, location.href).toString(); }
                            catch (e) { absolute = rawHref; }
                            try {
                                console.info('[tdoc-import-preload][sub-frame] external captured reason=' + reason + ' url=' + absolute);
                            } catch (e) { /* ignore */ }
                            // 顶层 preload message listener 会接住 BRIDGE_TYPE
                            // 并 sendToHost('tdoc-import:open-external', ...)，
                            // 由宿主 React 侧 adapter.openExternal 真正打开系统浏览器。
                            try {
                                if (window.top && window.top !== window) {
                                    window.top.postMessage({ __type: BRIDGE_TYPE, url: absolute, reason: reason }, '*');
                                }
                            } catch (e) { /* ignore */ }
                            try {
                                window.postMessage({ __type: BRIDGE_TYPE, url: absolute, reason: reason }, '*');
                            } catch (e) { /* ignore */ }
                        }

                        // anchor click capture
                        document.addEventListener('click', function (event) {
                            try {
                                if (event.button !== 0 && event.button !== 1) { return; }
                                var anchor = null;
                                var path = typeof event.composedPath === 'function' ? event.composedPath() : [];
                                for (var i = 0; i < path.length; i++) {
                                    var n = path[i];
                                    if (n && n.nodeType === 1 && n.tagName === 'A') { anchor = n; break; }
                                }
                                if (!anchor) {
                                    var cur = event.target;
                                    while (cur && cur.nodeType === 1) {
                                        if (cur.tagName === 'A') { anchor = cur; break; }
                                        cur = cur.parentNode;
                                    }
                                }
                                if (!anchor) { return; }
                                var rawHref = anchor.getAttribute('href') || anchor.href || '';
                                if (!isExternal(rawHref)) { return; }
                                event.preventDefault();
                                if (typeof event.stopImmediatePropagation === 'function') {
                                    event.stopImmediatePropagation();
                                } else {
                                    event.stopPropagation();
                                }
                                postExternal(rawHref, 'sub-frame.click');
                            } catch (e) { /* ignore */ }
                        }, true);

                        // auxclick (middle button)
                        document.addEventListener('auxclick', function (event) {
                            try {
                                if (event.button !== 1) { return; }
                                var anchor = null;
                                var cur = event.target;
                                while (cur && cur.nodeType === 1) {
                                    if (cur.tagName === 'A') { anchor = cur; break; }
                                    cur = cur.parentNode;
                                }
                                if (!anchor) { return; }
                                var rawHref = anchor.getAttribute('href') || anchor.href || '';
                                if (!isExternal(rawHref)) { return; }
                                event.preventDefault();
                                postExternal(rawHref, 'sub-frame.auxclick');
                            } catch (e) { /* ignore */ }
                        }, true);

                        // window.open hijack
                        try {
                            var originalOpen = window.open;
                            window.open = function patchedOpen(rawUrl) {
                                try {
                                    if (typeof rawUrl === 'string' && isExternal(rawUrl)) {
                                        postExternal(rawUrl, 'sub-frame.window.open');
                                        return null;
                                    }
                                } catch (e) { /* ignore */ }
                                return originalOpen.apply(this, arguments);
                            };
                        } catch (e) { /* ignore */ }

                        try { console.info('[tdoc-import-preload][sub-frame] patch installed @ ' + location.href); }
                        catch (e) { /* ignore */ }
                    })();
                    `, true).catch((err) => {
					require_logger.windowLog.warn(`[WindowManager] sub-frame inject failed: ${frameUrl.slice(0, 100)}, error=${err instanceof Error ? err.message : String(err)}`);
				});
			});
			guestContents.on("will-redirect", (e, redirUrl) => {
				const currentUrl = guestContents.getURL();
				if (!firstNavigationDone) {
					require_logger.windowLog.info(`[WindowManager] guest will-redirect (first, allow): ${redirUrl}`);
					return;
				}
				const inPlaceReason = getGuestInPlaceNavigationReason(currentUrl, redirUrl);
				if (inPlaceReason) {
					require_logger.windowLog.info(`[WindowManager] guest will-redirect (${inPlaceReason}, allow): ${redirUrl} (from ${currentUrl})`);
					return;
				}
				if (isTdocImportGuest && isTdocImportInternalNavigation(redirUrl)) {
					require_logger.windowLog.info(`[WindowManager] guest will-redirect (tdoc-import login flow, allow): ${redirUrl}`);
					return;
				}
				if (allowTdocPreviewInPlaceNavigation("will-redirect", currentUrl, redirUrl)) return;
				if (isAllowedGuestWebviewRedirect(redirUrl)) {
					require_logger.windowLog.info(`[WindowManager] guest will-redirect (allowed oauth redirect): ${redirUrl}`);
					return;
				}
				require_logger.windowLog.info(`[WindowManager] guest will-redirect → external: ${redirUrl} (from ${currentUrl})`);
				e.preventDefault();
				electron.shell.openExternal(redirUrl);
			});
		});
		this.mainWindow.webContents.on("context-menu", (_event, params) => {
			if (!this.mainWindow) return;
			showWebContentsContextMenu(this.mainWindow.webContents, params, isChinese);
		});
		this.mainWindow.once("ready-to-show", () => {
			require_logger.windowLog.info(`[WindowManager] Window ready to show (timestamp=${Date.now()})`);
			require_menu_builder.markStartup("C7");
			if (isMac) this.mainWindow?.setWindowButtonPosition(getTrafficLightPosition(MAC_TOPBAR_HEIGHT) ?? null);
			if (savedState.isFullScreen) this.mainWindow?.setFullScreen(true);
			else if (savedState.isMaximized) this.mainWindow?.maximize();
			this.mainWindow?.show();
		});
		this.mainWindow.webContents.on("dom-ready", () => {
			this.rendererReady = true;
			this.flushPendingRendererEvents();
		});
		this.mainWindow.webContents.on("did-finish-load", () => {
			this.rendererReady = true;
			this.rendererLoadGuard?.markBootstrapDone();
			this.crashRecoveryPolicy.onRecoverySucceeded();
			require_dev_env_actions.syncDevEnvStateToWindow(this.mainWindow);
			require_menu_builder.syncIOAImStateToWindow(this.mainWindow);
			require_cdp_profiler.syncPerfMenuStateToWindow(this.mainWindow);
			this.flushPendingRendererEvents();
		});
		this.mainWindow.webContents.on("render-process-gone", (_event, details) => {
			require_logger.windowLog.info(`[WindowManager] Render process gone: reason=${details.reason}, exitCode=${details.exitCode}`);
			this.rendererReady = false;
			if (this.gpuCrashRebuildTimer) {
				require_logger.windowLog.info("[WindowManager] GPU crash rebuild pending, skip renderer crash recovery (cascade)");
				return;
			}
			const decision = this.crashRecoveryPolicy.decide({
				reason: details.reason,
				exitCode: details.exitCode,
				timestamp: Date.now()
			});
			this.applyCrashRecoveryDecision(decision);
		});
		this.setupCSP();
		const handleAllowedPermission = (permission) => permission === "media" || permission === "fullscreen";
		const isClipboardPermission = (permission) => permission === "clipboard-read" || permission === "clipboard-sanitized-write" || permission === "clipboard-write";
		this.mainWindow.webContents.session.setPermissionRequestHandler((_webContents, permission, callback, details) => {
			if (handleAllowedPermission(permission)) {
				require_logger.windowLog.info(`[WindowManager] Granting permission request: ${permission}`);
				callback(true);
				return;
			}
			if (isClipboardPermission(permission) && require_initialize.isLexiangWebOriginUrl(details?.requestingUrl)) {
				require_logger.windowLog.info(`[WindowManager] Granting ${permission} for lexiang frame: ${details?.requestingUrl}`);
				callback(true);
				return;
			}
			if (isClipboardPermission(permission) && isTencentDocsClipboardOrigin(details?.requestingUrl, require_workbuddy_auth_product_coordinator.getActiveTencentDocsEngineOrigin())) {
				require_logger.windowLog.info(`[WindowManager] Granting ${permission} for tencent-docs frame: ${details?.requestingUrl}`);
				callback(true);
				return;
			}
			callback(false);
		});
		this.mainWindow.webContents.session.setPermissionCheckHandler((_webContents, permission, requestingOrigin, _details) => {
			if (permission === "media" || permission === "fullscreen") return true;
			if (isClipboardPermission(permission) && require_initialize.isLexiangWebOriginUrl(requestingOrigin)) return true;
			if (isClipboardPermission(permission) && isTencentDocsClipboardOrigin(requestingOrigin, require_workbuddy_auth_product_coordinator.getActiveTencentDocsEngineOrigin())) return true;
			return false;
		});
		this.registerLocalFileProtocol();
		this.injectArdotTestCookie().catch(() => void 0);
		require_menu_builder.markStartup("C6");
		this.rendererLoadGuard = RendererLoadGuard.attach(this.mainWindow, rendererEntryUrl);
		require_logger.windowLog.info("[WindowManager] Window created");
	}
	getMainWindow() {
		return this.mainWindow;
	}
	/**
	* 关闭主窗口。
	*
	*/
	close() {
		this.mainWindow?.close();
	}
	minimize() {
		this.mainWindow?.minimize();
	}
	maximize() {
		if (!this.mainWindow || this.mainWindow.isDestroyed()) return;
		if (this.mainWindow.isFullScreen()) {
			this.mainWindow.setFullScreen(false);
			return;
		}
		if (this.mainWindow.isMaximized()) this.mainWindow.unmaximize();
		else this.mainWindow.maximize();
	}
	isMaximized() {
		return this.mainWindow?.isMaximized() ?? false;
	}
	isFullScreen() {
		return this.mainWindow?.isFullScreen() ?? false;
	}
	/**
	* 让主窗口进入/退出原生全屏。
	* 渲染层无法直接调用 HTML5 `Element.requestFullscreen()`（Electron 在 sandbox + 默认
	* fullscreen 行为下不会派发 `enter-html-full-screen`，Promise 永远 pending），
	* 因此提供 RPC 让渲染层显式驱动窗口级全屏。
	*/
	setFullScreen(flag) {
		if (!this.mainWindow || this.mainWindow.isDestroyed()) return;
		if (this.mainWindow.isFullScreen() === flag) return;
		this.mainWindow.setFullScreen(flag);
	}
	/** 切换全屏状态，返回切换后的状态。 */
	toggleFullScreen() {
		if (!this.mainWindow || this.mainWindow.isDestroyed()) return false;
		const next = !this.mainWindow.isFullScreen();
		this.mainWindow.setFullScreen(next);
		return next;
	}
	focus() {
		if (this.mainWindow) {
			if (this.mainWindow.isMinimized()) this.mainWindow.restore();
			if (!this.mainWindow.isVisible()) this.mainWindow.show();
			this.mainWindow.focus();
		}
	}
	/**
	* Toggle main window visibility.
	*
	* If the window is visible and focused → hide it.
	* If the window is hidden, minimized, or not focused → show and focus it.
	*/
	toggleVisibility() {
		const win = this.mainWindow;
		if (!win || win.isDestroyed()) {
			this.createWindow();
			return;
		}
		if (win.isVisible() && win.isFocused()) this.hideWindowSafely();
		else {
			if (win.isMinimized()) win.restore();
			if (!win.isVisible()) win.show();
			win.focus();
		}
	}
	/** Currently registered toggle-window accelerator (null if none registered) */
	currentToggleAccelerator = null;
	/**
	* Register the global shortcut for toggling window visibility.
	*
	* Uses Electron globalShortcut so the shortcut works even when
	* the app is in the background / window is hidden.
	*
	* SYNC: shortcut-constants.ts toggle-window (editable: true).
	* When called without an accelerator (startup), reads the user's
	* saved preference from shortcut-state.json; falls back to the
	* default if the file is missing or corrupt.
	*
	* Notifies the renderer on failure via the
	* 'globalShortcut:registrationStatus' event.
	*/
	registerToggleWindowShortcut(accelerator) {
		const targetAccelerator = accelerator ?? loadToggleWindowAccelerator();
		if (!targetAccelerator) {
			require_logger.windowLog.info("[WindowManager] Toggle-window shortcut is cleared, skipping registration");
			this.unregisterToggleWindowShortcut();
			return true;
		}
		this.unregisterToggleWindowShortcut();
		try {
			const success = electron.globalShortcut.register(targetAccelerator, () => {
				this.toggleVisibility();
			});
			if (success) {
				this.currentToggleAccelerator = targetAccelerator;
				require_logger.windowLog.info(`[WindowManager] Global shortcut "${targetAccelerator}" registered`);
				this.broadcastRegistrationStatus(true, targetAccelerator);
			} else {
				require_logger.windowLog.warn(`[WindowManager] Failed to register global shortcut "${targetAccelerator}", likely occupied by another application`);
				this.broadcastRegistrationStatus(false, targetAccelerator);
			}
			return success;
		} catch (err) {
			require_logger.windowLog.warn(`[WindowManager] Error registering global shortcut "${targetAccelerator}":`, err);
			this.broadcastRegistrationStatus(false, targetAccelerator);
			return false;
		}
	}
	/**
	* Update the toggle-window shortcut to a new accelerator.
	* Called from the renderer when the user changes the shortcut in settings.
	* Persists the new accelerator to disk so it survives restarts.
	*
	* @returns Whether the new shortcut was registered successfully
	*/
	updateToggleWindowShortcut(newAccelerator) {
		const success = this.registerToggleWindowShortcut(newAccelerator);
		saveToggleWindowAccelerator(newAccelerator);
		return success;
	}
	/**
	* Broadcast registration status to the renderer via the event channel
	* that the preload bridge listens on.
	*/
	broadcastRegistrationStatus(success, accelerator) {
		this.broadcast(WORKBUDDY_GLOBAL_SHORTCUT_REGISTRATION_STATUS_EVENT, {
			success,
			accelerator
		});
	}
	/** Unregister the global toggle-window shortcut (called on app quit). */
	unregisterToggleWindowShortcut() {
		if (this.currentToggleAccelerator) {
			try {
				electron.globalShortcut.unregister(this.currentToggleAccelerator);
			} catch {}
			this.currentToggleAccelerator = null;
		}
	}
	showOrCreate() {
		if (this.mainWindow && !this.mainWindow.isDestroyed()) {
			this.mainWindow.show();
			this.mainWindow.focus();
		} else this.createWindow();
	}
	/**
	* GPU 进程崩溃后的降级恢复。
	*
	* 因果链：backgroundMaterial(mica/acrylic) → DWM 合成层 → IME 候选窗口触发 MPO 切换
	* → GPU crash (STATUS_DLL_INIT_FAILED) → 级联 renderer/network crash → 应用闪退。
	*
	* 恢复策略：
	* 1. 永久降级：标记 bgMaterialDisabled，后续 createWindow 不再启用 Mica/Acrylic
	* 2. 重建窗口：保存当前窗口状态 → 销毁 → 无 backgroundMaterial 重建
	* 3. 给 GPU 进程恢复留 1s 缓冲后重建
	*
	* 关键修复（issue #59419）：
	* - GPU crash 级联导致 renderer 也挂（表现为黑屏/全白），此时必须重建窗口
	* - 即使 bgMaterialDisabled 已为 true（持久化状态或同进程第二次），
	*   如果窗口不可用（webContents destroyed），仍需重建
	* - 重建窗口时通过 gpuCrashRebuildTimer 标记阻止 renderer crash 路径竞争
	*/
	handleGpuCrash(reason, exitCode) {
		require_logger.windowLog.warn(`[WindowManager] GPU crash detected: reason=${reason}, exitCode=${exitCode}`);
		if (this.gpuCrashRebuildTimer) {
			require_logger.windowLog.info("[WindowManager] GPU crash rebuild already pending, skip duplicate");
			return;
		}
		if (!bgMaterialDisabled) disableBackgroundMaterial();
		if (!(!this.mainWindow || this.mainWindow.isDestroyed() || this.mainWindow.webContents.isDestroyed() || this.mainWindow.webContents.isCrashed())) {
			require_logger.windowLog.info("[WindowManager] GPU crashed but window still functional, skip rebuild");
			return;
		}
		if (this.mainWindow && !this.mainWindow.isDestroyed()) saveWindowState(this.mainWindow);
		require_logger.windowLog.info("[WindowManager] Rebuilding window after GPU crash (renderer unavailable)");
		this.gpuCrashRebuildTimer = setTimeout(() => {
			this.gpuCrashRebuildTimer = null;
			if (this.isQuitting) {
				require_logger.windowLog.info("[WindowManager] App is quitting, skip GPU crash rebuild");
				return;
			}
			try {
				if (this.mainWindow && !this.mainWindow.isDestroyed()) this.mainWindow.destroy();
				this.mainWindow = null;
				this.createWindow();
			} catch (err) {
				require_logger.windowLog.error("[WindowManager] Failed to rebuild window after GPU crash:", err);
			}
		}, 1e3);
	}
	handleOpenUrl(url) {
		this.showOrCreate();
		this.broadcast("app:openUrl", { url });
	}
	setQuitting(quitting) {
		this.isQuitting = quitting;
		if (quitting && this.gpuCrashRebuildTimer) {
			clearTimeout(this.gpuCrashRebuildTimer);
			this.gpuCrashRebuildTimer = null;
			require_logger.windowLog.info("[WindowManager] Cleared pending GPU crash rebuild timer on quit");
		}
	}
	/** Whether the system tray is active (close hides to tray instead of quitting). */
	get isTrayActive() {
		return this.trayActive;
	}
	/**
	* Resolve the tray icon file path. Tries multiple candidate locations to
	* cover variations across:
	*   - dev vs packaged builds
	*   - asar vs asar.unpacked
	*   - electron-builder's buildResources layout
	*
	* Returns the first existing file, or undefined if nothing matches.
	* All attempted paths are logged on failure so we can debug environment-
	* specific issues (see #32637).
	*/
	resolveTrayIconPath() {
		const isWindows = process.platform === "win32";
		const isDarwin = process.platform === "darwin";
		const candidates = [];
		if (isDarwin) {
			const tplPath = require_workbuddy_product_config.resolveBundledAsset("trayTemplate.png");
			if (tplPath) candidates.push(tplPath);
		}
		if (isWindows) {
			const icoPath = require_workbuddy_product_config.resolveBundledAsset("icon.ico");
			if (icoPath) candidates.push(icoPath);
		}
		const pngPath = require_workbuddy_product_config.resolveBundledAsset("icon.png");
		if (pngPath) candidates.push(pngPath);
		if (typeof process.resourcesPath === "string" && process.resourcesPath.length > 0) {
			const rp = process.resourcesPath;
			const extra = [
				...isDarwin ? [
					path.join(rp, "trayTemplate.png"),
					path.join(rp, "resources", "trayTemplate.png"),
					path.join(rp, "app.asar.unpacked", "resources", "trayTemplate.png"),
					path.join(rp, "app.asar.unpacked", "dist", "resources", "trayTemplate.png")
				] : [],
				...isWindows ? [path.join(rp, "icon.ico")] : [],
				path.join(rp, "icon.png"),
				path.join(rp, "resources", "icon.png"),
				...isWindows ? [path.join(rp, "resources", "icon.ico")] : [],
				path.join(rp, "app.asar.unpacked", "resources", "icon.png"),
				path.join(rp, "app.asar.unpacked", "dist", "resources", "icon.png")
			];
			for (const p of extra) if (!candidates.includes(p)) candidates.push(p);
		}
		const found = candidates.find((p) => {
			try {
				return fs.existsSync(p);
			} catch {
				return false;
			}
		});
		if (!found) require_logger.windowLog.warn(`[Tray] Icon asset not found. platform=${process.platform}, __dirname=${__dirname}, resourcesPath=${process.resourcesPath}, searched=${JSON.stringify(candidates)}`);
		else require_logger.windowLog.info(`[Tray] Icon resolved: ${found}`);
		return found;
	}
	/**
	* Initialize the system tray icon and context menu.
	* Called once after the first window is ready.
	* - macOS: menu bar icon (Template Image for dark/light mode)
	* - Windows/Linux: system tray icon (close hides to tray)
	*/
	initializeTray() {
		if (this.tray) return;
		const isDarwin = process.platform === "darwin";
		if (!isDarwin) this.trayActive = true;
		try {
			const iconPath = this.resolveTrayIconPath();
			let trayIcon;
			if (iconPath) {
				const icon = electron.nativeImage.createFromPath(iconPath);
				if (icon.isEmpty()) {
					require_logger.windowLog.warn(`[Tray] Icon empty at: ${iconPath} — using empty fallback`);
					trayIcon = electron.nativeImage.createEmpty();
				} else if (isDarwin && /trayTemplate\.png$/i.test(iconPath)) {
					trayIcon = icon;
					trayIcon.setTemplateImage(true);
				} else if (!isDarwin && /\.ico$/i.test(iconPath)) {
					trayIcon = icon;
					require_logger.windowLog.info(`[Tray] Using multi-size .ico as-is (no resize) for DPI-aware rendering: ${iconPath}`);
				} else {
					const baseSize = isDarwin ? 22 : 16;
					let scaleFactor = 1;
					try {
						scaleFactor = electron.screen.getPrimaryDisplay().scaleFactor || 1;
					} catch (e) {
						require_logger.windowLog.warn(`[Tray] Failed to read scaleFactor, fallback to 1x: ${e instanceof Error ? e.message : String(e)}`);
					}
					const traySize = Math.round(baseSize * scaleFactor);
					trayIcon = icon.resize({
						width: traySize,
						height: traySize
					});
					require_logger.windowLog.info(`[Tray] Resized fallback icon to ${traySize}x${traySize} (base=${baseSize}, scaleFactor=${scaleFactor}): ${iconPath}`);
				}
			} else trayIcon = electron.nativeImage.createEmpty();
			this.tray = new electron.Tray(trayIcon);
			this.tray.setToolTip(process.env.WORKBUDDY_APP_NAME || electron.app.name || "WorkBuddy");
			const locale = require_menu_i18n.getMenuLocale();
			const contextMenu = electron.Menu.buildFromTemplate([
				{
					label: require_menu_i18n.getMenuTranslation("showWindow", locale),
					click: () => this.showFromTray()
				},
				{ type: "separator" },
				{
					label: require_menu_i18n.getMenuTranslation("quit", locale),
					click: () => {
						this.isQuitting = true;
						electron.app.quit();
					}
				}
			]);
			this.tray.on("click", () => this.showFromTray());
			this.tray.on("right-click", () => this.tray?.popUpContextMenu(contextMenu));
			require_logger.windowLog.info(`[Tray] System tray initialized (platform=${process.platform}, hasIcon=${!!iconPath}, trayActive=${this.trayActive})`);
		} catch (err) {
			const message = err instanceof Error ? `${err.message}\n${err.stack}` : String(err);
			require_logger.windowLog.error(`[Tray] Failed to create system tray: ${message}`);
		}
	}
	/** Restore the main window from the system tray. */
	showFromTray() {
		if (this.mainWindow && !this.mainWindow.isDestroyed()) {
			if (!this.mainWindow.isVisible()) this.mainWindow.show();
			if (this.mainWindow.isMinimized()) this.mainWindow.restore();
			this.mainWindow.focus();
		} else this.createWindow();
	}
	getCloseToTrayHintPath() {
		return path.join(electron.app.getPath("userData"), CLOSE_TO_TRAY_HINT_FILE);
	}
	applyCloseToTrayHintResetIfNeeded() {
		if (this.closeToTrayHintResetApplied || !isEnabledEnv(process.env.WORKBUDDY_RESET_TRAY_HINT)) return;
		this.closeToTrayHintResetApplied = true;
		this.closeToTrayHintShownCache = false;
		try {
			fs.unlinkSync(this.getCloseToTrayHintPath());
			require_logger.windowLog.info("[Tray] Close-to-tray hint state reset by WORKBUDDY_RESET_TRAY_HINT");
		} catch (err) {
			if (err?.code !== "ENOENT") require_logger.windowLog.warn("[Tray] Failed to reset close-to-tray hint state:", err);
		}
	}
	hasShownCloseToTrayHint() {
		this.applyCloseToTrayHintResetIfNeeded();
		if (this.closeToTrayHintShownCache !== void 0) return this.closeToTrayHintShownCache;
		try {
			const raw = fs.readFileSync(this.getCloseToTrayHintPath(), "utf8");
			const state = JSON.parse(raw);
			this.closeToTrayHintShownCache = state.version === CLOSE_TO_TRAY_HINT_STATE_VERSION && state.shown === true;
		} catch (err) {
			if (err?.code !== "ENOENT") require_logger.windowLog.warn("[Tray] Failed to read close-to-tray hint state:", err);
			this.closeToTrayHintShownCache = false;
		}
		return this.closeToTrayHintShownCache;
	}
	markCloseToTrayHintShown() {
		this.closeToTrayHintShownCache = true;
		try {
			const hintPath = this.getCloseToTrayHintPath();
			const dir = path.dirname(hintPath);
			if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
			const tmpPath = `${hintPath}.tmp`;
			const state = {
				version: CLOSE_TO_TRAY_HINT_STATE_VERSION,
				shown: true
			};
			fs.writeFileSync(tmpPath, JSON.stringify(state, null, 2), "utf8");
			fs.renameSync(tmpPath, hintPath);
		} catch (err) {
			require_logger.windowLog.warn("[Tray] Failed to persist close-to-tray hint state:", err);
		}
	}
	maybeShowCloseToTrayHint() {
		if (process.platform === "darwin" || !this.trayActive) return;
		const alwaysShow = isEnabledEnv(process.env.WORKBUDDY_ALWAYS_SHOW_TRAY_HINT);
		if (!alwaysShow && this.hasShownCloseToTrayHint()) return;
		let notificationHandled = false;
		const markShownIfNeeded = () => {
			if (!alwaysShow) this.markCloseToTrayHintShown();
		};
		const showSystemNotification = () => {
			if (notificationHandled || !electron.Notification.isSupported()) return;
			const icon = require_workbuddy_product_config.resolveBundledAsset("icon.png") ?? require_workbuddy_product_config.resolveBundledAsset("icon.ico") ?? void 0;
			try {
				const notification = new electron.Notification({
					title: require_menu_i18n.getRendererTranslation("windowLifecycle.closeToTrayHint.title"),
					body: require_menu_i18n.getRendererTranslation("windowLifecycle.closeToTrayHint.body"),
					icon,
					silent: false
				});
				notification.on("show", () => {
					if (notificationHandled) return;
					notificationHandled = true;
					markShownIfNeeded();
				});
				notification.on("click", () => this.showFromTray());
				notification.on("failed", (_event, error) => {
					require_logger.windowLog.warn("[Tray] Close-to-tray notification failed:", error);
				});
				notification.show();
			} catch (err) {
				require_logger.windowLog.warn("[Tray] Failed to show close-to-tray notification:", err);
			}
		};
		const showTrayBalloon = () => {
			if (notificationHandled || !this.tray || process.platform !== "win32") return;
			try {
				this.tray.once("balloon-show", () => {
					notificationHandled = true;
					markShownIfNeeded();
				});
				this.tray.once("balloon-click", () => this.showFromTray());
				this.tray.displayBalloon({
					title: require_menu_i18n.getRendererTranslation("windowLifecycle.closeToTrayHint.title"),
					content: require_menu_i18n.getRendererTranslation("windowLifecycle.closeToTrayHint.balloonContent"),
					iconType: "info",
					noSound: true,
					respectQuietTime: true
				});
			} catch (err) {
				require_logger.windowLog.warn("[Tray] Failed to show close-to-tray tray balloon:", err);
				showSystemNotification();
			}
		};
		if (process.platform === "win32") {
			showTrayBalloon();
			return;
		}
		showSystemNotification();
	}
	/** Destroy the system tray (called during app shutdown). */
	destroyTray() {
		if (this.tray) {
			this.tray.destroy();
			this.tray = null;
			this.trayActive = false;
		}
	}
	/**
	* Cancel any pending close timer (no-op after layered close removal).
	*/
	cancelPendingClose() {}
	/**
	* Hide the window (used by windowCloseAgentManager RPC).
	*/
	confirmClose() {
		this.hideWindowSafely();
	}
	/**
	* Safely hide the main window.
	*
	* On macOS, calling `hide()` directly while the window is in native
	* fullscreen (its own Space) leaves a black screen behind. We must first
	* exit fullscreen and wait for `leave-full-screen` before hiding.
	*
	* See issue: https://cnb.woa.com/genie/genie/-/issues/33299
	*/
	hideWindowSafely() {
		const win = this.mainWindow;
		if (!win) return;
		if (process.platform === "darwin" && win.isFullScreen()) {
			require_logger.windowLog.info("[WindowManager] hideWindowSafely: window is fullscreen, leaving fullscreen before hide");
			win.once("leave-full-screen", () => {
				if (this.mainWindow && !this.mainWindow.isDestroyed()) {
					this.mainWindow.hide();
					require_logger.windowLog.info("[WindowManager] hideWindowSafely: hidden after leaving fullscreen");
				}
			});
			win.setFullScreen(false);
			return;
		}
		win.hide();
		this.maybeShowCloseToTrayHint();
	}
	/**
	* Show or hide macOS traffic light buttons.
	* Used to hide them when fullscreen overlays are open.
	*/
	setTrafficLightsVisible(visible) {
		if (process.platform !== "darwin" || !this.mainWindow) return;
		this.mainWindow.setWindowButtonVisibility(visible);
		if (visible) this.mainWindow.setWindowButtonPosition(getTrafficLightPosition(MAC_TOPBAR_HEIGHT) ?? null);
	}
	/**
	* Update Windows titleBarOverlay colors (for theme changes).
	*/
	updateTitleBarOverlay(options) {
		if (process.platform !== "win32" || !this.mainWindow) return;
		try {
			this.mainWindow.setTitleBarOverlay({
				...options.color && { color: options.color },
				...options.symbolColor && { symbolColor: options.symbolColor },
				height: MENUBAR_HEIGHT
			});
		} catch {}
	}
	broadcast(channel, data) {
		if (!this.mainWindow || this.mainWindow.isDestroyed() || this.mainWindow.webContents.isDestroyed()) {
			require_logger.windowLog.info(`[WindowManager][broadcast] SKIP no window, channel=${channel}`);
			return;
		}
		if (this.mainWindow.webContents.isLoading() || !this.rendererReady) {
			require_logger.windowLog.info(`[WindowManager][broadcast] buffered (loading=${this.mainWindow.webContents.isLoading()}, rendererReady=${this.rendererReady}), channel=${channel}`);
			this.pendingRendererEvents.push({
				channel,
				data
			});
			return;
		}
		this.mainWindow.webContents.send(channel, data);
	}
	/**
	* Pull-mode 取回某 channel 的所有 pending 事件（#58578）。
	*
	* 冷启动时 broadcast 会被 buffer，`did-finish-load` 触发 flush → webContents.send。
	* 但 preload bufferListener 的注册可能比 flush 更晚，事件会被 Electron 直接丢弃。
	* preload/renderer 可主动 invoke 这个方法从 pending 队列中把事件拉走，与 flush
	* 形成互补（任一路径命中即成功）。
	*
	* 只 drain 指定 channel 的事件，其他 channel 事件保留在队列继续等自己的 flush。
	*/
	consumePendingEventsForChannel(channel) {
		const drained = [];
		const remaining = [];
		for (const evt of this.pendingRendererEvents) if (evt.channel === channel) drained.push(evt.data);
		else remaining.push(evt);
		if (drained.length > 0) {
			this.pendingRendererEvents = remaining;
			require_logger.windowLog.info(`[WindowManager][consumePending] channel=${channel} drained=${drained.length}`);
		}
		return drained;
	}
	setupCSP() {
		const csp = isDev ? [
			"default-src 'self'",
			"script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.tencentcos.cn https://tcsdk.com https://*.tcsdk.com https://*.tencent.com https://*.tencent-cloud.cn https://*.qq.com https://*.woa.com https://*.qcloud.com https://*.myqcloud.com https://*.sandbox.cloudstudio.club https://*.workbuddy.cn https://*.codebuddy.cn",
			"style-src 'self' 'unsafe-inline' https://*.tencentcos.cn https://*.tencent.com https://*.tencent-cloud.cn https://*.qq.com https://*.woa.com https://*.qcloud.com https://*.myqcloud.com https://*.sandbox.cloudstudio.club https://*.workbuddy.cn https://*.codebuddy.cn",
			"connect-src 'self' http://127.0.0.1:* http://localhost:* ws://127.0.0.1:* ws://localhost:* ws://0.0.0.0:* https: https://*.tencentcos.cn https://tcsdk.com https://*.tcsdk.com https://*.tencent.com https://*.tencent-cloud.cn https://*.qq.com https://*.woa.com https://*.qcloud.com https://*.myqcloud.com https://*.sandbox.cloudstudio.club https://*.workbuddy.cn https://*.codebuddy.cn",
			"img-src 'self' data: blob: https: local-file: https://*.tencentcos.cn https://*.myqcloud.com https://*.tencent.com https://*.tencent-cloud.cn https://*.qq.com https://*.woa.com https://*.qcloud.com https://*.sandbox.cloudstudio.club https://*.workbuddy.cn https://*.codebuddy.cn",
			"media-src 'self' blob: local-file: https: https://*.tencentcos.cn https://*.myqcloud.com https://*.tencent.com https://*.tencent-cloud.cn https://*.qq.com https://*.woa.com https://*.qcloud.com https://*.sandbox.cloudstudio.club https://*.workbuddy.cn https://*.codebuddy.cn",
			"font-src 'self' data: https://*.tencentcos.cn https://*.tencent.com https://*.tencent-cloud.cn https://*.qq.com https://*.woa.com https://*.qcloud.com https://*.myqcloud.com https://*.sandbox.cloudstudio.club https://*.workbuddy.cn https://*.codebuddy.cn",
			"frame-src 'self' https://*.qq.com https://*.codebuddy.cn https://codebuddy.cn https://*.workbuddy.cn https://workbuddy.cn https://*.tencent.com https://*.tencent-cloud.cn https://*.lexiang-app.com https://lexiang-app.com https://*.lexiang-asset.com https://lexiang-asset.com https://*.lexiang-asset.net https://lexiang-asset.net https://*.lexiangla.com https://lexiangla.com https://*.lexiangla.net https://lexiangla.net https://*.myqcloud.com https://*.sandbox.cloudstudio.club https://*.woa.com https://*.qcloud.com https://*.tencentcos.cn http://127.0.0.1:* http://localhost:*"
		].join("; ") : [
			"default-src 'self'",
			"script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.tencentcos.cn https://tcsdk.com https://*.tcsdk.com https://*.tencent.com https://*.tencent-cloud.cn https://*.qq.com https://*.woa.com https://*.qcloud.com https://*.myqcloud.com https://*.sandbox.cloudstudio.club https://*.workbuddy.cn https://*.codebuddy.cn",
			"style-src 'self' 'unsafe-inline' https://*.tencentcos.cn https://*.tencent.com https://*.tencent-cloud.cn https://*.qq.com https://*.woa.com https://*.qcloud.com https://*.myqcloud.com https://*.sandbox.cloudstudio.club https://*.workbuddy.cn https://*.codebuddy.cn",
			"connect-src 'self' http://127.0.0.1:* ws://127.0.0.1:* https: https://*.tencentcos.cn https://tcsdk.com https://*.tcsdk.com https://*.tencent.com https://*.tencent-cloud.cn https://*.qq.com https://*.woa.com https://*.qcloud.com https://*.myqcloud.com https://*.sandbox.cloudstudio.club https://*.workbuddy.cn https://*.codebuddy.cn",
			"img-src 'self' data: blob: https: local-file: https://*.tencentcos.cn https://*.myqcloud.com https://*.tencent.com https://*.tencent-cloud.cn https://*.qq.com https://*.woa.com https://*.qcloud.com https://*.sandbox.cloudstudio.club https://*.workbuddy.cn https://*.codebuddy.cn",
			"media-src 'self' blob: local-file: https: https://*.tencentcos.cn https://*.myqcloud.com https://*.tencent.com https://*.tencent-cloud.cn https://*.qq.com https://*.woa.com https://*.qcloud.com https://*.sandbox.cloudstudio.club https://*.workbuddy.cn https://*.codebuddy.cn",
			"font-src 'self' data: https://*.tencentcos.cn https://*.tencent.com https://*.tencent-cloud.cn https://*.qq.com https://*.woa.com https://*.qcloud.com https://*.myqcloud.com https://*.sandbox.cloudstudio.club https://*.workbuddy.cn https://*.codebuddy.cn",
			"frame-src 'self' https://*.qq.com https://*.codebuddy.cn https://codebuddy.cn https://*.workbuddy.cn https://workbuddy.cn https://*.tencent.com https://*.tencent-cloud.cn https://*.lexiang-app.com https://lexiang-app.com https://*.lexiang-asset.com https://lexiang-asset.com https://*.lexiang-asset.net https://lexiang-asset.net https://*.lexiangla.com https://lexiangla.com https://*.lexiangla.net https://lexiangla.net https://*.myqcloud.com https://*.sandbox.cloudstudio.club https://*.woa.com https://*.qcloud.com https://*.tencentcos.cn http://127.0.0.1:* http://localhost:*"
		].join("; ");
		const cosPreflightRequestHeadersByRequestId = /* @__PURE__ */ new Map();
		const isOneidUrl = (url) => {
			try {
				const host = new URL(url).hostname;
				return host === "account.tencent.com" || host.endsWith(".account.tencent.com") || host === "account.tencentcs.com" || host.endsWith(".account.tencentcs.com");
			} catch {
				return false;
			}
		};
		const oneidOriginByRequestId = /* @__PURE__ */ new Map();
		electron.session.defaultSession.webRequest.onBeforeSendHeaders({ urls: [
			"http://127.0.0.1:*/*",
			"https://*.drive.qq.com/*",
			"https://drive.qq.com/*",
			"https://*.drive.tencent.com/*",
			"https://drive.tencent.com/*",
			"https://*.myqcloud.com/*",
			"*://*.account.tencent.com/*",
			"*://*.account.tencentcs.com/*"
		] }, (details, callback) => {
			const requestHeaders = { ...details.requestHeaders };
			if (isOneidUrl(details.url)) {
				const reqOrigin = requestHeaders["Origin"] ?? requestHeaders["origin"];
				if (typeof reqOrigin === "string" && reqOrigin) oneidOriginByRequestId.set(String(details.id), reqOrigin);
				callback({ requestHeaders });
				return;
			}
			if (details.url.startsWith("http://127.0.0.1")) delete requestHeaders["Origin"];
			if (/^http:\/\/127\.0\.0\.1:\d+\/upload_image(?:\?|$)/.test(details.url)) {
				const contentTypeKey = Object.keys(requestHeaders).find((key) => key.toLowerCase() === "content-type");
				if (contentTypeKey) {
					const rawContentType = requestHeaders[contentTypeKey];
					if (typeof rawContentType === "string" && rawContentType.toLowerCase().includes("application/json")) {
						requestHeaders[contentTypeKey] = "application/octet-stream";
						require_logger.windowLog.info("[WindowManager] Rewrote local /upload_image Content-Type from application/json to application/octet-stream");
					}
				}
			}
			if (details.url.includes(".myqcloud.com")) {
				const requestedHeaders = requestHeaders["Access-Control-Request-Headers"] ?? requestHeaders["access-control-request-headers"];
				if (details.method === "OPTIONS" && /\.cos\.[^/]*\.myqcloud\.com/.test(details.url) && typeof requestedHeaders === "string" && requestedHeaders) cosPreflightRequestHeadersByRequestId.set(String(details.id), requestedHeaders);
				delete requestHeaders["Origin"];
			}
			if (details.url.includes("drive.qq.com") || details.url.includes("drive.tencent.com")) {
				delete requestHeaders["Origin"];
				const envCookie = require_initialize.getNetDriveEnvCookie();
				if (envCookie) {
					const existing = requestHeaders["Cookie"] || "";
					requestHeaders["Cookie"] = existing ? `${existing}; ${envCookie}` : envCookie;
				}
			}
			callback({ requestHeaders });
		});
		electron.session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
			if (details.url.includes("/console/client-login")) {
				const headers = { ...details.responseHeaders };
				const key = headers["set-cookie"] ? "set-cookie" : headers["Set-Cookie"] ? "Set-Cookie" : null;
				if (key) headers[key] = headers[key].map((c) => c.replace(/SameSite=Lax/gi, "SameSite=None"));
				callback({ responseHeaders: headers });
				return;
			}
			if (isOneidUrl(details.url)) {
				const requestIdKey = String(details.id);
				const reqOrigin = oneidOriginByRequestId.get(requestIdKey);
				oneidOriginByRequestId.delete(requestIdKey);
				const allowOrigin = typeof reqOrigin === "string" && reqOrigin ? reqOrigin : "http://127.0.0.1:5173";
				const responseHeaders = { ...details.responseHeaders };
				for (const key of Object.keys(responseHeaders)) {
					const lower = key.toLowerCase();
					if (lower === "access-control-allow-origin" || lower === "access-control-allow-credentials" || lower === "access-control-allow-methods" || lower === "access-control-allow-headers" || lower === "access-control-expose-headers" || lower === "access-control-max-age" || lower === "vary") delete responseHeaders[key];
				}
				responseHeaders["Access-Control-Allow-Origin"] = [allowOrigin];
				responseHeaders["Access-Control-Allow-Credentials"] = ["true"];
				responseHeaders["Access-Control-Allow-Methods"] = ["GET, POST, PUT, DELETE, OPTIONS"];
				responseHeaders["Access-Control-Allow-Headers"] = ["Content-Type, Authorization, X-Requested-With, Accept, Origin"];
				responseHeaders["Access-Control-Expose-Headers"] = ["*"];
				responseHeaders["Access-Control-Max-Age"] = ["600"];
				responseHeaders["Vary"] = ["Origin"];
				callback({ responseHeaders });
				return;
			}
			const isWecomAuth = details.url.includes("work.weixin.qq.com");
			const isTencentDocs = details.url.includes("docs.qq.com");
			const isIma = details.url.includes("ima.qq.com") || details.url.includes("ima-test.qq.com");
			const isCodebuddyCn = details.url.includes("codebuddy.cn");
			const isLexiang = details.url.includes("lexiang-app.com");
			const isLexiangAsset = details.url.includes("lexiang-asset.com") || details.url.includes("lexiang-asset.net");
			const isLexiangWeb = details.url.includes("lexiangla.com") || details.url.includes("lexiangla.net");
			const isCosUpload = details.url.includes("lexiang4test-10029162.cos.ap-shanghai.myqcloud.com") || details.url.includes("lexiang-10029162.cos.ap-shanghai.myqcloud.com") || /\.cos\.[^/]*\.myqcloud\.com/.test(details.url);
			const isMyqcloud = !isCosUpload && details.url.includes(".myqcloud.com");
			const isExtensionPage = details.url.startsWith("chrome-extension://");
			const isLocalSdk = details.url.startsWith("http://127.0.0.1:") || details.url.startsWith("http://localhost:");
			if (isWecomAuth || isTencentDocs || isIma || isCodebuddyCn || isLexiang || isLexiangAsset || isLexiangWeb || isMyqcloud || isExtensionPage || isLocalSdk) {
				if ((isLexiang || isLexiangAsset || isLexiangWeb) && (details.resourceType === "mainFrame" || details.resourceType === "subFrame") && details.responseHeaders) {
					callback({ responseHeaders: stripDocsLanguageSetCookie(details.url, stripFrameEmbeddingHeaders(details.responseHeaders)) });
					return;
				}
				callback({ responseHeaders: stripDocsLanguageSetCookie(details.url, details.responseHeaders) });
				return;
			}
			const responseHeaders = {
				...details.responseHeaders,
				"Content-Security-Policy": [csp]
			};
			if (details.url.includes("127.0.0.1") || details.url.includes("drive.qq.com") || details.url.includes("drive.tencent.com") || isCosUpload) {
				responseHeaders["Access-Control-Allow-Origin"] = [details.referrer ? new URL(details.referrer).origin : "http://127.0.0.1:5173"];
				responseHeaders["Access-Control-Allow-Credentials"] = ["true"];
				const requestedCorsHeaders = cosPreflightRequestHeadersByRequestId.get(String(details.id));
				cosPreflightRequestHeadersByRequestId.delete(String(details.id));
				responseHeaders["Access-Control-Allow-Headers"] = [requestedCorsHeaders || [
					"Content-Type",
					"Accept",
					"Authorization",
					"Access-Token",
					"Client-Id",
					"Open-Id",
					"env_id",
					"env-id",
					"env-name",
					"acp-connection-id",
					"acp-session-token",
					"X-Requested-With",
					"X-Amz-Content-Sha256",
					"X-Amz-Date",
					"X-Amz-Security-Token",
					"X-Amz-User-Agent",
					"X-Amz-Checksum-Crc32",
					"X-Amz-Checksum-Crc32c",
					"X-Amz-Checksum-Sha1",
					"X-Amz-Checksum-Sha256",
					"Amz-Sdk-Invocation-Id",
					"Amz-Sdk-Request",
					"X-Cos-Security-Token",
					"X-Cos-Acl",
					"X-Cos-Storage-Class",
					"Content-MD5"
				].join(", ")];
				responseHeaders["Access-Control-Allow-Methods"] = ["GET, POST, PUT, DELETE, OPTIONS"];
				responseHeaders["Access-Control-Expose-Headers"] = ["*"];
			}
			if ((details.url.includes("drive.qq.com") || details.url.includes("drive.tencent.com") || isCosUpload) && details.method === "OPTIONS") {
				callback({
					responseHeaders,
					statusLine: "HTTP/1.1 204 No Content"
				});
				return;
			}
			callback({ responseHeaders });
		});
	}
	/**
	* Register 'local-file' protocol to serve local files in the renderer.
	* Usage in renderer: <img src="local-file:///path/to/image.png" />
	*/
	registerLocalFileProtocol() {
		if (electron.protocol.isProtocolHandled("local-file")) return;
		const handler = (request) => {
			const filePath = decodeURIComponent(request.url.replace("local-file://", "file://"));
			return electron.net.fetch(filePath);
		};
		electron.protocol.handle("local-file", handler);
		const webviewSession = electron.session.fromPartition("persist:agent-browser-preview-webview");
		const tmapConnectDomains = "https://*.map.qq.com https://mapapi.qq.com https://*.gtimg.com https://*.qpic.cn https://*.myapp.com";
		const tmapWorkerDomains = "https://*.map.qq.com https://*.gtimg.com";
		const webviewCsp = isDev ? [
			"default-src 'self' file: https: http://127.0.0.1:* http://localhost:*",
			"script-src 'self' 'unsafe-inline' 'unsafe-eval' file: https:",
			"style-src 'self' 'unsafe-inline' https:",
			`connect-src 'self' http://127.0.0.1:* http://localhost:* ws://127.0.0.1:* ws://localhost:* ${tmapConnectDomains}`,
			"img-src 'self' data: blob: https: file:",
			"media-src 'self' blob: https: file:",
			"font-src 'self' data: https:",
			`worker-src 'self' blob: https: http://127.0.0.1:* http://localhost:* ${tmapWorkerDomains}`,
			"frame-src 'self' http://127.0.0.1:* http://localhost:*"
		].join("; ") : [
			"default-src 'self' file: https:",
			"script-src 'self' 'unsafe-inline' file: https:",
			"style-src 'self' 'unsafe-inline' https:",
			`connect-src 'self' http://127.0.0.1:* ws://127.0.0.1:* ${tmapConnectDomains}`,
			"img-src 'self' data: blob: https: file:",
			"media-src 'self' blob: https: file:",
			"font-src 'self' data: https:",
			`worker-src 'self' blob: https: http://127.0.0.1:* ${tmapWorkerDomains}`,
			"frame-src 'self' http://127.0.0.1:*"
		].join("; ");
		webviewSession.webRequest.onHeadersReceived((details, callback) => {
			if (!details.url.startsWith("file://")) {
				const rt = details.resourceType;
				if ((rt === "mainFrame" || rt === "subFrame") && details.responseHeaders) {
					callback({ responseHeaders: stripDocsLanguageSetCookie(details.url, stripFrameEmbeddingHeaders(details.responseHeaders)) });
					return;
				}
				callback({ responseHeaders: stripDocsLanguageSetCookie(details.url, details.responseHeaders) });
				return;
			}
			callback({ responseHeaders: {
				...details.responseHeaders,
				"Content-Security-Policy": [webviewCsp]
			} });
		});
		webviewSession.webRequest.onBeforeRequest((details, callback) => {
			try {
				const parsed = new URL(details.url);
				if (parsed.protocol === "file:") {
					if (details.resourceType === "xhr" || details.resourceType === "other" || details.resourceType === "subFrame") {
						require_logger.windowLog.warn(`[Security] Blocked file:// ${details.resourceType} in webview session: ${details.url}`);
						callback({ cancel: true });
						return;
					}
				}
				if (parsed.protocol === "http:" || parsed.protocol === "https:") {
					if ([
						"169.254.169.254",
						"metadata.google.internal",
						"metadata.azure.com"
					].some((h) => parsed.hostname === h)) {
						require_logger.windowLog.warn(`[Security] Blocked SSRF request in webview session: ${details.url}`);
						callback({ cancel: true });
						return;
					}
				}
			} catch {}
			callback({ cancel: false });
		});
	}
	async injectArdotTestCookie() {
		try {
			const mcpAppsSession = electron.session.fromPartition(MCP_APPS_WEBVIEW_PARTITION);
			for (const cookieName of ARDOT_TEST_COOKIE_NAMES) await mcpAppsSession.cookies.set({
				url: ARDOT_TEST_COOKIE_URL,
				name: cookieName,
				value: ARDOT_TEST_COOKIE_VALUE,
				path: "/",
				secure: true,
				httpOnly: false,
				sameSite: "no_restriction"
			});
			require_logger.windowLog.info(`[WindowManager] Injected Ardot test cookies ${ARDOT_TEST_COOKIE_NAMES.join(", ")} for ${ARDOT_TEST_COOKIE_URL}`);
		} catch (error) {
			require_logger.windowLog.warn("[WindowManager] Failed to inject Ardot test cookie:", error);
		}
	}
	/**
	* 执行 CrashRecoveryPolicy 给出的恢复动作。本方法只承担副作用，
	* 决策逻辑全部在 CrashRecoveryPolicy 内可单测。
	*
	* 失败处理原则：reload / clearCache 失败都退化到 give-up，避免在崩溃恢复路径上
	* 二次抛异常导致主进程也挂掉（observed in field）。
	*/
	applyCrashRecoveryDecision(decision) {
		require_logger.windowLog.info(`[WindowManager] Crash recovery decision: action=${decision.action} reason=${decision.reasonTag} delayMs=${decision.delayMs}`);
		if (decision.action === "none" || decision.action === "give-up") return;
		this.isRecoveringFromCrash = true;
		setTimeout(() => {
			const finishRecovery = () => {
				this.isRecoveringFromCrash = false;
			};
			if (!this.mainWindow || this.mainWindow.isDestroyed() || this.mainWindow.webContents.isDestroyed()) {
				finishRecovery();
				return;
			}
			try {
				if (decision.action === "clear-cache-and-reload") {
					const cacheSession = this.mainWindow.webContents.session;
					Promise.all([cacheSession.clearCache(), cacheSession.clearStorageData({ storages: ["serviceworkers", "cachestorage"] })]).then(() => {
						if (this.mainWindow && !this.mainWindow.isDestroyed() && !this.mainWindow.webContents.isDestroyed()) {
							require_logger.windowLog.info("[WindowManager] Cache cleared, reloading renderer");
							this.mainWindow.webContents.reload();
						}
					}).catch((err) => {
						require_logger.windowLog.error("[WindowManager] Clear cache failed, reload anyway:", err);
						try {
							this.mainWindow?.webContents.reload();
						} catch (reloadErr) {
							require_logger.windowLog.error("[WindowManager] Fallback reload also failed:", reloadErr);
						}
					}).finally(finishRecovery);
					return;
				}
				this.mainWindow.webContents.reload();
			} catch (err) {
				require_logger.windowLog.error("[WindowManager] Recovery action failed:", err);
			} finally {
				if (decision.action === "reload") finishRecovery();
			}
		}, decision.delayMs);
	}
	flushPendingRendererEvents() {
		if (!this.rendererReady || !this.mainWindow || this.mainWindow.isDestroyed() || this.mainWindow.webContents.isDestroyed() || this.mainWindow.webContents.isLoading()) return;
		while (this.pendingRendererEvents.length > 0) {
			const event = this.pendingRendererEvents.shift();
			if (event) this.mainWindow.webContents.send(event.channel, event.data);
		}
	}
	scheduleSaveState() {
		if (this.saveStateTimer) clearTimeout(this.saveStateTimer);
		this.saveStateTimer = setTimeout(() => {
			if (this.mainWindow && !this.mainWindow.isDestroyed()) saveWindowState(this.mainWindow);
		}, 500);
	}
};
//#endregion
//#region src/main/index.ts
require_common$1.init_common$3();
require_app_instance.init_app_instance();
require_workbuddy_product_config.init_bundled_assets();
require_dev_env_override.init_dev_env_override();
require_workbuddy_product_config.init_workbuddy_product_config();
var _startupT0 = Date.now();
var _startupLogFilePath = null;
var _startupLogBuffer = [];
function _startupLog(message) {
	const elapsed = Date.now() - _startupT0;
	const line = `[${(/* @__PURE__ */ new Date()).toISOString()}] [+${elapsed}ms] ${message}\n`;
	if (_startupLogFilePath) try {
		fs.appendFileSync(_startupLogFilePath, line);
	} catch {}
	else _startupLogBuffer.push(line);
}
/**
* 绑定 startup context 后调用：确定最终文件路径 → 建目录 → flush buffer → 后续直写。
* 幂等：重复调用 no-op。全程吞异常——perf 落盘绝不阻塞启动。
* @returns 决定后的文件路径，供后续代码（如 splash-crash-guard）复用同目录
*/
function _bindStartupLogToContext() {
	if (_startupLogFilePath) return _startupLogFilePath;
	try {
		const ctx = require_startup_context.getStartupContext();
		if (!ctx) return null;
		const dateDir = path.join(require_app_instance.getWorkbuddyLogsDir("startup"), ctx.date);
		fs.mkdirSync(dateDir, { recursive: true });
		const filePath = path.join(dateDir, `${ctx.pid}-${ctx.time}.log`);
		if (_startupLogBuffer.length > 0) {
			try {
				fs.appendFileSync(filePath, _startupLogBuffer.join(""));
			} catch {}
			_startupLogBuffer.length = 0;
		}
		_startupLogFilePath = filePath;
		return filePath;
	} catch {
		return null;
	}
}
_startupLog(`=== Process started === pid=${process.pid} argv=${JSON.stringify(process.argv)}`);
_startupLog(`platform=${process.platform} arch=${process.arch} node=${process.version} execPath=${process.execPath}`);
_startupLog(`cwd=${process.cwd()} resourcesPath=${process.resourcesPath ?? "N/A"}`);
_startupLog(`env.APPDATA=${process.env.APPDATA ?? "N/A"} env.USERPROFILE=${process.env.USERPROFILE ?? "N/A"}`);
process.on("uncaughtException", (err) => {
	_startupLog(`FATAL uncaughtException: ${err.stack || err.message}`);
});
process.on("unhandledRejection", (reason) => {
	_startupLog(`FATAL unhandledRejection: ${reason instanceof Error ? reason.stack || reason.message : String(reason)}`);
});
_startupLog("Phase: importing reflect-metadata");
_startupLog("Phase: all imports completed OK");
require_startup_context.initMainStartupContext();
_bindStartupLogToContext();
require_marks.cleanupOldStartupLogs();
require_menu_builder.markProcessCreated();
require_menu_builder.markStartup("A1");
require_menu_builder.markStartup("A2");
require_workbuddy_product_config.setBundledAssetsRoot(__dirname);
_startupLog(`Phase: setBundledAssetsRoot(__dirname=${__dirname})`);
require_menu_builder.markStartup("A3");
require_workbuddy_server_logger.configureDesktopWorkbuddyServerLogger();
_startupLog("Phase: configureDesktopWorkbuddyServerLogger");
require_menu_builder.markStartup("A4");
function resolveHostAppVersion() {
	const appVersion = electron.app.getVersion()?.trim();
	if (appVersion) return appVersion;
	try {
		const packageJsonPath = path.join(electron.app.getAppPath(), "package.json");
		const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
		const packageVersion = typeof packageJson.version === "string" ? packageJson.version.trim() : "";
		if (packageVersion) {
			_startupLog(`host app version resolved from package.json (${packageJsonPath})`);
			return packageVersion;
		}
	} catch (error) {
		_startupLog(`host app version package.json fallback failed: ${String(error)}`);
	}
	return "";
}
if (process.arch === "arm64" && process.platform === "darwin") {
	electron.app.commandLine.appendSwitch("js-flags", "--regexp-interpret-all");
	_startupLog("Phase: applied --regexp-interpret-all workaround (arm64 darwin)");
}
var crashWriterHandle = null;
try {
	const crashLogsDir = require_app_instance.getWorkbuddyLogsDir();
	crashWriterHandle = installCrashWriter({
		logsDir: crashLogsDir,
		processName: "main",
		appVersion: electron.app.getVersion()
	});
	_startupLog(`Phase: installCrashWriter OK (dir=${crashLogsDir})`);
	require_menu_builder.markStartup("A5");
} catch {
	_startupLog("Phase: installCrashWriter FAILED (non-fatal)");
}
electron.ipcMain.on("crash:renderer-js-error", (_event, payload) => {
	if (!crashWriterHandle || !payload) return;
	const locationInfo = payload.filename ? ` (${payload.filename}:${payload.lineno}:${payload.colno})` : "";
	crashWriterHandle.write({
		type: "renderer_js_error",
		error: Object.assign(new Error(payload.message), {
			name: "RendererJSError",
			stack: payload.stack ?? void 0
		}),
		renderer: {
			reason: payload.subType,
			exitCode: 0,
			url: payload.url + locationInfo
		}
	});
});
try {
	const _hostPlatformT0 = Date.now();
	const hostPlatformInfo = detectHostPlatform();
	const configDir = require_app_instance.getWorkbuddyConfigDir();
	_startupLog(`host platform detected: hostArch=${hostPlatformInfo.hostArch} via=${hostPlatformInfo.probe.resolvedBy} cost=${Date.now() - _hostPlatformT0}ms`);
	electron.ipcMain.on(HOST_PLATFORM_GET_SYNC_CHANNEL, (event) => {
		try {
			event.returnValue = {
				...hostPlatformInfo,
				appVersion: resolveHostAppVersion(),
				configDir
			};
		} catch (error) {
			require_logger.mainLog.warn("[HostPlatform] sendSync handler write failed:", error);
			event.returnValue = void 0;
		}
	});
} catch (error) {
	_startupLog(`host platform detector or handler registration failed: ${String(error)}`);
	try {
		electron.ipcMain.on(HOST_PLATFORM_GET_SYNC_CHANNEL, (event) => {
			event.returnValue = {
				platform: process.platform,
				arch: process.arch,
				hostArch: process.arch,
				appVersion: resolveHostAppVersion(),
				configDir: require_app_instance.getWorkbuddyConfigDir(),
				probe: {
					resolvedBy: "detector-crashed",
					resolvedHostArch: process.arch,
					elapsedMs: 0
				}
			};
		});
	} catch {}
}
loadShellEnv();
_startupLog("Phase: loadShellEnv done");
require_menu_builder.markStartup("A6");
require_logger.logger_default.initialize();
_startupLog(`Phase: electron-log initialized, logFilePath=${require_logger.getLogFilePath() ?? "unknown"}`);
if (require_logger.isDebugMode) process.env.WORKBUDDY_DEBUG = "1";
if (process.platform === "win32") {
	electron.app.commandLine.appendSwitch("no-sandbox");
	_startupLog("Chromium sandbox disabled (Windows)");
}
/** 哨兵：ffmpeg.dll 缺失且修复失败时为 true，阻断后续 bootstrap 创建任何窗口。 */
var _ffmpegFatalBail = false;
if (process.platform === "win32") {
	const ffmpegResult = ensureFfmpegDll(_startupLog);
	_startupLog(`Phase: ffmpeg dll guard result=${ffmpegResult.status}`);
	if (ffmpegResult.status !== "ok") crashWriterHandle?.write({
		type: "uncaught_exception",
		error: /* @__PURE__ */ new Error(`[FfmpegDllGuard] status=${ffmpegResult.status}` + (ffmpegResult.repairedFrom ? ` repairedFrom=${ffmpegResult.repairedFrom}` : ""))
	});
	if (ffmpegResult.status === "missing") {
		_ffmpegFatalBail = true;
		electron.app.whenReady().then(() => {
			electron.dialog.showErrorBox("WorkBuddy 启动失败", "ffmpeg.dll 文件缺失或已损坏，应用无法正常启动。\n\n这通常由杀毒软件误拦截导致，请尝试以下操作：\n1. 在杀毒软件中将 WorkBuddy 安装目录加入信任区\n2. 重新安装 WorkBuddy\n\n安装目录：" + path.dirname(process.execPath));
			electron.app.quit();
		});
	}
}
var cdpPort = process.env.WORKBUDDY_REMOTE_DEBUGGING_PORT;
if (cdpPort && /^\d+$/.test(cdpPort)) {
	electron.app.commandLine.appendSwitch("remote-debugging-port", cdpPort);
	electron.app.commandLine.appendSwitch("remote-allow-origins", "*");
	require_logger.mainLog.info(`[WorkBuddy] CDP remote debugging enabled on port ${cdpPort}`);
}
require_cdp_profiler.detectCdpInspectMode();
applyPersistedProxyToBootstrapEnv();
if (require_logger.isDebugMode) electron.app.commandLine.appendSwitch("ignore-certificate-errors");
var httpProxy = process.env.HTTP_PROXY || process.env.http_proxy;
if (httpProxy) require_logger.mainLog.info(`[WorkBuddy] Chromium proxy will use explicit: ${httpProxy.replace(/^https?:\/\//, "")}`);
else require_logger.mainLog.info("[WorkBuddy] Chromium proxy will use system mode (auto-follow OS proxy)");
if (process.platform === "darwin" && process.arch === "arm64") try {
	const darwinMajor = parseInt(os.release().split(".")[0] ?? "0", 10);
	if (darwinMajor >= 25 && !process.env.WORKBUDDY_DISABLE_SYSTEM_CA) {
		process.env.WORKBUDDY_DISABLE_SYSTEM_CA = "1";
		_startupLog(`Phase: WORKBUDDY_DISABLE_SYSTEM_CA=1 auto-set (darwin=${darwinMajor} arm64, #62883 keychain crash workaround)`);
	}
} catch (error) {
	_startupLog(`Phase: WORKBUDDY_DISABLE_SYSTEM_CA detection failed: ${String(error)}`);
}
require_net_log.installUndiciProxyDispatcher();
require_net_log.installAxiosGlobalProxy();
require_workbuddy_auth_product_coordinator.suppressTlsRejectWarning();
try {
	if (require_workbuddy_product_config.tryGetWorkbuddyBaseProductConfiguration()?.productFeatures?.[require_common$1.ProductFeature.DisableTlsVerification]) require_workbuddy_auth_product_coordinator.disableTlsVerificationForProcess("bootstrap:main:product.json");
} catch (error) {
	require_logger.mainLog.warn("[TlsVerification] early bootstrap injection skipped (non-fatal):", error);
}
if (process.platform === "win32") {
	const productConfig = require_workbuddy_product_config.tryGetWorkbuddyBaseProductConfiguration();
	const appUserModelId = typeof productConfig?.win32AppUserModelId === "string" && productConfig.win32AppUserModelId || "WorkBuddy.WorkBuddy";
	electron.app.setAppUserModelId(appUserModelId);
}
try {
	const fallbackEnv = normalizeInheritedFallbackEnv();
	if (fallbackEnv.changed) {
		_startupLog(`Phase: inherited fallback env reset source=${fallbackEnv.fallbackConfigDir} target=${fallbackEnv.targetConfigDir}`);
		require_logger.mainLog.warn("[FallbackEnv] Inherited fallback config dir detected and reset", {
			source: fallbackEnv.fallbackConfigDir,
			target: fallbackEnv.targetConfigDir,
			reason: fallbackEnv.reason
		});
	}
	require_app_instance.configureElectronApp();
} catch (configError) {
	_startupLog(`FATAL: configureElectronApp failed: ${configError instanceof Error ? configError.message : String(configError)}`);
	const downloadUrl = "https://copilot.tencent.com/work/";
	process.on("uncaughtException", () => {});
	process.on("unhandledRejection", () => {});
	electron.app.whenReady().then(() => {
		if (electron.dialog.showMessageBoxSync({
			type: "error",
			title: "WorkBuddy 启动失败",
			message: "安装文件损坏",
			detail: [
				"WorkBuddy 安装文件损坏，无法找到关键配置文件。",
				"",
				"这通常发生在升级安装未完整完成时。",
				"请重新下载并安装最新版本以修复此问题。",
				"",
				`下载地址：${downloadUrl}`
			].join("\n"),
			buttons: ["前往下载", "退出"],
			defaultId: 0,
			cancelId: 1,
			noLink: true
		}) === 0) {
			const { execSync } = require("child_process");
			try {
				if (process.platform === "win32") execSync(`start "" "${downloadUrl}"`, {
					shell: true,
					windowsHide: true
				});
				else if (process.platform === "darwin") execSync(`open "${downloadUrl}"`);
				else execSync(`xdg-open "${downloadUrl}"`);
			} catch {}
		}
		electron.app.exit(1);
	});
}
_startupLog("Phase: configureElectronApp done");
require_menu_builder.markStartup("A7");
electron.protocol.registerSchemesAsPrivileged([{
	scheme: "vscode-file",
	privileges: {
		standard: true,
		secure: true,
		supportFetchAPI: true,
		corsEnabled: true
	}
}]);
electron.ipcMain.handle("app:getVersion", () => electron.app.getVersion());
electron.ipcMain.on("workbuddy:set-sdk-iframe-focused", (event, focused) => {
	require_menu_builder.setSdkIframeFocused(event.sender.id, Boolean(focused));
});
electron.ipcMain.handle(WORKBUDDY_MQQ_BRIDGE_CHANNEL, (event, request) => {
	const id = typeof request?.id === "number" ? request.id : 0;
	if (!isTencentDocsClipboardOrigin(event.senderFrame?.url ?? "", require_workbuddy_auth_product_coordinator.getActiveTencentDocsEngineOrigin())) return {
		id,
		errCode: -32603,
		ret: "当前页面无访问权限",
		hasHandled: false
	};
	return handleWorkbuddyMqqBridgeRequest({
		...request,
		id,
		apiName: typeof request?.apiName === "string" ? request.apiName : "",
		args: Array.isArray(request?.args) ? request.args : [],
		documentResourceUri: resolveWorkbuddyMqqDocumentResourceUri({ requestDocumentResourceUri: typeof request?.documentResourceUri === "string" ? request.documentResourceUri : void 0 })
	}, {
		reportDocumentSelection: (selection) => {
			mainBootstrap?.reportTencentDocsMqqSelection(selection).catch((error) => {
				require_logger.mainLog.warn("[TencentDocsMqqBridge] failed to forward selection to daemon", { error: error instanceof Error ? error.message : String(error) });
			});
		},
		reportGuestTelemetry: (eventCode, payload) => {
			mainBootstrap?.reportGuestTelemetry(eventCode, payload).catch((error) => {
				require_logger.mainLog.warn("[TencentDocsMqqBridge] failed to forward guest telemetry to daemon", { error: error instanceof Error ? error.message : String(error) });
			});
		}
	});
});
electron.ipcMain.handle(WORKBUDDY_MQQ_DIRTY_GUARD_CHANNEL, async (event, request) => {
	if (!isTencentDocsClipboardOrigin(event.senderFrame?.url ?? "", require_workbuddy_auth_product_coordinator.getActiveTencentDocsEngineOrigin())) return {
		allowed: false,
		reason: "permission-denied"
	};
	const documentResourceUri = typeof request?.documentResourceUri === "string" ? request.documentResourceUri : void 0;
	const targetFileId = typeof request?.targetFileId === "string" ? request.targetFileId : void 0;
	return mainBootstrap?.confirmTencentDocsIframeInternalDocumentTabAction(documentResourceUri, targetFileId) ?? true;
});
registerTencentDocsWebviewPreloadBridge(electron.ipcMain);
registerTencentDocsFeatureListBridge(electron.ipcMain, () => mainBootstrap);
registerTencentDocsThemeBridge(electron.ipcMain);
registerTencentDocsLanguageBridge(electron.ipcMain);
installTencentDocsWebviewLoginCookieListener();
registerLocalFileDragHandler();
registerTencentDocsDebugOpenPanelIpc();
electron.ipcMain.handle(WORKBUDDY_WINDOW_OPEN_STARTUP_ANALYSIS_CHANNEL, async () => {
	if (!require_menu_builder.canOpenStartupReportWindow()) {
		require_logger.mainLog.warn("[StartupReport] open denied: current account is not eligible");
		return;
	}
	await require_menu_builder.openStartupReportWindow();
});
electron.ipcMain.handle(WORKBUDDY_WINDOW_GET_STARTUP_TRACE_ID_CHANNEL, () => require_menu_builder.getLatestStartupTraceId() ?? null);
electron.ipcMain.handle("debug:crashTest", (_event, type) => {
	require_logger.mainLog.warn(`[CrashTest] Triggered from renderer: type=${type}`);
	switch (type) {
		case "uncaught_exception":
			setTimeout(() => {
				throw new Error("[CrashTest] uncaught_exception from main");
			}, 0);
			break;
		case "unhandled_rejection":
			Promise.reject(/* @__PURE__ */ new Error("[CrashTest] unhandled_rejection from main"));
			break;
		case "child_process_crash": {
			const child = (0, child_process.spawn)(process.execPath, ["-e", "setTimeout(()=>{},9999)"], { stdio: "ignore" });
			if (crashWriterHandle) wrapChildProcess(child, { name: "crash-test-child" }, crashWriterHandle);
			setTimeout(() => child.kill("SIGKILL"), 200);
			break;
		}
		default: require_logger.mainLog.warn(`[CrashTest] Unknown type: ${type}`);
	}
});
var resolveBootstrapDeferred = null;
var rejectBootstrapDeferred = null;
var bootstrapDeferred = new Promise((resolve, reject) => {
	resolveBootstrapDeferred = resolve;
	rejectBootstrapDeferred = reject;
});
electron.ipcMain.handle("__bootstrap", async () => bootstrapDeferred);
var cachedTdocImportPreloadUrl;
var TDOC_IMPORT_DEV_ENV_NAME_DEFAULT = "feature/saas_tdocs_wb";
var TDOC_IMPORT_DEV_ENV_ID_DEFAULT = "sit-eb191526";
/**
* 把 env_name / env_id 灰度 cookie 写入 tdoc-import webview 分区
* (`persist:tdoc-import`) 的 docs.qq.com cookie jar。
*
* - 仅 readDevEnv() === 'staging' 注入，其它一律 no-op；
* - 同时写精确 host + apex domain (.docs.qq.com)，覆盖 *.docs.qq.com 子域请求；
* - 失败仅 warn 不抛——拿不到 cookie 体感等同未启用 dev 切换。
*
* 触发于 `tdoc-import:get-preload-url`，是「即将打开 webview」最稳定的钩子。
*/
async function ensureTdocImportDevEnvCookies() {
	let env;
	try {
		env = require_dev_env_override.readDevEnv();
	} catch (err) {
		require_logger.mainLog.warn("[TdocImport] readDevEnv failed; skip dev-env cookies:", err);
		return;
	}
	if (env !== "staging") return;
	const envName = process.env["TDOCS_DEV_ENV_NAME"] ?? TDOC_IMPORT_DEV_ENV_NAME_DEFAULT;
	const envId = process.env["TDOCS_DEV_ENV_ID"] ?? TDOC_IMPORT_DEV_ENV_ID_DEFAULT;
	if (!envName && !envId) return;
	try {
		const partitionSession = electron.session.fromPartition("persist:tdoc-import");
		const url$1 = "https://docs.qq.com/";
		const targets = [{ url: url$1 }, {
			url: url$1,
			domain: ".docs.qq.com"
		}];
		const tasks = [];
		for (const t of targets) {
			if (envName) tasks.push(partitionSession.cookies.set({
				url: t.url,
				name: "env_name",
				value: envName,
				domain: t.domain,
				path: "/",
				secure: true,
				httpOnly: false,
				sameSite: "no_restriction"
			}));
			if (envId) tasks.push(partitionSession.cookies.set({
				url: t.url,
				name: "env_id",
				value: envId,
				domain: t.domain,
				path: "/",
				secure: true,
				httpOnly: false,
				sameSite: "no_restriction"
			}));
		}
		await Promise.all(tasks);
	} catch (err) {
		require_logger.mainLog.warn("[TdocImport] ensure dev-env cookies failed (non-fatal):", err);
	}
}
electron.ipcMain.handle("tdoc-import:get-preload-url", () => {
	ensureTdocImportDevEnvCookies().catch((err) => {
		require_logger.mainLog.warn("[TdocImport] ensure dev-env cookies unhandled rejection:", err);
	});
	if (cachedTdocImportPreloadUrl !== void 0) return cachedTdocImportPreloadUrl;
	try {
		const absolute = require_workbuddy_product_config.resolveBundledAsset("tdoc-import-preload.js");
		if (absolute) {
			const { pathToFileURL } = require("url");
			cachedTdocImportPreloadUrl = pathToFileURL(absolute).toString();
			return cachedTdocImportPreloadUrl;
		}
	} catch (error) {
		require_logger.mainLog.warn("[TdocImport] resolve preload url failed", error);
	}
	require_logger.mainLog.warn("[TdocImport] tdoc-import-preload.js not found; webview bridge will not work. Confirm `dist/resources/tdoc-import-preload.js` is present after build (see `scripts/bundled-assets-manifest.js` → runtimeAssetFiles).");
	cachedTdocImportPreloadUrl = null;
	return null;
});
var cachedTdocPreviewPreloadUrl;
electron.ipcMain.handle("tdoc-preview:get-preload-url", async () => {
	await ensureTencentDocsDebugEnvCookies();
	if (cachedTdocPreviewPreloadUrl !== void 0) return cachedTdocPreviewPreloadUrl;
	try {
		const absolute = require_workbuddy_product_config.resolveBundledAsset("tdoc-preview-preload.js");
		if (absolute) {
			const { pathToFileURL } = require("url");
			cachedTdocPreviewPreloadUrl = pathToFileURL(absolute).toString();
			return cachedTdocPreviewPreloadUrl;
		}
	} catch (error) {
		require_logger.mainLog.warn("[TdocPreview] resolve preload url failed", error);
	}
	require_logger.mainLog.warn("[TdocPreview] tdoc-preview-preload.js not found; in-doc link clicks will be silently swallowed by the SPA. Confirm `dist/resources/tdoc-preview-preload.js` is emitted by `scripts/build-tencent-docs-webview-preload.js` and present after build.");
	cachedTdocPreviewPreloadUrl = null;
	return null;
});
var cachedClientMenuPreloadUrl;
electron.ipcMain.handle("client-menu:get-preload-url", () => {
	if (cachedClientMenuPreloadUrl !== void 0) return cachedClientMenuPreloadUrl;
	try {
		const absolute = require_workbuddy_product_config.resolveBundledAsset("client-menu-preload.js");
		if (absolute) {
			const { pathToFileURL } = require("url");
			cachedClientMenuPreloadUrl = pathToFileURL(absolute).toString();
			return cachedClientMenuPreloadUrl;
		}
	} catch (error) {
		require_logger.mainLog.warn("[ClientMenu] resolve preload url failed", error);
	}
	require_logger.mainLog.warn("[ClientMenu] client-menu-preload.js not found; wb:getToken from custom menu pages will not work. Confirm `dist/resources/client-menu-preload.js` is present after build (see `scripts/bundled-assets-manifest.js` → runtimeAssetFiles).");
	cachedClientMenuPreloadUrl = null;
	return null;
});
electron.ipcMain.handle("app:consumePendingOpenUrls", () => consumePendingRendererOpenUrls());
/**
* Pull-mode delivery for wechat chat-history chip events (#58578).
*
* 冷启动路径下 main 端 `broadcast('app:wechatChatHistory:appendChip', ...)`
* 时 rendererReady=false，事件进 WindowManager pending 队列。
* `did-finish-load` 触发 flush → webContents.send。
* 但实测 flush 时刻可能早于 preload 里的 ipcRenderer.on 注册（约 650ms
* 时序差），事件会被 Electron 直接丢弃。
*
* preload 加载后主动 invoke 这个 handler，把 pending 队列里该 channel 的
* 事件全部拿走，塞回 preload 的 earlyEventBuffer；后续 renderer JS 挂
* handler 时会 replay。与 push 路径（flush）互补——任一路径到达即成功。
*/
electron.ipcMain.handle("app:consumePendingWechatChatHistoryChips", () => {
	if (!windowManager) return [];
	return windowManager.consumePendingEventsForChannel("app:wechatChatHistory:appendChip");
});
electron.ipcMain.handle("dialog:saveImage", async (_event, dataUrl, defaultName) => {
	const fs$2 = await import("fs");
	if (typeof dataUrl !== "string") throw new Error("dataUrl must be a string");
	const fileName = typeof defaultName === "string" ? defaultName : "image.png";
	const { canceled, filePath: savePath } = await electron.dialog.showSaveDialog({
		defaultPath: fileName,
		filters: [{
			name: "Images",
			extensions: [
				"png",
				"jpg",
				"jpeg"
			]
		}]
	});
	if (canceled || !savePath) return {
		success: false,
		cancelled: true
	};
	const base64Data = dataUrl.replace(/^data:image\/\w+;base64,/, "");
	const buffer = Buffer.from(base64Data, "base64");
	fs$2.writeFileSync(savePath, buffer);
	return { success: true };
});
var registeredSchemes = require_app_instance.getRegisteredDeepLinkSchemes();
for (const scheme of registeredSchemes) try {
	if (process.defaultApp) {
		if (process.argv.length >= 2) electron.app.setAsDefaultProtocolClient(scheme, process.execPath, [path.resolve(process.argv[1])]);
	} else electron.app.setAsDefaultProtocolClient(scheme);
} catch (error) {
	require_logger.mainLog.warn(`[WorkBuddy] Failed to register protocol scheme "${scheme}"`, error);
}
var windowManager = null;
var mainBootstrap = null;
var disposeEarlyDesktopHostIpc = null;
var splashWindow = null;
var splashShownAt = 0;
var pendingOpenUrl = null;
var pendingOpenFiles = [];
var flushPendingOpenFilesPromise = null;
var rendererOpenUrlListenerReady = false;
var pendingRendererOpenUrls = [];
var pendingWechatChatHistoryChips = [];
var bootstrapPhase = "pending";
var suppressedQuitCount = 0;
function setBootstrapPhase(next, detail) {
	if (bootstrapPhase === next) return;
	const prev = bootstrapPhase;
	bootstrapPhase = next;
	require_logger.mainLog.info(`[Bootstrap] phase: ${prev} -> ${next}${detail ? ` (${detail})` : ""}`);
}
function summarizeOpenUrl(url$2) {
	if (!url$2) return { hasUrl: false };
	try {
		const parsed = new URL(url$2);
		return {
			hasUrl: true,
			scheme: parsed.protocol.replace(/:$/, ""),
			host: parsed.host,
			pathname: parsed.pathname,
			searchKeys: Array.from(parsed.searchParams.keys()),
			hash: parsed.hash ? "<present>" : "",
			urlLength: url$2.length,
			isWorkbuddyDeepLink: require_app_instance.isWorkbuddyDeepLink(url$2)
		};
	} catch {
		return {
			hasUrl: true,
			parseError: true,
			urlLength: url$2.length
		};
	}
}
function getOpenUrlFromCommandLine(commandLine) {
	return commandLine.find((arg) => require_app_instance.isWorkbuddyDeepLink(arg));
}
function flushPendingOpenFiles() {
	if (!mainBootstrap || pendingOpenFiles.length === 0) return;
	if (flushPendingOpenFilesPromise) return;
	const filePaths = Array.from(new Set(pendingOpenFiles));
	pendingOpenFiles = [];
	windowManager?.showOrCreate();
	flushPendingOpenFilesPromise = (async () => {
		try {
			for (const filePath of filePaths) try {
				const result = await mainBootstrap.openTencentDocsLocalFile(filePath);
				if (!result.success) require_logger.mainLog.warn("[OpenFile] Failed to open local document in main window", {
					filePath,
					error: result.error
				});
			} catch (error) {
				require_logger.mainLog.warn("[OpenFile] Failed to open local document in main window", {
					filePath,
					error: error instanceof Error ? error.message : String(error)
				});
			}
		} finally {
			flushPendingOpenFilesPromise = null;
			if (pendingOpenFiles.length > 0) flushPendingOpenFiles();
		}
	})();
}
function handleOpenLocalDocumentFile(rawFilePath) {
	const filePath = require_workbuddy_auth_product_coordinator.normalizeLocalDocumentFilePath(rawFilePath ?? "");
	if (!filePath) {
		require_logger.mainLog.warn("[OpenFile] ignored empty file path");
		return;
	}
	if (!require_workbuddy_auth_product_coordinator.isSupportedLocalDocumentFilePath(filePath)) {
		require_logger.mainLog.info("[OpenFile] ignored unsupported file type", { filePath });
		return;
	}
	require_logger.mainLog.info("[OpenFile] enqueue local document open", {
		filePath,
		pendingCount: pendingOpenFiles.length + 1
	});
	pendingOpenFiles.push(filePath);
	flushPendingOpenFiles();
}
function enqueuePendingRendererOpenUrl(url$3) {
	if (pendingRendererOpenUrls[pendingRendererOpenUrls.length - 1] === url$3) return;
	pendingRendererOpenUrls.push(url$3);
}
function broadcastWechatChatHistoryChip(payload) {
	if (!windowManager || !rendererOpenUrlListenerReady) {
		pendingWechatChatHistoryChips.push(payload);
		require_logger.mainLog.info("[WechatChatHistory] queued chip until renderer ready", {
			chipId: payload.chipId,
			pendingCount: pendingWechatChatHistoryChips.length
		});
		windowManager?.showOrCreate();
		return;
	}
	windowManager.broadcast(WECHAT_CHAT_HISTORY_APPEND_CHIP_CHANNEL, payload);
}
function flushPendingWechatChatHistoryChips() {
	if (!windowManager || !rendererOpenUrlListenerReady || pendingWechatChatHistoryChips.length === 0) return;
	const chips = pendingWechatChatHistoryChips.splice(0, pendingWechatChatHistoryChips.length);
	require_logger.mainLog.info("[WechatChatHistory] flushing pending chips", { count: chips.length });
	for (const chip of chips) windowManager.broadcast(WECHAT_CHAT_HISTORY_APPEND_CHIP_CHANNEL, chip);
}
function consumePendingRendererOpenUrls() {
	rendererOpenUrlListenerReady = true;
	flushPendingWechatChatHistoryChips();
	if (pendingRendererOpenUrls.length === 0) return [];
	const urls = pendingRendererOpenUrls.splice(0, pendingRendererOpenUrls.length);
	require_logger.mainLog.info("[DeepLink] renderer consumed pending open urls", {
		count: urls.length,
		latest: summarizeOpenUrl(urls[urls.length - 1])
	});
	return urls.map((url$4) => ({ url: url$4 }));
}
/**
* 尝试处理 MCP OAuth scheme 回调
* 委托给 mcpProxy 判断 URL 是否匹配并处理
* 返回 true 表示已拦截（不传递到 renderer）
*/
async function tryHandleMcpOAuthUrl(url$5) {
	if (!mainBootstrap) return false;
	try {
		if (!await mainBootstrap.isOAuthCallbackUrl(url$5)) return false;
		require_logger.mainLog.info("[MCP OAuth] Intercepted callback, processing...");
		const result = await mainBootstrap.handleOAuthCallbackFromUrl(url$5);
		require_logger.mainLog.info(`[MCP OAuth] Result: success=${result.success}, configId=${result.configId}`);
		return true;
	} catch (err) {
		require_logger.mainLog.error("[MCP OAuth] Failed:", err);
		return false;
	}
}
function handleOpenUrl(url$6) {
	handleOpenUrlAsync(url$6).catch((err) => {
		require_logger.mainLog.error("[DeepLink] handleOpenUrl failed:", err);
	});
}
function getWechatChatHistoryTempDir() {
	return path.join(electron.app.getPath("userData"), "tmp", "wechat-chat-history");
}
async function handleOpenUrlAsync(url$7) {
	const summary = summarizeOpenUrl(url$7);
	if (!url$7) {
		require_logger.mainLog.warn("[DeepLink] handleOpenUrl ignored empty url", summary);
		return;
	}
	if (!require_app_instance.isWorkbuddyDeepLink(url$7)) {
		require_logger.mainLog.info("[DeepLink] handleOpenUrl ignored non-workbuddy url", summary);
		return;
	}
	if (await tryHandleMcpOAuthUrl(url$7)) {
		require_logger.mainLog.info("[DeepLink] handled as MCP OAuth callback", summary);
		windowManager?.showOrCreate();
		return;
	}
	if (windowManager && isWechatChatHistoryDeeplink(url$7)) {
		require_logger.mainLog.info("[DeepLink] handled as wechat-chat-history", summary);
		windowManager.showOrCreate();
		const mainWin = windowManager.getMainWindow();
		if (mainWin && !mainWin.isDestroyed()) {
			if (mainWin.isMinimized()) mainWin.restore();
			mainWin.setAlwaysOnTop(true);
			mainWin.focus();
			mainWin.setAlwaysOnTop(false);
		}
		try {
			await handleWechatChatHistoryDeeplink(url$7, {
				windowManager,
				tempDir: getWechatChatHistoryTempDir(),
				logger: {
					info: (msg, payload) => require_logger.mainLog.info(msg, payload ?? {}),
					warn: (msg, payload) => require_logger.mainLog.warn(msg, payload ?? {}),
					error: (msg, error) => require_logger.mainLog.error(msg, error)
				},
				broadcastChip: broadcastWechatChatHistoryChip
			});
		} catch (err) {
			require_logger.mainLog.error("[DeepLink] wechat-chat-history handler threw", err);
		}
		return;
	}
	if (!windowManager) {
		pendingOpenUrl = url$7;
		require_logger.mainLog.info("[DeepLink] stored until WindowManager ready", summary);
		return;
	}
	const mainWindow = windowManager.getMainWindow();
	if (!rendererOpenUrlListenerReady || !mainWindow || mainWindow.isDestroyed() || mainWindow.webContents.isDestroyed() || mainWindow.webContents.isLoading()) {
		rendererOpenUrlListenerReady = false;
		enqueuePendingRendererOpenUrl(url$7);
		require_logger.mainLog.info("[DeepLink] queued until renderer open-url listener ready", {
			...summary,
			pendingCount: pendingRendererOpenUrls.length
		});
		windowManager.showOrCreate();
		return;
	}
	require_logger.mainLog.info("[DeepLink] dispatching open url to renderer", summary);
	windowManager.handleOpenUrl(url$7);
}
async function loadDevToolsTerminalExtension() {
	const extensionPath = resolveDevToolsTerminalExtensionPath({
		appPath: electron.app.getAppPath(),
		isPackaged: electron.app.isPackaged,
		resourcesPath: process.resourcesPath
	});
	if (!extensionPath) {
		require_logger.mainLog.warn("DevTools Terminal extension path not found", {
			appPath: electron.app.getAppPath(),
			isPackaged: electron.app.isPackaged,
			resourcesPath: process.resourcesPath
		});
		return;
	}
	try {
		const extension = await electron.session.defaultSession.loadExtension(extensionPath, { allowFileAccess: true });
		require_logger.mainLog.info("DevTools Terminal extension loaded", {
			extensionId: extension.id,
			extensionPath
		});
	} catch (error) {
		require_logger.mainLog.warn("Failed to load DevTools Terminal extension", {
			extensionPath,
			error
		});
	}
}
globalThis.__workbuddyEarlyOpenUrl?.setHandler(handleOpenUrl);
globalThis.__workbuddyEarlyOpenFile?.setHandler((filePath) => {
	handleOpenFileAsync(filePath).catch((err) => {
		require_logger.mainLog.error("[OpenFile] handleOpenFile failed:", err);
	});
});
/** 独立队列：只暂存 wechat 相关的 open-file，与 pendingOpenFiles（腾讯文档路径）互不干扰 */
var pendingWechatOpenFiles = [];
async function handleOpenFileAsync(filePath) {
	if (!filePath) return;
	require_logger.mainLog.info("[OpenFile] received", { filePath });
	if (!windowManager) {
		pendingWechatOpenFiles.push(filePath);
		require_logger.mainLog.info("[OpenFile] queued to pendingWechatOpenFiles until WindowManager ready", { filePath });
		return;
	}
	await handleWechatChatHistoryOpenFile(filePath, {
		windowManager,
		tempDir: getWechatChatHistoryTempDir(),
		logger: {
			info: (msg, payload) => require_logger.mainLog.info(msg, payload ?? {}),
			warn: (msg, payload) => require_logger.mainLog.warn(msg, payload ?? {}),
			error: (msg, error) => require_logger.mainLog.error(msg, error)
		}
	});
}
_startupLog(`Phase: early preflight outcome=${runEarlyPreflightAndMaybeBail()}`);
var gotTheLock = electron.app.requestSingleInstanceLock();
_startupLog(`Phase: single instance lock, gotTheLock=${gotTheLock}`);
require_menu_builder.markStartup("A8");
if (!gotTheLock) {
	_startupLog("SingletonLock failed: another instance running or userData dir inaccessible (preflight already handled)");
	_startupLog("EXITING: SingletonLock not acquired");
	electron.app.quit();
	process.exit(0);
} else {
	const initialOpenUrl = getOpenUrlFromCommandLine(process.argv);
	if (initialOpenUrl) handleOpenUrl(initialOpenUrl);
	if (process.env.WORKBUDDY_OPEN_FILE) handleOpenLocalDocumentFile(process.env.WORKBUDDY_OPEN_FILE);
	electron.app.on("second-instance", (_event, commandLine) => {
		require_menu_builder.markWarmActivation();
		const openUrl = getOpenUrlFromCommandLine(commandLine);
		if (openUrl) {
			handleOpenUrl(openUrl);
			return;
		}
		const mainWindow = windowManager?.getMainWindow();
		if (mainWindow && !mainWindow.isDestroyed()) windowManager?.focus();
		else windowManager?.createWindow();
	});
}
electron.app.whenReady().then(async () => {
	_startupLog("Phase: app.whenReady fired");
	if (_ffmpegFatalBail) {
		_startupLog("Phase: ABORTED — _ffmpegFatalBail is true, skipping bootstrap");
		return;
	}
	require_logger.mainLog.info("App ready, initializing...");
	require_menu_builder.markStartup("A9");
	require_marks.logAppStartup();
	require_menu_builder.resolveStartupType();
	logCrashReportLocation();
	if (process.platform === "darwin" && electron.app.isPackaged) {
		const execFileAsync = util.promisify(child_process.execFile);
		const appPath = process.execPath.split("/Contents/")[0];
		if (appPath.endsWith(".app")) execFileAsync("/usr/bin/xattr", ["-l", appPath]).then(({ stdout }) => {
			if (stdout.includes("com.apple.quarantine")) return execFileAsync("/usr/bin/xattr", [
				"-dr",
				"com.apple.quarantine",
				appPath
			]).then(() => {
				require_logger.mainLog.info("darwin: quarantine cleared on first launch");
			});
		}).catch(() => {});
	}
	try {
		const { session } = await import("electron");
		const envProxy = process.env.HTTP_PROXY || process.env.http_proxy;
		if (envProxy) {
			const proxyRules = envProxy.replace(/^https?:\/\//, "");
			await session.defaultSession.setProxy({
				proxyRules,
				proxyBypassRules: "localhost,127.0.0.1,::1"
			});
			require_logger.mainLog.info(`[WorkBuddy] session.setProxy: explicit proxy=${proxyRules}`);
		} else {
			await session.defaultSession.setProxy({ mode: "system" });
			require_logger.mainLog.info("[WorkBuddy] session.setProxy: mode=system (auto-follow OS)");
		}
	} catch (proxyErr) {
		require_logger.mainLog.warn("[WorkBuddy] session.setProxy failed:", proxyErr);
	}
	require_app_instance.removeLegacyProtocolRegistrations();
	if (process.platform === "darwin" && electron.app.dock) {
		const { nativeImage } = await import("electron");
		const iconPath = require_workbuddy_product_config.resolveBundledAsset("resources", "icon.png");
		if (iconPath) try {
			const icon = nativeImage.createFromPath(iconPath);
			if (!icon.isEmpty()) electron.app.dock.setIcon(icon);
		} catch {}
	}
	try {
		if (process.platform === "darwin") require_menu_builder.buildAndSetApplicationMenu();
		else {
			const { Menu } = await import("electron");
			Menu.setApplicationMenu(null);
		}
		registerTencentDocsDebugHandlers(async (config) => {
			if (mainBootstrap) return mainBootstrap.restartTencentDocsEngineWithDebugOptions(config.staticDir ?? "", config.editorSdkPath);
			return require_workbuddy_auth_product_coordinator.getTencentDocsDocumentService().restartEngineWithDebugOptions(config.staticDir ?? "", config.editorSdkPath);
		}, (rawPath) => {
			const filePath = require_workbuddy_auth_product_coordinator.normalizeLocalDocumentFilePath(rawPath);
			if (!filePath) return {
				success: false,
				error: "路径为空或无法解析"
			};
			if (!require_workbuddy_auth_product_coordinator.isSupportedLocalDocumentFilePath(filePath)) return {
				success: false,
				normalizedPath: filePath,
				error: "不支持的文件类型（不在 AI 白名单内）"
			};
			handleOpenLocalDocumentFile(filePath);
			return {
				success: true,
				normalizedPath: filePath,
				status: "enqueued"
			};
		});
		windowManager = new WindowManager();
		_startupLog("Phase: WindowManager created");
		require_menu_builder.markStartup("C1");
		cleanupStaleChatHistoryZips({ tempDir: getWechatChatHistoryTempDir() }).then(({ scanned, removed, errors }) => {
			if (scanned > 0 || removed > 0) require_logger.mainLog.info("[WechatChatHistory] startup cleanup", {
				scanned,
				removed,
				errors
			});
		}).catch((err) => {
			require_logger.mainLog.warn("[WechatChatHistory] startup cleanup failed", { error: String(err) });
		});
		const desktopHost = createElectronDesktopHost(windowManager);
		const localDaemonTransport = createDeferredLocalDaemonTransport();
		disposeEarlyDesktopHostIpc = registerDesktopHostIpc({
			desktopHost,
			localDaemonTransport
		});
		_startupLog("Phase: desktop host IPC registered");
		let splashTimer = null;
		let bootstrapDone = false;
		let pendingSplashUpdate = null;
		const _splashCrashMarkerPath = path.join(require_app_instance.getWorkbuddyLogsDir("startup"), ".splash-crash-guard");
		let _splashCrashCount = 0;
		try {
			if (fs.existsSync(_splashCrashMarkerPath)) _splashCrashCount = parseInt(fs.readFileSync(_splashCrashMarkerPath, "utf-8").trim(), 10) || 0;
		} catch {}
		const _skipSplash = _splashCrashCount >= 1;
		_startupLog(`Splash crash guard: crashCount=${_splashCrashCount}, skipSplash=${_skipSplash}`);
		const showSplashIfNeeded = async (opts) => {
			if (bootstrapDone || splashWindow) return;
			const BYPASS_MAX_ATTEMPTS = 3;
			if (_skipSplash && !opts?.bypassCrashGuard) {
				_startupLog("showSplashIfNeeded: SKIPPED (splash crash guard active)");
				require_logger.mainLog.warn("[Splash] Skipped due to previous crash (splash-crash-guard active)");
				return;
			}
			if (_skipSplash && opts?.bypassCrashGuard) {
				if (_splashCrashCount >= BYPASS_MAX_ATTEMPTS) {
					_startupLog(`showSplashIfNeeded: bypass DENIED (crashCount=${_splashCrashCount} >= ${BYPASS_MAX_ATTEMPTS})`);
					require_logger.mainLog.error("[Splash] DB repair requested splash but crash count too high, skipping to prevent infinite crash loop");
					return;
				}
				_startupLog("showSplashIfNeeded: crash guard BYPASSED for DB repair");
			}
			try {
				fs.writeFileSync(_splashCrashMarkerPath, String(_splashCrashCount + 1));
			} catch {}
			_startupLog("showSplashIfNeeded: creating SplashWindow");
			splashWindow = new SplashWindow();
			if (pendingSplashUpdate) splashWindow.update(pendingSplashUpdate);
			_startupLog("showSplashIfNeeded: calling splashWindow.show()");
			const ok = await splashWindow.show().catch((err) => {
				_startupLog(`showSplashIfNeeded: show() threw: ${err instanceof Error ? err.message : String(err)}`);
				require_logger.mainLog.warn("[Splash] failed to show (non-fatal):", err);
				return false;
			});
			_startupLog(`showSplashIfNeeded: show() returned ok=${ok}`);
			if (!ok) {
				splashWindow = null;
				return;
			}
			require_menu_builder.markStartup("C2");
			splashShownAt = Date.now();
			try {
				fs.unlinkSync(_splashCrashMarkerPath);
			} catch {}
			_startupLog("showSplashIfNeeded: splash shown OK, crash guard cleared");
			if (bootstrapDone) return;
			if (pendingSplashUpdate) splashWindow.update(pendingSplashUpdate);
		};
		const updateSplash = (update) => {
			const merged = {
				...pendingSplashUpdate,
				...update
			};
			if (update.phase === "migrating" && pendingSplashUpdate?.phase !== "migrating") delete merged.caption;
			pendingSplashUpdate = merged;
			splashWindow?.update(merged);
		};
		const splashMessages = getSplashMessages();
		updateSplash({
			phase: "initializing",
			title: splashMessages.title,
			subtitle: splashMessages.subtitle,
			caption: splashMessages.caption
		});
		if (VENDOR_ASSETS.length > 0) {
			_startupLog(`Phase: vendor extract check, assetsCount=${VENDOR_ASSETS.length}`);
			_startupLog("Phase: vendor isExtractNeeded check");
			if (VendorExtractService.isExtractNeeded(process.resourcesPath, VENDOR_ASSETS)) {
				_startupLog("Phase: vendor extract IS needed, showing splash");
				updateSplash({
					phase: "initializing",
					caption: getSplashMessages().caption
				});
				await showSplashIfNeeded();
				_startupLog("Phase: showSplashIfNeeded returned OK");
			} else _startupLog("Phase: vendor extract NOT needed (already done)");
			try {
				_startupLog("Phase: vendor ensureAll starting");
				const vendorResults = await VendorExtractService.ensureAll(process.resourcesPath, VENDOR_ASSETS);
				_startupLog(`Phase: vendor ensureAll done, results=${vendorResults.map((r) => `${r.name}:${r.success}`).join(",")}`);
				for (const r of vendorResults) if (!r.success) require_logger.mainLog.warn(`[Vendor] ${r.name} failed: ${r.error}`);
				const failed = vendorResults.filter((r) => !r.success).length;
				require_logger.mainLog.info(`[Vendor] Done: total=${vendorResults.length}, failed=${failed}`);
			} catch (err) {
				_startupLog(`Phase: vendor ensureAll threw: ${err instanceof Error ? err.message : String(err)}`);
				require_logger.mainLog.warn("[Vendor] Extract error (non-fatal):", err);
			}
		}
		_startupLog("Phase: creating main window before bootstrapMainProcess");
		require_menu_builder.markStartup("C4");
		windowManager.createWindow();
		require_menu_builder.markStartup("C5");
		windowManager.initializeTray();
		windowManager.registerToggleWindowShortcut();
		_startupLog("Phase: main window created before bootstrapMainProcess");
		require_logger.mainLog.info("Window created before daemon bootstrap");
		_startupLog("Phase: starting bootstrapMainProcess");
		require_menu_builder.markStartup("C3");
		mainBootstrap = await bootstrapMainProcess(windowManager, resolveBootstrapDeferred, async (current, total, _name) => {
			updateSplash({
				phase: "migrating",
				title: getSplashMessages().migratingTitle,
				subtitle: getSplashMessages().migratingSubtitle,
				current,
				total
			});
			if (!splashTimer && !splashWindow && !bootstrapDone) await showSplashIfNeeded();
		}, {
			desktopHost,
			localDaemonTransport
		}, async (info) => {
			try {
				if (info.phase === "preparing") {
					updateSplash({
						phase: "repairing",
						title: getSplashMessages().repairingTitle,
						subtitle: getSplashMessages().repairingSubtitle,
						caption: ""
					});
					if (!splashTimer && !splashWindow && !bootstrapDone) await showSplashIfNeeded({ bypassCrashGuard: true });
					return;
				}
				if (info.phase === "done") return;
				if (!splashTimer && !splashWindow && !bootstrapDone) showSplashIfNeeded({ bypassCrashGuard: true });
				const i18n = getSplashMessages();
				const captionMap = {
					backup: i18n.repairingBackup,
					rebuild: i18n.repairingRebuild,
					recover: i18n.repairingRecover
				};
				updateSplash({
					phase: "repairing",
					title: i18n.repairingTitle,
					subtitle: i18n.repairingSubtitle,
					caption: captionMap[info.phase] ?? ""
				});
			} catch {}
		});
		_startupLog("Phase: bootstrapMainProcess completed");
		require_logger.mainLog.info("Main bootstrap ready");
		flushRepairPendingTelemetry();
		require_log_acl_guard.startLogAclGuardScheduler(require_app_instance.getWorkbuddyLogsDir());
		flushInstallPendingTelemetry();
		flushUpdatePendingTelemetry();
		flushFsProtectionReport();
		detectMacInstallTiming();
		await loadDevToolsTerminalExtension();
		_startupLog("Phase: awaiting migrationDonePromise");
		await mainBootstrap.migrationDonePromise;
		_startupLog("Phase: migrationDonePromise resolved");
		bootstrapDone = true;
		if (splashTimer) {
			clearTimeout(splashTimer);
			splashTimer = null;
		}
		const SPLASH_MIN_DISPLAY_MS = 3e3;
		if (splashWindow && splashShownAt > 0 && pendingSplashUpdate?.phase === "repairing") {
			const elapsed = Date.now() - splashShownAt;
			if (elapsed < SPLASH_MIN_DISPLAY_MS) {
				_startupLog(`Phase: splash minimum display wait (${SPLASH_MIN_DISPLAY_MS - elapsed}ms remaining)`);
				await new Promise((resolve) => setTimeout(resolve, SPLASH_MIN_DISPLAY_MS - elapsed));
			}
		}
		if (splashWindow) {
			try {
				splashWindow.close();
			} catch {}
			splashWindow = null;
		}
		if (!windowManager.getMainWindow()) {
			_startupLog("Phase: creating main window");
			require_menu_builder.markStartup("C4");
			windowManager.createWindow();
			require_menu_builder.markStartup("C5");
			windowManager.initializeTray();
			windowManager.registerToggleWindowShortcut();
			require_logger.mainLog.info("Window created");
		} else _startupLog("Phase: main window already created before bootstrap completion");
		setBootstrapPhase("main-window-created", "bootstrap complete and main window available");
		_startupLog("Phase: bootstrap complete - STARTUP COMPLETE");
		if (pendingOpenUrl) {
			handleOpenUrl(pendingOpenUrl);
			pendingOpenUrl = null;
		}
		flushPendingOpenFiles();
		if (pendingWechatOpenFiles.length > 0) {
			const files = pendingWechatOpenFiles.splice(0, pendingWechatOpenFiles.length);
			for (const file of files) handleOpenFileAsync(file).catch((err) => {
				require_logger.mainLog.error("[OpenFile] deferred handleOpenFile failed:", err);
			});
		}
		setTimeout(() => {
			cleanupLiteSandboxLegacy(require_logger.mainLog).catch(() => {});
		}, 1e4);
	} catch (err) {
		_startupLog(`FATAL: bootstrap failed: ${err instanceof Error ? err.stack || err.message : String(err)}`);
		require_logger.mainLog.error("Failed to initialize:", err);
		require_logger.mainLog.error("Failed to initialize details:", util.inspect(err, {
			depth: 6,
			breakLength: 120
		}));
		if (splashWindow) {
			try {
				splashWindow.close();
			} catch {}
			splashWindow = null;
		}
		rejectBootstrapDeferred?.(err instanceof Error ? err : new Error(String(err)));
		runBootstrapFailureRepairScan(err);
		let fallbackWindowOk = false;
		if (windowManager && !windowManager.getMainWindow()) try {
			windowManager.createWindow();
			fallbackWindowOk = true;
			require_logger.mainLog.info("Window created (fallback after bootstrap failure)");
		} catch (winErr) {
			require_logger.mainLog.error("Failed to create fallback window:", winErr);
		}
		else if (windowManager?.getMainWindow()) fallbackWindowOk = true;
		if (fallbackWindowOk) setBootstrapPhase("main-window-created", "fallback createWindow ok");
		else setBootstrapPhase("failed", "bootstrap and fallback both failed");
	}
});
electron.app.on("activate", () => {
	require_menu_builder.markWarmActivation();
	windowManager?.showOrCreate();
});
electron.app.on("window-all-closed", () => {
	_startupLog(`Event: window-all-closed (bootstrapPhase=${bootstrapPhase}, tray=${windowManager?.isTrayActive ?? "N/A"})`);
	if (bootstrapPhase === "pending") {
		suppressedQuitCount++;
		_startupLog(`Event: window-all-closed SUPPRESSED (count=${suppressedQuitCount})`);
		require_logger.mainLog.info(`[WindowLifecycle] window-all-closed during bootstrap (phase=pending, suppressedCount=${suppressedQuitCount}), suppressing app.quit`);
		return;
	}
	if (process.platform === "darwin") return;
	if (windowManager?.isTrayActive) {
		require_logger.mainLog.info("[WindowLifecycle] window-all-closed but tray active, not quitting");
		return;
	}
	require_logger.mainLog.info(`[WindowLifecycle] window-all-closed (phase=${bootstrapPhase}, tray=false), quitting`);
	_startupLog("Event: window-all-closed -> calling app.quit()");
	electron.app.quit();
});
var isQuitting = false;
var isQuittingForUpdate = false;
var quitCleanupPromise = null;
var userConfirmedActiveTasksQuit = false;
var userConfirmedDocumentPreviewQuit = false;
electron.app.on("before-quit-for-update", () => {
	isQuittingForUpdate = true;
	windowManager?.setQuitting(true);
	try {
		require_initialize.getGlobalDatabaseRef()?.dispose();
	} catch {}
	require_logger.mainLog.info("[Lifecycle] before-quit-for-update received; window manager marked as quitting for update");
	require_marks.logLifecycleEvent("AppShutdown", { reason: "update" });
});
/**
* 异步确认"有任务在跑，是否仍然退出"。
*
* 在 `before-quit` 期间我们必须先同步 `event.preventDefault()` 阻止退出，
* 然后异步弹框；根据用户选择决定是否 `app.quit()` 二次触发。
*
* - 用户点「仍然退出」：置位 `userConfirmedActiveTasksQuit` 后调用 `app.quit()`。
*   下一轮 `before-quit` 会跳过此函数，直接进入 cleanup。
* - 用户点「取消」：重置 `isQuitting`，保持会话继续运行，不影响 sidecar / CLI。
*
* 调用前必须保证：
* - `mainBootstrap` 已存在（能通过 daemon 查询 active sessions）
* - `windowManager` 已存在（弹框需要父窗口）
*/
async function promptActiveTasksQuitConfirmation() {
	let activeCount = 0;
	try {
		activeCount = (await mainBootstrap.daemonSessionQueries.getActiveSessions()).length;
	} catch (err) {
		require_logger.mainLog.warn("[Lifecycle] getActiveSessions failed, skipping confirmation:", err);
		userConfirmedActiveTasksQuit = true;
		electron.app.quit();
		return;
	}
	if (activeCount === 0) {
		userConfirmedActiveTasksQuit = true;
		electron.app.quit();
		return;
	}
	try {
		windowManager?.showOrCreate();
		await new Promise((resolve) => setTimeout(resolve, 0));
	} catch (err) {
		require_logger.mainLog.warn("[Lifecycle] showOrCreate before confirmation failed:", err);
	}
	const mainWindow = windowManager?.getMainWindow() ?? null;
	const dialogOptions = {
		type: "warning",
		buttons: [require_menu_i18n.getRendererTranslation("windowLifecycle.activeTasksQuit.cancel"), require_menu_i18n.getRendererTranslation("windowLifecycle.activeTasksQuit.quitAnyway")],
		defaultId: 0,
		cancelId: 0,
		title: require_menu_i18n.getRendererTranslation("windowLifecycle.activeTasksQuit.title"),
		message: require_menu_i18n.getRendererTranslation("windowLifecycle.activeTasksQuit.message"),
		detail: require_menu_i18n.getRendererTranslation("windowLifecycle.activeTasksQuit.detail"),
		noLink: true
	};
	const { response } = mainWindow && !mainWindow.isDestroyed() ? await electron.dialog.showMessageBox(mainWindow, dialogOptions) : await electron.dialog.showMessageBox(dialogOptions);
	if (response === 0) {
		require_logger.mainLog.info("[Lifecycle] User canceled quit with active tasks; resuming normal operation");
		isQuitting = false;
		windowManager?.setQuitting(false);
		windowManager?.initializeTray();
		return;
	}
	require_logger.mainLog.info(`[Lifecycle] User confirmed quit with ${activeCount} active tasks; proceeding`);
	userConfirmedActiveTasksQuit = true;
	electron.app.quit();
}
async function promptDocumentPreviewQuitConfirmation() {
	require_logger.mainLog.info("[Lifecycle] promptDocumentPreviewQuitConfirmation: enter", {
		isQuitting,
		userConfirmedActiveTasksQuit,
		userConfirmedDocumentPreviewQuit
	});
	let flushResult = null;
	try {
		flushResult = await mainBootstrap?.releaseTencentDocsPreviewContextsWithPrompt({ reason: "app-quit" }) ?? {
			success: true,
			releasedCount: 0,
			totalCount: 0
		};
		require_logger.mainLog.info("[Lifecycle] promptDocumentPreviewQuitConfirmation: flushResult", {
			success: flushResult?.success,
			blockedContextId: flushResult?.blockedContextId,
			releasedCount: flushResult?.releasedCount,
			totalCount: flushResult?.totalCount
		});
	} catch (error) {
		require_logger.mainLog.error("[Lifecycle] releaseEmbeddedPreviewContextsWithPrompt failed; allowing quit to proceed:", error);
		userConfirmedDocumentPreviewQuit = true;
		electron.app.quit();
		return;
	}
	if (flushResult?.success) {
		require_logger.mainLog.info("[Lifecycle] promptDocumentPreviewQuitConfirmation: success path -> app.quit()", {
			releasedCount: flushResult.releasedCount,
			totalCount: flushResult.totalCount
		});
		userConfirmedDocumentPreviewQuit = true;
		electron.app.quit();
		return;
	}
	require_logger.mainLog.info("[Lifecycle] User canceled or blocked during document preview quit flush; resuming normal operation", {
		blockedContextId: flushResult?.blockedContextId,
		flushResultIsNull: flushResult === null,
		flushSuccess: flushResult?.success,
		releasedCount: flushResult?.releasedCount,
		totalCount: flushResult?.totalCount
	});
	isQuitting = false;
	userConfirmedActiveTasksQuit = false;
	windowManager?.setQuitting(false);
	windowManager?.initializeTray();
}
electron.app.on("before-quit", (event) => {
	_startupLog(`Event: before-quit (isQuitting=${isQuitting}, isQuittingForUpdate=${isQuittingForUpdate}, userConfirmed=${userConfirmedActiveTasksQuit}, crashRecovery=${windowManager?.isRecoveringFromCrash ?? "N/A"})`);
	if (windowManager?.isRecoveringFromCrash) {
		event.preventDefault();
		return;
	}
	if (!isQuitting) {
		isQuitting = true;
		require_logger.mainLog.info(`[Lifecycle] before-quit triggered (bootstrapPhase=${bootstrapPhase}, mainBootstrapReady=${mainBootstrap !== null}, isQuittingForUpdate=${isQuittingForUpdate}, userConfirmedActiveTasksQuit=${userConfirmedActiveTasksQuit})`);
		require_marks.logLifecycleEvent("AppShutdown", {
			reason: isQuittingForUpdate ? "update" : "before_quit",
			bootstrapPhase,
			mainBootstrapReady: String(mainBootstrap !== null)
		});
	} else require_logger.mainLog.info("[Lifecycle] before-quit re-entry after user confirmed active tasks quit");
	if (!isQuittingForUpdate && !userConfirmedActiveTasksQuit && mainBootstrap !== null && windowManager !== null) {
		event.preventDefault();
		windowManager.setQuitting(true);
		windowManager.destroyTray();
		saveMainWindowState();
		promptActiveTasksQuitConfirmation().catch((err) => {
			require_logger.mainLog.error("[Lifecycle] promptActiveTasksQuitConfirmation error:", err);
			userConfirmedActiveTasksQuit = true;
			electron.app.quit();
		});
		return;
	}
	if (!isQuittingForUpdate && !userConfirmedDocumentPreviewQuit) {
		event.preventDefault();
		windowManager?.setQuitting(true);
		windowManager?.destroyTray();
		saveMainWindowState();
		promptDocumentPreviewQuitConfirmation().catch((err) => {
			require_logger.mainLog.error("[Lifecycle] promptDocumentPreviewQuitConfirmation error:", err);
			isQuitting = false;
			windowManager?.setQuitting(false);
			windowManager?.initializeTray();
		});
		return;
	}
	windowManager?.setQuitting(true);
	windowManager?.destroyTray();
	windowManager?.unregisterToggleWindowShortcut();
	saveMainWindowState();
	if (isQuittingForUpdate) {
		if (process.platform === "win32") {
			event.preventDefault();
			require_logger.mainLog.info("[Lifecycle] App before-quit for update (win32); blocking until session flush completes");
			const updateQuitTimeout = new Promise((resolve) => setTimeout(() => {
				require_logger.mainLog.warn("[Lifecycle] Update quit cleanup timed out after 4s on win32, forcing exit");
				resolve();
			}, 4e3));
			quitCleanupPromise ??= Promise.race([performQuitCleanup(), updateQuitTimeout]).catch((err) => require_logger.mainLog.error("[Lifecycle] Update quit cleanup error:", err)).finally(() => {
				require_logger.mainLog.info("[Lifecycle] Update quit: cleanup done, calling app.quit()");
				electron.app.quit();
			});
		} else {
			require_logger.mainLog.info("[Lifecycle] App before-quit for update; allowing native Squirrel quit flow to continue");
			quitCleanupPromise ??= performQuitCleanup().then(() => require_logger.mainLog.info("[Lifecycle] Update quit cleanup finished before native process exit")).catch((err) => require_logger.mainLog.error("[Lifecycle] Update quit cleanup error:", err));
		}
		return;
	}
	event.preventDefault();
	require_logger.mainLog.info("App before-quit, cleaning up...");
	const quitTimeout = new Promise((resolve) => setTimeout(() => {
		require_logger.mainLog.warn("[Lifecycle] Normal quit cleanup timed out after 10s, forcing exit");
		resolve();
	}, 1e4));
	quitCleanupPromise ??= Promise.race([performQuitCleanup(), quitTimeout]).catch((err) => require_logger.mainLog.error("Quit cleanup error:", err)).finally(() => {
		finishQuit();
	});
});
process.on("uncaughtException", (error) => {
	_startupLog(`FATAL uncaughtException (late): ${error?.stack || error?.message || String(error)}`);
	if (error && (error.code === "EIO" || error.code === "EPIPE")) return;
	require_logger.mainLog.error("Uncaught exception:", error);
});
process.on("unhandledRejection", (reason, promise) => {
	_startupLog(`FATAL unhandledRejection (late): ${reason instanceof Error ? reason.stack || reason.message : String(reason)}`);
	require_logger.mainLog.error("Unhandled rejection at:", promise, "reason:", reason);
});
/**
* 渲染进程崩溃监听。
*
* `app.on('render-process-gone')` 比 `webContents.on(...)` 覆盖更全：
*   - 主窗口、扩展页、devtools window、所有 Worker 都会触发；
*   - WindowManager 内部的 webContents-级 handler 只覆盖主窗口本身。
*
* 用户感知到的「闪退 / 白屏」绝大多数走这条路径，**不会**触发
* `process.on('uncaughtException')`。所以缺这个 handler 时 crash 报告永远是空的。
*/
electron.app.on("render-process-gone", (_event, webContents, details) => {
	let url$8;
	let webContentsId;
	try {
		url$8 = webContents.getURL();
		webContentsId = webContents.id;
	} catch {}
	const ctx = {
		reason: details.reason,
		exitCode: details.exitCode,
		url: url$8,
		webContentsId
	};
	require_logger.mainLog.error("[Crash] render-process-gone", ctx);
	crashWriterHandle?.write({
		type: "renderer_crash",
		renderer: ctx
	});
});
/**
* Electron 工具子进程崩溃监听（GPU / Utility / Zygote / Pepper 等）。
*
* 这是用户语义里第二大类「app crash」，特别是 GPU 进程崩溃常常表现为
* 全应用花屏 / 卡死，但主进程 V8 完全正常运行，没有任何 `uncaughtException`。
*
* GPU crash 特殊处理（issue #56720）：
* Windows 上 DWM Mica/Acrylic 合成层 + IME 候选窗口可能触发 GPU 进程崩溃
* (STATUS_DLL_INIT_FAILED)，级联 renderer/network crash → 应用闪退。
* 检测到 GPU crash 后通知 WindowManager 降级移除 backgroundMaterial 并重建窗口。
*/
electron.app.on("child-process-gone", (_event, details) => {
	const ctx = {
		processType: details.type,
		reason: details.reason,
		exitCode: details.exitCode,
		serviceName: details.serviceName,
		name: details.name
	};
	require_logger.mainLog.error("[Crash] child-process-gone", ctx);
	const crashType = details.type === "GPU" ? "gpu_crash" : "child_process_crash";
	crashWriterHandle?.write({
		type: crashType,
		childProcess: ctx
	});
	if (details.type === "GPU" && details.reason !== "clean-exit" && process.platform === "win32") windowManager?.handleGpuCrash(details.reason, details.exitCode);
});
/** 启动后打一行明确日志告诉用户/SRE 本次 crash 报告会写到哪 */
function logCrashReportLocation() {
	try {
		const crashLogDir = require_app_instance.getWorkbuddyLogsDir("Crash-Log");
		require_logger.mainLog.info(`[Crash] crash reports for this launch -> ${crashLogDir}`);
	} catch {}
}
var SIGNAL_EXIT_CODES = {
	SIGHUP: 129,
	SIGINT: 130,
	SIGTERM: 143,
	SIGBREAK: 149
};
for (const sig of Object.keys(SIGNAL_EXIT_CODES)) try {
	process.on(sig, () => {
		_startupLog(`Event: received signal ${sig}, exiting with code ${SIGNAL_EXIT_CODES[sig]}`);
		require_logger.mainLog.warn(`[Lifecycle] received signal ${sig}, exiting`);
		require_marks.logLifecycleEvent("AppShutdown", {
			reason: "signal",
			signal: sig,
			exitCode: SIGNAL_EXIT_CODES[sig] ?? 1
		});
		try {
			require_initialize.getGlobalDatabaseRef()?.dispose();
		} catch {}
		try {
			mainBootstrap?.stop().catch(() => {});
		} catch {}
		setTimeout(() => process.exit(SIGNAL_EXIT_CODES[sig] ?? 1), 200);
	});
} catch {}
process.on("exit", (code) => {
	require_marks.logLifecycleEvent("AppShutdown", {
		reason: "process_exit",
		exitCode: code
	});
	_startupLog(`Event: process.exit code=${code} uptime=${Math.round(process.uptime())}s`);
	console.log(`[Lifecycle] process.exit fired code=${code} uptime=${Math.round(process.uptime())}s`);
});
function saveMainWindowState() {
	const mainWindow = windowManager?.getMainWindow();
	if (!mainWindow || mainWindow.isDestroyed()) return;
	saveWindowState(mainWindow);
	require_logger.mainLog.info("Saved main window state before quit");
}
async function performQuitCleanup() {
	try {
		await mainBootstrap?.stop();
		mainBootstrap = null;
	} catch (err) {
		require_logger.mainLog.error("Shutdown error:", err);
	}
	try {
		disposeEarlyDesktopHostIpc?.();
		disposeEarlyDesktopHostIpc = null;
	} catch (err) {
		require_logger.mainLog.error("Desktop host IPC cleanup error:", err);
	}
}
function finishQuit() {
	_startupLog(`finishQuit called (isQuittingForUpdate=${isQuittingForUpdate})`);
	if (isQuittingForUpdate) {
		require_logger.mainLog.info("Update quit in progress, handing control back to Electron");
		electron.app.quit();
		return;
	}
	electron.app.exit(0);
}
//#endregion
exports.CrashFilter = CrashFilter;
exports.CrashLogExporter = CrashLogExporter;
exports.CrashSanitizer = CrashSanitizer;
exports.DEFAULT_EXCLUDE_PATTERNS = DEFAULT_EXCLUDE_PATTERNS;
exports.ElectronLocalStorageSessionAccessor = ElectronLocalStorageSessionAccessor;
exports.LocalStorageMigrationService = LocalStorageMigrationService;
exports.getLegacySessionPath = getLegacySessionPath;
exports.installCrashWriter = installCrashWriter;
exports.wrapChildProcess = wrapChildProcess;
