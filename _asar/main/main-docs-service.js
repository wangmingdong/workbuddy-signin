require("./chunk.js");
let _tencent_tencent_docs_ai_engine = require("@tencent/tencent-docs-ai-engine");
//#region src/main/features/docs/main-docs-service.ts
/**
* TencentDocsService（本地文档预览引擎适配）
*
* 历史上包装 `@tencent/docs-engine` 的 LocalFileEngine；现统一改用
* `@tencent/tencent-docs-ai-engine` 的 TencentDocsService（与本地文档子系统、MCP
* 同一套 editor_sdk 引擎），消除旧 docs-engine 依赖。
*
* 对外契约保持不变：构造仅接受 `port`，对外暴露 `WorkbuddyDocsService.getPreviewUrl`，
* 由 IMA / My Files 的 `docs:*` 预览通道经 createWorkbuddyDocsRpcService 注入消费。
* ai-engine 的 `ensureStarted()` 内部已完成「spawn + 等待 ready-marker」就绪等待，
* 故无需再保留旧实现里的 HTTP 就绪轮询。
*/
var DEFAULT_PORT = "39099";
var TencentDocsService = class {
	engine;
	constructor(options) {
		this.engine = new _tencent_tencent_docs_ai_engine.TencentDocsService({ port: options?.port ?? DEFAULT_PORT });
	}
	/**
	* 懒启动：首次调用 spawn editor_sdk 并等待就绪；ai-engine 内部幂等，
	* 并发调用复用同一启动 promise。
	*/
	async ensureStarted() {
		await this.engine.ensureStarted();
	}
	/**
	* 返回可供 renderer iframe 预览该文件的 URL（隐式 ensureStarted）。
	*/
	async getPreviewUrl(filePath, options) {
		return this.engine.getPreviewUrl(filePath, options);
	}
	/**
	* 优雅关停底层引擎（SIGTERM → grace → SIGKILL，由 ai-engine 内部处理）。
	*/
	async dispose() {
		await this.engine.dispose();
	}
};
var sharedInstance = null;
/**
* 取得 main 进程内的 docs service 单例。
* 整个 app 生命周期内只跑一个 editor_sdk 引擎实例。
*/
function getSharedMainDocsService(options) {
	if (!sharedInstance) sharedInstance = new TencentDocsService(options);
	return sharedInstance;
}
//#endregion
exports.getSharedMainDocsService = getSharedMainDocsService;
