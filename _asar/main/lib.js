require("./chunk.js");
const require_build = require("./build.js");
//#region ../../packages/channel-sdk/lib/index.js
var CH_SDK_4001 = "CH_SDK_4001";
var CH_SDK_4031 = "CH_SDK_4031";
var CH_SDK_4131 = "CH_SDK_4131";
var CH_SDK_4221 = "CH_SDK_4221";
var CH_SDK_4292 = "CH_SDK_4292";
var CH_SDK_5001 = "CH_SDK_5001";
var CH_SDK_5041 = "CH_SDK_5041";
var CH_SDK_5042 = "CH_SDK_5042";
var CH_SDK_5050 = "CH_SDK_5050";
var ChSdkError = class extends Error {
	constructor(code, message) {
		super(message);
		this.code = code;
		Object.setPrototypeOf(this, new.target.prototype);
		this.name = new.target.name;
	}
};
var ChSdkParamError = class extends ChSdkError {
	constructor(message) {
		super(CH_SDK_4001, message);
	}
};
var ChSdkAuthError = class extends ChSdkError {
	constructor(message) {
		super(CH_SDK_4031, message);
	}
};
var ChSdkPayloadTooLargeError = class extends ChSdkError {
	constructor(message) {
		super(CH_SDK_4131, message);
	}
};
var ChSdkSignatureError = class extends ChSdkError {
	constructor(message) {
		super(CH_SDK_4221, message);
	}
};
var ChSdkRateLimitedError = class extends ChSdkError {
	constructor(message) {
		super(CH_SDK_4292, message);
	}
};
var ChSdkSplitTimeoutError = class extends ChSdkError {
	constructor(message) {
		super(CH_SDK_5001, message);
	}
};
var ChSdkRequestTimeoutError = class extends ChSdkError {
	constructor(message, params) {
		super(CH_SDK_5041, message);
		this.requestId = params.requestId;
		this.phase = params.phase;
		this.publishedAt = params.publishedAt;
		this.elapsedMs = params.elapsedMs;
	}
};
var ChSdkAcpUnavailableError = class extends ChSdkError {
	constructor(message) {
		super(CH_SDK_5042, message);
	}
};
var ChSdkReconnectExhaustedError = class extends ChSdkError {
	constructor(message) {
		super(CH_SDK_5050, message);
	}
};
function describeError(err) {
	if (err instanceof Error) {
		const code = err.code;
		return code === void 0 || code === null ? `${err.name}: ${err.message}` : `${err.name}: ${err.message} (code=${String(code)})`;
	}
	if (err && typeof err === "object") {
		const o = err;
		if (o.code !== void 0 || o.message !== void 0) return `code=${o.code ?? "unknown"} message=${o.message ?? "unknown"}`;
		try {
			return JSON.stringify(err);
		} catch {
			return Object.prototype.toString.call(err);
		}
	}
	return String(err);
}
var LEVEL_NUMBER = {
	off: 0,
	error: 200,
	info: 400,
	debug: 500
};
var DEFAULT_LEVEL = "info";
var ROOT_PREFIX = "[channel-sdk]";
var noop = () => void 0;
var noopLogger = {
	error: noop,
	info: noop,
	debug: noop
};
function createLogger(opts) {
	const base = opts.logger;
	if (!base) return noopLogger;
	const threshold = LEVEL_NUMBER[opts.logLevel ?? DEFAULT_LEVEL];
	const make = (level) => {
		if (LEVEL_NUMBER[level] > threshold) return noop;
		return (msg, meta) => {
			base[level](`${ROOT_PREFIX} ${msg}`, meta);
		};
	};
	return {
		error: make("error"),
		info: make("info"),
		debug: make("debug")
	};
}
var METRIC = {
	sendLatencyMs: "ch_sdk_send_latency_ms",
	recvLagMs: "ch_sdk_recv_lag_ms",
	envelopeSizeBytes: "ch_sdk_envelope_size_bytes",
	splitTotal: "ch_sdk_split_total",
	securityAlertTotal: "ch_sdk_security_alert_total",
	publishRateLimitedTotal: "ch_sdk_publish_rate_limited_total",
	publishFailureTotal: "ch_sdk_publish_failure_total",
	credentialsLatencyMs: "ch_credentials_latency_ms",
	acpConnectLatencyMs: "ch_sdk_acp_connect_latency_ms",
	acpRequestLatencyMs: "ch_sdk_acp_request_latency_ms",
	acpFailureTotal: "ch_sdk_acp_failure_total",
	reconnectTotal: "ch_sdk_reconnect_total",
	offlineDurationMs: "ch_sdk_offline_duration_ms",
	outboxDroppedTotal: "ch_sdk_outbox_dropped_total",
	outboxFlushFailedTotal: "ch_sdk_outbox_flush_failed_total",
	recoveryGapTotal: "ch_sdk_recovery_gap_total",
	convmsgBatchFlushTotal: "ch_sdk_convmsg_batch_flush_total",
	convmsgBatchItemsPerFlush: "ch_sdk_convmsg_batch_items_per_flush",
	convmsgBatchBytesPerFlush: "ch_sdk_convmsg_batch_bytes_per_flush",
	convmsgBatchAddedLatencyMaxMs: "ch_sdk_convmsg_batch_added_latency_max_ms",
	convmsgBatchAddedLatencyAvgMs: "ch_sdk_convmsg_batch_added_latency_avg_ms",
	convmsgBatchPublishSavedTotal: "ch_sdk_convmsg_batch_publish_saved_total",
	recvBatchItemsTotal: "ch_sdk_recv_batch_items_total",
	recvBatchDedupDroppedTotal: "ch_sdk_recv_batch_dedup_dropped_total",
	recvBatchLagMaxMs: "ch_sdk_recv_batch_lag_max_ms",
	recvBatchLagAvgMs: "ch_sdk_recv_batch_lag_avg_ms"
};
var Metrics = class {
	constructor(onMetric) {
		this.onMetric = onMetric;
	}
	/** Histogram 观测：上报一个观测值。 */
	observe(name, value, labels) {
		this.emit(name, value, labels);
	}
	/** Counter 累加：默认 +1。 */
	inc(name, labels, by = 1) {
		this.emit(name, by, labels);
	}
	emit(name, value, labels) {
		if (!this.onMetric) return;
		try {
			this.onMetric({
				name,
				value,
				labels
			});
		} catch {}
	}
};
function channelScopeOf(channel) {
	const idx = channel.indexOf(":");
	return idx > 0 ? channel.slice(0, idx) : channel;
}
var TRACE_ID_HEX_LENGTH = 32;
var SPAN_ID_HEX_LENGTH = 16;
var DEFAULT_TRACE_SAMPLE_RATIO = 1;
function generateTraceId() {
	return generateHexId(TRACE_ID_HEX_LENGTH);
}
function generateSpanId() {
	return generateHexId(SPAN_ID_HEX_LENGTH);
}
function normalizeTraceId(traceId) {
	const value = canonicalizeTraceInput(traceId);
	if (/^[0-9a-f]{32}$/i.test(value) && !/^0{32}$/i.test(value)) return value.toLowerCase();
	if (!value) return generateTraceId();
	const normalized = [
		2166136261,
		2654435769,
		2246822507,
		3266489909
	].map((seed) => fnv1a32(value, seed).toString(16).padStart(8, "0")).join("");
	return /^0{32}$/.test(normalized) ? `${"0".repeat(31)}1` : normalized;
}
function normalizeSpanId(spanId) {
	const value = canonicalizeTraceInput(spanId);
	if (/^[0-9a-f]{16}$/i.test(value) && !/^0{16}$/i.test(value)) return value.toLowerCase();
}
function canonicalizeTraceInput(value) {
	return (value ?? "").replace(/^[\t\n\v\f\r ]+|[\t\n\v\f\r ]+$/g, "");
}
function resolveTraceSampled(traceId, sampled) {
	if (sampled !== void 0) return sampled;
	const normalized = normalizeTraceId(traceId);
	return Number.parseInt(normalized.slice(0, 8), 16) / 4294967296 < DEFAULT_TRACE_SAMPLE_RATIO;
}
function traceFlags(sampled) {
	return sampled ? "01" : "00";
}
function sampledFromTraceFlags(flags, traceId) {
	if (flags === "01") return true;
	if (flags === "00") return false;
	return resolveTraceSampled(traceId);
}
var ChannelTraceRecorder = class {
	constructor(reporter, operation, name, wireTraceId, attributes = {}, parentSpanId, sampled, startTimeMs) {
		this.reporter = reporter;
		this.operation = operation;
		this.name = name;
		this.attributes = attributes;
		this.startTime = Date.now();
		this.events = [];
		this.finished = false;
		this.traceId = normalizeTraceId(wireTraceId);
		this.spanId = generateSpanId();
		this.parentSpanId = normalizeSpanId(parentSpanId);
		this.sampled = resolveTraceSampled(this.traceId, sampled);
		if (startTimeMs !== void 0) this.startTime = startTimeMs;
	}
	getStartTime() {
		return this.startTime;
	}
	getBaseAttributes() {
		return { ...this.attributes };
	}
	getParentSpanId() {
		return this.parentSpanId;
	}
	getReporter() {
		return this.reporter;
	}
	/** Drop reporting for this span (merged into a batch span). */
	abandon() {
		this.finished = true;
	}
	addEvent(name, attributes) {
		if (this.finished) return;
		this.events.push({
			name,
			timestamp: Date.now(),
			...attributes ? { attributes } : {}
		});
	}
	success(attributes) {
		this.finish("ok", attributes);
	}
	error(error, attributes) {
		this.finish("error", {
			...attributes,
			...errorAttributes(error)
		});
	}
	finish(status, endAttributes) {
		if (this.finished) return;
		this.finished = true;
		if (!this.reporter) return;
		const span = {
			traceId: this.traceId,
			spanId: this.spanId,
			sampled: this.sampled,
			...this.parentSpanId ? { parentSpanId: this.parentSpanId } : {},
			operation: this.operation,
			name: this.name,
			startTime: this.startTime,
			endTime: Date.now(),
			status,
			attributes: {
				...this.attributes,
				...endAttributes
			},
			events: this.events
		};
		try {
			const result = this.reporter(span);
			if (result && typeof result.catch === "function") result.catch(() => void 0);
		} catch {}
	}
};
function mergeBatchSendTraceSpans(spans) {
	if (spans.length === 0) return;
	for (const span of spans) span.abandon();
	const first = spans[0];
	const reporter = first.getReporter();
	if (!reporter) return;
	const merged = new ChannelTraceRecorder(reporter, "send", "channel_sdk.send", first.traceId, first.getBaseAttributes(), first.getParentSpanId(), first.sampled, Math.min(...spans.map((span) => span.getStartTime())));
	merged.addEvent("send.batch.flush", { "send.batch_items": spans.length });
	return merged;
}
function generateHexId(length) {
	const bytes = new Uint8Array(length / 2);
	const cryptoApi = typeof globalThis !== "undefined" ? globalThis.crypto : void 0;
	if (cryptoApi?.getRandomValues) cryptoApi.getRandomValues(bytes);
	else for (let i = 0; i < bytes.length; i++) bytes[i] = Math.floor(Math.random() * 256);
	if (bytes.every((value) => value === 0)) bytes[bytes.length - 1] = 1;
	return Array.from(bytes, (value) => value.toString(16).padStart(2, "0")).join("");
}
function fnv1a32(value, seed) {
	let hash = seed >>> 0;
	for (let i = 0; i < value.length; i++) {
		hash ^= value.charCodeAt(i);
		hash = Math.imul(hash, 16777619);
	}
	return hash >>> 0;
}
function errorAttributes(error) {
	const candidate = error;
	const result = { "error.type": typeof candidate?.name === "string" ? candidate.name.slice(0, 64) : "Error" };
	if (typeof candidate?.code === "string" || typeof candidate?.code === "number") result["error.code"] = String(candidate.code).slice(0, 64);
	return result;
}
function bytesToBase64(bytes) {
	if (typeof btoa === "function") {
		let binary = "";
		const len = bytes.byteLength;
		for (let i = 0; i < len; i++) binary += String.fromCharCode(bytes[i]);
		return btoa(binary);
	}
	if (typeof Buffer !== "undefined") return Buffer.from(bytes).toString("base64");
	throw new Error("[envelope/crypto] no base64 encoder available");
}
function base64ToBytes(b64) {
	if (typeof atob === "function") {
		const binary = atob(b64);
		const len = binary.length;
		const out = new Uint8Array(len);
		for (let i = 0; i < len; i++) out[i] = binary.charCodeAt(i);
		return out;
	}
	if (typeof Buffer !== "undefined") return new Uint8Array(Buffer.from(b64, "base64"));
	throw new Error("[envelope/crypto] no base64 decoder available");
}
function utf8Encode(s) {
	return new TextEncoder().encode(s);
}
function utf8Decode(bytes) {
	return new TextDecoder("utf-8").decode(bytes);
}
async function importAesGcmKey(rawKey) {
	if (rawKey.byteLength !== 32) throw new Error(`[envelope/crypto] AES-GCM-256 expects 32-byte key, got ${rawKey.byteLength}`);
	return crypto.subtle.importKey("raw", rawKey, { name: "AES-GCM" }, false, ["encrypt", "decrypt"]);
}
async function aesGcmEncrypt(plaintext, key, iv, aad) {
	if (iv.byteLength !== 12) throw new Error(`[envelope/crypto] AES-GCM IV must be 12 bytes, got ${iv.byteLength}`);
	const out = await crypto.subtle.encrypt({
		name: "AES-GCM",
		iv,
		additionalData: aad,
		tagLength: 128
	}, key, plaintext);
	const buf = new Uint8Array(out);
	if (buf.byteLength < 16) throw new Error("[envelope/crypto] AES-GCM encrypt produced output shorter than tag length");
	return {
		ciphertext: buf.slice(0, buf.byteLength - 16),
		tag: buf.slice(buf.byteLength - 16)
	};
}
async function aesGcmDecrypt(ciphertext, tag, key, iv, aad) {
	if (iv.byteLength !== 12) throw new Error(`[envelope/crypto] AES-GCM IV must be 12 bytes, got ${iv.byteLength}`);
	if (tag.byteLength !== 16) throw new Error(`[envelope/crypto] AES-GCM tag must be 16 bytes, got ${tag.byteLength}`);
	const concat = new Uint8Array(ciphertext.byteLength + tag.byteLength);
	concat.set(ciphertext, 0);
	concat.set(tag, ciphertext.byteLength);
	const out = await crypto.subtle.decrypt({
		name: "AES-GCM",
		iv,
		additionalData: aad,
		tagLength: 128
	}, key, concat);
	return new Uint8Array(out);
}
function randomBytes(length) {
	const out = new Uint8Array(length);
	crypto.getRandomValues(out);
	return out;
}
function buildAAD(msgId, partIndex, partTotal, keyVersion) {
	return utf8Encode(`${msgId}|${partIndex}|${partTotal}|${keyVersion}`);
}
function serializeEnvelopeNoSig(env) {
	const hasSeq = env.seq !== void 0;
	const hasSender = env.senderDeviceId !== void 0;
	const hasEvtType = env.eventType !== void 0;
	let obj;
	if (!hasSeq && !hasSender && !hasEvtType) obj = {
		v: env.v,
		msgId: env.msgId,
		partIndex: env.partIndex,
		partTotal: env.partTotal,
		eventId: env.eventId,
		ts: env.ts,
		iv: env.iv,
		ciphertext: env.ciphertext,
		tag: env.tag,
		keyVersion: env.keyVersion
	};
	else if (hasSeq && !hasSender && !hasEvtType) obj = {
		v: env.v,
		msgId: env.msgId,
		partIndex: env.partIndex,
		partTotal: env.partTotal,
		eventId: env.eventId,
		seq: env.seq,
		ts: env.ts,
		iv: env.iv,
		ciphertext: env.ciphertext,
		tag: env.tag,
		keyVersion: env.keyVersion
	};
	else if (!hasSeq && hasSender && !hasEvtType) obj = {
		v: env.v,
		msgId: env.msgId,
		partIndex: env.partIndex,
		partTotal: env.partTotal,
		eventId: env.eventId,
		ts: env.ts,
		iv: env.iv,
		ciphertext: env.ciphertext,
		tag: env.tag,
		keyVersion: env.keyVersion,
		senderDeviceId: env.senderDeviceId
	};
	else if (!hasSeq && !hasSender && hasEvtType) obj = {
		v: env.v,
		msgId: env.msgId,
		partIndex: env.partIndex,
		partTotal: env.partTotal,
		eventId: env.eventId,
		ts: env.ts,
		iv: env.iv,
		ciphertext: env.ciphertext,
		tag: env.tag,
		keyVersion: env.keyVersion,
		eventType: env.eventType
	};
	else if (hasSeq && hasSender && !hasEvtType) obj = {
		v: env.v,
		msgId: env.msgId,
		partIndex: env.partIndex,
		partTotal: env.partTotal,
		eventId: env.eventId,
		seq: env.seq,
		ts: env.ts,
		iv: env.iv,
		ciphertext: env.ciphertext,
		tag: env.tag,
		keyVersion: env.keyVersion,
		senderDeviceId: env.senderDeviceId
	};
	else if (hasSeq && !hasSender && hasEvtType) obj = {
		v: env.v,
		msgId: env.msgId,
		partIndex: env.partIndex,
		partTotal: env.partTotal,
		eventId: env.eventId,
		seq: env.seq,
		ts: env.ts,
		iv: env.iv,
		ciphertext: env.ciphertext,
		tag: env.tag,
		keyVersion: env.keyVersion,
		eventType: env.eventType
	};
	else if (!hasSeq && hasSender && hasEvtType) obj = {
		v: env.v,
		msgId: env.msgId,
		partIndex: env.partIndex,
		partTotal: env.partTotal,
		eventId: env.eventId,
		ts: env.ts,
		iv: env.iv,
		ciphertext: env.ciphertext,
		tag: env.tag,
		keyVersion: env.keyVersion,
		senderDeviceId: env.senderDeviceId,
		eventType: env.eventType
	};
	else obj = {
		v: env.v,
		msgId: env.msgId,
		partIndex: env.partIndex,
		partTotal: env.partTotal,
		eventId: env.eventId,
		seq: env.seq,
		ts: env.ts,
		iv: env.iv,
		ciphertext: env.ciphertext,
		tag: env.tag,
		keyVersion: env.keyVersion,
		senderDeviceId: env.senderDeviceId,
		eventType: env.eventType
	};
	return utf8Encode(JSON.stringify(obj));
}
async function importHmacKey(rawKey) {
	return crypto.subtle.importKey("raw", rawKey, {
		name: "HMAC",
		hash: "SHA-256"
	}, false, ["sign", "verify"]);
}
async function hmacSign(key, input) {
	const out = await crypto.subtle.sign("HMAC", key, input);
	return new Uint8Array(out);
}
async function hmacVerify(key, sig, input) {
	return crypto.subtle.verify("HMAC", key, sig, input);
}
async function verifyEnvelopeSignature(env, signKey) {
	return hmacVerify(signKey, base64ToBytes(env.sig), serializeEnvelopeNoSig({
		v: env.v,
		msgId: env.msgId,
		partIndex: env.partIndex,
		partTotal: env.partTotal,
		eventId: env.eventId,
		seq: env.seq,
		ts: env.ts,
		iv: env.iv,
		ciphertext: env.ciphertext,
		tag: env.tag,
		keyVersion: env.keyVersion,
		senderDeviceId: env.senderDeviceId,
		eventType: env.eventType
	}));
}
var ENVELOPE_PROTOCOL_VERSION = 1;
var ENVELOPE_OVERHEAD = 1024;
var MAX_CLOCK_DRIFT_MS = 300 * 1e3;
var DEFAULT_RING_BUFFER_TTL_MS = 30 * 1e3;
var TRACE_OPERATIONS = [
	"handshake",
	"send",
	"request",
	"reply",
	"convmsg",
	"recv",
	"unknown"
];
function normalizeTraceOperation(value) {
	return typeof value === "string" && TRACE_OPERATIONS.includes(value) ? value : "unknown";
}
var ULID_ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
function generateULID() {
	const ts = Date.now();
	let out = "";
	let tsRem = ts;
	for (let i = 9; i >= 0; i--) {
		out = ULID_ALPHABET[tsRem & 31] + out;
		tsRem = Math.floor(tsRem / 32);
	}
	const rnd = randomBytes(10);
	let rndStr = "";
	let buf = 0;
	let bufBits = 0;
	for (let i = 0; i < rnd.length; i++) {
		buf = buf << 8 | rnd[i];
		bufBits += 8;
		while (bufBits >= 5) {
			bufBits -= 5;
			const idx = buf >>> bufBits & 31;
			rndStr += ULID_ALPHABET[idx];
		}
	}
	return out + rndStr.slice(0, 16);
}
function generateUUIDv4() {
	if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
	const bytes = randomBytes(16);
	bytes[6] = bytes[6] & 15 | 64;
	bytes[8] = bytes[8] & 63 | 128;
	const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
	return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}
async function pack(payload, encryptKey, signKey, keyVersion, opts = {}) {
	const maxPayloadBytes = opts.maxPayloadBytes ?? 49152;
	if (maxPayloadBytes <= ENVELOPE_OVERHEAD) throw new Error(`[envelope/pack] maxPayloadBytes ${maxPayloadBytes} must be > ENVELOPE_OVERHEAD ${ENVELOPE_OVERHEAD}`);
	const msgId = opts.msgId ?? generateULID();
	const eventId = opts.eventId ?? generateUUIDv4();
	const ts = opts.ts ?? Date.now();
	const seq = opts.seq;
	const senderDeviceId = opts.senderDeviceId;
	const eventType = opts.eventType;
	const traceId = normalizeTraceId(opts.traceId);
	const spanId = opts.spanId;
	const wireTraceFlags = traceFlags(resolveTraceSampled(traceId, opts.sampled));
	const traceOperation = normalizeTraceOperation(opts.traceOperation);
	const plaintext = utf8Encode(JSON.stringify(payload));
	if (plaintext.byteLength === 0) throw new Error("[envelope/pack] payload serialized to 0 bytes");
	const partSizeMax = maxPayloadBytes - ENVELOPE_OVERHEAD;
	let partTotal = Math.ceil(plaintext.byteLength / partSizeMax);
	if (partTotal === 0) partTotal = 1;
	if (partTotal > 65535) throw new Error(`[envelope/pack] partTotal ${partTotal} exceeds uint16 max`);
	const envelopes = [];
	for (let i = 0; i < partTotal; i++) {
		const start = i * partSizeMax;
		const end = Math.min(start + partSizeMax, plaintext.byteLength);
		const slice = plaintext.slice(start, end);
		const iv = randomBytes(12);
		const { ciphertext, tag } = await aesGcmEncrypt(slice, encryptKey, iv, buildAAD(msgId, i, partTotal, keyVersion));
		const noSig = {
			v: ENVELOPE_PROTOCOL_VERSION,
			msgId,
			partIndex: i,
			partTotal,
			eventId,
			seq,
			ts,
			iv: bytesToBase64(iv),
			ciphertext: bytesToBase64(ciphertext),
			tag: bytesToBase64(tag),
			keyVersion,
			senderDeviceId,
			eventType
		};
		const sigBytes = await hmacSign(signKey, serializeEnvelopeNoSig(noSig));
		envelopes.push({
			...noSig,
			sig: bytesToBase64(sigBytes),
			traceId,
			spanId,
			traceFlags: wireTraceFlags,
			traceOperation
		});
	}
	return envelopes;
}
function adaptAcpEventToPayload(ev) {
	return {
		type: ev.type,
		data: ev.data
	};
}
var AcpSeqAllocator = class {
	constructor() {
		this.counters = /* @__PURE__ */ new Map();
	}
	/** 取一个 sessionId 的下一个 seq（从 0 开始，每次调用后 +1）。 */
	next(sessionId) {
		const cur = this.counters.get(sessionId) ?? 0;
		this.counters.set(sessionId, cur + 1);
		return cur;
	}
	/** 重置（unsubscribe / stream close 时调用）。 */
	reset(sessionId) {
		this.counters.delete(sessionId);
	}
	clear() {
		this.counters.clear();
	}
};
var sharedSeqAllocator = new AcpSeqAllocator();
function synthesizeMeta(sessionId) {
	const seq = sharedSeqAllocator.next(sessionId);
	return {
		eventId: `${sessionId}:${seq}`,
		seq,
		msgId: generateULID(),
		ts: Date.now(),
		keyVersion: 0
	};
}
function resetSeqForSession(sessionId) {
	sharedSeqAllocator.reset(sessionId);
}
function extractSessionIdFromChannel(channel) {
	if (!channel.startsWith("session:")) throw new Error(`[acp/stream-decoder] channel %q is not a session channel: ${channel}`);
	return channel.slice(8);
}
function isSessionChannel(channel) {
	return channel.startsWith("session:");
}
var ACP_METHOD_MAP = Object.freeze({
	"prompt.submit": "prompt",
	"prompt.cancel": "cancel",
	"permission.grant": "resolvePermission",
	"permission.reject": "rejectPermission",
	"session.load": "loadSession"
});
function mapTypeToAcpMethod(payloadType) {
	if (typeof payloadType === "string" && payloadType in ACP_METHOD_MAP) return ACP_METHOD_MAP[payloadType];
	return "prompt";
}
function is503Error(err) {
	if (typeof err !== "object" || err === null) return false;
	return err.status === 503;
}
function parseRetryAfterMs(err, fallbackMs = 1e3) {
	const ra = err.headers?.["Retry-After"];
	if (!ra) return fallbackMs;
	const sec = Number(ra);
	if (Number.isFinite(sec) && sec >= 0) return Math.floor(sec * 1e3);
	return fallbackMs;
}
var AcpStreamWrapper = class {
	constructor(sessionId, source, log) {
		this.sessionId = sessionId;
		this.source = source;
		this.subscribers = [];
		this.abortController = new AbortController();
		this.started = false;
		this.closed = false;
		this.log = log;
	}
	/** 启动后台读取循环（首次 subscribe 触发）。 */
	start() {
		if (this.started || this.closed) return;
		this.started = true;
		this.readLoop();
	}
	subscribe(handler, onError) {
		if (this.closed) {
			onError?.(/* @__PURE__ */ new Error("[acp/adapter] subscribe on closed stream"));
			return { cancel: () => void 0 };
		}
		const sub = {
			handler,
			onError,
			cancelled: false
		};
		this.subscribers.push(sub);
		this.start();
		return { cancel: () => {
			sub.cancelled = true;
			const idx = this.subscribers.indexOf(sub);
			if (idx >= 0) this.subscribers.splice(idx, 1);
		} };
	}
	async close() {
		if (this.closed) return;
		this.closed = true;
		this.abortController.abort();
		this.subscribers.length = 0;
		resetSeqForSession(this.sessionId);
		this.log.debug("[acp/adapter] stream closed", { sessionId: this.sessionId });
	}
	subscriberCount() {
		return this.subscribers.length;
	}
	/** 后台读取循环：消费 acpProvider 推流的异步迭代器，fan-out 到 subscribers。 */
	async readLoop() {
		try {
			for await (const ev of this.source) {
				if (this.closed) break;
				const snapshot = this.subscribers.slice();
				for (const sub of snapshot) {
					if (sub.cancelled) continue;
					try {
						sub.handler(ev);
					} catch (handlerErr) {
						this.log.debug("[acp/adapter] subscriber handler threw", {
							sessionId: this.sessionId,
							err: String(handlerErr)
						});
					}
				}
			}
		} catch (err) {
			if (this.closed) return;
			this.log.error("[acp/adapter] stream readLoop error", {
				sessionId: this.sessionId,
				err: String(err)
			});
			const subErr = err instanceof Error ? err : new Error(String(err));
			for (const sub of this.subscribers.slice()) if (!sub.cancelled) sub.onError?.(subErr);
		} finally {
			this.closed = true;
		}
	}
};
var AcpAdapter = class {
	constructor(opts) {
		/** sessionId → AcpStream（懒建立，refCount=0 时清理）。 */
		this.streams = /* @__PURE__ */ new Map();
		/**
		* sessionId → 建流 in-flight Promise（防并发重复建流）。
		*
		* getOrCreateStream 是异步的（要 await getSandboxInfo / openAcpStream）；若同一 session 在
		* 第一条流就绪前再次 recv，必须复用同一个 in-flight Promise，否则会重复调 openAcpStream
		* 建出两条底层流（资源泄漏 + 引用计数错乱）。
		*/
		this.streamPromises = /* @__PURE__ */ new Map();
		/** sessionId → 最近一次建流请求的唯一标识 token（symbol，用于竟态防护）。 */
		this.streamRequestIds = /* @__PURE__ */ new Map();
		/** sessionId → 当前订阅引用计数。 */
		this.refCounts = /* @__PURE__ */ new Map();
		/** sessionId → sandboxInfo（缓存，避免每次 send 重新拉）。 */
		this.sandboxInfoCache = /* @__PURE__ */ new Map();
		this.provider = opts.acpProvider;
		this.maxRetryAttempts = opts.maxRetryAttempts ?? 10;
		this.defaultRetryAfterMs = opts.defaultRetryAfterMs ?? 1e3;
		this.log = opts.logger ?? noopLogger;
		this.metrics = opts.metrics ?? new Metrics();
		this.clientType = opts.clientType ?? "web";
	}
	/**
	* 路由 session:* channel 的 send。
	*
	* 流程（实现规格书 §5.7 Step 1-2）：
	*   1. 从 channel 解析 sessionId
	*   2. 取 sandboxInfo（缓存命中即用，否则调 provider.getSandboxInfo）
	*   3. payload.type → AcpMethod
	*   4. provider.sendAcpRequest；503 透明退避；其它异常归一 ChSdkAcpUnavailableError
	*/
	async send(channel, payload, opts) {
		const sid = extractSessionIdFromChannel(channel);
		const sandboxInfo = await this.getSandboxInfo(sid);
		const method = mapTypeToAcpMethod(payload?.type);
		const startMs = Date.now();
		for (let attempt = 0; attempt < this.maxRetryAttempts; attempt++) try {
			await this.provider.sendAcpRequest({
				sandboxInfo: {
					apiUrl: sandboxInfo.apiUrl,
					accessToken: sandboxInfo.accessToken
				},
				method,
				payload,
				signal: opts?.signal
			});
			this.metrics.observe(METRIC.acpRequestLatencyMs, Date.now() - startMs, {
				clientType: this.clientType,
				method
			});
			return;
		} catch (err) {
			if (is503Error(err)) {
				const ms = parseRetryAfterMs(err, this.defaultRetryAfterMs);
				this.log.debug("[acp/adapter] send 503 retry", {
					sid,
					attempt,
					retryAfterMs: ms
				});
				await sleep(ms, opts?.signal);
				continue;
			}
			this.metrics.inc(METRIC.acpFailureTotal, {
				clientType: this.clientType,
				errorCode: "CH_SDK_5042"
			});
			throw new ChSdkAcpUnavailableError(`[acp/adapter] sendAcpRequest failed: ${describeError2(err)}`);
		}
		this.metrics.inc(METRIC.acpFailureTotal, {
			clientType: this.clientType,
			errorCode: "CH_SDK_5042"
		});
		throw new ChSdkAcpUnavailableError(`[acp/adapter] sendAcpRequest 503 retry exhausted after ${this.maxRetryAttempts} attempts (sid=${sid})`);
	}
	/**
	* 路由 session:* channel 的 recv。
	*
	* 流程（实现规格书 §5.7 Step 1-3）：
	*   1. 引用计数 +1，必要时调 getOrCreateStream
	*   2. stream.subscribe — 包装 ACP event 为 (payload, meta)
	*   3. 返回 unsubscribe：refCount -1；归0 时关 stream + 清缓存
	*/
	recv(channel, handler, opts) {
		const sid = extractSessionIdFromChannel(channel);
		const streamPromise = this.getOrCreateStream(sid);
		this.refCounts.set(sid, (this.refCounts.get(sid) ?? 0) + 1);
		let cancel = null;
		let unsubscribed = false;
		streamPromise.then((stream) => {
			if (unsubscribed) return;
			cancel = stream.subscribe((ev) => {
				try {
					handler(adaptAcpEventToPayload(ev), synthesizeMeta(sid));
				} catch (handlerErr) {
					this.log.debug("[acp/adapter] recv handler threw", {
						sid,
						err: String(handlerErr)
					});
				}
			}, (err) => {
				opts?.onError?.({
					code: "CH_SDK_5042",
					message: `[acp/adapter] stream error: ${err.message}`,
					channel,
					cause: err
				});
			}).cancel;
		}).catch((err) => {
			this.log.error("[acp/adapter] getOrCreateStream failed", {
				sid,
				err: String(err)
			});
			opts?.onError?.({
				code: "CH_SDK_5042",
				message: `[acp/adapter] failed to open ACP stream: ${describeError2(err)}`,
				channel,
				cause: err
			});
			this.decrementAndCleanup(sid);
		});
		return () => {
			if (unsubscribed) return;
			unsubscribed = true;
			if (cancel) cancel();
			this.decrementAndCleanup(sid);
		};
	}
	/** 主动关闭所有 stream（SDK close 时调用）。 */
	async closeAll() {
		const promises = [];
		for (const [sid, stream] of this.streams) {
			promises.push(stream.close());
			this.log.debug("[acp/adapter] closeAll: closing stream", { sid });
		}
		this.streams.clear();
		this.streamPromises.clear();
		this.refCounts.clear();
		this.sandboxInfoCache.clear();
		await Promise.allSettled(promises);
	}
	/** 获取或建立 sessionId 对应的 AcpStream（懒建立 + 缓存 + in-flight 去重）。 */
	getOrCreateStream(sid) {
		const existing = this.streams.get(sid);
		if (existing) return Promise.resolve(existing);
		const pending = this.streamPromises.get(sid);
		if (pending) return pending;
		const requestId = Symbol(sid);
		const promise = (async () => {
			const startMs = Date.now();
			try {
				const sandboxInfo = await this.getSandboxInfo(sid);
				const abortController = new AbortController();
				const stream = new AcpStreamWrapper(sid, this.provider.openAcpStream({
					sandboxInfo: {
						apiUrl: sandboxInfo.apiUrl,
						accessToken: sandboxInfo.accessToken
					},
					sessionId: sid,
					signal: abortController.signal
				}), this.log);
				if (this.streamRequestIds.get(sid) !== requestId) {
					stream.close();
					this.log.debug("[acp/adapter] getOrCreateStream: discarded stale stream (cancelled or superseded)", { sid });
					return stream;
				}
				this.streams.set(sid, stream);
				this.metrics.observe(METRIC.acpConnectLatencyMs, Date.now() - startMs, {
					clientType: this.clientType,
					sandboxId: sid
				});
				return stream;
			} catch (err) {
				this.metrics.inc(METRIC.acpFailureTotal, {
					clientType: this.clientType,
					errorCode: "CH_SDK_5042"
				});
				throw err;
			}
		})();
		this.streamPromises.set(sid, promise);
		this.streamRequestIds.set(sid, requestId);
		const clearIfCurrent = () => {
			if (this.streamRequestIds.get(sid) === requestId) {
				this.streamPromises.delete(sid);
				this.streamRequestIds.delete(sid);
			}
		};
		promise.then(clearIfCurrent, clearIfCurrent);
		return promise;
	}
	/** 取/缓存 sandbox 元信息。 */
	async getSandboxInfo(sid) {
		const cached = this.sandboxInfoCache.get(sid);
		if (cached) return cached;
		const info = await this.provider.getSandboxInfo({ scopeId: sid });
		this.sandboxInfoCache.set(sid, info);
		return info;
	}
	/** 引用计数 -1；归 0 时关 stream + 清 sandboxInfo 缓存。 */
	decrementAndCleanup(sid) {
		const cur = this.refCounts.get(sid) ?? 0;
		if (cur <= 1) {
			this.refCounts.delete(sid);
			this.streamPromises.delete(sid);
			this.streamRequestIds.delete(sid);
			const stream = this.streams.get(sid);
			if (stream) {
				this.streams.delete(sid);
				stream.close();
			}
			this.sandboxInfoCache.delete(sid);
		} else this.refCounts.set(sid, cur - 1);
	}
	/** @internal 测试用：当前活跃 stream 数。 */
	_activeStreamCount() {
		return this.streams.size;
	}
	/** @internal 测试用：取某 session 的引用计数。 */
	_refCountOf(sid) {
		return this.refCounts.get(sid) ?? 0;
	}
};
function sleep(ms, signal) {
	return new Promise((resolve, reject) => {
		if (signal?.aborted) {
			reject(/* @__PURE__ */ new Error("aborted"));
			return;
		}
		const timer = setTimeout(() => resolve(), ms);
		signal?.addEventListener("abort", () => {
			clearTimeout(timer);
			reject(/* @__PURE__ */ new Error("aborted"));
		}, { once: true });
	});
}
function describeError2(err) {
	if (err instanceof Error) return err.message;
	return String(err);
}
var EXECUTOR_SCOPE_PREFIX = "executor:";
var CONVMSG_SCOPE_PREFIX = "convmsg:";
var DEVICE_PRESENCE_CHANNEL_PREFIX = "user:";
var DEVICE_PRESENCE_CHANNEL_SUFFIX = ":devices";
function devicePresenceChannel(userId) {
	return `${DEVICE_PRESENCE_CHANNEL_PREFIX}${userId}${DEVICE_PRESENCE_CHANNEL_SUFFIX}`;
}
function shouldUseWsPublish(channel) {
	return /^user:[^:]+:devices$/.test(channel);
}
function extractCommandId(payload) {
	if (typeof payload !== "object" || payload === null) return null;
	const cid = payload.commandId;
	return typeof cid === "string" && cid.length > 0 ? cid : null;
}
function ensureConversationIdInPayload(channel, payload, optsConvId) {
	if (!channel.startsWith(CONVMSG_SCOPE_PREFIX)) return payload;
	if (!optsConvId || typeof optsConvId !== "string") throw new ChSdkParamError(`[send] conversationId is required for convmsg channel (channel=${channel}); pass it via SendOptions.conversationId (D-CONVMSG-USER-CHANNEL)`);
	if (payload === null || typeof payload !== "object") throw new ChSdkParamError(`[send] convmsg payload must be an object containing event fields (channel=${channel})`);
	const obj = payload;
	const existing = obj.conversationId;
	if (existing === void 0) return {
		...obj,
		conversationId: optsConvId
	};
	if (typeof existing !== "string" || existing !== optsConvId) throw new ChSdkParamError(`[send] conversationId mismatch: payload.conversationId=${String(existing)} but opts.conversationId=${optsConvId} (channel=${channel})`);
	return payload;
}
var EVENT_TYPE_DEVICE_OFFLINE = "device.offline";
var EVENT_TYPE_DEVICE_ONLINE = "device.online";
var HEARTBEAT_INTERVAL_MS = 2e4;
var FAILURE_ESCALATION = 3;
var OFFLINE_PUBLISH_TIMEOUT_MS = 1500;
var DevicePresence = class {
	constructor(deps) {
		this.timer = null;
		this.stopped = false;
		this.consecutiveFailures = 0;
		this.credManager = deps.credManager;
		this.deviceId = deps.deviceId;
		this.clientType = deps.clientType;
		this.publishEnvelope = deps.publishEnvelope;
		this.log = deps.logger ?? noopLogger;
		this.channel = devicePresenceChannel(deps.userId);
	}
	/**
	* 启动 device presence 心跳。
	* 仅当业务持有 user:{userId}:devices 加解密/签名密钥时启用；首拍放在 INTERVAL 之后
	* （避免与服务端凭证签发同步登记重复）。Node 运行时 unref，避免阻止进程退出。
	*/
	start() {
		if (!this.hasKey()) {
			this.log.info("[presence] heartbeat disabled: no key for channel", { channel: this.channel });
			return;
		}
		this.timer = setInterval(() => {
			this.heartbeat();
		}, HEARTBEAT_INTERVAL_MS);
		const t = this.timer;
		if (typeof t.unref === "function") t.unref();
	}
	/** 停止心跳（close 时调用）。stop 后 heartbeat 不再发；publishOffline 仍可独立调用。 */
	stop() {
		this.stopped = true;
		if (this.timer) {
			clearInterval(this.timer);
			this.timer = null;
		}
	}
	/**
	* best-effort 发送 device.offline（带 OFFLINE_PUBLISH_TIMEOUT_MS 硬超时 + 全吞错误）。
	* 拿不到凭证 / 密钥静默跳过。供 close() 在 stop() 之后调用。
	*/
	async publishOffline() {
		if (!this.hasKey()) {
			this.log.debug("[presence] device.offline skipped: no key for channel", { channel: this.channel });
			return;
		}
		const payload = this.buildPayload(EVENT_TYPE_DEVICE_OFFLINE);
		try {
			await Promise.race([this.publishEnvelope(this.channel, payload, EVENT_TYPE_DEVICE_OFFLINE), new Promise((resolve) => setTimeout(resolve, OFFLINE_PUBLISH_TIMEOUT_MS))]);
			this.log.debug("[presence] device.offline published on close", {
				channel: this.channel,
				deviceId: this.deviceId
			});
		} catch (err) {
			this.log.debug("[presence] device.offline publish failed (ignored)", {
				channel: this.channel,
				err: describeError(err)
			});
		}
	}
	/** 发送一次 device.online 心跳（best-effort）。连续失败跨阈值时升级诊断日志。 */
	async heartbeat() {
		if (this.stopped) return;
		const payload = this.buildPayload(EVENT_TYPE_DEVICE_ONLINE);
		try {
			await this.publishEnvelope(this.channel, payload, EVENT_TYPE_DEVICE_ONLINE);
			this.consecutiveFailures = 0;
			this.log.debug("[presence] device.online heartbeat published", {
				channel: this.channel,
				deviceId: this.deviceId
			});
		} catch (err) {
			this.consecutiveFailures += 1;
			const consecutive = this.consecutiveFailures;
			if (consecutive === FAILURE_ESCALATION) this.log.error("[presence] device.online heartbeat persistently failing — presence likely lost", {
				channel: this.channel,
				consecutiveFailures: consecutive,
				err: describeError(err),
				hint: "check CF namespace publish permission / publish_proxy X-API-Key / connection token"
			});
			else this.log.debug("[presence] device.online heartbeat failed (ignored)", {
				channel: this.channel,
				consecutiveFailures: consecutive,
				err: describeError(err)
			});
		}
	}
	/** 业务是否持有 device presence channel 的加解密/签名密钥（决定是否启用 presence）。 */
	hasKey() {
		return !!this.credManager.getEncryptionKey(this.channel) && !!this.credManager.getSigningKey(this.channel);
	}
	buildPayload(type) {
		return {
			type,
			deviceId: this.deviceId,
			clientType: this.clientType,
			ts: Date.now()
		};
	}
};
async function unpack(envs, encryptKey, signKey) {
	if (envs.length === 0) throw new Error("[envelope/unpack] empty envelope list");
	const first = envs[0];
	const partTotal = first.partTotal;
	if (envs.length !== partTotal) throw new Error(`[envelope/unpack] expected ${partTotal} parts, got ${envs.length}`);
	const slices = [];
	for (let i = 0; i < envs.length; i++) {
		const env = envs[i];
		if (env.msgId !== first.msgId) throw new Error(`[envelope/unpack] msgId mismatch at part ${i}: ${env.msgId} vs ${first.msgId}`);
		if (env.partIndex !== i) throw new Error(`[envelope/unpack] partIndex mismatch at index ${i}: got ${env.partIndex}`);
		if (env.partTotal !== partTotal) throw new Error(`[envelope/unpack] partTotal mismatch at index ${i}: got ${env.partTotal}`);
		if (!await verifyEnvelopeSignature(env, signKey)) throw new Error(`[envelope/unpack] HMAC verify failed at part ${i} (msgId=${env.msgId})`);
		const iv = base64ToBytes(env.iv);
		const ciphertext = base64ToBytes(env.ciphertext);
		const tag = base64ToBytes(env.tag);
		const aad = buildAAD(env.msgId, env.partIndex, env.partTotal, env.keyVersion);
		try {
			const slice = await aesGcmDecrypt(ciphertext, tag, encryptKey, iv, aad);
			slices.push(slice);
		} catch (err) {
			throw new Error(`[envelope/unpack] AES-GCM decrypt failed at part ${i}: ${String(err)}`);
		}
	}
	const total = slices.reduce((acc, s) => acc + s.byteLength, 0);
	const plaintext = new Uint8Array(total);
	let off = 0;
	for (const s of slices) {
		plaintext.set(s, off);
		off += s.byteLength;
	}
	return JSON.parse(utf8Decode(plaintext));
}
var RingBuffer = class {
	constructor(ttlMs = DEFAULT_RING_BUFFER_TTL_MS) {
		this.buckets = /* @__PURE__ */ new Map();
		this.ttlMs = ttlMs;
	}
	/**
	* 投递一个分片。
	*
	* @returns
	*   - complete：聚合完成时的完整切片（已排序）；未完成时 null
	*   - dropReason：本片被丢弃的原因；正常吸收时 null
	*/
	add(env, now = Date.now()) {
		this.cleanupExpired(now);
		if (env.partTotal === 0) return {
			complete: null,
			dropReason: "partTotal_mismatch"
		};
		if (env.partIndex >= env.partTotal) return {
			complete: null,
			dropReason: "partIndex_out_of_range"
		};
		let bucket = this.buckets.get(env.msgId);
		if (!bucket) {
			bucket = {
				parts: /* @__PURE__ */ new Map(),
				partTotal: env.partTotal,
				firstSeenAt: now
			};
			this.buckets.set(env.msgId, bucket);
		} else if (bucket.partTotal !== env.partTotal) return {
			complete: null,
			dropReason: "partTotal_mismatch"
		};
		bucket.parts.set(env.partIndex, env);
		if (bucket.parts.size === bucket.partTotal) {
			const out = [];
			for (let i = 0; i < bucket.partTotal; i++) {
				const part = bucket.parts.get(i);
				if (!part) return {
					complete: null,
					dropReason: "partIndex_out_of_range"
				};
				out.push(part);
			}
			this.buckets.delete(env.msgId);
			return {
				complete: out,
				dropReason: null
			};
		}
		return {
			complete: null,
			dropReason: null
		};
	}
	/**
	* 清理所有过期桶。返回被清理的 msgId 列表（业务方可据此触发 CH_SDK_5001 告警）。
	*/
	cleanupExpired(now = Date.now()) {
		const expired = [];
		for (const [msgId, bucket] of this.buckets) if (now - bucket.firstSeenAt > this.ttlMs) {
			expired.push(msgId);
			this.buckets.delete(msgId);
		}
		return expired;
	}
	/** 当前桶数量（测试 / 监控用）。 */
	size() {
		return this.buckets.size;
	}
	/** 清空所有桶（unsubscribe / 关闭 SDK 时调用）。 */
	clear() {
		this.buckets.clear();
	}
};
var DEFAULT_DEDUP_CAPACITY = 1e3;
var DEFAULT_DEDUP_TTL_MS = 3e4;
var DedupCache = class {
	constructor(opts) {
		/**
		* Map 保留插入顺序；entries() 按插入序遍历。
		* LRU 淘汰：超容量时删 Map.keys().next().value（最早插入项）。
		*/
		this.entries = /* @__PURE__ */ new Map();
		this.capacity = opts?.capacity ?? DEFAULT_DEDUP_CAPACITY;
		this.ttlMs = opts?.ttlMs ?? DEFAULT_DEDUP_TTL_MS;
		if (this.capacity <= 0) throw new Error("[dedup-cache] capacity must be > 0");
		if (this.ttlMs <= 0) throw new Error("[dedup-cache] ttlMs must be > 0");
	}
	/**
	* 判断 eventId 是否已存在且未过期。
	*
	* 副作用：顺手清理被命中的过期条目（lazy expiration），避免长跑后内存堆积。
	*/
	has(eventId, now = Date.now()) {
		const entry = this.entries.get(eventId);
		if (!entry) return false;
		if (now - entry.addedAt > this.ttlMs) {
			this.entries.delete(eventId);
			return false;
		}
		return true;
	}
	/**
	* 加入一个 eventId。
	*
	* - 若已存在：刷新位置（移到 Map 尾部，等价于 LRU 命中重置）
	* - 容量超限：淘汰最旧条目（Map.keys().next().value）
	*/
	add(eventId, now = Date.now()) {
		if (this.entries.has(eventId)) this.entries.delete(eventId);
		this.entries.set(eventId, { addedAt: now });
		while (this.entries.size > this.capacity) {
			const oldest = this.entries.keys().next().value;
			if (oldest === void 0) break;
			this.entries.delete(oldest);
		}
	}
	/** 当前条目数（测试 / 监控用）。 */
	size() {
		return this.entries.size;
	}
	/** 清空（unsubscribe / close 时调用）。 */
	clear() {
		this.entries.clear();
	}
	/**
	* 主动批量清理过期条目（可选；has() 已 lazy 清理；本方法供周期性后台清扫）。
	*
	* @returns 被清理的条目数
	*/
	cleanupExpired(now = Date.now()) {
		let removed = 0;
		for (const [eventId, entry] of this.entries) if (now - entry.addedAt > this.ttlMs) {
			this.entries.delete(eventId);
			removed++;
		}
		return removed;
	}
};
var COMMAND_ID_LRU_TTL_MS = 300 * 1e3;
var COMMAND_ID_LRU_CAPACITY = 1e3;
var LocalDispatch = class {
	constructor(deps) {
		/** channel === `executor:{self.deviceId}` 的 recv handler 表。 */
		this.handlers = /* @__PURE__ */ new Map();
		/** 跨 source commandId 去重（5min TTL，复用通用 DedupCache）。 */
		this.commandIdDedup = new DedupCache({
			ttlMs: COMMAND_ID_LRU_TTL_MS,
			capacity: COMMAND_ID_LRU_CAPACITY
		});
		this.credManager = deps.credManager;
		this.clientType = deps.clientType;
		this.deviceId = deps.deviceId;
		this.log = deps.logger ?? noopLogger;
	}
	/** recv 时是否需要额外注册本地 handler（同设备 executor channel）。 */
	shouldRegisterLocalHandler(channel) {
		if (this.clientType !== "desktop") return false;
		if (!channel.startsWith(EXECUTOR_SCOPE_PREFIX)) return false;
		return channel.slice(EXECUTOR_SCOPE_PREFIX.length) === this.deviceId;
	}
	/** send 时是否命中同设备短路（已注册本地 handler 才短路）。 */
	shouldShortCircuit(channel) {
		return this.shouldRegisterLocalHandler(channel) && this.handlers.has(channel);
	}
	register(channel, handler) {
		this.handlers.set(channel, handler);
	}
	unregister(channel) {
		this.handlers.delete(channel);
	}
	clear() {
		this.handlers.clear();
		this.commandIdDedup.clear();
	}
	/**
	* 本地直调已注册的 handler（基座 spec §5.11.2）。
	*
	* - envelope pack + unpack（同源验签解密；防内部代码注入 / I-6）
	* - commandId 跨 source 去重
	* - 微任务异步派发（不阻塞调用方 / I-D）
	* - handler 抛错不传播到 send Promise reject（I-E）
	*/
	async dispatch(channel, payload, opts, sourceSpanId) {
		const handler = this.handlers.get(channel);
		if (!handler) {
			this.log.debug("[local-dispatch] short-circuit: handler missing", { channel });
			throw new Error(`[channel-sdk] executor handler not registered: ${channel}`);
		}
		const encKey = this.credManager.getEncryptionKey(channel);
		const sigKey = this.credManager.getSigningKey(channel);
		if (!encKey || !sigKey) throw new Error(`[channel-sdk] no key for channel: ${channel}`);
		const envelopes = await pack(payload, encKey, sigKey, this.credManager.getKeyVersion(), {
			eventId: opts?.eventId,
			seq: opts?.seq,
			senderDeviceId: this.deviceId,
			traceId: opts?.traceId,
			spanId: sourceSpanId,
			sampled: opts?.sampled,
			traceOperation: opts?.traceOperation
		});
		const firstEnv = envelopes[0];
		if (!firstEnv) return;
		const verifyKeyVersion = this.credManager.getKeyVersion();
		queueMicrotask(async () => {
			try {
				const decryptedPayload = await unpack(envelopes, encKey, sigKey);
				const commandId = extractCommandId(decryptedPayload);
				if (commandId) {
					if (this.commandIdDedup.has(commandId)) {
						this.log.debug("[local-dispatch] short-circuit: duplicate commandId", {
							channel,
							commandId
						});
						return;
					}
					this.commandIdDedup.add(commandId);
				}
				handler(decryptedPayload, {
					eventId: firstEnv.eventId,
					seq: firstEnv.seq,
					ts: firstEnv.ts,
					msgId: firstEnv.msgId,
					keyVersion: verifyKeyVersion,
					senderDeviceId: firstEnv.senderDeviceId,
					source: "local",
					traceId: firstEnv.traceId,
					spanId: firstEnv.spanId,
					sampled: firstEnv.traceFlags === "01",
					traceOperation: normalizeTraceOperation(firstEnv.traceOperation)
				});
			} catch (err) {
				this.log.debug("[local-dispatch] short-circuit: handler threw", {
					channel,
					err: describeError(err)
				});
			}
		});
	}
};
var DEFAULT_OUTBOX_MAX_ITEMS = 500;
var DEFAULT_OUTBOX_MAX_ITEM_AGE_MS = 3e4;
var Outbox = class {
	constructor(cfg) {
		this.q = [];
		this.maxItems = cfg?.maxItems ?? DEFAULT_OUTBOX_MAX_ITEMS;
		this.maxItemAgeMs = cfg?.maxItemAgeMs ?? DEFAULT_OUTBOX_MAX_ITEM_AGE_MS;
		this.onDrop = cfg?.onDrop;
		this.onFlushFailure = cfg?.onFlushFailure;
		this.metrics = cfg?.metrics;
		this.log = cfg?.logger ?? noopLogger;
	}
	/** 当前缓冲深度。 */
	get size() {
		return this.q.length;
	}
	/** 入队一条；超过 maxItems 时淘汰最旧。 */
	enqueue(item) {
		this.q.push(item);
		while (this.q.length > this.maxItems) {
			const dropped = this.q.shift();
			if (dropped) this.drop(dropped, "overflow");
		}
	}
	/**
	* flush 所有未超龄条目：按 FIFO 交给 send（SdkImpl 内部用 serialSend 保序）。
	*
	* @param send 由 SdkImpl 提供，将 item 重放到在线发送路径（cfPublish / serialSend），返回其 Promise。
	*   - 跨 queueKey 并行发起（同一 queueKey 的顺序由 serialSend 链保证）；
	*   - 每条的成败被本方法感知：**失败不重入队**（避免破坏保序 + 无限重试），只记指标 + 日志 + 触发
	*     onFlushFailure，交由业务/接收端补偿（convmsg 可由 seq gap 补齐）。
	* @returns 所有 dispatched 条目均 settle 后 resolve（便于测试/调用方 await；调用方也可 fire-and-forget）。
	*/
	flush(send) {
		if (this.q.length === 0) return Promise.resolve();
		const now = Date.now();
		const items = this.q;
		this.q = [];
		const pending = [];
		for (const it of items) {
			if (now - it.enqueuedAt > this.maxItemAgeMs) {
				this.drop(it, "expired");
				continue;
			}
			const p = Promise.resolve().then(() => send(it)).catch((err) => this.onFlushFailed(it, err));
			pending.push(p);
		}
		this.log.debug("[outbox] flush dispatched", {
			dispatched: pending.length,
			expired: items.length - pending.length
		});
		return Promise.allSettled(pending).then(() => void 0);
	}
	/** 清空缓冲（close 时调用）。 */
	clear() {
		this.q = [];
	}
	/** flush 阶段单条 publish 失败：仅记指标 + 日志 + 通知业务，**不重入队**（保序 + 防死循环）。 */
	onFlushFailed(item, err) {
		this.metrics?.inc(METRIC.outboxFlushFailedTotal, { channelScope: channelScopeOf(item.channel) });
		this.log.info("[outbox] flush send failed (dropped, not re-enqueued)", {
			channel: item.channel,
			eventId: item.opts.eventId,
			err: String(err)
		});
		if (this.onFlushFailure) try {
			this.onFlushFailure({
				channel: item.channel,
				eventId: item.opts.eventId ?? ""
			}, err);
		} catch {}
	}
	drop(item, reason) {
		this.metrics?.inc(METRIC.outboxDroppedTotal, { reason });
		this.log.info("[outbox] dropped", {
			channel: item.channel,
			reason
		});
		if (this.onDrop) try {
			this.onDrop({
				channel: item.channel,
				eventId: item.opts.eventId ?? ""
			}, reason);
		} catch {}
	}
};
var DEFAULT_PUBLISH_TIMEOUT_MS = 5e3;
var DEFAULT_PUBLISH_RETRY = {
	attempts: 3,
	backoffMs: 200
};
var DEFAULT_RATE_LIMIT_BACKOFF_MS = 300;
var DEFAULT_RATE_LIMIT_MAX_RETRIES = 2;
async function publishEnvelopeToAPISIX(envelope, opts) {
	const timeoutMs = opts.timeoutMs ?? DEFAULT_PUBLISH_TIMEOUT_MS;
	const retry = opts.retry ?? DEFAULT_PUBLISH_RETRY;
	const retryOnRateLimited = opts.retryOnRateLimited ?? true;
	const rateLimitBackoffMs = opts.rateLimitBackoffMs ?? DEFAULT_RATE_LIMIT_BACKOFF_MS;
	const rateLimitMaxRetries = opts.rateLimitMaxRetries ?? DEFAULT_RATE_LIMIT_MAX_RETRIES;
	const log = opts.logger ?? noopLogger;
	const fetchImpl = opts.fetchImpl ?? fetch;
	let lastErr;
	let attempt = 0;
	let rateLimitRetries = 0;
	let nextDelayMs = 0;
	for (;;) {
		if (nextDelayMs > 0) {
			await sleep2(nextDelayMs);
			nextDelayMs = 0;
		}
		try {
			await doSinglePublish(envelope, opts, timeoutMs, fetchImpl);
			return;
		} catch (err) {
			lastErr = err instanceof Error ? err : new Error(String(err));
			if (err instanceof ChSdkParamError || err instanceof ChSdkAuthError || err instanceof ChSdkPayloadTooLargeError) throw err;
			if (err instanceof ChSdkRateLimitedError) {
				if (!retryOnRateLimited || rateLimitRetries >= rateLimitMaxRetries) break;
				rateLimitRetries++;
				nextDelayMs = rateLimitBackoffMs;
				log.info("[publish] rate limited, retry after fixed delay", {
					rateLimitRetries,
					maxRetries: rateLimitMaxRetries,
					delayMs: nextDelayMs
				});
				continue;
			}
			if (attempt >= retry.attempts) break;
			attempt++;
			nextDelayMs = computeRetryBackoff(retry.backoffMs, attempt);
			log.debug("[publish] attempt failed (will retry)", {
				attempt,
				delayMs: nextDelayMs,
				err: lastErr.message
			});
		}
	}
	log.info("[publish] retries exhausted", {
		err: lastErr?.message,
		attempt,
		rateLimitRetries
	});
	if (lastErr instanceof ChSdkRateLimitedError) throw lastErr;
	throw new ChSdkReconnectExhaustedError(`[publish] retries exhausted: ${lastErr?.message ?? "unknown"}`);
}
async function doSinglePublish(envelope, opts, timeoutMs, fetchImpl) {
	const ac = new AbortController();
	const timer = setTimeout(() => ac.abort(), timeoutMs);
	try {
		const requestBody = JSON.stringify({
			channel: opts.channel,
			data: envelope
		});
		const headers = {
			"Content-Type": "application/json",
			"X-Channel": opts.channel,
			"X-Channel-Scope": deriveChannelScope(opts.channel)
		};
		if (opts.userId) headers["X-User-Id"] = opts.userId;
		if (opts.publishToken) headers.Authorization = `Bearer ${opts.publishToken}`;
		if (opts.traceId || envelope.traceId) {
			const traceId = normalizeTraceId(opts.traceId ?? envelope.traceId);
			const spanId = /^[0-9a-f]{16}$/i.test(opts.parentSpanId ?? "") ? opts.parentSpanId.toLowerCase() : generateSpanId();
			const sampled = opts.sampled ?? (envelope.traceFlags ? sampledFromTraceFlags(envelope.traceFlags, traceId) : resolveTraceSampled(traceId));
			headers.traceparent = `00-${traceId}-${spanId}-${traceFlags(sampled)}`;
			headers["X-B3-TraceId"] = traceId;
			headers["X-B3-SpanId"] = spanId;
			headers["X-B3-Sampled"] = sampled ? "1" : "0";
			headers["x-trace-id"] = traceId;
		}
		const resp = await fetchImpl(opts.url, {
			method: "POST",
			headers,
			body: requestBody,
			signal: ac.signal
		});
		if (resp.ok) {
			const cfErr = await readCentrifugoError(resp);
			if (cfErr) {
				if (cfErr.code === 102 || cfErr.code === 103 || cfErr.code === 109) throw new ChSdkAuthError(`[publish] centrifugo error code=${cfErr.code} channel=${opts.channel}: ${cfErr.message}`);
				throw new ChSdkParamError(`[publish] centrifugo error code=${cfErr.code} channel=${opts.channel}: ${cfErr.message}`);
			}
			return;
		}
		const text = await safeReadText(resp);
		const status = resp.status;
		if (status === 401 || status === 403) throw new ChSdkAuthError(`[publish] HTTP ${status} channel=${opts.channel}: ${text}`);
		if (status === 413) throw new ChSdkPayloadTooLargeError(`[publish] HTTP 413 channel=${opts.channel}: ${text}`);
		if (status === 429) {
			const ra = resp.headers.get("Retry-After");
			throw new ChSdkRateLimitedError(`[publish/apisix] HTTP 429 channel=${opts.channel} retry_after=${ra ?? "none"}: ${text}`);
		}
		if (status >= 400 && status < 500) throw new ChSdkParamError(`[publish] HTTP ${status} channel=${opts.channel}: ${text}`);
		throw new Error(`[publish] HTTP ${status} channel=${opts.channel}: ${text}`);
	} finally {
		clearTimeout(timer);
	}
}
async function safeReadText(resp) {
	try {
		return (await resp.text()).slice(0, 256);
	} catch {
		return "<read body failed>";
	}
}
function deriveChannelScope(channel) {
	const idx = channel.indexOf(":");
	return idx > 0 ? channel.slice(0, idx) : channel;
}
async function readCentrifugoError(resp) {
	try {
		const json = await resp.json();
		if (json && typeof json === "object") {
			const err = json.error;
			if (err && typeof err === "object") {
				const code = err.code;
				const message = err.message;
				if (typeof code === "number" && code !== 0) return {
					code,
					message: typeof message === "string" ? message : "unknown"
				};
			}
		}
		return null;
	} catch {
		return null;
	}
}
function computeRetryBackoff(backoffMs, attempt) {
	return backoffMs * Math.pow(2, attempt - 1);
}
function sleep2(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
var BATCH_MARKER = "__chsdkBatch";
var BATCH_CONTAINER_VERSION = 1;
var SUPPORTED_BATCH_VERSION = 1;
function isBatchContainer(payload) {
	if (typeof payload !== "object" || payload === null) return false;
	const obj = payload;
	return typeof obj[BATCH_MARKER] === "number" && Array.isArray(obj.items);
}
function reconstructItemMeta(item, env) {
	return {
		eventId: item.e,
		seq: item.s,
		msgId: env.msgId,
		ts: item.t,
		keyVersion: env.keyVersion,
		senderDeviceId: env.senderDeviceId,
		conversationId: extractConversationId(item.p),
		traceId: item.tr,
		spanId: item.sp,
		sampled: item.sm,
		traceOperation: normalizeTraceOperation(item.op)
	};
}
function extractConversationId(payload) {
	if (typeof payload !== "object" || payload === null) return;
	const value = payload.conversationId;
	return typeof value === "string" ? value : void 0;
}
var DEFAULT_BATCH_LINGER_MS = 100;
var DEFAULT_STANDALONE_THRESHOLD_BYTES = 8192;
var DEFAULT_MAX_BATCH_BYTES = 32768;
var DEFAULT_MAX_BATCH_ITEMS = 256;
var ConvmsgBatcher = class {
	constructor(cfg, deps) {
		this.q = /* @__PURE__ */ new Map();
		this.lingerMs = cfg.lingerMs ?? DEFAULT_BATCH_LINGER_MS;
		this.standaloneThresholdBytes = cfg.standaloneThresholdBytes ?? DEFAULT_STANDALONE_THRESHOLD_BYTES;
		this.maxBatchBytes = cfg.maxBatchBytes ?? DEFAULT_MAX_BATCH_BYTES;
		this.maxBatchItems = cfg.maxBatchItems ?? DEFAULT_MAX_BATCH_ITEMS;
		this.deps = deps;
		this.metrics = deps.metrics;
		this.log = deps.logger ?? noopLogger;
		this.now = deps.now ?? (() => Date.now());
	}
	/**
	* 入队一条 convmsg send。返回的 Promise 在其所属批（或单独发）publish settle 时 resolve/reject。
	*/
	enqueue(channel, queueKey, finalPayload, opts, traceSpan) {
		const rawBytes = utf8Encode(JSON.stringify(finalPayload)).byteLength;
		const fixedOpts = {
			...opts,
			eventId: opts.eventId ?? generateUUIDv4()
		};
		return new Promise((resolve, reject) => {
			const item = {
				finalPayload,
				opts: fixedOpts,
				rawBytes,
				enqueuedAt: this.now(),
				traceSpan,
				resolve,
				reject
			};
			if (rawBytes >= this.standaloneThresholdBytes) {
				this.flushNow(queueKey, "standalone");
				this.dispatchOne(queueKey, channel, item, "standalone");
				return;
			}
			let st = this.q.get(queueKey);
			if (st && st.items.length > 0 && st.accBytes + rawBytes > this.maxBatchBytes) {
				this.flushNow(queueKey, "size");
				st = void 0;
			}
			if (!st) {
				st = {
					channel,
					items: [],
					accBytes: 0
				};
				this.q.set(queueKey, st);
			}
			st.items.push(item);
			st.accBytes += rawBytes;
			if (st.items.length === 1) st.lingerTimer = setTimeout(() => this.flushNow(queueKey, "linger"), this.lingerMs);
			if (st.items.length >= this.maxBatchItems) this.flushNow(queueKey, "items");
		});
	}
	/** flush 指定 queueKey 当前缓冲。 */
	flushNow(queueKey, trigger = "linger") {
		const st = this.q.get(queueKey);
		if (!st || st.items.length === 0) return;
		if (st.lingerTimer) {
			clearTimeout(st.lingerTimer);
			st.lingerTimer = void 0;
		}
		const { items, channel, accBytes } = st;
		this.q.delete(queueKey);
		const scope = channelScopeOf(channel);
		const flushedAt = this.now();
		const lags = items.map((it) => Math.max(0, flushedAt - it.enqueuedAt));
		const maxLag = lags.reduce((a, v) => Math.max(a, v), 0);
		const avgLag = lags.reduce((s, v) => s + v, 0) / lags.length;
		this.metrics?.observe(METRIC.convmsgBatchAddedLatencyMaxMs, maxLag, { channelScope: scope });
		this.metrics?.observe(METRIC.convmsgBatchAddedLatencyAvgMs, avgLag, { channelScope: scope });
		if (items.length === 1) {
			this.dispatchOne(queueKey, channel, items[0], "single");
			return;
		}
		const container = {
			[BATCH_MARKER]: BATCH_CONTAINER_VERSION,
			items: items.map(toBatchItem)
		};
		this.metrics?.inc(METRIC.convmsgBatchFlushTotal, {
			trigger,
			channelScope: scope
		});
		this.metrics?.observe(METRIC.convmsgBatchItemsPerFlush, items.length, { channelScope: scope });
		this.metrics?.observe(METRIC.convmsgBatchBytesPerFlush, accBytes, { channelScope: scope });
		this.metrics?.inc(METRIC.convmsgBatchPublishSavedTotal, { channelScope: scope }, items.length - 1);
		this.log.debug("[batcher] flush", {
			queueKey,
			items: items.length,
			bytes: accBytes,
			trigger
		});
		const batchTraceSpan = mergeBatchSendTraceSpans(items.map((it) => it.traceSpan).filter((span) => span !== void 0));
		const batchAttrs = {
			"send.route": "convmsg-batch",
			"send.batch_items": items.length,
			"send.batch_bytes": accBytes,
			"send.batch_trigger": trigger
		};
		this.deps.publish(queueKey, channel, container, {}, batchTraceSpan).then(() => {
			batchTraceSpan?.success(batchAttrs);
			for (const it of items) it.resolve();
		}, (err) => {
			batchTraceSpan?.error(err, batchAttrs);
			for (const it of items) it.reject(err);
		});
	}
	/** flush 所有 queueKey（close / 主动 flush 用）。 */
	flushAll(trigger = "close") {
		for (const key of Array.from(this.q.keys())) this.flushNow(key, trigger);
	}
	/** 单条发送（standalone 大 payload / 单条批），用条目自身 opts。 */
	dispatchOne(queueKey, channel, item, trigger) {
		this.metrics?.inc(METRIC.convmsgBatchFlushTotal, {
			trigger,
			channelScope: channelScopeOf(channel)
		});
		this.deps.publish(queueKey, channel, item.finalPayload, item.opts, item.traceSpan).then(() => {
			item.traceSpan?.success({ "send.route": "convmsg-batch" });
			item.resolve();
		}, (err) => {
			item.traceSpan?.error(err, { "send.route": "convmsg-batch" });
			item.reject(err);
		});
	}
};
function toBatchItem(it) {
	const item = {
		e: it.opts.eventId,
		t: it.enqueuedAt,
		p: it.finalPayload
	};
	if (typeof it.opts.seq === "number") item.s = it.opts.seq;
	if (it.opts.traceId) item.tr = it.opts.traceId;
	if (it.traceSpan?.spanId) item.sp = it.traceSpan.spanId;
	if (it.opts.sampled !== void 0) item.sm = it.opts.sampled;
	if (it.opts.traceOperation !== void 0) item.op = it.opts.traceOperation;
	return item;
}
var DEFAULT_CONNECTIONS = 16;
var DEFAULT_KEEPALIVE_TIMEOUT_MS = 3e4;
function isNodeRuntime() {
	return typeof process !== "undefined" && !!process.versions?.node && typeof fetch === "function";
}
async function createKeepAliveFetch(opts = {}) {
	const log = opts.logger ?? noopLogger;
	if (opts.enabled === false || !isNodeRuntime()) return;
	try {
		const mod = await import("undici");
		if (!mod.Agent) return;
		const keepAliveTimeout = opts.keepAliveTimeoutMs ?? DEFAULT_KEEPALIVE_TIMEOUT_MS;
		const dispatcher = new mod.Agent({
			connections: opts.connections ?? DEFAULT_CONNECTIONS,
			keepAliveTimeout,
			keepAliveMaxTimeout: keepAliveTimeout * 2,
			pipelining: 1
		});
		log.debug("[keepalive] undici agent ready", { connections: opts.connections ?? DEFAULT_CONNECTIONS });
		return ((input, init) => fetch(input, {
			...init ?? {},
			dispatcher
		}));
	} catch (err) {
		log.debug("[keepalive] disabled (undici unavailable), fallback to global fetch", { err: String(err) });
		return;
	}
}
function handleBatchContainer(container, env, deps) {
	const log = deps.logger ?? noopLogger;
	const now = deps.now ?? (() => Date.now());
	const scope = channelScopeOf(deps.channel);
	let delivered = 0;
	let deduped = 0;
	let filtered = 0;
	const deliveredLags = [];
	for (const item of container.items) {
		if (!item || typeof item.e !== "string") continue;
		if (deps.dedup.has(item.e)) {
			deduped++;
			deps.metrics.inc(METRIC.recvBatchDedupDroppedTotal, {
				clientType: deps.clientType,
				channelScope: scope
			});
			continue;
		}
		deps.dedup.add(item.e);
		if (deps.sinceSeq !== void 0 && typeof item.s === "number" && item.s <= deps.sinceSeq) {
			filtered++;
			continue;
		}
		const meta = reconstructItemMeta(item, env);
		deliveredLags.push(Math.max(0, now() - item.t));
		try {
			deps.handler(item.p, meta);
			delivered++;
		} catch (handlerErr) {
			log.debug("[recv] batch item handler threw", {
				channel: deps.channel,
				err: String(handlerErr)
			});
		}
	}
	if (deliveredLags.length > 0) {
		const maxLag = deliveredLags.reduce((a, v) => Math.max(a, v), 0);
		const avgLag = deliveredLags.reduce((s, v) => s + v, 0) / deliveredLags.length;
		deps.metrics.observe(METRIC.recvBatchLagMaxMs, maxLag, {
			clientType: deps.clientType,
			channelScope: scope
		});
		deps.metrics.observe(METRIC.recvBatchLagAvgMs, avgLag, {
			clientType: deps.clientType,
			channelScope: scope
		});
	}
	deps.metrics.inc(METRIC.recvBatchItemsTotal, {
		clientType: deps.clientType,
		channelScope: scope
	}, delivered);
	return {
		delivered,
		deduped,
		filtered
	};
}
var RING_BUFFER_SWEEP_INTERVAL_MS = 5e3;
var RECV_SLOW_THRESHOLD_MS = 50;
function recv(deps, call) {
	const { channel, handler, opts } = call;
	const log = deps.logger ?? noopLogger;
	const metrics = deps.metrics ?? new Metrics();
	const scope = channelScopeOf(channel);
	const clientType = deps.clientType ?? "desktop";
	const subscribeTrace = new ChannelTraceRecorder(deps.traceReporter, "recv", "channel_sdk.recv.subscribe", opts?.traceId, {
		"channel.scope": scope,
		"channel.client_type": clientType
	}, opts?.parentSpanId, opts?.sampled);
	subscribeTrace.addEvent("recv.subscribe.start");
	const sinceSeq = opts?.sinceSeq;
	const token = deps.getSubscriptionToken(channel);
	if (token === null) {
		const error = {
			code: "CH_SDK_4031",
			message: `[recv] no subscription token for channel: ${channel}`,
			channel
		};
		opts?.onError?.(error);
		subscribeTrace.error(error);
		return () => void 0;
	}
	const ringBuffer = new RingBuffer();
	const batchDedup = new DedupCache();
	let cancelled = false;
	const sweepTimer = setInterval(() => {
		const expired = ringBuffer.cleanupExpired();
		for (const msgId of expired) opts?.onError?.({
			code: "CH_SDK_5001",
			message: `[recv] split timeout: msgId=${msgId} channel=${channel}`,
			channel,
			cause: new ChSdkSplitTimeoutError(`msgId=${msgId} split timeout`)
		});
	}, RING_BUFFER_SWEEP_INTERVAL_MS);
	const sub = deps.transport.newSubscription({
		channel,
		token,
		getToken: token !== "" ? (async () => {
			return (deps.getFreshSubscriptionToken ? await deps.getFreshSubscriptionToken(channel) : deps.getSubscriptionToken(channel)) ?? "";
		}) : void 0
	});
	sub.onPublication((pub) => {
		if (cancelled) return;
		let messageTrace;
		let env;
		try {
			env = pub.data;
			if (!env || typeof env !== "object" || env.v !== 1) throw new Error("invalid envelope shape");
			const expectedTraceId = opts?.traceId ? normalizeTraceId(opts.traceId) : void 0;
			const envelopeTraceId = env.traceId ? normalizeTraceId(env.traceId) : void 0;
			const sampled = expectedTraceId ? opts?.sampled : envelopeTraceId ? sampledFromTraceFlags(env.traceFlags, envelopeTraceId) : void 0;
			const parentSpanId = expectedTraceId && envelopeTraceId !== expectedTraceId ? opts?.parentSpanId : env.spanId ?? opts?.parentSpanId;
			messageTrace = new ChannelTraceRecorder(deps.traceReporter, "recv", "channel_sdk.recv.message", expectedTraceId ?? envelopeTraceId, {
				"channel.scope": scope,
				"channel.client_type": clientType,
				"message.parts": env.partTotal
			}, parentSpanId, sampled);
			messageTrace.addEvent("ws.publication.received");
		} catch (err) {
			log.debug("[recv] invalid envelope shape", {
				channel,
				err: String(err)
			});
			return;
		}
		const now = Date.now();
		if (Math.abs(now - env.ts) > MAX_CLOCK_DRIFT_MS) {
			log.debug("[recv] clock drift exceeded", {
				channel,
				ts: env.ts,
				now
			});
			messageTrace.error(/* @__PURE__ */ new Error("clock drift exceeded"));
			return;
		}
		metrics.observe(METRIC.envelopeSizeBytes, env.ciphertext?.length ?? 0, { direction: "subscribe" });
		if (sinceSeq !== void 0 && typeof env.seq === "number" && env.seq <= sinceSeq) {
			log.debug("[recv] skip by sinceSeq", {
				channel,
				seq: env.seq,
				sinceSeq
			});
			return;
		}
		const encKey = deps.getEncryptionKey(channel);
		const sigKey = deps.getSigningKey(channel);
		if (!encKey || !sigKey) {
			log.info("[recv] drop: no key for channel", {
				channel,
				envKeyVersion: env.keyVersion,
				hint: "check credentials scopes / keyVersion rotation"
			});
			opts?.onError?.({
				code: "CH_SDK_4031",
				message: `[recv] no key for scope: ${channel}`,
				channel
			});
			messageTrace.error(/* @__PURE__ */ new Error("no key for channel"));
			return;
		}
		const result = ringBuffer.add(env);
		if (result.dropReason) {
			log.debug("[recv] envelope dropped", {
				channel,
				reason: result.dropReason
			});
			opts?.onError?.({
				code: "CH_SDK_4221",
				message: `[recv] envelope dropped: ${result.dropReason} channel=${channel}`,
				channel,
				cause: new ChSdkSignatureError(`drop ${result.dropReason}`)
			});
			messageTrace.error(new Error(result.dropReason));
			return;
		}
		if (!result.complete) {
			messageTrace.addEvent("envelope.part.buffered", { "envelope.part_index": env.partIndex });
			messageTrace.success({ "recv.outcome": "buffered" });
			return;
		}
		if (result.complete.length > 1) metrics.inc(METRIC.splitTotal, {
			clientType,
			channelScope: scope
		});
		const processStartMs = Date.now();
		messageTrace.addEvent("envelope.unpack.start");
		unpack(result.complete, encKey, sigKey).then((payload) => {
			if (cancelled) return;
			messageTrace.addEvent("envelope.unpack.end", { "envelope.duration_ms": Date.now() - processStartMs });
			if (isBatchContainer(payload)) {
				const ver = payload[BATCH_MARKER];
				if (ver > SUPPORTED_BATCH_VERSION) {
					log.info("[recv] unsupported batch version, dropped", {
						channel,
						ver
					});
					opts?.onError?.({
						code: "CH_SDK_5050",
						message: `[recv] unsupported batch container version ${ver} channel=${channel}`,
						channel
					});
					messageTrace.error(/* @__PURE__ */ new Error(`unsupported batch version ${ver}`));
					return;
				}
				const res = handleBatchContainer(payload, env, {
					handler,
					sinceSeq,
					dedup: batchDedup,
					metrics,
					clientType,
					channel,
					logger: log,
					onError: opts?.onError
				});
				messageTrace.success({
					"recv.outcome": "delivered_batch",
					"recv.batch_items": res.delivered,
					"recv.batch_deduped": res.deduped
				});
				return;
			}
			metrics.observe(METRIC.recvLagMs, Math.max(0, Date.now() - env.ts), {
				clientType,
				channelScope: scope
			});
			const meta = {
				eventId: env.eventId,
				seq: env.seq,
				msgId: env.msgId,
				ts: env.ts,
				keyVersion: env.keyVersion,
				senderDeviceId: env.senderDeviceId,
				traceId: env.traceId ? normalizeTraceId(env.traceId) : void 0,
				spanId: env.spanId,
				sampled: env.traceId ? sampledFromTraceFlags(env.traceFlags, normalizeTraceId(env.traceId)) : void 0,
				traceOperation: normalizeTraceOperation(env.traceOperation),
				conversationId: extractConversationId2(payload)
			};
			try {
				messageTrace.addEvent("handler.invoke.start");
				handler(payload, meta);
				messageTrace.addEvent("handler.invoke.end", { "handler.outcome": "success" });
			} catch (handlerErr) {
				log.debug("[recv] handler threw", {
					channel,
					err: String(handlerErr)
				});
				messageTrace.addEvent("handler.invoke.end", { "handler.outcome": "error" });
				messageTrace.error(handlerErr);
				return;
			}
			messageTrace.success({
				"recv.lag_ms": Math.max(0, Date.now() - env.ts),
				"recv.outcome": "delivered"
			});
			const elapsedMs = Date.now() - processStartMs;
			if (elapsedMs >= RECV_SLOW_THRESHOLD_MS) log.debug("[recv] slow processing", {
				channel,
				parts: result.complete.length,
				elapsedMs
			});
		}).catch((unpackErr) => {
			const emsg = describeError3(unpackErr);
			const kind = emsg.includes("HMAC verify failed") ? "sig_invalid" : "decrypt_fail";
			deps.security?.record(kind, channel, env.keyVersion);
			log.info("[recv] unpack failed", {
				channel,
				kind,
				envKeyVersion: env.keyVersion,
				localKeyVersion: deps.getKeyVersion?.(),
				senderDeviceId: env.senderDeviceId,
				err: emsg
			});
			opts?.onError?.({
				code: "CH_SDK_4221",
				message: `[recv] unpack failed: ${emsg} channel=${channel}`,
				channel,
				keyVersion: env.keyVersion,
				cause: unpackErr instanceof Error ? unpackErr : new Error(String(unpackErr))
			});
			messageTrace.error(unpackErr);
		});
	});
	sub.onError((subErr) => {
		if (cancelled) return;
		const code = mapSubErrorCode(subErr.code);
		if (code === "CH_SDK_4221") deps.security?.record("sig_invalid", channel);
		opts?.onError?.({
			code,
			message: `[recv] subscription error: ${subErr.message} (cf_code=${subErr.code}) channel=${channel}`,
			channel
		});
		const errorTrace = new ChannelTraceRecorder(deps.traceReporter, "recv", "channel_sdk.recv.error", opts?.traceId, {
			"channel.scope": scope,
			"channel.client_type": clientType,
			"subscription.code": code
		}, opts?.parentSpanId, opts?.sampled);
		errorTrace.addEvent("ws.subscription.error");
		errorTrace.error(subErr);
	});
	sub.onSubscribed?.((ctx) => {
		if (cancelled) return;
		log.debug("[recv] subscribed", {
			channel,
			wasRecovering: ctx.wasRecovering,
			recovered: ctx.recovered
		});
		if (ctx.wasRecovering && !ctx.recovered) {
			metrics.inc(METRIC.recoveryGapTotal, {
				clientType,
				channelScope: scope
			});
			log.info("[recv] recovery gap detected (recovered=false after reconnect)", { channel });
			opts?.onRecoveryGap?.({ channel });
		}
	});
	log.debug("[recv] subscribing", {
		channel,
		sinceSeq
	});
	try {
		sub.subscribe();
		subscribeTrace.addEvent("recv.subscribe.dispatched");
		subscribeTrace.success();
	} catch (error) {
		subscribeTrace.error(error);
		throw error;
	}
	return () => {
		if (cancelled) return;
		cancelled = true;
		clearInterval(sweepTimer);
		try {
			sub.unsubscribe();
			log.debug("[recv] unsubscribed", { channel });
		} catch (err) {
			log.debug("[recv] unsubscribe threw", {
				channel,
				err: String(err)
			});
		}
		ringBuffer.clear();
		batchDedup.clear();
	};
}
function mapSubErrorCode(cfCode) {
	if (cfCode === 4031 || cfCode === 4503) return "CH_SDK_4031";
	if (cfCode === 4292) return "CH_SDK_4292";
	if (cfCode === 4221) return "CH_SDK_4221";
	return "CH_SDK_5050";
}
function describeError3(err) {
	if (err instanceof Error) return err.message;
	return String(err);
}
function extractConversationId2(payload) {
	if (typeof payload !== "object" || payload === null) return;
	const value = payload.conversationId;
	return typeof value === "string" ? value : void 0;
}
async function request(deps, commandChannel, payload, opts) {
	const traceId = normalizeTraceId(opts?.traceId);
	const traceSpan = new ChannelTraceRecorder(deps.traceReporter, "request", "channel_sdk.request", traceId, { "channel.scope": commandChannel.split(":", 1)[0] || "unknown" }, opts?.parentSpanId, opts?.sampled);
	traceSpan.addEvent("request.start");
	const requestId = generateUUIDv4();
	const replyChannel = `reply:${requestId}#${deps.userId}`;
	const startTs = Date.now();
	let publishedAt = null;
	const log = deps.logger ?? noopLogger;
	if (payload != null && typeof payload === "object") {
		const obj = payload;
		if ("requestId" in obj || "replyChannel" in obj) {
			const error = new ChSdkParamError("[request] payload contains reserved field requestId or replyChannel");
			traceSpan.error(error, { "request.phase": "validate" });
			throw error;
		}
	}
	const timeoutMs = opts?.timeoutMs ?? 3e4;
	let unsub = () => void 0;
	let unsubscribed = false;
	const safeUnsub = () => {
		if (unsubscribed) return;
		unsubscribed = true;
		try {
			unsub();
		} catch {}
	};
	const replyPromise = new Promise((resolve, reject) => {
		traceSpan.addEvent("request.reply_subscribe.start");
		unsub = recv(deps, {
			channel: replyChannel,
			handler: (replyPayload, meta) => {
				safeUnsub();
				traceSpan.addEvent("request.reply.received", { "request.rtt_ms": Date.now() - startTs });
				log.debug("[request] reply received", {
					commandChannel,
					requestId,
					rttMs: Date.now() - startTs
				});
				resolve({
					payload: replyPayload,
					meta
				});
			},
			opts: {
				traceId,
				parentSpanId: traceSpan.spanId,
				sampled: traceSpan.sampled,
				onError: (err) => {
					safeUnsub();
					log.info("[request] reply subscription error", {
						commandChannel,
						replyChannel,
						requestId,
						code: err.code,
						err: err.message
					});
					reject(err.cause ?? new Error(err.message));
				}
			}
		});
		traceSpan.addEvent("request.reply_subscribe.end");
	});
	const fullPayload = {
		...payload,
		requestId,
		replyChannel
	};
	let timeoutTimer;
	const timeoutPromise = new Promise((_, reject) => {
		const remaining = Math.max(timeoutMs - (Date.now() - startTs), 1);
		timeoutTimer = setTimeout(() => {
			const phase = publishedAt == null ? "publish_pending" : "awaiting_reply";
			traceSpan.addEvent("request.timeout", { "request.phase": phase });
			log.info("[request] timeout", {
				commandChannel,
				requestId,
				phase,
				timeoutMs,
				elapsedMs: Date.now() - startTs
			});
			reject(new ChSdkRequestTimeoutError(`[request] timeout phase=${phase} requestId=${requestId}`, {
				requestId,
				phase,
				publishedAt,
				elapsedMs: Date.now() - startTs
			}));
		}, remaining);
		if (opts?.signal) {
			const onAbort = () => {
				traceSpan.addEvent("request.abort");
				reject(/* @__PURE__ */ new Error("AbortError"));
			};
			if (opts.signal.aborted) onAbort();
			else opts.signal.addEventListener("abort", onAbort, { once: true });
		}
	});
	const publishOutcome = deps.send(commandChannel, fullPayload, {
		eventId: opts?.eventId,
		retry: opts?.retry,
		signal: opts?.signal,
		traceId,
		parentSpanId: traceSpan.spanId,
		sampled: traceSpan.sampled,
		traceOperation: "request"
	}).then(() => {
		publishedAt = Date.now();
		traceSpan.addEvent("request.publish.end", {
			"publish.outcome": "success",
			"publish.duration_ms": publishedAt - startTs
		});
		return new Promise(() => void 0);
	}, (err) => {
		traceSpan.addEvent("request.publish.end", {
			"publish.outcome": "error",
			"publish.duration_ms": Date.now() - startTs
		});
		throw err;
	});
	traceSpan.addEvent("request.publish.start");
	try {
		const result = await Promise.race([
			replyPromise,
			publishOutcome,
			timeoutPromise
		]);
		traceSpan.success({ "request.duration_ms": Date.now() - startTs });
		return result;
	} catch (error) {
		traceSpan.error(error, { "request.duration_ms": Date.now() - startTs });
		throw error;
	} finally {
		if (timeoutTimer) clearTimeout(timeoutTimer);
		safeUnsub();
	}
}
var DEFAULT_CONVMSG_MIN_PUBLISH_INTERVAL_MS = 40;
var SdkImpl = class {
	constructor(deps) {
		this.subscriptions = /* @__PURE__ */ new Set();
		/**
		* per-conversation 串行发送 Promise 链。
		*
		* 解决同一会话（conversationId）的并发 send() 导致 HTTP publish 请求竞速、
		* 消息到达 Centrifugo 顺序不可控的问题。
		*
		* key = `${channel}\x00${conversationId}`（同一 convmsg 用户级 channel 下按会话分队列），
		* value = 该会话队尾 Promise。同一会话串行保序，不同会话之间并行、互不阻塞。
		*/
		this.sendQueues = /* @__PURE__ */ new Map();
		/**
		* convmsg per-channel 发送节流槽位（方案 A2 下沉到 SDK）：记录每个 convmsg channel 的
		* 下一个可发时刻，对发往 APISIX 的 publish 做匀速限速（token-slot），把回放/突发的瞬时高峰
		* 摊平到 {@link DEFAULT_CONVMSG_MIN_PUBLISH_INTERVAL_MS}，从源头避免打爆 user×scope 限流桶
		* （与 apisix-publish 的 429 固定重试互补：限速预防 + 重试兜底）。
		*/
		this.convmsgNextSlotAt = /* @__PURE__ */ new Map();
		this.closed = false;
		this.transport = deps.transport;
		this.credManager = deps.credManager;
		this.opts = deps.opts;
		this.acpAdapter = deps.acpAdapter;
		this.metrics = deps.metrics ?? new Metrics();
		this.security = deps.security;
		this.log = deps.logger ?? noopLogger;
		this.localDispatch = new LocalDispatch({
			credManager: this.credManager,
			clientType: this.opts.clientType,
			deviceId: this.opts.deviceId,
			logger: this.log
		});
		this.presence = new DevicePresence({
			credManager: this.credManager,
			userId: this.opts.userId,
			deviceId: this.opts.deviceId,
			clientType: this.opts.clientType,
			publishEnvelope: (ch, payload, eventType) => this.cfPublishWithEnvelope(ch, payload, void 0, eventType),
			logger: this.log
		});
		this.presence.start();
		this.supervisor = deps.supervisor;
		const outboxCfg = this.opts.reconnect?.outbox;
		if (this.supervisor && outboxCfg?.enabled !== false) {
			this.outbox = new Outbox({
				maxItems: outboxCfg?.maxItems,
				maxItemAgeMs: outboxCfg?.maxItemAgeMs,
				onDrop: outboxCfg?.onDrop,
				onFlushFailure: outboxCfg?.onFlushFailure,
				metrics: this.metrics,
				logger: this.log
			});
			this.supervisor.addOnlineListener(() => this.flushOutbox());
		}
		if (this.opts.convmsgBatchEnabled !== false) this.convmsgBatcher = new ConvmsgBatcher({
			lingerMs: this.opts.convmsgBatchLingerMs,
			standaloneThresholdBytes: this.opts.convmsgBatchStandaloneThresholdBytes,
			maxBatchBytes: this.opts.convmsgBatchMaxBytes,
			maxBatchItems: this.opts.convmsgBatchMaxItems
		}, {
			publish: (queueKey, channel, payload, opts) => this.serialSend(queueKey, () => this.cfPublishWithEnvelope(channel, payload, opts)),
			metrics: this.metrics,
			logger: this.log
		});
		if (this.opts.publishKeepAliveEnabled !== false) createKeepAliveFetch({
			connections: this.opts.publishKeepAliveConnections,
			logger: this.log
		}).then((f) => {
			if (f && !this.closed) {
				this.keepAliveFetch = f;
				this.log.debug("[client] keep-alive publish dispatcher ready");
			}
		}).catch(() => void 0);
	}
	async send(channel, payload, opts) {
		this.requireOpen();
		const traceId = normalizeTraceId(opts?.traceId);
		const traceSpan = new ChannelTraceRecorder(this.opts.onTrace, "send", "channel_sdk.send", traceId, {
			"channel.scope": channelScopeOf(channel),
			"channel.client_type": this.opts.clientType
		}, opts?.parentSpanId, opts?.sampled);
		const finalOpts = {
			...opts,
			traceId,
			sampled: traceSpan.sampled,
			traceOperation: opts?.traceOperation === void 0 ? deriveSendTraceOperation(channel) : normalizeTraceOperation(opts.traceOperation)
		};
		traceSpan.addEvent("send.start");
		try {
			const finalPayload = ensureConversationIdInPayload(channel, payload, finalOpts.conversationId);
			if (this.acpAdapter && isSessionChannel(channel)) {
				this.log.debug("[client] send route=acp", { channel });
				traceSpan.addEvent("send.route", { route: "acp" });
				await this.acpAdapter.send(channel, finalPayload, finalOpts);
				traceSpan.success({ "send.route": "acp" });
				return;
			}
			if (this.localDispatch.shouldShortCircuit(channel)) {
				this.log.debug("[client] send route=local-short-circuit", { channel });
				traceSpan.addEvent("send.route", { route: "local" });
				await this.localDispatch.dispatch(channel, finalPayload, finalOpts, traceSpan.spanId);
				traceSpan.success({ "send.route": "local" });
				return;
			}
			if (this.outbox && this.supervisor && !this.supervisor.isLogicallyOnline() && !shouldUseWsPublish(channel)) {
				const eventId = finalOpts.eventId ?? generateUUIDv4();
				const queueKey = `${channel}\0${finalOpts.conversationId ?? ""}`;
				this.outbox.enqueue({
					queueKey,
					channel,
					payload: finalPayload,
					opts: {
						...finalOpts,
						eventId
					},
					sendSpanId: traceSpan.spanId,
					enqueuedAt: Date.now()
				});
				this.log.debug("[client] send route=outbox-buffered", {
					channel,
					queueKey,
					eventId,
					depth: this.outbox.size
				});
				traceSpan.addEvent("send.outbox.enqueued", { "outbox.depth": this.outbox.size });
				traceSpan.success({ "send.route": "outbox" });
				return;
			}
			if (channel.startsWith(CONVMSG_SCOPE_PREFIX)) {
				const queueKey = `${channel}\0${finalOpts.conversationId ?? ""}`;
				if (this.convmsgBatcher) {
					this.log.debug("[client] send route=convmsg-batch", {
						channel,
						queueKey
					});
					traceSpan.addEvent("send.route", { route: "convmsg-batch" });
					await this.convmsgBatcher.enqueue(channel, queueKey, finalPayload, finalOpts, traceSpan);
					return;
				}
				this.log.debug("[client] send route=convmsg-serial", {
					channel,
					queueKey
				});
				traceSpan.addEvent("send.route", { route: "convmsg-serial" });
				await this.serialSend(queueKey, () => this.cfPublishWithEnvelope(channel, finalPayload, finalOpts, void 0, traceSpan));
				traceSpan.success({ "send.route": "convmsg-serial" });
				return;
			}
			this.log.debug("[client] send route=direct", { channel });
			traceSpan.addEvent("send.route", { route: "direct" });
			await this.cfPublishWithEnvelope(channel, finalPayload, finalOpts, void 0, traceSpan);
			traceSpan.success({ "send.route": "direct" });
		} catch (error) {
			traceSpan.error(error);
			throw error;
		}
	}
	/**
	* 标准 CF publish 路径（envelope pack + APISIX HTTP / WS 帧）。
	*
	* - `senderDeviceId` 作为通用元数据 always 注入（基座 spec §5.10.3）。
	* - 可选 `eventType`：仅 device presence 上下线场景传入 "device.online" / "device.offline"，
	*   让 agentserver cfpublish 钩子不解密 ciphertext 即可识别事件类型。
	* - device presence channel（`user:*:devices`）走 WS publish 帧以触发 CF publish_proxy 回调；
	*   其它 channel 保持 APISIX HTTP publish。
	* - 全程埋点 send_latency / publish_failure / publish_rate_limited / envelope_size 指标。
	*/
	/**
	* convmsg per-channel 匀速限速（token-slot）：把每次 publish 预约到未来的匀速时间点，
	* 相邻两次至少间隔 {@link DEFAULT_CONVMSG_MIN_PUBLISH_INTERVAL_MS}（可由
	* HandshakeOptions.convmsgMinPublishIntervalMs 覆盖，0 表示关闭）。仅对 convmsg channel 生效。
	*
	* 关键：预约（set nextSlotAt）在 await 之前同步完成，因此并发调用会依次拿到递增槽位，
	* 天然形成匀速队列，无需显式锁。EdgeSync 把大 chunk 切分成的每个 delta 也逐个走此路径，
	* 故该限速能覆盖 agent-cli 层 A2 够不到的「单 chunk 切分瞬时突发」。
	*/
	async acquireConvmsgPublishSlot(channel) {
		if (!channel.startsWith(CONVMSG_SCOPE_PREFIX)) return;
		const interval = this.opts.convmsgMinPublishIntervalMs ?? DEFAULT_CONVMSG_MIN_PUBLISH_INTERVAL_MS;
		if (interval <= 0) return;
		const now = Date.now();
		const slot = Math.max(now, this.convmsgNextSlotAt.get(channel) ?? 0);
		this.convmsgNextSlotAt.set(channel, slot + interval);
		const wait = slot - now;
		if (wait > 0) await new Promise((resolve) => setTimeout(resolve, wait));
	}
	async cfPublishWithEnvelope(channel, payload, opts, eventType, traceSpan, persistedSendSpanId) {
		await this.acquireConvmsgPublishSlot(channel);
		const credentialsStartMs = Date.now();
		traceSpan?.addEvent("credentials.ensure_fresh.start");
		await this.credManager.ensureFresh();
		traceSpan?.addEvent("credentials.ensure_fresh.end", { "credentials.duration_ms": Date.now() - credentialsStartMs });
		const cred = this.credManager.getCurrent();
		if (!cred) {
			this.log.error("[client] publish aborted: credentials not loaded", { channel });
			throw new Error("[channel-sdk] credentials not loaded");
		}
		const encKey = this.credManager.getEncryptionKey(channel);
		const sigKey = this.credManager.getSigningKey(channel);
		if (!encKey || !sigKey) {
			this.log.error("[client] publish aborted: no key for channel", {
				channel,
				scope: channelScopeOf(channel),
				keyVersion: this.credManager.getKeyVersion(),
				hint: "check channel-credentials scopes cover this channel"
			});
			throw new Error(`[channel-sdk] no key for channel: ${channel}`);
		}
		const packStartMs = Date.now();
		traceSpan?.addEvent("envelope.pack.start");
		const envelopes = await pack(payload, encKey, sigKey, this.credManager.getKeyVersion(), {
			eventId: opts?.eventId,
			seq: opts?.seq,
			senderDeviceId: this.opts.deviceId,
			eventType,
			traceId: opts?.traceId,
			spanId: traceSpan?.spanId ?? persistedSendSpanId,
			sampled: opts?.sampled ?? traceSpan?.sampled,
			traceOperation: opts?.traceOperation ?? deriveSendTraceOperation(channel)
		});
		traceSpan?.addEvent("envelope.pack.end", {
			"envelope.parts": envelopes.length,
			"envelope.duration_ms": Date.now() - packStartMs
		});
		let totalBytes = 0;
		for (const env of envelopes) totalBytes += env.ciphertext?.length ?? 0;
		this.metrics.observe(METRIC.envelopeSizeBytes, totalBytes, { direction: "publish" });
		const scope = channelScopeOf(channel);
		const useWs = shouldUseWsPublish(channel);
		const retryOnRateLimited = opts?.retryOnRateLimited ?? true;
		const startMs = Date.now();
		traceSpan?.addEvent(useWs ? "ws.publish.start" : "http.publish.start", { "publish.parts": envelopes.length });
		try {
			if (useWs) for (const env of envelopes) await this.transport.publish(channel, env);
			else for (const env of envelopes) await publishEnvelopeToAPISIX(env, {
				url: cred.apisixPublishUrl,
				channel,
				userId: this.opts.userId,
				publishToken: cred.publishToken,
				timeoutMs: opts?.timeoutMs,
				retry: opts?.retry ? {
					attempts: opts.retry.attempts ?? 3,
					backoffMs: opts.retry.backoffMs ?? 200
				} : void 0,
				retryOnRateLimited,
				rateLimitBackoffMs: opts?.rateLimitBackoffMs,
				rateLimitMaxRetries: opts?.rateLimitMaxRetries,
				logger: this.log,
				traceId: opts?.traceId,
				parentSpanId: traceSpan?.spanId ?? persistedSendSpanId,
				sampled: opts?.sampled ?? traceSpan?.sampled,
				fetchImpl: this.keepAliveFetch
			});
			const elapsedMs = Date.now() - startMs;
			traceSpan?.addEvent(useWs ? "ws.publish.end" : "http.publish.end", {
				"publish.outcome": "success",
				"publish.duration_ms": elapsedMs
			});
			this.metrics.observe(METRIC.sendLatencyMs, elapsedMs, {
				clientType: this.opts.clientType,
				channelScope: scope
			});
			this.log.debug("[client] publish ok", {
				channel,
				scope,
				transport: useWs ? "cf-ws" : "apisix",
				parts: envelopes.length,
				bytes: totalBytes,
				elapsedMs
			});
		} catch (err) {
			const code = err instanceof ChSdkError ? err.code : "unknown";
			this.metrics.inc(METRIC.publishFailureTotal, {
				source: this.opts.clientType,
				errorCode: code
			});
			const elapsedMs = Date.now() - startMs;
			traceSpan?.addEvent(useWs ? "ws.publish.end" : "http.publish.end", {
				"publish.outcome": "error",
				"publish.duration_ms": elapsedMs
			});
			const failMeta = {
				channel,
				scope,
				transport: useWs ? "cf-ws" : "apisix",
				parts: envelopes.length,
				errorCode: code,
				elapsedMs,
				err: err instanceof Error ? err.message : String(err)
			};
			if (code === "CH_SDK_4292") {
				this.metrics.inc(METRIC.publishRateLimitedTotal, {
					layer: useWs ? "cf" : "apisix",
					reason: "rate_limited"
				});
				this.log.info("[client] publish rate limited", failMeta);
			} else this.log.error("[client] publish failed", failMeta);
			throw err;
		}
	}
	/**
	* 将一次 send 操作串入指定 `queueKey` 的 Promise 链，确保同一 key 的 send 按调用顺序完成 publish。
	* convmsg 场景下 queueKey 按 conversationId 划分：同一会话串行保序，不同会话并行、互不阻塞。
	* 前一个 send 失败（reject）不阻断后续 send；链尾 settle 且无后续等待者时自动清理 entry。
	*/
	serialSend(queueKey, fn) {
		const next = (this.sendQueues.get(queueKey) ?? Promise.resolve()).then(fn, fn);
		this.sendQueues.set(queueKey, next);
		next.catch((err) => {
			this.log.debug("[client] serialSend item failed (queue continues)", {
				queueKey,
				err: err instanceof Error ? err.message : String(err)
			});
		});
		next.finally(() => {
			if (this.sendQueues.get(queueKey) === next) this.sendQueues.delete(queueKey);
		});
		return next;
	}
	/**
	* 恢复在线时 flush outbox：把缓冲消息重放到在线发送路径。
	*
	* convmsg 复用 serialSend 的 per-conversation 队列（同一会话保序）；其它 channel 直发。
	* 回调返回发送 Promise，交由 Outbox.flush 感知成败（失败记指标/日志/onFlushFailure，不重入队）；
	* 复用 cfPublishWithEnvelope（非 send），避免重新进入离线判断造成回队死循环。
	*/
	flushOutbox() {
		if (!this.outbox) return;
		this.log.info("[client] flushing outbox on recovered online", { pending: this.outbox.size });
		this.outbox.flush((item) => {
			if (item.channel.startsWith(CONVMSG_SCOPE_PREFIX)) {
				if (this.convmsgBatcher) return this.convmsgBatcher.enqueue(item.channel, item.queueKey, item.payload, item.opts);
				return this.serialSend(item.queueKey, () => this.cfPublishWithEnvelope(item.channel, item.payload, item.opts, void 0, void 0, item.sendSpanId));
			}
			return this.cfPublishWithEnvelope(item.channel, item.payload, item.opts, void 0, void 0, item.sendSpanId);
		}).catch(() => void 0);
	}
	recv(channel, handler, opts) {
		this.requireOpen();
		if (this.acpAdapter && isSessionChannel(channel)) return this.acpRecv(channel, handler, opts);
		if (this.localDispatch.shouldRegisterLocalHandler(channel)) return this.registerLocalHandlerAndCfSubscribe(channel, handler, opts);
		return this.cfRecv(channel, handler, opts);
	}
	/** ACP 适配层订阅包装（统一进入 subscriptions 跟踪集）。 */
	acpRecv(channel, handler, opts) {
		const acpUnsub = this.acpAdapter.recv(channel, handler, opts);
		const wrapped = () => {
			try {
				acpUnsub();
			} catch {}
			this.subscriptions.delete(wrapped);
		};
		this.subscriptions.add(wrapped);
		return wrapped;
	}
	/**
	* CF 订阅 + 本地 handler 表同时挂载（基座 spec §5.11.1）。
	*
	* - CF 订阅：跨设备途径（其它 desktop / web / 小程序 send 到本机时）
	* - 本地 handler 表：同设备途径（本机 send 到本机时由 send 短路本地直调）
	*/
	registerLocalHandlerAndCfSubscribe(channel, handler, opts) {
		const cfUnsub = this.cfRecv(channel, handler, opts);
		this.localDispatch.register(channel, handler);
		const wrapped = () => {
			try {
				cfUnsub();
			} catch {}
			this.localDispatch.unregister(channel);
			this.subscriptions.delete(wrapped);
		};
		this.subscriptions.add(wrapped);
		return wrapped;
	}
	/** 标准 CF 单边订阅。 */
	cfRecv(channel, handler, opts) {
		const unsub = recv({
			transport: this.transport,
			getEncryptionKey: (ch) => this.credManager.getEncryptionKey(ch),
			getSigningKey: (ch) => this.credManager.getSigningKey(ch),
			getKeyVersion: () => this.credManager.getKeyVersion(),
			getSubscriptionToken: (ch) => this.resolveSubToken(ch),
			getFreshSubscriptionToken: async (ch) => {
				await this.credManager.ensureFresh();
				return this.resolveSubToken(ch);
			},
			metrics: this.metrics,
			security: this.security,
			clientType: this.opts.clientType,
			logger: this.log,
			traceReporter: this.opts.onTrace
		}, {
			channel,
			handler,
			opts
		});
		const wrappedUnsub = () => {
			unsub();
			this.subscriptions.delete(wrappedUnsub);
		};
		this.subscriptions.add(wrappedUnsub);
		return wrappedUnsub;
	}
	/**
	* 解析 channel 对应的 subscription token。
	*
	* - **`''` 空字符串** — user-limited channel（含 `#<userId>`），由 connect token 隐式授权，
	*   不需要 per-channel sub token；recv 据此跳过 token 缺失报错，把空 token 透传给 transport。
	* - **非空字符串** — 精确或尾段 wildcard sub token。
	* - **`null`** — 凭据未拉取或 channel 不在签发列表中（recv 据此抛 CH_SDK_4031）。
	*/
	resolveSubToken(channel) {
		if (channel.includes("#")) return "";
		const tokens = this.credManager.getCurrent()?.subscriptionTokens;
		if (!tokens) return null;
		if (tokens[channel]) return tokens[channel];
		const lastColon = channel.lastIndexOf(":");
		if (lastColon > 0) return tokens[channel.slice(0, lastColon + 1) + "*"] ?? null;
		return null;
	}
	async request(commandChannel, payload, opts) {
		this.requireOpen();
		return request({
			transport: this.transport,
			getEncryptionKey: (ch) => this.credManager.getEncryptionKey(ch),
			getSigningKey: (ch) => this.credManager.getSigningKey(ch),
			getSubscriptionToken: (ch) => this.resolveSubToken(ch),
			send: (ch, p, sopts) => this.send(ch, p, sopts),
			userId: this.opts.userId,
			logger: this.log,
			traceReporter: this.opts.onTrace
		}, commandChannel, payload, opts);
	}
	async close() {
		if (this.closed) return;
		this.closed = true;
		this.supervisor?.stop();
		this.outbox?.clear();
		try {
			this.convmsgBatcher?.flushAll();
		} catch {}
		this.presence.stop();
		try {
			await this.presence.publishOffline();
		} catch {}
		for (const unsub of Array.from(this.subscriptions)) try {
			unsub();
		} catch {}
		this.subscriptions.clear();
		this.localDispatch.clear();
		this.sendQueues.clear();
		if (this.acpAdapter) try {
			await this.acpAdapter.closeAll();
		} catch {}
		this.credManager.close();
		try {
			await this.transport.disconnect();
		} catch {}
	}
	requireOpen() {
		if (this.closed) throw new Error("[channel-sdk] sdk is closed");
	}
};
function deriveSendTraceOperation(channel) {
	if (channel.startsWith("reply:")) return "reply";
	if (channel.startsWith(CONVMSG_SCOPE_PREFIX)) return "convmsg";
	return "send";
}
var DEFAULT_GRACE_PERIOD_MS = 3e3;
var DEFAULT_HARD_DISCONNECT_MS = 45e3;
function resolveReconnectTiming(p) {
	const gracePeriodMs = p?.gracePeriodMs ?? DEFAULT_GRACE_PERIOD_MS;
	let hardDisconnectMs = p?.hardDisconnectMs ?? DEFAULT_HARD_DISCONNECT_MS;
	if (hardDisconnectMs < gracePeriodMs) hardDisconnectMs = gracePeriodMs;
	return {
		gracePeriodMs,
		hardDisconnectMs
	};
}
var ConnectionSupervisor = class {
	constructor(deps) {
		/** 逻辑在线态（send 据此决定直发 or 入队）。 */
		this.logicalOnline = false;
		/** 是否已首次 connected（首连前不向业务 emit）。 */
		this.started = false;
		/** 本轮离线是否已升级为业务可见 reconnecting。 */
		this.escalated = false;
		/** 本轮离线开始时刻（ms，0 = 在线）。 */
		this.offlineSince = 0;
		/** 最近一次 raw reconnecting 的尝试次数 / 错误。 */
		this.lastAttempt = 0;
		/** 最近一次向业务 emit 的 phase（去重 / 决定恢复是否需要 emit connected）。 */
		this.lastNotifiedPhase = null;
		this.graceTimer = null;
		this.hardTimer = null;
		this.closed = false;
		/** 从离线恢复到在线时触发（驱动 outbox flush 等）。 */
		this.onlineListeners = [];
		this.deps = deps;
		this.log = deps.logger ?? noopLogger;
	}
	/** 注册「恢复在线」监听（fan-out）。SdkImpl 用它触发 outbox flush。 */
	addOnlineListener(cb) {
		this.onlineListeners.push(cb);
	}
	/** send 据此判断当前是否应直发（true）还是入 outbox（false）。 */
	isLogicallyOnline() {
		return this.logicalOnline;
	}
	onRawState(state) {
		if (this.closed) return;
		switch (state.phase) {
			case "connected":
				this.handleConnected(state.since);
				break;
			case "connecting":
				this.handleUnstable();
				break;
			case "reconnecting":
				this.lastAttempt = state.attempt || this.lastAttempt;
				if (state.lastError) this.lastError = state.lastError;
				this.handleUnstable();
				break;
			case "disconnected":
				this.forceDisconnected(state.reason, state.code);
				break;
		}
	}
	/** 原始顶层错误入口（由 handshake 的 transport.onError 驱动）。 */
	onRawError(err) {
		if (this.closed) return;
		this.lastError = err.message;
		if (err.kind === "fatal") {
			this.forceDisconnected("fatal", err.code ? `cf_code=${err.code}` : void 0);
			return;
		}
		this.handleUnstable();
	}
	/**
	* 强制上报终态（供 credentials 续期彻底失败 token_expired 复用）。
	* 立即通知业务、清理去抖计时器，不再去抖。
	*/
	forceDisconnected(reason, code) {
		if (this.closed) return;
		this.clearGrace();
		this.clearHard();
		this.recordOfflineMetricsIfNeeded();
		this.logicalOnline = false;
		this.offlineSince = 0;
		this.escalated = false;
		this.notifyBusiness({
			phase: "disconnected",
			reason,
			code
		});
	}
	/** 关闭：清理计时器，如业务尚未收到终态则补发一次 user_close。 */
	stop() {
		if (this.closed) return;
		this.clearGrace();
		this.clearHard();
		this.closed = true;
		if (this.started && this.lastNotifiedPhase !== "disconnected") {
			this.lastNotifiedPhase = "disconnected";
			try {
				this.deps.notify({
					phase: "disconnected",
					reason: "user_close"
				});
			} catch {}
		}
	}
	handleConnected(since) {
		const wasOffline = !this.logicalOnline;
		this.clearGrace();
		this.clearHard();
		this.logicalOnline = true;
		if (!this.started) {
			this.started = true;
			this.offlineSince = 0;
			this.escalated = false;
			this.notifyBusiness({
				phase: "connected",
				since: since ?? Date.now()
			});
			return;
		}
		if (!wasOffline) return;
		const outcome = this.escalated ? "escalated" : "grace_recovered";
		this.recordOfflineMetricsIfNeeded(outcome);
		this.log.info("[supervisor] recovered online", { outcome });
		if (this.lastNotifiedPhase !== "connected") this.notifyBusiness({
			phase: "connected",
			since: since ?? Date.now()
		});
		this.offlineSince = 0;
		this.escalated = false;
		this.lastAttempt = 0;
		this.lastError = void 0;
		this.fireOnline();
	}
	/** 处理「不稳定」信号（connecting / reconnecting / 可恢复 error）：进入 grace 静默。 */
	handleUnstable() {
		if (!this.started) return;
		if (this.escalated || this.graceTimer) {
			if (this.logicalOnline) this.markOffline();
			return;
		}
		this.markOffline();
		this.graceTimer = setTimeout(() => {
			this.graceTimer = null;
			this.escalate();
		}, this.deps.timing.gracePeriodMs);
		this.unref(this.graceTimer);
		this.log.debug("[supervisor] entered grace window", {
			gracePeriodMs: this.deps.timing.gracePeriodMs,
			attempt: this.lastAttempt,
			lastError: this.lastError
		});
	}
	markOffline() {
		if (this.logicalOnline) {
			this.logicalOnline = false;
			this.offlineSince = Date.now();
		}
	}
	/** grace 超时仍未恢复：升级为业务可见 reconnecting，并启动 hard 计时。 */
	escalate() {
		if (this.closed || this.logicalOnline) return;
		this.escalated = true;
		this.notifyBusiness({
			phase: "reconnecting",
			attempt: this.lastAttempt,
			lastError: this.lastError
		});
		const extra = Math.max(this.deps.timing.hardDisconnectMs - this.deps.timing.gracePeriodMs, 0);
		this.hardTimer = setTimeout(() => {
			this.hardTimer = null;
			this.forceDisconnected("reconnect_exhausted", "CH_SDK_5042");
		}, extra);
		this.unref(this.hardTimer);
		this.log.info("[supervisor] escalated to reconnecting", {
			attempt: this.lastAttempt,
			lastError: this.lastError
		});
	}
	notifyBusiness(state) {
		if (!this.started && state.phase !== "connected") return;
		if (state.phase === this.lastNotifiedPhase && state.phase !== "reconnecting") return;
		this.lastNotifiedPhase = state.phase;
		try {
			this.deps.notify(state);
		} catch (err) {
			this.log.error("[supervisor] notify threw", { err: String(err) });
		}
	}
	/** 记录本轮离线时长 + 结局指标（若确有一段离线）。 */
	recordOfflineMetricsIfNeeded(outcome) {
		if (!this.offlineSince) return;
		const offlineMs = Date.now() - this.offlineSince;
		this.deps.metrics?.observe(METRIC.offlineDurationMs, offlineMs);
		this.deps.metrics?.inc(METRIC.reconnectTotal, { outcome: outcome ?? (this.escalated ? "escalated" : "grace_recovered") });
	}
	fireOnline() {
		for (const cb of this.onlineListeners) try {
			cb();
		} catch (err) {
			this.log.error("[supervisor] online listener threw", { err: String(err) });
		}
	}
	clearGrace() {
		if (this.graceTimer) {
			clearTimeout(this.graceTimer);
			this.graceTimer = null;
		}
	}
	clearHard() {
		if (this.hardTimer) {
			clearTimeout(this.hardTimer);
			this.hardTimer = null;
		}
	}
	unref(timer) {
		const t = timer;
		if (typeof t.unref === "function") t.unref();
	}
};
var RENEW_RETRY_BACKOFFS_MS = [
	200,
	1e3,
	5e3
];
var MIN_RENEW_DELAY_MS = 5e3;
var RENEW_GIVEUP_FLOOR_MS = 15e3;
var ON_DEMAND_RENEW_COOLDOWN_MS = 2e3;
var CredentialsManager = class {
	constructor(o) {
		this.current = null;
		this.decoded = null;
		this.renewTimer = null;
		/**
		* 当前凭证「必须在此前续期成功」的安全截止时间（绝对 ms 时间戳）。
		*
		* = issuedAt + expiresIn - renewBefore。续期定时器始终以「距此截止还剩多久」为基准
		* 取半排程，保证有效期内至少两次续期机会（详见 armRenewTimer）。
		*/
		this.renewDeadlineMs = null;
		this.closed = false;
		/**
		* 当前在途的续期 Promise（并发去重锁）。
		*
		* 「定时器续期」（tryRenewOnce 的每次重试）与「按需续期」（ensureFresh，由 transport 的连接级 +
		* 多个订阅级 getToken 触发）可能在同一时刻一起发生。用单一在途 Promise 把它们合并为
		* **一次** fetchCredentials，避免：①凭证签发接口被瞬时打爆；②多份 applyCredentials 交叉覆盖
		* 缓存 / 重排定时器导致状态错乱。
		*/
		this.inFlightRenew = null;
		/**
		* 上一次「按需续期」失败的时刻（ms）；用于 ON_DEMAND_RENEW_COOLDOWN_MS 冷却。
		* 仅 ensureFresh 路径写入/读取；定时器续期（tryRenewOnce）不受其影响（它有自己的退避）。
		*/
		this.lastOnDemandRenewFailureAtMs = 0;
		this.fetchFn = o.fetchCredentials;
		this.opts = {
			onRenewFailure: o.onRenewFailure ?? (() => void 0),
			onRenewed: o.onRenewed ?? (() => void 0),
			onConnectionStateChange: o.onConnectionStateChange ?? (() => void 0),
			logger: o.logger ?? noopLogger
		};
	}
	/**
	* 首次拉取凭证（handshake 主流程调用）。成功后启动续期定时器。
	*/
	async start() {
		if (this.closed) throw new Error("[credentials] start on closed manager");
		const cred = await this.fetchFn();
		if (!cred) throw new ChSdkReconnectExhaustedError("[credentials] fetchCredentials returned null");
		await this.applyCredentials(cred);
		this.scheduleRenew(cred);
		return cred;
	}
	/** 取当前缓存的 Credentials；首次未 start 时返回 null。 */
	getCurrent() {
		return this.current;
	}
	/**
	* 取「保证未过期」的当前凭证 —— 供 transport 连接级 / 订阅级 `getToken` 回调调用。
	*
	* 根因背景（本次「token 过期掉线」修复的核心）：
	* 旧实现的 getToken 直接返回 `getCurrent()?.connectToken`，token 是否新鲜**完全依赖续期
	* 定时器是否按时跑过**。但 `setTimeout` 在下列场景**不会按时触发**：
	*   - 笔记本休眠 / 进程被 OS 挂起：定时器随进程冻结，唤醒时 token 可能早已过期；
	*   - 后台标签页 / 系统节流：定时器被大幅延后；
	*   - 续期请求连续失败：缓存里残留旧 token。
	* 这些情况下，centrifuge 在 token 临近过期时主动调 getToken 想拿新 token，却拿到**过期 token**，
	* 携带它发 refresh / 重连握手 → 服务端判定 token 失效 → 掉线且不再重连（即业务反馈的
	* 「token 过期掉线」）。单纯把续期定时器调早（如有效期内两次机会）治标不治本：定时器被冻结时
	* 再多次机会也不会执行。
	*
	* 本方法把 getToken 变为「按需续期」：
	*   - 缓存 token 仍在安全期内（距过期 > renewBefore）→ 直接返回，零开销（绝大多数调用走这里）；
	*   - 已进入续期窗口 / 已过期 → **同步触发一次续期并等待**，返回新凭证。
	* 这样无论定时器是否漏跑，centrifuge 每次真正需要 token 的瞬间拿到的都是未过期的。
	*/
	async ensureFresh() {
		if (this.closed || !this.current || !this.decoded) return this.current;
		const nowMs = Date.now();
		const expiresAtMs = this.computeExpiresAtMs();
		const aheadMs = Math.max(this.current.renewBefore, 1) * 1e3;
		if (expiresAtMs - nowMs > aheadMs) return this.current;
		if (this.lastOnDemandRenewFailureAtMs > 0 && nowMs - this.lastOnDemandRenewFailureAtMs < ON_DEMAND_RENEW_COOLDOWN_MS && !this.inFlightRenew) return this.current;
		try {
			const next = await this.renewNow();
			this.lastOnDemandRenewFailureAtMs = 0;
			return next;
		} catch (err) {
			this.lastOnDemandRenewFailureAtMs = Date.now();
			this.opts.logger.info("[credentials] on-demand renew failed (returning stale)", { err: describeError(err) });
			return this.current;
		}
	}
	/**
	* 计算当前凭证的绝对过期时刻（ms）。
	*
	* 优先用凭证内**所有 JWT（connect + subs）中最早的真实 `exp`**（绝对时间，不受本地定时器
	* 漂移影响，且对连接级 / 订阅级 token 都成立）；解析失败时回退「本地收到时刻 issuedAt +
	* expiresIn」相对估算。
	*/
	computeExpiresAtMs() {
		if (!this.decoded) return Date.now();
		if (this.decoded.earliestTokenExpMs !== null) return this.decoded.earliestTokenExpMs;
		const expiresInMs = Math.max(this.current?.expiresIn ?? 1, 1) * 1e3;
		return this.decoded.issuedAt + expiresInMs;
	}
	/**
	* 取 scope 对应的 AES-GCM-256 加密 CryptoKey。
	*
	* 查找顺序：
	*   1. 精确 scope
	*   2. user-limited reply 截短（`reply:#<userId>:<requestId>` → `reply:#<userId>`），D-REPLY-TOKEN
	*   3. 尾段 wildcard（如 `task:abc` → `task:*`），用于服务端按 scope pattern 通配下发的场景
	*
	* 未命中返回 null（业务方应触发重拉）。与 `SdkImpl::resolveSubToken`（client.ts）查找语义保持对齐。
	*/
	getEncryptionKey(scope) {
		return this.lookupKey(this.decoded?.encryption, scope);
	}
	/** 取 scope 对应的 HMAC-SHA256 签名 CryptoKey。查找规则与 `getEncryptionKey` 一致。 */
	getSigningKey(scope) {
		return this.lookupKey(this.decoded?.signing, scope);
	}
	/**
	* 通用 key 查找：
	* - 1) 精确匹配
	* - 2) **user-limited 截短**（D-REPLY-TOKEN）：scope 含 `#<userId>` 后缀时（如 `reply:abc#u1`），
	*      把动态部分（`abc`）替换为空，按用户级 scope `<namespace>:#<userId>` 查 key（如 `reply:#u1`）。
	*      这是 spec §5.6 + §5.5 Step 6 的隐含语义：每个用户共享一份 reply 派生 key。
	* - 3) 尾段 wildcard 回退（如 `foo:bar` → `foo:*`）—— 与 `SdkImpl::resolveSubToken` 同算法。
	*/
	lookupKey(table, scope) {
		if (!table) return null;
		const exact = table.get(scope);
		if (exact) return exact;
		const hashIdx = scope.indexOf("#");
		if (hashIdx > 0) {
			const firstColon = scope.indexOf(":");
			if (firstColon > 0 && firstColon < hashIdx) {
				const userScope = scope.slice(0, firstColon + 1) + scope.slice(hashIdx);
				const reduced = table.get(userScope);
				if (reduced) return reduced;
			}
		}
		const lastColon = scope.lastIndexOf(":");
		if (lastColon > 0) {
			const wildcard = scope.slice(0, lastColon + 1) + "*";
			return table.get(wildcard) ?? null;
		}
		return null;
	}
	/** 取当前 keyVersion；未 start 时返回 0。 */
	getKeyVersion() {
		return this.decoded?.keyVersion ?? 0;
	}
	/** 主动关闭：停止续期定时器 + 清状态。 */
	close() {
		this.closed = true;
		if (this.renewTimer) {
			clearTimeout(this.renewTimer);
			this.renewTimer = null;
		}
		this.renewDeadlineMs = null;
		this.inFlightRenew = null;
		this.current = null;
		this.decoded = null;
	}
	/**
	* 基于「最新凭证的安全截止时间」重排续期定时器。
	*
	* 在 start() 首拉成功、以及每次续期成功后调用：用 decoded.issuedAt + expiresIn 计算
	* 该凭证的绝对过期时间，减去 renewBefore 得到安全截止 renewDeadlineMs，再交给
	* armRenewTimer 按「剩余 runway 取半」排程。
	*/
	scheduleRenew(cred) {
		if (this.closed) return;
		this.renewDeadlineMs = this.computeExpiresAtMs() - Math.max(cred.renewBefore, 1) * 1e3;
		this.armRenewTimer();
	}
	/**
	* 按「距安全截止剩余时间的一半」排程下一次续期尝试。
	*
	* 为什么取半：保证凭证有效期内**至少有两次**续期机会——
	*   - 首次尝试落在有效期中点附近（约 50% runway），而非贴着截止线（旧实现在
	*     expiresIn - renewBefore ≈ 28min 才发起唯一一次，一旦失败就没有补救窗口）；
	*   - 若该次失败（突发重试也耗尽），凭证仍有约一半寿命，armRenewTimer 会以「剩余
	*     runway 再取半」继续排程，不断逼近安全截止；
	*   - 直到剩余不足 RENEW_GIVEUP_FLOOR_MS 才放弃并上报 token_expired。
	* 因此正常情况下首次即续期成功，异常情况下也至少有第二、第三次机会。
	*
	* Node 环境对定时器 unref，避免阻止进程退出（浏览器/小程序无此方法，做存在性判断）。
	*/
	armRenewTimer() {
		if (this.closed || !this.current) return;
		if (this.renewTimer) clearTimeout(this.renewTimer);
		const nowMs = Date.now();
		const runwayMs = (this.renewDeadlineMs ?? nowMs) - nowMs;
		const halfMs = Math.floor(runwayMs / 2);
		const delayMs = Math.max(Math.min(halfMs, runwayMs), MIN_RENEW_DELAY_MS);
		this.opts.logger.debug("[credentials] schedule renew", {
			keyVersion: this.decoded?.keyVersion ?? 0,
			delayMs,
			runwayMs
		});
		this.renewTimer = setTimeout(() => {
			this.tryRenewOnce();
		}, delayMs);
		const t = this.renewTimer;
		if (typeof t.unref === "function") t.unref();
	}
	/**
	* 执行「单次」续期（fetch + apply + onRenewed + 重排定时器），并发去重。
	*
	* 定时器续期（tryRenewOnce 的每次重试）与按需续期（ensureFresh）共用本方法：同一时刻只会有
	* 一个在途 fetchCredentials，其余调用复用同一 Promise。成功后会刷新缓存、回调 onRenewed 并
	* 重排续期定时器；失败则把错误抛给调用方（由其各自决定重试 / 降级）。
	*/
	renewNow() {
		if (this.inFlightRenew) return this.inFlightRenew;
		const p = (async () => {
			const fetchStartMs = Date.now();
			const next = await this.fetchFn();
			const fetchElapsedMs = Date.now() - fetchStartMs;
			if (!next) {
				this.opts.logger.error("[credentials] renew fetch returned null", { elapsedMs: fetchElapsedMs });
				throw new ChSdkReconnectExhaustedError("[credentials] fetchCredentials returned null");
			}
			if (this.closed) return next;
			await this.applyCredentials(next);
			this.opts.onRenewed(next);
			this.scheduleRenew(next);
			this.opts.logger.debug("[credentials] renew succeeded", {
				keyVersion: next.keyVersion,
				elapsedMs: fetchElapsedMs
			});
			return next;
		})();
		this.inFlightRenew = p;
		const clearInFlight = () => {
			if (this.inFlightRenew === p) this.inFlightRenew = null;
		};
		p.then(clearInFlight, clearInFlight);
		return p;
	}
	/**
	* 执行一轮续期：先做「突发重试」（200ms/1s/5s）吸收瞬时抖动；整轮失败后——
	*   - 距安全截止仍有余量（> RENEW_GIVEUP_FLOOR_MS）→ 不放弃，重排下一轮（第二/第 N 次机会）；
	*   - 余量不足 → 上报 onRenewFailure + onConnectionStateChange(disconnected/token_expired)。
	*/
	async tryRenewOnce() {
		if (this.closed) return;
		let lastErr;
		for (let attempt = 0; attempt < RENEW_RETRY_BACKOFFS_MS.length + 1; attempt++) {
			if (this.closed) return;
			try {
				await this.renewNow();
				return;
			} catch (err) {
				lastErr = err;
				this.opts.logger.debug("[credentials] renew attempt failed", {
					attempt,
					err: describeError(err)
				});
				if (attempt < RENEW_RETRY_BACKOFFS_MS.length) {
					await sleep3(RENEW_RETRY_BACKOFFS_MS[attempt]);
					continue;
				}
			}
		}
		if (this.closed) return;
		const nowMs = Date.now();
		const remainingMs = (this.renewDeadlineMs ?? nowMs) - nowMs;
		if (remainingMs > RENEW_GIVEUP_FLOOR_MS) {
			this.opts.logger.info("[credentials] renew burst exhausted, will retry before deadline", {
				remainingMs,
				err: describeError(lastErr)
			});
			this.armRenewTimer();
			return;
		}
		const e = lastErr instanceof Error ? lastErr : new Error(describeError(lastErr));
		this.opts.logger.error("[credentials] renew gave up near deadline", { remainingMs });
		this.opts.onRenewFailure(e);
		this.opts.onConnectionStateChange({
			phase: "disconnected",
			reason: "token_expired",
			code: "CH_SDK_4031"
		});
	}
	/** 把 Credentials 中的 base64 密钥导入为 CryptoKey 并缓存。 */
	async applyCredentials(cred) {
		const prevKeyVersion = this.current?.keyVersion;
		if (prevKeyVersion !== void 0 && prevKeyVersion !== cred.keyVersion) this.opts.logger.info("[credentials] keyVersion rotated", {
			from: prevKeyVersion,
			to: cred.keyVersion,
			encScopes: Object.keys(cred.encryptionKeys).length,
			sigScopes: Object.keys(cred.signingKeys).length
		});
		this.current = cred;
		const encryption = /* @__PURE__ */ new Map();
		const signing = /* @__PURE__ */ new Map();
		for (const [scope, b64] of Object.entries(cred.encryptionKeys)) try {
			const key = await importAesGcmKey(base64ToBytes(b64));
			encryption.set(scope, key);
		} catch (err) {
			this.opts.logger.error("[credentials] importAesGcmKey failed", {
				scope,
				err: describeError(err)
			});
		}
		for (const [scope, b64] of Object.entries(cred.signingKeys)) try {
			const key = await importHmacKey(base64ToBytes(b64));
			signing.set(scope, key);
		} catch (err) {
			this.opts.logger.error("[credentials] importHmacKey failed", {
				scope,
				err: describeError(err)
			});
		}
		this.decoded = {
			encryption,
			signing,
			keyVersion: cred.keyVersion,
			issuedAt: Date.now(),
			earliestTokenExpMs: earliestJwtExpMs(cred)
		};
	}
};
function sleep3(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
function decodeJwtExpMs(token) {
	try {
		const parts = token.split(".");
		if (parts.length < 2) return null;
		let b64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
		const pad = b64.length % 4;
		if (pad === 2) b64 += "==";
		else if (pad === 3) b64 += "=";
		else if (pad === 1) return null;
		const json = utf8Decode(base64ToBytes(b64));
		const obj = JSON.parse(json);
		if (typeof obj.exp === "number" && Number.isFinite(obj.exp) && obj.exp > 0) return obj.exp * 1e3;
		return null;
	} catch {
		return null;
	}
}
function earliestJwtExpMs(cred) {
	let earliest = null;
	const consider = (token) => {
		if (!token) return;
		const exp = decodeJwtExpMs(token);
		if (exp !== null && (earliest === null || exp < earliest)) earliest = exp;
	};
	consider(cred.connectToken);
	for (const token of Object.values(cred.subscriptionTokens ?? {})) consider(token);
	return earliest;
}
var ALERT_WINDOW_MS = 300 * 1e3;
var ALERT_THRESHOLD = 5;
var SecurityAlertTracker = class {
	constructor(metrics, onAlert) {
		/** key = `${kind}|${channel}` → 窗口内失败时间戳（升序）。 */
		this.windows = /* @__PURE__ */ new Map();
		/** 已在当前窗口触发过告警的 key（窗口滑出后清除，避免重复轰炸）。 */
		this.fired = /* @__PURE__ */ new Set();
		this.metrics = metrics;
		this.onAlert = onAlert;
	}
	/**
	* 记录一次安全相关失败。累加指标；滑动窗口达阈值时触发一次 onSecurityAlert。
	*
	* @param kind     告警类型（sig_invalid / decrypt_fail / key_version_revoked）
	* @param channel  涉及 channel（用于分桶 + 告警上下文）
	* @param keyVersion 涉及的 keyVersion（可选）
	*/
	record(kind, channel, keyVersion) {
		this.metrics.inc(METRIC.securityAlertTotal, { reason: kind });
		const key = `${kind}|${channel ?? ""}`;
		const now = Date.now();
		const win = (this.windows.get(key) ?? []).filter((t) => now - t < ALERT_WINDOW_MS);
		win.push(now);
		this.windows.set(key, win);
		if (win.length < ALERT_THRESHOLD) {
			this.fired.delete(key);
			return;
		}
		if (this.fired.has(key)) return;
		this.fired.add(key);
		if (this.onAlert) try {
			this.onAlert({
				kind,
				channel,
				keyVersion,
				countInWindow: win.length,
				firstAt: win[0]
			});
		} catch {}
	}
};
var WSTransport = class {
	constructor(config) {
		this.stateHandlers = [];
		this.errorHandlers = [];
		this.connected = false;
		this.connectAttempt = 0;
		this.connectPromise = null;
		this.disconnected = false;
		this.log = config.logger ?? noopLogger;
		this.client = new require_build.Centrifuge(config.url, {
			token: config.connectToken,
			...config.getToken ? { getToken: config.getToken } : {}
		});
		this.client.on("connecting", (ctx) => {
			this.connectAttempt += 1;
			this.log.debug("[ws-transport] connecting", {
				code: ctx.code,
				reason: ctx.reason
			});
			this.emitState(this.connectAttempt > 1 ? {
				phase: "reconnecting",
				attempt: this.connectAttempt,
				lastError: ctx.reason
			} : { phase: "connecting" });
		});
		this.client.on("connected", (ctx) => {
			this.connected = true;
			this.connectAttempt = 0;
			this.log.info("[ws-transport] connected", { client: ctx.client });
			this.emitState({
				phase: "connected",
				since: Date.now()
			});
		});
		this.client.on("disconnected", (ctx) => {
			this.connected = false;
			this.log.info("[ws-transport] disconnected", {
				code: ctx.code,
				reason: ctx.reason
			});
			if (this.disconnected) this.emitState({
				phase: "disconnected",
				reason: "user_close"
			});
			if (this.connectPromise && !this.connected) {
				const reason = ctx.reason || `code ${ctx.code}`;
				this.emitError({
					kind: ctx.code === 109 || ctx.code === 110 || ctx.code === 3500 ? "auth" : "network",
					code: ctx.code,
					message: reason
				});
			}
		});
		this.client.on("error", (ctx) => {
			const code = ctx.error?.code;
			const message = String(ctx.error?.message ?? "unknown transport error");
			this.log.info("[ws-transport] error", {
				code,
				message
			});
			this.emitError({
				kind: code === 109 || code === 110 || code === 3500 ? "auth" : "network",
				code,
				message,
				cause: ctx.error
			});
		});
	}
	async connect() {
		if (this.disconnected) throw new Error("[ws-transport] connect on a disconnected transport");
		if (this.connected) return;
		if (this.connectPromise) return this.connectPromise;
		this.connectPromise = new Promise((resolve, reject) => {
			const onConnected = () => {
				cleanup();
				resolve();
			};
			const onError = (err) => {
				if (err.kind === "auth" || err.kind === "fatal") {
					cleanup();
					reject(new Error(err.message));
				}
			};
			const cleanup = () => {
				const idx = this.stateHandlers.indexOf(stateProbe);
				if (idx >= 0) this.stateHandlers.splice(idx, 1);
				const errIdx = this.errorHandlers.indexOf(onError);
				if (errIdx >= 0) this.errorHandlers.splice(errIdx, 1);
			};
			const stateProbe = (state) => {
				if (state.phase === "connected") onConnected();
			};
			this.stateHandlers.push(stateProbe);
			this.errorHandlers.push(onError);
			this.client.connect();
		});
		return this.connectPromise;
	}
	async disconnect() {
		if (this.disconnected) return;
		this.disconnected = true;
		this.connected = false;
		this.client.disconnect();
		this.connectPromise = null;
		this.log.debug("[ws-transport] disconnected by caller");
	}
	newSubscription(opts) {
		return wrapSubscription(this.client.newSubscription(opts.channel, {
			token: opts.token,
			...opts.getToken ? { getToken: opts.getToken } : {}
		}));
	}
	async publish(channel, data) {
		await this.client.publish(channel, data);
	}
	onState(handler) {
		this.stateHandlers.push(handler);
	}
	onError(handler) {
		this.errorHandlers.push(handler);
	}
	isConnected() {
		return this.connected;
	}
	setToken(token) {
		this.client.setToken(token);
		this.log.debug("[ws-transport] token updated");
	}
	emitState(state) {
		for (const h of this.stateHandlers) try {
			h(state);
		} catch (err) {
			this.log.error("[ws-transport] stateHandler threw", { err: String(err) });
		}
	}
	emitError(err) {
		for (const h of this.errorHandlers) try {
			h(err);
		} catch (e) {
			this.log.error("[ws-transport] errorHandler threw", { err: String(e) });
		}
	}
};
function wrapSubscription(sub) {
	return {
		subscribe: () => sub.subscribe(),
		unsubscribe: () => sub.unsubscribe(),
		onPublication: (handler) => {
			sub.on("publication", (ctx) => {
				handler({
					channel: sub.channel,
					data: ctx.data,
					offset: typeof ctx.offset === "number" ? ctx.offset : void 0
				});
			});
		},
		onError: (handler) => {
			sub.on("error", (ctx) => {
				handler({
					code: ctx.error?.code ?? 0,
					message: String(ctx.error?.message ?? "unknown sub error")
				});
			});
		},
		onSubscribed: (handler) => {
			sub.on("subscribed", (ctx) => {
				handler({
					recovered: ctx.recovered === true,
					wasRecovering: ctx.wasRecovering === true
				});
			});
		}
	};
}
function createWSTransport(config) {
	return new WSTransport(config);
}
var WxNetworkEventTarget = class {
	constructor() {
		this.listeners = /* @__PURE__ */ new Map();
	}
	addEventListener(type, listener) {
		if (!listener || type !== "offline" && type !== "online") return;
		let handlers = this.listeners.get(type);
		if (!handlers) {
			handlers = /* @__PURE__ */ new Set();
			this.listeners.set(type, handlers);
		}
		handlers.add(listener);
	}
	removeEventListener(type, listener) {
		if (!listener || type !== "offline" && type !== "online") return;
		this.listeners.get(type)?.delete(listener);
	}
	emit(type) {
		const event = { type };
		for (const listener of Array.from(this.listeners.get(type) ?? [])) if (typeof listener === "function") listener(event);
		else listener.handleEvent(event);
	}
	clear() {
		this.listeners.clear();
	}
};
function createWxNetworkEventBridge(wx, debug) {
	if (!wx.onNetworkStatusChange || !wx.offNetworkStatusChange) return null;
	const target = new WxNetworkEventTarget();
	let disposed = false;
	let lastIsConnected;
	const listener = (result) => {
		if (disposed || result.isConnected === lastIsConnected) return;
		lastIsConnected = result.isConnected;
		const type = result.isConnected ? "online" : "offline";
		debug("[wx-transport] network status changed", {
			type,
			networkType: result.networkType
		});
		target.emit(type);
	};
	try {
		wx.onNetworkStatusChange(listener);
	} catch (err) {
		debug("[wx-transport] network listener registration failed; fallback to socket events", { err: String(err) });
		return null;
	}
	return {
		target,
		dispose: () => {
			if (disposed) return;
			disposed = true;
			try {
				wx.offNetworkStatusChange?.(listener);
			} catch (err) {
				debug("[wx-transport] network listener cleanup failed (ignored)", { err: String(err) });
			}
			target.clear();
		}
	};
}
function getWxGlobal() {
	const g = globalThis;
	if (g.wx && typeof g.wx.connectSocket === "function") return g.wx;
	return null;
}
var _WxWebSocket = class _WxWebSocket {
	constructor(url, _protocols) {
		this.CONNECTING = _WxWebSocket.CONNECTING;
		this.OPEN = _WxWebSocket.OPEN;
		this.CLOSING = _WxWebSocket.CLOSING;
		this.CLOSED = _WxWebSocket.CLOSED;
		/** 二进制类型；centrifuge v5 用 'arraybuffer' */
		this.binaryType = "arraybuffer";
		this.readyState = _WxWebSocket.CONNECTING;
		this.onopen = null;
		this.onmessage = null;
		this.onclose = null;
		this.onerror = null;
		const wx = getWxGlobal();
		if (!wx) throw new Error("[wx-transport] wx global not found; ensure running inside miniprogram or inject mock");
		this.task = wx.connectSocket({
			url,
			protocols: typeof _protocols === "string" ? [_protocols] : _protocols
		});
		this.task.onOpen(() => {
			this.readyState = _WxWebSocket.OPEN;
			this.onopen?.call(this, {});
		});
		this.task.onMessage((res) => {
			this.onmessage?.call(this, { data: res.data });
		});
		this.task.onClose((res) => {
			this.readyState = _WxWebSocket.CLOSED;
			this.onclose?.call(this, {
				code: res.code,
				reason: res.reason,
				wasClean: res.code === 1e3
			});
		});
		this.task.onError((res) => {
			this.onerror?.call(this, { message: res.errMsg });
		});
	}
	send(data) {
		this.task.send({ data });
	}
	close(code, reason) {
		this.readyState = _WxWebSocket.CLOSING;
		this.task.close({
			code,
			reason
		});
	}
};
_WxWebSocket.CONNECTING = 0;
_WxWebSocket.OPEN = 1;
_WxWebSocket.CLOSING = 2;
_WxWebSocket.CLOSED = 3;
var WxWebSocket = _WxWebSocket;
var WXTransport = class {
	constructor(config) {
		this.stateHandlers = [];
		this.errorHandlers = [];
		this.connected = false;
		this.connectAttempt = 0;
		this.connectPromise = null;
		this.disconnected = false;
		this.log = config.logger ?? noopLogger;
		const wx = getWxGlobal();
		if (!wx) throw new Error("[wx-transport] wx global not found; this transport is for miniprogram only");
		this.networkEventBridge = createWxNetworkEventBridge(wx, (msg, meta) => this.log.debug(msg, meta));
		try {
			this.client = new require_build.Centrifuge(config.url, {
				token: config.connectToken,
				...config.getToken ? { getToken: config.getToken } : {},
				websocket: WxWebSocket,
				...this.networkEventBridge ? { networkEventTarget: this.networkEventBridge.target } : {}
			});
		} catch (err) {
			this.networkEventBridge?.dispose();
			throw err;
		}
		this.client.on("connecting", (ctx) => {
			this.connectAttempt += 1;
			this.log.debug("[wx-transport] connecting", {
				code: ctx.code,
				reason: ctx.reason
			});
			this.emitState(this.connectAttempt > 1 ? {
				phase: "reconnecting",
				attempt: this.connectAttempt,
				lastError: ctx.reason
			} : { phase: "connecting" });
		});
		this.client.on("connected", (ctx) => {
			this.connected = true;
			this.connectAttempt = 0;
			this.log.info("[wx-transport] connected", { client: ctx.client });
			this.emitState({
				phase: "connected",
				since: Date.now()
			});
		});
		this.client.on("disconnected", (ctx) => {
			this.connected = false;
			this.log.info("[wx-transport] disconnected", {
				code: ctx.code,
				reason: ctx.reason
			});
			if (this.disconnected) this.emitState({
				phase: "disconnected",
				reason: "user_close"
			});
		});
		this.client.on("error", (ctx) => {
			const code = ctx.error?.code;
			const message = String(ctx.error?.message ?? "unknown wx transport error");
			this.log.info("[wx-transport] error", {
				code,
				message
			});
			this.emitError({
				kind: code === 109 || code === 110 ? "auth" : "network",
				code,
				message,
				cause: ctx.error
			});
		});
	}
	async connect() {
		if (this.disconnected) throw new Error("[wx-transport] connect on a disconnected transport");
		if (this.connected) return;
		if (this.connectPromise) return this.connectPromise;
		this.connectPromise = new Promise((resolve, reject) => {
			const stateProbe = (state) => {
				if (state.phase === "connected") {
					cleanup();
					resolve();
				}
			};
			const onError = (err) => {
				if (err.kind === "auth" || err.kind === "fatal") {
					cleanup();
					reject(new Error(err.message));
				}
			};
			const cleanup = () => {
				const idx = this.stateHandlers.indexOf(stateProbe);
				if (idx >= 0) this.stateHandlers.splice(idx, 1);
				const errIdx = this.errorHandlers.indexOf(onError);
				if (errIdx >= 0) this.errorHandlers.splice(errIdx, 1);
			};
			this.stateHandlers.push(stateProbe);
			this.errorHandlers.push(onError);
			this.client.connect();
		});
		return this.connectPromise;
	}
	async disconnect() {
		if (this.disconnected) return;
		this.disconnected = true;
		this.connected = false;
		this.networkEventBridge?.dispose();
		this.client.disconnect();
		this.connectPromise = null;
		this.log.debug("[wx-transport] disconnected by caller");
	}
	newSubscription(opts) {
		const sub = this.client.newSubscription(opts.channel, {
			token: opts.token,
			...opts.getToken ? { getToken: opts.getToken } : {}
		});
		return {
			subscribe: () => sub.subscribe(),
			unsubscribe: () => sub.unsubscribe(),
			onPublication: (handler) => {
				sub.on("publication", (ctx) => {
					handler({
						channel: sub.channel,
						data: ctx.data,
						offset: typeof ctx.offset === "number" ? ctx.offset : void 0
					});
				});
			},
			onError: (handler) => {
				sub.on("error", (ctx) => {
					handler({
						code: ctx.error?.code ?? 0,
						message: String(ctx.error?.message ?? "unknown sub error")
					});
				});
			},
			onSubscribed: (handler) => {
				sub.on("subscribed", (ctx) => {
					handler({
						recovered: ctx.recovered === true,
						wasRecovering: ctx.wasRecovering === true
					});
				});
			}
		};
	}
	async publish(channel, data) {
		await this.client.publish(channel, data);
	}
	onState(handler) {
		this.stateHandlers.push(handler);
	}
	onError(handler) {
		this.errorHandlers.push(handler);
	}
	isConnected() {
		return this.connected;
	}
	setToken(token) {
		this.client.setToken(token);
		this.log.debug("[wx-transport] token updated");
	}
	emitState(state) {
		for (const h of this.stateHandlers) try {
			h(state);
		} catch (err) {
			this.log.error("[wx-transport] stateHandler threw", { err: String(err) });
		}
	}
	emitError(err) {
		for (const h of this.errorHandlers) try {
			h(err);
		} catch (e) {
			this.log.error("[wx-transport] errorHandler threw", { err: String(e) });
		}
	}
};
function createWXTransport(config) {
	return new WXTransport(config);
}
async function handshake(opts) {
	const traceSpan = new ChannelTraceRecorder(opts.onTrace, "handshake", "channel_sdk.handshake", opts.traceContext?.traceId, { "channel.client_type": opts.clientType || "unknown" }, opts.traceContext?.spanId, opts.traceContext?.sampled);
	traceSpan.addEvent("handshake.start");
	if (!opts.userId || !opts.deviceId || !opts.clientType) {
		const error = new ChSdkAuthError("[handshake] userId / deviceId / clientType are required");
		traceSpan.error(error, { "handshake.phase": "validate" });
		throw error;
	}
	if (opts.clientType === "web" || opts.clientType === "miniprogram") {
		if (!opts.acpProvider) {
			const error = new ChSdkAuthError("[handshake] acpProvider is required for web/miniprogram clientType");
			traceSpan.error(error, { "handshake.phase": "validate" });
			throw error;
		}
	}
	const metrics = new Metrics(opts.onMetric);
	const security = new SecurityAlertTracker(metrics, opts.onSecurityAlert);
	const logger = createLogger(opts);
	const supervisor = new ConnectionSupervisor({
		notify: (state) => opts.onConnectionStateChange?.(state),
		timing: resolveReconnectTiming(opts.reconnect),
		metrics,
		logger
	});
	const timedFetchCredentials = createTimedCredentialsFetcher(opts, traceSpan, metrics);
	let transport;
	const credManager = new CredentialsManager({
		fetchCredentials: timedFetchCredentials,
		onRenewed: (nextCred) => {
			transport?.setToken(nextCred.connectToken);
			logger.info("[handshake] token renewed via credManager", { keyVersion: nextCred.keyVersion });
		},
		onRenewFailure: (err) => {
			supervisor.forceDisconnected("token_expired", err.message);
		},
		logger
	});
	const handshakeStartMs = Date.now();
	logger.info("[handshake] start", {
		userId: opts.userId,
		deviceId: opts.deviceId,
		clientType: opts.clientType
	});
	let credentials;
	let credentialsElapsedMs = 0;
	let connectElapsedMs = 0;
	try {
		const credStartMs = Date.now();
		try {
			credentials = await credManager.start();
		} catch (err) {
			logger.error("[handshake] fetchCredentials failed", {
				clientType: opts.clientType,
				elapsedMs: Date.now() - credStartMs,
				err: err instanceof Error ? err.message : String(err)
			});
			throw err;
		}
		credentialsElapsedMs = Date.now() - credStartMs;
		logger.info("[handshake] credentials ready", {
			clientType: opts.clientType,
			keyVersion: credentials.keyVersion,
			channels: Object.keys(credentials.subscriptionTokens ?? {}).length,
			elapsedMs: credentialsElapsedMs
		});
		if (opts.isRegisteredChannel) {
			for (const channel of Object.keys(credentials.subscriptionTokens ?? {})) if (!opts.isRegisteredChannel(channel)) throw new ChSdkAuthError(`[handshake] channel not registered: ${channel}`);
		}
		transport = createTransport(opts, credentials, async () => {
			return (await credManager.ensureFresh())?.connectToken ?? "";
		}, logger);
		transport.onError((connErr) => {
			supervisor.onRawError({
				kind: connErr.kind,
				code: connErr.code,
				message: connErr.message
			});
		});
		transport.onState((state) => {
			supervisor.onRawState(state);
		});
		const connectStartMs = Date.now();
		traceSpan.addEvent("ws.connect.start", { "ws.transport": transportLabel(opts) });
		try {
			await transport.connect();
			traceSpan.addEvent("ws.connect.end", {
				"ws.outcome": "success",
				"ws.duration_ms": Date.now() - connectStartMs
			});
		} catch (err) {
			const msg = err instanceof Error ? err.message : String(err);
			traceSpan.addEvent("ws.connect.end", {
				"ws.outcome": "error",
				"ws.duration_ms": Date.now() - connectStartMs
			});
			logger.error("[handshake] CF WS connect failed", {
				clientType: opts.clientType,
				transport: transportLabel(opts),
				elapsedMs: Date.now() - connectStartMs,
				err: msg
			});
			throw new ChSdkReconnectExhaustedError(`[handshake] CF WS connection failed: ${msg}`);
		}
		connectElapsedMs = Date.now() - connectStartMs;
	} catch (err) {
		credManager.close();
		supervisor.stop();
		if (transport) try {
			await transport.disconnect();
		} catch {}
		traceSpan.error(err, { "handshake.phase": "connect" });
		throw err;
	}
	let acpAdapter;
	if ((opts.clientType === "web" || opts.clientType === "miniprogram") && opts.acpProvider) acpAdapter = new AcpAdapter({
		acpProvider: opts.acpProvider,
		logger,
		metrics,
		clientType: opts.clientType
	});
	const sdk = new SdkImpl({
		transport,
		credManager,
		opts,
		acpAdapter,
		metrics,
		security,
		supervisor,
		logger
	});
	const session = {
		sessionId: generateSessionID(),
		userId: opts.userId,
		deviceId: opts.deviceId,
		clientType: opts.clientType,
		connectedAt: Date.now(),
		keyVersion: credentials.keyVersion,
		transport: transportLabel(opts),
		serverVersion: void 0
	};
	logger.info("[handshake] completed", {
		clientType: opts.clientType,
		transport: session.transport,
		keyVersion: credentials.keyVersion,
		capabilities: {
			acp: !!acpAdapter,
			outbox: opts.reconnect?.outbox?.enabled !== false,
			presence: true
		},
		credentialsMs: credentialsElapsedMs,
		connectMs: connectElapsedMs,
		totalMs: Date.now() - handshakeStartMs
	});
	traceSpan.success({
		"handshake.transport": session.transport,
		"handshake.credentials_ms": credentialsElapsedMs,
		"handshake.connect_ms": connectElapsedMs,
		"handshake.key_version": credentials.keyVersion
	});
	return {
		session,
		sdk
	};
}
function createTimedCredentialsFetcher(opts, handshakeSpan, metrics) {
	let credentialsFetchCount = 0;
	return async () => {
		const isInitialFetch = credentialsFetchCount++ === 0;
		const credentialsSpan = isInitialFetch ? handshakeSpan : new ChannelTraceRecorder(opts.onTrace, "handshake", "channel_sdk.credentials.renew", void 0, { "channel.client_type": opts.clientType || "unknown" });
		const startMs = Date.now();
		credentialsSpan.addEvent("credentials.http.start");
		try {
			const credentials = await opts.fetchCredentials({
				traceId: credentialsSpan.traceId,
				spanId: credentialsSpan.spanId,
				sampled: credentialsSpan.sampled
			});
			credentialsSpan.addEvent("credentials.http.end", {
				"http.outcome": "success",
				"http.duration_ms": Date.now() - startMs
			});
			if (!isInitialFetch) credentialsSpan.success({ "credentials.phase": "renew" });
			return credentials;
		} catch (error) {
			credentialsSpan.addEvent("credentials.http.end", {
				"http.outcome": "error",
				"http.duration_ms": Date.now() - startMs
			});
			if (!isInitialFetch) credentialsSpan.error(error, { "credentials.phase": "renew" });
			throw error;
		} finally {
			metrics.observe(METRIC.credentialsLatencyMs, Date.now() - startMs, { clientType: opts.clientType });
		}
	};
}
function createTransport(opts, credentials, getToken, logger) {
	const cfWsUrl = opts.cfWsUrl ?? credentials.cfWsUrl;
	if (!cfWsUrl) throw new ChSdkAuthError("[handshake] cfWsUrl missing: neither opts.cfWsUrl nor credentials.cfWsUrl provided");
	const config = {
		url: cfWsUrl,
		connectToken: credentials.connectToken,
		getToken,
		connectTimeoutMs: opts.connectTimeoutMs,
		logger
	};
	if (opts.transport === "wx" || opts.clientType === "miniprogram") return createWXTransport(config);
	return createWSTransport(config);
}
function transportLabel(opts) {
	if (opts.transport === "wx" || opts.clientType === "miniprogram") return "wx";
	return "ws";
}
function generateSessionID() {
	if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
	return `s-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}
//#endregion
exports.handshake = handshake;
