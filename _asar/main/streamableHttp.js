const require_chunk = require("./chunk.js");
const require_types = require("./types.js");
require("http");
let stream = require("stream");
let crypto$1 = require("crypto");
crypto$1 = require_chunk.__toESM(crypto$1, 1);
let http2 = require("http2");
//#region ../../node_modules/@hono/node-server/dist/index.mjs
var RequestError = class extends Error {
	constructor(message, options) {
		super(message, options);
		this.name = "RequestError";
	}
};
var toRequestError = (e) => {
	if (e instanceof RequestError) return e;
	return new RequestError(e.message, { cause: e });
};
var GlobalRequest = global.Request;
var Request = class extends GlobalRequest {
	constructor(input, options) {
		if (typeof input === "object" && getRequestCache in input) input = input[getRequestCache]();
		if (typeof options?.body?.getReader !== "undefined") options.duplex ??= "half";
		super(input, options);
	}
};
var newHeadersFromIncoming = (incoming) => {
	const headerRecord = [];
	const rawHeaders = incoming.rawHeaders;
	for (let i = 0; i < rawHeaders.length; i += 2) {
		const { [i]: key, [i + 1]: value } = rawHeaders;
		if (key.charCodeAt(0) !== 58) headerRecord.push([key, value]);
	}
	return new Headers(headerRecord);
};
var wrapBodyStream = Symbol("wrapBodyStream");
var newRequestFromIncoming = (method, url, headers, incoming, abortController) => {
	const init = {
		method,
		headers,
		signal: abortController.signal
	};
	if (method === "TRACE") {
		init.method = "GET";
		const req = new Request(url, init);
		Object.defineProperty(req, "method", { get() {
			return "TRACE";
		} });
		return req;
	}
	if (!(method === "GET" || method === "HEAD")) if ("rawBody" in incoming && incoming.rawBody instanceof Buffer) init.body = new ReadableStream({ start(controller) {
		controller.enqueue(incoming.rawBody);
		controller.close();
	} });
	else if (incoming[wrapBodyStream]) {
		let reader;
		init.body = new ReadableStream({ async pull(controller) {
			try {
				reader ||= stream.Readable.toWeb(incoming).getReader();
				const { done, value } = await reader.read();
				if (done) controller.close();
				else controller.enqueue(value);
			} catch (error) {
				controller.error(error);
			}
		} });
	} else init.body = stream.Readable.toWeb(incoming);
	return new Request(url, init);
};
var getRequestCache = Symbol("getRequestCache");
var requestCache = Symbol("requestCache");
var incomingKey = Symbol("incomingKey");
var urlKey = Symbol("urlKey");
var headersKey = Symbol("headersKey");
var abortControllerKey = Symbol("abortControllerKey");
var requestPrototype = {
	get method() {
		return this[incomingKey].method || "GET";
	},
	get url() {
		return this[urlKey];
	},
	get headers() {
		return this[headersKey] ||= newHeadersFromIncoming(this[incomingKey]);
	},
	[Symbol("getAbortController")]() {
		this[getRequestCache]();
		return this[abortControllerKey];
	},
	[getRequestCache]() {
		this[abortControllerKey] ||= new AbortController();
		return this[requestCache] ||= newRequestFromIncoming(this.method, this[urlKey], this.headers, this[incomingKey], this[abortControllerKey]);
	}
};
[
	"body",
	"bodyUsed",
	"cache",
	"credentials",
	"destination",
	"integrity",
	"mode",
	"redirect",
	"referrer",
	"referrerPolicy",
	"signal",
	"keepalive"
].forEach((k) => {
	Object.defineProperty(requestPrototype, k, { get() {
		return this[getRequestCache]()[k];
	} });
});
[
	"arrayBuffer",
	"blob",
	"clone",
	"formData",
	"json",
	"text"
].forEach((k) => {
	Object.defineProperty(requestPrototype, k, { value: function() {
		return this[getRequestCache]()[k]();
	} });
});
Object.setPrototypeOf(requestPrototype, Request.prototype);
var newRequest = (incoming, defaultHostname) => {
	const req = Object.create(requestPrototype);
	req[incomingKey] = incoming;
	const incomingUrl = incoming.url || "";
	if (incomingUrl[0] !== "/" && (incomingUrl.startsWith("http://") || incomingUrl.startsWith("https://"))) {
		if (incoming instanceof http2.Http2ServerRequest) throw new RequestError("Absolute URL for :path is not allowed in HTTP/2");
		try {
			req[urlKey] = new URL(incomingUrl).href;
		} catch (e) {
			throw new RequestError("Invalid absolute URL", { cause: e });
		}
		return req;
	}
	const host = (incoming instanceof http2.Http2ServerRequest ? incoming.authority : incoming.headers.host) || defaultHostname;
	if (!host) throw new RequestError("Missing host header");
	let scheme;
	if (incoming instanceof http2.Http2ServerRequest) {
		scheme = incoming.scheme;
		if (!(scheme === "http" || scheme === "https")) throw new RequestError("Unsupported scheme");
	} else scheme = incoming.socket && incoming.socket.encrypted ? "https" : "http";
	const url = new URL(`${scheme}://${host}${incomingUrl}`);
	if (url.hostname.length !== host.length && url.hostname !== host.replace(/:\d+$/, "")) throw new RequestError("Invalid host header");
	req[urlKey] = url.href;
	return req;
};
var responseCache = Symbol("responseCache");
var getResponseCache = Symbol("getResponseCache");
var cacheKey = Symbol("cache");
var GlobalResponse = global.Response;
var Response2 = class _Response {
	#body;
	#init;
	[getResponseCache]() {
		delete this[cacheKey];
		return this[responseCache] ||= new GlobalResponse(this.#body, this.#init);
	}
	constructor(body, init) {
		let headers;
		this.#body = body;
		if (init instanceof _Response) {
			const cachedGlobalResponse = init[responseCache];
			if (cachedGlobalResponse) {
				this.#init = cachedGlobalResponse;
				this[getResponseCache]();
				return;
			} else {
				this.#init = init.#init;
				headers = new Headers(init.#init.headers);
			}
		} else this.#init = init;
		if (typeof body === "string" || typeof body?.getReader !== "undefined" || body instanceof Blob || body instanceof Uint8Array) {
			headers ||= init?.headers || { "content-type": "text/plain; charset=UTF-8" };
			this[cacheKey] = [
				init?.status || 200,
				body,
				headers
			];
		}
	}
	get headers() {
		const cache = this[cacheKey];
		if (cache) {
			if (!(cache[2] instanceof Headers)) cache[2] = new Headers(cache[2]);
			return cache[2];
		}
		return this[getResponseCache]().headers;
	}
	get status() {
		return this[cacheKey]?.[0] ?? this[getResponseCache]().status;
	}
	get ok() {
		const status = this.status;
		return status >= 200 && status < 300;
	}
};
[
	"body",
	"bodyUsed",
	"redirected",
	"statusText",
	"trailers",
	"type",
	"url"
].forEach((k) => {
	Object.defineProperty(Response2.prototype, k, { get() {
		return this[getResponseCache]()[k];
	} });
});
[
	"arrayBuffer",
	"blob",
	"clone",
	"formData",
	"json",
	"text"
].forEach((k) => {
	Object.defineProperty(Response2.prototype, k, { value: function() {
		return this[getResponseCache]()[k]();
	} });
});
Object.setPrototypeOf(Response2, GlobalResponse);
Object.setPrototypeOf(Response2.prototype, GlobalResponse.prototype);
async function readWithoutBlocking(readPromise) {
	return Promise.race([readPromise, Promise.resolve().then(() => Promise.resolve(void 0))]);
}
function writeFromReadableStreamDefaultReader(reader, writable, currentReadPromise) {
	const cancel = (error) => {
		reader.cancel(error).catch(() => {});
	};
	writable.on("close", cancel);
	writable.on("error", cancel);
	(currentReadPromise ?? reader.read()).then(flow, handleStreamError);
	return reader.closed.finally(() => {
		writable.off("close", cancel);
		writable.off("error", cancel);
	});
	function handleStreamError(error) {
		if (error) writable.destroy(error);
	}
	function onDrain() {
		reader.read().then(flow, handleStreamError);
	}
	function flow({ done, value }) {
		try {
			if (done) writable.end();
			else if (!writable.write(value)) writable.once("drain", onDrain);
			else return reader.read().then(flow, handleStreamError);
		} catch (e) {
			handleStreamError(e);
		}
	}
}
function writeFromReadableStream(stream$1, writable) {
	if (stream$1.locked) throw new TypeError("ReadableStream is locked.");
	else if (writable.destroyed) return;
	return writeFromReadableStreamDefaultReader(stream$1.getReader(), writable);
}
var buildOutgoingHttpHeaders = (headers) => {
	const res = {};
	if (!(headers instanceof Headers)) headers = new Headers(headers ?? void 0);
	const cookies = [];
	for (const [k, v] of headers) if (k === "set-cookie") cookies.push(v);
	else res[k] = v;
	if (cookies.length > 0) res["set-cookie"] = cookies;
	res["content-type"] ??= "text/plain; charset=UTF-8";
	return res;
};
var X_ALREADY_SENT = "x-hono-already-sent";
if (typeof global.crypto === "undefined") global.crypto = crypto$1.default;
var outgoingEnded = Symbol("outgoingEnded");
var handleRequestError = () => new Response(null, { status: 400 });
var handleFetchError = (e) => new Response(null, { status: e instanceof Error && (e.name === "TimeoutError" || e.constructor.name === "TimeoutError") ? 504 : 500 });
var handleResponseError = (e, outgoing) => {
	const err = e instanceof Error ? e : new Error("unknown error", { cause: e });
	if (err.code === "ERR_STREAM_PREMATURE_CLOSE") console.info("The user aborted a request.");
	else {
		console.error(e);
		if (!outgoing.headersSent) outgoing.writeHead(500, { "Content-Type": "text/plain" });
		outgoing.end(`Error: ${err.message}`);
		outgoing.destroy(err);
	}
};
var flushHeaders = (outgoing) => {
	if ("flushHeaders" in outgoing && outgoing.writable) outgoing.flushHeaders();
};
var responseViaCache = async (res, outgoing) => {
	let [status, body, header] = res[cacheKey];
	if (header instanceof Headers) header = buildOutgoingHttpHeaders(header);
	if (typeof body === "string") header["Content-Length"] = Buffer.byteLength(body);
	else if (body instanceof Uint8Array) header["Content-Length"] = body.byteLength;
	else if (body instanceof Blob) header["Content-Length"] = body.size;
	outgoing.writeHead(status, header);
	if (typeof body === "string" || body instanceof Uint8Array) outgoing.end(body);
	else if (body instanceof Blob) outgoing.end(new Uint8Array(await body.arrayBuffer()));
	else {
		flushHeaders(outgoing);
		await writeFromReadableStream(body, outgoing)?.catch((e) => handleResponseError(e, outgoing));
	}
	outgoing[outgoingEnded]?.();
};
var isPromise = (res) => typeof res.then === "function";
var responseViaResponseObject = async (res, outgoing, options = {}) => {
	if (isPromise(res)) if (options.errorHandler) try {
		res = await res;
	} catch (err) {
		const errRes = await options.errorHandler(err);
		if (!errRes) return;
		res = errRes;
	}
	else res = await res.catch(handleFetchError);
	if (cacheKey in res) return responseViaCache(res, outgoing);
	const resHeaderRecord = buildOutgoingHttpHeaders(res.headers);
	if (res.body) {
		const reader = res.body.getReader();
		const values = [];
		let done = false;
		let currentReadPromise = void 0;
		if (resHeaderRecord["transfer-encoding"] !== "chunked") {
			let maxReadCount = 2;
			for (let i = 0; i < maxReadCount; i++) {
				currentReadPromise ||= reader.read();
				const chunk = await readWithoutBlocking(currentReadPromise).catch((e) => {
					console.error(e);
					done = true;
				});
				if (!chunk) {
					if (i === 1) {
						await new Promise((resolve) => setTimeout(resolve));
						maxReadCount = 3;
						continue;
					}
					break;
				}
				currentReadPromise = void 0;
				if (chunk.value) values.push(chunk.value);
				if (chunk.done) {
					done = true;
					break;
				}
			}
			if (done && !("content-length" in resHeaderRecord)) resHeaderRecord["content-length"] = values.reduce((acc, value) => acc + value.length, 0);
		}
		outgoing.writeHead(res.status, resHeaderRecord);
		values.forEach((value) => {
			outgoing.write(value);
		});
		if (done) outgoing.end();
		else {
			if (values.length === 0) flushHeaders(outgoing);
			await writeFromReadableStreamDefaultReader(reader, outgoing, currentReadPromise);
		}
	} else if (resHeaderRecord[X_ALREADY_SENT]) {} else {
		outgoing.writeHead(res.status, resHeaderRecord);
		outgoing.end();
	}
	outgoing[outgoingEnded]?.();
};
var getRequestListener = (fetchCallback, options = {}) => {
	const autoCleanupIncoming = options.autoCleanupIncoming ?? true;
	if (options.overrideGlobalObjects !== false && global.Request !== Request) {
		Object.defineProperty(global, "Request", { value: Request });
		Object.defineProperty(global, "Response", { value: Response2 });
	}
	return async (incoming, outgoing) => {
		let res, req;
		try {
			req = newRequest(incoming, options.hostname);
			let incomingEnded = !autoCleanupIncoming || incoming.method === "GET" || incoming.method === "HEAD";
			if (!incomingEnded) {
				incoming[wrapBodyStream] = true;
				incoming.on("end", () => {
					incomingEnded = true;
				});
				if (incoming instanceof http2.Http2ServerRequest) outgoing[outgoingEnded] = () => {
					if (!incomingEnded) setTimeout(() => {
						if (!incomingEnded) setTimeout(() => {
							incoming.destroy();
							outgoing.destroy();
						});
					});
				};
			}
			outgoing.on("close", () => {
				if (req[abortControllerKey]) {
					if (incoming.errored) req[abortControllerKey].abort(incoming.errored.toString());
					else if (!outgoing.writableFinished) req[abortControllerKey].abort("Client connection prematurely closed.");
				}
				if (!incomingEnded) setTimeout(() => {
					if (!incomingEnded) setTimeout(() => {
						incoming.destroy();
					});
				});
			});
			res = fetchCallback(req, {
				incoming,
				outgoing
			});
			if (cacheKey in res) return responseViaCache(res, outgoing);
		} catch (e) {
			if (!res) if (options.errorHandler) {
				res = await options.errorHandler(req ? e : toRequestError(e));
				if (!res) return;
			} else if (!req) res = handleRequestError();
			else res = handleFetchError(e);
			else return handleResponseError(e, outgoing);
		}
		try {
			return await responseViaResponseObject(res, outgoing, options);
		} catch (e) {
			return handleResponseError(e, outgoing);
		}
	};
};
//#endregion
//#region ../../node_modules/@modelcontextprotocol/sdk/dist/esm/server/webStandardStreamableHttp.js
/**
* Web Standards Streamable HTTP Server Transport
*
* This is the core transport implementation using Web Standard APIs (Request, Response, ReadableStream).
* It can run on any runtime that supports Web Standards: Node.js 18+, Cloudflare Workers, Deno, Bun, etc.
*
* For Node.js Express/HTTP compatibility, use `StreamableHTTPServerTransport` which wraps this transport.
*/
/**
* Server transport for Web Standards Streamable HTTP: this implements the MCP Streamable HTTP transport specification
* using Web Standard APIs (Request, Response, ReadableStream).
*
* This transport works on any runtime that supports Web Standards: Node.js 18+, Cloudflare Workers, Deno, Bun, etc.
*
* Usage example:
*
* ```typescript
* // Stateful mode - server sets the session ID
* const statefulTransport = new WebStandardStreamableHTTPServerTransport({
*   sessionIdGenerator: () => crypto.randomUUID(),
* });
*
* // Stateless mode - explicitly set session ID to undefined
* const statelessTransport = new WebStandardStreamableHTTPServerTransport({
*   sessionIdGenerator: undefined,
* });
*
* // Hono.js usage
* app.all('/mcp', async (c) => {
*   return transport.handleRequest(c.req.raw);
* });
*
* // Cloudflare Workers usage
* export default {
*   async fetch(request: Request): Promise<Response> {
*     return transport.handleRequest(request);
*   }
* };
* ```
*
* In stateful mode:
* - Session ID is generated and included in response headers
* - Session ID is always included in initialization responses
* - Requests with invalid session IDs are rejected with 404 Not Found
* - Non-initialization requests without a session ID are rejected with 400 Bad Request
* - State is maintained in-memory (connections, message history)
*
* In stateless mode:
* - No Session ID is included in any responses
* - No session validation is performed
*/
var WebStandardStreamableHTTPServerTransport = class {
	constructor(options = {}) {
		this._started = false;
		this._hasHandledRequest = false;
		this._streamMapping = /* @__PURE__ */ new Map();
		this._requestToStreamMapping = /* @__PURE__ */ new Map();
		this._requestResponseMap = /* @__PURE__ */ new Map();
		this._initialized = false;
		this._enableJsonResponse = false;
		this._standaloneSseStreamId = "_GET_stream";
		this.sessionIdGenerator = options.sessionIdGenerator;
		this._enableJsonResponse = options.enableJsonResponse ?? false;
		this._eventStore = options.eventStore;
		this._onsessioninitialized = options.onsessioninitialized;
		this._onsessionclosed = options.onsessionclosed;
		this._allowedHosts = options.allowedHosts;
		this._allowedOrigins = options.allowedOrigins;
		this._enableDnsRebindingProtection = options.enableDnsRebindingProtection ?? false;
		this._retryInterval = options.retryInterval;
	}
	/**
	* Starts the transport. This is required by the Transport interface but is a no-op
	* for the Streamable HTTP transport as connections are managed per-request.
	*/
	async start() {
		if (this._started) throw new Error("Transport already started");
		this._started = true;
	}
	/**
	* Helper to create a JSON error response
	*/
	createJsonErrorResponse(status, code, message, options) {
		const error = {
			code,
			message
		};
		if (options?.data !== void 0) error.data = options.data;
		return new Response(JSON.stringify({
			jsonrpc: "2.0",
			error,
			id: null
		}), {
			status,
			headers: {
				"Content-Type": "application/json",
				...options?.headers
			}
		});
	}
	/**
	* Validates request headers for DNS rebinding protection.
	* @returns Error response if validation fails, undefined if validation passes.
	*/
	validateRequestHeaders(req) {
		if (!this._enableDnsRebindingProtection) return;
		if (this._allowedHosts && this._allowedHosts.length > 0) {
			const hostHeader = req.headers.get("host");
			if (!hostHeader || !this._allowedHosts.includes(hostHeader)) {
				const error = `Invalid Host header: ${hostHeader}`;
				this.onerror?.(new Error(error));
				return this.createJsonErrorResponse(403, -32e3, error);
			}
		}
		if (this._allowedOrigins && this._allowedOrigins.length > 0) {
			const originHeader = req.headers.get("origin");
			if (originHeader && !this._allowedOrigins.includes(originHeader)) {
				const error = `Invalid Origin header: ${originHeader}`;
				this.onerror?.(new Error(error));
				return this.createJsonErrorResponse(403, -32e3, error);
			}
		}
	}
	/**
	* Handles an incoming HTTP request, whether GET, POST, or DELETE
	* Returns a Response object (Web Standard)
	*/
	async handleRequest(req, options) {
		if (!this.sessionIdGenerator && this._hasHandledRequest) throw new Error("Stateless transport cannot be reused across requests. Create a new transport per request.");
		this._hasHandledRequest = true;
		const validationError = this.validateRequestHeaders(req);
		if (validationError) return validationError;
		switch (req.method) {
			case "POST": return this.handlePostRequest(req, options);
			case "GET": return this.handleGetRequest(req);
			case "DELETE": return this.handleDeleteRequest(req);
			default: return this.handleUnsupportedRequest();
		}
	}
	/**
	* Writes a priming event to establish resumption capability.
	* Only sends if eventStore is configured (opt-in for resumability) and
	* the client's protocol version supports empty SSE data (>= 2025-11-25).
	*/
	async writePrimingEvent(controller, encoder, streamId, protocolVersion) {
		if (!this._eventStore) return;
		if (protocolVersion < "2025-11-25") return;
		const primingEventId = await this._eventStore.storeEvent(streamId, {});
		let primingEvent = `id: ${primingEventId}\ndata: \n\n`;
		if (this._retryInterval !== void 0) primingEvent = `id: ${primingEventId}\nretry: ${this._retryInterval}\ndata: \n\n`;
		controller.enqueue(encoder.encode(primingEvent));
	}
	/**
	* Handles GET requests for SSE stream
	*/
	async handleGetRequest(req) {
		if (!req.headers.get("accept")?.includes("text/event-stream")) {
			this.onerror?.(/* @__PURE__ */ new Error("Not Acceptable: Client must accept text/event-stream"));
			return this.createJsonErrorResponse(406, -32e3, "Not Acceptable: Client must accept text/event-stream");
		}
		const sessionError = this.validateSession(req);
		if (sessionError) return sessionError;
		const protocolError = this.validateProtocolVersion(req);
		if (protocolError) return protocolError;
		if (this._eventStore) {
			const lastEventId = req.headers.get("last-event-id");
			if (lastEventId) return this.replayEvents(lastEventId);
		}
		if (this._streamMapping.get(this._standaloneSseStreamId) !== void 0) {
			this.onerror?.(/* @__PURE__ */ new Error("Conflict: Only one SSE stream is allowed per session"));
			return this.createJsonErrorResponse(409, -32e3, "Conflict: Only one SSE stream is allowed per session");
		}
		const encoder = new TextEncoder();
		let streamController;
		const readable = new ReadableStream({
			start: (controller) => {
				streamController = controller;
			},
			cancel: () => {
				this._streamMapping.delete(this._standaloneSseStreamId);
			}
		});
		const headers = {
			"Content-Type": "text/event-stream",
			"Cache-Control": "no-cache, no-transform",
			Connection: "keep-alive"
		};
		if (this.sessionId !== void 0) headers["mcp-session-id"] = this.sessionId;
		this._streamMapping.set(this._standaloneSseStreamId, {
			controller: streamController,
			encoder,
			cleanup: () => {
				this._streamMapping.delete(this._standaloneSseStreamId);
				try {
					streamController.close();
				} catch {}
			}
		});
		return new Response(readable, { headers });
	}
	/**
	* Replays events that would have been sent after the specified event ID
	* Only used when resumability is enabled
	*/
	async replayEvents(lastEventId) {
		if (!this._eventStore) {
			this.onerror?.(/* @__PURE__ */ new Error("Event store not configured"));
			return this.createJsonErrorResponse(400, -32e3, "Event store not configured");
		}
		try {
			let streamId;
			if (this._eventStore.getStreamIdForEventId) {
				streamId = await this._eventStore.getStreamIdForEventId(lastEventId);
				if (!streamId) {
					this.onerror?.(/* @__PURE__ */ new Error("Invalid event ID format"));
					return this.createJsonErrorResponse(400, -32e3, "Invalid event ID format");
				}
				if (this._streamMapping.get(streamId) !== void 0) {
					this.onerror?.(/* @__PURE__ */ new Error("Conflict: Stream already has an active connection"));
					return this.createJsonErrorResponse(409, -32e3, "Conflict: Stream already has an active connection");
				}
			}
			const headers = {
				"Content-Type": "text/event-stream",
				"Cache-Control": "no-cache, no-transform",
				Connection: "keep-alive"
			};
			if (this.sessionId !== void 0) headers["mcp-session-id"] = this.sessionId;
			const encoder = new TextEncoder();
			let streamController;
			const readable = new ReadableStream({
				start: (controller) => {
					streamController = controller;
				},
				cancel: () => {}
			});
			const replayedStreamId = await this._eventStore.replayEventsAfter(lastEventId, { send: async (eventId, message) => {
				if (!this.writeSSEEvent(streamController, encoder, message, eventId)) {
					this.onerror?.(/* @__PURE__ */ new Error("Failed replay events"));
					try {
						streamController.close();
					} catch {}
				}
			} });
			this._streamMapping.set(replayedStreamId, {
				controller: streamController,
				encoder,
				cleanup: () => {
					this._streamMapping.delete(replayedStreamId);
					try {
						streamController.close();
					} catch {}
				}
			});
			return new Response(readable, { headers });
		} catch (error) {
			this.onerror?.(error);
			return this.createJsonErrorResponse(500, -32e3, "Error replaying events");
		}
	}
	/**
	* Writes an event to an SSE stream via controller with proper formatting
	*/
	writeSSEEvent(controller, encoder, message, eventId) {
		try {
			let eventData = `event: message\n`;
			if (eventId) eventData += `id: ${eventId}\n`;
			eventData += `data: ${JSON.stringify(message)}\n\n`;
			controller.enqueue(encoder.encode(eventData));
			return true;
		} catch (error) {
			this.onerror?.(error);
			return false;
		}
	}
	/**
	* Handles unsupported requests (PUT, PATCH, etc.)
	*/
	handleUnsupportedRequest() {
		this.onerror?.(/* @__PURE__ */ new Error("Method not allowed."));
		return new Response(JSON.stringify({
			jsonrpc: "2.0",
			error: {
				code: -32e3,
				message: "Method not allowed."
			},
			id: null
		}), {
			status: 405,
			headers: {
				Allow: "GET, POST, DELETE",
				"Content-Type": "application/json"
			}
		});
	}
	/**
	* Handles POST requests containing JSON-RPC messages
	*/
	async handlePostRequest(req, options) {
		try {
			const acceptHeader = req.headers.get("accept");
			if (!acceptHeader?.includes("application/json") || !acceptHeader.includes("text/event-stream")) {
				this.onerror?.(/* @__PURE__ */ new Error("Not Acceptable: Client must accept both application/json and text/event-stream"));
				return this.createJsonErrorResponse(406, -32e3, "Not Acceptable: Client must accept both application/json and text/event-stream");
			}
			const ct = req.headers.get("content-type");
			if (!ct || !ct.includes("application/json")) {
				this.onerror?.(/* @__PURE__ */ new Error("Unsupported Media Type: Content-Type must be application/json"));
				return this.createJsonErrorResponse(415, -32e3, "Unsupported Media Type: Content-Type must be application/json");
			}
			const requestInfo = {
				headers: Object.fromEntries(req.headers.entries()),
				url: new URL(req.url)
			};
			let rawMessage;
			if (options?.parsedBody !== void 0) rawMessage = options.parsedBody;
			else try {
				rawMessage = await req.json();
			} catch {
				this.onerror?.(/* @__PURE__ */ new Error("Parse error: Invalid JSON"));
				return this.createJsonErrorResponse(400, -32700, "Parse error: Invalid JSON");
			}
			let messages;
			try {
				if (Array.isArray(rawMessage)) messages = rawMessage.map((msg) => require_types.JSONRPCMessageSchema.parse(msg));
				else messages = [require_types.JSONRPCMessageSchema.parse(rawMessage)];
			} catch {
				this.onerror?.(/* @__PURE__ */ new Error("Parse error: Invalid JSON-RPC message"));
				return this.createJsonErrorResponse(400, -32700, "Parse error: Invalid JSON-RPC message");
			}
			const isInitializationRequest = messages.some(require_types.isInitializeRequest);
			if (isInitializationRequest) {
				if (this._initialized && this.sessionId !== void 0) {
					this.onerror?.(/* @__PURE__ */ new Error("Invalid Request: Server already initialized"));
					return this.createJsonErrorResponse(400, -32600, "Invalid Request: Server already initialized");
				}
				if (messages.length > 1) {
					this.onerror?.(/* @__PURE__ */ new Error("Invalid Request: Only one initialization request is allowed"));
					return this.createJsonErrorResponse(400, -32600, "Invalid Request: Only one initialization request is allowed");
				}
				this.sessionId = this.sessionIdGenerator?.();
				this._initialized = true;
				if (this.sessionId && this._onsessioninitialized) await Promise.resolve(this._onsessioninitialized(this.sessionId));
			}
			if (!isInitializationRequest) {
				const sessionError = this.validateSession(req);
				if (sessionError) return sessionError;
				const protocolError = this.validateProtocolVersion(req);
				if (protocolError) return protocolError;
			}
			if (!messages.some(require_types.isJSONRPCRequest)) {
				for (const message of messages) this.onmessage?.(message, {
					authInfo: options?.authInfo,
					requestInfo
				});
				return new Response(null, { status: 202 });
			}
			const streamId = crypto.randomUUID();
			const initRequest = messages.find((m) => require_types.isInitializeRequest(m));
			const clientProtocolVersion = initRequest ? initRequest.params.protocolVersion : req.headers.get("mcp-protocol-version") ?? "2025-03-26";
			if (this._enableJsonResponse) return new Promise((resolve) => {
				this._streamMapping.set(streamId, {
					resolveJson: resolve,
					cleanup: () => {
						this._streamMapping.delete(streamId);
					}
				});
				for (const message of messages) if (require_types.isJSONRPCRequest(message)) this._requestToStreamMapping.set(message.id, streamId);
				for (const message of messages) this.onmessage?.(message, {
					authInfo: options?.authInfo,
					requestInfo
				});
			});
			const encoder = new TextEncoder();
			let streamController;
			const readable = new ReadableStream({
				start: (controller) => {
					streamController = controller;
				},
				cancel: () => {
					this._streamMapping.delete(streamId);
				}
			});
			const headers = {
				"Content-Type": "text/event-stream",
				"Cache-Control": "no-cache",
				Connection: "keep-alive"
			};
			if (this.sessionId !== void 0) headers["mcp-session-id"] = this.sessionId;
			for (const message of messages) if (require_types.isJSONRPCRequest(message)) {
				this._streamMapping.set(streamId, {
					controller: streamController,
					encoder,
					cleanup: () => {
						this._streamMapping.delete(streamId);
						try {
							streamController.close();
						} catch {}
					}
				});
				this._requestToStreamMapping.set(message.id, streamId);
			}
			await this.writePrimingEvent(streamController, encoder, streamId, clientProtocolVersion);
			for (const message of messages) {
				let closeSSEStream;
				let closeStandaloneSSEStream;
				if (require_types.isJSONRPCRequest(message) && this._eventStore && clientProtocolVersion >= "2025-11-25") {
					closeSSEStream = () => {
						this.closeSSEStream(message.id);
					};
					closeStandaloneSSEStream = () => {
						this.closeStandaloneSSEStream();
					};
				}
				this.onmessage?.(message, {
					authInfo: options?.authInfo,
					requestInfo,
					closeSSEStream,
					closeStandaloneSSEStream
				});
			}
			return new Response(readable, {
				status: 200,
				headers
			});
		} catch (error) {
			this.onerror?.(error);
			return this.createJsonErrorResponse(400, -32700, "Parse error", { data: String(error) });
		}
	}
	/**
	* Handles DELETE requests to terminate sessions
	*/
	async handleDeleteRequest(req) {
		const sessionError = this.validateSession(req);
		if (sessionError) return sessionError;
		const protocolError = this.validateProtocolVersion(req);
		if (protocolError) return protocolError;
		await Promise.resolve(this._onsessionclosed?.(this.sessionId));
		await this.close();
		return new Response(null, { status: 200 });
	}
	/**
	* Validates session ID for non-initialization requests.
	* Returns Response error if invalid, undefined otherwise
	*/
	validateSession(req) {
		if (this.sessionIdGenerator === void 0) return;
		if (!this._initialized) {
			this.onerror?.(/* @__PURE__ */ new Error("Bad Request: Server not initialized"));
			return this.createJsonErrorResponse(400, -32e3, "Bad Request: Server not initialized");
		}
		const sessionId = req.headers.get("mcp-session-id");
		if (!sessionId) {
			this.onerror?.(/* @__PURE__ */ new Error("Bad Request: Mcp-Session-Id header is required"));
			return this.createJsonErrorResponse(400, -32e3, "Bad Request: Mcp-Session-Id header is required");
		}
		if (sessionId !== this.sessionId) {
			this.onerror?.(/* @__PURE__ */ new Error("Session not found"));
			return this.createJsonErrorResponse(404, -32001, "Session not found");
		}
	}
	/**
	* Validates the MCP-Protocol-Version header on incoming requests.
	*
	* For initialization: Version negotiation handles unknown versions gracefully
	* (server responds with its supported version).
	*
	* For subsequent requests with MCP-Protocol-Version header:
	* - Accept if in supported list
	* - 400 if unsupported
	*
	* For HTTP requests without the MCP-Protocol-Version header:
	* - Accept and default to the version negotiated at initialization
	*/
	validateProtocolVersion(req) {
		const protocolVersion = req.headers.get("mcp-protocol-version");
		if (protocolVersion !== null && !require_types.SUPPORTED_PROTOCOL_VERSIONS.includes(protocolVersion)) {
			this.onerror?.(/* @__PURE__ */ new Error(`Bad Request: Unsupported protocol version: ${protocolVersion} (supported versions: ${require_types.SUPPORTED_PROTOCOL_VERSIONS.join(", ")})`));
			return this.createJsonErrorResponse(400, -32e3, `Bad Request: Unsupported protocol version: ${protocolVersion} (supported versions: ${require_types.SUPPORTED_PROTOCOL_VERSIONS.join(", ")})`);
		}
	}
	async close() {
		this._streamMapping.forEach(({ cleanup }) => {
			cleanup();
		});
		this._streamMapping.clear();
		this._requestResponseMap.clear();
		this.onclose?.();
	}
	/**
	* Close an SSE stream for a specific request, triggering client reconnection.
	* Use this to implement polling behavior during long-running operations -
	* client will reconnect after the retry interval specified in the priming event.
	*/
	closeSSEStream(requestId) {
		const streamId = this._requestToStreamMapping.get(requestId);
		if (!streamId) return;
		const stream = this._streamMapping.get(streamId);
		if (stream) stream.cleanup();
	}
	/**
	* Close the standalone GET SSE stream, triggering client reconnection.
	* Use this to implement polling behavior for server-initiated notifications.
	*/
	closeStandaloneSSEStream() {
		const stream = this._streamMapping.get(this._standaloneSseStreamId);
		if (stream) stream.cleanup();
	}
	async send(message, options) {
		let requestId = options?.relatedRequestId;
		if (require_types.isJSONRPCResultResponse(message) || require_types.isJSONRPCErrorResponse(message)) requestId = message.id;
		if (requestId === void 0) {
			if (require_types.isJSONRPCResultResponse(message) || require_types.isJSONRPCErrorResponse(message)) throw new Error("Cannot send a response on a standalone SSE stream unless resuming a previous client request");
			let eventId;
			if (this._eventStore) eventId = await this._eventStore.storeEvent(this._standaloneSseStreamId, message);
			const standaloneSse = this._streamMapping.get(this._standaloneSseStreamId);
			if (standaloneSse === void 0) return;
			if (standaloneSse.controller && standaloneSse.encoder) this.writeSSEEvent(standaloneSse.controller, standaloneSse.encoder, message, eventId);
			return;
		}
		const streamId = this._requestToStreamMapping.get(requestId);
		if (!streamId) throw new Error(`No connection established for request ID: ${String(requestId)}`);
		const stream = this._streamMapping.get(streamId);
		if (!this._enableJsonResponse && stream?.controller && stream?.encoder) {
			let eventId;
			if (this._eventStore) eventId = await this._eventStore.storeEvent(streamId, message);
			this.writeSSEEvent(stream.controller, stream.encoder, message, eventId);
		}
		if (require_types.isJSONRPCResultResponse(message) || require_types.isJSONRPCErrorResponse(message)) {
			this._requestResponseMap.set(requestId, message);
			const relatedIds = Array.from(this._requestToStreamMapping.entries()).filter(([_, sid]) => sid === streamId).map(([id]) => id);
			if (relatedIds.every((id) => this._requestResponseMap.has(id))) {
				if (!stream) throw new Error(`No connection established for request ID: ${String(requestId)}`);
				if (this._enableJsonResponse && stream.resolveJson) {
					const headers = { "Content-Type": "application/json" };
					if (this.sessionId !== void 0) headers["mcp-session-id"] = this.sessionId;
					const responses = relatedIds.map((id) => this._requestResponseMap.get(id));
					if (responses.length === 1) stream.resolveJson(new Response(JSON.stringify(responses[0]), {
						status: 200,
						headers
					}));
					else stream.resolveJson(new Response(JSON.stringify(responses), {
						status: 200,
						headers
					}));
				} else stream.cleanup();
				for (const id of relatedIds) {
					this._requestResponseMap.delete(id);
					this._requestToStreamMapping.delete(id);
				}
			}
		}
	}
};
//#endregion
//#region ../../node_modules/@modelcontextprotocol/sdk/dist/esm/server/streamableHttp.js
/**
* Node.js HTTP Streamable HTTP Server Transport
*
* This is a thin wrapper around `WebStandardStreamableHTTPServerTransport` that provides
* compatibility with Node.js HTTP server (IncomingMessage/ServerResponse).
*
* For web-standard environments (Cloudflare Workers, Deno, Bun), use `WebStandardStreamableHTTPServerTransport` directly.
*/
/**
* Server transport for Streamable HTTP: this implements the MCP Streamable HTTP transport specification.
* It supports both SSE streaming and direct HTTP responses.
*
* This is a wrapper around `WebStandardStreamableHTTPServerTransport` that provides Node.js HTTP compatibility.
* It uses the `@hono/node-server` library to convert between Node.js HTTP and Web Standard APIs.
*
* Usage example:
*
* ```typescript
* // Stateful mode - server sets the session ID
* const statefulTransport = new StreamableHTTPServerTransport({
*   sessionIdGenerator: () => randomUUID(),
* });
*
* // Stateless mode - explicitly set session ID to undefined
* const statelessTransport = new StreamableHTTPServerTransport({
*   sessionIdGenerator: undefined,
* });
*
* // Using with pre-parsed request body
* app.post('/mcp', (req, res) => {
*   transport.handleRequest(req, res, req.body);
* });
* ```
*
* In stateful mode:
* - Session ID is generated and included in response headers
* - Session ID is always included in initialization responses
* - Requests with invalid session IDs are rejected with 404 Not Found
* - Non-initialization requests without a session ID are rejected with 400 Bad Request
* - State is maintained in-memory (connections, message history)
*
* In stateless mode:
* - No Session ID is included in any responses
* - No session validation is performed
*/
var StreamableHTTPServerTransport = class {
	constructor(options = {}) {
		this._requestContext = /* @__PURE__ */ new WeakMap();
		this._webStandardTransport = new WebStandardStreamableHTTPServerTransport(options);
		this._requestListener = getRequestListener(async (webRequest) => {
			const context = this._requestContext.get(webRequest);
			return this._webStandardTransport.handleRequest(webRequest, {
				authInfo: context?.authInfo,
				parsedBody: context?.parsedBody
			});
		}, { overrideGlobalObjects: false });
	}
	/**
	* Gets the session ID for this transport instance.
	*/
	get sessionId() {
		return this._webStandardTransport.sessionId;
	}
	/**
	* Sets callback for when the transport is closed.
	*/
	set onclose(handler) {
		this._webStandardTransport.onclose = handler;
	}
	get onclose() {
		return this._webStandardTransport.onclose;
	}
	/**
	* Sets callback for transport errors.
	*/
	set onerror(handler) {
		this._webStandardTransport.onerror = handler;
	}
	get onerror() {
		return this._webStandardTransport.onerror;
	}
	/**
	* Sets callback for incoming messages.
	*/
	set onmessage(handler) {
		this._webStandardTransport.onmessage = handler;
	}
	get onmessage() {
		return this._webStandardTransport.onmessage;
	}
	/**
	* Starts the transport. This is required by the Transport interface but is a no-op
	* for the Streamable HTTP transport as connections are managed per-request.
	*/
	async start() {
		return this._webStandardTransport.start();
	}
	/**
	* Closes the transport and all active connections.
	*/
	async close() {
		return this._webStandardTransport.close();
	}
	/**
	* Sends a JSON-RPC message through the transport.
	*/
	async send(message, options) {
		return this._webStandardTransport.send(message, options);
	}
	/**
	* Handles an incoming HTTP request, whether GET or POST.
	*
	* This method converts Node.js HTTP objects to Web Standard Request/Response
	* and delegates to the underlying WebStandardStreamableHTTPServerTransport.
	*
	* @param req - Node.js IncomingMessage, optionally with auth property from middleware
	* @param res - Node.js ServerResponse
	* @param parsedBody - Optional pre-parsed body from body-parser middleware
	*/
	async handleRequest(req, res, parsedBody) {
		const authInfo = req.auth;
		await getRequestListener(async (webRequest) => {
			return this._webStandardTransport.handleRequest(webRequest, {
				authInfo,
				parsedBody
			});
		}, { overrideGlobalObjects: false })(req, res);
	}
	/**
	* Close an SSE stream for a specific request, triggering client reconnection.
	* Use this to implement polling behavior during long-running operations -
	* client will reconnect after the retry interval specified in the priming event.
	*/
	closeSSEStream(requestId) {
		this._webStandardTransport.closeSSEStream(requestId);
	}
	/**
	* Close the standalone GET SSE stream, triggering client reconnection.
	* Use this to implement polling behavior for server-initiated notifications.
	*/
	closeStandaloneSSEStream() {
		this._webStandardTransport.closeStandaloneSSEStream();
	}
};
//#endregion
exports.StreamableHTTPServerTransport = StreamableHTTPServerTransport;
