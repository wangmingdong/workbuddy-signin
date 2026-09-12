require("./chunk.js");
const require_contract = require("./contract.js");
const require_dev_env_override = require("./dev-env-override.js");
let electron = require("electron");
let node_child_process = require("node:child_process");
//#region src/main/system/runtime/dev-env-actions.ts
/**
* Dev-env switch actions.
*
* Shared logic for switching between prod/staging environments.
* Used by both macOS native menu (menu-builder.ts) and the Windows
* custom menubar (via executeMenuCommand RPC handler).
*/
require_dev_env_override.init_dev_env_override();
var daemonConnection;
function setDevEnvDaemonConnection(connection) {
	daemonConnection = connection;
}
/**
* Write dev-env state to renderer localStorage and window.RUN_ENV so that
* both the custom menubar and isStagingEnv() can read it synchronously.
*/
function syncStateToRenderer(enabled, env) {
	const js = enabled ? `localStorage.setItem('__dev_env_state__', JSON.stringify({enabled:true,env:"${env}"}));window.RUN_ENV = ${enabled && env === "staging" ? "\"staging\"" : "undefined"};` : "localStorage.removeItem('__dev_env_state__');window.RUN_ENV = undefined;";
	for (const win of electron.BrowserWindow.getAllWindows()) win.webContents.executeJavaScript(js).catch(() => {});
}
/**
* Sync dev-env state to a specific window's renderer on load.
* Call this in `did-finish-load` to ensure the Windows custom menubar
* and isStagingEnv() can read the state immediately.
*/
function syncDevEnvStateToWindow(win) {
	if (!require_dev_env_override.isDevEnvOverrideEnabled()) {
		win.webContents.executeJavaScript("localStorage.removeItem('__dev_env_state__')").catch(() => {});
		return;
	}
	const env = require_dev_env_override.readDevEnv();
	const js = `localStorage.setItem('__dev_env_state__', JSON.stringify({enabled:true,env:"${env}"}));window.RUN_ENV = ${env === "staging" ? "\"staging\"" : "undefined"};`;
	win.webContents.executeJavaScript(js).catch(() => {});
}
/**
* Switch to the specified dev environment.
* No-op if the override is not enabled or the target matches current env.
*/
async function switchDevEnv(env) {
	if (!require_dev_env_override.isDevEnvOverrideEnabled()) return;
	if (env === require_dev_env_override.readDevEnv()) return;
	require_dev_env_override.writeDevEnv(env);
	try {
		await daemonConnection?.invoke(require_contract.AUTH_RPC_CHANNELS.LOGOUT);
	} catch (err) {
		console.warn("[dev-env] daemon logout on switch failed:", err instanceof Error ? err.message : err);
	}
	try {
		const { session } = await import("electron");
		await session.defaultSession.clearStorageData({ storages: ["cookies"] });
	} catch (err) {
		console.warn("[dev-env] clearStorageData on switch failed:", err instanceof Error ? err.message : err);
	}
	try {
		await (await Promise.resolve().then(() => require("./tdoc-dev-env-cookies.js"))).clearTdocDevEnvCookiesFromJar();
	} catch (err) {
		console.warn("[dev-env] clearTdocDevEnvCookiesFromJar on switch failed:", err instanceof Error ? err.message : err);
	}
	killLingeringChildProcesses();
	syncStateToRenderer(true, env);
	const { app } = await import("electron");
	if (process.platform === "darwin" && app.dock) app.dock.hide();
	app.relaunch();
	app.exit(0);
}
/**
* Kill lingering daemon / sidecar / prewarm processes to prevent
* cross-environment session invalidation (e.g. a production daemon triggering
* logout on staging auth file, or a sidecar deleting a staging session).
*
* Best-effort: failures are logged but do not block the env switch.
*/
function killLingeringChildProcesses() {
	const myPid = process.pid;
	if (process.platform === "win32") {
		try {
			(0, node_child_process.execSync)("wmic process where \"CommandLine like '%codebuddy%--serve%' or CommandLine like '%codebuddy%--prewarm%'\" call terminate", {
				stdio: "ignore",
				timeout: 5e3
			});
		} catch {}
		try {
			(0, node_child_process.execSync)("wmic process where \"CommandLine like '%daemon-app-server-entry%'\" call terminate", {
				stdio: "ignore",
				timeout: 5e3
			});
		} catch {}
		try {
			(0, node_child_process.execSync)("wmic process where \"CommandLine like '%sidecar-entry%'\" call terminate", {
				stdio: "ignore",
				timeout: 5e3
			});
		} catch {}
	} else {
		try {
			(0, node_child_process.execSync)("pkill -f \"codebuddy.*--serve\"", {
				stdio: "ignore",
				timeout: 5e3
			});
		} catch {}
		try {
			(0, node_child_process.execSync)("pkill -f \"codebuddy.*--prewarm\"", {
				stdio: "ignore",
				timeout: 5e3
			});
		} catch {}
		try {
			(0, node_child_process.execSync)("pkill -f \"daemon-app-server-entry\" || true", {
				stdio: "ignore",
				timeout: 5e3
			});
		} catch {}
		try {
			(0, node_child_process.execSync)("pkill -f \"sidecar-entry\"", {
				stdio: "ignore",
				timeout: 5e3
			});
		} catch {}
	}
	console.info(`[dev-env] Killed lingering daemon/sidecar/prewarm processes before env switch (own pid: ${myPid})`);
}
//#endregion
Object.defineProperty(exports, "setDevEnvDaemonConnection", {
	enumerable: true,
	get: function() {
		return setDevEnvDaemonConnection;
	}
});
Object.defineProperty(exports, "switchDevEnv", {
	enumerable: true,
	get: function() {
		return switchDevEnv;
	}
});
Object.defineProperty(exports, "syncDevEnvStateToWindow", {
	enumerable: true,
	get: function() {
		return syncDevEnvStateToWindow;
	}
});
