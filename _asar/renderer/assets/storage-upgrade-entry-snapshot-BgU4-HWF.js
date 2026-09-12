import { n as __esmMin } from "./chunk-BRZcfu7K.js";
//#region ../../packages/agent-ui/src/hooks/storage-upgrade-entry-snapshot.ts
/** 由 React 侧 hook 消费时写入最新值（true=展示 / false=隐藏 / undefined=未决）。 */
function setStorageUpgradeEntrySnapshot(enabled) {
	_enabled = enabled;
}
/**
* 非 React 同步读取「是否展示存储扩容/升级入口」。
* 仅当远端明确下发禁用（enabled=false）时返回 false；未决 / 缺省一律返回 true。
*/
function isStorageUpgradeEntryEnabled() {
	return _enabled !== false;
}
var _enabled;
var init_storage_upgrade_entry_snapshot = __esmMin((() => {}));
//#endregion
export { isStorageUpgradeEntryEnabled as n, setStorageUpgradeEntrySnapshot as r, init_storage_upgrade_entry_snapshot as t };
