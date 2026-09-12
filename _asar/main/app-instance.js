const require_chunk = require("./chunk.js");
const require_workbuddy_product_config = require("./workbuddy-product-config.js");
let electron = require("electron");
let fs = require("fs");
fs = require_chunk.__toESM(fs);
let os = require("os");
os = require_chunk.__toESM(os);
let path = require("path");
path = require_chunk.__toESM(path);
let child_process = require("child_process");
//#region src/main/system/runtime/app-instance.ts
function getDefaultConfigDirname() {
	const dataFolderName = require_workbuddy_product_config.tryGetWorkbuddyBaseProductConfiguration()?.dataFolderName;
	if (typeof dataFolderName === "string" && dataFolderName.trim()) return dataFolderName;
	return ".workbuddy";
}
function detectInstanceNumber() {
	if (process.env.WORKBUDDY_FORCE_NO_INSTANCE_NUMBER) return "";
	const explicitInstanceNumber = process.env.WORKBUDDY_INSTANCE_NUMBER?.trim();
	if (explicitInstanceNumber) return explicitInstanceNumber;
	try {
		const repoDir = path.resolve(electron.app.getAppPath(), "../../../..");
		return path.basename(repoDir).match(/-(\d+)$/)?.[1] ?? "";
	} catch {
		return "";
	}
}
function getInstanceSuffix() {
	const instanceNumber = detectInstanceNumber();
	return instanceNumber ? `-${instanceNumber}` : "";
}
function deriveDefaultAppName() {
	const instanceNumber = detectInstanceNumber();
	return instanceNumber ? `${DEFAULT_APP_NAME} [${instanceNumber}]` : DEFAULT_APP_NAME;
}
function deriveDefaultSchemes() {
	const suffix = getInstanceSuffix().replace(/^-/, "");
	const product = require_workbuddy_product_config.tryGetWorkbuddyBaseProductConfiguration();
	const productSchemes = Array.isArray(product?.deepLinkSchemes) ? product.deepLinkSchemes.filter((s) => typeof s === "string" && s.trim()) : [];
	return (productSchemes.length > 0 ? productSchemes : DEFAULT_DEEPLINK_SCHEMES).map((scheme) => `${scheme}${suffix}`);
}
function parseSchemes(value) {
	return (value ?? "").split(",").map((scheme) => scheme.trim()).filter(Boolean);
}
function getWorkbuddyAppName() {
	return process.env.WORKBUDDY_APP_NAME?.trim() || deriveDefaultAppName();
}
function getWorkbuddyConfigDir() {
	return process.env.WORKBUDDY_CONFIG_DIR?.trim() || path.join(os.homedir(), getDefaultConfigDirname());
}
function getWorkbuddyUserDataDir() {
	return process.env.WORKBUDDY_USER_DATA_DIR?.trim() || path.join(getWorkbuddyConfigDir(), "app");
}
function getWorkbuddySessionDataDir() {
	return path.join(getWorkbuddyUserDataDir(), "session");
}
function getWorkbuddySkillsDir() {
	return path.join(getWorkbuddyConfigDir(), "skills");
}
function getWorkbuddyLogsDir(...segments) {
	return path.join(getWorkbuddyConfigDir(), "logs", ...segments);
}
/** Pending telemetry directory (install/update timing, repair events). */
function getWorkbuddyPendingTelemetryDir() {
	if (process.platform === "win32") return path.join(getWorkbuddyConfigDir(), "pending-telemetry");
	return path.join(os.homedir(), "Library", "Application Support", "WorkBuddy", "pending-telemetry");
}
function ensureWorkbuddyDataDirs() {
	const dirs = [
		getWorkbuddyConfigDir(),
		getWorkbuddyUserDataDir(),
		getWorkbuddySkillsDir(),
		getWorkbuddyLogsDir()
	];
	for (const dir of dirs) if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}
function getRegisteredDeepLinkSchemes() {
	const fromList = parseSchemes(process.env.WORKBUDDY_DEEPLINK_SCHEMES);
	if (fromList.length > 0) return fromList;
	const primaryScheme = process.env.WORKBUDDY_DEEPLINK_SCHEME?.trim();
	if (primaryScheme) return [primaryScheme];
	return deriveDefaultSchemes();
}
function isWorkbuddyDeepLink(url) {
	try {
		const scheme = new URL(url).protocol.replace(/:$/, "");
		return getRegisteredDeepLinkSchemes().includes(scheme);
	} catch {
		return false;
	}
}
function getRendererEntryUrl() {
	const rendererUrl = process.env.ELECTRON_RENDERER_URL?.trim();
	return rendererUrl ? rendererUrl : null;
}
function removeLegacyProtocolRegistrations() {
	for (const scheme of LEGACY_SCHEMES_TO_REMOVE) electron.app.removeAsDefaultProtocolClient(scheme);
	if (process.platform === "darwin") unregisterAllWorkbuddyDeepLinksFromLaunchServices();
}
/**
* Asynchronously find all WorkBuddy app bundle paths registered in Launch Services
* that still have codebuddy:// bindings, and unregister them. Runs in background
* to avoid blocking app startup.
*
* After cleanup, re-registers the current app to restore workbuddy:// binding.
*/
function unregisterAllWorkbuddyDeepLinksFromLaunchServices() {
	const appMatch = process.execPath.match(/^(.+?\.app)\//);
	const currentBundlePath = appMatch ? appMatch[1] : "";
	try {
		(0, child_process.execFile)("/bin/sh", ["-c", `${LSREGISTER_PATH} -dump | grep -E "^(bundle id:|path:)" | grep -A 1 "bundle id:.*WorkBuddy" | grep "path:" | sort -u`], {
			encoding: "utf8",
			maxBuffer: 10 * 1024 * 1024
		}, (err, stdout) => {
			if (err || !stdout) return;
			const paths = [];
			for (const line of stdout.split("\n")) {
				const match = line.match(/^\s*path:\s*(.+?)\s*\(0x[0-9a-f]+\)\s*$/);
				if (!match) continue;
				const appPath = match[1].trim();
				if (currentBundlePath && appPath === currentBundlePath) continue;
				if (appPath && !paths.includes(appPath)) paths.push(appPath);
			}
			if (paths.length === 0) return;
			for (const appPath of paths) try {
				(0, child_process.spawnSync)(LSREGISTER_PATH, ["-u", appPath], { timeout: 5e3 });
				console.log(`[LegacyProtocolCleanup] unregistered stale Launch Services entry: ${appPath}`);
			} catch {}
		});
	} catch {}
}
function configureElectronApp() {
	const configDir = getWorkbuddyConfigDir();
	process.env.CODEBUDDY_CONFIG_DIR = configDir;
	process.env.WORKBUDDY_CONFIG_DIR = configDir;
	process.env.WORKBUDDY_DATA_FOLDER_NAME = getDefaultConfigDirname();
	require_workbuddy_product_config.ensureWorkbuddyBootstrapProductEnv();
	const product = require_workbuddy_product_config.tryGetWorkbuddyBaseProductConfiguration();
	const productName = product?.productName?.trim();
	if (productName) {
		const instanceNumber = detectInstanceNumber();
		electron.app.setName(instanceNumber ? `${productName} [${instanceNumber}]` : productName);
	} else electron.app.setName(getWorkbuddyAppName());
	const applicationName = product?.applicationName;
	if (applicationName?.trim()) electron.app.userAgentFallback = electron.app.userAgentFallback.replace(`${electron.app.getName()}/${electron.app.getVersion()}`, `${applicationName.trim()}/${electron.app.getVersion()}`);
	electron.app.setPath("userData", getWorkbuddyUserDataDir());
	electron.app.setPath("sessionData", getWorkbuddySessionDataDir());
	electron.app.setAppLogsPath(getWorkbuddyLogsDir());
}
var DEFAULT_APP_NAME, DEFAULT_DEEPLINK_SCHEMES, LEGACY_SCHEMES_TO_REMOVE, LSREGISTER_PATH;
var init_app_instance = require_chunk.__esmMin((() => {
	require_workbuddy_product_config.init_workbuddy_product_config();
	DEFAULT_APP_NAME = "WorkBuddy";
	DEFAULT_DEEPLINK_SCHEMES = ["workbuddy"];
	LEGACY_SCHEMES_TO_REMOVE = ["codebuddy"];
	LSREGISTER_PATH = "/System/Library/Frameworks/CoreServices.framework/Frameworks/LaunchServices.framework/Support/lsregister";
}));
//#endregion
Object.defineProperty(exports, "configureElectronApp", {
	enumerable: true,
	get: function() {
		return configureElectronApp;
	}
});
Object.defineProperty(exports, "ensureWorkbuddyDataDirs", {
	enumerable: true,
	get: function() {
		return ensureWorkbuddyDataDirs;
	}
});
Object.defineProperty(exports, "getRegisteredDeepLinkSchemes", {
	enumerable: true,
	get: function() {
		return getRegisteredDeepLinkSchemes;
	}
});
Object.defineProperty(exports, "getRendererEntryUrl", {
	enumerable: true,
	get: function() {
		return getRendererEntryUrl;
	}
});
Object.defineProperty(exports, "getWorkbuddyAppName", {
	enumerable: true,
	get: function() {
		return getWorkbuddyAppName;
	}
});
Object.defineProperty(exports, "getWorkbuddyConfigDir", {
	enumerable: true,
	get: function() {
		return getWorkbuddyConfigDir;
	}
});
Object.defineProperty(exports, "getWorkbuddyLogsDir", {
	enumerable: true,
	get: function() {
		return getWorkbuddyLogsDir;
	}
});
Object.defineProperty(exports, "getWorkbuddyPendingTelemetryDir", {
	enumerable: true,
	get: function() {
		return getWorkbuddyPendingTelemetryDir;
	}
});
Object.defineProperty(exports, "getWorkbuddySessionDataDir", {
	enumerable: true,
	get: function() {
		return getWorkbuddySessionDataDir;
	}
});
Object.defineProperty(exports, "getWorkbuddyUserDataDir", {
	enumerable: true,
	get: function() {
		return getWorkbuddyUserDataDir;
	}
});
Object.defineProperty(exports, "init_app_instance", {
	enumerable: true,
	get: function() {
		return init_app_instance;
	}
});
Object.defineProperty(exports, "isWorkbuddyDeepLink", {
	enumerable: true,
	get: function() {
		return isWorkbuddyDeepLink;
	}
});
Object.defineProperty(exports, "removeLegacyProtocolRegistrations", {
	enumerable: true,
	get: function() {
		return removeLegacyProtocolRegistrations;
	}
});
