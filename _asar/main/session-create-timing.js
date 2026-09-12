//#region src/main/features/sessions/session-create-timing.ts
var timingStore = /* @__PURE__ */ new Map();
/**
* Store timing breakdown for a session. Called from CodeBuddyCodeSessionBackend
* after initializeInternal() completes.
*/
function storeSessionCreateTiming(sessionId, timing) {
	timingStore.set(sessionId, timing);
}
/**
* Retrieve and remove stored timing for a session. Called from
* ChatPerformanceCollector when recording `chat.message_display`.
*/
function consumeSessionCreateTiming(sessionId) {
	const timing = timingStore.get(sessionId);
	if (timing) timingStore.delete(sessionId);
	return timing;
}
//#endregion
Object.defineProperty(exports, "consumeSessionCreateTiming", {
	enumerable: true,
	get: function() {
		return consumeSessionCreateTiming;
	}
});
Object.defineProperty(exports, "storeSessionCreateTiming", {
	enumerable: true,
	get: function() {
		return storeSessionCreateTiming;
	}
});
