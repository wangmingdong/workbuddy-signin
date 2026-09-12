//#region ../../packages/workbuddy-server/src/auth/contract.ts
var AUTH_RPC_CHANNELS = {
	LOGIN: "auth:login",
	LOGOUT: "auth:logout",
	GET_ACCOUNT: "auth:getAccount",
	GET_TOKEN: "auth:getToken",
	REFRESH_TOKEN: "auth:refreshToken",
	STATUS_CHANGED: "auth:statusChanged",
	GET_USER_INFO: "auth:getUserInfo",
	GET_ACCOUNT_USAGE: "auth:getAccountUsage",
	GET_OAUTH_USER: "auth:getOauthUser",
	SAVE_OAUTH_TOKEN: "auth:saveOauthToken",
	REVOKE_ALL: "auth:revokeAll",
	GET_REPO_LIST: "auth:getRepoList",
	GET_FILE: "auth:getFile",
	GET_BRANCHES: "auth:getBranches",
	GET_REPOSITORIES: "auth:getRepositories",
	GET_ENTERPRISE_USAGE: "auth:getEnterpriseUsage",
	GET_CHECKIN_STATUS: "auth:getCheckinStatus",
	CLAIM_DAILY_CHECKIN: "auth:claimDailyCheckin",
	GET_ACTIVITY_BANNER: "auth:getActivityBanner",
	GET_AMBASSADOR_STATUS: "auth:getAmbassadorStatus",
	SAVE_PENDING_INPUT: "auth:savePendingInput",
	LOAD_PENDING_INPUT: "auth:loadPendingInput"
};
//#endregion
Object.defineProperty(exports, "AUTH_RPC_CHANNELS", {
	enumerable: true,
	get: function() {
		return AUTH_RPC_CHANNELS;
	}
});
