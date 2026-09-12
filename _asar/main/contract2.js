//#region ../../packages/workbuddy-server/src/poi/contract.ts
/**
* POI RPC channel 常量（genie#52769 阶段五）
*
* 遵循 `{domain}:{method}` 命名约定。
*/
var POI_RPC_CHANNELS = {
	IP_LOCATE: "poi:ipLocate",
	GEOCODE: "poi:geocode",
	SUGGESTION: "poi:suggestion",
	GET_ADDRESS_LIST: "poi:getAddressList",
	CREATE_ADDRESS: "poi:createAddress",
	UPDATE_ADDRESS: "poi:updateAddress",
	DELETE_ADDRESS: "poi:deleteAddress",
	SET_DEFAULT_ADDRESS: "poi:setDefaultAddress"
};
//#endregion
Object.defineProperty(exports, "POI_RPC_CHANNELS", {
	enumerable: true,
	get: function() {
		return POI_RPC_CHANNELS;
	}
});
