//#region ../../packages/workbuddy-server/src/wechat-chat-history/contract.ts
/**
* Wechat chat-history business module — public contract.
*
* Owns the pipeline that turns a WeChat chat-record `.zip` (forwarded by the
* user into WorkBuddy via `workbuddy://wechat/share?...`) into the metadata
* and truncated transcript needed by:
*  - the renderer inline phrase chip + hover popover (file size, message
*    count, attached file count), and
*  - the `<wechat_chat_history>` hidden-context block injected into the user
*    prompt by `AdditionalDataSection` in this package.
*
* Naming note: the module is intentionally NOT named `wechat-share`. The
* package already ships an unrelated `wechat-share` module that wraps the
* H5 WeChat JS-SDK for sharing links / launching mini-programs. The two
* modules are unrelated and live side by side.
*
* Symmetric in shape with `share/contract.ts` and `my-files/contract.ts`.
*/
var WECHAT_CHAT_HISTORY_RPC_CHANNELS = { PARSE_ZIP_METADATA: "wechatChatHistory:parseZipMetadata" };
//#endregion
Object.defineProperty(exports, "WECHAT_CHAT_HISTORY_RPC_CHANNELS", {
	enumerable: true,
	get: function() {
		return WECHAT_CHAT_HISTORY_RPC_CHANNELS;
	}
});
