const require_chunk = require("./chunk.js");
let node_path = require("node:path");
node_path = require_chunk.__toESM(node_path);
let node_os = require("node:os");
node_os = require_chunk.__toESM(node_os);
//#region ../../packages/workbuddy-server/src/server/runtime-context.ts
var DEFAULT_APP_NAME = "WorkBuddy";
var DEFAULT_CONFIG_DIRNAME = ".workbuddy";
var runtimeContext = {};
function configureWorkbuddyRuntimeContext(options) {
	runtimeContext = {
		...runtimeContext,
		...dropUndefined(options)
	};
}
function getWorkbuddyRuntimeAppName() {
	return process.env.WORKBUDDY_APP_NAME?.trim() || runtimeContext.appName || DEFAULT_APP_NAME;
}
function getWorkbuddyRuntimeAppVersion() {
	return process.env.WORKBUDDY_APP_VERSION?.trim() || runtimeContext.appVersion || "";
}
function getWorkbuddyRuntimeAppPath() {
	return process.env.WORKBUDDY_APP_PATH?.trim() || runtimeContext.appPath || process.cwd();
}
function getWorkbuddyRuntimePromptTemplatesDir() {
	return process.env.WORKBUDDY_PROMPT_TEMPLATES_DIR?.trim() || runtimeContext.promptTemplatesDir;
}
function getWorkbuddyRuntimeLocale() {
	return process.env.WORKBUDDY_LOCALE?.trim() || runtimeContext.locale || process.env.LANG || "en";
}
function getWorkbuddyRuntimeConfigDir() {
	return process.env.WORKBUDDY_CONFIG_DIR?.trim() || runtimeContext.configDir || node_path.join(node_os.homedir(), DEFAULT_CONFIG_DIRNAME);
}
function getWorkbuddyRuntimeUserDataDir() {
	return process.env.WORKBUDDY_USER_DATA_DIR?.trim() || runtimeContext.userDataDir || node_path.join(getWorkbuddyRuntimeConfigDir(), "app");
}
function getWorkbuddyRuntimeLogsDir(...segments) {
	return node_path.join(getWorkbuddyRuntimeConfigDir(), "logs", ...segments);
}
function dropUndefined(value) {
	const result = {};
	for (const [key, entry] of Object.entries(value)) if (entry !== void 0) result[key] = entry;
	return result;
}
//#endregion
Object.defineProperty(exports, "configureWorkbuddyRuntimeContext", {
	enumerable: true,
	get: function() {
		return configureWorkbuddyRuntimeContext;
	}
});
Object.defineProperty(exports, "getWorkbuddyRuntimeAppName", {
	enumerable: true,
	get: function() {
		return getWorkbuddyRuntimeAppName;
	}
});
Object.defineProperty(exports, "getWorkbuddyRuntimeAppPath", {
	enumerable: true,
	get: function() {
		return getWorkbuddyRuntimeAppPath;
	}
});
Object.defineProperty(exports, "getWorkbuddyRuntimeAppVersion", {
	enumerable: true,
	get: function() {
		return getWorkbuddyRuntimeAppVersion;
	}
});
Object.defineProperty(exports, "getWorkbuddyRuntimeConfigDir", {
	enumerable: true,
	get: function() {
		return getWorkbuddyRuntimeConfigDir;
	}
});
Object.defineProperty(exports, "getWorkbuddyRuntimeLocale", {
	enumerable: true,
	get: function() {
		return getWorkbuddyRuntimeLocale;
	}
});
Object.defineProperty(exports, "getWorkbuddyRuntimeLogsDir", {
	enumerable: true,
	get: function() {
		return getWorkbuddyRuntimeLogsDir;
	}
});
Object.defineProperty(exports, "getWorkbuddyRuntimePromptTemplatesDir", {
	enumerable: true,
	get: function() {
		return getWorkbuddyRuntimePromptTemplatesDir;
	}
});
Object.defineProperty(exports, "getWorkbuddyRuntimeUserDataDir", {
	enumerable: true,
	get: function() {
		return getWorkbuddyRuntimeUserDataDir;
	}
});
