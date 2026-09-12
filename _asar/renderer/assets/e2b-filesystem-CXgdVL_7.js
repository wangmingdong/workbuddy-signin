import { n as __esmMin } from "./chunk-BRZcfu7K.js";
//#region ../../packages/workbuddy-app/src/stubs/e2b.ts
var Sandbox;
var init_e2b = __esmMin((() => {
	Sandbox = class {};
}));
//#endregion
//#region ../../packages/agent-provider/src/common/providers/cloud-agent-provider/e2b-filesystem.ts
var E2BFilesystem;
//#endregion
__esmMin((() => {
	init_e2b();
	E2BFilesystem = class E2BFilesystem {
		static {
			this.MIN_RECONNECT_INTERVAL_MS = 10 * 1e3;
		}
		constructor(sandbox) {
			this.isReconnecting = false;
			this.reconnectSubscribers = [];
			this.lastReconnectAt = 0;
			this.sandbox = sandbox;
		}
		/**
		* Connect to an E2B Sandbox and create filesystem instance
		*/
		static async connect(info) {
			return new E2BFilesystem(await Sandbox.connect(info.sandboxId, {
				domain: info.domain,
				apiUrl: info.apiUrl,
				requestTimeoutMs: info.requestTimeoutMs,
				debug: info.debug,
				headers: info.headers
			}));
		}
		/**
		* Set reconnect callback. When set, auth errors trigger automatic reconnect + retry.
		*/
		setReconnectFn(fn) {
			this.reconnectFn = fn;
		}
		/**
		* Get the underlying E2B Sandbox instance
		*/
		getSandbox() {
			return this.sandbox;
		}
		isAuthError(error) {
			if (!error || typeof error !== "object") return false;
			const err = error;
			if (err.status === 401 || err.status === 403) return true;
			if (err.statusCode === 401 || err.statusCode === 403) return true;
			if (err.response && typeof err.response === "object") {
				const resp = err.response;
				if (resp.status === 401 || resp.status === 403) return true;
			}
			if (typeof err.message === "string") {
				const msg = err.message.toLowerCase();
				if (msg.includes("unauthorized") || msg.includes("token expired") || msg.includes("authentication")) return true;
			}
			return false;
		}
		canAttemptReconnect() {
			return Date.now() - this.lastReconnectAt >= E2BFilesystem.MIN_RECONNECT_INTERVAL_MS;
		}
		/**
		* Reconnect with fresh credentials.
		* Only one reconnect in-flight at a time; concurrent callers share the result.
		*/
		async reconnect() {
			if (this.isReconnecting) return new Promise((resolve, reject) => {
				this.reconnectSubscribers.push((success) => {
					if (success) resolve();
					else reject(/* @__PURE__ */ new Error("E2B sandbox reconnect failed"));
				});
			});
			this.isReconnecting = true;
			this.lastReconnectAt = Date.now();
			try {
				const info = await this.reconnectFn();
				this.sandbox = await Sandbox.connect(info.sandboxId, {
					domain: info.domain,
					apiUrl: info.apiUrl,
					requestTimeoutMs: info.requestTimeoutMs,
					debug: info.debug,
					headers: info.headers
				});
				this.reconnectSubscribers.forEach((cb) => cb(true));
				this.reconnectSubscribers = [];
			} catch (error) {
				this.reconnectSubscribers.forEach((cb) => cb(false));
				this.reconnectSubscribers = [];
				throw error;
			} finally {
				this.isReconnecting = false;
			}
		}
		/**
		* Execute an operation. If reconnectFn is set and an auth error occurs,
		* reconnect and retry once.
		*/
		async exec(operation) {
			try {
				return await operation(this.sandbox.files);
			} catch (error) {
				if (this.reconnectFn && this.isAuthError(error) && this.canAttemptReconnect()) {
					await this.reconnect();
					return operation(this.sandbox.files);
				}
				throw error;
			}
		}
		read(path, opts) {
			return this.exec((f) => f.read(path, opts));
		}
		write(pathOrFiles, dataOrOpts, opts) {
			return this.exec((f) => {
				if (Array.isArray(pathOrFiles)) return f.write(pathOrFiles, dataOrOpts);
				return f.write(pathOrFiles, dataOrOpts, opts);
			});
		}
		async list(path, opts) {
			return this.exec((f) => f.list(path, opts));
		}
		async exists(path, opts) {
			return this.exec((f) => f.exists(path, opts));
		}
		async makeDir(path, opts) {
			return this.exec((f) => f.makeDir(path, opts));
		}
		async remove(path, opts) {
			return this.exec((f) => f.remove(path, opts));
		}
		async rename(oldPath, newPath, opts) {
			return this.exec((f) => f.rename(oldPath, newPath, opts));
		}
		async getInfo(path, opts) {
			return this.exec((f) => f.getInfo(path, opts));
		}
		async watchDir(path, onEvent, opts) {
			return this.exec((f) => f.watchDir(path, onEvent, opts));
		}
	};
}))();
export { E2BFilesystem, E2BFilesystem as default };
