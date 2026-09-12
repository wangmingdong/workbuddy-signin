import { n as __esmMin } from "./chunk-BRZcfu7K.js";
import { t as init_dist$1 } from "./dist-CSHw4oQX.js";
import { o as writeRendererLog, s as addBusinessRuntimeBaseUrl, t as init_http_logger } from "./http-logger-BE9rNaof.js";
import { n as init_vanilla, t as createStore } from "./vanilla-BfruURAe.js";
//#region ../../node_modules/@tencent/drive-sdk/dist/index.js
function extractErrorCode(data) {
	if (data == null || typeof data !== "object") return null;
	const check = (obj2) => {
		for (const key of [
			"cgicode",
			"ret",
			"retcode"
		]) {
			const v = obj2[key];
			if (typeof v === "number" && v !== 0) return v;
		}
		return null;
	};
	const obj = data;
	const top = check(obj);
	if (top !== null) return top;
	if (obj.data != null && typeof obj.data === "object") {
		const d = check(obj.data);
		if (d !== null) return d;
	}
	if (obj.result != null && typeof obj.result === "object") {
		const r = check(obj.result);
		if (r !== null) return r;
	}
	return null;
}
function extractErrorMessage(data) {
	if (data == null || typeof data !== "object") return void 0;
	const obj = data;
	if (typeof obj.msg === "string" && obj.msg) return obj.msg;
	if (typeof obj.message === "string" && obj.message) return obj.message;
	if (typeof obj.retmsg === "string" && obj.retmsg) return obj.retmsg;
}
function normalizeLogger(input) {
	if (!input) return noopLogger;
	return {
		debug: input.debug?.bind(input) ?? noopLogger.debug,
		info: input.info?.bind(input) ?? noopLogger.info,
		warn: input.warn?.bind(input) ?? noopLogger.warn,
		error: input.error?.bind(input) ?? noopLogger.error
	};
}
function pickTraceId(headers) {
	if (!headers || typeof headers.get !== "function") return void 0;
	return headers.get("X-Trace-Id") || headers.get("X-Tps-Trace") || headers.get("X-Request-Id") || headers.get("Trace-Id") || headers.get("traceId") || void 0;
}
function pickRequestId(headers) {
	if (!headers || typeof headers.get !== "function") return void 0;
	return headers.get("X-Request-Id") || headers.get("Request-Id") || headers.get("X-Req-Id") || void 0;
}
function pickTraceIdFromBody(body) {
	if (body == null || typeof body !== "object") return void 0;
	const obj = body;
	const candidates = [
		obj.trace_id,
		obj.traceId,
		obj.traceID,
		obj.request_id,
		obj.requestId
	];
	for (const v of candidates) if (typeof v === "string" && v) return v;
}
function snippetResponse(data, maxLen = 512) {
	let text;
	if (typeof data === "string") text = data;
	else try {
		text = JSON.stringify(data);
	} catch {
		text = String(data);
	}
	if (text.length <= maxLen) return text;
	return `${text.slice(0, maxLen)}... [truncated, total=${text.length}]`;
}
function pickStr(src, ...keys) {
	for (const k of keys) {
		const v = src[k];
		if (typeof v === "string" && v !== "") return v;
	}
	return "";
}
function pickNum(src, ...keys) {
	for (const k of keys) {
		const v = src[k];
		if (typeof v === "number" && !Number.isNaN(v)) return v;
		if (typeof v === "string" && v !== "") {
			const n = Number(v);
			if (!Number.isNaN(n)) return n;
		}
	}
	return 0;
}
function pickBool(src, ...keys) {
	for (const k of keys) {
		const v = src[k];
		if (typeof v === "boolean") return v;
	}
	return false;
}
function pickStr2(h, ...keys) {
	for (const k of keys) {
		const v = h[k];
		if (typeof v === "string" && v) return v;
	}
	return "";
}
function parseAddonResource(r) {
	return {
		resourceId: String(r.resource_id ?? r.resourceId ?? ""),
		spaceGb: Number(r.space_gb ?? r.spaceGb ?? 0),
		expireTime: Number(r.expire_time ?? r.expireTime ?? 0)
	};
}
function parseSubscriptionCapacity(s) {
	return {
		edition: Number(s.edition ?? 0),
		spaceGb: Number(s.space_gb ?? s.spaceGb ?? 0),
		expireTime: Number(s.expire_time ?? s.expireTime ?? 0),
		sku: String(s.sku ?? ""),
		autoRenew: Boolean(s.auto_renew ?? s.autoRenew ?? false)
	};
}
function parseCapacityComposition(raw) {
	if (raw == null || typeof raw !== "object") return void 0;
	const c = raw;
	const addonsRaw = c.addons;
	const addons = Array.isArray(addonsRaw) ? addonsRaw.filter((a) => a != null && typeof a === "object").map(parseAddonResource) : [];
	const subRaw = c.subscription;
	const subscription = subRaw != null && typeof subRaw === "object" ? parseSubscriptionCapacity(subRaw) : {
		edition: 0,
		spaceGb: 0,
		expireTime: 0,
		sku: "",
		autoRenew: false
	};
	return {
		defaultGb: Number(c.default_gb ?? c.defaultGb ?? 0),
		addonTotalGb: Number(c.addon_total_gb ?? c.addonTotalGb ?? 0),
		addonMaxExpireTime: Number(c.addon_max_expire_time ?? c.addonMaxExpireTime ?? 0),
		addons,
		subscription,
		totalGb: Number(c.total_gb ?? c.totalGb ?? 0)
	};
}
function pickStr3(h, ...keys) {
	for (const k of keys) {
		const v = h[k];
		if (typeof v === "string" && v) return v;
	}
	return "";
}
function pickNum2(h, ...keys) {
	for (const k of keys) {
		const v = h[k];
		if (typeof v === "number" && Number.isFinite(v)) return v;
		if (typeof v === "string" && v) {
			const n = Number(v);
			if (Number.isFinite(n)) return n;
		}
	}
	return 0;
}
function pickBool2(h, ...keys) {
	for (const k of keys) {
		const v = h[k];
		if (typeof v === "boolean") return v;
	}
	return false;
}
function normalizeVersionItem(raw) {
	const v = raw ?? {};
	return {
		id: pickNum2(v, "id", "ID"),
		createdBy: pickStr3(v, "created_by", "createdBy"),
		creationWay: pickNum2(v, "creation_way", "creationWay"),
		version: pickNum2(v, "version"),
		isLatestVersion: pickBool2(v, "is_latest_version", "isLatestVersion"),
		name: pickStr3(v, "name"),
		size: pickNum2(v, "size"),
		crc64: pickStr3(v, "crc64"),
		contentType: pickStr3(v, "content_type", "contentType"),
		creationTime: pickStr3(v, "creation_time", "creationTime"),
		setLatestTime: pickStr3(v, "set_latest_time", "setLatestTime")
	};
}
function normalizeLimit(input, defaultVal, max) {
	if (typeof input !== "number" || !Number.isFinite(input) || input <= 0) return defaultVal;
	const v = Math.floor(input);
	return v > max ? max : v;
}
function pickStr4(h, ...keys) {
	for (const k of keys) {
		const v = h[k];
		if (typeof v === "string" && v) return v;
	}
	return "";
}
function pickNum3(h, ...keys) {
	for (const k of keys) {
		const v = h[k];
		if (typeof v === "number" && Number.isFinite(v)) return v;
		if (typeof v === "string" && v) {
			const n = Number(v);
			if (Number.isFinite(n)) return n;
		}
	}
	return 0;
}
function normalizeFileHit(raw) {
	const h = raw ?? {};
	const kind = h.kind;
	return {
		fileID: pickStr4(h, "file_id", "fileId", "fileID"),
		parentID: pickStr4(h, "parent_id", "parentId", "parentID"),
		name: pickStr4(h, "name"),
		kind: kind === 2 || kind === 3 ? kind : 1,
		size: pickNum3(h, "size"),
		createTime: pickNum3(h, "create_time", "createTime"),
		modifyTime: pickNum3(h, "modify_time", "modifyTime"),
		ext: pickStr4(h, "ext"),
		labels: Array.isArray(h.labels) ? h.labels : [],
		category: pickStr4(h, "category"),
		isFavorite: !!(h.is_favorite ?? h.isFavorite),
		modifyOpenId: pickStr4(h, "modify_open_id", "modifyOpenId")
	};
}
function normalizeContentHit(raw) {
	const h = raw ?? {};
	const highlight = h.highlight_fragments ?? h.highlightFragments;
	return {
		fileID: pickStr4(h, "file_id", "fileId", "fileID"),
		name: pickStr4(h, "name"),
		ext: pickStr4(h, "ext"),
		size: pickNum3(h, "size"),
		modifyTime: pickNum3(h, "modify_time", "modifyTime"),
		score: pickNum3(h, "score"),
		snippet: pickStr4(h, "snippet"),
		snippetPage: pickNum3(h, "snippet_page", "snippetPage"),
		highlightFragments: Array.isArray(highlight) ? highlight : []
	};
}
function normalizeRagDocHit(raw) {
	const h = raw ?? {};
	return {
		fileID: pickStr4(h, "file_id", "fileId", "fileID"),
		name: pickStr4(h, "name"),
		ext: pickStr4(h, "ext"),
		score: pickNum3(h, "score"),
		snippet: pickStr4(h, "snippet"),
		snippetPage: pickNum3(h, "snippet_page", "snippetPage")
	};
}
function normalizeRagImageHit(raw) {
	const h = raw ?? {};
	return {
		fileID: pickStr4(h, "file_id", "fileId", "fileID"),
		name: pickStr4(h, "name"),
		ext: pickStr4(h, "ext"),
		score: pickNum3(h, "score")
	};
}
var DriveSDKError, AuthError, UploadError, DownloadError, ListError, DirError, SearchError, ApiError, ParseError, noopLogger, AUTH_INVALID_CGICODE, HttpClient, TokenManager, PATH_APPLY_UPLOAD, PATH_COMPLETE_UPLOAD, PATH_RENEW_UPLOAD, PATH_CANCEL_UPLOAD, PATH_DRIVE_DOWNLOAD, UploadEngine, POLL_INTERVAL, MAX_POLL_COUNT, FileModule, PATH_DIR_LIST, PATH_DIR_INFO, PATH_DIR_CREATE, PATH_DIR_RENAME, PATH_DIR_MOVE, PATH_DIR_TRASH, PATH_DIR_CREATE_SHARED_FOLDER, PATH_DRIVE_SUBAPP_LIST, PATH_DRIVE_APP_LIST, PATH_DRIVE_CAPACITY, DirModule, PATH_HISTORY_LIST, PATH_HISTORY_DELETE, PATH_HISTORY_CLEAR, PATH_HISTORY_SET_LATEST, PATH_HISTORY_CONFIG_GET, PATH_HISTORY_CONFIG_SET, HistoryModule, PATH_SEARCH_FILE, PATH_SEARCH_CONTENT, PATH_SEARCH_RAG_DOC, PATH_SEARCH_RAG_IMAGE, LIMIT_FILE_DEFAULT, LIMIT_FILE_MAX, LIMIT_CONTENT_DEFAULT, LIMIT_CONTENT_MAX, LIMIT_RAG_DOC_DEFAULT, LIMIT_RAG_DOC_MAX, LIMIT_RAG_IMAGE_DEFAULT, LIMIT_RAG_IMAGE_MAX, SearchModule, DEFAULT_CONFIG, DriveClient;
var init_dist = __esmMin((() => {
	init_dist$1();
	DriveSDKError = class extends Error {
		constructor(params) {
			super(params.message);
			this.name = "DriveSDKError";
			this.code = params.code ?? -1;
			this.traceId = params.traceId;
			this.cause = params.cause;
			Object.setPrototypeOf(this, new.target.prototype);
		}
	};
	AuthError = class extends DriveSDKError {
		constructor(params) {
			super(params);
			this.name = "AuthError";
		}
	};
	UploadError = class extends DriveSDKError {
		constructor(params) {
			super(params);
			this.name = "UploadError";
		}
	};
	DownloadError = class extends DriveSDKError {
		constructor(params) {
			super(params);
			this.name = "DownloadError";
		}
	};
	ListError = class extends DriveSDKError {
		constructor(params) {
			super(params);
			this.name = "ListError";
		}
	};
	DirError = class extends DriveSDKError {
		constructor(params) {
			super(params);
			this.name = "DirError";
		}
	};
	SearchError = class extends DriveSDKError {
		constructor(params) {
			super(params);
			this.name = "SearchError";
		}
	};
	ApiError = class extends DriveSDKError {
		constructor(params) {
			super(params);
			this.name = "ApiError";
			this.httpStatus = params.httpStatus;
			this.requestId = params.requestId;
		}
	};
	ParseError = class extends DriveSDKError {
		constructor(params) {
			super(params);
			this.name = "ParseError";
			this.httpStatus = params.httpStatus;
			this.requestId = params.requestId;
			this.responseSnippet = params.responseSnippet;
		}
	};
	noopLogger = {
		debug() {},
		info() {},
		warn() {},
		error() {}
	};
	AUTH_INVALID_CGICODE = 12100;
	HttpClient = class {
		constructor(config) {
			this.middlewares = [];
			this.customHeaders = {};
			this.baseURL = config.baseURL;
			this.timeout = config.timeout;
			this.tokenManager = config.tokenManager;
			this.clientId = config.clientId;
			this.openId = config.openId || "";
			this.logger = config.logger ?? noopLogger;
		}
		/** 暴露 logger 给业务模块使用（保证全 SDK 共享同一出口） */
		getLogger() {
			return this.logger;
		}
		/** 设置自定义请求头（后续所有请求都会带上） */
		setCustomHeader(key, value) {
			this.customHeaders[key] = value;
		}
		/** 移除自定义请求头 */
		removeCustomHeader(key) {
			delete this.customHeaders[key];
		}
		/** 获取当前所有自定义请求头 */
		getCustomHeaders() {
			return { ...this.customHeaders };
		}
		/** 添加中间件 */
		use(middleware) {
			this.middlewares.push(middleware);
		}
		/**
		* 发起请求
		*
		* @param path API 路径（相对于 baseURL）
		* @param options 请求选项
		* @returns 解析后的 JSON 响应数据
		*/
		async request(path, options = {}) {
			const { method = "GET", headers = {}, body, timeout = this.timeout, signal, auth = true } = options;
			const url = this.resolveUrl(path);
			const reqHeaders = {
				"Accept": "application/json",
				"Client-Id": this.clientId,
				...this.customHeaders,
				...headers
			};
			if (this.openId) reqHeaders["Open-Id"] = this.openId;
			if (auth) {
				const token = this.tokenManager.getAccessToken();
				if (token) reqHeaders["Access-Token"] = token;
			}
			if (body != null && !reqHeaders["Content-Type"]) reqHeaders["Content-Type"] = "application/json";
			const controller = new AbortController();
			const combinedSignal = signal ? this.combineSignals(signal, controller.signal) : controller.signal;
			const timeoutId = setTimeout(() => controller.abort(), timeout);
			const ctx = {
				url,
				options: {
					method,
					headers: reqHeaders,
					body,
					timeout,
					signal: combinedSignal,
					auth
				}
			};
			try {
				await this.executeMiddlewares(ctx, async () => {
					const fetchOptions = {
						method,
						headers: reqHeaders,
						signal: combinedSignal,
						credentials: "include"
					};
					if (body != null) fetchOptions.body = typeof body === "string" ? body : JSON.stringify(body);
					const response = await fetch(url, fetchOptions);
					ctx.response = response;
					const traceId = pickTraceId(response.headers);
					const requestId = pickRequestId(response.headers);
					if (!response.ok) {
						let errData;
						let errSnippet;
						try {
							const txt = await response.text();
							errSnippet = snippetResponse(txt);
							try {
								errData = JSON.parse(txt);
							} catch {
								errData = txt;
							}
						} catch {}
						const apiErr = new ApiError({
							message: extractErrorMessage(errData) || `HTTP ${response.status} ${response.statusText}`,
							code: extractErrorCode(errData) ?? response.status,
							httpStatus: response.status,
							traceId: traceId ?? pickTraceIdFromBody(errData),
							requestId
						});
						this.logger.error("[HttpClient] HTTP error response", {
							url,
							method,
							httpStatus: response.status,
							statusText: response.statusText,
							traceId: apiErr.traceId,
							requestId,
							bizCode: apiErr.code,
							message: apiErr.message,
							responseSnippet: errSnippet
						});
						throw apiErr;
					}
					const contentType = response.headers.get("content-type") || "";
					let data;
					let rawTextForLog;
					if (contentType.includes("json")) try {
						data = await response.json();
					} catch (parseErr) {
						const pe = new ParseError({
							message: "Failed to parse JSON response (Content-Type 声称 json 但解析失败)",
							httpStatus: response.status,
							traceId,
							requestId,
							cause: parseErr
						});
						this.logger.error("[HttpClient] JSON parse failed", {
							url,
							method,
							httpStatus: response.status,
							traceId,
							requestId,
							contentType,
							cause: parseErr instanceof Error ? parseErr.message : String(parseErr)
						});
						throw pe;
					}
					else {
						const rawText = await response.text();
						rawTextForLog = rawText;
						data = rawText;
						if (rawText && /^\s*[{[]/.test(rawText)) try {
							data = JSON.parse(rawText);
						} catch {}
					}
					ctx.data = data;
					const finalTraceId = traceId ?? pickTraceIdFromBody(data);
					if (data && typeof data === "object") {
						const bizCode = extractErrorCode(data);
						if (bizCode !== null) {
							if (bizCode === AUTH_INVALID_CGICODE) {
								const authErr = new AuthError({
									message: extractErrorMessage(data) || "登录态已失效，请重新授权",
									code: bizCode,
									traceId: finalTraceId
								});
								this.logger.error("[HttpClient] auth invalid (cgicode=12100)", {
									url,
									method,
									httpStatus: response.status,
									traceId: finalTraceId,
									requestId,
									bizCode,
									message: authErr.message,
									responseSnippet: snippetResponse(data)
								});
								throw authErr;
							}
							const apiErr = new ApiError({
								message: extractErrorMessage(data) || `\u4E1A\u52A1\u9519\u8BEF (code=${bizCode})`,
								code: bizCode,
								httpStatus: response.status,
								traceId: finalTraceId,
								requestId
							});
							this.logger.error("[HttpClient] business error (ret≠0)", {
								url,
								method,
								httpStatus: response.status,
								traceId: finalTraceId,
								requestId,
								bizCode,
								message: apiErr.message,
								responseSnippet: snippetResponse(data)
							});
							throw apiErr;
						}
					} else {
						const pe = new ParseError({
							message: "响应体不是合法 JSON 对象（HTTP 200 但 body 类型异常）",
							httpStatus: response.status,
							traceId: finalTraceId,
							requestId,
							responseSnippet: snippetResponse(rawTextForLog ?? data)
						});
						this.logger.error("[HttpClient] response body is not an object", {
							url,
							method,
							httpStatus: response.status,
							traceId: finalTraceId,
							requestId,
							contentType,
							actualType: data === null ? "null" : typeof data,
							responseSnippet: pe.responseSnippet
						});
						throw pe;
					}
				});
				return ctx.data;
			} catch (error) {
				if (error instanceof AuthError && auth) this.tokenManager.notifyAuthExpired();
				if (!(error instanceof ApiError) && !(error instanceof ParseError) && !(error instanceof AuthError)) this.logger.error("[HttpClient] request failed (network/abort/timeout)", {
					url,
					method,
					message: error instanceof Error ? error.message : String(error),
					name: error instanceof Error ? error.name : void 0
				});
				throw error;
			} finally {
				clearTimeout(timeoutId);
			}
		}
		/**
		* 发起 POST 请求（快捷方法）
		*/
		async post(path, body, options) {
			return this.request(path, {
				...options,
				method: "POST",
				body
			});
		}
		/**
		* 发起 GET 请求（快捷方法）
		*/
		async get(path, options) {
			return this.request(path, {
				...options,
				method: "GET"
			});
		}
		/** 解析完整 URL */
		resolveUrl(path) {
			if (path.startsWith("http://") || path.startsWith("https://")) return path;
			return `${this.baseURL.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
		}
		/** 合并两个 AbortSignal */
		combineSignals(signal1, signal2) {
			const controller = new AbortController();
			const onAbort = () => controller.abort();
			if (signal1.aborted || signal2.aborted) {
				controller.abort();
				return controller.signal;
			}
			signal1.addEventListener("abort", onAbort, { once: true });
			signal2.addEventListener("abort", onAbort, { once: true });
			return controller.signal;
		}
		/** 执行中间件链 */
		async executeMiddlewares(ctx, core) {
			let index = 0;
			const middlewares = this.middlewares;
			const next = async () => {
				if (index < middlewares.length) {
					const mw = middlewares[index++];
					await mw(ctx, next);
				} else await core();
			};
			await next();
		}
	};
	TokenManager = class {
		constructor(config = {}) {
			this.accessToken = config.accessToken ?? null;
			this.onAuthExpired = config.onAuthExpired;
		}
		/** 获取当前 access token */
		getAccessToken() {
			return this.accessToken;
		}
		/** 设置 access token（由调用方在外部刷新后注入） */
		setAccessToken(token) {
			this.accessToken = token;
		}
		/** 通知调用方 token 已失效（内部由 HttpClient 在检测到 12100 后调用） */
		notifyAuthExpired() {
			this.onAuthExpired?.();
		}
		/** 清理 token（登出场景） */
		clear() {
			this.accessToken = null;
		}
	};
	PATH_APPLY_UPLOAD = "/api/v6/open/tdrive/upload/apply";
	PATH_COMPLETE_UPLOAD = "/api/v6/open/tdrive/upload/complete";
	PATH_RENEW_UPLOAD = "/api/v6/open/tdrive/upload/renew";
	PATH_CANCEL_UPLOAD = "/api/v6/open/tdrive/upload/cancel";
	PATH_DRIVE_DOWNLOAD = "/api/v6/open/tdrive/download";
	UploadEngine = class {
		constructor(config) {
			this.runningCount = 0;
			this.queue = [];
			this.httpClient = config.httpClient;
			this.concurrency = config.concurrency;
		}
		/**
		* ApplyUpload — 申请上传，获取上传链接和凭证。
		*
		* 调用成功后，响应中包含 domain、path、headers 等信息，
		* 用户需要自行将文件内容 PUT 到 domain + path 对应的地址，
		* 并在请求头中携带 headers 中返回的认证信息。
		*
		* 上传完成后，需调用 completeUpload 确认上传。
		*
		* 接口：POST /api/v6/open/tdrive/upload/apply
		*
		* @example
		* ```ts
		* const apply = await sdk.file.applyUpload({
		*   name: 'report',
		*   ext: 'docx',
		*   fileSize: 1024,
		*   conflictResolutionStrategy: 'rename',
		* })
		*
		* // 拼接上传地址
		* const uploadUrl = apply.domain + apply.path
		*
		* // 秒传判断
		* if (apply.isQuickUpload) {
		*   // 无需 PUT，直接 completeUpload
		* }
		* ```
		*/
		async applyUpload(params, signal) {
			if (!params.name) throw new UploadError({ message: "name 不能为空" });
			if (!params.fileSize) throw new UploadError({ message: "fileSize 不能为 0" });
			const body = {
				name: params.name,
				ext: params.ext,
				file_size: params.fileSize,
				parent_id: params.parentID ?? "",
				task_id: params.taskID ?? "",
				local_file_path: params.localFilePath ?? "",
				local_task_id: params.localTaskID ?? "",
				channel: params.channel ?? "",
				md5: params.md5 ?? "",
				create_source: params.createSource ?? 0,
				hide_entry: params.hideEntry ?? false,
				conflict_resolution_strategy: params.conflictResolutionStrategy ?? "rename",
				is_multipart: params.isMultipart ?? false,
				app_id: params.appId
			};
			const data = await this.httpClient.post(PATH_APPLY_UPLOAD, body, { signal });
			const result = this.unwrapResponse(data);
			return {
				confirmKey: pickStr(result, "confirm_key", "confirmKey"),
				domain: this.normalizeDomain(result.domain),
				path: pickStr(result, "path"),
				uploadID: pickStr(result, "upload_id", "uploadId", "uploadID"),
				headers: result.headers || {},
				taskID: pickStr(result, "task_id", "taskId", "taskID"),
				accessToken: pickStr(result, "access_token", "accessToken"),
				isQuickUpload: pickBool(result, "is_quick_upload", "isQuickUpload")
			};
		}
		/**
		* CompleteUpload — 确认上传完成。
		*
		* 接口：POST /api/v6/open/tdrive/upload/complete
		*/
		async completeUpload(params, signal) {
			if (!params.taskID) throw new UploadError({ message: "taskID 不能为空" });
			if (!params.confirmKey) throw new UploadError({ message: "confirmKey 不能为空" });
			const body = {
				task_id: params.taskID,
				confirm_key: params.confirmKey,
				name: params.name,
				ext: params.ext,
				file_size: params.fileSize
			};
			if (params.parentID) body.parent_id = params.parentID;
			if (params.isFailed != null) body.is_failed = params.isFailed;
			if (params.errMsg) body.errmsg = params.errMsg;
			if (params.md5) body.md5 = params.md5;
			if (params.hideEntry != null) body.hide_entry = params.hideEntry;
			if (params.createSource != null) body.create_source = params.createSource;
			body.app_id = params.appId;
			const data = await this.httpClient.post(PATH_COMPLETE_UPLOAD, body, { signal });
			const result = this.unwrapResponse(data);
			return {
				fileID: pickStr(result, "file_id", "fileId", "fileID"),
				tencentDocURL: pickStr(result, "tencent_doc_url", "tencentDocUrl", "tencentDocURL"),
				parentID: pickStr(result, "parent_id", "parentId", "parentID"),
				taskID: pickStr(result, "task_id", "taskId", "taskID"),
				status: pickNum(result, "status"),
				name: pickStr(result, "name")
			};
		}
		/**
		* RenewUpload — 续期上传凭证。
		*
		* 当 ApplyUpload 返回的上传链接/凭证过期后（如网络中断、长时间暂停），
		* 调用此接口可重新获取有效的上传链接和认证头，无需重新 ApplyUpload。
		*
		* 接口：POST /api/v6/open/tdrive/upload/renew
		*/
		async renewUpload(params, signal) {
			if (!params.taskID) throw new UploadError({ message: "taskID 不能为空" });
			if (!params.confirmKey) throw new UploadError({ message: "confirmKey 不能为空" });
			const body = {
				task_id: params.taskID,
				confirm_key: params.confirmKey
			};
			const data = await this.httpClient.post(PATH_RENEW_UPLOAD, body, { signal });
			const result = this.unwrapResponse(data);
			return {
				domain: this.normalizeDomain(result.domain),
				path: pickStr(result, "path"),
				uploadID: pickStr(result, "upload_id", "uploadId", "uploadID"),
				headers: result.headers || {},
				confirmKey: pickStr(result, "confirm_key", "confirmKey")
			};
		}
		/**
		* CancelUpload — 取消上传任务。
		*
		* 取消已申请但未完成的上传任务，释放服务端临时资源。
		* 取消后该 taskID 将不可再用于 CompleteUpload 或 RenewUpload。
		*
		* 接口：POST /api/v6/open/tdrive/upload/cancel
		*/
		async cancelUpload(params, signal) {
			if (!params.taskID) throw new UploadError({ message: "taskID 不能为空" });
			const body = { task_id: params.taskID };
			if (params.confirmKey) body.confirm_key = params.confirmKey;
			await this.httpClient.post(PATH_CANCEL_UPLOAD, body, { signal });
			return {};
		}
		/**
		* DriveDownload — 通过网盘存储层获取文件下载链接。
		*
		* 接口：POST /api/v6/open/tdrive/download
		*
		* 隔离规范：仅透传 fileID，drivecgi 通过 metadata 反查网盘私有坐标。
		*
		* 字段兼容矩阵（按优先级排序）：
		*   1. downloadURL   —— driveapi v2 entity `DownloadRsp.DownloadURL` 标准契约
		*   2. downloadUrl   —— 驼峰变体，防止历史版本或未来收窄命名
		*   3. download_url  —— snake_case 变体，兼容 drivecgi 直回 / 老 tendrive
		*                      路由 `/api/v6/open/tdrive/download` / 网关改写
		*   4. url           —— 通用兜底（极少数业务响应扁平化场景）
		*
		* @example
		* ```ts
		* const result = await sdk.file.download({ fileID: 'file-id' })
		* // result.url → 下载链接
		* ```
		*/
		async driveDownload(params, signal) {
			if (!params.fileID) throw new UploadError({ message: "fileID 不能为空" });
			const body = { file_id: params.fileID };
			const data = await this.httpClient.post(PATH_DRIVE_DOWNLOAD, body, { signal });
			return { url: pickStr(this.unwrapResponse(data), "download_url", "downloadUrl", "downloadURL", "url") };
		}
		/**
		* @deprecated 请使用 {@link UploadEngine.driveDownload}；保留旧名以避免破坏调用方代码，将于下一 major 移除。
		*/
		smhDownload(params, signal) {
			return this.driveDownload(params, signal);
		}
		/** 上传单个文件（完整三步流程） */
		async uploadFile(params) {
			return new Promise((resolve, reject) => {
				const task = async () => {
					try {
						resolve(await this.doUpload(params));
					} catch (error) {
						reject(error);
					}
				};
				this.enqueue(task);
			});
		}
		/** 入队并尝试执行 */
		enqueue(task) {
			this.queue.push(task);
			this.drain();
		}
		/** 消费队列 */
		drain() {
			while (this.runningCount < this.concurrency && this.queue.length > 0) {
				const task = this.queue.shift();
				this.runningCount++;
				task().finally(() => {
					this.runningCount--;
					this.drain();
				});
			}
		}
		/** 执行单文件上传 */
		async doUpload(params) {
			const { file, folderId, onProgress, signal, conflictResolutionStrategy, appId } = params;
			const checkAborted = () => {
				if (signal?.aborted) throw new UploadError({
					message: "上传已取消",
					code: -1
				});
			};
			checkAborted();
			const dotIdx = file.name.lastIndexOf(".");
			const ext = dotIdx > 0 ? file.name.slice(dotIdx + 1).toLowerCase() : "";
			const name = dotIdx > 0 ? file.name.slice(0, dotIdx) : file.name;
			const applyResult = await this.applyUpload({
				name,
				ext,
				fileSize: file.size,
				parentID: folderId || "",
				conflictResolutionStrategy: conflictResolutionStrategy || "rename",
				appId
			}, signal);
			onProgress?.({
				loaded: 0,
				total: file.size,
				percent: 5,
				speed: 0
			});
			if (!applyResult.isQuickUpload) {
				checkAborted();
				const uploadUrl = `${applyResult.domain}${applyResult.path}`;
				await this.putToUrl(file, uploadUrl, applyResult.headers, signal, onProgress);
			}
			checkAborted();
			const completeResult = await this.completeUpload({
				taskID: applyResult.taskID,
				confirmKey: applyResult.confirmKey,
				name,
				ext,
				fileSize: file.size,
				parentID: folderId || "",
				appId
			}, signal);
			onProgress?.({
				loaded: file.size,
				total: file.size,
				percent: 100,
				speed: 0
			});
			return {
				fileId: completeResult.fileID,
				objKey: "",
				fileUrl: completeResult.tencentDocURL
			};
		}
		/** PUT 到上传地址 */
		putToUrl(file, uploadUrl, headers, signal, onProgress) {
			if (!uploadUrl) throw new UploadError({ message: "ApplyUpload 未返回有效的上传地址（domain + path 为空）" });
			return new Promise((resolve, reject) => {
				const xhr = new XMLHttpRequest();
				const onAbort = () => {
					xhr.abort();
					reject(new UploadError({
						message: "上传已取消",
						code: -1
					}));
				};
				signal?.addEventListener("abort", onAbort, { once: true });
				xhr.upload.onprogress = (event) => {
					if (!event.lengthComputable) return;
					const percent = 5 + event.loaded / event.total * 90;
					onProgress?.({
						loaded: event.loaded,
						total: event.total,
						percent: Math.min(percent, 95)
					});
				};
				xhr.onload = () => {
					signal?.removeEventListener("abort", onAbort);
					if (xhr.status >= 200 && xhr.status < 300) resolve();
					else reject(new UploadError({
						message: `\u5B58\u50A8\u4E0A\u4F20\u5931\u8D25: HTTP ${xhr.status}`,
						code: xhr.status
					}));
				};
				xhr.onerror = () => {
					signal?.removeEventListener("abort", onAbort);
					reject(new UploadError({ message: "存储上传网络错误" }));
				};
				xhr.open("PUT", uploadUrl);
				xhr.setRequestHeader("Content-Type", file.type || "application/octet-stream");
				for (const [key, value] of Object.entries(headers)) xhr.setRequestHeader(key, value);
				xhr.send(file);
			});
		}
		/**
		* 拆开后端 OpenResponse 外壳，兼容 `{result}` / `{data}` / 裸对象三种返回形态。
		*
		* HttpClient 层只拦截 `ret` 业务码后原封透传整包，本方法负责在
		* UploadEngine 内部拿到真正承载业务字段的对象。
		*
		* 防御式兜底：极少数场景下 HttpClient 可能因 Content-Type 异常而把
		* 响应体以字符串形式透传上来，这里再做一次 JSON.parse 兜底，确保
		* 业务字段能被正确提取。
		*/
		unwrapResponse(data) {
			if (!data) return {};
			let payload = data;
			if (typeof payload === "string") try {
				payload = JSON.parse(payload);
			} catch {
				return {};
			}
			if (!payload || typeof payload !== "object") return {};
			const obj = payload;
			return obj.result || obj.data || obj || {};
		}
		/**
		* 为上传域名补齐协议头。
		*
		* 后端可能回裸 host（如 `cos.example.com`），SDK 统一补齐为
		* `https://` 前缀，确保调用方能直接用 `${domain}${path}` 拼接上传地址。
		*/
		normalizeDomain(raw) {
			const domain = raw || "";
			if (!domain) return "";
			if (domain.startsWith("http://") || domain.startsWith("https://")) return domain;
			return `https://${domain}`;
		}
	};
	POLL_INTERVAL = 500;
	MAX_POLL_COUNT = 600;
	FileModule = class {
		constructor(config) {
			this.httpClient = config.httpClient;
			this.logger = config.httpClient.getLogger();
			this.uploadEngine = new UploadEngine({
				httpClient: config.httpClient,
				concurrency: config.uploadConcurrency
			});
		}
		/**
		* ApplyUpload — 申请上传，获取上传链接和凭证。
		*
		* 接口：POST /api/v6/open/tdrive/upload/apply
		*/
		async applyUpload(params, signal) {
			return this.uploadEngine.applyUpload(params, signal);
		}
		/**
		* CompleteUpload — 确认上传完成。
		*
		* 接口：POST /api/v6/open/tdrive/upload/complete
		*/
		async completeUpload(params, signal) {
			return this.uploadEngine.completeUpload(params, signal);
		}
		/**
		* RenewUpload — 续期上传凭证。
		*
		* 接口：POST /api/v6/open/tdrive/upload/renew
		*/
		async renewUpload(params, signal) {
			return this.uploadEngine.renewUpload(params, signal);
		}
		/**
		* CancelUpload — 取消上传任务。
		*
		* 接口：POST /api/v6/open/tdrive/upload/cancel
		*/
		async cancelUpload(params, signal) {
			return this.uploadEngine.cancelUpload(params, signal);
		}
		/**
		* 上传单个文件（完整三步流程）
		*
		* 内部自动完成：applyUpload → PUT 文件到链接 → completeUpload
		*/
		async upload(file, options) {
			const { folderId, onProgress, signal, conflictResolutionStrategy, appId } = options;
			return this.uploadEngine.uploadFile({
				file,
				folderId,
				onProgress,
				signal,
				conflictResolutionStrategy,
				appId
			});
		}
		/**
		* 批量上传文件
		*/
		async batchUpload(files, options) {
			const { folderId, onProgress, signal, onTotalProgress, conflictResolutionStrategy, appId } = options;
			const succeeded = [];
			const failed = [];
			let completed = 0;
			const uploadPromises = files.map(async (file) => {
				try {
					const result = await this.uploadEngine.uploadFile({
						file,
						folderId,
						onProgress,
						signal,
						conflictResolutionStrategy,
						appId
					});
					succeeded.push(result);
				} catch (error) {
					failed.push({
						file,
						error: error instanceof Error ? error : new Error(String(error))
					});
				} finally {
					completed++;
					onTotalProgress?.({
						completed,
						total: files.length,
						failed: failed.length,
						percent: Math.round(completed / files.length * 100)
					});
				}
			});
			await Promise.allSettled(uploadPromises);
			return {
				succeeded,
				failed
			};
		}
		async download(fileIDOrParams, optionsOrSignal) {
			if (typeof fileIDOrParams === "object" && fileIDOrParams !== null && "fileID" in fileIDOrParams) {
				const signal = optionsOrSignal instanceof AbortSignal ? optionsOrSignal : void 0;
				return this.uploadEngine.driveDownload(fileIDOrParams, signal);
			}
			const fileID = fileIDOrParams;
			const options = optionsOrSignal;
			if (!options || !options.exportType) throw new DownloadError({ message: "在线文档下载需要指定 exportType（pdf / doc / sheet / slide）" });
			return this.downloadOfficeFile(fileID, options);
		}
		/**
		* 在线文档导出下载（内部实现）：
		*
		* 1. POST /openapi/drive/v2/files/{fileID}/async-export → operationID
		* 2. GET  /openapi/drive/v2/files/{fileID}/export-progress?operationID=xxx 轮询直到 progress=100
		*
		* 注意：对 drive 品类文件，后端可能首次调用进度接口就返回 progress=100；
		*      因此必须先发起请求再 sleep，不能有"最少轮询次数"的假设。
		*/
		async downloadOfficeFile(fileID, options) {
			const { exportType, onProgress, signal } = options;
			onProgress?.({
				status: "exporting",
				percent: 0
			});
			const operationID = (await this.httpClient.post(`/openapi/drive/v2/files/${encodeURIComponent(fileID)}/async-export`, { exportType }, { signal }))?.data?.operationID;
			if (!operationID) throw new DownloadError({ message: "异步导出接口未返回 operationID" });
			const progressPath = `/openapi/drive/v2/files/${encodeURIComponent(fileID)}/export-progress?operationID=${encodeURIComponent(operationID)}`;
			for (let pollCount = 0; pollCount < MAX_POLL_COUNT; pollCount++) {
				if (signal?.aborted) throw new DownloadError({
					message: "下载已取消",
					code: -1
				});
				const progressResp = await this.httpClient.get(progressPath, { signal });
				const progress = progressResp?.data?.progress ?? 0;
				const url = progressResp?.data?.url ?? "";
				if (progress === 100 && url) {
					onProgress?.({
						status: "done",
						percent: 100
					});
					return { url };
				}
				onProgress?.({
					status: "exporting",
					percent: progress
				});
				await this.sleep(POLL_INTERVAL);
			}
			onProgress?.({
				status: "failed",
				percent: 0
			});
			throw new DownloadError({ message: "导出超时，请稍后重试" });
		}
		/**
		* 获取附件预览链接（批量）
		*
		* 接口：POST /openapi/drive/v2/files/{fileID}/attachments
		*
		* 传入附件 hyperlinks 列表，后端会批量返回每个附件的预览链接。
		* hyperlinks 形如 "drive://b3b860c082e041ffb714b478184xxxxx/test.xlsx"。
		*
		* 所需 scope：attachment.queryable。
		*
		* @example
		* ```ts
		* const result = await sdk.file.getAttachments({
		*   fileID: 'FILE_ID',
		*   hyperlinks: ['drive://objkey1/a.xlsx', 'drive://objkey2/b.pdf'],
		*   expire: 3600,
		* })
		* // result.attachmentInfo → [{ hyperlink, previewURL }, ...]
		* ```
		*/
		async getAttachments(params, signal) {
			if (!params.fileID) throw new DownloadError({ message: "fileID 不能为空" });
			if (!params.hyperlinks || params.hyperlinks.length === 0) throw new DownloadError({ message: "hyperlinks 不能为空" });
			const body = {
				type: params.type ?? "preview",
				hyperlinks: params.hyperlinks
			};
			if (params.expire != null) body.expire = params.expire;
			const resp = await this.httpClient.post(`/openapi/drive/v2/files/${encodeURIComponent(params.fileID)}/attachments`, body, { signal });
			return {
				fileID: resp?.data?.fileID ?? params.fileID,
				attachmentInfo: resp?.data?.attachmentInfo ?? []
			};
		}
		/**
		* 移动网盘文件到指定目录
		*
		* 接口：`POST /api/v6/open/tdrive/file/move`
		*
		* 将文件移动到目标父目录，fileID 在移动后保持不变。
		*
		* ## wire / SDK DTO 命名分层
		*
		* - `fileID`           → wire `file_id`（必填）
		* - `dstParentID`      → wire `dst_parent_id`（必填，**不接受空串**）
		* - `conflictStrategy` → wire `conflict_strategy`（可选，默认 `ask`）
		*
		* @example
		* ```ts
		* const { fileID } = await sdk.file.move({
		*   fileID: 'FILE_ID',
		*   dstParentID: 'DEST_PARENT_FILE_ID',
		*   conflictStrategy: 'rename', // 可选
		* })
		* console.log(fileID) // 与传入的 fileID 相同
		* ```
		*/
		async move(params, signal) {
			if (!params.fileID) throw new ApiError({ message: "fileID 不能为空" });
			if (!params.dstParentID) throw new ApiError({ message: "dstParentID 不能为空（tdrive_api.md §4.2：不接受空串 / \"/\" / \"root\"，请先取子应用文件夹 fileID）" });
			const body = {
				file_id: params.fileID,
				dst_parent_id: params.dstParentID
			};
			if (params.conflictStrategy != null) body.conflict_strategy = params.conflictStrategy;
			const raw = await this.httpClient.post("/api/v6/open/tdrive/file/move", body, { signal });
			const payload = (raw?.data && typeof raw.data === "object" ? raw.data : void 0) ?? (raw?.result && typeof raw.result === "object" ? raw.result : void 0) ?? raw ?? {};
			const fileID = pickStr2(payload, "file_id", "fileId", "fileID", "FileID") || params.fileID;
			if (!pickStr2(payload, "file_id", "fileId", "fileID", "FileID")) this.logger.warn("[FileModule] file.move 响应缺少 file_id 字段，已退回到入参 fileID", {
				op: "file.move",
				snippet: snippetResponse(raw)
			});
			return { fileID };
		}
		/**
		* 转让文件所有权
		*
		* 接口：POST /api/v6/open/tdrive/trans_ownership
		*
		* 将文件所有权直接转让给目标用户，无需接收者确认。
		*
		* 所需 scope：file.creatable 或 drive.creatable
		*
		* ## wire / SDK DTO 命名分层
		*
		* - `fileID`   → wire `file_id`（必填，tdrive proto3 snake_case 首选，`tdrive_api.md` §3.12）
		* - `parentID` → wire `parent_id`（**必填**，tdrive_api.md §3.12 / §4.2）
		* - `ownerID`  → wire `dest_open_id`（必填，目标用户 openID）
		*
		* @example
		* ```ts
		* await sdk.file.transOwnership({
		*   fileID: 'FILE_ID',
		*   ownerID: 'TARGET_OPEN_ID',
		*   parentID: 'PARENT_DIR_ID',
		* })
		* ```
		*/
		async transOwnership(params, signal) {
			if (!params.fileID) throw new ApiError({ message: "fileID 不能为空" });
			if (!params.ownerID) throw new ApiError({ message: "ownerID 不能为空" });
			if (!params.parentID) throw new ApiError({ message: "parentID 不能为空（tdrive_api.md §3.12 / §4.2：parent_id 必填，不接受空串）" });
			const body = {
				file_id: params.fileID,
				dest_open_id: params.ownerID,
				parent_id: params.parentID
			};
			await this.httpClient.post("/api/v6/open/tdrive/trans_ownership", body, { signal });
			return {};
		}
		/**
		* 获取网盘文件的预览跳转 URL。
		*
		* 接口：`POST /api/v6/open/tdrive/file/preview-url`
		*
		* 拿到 `previewURL` 后客户端用 `window.open(previewURL)` 即可打开网盘
		* 原生的 HTML 预览页（Office / PDF 等）。
		*
		* ## wire / SDK DTO 命名分层
		*
		* SDK 契约保持 camelCase；wire 按 tendrive proto3 snake_case：
		* - `fileID`     → wire `file_id`（必填）
		* - `historyID`  → wire `history_id`（可选，空 = 最新版）
		* - `previewType`→ wire `type`（可选，`pic` = 缩略图；默认 `''` = HTML 预览）
		*
		* ## 使用注意
		*
		* - `previewURL` 带签名 token、**时效短**，禁止持久化 / 跨请求复用；
		*   每次点击现取现用。
		* - 不要把 `previewURL` 暴露到分享 / 复制链接入口——它是临时跳转凭证。
		* - 客户端若需新开标签页，建议先同步 `window.open('', '_blank')` 占位，
		*   再异步请求本接口，避免被浏览器当成弹窗拦截。
		*
		* @example
		* ```ts
		* // 预览最新版
		* const { previewURL } = await sdk.file.getPreviewURL({ fileID: 'FILE_ID' })
		* window.open(previewURL, '_blank')
		*
		* // 预览指定历史版本
		* const { previewURL } = await sdk.file.getPreviewURL({
		*   fileID: 'FILE_ID',
		*   historyID: '123',
		* })
		* ```
		*/
		async getPreviewURL(params, signal) {
			if (!params.fileID) throw new ApiError({ message: "fileID 不能为空" });
			const body = { file_id: params.fileID };
			if (params.historyID != null) body.history_id = params.historyID;
			if (params.previewType != null) body.type = params.previewType;
			const raw = await this.httpClient.post("/api/v6/open/tdrive/file/preview-url", body, { signal });
			const previewURL = pickStr2((raw?.data && typeof raw.data === "object" ? raw.data : void 0) ?? (raw?.result && typeof raw.result === "object" ? raw.result : void 0) ?? raw ?? {}, "preview_url", "previewUrl", "previewURL", "PreviewURL");
			if (!previewURL) {
				this.logger.error("[FileModule] getPreviewURL 响应缺失 preview_url", {
					op: "file.getPreviewURL",
					snippet: snippetResponse(raw)
				});
				throw new ParseError({
					message: "预览接口未返回 preview_url（HTTP 200 但响应字段缺失）",
					responseSnippet: snippetResponse(raw)
				});
			}
			return { previewURL };
		}
		/**
		* 获取文件列表
		*
		* 接口：GET /openapi/drive/v2/folders/{folderID}
		* 拉取目录下的文件与文件夹列表。
		*
		* @example
		* ```ts
		* const result = await sdk.file.list({
		*   folderId: 'FOLDER_ID',
		*   sortType: 'browse',
		*   asc: 0,
		*   start: 0,
		*   limit: 20,
		* })
		* console.log(result.files)
		* console.log(result.next) // 下一页 start 值
		* ```
		*/
		async list(options) {
			const { folderId = "", sortType = "browse", asc = 0, start = 0, limit = 20 } = options ?? {};
			const params = new URLSearchParams();
			params.set("sortType", sortType);
			params.set("asc", String(asc));
			params.set("start", String(start));
			params.set("limit", String(limit));
			const path = folderId ? `/openapi/drive/v2/folders/${encodeURIComponent(folderId)}?${params.toString()}` : `/openapi/drive/v2/folders?${params.toString()}`;
			let data;
			try {
				data = await this.httpClient.get(path);
			} catch (err) {
				throw new ListError({
					message: "获取文件列表失败",
					cause: err
				});
			}
			return {
				files: (data?.data?.list ?? []).map((item) => this.toFileInfoFromApi(item)),
				next: data?.data?.next
			};
		}
		/** 将 openapi 接口返回的 item 转为 FileInfo */
		toFileInfoFromApi(item) {
			const type = this.resolveFileTypeFromApiType(item.type);
			return {
				id: item.ID,
				name: item.title,
				type,
				size: 0,
				status: item.status,
				modifiedAt: item.lastModifyTime ? (/* @__PURE__ */ new Date(item.lastModifyTime * 1e3)).toISOString() : "",
				createTime: item.createTime ? (/* @__PURE__ */ new Date(item.createTime * 1e3)).toISOString() : void 0,
				lastBrowseTime: item.lastBrowseTime ? (/* @__PURE__ */ new Date(item.lastBrowseTime * 1e3)).toISOString() : void 0,
				owner: item.ownerName,
				isOwner: item.isOwner,
				isCreator: item.isCreator,
				creatorName: item.creatorName,
				docUrl: item.url,
				starred: item.starred ?? false,
				pinned: item.pinned ?? false
			};
		}
		/** 将 openapi 返回的 type 字符串映射为 FileType */
		resolveFileTypeFromApiType(apiType) {
			return {
				folder: "folder",
				doc: "doc",
				sheet: "xls",
				slide: "ppt",
				mind: "mind",
				form: "form",
				pdf: "pdf",
				smartsheet: "smart-sheet",
				smartdoc: "smart-doc"
			}[apiType] || "other";
		}
		sleep(ms) {
			return new Promise((resolve) => setTimeout(resolve, ms));
		}
	};
	PATH_DIR_LIST = "/api/v6/open/tdrive/dir/list";
	PATH_DIR_INFO = "/api/v6/open/tdrive/dir/info";
	PATH_DIR_CREATE = "/api/v6/open/tdrive/dir/create";
	PATH_DIR_RENAME = "/api/v6/open/tdrive/dir/rename";
	PATH_DIR_MOVE = "/api/v6/open/tdrive/dir/move";
	PATH_DIR_TRASH = "/api/v6/open/tdrive/dir/trash";
	PATH_DIR_CREATE_SHARED_FOLDER = "/api/v6/open/tdrive/shared-folder/create";
	PATH_DRIVE_SUBAPP_LIST = "/api/v6/open/tdrive/drive/subapp-list";
	PATH_DRIVE_APP_LIST = "/api/v6/open/tdrive/drive/app-list";
	PATH_DRIVE_CAPACITY = "/api/v6/open/tdrive/capacity";
	DirModule = class {
		constructor(config) {
			/**
			* 规整单条目，按 tdrive_api.md 约定的优先级兼容三套 wire 命名：
			*   1. snake_case     —— tdrive proto 首选（如 file_id / parent_id） ← 主流
			*   2. lowerCamelCase —— proto3 JSON 备选（fileId / parentId）
			*   3. 大写 ID 风格    —— 旧开放平台 entity（fileID / parentID） ← 兜底
			* 输出统一为 SDK 公共契约 fileID / parentID。
			*
			* 关键字段缺失（如 fileID 为空）时打 `logger.warn`，便于发现 wire 协议变更。
			*/
			this.normalizeEntry = (e) => {
				const fileID = e?.file_id ?? e?.fileId ?? e?.fileID ?? "";
				const parentID = e?.parent_id ?? e?.parentId ?? e?.parentID ?? "";
				const name = e?.name ?? "";
				const kind = e?.kind ?? 1;
				const rawSize = e?.size;
				const size = typeof rawSize === "number" ? rawSize : rawSize != null ? Number(rawSize) : 0;
				const rawCreate = e?.create_time ?? e?.createTime;
				const createTime = typeof rawCreate === "number" ? rawCreate : rawCreate != null ? Number(rawCreate) : 0;
				const rawModify = e?.modify_time ?? e?.modifyTime;
				const modifyTime = typeof rawModify === "number" ? rawModify : rawModify != null ? Number(rawModify) : 0;
				const ext = e?.ext ?? "";
				const modifyOpenId = e?.modify_open_id ?? e?.modifyOpenId ?? "";
				if (!fileID) this.logger.warn("[DirModule] normalizeEntry: fileID 缺失（wire 协议可能变更）", { snippet: snippetResponse(e) });
				return {
					fileID,
					parentID,
					name,
					kind,
					size,
					createTime,
					modifyTime,
					ext,
					modifyOpenId
				};
			};
			/** 规整子应用文件列表中的单条条目（按 snake_case 优先） */
			this.normalizeSubAppFile = (f) => {
				const fileID = f?.file_id ?? f?.fileId ?? f?.fileID ?? "";
				const parentID = f?.parent_id ?? f?.parentId ?? f?.parentID ?? "";
				const name = f?.name ?? "";
				const kind = f?.kind ?? 1;
				const rawSize = f?.size;
				const size = typeof rawSize === "number" ? rawSize : rawSize != null ? Number(rawSize) : 0;
				const rawCreate = f?.create_time ?? f?.createTime;
				const createTime = typeof rawCreate === "number" ? rawCreate : rawCreate != null ? Number(rawCreate) : 0;
				const rawModify = f?.modify_time ?? f?.modifyTime;
				const modifyTime = typeof rawModify === "number" ? rawModify : rawModify != null ? Number(rawModify) : 0;
				const ext = f?.ext ?? "";
				if (!fileID) this.logger.warn("[DirModule] normalizeSubAppFile: fileID 缺失", { snippet: snippetResponse(f) });
				return {
					fileID,
					parentID,
					name,
					kind,
					size,
					createTime,
					modifyTime,
					ext
				};
			};
			this.httpClient = config.httpClient;
			this.logger = config.httpClient.getLogger();
		}
		/**
		* 拉取指定目录下的条目列表。
		*
		* 接口：`POST /api/v6/open/tdrive/dir/list`
		*
		* 支持 cursor 翻页：首次请求 cursor 留空；
		* 如响应中的 nextCursor 非空则用它发起下一次请求，直到 nextCursor 为空。
		*
		* @param params `parentID` 必填且不能为空字符串；`limit` 默认 20，硬上限 20。
		* @param signal 取消信号
		*
		* @example
		* ```ts
		* let cursor = ''
		* do {
		*   const res = await sdk.dir.list({ parentID: 'xxx', cursor, limit: 20 })
		*   for (const e of res.entries) console.log(e.name, e.kind)
		*   cursor = res.nextCursor
		* } while (cursor)
		* ```
		*
		* @example 只拉文件夹，按修改时间升序
		* ```ts
		* const res = await sdk.dir.list({
		*   parentID: 'xxx',
		*   orderBy: 1,        // 1 = 修改时间
		*   ascending: true,
		*   entryKind: 1,      // 1 = 只返回文件夹
		* })
		* ```
		*/
		async list(params, signal) {
			if (!params.parentID) throw new DirError({ message: "parentID 不能为空" });
			const body = {
				parent_id: params.parentID,
				cursor: params.cursor ?? "",
				limit: params.limit ?? 20
			};
			if (params.orderBy != null) body.order_by = params.orderBy;
			if (params.ascending != null) body.ascending = params.ascending;
			if (params.entryKind != null) body.entry_kind = params.entryKind;
			try {
				const raw = await this.httpClient.post(PATH_DIR_LIST, body, { signal });
				const anyData = this.unwrap(raw);
				return {
					entries: this.normalizeArray(anyData, "entries", "dir.list").map(this.normalizeEntry),
					nextCursor: anyData.next_cursor ?? anyData.nextCursor ?? "",
					totalNum: typeof anyData.total_num === "number" ? anyData.total_num : anyData.total_num != null ? Number(anyData.total_num) : 0
				};
			} catch (err) {
				throw this.wrapError("获取网盘目录列表失败", err);
			}
		}
		/**
		* 查询目录或文件详情。
		*
		* 接口：`POST /api/v6/open/tdrive/dir/info`
		*
		* @param params `fileID` 必填
		* @param signal 取消信号
		*/
		async info(params, signal) {
			if (!params.fileID) throw new DirError({ message: "fileID 不能为空" });
			try {
				const raw = await this.httpClient.post(PATH_DIR_INFO, { file_id: params.fileID }, { signal });
				const entryRaw = this.unwrap(raw).entry;
				return { entry: entryRaw ? this.normalizeEntry(entryRaw) : null };
			} catch (err) {
				throw this.wrapError("获取网盘目录/文件详情失败", err);
			}
		}
		/**
		* 在指定父目录下创建一个新目录。
		*
		* 接口：`POST /api/v6/open/tdrive/dir/create`
		*
		* @param params `name`、`parentID` 均必填且不能为空字符串
		* @param signal 取消信号
		* @returns 新目录的 fileID
		*/
		async create(params, signal) {
			if (!params.parentID) throw new DirError({ message: "parentID 不能为空" });
			if (!params.name) throw new DirError({ message: "name 不能为空" });
			const body = {
				parent_id: params.parentID,
				name: params.name,
				app_id: params.appId
			};
			try {
				const raw = await this.httpClient.post(PATH_DIR_CREATE, body, { signal });
				const anyData = this.unwrap(raw);
				return { fileID: anyData.file_id ?? anyData.fileId ?? anyData.fileID ?? "" };
			} catch (err) {
				throw this.wrapError("创建网盘目录失败", err);
			}
		}
		/**
		* 重命名目录或文件。重命名后 fileID 保持不变。
		*
		* 接口：`POST /api/v6/open/tdrive/dir/rename`
		*
		* @param params `fileID`、`newName` 均必填
		* @param signal 取消信号
		*/
		async rename(params, signal) {
			if (!params.fileID) throw new DirError({ message: "fileID 不能为空" });
			if (!params.newName) throw new DirError({ message: "newName 不能为空" });
			const body = {
				file_id: params.fileID,
				new_name: params.newName
			};
			if (params.conflictStrategy != null) body.conflict_strategy = params.conflictStrategy;
			try {
				const raw = await this.httpClient.post(PATH_DIR_RENAME, body, { signal });
				const anyData = this.unwrap(raw);
				return { fileID: anyData.file_id ?? anyData.fileId ?? anyData.fileID ?? params.fileID };
			} catch (err) {
				throw this.wrapError("重命名网盘目录/文件失败", err);
			}
		}
		/**
		* 将指定目录或文件移动到新的父目录下。
		*
		* 接口：`POST /api/v6/open/tdrive/dir/move`
		*
		* `dstParentID` 为**必填**，且不接受空串 / `"/"` / `"root"`（tdrive_api.md §3.6 / §4.2）；
		* 如需移动到网盘根目录，请先通过 `driveSubAppList` / `driveAppList` 取到子应用文件夹的 fileID 后再传入。
		* 移动后 fileID 保持不变。
		*
		* @param params `fileID` / `dstParentID` 均必填
		* @param signal 取消信号
		*/
		async move(params, signal) {
			if (!params.fileID) throw new DirError({ message: "fileID 不能为空" });
			if (!params.dstParentID) throw new DirError({ message: "dstParentID 不能为空（tdrive_api.md §4.2：不接受空串 / \"/\" / \"root\"，请先取子应用文件夹 fileID）" });
			const body = {
				file_id: params.fileID,
				dst_parent_id: params.dstParentID
			};
			if (params.conflictStrategy != null) body.conflict_strategy = params.conflictStrategy;
			try {
				const raw = await this.httpClient.post(PATH_DIR_MOVE, body, { signal });
				const anyData = this.unwrap(raw);
				return { fileID: anyData.file_id ?? anyData.fileId ?? anyData.fileID ?? params.fileID };
			} catch (err) {
				throw this.wrapError("移动网盘目录/文件失败", err);
			}
		}
		/**
		* 将指定目录或文件放入回收站。
		*
		* 接口：`POST /api/v6/open/tdrive/dir/trash`
		*
		* @param params `fileID` 必填
		* @param signal 取消信号
		*/
		async trash(params, signal) {
			if (!params.fileID) throw new DirError({ message: "fileID 不能为空" });
			try {
				await this.httpClient.post(PATH_DIR_TRASH, { file_id: params.fileID }, { signal });
				return {};
			} catch (err) {
				throw this.wrapError("回收网盘目录/文件失败", err);
			}
		}
		/**
		* 创建共享文件夹（协作空间）。
		*
		* 接口：`POST /api/v6/open/tdrive/shared-folder/create`
		*
		* 此接口已迁移至 tdrive 网关，底层通过个人网盘应用目录创建文件夹。
		* 请求/响应字段遵循 proto3 JSON snake_case 规范。
		*
		* 所需 scope：`file.creatable` 或 `drive.creatable`
		*
		* @param params `title` 必填且不能为空字符串
		* @param signal 取消信号
		* @returns 共享文件夹的 fileID
		*
		* @example
		* ```ts
		* const result = await sdk.dir.createSharedFolder({
		*   title: '团队共享文件夹',
		*   folderType: 1,
		*   appID: 'your-app-id',
		* })
		* console.log(result.fileID)
		* ```
		*/
		async createSharedFolder(params, signal) {
			if (!params.title) throw new DirError({ message: "title 不能为空" });
			const body = { title: params.title };
			if (params.folderType != null) body.folder_type = params.folderType;
			if (params.appID != null) body.app_id = params.appID;
			try {
				const raw = await this.httpClient.post(PATH_DIR_CREATE_SHARED_FOLDER, body, { signal });
				const anyData = this.unwrap(raw);
				return { fileID: anyData.file_id ?? anyData.fileId ?? anyData.fileID ?? "" };
			} catch (err) {
				throw this.wrapError("创建网盘共享文件夹失败", err);
			}
		}
		/**
		* 查询用户个人空间根目录下子应用文件夹的内容列表。
		*
		* 接口：`POST /api/v6/open/tdrive/drive/subapp-list`
		*
		* 若用户根目录下不存在对应子应用文件夹，服务端会自动创建并返回空列表
		* （此时响应中 `created=true`）。
		*
		* 所需 scope：`file.queryable` 或 `drive.readonly`
		*
		* @param params 分页与排序参数
		* @param signal 取消信号
		*
		* @example
		* ```ts
		* const res = await sdk.dir.driveSubAppList({ offset: 0, count: 20 })
		* console.log(res.subFileID)  // 子应用文件夹的 fileID
		* console.log(res.files)      // 文件列表
		* console.log(res.finish)     // 是否已加载全部
		* ```
		*/
		async driveSubAppList(params, signal) {
			const body = {};
			if (params?.offset != null) body.offset = params.offset;
			if (params?.count != null) body.count = params.count;
			if (params?.orderBy != null) body.order_by = params.orderBy;
			if (params?.descending != null) body.descending = params.descending;
			try {
				const raw = await this.httpClient.post(PATH_DRIVE_SUBAPP_LIST, body, { signal });
				const anyData = this.unwrap(raw);
				return {
					files: this.normalizeArray(anyData, "files", "dir.driveSubAppList").map(this.normalizeSubAppFile),
					finish: anyData.finish ?? false,
					subFileID: anyData.sub_file_id ?? anyData.subFileId ?? anyData.subFileID ?? "",
					created: anyData.created ?? false
				};
			} catch (err) {
				throw this.wrapError("查询子应用根目录列表失败", err);
			}
		}
		/**
		* 查询用户网盘下指定 `appId` 的应用文件夹内容列表（首次访问自动开通）。
		*
		* 接口：`POST /api/v6/open/tdrive/drive/app-list`
		*
		* 当该应用文件夹尚未开通时，服务端会自动创建（首次开通），此时响应中
		* `created=true` 且 `files` 为空。
		*
		* 所需 scope：`file.queryable` 或 `drive.readonly`
		*
		* @param params `appId` 必填；其余为分页与排序参数
		* @param signal 取消信号
		*
		* @example
		* ```ts
		* const res = await sdk.dir.driveAppList({
		*   appId: 'your-app-id',
		*   offset: 0,
		*   count: 20,
		* })
		* console.log(res.appFileID)  // 应用文件夹的 fileID（可作为 dir/list 的 parentID）
		* console.log(res.files)
		* console.log(res.finish)
		* console.log(res.created)    // 首次访问会触发自动创建
		* ```
		*/
		async driveAppList(params, signal) {
			if (!params?.appId) throw new DirError({ message: "appId 不能为空" });
			const body = { app_id: params.appId };
			if (params.offset != null) body.offset = params.offset;
			if (params.count != null) body.count = params.count;
			if (params.orderBy != null) body.order_by = params.orderBy;
			if (params.descending != null) body.descending = params.descending;
			try {
				const raw = await this.httpClient.post(PATH_DRIVE_APP_LIST, body, { signal });
				const anyData = this.unwrap(raw);
				return {
					files: this.normalizeArray(anyData, "files", "dir.driveAppList").map(this.normalizeSubAppFile),
					finish: anyData.finish ?? false,
					appFileID: anyData.app_file_id ?? anyData.appFileId ?? anyData.appFileID ?? "",
					created: anyData.created ?? false
				};
			} catch (err) {
				throw this.wrapError("查询应用文件夹列表失败", err);
			}
		}
		/**
		* 查询当前用户的网盘容量使用情况。
		*
		* 接口：`POST /api/v6/open/tdrive/capacity`
		*
		* @param signal 取消信号
		* @returns 总容量、已使用容量（单位：字节）及容量配额组成明细
		*
		* @example
		* ```ts
		* const cap = await client.dir.spaceCapacity()
		* console.log('总容量:', cap.total, '字节')
		* console.log('已使用:', cap.used, '字节')
		* console.log('使用率:', ((cap.used / cap.total) * 100).toFixed(1) + '%')
		* // 订阅版本
		* console.log('订阅版本:', cap.composition?.subscription.edition)
		* ```
		*/
		async spaceCapacity(signal) {
			try {
				const raw = await this.httpClient.post(PATH_DRIVE_CAPACITY, {}, { signal });
				const anyData = this.unwrap(raw);
				return {
					total: typeof anyData.total === "number" ? anyData.total : Number(anyData.total ?? 0),
					used: typeof anyData.used === "number" ? anyData.used : Number(anyData.used ?? 0),
					composition: parseCapacityComposition(anyData.composition)
				};
			} catch (err) {
				throw this.wrapError("查询网盘容量失败", err);
			}
		}
		/**
		* 把响应字段当作数组使用：
		* - 字段缺失（undefined / null）：返回空数组（视为合法空响应）；
		* - 字段存在但不是数组：`logger.warn` 并返回空数组（避免上层崩溃，但保留可观测性）。
		*/
		normalizeArray(obj, field, opName) {
			const v = obj[field];
			if (v == null) return [];
			if (Array.isArray(v)) return v;
			this.logger.warn("[DirModule] 期望数组字段类型不匹配，已兜底为空数组", {
				op: opName,
				field,
				actualType: typeof v,
				snippet: snippetResponse(v)
			});
			return [];
		}
		/**
		* 剥离外层包装，兼容两种后端格式：
		*   - 开放平台：{ ret, msg, data: {...} }
		*   - 内部网关：{ retcode, msg, result: {...} }
		* 若既无 data 也无 result，则将整个响应体视为业务数据直接返回。
		*
		* 严格性：当响应体不是对象、或 data/result 字段存在但类型不是对象时，
		* 抛 `ParseError` 并 `logger.error` 记录上下文，避免 "200 但解析失败" 静默兜底。
		*/
		unwrap(raw, opName = "unwrap") {
			if (raw == null || typeof raw !== "object") {
				const pe = new ParseError({
					message: `${opName}: \u54CD\u5E94\u4F53\u4E0D\u662F\u5BF9\u8C61\uFF08type=${raw === null ? "null" : typeof raw}\uFF09`,
					responseSnippet: snippetResponse(raw)
				});
				this.logger.error("[DirModule] unwrap failed", {
					op: opName,
					actualType: raw === null ? "null" : typeof raw,
					responseSnippet: pe.responseSnippet
				});
				throw pe;
			}
			const r = raw;
			if (r.data != null) {
				if (typeof r.data !== "object") {
					const pe = new ParseError({
						message: `${opName}: data \u5B57\u6BB5\u4E0D\u662F\u5BF9\u8C61\uFF08type=${typeof r.data}\uFF09`,
						responseSnippet: snippetResponse(r.data)
					});
					this.logger.error("[DirModule] unwrap.data type mismatch", {
						op: opName,
						actualType: typeof r.data,
						responseSnippet: pe.responseSnippet
					});
					throw pe;
				}
				return r.data;
			}
			if (r.result != null) {
				if (typeof r.result !== "object") {
					const pe = new ParseError({
						message: `${opName}: result \u5B57\u6BB5\u4E0D\u662F\u5BF9\u8C61\uFF08type=${typeof r.result}\uFF09`,
						responseSnippet: snippetResponse(r.result)
					});
					this.logger.error("[DirModule] unwrap.result type mismatch", {
						op: opName,
						actualType: typeof r.result,
						responseSnippet: pe.responseSnippet
					});
					throw pe;
				}
				return r.result;
			}
			return raw;
		}
		/**
		* 统一将底层错误包装为 DirError，保留 code/traceId/cause。
		*
		* 同时透传 ParseError（不再二次包装），并在日志中携带完整上下文。
		*/
		wrapError(prefix, err) {
			if (err instanceof DirError) return err;
			const msg = err instanceof Error ? err.message : String(err);
			const anyErr = err;
			const wrapped = new DirError({
				message: `${prefix}: ${msg}`,
				code: typeof anyErr?.code === "number" ? anyErr.code : void 0,
				traceId: anyErr?.traceId,
				cause: err
			});
			this.logger.error("[DirModule] operation failed", {
				op: prefix,
				message: wrapped.message,
				code: wrapped.code,
				traceId: wrapped.traceId,
				requestId: anyErr?.requestId,
				httpStatus: anyErr?.httpStatus,
				errorName: err instanceof Error ? err.name : void 0
			});
			return wrapped;
		}
	};
	PATH_HISTORY_LIST = "/api/v6/open/tdrive/history/list";
	PATH_HISTORY_DELETE = "/api/v6/open/tdrive/history/delete";
	PATH_HISTORY_CLEAR = "/api/v6/open/tdrive/history/clear";
	PATH_HISTORY_SET_LATEST = "/api/v6/open/tdrive/history/set_latest";
	PATH_HISTORY_CONFIG_GET = "/api/v6/open/tdrive/history/config/get";
	PATH_HISTORY_CONFIG_SET = "/api/v6/open/tdrive/history/config/set";
	HistoryModule = class {
		constructor(config) {
			this.httpClient = config.httpClient;
			this.logger = config.httpClient.getLogger();
		}
		/**
		* 查看指定文件的历史版本列表。
		*
		* 接口：`POST /api/v6/open/tdrive/history/list`
		*
		* 支持两种分页模式：
		* 1. **marker 模式**：首次不传 marker，后续用响应的 nextMarker 翻页
		* 2. **page 模式**：传入 page + pageSize
		*
		* @param params `fileID` 必填；支持 marker/page 分页及排序选项
		* @param signal 取消信号
		*
		* @example
		* ```ts
		* // marker 模式
		* let marker = ''
		* do {
		*   const res = await sdk.history.listFileHistory({ fileID: 'xxx', marker, limit: 20 })
		*   for (const v of res.contents) console.log(v.version, v.name)
		*   marker = res.nextMarker
		* } while (marker)
		*
		* // page 模式
		* const res = await sdk.history.listFileHistory({ fileID: 'xxx', page: 1, pageSize: 10 })
		* console.log(res.totalNum, res.contents)
		* ```
		*/
		async listFileHistory(params, signal) {
			if (!params.fileID) throw new ApiError({ message: "fileID 不能为空" });
			const body = { file_id: params.fileID };
			if (params.marker) body.marker = params.marker;
			if (params.limit != null) body.limit = params.limit;
			if (params.page != null) body.page = params.page;
			if (params.pageSize != null) body.page_size = params.pageSize;
			if (params.orderBy) body.order_by = params.orderBy;
			if (params.orderByType) body.order_by_type = params.orderByType;
			try {
				const raw = await this.httpClient.post(PATH_HISTORY_LIST, body, { signal });
				const anyData = this.unwrap(raw, "history.listFileHistory");
				return {
					totalNum: pickNum2(anyData, "total_num", "totalNum"),
					hasMore: pickBool2(anyData, "has_more", "hasMore"),
					nextMarker: pickStr3(anyData, "next_marker", "nextMarker"),
					contents: this.normalizeArrayField(anyData, "contents", "history.listFileHistory").map(normalizeVersionItem)
				};
			} catch (err) {
				throw this.wrapError("获取文件历史版本列表失败", err);
			}
		}
		/**
		* 删除指定文件的一个或多个历史版本。
		*
		* 接口：`POST /api/v6/open/tdrive/history/delete`
		*
		* @param params `fileID` 和 `historyIDs` 均必填
		* @param signal 取消信号
		*
		* @example
		* ```ts
		* await sdk.history.deleteFileHistory({
		*   fileID: 'file-id',
		*   historyIDs: ['123', '456'],
		* })
		* ```
		*/
		async deleteFileHistory(params, signal) {
			if (!params.fileID) throw new ApiError({ message: "fileID 不能为空" });
			if (!params.historyIDs || params.historyIDs.length === 0) throw new ApiError({ message: "historyIDs 不能为空" });
			const body = {
				file_id: params.fileID,
				history_ids: params.historyIDs
			};
			try {
				await this.httpClient.post(PATH_HISTORY_DELETE, body, { signal });
				return {};
			} catch (err) {
				throw this.wrapError("删除文件历史版本失败", err);
			}
		}
		/**
		* 清空当前空间的所有历史版本（异步任务）。
		*
		* 接口：`POST /api/v6/open/tdrive/history/clear`
		*
		* @param signal 取消信号
		* @returns 返回异步任务 ID，可用于后续查询任务状态
		*
		* @example
		* ```ts
		* const result = await sdk.history.clearLibraryHistory()
		* console.log('清空任务 ID:', result.taskID)
		* ```
		*/
		async clearLibraryHistory(signal) {
			try {
				const raw = await this.httpClient.post(PATH_HISTORY_CLEAR, {}, { signal });
				return { taskID: pickNum2(this.unwrap(raw), "task_id", "taskId", "taskID") };
			} catch (err) {
				throw this.wrapError("清空历史版本失败", err);
			}
		}
		/**
		* 将指定历史版本设置为当前最新版本（版本回滚）。
		*
		* 接口：`POST /api/v6/open/tdrive/history/set_latest`
		*
		* @param params `fileID` 和 `historyID` 均必填
		* @param signal 取消信号
		*
		* @example
		* ```ts
		* const result = await sdk.history.setHistoryLatest({
		*   fileID: 'file-id',
		*   historyID: '123',
		* })
		* console.log('回滚后文件名:', result.name, '大小:', result.size)
		* ```
		*/
		async setHistoryLatest(params, signal) {
			if (!params.fileID) throw new ApiError({ message: "fileID 不能为空" });
			if (!params.historyID) throw new ApiError({ message: "historyID 不能为空" });
			const body = {
				file_id: params.fileID,
				history_id: params.historyID
			};
			try {
				const raw = await this.httpClient.post(PATH_HISTORY_SET_LATEST, body, { signal });
				const anyData = this.unwrap(raw);
				return {
					name: pickStr3(anyData, "name"),
					type: pickStr3(anyData, "type"),
					creationTime: pickStr3(anyData, "creation_time", "creationTime"),
					modificationTime: pickStr3(anyData, "modification_time", "modificationTime"),
					setLatestTime: pickStr3(anyData, "set_latest_time", "setLatestTime"),
					contentType: pickStr3(anyData, "content_type", "contentType"),
					size: pickNum2(anyData, "size"),
					etag: pickStr3(anyData, "e_tag", "eTag", "etag", "ETag"),
					crc64: pickStr3(anyData, "crc64"),
					previewByDoc: pickBool2(anyData, "preview_by_doc", "previewByDoc"),
					previewByCi: pickBool2(anyData, "preview_by_ci", "previewByCi"),
					previewAsIcon: pickBool2(anyData, "preview_as_icon", "previewAsIcon"),
					fileType: pickStr3(anyData, "file_type", "fileType")
				};
			} catch (err) {
				throw this.wrapError("设置历史版本为最新版本失败", err);
			}
		}
		/**
		* 查询当前空间的历史版本配置信息。
		*
		* 接口：`POST /api/v6/open/tdrive/history/config/get`
		*
		* @param signal 取消信号
		*
		* @example
		* ```ts
		* const config = await sdk.history.getHistoryConfig()
		* console.log('是否开启:', config.enableFileHistory)
		* console.log('最大数量:', config.fileHistoryCount)
		* console.log('过期天数:', config.fileHistoryExpireDay)
		* console.log('合并间隔:', config.mergeInterval, '秒')
		* ```
		*/
		async getHistoryConfig(signal) {
			try {
				const raw = await this.httpClient.post(PATH_HISTORY_CONFIG_GET, {}, { signal });
				const anyData = this.unwrap(raw);
				return {
					enableFileHistory: pickBool2(anyData, "enable_file_history", "enableFileHistory"),
					fileHistoryCount: pickNum2(anyData, "file_history_count", "fileHistoryCount"),
					fileHistoryExpireDay: pickNum2(anyData, "file_history_expire_day", "fileHistoryExpireDay"),
					mergeInterval: pickNum2(anyData, "merge_interval", "mergeInterval")
				};
			} catch (err) {
				throw this.wrapError("查询历史版本配置失败", err);
			}
		}
		/**
		* 设置当前空间的历史版本配置信息。
		*
		* 接口：`POST /api/v6/open/tdrive/history/config/set`
		*
		* @param params 配置参数（所有字段均可选，仅传需要修改的字段）
		* @param signal 取消信号
		*
		* @example
		* ```ts
		* await sdk.history.setHistoryConfig({
		*   enableFileHistory: true,
		*   fileHistoryCount: 100,
		*   fileHistoryExpireDay: 365,
		*   mergeInterval: 3600,
		* })
		* ```
		*/
		async setHistoryConfig(params, signal) {
			const body = {};
			if (params.enableFileHistory != null) body.enable_file_history = params.enableFileHistory;
			if (params.fileHistoryCount != null) body.file_history_count = params.fileHistoryCount;
			if (params.fileHistoryExpireDay != null) body.file_history_expire_day = params.fileHistoryExpireDay;
			if (params.mergeInterval != null) body.merge_interval = params.mergeInterval;
			try {
				await this.httpClient.post(PATH_HISTORY_CONFIG_SET, body, { signal });
				return {};
			} catch (err) {
				throw this.wrapError("设置历史版本配置失败", err);
			}
		}
		/**
		* 剥离 OpenResponse 外层包装，兼容两种后端格式：
		*   - 开放平台：{ ret, msg, data: {...} }
		*   - 内部网关：{ retcode, msg, result: {...} }
		*/
		/**
		* 剥离 OpenResponse 信封。
		*
		* 严格性：当 raw 不是对象 / data/result 字段类型异常时抛 ParseError 并 logger.error，
		* 避免静默兜底导致下游拿到全空对象。
		*/
		unwrap(raw, opName = "history.unwrap") {
			if (raw == null || typeof raw !== "object") {
				const pe = new ParseError({
					message: `${opName}: \u54CD\u5E94\u4F53\u4E0D\u662F\u5BF9\u8C61\uFF08type=${raw === null ? "null" : typeof raw}\uFF09`,
					responseSnippet: snippetResponse(raw)
				});
				this.logger.error("[HistoryModule] unwrap failed", {
					op: opName,
					actualType: raw === null ? "null" : typeof raw,
					responseSnippet: pe.responseSnippet
				});
				throw pe;
			}
			const r = raw;
			if (r.data != null) {
				if (typeof r.data !== "object") {
					const pe = new ParseError({
						message: `${opName}: data \u5B57\u6BB5\u4E0D\u662F\u5BF9\u8C61\uFF08type=${typeof r.data}\uFF09`,
						responseSnippet: snippetResponse(r.data)
					});
					this.logger.error("[HistoryModule] unwrap.data type mismatch", {
						op: opName,
						actualType: typeof r.data,
						responseSnippet: pe.responseSnippet
					});
					throw pe;
				}
				return r.data;
			}
			if (r.result != null) {
				if (typeof r.result !== "object") {
					const pe = new ParseError({
						message: `${opName}: result \u5B57\u6BB5\u4E0D\u662F\u5BF9\u8C61\uFF08type=${typeof r.result}\uFF09`,
						responseSnippet: snippetResponse(r.result)
					});
					this.logger.error("[HistoryModule] unwrap.result type mismatch", {
						op: opName,
						actualType: typeof r.result,
						responseSnippet: pe.responseSnippet
					});
					throw pe;
				}
				return r.result;
			}
			return raw;
		}
		/**
		* 把响应字段当作数组使用：缺失返回空数组，类型不匹配则 logger.warn + 兜底空数组。
		*/
		normalizeArrayField(obj, field, opName) {
			const v = obj[field];
			if (v == null) return [];
			if (Array.isArray(v)) return v;
			this.logger.warn("[HistoryModule] 期望数组字段类型不匹配，已兜底为空数组", {
				op: opName,
				field,
				actualType: typeof v,
				snippet: snippetResponse(v)
			});
			return [];
		}
		/**
		* 统一将底层错误包装为 ApiError，保留 code/traceId/cause，
		* 并通过 logger.error 透传完整上下文便于排查。
		*/
		wrapError(prefix, err) {
			if (err instanceof ApiError) return err;
			const msg = err instanceof Error ? err.message : String(err);
			const anyErr = err;
			const wrapped = new ApiError({
				message: `${prefix}: ${msg}`,
				code: typeof anyErr?.code === "number" ? anyErr.code : void 0,
				httpStatus: anyErr?.httpStatus,
				traceId: anyErr?.traceId,
				requestId: anyErr?.requestId,
				cause: err
			});
			this.logger.error("[HistoryModule] operation failed", {
				op: prefix,
				message: wrapped.message,
				code: wrapped.code,
				traceId: wrapped.traceId,
				requestId: anyErr?.requestId,
				httpStatus: anyErr?.httpStatus,
				errorName: err instanceof Error ? err.name : void 0
			});
			return wrapped;
		}
	};
	PATH_SEARCH_FILE = "/api/v6/open/tdrive/search/file";
	PATH_SEARCH_CONTENT = "/api/v6/open/tdrive/search/content";
	PATH_SEARCH_RAG_DOC = "/api/v6/open/tdrive/search/rag-doc";
	PATH_SEARCH_RAG_IMAGE = "/api/v6/open/tdrive/search/rag-image";
	LIMIT_FILE_DEFAULT = 20;
	LIMIT_FILE_MAX = 20;
	LIMIT_CONTENT_DEFAULT = 20;
	LIMIT_CONTENT_MAX = 20;
	LIMIT_RAG_DOC_DEFAULT = 10;
	LIMIT_RAG_DOC_MAX = 10;
	LIMIT_RAG_IMAGE_DEFAULT = 20;
	LIMIT_RAG_IMAGE_MAX = 20;
	SearchModule = class {
		constructor(config) {
			this.httpClient = config.httpClient;
			this.logger = config.httpClient.getLogger();
		}
		/**
		* 网盘基础搜索：按文件名 + 元数据过滤。
		*
		* 接口：`POST /api/v6/open/tdrive/search/file`
		*
		* 支持 cursor 翻页：首次请求 cursor 留空；
		* 如响应中的 nextCursor 非空则用它发起下一次请求，直到 nextCursor 为空。
		*
		* @param params  `keywords` 至少传 1 个；`parentID` 为空表示用户的网盘根；
		*                `limit` 默认 20，硬上限 20。
		* @param signal  取消信号
		*
		* @example
		* ```ts
		* let cursor = ''
		* do {
		*   const res = await client.search.file({
		*     keywords: ['年报', '2025'],
		*     parentID: 'FOLDER_ID',
		*     fileTypes: ['doc'],
		*     limit: 20,
		*     cursor,
		*   })
		*   for (const h of res.hits) console.log(h.name, h.fileID)
		*   cursor = res.nextCursor
		* } while (cursor)
		* ```
		*/
		async file(params, signal) {
			if (!Array.isArray(params.keywords) || params.keywords.length === 0) throw new SearchError({ message: "keywords 至少需要一个关键词" });
			if (!params.parentID) throw new SearchError({ message: "parentID 不能为空" });
			const body = {
				keywords: params.keywords,
				parent_id: params.parentID,
				file_types: params.fileTypes ?? [],
				in_extnames: params.inExtnames ?? [],
				exclude_extnames: params.excludeExtnames ?? [],
				min_file_size: params.minFileSize ?? 0,
				max_file_size: params.maxFileSize ?? 0,
				modification_time_start: params.modificationTimeStart ?? 0,
				modification_time_end: params.modificationTimeEnd ?? 0,
				labels: params.labels ?? [],
				categories: params.categories ?? [],
				cursor: params.cursor ?? "",
				limit: normalizeLimit(params.limit, LIMIT_FILE_DEFAULT, LIMIT_FILE_MAX)
			};
			try {
				const raw = await this.httpClient.post(PATH_SEARCH_FILE, body, { signal });
				const anyData = this.unwrap(raw, "search.file");
				return {
					hits: this.normalizeArrayField(anyData, "hits", "search.file").map(normalizeFileHit),
					nextCursor: anyData.next_cursor ?? anyData.nextCursor ?? ""
				};
			} catch (err) {
				throw this.wrapError("网盘基础搜索失败", err);
			}
		}
		/**
		* 网盘正文搜索：按文件正文检索，返回命中片段 + 高亮。
		*
		* 接口：`POST /api/v6/open/tdrive/search/content`
		*
		* 与 file 相同支持 cursor 翻页。
		*
		* @param params `keywords` 至少传 1 个；`limit` 默认 20，硬上限 20。
		* @param signal 取消信号
		*/
		async content(params, signal) {
			if (!Array.isArray(params.keywords) || params.keywords.length === 0) throw new SearchError({ message: "keywords 至少需要一个关键词" });
			const body = {
				keywords: params.keywords,
				in_extnames: params.inExtnames ?? [],
				exclude_extnames: params.excludeExtnames ?? [],
				file_types: params.fileTypes ?? [],
				modification_time_start: params.modificationTimeStart ?? 0,
				modification_time_end: params.modificationTimeEnd ?? 0,
				labels: params.labels ?? [],
				categories: params.categories ?? [],
				min_file_size: params.minFileSize ?? 0,
				max_file_size: params.maxFileSize ?? 0,
				cursor: params.cursor ?? "",
				limit: normalizeLimit(params.limit, LIMIT_CONTENT_DEFAULT, LIMIT_CONTENT_MAX)
			};
			try {
				const raw = await this.httpClient.post(PATH_SEARCH_CONTENT, body, { signal });
				const anyData = this.unwrap(raw, "search.content");
				return {
					hits: this.normalizeArrayField(anyData, "hits", "search.content").map(normalizeContentHit),
					nextCursor: anyData.next_cursor ?? anyData.nextCursor ?? ""
				};
			} catch (err) {
				throw this.wrapError("网盘正文搜索失败", err);
			}
		}
		/**
		* 网盘 RAG 文档搜索：自然语言 → 段落级命中。单页返回，无 cursor。
		*
		* 接口：`POST /api/v6/open/tdrive/search/rag-doc`
		*
		* @param params `keywords` 必填（单段自然语言）；`parentID` 必填；
		*               `limit` 默认 10，硬上限 10。
		* @param signal 取消信号
		*
		* @example
		* ```ts
		* const res = await client.search.ragDoc({
		*   keywords: '总结一下今年所有产品发布会的关键动作',
		*   parentID: 'FOLDER_ID',
		*   fileTypes: ['doc'],
		*   limit: 10,
		* })
		* for (const h of res.hits) console.log(h.snippet, h.fileID)
		* ```
		*/
		async ragDoc(params, signal) {
			if (!params.keywords) throw new SearchError({ message: "keywords 不能为空" });
			if (!params.parentID) throw new SearchError({ message: "parentID 不能为空（tdrive_api.md §4.2：不接受空串 / \"/\" / \"root\"）" });
			const body = {
				keywords: params.keywords,
				parent_id: params.parentID,
				file_types: params.fileTypes ?? [],
				in_extnames: params.inExtnames ?? [],
				exclude_extnames: params.excludeExtnames ?? [],
				labels: params.labels ?? [],
				categories: params.categories ?? [],
				modification_time_start: params.modificationTimeStart ?? 0,
				modification_time_end: params.modificationTimeEnd ?? 0,
				limit: normalizeLimit(params.limit, LIMIT_RAG_DOC_DEFAULT, LIMIT_RAG_DOC_MAX)
			};
			try {
				const raw = await this.httpClient.post(PATH_SEARCH_RAG_DOC, body, { signal });
				const anyData = this.unwrap(raw, "search.ragDoc");
				return { hits: this.normalizeArrayField(anyData, "hits", "search.ragDoc").map(normalizeRagDocHit) };
			} catch (err) {
				throw this.wrapError("网盘 RAG 文档搜索失败", err);
			}
		}
		/**
		* 网盘 RAG 图片搜索：自然语言 → 图片命中。单页返回，无 cursor。
		*
		* 接口：`POST /api/v6/open/tdrive/search/rag-image`
		*
		* @param params `keywords` 必填（单段自然语言）；`parentID` 必填；
		*               `limit` 默认 20，硬上限 20。
		* @param signal 取消信号
		*/
		async ragImage(params, signal) {
			if (!params.keywords) throw new SearchError({ message: "keywords 不能为空" });
			if (!params.parentID) throw new SearchError({ message: "parentID 不能为空（tdrive_api.md §4.2：不接受空串 / \"/\" / \"root\"）" });
			const body = {
				keywords: params.keywords,
				parent_id: params.parentID,
				file_types: params.fileTypes ?? [],
				in_extnames: params.inExtnames ?? [],
				exclude_extnames: params.excludeExtnames ?? [],
				labels: params.labels ?? [],
				categories: params.categories ?? [],
				modification_time_start: params.modificationTimeStart ?? 0,
				modification_time_end: params.modificationTimeEnd ?? 0,
				limit: normalizeLimit(params.limit, LIMIT_RAG_IMAGE_DEFAULT, LIMIT_RAG_IMAGE_MAX)
			};
			try {
				const raw = await this.httpClient.post(PATH_SEARCH_RAG_IMAGE, body, { signal });
				const anyData = this.unwrap(raw, "search.ragImage");
				return { hits: this.normalizeArrayField(anyData, "hits", "search.ragImage").map(normalizeRagImageHit) };
			} catch (err) {
				throw this.wrapError("网盘 RAG 图片搜索失败", err);
			}
		}
		/**
		* 拆掉 OpenResponse 信封：
		*   - 标准格式：{ ret: 0, msg: "", data: {...} } → 取 .data
		*   - 后端直接返回业务体的兜底：直接当 data 用
		*
		* 业务错误码已在 HttpClient.request 中统一拦截抛出，
		* 走到这里的都是 ret=0 / 无 ret 的成功响应。
		*
		* 严格性：当 raw 不是对象 / data 字段类型异常时抛 ParseError
		* 并 logger.error，避免静默兜底导致下游拿到全空对象。
		*/
		unwrap(raw, opName = "search.unwrap") {
			if (raw == null || typeof raw !== "object") {
				const pe = new ParseError({
					message: `${opName}: \u54CD\u5E94\u4F53\u4E0D\u662F\u5BF9\u8C61\uFF08type=${raw === null ? "null" : typeof raw}\uFF09`,
					responseSnippet: snippetResponse(raw)
				});
				this.logger.error("[SearchModule] unwrap failed", {
					op: opName,
					actualType: raw === null ? "null" : typeof raw,
					responseSnippet: pe.responseSnippet
				});
				throw pe;
			}
			const r = raw;
			if (r.data !== void 0) {
				if (r.data !== null && typeof r.data !== "object") {
					const pe = new ParseError({
						message: `${opName}: data \u5B57\u6BB5\u4E0D\u662F\u5BF9\u8C61\uFF08type=${typeof r.data}\uFF09`,
						responseSnippet: snippetResponse(r.data)
					});
					this.logger.error("[SearchModule] unwrap.data type mismatch", {
						op: opName,
						actualType: typeof r.data,
						responseSnippet: pe.responseSnippet
					});
					throw pe;
				}
				return r.data;
			}
			if (r.result !== void 0) {
				if (r.result !== null && typeof r.result !== "object") {
					const pe = new ParseError({
						message: `${opName}: result \u5B57\u6BB5\u4E0D\u662F\u5BF9\u8C61\uFF08type=${typeof r.result}\uFF09`,
						responseSnippet: snippetResponse(r.result)
					});
					this.logger.error("[SearchModule] unwrap.result type mismatch", {
						op: opName,
						actualType: typeof r.result,
						responseSnippet: pe.responseSnippet
					});
					throw pe;
				}
				return r.result;
			}
			return raw;
		}
		/**
		* 把响应字段当作数组使用：
		* - 缺失（undefined / null）→ 空数组（合法的"零结果"响应）；
		* - 存在但不是数组 → `logger.warn` + 返回空数组（避免上层崩溃，但保留可观测性）。
		*/
		normalizeArrayField(obj, field, opName) {
			const v = obj[field];
			if (v == null) return [];
			if (Array.isArray(v)) return v;
			this.logger.warn("[SearchModule] 期望数组字段类型不匹配，已兜底为空数组", {
				op: opName,
				field,
				actualType: typeof v,
				snippet: snippetResponse(v)
			});
			return [];
		}
		/** 把任意异常包装成 SearchError，保留 traceId / 原始错误，并通过 logger 透传上下文 */
		wrapError(prefix, err) {
			if (err instanceof SearchError) return err;
			const e = err;
			const wrapped = new SearchError({
				message: `${prefix}: ${e?.message ?? String(err)}`,
				code: e?.code,
				traceId: e?.traceId,
				cause: err
			});
			this.logger.error("[SearchModule] operation failed", {
				op: prefix,
				message: wrapped.message,
				code: wrapped.code,
				traceId: wrapped.traceId,
				requestId: e?.requestId,
				httpStatus: e?.httpStatus,
				errorName: e?.name
			});
			return wrapped;
		}
	};
	DEFAULT_CONFIG = {
		baseURL: "https://drive.tencent.com",
		timeout: 3e4,
		uploadConcurrency: 5
	};
	DriveClient = class {
		constructor(config) {
			const { clientId, openId, baseURL = DEFAULT_CONFIG.baseURL, accessToken, onAuthExpired, timeout = DEFAULT_CONFIG.timeout, uploadConcurrency = DEFAULT_CONFIG.uploadConcurrency, logger } = config;
			if (!clientId) throw new Error("[DriveSDK] clientId 是必填参数");
			this.tokenManager = new TokenManager({
				accessToken,
				onAuthExpired
			});
			this.httpClient = new HttpClient({
				baseURL,
				timeout,
				tokenManager: this.tokenManager,
				clientId,
				openId,
				logger: normalizeLogger(logger)
			});
			this.file = new FileModule({
				httpClient: this.httpClient,
				uploadConcurrency
			});
			this.dir = new DirModule({ httpClient: this.httpClient });
			this.history = new HistoryModule({ httpClient: this.httpClient });
			this.search = new SearchModule({ httpClient: this.httpClient });
		}
		/**
		* 设置 / 更新 access token
		*
		* 用于调用方在外部完成 OAuth2 授权或 token 刷新后，向 SDK 注入新 token。
		*/
		setAccessToken(token) {
			this.tokenManager.setAccessToken(token);
		}
		/**
		* 获取当前 access token
		*/
		getAccessToken() {
			return this.tokenManager.getAccessToken();
		}
		/**
		* 设置自定义请求头（后续所有请求都会带上）
		*/
		setCustomHeader(key, value) {
			this.httpClient.setCustomHeader(key, value);
		}
		/**
		* 移除自定义请求头
		*/
		removeCustomHeader(key) {
			this.httpClient.removeCustomHeader(key);
		}
		/**
		* 获取当前所有自定义请求头
		*/
		getCustomHeaders() {
			return this.httpClient.getCustomHeaders();
		}
		/**
		* 销毁实例，清理内部状态
		*/
		destroy() {
			this.tokenManager.clear();
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/my-files/api/netdrive-logger.ts
/**
* 业务层日志（drive-sdk 调用 / 业务流程关键节点）。
*
* 行格式：`[netdrive] [NetDrive] <message>` —— 双前缀，外层 scope 由通用层注入。
*
* @param level   info | warn | error
* @param tag     固定为 [NetDrive]，保留参数仅为调用点更易读
* @param message 日志正文（已包含结构化字段，调用方负责拼好）
*/
function logNetDrive(level, tag, message) {
	writeRendererLog("netdrive", level, `${tag} ${message}`);
}
var init_netdrive_logger = __esmMin((() => {
	init_http_logger();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/my-files/api/netdrive-service.ts
function isTokenExpired(tokenInfo) {
	if (!tokenInfo) return true;
	return Date.now() >= tokenInfo.obtainedAt + tokenInfo.expiresIn * 1e3 - TOKEN_REFRESH_BUFFER_MS;
}
function normalizeResources(raw) {
	if (Array.isArray(raw)) return raw.map((item) => String(item)).filter(Boolean);
	if (typeof raw === "string" && raw.trim()) return [raw.trim()];
}
function createNetDriveServiceStore() {
	const initializePromises = /* @__PURE__ */ new Map();
	const refreshPromises = /* @__PURE__ */ new Map();
	const sdkClientPool = /* @__PURE__ */ new Map();
	let disposalGen = 0;
	let store;
	/**
	* 获取/创建 SDK client。
	*
	* tokenInfo 未就绪时返回 null（不抛错），由调用方走"空数据兜底"分支。
	* 这样可以避免在 initialize() 异步窗口里被并发入口调用时报错刷屏，
	* UI 在 sdkReady 后会重试，自然恢复。
	*
	* 注意：每次调用都从 store 实时读 state，避免闭包捕获过期 snapshot。
	*/
	function getOrCreateSdkClient(_state) {
		const state = store.getState();
		const tokenInfo = state.tokenInfo;
		if (!tokenInfo) return null;
		const clientId = tokenInfo.clientId || TODO_PLACEHOLDER;
		const baseUrl = tokenInfo.baseUrl || "";
		const projectId = state.currentProjectId;
		const cached = sdkClientPool.get(projectId);
		if (cached && cached.clientId === clientId && cached.baseUrl === baseUrl) {
			cached.client.setAccessToken(tokenInfo.accessToken);
			if (tokenInfo.openid) cached.client.setCustomHeader("Open-Id", tokenInfo.openid);
			if (tokenInfo.envId) cached.client.setCustomHeader("env-id", tokenInfo.envId);
			return cached.client;
		}
		if (cached) {
			try {
				cached.client.destroy();
			} catch {}
			sdkClientPool.delete(projectId);
		}
		const newClient = new DriveClient({
			clientId,
			openId: tokenInfo.openid || void 0,
			accessToken: tokenInfo.accessToken,
			baseURL: tokenInfo.baseUrl || void 0,
			onAuthExpired: () => {
				logNetDrive("warn", "[NetDrive]", `onAuthExpired triggered by SDK projectId="${projectId}"`);
				store.getState().refreshToken().then((newToken) => {
					sdkClientPool.get(projectId)?.client.setAccessToken(newToken.accessToken);
				}).catch((err) => {
					console.error("[NetDrive] onAuthExpired: token 刷新失败:", err);
					logNetDrive("error", "[NetDrive]", `onAuthExpired refresh failed projectId="${projectId}" reason="${err?.message || String(err)}"`);
				});
			}
		});
		if (tokenInfo.openid) newClient.setCustomHeader("Open-Id", tokenInfo.openid);
		if (tokenInfo.envId) newClient.setCustomHeader("env-id", tokenInfo.envId);
		sdkClientPool.set(projectId, {
			client: newClient,
			clientId,
			baseUrl
		});
		return newClient;
	}
	store = createStore((set, get) => ({
		initialized: false,
		tokenInfo: null,
		adapter: null,
		rootFolderId: null,
		currentProjectId: "",
		initialize: async (adapter, projectId = "") => {
			const initGen = disposalGen;
			let currentUserId = "";
			try {
				const account = await adapter.getAccount();
				currentUserId = account?.uid || account?.nickname || "";
			} catch {}
			if (disposalGen !== initGen) return;
			const state = get();
			const cachedUserId = state.tokenInfo?.userId || "";
			if (state.initialized && state.tokenInfo && !isTokenExpired(state.tokenInfo) && state.currentProjectId === projectId && currentUserId !== "" && cachedUserId === currentUserId) return;
			if (state.initialized && (cachedUserId !== currentUserId || state.currentProjectId !== projectId)) {
				for (const [key, entry] of sdkClientPool) {
					try {
						entry.client.destroy();
					} catch {}
					sdkClientPool.delete(key);
				}
				if (cachedUserId !== currentUserId) {
					_nicknameCache.clear();
					_nicknameBatchStates.clear();
					try {
						localStorage.removeItem("myFiles.lastUploadFolderId");
						localStorage.removeItem("myFiles.lastUploadFolderName");
					} catch {}
				}
				set({
					initialized: false,
					tokenInfo: null,
					rootFolderId: null,
					currentProjectId: projectId
				});
			}
			const existing = initializePromises.get(projectId);
			if (existing) return existing;
			set({
				adapter,
				currentProjectId: projectId
			});
			const promise = (async () => {
				try {
					const tokenInfo = await fetchAccessToken(adapter, projectId);
					if (disposalGen !== initGen) return;
					addBusinessRuntimeBaseUrl("netdrive", tokenInfo.baseUrl);
					const oldTokenInfo = get().tokenInfo;
					if (oldTokenInfo && (oldTokenInfo.userId !== tokenInfo.userId || oldTokenInfo.baseUrl !== tokenInfo.baseUrl)) for (const [key, entry] of sdkClientPool) {
						try {
							entry.client.destroy();
						} catch {}
						sdkClientPool.delete(key);
					}
					if (oldTokenInfo && (oldTokenInfo.edition !== tokenInfo.edition || oldTokenInfo.tenantId !== tokenInfo.tenantId || oldTokenInfo.spaceId !== tokenInfo.spaceId)) {
						_nicknameCache.clear();
						_nicknameBatchStates.clear();
						try {
							localStorage.removeItem("myFiles.lastUploadFolderId");
							localStorage.removeItem("myFiles.lastUploadFolderName");
						} catch {}
					}
					const resources = tokenInfo.resources;
					set({
						tokenInfo,
						rootFolderId: (resources && resources.length > 0 && resources[0] !== "*" ? resources[0] : "") || null,
						initialized: true
					});
				} catch (err) {
					if (disposalGen !== initGen) return;
					console.error("[NetDrive] initialize: 失败:", err);
					logNetDrive("error", "[NetDrive]", `initialize failed projectId="${projectId}" reason="${err?.message || String(err)}"`);
					set({ initialized: true });
					throw err;
				} finally {
					initializePromises.delete(projectId);
				}
			})();
			initializePromises.set(projectId, promise);
			return promise;
		},
		getAccessToken: async () => {
			const state = get();
			if (!isTokenExpired(state.tokenInfo)) return state.tokenInfo.accessToken;
			return (await get().refreshToken()).accessToken;
		},
		refreshToken: async () => {
			const { adapter, tokenInfo, currentProjectId } = get();
			if (!adapter) throw new Error("[NetDriveService] adapter 未初始化，无法刷新 token");
			const existing = refreshPromises.get(currentProjectId);
			if (existing) return existing;
			const projectId = tokenInfo?.projectId ?? currentProjectId;
			const refreshGen = disposalGen;
			const promise = (async () => {
				try {
					const newTokenInfo = await fetchAccessToken(adapter, projectId);
					if (disposalGen !== refreshGen) return newTokenInfo;
					set({ tokenInfo: newTokenInfo });
					addBusinessRuntimeBaseUrl("netdrive", newTokenInfo.baseUrl);
					const cached = sdkClientPool.get(currentProjectId);
					if (cached) cached.client.setAccessToken(newTokenInfo.accessToken);
					return newTokenInfo;
				} catch (err) {
					if (disposalGen !== refreshGen) throw err;
					logNetDrive("error", "[NetDrive]", `refreshToken failed projectId="${currentProjectId}" reason="${err?.message || String(err)}"`);
					throw err;
				} finally {
					refreshPromises.delete(currentProjectId);
				}
			})();
			refreshPromises.set(currentProjectId, promise);
			return promise;
		},
		getClient: () => createNetDriveClient(get()),
		getSpaceId: () => get().tokenInfo?.spaceId ?? null,
		getRootFolderId: () => get().rootFolderId || "",
		dispose: () => {
			disposalGen += 1;
			for (const [key, entry] of sdkClientPool) {
				try {
					entry.client.destroy();
				} catch {}
				sdkClientPool.delete(key);
			}
			initializePromises.clear();
			refreshPromises.clear();
			set({
				initialized: false,
				tokenInfo: null,
				adapter: null,
				rootFolderId: null,
				currentProjectId: ""
			});
		},
		reset: () => {
			for (const [, entry] of sdkClientPool) try {
				entry.client.destroy();
			} catch {}
			sdkClientPool.clear();
			initializePromises.clear();
			refreshPromises.clear();
			set({
				initialized: false,
				tokenInfo: null,
				rootFolderId: null,
				currentProjectId: ""
			});
		}
	}));
	/**
	* 通过 driveSubAppList 兜底获取根目录 ID。
	* 当后端 access-token 接口未返回 resources 时回退到此方式。
	*/
	async function fallbackGetRootFolderIdViaSubApp(state) {
		try {
			const sdk = getOrCreateSdkClient(state);
			if (!sdk) return "";
			const rootId = (await sdk.dir.driveSubAppList({
				offset: 0,
				count: 1
			})).subFileID || "";
			if (rootId) store.setState({ rootFolderId: rootId });
			else console.warn("[NetDrive] fallbackGetRootFolderIdViaSubApp: driveSubAppList 返回空 subFileID");
			return rootId;
		} catch (err) {
			console.error("[NetDrive] fallbackGetRootFolderIdViaSubApp: 调用失败:", err);
			return "";
		}
	}
	function resolveParentId(explicitId, state) {
		if (explicitId) return Promise.resolve(explicitId);
		const rootId = state.rootFolderId;
		if (rootId) return Promise.resolve(rootId);
		if (state.initialized) {
			console.warn("[NetDrive] resolveParentId: rootFolderId 为空，尝试通过 driveSubAppList 兜底获取");
			return fallbackGetRootFolderIdViaSubApp(state);
		}
		return new Promise((resolve) => {
			const timeout = setTimeout(() => {
				unsub();
				console.warn("[NetDrive] resolveParentId: 等待超时，尝试 driveSubAppList 兜底");
				fallbackGetRootFolderIdViaSubApp(store.getState()).then(resolve);
			}, 1e4);
			const unsub = store.subscribe((s) => {
				if (s.rootFolderId) {
					clearTimeout(timeout);
					unsub();
					resolve(s.rootFolderId);
				} else if (s.initialized && !s.rootFolderId) {
					clearTimeout(timeout);
					unsub();
					console.warn("[NetDrive] resolveParentId: SDK 已初始化但无 rootFolderId，尝试 driveSubAppList 兜底");
					fallbackGetRootFolderIdViaSubApp(s).then(resolve);
				}
			});
			const current = store.getState();
			if (current.rootFolderId) {
				clearTimeout(timeout);
				unsub();
				resolve(current.rootFolderId);
			} else if (current.initialized) {
				clearTimeout(timeout);
				unsub();
				fallbackGetRootFolderIdViaSubApp(current).then(resolve);
			}
		});
	}
	/**
	* 创建 NetDriveClient 实例。
	*
	* 所有子模块均走真实 @tencent/drive-sdk@0.24.3：
	* - dir: list / create / rename / trash / move
	* - file: upload / download
	* - version: list (history.listFileHistory) / restore (history.setHistoryLatest)
	* - search: file (search.file)
	*/
	function createNetDriveClient(_state) {
		/**
		* 确保 token 有效（必要时刷新）。
		* tokenInfo 未就绪时返回 false，调用方需走"空数据兜底"分支，不再抛错。
		*/
		const ensureToken = async () => {
			try {
				const current = store.getState();
				if (!current.adapter || !current.tokenInfo) return false;
				await current.getAccessToken();
				return true;
			} catch {
				return false;
			}
		};
		/**
		* 取就绪的 SDK 实例：未就绪时返回 null（不打日志），由调用方走空数据兜底。
		* 注意：内部用 store.getState() 实时读，绕开了入参 state 的快照问题。
		*/
		const getReadySdk = async () => {
			if (!await ensureToken()) return null;
			return getOrCreateSdkClient();
		};
		/**
		* 计算自 t0 起经过的毫秒数（取整）。
		* 业务日志使用 performance.now() 而非 Date.now()，单调时钟，不受系统时间调整影响。
		*/
		const elapsedMs = (t0) => Math.round(performance.now() - t0);
		/**
		* 把 SDK 错误统一格式化为日志行（错误路径详记）。
		*
		* 格式与主进程 IPC `[DomainRPC]` 链路对齐：
		*   `<action> FAIL <ms>ms code=<n> httpStatus=<n> trace=<id> reason="<msg>"`
		*
		* SDK 异常类（DriveSDKError 及其子类、ApiError 等）自带 code/traceId/httpStatus 属性。
		* paramsSummary 仅在排查特定操作时有价值（如 dir.move 的 fileID），保留作为追加字段。
		*/
		const formatSdkError = (action, durationMs, paramsSummary, err) => {
			return `${action} FAIL ${durationMs}ms code=${err?.code ?? err?.retcode ?? err?.data?.retcode ?? ""} httpStatus=${err?.httpStatus ?? ""} trace=${err?.traceId ?? ""} reason="${err?.message ?? String(err)}"${paramsSummary ? ` ${paramsSummary}` : ""}`;
		};
		return {
			dir: {
				list: async (params) => {
					const sdk = await getReadySdk();
					if (!sdk) return {
						entries: [],
						nextCursor: "",
						totalNum: 0
					};
					const parentID = await resolveParentId(params.parentID, store.getState());
					const listParams = {
						cursor: params.cursor || "",
						limit: params.limit ?? 20
					};
					if (parentID) listParams.parentID = parentID;
					if (params.orderBy !== void 0) listParams.orderBy = params.orderBy;
					if (params.ascending !== void 0) listParams.ascending = params.ascending;
					if (params.entryKind !== void 0) listParams.entryKind = params.entryKind;
					const t0 = performance.now();
					try {
						const result = await sdk.dir.list(listParams);
						return {
							entries: result.entries,
							nextCursor: result.nextCursor,
							totalNum: result.totalNum
						};
					} catch (err) {
						if (err instanceof AuthError) {
							const newToken = await store.getState().refreshToken();
							sdk.setAccessToken(newToken.accessToken);
							const result = await sdk.dir.list(listParams);
							return {
								entries: result.entries,
								nextCursor: result.nextCursor,
								totalNum: result.totalNum
							};
						}
						logNetDrive("error", "[NetDrive]", formatSdkError("dir.list", elapsedMs(t0), "", err));
						throw err;
					}
				},
				info: async (params) => {
					const sdk = await getReadySdk();
					if (!sdk) return { entry: null };
					const t0 = performance.now();
					try {
						return { entry: (await sdk.dir.info({ fileID: params.fileID })).entry };
					} catch (err) {
						if (err instanceof AuthError) {
							const newToken = await store.getState().refreshToken();
							sdk.setAccessToken(newToken.accessToken);
							return { entry: (await sdk.dir.info({ fileID: params.fileID })).entry };
						}
						logNetDrive("error", "[NetDrive]", formatSdkError("dir.info", elapsedMs(t0), `fileID="${params.fileID}"`, err));
						throw err;
					}
				},
				create: async (params) => {
					const sdk = await getReadySdk();
					if (!sdk) return { fileID: "" };
					const appId = params.appId || store.getState().tokenInfo?.appId || TODO_PLACEHOLDER;
					const parentID = await resolveParentId(params.parentID, store.getState());
					const t0 = performance.now();
					try {
						return { fileID: (await sdk.dir.create({
							parentID,
							name: params.name,
							appId
						})).fileID };
					} catch (err) {
						if (err instanceof AuthError) {
							const newToken = await store.getState().refreshToken();
							sdk.setAccessToken(newToken.accessToken);
							return { fileID: (await sdk.dir.create({
								parentID,
								name: params.name,
								appId
							})).fileID };
						}
						logNetDrive("error", "[NetDrive]", formatSdkError("dir.create", elapsedMs(t0), "", err));
						throw err;
					}
				},
				rename: async (params) => {
					const sdk = await getReadySdk();
					if (!sdk) return;
					const t0 = performance.now();
					try {
						await sdk.dir.rename({
							fileID: params.fileID,
							newName: params.newName
						});
					} catch (err) {
						if (err instanceof AuthError) {
							const newToken = await store.getState().refreshToken();
							sdk.setAccessToken(newToken.accessToken);
							await sdk.dir.rename({
								fileID: params.fileID,
								newName: params.newName
							});
							return;
						}
						logNetDrive("error", "[NetDrive]", formatSdkError("dir.rename", elapsedMs(t0), `fileID="${params.fileID}"`, err));
						throw err;
					}
				},
				trash: async (params) => {
					const sdk = await getReadySdk();
					if (!sdk) return;
					const t0 = performance.now();
					try {
						await sdk.dir.trash({ fileID: params.fileID });
					} catch (err) {
						if (err instanceof AuthError) {
							const newToken = await store.getState().refreshToken();
							sdk.setAccessToken(newToken.accessToken);
							await sdk.dir.trash({ fileID: params.fileID });
							return;
						}
						logNetDrive("error", "[NetDrive]", formatSdkError("dir.trash", elapsedMs(t0), `fileID="${params.fileID}"`, err));
						throw err;
					}
				},
				move: async (params) => {
					const sdk = await getReadySdk();
					if (!sdk) return { fileID: "" };
					const dstParentID = params.dstParentID || await resolveParentId(params.dstParentID, store.getState());
					const moveParams = {
						fileID: params.fileID,
						dstParentID
					};
					if (params.conflictStrategy) moveParams.conflictStrategy = params.conflictStrategy;
					const doMove = async () => sdk.dir.move(moveParams);
					const t0 = performance.now();
					try {
						return { fileID: (await doMove()).fileID };
					} catch (err) {
						if (err instanceof AuthError) {
							const newToken = await store.getState().refreshToken();
							sdk.setAccessToken(newToken.accessToken);
							return { fileID: (await doMove()).fileID };
						}
						const code = err?.code;
						const retcode = err?.retcode ?? err?.data?.retcode ?? err?.response?.retcode;
						const msg = (err?.message ?? "").toLowerCase();
						if (code === "SameNameDirectoryOrFileExists" || code === "SameNameExist" || retcode === 329119 || msg.includes("同名") || msg.includes("conflict") || msg.includes("same name")) {
							logNetDrive("warn", "[NetDrive]", `dir.move CONFLICT ${elapsedMs(t0)}ms fileID="${params.fileID}" trace=${err?.traceId || ""}`);
							const conflictErr = /* @__PURE__ */ new Error("移动冲突：目标文件夹已存在同名文件或文件夹");
							conflictErr.code = "SameNameDirectoryOrFileExists";
							conflictErr.retcode = retcode || 329119;
							conflictErr.data = err?.data || {};
							throw conflictErr;
						}
						logNetDrive("error", "[NetDrive]", formatSdkError("dir.move", elapsedMs(t0), `fileID="${params.fileID}"`, err));
						throw err;
					}
				},
				spaceCapacity: async () => {
					const sdk = await getReadySdk();
					if (!sdk) return {
						total: 0,
						used: 0
					};
					const t0 = performance.now();
					try {
						return await sdk.dir.spaceCapacity();
					} catch (err) {
						if (err instanceof AuthError) {
							const newToken = await store.getState().refreshToken();
							sdk.setAccessToken(newToken.accessToken);
							return sdk.dir.spaceCapacity();
						}
						logNetDrive("error", "[NetDrive]", formatSdkError("dir.spaceCapacity", elapsedMs(t0), "", err));
						throw err;
					}
				}
			},
			file: {
				upload: async (file, options) => {
					const sdk = await getReadySdk();
					if (!sdk) throw new Error("网盘服务尚未就绪，请稍后重试");
					const tokenInfo = store.getState().tokenInfo;
					const sdkOptions = {
						appId: options.appId || tokenInfo.appId || TODO_PLACEHOLDER,
						folderId: await resolveParentId(options.folderId, store.getState()),
						signal: options.signal,
						onProgress: options.onProgress ? (p) => options.onProgress({
							loaded: p.loaded,
							total: p.total
						}) : void 0,
						conflictResolutionStrategy: options.conflictResolutionStrategy
					};
					const doUpload = async () => sdk.file.upload(file, sdkOptions);
					const t0 = performance.now();
					let result;
					try {
						result = await doUpload();
					} catch (err) {
						if (err instanceof AuthError) {
							const newToken = await store.getState().refreshToken();
							sdk.setAccessToken(newToken.accessToken);
							result = await doUpload();
						} else {
							if ((err?.retcode ?? err?.data?.retcode ?? err?.response?.retcode ?? (typeof err?.code === "number" ? err.code : void 0)) === 329119) {
								logNetDrive("warn", "[NetDrive]", `file.upload CONFLICT ${elapsedMs(t0)}ms size=${file.size} trace=${err?.traceId || ""}`);
								const conflictErr = /* @__PURE__ */ new Error("文件冲突：目标文件夹已存在同名文件");
								conflictErr.code = "SameNameDirectoryOrFileExists";
								conflictErr.retcode = 329119;
								conflictErr.data = err?.data || {};
								throw conflictErr;
							}
							logNetDrive("error", "[NetDrive]", formatSdkError("file.upload", elapsedMs(t0), `size=${file.size}`, err));
							throw err;
						}
					}
					return { fileID: result.fileId };
				},
				download: async (params) => {
					const sdk = await getReadySdk();
					if (!sdk) return { url: "" };
					const t0 = performance.now();
					try {
						return { url: (await sdk.file.download({ fileID: params.fileID })).url };
					} catch (err) {
						if (err instanceof AuthError) {
							const newToken = await store.getState().refreshToken();
							sdk.setAccessToken(newToken.accessToken);
							return { url: (await sdk.file.download({ fileID: params.fileID })).url };
						}
						logNetDrive("error", "[NetDrive]", formatSdkError("file.download", elapsedMs(t0), `fileID="${params.fileID}"`, err));
						throw err;
					}
				},
				getAttachments: async (params) => {
					const sdk = await getReadySdk();
					if (!sdk) return {
						fileID: params.fileID,
						attachmentInfo: []
					};
					const sdkParams = {
						fileID: params.fileID,
						hyperlinks: params.hyperlinks,
						type: params.type ?? "preview",
						expire: params.expire
					};
					const t0 = performance.now();
					try {
						const result = await sdk.file.getAttachments(sdkParams);
						return {
							fileID: result.fileID,
							attachmentInfo: result.attachmentInfo.map((info) => ({
								hyperlink: info.hyperlink,
								previewURL: info.previewURL
							}))
						};
					} catch (err) {
						if (err instanceof AuthError) {
							const newToken = await store.getState().refreshToken();
							sdk.setAccessToken(newToken.accessToken);
							const result = await sdk.file.getAttachments(sdkParams);
							return {
								fileID: result.fileID,
								attachmentInfo: result.attachmentInfo.map((info) => ({
									hyperlink: info.hyperlink,
									previewURL: info.previewURL
								}))
							};
						}
						logNetDrive("error", "[NetDrive]", formatSdkError("file.getAttachments", elapsedMs(t0), `fileID="${params.fileID}"`, err));
						throw err;
					}
				},
				getPreviewUrl: async (params) => {
					const sdk = await getReadySdk();
					if (!sdk) return { previewURL: "" };
					const fileModule = sdk.file;
					const sdkParams = {
						fileID: params.fileID,
						previewType: params.previewType ?? ""
					};
					if (params.historyID) sdkParams.historyID = params.historyID;
					const t0 = performance.now();
					try {
						return { previewURL: (await fileModule.getPreviewURL(sdkParams)).previewURL };
					} catch (err) {
						if (err instanceof AuthError) {
							const newToken = await store.getState().refreshToken();
							sdk.setAccessToken(newToken.accessToken);
							return { previewURL: (await fileModule.getPreviewURL(sdkParams)).previewURL };
						}
						logNetDrive("error", "[NetDrive]", formatSdkError("file.getPreviewUrl", elapsedMs(t0), `fileID="${params.fileID}"`, err));
						throw err;
					}
				}
			},
			version: {
				list: async (params) => {
					const sdk = await getReadySdk();
					if (!sdk) return {
						versions: [],
						nextMarker: "",
						totalNum: 0
					};
					const mapVersionItem = (item) => ({
						versionID: String(item.id),
						versionNumber: item.version,
						createdAt: item.creationTime,
						author: item.createdBy,
						authorInitial: item.createdBy ? item.createdBy.charAt(0).toUpperCase() : "?",
						isCurrent: item.isLatestVersion,
						size: item.size
					});
					const t0 = performance.now();
					try {
						const result = await sdk.history.listFileHistory({
							fileID: params.fileID,
							marker: params.marker || void 0,
							limit: params.limit ?? 20
						});
						return {
							versions: result.contents.map(mapVersionItem),
							nextMarker: result.nextMarker,
							totalNum: result.totalNum
						};
					} catch (err) {
						if (err instanceof AuthError) {
							const newToken = await store.getState().refreshToken();
							sdk.setAccessToken(newToken.accessToken);
							const result = await sdk.history.listFileHistory({
								fileID: params.fileID,
								marker: params.marker || void 0,
								limit: params.limit ?? 20
							});
							return {
								versions: result.contents.map(mapVersionItem),
								nextMarker: result.nextMarker,
								totalNum: result.totalNum
							};
						}
						logNetDrive("error", "[NetDrive]", formatSdkError("version.list", elapsedMs(t0), `fileID="${params.fileID}"`, err));
						throw err;
					}
				},
				restore: async (params) => {
					const sdk = await getReadySdk();
					if (!sdk) return;
					const t0 = performance.now();
					try {
						await sdk.history.setHistoryLatest({
							fileID: params.fileID,
							historyID: params.historyID
						});
					} catch (err) {
						if (err instanceof AuthError) {
							const newToken = await store.getState().refreshToken();
							sdk.setAccessToken(newToken.accessToken);
							await sdk.history.setHistoryLatest({
								fileID: params.fileID,
								historyID: params.historyID
							});
							return;
						}
						logNetDrive("error", "[NetDrive]", formatSdkError("version.restore", elapsedMs(t0), `fileID="${params.fileID}" historyID="${params.historyID}"`, err));
						throw err;
					}
				}
			},
			search: { file: async (params) => {
				const sdk = await getReadySdk();
				if (!sdk) return {
					hits: [],
					nextCursor: ""
				};
				const parentID = await resolveParentId(params.parentID, store.getState());
				const searchParams = {
					keywords: params.keywords,
					parentID,
					cursor: params.cursor || "",
					limit: params.limit ?? 20
				};
				const t0 = performance.now();
				try {
					const result = await sdk.search.file(searchParams);
					return {
						hits: result.hits,
						nextCursor: result.nextCursor
					};
				} catch (err) {
					if (err instanceof AuthError) {
						const newToken = await store.getState().refreshToken();
						sdk.setAccessToken(newToken.accessToken);
						const result = await sdk.search.file(searchParams);
						return {
							hits: result.hits,
							nextCursor: result.nextCursor
						};
					}
					logNetDrive("error", "[NetDrive]", formatSdkError("search.file", elapsedMs(t0), "", err));
					throw err;
				}
			} }
		};
	}
	return store;
}
async function fetchAccessToken(adapter, projectId) {
	if (!adapter.getNetDriveAccessToken) throw new Error("当前环境不支持云端文件功能");
	const raw = await adapter.getNetDriveAccessToken({
		projectId: projectId || "",
		scope: "all"
	});
	const resp = raw?.data?.accessToken ? raw.data : raw;
	if (!resp.success) {
		const rawDetail = resp.error || resp.msg || raw?.msg || "未知错误";
		const detail = typeof rawDetail === "string" ? rawDetail.replace(/\s*\{[\s\S]*\}\s*$/, "").trim() || rawDetail : String(rawDetail);
		throw new Error(`获取网盘 token 失败: ${detail}`);
	}
	let clientId = resp.clientId || "";
	if (!clientId && resp.accessToken) try {
		const parts = resp.accessToken.split(".");
		if (parts.length >= 2) clientId = JSON.parse(atob(parts[1])).clt || "";
	} catch {}
	if (!clientId) {
		console.warn("[NetDrive] fetchAccessToken: clientId 缺失，SDK 调用可能失败");
		clientId = TODO_PLACEHOLDER;
	}
	return {
		accessToken: resp.accessToken,
		refreshToken: resp.refreshToken,
		tokenType: resp.tokenType || "Bearer",
		expiresIn: resp.expiresIn,
		userId: resp.userId,
		scope: resp.scope || "all",
		edition: resp.edition,
		tenantId: resp.tenantId,
		spaceId: resp.spaceId,
		projectId: resp.projectId || projectId || "",
		clientId,
		appId: resp.appId || TODO_PLACEHOLDER,
		openid: resp.userId,
		obtainedAt: Date.now(),
		actions: resp.actions,
		resources: normalizeResources(resp.resources),
		dirName: resp.dirName,
		baseUrl: resp.baseUrl || "",
		envName: resp.envName || "",
		envId: resp.envId || ""
	};
}
/** 获取 appId，支持传入自定义 store */
function getNetDriveAppId(store = netDriveServiceStore) {
	return store.getState().tokenInfo?.appId || TODO_PLACEHOLDER;
}
function getNicknameBatchState(pid) {
	let s = _nicknameBatchStates.get(pid);
	if (!s) {
		s = {
			promise: null,
			pendingUserIds: /* @__PURE__ */ new Set()
		};
		_nicknameBatchStates.set(pid, s);
	}
	return s;
}
/** 调用后端 /issue-jump-code 接口获取网盘购买页跳转 code */
async function fetchPurchaseCode(storeInstance = netDriveServiceStore) {
	const adapter = storeInstance.getState().adapter;
	if (!adapter?.getNetDrivePurchaseCode) return "";
	const resp = await adapter.getNetDrivePurchaseCode();
	return (resp.data ?? resp).jumpCode || "";
}
/** 调用后端 /enterprise-info 接口获取企业版网盘购买页跳转所需的加密企业身份信息 */
async function fetchEnterpriseInfo(storeInstance = netDriveServiceStore) {
	const adapter = storeInstance.getState().adapter;
	if (!adapter?.getNetDriveEnterpriseInfo) return "";
	return (await adapter.getNetDriveEnterpriseInfo()).encrypted || "";
}
/**
* 批量反查网盘用户昵称。
*
* - 按 projectId 隔离 in-flight 状态，个人盘和项目盘互不干扰。
* - 同一 projectId 下的并发调用自动合并为一次请求。
*
* @param storeInstance 可选，传入项目盘 store 实例；默认使用全局个人盘实例。
*/
async function batchGetNicknames(tokenUserIds, projectId, storeInstance = netDriveServiceStore) {
	const adapter = storeInstance.getState().adapter;
	if (!adapter?.getNetDriveNicknames) return {};
	const pid = projectId ?? storeInstance.getState().tokenInfo?.projectId ?? "";
	if (!_nicknameCache.has(pid)) _nicknameCache.set(pid, /* @__PURE__ */ new Map());
	const cache = _nicknameCache.get(pid);
	const result = {};
	const missing = [];
	for (const uid of tokenUserIds) if (cache.has(uid)) result[uid] = cache.get(uid);
	else missing.push(uid);
	if (missing.length === 0) return result;
	const batch = getNicknameBatchState(pid);
	for (const uid of missing) batch.pendingUserIds.add(uid);
	if (batch.promise) {
		await batch.promise;
		for (const uid of missing) if (cache.has(uid)) result[uid] = cache.get(uid);
		return result;
	}
	batch.promise = new Promise((resolve) => {
		Promise.resolve().then(async () => {
			const idsToFetch = Array.from(batch.pendingUserIds);
			batch.pendingUserIds = /* @__PURE__ */ new Set();
			if (idsToFetch.length === 0) {
				resolve();
				batch.promise = null;
				return;
			}
			try {
				const resp = await adapter.getNetDriveNicknames({
					projectId: pid,
					netdriveUserIds: idsToFetch
				});
				const payload = resp.data ?? resp;
				const projectCache = _nicknameCache.get(pid) ?? /* @__PURE__ */ new Map();
				if (!_nicknameCache.has(pid)) _nicknameCache.set(pid, projectCache);
				if (payload.nicknames) for (const [uid, name] of Object.entries(payload.nicknames)) projectCache.set(uid, name);
				if (payload.notFound) {
					for (const uid of payload.notFound) if (!projectCache.has(uid)) projectCache.set(uid, "");
				}
			} catch (err) {
				console.error("[NetDrive] batchGetNicknames: 失败:", err);
			} finally {
				resolve();
				batch.promise = null;
			}
		});
	});
	await batch.promise;
	for (const uid of missing) if (cache.has(uid)) result[uid] = cache.get(uid);
	return result;
}
var TOKEN_REFRESH_BUFFER_MS, TODO_PLACEHOLDER, netDriveServiceStore, _nicknameCache, _nicknameBatchStates;
var init_netdrive_service = __esmMin((() => {
	init_dist();
	init_vanilla();
	init_http_logger();
	init_netdrive_logger();
	TOKEN_REFRESH_BUFFER_MS = 300 * 1e3;
	TODO_PLACEHOLDER = "todo";
	netDriveServiceStore = createNetDriveServiceStore();
	_nicknameCache = /* @__PURE__ */ new Map();
	_nicknameBatchStates = /* @__PURE__ */ new Map();
}));
//#endregion
export { getNetDriveAppId as a, fetchPurchaseCode as i, createNetDriveServiceStore as n, init_netdrive_service as o, fetchEnterpriseInfo as r, netDriveServiceStore as s, batchGetNicknames as t };
