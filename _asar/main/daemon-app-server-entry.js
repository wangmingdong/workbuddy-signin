require("./chunk.js");
require("./fs-protection.js");
const require_startup_context = require("./startup-context.js");
let node_console = require("node:console");
//#region src/main/daemon/daemon-app-server-entry.ts
installDaemonStdioConsoleGuard();
require_startup_context.initStartupContextFromEnv("daemon");
Promise.resolve().then(() => require("./workbuddy-server-logger.js")).then(({ configureDesktopWorkbuddyServerLogger }) => {
	configureDesktopWorkbuddyServerLogger({
		disableConsoleTransport: true,
		rootScope: "daemon-server"
	});
}).then(() => Promise.resolve().then(() => require("./daemon-app-server-main.js"))).then(({ runDaemonAppServerEntry }) => runDaemonAppServerEntry()).catch((error) => {
	console.error("[DaemonAppServer] Fatal error:", error);
	process.exit(1);
});
function installDaemonStdioConsoleGuard() {
	const stderrConsole = new node_console.Console({
		stdout: process.stderr,
		stderr: process.stderr
	});
	console.log = stderrConsole.log.bind(stderrConsole);
	console.info = stderrConsole.info.bind(stderrConsole);
	console.debug = stderrConsole.debug.bind(stderrConsole);
	console.warn = stderrConsole.warn.bind(stderrConsole);
	console.error = stderrConsole.error.bind(stderrConsole);
	console.dir = stderrConsole.dir.bind(stderrConsole);
	console.table = stderrConsole.table.bind(stderrConsole);
	console.trace = stderrConsole.trace.bind(stderrConsole);
}
//#endregion
