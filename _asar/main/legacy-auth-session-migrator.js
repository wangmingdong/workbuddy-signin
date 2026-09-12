const require_chunk = require("./chunk.js");
const require_readonly = require("./readonly.js");
let fs = require("fs");
fs = require_chunk.__toESM(fs);
let os = require("os");
os = require_chunk.__toESM(os);
let path = require("path");
path = require_chunk.__toESM(path);
//#region ../../packages/workbuddy-server/src/auth/legacy-vscdb-auth-reader.ts
var LEGACY_WORKBUDDY_IDE_AUTH_SECRET_KEY = "secret://{\"extensionId\":\"tencent-cloud.coding-copilot\",\"key\":\"planning-genie.new.accessTokencn\"}";
function getLegacyWorkbuddyIdeVscdbPath(options = {}) {
	const platform = options.platform ?? process.platform;
	const env = options.env ?? process.env;
	const home = options.homedir ?? os.homedir();
	let appDataPath;
	switch (platform) {
		case "darwin":
			appDataPath = path.join(home, "Library", "Application Support");
			break;
		case "win32":
			appDataPath = env["APPDATA"]?.trim() || path.join(home, "AppData", "Roaming");
			break;
		case "linux":
			appDataPath = env["XDG_CONFIG_HOME"]?.trim() || path.join(home, ".config");
			break;
		default: return;
	}
	return path.join(appDataPath, "WorkBuddy", "User", "globalStorage", "state.vscdb");
}
function readLegacyWorkbuddyIdeEncryptedAuthSession(dbPath, key = LEGACY_WORKBUDDY_IDE_AUTH_SECRET_KEY) {
	const encryptedValue = require_readonly.queryReadonlySqliteValue(dbPath, "SELECT value FROM ItemTable WHERE key = ?", key)?.value;
	if (!encryptedValue) return;
	const parsed = JSON.parse(encryptedValue);
	if (parsed.type !== "Buffer" || !Array.isArray(parsed.data)) return;
	return Buffer.from(parsed.data);
}
function parseLegacyWorkbuddyIdeAuthSession(decrypted) {
	const session = JSON.parse(decrypted);
	if (!session?.auth || !session?.account) return;
	return session;
}
//#endregion
//#region src/main/features/auth/legacy-auth-session-migrator.ts
function createElectronLegacyAuthSessionMigrator(logger) {
	return createLegacyAuthSessionMigrator({ async decryptString(encrypted) {
		const { safeStorage } = require("electron");
		if (!safeStorage.isEncryptionAvailable()) {
			logger?.warn("Encryption not available, cannot decrypt old IDE session");
			return;
		}
		return safeStorage.decryptString(encrypted);
	} }, logger);
}
function createLegacyAuthSessionMigrator(decryptor, logger) {
	return { async migrate() {
		const dbPath = getLegacyWorkbuddyIdeVscdbPath();
		if (!dbPath || !fs.existsSync(dbPath)) return;
		logger?.info(`Found old IDE database at: ${dbPath}`);
		let encrypted;
		try {
			encrypted = readLegacyWorkbuddyIdeEncryptedAuthSession(dbPath);
		} catch (error) {
			logger?.warn(`Failed to query old IDE database: ${error}`);
			return;
		}
		if (!encrypted) {
			logger?.info("No auth session found in old IDE database");
			return;
		}
		try {
			const decrypted = await decryptor.decryptString(encrypted);
			if (!decrypted) {
				logger?.warn("Legacy IDE session decryptor returned no data");
				return;
			}
			return parseLegacyWorkbuddyIdeAuthSession(decrypted);
		} catch (error) {
			logger?.warn(`Failed to decrypt old IDE auth session: ${error}`);
			return;
		}
	} };
}
//#endregion
Object.defineProperty(exports, "createElectronLegacyAuthSessionMigrator", {
	enumerable: true,
	get: function() {
		return createElectronLegacyAuthSessionMigrator;
	}
});
Object.defineProperty(exports, "createLegacyAuthSessionMigrator", {
	enumerable: true,
	get: function() {
		return createLegacyAuthSessionMigrator;
	}
});
