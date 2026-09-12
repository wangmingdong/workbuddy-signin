//#region ../../packages/workbuddy-server/src/project/_internal/http.ts
var http_exports = /* @__PURE__ */ require("./chunk.js").__exportAll({
	HANDOFF_CANARY_HEADERS: () => HANDOFF_CANARY_HEADERS,
	ROUTE_PREFIX: () => ROUTE_PREFIX,
	buildQuery: () => buildQuery,
	resolveTeamsAcceptLanguage: () => resolveTeamsAcceptLanguage,
	unwrap: () => unwrap,
	withAcceptLanguageHeader: () => withAcceptLanguageHeader,
	withHandoffCanaryHeaders: () => withHandoffCanaryHeaders
});
/**
* 从 envelope 拆 data；`code !== 0` 抛带 envelope 结构化字段的 Error，供上层分类。
*/
function unwrap(envelope, operation) {
	if (envelope.code === 0) return envelope.data;
	const msg = envelope.msg || `${operation} failed`;
	const err = new Error(msg);
	err.code = envelope.code;
	err.data = envelope.data;
	err.requestId = envelope.requestId;
	throw err;
}
/** 统一路由前缀 */
var ROUTE_PREFIX = "/console/as/projects";
/**
* teams-collab handoff 链路灰度 header。
*
* 后端按该 header 区分「新旧 handoff 实现」，把 handoff 请求路由到灰度集群。
*
* ⚠️ 仅允许套在 handoff 相关出口（发起 Task 转交 `handoffTask`、handoffTodo GraphQL
* mutation `handoffTodoGraphQL`），**不要**装在整个 project 子域的通用 `this.http` 上。
* header 名字带 `handoff`，若广播到 projects / manifest / quota / skill / message /
* task-collaboration / smartsheet 等非 handoff 接口，会把整块 project 域流量都打上灰度
* 标记 —— 后端若按此 header 做集群路由，非 handoff 接口会一并进灰度集群，放大爆炸半径。
*
* value 必须是字符串（HTTP header 规范），不要写 `true` boolean。
*/
var HANDOFF_CANARY_HEADERS = Object.freeze({ "x-teams-collab-handoff-canary": "true" });
/**
* 给 RuntimeHttpService 套一层 handoff 灰度 header 注入，**只用于 handoff 出口**。
*
* - 浅合并 `config.headers`：默认值在前、调用方在后，仍允许调用方覆盖任何字段。
* - 不修改入参，返回新代理对象，可与 wrapHttpWithLogging 等其它 wrapper 叠加。
*
* 单独放在 project 子域内部 `_internal/http.ts`，是为了让 cloud-repo.ts / service.ts
* 的 handoff 方法与 header 常量同模块协同（修改 header 名称只动这一个文件）。
*/
function withHandoffCanaryHeaders(http) {
	function inject(config) {
		return {
			...config ?? {},
			headers: {
				...HANDOFF_CANARY_HEADERS,
				...config?.headers ?? {}
			}
		};
	}
	return {
		get: (url, config) => http.get(url, inject(config)),
		post: (url, data, config) => http.post(url, data, inject(config)),
		put: (url, data, config) => http.put(url, data, inject(config)),
		patch: (url, data, config) => http.patch(url, data, inject(config)),
		delete: (url, config) => http.delete(url, inject(config))
	};
}
function resolveTeamsAcceptLanguage(source) {
	const injected = source.resolveIsOverseas?.();
	if (injected !== void 0) return injected ? "en-US" : "zh-CN";
	return source.productManager?.getCurrentConfiguration?.()?.isOversea === true ? "en-US" : "zh-CN";
}
/**
* 给 RuntimeHttpService 套一层 Accept-Language 注入，**只用于 project（teams）子域**。
*
* 与 withHandoffCanaryHeaders 同构：浅合并 headers，调用方已显式指定的 Accept-Language
* 优先（不覆盖）。resolveLanguage 在**请求时**惰性求值，保证 product 配置就绪后取到正确值。
*/
function withAcceptLanguageHeader(http, resolveLanguage) {
	function inject(config) {
		const lang = resolveLanguage();
		if (!lang) return config ?? {};
		return {
			...config ?? {},
			headers: {
				"Accept-Language": lang,
				...config?.headers ?? {}
			}
		};
	}
	return {
		get: (url, config) => http.get(url, inject(config)),
		post: (url, data, config) => http.post(url, data, inject(config)),
		put: (url, data, config) => http.put(url, data, inject(config)),
		patch: (url, data, config) => http.patch(url, data, inject(config)),
		delete: (url, config) => http.delete(url, inject(config))
	};
}
/** 将参数对象序列化为 URL query string（含前导 `?`），空参数返回空字符串。 */
function buildQuery(params) {
	if (!params) return "";
	const entries = Object.entries(params).filter(([, v]) => v != null);
	if (entries.length === 0) return "";
	return `?${entries.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`).join("&")}`;
}
//#endregion
Object.defineProperty(exports, "ROUTE_PREFIX", {
	enumerable: true,
	get: function() {
		return ROUTE_PREFIX;
	}
});
Object.defineProperty(exports, "buildQuery", {
	enumerable: true,
	get: function() {
		return buildQuery;
	}
});
Object.defineProperty(exports, "http_exports", {
	enumerable: true,
	get: function() {
		return http_exports;
	}
});
Object.defineProperty(exports, "resolveTeamsAcceptLanguage", {
	enumerable: true,
	get: function() {
		return resolveTeamsAcceptLanguage;
	}
});
Object.defineProperty(exports, "unwrap", {
	enumerable: true,
	get: function() {
		return unwrap;
	}
});
Object.defineProperty(exports, "withAcceptLanguageHeader", {
	enumerable: true,
	get: function() {
		return withAcceptLanguageHeader;
	}
});
Object.defineProperty(exports, "withHandoffCanaryHeaders", {
	enumerable: true,
	get: function() {
		return withHandoffCanaryHeaders;
	}
});
