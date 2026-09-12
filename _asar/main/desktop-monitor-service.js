const require_chunk = require("./chunk.js");
const require_common$1 = require("./common.js");
const require_net_log = require("./net-log.js");
const require_src$1 = require("./src.js");
const require_logger$2 = require("./logger2.js");
const require_session_create_timing = require("./session-create-timing.js");
const require_app_instance = require("./app-instance.js");
const require_startup_perf_exporters = require("./startup-perf-exporters.js");
let electron = require("electron");
let node_fs = require("node:fs");
node_fs = require_chunk.__toESM(node_fs);
let node_path = require("node:path");
node_path = require_chunk.__toESM(node_path);
let events = require("events");
//#region ../../packages/monitor/src/common/interfaces/exporter.ts
/**
* Abstract base class implementing common exporter functionality
* Uses Template Method Pattern with hooks for subclass customization
*
* Provides:
* - Error handling and retry support
* - Status tracking (success/failure counts, timing)
* - Lifecycle management (initialize/shutdown)
* - Connection state tracking
*
* Subclasses implement:
* - onInitialize(): Setup resources (connections, file handles, etc.)
* - onShutdown(): Cleanup resources
* - onExport(metrics): Actual export logic
* - onFlush(): Flush pending data (optional)
*/
var AbstractExporter = class {
	constructor(name, enabled = true) {
		this.name = name;
		this.enabled = enabled;
		this.connected = false;
		this.initialized = false;
		this.successCount = 0;
		this.failureCount = 0;
		this.queueSize = 0;
		this.config = { enabled };
	}
	/**
	* Initialize the exporter
	* Template method that calls onInitialize() hook
	*/
	async initialize() {
		if (this.initialized) {
			this.logger?.info(`[${this.name}] Exporter already initialized`);
			return;
		}
		if (!this.enabled) {
			this.logger?.info(`[${this.name}] Exporter is disabled, skipping initialization`);
			return;
		}
		try {
			await this.onInitialize();
			this.initialized = true;
			this.connected = true;
			this.logger?.info(`[${this.name}] Exporter initialized successfully`);
		} catch (error) {
			this.lastError = error;
			this.logger?.error(`[${this.name}] Initialization failed:`, error);
			throw error;
		}
	}
	/**
	* Shutdown the exporter gracefully
	* Template method that calls onShutdown() hook
	*/
	async shutdown() {
		if (!this.initialized) return;
		try {
			await this.flush();
			await this.onShutdown();
			this.connected = false;
			this.initialized = false;
			this.logger?.info(`[${this.name}] Exporter shutdown successfully`);
		} catch (error) {
			this.lastError = error;
			this.logger?.error(`[${this.name}] Shutdown error:`, error);
			throw error;
		}
	}
	/**
	* Export metrics with automatic error handling
	* Template method that calls onExport() hook
	* Re-throws errors for retry logic in upper layers
	*/
	async export(metrics) {
		this.logger?.info(`[${this.name}] export() called with ${metrics?.length || 0} metrics, enabled: ${this.enabled}, initialized: ${this.initialized}`);
		if (!this.enabled || !this.initialized) {
			this.logger?.warn(`[${this.name}] Exporter not ready, enabled: ${this.enabled}, initialized: ${this.initialized}`);
			return;
		}
		if (!metrics || metrics.length === 0) {
			this.logger?.info(`[${this.name}] No metrics to export`);
			return;
		}
		this.queueSize = metrics.length;
		try {
			this.logger?.info(`[${this.name}] Calling onExport() with ${metrics.length} metrics...`);
			await this.onExport(metrics);
			this.successCount++;
			this.lastExportTime = Date.now();
			this.queueSize = 0;
			this.logger?.info(`[${this.name}] onExport() completed successfully`);
		} catch (error) {
			this.failureCount++;
			this.lastError = error;
			this.queueSize = 0;
			this.logger?.error(`[${this.name}] Export failed:`, error);
			throw error;
		}
	}
	/**
	* Flush pending metrics
	* Template method that calls onFlush() hook
	*/
	async flush() {
		if (!this.enabled || !this.initialized) return;
		try {
			await this.onFlush();
		} catch (error) {
			this.lastError = error;
			this.logger?.error(`[${this.name}] Flush error:`, error);
		}
	}
	/**
	* Configure the exporter
	* Template method that calls onConfigure() hook
	*/
	configure(config) {
		this.config = config;
		this.onConfigure(config);
	}
	/**
	* Get current exporter status
	*/
	getStatus() {
		return {
			name: this.name,
			enabled: this.enabled,
			connected: this.connected,
			successCount: this.successCount,
			failureCount: this.failureCount,
			queueSize: this.queueSize,
			lastExportTime: this.lastExportTime,
			lastError: this.lastError
		};
	}
	/**
	* Check connection status
	*/
	isConnected() {
		return this.connected && this.initialized;
	}
	/**
	* Flush any pending/buffered data
	* Called during shutdown and manual flush operations
	* Default implementation is no-op (override if buffering is used)
	*/
	async onFlush() {}
	/**
	* Handle configuration updates
	* Called when configure() is invoked
	* Default implementation is no-op (override if needed)
	*/
	onConfigure(config) {}
};
//#endregion
//#region ../../packages/monitor/src/common/types/metrics.ts
/**
* 指标类型
*/
var MetricType = /* @__PURE__ */ function(MetricType) {
	/** 计数器：单调递增，用于请求总数、错误总数 */
	MetricType["Counter"] = "counter";
	/** 瞬时值：可增可减，用于内存使用、CPU使用、队列长度 */
	MetricType["Gauge"] = "gauge";
	/** 直方图：值分布统计，用于延迟分布、响应时间分布 */
	MetricType["Histogram"] = "histogram";
	/** 可增减计数器：可增可减的计数器，用于活跃连接数、并发请求数 */
	MetricType["UpDownCounter"] = "updowncounter";
	return MetricType;
}({});
//#endregion
//#region ../../packages/monitor/src/exporters/galileo/otel-mapper.ts
var OTelMapper = class {
	constructor(resourceConfig, options) {
		this.scopeName = "genie-monitor";
		this.scopeVersion = "1.0.0";
		this.histogramBounds = [
			1,
			2,
			5,
			10,
			20,
			50,
			100,
			200,
			500,
			1e3,
			2e3,
			5e3,
			1e4,
			2e4,
			3e4
		];
		this.useOtelJsonLogFields = options?.useOtelJsonLogFields === true;
		this.resource = { attributes: [
			{
				key: "target",
				value: { stringValue: resourceConfig.target }
			},
			{
				key: "type",
				value: { stringValue: "resource" }
			},
			{
				key: "env_name",
				value: { stringValue: resourceConfig.envName || "production" }
			},
			{
				key: "instance",
				value: { stringValue: resourceConfig.instance || this.generateInstanceId() }
			},
			{
				key: "namespace",
				value: { stringValue: resourceConfig.namespace || "Development" }
			},
			{
				key: "version",
				value: { stringValue: resourceConfig.version }
			},
			{
				key: "container_name",
				value: { stringValue: `genie.${resourceConfig.target}` }
			},
			{
				key: "ideType",
				value: { stringValue: resourceConfig.ideType }
			},
			{
				key: "ideVersion",
				value: { stringValue: resourceConfig.ideVersion }
			},
			{
				key: "os",
				value: { stringValue: resourceConfig.os }
			},
			{
				key: "ext1",
				value: { stringValue: resourceConfig.ext1 || "unknown" }
			}
		] };
	}
	/**
	* 转换指标批次为 OTel 格式（按 collector 分组）
	*/
	mapMetrics(metrics) {
		const metricsByCollector = this.groupMetricsByCollector(metrics);
		const scopeMetrics = [];
		for (const [collectorName, collectorMetrics] of metricsByCollector.entries()) {
			const scopeName = this.generateScopeName(collectorName);
			const groupedMetrics = this.groupMetricsByName(collectorMetrics);
			const otelMetrics = [];
			for (const [name, metricGroup] of groupedMetrics.entries()) {
				const otelMetric = this.mapMetricGroup(name, metricGroup);
				if (otelMetric) otelMetrics.push(otelMetric);
			}
			scopeMetrics.push({
				scope: {
					name: scopeName,
					version: this.scopeVersion
				},
				metrics: otelMetrics
			});
		}
		if (scopeMetrics.length === 0) scopeMetrics.push({
			scope: {
				name: this.scopeName,
				version: this.scopeVersion
			},
			metrics: []
		});
		return { resourceMetrics: [{
			resource: this.resource,
			scopeMetrics
		}] };
	}
	/**
	* 按 metadata.collector 分组
	*/
	groupMetricsByCollector(metrics) {
		const groups = /* @__PURE__ */ new Map();
		for (const metric of metrics) {
			let collectorName = metric.metadata?.collector;
			if (!collectorName) collectorName = this.inferCollectorFromMetricName(metric.name);
			if (!groups.has(collectorName)) groups.set(collectorName, []);
			groups.get(collectorName).push(metric);
		}
		return groups;
	}
	/**
	* 从指标名称推断 Collector
	* 用于 fallback，当 metadata.collector 不存在时
	*/
	inferCollectorFromMetricName(metricName) {
		for (const [prefix, collector] of Object.entries({
			"genie.auth.": "AuthCollector",
			"genie.request.": "ChatRequestCollector",
			"genie.checkpoint.": "CheckpointCollector",
			"genie.completion.": "CompletionCollector",
			"genie.file.": "FileOperationCollector",
			"genie.ipc.": "IPCCollector",
			"genie.mcp.": "MCPCollector",
			"genie.page.": "PagePerformanceCollector",
			"genie.tool.": "ToolExecutionCollector",
			"genie.system.": "SystemCollector"
		})) if (metricName.startsWith(prefix)) return collector;
		return "unknown";
	}
	/**
	* 根据 Collector 名称生成 scopeName
	* 直接使用 collector 名称作为 scopeName
	*/
	generateScopeName(collectorName) {
		if (collectorName === "unknown") return "Custom_" + this.scopeName;
		return "Custom_" + collectorName;
	}
	/**
	* 按指标名称分组
	*/
	groupMetricsByName(metrics) {
		const groups = /* @__PURE__ */ new Map();
		for (const metric of metrics) {
			if (!groups.has(metric.name)) groups.set(metric.name, []);
			groups.get(metric.name).push(metric);
		}
		return groups;
	}
	/**
	* 转换单个指标组
	*/
	mapMetricGroup(name, metrics) {
		if (metrics.length === 0) return null;
		switch (metrics[0].type) {
			case MetricType.Counter: return this.mapCounter(name, metrics);
			case MetricType.Gauge: return this.mapGauge(name, metrics);
			case MetricType.Histogram: return this.mapHistogram(name, metrics);
			case MetricType.UpDownCounter: return this.mapUpDownCounter(name, metrics);
			default: return null;
		}
	}
	/**
	* 转换 Counter 指标
	*/
	mapCounter(name, metrics) {
		const dataPoints = metrics.map((metric) => ({
			timeUnixNano: this.toNanoTimestamp(metric.timestamp),
			asDouble: metric.value,
			attributes: this.mapMetricAttributes(metric)
		}));
		return {
			name,
			description: this.getMetricDescription(name),
			unit: this.getMetricUnit(name),
			sum: {
				dataPoints,
				aggregationTemporality: 1,
				isMonotonic: true
			}
		};
	}
	/**
	* 转换 Gauge 指标
	*/
	mapGauge(name, metrics) {
		const dataPoints = metrics.map((metric) => ({
			timeUnixNano: this.toNanoTimestamp(metric.timestamp),
			asDouble: metric.value,
			attributes: this.mapMetricAttributes(metric)
		}));
		return {
			name,
			description: this.getMetricDescription(name),
			unit: this.getMetricUnit(name),
			gauge: { dataPoints }
		};
	}
	/**
	* 转换 Histogram 指标
	*/
	mapHistogram(name, metrics) {
		const dataPoints = this.aggregateHistogramData(metrics);
		return {
			name,
			description: this.getMetricDescription(name),
			unit: this.getMetricUnit(name),
			histogram: {
				dataPoints,
				aggregationTemporality: 1
			}
		};
	}
	/**
	* 转换 UpDownCounter 指标
	*/
	mapUpDownCounter(name, metrics) {
		const dataPoints = metrics.map((metric) => ({
			timeUnixNano: this.toNanoTimestamp(metric.timestamp),
			asDouble: metric.value,
			attributes: this.mapMetricAttributes(metric)
		}));
		return {
			name,
			description: this.getMetricDescription(name),
			unit: this.getMetricUnit(name),
			sum: {
				dataPoints,
				aggregationTemporality: 1,
				isMonotonic: false
			}
		};
	}
	/**
	* 聚合 Histogram 数据到桶中
	*/
	aggregateHistogramData(metrics) {
		const groups = /* @__PURE__ */ new Map();
		for (const metric of metrics) {
			const key = this.getLabelKey(metric.labels);
			if (!groups.has(key)) groups.set(key, []);
			groups.get(key).push(metric);
		}
		const dataPoints = [];
		for (const [, groupMetrics] of groups.entries()) {
			const bucketCounts = new Array(this.histogramBounds.length + 1).fill(0);
			let sum = 0;
			let count = 0;
			for (const metric of groupMetrics) {
				const value = metric.value;
				sum += value;
				count++;
				let bucketIndex = this.histogramBounds.findIndex((bound) => value <= bound);
				if (bucketIndex === -1) bucketIndex = this.histogramBounds.length;
				bucketCounts[bucketIndex]++;
			}
			const latestTimestamp = Math.max(...groupMetrics.map((m) => m.timestamp));
			dataPoints.push({
				timeUnixNano: this.toNanoTimestamp(latestTimestamp),
				count: count.toString(),
				sum,
				bucketCounts: bucketCounts.map((c) => c.toString()),
				explicitBounds: this.histogramBounds,
				attributes: this.mapMetricAttributes(groupMetrics[0])
			});
		}
		return dataPoints;
	}
	/**
	* 将 metric 的 labels 和 attributes 合并转换为 OTel attributes
	*/
	mapMetricAttributes(metric) {
		const result = [];
		if (metric.labels) Object.entries(metric.labels).forEach(([key, value]) => {
			result.push({
				key,
				value: { stringValue: typeof value === "string" ? value : String(value) }
			});
		});
		if (metric.attributes) Object.entries(metric.attributes).forEach(([key, value]) => {
			if (typeof value === "string") result.push({
				key,
				value: { stringValue: value }
			});
			else if (typeof value === "number") if (Number.isInteger(value)) result.push({
				key,
				value: { intValue: String(value) }
			});
			else result.push({
				key,
				value: { doubleValue: value }
			});
			else if (typeof value === "boolean") result.push({
				key,
				value: { boolValue: value }
			});
			else result.push({
				key,
				value: { stringValue: String(value) }
			});
		});
		return result;
	}
	/**
	* 获取 label 的唯一键（用于分组）
	*/
	getLabelKey(labels) {
		return JSON.stringify(labels);
	}
	/**
	* 转换时间戳为纳秒
	*/
	toNanoTimestamp(milliseconds) {
		return Math.round(milliseconds * 1e6).toString();
	}
	/**
	* 获取指标描述
	*/
	getMetricDescription(name) {
		return {
			"genie.request.ipc_request.duration": "IPC request duration (UI to Node)",
			"genie.request.node_receive.duration": "Node receive processing delay",
			"genie.request.http_send.duration": "HTTP send duration to model API",
			"genie.request.model_ttfb": "Model Time To First Byte",
			"genie.request.model_stream.duration": "Model streaming duration",
			"genie.request.first_tool.latency": "First tool execution latency",
			"genie.request.tools_execution.duration": "All tools execution duration",
			"genie.request.ipc_response.duration": "IPC response duration (Node to UI)",
			"genie.request.success.total": "Total successful requests",
			"genie.request.failure.total": "Total failed requests",
			"genie.request.total": "Total requests",
			"genie.request.tool.duration": "Tool execution duration",
			"genie.request.tool.success.total": "Total successful tool executions",
			"genie.request.tool.failure.total": "Total failed tool executions",
			"genie.ipc.call.duration": "IPC call duration",
			"genie.ipc.call.success.total": "Total successful IPC calls",
			"genie.ipc.call.failure.total": "Total failed IPC calls",
			"genie.ipc.queue_depth": "IPC queue depth"
		}[name] || "";
	}
	/**
	* 获取指标单位
	*/
	getMetricUnit(name) {
		if (name.includes("duration") || name.includes("latency") || name.includes("ttfb")) return "ms";
		if (name.includes(".total")) return "1";
		if (name.includes("queue_depth")) return "1";
		return "";
	}
	/**
	* 生成实例 ID
	*/
	generateInstanceId() {
		return `instance-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
	}
	/**
	* 更新 Resource 配置
	*/
	updateResource(config) {
		this.resource = { attributes: [
			{
				key: "target",
				value: { stringValue: config.target }
			},
			{
				key: "type",
				value: { stringValue: "resource" }
			},
			{
				key: "env_name",
				value: { stringValue: config.envName || "production" }
			},
			{
				key: "instance",
				value: { stringValue: config.instance || this.getCurrentInstance() }
			},
			{
				key: "namespace",
				value: { stringValue: config.namespace || "Development" }
			},
			{
				key: "version",
				value: { stringValue: config.version }
			},
			{
				key: "container_name",
				value: { stringValue: `genie.${config.target}` }
			},
			{
				key: "ideType",
				value: { stringValue: config.ideType }
			},
			{
				key: "ideVersion",
				value: { stringValue: config.ideVersion }
			},
			{
				key: "os",
				value: { stringValue: config.os }
			},
			{
				key: "ext1",
				value: { stringValue: config.ext1 || "unknown" }
			}
		] };
	}
	/**
	* 获取当前实例 ID
	*/
	getCurrentInstance() {
		return this.resource.attributes.find((attr) => attr.key === "instance")?.value.stringValue || this.generateInstanceId();
	}
	/**
	* 转换 Traces 为 OTel 格式
	* @param spans - Span 数组
	* @returns OTel Trace Export Request
	*/
	mapTraces(spans, defaultUid) {
		const firstSpan = spans[0] || {};
		const sessionId = firstSpan.sessionId || firstSpan.attributes?.sessionId || "unknown";
		const uid = firstSpan.uid || firstSpan.attributes?.uid || defaultUid || "unknown";
		const resourceAttributeMap = new Map([
			["target", {
				key: "target",
				value: { stringValue: "TAMv2.codebuddy-web" }
			}],
			["session_id", {
				key: "session_id",
				value: { stringValue: sessionId }
			}],
			["type", {
				key: "type",
				value: { stringValue: "resource" }
			}],
			["uid", {
				key: "uid",
				value: { stringValue: uid }
			}],
			["ideType", {
				key: "ideType",
				value: { stringValue: "genie" }
			}],
			["ideVersion", {
				key: "ideVersion",
				value: { stringValue: "1.0.0" }
			}]
		]);
		for (const attr of this.resource.attributes) resourceAttributeMap.set(attr.key, {
			key: attr.key,
			value: { stringValue: attr.value.stringValue }
		});
		resourceAttributeMap.set("session_id", {
			key: "session_id",
			value: { stringValue: sessionId }
		});
		resourceAttributeMap.set("uid", {
			key: "uid",
			value: { stringValue: uid }
		});
		const resourceAttributes = [...resourceAttributeMap.values()];
		const otelSpans = spans.map((span) => {
			const startTimeUnixNano = this.toNanoTimestamp(span.startTime);
			const endTimeUnixNano = span.endTime ? this.toNanoTimestamp(span.endTime) : void 0;
			return {
				traceId: span.traceId,
				trace_id: span.traceId,
				spanId: span.spanId,
				span_id: span.spanId,
				parentSpanId: span.parentSpanId || void 0,
				parent_span_id: span.parentSpanId || void 0,
				name: span.name,
				kind: this.mapSpanKind(span.kind),
				startTimeUnixNano,
				start_time_unix_nano: startTimeUnixNano,
				endTimeUnixNano,
				end_time_unix_nano: endTimeUnixNano,
				attributes: this.mapSpanAttributes(span.attributes || {}),
				status: { code: span.status === "ok" ? 1 : span.status === "error" ? 2 : 0 },
				events: (span.events || []).map((event) => {
					const timeUnixNano = this.toNanoTimestamp(event.timestamp);
					return {
						name: event.name,
						timeUnixNano,
						time_unix_nano: timeUnixNano,
						attributes: this.mapSpanAttributes(event.attributes || {}),
						droppedAttributesCount: 0
					};
				}),
				links: span.links || [],
				droppedAttributesCount: 0,
				droppedEventsCount: 0,
				droppedLinksCount: 0
			};
		});
		return { resourceSpans: [{
			resource: {
				attributes: resourceAttributes,
				droppedAttributesCount: 0
			},
			scopeSpans: [{
				scope: {
					name: this.scopeName,
					version: this.scopeVersion
				},
				spans: otelSpans
			}]
		}] };
	}
	/**
	* 转换 Logs 为 OTel 格式
	* @param logs - Log 数组
	* @returns OTel Log Export Request
	*/
	mapLogs(logs, defaultUid) {
		const firstLog = logs[0] || {};
		const uid = firstLog.attributes?.uid || defaultUid || "unknown";
		const sessionId = firstLog.attributes?.sessionId || "unknown";
		const version = firstLog.attributes?.ideVersion || "unknown";
		const resourceAttributes = [
			{
				key: "telemetry.sdk.language",
				value: { stringValue: "javascript" }
			},
			{
				key: "telemetry.sdk.name",
				value: { stringValue: "galileo" }
			},
			{
				key: "telemetry.sdk.version",
				value: { stringValue: "0.0.1" }
			},
			{
				key: "ideType",
				value: { stringValue: firstLog.attributes?.ideType || "unknown" }
			},
			{
				key: "ideVersion",
				value: { stringValue: version }
			},
			{
				key: "uid",
				value: { stringValue: uid }
			},
			{
				key: "session_id",
				value: { stringValue: sessionId }
			},
			...this.resource.attributes.map((attr) => ({
				key: attr.key,
				value: { stringValue: attr.value.stringValue }
			}))
		];
		const logRecords = logs.map((log) => {
			const logRecord = log;
			const rawAttributes = logRecord.attributes || {};
			const rawTraceId = logRecord.traceId || logRecord.trace_id || rawAttributes.trace_id || rawAttributes.traceId;
			const rawSpanId = logRecord.spanId || logRecord.span_id || rawAttributes.span_id || rawAttributes.spanId;
			const traceId = rawTraceId || "00000000000000000000000000000000";
			const spanId = rawSpanId || "0000000000000000";
			const timeUnixNano = this.toNanoTimestamp(log.timestamp);
			const severityNumber = this.mapLogSeverity(logRecord.level || "info");
			const severityText = (logRecord.level || "info").toUpperCase();
			const attributes = this.useOtelJsonLogFields && rawTraceId && rawSpanId ? {
				...rawAttributes,
				trace_id: traceId,
				span_id: spanId,
				traceId,
				spanId
			} : rawAttributes;
			return {
				traceId,
				trace_id: traceId,
				traceID: traceId,
				spanId,
				span_id: spanId,
				spanID: spanId,
				timeUnixNano,
				time_unix_nano: timeUnixNano,
				severityNumber,
				severity_number: severityNumber,
				severityText,
				severity_text: severityText,
				body: { stringValue: logRecord.message || "" },
				attributes: this.mapLogAttributes(attributes),
				flags: 1
			};
		});
		if (!this.useOtelJsonLogFields) return { resource_logs: [{
			resource: { attributes: this.toLegacyAttributes(resourceAttributes) },
			instrumentation_library_logs: [{
				instrumentation_library: {
					name: this.scopeName,
					version: this.scopeVersion
				},
				log_records: logRecords.map((record) => ({
					trace_id: record.traceId,
					span_id: record.spanId,
					time_unix_nano: record.timeUnixNano,
					severity_number: record.severityNumber,
					severity_text: record.severityText,
					body: { string_value: record.body.stringValue },
					attributes: this.toLegacyAttributes(record.attributes),
					flags: record.flags
				}))
			}]
		}] };
		return { resourceLogs: [{
			resource: { attributes: resourceAttributes },
			scopeLogs: [{
				scope: {
					name: this.scopeName,
					version: this.scopeVersion
				},
				logRecords
			}]
		}] };
	}
	/**
	* 映射 Span Kind
	*/
	mapSpanKind(kind) {
		return {
			"internal": 1,
			"server": 2,
			"client": 3,
			"producer": 4,
			"consumer": 5
		}[kind || "internal"] || 1;
	}
	/**
	* 映射 Span Attributes
	*/
	mapSpanAttributes(attributes) {
		return Object.entries(attributes).map(([key, value]) => ({
			key,
			value: this.mapAttributeValue(value)
		}));
	}
	/**
	* 映射 Log Attributes
	*/
	toLegacyAttributes(attributes) {
		return attributes.map((attr) => ({
			key: attr.key,
			value: { string_value: String(attr.value.stringValue ?? attr.value.intValue ?? attr.value.doubleValue ?? attr.value.boolValue ?? "") }
		}));
	}
	mapLogAttributes(attributes) {
		return Object.entries(attributes).map(([key, value]) => ({
			key,
			value: this.mapAttributeValue(value)
		}));
	}
	/**
	* 映射 Attribute Value
	*/
	mapAttributeValue(value) {
		if (typeof value === "string") return { stringValue: value };
		else if (typeof value === "number") if (Number.isInteger(value)) return { intValue: String(value) };
		else return { doubleValue: value };
		else if (typeof value === "boolean") return { boolValue: value };
		else return { stringValue: String(value) };
	}
	/**
	* 映射 Log Severity
	*/
	mapLogSeverity(level) {
		return {
			"trace": "SEVERITY_NUMBER_TRACE",
			"debug": "SEVERITY_NUMBER_DEBUG",
			"info": "SEVERITY_NUMBER_INFO",
			"warn": "SEVERITY_NUMBER_WARN",
			"error": "SEVERITY_NUMBER_ERROR",
			"fatal": "SEVERITY_NUMBER_FATAL"
		}[level.toLowerCase()] || "SEVERITY_NUMBER_INFO";
	}
};
//#endregion
//#region ../../packages/monitor/src/exporters/galileo-exporter.ts
/**
* Galileo Exporter
*
* 将监控指标导出到 Galileo 平台（腾讯内部 OTel 平台）
*
* 功能：
* - OTel 格式转换（使用 OTelMapper）
* - HTTP 批量导出（50 metrics/batch）
* - 指数退避重试（1s → 2s → 4s → 8s → 16s → 30s）
* - 连接健康检查
* - 队列管理和限流
*
* Endpoint: http://otlp.j.woa.com
*/
/**
* Galileo Exporter Implementation
*/
var GalileoExporter = class extends AbstractExporter {
	constructor(config, contextProvider, httpClient, logger) {
		super("GalileoExporter", config.enabled);
		this.exportQueue = [];
		this.isExporting = false;
		this.traceQueue = [];
		this.isExportingTraces = false;
		this.maxRetries = 3;
		this.retryDelay = 1e3;
		this.backoffMultiplier = 2;
		this.maxRetryDelay = 3e4;
		this.consecutiveFailures = 0;
		this.config = config;
		let resourceConfig = config.resource || {};
		if (contextProvider?.getEnvironmentInfo) resourceConfig = {
			...resourceConfig,
			...contextProvider.getEnvironmentInfo()
		};
		if (contextProvider?.getSystemContext) resourceConfig = {
			...resourceConfig,
			...contextProvider.getSystemContext()
		};
		this.mapper = new OTelMapper(resourceConfig, { useOtelJsonLogFields: config.useOtelJsonLogFields === true });
		this.httpClient = httpClient || this.createDefaultHttpClient();
		config.resource = resourceConfig;
		this.config = config;
		this.onConfigure(config);
		if (logger) {
			this.logger = logger;
			this.logger?.setContext?.("GalileoExporter");
		}
	}
	async onInitialize() {
		this.logger?.info(`[GalileoExporter] Initializing with endpoint: ${this.config.endpoint}`);
		if (!this.config.endpoint) throw new Error("Galileo endpoint is required");
		try {
			const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(/* @__PURE__ */ new Error("Health check timeout after 3s")), 3e3));
			await Promise.race([this.healthCheck(), timeoutPromise]);
			this.logger?.info("[GalileoExporter] Health check passed");
		} catch (error) {
			this.logger?.warn("[GalileoExporter] Health check failed, will retry on export:", error);
		}
		this.startFlushTimer();
	}
	async onShutdown() {
		this.logger?.info("[GalileoExporter] Shutting down...");
		this.stopFlushTimer();
		if (this.exportQueue.length > 0) {
			this.logger?.info(`[GalileoExporter] Flushing ${this.exportQueue.length} remaining metrics...`);
			await this.flush();
		}
		this.logger?.info("[GalileoExporter] Shutdown complete");
	}
	async onExport(metrics) {
		this.logger?.info(`[GalileoExporter] onExport called with ${metrics.length} metrics`);
		this.exportQueue.push(...metrics);
		this.queueSize = this.exportQueue.length;
		this.logger?.info(`[GalileoExporter] Queue size: ${this.exportQueue.length}, batchSize: ${this.config.batchSize || 50}`);
		const batchSize = this.config.batchSize || 50;
		if (this.exportQueue.length >= batchSize && !this.isExporting) {
			this.logger?.info("[GalileoExporter] Queue reached batch size, flushing...");
			await this.flush();
		}
	}
	async onFlush() {
		if (this.exportQueue.length > 0 && !this.isExporting) {
			this.isExporting = true;
			try {
				const batchSize = this.config.batchSize || 50;
				while (this.exportQueue.length > 0) {
					const batch = this.exportQueue.splice(0, batchSize);
					this.queueSize = this.exportQueue.length;
					await this.exportBatch(batch);
				}
			} finally {
				this.isExporting = false;
			}
		}
		await this.flushTraces();
	}
	onConfigure(config) {
		const galileoConfig = config;
		this.maxRetries = galileoConfig.retryConfig?.maxRetries ?? 3;
		this.retryDelay = galileoConfig.retryConfig?.retryDelay ?? 1e3;
		this.backoffMultiplier = galileoConfig.retryConfig?.backoffMultiplier ?? 2;
		const calculatedMaxDelay = this.retryDelay * Math.pow(this.backoffMultiplier, this.maxRetries);
		this.maxRetryDelay = Math.min(calculatedMaxDelay, 3e4);
		if (galileoConfig.resource) this.mapper.updateResource(galileoConfig.resource);
		if (this.flushTimer) {
			this.stopFlushTimer();
			this.startFlushTimer();
		}
	}
	/**
	* 获取目标服务名称
	* 供 Collector 使用，避免硬编码服务名称
	*
	* ⚠️ 注意：不同运行模式的区分通过 mode 字段实现
	* - mode 通过 Aegis SDK 的 ext1 字段上报
	* - main → ext1: 'agents-web-app'
	* - widget → ext1: 'agent-manager'
	* - webview → ext1: 'vscode-chat'
	*
	* 在 Galileo 平台查询时可以通过 ext1 字段过滤不同来源的数据
	*/
	getTargetService() {
		return this.config.resource?.target || "TAMv2.codebuddy-web";
	}
	/**
	* 导出一批指标（带重试）
	*/
	async exportBatch(metrics) {
		let lastError;
		this.logger?.info(`[GalileoExporter] exportBatch called with ${metrics.length} metrics`);
		for (let attempt = 0; attempt <= this.maxRetries; attempt++) try {
			this.logger?.info(`[GalileoExporter] Converting ${metrics.length} metrics to OTel format...`);
			const otelData = this.mapper.mapMetrics(metrics);
			this.logger?.info(`[GalileoExporter] Converted to OTel format, resourceMetrics count: ${otelData.resourceMetrics?.length || 0}`);
			this.logger?.info("[GalileoExporter] Sending to Galileo...");
			await this.sendToGalileo(otelData);
			this.lastSuccessTime = Date.now();
			this.consecutiveFailures = 0;
			this.logger?.info(`[GalileoExporter] Successfully exported ${metrics.length} metrics`);
			return;
		} catch (error) {
			lastError = error;
			this.consecutiveFailures++;
			this.logger?.error(`[GalileoExporter] Export failed (attempt ${attempt + 1}/${this.maxRetries + 1}):`, error);
			if (attempt < this.maxRetries) {
				const delay = this.calculateRetryDelay(attempt);
				this.logger?.info(`[GalileoExporter] Retrying in ${delay}ms...`);
				await this.sleep(delay);
			}
		}
		throw lastError || /* @__PURE__ */ new Error("Export failed after all retries");
	}
	/**
	* 发送数据到 Galileo
	*/
	async sendToGalileo(data) {
		const url = `${this.config.endpoint}/v1/metrics`;
		const timeout = this.config.timeout || 3e4;
		this.logger?.info("[GalileoExporter] ✔️ sendToGalileo CALLED");
		this.logger?.info(`[GalileoExporter]   URL: ${url}`);
		this.logger?.info(`[GalileoExporter]   Timeout: ${timeout}ms`);
		const jsonData = JSON.stringify(data, null, 2);
		this.logger?.info(`[GalileoExporter]   FULL REQUEST DATA:\n${jsonData}`);
		try {
			this.logger?.info("[GalileoExporter] Making HTTP POST request...");
			const response = await this.httpClient.post(url, data, {
				headers: {
					"Content-Type": "application/json",
					"User-Agent": "genie-monitor/1.0.0"
				},
				timeout
			});
			this.logger?.info(`[GalileoExporter] Response status: ${response.status} ${response.statusText}`);
			if (response.status < 200 || response.status >= 300) throw new Error(`Galileo returned status ${response.status}: ${response.statusText}`);
		} catch (error) {
			const errorCode = error.code;
			if (errorCode === "ECONNREFUSED") throw new Error(`Cannot connect to Galileo at ${this.config.endpoint}`);
			else if (errorCode === "ETIMEDOUT") throw new Error(`Request to Galileo timed out after ${timeout}ms`);
			else throw error;
		}
	}
	/**
	* 健康检查
	*/
	async healthCheck() {
		const url = `${this.config.endpoint}/health`;
		try {
			this.logger?.info(`[GalileoExporter] Starting health check to ${url}`);
			const response = await this.httpClient.post(url, {}, { timeout: 3e3 });
			this.logger?.info(`[GalileoExporter] Health check response status: ${response.status}`);
			if (response.status !== 200) throw new Error(`Health check failed with status ${response.status}`);
		} catch (error) {
			this.logger?.warn("[GalileoExporter] Health endpoint not available, will test on first export:", error);
			throw error;
		}
	}
	/**
	* 计算重试延迟（指数退避）
	*/
	calculateRetryDelay(attempt) {
		const delay = this.retryDelay * Math.pow(this.backoffMultiplier, attempt);
		return Math.min(delay, this.maxRetryDelay);
	}
	/**
	* Sleep 工具方法
	*/
	sleep(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
	/**
	* 启动定时 flush
	*/
	startFlushTimer() {
		const interval = this.config.flushInterval || 1e4;
		this.flushTimer = setInterval(async () => {
			try {
				await this.flush();
			} catch (error) {
				this.logger?.error("[GalileoExporter] Flush error:", error);
			}
		}, interval);
		this.logger?.info(`[GalileoExporter] Flush timer started (interval: ${interval}ms)`);
	}
	/**
	* 停止定时 flush
	*/
	stopFlushTimer() {
		if (this.flushTimer) {
			clearInterval(this.flushTimer);
			this.flushTimer = void 0;
			this.logger?.info("[GalileoExporter] Flush timer stopped");
		}
	}
	/**
	* 创建默认 HTTP Client（使用 fetch）
	*/
	createDefaultHttpClient() {
		return { async post(url, data, config) {
			const controller = new AbortController();
			const timeout = config?.timeout || 3e4;
			const timeoutId = setTimeout(() => {
				controller.abort();
			}, timeout);
			try {
				const response = await fetch(url, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						...config?.headers || {}
					},
					body: JSON.stringify(data),
					signal: controller.signal
				});
				const responseData = await response.json().catch(() => ({}));
				return {
					status: response.status,
					statusText: response.statusText,
					data: responseData
				};
			} catch (error) {
				const errorMsg = error instanceof Error ? error.message : String(error);
				const errorName = error instanceof Error ? error.name : void 0;
				console.error("[GalileoExporter] HTTP request failed:", errorMsg);
				if (errorName === "AbortError") throw new Error(`Request timeout after ${timeout}ms`);
				throw error;
			} finally {
				clearTimeout(timeoutId);
			}
		} };
	}
	/**
	* 获取健康状态
	*/
	getHealth() {
		return {
			connected: this.connected,
			lastSuccessTime: this.lastSuccessTime,
			consecutiveFailures: this.consecutiveFailures
		};
	}
	/**
	* 获取队列信息
	*/
	getQueueInfo() {
		return {
			size: this.exportQueue.length,
			isExporting: this.isExporting
		};
	}
	/**
	* 设置 HTTP Client（用于测试）
	*/
	setHttpClient(client) {
		this.httpClient = client;
	}
	/**
	* 手动触发健康检查
	*/
	async checkHealth() {
		await this.healthCheck();
	}
	/**
	* 导出 Traces 到 Galileo
	* @param spans - Span 数组
	*/
	async exportTraces(spans) {
		if (!this.enabled) {
			this.logger?.warn("[GalileoExporter] Not enabled, skipping trace export");
			return;
		}
		if (!spans || spans.length === 0) return;
		this.logger?.info(`[GalileoExporter] exportTraces called with ${spans.length} spans`);
		this.traceQueue.push(...spans);
		if (this.connected && !this.isExportingTraces) await this.flushTraces();
	}
	/**
	* Flush Traces
	*/
	async flushTraces() {
		if (this.traceQueue.length === 0 || this.isExportingTraces) return;
		this.isExportingTraces = true;
		try {
			const batchSize = this.config.batchSize || 50;
			while (this.traceQueue.length > 0) {
				const batch = this.traceQueue.splice(0, batchSize);
				await this.exportTraceBatch(batch);
			}
		} finally {
			this.isExportingTraces = false;
		}
	}
	/**
	* 导出一批 Traces（带重试）
	*/
	async exportTraceBatch(spans) {
		let lastError;
		this.logger?.info(`[GalileoExporter] exportTraceBatch called with ${spans.length} spans`);
		for (let attempt = 0; attempt <= this.maxRetries; attempt++) try {
			const otelTraceData = this.mapper.mapTraces(spans, this.getUserId());
			this.logger?.info("[GalileoExporter] Converted to OTel Trace format");
			await this.sendTracesToGalileo(otelTraceData);
			this.lastSuccessTime = Date.now();
			this.consecutiveFailures = 0;
			this.logger?.info(`[GalileoExporter] Successfully exported ${spans.length} traces`);
			return;
		} catch (error) {
			lastError = error;
			this.consecutiveFailures++;
			this.logger?.error(`[GalileoExporter] Trace export failed (attempt ${attempt + 1}/${this.maxRetries + 1}):`, error);
			if (attempt < this.maxRetries) {
				const delay = this.calculateRetryDelay(attempt);
				this.logger?.info(`[GalileoExporter] Retrying in ${delay}ms...`);
				await this.sleep(delay);
			}
		}
		throw lastError || /* @__PURE__ */ new Error("Trace export failed after all retries");
	}
	/**
	* 发送 Traces 数据到 Galileo
	*/
	async sendTracesToGalileo(data) {
		const url = `${this.config.endpoint}/v1/traces`;
		const timeout = this.config.timeout || 3e4;
		this.logger?.info("[GalileoExporter] ✔️ sendTracesToGalileo CALLED");
		this.logger?.info(`[GalileoExporter]   URL: ${url}`);
		const jsonData = JSON.stringify(data, null, 2);
		this.logger?.info(`[GalileoExporter]   TRACE REQUEST DATA:\n${jsonData}`);
		try {
			const response = await this.httpClient.post(url, data, {
				headers: {
					"Content-Type": "application/json",
					"User-Agent": "genie-monitor/1.0.0"
				},
				timeout
			});
			this.logger?.info(`[GalileoExporter] Response status: ${response.status} ${response.statusText}`);
			if (response.status < 200 || response.status >= 300) throw new Error(`Galileo returned status ${response.status}: ${response.statusText}`);
		} catch (error) {
			const errorCode = error.code;
			if (errorCode === "ECONNREFUSED") throw new Error(`Cannot connect to Galileo at ${this.config.endpoint}`);
			else if (errorCode === "ETIMEDOUT") throw new Error(`Request to Galileo timed out after ${timeout}ms`);
			else throw error;
		}
	}
	/**
	* 导出 Logs 到 Galileo
	* @param logs - Log 数组
	*/
	async exportLogs(logs) {
		if (!this.enabled || !this.connected) {
			if (logs && logs.length > 0) this.logger?.warn("[GalileoExporter] Not enabled or not connected, skipping log export");
			return;
		}
		if (!logs || logs.length === 0) return;
		this.logger?.info(`[GalileoExporter] Exporting ${logs.length} logs`);
		try {
			const otelLogData = this.mapper.mapLogs(logs, this.getUserId());
			const url = `${this.config.endpoint}/v1/logs`;
			const response = await this.httpClient.post(url, otelLogData, {
				headers: {
					"Content-Type": "application/json",
					"User-Agent": "genie-monitor/1.0.0"
				},
				timeout: this.config.timeout || 3e4
			});
			if (response.status < 200 || response.status >= 300) throw new Error(`Galileo returned status ${response.status}`);
			this.logger?.info(`[GalileoExporter] ✓ Exported ${logs.length} logs`);
		} catch (error) {
			this.logger?.error("[GalileoExporter] Log export failed:", error);
			throw error;
		}
	}
	/**
	* 获取用户 ID（从缓存）
	* 优先级：
	* 1. 缓存的 userId (由 AuthenticationManager 订阅自动更新)
	* 2. 'unknown' (默认值)
	*/
	getUserId() {
		return this.config.userId || "unknown";
	}
};
//#endregion
//#region src/main/system/install/pending-telemetry-cleaner.ts
/**
* Pending telemetry file cleaner.
*
* Cleans up files older than RETENTION_DAYS in the pending-telemetry directory.
* Covers all file types: install-*.json.reported, install-*.json.invalid,
* repair-*.json, update-*.json.reported, etc.
*
* Called once during DesktopMonitorService.start(), runs asynchronously
* via setImmediate to avoid blocking startup.
*/
var import_src = /* @__PURE__ */ require_chunk.__toESM(require_src$1.require_src());
require_app_instance.init_app_instance();
var cleanerLog = import_src.default.scope("pending-telemetry-cleaner");
/** File retention period in days */
var RETENTION_DAYS = 10;
var RETENTION_MS = RETENTION_DAYS * 24 * 60 * 60 * 1e3;
function getPendingDir() {
	return require_app_instance.getWorkbuddyPendingTelemetryDir();
}
/**
* Delete files whose mtime exceeds RETENTION_DAYS.
* Non-blocking, errors are logged but never thrown.
*/
function cleanStalePendingTelemetry() {
	setImmediate(() => {
		try {
			const dir = getPendingDir();
			if (!node_fs.existsSync(dir)) return;
			const now = Date.now();
			const entries = node_fs.readdirSync(dir);
			let cleaned = 0;
			for (const entry of entries) {
				const filePath = node_path.join(dir, entry);
				try {
					const stat = node_fs.statSync(filePath);
					if (!stat.isFile()) continue;
					if (now - stat.mtimeMs > RETENTION_MS) {
						node_fs.unlinkSync(filePath);
						cleaned++;
					}
				} catch {}
			}
			if (cleaned > 0) cleanerLog.info(`Cleaned ${cleaned} stale pending-telemetry file(s) older than ${RETENTION_DAYS} days`);
		} catch (err) {
			cleanerLog.warn("cleanStalePendingTelemetry failed:", err);
		}
	});
}
//#endregion
//#region ../../packages/monitor/src/common/interfaces/collector.ts
/**
* Abstract base collector implementation
* Provides common functionality for all collectors
*/
var AbstractCollector = class {
	constructor(name, enabled = true) {
		this.name = name;
		this.enabled = enabled;
		this.running = false;
		this.collectedCount = 0;
		this.errorCount = 0;
		this.config = { enabled };
	}
	async start() {
		if (this.running) return;
		if (!this.enabled) {
			this.logger?.info(`[${this.name}] Collector is disabled, skipping start`);
			return;
		}
		await this.onStart();
		this.running = true;
		this.logger?.info(`[${this.name}] Collector started`);
	}
	async stop() {
		if (!this.running) {
			await this.onStop();
			return;
		}
		await this.onStop();
		this.running = false;
		this.logger?.info(`[${this.name}] Collector stopped`);
	}
	async collect() {
		if (!this.enabled || !this.running) return [];
		try {
			const metrics = await this.onCollect();
			this.collectedCount += metrics.length;
			this.lastCollectTime = Date.now();
			return metrics;
		} catch (error) {
			this.errorCount++;
			this.lastError = error;
			this.logger?.error(`[${this.name}] Collection error:`, error);
			return [];
		}
	}
	configure(config) {
		this.config = config;
		this.onConfigure(config);
	}
	getStatus() {
		return {
			name: this.name,
			enabled: this.enabled,
			running: this.running,
			collectedCount: this.collectedCount,
			errorCount: this.errorCount,
			lastCollectTime: this.lastCollectTime,
			lastError: this.lastError
		};
	}
	isRunning() {
		return this.running;
	}
	/**
	* Hook: Called when configuration changes
	* Subclasses can override to handle config updates
	*/
	onConfigure(config) {}
	/**
	* Collect logs (default implementation returns empty array)
	* Subclasses can override to provide log collection functionality
	*/
	async collectLogs() {
		if (!this.enabled || !this.running) return [];
		try {
			return await this.onCollectLogs();
		} catch (error) {
			this.logger?.error(`[${this.name}] Log collection error:`, error);
			return [];
		}
	}
	/**
	* Hook: Called to collect logs
	* Subclasses can override to implement log collection logic
	* Default: returns empty array (no logs)
	*/
	async onCollectLogs() {
		return [];
	}
};
//#endregion
//#region ../../packages/monitor/src/common/types/ipc-metrics.ts
/**
* IPC通道类型
*/
var IPCChannelType = /* @__PURE__ */ function(IPCChannelType) {
	IPCChannelType["MainToExtHost"] = "main_to_exthost";
	IPCChannelType["ExtHostToMain"] = "exthost_to_main";
	IPCChannelType["ExtHostToWebview"] = "exthost_to_webview";
	IPCChannelType["WebviewToExtHost"] = "webview_to_exthost";
	IPCChannelType["ExtHostToExtHost"] = "exthost_to_exthost";
	return IPCChannelType;
}({});
/**
* IPC消息类型
*/
var IPCMessageType = /* @__PURE__ */ function(IPCMessageType) {
	IPCMessageType["Request"] = "request";
	IPCMessageType["Response"] = "response";
	IPCMessageType["Notification"] = "notification";
	IPCMessageType["Event"] = "event";
	IPCMessageType["Command"] = "command";
	return IPCMessageType;
}({});
IPCChannelType.MainToExtHost, IPCChannelType.ExtHostToMain, IPCChannelType.ExtHostToWebview, IPCChannelType.WebviewToExtHost, IPCMessageType.Request, IPCMessageType.Response, IPCMessageType.Command, IPCMessageType.Event;
//#endregion
//#region ../../packages/monitor/src/common/utils/monitor-logger.ts
/**
* Monitor Logger
*
* 统一的日志抽象层，替代 console.log
* 支持日志级别过滤和环境配置
*/
/**
* 日志级别
*/
var LogLevel = /* @__PURE__ */ function(LogLevel) {
	LogLevel[LogLevel["DEBUG"] = 0] = "DEBUG";
	LogLevel[LogLevel["INFO"] = 1] = "INFO";
	LogLevel[LogLevel["WARN"] = 2] = "WARN";
	LogLevel[LogLevel["ERROR"] = 3] = "ERROR";
	LogLevel[LogLevel["NONE"] = 4] = "NONE";
	return LogLevel;
}({});
/**
* Monitor Logger 实现
*/
var MonitorLogger = class MonitorLogger {
	constructor(config) {
		this.config = config;
		this.isProduction = (config.envName || process.env.NODE_ENV) === "production";
	}
	/**
	* 调试日志
	*/
	debug(message, ...args) {
		if (!this.shouldLog(LogLevel.DEBUG)) return;
		console.debug(`[${this.config.component}] ${message}`, ...args);
	}
	/**
	* 信息日志
	*/
	info(message, ...args) {
		if (!this.shouldLog(LogLevel.INFO)) return;
		console.log(`[${this.config.component}] ${message}`, ...args);
	}
	/**
	* 警告日志
	*/
	warn(message, ...args) {
		if (!this.shouldLog(LogLevel.WARN)) return;
		console.warn(`[${this.config.component}] ${message}`, ...args);
	}
	/**
	* 错误日志
	*/
	error(message, error, ...args) {
		if (!this.shouldLog(LogLevel.ERROR)) return;
		if (error instanceof Error) console.error(`[${this.config.component}] ${message}`, error.message, error.stack, ...args);
		else if (error) console.error(`[${this.config.component}] ${message}`, error, ...args);
		else console.error(`[${this.config.component}] ${message}`, ...args);
	}
	/**
	* 判断是否应该记录日志
	*/
	shouldLog(level) {
		if (!this.config.enabled) return false;
		if (this.isProduction && this.config.disableDebugInProduction && level === LogLevel.DEBUG) return false;
		return level >= this.config.minLevel;
	}
	/**
	* 更新配置
	*/
	updateConfig(config) {
		this.config = {
			...this.config,
			...config
		};
	}
	/**
	* 创建子日志记录器
	*/
	createChild(childName) {
		return new MonitorLogger({
			...this.config,
			component: `${this.config.component}:${childName}`
		});
	}
};
LogLevel.INFO;
//#endregion
//#region ../../packages/monitor/src/utils/event-bus.ts
/**
* Monitor Event Bus
*
* 全局事件总线，用于监控系统的事件发射和监听
*
* 特点：
* - 异步事件发射（不阻塞主流程）
* - 错误隔离（监听器错误不影响业务）
* - 类型安全（TypeScript 类型定义）
*/
/**
* 监控事件总线
*
* 扩展自 Node.js EventEmitter，提供类型安全的事件发射和监听
*/
var MonitorEventBus = class extends events.EventEmitter {
	constructor() {
		super();
		this.logger = new MonitorLogger({
			component: "MonitorEventBus",
			minLevel: LogLevel.INFO,
			enabled: false
		});
		this.setMaxListeners(100);
	}
	/**
	* 异步发射事件
	*
	* 使用 setImmediate 确保事件处理不阻塞当前执行流程
	* 错误会被捕获并记录，不会影响业务逻辑
	*
	* @param event - 事件名称
	* @param payload - 事件 payload
	*/
	emitAsync(event, payload) {
		this.logger.info(`emitAsync called, event: ${String(event)}, listeners: ${this.listenerCount(event)}`);
		setImmediate(() => {
			try {
				this.logger.info(`Emitting event: ${String(event)} to ${this.listenerCount(event)} listeners`);
				this.emit(event, payload);
				this.logger.info(`Event emitted successfully: ${String(event)}`);
			} catch (error) {
				this.logger.error(`Error emitting event ${event}:`, error);
			}
		});
	}
	/**
	* 类型安全的事件监听
	*
	* @param event - 事件名称
	* @param listener - 事件处理函数
	*/
	onMonitor(event, listener) {
		this.logger.info(`onMonitor called, event: ${String(event)}, total listeners after: ${this.listenerCount(event) + 1}`);
		return this.on(event, listener);
	}
	/**
	* 移除类型安全的事件监听
	*
	* @param event - 事件名称
	* @param listener - 事件处理函数
	*/
	offMonitor(event, listener) {
		return this.off(event, listener);
	}
	/**
	* 一次性事件监听
	*
	* @param event - 事件名称
	* @param listener - 事件处理函数
	*/
	onceMonitor(event, listener) {
		return this.once(event, listener);
	}
	/**
	* 获取事件统计信息
	*/
	getEventStats() {
		const stats = {};
		for (const event of this.eventNames()) stats[event] = this.listenerCount(event);
		return stats;
	}
	/**
	* 清理所有监听器
	*/
	clearAll() {
		this.removeAllListeners();
	}
};
/**
* 全局单例
*
* 整个应用共享同一个 EventBus 实例
*
* 使用 global 对象确保即使模块被重新加载（reload），也使用同一个实例
* 这解决了 VSCode reload 后事件监听器丢失的问题
*/
var GLOBAL_EVENT_BUS_KEY = "__GENIE_MONITOR_EVENT_BUS__";
function getOrCreateEventBus() {
	const globalObj = global;
	if (!globalObj[GLOBAL_EVENT_BUS_KEY]) globalObj[GLOBAL_EVENT_BUS_KEY] = new MonitorEventBus();
	return globalObj[GLOBAL_EVENT_BUS_KEY];
}
var monitorEventBus = getOrCreateEventBus();
//#endregion
//#region ../../packages/monitor/src/browser/aegis/config.ts
/**
* 默认配置
*/
var DEFAULT_CONFIG = {
	enabled: true,
	projectId: "SDK-0c8d8c5d002af41730b2",
	reportUrl: "https://galileotelemetry.tencent.com/collect",
	userId: "anonymous",
	environment: "production",
	version: "0.0.1",
	mode: "main",
	samplingRate: 1,
	debug: false
};
/**
* 获取 Aegis 配置
*/
async function getAegisConfig(options) {
	const config = { ...DEFAULT_CONFIG };
	if (typeof process !== "undefined" && process.env) {
		const isDevGlobal = Boolean(globalThis.__DEV__);
		config.environment = process.env.NODE_ENV === "development" || isDevGlobal ? "development" : "production";
		config.debug = process.env.NODE_ENV === "development";
	}
	try {
		const buildInfo = await getBuildInfo();
		if (buildInfo.version) config.version = buildInfo.version;
		if (buildInfo.env) config.environment = buildInfo.env;
	} catch (error) {
		console.warn("[AegisConfig] Failed to load build info:", error);
	}
	if (options) Object.assign(config, options);
	if (!config.mode) {
		config.mode = detectRunMode();
		console.log("[AegisConfig] ⚠️ 用户未提供 mode，自动检测为:", config.mode);
	} else console.log("[AegisConfig] ✅ 使用用户提供的 mode:", config.mode);
	if (!config.userId) config.userId = await getUserId();
	if (config.environment === "development") config.samplingRate = 1;
	else if (config.environment === "production") config.samplingRate = options?.samplingRate ?? .1;
	return config;
}
/**
* 获取构建信息
*/
async function getBuildInfo() {
	try {
		if (typeof window !== "undefined" && window.__BUILD_INFO__) return window.__BUILD_INFO__;
		return {};
	} catch (error) {
		return {};
	}
}
/**
* 检测运行模式
*/
function detectRunMode() {
	if (typeof window === "undefined") return "main";
	if (window.__WIDGET_MODE__) return "widget";
	try {
		const mode = new URLSearchParams(window.location.search).get("mode");
		if (mode === "widget") return "widget";
		if (mode === "webview") return "webview";
	} catch (error) {}
	return "main";
}
/**
* 获取用户 ID
*/
async function getUserId() {
	try {
		if (typeof localStorage !== "undefined") {
			const storedUserId = localStorage.getItem("aegis_user_id");
			if (storedUserId) return storedUserId;
			const anonymousId = `anon_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
			localStorage.setItem("aegis_user_id", anonymousId);
			return anonymousId;
		}
	} catch (error) {}
	return "anonymous";
}
//#endregion
//#region ../../packages/monitor/src/browser/aegis/index.ts
/**
* Aegis 监控初始化器
*/
var PlatTypeText = /* @__PURE__ */ function(PlatTypeText) {
	PlatTypeText["android"] = "android";
	PlatTypeText["ios"] = "iOS";
	PlatTypeText["windows"] = "windows";
	PlatTypeText["macos"] = "macOS";
	PlatTypeText["linux"] = "linux";
	PlatTypeText["devtools"] = "devtools";
	PlatTypeText["other"] = "other";
	return PlatTypeText;
}({});
function getHostPlatform() {
	return globalThis.__hostPlatform;
}
function mapNodePlatform(platform) {
	return {
		"darwin": PlatTypeText.macos,
		"win32": PlatTypeText.windows,
		"linux": PlatTypeText.linux,
		"android": PlatTypeText.android
	}[platform] || PlatTypeText.other;
}
function getPlatform() {
	const host = getHostPlatform();
	if (host?.platform) return mapNodePlatform(host.platform);
	const ua = navigator.userAgent.toLowerCase();
	if (ua.includes("macintosh") || ua.includes("mac os")) return PlatTypeText.macos;
	if (ua.includes("windows")) return PlatTypeText.windows;
	if (ua.includes("linux")) return PlatTypeText.linux;
	if (ua.includes("android")) return PlatTypeText.android;
	if (ua.includes("iphone") || ua.includes("ipad")) return PlatTypeText.ios;
	if (ua.includes("devtools")) return PlatTypeText.devtools;
	return PlatTypeText.other;
}
function getArch() {
	const host = getHostPlatform();
	const arch = host?.hostArch ?? host?.arch;
	if (arch) return arch;
	const ua = navigator.userAgent;
	if (ua.includes("arm64") || ua.includes("aarch64")) return "arm64";
	if (ua.includes("wow64")) return "x64";
	if (ua.includes("win64") && ua.includes("x64")) return "x64";
	if (ua.includes("win32") && ua.includes("x86")) return "ia32";
	return "unknown";
}
var getPlatformWithArch = () => {
	return `${getPlatform()}_${getArch()}`;
};
/**
* Aegis 监控管理器
*
* 职责：仅负责 Aegis SDK 的生命周期（初始化 / setConfig / destroy）。
* 账号 uid 的订阅与同步是调用方的责任：调用方在 init 完成后调用 setConfig({ uid })
* 并自行订阅账号变化继续 setConfig，monitor 不感知业务侧账号模型。
*/
var AegisMonitor = class {
	constructor() {
		this.aegisInstance = null;
		this.initialized = false;
		this.firstSessionPromise = null;
	}
	/**
	* 初始化 Aegis 监控
	*/
	async initialize(options) {
		if (typeof window === "undefined") return;
		if (this.initialized) return;
		try {
			const config = await getAegisConfig(options);
			if (!config.enabled) return;
			this.aegisInstance = new (await (this.loadAegisSDK()))({
				id: config.projectId,
				uid: config.userId,
				hostUrl: { url: config.reportUrl },
				compress: true,
				env: config.environment,
				extField: {
					wb_process: this.getModeIdentifier(config.mode),
					wb_version: config.version,
					appVersion: config.version,
					wb_env: config.environment,
					platform: getPlatformWithArch(),
					...config.patchName ? { wb_patch_name: config.patchName } : {}
				},
				plugin: {
					device: true,
					close: true,
					aid: true,
					fId: false,
					ie: false,
					pv: true,
					spa: true,
					blankScreen: true,
					error: true,
					apiSpeed: true,
					api: true,
					pagePerformance: true,
					webVitals: true,
					assetSpeed: true,
					session: true
				}
			});
			if (this.aegisInstance) this.aegisInstance.reportEvent({
				name: "aegis_init",
				ext1: config.mode,
				ext2: config.version
			});
			this.firstSessionPromise = this.awaitFirstSession();
			this.initialized = true;
			this.reportAppStart(config);
		} catch (error) {
			console.error("[AegisMonitor] initialize failed:", error);
			throw error;
		}
	}
	/**
	* 动态加载 Aegis SDK
	*/
	async loadAegisSDK() {
		try {
			const module = await Promise.resolve().then(() => /* @__PURE__ */ require_chunk.__toESM(require("./aegis.min.js").default));
			return module.default || module;
		} catch (error) {
			console.error("[AegisMonitor] load SDK failed:", error);
			throw new Error(`Failed to load @tencent/aegis-web-sdk-v2: ${error}`);
		}
	}
	/**
	* 上报应用启动事件
	*/
	reportAppStart(config) {
		if (!this.aegisInstance) return;
		try {
			const startTime = performance.now();
			this.aegisInstance.reportTime({
				name: "app_start",
				duration: Math.round(startTime),
				ext1: config.mode
			});
			if (typeof navigator !== "undefined") this.aegisInstance.reportEvent({
				name: "device_info",
				ext1: navigator.userAgent,
				ext2: `${window.screen.width}x${window.screen.height}`,
				ext3: navigator.language
			});
		} catch (error) {
			console.warn("[AegisMonitor] reportAppStart failed:", error);
		}
	}
	/**
	* 获取 Aegis 实例
	*/
	getInstance() {
		return this.aegisInstance;
	}
	/**
	* 检查是否已初始化
	*/
	isInitialized() {
		return this.initialized;
	}
	setConfig(patch) {
		if (!this.initialized || !this.aegisInstance) return;
		try {
			this.aegisInstance.setConfig(patch);
		} catch (error) {
			console.warn("[AegisMonitor] setConfig failed:", error);
		}
	}
	/**
	* 读取当前 Aegis 会话 ID（来自 web-sdk session 插件写入的 snapshootInfo.session.id）。
	*
	* 用途：用于把 renderer 端 sessionId 同步给 main 进程的 Aegis 实例，
	* 以贯通同一次会话在 renderer / main 两个 SDK 实例上的 session 维度。
	*
	* 注意：sessionInit 是异步事件（session 插件 onNewAegis 内部生成），
	* 调用方应先 onSessionReady 注册回调，再用本方法兜底读取。
	*/
	getSessionId() {
		return this.aegisInstance?.snapshootInfo?.session?.id;
	}
	/**
	* 订阅 Aegis 会话就绪 / 重建事件。
	*
	* 首次 sessionId 通过 `firstSessionPromise`（在 initialize 内启动 race）
	* 保证不漏：事件已早触发完 / snapshoot 写入晚 / 立即可读，三种情况都能拿到。
	* 之后的 sessionRebuild 经事件订阅推送。
	*
	* 返回 unsubscribe 函数，停止 rebuild 事件订阅；首次回调若仍在 pending
	* 则被 lastDelivered 标记忽略。
	*/
	onSessionReady(callback) {
		if (!this.aegisInstance) return () => {};
		const aegis = this.aegisInstance;
		let unsubscribed = false;
		let lastDelivered = "";
		const deliver = (sid) => {
			if (unsubscribed || !sid || sid === lastDelivered) return;
			lastDelivered = sid;
			try {
				callback(sid);
			} catch (error) {
				console.warn("[AegisMonitor] onSessionReady cb threw:", error);
			}
		};
		this.firstSessionPromise?.then(deliver).catch(() => void 0);
		const handler = (id) => deliver(id ?? aegis.snapshootInfo?.session?.id);
		aegis.event?.on?.("sessionRebuild", handler);
		return () => {
			unsubscribed = true;
			aegis.event?.remove?.("sessionRebuild", handler);
		};
	}
	/**
	* 等待首个 sessionId 就绪。三路并发 race，先到先 resolve：
	*   1. 立即读 snapshootInfo.session.id（已写入则直接返回）
	*   2. 监听 sessionInit 事件（aegis 异步生成时由此触发）
	*   3. 6 秒超时兜底（aegis 未就绪 / session 插件未启用，resolve null）
	*
	* 返回 null 表示超时，调用方应安全降级为不同步 session。
	*/
	awaitFirstSession() {
		if (!this.aegisInstance) return Promise.resolve(null);
		const aegis = this.aegisInstance;
		return new Promise((resolve) => {
			let settled = false;
			let timer;
			const settle = (sid) => {
				if (settled) return;
				settled = true;
				aegis.event?.remove?.("sessionInit", onInit);
				if (timer !== void 0) clearTimeout(timer);
				resolve(sid);
			};
			const onInit = (id) => {
				const sid = id ?? aegis.snapshootInfo?.session?.id;
				if (sid) settle(sid);
			};
			aegis.event?.on?.("sessionInit", onInit);
			const existing = aegis.snapshootInfo?.session?.id;
			if (existing) {
				settle(existing);
				return;
			}
			timer = setTimeout(() => {
				const lateSid = aegis.snapshootInfo?.session?.id;
				settle(lateSid ?? null);
			}, 6e3);
		});
	}
	/**
	* 将 RuntimeEnvironment 映射为 ext1 标识符
	* ⚠️ 必须与 Node 端 (monitor-setup.ts) 的 detectRuntimeMode() 保持统一
	*
	* @param mode - 运行环境模式
	* @returns ext1 标识符（用于全链路追踪）
	*/
	getModeIdentifier(mode) {
		return {
			"main": "agents-web-app",
			"workbuddy-main": "agents-web-app",
			"widget": "agents-web-app",
			"webview": "vscode-chat"
		}[mode] || mode;
	}
	/**
	* 销毁 Aegis 实例
	*/
	destroy() {
		if (this.aegisInstance && typeof this.aegisInstance.destroy === "function") try {
			this.aegisInstance.destroy();
		} catch (error) {
			console.warn("[AegisMonitor] destroy failed:", error);
		}
		this.aegisInstance = null;
		this.initialized = false;
	}
};
new AegisMonitor();
//#endregion
//#region ../../node_modules/react/cjs/react.production.min.js
/**
* @license React
* react.production.min.js
*
* Copyright (c) Facebook, Inc. and its affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_production_min = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	var l = Symbol.for("react.element"), n = Symbol.for("react.portal"), p = Symbol.for("react.fragment"), q = Symbol.for("react.strict_mode"), r = Symbol.for("react.profiler"), t = Symbol.for("react.provider"), u = Symbol.for("react.context"), v = Symbol.for("react.forward_ref"), w = Symbol.for("react.suspense"), x = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), z = Symbol.iterator;
	function A(a) {
		if (null === a || "object" !== typeof a) return null;
		a = z && a[z] || a["@@iterator"];
		return "function" === typeof a ? a : null;
	}
	var B = {
		isMounted: function() {
			return !1;
		},
		enqueueForceUpdate: function() {},
		enqueueReplaceState: function() {},
		enqueueSetState: function() {}
	}, C = Object.assign, D = {};
	function E(a, b, e) {
		this.props = a;
		this.context = b;
		this.refs = D;
		this.updater = e || B;
	}
	E.prototype.isReactComponent = {};
	E.prototype.setState = function(a, b) {
		if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
		this.updater.enqueueSetState(this, a, b, "setState");
	};
	E.prototype.forceUpdate = function(a) {
		this.updater.enqueueForceUpdate(this, a, "forceUpdate");
	};
	function F() {}
	F.prototype = E.prototype;
	function G(a, b, e) {
		this.props = a;
		this.context = b;
		this.refs = D;
		this.updater = e || B;
	}
	var H = G.prototype = new F();
	H.constructor = G;
	C(H, E.prototype);
	H.isPureReactComponent = !0;
	var I = Array.isArray, J = Object.prototype.hasOwnProperty, K = { current: null }, L = {
		key: !0,
		ref: !0,
		__self: !0,
		__source: !0
	};
	function M(a, b, e) {
		var d, c = {}, k = null, h = null;
		if (null != b) for (d in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k = "" + b.key), b) J.call(b, d) && !L.hasOwnProperty(d) && (c[d] = b[d]);
		var g = arguments.length - 2;
		if (1 === g) c.children = e;
		else if (1 < g) {
			for (var f = Array(g), m = 0; m < g; m++) f[m] = arguments[m + 2];
			c.children = f;
		}
		if (a && a.defaultProps) for (d in g = a.defaultProps, g) void 0 === c[d] && (c[d] = g[d]);
		return {
			$$typeof: l,
			type: a,
			key: k,
			ref: h,
			props: c,
			_owner: K.current
		};
	}
	function N(a, b) {
		return {
			$$typeof: l,
			type: a.type,
			key: b,
			ref: a.ref,
			props: a.props,
			_owner: a._owner
		};
	}
	function O(a) {
		return "object" === typeof a && null !== a && a.$$typeof === l;
	}
	function escape(a) {
		var b = {
			"=": "=0",
			":": "=2"
		};
		return "$" + a.replace(/[=:]/g, function(a) {
			return b[a];
		});
	}
	var P = /\/+/g;
	function Q(a, b) {
		return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);
	}
	function R(a, b, e, d, c) {
		var k = typeof a;
		if ("undefined" === k || "boolean" === k) a = null;
		var h = !1;
		if (null === a) h = !0;
		else switch (k) {
			case "string":
			case "number":
				h = !0;
				break;
			case "object": switch (a.$$typeof) {
				case l:
				case n: h = !0;
			}
		}
		if (h) return h = a, c = c(h), a = "" === d ? "." + Q(h, 0) : d, I(c) ? (e = "", null != a && (e = a.replace(P, "$&/") + "/"), R(c, b, e, "", function(a) {
			return a;
		})) : null != c && (O(c) && (c = N(c, e + (!c.key || h && h.key === c.key ? "" : ("" + c.key).replace(P, "$&/") + "/") + a)), b.push(c)), 1;
		h = 0;
		d = "" === d ? "." : d + ":";
		if (I(a)) for (var g = 0; g < a.length; g++) {
			k = a[g];
			var f = d + Q(k, g);
			h += R(k, b, e, f, c);
		}
		else if (f = A(a), "function" === typeof f) for (a = f.call(a), g = 0; !(k = a.next()).done;) k = k.value, f = d + Q(k, g++), h += R(k, b, e, f, c);
		else if ("object" === k) throw b = String(a), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
		return h;
	}
	function S(a, b, e) {
		if (null == a) return a;
		var d = [], c = 0;
		R(a, d, "", "", function(a) {
			return b.call(e, a, c++);
		});
		return d;
	}
	function T(a) {
		if (-1 === a._status) {
			var b = a._result;
			b = b();
			b.then(function(b) {
				if (0 === a._status || -1 === a._status) a._status = 1, a._result = b;
			}, function(b) {
				if (0 === a._status || -1 === a._status) a._status = 2, a._result = b;
			});
			-1 === a._status && (a._status = 0, a._result = b);
		}
		if (1 === a._status) return a._result.default;
		throw a._result;
	}
	var U = { current: null }, V = { transition: null }, W = {
		ReactCurrentDispatcher: U,
		ReactCurrentBatchConfig: V,
		ReactCurrentOwner: K
	};
	function X() {
		throw Error("act(...) is not supported in production builds of React.");
	}
	exports.Children = {
		map: S,
		forEach: function(a, b, e) {
			S(a, function() {
				b.apply(this, arguments);
			}, e);
		},
		count: function(a) {
			var b = 0;
			S(a, function() {
				b++;
			});
			return b;
		},
		toArray: function(a) {
			return S(a, function(a) {
				return a;
			}) || [];
		},
		only: function(a) {
			if (!O(a)) throw Error("React.Children.only expected to receive a single React element child.");
			return a;
		}
	};
	exports.Component = E;
	exports.Fragment = p;
	exports.Profiler = r;
	exports.PureComponent = G;
	exports.StrictMode = q;
	exports.Suspense = w;
	exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W;
	exports.act = X;
	exports.cloneElement = function(a, b, e) {
		if (null === a || void 0 === a) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
		var d = C({}, a.props), c = a.key, k = a.ref, h = a._owner;
		if (null != b) {
			void 0 !== b.ref && (k = b.ref, h = K.current);
			void 0 !== b.key && (c = "" + b.key);
			if (a.type && a.type.defaultProps) var g = a.type.defaultProps;
			for (f in b) J.call(b, f) && !L.hasOwnProperty(f) && (d[f] = void 0 === b[f] && void 0 !== g ? g[f] : b[f]);
		}
		var f = arguments.length - 2;
		if (1 === f) d.children = e;
		else if (1 < f) {
			g = Array(f);
			for (var m = 0; m < f; m++) g[m] = arguments[m + 2];
			d.children = g;
		}
		return {
			$$typeof: l,
			type: a.type,
			key: c,
			ref: k,
			props: d,
			_owner: h
		};
	};
	exports.createContext = function(a) {
		a = {
			$$typeof: u,
			_currentValue: a,
			_currentValue2: a,
			_threadCount: 0,
			Provider: null,
			Consumer: null,
			_defaultValue: null,
			_globalName: null
		};
		a.Provider = {
			$$typeof: t,
			_context: a
		};
		return a.Consumer = a;
	};
	exports.createElement = M;
	exports.createFactory = function(a) {
		var b = M.bind(null, a);
		b.type = a;
		return b;
	};
	exports.createRef = function() {
		return { current: null };
	};
	exports.forwardRef = function(a) {
		return {
			$$typeof: v,
			render: a
		};
	};
	exports.isValidElement = O;
	exports.lazy = function(a) {
		return {
			$$typeof: y,
			_payload: {
				_status: -1,
				_result: a
			},
			_init: T
		};
	};
	exports.memo = function(a, b) {
		return {
			$$typeof: x,
			type: a,
			compare: void 0 === b ? null : b
		};
	};
	exports.startTransition = function(a) {
		var b = V.transition;
		V.transition = {};
		try {
			a();
		} finally {
			V.transition = b;
		}
	};
	exports.unstable_act = X;
	exports.useCallback = function(a, b) {
		return U.current.useCallback(a, b);
	};
	exports.useContext = function(a) {
		return U.current.useContext(a);
	};
	exports.useDebugValue = function() {};
	exports.useDeferredValue = function(a) {
		return U.current.useDeferredValue(a);
	};
	exports.useEffect = function(a, b) {
		return U.current.useEffect(a, b);
	};
	exports.useId = function() {
		return U.current.useId();
	};
	exports.useImperativeHandle = function(a, b, e) {
		return U.current.useImperativeHandle(a, b, e);
	};
	exports.useInsertionEffect = function(a, b) {
		return U.current.useInsertionEffect(a, b);
	};
	exports.useLayoutEffect = function(a, b) {
		return U.current.useLayoutEffect(a, b);
	};
	exports.useMemo = function(a, b) {
		return U.current.useMemo(a, b);
	};
	exports.useReducer = function(a, b, e) {
		return U.current.useReducer(a, b, e);
	};
	exports.useRef = function(a) {
		return U.current.useRef(a);
	};
	exports.useState = function(a) {
		return U.current.useState(a);
	};
	exports.useSyncExternalStore = function(a, b, e) {
		return U.current.useSyncExternalStore(a, b, e);
	};
	exports.useTransition = function() {
		return U.current.useTransition();
	};
	exports.version = "18.3.1";
}));
//#endregion
//#region ../../node_modules/react/cjs/react.development.js
/**
* @license React
* react.development.js
*
* Copyright (c) Facebook, Inc. and its affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_development = /* @__PURE__ */ require_chunk.__commonJSMin(((exports, module) => {
	if (process.env.NODE_ENV !== "production") (function() {
		"use strict";
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart === "function") __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(/* @__PURE__ */ new Error());
		var ReactVersion = "18.3.1";
		var REACT_ELEMENT_TYPE = Symbol.for("react.element");
		var REACT_PORTAL_TYPE = Symbol.for("react.portal");
		var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
		var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
		var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
		var REACT_PROVIDER_TYPE = Symbol.for("react.provider");
		var REACT_CONTEXT_TYPE = Symbol.for("react.context");
		var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
		var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
		var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
		var REACT_MEMO_TYPE = Symbol.for("react.memo");
		var REACT_LAZY_TYPE = Symbol.for("react.lazy");
		var REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen");
		var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
		var FAUX_ITERATOR_SYMBOL = "@@iterator";
		function getIteratorFn(maybeIterable) {
			if (maybeIterable === null || typeof maybeIterable !== "object") return null;
			var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
			if (typeof maybeIterator === "function") return maybeIterator;
			return null;
		}
		/**
		* Keeps track of the current dispatcher.
		*/
		var ReactCurrentDispatcher = { current: null };
		/**
		* Keeps track of the current batch's configuration such as how long an update
		* should suspend for if it needs to.
		*/
		var ReactCurrentBatchConfig = { transition: null };
		var ReactCurrentActQueue = {
			current: null,
			isBatchingLegacy: false,
			didScheduleLegacyUpdate: false
		};
		/**
		* Keeps track of the current owner.
		*
		* The current owner is the component who should own any components that are
		* currently being constructed.
		*/
		var ReactCurrentOwner = { current: null };
		var ReactDebugCurrentFrame = {};
		var currentExtraStackFrame = null;
		function setExtraStackFrame(stack) {
			currentExtraStackFrame = stack;
		}
		ReactDebugCurrentFrame.setExtraStackFrame = function(stack) {
			currentExtraStackFrame = stack;
		};
		ReactDebugCurrentFrame.getCurrentStack = null;
		ReactDebugCurrentFrame.getStackAddendum = function() {
			var stack = "";
			if (currentExtraStackFrame) stack += currentExtraStackFrame;
			var impl = ReactDebugCurrentFrame.getCurrentStack;
			if (impl) stack += impl() || "";
			return stack;
		};
		var enableScopeAPI = false;
		var enableCacheElement = false;
		var enableTransitionTracing = false;
		var enableLegacyHidden = false;
		var enableDebugTracing = false;
		var ReactSharedInternals = {
			ReactCurrentDispatcher,
			ReactCurrentBatchConfig,
			ReactCurrentOwner
		};
		ReactSharedInternals.ReactDebugCurrentFrame = ReactDebugCurrentFrame;
		ReactSharedInternals.ReactCurrentActQueue = ReactCurrentActQueue;
		function warn(format) {
			for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) args[_key - 1] = arguments[_key];
			printWarning("warn", format, args);
		}
		function error(format) {
			for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) args[_key2 - 1] = arguments[_key2];
			printWarning("error", format, args);
		}
		function printWarning(level, format, args) {
			var stack = ReactSharedInternals.ReactDebugCurrentFrame.getStackAddendum();
			if (stack !== "") {
				format += "%s";
				args = args.concat([stack]);
			}
			var argsWithFormat = args.map(function(item) {
				return String(item);
			});
			argsWithFormat.unshift("Warning: " + format);
			Function.prototype.apply.call(console[level], console, argsWithFormat);
		}
		var didWarnStateUpdateForUnmountedComponent = {};
		function warnNoop(publicInstance, callerName) {
			var _constructor = publicInstance.constructor;
			var componentName = _constructor && (_constructor.displayName || _constructor.name) || "ReactClass";
			var warningKey = componentName + "." + callerName;
			if (didWarnStateUpdateForUnmountedComponent[warningKey]) return;
			error("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", callerName, componentName);
			didWarnStateUpdateForUnmountedComponent[warningKey] = true;
		}
		/**
		* This is the abstract API for an update queue.
		*/
		var ReactNoopUpdateQueue = {
			isMounted: function(publicInstance) {
				return false;
			},
			enqueueForceUpdate: function(publicInstance, callback, callerName) {
				warnNoop(publicInstance, "forceUpdate");
			},
			enqueueReplaceState: function(publicInstance, completeState, callback, callerName) {
				warnNoop(publicInstance, "replaceState");
			},
			enqueueSetState: function(publicInstance, partialState, callback, callerName) {
				warnNoop(publicInstance, "setState");
			}
		};
		var assign = Object.assign;
		var emptyObject = {};
		Object.freeze(emptyObject);
		/**
		* Base class helpers for the updating state of a component.
		*/
		function Component(props, context, updater) {
			this.props = props;
			this.context = context;
			this.refs = emptyObject;
			this.updater = updater || ReactNoopUpdateQueue;
		}
		Component.prototype.isReactComponent = {};
		/**
		* Sets a subset of the state. Always use this to mutate
		* state. You should treat `this.state` as immutable.
		*
		* There is no guarantee that `this.state` will be immediately updated, so
		* accessing `this.state` after calling this method may return the old value.
		*
		* There is no guarantee that calls to `setState` will run synchronously,
		* as they may eventually be batched together.  You can provide an optional
		* callback that will be executed when the call to setState is actually
		* completed.
		*
		* When a function is provided to setState, it will be called at some point in
		* the future (not synchronously). It will be called with the up to date
		* component arguments (state, props, context). These values can be different
		* from this.* because your function may be called after receiveProps but before
		* shouldComponentUpdate, and this new state, props, and context will not yet be
		* assigned to this.
		*
		* @param {object|function} partialState Next partial state or function to
		*        produce next partial state to be merged with current state.
		* @param {?function} callback Called after state is updated.
		* @final
		* @protected
		*/
		Component.prototype.setState = function(partialState, callback) {
			if (typeof partialState !== "object" && typeof partialState !== "function" && partialState != null) throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
			this.updater.enqueueSetState(this, partialState, callback, "setState");
		};
		/**
		* Forces an update. This should only be invoked when it is known with
		* certainty that we are **not** in a DOM transaction.
		*
		* You may want to call this when you know that some deeper aspect of the
		* component's state has changed but `setState` was not called.
		*
		* This will not invoke `shouldComponentUpdate`, but it will invoke
		* `componentWillUpdate` and `componentDidUpdate`.
		*
		* @param {?function} callback Called after update is complete.
		* @final
		* @protected
		*/
		Component.prototype.forceUpdate = function(callback) {
			this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
		};
		var deprecatedAPIs = {
			isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
			replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
		};
		var defineDeprecationWarning = function(methodName, info) {
			Object.defineProperty(Component.prototype, methodName, { get: function() {
				warn("%s(...) is deprecated in plain JavaScript React classes. %s", info[0], info[1]);
			} });
		};
		for (var fnName in deprecatedAPIs) if (deprecatedAPIs.hasOwnProperty(fnName)) defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
		function ComponentDummy() {}
		ComponentDummy.prototype = Component.prototype;
		/**
		* Convenience component with default shallow equality check for sCU.
		*/
		function PureComponent(props, context, updater) {
			this.props = props;
			this.context = context;
			this.refs = emptyObject;
			this.updater = updater || ReactNoopUpdateQueue;
		}
		var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
		pureComponentPrototype.constructor = PureComponent;
		assign(pureComponentPrototype, Component.prototype);
		pureComponentPrototype.isPureReactComponent = true;
		function createRef() {
			var refObject = { current: null };
			Object.seal(refObject);
			return refObject;
		}
		var isArrayImpl = Array.isArray;
		function isArray(a) {
			return isArrayImpl(a);
		}
		function typeName(value) {
			return typeof Symbol === "function" && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
		}
		function willCoercionThrow(value) {
			try {
				testStringCoercion(value);
				return false;
			} catch (e) {
				return true;
			}
		}
		function testStringCoercion(value) {
			return "" + value;
		}
		function checkKeyStringCoercion(value) {
			if (willCoercionThrow(value)) {
				error("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", typeName(value));
				return testStringCoercion(value);
			}
		}
		function getWrappedName(outerType, innerType, wrapperName) {
			var displayName = outerType.displayName;
			if (displayName) return displayName;
			var functionName = innerType.displayName || innerType.name || "";
			return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
		}
		function getContextName(type) {
			return type.displayName || "Context";
		}
		function getComponentNameFromType(type) {
			if (type == null) return null;
			if (typeof type.tag === "number") error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.");
			if (typeof type === "function") return type.displayName || type.name || null;
			if (typeof type === "string") return type;
			switch (type) {
				case REACT_FRAGMENT_TYPE: return "Fragment";
				case REACT_PORTAL_TYPE: return "Portal";
				case REACT_PROFILER_TYPE: return "Profiler";
				case REACT_STRICT_MODE_TYPE: return "StrictMode";
				case REACT_SUSPENSE_TYPE: return "Suspense";
				case REACT_SUSPENSE_LIST_TYPE: return "SuspenseList";
			}
			if (typeof type === "object") switch (type.$$typeof) {
				case REACT_CONTEXT_TYPE: return getContextName(type) + ".Consumer";
				case REACT_PROVIDER_TYPE: return getContextName(type._context) + ".Provider";
				case REACT_FORWARD_REF_TYPE: return getWrappedName(type, type.render, "ForwardRef");
				case REACT_MEMO_TYPE:
					var outerName = type.displayName || null;
					if (outerName !== null) return outerName;
					return getComponentNameFromType(type.type) || "Memo";
				case REACT_LAZY_TYPE:
					var lazyComponent = type;
					var payload = lazyComponent._payload;
					var init = lazyComponent._init;
					try {
						return getComponentNameFromType(init(payload));
					} catch (x) {
						return null;
					}
			}
			return null;
		}
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		var RESERVED_PROPS = {
			key: true,
			ref: true,
			__self: true,
			__source: true
		};
		var specialPropKeyWarningShown, specialPropRefWarningShown, didWarnAboutStringRefs = {};
		function hasValidRef(config) {
			if (hasOwnProperty.call(config, "ref")) {
				var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
				if (getter && getter.isReactWarning) return false;
			}
			return config.ref !== void 0;
		}
		function hasValidKey(config) {
			if (hasOwnProperty.call(config, "key")) {
				var getter = Object.getOwnPropertyDescriptor(config, "key").get;
				if (getter && getter.isReactWarning) return false;
			}
			return config.key !== void 0;
		}
		function defineKeyPropWarningGetter(props, displayName) {
			var warnAboutAccessingKey = function() {
				if (!specialPropKeyWarningShown) {
					specialPropKeyWarningShown = true;
					error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
				}
			};
			warnAboutAccessingKey.isReactWarning = true;
			Object.defineProperty(props, "key", {
				get: warnAboutAccessingKey,
				configurable: true
			});
		}
		function defineRefPropWarningGetter(props, displayName) {
			var warnAboutAccessingRef = function() {
				if (!specialPropRefWarningShown) {
					specialPropRefWarningShown = true;
					error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
				}
			};
			warnAboutAccessingRef.isReactWarning = true;
			Object.defineProperty(props, "ref", {
				get: warnAboutAccessingRef,
				configurable: true
			});
		}
		function warnIfStringRefCannotBeAutoConverted(config) {
			if (typeof config.ref === "string" && ReactCurrentOwner.current && config.__self && ReactCurrentOwner.current.stateNode !== config.__self) {
				var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);
				if (!didWarnAboutStringRefs[componentName]) {
					error("Component \"%s\" contains the string ref \"%s\". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref", componentName, config.ref);
					didWarnAboutStringRefs[componentName] = true;
				}
			}
		}
		/**
		* Factory method to create a new React element. This no longer adheres to
		* the class pattern, so do not use new to call it. Also, instanceof check
		* will not work. Instead test $$typeof field against Symbol.for('react.element') to check
		* if something is a React Element.
		*
		* @param {*} type
		* @param {*} props
		* @param {*} key
		* @param {string|object} ref
		* @param {*} owner
		* @param {*} self A *temporary* helper to detect places where `this` is
		* different from the `owner` when React.createElement is called, so that we
		* can warn. We want to get rid of owner and replace string `ref`s with arrow
		* functions, and as long as `this` and owner are the same, there will be no
		* change in behavior.
		* @param {*} source An annotation object (added by a transpiler or otherwise)
		* indicating filename, line number, and/or other information.
		* @internal
		*/
		var ReactElement = function(type, key, ref, self, source, owner, props) {
			var element = {
				$$typeof: REACT_ELEMENT_TYPE,
				type,
				key,
				ref,
				props,
				_owner: owner
			};
			element._store = {};
			Object.defineProperty(element._store, "validated", {
				configurable: false,
				enumerable: false,
				writable: true,
				value: false
			});
			Object.defineProperty(element, "_self", {
				configurable: false,
				enumerable: false,
				writable: false,
				value: self
			});
			Object.defineProperty(element, "_source", {
				configurable: false,
				enumerable: false,
				writable: false,
				value: source
			});
			if (Object.freeze) {
				Object.freeze(element.props);
				Object.freeze(element);
			}
			return element;
		};
		/**
		* Create and return a new ReactElement of the given type.
		* See https://reactjs.org/docs/react-api.html#createelement
		*/
		function createElement(type, config, children) {
			var propName;
			var props = {};
			var key = null;
			var ref = null;
			var self = null;
			var source = null;
			if (config != null) {
				if (hasValidRef(config)) {
					ref = config.ref;
					warnIfStringRefCannotBeAutoConverted(config);
				}
				if (hasValidKey(config)) {
					checkKeyStringCoercion(config.key);
					key = "" + config.key;
				}
				self = config.__self === void 0 ? null : config.__self;
				source = config.__source === void 0 ? null : config.__source;
				for (propName in config) if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) props[propName] = config[propName];
			}
			var childrenLength = arguments.length - 2;
			if (childrenLength === 1) props.children = children;
			else if (childrenLength > 1) {
				var childArray = Array(childrenLength);
				for (var i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 2];
				if (Object.freeze) Object.freeze(childArray);
				props.children = childArray;
			}
			if (type && type.defaultProps) {
				var defaultProps = type.defaultProps;
				for (propName in defaultProps) if (props[propName] === void 0) props[propName] = defaultProps[propName];
			}
			if (key || ref) {
				var displayName = typeof type === "function" ? type.displayName || type.name || "Unknown" : type;
				if (key) defineKeyPropWarningGetter(props, displayName);
				if (ref) defineRefPropWarningGetter(props, displayName);
			}
			return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
		}
		function cloneAndReplaceKey(oldElement, newKey) {
			return ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
		}
		/**
		* Clone and return a new ReactElement using element as the starting point.
		* See https://reactjs.org/docs/react-api.html#cloneelement
		*/
		function cloneElement(element, config, children) {
			if (element === null || element === void 0) throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + element + ".");
			var propName;
			var props = assign({}, element.props);
			var key = element.key;
			var ref = element.ref;
			var self = element._self;
			var source = element._source;
			var owner = element._owner;
			if (config != null) {
				if (hasValidRef(config)) {
					ref = config.ref;
					owner = ReactCurrentOwner.current;
				}
				if (hasValidKey(config)) {
					checkKeyStringCoercion(config.key);
					key = "" + config.key;
				}
				var defaultProps;
				if (element.type && element.type.defaultProps) defaultProps = element.type.defaultProps;
				for (propName in config) if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) if (config[propName] === void 0 && defaultProps !== void 0) props[propName] = defaultProps[propName];
				else props[propName] = config[propName];
			}
			var childrenLength = arguments.length - 2;
			if (childrenLength === 1) props.children = children;
			else if (childrenLength > 1) {
				var childArray = Array(childrenLength);
				for (var i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 2];
				props.children = childArray;
			}
			return ReactElement(element.type, key, ref, self, source, owner, props);
		}
		/**
		* Verifies the object is a ReactElement.
		* See https://reactjs.org/docs/react-api.html#isvalidelement
		* @param {?object} object
		* @return {boolean} True if `object` is a ReactElement.
		* @final
		*/
		function isValidElement(object) {
			return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
		}
		var SEPARATOR = ".";
		var SUBSEPARATOR = ":";
		/**
		* Escape and wrap key so it is safe to use as a reactid
		*
		* @param {string} key to be escaped.
		* @return {string} the escaped key.
		*/
		function escape(key) {
			var escapeRegex = /[=:]/g;
			var escaperLookup = {
				"=": "=0",
				":": "=2"
			};
			return "$" + key.replace(escapeRegex, function(match) {
				return escaperLookup[match];
			});
		}
		/**
		* TODO: Test that a single child and an array with one item have the same key
		* pattern.
		*/
		var didWarnAboutMaps = false;
		var userProvidedKeyEscapeRegex = /\/+/g;
		function escapeUserProvidedKey(text) {
			return text.replace(userProvidedKeyEscapeRegex, "$&/");
		}
		/**
		* Generate a key string that identifies a element within a set.
		*
		* @param {*} element A element that could contain a manual key.
		* @param {number} index Index that is used if a manual key is not provided.
		* @return {string}
		*/
		function getElementKey(element, index) {
			if (typeof element === "object" && element !== null && element.key != null) {
				checkKeyStringCoercion(element.key);
				return escape("" + element.key);
			}
			return index.toString(36);
		}
		function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
			var type = typeof children;
			if (type === "undefined" || type === "boolean") children = null;
			var invokeCallback = false;
			if (children === null) invokeCallback = true;
			else switch (type) {
				case "string":
				case "number":
					invokeCallback = true;
					break;
				case "object": switch (children.$$typeof) {
					case REACT_ELEMENT_TYPE:
					case REACT_PORTAL_TYPE: invokeCallback = true;
				}
			}
			if (invokeCallback) {
				var _child = children;
				var mappedChild = callback(_child);
				var childKey = nameSoFar === "" ? SEPARATOR + getElementKey(_child, 0) : nameSoFar;
				if (isArray(mappedChild)) {
					var escapedChildKey = "";
					if (childKey != null) escapedChildKey = escapeUserProvidedKey(childKey) + "/";
					mapIntoArray(mappedChild, array, escapedChildKey, "", function(c) {
						return c;
					});
				} else if (mappedChild != null) {
					if (isValidElement(mappedChild)) {
						if (mappedChild.key && (!_child || _child.key !== mappedChild.key)) checkKeyStringCoercion(mappedChild.key);
						mappedChild = cloneAndReplaceKey(mappedChild, escapedPrefix + (mappedChild.key && (!_child || _child.key !== mappedChild.key) ? escapeUserProvidedKey("" + mappedChild.key) + "/" : "") + childKey);
					}
					array.push(mappedChild);
				}
				return 1;
			}
			var child;
			var nextName;
			var subtreeCount = 0;
			var nextNamePrefix = nameSoFar === "" ? SEPARATOR : nameSoFar + SUBSEPARATOR;
			if (isArray(children)) for (var i = 0; i < children.length; i++) {
				child = children[i];
				nextName = nextNamePrefix + getElementKey(child, i);
				subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
			}
			else {
				var iteratorFn = getIteratorFn(children);
				if (typeof iteratorFn === "function") {
					var iterableChildren = children;
					if (iteratorFn === iterableChildren.entries) {
						if (!didWarnAboutMaps) warn("Using Maps as children is not supported. Use an array of keyed ReactElements instead.");
						didWarnAboutMaps = true;
					}
					var iterator = iteratorFn.call(iterableChildren);
					var step;
					var ii = 0;
					while (!(step = iterator.next()).done) {
						child = step.value;
						nextName = nextNamePrefix + getElementKey(child, ii++);
						subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
					}
				} else if (type === "object") {
					var childrenString = String(children);
					throw new Error("Objects are not valid as a React child (found: " + (childrenString === "[object Object]" ? "object with keys {" + Object.keys(children).join(", ") + "}" : childrenString) + "). If you meant to render a collection of children, use an array instead.");
				}
			}
			return subtreeCount;
		}
		/**
		* Maps children that are typically specified as `props.children`.
		*
		* See https://reactjs.org/docs/react-api.html#reactchildrenmap
		*
		* The provided mapFunction(child, index) will be called for each
		* leaf child.
		*
		* @param {?*} children Children tree container.
		* @param {function(*, int)} func The map function.
		* @param {*} context Context for mapFunction.
		* @return {object} Object containing the ordered map of results.
		*/
		function mapChildren(children, func, context) {
			if (children == null) return children;
			var result = [];
			var count = 0;
			mapIntoArray(children, result, "", "", function(child) {
				return func.call(context, child, count++);
			});
			return result;
		}
		/**
		* Count the number of children that are typically specified as
		* `props.children`.
		*
		* See https://reactjs.org/docs/react-api.html#reactchildrencount
		*
		* @param {?*} children Children tree container.
		* @return {number} The number of children.
		*/
		function countChildren(children) {
			var n = 0;
			mapChildren(children, function() {
				n++;
			});
			return n;
		}
		/**
		* Iterates through children that are typically specified as `props.children`.
		*
		* See https://reactjs.org/docs/react-api.html#reactchildrenforeach
		*
		* The provided forEachFunc(child, index) will be called for each
		* leaf child.
		*
		* @param {?*} children Children tree container.
		* @param {function(*, int)} forEachFunc
		* @param {*} forEachContext Context for forEachContext.
		*/
		function forEachChildren(children, forEachFunc, forEachContext) {
			mapChildren(children, function() {
				forEachFunc.apply(this, arguments);
			}, forEachContext);
		}
		/**
		* Flatten a children object (typically specified as `props.children`) and
		* return an array with appropriately re-keyed children.
		*
		* See https://reactjs.org/docs/react-api.html#reactchildrentoarray
		*/
		function toArray(children) {
			return mapChildren(children, function(child) {
				return child;
			}) || [];
		}
		/**
		* Returns the first child in a collection of children and verifies that there
		* is only one child in the collection.
		*
		* See https://reactjs.org/docs/react-api.html#reactchildrenonly
		*
		* The current implementation of this function assumes that a single child gets
		* passed without a wrapper, but the purpose of this helper function is to
		* abstract away the particular structure of children.
		*
		* @param {?object} children Child collection structure.
		* @return {ReactElement} The first and only `ReactElement` contained in the
		* structure.
		*/
		function onlyChild(children) {
			if (!isValidElement(children)) throw new Error("React.Children.only expected to receive a single React element child.");
			return children;
		}
		function createContext(defaultValue) {
			var context = {
				$$typeof: REACT_CONTEXT_TYPE,
				_currentValue: defaultValue,
				_currentValue2: defaultValue,
				_threadCount: 0,
				Provider: null,
				Consumer: null,
				_defaultValue: null,
				_globalName: null
			};
			context.Provider = {
				$$typeof: REACT_PROVIDER_TYPE,
				_context: context
			};
			var hasWarnedAboutUsingNestedContextConsumers = false;
			var hasWarnedAboutUsingConsumerProvider = false;
			var hasWarnedAboutDisplayNameOnConsumer = false;
			var Consumer = {
				$$typeof: REACT_CONTEXT_TYPE,
				_context: context
			};
			Object.defineProperties(Consumer, {
				Provider: {
					get: function() {
						if (!hasWarnedAboutUsingConsumerProvider) {
							hasWarnedAboutUsingConsumerProvider = true;
							error("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?");
						}
						return context.Provider;
					},
					set: function(_Provider) {
						context.Provider = _Provider;
					}
				},
				_currentValue: {
					get: function() {
						return context._currentValue;
					},
					set: function(_currentValue) {
						context._currentValue = _currentValue;
					}
				},
				_currentValue2: {
					get: function() {
						return context._currentValue2;
					},
					set: function(_currentValue2) {
						context._currentValue2 = _currentValue2;
					}
				},
				_threadCount: {
					get: function() {
						return context._threadCount;
					},
					set: function(_threadCount) {
						context._threadCount = _threadCount;
					}
				},
				Consumer: { get: function() {
					if (!hasWarnedAboutUsingNestedContextConsumers) {
						hasWarnedAboutUsingNestedContextConsumers = true;
						error("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?");
					}
					return context.Consumer;
				} },
				displayName: {
					get: function() {
						return context.displayName;
					},
					set: function(displayName) {
						if (!hasWarnedAboutDisplayNameOnConsumer) {
							warn("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", displayName);
							hasWarnedAboutDisplayNameOnConsumer = true;
						}
					}
				}
			});
			context.Consumer = Consumer;
			context._currentRenderer = null;
			context._currentRenderer2 = null;
			return context;
		}
		var Uninitialized = -1;
		var Pending = 0;
		var Resolved = 1;
		var Rejected = 2;
		function lazyInitializer(payload) {
			if (payload._status === Uninitialized) {
				var ctor = payload._result;
				var thenable = ctor();
				thenable.then(function(moduleObject) {
					if (payload._status === Pending || payload._status === Uninitialized) {
						var resolved = payload;
						resolved._status = Resolved;
						resolved._result = moduleObject;
					}
				}, function(error) {
					if (payload._status === Pending || payload._status === Uninitialized) {
						var rejected = payload;
						rejected._status = Rejected;
						rejected._result = error;
					}
				});
				if (payload._status === Uninitialized) {
					var pending = payload;
					pending._status = Pending;
					pending._result = thenable;
				}
			}
			if (payload._status === Resolved) {
				var moduleObject = payload._result;
				if (moduleObject === void 0) error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?", moduleObject);
				if (!("default" in moduleObject)) error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))", moduleObject);
				return moduleObject.default;
			} else throw payload._result;
		}
		function lazy(ctor) {
			var lazyType = {
				$$typeof: REACT_LAZY_TYPE,
				_payload: {
					_status: Uninitialized,
					_result: ctor
				},
				_init: lazyInitializer
			};
			var defaultProps;
			var propTypes;
			Object.defineProperties(lazyType, {
				defaultProps: {
					configurable: true,
					get: function() {
						return defaultProps;
					},
					set: function(newDefaultProps) {
						error("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it.");
						defaultProps = newDefaultProps;
						Object.defineProperty(lazyType, "defaultProps", { enumerable: true });
					}
				},
				propTypes: {
					configurable: true,
					get: function() {
						return propTypes;
					},
					set: function(newPropTypes) {
						error("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it.");
						propTypes = newPropTypes;
						Object.defineProperty(lazyType, "propTypes", { enumerable: true });
					}
				}
			});
			return lazyType;
		}
		function forwardRef(render) {
			if (render != null && render.$$typeof === REACT_MEMO_TYPE) error("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).");
			else if (typeof render !== "function") error("forwardRef requires a render function but was given %s.", render === null ? "null" : typeof render);
			else if (render.length !== 0 && render.length !== 2) error("forwardRef render functions accept exactly two parameters: props and ref. %s", render.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined.");
			if (render != null) {
				if (render.defaultProps != null || render.propTypes != null) error("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
			}
			var elementType = {
				$$typeof: REACT_FORWARD_REF_TYPE,
				render
			};
			var ownName;
			Object.defineProperty(elementType, "displayName", {
				enumerable: false,
				configurable: true,
				get: function() {
					return ownName;
				},
				set: function(name) {
					ownName = name;
					if (!render.name && !render.displayName) render.displayName = name;
				}
			});
			return elementType;
		}
		var REACT_MODULE_REFERENCE = Symbol.for("react.module.reference");
		function isValidElementType(type) {
			if (typeof type === "string" || typeof type === "function") return true;
			if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) return true;
			if (typeof type === "object" && type !== null) {
				if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== void 0) return true;
			}
			return false;
		}
		function memo(type, compare) {
			if (!isValidElementType(type)) error("memo: The first argument must be a component. Instead received: %s", type === null ? "null" : typeof type);
			var elementType = {
				$$typeof: REACT_MEMO_TYPE,
				type,
				compare: compare === void 0 ? null : compare
			};
			var ownName;
			Object.defineProperty(elementType, "displayName", {
				enumerable: false,
				configurable: true,
				get: function() {
					return ownName;
				},
				set: function(name) {
					ownName = name;
					if (!type.name && !type.displayName) type.displayName = name;
				}
			});
			return elementType;
		}
		function resolveDispatcher() {
			var dispatcher = ReactCurrentDispatcher.current;
			if (dispatcher === null) error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.");
			return dispatcher;
		}
		function useContext(Context) {
			var dispatcher = resolveDispatcher();
			if (Context._context !== void 0) {
				var realContext = Context._context;
				if (realContext.Consumer === Context) error("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?");
				else if (realContext.Provider === Context) error("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
			}
			return dispatcher.useContext(Context);
		}
		function useState(initialState) {
			return resolveDispatcher().useState(initialState);
		}
		function useReducer(reducer, initialArg, init) {
			return resolveDispatcher().useReducer(reducer, initialArg, init);
		}
		function useRef(initialValue) {
			return resolveDispatcher().useRef(initialValue);
		}
		function useEffect(create, deps) {
			return resolveDispatcher().useEffect(create, deps);
		}
		function useInsertionEffect(create, deps) {
			return resolveDispatcher().useInsertionEffect(create, deps);
		}
		function useLayoutEffect(create, deps) {
			return resolveDispatcher().useLayoutEffect(create, deps);
		}
		function useCallback(callback, deps) {
			return resolveDispatcher().useCallback(callback, deps);
		}
		function useMemo(create, deps) {
			return resolveDispatcher().useMemo(create, deps);
		}
		function useImperativeHandle(ref, create, deps) {
			return resolveDispatcher().useImperativeHandle(ref, create, deps);
		}
		function useDebugValue(value, formatterFn) {
			return resolveDispatcher().useDebugValue(value, formatterFn);
		}
		function useTransition() {
			return resolveDispatcher().useTransition();
		}
		function useDeferredValue(value) {
			return resolveDispatcher().useDeferredValue(value);
		}
		function useId() {
			return resolveDispatcher().useId();
		}
		function useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
			return resolveDispatcher().useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
		}
		var disabledDepth = 0;
		var prevLog;
		var prevInfo;
		var prevWarn;
		var prevError;
		var prevGroup;
		var prevGroupCollapsed;
		var prevGroupEnd;
		function disabledLog() {}
		disabledLog.__reactDisabledLog = true;
		function disableLogs() {
			if (disabledDepth === 0) {
				prevLog = console.log;
				prevInfo = console.info;
				prevWarn = console.warn;
				prevError = console.error;
				prevGroup = console.group;
				prevGroupCollapsed = console.groupCollapsed;
				prevGroupEnd = console.groupEnd;
				var props = {
					configurable: true,
					enumerable: true,
					value: disabledLog,
					writable: true
				};
				Object.defineProperties(console, {
					info: props,
					log: props,
					warn: props,
					error: props,
					group: props,
					groupCollapsed: props,
					groupEnd: props
				});
			}
			disabledDepth++;
		}
		function reenableLogs() {
			disabledDepth--;
			if (disabledDepth === 0) {
				var props = {
					configurable: true,
					enumerable: true,
					writable: true
				};
				Object.defineProperties(console, {
					log: assign({}, props, { value: prevLog }),
					info: assign({}, props, { value: prevInfo }),
					warn: assign({}, props, { value: prevWarn }),
					error: assign({}, props, { value: prevError }),
					group: assign({}, props, { value: prevGroup }),
					groupCollapsed: assign({}, props, { value: prevGroupCollapsed }),
					groupEnd: assign({}, props, { value: prevGroupEnd })
				});
			}
			if (disabledDepth < 0) error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
		}
		var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher;
		var prefix;
		function describeBuiltInComponentFrame(name, source, ownerFn) {
			if (prefix === void 0) try {
				throw Error();
			} catch (x) {
				var match = x.stack.trim().match(/\n( *(at )?)/);
				prefix = match && match[1] || "";
			}
			return "\n" + prefix + name;
		}
		var reentry = false;
		var componentFrameCache = new (typeof WeakMap === "function" ? WeakMap : Map)();
		function describeNativeComponentFrame(fn, construct) {
			if (!fn || reentry) return "";
			var frame = componentFrameCache.get(fn);
			if (frame !== void 0) return frame;
			var control;
			reentry = true;
			var previousPrepareStackTrace = Error.prepareStackTrace;
			Error.prepareStackTrace = void 0;
			var previousDispatcher = ReactCurrentDispatcher$1.current;
			ReactCurrentDispatcher$1.current = null;
			disableLogs();
			try {
				if (construct) {
					var Fake = function() {
						throw Error();
					};
					Object.defineProperty(Fake.prototype, "props", { set: function() {
						throw Error();
					} });
					if (typeof Reflect === "object" && Reflect.construct) {
						try {
							Reflect.construct(Fake, []);
						} catch (x) {
							control = x;
						}
						Reflect.construct(fn, [], Fake);
					} else {
						try {
							Fake.call();
						} catch (x) {
							control = x;
						}
						fn.call(Fake.prototype);
					}
				} else {
					try {
						throw Error();
					} catch (x) {
						control = x;
					}
					fn();
				}
			} catch (sample) {
				if (sample && control && typeof sample.stack === "string") {
					var sampleLines = sample.stack.split("\n");
					var controlLines = control.stack.split("\n");
					var s = sampleLines.length - 1;
					var c = controlLines.length - 1;
					while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) c--;
					for (; s >= 1 && c >= 0; s--, c--) if (sampleLines[s] !== controlLines[c]) {
						if (s !== 1 || c !== 1) do {
							s--;
							c--;
							if (c < 0 || sampleLines[s] !== controlLines[c]) {
								var _frame = "\n" + sampleLines[s].replace(" at new ", " at ");
								if (fn.displayName && _frame.includes("<anonymous>")) _frame = _frame.replace("<anonymous>", fn.displayName);
								if (typeof fn === "function") componentFrameCache.set(fn, _frame);
								return _frame;
							}
						} while (s >= 1 && c >= 0);
						break;
					}
				}
			} finally {
				reentry = false;
				ReactCurrentDispatcher$1.current = previousDispatcher;
				reenableLogs();
				Error.prepareStackTrace = previousPrepareStackTrace;
			}
			var name = fn ? fn.displayName || fn.name : "";
			var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
			if (typeof fn === "function") componentFrameCache.set(fn, syntheticFrame);
			return syntheticFrame;
		}
		function describeFunctionComponentFrame(fn, source, ownerFn) {
			return describeNativeComponentFrame(fn, false);
		}
		function shouldConstruct(Component) {
			var prototype = Component.prototype;
			return !!(prototype && prototype.isReactComponent);
		}
		function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
			if (type == null) return "";
			if (typeof type === "function") return describeNativeComponentFrame(type, shouldConstruct(type));
			if (typeof type === "string") return describeBuiltInComponentFrame(type);
			switch (type) {
				case REACT_SUSPENSE_TYPE: return describeBuiltInComponentFrame("Suspense");
				case REACT_SUSPENSE_LIST_TYPE: return describeBuiltInComponentFrame("SuspenseList");
			}
			if (typeof type === "object") switch (type.$$typeof) {
				case REACT_FORWARD_REF_TYPE: return describeFunctionComponentFrame(type.render);
				case REACT_MEMO_TYPE: return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
				case REACT_LAZY_TYPE:
					var lazyComponent = type;
					var payload = lazyComponent._payload;
					var init = lazyComponent._init;
					try {
						return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
					} catch (x) {}
			}
			return "";
		}
		var loggedTypeFailures = {};
		var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
		function setCurrentlyValidatingElement(element) {
			if (element) {
				var owner = element._owner;
				var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
				ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
			} else ReactDebugCurrentFrame$1.setExtraStackFrame(null);
		}
		function checkPropTypes(typeSpecs, values, location, componentName, element) {
			var has = Function.call.bind(hasOwnProperty);
			for (var typeSpecName in typeSpecs) if (has(typeSpecs, typeSpecName)) {
				var error$1 = void 0;
				try {
					if (typeof typeSpecs[typeSpecName] !== "function") {
						var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
						err.name = "Invariant Violation";
						throw err;
					}
					error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
				} catch (ex) {
					error$1 = ex;
				}
				if (error$1 && !(error$1 instanceof Error)) {
					setCurrentlyValidatingElement(element);
					error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1);
					setCurrentlyValidatingElement(null);
				}
				if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
					loggedTypeFailures[error$1.message] = true;
					setCurrentlyValidatingElement(element);
					error("Failed %s type: %s", location, error$1.message);
					setCurrentlyValidatingElement(null);
				}
			}
		}
		function setCurrentlyValidatingElement$1(element) {
			if (element) {
				var owner = element._owner;
				setExtraStackFrame(describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null));
			} else setExtraStackFrame(null);
		}
		var propTypesMisspellWarningShown = false;
		function getDeclarationErrorAddendum() {
			if (ReactCurrentOwner.current) {
				var name = getComponentNameFromType(ReactCurrentOwner.current.type);
				if (name) return "\n\nCheck the render method of `" + name + "`.";
			}
			return "";
		}
		function getSourceInfoErrorAddendum(source) {
			if (source !== void 0) {
				var fileName = source.fileName.replace(/^.*[\\\/]/, "");
				var lineNumber = source.lineNumber;
				return "\n\nCheck your code at " + fileName + ":" + lineNumber + ".";
			}
			return "";
		}
		function getSourceInfoErrorAddendumForProps(elementProps) {
			if (elementProps !== null && elementProps !== void 0) return getSourceInfoErrorAddendum(elementProps.__source);
			return "";
		}
		/**
		* Warn if there's no key explicitly set on dynamic arrays of children or
		* object keys are not valid. This allows us to keep track of children between
		* updates.
		*/
		var ownerHasKeyUseWarning = {};
		function getCurrentComponentErrorInfo(parentType) {
			var info = getDeclarationErrorAddendum();
			if (!info) {
				var parentName = typeof parentType === "string" ? parentType : parentType.displayName || parentType.name;
				if (parentName) info = "\n\nCheck the top-level render call using <" + parentName + ">.";
			}
			return info;
		}
		/**
		* Warn if the element doesn't have an explicit key assigned to it.
		* This element is in an array. The array could grow and shrink or be
		* reordered. All children that haven't already been validated are required to
		* have a "key" property assigned to it. Error statuses are cached so a warning
		* will only be shown once.
		*
		* @internal
		* @param {ReactElement} element Element that requires a key.
		* @param {*} parentType element's parent's type.
		*/
		function validateExplicitKey(element, parentType) {
			if (!element._store || element._store.validated || element.key != null) return;
			element._store.validated = true;
			var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
			if (ownerHasKeyUseWarning[currentComponentErrorInfo]) return;
			ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
			var childOwner = "";
			if (element && element._owner && element._owner !== ReactCurrentOwner.current) childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
			setCurrentlyValidatingElement$1(element);
			error("Each child in a list should have a unique \"key\" prop.%s%s See https://reactjs.org/link/warning-keys for more information.", currentComponentErrorInfo, childOwner);
			setCurrentlyValidatingElement$1(null);
		}
		/**
		* Ensure that every element either is passed in a static location, in an
		* array with an explicit keys property defined, or in an object literal
		* with valid key property.
		*
		* @internal
		* @param {ReactNode} node Statically passed child of any type.
		* @param {*} parentType node's parent's type.
		*/
		function validateChildKeys(node, parentType) {
			if (typeof node !== "object") return;
			if (isArray(node)) for (var i = 0; i < node.length; i++) {
				var child = node[i];
				if (isValidElement(child)) validateExplicitKey(child, parentType);
			}
			else if (isValidElement(node)) {
				if (node._store) node._store.validated = true;
			} else if (node) {
				var iteratorFn = getIteratorFn(node);
				if (typeof iteratorFn === "function") {
					if (iteratorFn !== node.entries) {
						var iterator = iteratorFn.call(node);
						var step;
						while (!(step = iterator.next()).done) if (isValidElement(step.value)) validateExplicitKey(step.value, parentType);
					}
				}
			}
		}
		/**
		* Given an element, validate that its props follow the propTypes definition,
		* provided by the type.
		*
		* @param {ReactElement} element
		*/
		function validatePropTypes(element) {
			var type = element.type;
			if (type === null || type === void 0 || typeof type === "string") return;
			var propTypes;
			if (typeof type === "function") propTypes = type.propTypes;
			else if (typeof type === "object" && (type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_MEMO_TYPE)) propTypes = type.propTypes;
			else return;
			if (propTypes) {
				var name = getComponentNameFromType(type);
				checkPropTypes(propTypes, element.props, "prop", name, element);
			} else if (type.PropTypes !== void 0 && !propTypesMisspellWarningShown) {
				propTypesMisspellWarningShown = true;
				error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", getComponentNameFromType(type) || "Unknown");
			}
			if (typeof type.getDefaultProps === "function" && !type.getDefaultProps.isReactClassApproved) error("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
		}
		/**
		* Given a fragment, validate that it can only be provided with fragment props
		* @param {ReactElement} fragment
		*/
		function validateFragmentProps(fragment) {
			var keys = Object.keys(fragment.props);
			for (var i = 0; i < keys.length; i++) {
				var key = keys[i];
				if (key !== "children" && key !== "key") {
					setCurrentlyValidatingElement$1(fragment);
					error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key);
					setCurrentlyValidatingElement$1(null);
					break;
				}
			}
			if (fragment.ref !== null) {
				setCurrentlyValidatingElement$1(fragment);
				error("Invalid attribute `ref` supplied to `React.Fragment`.");
				setCurrentlyValidatingElement$1(null);
			}
		}
		function createElementWithValidation(type, props, children) {
			var validType = isValidElementType(type);
			if (!validType) {
				var info = "";
				if (type === void 0 || typeof type === "object" && type !== null && Object.keys(type).length === 0) info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
				var sourceInfo = getSourceInfoErrorAddendumForProps(props);
				if (sourceInfo) info += sourceInfo;
				else info += getDeclarationErrorAddendum();
				var typeString;
				if (type === null) typeString = "null";
				else if (isArray(type)) typeString = "array";
				else if (type !== void 0 && type.$$typeof === REACT_ELEMENT_TYPE) {
					typeString = "<" + (getComponentNameFromType(type.type) || "Unknown") + " />";
					info = " Did you accidentally export a JSX literal instead of a component?";
				} else typeString = typeof type;
				error("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
			}
			var element = createElement.apply(this, arguments);
			if (element == null) return element;
			if (validType) for (var i = 2; i < arguments.length; i++) validateChildKeys(arguments[i], type);
			if (type === REACT_FRAGMENT_TYPE) validateFragmentProps(element);
			else validatePropTypes(element);
			return element;
		}
		var didWarnAboutDeprecatedCreateFactory = false;
		function createFactoryWithValidation(type) {
			var validatedFactory = createElementWithValidation.bind(null, type);
			validatedFactory.type = type;
			if (!didWarnAboutDeprecatedCreateFactory) {
				didWarnAboutDeprecatedCreateFactory = true;
				warn("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.");
			}
			Object.defineProperty(validatedFactory, "type", {
				enumerable: false,
				get: function() {
					warn("Factory.type is deprecated. Access the class directly before passing it to createFactory.");
					Object.defineProperty(this, "type", { value: type });
					return type;
				}
			});
			return validatedFactory;
		}
		function cloneElementWithValidation(element, props, children) {
			var newElement = cloneElement.apply(this, arguments);
			for (var i = 2; i < arguments.length; i++) validateChildKeys(arguments[i], newElement.type);
			validatePropTypes(newElement);
			return newElement;
		}
		function startTransition(scope, options) {
			var prevTransition = ReactCurrentBatchConfig.transition;
			ReactCurrentBatchConfig.transition = {};
			var currentTransition = ReactCurrentBatchConfig.transition;
			ReactCurrentBatchConfig.transition._updatedFibers = /* @__PURE__ */ new Set();
			try {
				scope();
			} finally {
				ReactCurrentBatchConfig.transition = prevTransition;
				if (prevTransition === null && currentTransition._updatedFibers) {
					if (currentTransition._updatedFibers.size > 10) warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table.");
					currentTransition._updatedFibers.clear();
				}
			}
		}
		var didWarnAboutMessageChannel = false;
		var enqueueTaskImpl = null;
		function enqueueTask(task) {
			if (enqueueTaskImpl === null) try {
				var requireString = ("require" + Math.random()).slice(0, 7);
				enqueueTaskImpl = (module && module[requireString]).call(module, "timers").setImmediate;
			} catch (_err) {
				enqueueTaskImpl = function(callback) {
					if (didWarnAboutMessageChannel === false) {
						didWarnAboutMessageChannel = true;
						if (typeof MessageChannel === "undefined") error("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning.");
					}
					var channel = new MessageChannel();
					channel.port1.onmessage = callback;
					channel.port2.postMessage(void 0);
				};
			}
			return enqueueTaskImpl(task);
		}
		var actScopeDepth = 0;
		var didWarnNoAwaitAct = false;
		function act(callback) {
			var prevActScopeDepth = actScopeDepth;
			actScopeDepth++;
			if (ReactCurrentActQueue.current === null) ReactCurrentActQueue.current = [];
			var prevIsBatchingLegacy = ReactCurrentActQueue.isBatchingLegacy;
			var result;
			try {
				ReactCurrentActQueue.isBatchingLegacy = true;
				result = callback();
				if (!prevIsBatchingLegacy && ReactCurrentActQueue.didScheduleLegacyUpdate) {
					var queue = ReactCurrentActQueue.current;
					if (queue !== null) {
						ReactCurrentActQueue.didScheduleLegacyUpdate = false;
						flushActQueue(queue);
					}
				}
			} catch (error) {
				popActScope(prevActScopeDepth);
				throw error;
			} finally {
				ReactCurrentActQueue.isBatchingLegacy = prevIsBatchingLegacy;
			}
			if (result !== null && typeof result === "object" && typeof result.then === "function") {
				var thenableResult = result;
				var wasAwaited = false;
				var thenable = { then: function(resolve, reject) {
					wasAwaited = true;
					thenableResult.then(function(returnValue) {
						popActScope(prevActScopeDepth);
						if (actScopeDepth === 0) recursivelyFlushAsyncActWork(returnValue, resolve, reject);
						else resolve(returnValue);
					}, function(error) {
						popActScope(prevActScopeDepth);
						reject(error);
					});
				} };
				if (!didWarnNoAwaitAct && typeof Promise !== "undefined") Promise.resolve().then(function() {}).then(function() {
					if (!wasAwaited) {
						didWarnNoAwaitAct = true;
						error("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);");
					}
				});
				return thenable;
			} else {
				var returnValue = result;
				popActScope(prevActScopeDepth);
				if (actScopeDepth === 0) {
					var _queue = ReactCurrentActQueue.current;
					if (_queue !== null) {
						flushActQueue(_queue);
						ReactCurrentActQueue.current = null;
					}
					return { then: function(resolve, reject) {
						if (ReactCurrentActQueue.current === null) {
							ReactCurrentActQueue.current = [];
							recursivelyFlushAsyncActWork(returnValue, resolve, reject);
						} else resolve(returnValue);
					} };
				} else return { then: function(resolve, reject) {
					resolve(returnValue);
				} };
			}
		}
		function popActScope(prevActScopeDepth) {
			if (prevActScopeDepth !== actScopeDepth - 1) error("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. ");
			actScopeDepth = prevActScopeDepth;
		}
		function recursivelyFlushAsyncActWork(returnValue, resolve, reject) {
			var queue = ReactCurrentActQueue.current;
			if (queue !== null) try {
				flushActQueue(queue);
				enqueueTask(function() {
					if (queue.length === 0) {
						ReactCurrentActQueue.current = null;
						resolve(returnValue);
					} else recursivelyFlushAsyncActWork(returnValue, resolve, reject);
				});
			} catch (error) {
				reject(error);
			}
			else resolve(returnValue);
		}
		var isFlushing = false;
		function flushActQueue(queue) {
			if (!isFlushing) {
				isFlushing = true;
				var i = 0;
				try {
					for (; i < queue.length; i++) {
						var callback = queue[i];
						do
							callback = callback(true);
						while (callback !== null);
					}
					queue.length = 0;
				} catch (error) {
					queue = queue.slice(i + 1);
					throw error;
				} finally {
					isFlushing = false;
				}
			}
		}
		var createElement$1 = createElementWithValidation;
		var cloneElement$1 = cloneElementWithValidation;
		var createFactory = createFactoryWithValidation;
		exports.Children = {
			map: mapChildren,
			forEach: forEachChildren,
			count: countChildren,
			toArray,
			only: onlyChild
		};
		exports.Component = Component;
		exports.Fragment = REACT_FRAGMENT_TYPE;
		exports.Profiler = REACT_PROFILER_TYPE;
		exports.PureComponent = PureComponent;
		exports.StrictMode = REACT_STRICT_MODE_TYPE;
		exports.Suspense = REACT_SUSPENSE_TYPE;
		exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals;
		exports.act = act;
		exports.cloneElement = cloneElement$1;
		exports.createContext = createContext;
		exports.createElement = createElement$1;
		exports.createFactory = createFactory;
		exports.createRef = createRef;
		exports.forwardRef = forwardRef;
		exports.isValidElement = isValidElement;
		exports.lazy = lazy;
		exports.memo = memo;
		exports.startTransition = startTransition;
		exports.unstable_act = act;
		exports.useCallback = useCallback;
		exports.useContext = useContext;
		exports.useDebugValue = useDebugValue;
		exports.useDeferredValue = useDeferredValue;
		exports.useEffect = useEffect;
		exports.useId = useId;
		exports.useImperativeHandle = useImperativeHandle;
		exports.useInsertionEffect = useInsertionEffect;
		exports.useLayoutEffect = useLayoutEffect;
		exports.useMemo = useMemo;
		exports.useReducer = useReducer;
		exports.useRef = useRef;
		exports.useState = useState;
		exports.useSyncExternalStore = useSyncExternalStore;
		exports.useTransition = useTransition;
		exports.version = ReactVersion;
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop === "function") __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(/* @__PURE__ */ new Error());
	})();
}));
(/* @__PURE__ */ require_chunk.__commonJSMin(((exports, module) => {
	if (process.env.NODE_ENV === "production") module.exports = require_react_production_min();
	else module.exports = require_react_development();
})))();
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/utils/prioritizeable.js
var require_prioritizeable = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Prioritizeable = void 0;
	var Prioritizeable;
	(function(Prioritizeable) {
		async function toPrioritizeable(rawValue, getPriority) {
			if (rawValue instanceof Array) return Promise.all(rawValue.map((v) => toPrioritizeable(v, getPriority)));
			const value = await rawValue;
			return {
				priority: await getPriority(value),
				value
			};
		}
		Prioritizeable.toPrioritizeable = toPrioritizeable;
		function toPrioritizeableSync(rawValue, getPriority = (value) => value.priority) {
			return rawValue.map((v) => ({
				value: v,
				priority: getPriority(v)
			}));
		}
		Prioritizeable.toPrioritizeableSync = toPrioritizeableSync;
		function prioritizeAllSync(values, getPriority) {
			return toPrioritizeableSync(values, getPriority).filter(isValid).sort(compare);
		}
		Prioritizeable.prioritizeAllSync = prioritizeAllSync;
		async function prioritizeAll(values, getPriority) {
			return (await toPrioritizeable(values, getPriority)).filter(isValid).sort(compare);
		}
		Prioritizeable.prioritizeAll = prioritizeAll;
		function isValid(p) {
			return p.priority > 0;
		}
		Prioritizeable.isValid = isValid;
		function compare(p, p2) {
			return p2.priority - p.priority;
		}
		Prioritizeable.compare = compare;
	})(Prioritizeable || (exports.Prioritizeable = Prioritizeable = {}));
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/utils/promise-util.js
var require_promise_util = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Deferred = void 0;
	var Deferred = class {
		constructor() {
			this.promise = new Promise((resolve, reject) => {
				this.resolve = resolve;
				this.reject = reject;
			});
		}
	};
	exports.Deferred = Deferred;
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/utils/types.js
var require_types = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/utils/class-util.js
var require_class_util = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getSuperClasses = getSuperClasses;
	exports.getPropertyNames = getPropertyNames;
	function getSuperClasses(constructor) {
		const constructors = [];
		let current = constructor;
		while (Object.getPrototypeOf(current)) {
			current = Object.getPrototypeOf(current);
			constructors.push(current);
		}
		return constructors;
	}
	function getPropertyNames(obj) {
		const propertyNames = [];
		do {
			propertyNames.push(...Object.getOwnPropertyNames(obj));
			obj = Object.getPrototypeOf(obj);
		} while (obj);
		return Array.from(new Set(propertyNames));
	}
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/utils/metadata-util.js
var require_metadata_util = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getOwnMetadata = getOwnMetadata;
	var class_util_1 = require_class_util();
	function getOwnMetadata(metadataKey, constructor, propertyKey) {
		const constructors = [constructor, ...(0, class_util_1.getSuperClasses)(constructor)];
		let result = [];
		for (let index = 0; index < constructors.length; index++) {
			const c = constructors[constructors.length - index - 1];
			let metadata;
			if (propertyKey) metadata = Reflect.getOwnMetadata(metadataKey, c, propertyKey);
			else metadata = Reflect.getOwnMetadata(metadataKey, c);
			if (metadata) if (Array.isArray(metadata)) result = [...result, ...metadata];
			else return [metadata];
		}
		return result;
	}
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/utils/event.js
var require_event = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.CallbackList = exports.Event = void 0;
	var Event;
	(function(Event) {
		const _disposable = { dispose() {} };
		Event.None = Object.assign(function() {
			return _disposable;
		}, {
			get maxListeners() {
				return 0;
			},
			set maxListeners(maxListeners) {}
		});
		/**
		* Given an event and a `map` function, returns another event which maps each element
		* through the mapping function.
		*/
		function map(event, mapFunc) {
			return Object.assign((listener, thisArgs, disposables) => event((i) => listener.call(thisArgs, mapFunc(i)), void 0, disposables), { maxListeners: 0 });
		}
		Event.map = map;
	})(Event || (exports.Event = Event = {}));
	var CallbackList = class {
		get length() {
			return this._callbacks && this._callbacks.length || 0;
		}
		add(callback, context = void 0, bucket) {
			if (!this._callbacks) {
				this._callbacks = [];
				this._contexts = [];
			}
			this._callbacks.push(callback);
			this._contexts.push(context);
			if (Array.isArray(bucket)) bucket.push({ dispose: () => this.remove(callback, context) });
		}
		remove(callback, context = void 0) {
			if (!this._callbacks) return;
			let foundCallbackWithDifferentContext = false;
			for (let i = 0; i < this._callbacks.length; i++) if (this._callbacks[i] === callback) if (this._contexts[i] === context) {
				this._callbacks.splice(i, 1);
				this._contexts.splice(i, 1);
				return;
			} else foundCallbackWithDifferentContext = true;
			if (foundCallbackWithDifferentContext) throw new Error("When adding a listener with a context, you should remove it with the same context");
		}
		[Symbol.iterator]() {
			if (!this._callbacks) return [][Symbol.iterator]();
			const callbacks = this._callbacks.slice(0);
			const contexts = this._contexts.slice(0);
			return callbacks.map((callback, i) => (...args) => callback.apply(contexts[i], args))[Symbol.iterator]();
		}
		invoke(...args) {
			const ret = [];
			for (const callback of this) try {
				ret.push(callback(...args));
			} catch (e) {
				console.error(e);
			}
			return ret;
		}
		isEmpty() {
			return !this._callbacks || this._callbacks.length === 0;
		}
		dispose() {
			this._callbacks = void 0;
			this._contexts = void 0;
		}
	};
	exports.CallbackList = CallbackList;
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/utils/cancellation.js
var require_cancellation = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.CancellationTokenSource = exports.CancellationToken = exports.CancellationError = void 0;
	exports.cancelled = cancelled;
	exports.isCancelled = isCancelled;
	exports.checkCancelled = checkCancelled;
	var event_1 = require_event();
	var emitter_1 = require_emitter();
	var CancellationError = class extends Error {
		constructor() {
			super("Canceled");
			this.name = this.message;
		}
	};
	exports.CancellationError = CancellationError;
	var shortcutEvent = Object.freeze(Object.assign(function(callback, context) {
		const handle = setTimeout(callback.bind(context), 0);
		return { dispose() {
			clearTimeout(handle);
		} };
	}, { maxListeners: 0 }));
	var CancellationToken;
	(function(CancellationToken) {
		CancellationToken.None = Object.freeze({
			isCancellationRequested: false,
			onCancellationRequested: event_1.Event.None
		});
		CancellationToken.Cancelled = Object.freeze({
			isCancellationRequested: true,
			onCancellationRequested: shortcutEvent
		});
	})(CancellationToken || (exports.CancellationToken = CancellationToken = {}));
	var MutableToken = class {
		constructor() {
			this._isCancelled = false;
		}
		cancel() {
			if (!this._isCancelled) {
				this._isCancelled = true;
				if (this._emitter) {
					this._emitter.fire(void 0);
					this._emitter = void 0;
				}
			}
		}
		get isCancellationRequested() {
			return this._isCancelled;
		}
		get onCancellationRequested() {
			if (this._isCancelled) return shortcutEvent;
			if (!this._emitter) this._emitter = new emitter_1.Emitter();
			return this._emitter.event;
		}
	};
	var CancellationTokenSource = class {
		get token() {
			if (!this._token) this._token = new MutableToken();
			return this._token;
		}
		cancel() {
			if (!this._token) this._token = CancellationToken.Cancelled;
			else if (this._token !== CancellationToken.Cancelled) this._token.cancel();
		}
		dispose() {
			this.cancel();
		}
	};
	exports.CancellationTokenSource = CancellationTokenSource;
	var cancelledMessage = "Cancelled";
	function cancelled() {
		return new Error(cancelledMessage);
	}
	function isCancelled(err) {
		return !!err && err.message === cancelledMessage;
	}
	function checkCancelled(token) {
		if (!!token && token.isCancellationRequested) throw cancelled();
	}
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/utils/emitter.js
var require_emitter = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.AsyncEmitter = exports.WaitUntilEvent = exports.Emitter = void 0;
	var event_1 = require_event();
	var Emitter = class Emitter {
		constructor(_options) {
			this._options = _options;
			this._disposed = false;
			this._leakWarnCountdown = 0;
		}
		/**
		* For the public to allow to subscribe
		* to events from this Emitter
		*/
		get event() {
			if (!this._event) this._event = Object.assign((listener, thisArgs, disposables) => {
				if (!this._callbacks) this._callbacks = new event_1.CallbackList();
				if (this._options && this._options.onFirstListenerAdd && this._callbacks.isEmpty()) this._options.onFirstListenerAdd(this);
				this._callbacks.add(listener, thisArgs);
				const removeMaxListenersCheck = this.checkMaxListeners(this._event.maxListeners);
				const result = { dispose: () => {
					if (removeMaxListenersCheck) removeMaxListenersCheck();
					result.dispose = Emitter._noop;
					if (!this._disposed) {
						this._callbacks.remove(listener, thisArgs);
						result.dispose = Emitter._noop;
						if (this._options && this._options.onLastListenerRemove && this._callbacks.isEmpty()) this._options.onLastListenerRemove(this);
					}
				} };
				if (Array.isArray(disposables)) disposables.push(result);
				return result;
			}, { maxListeners: Emitter.LEAK_WARNING_THRESHHOLD });
			return this._event;
		}
		checkMaxListeners(maxListeners) {
			if (maxListeners === 0 || !this._callbacks) return;
			const listenerCount = this._callbacks.length;
			if (listenerCount <= maxListeners) return;
			const popStack = this.pushLeakingStack();
			this._leakWarnCountdown -= 1;
			if (this._leakWarnCountdown <= 0) {
				this._leakWarnCountdown = maxListeners * .5;
				let topStack;
				let topCount = 0;
				this._leakingStacks.forEach((stackCount, stack) => {
					if (!topStack || topCount < stackCount) {
						topStack = stack;
						topCount = stackCount;
					}
				});
				console.warn(`Possible Emitter memory leak detected. ${listenerCount} listeners added. Use event.maxListeners to increase the limit (${maxListeners}). MOST frequent listener (${topCount}):`);
				console.warn(topStack);
			}
			return popStack;
		}
		pushLeakingStack() {
			if (!this._leakingStacks) this._leakingStacks = /* @__PURE__ */ new Map();
			const stack = (/* @__PURE__ */ new Error()).stack.split("\n").slice(3).join("\n");
			const count = this._leakingStacks.get(stack) || 0;
			this._leakingStacks.set(stack, count + 1);
			return () => this.popLeakingStack(stack);
		}
		popLeakingStack(stack) {
			if (!this._leakingStacks) return;
			const count = this._leakingStacks.get(stack) || 0;
			this._leakingStacks.set(stack, count - 1);
		}
		/**
		* To be kept private to fire an event to
		* subscribers
		*/
		fire(event) {
			if (this._callbacks) this._callbacks.invoke(event);
		}
		/**
		* Process each listener one by one.
		* Return `false` to stop iterating over the listeners, `true` to continue.
		*/
		async sequence(processor) {
			if (this._callbacks) {
				for (const listener of this._callbacks) if (!await processor(listener)) break;
			}
		}
		dispose() {
			if (this._leakingStacks) {
				this._leakingStacks.clear();
				this._leakingStacks = void 0;
			}
			if (this._callbacks) {
				this._callbacks.dispose();
				this._callbacks = void 0;
			}
			this._disposed = true;
		}
	};
	exports.Emitter = Emitter;
	Emitter.LEAK_WARNING_THRESHHOLD = 175;
	Emitter._noop = function() {};
	var WaitUntilEvent;
	(function(WaitUntilEvent) {
		/**
		* Fire all listeners in the same tick.
		*
		* Use `AsyncEmitter.fire` to fire listeners async one after another.
		*/
		async function fire(emitter, event, timeout = void 0) {
			const waitables = [];
			const asyncEvent = Object.assign(event, { waitUntil: (thenable) => {
				if (Object.isFrozen(waitables)) throw new Error("waitUntil cannot be called asynchronously.");
				waitables.push(thenable);
			} });
			try {
				emitter.fire(asyncEvent);
				Object.freeze(waitables);
			} finally {
				delete asyncEvent["waitUntil"];
			}
			if (!waitables.length) return;
			if (timeout !== void 0) await Promise.race([Promise.all(waitables), new Promise((resolve) => setTimeout(resolve, timeout))]);
			else await Promise.all(waitables);
		}
		WaitUntilEvent.fire = fire;
	})(WaitUntilEvent || (exports.WaitUntilEvent = WaitUntilEvent = {}));
	var cancellation_1 = require_cancellation();
	var AsyncEmitter = class extends Emitter {
		/**
		* Fire listeners async one after another.
		*/
		fire(event, token = cancellation_1.CancellationToken.None, promiseJoin) {
			const callbacks = this._callbacks;
			if (!callbacks) return Promise.resolve();
			const listeners = [...callbacks];
			if (this.deliveryQueue) return this.deliveryQueue = this.deliveryQueue.then(() => this.deliver(listeners, event, token, promiseJoin));
			return this.deliveryQueue = this.deliver(listeners, event, token, promiseJoin);
		}
		async deliver(listeners, event, token, promiseJoin) {
			for (const listener of listeners) {
				if (token.isCancellationRequested) return;
				const waitables = [];
				const asyncEvent = Object.assign(event, { waitUntil: (thenable) => {
					if (Object.isFrozen(waitables)) throw new Error("waitUntil cannot be called asynchronously.");
					if (promiseJoin) thenable = promiseJoin(thenable, listener);
					waitables.push(thenable);
				} });
				try {
					listener(event);
					Object.freeze(waitables);
				} catch (e) {
					console.error(e);
				} finally {
					delete asyncEvent["waitUntil"];
				}
				if (!waitables.length) return;
				try {
					await Promise.all(waitables);
				} catch (e) {
					console.error(e);
				}
			}
		}
	};
	exports.AsyncEmitter = AsyncEmitter;
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/utils/disposable.js
var require_disposable = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.DisposableCollection = exports.Disposable = void 0;
	var emitter_1 = require_emitter();
	var Disposable;
	(function(Disposable) {
		function is(arg) {
			return !!arg && typeof arg === "object" && "dispose" in arg && typeof arg["dispose"] === "function";
		}
		Disposable.is = is;
		function create(func) {
			return { dispose: func };
		}
		Disposable.create = create;
		Disposable.NULL = create(() => {});
	})(Disposable || (exports.Disposable = Disposable = {}));
	var DisposableCollection = class {
		constructor(...toDispose) {
			this.disposables = [];
			this.onDisposeEmitter = new emitter_1.Emitter();
			this.disposingElements = false;
			toDispose.forEach((d) => this.push(d));
		}
		/**
		* This event is fired only once
		* on first dispose of not empty collection.
		*/
		get onDispose() {
			return this.onDisposeEmitter.event;
		}
		checkDisposed() {
			if (this.disposed && !this.disposingElements) {
				this.onDisposeEmitter.fire(void 0);
				this.onDisposeEmitter.dispose();
			}
		}
		get disposed() {
			return this.disposables.length === 0;
		}
		dispose() {
			if (this.disposed || this.disposingElements) return;
			this.disposingElements = true;
			while (!this.disposed) try {
				this.disposables.pop().dispose();
			} catch (e) {
				console.error(e);
			}
			this.disposingElements = false;
			this.checkDisposed();
		}
		push(disposable) {
			const disposables = this.disposables;
			disposables.push(disposable);
			const originalDispose = disposable.dispose.bind(disposable);
			const toRemove = Disposable.create(() => {
				const index = disposables.indexOf(disposable);
				if (index !== -1) disposables.splice(index, 1);
				this.checkDisposed();
			});
			disposable.dispose = () => {
				toRemove.dispose();
				disposable.dispose = originalDispose;
				originalDispose();
			};
			return toRemove;
		}
		pushAll(disposables) {
			return disposables.map((disposable) => this.push(disposable));
		}
	};
	exports.DisposableCollection = DisposableCollection;
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/utils/os.js
var require_os = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.OS = exports.isOSX = exports.isWindows = void 0;
	exports.cmd = cmd;
	function is(userAgent, platform) {
		if (typeof navigator !== "undefined") {
			if (navigator.userAgent && navigator.userAgent.indexOf(userAgent) >= 0) return true;
		}
		if (typeof process !== "undefined") return process.platform === platform;
		return false;
	}
	exports.isWindows = is("Windows", "win32");
	exports.isOSX = is("Mac", "darwin");
	function cmd(command, ...args) {
		return [exports.isWindows ? "cmd" : command, exports.isWindows ? [
			"/c",
			command,
			...args
		] : args];
	}
	var OS;
	(function(OS) {
		/**
		* Enumeration of the supported operating systems.
		*/
		let Type;
		(function(Type) {
			Type["Windows"] = "Windows";
			Type["Linux"] = "Linux";
			Type["OSX"] = "OSX";
		})(Type = OS.Type || (OS.Type = {}));
		/**
		* Returns with the type of the operating system. If it is neither Windows nor OS X, then
		* it always returns with the `Linux` OS type.
		*/
		function type() {
			if (exports.isWindows) return Type.Windows;
			if (exports.isOSX) return Type.OSX;
			return Type.Linux;
		}
		OS.type = type;
	})(OS || (exports.OS = OS = {}));
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/utils/proxy-util.js
var require_proxy_util = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.isResolveMode = isResolveMode;
	exports.getTargetClass = getTargetClass;
	exports.getTarget = getTarget;
	exports.isProxy = isProxy;
	var resolveMode = false;
	function isResolveMode() {
		return resolveMode;
	}
	function getTargetClass(obj) {
		try {
			resolveMode = true;
			const target = obj.target;
			return target ? target.constructor : obj.constructor;
		} finally {
			resolveMode = false;
		}
	}
	function getTarget(obj) {
		try {
			resolveMode = true;
			return obj.target || obj;
		} finally {
			resolveMode = false;
		}
	}
	function isProxy(obj) {
		try {
			resolveMode = true;
			return !!obj.target;
		} finally {
			resolveMode = false;
		}
	}
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/utils/annotation-util.js
var require_annotation_util = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.AnnotationUtil = void 0;
	var AnnotationUtil;
	(function(AnnotationUtil) {
		function getValueOrOption(valueOrOption, primaryProperty = "id") {
			let option = {};
			if (typeof valueOrOption === "object" && !Array.isArray(valueOrOption)) option = valueOrOption;
			else if (valueOrOption) option = { [primaryProperty]: valueOrOption };
			return option;
		}
		AnnotationUtil.getValueOrOption = getValueOrOption;
		function getType(target, targetKey, index) {
			if (index !== void 0) return Reflect.getMetadata("design:paramtypes", target, targetKey)[index];
			else return Reflect.getMetadata("design:type", target, targetKey);
		}
		AnnotationUtil.getType = getType;
	})(AnnotationUtil || (exports.AnnotationUtil = AnnotationUtil = {}));
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/utils/global-util.js
var require_global_util = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.currentThis = void 0;
	function getGlobalThis() {
		if (typeof globalThis !== "undefined") return globalThis;
		if (typeof global !== "undefined") return global;
		if (typeof window !== "undefined") return window;
		if (typeof self !== "undefined") return self;
	}
	exports.currentThis = getGlobalThis();
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/utils/async.js
var require_async = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Promises = exports.DeferredPromise = exports.IntervalCounter = exports.TaskSequentializer = exports.RunOnceWorker = exports.ProcessTimeRunOnceScheduler = exports.RunOnceScheduler = exports.IntervalTimer = exports.TimeoutTimer = exports.Queue = exports.Limiter = exports.AutoOpenBarrier = exports.Barrier = exports.ThrottledDelayer = exports.Delayer = exports.MicrotaskDelay = exports.SequencerByKey = exports.Sequencer = exports.Throttler = void 0;
	exports.isThenable = isThenable;
	exports.delay = delay;
	exports.wait = wait;
	exports.waitForEvent = waitForEvent;
	exports.createCancelablePromise = createCancelablePromise;
	exports.raceCancellation = raceCancellation;
	exports.raceCancellationError = raceCancellationError;
	exports.raceCancellablePromises = raceCancellablePromises;
	exports.raceTimeout = raceTimeout;
	exports.asPromise = asPromise;
	exports.timeout = timeout;
	exports.disposableTimeout = disposableTimeout;
	exports.sequence = sequence;
	exports.first = first;
	exports.firstParallel = firstParallel;
	exports.retry = retry;
	var cancellation_1 = require_cancellation();
	var disposable_1 = require_disposable();
	var emitter_1 = require_emitter();
	function isThenable(obj) {
		return !!obj && typeof obj.then === "function";
	}
	/**
	* A function to allow a promise resolution to be delayed by a number of milliseconds. Usage is as follows:
	*
	* `const stringValue = await myPromise.then(delay(600)).then(value => value.toString());`
	*
	* @param ms the number of millisecond to delay
	* @returns a function that returns a promise that returns the given value, but delayed
	*/
	function delay(ms) {
		return (value) => new Promise((resolve, reject) => {
			setTimeout(() => resolve(value), ms);
		});
	}
	/**
	* Constructs a promise that will resolve after a given delay.
	* @param ms the number of milliseconds to wait
	*/
	async function wait(ms) {
		await delay(ms)(void 0);
	}
	function waitForEvent(event, ms, thisArg, disposables) {
		return new Promise((resolve, reject) => {
			const registration = setTimeout(() => {
				listener.dispose();
				reject(new cancellation_1.CancellationError());
			}, ms);
			const listener = event((evt) => {
				clearTimeout(registration);
				listener.dispose();
				resolve(evt);
			}, thisArg, disposables);
		});
	}
	function createCancelablePromise(callback) {
		const source = new cancellation_1.CancellationTokenSource();
		const thenable = callback(source.token);
		const promise = new Promise((resolve, reject) => {
			const subscription = source.token.onCancellationRequested(() => {
				subscription.dispose();
				source.dispose();
				reject(new cancellation_1.CancellationError());
			});
			Promise.resolve(thenable).then((value) => {
				subscription.dispose();
				source.dispose();
				resolve(value);
			}, (err) => {
				subscription.dispose();
				source.dispose();
				reject(err);
			});
		});
		return new class {
			cancel() {
				source.cancel();
			}
			then(resolve, reject) {
				return promise.then(resolve, reject);
			}
			catch(reject) {
				return this.then(void 0, reject);
			}
			finally(onfinally) {
				return promise.finally(onfinally);
			}
		}();
	}
	function raceCancellation(promise, token, defaultValue) {
		return new Promise((resolve, reject) => {
			const ref = token.onCancellationRequested(() => {
				ref.dispose();
				resolve(defaultValue);
			});
			promise.then(resolve, reject).finally(() => ref.dispose());
		});
	}
	function raceCancellationError(promise, token) {
		return new Promise((resolve, reject) => {
			const ref = token.onCancellationRequested(() => {
				ref.dispose();
				reject(new cancellation_1.CancellationError());
			});
			promise.then(resolve, reject).finally(() => ref.dispose());
		});
	}
	async function raceCancellablePromises(cancellablePromises) {
		let resolvedPromiseIndex = -1;
		const promises = cancellablePromises.map((promise, index) => promise.then((result) => {
			resolvedPromiseIndex = index;
			return result;
		}));
		const result = await Promise.race(promises);
		cancellablePromises.forEach((cancellablePromise, index) => {
			if (index !== resolvedPromiseIndex) cancellablePromise.cancel();
		});
		return result;
	}
	function raceTimeout(promise, timeout, onTimeout) {
		let promiseResolve = void 0;
		const timer = setTimeout(() => {
			promiseResolve === null || promiseResolve === void 0 || promiseResolve(void 0);
			onTimeout === null || onTimeout === void 0 || onTimeout();
		}, timeout);
		return Promise.race([promise.finally(() => clearTimeout(timer)), new Promise((resolve) => promiseResolve = resolve)]);
	}
	function asPromise(callback) {
		return new Promise((resolve, reject) => {
			const item = callback();
			if (isThenable(item)) item.then(resolve, reject);
			else resolve(item);
		});
	}
	/**
	* A helper to prevent accumulation of sequential async tasks.
	*
	* Imagine a mail man with the sole task of delivering letters. As soon as
	* a letter submitted for delivery, he drives to the destination, delivers it
	* and returns to his base. Imagine that during the trip, N more letters were submitted.
	* When the mail man returns, he picks those N letters and delivers them all in a
	* single trip. Even though N+1 submissions occurred, only 2 deliveries were made.
	*
	* The throttler implements this via the queue() method, by providing it a task
	* factory. Following the example:
	*
	*         const throttler = new Throttler();
	*         const letters = [];
	*
	*         function deliver() {
	*             const lettersToDeliver = letters;
	*             letters = [];
	*             return makeTheTrip(lettersToDeliver);
	*         }
	*
	*         function onLetterReceived(l) {
	*             letters.push(l);
	*             throttler.queue(deliver);
	*         }
	*/
	var Throttler = class {
		constructor() {
			this.activePromise = void 0;
			this.queuedPromise = void 0;
			this.queuedPromiseFactory = void 0;
		}
		queue(promiseFactory) {
			if (this.activePromise) {
				this.queuedPromiseFactory = promiseFactory;
				if (!this.queuedPromise) {
					const onComplete = () => {
						this.queuedPromise = void 0;
						const result = this.queue(this.queuedPromiseFactory);
						this.queuedPromiseFactory = void 0;
						return result;
					};
					this.queuedPromise = new Promise((resolve) => {
						this.activePromise.then(onComplete, onComplete).then(resolve);
					});
				}
				return new Promise((resolve, reject) => {
					this.queuedPromise.then(resolve, reject);
				});
			}
			this.activePromise = promiseFactory();
			return new Promise((resolve, reject) => {
				this.activePromise.then((result) => {
					this.activePromise = void 0;
					resolve(result);
				}, (err) => {
					this.activePromise = void 0;
					reject(err);
				});
			});
		}
	};
	exports.Throttler = Throttler;
	var Sequencer = class {
		constructor() {
			this.current = Promise.resolve(void 0);
		}
		queue(promiseTask) {
			return this.current = this.current.then(() => promiseTask(), () => promiseTask());
		}
	};
	exports.Sequencer = Sequencer;
	var SequencerByKey = class {
		constructor() {
			this.promiseMap = /* @__PURE__ */ new Map();
		}
		queue(key, promiseTask) {
			var _a;
			const newPromise = ((_a = this.promiseMap.get(key)) !== null && _a !== void 0 ? _a : Promise.resolve()).catch(() => {}).then(promiseTask).finally(() => {
				if (this.promiseMap.get(key) === newPromise) this.promiseMap.delete(key);
			});
			this.promiseMap.set(key, newPromise);
			return newPromise;
		}
	};
	exports.SequencerByKey = SequencerByKey;
	var timeoutDeferred = (timeout, fn) => {
		let scheduled = true;
		const handle = setTimeout(() => {
			scheduled = false;
			fn();
		}, timeout);
		return {
			isTriggered: () => scheduled,
			dispose: () => {
				clearTimeout(handle);
				scheduled = false;
			}
		};
	};
	var microtaskDeferred = (fn) => {
		let scheduled = true;
		queueMicrotask(() => {
			if (scheduled) {
				scheduled = false;
				fn();
			}
		});
		return {
			isTriggered: () => scheduled,
			dispose: () => {
				scheduled = false;
			}
		};
	};
	/** Can be passed into the Delayed to defer using a microtask */
	exports.MicrotaskDelay = Symbol("MicrotaskDelay");
	/**
	* A helper to delay (debounce) execution of a task that is being requested often.
	*
	* Following the throttler, now imagine the mail man wants to optimize the number of
	* trips proactively. The trip itself can be long, so he decides not to make the trip
	* as soon as a letter is submitted. Instead he waits a while, in case more
	* letters are submitted. After said waiting period, if no letters were submitted, he
	* decides to make the trip. Imagine that N more letters were submitted after the first
	* one, all within a short period of time between each other. Even though N+1
	* submissions occurred, only 1 delivery was made.
	*
	* The delayer offers this behavior via the trigger() method, into which both the task
	* to be executed and the waiting period (delay) must be passed in as arguments. Following
	* the example:
	*
	*         const delayer = new Delayer(WAITING_PERIOD);
	*         const letters = [];
	*
	*         function letterReceived(l) {
	*             letters.push(l);
	*             delayer.trigger(() => { return makeTheTrip(); });
	*         }
	*/
	var Delayer = class {
		constructor(defaultDelay) {
			this.defaultDelay = defaultDelay;
			this.deferred = void 0;
			this.completionPromise = void 0;
			this.doResolve = void 0;
			this.doReject = void 0;
			this.task = void 0;
		}
		trigger(task, delay = this.defaultDelay) {
			this.task = task;
			this.cancelTimeout();
			if (!this.completionPromise) this.completionPromise = new Promise((resolve, reject) => {
				this.doResolve = resolve;
				this.doReject = reject;
			}).then(() => {
				this.completionPromise = void 0;
				this.doResolve = void 0;
				if (this.task) {
					const task = this.task;
					this.task = void 0;
					return task();
				}
			});
			const fn = () => {
				var _a;
				this.deferred = void 0;
				(_a = this.doResolve) === null || _a === void 0 || _a.call(this, void 0);
			};
			this.deferred = delay === exports.MicrotaskDelay ? microtaskDeferred(fn) : timeoutDeferred(delay, fn);
			return this.completionPromise;
		}
		isTriggered() {
			var _a;
			return !!((_a = this.deferred) === null || _a === void 0 ? void 0 : _a.isTriggered());
		}
		cancel() {
			this.cancelTimeout();
			if (this.completionPromise) {
				if (this.doReject) this.doReject(new cancellation_1.CancellationError());
				this.completionPromise = void 0;
			}
		}
		cancelTimeout() {
			var _a;
			(_a = this.deferred) === null || _a === void 0 || _a.dispose();
			this.deferred = void 0;
		}
		dispose() {
			this.cancel();
		}
	};
	exports.Delayer = Delayer;
	/**
	* A helper to delay execution of a task that is being requested often, while
	* preventing accumulation of consecutive executions, while the task runs.
	*
	* The mail man is clever and waits for a certain amount of time, before going
	* out to deliver letters. While the mail man is going out, more letters arrive
	* and can only be delivered once he is back. Once he is back the mail man will
	* do one more trip to deliver the letters that have accumulated while he was out.
	*/
	var ThrottledDelayer = class {
		constructor(defaultDelay) {
			this.delayer = new Delayer(defaultDelay);
			this.throttler = new Throttler();
		}
		trigger(promiseFactory, delay) {
			return this.delayer.trigger(() => this.throttler.queue(promiseFactory), delay);
		}
		isTriggered() {
			return this.delayer.isTriggered();
		}
		cancel() {
			this.delayer.cancel();
		}
		dispose() {
			this.delayer.dispose();
		}
	};
	exports.ThrottledDelayer = ThrottledDelayer;
	/**
	* A barrier that is initially closed and then becomes opened permanently.
	*/
	var Barrier = class {
		constructor() {
			this._isOpen = false;
			this._promise = new Promise((c, e) => {
				this._completePromise = c;
			});
		}
		isOpen() {
			return this._isOpen;
		}
		open() {
			this._isOpen = true;
			this._completePromise(true);
		}
		wait() {
			return this._promise;
		}
	};
	exports.Barrier = Barrier;
	/**
	* A barrier that is initially closed and then becomes opened permanently after a certain period of
	* time or when open is called explicitly
	*/
	var AutoOpenBarrier = class extends Barrier {
		constructor(autoOpenTimeMs) {
			super();
			this._timeout = setTimeout(() => this.open(), autoOpenTimeMs);
		}
		open() {
			clearTimeout(this._timeout);
			super.open();
		}
	};
	exports.AutoOpenBarrier = AutoOpenBarrier;
	function timeout(millis, token) {
		if (!token) return createCancelablePromise((token) => timeout(millis, token));
		return new Promise((resolve, reject) => {
			const handle = setTimeout(() => {
				disposable.dispose();
				resolve();
			}, millis);
			const disposable = token.onCancellationRequested(() => {
				clearTimeout(handle);
				disposable.dispose();
				reject(new cancellation_1.CancellationError());
			});
		});
	}
	function disposableTimeout(handler, timeout = 0) {
		const timer = setTimeout(handler, timeout);
		return disposable_1.Disposable.create(() => clearTimeout(timer));
	}
	/**
	* Runs the provided list of promise factories in sequential order. The returned
	* promise will complete to an array of results from each promise.
	*/
	function sequence(promiseFactories) {
		const results = [];
		let index = 0;
		const len = promiseFactories.length;
		function next() {
			return index < len ? promiseFactories[index++]() : void 0;
		}
		function thenHandler(result) {
			if (result !== void 0 && result !== void 0) results.push(result);
			const n = next();
			if (n) return n.then(thenHandler);
			return Promise.resolve(results);
		}
		return Promise.resolve(void 0).then(thenHandler);
	}
	function first(promiseFactories, shouldStop = (t) => !!t, defaultValue = void 0) {
		let index = 0;
		const len = promiseFactories.length;
		const loop = () => {
			if (index >= len) return Promise.resolve(defaultValue);
			const factory = promiseFactories[index++];
			return Promise.resolve(factory()).then((result) => {
				if (shouldStop(result)) return Promise.resolve(result);
				return loop();
			});
		};
		return loop();
	}
	function firstParallel(promiseList, shouldStop = (t) => !!t, defaultValue = void 0) {
		if (promiseList.length === 0) return Promise.resolve(defaultValue);
		let todo = promiseList.length;
		const finish = () => {
			var _a, _b;
			todo = -1;
			for (const promise of promiseList) (_b = (_a = promise).cancel) === null || _b === void 0 || _b.call(_a);
		};
		return new Promise((resolve, reject) => {
			for (const promise of promiseList) promise.then((result) => {
				if (--todo >= 0 && shouldStop(result)) {
					finish();
					resolve(result);
				} else if (todo === 0) resolve(defaultValue);
			}).catch((err) => {
				if (--todo >= 0) {
					finish();
					reject(err);
				}
			});
		});
	}
	/**
	* A helper to queue N promises and run them all with a max degree of parallelism. The helper
	* ensures that at any time no more than M promises are running at the same time.
	*/
	var Limiter = class {
		constructor(maxDegreeOfParalellism) {
			this._size = 0;
			this.maxDegreeOfParalellism = maxDegreeOfParalellism;
			this.outstandingPromises = [];
			this.runningPromises = 0;
			this._onDrained = new emitter_1.Emitter();
		}
		/**
		* An event that fires when every promise in the queue
		* has started to execute. In other words: no work is
		* pending to be scheduled.
		*
		* This is NOT an event that signals when all promises
		* have finished though.
		*/
		get onDrained() {
			return this._onDrained.event;
		}
		get size() {
			return this._size;
		}
		queue(factory) {
			this._size++;
			return new Promise((c, e) => {
				this.outstandingPromises.push({
					factory,
					c,
					e
				});
				this.consume();
			});
		}
		consume() {
			while (this.outstandingPromises.length && this.runningPromises < this.maxDegreeOfParalellism) {
				const iLimitedTask = this.outstandingPromises.shift();
				this.runningPromises++;
				const promise = iLimitedTask.factory();
				promise.then(iLimitedTask.c, iLimitedTask.e);
				promise.then(() => this.consumed(), () => this.consumed());
			}
		}
		consumed() {
			this._size--;
			this.runningPromises--;
			if (this.outstandingPromises.length > 0) this.consume();
			else this._onDrained.fire();
		}
		dispose() {
			this._onDrained.dispose();
		}
	};
	exports.Limiter = Limiter;
	/**
	* A queue is handles one promise at a time and guarantees that at any time only one promise is executing.
	*/
	var Queue = class extends Limiter {
		constructor() {
			super(1);
		}
	};
	exports.Queue = Queue;
	var TimeoutTimer = class {
		constructor(runner, timeout) {
			this._token = -1;
			if (typeof runner === "function" && typeof timeout === "number") this.setIfNotSet(runner, timeout);
		}
		dispose() {
			this.cancel();
		}
		cancel() {
			if (this._token !== -1) {
				clearTimeout(this._token);
				this._token = -1;
			}
		}
		cancelAndSet(runner, timeout) {
			this.cancel();
			this._token = setTimeout(() => {
				this._token = -1;
				runner();
			}, timeout);
		}
		setIfNotSet(runner, timeout) {
			if (this._token !== -1) return;
			this._token = setTimeout(() => {
				this._token = -1;
				runner();
			}, timeout);
		}
	};
	exports.TimeoutTimer = TimeoutTimer;
	var IntervalTimer = class {
		constructor() {
			this._token = -1;
		}
		dispose() {
			this.cancel();
		}
		cancel() {
			if (this._token !== -1) {
				clearInterval(this._token);
				this._token = -1;
			}
		}
		cancelAndSet(runner, interval) {
			this.cancel();
			this._token = setInterval(() => {
				runner();
			}, interval);
		}
	};
	exports.IntervalTimer = IntervalTimer;
	var RunOnceScheduler = class {
		constructor(runner, delay) {
			this.timeoutToken = -1;
			this.runner = runner;
			this.timeout = delay;
			this.timeoutHandler = this.onTimeout.bind(this);
		}
		/**
		* Dispose RunOnceScheduler
		*/
		dispose() {
			this.cancel();
			this.runner = void 0;
		}
		/**
		* Cancel current scheduled runner (if any).
		*/
		cancel() {
			if (this.isScheduled()) {
				clearTimeout(this.timeoutToken);
				this.timeoutToken = -1;
			}
		}
		/**
		* Cancel previous runner (if any) & schedule a new runner.
		*/
		schedule(delay = this.timeout) {
			this.cancel();
			this.timeoutToken = setTimeout(this.timeoutHandler, delay);
		}
		get delay() {
			return this.timeout;
		}
		set delay(value) {
			this.timeout = value;
		}
		/**
		* Returns true if scheduled.
		*/
		isScheduled() {
			return this.timeoutToken !== -1;
		}
		onTimeout() {
			this.timeoutToken = -1;
			if (this.runner) this.doRun();
		}
		doRun() {
			if (this.runner) this.runner();
		}
	};
	exports.RunOnceScheduler = RunOnceScheduler;
	/**
	* Same as `RunOnceScheduler`, but doesn't count the time spent in sleep mode.
	* > **NOTE**: Only offers 1s resolution.
	*
	* When calling `setTimeout` with 3hrs, and putting the computer immediately to sleep
	* for 8hrs, `setTimeout` will fire **as soon as the computer wakes from sleep**. But
	* this scheduler will execute 3hrs **after waking the computer from sleep**.
	*/
	var ProcessTimeRunOnceScheduler = class {
		constructor(runner, delay) {
			if (delay % 1e3 !== 0) console.warn(`ProcessTimeRunOnceScheduler resolution is 1s, ${delay}ms is not a multiple of 1000ms.`);
			this.runner = runner;
			this.timeout = delay;
			this.counter = 0;
			this.intervalToken = -1;
			this.intervalHandler = this.onInterval.bind(this);
		}
		dispose() {
			this.cancel();
			this.runner = void 0;
		}
		cancel() {
			if (this.isScheduled()) {
				clearInterval(this.intervalToken);
				this.intervalToken = -1;
			}
		}
		/**
		* Cancel previous runner (if any) & schedule a new runner.
		*/
		schedule(delay = this.timeout) {
			if (delay % 1e3 !== 0) console.warn(`ProcessTimeRunOnceScheduler resolution is 1s, ${delay}ms is not a multiple of 1000ms.`);
			this.cancel();
			this.counter = Math.ceil(delay / 1e3);
			this.intervalToken = setInterval(this.intervalHandler, 1e3);
		}
		/**
		* Returns true if scheduled.
		*/
		isScheduled() {
			return this.intervalToken !== -1;
		}
		onInterval() {
			this.counter--;
			if (this.counter > 0) return;
			clearInterval(this.intervalToken);
			this.intervalToken = -1;
			if (this.runner) this.runner();
		}
	};
	exports.ProcessTimeRunOnceScheduler = ProcessTimeRunOnceScheduler;
	var RunOnceWorker = class extends RunOnceScheduler {
		constructor(runner, timeout) {
			super(runner, timeout);
			this.units = [];
		}
		work(unit) {
			this.units.push(unit);
			if (!this.isScheduled()) this.schedule();
		}
		doRun() {
			const units = this.units;
			this.units = [];
			if (this.runner) this.runner(units);
		}
		dispose() {
			this.units = [];
			super.dispose();
		}
	};
	exports.RunOnceWorker = RunOnceWorker;
	async function retry(task, delay, retries) {
		let lastError;
		for (let i = 0; i < retries; i++) try {
			return await task();
		} catch (error) {
			lastError = error;
			await timeout(delay);
		}
		throw lastError;
	}
	var TaskSequentializer = class {
		hasPending(taskId) {
			if (!this._pending) return false;
			if (typeof taskId === "number") return this._pending.taskId === taskId;
			return !!this._pending;
		}
		get pending() {
			return this._pending ? this._pending.promise : void 0;
		}
		cancelPending() {
			var _a;
			(_a = this._pending) === null || _a === void 0 || _a.cancel();
		}
		setPending(taskId, promise, onCancel) {
			this._pending = {
				taskId,
				cancel: () => onCancel === null || onCancel === void 0 ? void 0 : onCancel(),
				promise
			};
			promise.then(() => this.donePending(taskId), () => this.donePending(taskId));
			return promise;
		}
		donePending(taskId) {
			if (this._pending && taskId === this._pending.taskId) {
				this._pending = void 0;
				this.triggerNext();
			}
		}
		triggerNext() {
			if (this._next) {
				const next = this._next;
				this._next = void 0;
				next.run().then(next.promiseResolve, next.promiseReject);
			}
		}
		setNext(run) {
			if (!this._next) {
				let promiseResolve;
				let promiseReject;
				this._next = {
					run,
					promise: new Promise((resolve, reject) => {
						promiseResolve = resolve;
						promiseReject = reject;
					}),
					promiseResolve,
					promiseReject
				};
			} else this._next.run = run;
			return this._next.promise;
		}
	};
	exports.TaskSequentializer = TaskSequentializer;
	/**
	* The `IntervalCounter` allows to count the number
	* of calls to `increment()` over a duration of
	* `interval`. This utility can be used to conditionally
	* throttle a frequent task when a certain threshold
	* is reached.
	*/
	var IntervalCounter = class {
		constructor(interval, nowFn = () => Date.now()) {
			this.interval = interval;
			this.nowFn = nowFn;
			this.lastIncrementTime = 0;
			this.value = 0;
		}
		increment() {
			const now = this.nowFn();
			if (now - this.lastIncrementTime > this.interval) {
				this.lastIncrementTime = now;
				this.value = 0;
			}
			this.value++;
			return this.value;
		}
	};
	exports.IntervalCounter = IntervalCounter;
	/**
	* Creates a promise whose resolution or rejection can be controlled imperatively.
	*/
	var DeferredPromise = class {
		get isRejected() {
			return this.rejected;
		}
		get isResolved() {
			return this.resolved;
		}
		get isSettled() {
			return this.rejected || this.resolved;
		}
		constructor() {
			this.rejected = false;
			this.resolved = false;
			this.p = new Promise((c, e) => {
				this.completeCallback = c;
				this.errorCallback = e;
			});
		}
		complete(value) {
			return new Promise((resolve) => {
				this.completeCallback(value);
				this.resolved = true;
				resolve();
			});
		}
		error(err) {
			return new Promise((resolve) => {
				this.errorCallback(err);
				this.rejected = true;
				resolve();
			});
		}
		cancel() {
			new Promise((resolve) => {
				this.errorCallback(new cancellation_1.CancellationError());
				this.rejected = true;
				resolve();
			});
		}
	};
	exports.DeferredPromise = DeferredPromise;
	var Promises;
	(function(Promises) {
		/**
		* A drop-in replacement for `Promise.all` with the only difference
		* that the method awaits every promise to either fulfill or reject.
		*
		* Similar to `Promise.all`, only the first error will be returned
		* if any.
		*/
		async function settled(promises) {
			let firstError = void 0;
			const result = await Promise.all(promises.map((promise) => promise.then((value) => value, (error) => {
				if (!firstError) firstError = error;
			})));
			if (typeof firstError !== "undefined") throw firstError;
			return result;
		}
		Promises.settled = settled;
		/**
		* A helper to create a new `Promise<T>` with a body that is a promise
		* itself. By default, an error that raises from the async body will
		* end up as a unhandled rejection, so this utility properly awaits the
		* body and rejects the promise as a normal promise does without async
		* body.
		*
		* This method should only be used in rare cases where otherwise `async`
		* cannot be used (e.g. when callbacks are involved that require this).
		*/
		function withAsyncBody(bodyFn) {
			return new Promise(async (resolve, reject) => {
				try {
					await bodyFn(resolve, reject);
				} catch (error) {
					reject(error);
				}
			});
		}
		Promises.withAsyncBody = withAsyncBody;
	})(Promises || (exports.Promises = Promises = {}));
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/utils/url-util.js
var require_url_util = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.UrlUtil = void 0;
	var UrlUtil;
	(function(UrlUtil) {
		function join(...paths) {
			const resultArray = [];
			if (paths.length === 0) return "";
			if (typeof paths[0] !== "string") throw new TypeError("Url must be a string. Received " + paths[0]);
			if (paths[0].match(/^[^/:]+:\/*$/) && paths.length > 1) paths[0] = paths.shift() + paths[0];
			if (paths[0].match(/^file:\/\/\//)) paths[0] = paths[0].replace(/^([^/:]+):\/*/, "$1:///");
			else paths[0] = paths[0].replace(/^([^/:]+):\/*/, "$1://");
			for (let i = 0; i < paths.length; i++) {
				let component = paths[i];
				if (typeof component !== "string") throw new TypeError("Url must be a string. Received " + component);
				if (component === "") continue;
				if (i > 0) component = component.replace(/^[\/]+/, "");
				if (i < paths.length - 1) component = component.replace(/[\/]+$/, "");
				else component = component.replace(/[\/]+$/, "/");
				resultArray.push(component);
			}
			let str = resultArray.join("/");
			str = str.replace(/\/(\?|&|#[^!])/g, "$1");
			const parts = str.split("?");
			str = parts.shift() + (parts.length > 0 ? "?" : "") + parts.join("&");
			return str;
		}
		UrlUtil.join = join;
	})(UrlUtil || (exports.UrlUtil = UrlUtil = {}));
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/utils/uuid.js
var require_uuid = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.generateUUUID = void 0;
	exports.isUUID = isUUID;
	var _UUIDPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
	function isUUID(value) {
		return _UUIDPattern.test(value);
	}
	exports.generateUUUID = (function() {
		if (typeof crypto === "object" && typeof crypto.randomUUID === "function") return crypto.randomUUID.bind(crypto);
		let getRandomValues;
		if (typeof crypto === "object" && typeof crypto.getRandomValues === "function") getRandomValues = crypto.getRandomValues.bind(crypto);
		else getRandomValues = function(bucket) {
			for (let i = 0; i < bucket.length; i++) bucket[i] = Math.floor(Math.random() * 256);
			return bucket;
		};
		const _data = new Uint8Array(16);
		const _hex = [];
		for (let i = 0; i < 256; i++) _hex.push(i.toString(16).padStart(2, "0"));
		return function generateUuid() {
			getRandomValues(_data);
			_data[6] = _data[6] & 15 | 64;
			_data[8] = _data[8] & 63 | 128;
			let i = 0;
			let result = "";
			result += _hex[_data[i++]];
			result += _hex[_data[i++]];
			result += _hex[_data[i++]];
			result += _hex[_data[i++]];
			result += "-";
			result += _hex[_data[i++]];
			result += _hex[_data[i++]];
			result += "-";
			result += _hex[_data[i++]];
			result += _hex[_data[i++]];
			result += "-";
			result += _hex[_data[i++]];
			result += _hex[_data[i++]];
			result += "-";
			result += _hex[_data[i++]];
			result += _hex[_data[i++]];
			result += _hex[_data[i++]];
			result += _hex[_data[i++]];
			result += _hex[_data[i++]];
			result += _hex[_data[i++]];
			return result;
		};
	})();
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/error/custom-error.js
var require_custom_error = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.CustomError = void 0;
	var utils_1 = require_utils();
	/**
	* Allows to easily extend a base class to create custom applicative errors.
	*
	* example:
	* ```
	* class HttpError extends CustomError {
	*     public constructor(
	*         public code: number,
	*         message?: string,
	*      cause?: Error,
	*     ) {
	*         super(message, { cause })
	*     }
	* }
	*
	* new HttpError(404, 'Not found')
	* ```
	*/
	var CustomError = class extends Error {
		constructor(message, options) {
			super(message, options);
			Object.defineProperty(this, "name", {
				value: new.target.name,
				enumerable: false,
				configurable: true
			});
			utils_1.ErrorUtil.fixProto(this, new.target.prototype);
			utils_1.ErrorUtil.fixStack(this);
		}
	};
	exports.CustomError = CustomError;
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/error/illegal-state-error.js
var require_illegal_state_error = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.IllegalStateError = void 0;
	var custom_error_1 = require_custom_error();
	var IllegalStateError = class extends custom_error_1.CustomError {};
	exports.IllegalStateError = IllegalStateError;
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/utils/assert.js
var require_assert = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Assert = void 0;
	var illegal_state_error_1 = require_illegal_state_error();
	var class_util_1 = require_class_util();
	var Assert = class {
		/**
		* Assert a boolean expression, throwing an `IllegalStateError`
		* if the expression evaluates to `false`.
		* @param expression a boolean expression
		* @param message the exception message to use if the assertion fails
		* @throws IllegalStateError if `expression` is `false`
		* @example
		* Assert.state(id === undefined, "The id property must not already be initialized");
		* Assert.state(entity.getId() === undefined,
		*     () => "ID for entity " + entity.getName() + " must not already be initialized");
		*/
		static state(expression, message) {
			if (!expression) throw new illegal_state_error_1.IllegalStateError(this.resolveMessage(message));
		}
		/**
		* Assert a boolean expression, throwing an `IllegalStateError`
		* if the expression evaluates to `false`.
		* @param expression a boolean expression
		* @param message the exception message to use if the assertion fails
		* @throws IllegalStateError if `expression` is `false`
		* @example
		* Assert.isTrue(i > 0, "The value must be greater than zero");
		* Assert.isTrue(i > 0, () => "The value '" + i + "' must be greater than zero");
		*/
		static isTrue(expression, message) {
			if (!expression) throw new illegal_state_error_1.IllegalStateError(this.resolveMessage(message));
		}
		/**
		* Assert that an object is `undefined`.
		* @param object the object to check
		* @param message the exception message to use if the assertion fails
		* @throws IllegalStateError if the object is not `undefined`
		* @example
		* Assert.isNull(value, "The value must be null");
		* Assert.isNull(value, () => "The value '" + value + "' must be null");
		*/
		static isNull(object, message) {
			if (object !== void 0 || object !== null) throw new illegal_state_error_1.IllegalStateError(this.resolveMessage(message));
		}
		/**
		* Assert that an object is not `undefined`.
		* @param object the object to check
		* @param message the exception message to use if the assertion fails
		* @throws IllegalStateError if the object is `undefined`
		* @example
		* Assert.notNull(clazz, "The class must not be null");
		* Assert.notNull(entity.getId(),
		*     () => "ID for entity " + entity.getName() + " must not be null");
		*/
		static notNull(object, message) {
			if (object === void 0 || object === null) throw new illegal_state_error_1.IllegalStateError(this.resolveMessage(message));
		}
		/**
		* Assert that the given String is not empty; that is,
		* it must not be `undefined` and not the empty String.
		* @param text the String to check
		* @param message the exception message to use if the assertion fails
		* @throws IllegalStateError if the text is empty
		* @example
		* Assert.hasLength(name, "Name must not be empty");
		* Assert.hasLength(name, () => "Name for account '" + account.getId() + "' must not be empty");
		*/
		static hasLength(text, message) {
			if (!text || text.length === 0) throw new illegal_state_error_1.IllegalStateError(this.resolveMessage(message));
		}
		/**
		* Assert that the given String contains valid text content; that is, it must not
		* be `undefined` and must contain at least one non-whitespace character.
		* @param text the String to check
		* @param message the exception message to use if the assertion fails
		* @throws IllegalStateError if the text does not contain valid text content
		* @example
		* Assert.hasText(account.getName(), "Name must not be empty");
		* Assert.hasText(account.getName(),
		*    () => "Name for account '" + account.getId() + "' must not be empty");
		*/
		static hasText(text, message) {
			if (!text || text.trim().length === 0) throw new illegal_state_error_1.IllegalStateError(this.resolveMessage(message));
		}
		/**
		* Assert that the given text does not contain the given substring.
		* @param textToSearch the text to search
		* @param substring the substring to find within the text
		* @param message the exception message to use if the assertion fails
		* @throws IllegalStateError if the text contains the substring
		* @example
		* Assert.doesNotContain(name, forbidden, "Name must not contain '" + forbidden + "'");
		* Assert.doesNotContain(name, forbidden,
		*    () => "Name must not contain '" + forbidden + "'");
		*/
		static doesNotContain(textToSearch, substring, message) {
			if (textToSearch && substring && textToSearch.includes(substring)) throw new illegal_state_error_1.IllegalStateError(this.resolveMessage(message));
		}
		/**
		* Assert that an array contains elements; that is, it must not be
		* `undefined` and must contain at least one element.
		* @param array the array to check
		* @param message the exception message to use if the assertion fails
		* @throws IllegalStateError if the object array is `undefined` or contains no elements
		* @example
		* Assert.notEmpty(array, "The array must contain elements");
		* Assert.notEmpty(array, () => "The " + arrayType + " array must contain elements");
		*/
		static notEmpty(array, message) {
			if (!array || array.length === 0) throw new illegal_state_error_1.IllegalStateError(this.resolveMessage(message));
		}
		/**
		* Assert that an array contains no `undefined` elements.
		* <p>Note: Does not complain if the array is empty!
		* @param array the array to check
		* @param message the exception message to use if the assertion fails
		* @throws IllegalStateError if the object array contains a `undefined` element
		* @example
		* Assert.noNullElements(array, "The array must contain non-null elements");
		* Assert.noNullElements(array, () => "The " + arrayType + " array must contain non-null elements");
		*/
		static noNullElements(array, message) {
			if (array) {
				for (const element of array) if (element === void 0 || element === null) throw new illegal_state_error_1.IllegalStateError(this.resolveMessage(message));
			}
		}
		/**
		* Assert that a collection contains elements; that is, it must not be
		* `undefined` and must contain at least one element.
		* @param collection the collection to check
		* @param message the exception message to use if the assertion fails
		* @throws IllegalStateError if the collection is `undefined` or
		* contains no elements
		* @example
		* Assert.notEmpty(collection, "Collection must contain elements");
		* Assert.notEmpty(collection, () => "The " + collectionType + " collection must contain elements");
		*/
		static notEmptyCollection(collection, message) {
			if (!collection || collection.length === 0) throw new illegal_state_error_1.IllegalStateError(this.resolveMessage(message));
		}
		/**
		* Assert that a collection contains no `undefined` elements.
		* <p>Note: Does not complain if the collection is empty!
		* @param collection the collection to check
		* @param message the exception message to use if the assertion fails
		* @throws IllegalStateError if the collection contains a `undefined`
		* @example
		* Assert.noNullElements(collection, "Collection must contain non-null elements");
		* Assert.noNullElements(collection, () => "The " + collectionName + " must contain non-null elements");
		*/
		static noNullElementsCollection(collection, message) {
			if (collection) {
				for (const element of collection) if (element === void 0 || element === null) throw new illegal_state_error_1.IllegalStateError(this.resolveMessage(message));
			}
		}
		/**
		* Assert that a Map contains entries; that is, it must not be `undefined`
		* and must contain at least one entry.
		* @param map the map to check
		* @param message the exception message to use if the assertion fails
		* @throws IllegalStateError if the map is `undefined` or contains no entries
		* @example
		* Assert.notEmpty(map, "The map must contain entries");
		* Assert.notEmpty(map, () => "The " + mapType + " map must contain entries");
		*/
		static notEmptyMap(map, message) {
			if (!map || map.size === 0) throw new illegal_state_error_1.IllegalStateError(this.resolveMessage(message));
		}
		/**
		* Assert that the provided object is an instance of the provided class.
		* @param type the type to check against
		* @param obj the object to check
		* @param message a message which will be prepended to provide further context.
		* If it is empty or ends in ":" or ";" or "," or ".", a full exception message
		* will be appended. If it ends in a space, the name of the offending object's
		* type will be appended. In any other case, a ":" with a space and the name
		* of the offending object's type will be appended.
		* @throws IllegalStateError if the object is not an instance of type
		* @example
		* Assert.instanceOf(Foo, foo, "Foo expected");
		* Assert.instanceOf(Foo, foo, () => "Processing " + Foo.name + ":");
		* Assert.instanceOf(Foo, foo);
		*/
		static isInstanceOf(type, obj, message) {
			this.notNull(type, "Type to check against must not be null");
			if (!(obj instanceof type)) this.instanceCheckFailed(type, obj, this.resolveMessage(message));
		}
		/**
		* Assert that `superType.isAssignableFrom(subType)` is `true`.
		* @param superType the supertype to check against
		* @param subType the subtype to check
		* @param message a message which will be prepended to provide further context.
		* If it is empty or ends in ":" or ";" or "," or ".", a full exception message
		* will be appended. If it ends in a space, the name of the offending subtype
		* will be appended. In any other case, a ":" with a space and the name of the
		* offending subtype will be appended.
		* @throws IllegalStateError if the classes are not assignable
		* @example
		* Assert.isAssignable(Number, myClass, "Number expected");
		* Assert.isAssignable(Number, myClass, () => "Processing " + myAttributeName + ":");
		*/
		static isAssignable(superType, subType, message) {
			this.notNull(superType, "Supertype to check against must not be null");
			if (subType === void 0 || !(0, class_util_1.getSuperClasses)(subType).includes(superType)) this.assignableCheckFailed(superType, subType, this.resolveMessage(message));
		}
		static instanceCheckFailed(type, obj, msg) {
			const className = obj !== void 0 ? obj.constructor.name : "undefined";
			let result = "";
			let defaultMessage = true;
			if (msg && msg.length > 0) if (this.endsWithSeparator(msg)) result = msg + " ";
			else {
				result = this.messageWithTypeName(msg, className);
				defaultMessage = false;
			}
			if (defaultMessage) result = result + `Object of class [${className}] must be an instance of ${type}`;
			throw new illegal_state_error_1.IllegalStateError(result);
		}
		static assignableCheckFailed(superType, subType, msg) {
			let result = "";
			let defaultMessage = true;
			if (msg && msg.length > 0) if (this.endsWithSeparator(msg)) result = msg + " ";
			else {
				result = this.messageWithTypeName(msg, subType);
				defaultMessage = false;
			}
			if (defaultMessage) result = result + `${subType} is not assignable to ${superType}`;
			throw new illegal_state_error_1.IllegalStateError(result);
		}
		static endsWithSeparator(msg) {
			return msg.endsWith(":") || msg.endsWith(";") || msg.endsWith(",") || msg.endsWith(".");
		}
		static messageWithTypeName(msg, typeName) {
			return msg + (msg.endsWith(" ") ? "" : ": ") + ("name" in typeName) ? typeName.name : typeName;
		}
		static resolveMessage(message) {
			return typeof message === "function" ? message() : message;
		}
	};
	exports.Assert = Assert;
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/utils/mime-type.js
var require_mime_type = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	var _a;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.MimeType = void 0;
	var assert_1 = require_assert();
	var mime_type_util_1 = require_mime_type_util();
	var MimeType = class {
		constructor(type, subtype = _a.WILDCARD_TYPE, parameters) {
			assert_1.Assert.hasLength(type, "\"type\" must not be empty");
			assert_1.Assert.hasLength(subtype, "\"subtype\" must not be empty");
			this.checkToken(type);
			this.checkToken(subtype);
			this.type = type.toLowerCase();
			this.subtype = subtype.toLowerCase();
			if (parameters) {
				const map = /* @__PURE__ */ new Map();
				for (const [key, value] of Object.entries(parameters)) {
					this.checkParameters(key, value);
					map.set(key.toLowerCase(), value);
				}
				this.parameters = map;
			} else this.parameters = /* @__PURE__ */ new Map();
		}
		checkToken(token) {
			for (let i = 0; i < token.length; i++) {
				const ch = token.charCodeAt(i);
				if (!_a.TOKEN.has(ch)) throw new Error(`Invalid token character "${String.fromCharCode(ch)}" in token "${token}"`);
			}
		}
		checkParameters(parameter, value) {
			assert_1.Assert.hasLength(parameter, "\"parameter\" must not be empty");
			assert_1.Assert.hasLength(value, "\"value\" must not be empty");
			this.checkToken(parameter);
			if (_a.PARAM_CHARSET === parameter) {
				if (!this.charset) this.charset = this.unquote(value);
			} else if (!this.isQuotedString(value)) this.checkToken(value);
		}
		isQuotedString(s) {
			if (s.length < 2) return false;
			else return s.startsWith("\"") && s.endsWith("\"") || s.startsWith("'") && s.endsWith("'");
		}
		unquote(s) {
			return this.isQuotedString(s) ? s.substring(1, s.length - 1) : s;
		}
		isWildcardType() {
			return _a.WILDCARD_TYPE === this.getType();
		}
		isWildcardSubtype() {
			const subtype = this.getSubtype();
			return _a.WILDCARD_TYPE === subtype || subtype.startsWith("*+");
		}
		isConcrete() {
			return !this.isWildcardType() && !this.isWildcardSubtype();
		}
		getType() {
			return this.type;
		}
		getSubtype() {
			return this.subtype;
		}
		getSubtypeSuffix() {
			const suffixIndex = this.subtype.lastIndexOf("+");
			if (suffixIndex !== -1 && this.subtype.length > suffixIndex) return this.subtype.substring(suffixIndex + 1);
		}
		getCharset() {
			return this.charset;
		}
		getParameter(name) {
			return this.parameters.get(name);
		}
		getParameters() {
			return this.parameters;
		}
		includes(other) {
			if (other === void 0) return false;
			if (this.isWildcardType()) return true;
			else if (this.getType() === other.getType()) {
				if (this.getSubtype() === other.getSubtype()) return true;
				if (this.isWildcardSubtype()) {
					const thisPlusIdx = this.getSubtype().lastIndexOf("+");
					if (thisPlusIdx === -1) return true;
					else {
						const otherPlusIdx = other.getSubtype().lastIndexOf("+");
						if (otherPlusIdx !== -1) {
							const thisSubtypeNoSuffix = this.getSubtype().substring(0, thisPlusIdx);
							if (this.getSubtype().substring(thisPlusIdx + 1) === other.getSubtype().substring(otherPlusIdx + 1) && _a.WILDCARD_TYPE === thisSubtypeNoSuffix) return true;
						}
					}
				}
			}
			return false;
		}
		isCompatibleWith(other) {
			if (other === void 0) return false;
			if (this.isWildcardType() || other.isWildcardType()) return true;
			else if (this.getType() === other.getType()) {
				if (this.getSubtype() === other.getSubtype()) return true;
				if (this.isWildcardSubtype() || other.isWildcardSubtype()) {
					const thisSuffix = this.getSubtypeSuffix();
					const otherSuffix = other.getSubtypeSuffix();
					if (this.getSubtype() === _a.WILDCARD_TYPE || other.getSubtype() === _a.WILDCARD_TYPE) return true;
					else if (this.isWildcardSubtype() && thisSuffix !== void 0) return thisSuffix === other.getSubtype() || thisSuffix === otherSuffix;
					else if (other.isWildcardSubtype() && otherSuffix !== void 0) return this.getSubtype() === otherSuffix || otherSuffix === thisSuffix;
				}
			}
			return false;
		}
		equalsTypeAndSubtype(other) {
			if (other === void 0) return false;
			return this.type.toLowerCase() === other.type.toLowerCase() && this.subtype.toLowerCase() === other.subtype.toLowerCase();
		}
		isPresentIn(mimeTypes) {
			for (const mimeType of mimeTypes) if (mimeType.equalsTypeAndSubtype(this)) return true;
			return false;
		}
		equals(other) {
			return this === other || other instanceof _a && this.type.toLowerCase() === other.type.toLowerCase() && this.subtype.toLowerCase() === other.subtype.toLowerCase() && this.parametersAreEqual(other);
		}
		parametersAreEqual(other) {
			if (this.parameters.size !== other.parameters.size) return false;
			for (const [key, value] of this.parameters) {
				if (!other.parameters.has(key)) return false;
				if (_a.PARAM_CHARSET === key) {
					if (this.getCharset() !== other.getCharset()) return false;
				} else if (value !== other.parameters.get(key)) return false;
			}
			return true;
		}
		isMoreSpecific(other) {
			assert_1.Assert.notNull(other, "Other must not be null");
			const thisWildcard = this.isWildcardType();
			const otherWildcard = other.isWildcardType();
			if (thisWildcard && !otherWildcard) return false;
			else if (!thisWildcard && otherWildcard) return true;
			else {
				const thisWildcardSubtype = this.isWildcardSubtype();
				const otherWildcardSubtype = other.isWildcardSubtype();
				if (thisWildcardSubtype && !otherWildcardSubtype) return false;
				else if (!thisWildcardSubtype && otherWildcardSubtype) return true;
				else if (this.getType() === other.getType() && this.getSubtype() === other.getSubtype()) return this.getParameters().size > other.getParameters().size;
				else return false;
			}
		}
		isLessSpecific(other) {
			assert_1.Assert.notNull(other, "Other must not be null");
			return other.isMoreSpecific(this);
		}
		static valueOf(value) {
			return mime_type_util_1.MimeTypeUtils.parseMimeType(value);
		}
		toString() {
			let value = this.toStringValue;
			if (!value) {
				value = this.buildString();
				this.toStringValue = value;
			}
			return value !== null && value !== void 0 ? value : "";
		}
		buildString() {
			let result = "";
			result += this.type;
			result += "/";
			result += this.subtype;
			result += this.buildParameters(this.parameters);
			return result;
		}
		buildParameters(params) {
			let result = "";
			params.forEach((val, key) => {
				result += ";";
				result += key;
				result += "=";
				result += val;
			});
			return result;
		}
	};
	exports.MimeType = MimeType;
	_a = MimeType;
	MimeType.WILDCARD_TYPE = "*";
	MimeType.PARAM_CHARSET = "charset";
	MimeType.TOKEN = /* @__PURE__ */ new Set();
	(() => {
		const ctl = /* @__PURE__ */ new Set();
		for (let i = 0; i <= 31; i++) ctl.add(i);
		ctl.add(127);
		const separators = /* @__PURE__ */ new Set();
		separators.add("(".charCodeAt(0));
		separators.add(")".charCodeAt(0));
		separators.add("<".charCodeAt(0));
		separators.add(">".charCodeAt(0));
		separators.add("@".charCodeAt(0));
		separators.add(",".charCodeAt(0));
		separators.add(";".charCodeAt(0));
		separators.add(":".charCodeAt(0));
		separators.add("\\".charCodeAt(0));
		separators.add("\"".charCodeAt(0));
		separators.add("/".charCodeAt(0));
		separators.add("[".charCodeAt(0));
		separators.add("]".charCodeAt(0));
		separators.add("?".charCodeAt(0));
		separators.add("=".charCodeAt(0));
		separators.add("{".charCodeAt(0));
		separators.add("}".charCodeAt(0));
		separators.add(" ".charCodeAt(0));
		separators.add("	".charCodeAt(0));
		for (let i = 0; i < 128; i++) if (!ctl.has(i) && !separators.has(i)) _a.TOKEN.add(i);
	})();
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/error/error-protocol.js
var require_error_protocol = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/error/illegal-argument-error.js
var require_illegal_argument_error = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.IllegalArgumentError = void 0;
	var custom_error_1 = require_custom_error();
	var IllegalArgumentError = class extends custom_error_1.CustomError {};
	exports.IllegalArgumentError = IllegalArgumentError;
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/error/invalid-mime-type-error.js
var require_invalid_mime_type_error = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.InvalidMimeTypeError = void 0;
	var custom_error_1 = require_custom_error();
	var InvalidMimeTypeError = class extends custom_error_1.CustomError {
		constructor(mimeType, message) {
			super(`Invalid mime type "${mimeType}": ${message}`);
			this.mimeType = mimeType;
		}
	};
	exports.InvalidMimeTypeError = InvalidMimeTypeError;
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/error/index.js
var require_error = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __exportStar = exports && exports.__exportStar || function(m, exports$11) {
		for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$11, p)) __createBinding(exports$11, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	__exportStar(require_error_protocol(), exports);
	__exportStar(require_custom_error(), exports);
	__exportStar(require_illegal_argument_error(), exports);
	__exportStar(require_illegal_state_error(), exports);
	__exportStar(require_invalid_mime_type_error(), exports);
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/utils/mime-type-util.js
var require_mime_type_util = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.MimeTypeUtils = void 0;
	var mime_type_1 = require_mime_type();
	var error_1 = require_error();
	var MimeTypeUtils = class {
		static parseMimeType(mimeType) {
			if (!mimeType) throw new error_1.InvalidMimeTypeError(mimeType, "\"mimeType\" must not be empty");
			if (mimeType.startsWith("multipart")) return this.parseMimeTypeInternal(mimeType);
			if (!this.cachedMimeTypes.has(mimeType)) this.cachedMimeTypes.set(mimeType, this.parseMimeTypeInternal(mimeType));
			return this.cachedMimeTypes.get(mimeType);
		}
		static parseMimeTypeInternal(mimeType) {
			let index = mimeType.indexOf(";");
			let fullType = (index >= 0 ? mimeType.substring(0, index) : mimeType).trim();
			if (fullType.length === 0) throw new error_1.InvalidMimeTypeError(mimeType, "\"mimeType\" must not be empty");
			if (fullType === "*") fullType = "*/*";
			const subIndex = fullType.indexOf("/");
			if (subIndex === -1) throw new error_1.InvalidMimeTypeError(mimeType, "does not contain \"/\"");
			if (subIndex === fullType.length - 1) throw new error_1.InvalidMimeTypeError(mimeType, "does not contain subtype after \"/\"");
			const type = fullType.substring(0, subIndex);
			const subtype = fullType.substring(subIndex + 1);
			if (type === "*" && subtype !== "*") throw new error_1.InvalidMimeTypeError(mimeType, "wildcard type is legal only in \"*/*\" (all mime types)");
			let parameters = void 0;
			do {
				let nextIndex = index + 1;
				let quoted = false;
				while (nextIndex < mimeType.length) {
					const ch = mimeType.charAt(nextIndex);
					if (ch === ";") {
						if (!quoted) break;
					} else if (ch === "\"") quoted = !quoted;
					nextIndex++;
				}
				const parameter = mimeType.substring(index + 1, nextIndex).trim();
				if (parameter.length > 0) {
					if (parameters === void 0) parameters = /* @__PURE__ */ new Map();
					const eqIndex = parameter.indexOf("=");
					if (eqIndex >= 0) {
						const attribute = parameter.substring(0, eqIndex).trim();
						const value = parameter.substring(eqIndex + 1).trim();
						parameters.set(attribute, value);
					}
				}
				index = nextIndex;
			} while (index < mimeType.length);
			try {
				return new mime_type_1.MimeType(type, subtype, parameters);
			} catch (ex) {
				throw new error_1.InvalidMimeTypeError(mimeType, ex.message);
			}
		}
		static parseMimeTypes(mimeTypes) {
			if (!mimeTypes) return [];
			return this.tokenize(mimeTypes).filter((mimeType) => !!mimeType).map(this.parseMimeType);
		}
		static tokenize(mimeTypes) {
			if (!mimeTypes) return [];
			const tokens = [];
			let inQuotes = false;
			let startIndex = 0;
			let i = 0;
			while (i < mimeTypes.length) {
				switch (mimeTypes.charAt(i)) {
					case "\"":
						inQuotes = !inQuotes;
						break;
					case ",":
						if (!inQuotes) {
							tokens.push(mimeTypes.substring(startIndex, i));
							startIndex = i + 1;
						}
						break;
					case "\\":
						i++;
						break;
				}
				i++;
			}
			tokens.push(mimeTypes.substring(startIndex));
			return tokens;
		}
		static toString(mimeTypes) {
			return mimeTypes.map((mimeType) => mimeType.toString()).join(", ");
		}
		static sortBySpecificity(mimeTypes) {
			if (mimeTypes.length > 50) throw new error_1.InvalidMimeTypeError(mimeTypes.toString(), "Too many elements");
			this.bubbleSort(mimeTypes, (a, b) => a.isLessSpecific(b));
		}
		static bubbleSort(list, swap) {
			const len = list.length;
			for (let i = 0; i < len; i++) for (let j = 1; j < len - i; j++) {
				const prev = list[j - 1];
				const cur = list[j];
				if (swap(prev, cur)) {
					list[j] = prev;
					list[j - 1] = cur;
				}
			}
		}
		static generateMultipartBoundary() {
			const boundary = new Uint8Array(Math.floor(Math.random() * 11) + 30);
			for (let i = 0; i < boundary.length; i++) boundary[i] = this.BOUNDARY_CHARS[Math.floor(Math.random() * this.BOUNDARY_CHARS.length)].charCodeAt(0);
			return boundary;
		}
		static generateMultipartBoundaryString() {
			return new TextDecoder("ascii").decode(this.generateMultipartBoundary());
		}
	};
	exports.MimeTypeUtils = MimeTypeUtils;
	MimeTypeUtils.BOUNDARY_CHARS = [
		"-",
		"_",
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		"0",
		"a",
		"b",
		"c",
		"d",
		"e",
		"f",
		"g",
		"h",
		"i",
		"j",
		"k",
		"l",
		"m",
		"n",
		"o",
		"p",
		"q",
		"r",
		"s",
		"t",
		"u",
		"v",
		"w",
		"x",
		"y",
		"z",
		"A",
		"B",
		"C",
		"D",
		"E",
		"F",
		"G",
		"H",
		"I",
		"J",
		"K",
		"L",
		"M",
		"N",
		"O",
		"P",
		"Q",
		"R",
		"S",
		"T",
		"U",
		"V",
		"W",
		"X",
		"Y",
		"Z"
	];
	MimeTypeUtils.ALL = new mime_type_1.MimeType("*", "*");
	MimeTypeUtils.ALL_VALUE = "*/*";
	MimeTypeUtils.APPLICATION_GRAPHQL = new mime_type_1.MimeType("application", "graphql+json");
	MimeTypeUtils.APPLICATION_GRAPHQL_VALUE = "application/graphql+json";
	MimeTypeUtils.APPLICATION_JSON = new mime_type_1.MimeType("application", "json");
	MimeTypeUtils.APPLICATION_JSON_VALUE = "application/json";
	MimeTypeUtils.APPLICATION_OCTET_STREAM = new mime_type_1.MimeType("application", "octet-stream");
	MimeTypeUtils.APPLICATION_OCTET_STREAM_VALUE = "application/octet-stream";
	MimeTypeUtils.APPLICATION_XML = new mime_type_1.MimeType("application", "xml");
	MimeTypeUtils.APPLICATION_XML_VALUE = "application/xml";
	MimeTypeUtils.IMAGE_GIF = new mime_type_1.MimeType("image", "gif");
	MimeTypeUtils.IMAGE_GIF_VALUE = "image/gif";
	MimeTypeUtils.IMAGE_JPEG = new mime_type_1.MimeType("image", "jpeg");
	MimeTypeUtils.IMAGE_JPEG_VALUE = "image/jpeg";
	MimeTypeUtils.IMAGE_PNG = new mime_type_1.MimeType("image", "png");
	MimeTypeUtils.IMAGE_PNG_VALUE = "image/png";
	MimeTypeUtils.TEXT_HTML = new mime_type_1.MimeType("text", "html");
	MimeTypeUtils.TEXT_HTML_VALUE = "text/html";
	MimeTypeUtils.TEXT_PLAIN = new mime_type_1.MimeType("text", "plain");
	MimeTypeUtils.TEXT_PLAIN_VALUE = "text/plain";
	MimeTypeUtils.TEXT_XML = new mime_type_1.MimeType("text", "xml");
	MimeTypeUtils.TEXT_XML_VALUE = "text/xml";
	MimeTypeUtils.cachedMimeTypes = /* @__PURE__ */ new Map();
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/utils/byte-util.js
var require_byte_util = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ByteUtil = void 0;
	var error_1 = require_error();
	/**
	* Byte utility class.
	*/
	var ByteUtil = class {
		static isNode() {
			return typeof Buffer !== "undefined";
		}
		static isBrowser() {
			return typeof TextDecoder !== "undefined";
		}
		static decode(bytes) {
			if (!bytes) return "";
			if (typeof bytes === "string") return bytes;
			if (this.isNode()) {
				if (bytes instanceof Buffer || bytes instanceof Uint8Array) return Buffer.from(bytes).toString("utf8");
				throw new error_1.IllegalArgumentError(`Unexpected type ${bytes.constructor.name} in Node environment.`);
			}
			if (this.isBrowser()) {
				if (bytes instanceof Uint8Array || bytes instanceof ArrayBuffer) return new TextDecoder("utf8").decode(bytes);
				throw new error_1.IllegalArgumentError(`Unexpected type ${bytes.constructor.name} in Browser environment.`);
			}
			throw new error_1.IllegalArgumentError("Neither Buffer nor TextDecoder are available.");
		}
		static encodeBase64(bytes) {
			if (!bytes) return "";
			if (this.isNode()) {
				if (typeof bytes === "string") return Buffer.from(bytes, "utf8").toString("base64");
				if (bytes instanceof Buffer || bytes instanceof Uint8Array) return Buffer.from(bytes).toString("base64");
				throw new error_1.IllegalArgumentError(`Unexpected type ${bytes.constructor.name} in Node environment.`);
			}
			if (this.isBrowser()) {
				if (typeof bytes === "string") return btoa(new TextEncoder().encode(bytes).reduce((data, byte) => data + String.fromCharCode(byte), ""));
				if (bytes instanceof Uint8Array || bytes instanceof ArrayBuffer) return btoa(String.fromCharCode(...new Uint8Array(bytes)));
				throw new error_1.IllegalArgumentError(`Unexpected type ${bytes.constructor.name} in Browser environment.`);
			}
			throw new error_1.IllegalArgumentError("Neither Buffer nor TextEncoder are available.");
		}
		static decodeBase64(base64) {
			if (!base64) return new Uint8Array();
			if (this.isNode()) return Buffer.from(base64, "base64");
			if (this.isBrowser()) {
				const binary = atob(base64);
				const bytes = new Uint8Array(binary.length);
				for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
				return bytes;
			}
			throw new error_1.IllegalArgumentError("Neither Buffer nor TextEncoder are available.");
		}
	};
	exports.ByteUtil = ByteUtil;
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/utils/error-util.js
var require_error_util = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ErrorUtil = void 0;
	var ErrorUtil = class {
		/**
		* Fix the prototype chain of the error
		*
		* Use Object.setPrototypeOf
		* Support ES6 environments
		*
		* Fallback setting __proto__
		* Support IE11+, see https://docs.microsoft.com/en-us/scripting/javascript/reference/javascript-version-information
		*/
		static fixProto(target, prototype) {
			const setPrototypeOf = Object.setPrototypeOf;
			if (setPrototypeOf) setPrototypeOf(target, prototype);
			else target.__proto__ = prototype;
		}
		/**
		* Capture and fix the error stack when available
		*
		* Use Error.captureStackTrace
		* Support v8 environments
		*/
		static fixStack(target, fn = target.constructor) {
			const captureStackTrace = Error.captureStackTrace;
			if (captureStackTrace) captureStackTrace(target, fn);
		}
	};
	exports.ErrorUtil = ErrorUtil;
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/utils/index.js
var require_utils = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __exportStar = exports && exports.__exportStar || function(m, exports$10) {
		for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$10, p)) __createBinding(exports$10, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	__exportStar(require_prioritizeable(), exports);
	__exportStar(require_promise_util(), exports);
	__exportStar(require_types(), exports);
	__exportStar(require_class_util(), exports);
	__exportStar(require_metadata_util(), exports);
	__exportStar(require_disposable(), exports);
	__exportStar(require_os(), exports);
	__exportStar(require_proxy_util(), exports);
	__exportStar(require_annotation_util(), exports);
	__exportStar(require_cancellation(), exports);
	__exportStar(require_event(), exports);
	__exportStar(require_emitter(), exports);
	__exportStar(require_global_util(), exports);
	__exportStar(require_async(), exports);
	__exportStar(require_url_util(), exports);
	__exportStar(require_uuid(), exports);
	__exportStar(require_assert(), exports);
	__exportStar(require_mime_type_util(), exports);
	__exportStar(require_mime_type(), exports);
	__exportStar(require_byte_util(), exports);
	__exportStar(require_error_util(), exports);
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/container/container-provider.js
var require_container_provider = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ContainerProvider = void 0;
	var utils_1 = require_utils();
	var _container;
	var _containerDeferred = new utils_1.Deferred();
	var ContainerProvider;
	(function(ContainerProvider) {
		function set(container) {
			_container = container;
			_containerDeferred.resolve(container);
		}
		ContainerProvider.set = set;
		function provide() {
			if (!_container) throw new Error("Container is not ready yet, the timing is incorrect.");
			return _container;
		}
		ContainerProvider.provide = provide;
		function asyncProvide() {
			return _containerDeferred.promise;
		}
		ContainerProvider.asyncProvide = asyncProvide;
	})(ContainerProvider || (exports.ContainerProvider = ContainerProvider = {}));
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/constants.js
var require_constants = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.TENANT_ENABLED = exports.METADATA_KEY = void 0;
	exports.METADATA_KEY = {
		constantValue: "cell:constant-value",
		component: "cell:component"
	};
	exports.TENANT_ENABLED = "cell.tenant.enabled";
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/config/config-protocol.js
var require_config_protocol = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ConfigProvider = void 0;
	exports.ConfigProvider = Symbol("ConfigProvider");
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/config/dynamic-config.js
var require_dynamic_config = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.config = void 0;
	exports.config = {};
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/config/config-util.js
var require_config_util = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ConfigUtil = void 0;
	var config_protocol_1 = require_config_protocol();
	var container_1 = require_container();
	var dynamic_config_1 = require_dynamic_config();
	var utils_1 = require_utils();
	var ConfigUtil;
	(function(ConfigUtil) {
		function get(key, defaultValue) {
			return container_1.ContainerUtil.get(config_protocol_1.ConfigProvider).get(key, defaultValue);
		}
		ConfigUtil.get = get;
		function getRaw() {
			return utils_1.currentThis.cellProps || dynamic_config_1.config;
		}
		ConfigUtil.getRaw = getRaw;
	})(ConfigUtil || (exports.ConfigUtil = ConfigUtil = {}));
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/aop/aop-protocol.js
var require_aop_protocol = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.MethodMatcher = exports.ClassFilter = exports.AopProxyFactory = exports.AfterThrowsAdvice = exports.AfterReturningAdvice = exports.MethodBeforeAdvice = exports.AOP_TAG = void 0;
	exports.AOP_TAG = "AOP_TAG";
	exports.MethodBeforeAdvice = Symbol("MethodBeforeAdvice");
	exports.AfterReturningAdvice = Symbol("AfterReturningAdvice");
	exports.AfterThrowsAdvice = Symbol("AfterThrowsAdvice");
	exports.AopProxyFactory = Symbol("AopProxyFactory");
	exports.ClassFilter = Symbol("ClassFilter");
	exports.MethodMatcher = Symbol("MethodMatcher");
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/container/container-util.js
var require_container_util = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ContainerUtil = void 0;
	var container_provider_1 = require_container_provider();
	var ContainerUtil;
	(function(ContainerUtil) {
		function get(serviceIdentifier) {
			return container_provider_1.ContainerProvider.provide().get(serviceIdentifier);
		}
		ContainerUtil.get = get;
		function getAll(serviceIdentifier) {
			return container_provider_1.ContainerProvider.provide().getAll(serviceIdentifier);
		}
		ContainerUtil.getAll = getAll;
		function getAllNamed(serviceIdentifier, named) {
			return container_provider_1.ContainerProvider.provide().getAllNamed(serviceIdentifier, named);
		}
		ContainerUtil.getAllNamed = getAllNamed;
		function getNamed(serviceIdentifier, named) {
			return container_provider_1.ContainerProvider.provide().getNamed(serviceIdentifier, named);
		}
		ContainerUtil.getNamed = getNamed;
		function getAllTagged(serviceIdentifier, key, value) {
			return container_provider_1.ContainerProvider.provide().getAllTagged(serviceIdentifier, key, value);
		}
		ContainerUtil.getAllTagged = getAllTagged;
		function getTagged(serviceIdentifier, key, value) {
			return container_provider_1.ContainerProvider.provide().getTagged(serviceIdentifier, key, value);
		}
		ContainerUtil.getTagged = getTagged;
	})(ContainerUtil || (exports.ContainerUtil = ContainerUtil = {}));
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/container/scope.js
var require_scope = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Scope = void 0;
	var Scope;
	(function(Scope) {
		Scope[Scope["Request"] = 0] = "Request";
		Scope[Scope["Singleton"] = 1] = "Singleton";
		Scope[Scope["Transient"] = 2] = "Transient";
	})(Scope || (exports.Scope = Scope = {}));
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/container/auto-bind.js
var require_auto_bind = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.manualBind = manualBind;
	exports.autoBind = autoBind;
	var inversify_1 = require_common$1.require_inversify();
	var constants_1 = require_constants();
	var config_util_1 = require_config_util();
	var aop_protocol_1 = require_aop_protocol();
	var container_util_1 = require_container_util();
	var scope_1 = require_scope();
	function manualBind(registry) {
		return new inversify_1.ContainerModule((bind, unbind, isBound, rebind, ...rest) => {
			if (registry) registry(bind, unbind, isBound, rebind, ...rest);
		});
	}
	function autoBind(registry) {
		const metadatas = Reflect.getMetadata(constants_1.METADATA_KEY.component, Reflect) || [];
		const constantMetadata = Reflect.getMetadata(constants_1.METADATA_KEY.constantValue, Reflect) || [];
		Reflect.defineMetadata(constants_1.METADATA_KEY.component, [], Reflect);
		Reflect.defineMetadata(constants_1.METADATA_KEY.constantValue, [], Reflect);
		return new inversify_1.ContainerModule((bind, unbind, isBound, rebind, ...rest) => {
			for (let index = metadatas.length - 1; index >= 0; index--) {
				const metadata = metadatas[index];
				resolve(metadata, bind, rebind);
			}
			constantMetadata.map((metadata) => resolveConstant(metadata, bind, rebind));
			if (registry) registry(bind, unbind, isBound, rebind, ...rest);
		});
	}
	function doProxyIfNeed(metadata, target) {
		var _a, _b;
		if (((_b = (_a = config_util_1.ConfigUtil.getRaw().cell) === null || _a === void 0 ? void 0 : _a.aop) === null || _b === void 0 ? void 0 : _b.enabled) && metadata.proxy) {
			const classFilter = container_util_1.ContainerUtil.get(aop_protocol_1.ClassFilter);
			if (target.constructor && classFilter.matches(target.constructor, metadata)) return container_util_1.ContainerUtil.get(aop_protocol_1.AopProxyFactory).create({
				target,
				metadata
			}).getProxy();
		}
		return target;
	}
	function resolve(metadata, bind, rebind) {
		let mid;
		const { ids, scope, name, tag, when, proxy, onActivation, target } = metadata;
		const _ids = [...ids];
		const id = _ids.shift();
		if (metadata.rebind) mid = rebind(_ids.shift() || id).to(target);
		else mid = bind(id).to(target);
		if (scope === scope_1.Scope.Singleton) mid = mid.inSingletonScope();
		else if (scope === scope_1.Scope.Transient) mid = mid.inTransientScope();
		if (name) mid = mid.whenTargetNamed(name);
		else if (tag) mid = mid.whenTargetTagged(tag.tag, tag.value);
		else if (metadata.default) mid = mid.whenTargetIsDefault();
		else if (when) mid = mid.when(when);
		if (onActivation) mid.onActivation(onActivation);
		else if (proxy) mid.onActivation((context, t) => doProxyIfNeed(metadata, t));
		for (const item of _ids) bind(item).toService(id);
	}
	function resolveConstant(metadata, bind, rebind) {
		const ids = Array.isArray(metadata.id) ? [...metadata.id] : [metadata.id];
		const id = ids.shift();
		if (metadata.rebind) rebind(id).toConstantValue(metadata.constantValue);
		else bind(id).toConstantValue(metadata.constantValue);
		for (const item of ids) bind(item).toService(id);
	}
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/container/container-factory.js
var require_container_factory = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ContainerFactory = void 0;
	var inversify_1 = require_common$1.require_inversify();
	var ContainerFactory = class {
		static create(...modules) {
			const container = new inversify_1.Container({ skipBaseClassChecks: true });
			container.load(...modules);
			return container;
		}
	};
	exports.ContainerFactory = ContainerFactory;
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/container/index.js
var require_container = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __exportStar = exports && exports.__exportStar || function(m, exports$9) {
		for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$9, p)) __createBinding(exports$9, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	__exportStar(require_container_provider(), exports);
	__exportStar(require_auto_bind(), exports);
	__exportStar(require_container_util(), exports);
	__exportStar(require_scope(), exports);
	__exportStar(require_container_factory(), exports);
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/annotation/autowired.js
var require_autowired = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Autowired = void 0;
	exports.parseAutowiredOption = parseAutowiredOption;
	exports.applyAutowiredDecorator = applyAutowiredDecorator;
	exports.createAutowiredProperty = createAutowiredProperty;
	var inversify_1 = require_common$1.require_inversify();
	var container_1 = require_container();
	var utils_1 = require_utils();
	var Autowired = function(idOrOption) {
		return (target, targetKey, index) => {
			applyAutowiredDecorator(parseAutowiredOption(target, targetKey, index, idOrOption), target, targetKey, index);
		};
	};
	exports.Autowired = Autowired;
	var defaultAutowiredOption = {
		multi: false,
		detached: false
	};
	function parseAutowiredOption(target, targetKey, index, idOrOption) {
		const option = utils_1.AnnotationUtil.getValueOrOption(idOrOption);
		const type = utils_1.AnnotationUtil.getType(target, targetKey, index);
		if (type === Array) option.multi = true;
		option.id = option.id || type;
		return {
			...defaultAutowiredOption,
			...option
		};
	}
	function applyAutowiredDecorator(option, target, targetKey, index, doInject = ({ id, multi }, t, k, i) => multi ? (0, inversify_1.multiInject)(id)(t, k, i) : (0, inversify_1.inject)(id)(t, k, i), doGetValue = ({ id, multi }, t, property) => multi ? container_1.ContainerUtil.getAll(id) : container_1.ContainerUtil.get(id)) {
		if (option.detached) {
			if (index !== void 0) throw new Error(`The ${target.constructor.name} itself is not injected into the container, so the parameter injection of the constructor is not supported.`);
			createAutowiredProperty(option, doGetValue, target, targetKey);
		} else doInject(option, target, targetKey, index);
		return option;
	}
	function createAutowiredProperty(option, doGetValue, target, property) {
		let value;
		Object.defineProperty(target, property, {
			enumerable: true,
			get() {
				if (value !== void 0) return value;
				value = doGetValue(option, target, property);
				return value;
			}
		});
	}
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/annotation/component.js
var require_component = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	var _a, _b;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Component = exports.COMPONENT_TAG = void 0;
	exports.parseComponentOption = parseComponentOption;
	exports.applyComponentDecorator = applyComponentDecorator;
	var inversify_1 = require_common$1.require_inversify();
	var constants_1 = require_constants();
	var config_util_1 = require_config_util();
	var utils_1 = require_utils();
	var scope_1 = require_scope();
	exports.COMPONENT_TAG = "Component";
	exports.Component = function(...idOrOption) {
		return (t) => {
			applyComponentDecorator(parseComponentOption(t, idOrOption), t);
		};
	};
	var defaultComponentOption = {
		scope: scope_1.Scope.Singleton,
		rebind: false,
		proxy: false,
		...(_b = (_a = config_util_1.ConfigUtil.getRaw().cell) === null || _a === void 0 ? void 0 : _a.annotation) === null || _b === void 0 ? void 0 : _b.Component
	};
	function parseComponentOption(target, idOrOption) {
		if (Array.isArray(idOrOption)) {
			if (idOrOption.length === 1) idOrOption = idOrOption[0];
			else if (idOrOption.length === 0) idOrOption = void 0;
		}
		const option = utils_1.AnnotationUtil.getValueOrOption(idOrOption);
		const parsed = {
			...defaultComponentOption,
			...option
		};
		let ids;
		if (Array.isArray(parsed.id)) ids = Array.from(new Set([target, ...parsed.id]));
		else if (parsed.id && parsed.id !== target) ids = [target, parsed.id];
		else ids = [target];
		parsed.id = ids;
		parsed.sysTags = [...new Set([exports.COMPONENT_TAG, ...parsed.sysTags || []])];
		return parsed;
	}
	function applyComponentDecorator(option, target) {
		if (!Reflect.hasOwnMetadata(inversify_1.METADATA_KEY.PARAM_TYPES, target)) (0, inversify_1.decorate)((0, inversify_1.injectable)(), target);
		const metadata = {
			target,
			ids: Array.isArray(option.id) ? option.id : [option.id || target],
			sysTags: option.sysTags,
			rebind: option.rebind,
			proxy: option.proxy,
			scope: option.scope,
			name: option.name,
			tag: option.tag,
			default: option.default,
			when: option.when,
			onActivation: option.onActivation
		};
		let metadatas = Reflect.getMetadata(constants_1.METADATA_KEY.component, Reflect);
		if (!metadatas) {
			metadatas = [];
			Reflect.defineMetadata(constants_1.METADATA_KEY.component, metadatas, Reflect);
		}
		metadatas.push(metadata);
		return metadata;
	}
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/annotation/value.js
var require_value = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Value = exports.VALUE = void 0;
	exports.parseValueOption = parseValueOption;
	exports.applyValueDecorator = applyValueDecorator;
	exports.createValueProperty = createValueProperty;
	exports.bindValue = bindValue;
	var inversify_1 = require_common$1.require_inversify();
	var config_util_1 = require_config_util();
	var utils_1 = require_utils();
	var config_protocol_1 = require_config_protocol();
	exports.VALUE = Symbol("Value");
	var Value = function(elOrOption) {
		return (target, targetKey, index) => {
			applyValueDecorator(parseValueOption(target, targetKey, index, elOrOption), target, targetKey, index);
		};
	};
	exports.Value = Value;
	var defaultValueOption = { detached: false };
	function parseValueOption(target, targetKey, index, elOrOption) {
		const option = utils_1.AnnotationUtil.getValueOrOption(elOrOption, "el");
		option.el = option.el || targetKey;
		return {
			...defaultValueOption,
			...option
		};
	}
	function applyValueDecorator(option, target, targetKey, index) {
		if (option.detached) {
			if (index !== void 0) throw new Error(`The ${target.constructor.name} itself is not injected into the container, so the parameter injection of the constructor is not supported.`);
			createValueProperty(option, target, targetKey);
			return;
		}
		const el = option.el;
		(0, inversify_1.inject)(exports.VALUE)(target, targetKey, index);
		(0, inversify_1.named)(el)(target, targetKey, index);
		return option;
	}
	function createValueProperty(option, target, property) {
		Object.defineProperty(target, property, {
			enumerable: true,
			get() {
				const el = option.el;
				return config_util_1.ConfigUtil.get(el);
			}
		});
	}
	function bindValue(bind) {
		bind(exports.VALUE).toDynamicValue((ctx) => {
			const el = ctx.currentRequest.target.getNamedTag().value.toString();
			return ctx.container.get(config_protocol_1.ConfigProvider).get(el);
		});
	}
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/annotation/optional.js
var require_optional = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Optional = void 0;
	var inversify_1 = require_common$1.require_inversify();
	Object.defineProperty(exports, "Optional", {
		enumerable: true,
		get: function() {
			return inversify_1.optional;
		}
	});
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/annotation/constant.js
var require_constant = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Constant = void 0;
	exports.applyConstantDecorator = applyConstantDecorator;
	var constants_1 = require_constants();
	var Constant = function(id, constantValue, rebind = false) {
		return (t) => {
			applyConstantDecorator({
				id,
				constantValue,
				rebind
			}, t);
		};
	};
	exports.Constant = Constant;
	function applyConstantDecorator(option, target) {
		const previousMetadata = Reflect.getMetadata(constants_1.METADATA_KEY.constantValue, Reflect) || [];
		const newMetadata = [option].concat(previousMetadata);
		Reflect.defineMetadata(constants_1.METADATA_KEY.constantValue, newMetadata, Reflect);
	}
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/annotation/named.js
var require_named = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Named = void 0;
	var inversify_1 = require_common$1.require_inversify();
	Object.defineProperty(exports, "Named", {
		enumerable: true,
		get: function() {
			return inversify_1.named;
		}
	});
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/annotation/tagged.js
var require_tagged = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Tagged = void 0;
	var inversify_1 = require_common$1.require_inversify();
	Object.defineProperty(exports, "Tagged", {
		enumerable: true,
		get: function() {
			return inversify_1.tagged;
		}
	});
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/annotation/post-construct.js
var require_post_construct = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.PostConstruct = void 0;
	var inversify_1 = require_common$1.require_inversify();
	Object.defineProperty(exports, "PostConstruct", {
		enumerable: true,
		get: function() {
			return inversify_1.postConstruct;
		}
	});
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/annotation/pre-destroy.js
var require_pre_destroy = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.PreDestroy = void 0;
	var inversify_1 = require_common$1.require_inversify();
	Object.defineProperty(exports, "PreDestroy", {
		enumerable: true,
		get: function() {
			return inversify_1.preDestroy;
		}
	});
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/annotation/target-name.js
var require_target_name = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.TargetName = void 0;
	var inversify_1 = require_common$1.require_inversify();
	Object.defineProperty(exports, "TargetName", {
		enumerable: true,
		get: function() {
			return inversify_1.targetName;
		}
	});
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/annotation/injectable.js
var require_injectable = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Injectable = void 0;
	var inversify_1 = require_common$1.require_inversify();
	Object.defineProperty(exports, "Injectable", {
		enumerable: true,
		get: function() {
			return inversify_1.injectable;
		}
	});
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/annotation/inject.js
var require_inject = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Inject = void 0;
	var inversify_1 = require_common$1.require_inversify();
	Object.defineProperty(exports, "Inject", {
		enumerable: true,
		get: function() {
			return inversify_1.inject;
		}
	});
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/annotation/aspect.js
var require_aspect = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Aspect = void 0;
	var aop_protocol_1 = require_aop_protocol();
	var component_1 = require_component();
	var Aspect = (adviceOrAspectOption) => (target) => {
		const option = (0, component_1.parseComponentOption)(target, adviceOrAspectOption);
		option.id = Array.isArray(option.id) ? option.id[1] : option.id;
		option.pointcut = option.pointcut || component_1.COMPONENT_TAG;
		option.tag = {
			tag: aop_protocol_1.AOP_TAG,
			value: option.pointcut
		};
		(0, component_1.applyComponentDecorator)({
			proxy: false,
			...option
		}, target);
	};
	exports.Aspect = Aspect;
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/annotation/service.js
var require_service = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Service = exports.SERVICE_TAG = void 0;
	exports.applyServiceDecorator = applyServiceDecorator;
	var component_1 = require_component();
	exports.SERVICE_TAG = "Service";
	exports.Service = function(...idOrOption) {
		return (t) => {
			applyServiceDecorator((0, component_1.parseComponentOption)(t, idOrOption), t);
		};
	};
	function applyServiceDecorator(option, target) {
		var _a;
		option.sysTags = ((_a = option.sysTags) === null || _a === void 0 ? void 0 : _a.indexOf(exports.SERVICE_TAG)) ? option.sysTags : [exports.SERVICE_TAG, ...option.sysTags || []];
		return (0, component_1.applyComponentDecorator)(option, target);
	}
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/annotation/unmanaged.js
var require_unmanaged = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Unmanaged = void 0;
	var inversify_1 = require_common$1.require_inversify();
	Object.defineProperty(exports, "Unmanaged", {
		enumerable: true,
		get: function() {
			return inversify_1.unmanaged;
		}
	});
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/annotation/decorate.js
var require_decorate = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.decorate = void 0;
	var inversify_1 = require_common$1.require_inversify();
	Object.defineProperty(exports, "decorate", {
		enumerable: true,
		get: function() {
			return inversify_1.decorate;
		}
	});
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/provider/provider-protocol.js
var require_provider_protocol = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ComponentFilterContribution = exports.ComponentFilterRegistry = exports.ComponentFilter = exports.ProviderCreator = void 0;
	exports.ProviderCreator = Symbol("ProviderCreator");
	exports.ComponentFilter = Symbol("ComponentFilter");
	exports.ComponentFilterRegistry = Symbol("ComponentFilterRegistry");
	exports.ComponentFilterContribution = Symbol("ComponentFilterContribution");
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/annotation/autowired-provider.js
var require_autowired_provider = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.doInjectForAutowiredProvider = exports.AutowiredProvider = exports.ID_KEY = exports.PROVIDER = void 0;
	exports.bindAutowiredProvider = bindAutowiredProvider;
	var autowired_1 = require_autowired();
	var inject_1 = require_inject();
	var tagged_1 = require_tagged();
	var provider_protocol_1 = require_provider_protocol();
	exports.PROVIDER = Symbol("PROVIDER");
	exports.ID_KEY = Symbol("ID_KEY");
	var AutowiredProvider = function(idOrOption) {
		return (target, targetKey, index) => {
			const option = (0, autowired_1.parseAutowiredOption)(target, targetKey, index, idOrOption);
			(0, autowired_1.applyAutowiredDecorator)(option, target, targetKey, index, exports.doInjectForAutowiredProvider);
		};
	};
	exports.AutowiredProvider = AutowiredProvider;
	var doInjectForAutowiredProvider = (option, t, k, i) => {
		(0, inject_1.Inject)(exports.PROVIDER)(t, k, i);
		(0, tagged_1.Tagged)(exports.ID_KEY, option.id)(t, k, i);
	};
	exports.doInjectForAutowiredProvider = doInjectForAutowiredProvider;
	function bindAutowiredProvider(bind) {
		bind(exports.PROVIDER).toDynamicValue((ctx) => {
			var _a;
			const id = (_a = ctx.currentRequest.target.getCustomTags()) === null || _a === void 0 ? void 0 : _a.find((m) => m.key === exports.ID_KEY).value;
			return ctx.container.get(provider_protocol_1.ProviderCreator).create(id, ctx.container);
		});
	}
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/annotation/index.js
var require_annotation = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __exportStar = exports && exports.__exportStar || function(m, exports$8) {
		for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$8, p)) __createBinding(exports$8, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	__exportStar(require_autowired(), exports);
	__exportStar(require_component(), exports);
	__exportStar(require_value(), exports);
	__exportStar(require_optional(), exports);
	__exportStar(require_constant(), exports);
	__exportStar(require_named(), exports);
	__exportStar(require_tagged(), exports);
	__exportStar(require_post_construct(), exports);
	__exportStar(require_pre_destroy(), exports);
	__exportStar(require_target_name(), exports);
	__exportStar(require_injectable(), exports);
	__exportStar(require_inject(), exports);
	__exportStar(require_aspect(), exports);
	__exportStar(require_service(), exports);
	__exportStar(require_unmanaged(), exports);
	__exportStar(require_decorate(), exports);
	__exportStar(require_autowired_provider(), exports);
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/logger/logger-protocol.js
var require_logger_protocol = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.onLogEmitter = exports.LoggerService = exports.TraceIdProvider = exports.Logger = exports.LOGGER_LEVEL = exports.LOGGER_CONFIG = void 0;
	var utils_1 = require_utils();
	exports.LOGGER_CONFIG = "cell.logger";
	exports.LOGGER_LEVEL = `${exports.LOGGER_CONFIG}.level`;
	exports.Logger = Symbol("Logger");
	exports.TraceIdProvider = Symbol("TraceIdProvider");
	exports.LoggerService = Symbol("LoggerService");
	exports.onLogEmitter = new utils_1.Emitter();
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/application/application-protocol.js
var require_application_protocol = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
		var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
		if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
		else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
		return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = exports && exports.__metadata || function(k, v) {
		if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.AbstractApplicationStateService = exports.AbstractApplication = exports.ApplicationProps = exports.ApplicationStateService = exports.Application = exports.ApplicationLifecycle = void 0;
	var promise_util_1 = require_promise_util();
	var emitter_1 = require_emitter();
	var logger_protocol_1 = require_logger_protocol();
	var annotation_1 = require_annotation();
	exports.ApplicationLifecycle = Symbol("ApplicationLifecycle");
	exports.Application = Symbol("Application");
	exports.ApplicationStateService = Symbol("ApplicationStateService");
	exports.ApplicationProps = Symbol("ApplicationProps");
	var AbstractApplication = class {
		/**
		* Initialize and start the frontend application.
		*/
		async doStart() {
			for (const lifecycle of this.lifecycles) if (lifecycle.initialize) try {
				lifecycle.initialize();
			} catch (error) {
				this.logger.error("Could not initialize lifecycle", error);
			}
			for (const lifecycle of this.lifecycles) if (lifecycle.onStart) try {
				await lifecycle.onStart(this);
			} catch (error) {
				this.logger.error("Could not start lifecycle", error);
			}
		}
		/**
		* Stop the frontend application lifecycle.
		*/
		doStop() {
			for (const lifecycle of this.lifecycles) if (lifecycle.onStop) try {
				lifecycle.onStop(this);
			} catch (error) {
				this.logger.error("Could not stop lifecycle", error);
			}
		}
	};
	exports.AbstractApplication = AbstractApplication;
	__decorate([
		(0, annotation_1.Autowired)(exports.ApplicationLifecycle),
		(0, annotation_1.Optional)(),
		__metadata("design:type", Array)
	], AbstractApplication.prototype, "lifecycles", void 0);
	__decorate([(0, annotation_1.Autowired)(logger_protocol_1.Logger), __metadata("design:type", Object)], AbstractApplication.prototype, "logger", void 0);
	var AbstractApplicationStateService = class {
		constructor() {
			this._state = "init";
			this.deferred = {};
			this.stateChanged = new emitter_1.Emitter();
		}
		get state() {
			return this._state;
		}
		set state(state) {
			if (state !== this._state) {
				this.deferred[this._state] = new promise_util_1.Deferred();
				this._state = state;
				if (this.deferred[state] === void 0) this.deferred[state] = new promise_util_1.Deferred();
				this.deferred[state].resolve();
				this.stateChanged.fire(state);
			}
		}
		get onStateChanged() {
			return this.stateChanged.event;
		}
		reachedState(state) {
			if (this.deferred[state] === void 0) this.deferred[state] = new promise_util_1.Deferred();
			return this.deferred[state].promise;
		}
		reachedAnyState(...states) {
			return Promise.race(states.map((s) => this.reachedState(s)));
		}
	};
	exports.AbstractApplicationStateService = AbstractApplicationStateService;
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/application/application-error.js
var require_application_error = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ApplicationError = void 0;
	var ApplicationError;
	(function(ApplicationError) {
		const codes = [];
		function declare(code, factory) {
			if (codes.indexOf(code) !== -1) throw new Error(`An application error for '${code}' code is already declared`);
			const constructorOpt = Object.assign((...args) => new Impl(code, factory(...args), constructorOpt), {
				code,
				is(arg) {
					return arg instanceof Impl && arg.code === code;
				}
			});
			return constructorOpt;
		}
		ApplicationError.declare = declare;
		function is(arg) {
			return arg instanceof Impl;
		}
		ApplicationError.is = is;
		function fromJson(code, raw) {
			return new Impl(code, raw);
		}
		ApplicationError.fromJson = fromJson;
		class Impl extends Error {
			constructor(code, raw, constructorOpt) {
				super(raw.message);
				this.code = code;
				this.data = raw.data;
				Object.setPrototypeOf(this, Impl.prototype);
				if (raw.stack) this.stack = raw.stack;
				else if (Error.captureStackTrace && constructorOpt) Error.captureStackTrace(this, constructorOpt);
			}
			toJson() {
				const { message, data, stack } = this;
				return {
					message,
					data,
					stack
				};
			}
		}
	})(ApplicationError || (exports.ApplicationError = ApplicationError = {}));
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/application/index.js
var require_application = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __exportStar = exports && exports.__exportStar || function(m, exports$7) {
		for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$7, p)) __createBinding(exports$7, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	__exportStar(require_application_protocol(), exports);
	__exportStar(require_application_error(), exports);
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/logger/abstract-logger.js
var require_abstract_logger = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
		var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
		if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
		else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
		return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = exports && exports.__metadata || function(k, v) {
		if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.AbstractLogger = void 0;
	var annotation_1 = require_annotation();
	var logger_protocol_1 = require_logger_protocol();
	var AbstractLogger = class {
		constructor() {
			this.timeRecords = /* @__PURE__ */ new Map();
		}
		setContext(context) {
			this.context = context;
		}
		resolveContextString(context) {
			if (this.context) return context ? `[${this.context}] [${context}] ` : `[${this.context}] `;
			return context ? `[${context}] ` : "";
		}
		resolvePrefix() {
			return `${(/* @__PURE__ */ new Date()).toISOString()} [${this.level}]`;
		}
		log(message, context, logFn = console.info) {
			var _a;
			const traceId = (_a = this.traceIdProvider) === null || _a === void 0 ? void 0 : _a.provide();
			const traceStr = traceId ? ` [trace: ${traceId}]` : "";
			const contextStr = this.resolveContextString(context);
			logFn(`${this.resolvePrefix()}${traceStr}${contextStr}${message}`);
			logger_protocol_1.onLogEmitter.fire({
				level: this.level,
				traceId,
				rootContext: this.context,
				context,
				message
			});
		}
		time(label) {
			this.timeRecords.set(label, Date.now());
		}
		timeEnd(label, context) {
			const start = this.timeRecords.get(label);
			if (start !== void 0) {
				const duration = Date.now() - start;
				this.timeRecords.delete(label);
				this.log(`${label} [${duration}ms]`, context);
				return duration;
			} else {
				this.log(`No such label: ${label} for timeEnd`, context);
				return;
			}
		}
	};
	exports.AbstractLogger = AbstractLogger;
	__decorate([(0, annotation_1.Value)(`${logger_protocol_1.LOGGER_LEVEL} ?: 'info'`), __metadata("design:type", String)], AbstractLogger.prototype, "level", void 0);
	__decorate([
		(0, annotation_1.Autowired)(logger_protocol_1.TraceIdProvider),
		(0, annotation_1.Optional)(),
		__metadata("design:type", Object)
	], AbstractLogger.prototype, "traceIdProvider", void 0);
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/logger/logger.js
var require_logger$1 = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
		var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
		if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
		else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
		return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.LoggerImpl = void 0;
	var annotation_1 = require_annotation();
	var container_1 = require_container();
	var abstract_logger_1 = require_abstract_logger();
	var logger_protocol_1 = require_logger_protocol();
	var LoggerImpl = class LoggerImpl extends abstract_logger_1.AbstractLogger {
		error(message, context) {
			this.log(message, context, console.error.bind(console));
		}
		info(message, context) {
			if (["info", "debug"].includes(this.level)) this.log(message, context);
		}
		warn(message, context) {
			if ([
				"info",
				"debug",
				"warn"
			].includes(this.level)) this.log(message, context, console.warn.bind(console));
		}
		debug(message, context) {
			if (this.level === "debug") this.log(message, context, console.debug.bind(console));
		}
	};
	exports.LoggerImpl = LoggerImpl;
	exports.LoggerImpl = LoggerImpl = __decorate([(0, annotation_1.Component)({
		id: logger_protocol_1.Logger,
		scope: container_1.Scope.Transient
	})], LoggerImpl);
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/logger/logger-service.js
var require_logger_service = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
		var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
		if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
		else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
		return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.LoggerServiceImpl = void 0;
	var annotation_1 = require_annotation();
	var logger_protocol_1 = require_logger_protocol();
	var LoggerServiceImpl = class LoggerServiceImpl {
		constructor() {
			this.onLog = logger_protocol_1.onLogEmitter.event;
		}
	};
	exports.LoggerServiceImpl = LoggerServiceImpl;
	exports.LoggerServiceImpl = LoggerServiceImpl = __decorate([(0, annotation_1.Component)(logger_protocol_1.LoggerService)], LoggerServiceImpl);
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/logger/index.js
var require_logger = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __exportStar = exports && exports.__exportStar || function(m, exports$6) {
		for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$6, p)) __createBinding(exports$6, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	__exportStar(require_logger_protocol(), exports);
	__exportStar(require_logger$1(), exports);
	__exportStar(require_abstract_logger(), exports);
	__exportStar(require_logger_service(), exports);
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/aop/class-filter.js
var require_class_filter = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
		var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
		if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
		else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
		return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ClassFilterImpl = void 0;
	var container_1 = require_container();
	var aop_protocol_1 = require_aop_protocol();
	var annotation_1 = require_annotation();
	var ClassFilterImpl = class ClassFilterImpl {
		matches(clazz, metadata) {
			const container = container_1.ContainerProvider.provide();
			const tagKeys = metadata.sysTags;
			for (const tagValue of tagKeys) if (container.isBoundTagged(aop_protocol_1.MethodBeforeAdvice, aop_protocol_1.AOP_TAG, tagValue) || container.isBoundTagged(aop_protocol_1.AfterThrowsAdvice, aop_protocol_1.AOP_TAG, tagValue) || container.isBoundTagged(aop_protocol_1.AfterReturningAdvice, aop_protocol_1.AOP_TAG, tagValue)) return true;
			return false;
		}
	};
	exports.ClassFilterImpl = ClassFilterImpl;
	exports.ClassFilterImpl = ClassFilterImpl = __decorate([(0, annotation_1.Component)({
		id: aop_protocol_1.ClassFilter,
		proxy: false
	})], ClassFilterImpl);
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/aop/aop-proxy-factory.js
var require_aop_proxy_factory = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
		var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
		if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
		else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
		return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.AopProxyFactoryImpl = void 0;
	var utils_1 = require_utils();
	var container_1 = require_container();
	var aop_protocol_1 = require_aop_protocol();
	var annotation_1 = require_annotation();
	var AopProxyFactoryImpl = class AopProxyFactoryImpl {
		getAdvices(id, tagValues) {
			const container = container_1.ContainerProvider.provide();
			const advices = [];
			for (const tagValue of tagValues) if (container.isBoundTagged(id, aop_protocol_1.AOP_TAG, tagValue)) advices.push(...container.getAllTagged(id, aop_protocol_1.AOP_TAG, tagValue));
			return advices;
		}
		create(config) {
			const { metadata: { sysTags } } = config;
			const proxy = new Proxy(config.target, { get: (target, method, receiver) => {
				if ((0, utils_1.isResolveMode)()) return target;
				const func = target[method];
				if (typeof func === "function") return async (...args) => {
					try {
						const beforeAdvices = this.getAdvices(aop_protocol_1.MethodBeforeAdvice, sysTags);
						for (const advice of beforeAdvices) await advice.before(method, args, target);
						const returnValue = await func.apply(target, args);
						const afterReturningAdvices = this.getAdvices(aop_protocol_1.AfterReturningAdvice, sysTags);
						for (const advice of afterReturningAdvices) await advice.afterReturning(returnValue, method, args, target);
						return returnValue;
					} catch (error) {
						const afterThrowsAdvices = this.getAdvices(aop_protocol_1.AfterThrowsAdvice, sysTags);
						for (const advice of afterThrowsAdvices) await advice.afterThrows(error, method, args, target);
						throw error;
					}
				};
				return func;
			} });
			return { getProxy() {
				return proxy;
			} };
		}
	};
	exports.AopProxyFactoryImpl = AopProxyFactoryImpl;
	exports.AopProxyFactoryImpl = AopProxyFactoryImpl = __decorate([(0, annotation_1.Component)({
		id: aop_protocol_1.AopProxyFactory,
		proxy: false
	})], AopProxyFactoryImpl);
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/aop/index.js
var require_aop = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __exportStar = exports && exports.__exportStar || function(m, exports$5) {
		for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$5, p)) __createBinding(exports$5, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	__exportStar(require_aop_protocol(), exports);
	__exportStar(require_class_filter(), exports);
	__exportStar(require_aop_proxy_factory(), exports);
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/el/expression-protocol.js
var require_expression_protocol = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.JexlEngineProvider = exports.ExpressionContextProvider = exports.ContextInitializer = exports.ExpressionHandler = exports.ExpressionCompiler = void 0;
	exports.ExpressionCompiler = Symbol("ExpressionCompiler");
	exports.ExpressionHandler = Symbol("ExpressionHandler");
	exports.ContextInitializer = Symbol("ContextInitializer");
	exports.ExpressionContextProvider = Symbol("ExpressionContextProvider");
	exports.JexlEngineProvider = Symbol("JexlEngineProvider");
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/el/expression-compiler.js
var require_expression_compiler = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
		var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
		if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
		else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
		return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = exports && exports.__metadata || function(k, v) {
		if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ExpressionCompilerImpl = void 0;
	var expression_protocol_1 = require_expression_protocol();
	var annotation_1 = require_annotation();
	var ExpressionCompilerImpl = class ExpressionCompilerImpl {
		constructor() {
			this.ESCAPE_CHAR = "\\";
			this.SPECIAL_CHAR = "$";
			this.BRACKET_BEGIN = "{";
			this.BRACKET_END = "}";
		}
		getSpecialChar(opitons) {
			if (opitons.ignoreSpecialChar) return "";
			return opitons.specialChar;
		}
		equalsSpecialChar(opitons, char) {
			if (opitons.ignoreSpecialChar) return false;
			return char === opitons.specialChar;
		}
		compileSections(text, options) {
			const merged = {
				escapeChar: this.ESCAPE_CHAR,
				specialChar: this.SPECIAL_CHAR,
				bracketBegin: this.BRACKET_BEGIN,
				bracketEnd: this.BRACKET_END,
				...options
			};
			if (!text || text.indexOf(`${this.getSpecialChar(merged)}${merged.bracketBegin}`) < 0) return [];
			const sections = [];
			let middleText = text;
			while (middleText) {
				const me = this.middleCompile(middleText, merged);
				if (!me) {
					sections.push(middleText);
					middleText = void 0;
				} else {
					sections.push(me.expression);
					middleText = me.nextText;
				}
			}
			return sections;
		}
		middleCompile(text, options) {
			let me;
			const prefix = `${this.getSpecialChar(options)}${options.bracketBegin}`;
			const prefix2 = `${prefix}${options.bracketBegin}`;
			if (text.startsWith(prefix2)) me = this.nextMiddleExpression(text.substring(prefix2.length), 2, options);
			else if (text.startsWith(prefix)) me = this.nextMiddleExpression(text.substring(prefix.length), void 0, options);
			else me = this.nextString(text, options);
			return me;
		}
		nextMiddleExpression(text, bracketBeginCharNum = 1, options) {
			let stringed = false;
			let escaped = false;
			let bracketBeginCharFound = 0;
			const section = [];
			for (let i = 0; i < text.length; i++) {
				const c = text[i];
				if (!escaped) {
					if ("'" === c || "\"" === c) {
						stringed = !stringed;
						section.push(c);
						continue;
					} else if (c === options.escapeChar) {
						escaped = true;
						continue;
					}
				}
				if (stringed) {
					section.push(c);
					escaped = false;
				} else if (escaped) {
					if (this.equalsSpecialChar(options, c) || options.bracketBegin === c || options.bracketEnd === c) section.push(c);
					else {
						section.push(options.escapeChar);
						section.push(c);
					}
					escaped = false;
				} else if (options.bracketBegin === c) {
					bracketBeginCharFound++;
					section.push(c);
				} else if (options.bracketEnd === c) if (bracketBeginCharFound === 0 && bracketBeginCharNum === 1) {
					const expression = this.jexlEngineProvider.provide().createExpression(section.join(""));
					let nextText;
					if (i !== text.length - 1) nextText = text.substring(i + 1);
					return {
						expression,
						nextText
					};
				} else if (bracketBeginCharFound > 0) {
					bracketBeginCharFound--;
					section.push(c);
				} else bracketBeginCharNum--;
				else section.push(c);
			}
		}
		nextString(text, options) {
			let escaped = false;
			let specialCharFound = false;
			const section = [];
			for (let i = 0; i < text.length; i++) {
				const c = text[i];
				if (!escaped) {
					if ("'" === c || "\"" === c) {
						section.push(c);
						continue;
					} else if (c === options.escapeChar) {
						escaped = true;
						continue;
					}
				}
				if (escaped) {
					if (this.equalsSpecialChar(options, c) || options.bracketBegin === c || options.bracketEnd === c) section.push(c);
					else {
						section.push(options.escapeChar);
						section.push(c);
					}
					escaped = false;
				} else if (specialCharFound || options.ignoreSpecialChar) if (options.bracketBegin === c) return {
					expression: section.join(""),
					nextText: options.ignoreSpecialChar ? text.substring(i) : text.substring(i - 1)
				};
				else {
					if (!options.ignoreSpecialChar) {
						specialCharFound = false;
						section.push(options.specialChar);
					}
					section.push(c);
				}
				else if (this.equalsSpecialChar(options, c)) specialCharFound = true;
				else section.push(c);
			}
			return { expression: section.join("") };
		}
	};
	exports.ExpressionCompilerImpl = ExpressionCompilerImpl;
	__decorate([(0, annotation_1.Autowired)(expression_protocol_1.JexlEngineProvider), __metadata("design:type", Object)], ExpressionCompilerImpl.prototype, "jexlEngineProvider", void 0);
	exports.ExpressionCompilerImpl = ExpressionCompilerImpl = __decorate([(0, annotation_1.Component)(expression_protocol_1.ExpressionCompiler)], ExpressionCompilerImpl);
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/el/expression-context-provider.js
var require_expression_context_provider = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
		var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
		if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
		else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
		return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = exports && exports.__metadata || function(k, v) {
		if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = exports && exports.__param || function(paramIndex, decorator) {
		return function(target, key) {
			decorator(target, key, paramIndex);
		};
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ExpressionContextProviderImpl = void 0;
	var annotation_1 = require_annotation();
	var expression_protocol_1 = require_expression_protocol();
	var utils_1 = require_utils();
	var config_1 = require_config();
	var ExpressionContextProviderImpl = class ExpressionContextProviderImpl {
		constructor(contextInitializers) {
			this.contextInitializers = contextInitializers;
			this.initialized = false;
			this.ctx = config_1.ConfigUtil.getRaw();
		}
		provide() {
			if (!this.prioritized) this.prioritized = utils_1.Prioritizeable.prioritizeAllSync(this.contextInitializers).map((c) => c.value);
			if (!this.initialized) {
				this.initialized = true;
				for (const initializer of this.prioritized) initializer.initialize(this.ctx);
			}
			return this.ctx;
		}
	};
	exports.ExpressionContextProviderImpl = ExpressionContextProviderImpl;
	exports.ExpressionContextProviderImpl = ExpressionContextProviderImpl = __decorate([
		(0, annotation_1.Component)(expression_protocol_1.ExpressionContextProvider),
		__param(0, (0, annotation_1.Autowired)(expression_protocol_1.ContextInitializer)),
		__param(0, (0, annotation_1.Optional)()),
		__metadata("design:paramtypes", [Array])
	], ExpressionContextProviderImpl);
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/el/expression-handler.js
var require_expression_handler = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
		var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
		if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
		else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
		return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = exports && exports.__metadata || function(k, v) {
		if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ExpressionHandlerImpl = void 0;
	var annotation_1 = require_annotation();
	var expression_protocol_1 = require_expression_protocol();
	var traverse = require_common$1.require_traverse();
	var ExpressionHandlerImpl = class ExpressionHandlerImpl {
		getContext(ctx, expressionCompilerOptions) {
			const c = ctx || this.expressionContextProvider.provide();
			if (!ctx && c !== this._ctx && !(expressionCompilerOptions === null || expressionCompilerOptions === void 0 ? void 0 : expressionCompilerOptions.ignoreContextExpression)) {
				this._ctx = c;
				this.handle(c, c);
			}
			return c;
		}
		handle(textOrObj, ctx, expressionCompilerOptions) {
			if (typeof textOrObj === "string") return this.doHandle(textOrObj, ctx, expressionCompilerOptions);
			else {
				const self = this;
				traverse(textOrObj).forEach(function(value) {
					if (typeof value === "string") this.update(self.handle(value, ctx, expressionCompilerOptions));
					else if (value && value._ignoreEl === true) this.update(value, true);
				});
				return textOrObj;
			}
		}
		doHandle(text, ctx, expressionCompilerOptions) {
			const sections = this.expressionCompiler.compileSections(text, expressionCompilerOptions);
			if (sections.length > 0) {
				if (this.hasExpression(sections)) {
					const c = this.getContext(ctx, expressionCompilerOptions);
					if (sections.length === 1) {
						let value = sections[0].evalSync(c);
						if (typeof value === "string") value = this.handle(value, c);
						return value;
					}
					const result = [];
					for (const section of sections) if (typeof section === "string") result.push(section);
					else {
						let value = section.evalSync(c);
						if (typeof value === "string") value = this.handle(value, c);
						result.push(value);
					}
					return result.join("");
				}
			}
			return text;
		}
		hasExpression(sections) {
			for (const section of sections) if (typeof section !== "string") return true;
			return false;
		}
	};
	exports.ExpressionHandlerImpl = ExpressionHandlerImpl;
	__decorate([(0, annotation_1.Autowired)(expression_protocol_1.JexlEngineProvider), __metadata("design:type", Object)], ExpressionHandlerImpl.prototype, "jexlEngineProvider", void 0);
	__decorate([(0, annotation_1.Autowired)(expression_protocol_1.ExpressionContextProvider), __metadata("design:type", Object)], ExpressionHandlerImpl.prototype, "expressionContextProvider", void 0);
	__decorate([(0, annotation_1.Autowired)(expression_protocol_1.ExpressionCompiler), __metadata("design:type", Object)], ExpressionHandlerImpl.prototype, "expressionCompiler", void 0);
	exports.ExpressionHandlerImpl = ExpressionHandlerImpl = __decorate([(0, annotation_1.Component)(expression_protocol_1.ExpressionHandler)], ExpressionHandlerImpl);
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/el/jexl-engine-provider.js
var require_jexl_engine_provider = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
		var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
		if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
		else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
		return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.JexlEngineProviderImpl = void 0;
	var annotation_1 = require_annotation();
	var expression_protocol_1 = require_expression_protocol();
	var jexl_1 = require_common$1.require_Jexl();
	var JexlEngineProviderImpl = class JexlEngineProviderImpl {
		provide() {
			if (!this.jexlEngine) this.jexlEngine = new jexl_1.Jexl();
			return this.jexlEngine;
		}
	};
	exports.JexlEngineProviderImpl = JexlEngineProviderImpl;
	exports.JexlEngineProviderImpl = JexlEngineProviderImpl = __decorate([(0, annotation_1.Component)(expression_protocol_1.JexlEngineProvider)], JexlEngineProviderImpl);
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/el/core-context-initializer.js
var require_core_context_initializer = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
		var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
		if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
		else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
		return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = exports && exports.__metadata || function(k, v) {
		if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.CoreContextInitializer = void 0;
	var annotation_1 = require_annotation();
	var container_1 = require_container();
	var expression_protocol_1 = require_expression_protocol();
	var CoreContextInitializer = class CoreContextInitializer {
		constructor() {
			this.priority = 500;
		}
		initialize(ctx) {
			if (typeof process !== "undefined") ctx.env = {
				...process.env,
				_ignoreEl: true
			};
			const jexlEngine = this.jexlEngineProvider.provide();
			jexlEngine.addTransform("replace", (val, searchValue, replaceValue) => val && val.replace(new RegExp(searchValue, "g"), replaceValue));
			jexlEngine.addTransform("regexp", (pattern, flags) => new RegExp(pattern, flags));
			const expressionHandler = container_1.ContainerUtil.get(expression_protocol_1.ExpressionHandler);
			jexlEngine.addTransform("eval", (text) => expressionHandler.handle(text));
		}
	};
	exports.CoreContextInitializer = CoreContextInitializer;
	__decorate([(0, annotation_1.Autowired)(expression_protocol_1.JexlEngineProvider), __metadata("design:type", Object)], CoreContextInitializer.prototype, "jexlEngineProvider", void 0);
	exports.CoreContextInitializer = CoreContextInitializer = __decorate([(0, annotation_1.Component)(expression_protocol_1.ContextInitializer)], CoreContextInitializer);
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/el/index.js
var require_el = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __exportStar = exports && exports.__exportStar || function(m, exports$4) {
		for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$4, p)) __createBinding(exports$4, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	__exportStar(require_expression_protocol(), exports);
	__exportStar(require_expression_compiler(), exports);
	__exportStar(require_expression_context_provider(), exports);
	__exportStar(require_expression_handler(), exports);
	__exportStar(require_jexl_engine_provider(), exports);
	__exportStar(require_core_context_initializer(), exports);
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/config/config-provider.js
var require_config_provider = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
		var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
		if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
		else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
		return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = exports && exports.__metadata || function(k, v) {
		if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ConfigProviderImpl = void 0;
	var config_protocol_1 = require_config_protocol();
	var annotation_1 = require_annotation();
	var el_1 = require_el();
	var ConfigProviderImpl = class ConfigProviderImpl {
		get(key, defaultValue) {
			return this.expressionHandler.handle(`\${${key}}`) || defaultValue;
		}
	};
	exports.ConfigProviderImpl = ConfigProviderImpl;
	__decorate([(0, annotation_1.Autowired)(el_1.ExpressionHandler), __metadata("design:type", Object)], ConfigProviderImpl.prototype, "expressionHandler", void 0);
	exports.ConfigProviderImpl = ConfigProviderImpl = __decorate([(0, annotation_1.Component)(config_protocol_1.ConfigProvider)], ConfigProviderImpl);
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/config/index.js
var require_config = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __exportStar = exports && exports.__exportStar || function(m, exports$3) {
		for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$3, p)) __createBinding(exports$3, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	__exportStar(require_config_protocol(), exports);
	__exportStar(require_config_provider(), exports);
	__exportStar(require_config_util(), exports);
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/provider/component-filter-registry.js
var require_component_filter_registry = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
		var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
		if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
		else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
		return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = exports && exports.__metadata || function(k, v) {
		if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = exports && exports.__param || function(paramIndex, decorator) {
		return function(target, key) {
			decorator(target, key, paramIndex);
		};
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ComponentFilterRegistryImpl = void 0;
	var provider_protocol_1 = require_provider_protocol();
	var annotation_1 = require_annotation();
	var ComponentFilterRegistryImpl = class ComponentFilterRegistryImpl {
		constructor(contributions = []) {
			this.initialized = false;
			this.genericFilters = [];
			this.typeToFilters = /* @__PURE__ */ new Map();
			for (const contribution of contributions) contribution.registerContributionFilters(this);
			this.initialized = true;
		}
		addFilters(types, filters) {
			if (this.initialized) throw new Error("cannot add filters after initialization is done.");
			else if (types === "*") this.genericFilters.push(...filters);
			else for (const type of types) this.getOrCreate(type).push(...filters);
		}
		applyFilters(toFilter, type) {
			const filters = this.getFilters(type);
			if (filters.length === 0) return toFilter;
			return toFilter.filter((object) => filters.every((filter) => filter(object)));
		}
		getOrCreate(type) {
			let value = this.typeToFilters.get(type);
			if (value === void 0) this.typeToFilters.set(type, value = []);
			return value;
		}
		getFilters(type) {
			return [...this.typeToFilters.get(type) || [], ...this.genericFilters];
		}
	};
	exports.ComponentFilterRegistryImpl = ComponentFilterRegistryImpl;
	exports.ComponentFilterRegistryImpl = ComponentFilterRegistryImpl = __decorate([
		(0, annotation_1.Component)(provider_protocol_1.ComponentFilterRegistry),
		__param(0, (0, annotation_1.Autowired)(provider_protocol_1.ComponentFilterContribution)),
		__param(0, (0, annotation_1.Optional)()),
		__metadata("design:paramtypes", [Array])
	], ComponentFilterRegistryImpl);
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/provider/provider.js
var require_provider$1 = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ContainerBasedProvider = void 0;
	var provider_protocol_1 = require_provider_protocol();
	var utils_1 = require_utils();
	var DEFAULT_GET_PRIORITY = (value) => {
		if (value) {
			if ("priority" in value) return value.priority;
			else if ("order" in value) return value.order;
			return 0;
		}
	};
	var ContainerBasedProvider = class {
		constructor(componentId, container) {
			this.componentId = componentId;
			this.container = container;
		}
		get(recursive) {
			if (this.components === void 0) {
				const currentComponents = [];
				let filterRegistry;
				let currentContainer = this.container;
				while (currentContainer !== null) {
					if (currentContainer.isBound(this.componentId)) try {
						currentComponents.push(...currentContainer.getAll(this.componentId));
					} catch (error) {
						console.error(error);
					}
					if (filterRegistry === void 0 && currentContainer.isBound(provider_protocol_1.ComponentFilterRegistry)) filterRegistry = currentContainer.get(provider_protocol_1.ComponentFilterRegistry);
					currentContainer = recursive === true ? currentContainer.parent : null;
				}
				this.components = filterRegistry ? filterRegistry.applyFilters(currentComponents, this.componentId) : currentComponents;
			}
			return this.components;
		}
		sortSync(getPriority = DEFAULT_GET_PRIORITY, recursive) {
			this.components = utils_1.Prioritizeable.prioritizeAllSync(this.get(recursive), getPriority).map((c) => c.value);
			return this.components;
		}
		async sort(getPriority = DEFAULT_GET_PRIORITY, recursive) {
			this.components = (await utils_1.Prioritizeable.prioritizeAll(this.get(recursive), getPriority)).map((c) => c.value);
			return this.components;
		}
	};
	exports.ContainerBasedProvider = ContainerBasedProvider;
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/provider/provider-creator.js
var require_provider_creator = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
		var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
		if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
		else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
		return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ProviderCreatorImpl = void 0;
	var component_1 = require_component();
	var provider_protocol_1 = require_provider_protocol();
	var provider_1 = require_provider$1();
	var ProviderCreatorImpl = class ProviderCreatorImpl {
		create(id, container) {
			return new provider_1.ContainerBasedProvider(id, container);
		}
	};
	exports.ProviderCreatorImpl = ProviderCreatorImpl;
	exports.ProviderCreatorImpl = ProviderCreatorImpl = __decorate([(0, component_1.Component)(provider_protocol_1.ProviderCreator)], ProviderCreatorImpl);
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/provider/provider-util.js
var require_provider_util = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ProviderUtil = void 0;
	var autowired_provider_1 = require_autowired_provider();
	var container_1 = require_container();
	var ProviderUtil;
	(function(ProviderUtil) {
		function get(componentId) {
			return container_1.ContainerUtil.getTagged(autowired_provider_1.PROVIDER, autowired_provider_1.ID_KEY, componentId);
		}
		ProviderUtil.get = get;
	})(ProviderUtil || (exports.ProviderUtil = ProviderUtil = {}));
}));
//#endregion
//#region ../../packages/monitor/node_modules/@celljs/core/lib/common/provider/index.js
var require_provider = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __exportStar = exports && exports.__exportStar || function(m, exports$2) {
		for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$2, p)) __createBinding(exports$2, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	__exportStar(require_component_filter_registry(), exports);
	__exportStar(require_provider$1(), exports);
	__exportStar(require_provider_creator(), exports);
	__exportStar(require_provider_protocol(), exports);
	__exportStar(require_provider_util(), exports);
}));
//#endregion
//#region ../../packages/monitor/src/common/monitor-event-bridge.ts
var import_common = (/* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __exportStar = exports && exports.__exportStar || function(m, exports$1) {
		for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$1, p)) __createBinding(exports$1, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	require_common$1.init_Reflect();
	__exportStar(require_utils(), exports);
	__exportStar(require_annotation(), exports);
	__exportStar(require_application(), exports);
	__exportStar(require_logger(), exports);
	__exportStar(require_container(), exports);
	__exportStar(require_aop(), exports);
	__exportStar(require_constants(), exports);
	__exportStar(require_config(), exports);
	__exportStar(require_error(), exports);
	__exportStar(require_el(), exports);
	__exportStar(require_provider(), exports);
})))();
require_common$1.init_common$2();
require_common$1.init_decorateMetadata();
require_common$1.init_decorate();
var _ref;
/**
* DI Token for MonitorEventBridgeService
*
* 注意: 为保持向后兼容，Token 名称仍为 'MonitorEventBridgeService'
* 业务代码使用 @Autowired(MonitorEventBridgeService) 注入
*/
var MonitorEventBridgeService = Symbol("MonitorEventBridgeService");
var MonitorEventBridge = class MonitorEventBridge {
	/**
	* Emit a monitoring event to the global event bus
	*
	* 事件流转:
	* Business Code → emit() → monitorEventBus → Collectors → Processors → Exporters
	*/
	emit(event, payload) {
		this.logger.debug(`[MonitorEventBridge] Forwarding event: ${String(event)}`);
		monitorEventBus.emitAsync(event, payload);
	}
};
require_common$1.__decorate([(0, import_common.Autowired)(require_common$1.Logger), require_common$1.__decorateMetadata("design:type", typeof (_ref = typeof require_common$1.Logger !== "undefined" && require_common$1.Logger) === "function" ? _ref : Object)], MonitorEventBridge.prototype, "logger", void 0);
MonitorEventBridge = require_common$1.__decorate([(0, import_common.Component)(MonitorEventBridgeService)], MonitorEventBridge);
Number.MAX_SAFE_INTEGER;
//#endregion
//#region src/main/features/monitor/collectors/chat-perf-collector.ts
/**
* ChatPerformanceCollector - 聊天性能监控（两个独立指标）
*
* 指标 1: chat.message_display — 发消息 → 用户消息呈现在屏幕上（首屏体验）
*   = sendMessage entry → api.prompt() RPC 发出（前置准备时间）
*   收集后立即上报（flushNow）
*   附带 main 进程 session 创建的详细耗时分解（从 session-create-timing store 获取）
*
* 指标 2: chat.first_response — 发消息 → 首个 assistant 回复上屏
*   包含指标1的时间 + 等待 LLM 首 token
*   60s 定时上报
*/
var MAX_PENDING_LOGS$2 = 200;
var ChatPerformanceCollector = class extends AbstractCollector {
	pendingLogs = [];
	/** 立即 flush 回调（由 DesktopMonitorService 注入） */
	onMessageDisplayRecorded;
	constructor() {
		super("ChatPerformanceCollector", true);
	}
	async onStart() {}
	async onStop() {
		this.pendingLogs = [];
	}
	async onCollect() {
		return [];
	}
	async onCollectLogs() {
		const logs = [...this.pendingLogs];
		this.pendingLogs = [];
		return logs;
	}
	/**
	* 指标 1: 用户消息上屏耗时（首屏体验）— 收集后立即上报
	*
	* 从 session-create-timing store 中查找并附加 main 进程各阶段的详细耗时:
	* - is_cold_start: 是否为冷启动（需要 spawn sidecar）
	* - main_total_ms: main 进程 session 创建总耗时
	* - find_port_ms: 寻找空闲端口
	* - prepare_ms: 解析 CLI 路径 + 构建环境变量 + 写入 system prompt
	* - sidecar_ms: sidecar 启动/重连 + PTY 创建
	* - wait_for_port_ms: 等待 CLI HTTP 端口可达
	* - acp_connect_ms: ACP WebSocket 连接（含重试）
	* - session_load_ms: CLI 中 loadSession / resumeSession
	* - renderer_overhead_ms: 端到端总耗时减去 main 耗时（daemon RPC + React state update）
	*/
	recordMessageDisplay(data) {
		const totalMs = data.displayTime - data.sendTime;
		if (totalMs < 0 || totalMs > 6e4) {
			require_logger$2.mainLog.warn(`[ChatPerfCollector] Invalid message_display: ${totalMs}ms, skipping`);
			return;
		}
		const breakdown = require_session_create_timing.consumeSessionCreateTiming(data.sessionId);
		const breakdownSummary = breakdown ? ` [main=${breakdown.totalMs}ms: sidecar=${breakdown.sidecarMs}ms, waitPort=${breakdown.waitForPortMs}ms, acp=${breakdown.acpConnectMs}ms, load=${breakdown.sessionLoadMs}ms, cold=${breakdown.isColdStart}]` : "";
		require_logger$2.mainLog.info(`[ChatPerfCollector] message_display: ${totalMs}ms${breakdownSummary}`);
		if (this.pendingLogs.length < MAX_PENDING_LOGS$2) {
			const attributes = {
				event: "workbuddy.chat.message_display",
				session_id: data.sessionId,
				total_ms: totalMs
			};
			if (data.modelId) attributes.model_id = data.modelId;
			if (data.modeId) attributes.mode_id = data.modeId;
			if (breakdown) {
				attributes.is_cold_start = breakdown.isColdStart;
				attributes.main_total_ms = breakdown.totalMs;
				attributes.find_port_ms = breakdown.findPortMs;
				attributes.prepare_ms = breakdown.prepareMs;
				attributes.sidecar_ms = breakdown.sidecarMs;
				attributes.wait_for_port_ms = breakdown.waitForPortMs;
				attributes.acp_connect_ms = breakdown.acpConnectMs;
				attributes.session_load_ms = breakdown.sessionLoadMs;
				const rendererOverheadMs = totalMs - breakdown.totalMs;
				if (rendererOverheadMs >= 0) attributes.renderer_overhead_ms = Math.round(rendererOverheadMs);
			}
			this.pendingLogs.push({
				timestamp: Date.now(),
				level: "info",
				message: "chat.message_display",
				attributes
			});
		}
		this.onMessageDisplayRecorded?.();
	}
	/**
	* 指标 2: 首个 assistant 回复上屏耗时（包含指标1的时间）
	*/
	recordFirstResponse(data) {
		const totalMs = data.firstTokenTime - data.sendTime;
		const preparationMs = data.promptSentTime - data.sendTime;
		const ttfbMs = data.firstTokenTime - data.promptSentTime;
		if (totalMs < 0 || totalMs > 3e5 || preparationMs < 0 || ttfbMs < 0) {
			require_logger$2.mainLog.warn(`[ChatPerfCollector] Invalid first_response: total=${totalMs}ms, prep=${preparationMs}ms, ttfb=${ttfbMs}ms, skipping`);
			return;
		}
		require_logger$2.mainLog.info(`[ChatPerfCollector] first_response: total=${totalMs}ms, prep=${preparationMs}ms, ttfb=${ttfbMs}ms`);
		if (this.pendingLogs.length < MAX_PENDING_LOGS$2) this.pendingLogs.push({
			timestamp: Date.now(),
			level: "info",
			message: "chat.first_response",
			attributes: {
				event: "workbuddy.chat.first_response",
				session_id: data.sessionId,
				total_ms: totalMs,
				preparation_ms: preparationMs,
				ttfb_ms: ttfbMs,
				...data.modelId ? { model_id: data.modelId } : {},
				...data.modeId ? { mode_id: data.modeId } : {}
			}
		});
	}
};
//#endregion
//#region src/main/features/monitor/collectors/cli-health-collector.ts
/**
* CliHealthCollector - CLI 进程健康监控收集器
*
* 继承 @genie/monitor 的 AbstractCollector，通过 onCollectLogs() 返回结构化日志。
*
* 日志 attributes：
* - event: workbuddy.cli
* - action: start / crash / restart
* - duration_ms: 启动耗时
* - exit_code: 退出码
* - signal: 退出信号
*/
var CliHealthCollector = class extends AbstractCollector {
	pendingLogs = [];
	constructor() {
		super("CliHealthCollector", true);
	}
	async onStart() {}
	async onStop() {
		this.pendingLogs = [];
	}
	async onCollect() {
		return [];
	}
	async onCollectLogs() {
		const logs = [...this.pendingLogs];
		this.pendingLogs = [];
		return logs;
	}
	recordCliStart(durationMs) {
		require_logger$2.mainLog.info(`[CliHealthCollector] CLI started${durationMs !== void 0 ? `, duration=${durationMs}ms` : ""}`);
		this.pendingLogs.push({
			timestamp: Date.now(),
			level: "info",
			message: "cli.start",
			attributes: {
				event: "workbuddy.cli",
				action: "start",
				...durationMs !== void 0 ? { duration_ms: durationMs } : {}
			}
		});
	}
	recordCliCrash(exitCode, signal) {
		require_logger$2.mainLog.warn(`[CliHealthCollector] CLI crashed, exitCode=${exitCode ?? "null"}, signal=${signal ?? "null"}`);
		this.pendingLogs.push({
			timestamp: Date.now(),
			level: "error",
			message: "cli.crash",
			attributes: {
				event: "workbuddy.cli",
				action: "crash",
				...exitCode != null ? { exit_code: String(exitCode) } : {},
				...signal ? { signal } : {}
			}
		});
	}
	recordCliRestart() {
		require_logger$2.mainLog.info("[CliHealthCollector] CLI restarted");
		this.pendingLogs.push({
			timestamp: Date.now(),
			level: "warn",
			message: "cli.restart",
			attributes: {
				event: "workbuddy.cli",
				action: "restart"
			}
		});
	}
};
//#endregion
//#region src/main/features/monitor/collectors/history-load-collector.ts
/**
* HistoryLoadCollector - 历史记录加载性能监控
*
* 继承 @genie/monitor 的 AbstractCollector，通过 onCollectLogs() 返回结构化日志。
*
* 3 段分时：
* - T1→T2: renderer_to_main_ms（渲染进程 → 主进程 IPC 开销）
* - T2→T3: load_and_render_ms（主进程加载 + CLI 回放 + 渲染完成）
* - T1→T3: total_ms（端到端总耗时）
*
* 日志 attributes：
* - event: workbuddy.history.load
* - session_id, request_id, total_ms, renderer_to_main_ms, load_and_render_ms
* - read_jsonl_ms, active_items, convert_ms, events, bytes, checkpoint_ms, main_push_ms, renderer_hydration_ms
* - renderer_get_session_ms, renderer_expert_hydration_ms, renderer_scene_template_ms
* - renderer_projection_replay_ms, renderer_store_switch_ms
* - renderer_replay_drain_ms, renderer_owner_rehydrate_ms, renderer_accumulator_reconcile_ms
* - renderer_team_runtime_ms, renderer_team_settle_ms, renderer_task_emit_ms, renderer_terminal_sweep_ms
* - message_count（可选）
*/
/** 最大待导出日志数 */
var MAX_PENDING_LOGS$1 = 100;
var HistoryLoadCollector = class extends AbstractCollector {
	pendingLogs = [];
	constructor() {
		super("HistoryLoadCollector", true);
	}
	async onStart() {}
	async onStop() {
		this.pendingLogs = [];
	}
	async onCollect() {
		return [];
	}
	async onCollectLogs() {
		const logs = [...this.pendingLogs];
		this.pendingLogs = [];
		return logs;
	}
	recordHistoryLoadTiming(data) {
		const totalMs = data.hydrationCompleteTime - data.rendererLoadTime;
		const rendererToMainMs = data.mainLoadTime - data.rendererLoadTime;
		const loadAndRenderMs = data.hydrationCompleteTime - data.mainLoadTime;
		if (totalMs < 0 || totalMs > 12e4 || rendererToMainMs < 0 || loadAndRenderMs < 0) {
			require_logger$2.mainLog.warn(`[HistoryLoadCollector] Invalid timing: total=${totalMs}ms, r2m=${rendererToMainMs}ms, load=${loadAndRenderMs}ms, skipping`);
			return;
		}
		const parts = [
			data.switchMode ? `mode=${data.switchMode}` : void 0,
			`total=${totalMs}ms`,
			`r2m=${rendererToMainMs}ms`,
			`load=${loadAndRenderMs}ms`,
			data.messageCount !== void 0 ? `msgs=${data.messageCount}` : void 0,
			data.readJsonlMs !== void 0 ? `readJsonl=${data.readJsonlMs}ms` : void 0,
			data.activeItems !== void 0 ? `activeItems=${data.activeItems}` : void 0,
			data.convertMs !== void 0 ? `convert=${data.convertMs}ms` : void 0,
			data.events !== void 0 ? `events=${data.events}` : void 0,
			data.bytes !== void 0 ? `bytes=${data.bytes}` : void 0,
			data.checkpointMs !== void 0 ? `checkpoint=${data.checkpointMs}ms` : void 0,
			data.mainPushMs !== void 0 ? `mainPush=${data.mainPushMs}ms` : void 0,
			data.rendererHydrationMs !== void 0 ? `rendererHydration=${data.rendererHydrationMs}ms` : void 0,
			data.rendererGetSessionMs !== void 0 ? `rendererGetSession=${data.rendererGetSessionMs}ms` : void 0,
			data.rendererExpertHydrationMs !== void 0 ? `rendererExpertHydration=${data.rendererExpertHydrationMs}ms` : void 0,
			data.rendererSceneTemplateMs !== void 0 ? `rendererSceneTemplate=${data.rendererSceneTemplateMs}ms` : void 0,
			data.rendererProjectionReplayMs !== void 0 ? `rendererProjectionReplay=${data.rendererProjectionReplayMs}ms` : void 0,
			data.rendererStoreSwitchMs !== void 0 ? `rendererStoreSwitch=${data.rendererStoreSwitchMs}ms` : void 0,
			data.rendererReplayDrainMs !== void 0 ? `rendererReplayDrain=${data.rendererReplayDrainMs}ms` : void 0,
			data.rendererOwnerRehydrateMs !== void 0 ? `rendererOwnerRehydrate=${data.rendererOwnerRehydrateMs}ms` : void 0,
			data.rendererAccumulatorReconcileMs !== void 0 ? `rendererAccumulatorReconcile=${data.rendererAccumulatorReconcileMs}ms` : void 0,
			data.rendererTeamRuntimeMs !== void 0 ? `rendererTeamRuntime=${data.rendererTeamRuntimeMs}ms` : void 0,
			data.rendererTeamSettleMs !== void 0 ? `rendererTeamSettle=${data.rendererTeamSettleMs}ms` : void 0,
			data.rendererTaskEmitMs !== void 0 ? `rendererTaskEmit=${data.rendererTaskEmitMs}ms` : void 0,
			data.rendererTerminalSweepMs !== void 0 ? `rendererTerminalSweep=${data.rendererTerminalSweepMs}ms` : void 0,
			data.requestId ? `requestId=${data.requestId}` : void 0
		].filter(Boolean);
		require_logger$2.mainLog.info(`[HistoryLoadCollector] ${parts.join(", ")}`);
		if (this.pendingLogs.length >= MAX_PENDING_LOGS$1) return;
		this.pendingLogs.push({
			timestamp: Date.now(),
			level: "info",
			message: "history.load",
			attributes: {
				event: "workbuddy.history.load",
				session_id: data.sessionId,
				...data.requestId ? { request_id: data.requestId } : {},
				...data.switchMode ? { switch_mode: data.switchMode } : {},
				total_ms: totalMs,
				renderer_to_main_ms: rendererToMainMs,
				load_and_render_ms: loadAndRenderMs,
				...data.messageCount !== void 0 ? { message_count: data.messageCount } : {},
				...data.readJsonlMs !== void 0 ? { read_jsonl_ms: data.readJsonlMs } : {},
				...data.activeItems !== void 0 ? { active_items: data.activeItems } : {},
				...data.convertMs !== void 0 ? { convert_ms: data.convertMs } : {},
				...data.events !== void 0 ? { events: data.events } : {},
				...data.bytes !== void 0 ? { bytes: data.bytes } : {},
				...data.checkpointMs !== void 0 ? { checkpoint_ms: data.checkpointMs } : {},
				...data.mainPushMs !== void 0 ? { main_push_ms: data.mainPushMs } : {},
				...data.rendererHydrationMs !== void 0 ? { renderer_hydration_ms: data.rendererHydrationMs } : {},
				...data.rendererGetSessionMs !== void 0 ? { renderer_get_session_ms: data.rendererGetSessionMs } : {},
				...data.rendererExpertHydrationMs !== void 0 ? { renderer_expert_hydration_ms: data.rendererExpertHydrationMs } : {},
				...data.rendererSceneTemplateMs !== void 0 ? { renderer_scene_template_ms: data.rendererSceneTemplateMs } : {},
				...data.rendererProjectionReplayMs !== void 0 ? { renderer_projection_replay_ms: data.rendererProjectionReplayMs } : {},
				...data.rendererStoreSwitchMs !== void 0 ? { renderer_store_switch_ms: data.rendererStoreSwitchMs } : {},
				...data.rendererReplayDrainMs !== void 0 ? { renderer_replay_drain_ms: data.rendererReplayDrainMs } : {},
				...data.rendererOwnerRehydrateMs !== void 0 ? { renderer_owner_rehydrate_ms: data.rendererOwnerRehydrateMs } : {},
				...data.rendererAccumulatorReconcileMs !== void 0 ? { renderer_accumulator_reconcile_ms: data.rendererAccumulatorReconcileMs } : {},
				...data.rendererTeamRuntimeMs !== void 0 ? { renderer_team_runtime_ms: data.rendererTeamRuntimeMs } : {},
				...data.rendererTeamSettleMs !== void 0 ? { renderer_team_settle_ms: data.rendererTeamSettleMs } : {},
				...data.rendererTaskEmitMs !== void 0 ? { renderer_task_emit_ms: data.rendererTaskEmitMs } : {},
				...data.rendererTerminalSweepMs !== void 0 ? { renderer_terminal_sweep_ms: data.rendererTerminalSweepMs } : {},
				...data.deferredDrainMs !== void 0 ? { deferred_drain_ms: data.deferredDrainMs } : {},
				...data.deferredBatchCount !== void 0 ? { deferred_batch_count: data.deferredBatchCount } : {},
				...data.deferredEventCount !== void 0 ? { deferred_event_count: data.deferredEventCount } : {}
			}
		});
	}
};
//#endregion
//#region src/main/features/monitor/collectors/migration-collector.ts
/**
* MigrationCollector - 历史记录迁移监控收集器
*
* 继承 @genie/monitor 的 AbstractCollector，通过 onCollectLogs() 返回结构化日志。
* 每个事件只上报一条日志，用 status 字段区分结果。
*
* 上报模式：
* - 每个子迁移上报 1 条：migration.{type}，status = success / failed / skipped
* - 整体汇总上报 1 条：migration.all，status = success / failed
*
* 日志 attributes：
* - event: workbuddy.migration
* - migration_type: all / history / automation / plan / ...
* - status: success / failed / skipped
* - duration_ms: 耗时
* - session_count: session 数量
* - is_incremental: 是否增量
* - error_message: 错误信息（截断 200 字符）
*/
var MigrationCollector = class extends AbstractCollector {
	pendingLogs = [];
	constructor() {
		super("MigrationCollector", true);
	}
	async onStart() {}
	async onStop() {
		this.pendingLogs = [];
	}
	async onCollect() {
		return [];
	}
	async onCollectLogs() {
		const logs = [...this.pendingLogs];
		this.pendingLogs = [];
		return logs;
	}
	/**
	* 记录一次迁移结果（子迁移或汇总）
	*/
	recordMigration(record) {
		require_logger$2.mainLog.info(`[MigrationCollector] ${record.type}: status=${record.status}, duration=${record.durationMs}ms${record.sessionCount ? ", sessions=" + record.sessionCount : ""}${record.error ? ", error=" + record.error.slice(0, 100) : ""}`);
		this.pendingLogs.push({
			timestamp: Date.now(),
			level: record.status === "failed" ? "error" : "info",
			message: `migration.${record.type}`,
			attributes: {
				event: "workbuddy.migration",
				migration_type: record.type,
				status: record.status,
				duration_ms: record.durationMs,
				is_incremental: String(record.isIncremental),
				...record.sessionCount !== void 0 ? { session_count: record.sessionCount } : {},
				...record.error ? { error_message: record.error.slice(0, 200) } : {}
			}
		});
	}
};
//#endregion
//#region src/main/features/monitor/collectors/startup-perf-collector.ts
/**
* StartupPerfCollector — 启动性能上报（通道 A · 伽利略线上）
*
* 把启动性能 summary、原始 JSONL、per-mark 明细作为 `LogRecord`
* 推入伽利略上报管线。
*
* 接入方式与 `ChatPerformanceCollector` 完全一致：
*   pendingLogs(LogRecord[]) → onCollectLogs() → DesktopMonitorService
*   .collectAndExportLogs() → galileoExporter.exportLogs() / aegisExporter.exportLogs()
*
* 只要本 collector 被加进 `DesktopMonitorService.collectors[]`，就会被周期
* `collectAndExportLogs()` 自动收集并双通道上报，无需触碰 exporter / OTLP 底层。
*
* LogRecord → 伽利略平台映射：
*   - `message`        → 平台 message 列（这里固定 `startup.perf`）
*   - `attributes.*`   → 平台 `tags.*`（如 tags.startup_type / tags.total_ms / tags.phase_A_ms）
*/
var MAX_PENDING_LOGS = 100;
var MAX_STARTUP_JSONL_CHARS = 512 * 1024;
function buildTraceTags(traceId, _spanId) {
	return traceId ? { startup_trace_id: traceId } : {};
}
var StartupPerfCollector = class extends AbstractCollector {
	pendingLogs = [];
	/** 立即 flush 回调（由 DesktopMonitorService 注入，可选） */
	onStartupPerfRecorded;
	constructor() {
		super("StartupPerfCollector", true);
	}
	async onStart() {}
	async onStop() {
		this.pendingLogs = [];
	}
	async onCollect() {
		return [];
	}
	async onCollectLogs() {
		const logs = [...this.pendingLogs];
		this.pendingLogs = [];
		return logs;
	}
	/**
	* 记录一次启动性能 summary，等待下一次周期 collect 时上报伽利略。
	*
	* 由 desktop 侧 startup summary 计算接桥调用（与通道 B 的 `logStartupPerf` 共用同一份 summary）。
	*/
	recordStartupPerf(summary, traceId) {
		const spanId = traceId ? require_startup_perf_exporters.getStartupRootSpanId(traceId) : void 0;
		const attributes = {
			event: "workbuddy.startup.perf",
			...buildTraceTags(traceId, spanId),
			startup_type: summary.startupType,
			flow_type: summary.flowType,
			total_ms: summary.totalMs,
			...typeof summary.firstInteractiveMs === "number" ? { first_interactive_ms: summary.firstInteractiveMs } : {},
			total_marks: summary.totalMarks
		};
		for (const [phase, durationMs] of Object.entries(summary.phases)) attributes[`phase_${phase}_ms`] = durationMs;
		require_logger$2.mainLog.info(`[StartupPerfCollector] startup.perf: trace=${traceId ?? "-"} type=${summary.startupType} total=${summary.totalMs}ms firstInteractive=${summary.firstInteractiveMs ?? "-"}ms marks=${summary.totalMarks}`);
		if (this.pendingLogs.length < MAX_PENDING_LOGS) this.pendingLogs.push({
			timestamp: Date.now(),
			level: "info",
			message: "startup.perf",
			...traceId && spanId ? {
				traceId,
				spanId
			} : {},
			attributes
		});
		this.onStartupPerfRecorded?.();
	}
	/**
	* 记录原始 startup JSONL，供伽利略侧复制后直接丢进外部 startup-report.html 展示。
	*/
	recordStartupJsonl(jsonlText, summary, traceId) {
		if (this.pendingLogs.length >= MAX_PENDING_LOGS) return;
		const truncated = jsonlText.length > MAX_STARTUP_JSONL_CHARS;
		const jsonl = truncated ? jsonlText.slice(0, MAX_STARTUP_JSONL_CHARS) : jsonlText;
		const spanId = traceId ? require_startup_perf_exporters.getStartupRootSpanId(traceId) : void 0;
		this.pendingLogs.push({
			timestamp: Date.now(),
			level: "info",
			message: "startup.jsonl",
			...traceId && spanId ? {
				traceId,
				spanId
			} : {},
			attributes: {
				event: "workbuddy.startup.jsonl",
				...buildTraceTags(traceId, spanId),
				startup_type: summary.startupType,
				flow_type: summary.flowType,
				total_ms: summary.totalMs,
				...typeof summary.firstInteractiveMs === "number" ? { first_interactive_ms: summary.firstInteractiveMs } : {},
				total_marks: summary.totalMarks,
				jsonl_bytes: Buffer.byteLength(jsonlText, "utf-8"),
				jsonl_lines: jsonlText.split("\n").filter(Boolean).length,
				jsonl_truncated: truncated,
				jsonl
			}
		});
		this.onStartupPerfRecorded?.();
	}
	/**
	* 2.3-A · LogExporter：每条对齐后的 mark → 1 条 `startup.mark` LogRecord。
	*
	* 比 summary 行更细粒度，支持在伽利略按 `tags.mark_id` / `tags.phase` 下钻单点耗时。
	* 受 MAX_PENDING_LOGS 限额保护（超出丢弃，避免撑爆 buffer）；version/platform 等
	* 环境字段由 GalileoExporter.resource 注入，这里不重复带。
	*/
	recordStartupMarks(marks, summary, traceId) {
		const now = Date.now();
		const located = marks.filter((m) => typeof m.absEpoch === "number");
		const startAbsEpoch = located.length > 0 ? Math.min(...located.map((m) => m.absEpoch)) : void 0;
		const roundMs = (value) => Math.round(value * 100) / 100;
		for (const m of marks) {
			if (this.pendingLogs.length >= MAX_PENDING_LOGS) break;
			const offsetMs = typeof m.absEpoch === "number" && startAbsEpoch !== void 0 ? roundMs(m.absEpoch - startAbsEpoch) : void 0;
			const spanId = traceId ? require_startup_perf_exporters.getStartupMarkSpanId(traceId, m) : void 0;
			this.pendingLogs.push({
				timestamp: typeof m.absEpoch === "number" ? Math.round(m.absEpoch) : now,
				level: "info",
				message: "startup.mark",
				...traceId && spanId ? {
					traceId,
					spanId
				} : {},
				attributes: {
					...buildTraceTags(traceId, spanId),
					mark_id: m.id,
					mark_key: m.key,
					phase: m.phase,
					proc: m.proc,
					startup_type: summary.startupType,
					flow_type: summary.flowType,
					...offsetMs !== void 0 ? {
						abs_epoch: offsetMs,
						offset_ms: offsetMs
					} : {},
					...typeof m.absEpoch === "number" ? { absolute_epoch_ms: Math.round(m.absEpoch) } : {},
					...m.id === "E8" && offsetMs !== void 0 ? {
						first_interactive_ms: offsetMs,
						is_first_interactive: true
					} : {}
				}
			});
		}
		this.onStartupPerfRecorded?.();
	}
};
//#endregion
//#region src/main/features/monitor/aegis-config.ts
/**
* Aegis 监控配置常量
*
* 主进程（aegis-electron-sdk-v2）和渲染进程（aegis-web-sdk-v2 via @genie/monitor）
* 共用的硬编码配置。
*
* 修改这些常量前请确认：
*   - AEGIS_APP_ID 来自 Galileo 平台分配，区分项目
*   - AEGIS_REPORT_URL 必须是当前环境（公网/内网）能正常访问的上报端点
*/
/** Galileo 项目 ID（与 packages/monitor 共用同一项目） */
var AEGIS_APP_ID = "SDK-768de26ec97715a3bbab";
/** 上报 endpoint */
var AEGIS_REPORT_URL = "https://galileotelemetry.tencent.com/collect";
/** Aegis SDK 上报请求超时（毫秒）：默认 1s（默认 200ms 在弱网下经常误判） */
var AEGIS_REPORT_TIMEOUT_MS = 1e3;
//#endregion
//#region src/main/features/monitor/exporters/aegis-exporter.ts
function pickDefinedExt(ext) {
	if (!ext) return {};
	const out = {};
	for (const key of Object.keys(ext)) {
		const value = ext[key];
		if (value !== void 0) out[key] = value;
	}
	return out;
}
var AEGIS_EXT_MAX_LEN = 1024;
/**
* Pre-bootstrap buffer 容量上限。
*
* Aegis bootstrap() 在 monitorService.start() 中触发，而 start() 被推迟到
* daemon→main metric bridge 装配之后才调用（见 main-bootstrap.ts L692）。
* 中间窗口内（domain 注册的生命周期 metric / migration collector 等）
* 任何 reportEvent/reportTime/reportError/info 都会因 aegisInstance===null
* 而被静默丢弃。
*
* 这里把调用先暂存到内存 FIFO 队列，bootstrap 完成时 flush 一次：
*   - 200 条足够覆盖启动期所有业务 metric（实际观测 < 30 条）
*   - 超出 cap 时丢最旧（保留近期），避免泄漏内存
*   - 仅在 SDK 未就绪时累积；就绪后即直接 SDK 调用，不再入队
*/
var AEGIS_PENDING_BUFFER_CAP = 200;
function truncateJson(value, maxLen) {
	let json;
	try {
		json = JSON.stringify(value);
	} catch {
		return "";
	}
	if (!json) return "";
	return json.length <= maxLen ? json : `${json.slice(0, maxLen - 1)}…`;
}
var AegisExporter = class extends AbstractExporter {
	aegisInstance = null;
	bootstrapOptions = {};
	initPromise = null;
	/**
	* Renderer 推过来的 sessionId 暂存。
	*
	* 时序：renderer 的 Aegis 初始化结束后会把 sessionId IPC 给主进程，但此时主进程
	* Aegis 实例不一定就绪（initialize 异步、用户登录前可能未触发 bootstrap）。
	* 这里先暂存，onInitialize 完成后立即 apply 一次；后续如 renderer 重建 session
	* 再次 IPC 也会覆盖此字段并重新 apply。
	*/
	pendingRendererSessionId;
	/**
	* SDK 未就绪时的事件 FIFO 队列。bootstrap 完成时由 flushPendingCalls() 一次性 replay。
	* cap=AEGIS_PENDING_BUFFER_CAP，超出按先进先出丢弃最旧条目。
	*/
	pendingCalls = [];
	constructor() {
		super("AegisExporter", true);
	}
	/**
	* Aegis 通道初始化入口（与 base.initialize 不同，需传 options）。
	* - 重复调用幂等；并发调用合并到同一 promise
	* - 失败容忍：内部 try/catch，不抛错、不影响主进程启动
	*/
	async bootstrap(options = {}) {
		if (this.connected) return;
		if (this.initPromise) return this.initPromise;
		if (options.disabled) {
			require_logger$2.mainLog.info("[AegisExporter] disabled by options, skipping");
			return;
		}
		if (!electron.app.isReady()) {
			require_logger$2.mainLog.warn("[AegisExporter] app not ready yet, skipping initialize");
			return;
		}
		this.bootstrapOptions = options;
		this.initPromise = this.initialize().catch((error) => {
			require_logger$2.mainLog.warn("[AegisExporter] bootstrap failed (degraded to noop):", error);
		}).finally(() => {
			this.initPromise = null;
		});
		return this.initPromise;
	}
	async onInitialize() {
		const AegisCtor = await this.loadSdk();
		if (!AegisCtor) throw new Error("Aegis SDK not loaded");
		const options = this.bootstrapOptions;
		const version = options.version ?? electron.app.getVersion();
		const environment = options.environment ?? (process.env.NODE_ENV === "development" ? "development" : "production");
		const processPerformanceEnabled = typeof options.processPerformanceIntervalMin === "number";
		const networkEnabled = typeof options.networkIntervalMin === "number";
		const processPerformanceIntervalMin = options.processPerformanceIntervalMin ?? 5;
		const networkIntervalMin = options.networkIntervalMin ?? 5;
		this.aegisInstance = new AegisCtor({
			id: AEGIS_APP_ID,
			version,
			uin: options.userId,
			uid: options.userId,
			hostUrl: AEGIS_REPORT_URL,
			compress: true,
			extField: {
				wb_process: "main",
				wb_version: version,
				appVersion: version,
				wb_env: environment,
				...options.patchName ? { wb_patch_name: options.patchName } : {}
			},
			env: environment,
			processPerformanceInterval: processPerformanceIntervalMin,
			networkInterval: networkIntervalMin,
			requestTimeout: AEGIS_REPORT_TIMEOUT_MS,
			plugin: {
				error: true,
				pv: true,
				processPerformance: processPerformanceEnabled,
				network: networkEnabled,
				crash: true,
				device: true,
				session: true
			}
		});
		require_logger$2.mainLog.info("[AegisExporter] initialized", {
			appId: AEGIS_APP_ID,
			version,
			environment,
			hasUid: !!options.userId
		});
		try {
			this.aegisInstance?.reportEvent({
				name: "main_process_start",
				ext1: version,
				ext2: environment
			});
		} catch (error) {
			require_logger$2.mainLog.warn("[AegisExporter] reportEvent main_process_start failed:", error);
		}
		if (this.pendingRendererSessionId) this.applySessionIdToInstance(this.pendingRendererSessionId);
		this.flushPendingCalls();
	}
	async onShutdown() {
		if (!this.aegisInstance) return;
		try {
			this.aegisInstance.destroy?.();
			require_logger$2.mainLog.info("[AegisExporter] destroyed");
		} catch (error) {
			require_logger$2.mainLog.warn("[AegisExporter] destroy failed:", error);
		} finally {
			this.aegisInstance = null;
		}
	}
	/**
	* AegisExporter 不消费 metrics 通道（SDK 已自动采集 Performance/Network/Crash/PV）。
	* 调用方应使用 reportEvent / reportTime / reportError 等事件式 API。
	*/
	async onExport(metrics) {
		if (metrics.length > 0) require_logger$2.mainLog.warn("[AegisExporter] metrics export not supported, use reportEvent/reportTime/reportError instead", { droppedCount: metrics.length });
	}
	/**
	* 把 renderer 端 Aegis 的 sessionId 同步到主进程 Aegis 实例。
	*
	* 让 main / renderer 两个 SDK 实例在同一次会话里上报相同的 session.id，
	* 便于在伽利略后台按 session 维度聚合"同一次启动"的全部上报。
	*
	* 幂等：同一 sessionId 多次 apply 不会副作用；不同 sessionId 会覆盖前值。
	* 注意：electron-sdk 的 session 插件 onNewAegis 内部会先写一次自己生成的 ID，
	* 所以本方法必须晚于 SDK 实例化才生效；未就绪时会暂存到 onInitialize 末尾再 apply。
	*/
	applyRendererSessionId(sessionId) {
		if (!sessionId) return;
		this.pendingRendererSessionId = sessionId;
		if (!this.aegisInstance) return;
		this.applySessionIdToInstance(sessionId);
	}
	applySessionIdToInstance(sessionId) {
		if (!this.aegisInstance) return;
		try {
			this.aegisInstance.updateSnapshootInfo?.({ session: { id: sessionId } });
			require_logger$2.mainLog.info("[AegisExporter] applyRendererSessionId", { sessionId });
		} catch (error) {
			require_logger$2.mainLog.warn("[AegisExporter] applyRendererSessionId failed:", error);
		}
	}
	setUserId(userId) {
		this.bootstrapOptions = {
			...this.bootstrapOptions,
			userId
		};
		if (!this.aegisInstance) return;
		try {
			this.aegisInstance.setConfig?.({ uid: userId });
		} catch (error) {
			require_logger$2.mainLog.warn("[AegisExporter] setUserId failed:", error);
		}
	}
	reportEvent(name, ext) {
		if (!this.aegisInstance) {
			this.enqueuePending({
				kind: "event",
				name,
				ext
			});
			return;
		}
		try {
			this.aegisInstance.reportEvent({
				name,
				...pickDefinedExt(ext)
			});
		} catch (error) {
			require_logger$2.mainLog.warn(`[AegisExporter] reportEvent ${name} failed:`, error);
		}
	}
	reportTime(name, duration, ext) {
		if (!this.aegisInstance) {
			this.enqueuePending({
				kind: "time",
				name,
				duration,
				ext
			});
			return;
		}
		try {
			this.aegisInstance.reportTime({
				name,
				duration,
				...pickDefinedExt(ext)
			});
		} catch (error) {
			require_logger$2.mainLog.warn(`[AegisExporter] reportTime ${name} failed:`, error);
		}
	}
	reportError(err) {
		if (!this.aegisInstance) {
			this.enqueuePending({
				kind: "error",
				err
			});
			return;
		}
		try {
			this.aegisInstance.error(err);
		} catch (error) {
			require_logger$2.mainLog.warn("[AegisExporter] reportError failed:", error);
		}
	}
	info(msg) {
		if (!this.aegisInstance) {
			this.enqueuePending({
				kind: "info",
				msg
			});
			return;
		}
		try {
			this.aegisInstance.info(msg);
		} catch (error) {
			require_logger$2.mainLog.warn("[AegisExporter] info failed:", error);
		}
	}
	/**
	* 把调用塞进 pre-bootstrap 队列（FIFO，超 cap 丢最旧）。
	*
	* 不在这里检查 disabled / aegisEnabled：bootstrap 中如果走 disabled 分支
	* 不会 flushPendingCalls，队列里的条目随 GC 释放即可。
	*/
	enqueuePending(call) {
		if (this.pendingCalls.length >= AEGIS_PENDING_BUFFER_CAP) this.pendingCalls.shift();
		this.pendingCalls.push(call);
	}
	/**
	* SDK 就绪后回放 pre-bootstrap 队列。
	*
	* 注意：必须在 aegisInstance 赋值之后调用，否则 reportEvent/reportTime
	* 内部会因 aegisInstance===null 再次入队，形成无限循环。
	*/
	flushPendingCalls() {
		if (this.pendingCalls.length === 0 || !this.aegisInstance) return;
		const drained = this.pendingCalls.splice(0, this.pendingCalls.length);
		require_logger$2.mainLog.info(`[AegisExporter] flushing ${drained.length} pre-bootstrap calls`);
		for (const call of drained) try {
			switch (call.kind) {
				case "event":
					this.aegisInstance.reportEvent({
						name: call.name,
						...pickDefinedExt(call.ext)
					});
					break;
				case "time":
					this.aegisInstance.reportTime({
						name: call.name,
						duration: call.duration,
						...pickDefinedExt(call.ext)
					});
					break;
				case "error":
					this.aegisInstance.error(call.err);
					break;
				case "info":
					this.aegisInstance.info(call.msg);
					break;
			}
		} catch (error) {
			require_logger$2.mainLog.warn(`[AegisExporter] flushPendingCalls ${call.kind} failed:`, error);
		}
	}
	/** 供单测验证 buffer 状态（不要在业务代码中使用）。 */
	getPendingCallsCountForTest() {
		return this.pendingCalls.length;
	}
	/** OTel LogRecord[] 翻译为 Aegis 事件并发送，与 GalileoExporter 双发。 */
	async exportLogs(records) {
		if (!this.aegisInstance || records.length === 0) return;
		for (const record of records) try {
			this.dispatchLogRecord(record);
		} catch (error) {
			require_logger$2.mainLog.warn(`[AegisExporter] exportLogs item ${record.message} failed:`, error);
		}
	}
	dispatchLogRecord(record) {
		if (!this.aegisInstance) return;
		const attrs = record.attributes ?? {};
		const level = (record.level || "").toLowerCase();
		if (level === "error" || level === "fatal") {
			const payload = `${record.message} ${truncateJson(attrs, AEGIS_EXT_MAX_LEN)}`;
			this.aegisInstance.error(payload);
			return;
		}
		const traceFields = record.traceId && record.spanId ? {
			traceID: record.traceId,
			spanID: record.spanId,
			traceId: record.traceId,
			spanId: record.spanId,
			trace_id: record.traceId,
			span_id: record.spanId
		} : {};
		this.aegisInstance.reportEvent({
			name: record.message,
			ext1: String(attrs.status ?? attrs.event ?? ""),
			ext2: String(attrs.migration_type ?? attrs.type ?? ""),
			ext3: truncateJson(attrs, AEGIS_EXT_MAX_LEN),
			...traceFields,
			...attrs
		});
	}
	async loadSdk() {
		try {
			const sdkModule = await import("@tencent/aegis-electron-sdk-v2");
			const AegisCtor = sdkModule.default ?? sdkModule;
			if (typeof AegisCtor !== "function") {
				require_logger$2.mainLog.warn("[AegisExporter] unexpected SDK shape", { keys: Object.keys(sdkModule) });
				return null;
			}
			return AegisCtor;
		} catch (error) {
			require_logger$2.mainLog.error("[AegisExporter] load SDK failed:", error);
			return null;
		}
	}
};
//#endregion
//#region src/main/features/monitor/desktop-monitor-service.ts
/**
* 给 GalileoExporter 注入自定义 HTTPClient：通过 installUndiciProxyDispatcher() 走全局代理，
* 并打 [NetLog] 日志便于排查上报问题。
*/
function createDesktopGalileoHttpClient() {
	return { async post(url, data, config) {
		const controller = new AbortController();
		const timeout = config?.timeout || 3e4;
		const timeoutId = setTimeout(() => controller.abort(), timeout);
		const startedAt = Date.now();
		const proxyDesc = require_net_log.describeProxyForLog(url);
		try {
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					...config?.headers || {}
				},
				body: JSON.stringify(data),
				signal: controller.signal
			});
			const responseData = await response.json().catch(() => ({}));
			require_net_log.logNetRequest({
				method: "POST",
				url,
				proxy: proxyDesc,
				status: response.status,
				durationMs: Date.now() - startedAt,
				source: "GalileoExporter"
			});
			return {
				status: response.status,
				statusText: response.statusText,
				data: responseData
			};
		} catch (error) {
			const normalized = (error instanceof Error ? error.name : void 0) === "AbortError" ? /* @__PURE__ */ new Error(`Request timeout after ${timeout}ms`) : error;
			require_net_log.logNetRequest({
				method: "POST",
				url,
				proxy: proxyDesc,
				durationMs: Date.now() - startedAt,
				error: normalized,
				source: "GalileoExporter"
			});
			throw normalized;
		} finally {
			clearTimeout(timeoutId);
		}
	} };
}
function isStartupTelemetryLog(_log) {
	return false;
}
var sharedInstance;
var DesktopMonitorService = class {
	galileoExporter;
	aegisExporter = new AegisExporter();
	galileoConfig;
	getUserId;
	appVersion;
	migrationCollector;
	cliHealthCollector;
	chatPerfCollector;
	historyLoadCollector;
	startupPerfCollector;
	collectors;
	/** loadSession 到达主进程的时间戳暂存。key 优先用 renderer 的 requestId，兼容旧调用退回 sessionId。 */
	mainLoadTimestamps = /* @__PURE__ */ new Map();
	enabled;
	aegisEnabled;
	patchName;
	collectTimer;
	started = false;
	collectInterval;
	processPerformanceIntervalMin;
	networkIntervalMin;
	constructor(config) {
		this.enabled = config?.enabled ?? true;
		this.aegisEnabled = config?.aegisEnabled ?? false;
		this.patchName = config?.patchName;
		this.collectInterval = config?.collectInterval ?? 6e4;
		this.processPerformanceIntervalMin = config?.processPerformanceIntervalMin;
		this.networkIntervalMin = config?.networkIntervalMin;
		this.getUserId = config?.getUserId;
		this.appVersion = config?.appVersion ?? electron.app.getVersion();
		const isPackaged = electron.app.isPackaged;
		const galileoConfig = {
			enabled: this.enabled,
			endpoint: config?.galileoEndpoint ?? "https://galileotelemetry.tencent.com",
			batchSize: 50,
			flushInterval: 3e4,
			timeout: 1e4,
			userId: config?.getUserId?.(),
			useOtelJsonLogFields: true,
			resource: {
				target: "ElectronApp.WorkBuddy.Desktop",
				envName: isPackaged ? "formal" : "test",
				namespace: process.env.NODE_ENV === "development" ? "Development" : "Production",
				instance: `desktop-${Date.now()}`,
				version: this.appVersion,
				ideType: "workbuddy-desktop",
				ideVersion: this.appVersion,
				os: `${process.platform}-${process.arch}`,
				ext1: "desktop"
			}
		};
		this.galileoConfig = galileoConfig;
		this.galileoExporter = new GalileoExporter(galileoConfig, void 0, createDesktopGalileoHttpClient());
		this.migrationCollector = new MigrationCollector();
		this.cliHealthCollector = new CliHealthCollector();
		this.chatPerfCollector = new ChatPerformanceCollector();
		this.historyLoadCollector = new HistoryLoadCollector();
		this.startupPerfCollector = new StartupPerfCollector();
		this.chatPerfCollector.onMessageDisplayRecorded = () => {
			this.flushNow().catch((err) => {
				require_logger$2.mainLog.warn("[DesktopMonitor] flushNow on display recorded failed:", err);
			});
		};
		this.startupPerfCollector.onStartupPerfRecorded = () => {
			this.flushNow().catch((err) => {
				require_logger$2.mainLog.warn("[DesktopMonitor] flushNow on startup perf recorded failed:", err);
			});
		};
		this.collectors = [
			this.migrationCollector,
			this.cliHealthCollector,
			this.chatPerfCollector,
			this.historyLoadCollector,
			this.startupPerfCollector
		];
	}
	async start() {
		if (this.started || !this.enabled) return;
		if (this.aegisEnabled) this.aegisExporter.bootstrap({
			version: this.appVersion,
			userId: this.getUserId?.(),
			patchName: this.patchName,
			processPerformanceIntervalMin: this.processPerformanceIntervalMin,
			networkIntervalMin: this.networkIntervalMin
		}).catch((error) => {
			require_logger$2.mainLog.warn("[DesktopMonitor] Aegis init (fallback) failed:", error);
		});
		else require_logger$2.mainLog.info("[DesktopMonitor] Aegis disabled by Galileo feature flag");
		this.galileoExporter.initialize().catch((error) => {
			require_logger$2.mainLog.error("[DesktopMonitor] Exporter init failed (non-fatal):", error instanceof Error ? error.message : String(error));
		});
		for (const collector of this.collectors) try {
			await collector.start();
		} catch (error) {
			require_logger$2.mainLog.error(`[DesktopMonitor] Collector ${collector.name} start failed:`, error instanceof Error ? error.message : String(error));
		}
		this.collectTimer = setInterval(() => {
			this.collectAndExportLogs().catch((err) => {
				require_logger$2.mainLog.error("[DesktopMonitor] Collect/export error:", err instanceof Error ? err.message : String(err));
			});
		}, this.collectInterval);
		this.started = true;
		require_logger$2.mainLog.info("[DesktopMonitor] Started");
		cleanStalePendingTelemetry();
	}
	async stop() {
		if (!this.started) return;
		if (this.collectTimer) {
			clearInterval(this.collectTimer);
			this.collectTimer = void 0;
		}
		try {
			await this.collectAndExportLogs();
			for (const collector of this.collectors) await collector.stop();
			await this.galileoExporter.shutdown();
		} catch (error) {
			require_logger$2.mainLog.error("[DesktopMonitor] Error during stop:", error instanceof Error ? error.message : String(error));
		}
		try {
			await this.aegisExporter.shutdown();
		} catch (error) {
			require_logger$2.mainLog.warn("[DesktopMonitor] Aegis shutdown failed:", error);
		}
		this.started = false;
		require_logger$2.mainLog.info("[DesktopMonitor] Stopped");
	}
	getMigrationCollector() {
		return this.migrationCollector;
	}
	getCliHealthCollector() {
		return this.cliHealthCollector;
	}
	getChatPerfCollector() {
		return this.chatPerfCollector;
	}
	getHistoryLoadCollector() {
		return this.historyLoadCollector;
	}
	getStartupPerfCollector() {
		return this.startupPerfCollector;
	}
	/** 上报 crash 日志到伽利略（供 CrashLogExporter transport 桥接） */
	async exportCrashLogs(logs) {
		if (this.galileoExporter && typeof this.galileoExporter.exportLogs === "function") await this.galileoExporter.exportLogs(logs);
	}
	/** galileo exporter 是否已连接就绪，供 repair flush 等需要感知 ready 状态的调用方使用 */
	isGalileoConnected() {
		return !!this.galileoExporter?.isConnected();
	}
	/**
	* 上报 trace spans 到伽利略（POST /v1/traces）。
	* 复用 GalileoExporter 通道，避免在 main 进程另接 galileo-node-sdk。
	*/
	async exportTraces(spans) {
		if (this.galileoExporter && typeof this.galileoExporter.exportTraces === "function") await this.galileoExporter.exportTraces(spans);
	}
	/** 当前伽利略上报 target（= galileoConfig.resource.target），供手动打 span 时填充 attribute */
	getGalileoTarget() {
		return this.galileoExporter.getTargetService();
	}
	/** 当前 WorkBuddy 版本，供启动测速等上报维度使用。 */
	getAppVersion() {
		return this.appVersion;
	}
	/** 记录时延样本（duration ms）。维度 value 必须 string，调用方自行 String() 转换。 */
	recordDuration(metric, durationMs, dimensions) {
		if (!this.enabled) return;
		this.aegisExporter.reportTime(metric, durationMs, this.normalizeDimensions(dimensions));
	}
	/** Counter 增量上报。count <= 0 直接忽略（OTel 规范：Counter 必须单调递增）。 */
	addCounter(metric, count, dimensions) {
		if (!this.enabled || count <= 0) return;
		this.aegisExporter.reportEvent(metric, {
			...this.normalizeDimensions(dimensions),
			count
		});
	}
	/** 维度归一化：number/boolean/null/undefined → string 或丢空，避免 SDK 序列化静默丢字段。 */
	normalizeDimensions(dimensions) {
		const out = {};
		if (dimensions) for (const [k, v] of Object.entries(dimensions)) {
			if (v == null) continue;
			out[k] = typeof v === "string" ? v : String(v);
		}
		return out;
	}
	recordMainLoadTime(key) {
		this.mainLoadTimestamps.set(key, Date.now());
	}
	getAndClearMainLoadTime(key) {
		const t = this.mainLoadTimestamps.get(key);
		if (t) this.mainLoadTimestamps.delete(key);
		return t;
	}
	/** 立即采集并导出（用于 crash 等紧急场景，避免日志丢失） */
	async flushNow() {
		if (!this.started) return;
		await this.collectAndExportLogs();
	}
	async collectAndExportLogs() {
		if (this.getUserId) {
			const uid = this.getUserId();
			if (uid) {
				this.galileoConfig.userId = uid;
				this.aegisExporter.setUserId(uid);
			}
		}
		const allLogs = [];
		for (const collector of this.collectors) {
			if (!collector.isRunning()) continue;
			try {
				const logs = await collector.collectLogs();
				allLogs.push(...logs);
			} catch (error) {
				require_logger$2.mainLog.error(`[DesktopMonitor] Collector ${collector.name} log collection error:`, error instanceof Error ? error.message : String(error));
			}
		}
		if (allLogs.length > 0) {
			if (this.patchName) for (const log of allLogs) {
				if (!log.attributes) log.attributes = {};
				log.attributes.patchName = this.patchName;
			}
			const aegisLogs = allLogs.filter((log) => !isStartupTelemetryLog(log));
			const [galileoResult, aegisResult] = await Promise.allSettled([this.galileoExporter.exportLogs(allLogs), aegisLogs.length > 0 ? this.aegisExporter.exportLogs(aegisLogs) : Promise.resolve()]);
			if (galileoResult.status === "fulfilled") require_logger$2.mainLog.info(`[DesktopMonitor] Exported ${allLogs.length} logs to Galileo`);
			else {
				const err = galileoResult.reason;
				require_logger$2.mainLog.error(`[DesktopMonitor] Galileo export failed (${allLogs.length} logs):`, err instanceof Error ? err.message : String(err));
			}
			if (aegisResult.status === "rejected") {
				const err = aegisResult.reason;
				require_logger$2.mainLog.warn(`[DesktopMonitor] Aegis export failed (${allLogs.length} logs):`, err instanceof Error ? err.message : String(err));
			}
		}
	}
	static setSharedInstance(instance) {
		sharedInstance = instance;
	}
	static getSharedInstance() {
		return sharedInstance;
	}
	/**
	* 同步用户 ID 到两条上报通道。
	* collectAndExportLogs() 每次会用 getUserId() 重新覆盖 galileoConfig.userId，
	* 所以这里主要服务于"未配置 getUserId、但手动调用 setUserId"的场景。
	*/
	setUserId(userId) {
		this.aegisExporter.setUserId(userId);
		this.galileoConfig.userId = userId;
	}
	reportAegisEvent(name, ext) {
		this.aegisExporter.reportEvent(name, ext);
	}
	reportAegisTime(name, durationMs, ext) {
		this.aegisExporter.reportTime(name, durationMs, ext);
	}
	reportAegisError(err) {
		this.aegisExporter.reportError(err);
	}
	isAegisInitialized() {
		return this.aegisExporter.isConnected();
	}
	/**
	* 把 renderer 端 Aegis 的 sessionId 同步给主进程 Aegis 实例，
	* 让两端在同一个 Galileo session 维度聚合（IPC: monitor:syncRendererSessionId）。
	*/
	applyRendererSessionId(sessionId) {
		if (!this.enabled || !this.aegisEnabled) return;
		this.aegisExporter.applyRendererSessionId(sessionId);
	}
};
//#endregion
Object.defineProperty(exports, "DesktopMonitorService", {
	enumerable: true,
	get: function() {
		return DesktopMonitorService;
	}
});
