const require_chunk = require("./chunk.js");
let fs = require("fs");
fs = require_chunk.__toESM(fs);
let os = require("os");
os = require_chunk.__toESM(os);
let path = require("path");
path = require_chunk.__toESM(path);
let crypto = require("crypto");
//#region ../../packages/workbuddy-server/src/sidecar/protocol.ts
var DEFAULT_RING_BUFFER_BYTES = 8 * 1024 * 1024;
var IDLE_TIMEOUT_MS = 1800 * 1e3;
var RPC_TIMEOUT_MS = 1e4;
var SESSION_LIFECYCLE_RPC_TIMEOUT_MS = 6e4;
/**
* Preserve the historical per-session cold-start budget. Before auto-port
* readiness, `session.create` returned after spawn and the backend waited up
* to 180s for the ACP endpoint. Now that `session.create` waits for the child
* ready ACK, the same budget must live in the sidecar.
*/
var SESSION_ENDPOINT_READY_TIMEOUT_MS = 18e4;
/**
* `session.create` must outlive endpoint readiness long enough for the
* sidecar to serialize the result (or clean up a timed-out child) and deliver
* the JSON-RPC response. Other lifecycle calls retain their 60s budget.
*/
var SESSION_CREATE_RPC_TIMEOUT_MS = SESSION_ENDPOINT_READY_TIMEOUT_MS + 15e3;
var SIDECAR_READY_SOCKET_ENV = "CODEBUDDY_SIDECAR_READY_SOCKET";
var SIDECAR_READY_TOKEN_ENV = "CODEBUDDY_SIDECAR_READY_TOKEN";
var SIDECAR_READY_SESSION_ID_ENV = "CODEBUDDY_SIDECAR_READY_SESSION_ID";
/**
* sidecar 优雅退出的等待上限（shutdown ack 后等控制 socket 关闭）。正常收尾
* （杀掉全部会话，每个 2s SIGTERM 宽限）在几秒内完成；超时后调用方按"进程可能
* 仍在收尾"处理，不能拖住 daemon 启动清理 / 应用退出。
*/
var SIDECAR_GRACEFUL_EXIT_TIMEOUT_MS = 1e4;
var WINDOWS_PIPE_PREFIX = "\\\\.\\pipe\\";
var CONTROL_PIPE_KEY = "sidecar-control";
var DATA_PIPE_KEY = "sidecar-data";
/**
* macOS `struct sockaddr_un.sun_path` is 104 bytes (incl. terminating NUL).
* Linux allows 108; using 104 as the conservative upper bound covers both.
*
* A small safety margin is kept because some kernels include the NUL in the
* accounted length and others don't, and tooling (e.g. strace) may add prefix
* bytes in some edge cases.
*/
var SUN_PATH_MAX_BYTES = 104;
var SUN_PATH_SAFETY_MARGIN = 3;
/**
* Path to the user's workbuddy config dir (~/.workbuddy or an override). Used
* both as the stable hash input for the install-scoped instance token and by
* one-shot cleanup of pre-migration sidecar files. Nothing is written here.
*/
function workbuddyConfigDir() {
	return process.env.WORKBUDDY_CONFIG_DIR?.trim() || process.env.CODEBUDDY_CONFIG_DIR?.trim() || path.join(os.homedir(), ".workbuddy");
}
function instanceToken() {
	return hashToken(workbuddyConfigDir(), 12);
}
function isWritableDir(dir) {
	try {
		if (!fs.statSync(dir).isDirectory()) return false;
		fs.accessSync(dir, fs.constants.W_OK);
		return true;
	} catch {
		return false;
	}
}
/**
* Runtime directory for sockets and the sidecar PID file.
*
* Linux prefers `$XDG_RUNTIME_DIR` → `/run/user/<uid>`; elsewhere (macOS,
* Linux without XDG, Windows) falls back to `os.tmpdir()`. Kept short so
* per-session sockets stay within macOS's 104-byte sun_path limit.
*
* Not memoized: tests mutate the config-dir env between cases, and call
* frequency is low (a handful of lookups per sidecar lifecycle).
*/
function sidecarRuntimeDir() {
	const token = instanceToken();
	const uid = typeof process.getuid === "function" ? process.getuid() : void 0;
	if (process.platform === "linux") {
		const xdg = process.env.XDG_RUNTIME_DIR?.trim();
		if (xdg && isWritableDir(xdg)) return path.join(xdg, "workbuddy", token);
		if (uid !== void 0) {
			const runUser = `/run/user/${uid}`;
			if (isWritableDir(runUser)) return path.join(runUser, "workbuddy", token);
		}
	}
	const base = uid !== void 0 ? `wb-${hashToken(String(uid), 6)}` : "wb";
	return path.join(os.tmpdir().trim(), base, token);
}
/** Create the runtime directory (0700) if missing. Idempotent. */
async function ensureSidecarRuntimeDir() {
	const dir = sidecarRuntimeDir();
	await fs.promises.mkdir(dir, {
		recursive: true,
		mode: 448
	});
	try {
		await fs.promises.chmod(dir, 448);
	} catch {}
	return dir;
}
function controlSocketPath() {
	if (isNamedPipe()) return buildNamedPipePath(CONTROL_PIPE_KEY);
	return path.join(sidecarRuntimeDir(), "sidecar.sock");
}
function dataSocketPath(id) {
	if (isNamedPipe()) return buildNamedPipePath(`${DATA_PIPE_KEY}-${sanitizePipeToken(id)}-${hashToken(id, 8)}`);
	const primary = path.join(sidecarRuntimeDir(), `s-${hashToken(id, 16)}.sock`);
	if (Buffer.byteLength(primary) + SUN_PATH_SAFETY_MARGIN <= SUN_PATH_MAX_BYTES) return primary;
	const uid = typeof process.getuid === "function" ? process.getuid() : void 0;
	const base = uid !== void 0 ? `wb-${hashToken(String(uid), 6)}` : "wb";
	const shortDir = path.join("/tmp", base, instanceToken());
	try {
		fs.mkdirSync(shortDir, {
			recursive: true,
			mode: 448
		});
		try {
			fs.chmodSync(shortDir, 448);
		} catch {}
	} catch {}
	return path.join(shortDir, `s-${hashToken(id, 16)}.sock`);
}
function pidFilePath() {
	return path.join(sidecarRuntimeDir(), "sidecar.pid");
}
function isNamedPipe() {
	return process.platform === "win32";
}
function buildNamedPipePath(name) {
	return `${WINDOWS_PIPE_PREFIX}workbuddy-${instanceToken()}-${name}`;
}
function sanitizePipeToken(value) {
	return value.replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").slice(0, 48) || "session";
}
function hashToken(value, length) {
	return (0, crypto.createHash)("sha1").update(value).digest("hex").slice(0, length);
}
var JSON_RPC_PARSE_ERROR = -32700;
var JSON_RPC_METHOD_NOT_FOUND = -32601;
var JSON_RPC_INVALID_PARAMS = -32602;
var JSON_RPC_INTERNAL_ERROR = -32603;
var JSON_RPC_SESSION_NOT_FOUND = -32e3;
//#endregion
//#region ../../packages/workbuddy-server/src/common/cli-process-env.ts
/**
* Static managed overlay for every WorkBuddy-spawned CLI process, applied by
* both the cold sidecar-session path and the prewarm pool. The prewarm acquire
* gate compares the two paths' managed envs for exact equality, so these keys
* must come from this single definition rather than per-site literals.
*/
var CLI_STATIC_MANAGED_ENV = {
	ELECTRON_RUN_AS_NODE: "1",
	CODEBUDDY_DISABLE_IDE: "1",
	SERVER__PORT: "0",
	SERVER__HOST: "127.0.0.1"
};
/**
* Environment variable prefixes that must not leak from a host process into
* an agent-cli process. Managed values may still be supplied explicitly via
* `managedEnv`.
*/
var ENV_BLOCKED_PREFIXES = [
	"CODEBUDDY_",
	"ELECTRON_",
	"VITE_",
	"ACC_PRODUCT_CONFIG_"
];
/**
* Exact environment variable names that can change Node/Electron bootstrap or
* networking semantics and therefore must come from the managed environment.
*/
var ENV_BLOCKED_KEYS = new Set([
	"NODE_OPTIONS",
	"NODE_CHANNEL_FD",
	"NODE_CHANNEL_SERIALIZATION_MODE",
	"NODE_PATH",
	"NODE_DEBUG",
	"NODE_DEBUG_NATIVE",
	"NODE_REPL_HISTORY",
	"NODE_PENDING_DEPRECATION",
	"NODE_REDIRECT_WARNINGS",
	"NODE_EXTRA_CA_CERTS",
	"NODE_TLS_REJECT_UNAUTHORIZED",
	"SSL_CERT_FILE",
	"SSL_CERT_DIR",
	"OPENSSL_CONF",
	"HTTP_PROXY",
	"HTTPS_PROXY",
	"ALL_PROXY",
	"NO_PROXY",
	"http_proxy",
	"https_proxy",
	"all_proxy",
	"no_proxy",
	"WORKBUDDY_PROXY_SOURCE",
	"WORKBUDDY_PAC_RPC_SOCKET",
	"WORKBUDDY_PAC_RPC_TOKEN",
	"SERVER__PORT",
	"SERVER__HOST",
	"UV_THREADPOOL_SIZE"
]);
/**
* Build the environment for an agent-cli process.
*
* Ordinary user/system variables (notably PATH and HOME) pass through, while
* WorkBuddy-managed and runtime-sensitive variables are removed.
* `managedEnv` is overlaid last as the authoritative source for both cold and
* prewarmed CLI processes.
*/
function buildCliProcessEnv(managedEnv, hostEnv = process.env) {
	const passedEnv = {};
	for (const [key, value] of Object.entries(hostEnv)) {
		if (value === void 0) continue;
		const canonicalKey = key.toUpperCase();
		if (ENV_BLOCKED_KEYS.has(canonicalKey)) continue;
		if (ENV_BLOCKED_PREFIXES.some((prefix) => canonicalKey.startsWith(prefix))) continue;
		passedEnv[key] = value;
	}
	return {
		...passedEnv,
		...managedEnv
	};
}
//#endregion
Object.defineProperty(exports, "CLI_STATIC_MANAGED_ENV", {
	enumerable: true,
	get: function() {
		return CLI_STATIC_MANAGED_ENV;
	}
});
Object.defineProperty(exports, "DEFAULT_RING_BUFFER_BYTES", {
	enumerable: true,
	get: function() {
		return DEFAULT_RING_BUFFER_BYTES;
	}
});
Object.defineProperty(exports, "IDLE_TIMEOUT_MS", {
	enumerable: true,
	get: function() {
		return IDLE_TIMEOUT_MS;
	}
});
Object.defineProperty(exports, "JSON_RPC_INTERNAL_ERROR", {
	enumerable: true,
	get: function() {
		return JSON_RPC_INTERNAL_ERROR;
	}
});
Object.defineProperty(exports, "JSON_RPC_INVALID_PARAMS", {
	enumerable: true,
	get: function() {
		return JSON_RPC_INVALID_PARAMS;
	}
});
Object.defineProperty(exports, "JSON_RPC_METHOD_NOT_FOUND", {
	enumerable: true,
	get: function() {
		return JSON_RPC_METHOD_NOT_FOUND;
	}
});
Object.defineProperty(exports, "JSON_RPC_PARSE_ERROR", {
	enumerable: true,
	get: function() {
		return JSON_RPC_PARSE_ERROR;
	}
});
Object.defineProperty(exports, "JSON_RPC_SESSION_NOT_FOUND", {
	enumerable: true,
	get: function() {
		return JSON_RPC_SESSION_NOT_FOUND;
	}
});
Object.defineProperty(exports, "RPC_TIMEOUT_MS", {
	enumerable: true,
	get: function() {
		return RPC_TIMEOUT_MS;
	}
});
Object.defineProperty(exports, "SESSION_CREATE_RPC_TIMEOUT_MS", {
	enumerable: true,
	get: function() {
		return SESSION_CREATE_RPC_TIMEOUT_MS;
	}
});
Object.defineProperty(exports, "SESSION_ENDPOINT_READY_TIMEOUT_MS", {
	enumerable: true,
	get: function() {
		return SESSION_ENDPOINT_READY_TIMEOUT_MS;
	}
});
Object.defineProperty(exports, "SESSION_LIFECYCLE_RPC_TIMEOUT_MS", {
	enumerable: true,
	get: function() {
		return SESSION_LIFECYCLE_RPC_TIMEOUT_MS;
	}
});
Object.defineProperty(exports, "SIDECAR_GRACEFUL_EXIT_TIMEOUT_MS", {
	enumerable: true,
	get: function() {
		return SIDECAR_GRACEFUL_EXIT_TIMEOUT_MS;
	}
});
Object.defineProperty(exports, "SIDECAR_READY_SESSION_ID_ENV", {
	enumerable: true,
	get: function() {
		return SIDECAR_READY_SESSION_ID_ENV;
	}
});
Object.defineProperty(exports, "SIDECAR_READY_SOCKET_ENV", {
	enumerable: true,
	get: function() {
		return SIDECAR_READY_SOCKET_ENV;
	}
});
Object.defineProperty(exports, "SIDECAR_READY_TOKEN_ENV", {
	enumerable: true,
	get: function() {
		return SIDECAR_READY_TOKEN_ENV;
	}
});
Object.defineProperty(exports, "buildCliProcessEnv", {
	enumerable: true,
	get: function() {
		return buildCliProcessEnv;
	}
});
Object.defineProperty(exports, "controlSocketPath", {
	enumerable: true,
	get: function() {
		return controlSocketPath;
	}
});
Object.defineProperty(exports, "dataSocketPath", {
	enumerable: true,
	get: function() {
		return dataSocketPath;
	}
});
Object.defineProperty(exports, "ensureSidecarRuntimeDir", {
	enumerable: true,
	get: function() {
		return ensureSidecarRuntimeDir;
	}
});
Object.defineProperty(exports, "isNamedPipe", {
	enumerable: true,
	get: function() {
		return isNamedPipe;
	}
});
Object.defineProperty(exports, "pidFilePath", {
	enumerable: true,
	get: function() {
		return pidFilePath;
	}
});
Object.defineProperty(exports, "workbuddyConfigDir", {
	enumerable: true,
	get: function() {
		return workbuddyConfigDir;
	}
});
