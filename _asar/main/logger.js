//#region ../../packages/workbuddy-server/src/server/logger.ts
var consoleWorkbuddyLogger = {
	debug: (...args) => console.debug(...args),
	info: (...args) => console.info(...args),
	warn: (...args) => console.warn(...args),
	error: (...args) => console.error(...args),
	log: (...args) => console.log(...args)
};
var currentLogger = consoleWorkbuddyLogger;
function configureWorkbuddyLogger(logger) {
	currentLogger = logger ?? consoleWorkbuddyLogger;
}
function getWorkbuddyLogger() {
	return currentLogger;
}
function createWorkbuddyScopedLogger(scope) {
	const logger = getWorkbuddyLogger();
	const scoped = logger.scope?.(scope);
	if (scoped) return normalizeLogger(scoped);
	return normalizeLogger(logger, scope);
}
function normalizeLogger(logger, scope) {
	const prefix = scope ? `[${scope}]` : void 0;
	return {
		debug: (message, ...args) => logWithFallback(logger, "debug", prefix, message, args),
		info: (message, ...args) => logWithFallback(logger, "info", prefix, message, args),
		warn: (message, ...args) => logWithFallback(logger, "warn", prefix, message, args),
		error: (message, ...args) => logWithFallback(logger, "error", prefix, message, args),
		log: (message, ...args) => logWithFallback(logger, "log", prefix, message, args)
	};
}
function logWithFallback(logger, level, prefix, message, args) {
	(logger[level] ?? logger.info ?? consoleWorkbuddyLogger[level] ?? consoleWorkbuddyLogger.info)?.(prefix ? `${prefix} ${message}` : message, ...args);
}
//#endregion
Object.defineProperty(exports, "configureWorkbuddyLogger", {
	enumerable: true,
	get: function() {
		return configureWorkbuddyLogger;
	}
});
Object.defineProperty(exports, "createWorkbuddyScopedLogger", {
	enumerable: true,
	get: function() {
		return createWorkbuddyScopedLogger;
	}
});
