import { n as __esmMin } from "./chunk-BRZcfu7K.js";
//#region ../../packages/agent-ui/src/utils/http-logger/body-summarizer.ts
/**
* 把任意 body 转成日志友好的字符串摘要。返回空串表示不打。
*
* 数组优化：长数组（>5 项）打前 3 项 + 省略提示，并附 `len=N`，避免日志爆炸。
*/
function summarizeBodyForLog(body, maxChars = DEFAULT_BODY_MAX_CHARS$1) {
	if (typeof FormData !== "undefined" && body instanceof FormData) return summarizeFormData(body, maxChars);
	if (typeof Blob !== "undefined" && body instanceof Blob) return `<Blob size=${body.size} type=${body.type || "?"}>`;
	if (typeof ArrayBuffer !== "undefined" && body instanceof ArrayBuffer) return `<ArrayBuffer byteLength=${body.byteLength}>`;
	if (typeof ReadableStream !== "undefined" && body instanceof ReadableStream) return "<ReadableStream>";
	if (typeof URLSearchParams !== "undefined" && body instanceof URLSearchParams) return truncate(redactQueryString(body.toString()), maxChars);
	if (typeof body === "string") {
		const trimmed = body.trim();
		if (trimmed.startsWith("{") || trimmed.startsWith("[")) try {
			const compact = compactForLog(JSON.parse(trimmed));
			return truncate(JSON.stringify(compact), maxChars);
		} catch {}
		return truncate(body, maxChars);
	}
	if (typeof body === "object" && body !== null) try {
		const compact = compactForLog(body);
		return truncate(JSON.stringify(compact), maxChars);
	} catch {
		return "<unstringifiable>";
	}
	return truncate(String(body), maxChars);
}
/** FormData 摘要：列出 key 与值的类型/长度，跳过 File 内容。 */
function summarizeFormData(form, maxChars) {
	const parts = [];
	try {
		form.forEach((value, key) => {
			if (isSensitiveField(key)) parts.push(`${key}=***`);
			else if (typeof File !== "undefined" && value instanceof File) parts.push(`${key}=<File name=${value.name} size=${value.size}>`);
			else if (typeof Blob !== "undefined" && value instanceof Blob) parts.push(`${key}=<Blob size=${value.size}>`);
			else {
				const s = String(value);
				parts.push(`${key}=${s.length > 80 ? s.slice(0, 80) + "…" : s}`);
			}
		});
	} catch {
		return "<FormData>";
	}
	return truncate(`<FormData ${parts.join("&")}>`, maxChars);
}
/**
* 为日志输出做紧凑化处理：长数组裁剪 + 敏感字段去值 + 深度限制。
* 不修改原对象，只用于 log 出口。
*/
function compactForLog(obj, depth = 0) {
	if (depth > 6) return "<deep>";
	if (obj === null || obj === void 0) return obj;
	if (Array.isArray(obj)) {
		if (obj.length > 5) return [...obj.slice(0, 3).map((v) => compactForLog(v, depth + 1)), `…+${obj.length - 3} more (len=${obj.length})`];
		return obj.map((v) => compactForLog(v, depth + 1));
	}
	if (typeof obj === "object") {
		const out = {};
		for (const [k, v] of Object.entries(obj)) if (isSensitiveField(k)) out[k] = "***";
		else if (typeof v === "string" && v.length > 200) out[k] = `${v.slice(0, 200)}…(+${v.length - 200}chars)`;
		else out[k] = compactForLog(v, depth + 1);
		return out;
	}
	return obj;
}
function truncate(s, maxChars) {
	if (s.length <= maxChars) return s;
	return s.slice(0, maxChars) + `…(+${s.length - maxChars}chars)`;
}
function isSensitiveField(key) {
	const lower = key.toLowerCase();
	return SENSITIVE_FIELD_FRAGMENTS.some((frag) => lower.includes(frag));
}
function redactQueryString(qs) {
	return qs.split("&").map((pair) => {
		const eq = pair.indexOf("=");
		if (eq < 0) return pair;
		const k = pair.slice(0, eq);
		return isSensitiveField(k) ? `${k}=***` : pair;
	}).join("&");
}
var DEFAULT_BODY_MAX_CHARS$1, SENSITIVE_FIELD_FRAGMENTS;
var init_body_summarizer = __esmMin((() => {
	DEFAULT_BODY_MAX_CHARS$1 = 800;
	SENSITIVE_FIELD_FRAGMENTS = [
		"token",
		"signature",
		"secret",
		"password",
		"passwd",
		"apikey",
		"api_key",
		"authorization"
	];
}));
//#endregion
//#region ../../packages/agent-ui/src/utils/http-logger/pick-trace-id.ts
/**
* 从一个抽象的 header getter 中按候选顺序取出 traceId，未命中返回空串。
*
* `allowedNames` 用于 CORS 跨域场景：浏览器对未在 `Access-Control-Expose-Headers`
* 列表里的 header 调用 `.get()` 会主动打 console warning（且 JS 层 `try/catch`
* 拦不住），所以传入"已知可读 header 集合"提前过滤，未命中的候选直接跳过、不调 getter。
* 不传则默认全部尝试（同源场景没有 CORS 限制）。
*/
function pickTraceId(getHeader, allowedNames) {
	for (const name of TRACE_HEADER_CANDIDATES) {
		if (allowedNames && !allowedNames.has(name.toLowerCase())) continue;
		let raw;
		try {
			raw = getHeader(name);
		} catch {
			continue;
		}
		if (!raw) continue;
		const parsed = parseTraceHeaderValue(name, raw);
		if (parsed) return parsed;
	}
	return "";
}
/**
* 判断一个响应 URL 是否同源；同源时浏览器无 CORS 限制，可以读所有 header。
* 解析失败按"非同源"处理，走更保守的白名单路径。
*/
function isSameOriginUrl(url) {
	if (!url || typeof location === "undefined") return true;
	try {
		return new URL(url, location.href).origin === location.origin;
	} catch {
		return false;
	}
}
/**
* 从 fetch Response.headers 抽 traceId。
*
* fetch 的 `Response.headers` 已是浏览器按 CORS 规则**过滤后**的视图：跨域响应里只保留
* safelisted + `Access-Control-Expose-Headers` 显式暴露的 header，未暴露的 header 在
* JS 层根本看不到，`headers.get(name)` 直接返回 `null`，**不会**像 XHR 的
* `getResponseHeader()` 那样打 "Refused to get unsafe header" 警告。
*
* 所以这里直接逐个候选 `get` 即可，**不需要也不应该**再按 `Access-Control-Expose-Headers`
* 预过滤：
*   1. `Access-Control-Expose-Headers` 自身通常不在暴露名单里，JS 多半读不到 → 预过滤会
*      退化成"仅 safelisted"，把服务端已 expose 的 `X-Trace-Id` / `X-Tps-Trace-Id` 误杀，
*      导致跨域 fetch 日志丢 traceId；
*   2. 即便能读到该 header，对已被浏览器过滤过的 `Response.headers` 再过滤也是多余。
*/
function pickTraceIdFromResponse(response) {
	return pickTraceId((name) => {
		try {
			return response.headers.get(name);
		} catch {
			return null;
		}
	});
}
/**
* 从 XMLHttpRequest 抽 traceId。
*
* 同 fetch：跨域时仅枚举 `getAllResponseHeaders()` 已暴露的 header（这是浏览器允许的 API，
* 不会触发 unsafe header 警告）；同源时全量尝试。
*/
function pickTraceIdFromXhr(xhr) {
	const responseUrl = xhr.responseURL;
	return pickTraceId((name) => {
		try {
			return xhr.getResponseHeader(name);
		} catch {
			return null;
		}
	}, isSameOriginUrl(responseUrl) ? null : readXhrExposedHeaderNames(xhr));
}
/**
* 解析 XHR 跨域响应里允许读的 header 名集合（小写）。
*
* 关键细节：
* 1. `getAllResponseHeaders()` 在跨域时只返回 safelisted + 显式 expose 的 header 名，
*    所以"出现在结果里"就等价于"可读"。
* 2. 若服务端用 `Access-Control-Expose-Headers: *` 通配符，浏览器在 `getAllResponseHeaders()`
*    的结果里**不会展开成具体 header 名**——但此时 `xhr.getResponseHeader(any)` 不会触发
*    unsafe header 警告（除 `Set-Cookie*` 等少量例外）。我们用一个特殊 sentinel 标记"全开"，
*    让 `pickTraceId` 跳过白名单过滤。
* 3. 拿不到任何 header 名 + 没有 `*` 时，按"最保守"处理，仅允许 safelisted 候选——
*    避免触发浏览器的 `Refused to get unsafe header` 警告（该警告无法被 try/catch 吞）。
*/
function readXhrExposedHeaderNames(xhr) {
	const set = /* @__PURE__ */ new Set();
	let raw = "";
	try {
		raw = xhr.getAllResponseHeaders() ?? "";
	} catch {}
	let exposeRaw = "";
	for (const line of raw.split(/\r?\n/)) {
		const colon = line.indexOf(":");
		if (colon <= 0) continue;
		const name = line.slice(0, colon).trim().toLowerCase();
		if (!name) continue;
		set.add(name);
		if (name === "access-control-expose-headers") exposeRaw = line.slice(colon + 1).trim();
	}
	if (isWildcardExpose(exposeRaw)) return null;
	return set;
}
/** `Access-Control-Expose-Headers: *` 判定（值可能含逗号分隔的其它项，但通常单独 `*`）。 */
function isWildcardExpose(value) {
	if (!value) return false;
	return value.split(",").some((p) => p.trim() === "*");
}
/**
* 解析带格式的 trace header 值；普通 header 直接 trim 返回。
*
* - `traceparent` (W3C): `<version>-<traceId>-<spanId>-<flags>`，取第 2 段
* - `X-Cloud-Trace-Context` (GCP): `<traceId>/<spanId>;o=<options>`，取 `/` 前
* - 其他：原值 trim
*/
function parseTraceHeaderValue(name, raw) {
	const v = raw.trim();
	if (!v) return "";
	const lower = name.toLowerCase();
	if (lower === "traceparent") {
		const parts = v.split("-");
		return parts.length >= 2 && parts[1] ? parts[1] : "";
	}
	if (lower === "x-cloud-trace-context") {
		const slash = v.indexOf("/");
		return slash > 0 ? v.slice(0, slash) : v;
	}
	return v;
}
var TRACE_HEADER_CANDIDATES;
var init_pick_trace_id = __esmMin((() => {
	TRACE_HEADER_CANDIDATES = [
		"X-Trace-Id",
		"X-Tps-Trace-Id",
		"X-Request-Id",
		"traceparent",
		"X-Cloud-Trace-Context",
		"X-B3-TraceId"
	];
}));
//#endregion
//#region ../../packages/agent-ui/src/utils/http-logger/url-sanitizer.ts
function isSensitiveKey(key) {
	const lower = key.toLowerCase();
	if (SENSITIVE_KEY_EXACT.has(lower)) return true;
	return SENSITIVE_KEY_FRAGMENTS.some((frag) => lower.includes(frag));
}
/**
* 用 URL 解析结果重建脱敏后的 path?query 字符串。
* 注意：调用方需保证传入的 url 已经是 URL 实例（绝对 URL 或在内部用 dummy base 解析过）。
*/
function buildSanitizedPathAndQuery(url) {
	const parts = [];
	url.searchParams.forEach((value, key) => {
		if (isSensitiveKey(key)) parts.push(`${key}=${SENSITIVE_PLACEHOLDER}`);
		else {
			const v = value.length > MAX_QUERY_VALUE_LEN ? `${value.slice(0, MAX_QUERY_VALUE_LEN)}…` : value;
			parts.push(`${key}=${v}`);
		}
	});
	return parts.length ? `${url.pathname}?${parts.join("&")}` : url.pathname;
}
/**
* 默认 URL 脱敏函数（黑名单模式）。
*
* 解析策略：
*   1. 先按绝对 URL 解析（http(s)://...）
*   2. 失败再用 dummy base（`http://_local_/`）按相对 URL 解析 —— 覆盖
*      `/api/v1/foo?access_token=xxx&sign=yyy` 这种 fetch 直接传相对路径的场景
*      （函数 matcher 业务里很常见，#49114 反馈）
*   3. 两次都失败才走"按 baseUrl 去前缀"的兜底（极少见，例如非 URL 形式的字符串）
*
* 这样可以避免相对 URL 的敏感 query 原样进 console / main.log。
*
* @param rawUrl  完整 URL（http(s)://...）或绝对/相对路径
* @param baseUrl 命中规则的 baseUrl（两次 URL 解析都失败时退化到去除该前缀）
*/
function defaultSanitizeUrl(rawUrl, baseUrl) {
	try {
		return buildSanitizedPathAndQuery(new URL(rawUrl));
	} catch {}
	if (rawUrl.includes("/") || rawUrl.includes("?")) try {
		return buildSanitizedPathAndQuery(new URL(rawUrl, "http://_sanitizer_local_/"));
	} catch {}
	return baseUrl && rawUrl.startsWith(baseUrl) ? rawUrl.slice(baseUrl.length) : rawUrl;
}
var SENSITIVE_KEY_EXACT, SENSITIVE_KEY_FRAGMENTS, SENSITIVE_PLACEHOLDER, MAX_QUERY_VALUE_LEN;
var init_url_sanitizer = __esmMin((() => {
	SENSITIVE_KEY_EXACT = new Set(["sign", "key"]);
	SENSITIVE_KEY_FRAGMENTS = [
		"token",
		"signature",
		"secret",
		"password",
		"passwd",
		"apikey",
		"api_key",
		"authorization",
		"auth"
	];
	SENSITIVE_PLACEHOLDER = "***";
	MAX_QUERY_VALUE_LEN = 200;
}));
//#endregion
//#region ../../packages/agent-ui/src/utils/http-logger/xhr-patch.ts
function installXhrLogger() {
	const w = globalThis;
	if (typeof w.XMLHttpRequest !== "function" || w[XHR_INSTALLED] === true) return;
	const proto = w.XMLHttpRequest.prototype;
	const originalOpen = proto.open;
	const originalSend = proto.send;
	const stateMap = /* @__PURE__ */ new WeakMap();
	proto.open = function(method, url, ...rest) {
		stateMap.set(this, {
			method: (method || "GET").toUpperCase(),
			url: typeof url === "string" ? url : url.toString(),
			startTs: nowMs$1()
		});
		return originalOpen.apply(this, [
			method,
			url,
			...rest
		]);
	};
	proto.send = function(body) {
		const state = stateMap.get(this);
		if (state) {
			state.startTs = nowMs$1();
			state.requestBody = body ?? void 0;
			attachListeners(this, state);
		}
		return originalSend.apply(this, [body]);
	};
	w[XHR_INSTALLED] = true;
}
function attachListeners(xhr, state) {
	const cleanup = () => {
		xhr.removeEventListener("loadend", onLoadEnd);
		xhr.removeEventListener("error", onError);
		xhr.removeEventListener("abort", onAbort);
	};
	const onLoadEnd = () => {
		cleanup();
		if (xhr.status === 0) return;
		const shouldRead = xhr.status >= 400 || hasSuccessBodyCaptureRule(state.url);
		emit({
			method: state.method,
			url: state.url,
			duration: Math.round(nowMs$1() - state.startTs),
			status: xhr.status,
			traceId: pickTraceIdFromXhr(xhr),
			requestBody: state.requestBody,
			responseText: shouldRead ? tryGetResponseText(xhr) : void 0
		});
	};
	const onError = () => {
		cleanup();
		emit({
			method: state.method,
			url: state.url,
			duration: Math.round(nowMs$1() - state.startTs),
			error: "network error",
			requestBody: state.requestBody
		});
	};
	const onAbort = () => {
		cleanup();
		emit({
			method: state.method,
			url: state.url,
			duration: Math.round(nowMs$1() - state.startTs),
			error: "aborted",
			aborted: true,
			requestBody: state.requestBody
		});
	};
	xhr.addEventListener("loadend", onLoadEnd);
	xhr.addEventListener("error", onError);
	xhr.addEventListener("abort", onAbort);
}
function emit(input) {
	const isHttpError = (input.status ?? 0) >= 400;
	const event = {
		method: input.method,
		url: "",
		rawUrl: input.url,
		status: input.status,
		duration: input.duration,
		traceId: input.traceId,
		error: input.error,
		aborted: input.aborted,
		requestBodySummary: summarizeRequestBody(input.requestBody),
		responseBodySummary: summarizeResponseBody(input.responseText, isHttpError)
	};
	runMatchingRules(input.url, event);
}
function tryGetResponseText(xhr) {
	try {
		const rt = xhr.responseType;
		if (rt === "" || rt === "text" || rt === "json") return xhr.responseText;
		return;
	} catch {
		return;
	}
}
function nowMs$1() {
	return typeof performance !== "undefined" && performance.now ? performance.now() : Date.now();
}
var XHR_INSTALLED;
var init_xhr_patch = __esmMin((() => {
	init_http_logger$1();
	init_pick_trace_id();
	XHR_INSTALLED = Symbol.for("agent-ui-http-logger-xhr-installed");
}));
//#endregion
//#region ../../packages/agent-ui/src/utils/http-logger/http-logger.ts
/**
* 安装 fetch + XHR 拦截器（幂等，模块级单次）。
* 在 agent-ui 入口尽早调用一次（auto-install.ts 已接好）。
*/
function installHttpLogger() {
	installFetchPatch();
	installXhrLogger();
}
function installFetchPatch() {
	const w = globalThis;
	if (typeof w.fetch !== "function" || w[FETCH_INSTALLED] === true) return;
	const originalFetch = w.fetch.bind(globalThis);
	w.fetch = async (input, init) => {
		const urlStr = extractUrl(input);
		const method = extractMethod(input, init);
		const startTs = nowMs();
		const requestBody = init?.body;
		try {
			const response = await originalFetch(input, init);
			const duration = Math.round(nowMs() - startTs);
			if (!hasMatchingRule(urlStr)) return response;
			const traceId = pickTraceIdFromResponse(response);
			const isHttpError = response.status >= 400;
			const responseText = isHttpError || hasSuccessBodyCaptureRule(urlStr) ? await tryReadResponseClone(response) : void 0;
			runMatchingRules(urlStr, {
				method,
				url: "",
				rawUrl: urlStr,
				status: response.status,
				duration,
				traceId,
				requestBodySummary: summarizeRequestBody(requestBody),
				responseBodySummary: summarizeResponseBody(responseText, isHttpError)
			});
			return response;
		} catch (err) {
			const duration = Math.round(nowMs() - startTs);
			const aborted = err?.name === "AbortError";
			const reason = aborted ? "aborted" : err?.message || String(err);
			if (hasMatchingRule(urlStr)) runMatchingRules(urlStr, {
				method,
				url: "",
				rawUrl: urlStr,
				duration,
				error: reason,
				aborted,
				requestBodySummary: summarizeRequestBody(requestBody)
			});
			throw err;
		}
	};
	w[FETCH_INSTALLED] = true;
}
function extractUrl(input) {
	if (typeof input === "string") return input;
	if (input instanceof URL) return input.toString();
	return input.url;
}
function extractMethod(input, init) {
	return (init?.method || (input instanceof Request ? input.method : "GET") || "GET").toUpperCase();
}
/** 注册业务规则；返回 unregister 函数。 */
function registerHttpLogRule(rule) {
	rules.push(rule);
	return () => {
		const idx = rules.indexOf(rule);
		if (idx >= 0) rules.splice(idx, 1);
	};
}
/** 是否有规则会匹配该 URL —— 用于在没规则时跳过摘要计算 */
function hasMatchingRule(rawUrl) {
	if (!rawUrl || rules.length === 0) return false;
	for (const rule of rules) try {
		if (typeof rule.match === "string" ? rule.match !== "" && rawUrl.startsWith(rule.match) : rule.match(rawUrl)) return true;
	} catch {}
	return false;
}
/**
* 是否有命中规则显式 opt-in 了成功响应体摘要。
*
* @internal 仅供 fetch / xhr 主流程在 2xx 路径上判断是否需要读 response body
*/
function hasSuccessBodyCaptureRule(rawUrl) {
	if (!rawUrl || rules.length === 0) return false;
	for (const rule of rules) {
		if (!rule.captureSuccessResponseBody) continue;
		try {
			if (typeof rule.match === "string" ? rule.match !== "" && rawUrl.startsWith(rule.match) : rule.match(rawUrl)) return true;
		} catch {}
	}
	return false;
}
/**
* 跑所有匹配的业务规则的 onLog 回调（不再是 first-match）。
* 由 fetch / xhr patch 在请求结束时调用。
*
* @internal 仅供 xhr-patch 调用
*/
function runMatchingRules(rawUrl, eventTemplate) {
	if (!rawUrl || rules.length === 0) return;
	for (const rule of rules) {
		let matched = false;
		try {
			matched = typeof rule.match === "string" ? rule.match !== "" && rawUrl.startsWith(rule.match) : rule.match(rawUrl);
		} catch {
			continue;
		}
		if (!matched) continue;
		const baseUrl = typeof rule.match === "string" ? rule.match : void 0;
		let sanitizedUrl;
		if (rule.sanitize) try {
			sanitizedUrl = rule.sanitize(rawUrl);
		} catch {
			try {
				sanitizedUrl = defaultSanitizeUrl(rawUrl, baseUrl);
			} catch {
				sanitizedUrl = "[sanitize-failed]";
			}
		}
		else sanitizedUrl = defaultSanitizeUrl(rawUrl, baseUrl);
		try {
			rule.onLog({
				...eventTemplate,
				url: sanitizedUrl
			});
		} catch {}
	}
}
/** @internal 供 xhr-patch 共用 —— 把 request body 转成日志摘要 */
function summarizeRequestBody(body) {
	if (body === void 0 || body === null) return;
	return summarizeBodyForLog(body, DEFAULT_BODY_MAX_CHARS);
}
/** @internal 供 xhr-patch 共用 —— 把 response body 转成日志摘要 */
function summarizeResponseBody(text, isHttpError) {
	if (!text) return;
	return summarizeBodyForLog(text, isHttpError ? ERROR_RESP_MAX_CHARS : DEFAULT_BODY_MAX_CHARS);
}
function nowMs() {
	return typeof performance !== "undefined" && performance.now ? performance.now() : Date.now();
}
/** clone response 并读 text，失败返回 undefined（不影响主流程）。 */
async function tryReadResponseClone(response) {
	try {
		return await response.clone().text();
	} catch {
		return;
	}
}
var ERROR_RESP_MAX_CHARS, DEFAULT_BODY_MAX_CHARS, FETCH_INSTALLED, rules;
var init_http_logger$1 = __esmMin((() => {
	init_body_summarizer();
	init_pick_trace_id();
	init_url_sanitizer();
	init_xhr_patch();
	ERROR_RESP_MAX_CHARS = 1500;
	DEFAULT_BODY_MAX_CHARS = 800;
	FETCH_INSTALLED = Symbol.for("agent-ui-http-logger-fetch-installed");
	rules = [];
}));
//#endregion
//#region ../../packages/agent-ui/src/utils/http-logger/business-matchers.ts
function normalizeBaseUrl(baseUrl) {
	return (baseUrl || "").trim().replace(/\/+$/, "");
}
/**
* 注册一个业务 baseUrl。matcher 闭包随后会把命中此 baseUrl 前缀的请求标记为该业务。
* 多次注册相同 baseUrl 是 idempotent（Set 去重）；不同 baseUrl 会共存以支持多实例并存。
*
* **集合生命周期边界（重要）**：本注册表是模块级 in-memory Set，**只 add 不会自动 owner 级释放**。
*   - 同账号内 token 刷新：新 baseUrl 会追加进集合，旧 baseUrl 残留无副作用（旧 baseUrl 不再有
*     真实请求命中，所以不会误打多条 `[http:xxx]` scope）。
*   - **账号切换 / 登出**：调用方有责任在合适时机调 `clearBusinessRuntimeBaseUrls(business)` 清掉
*     旧账号留下的 baseUrl；否则集合会持续"长大"（虽然旧 baseUrl 也不会命中新账号的请求）。
*   - **同一业务在不同环境下 baseUrl 固定**（例如 netdrive 的域名只随 toc/tob 区分，不随用户变）：
*     即使没有 owner 级释放也不会出现"旧用户 baseUrl 命中新用户请求"的错配。
*
* 如果将来某个业务的 baseUrl 真的随租户/项目变化，必须在切换路径上显式调
* `clearBusinessRuntimeBaseUrls`，否则集合会无限累积。
*/
function addBusinessRuntimeBaseUrl(business, baseUrl) {
	const normalized = normalizeBaseUrl(baseUrl);
	if (normalized === "") return;
	let set = runtimeBaseUrls.get(business);
	if (!set) {
		set = /* @__PURE__ */ new Set();
		runtimeBaseUrls.set(business, set);
	}
	set.add(normalized);
}
function matchByRuntimeBaseUrl(business) {
	return (url) => {
		const set = runtimeBaseUrls.get(business);
		if (!set || set.size === 0) return false;
		for (const base of set) if (url.startsWith(base)) return true;
		return false;
	};
}
/** 列出所有已注册的业务名（供 enableDefaultHttpLogging 默认全启用时用） */
function getAllHttpBusinesses() {
	return Object.keys(HttpBusinessMatchers);
}
var runtimeBaseUrls, HttpBusinessMatchers;
var init_business_matchers = __esmMin((() => {
	runtimeBaseUrls = /* @__PURE__ */ new Map();
	HttpBusinessMatchers = { netdrive: { match: matchByRuntimeBaseUrl("netdrive") } };
}));
//#endregion
//#region ../../packages/agent-ui/src/utils/http-logger/log-sink.ts
/**
* 注入 adapter（在 App.tsx 拿到 adapter 后调用一次）。
* 多次调用会覆盖；传 null 可显式 unset。
*/
function setRendererLogAdapter(adapter) {
	logAdapter = adapter;
}
/**
* 注入轻量写盘通道，供 Desktop 在完整 adapter 创建前捕获启动期日志。
*/
function setRendererLogWriter(writer) {
	logWriter = writer;
}
/**
* 写一行 renderer 日志到 console + 主进程 main.log。
*
* - `scope`：日志分类标记，会以 `[scope]` 形式作为行首前缀出现在两条通道里
* - `level`：info / warn / error，分别走 `console.log` / `warn` / `error` 与
*   electron-log 同名 level
* - `message`：行正文，调用方自行拼好结构化字段（例如 `GET /xxx status=200 trace=abc`）
*
* 写盘异常一律吞掉 —— 这是日志通道，绝不能让日志故障污染业务流程。
*/
function writeRendererLog(scope, level, message) {
	const line = `[${scope}] ${message}`;
	if (level === "error") console.error(line);
	else if (level === "warn") console.warn(line);
	else console.log(line);
	const adapter = logAdapter;
	if (adapter?.writeRendererLog) {
		adapter.writeRendererLog({
			scope,
			level,
			message
		}).catch(() => {});
		return;
	}
	const writer = logWriter;
	if (writer) Promise.resolve(writer({
		scope,
		level,
		message
	})).catch(() => {});
}
var logAdapter, logWriter;
var init_log_sink = __esmMin((() => {
	logAdapter = null;
	logWriter = null;
}));
//#endregion
//#region ../../packages/agent-ui/src/utils/http-logger/default-rules.ts
/**
* 启用默认的业务 HTTP 日志规则集（idempotent）。
*
* 通常在 App.tsx 拿到 adapter 之后、setRendererLogAdapter 调用之后调一次即可。
* 重复调用会被忽略；想动态增减业务请直接改 business-matchers.ts。
*
* 不提供 disable —— 业务运行期不会动态关日志，关日志请走 main.log 落盘配置。
*/
function enableDefaultHttpLogging(options = {}) {
	if (installed) return;
	installed = true;
	const businesses = options.businesses ?? getAllHttpBusinesses();
	for (const business of businesses) {
		const matcher = HttpBusinessMatchers[business];
		if (!matcher) continue;
		registerHttpLogRule(buildRule(business, matcher.match));
	}
}
function buildRule(business, match) {
	const scope = `http:${business}`;
	return {
		name: scope,
		match,
		onLog: (event) => emitHttpLogLine(scope, event)
	};
}
/**
* 把 HttpLogEvent 转成一行结构化日志写到 main.log。
*
* 行格式（与主进程 IPC `[DomainHttp]` 链路对齐：成功精简，失败带原因）：
*   2xx 成功：     `GET /xxx status=200 trace=abc 12ms`
*   4xx/5xx 失败：`GET /xxx status=403 trace=abc resp=<errSummary> 12ms`
*   网络异常：     `GET /xxx network-error reason="..." 12ms`
*
* 关键约束（"不打多，也不漏"）：
*   - 永不打 request body：等价于参数 dump，会泄露用户数据 + 日志爆炸
*   - 成功路径不打 response body：成功只需要 status + trace + 耗时
*   - 错误路径只打 response body：用 summarizeResponseBody 限到 ERROR_RESP_MAX_CHARS
*   - network-error 不打 body：底层网络问题，body 也送不出去，没有排查价值
*
* 通用层已经把 url / resp 都做了脱敏 + 紧凑摘要，业务规则直接拼即可。
*/
function emitHttpLogLine(scope, event) {
	if (event.error) {
		writeRendererLog(scope, event.aborted ? "info" : "error", `${event.method} ${event.url} network-error reason="${event.error}" ${event.duration}ms`);
		return;
	}
	const isError = (event.status ?? 0) >= 400;
	const level = isError ? "error" : "info";
	const respSeg = isError && event.responseBodySummary ? ` resp=${event.responseBodySummary}` : "";
	writeRendererLog(scope, level, `${event.method} ${event.url} status=${event.status} trace=${event.traceId || "(none)"}${respSeg} ${event.duration}ms`);
}
var installed;
var init_default_rules = __esmMin((() => {
	init_business_matchers();
	init_http_logger$1();
	init_log_sink();
	installed = false;
}));
//#endregion
//#region ../../packages/agent-ui/src/utils/http-logger/renderer-diag.ts
function stringifyRendererDiagPayload(payload) {
	try {
		return JSON.stringify(payload, (_key, value) => {
			if (typeof value === "function") return "[Function]";
			if (value instanceof Error) return {
				name: value.name,
				message: value.message,
				stack: value.stack
			};
			return value;
		});
	} catch (error) {
		return JSON.stringify({ serializationError: String(error) });
	}
}
function createRendererDiagLogger(options) {
	const lastEmittedAt = /* @__PURE__ */ new Map();
	const write = (level, event, payload = {}, writeOptions = {}) => {
		if (!isRendererDiagEnabled(options.scope, options.enabledByDefault ?? false)) return;
		const throttleMs = writeOptions.throttleMs ?? options.defaultThrottleMs ?? 0;
		const throttleKey = writeOptions.throttleKey ?? event;
		if (!writeOptions.force && throttleMs > 0) {
			const now = Date.now();
			if (now - (lastEmittedAt.get(throttleKey) ?? 0) < throttleMs) return;
			lastEmittedAt.set(throttleKey, now);
		}
		writeRendererLog(options.scope, level, `${event} ${stringifyRendererDiagPayload({
			ts: (/* @__PURE__ */ new Date()).toISOString(),
			...options.issue ? { issue: options.issue } : {},
			...payload
		})}`);
	};
	return {
		info: (event, payload, writeOptions) => write("info", event, payload, writeOptions),
		warn: (event, payload, writeOptions) => write("warn", event, payload, writeOptions),
		error: (event, payload, writeOptions) => write("error", event, payload, writeOptions)
	};
}
function isRendererDiagEnabled(scope, enabledByDefault) {
	return readDiagFlag(`workbuddy.diag.${scope}`) ?? readDiagFlag("workbuddy.diag.all") ?? readEnvDiagFlag("VITE_WORKBUDDY_ACP_DIAG") ?? readEnvDiagFlag("VITE_WORKBUDDY_DIAG") ?? enabledByDefault;
}
function readDiagFlag(key) {
	if (typeof window === "undefined") return;
	try {
		const raw = window.localStorage?.getItem(key)?.trim().toLowerCase();
		if (!raw) return;
		if (ENABLED_VALUES.has(raw)) return true;
		if (DISABLED_VALUES.has(raw)) return false;
	} catch {
		return;
	}
}
function readEnvDiagFlag(key) {
	const raw = ({
		"BASE_URL": "./",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SSR": false
	}?.[key])?.trim().toLowerCase();
	if (!raw) return;
	if (ENABLED_VALUES.has(raw)) return true;
	if (DISABLED_VALUES.has(raw)) return false;
}
var ENABLED_VALUES, DISABLED_VALUES;
var init_renderer_diag = __esmMin((() => {
	init_log_sink();
	ENABLED_VALUES = new Set([
		"1",
		"true",
		"yes",
		"on",
		"enabled"
	]);
	DISABLED_VALUES = new Set([
		"0",
		"false",
		"no",
		"off",
		"disabled"
	]);
}));
//#endregion
//#region ../../packages/agent-ui/src/utils/http-logger/index.ts
var init_http_logger = __esmMin((() => {
	init_http_logger$1();
	init_business_matchers();
	init_default_rules();
	init_log_sink();
	init_renderer_diag();
}));
//#endregion
export { setRendererLogWriter as a, init_http_logger$1 as c, setRendererLogAdapter as i, installHttpLogger as l, createRendererDiagLogger as n, writeRendererLog as o, enableDefaultHttpLogging as r, addBusinessRuntimeBaseUrl as s, init_http_logger as t };
