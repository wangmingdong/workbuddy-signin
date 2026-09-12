const require_chunk = require("./chunk.js");
const require_contract = require("./contract2.js");
//#region ../../packages/workbuddy-server/src/poi/handlers.ts
var handlers_exports = /* @__PURE__ */ require_chunk.__exportAll({ registerPoiHandlers: () => registerPoiHandlers });
function makeInvalidInputError(message) {
	return {
		kind: "invalid_input",
		message
	};
}
function isNonEmptyString(value) {
	return typeof value === "string" && value.trim().length > 0;
}
function isAddressEntry(value) {
	return typeof value === "object" && value !== null;
}
function registerPoiHandlers(registry, deps) {
	const service = Promise.resolve(deps.poiService);
	registry.handle(require_contract.POI_RPC_CHANNELS.IP_LOCATE, async () => (await service).ipLocate());
	registry.handle(require_contract.POI_RPC_CHANNELS.GEOCODE, async (address) => {
		if (!isNonEmptyString(address)) return makeInvalidInputError("address 必须是非空字符串");
		return (await service).geocode(address);
	});
	registry.handle(require_contract.POI_RPC_CHANNELS.SUGGESTION, async (keyword) => {
		if (!isNonEmptyString(keyword)) return makeInvalidInputError("keyword 必须是非空字符串");
		return (await service).suggestion(keyword);
	});
	registry.handle(require_contract.POI_RPC_CHANNELS.GET_ADDRESS_LIST, async () => (await service).getAddressList());
	registry.handle(require_contract.POI_RPC_CHANNELS.CREATE_ADDRESS, async (entry) => {
		if (!isAddressEntry(entry)) return makeInvalidInputError("entry 必须是非空对象");
		return (await service).createAddress(entry);
	});
	registry.handle(require_contract.POI_RPC_CHANNELS.UPDATE_ADDRESS, async (id, entry) => {
		if (!isNonEmptyString(id)) return makeInvalidInputError("id 必须是非空字符串");
		if (!isAddressEntry(entry)) return makeInvalidInputError("entry 必须是非空对象");
		return (await service).updateAddress(id, entry);
	});
	registry.handle(require_contract.POI_RPC_CHANNELS.DELETE_ADDRESS, async (id) => {
		if (!isNonEmptyString(id)) return makeInvalidInputError("id 必须是非空字符串");
		return (await service).deleteAddress(id);
	});
	registry.handle(require_contract.POI_RPC_CHANNELS.SET_DEFAULT_ADDRESS, async (id) => {
		if (!isNonEmptyString(id)) return makeInvalidInputError("id 必须是非空字符串");
		return (await service).setDefaultAddress(id);
	});
}
//#endregion
Object.defineProperty(exports, "handlers_exports", {
	enumerable: true,
	get: function() {
		return handlers_exports;
	}
});
Object.defineProperty(exports, "registerPoiHandlers", {
	enumerable: true,
	get: function() {
		return registerPoiHandlers;
	}
});
