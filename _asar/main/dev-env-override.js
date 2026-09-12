const require_chunk = require("./chunk.js");
let fs = require("fs");
fs = require_chunk.__toESM(fs);
let os = require("os");
os = require_chunk.__toESM(os);
let path = require("path");
path = require_chunk.__toESM(path);
//#region src/main/system/runtime/dev-env-override.ts
/**
* Dev-only endpoint override.
*
* Lets a developer toggle between prod and staging at runtime without editing
* tracked product*.json files. Persisted at $WORKBUDDY_CONFIG_DIR/dev-env.json
* (defaults to ~/.workbuddy/dev-env.json, or ~/.workbuddy-ai/ for overseas).
*
* Only active when NODE_ENV === 'development'. In production builds the
* override file is ignored and all helpers short-circuit.
*/
/**
* 根据当前 dev-env 选择，解析 Ardot 内嵌画布要用的 base URL。
*
* 优先级：
* 1. 顶层 `ardotEndpointOverride` 字段 —— 与 `env` 正交，可在 env=staging/prod
*    时单独把 Ardot 切到自定义域名（包括 http://localhost:* 本地联调）。
*    校验仅要求合法 http(s) URL，不强制 host 含 'ardot'：专用字段下用户意图明确。
* 2. env 内置映射（prod / staging）。
* 3. env=custom:<name> 时尝试 customEnvs 中的 endpoint（host 含 'ardot' 才直采，
*    防止把 copilot 自定义域错配给 Ardot）。
* 任何不匹配的情况一律回退 prod，保守不出错。
*/
function resolveArdotEndpoint(env = readDevEnv()) {
	if (!isDevEnvOverrideEnabled()) return ARDOT_DEV_ENV_ENDPOINTS.prod;
	const override = readArdotEndpointOverride();
	if (override) return override;
	if (env === "prod") return ARDOT_DEV_ENV_ENDPOINTS.prod;
	if (env === "staging") return ARDOT_DEV_ENV_ENDPOINTS.staging;
	if (env.startsWith("custom:")) {
		const name = env.slice(7);
		const custom = readCustomEnvs().find((e) => e.name === name);
		if (custom?.endpoint && isArdotHostUrl(custom.endpoint)) return custom.endpoint;
	}
	return ARDOT_DEV_ENV_ENDPOINTS.prod;
}
/**
* 读取顶层独立的 Ardot endpoint 覆盖。返回 undefined 表示未配置或非法。
*
* 不内置 isDevEnvOverrideEnabled 守卫——上层 resolveArdotEndpoint 已检查；
* 外部新增调用方需自行确认 dev-env 已启用，避免文件被异常情况污染时仍命中。
*
* 校验：合法 http(s) URL（含 localhost / 127.0.0.1）。专用字段下不需要
* customEnvs 那种 host 守卫——后者的目的是防止 copilot 自定义域被错配给 Ardot。
*/
function readArdotEndpointOverride() {
	try {
		const raw = fs.readFileSync(getOverrideFilePath(), "utf-8");
		const value = JSON.parse(raw).ardotEndpointOverride;
		if (typeof value === "string" && value.trim().length > 0 && isValidHttpUrl(value)) return value;
	} catch {}
}
function isValidHttpUrl(endpoint) {
	try {
		const url = new URL(endpoint);
		return url.protocol === "http:" || url.protocol === "https:";
	} catch {
		return false;
	}
}
/**
* 仅当 URL 的 host 段包含 'ardot' 时才认为是 Ardot 自定义端点。
* 避免 `https://copilot.internal/ardot-proxy` 这种 path 含 'ardot'
* 但 host 是 copilot 域的 URL 被误判。
* URL 解析失败（用户输入了纯字符串而非合法 URL）一律视为非 Ardot。
*/
function isArdotHostUrl(endpoint) {
	try {
		return new URL(endpoint).hostname.includes("ardot");
	} catch {
		return false;
	}
}
/**
* 读取自定义测试环境列表。
* 持久化在 dev-env.json 的 `customEnvs` 字段。
*/
function readCustomEnvs() {
	if (!isDevEnvOverrideEnabled()) return [];
	try {
		const raw = fs.readFileSync(getOverrideFilePath(), "utf-8");
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed.customEnvs) ? parsed.customEnvs : [];
	} catch {
		return [];
	}
}
/**
* 添加一个自定义测试环境。
* 同名环境会被覆盖（更新 endpoint）。
*/
function addCustomEnv(entry) {
	if (!isDevEnvOverrideEnabled()) return;
	const envs = readCustomEnvs().filter((e) => e.name !== entry.name);
	envs.push(entry);
	writeCustomEnvs(envs);
}
/**
* 清空所有自定义环境列表。不影响 prod / staging。
* 注意：不会自动切换当前环境，调用方需自行处理切换逻辑。
*/
function clearAllCustomEnvs() {
	if (!isDevEnvOverrideEnabled()) return;
	writeCustomEnvs([]);
}
function writeCustomEnvs(envs) {
	const filePath = getOverrideFilePath();
	let data = {};
	try {
		data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
	} catch {}
	data.customEnvs = envs;
	fs.mkdirSync(path.dirname(filePath), { recursive: true });
	fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}
/**
* Resolve the override file path lazily so it picks up WORKBUDDY_CONFIG_DIR
* set by ensureWorkbuddyBootstrapProductEnv() (e.g. ~/.workbuddy-ai for the
* overseas build).
*/
function getOverrideFilePath() {
	const configDir = process.env.WORKBUDDY_CONFIG_DIR?.trim() || path.join(os.homedir(), ".workbuddy");
	return path.join(configDir, "dev-env.json");
}
function isDevEnvOverrideEnabled() {
	return process.env.NODE_ENV === "development" || devEnvOverrideForceEnabled;
}
/**
* Whether the build was compiled with dev-env switch support.
* Used to gate shortcut registration in production builds.
*/
function isDevEnvSwitchBuildEnabled() {
	return false;
}
function forceEnableDevEnvOverride() {
	devEnvOverrideForceEnabled = true;
}
/**
* Remove the dev-env.json file, effectively disabling the override.
*/
function removeDevEnvFile() {
	try {
		fs.unlinkSync(getOverrideFilePath());
	} catch {}
}
/**
* Check whether the dev-env.json file exists on disk.
*/
function devEnvFileExists() {
	return fs.existsSync(getOverrideFilePath());
}
/**
* Read the current dev env selection. Defaults to 'prod' when the file is
* missing, malformed, or the feature is disabled.
*/
function readDevEnv() {
	if (!isDevEnvOverrideEnabled()) return "prod";
	try {
		const raw = fs.readFileSync(getOverrideFilePath(), "utf-8");
		const parsed = JSON.parse(raw);
		if (parsed.env === "staging" || parsed.env === "prod") return parsed.env;
		if (typeof parsed.env === "string" && parsed.env.startsWith("custom:")) return parsed.env;
	} catch {}
	return "prod";
}
function readConnectorDevEnv() {
	return readDevEnv() === "staging" ? "staging" : "prod";
}
/**
* Persist the dev env selection. No-op in production.
*/
function writeDevEnv(env) {
	if (!isDevEnvOverrideEnabled()) return;
	const filePath = getOverrideFilePath();
	let data = {};
	try {
		data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
	} catch {}
	data.env = env;
	fs.mkdirSync(path.dirname(filePath), { recursive: true });
	fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}
/**
* Return the endpoint override for the current dev env, or undefined when
* disabled or selected env is 'prod' (no override needed).
*/
function resolveEndpointOverride() {
	if (!isDevEnvOverrideEnabled()) return;
	const env = readDevEnv();
	if (env === "prod") return;
	if (env.startsWith("custom:")) {
		const name = env.slice(7);
		return readCustomEnvs().find((e) => e.name === name)?.endpoint;
	}
	return DEV_ENV_ENDPOINTS[env];
}
function resolveCliEnvRouteModeOverride() {
	if (!isDevEnvOverrideEnabled() || !devEnvFileExists()) return;
	return readDevEnv() === "staging" ? "staging" : "production";
}
var DEV_ENV_ENDPOINTS, ARDOT_DEV_ENV_ENDPOINTS, devEnvOverrideForceEnabled;
var init_dev_env_override = require_chunk.__esmMin((() => {
	DEV_ENV_ENDPOINTS = {
		prod: "https://copilot.tencent.com",
		staging: "https://staging.codebuddy.cn"
	};
	ARDOT_DEV_ENV_ENDPOINTS = {
		prod: "https://ardot.tencent.com",
		staging: "https://test.ardot.tencent.com"
	};
	devEnvOverrideForceEnabled = false;
}));
//#endregion
Object.defineProperty(exports, "addCustomEnv", {
	enumerable: true,
	get: function() {
		return addCustomEnv;
	}
});
Object.defineProperty(exports, "clearAllCustomEnvs", {
	enumerable: true,
	get: function() {
		return clearAllCustomEnvs;
	}
});
Object.defineProperty(exports, "devEnvFileExists", {
	enumerable: true,
	get: function() {
		return devEnvFileExists;
	}
});
Object.defineProperty(exports, "forceEnableDevEnvOverride", {
	enumerable: true,
	get: function() {
		return forceEnableDevEnvOverride;
	}
});
Object.defineProperty(exports, "init_dev_env_override", {
	enumerable: true,
	get: function() {
		return init_dev_env_override;
	}
});
Object.defineProperty(exports, "isDevEnvOverrideEnabled", {
	enumerable: true,
	get: function() {
		return isDevEnvOverrideEnabled;
	}
});
Object.defineProperty(exports, "isDevEnvSwitchBuildEnabled", {
	enumerable: true,
	get: function() {
		return isDevEnvSwitchBuildEnabled;
	}
});
Object.defineProperty(exports, "readConnectorDevEnv", {
	enumerable: true,
	get: function() {
		return readConnectorDevEnv;
	}
});
Object.defineProperty(exports, "readCustomEnvs", {
	enumerable: true,
	get: function() {
		return readCustomEnvs;
	}
});
Object.defineProperty(exports, "readDevEnv", {
	enumerable: true,
	get: function() {
		return readDevEnv;
	}
});
Object.defineProperty(exports, "removeDevEnvFile", {
	enumerable: true,
	get: function() {
		return removeDevEnvFile;
	}
});
Object.defineProperty(exports, "resolveArdotEndpoint", {
	enumerable: true,
	get: function() {
		return resolveArdotEndpoint;
	}
});
Object.defineProperty(exports, "resolveCliEnvRouteModeOverride", {
	enumerable: true,
	get: function() {
		return resolveCliEnvRouteModeOverride;
	}
});
Object.defineProperty(exports, "resolveEndpointOverride", {
	enumerable: true,
	get: function() {
		return resolveEndpointOverride;
	}
});
Object.defineProperty(exports, "writeDevEnv", {
	enumerable: true,
	get: function() {
		return writeDevEnv;
	}
});
