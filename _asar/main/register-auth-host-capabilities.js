require("./chunk.js");
const require_file_authentication_storage = require("./file-authentication-storage.js");
const require_legacy_auth_session_migrator = require("./legacy-auth-session-migrator.js");
//#region src/main/features/auth/register-auth-host-capabilities.ts
function registerElectronAuthHostCapabilities() {
	require_file_authentication_storage.setWorkbuddyLegacyAuthSessionMigrator(require_legacy_auth_session_migrator.createElectronLegacyAuthSessionMigrator());
}
//#endregion
exports.registerElectronAuthHostCapabilities = registerElectronAuthHostCapabilities;
