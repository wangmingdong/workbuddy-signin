const require_chunk = require("./chunk.js");
const require_logger = require("./logger2.js");
const require_app_instance = require("./app-instance.js");
let electron = require("electron");
let fs = require("fs");
fs = require_chunk.__toESM(fs);
let os = require("os");
os = require_chunk.__toESM(os);
let path = require("path");
path = require_chunk.__toESM(path);
//#region src/main/features/performance/analysis-prompt-builder.ts
/**
* 性能分析 Prompt 构建器
*
* 负责收集日志、读取采集数据、构建发送给 Agent 的分析 prompt。
*/
require_app_instance.init_app_instance();
/** 读取文件最后 N 行 */
function readLastLines(filePath, maxLines) {
	try {
		if (!fs.existsSync(filePath)) return "";
		return fs.readFileSync(filePath, "utf-8").split("\n").slice(-maxLines).join("\n");
	} catch {
		return "";
	}
}
/**
* 从日志内容中过滤出 startTime 之后的行。
* 支持常见的日志时间戳格式：
* - ISO 8601: 2026-06-16T12:30:00.000Z
* - 方括号格式: [2026-06-16T12:30:00.000Z]
* - 带时区格式: 2026-06-16T12:30:00.000+08:00
*/
function filterLogsByTime(logContent, startTime) {
	const startMs = startTime.getTime();
	const lines = logContent.split("\n");
	const filteredLines = [];
	let foundFirstMatch = false;
	const tsPattern = /\[?(\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}:\d{2}[\d.]*(?:Z|[+-]\d{2}:?\d{2})?)\]?/;
	for (const line of lines) {
		const match = tsPattern.exec(line);
		if (match) {
			const lineTime = new Date(match[1]).getTime();
			if (!isNaN(lineTime) && lineTime >= startMs) foundFirstMatch = true;
			else if (!isNaN(lineTime) && lineTime < startMs) continue;
		}
		if (foundFirstMatch) filteredLines.push(line);
	}
	return filteredLines.join("\n");
}
/**
* 获取录制期间的 WorkBuddy 日志内容
*
* 日志来源：
* 1. ~/.workbuddy/logs/AppStartup.log — 应用启动日志
* 2. ~/.workbuddy/logs/startup/<date>/<pid>-<time>.log — 主进程超早期诊断日志
* 3. ~/Library/Application Support/WorkBuddy/logs/<session>/main.log — electron-log 主进程日志
* 4. ~/.workbuddy/logs/<date>/workbuddyMainThread__*.log — daemon 主线程日志
*
* @param startTime 录制开始时间，只返回该时间之后的日志
*/
function getRecentLogs(startTime) {
	const logsDir = require_app_instance.getWorkbuddyLogsDir();
	const logFiles = [];
	const readAndFilter = (filePath, maxLines) => {
		const raw = readLastLines(filePath, maxLines);
		if (!raw || !startTime) return raw;
		return filterLogsByTime(raw, startTime);
	};
	try {
		const content = readAndFilter(path.join(logsDir, "AppStartup.log"), 500);
		if (content) logFiles.push({
			name: "AppStartup.log (录制期间)",
			content
		});
	} catch {}
	try {
		const startupDir = path.join(logsDir, "startup");
		if (fs.existsSync(startupDir)) {
			const candidates = [];
			const collectFile = (filePath, name) => {
				if (!/\.log$/i.test(name)) return;
				try {
					const stat = fs.statSync(filePath);
					if (stat.isFile()) candidates.push({
						filePath,
						name,
						mtimeMs: stat.mtimeMs
					});
				} catch {}
			};
			for (const entry of fs.readdirSync(startupDir, { withFileTypes: true })) {
				const entryPath = path.join(startupDir, entry.name);
				if (entry.isFile()) collectFile(entryPath, entry.name);
				else if (entry.isDirectory()) for (const child of fs.readdirSync(entryPath, { withFileTypes: true })) collectFile(path.join(entryPath, child.name), `${entry.name}/${child.name}`);
			}
			const latest = candidates.sort((a, b) => b.mtimeMs - a.mtimeMs)[0];
			if (latest) {
				const content = readAndFilter(latest.filePath, 200);
				if (content) logFiles.push({
					name: `startup/${latest.name} (录制期间)`,
					content
				});
			}
		}
	} catch {}
	try {
		const electronLogDir = path.join(os.homedir(), "Library", "Application Support", "WorkBuddy", "logs");
		if (fs.existsSync(electronLogDir)) {
			const sessions = fs.readdirSync(electronLogDir, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name).sort().reverse();
			if (sessions[0]) {
				const content = readAndFilter(path.join(electronLogDir, sessions[0], "main.log"), 500);
				if (content) logFiles.push({
					name: `WorkBuddy/logs/${sessions[0]}/main.log (录制期间)`,
					content
				});
			}
		}
	} catch {}
	try {
		const dateDirs = fs.readdirSync(logsDir, { withFileTypes: true }).filter((d) => d.isDirectory() && /^\d{4}-\d{2}-\d{2}$/.test(d.name)).map((d) => d.name).sort().reverse();
		if (dateDirs[0]) {
			const dateDir = path.join(logsDir, dateDirs[0]);
			const mainThreadLogs = fs.readdirSync(dateDir).filter((f) => f.startsWith("workbuddyMainThread"));
			if (mainThreadLogs[0]) {
				const content = readAndFilter(path.join(dateDir, mainThreadLogs[0]), 300);
				if (content) logFiles.push({
					name: `${dateDirs[0]}/${mainThreadLogs[0]} (录制期间)`,
					content
				});
			}
		}
	} catch {}
	if (logFiles.length === 0) return "(未找到日志文件)";
	return logFiles.map((f) => `### ${f.name}\n\`\`\`\n${f.content}\n\`\`\``).join("\n\n");
}
/**
* 构建用于 Agent 性能分析的 prompt
* @param outputDir 采集数据输出目录
* @param recordingStartTime 录制开始时间，用于限定日志范围
* @param associatedProjectDir 用户关联的代码目录
* @param gitBranch 关联目录的当前 Git 分支
*/
function buildAnalysisPrompt(outputDir, recordingStartTime, associatedProjectDir, gitBranch) {
	let probeReportSummary = "";
	try {
		const probeFile = path.join(outputDir, "probe-report.json");
		if (fs.existsSync(probeFile)) {
			const report = JSON.parse(fs.readFileSync(probeFile, "utf-8"));
			probeReportSummary = JSON.stringify(report, null, 2);
		}
	} catch {}
	let summaryContent = "";
	try {
		const summaryFile = path.join(outputDir, "summary.json");
		if (fs.existsSync(summaryFile)) summaryContent = fs.readFileSync(summaryFile, "utf-8");
	} catch {}
	const recentLogs = getRecentLogs(recordingStartTime);
	return `# WorkBuddy 性能分析任务

## 背景
我刚刚通过 WorkBuddy 的性能采集工具录制了一段性能 trace。请帮我分析以下性能数据，找出性能瓶颈和优化建议。

## 采集数据位置
所有采集文件位于：\`${outputDir}\`

### 文件说明
- **trace.json** — DevTools Performance trace（Chromium Tracing 格式，包含 JS 执行、渲染、布局、Paint 等时序数据）
- **cpu-profile.cpuprofile** — V8 CPU Profile（函数级别调用栈采样）
- **probe-report.json** — 应用层探针报告（DOM 查询频率、布局抖动、Observer 创建、Long Tasks）
- **summary.json** — 会话摘要元信息

## 采集会话摘要
\`\`\`json
${summaryContent}
\`\`\`

## 探针报告（应用层指标）
\`\`\`json
${probeReportSummary}
\`\`\`

## 录制期间的 WorkBuddy 日志
> 注意：以下日志仅包含录制开始时间（${recordingStartTime?.toISOString() ?? "未知"}）之后的内容，录制之前的日志已被排除。

${recentLogs}

## 关联代码目录
${associatedProjectDir ? `用户已关联项目代码目录：\`${associatedProjectDir}\`${gitBranch ? `\n当前 Git 分支：\`${gitBranch}\`` : ""}\n\n**请结合该目录下的源码进行深度分析**，通过 trace 中的函数名/文件名定位到源码，给出具体文件、行号的优化方案。` : "用户未关联代码目录。请仅基于采集数据进行分析，无法定位到具体源码文件。"}

## 分析要求

### 第一步：数据概览
1. **读取 trace.json** — 提取所有 Long Tasks（>50ms），按耗时降序列出 Top 10
2. **读取 cpu-profile.cpuprofile** — 找出 CPU 时间消耗最大的 Top 15 函数和调用路径
3. **读取 probe-report.json** — 汇总 DOM 查询频率、布局抖动、Observer 数量

### 第二步：Long Task 深度分析

对每个耗时 >100ms 的 Long Task，深入分析其内部调用栈，定位具体触发原因。**仅在数据中确实存在问题时才报告，没有发现则跳过对应项，不要臆测。**

重点关注以下模式：

#### 2.1 数据结构与渲染设计问题
- 是否存在一次性加载/渲染大量数据而未做**分页（pagination）或虚拟滚动（virtualization）**的场景
- 是否存在大列表/大树未做**分级加载（lazy loading / progressive rendering）**，导致单帧处理过多 DOM 节点
- 结合代码分析：数据结构设计是否支持增量更新，还是每次全量替换

#### 2.2 批量状态更新与渲染合并
- 是否存在**高频连续 setState / state dispatch** 导致多次不必要的 re-render
- 是否缺少 **批量更新（batching）** 机制（如 React 18 auto-batching 未生效、手动 unstable_batchedUpdates 缺失）
- 是否有多个独立状态变更可以**合并为单次 render**

#### 2.3 不合理的 Re-render
- 是否存在**组件订阅了过大范围的 Context / Store**，导致无关状态变更触发 re-render
- 是否缺少 **React.memo / useMemo / useCallback** 导致子组件被动 re-render
- 是否有 render 函数内**创建新对象/数组/函数引用**（如 \`style={{...}}\`、\`onClick={() => ...}\` inline）导致子组件 props 始终不等

#### 2.4 状态监听范围不合理
- 是否有组件 **useSelector / useContext** 监听了整个 store 或顶层 context，而实际只用其中一个字段
- 是否有 **useEffect 依赖数组过宽**（监听整个对象而非具体字段），导致 effect 频繁重跑
- 是否有 **MutationObserver / ResizeObserver** 监听了过大的 DOM 子树

### 第三步：结合代码（如有关联项目）
- 如果当前项目目录可访问，根据 trace 中的函数名/文件名定位到源码
- 指出具体文件、行号、函数名
- 给出**可落地的重构方案**（不是泛泛的建议）

### 第四步：日志关联
- 查看录制期间日志有无异常错误、超时、死循环迹象

---

## 输出格式

请严格按以下结构输出（没有发现的项直接标注"未发现"，不要编造问题）：

### 🔴 关键性能瓶颈（按严重程度排序）
| # | 问题 | 耗时/频率 | 所在文件 | 根因分类 |
|---|------|-----------|---------|---------|

### 📊 量化指标
- Long Task 总数 / 最大耗时 / 平均耗时
- DOM 查询总次数 / 慢查询（>5ms）次数
- 布局抖动次数（getBCR + getCS）
- Observer 创建数（MO/RO/IO）
- rAF 调用次数

### 💡 优化建议（按优先级排序）
每条建议必须包含：
1. **问题描述**：具体是什么问题
2. **证据**：trace/profile 中的哪个数据支撑了这个结论
3. **修复方案**：具体怎么改（指向文件和代码）
4. **预期收益**：修复后预计能减少多少 ms / 减少多少次 re-render

### ⚠️ 注意
- 只报告有数据支撑的问题，**禁止**在没有证据时臆测问题
- 如果 trace 数据中未发现明显瓶颈，如实报告"录制期间未观察到严重性能问题"
`;
}
//#endregion
//#region src/main/features/performance/perf-enable-check.ts
/**
* 性能采集菜单启用判定
*
* 判定顺序（任一命中即启用）：
* 1. 环境变量 `WORKBUDDY_PERF_PROFILING=1`（开发/临时诊断兜底，不改文件）
* 2. `~/.workbuddy/settings.json` 的 `perfProfiling === true`（面向白名单用户长期开启）
*
* 判定结果在启动早期计算一次并缓存，供菜单构建器读取。
* 关闭方式：把 settings.json 的 `perfProfiling` 改成 false（或删掉），并 unset 环境变量后重启。
*/
require_app_instance.init_app_instance();
var PERF_ENV_KEY = "WORKBUDDY_PERF_PROFILING";
var SETTINGS_KEY = "perfProfiling";
var _enabled = false;
var _detected = false;
var _source = "none";
/** 读 settings.json 中的 perfProfiling 布尔位；任何异常返回 undefined（走 fallback） */
function readSettingsFlag() {
	try {
		const settingsPath = path.join(require_app_instance.getWorkbuddyConfigDir(), "settings.json");
		if (!fs.existsSync(settingsPath)) return;
		const raw = fs.readFileSync(settingsPath, "utf-8");
		const json = JSON.parse(raw);
		if (!json || typeof json !== "object" || Array.isArray(json)) return;
		const v = json[SETTINGS_KEY];
		return typeof v === "boolean" ? v : void 0;
	} catch (err) {
		require_logger.mainLog.warn("[PerfProfiler] Failed to read settings.json for perfProfiling flag:", String(err));
		return;
	}
}
/**
* 计算并缓存启用状态。启动早期调用一次；后续 `isPerfProfilingEnabled()` 直接读缓存。
* 返回是否启用。
*/
function detectPerfProfilingEnabled() {
	const envVal = process.env[PERF_ENV_KEY];
	if (envVal === "1" || envVal?.toLowerCase() === "true") {
		_enabled = true;
		_source = "env";
	} else if (readSettingsFlag() === true) {
		_enabled = true;
		_source = "settings";
	} else {
		_enabled = false;
		_source = "none";
	}
	_detected = true;
	if (_enabled) require_logger.mainLog.info(`[PerfProfiler] performance profiling enabled via ${_source}`);
	return _enabled;
}
/** 是否启用性能采集菜单 */
function isPerfProfilingEnabled() {
	if (!_detected) return detectPerfProfilingEnabled();
	return _enabled;
}
//#endregion
//#region src/main/features/performance/perf-menu-state-sync.ts
/**
* 将性能采集菜单状态同步给渲染进程 localStorage，供 Windows/Linux 自定义标题栏读取。
*
* macOS 走原生菜单：`buildAndSetApplicationMenu()` 直接读 {@link isPerfProfilingEnabled}
* 和 `getProfilingState()`，不依赖本文件。
*
* Windows/Linux 走渲染层菜单（`packages/workbuddy-app/src/components/menubar`），
* 只能通过 renderer 侧 storage 读取，因此这里把两个状态位（enabled、recordingState）
* 序列化到 `__perf_state__`，并派发 `perf-state-changed` 事件通知 renderer rebuild。
*
* 与 `ioa-im-actions.ts::syncIOAImStateToAllWindows` 同款注入模式，
* 差别只在两点：
*   1. 状态由 profiler 自己触发，而非用户点击 toggle
*   2. 事件名不同（`perf-state-changed`）
*/
function buildInjectionScript(state) {
	return `${state.enabled ? `localStorage.setItem('__perf_state__', ${JSON.stringify(JSON.stringify(state))})` : "localStorage.removeItem('__perf_state__')"}; ${`window.dispatchEvent(new CustomEvent('perf-state-changed', { detail: ${JSON.stringify(state)} }))`}`;
}
/**
* 广播当前性能采集状态到所有窗口 renderer。
* 由 cdp-profiler 在状态变化时（start/stop/timeout）调用。
*/
function syncPerfMenuStateToAllWindows() {
	const js = buildInjectionScript({
		enabled: isPerfProfilingEnabled(),
		recordingState: getProfilingState()
	});
	for (const win of electron.BrowserWindow.getAllWindows()) {
		if (win.isDestroyed()) continue;
		win.webContents.executeJavaScript(js).catch(() => {});
	}
}
/**
* 首次同步：窗口 did-finish-load 时调用，保证 renderer 菜单从第一次构建就能读到状态。
* 与 syncIOAImStateToWindow 用法对齐（见 window-manager.ts）。
*/
function syncPerfMenuStateToWindow(win) {
	const js = buildInjectionScript({
		enabled: isPerfProfilingEnabled(),
		recordingState: getProfilingState()
	});
	win.webContents.executeJavaScript(js).catch(() => {});
}
//#endregion
//#region src/main/features/performance/perf-probe-script.ts
/**
* 渲染进程性能探针脚本
*
* 在「开始录制」时通过 executeJavaScript 注入到渲染进程中，
* 录制期间持续收集 DOM 查询、布局抖动、Observer 创建、Long Tasks 等数据。
* 「停止录制」时调用 window.__wbProbeCollect() 收集结果并返回 JSON。
*/
/** 注入到渲染进程的探针启动脚本 */
var PERF_PROBE_INJECT_SCRIPT = `
(function() {
  if (window.__wbProbeArmed) {
    console.warn('[perf-probe] 探针已在运行中');
    return;
  }
  window.__wbProbeArmed = true;

  const stats = {
    qsDoc: 0, qsEl: 0, qsAllDoc: 0, qsAllEl: 0,
    getBCR: 0, getCS: 0,
    moCreated: 0, roCreated: 0, ioCreated: 0,
    raf: 0, longTasks: [],
  };
  const qsByCallsite = new Map();
  const slowQs = [];
  const start = performance.now();

  // ── Hook querySelector / querySelectorAll ──
  const origQsDoc = Document.prototype.querySelector;
  const origQsEl  = Element.prototype.querySelector;
  const origQsaDoc = Document.prototype.querySelectorAll;
  const origQsaEl  = Element.prototype.querySelectorAll;

  function recordCallsite(selector) {
    const stack = (new Error()).stack || '';
    const lines = stack.split('\\n');
    const callsite = (lines[3] || lines[2] || 'unknown')
      .trim()
      .replace(/^at\\s+/, '')
      .slice(0, 120);
    const key = selector + '  @  ' + callsite;
    qsByCallsite.set(key, (qsByCallsite.get(key) || 0) + 1);
  }

  Document.prototype.querySelector = function(sel) {
    stats.qsDoc++;
    const t0 = performance.now();
    const r = origQsDoc.apply(this, arguments);
    const dt = performance.now() - t0;
    if (dt > 5) slowQs.push({ sel, ms: +dt.toFixed(1), where: 'doc' });
    recordCallsite(sel);
    return r;
  };
  Element.prototype.querySelector = function(sel) {
    stats.qsEl++;
    const t0 = performance.now();
    const r = origQsEl.apply(this, arguments);
    const dt = performance.now() - t0;
    if (dt > 5) slowQs.push({ sel, ms: +dt.toFixed(1), where: 'el' });
    recordCallsite(sel);
    return r;
  };
  Document.prototype.querySelectorAll = function(sel) {
    stats.qsAllDoc++;
    return origQsaDoc.apply(this, arguments);
  };
  Element.prototype.querySelectorAll = function(sel) {
    stats.qsAllEl++;
    return origQsaEl.apply(this, arguments);
  };

  // ── Hook getBoundingClientRect / getComputedStyle ──
  const origGBCR = Element.prototype.getBoundingClientRect;
  Element.prototype.getBoundingClientRect = function() {
    stats.getBCR++;
    return origGBCR.apply(this, arguments);
  };
  const origGCS = window.getComputedStyle;
  window.getComputedStyle = function() {
    stats.getCS++;
    return origGCS.apply(this, arguments);
  };

  // ── Hook MutationObserver / ResizeObserver / IntersectionObserver ──
  const OrigMO = window.MutationObserver;
  window.MutationObserver = class extends OrigMO {
    constructor(cb) { super(cb); stats.moCreated++; }
  };
  var OrigRO = window.ResizeObserver || null;
  if (OrigRO) {
    window.ResizeObserver = class extends OrigRO {
      constructor(cb) { super(cb); stats.roCreated++; }
    };
  }
  var OrigIO = window.IntersectionObserver || null;
  if (OrigIO) {
    window.IntersectionObserver = class extends OrigIO {
      constructor(cb, opt) { super(cb, opt); stats.ioCreated++; }
    };
  }

  // ── Hook requestAnimationFrame ──
  const origRAF = window.requestAnimationFrame;
  window.requestAnimationFrame = function(cb) {
    stats.raf++;
    return origRAF.apply(this, arguments);
  };

  // ── Long Task Observer ──
  let lto;
  try {
    lto = new PerformanceObserver(function(list) {
      list.getEntries().forEach(function(e) {
        if (e.duration > 50) {
          stats.longTasks.push({ start: +e.startTime.toFixed(0), dur: +e.duration.toFixed(0) });
        }
      });
    });
    lto.observe({ entryTypes: ['longtask'] });
  } catch(e) { /* not supported */ }

  // ── 初始浮层快照 ──
  const floatingSelector = '[data-floating-ui-portal],[data-floating-ui-focusable],[role="tooltip"],[data-radix-popper-content-wrapper],.floating-ui,.tippy-box';
  const floatingNow = document.querySelectorAll(floatingSelector).length;

  // ── 收集函数（停止录制时由主进程调用） ──
  window.__wbProbeCollect = function() {
    // 还原所有 hook（包括 ResizeObserver / IntersectionObserver）
    Document.prototype.querySelector = origQsDoc;
    Element.prototype.querySelector = origQsEl;
    Document.prototype.querySelectorAll = origQsaDoc;
    Element.prototype.querySelectorAll = origQsaEl;
    Element.prototype.getBoundingClientRect = origGBCR;
    window.getComputedStyle = origGCS;
    window.MutationObserver = OrigMO;
    if (window.ResizeObserver && OrigRO) window.ResizeObserver = OrigRO;
    if (window.IntersectionObserver && OrigIO) window.IntersectionObserver = OrigIO;
    window.requestAnimationFrame = origRAF;
    if (lto) lto.disconnect();

    const elapsedSec = +((performance.now() - start) / 1000).toFixed(1);
    const floatingAfter = document.querySelectorAll(floatingSelector).length;

    const topCallsites = [...qsByCallsite.entries()]
      .sort(function(a, b) { return b[1] - a[1]; })
      .slice(0, 20)
      .map(function(entry) { return { count: entry[1], where: entry[0] }; });

    const report = {
      elapsedSec: elapsedSec,
      domQuery: {
        qsDoc: stats.qsDoc,
        qsEl: stats.qsEl,
        qsAllDoc: stats.qsAllDoc,
        qsAllEl: stats.qsAllEl,
        total: stats.qsDoc + stats.qsEl + stats.qsAllDoc + stats.qsAllEl,
      },
      layoutThrashing: {
        getBoundingClientRect: stats.getBCR,
        getComputedStyle: stats.getCS,
      },
      observers: {
        MutationObserver: stats.moCreated,
        ResizeObserver: stats.roCreated,
        IntersectionObserver: stats.ioCreated,
      },
      rAF: stats.raf,
      floating: {
        initial: floatingNow,
        final: floatingAfter,
      },
      longTasks: stats.longTasks,
      slowQueries: slowQs.slice(0, 50),
      topCallsites: topCallsites,
    };

    delete window.__wbProbeArmed;
    delete window.__wbProbeCollect;
    return JSON.stringify(report);
  };

  console.log('[perf-probe] 探针已注入，正在采集性能数据...');
})();
`;
/** 从渲染进程收集探针数据的脚本 */
var PERF_PROBE_COLLECT_SCRIPT = `
(function() {
  if (typeof window.__wbProbeCollect === 'function') {
    return window.__wbProbeCollect();
  }
  return null;
})();
`;
//#endregion
//#region src/main/features/performance/trace-parser.ts
/**
* Trace 数据解析器
*
* 从 trace.json 中提取结构化性能事件和时间分布统计。
* 参考 perf-mcp 的解析逻辑，适配 WorkBuddy 的性能分析链路。
*/
var SCRIPTING_NAMES = new Set([
	"EvaluateScript",
	"FunctionCall",
	"v8.compile",
	"v8.evaluateModule",
	"v8.run",
	"MinorGC",
	"MajorGC",
	"GCEvent",
	"RunMicrotasks",
	"RunTask"
]);
var SCRIPTING_KEYWORDS = [
	"v8.",
	"Script",
	"Compile",
	"RunMicro",
	"EvaluateModule"
];
var RENDERING_NAMES = new Set([
	"Layout",
	"UpdateLayoutTree",
	"RecalculateStyles",
	"ParseHTML",
	"ParseAuthorStyleSheet"
]);
var PAINTING_NAMES = new Set([
	"Paint",
	"PrePaint",
	"RasterTask",
	"CompositeLayers",
	"Draw",
	"DrawFrame"
]);
var GC_KEYWORDS = [
	"GC",
	"MajorGC",
	"MinorGC"
];
function classify(ev) {
	const n = ev.name || "";
	if (n === "(idle)" || n === "Idle") return "idle";
	if (GC_KEYWORDS.some((k) => n.includes(k))) return "gc";
	if (SCRIPTING_NAMES.has(n) || SCRIPTING_KEYWORDS.some((k) => n.includes(k))) return "scripting";
	if (RENDERING_NAMES.has(n)) return "rendering";
	if (PAINTING_NAMES.has(n)) return "painting";
	return "other";
}
/**
* 从 trace 数据中提取结构化事件：Long Tasks / GC / Layout / Paint
*/
function extractTraceEvents(trace) {
	const events = trace.traceEvents || [];
	const longTasks = [];
	const gcPauses = [];
	const layoutEvents = [];
	const paintEvents = [];
	for (const ev of events) {
		if (ev.ph !== "X" || typeof ev.dur !== "number") continue;
		const dur_us = ev.dur;
		const name = ev.name || "";
		if (name === "RunTask" && dur_us >= 5e4) longTasks.push({
			ts_us: ev.ts,
			dur_ms: +(dur_us / 1e3).toFixed(2),
			tid: ev.tid
		});
		if (GC_KEYWORDS.some((k) => name.includes(k))) gcPauses.push({
			name,
			ts_us: ev.ts,
			dur_ms: +(dur_us / 1e3).toFixed(2)
		});
		if (RENDERING_NAMES.has(name)) layoutEvents.push({
			name,
			ts_us: ev.ts,
			dur_ms: +(dur_us / 1e3).toFixed(2)
		});
		if (PAINTING_NAMES.has(name)) paintEvents.push({
			name,
			ts_us: ev.ts,
			dur_ms: +(dur_us / 1e3).toFixed(2)
		});
	}
	longTasks.sort((a, b) => b.dur_ms - a.dur_ms);
	gcPauses.sort((a, b) => b.dur_ms - a.dur_ms);
	return {
		counts: {
			longTasks: longTasks.length,
			gcPauses: gcPauses.length,
			layoutEvents: layoutEvents.length,
			paintEvents: paintEvents.length,
			totalEvents: events.length
		},
		totals: {
			longTaskMs: +longTasks.reduce((s, x) => s + x.dur_ms, 0).toFixed(1),
			gcMs: +gcPauses.reduce((s, x) => s + x.dur_ms, 0).toFixed(1),
			maxLongTaskMs: longTasks[0]?.dur_ms || 0
		},
		longTasksTop: longTasks.slice(0, 20),
		gcPausesTop: gcPauses.slice(0, 20),
		layoutTop: layoutEvents.sort((a, b) => b.dur_ms - a.dur_ms).slice(0, 10),
		paintTop: paintEvents.sort((a, b) => b.dur_ms - a.dur_ms).slice(0, 10)
	};
}
/**
* 计算 trace 的时间分布：scripting / rendering / painting / gc / idle / other
*/
function computeTimeBreakdown(trace) {
	const events = trace.traceEvents || [];
	const buckets = {
		scripting: 0,
		rendering: 0,
		painting: 0,
		gc: 0,
		idle: 0,
		other: 0
	};
	let minTs = Infinity;
	let maxTs = -Infinity;
	for (const ev of events) if (ev.ph === "X" && typeof ev.dur === "number") {
		const cls = classify(ev);
		buckets[cls] += ev.dur;
		if (ev.ts < minTs) minTs = ev.ts;
		if (ev.ts + ev.dur > maxTs) maxTs = ev.ts + ev.dur;
	}
	const wallUs = maxTs > minTs ? maxTs - minTs : 0;
	const pct = (us) => wallUs > 0 ? +(us / wallUs * 100).toFixed(2) : 0;
	return {
		totalMs: +(wallUs / 1e3).toFixed(1),
		scriptingMs: +(buckets.scripting / 1e3).toFixed(1),
		scriptingPct: pct(buckets.scripting),
		renderingMs: +(buckets.rendering / 1e3).toFixed(1),
		renderingPct: pct(buckets.rendering),
		paintingMs: +(buckets.painting / 1e3).toFixed(1),
		paintingPct: pct(buckets.painting),
		gcMs: +(buckets.gc / 1e3).toFixed(1),
		gcPct: pct(buckets.gc),
		idleMs: +(buckets.idle / 1e3).toFixed(1),
		idlePct: pct(buckets.idle),
		otherMs: +(buckets.other / 1e3).toFixed(1),
		otherPct: pct(buckets.other)
	};
}
/**
* 解析 V8 CPU Profile，返回 Top 热点函数和文件聚合
*/
function parseCpuProfile(profile) {
	const { nodes, samples, timeDeltas, startTime, endTime } = profile;
	const totalUs = endTime - startTime;
	const selfTime = /* @__PURE__ */ new Map();
	for (let i = 0; i < samples.length; i++) {
		const id = samples[i];
		const dt = timeDeltas[i] || 0;
		selfTime.set(id, (selfTime.get(id) || 0) + dt);
	}
	const parentOf = /* @__PURE__ */ new Map();
	for (const n of nodes) {
		if (!n.children) continue;
		for (const c of n.children) parentOf.set(c, n.id);
	}
	const totalTime = /* @__PURE__ */ new Map();
	for (let i = 0; i < samples.length; i++) {
		const dt = timeDeltas[i] || 0;
		let cur = samples[i];
		while (cur !== void 0) {
			totalTime.set(cur, (totalTime.get(cur) || 0) + dt);
			cur = parentOf.get(cur);
		}
	}
	const byUrl = /* @__PURE__ */ new Map();
	const ranked = nodes.map((n) => {
		const cf = n.callFrame || {};
		return {
			func: cf.functionName || "(anonymous)",
			url: cf.url || "",
			line: cf.lineNumber,
			self_us: selfTime.get(n.id) || 0,
			total_us: totalTime.get(n.id) || 0
		};
	});
	for (const r of ranked) {
		const u = r.url || "(internal)";
		byUrl.set(u, (byUrl.get(u) || 0) + r.self_us);
	}
	const topSelf = [...ranked].sort((a, b) => b.self_us - a.self_us).slice(0, 30).map((r) => ({
		func: r.func,
		url: r.url,
		line: r.line,
		self_ms: +(r.self_us / 1e3).toFixed(2),
		self_pct: +(r.self_us / totalUs * 100).toFixed(2),
		total_ms: +(r.total_us / 1e3).toFixed(2)
	}));
	const topTotal = [...ranked].sort((a, b) => b.total_us - a.total_us).slice(0, 30).map((r) => ({
		func: r.func,
		url: r.url,
		line: r.line,
		total_ms: +(r.total_us / 1e3).toFixed(2),
		total_pct: +(r.total_us / totalUs * 100).toFixed(2),
		self_ms: +(r.self_us / 1e3).toFixed(2)
	}));
	const urlRank = [...byUrl.entries()].sort((a, b) => b[1] - a[1]).slice(0, 20).map(([url, us]) => ({
		url,
		self_ms: +(us / 1e3).toFixed(1),
		pct: +(us / totalUs * 100).toFixed(2)
	}));
	const idle_us = ranked.find((r) => r.func === "(idle)")?.self_us || 0;
	const gc_us = ranked.find((r) => r.func === "(garbage collector)")?.self_us || 0;
	return {
		summary: {
			durationMs: +(totalUs / 1e3).toFixed(0),
			sampleCount: samples.length,
			idle_ms: +(idle_us / 1e3).toFixed(2),
			gc_ms: +(gc_us / 1e3).toFixed(2),
			busy_pct: +((totalUs - idle_us) / totalUs * 100).toFixed(1)
		},
		topSelf,
		topTotal,
		urlRank
	};
}
//#endregion
//#region src/main/features/performance/cdp-profiler.ts
/**
* CDP Performance Profiler
*
* 通过 Chrome DevTools Protocol (CDP) 静默调用 DevTools Performance 工具进行性能采集。
* 仅在启动时检测到 CDP 调试参数（--remote-debugging-port / --inspect 等）时激活。
* 提供菜单驱动的「开始录制」→「停止录制并启动 Agent 分析」工作流。
*
* 录制期间同时启动：
* 1. CDP Tracing domain — 等同 DevTools Performance 面板录制（含 JS Profiling、渲染、布局、Paint）
* 2. CDP Profiler domain — V8 CPU Profile（精确到函数级别的调用栈采样）
* 3. 渲染进程探针 — DOM 查询频率、布局抖动、Observer 创建、Long Tasks 等应用层指标
*/
/**
* 刷新采集菜单状态。
* - macOS：rebuild 原生菜单（走 `buildAndSetApplicationMenu`）。
* - Windows/Linux：写 `__perf_state__` 到 renderer localStorage 并派发 CustomEvent，
*   自定义标题栏收到后 rebuild 菜单。
*/
function refreshMenu() {
	Promise.resolve().then(() => require("./menu-builder2.js")).then(({ buildAndSetApplicationMenu }) => {
		buildAndSetApplicationMenu();
	}).catch(() => {});
	syncPerfMenuStateToAllWindows();
}
/** 录制最大时长（5 分钟），超时自动停止 */
var RECORDING_TIMEOUT_MS = 300 * 1e3;
/** 单例状态 */
var _profilingState = "idle";
var _cdpEnabled = false;
/** 录制开始时间戳（用于限定日志时间范围） */
var _recordingStartTime = null;
/** 录制超时定时器 */
var _recordingTimer = null;
/** 用户关联的代码目录（Agent 分析时的工作目录） */
var _associatedProjectDir = null;
/** 关联目录的 Git 分支 */
var _associatedGitInfo = null;
/** Trace 事件数量上限（约 200 万事件 ≈ 500MB，防止长录制 OOM） */
var MAX_TRACE_EVENTS = 2e6;
/** CDP Tracing 事件缓冲 */
var _traceEvents = [];
/** Trace 事件是否已溢出 */
var _traceEventsOverflow = false;
/** dataCollected 监听器引用（用于录制结束后显式移除，防止泄漏） */
var _traceDataHandler = null;
/** V8 CPU Profile 数据（渲染进程） */
var _cpuProfile = null;
/** Performance.getMetrics 录制前基线 */
var _perfMetricsStart = null;
/** 主进程 inspector session（用于主进程 CPU Profile） */
var _mainProcessSession = null;
/** 主进程 CPU Profile 数据 */
var _mainProcessCpuProfile = null;
/** perf-analysis 输出目录 */
function getPerfAnalysisDir() {
	return path.join(os.homedir(), ".workbuddy", "perf-analysis");
}
/** 保留天数 */
var RETENTION_DAYS = 30;
/**
* 清理超过 RETENTION_DAYS 的 session 采集数据。
* 每次启动时调用（在 detectCdpInspectMode 内），不阻塞主流程。
*/
function cleanupExpiredSessions() {
	const dir = getPerfAnalysisDir();
	if (!fs.existsSync(dir)) return;
	const now = Date.now();
	const maxAge = RETENTION_DAYS * 24 * 60 * 60 * 1e3;
	try {
		const entries = fs.readdirSync(dir, { withFileTypes: true });
		for (const entry of entries) {
			if (!entry.isDirectory() || !entry.name.startsWith("session-")) continue;
			const tsStr = entry.name.replace("session-", "").replace(/(\d{4}-\d{2}-\d{2})T(\d{2})-(\d{2})-(\d{2})-(\d{3})Z/, "$1T$2:$3:$4.$5Z");
			const sessionTime = new Date(tsStr).getTime();
			if (isNaN(sessionTime) || now - sessionTime > maxAge) {
				const sessionPath = path.join(dir, entry.name);
				fs.rmSync(sessionPath, {
					recursive: true,
					force: true
				});
				require_logger.mainLog.info(`[PerfProfiler] Cleaned expired session: ${entry.name}`);
			}
		}
	} catch (err) {
		require_logger.mainLog.warn("[PerfProfiler] Failed to cleanup expired sessions:", String(err));
	}
}
/**
* 检测启动参数中是否包含 CDP 调试相关参数。
* 匹配以下任一条件：
* - process.argv 包含 `--remote-debugging-port`
* - process.argv 包含 `--inspect` 或 `--inspect-brk`
* - 环境变量 WORKBUDDY_REMOTE_DEBUGGING_PORT 已设置
*/
function detectCdpInspectMode() {
	const argv = process.argv;
	const hasRemoteDebugging = argv.some((arg) => arg.startsWith("--remote-debugging-port"));
	const hasInspect = argv.some((arg) => arg.startsWith("--inspect") || arg.startsWith("--inspect-brk"));
	const hasEnvPort = !!process.env.WORKBUDDY_REMOTE_DEBUGGING_PORT;
	_cdpEnabled = hasRemoteDebugging || hasInspect || hasEnvPort;
	if (_cdpEnabled) {
		require_logger.mainLog.info("[PerfProfiler] CDP inspect mode detected, performance profiling menu enabled");
		cleanupExpiredSessions();
	}
	return _cdpEnabled;
}
/** 获取当前采集状态 */
function getProfilingState() {
	return _profilingState;
}
/**
* 开始性能录制
* - 通过 CDP Tracing domain 启动 DevTools Performance 级别的 trace 采集
* - 通过 CDP Profiler domain 启动 V8 CPU Profiling
* - 注入渲染进程探针脚本
*/
async function startProfiling() {
	if (_profilingState === "recording") {
		require_logger.mainLog.warn("[PerfProfiler] Already recording, ignoring duplicate start request");
		return;
	}
	const win = electron.BrowserWindow.getFocusedWindow() || electron.BrowserWindow.getAllWindows()[0];
	if (!win || win.isDestroyed()) {
		require_logger.mainLog.error("[PerfProfiler] No active window found, cannot start profiling");
		return;
	}
	const { app: electronApp } = await import("electron");
	if (!electronApp.isPackaged) {
		_associatedProjectDir = process.cwd();
		require_logger.mainLog.info(`[PerfProfiler] Dev mode detected, auto-associated project dir: ${_associatedProjectDir}`);
	} else {
		const { canceled, filePaths } = await electron.dialog.showOpenDialog(win, {
			title: "选择关联的代码目录（可选）",
			message: "选择要分析的项目代码目录，Agent 将结合代码进行深度分析。\n请确保已切换到对应的 Git 分支。\n如不需要可直接取消。",
			buttonLabel: "关联此目录",
			properties: ["openDirectory"]
		});
		_associatedProjectDir = !canceled && filePaths[0] ? filePaths[0] : null;
	}
	let _associatedGitBranch = null;
	if (_associatedProjectDir) try {
		const { execSync } = await import("child_process");
		_associatedGitBranch = execSync("git rev-parse --abbrev-ref HEAD", {
			cwd: _associatedProjectDir,
			encoding: "utf-8",
			timeout: 5e3
		}).trim();
		require_logger.mainLog.info(`[PerfProfiler] Associated project: ${_associatedProjectDir} (branch: ${_associatedGitBranch})`);
	} catch {
		require_logger.mainLog.info(`[PerfProfiler] Associated project: ${_associatedProjectDir} (git branch detection failed)`);
	}
	_associatedGitInfo = _associatedGitBranch;
	_profilingState = "recording";
	_traceEvents = [];
	_cpuProfile = null;
	_recordingStartTime = /* @__PURE__ */ new Date();
	refreshMenu();
	require_logger.mainLog.info("[PerfProfiler] Starting CDP performance trace recording...");
	const debugger_ = win.webContents.debugger;
	try {
		if (!debugger_.isAttached()) debugger_.attach("1.3");
		_traceDataHandler = (_event, method, params) => {
			if (method === "Tracing.dataCollected") {
				if (params?.value && Array.isArray(params.value)) {
					if (_traceEvents.length < MAX_TRACE_EVENTS) _traceEvents.push(...params.value);
					else if (!_traceEventsOverflow) {
						_traceEventsOverflow = true;
						require_logger.mainLog.warn(`[PerfProfiler] Trace events exceeded limit (${MAX_TRACE_EVENTS}), dropping new events`);
					}
				}
			}
		};
		debugger_.on("message", _traceDataHandler);
		await debugger_.sendCommand("Tracing.start", {
			transferMode: "ReportEvents",
			traceConfig: {
				includedCategories: [
					"-*",
					"devtools.timeline",
					"v8.execute",
					"disabled-by-default-devtools.timeline",
					"disabled-by-default-devtools.timeline.frame",
					"toplevel",
					"blink.console",
					"blink.user_timing",
					"latencyInfo",
					"disabled-by-default-devtools.timeline.stack",
					"disabled-by-default-v8.cpu_profiler",
					"disabled-by-default-v8.cpu_profiler.hires"
				],
				excludedCategories: ["*"]
			}
		});
		require_logger.mainLog.info("[PerfProfiler] CDP Tracing.start OK");
		await debugger_.sendCommand("Profiler.enable", {});
		await debugger_.sendCommand("Profiler.start", {});
		require_logger.mainLog.info("[PerfProfiler] CDP Profiler.start OK");
		await debugger_.sendCommand("Performance.enable", {});
		_perfMetricsStart = (await debugger_.sendCommand("Performance.getMetrics", {}))?.metrics ?? null;
		require_logger.mainLog.info("[PerfProfiler] Performance baseline metrics captured");
	} catch (err) {
		require_logger.mainLog.error("[PerfProfiler] Failed to start CDP tracing:", String(err));
		_profilingState = "idle";
		if (debugger_.isAttached()) debugger_.detach();
		return;
	}
	try {
		_mainProcessSession = new (await (import("node:inspector"))).Session();
		_mainProcessSession.connect();
		await new Promise((resolve, reject) => {
			_mainProcessSession.post("Profiler.enable", (err) => err ? reject(err) : resolve());
		});
		await new Promise((resolve, reject) => {
			_mainProcessSession.post("Profiler.start", (err) => err ? reject(err) : resolve());
		});
		require_logger.mainLog.info("[PerfProfiler] Main process CPU Profiler started");
	} catch (err) {
		require_logger.mainLog.warn("[PerfProfiler] Failed to start main process profiling:", String(err));
		_mainProcessSession = null;
	}
	try {
		await win.webContents.executeJavaScript(PERF_PROBE_INJECT_SCRIPT);
		require_logger.mainLog.info("[PerfProfiler] Renderer probe injected");
	} catch (err) {
		require_logger.mainLog.warn("[PerfProfiler] Failed to inject renderer probe:", String(err));
	}
	win.webContents.send("perf:recording-state-changed", "recording");
	require_logger.mainLog.info("[PerfProfiler] Performance recording started");
	_recordingTimer = setTimeout(async () => {
		if (_profilingState !== "recording") return;
		require_logger.mainLog.warn(`[PerfProfiler] Recording timed out after ${RECORDING_TIMEOUT_MS / 1e3}s, auto-stopping`);
		const outputDir = await stopProfiling();
		if (outputDir) {
			const { shell } = await import("electron");
			shell.openPath(outputDir).catch(() => {});
			electron.dialog.showMessageBox({
				type: "info",
				message: "性能录制已自动停止",
				detail: `录制已达到最大时长（${RECORDING_TIMEOUT_MS / 6e4} 分钟），已自动停止并保存数据。\n\n数据目录：\n${outputDir}`,
				buttons: ["好的"]
			}).catch(() => {});
		}
	}, RECORDING_TIMEOUT_MS);
}
/**
* 停止性能录制，收集所有 CDP 数据并保存到 perf-analysis 目录
* @returns 输出目录路径
*/
async function stopProfiling() {
	if (_profilingState !== "recording") {
		require_logger.mainLog.warn("[PerfProfiler] Not currently recording, ignoring stop request");
		return;
	}
	_profilingState = "stopping";
	if (_recordingTimer) {
		clearTimeout(_recordingTimer);
		_recordingTimer = null;
	}
	refreshMenu();
	require_logger.mainLog.info("[PerfProfiler] Stopping CDP performance trace recording...");
	const win = electron.BrowserWindow.getFocusedWindow() || electron.BrowserWindow.getAllWindows()[0];
	if (!win || win.isDestroyed()) {
		require_logger.mainLog.error("[PerfProfiler] No active window, cannot stop profiling");
		_profilingState = "idle";
		return;
	}
	const debugger_ = win.webContents.debugger;
	const timestamp = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-");
	const outputDir = path.join(getPerfAnalysisDir(), `session-${timestamp}`);
	fs.mkdirSync(outputDir, { recursive: true });
	let perfMetricsEnd = null;
	try {
		_cpuProfile = (await debugger_.sendCommand("Profiler.stop", {}))?.profile ?? null;
		await debugger_.sendCommand("Profiler.disable", {});
		require_logger.mainLog.info("[PerfProfiler] CDP Profiler.stop OK");
		perfMetricsEnd = (await debugger_.sendCommand("Performance.getMetrics", {}))?.metrics ?? null;
		await debugger_.sendCommand("Performance.disable", {}).catch(() => {});
		if (_mainProcessSession) try {
			_mainProcessCpuProfile = await new Promise((resolve, reject) => {
				_mainProcessSession.post("Profiler.stop", (err, result) => {
					if (err) reject(err);
					else resolve(result?.profile ?? null);
				});
			});
			_mainProcessSession.post("Profiler.disable", () => {});
			_mainProcessSession.disconnect();
			_mainProcessSession = null;
			require_logger.mainLog.info("[PerfProfiler] Main process CPU Profiler stopped");
		} catch (err) {
			require_logger.mainLog.warn("[PerfProfiler] Failed to stop main process profiler:", String(err));
		}
		const TRACING_END_TIMEOUT_MS = 6e4;
		await new Promise((resolve) => {
			let done = false;
			const finish = () => {
				if (!done) {
					done = true;
					resolve();
				}
			};
			const onMessage = (_event, method) => {
				if (method === "Tracing.tracingComplete") {
					clearTimeout(timer);
					debugger_.removeListener("message", onMessage);
					finish();
				}
			};
			const timer = setTimeout(() => {
				debugger_.removeListener("message", onMessage);
				require_logger.mainLog.warn(`[PerfProfiler] Tracing.tracingComplete timed out after ${TRACING_END_TIMEOUT_MS}ms, proceeding with collected data`);
				finish();
			}, TRACING_END_TIMEOUT_MS);
			debugger_.on("message", onMessage);
			debugger_.sendCommand("Tracing.end", {}).catch(() => {
				clearTimeout(timer);
				debugger_.removeListener("message", onMessage);
				finish();
			});
		});
		if (_traceDataHandler) {
			debugger_.removeListener("message", _traceDataHandler);
			_traceDataHandler = null;
		}
		require_logger.mainLog.info(`[PerfProfiler] CDP Tracing.end OK, collected ${_traceEvents.length} events${_traceEventsOverflow ? " (truncated)" : ""}`);
	} catch (err) {
		require_logger.mainLog.error("[PerfProfiler] Error stopping CDP tracing:", String(err));
	} finally {
		if (debugger_.isAttached()) debugger_.detach();
	}
	const traceFile = path.join(outputDir, "trace.json");
	const traceData = JSON.stringify({
		traceEvents: _traceEvents,
		metadata: { "trace-capture": "workbuddy-perf-profiler" }
	});
	fs.writeFileSync(traceFile, traceData, "utf-8");
	const traceSizeMB = (Buffer.byteLength(traceData) / (1024 * 1024)).toFixed(2);
	require_logger.mainLog.info(`[PerfProfiler] trace.json saved (${traceSizeMB} MB, ${_traceEvents.length} events)`);
	if (_cpuProfile) {
		const cpuProfileFile = path.join(outputDir, "cpu-profile.cpuprofile");
		fs.writeFileSync(cpuProfileFile, JSON.stringify(_cpuProfile, null, 2), "utf-8");
		require_logger.mainLog.info("[PerfProfiler] cpu-profile.cpuprofile saved (renderer)");
	}
	if (_mainProcessCpuProfile) {
		const mainCpuFile = path.join(outputDir, "main-process-cpu-profile.cpuprofile");
		fs.writeFileSync(mainCpuFile, JSON.stringify(_mainProcessCpuProfile, null, 2), "utf-8");
		require_logger.mainLog.info("[PerfProfiler] main-process-cpu-profile.cpuprofile saved");
		try {
			const mainCpuParsed = parseCpuProfile(_mainProcessCpuProfile);
			fs.writeFileSync(path.join(outputDir, "main-process-cpu-profile-parsed.json"), JSON.stringify(mainCpuParsed, null, 2), "utf-8");
			require_logger.mainLog.info("[PerfProfiler] main-process-cpu-profile-parsed.json saved");
		} catch (err) {
			require_logger.mainLog.warn("[PerfProfiler] Failed to parse main process CPU profile:", String(err));
		}
	}
	try {
		const traceObj = { traceEvents: _traceEvents };
		const traceEventsExtract = extractTraceEvents(traceObj);
		const timeBreakdown = computeTimeBreakdown(traceObj);
		fs.writeFileSync(path.join(outputDir, "trace-events-extract.json"), JSON.stringify(traceEventsExtract, null, 2), "utf-8");
		fs.writeFileSync(path.join(outputDir, "time-breakdown.json"), JSON.stringify(timeBreakdown, null, 2), "utf-8");
		require_logger.mainLog.info("[PerfProfiler] trace-events-extract.json + time-breakdown.json saved");
	} catch (err) {
		require_logger.mainLog.warn("[PerfProfiler] Failed to parse trace:", String(err));
	}
	if (_cpuProfile) try {
		const cpuParsed = parseCpuProfile(_cpuProfile);
		fs.writeFileSync(path.join(outputDir, "cpu-profile-parsed.json"), JSON.stringify(cpuParsed, null, 2), "utf-8");
		require_logger.mainLog.info(`[PerfProfiler] cpu-profile-parsed.json saved (top ${cpuParsed.topSelf.length} functions)`);
	} catch (err) {
		require_logger.mainLog.warn("[PerfProfiler] Failed to parse CPU profile:", String(err));
	}
	if (_perfMetricsStart && perfMetricsEnd) try {
		const toMap = (metrics) => Object.fromEntries(metrics.map((m) => [m.name, m.value]));
		const startMap = toMap(_perfMetricsStart);
		const endMap = toMap(perfMetricsEnd);
		const diff = {};
		for (const key of Object.keys(endMap)) diff[key] = {
			start: startMap[key] ?? 0,
			end: endMap[key],
			delta: endMap[key] - (startMap[key] ?? 0)
		};
		fs.writeFileSync(path.join(outputDir, "perf-metrics-diff.json"), JSON.stringify({
			start: startMap,
			end: endMap,
			diff
		}, null, 2), "utf-8");
		require_logger.mainLog.info("[PerfProfiler] perf-metrics-diff.json saved");
	} catch (err) {
		require_logger.mainLog.warn("[PerfProfiler] Failed to save perf metrics diff:", String(err));
	}
	let probeReport = null;
	try {
		const rawResult = await win.webContents.executeJavaScript(PERF_PROBE_COLLECT_SCRIPT);
		if (rawResult) {
			probeReport = JSON.parse(rawResult);
			require_logger.mainLog.info("[PerfProfiler] Renderer probe data collected");
		}
	} catch (err) {
		require_logger.mainLog.warn("[PerfProfiler] Failed to collect renderer probe data:", String(err));
	}
	win.webContents.send("perf:recording-state-changed", "idle");
	if (probeReport) {
		const probeFile = path.join(outputDir, "probe-report.json");
		fs.writeFileSync(probeFile, JSON.stringify(probeReport, null, 2), "utf-8");
		require_logger.mainLog.info("[PerfProfiler] Probe report saved");
	}
	const summary = {
		sessionId: `session-${timestamp}`,
		associatedProjectDir: _associatedProjectDir,
		associatedGitBranch: _associatedGitInfo,
		recordingStartTime: _recordingStartTime?.toISOString() ?? null,
		recordingEndTime: (/* @__PURE__ */ new Date()).toISOString(),
		timestamp: (/* @__PURE__ */ new Date()).toISOString(),
		files: {
			trace: "trace.json",
			traceEventsExtract: "trace-events-extract.json",
			timeBreakdown: "time-breakdown.json",
			cpuProfile: _cpuProfile ? "cpu-profile.cpuprofile" : null,
			cpuProfileParsed: _cpuProfile ? "cpu-profile-parsed.json" : null,
			mainProcessCpuProfile: _mainProcessCpuProfile ? "main-process-cpu-profile.cpuprofile" : null,
			mainProcessCpuProfileParsed: _mainProcessCpuProfile ? "main-process-cpu-profile-parsed.json" : null,
			perfMetricsDiff: _perfMetricsStart && perfMetricsEnd ? "perf-metrics-diff.json" : null,
			probeReport: probeReport ? "probe-report.json" : null
		},
		stats: {
			traceEvents: _traceEvents.length,
			traceSizeMB: parseFloat(traceSizeMB)
		},
		appVersion: process.env.npm_package_version || "unknown",
		platform: process.platform,
		arch: process.arch,
		electronVersion: process.versions.electron || "unknown"
	};
	fs.writeFileSync(path.join(outputDir, "summary.json"), JSON.stringify(summary, null, 2), "utf-8");
	_traceEvents = [];
	_traceEventsOverflow = false;
	_traceDataHandler = null;
	_cpuProfile = null;
	_mainProcessCpuProfile = null;
	_perfMetricsStart = null;
	_profilingState = "idle";
	refreshMenu();
	setImmediate(() => {
		cleanupExpiredSessions();
	});
	return outputDir;
}
/**
* 仅停止录制并保存数据（不启动 Agent 分析）
* 适用于测试人员：采集数据后手动提 Bug 单附件
*/
async function stopProfilingOnly() {
	const outputDir = await stopProfiling();
	if (!outputDir) {
		electron.dialog.showMessageBox({
			type: "warning",
			message: "未检测到正在进行的性能录制",
			detail: "请先点击「开始录制性能采集」开始录制。",
			buttons: ["确定"]
		}).catch(() => {});
		return;
	}
	const { shell } = await import("electron");
	shell.openPath(outputDir).catch(() => {});
	electron.dialog.showMessageBox({
		type: "info",
		message: "性能采集已完成",
		detail: `采集数据已保存到：\n${outputDir}\n\n已为你打开该目录。\n可将整个文件夹压缩后附到 Bug 单中。`,
		buttons: ["好的"]
	}).catch(() => {});
	require_logger.mainLog.info(`[PerfProfiler] Recording stopped (no analysis). Data saved to: ${outputDir}`);
}
/**
* 停止录制并启动 Agent 会话进行性能分析
*/
async function stopProfilingAndAnalyze() {
	const outputDir = await stopProfiling();
	if (!outputDir) {
		electron.dialog.showMessageBox({
			type: "warning",
			message: "未检测到正在进行的性能录制",
			detail: "请先点击「开始录制性能采集」开始录制。",
			buttons: ["确定"]
		}).catch(() => {});
		return;
	}
	require_logger.mainLog.info(`[PerfProfiler] Data saved to ${outputDir}, launching Agent analysis session...`);
	const prompt = buildAnalysisPrompt(outputDir, _recordingStartTime ?? void 0, _associatedProjectDir ?? void 0, _associatedGitInfo ?? void 0);
	const promptFile = path.join(outputDir, "analysis-prompt.md");
	fs.writeFileSync(promptFile, prompt, "utf-8");
	const win = electron.BrowserWindow.getFocusedWindow() || electron.BrowserWindow.getAllWindows()[0];
	if (!win || win.isDestroyed()) {
		require_logger.mainLog.warn("[PerfProfiler] No window available for creating analysis session");
		return;
	}
	const quickPrompt = `请读取 ${promptFile} 文件内容并按照其中的要求进行性能分析。`;
	const injectScript = `
    (async function() {
        const sleep = (ms) => new Promise(r => setTimeout(r, ms));
        const waitFor = async (predicate, timeoutMs = 5000, intervalMs = 100) => {
            const deadline = Date.now() + timeoutMs;
            while (Date.now() < deadline) {
                const result = predicate();
                if (result) return result;
                await sleep(intervalMs);
            }
            return null;
        };

        // Step 1: 触发新建对话（按 track-id 优先，回退到折叠态 / aria-label）
        const newTaskBtn = document.querySelector('[data-track-id="agent_new_task_button_clicked"]')
            ?? document.querySelector('.conversation-list-collapsed-icon-button')
            ?? Array.from(document.querySelectorAll('button')).find(b => /新建任务|New Task/.test(b.getAttribute('aria-label') || ''));
        if (newTaskBtn) newTaskBtn.click();
        else console.warn('[PerfProfiler] new-task button not found, assuming already in new-task view');

        // Step 2: 等输入框就绪（Slate contenteditable）
        const editable = await waitFor(
            () => document.querySelector('.cb-chat-input [contenteditable="true"]')
                ?? document.querySelector('[contenteditable="true"]'),
            5000,
        );
        if (!editable) return 'editor_not_found';

        // Step 3: 注入文本到 Slate（用 paste 事件；execCommand('insertText') 不会同步 Slate state，
        // 表现为 placeholder 与文本并存、SendButton 永远 disabled）
        editable.focus();
        await sleep(50);
        try {
            // 光标置于末尾，避免空内容时 selection 不在编辑器内
            const range = document.createRange();
            range.selectNodeContents(editable); range.collapse(false);
            const sel = window.getSelection();
            sel.removeAllRanges(); sel.addRange(range);
        } catch (e) { /* ignore */ }

        const text = ${JSON.stringify(quickPrompt)};
        try {
            const dt = new DataTransfer();
            dt.setData('text/plain', text);
            // Slate 的 onPaste 在 React 事件层；派发原生 ClipboardEvent 会冒泡到 React listener
            editable.dispatchEvent(new ClipboardEvent('paste', { clipboardData: dt, bubbles: true, cancelable: true }));
            return 'prompt_filled';
        } catch (e) {
            console.warn('[PerfProfiler] paste-event injection failed:', e);
            // 兜底：execCommand 路径（Slate 大概率不识别，placeholder 会与文本并存，但用户至少能看到提示）
            document.execCommand('insertText', false, text);
            return 'prompt_filled_fallback';
        }
    })();
    `;
	try {
		const result = await win.webContents.executeJavaScript(injectScript);
		require_logger.mainLog.info(`[PerfProfiler] Analysis prompt fill result: ${result}`);
		const resultStr = String(result);
		if (!(resultStr === "prompt_filled" || resultStr === "prompt_filled_fallback")) {
			const { clipboard } = await import("electron");
			clipboard.writeText(quickPrompt);
			electron.dialog.showMessageBox({
				type: "info",
				message: "性能采集已完成",
				detail: `采集数据已保存到：\n${outputDir}\n\n未能自动填入输入框（reason=${resultStr}），📋 分析指令已复制到剪贴板。\n请手动新建对话并粘贴。`,
				buttons: ["好的"]
			}).catch(() => {});
		}
	} catch (err) {
		require_logger.mainLog.warn("[PerfProfiler] executeJavaScript failed:", String(err));
		const { clipboard } = await import("electron");
		clipboard.writeText(quickPrompt);
		electron.dialog.showMessageBox({
			type: "info",
			message: "性能采集已完成",
			detail: `采集数据已保存到：\n${outputDir}\n\n📋 分析指令已复制到剪贴板。\n请手动新建对话并粘贴。`,
			buttons: ["好的"]
		}).catch(() => {});
	}
}
//#endregion
Object.defineProperty(exports, "detectCdpInspectMode", {
	enumerable: true,
	get: function() {
		return detectCdpInspectMode;
	}
});
Object.defineProperty(exports, "getProfilingState", {
	enumerable: true,
	get: function() {
		return getProfilingState;
	}
});
Object.defineProperty(exports, "isPerfProfilingEnabled", {
	enumerable: true,
	get: function() {
		return isPerfProfilingEnabled;
	}
});
Object.defineProperty(exports, "startProfiling", {
	enumerable: true,
	get: function() {
		return startProfiling;
	}
});
Object.defineProperty(exports, "stopProfiling", {
	enumerable: true,
	get: function() {
		return stopProfiling;
	}
});
Object.defineProperty(exports, "stopProfilingAndAnalyze", {
	enumerable: true,
	get: function() {
		return stopProfilingAndAnalyze;
	}
});
Object.defineProperty(exports, "stopProfilingOnly", {
	enumerable: true,
	get: function() {
		return stopProfilingOnly;
	}
});
Object.defineProperty(exports, "syncPerfMenuStateToWindow", {
	enumerable: true,
	get: function() {
		return syncPerfMenuStateToWindow;
	}
});
