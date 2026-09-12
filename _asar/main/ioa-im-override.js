const require_chunk = require("./chunk.js");
let fs = require("fs");
fs = require_chunk.__toESM(fs);
let os = require("os");
os = require_chunk.__toESM(os);
let path = require("path");
path = require_chunk.__toESM(path);
//#region src/main/system/runtime/ioa-im-override.ts
/**
* IOA IM channel override persistence — Electron main process (write side).
*
* Allows whitelisted users (identified via IOAImWhitelistEligible product feature flag)
* to manually enable non-Tencent IM channels that are normally restricted on IOA machines.
*
* The file is the single cross-process source of truth read by the daemon ClawService.
* Path: $WORKBUDDY_CONFIG_DIR/ioa-im-override.json
* (defaults to ~/.workbuddy/ioa-im-override.json)
* File format: { "allowNonTencentIM": false }
* Default: false (non-Tencent IM channels remain disabled).
*/
var ioa_im_override_exports = /* @__PURE__ */ require_chunk.__exportAll({
	readIOAImOverride: () => readIOAImOverride,
	writeIOAImOverride: () => writeIOAImOverride
});
function getOverrideFilePath() {
	const configDir = process.env.WORKBUDDY_CONFIG_DIR?.trim() || path.join(os.homedir(), ".workbuddy");
	return path.join(configDir, "ioa-im-override.json");
}
/**
* Read the current IOA IM override state.
* Returns true if the user has manually enabled non-Tencent IM channels.
* Defaults to false (channels remain restricted).
*/
function readIOAImOverride() {
	try {
		const raw = fs.readFileSync(getOverrideFilePath(), "utf-8");
		return JSON.parse(raw).allowNonTencentIM === true;
	} catch {
		return false;
	}
}
/**
* Persist the IOA IM override state to disk.
* The daemon ClawService reads this file via mtime-keyed cache.
*/
function writeIOAImOverride(allow) {
	const filePath = getOverrideFilePath();
	fs.mkdirSync(path.dirname(filePath), { recursive: true });
	fs.writeFileSync(filePath, JSON.stringify({ allowNonTencentIM: allow }, null, 2), "utf-8");
}
//#endregion
Object.defineProperty(exports, "ioa_im_override_exports", {
	enumerable: true,
	get: function() {
		return ioa_im_override_exports;
	}
});
Object.defineProperty(exports, "readIOAImOverride", {
	enumerable: true,
	get: function() {
		return readIOAImOverride;
	}
});
Object.defineProperty(exports, "writeIOAImOverride", {
	enumerable: true,
	get: function() {
		return writeIOAImOverride;
	}
});
