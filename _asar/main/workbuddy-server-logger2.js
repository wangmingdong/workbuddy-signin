const require_chunk = require("./chunk.js");
const require_logger = require("./logger.js");
const require_src$1 = require("./src.js");
//#region src/main/system/logging/workbuddy-server-logger.ts
var import_src = /* @__PURE__ */ require_chunk.__toESM(require_src$1.require_src());
function configureDesktopWorkbuddyServerLogger(options = {}) {
	if (options.disableConsoleTransport) import_src.default.transports.console.level = false;
	if (import_src.default.transports.ipc) import_src.default.transports.ipc.level = false;
	if (process.env.WORKBUDDY_LOG_FILE_LEVEL) import_src.default.transports.file.level = process.env.WORKBUDDY_LOG_FILE_LEVEL;
	require_logger.configureWorkbuddyLogger(createElectronWorkbuddyLogger(options.rootScope ?? "workbuddy-server"));
}
function createElectronWorkbuddyLogger(scopeName) {
	const scoped = import_src.default.scope(scopeName);
	return {
		debug: (message, ...args) => scoped.debug(message, ...args),
		info: (message, ...args) => scoped.info(message, ...args),
		warn: (message, ...args) => scoped.warn(message, ...args),
		error: (message, ...args) => scoped.error(message, ...args),
		log: (message, ...args) => scoped.info(message, ...args),
		scope: (childScope) => createElectronWorkbuddyLogger(`${scopeName}:${childScope}`)
	};
}
//#endregion
Object.defineProperty(exports, "configureDesktopWorkbuddyServerLogger", {
	enumerable: true,
	get: function() {
		return configureDesktopWorkbuddyServerLogger;
	}
});
