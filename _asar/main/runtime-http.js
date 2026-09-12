const require_chunk = require("./chunk.js");
const require_logger = require("./logger.js");
//#region ../../packages/workbuddy-server/src/server/runtime-http.ts
var runtime_http_exports = /* @__PURE__ */ require_chunk.__exportAll({
	createRuntimeContext: () => createRuntimeContext,
	createRuntimeContextFromCellDeps: () => createRuntimeContextFromCellDeps,
	createRuntimeHttp: () => createRuntimeHttp,
	wrapHttpWithLogging: () => wrapHttpWithLogging
});
var HTTP_TAG = "[DomainHttp]";
/**
* 默认请求超时（毫秒）。
*
* 背景（andon #17174936 / #59558）：系统休眠恢复瞬间网络尚未恢复（DNS ENOTFOUND），
* 此前 request() 直接 `await deps.fetch(url, init)` 且 init 不带任何 signal/timeout，
* 底层裸 fetch 会硬等到 TCP 层自己放弃——实测 msgCenter:getSummary 轮询请求卡了
* 900456ms(~15min) 才"完成"，期间 UI 转圈、消息发送被阻塞。
*
* 这里给所有非流式请求注入一个有限的默认超时，让网络异常时快速 fail-fast。
* 调用方可通过 config.timeoutMs 覆盖（传 0 / 负数 / Infinity 关闭），
* 或通过 config.signal 自带 AbortSignal 接管生命周期。
*/
var DEFAULT_REQUEST_TIMEOUT_MS = 1e4;
function wrapHttpWithLogging(http) {
	function wrap(method, fn) {
		return async (...args) => {
			const url = args[0];
			try {
				const result = await fn.apply(http, args);
				const resp = result;
				if (resp && typeof resp.code === "number" && resp.code !== 0) require_logger.createWorkbuddyScopedLogger("runtime-http").warn(`${HTTP_TAG} ${method.toUpperCase()} ${url} biz_error code=${resp.code} msg=${resp.msg}`);
				return result;
			} catch (error) {
				const errAny = error;
				const status = typeof errAny?.status === "number" ? errAny.status : void 0;
				const bizCode = typeof errAny?.code === "number" || typeof errAny?.code === "string" ? errAny.code : void 0;
				const bodyText = typeof errAny?.bodyText === "string" ? errAny.bodyText : void 0;
				const extras = [];
				if (status !== void 0) extras.push(`status=${status}`);
				if (bizCode !== void 0) extras.push(`code=${bizCode}`);
				else if (bodyText) extras.push(`body=${bodyText}`);
				require_logger.createWorkbuddyScopedLogger("runtime-http").error(`${HTTP_TAG} ${method.toUpperCase()} ${url} FAIL`, errAny?.message || error, ...extras);
				throw error;
			}
		};
	}
	return {
		get: wrap("get", http.get.bind(http)),
		post: wrap("post", http.post.bind(http)),
		put: wrap("put", http.put.bind(http)),
		patch: wrap("patch", http.patch.bind(http)),
		delete: wrap("delete", http.delete.bind(http))
	};
}
/**
* 构造带 HTTP 状态的友好错误。
*
* 网关/后端偶发返回 HTML 错误页（以 `<pre>` 开头）时，避免直接
* `response.json()` 抛出 `Unexpected token '<'...` 这类不可理解的报错。
*
* `message` 优先使用后端 envelope 中的 `msg`（i18n 友好文案，供 UI 直接展示），
* 无 `msg` 时回退到 HTTP 状态行（不暴露内部 URL / 正文）。
* 完整的 url / method / 正文片段保留在 error 属性上，供日志与排查使用
* （`wrapHttpWithLogging` 仍会在日志里记录完整 URL）。
*
* ─── envelope 平铺 ────────────────────────────────────────────
* 后端所有非 2xx 响应统一走 `NormalResp` 壳（`{code, msg, requestId, data?}`，
* 详见 `services/pkg/client/http/response.go`）。为了让 4xx/5xx 与 2xx-软失败
* 走**同一份错误契约**——`unwrap()` 在 http 200 但 `code!=0` 时会平铺 `code /
* data / requestId` 到 error 属性上（`_internal/http.ts` unwrap 注释）——本函数
* 会尝试把 body 当成 JSON 解析：解析成功即把 `code / data / requestId` 挂到
* error，方便上层 `tryParseMemberQuotaError` / `isExclusivePlanError` /
* daemon `extractBizDetail` 直接消费；失败或非 JSON body（HTML 网关页/空正文）
* 保持原样只挂 status/bodyText，避免污染。
*/
function createHttpError(method, url, response, text, cause) {
	const status = response.status;
	const statusText = response.statusText ? ` ${response.statusText}` : "";
	const parsedEnvelope = tryParseEnvelope(text);
	const displayMessage = parsedEnvelope?.msg ?? `Request failed (HTTP ${status}${statusText})`;
	const error = new Error(displayMessage);
	error.status = status;
	error.httpStatus = status;
	error.statusText = response.statusText;
	error.bodyText = text.trim().slice(0, 200);
	error.url = url;
	error.method = method.toUpperCase();
	if (cause !== void 0) error.cause = cause;
	if (parsedEnvelope) {
		if (parsedEnvelope.code !== void 0) error.code = parsedEnvelope.code;
		if (parsedEnvelope.data !== void 0) error.data = parsedEnvelope.data;
		if (parsedEnvelope.requestId !== void 0) error.requestId = parsedEnvelope.requestId;
	}
	return error;
}
/**
* 尝试把响应 body 当作后端 `NormalResp` envelope 解析：
*   `{ code: number|string, msg?, requestId?, data?, ... }`
*
* - body 非 JSON / 非对象 → 返回 null（不污染 error）
* - body 是 JSON 但缺少 `code` → 返回 null（不算 envelope）
* - `code` 是数字字符串（如 "17273"）→ 归一为 number，方便 `err.code === 17273` 判断
* - `code` 是非数字字符串（如 "PermissionDenied"）→ 保留字符串
* - `msg` 非空字符串时返回，供 `createHttpError` 用作 Error message
*/
function tryParseEnvelope(text) {
	const trimmed = text.trim();
	if (trimmed === "" || trimmed[0] !== "{" && trimmed[0] !== "[") return null;
	let parsed;
	try {
		parsed = JSON.parse(trimmed);
	} catch {
		return null;
	}
	if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;
	const body = parsed;
	const rawCode = body.code;
	if (rawCode === void 0) return null;
	let code;
	if (typeof rawCode === "number" && Number.isFinite(rawCode)) code = rawCode;
	else if (typeof rawCode === "string") code = /^-?\d+$/.test(rawCode) ? Number(rawCode) : rawCode;
	else return null;
	return {
		code,
		msg: typeof body.msg === "string" && body.msg !== "" ? body.msg : void 0,
		data: body.data,
		requestId: typeof body.requestId === "string" ? body.requestId : void 0
	};
}
function createRuntimeHttp(deps) {
	function getEndpoint() {
		const endpoint = deps.productManager.getEndpoint();
		if (!endpoint) throw new Error("[DomainRegistry] endpoint not ready");
		return endpoint.replace(/\/$/, "");
	}
	function getAuthHeaders() {
		const session = deps.authenticationManager?.currentSessionSubject?.getValue?.();
		const headers = {
			"Content-Type": "application/json",
			Accept: "application/json"
		};
		if (session?.auth?.accessToken) headers.Authorization = `Bearer ${session.auth.accessToken}`;
		if (session?.account?.uid) headers["X-User-Id"] = session.account.uid;
		if (session?.account?.enterpriseId) {
			headers["X-Enterprise-Id"] = session.account.enterpriseId;
			headers["X-Tenant-Id"] = session.account.enterpriseId;
		}
		if (session?.auth?.domain) headers["X-Domain"] = session.auth.domain;
		return headers;
	}
	function isStreamingBody(data) {
		if (!data || typeof data !== "object") return false;
		const body = data;
		if (typeof body.append === "function" && typeof body.entries === "function") return true;
		return typeof body.arrayBuffer === "function";
	}
	/**
	* 解析本次请求要用的 AbortSignal：
	* - config.signal 优先（调用方自管生命周期，直接接管，不再叠加默认超时）；
	* - 否则按 config.timeoutMs（缺省 DEFAULT_REQUEST_TIMEOUT_MS）构造超时 signal；
	* - timeoutMs <= 0 或非有限值（如 Infinity）表示显式关闭超时，返回 undefined。
	*
	* 注：AbortSignal.timeout 触发后底层 fetch 抛 AbortError，由调用方 catch 降级
	* （如 MsgCenterService.getSummary 的 `catch → return null`），不阻塞主流程。
	*/
	function resolveSignal(config) {
		if (config?.signal instanceof AbortSignal) return config.signal;
		const timeoutMs = typeof config?.timeoutMs === "number" ? config.timeoutMs : DEFAULT_REQUEST_TIMEOUT_MS;
		if (!Number.isFinite(timeoutMs) || timeoutMs <= 0) return;
		return AbortSignal.timeout(timeoutMs);
	}
	async function request(method, url, data, config) {
		let fullUrl = `${getEndpoint()}${url}`;
		if (config?.params) {
			const query = [];
			for (const [key, value] of Object.entries(config.params)) {
				if (value === void 0 || value === null || value === "") continue;
				query.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
			}
			if (query.length > 0) fullUrl += `?${query.join("&")}`;
		}
		const headers = {
			...getAuthHeaders(),
			...config?.headers
		};
		const init = {
			method,
			headers
		};
		const signal = resolveSignal(config);
		if (signal) init.signal = signal;
		if (data !== void 0 && method !== "GET") if (isStreamingBody(data)) {
			if (headers["Content-Type"] === "application/json") delete headers["Content-Type"];
			init.body = data;
		} else init.body = JSON.stringify(data);
		const response = await deps.fetch(fullUrl, init);
		if (!(typeof config?.validateStatus === "function" ? Boolean(config.validateStatus(response.status)) : response.ok)) {
			let bodyText = "";
			try {
				bodyText = await response.text();
			} catch {}
			throw createHttpError(method, fullUrl, response, bodyText);
		}
		try {
			return await response.json();
		} catch (err) {
			let bodyText = "";
			try {
				bodyText = await response.text();
			} catch {}
			if (bodyText.trim() === "") return;
			throw createHttpError(method, fullUrl, response, bodyText, err);
		}
	}
	return {
		get: (url, config) => request("GET", url, void 0, config),
		post: (url, data, config) => request("POST", url, data, config),
		put: (url, data, config) => request("PUT", url, data, config),
		patch: (url, data, config) => request("PATCH", url, data, config),
		delete: (url, config) => request("DELETE", url, void 0, config)
	};
}
function createRuntimeContext(deps) {
	const http = createRuntimeHttp(deps);
	return {
		homeDir: deps.homeDir,
		logger: deps.logger ?? console,
		http: wrapHttpWithLogging(http),
		fetch: deps.fetch,
		productManager: deps.productManager,
		accountProvider: deps.accountProvider ?? (() => deps.authenticationManager?.currentSessionSubject?.getValue?.()?.account),
		reporter: deps.reporter
	};
}
function createRuntimeContextFromCellDeps(cellDeps, deps) {
	return createRuntimeContext({
		homeDir: deps.homeDir,
		logger: deps.logger,
		productManager: cellDeps.productManager,
		authenticationManager: cellDeps.authenticationManager,
		fetch: deps.fetch
	});
}
//#endregion
Object.defineProperty(exports, "createRuntimeContext", {
	enumerable: true,
	get: function() {
		return createRuntimeContext;
	}
});
Object.defineProperty(exports, "createRuntimeContextFromCellDeps", {
	enumerable: true,
	get: function() {
		return createRuntimeContextFromCellDeps;
	}
});
Object.defineProperty(exports, "createRuntimeHttp", {
	enumerable: true,
	get: function() {
		return createRuntimeHttp;
	}
});
Object.defineProperty(exports, "runtime_http_exports", {
	enumerable: true,
	get: function() {
		return runtime_http_exports;
	}
});
Object.defineProperty(exports, "wrapHttpWithLogging", {
	enumerable: true,
	get: function() {
		return wrapHttpWithLogging;
	}
});
