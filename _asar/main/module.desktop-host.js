require("./chunk.js");
const require_workbuddy_product_config = require("./workbuddy-product-config.js");
const require_dev_env_override = require("./dev-env-override.js");
const require_module_base = require("./module-base.js");
//#region src/main/system/runtime/desktop-host-runtime.ts
require_workbuddy_product_config.init_bundled_assets();
require_dev_env_override.init_dev_env_override();
if (process.env.NODE_ENV === "development" || require_dev_env_override.isDevEnvSwitchBuildEnabled()) require_dev_env_override.forceEnableDevEnvOverride();
require_module_base.setWorkbuddyClientInfoAssetResolver(require_workbuddy_product_config.resolveBundledAsset);
require_module_base.setDevEnvEndpointResolver({ resolve: require_dev_env_override.resolveEndpointOverride });
//#endregion
//#region src/main/module.desktop-host.ts
if (typeof require_module_base.WorkbuddyInternetEnviromentProductProvider !== "function") throw new Error("WorkbuddyInternetEnviromentProductProvider registration is unavailable; check @genie/workbuddy-server subpath export shape");
var workbuddyDesktopHostModule = require_module_base.createWorkbuddyAutoBindModule();
//#endregion
exports.baseModules = require_module_base.baseModules;
exports.default = workbuddyDesktopHostModule;
