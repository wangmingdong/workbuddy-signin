const require_chunk = require("./chunk.js");
const require_common$2 = require("./common.js");
const require_workbuddy_auth_product_coordinator = require("./workbuddy-auth-product-coordinator.js");
const require_logger = require("./logger.js");
const require_log_acl_guard = require("./log-acl-guard.js");
const require_net_log = require("./net-log.js");
const require_runtime_context = require("./runtime-context.js");
const require_workbuddy_product_config = require("./workbuddy-product-config.js");
const require_adm_zip$1 = require("./adm-zip.js");
const require_dev_env_override = require("./dev-env-override.js");
const require_file_authentication_storage = require("./file-authentication-storage.js");
const require_helpers = require("./helpers.js");
const require_types = require("./types.js");
const require_auth = require("./auth.js");
const require_module_base = require("./module-base.js");
let fs = require("fs");
fs = require_chunk.__toESM(fs);
let os = require("os");
os = require_chunk.__toESM(os);
let path = require("path");
path = require_chunk.__toESM(path);
let node_fs = require("node:fs");
node_fs = require_chunk.__toESM(node_fs);
let node_path = require("node:path");
node_path = require_chunk.__toESM(node_path);
let node_os = require("node:os");
let util = require("util");
let http = require("http");
http = require_chunk.__toESM(http);
let https = require("https");
https = require_chunk.__toESM(https);
let node_crypto = require("node:crypto");
let node_http = require("node:http");
node_http = require_chunk.__toESM(node_http);
let node_stream = require("node:stream");
let net = require("net");
net = require_chunk.__toESM(net);
let crypto = require("crypto");
crypto = require_chunk.__toESM(crypto);
let fs_promises = require("fs/promises");
fs_promises = require_chunk.__toESM(fs_promises);
let child_process = require("child_process");
let node_process = require("node:process");
node_process = require_chunk.__toESM(node_process, 1);
let async_hooks = require("async_hooks");
//#region ../../packages/workbuddy-server/src/connector/connector-mcp-proxy-metric.ts
var import_common$1 = require_common$2.require_common$1();
require_common$2.init_decorate();
var import_common = require_common$2.require_common();
require_common$2.init_decorateMetadata();
require_common$2.init_common$5();
require_common$2.init_common$4();
require_common$2.init_common$3();
var import_undici = require_net_log.require_undici();
require_common$2.init_common$2();
require_log_acl_guard.init_src();
require_common$2.init_common();
require_workbuddy_product_config.init_cli_product_env();
var import_adm_zip = /* @__PURE__ */ require_chunk.__toESM(require_adm_zip$1.require_adm_zip());
var import_dist = /* @__PURE__ */ require_chunk.__toESM(require_workbuddy_auth_product_coordinator.require_dist());
var import_semver = /* @__PURE__ */ require_chunk.__toESM(require_workbuddy_auth_product_coordinator.require_semver());
function classifyMcpInvokeErrorKind(error) {
	const msg = error instanceof Error ? error.message : String(error);
	if (/disabled by user/i.test(msg)) return "disabled";
	if (/requires re-authorization/i.test(msg)) return "auth";
	if (/is unavailable/i.test(msg)) return "unavailable";
	if (/is not connected/i.test(msg)) return "not_connected";
	if (/is reconnecting/i.test(msg)) return "reconnecting";
	if (/not found in any connected connector/i.test(msg)) return "not_found";
	if (/timeout|timed out/i.test(msg)) return "timeout";
	return "unknown";
}
/** SDK 在 server 不支持 method 时抛 -32601 / "Method not found"。 */
function classifyMcpListErrorKind(error) {
	const msg = error instanceof Error ? error.message : String(error);
	if (/method not found|-32601/i.test(msg)) return "method_not_found";
	if (/timeout|timed out/i.test(msg)) return "timeout";
	if (/unauthor|401|403/i.test(msg)) return "auth";
	return "unknown";
}
/**
* 连接器业务监控上报通道。daemon-server 层不依赖 desktop 的 DesktopMonitorService，
* 而是由宿主在 bootstrap 阶段（apps/workbuddy-desktop/src/main/system/runtime/index.ts）
* 调 `setConnectorMetricReporter(...)` 注入。
*
* 沿用 packages/workbuddy-server 已有的"模块级 setter 注入"约定（参考
* `runtime/client-info-provider.ts` 的 `setWorkbuddyClientInfoAssetResolver`）：
* Web 端 / 单测未注入时为 undefined，所有上报安全降级为 noop。
*/
var metricReporter;
function setConnectorMetricReporter(reporter) {
	metricReporter = reporter;
}
var ConnectorMetricReporter = class {
	/** 耗时事件（invoke / list / oauth）。 */
	duration(metric, durationMs, dims) {
		metricReporter?.recordDuration(metric, durationMs, dims);
	}
	/**
	* 计数事件（transport.error / connect / disconnect）。原 desktop 走 `reportAegisEvent`，
	* 这里统一 `addCounter(name, 1, dims)`——二者最终都落到 AegisExporter.reportEvent，
	* 语义等价（事件次数 + dims）。
	*/
	count(metric, dims) {
		metricReporter?.addCounter(metric, 1, dims);
	}
	/**
	* 上报 wb.connector.invoke.{success|biz_error|error}。
	* - error 路径附带 error_kind dim
	* - biz_error 识别 MCP CallToolResult 的 isError=true
	*/
	invoke(args) {
		const { dims, durationMs, result, error } = args;
		const baseDims = {
			mcp_server: dims.mcpServer,
			tool_name: dims.toolName
		};
		if (error !== void 0) {
			this.duration("wb.connector.invoke.error", durationMs, {
				...baseDims,
				error_kind: classifyMcpInvokeErrorKind(error)
			});
			return;
		}
		const isBusinessError = !!(result && typeof result === "object" && (result.isError || result.is_error));
		this.duration(isBusinessError ? "wb.connector.invoke.biz_error" : "wb.connector.invoke.success", durationMs, baseDims);
	}
	/** 上报 wb.connector.transport.error.{auth|transport}；调用方需自行确保 wasConnected=true 避免 error→error 重复计数。 */
	transportError(connector, errorKind) {
		this.count(`wb.connector.transport.error.${errorKind}`, { connector });
	}
	/**
	* 上报 wb.connector.main.connect.{outcome}。
	* 调用方传入 durationMs 时贴 duration_ms dim（整数取整字符串）；快路径（cached/began）
	* 通常没有耗时数据，不打 duration_ms 让 dim 缺失（看板 filter 时按 __unknown__ 兜底）。
	*/
	connect(args) {
		const dims = {
			mcp_server: args.serverShortName,
			silent: String(args.silent)
		};
		if (args.errorKind) dims.error_kind = args.errorKind;
		if (args.durationMs !== void 0) dims.duration_ms = String(Math.max(0, Math.round(args.durationMs)));
		this.count(`wb.connector.main.connect.${args.outcome}`, dims);
	}
	/** 上报 wb.connector.main.disconnect.{outcome}。 */
	disconnect(args) {
		const dims = {
			mcp_server: args.serverShortName,
			reason: args.reason
		};
		if (args.errorKind) dims.error_kind = args.errorKind;
		if (args.durationMs !== void 0) dims.duration_ms = String(Math.max(0, Math.round(args.durationMs)));
		this.count(`wb.connector.main.disconnect.${args.outcome}`, dims);
	}
	/** 上报 wb.connector.list.{kind}.{outcome}，例如 wb.connector.list.tool.success。 */
	list(args) {
		const dims = { mcp_server: args.serverShortName };
		if (args.errorKind) dims.error_kind = args.errorKind;
		this.duration(`wb.connector.list.${args.kind}.${args.outcome}`, args.durationMs, dims);
	}
	/** 上报 wb.connector.oauth.callback.{outcome}。 */
	oauthCallback(args) {
		const dims = { mcp_server: args.serverShortName };
		if (args.errorKind) dims.error_kind = args.errorKind;
		this.duration(`wb.connector.oauth.callback.${args.outcome}`, args.durationMs, dims);
	}
};
//#endregion
//#region ../../packages/workbuddy-server/src/auth/external-link-authentication-provider.ts
var workbuddyAuthDevEnvProvider = {
	isOverrideEnabled: () => false,
	readDevEnv: () => void 0
};
function setWorkbuddyAuthDevEnvProvider(provider) {
	workbuddyAuthDevEnvProvider = provider;
}
var STAGING_SSO_DOMAIN_REWRITES = {
	"staging-sso.codebuddy.cn": "tencent.staging-sso.codebuddy.cn",
	"sso.copilot-staging.tencent.com": "tencent.sso.copilot-staging.tencent.com"
};
/** Prod → staging domain mapping for login URL fallback rewrite. */
var PROD_TO_STAGING_DOMAIN_REWRITES = {
	"www.codebuddy.cn": "staging.codebuddy.cn",
	"codebuddy.cn": "staging.codebuddy.cn",
	"copilot.tencent.com": "staging-copilot.tencent.com"
};
var WorkbuddyExternalLinkAuthenticationProvider = class WorkbuddyExternalLinkAuthenticationProvider extends require_common$2.ExternalLinkAuthenticationProvider {
	async support(ctx) {
		return (this.productManager.configuration.getValue()?.authentication?.type ?? require_file_authentication_storage.getWorkbuddyAuthenticationConfiguration()?.type) === require_common$2.AuthenticationType.CLI_EXTERNAL_LINK;
	}
	async openAuthUrl(authState) {
		if (workbuddyAuthDevEnvProvider.isOverrideEnabled() && workbuddyAuthDevEnvProvider.readDevEnv() === "staging") try {
			const url = new URL(authState.authUrl);
			const stagingDomain = PROD_TO_STAGING_DOMAIN_REWRITES[url.hostname];
			if (stagingDomain) {
				url.hostname = stagingDomain;
				authState = {
					...authState,
					authUrl: url.toString()
				};
			}
			const rewrittenSso = STAGING_SSO_DOMAIN_REWRITES[url.hostname];
			if (rewrittenSso) {
				url.hostname = rewrittenSso;
				authState = {
					...authState,
					authUrl: url.toString()
				};
			}
		} catch {}
		return super.openAuthUrl(authState);
	}
};
WorkbuddyExternalLinkAuthenticationProvider = require_common$2.__decorate([(0, import_common$1.Component)(require_common$2.AuthenticationProvider)], WorkbuddyExternalLinkAuthenticationProvider);
//#endregion
//#region ../../packages/workbuddy-server/src/auth/workbuddy-bootstrap-authentication-storage.ts
require_common$2.init_common();
require_common$2.init_common$3();
require_common$2.init_decorate();
var _ref$11;
var ACC_PRODUCT_CONFIG_ENV_KEYS = ["ACC_PRODUCT_CONFIG_V3", "ACC_PRODUCT_CONFIG_V2"];
var BOOTSTRAP_FILE_STORAGE_PRIORITY = require_common$2.AuthenticationStoragePriority.Heigh + 2;
var WorkbuddyBootstrapAuthenticationStorage = class WorkbuddyBootstrapAuthenticationStorage {
	fileAuthenticationStorage;
	get storeSessionSubject() {
		return this.fileAuthenticationStorage.storeSessionSubject;
	}
	async priority() {
		const authenticationType = this.getBootstrapAuthenticationType();
		if (!authenticationType || authenticationType === require_common$2.AuthenticationType.CUSTOM_TOKEN) return require_common$2.AuthenticationStoragePriority.Disabled;
		return BOOTSTRAP_FILE_STORAGE_PRIORITY;
	}
	async store(session, options) {
		await this.fileAuthenticationStorage.store(session, options);
	}
	async restore() {
		return this.fileAuthenticationStorage.restore();
	}
	async beginLogout() {
		return this.fileAuthenticationStorage.beginLogout();
	}
	async clean(options) {
		return this.fileAuthenticationStorage.clean(options);
	}
	getBootstrapAuthenticationType() {
		for (const key of ACC_PRODUCT_CONFIG_ENV_KEYS) {
			const value = require_workbuddy_product_config.readAgentCliProductConfigJsonByKey(key);
			if (!value) continue;
			try {
				const config = JSON.parse(value);
				if (config.authentication?.type) return config.authentication.type;
			} catch {}
		}
	}
};
require_common$2.__decorate([(0, import_common$1.Autowired)(require_file_authentication_storage.FileAuthenticationStorage), require_common$2.__decorateMetadata("design:type", typeof (_ref$11 = typeof require_file_authentication_storage.FileAuthenticationStorage !== "undefined" && require_file_authentication_storage.FileAuthenticationStorage) === "function" ? _ref$11 : Object)], WorkbuddyBootstrapAuthenticationStorage.prototype, "fileAuthenticationStorage", void 0);
WorkbuddyBootstrapAuthenticationStorage = require_common$2.__decorate([(0, import_common$1.Component)(require_common$2.AuthenticationStorage)], WorkbuddyBootstrapAuthenticationStorage);
//#endregion
//#region ../../packages/workbuddy-server/src/auth/workbuddy-authentication-manager.ts
require_common$2.init_common();
require_common$2.init_decorate();
var workbuddyAuthSessionSyncer = () => void 0;
function setWorkbuddyAuthSessionSyncer(syncer) {
	workbuddyAuthSessionSyncer = syncer;
}
var WorkbuddyAuthenticationManager = class WorkbuddyAuthenticationManager extends require_common$2.AuthenticationManagerImpl {
	/**
	* 同身份重复触发（token 刷新风暴）的去重不在这一层做——desktop coordinator 的
	* syncResolvedProduct 会用它自己的 getRemoteRefreshKey + TTL 吸收重复触发，
	* 去重与它保护的 /v3/config 拉取保持在同一层，身份维度只维护一份。
	*/
	async syncProductAfterSessionChange(session) {
		if (!session) return;
		await workbuddyAuthSessionSyncer(session);
	}
};
WorkbuddyAuthenticationManager = require_common$2.__decorate([(0, import_common$1.Component)({
	id: require_common$2.AuthenticationManager,
	rebind: true
})], WorkbuddyAuthenticationManager);
//#endregion
//#region ../../packages/workbuddy-server/src/runtime/userinfo-provider.ts
/**
* WorkBuddy app-server UserinfoProvider implementation.
*
* Lets @genie/telemetry's UserinfoEventProcessor read the current account from
* AuthenticationManager so EventService.report() events carry user identity
* fields consistently with the bundled agent-cli process.
*/
require_common$2.init_common();
require_common$2.init_decorateMetadata();
require_common$2.init_decorate();
var _ref$10;
var WorkbuddyUserinfoProvider = class WorkbuddyUserinfoProvider {
	authenticationManager;
	async provide() {
		const session = this.authenticationManager.currentSessionSubject.getValue();
		return {
			userId: session?.account.uid ?? "",
			userName: session?.account.nickname ?? "",
			userNickname: session?.account.nickname ?? "",
			enterpriseId: session?.account.enterpriseId,
			token: session?.auth.accessToken ?? "",
			enterprise: session?.account?.departmentFullName
		};
	}
};
require_common$2.__decorate([(0, import_common$1.Autowired)(require_common$2.AuthenticationManager), require_common$2.__decorateMetadata("design:type", typeof (_ref$10 = typeof require_common$2.AuthenticationManager !== "undefined" && require_common$2.AuthenticationManager) === "function" ? _ref$10 : Object)], WorkbuddyUserinfoProvider.prototype, "authenticationManager", void 0);
WorkbuddyUserinfoProvider = require_common$2.__decorate([(0, import_common$1.Component)({
	id: require_common$2.UserinfoProvider,
	rebind: true
})], WorkbuddyUserinfoProvider);
/** 把退出码格式化为 `0xXXXXXXXX`（大写 hex），用于日志。 */
function formatExitCodeHex(exitCode) {
	return `0x${(exitCode >>> 0).toString(16).toUpperCase()}`;
}
/**
* 面向用户/客服的退出码展示：
* - 大码（Windows NTSTATUS `0xCxxxxxxx` / DBG_TERMINATE 等 `>= 0x10000`）用 hex，
*   这是 Windows 退出码的习惯写法，客服凭 `0xC0000135` 直接可查。
* - 小码（Unix `126` / `127`、Windows `9009`）用十进制，符合命令行用户直觉，
*   `0x7F` 这种反而难认。
*/
function formatExitCodeForDisplay(exitCode) {
	const code = exitCode >>> 0;
	return code >= 65536 ? formatExitCodeHex(code) : String(exitCode);
}
/**
* 分类 CLI 子进程退出码。
*
* 命中即停：命令没找到 / 不可执行 / 被强制终止 / NTSTATUS 致命区间 → `startup-failed`；
* 其余算连接器执行出错。
*/
function classifyCliExit(exitCode) {
	const code = exitCode >>> 0;
	if (exitCode === 127 || exitCode === 126) return "startup-failed";
	if (code === 9009) return "startup-failed";
	if (code === 1073807364) return "startup-failed";
	if (code >= 3221225472 && code <= 3489660927) return "startup-failed";
	return "ran-with-error";
}
//#endregion
//#region ../../packages/workbuddy-server/src/connector/connector-locale.ts
/**
* 连接器界面语言判定（与 menu-i18n.ts::getMenuLocale 共用一套优先级链）
*
* 用作 `connector-service.ts` 决定 connector name / description 字段
* 中英文取值的唯一入口。抽成独立模块的目的：
*   - 让逻辑可被单测覆盖（不依赖 ConnectorService 内部状态）
*   - 与 `menu-i18n.ts` 同形，方便日后两处合并到同一份 helper
*
* 优先级：
*   1. 持久化配置 ~/.workbuddy/app/app-config.json#locale
*      （由 daemon AppConfigService 写入，renderer 不需要给 getConfigs 传 locale）
*   2. product 配置默认语言（国内 product 默认中文，海外 product 默认英文）
*   3. 兜底：runtime locale / 系统语言
*
* endpoint / productName 等 product 细节只在 caller 显式解析成 product locale 后传入；
* 本模块不直接猜测 product 结构，避免启动早期空配置被错判为英文（Issue #41817）。
*/
function defaultGetProductIsOversea() {}
function defaultGetProductLocale() {}
function defaultGetSystemLocale() {
	return require_runtime_context.getWorkbuddyRuntimeLocale();
}
function readPersistedLocale(configDir) {
	try {
		const configPath = (0, node_path.join)(configDir, "app", "app-config.json");
		if (!(0, node_fs.existsSync)(configPath)) return;
		const raw = JSON.parse((0, node_fs.readFileSync)(configPath, "utf-8"));
		return typeof raw?.locale === "string" ? raw.locale : void 0;
	} catch {
		return;
	}
}
/**
* 判断当前是否应使用英文显示连接器 name / description。
* 详细优先级见文件头注释。
*/
function isEnglishConnectorLocale(deps) {
	const getProductIsOversea = deps.getProductIsOversea ?? defaultGetProductIsOversea;
	const getProductLocale = deps.getProductLocale ?? defaultGetProductLocale;
	const getSystemLocale = deps.getSystemLocale ?? defaultGetSystemLocale;
	const persistedLocale = readPersistedLocale(deps.configDir);
	if (persistedLocale) return !persistedLocale.toLowerCase().startsWith("zh");
	const productLocale = getProductLocale();
	if (productLocale) return !productLocale.toLowerCase().startsWith("zh");
	const productIsOversea = getProductIsOversea();
	if (productIsOversea === true) return true;
	if (productIsOversea === false) return false;
	return !getSystemLocale().toLowerCase().startsWith("zh");
}
//#endregion
//#region ../../packages/workbuddy-server/src/connector/connector-server-side-oauth-refresher.ts
/** 提前刷新窗口（秒）：token 过期前多久开始刷 */
var REFRESH_BUFFER_SECONDS$1 = 300;
/** 兜底刷新间隔（毫秒）：云端不返回 expires_in 时用 */
var FALLBACK_REFRESH_INTERVAL_MS = 1200 * 1e3;
/** 临时失败重试间隔（毫秒） */
var TRANSIENT_RETRY_INTERVAL_MS = 60 * 1e3;
/** setTimeout 最大安全值（32 位有符号整数上限，约 24.8 天） */
var MAX_SAFE_TIMEOUT_MS$1 = 2147483647;
/** /accesstoken 响应中代表"不可恢复失败"的 HTTP 状态码（云端已清 Redis token） */
var TERMINAL_FAILURE_CODES = new Set([
	401,
	403,
	422
]);
/**
* /accesstoken 响应中代表「云端明确告知无 token / 需要重新授权」的业务错误码。
*
* - 10101: access token not found（云端 Redis 没 refresh_token，或已被 /revoke 清掉）
*
* 命中这些码时 refresher 必须 stop + disconnect，否则会无限次试图刷一个永远不存在的 token。
*/
var TERMINAL_BUSINESS_CODES = new Set([10101]);
var ConnectorServerSideOauthRefresher = class {
	entries = /* @__PURE__ */ new Map();
	constructor(getApiDeps, callbacks, logger) {
		this.getApiDeps = getApiDeps;
		this.callbacks = callbacks;
		this.logger = logger;
	}
	/**
	* 启动一个 connector 的刷新任务。
	*
	* 立即刷一次，之后按响应中的 expires_in 精确调度下一次。重复 schedule 会取消旧任务。
	*/
	schedule(configId, connectorName, options) {
		this.stop(configId);
		const entry = {
			configId,
			connectorName,
			timer: null
		};
		this.entries.set(configId, entry);
		this.logger?.info(`[ServerSideOauthRefresher] scheduled ${configId} (name=${connectorName})`);
		if (options?.initialAccessToken) {
			this.applyAccessToken(configId, connectorName, options.initialAccessToken).catch((err) => {
				this.logger?.warn(`[ServerSideOauthRefresher] apply initial token failed ${configId}: ${err?.message ?? err}`);
			}).finally(() => {
				const delayMs = this.computeNextDelay(options.initialExpiresIn);
				this.logger?.info(`[ServerSideOauthRefresher] scheduled ${configId} with initial token, next in ${delayMs}ms`);
				this.scheduleNextTimer(configId, connectorName, delayMs);
			});
			return;
		}
		this.refresh(configId, connectorName).catch((err) => {
			this.logger?.warn(`[ServerSideOauthRefresher] immediate refresh failed ${configId}: ${err?.message ?? err}`);
		});
	}
	/** 取消一个 connector 的刷新任务 */
	stop(configId) {
		const entry = this.entries.get(configId);
		if (!entry) return;
		if (entry.timer) clearTimeout(entry.timer);
		this.entries.delete(configId);
		this.logger?.info(`[ServerSideOauthRefresher] stopped ${configId}`);
	}
	/** 全部取消 */
	stopAll() {
		for (const entry of this.entries.values()) if (entry.timer) clearTimeout(entry.timer);
		this.entries.clear();
	}
	/** 是否已 schedule */
	isScheduled(configId) {
		return this.entries.has(configId);
	}
	/**
	* 单次尝试拿 token（不 schedule、不写磁盘、不触碰 entries），供 connectSkillOnly 同步使用。
	*
	* 用途：skill-only connector 的连接成功必须以"云端能给出 access_token"为前提，
	* 否则 skill 脚本后续无法获取 access_token，connector 形同废物。
	*
	* 返回值：
	* - ok=true：拿到 token
	* - ok=false + needsAuthorize=true：云端明确无 token（10101 / 401 / 403 / 422），需要走 /start 重新授权
	* - ok=false + needsAuthorize=false：网络或其他临时错误
	*/
	async tryFetchToken(connectorName) {
		let resp;
		try {
			const apiDeps = await this.getApiDeps();
			resp = await require_workbuddy_auth_product_coordinator.callConnectorOauthApi("GET", `/v2/as/connector/oauth/${connectorName}/accesstoken`, apiDeps);
		} catch (error) {
			return {
				ok: false,
				needsAuthorize: false,
				error: error instanceof Error ? error.message : String(error)
			};
		}
		if (resp?.code === 0 && resp?.data?.access_token) return {
			ok: true,
			token: resp.data.access_token,
			expiresIn: this.extractExpiresIn(resp.data)
		};
		const code = typeof resp?.code === "number" ? resp.code : -1;
		const msg = resp?.msg ?? "unknown";
		return {
			ok: false,
			needsAuthorize: TERMINAL_FAILURE_CODES.has(code) || TERMINAL_BUSINESS_CODES.has(code),
			error: `code=${code} msg=${msg}`
		};
	}
	/**
	* 执行一次 refresh。
	*
	* 公开此方法是因为 ConnectorService 在 connect 成功后可能希望显式触发一次。
	*/
	async refresh(configId, connectorName) {
		if (!this.entries.has(configId)) return;
		let resp;
		try {
			const apiDeps = await this.getApiDeps();
			resp = await require_workbuddy_auth_product_coordinator.callConnectorOauthApi("GET", `/v2/as/connector/oauth/${connectorName}/accesstoken`, apiDeps);
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			this.logger?.warn(`[ServerSideOauthRefresher] refresh(${configId}) threw: ${message}, retry in ${TRANSIENT_RETRY_INTERVAL_MS}ms`);
			this.scheduleNextTimer(configId, connectorName, TRANSIENT_RETRY_INTERVAL_MS);
			return;
		}
		if (resp?.code === 0 && resp?.data?.access_token) {
			const accessToken = resp.data.access_token;
			await this.applyAccessToken(configId, connectorName, accessToken);
			const expiresIn = this.extractExpiresIn(resp.data);
			const delayMs = this.computeNextDelay(expiresIn);
			this.logger?.info(`[ServerSideOauthRefresher] refresh(${configId}) ok, expires_in=${expiresIn ?? "unknown"}, next in ${delayMs}ms`);
			this.scheduleNextTimer(configId, connectorName, delayMs);
			return;
		}
		const code = typeof resp?.code === "number" ? resp.code : -1;
		const msg = resp?.msg ?? "unknown";
		if (TERMINAL_FAILURE_CODES.has(code) || TERMINAL_BUSINESS_CODES.has(code)) {
			const errorMsg = `code=${code} msg=${msg}`;
			this.logger?.warn(`[ServerSideOauthRefresher] refresh(${configId}) terminal failure ${errorMsg}, marking unauthorized`);
			this.stop(configId);
			if (this.callbacks.markUnauthorized) this.callbacks.markUnauthorized(configId, errorMsg);
			else try {
				await this.callbacks.disconnect(configId);
			} catch (error) {
				const message = error instanceof Error ? error.message : String(error);
				this.logger?.warn(`[ServerSideOauthRefresher] refresh(${configId}) disconnect on terminal failure threw: ${message}`);
			}
			return;
		}
		this.logger?.warn(`[ServerSideOauthRefresher] refresh(${configId}) transient failure code=${code} msg=${msg}, retry in ${TRANSIENT_RETRY_INTERVAL_MS}ms`);
		this.scheduleNextTimer(configId, connectorName, TRANSIENT_RETRY_INTERVAL_MS);
	}
	async applyAccessToken(configId, connectorName, accessToken) {
		let tokenHeaders;
		let headersApplied = false;
		try {
			tokenHeaders = this.callbacks.buildTokenHeaders ? this.callbacks.buildTokenHeaders(configId, connectorName, accessToken) : { Authorization: `Bearer ${accessToken}` };
			const result = await this.callbacks.updateHeaders(configId, tokenHeaders, true);
			if (!result.success) this.logger?.warn(`[ServerSideOauthRefresher] applyAccessToken(${configId}) updateHeaders failed: ${result.error}`);
			else headersApplied = true;
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			this.logger?.warn(`[ServerSideOauthRefresher] applyAccessToken(${configId}) updateHeaders threw: ${message}`);
		}
		if (headersApplied && tokenHeaders && this.callbacks.onTokenApplied) try {
			await this.callbacks.onTokenApplied(configId, connectorName, tokenHeaders);
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			this.logger?.warn(`[ServerSideOauthRefresher] applyAccessToken(${configId}) onTokenApplied threw: ${message}`);
		}
	}
	/**
	* 从 /accesstoken 响应 data 中提取 expires_in（秒）。
	* 兼容几种可能的字段名。
	*/
	extractExpiresIn(data) {
		if (typeof data?.expires_in === "number" && data.expires_in > 0) return data.expires_in;
		if (typeof data?.expiresIn === "number" && data.expiresIn > 0) return data.expiresIn;
		if (typeof data?.expires_at === "number" && data.expires_at > 0) {
			const nowSec = Math.floor(Date.now() / 1e3);
			const remaining = data.expires_at - nowSec;
			return remaining > 0 ? remaining : void 0;
		}
	}
	/**
	* 根据 expires_in 计算下次刷新的 delay（毫秒）。
	* - 有 expires_in：提前 REFRESH_BUFFER_SECONDS 刷新，最小 0（立即）
	* - 无 expires_in：用兜底 interval
	* - clamp 到 setTimeout 最大安全值
	*/
	computeNextDelay(expiresInSec) {
		if (expiresInSec === void 0) return FALLBACK_REFRESH_INTERVAL_MS;
		const delayMs = Math.max(0, expiresInSec - REFRESH_BUFFER_SECONDS$1) * 1e3;
		return Math.min(delayMs, MAX_SAFE_TIMEOUT_MS$1);
	}
	/** 设置下一次 refresh timer（会替换掉旧的） */
	scheduleNextTimer(configId, connectorName, delayMs) {
		const entry = this.entries.get(configId);
		if (!entry) return;
		if (entry.timer) clearTimeout(entry.timer);
		entry.timer = setTimeout(() => {
			entry.timer = null;
			this.refresh(configId, connectorName).catch((err) => {
				this.logger?.warn(`[ServerSideOauthRefresher] scheduled refresh failed ${configId}: ${err?.message ?? err}`);
			});
		}, delayMs);
	}
};
//#endregion
//#region ../../packages/workbuddy-server/src/connector/connector-states-persistence.ts
/**
* connector-states 的加密持久化层（issue #48593）
*
* 背景：TSRC #102305 修复 .credentials.json 明文存储后，遗漏了同目录的
* connector-states.json。该文件的 `headerOverrides` / `envOverrides` 两个字段
* 同样以**明文**存储真实凭据：
*   - headerOverrides[configId].Authorization = "Bearer <长效 access token>"
*   - headerOverrides[configId]["X-Oneid-Access-Token"] = "<企业身份 token>"
*   - envOverrides[configId][KEY] = "<用户填入的 API Key / Secret>"
* 文件被复制到任意机器即可冒用，与 .credentials.json 等价的账户接管风险。
*
* ## 迁移策略（与 .credentials.json 的 v1→v3 完全对齐）
*
*   - 加密文件：`connector-states.v3.json`
*   - 旧明文文件：`connector-states.json`，仅作**只读迁移源**
*   - 读：v3 存在 → 解密返回 + 顺手清理残留旧明文；
*         v3 不存在但旧明文存在 → 读旧明文 + 写 v3，**写成功立即删除旧明文**；
*         写失败 → 保留旧明文，下次启动再迁移
*   - 写：**只写 v3**，永不写旧明文（写旧明文等于绕过本次加密修复）
*   - 未登录态（cipher 不可用）→ **跳过持久化**（不写任何文件），与 OAuth store
*     的"匿名态拒写"口径一致，避免产生新的明文文件。登录后首次 load 触发迁移/写入。
*
* ## 复用的加密基建（与 .credentials.v3.json 同一套密钥）
*
*   - OAuthCipher                 : AES-256-GCM 字段级加解密
*   - ConnectorOAuthMasterKeyStore: 双备份 master.key（同 userId 同目录，零额外密钥管理）
*   - connector-oauth-acl         : 文件 / 目录 ACL enforce + verify + repair
*
* 加密范围（按需求仅加密敏感字段的 value）：
*   - 只加密 headerOverrides / envOverrides 的**每个 value**
*   - 其余字段（enabled / everConnected / userDisabled / disabledToolsOverrides /
*     mcpSecurityMigrated / accountIdentityKey / headerOverridesBearerStripped /
*     staleManagedAuthHeadersPurged）一律保持明文 —— 它们只是 ID 列表 / 标志位，
*     无敏感性，明文便于排查
*
* 安全模型同 connector-oauth-cipher.ts：防文件级跨机泄漏，不防同机同用户态恶意进程。
*/
var FILE_MODE = 384;
var STATES_V3_FILE_NAME = "connector-states.v3.json";
var STATES_LEGACY_FILE_NAME = "connector-states.json";
/** headerOverrides 字段在 AAD 中的 serverKey 前缀 */
var AAD_SCOPE_HEADER = "connector-states:headerOverrides";
/** envOverrides 字段在 AAD 中的 serverKey 前缀 */
var AAD_SCOPE_ENV = "connector-states:envOverrides";
/** 由 storageDir 推导出标准三件套路径 */
function resolveStatesFilePaths(storageDir, masterKeyBackupBaseDir) {
	return {
		storageDir,
		v3Path: (0, path.join)(storageDir, STATES_V3_FILE_NAME),
		legacyPath: (0, path.join)(storageDir, STATES_LEGACY_FILE_NAME),
		masterKeyBackupBaseDir
	};
}
function isAnonymousUser(userId) {
	return !userId || userId === "default";
}
/**
* 读 connector-states 状态。
*
* 顺序（与 ConnectorOAuthStore.read 对齐）：
*   1. 匿名态（userId='default'）→ 直接 return undefined，完全不碰磁盘。
*      登录前 connector 本就用不了；且 connectors/default/ 可能残留加密改造前
*      的历史明文凭据，匿名态绝不读取，避免把它们带回内存（CWE-312 纵深防御）。
*   2. v3 存在 → 解密返回 + 顺手清理残留旧明文
*   3. v3 不存在但旧明文存在 → 读旧明文 + 升级写 v3，**写成功立即删旧明文**
*   4. 都不存在 → undefined
*/
function readStates(opts) {
	const { paths, userId } = opts;
	if (isAnonymousUser(userId)) return;
	if ((0, fs.existsSync)(paths.storageDir)) ensureAclOk(paths.storageDir, "dir");
	if ((0, fs.existsSync)(paths.v3Path)) {
		const v3 = readV3(opts);
		if (v3 !== void 0) {
			purgeLegacyIfPresent(paths.legacyPath);
			return v3;
		}
		console.warn(`[states-persistence] v3 exists but unreadable: ${paths.v3Path}`);
		return;
	}
	const legacy = readLegacyPlain(paths.legacyPath);
	if (legacy) if (writeV3(opts, legacy)) purgeLegacyIfPresent(paths.legacyPath);
	else console.warn(`[states-persistence] legacy → v3 migration failed for user=${userId}; keeping legacy plaintext as fallback for next attempt`);
	return legacy;
}
/**
* 加密写入 connector-states.v3.json。原子写 + ACL enforce。
*
* - headerOverrides / envOverrides 的每个 value 单独 AES-256-GCM 加密；其余字段明文。
* - **只写 v3，永不写旧明文**（写旧明文等于绕过本次加密修复）。
* - 未登录态（cipher 不可用）→ 跳过持久化，返回 false（不产生任何明文文件）。
*/
function writeStates(opts, state) {
	if (isAnonymousUser(opts.userId)) return false;
	return writeV3(opts, state);
}
function writeV3(opts, state) {
	const { paths, userId } = opts;
	try {
		ensureStorageDir(paths.storageDir);
		const built = buildCipherForWrite(userId, paths.v3Path, paths.storageDir, paths.masterKeyBackupBaseDir);
		if (!built) {
			console.warn("[states-persistence] cipher unavailable, skip v3 write");
			return false;
		}
		const { cipher, header } = built;
		const persisted = {
			...extractNonSensitiveFields(state),
			version: 3,
			encryption: header,
			headerOverrides: encryptSensitiveMap(state.headerOverrides, AAD_SCOPE_HEADER, cipher),
			envOverrides: encryptSensitiveMap(state.envOverrides, AAD_SCOPE_ENV, cipher)
		};
		atomicWriteFile(paths.v3Path, JSON.stringify(persisted, null, 2));
		return true;
	} catch (err) {
		console.warn(`[states-persistence] writeV3 failed: ${String(err)}`);
		return false;
	}
}
function readV3(opts) {
	const { paths, userId } = opts;
	if (!ensureAclOk(paths.v3Path, "file")) console.warn(`[states-persistence] v3 ACL not clean: ${paths.v3Path}`);
	let raw;
	try {
		raw = JSON.parse((0, fs.readFileSync)(paths.v3Path, "utf-8"));
	} catch (err) {
		console.warn(`[states-persistence] readV3 parse failed: ${String(err)}`);
		return;
	}
	if (raw.version !== 3 || !raw.encryption) {
		console.warn("[states-persistence] readV3: missing version=3 or encryption header");
		return;
	}
	const cipher = buildCipherForRead(userId, raw.encryption, paths.storageDir, paths.masterKeyBackupBaseDir);
	if (!cipher) {
		console.warn("[states-persistence] cipher unavailable on read, sensitive overrides dropped");
		return {
			...extractNonSensitiveFields(raw),
			headerOverrides: {},
			envOverrides: {}
		};
	}
	return {
		...extractNonSensitiveFields(raw),
		headerOverrides: decryptSensitiveMap(raw.headerOverrides, AAD_SCOPE_HEADER, cipher),
		envOverrides: decryptSensitiveMap(raw.envOverrides, AAD_SCOPE_ENV, cipher)
	};
}
/** 仅读旧明文文件，不迁移、不解密、不删 */
function readLegacyPlain(legacyPath) {
	if (!(0, fs.existsSync)(legacyPath)) return;
	try {
		const raw = JSON.parse((0, fs.readFileSync)(legacyPath, "utf-8"));
		return {
			...extractNonSensitiveFields(raw),
			headerOverrides: coercePlainMap(raw.headerOverrides),
			envOverrides: coercePlainMap(raw.envOverrides)
		};
	} catch (err) {
		console.warn(`[states-persistence] readLegacy parse failed: ${String(err)}`);
		return;
	}
}
/** 删除旧明文文件（迁移成功后 / v3 正常时的防御性补刀）。失败仅 warn 不抛。 */
function purgeLegacyIfPresent(legacyPath) {
	if (!(0, fs.existsSync)(legacyPath)) return;
	try {
		(0, fs.unlinkSync)(legacyPath);
		console.log(`[states-persistence] removed legacy plaintext after v3 active: ${legacyPath}`);
	} catch (err) {
		console.warn(`[states-persistence] failed to remove legacy plaintext at ${legacyPath}: ${String(err)}`);
	}
}
function encryptSensitiveMap(map, scope, cipher) {
	const out = {};
	for (const [configId, fields] of Object.entries(map)) {
		const encFields = {};
		for (const [key, value] of Object.entries(fields)) encFields[key] = cipher.encrypt(value, {
			serverKey: `${scope}:${configId}`,
			fieldName: key
		});
		out[configId] = encFields;
	}
	return out;
}
function decryptSensitiveMap(map, scope, cipher) {
	const out = {};
	if (!map) return out;
	for (const [configId, fields] of Object.entries(map)) {
		const plainFields = {};
		for (const [key, value] of Object.entries(fields)) {
			const plain = decryptValue(value, `${scope}:${configId}`, key, cipher);
			if (plain !== void 0) plainFields[key] = plain;
		}
		out[configId] = plainFields;
	}
	return out;
}
/**
* 解密单个 value。兼容：
*  - string → 明文残留（迁移源遗留），直接返回
*  - CipherEnvelope → 走 cipher 解密；失败时返回 undefined（跳过该字段）
*/
function decryptValue(value, serverKey, fieldName, cipher) {
	if (typeof value === "string") return value;
	if (require_workbuddy_auth_product_coordinator.isCipherEnvelope(value)) try {
		return cipher.decrypt(value, {
			serverKey,
			fieldName
		});
	} catch (err) {
		console.warn(`[states-persistence] decrypt failed (${serverKey}.${fieldName}): ${String(err)}`);
		return;
	}
}
/** 从持久化数据 / 业务状态中抽出非敏感字段（不含 header/env/version/encryption） */
function extractNonSensitiveFields(src) {
	return {
		enabled: coerceStringArray(src.enabled),
		headerOverridesBearerStripped: src.headerOverridesBearerStripped,
		staleManagedAuthHeadersPurged: src.staleManagedAuthHeadersPurged,
		accountIdentityKey: src.accountIdentityKey,
		everConnected: coerceOptionalStringArray(src.everConnected),
		userDisabled: coerceConnectorUserDisabledState(src.userDisabled),
		disabledToolsOverrides: coerceStringArrayMap(src.disabledToolsOverrides),
		mcpSecurityMigrated: src.mcpSecurityMigrated,
		cSideAutoBoundDefaultDisabledMigrated: src.cSideAutoBoundDefaultDisabledMigrated
	};
}
function coerceStringArray(value) {
	if (!Array.isArray(value)) return [];
	return value.filter((item) => typeof item === "string");
}
function coerceOptionalStringArray(value) {
	if (!Array.isArray(value)) return;
	return coerceStringArray(value);
}
function coerceConnectorUserDisabledState(value) {
	if (Array.isArray(value)) return value.reduce((result, item) => {
		if (typeof item === "string") result[item] = true;
		return result;
	}, {});
	if (!value || typeof value !== "object") return {};
	const result = {};
	for (const [key, item] of Object.entries(value)) if (typeof item === "boolean") result[key] = item;
	return result;
}
function coerceStringArrayMap(value) {
	if (!value || typeof value !== "object" || Array.isArray(value)) return {};
	const result = {};
	for (const [key, item] of Object.entries(value)) {
		const items = coerceStringArray(item);
		if (items.length > 0) result[key] = items;
	}
	return result;
}
/** 把磁盘上的 sensitive map 强制视为明文（旧文件迁移源）；非 string 的 value 丢弃 */
function coercePlainMap(map) {
	const out = {};
	if (!map) return out;
	for (const [configId, fields] of Object.entries(map)) {
		const plainFields = {};
		for (const [key, value] of Object.entries(fields)) if (typeof value === "string") plainFields[key] = value;
		out[configId] = plainFields;
	}
	return out;
}
function ensureStorageDir(storageDir) {
	if (!(0, fs.existsSync)(storageDir)) (0, fs.mkdirSync)(storageDir, {
		recursive: true,
		mode: 448
	});
	require_workbuddy_auth_product_coordinator.enforceDirAcl(storageDir);
}
/**
* 检查路径 ACL：通过 → true；失败 → repair + 二次 verify。
* connector-states 不因 ACL 失败拒读（敏感字段已加密），只 enforce 收紧权限。
*/
function ensureAclOk(targetPath, kind) {
	const verify = kind === "file" ? require_workbuddy_auth_product_coordinator.verifyFileAcl : require_workbuddy_auth_product_coordinator.verifyDirAcl;
	const initial = verify(targetPath);
	if (initial.ok) return true;
	if (initial.recoverable) require_workbuddy_auth_product_coordinator.tryRepairAcl(targetPath, kind);
	return verify(targetPath).ok;
}
/**
* 原子写文件 + 严格 ACL（与 connector-oauth-persistence.atomicWriteFile 同款）：
*   1. O_CREAT mode 0600 创建 tmp（避免 open→chmod 间的宽松窗口）
*   2. 写入 + fchmod 双保险
*   3. close → rename → finalPath
*   4. enforceFileAcl（POSIX chmod / Windows icacls）
*/
function atomicWriteFile(finalPath, content) {
	const tmpPath = `${finalPath}.tmp-${process.pid}-${Date.now()}`;
	const fd = (0, fs.openSync)(tmpPath, "w", FILE_MODE);
	try {
		(0, fs.writeSync)(fd, content);
		(0, fs.fchmodSync)(fd, FILE_MODE);
	} finally {
		(0, fs.closeSync)(fd);
	}
	try {
		(0, fs.renameSync)(tmpPath, finalPath);
	} catch (renameErr) {
		try {
			(0, fs.rmSync)(tmpPath, { force: true });
		} catch {}
		throw renameErr;
	}
	try {
		(0, fs.chmodSync)(finalPath, FILE_MODE);
	} catch {}
	require_workbuddy_auth_product_coordinator.enforceFileAcl(finalPath);
}
function buildCipherForRead(userId, header, primaryDir, backupBaseDir) {
	const masterKey = loadMasterKey(userId, primaryDir, backupBaseDir);
	if (!masterKey) return;
	try {
		return new require_workbuddy_auth_product_coordinator.OAuthCipher({
			userId,
			masterKey,
			header
		});
	} catch (err) {
		console.warn(`[states-persistence] cipher build (read) failed: ${String(err)}`);
		return;
	}
}
function buildCipherForWrite(userId, v3Path, primaryDir, backupBaseDir) {
	const masterKey = loadOrCreateMasterKey(userId, primaryDir, backupBaseDir);
	if (!masterKey) return;
	const existingHeader = tryReadEncryptionHeader(v3Path);
	const initialHeader = existingHeader ?? require_workbuddy_auth_product_coordinator.createHeader(userId, masterKey);
	try {
		return {
			cipher: new require_workbuddy_auth_product_coordinator.OAuthCipher({
				userId,
				masterKey,
				header: initialHeader
			}),
			header: initialHeader
		};
	} catch (err) {
		if (existingHeader) {
			console.warn(`[states-persistence] existing header mismatch (${String(err)}), rebuilding with fresh header`);
			try {
				const freshHeader = require_workbuddy_auth_product_coordinator.createHeader(userId, masterKey);
				return {
					cipher: new require_workbuddy_auth_product_coordinator.OAuthCipher({
						userId,
						masterKey,
						header: freshHeader
					}),
					header: freshHeader
				};
			} catch (err2) {
				console.warn(`[states-persistence] cipher rebuild failed: ${String(err2)}`);
				return;
			}
		}
		console.warn(`[states-persistence] cipher build (write) failed: ${String(err)}`);
		return;
	}
}
function tryReadEncryptionHeader(v3Path) {
	if (!(0, fs.existsSync)(v3Path)) return;
	try {
		const raw = JSON.parse((0, fs.readFileSync)(v3Path, "utf-8"));
		if (raw.version === 3 && raw.encryption) return raw.encryption;
	} catch {}
}
function loadMasterKey(userId, primaryDir, backupBaseDir) {
	if (isAnonymousUser(userId)) return;
	try {
		return new require_workbuddy_auth_product_coordinator.ConnectorOAuthMasterKeyStore({
			userId,
			primaryDir,
			backupBaseDir
		}).getExisting()?.key;
	} catch (err) {
		console.warn(`[states-persistence] loadMasterKey failed: ${String(err)}`);
		return;
	}
}
function loadOrCreateMasterKey(userId, primaryDir, backupBaseDir) {
	try {
		return new require_workbuddy_auth_product_coordinator.ConnectorOAuthMasterKeyStore({
			userId,
			primaryDir,
			backupBaseDir
		}).getOrCreate().key;
	} catch (err) {
		console.warn(`[states-persistence] loadOrCreateMasterKey failed: ${String(err)}`);
		return;
	}
}
//#endregion
//#region ../../packages/workbuddy-server/src/connector/connector-token-refresher.ts
/** 提前刷新的缓冲时间（秒） */
var REFRESH_BUFFER_SECONDS = 300;
/** setTimeout 最大安全值（32 位有符号整数上限，约 24.8 天） */
var MAX_SAFE_TIMEOUT_MS = 2147483647;
var ConnectorTokenRefresher = class {
	timers = /* @__PURE__ */ new Map();
	oauthStore;
	callbacks;
	/** 每个 configId 对应的 server 配置，用于 refresh 时读取 token */
	serverConfigs = /* @__PURE__ */ new Map();
	constructor(oauthStore, callbacks = {}) {
		this.oauthStore = oauthStore;
		this.callbacks = callbacks;
	}
	/**
	* Token 保存后调用，计算并设置精确的刷新定时器
	*/
	scheduleRefresh(configId, serverUrl, tokens, headers) {
		this.cancelRefresh(configId);
		if (!tokens.refresh_token || !tokens.expires_in) return;
		this.serverConfigs.set(configId, {
			serverUrl,
			headers
		});
		const delayMs = Math.max(0, (tokens.expires_in - REFRESH_BUFFER_SECONDS) * 1e3);
		if (delayMs > MAX_SAFE_TIMEOUT_MS) {
			this.callbacks.log?.(`[TokenRefresher] Token for ${configId} expires in ${Math.round(delayMs / 1e3)}s (>${Math.round(MAX_SAFE_TIMEOUT_MS / 1e3)}s), skipping scheduled refresh`);
			return;
		}
		this.callbacks.log?.(`[TokenRefresher] Scheduled refresh for ${configId} in ${Math.round(delayMs / 1e3)}s`);
		const timer = setTimeout(async () => {
			this.timers.delete(configId);
			await this.doRefresh(configId);
		}, delayMs);
		this.timers.set(configId, timer);
	}
	async refreshNow(configId, serverUrl, headers) {
		this.cancelRefresh(configId);
		this.serverConfigs.set(configId, {
			serverUrl,
			headers
		});
		await this.doRefresh(configId);
	}
	/**
	* 取消某个 connector 的刷新定时器
	*/
	cancelRefresh(configId) {
		const timer = this.timers.get(configId);
		if (timer) {
			clearTimeout(timer);
			this.timers.delete(configId);
		}
		this.serverConfigs.delete(configId);
	}
	/**
	* 停止所有定时器
	*/
	dispose() {
		for (const timer of this.timers.values()) clearTimeout(timer);
		this.timers.clear();
		this.serverConfigs.clear();
	}
	async doRefresh(configId) {
		const serverConfig = this.serverConfigs.get(configId);
		if (!serverConfig) return;
		const { serverUrl, headers } = serverConfig;
		this.callbacks.log?.(`[TokenRefresher] Refreshing token for ${configId}`);
		try {
			const currentTokens = this.oauthStore.loadTokens(configId, serverUrl, headers);
			if (!currentTokens?.refresh_token) {
				this.callbacks.log?.(`[TokenRefresher] No refresh_token for ${configId}, skipping`);
				return;
			}
			let clientInfo = this.oauthStore.loadClientInfo(configId, serverUrl, headers);
			let clientInfoFromMemory = false;
			if (!clientInfo?.client_id) {
				const memoryClientInfo = this.callbacks.getMemoryClientInfo?.(configId);
				if (memoryClientInfo?.client_id) {
					clientInfo = memoryClientInfo;
					clientInfoFromMemory = true;
					this.callbacks.log?.(`[TokenRefresher] Disk client_id missing for ${configId}, falling back to memory clientInfo (Issue #62378)`);
				} else throw new Error(`Missing OAuth client info for ${configId}`);
			}
			const { refreshAuthorization, discoverOAuthProtectedResourceMetadata, discoverAuthorizationServerMetadata } = await Promise.resolve().then(() => require("./auth.js")).then((n) => n.auth_exports);
			let authServerUrl;
			try {
				authServerUrl = (await discoverOAuthProtectedResourceMetadata(serverUrl)).authorization_servers?.[0] || new URL(serverUrl).origin;
			} catch {
				authServerUrl = new URL(serverUrl).origin;
			}
			const metadata = await discoverAuthorizationServerMetadata(authServerUrl);
			const newTokens = await refreshAuthorization(authServerUrl, {
				metadata,
				clientInformation: clientInfo,
				refreshToken: currentTokens.refresh_token
			});
			this.oauthStore.saveTokens(configId, serverUrl, newTokens, headers);
			if (clientInfoFromMemory && clientInfo) {
				this.oauthStore.saveClientInfo(configId, serverUrl, clientInfo, headers);
				this.callbacks.log?.(`[TokenRefresher] Backfilled disk client_id for ${configId} after memory-fallback refresh (Issue #62378)`);
			}
			this.callbacks.log?.(`[TokenRefresher] Token refreshed for ${configId}, expires_in=${newTokens.expires_in}`);
			this.callbacks.onRefreshSuccess?.(configId, newTokens);
			this.scheduleRefresh(configId, serverUrl, newTokens, headers);
		} catch (error) {
			this.callbacks.log?.(`[TokenRefresher] Refresh failed for ${configId}: ${error}`);
			this.callbacks.onRefreshFailed?.(configId, String(error));
		}
	}
};
//#endregion
//#region ../../packages/workbuddy-server/src/connector/ioa-server-side-auth.ts
var IOA_MCP_DOMAIN_SUFFIXES = [
	".mcp.it.woa.com",
	".mcp.woa.com",
	".knot.woa.com"
];
var IOA_OAUTH_NAME_PREFIX = "internal_taihu-";
var SAFE_OAUTH_NAME_PATTERN = /^[a-zA-Z0-9_-]+$/;
var IOA_AUTH_TIMEOUT_MS = 3e5;
var IOA_AUTH_POLL_INTERVAL_MS = 2e3;
/**
* IOA 服务端 MCP OAuth 认证管理。
*
* 职责：检测 IOA 域名 → 获取/刷新 token → 装饰 server config → 撤销 token。
* 被 ConnectorMcpProxy 内部使用，ConnectorService 通过 deps bag 提供基础依赖。
*/
var IoaServerSideAuth = class {
	constructor(deps) {
		this.deps = deps;
	}
	/**
	* 检查 server config 是否匹配 IOA 域名 (*.mcp.it.woa.com / *.mcp.woa.com / *.knot.woa.com) 且用户是 IOA 企业。
	* 返回 { oauthName } 或 undefined。
	*/
	resolveHostRule(serverConfig) {
		const url = serverConfig?.url;
		if (!url) return;
		let hostname;
		try {
			hostname = new URL(url).hostname;
		} catch {
			return;
		}
		if (!this.isIoaMcpHostname(hostname)) return;
		if (!require_workbuddy_auth_product_coordinator.isIOAEnterprise(this.deps.getEnterpriseId())) return;
		const explicitOauthName = serverConfig?._workbuddyManagedAuthOauthName;
		if (typeof explicitOauthName === "string" && explicitOauthName.length > 0) {
			if (this.isSafeOauthName(explicitOauthName)) return { oauthName: explicitOauthName };
			this.deps.logger.warn(`[IoaServerSideAuth] resolveHostRule: invalid explicit oauthName ignored, url=${url}`);
		}
		return { oauthName: this.deriveOauthName(url) };
	}
	/**
	* 根据 URL 推导 oauthName（用于已知 URL 的 token 撤销场景）。
	* 不检查 enterpriseId（撤销时可能已不在 IOA 企业上下文中）。
	*/
	resolveOauthNameByUrl(url) {
		if (!url) return;
		let hostname;
		try {
			hostname = new URL(url).hostname;
		} catch {
			return;
		}
		if (!this.isIoaMcpHostname(hostname)) return;
		return this.deriveOauthName(url);
	}
	isIoaMcpHostname(hostname) {
		return IOA_MCP_DOMAIN_SUFFIXES.some((suffix) => hostname.endsWith(suffix));
	}
	isSafeOauthName(oauthName) {
		return SAFE_OAUTH_NAME_PATTERN.test(oauthName);
	}
	/**
	* 从 URL 生成 oauthName：去掉 scheme，对剩余部分 sha256 取前 12 位，拼 internal_taihu- 前缀。
	*/
	deriveOauthName(url) {
		const withoutScheme = url.replace(/^https?:\/\//, "");
		return `${IOA_OAUTH_NAME_PREFIX}${crypto.createHash("sha256").update(withoutScheme).digest("hex").slice(0, 12)}`;
	}
	/**
	* 从服务端获取已有的 access token。返回 token 字符串或 undefined。
	*/
	async fetchAccessToken(rule) {
		const resp = await this.callApi("GET", `/v2/as/connector/oauth/${rule.oauthName}/accesstoken`);
		if (resp?.code === 0 && typeof resp?.data?.access_token === "string" && resp.data.access_token.length > 0) return resp.data.access_token;
	}
	/**
	* 发起交互式授权：POST /start → 打开浏览器 → 轮询 /status 直到 authorized。
	* @param onBrowserOpened 浏览器打开后、轮询开始前的回调（可选），供调用方更新 UI 状态。
	*/
	async startAuthorization(rule, signal, onBrowserOpened) {
		await this.revokeToken(rule.oauthName);
		const authorizeUrl = await this.callStartAuthorization(rule);
		await this.openBrowser(authorizeUrl);
		onBrowserOpened?.();
		await this.pollAuthStatus(rule, signal);
	}
	/**
	* 第一步：POST /start 获取 authorize_url。
	* 返回 authorize_url 字符串，失败时抛异常。
	*/
	async callStartAuthorization(rule) {
		const startResp = await this.callApi("POST", `/v2/as/connector/oauth/${rule.oauthName}/start`);
		const authorizeUrl = startResp?.data?.authorize_url ?? startResp?.data?.authorizeUrl;
		if (startResp?.code !== 0) throw new Error(startResp?.msg || `Failed to start OAuth for ${rule.oauthName}`);
		if (typeof authorizeUrl !== "string" || authorizeUrl.length === 0) throw new Error("IOA 授权服务未返回 authorize_url，请稍后重试");
		return authorizeUrl;
	}
	/**
	* 第二步：打开浏览器。
	*/
	async openBrowser(authorizeUrl) {
		await this.deps.openExternal(authorizeUrl);
	}
	/**
	* 编排器：解析 token（获取已有 token 或发起交互式授权）。
	* 返回 IoaServerSideAuthResult 或 undefined（不匹配 IOA 规则）。
	* @param options.onBrowserOpened 浏览器打开后回调，供调用方更新 UI 状态（如标记 needsAuth）。
	*/
	async resolveToken(serverConfig, options, signal) {
		const rule = this.resolveHostRule(serverConfig);
		if (!rule) return;
		try {
			let accessToken;
			if (options.interactive) {
				await this.startAuthorization(rule, signal, options.onBrowserOpened);
				accessToken = await this.fetchAccessToken(rule);
			} else accessToken = await this.fetchAccessToken(rule);
			if (!accessToken) return {
				success: false,
				needsAuthorize: true,
				error: `server-side token missing for oauthName=${rule.oauthName}`,
				rule
			};
			return {
				success: true,
				accessToken,
				rule
			};
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			this.deps.logger.error(`[IoaServerSideAuth] resolveToken(${rule.oauthName}): ${message}`);
			if (message.includes("HTTP 404") || message.includes("connector not found")) return;
			return {
				success: false,
				needsAuthorize: options.interactive,
				error: `oauthName=${rule.oauthName}: ${message}`,
				rule
			};
		}
	}
	abortControllers = /* @__PURE__ */ new Map();
	/**
	* doConnect 的 IOA 编排入口。
	*
	* 非交互式（silent=true）：静默获取 token → 成功则返回 decorated config，失败返回 undefined 让调用方 fall through。
	* 交互式（silent=false）：打开浏览器 → 后台 poll → poll 完成后调 onAuthorized 回调自动重连。
	*   doConnect 立即返回 `{ handled: true }` 让调用方返回 needsAuth，不阻塞 inFlightConnects。
	*
	* @returns
	*   - `{ handled: true }` — IOA 已接管（交互式：浏览器已打开，后台 poll 中；doConnect 应立即返回 needsAuth）
	*   - `{ handled: false, serverConfig }` — 非交互式：token 已注入到 serverConfig（或未匹配 IOA），doConnect 继续标准流程
	*/
	async handleConnect(configId, serverConfig, silent, callbacks) {
		const rule = this.resolveHostRule(serverConfig);
		if (!rule) return {
			handled: false,
			serverConfig
		};
		const existing = this.abortControllers.get(configId);
		if (existing) {
			try {
				existing.abort();
			} catch {}
			this.abortControllers.delete(configId);
		}
		const controller = new AbortController();
		this.abortControllers.set(configId, controller);
		if (!silent) try {
			await this.revokeToken(rule.oauthName);
			const authorizeUrl = await this.callStartAuthorization(rule);
			await this.openBrowser(authorizeUrl);
			callbacks.onNeedsAuth();
			this.pollAuthStatus(rule, controller.signal).then(async () => {
				this.abortControllers.delete(configId);
				const accessToken = await this.fetchAccessToken(rule);
				if (accessToken) {
					const decorated = this.decorateConfig(serverConfig, rule, accessToken);
					await callbacks.onAuthorized(decorated);
				}
			}).catch((err) => {
				this.abortControllers.delete(configId);
				const msg = err instanceof Error ? err.message : String(err);
				this.deps.logger.warn(`[IoaServerSideAuth] handleConnect(${configId}): background authorization failed: ${msg}`);
			});
			return { handled: true };
		} catch (e) {
			this.abortControllers.delete(configId);
			const msg = e instanceof Error ? e.message : String(e);
			if (msg.includes("HTTP 404") || msg.includes("connector not found")) {
				this.deps.logger.warn(`[IoaServerSideAuth] handleConnect(${configId}): server-side auth unavailable, falling back to local OAuth`);
				return {
					handled: false,
					serverConfig
				};
			}
			throw e;
		}
		else try {
			const accessToken = await this.fetchAccessToken(rule);
			this.abortControllers.delete(configId);
			if (accessToken) return {
				handled: false,
				serverConfig: this.decorateConfig(serverConfig, rule, accessToken)
			};
			return {
				handled: false,
				serverConfig
			};
		} catch (e) {
			this.abortControllers.delete(configId);
			const msg = e instanceof Error ? e.message : String(e);
			if (msg.includes("HTTP 404") || msg.includes("connector not found")) return {
				handled: false,
				serverConfig
			};
			throw e;
		}
	}
	/** 取消指定 configId 的进行中 poll（供外部 disconnect 时调用）。 */
	abortPendingAuth(configId) {
		const controller = this.abortControllers.get(configId);
		if (controller) {
			try {
				controller.abort();
			} catch {}
			this.abortControllers.delete(configId);
		}
	}
	/**
	* 装饰 server config：注入 Authorization header + managed auth 标记。
	*/
	decorateConfig(serverConfig, rule, accessToken) {
		const headers = { ...serverConfig.headers ?? {} };
		if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;
		return {
			...serverConfig,
			...Object.keys(headers).length > 0 ? { headers } : {},
			_workbuddyManagedAuth: "server-side",
			_workbuddyManagedAuthOauthName: rule.oauthName
		};
	}
	/**
	* 撤销指定 oauthName 的服务端 token。
	*/
	async revokeToken(oauthName) {
		await this.callApi("POST", `/v2/as/connector/oauth/${oauthName}/revoke`);
	}
	/**
	* 第三步：轮询 /status 直到 authorized/connected，或超时/abort。
	*/
	async pollAuthStatus(rule, signal) {
		const deadline = Date.now() + IOA_AUTH_TIMEOUT_MS;
		while (Date.now() < deadline) {
			if (signal?.aborted) throw new Error(`[${rule.oauthName}] auth polling aborted`);
			await this.sleep(IOA_AUTH_POLL_INTERVAL_MS, signal);
			if (signal?.aborted) throw new Error(`[${rule.oauthName}] auth polling aborted`);
			const statusResp = await this.callApi("GET", `/v2/as/connector/oauth/${rule.oauthName}/status`);
			const status = statusResp?.data?.status ?? statusResp?.status;
			if (status === "authorized" || status === "connected") return;
			if (status === "expired") throw new Error(`[${rule.oauthName}] auth expired`);
		}
		throw new Error(`[${rule.oauthName}] auth polling timed out`);
	}
	sleep(ms, signal) {
		return new Promise((resolve) => {
			if (signal?.aborted) {
				resolve();
				return;
			}
			const timer = setTimeout(() => {
				signal?.removeEventListener("abort", onAbort);
				resolve();
			}, ms);
			const onAbort = () => {
				clearTimeout(timer);
				resolve();
			};
			signal?.addEventListener("abort", onAbort, { once: true });
		});
	}
	async callApi(method, path) {
		const endpoint = this.deps.getApiEndpoint();
		const apiDeps = {
			productManager: { getEndpoint: () => endpoint },
			authenticationManager: { buildAuthHeaders: this.deps.buildAuthHeaders },
			fetch: this.deps.fetch
		};
		try {
			return await require_workbuddy_auth_product_coordinator.callConnectorOauthApi(method, path, apiDeps);
		} catch (e) {
			const msg = e instanceof Error ? e.message : String(e);
			this.deps.logger.error(`[IoaServerSideAuth] callApi ${method} ${path}: error=${msg}`);
			throw e;
		}
	}
};
//#endregion
//#region ../../packages/workbuddy-server/src/connector/json-file-cache.ts
/**
* 单文件 JSON 配置的 mtime/size 失效缓存。
*
* 适用形态：
*   - 路径稳定（同一进程生命周期内不变）
*   - 内容是合法 JSON
*   - 文件由本进程或外部 watcher 监听的方式修改（writeFileSync 会刷 mtime）
*
* 命中规则：当前 stat 的 (mtimeMs, size) 与上次缓存时一致 → 直接返回上次的解析结果，
* 跳过 readFileSync + JSON.parse。任一变化或文件不存在 → 重新读、解析并刷新缓存。
*
* 注意：fs.watch 防抖会让"刚写完立刻读"出现 mtime 没变的极短窗口（通常 < 10ms），
* 调用方在写文件后必须主动 invalidate（writeFileSync → invalidate(path)），不要依赖
* stat 把刚写的内容反馈出来。
*/
var JsonFileCache = class {
	entries = /* @__PURE__ */ new Map();
	constructor(read) {
		this.read = read;
	}
	get(filePath) {
		let stat;
		try {
			stat = (0, fs.statSync)(filePath);
		} catch {
			this.entries.delete(filePath);
			return this.read(filePath);
		}
		const cached = this.entries.get(filePath);
		if (cached && cached.mtimeMs === stat.mtimeMs && cached.size === stat.size) return cached.value;
		const value = this.read(filePath);
		this.entries.set(filePath, {
			mtimeMs: stat.mtimeMs,
			size: stat.size,
			value
		});
		return value;
	}
	invalidate(filePath) {
		if (filePath === void 0) {
			this.entries.clear();
			return;
		}
		this.entries.delete(filePath);
	}
};
function safeReadJsonFile(filePath, fallback) {
	try {
		const content = (0, fs.readFileSync)(filePath, "utf-8");
		return JSON.parse(content);
	} catch {
		return fallback;
	}
}
var TtlMemoCache = class {
	cached;
	constructor(compute, ttlMs) {
		this.compute = compute;
		this.ttlMs = ttlMs;
	}
	get() {
		if (this.cached && Date.now() - this.cached.at < this.ttlMs) return this.cached.value;
		const value = this.compute();
		this.cached = {
			value,
			at: Date.now()
		};
		return value;
	}
	invalidate() {
		this.cached = void 0;
	}
};
//#endregion
//#region ../../packages/workbuddy-server/src/connector/mcp-custom-defaults.ts
/**
* Default seed MCP servers for the custom MCP config (`~/.workbuddy/mcp.json`).
*
* These are the officially published MCP Apps reference servers from
* `@modelcontextprotocol/server-*`. Shipping them as first-run seed
* entries gives the desktop test build a demoable MCP Apps Host
* experience out of the box — users can open the right-side detail
* panel, switch to the `MCP Apps` tab, and exercise at least the
* `budget-allocator` / `cohort-heatmap` apps without having to hand-
* author a JSON config first.
*
* Design notes:
*
* - Seeding is strictly first-run: we only write these when
*   `~/.workbuddy/mcp.json` does not already exist. Subsequent launches
*   read whatever is on disk, so user edits are never clobbered.
* - `disabled: false` on `budget-allocator` + `cohort-heatmap` mirrors
*   their status as the verified demo path from the QA session that
*   motivated this seed list. The other examples ship without an
*   explicit `disabled` field, matching the upstream configuration
*   snippet so they are also enabled but can be turned off via the
*   `listMcpServers` / `toggleMcpServer` flow in the UI.
* - The `command` / `args` strings are deliberately kept identical to
*   the snippet the user validated, including `--silent` and the
*   `--registry=https://registry.npmjs.org/` override. Do not prune
*   these without confirming the tested install path still works
*   behind corporate npm registries.
* - `npx -y --silent` will transparently download the package on first
*   spawn if it is not in the npm cache. This is acceptable for a
*   demo build; production deployments should pre-populate the cache
*   or replace these entries with vendored binaries.
*/
var bundledAssetResolver = defaultResolveBundledAsset;
function setConnectorBundledAssetResolver(resolver) {
	bundledAssetResolver = resolver;
}
function defaultResolveBundledAsset(...segments) {
	const appPath = require_runtime_context.getWorkbuddyRuntimeAppPath();
	const resourcesPath = process.env.WORKBUDDY_RESOURCES_PATH?.trim();
	const candidates = [
		(0, node_path.join)(appPath, ...segments),
		(0, node_path.join)(appPath, "resources", ...segments),
		(0, node_path.join)(appPath, "..", "resources", ...segments),
		resourcesPath ? (0, node_path.join)(resourcesPath, ...segments) : void 0,
		resourcesPath ? (0, node_path.join)(resourcesPath, "resources", ...segments) : void 0,
		resourcesPath ? (0, node_path.join)(resourcesPath, "app.asar.unpacked", ...segments) : void 0,
		resourcesPath ? (0, node_path.join)(resourcesPath, "app.asar.unpacked", "resources", ...segments) : void 0
	];
	for (const candidate of candidates) if (candidate && (0, node_fs.existsSync)(candidate)) return candidate;
}
var BUILTIN_ARDOT_MCP_EMBED_URL = "https://ardot.tencent.com";
function defaultResolveArdotEmbedUrl() {
	if (process.env.NODE_ENV !== "development") return BUILTIN_ARDOT_MCP_EMBED_URL;
	const configDir = process.env.WORKBUDDY_CONFIG_DIR?.trim() || (0, node_path.join)((0, node_os.homedir)(), ".workbuddy");
	try {
		const raw = (0, node_fs.readFileSync)((0, node_path.join)(configDir, "dev-env.json"), "utf-8");
		const parsed = JSON.parse(raw);
		const override = parsed.ardotEndpointOverride;
		if (typeof override === "string" && override.trim().length > 0 && isValidHttpUrl(override)) return override;
		if (parsed.env === "staging") return "https://test.ardot.tencent.com";
		if (typeof parsed.env === "string" && parsed.env.startsWith("custom:")) {
			const name = parsed.env.slice(7);
			const custom = Array.isArray(parsed.customEnvs) ? parsed.customEnvs.find((e) => e && e.name === name) : void 0;
			const endpoint = custom && typeof custom.endpoint === "string" ? custom.endpoint : void 0;
			if (endpoint && isArdotHostUrl(endpoint)) return endpoint;
		}
	} catch {}
	return BUILTIN_ARDOT_MCP_EMBED_URL;
}
function isArdotHostUrl(endpoint) {
	try {
		return new URL(endpoint).hostname.includes("ardot");
	} catch {
		return false;
	}
}
function isValidHttpUrl(endpoint) {
	try {
		const url = new URL(endpoint);
		return url.protocol === "http:" || url.protocol === "https:";
	} catch {
		return false;
	}
}
var ardotEmbedUrlProvider = { resolveEmbedUrl: defaultResolveArdotEmbedUrl };
function setArdotEmbedUrlProvider(provider) {
	ardotEmbedUrlProvider = provider;
}
function resolveArdotEmbedUrl() {
	return ardotEmbedUrlProvider.resolveEmbedUrl();
}
var BUILTIN_ARDOT_MCP_DEFAULT_PORT = 50551;
function buildBuiltinArdotMcpUrl(port = BUILTIN_ARDOT_MCP_DEFAULT_PORT) {
	return `http://127.0.0.1:${port}/api/v1/mcp`;
}
var BUILTIN_ARDOT_MCP_URL = buildBuiltinArdotMcpUrl();
var BUILTIN_ARDOT_CLI_SEGMENTS = [
	"builtin-mcp-apps",
	"ardot-mcp-app",
	"cli.cjs"
];
/**
* `--require`-injected bootstrap that runs inside the spawned MCP App child
* process before the app's `cli.cjs`. Patches Node's default
* `http.Server.requestTimeout` / `headersTimeout` to disable the 5-minute
* forced socket teardown that breaks long-lived MCP Streamable HTTP / SSE
* streams. See `mcp-app-bootstrap.cjs` for full rationale.
*/
var BUILTIN_MCP_APP_BOOTSTRAP_SEGMENTS = [
	"builtin-mcp-apps",
	"_workbuddy-runtime",
	"mcp-app-bootstrap.cjs"
];
function resolveBuiltinArdotMcpCliPath() {
	return bundledAssetResolver(...BUILTIN_ARDOT_CLI_SEGMENTS);
}
/**
* Path to the WorkBuddy-owned bootstrap that should be `--require`'d before
* any built-in MCP App's entry script. Returns `undefined` if the asset is
* missing (dev environments before the resource sync, or asar-unpack
* misconfigured) — callers must degrade gracefully and spawn without the
* bootstrap rather than fail outright.
*/
function resolveBuiltinMcpAppBootstrapPath() {
	return bundledAssetResolver(...BUILTIN_MCP_APP_BOOTSTRAP_SEGMENTS);
}
function isValidArdotDevMcpServer(entry) {
	if (!entry || typeof entry !== "object") return false;
	const server = entry;
	if (server.dev !== true) return false;
	if (typeof server.url === "string" && server.url.trim().length > 0) return true;
	return typeof server.command === "string" && server.command.trim().length > 0 && Array.isArray(server.args) && server.args.some((arg) => typeof arg === "string" && arg.includes("cli.cjs")) && typeof server.env?.MCP_APP_EMBED_URL === "string" && server.env.MCP_APP_EMBED_URL.trim().length > 0;
}
function createBuiltinArdotMcpServer(cliPath = resolveBuiltinArdotMcpCliPath(), url = BUILTIN_ARDOT_MCP_URL) {
	if (!cliPath) return;
	return {
		url,
		disabled: false,
		managedBy: "workbuddy-builtin"
	};
}
var BUILTIN_NETDRIVE_MCP_SERVER_NAME = "netdrive";
/**
* 网盘 MCP 在 agent-gateway 上的客户端路径前缀。
*
* Desktop 端统一走 `/console/agent-gateway/netdrive/mcp`（与 Web 端一致），
* APISIX 该路由放开了 IDE 用户访问，免去 IDE 网关额外加白的成本。
*
* 本模块导出的是 Desktop 默认路径，Web 端不要直接复用此常量。
*
* agent-gateway `proxy_v2/netdrive.go` 把 `/agent-gateway/netdrive/mcp` → 上游
* `/api/v6/open/tdrive/mcp`；客户端只用关心客户端可见的相对前缀。
*
* 完整 URL 由 connector-service.ts 拼出：endpoint + BUILTIN_NETDRIVE_MCP_PATH。
*/
var BUILTIN_NETDRIVE_MCP_PATH = "/console/agent-gateway/netdrive/mcp";
/**
* 网盘 MCP 客户端身份 header 名称。
*
* 这些 header 由 agent-gateway 的 NetdriveCredentialSource 透传给 agentserver
* `/netdrive/internal/access-token`。**必须**与后端一致：
* - X-Genie-User-ID  : 当前登录用户 ID（必填）
* - X-Project-Id     : 当前激活项目 ID（空串=个人盘；不传时也会被当作个人盘）
* - X-Enterprise-Id  : 企业 ID（决定 ToC/ToB baseUrl，决定换票走 toC vs toB provider）
*
* 端到端链路：
*   客户端 -> agent-gateway /console/agent-gateway/netdrive/mcp (带这三个 header)
*     -> agent-gateway 调 agentserver /netdrive/internal/access-token (透传同名 header)
*     -> agentserver 按 enterpriseId 选 ToC/ToB provider，按 projectId 派生权限
*     -> 返回 {accessToken, baseUrl, spaceID, dirName}
*     -> agent-gateway 转发到 baseUrl/api/v6/open/tdrive/mcp，附带 access token
*/
var NETDRIVE_HEADER_USER_ID = "X-Genie-User-ID";
var NETDRIVE_HEADER_PROJECT_ID = "X-Project-Id";
/**
* 决议生效的 netdrive MCP URL：
* - 优先用用户 dev 覆盖（mcp.json 中 entry.dev=true 且带 url），方便本地后端联调
* - 否则走传入的默认远端 URL（由 connector-service 按部署环境拼出）
*/
function isValidNetdriveDevMcpServer(entry) {
	if (!entry || typeof entry !== "object") return false;
	const server = entry;
	if (server.dev !== true) return false;
	return typeof server.url === "string" && server.url.trim().length > 0;
}
/**
* 构造内置 netdrive MCP 配置。
*
* 返回 undefined 时调用方应跳过 netdrive 注入（headers 不完整 / 用户未登录）。
*
* 设计：
* - type: 'http' —— 远端 HTTP transport，agent-cli 侧 McpConfigHTTP 已原生支持
* - headers: 会话级身份注入入口，传入空 X-Genie-User-ID 时直接返回 undefined
* - defer_loading: 工具不进 LLM tools 列表（由 ToolSearch + DeferExecute 触发）
* - managedBy: 标记为内置，UI 列表 / approval 流程据此区分
*/
function createBuiltinNetdriveMcpServer(headers, url) {
	const userId = headers[NETDRIVE_HEADER_USER_ID];
	if (!userId || typeof userId !== "string" || userId.trim().length === 0) return;
	if (!url || typeof url !== "string" || url.trim().length === 0) return;
	const authorization = headers.Authorization;
	if (!authorization || typeof authorization !== "string" || authorization.trim().length === 0) return;
	const filteredHeaders = {};
	for (const [key, value] of Object.entries(headers)) if (typeof value === "string" && value.length > 0) filteredHeaders[key] = value;
	return {
		type: "http",
		url,
		headers: filteredHeaders,
		disabled: false,
		managedBy: "workbuddy-builtin",
		defer_loading: true
	};
}
//#endregion
//#region ../../packages/workbuddy-server/src/connector/poi-consent-registry.ts
/** 默认授权询问超时：60 秒 */
var POI_CONSENT_DEFAULT_TIMEOUT_MS = 6e4;
var PoiConsentRegistry = class {
	pending = /* @__PURE__ */ new Map();
	/**
	* 等待用户对指定 MCP server POI 注入授权。
	*
	* 同名 server 已有 pending 时返回同一 Promise（去重）。
	* 超时后 resolve `'denied'`（fail-closed，不 reject）。
	*/
	wait(mcpServerName, timeoutMs = POI_CONSENT_DEFAULT_TIMEOUT_MS) {
		return this.waitWithFirst(mcpServerName, timeoutMs).promise;
	}
	/**
	* 原子化的 wait + 首次标记：注册 pending 并返回 { promise, isFirst }。
	*
	* `isFirst=true` 表示本次调用创建了新 pending（调用方应推送事件给 renderer）；
	* `isFirst=false` 表示复用已有 pending（无需重复推送）。
	*
	* 解决并发竞态：多个并发 callTool 在同一事件循环 tick 到达时，
	* 只有第一个 `waitWithFirst` 调用 isFirst=true，后续的都复用同一 pending。
	*/
	waitWithFirst(mcpServerName, timeoutMs = POI_CONSENT_DEFAULT_TIMEOUT_MS) {
		const existing = this.pending.get(mcpServerName);
		if (existing) return {
			promise: new Promise((resolve) => {
				const originalResolve = existing.resolve;
				existing.resolve = (result) => {
					originalResolve(result);
					resolve(result);
				};
			}),
			isFirst: false
		};
		return {
			promise: new Promise((resolve) => {
				const timeoutHandle = setTimeout(() => {
					const entry = this.pending.get(mcpServerName);
					if (entry) {
						this.pending.delete(mcpServerName);
						entry.resolve("denied");
					} else resolve("denied");
				}, timeoutMs);
				this.pending.set(mcpServerName, {
					resolve,
					timeoutHandle
				});
			}),
			isFirst: true
		};
	}
	/**
	* 回传用户授权决策，resolve 对应 pending Promise。
	* 找不到 pending 返回 false。
	*/
	answer(mcpServerName, result) {
		const entry = this.pending.get(mcpServerName);
		if (!entry) return false;
		clearTimeout(entry.timeoutHandle);
		this.pending.delete(mcpServerName);
		entry.resolve(result);
		return true;
	}
	/** 取消所有 pending 并 resolve 为 denied（进程退出兜底）。 */
	cancelAll(reason) {
		for (const entry of this.pending.values()) {
			clearTimeout(entry.timeoutHandle);
			entry.resolve("denied");
		}
		this.pending.clear();
	}
	/** 当前 pending 数量（测试 / 诊断用）。 */
	get pendingCount() {
		return this.pending.size;
	}
	/** 检查指定 server 是否已有 pending（用于并发去重推送）。 */
	hasPending(mcpServerName) {
		return this.pending.has(mcpServerName);
	}
};
//#endregion
//#region ../../packages/workbuddy-server/src/connector/poi-consent-store.ts
/**
* PoiConsentStore —— 持久化用户对各 MCP server POI 注入的授权决策。
*
* 文件：`{configDir}/poi-mcp-consent.json`
* 格式：`Record<mcpServerName, 'granted' | 'denied'>`
*
* lazy-load：首次 get/set 时读取文件；写操作立即持久化。
* 文件不存在 / 损坏时静默返回空状态（fail-closed 一致性）。
*/
var CONSENT_FILE_NAME = "poi-mcp-consent.json";
var PoiConsentStore = class {
	filePath;
	data;
	constructor(configDir) {
		this.filePath = (0, path.join)(configDir, CONSENT_FILE_NAME);
	}
	get(mcpServerName) {
		this.ensureLoaded();
		return this.data[mcpServerName];
	}
	set(mcpServerName, consent) {
		this.ensureLoaded();
		this.data[mcpServerName] = consent;
		if (consent === "granted") this.persist();
	}
	clear() {
		this.data = {};
		this.persist();
	}
	ensureLoaded() {
		if (this.data !== void 0) return;
		this.data = this.loadFromDisk();
	}
	loadFromDisk() {
		if (!(0, fs.existsSync)(this.filePath)) return {};
		try {
			const raw = (0, fs.readFileSync)(this.filePath, "utf-8");
			const parsed = JSON.parse(raw);
			if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) return {};
			const result = {};
			for (const [key, value] of Object.entries(parsed)) if (value === "granted") result[key] = value;
			return result;
		} catch {
			return {};
		}
	}
	persist() {
		try {
			(0, fs.writeFileSync)(this.filePath, JSON.stringify(this.data, null, 2), "utf-8");
		} catch {}
	}
};
//#endregion
//#region ../../packages/workbuddy-server/src/connector/poi-header-builder.ts
/**
* POI Header Builder —— 构建 X-WorkBuddy-User-POI HTTP header。
*
* 当 MCP server 声明 `needsInjectPOI: true` 时，callTool 路径会调用此模块
* 将用户 POI 数据序列化为 Base64(UTF-8(JSON)) 并注入 HTTP 请求 header。
*/
/** POI header 名称常量 */
var POI_HEADER_NAME = "X-WorkBuddy-User-POI";
/**
* 将 POI payload 构建为可注入 HTTP header 的 Record。
*
* 返回 `{ 'X-WorkBuddy-User-POI': base64Value }`，调用方直接合并进 headers。
*/
function buildPoiHeader(poi) {
	const json = JSON.stringify(poi);
	const base64Value = Buffer.from(json, "utf-8").toString("base64");
	return { [POI_HEADER_NAME]: base64Value };
}
//#endregion
//#region ../../packages/workbuddy-server/src/connector/session-poi-cache.ts
var SessionPoiCache = class {
	cache = /* @__PURE__ */ new Map();
	set(sessionId, poi) {
		this.cache.set(sessionId, poi);
	}
	get(sessionId) {
		return this.cache.get(sessionId);
	}
	delete(sessionId) {
		return this.cache.delete(sessionId);
	}
	clear() {
		this.cache.clear();
	}
	get size() {
		return this.cache.size;
	}
};
//#endregion
//#region ../../packages/workbuddy-server/src/connector/version-compatibility.ts
/**
* 将用户提供的 semver 字符串规整为可参与比较的形式。
*
* 无效字符串（或 undefined）返回 null，调用方视为"无约束"，避免 marketplace 脏数据
* 导致客户端全量 connector 被判为不兼容。
*/
function coerceValid(value) {
	if (!value) return null;
	return import_semver.valid(value) ?? null;
}
/**
* 检查 connector 是否与当前 WorkBuddy 版本兼容。
*
* 判定规则（详见 Issue #37956）：
* - `minWorkbuddyVersion` / `maxWorkbuddyVersion` 均缺失或无效 → 兼容（返回 null）
* - 当前版本无效 → 宽松策略，视为兼容
* - 当前版本 < min → 返回 `{ kind: 'needsUpgrade', requiredMinVersion }`
* - 当前版本 > max → 返回 `{ kind: 'connectorRetired' }`
* - 在 `[min, max]` 区间内 → 兼容
*
* 边界：`=` 等于 min 或 max 的情况视为兼容（闭区间）。
* prerelease（如 `4.30.0-beta.1`）参与比较：semver 规则下 `4.30.0-beta.1 < 4.30.0`，
* 所以 beta 客户端对于 min=4.30.0 的 connector 仍会被判为不兼容，需要 connector 侧
* 显式标注 `minWorkbuddyVersion: "4.30.0-beta.0"` 才能让 beta 通过。
*/
function checkCompatibility(input) {
	const current = coerceValid(input.currentVersion);
	if (!current) return null;
	const min = coerceValid(input.minWorkbuddyVersion);
	if (min && import_semver.lt(current, min)) return {
		kind: "needsUpgrade",
		requiredMinVersion: min
	};
	const max = coerceValid(input.maxWorkbuddyVersion);
	if (max && import_semver.gt(current, max)) return { kind: "connectorRetired" };
	return null;
}
//#endregion
//#region ../../packages/workbuddy-server/src/connector/connector-service.ts
/**
* 连接器核心服务
*
* 职责：
* 1. 管理 connector marketplace 下载与缓存
* 2. 启用/禁用 connector：
*    - MCP: 通过 ConnectorMcpProxy 在主进程直接连接真实 MCP Server
*    - Proxy Server: 聚合所有 connector 工具，通过标准 MCP 协议暴露给 CLI
*    - Skill: 复制到 ~/.workbuddy/skills/ 目录
* 3. 维护 connector 状态
* 4. 写入 .mcp.json（只一条 connector-proxy 配置指向 Proxy Server）
* 5. 写入 connectors/mcp.json（合并所有 connector 的 MCP 配置）
*/
require_common$2.init_common();
require_common$2.init_common$3();
require_common$2.init_decorateMetadata();
require_common$2.init_decorate();
var _ref$9, _ref2$6, _ref3$3, _ref4$2;
/** Skill 目录前缀（标识 connector 来源） */
var CONNECTOR_SKILL_PREFIX = "connector-";
/** Connector skill 安装目录（相对于 configDir）：与 agent-craft loadConnectorSkills 的扫描路径保持一致 */
var CONNECTOR_SKILLS_DIR = (0, path.join)("connectors", "skills");
function resolveConnectorConfigDir() {
	const workbuddyConfigDir = process.env.WORKBUDDY_CONFIG_DIR?.trim();
	if (workbuddyConfigDir) return workbuddyConfigDir;
	const legacyCodebuddyConfigDir = process.env.CODEBUDDY_CONFIG_DIR?.trim();
	if (legacyCodebuddyConfigDir) return legacyCodebuddyConfigDir;
	return require_runtime_context.getWorkbuddyRuntimeConfigDir();
}
/**
* disableSkills 递归扫描 connector skill 目录时的最大深度。
* 与 agent-cli `SkillProductProvider.MAX_SCAN_DEPTH` 对齐，保证「能被扫到的 SKILL.md 就能被禁用」。
* 同时充当对符号链接环的安全守卫。
*/
var MAX_SKILL_SCAN_DEPTH = 5;
var EXTERNALLY_MANAGED_TOKEN_REFRESH_TIMEOUT_MS = 5e3;
var EXTERNALLY_MANAGED_TOKEN_RETRY_DELAYS_MS = [
	1e3,
	3e3,
	1e4
];
var EXTERNALLY_MANAGED_STALE_TOKEN_GUARD_TTL_MS = 6e4;
var UNAUTHORIZED_NOTIFY_THROTTLE_MS = 5e3;
var EXTERNALLY_MANAGED_AUTH_FAILURE_CODES = new Set([
	41,
	401,
	403,
	422,
	10101
]);
/** main 主导续票的 externally-managed MCP host，IMA 使用 mcp_token 原样写入 Authorization。 */
var EXTERNALLY_MANAGED_TOKEN_REFRESH_HOSTS = new Set([
	"mcp.lexiang-app.com",
	"docs.qq.com",
	"ima.qq.com",
	"ima-test.qq.com"
]);
/**
* C 端"资料库授权 → 自动接入连接器"的三家 host 白名单。
*
* 这里**故意不复用** `EXTERNALLY_MANAGED_TOKEN_REFRESH_HOSTS`，因为后者会被
* `isExternallyManagedConnector` 与企业态（OneID / iOA）逻辑串联。本常量
* 仅服务于 C 端默认关闭策略，保持解耦，未来 host 调整互不影响。
*/
var C_SIDE_AUTO_BOUND_CONNECTOR_HOSTS = new Set([
	"mcp.lexiang-app.com",
	"docs.qq.com",
	"ima.qq.com",
	"ima-test.qq.com"
]);
var AUTH_INJECTION_LOG_PREFIX$1 = "[ConnectorAuthInjection]";
var AUTH_INJECTION_SKIP_LOG_THROTTLE_MS = 6e4;
var DEFAULT_CONNECTOR_HOST_CAPABILITIES = {
	fetch: (url, init) => globalThis.fetch(url, init),
	openExternal: async () => {
		throw new Error("ConnectorService host capability openExternal is not available");
	},
	openPath: async () => {
		throw new Error("ConnectorService host capability openPath is not available");
	},
	getAppVersion: () => void 0,
	getSystemLocale: () => process.env.LANG || "en",
	sendRuntimeProgress: () => {
		throw new Error("ConnectorService host capability sendRuntimeProgress is not available");
	}
};
var ConnectorService = class ConnectorService {
	logger;
	authService;
	mcpProxy;
	proxyServer;
	cliExecutor;
	productManager;
	authenticationManager;
	/**
	* 判断当前是否应使用英文显示 connector name / description。
	* 委托给 `connector-locale.ts::isEnglishConnectorLocale`，与
	* daemon 可读取的持久化配置 / product 配置共用同一套优先级链。
	* 详见 `connector-locale.ts` 文件头注释。
	*/
	isEnglishLocale() {
		return isEnglishConnectorLocale({
			configDir: this.configDir,
			getProductLocale: () => this.resolveProductLocale(),
			getSystemLocale: () => this.hostCapabilities.getSystemLocale()
		});
	}
	getCurrentProductConfiguration() {
		const productManager = this.productManager;
		return productManager?.getCurrentConfiguration?.() ?? productManager?.configuration?.getValue?.();
	}
	resolveProductLocale() {
		const product = this.getCurrentProductConfiguration();
		if (!product) return;
		if (product.isOversea === true) return "en-US";
		if (product.isOversea === false) return "zh-CN";
		const productEndpoints = [
			product.endpoint,
			product.updateUrl,
			product.websiteHomeUrl
		].filter((value) => typeof value === "string" && value.length > 0).join(" ").toLowerCase();
		if (/(^|[/:.])(?:copilot\.tencent\.com|codebuddy\.cn|copilot\.qq\.com)(?:[/:\s]|$)/.test(productEndpoints)) return "zh-CN";
		if (/(^|[/:.])codebuddy\.ai(?:[/:\s]|$)/.test(productEndpoints)) return "en-US";
	}
	resolveLocalizedName(entry) {
		const isEnglish = this.isEnglishLocale();
		return this.resolveLocalizedMapText(entry.name_map, isEnglish) ?? (isEnglish ? entry.name_en || entry.name : entry.name_zh || entry.name);
	}
	resolveLocalizedDescription(entry) {
		const isEnglish = this.isEnglishLocale();
		return this.resolveLocalizedMapText(entry.description_map, isEnglish) ?? (isEnglish ? entry.description_en || entry.description : entry.description_zh || entry.description);
	}
	resolveLocalizedMapText(map, isEnglish) {
		if (!map) return;
		const targetLocale = isEnglish ? "en" : "zh";
		for (const candidateKey of this.getLocalizedMapCandidateKeys()) for (const [rawKey, text] of Object.entries(map)) if (this.parseLocalizedMapKey(rawKey).includes(candidateKey)) {
			const value = text?.[targetLocale]?.trim();
			if (value) return value;
		}
	}
	getLocalizedMapCandidateKeys() {
		const context = this.getConnectorAccountContext();
		const candidates = [];
		if (require_workbuddy_auth_product_coordinator.isIOAEnterprise(context.enterpriseId)) candidates.push("iOA");
		if (context.accountType) candidates.push(`plan:${context.accountType}`);
		const networkEnvironment = this.getCurrentProductConfiguration()?.networkEnvironment;
		if (typeof networkEnvironment === "string" && networkEnvironment.length > 0) candidates.push(networkEnvironment);
		return candidates;
	}
	parseLocalizedMapKey(key) {
		return key.split(/[;,]/).map((part) => part.trim()).filter(Boolean);
	}
	/** marketplace 本地缓存目录 */
	baseDir;
	/** CLI 配置目录（~/.workbuddy） */
	configDir;
	/** connector 运行时状态 */
	states = /* @__PURE__ */ new Map();
	/** CLI connect 防重入：同一 configId 只允许一个 connectCli 流程同时运行 */
	pendingCliConnects = /* @__PURE__ */ new Map();
	/**
	* Issue #59703: 同 connector 操作串行化锁链。
	*
	* 同一 configId 的 connect / disconnect 调用按入队顺序串行执行，避免
	* 用户反复 toggle ON/OFF 时 connect 与 disconnect 交叉执行导致：
	*   - disconnect 的 `updateState('disconnected')` + `disableSkills` 中途打断 connect 握手
	*   - 排队中的 connect 拿到一个被 disconnect 半拆掉的环境，握手失败 → "连接失败" toast
	*
	* cancelConnect 不进入此链，保留立即生效语义（abort 信号必须能穿透排队）。
	* 内部对私有 `doConnect` / `doDisconnect` 的调用同样不进链，避免自死锁。
	*/
	pendingOps = /* @__PURE__ */ new Map();
	/**
	* CLI connect 取消句柄：configId → AbortController。
	*
	* 在 `doConnectCli` 入口创建 controller 并存入此 Map，传 signal 给
	* `runAuth` / `pollAuthCompletion`；`cancelConnect` 调 `abort()` 中止
	* spawn 子进程和 poll 循环。`doConnectCli` 退出时（成功/失败/取消）
	* 在 finally 块中清理。
	*/
	pendingCliAborts = /* @__PURE__ */ new Map();
	/** IOA 服务端 MCP 认证管理器（initMcpProxy 时创建，注入到 proxy + 供 unbind/revoke 使用） */
	ioaAuth;
	/** 持久化状态 */
	persistentState = {
		enabled: [],
		headerOverrides: {},
		envOverrides: {},
		userDisabled: {},
		disabledToolsOverrides: {}
	};
	initPromise = null;
	sessionPoiCache = new SessionPoiCache();
	poiConsentStore;
	poiConsentRegistry = new PoiConsentRegistry();
	/** 向 renderer 推送 POI 授权请求事件的回调（由 bootstrap 注入）。 */
	poiConsentEventPusher;
	/** 获取当前登录用户 ID，未登录时返回 'default' */
	getUserId() {
		const status = this.authService?.getStatus?.();
		return status?.loggedIn && status.user?.id ? status.user.id : "default";
	}
	createOAuthStore(userId = this.getUserId()) {
		return new require_workbuddy_auth_product_coordinator.ConnectorOAuthStore(userId, { backupBaseDir: require_runtime_context.getWorkbuddyRuntimeUserDataDir() });
	}
	getCurrentEnterpriseId() {
		return this.authService?.getAccount?.()?.enterpriseId ?? "";
	}
	getCurrentAccountType() {
		const account = this.authService?.getAccount?.();
		return account?.type ?? account?.accountType ?? "";
	}
	getConnectorAccountContext() {
		return require_workbuddy_auth_product_coordinator.deriveAccountContext({
			userId: this.getUserId(),
			enterpriseId: this.getCurrentEnterpriseId(),
			accountType: this.getCurrentAccountType()
		});
	}
	getCurrentAccountIdentityKey() {
		const ctx = this.getConnectorAccountContext();
		return `${ctx.userId}|${ctx.enterpriseId}|${ctx.variantKey}`;
	}
	getLegacyAccountIdentityKey() {
		return `${this.getUserId()}|${this.getCurrentEnterpriseId()}`;
	}
	normalizeConnectorUserDisabledState() {
		const state = this.persistentState.userDisabled;
		if (!Array.isArray(state)) {
			this.persistentState.userDisabled = state ?? {};
			return this.persistentState.userDisabled;
		}
		this.persistentState.userDisabled = state.reduce((result, id) => {
			result[id] = true;
			return result;
		}, {});
		return this.persistentState.userDisabled;
	}
	/** 标记用户在本地主动关闭过某 connector，避免企业态自动重新启用。 */
	markConnectorUserDisabled(configId) {
		this.normalizeConnectorUserDisabledState()[configId] = true;
	}
	/** 标记用户已显式开启某 connector，避免默认关闭逻辑再次写入禁用态。 */
	markConnectorUserEnabled(configId) {
		this.normalizeConnectorUserDisabledState()[configId] = false;
	}
	/** 解绑时删除本地开关意图，让后续初始化重新按默认关闭逻辑处理。 */
	clearConnectorUserDisabled(configId) {
		delete this.normalizeConnectorUserDisabledState()[configId];
	}
	getConnectorUserDisabledState(configId) {
		return this.normalizeConnectorUserDisabledState()[configId];
	}
	/** 是否需要为进入企业态自动连接循环的 connector 写入默认关闭状态。 */
	shouldDefaultDisableEnterpriseConnector(configId) {
		return this.getConnectorUserDisabledState(configId) === void 0;
	}
	/**
	* 判定 connector 是否属于"C 端资料库授权后自动接入"的三家。
	*
	* 仅按 host 命中判断，不掺杂企业态 / OneID / iOA 相关分支，
	* 与 `isExternallyManagedConnector` 解耦。
	*
	* 注：与 `isExternallyManagedConnector` 一致，对 `getLatestServerConfigForConnector`
	* 的调用做 try/catch 兜底——baseDir 未初始化 / mcp.json 损坏等场景会抛异常，
	* 此处视为"无法判定"，返回 false 让 connector 走原恢复路径。
	*/
	isCSideAutoBoundConnector(configId) {
		let serverConfig;
		try {
			serverConfig = this.getLatestServerConfigForConnector(configId);
		} catch {
			return false;
		}
		if (!serverConfig?.url) return false;
		try {
			const host = new URL(serverConfig.url).host;
			return C_SIDE_AUTO_BOUND_CONNECTOR_HOSTS.has(host);
		} catch {
			return false;
		}
	}
	/**
	* 当前 connector 是否需要写入"默认关闭"意图。
	*
	* 仅作用于 C 端三家，且 userDisabled 为 undefined 时才默认关闭，
	* 不覆盖用户已经显式表达过的开关意图（true / false 都尊重）。
	*/
	shouldDefaultDisableCSideConnector(configId) {
		if (!this.isCSideAutoBoundConnector(configId)) return false;
		return this.getConnectorUserDisabledState(configId) === void 0;
	}
	/**
	* 已按默认关闭策略恢复过的企业态 connector，不再反复恢复后禁用。
	*
	* 判断条件保持保守：只有本地明确关闭、曾经恢复成功、当前不在 enabled，且 proxy
	* 没有活跃连接时才跳过。若 proxy 仍处于 connected/connecting，继续走原恢复后禁用
	* 流程，让后续 disconnect 清理真实连接，避免 UI 显示关闭但底层仍在线。
	*/
	shouldSkipDisabledEnterpriseConnectorRestore(configId) {
		if (this.getConnectorUserDisabledState(configId) !== true) return false;
		if (this.persistentState.enabled.includes(configId)) return false;
		if (!this.persistentState.everConnected?.includes(configId)) return false;
		const clientEntry = this.mcpProxy?.getClientEntry?.(require_workbuddy_auth_product_coordinator.toProxyConfigId(configId));
		return clientEntry?.status !== "connected" && clientEntry?.status !== "connecting";
	}
	resolveNetdriveMcpUrl(devEntry) {
		if (isValidNetdriveDevMcpServer(devEntry)) return devEntry.url;
		const endpoint = this.productManager?.getEndpoint?.();
		if (!endpoint || typeof endpoint !== "string" || endpoint.length === 0) return;
		return endpoint.replace(/\/+$/, "") + BUILTIN_NETDRIVE_MCP_PATH;
	}
	buildNetdriveHeaders() {
		const status = this.authService.getStatus();
		if (!status.loggedIn || !status.user?.id) return;
		let authHeaders;
		try {
			authHeaders = this.authService.buildAuthHeaders(true, true, false);
		} catch (err) {
			this.logger.warn("[ConnectorService] buildNetdriveHeaders: buildAuthHeaders threw", err);
			return;
		}
		const authorization = authHeaders.Authorization ?? authHeaders.authorization;
		if (!authorization || authorization.length === 0) {
			this.logger.warn("[ConnectorService] buildNetdriveHeaders: no Authorization header from authService, skip netdrive injection");
			return;
		}
		return {
			...authHeaders,
			Authorization: authorization,
			[NETDRIVE_HEADER_USER_ID]: status.user.id
		};
	}
	/**
	* 决议生效的 netdrive MCP 配置：
	* - 用户 mcp.json 显式声明带 dev:true + url 的合法条目时，使用 dev URL（本地后端联调）
	* - 否则使用内置远端 URL（productManager.getEndpoint() + BUILTIN_NETDRIVE_MCP_PATH）
	*
	* netdrive **常驻连接**：只要已登录（headers 可构造）+ URL 就绪即接入 connector-proxy，
	* 不再依赖进程级 activeNetdriveProjectId 门控。会话隔离下沉到两处，均按「本会话 projectId」判定：
	*   1) tools/list：ConnectorMcpProxy.listAllTools 对个人会话（无 projectId）过滤掉 netdrive 工具；
	*   2) CLI 声明：getMcpConfig 仅对项目会话声明 netdrive 工具（netdriveEnabled=!!projectId）；
	*   3) 换票：每次 tool call 的 per-request X-Project-Id 按发起会话的 projectId 注入。
	* 这样个人会话在「看得到 / 声明 / 换票」三处都不暴露 netdrive，且多项目并发不再靠进程级切换。
	*
	* headers / URL 任一缺失时返回 undefined，下次 refreshAndSync 时会再尝试
	* （productManager / authService 完成初始化后即可）。
	*/
	resolveEffectiveNetdriveMcpServer(userEntry) {
		const headers = this.buildNetdriveHeaders();
		if (!headers) return;
		const url = this.resolveNetdriveMcpUrl(userEntry);
		if (!url) return;
		return createBuiltinNetdriveMcpServer(headers, url);
	}
	updateTimer = null;
	/** mcp.json 文件监听器 */
	mcpConfigWatcher = null;
	/** mcp.json 变更防抖定时器 */
	mcpConfigDebounceTimer = null;
	/** connectorMcpConfigPath 自写入时间戳，用于忽略自触发的 watcher 事件 */
	lastSelfWriteConnectorMcpAt = 0;
	/** customMcpConfigPath 在专家依赖连接流程中的自写入时间戳，避免 watcher 触发第二次 OAuth。 */
	lastSelfWriteCustomMcpAt = 0;
	/**
	* Issue #49159：单文件 JSON 配置（mcp.json / connectors/mcp.json）的 mtime 失效缓存。
	* 高频路径（listMcpServers / restoreConnectorClients / refreshAndSync 等）一次连发
	* 多次读 → 同 mtime+size 直接命中，跳过 readFileSync + JSON.parse。
	*
	* 失效时机：
	*   - 本进程 writeCustomMcpConfig / writeConnectorsMcpConfig 写完后立即 invalidate
	*   - mcp.json 外部修改触发 watcher → onConfigFileChanged 里 invalidate
	*/
	mcpJsonCache = new JsonFileCache((filePath) => safeReadJsonFile(filePath, { mcpServers: {} }));
	/**
	* Issue #49159：插件 MCP 字典扫描结果的短窗缓存。readPluginMcpConfigs 涉及
	* readdir + 多份 marketplace.json/plugin.json/.mcp.json 读取，无法用单文件 mtime
	* 完整反映输入；改用 TTL 把同一 burst（listMcpServers 主循环 + plugin 循环
	* + reconnectMcpServer 兜底等）压成一次扫描。
	*
	* 失效时机：settings.json / mcp.json 改动 → onConfigFileChanged 主动 invalidate；
	* 插件安装/卸载 / 用户启用变化都会写 settings.json，所以 watcher 路径覆盖到位。
	*
	* **TTL 选 60_000ms 而不是 10s**：5 秒轮询 + 10s TTL 数学上注定每 2 次必 miss
	* 1 次（命中率 50%），TTL 拉长可以让稳态命中率显著上升：
	*   - 60s TTL 下 5s 轮询命中率 ~92%
	*   - 用户主路径改配置（toggleMcpServer / saveMcpConfigContent / 写 settings.json）
	*     都已配套 invalidate 立即清空，外部 fs.watch 也会触发 invalidate
	*   - TTL 仅为"watcher 漏掉的边缘 case"兜底（插件目录被外部工具改写等），
	*     这些不是秒级响应诉求，60 秒延迟可接受
	*/
	pluginMcpConfigsCache = new TtlMemoCache(() => this.computePluginMcpConfigs(), 6e4);
	/** request-time auth injection 规则缓存；tool call 高频路径禁止读 connectors.json。 */
	authInjectionRuleCache = {
		rules: [],
		byConnector: /* @__PURE__ */ new Map()
	};
	authInjectionSkipLogThrottle = /* @__PURE__ */ new Map();
	builtinArdotMcpProcess = null;
	builtinArdotMcpHealthTimer = null;
	builtinArdotMcpPort = BUILTIN_ARDOT_MCP_DEFAULT_PORT;
	builtinArdotMcpUrl = BUILTIN_ARDOT_MCP_URL;
	/** Token 提前刷新器 */
	tokenRefresher = null;
	/** Server-side OAuth connector 的 token 刷新器（如 Gmail） */
	serverSideOauthRefresher = null;
	hostCapabilities = DEFAULT_CONNECTOR_HOST_CAPABILITIES;
	/** externally-managed token 预热失败后的有限静默重试，避免账号切换首拍空 header 建联。 */
	externallyManagedTokenRetryTimers = /* @__PURE__ */ new Map();
	externallyManagedTokenRetryAttempts = /* @__PURE__ */ new Map();
	/**
	* upstream 返回 code=0 但 MCP 侧立即 401 的 token 指纹缓存。
	* 命中时短路 connect / sync，等待用户重新授权写入不同 token。
	*/
	externallyManagedStaleTokenGuard = /* @__PURE__ */ new Map();
	/** unauthorized 事件推送节流：风暴期间同一 connector 只推送首个事件给 renderer。 */
	unauthorizedNotifyThrottle = /* @__PURE__ */ new Map();
	/**
	* 上一次绑定的用户身份（uid + enterpriseId，用于账号/企业切换检测，去重 onStateChanged 噪声）。
	* doInit 完成后立即填充，之后每次 authService.onStateChanged 触发时与新身份对比。
	*/
	lastBoundIdentityKey = null;
	/**
	* authService.onStateChanged 的解订阅函数。当前实现里 ConnectorService 是
	* 进程内单例，没有显式 dispose 路径，但仍保留解订阅句柄以备未来需要。
	*/
	accountChangeUnsubscribe = null;
	/**
	* 账号切换重置任务的串行化锁。同一时刻只允许一个 handleUserChanged 在跑，
	* 防止用户快速 A→B→A 多次切换时产生 sync({}) / refreshAndSync 交错执行。
	*/
	userChangeChain = Promise.resolve();
	/**
	* 上一次观察到的、影响 desiredConfigs 的 productFeature 指纹。
	* 用于 onDidChange 回调内差分判断，避免无关字段变更（models / agents 等）触发 refreshAndSync。
	* 当前关注：AgentMail（gateway MCP 注入门控）。
	*/
	lastObservedFeatureKey = null;
	/** productManager.onDidChange 的解订阅函数。 */
	productFeatureChangeUnsubscribe = null;
	/**
	* productFeature 变化触发的 refreshAndSync 串行化锁。
	* 与 userChangeChain 语义独立、互不阻塞。
	*/
	featureChangeChain = Promise.resolve();
	/** OneID applications 缓存，按 enterpriseId 隔离，避免启动调度反复请求。 */
	oneidApplicationsCache = /* @__PURE__ */ new Map();
	/**
	* 未授权事件推送器：由 daemon 启动时通过 `setUnauthorizedEventPusher` 注入，
	* 把底层 mcpProxy 的 unauthorized 事件广播到 renderer。
	*/
	unauthorizedEventPusher;
	/** 是否已注册 mcpProxy.onUnauthorized，避免重复订阅 */
	unauthorizedListenerRegistered = false;
	/**
	* 连接器解绑事件推送器：由 daemon 启动时通过 `setUnboundEventPusher` 注入，
	* `unbind(configId)` 成功后广播到 renderer，供业务侧（如腾讯文档 store）联动重置自身状态。
	*/
	unboundEventPusher;
	/**
	* CLI 授权二维码 URL 推送器：由 daemon 启动时通过 `setAuthQrUrlPusher` 注入。
	* CLI connector 以 `authQrModal: true` 模式触发 auth 时，主进程不打开系统浏览器，
	* 而是通过该推送器把 URL 广播到 renderer（channel: `connector:auth-qr-url`），
	* renderer 在 WorkBuddy 窗口内弹出内嵌 iframe 展示二维码授权页。
	*/
	authQrUrlPusher;
	/**
	* Device Flow 授权信息推送器：由 daemon 启动时通过 `setDeviceCodePusher` 注入。
	*
	* CLI connector（`authDeviceFlow` 配置）或 MCP connector（OAuth metadata 含
	* `device_authorization_endpoint`）触发授权时，主进程通过该推送器把 verification URL +
	* 可选 user_code + expiresIn 广播到 renderer（channel: `connector:device-code`），
	* renderer 弹出 Device Code Modal 引导用户在浏览器完成授权。
	*/
	deviceCodePusher;
	constructor() {
		this.configDir = resolveConnectorConfigDir();
		this.baseDir = (0, path.join)(this.configDir, require_workbuddy_auth_product_coordinator.CONNECTORS_MARKETPLACE_DIR);
		this.poiConsentStore = new PoiConsentStore(this.configDir);
	}
	/**
	* 内置/托管 MCP 子进程（如 Ardot MCP HTTP server）的 cwd 基底。
	*
	* 与 ConnectorMcpProxy.getDefaultStdioCwd 保持同一基底：这些进程也可能
	* 在 cwd 下写 `logs/` 等运行时产物，统一放进 WorkBuddy 日志树，确保
	* 「Open Logs Folder」/ 用户反馈打包流程自动覆盖，跨平台路径一致：
	*
	*   macOS:   ~/.workbuddy/logs/mcp-runtime/<safe-id>/
	*   Windows: %USERPROFILE%\.workbuddy\logs\mcp-runtime\<safe-id>\
	*/
	get mcpRuntimeBaseDir() {
		return (0, path.join)(this.configDir, "logs", "mcp-runtime");
	}
	sanitizeMcpRuntimeDirName(configId) {
		return `${configId.replace(/[^a-zA-Z0-9._-]+/g, "_").replace(/^_+|_+$/g, "").slice(0, 80) || "mcp-server"}-${crypto.createHash("sha256").update(configId).digest("hex").slice(0, 8)}`;
	}
	resolveOwnedMcpProcessCwd(configId) {
		const cwd = (0, path.join)(this.mcpRuntimeBaseDir, this.sanitizeMcpRuntimeDirName(configId));
		(0, fs.mkdirSync)(cwd, { recursive: true });
		return cwd;
	}
	async init() {
		if (this.initPromise) return this.initPromise;
		this.initPromise = this.doInit();
		return this.initPromise;
	}
	async getConfigs() {
		await this.ensureInitialized();
		const manifest = this.readLocalManifest();
		if (!manifest?.connectors) return [];
		const configs = [];
		for (const entry of manifest.connectors) {
			const config = this.buildConnectorConfig(entry);
			if (config) configs.push(config);
		}
		return configs;
	}
	async getStates() {
		const result = {};
		const clientEntries = this.mcpProxy.getAllClientEntries();
		const everConnectedSet = new Set(this.persistentState.everConnected ?? []);
		for (const [id, state] of this.states) {
			const clientEntry = clientEntries.get(require_workbuddy_auth_product_coordinator.toProxyConfigId(id));
			const reconciledStatus = clientEntry?.status === "unauthorized" || clientEntry?.needsAuth ? "unauthorized" : state.status;
			result[id] = {
				...state,
				status: reconciledStatus,
				tools: clientEntry?.tools.map((t) => ({
					name: t.name,
					description: t.description
				})),
				needsAuth: clientEntry?.needsAuth,
				everConnected: everConnectedSet.has(id) || reconciledStatus === "connected"
			};
		}
		for (const id of this.persistentState.enabled) if (!result[id]) {
			const clientEntry = clientEntries.get(require_workbuddy_auth_product_coordinator.toProxyConfigId(id));
			let fallbackStatus;
			if (clientEntry) fallbackStatus = clientEntry.status;
			else {
				const connectorType = this.getMarketplaceEntryById(id)?.type;
				fallbackStatus = connectorType === "cli" || connectorType === "skill-only" ? "disconnected" : everConnectedSet.has(id) ? "connecting" : "disconnected";
			}
			result[id] = {
				configId: id,
				status: fallbackStatus,
				error: clientEntry?.error,
				tools: clientEntry?.tools.map((t) => ({
					name: t.name,
					description: t.description
				})),
				needsAuth: clientEntry?.needsAuth,
				everConnected: true
			};
		}
		for (const id of everConnectedSet) if (!result[id]) result[id] = {
			configId: id,
			status: "disconnected",
			everConnected: true
		};
		return result;
	}
	/**
	* Issue #59703: 同 configId 操作串行化。把 op 链到该 configId 当前的 pending
	* 链尾，前一个无论成败都放行下一个（用 then(op, op) 而不是 then(op).catch(op)
	* 避免重复触发）。链尾自动 GC。
	*
	* **不要**在 op 内部用同一 configId 再次调用本方法 → 自死锁。内部转调统一
	* 走私有 `doConnect` / `doDisconnect`。
	*/
	runOpExclusive(configId, op) {
		const next = (this.pendingOps.get(configId) ?? Promise.resolve()).then(op, op);
		this.pendingOps.set(configId, next);
		next.catch(() => {}).finally(() => {
			if (this.pendingOps.get(configId) === next) this.pendingOps.delete(configId);
		});
		return next;
	}
	async connect(configId, options) {
		return this.runOpExclusive(configId, () => this.doConnect(configId, options));
	}
	async doConnect(configId, options) {
		const connectorConfig = this.getConnectorConfigById(configId);
		if (connectorConfig?.versionIncompatibility) {
			const incompat = connectorConfig.versionIncompatibility;
			const reason = incompat.kind === "needsUpgrade" ? `需升级 WorkBuddy 到 ${incompat.requiredMinVersion} 或更新版本以使用此连接器` : "该连接器暂不可用，请等待更新";
			this.logger.warn(`[ConnectorService] Block connect for incompatible connector ${configId}: ${reason}`);
			return {
				success: false,
				error: reason
			};
		}
		if (connectorConfig && this.isCliConnector(connectorConfig)) return this.connectCli(configId, connectorConfig);
		if (connectorConfig?.authMode === "token" && connectorConfig.tokenConfig) {
			const envOverrides = this.persistentState.envOverrides[configId] || {};
			if (connectorConfig.tokenConfig.fields.find((f) => f.required && !(envOverrides[f.key] && envOverrides[f.key].length > 0))) {
				this.updateState(configId, "disconnected");
				return {
					success: false,
					needsTokenConfig: true
				};
			}
		}
		if (connectorConfig && this.isSkillOnlyConnector(connectorConfig)) return this.connectSkillOnly(configId);
		const abortController = new AbortController();
		this.pendingCliAborts.set(configId, abortController);
		const signal = abortController.signal;
		try {
			this.updateState(configId, "connecting");
			if (connectorConfig?.cliConfig) {
				const preAuthResult = await this.runPreCliAuth(configId, connectorConfig, signal);
				if (!preAuthResult.success) return preAuthResult;
			}
			if (signal.aborted) {
				this.updateState(configId, "disconnected");
				return {
					success: false,
					error: "Cancelled by user",
					cancelled: true
				};
			}
			const mcpConfig = this.readConnectorMcpConfig(configId);
			if (!mcpConfig) throw new Error(`MCP config not found for connector: ${configId}`);
			this.maybeApplyGatewayIdentityHeaders(configId);
			const enterpriseTokenSync = await this.syncEnterpriseConnectorTokenBeforeConnect(configId);
			if (!enterpriseTokenSync.success) {
				this.updateState(configId, enterpriseTokenSync.needsAuthorize ? "unauthorized" : "error", enterpriseTokenSync.error);
				return {
					success: false,
					error: enterpriseTokenSync.error
				};
			}
			const externalTokenSync = await this.syncExternallyManagedConnectorTokenBeforeConnect(configId);
			if (!externalTokenSync.success) {
				this.updateState(configId, externalTokenSync.needsAuthorize ? "unauthorized" : "error", externalTokenSync.error);
				return {
					success: false,
					error: externalTokenSync.error
				};
			}
			if (this.isExternallyManagedStaleTokenGuardActive(configId, externalTokenSync.tokenFingerprint)) {
				const error = this.getExternallyManagedStaleTokenError(configId);
				this.updateState(configId, "unauthorized", error);
				return {
					success: false,
					error
				};
			}
			const mergedConfig = this.buildRuntimeMcpConfig(configId, mcpConfig);
			const firstServerName = Object.keys(mergedConfig.mcpServers)[0];
			if (!firstServerName) throw new Error(`No MCP servers in config for connector: ${configId}`);
			const serverConfig = mergedConfig.mcpServers[firstServerName];
			const syncConfigId = require_workbuddy_auth_product_coordinator.toProxyConfigId(configId);
			const isWorkBuddyManagedAuth = serverConfig._workbuddyManagedAuth === require_workbuddy_auth_product_coordinator.WORKBUDDY_MANAGED_AUTH_ENTERPRISE;
			const entry = this.getMarketplaceEntryById(configId);
			const isServerSideAuth = entry ? this.resolveActiveAuthMode(entry) === "server-side" : false;
			if (options?.forceFreshAuth && serverConfig.url && !isWorkBuddyManagedAuth) {
				this.logger.info(`[ConnectorService] connect(${configId}): forceFreshAuth=true, clearing all OAuth credentials`);
				this.mcpProxy.invalidateCredentials(syncConfigId, serverConfig.url, "all", serverConfig.headers);
			} else if (!options?.skipClearClientInfo && serverConfig.url && !isWorkBuddyManagedAuth && !isServerSideAuth) {
				const oauthStore = this.createOAuthStore();
				if (!oauthStore.loadTokens(syncConfigId, serverConfig.url, serverConfig.headers)?.refresh_token) this.mcpProxy.invalidateCredentials(syncConfigId, serverConfig.url, "client", serverConfig.headers);
				else if (!oauthStore.loadClientInfo(syncConfigId, serverConfig.url, serverConfig.headers)?.client_id) this.mcpProxy.invalidateCredentials(syncConfigId, serverConfig.url, "tokens", serverConfig.headers);
			}
			if (signal.aborted) {
				this.updateState(configId, "disconnected");
				return {
					success: false,
					error: "Cancelled by user",
					cancelled: true
				};
			}
			let connectResult = await this.mcpProxy.connect(syncConfigId, serverConfig, options?.silent);
			if (!connectResult.success && connectResult.needsAuth && !connectResult.authFlowStarted && !options?.silent && serverConfig.url && !isWorkBuddyManagedAuth && !isServerSideAuth) {
				this.logger.info(`[ConnectorService] ${configId}: stale OAuth credentials rejected before authorization redirect; clearing access token and retrying interactive OAuth`);
				this.mcpProxy.invalidateCredentials(syncConfigId, serverConfig.url, "tokens", serverConfig.headers);
				connectResult = await this.mcpProxy.connect(syncConfigId, serverConfig, false);
			}
			if (signal.aborted) {
				if (connectResult.success) this.mcpProxy.disconnect(syncConfigId).catch(() => {});
				this.updateState(configId, "disconnected");
				return {
					success: false,
					error: "Cancelled by user",
					cancelled: true
				};
			}
			if (!connectResult.success) {
				const status = connectResult.needsAuth ? "unauthorized" : "error";
				this.updateState(configId, status, connectResult.error);
				this.disableSkills(configId);
				return {
					success: false,
					error: connectResult.error,
					needsTokenConfig: connectorConfig?.authMode === "token" && options?.forceFreshAuth ? false : void 0
				};
			}
			this.installSkills(configId);
			if (!this.persistentState.enabled.includes(configId)) this.persistentState.enabled.push(configId);
			this.markConnectorUserEnabled(configId);
			this.savePersistentState();
			this.writeConnectorsMcpConfig();
			if (serverConfig.url) this.scheduleTokenRefresh(syncConfigId, serverConfig.url, serverConfig.headers);
			this.maybeScheduleServerSideOauth(configId);
			this.refreshAndSync().catch((err) => {
				this.logger.warn("[ConnectorService] refreshAndSync after connect failed:", err);
			});
			this.updateState(configId, "connected");
			return { success: true };
		} catch (error) {
			if (signal.aborted) {
				this.updateState(configId, "disconnected");
				return {
					success: false,
					error: "Cancelled by user",
					cancelled: true
				};
			}
			const message = error instanceof Error ? error.message : String(error);
			this.logger.error(`[ConnectorService] connect(${configId}) failed:`, message);
			this.updateState(configId, "error", message);
			return {
				success: false,
				error: message
			};
		} finally {
			this.pendingCliAborts.delete(configId);
		}
	}
	async disconnect(configId, options) {
		return this.runOpExclusive(configId, () => this.doDisconnect(configId, options));
	}
	async doDisconnect(configId, options) {
		const userInitiated = options?.userInitiated !== false;
		const connectorConfig = this.getConnectorConfigById(configId);
		if (connectorConfig && this.isCliConnector(connectorConfig)) return this.disconnectCli(configId);
		if (connectorConfig && this.isSkillOnlyConnector(connectorConfig)) return this.disconnectSkillOnly(configId);
		try {
			this.updateState(configId, "disconnected");
			if (userInitiated) {
				this.persistentState.enabled = this.persistentState.enabled.filter((id) => id !== configId);
				this.markConnectorUserDisabled(configId);
				this.clearExternallyManagedStaleTokenGuard(configId);
			}
			this.savePersistentState();
			this.disableSkills(configId);
			this.tokenRefresher?.cancelRefresh(configId);
			this.tokenRefresher?.cancelRefresh(require_workbuddy_auth_product_coordinator.toProxyConfigId(configId));
			if (!this.isEnterpriseServerSideConnector(configId)) this.serverSideOauthRefresher?.stop(configId);
			if (userInitiated) this.writeConnectorsMcpConfig();
			this.refreshAndSync().catch((err) => {
				this.logger.warn(`[ConnectorService] disconnect(${configId}) refreshAndSync failed:`, err);
			});
			return { success: true };
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			this.logger.error(`[ConnectorService] disconnect(${configId}) failed:`, message);
			return {
				success: false,
				error: message
			};
		}
	}
	/**
	* 取消进行中的连接（CLI auth 等待 / OAuth 等待回调）。
	*
	* 行为：
	* - CLI auth spawn 中：abortController.abort() → executor 监听 signal 后 child.kill()
	* - CLI poll 中：abortController.abort() → poll 循环检查 signal.aborted 立即退出
	* - 已连接 / 未连接 / 无 in-flight controller：noop，返回 success
	*
	* 注意：cancel 不写 'error' 状态，写 'disconnected' 不带 error，这样：
	* 1. UI 轮询 merge 不会保护 connecting（disconnected 不在保护范围）
	* 2. 超时检测不会误弹 toast（feedback/2026-05/skill-only token UI 状态管理经验）
	*
	* OAuth 等待路径不在这里处理，由 `connector-ui-adapter.cancelConnect` 委托过来后，
	* 自己先清完 pendingOAuth 等状态再调本方法。
	*/
	async cancelConnect(configId) {
		const ctrl = this.pendingCliAborts.get(configId);
		if (ctrl) {
			this.logger.info(`[ConnectorService] cancelConnect(${configId}): aborting in-flight CLI connect`);
			ctrl.abort();
		} else this.logger.info(`[ConnectorService] cancelConnect(${configId}): no in-flight CLI connect, noop`);
		this.mcpProxy?.abortDeviceFlow(configId);
		const current = this.states.get(configId);
		if (current?.status === "connecting" || current?.status === "unauthorized" || current?.status === "error") this.updateState(configId, "disconnected");
		return { success: true };
	}
	/**
	* 标记 OAuth 授权失败（用户在浏览器授权页点「拒绝」/ provider 返错）。
	*
	* 把状态推成 `unauthorized` 并携带 error，让 UI 的
	* 「connecting → 非 connected + state.error」检测命中并弹「授权被拒绝」提示。
	*
	* 与 `cancelConnect` 的「推 disconnected 不带 error、不提示」严格区分：
	* 拒绝由 OAuth 回调事件触发（ConnectorUiAdapter 的 onOAuthCompleted 失败分支），
	* 不经过 cancelConnect，两条路径互不干扰。
	*/
	markOAuthFailed(configId, error) {
		this.logger.info(`[ConnectorService] markOAuthFailed(${configId}): ${error}`);
		this.updateState(configId, "unauthorized", error);
	}
	/**
	* MCP connector 的前置 CLI 认证（preAuth: 'cli'）。
	*
	* 流程：install CLI → version check（升级）→ status check（已授权则跳过）→ auth。
	* CLI 成功后 token 写到本地，MCP server 启动时自动读取。
	*/
	async runPreCliAuth(configId, config, signal) {
		const cliConfig = config.cliConfig;
		if (!this.cliExecutor) return {
			success: false,
			error: "CLI executor not available"
		};
		if (!await this.cliExecutor.isCliInstalled(cliConfig)) {
			this.logger.info(`[ConnectorService] preAuth(${configId}): CLI not installed, running init`);
			const installResult = await this.cliExecutor.runInstall(cliConfig);
			if (!installResult.success) return {
				success: false,
				error: `CLI install failed: ${installResult.stderr}`
			};
		}
		if (cliConfig.versionCheck) {
			const versionResult = await this.cliExecutor.checkVersion(cliConfig);
			if (versionResult.needsUpgrade) {
				this.logger.info(`[ConnectorService] preAuth(${configId}): CLI needs upgrade (current=${versionResult.currentVersion}, min=${cliConfig.versionCheck.minVersion})`);
				const upgradeResult = await this.cliExecutor.runInstall(cliConfig);
				if (!upgradeResult.success) return {
					success: false,
					error: `CLI upgrade failed: ${upgradeResult.stderr}`
				};
				const recheck = await this.cliExecutor.checkVersion(cliConfig);
				if (recheck.needsUpgrade) return {
					success: false,
					error: `CLI version ${recheck.currentVersion} still below minimum ${cliConfig.versionCheck.minVersion}`
				};
			}
		}
		if (cliConfig.status) {
			if ((await this.cliExecutor.runStatus(cliConfig)).success) {
				this.logger.info(`[ConnectorService] preAuth(${configId}): already authenticated, skip`);
				return { success: true };
			}
		}
		if (signal?.aborted) {
			this.updateState(configId, "disconnected");
			return {
				success: false,
				error: "Cancelled by user",
				cancelled: true
			};
		}
		const authResult = await this.cliExecutor.runAuth(cliConfig, {
			onQrUrl: cliConfig.authQrModal ? (url) => this.authQrUrlPusher?.({
				configId,
				url
			}) : void 0,
			onDeviceCode: cliConfig.authDeviceFlow ? (info) => {
				this.logger.info(`[ConnectorService] preAuth(${configId}): pushing device code: uri=${info.verificationUri} hasCode=${!!info.userCode}`);
				this.deviceCodePusher?.({
					configId,
					...info
				});
			} : void 0,
			suppressBrowser: cliConfig.authSuppressBrowser === true
		}, signal);
		if (authResult.cancelled || signal?.aborted) {
			this.updateState(configId, "disconnected");
			return {
				success: false,
				error: "Cancelled by user",
				cancelled: true
			};
		}
		if (!authResult.success) {
			const error = `CLI pre-auth failed: ${authResult.stderr || "unknown error"}`;
			this.updateState(configId, "error", error);
			return {
				success: false,
				error
			};
		}
		if (!cliConfig.authDeviceFlow && !cliConfig.authWaitForExit && cliConfig.status) {
			const authCompleted = await this.cliExecutor.pollAuthCompletion(cliConfig, 300 * 1e3, 3e3, signal);
			if (signal?.aborted) {
				this.updateState(configId, "disconnected");
				return {
					success: false,
					error: "Cancelled by user",
					cancelled: true
				};
			}
			if (!authCompleted) {
				this.updateState(configId, "error", "Pre-auth timed out");
				return {
					success: false,
					error: "Pre-auth timed out"
				};
			}
		}
		this.logger.info(`[ConnectorService] preAuth(${configId}): CLI auth completed`);
		return { success: true };
	}
	async updateHeaders(configId, headers, skipReconnect = false) {
		try {
			const connectorConfig = this.getConnectorConfigById(configId);
			const skillOnly = connectorConfig && this.isSkillOnlyConnector(connectorConfig);
			const headersToApply = { ...headers };
			if (this.getConnectorAccountContext().kind === "personal") {
				let strippedOneidHeader = false;
				for (const key of Object.keys(headersToApply)) {
					if (key.toLowerCase() !== "x-oneid-access-token") continue;
					delete headersToApply[key];
					strippedOneidHeader = true;
				}
				if (strippedOneidHeader) this.logger.warn("[ConnectorService] reject OneID header injection on personal account");
			}
			const previous = { ...this.persistentState.headerOverrides[configId] };
			const next = { ...previous };
			if (this.getConnectorAccountContext().kind === "personal") {
				for (const key of Object.keys(next)) if (key.toLowerCase() === "x-oneid-access-token") delete next[key];
			}
			for (const [key, value] of Object.entries(headersToApply)) if (value === "") delete next[key];
			else next[key] = value;
			const previousEntries = Object.entries(previous);
			if (!(previousEntries.length !== Object.keys(next).length || previousEntries.some(([key, value]) => next[key] !== value))) return { success: true };
			const nextAuthorization = next.Authorization ?? next.authorization;
			if (typeof nextAuthorization === "string" && nextAuthorization.length > 0) {
				const rawConfigId = this.normalizeProxyConfigId(configId);
				const guardedToken = this.externallyManagedStaleTokenGuard.get(rawConfigId);
				const nextFingerprint = this.hashTokenFingerprint(nextAuthorization);
				if (guardedToken && guardedToken.tokenFingerprint !== nextFingerprint) this.clearExternallyManagedStaleTokenGuard(rawConfigId);
			}
			if (Object.keys(next).length > 0) this.persistentState.headerOverrides[configId] = next;
			else delete this.persistentState.headerOverrides[configId];
			const authorization = next.Authorization ?? next.authorization;
			if (typeof authorization === "string" && authorization.length > 0 && this.shouldDefaultDisableCSideConnector(configId)) {
				this.markConnectorUserDisabled(configId);
				if (!this.persistentState.everConnected) this.persistentState.everConnected = [];
				if (!this.persistentState.everConnected.includes(configId)) this.persistentState.everConnected.push(configId);
				this.logger.info(`[ConnectorService] updateHeaders(${configId}): C-side library auth detected, applying default-disabled policy (everConnected + userDisabled=true)`);
			}
			this.savePersistentState();
			this.writeConnectorsMcpConfig();
			if (skillOnly || skipReconnect) return { success: true };
			if (this.persistentState.enabled.includes(configId)) {
				await this.disconnect(configId, { userInitiated: false });
				return this.connect(configId, {
					silent: true,
					skipClearClientInfo: true
				});
			}
			return { success: true };
		} catch (error) {
			return {
				success: false,
				error: error instanceof Error ? error.message : String(error)
			};
		}
	}
	async getEnterpriseConnectorOneidAccessToken(configId) {
		const syncResult = await this.syncEnterpriseConnectorTokenBeforeConnect(configId);
		if (!syncResult.success) {
			this.logger.warn(`[ConnectorService] getEnterpriseConnectorOneidAccessToken(${configId}) sync failed: ${syncResult.error}`);
			return;
		}
		const rawConfigId = this.normalizeProxyConfigId(configId);
		const headers = this.persistentState.headerOverrides[rawConfigId];
		const token = headers?.["X-Oneid-Access-Token"] ?? headers?.["x-oneid-access-token"];
		return typeof token === "string" && token.trim().length > 0 ? token.trim() : void 0;
	}
	async getTencentDocsPluginTokens() {
		const personalConfigId = "tencent-docs";
		const enterpriseConfigId = "tencent-docs-oa";
		const personalAuthorizationToken = this.resolvePersonalTencentDocsAuthorizationToken(personalConfigId);
		const personalStatus = personalAuthorizationToken ? void 0 : this.getPluginTokenConnectorUnavailableReason(personalConfigId);
		const enterpriseStatus = this.getPluginTokenConnectorUnavailableReason(enterpriseConfigId);
		const personalToken = personalAuthorizationToken ?? (personalStatus ? void 0 : this.fetchTencentDocsPersonalPluginAccessToken(personalConfigId));
		const enterpriseToken = enterpriseStatus ? void 0 : this.peekOneidHeaderOverride(enterpriseConfigId);
		this.logger.info(`[TencentDocsPluginToken] resolved personal=${personalStatus ?? (personalToken ? "available" : "token_unavailable")} enterprise=${enterpriseStatus ?? (enterpriseToken ? "available" : "token_unavailable")}`);
		return {
			personal: personalStatus ? {
				available: false,
				reason: personalStatus
			} : personalToken ? {
				available: true,
				token: personalToken
			} : {
				available: false,
				reason: "token_unavailable"
			},
			enterprise: enterpriseStatus ? {
				available: false,
				reason: enterpriseStatus
			} : enterpriseToken ? {
				available: true,
				token: enterpriseToken
			} : {
				available: false,
				reason: "token_unavailable"
			}
		};
	}
	getPluginTokenConnectorUnavailableReason(configId) {
		if (!this.persistentState.enabled.includes(configId)) return "connector_disabled";
		if (!this.isConnectorConnected(configId)) return "not_connected";
	}
	resolvePersonalTencentDocsAuthorizationToken(configId) {
		if (!this.isPersonalTencentDocsAuthorizationAvailable(configId)) return;
		const rawConfigId = this.normalizeProxyConfigId(configId);
		const headers = this.persistentState.headerOverrides[rawConfigId];
		const authorization = headers?.Authorization ?? headers?.authorization;
		if (typeof authorization !== "string") return;
		const value = authorization.trim();
		if (!value) return;
		return value.replace(/^Bearer(?:\s+|$)/i, "").trim() || void 0;
	}
	isPersonalTencentDocsAuthorizationAvailable(configId) {
		const rawConfigId = this.normalizeProxyConfigId(configId);
		if (rawConfigId !== "tencent-docs" || this.getCurrentEnterpriseId()) return false;
		const headers = this.persistentState.headerOverrides[rawConfigId];
		const authorization = headers?.Authorization ?? headers?.authorization;
		if (typeof authorization !== "string" || authorization.trim().length === 0) return false;
		return this.isCSideAutoBoundConnector(rawConfigId);
	}
	fetchTencentDocsPersonalPluginAccessToken(configId) {
		const serverConfig = this.getLatestServerConfigForConnector(configId);
		if (!serverConfig?.url) return;
		try {
			const token = this.createOAuthStore().peekTokens(require_workbuddy_auth_product_coordinator.toProxyConfigId(configId), serverConfig.url, serverConfig.headers)?.access_token;
			return typeof token === "string" && token.trim().length > 0 ? token.trim() : void 0;
		} catch (error) {
			this.logger.warn(`[ConnectorService] fetchTencentDocsPersonalPluginAccessToken(${configId}) failed:`, error instanceof Error ? error.message : String(error));
			return;
		}
	}
	async updateEnv(configId, env) {
		try {
			this.persistentState.envOverrides[configId] = {
				...this.persistentState.envOverrides[configId],
				...env
			};
			this.savePersistentState();
			if (this.persistentState.enabled.includes(configId)) {
				await this.disconnect(configId, { userInitiated: false });
				return this.connect(configId, {
					silent: true,
					skipClearClientInfo: true
				});
			}
			return { success: true };
		} catch (error) {
			return {
				success: false,
				error: error instanceof Error ? error.message : String(error)
			};
		}
	}
	async unbind(configId) {
		const connectorConfig = this.getConnectorConfigById(configId);
		if (connectorConfig && this.isCliConnector(connectorConfig)) {
			if (connectorConfig.cliConfig?.unAuth && this.cliExecutor) try {
				await this.cliExecutor.runUnAuth(connectorConfig.cliConfig);
			} catch {}
			const result = await this.disconnectCli(configId);
			this.clearConnectorUserDisabled(configId);
			this.clearEverConnected(configId);
			this.emitUnboundEvent(configId);
			return result;
		}
		this.invalidateConnectorCredentials(configId);
		if (connectorConfig?.cliConfig?.unAuth && this.cliExecutor) try {
			await this.cliExecutor.runUnAuth(connectorConfig.cliConfig);
		} catch (e) {
			this.logger.warn(`[ConnectorService] unbind(${configId}): CLI unAuth failed, ignoring:`, e);
		}
		if (this.ioaAuth) {
			const ioaOauthName = this.resolveIoaOauthNameByConfigId(configId);
			if (ioaOauthName) try {
				await this.ioaAuth.revokeToken(ioaOauthName);
				this.logger.info(`[ConnectorService] unbind(${configId}): revoked server-side token for ${ioaOauthName}`);
			} catch (e) {
				this.logger.warn(`[ConnectorService] unbind(${configId}): failed to revoke token for ${ioaOauthName}:`, e);
			}
		}
		const result = await this.disconnect(configId);
		delete this.persistentState.headerOverrides[configId];
		delete this.persistentState.envOverrides[configId];
		this.clearConnectorUserDisabled(configId);
		this.clearEverConnected(configId);
		this.savePersistentState();
		this.writeConnectorsMcpConfig();
		this.emitUnboundEvent(configId);
		return result;
	}
	/**
	* 根据套件名称解绑所有属于该套件的连接器（用于套件卸载时清理 IOA 服务端 token）
	*
	* 通过 computePluginMcpConfigs 缓存（已在内存中）找到套件对应的连接器，
	* 不依赖 manifest.connectors[].sourcePluginName（该字段当前未下发）。
	*
	* 注意：必须在套件卸载前调用（manifest 被清除之前），否则 getMarketplaceEntryById 会返回 undefined。
	*/
	async unbindConnectorsByPlugin(pluginName) {
		const pluginMcpConfigs = this.pluginMcpConfigsCache.get();
		const configIdsToUnbind = [];
		for (const [serverName, entry] of Object.entries(pluginMcpConfigs)) if (entry.sourcePluginName === pluginName) configIdsToUnbind.push(serverName);
		if (configIdsToUnbind.length === 0) {
			this.logger.info(`[ConnectorService] unbindConnectorsByPlugin: no connectors found for plugin ${pluginName}`);
			return;
		}
		if (!this.ioaAuth) return;
		for (const configId of configIdsToUnbind) try {
			let oauthName;
			try {
				oauthName = this.resolveOauthName(configId);
			} catch (e) {
				oauthName = configId;
				this.logger.warn(`[ConnectorService] unbindConnectorsByPlugin: resolveOauthName(${configId}) failed, using configId as oauthName:`, e);
			}
			this.logger.info(`[ConnectorService] unbindConnectorsByPlugin: revoking token for ${configId} (oauthName=${oauthName})`);
			await this.ioaAuth.revokeToken(oauthName);
			this.logger.info(`[ConnectorService] unbindConnectorsByPlugin: revoked server-side token for ${oauthName}`);
		} catch (err) {
			this.logger.warn(`[ConnectorService] unbindConnectorsByPlugin: failed to revoke token for ${configId}:`, err);
		}
	}
	/**
	* 向外部 pusher 发射"connector 已解绑"事件。
	* 业务侧（如腾讯文档 store）可以藉此驱动自身状态重置。
	* 失败仅记录日志，不影响 unbind 主流程。
	*/
	emitUnboundEvent(configId) {
		if (!this.unboundEventPusher) return;
		try {
			this.unboundEventPusher({ configId });
		} catch (err) {
			this.logger.warn(`[ConnectorService] unbound pusher(${configId}) threw:`, err);
		}
	}
	/**
	* 解绑时清除"曾经连过"标志和内存 state，让 UI 重新视为"从没连接过"。
	*/
	clearEverConnected(configId) {
		if (this.persistentState.everConnected) this.persistentState.everConnected = this.persistentState.everConnected.filter((id) => id !== configId);
		this.states.delete(configId);
		this.savePersistentState();
	}
	async hasOAuthToken(configId) {
		return this.mcpProxy.getClientEntry(configId)?.status === "connected";
	}
	/** 用户自定义 MCP 配置文件路径 */
	get customMcpConfigPath() {
		return (0, path.join)(this.configDir, "mcp.json");
	}
	/**
	* 取某个 MCP server 的 disabledTools 并集（mcp.json 字段 + persistentState 覆盖）。
	* 对 user / plugin / builtin scope 都生效（issue #40087）。
	*/
	resolveDisabledToolNames(serverName, mcpJsonField) {
		const fromConfig = Array.isArray(mcpJsonField) ? mcpJsonField.filter((v) => typeof v === "string") : [];
		const fromOverride = this.persistentState.disabledToolsOverrides?.[serverName] ?? [];
		return new Set([...fromConfig, ...fromOverride]);
	}
	/** Connector 运行时 MCP 配置文件路径（由旧版 plugin-chat 或 UI 写入） */
	get connectorMcpConfigPath() {
		return (0, path.join)(this.configDir, "connectors", this.getUserId(), "mcp.json");
	}
	/** 自定义 MCP server 的 configId 前缀，与 marketplace connector 区分 */
	CUSTOM_MCP_PREFIX = "custom-mcp:";
	async listMcpServers() {
		const t0 = Date.now();
		let tReadCustom = 0;
		let tUserLoop = 0;
		let tReadPlugin = 0;
		let tPluginLoop = 0;
		let tArdot = 0;
		let userScopeCount = 0;
		let pluginScopeCount = 0;
		try {
			const tCustomStart = Date.now();
			const config = this.readCustomMcpConfig();
			tReadCustom = Date.now() - tCustomStart;
			const servers = config.mcpServers || {};
			const result = [];
			const { WHITELIST_HASHES, BLACKLIST_HASHES } = this.getTrustLists();
			const userServerNames = /* @__PURE__ */ new Set();
			const tUserLoopStart = Date.now();
			for (const [name, entry] of Object.entries(servers)) {
				if (!entry || typeof entry !== "object" || !("url" in entry) && !("command" in entry)) continue;
				userServerNames.add(name);
				const configId = this.CUSTOM_MCP_PREFIX + name;
				const clientEntry = this.mcpProxy.getClientEntry(configId);
				let status = "disconnected";
				if (entry.disabled) status = "disabled";
				else if (clientEntry) switch (clientEntry.status) {
					case "connected":
						status = "connected";
						break;
					case "connecting":
						status = "connecting";
						break;
					case "unauthorized":
						status = "connecting";
						break;
					default: status = "disconnected";
				}
				const configHash = this.calculateConfigHash(entry);
				let trustLevel = "unknown";
				let mcpError = clientEntry?.error;
				let mcpStatus = status;
				if (BLACKLIST_HASHES.includes(configHash)) {
					trustLevel = "black";
					mcpStatus = "disabled";
					mcpError = "This MCP server has been identified as malicious and is blocked.";
				} else if (WHITELIST_HASHES.includes(configHash)) trustLevel = "white";
				else if (this.isUserServerApproved(name, configHash)) trustLevel = "gray";
				else if (!entry.disabled) {
					trustLevel = "gray";
					mcpStatus = "disabled";
					mcpError = "This third-party MCP server requires your approval before connecting. WorkBuddy has not verified this server.";
				}
				this.logger.info(`[MCP Security] listMcpServers: name=${name}, configHash=${configHash}, trustLevel=${trustLevel}, status=${mcpStatus}`);
				const disabledToolNames = this.resolveDisabledToolNames(name, entry.disabledTools);
				result.push({
					id: name,
					name,
					status: mcpStatus,
					description: entry.description,
					disabled: entry.disabled ?? false,
					configSource: "user",
					tools: clientEntry?.tools.map((t) => ({
						name: t.name,
						description: t.description,
						enabled: !disabledToolNames.has(t.name)
					})),
					prompts: clientEntry?.prompts,
					resources: clientEntry?.resources,
					resourceTemplates: clientEntry?.resourceTemplates,
					needsAuth: clientEntry?.needsAuth,
					error: mcpError,
					trustLevel,
					configHash,
					lastApprovedAt: this.getLastApprovedAt(name, configHash)
				});
				userScopeCount++;
			}
			tUserLoop = Date.now() - tUserLoopStart;
			try {
				const tPluginReadStart = Date.now();
				const pluginMcpConfigs = this.readPluginMcpConfigs();
				tReadPlugin = Date.now() - tPluginReadStart;
				const tPluginLoopStart = Date.now();
				for (const [name, { config, sourcePluginId, sourcePluginName, sourceMarketplaceName, sourcePluginVersion }] of Object.entries(pluginMcpConfigs)) {
					if (userServerNames.has(name)) continue;
					const configId = this.CUSTOM_MCP_PREFIX + name;
					const clientEntry = this.mcpProxy.getClientEntry(configId);
					let status = "disconnected";
					if (config.disabled) status = "disabled";
					else if (clientEntry) switch (clientEntry.status) {
						case "connected":
							status = "connected";
							break;
						case "connecting":
							status = "connecting";
							break;
						case "unauthorized":
							status = "connecting";
							break;
						default: status = "disconnected";
					}
					const pluginDisabledToolNames = this.resolveDisabledToolNames(name, config.disabledTools);
					result.push({
						id: name,
						name,
						status,
						description: config.description,
						disabled: config.disabled ?? false,
						configSource: "plugin",
						tools: clientEntry?.tools?.map((t) => ({
							name: t.name,
							description: t.description,
							enabled: !pluginDisabledToolNames.has(t.name)
						})),
						prompts: clientEntry?.prompts,
						resources: clientEntry?.resources,
						resourceTemplates: clientEntry?.resourceTemplates,
						needsAuth: clientEntry?.needsAuth,
						error: clientEntry?.error,
						trustLevel: "white",
						sourcePluginId,
						sourcePluginName,
						sourceMarketplaceName,
						sourcePluginVersion
					});
					pluginScopeCount++;
				}
				tPluginLoop = Date.now() - tPluginLoopStart;
			} catch (error) {
				this.logger.warn("[ConnectorService] Failed to read plugin MCP configs for listMcpServers:", error);
			}
			const tArdotStart = Date.now();
			if (!result.some((server) => server.id === "ardot")) {
				const effectiveArdotConfig = this.resolveEffectiveArdotMcpServer(servers[require_workbuddy_auth_product_coordinator.BUILTIN_ARDOT_MCP_SERVER_NAME]);
				if (effectiveArdotConfig) {
					const configId = this.CUSTOM_MCP_PREFIX + require_workbuddy_auth_product_coordinator.BUILTIN_ARDOT_MCP_SERVER_NAME;
					const clientEntry = this.mcpProxy.getClientEntry(configId);
					let status = "disconnected";
					if (effectiveArdotConfig.disabled) status = "disabled";
					else if (clientEntry) switch (clientEntry.status) {
						case "connected":
							status = "connected";
							break;
						case "connecting":
							status = "connecting";
							break;
						case "unauthorized":
							status = "connecting";
							break;
						default: status = "disconnected";
					}
					const ardotDisabledToolNames = this.resolveDisabledToolNames(require_workbuddy_auth_product_coordinator.BUILTIN_ARDOT_MCP_SERVER_NAME, effectiveArdotConfig.disabledTools);
					result.push({
						id: require_workbuddy_auth_product_coordinator.BUILTIN_ARDOT_MCP_SERVER_NAME,
						name: require_workbuddy_auth_product_coordinator.BUILTIN_ARDOT_MCP_SERVER_NAME,
						status,
						description: "Built-in Ardot MCP App",
						disabled: effectiveArdotConfig.disabled ?? false,
						configSource: "user",
						tools: clientEntry?.tools.map((t) => ({
							name: t.name,
							description: t.description,
							enabled: !ardotDisabledToolNames.has(t.name)
						})),
						prompts: clientEntry?.prompts,
						resources: clientEntry?.resources,
						resourceTemplates: clientEntry?.resourceTemplates,
						needsAuth: clientEntry?.needsAuth,
						error: clientEntry?.error,
						trustLevel: "white",
						configHash: this.calculateConfigHash(effectiveArdotConfig),
						lastApprovedAt: void 0
					});
				}
			}
			tArdot = Date.now() - tArdotStart;
			const totalMs = Date.now() - t0;
			const summary = `[ConnectorService] listMcpServers timing total=${totalMs}ms readCustom=${tReadCustom}ms userLoop=${tUserLoop}ms(n=${userScopeCount}) readPlugin=${tReadPlugin}ms pluginLoop=${tPluginLoop}ms(n=${pluginScopeCount}) ardot=${tArdot}ms total-servers=${result.length}`;
			if (totalMs >= 50) this.logger.warn(summary);
			else this.logger.info(summary);
			return result;
		} catch (error) {
			const totalMs = Date.now() - t0;
			this.logger.error(`[ConnectorService] listMcpServers failed after ${totalMs}ms (readCustom=${tReadCustom}ms userLoop=${tUserLoop}ms readPlugin=${tReadPlugin}ms pluginLoop=${tPluginLoop}ms ardot=${tArdot}ms):`, error);
			return [];
		}
	}
	/**
	* MCP Security: 计算 MCP Server 配置的规范化 hash
	* - stdio: sha256(command + sorted_args_keys + sorted_env_keys)（不含 value）
	* - remote: sha256(url_origin)
	*/
	calculateConfigHash(entry) {
		const crypto$3 = require("crypto");
		let input;
		if (entry.command) input = `${entry.command || ""}|${(entry.args || []).map(String).sort().join(",")}|${Object.keys(entry.env || {}).sort().join(",")}`;
		else if (entry.url) try {
			input = new URL(entry.url).origin;
		} catch {
			input = entry.url;
		}
		else input = JSON.stringify(entry);
		return crypto$3.createHash("sha256").update(input).digest("hex");
	}
	/** MCP Security: 用户授权存储（持久化到 mcp-approvals.json） */
	userServerApprovals = /* @__PURE__ */ new Map();
	approvalsLoaded = false;
	get mcpApprovalsPath() {
		return (0, path.join)(this.configDir, "mcp-approvals.json");
	}
	/**
	* 延迟加载授权记录。
	*
	* 升级迁移（仅首次启动新版本触发一次，之后永不再跑）：
	* - 判断标准：persistentState.mcpSecurityMigrated !== true
	* - 触发动作：把 mcp.json 里**已启用**（disabled !== true）的 server 视为
	*   "历史已信任"，避免升级后用户被打扰
	*
	* 关键设计：
	* - 只迁移 disabled !== true 的 server。用户在老版本里手动禁用的 server
	*   恰恰表达了"不信任/暂不使用"的意愿，不应在升级时被自动授信。
	*   这类 server 保持"待信任"状态，若用户后续想用，会走显式信任流程。
	*
	* 安全设计：
	* - 迁移标记存在 connector-states.json 而非 mcp-approvals.json
	* - 攻击者即使删除 mcp-approvals.json 也无法触发全量迁移，
	*   只会让 mcp.json 里所有 server 回到"待信任"状态（安全默认值）
	*/
	loadApprovals() {
		if (this.approvalsLoaded) return;
		this.approvalsLoaded = true;
		if ((0, fs.existsSync)(this.mcpApprovalsPath)) try {
			const content = (0, fs.readFileSync)(this.mcpApprovalsPath, "utf-8");
			const data = JSON.parse(content);
			this.userServerApprovals = new Map(Object.entries(data));
			this.logger.info(`[MCP Security] Loaded ${this.userServerApprovals.size} approvals from ${this.mcpApprovalsPath}`);
		} catch (error) {
			this.logger.warn("[MCP Security] Failed to load approvals:", error);
		}
		if (this.persistentState.mcpSecurityMigrated === true) return;
		this.logger.info("[MCP Security] First run on this version, migrating enabled mcp.json servers as trusted");
		try {
			const servers = this.readCustomMcpConfig().mcpServers || {};
			let migratedCount = 0;
			let skippedDisabledCount = 0;
			const now = Date.now();
			for (const [name, entry] of Object.entries(servers)) {
				if (!entry || typeof entry !== "object") continue;
				const e = entry;
				if (!e.url && !e.command) continue;
				if (e.disabled === true) {
					skippedDisabledCount++;
					this.logger.info(`[MCP Security] Migration skip: "${name}" is disabled in mcp.json, will require explicit trust`);
					continue;
				}
				const key = `${this.calculateConfigHash(e)}::${name}`;
				if (!this.userServerApprovals.has(key)) {
					this.userServerApprovals.set(key, now);
					migratedCount++;
				}
			}
			this.persistApprovals();
			this.persistentState.mcpSecurityMigrated = true;
			this.savePersistentState();
			this.logger.info(`[MCP Security] Migration complete: ${migratedCount} enabled server(s) auto-trusted, ${skippedDisabledCount} disabled server(s) kept as untrusted, flag persisted`);
		} catch (error) {
			this.logger.warn("[MCP Security] Migration failed:", error);
		}
	}
	persistApprovals() {
		try {
			(0, fs.mkdirSync)(this.configDir, { recursive: true });
			const data = Object.fromEntries(this.userServerApprovals);
			(0, fs.writeFileSync)(this.mcpApprovalsPath, JSON.stringify(data, null, 2), "utf-8");
		} catch (error) {
			this.logger.warn("[MCP Security] Failed to persist approvals:", error);
		}
	}
	/** MCP Security: 内置白/黑名单 */
	getTrustLists() {
		return {
			WHITELIST_HASHES: [],
			BLACKLIST_HASHES: []
		};
	}
	isUserServerApproved(serverName, configHash) {
		this.loadApprovals();
		return this.userServerApprovals.has(`${configHash}::${serverName}`);
	}
	getLastApprovedAt(serverName, configHash) {
		this.loadApprovals();
		return this.userServerApprovals.get(`${configHash}::${serverName}`);
	}
	/** MCP Security: 用户授权 MCP Server（UI 层调用） */
	async approveMcpServer(serverName) {
		const entry = this.readCustomMcpConfig().mcpServers?.[serverName];
		if (!entry) throw new Error(`MCP server "${serverName}" not found`);
		this.loadApprovals();
		const configHash = this.calculateConfigHash(entry);
		this.userServerApprovals.set(`${configHash}::${serverName}`, Date.now());
		this.persistApprovals();
		this.logger.info(`[MCP Security] User approved: ${serverName} (hash: ${configHash})`);
		this.refreshAndSync().catch((err) => {
			this.logger.warn("[ConnectorService] refreshAndSync after approval failed:", err);
		});
	}
	async connectCustomMcpServer(params) {
		const serverName = params.name?.trim();
		if (!serverName) return {
			success: false,
			error: "MCP server name is required"
		};
		const config = this.readCustomMcpConfig();
		const servers = config.mcpServers || {};
		const desiredConfig = this.stripWorkbuddyMcpMeta(this.applyMcpTokenValues(params.config, params.tokenValues));
		const existing = servers[serverName];
		if (existing && !params.overwrite && !this.isSameMcpConfig(existing, desiredConfig)) return {
			success: false,
			conflict: true,
			existing
		};
		const nextConfig = {
			...desiredConfig,
			disabled: false
		};
		servers[serverName] = nextConfig;
		config.mcpServers = servers;
		this.writeCustomMcpConfig(config);
		this.mcpJsonCache.invalidate(this.customMcpConfigPath);
		this.loadApprovals();
		const configHash = this.calculateConfigHash(nextConfig);
		if (!this.isUserServerApproved(serverName, configHash)) {
			this.userServerApprovals.set(`${configHash}::${serverName}`, Date.now());
			this.persistApprovals();
		}
		this.lastSelfWriteCustomMcpAt = Date.now();
		return { success: true };
	}
	async reconnectMcpServer(serverName, options) {
		const servers = this.readCustomMcpConfig().mcpServers || {};
		let serverConfig = servers[serverName];
		if (!serverConfig) {
			const pluginEntry = this.readPluginMcpConfigs()[serverName];
			if (pluginEntry) serverConfig = pluginEntry.config;
		}
		if (!serverConfig) throw new Error(`MCP server "${serverName}" not found in config`);
		const configId = this.CUSTOM_MCP_PREFIX + serverName;
		if (!!servers[serverName]) {
			const configHash = this.calculateConfigHash(serverConfig);
			const { WHITELIST_HASHES } = this.getTrustLists();
			if (!WHITELIST_HASHES.includes(configHash) && !this.isUserServerApproved(serverName, configHash)) {
				this.logger.warn(`[ConnectorService] reconnectMcpServer(${serverName}) blocked: server not approved (hash: ${configHash}). Use approveMcpServer() first.`);
				return;
			}
		}
		if (this.mcpProxy.getClientEntry(configId)?.status === "connected") {
			this.mcpProxy.refreshTools(configId).catch((err) => {
				this.logger.warn(`[ConnectorService] reconnectMcpServer(${serverName}) refreshTools failed: ${err?.message || err}`);
			});
			return;
		}
		if (!options?.skipClearClientInfo && serverConfig.url) this.mcpProxy.invalidateCredentials(configId, serverConfig.url, "all", serverConfig.headers);
		this.mcpProxy.connect(configId, serverConfig, false, { force: true }).then(() => {
			this.logger.info(`[ConnectorService] reconnectMcpServer(${serverName}) connected`);
		}).catch((err) => {
			this.logger.warn(`[ConnectorService] reconnectMcpServer(${serverName}) failed: ${err?.message || err}`);
		});
	}
	async toggleMcpServer(serverName, enabled) {
		const config = this.readCustomMcpConfig();
		const servers = config.mcpServers || {};
		if (!servers[serverName]) return;
		servers[serverName].disabled = !enabled;
		config.mcpServers = servers;
		this.writeCustomMcpConfig(config);
		if (enabled) {
			this.loadApprovals();
			const configHash = this.calculateConfigHash(servers[serverName]);
			if (!this.isUserServerApproved(serverName, configHash)) {
				this.userServerApprovals.set(`${configHash}::${serverName}`, Date.now());
				this.persistApprovals();
				this.logger.info(`[MCP Security] toggleMcpServer: ${serverName} enabled → approval recorded (hash: ${configHash})`);
			}
			this.refreshAndSync().catch((err) => {
				this.logger.warn("[ConnectorService] refreshAndSync after toggle failed:", err);
			});
		}
	}
	async deleteMcpServer(serverName) {
		const config = this.readCustomMcpConfig();
		const servers = config.mcpServers || {};
		if (servers[serverName]) {
			const configId = `${this.CUSTOM_MCP_PREFIX}${serverName}`;
			const serverUrl = servers[serverName]?.url;
			if (this.ioaAuth) {
				const ioaOauthName = this.ioaAuth.resolveOauthNameByUrl(serverUrl);
				if (ioaOauthName) try {
					await this.ioaAuth.revokeToken(ioaOauthName);
					this.logger.info(`[ConnectorService] deleteMcpServer(${serverName}): revoked server-side token for ${ioaOauthName}`);
				} catch (e) {
					this.logger.warn(`[ConnectorService] deleteMcpServer(${serverName}): failed to revoke token for ${ioaOauthName}:`, e);
				}
			}
			if (serverUrl) this.mcpProxy.invalidateCredentials(configId, serverUrl, "all");
			delete servers[serverName];
			config.mcpServers = servers;
			this.writeCustomMcpConfig(config);
		}
	}
	async toggleMcpTool(serverName, toolName, enabled) {
		if (!this.persistentState.disabledToolsOverrides) this.persistentState.disabledToolsOverrides = {};
		const overrides = this.persistentState.disabledToolsOverrides;
		const current = new Set(overrides[serverName] ?? []);
		if (enabled) current.delete(toolName);
		else current.add(toolName);
		if (current.size === 0) delete overrides[serverName];
		else overrides[serverName] = Array.from(current);
		this.savePersistentState();
		const config = this.readCustomMcpConfig();
		const servers = config.mcpServers || {};
		const server = servers[serverName];
		if (server) {
			if (current.size === 0) delete server.disabledTools;
			else server.disabledTools = Array.from(current);
			config.mcpServers = servers;
			this.writeCustomMcpConfig(config);
		}
		this.refreshAndSync().catch((err) => {
			this.logger.warn("[ConnectorService] refreshAndSync after toggleMcpTool failed:", err);
		});
	}
	async openMcpConfig() {
		this.ensureCustomMcpConfig();
		await this.hostCapabilities.openPath(this.customMcpConfigPath);
	}
	async getMcpConfigContent() {
		this.ensureCustomMcpConfig();
		try {
			const content = (0, fs.readFileSync)(this.customMcpConfigPath, "utf-8");
			return {
				filePath: this.customMcpConfigPath,
				content
			};
		} catch {
			const defaultContent = JSON.stringify({ mcpServers: {} }, null, 2);
			return {
				filePath: this.customMcpConfigPath,
				content: defaultContent
			};
		}
	}
	async saveMcpConfigContent(content) {
		const parsed = JSON.parse(content);
		const normalized = JSON.stringify(parsed, null, 2);
		(0, fs.mkdirSync)(this.configDir, { recursive: true });
		(0, fs.writeFileSync)(this.customMcpConfigPath, normalized, "utf-8");
		this.mcpJsonCache.invalidate(this.customMcpConfigPath);
		this.pluginMcpConfigsCache.invalidate();
	}
	readCustomMcpConfig() {
		return this.mcpJsonCache.get(this.customMcpConfigPath);
	}
	stripWorkbuddyMcpMeta(config) {
		const { ["x-workbuddy"]: _workbuddy, ...rest } = config;
		return rest;
	}
	applyMcpTokenValues(config, tokenValues) {
		if (!tokenValues || Object.keys(tokenValues).length === 0) return this.cloneJsonObject(config);
		const replaceValue = (value) => {
			if (typeof value === "string") return value.replace(/\$\{([A-Z0-9_]+)\}/g, (match, key) => tokenValues[key] ?? match);
			if (Array.isArray(value)) return value.map(replaceValue);
			if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, replaceValue(child)]));
			return value;
		};
		return replaceValue(config);
	}
	isSameMcpConfig(a, b) {
		return this.stableStringify(this.normalizeMcpConfigForCompare(a)) === this.stableStringify(this.normalizeMcpConfigForCompare(b));
	}
	normalizeMcpConfigForCompare(value) {
		if (Array.isArray(value)) return value.map((item) => this.normalizeMcpConfigForCompare(item));
		if (!value || typeof value !== "object") return value;
		return Object.fromEntries(Object.entries(value).filter(([key]) => key !== "disabled").map(([key, child]) => [key, this.normalizeMcpConfigForCompare(child)]));
	}
	stableStringify(value) {
		if (Array.isArray(value)) return `[${value.map((item) => this.stableStringify(item)).join(",")}]`;
		if (!value || typeof value !== "object") return JSON.stringify(value);
		return `{${Object.entries(value).sort(([a], [b]) => a.localeCompare(b)).map(([key, child]) => `${JSON.stringify(key)}:${this.stableStringify(child)}`).join(",")}}`;
	}
	cloneJsonObject(value) {
		return JSON.parse(JSON.stringify(value));
	}
	/**
	* 扫描已安装且已启用插件的 .mcp.json，返回 MCP 服务器字典。
	*
	* 每条 entry 额外记录 `_sourcePluginId`（`name@marketplace`）供调用方引用。
	*
	* 扫描路径（优先按 marketplace.json 的 plugins[].source 字段定位）：
	*   {configDir}/plugins/marketplaces/{marketplace}/marketplace.json
	*   → 解析 plugins[].source → 插件目录 → .mcp.json
	*
	* Fallback（兼容旧市场结构）：
	*   {configDir}/plugins/marketplaces/{marketplace}/plugins/{pluginName}/.mcp.json
	*
	* 仅返回 enabledPlugins[name@marketplace] === true 的条目。
	*
	* 缓存：走 `pluginMcpConfigsCache`（300ms TTL），同一 burst 内多次调用复用结果；
	* settings.json / mcp.json 改动 → onConfigFileChanged 主动失效。
	*/
	readPluginMcpConfigs() {
		return this.pluginMcpConfigsCache.get();
	}
	/**
	* `readPluginMcpConfigs` 的真实计算：扫 `plugins/marketplaces/` 整层目录。
	* 调用方走 `readPluginMcpConfigs` 即可，外面不要直接调本方法（会绕过 TTL 缓存）。
	*/
	computePluginMcpConfigs() {
		const result = {};
		const t0 = Date.now();
		let marketplaceCount = 0;
		let pluginDirCount = 0;
		try {
			const settingsPath = (0, path.join)(this.configDir, "settings.json");
			let enabledPlugins = {};
			try {
				enabledPlugins = JSON.parse((0, fs.readFileSync)(settingsPath, "utf-8")).enabledPlugins || {};
			} catch (error) {
				if (error.code !== "ENOENT") this.logger.warn("[ConnectorService] computePluginMcpConfigs: failed to read settings.json:", error);
				return result;
			}
			const enabledByMarketplace = this.buildEnabledPluginIndex(enabledPlugins);
			const enabledCount = Object.values(enabledPlugins).filter(Boolean).length;
			this.logger.info(`[ConnectorService] computePluginMcpConfigs: start (enabledPlugins=${enabledCount}, marketplaces=${enabledByMarketplace.size})`);
			const marketplacesDir = (0, path.join)(this.configDir, "plugins", "marketplaces");
			if (!(0, fs.existsSync)(marketplacesDir)) {
				this.logger.info(`[ConnectorService] computePluginMcpConfigs: done in ${Date.now() - t0}ms (marketplaces=0, pluginDirs=0, servers=0, reason=no-marketplaces-dir)`);
				return result;
			}
			for (const marketplaceEntry of (0, fs.readdirSync)(marketplacesDir, { withFileTypes: true })) {
				if (!marketplaceEntry.isDirectory()) continue;
				marketplaceCount++;
				const marketplaceDir = (0, path.join)(marketplacesDir, marketplaceEntry.name);
				const t1 = Date.now();
				const pluginDirs = this.collectEnabledPluginDirs(marketplaceDir, marketplaceEntry.name, enabledByMarketplace);
				pluginDirCount += pluginDirs.length;
				for (const { dir: pluginDir, name: fallbackName, marketplaceNames } of pluginDirs) try {
					const servers = this.loadPluginMcpServers(pluginDir, fallbackName, enabledPlugins, marketplaceNames);
					for (const [serverName, entry] of Object.entries(servers)) result[serverName] = entry;
				} catch (error) {
					this.logger.warn(`[ConnectorService] computePluginMcpConfigs: failed to process plugin at ${pluginDir}:`, error);
				}
				this.logger.info(`[ConnectorService] computePluginMcpConfigs: marketplace=${marketplaceEntry.name} pluginDirs=${pluginDirs.length} elapsedMs=${Date.now() - t1}`);
			}
		} catch (error) {
			this.logger.warn("[ConnectorService] computePluginMcpConfigs failed:", error);
		}
		const elapsedMs = Date.now() - t0;
		this.logger.info(`[ConnectorService] computePluginMcpConfigs: done in ${elapsedMs}ms (marketplaces=${marketplaceCount}, pluginDirs=${pluginDirCount}, servers=${Object.keys(result).length})`);
		return result;
	}
	/**
	* 从 enabledPlugins 建立 marketplaceFriendlyName → Set<pluginName> 索引。
	* enabledPlugins key 格式：pluginName@marketplaceFriendlyName
	*/
	buildEnabledPluginIndex(enabledPlugins) {
		const index = /* @__PURE__ */ new Map();
		for (const key of Object.keys(enabledPlugins)) {
			if (!enabledPlugins[key]) continue;
			const atIdx = key.indexOf("@");
			if (atIdx <= 0) continue;
			const pluginName = key.substring(0, atIdx);
			const marketplaceName = key.substring(atIdx + 1);
			if (!index.has(marketplaceName)) index.set(marketplaceName, /* @__PURE__ */ new Set());
			index.get(marketplaceName).add(pluginName);
		}
		return index;
	}
	/**
	* 读取 marketplace 目录下启用插件的目录列表。
	*
	* 优先从 marketplace.json 的 plugins[].source 字段定位插件目录，
	* 并借助 enabledByMarketplace 索引跳过未启用的插件，避免无谓的磁盘访问。
	* 无法匹配到启用索引时（自定义市场无 name 字段等）降级为全量扫描。
	* 无 marketplace.json 时回退到扫描 plugins/ 子目录（兼容旧市场结构）。
	*/
	collectEnabledPluginDirs(marketplaceDir, marketplaceStorageName, enabledByMarketplace) {
		const PLUGIN_METADATA_DIRS = [
			".codebuddy-plugin",
			".workbuddy-plugin",
			".claude-plugin"
		];
		const pluginDirs = [];
		let marketplaceJsonPath;
		for (const candidate of [(0, path.join)(marketplaceDir, "marketplace.json"), ...PLUGIN_METADATA_DIRS.map((m) => (0, path.join)(marketplaceDir, m, "marketplace.json"))]) try {
			(0, fs.readFileSync)(candidate);
			marketplaceJsonPath = candidate;
			break;
		} catch {}
		if (marketplaceJsonPath) {
			try {
				const manifest = JSON.parse((0, fs.readFileSync)(marketplaceJsonPath, "utf-8"));
				if (!manifest.plugins || !Array.isArray(manifest.plugins)) return pluginDirs;
				const resolvedBase = (0, path.resolve)(marketplaceDir);
				const marketplaceNames = Array.from(new Set([typeof manifest.name === "string" ? manifest.name : void 0, marketplaceStorageName].filter((name) => Boolean(name))));
				const enabledInThisMarketplace = /* @__PURE__ */ new Set();
				for (const marketplaceName of marketplaceNames) {
					const enabled = enabledByMarketplace.get(marketplaceName);
					if (!enabled) continue;
					for (const pluginName of enabled) enabledInThisMarketplace.add(pluginName);
				}
				if (marketplaceNames.length > 0 && enabledInThisMarketplace.size === 0) return pluginDirs;
				for (const p of manifest.plugins) {
					if (enabledInThisMarketplace.size > 0 && !enabledInThisMarketplace.has(p.name)) continue;
					const relativePath = typeof p.source === "string" ? p.source : p.source?.source === "local" && typeof p.source?.path === "string" ? p.source.path : "";
					if (!relativePath) continue;
					const absPath = (0, path.resolve)(marketplaceDir, relativePath);
					if (!absPath.startsWith(resolvedBase + path.sep) && absPath !== resolvedBase) {
						this.logger.warn(`[ConnectorService] computePluginMcpConfigs: plugin source path escapes marketplace dir: ${relativePath}`);
						continue;
					}
					pluginDirs.push({
						dir: absPath,
						name: p.name || "",
						marketplaceNames
					});
				}
			} catch (error) {
				this.logger.warn(`[ConnectorService] computePluginMcpConfigs: failed to parse marketplace.json at ${marketplaceJsonPath}:`, error);
			}
			return pluginDirs;
		}
		const pluginsDir = (0, path.join)(marketplaceDir, "plugins");
		try {
			for (const entry of (0, fs.readdirSync)(pluginsDir, { withFileTypes: true })) if (entry.isDirectory()) pluginDirs.push({
				dir: (0, path.join)(pluginsDir, entry.name),
				name: entry.name,
				marketplaceNames: [marketplaceStorageName]
			});
		} catch {}
		return pluginDirs;
	}
	/**
	* 读取单个插件目录的 MCP server 配置。
	* 插件须包含 plugin.json（在 metadata 子目录下）且已被用户启用，否则返回空对象。
	* 插件须包含 .mcp.json，否则返回空对象。
	*/
	loadPluginMcpServers(pluginDir, fallbackName, enabledPlugins, marketplaceNames) {
		const PLUGIN_METADATA_DIRS = [
			".codebuddy-plugin",
			".workbuddy-plugin",
			".claude-plugin"
		];
		let pluginMeta;
		for (const metaDir of PLUGIN_METADATA_DIRS) try {
			pluginMeta = JSON.parse((0, fs.readFileSync)((0, path.join)(pluginDir, metaDir, "plugin.json"), "utf-8"));
			break;
		} catch {}
		if (!pluginMeta) return {};
		const pluginName = pluginMeta.name || fallbackName;
		const pluginVersion = typeof pluginMeta.version === "string" ? pluginMeta.version : void 0;
		const pluginId = this.findEnabledPluginId(pluginName, enabledPlugins, marketplaceNames);
		if (!pluginId || !enabledPlugins[pluginId]) return {};
		const atIdx = pluginId.indexOf("@");
		const sourcePluginName = atIdx >= 0 ? pluginId.slice(0, atIdx) : pluginId;
		const sourceMarketplaceName = atIdx >= 0 ? pluginId.slice(atIdx + 1) : void 0;
		let mcpContent;
		try {
			mcpContent = JSON.parse((0, fs.readFileSync)((0, path.join)(pluginDir, ".mcp.json"), "utf-8"));
		} catch {
			return {};
		}
		const servers = mcpContent.mcpServers || mcpContent;
		if (typeof servers !== "object" || Array.isArray(servers)) return {};
		const result = {};
		for (const [serverName, serverConfig] of Object.entries(servers)) {
			if (!serverConfig || typeof serverConfig !== "object") continue;
			const cfg = serverConfig;
			if (!cfg.type || typeof cfg.type !== "string") {
				if (typeof cfg.command === "string" && cfg.command) cfg.type = "stdio";
				else if (typeof cfg.url === "string" && cfg.url) cfg.type = "http";
			}
			result[serverName] = {
				config: cfg,
				sourcePluginId: pluginId,
				sourcePluginName,
				sourceMarketplaceName,
				sourcePluginVersion: pluginVersion
			};
		}
		return result;
	}
	/**
	* 在 enabledPlugins 字典里查找与 pluginName 匹配的 key。
	* enabledPlugins key 格式为 "pluginName@marketplaceFriendlyName"。
	*/
	findEnabledPluginId(pluginName, enabledPlugins, marketplaceNames) {
		for (const marketplaceName of marketplaceNames ?? []) {
			const key = `${pluginName}@${marketplaceName}`;
			if (enabledPlugins[key]) return key;
		}
		for (const key of Object.keys(enabledPlugins)) {
			const atIdx = key.indexOf("@");
			if (atIdx > 0 && key.substring(0, atIdx) === pluginName) return key;
		}
	}
	writeCustomMcpConfig(config) {
		(0, fs.mkdirSync)(this.configDir, { recursive: true });
		(0, fs.writeFileSync)(this.customMcpConfigPath, JSON.stringify(config, null, 2), "utf-8");
		this.mcpJsonCache.invalidate(this.customMcpConfigPath);
		this.pluginMcpConfigsCache.invalidate();
	}
	ensureCustomMcpConfig() {
		(0, fs.mkdirSync)(this.configDir, { recursive: true });
		if (!(0, fs.existsSync)(this.customMcpConfigPath)) {
			(0, fs.writeFileSync)(this.customMcpConfigPath, JSON.stringify({ mcpServers: {} }, null, 2), "utf-8");
			this.mcpJsonCache.invalidate(this.customMcpConfigPath);
		}
	}
	/**
	* 确保 settings.json 存在。
	*
	* Issue #49159 follow-up：plugin MCP 决议依赖 `settings.json` 的 `enabledPlugins`。
	* 首次运行 / 未安装任何插件时该文件可能不存在，会出现两个具体问题：
	*
	* 1. `watchMcpConfig` 在文件不存在时直接 continue，**永远不会监听到首次创建**。
	*    一旦插件 service 在 doInit 之后第一次写出 settings.json，watcher 不触发,
	*    `pluginMcpConfigsCache` 60 秒 TTL 内仍然返回空字典 →
	*    listMcpServers / buildDesiredConfigs 都看不到新插件的 MCP server。
	*
	* 2. 即便 plugin handler 主动调 refreshAndSync，`computePluginMcpConfigs`
	*    读 settings.json 走 ENOENT 分支，cache 把"空 enabledPlugins"的结果缓存
	*    60 秒，期间用户启用的插件 MCP server 不会进入 sync 流程。
	*
	* 在 doInit 的 watchMcpConfig 之前调用，预创建一个空 `{}` 让 fs.watch 能 attach；
	* 真正的内容由插件 service 后续覆盖（覆盖即写 → 触发 watcher → invalidate）。
	*/
	ensureSettingsFile() {
		const settingsPath = (0, path.join)(this.configDir, "settings.json");
		(0, fs.mkdirSync)(this.configDir, { recursive: true });
		if (!(0, fs.existsSync)(settingsPath)) {
			(0, fs.writeFileSync)(settingsPath, JSON.stringify({}, null, 2), "utf-8");
			this.pluginMcpConfigsCache.invalidate();
		}
	}
	/**
	* 决议生效的 Ardot MCP 配置：
	* - 当用户 mcp.json 显式声明了带 `dev: true` 的合法 Ardot 条目，使用用户配置；
	* - 否则回退到内置 Ardot MCP App（运行时已托管的本地 HTTP server）。
	* 内置 cli.cjs 不存在时返回 undefined，调用方应跳过相应建联。
	*/
	resolveEffectiveArdotMcpServer(userEntry) {
		if (isValidArdotDevMcpServer(userEntry)) {
			this.logger.info("[ConnectorService] using user dev Ardot MCP config");
			return userEntry;
		}
		const builtinEntry = createBuiltinArdotMcpServer(void 0, this.builtinArdotMcpUrl);
		if (!builtinEntry) {
			this.logger.warn("[ConnectorService] bundled Ardot MCP app not found; skipping built-in ardot server");
			return;
		}
		if (userEntry !== void 0) this.logger.info("[ConnectorService] overriding invalid/non-dev Ardot MCP config with built-in runtime config");
		return builtinEntry;
	}
	/**
	* 在 doInit 阶段托管启动内置 Ardot MCP HTTP server。
	* - 如果用户已声明合法的 dev 配置则跳过（避免与外部进程抢端口）；
	* - 动态选取可用端口（默认 50551 起向上探测），刷新对外发布的 url；
	* - 启动后等待 HTTP 探活成功，避免后续 refreshAndSync 抢跑导致建联失败。
	*/
	async ensureBuiltinArdotMcpProcessIfNeeded() {
		if (isValidArdotDevMcpServer(this.readCustomMcpConfig().mcpServers?.["ardot"])) {
			this.logger.info("[ConnectorService] skip built-in Ardot MCP process because valid dev config exists");
			return;
		}
		if (!createBuiltinArdotMcpServer(void 0, this.builtinArdotMcpUrl)) {
			this.logger.warn("[ConnectorService] bundled Ardot MCP config unavailable; built-in process not started");
			return;
		}
		this.builtinArdotMcpPort = await this.findAvailableArdotMcpPort();
		this.builtinArdotMcpUrl = buildBuiltinArdotMcpUrl(this.builtinArdotMcpPort);
		this.ensureBuiltinArdotMcpProcess();
		if (!await this.waitForBuiltinArdotMcpReady()) this.logger.warn(`[ConnectorService] built-in Ardot MCP did not become ready at ${this.builtinArdotMcpUrl}`);
	}
	/**
	* 启动内置 Ardot MCP child 进程（幂等）。
	* 使用 ELECTRON_RUN_AS_NODE 在 Electron 自带运行时执行 cli.cjs，避免外部 Node 依赖。
	* 启动后挂上 stdout/stderr 转发与 30s 健康检查；进程退出/错误时自动清理状态。
	*/
	ensureBuiltinArdotMcpProcess() {
		if (this.builtinArdotMcpProcess && !this.builtinArdotMcpProcess.killed) return;
		const cliPath = resolveBuiltinArdotMcpCliPath();
		if (!cliPath) {
			this.logger.warn("[ConnectorService] cannot start built-in Ardot MCP app: cli.cjs not found");
			return;
		}
		const bootstrapPath = resolveBuiltinMcpAppBootstrapPath();
		const spawnArgs = bootstrapPath ? [
			"--require",
			bootstrapPath,
			cliPath
		] : [cliPath];
		if (bootstrapPath) this.logger.info(`[ArdotMCPDiag] [ConnectorService] built-in Ardot MCP launching with bootstrap=${bootstrapPath}`);
		else this.logger.warn("[ArdotMCPDiag] [ConnectorService] mcp-app-bootstrap.cjs not found; built-in Ardot MCP will run without http timeout patch (long SSE streams may be cut at 5min)");
		const cwd = this.resolveOwnedMcpProcessCwd(`builtin:${require_workbuddy_auth_product_coordinator.BUILTIN_ARDOT_MCP_SERVER_NAME}`);
		const ardotEmbedUrl = resolveArdotEmbedUrl();
		this.logger.info(`[ConnectorService] built-in Ardot MCP embed url=${ardotEmbedUrl}`);
		const child = (0, child_process.spawn)(process.execPath, spawnArgs, {
			cwd,
			env: {
				...process.env,
				ELECTRON_RUN_AS_NODE: "1",
				MCP_APP_EMBED_URL: ardotEmbedUrl,
				MCP_APP_PORT: String(this.builtinArdotMcpPort)
			},
			stdio: [
				"ignore",
				"pipe",
				"pipe"
			]
		});
		this.builtinArdotMcpProcess = child;
		child.stdout?.on("data", (chunk) => {
			this.logger.info(`[ConnectorService] built-in Ardot MCP stdout: ${String(chunk).trim()}`);
		});
		child.stderr?.on("data", (chunk) => {
			this.logger.warn(`[ConnectorService] built-in Ardot MCP stderr: ${String(chunk).trim()}`);
		});
		child.on("exit", (code, signal) => {
			if (this.builtinArdotMcpProcess === child) this.builtinArdotMcpProcess = null;
			this.stopBuiltinArdotMcpHealthCheck();
			this.logger.info(`[ConnectorService] built-in Ardot MCP exited code=${code ?? "null"} signal=${signal ?? "null"}`);
		});
		child.on("error", (error) => {
			if (this.builtinArdotMcpProcess === child) this.builtinArdotMcpProcess = null;
			this.stopBuiltinArdotMcpHealthCheck();
			this.logger.warn(`[ConnectorService] failed to start built-in Ardot MCP app: ${error instanceof Error ? error.message : String(error)}`);
		});
		this.logger.info(`[ConnectorService] started built-in Ardot MCP app from ${cliPath} port=${this.builtinArdotMcpPort}`);
		this.startBuiltinArdotMcpHealthCheck(child);
	}
	startBuiltinArdotMcpHealthCheck(child) {
		this.stopBuiltinArdotMcpHealthCheck();
		this.builtinArdotMcpHealthTimer = setInterval(() => {
			if (this.builtinArdotMcpProcess !== child || child.killed) {
				this.stopBuiltinArdotMcpHealthCheck();
				return;
			}
			try {
				process.kill(child.pid, 0);
				this.logger.info(`[ConnectorService] built-in Ardot MCP alive pid=${child.pid}`);
			} catch (error) {
				this.logger.warn(`[ConnectorService] built-in Ardot MCP health check failed pid=${child.pid}: ${error instanceof Error ? error.message : String(error)}`);
			}
		}, 3e4);
	}
	stopBuiltinArdotMcpHealthCheck() {
		if (this.builtinArdotMcpHealthTimer) {
			clearInterval(this.builtinArdotMcpHealthTimer);
			this.builtinArdotMcpHealthTimer = null;
		}
	}
	/**
	* 从默认端口起向上探测，返回首个可用端口。
	* 用于规避上一次进程未优雅退出导致 EADDRINUSE 的场景。
	*/
	async findAvailableArdotMcpPort() {
		for (let port = BUILTIN_ARDOT_MCP_DEFAULT_PORT; port < BUILTIN_ARDOT_MCP_DEFAULT_PORT + 50; port++) if (await this.isPortAvailable(port)) {
			if (port !== 50551) this.logger.info(`[ConnectorService] default Ardot MCP port ${BUILTIN_ARDOT_MCP_DEFAULT_PORT} is occupied; using ${port}`);
			return port;
		}
		throw new Error(`No available Ardot MCP port found from ${BUILTIN_ARDOT_MCP_DEFAULT_PORT}`);
	}
	isPortAvailable(port) {
		return new Promise((resolve) => {
			const server = net.createServer();
			server.once("error", () => resolve(false));
			server.once("listening", () => {
				server.close(() => resolve(true));
			});
			server.listen(port, "127.0.0.1");
		});
	}
	dispose() {
		if (this.updateTimer) {
			clearInterval(this.updateTimer);
			this.updateTimer = null;
		}
		if (this.mcpConfigWatcher) {
			this.mcpConfigWatcher.close();
			this.mcpConfigWatcher = null;
		}
		if (this.mcpConfigDebounceTimer) {
			clearTimeout(this.mcpConfigDebounceTimer);
			this.mcpConfigDebounceTimer = null;
		}
		this.stopBuiltinArdotMcpHealthCheck();
		this.clearExternallyManagedTokenRetryState();
		this.clearExternallyManagedStaleTokenGuard();
		this.unauthorizedNotifyThrottle.clear();
		const child = this.builtinArdotMcpProcess;
		this.builtinArdotMcpProcess = null;
		if (child && !child.killed) {
			this.logger.info(`[ConnectorService] stopping built-in Ardot MCP pid=${child.pid}`);
			child.kill();
		}
		this.mcpProxy.dispose();
		this.tokenRefresher?.dispose();
		this.tokenRefresher = null;
		for (const configId of this.persistentState.enabled) this.serverSideOauthRefresher?.stop(configId);
		this.serverSideOauthRefresher = null;
	}
	async waitForBuiltinArdotMcpReady(timeoutMs = 8e3) {
		const deadline = Date.now() + timeoutMs;
		while (Date.now() < deadline) {
			if (await this.probeBuiltinArdotMcp()) return true;
			await new Promise((resolve) => setTimeout(resolve, 250));
		}
		return false;
	}
	probeBuiltinArdotMcp() {
		return new Promise((resolve) => {
			const request = http.get(this.builtinArdotMcpUrl, { agent: false }, (response) => {
				response.resume();
				resolve(true);
			});
			request.setTimeout(1e3, () => {
				request.destroy();
				resolve(false);
			});
			request.on("error", () => resolve(false));
		});
	}
	async doInit() {
		try {
			this.logger.info("[ConnectorService] Initializing...");
			const skillsDir = (0, path.join)(this.configDir, "skills");
			if (!(0, fs.existsSync)(skillsDir)) (0, fs.mkdirSync)(skillsDir, { recursive: true });
			this.migrateLegacyConnectorSkills();
			this.loadPersistentState();
			this.loadApprovals();
			this.proxyServer.setConnectorService(this);
			const port = await this.proxyServer.start();
			this.logger.info(`[ConnectorService] Proxy MCP Server started on port ${port}`);
			this.writeProxyMcpConfig(port);
			this.startTokenRefresher();
			this.startServerSideOauthRefresher();
			this.mcpProxy.onRefreshExternalAuthBeforeReconnect((configId) => this.refreshExternalAuthBeforeReconnect(configId));
			this.mcpProxy.onResolveRequestAuthInjectionHeaders((configId, sessionId, projectId) => this.resolveRequestAuthInjectionHeaders(configId, sessionId, projectId));
			this.ioaAuth = new IoaServerSideAuth({
				getApiEndpoint: () => this.productManager.getEndpoint(),
				buildAuthHeaders: (c, t, csrf) => this.authenticationManager.buildAuthHeaders?.(c ?? true, t ?? true, csrf ?? false) ?? {},
				fetch: this.hostCapabilities?.fetch || fetch,
				openExternal: (url) => this.hostCapabilities.openExternal(url),
				getEnterpriseId: () => this.authService?.getAccount?.()?.enterpriseId,
				logger: this.logger
			});
			this.mcpProxy.setIoaServerSideAuth?.(this.ioaAuth);
			this.mcpProxy.onStatusChanged((configId, status, error) => {
				const normalizedId = this.normalizeProxyConfigId(configId);
				this.logger.info(`[ConnectorService] onStatusChanged: raw=${configId}, normalized=${normalizedId}, status=${status}${error ? ` (${error})` : ""}`);
				if (!this.persistentState.enabled.includes(normalizedId)) {
					this.logger.info(`[ConnectorService] onStatusChanged: ${normalizedId} not in enabled list, ignoring`);
					return;
				}
				this.updateState(normalizedId, status, error);
				if (status === "connected") {
					this.installSkills(normalizedId);
					this.writeConnectorsMcpConfig();
				} else this.disableSkills(normalizedId);
			});
			await this.syncMarketplaceContent();
			this.rebuildAuthInjectionRuleCache();
			if (this.stripBearerPrefixFromExternallyManagedHeaderOverrides()) this.savePersistentState();
			this.ensurePersistentStateMatchesCurrentIdentity();
			this.purgeServerSideOauthResidue();
			this.writeConnectorsMcpConfig();
			this.startUpdateTimer();
			this.ensureSettingsFile();
			this.watchMcpConfig();
			await this.ensureBuiltinArdotMcpProcessIfNeeded();
			let enterpriseConnectorsToDisableAfterRestore = [];
			try {
				await this.syncEnterpriseConnectorUnbind();
				enterpriseConnectorsToDisableAfterRestore = await this.scheduleEnterpriseConnectorRefreshes({ skipRefreshAndSync: true });
			} catch (err) {
				this.logger.warn("[ConnectorService] enterprise connector sync on init failed:", err);
			}
			this.startServerSideOauthRefreshForEnabled();
			this.refreshAndSync().then(() => this.disableEnterpriseConnectorsAfterRestore(enterpriseConnectorsToDisableAfterRestore)).catch((error) => {
				this.logger.warn("[ConnectorService] Initial refreshAndSync failed:", error);
			});
			this.restoreSkillOnlyConnectedState();
			for (const configId of this.persistentState.enabled) {
				if ((this.getMarketplaceEntryById(configId)?.type || "mcp") !== "mcp") continue;
				try {
					this.installSkills(configId);
				} catch (error) {
					this.logger.warn(`[ConnectorService] Startup installSkills failed for ${configId}:`, error);
				}
			}
			this.autoConnectCliConnectors().catch((error) => {
				this.logger.warn("[ConnectorService] CLI auto-connect failed:", error);
			});
			this.bindAccountChangeListener();
			this.bindProductFeatureChangeListener();
			this.logger.info("[ConnectorService] Initialized");
			if (process.platform === "win32") {
				const s = require_workbuddy_auth_product_coordinator.getAclStats();
				this.logger.info(`[ConnectorService] ACL stats: verify ${s.verifyTotal} total / ${s.verifyCacheHit} cache-hit / ${s.verifyIcaclsMs}ms icacls | enforce ${s.enforceTotal} total / ${s.enforceCacheHit} cache-hit / ${s.enforceIcaclsMs}ms icacls`);
			}
		} catch (error) {
			this.logger.error("[ConnectorService] Init failed:", error);
			this.startUpdateTimer();
		}
	}
	async ensureInitialized() {
		if (!this.initPromise) await this.init();
		return this.initPromise;
	}
	/**
	* 注册 authService.onStateChanged 监听，把账号 / 企业变更转化为「内存状态重置 + 新账号目录加载」。
	*
	* 触发条件：仅当 uid + enterpriseId 组合真的发生变化才走重置；token 续签等不影响身份的
	* next() 会被 noop 跳过，避免无意义重连。
	*/
	bindAccountChangeListener() {
		this.lastBoundIdentityKey = this.getCurrentAccountIdentityKey();
		if (this.accountChangeUnsubscribe) {
			try {
				this.accountChangeUnsubscribe();
			} catch {}
			this.accountChangeUnsubscribe = null;
		}
		this.accountChangeUnsubscribe = this.authService.onStateChanged(() => {
			const nextIdentityKey = this.getCurrentAccountIdentityKey();
			if (nextIdentityKey === this.lastBoundIdentityKey) return;
			const prevIdentityKey = this.lastBoundIdentityKey;
			this.lastBoundIdentityKey = nextIdentityKey;
			this.userChangeChain = this.userChangeChain.then(async () => {
				try {
					await this.handleUserChanged(prevIdentityKey, nextIdentityKey);
				} catch (err) {
					this.logger.warn(`[ConnectorService] handleUserChanged(${prevIdentityKey} -> ${nextIdentityKey}) failed:`, err);
				}
			});
		});
	}
	/**
	* 注册 productManager.onDidChange 监听，当 productFeatures 中影响 desiredConfigs 的字段
	* （当前：AgentMail）发生翻转时，串行化触发一次 refreshAndSync。
	*
	* 设计与 bindAccountChangeListener 同构：信号源变化 → 字段指纹去重 → 串行链调度。
	*/
	bindProductFeatureChangeListener() {
		this.lastObservedFeatureKey = this.computeProductFeatureKey();
		if (this.productFeatureChangeUnsubscribe) {
			try {
				this.productFeatureChangeUnsubscribe();
			} catch {}
			this.productFeatureChangeUnsubscribe = null;
		}
		const disposable = this.productManager.onDidChange(() => {
			const nextKey = this.computeProductFeatureKey();
			if (nextKey === this.lastObservedFeatureKey) return;
			const prevKey = this.lastObservedFeatureKey;
			this.lastObservedFeatureKey = nextKey;
			this.logger.info(`[ConnectorService] productFeatures changed: ${prevKey} → ${nextKey}, scheduling refreshAndSync`);
			this.featureChangeChain = this.featureChangeChain.then(async () => {
				try {
					await this.refreshAndSync();
				} catch (err) {
					this.logger.warn("[ConnectorService] refreshAndSync after productFeatures change failed:", err);
				}
			});
		});
		this.productFeatureChangeUnsubscribe = () => disposable.dispose();
	}
	/**
	* 计算当前 productFeatures 中"会改变 desiredConfigs 的字段"的指纹。
	* 后续如有新门控（如 Netdrive 远端开关），在此追加即可，
	* 避免无关字段（models / agents 等）抖动触发 refreshAndSync。
	*
	* 同时把企业身份维度并入指纹：账号变更主要由 bindAccountChangeListener
	* 触发 refreshAndSync，但在极端乱序时序里（productFeatures push 与账号 push 相邻）
	* 双指纹（productFeatures 维度 + enterprise 维度）可以保证任意一条路径都能识别需要重算。
	* 仅区分有 / 无企业身份，**不**把 enterpriseId 值拼进指纹（避免落日志泄漏企业 ID）。
	*/
	computeProductFeatureKey() {
		return `am:${(this.productManager.getCurrentConfiguration()?.productFeatures ?? {}).AgentMail === true ? "1" : "0"}|ent:${this.authService.getAccount()?.enterpriseId ? "1" : "0"}`;
	}
	/**
	* 账号变更时重置 connector 状态，重新从新账号目录加载持久化数据并重连。
	*
	* 重置范围（**仅清进程内内存，不动任何账号磁盘文件**）：
	*   - mcpProxy.sync({})：断开所有 connector client、清 toolRoutes / activeConfigs；
	*   - mcpProxy.clearOAuthProviderCache()：清 oauthProviders 闭包缓存的 memoryTokens / memoryClientInfo；
	*   - this.states：运行时连接状态（来自上一账号）；
	*   - this.persistentState：内存中的 enabled/headerOverrides/everConnected 列表；
	*   - tokenRefresher / serverSideOauthRefresher：旧账号绑定的刷新器。
	*
	* 之后用新账号 uid 重新执行 loadPersistentState / writeConnectorsMcpConfig / refreshAndSync
	* 等价于「在新账号身份下重启了 doInit 的对应步骤」。
	*
	* 不动的：
	*   - mcpProxy.onStatusChanged / onUnauthorized / onTokensSaved 注册（只在 doInit 注册一次）；
	*   - mcpProxy.builtinTools / mcpProxy 的 OAuth callback 端口配置；
	*   - approvalsLoaded / userServerApprovals（MCP Security 信任表，跨账号语义共享）；
	*   - proxyServer（端口/secret 全局共享）；
	*   - mcpConfigWatcher（监听的是文件路径含 uid，可能监听了旧账号目录 — 见后文风险说明）。
	*/
	async handleUserChanged(prevIdentityKey, nextIdentityKey) {
		this.logger.info(`[ConnectorService] User changed: ${prevIdentityKey ?? "<initial>"} -> ${nextIdentityKey}, resetting connector state`);
		const isLogoutTransient = nextIdentityKey === "default|";
		this.clearExternallyManagedTokenRetryState();
		this.clearExternallyManagedStaleTokenGuard();
		this.unauthorizedNotifyThrottle.clear();
		try {
			this.tokenRefresher?.dispose();
		} catch (err) {
			this.logger.warn("[ConnectorService] tokenRefresher.dispose failed:", err);
		}
		this.tokenRefresher = null;
		try {
			this.serverSideOauthRefresher?.stopAll();
		} catch (err) {
			this.logger.warn("[ConnectorService] serverSideOauthRefresher.stopAll failed:", err);
		}
		try {
			await this.mcpProxy.sync({});
		} catch (err) {
			this.logger.warn("[ConnectorService] mcpProxy.sync({}) during user change failed:", err);
		}
		try {
			this.mcpProxy.clearOAuthProviderCache();
		} catch (err) {
			this.logger.warn("[ConnectorService] mcpProxy.clearOAuthProviderCache failed:", err);
		}
		this.states.clear();
		this.persistentState = {
			enabled: [],
			headerOverrides: {},
			envOverrides: {},
			userDisabled: {}
		};
		this.loadPersistentState();
		this.ensurePersistentStateMatchesCurrentIdentity();
		if (isLogoutTransient) {
			if (this.mcpConfigWatcher) {
				try {
					this.mcpConfigWatcher.close();
				} catch (err) {
					this.logger.warn("[ConnectorService] close old mcpConfigWatcher failed:", err);
				}
				this.mcpConfigWatcher = null;
			}
			this.logger.info(`[ConnectorService] User change complete (fast path): ${prevIdentityKey ?? "<initial>"} -> ${nextIdentityKey}`);
			return;
		}
		this.startTokenRefresher();
		this.writeConnectorsMcpConfig();
		try {
			await this.tryUpdate();
			if (this.stripBearerPrefixFromExternallyManagedHeaderOverrides()) this.savePersistentState();
		} catch (err) {
			this.logger.warn("[ConnectorService] tryUpdate after user change failed:", err);
		}
		this.purgeServerSideOauthResidue();
		let enterpriseConnectorsToDisableAfterRestore = [];
		try {
			await this.syncEnterpriseConnectorUnbind();
			enterpriseConnectorsToDisableAfterRestore = await this.scheduleEnterpriseConnectorRefreshes({ skipRefreshAndSync: true });
		} catch (err) {
			this.logger.warn("[ConnectorService] enterprise connector sync after user change failed:", err);
		}
		this.startServerSideOauthRefreshForEnabled();
		this.restoreSkillOnlyConnectedState();
		await this.autoConnectCliConnectors().catch((err) => {
			this.logger.warn("[ConnectorService] CLI auto-connect after user change failed:", err);
		});
		try {
			await this.refreshAndSync();
			await this.disableEnterpriseConnectorsAfterRestore(enterpriseConnectorsToDisableAfterRestore);
		} catch (err) {
			this.logger.warn("[ConnectorService] refreshAndSync after user change failed:", err);
		}
		if (this.mcpConfigWatcher) {
			try {
				this.mcpConfigWatcher.close();
			} catch (err) {
				this.logger.warn("[ConnectorService] close old mcpConfigWatcher failed:", err);
			}
			this.mcpConfigWatcher = null;
		}
		try {
			this.ensureSettingsFile();
			this.watchMcpConfig();
		} catch (err) {
			this.logger.warn("[ConnectorService] re-watchMcpConfig after user change failed:", err);
		}
		this.logger.info(`[ConnectorService] User change complete: ${prevIdentityKey ?? "<initial>"} -> ${nextIdentityKey}`);
	}
	/**
	* 写入 .mcp.json — 只一条 connector-proxy 配置
	*
	* CLI 从 .mcp.json 读到这条配置后，连接 Proxy Server，
	* 即可获取所有已连接 connector 的工具。
	*/
	writeProxyMcpConfig(port) {
		const mcpFilePath = (0, path.join)(this.configDir, ".mcp.json");
		let existingConfig = {};
		if ((0, fs.existsSync)(mcpFilePath)) try {
			existingConfig = JSON.parse((0, fs.readFileSync)(mcpFilePath, "utf-8"));
		} catch {
			existingConfig = {};
		}
		if (!existingConfig.mcpServers) existingConfig.mcpServers = {};
		for (const key of Object.keys(existingConfig.mcpServers)) if (key.startsWith("connector:")) delete existingConfig.mcpServers[key];
		const connectorNames = this.persistentState.enabled;
		const customMcpConfig = this.readCustomMcpConfig();
		const customServerNames = Object.keys(customMcpConfig.mcpServers || {});
		const builtinServerNames = [];
		if (this.buildAgentMailMcpConfig()) builtinServerNames.push("agent-mail");
		const allServerNames = [...new Set([
			...connectorNames,
			...customServerNames,
			...builtinServerNames
		])].sort();
		let description = "Aggregated proxy containing MCP servers: ";
		if (allServerNames.length > 0) description += allServerNames.join(", ");
		else description += "none";
		existingConfig.mcpServers[require_workbuddy_auth_product_coordinator.CONNECTOR_PROXY_MCP_NAME] = {
			type: "http",
			url: `http://127.0.0.1:${port}/mcp`,
			description
		};
		(0, fs.writeFileSync)(mcpFilePath, JSON.stringify(existingConfig, null, 2), "utf-8");
		this.logger.info(`[ConnectorService] Written proxy MCP config to ${mcpFilePath} (port ${port})`);
	}
	/**
	* 获取 Proxy 认证 secret（供 CLIManager 注入环境变量）
	*/
	getProxySecret() {
		return this.proxyServer.getProxySecret();
	}
	/**
	* 注入"未授权"事件推送器（由 daemon 启动时提供）。
	*
	* 一旦 pusher 就位，会立刻把底层 mcpProxy 的 unauthorized 事件订阅接上
	* （若还未订阅），后续业务侧即可从 renderer 的 `$on('connector:unauthorized')`
	* 接收到推送。
	*/
	setUnauthorizedEventPusher(push) {
		this.unauthorizedEventPusher = push;
		this.ensureUnauthorizedListenerRegistered();
	}
	/**
	* 注入"解绑事件"推送器（由 daemon 启动时提供）。
	*
	* `unbind(configId)` 成功后会通过该 pusher 广播到 renderer，
	* channel 固定为 'connector:unbound'。
	*/
	setUnboundEventPusher(push) {
		this.unboundEventPusher = push;
	}
	setAuthQrUrlPusher(push) {
		this.authQrUrlPusher = push;
	}
	/**
	* 注入 Device Flow 授权信息推送器（由 daemon-bootstrap 启动时调用）。
	*
	* 详见 `deviceCodePusher` 字段注释。channel 固定为 'connector:device-code'。
	*/
	setDeviceCodePusher(push) {
		this.deviceCodePusher = push;
	}
	/**
	* 订阅 mcpProxy 的 unauthorized 事件并转发给外部 pusher。
	* 幂等：多次调用只注册一次。
	*/
	ensureUnauthorizedListenerRegistered() {
		if (this.unauthorizedListenerRegistered) return;
		this.unauthorizedListenerRegistered = true;
		this.mcpProxy.onUnauthorized((rawConfigId, reason) => {
			const configId = this.normalizeProxyConfigId(rawConfigId);
			this.logger.info(`[ConnectorService] onUnauthorized: raw=${rawConfigId}, normalized=${configId}, reason=${reason?.substring(0, 100)}`);
			if (this.isExternallyManagedConnector(configId) && this.isInvalidExternallyManagedTokenReason(reason)) this.markExternallyManagedStaleToken(configId, this.getAuthorizationFingerprint(configId));
			if (this.unauthorizedEventPusher) {
				const now = Date.now();
				if (now - (this.unauthorizedNotifyThrottle.get(configId) ?? 0) < UNAUTHORIZED_NOTIFY_THROTTLE_MS) {
					this.logger.info(`[ConnectorService] onUnauthorized: ${configId} notification throttled`);
					return;
				}
				this.unauthorizedNotifyThrottle.set(configId, now);
				try {
					this.unauthorizedEventPusher({
						configId,
						reason
					});
				} catch (err) {
					this.logger.warn(`[ConnectorService] unauthorized pusher(${configId}) threw:`, err);
				}
			}
		});
	}
	/**
	* 刷新 token 并对账式同步连接（对齐 Craft refreshOAuthTokensIfNeeded）
	*
	* 触发时机：
	* 1. 初始化完成后
	* 2. connector 连接/断开后
	* 3. 定时检查
	*
	* Issue #49159 follow-up：refreshAndSync 是状态变更后的"对账"路径，
	* 调用方（plugin 启用回调 / connector connect 后 / watcher 防抖触发等）
	* 已经知道配置可能刚变。入口主动 invalidate 缓存避免读到 60 秒 TTL 内
	* 的旧空字典——典型场景：用户首次启用插件时 settings.json 刚创建，
	* `computePluginMcpConfigs` 之前的 ENOENT 分支结果还挂在缓存里。
	*/
	async refreshAndSync() {
		this.pluginMcpConfigsCache.invalidate();
		this.mcpJsonCache.invalidate();
		await this.refreshExpiredTokens();
		await this.probeAndRecoverExternallyManagedConnectors();
		const { disconnectIds } = await this.syncExternallyManagedConnectorTokensBeforeSync();
		const desiredConfigs = this.buildDesiredConfigs();
		const pluginMcpKeys = Object.keys(desiredConfigs).filter((k) => k.startsWith("custom-mcp:"));
		this.logger.info(`[ConnectorService] refreshAndSync: desiredConfigs has ${Object.keys(desiredConfigs).length} entries, plugin/custom MCP: [${pluginMcpKeys.join(", ")}]`);
		const result = await this.mcpProxy.sync(desiredConfigs);
		for (const id of disconnectIds) {
			const disconnectResult = await this.disconnect(id, { userInitiated: false });
			if (!disconnectResult.success) this.logger.warn(`[ConnectorService] c-side migration disconnect ${id} failed: ${disconnectResult.error}`);
		}
		if (result.failed.length > 0) this.logger.warn(`[ConnectorService] sync failures: ${result.failed.join(", ")}`);
		const clientEntries = this.mcpProxy.getAllClientEntries();
		for (const id of this.persistentState.enabled) {
			const proxyId = require_workbuddy_auth_product_coordinator.toProxyConfigId(id);
			const clientEntry = clientEntries.get(proxyId);
			const stateEntry = this.states.get(id);
			if (clientEntry?.status === "connected" && stateEntry && stateEntry.status !== "connected") {
				this.logger.info(`[ConnectorService] refreshAndSync state reconcile: ${id} proxy=connected but states=${stateEntry.status}, fixing`);
				this.updateState(id, "connected");
				this.installSkills(id);
			}
		}
		if (result.removed.length > 0) {
			const oauthStore = this.createOAuthStore();
			for (const configId of result.removed) {
				const prefix = this.CUSTOM_MCP_PREFIX;
				if (configId.startsWith(prefix)) {
					const serverName = configId.slice(prefix.length);
					oauthStore.deleteByServerName(serverName);
					this.logger.info(`[ConnectorService] Cleaned OAuth credentials for removed MCP server: ${serverName}`);
				}
			}
		}
		const port = this.proxyServer.getPort();
		if (port > 0) this.writeProxyMcpConfig(port);
	}
	async refreshEnterpriseConnectorTokens(applications) {
		if (applications && this.getCurrentEnterpriseId()) this.populateOneidApplicationsCache(this.getCurrentEnterpriseId(), applications);
		await this.syncEnterpriseConnectorUnbind();
		await this.scheduleEnterpriseConnectorRefreshes();
	}
	/**
	* 根据 configId 查找对应 server URL，如果匹配 IOA 服务端 MCP 域名则返回 oauthName。
	* 同时查 plugin MCP 和用户自定义 MCP。
	*/
	resolveIoaOauthNameByConfigId(rawConfigId) {
		const serverName = rawConfigId.startsWith(this.CUSTOM_MCP_PREFIX) ? rawConfigId.slice(this.CUSTOM_MCP_PREFIX.length) : rawConfigId;
		const pluginUrl = (this.readPluginMcpConfigs()[serverName]?.config)?.url;
		if (pluginUrl) return this.ioaAuth?.resolveOauthNameByUrl(pluginUrl);
		const customUrl = (this.readCustomMcpConfig().mcpServers?.[serverName])?.url;
		return this.ioaAuth?.resolveOauthNameByUrl(customUrl);
	}
	/**
	* 构建期望的连接配置（所有已启用的 connector + 自定义 MCP）
	*
	* Connector 配置统一从 connectors/mcp.json 读取（由 writeConnectorsMcpConfig 维护），
	* 自定义 MCP 配置从 mcp.json 读取，两者 configId 前缀不同，不会冲突。
	*/
	buildDesiredConfigs() {
		const configs = {};
		const manifest = this.readLocalManifest();
		if (manifest?.connectors) for (const entry of manifest.connectors) {
			const source = entry.source || entry.name;
			if (entry.type === "cli" || entry.type === "skill-only") continue;
			const mcpConfig = this.readConnectorMcpConfig(source);
			if (!mcpConfig) continue;
			const merged = this.buildRuntimeMcpConfig(source, mcpConfig);
			if (!this.persistentState.enabled.includes(source)) continue;
			for (const [serverName, serverEntry] of Object.entries(merged.mcpServers)) {
				const e = serverEntry;
				if (!e.url && !e.command) continue;
				if (serverName.startsWith("connector-proxy")) continue;
				const proxyConfigId = require_workbuddy_auth_product_coordinator.toProxyConfigId(source);
				if (this.isExternallyManagedConnector(source)) {
					const authorization = e.headers?.Authorization ?? e.headers?.authorization;
					if (typeof authorization !== "string" || authorization.length === 0) {
						this.logger.info(`[ConnectorService] buildDesiredConfigs: skipping externally-managed connector ${source} until token is ready`);
						continue;
					}
					const tokenFingerprint = this.hashTokenFingerprint(authorization);
					if (this.isExternallyManagedStaleTokenGuardActive(source, tokenFingerprint)) {
						const error = this.getExternallyManagedStaleTokenError(source);
						this.updateState(source, "unauthorized", error);
						this.logger.info(`[ConnectorService] buildDesiredConfigs: skipping externally-managed connector ${source} because token is stale`);
						continue;
					}
				}
				const rawTimeout = e.timeout;
				const timeoutMs = rawTimeout ? rawTimeout < 1e3 ? rawTimeout * 1e3 : rawTimeout : void 0;
				configs[proxyConfigId] = {
					...e,
					...timeoutMs !== void 0 ? { timeout: timeoutMs } : {}
				};
			}
		}
		const customConfig = this.readCustomMcpConfig();
		const effectiveArdotConfig = this.resolveEffectiveArdotMcpServer(customConfig.mcpServers?.[require_workbuddy_auth_product_coordinator.BUILTIN_ARDOT_MCP_SERVER_NAME]);
		const effectiveNetdriveConfig = this.resolveEffectiveNetdriveMcpServer(customConfig.mcpServers?.[BUILTIN_NETDRIVE_MCP_SERVER_NAME]);
		for (const [name, entry] of Object.entries(customConfig.mcpServers || {})) {
			if (name === "ardot") continue;
			if (name === "netdrive") continue;
			const e = entry;
			if (e.disabled || !e.url && !e.command) continue;
			if (name.startsWith("connector-proxy")) continue;
			if (e.managedBy === "connector") continue;
			const configId = `${this.CUSTOM_MCP_PREFIX}${name}`;
			const configHash = this.calculateConfigHash(e);
			const { BLACKLIST_HASHES: buildBlacklist } = this.getTrustLists();
			if (buildBlacklist.includes(configHash)) {
				this.logger.info(`[MCP Security] buildDesiredConfigs: blocking blacklisted server "${name}"`);
				continue;
			}
			if (!this.isUserServerApproved(name, configHash)) {
				this.logger.info(`[MCP Security] buildDesiredConfigs: skipping untrusted server "${name}" (hash: ${configHash})`);
				continue;
			}
			configs[configId] = {
				...e,
				defer_loading: true
			};
		}
		if (effectiveArdotConfig && !effectiveArdotConfig.disabled) configs[`${this.CUSTOM_MCP_PREFIX}${require_workbuddy_auth_product_coordinator.BUILTIN_ARDOT_MCP_SERVER_NAME}`] = {
			...effectiveArdotConfig,
			defer_loading: true
		};
		if (effectiveNetdriveConfig && !effectiveNetdriveConfig.disabled) configs[`${this.CUSTOM_MCP_PREFIX}${BUILTIN_NETDRIVE_MCP_SERVER_NAME}`] = {
			...effectiveNetdriveConfig,
			defer_loading: true
		};
		const agentMailMcpConfig = this.buildAgentMailMcpConfig();
		if (agentMailMcpConfig) {
			configs[`${this.CUSTOM_MCP_PREFIX}agent-mail`] = agentMailMcpConfig;
			this.logger.info(`[ConnectorService] agent-mail MCP: injected into desiredConfigs (url=${agentMailMcpConfig.url})`);
		}
		try {
			const pluginMcpConfigs = this.readPluginMcpConfigs();
			for (const [name, { config }] of Object.entries(pluginMcpConfigs)) {
				const configId = `${this.CUSTOM_MCP_PREFIX}${name}`;
				if (configs[configId]) continue;
				const e = config;
				if (e.disabled || !e.url && !e.command) continue;
				configs[configId] = {
					...e,
					defer_loading: true
				};
			}
		} catch (error) {
			this.logger.warn("[ConnectorService] buildDesiredConfigs: failed to read plugin MCP configs:", error);
		}
		const overrides = this.persistentState.disabledToolsOverrides ?? {};
		for (const [configId, config] of Object.entries(configs)) {
			const overrideList = overrides[configId.startsWith(this.CUSTOM_MCP_PREFIX) ? configId.slice(this.CUSTOM_MCP_PREFIX.length) : configId];
			if (!overrideList || overrideList.length === 0) continue;
			const merged = new Set([...Array.isArray(config.disabledTools) ? config.disabledTools : [], ...overrideList]);
			configs[configId] = {
				...config,
				disabledTools: Array.from(merged)
			};
		}
		return configs;
	}
	/**
	* 刷新过期的 OAuth token
	*/
	async refreshExpiredTokens() {
		if (!this.tokenRefresher) return [];
		const refreshed = [];
		const oauthStore = this.createOAuthStore();
		for (const id of this.persistentState.enabled) {
			if (this.isServerSideConnector(id)) continue;
			const mcpConfig = this.readConnectorMcpConfig(id);
			if (!mcpConfig) continue;
			const mergedConfig = this.buildRuntimeMcpConfig(id, mcpConfig);
			const firstServer = Object.values(mergedConfig.mcpServers)[0];
			if (!firstServer?.url) continue;
			const tokens = oauthStore.loadTokens(id, firstServer.url, firstServer.headers);
			if (!tokens?.refresh_token || tokens.expires_in !== 0) continue;
			try {
				await this.tokenRefresher.refreshNow(id, firstServer.url, firstServer.headers);
				refreshed.push(id);
			} catch (err) {
				this.logger.warn(`[ConnectorService] Token refresh failed for ${id}: ${err}`);
				this.updateState(id, "unauthorized", "Token refresh failed");
			}
		}
		return refreshed;
	}
	/**
	* 启动 TokenRefresher — 提前刷新 token 保证 CLI 读到有效 token
	*/
	startTokenRefresher() {
		this.tokenRefresher = new ConnectorTokenRefresher(this.createOAuthStore(), {
			onRefreshFailed: (configId, error) => {
				const normalizedId = this.normalizeProxyConfigId(configId);
				this.logger.warn(`[ConnectorService] onRefreshFailed: raw=${configId}, normalized=${normalizedId}, error=${error}`);
				this.updateState(normalizedId, "unauthorized", "Token refresh failed");
			},
			onRefreshSuccess: (configId, tokens) => {
				const normalizedId = this.normalizeProxyConfigId(configId);
				this.mcpProxy.syncProviderMemoryTokens(configId, tokens);
				const currentState = this.states.get(normalizedId);
				if (currentState?.status === "unauthorized" || currentState?.status === "error") {
					this.logger.info(`[ConnectorService] onRefreshSuccess: ${normalizedId} was ${currentState.status}, triggering reconnect`);
					this.refreshAndSync().catch((err) => {
						this.logger.warn(`[ConnectorService] onRefreshSuccess refreshAndSync failed for ${normalizedId}:`, err);
					});
				}
			},
			log: (msg) => this.logger.info(msg),
			getMemoryClientInfo: (configId) => this.mcpProxy.getProviderMemoryClientInfo(configId)
		});
		this.mcpProxy.onTokensSaved((configId, serverUrl, tokens, headers) => {
			if (this.isServerSideConnector(configId)) return;
			const t = tokens;
			if (t.refresh_token && t.expires_in) this.tokenRefresher?.scheduleRefresh(configId, serverUrl, t, headers);
		});
	}
	/**
	* 为指定 connector 设置 token 提前刷新（连接成功后调用）
	*/
	scheduleTokenRefresh(configId, serverUrl, headers) {
		if (!this.tokenRefresher || this.isServerSideConnector(configId)) return;
		const tokens = this.createOAuthStore().loadTokens(configId, serverUrl, headers);
		if (tokens) this.tokenRefresher.scheduleRefresh(configId, serverUrl, tokens, headers);
	}
	/** 启动 server-side OAuth refresher 单例 */
	startServerSideOauthRefresher() {
		this.serverSideOauthRefresher = new ConnectorServerSideOauthRefresher(async () => ({
			productManager: this.productManager,
			authenticationManager: this.authenticationManager,
			fetch: this.hostCapabilities.fetch
		}), {
			updateHeaders: async (configId, headers, skipReconnect) => {
				const result = await this.updateHeaders(configId, headers, skipReconnect);
				if (result.success) {
					const normalizedId = this.normalizeProxyConfigId(configId);
					const currentState = this.states.get(normalizedId);
					if (currentState?.status === "unauthorized" || currentState?.status === "error") {
						this.logger.info(`[ConnectorService] ServerSideOauth refresh success: ${normalizedId} was ${currentState.status}, triggering reconnect`);
						this.refreshAndSync().catch((err) => {
							this.logger.warn(`[ConnectorService] ServerSideOauth refreshAndSync failed for ${normalizedId}:`, err);
						});
					}
				}
				return result;
			},
			buildTokenHeaders: (configId, connectorName, accessToken) => this.resolveTokenHeaders(configId, connectorName, accessToken),
			onTokenApplied: (configId) => this.applyEnterpriseTokenToActiveConnection(configId),
			disconnect: (configId) => this.disconnect(configId, { userInitiated: false }),
			markUnauthorized: (configId, error) => {
				const normalizedId = this.normalizeProxyConfigId(configId);
				this.logger.warn(`[ConnectorService] ServerSideOauth markUnauthorized: ${normalizedId}, error=${error}`);
				this.updateState(normalizedId, "unauthorized", error);
			}
		}, this.logger);
	}
	setServerSideOauthFetch(fetchFn) {
		this.setHostCapabilities({ fetch: fetchFn });
	}
	setHostCapabilities(capabilities) {
		this.hostCapabilities = {
			...this.hostCapabilities,
			...capabilities
		};
		this.cliExecutor?.setHostCapabilities({
			openExternal: this.hostCapabilities.openExternal,
			sendRuntimeProgress: this.hostCapabilities.sendRuntimeProgress
		});
		this.mcpProxy.setHostCapabilities?.({
			openExternal: this.hostCapabilities.openExternal,
			getAppVersion: this.hostCapabilities.getAppVersion,
			sendRuntimeProgress: this.hostCapabilities.sendRuntimeProgress
		});
	}
	isEnterpriseManagedOneidConnector(entry) {
		return require_workbuddy_auth_product_coordinator.isEnterpriseManagedOneidConnector(entry, this.getConnectorAccountContext());
	}
	purgeServerSideOauthResidue() {
		let oauthStore;
		for (const configId of this.persistentState.enabled) {
			const rawConfigId = this.normalizeProxyConfigId(configId);
			const entry = this.getMarketplaceEntryById(rawConfigId);
			if (!entry || this.resolveActiveAuthMode(entry) !== "server-side") continue;
			const names = /* @__PURE__ */ new Set();
			for (const name of [
				rawConfigId,
				entry.source,
				entry.provider_id,
				entry.name
			]) if (typeof name === "string" && name.length > 0) names.add(name);
			if (names.size === 0) continue;
			oauthStore ??= this.createOAuthStore();
			let purgedCount = 0;
			for (const name of names) purgedCount += oauthStore.purgeByServerName(name);
			if (purgedCount > 0) this.logger.info(`[ConnectorService] purged ${purgedCount} OAuth credential slot(s) for server-side connector ${rawConfigId}`);
		}
	}
	/**
	* 如果 connector 声明了 auth_mode === 'server-side'，为其启动 token 刷新任务。
	* 在 connect() 成功后、以及 init() 对已启用 connector 恢复时调用。
	*/
	maybeScheduleServerSideOauth(configId) {
		if (!this.serverSideOauthRefresher) return;
		const entry = this.getMarketplaceEntryById(configId);
		if (!entry || this.resolveActiveAuthMode(entry) !== "server-side") return;
		if (this.resolveActiveEnterpriseVariant(entry) || this.isEnterpriseManagedOneidConnector(entry)) return;
		const connectorName = this.resolveOauthName(configId);
		this.serverSideOauthRefresher.schedule(configId, connectorName);
	}
	isEnterpriseServerSideConnector(configId) {
		const entry = this.getMarketplaceEntryById(configId);
		if (!entry || this.resolveActiveAuthMode(entry) !== "server-side") return false;
		return Boolean(this.resolveActiveEnterpriseVariant(entry) || this.isEnterpriseManagedOneidConnector(entry));
	}
	isExternallyManagedConnector(configId) {
		if (this.isEnterpriseServerSideConnector(configId)) return false;
		if (configId === "tencent-docs" && this.getCurrentEnterpriseId()) return false;
		const entry = this.getMarketplaceEntryById(configId);
		if (!entry || this.resolveActiveAuthMode(entry) === "gateway") return false;
		const headers = this.persistentState.headerOverrides[configId];
		if (headers) {
			const oneidToken = headers["X-Oneid-Access-Token"] ?? headers["x-oneid-access-token"];
			if (typeof oneidToken === "string" && oneidToken.length > 0 && !!this.getCurrentEnterpriseId()) return false;
		}
		const serverConfig = this.getLatestServerConfigForConnector(configId);
		if (!serverConfig?.url) return false;
		try {
			const host = new URL(serverConfig.url).host;
			return require_workbuddy_auth_product_coordinator.EXTERNALLY_MANAGED_HOSTS.has(host) && EXTERNALLY_MANAGED_TOKEN_REFRESH_HOSTS.has(host);
		} catch {
			return false;
		}
	}
	getLatestServerConfigForConnector(configId) {
		const mcpConfig = this.readConnectorMcpConfig(configId);
		if (!mcpConfig) return;
		const mergedConfig = this.buildRuntimeMcpConfig(configId, mcpConfig);
		const firstServerName = Object.keys(mergedConfig.mcpServers)[0];
		return firstServerName ? mergedConfig.mcpServers[firstServerName] : void 0;
	}
	rebuildAuthInjectionRuleCache() {
		const rules = (this.readLocalManifest()?.auth_injection_rules ?? []).map((rule) => this.normalizeAuthInjectionRule(rule)).filter((rule) => Boolean(rule));
		const byConnector = /* @__PURE__ */ new Map();
		for (const rule of rules) for (const connectorId of rule.appliesToConnectors) {
			const list = byConnector.get(connectorId) ?? [];
			list.push(rule);
			byConnector.set(connectorId, list);
		}
		this.authInjectionRuleCache = {
			rules,
			byConnector
		};
		this.logger.info(`${AUTH_INJECTION_LOG_PREFIX$1} cache rebuilt rules=${rules.length} connectors=[${[...byConnector.keys()].join(",")}] ruleIds=[${rules.map((rule) => rule.id).join(",")}]`);
	}
	normalizeAuthInjectionRule(rule) {
		if (!rule || typeof rule.id !== "string" || rule.id.trim().length === 0) return;
		if (rule.timing && rule.timing !== "request") return;
		const appliesToConnectors = this.normalizeStringList(rule.applies_to_connectors);
		const inject = (Array.isArray(rule.inject) ? rule.inject : []).map((item) => this.normalizeAuthInjectionItem(item)).filter((item) => Boolean(item));
		if (appliesToConnectors.length === 0 || inject.length === 0) return;
		return {
			id: rule.id.trim(),
			activeIn: this.normalizeStringList(rule.when?.active_in),
			appliesToConnectors,
			requiresConnectedConnectors: this.normalizeStringList(rule.requires_connected_connectors),
			inject
		};
	}
	normalizeAuthInjectionItem(item) {
		if (!item || typeof item.from_connector !== "string" || item.from_connector.trim().length === 0) return;
		if (item.token_type !== "mcp-oauth" && item.token_type !== "oneid-token") return;
		if (typeof item.header !== "string" || item.header.trim().length === 0) return;
		const fromConnector = item.from_connector.trim();
		const entry = this.getMarketplaceEntryById(fromConnector);
		return {
			...item,
			from_connector: fromConnector,
			header: item.header.trim(),
			value_template: item.value_template || "${access_token}",
			serverConfig: item.token_type === "mcp-oauth" ? this.getLatestServerConfigForConnector(fromConnector) : void 0,
			oauthName: item.token_type === "oneid-token" ? this.resolveOauthName(fromConnector) : void 0,
			oneidAppType: entry ? this.resolveOneidAppType(entry) : void 0
		};
	}
	normalizeStringList(value) {
		return Array.isArray(value) ? value.map((item) => typeof item === "string" ? item.trim() : "").filter(Boolean) : [];
	}
	async resolveRequestAuthInjectionHeaders(configId, sessionId, projectId) {
		const rawConfigId = this.normalizeProxyConfigId(configId);
		const headers = {};
		const serverShortName = rawConfigId.startsWith(this.CUSTOM_MCP_PREFIX) ? rawConfigId.slice(this.CUSTOM_MCP_PREFIX.length) : rawConfigId;
		const rules = this.authInjectionRuleCache.byConnector.get(rawConfigId) ?? [];
		if (rules.length > 0) {
			const conditionKeys = this.getCurrentAuthInjectionConditionKeys();
			for (const rule of rules) {
				const match = this.getAuthInjectionRuleMatchResult(rule, conditionKeys);
				if (!match.matched) {
					this.logAuthInjectionRuleSkipped(rawConfigId, rule, match.reason, conditionKeys);
					continue;
				}
				if (this.shouldLogAuthInjectionInfo(`${rawConfigId}|${rule.id}|matched`)) this.logger.info(`${AUTH_INJECTION_LOG_PREFIX$1} rule matched configId=${rawConfigId} rule=${rule.id} sources=[${rule.inject.map((item) => item.from_connector).join(",")}]`);
				for (const item of rule.inject) {
					const token = await this.resolveAuthInjectionAccessToken(item);
					if (!token) {
						this.logger.warn(`${AUTH_INJECTION_LOG_PREFIX$1} token missing configId=${rawConfigId} rule=${rule.id} from=${item.from_connector} type=${item.token_type} header=${item.header}`);
						continue;
					}
					headers[item.header] = item.value_template.replace(/\$\{access_token\}/g, token);
				}
			}
			if (Object.keys(headers).length > 0 && this.shouldLogAuthInjectionInfo(`${rawConfigId}|resolved`)) this.logger.info(`${AUTH_INJECTION_LOG_PREFIX$1} resolved configId=${rawConfigId} headers=[${Object.keys(headers).join(",")}]`);
		}
		const poiHeaders = await this.resolvePoiHeaderForServer(rawConfigId, sessionId, serverShortName);
		Object.assign(headers, poiHeaders);
		if (serverShortName === "netdrive" && projectId) headers[NETDRIVE_HEADER_PROJECT_ID] = projectId;
		return headers;
	}
	/**
	* 推送/清除 session POI 缓存（供 session RPC handler 调用）。
	* `poi = null` 时清除该 session 的缓存。
	*/
	setSessionPoi(sessionId, poi) {
		this.logger.info(`[POI] setSessionPoi sessionId=${sessionId} poi=${poi === null ? "null" : `lat=${poi.lat} lng=${poi.lng} source=${poi.source}`}`);
		if (poi === null) this.sessionPoiCache.delete(sessionId);
		else this.sessionPoiCache.set(sessionId, poi);
	}
	/** 清除 session POI 缓存（session 关闭时调用）。 */
	clearSessionPoi(sessionId) {
		this.sessionPoiCache.delete(sessionId);
	}
	/**
	* 回传用户 POI 授权决策（供 connector RPC handler 调用）。
	*/
	resolvePoiConsent(mcpServerName, result) {
		this.poiConsentStore.set(mcpServerName, result);
		return this.poiConsentRegistry.answer(mcpServerName, result);
	}
	/**
	* 注入 POI 授权事件推送回调（bootstrap 时调用）。
	*/
	setPoiConsentEventPusher(pusher) {
		this.poiConsentEventPusher = pusher;
	}
	/**
	* 为指定 MCP server 解析 POI header。
	*
	* fail-closed：任何异常路径返回 `{}`，不阻断工具调用。
	*/
	async resolvePoiHeaderForServer(configId, sessionId, serverShortName) {
		try {
			if (!sessionId) {
				this.logger.info(`[POI] skip configId=${configId}: no sessionId`);
				return {};
			}
			if (!((this.productManager?.getCurrentConfiguration?.()?.productFeatures)?.PoiMap === true)) {
				this.logger.info(`[POI] skip configId=${configId}: PoiMap disabled`);
				return {};
			}
			if (!this.isServerNeedsInjectPOI(configId, serverShortName)) {
				this.logger.info(`[POI] skip configId=${configId} serverShortName=${serverShortName ?? "(none)"}: needsInjectPOI=false`);
				return {};
			}
			const poi = this.sessionPoiCache.get(sessionId);
			if (!poi) {
				this.logger.info(`[POI] skip configId=${configId} sessionId=${sessionId}: sessionPoiCache miss`);
				return {};
			}
			const consent = this.poiConsentStore.get(configId);
			if (consent === "granted") {
				this.logger.info(`[POI] inject configId=${configId} sessionId=${sessionId}: consent=granted, injecting header`);
				return buildPoiHeader(poi);
			}
			this.logger.info(`[POI] await consent configId=${configId} sessionId=${sessionId}: consent=${consent ?? "none"}, pushing event`);
			const { promise: consentPromise, isFirst } = this.poiConsentRegistry.waitWithFirst(configId, POI_CONSENT_DEFAULT_TIMEOUT_MS);
			if (isFirst && this.poiConsentEventPusher) this.poiConsentEventPusher({
				mcpServerName: configId,
				sessionId
			});
			const decision = await consentPromise;
			this.logger.info(`[POI] consent result configId=${configId} sessionId=${sessionId}: decision=${decision}`);
			this.poiConsentStore.set(configId, decision);
			if (decision === "denied") return {};
			return buildPoiHeader(poi);
		} catch (err) {
			this.logger.warn(`[POI] resolvePoiHeaderForServer error configId=${configId} sessionId=${sessionId}:`, err);
			return {};
		}
	}
	/**
	* 检查 configId 对应的 MCP server 是否声明了 `needsInjectPOI: true`。
	* 提供 serverShortName 时仅检查指定条目；未提供时回退遍历该 connector 的全部 mcpServers。
	*
	* 对 custom-mcp: 前缀的 configId，从 readCustomMcpConfig() 读取用户 mcp.json；
	* 其余走 readConnectorMcpConfig（marketplace connector）。
	*/
	isServerNeedsInjectPOI(configId, serverShortName) {
		if (configId.startsWith(this.CUSTOM_MCP_PREFIX)) {
			const customConfig = this.readCustomMcpConfig();
			if (!customConfig?.mcpServers) {
				this.logger.info(`[POI] isServerNeedsInjectPOI configId=${configId} serverShortName=${serverShortName ?? "(none)"}: customMcp path, result=false (no mcpServers)`);
				return false;
			}
			if (serverShortName) {
				const entry = customConfig.mcpServers[serverShortName];
				const result = typeof entry === "object" && entry !== null && entry.needsInjectPOI === true;
				this.logger.info(`[POI] isServerNeedsInjectPOI configId=${configId} serverShortName=${serverShortName}: customMcp path, result=${result}`);
				return result;
			}
			for (const entry of Object.values(customConfig.mcpServers)) if (typeof entry === "object" && entry !== null && entry.needsInjectPOI === true) {
				this.logger.info(`[POI] isServerNeedsInjectPOI configId=${configId} serverShortName=(none): customMcp path, result=true`);
				return true;
			}
			this.logger.info(`[POI] isServerNeedsInjectPOI configId=${configId} serverShortName=(none): customMcp path, result=false (no entry with needsInjectPOI)`);
			return false;
		}
		const mcpConfig = this.readConnectorMcpConfig(configId);
		if (!mcpConfig) {
			this.logger.info(`[POI] isServerNeedsInjectPOI configId=${configId} serverShortName=${serverShortName ?? "(none)"}: connectorMcp path, result=false (no mcpConfig)`);
			return false;
		}
		if (serverShortName) {
			const result = mcpConfig.mcpServers[serverShortName]?.needsInjectPOI === true;
			this.logger.info(`[POI] isServerNeedsInjectPOI configId=${configId} serverShortName=${serverShortName}: connectorMcp path, result=${result}`);
			return result;
		}
		for (const serverConfig of Object.values(mcpConfig.mcpServers)) if (serverConfig.needsInjectPOI === true) {
			this.logger.info(`[POI] isServerNeedsInjectPOI configId=${configId} serverShortName=(none): connectorMcp path, result=true`);
			return true;
		}
		this.logger.info(`[POI] isServerNeedsInjectPOI configId=${configId} serverShortName=(none): connectorMcp path, result=false`);
		return false;
	}
	getAuthInjectionRuleMatchResult(rule, conditionKeys) {
		if (rule.activeIn.length > 0 && !rule.activeIn.some((key) => conditionKeys.has(key))) return {
			matched: false,
			reason: "active_in_miss"
		};
		const missing = rule.requiresConnectedConnectors.filter((connectorId) => !this.isConnectorConnected(connectorId));
		if (missing.length > 0) return {
			matched: false,
			reason: `missing_connected:${missing.join(",")}`
		};
		return {
			matched: true,
			reason: "matched"
		};
	}
	logAuthInjectionRuleSkipped(configId, rule, reason, conditionKeys) {
		const key = `${configId}|${rule.id}|${reason}`;
		const now = Date.now();
		if (now - (this.authInjectionSkipLogThrottle.get(key) ?? 0) < AUTH_INJECTION_SKIP_LOG_THROTTLE_MS) return;
		this.authInjectionSkipLogThrottle.set(key, now);
		this.logger.info(`${AUTH_INJECTION_LOG_PREFIX$1} rule skipped configId=${configId} rule=${rule.id} reason=${reason} conditionKeys=[${[...conditionKeys].join(",")}] requiresConnected=[${rule.requiresConnectedConnectors.join(",")}]`);
	}
	shouldLogAuthInjectionInfo(key) {
		const now = Date.now();
		if (now - (this.authInjectionSkipLogThrottle.get(key) ?? 0) < AUTH_INJECTION_SKIP_LOG_THROTTLE_MS) return false;
		this.authInjectionSkipLogThrottle.set(key, now);
		return true;
	}
	isConnectorConnected(connectorId) {
		const rawConfigId = this.normalizeProxyConfigId(connectorId);
		if (!this.persistentState.enabled.includes(rawConfigId)) return false;
		return (this.mcpProxy?.getClientEntry?.(require_workbuddy_auth_product_coordinator.toProxyConfigId(rawConfigId)))?.status === "connected" || this.states.get(rawConfigId)?.status === "connected";
	}
	getCurrentAuthInjectionConditionKeys() {
		const context = this.getConnectorAccountContext();
		const keys = /* @__PURE__ */ new Set();
		if (this.isInternalUser()) keys.add("iOA");
		if (context.accountType) keys.add(`plan:${context.accountType}`);
		const product = this.productManager?.getCurrentConfiguration?.();
		if (typeof product?.networkEnvironment === "string" && product.networkEnvironment.length > 0) keys.add(product.networkEnvironment);
		return keys;
	}
	async resolveAuthInjectionAccessToken(item) {
		if (item.token_type === "oneid-token") return this.fetchOneidAccessTokenForRequest(item);
		return this.peekMcpOAuthAccessTokenForRequest(item);
	}
	async fetchOneidAccessTokenForRequest(item) {
		const existingToken = this.peekOneidHeaderOverride(item.from_connector);
		if (existingToken) return existingToken;
		if (!this.serverSideOauthRefresher || !this.getCurrentEnterpriseId()) return;
		if (item.oneidAppType && !await this.isOneidAppEnabledByType(item.oneidAppType)) return;
		const oauthName = item.oauthName ?? item.from_connector;
		const tokenResult = await this.serverSideOauthRefresher.tryFetchToken(oauthName);
		if (!tokenResult.ok) this.logger.warn(`${AUTH_INJECTION_LOG_PREFIX$1} oneid token fetch failed configId=${item.from_connector} oauthName=${oauthName} error=${tokenResult.error}`);
		return tokenResult.ok ? tokenResult.token : void 0;
	}
	peekOneidHeaderOverride(configId) {
		const headers = this.persistentState.headerOverrides[this.normalizeProxyConfigId(configId)];
		const token = headers?.["X-Oneid-Access-Token"] ?? headers?.["x-oneid-access-token"];
		return typeof token === "string" && token.trim().length > 0 ? token.trim() : void 0;
	}
	peekMcpOAuthAccessTokenForRequest(item) {
		if (!item.serverConfig?.url) return;
		return new require_workbuddy_auth_product_coordinator.ConnectorOAuthStore(this.getUserId()).peekTokens(require_workbuddy_auth_product_coordinator.toProxyConfigId(item.from_connector), item.serverConfig.url, item.serverConfig.headers)?.access_token;
	}
	async applyEnterpriseTokenToActiveConnection(configId) {
		if (!this.isEnterpriseServerSideConnector(configId) || !this.persistentState.enabled.includes(configId)) return;
		const proxyConfigId = require_workbuddy_auth_product_coordinator.toProxyConfigId(configId);
		const clientEntry = this.mcpProxy.getClientEntry(proxyConfigId);
		if (!clientEntry) return;
		if (clientEntry.status === "connecting") {
			this.logger.info(`[ConnectorService] enterprise token apply skipped for ${configId}: entry is connecting, will be picked up by next refresh tick`);
			return;
		}
		const latestServerConfig = this.getLatestServerConfigForConnector(configId);
		if (!latestServerConfig) return;
		await this.mcpProxy.disconnect(proxyConfigId);
		const connectResult = await this.mcpProxy.connect(proxyConfigId, latestServerConfig, true);
		if (!connectResult.success) {
			const status = connectResult.needsAuth ? "unauthorized" : "error";
			this.updateState(configId, status, connectResult.error);
			this.logger.warn(`[ConnectorService] enterprise token applied reconnect failed for ${configId}: ${connectResult.error}`);
			return;
		}
		this.updateState(configId, "connected");
	}
	async refreshExternalAuthBeforeReconnect(proxyConfigId) {
		const configId = this.normalizeProxyConfigId(proxyConfigId);
		if (this.isEnterpriseServerSideConnector(configId)) {
			const syncResult = await this.syncEnterpriseConnectorTokenBeforeConnect(configId);
			if (!syncResult.success) return {
				ok: false,
				kind: syncResult.needsAuthorize ? "auth" : "transient",
				error: syncResult.error
			};
			const serverConfig = this.getLatestServerConfigForConnector(configId);
			return serverConfig ? {
				ok: true,
				serverConfig
			} : { ok: true };
		}
		if (this.isExternallyManagedConnector(configId)) {
			const syncResult = await this.syncExternallyManagedConnectorTokenBeforeConnect(configId);
			if (!syncResult.success) return {
				ok: false,
				kind: syncResult.needsAuthorize ? "auth" : "transient",
				error: syncResult.error
			};
			if (this.isExternallyManagedStaleTokenGuardActive(configId, syncResult.tokenFingerprint)) {
				const error = this.getExternallyManagedStaleTokenError(configId);
				this.updateState(configId, "unauthorized", error);
				return {
					ok: false,
					kind: "auth",
					error
				};
			}
			const serverConfig = this.getLatestServerConfigForConnector(configId);
			return serverConfig ? {
				ok: true,
				serverConfig
			} : { ok: true };
		}
		return { ok: true };
	}
	clearExternallyManagedTokenRetryState(configId) {
		if (configId) {
			const rawConfigId = this.normalizeProxyConfigId(configId);
			const timer = this.externallyManagedTokenRetryTimers.get(rawConfigId);
			if (timer) {
				clearTimeout(timer);
				this.externallyManagedTokenRetryTimers.delete(rawConfigId);
			}
			this.externallyManagedTokenRetryAttempts.delete(rawConfigId);
			return;
		}
		for (const timer of this.externallyManagedTokenRetryTimers.values()) clearTimeout(timer);
		this.externallyManagedTokenRetryTimers.clear();
		this.externallyManagedTokenRetryAttempts.clear();
	}
	hashTokenFingerprint(headerValue) {
		return crypto.createHash("sha256").update(headerValue).digest("hex").slice(0, 12);
	}
	getAuthorizationFingerprint(configId) {
		const rawConfigId = this.normalizeProxyConfigId(configId);
		const headers = this.persistentState.headerOverrides[rawConfigId];
		const authorization = headers?.Authorization ?? headers?.authorization;
		if (typeof authorization !== "string" || authorization.length === 0) return;
		return this.hashTokenFingerprint(authorization);
	}
	isExternallyManagedStaleTokenGuardActive(configId, tokenFingerprint) {
		if (!tokenFingerprint) return false;
		const rawConfigId = this.normalizeProxyConfigId(configId);
		const guard = this.externallyManagedStaleTokenGuard.get(rawConfigId);
		if (!guard) return false;
		if (Date.now() - guard.failedAt >= EXTERNALLY_MANAGED_STALE_TOKEN_GUARD_TTL_MS) {
			this.externallyManagedStaleTokenGuard.delete(rawConfigId);
			return false;
		}
		return guard.tokenFingerprint === tokenFingerprint;
	}
	markExternallyManagedStaleToken(configId, tokenFingerprint) {
		if (!tokenFingerprint) return;
		const rawConfigId = this.normalizeProxyConfigId(configId);
		this.externallyManagedStaleTokenGuard.set(rawConfigId, {
			tokenFingerprint,
			failedAt: Date.now()
		});
	}
	clearExternallyManagedStaleTokenGuard(configId) {
		if (configId) {
			this.externallyManagedStaleTokenGuard.delete(this.normalizeProxyConfigId(configId));
			return;
		}
		this.externallyManagedStaleTokenGuard.clear();
	}
	isInvalidExternallyManagedTokenReason(reason) {
		if (!reason) return false;
		return /\binvalid_token\b/i.test(reason) || /invalid or expired token/i.test(reason);
	}
	getExternallyManagedStaleTokenError(configId) {
		return `${configId}: token from upstream still stale, waiting for re-authorization`;
	}
	scheduleExternallyManagedTokenRetry(configId, error) {
		const rawConfigId = this.normalizeProxyConfigId(configId);
		if (this.externallyManagedTokenRetryTimers.has(rawConfigId)) return;
		if (!this.persistentState.enabled.includes(rawConfigId)) {
			this.clearExternallyManagedTokenRetryState(rawConfigId);
			return;
		}
		const nextAttempt = (this.externallyManagedTokenRetryAttempts.get(rawConfigId) ?? 0) + 1;
		const delayMs = EXTERNALLY_MANAGED_TOKEN_RETRY_DELAYS_MS[nextAttempt - 1];
		if (delayMs === void 0) {
			this.logger.warn(`[ConnectorService] externally-managed token sync retry limit reached for ${rawConfigId}: ${error}`);
			this.clearExternallyManagedTokenRetryState(rawConfigId);
			return;
		}
		this.externallyManagedTokenRetryAttempts.set(rawConfigId, nextAttempt);
		const timer = setTimeout(() => {
			this.externallyManagedTokenRetryTimers.delete(rawConfigId);
			if (!this.persistentState.enabled.includes(rawConfigId)) {
				this.externallyManagedTokenRetryAttempts.delete(rawConfigId);
				return;
			}
			this.refreshAndSync().catch((err) => {
				this.logger.warn(`[ConnectorService] externally-managed token retry refreshAndSync failed for ${rawConfigId}:`, err);
			});
		}, delayMs);
		this.externallyManagedTokenRetryTimers.set(rawConfigId, timer);
	}
	/**
	* 探测并恢复丢失 enabled 状态的 externally-managed connector。
	*
	* 场景：用户删除 connector-states.v3.json 后，非企业态的 externally-managed
	* connector（如 IMA）没有 OneID auto-connect 兜底，enabled 列表中不会自动恢复。
	* 此方法遍历 marketplace 中所有符合条件的 connector，对不在 enabled 中的尝试
	* 向服务端探测 token，有效则恢复其 enabled + everConnected 状态。
	*
	* 前提条件：只恢复 everConnected 中记录过的 connector（即用户曾在本设备手动连接过的）。
	* 从未连接过的 connector 不会被自动恢复，避免启动时自动连接用户未使用的 connector。
	*
	* 只在 refreshAndSync 入口调用，频率很低（启动 + config 变更），不会造成性能问题。
	*/
	async probeAndRecoverExternallyManagedConnectors() {
		const manifest = this.readLocalManifest();
		if (!manifest?.connectors) return;
		const everConnectedSet = new Set(this.persistentState.everConnected ?? []);
		const candidateIds = [];
		for (const entry of manifest.connectors) {
			const source = entry.source || entry.name;
			if (this.persistentState.enabled.includes(source)) continue;
			if (!everConnectedSet.has(source)) continue;
			if (this.getConnectorUserDisabledState(source) === true) continue;
			if (entry.type === "cli" || entry.type === "skill-only") continue;
			if (!this.isExternallyManagedConnector(source)) continue;
			candidateIds.push(source);
		}
		if (candidateIds.length === 0) return;
		this.logger.info(`[ConnectorService] probeAndRecoverExternallyManagedConnectors: probing ${candidateIds.join(", ")}`);
		const results = await Promise.allSettled(candidateIds.map((id) => this.syncExternallyManagedConnectorTokenBeforeConnect(id)));
		let recovered = 0;
		results.forEach((result, index) => {
			const configId = candidateIds[index];
			if (result.status !== "fulfilled" || !result.value.success) return;
			if (this.shouldDefaultDisableCSideConnector(configId)) this.markConnectorUserDisabled(configId);
			const shouldStayDisabled = this.getConnectorUserDisabledState(configId) === true;
			if (!shouldStayDisabled && !this.persistentState.enabled.includes(configId)) this.persistentState.enabled.push(configId);
			if (!this.persistentState.everConnected) this.persistentState.everConnected = [];
			if (!this.persistentState.everConnected.includes(configId)) this.persistentState.everConnected.push(configId);
			if (shouldStayDisabled) this.logger.info(`[ConnectorService] probeAndRecoverExternallyManagedConnectors: ${configId} recovered but stays disabled by C-side default-disabled policy`);
			else this.logger.info(`[ConnectorService] probeAndRecoverExternallyManagedConnectors: recovered ${configId} into enabled`);
			recovered++;
		});
		if (recovered > 0) this.savePersistentState();
	}
	async syncExternallyManagedConnectorTokensBeforeSync() {
		const disconnectIds = this.runCSideAutoBoundDefaultDisabledMigration();
		const configIds = this.persistentState.enabled.filter((id) => this.isExternallyManagedConnector(id));
		if (configIds.length === 0) return { disconnectIds };
		(await Promise.allSettled(configIds.map((id) => this.syncExternallyManagedConnectorTokenBeforeConnect(id)))).forEach((result, index) => {
			const rawConfigId = this.normalizeProxyConfigId(configIds[index]);
			if (result.status === "fulfilled") {
				const syncResult = result.value;
				if (syncResult.success) {
					if (this.isExternallyManagedStaleTokenGuardActive(rawConfigId, syncResult.tokenFingerprint)) {
						const error = this.getExternallyManagedStaleTokenError(rawConfigId);
						this.updateState(rawConfigId, "unauthorized", error);
						this.clearExternallyManagedTokenRetryState(rawConfigId);
						return;
					}
					this.clearExternallyManagedTokenRetryState(rawConfigId);
					return;
				}
				this.logger.warn(`[ConnectorService] externally-managed token sync failed for ${rawConfigId}: ${syncResult.error}`);
				this.updateState(rawConfigId, syncResult.needsAuthorize ? "unauthorized" : "error", syncResult.error);
				if (syncResult.needsAuthorize) {
					this.clearExternallyManagedTokenRetryState(rawConfigId);
					return;
				}
				this.scheduleExternallyManagedTokenRetry(rawConfigId, syncResult.error);
				return;
			}
			const message = result.reason instanceof Error ? result.reason.message : String(result.reason);
			this.logger.warn(`[ConnectorService] externally-managed token sync rejected for ${rawConfigId}: ${message}`);
			this.updateState(rawConfigId, "error", message);
			this.scheduleExternallyManagedTokenRetry(rawConfigId, message);
		});
		return { disconnectIds };
	}
	/**
	* C 端"资料库授权 → 自动接入"默认关闭策略的一次性存量迁移。
	*
	* 触发时机：`syncExternallyManagedConnectorTokensBeforeSync` 入口（token 续票之前）。
	* 执行条件：`persistentState.cSideAutoBoundDefaultDisabledMigrated !== true`。
	* 行为：
	*   - 遍历 `persistentState.enabled` 中所有命中 `isCSideAutoBoundConnector` 的 configId。
	*   - 不管 `userDisabled` 当前值（undefined / false / true），一律 `markConnectorUserDisabled(id)` + 从 `enabled` 中移除 + 收集到 disconnectIds。
	*     存量用户之前可能因 connect() 被标记为 userDisabled=false，一次性迁移也要把他们关闭。
	*   - 写入迁移标记 + savePersistentState。
	* 返回：需要由调用方兜底 `disconnect(id, { userInitiated: false })` 的 id 列表。
	*
	* 一次性保护：迁移完成后置 true，后续启动不再扫描 enabled，
	* 避免误关用户在迁移后主动打开（userDisabled=false）的 connector，
	* 也避免每次 sync 都做无谓遍历。
	*/
	runCSideAutoBoundDefaultDisabledMigration() {
		if (this.persistentState.cSideAutoBoundDefaultDisabledMigrated === true) return [];
		const disconnectIds = [];
		const remainingEnabled = [];
		for (const configId of this.persistentState.enabled) {
			if (!this.isCSideAutoBoundConnector(configId)) {
				remainingEnabled.push(configId);
				continue;
			}
			this.markConnectorUserDisabled(configId);
			disconnectIds.push(configId);
		}
		if (disconnectIds.length > 0) this.persistentState.enabled = remainingEnabled;
		this.persistentState.cSideAutoBoundDefaultDisabledMigrated = true;
		this.savePersistentState();
		if (disconnectIds.length > 0) this.logger.info(`[ConnectorService] c-side auto-bound default-disabled migration: disabled ${disconnectIds.join(", ")}`);
		return disconnectIds;
	}
	async syncExternallyManagedConnectorTokenBeforeConnect(configId) {
		if (!this.isExternallyManagedConnector(configId)) return { success: true };
		const oauthName = this.resolveOauthName(configId);
		const rawConfigId = this.normalizeProxyConfigId(configId);
		const useStatusEndpoint = oauthName === "tdocs-app" || rawConfigId === "tencent-docs";
		const tokenOauthName = useStatusEndpoint ? "tdocs-app" : oauthName;
		const tokenApiPath = useStatusEndpoint ? `/v2/as/connector/oauth/${tokenOauthName}/status` : `/v2/as/connector/oauth/${tokenOauthName}/accesstoken`;
		let resp;
		try {
			resp = await this.withExternallyManagedTokenRefreshTimeout(require_workbuddy_auth_product_coordinator.callConnectorOauthApi("GET", tokenApiPath, {
				productManager: this.productManager,
				authenticationManager: this.authenticationManager,
				fetch: this.hostCapabilities.fetch
			}));
		} catch (error) {
			return {
				success: false,
				needsAuthorize: false,
				error: error instanceof Error ? error.message : String(error)
			};
		}
		let headerValue;
		if (useStatusEndpoint) {
			const data = resp?.data;
			const status = typeof data?.status === "string" ? data.status : void 0;
			const mcpToken = data?.extra?.mcp_token;
			if (resp?.code === 0 && status === "connected" && typeof mcpToken === "string" && mcpToken.length > 0) headerValue = mcpToken;
			else if (resp?.code === 0 && status) return {
				success: false,
				needsAuthorize: true,
				error: status === "connected" ? "tdocs-app status=connected missing mcp_token" : `tdocs-app status=${status}`
			};
		} else if (rawConfigId === "ima-mcp") {
			const mcpToken = resp?.data?.mcp_token ?? resp?.data?.mcpToken;
			if (typeof mcpToken === "string" && mcpToken.length > 0) headerValue = mcpToken;
		} else {
			const token = resp?.data?.access_token ?? resp?.data?.token;
			if (typeof token === "string" && token.length > 0) headerValue = token;
		}
		if (resp?.code === 0 && headerValue) {
			const tokenFingerprint = this.hashTokenFingerprint(headerValue);
			const updateResult = await this.updateHeaders(rawConfigId, { Authorization: headerValue }, true);
			if (!updateResult.success) return {
				success: false,
				needsAuthorize: false,
				error: updateResult.error || "updateHeaders failed"
			};
			this.logger.info(`[ConnectorService] externally-managed token sync ok for ${rawConfigId} via ${useStatusEndpoint ? "status" : "accesstoken"} (token.length=${headerValue.length})`);
			return {
				success: true,
				tokenFingerprint
			};
		}
		const code = typeof resp?.code === "number" ? resp.code : -1;
		const msg = resp?.msg ?? "unknown";
		return {
			success: false,
			needsAuthorize: EXTERNALLY_MANAGED_AUTH_FAILURE_CODES.has(code),
			error: `code=${code} msg=${msg}`
		};
	}
	withExternallyManagedTokenRefreshTimeout(promise) {
		return new Promise((resolvePromise, rejectPromise) => {
			const timeoutMessage = `externally managed token refresh timed out after ${EXTERNALLY_MANAGED_TOKEN_REFRESH_TIMEOUT_MS}ms`;
			const timer = setTimeout(() => rejectPromise(new Error(timeoutMessage)), EXTERNALLY_MANAGED_TOKEN_REFRESH_TIMEOUT_MS);
			promise.then((value) => {
				clearTimeout(timer);
				resolvePromise(value);
			}, (error) => {
				clearTimeout(timer);
				rejectPromise(error);
			});
		});
	}
	/** init 时为所有 enabled 里的 server-side OAuth connector 启动刷新任务 */
	startServerSideOauthRefreshForEnabled() {
		if (!this.serverSideOauthRefresher) return;
		for (const configId of this.persistentState.enabled) this.maybeScheduleServerSideOauth(configId);
	}
	async syncEnterpriseConnectorTokenBeforeConnect(configId) {
		if (!this.serverSideOauthRefresher || !this.getCurrentEnterpriseId()) return { success: true };
		const entry = this.getMarketplaceEntryById(configId);
		if (!entry || !this.isEnterpriseServerSideConnector(configId)) return { success: true };
		if (!await this.isOneidAppEnabledForEntry(entry)) return {
			success: false,
			needsAuthorize: true,
			error: "OneID application is not enabled"
		};
		const connectorName = this.resolveOauthName(configId);
		const tokenResult = await this.serverSideOauthRefresher.tryFetchToken(connectorName);
		if (!tokenResult.ok) return {
			success: false,
			needsAuthorize: tokenResult.needsAuthorize,
			error: tokenResult.error
		};
		const updateResult = await this.updateHeaders(configId, this.resolveTokenHeaders(configId, connectorName, tokenResult.token), true);
		if (!updateResult.success) return {
			success: false,
			needsAuthorize: false,
			error: updateResult.error || "updateHeaders failed"
		};
		if (!this.serverSideOauthRefresher.isScheduled(configId)) this.serverSideOauthRefresher.schedule(configId, connectorName, {
			initialAccessToken: tokenResult.token,
			initialExpiresIn: tokenResult.expiresIn
		});
		return { success: true };
	}
	/**
	* 企业态 connector 是 OneID 租户级开通，启动或切账号时先恢复端侧 MCP 连接。
	*
	* - userDisabled=false：用户已显式开启，恢复连接后保持启用。
	* - userDisabled=true/undefined：先恢复连接，随后立即断开并保持本地禁用；undefined 会先写入 true。
	*
	* 返回需要在调用方完成统一 refreshAndSync 后立即断开的 connector。
	*/
	async scheduleEnterpriseConnectorRefreshes(options) {
		if (!this.serverSideOauthRefresher || !this.getCurrentEnterpriseId()) return [];
		const manifest = this.readLocalManifest();
		if (!manifest?.connectors) return [];
		let shouldRefreshAndSync = false;
		const connectorsToDisableAfterRestore = [];
		for (const entry of manifest.connectors) {
			const source = entry.source || entry.name;
			if (!Boolean(this.resolveActiveEnterpriseVariant(entry) || this.isEnterpriseManagedOneidConnector(entry)) || this.resolveActiveAuthMode(entry) !== "server-side") continue;
			if (entry.type === "cli" || entry.type === "skill-only") continue;
			if (!await this.isOneidAppEnabledForEntry(entry)) continue;
			const shouldDisableAfterRestore = this.getConnectorUserDisabledState(source) !== false;
			if (this.shouldDefaultDisableEnterpriseConnector(source)) {
				this.markConnectorUserDisabled(source);
				this.savePersistentState();
			}
			if (this.shouldSkipDisabledEnterpriseConnectorRestore(source)) {
				this.logger.info(`[ConnectorService] enterprise auto-connect ${source}: already disabled after restore, skipping reconnect`);
				continue;
			}
			const connectorName = this.resolveOauthName(source);
			const tokenResult = await this.serverSideOauthRefresher.tryFetchToken(connectorName);
			if (!tokenResult.ok) {
				const status = tokenResult.needsAuthorize ? "unauthorized" : "error";
				this.logger.warn(`[ConnectorService] enterprise auto-connect ${source}: token precheck failed (${tokenResult.error}), status=${status}`);
				this.updateState(source, status, tokenResult.error);
				continue;
			}
			const updateResult = await this.updateHeaders(source, this.resolveTokenHeaders(source, connectorName, tokenResult.token), true);
			if (!updateResult.success) {
				this.logger.warn(`[ConnectorService] enterprise auto-connect ${source}: updateHeaders failed: ${updateResult.error}`);
				this.updateState(source, "error", updateResult.error);
				continue;
			}
			if (!this.persistentState.enabled.includes(source)) this.persistentState.enabled.push(source);
			if (!this.persistentState.everConnected) this.persistentState.everConnected = [];
			if (!this.persistentState.everConnected.includes(source)) this.persistentState.everConnected.push(source);
			this.savePersistentState();
			shouldRefreshAndSync = true;
			this.writeConnectorsMcpConfig();
			if (shouldDisableAfterRestore && !connectorsToDisableAfterRestore.includes(source)) {
				connectorsToDisableAfterRestore.push(source);
				this.updateState(source, "disconnected");
			}
			if (!this.serverSideOauthRefresher.isScheduled(source)) this.serverSideOauthRefresher.schedule(source, connectorName, {
				initialAccessToken: tokenResult.token,
				initialExpiresIn: tokenResult.expiresIn
			});
		}
		if (shouldRefreshAndSync && !options?.skipRefreshAndSync) {
			await this.refreshAndSync();
			await this.disableEnterpriseConnectorsAfterRestore(connectorsToDisableAfterRestore);
			return [];
		}
		return connectorsToDisableAfterRestore;
	}
	async disableEnterpriseConnectorsAfterRestore(configIds) {
		for (const configId of configIds) {
			if (!this.persistentState.enabled.includes(configId)) continue;
			this.logger.info(`[ConnectorService] enterprise auto-connect ${configId}: restored, disabling locally`);
			const result = await this.disconnect(configId, { userInitiated: true });
			if (!result.success) this.logger.warn(`[ConnectorService] enterprise auto-connect ${configId}: disable after restore failed: ${result.error}`);
		}
	}
	/**
	* 反向同步：OneID 后台关闭某 enterprise variant connector ⇒ 端侧执行 unbind 等价动作。
	*
	* 触发时机：
	*   - init() 时（兜底）；
	*   - renderer 通过 oneidListApplications RPC 回灌 applications 后调用
	*     refreshEnterpriseConnectorTokens 时（主入口，applications 一定是最新的）。
	*
	* 判定规则：
	*   - everConnected 含该 source（曾经连过） + OneID disabled → 视为被管理员后台解绑 → unbind
	*   - 从未连过                                                → 不动
	*   - OneID 仍开通                                            → 不动
	*
	* unbind() 内部不调 /v2/.../revoke（B 端解绑权在管理员后台），只清本地状态：
	*   enabled / everConnected / headerOverrides / envOverrides / token 文件 / mcp.json，并 emit unbound 事件。
	*/
	async syncEnterpriseConnectorUnbind() {
		if (!this.getCurrentEnterpriseId()) return;
		const manifest = this.readLocalManifest();
		if (!manifest?.connectors) return;
		let apps;
		try {
			apps = await this.getOneidApplications();
		} catch (err) {
			this.logger.warn("[ConnectorService] syncEnterpriseConnectorUnbind: getOneidApplications failed, skip:", err);
			return;
		}
		const everConnected = new Set(this.persistentState.everConnected ?? []);
		for (const entry of manifest.connectors) {
			const source = entry.source || entry.name;
			if (!Boolean(this.resolveActiveEnterpriseVariant(entry) || this.isEnterpriseManagedOneidConnector(entry))) continue;
			if (entry.type === "cli" || entry.type === "skill-only") continue;
			if (!everConnected.has(source)) continue;
			const appType = this.resolveOneidAppType(entry);
			if (!appType) continue;
			if (apps.find((a) => a.app_type === appType)?.enabled === true) continue;
			this.logger.info(`[ConnectorService] OneID app ${appType} disabled, auto-unbinding ${source}`);
			try {
				await this.unbind(source);
			} catch (err) {
				this.logger.warn(`[ConnectorService] auto-unbind ${source} failed:`, err);
			}
		}
	}
	async isOneidAppEnabledForEntry(entry) {
		const appType = this.resolveOneidAppType(entry);
		if (!appType) return true;
		return this.isOneidAppEnabledByType(appType, entry.source || entry.name);
	}
	async isOneidAppEnabledByType(appType, logName = appType) {
		try {
			return (await this.getOneidApplications()).find((app) => app.app_type === appType)?.enabled === true;
		} catch (err) {
			this.logger.warn(`[ConnectorService] OneID applications check failed for ${logName}:`, err);
			return false;
		}
	}
	resolveOneidAppType(entry) {
		return require_workbuddy_auth_product_coordinator.resolveOneidAppType(entry, this.getConnectorAccountContext());
	}
	populateOneidApplicationsCache(enterpriseId, applications) {
		if (!enterpriseId) return;
		const normalized = applications.map((item) => ({
			app_type: item.app_type ?? "",
			enabled: item.enabled === true
		}));
		this.oneidApplicationsCache.set(enterpriseId, { applications: this.applyDevForceDisabled(normalized) });
	}
	/**
	* ⚠️ 开发期 HACK：硬编码把所有 OneID applications 的 enabled 全部强制为 false，
	* 用于本地验证 OneID 应用「开通 → 关闭」时反向 unbind 链路（syncEnterpriseConnectorUnbind）。
	*
	* 必须在所有写入 oneidApplicationsCache 的入口统一调用：
	* - fetchOneidApplications（init 路径，主进程主动 fetch）
	* - populateOneidApplicationsCache（renderer RPC 回灌路径）
	*
	* TODO: 验证完毕后整体删除此方法，并去掉两处调用点。
	*/
	applyDevForceDisabled(apps) {
		return apps;
	}
	async getOneidApplications() {
		const enterpriseId = this.getCurrentEnterpriseId();
		if (!enterpriseId) return [];
		let cache = this.oneidApplicationsCache.get(enterpriseId);
		if (cache?.applications) return cache.applications;
		if (cache?.promise) return cache.promise;
		cache = {};
		const promise = this.fetchOneidApplications(enterpriseId).then((applications) => {
			cache.applications = applications;
			cache.promise = void 0;
			return applications;
		}).catch((err) => {
			cache.promise = void 0;
			throw err;
		});
		cache.promise = promise;
		this.oneidApplicationsCache.set(enterpriseId, cache);
		return promise;
	}
	async fetchOneidApplications(enterpriseId) {
		const endpoint = this.productManager.getEndpoint();
		if (!endpoint) throw new Error("[OneID] No endpoint available");
		const authHeaders = this.authService.buildAuthHeaders();
		if (!authHeaders.Authorization || !authHeaders["X-User-Id"]) throw new Error("[OneID] Not logged in");
		const headers = {
			Accept: "application/json",
			"Content-Type": "application/json",
			...authHeaders
		};
		const url = `${endpoint.replace(/\/+$/, "")}/console/enterprises/${encodeURIComponent(enterpriseId)}/oneid_openapi/applications`;
		const response = await this.hostCapabilities.fetch(url, {
			method: "GET",
			headers
		});
		if (!response.ok) {
			const text = await response.text().catch(() => "");
			throw new Error(`[OneID] listApplications HTTP ${response.status}: ${text}`);
		}
		const raw = typeof response.json === "function" ? await response.json() : JSON.parse(await response.text());
		if (typeof raw.code === "number" && raw.code !== 0) throw new Error(`[OneID] listApplications API error ${raw.code}: ${raw.msg ?? ""}`);
		const normalized = (raw.data?.applications ?? raw.applications ?? []).map((item) => ({
			app_type: item.app_type ?? "",
			enabled: item.enabled === true
		}));
		return this.applyDevForceDisabled(normalized);
	}
	ensurePersistentStateMatchesCurrentIdentity() {
		const currentIdentityKey = this.getCurrentAccountIdentityKey();
		if (this.persistentState.accountIdentityKey ? !this.matchesCurrentAccountIdentity(this.persistentState.accountIdentityKey, currentIdentityKey) : !!this.getCurrentEnterpriseId()) this.clearManagedAuthHeaders();
		if (this.persistentState.accountIdentityKey === currentIdentityKey) return;
		this.persistentState.accountIdentityKey = currentIdentityKey;
		this.savePersistentState();
	}
	matchesCurrentAccountIdentity(storedIdentityKey, currentIdentityKey) {
		if (storedIdentityKey === currentIdentityKey) return true;
		if (this.getConnectorAccountContext().variantKey !== "enterprise") return false;
		return storedIdentityKey === this.getLegacyAccountIdentityKey();
	}
	clearManagedAuthHeaders() {
		const managedHeaderNames = new Set(["Authorization", "X-Oneid-Access-Token"]);
		let changed = false;
		for (const [configId, headers] of Object.entries(this.persistentState.headerOverrides)) {
			if (!require_workbuddy_auth_product_coordinator.hasEnterpriseVariantConfig(this.getMarketplaceEntryById(configId))) continue;
			for (const headerName of Array.from(managedHeaderNames)) if (headers[headerName] !== void 0) {
				delete headers[headerName];
				changed = true;
			}
			if (Object.keys(headers).length === 0) delete this.persistentState.headerOverrides[configId];
		}
		if (changed) this.logger.info("[ConnectorService] Cleared managed auth headers after account identity change");
	}
	/**
	* 启动时把 persistentState.enabled 中的 skill-only connector 状态恢复为 'connected'。
	* skill-only 没有真实的 MCP 连接，只要用户启用过（在 enabled 里）就视为已连接。
	*/
	restoreSkillOnlyConnectedState() {
		for (const configId of this.persistentState.enabled) {
			const entry = this.getMarketplaceEntryById(configId);
			if (!entry || entry.type !== "skill-only") continue;
			this.updateState(configId, "connected");
			this.installSkills(configId);
		}
	}
	/** 通过 configId 找 marketplace entry（兼容带/不带 connector: 前缀的场景） */
	getMarketplaceEntryById(configId) {
		const manifest = this.readLocalManifest();
		if (!manifest?.connectors) return;
		const stripped = configId.startsWith("connector:") ? configId.slice(require_workbuddy_auth_product_coordinator.CONNECTOR_PREFIX.length) : configId;
		return manifest.connectors.find((e) => (e.source || e.name) === stripped);
	}
	/**
	* 一次性迁移：把旧版 `configDir/skills/connector-*` 挪到 `configDir/connectors/skills/connector-*`。
	*
	* 背景：早期 `installSkills` 把 connector 的 skill 装在 `configDir/skills/` 下，和用户自己的 skill 混在同一个目录。
	* workbuddy 扫描用户 skill 时会把它们当成 source='user' 返回，导致 UI 的 source='connector' 过滤失效。
	*
	* 新路径 `configDir/connectors/skills/` 与 agent-craft 对齐，扫描后 source='connector'，UI 可正确过滤。
	*
	* 可靠性设计：
	* - 优先使用 `renameSync`（同盘下是原子操作）。
	* - 跨盘 rename 失败时，退化为 "copy 到 `.tmp` → rename `.tmp` 到最终路径 → 删源"，
	*   避免"复制一半进程崩溃"导致下次启动把残缺 dest 当作完整迁移，进而错删源数据。
	* - 异常时绝不删源；重启后可重新尝试迁移。
	* - 已存在于最终路径的条目视为旧版本重连时已生成，直接清掉旧源。
	*/
	migrateLegacyConnectorSkills() {
		const legacyBase = (0, path.join)(this.configDir, "skills");
		const newBase = (0, path.join)(this.configDir, CONNECTOR_SKILLS_DIR);
		if (!(0, fs.existsSync)(legacyBase)) return;
		let entries;
		try {
			entries = (0, fs.readdirSync)(legacyBase);
		} catch (error) {
			this.logger.warn("[ConnectorService] Failed to read legacy skills dir for migration:", error);
			return;
		}
		const toMigrate = entries.filter((n) => n.startsWith(CONNECTOR_SKILL_PREFIX));
		if (toMigrate.length === 0) return;
		try {
			(0, fs.mkdirSync)(newBase, { recursive: true });
		} catch (error) {
			this.logger.warn("[ConnectorService] Failed to create new connector skills dir:", error);
			return;
		}
		for (const name of toMigrate) {
			const src = (0, path.join)(legacyBase, name);
			const dest = (0, path.join)(newBase, name);
			const tmpDest = (0, path.join)(newBase, `${name}.migrating`);
			try {
				if ((0, fs.existsSync)(dest)) {
					(0, fs.rmSync)(src, {
						recursive: true,
						force: true
					});
					this.logger.info(`[ConnectorService] Removed stale legacy connector skill: ${name}`);
					continue;
				}
				if ((0, fs.existsSync)(tmpDest)) (0, fs.rmSync)(tmpDest, {
					recursive: true,
					force: true
				});
				try {
					(0, fs.renameSync)(src, dest);
				} catch {
					this.copyDirectory(src, tmpDest);
					(0, fs.renameSync)(tmpDest, dest);
					(0, fs.rmSync)(src, {
						recursive: true,
						force: true
					});
				}
				this.logger.info(`[ConnectorService] Migrated legacy connector skill: ${name}`);
			} catch (error) {
				try {
					if ((0, fs.existsSync)(tmpDest)) (0, fs.rmSync)(tmpDest, {
						recursive: true,
						force: true
					});
				} catch {}
				this.logger.warn(`[ConnectorService] Failed to migrate legacy connector skill ${name}:`, error);
			}
		}
	}
	/**
	* 安装 connector 的 skills 到 ~/.workbuddy/connectors/skills/connector-{id}/
	*
	* 路径设计：与 agent-craft 的 loadConnectorSkills 扫描路径对齐，
	* 以便 agent-craft 能正确识别 source='connector'，UI 层可按 source 过滤。
	* （旧路径 ~/.workbuddy/skills/connector-{id}/ 会把 connector skill 混入用户 skill 列表）
	*/
	installSkills(configId) {
		const source = configId;
		const connectorDir = (0, path.join)(this.baseDir, require_workbuddy_auth_product_coordinator.CONNECTORS_DIR, source);
		let srcSkillsDir = (0, path.join)(connectorDir, "skills");
		if (!(0, fs.existsSync)(srcSkillsDir)) srcSkillsDir = (0, path.join)(connectorDir, "skill");
		if (!(0, fs.existsSync)(srcSkillsDir)) {
			this.logger.info(`[ConnectorService] No skills found for ${configId}`);
			return;
		}
		const destSkillsDir = (0, path.join)(this.configDir, CONNECTOR_SKILLS_DIR, `${CONNECTOR_SKILL_PREFIX}${configId}`);
		if ((0, fs.existsSync)(destSkillsDir)) (0, fs.rmSync)(destSkillsDir, {
			recursive: true,
			force: true
		});
		(0, fs.mkdirSync)(destSkillsDir, { recursive: true });
		this.copyDirectory(srcSkillsDir, destSkillsDir);
		this.logger.info(`[ConnectorService] Installed skills for ${configId} to ${destSkillsDir}`);
	}
	/**
	* 禁用 connector 的 skills：递归标记 connector 目录下所有 SKILL.md 的 frontmatter `disable: true`。
	*
	* 历史：最初实现只处理 `connector-<id>/SKILL.md` 这个顶层单文件（Gmail 场景只有一层）。
	* 若 connector 在 skills 目录下采用嵌套结构（例如 `skills/search/SKILL.md` +
	* `skills/send/SKILL.md`），旧实现会漏标，解绑后 agent-cli 仍会扫到并注入 prompt——
	* 即"已解绑但能力仍可触发"的一致性 bug。
	*
	* 现行策略：以 `connector-<id>/` 为根递归，精确匹配文件名 `SKILL.md` 逐个打标。
	* 与 agent-cli `SkillProductProvider.scanSkillsDirectory` 的命名规则和最大深度对齐，
	* 保证「能被扫到的 SKILL.md 都能被禁用」。
	*
	* 软禁用保留原目录结构；重连时 `installSkills` 会 `rmSync` 整目录再复制，`disable` 字段自然消失。
	* 单个文件失败不阻断其他文件，尽力而为。
	*/
	disableSkills(configId) {
		const connectorDir = (0, path.join)(this.configDir, CONNECTOR_SKILLS_DIR, `${CONNECTOR_SKILL_PREFIX}${configId}`);
		if (!(0, fs.existsSync)(connectorDir)) return;
		let markedCount = 0;
		const visit = (dir, depth) => {
			if (depth > MAX_SKILL_SCAN_DEPTH) return;
			let entries;
			try {
				entries = (0, fs.readdirSync)(dir);
			} catch (error) {
				this.logger.warn(`[ConnectorService] disableSkills readdir failed: ${dir}`, error);
				return;
			}
			for (const entry of entries) {
				const fullPath = (0, path.join)(dir, entry);
				let stat;
				try {
					stat = (0, fs.statSync)(fullPath);
				} catch {
					continue;
				}
				if (stat.isDirectory()) visit(fullPath, depth + 1);
				else if (stat.isFile() && entry === "SKILL.md") {
					if (this.markSkillFileDisabled(fullPath)) markedCount++;
				}
			}
		};
		visit(connectorDir, 0);
		this.logger.info(`[ConnectorService] Disabled ${markedCount} skill file(s) for ${configId}`);
	}
	/**
	* 把单个 SKILL.md 的 frontmatter 标记为 `disable: true`。
	*
	* - 没有 frontmatter 的文件不处理（与旧行为一致：只对带 YAML frontmatter 的 skill 生效）
	* - 已是禁用态时幂等跳过
	* - 失败返回 false 并打 warn，调用方仅用作计数不阻断
	*/
	markSkillFileDisabled(skillFile) {
		try {
			const raw = (0, fs.readFileSync)(skillFile, "utf-8");
			const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
			if (!fmMatch) return false;
			const data = import_dist.parse(fmMatch[1]) || {};
			if (data.disable === true) return true;
			data.disable = true;
			const body = raw.slice(fmMatch[0].length).replace(/^\r?\n/, "");
			(0, fs.writeFileSync)(skillFile, `---\n${import_dist.stringify(data).trimEnd()}\n---\n${body}`, "utf-8");
			return true;
		} catch (error) {
			this.logger.warn(`[ConnectorService] Failed to mark skill disabled: ${skillFile}`, error);
			return false;
		}
	}
	/**
	* 写入 connectors/mcp.json：合并所有 connector 的 MCP 配置
	* 用于 CLI 及其他工具读取 connector 的 MCP 服务器配置
	*/
	writeConnectorsMcpConfig() {
		const manifest = this.readLocalManifest();
		if (!manifest?.connectors) return;
		const mergedServers = {};
		for (const entry of manifest.connectors) {
			const source = entry.source || entry.name;
			if (entry.type === "cli") {
				this.logger.info(`[ConnectorService] Skipping mcp.json for CLI connector: ${source}`);
				continue;
			}
			if (entry.type === "skill-only") {
				this.logger.info(`[ConnectorService] Skipping mcp.json for skill-only connector: ${source}`);
				continue;
			}
			const mcpConfig = this.readConnectorMcpConfig(source);
			if (!mcpConfig) continue;
			const isEnabled = this.persistentState.enabled.includes(source);
			for (const [, serverConfig] of Object.entries(mcpConfig.mcpServers)) {
				const key = require_workbuddy_auth_product_coordinator.toProxyConfigId(source);
				const rawTimeout = serverConfig.timeout;
				const timeoutMs = rawTimeout ? rawTimeout < 1e3 ? rawTimeout * 1e3 : rawTimeout : void 0;
				mergedServers[key] = {
					...serverConfig,
					...timeoutMs !== void 0 ? { timeout: timeoutMs } : {},
					...!isEnabled ? { disabled: true } : {}
				};
			}
		}
		const connectorsMcpDir = (0, path.dirname)(this.connectorMcpConfigPath);
		try {
			(0, fs.mkdirSync)(connectorsMcpDir, { recursive: true });
			this.lastSelfWriteConnectorMcpAt = Date.now();
			(0, fs.writeFileSync)(this.connectorMcpConfigPath, JSON.stringify({ mcpServers: mergedServers }, null, 2), "utf-8");
			this.mcpJsonCache.invalidate(this.connectorMcpConfigPath);
			this.logger.info(`[ConnectorService] Written connectors MCP config to ${this.connectorMcpConfigPath}`);
		} catch (err) {
			this.logger.warn("[ConnectorService] Failed to write connectors MCP config:", err);
		}
	}
	async syncMarketplaceContent() {
		const { url, marketplaceName } = this.getDefaultConnectorMarketplace();
		if (this.isLoaded()) {
			this.logger.info("[ConnectorService] Marketplace already cached, skipping download");
			this.tryUpdate().catch(() => {});
			return;
		}
		await this.downloadAndReplaceMarketplace(url, marketplaceName);
	}
	async downloadAndReplaceMarketplace(url, marketplaceName) {
		const tempDir = (0, path.join)((0, os.tmpdir)(), `connectors-marketplace-tmp-${process.pid}-${Date.now()}`);
		try {
			const { fingerprint } = await this.downloadAndExtractToDir(url, tempDir);
			await this.replaceMarketplaceDir(tempDir, marketplaceName, fingerprint);
		} finally {
			if ((0, fs.existsSync)(tempDir)) (0, fs.rmSync)(tempDir, {
				recursive: true,
				force: true
			});
		}
	}
	async downloadAndExtractToDir(url, targetDir) {
		const { buffer, etag } = await this.downloadBufferWithHeaders(url);
		const zip = new import_adm_zip.default(buffer);
		(0, fs.mkdirSync)(targetDir, { recursive: true });
		zip.extractAllTo(targetDir, true);
		const manifestPath = (0, path.join)(targetDir, require_workbuddy_auth_product_coordinator.MANIFEST_REL_PATH);
		if (!(0, fs.existsSync)(manifestPath)) throw new Error(`Downloaded zip does not contain ${require_workbuddy_auth_product_coordinator.MANIFEST_REL_PATH}`);
		const manifest = JSON.parse((0, fs.readFileSync)(manifestPath, "utf-8"));
		const sha256 = crypto.createHash("sha256").update(buffer).digest("hex");
		return {
			manifest,
			fingerprint: {
				etag: etag ?? null,
				sha256
			}
		};
	}
	async replaceMarketplaceDir(sourceDir, marketplaceName, fingerprint) {
		if (!this.acquireLock()) {
			this.logger.info(`[ConnectorService] Another instance is syncing "${marketplaceName}", skipping`);
			return;
		}
		try {
			if ((0, fs.existsSync)(this.baseDir)) (0, fs.rmSync)(this.baseDir, {
				recursive: true,
				force: true
			});
			try {
				(0, fs.renameSync)(sourceDir, this.baseDir);
			} catch {
				this.copyDirectory(sourceDir, this.baseDir);
			}
			if (fingerprint) this.saveMarketplaceMeta(fingerprint);
			this.rebuildAuthInjectionRuleCache();
			for (const configId of this.persistentState.enabled) {
				if (!((this.getMarketplaceEntryById(configId)?.type || "mcp") === "mcp" ? this.mcpProxy.getClientEntry(require_workbuddy_auth_product_coordinator.toProxyConfigId(configId))?.status === "connected" : this.states.get(configId)?.status === "connected")) continue;
				try {
					this.installSkills(configId);
				} catch (error) {
					this.logger.warn(`[ConnectorService] Post-marketplace-update installSkills failed for ${configId}:`, error);
				}
			}
			this.logger.info(`[ConnectorService] Synced marketplace "${marketplaceName}"`);
		} finally {
			this.releaseLock();
		}
	}
	buildConnectorConfig(entry) {
		const source = entry.source || entry.name;
		const connectorType = entry.type || "mcp";
		const incompatibility = this.computeVersionIncompatibility(entry);
		if (incompatibility && !this.isConnectorTouchedByUser(source)) {
			this.logger.info(`[ConnectorService] Skip entry ${source}: incompatible (${incompatibility.kind}) and user has never enabled/connected it; minVersion=${entry.minWorkbuddyVersion ?? ""} maxVersion=${entry.maxWorkbuddyVersion ?? ""}`);
			return null;
		}
		let config;
		if (connectorType === "cli") config = this.buildCliConnectorConfig(entry, source);
		else if (connectorType === "skill-only") config = this.buildSkillOnlyConnectorConfig(entry, source);
		else config = this.buildMcpConnectorConfig(entry, source);
		if (config && incompatibility) config.versionIncompatibility = incompatibility;
		return config;
	}
	/**
	* 计算 entry 与当前 WorkBuddy 版本的兼容性结果。
	* 返回 undefined / VersionIncompatibility：
	* - 无版本约束或兼容 → undefined
	* - 不兼容 → 对应的 VersionIncompatibility 对象
	*
	* 拿不到当前版本号（测试环境 / electron app 未就绪等）时走宽松策略：
	* 直接返回 undefined，不阻塞任何 connector。
	*/
	computeVersionIncompatibility(entry) {
		const currentVersion = this.hostCapabilities.getAppVersion();
		if (!currentVersion) return;
		return checkCompatibility({
			currentVersion,
			minWorkbuddyVersion: entry.minWorkbuddyVersion,
			maxWorkbuddyVersion: entry.maxWorkbuddyVersion
		}) ?? void 0;
	}
	/**
	* 用户是否曾经"接触过"该 connector（启用过 or 连接成功过）。
	* 用于决定不兼容 connector 在 UI 中是否保留显示（置灰降级）。
	*/
	isConnectorTouchedByUser(source) {
		if (this.persistentState.enabled?.includes(source)) return true;
		if (this.persistentState.everConnected?.includes(source)) return true;
		return false;
	}
	buildMcpConnectorConfig(entry, source) {
		const mcpPath = (0, path.join)(this.baseDir, require_workbuddy_auth_product_coordinator.CONNECTORS_DIR, source, "mcp.json");
		if (!(0, fs.existsSync)(mcpPath)) return null;
		let mcpConfig;
		try {
			mcpConfig = JSON.parse((0, fs.readFileSync)(mcpPath, "utf-8"));
		} catch {
			return null;
		}
		const iconPath = this.findConnectorIcon(source);
		const skills = this.readSkillConfigs(source);
		const runtimeConfig = this.buildRuntimeMcpConfig(source, mcpConfig);
		const firstServerConfig = Object.values(runtimeConfig.mcpServers || {})[0];
		const mcpConfigInfo = firstServerConfig ? {
			url: firstServerConfig.url || "",
			type: firstServerConfig.type,
			headers: firstServerConfig.headers,
			env: firstServerConfig.env
		} : { url: "" };
		let tokenConfig;
		let tokenValues;
		let tokenSecretFields;
		if (entry.auth_mode === "token") {
			const schema = this.readTokenSchema(source);
			if (schema) {
				tokenConfig = schema;
				const envOverrides = this.persistentState.envOverrides[source] || {};
				tokenValues = {};
				tokenSecretFields = [];
				for (const field of schema.fields) {
					const saved = envOverrides[field.key];
					if (field.type === "password") {
						tokenValues[field.key] = "";
						if (typeof saved === "string" && saved.length > 0) tokenSecretFields.push(field.key);
					} else tokenValues[field.key] = typeof saved === "string" && saved.length > 0 ? saved : field.defaultValue ?? "";
				}
			}
		}
		let cliConfig;
		if (mcpConfig.preAuth === "cli") {
			const cliPath = (0, path.join)(this.baseDir, require_workbuddy_auth_product_coordinator.CONNECTORS_DIR, source, "cli.json");
			if ((0, fs.existsSync)(cliPath)) try {
				cliConfig = JSON.parse((0, fs.readFileSync)(cliPath, "utf-8"));
			} catch (e) {
				this.logger.warn(`[ConnectorService] Failed to read cli.json for preAuth: ${source}`, e);
			}
		}
		return {
			id: source,
			name: this.resolveLocalizedName(entry),
			description: this.resolveLocalizedDescription(entry),
			icon: iconPath || "",
			authMode: this.resolveActiveAuthMode(entry),
			providerId: entry.provider_id,
			mcpConfig: mcpConfigInfo,
			skills,
			...cliConfig ? { cliConfig } : {},
			...tokenConfig ? { tokenConfig } : {},
			...tokenValues ? { tokenValues } : {},
			...tokenSecretFields && tokenSecretFields.length > 0 ? { tokenSecretFields } : {},
			...entry.visible_in && entry.visible_in.length > 0 ? { visibleIn: entry.visible_in } : {},
			...entry.examples_zh && entry.examples_zh.length > 0 ? { examples_zh: entry.examples_zh } : {},
			...entry.examples_en && entry.examples_en.length > 0 ? { examples_en: entry.examples_en } : {}
		};
	}
	readConnectorMcpConfig(configId) {
		const mcpPath = (0, path.join)(this.baseDir, require_workbuddy_auth_product_coordinator.CONNECTORS_DIR, configId, "mcp.json");
		if (!(0, fs.existsSync)(mcpPath)) return null;
		try {
			return JSON.parse((0, fs.readFileSync)(mcpPath, "utf-8"));
		} catch {
			return null;
		}
	}
	buildRuntimeMcpConfig(configId, mcpConfig) {
		const overriddenConfig = this.applyOverrides(configId, mcpConfig);
		const entry = this.getMarketplaceEntryById(configId);
		const enterpriseVariant = this.resolveActiveEnterpriseVariant(entry);
		const providerOauthName = typeof entry?.provider_id === "string" && entry.provider_id.length > 0 ? entry.provider_id : void 0;
		if (!Boolean(enterpriseVariant || this.isEnterpriseManagedOneidConnector(entry))) {
			if (entry && this.resolveActiveAuthMode(entry) === "server-side") {
				const result = { mcpServers: {} };
				for (const [name, config] of Object.entries(overriddenConfig.mcpServers)) result.mcpServers[name] = {
					...config,
					_workbuddyManagedAuth: "server-side"
				};
				return result;
			}
			if (providerOauthName) {
				const result = { mcpServers: {} };
				for (const [name, config] of Object.entries(overriddenConfig.mcpServers)) result.mcpServers[name] = {
					...config,
					_workbuddyManagedAuthOauthName: providerOauthName
				};
				return result;
			}
			return overriddenConfig;
		}
		const result = { mcpServers: {} };
		for (const [name, config] of Object.entries(overriddenConfig.mcpServers)) {
			const headers = {
				...config.headers,
				...enterpriseVariant?.extra_headers ?? {}
			};
			const tokenHeaderName = enterpriseVariant?.token_header?.name ?? this.resolveEnterpriseTokenHeaderName(entry);
			if (tokenHeaderName && tokenHeaderName.toLowerCase() !== "authorization") {
				delete headers.Authorization;
				delete headers.authorization;
			}
			const { headers: _headers, ...configWithoutHeaders } = config;
			result.mcpServers[name] = {
				...configWithoutHeaders,
				...enterpriseVariant?.mcp_url_override ? { url: enterpriseVariant.mcp_url_override } : {},
				...Object.keys(headers).length > 0 ? { headers } : {},
				_workbuddyManagedAuth: require_workbuddy_auth_product_coordinator.WORKBUDDY_MANAGED_AUTH_ENTERPRISE
			};
		}
		return result;
	}
	resolveActiveEnterpriseVariant(entry) {
		return require_workbuddy_auth_product_coordinator.resolveActiveEnterpriseVariant(entry, this.getConnectorAccountContext());
	}
	resolveActiveAuthMode(entry) {
		return require_workbuddy_auth_product_coordinator.resolveActiveAuthMode(entry, this.getConnectorAccountContext());
	}
	isServerSideConnector(configId) {
		const rawConfigId = this.normalizeProxyConfigId(configId);
		const entry = this.getMarketplaceEntryById(rawConfigId);
		return Boolean(entry && this.resolveActiveAuthMode(entry) === "server-side");
	}
	resolveTokenHeaders(configId, connectorName, accessToken) {
		const entry = this.getMarketplaceEntryById(configId) ?? this.getMarketplaceEntryByProvider(connectorName);
		const tokenHeader = this.resolveActiveEnterpriseVariant(entry)?.token_header;
		const fallbackHeaderName = this.resolveEnterpriseTokenHeaderName(entry);
		if (!tokenHeader?.name && !fallbackHeaderName) return { Authorization: `Bearer ${accessToken}` };
		const headerName = tokenHeader?.name ?? fallbackHeaderName;
		const value = (tokenHeader?.value_template || "${access_token}").replace(/\$\{access_token\}/g, accessToken);
		return { [headerName]: value };
	}
	resolveEnterpriseTokenHeaderName(entry) {
		return require_workbuddy_auth_product_coordinator.resolveTokenHeaderName(entry, this.getConnectorAccountContext());
	}
	getMarketplaceEntryByProvider(providerId) {
		const manifest = this.readLocalManifest();
		if (!manifest?.connectors) return;
		return manifest.connectors.find((entry) => entry.provider_id === providerId);
	}
	/**
	* 读取 connector 的 Token 对接表单 schema（auth_mode === 'token' 时使用）。
	*
	* 文件位置：`connectors/<source>/token-schema.json`
	*
	* 返回 null 的情况：
	* - 文件不存在（非 token 模式的 connector，或配置未提供）
	* - JSON 解析失败
	* - 缺少 `fields` 数组（schema 无效）
	*/
	readTokenSchema(source) {
		const schemaPath = (0, path.join)(this.baseDir, require_workbuddy_auth_product_coordinator.CONNECTORS_DIR, source, "token-schema.json");
		if (!(0, fs.existsSync)(schemaPath)) return null;
		try {
			const parsed = JSON.parse((0, fs.readFileSync)(schemaPath, "utf-8"));
			if (!parsed || !Array.isArray(parsed.fields) || parsed.fields.length === 0) {
				this.logger.warn(`[ConnectorService] token-schema.json for ${source} is invalid: missing or empty fields`);
				return null;
			}
			return this.localizeTokenSchema(parsed);
		} catch (err) {
			this.logger.warn(`[ConnectorService] Failed to parse token-schema.json for ${source}: ${String(err)}`);
			return null;
		}
	}
	/**
	* 按当前 locale 把 token-schema 的 `_en` 文案合并进展示字段，并剔除 `_en` 键。
	*
	* 英文环境：文案字段优先取对应的 `_en` 值，缺失时回退原字段（中文）。
	* 中文环境：直接用原字段。
	*
	* 返回的 schema 中文案字段始终是普通字符串 —— UI 层无需感知 i18n，也保证老版本
	* 客户端拿到带 `_en` 的配置时只读原字段、不会因对象类型渲染崩溃。
	*/
	localizeTokenSchema(schema) {
		const isEnglish = this.isEnglishLocale();
		const pick = (base, en) => isEnglish ? en ?? base : base;
		return {
			...schema,
			title: pick(schema.title, schema.title_en),
			title_en: void 0,
			description: pick(schema.description, schema.description_en),
			description_en: void 0,
			docLabel: pick(schema.docLabel, schema.docLabel_en),
			docLabel_en: void 0,
			fields: schema.fields.map((field) => ({
				...field,
				label: pick(field.label, field.label_en) ?? field.label,
				label_en: void 0,
				placeholder: pick(field.placeholder, field.placeholder_en),
				placeholder_en: void 0,
				description: pick(field.description, field.description_en),
				description_en: void 0
			}))
		};
	}
	readSkillConfigs(source) {
		const results = [];
		for (const dirName of ["skills", "skill"]) {
			const skillsDir = (0, path.join)(this.baseDir, require_workbuddy_auth_product_coordinator.CONNECTORS_DIR, source, dirName);
			if (!(0, fs.existsSync)(skillsDir)) continue;
			try {
				const entries = (0, fs.readdirSync)(skillsDir);
				for (const entry of entries) if ((0, fs.statSync)((0, path.join)(skillsDir, entry)).isFile() && entry.endsWith(".md")) results.push({
					name: entry.replace(".md", ""),
					description: "",
					contentPath: `${dirName}/${entry}`
				});
			} catch {}
		}
		return results;
	}
	findConnectorIcon(source) {
		const iconsDir = (0, path.join)(this.baseDir, "icons");
		for (const ext of [".svg", ".png"]) {
			const iconPath = (0, path.join)(iconsDir, `${source}${ext}`);
			if ((0, fs.existsSync)(iconPath)) try {
				const data = (0, fs.readFileSync)(iconPath);
				return `data:${ext === ".svg" ? "image/svg+xml" : "image/png"};base64,${data.toString("base64")}`;
			} catch {
				return;
			}
		}
	}
	/**
	* 应用用户的 header/env 覆盖到 MCP 配置
	*/
	applyOverrides(configId, mcpConfig) {
		const headerOverrides = this.persistentState.headerOverrides[configId];
		const envOverrides = this.persistentState.envOverrides[configId];
		if (!headerOverrides && !envOverrides) return mcpConfig;
		const expandForUrl = (s) => s.replace(/\$\{([A-Z_][A-Z0-9_]*)\}/g, (_, key) => {
			const val = envOverrides?.[key];
			return val !== void 0 ? encodeURIComponent(val) : "";
		});
		const expandForValue = (s) => s.replace(/\$\{([A-Z_][A-Z0-9_]*)\}/g, (_, key) => envOverrides?.[key] ?? "");
		const expandRecord = (record) => Object.fromEntries(Object.entries(record).map(([k, v]) => [k, typeof v === "string" ? expandForValue(v) : v]));
		const result = { mcpServers: {} };
		for (const [name, config] of Object.entries(mcpConfig.mcpServers)) {
			const mergedHeaders = {
				...config.headers,
				...headerOverrides
			};
			const mergedEnv = {
				...config.env,
				...envOverrides
			};
			result.mcpServers[name] = {
				...config,
				headers: expandRecord(mergedHeaders),
				env: expandRecord(mergedEnv),
				...config.url ? { url: expandForUrl(config.url) } : {}
			};
		}
		return result;
	}
	invalidateConnectorCredentials(configId) {
		const mcpConfig = this.readConnectorMcpConfig(configId);
		if (!mcpConfig) return;
		const mergedConfig = this.buildRuntimeMcpConfig(configId, mcpConfig);
		const firstServerConfig = Object.values(mergedConfig.mcpServers)[0];
		const serverUrl = firstServerConfig?.url;
		if (!serverUrl) return;
		this.mcpProxy.invalidateCredentials(configId, serverUrl, "all", firstServerConfig.headers);
	}
	updateState(configId, status, error) {
		this.states.set(configId, {
			configId,
			status,
			error
		});
		if (status !== "unauthorized") this.unauthorizedNotifyThrottle.delete(configId);
		if (status === "connected") {
			this.clearExternallyManagedStaleTokenGuard(configId);
			if (!this.persistentState.everConnected) this.persistentState.everConnected = [];
			if (!this.persistentState.everConnected.includes(configId)) {
				this.persistentState.everConnected.push(configId);
				this.savePersistentState();
			}
		}
	}
	normalizeProxyConfigId(configId) {
		return configId.startsWith("connector:") ? configId.slice(require_workbuddy_auth_product_coordinator.CONNECTOR_PREFIX.length) : configId;
	}
	readLocalManifest() {
		const manifestPath = (0, path.join)(this.baseDir, require_workbuddy_auth_product_coordinator.MANIFEST_REL_PATH);
		if (!(0, fs.existsSync)(manifestPath)) return null;
		try {
			const manifest = JSON.parse((0, fs.readFileSync)(manifestPath, "utf-8"));
			return this.applyTemporaryEnterpriseMarketplaceMock(manifest);
		} catch {
			return null;
		}
	}
	/**
	* 实现已迁移至 `./enterprise-variant::applyEnterpriseVariantConfig`。
	* 此处保留薄包装，仅用于兼容历史单测通过 `service['applyTemporaryEnterpriseMarketplaceMock']`
	* 直接调用私有方法的访问方式（见 connector-service.test.ts）。
	*/
	applyTemporaryEnterpriseMarketplaceMock(manifest) {
		return require_workbuddy_auth_product_coordinator.applyEnterpriseVariantConfig(manifest, { endpoint: this.productManager?.getEndpoint?.() });
	}
	isLoaded() {
		return (0, fs.existsSync)((0, path.join)(this.baseDir, require_workbuddy_auth_product_coordinator.MANIFEST_REL_PATH));
	}
	normalizeLoadedConnectorUserDisabledState(state) {
		if (!state) return {};
		if (!Array.isArray(state)) return { ...state };
		return state.reduce((result, id) => {
			result[id] = true;
			return result;
		}, {});
	}
	loadPersistentState() {
		const dirPath = (0, path.join)(this.configDir, "connectors", this.getUserId());
		try {
			const parsed = readStates({
				userId: this.getUserId(),
				paths: resolveStatesFilePaths(dirPath)
			});
			if (!parsed) return;
			this.persistentState = {
				enabled: parsed.enabled ?? [],
				headerOverrides: parsed.headerOverrides ?? {},
				envOverrides: parsed.envOverrides ?? {},
				headerOverridesBearerStripped: parsed.headerOverridesBearerStripped,
				staleManagedAuthHeadersPurged: parsed.staleManagedAuthHeadersPurged,
				accountIdentityKey: parsed.accountIdentityKey,
				everConnected: parsed.everConnected,
				userDisabled: this.normalizeLoadedConnectorUserDisabledState(parsed.userDisabled),
				disabledToolsOverrides: parsed.disabledToolsOverrides ?? {},
				mcpSecurityMigrated: parsed.mcpSecurityMigrated,
				cSideAutoBoundDefaultDisabledMigrated: parsed.cSideAutoBoundDefaultDisabledMigrated
			};
			let dirty = false;
			for (const configId of Object.keys(this.persistentState.headerOverrides)) {
				const hdrs = this.persistentState.headerOverrides[configId];
				for (const key of Object.keys(hdrs)) if (hdrs[key] === "") {
					delete hdrs[key];
					dirty = true;
				}
				if (Object.keys(hdrs).length === 0) delete this.persistentState.headerOverrides[configId];
			}
			if (this.stripBearerPrefixFromExternallyManagedHeaderOverrides()) dirty = true;
			if (this.purgeStaleManagedAuthHeaderOverrides()) dirty = true;
			if (dirty) this.savePersistentState();
		} catch {
			this.persistentState = {
				enabled: [],
				headerOverrides: {},
				envOverrides: {},
				userDisabled: {},
				disabledToolsOverrides: {}
			};
		}
	}
	stripBearerPrefixFromExternallyManagedHeaderOverrides() {
		if (this.persistentState.headerOverridesBearerStripped === true) return false;
		let strippedCount = 0;
		let pendingConfigCount = 0;
		for (const [configId, headers] of Object.entries(this.persistentState.headerOverrides)) {
			const authorization = headers.Authorization ?? headers.authorization;
			if (typeof authorization !== "string" || !authorization.startsWith("Bearer ")) continue;
			const serverConfig = this.getLatestServerConfigForConnector(configId);
			if (!serverConfig?.url) {
				pendingConfigCount += 1;
				continue;
			}
			try {
				const host = new URL(serverConfig.url).host;
				if (!require_workbuddy_auth_product_coordinator.EXTERNALLY_MANAGED_HOSTS.has(host)) continue;
			} catch {
				continue;
			}
			if (headers.Authorization === authorization) headers.Authorization = authorization.slice(7);
			else headers.authorization = authorization.slice(7);
			strippedCount += 1;
		}
		if (pendingConfigCount > 0) return strippedCount > 0;
		this.persistentState.headerOverridesBearerStripped = true;
		if (strippedCount > 0) this.logger.info(`[ConnectorService] stripped Bearer prefix from ${strippedCount} externally-managed header override(s)`);
		return true;
	}
	/**
	* 清理 headerOverrides 中残留的、与当前 entry token-header 决议不一致的认证 header。
	*
	* 背景：headerOverrides[configId] 在 OAuth 刷新后会被写入 Authorization / X-Oneid-Access-Token 等
	* 认证 header；当端侧后续版本调整了 connector 的 enterprise variant 归属 / auth_mode / token_header
	* 名称（典型如本期把腾讯文档 vpc 派生从 'tencent-docs' 迁到 'tencent-docs-oa'），上一版写入的认证
	* header 不会被任何代码主动清理，applyOverrides 仍会把它们合并进 mcp.json，导致：
	*   - 老 connector 的 marketplace url 被错误注入上一版本写过的 OneID header（401 / 行为异常）
	*   - 账号切换 / 企业身份变更后旧账号的 token 仍被写入 header
	*
	* 本方法在启动时一次性运行：对每个 configId，按当前账号上下文解析"应该"使用的 token_header name，
	* 仅保留这一项（或当前活动名为 Authorization 时同时保留大小写变体），其它历史认证 header 全部删除。
	* 用 staleManagedAuthHeadersPurged boolean 防止重复执行。
	*
	* 安全性：OAuth token 是账号 + connector 维度的；当前账号下若该 connector 仍有效，下一次 refresh
	* 会自动重新写入正确的 header，因此误清不会造成认证资料丢失，最多多走一次 OAuth refresh。
	*/
	purgeStaleManagedAuthHeaderOverrides() {
		if (this.persistentState.staleManagedAuthHeadersPurged === true) return false;
		const MANAGED_AUTH_HEADER_KEYS = ["authorization", "x-oneid-access-token"];
		const ctx = this.getConnectorAccountContext();
		let purgedCount = 0;
		for (const configId of Object.keys(this.persistentState.headerOverrides)) {
			const headers = this.persistentState.headerOverrides[configId];
			const entry = this.getMarketplaceEntryById(configId);
			const activeKeyLower = require_workbuddy_auth_product_coordinator.resolveTokenHeaderName(entry, ctx)?.toLowerCase();
			const fallbackKeepKey = entry ? activeKeyLower : "authorization";
			for (const key of Object.keys(headers)) {
				const keyLower = key.toLowerCase();
				if (!MANAGED_AUTH_HEADER_KEYS.includes(keyLower)) continue;
				if (fallbackKeepKey && keyLower === fallbackKeepKey) continue;
				delete headers[key];
				purgedCount += 1;
			}
			if (Object.keys(headers).length === 0) delete this.persistentState.headerOverrides[configId];
		}
		this.persistentState.staleManagedAuthHeadersPurged = true;
		if (purgedCount > 0) this.logger.info(`[ConnectorService] purged ${purgedCount} stale managed auth header override(s) (resolved against current account context)`);
		return true;
	}
	savePersistentState() {
		this.persistentState.accountIdentityKey = this.getCurrentAccountIdentityKey();
		const dirPath = (0, path.join)(this.configDir, "connectors", this.getUserId());
		writeStates({
			userId: this.getUserId(),
			paths: resolveStatesFilePaths(dirPath)
		}, this.persistentState);
	}
	/**
	* 监听配置文件变更，触发连接对账
	*
	* 监听两个文件：
	* 1. connectors/mcp.json — connector 配置变更（由 writeConnectorsMcpConfig 写入）
	* 2. mcp.json — 用户添加/移除/禁用自定义 MCP server
	*
	* 注意：不监听 .credentials.json，因为 token 写入由本进程的 OAuthClientProvider
	* 完成，监听自身写入会导致 saveTokens → watcher → refreshAndSync → 重连 → saveTokens 循环。
	*
	* 使用 3 秒防抖，避免频繁写入时反复触发。
	*/
	watchMcpConfig() {
		const filesToWatch = [
			this.connectorMcpConfigPath,
			this.customMcpConfigPath,
			(0, path.join)(this.configDir, "settings.json")
		];
		for (const filePath of filesToWatch) try {
			if (!(0, fs.existsSync)(filePath)) continue;
			const watcher = (0, fs.watch)(filePath, () => {
				this.onConfigFileChanged(filePath);
			});
			if (!this.mcpConfigWatcher) this.mcpConfigWatcher = watcher;
		} catch (err) {
			this.logger.warn(`[ConnectorService] Failed to watch ${filePath}: ${err}`);
		}
		if (this.mcpConfigWatcher) this.logger.info("[ConnectorService] Watching config files for changes");
	}
	/**
	* 配置文件变更处理（3 秒防抖）
	*/
	onConfigFileChanged(filePath) {
		if (filePath === this.connectorMcpConfigPath && Date.now() - this.lastSelfWriteConnectorMcpAt < 5e3) return;
		if (filePath === this.customMcpConfigPath && Date.now() - this.lastSelfWriteCustomMcpAt < 5e3) return;
		this.mcpJsonCache.invalidate(filePath);
		this.pluginMcpConfigsCache.invalidate();
		if (this.mcpConfigDebounceTimer) clearTimeout(this.mcpConfigDebounceTimer);
		this.mcpConfigDebounceTimer = setTimeout(() => {
			this.mcpConfigDebounceTimer = null;
			const fileName = filePath.split("/").pop() || filePath;
			this.logger.info(`[ConnectorService] Config file changed: ${fileName}, triggering refreshAndSync`);
			this.refreshAndSync().catch((err) => {
				this.logger.warn(`[ConnectorService] refreshAndSync after ${fileName} change failed:`, err);
			});
		}, 3e3);
	}
	startUpdateTimer() {
		if (this.updateTimer) return;
		this.updateTimer = setInterval(() => {
			this.tryUpdate().catch((error) => {
				this.logger.warn("[ConnectorService] Scheduled update failed:", error);
			});
		}, require_workbuddy_auth_product_coordinator.UPDATE_INTERVAL_MS);
	}
	/**
	* 检查 marketplace 是否有更新
	*
	* 判定顺序（越靠前越可靠，越省流量）：
	*   1. HTTP HEAD → 取 ETag / Last-Modified，与本地保存的指纹比对；命中则跳过
	*   2. HEAD 不可用或指纹不同 → 下载完整 zip，对 zip 字节算 sha256 兜底比对
	*
	* 这样任何内容变化（包括 connector 数量不变但 mcp.json 内容变化的情况）
	* 都能被检测到。manifest 的 version/lastUpdated 字段不再作为判据，
	* 避免发布侧忘记 bump 这两个字段导致客户端误判"无更新"。
	*/
	async tryUpdate() {
		try {
			const { url, marketplaceName } = this.getDefaultConnectorMarketplace();
			const localMeta = this.readMarketplaceMeta();
			const remoteEtag = await this.fetchRemoteEtag(url);
			if (remoteEtag && localMeta?.etag && remoteEtag === localMeta.etag) return;
			const tempDir = (0, path.join)((0, os.tmpdir)(), `connectors-marketplace-update-${process.pid}-${Date.now()}`);
			try {
				const { fingerprint } = await this.downloadAndExtractToDir(url, tempDir);
				if (localMeta?.sha256 && fingerprint.sha256 === localMeta.sha256) {
					if (remoteEtag && remoteEtag !== localMeta.etag) this.saveMarketplaceMeta({
						etag: remoteEtag,
						sha256: fingerprint.sha256
					});
					return;
				}
				this.logger.info("[ConnectorService] Marketplace has updates, syncing...");
				await this.replaceMarketplaceDir(tempDir, marketplaceName, fingerprint);
				this.writeConnectorsMcpConfig();
				this.scheduleEnterpriseConnectorRefreshes().catch((err) => {
					this.logger.warn("[ConnectorService] scheduleEnterpriseConnectorRefreshes after marketplace update failed:", err);
				});
			} finally {
				if ((0, fs.existsSync)(tempDir)) (0, fs.rmSync)(tempDir, {
					recursive: true,
					force: true
				});
			}
		} catch (error) {
			this.logger.warn("[ConnectorService] Update check failed:", error);
		}
	}
	get marketplaceMetaPath() {
		return (0, path.join)(this.configDir, require_workbuddy_auth_product_coordinator.MARKETPLACE_META_FILE);
	}
	readMarketplaceMeta() {
		const path$5 = this.marketplaceMetaPath;
		if (!(0, fs.existsSync)(path$5)) return null;
		try {
			const parsed = JSON.parse((0, fs.readFileSync)(path$5, "utf-8"));
			if (typeof parsed.sha256 !== "string" || !parsed.sha256) return null;
			return {
				etag: parsed.etag ?? null,
				sha256: parsed.sha256
			};
		} catch {
			return null;
		}
	}
	saveMarketplaceMeta(fingerprint) {
		try {
			(0, fs.mkdirSync)(this.configDir, { recursive: true });
			(0, fs.writeFileSync)(this.marketplaceMetaPath, JSON.stringify(fingerprint, null, 2), "utf-8");
		} catch (error) {
			this.logger.warn("[ConnectorService] Failed to persist marketplace meta:", error);
		}
	}
	/**
	* 下载完整响应体，并把响应头里的 ETag 一起返回。
	*
	* 用于 marketplace 更新检测：下载后对 buffer 算 sha256 作为兜底指纹。
	*/
	downloadBufferWithHeaders(url, redirects = 0) {
		return new Promise((resolve, reject) => {
			const request = url.startsWith("https") ? https.get : http.get;
			const agent = require_net_log.getNodeAgentForUrl(url);
			const requestOptions = agent ? { agent } : {};
			const proxyDesc = require_net_log.describeProxyForLog(url);
			const startedAt = Date.now();
			request(url, requestOptions, (response) => {
				if (response.statusCode && response.statusCode >= 300 && response.statusCode < 400 && response.headers.location && redirects < 5) {
					this.downloadBufferWithHeaders(response.headers.location, redirects + 1).then(resolve, reject);
					return;
				}
				if (response.statusCode !== 200) {
					require_net_log.logNetRequest({
						method: "GET",
						url,
						proxy: proxyDesc,
						status: response.statusCode,
						durationMs: Date.now() - startedAt,
						error: /* @__PURE__ */ new Error(`HTTP ${response.statusCode}`),
						source: "ConnectorService"
					});
					reject(/* @__PURE__ */ new Error(`Download failed with status ${response.statusCode}`));
					return;
				}
				const etag = normalizeEtag(response.headers["etag"]);
				const chunks = [];
				response.on("data", (chunk) => chunks.push(chunk));
				response.on("end", () => {
					require_net_log.logNetRequest({
						method: "GET",
						url,
						proxy: proxyDesc,
						status: response.statusCode,
						durationMs: Date.now() - startedAt,
						source: "ConnectorService"
					});
					resolve({
						buffer: Buffer.concat(chunks),
						etag
					});
				});
				response.on("error", reject);
			}).on("error", (err) => {
				require_net_log.logNetRequest({
					method: "GET",
					url,
					proxy: proxyDesc,
					durationMs: Date.now() - startedAt,
					error: err,
					source: "ConnectorService"
				});
				reject(err);
			});
		});
	}
	/**
	* 发 HTTP HEAD 请求，取 ETag 用于 marketplace 更新预检。
	*
	* 失败 / 服务端不返 ETag / 不支持 HEAD 时返回 null，上层会退化到 sha256 兜底。
	* 为了不拖慢启动，设置 5 秒超时，超时也当作"无 ETag"处理。
	*/
	fetchRemoteEtag(url, redirects = 0) {
		return new Promise((resolve) => {
			try {
				const lib = url.startsWith("https") ? https : http;
				const parsed = new URL(url);
				const agent = require_net_log.getNodeAgentForUrl(url);
				const req = lib.request({
					method: "HEAD",
					protocol: parsed.protocol,
					hostname: parsed.hostname,
					port: parsed.port || void 0,
					path: parsed.pathname + parsed.search,
					headers: { "User-Agent": "WorkBuddy-ConnectorService" },
					...agent ? { agent } : {}
				}, (response) => {
					if (response.statusCode && response.statusCode >= 300 && response.statusCode < 400 && response.headers.location && redirects < 5) {
						response.resume();
						this.fetchRemoteEtag(response.headers.location, redirects + 1).then(resolve, () => resolve(null));
						return;
					}
					if (!response.statusCode || response.statusCode < 200 || response.statusCode >= 300) {
						response.resume();
						resolve(null);
						return;
					}
					response.resume();
					resolve(normalizeEtag(response.headers["etag"]));
				});
				req.setTimeout(5e3, () => {
					req.destroy();
					resolve(null);
				});
				req.on("error", () => resolve(null));
				req.end();
			} catch {
				resolve(null);
			}
		});
	}
	acquireLock() {
		const lockDir = this.configDir;
		const lockFile = (0, path.join)(lockDir, require_workbuddy_auth_product_coordinator.LOCK_FILE_NAME);
		try {
			(0, fs.mkdirSync)(lockDir, { recursive: true });
			if ((0, fs.existsSync)(lockFile) && this.isLockHeldByOther(lockFile)) return false;
			(0, fs.writeFileSync)(lockFile, JSON.stringify({
				pid: process.pid,
				timestamp: Date.now()
			}), "utf-8");
			return JSON.parse((0, fs.readFileSync)(lockFile, "utf-8")).pid === process.pid;
		} catch (error) {
			this.logger.warn("[ConnectorService] acquireLock failed:", String(error));
			return false;
		}
	}
	/**
	* 仅当能证明"锁被另一个存活进程持有且未超时"时返回 true（即不可抢占）。
	* 其余一律返回 false（可抢占），并在锁文件损坏时顺手删除它。
	*
	* 三条原本会永久死锁的路径在此被各自堵住：
	*   ① 锁文件损坏/非法 JSON  → 删除损坏文件并抢占（issue #58347 主因）
	*   ② 时钟偏移/未来时间戳    → 用 Math.abs 钳制 age，超 stale 即抢占
	*   ③ 同进程重入            → 同 pid 直接放行（PID 复用 / 同应用多组件场景）
	*/
	isLockHeldByOther(lockFile) {
		let lockInfo;
		try {
			lockInfo = JSON.parse((0, fs.readFileSync)(lockFile, "utf-8"));
		} catch {
			try {
				(0, fs.rmSync)(lockFile, { force: true });
			} catch {}
			return false;
		}
		if (Math.abs(Date.now() - lockInfo.timestamp) >= 3e5) return false;
		if (lockInfo.pid === process.pid) return false;
		try {
			process.kill(lockInfo.pid, 0);
			return true;
		} catch {
			return false;
		}
	}
	releaseLock() {
		const lockFile = (0, path.join)(this.configDir, require_workbuddy_auth_product_coordinator.LOCK_FILE_NAME);
		try {
			if (!(0, fs.existsSync)(lockFile)) return;
			let info = null;
			try {
				info = JSON.parse((0, fs.readFileSync)(lockFile, "utf-8"));
			} catch {
				info = null;
			}
			if (info === null || info.pid === process.pid) (0, fs.rmSync)(lockFile, { force: true });
		} catch {}
	}
	copyDirectory(src, dest) {
		(0, fs.mkdirSync)(dest, { recursive: true });
		const entries = (0, fs.readdirSync)(src);
		for (const entry of entries) {
			const srcPath = (0, path.join)(src, entry);
			const destPath = (0, path.join)(dest, entry);
			if ((0, fs.statSync)(srcPath).isDirectory()) this.copyDirectory(srcPath, destPath);
			else (0, fs.copyFileSync)(srcPath, destPath);
		}
	}
	isCliConnector(config) {
		return config.type === "cli";
	}
	/**
	/**
	* 启动时自动连接所有 CLI 类型 connector。
	*
	* **严格遵守 `persistentState.enabled`**：只尝试重连用户曾主动启用过的
	* CLI connector。否则会覆盖用户的禁用意图 —— 用户上次手动禁用后，只要
	* CLI 本地仍处于"已安装且已登录"状态，就会在重启时被无条件重连，
	* 甚至把 id 加回 `enabled[]`，让禁用状态丢失。与 MCP / skill-only
	* connector 的行为保持一致：`persistentState.enabled` 是真相源。
	*/
	async autoConnectCliConnectors() {
		const manifest = this.readLocalManifest();
		if (!manifest?.connectors) return;
		const cliEntries = manifest.connectors.filter((c) => c.type === "cli");
		if (cliEntries.length === 0) return;
		for (const entry of cliEntries) {
			const config = this.buildConnectorConfig(entry);
			if (!config || !config.cliConfig) continue;
			if (!this.persistentState.enabled.includes(config.id)) {
				this.logger.info(`[ConnectorService] CLI auto-connect skipped for ${config.id}: not in enabled list`);
				continue;
			}
			await this.tryAutoConnectCli(config.id, config);
		}
	}
	/**
	* 根据 configId 获取 connector 配置信息
	* 从 marketplace manifest 中查找并构建
	*/
	getConnectorConfigById(configId) {
		const manifest = this.readLocalManifest();
		if (!manifest?.connectors) return null;
		const entry = manifest.connectors.find((c) => (c.source || c.name) === configId);
		if (!entry) return null;
		return this.buildConnectorConfig(entry);
	}
	/**
	* 构造 CLI 进程启动失败（非"版本过旧"）的用户可见错误文案（issue #67596）。
	*
	* 与误导性的 "version too low, please upgrade manually" 不同：启动失败并非版本问题，
	* auto-upgrade 无法解决。文案只陈述「启动失败 + 原始退出码」：退出码语言无关，客服凭码
	* 即可定位；不做归因、不给指令，避免让用户觉得被责怪。详细原因只进日志。退出码展示按
	* 平台习惯切进制（Windows 大码用 hex 如 `0xC0000135`，Unix 小码用十进制如 `127`）。
	* exitCode 缺失（理论上不会发生）时退化为通用文案。
	*/
	buildCliStartupFailedError(config, result) {
		const name = config.name;
		const codeHint = result.exitCode !== void 0 ? ` (exit ${formatExitCodeForDisplay(result.exitCode)})` : "";
		if (this.isEnglishLocale()) return `${name} CLI failed to start${codeHint}.`;
		return `${name} CLI 启动失败${codeHint}。`;
	}
	async connectCli(configId, config) {
		const pending = this.pendingCliConnects.get(configId);
		if (pending) {
			this.logger.info(`[ConnectorService] CLI Connect ${configId}: already in progress, awaiting existing flow`);
			return pending;
		}
		const promise = this.doConnectCli(configId, config);
		this.pendingCliConnects.set(configId, promise);
		try {
			return await promise;
		} finally {
			this.pendingCliConnects.delete(configId);
		}
	}
	async doConnectCli(configId, config) {
		const cliConfig = config.cliConfig;
		if (!cliConfig || !this.cliExecutor) return {
			success: false,
			error: `CLI config or executor not available for connector: ${configId}`
		};
		const abortController = new AbortController();
		this.pendingCliAborts.set(configId, abortController);
		const signal = abortController.signal;
		const cancelledResult = () => {
			this.logger.info(`[ConnectorService] CLI ${configId}: cancelled by user`);
			this.updateState(configId, "disconnected");
			return {
				success: false,
				error: "Cancelled by user",
				cancelled: true
			};
		};
		try {
			this.logger.info(`[ConnectorService] CLI Connect ${configId}: Phase 1 - Check CLI installation`);
			this.updateState(configId, "connecting");
			const isInstalled = await this.cliExecutor.isCliInstalled(cliConfig);
			if (signal.aborted) return cancelledResult();
			if (!isInstalled) {
				this.logger.info(`[ConnectorService] CLI ${configId}: not installed, running init...`);
				const installResult = await this.cliExecutor.runInstall(cliConfig);
				if (signal.aborted) return cancelledResult();
				if (!installResult.success) {
					const error = `CLI install failed: ${installResult.stderr}`;
					this.updateState(configId, "error", error);
					return {
						success: false,
						error
					};
				}
				this.logger.info(`[ConnectorService] CLI ${configId}: install completed`);
			}
			if (cliConfig.versionCheck) {
				const versionResult = await this.cliExecutor.checkVersion(cliConfig);
				if (signal.aborted) return cancelledResult();
				if (versionResult.startupFailed) {
					const error = this.buildCliStartupFailedError(config, versionResult);
					this.logger.warn(`[ConnectorService] CLI ${configId}: startup failed, exitCode=${formatExitCodeHex(versionResult.exitCode ?? 0)} (${versionResult.exitCode})`);
					this.updateState(configId, "error", error);
					return {
						success: false,
						error
					};
				}
				if (versionResult.needsUpgrade) {
					this.logger.info(`[ConnectorService] CLI ${configId}: version ${versionResult.currentVersion || "unknown"} < ${cliConfig.versionCheck.minVersion}, upgrading...`);
					const upgradeResult = await this.cliExecutor.runInstall(cliConfig);
					if (signal.aborted) return cancelledResult();
					if (!upgradeResult.success) {
						const error = `CLI upgrade failed: ${upgradeResult.stderr}`;
						this.updateState(configId, "error", error);
						return {
							success: false,
							error
						};
					}
					const recheck = await this.cliExecutor.checkVersion(cliConfig);
					if (signal.aborted) return cancelledResult();
					if (recheck.startupFailed) {
						const error = this.buildCliStartupFailedError(config, recheck);
						this.logger.warn(`[ConnectorService] CLI ${configId}: startup failed after upgrade, exitCode=${formatExitCodeHex(recheck.exitCode ?? 0)} (${recheck.exitCode})`);
						this.updateState(configId, "error", error);
						return {
							success: false,
							error
						};
					}
					if (recheck.needsUpgrade) {
						const error = `CLI version too low (${recheck.currentVersion || "unknown"} < ${cliConfig.versionCheck.minVersion}). Please upgrade manually.`;
						this.updateState(configId, "error", error);
						return {
							success: false,
							error
						};
					}
					this.logger.info(`[ConnectorService] CLI ${configId}: upgrade completed`);
				}
			}
			this.logger.info(`[ConnectorService] CLI Connect ${configId}: Phase 2 - Check status`);
			const statusResult = await this.cliExecutor.runStatus(cliConfig);
			if (signal.aborted) return cancelledResult();
			if (statusResult.success) {
				this.logger.info(`[ConnectorService] CLI ${configId}: already authenticated`);
				return this.finalizeCliConnect(configId, config);
			}
			this.logger.info(`[ConnectorService] CLI Connect ${configId}: Phase 3 - Running auth`);
			if (!cliConfig.auth) {
				const error = `No auth command configured for CLI connector: ${configId}`;
				this.updateState(configId, "error", error);
				return {
					success: false,
					error
				};
			}
			const authResult = await this.cliExecutor.runAuth(cliConfig, {
				onQrUrl: cliConfig.authQrModal ? (url) => {
					this.logger.info(`[ConnectorService] CLI ${configId}: pushing QR URL to renderer: ${url}`);
					this.authQrUrlPusher?.({
						configId,
						url
					});
				} : void 0,
				onDeviceCode: cliConfig.authDeviceFlow ? (info) => {
					this.logger.info(`[ConnectorService] CLI ${configId}: pushing device code to renderer: uri=${info.verificationUri} hasCode=${!!info.userCode}`);
					this.deviceCodePusher?.({
						configId,
						...info
					});
				} : void 0,
				suppressBrowser: !cliConfig.authQrModal && cliConfig.authSuppressBrowser === true
			}, signal);
			if (authResult.cancelled || signal.aborted) return cancelledResult();
			if (authResult.authUrl) this.logger.info(`[ConnectorService] CLI ${configId}: auth URL opened, waiting for browser auth...`);
			else if (!authResult.success) {
				const error = `CLI auth failed: ${authResult.stderr}`;
				this.updateState(configId, "error", error);
				return {
					success: false,
					error
				};
			}
			if (cliConfig.authDeviceFlow) {
				if (authResult.success) {
					this.logger.info(`[ConnectorService] CLI ${configId}: device flow auth completed`);
					return this.finalizeCliConnect(configId, config);
				}
				const error = `CLI device flow auth failed: ${authResult.stderr || "cancelled or expired"}`;
				this.updateState(configId, "error", error);
				return {
					success: false,
					error
				};
			}
			this.logger.info(`[ConnectorService] CLI Connect ${configId}: Phase 4 - Polling for auth completion`);
			const authCompleted = await this.cliExecutor.pollAuthCompletion(cliConfig, 300 * 1e3, 3e3, signal);
			if (signal.aborted) return cancelledResult();
			if (authCompleted) {
				this.logger.info(`[ConnectorService] CLI ${configId}: auth completed successfully`);
				return this.finalizeCliConnect(configId, config);
			} else {
				this.logger.warn(`[ConnectorService] CLI ${configId}: auth timed out`);
				this.updateState(configId, "error", "CLI authentication timed out (5 minutes)");
				return {
					success: false,
					error: "CLI authentication timed out (5 minutes)"
				};
			}
		} catch (error) {
			if (signal.aborted) return cancelledResult();
			const message = error instanceof Error ? error.message : String(error);
			this.logger.error(`[ConnectorService] CLI Connect failed for ${configId}:`, error);
			this.updateState(configId, "error", message);
			return {
				success: false,
				error: message
			};
		} finally {
			this.pendingCliAborts.delete(configId);
		}
	}
	finalizeCliConnect(configId, config) {
		this.installSkills(configId);
		if (!this.persistentState.enabled.includes(configId)) this.persistentState.enabled.push(configId);
		this.markConnectorUserEnabled(configId);
		this.savePersistentState();
		this.updateState(configId, "connected");
		this.logger.info(`[ConnectorService] CLI Connected: ${configId}`);
		return { success: true };
	}
	disconnectCli(configId) {
		try {
			this.updateState(configId, "disconnected");
			this.persistentState.enabled = this.persistentState.enabled.filter((id) => id !== configId);
			this.savePersistentState();
			this.disableSkills(configId);
			this.logger.info(`[ConnectorService] CLI Disconnected: ${configId}`);
			return { success: true };
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			this.logger.error(`[ConnectorService] CLI Disconnect failed for ${configId}:`, error);
			return {
				success: false,
				error: message
			};
		}
	}
	/**
	* 把端侧 connector configId 解析为云端 OAuth 接口使用的 :name。
	*
	* 解析顺序：marketplace entry 的 `provider_id` → `source` → `name`，
	* 全部缺失或找不到 entry 时回退到 `configId`，保证调用链不抛异常。
	*/
	resolveOauthName(configId) {
		const rawConfigId = this.normalizeProxyConfigId(configId);
		let oauthName;
		switch (rawConfigId) {
			case "ima-mcp":
				oauthName = require_workbuddy_auth_product_coordinator.getImaConnectorNameFromProduct({ applicationName: process.env.WORKBUDDY_APPLICATION_NAME?.trim() });
				break;
			case "tencent-docs-oa":
				oauthName = "tdocs-app";
				break;
			default: {
				const ioaOauthName = this.resolveIoaOauthNameByConfigId(rawConfigId);
				if (ioaOauthName) oauthName = ioaOauthName;
				else {
					const entry = this.getMarketplaceEntryById(rawConfigId);
					if (!entry) oauthName = rawConfigId;
					else if (entry.source === "ima-mcp") oauthName = require_workbuddy_auth_product_coordinator.getImaConnectorNameFromProduct({ applicationName: process.env.WORKBUDDY_APPLICATION_NAME?.trim() });
					else oauthName = entry.provider_id || entry.source || entry.name || rawConfigId;
				}
			}
		}
		this.logger.info(`[ConnectorService] resolveOauthName(${configId}): rawConfigId=${rawConfigId}, oauthName=${oauthName}`);
		return oauthName;
	}
	isSkillOnlyConnector(config) {
		return config.type === "skill-only";
	}
	/**
	* 对 `auth_mode === 'gateway'` 的 connector，把当前用户身份 header 注入到
	* `persistentState.headerOverrides[configId]`。
	*
	* 第三方 access_token 由 agent-gateway 从 Redis 读取并在转发时注入，
	* 端侧只负责带上识别用户身份所需的 header（Authorization Bearer + X-User-Id
	* + X-Enterprise-Id + X-Tenant-Id + X-Domain）。身份 header 由
	* `authService.buildAuthHeaders()` 统一构造，和 REST facade（`buildTdocGatewayHeaders`）
	* 走同一条标准路径，避免 IOA 企业用户漏传 X-Enterprise-Id 导致 401。
	*
	* 未登录时 `buildAuthHeaders()` 返回空对象；产品层保证未登录不会进入 connect 流程，
	* 这里仅做静默跳过，不额外守卫。
	*/
	maybeApplyGatewayIdentityHeaders(configId) {
		const entry = this.getMarketplaceEntryById(configId);
		if (!entry || this.resolveActiveAuthMode(entry) !== "gateway") return;
		const identityHeaders = this.authService.buildAuthHeaders();
		if (!identityHeaders.Authorization || !identityHeaders["X-User-Id"]) {
			this.logger.warn(`[ConnectorService] gateway connector ${configId} missing identity headers (Authorization=${!!identityHeaders.Authorization}, X-User-Id=${!!identityHeaders["X-User-Id"]}); aborting header injection`);
			return;
		}
		this.persistentState.headerOverrides[configId] = {
			...this.persistentState.headerOverrides[configId],
			...identityHeaders
		};
		this.savePersistentState();
		this.logger.info(`[ConnectorService] gateway connector ${configId}: injected identity headers (keys=${Object.keys(identityHeaders).join(",")})`);
	}
	/**
	* 构建内置 Agent Mail MCP Server 配置。
	*
	* Agent Mail 是 gateway 模式的内置 MCP Server：
	* - 不在 COS marketplace manifest 中声明（UI 不展示）
	* - 端侧只注入用户身份 header，邮箱授权由后端管理
	* - 后端 gateway 层在 MCP 调用时检查邮箱状态，非 active 返回错误码
	*
	* 返回 null 表示功能未开启或用户未登录，无法构建有效配置。
	*/
	buildAgentMailMcpConfig() {
		if (!((this.productManager?.getCurrentConfiguration?.()?.productFeatures)?.AgentMail === true)) return null;
		if (this.authService.getAccount()?.enterpriseId) {
			this.logger.info("[ConnectorService] agent-mail MCP: skipping (enterprise user)");
			return null;
		}
		const endpoint = this.productManager.getEndpoint();
		if (!endpoint) return null;
		const identityHeaders = this.authService.buildAuthHeaders();
		if (!identityHeaders.Authorization || !identityHeaders["X-User-Id"]) {
			this.logger.info("[ConnectorService] agent-mail MCP: skipping (user not logged in)");
			return null;
		}
		return {
			url: `${endpoint.replace(/\/+$/, "")}/console/agent-gateway/agentmail/mcp`,
			transport: "streamable-http",
			headers: { ...identityHeaders },
			defer_loading: true
		};
	}
	/**
	* skill-only connector 的连接流程：
	* 1. 同步确认云端有可用 token（拿不到就直接失败，避免错误地标记为已连接）
	* 2. 启动 server-side OAuth refresher（周期刷新 + 更新 MCP headers）
	* 3. 安装 skills 到 ~/.workbuddy/skills/connector-{id}/
	* 4. 加入 persistentState.enabled，状态 'connected'
	*
	* 注意：授权流程本身由 renderer 的 `startServerSideOauthFlow` 负责（包含浏览器跳转）。
	* 这里假定 renderer 已经完成了授权，调用本方法时只需要同步确认 token 可用并推状态。
	*/
	async connectSkillOnly(configId) {
		try {
			this.logger.info(`[ConnectorService] Skill-only Connect ${configId}: starting`);
			this.updateState(configId, "connecting");
			const entry = this.getMarketplaceEntryById(configId);
			if (entry?.auth_mode === "token") {
				const connectorConfig = this.getConnectorConfigById(configId);
				if (connectorConfig?.tokenConfig) {
					const envOverrides = this.persistentState.envOverrides[configId] || {};
					if (connectorConfig.tokenConfig.fields.find((f) => f.required && !(envOverrides[f.key]?.length > 0))) {
						this.updateState(configId, "disconnected");
						return {
							success: false,
							needsTokenConfig: true
						};
					}
				}
				this.installSkills(configId);
				if (!this.persistentState.enabled.includes(configId)) this.persistentState.enabled.push(configId);
				this.markConnectorUserEnabled(configId);
				this.savePersistentState();
				this.updateState(configId, "connected");
				this.logger.info(`[ConnectorService] Skill-only (token) Connected: ${configId}`);
				return { success: true };
			}
			if (entry && this.resolveActiveAuthMode(entry) === "server-side" && this.serverSideOauthRefresher) {
				const connectorName = this.resolveOauthName(configId);
				const tokenResult = await this.serverSideOauthRefresher.tryFetchToken(connectorName);
				if (!tokenResult.ok) {
					const status = tokenResult.needsAuthorize ? "unauthorized" : "error";
					this.logger.warn(`[ConnectorService] Skill-only Connect ${configId}: token precheck failed (${tokenResult.error}), status=${status}`);
					this.updateState(configId, status, tokenResult.error);
					return {
						success: false,
						error: tokenResult.error
					};
				}
			}
			this.maybeScheduleServerSideOauth(configId);
			this.installSkills(configId);
			if (!this.persistentState.enabled.includes(configId)) this.persistentState.enabled.push(configId);
			this.markConnectorUserEnabled(configId);
			this.savePersistentState();
			this.updateState(configId, "connected");
			this.logger.info(`[ConnectorService] Skill-only Connected: ${configId}`);
			return { success: true };
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			this.logger.error(`[ConnectorService] Skill-only Connect failed for ${configId}:`, error);
			this.updateState(configId, "error", message);
			return {
				success: false,
				error: message
			};
		}
	}
	/**
	* skill-only connector 的断开流程：停 refresher + disableSkills。
	*/
	disconnectSkillOnly(configId) {
		try {
			this.updateState(configId, "disconnected");
			this.persistentState.enabled = this.persistentState.enabled.filter((id) => id !== configId);
			this.savePersistentState();
			this.disableSkills(configId);
			this.serverSideOauthRefresher?.stop(configId);
			this.logger.info(`[ConnectorService] Skill-only Disconnected: ${configId}`);
			return { success: true };
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			this.logger.error(`[ConnectorService] Skill-only Disconnect failed for ${configId}:`, error);
			return {
				success: false,
				error: message
			};
		}
	}
	/**
	* 返回所有已启用的 skill-only + auth_mode=token 连接器的 envOverrides 合集。
	*
	* sidecar / backend buildEnv 时调用，将 token 注入到 agent-cli 子进程 env。
	*/
	getSkillOnlyTokenEnv() {
		const result = {};
		for (const configId of this.persistentState.enabled) {
			const entry = this.getMarketplaceEntryById(configId);
			if (entry?.type !== "skill-only" || entry?.auth_mode !== "token") continue;
			const envs = this.persistentState.envOverrides[configId];
			if (!envs) continue;
			for (const [k, v] of Object.entries(envs)) if (typeof v === "string" && v.length > 0) result[k] = v;
		}
		return result;
	}
	/**
	* CLI 自动连接：启动时检测已安装且已认证的 CLI connector
	*/
	async tryAutoConnectCli(configId, config) {
		const cliConfig = config.cliConfig;
		if (!cliConfig || !this.cliExecutor) return;
		try {
			if (!await this.cliExecutor.isCliInstalled(cliConfig, { silent: true })) {
				this.logger.info(`[ConnectorService] CLI auto-connect skipped for ${configId}: CLI not installed`);
				return;
			}
			if (cliConfig.versionCheck) try {
				const versionResult = await this.cliExecutor.checkVersion(cliConfig);
				if (versionResult.needsUpgrade) {
					this.logger.info(`[ConnectorService] CLI auto-connect ${configId}: version ${versionResult.currentVersion || "unknown"} < ${cliConfig.versionCheck.minVersion}, upgrading...`);
					await this.cliExecutor.runInstall(cliConfig);
					const recheck = await this.cliExecutor.checkVersion(cliConfig);
					if (recheck.needsUpgrade) this.logger.warn(`[ConnectorService] CLI auto-connect ${configId}: upgrade failed, still ${recheck.currentVersion || "unknown"}`);
					else this.logger.info(`[ConnectorService] CLI auto-connect ${configId}: upgrade completed`);
				}
			} catch (versionError) {
				this.logger.warn(`[ConnectorService] CLI auto-connect ${configId}: versionCheck error, skipping:`, versionError);
			}
			const statusResult = await this.cliExecutor.runStatus(cliConfig, { silent: true });
			const currentState = this.states.get(configId);
			if (statusResult.success) if (currentState?.status !== "connected") {
				this.logger.info(`[ConnectorService] CLI auto-connect: ${configId} authenticated, updating to connected`);
				this.finalizeCliConnect(configId, config);
			} else this.logger.info(`[ConnectorService] CLI auto-connect: ${configId} already connected`);
			else if (currentState?.status === "connecting" || currentState?.status === "connected" || currentState?.status === "error") {
				this.logger.info(`[ConnectorService] CLI auto-connect: ${configId} not authenticated, correcting status from ${currentState.status} to disconnected`);
				this.updateState(configId, "disconnected");
			}
		} catch (error) {
			this.logger.warn(`[ConnectorService] CLI auto-connect error for ${configId}:`, error);
		}
	}
	/**
	* 从 CLI 类型的 marketplace entry 构建 ConnectorConfig
	* 读取 cli.json 替代 mcp.json
	*/
	buildCliConnectorConfig(entry, source) {
		const cliPath = (0, path.join)(this.baseDir, require_workbuddy_auth_product_coordinator.CONNECTORS_DIR, source, "cli.json");
		if (!(0, fs.existsSync)(cliPath)) {
			this.logger.warn(`[ConnectorService] CLI config not found: ${cliPath}`);
			return null;
		}
		let cliJson;
		try {
			cliJson = JSON.parse((0, fs.readFileSync)(cliPath, "utf-8"));
		} catch (error) {
			this.logger.warn(`[ConnectorService] Failed to parse CLI config: ${cliPath}`, error);
			return null;
		}
		const iconPath = this.findConnectorIcon(source);
		const skills = this.readSkillConfigs(source);
		return {
			id: source,
			name: this.resolveLocalizedName(entry),
			description: this.resolveLocalizedDescription(entry),
			icon: iconPath || "",
			type: "cli",
			providerId: entry.provider_id,
			mcpConfig: {
				url: "",
				type: "cli"
			},
			cliConfig: cliJson,
			skills,
			...entry.visible_in && entry.visible_in.length > 0 ? { visibleIn: entry.visible_in } : {},
			...entry.examples_zh && entry.examples_zh.length > 0 ? { examples_zh: entry.examples_zh } : {},
			...entry.examples_en && entry.examples_en.length > 0 ? { examples_en: entry.examples_en } : {}
		};
	}
	/**
	* 构建 skill-only connector 的 ConfigInfo。
	* 不读 mcp.json（可以不存在），不读 cli.json，仅靠 marketplace entry 的元信息 +
	* skills 目录下的内容完成连接能力。
	*/
	buildSkillOnlyConnectorConfig(entry, source) {
		const iconPath = this.findConnectorIcon(source);
		const skills = this.readSkillConfigs(source);
		let tokenConfig;
		let tokenValues;
		let tokenSecretFields;
		if (entry.auth_mode === "token") {
			const schema = this.readTokenSchema(source);
			if (schema) {
				tokenConfig = schema;
				const envOverrides = this.persistentState.envOverrides[source] || {};
				tokenValues = {};
				tokenSecretFields = [];
				for (const field of schema.fields) {
					const saved = envOverrides[field.key];
					if (field.type === "password") {
						tokenValues[field.key] = "";
						if (typeof saved === "string" && saved.length > 0) tokenSecretFields.push(field.key);
					} else tokenValues[field.key] = typeof saved === "string" && saved.length > 0 ? saved : field.defaultValue ?? "";
				}
			}
		}
		return {
			id: source,
			name: this.resolveLocalizedName(entry),
			description: this.resolveLocalizedDescription(entry),
			icon: iconPath || "",
			type: "skill-only",
			authMode: this.resolveActiveAuthMode(entry),
			providerId: entry.provider_id,
			skills,
			...tokenConfig ? { tokenConfig } : {},
			...tokenValues ? { tokenValues } : {},
			...tokenSecretFields && tokenSecretFields.length > 0 ? { tokenSecretFields } : {},
			...entry.visible_in && entry.visible_in.length > 0 ? { visibleIn: entry.visible_in } : {},
			...entry.examples_zh && entry.examples_zh.length > 0 ? { examples_zh: entry.examples_zh } : {},
			...entry.examples_en && entry.examples_en.length > 0 ? { examples_en: entry.examples_en } : {}
		};
	}
	/**
	* 判断当前用户是否为司内用户（IOA 登录）
	* 基于账号的 enterpriseId 判断，与 agent-ui 的 nUser 逻辑一致
	*/
	isInternalUser() {
		const session = this.authenticationManager?.currentSessionSubject?.getValue();
		return require_workbuddy_auth_product_coordinator.isIOAEnterprise(session?.account?.enterpriseId);
	}
	/**
	* 获取默认的 Connector Marketplace 配置
	*
	* 优先级：
	* 1. 本地文件 {configDir}/connectors/connector-marketplace.json 中的覆盖 URL
	*    - 司内用户优先取 connectorMarketplaceInternalUrl
	*    - 兜底取 connectorMarketplaceUrl
	* 2. 按 IOA 登录态选择对应的 COS URL
	*
	* 本地文件格式：
	* {
	*   "connectorMarketplaceUrl": "http://localhost:8080/connectors-config.zip",
	*   "connectorMarketplaceInternalUrl": "http://localhost:8080/connectors-config-internal.zip"
	* }
	*/
	getDefaultConnectorMarketplace() {
		const fileUrl = this.readMarketplaceConfigOverride();
		if (fileUrl) {
			this.logger.info(`[ConnectorService] Using marketplace URL from local config: ${fileUrl}`);
			return {
				marketplaceName: "codebuddy-connector-official",
				url: fileUrl
			};
		}
		return {
			marketplaceName: "codebuddy-connector-official",
			url: this.isInternalUser() ? require_workbuddy_auth_product_coordinator.INTERNAL_CONNECTOR_MARKETPLACE_URL : require_workbuddy_auth_product_coordinator.DEFAULT_CONNECTOR_MARKETPLACE_URL
		};
	}
	/**
	* 从本地配置文件读取 marketplace URL 覆盖
	* 文件路径：{configDir}/connectors/connector-marketplace.json
	* 司内用户优先取 connectorMarketplaceInternalUrl，fallback 到 connectorMarketplaceUrl
	*/
	readMarketplaceConfigOverride() {
		try {
			const configPath = (0, path.join)(this.configDir, "connectors", require_workbuddy_auth_product_coordinator.MARKETPLACE_CONFIG_FILE);
			if (!(0, fs.existsSync)(configPath)) return;
			const raw = (0, fs.readFileSync)(configPath, "utf-8");
			const config = JSON.parse(raw);
			if (this.isInternalUser() && config.connectorMarketplaceInternalUrl && typeof config.connectorMarketplaceInternalUrl === "string" && config.connectorMarketplaceInternalUrl.trim()) return config.connectorMarketplaceInternalUrl.trim();
			if (config.connectorMarketplaceUrl && typeof config.connectorMarketplaceUrl === "string" && config.connectorMarketplaceUrl.trim()) return config.connectorMarketplaceUrl.trim();
		} catch (error) {
			this.logger.warn("[ConnectorService] Failed to read local marketplace config:", error);
		}
	}
};
require_common$2.__decorate([(0, import_common$1.Autowired)(import_common$1.Logger), require_common$2.__decorateMetadata("design:type", typeof (_ref$9 = typeof import_common$1.Logger !== "undefined" && import_common$1.Logger) === "function" ? _ref$9 : Object)], ConnectorService.prototype, "logger", void 0);
require_common$2.__decorate([(0, import_common$1.Autowired)(require_workbuddy_auth_product_coordinator.AuthService), require_common$2.__decorateMetadata("design:type", typeof (_ref2$6 = typeof require_workbuddy_auth_product_coordinator.AuthService !== "undefined" && require_workbuddy_auth_product_coordinator.AuthService) === "function" ? _ref2$6 : Object)], ConnectorService.prototype, "authService", void 0);
require_common$2.__decorate([(0, import_common$1.Autowired)(require_workbuddy_auth_product_coordinator.ConnectorMcpProxyToken), require_common$2.__decorateMetadata("design:type", Object)], ConnectorService.prototype, "mcpProxy", void 0);
require_common$2.__decorate([(0, import_common$1.Autowired)(require_workbuddy_auth_product_coordinator.ConnectorProxyServerToken), require_common$2.__decorateMetadata("design:type", Object)], ConnectorService.prototype, "proxyServer", void 0);
require_common$2.__decorate([
	(0, import_common$1.Autowired)(require_workbuddy_auth_product_coordinator.ConnectorCliExecutorToken),
	(0, import_common$1.Optional)(),
	require_common$2.__decorateMetadata("design:type", Object)
], ConnectorService.prototype, "cliExecutor", void 0);
require_common$2.__decorate([(0, import_common$1.Autowired)(require_common$2.ProductManager), require_common$2.__decorateMetadata("design:type", typeof (_ref3$3 = typeof require_common$2.ProductManager !== "undefined" && require_common$2.ProductManager) === "function" ? _ref3$3 : Object)], ConnectorService.prototype, "productManager", void 0);
require_common$2.__decorate([(0, import_common$1.Autowired)(require_common$2.AuthenticationManager), require_common$2.__decorateMetadata("design:type", typeof (_ref4$2 = typeof require_common$2.AuthenticationManager !== "undefined" && require_common$2.AuthenticationManager) === "function" ? _ref4$2 : Object)], ConnectorService.prototype, "authenticationManager", void 0);
ConnectorService = require_common$2.__decorate([(0, import_common$1.Component)(require_workbuddy_auth_product_coordinator.ConnectorServiceToken), require_common$2.__decorateMetadata("design:paramtypes", [])], ConnectorService);
/**
* 标准化 HTTP ETag：剥掉 weak 标记 `W/` 和两端的双引号，仅保留内部的 opaque 值。
*
* 不同 CDN / 代理对 ETag 的大小写和引号处理略有差异；只有剥到原始值再比较，
* 才能避免"同一个对象因为引号/大小写被误判为变更"。
*
* 空值 / 非字符串统一返回 null，由上层视为"ETag 不可用"走 sha256 兜底。
*/
function normalizeEtag(raw) {
	if (typeof raw !== "string") return null;
	let value = raw.trim();
	if (!value) return null;
	if (value.startsWith("W/")) value = value.slice(2).trim();
	if (value.startsWith("\"") && value.endsWith("\"") && value.length >= 2) value = value.slice(1, -1);
	return value.length > 0 ? value : null;
}
//#endregion
//#region ../../packages/workbuddy-server/src/connector/runtime-progress-notifier.ts
/**
* 连接器运行环境（Node.js / Python）准备进度通知器
*
* 职责：把 `binary-manager` 的进度回调 / 完成 / 失败事件转成 IPC 事件
* 推给 Renderer，由 Renderer 侧的 toast 订阅器展示「正在准备连接器运行环境」
* 系列提示。
*
* 设计要点：
* - **环境已就绪路径静默**：`binary-manager.ensure()` 直接命中缓存时不会
*   触发 onProgress，notifier 自然不会发事件，Renderer 不会弹 toast。
* - **节流**：同一 operation 至少间隔 500ms 或百分比变化 ≥ 5% 才发送进度事件，
*   避免 IPC 洪泛。首次 progress 立即发送。
* - **错误分类**：`classifyBinaryError` 将 `BinaryError` 归为 `network` / `generic`
*   两类，Renderer 据此选择对应文案。
*/
var IPC_CHANNEL = "binary:install-progress";
var THROTTLE_MS = 500;
var THROTTLE_PCT = 5;
/**
* 把未知错误归类为 Renderer 侧能直接选文案的 `network` / `generic`。
*
* - `BinaryError` 且属于网络/超时类 → `network`
* - 其他错误（解压、校验、磁盘空间、未知）→ `generic`
*/
function classifyBinaryError(err) {
	if (err instanceof require_log_acl_guard.BinaryError) return {
		code: [
			require_log_acl_guard.BinaryErrorCode.DOWNLOAD_FAILED,
			require_log_acl_guard.BinaryErrorCode.DOWNLOAD_TIMEOUT,
			require_log_acl_guard.BinaryErrorCode.NETWORK_ERROR
		].includes(err.code) ? "network" : "generic",
		message: err.message
	};
	if (err instanceof Error) return {
		code: "generic",
		message: err.message
	};
	return {
		code: "generic",
		message: String(err)
	};
}
/**
* 创建一个 runtime progress notifier。
*
* @param operationId 本次 ensure 操作的唯一 id
* @param type 运行环境类型（当前仅 node；预留 python）
* @param version 目标版本号（用于日志 / 调试）
*/
function createRuntimeProgressNotifier(operationId, type, version, deps = {}) {
	if (deps.silent) {
		const noop = () => {};
		return {
			onProgress: noop,
			preparing: noop,
			complete: noop,
			error: noop
		};
	}
	const send = deps.send ?? noopSend;
	const now = deps.now ?? Date.now;
	let lastSentAt = 0;
	let lastSentProgress = -1;
	let anyProgressSent = false;
	let terminated = false;
	const emit = (payload) => {
		send(IPC_CHANNEL, payload);
	};
	const onProgress = (task) => {
		if (terminated) return;
		const progress = Number.isFinite(task.progress) ? task.progress : void 0;
		const elapsed = now() - lastSentAt;
		const firstEvent = !anyProgressSent;
		const deltaPctOk = progress == null || lastSentProgress < 0 || Math.abs(progress - lastSentProgress) >= THROTTLE_PCT;
		if (!firstEvent && !deltaPctOk && !(elapsed >= THROTTLE_MS)) return;
		lastSentAt = now();
		if (progress != null) lastSentProgress = progress;
		anyProgressSent = true;
		emit({
			operationId,
			phase: "connector-prepare",
			type,
			version,
			status: "progress",
			progress
		});
	};
	/**
	* 发一个"准备中"事件（progress=undefined），用于"下载被 installLock 复用、
	* onProgress 不会被调用"场景下让 toast 先亮起来。幂等：重复调用只首次生效。
	*/
	const preparing = () => {
		if (terminated || anyProgressSent) return;
		lastSentAt = now();
		anyProgressSent = true;
		emit({
			operationId,
			phase: "connector-prepare",
			type,
			version,
			status: "progress",
			progress: void 0
		});
	};
	const complete = () => {
		if (terminated) return;
		terminated = true;
		if (!anyProgressSent) return;
		emit({
			operationId,
			phase: "connector-prepare",
			type,
			version,
			status: "complete"
		});
	};
	const error = (classified) => {
		if (terminated) return;
		terminated = true;
		emit({
			operationId,
			phase: "connector-prepare",
			type,
			version,
			status: "error",
			error: classified
		});
	};
	return {
		onProgress,
		preparing,
		complete,
		error
	};
}
function noopSend() {}
//#endregion
//#region ../../packages/workbuddy-server/src/connector/connector-node-runtime-env.ts
/** WorkBuddy 默认 npm registry fallback 列表（按优先级排序） */
var DEFAULT_NPM_REGISTRIES = [
	"https://mirrors.cloud.tencent.com/npm/",
	"https://registry.npmmirror.com/",
	"https://registry.npmjs.org/"
];
/**
* Connector 全局 npm 包目录（与 binary-manager 的 Node 托管目录同级，跨 Node
* 版本复用，避免升级 Node 后丢包）。`npm install -g` 写到这里，CLI / npx 通过
* PATH 前置可见。
*/
var CLI_CONNECTOR_PACKAGES_DIR = (0, path.join)((0, os.homedir)(), ".workbuddy", "binaries", "node", "cli-connector-packages");
/** Connector 专属 npm cache，与用户 ~/.npm 隔离 */
var CLI_CONNECTOR_NPM_CACHE_DIR = (0, path.join)((0, os.homedir)(), ".workbuddy", "binaries", "node", "cli-connector-cache");
function prependRuntimePath(env, paths) {
	const isWindows = (0, os.platform)() === "win32";
	const pathKeys = Object.keys(env).filter((key) => key.toLowerCase() === "path");
	const pathKey = isWindows ? [...pathKeys].sort()[0] ?? "Path" : "PATH";
	const existingSegments = (isWindows ? pathKeys : [pathKey]).flatMap((key) => (env[key] ?? "").split(path.delimiter));
	if (isWindows) {
		for (const key of pathKeys) if (key !== pathKey) delete env[key];
	}
	env[pathKey] = dedupePathSegments([...paths, ...existingSegments], isWindows).join(path.delimiter);
}
function dedupePathSegments(paths, isWindows) {
	const seen = /* @__PURE__ */ new Set();
	const result = [];
	for (const pathSegment of paths) {
		if (!pathSegment) continue;
		const key = normalizePathSegment(pathSegment, isWindows);
		if (seen.has(key)) continue;
		seen.add(key);
		result.push(pathSegment);
	}
	return result;
}
function normalizePathSegment(pathSegment, isWindows) {
	const normalized = pathSegment.replace(/[\\/]+$/, "");
	return isWindows ? normalized.toLowerCase() : normalized;
}
/**
* 在传入的 env 上原地注入 Node runtime 相关变量：
*
* - `PATH` 前置 `<cli-connector-packages/bin>:<npmGlobalBin>:<nodeBinDir>:<原 PATH>`
* - Windows 下合并并去除 `PATH` / `Path` 重复 key，避免子进程拿到未注入的旧 PATH
* - `npm_config_registry` / `npm_config_prefix` / `npm_config_cache`
* - HTTPS_PROXY 时给 npm 子进程加 `--use-system-ca`（Node>=20.12）或 `npm_config_strict_ssl=false`
*
* 不包含 `binaryManager.ensure()` 调用，由调用方负责（见 prepareNodeRuntimeEnv）。
*/
function applyNodeRuntimeEnv(env, runtime) {
	const { nodeInfo, nodeBinDir, npmGlobalBin, registry } = runtime;
	prependRuntimePath(env, [
		(0, path.join)(CLI_CONNECTOR_PACKAGES_DIR, "bin"),
		npmGlobalBin,
		nodeBinDir
	]);
	env.npm_config_registry = registry;
	env.npm_config_prefix = CLI_CONNECTOR_PACKAGES_DIR;
	env.npm_config_cache = CLI_CONNECTOR_NPM_CACHE_DIR;
	if (env.HTTPS_PROXY && !(env.NODE_OPTIONS || "").includes("--use-system-ca")) {
		const [major, minor] = nodeInfo.version.split(".").map(Number);
		if (major > 20 || major === 20 && minor >= 12) env.NODE_OPTIONS = ((env.NODE_OPTIONS || "") + " --use-system-ca").trim();
		else env.npm_config_strict_ssl = "false";
	}
}
/**
* 调 binary-manager.ensure 准备 Node，并返回组装 env 需要的路径信息。
*
* 调用方拿到结果后，可以选择：
* - 自己 spread 到子进程 env（stdio MCP 路径）
* - 直接调用 `applyNodeRuntimeEnv(env, result)` 在 env 上原地写（CLI 路径）
*
* 失败时直接抛错，调用方应当 catch 后给用户反馈。binary-manager 缺失场景
* 由调用方处理（不要在 helper 里静默兜底，CLI / stdio 对兜底语义不一定一致）。
*/
async function prepareNodeRuntimeEnv(binaryManager, requirement, logger, options = {}) {
	const versionRange = requirement.versionRange ?? "*";
	const notifier = createRuntimeProgressNotifier(options.operationId ?? (0, crypto.randomUUID)(), "node", versionRange, {
		silent: options.silent === true,
		send: options.send
	});
	if (binaryManager.isInstallingType("node")) notifier.preparing();
	let nodeInfo;
	try {
		nodeInfo = await binaryManager.ensure({
			type: "node",
			versionRange
		}, { onProgress: notifier.onProgress });
		notifier.complete();
	} catch (err) {
		notifier.error(classifyBinaryError(err));
		throw err;
	}
	const npmGlobalBin = (0, os.platform)() === "win32" ? CLI_CONNECTOR_PACKAGES_DIR : (0, path.join)(CLI_CONNECTOR_PACKAGES_DIR, "bin");
	const nodeBinDir = (0, path.join)(nodeInfo.executablePath, "..");
	const registry = requirement.registry ?? DEFAULT_NPM_REGISTRIES[0];
	const managedTag = nodeInfo.source === "managed" ? "[MANAGED-HIT] " : "";
	logger.info(`${managedTag}[NodeRuntimeEnv] Node runtime: source=${nodeInfo.source} version=${nodeInfo.version} node=${nodeInfo.executablePath} prefix=${CLI_CONNECTOR_PACKAGES_DIR} registry=${registry}`);
	return {
		nodeInfo: {
			type: nodeInfo.type,
			version: nodeInfo.version,
			source: nodeInfo.source,
			executablePath: nodeInfo.executablePath
		},
		nodeBinDir,
		npmGlobalBin,
		registry
	};
}
/**
* 清掉 NODE_OPTIONS 里的调试 flag（--inspect 会让 stdio 子进程把 inspector
* URL 当业务输出，CLI auth 命令把 URL 误判成授权链接）。保留 --use-system-ca
* 等安全/网络相关选项。
*/
function stripDebugNodeOptions(env) {
	env.NODE_OPTIONS = (env.NODE_OPTIONS || "").replace(/--inspect(-brk)?(=\S+)?|--debug(=\S+)?/g, "").trim() || void 0;
	delete env.NODE_DEBUG;
}
//#endregion
//#region ../../packages/workbuddy-server/src/connector/connector-cli-executor.ts
/**
* CLI 命令执行器
*
* 负责执行 CLI Connector 的各种命令（init/auth/unAuth/status），
* 以及从 auth 命令输出中提取授权 URL 并打开浏览器。
*
* 从 packages/plugin-chat 迁移，适配 Electron 环境：
* - vscode.env.openExternal → shell.openExternal
*
* 安全说明：
* 此模块使用 exec/spawn + shell: true 执行命令。这些命令来自受信任的 marketplace
* 配置文件（cli.json），不包含用户输入，因此不存在命令注入风险。
* 需要 shell 特性是因为 CLI 配置中的命令可能包含管道、重定向等 shell 语法。
*/
require_log_acl_guard.init_src();
require_common$2.init_decorateMetadata();
require_common$2.init_decorate();
var _ref$8, _ref2$5;
var execAsync = (0, util.promisify)(child_process.exec);
/**
* Node 22.18+ 会把未传 `filter` 的 `fs.cpSync` 目录复制切到原生快路径；该路径在
* Windows 中文用户目录的 verbatim path 上可能抛 EIO。给 `cpSync` 补一个恒真的
* filter 会让 Node 使用原有 JS 递归实现。通过 data URL preload 注入，避免在用户
* 目录落一个可被篡改的临时 shim 文件。
*
* 只在已经命中特征错误后的单次重试中启用，不影响正常 connector 安装。
*/
var CP_SYNC_JS_FALLBACK_PRELOAD_SOURCE = [
	"import fs from'node:fs';",
	"const originalCpSync=fs.cpSync;",
	"fs.cpSync=(source,destination,options={})=>",
	"originalCpSync(source,destination,{...options,filter:options.filter??(()=>true)});"
].join("");
var CP_SYNC_JS_FALLBACK_NODE_OPTION = `--import=data:text/javascript;base64,${Buffer.from(CP_SYNC_JS_FALLBACK_PRELOAD_SOURCE).toString("base64")}`;
var DEFAULT_CONNECTOR_CLI_EXECUTOR_HOST_CAPABILITIES = {
	openExternal: async () => {
		throw new Error("ConnectorCliExecutor host capability openExternal is not available");
	},
	sendRuntimeProgress: () => {
		throw new Error("ConnectorCliExecutor host capability sendRuntimeProgress is not available");
	}
};
/** 简单 semver 比较：a >= b（仅支持 major.minor.patch 数字格式） */
function semverGte(a, b) {
	const pa = a.split(".").map(Number);
	const pb = b.split(".").map(Number);
	for (let i = 0; i < 3; i++) {
		const va = pa[i] || 0;
		const vb = pb[i] || 0;
		if (va > vb) return true;
		if (va < vb) return false;
	}
	return true;
}
/**
* 把 cli.json `env` 字段合并进 env 对象，并展开占位符：
* - `$HOME` / `${HOME}` → `os.homedir()`（跨平台，含 Windows）
*
* 该函数在 buildCommandEnv 的所有返回路径最后一步调用，优先级低于
* PATH / npm_config_* 等由端侧计算的值，高于继承的 process.env。
*/
function applyCliConfigEnv(env, configEnv) {
	if (!configEnv) return;
	const home = (0, os.homedir)();
	for (const [key, raw] of Object.entries(configEnv)) env[key] = raw.replace(/\$\{HOME\}|\$HOME/g, home);
}
var ConnectorCliExecutor = class ConnectorCliExecutor {
	logger;
	/**
	* Node.js / Python 等运行时管理器（来自 @genie/binary-manager，可选注入）。
	*
	* 当 connector 的 `cliConfig.runtime.type === 'node'` 时用它准备运行时并注入 env。
	* 未注入（理论上不应该发生，因为 binary-manager 已在 desktop 启动时初始化）时降级为
	* "继承主进程 PATH" 的老行为 —— 用户若系统已装 Node 仍可工作，否则命令本身会报
	* "command not found"，错误比 WorkBuddy 内部错误更易理解。
	*/
	binaryManager;
	hostCapabilities = DEFAULT_CONNECTOR_CLI_EXECUTOR_HOST_CAPABILITIES;
	setHostCapabilities(capabilities) {
		this.hostCapabilities = {
			...this.hostCapabilities,
			...capabilities
		};
	}
	/**
	* 获取当前平台对应的命令
	*/
	getPlatformCommand(commands) {
		return commands[(0, os.platform)()];
	}
	/**
	* 构造 CLI 命令的执行环境。
	*
	* 基础行为（所有 connector 共享）：
	* - 继承 `process.env`
	* - 删除 `NODE_OPTIONS` / `NODE_DEBUG`（防止子进程继承调试配置，尤其是 --inspect
	*   会让 auth 命令把 inspector URL 错误地当成授权 URL）
	*
	* 如果 connector 声明了 `cliConfig.runtime.type === 'node'`，额外注入：
	* - 通过 binary-manager 的 `BinaryManager.ensure` 确保 Node.js 可用。
	*   binary-manager 内部优先复用满足版本要求的系统 Node，不满足时使用
	*   已下载的 managed Node（`~/.workbuddy/binaries/node/versions/<version>/`），
	*   都没有时从 COS 预加载源下载并安装。版本匹配由 binary-manager 处理，
	*   支持 `>=14` / `^18.0.0` / `20` / `20.x` / `*` 等写法。
	* - `PATH` 前置 `<cli-connector-packages-bin>:<node-bin>:<原 PATH>`，让 npm 刚装的
	*   全局 shim 和 Node/npm 可执行文件能被后续命令（如 `tmeet auth login`）找到。
	* - `npm_config_registry`：connector 自定义 > 默认腾讯云镜像。
	* - `npm_config_prefix`：指向 `~/.workbuddy/binaries/node/cli-connector-packages/`，
	*   让 `npm install -g` 的全局包落在 WorkBuddy 私有目录，不污染用户系统 npm global。
	*   目录与 Node 版本无关，升级 Node 版本时已装的 CLI 工具仍可用。
	* - `npm_config_cache`：指向 `~/.workbuddy/binaries/node/cli-connector-cache/`，
	*   与用户 `~/.npm` 隔离。
	*
	* 未声明 runtime 字段的 connector（或 type 非 'node'）保持现有行为不变。
	*/
	async buildCommandEnv(cliConfig, options = {}, registry) {
		const env = { ...process.env };
		stripDebugNodeOptions(env);
		if (cliConfig.runtime?.type !== "node") {
			applyCliConfigEnv(env, cliConfig.env);
			return env;
		}
		if (!this.binaryManager) {
			this.logger.warn("[CliExecutor] connector requires Node.js runtime but BinaryManager is not available; falling back to inherited PATH");
			applyCliConfigEnv(env, cliConfig.env);
			return env;
		}
		applyNodeRuntimeEnv(env, await prepareNodeRuntimeEnv(this.binaryManager, {
			versionRange: cliConfig.runtime.version ?? "*",
			registry: registry ?? cliConfig.npmRegistry
		}, this.logger, {
			silent: options.silent === true,
			send: this.hostCapabilities.sendRuntimeProgress
		}));
		applyCliConfigEnv(env, cliConfig.env);
		return env;
	}
	/**
	* 从 cli.json 的命令字符串中解析出"第一个 token"（可执行文件名），并忽略
	* 后续的参数。需要正确处理引号与反斜杠转义，避免把含空格 / 引号的路径拆坏，
	* 也防止 cli.json 被篡改时把管道、分号、命令替换等 shell 元字符混进 `which`
	* 检查命令里（shell 注入保护）。
	*
	* 支持的语法（POSIX 兼容子集，足够覆盖 cli.json 配置场景）：
	*   - 单引号：`'foo bar'` → `foo bar`（内部字面，反斜杠不转义）
	*   - 双引号：`"foo bar"` → `foo bar`（支持 `\"`、`\\` 转义）
	*   - 反斜杠：在未加引号处转义下一个字符
	*   - 空白或 shell 元字符（`|`、`;`、`&`、`>` 等）视为 token 结束
	*
	* 返回 null 表示命令非法或无法解析出可执行文件。
	*/
	extractExecutable(cmd) {
		const chars = cmd.trim();
		if (!chars) return null;
		let token = "";
		let i = 0;
		let quote = null;
		while (i < chars.length) {
			const ch = chars[i];
			if (quote === "'") {
				if (ch === "'") quote = null;
				else token += ch;
				i++;
				continue;
			}
			if (quote === "\"") {
				if (ch === "\\" && i + 1 < chars.length) {
					const next = chars[i + 1];
					if (next === "\\" || next === "\"") {
						token += next;
						i += 2;
						continue;
					}
					token += ch;
					i++;
					continue;
				}
				if (ch === "\"") {
					quote = null;
					i++;
					continue;
				}
				token += ch;
				i++;
				continue;
			}
			if (/\s/.test(ch) || "|;&<>()`$".includes(ch)) break;
			if (ch === "\\" && i + 1 < chars.length) {
				token += chars[i + 1];
				i += 2;
				continue;
			}
			if (ch === "'" || ch === "\"") {
				quote = ch;
				i++;
				continue;
			}
			token += ch;
			i++;
		}
		if (quote !== null) return null;
		return token || null;
	}
	/**
	* 对单个参数做 shell 转义，让它可以安全地拼到 `/bin/sh -c <cmd>` 字符串里。
	* 用单引号包裹，内部的单引号替换为 `'\''` 闭合+转义+再开的经典模式。
	* Windows 下 `where` 走 cmd.exe，简单用双引号包裹 + 转义双引号。
	*/
	quoteForShell(value, isWindows) {
		if (isWindows) return `"${value.replace(/"/g, "\\\"")}"`;
		return `'${value.replace(/'/g, "'\\''")}'`;
	}
	/**
	* 检查 CLI 工具是否已安装
	* 通过 which（Unix）/ where（Windows）检测
	*/
	async isCliInstalled(cliConfig, options = {}) {
		const firstAuthCmd = this.normalizeAuthSteps(cliConfig)[0]?.command;
		const statusCmd = this.getPlatformCommand(firstAuthCmd ?? {}) || this.getPlatformCommand(cliConfig.status ?? {});
		if (!statusCmd) return false;
		const executable = this.extractExecutable(statusCmd);
		if (!executable) {
			this.logger.warn(`[CliExecutor] Unable to parse executable name from command: ${statusCmd}`);
			return false;
		}
		const isWindows = (0, os.platform)() === "win32";
		const quoted = this.quoteForShell(executable, isWindows);
		const checkCmd = isWindows ? `where ${quoted}` : `which ${quoted}`;
		try {
			const env = await this.buildCommandEnv(cliConfig, options);
			this.logger.info(`[CliExecutor] isCliInstalled: platform=${(0, os.platform)()} checkCmd=${checkCmd} windowsHide=true`);
			await execAsync(checkCmd, {
				timeout: 5e3,
				env,
				windowsHide: true
			});
			return true;
		} catch {
			return false;
		}
	}
	/**
	* 执行安装命令（支持多源 fallback）
	*
	* 按 registry 优先级依次尝试安装；仅网络类错误（FETCH_ERROR / ETIMEDOUT 等）
	* 触发 fallback，其他错误（如包不存在）直接返回。
	*/
	async runInstall(cliConfig, options = {}) {
		const cmd = this.getPlatformCommand(cliConfig.init);
		if (!cmd) return {
			success: false,
			stdout: "",
			stderr: `No init command for platform ${(0, os.platform)()}`,
			exitCode: -1
		};
		const registries = this.resolveRegistries(cliConfig);
		let lastResult;
		for (let i = 0; i < registries.length; i++) {
			const registry = registries[i];
			this.logger.info(`[CliExecutor] Running install: ${cmd} (registry=${registry}, attempt ${i + 1}/${registries.length})`);
			const env = await this.buildCommandEnv(cliConfig, options, registry);
			lastResult = await this.executeCommand(cmd, {
				timeout: 3e5,
				env
			});
			if (lastResult.success) return lastResult;
			const output = `${lastResult.stderr}\n${lastResult.stdout}`;
			if (!this.isNetworkError(output) || i === registries.length - 1) break;
			this.logger.info(`[CliExecutor] Install failed with registry ${registry}, trying next...`);
		}
		if (lastResult && !lastResult.success) {
			const recovered = await this.tryRecoverVerbatimPathEio(lastResult, cliConfig, options);
			if (recovered) return recovered;
		}
		return lastResult;
	}
	/**
	* 从 npm postinstall 的 EIO 错误串里解析出触发崩溃的目标目录路径。
	*
	* 匹配 `EIO ... '\\?\C:\Users\程\.agents\skills\dws\references'` 这种
	* Windows verbatim（`\\?\`）长路径前缀 + `.agents\skills` 目录家族的签名。
	* 命中返回去掉 `\\?\` 前缀后的真实路径（仅用于诊断日志）；不命中返回 null。
	*/
	extractVerbatimPathEioTarget(output) {
		if ((0, os.platform)() !== "win32") return null;
		const match = output.match(/EIO[^']*'(\\\\\?\\[^']*[\\/]\.agents[\\/]skills[\\/][^']*)'/i);
		if (!match) return null;
		return match[1].replace(/^\\\\\?\\/, "");
	}
	/**
	* 面向用户的可读错误串（替换 raw npm stderr），用于兼容模式重试仍失败的情况。
	*/
	VERBATIM_PATH_EIO_USER_MESSAGE = "Windows 中文用户名兼容问题：CLI 安装脚本无法在包含非 ASCII 字符的用户目录下复制资源。已尝试兼容模式重装但仍失败，请升级到最新版本后重试或联系客服；临时可在纯英文用户名的 Windows 账户中连接。";
	/**
	* EIO verbatim path 兜底恢复：强制 cpSync 使用 JS 递归实现后重试一次 install。
	*
	* Node 22.18+ 的 fs.cpSync 在未提供 filter 时会走原生目录复制快路径；提供恒真 filter
	* 不改变复制语义，但会回到兼容性更好的 JS 路径。preload 由 NODE_OPTIONS 传给 npm
	* 及其 postinstall Node 子进程。
	*
	* @returns 恢复成功（兼容模式重试成功）返回新结果；识别到签名但重试仍失败，返回带友好错误串的
	*   失败结果；未识别到该签名返回 null（交回原始失败结果）。
	*/
	async tryRecoverVerbatimPathEio(failed, cliConfig, options) {
		const output = `${failed.stderr}\n${failed.stdout}`;
		const target = this.extractVerbatimPathEioTarget(output);
		if (!target) return null;
		const cmd = this.getPlatformCommand(cliConfig.init);
		if (!cmd) return null;
		this.logger.warn(`[CliExecutor] Detected Windows verbatim-path EIO during install (issue #68810), retrying once with fs.cpSync JS fallback: ${target}`);
		const registry = this.resolveRegistries(cliConfig)[0];
		const env = await this.buildCommandEnv(cliConfig, options, registry);
		env.NODE_OPTIONS = [env.NODE_OPTIONS, CP_SYNC_JS_FALLBACK_NODE_OPTION].filter(Boolean).join(" ");
		const retry = await this.executeCommand(cmd, {
			timeout: 3e5,
			env
		});
		if (retry.success) {
			this.logger.info("[CliExecutor] Install succeeded with fs.cpSync JS fallback (issue #68810)");
			return retry;
		}
		this.logger.warn("[CliExecutor] Install still failed with fs.cpSync JS fallback (issue #68810)");
		return {
			...retry,
			stderr: this.VERBATIM_PATH_EIO_USER_MESSAGE
		};
	}
	/**
	* 确定 npm registry 尝试顺序。
	* 优先级：npmRegistries（多源）> npmRegistry（单源）> 内置默认列表。
	*/
	resolveRegistries(cliConfig) {
		if (cliConfig.npmRegistries?.length) return cliConfig.npmRegistries;
		if (cliConfig.npmRegistry) return [cliConfig.npmRegistry];
		return [...DEFAULT_NPM_REGISTRIES];
	}
	/**
	* 判断 npm 错误输出是否属于网络类错误（值得换源重试）。
	*/
	isNetworkError(output) {
		return [
			"FETCH_ERROR",
			"ETIMEDOUT",
			"ECONNREFUSED",
			"ENOTFOUND",
			"EAI_AGAIN",
			"ECONNRESET",
			"socket hang up",
			"invalid json response body"
		].some((p) => output.includes(p));
	}
	/**
	* 把 `cliConfig.auth` 归一化为 `CliAuthStep[]`。
	*
	* - 老写法（单对象）→ 包成单步数组，继承顶层所有字段（由 resolveStepConfig 负责）
	* - 新写法（数组）→ 直接返回
	* - undefined → 返回空数组
	*
	* 该归一化让下游逻辑（runAuth 循环、isCliInstalled 取第一步 command）统一按数组处理，
	* 且对外仍然保持兼容老 cli.json 配置。
	*/
	normalizeAuthSteps(cliConfig) {
		const auth = cliConfig.auth;
		if (!auth) return [];
		if (Array.isArray(auth)) return auth;
		return [{ command: auth }];
	}
	/**
	* 把单步 auth 配置与顶层 `CliConfig` 合并，解析出本步实际生效的行为配置。
	*
	* step 显式填写的字段优先，未填则继承顶层。这样多步模式既能共用顶层默认（配置少写），
	* 又能 per-step 精细覆盖（如两步用不同的 `authUrlDomain`）。
	*/
	resolveStepConfig(step, cliConfig) {
		return {
			command: step.command,
			authWaitForExit: step.authWaitForExit ?? cliConfig.authWaitForExit,
			authUrlDomain: step.authUrlDomain ?? cliConfig.authUrlDomain,
			authSuppressBrowser: step.authSuppressBrowser ?? cliConfig.authSuppressBrowser,
			authDeviceFlow: step.authDeviceFlow ?? cliConfig.authDeviceFlow
		};
	}
	/**
	* 执行认证命令
	*
	* 支持两种写法：
	* - 单步（`cliConfig.auth` 为对象）：行为等同历史版本。
	* - 多步（`cliConfig.auth` 为 `CliAuthStep[]`）：按数组顺序依次执行每一步，
	*   每步独立 spawn + 抓 URL + 等退出，任一步失败立即返回（后续步骤不再执行）。
	*   用于需要多次浏览器授权的 CLI（如飞书 lark-cli 的 `config init --new` + `auth login`）。
	*
	* 内核逻辑（URL 监听 / `authWaitForExit` / `authUrlDomain` / `authQrModal` /
	* `authSuppressBrowser`）见 `runAuthStep`。
	*/
	async runAuth(cliConfig, options = {}, signal) {
		const steps = this.normalizeAuthSteps(cliConfig);
		if (steps.length === 0) return {
			success: false,
			stdout: "",
			stderr: `No auth command for platform ${(0, os.platform)()}`,
			exitCode: -1
		};
		const env = await this.buildCommandEnv(cliConfig, options);
		let lastResult;
		for (let i = 0; i < steps.length; i++) {
			if (signal?.aborted) return {
				success: false,
				stdout: "",
				stderr: "Cancelled by user",
				exitCode: -1,
				cancelled: true
			};
			const step = steps[i];
			const effective = this.resolveStepConfig(step, cliConfig);
			const cmd = this.getPlatformCommand(effective.command);
			if (!cmd) return {
				success: false,
				stdout: "",
				stderr: `No auth command for platform ${(0, os.platform)()} at step ${i + 1}/${steps.length}`,
				exitCode: -1
			};
			if (step.skipIf) {
				const skipCmd = this.getPlatformCommand(step.skipIf);
				if (skipCmd) try {
					await execAsync(skipCmd, {
						timeout: 1e4,
						env
					});
					this.logger.info(`[CliExecutor] skipIf passed (exit 0), skipping auth step ${i + 1}/${steps.length}: ${cmd}`);
					continue;
				} catch {}
			}
			if (steps.length > 1) this.logger.info(`[CliExecutor] Running auth step ${i + 1}/${steps.length}: ${cmd}`);
			else this.logger.info(`[CliExecutor] Running auth: ${cmd}`);
			lastResult = await this.runAuthStep(cmd, env, effective, cliConfig, options, signal);
			if (!lastResult.success) return lastResult;
		}
		return lastResult;
	}
	/**
	* 执行单步认证命令（runAuth 的实际内核）。
	*
	* 使用 spawn 启动子进程，实时监听 stdout/stderr，检测到 URL 后根据模式处理：
	*
	* **默认模式**（`effective.authWaitForExit` 未设置或为 false）：
	* 检测到 URL 后立即 kill 子进程并返回，适合"URL 即入口、回调由浏览器处理"场景。
	*
	* **等待退出模式**（`effective.authWaitForExit: true`）：
	* 检测到 URL 后打开浏览器，但保持子进程运行，等待其自然退出。
	* 适合 CLI 工具在 URL 输出后继续阻塞等待扫码、扫码完成后自行写入凭证并退出的场景
	* （如 wecom-cli init --noninteractive、lark-cli 两步授权）。超时扩大为 5 分钟。
	*
	* **Device Flow 模式**（`effective.authDeviceFlow` 配置 + `options.onDeviceCode` 回调）：
	* 用 `uriPattern` / `codePattern` 解析 stdout/stderr 中的 verification URL 和 user code，
	* 通过 `options.onDeviceCode` 推送给调用方。强制走"等待退出"行为：CLI 子进程保持存活
	* 直到自身完成 token 轮询并退出（exit 0 = 成功，非 0 = 失败/取消）。
	* 用户主动取消通过 `signal` AbortSignal 传入（与普通 connect 取消复用同一通道）。
	*
	* QR 弹窗（`cliConfig.authQrModal`）仅在单步模式下生效；调用方通过 `options.onQrUrl`
	* 传入才会走该分支。
	*/
	async runAuthStep(cmd, env, effective, cliConfig, options, signal) {
		const deviceFlowEnabled = !!(effective.authDeviceFlow && options.onDeviceCode);
		const waitForExit = effective.authWaitForExit === true || deviceFlowEnabled;
		const timeoutMs = waitForExit ? 300 * 1e3 : 1e4;
		return new Promise((resolve) => {
			let resolved = false;
			let urlOpened = false;
			let deviceCodeReported = false;
			if (signal?.aborted) {
				resolve({
					success: false,
					stdout: "",
					stderr: "Cancelled by user",
					exitCode: -1,
					cancelled: true
				});
				return;
			}
			this.logger.info(`[CliExecutor] runAuth spawn: platform=${(0, os.platform)()} cmd=${cmd} shell=true windowsHide=true deviceFlow=${deviceFlowEnabled}`);
			const child = (0, child_process.spawn)(cmd, {
				shell: true,
				timeout: timeoutMs,
				env,
				windowsHide: true
			});
			let stdout = "";
			let stderr = "";
			const onAbort = () => {
				if (resolved) return;
				resolved = true;
				this.logger.info(`[CliExecutor] runAuth aborted by user, killing child process pid=${child.pid}`);
				try {
					child.kill();
				} catch {}
				resolve({
					success: false,
					stdout,
					stderr,
					exitCode: -1,
					cancelled: true
				});
			};
			signal?.addEventListener("abort", onAbort, { once: true });
			const cleanupAbortListener = () => signal?.removeEventListener("abort", onAbort);
			const authUrlDomain = effective.authUrlDomain;
			const deviceFlowConfig = effective.authDeviceFlow;
			const tryHandleDeviceFlow = (text, source) => {
				if (deviceCodeReported || !deviceFlowConfig || !options.onDeviceCode) return;
				const info = this.extractDeviceFlowInfo(text, deviceFlowConfig);
				if (!info) return;
				deviceCodeReported = true;
				this.logger.info(`[CliExecutor] Device flow info found in ${source}: uri=${info.verificationUri} hasCode=${!!info.userCode}`);
				options.onDeviceCode(info);
				if (!(effective.authSuppressBrowser === true || options.suppressBrowser)) Promise.resolve(this.hostCapabilities.openExternal(info.verificationUri)).catch((error) => {
					this.logger.warn(`[CliExecutor] Failed to open device flow URL: ${error instanceof Error ? error.message : String(error)}`);
				});
			};
			const tryHandleUrl = (text, source) => {
				if (urlOpened) return;
				if (deviceFlowEnabled) return;
				const url = this.extractAuthUrl(text, authUrlDomain);
				if (!url) return;
				urlOpened = true;
				this.logger.info(`[CliExecutor] Auth URL found in ${source}: ${url}`);
				if (options.onQrUrl) options.onQrUrl(url);
				else if (effective.authSuppressBrowser === true || options.suppressBrowser) {} else Promise.resolve(this.hostCapabilities.openExternal(url)).catch((error) => {
					this.logger.warn(`[CliExecutor] Failed to open auth URL: ${error instanceof Error ? error.message : String(error)}`);
				});
				if (!waitForExit) {
					resolved = true;
					cleanupAbortListener();
					child.kill();
					resolve({
						success: true,
						stdout,
						stderr,
						exitCode: 0,
						authUrl: url
					});
				}
			};
			child.stdout?.on("data", (data) => {
				stdout += data.toString();
				tryHandleDeviceFlow(stdout, "stdout");
				tryHandleUrl(stdout, "stdout");
			});
			child.stderr?.on("data", (data) => {
				stderr += data.toString();
				tryHandleDeviceFlow(stderr, "stderr");
				tryHandleUrl(stderr, "stderr");
			});
			child.on("close", (code) => {
				if (!resolved) {
					resolved = true;
					cleanupAbortListener();
					resolve({
						success: code === 0,
						stdout,
						stderr,
						exitCode: code ?? -1,
						authUrl: urlOpened ? this.extractAuthUrl(stdout + stderr, authUrlDomain) : void 0
					});
				}
			});
			child.on("error", (error) => {
				if (!resolved) {
					resolved = true;
					cleanupAbortListener();
					resolve({
						success: false,
						stdout,
						stderr: error.message,
						exitCode: -1
					});
				}
			});
		});
	}
	/**
	* 执行状态检查命令
	*
	* 以 exit code === 0 判断是否已连接。
	* 若 cliConfig.statusMatch 存在，还需匹配 stdout 内容。
	*/
	async runStatus(cliConfig, options = {}) {
		const cmd = this.getPlatformCommand(cliConfig.status ?? {});
		if (!cmd) return {
			success: false,
			stdout: "",
			stderr: `No status command for platform ${(0, os.platform)()}`,
			exitCode: -1
		};
		const env = await this.buildCommandEnv(cliConfig, options);
		const result = await this.executeCommand(cmd, {
			timeout: 1e4,
			env
		});
		if (result.exitCode === 0 && cliConfig.statusMatchJson) try {
			const parsed = JSON.parse(result.stdout);
			result.success = Object.entries(cliConfig.statusMatchJson).every(([key, expected]) => String(parsed[key]) === expected);
			this.logger.info(`[CliExecutor] runStatus: statusMatchJson=${JSON.stringify(cliConfig.statusMatchJson)}, matched=${result.success}`);
		} catch {
			result.success = false;
			this.logger.info("[CliExecutor] runStatus: statusMatchJson parse failed, matched=false");
		}
		else if (result.exitCode === 0 && cliConfig.statusMatch) {
			const regex = new RegExp(cliConfig.statusMatch);
			const combinedOutput = result.stdout + result.stderr;
			result.success = regex.test(combinedOutput);
			this.logger.info(`[CliExecutor] runStatus: statusMatch="${cliConfig.statusMatch}", matched=${result.success}`);
		}
		return result;
	}
	/**
	* 检查 CLI 版本是否满足最低要求。
	*
	* 跑 `versionCheck.command`，用正则提取版本号，semver 比较 >= minVersion。
	* 无 versionCheck 配置时直接返回 `{ needsUpgrade: false }`。
	*
	* 退出码非 0 时通过 `classifyCliExit` 区分（issue #67596）：
	* - CLI 进程真跑起来了但 exit≠0（真版本低 / 输出解析失败）→ `needsUpgrade: true`，上层可 auto-upgrade。
	* - Windows 系统级启动失败（如 0xC0000135 DLL 缺失）/ 被 EDR 杀 / 命令没找到 →
	*   `startupFailed: true`，上层不再 auto-upgrade（对启动失败 100% 无效），转诊断向错误。
	*/
	async checkVersion(cliConfig, options = {}) {
		const check = cliConfig.versionCheck;
		if (!check) return { needsUpgrade: false };
		const cmd = this.getPlatformCommand(check.command);
		if (!cmd) return { needsUpgrade: false };
		const env = await this.buildCommandEnv(cliConfig, options);
		try {
			const result = await this.executeCommand(cmd, {
				timeout: 1e4,
				env
			});
			if (result.exitCode !== 0) {
				if (classifyCliExit(result.exitCode) === "startup-failed") {
					this.logger.warn(`[CliExecutor] checkVersion: CLI startup failed cmd=${cmd} exitCode=${formatExitCodeHex(result.exitCode)} (${result.exitCode}) stderr=${result.stderr.slice(0, 200)}`);
					return {
						needsUpgrade: false,
						startupFailed: true,
						exitCode: result.exitCode
					};
				}
				this.logger.info(`[CliExecutor] checkVersion: command exited ${result.exitCode}, treating as needs upgrade`);
				return { needsUpgrade: true };
			}
			const pattern = new RegExp(check.versionPattern || "(\\d+\\.\\d+\\.\\d+)");
			const match = result.stdout.match(pattern) || result.stderr.match(pattern);
			if (!match?.[1]) {
				this.logger.info("[CliExecutor] checkVersion: could not extract version from output");
				return { needsUpgrade: true };
			}
			const currentVersion = match[1];
			const needsUpgrade = !semverGte(currentVersion, check.minVersion);
			this.logger.info(`[CliExecutor] checkVersion: current=${currentVersion}, min=${check.minVersion}, needsUpgrade=${needsUpgrade}`);
			return {
				needsUpgrade,
				currentVersion
			};
		} catch (err) {
			this.logger.warn("[CliExecutor] checkVersion failed:", err);
			return { needsUpgrade: true };
		}
	}
	/**
	* 执行取消认证命令
	*/
	async runUnAuth(cliConfig, options = {}) {
		const cmd = this.getPlatformCommand(cliConfig.unAuth ?? {});
		if (!cmd) return {
			success: false,
			stdout: "",
			stderr: `No unAuth command for platform ${(0, os.platform)()}`,
			exitCode: -1
		};
		this.logger.info(`[CliExecutor] Running unAuth: ${cmd}`);
		const env = await this.buildCommandEnv(cliConfig, options);
		return this.executeCommand(cmd, {
			timeout: 3e4,
			env
		});
	}
	/**
	* 轮询 status 命令等待认证完成
	*
	* @param cliConfig CLI 配置
	* @param timeoutMs 最大等待时间（默认 5 分钟）
	* @param pollIntervalMs 轮询间隔（默认 3 秒）
	* @param signal 用户主动取消信号；abort 后立即中断 sleep 并退出循环（不等下个 poll 周期）
	* @returns true 如果认证成功；false 如果超时或被取消
	*/
	async pollAuthCompletion(cliConfig, timeoutMs = 300 * 1e3, pollIntervalMs = 3e3, signal) {
		const startTime = Date.now();
		while (Date.now() - startTime < timeoutMs && !signal?.aborted) {
			await new Promise((resolve) => {
				const t = setTimeout(resolve, pollIntervalMs);
				const onAbort = () => {
					clearTimeout(t);
					resolve();
				};
				signal?.addEventListener("abort", onAbort, { once: true });
			});
			if (signal?.aborted) {
				this.logger.info("[CliExecutor] Auth polling cancelled by user");
				return false;
			}
			if ((await this.runStatus(cliConfig)).success) {
				this.logger.info(`[CliExecutor] Auth completed (took ${Date.now() - startTime}ms)`);
				return true;
			}
		}
		if (signal?.aborted) {
			this.logger.info("[CliExecutor] Auth polling cancelled by user");
			return false;
		}
		this.logger.warn(`[CliExecutor] Auth polling timed out after ${timeoutMs}ms`);
		return false;
	}
	/**
	* 从文本中提取认证 URL
	*
	* @param text 命令输出文本（stdout 或 stderr）
	* @param authUrlDomain 认证 URL 的匹配域名（来自 cli.json 的 authUrlDomain 字段）
	*   若提供，只有包含该域名的 URL 才会被提取
	*   若不提供，提取第一个 https URL
	*/
	extractAuthUrl(text, authUrlDomain) {
		const urlRegex = /https?:\/\/[^\s\n\r"'<>]+/g;
		let match;
		while ((match = urlRegex.exec(text)) !== null) {
			const url = match[0];
			if (authUrlDomain) {
				if (url.includes(authUrlDomain)) return url;
			} else if (url.startsWith("https://")) return url;
		}
	}
	/**
	* 从文本中按 Device Flow 配置提取 verification URL 与可选 user_code。
	*
	* 优先取正则的第一个捕获组（`match[1]`），无捕获组时退回整个匹配（`match[0]`）。
	* URL 必须命中才返回，code 命中失败时仅 URL 部分有效。
	*/
	extractDeviceFlowInfo(text, config) {
		let uri;
		try {
			const uriRe = new RegExp(config.uriPattern);
			const m = text.match(uriRe);
			if (m) uri = (m[1] ?? m[0])?.trim();
		} catch (err) {
			this.logger.warn(`[CliExecutor] device flow uriPattern invalid: ${String(err)}`);
		}
		if (!uri) return;
		let code;
		if (config.codePattern) try {
			const codeRe = new RegExp(config.codePattern);
			const m = text.match(codeRe);
			if (m) code = (m[1] ?? m[0])?.trim();
		} catch (err) {
			this.logger.warn(`[CliExecutor] device flow codePattern invalid: ${String(err)}`);
		}
		return {
			verificationUri: uri,
			userCode: code,
			expiresIn: config.defaultExpiresInSeconds,
			codeEmbeddedInUri: config.codeEmbeddedInUri
		};
	}
	/**
	* 执行命令并返回结果
	*
	* `options.env` 优先使用调用方传入的（通常来自 `buildCommandEnv`）；
	* 未传时回退到"继承 process.env 并清 NODE_OPTIONS/NODE_DEBUG"的老行为，
	* 保证本方法独立调用（如测试）时也不会泄漏调试配置。
	*/
	async executeCommand(cmd, options = {}) {
		const env = options.env ?? (() => {
			const fallback = { ...process.env };
			delete fallback.NODE_OPTIONS;
			delete fallback.NODE_DEBUG;
			return fallback;
		})();
		try {
			this.logger.info(`[CliExecutor] executeCommand: platform=${(0, os.platform)()} cmd=${cmd} windowsHide=true`);
			const { stdout, stderr } = await execAsync(cmd, {
				timeout: options.timeout ?? 3e4,
				env,
				windowsHide: true
			});
			return {
				success: true,
				stdout,
				stderr,
				exitCode: 0
			};
		} catch (error) {
			return {
				success: false,
				stdout: error.stdout ?? "",
				stderr: error.stderr ?? error.message,
				exitCode: error.code ?? -1
			};
		}
	}
};
require_common$2.__decorate([(0, import_common$1.Autowired)(import_common$1.Logger), require_common$2.__decorateMetadata("design:type", typeof (_ref$8 = typeof import_common$1.Logger !== "undefined" && import_common$1.Logger) === "function" ? _ref$8 : Object)], ConnectorCliExecutor.prototype, "logger", void 0);
require_common$2.__decorate([
	(0, import_common$1.Autowired)(require_log_acl_guard.BinaryManager),
	(0, import_common$1.Optional)(),
	require_common$2.__decorateMetadata("design:type", typeof (_ref2$5 = typeof require_log_acl_guard.BinaryManager !== "undefined" && require_log_acl_guard.BinaryManager) === "function" ? _ref2$5 : Object)
], ConnectorCliExecutor.prototype, "binaryManager", void 0);
ConnectorCliExecutor = require_common$2.__decorate([(0, import_common$1.Component)(require_workbuddy_auth_product_coordinator.ConnectorCliExecutorToken)], ConnectorCliExecutor);
//#endregion
//#region ../../node_modules/@modelcontextprotocol/sdk/dist/esm/experimental/tasks/client.js
/**
* Experimental client task features for MCP SDK.
* WARNING: These APIs are experimental and may change without notice.
*
* @experimental
*/
/**
* Experimental task features for MCP clients.
*
* Access via `client.experimental.tasks`:
* ```typescript
* const stream = client.experimental.tasks.callToolStream({ name: 'tool', arguments: {} });
* const task = await client.experimental.tasks.getTask(taskId);
* ```
*
* @experimental
*/
var ExperimentalClientTasks = class {
	constructor(_client) {
		this._client = _client;
	}
	/**
	* Calls a tool and returns an AsyncGenerator that yields response messages.
	* The generator is guaranteed to end with either a 'result' or 'error' message.
	*
	* This method provides streaming access to tool execution, allowing you to
	* observe intermediate task status updates for long-running tool calls.
	* Automatically validates structured output if the tool has an outputSchema.
	*
	* @example
	* ```typescript
	* const stream = client.experimental.tasks.callToolStream({ name: 'myTool', arguments: {} });
	* for await (const message of stream) {
	*   switch (message.type) {
	*     case 'taskCreated':
	*       console.log('Tool execution started:', message.task.taskId);
	*       break;
	*     case 'taskStatus':
	*       console.log('Tool status:', message.task.status);
	*       break;
	*     case 'result':
	*       console.log('Tool result:', message.result);
	*       break;
	*     case 'error':
	*       console.error('Tool error:', message.error);
	*       break;
	*   }
	* }
	* ```
	*
	* @param params - Tool call parameters (name and arguments)
	* @param resultSchema - Zod schema for validating the result (defaults to CallToolResultSchema)
	* @param options - Optional request options (timeout, signal, task creation params, etc.)
	* @returns AsyncGenerator that yields ResponseMessage objects
	*
	* @experimental
	*/
	async *callToolStream(params, resultSchema = require_types.CallToolResultSchema, options) {
		const clientInternal = this._client;
		const optionsWithTask = {
			...options,
			task: options?.task ?? (clientInternal.isToolTask(params.name) ? {} : void 0)
		};
		const stream = clientInternal.requestStream({
			method: "tools/call",
			params
		}, resultSchema, optionsWithTask);
		const validator = clientInternal.getToolOutputValidator(params.name);
		for await (const message of stream) {
			if (message.type === "result" && validator) {
				const result = message.result;
				if (!result.structuredContent && !result.isError) {
					yield {
						type: "error",
						error: new require_types.McpError(require_types.ErrorCode.InvalidRequest, `Tool ${params.name} has an output schema but did not return structured content`)
					};
					return;
				}
				if (result.structuredContent) try {
					const validationResult = validator(result.structuredContent);
					if (!validationResult.valid) {
						yield {
							type: "error",
							error: new require_types.McpError(require_types.ErrorCode.InvalidParams, `Structured content does not match the tool's output schema: ${validationResult.errorMessage}`)
						};
						return;
					}
				} catch (error) {
					if (error instanceof require_types.McpError) {
						yield {
							type: "error",
							error
						};
						return;
					}
					yield {
						type: "error",
						error: new require_types.McpError(require_types.ErrorCode.InvalidParams, `Failed to validate structured content: ${error instanceof Error ? error.message : String(error)}`)
					};
					return;
				}
			}
			yield message;
		}
	}
	/**
	* Gets the current status of a task.
	*
	* @param taskId - The task identifier
	* @param options - Optional request options
	* @returns The task status
	*
	* @experimental
	*/
	async getTask(taskId, options) {
		return this._client.getTask({ taskId }, options);
	}
	/**
	* Retrieves the result of a completed task.
	*
	* @param taskId - The task identifier
	* @param resultSchema - Zod schema for validating the result
	* @param options - Optional request options
	* @returns The task result
	*
	* @experimental
	*/
	async getTaskResult(taskId, resultSchema, options) {
		return this._client.getTaskResult({ taskId }, resultSchema, options);
	}
	/**
	* Lists tasks with optional pagination.
	*
	* @param cursor - Optional pagination cursor
	* @param options - Optional request options
	* @returns List of tasks with optional next cursor
	*
	* @experimental
	*/
	async listTasks(cursor, options) {
		return this._client.listTasks(cursor ? { cursor } : void 0, options);
	}
	/**
	* Cancels a running task.
	*
	* @param taskId - The task identifier
	* @param options - Optional request options
	*
	* @experimental
	*/
	async cancelTask(taskId, options) {
		return this._client.cancelTask({ taskId }, options);
	}
	/**
	* Sends a request and returns an AsyncGenerator that yields response messages.
	* The generator is guaranteed to end with either a 'result' or 'error' message.
	*
	* This method provides streaming access to request processing, allowing you to
	* observe intermediate task status updates for task-augmented requests.
	*
	* @param request - The request to send
	* @param resultSchema - Zod schema for validating the result
	* @param options - Optional request options (timeout, signal, task creation params, etc.)
	* @returns AsyncGenerator that yields ResponseMessage objects
	*
	* @experimental
	*/
	requestStream(request, resultSchema, options) {
		return this._client.requestStream(request, resultSchema, options);
	}
};
//#endregion
//#region ../../node_modules/@modelcontextprotocol/sdk/dist/esm/client/index.js
/**
* Elicitation default application helper. Applies defaults to the data based on the schema.
*
* @param schema - The schema to apply defaults to.
* @param data - The data to apply defaults to.
*/
function applyElicitationDefaults(schema, data) {
	if (!schema || data === null || typeof data !== "object") return;
	if (schema.type === "object" && schema.properties && typeof schema.properties === "object") {
		const obj = data;
		const props = schema.properties;
		for (const key of Object.keys(props)) {
			const propSchema = props[key];
			if (obj[key] === void 0 && Object.prototype.hasOwnProperty.call(propSchema, "default")) obj[key] = propSchema.default;
			if (obj[key] !== void 0) applyElicitationDefaults(propSchema, obj[key]);
		}
	}
	if (Array.isArray(schema.anyOf)) {
		for (const sub of schema.anyOf) if (typeof sub !== "boolean") applyElicitationDefaults(sub, data);
	}
	if (Array.isArray(schema.oneOf)) {
		for (const sub of schema.oneOf) if (typeof sub !== "boolean") applyElicitationDefaults(sub, data);
	}
}
/**
* Determines which elicitation modes are supported based on declared client capabilities.
*
* According to the spec:
* - An empty elicitation capability object defaults to form mode support (backwards compatibility)
* - URL mode is only supported if explicitly declared
*
* @param capabilities - The client's elicitation capabilities
* @returns An object indicating which modes are supported
*/
function getSupportedElicitationModes(capabilities) {
	if (!capabilities) return {
		supportsFormMode: false,
		supportsUrlMode: false
	};
	const hasFormCapability = capabilities.form !== void 0;
	const hasUrlCapability = capabilities.url !== void 0;
	return {
		supportsFormMode: hasFormCapability || !hasFormCapability && !hasUrlCapability,
		supportsUrlMode: hasUrlCapability
	};
}
/**
* An MCP client on top of a pluggable transport.
*
* The client will automatically begin the initialization flow with the server when connect() is called.
*
* To use with custom types, extend the base Request/Notification/Result types and pass them as type parameters:
*
* ```typescript
* // Custom schemas
* const CustomRequestSchema = RequestSchema.extend({...})
* const CustomNotificationSchema = NotificationSchema.extend({...})
* const CustomResultSchema = ResultSchema.extend({...})
*
* // Type aliases
* type CustomRequest = z.infer<typeof CustomRequestSchema>
* type CustomNotification = z.infer<typeof CustomNotificationSchema>
* type CustomResult = z.infer<typeof CustomResultSchema>
*
* // Create typed client
* const client = new Client<CustomRequest, CustomNotification, CustomResult>({
*   name: "CustomClient",
*   version: "1.0.0"
* })
* ```
*/
var Client = class extends require_helpers.Protocol {
	/**
	* Initializes this client with the given name and version information.
	*/
	constructor(_clientInfo, options) {
		super(options);
		this._clientInfo = _clientInfo;
		this._cachedToolOutputValidators = /* @__PURE__ */ new Map();
		this._cachedKnownTaskTools = /* @__PURE__ */ new Set();
		this._cachedRequiredTaskTools = /* @__PURE__ */ new Set();
		this._listChangedDebounceTimers = /* @__PURE__ */ new Map();
		this._capabilities = options?.capabilities ?? {};
		this._jsonSchemaValidator = options?.jsonSchemaValidator ?? new require_helpers.AjvJsonSchemaValidator();
		if (options?.listChanged) this._pendingListChangedConfig = options.listChanged;
	}
	/**
	* Set up handlers for list changed notifications based on config and server capabilities.
	* This should only be called after initialization when server capabilities are known.
	* Handlers are silently skipped if the server doesn't advertise the corresponding listChanged capability.
	* @internal
	*/
	_setupListChangedHandlers(config) {
		if (config.tools && this._serverCapabilities?.tools?.listChanged) this._setupListChangedHandler("tools", require_types.ToolListChangedNotificationSchema, config.tools, async () => {
			return (await this.listTools()).tools;
		});
		if (config.prompts && this._serverCapabilities?.prompts?.listChanged) this._setupListChangedHandler("prompts", require_types.PromptListChangedNotificationSchema, config.prompts, async () => {
			return (await this.listPrompts()).prompts;
		});
		if (config.resources && this._serverCapabilities?.resources?.listChanged) this._setupListChangedHandler("resources", require_types.ResourceListChangedNotificationSchema, config.resources, async () => {
			return (await this.listResources()).resources;
		});
	}
	/**
	* Access experimental features.
	*
	* WARNING: These APIs are experimental and may change without notice.
	*
	* @experimental
	*/
	get experimental() {
		if (!this._experimental) this._experimental = { tasks: new ExperimentalClientTasks(this) };
		return this._experimental;
	}
	/**
	* Registers new capabilities. This can only be called before connecting to a transport.
	*
	* The new capabilities will be merged with any existing capabilities previously given (e.g., at initialization).
	*/
	registerCapabilities(capabilities) {
		if (this.transport) throw new Error("Cannot register capabilities after connecting to transport");
		this._capabilities = require_helpers.mergeCapabilities(this._capabilities, capabilities);
	}
	/**
	* Override request handler registration to enforce client-side validation for elicitation.
	*/
	setRequestHandler(requestSchema, handler) {
		const methodSchema = require_helpers.getObjectShape(requestSchema)?.method;
		if (!methodSchema) throw new Error("Schema is missing a method literal");
		let methodValue;
		if (require_helpers.isZ4Schema(methodSchema)) {
			const v4Schema = methodSchema;
			methodValue = (v4Schema._zod?.def)?.value ?? v4Schema.value;
		} else {
			const v3Schema = methodSchema;
			methodValue = v3Schema._def?.value ?? v3Schema.value;
		}
		if (typeof methodValue !== "string") throw new Error("Schema method literal must be a string");
		const method = methodValue;
		if (method === "elicitation/create") {
			const wrappedHandler = async (request, extra) => {
				const validatedRequest = require_helpers.safeParse(require_types.ElicitRequestSchema, request);
				if (!validatedRequest.success) {
					const errorMessage = validatedRequest.error instanceof Error ? validatedRequest.error.message : String(validatedRequest.error);
					throw new require_types.McpError(require_types.ErrorCode.InvalidParams, `Invalid elicitation request: ${errorMessage}`);
				}
				const { params } = validatedRequest.data;
				params.mode = params.mode ?? "form";
				const { supportsFormMode, supportsUrlMode } = getSupportedElicitationModes(this._capabilities.elicitation);
				if (params.mode === "form" && !supportsFormMode) throw new require_types.McpError(require_types.ErrorCode.InvalidParams, "Client does not support form-mode elicitation requests");
				if (params.mode === "url" && !supportsUrlMode) throw new require_types.McpError(require_types.ErrorCode.InvalidParams, "Client does not support URL-mode elicitation requests");
				const result = await Promise.resolve(handler(request, extra));
				if (params.task) {
					const taskValidationResult = require_helpers.safeParse(require_types.CreateTaskResultSchema, result);
					if (!taskValidationResult.success) {
						const errorMessage = taskValidationResult.error instanceof Error ? taskValidationResult.error.message : String(taskValidationResult.error);
						throw new require_types.McpError(require_types.ErrorCode.InvalidParams, `Invalid task creation result: ${errorMessage}`);
					}
					return taskValidationResult.data;
				}
				const validationResult = require_helpers.safeParse(require_types.ElicitResultSchema, result);
				if (!validationResult.success) {
					const errorMessage = validationResult.error instanceof Error ? validationResult.error.message : String(validationResult.error);
					throw new require_types.McpError(require_types.ErrorCode.InvalidParams, `Invalid elicitation result: ${errorMessage}`);
				}
				const validatedResult = validationResult.data;
				const requestedSchema = params.mode === "form" ? params.requestedSchema : void 0;
				if (params.mode === "form" && validatedResult.action === "accept" && validatedResult.content && requestedSchema) {
					if (this._capabilities.elicitation?.form?.applyDefaults) try {
						applyElicitationDefaults(requestedSchema, validatedResult.content);
					} catch {}
				}
				return validatedResult;
			};
			return super.setRequestHandler(requestSchema, wrappedHandler);
		}
		if (method === "sampling/createMessage") {
			const wrappedHandler = async (request, extra) => {
				const validatedRequest = require_helpers.safeParse(require_types.CreateMessageRequestSchema, request);
				if (!validatedRequest.success) {
					const errorMessage = validatedRequest.error instanceof Error ? validatedRequest.error.message : String(validatedRequest.error);
					throw new require_types.McpError(require_types.ErrorCode.InvalidParams, `Invalid sampling request: ${errorMessage}`);
				}
				const { params } = validatedRequest.data;
				const result = await Promise.resolve(handler(request, extra));
				if (params.task) {
					const taskValidationResult = require_helpers.safeParse(require_types.CreateTaskResultSchema, result);
					if (!taskValidationResult.success) {
						const errorMessage = taskValidationResult.error instanceof Error ? taskValidationResult.error.message : String(taskValidationResult.error);
						throw new require_types.McpError(require_types.ErrorCode.InvalidParams, `Invalid task creation result: ${errorMessage}`);
					}
					return taskValidationResult.data;
				}
				const validationResult = require_helpers.safeParse(params.tools || params.toolChoice ? require_types.CreateMessageResultWithToolsSchema : require_types.CreateMessageResultSchema, result);
				if (!validationResult.success) {
					const errorMessage = validationResult.error instanceof Error ? validationResult.error.message : String(validationResult.error);
					throw new require_types.McpError(require_types.ErrorCode.InvalidParams, `Invalid sampling result: ${errorMessage}`);
				}
				return validationResult.data;
			};
			return super.setRequestHandler(requestSchema, wrappedHandler);
		}
		return super.setRequestHandler(requestSchema, handler);
	}
	assertCapability(capability, method) {
		if (!this._serverCapabilities?.[capability]) throw new Error(`Server does not support ${capability} (required for ${method})`);
	}
	async connect(transport, options) {
		await super.connect(transport);
		if (transport.sessionId !== void 0) return;
		try {
			const result = await this.request({
				method: "initialize",
				params: {
					protocolVersion: require_types.LATEST_PROTOCOL_VERSION,
					capabilities: this._capabilities,
					clientInfo: this._clientInfo
				}
			}, require_types.InitializeResultSchema, options);
			if (result === void 0) throw new Error(`Server sent invalid initialize result: ${result}`);
			if (!require_types.SUPPORTED_PROTOCOL_VERSIONS.includes(result.protocolVersion)) throw new Error(`Server's protocol version is not supported: ${result.protocolVersion}`);
			this._serverCapabilities = result.capabilities;
			this._serverVersion = result.serverInfo;
			if (transport.setProtocolVersion) transport.setProtocolVersion(result.protocolVersion);
			this._instructions = result.instructions;
			await this.notification({ method: "notifications/initialized" });
			if (this._pendingListChangedConfig) {
				this._setupListChangedHandlers(this._pendingListChangedConfig);
				this._pendingListChangedConfig = void 0;
			}
		} catch (error) {
			this.close();
			throw error;
		}
	}
	/**
	* After initialization has completed, this will be populated with the server's reported capabilities.
	*/
	getServerCapabilities() {
		return this._serverCapabilities;
	}
	/**
	* After initialization has completed, this will be populated with information about the server's name and version.
	*/
	getServerVersion() {
		return this._serverVersion;
	}
	/**
	* After initialization has completed, this may be populated with information about the server's instructions.
	*/
	getInstructions() {
		return this._instructions;
	}
	assertCapabilityForMethod(method) {
		switch (method) {
			case "logging/setLevel":
				if (!this._serverCapabilities?.logging) throw new Error(`Server does not support logging (required for ${method})`);
				break;
			case "prompts/get":
			case "prompts/list":
				if (!this._serverCapabilities?.prompts) throw new Error(`Server does not support prompts (required for ${method})`);
				break;
			case "resources/list":
			case "resources/templates/list":
			case "resources/read":
			case "resources/subscribe":
			case "resources/unsubscribe":
				if (!this._serverCapabilities?.resources) throw new Error(`Server does not support resources (required for ${method})`);
				if (method === "resources/subscribe" && !this._serverCapabilities.resources.subscribe) throw new Error(`Server does not support resource subscriptions (required for ${method})`);
				break;
			case "tools/call":
			case "tools/list":
				if (!this._serverCapabilities?.tools) throw new Error(`Server does not support tools (required for ${method})`);
				break;
			case "completion/complete":
				if (!this._serverCapabilities?.completions) throw new Error(`Server does not support completions (required for ${method})`);
				break;
			case "initialize": break;
			case "ping": break;
		}
	}
	assertNotificationCapability(method) {
		switch (method) {
			case "notifications/roots/list_changed":
				if (!this._capabilities.roots?.listChanged) throw new Error(`Client does not support roots list changed notifications (required for ${method})`);
				break;
			case "notifications/initialized": break;
			case "notifications/cancelled": break;
			case "notifications/progress": break;
		}
	}
	assertRequestHandlerCapability(method) {
		if (!this._capabilities) return;
		switch (method) {
			case "sampling/createMessage":
				if (!this._capabilities.sampling) throw new Error(`Client does not support sampling capability (required for ${method})`);
				break;
			case "elicitation/create":
				if (!this._capabilities.elicitation) throw new Error(`Client does not support elicitation capability (required for ${method})`);
				break;
			case "roots/list":
				if (!this._capabilities.roots) throw new Error(`Client does not support roots capability (required for ${method})`);
				break;
			case "tasks/get":
			case "tasks/list":
			case "tasks/result":
			case "tasks/cancel":
				if (!this._capabilities.tasks) throw new Error(`Client does not support tasks capability (required for ${method})`);
				break;
			case "ping": break;
		}
	}
	assertTaskCapability(method) {
		require_helpers.assertToolsCallTaskCapability(this._serverCapabilities?.tasks?.requests, method, "Server");
	}
	assertTaskHandlerCapability(method) {
		if (!this._capabilities) return;
		require_helpers.assertClientRequestTaskCapability(this._capabilities.tasks?.requests, method, "Client");
	}
	async ping(options) {
		return this.request({ method: "ping" }, require_types.EmptyResultSchema, options);
	}
	async complete(params, options) {
		return this.request({
			method: "completion/complete",
			params
		}, require_types.CompleteResultSchema, options);
	}
	async setLoggingLevel(level, options) {
		return this.request({
			method: "logging/setLevel",
			params: { level }
		}, require_types.EmptyResultSchema, options);
	}
	async getPrompt(params, options) {
		return this.request({
			method: "prompts/get",
			params
		}, require_types.GetPromptResultSchema, options);
	}
	async listPrompts(params, options) {
		return this.request({
			method: "prompts/list",
			params
		}, require_types.ListPromptsResultSchema, options);
	}
	async listResources(params, options) {
		return this.request({
			method: "resources/list",
			params
		}, require_types.ListResourcesResultSchema, options);
	}
	async listResourceTemplates(params, options) {
		return this.request({
			method: "resources/templates/list",
			params
		}, require_types.ListResourceTemplatesResultSchema, options);
	}
	async readResource(params, options) {
		return this.request({
			method: "resources/read",
			params
		}, require_types.ReadResourceResultSchema, options);
	}
	async subscribeResource(params, options) {
		return this.request({
			method: "resources/subscribe",
			params
		}, require_types.EmptyResultSchema, options);
	}
	async unsubscribeResource(params, options) {
		return this.request({
			method: "resources/unsubscribe",
			params
		}, require_types.EmptyResultSchema, options);
	}
	/**
	* Calls a tool and waits for the result. Automatically validates structured output if the tool has an outputSchema.
	*
	* For task-based execution with streaming behavior, use client.experimental.tasks.callToolStream() instead.
	*/
	async callTool(params, resultSchema = require_types.CallToolResultSchema, options) {
		if (this.isToolTaskRequired(params.name)) throw new require_types.McpError(require_types.ErrorCode.InvalidRequest, `Tool "${params.name}" requires task-based execution. Use client.experimental.tasks.callToolStream() instead.`);
		const result = await this.request({
			method: "tools/call",
			params
		}, resultSchema, options);
		const validator = this.getToolOutputValidator(params.name);
		if (validator) {
			if (!result.structuredContent && !result.isError) throw new require_types.McpError(require_types.ErrorCode.InvalidRequest, `Tool ${params.name} has an output schema but did not return structured content`);
			if (result.structuredContent) try {
				const validationResult = validator(result.structuredContent);
				if (!validationResult.valid) throw new require_types.McpError(require_types.ErrorCode.InvalidParams, `Structured content does not match the tool's output schema: ${validationResult.errorMessage}`);
			} catch (error) {
				if (error instanceof require_types.McpError) throw error;
				throw new require_types.McpError(require_types.ErrorCode.InvalidParams, `Failed to validate structured content: ${error instanceof Error ? error.message : String(error)}`);
			}
		}
		return result;
	}
	isToolTask(toolName) {
		if (!this._serverCapabilities?.tasks?.requests?.tools?.call) return false;
		return this._cachedKnownTaskTools.has(toolName);
	}
	/**
	* Check if a tool requires task-based execution.
	* Unlike isToolTask which includes 'optional' tools, this only checks for 'required'.
	*/
	isToolTaskRequired(toolName) {
		return this._cachedRequiredTaskTools.has(toolName);
	}
	/**
	* Cache validators for tool output schemas.
	* Called after listTools() to pre-compile validators for better performance.
	*/
	cacheToolMetadata(tools) {
		this._cachedToolOutputValidators.clear();
		this._cachedKnownTaskTools.clear();
		this._cachedRequiredTaskTools.clear();
		for (const tool of tools) {
			if (tool.outputSchema) {
				const toolValidator = this._jsonSchemaValidator.getValidator(tool.outputSchema);
				this._cachedToolOutputValidators.set(tool.name, toolValidator);
			}
			const taskSupport = tool.execution?.taskSupport;
			if (taskSupport === "required" || taskSupport === "optional") this._cachedKnownTaskTools.add(tool.name);
			if (taskSupport === "required") this._cachedRequiredTaskTools.add(tool.name);
		}
	}
	/**
	* Get cached validator for a tool
	*/
	getToolOutputValidator(toolName) {
		return this._cachedToolOutputValidators.get(toolName);
	}
	async listTools(params, options) {
		const result = await this.request({
			method: "tools/list",
			params
		}, require_types.ListToolsResultSchema, options);
		this.cacheToolMetadata(result.tools);
		return result;
	}
	/**
	* Set up a single list changed handler.
	* @internal
	*/
	_setupListChangedHandler(listType, notificationSchema, options, fetcher) {
		const parseResult = require_types.ListChangedOptionsBaseSchema.safeParse(options);
		if (!parseResult.success) throw new Error(`Invalid ${listType} listChanged options: ${parseResult.error.message}`);
		if (typeof options.onChanged !== "function") throw new Error(`Invalid ${listType} listChanged options: onChanged must be a function`);
		const { autoRefresh, debounceMs } = parseResult.data;
		const { onChanged } = options;
		const refresh = async () => {
			if (!autoRefresh) {
				onChanged(null, null);
				return;
			}
			try {
				onChanged(null, await fetcher());
			} catch (e) {
				onChanged(e instanceof Error ? e : new Error(String(e)), null);
			}
		};
		const handler = () => {
			if (debounceMs) {
				const existingTimer = this._listChangedDebounceTimers.get(listType);
				if (existingTimer) clearTimeout(existingTimer);
				const timer = setTimeout(refresh, debounceMs);
				this._listChangedDebounceTimers.set(listType, timer);
			} else refresh();
		};
		this.setNotificationHandler(notificationSchema, handler);
	}
	async sendRootsListChanged() {
		return this.notification({ method: "notifications/roots/list_changed" });
	}
};
//#endregion
//#region ../../node_modules/eventsource-parser/dist/index.js
var ParseError = class extends Error {
	constructor(message, options) {
		super(message), this.name = "ParseError", this.type = options.type, this.field = options.field, this.value = options.value, this.line = options.line;
	}
};
function noop(_arg) {}
function createParser(callbacks) {
	if (typeof callbacks == "function") throw new TypeError("`callbacks` must be an object, got a function instead. Did you mean `{onEvent: fn}`?");
	const { onEvent = noop, onError = noop, onRetry = noop, onComment } = callbacks;
	let incompleteLine = "", isFirstChunk = !0, id, data = "", eventType = "";
	function feed(newChunk) {
		const chunk = isFirstChunk ? newChunk.replace(/^\xEF\xBB\xBF/, "") : newChunk, [complete, incomplete] = splitLines(`${incompleteLine}${chunk}`);
		for (const line of complete) parseLine(line);
		incompleteLine = incomplete, isFirstChunk = !1;
	}
	function parseLine(line) {
		if (line === "") {
			dispatchEvent();
			return;
		}
		if (line.startsWith(":")) {
			onComment && onComment(line.slice(line.startsWith(": ") ? 2 : 1));
			return;
		}
		const fieldSeparatorIndex = line.indexOf(":");
		if (fieldSeparatorIndex !== -1) {
			const field = line.slice(0, fieldSeparatorIndex), offset = line[fieldSeparatorIndex + 1] === " " ? 2 : 1;
			processField(field, line.slice(fieldSeparatorIndex + offset), line);
			return;
		}
		processField(line, "", line);
	}
	function processField(field, value, line) {
		switch (field) {
			case "event":
				eventType = value;
				break;
			case "data":
				data = `${data}${value}
`;
				break;
			case "id":
				id = value.includes("\0") ? void 0 : value;
				break;
			case "retry":
				/^\d+$/.test(value) ? onRetry(parseInt(value, 10)) : onError(new ParseError(`Invalid \`retry\` value: "${value}"`, {
					type: "invalid-retry",
					value,
					line
				}));
				break;
			default:
				onError(new ParseError(`Unknown field "${field.length > 20 ? `${field.slice(0, 20)}\u2026` : field}"`, {
					type: "unknown-field",
					field,
					value,
					line
				}));
				break;
		}
	}
	function dispatchEvent() {
		data.length > 0 && onEvent({
			id,
			event: eventType || void 0,
			data: data.endsWith(`
`) ? data.slice(0, -1) : data
		}), id = void 0, data = "", eventType = "";
	}
	function reset(options = {}) {
		incompleteLine && options.consume && parseLine(incompleteLine), isFirstChunk = !0, id = void 0, data = "", eventType = "", incompleteLine = "";
	}
	return {
		feed,
		reset
	};
}
function splitLines(chunk) {
	const lines = [];
	let incompleteLine = "", searchIndex = 0;
	for (; searchIndex < chunk.length;) {
		const crIndex = chunk.indexOf("\r", searchIndex), lfIndex = chunk.indexOf(`
`, searchIndex);
		let lineEnd = -1;
		if (crIndex !== -1 && lfIndex !== -1 ? lineEnd = Math.min(crIndex, lfIndex) : crIndex !== -1 ? lineEnd = crIndex : lfIndex !== -1 && (lineEnd = lfIndex), lineEnd === -1) {
			incompleteLine = chunk.slice(searchIndex);
			break;
		} else {
			const line = chunk.slice(searchIndex, lineEnd);
			lines.push(line), searchIndex = lineEnd + 1, chunk[searchIndex - 1] === "\r" && chunk[searchIndex] === `
` && searchIndex++;
		}
	}
	return [lines, incompleteLine];
}
//#endregion
//#region ../../node_modules/@modelcontextprotocol/sdk/node_modules/eventsource/dist/index.js
var ErrorEvent = class extends Event {
	/**
	* Constructs a new `ErrorEvent` instance. This is typically not called directly,
	* but rather emitted by the `EventSource` object when an error occurs.
	*
	* @param type - The type of the event (should be "error")
	* @param errorEventInitDict - Optional properties to include in the error event
	*/
	constructor(type, errorEventInitDict) {
		var _a, _b;
		super(type), this.code = (_a = errorEventInitDict == null ? void 0 : errorEventInitDict.code) != null ? _a : void 0, this.message = (_b = errorEventInitDict == null ? void 0 : errorEventInitDict.message) != null ? _b : void 0;
	}
	/**
	* Node.js "hides" the `message` and `code` properties of the `ErrorEvent` instance,
	* when it is `console.log`'ed. This makes it harder to debug errors. To ease debugging,
	* we explicitly include the properties in the `inspect` method.
	*
	* This is automatically called by Node.js when you `console.log` an instance of this class.
	*
	* @param _depth - The current depth
	* @param options - The options passed to `util.inspect`
	* @param inspect - The inspect function to use (prevents having to import it from `util`)
	* @returns A string representation of the error
	*/
	[Symbol.for("nodejs.util.inspect.custom")](_depth, options, inspect) {
		return inspect(inspectableError(this), options);
	}
	/**
	* Deno "hides" the `message` and `code` properties of the `ErrorEvent` instance,
	* when it is `console.log`'ed. This makes it harder to debug errors. To ease debugging,
	* we explicitly include the properties in the `inspect` method.
	*
	* This is automatically called by Deno when you `console.log` an instance of this class.
	*
	* @param inspect - The inspect function to use (prevents having to import it from `util`)
	* @param options - The options passed to `Deno.inspect`
	* @returns A string representation of the error
	*/
	[Symbol.for("Deno.customInspect")](inspect, options) {
		return inspect(inspectableError(this), options);
	}
};
function syntaxError(message) {
	const DomException = globalThis.DOMException;
	return typeof DomException == "function" ? new DomException(message, "SyntaxError") : new SyntaxError(message);
}
function flattenError(err) {
	return err instanceof Error ? "errors" in err && Array.isArray(err.errors) ? err.errors.map(flattenError).join(", ") : "cause" in err && err.cause instanceof Error ? `${err}: ${flattenError(err.cause)}` : err.message : `${err}`;
}
function inspectableError(err) {
	return {
		type: err.type,
		message: err.message,
		code: err.code,
		defaultPrevented: err.defaultPrevented,
		cancelable: err.cancelable,
		timeStamp: err.timeStamp
	};
}
var __typeError = (msg) => {
	throw TypeError(msg);
}, __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg), __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj)), __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value), __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), member.set(obj, value), value), __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method), _readyState, _url, _redirectUrl, _withCredentials, _fetch, _reconnectInterval, _reconnectTimer, _lastEventId, _controller, _parser, _onError, _onMessage, _onOpen, _EventSource_instances, connect_fn, _onFetchResponse, _onFetchError, getRequestOptions_fn, _onEvent, _onRetryChange, failConnection_fn, scheduleReconnect_fn, _reconnect;
var EventSource = class extends EventTarget {
	constructor(url, eventSourceInitDict) {
		var _a, _b;
		super(), __privateAdd(this, _EventSource_instances), this.CONNECTING = 0, this.OPEN = 1, this.CLOSED = 2, __privateAdd(this, _readyState), __privateAdd(this, _url), __privateAdd(this, _redirectUrl), __privateAdd(this, _withCredentials), __privateAdd(this, _fetch), __privateAdd(this, _reconnectInterval), __privateAdd(this, _reconnectTimer), __privateAdd(this, _lastEventId, null), __privateAdd(this, _controller), __privateAdd(this, _parser), __privateAdd(this, _onError, null), __privateAdd(this, _onMessage, null), __privateAdd(this, _onOpen, null), __privateAdd(this, _onFetchResponse, async (response) => {
			var _a2;
			__privateGet(this, _parser).reset();
			const { body, redirected, status, headers } = response;
			if (status === 204) {
				__privateMethod(this, _EventSource_instances, failConnection_fn).call(this, "Server sent HTTP 204, not reconnecting", 204), this.close();
				return;
			}
			if (redirected ? __privateSet(this, _redirectUrl, new URL(response.url)) : __privateSet(this, _redirectUrl, void 0), status !== 200) {
				__privateMethod(this, _EventSource_instances, failConnection_fn).call(this, `Non-200 status code (${status})`, status);
				return;
			}
			if (!(headers.get("content-type") || "").startsWith("text/event-stream")) {
				__privateMethod(this, _EventSource_instances, failConnection_fn).call(this, "Invalid content type, expected \"text/event-stream\"", status);
				return;
			}
			if (__privateGet(this, _readyState) === this.CLOSED) return;
			__privateSet(this, _readyState, this.OPEN);
			const openEvent = new Event("open");
			if ((_a2 = __privateGet(this, _onOpen)) == null || _a2.call(this, openEvent), this.dispatchEvent(openEvent), typeof body != "object" || !body || !("getReader" in body)) {
				__privateMethod(this, _EventSource_instances, failConnection_fn).call(this, "Invalid response body, expected a web ReadableStream", status), this.close();
				return;
			}
			const decoder = new TextDecoder(), reader = body.getReader();
			let open = !0;
			do {
				const { done, value } = await reader.read();
				value && __privateGet(this, _parser).feed(decoder.decode(value, { stream: !done })), done && (open = !1, __privateGet(this, _parser).reset(), __privateMethod(this, _EventSource_instances, scheduleReconnect_fn).call(this));
			} while (open);
		}), __privateAdd(this, _onFetchError, (err) => {
			__privateSet(this, _controller, void 0), !(err.name === "AbortError" || err.type === "aborted") && __privateMethod(this, _EventSource_instances, scheduleReconnect_fn).call(this, flattenError(err));
		}), __privateAdd(this, _onEvent, (event) => {
			typeof event.id == "string" && __privateSet(this, _lastEventId, event.id);
			const messageEvent = new MessageEvent(event.event || "message", {
				data: event.data,
				origin: __privateGet(this, _redirectUrl) ? __privateGet(this, _redirectUrl).origin : __privateGet(this, _url).origin,
				lastEventId: event.id || ""
			});
			__privateGet(this, _onMessage) && (!event.event || event.event === "message") && __privateGet(this, _onMessage).call(this, messageEvent), this.dispatchEvent(messageEvent);
		}), __privateAdd(this, _onRetryChange, (value) => {
			__privateSet(this, _reconnectInterval, value);
		}), __privateAdd(this, _reconnect, () => {
			__privateSet(this, _reconnectTimer, void 0), __privateGet(this, _readyState) === this.CONNECTING && __privateMethod(this, _EventSource_instances, connect_fn).call(this);
		});
		try {
			if (url instanceof URL) __privateSet(this, _url, url);
			else if (typeof url == "string") __privateSet(this, _url, new URL(url, getBaseURL()));
			else throw new Error("Invalid URL");
		} catch {
			throw syntaxError("An invalid or illegal string was specified");
		}
		__privateSet(this, _parser, createParser({
			onEvent: __privateGet(this, _onEvent),
			onRetry: __privateGet(this, _onRetryChange)
		})), __privateSet(this, _readyState, this.CONNECTING), __privateSet(this, _reconnectInterval, 3e3), __privateSet(this, _fetch, (_a = eventSourceInitDict == null ? void 0 : eventSourceInitDict.fetch) != null ? _a : globalThis.fetch), __privateSet(this, _withCredentials, (_b = eventSourceInitDict == null ? void 0 : eventSourceInitDict.withCredentials) != null ? _b : !1), __privateMethod(this, _EventSource_instances, connect_fn).call(this);
	}
	/**
	* Returns the state of this EventSource object's connection. It can have the values described below.
	*
	* [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventSource/readyState)
	*
	* Note: typed as `number` instead of `0 | 1 | 2` for compatibility with the `EventSource` interface,
	* defined in the TypeScript `dom` library.
	*
	* @public
	*/
	get readyState() {
		return __privateGet(this, _readyState);
	}
	/**
	* Returns the URL providing the event stream.
	*
	* [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventSource/url)
	*
	* @public
	*/
	get url() {
		return __privateGet(this, _url).href;
	}
	/**
	* Returns true if the credentials mode for connection requests to the URL providing the event stream is set to "include", and false otherwise.
	*
	* [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventSource/withCredentials)
	*/
	get withCredentials() {
		return __privateGet(this, _withCredentials);
	}
	/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventSource/error_event) */
	get onerror() {
		return __privateGet(this, _onError);
	}
	set onerror(value) {
		__privateSet(this, _onError, value);
	}
	/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventSource/message_event) */
	get onmessage() {
		return __privateGet(this, _onMessage);
	}
	set onmessage(value) {
		__privateSet(this, _onMessage, value);
	}
	/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventSource/open_event) */
	get onopen() {
		return __privateGet(this, _onOpen);
	}
	set onopen(value) {
		__privateSet(this, _onOpen, value);
	}
	addEventListener(type, listener, options) {
		const listen = listener;
		super.addEventListener(type, listen, options);
	}
	removeEventListener(type, listener, options) {
		const listen = listener;
		super.removeEventListener(type, listen, options);
	}
	/**
	* Aborts any instances of the fetch algorithm started for this EventSource object, and sets the readyState attribute to CLOSED.
	*
	* [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventSource/close)
	*
	* @public
	*/
	close() {
		__privateGet(this, _reconnectTimer) && clearTimeout(__privateGet(this, _reconnectTimer)), __privateGet(this, _readyState) !== this.CLOSED && (__privateGet(this, _controller) && __privateGet(this, _controller).abort(), __privateSet(this, _readyState, this.CLOSED), __privateSet(this, _controller, void 0));
	}
};
_readyState = /* @__PURE__ */ new WeakMap(), _url = /* @__PURE__ */ new WeakMap(), _redirectUrl = /* @__PURE__ */ new WeakMap(), _withCredentials = /* @__PURE__ */ new WeakMap(), _fetch = /* @__PURE__ */ new WeakMap(), _reconnectInterval = /* @__PURE__ */ new WeakMap(), _reconnectTimer = /* @__PURE__ */ new WeakMap(), _lastEventId = /* @__PURE__ */ new WeakMap(), _controller = /* @__PURE__ */ new WeakMap(), _parser = /* @__PURE__ */ new WeakMap(), _onError = /* @__PURE__ */ new WeakMap(), _onMessage = /* @__PURE__ */ new WeakMap(), _onOpen = /* @__PURE__ */ new WeakMap(), _EventSource_instances = /* @__PURE__ */ new WeakSet(), connect_fn = function() {
	__privateSet(this, _readyState, this.CONNECTING), __privateSet(this, _controller, new AbortController()), __privateGet(this, _fetch)(__privateGet(this, _url), __privateMethod(this, _EventSource_instances, getRequestOptions_fn).call(this)).then(__privateGet(this, _onFetchResponse)).catch(__privateGet(this, _onFetchError));
}, _onFetchResponse = /* @__PURE__ */ new WeakMap(), _onFetchError = /* @__PURE__ */ new WeakMap(), getRequestOptions_fn = function() {
	var _a;
	const init = {
		mode: "cors",
		redirect: "follow",
		headers: {
			Accept: "text/event-stream",
			...__privateGet(this, _lastEventId) ? { "Last-Event-ID": __privateGet(this, _lastEventId) } : void 0
		},
		cache: "no-store",
		signal: (_a = __privateGet(this, _controller)) == null ? void 0 : _a.signal
	};
	return "window" in globalThis && (init.credentials = this.withCredentials ? "include" : "same-origin"), init;
}, _onEvent = /* @__PURE__ */ new WeakMap(), _onRetryChange = /* @__PURE__ */ new WeakMap(), failConnection_fn = function(message, code) {
	var _a;
	__privateGet(this, _readyState) !== this.CLOSED && __privateSet(this, _readyState, this.CLOSED);
	const errorEvent = new ErrorEvent("error", {
		code,
		message
	});
	(_a = __privateGet(this, _onError)) == null || _a.call(this, errorEvent), this.dispatchEvent(errorEvent);
}, scheduleReconnect_fn = function(message, code) {
	var _a;
	if (__privateGet(this, _readyState) === this.CLOSED) return;
	__privateSet(this, _readyState, this.CONNECTING);
	const errorEvent = new ErrorEvent("error", {
		code,
		message
	});
	(_a = __privateGet(this, _onError)) == null || _a.call(this, errorEvent), this.dispatchEvent(errorEvent), __privateSet(this, _reconnectTimer, setTimeout(__privateGet(this, _reconnect), __privateGet(this, _reconnectInterval)));
}, _reconnect = /* @__PURE__ */ new WeakMap(), EventSource.CONNECTING = 0, EventSource.OPEN = 1, EventSource.CLOSED = 2;
function getBaseURL() {
	const doc = "document" in globalThis ? globalThis.document : void 0;
	return doc && typeof doc == "object" && "baseURI" in doc && typeof doc.baseURI == "string" ? doc.baseURI : void 0;
}
//#endregion
//#region ../../node_modules/@modelcontextprotocol/sdk/dist/esm/shared/transport.js
/**
* Normalizes HeadersInit to a plain Record<string, string> for manipulation.
* Handles Headers objects, arrays of tuples, and plain objects.
*/
function normalizeHeaders(headers) {
	if (!headers) return {};
	if (headers instanceof Headers) return Object.fromEntries(headers.entries());
	if (Array.isArray(headers)) return Object.fromEntries(headers);
	return { ...headers };
}
/**
* Creates a fetch function that includes base RequestInit options.
* This ensures requests inherit settings like credentials, mode, headers, etc. from the base init.
*
* @param baseFetch - The base fetch function to wrap (defaults to global fetch)
* @param baseInit - The base RequestInit to merge with each request
* @returns A wrapped fetch function that merges base options with call-specific options
*/
function createFetchWithInit(baseFetch = fetch, baseInit) {
	if (!baseInit) return baseFetch;
	return async (url, init) => {
		return baseFetch(url, {
			...baseInit,
			...init,
			headers: init?.headers ? {
				...normalizeHeaders(baseInit.headers),
				...normalizeHeaders(init.headers)
			} : baseInit.headers
		});
	};
}
//#endregion
//#region ../../node_modules/@modelcontextprotocol/sdk/dist/esm/client/sse.js
var SseError = class extends Error {
	constructor(code, message, event) {
		super(`SSE error: ${message}`);
		this.code = code;
		this.event = event;
	}
};
/**
* Client transport for SSE: this will connect to a server using Server-Sent Events for receiving
* messages and make separate POST requests for sending messages.
* @deprecated SSEClientTransport is deprecated. Prefer to use StreamableHTTPClientTransport where possible instead. Note that because some servers are still using SSE, clients may need to support both transports during the migration period.
*/
var SSEClientTransport = class {
	constructor(url, opts) {
		this._url = url;
		this._resourceMetadataUrl = void 0;
		this._scope = void 0;
		this._eventSourceInit = opts?.eventSourceInit;
		this._requestInit = opts?.requestInit;
		this._authProvider = opts?.authProvider;
		this._fetch = opts?.fetch;
		this._fetchWithInit = createFetchWithInit(opts?.fetch, opts?.requestInit);
	}
	async _authThenStart() {
		if (!this._authProvider) throw new require_auth.UnauthorizedError("No auth provider");
		let result;
		try {
			result = await require_auth.auth(this._authProvider, {
				serverUrl: this._url,
				resourceMetadataUrl: this._resourceMetadataUrl,
				scope: this._scope,
				fetchFn: this._fetchWithInit
			});
		} catch (error) {
			this.onerror?.(error);
			throw error;
		}
		if (result !== "AUTHORIZED") throw new require_auth.UnauthorizedError();
		return await this._startOrAuth();
	}
	async _commonHeaders() {
		const headers = {};
		if (this._authProvider) {
			const tokens = await this._authProvider.tokens();
			if (tokens) headers["Authorization"] = `Bearer ${tokens.access_token}`;
		}
		if (this._protocolVersion) headers["mcp-protocol-version"] = this._protocolVersion;
		const extraHeaders = normalizeHeaders(this._requestInit?.headers);
		return new Headers({
			...headers,
			...extraHeaders
		});
	}
	_startOrAuth() {
		const fetchImpl = this?._eventSourceInit?.fetch ?? this._fetch ?? fetch;
		return new Promise((resolve, reject) => {
			this._eventSource = new EventSource(this._url.href, {
				...this._eventSourceInit,
				fetch: async (url, init) => {
					const headers = await this._commonHeaders();
					headers.set("Accept", "text/event-stream");
					const response = await fetchImpl(url, {
						...init,
						headers
					});
					if (response.status === 401 && response.headers.has("www-authenticate")) {
						const { resourceMetadataUrl, scope } = require_auth.extractWWWAuthenticateParams(response);
						this._resourceMetadataUrl = resourceMetadataUrl;
						this._scope = scope;
					}
					return response;
				}
			});
			this._abortController = new AbortController();
			this._eventSource.onerror = (event) => {
				if (event.code === 401 && this._authProvider) {
					this._authThenStart().then(resolve, reject);
					return;
				}
				const error = new SseError(event.code, event.message, event);
				reject(error);
				this.onerror?.(error);
			};
			this._eventSource.onopen = () => {};
			this._eventSource.addEventListener("endpoint", (event) => {
				const messageEvent = event;
				try {
					this._endpoint = new URL(messageEvent.data, this._url);
					if (this._endpoint.origin !== this._url.origin) throw new Error(`Endpoint origin does not match connection origin: ${this._endpoint.origin}`);
				} catch (error) {
					reject(error);
					this.onerror?.(error);
					this.close();
					return;
				}
				resolve();
			});
			this._eventSource.onmessage = (event) => {
				const messageEvent = event;
				let message;
				try {
					message = require_types.JSONRPCMessageSchema.parse(JSON.parse(messageEvent.data));
				} catch (error) {
					this.onerror?.(error);
					return;
				}
				this.onmessage?.(message);
			};
		});
	}
	async start() {
		if (this._eventSource) throw new Error("SSEClientTransport already started! If using Client class, note that connect() calls start() automatically.");
		return await this._startOrAuth();
	}
	/**
	* Call this method after the user has finished authorizing via their user agent and is redirected back to the MCP client application. This will exchange the authorization code for an access token, enabling the next connection attempt to successfully auth.
	*/
	async finishAuth(authorizationCode) {
		if (!this._authProvider) throw new require_auth.UnauthorizedError("No auth provider");
		if (await require_auth.auth(this._authProvider, {
			serverUrl: this._url,
			authorizationCode,
			resourceMetadataUrl: this._resourceMetadataUrl,
			scope: this._scope,
			fetchFn: this._fetchWithInit
		}) !== "AUTHORIZED") throw new require_auth.UnauthorizedError("Failed to authorize");
	}
	async close() {
		this._abortController?.abort();
		this._eventSource?.close();
		this.onclose?.();
	}
	async send(message) {
		if (!this._endpoint) throw new Error("Not connected");
		try {
			const headers = await this._commonHeaders();
			headers.set("content-type", "application/json");
			const init = {
				...this._requestInit,
				method: "POST",
				headers,
				body: JSON.stringify(message),
				signal: this._abortController?.signal
			};
			const response = await (this._fetch ?? fetch)(this._endpoint, init);
			if (!response.ok) {
				const text = await response.text().catch(() => null);
				if (response.status === 401 && this._authProvider) {
					const { resourceMetadataUrl, scope } = require_auth.extractWWWAuthenticateParams(response);
					this._resourceMetadataUrl = resourceMetadataUrl;
					this._scope = scope;
					if (await require_auth.auth(this._authProvider, {
						serverUrl: this._url,
						resourceMetadataUrl: this._resourceMetadataUrl,
						scope: this._scope,
						fetchFn: this._fetchWithInit
					}) !== "AUTHORIZED") throw new require_auth.UnauthorizedError();
					return this.send(message);
				}
				throw new Error(`Error POSTing to endpoint (HTTP ${response.status}): ${text}`);
			}
			await response.body?.cancel();
		} catch (error) {
			this.onerror?.(error);
			throw error;
		}
	}
	setProtocolVersion(version) {
		this._protocolVersion = version;
	}
};
//#endregion
//#region ../../node_modules/isexe/windows.js
var require_windows = /* @__PURE__ */ require_chunk.__commonJSMin(((exports, module) => {
	module.exports = isexe;
	isexe.sync = sync;
	var fs$3 = require("fs");
	function checkPathExt(path, options) {
		var pathext = options.pathExt !== void 0 ? options.pathExt : process.env.PATHEXT;
		if (!pathext) return true;
		pathext = pathext.split(";");
		if (pathext.indexOf("") !== -1) return true;
		for (var i = 0; i < pathext.length; i++) {
			var p = pathext[i].toLowerCase();
			if (p && path.substr(-p.length).toLowerCase() === p) return true;
		}
		return false;
	}
	function checkStat(stat, path, options) {
		if (!stat.isSymbolicLink() && !stat.isFile()) return false;
		return checkPathExt(path, options);
	}
	function isexe(path, options, cb) {
		fs$3.stat(path, function(er, stat) {
			cb(er, er ? false : checkStat(stat, path, options));
		});
	}
	function sync(path, options) {
		return checkStat(fs$3.statSync(path), path, options);
	}
}));
//#endregion
//#region ../../node_modules/isexe/mode.js
var require_mode = /* @__PURE__ */ require_chunk.__commonJSMin(((exports, module) => {
	module.exports = isexe;
	isexe.sync = sync;
	var fs$2 = require("fs");
	function isexe(path, options, cb) {
		fs$2.stat(path, function(er, stat) {
			cb(er, er ? false : checkStat(stat, options));
		});
	}
	function sync(path, options) {
		return checkStat(fs$2.statSync(path), options);
	}
	function checkStat(stat, options) {
		return stat.isFile() && checkMode(stat, options);
	}
	function checkMode(stat, options) {
		var mod = stat.mode;
		var uid = stat.uid;
		var gid = stat.gid;
		var myUid = options.uid !== void 0 ? options.uid : process.getuid && process.getuid();
		var myGid = options.gid !== void 0 ? options.gid : process.getgid && process.getgid();
		var u = parseInt("100", 8);
		var g = parseInt("010", 8);
		var o = parseInt("001", 8);
		var ug = u | g;
		return mod & o || mod & g && gid === myGid || mod & u && uid === myUid || mod & ug && myUid === 0;
	}
}));
//#endregion
//#region ../../node_modules/isexe/index.js
var require_isexe = /* @__PURE__ */ require_chunk.__commonJSMin(((exports, module) => {
	require("fs");
	var core;
	if (process.platform === "win32" || global.TESTING_WINDOWS) core = require_windows();
	else core = require_mode();
	module.exports = isexe;
	isexe.sync = sync;
	function isexe(path, options, cb) {
		if (typeof options === "function") {
			cb = options;
			options = {};
		}
		if (!cb) {
			if (typeof Promise !== "function") throw new TypeError("callback not provided");
			return new Promise(function(resolve, reject) {
				isexe(path, options || {}, function(er, is) {
					if (er) reject(er);
					else resolve(is);
				});
			});
		}
		core(path, options || {}, function(er, is) {
			if (er) {
				if (er.code === "EACCES" || options && options.ignoreErrors) {
					er = null;
					is = false;
				}
			}
			cb(er, is);
		});
	}
	function sync(path, options) {
		try {
			return core.sync(path, options || {});
		} catch (er) {
			if (options && options.ignoreErrors || er.code === "EACCES") return false;
			else throw er;
		}
	}
}));
//#endregion
//#region ../../node_modules/cross-spawn/node_modules/which/which.js
var require_which = /* @__PURE__ */ require_chunk.__commonJSMin(((exports, module) => {
	var isWindows = process.platform === "win32" || process.env.OSTYPE === "cygwin" || process.env.OSTYPE === "msys";
	var path$4 = require("path");
	var COLON = isWindows ? ";" : ":";
	var isexe = require_isexe();
	var getNotFoundError = (cmd) => Object.assign(/* @__PURE__ */ new Error(`not found: ${cmd}`), { code: "ENOENT" });
	var getPathInfo = (cmd, opt) => {
		const colon = opt.colon || COLON;
		const pathEnv = cmd.match(/\//) || isWindows && cmd.match(/\\/) ? [""] : [...isWindows ? [process.cwd()] : [], ...(opt.path || process.env.PATH || "").split(colon)];
		const pathExtExe = isWindows ? opt.pathExt || process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM" : "";
		const pathExt = isWindows ? pathExtExe.split(colon) : [""];
		if (isWindows) {
			if (cmd.indexOf(".") !== -1 && pathExt[0] !== "") pathExt.unshift("");
		}
		return {
			pathEnv,
			pathExt,
			pathExtExe
		};
	};
	var which = (cmd, opt, cb) => {
		if (typeof opt === "function") {
			cb = opt;
			opt = {};
		}
		if (!opt) opt = {};
		const { pathEnv, pathExt, pathExtExe } = getPathInfo(cmd, opt);
		const found = [];
		const step = (i) => new Promise((resolve, reject) => {
			if (i === pathEnv.length) return opt.all && found.length ? resolve(found) : reject(getNotFoundError(cmd));
			const ppRaw = pathEnv[i];
			const pathPart = /^".*"$/.test(ppRaw) ? ppRaw.slice(1, -1) : ppRaw;
			const pCmd = path$4.join(pathPart, cmd);
			resolve(subStep(!pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd : pCmd, i, 0));
		});
		const subStep = (p, i, ii) => new Promise((resolve, reject) => {
			if (ii === pathExt.length) return resolve(step(i + 1));
			const ext = pathExt[ii];
			isexe(p + ext, { pathExt: pathExtExe }, (er, is) => {
				if (!er && is) if (opt.all) found.push(p + ext);
				else return resolve(p + ext);
				return resolve(subStep(p, i, ii + 1));
			});
		});
		return cb ? step(0).then((res) => cb(null, res), cb) : step(0);
	};
	var whichSync = (cmd, opt) => {
		opt = opt || {};
		const { pathEnv, pathExt, pathExtExe } = getPathInfo(cmd, opt);
		const found = [];
		for (let i = 0; i < pathEnv.length; i++) {
			const ppRaw = pathEnv[i];
			const pathPart = /^".*"$/.test(ppRaw) ? ppRaw.slice(1, -1) : ppRaw;
			const pCmd = path$4.join(pathPart, cmd);
			const p = !pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd : pCmd;
			for (let j = 0; j < pathExt.length; j++) {
				const cur = p + pathExt[j];
				try {
					if (isexe.sync(cur, { pathExt: pathExtExe })) if (opt.all) found.push(cur);
					else return cur;
				} catch (ex) {}
			}
		}
		if (opt.all && found.length) return found;
		if (opt.nothrow) return null;
		throw getNotFoundError(cmd);
	};
	module.exports = which;
	which.sync = whichSync;
}));
//#endregion
//#region ../../node_modules/path-key/index.js
var require_path_key = /* @__PURE__ */ require_chunk.__commonJSMin(((exports, module) => {
	var pathKey = (options = {}) => {
		const environment = options.env || process.env;
		if ((options.platform || process.platform) !== "win32") return "PATH";
		return Object.keys(environment).reverse().find((key) => key.toUpperCase() === "PATH") || "Path";
	};
	module.exports = pathKey;
	module.exports.default = pathKey;
}));
//#endregion
//#region ../../node_modules/cross-spawn/lib/util/resolveCommand.js
var require_resolveCommand = /* @__PURE__ */ require_chunk.__commonJSMin(((exports, module) => {
	var path$3 = require("path");
	var which = require_which();
	var getPathKey = require_path_key();
	function resolveCommandAttempt(parsed, withoutPathExt) {
		const env = parsed.options.env || process.env;
		const cwd = process.cwd();
		const hasCustomCwd = parsed.options.cwd != null;
		const shouldSwitchCwd = hasCustomCwd && process.chdir !== void 0 && !process.chdir.disabled;
		if (shouldSwitchCwd) try {
			process.chdir(parsed.options.cwd);
		} catch (err) {}
		let resolved;
		try {
			resolved = which.sync(parsed.command, {
				path: env[getPathKey({ env })],
				pathExt: withoutPathExt ? path$3.delimiter : void 0
			});
		} catch (e) {} finally {
			if (shouldSwitchCwd) process.chdir(cwd);
		}
		if (resolved) resolved = path$3.resolve(hasCustomCwd ? parsed.options.cwd : "", resolved);
		return resolved;
	}
	function resolveCommand(parsed) {
		return resolveCommandAttempt(parsed) || resolveCommandAttempt(parsed, true);
	}
	module.exports = resolveCommand;
}));
//#endregion
//#region ../../node_modules/cross-spawn/lib/util/escape.js
var require_escape = /* @__PURE__ */ require_chunk.__commonJSMin(((exports, module) => {
	var metaCharsRegExp = /([()\][%!^"`<>&|;, *?])/g;
	function escapeCommand(arg) {
		arg = arg.replace(metaCharsRegExp, "^$1");
		return arg;
	}
	function escapeArgument(arg, doubleEscapeMetaChars) {
		arg = `${arg}`;
		arg = arg.replace(/(?=(\\+?)?)\1"/g, "$1$1\\\"");
		arg = arg.replace(/(?=(\\+?)?)\1$/, "$1$1");
		arg = `"${arg}"`;
		arg = arg.replace(metaCharsRegExp, "^$1");
		if (doubleEscapeMetaChars) arg = arg.replace(metaCharsRegExp, "^$1");
		return arg;
	}
	module.exports.command = escapeCommand;
	module.exports.argument = escapeArgument;
}));
//#endregion
//#region ../../node_modules/shebang-regex/index.js
var require_shebang_regex = /* @__PURE__ */ require_chunk.__commonJSMin(((exports, module) => {
	module.exports = /^#!(.*)/;
}));
//#endregion
//#region ../../node_modules/shebang-command/index.js
var require_shebang_command = /* @__PURE__ */ require_chunk.__commonJSMin(((exports, module) => {
	var shebangRegex = require_shebang_regex();
	module.exports = (string = "") => {
		const match = string.match(shebangRegex);
		if (!match) return null;
		const [path, argument] = match[0].replace(/#! ?/, "").split(" ");
		const binary = path.split("/").pop();
		if (binary === "env") return argument;
		return argument ? `${binary} ${argument}` : binary;
	};
}));
//#endregion
//#region ../../node_modules/cross-spawn/lib/util/readShebang.js
var require_readShebang = /* @__PURE__ */ require_chunk.__commonJSMin(((exports, module) => {
	var fs$1 = require("fs");
	var shebangCommand = require_shebang_command();
	function readShebang(command) {
		const size = 150;
		const buffer = Buffer.alloc(size);
		let fd;
		try {
			fd = fs$1.openSync(command, "r");
			fs$1.readSync(fd, buffer, 0, size, 0);
			fs$1.closeSync(fd);
		} catch (e) {}
		return shebangCommand(buffer.toString());
	}
	module.exports = readShebang;
}));
//#endregion
//#region ../../node_modules/cross-spawn/lib/parse.js
var require_parse = /* @__PURE__ */ require_chunk.__commonJSMin(((exports, module) => {
	var path$2 = require("path");
	var resolveCommand = require_resolveCommand();
	var escape = require_escape();
	var readShebang = require_readShebang();
	var isWin = process.platform === "win32";
	var isExecutableRegExp = /\.(?:com|exe)$/i;
	var isCmdShimRegExp = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;
	function detectShebang(parsed) {
		parsed.file = resolveCommand(parsed);
		const shebang = parsed.file && readShebang(parsed.file);
		if (shebang) {
			parsed.args.unshift(parsed.file);
			parsed.command = shebang;
			return resolveCommand(parsed);
		}
		return parsed.file;
	}
	function parseNonShell(parsed) {
		if (!isWin) return parsed;
		const commandFile = detectShebang(parsed);
		const needsShell = !isExecutableRegExp.test(commandFile);
		if (parsed.options.forceShell || needsShell) {
			const needsDoubleEscapeMetaChars = isCmdShimRegExp.test(commandFile);
			parsed.command = path$2.normalize(parsed.command);
			parsed.command = escape.command(parsed.command);
			parsed.args = parsed.args.map((arg) => escape.argument(arg, needsDoubleEscapeMetaChars));
			parsed.args = [
				"/d",
				"/s",
				"/c",
				`"${[parsed.command].concat(parsed.args).join(" ")}"`
			];
			parsed.command = process.env.comspec || "cmd.exe";
			parsed.options.windowsVerbatimArguments = true;
		}
		return parsed;
	}
	function parse(command, args, options) {
		if (args && !Array.isArray(args)) {
			options = args;
			args = null;
		}
		args = args ? args.slice(0) : [];
		options = Object.assign({}, options);
		const parsed = {
			command,
			args,
			options,
			file: void 0,
			original: {
				command,
				args
			}
		};
		return options.shell ? parsed : parseNonShell(parsed);
	}
	module.exports = parse;
}));
//#endregion
//#region ../../node_modules/cross-spawn/lib/enoent.js
var require_enoent = /* @__PURE__ */ require_chunk.__commonJSMin(((exports, module) => {
	var isWin = process.platform === "win32";
	function notFoundError(original, syscall) {
		return Object.assign(/* @__PURE__ */ new Error(`${syscall} ${original.command} ENOENT`), {
			code: "ENOENT",
			errno: "ENOENT",
			syscall: `${syscall} ${original.command}`,
			path: original.command,
			spawnargs: original.args
		});
	}
	function hookChildProcess(cp, parsed) {
		if (!isWin) return;
		const originalEmit = cp.emit;
		cp.emit = function(name, arg1) {
			if (name === "exit") {
				const err = verifyENOENT(arg1, parsed);
				if (err) return originalEmit.call(cp, "error", err);
			}
			return originalEmit.apply(cp, arguments);
		};
	}
	function verifyENOENT(status, parsed) {
		if (isWin && status === 1 && !parsed.file) return notFoundError(parsed.original, "spawn");
		return null;
	}
	function verifyENOENTSync(status, parsed) {
		if (isWin && status === 1 && !parsed.file) return notFoundError(parsed.original, "spawnSync");
		return null;
	}
	module.exports = {
		hookChildProcess,
		verifyENOENT,
		verifyENOENTSync,
		notFoundError
	};
}));
//#endregion
//#region ../../node_modules/cross-spawn/index.js
var require_cross_spawn = /* @__PURE__ */ require_chunk.__commonJSMin(((exports, module) => {
	var cp = require("child_process");
	var parse = require_parse();
	var enoent = require_enoent();
	function spawn(command, args, options) {
		const parsed = parse(command, args, options);
		const spawned = cp.spawn(parsed.command, parsed.args, parsed.options);
		enoent.hookChildProcess(spawned, parsed);
		return spawned;
	}
	function spawnSync(command, args, options) {
		const parsed = parse(command, args, options);
		const result = cp.spawnSync(parsed.command, parsed.args, parsed.options);
		result.error = result.error || enoent.verifyENOENTSync(result.status, parsed);
		return result;
	}
	module.exports = spawn;
	module.exports.spawn = spawn;
	module.exports.sync = spawnSync;
	module.exports._parse = parse;
	module.exports._enoent = enoent;
}));
//#endregion
//#region ../../node_modules/@modelcontextprotocol/sdk/dist/esm/shared/stdio.js
var import_cross_spawn = /* @__PURE__ */ require_chunk.__toESM(require_cross_spawn(), 1);
/**
* Buffers a continuous stdio stream into discrete JSON-RPC messages.
*/
var ReadBuffer = class {
	append(chunk) {
		this._buffer = this._buffer ? Buffer.concat([this._buffer, chunk]) : chunk;
	}
	readMessage() {
		if (!this._buffer) return null;
		const index = this._buffer.indexOf("\n");
		if (index === -1) return null;
		const line = this._buffer.toString("utf8", 0, index).replace(/\r$/, "");
		this._buffer = this._buffer.subarray(index + 1);
		return deserializeMessage(line);
	}
	clear() {
		this._buffer = void 0;
	}
};
function deserializeMessage(line) {
	return require_types.JSONRPCMessageSchema.parse(JSON.parse(line));
}
function serializeMessage(message) {
	return JSON.stringify(message) + "\n";
}
//#endregion
//#region ../../node_modules/@modelcontextprotocol/sdk/dist/esm/client/stdio.js
/**
* Environment variables to inherit by default, if an environment is not explicitly given.
*/
var DEFAULT_INHERITED_ENV_VARS = node_process.default.platform === "win32" ? [
	"APPDATA",
	"HOMEDRIVE",
	"HOMEPATH",
	"LOCALAPPDATA",
	"PATH",
	"PROCESSOR_ARCHITECTURE",
	"SYSTEMDRIVE",
	"SYSTEMROOT",
	"TEMP",
	"USERNAME",
	"USERPROFILE",
	"PROGRAMFILES"
] : [
	"HOME",
	"LOGNAME",
	"PATH",
	"SHELL",
	"TERM",
	"USER"
];
/**
* Returns a default environment object including only environment variables deemed safe to inherit.
*/
function getDefaultEnvironment() {
	const env = {};
	for (const key of DEFAULT_INHERITED_ENV_VARS) {
		const value = node_process.default.env[key];
		if (value === void 0) continue;
		if (value.startsWith("()")) continue;
		env[key] = value;
	}
	return env;
}
/**
* Client transport for stdio: this will connect to a server by spawning a process and communicating with it over stdin/stdout.
*
* This transport is only available in Node.js environments.
*/
var StdioClientTransport = class {
	constructor(server) {
		this._readBuffer = new ReadBuffer();
		this._stderrStream = null;
		this._serverParams = server;
		if (server.stderr === "pipe" || server.stderr === "overlapped") this._stderrStream = new node_stream.PassThrough();
	}
	/**
	* Starts the server process and prepares to communicate with it.
	*/
	async start() {
		if (this._process) throw new Error("StdioClientTransport already started! If using Client class, note that connect() calls start() automatically.");
		return new Promise((resolve, reject) => {
			this._process = (0, import_cross_spawn.default)(this._serverParams.command, this._serverParams.args ?? [], {
				env: {
					...getDefaultEnvironment(),
					...this._serverParams.env
				},
				stdio: [
					"pipe",
					"pipe",
					this._serverParams.stderr ?? "inherit"
				],
				shell: false,
				windowsHide: node_process.default.platform === "win32",
				cwd: this._serverParams.cwd
			});
			this._process.on("error", (error) => {
				reject(error);
				this.onerror?.(error);
			});
			this._process.on("spawn", () => {
				resolve();
			});
			this._process.on("close", (_code) => {
				this._process = void 0;
				this.onclose?.();
			});
			this._process.stdin?.on("error", (error) => {
				this.onerror?.(error);
			});
			this._process.stdout?.on("data", (chunk) => {
				this._readBuffer.append(chunk);
				this.processReadBuffer();
			});
			this._process.stdout?.on("error", (error) => {
				this.onerror?.(error);
			});
			if (this._stderrStream && this._process.stderr) this._process.stderr.pipe(this._stderrStream);
		});
	}
	/**
	* The stderr stream of the child process, if `StdioServerParameters.stderr` was set to "pipe" or "overlapped".
	*
	* If stderr piping was requested, a PassThrough stream is returned _immediately_, allowing callers to
	* attach listeners before the start method is invoked. This prevents loss of any early
	* error output emitted by the child process.
	*/
	get stderr() {
		if (this._stderrStream) return this._stderrStream;
		return this._process?.stderr ?? null;
	}
	/**
	* The child process pid spawned by this transport.
	*
	* This is only available after the transport has been started.
	*/
	get pid() {
		return this._process?.pid ?? null;
	}
	processReadBuffer() {
		while (true) try {
			const message = this._readBuffer.readMessage();
			if (message === null) break;
			this.onmessage?.(message);
		} catch (error) {
			this.onerror?.(error);
		}
	}
	async close() {
		if (this._process) {
			const processToClose = this._process;
			this._process = void 0;
			const closePromise = new Promise((resolve) => {
				processToClose.once("close", () => {
					resolve();
				});
			});
			try {
				processToClose.stdin?.end();
			} catch {}
			await Promise.race([closePromise, new Promise((resolve) => setTimeout(resolve, 2e3).unref())]);
			if (processToClose.exitCode === null) {
				try {
					processToClose.kill("SIGTERM");
				} catch {}
				await Promise.race([closePromise, new Promise((resolve) => setTimeout(resolve, 2e3).unref())]);
			}
			if (processToClose.exitCode === null) try {
				processToClose.kill("SIGKILL");
			} catch {}
		}
		this._readBuffer.clear();
	}
	send(message) {
		return new Promise((resolve) => {
			if (!this._process?.stdin) throw new Error("Not connected");
			const json = serializeMessage(message);
			if (this._process.stdin.write(json)) resolve();
			else this._process.stdin.once("drain", resolve);
		});
	}
};
//#endregion
//#region ../../node_modules/eventsource-parser/dist/stream.js
var EventSourceParserStream = class extends TransformStream {
	constructor({ onError, onRetry, onComment } = {}) {
		let parser;
		super({
			start(controller) {
				parser = createParser({
					onEvent: (event) => {
						controller.enqueue(event);
					},
					onError(error) {
						onError === "terminate" ? controller.error(error) : typeof onError == "function" && onError(error);
					},
					onRetry,
					onComment
				});
			},
			transform(chunk) {
				parser.feed(chunk);
			}
		});
	}
};
//#endregion
//#region ../../node_modules/@modelcontextprotocol/sdk/dist/esm/client/streamableHttp.js
var DEFAULT_STREAMABLE_HTTP_RECONNECTION_OPTIONS = {
	initialReconnectionDelay: 1e3,
	maxReconnectionDelay: 3e4,
	reconnectionDelayGrowFactor: 1.5,
	maxRetries: 2
};
var StreamableHTTPError = class extends Error {
	constructor(code, message) {
		super(`Streamable HTTP error: ${message}`);
		this.code = code;
	}
};
/**
* Client transport for Streamable HTTP: this implements the MCP Streamable HTTP transport specification.
* It will connect to a server using HTTP POST for sending messages and HTTP GET with Server-Sent Events
* for receiving messages.
*/
var StreamableHTTPClientTransport = class {
	constructor(url, opts) {
		this._hasCompletedAuthFlow = false;
		this._url = url;
		this._resourceMetadataUrl = void 0;
		this._scope = void 0;
		this._requestInit = opts?.requestInit;
		this._authProvider = opts?.authProvider;
		this._fetch = opts?.fetch;
		this._fetchWithInit = createFetchWithInit(opts?.fetch, opts?.requestInit);
		this._sessionId = opts?.sessionId;
		this._reconnectionOptions = opts?.reconnectionOptions ?? DEFAULT_STREAMABLE_HTTP_RECONNECTION_OPTIONS;
	}
	async _authThenStart() {
		if (!this._authProvider) throw new require_auth.UnauthorizedError("No auth provider");
		let result;
		try {
			result = await require_auth.auth(this._authProvider, {
				serverUrl: this._url,
				resourceMetadataUrl: this._resourceMetadataUrl,
				scope: this._scope,
				fetchFn: this._fetchWithInit
			});
		} catch (error) {
			this.onerror?.(error);
			throw error;
		}
		if (result !== "AUTHORIZED") throw new require_auth.UnauthorizedError();
		return await this._startOrAuthSse({ resumptionToken: void 0 });
	}
	async _commonHeaders() {
		const headers = {};
		if (this._authProvider) {
			const tokens = await this._authProvider.tokens();
			if (tokens) headers["Authorization"] = `Bearer ${tokens.access_token}`;
		}
		if (this._sessionId) headers["mcp-session-id"] = this._sessionId;
		if (this._protocolVersion) headers["mcp-protocol-version"] = this._protocolVersion;
		const extraHeaders = normalizeHeaders(this._requestInit?.headers);
		return new Headers({
			...headers,
			...extraHeaders
		});
	}
	async _startOrAuthSse(options) {
		const { resumptionToken } = options;
		try {
			const headers = await this._commonHeaders();
			headers.set("Accept", "text/event-stream");
			if (resumptionToken) headers.set("last-event-id", resumptionToken);
			const response = await (this._fetch ?? fetch)(this._url, {
				method: "GET",
				headers,
				signal: this._abortController?.signal
			});
			if (!response.ok) {
				await response.body?.cancel();
				if (response.status === 401 && this._authProvider) return await this._authThenStart();
				if (response.status === 405) return;
				throw new StreamableHTTPError(response.status, `Failed to open SSE stream: ${response.statusText}`);
			}
			this._handleSseStream(response.body, options, true);
		} catch (error) {
			this.onerror?.(error);
			throw error;
		}
	}
	/**
	* Calculates the next reconnection delay using  backoff algorithm
	*
	* @param attempt Current reconnection attempt count for the specific stream
	* @returns Time to wait in milliseconds before next reconnection attempt
	*/
	_getNextReconnectionDelay(attempt) {
		if (this._serverRetryMs !== void 0) return this._serverRetryMs;
		const initialDelay = this._reconnectionOptions.initialReconnectionDelay;
		const growFactor = this._reconnectionOptions.reconnectionDelayGrowFactor;
		const maxDelay = this._reconnectionOptions.maxReconnectionDelay;
		return Math.min(initialDelay * Math.pow(growFactor, attempt), maxDelay);
	}
	/**
	* Schedule a reconnection attempt using server-provided retry interval or backoff
	*
	* @param lastEventId The ID of the last received event for resumability
	* @param attemptCount Current reconnection attempt count for this specific stream
	*/
	_scheduleReconnection(options, attemptCount = 0) {
		const maxRetries = this._reconnectionOptions.maxRetries;
		if (attemptCount >= maxRetries) {
			this.onerror?.(/* @__PURE__ */ new Error(`Maximum reconnection attempts (${maxRetries}) exceeded.`));
			return;
		}
		const delay = this._getNextReconnectionDelay(attemptCount);
		this._reconnectionTimeout = setTimeout(() => {
			this._startOrAuthSse(options).catch((error) => {
				this.onerror?.(/* @__PURE__ */ new Error(`Failed to reconnect SSE stream: ${error instanceof Error ? error.message : String(error)}`));
				this._scheduleReconnection(options, attemptCount + 1);
			});
		}, delay);
	}
	_handleSseStream(stream, options, isReconnectable) {
		if (!stream) return;
		const { onresumptiontoken, replayMessageId } = options;
		let lastEventId;
		let hasPrimingEvent = false;
		let receivedResponse = false;
		const processStream = async () => {
			try {
				const reader = stream.pipeThrough(new TextDecoderStream()).pipeThrough(new EventSourceParserStream({ onRetry: (retryMs) => {
					this._serverRetryMs = retryMs;
				} })).getReader();
				while (true) {
					const { value: event, done } = await reader.read();
					if (done) break;
					if (event.id) {
						lastEventId = event.id;
						hasPrimingEvent = true;
						onresumptiontoken?.(event.id);
					}
					if (!event.data) continue;
					if (!event.event || event.event === "message") try {
						const message = require_types.JSONRPCMessageSchema.parse(JSON.parse(event.data));
						if (require_types.isJSONRPCResultResponse(message)) {
							receivedResponse = true;
							if (replayMessageId !== void 0) message.id = replayMessageId;
						}
						this.onmessage?.(message);
					} catch (error) {
						this.onerror?.(error);
					}
				}
				if ((isReconnectable || hasPrimingEvent) && !receivedResponse && this._abortController && !this._abortController.signal.aborted) this._scheduleReconnection({
					resumptionToken: lastEventId,
					onresumptiontoken,
					replayMessageId
				}, 0);
			} catch (error) {
				this.onerror?.(/* @__PURE__ */ new Error(`SSE stream disconnected: ${error}`));
				if ((isReconnectable || hasPrimingEvent) && !receivedResponse && this._abortController && !this._abortController.signal.aborted) try {
					this._scheduleReconnection({
						resumptionToken: lastEventId,
						onresumptiontoken,
						replayMessageId
					}, 0);
				} catch (error) {
					this.onerror?.(/* @__PURE__ */ new Error(`Failed to reconnect: ${error instanceof Error ? error.message : String(error)}`));
				}
			}
		};
		processStream();
	}
	async start() {
		if (this._abortController) throw new Error("StreamableHTTPClientTransport already started! If using Client class, note that connect() calls start() automatically.");
		this._abortController = new AbortController();
	}
	/**
	* Call this method after the user has finished authorizing via their user agent and is redirected back to the MCP client application. This will exchange the authorization code for an access token, enabling the next connection attempt to successfully auth.
	*/
	async finishAuth(authorizationCode) {
		if (!this._authProvider) throw new require_auth.UnauthorizedError("No auth provider");
		if (await require_auth.auth(this._authProvider, {
			serverUrl: this._url,
			authorizationCode,
			resourceMetadataUrl: this._resourceMetadataUrl,
			scope: this._scope,
			fetchFn: this._fetchWithInit
		}) !== "AUTHORIZED") throw new require_auth.UnauthorizedError("Failed to authorize");
	}
	async close() {
		if (this._reconnectionTimeout) {
			clearTimeout(this._reconnectionTimeout);
			this._reconnectionTimeout = void 0;
		}
		this._abortController?.abort();
		this.onclose?.();
	}
	async send(message, options) {
		try {
			const { resumptionToken, onresumptiontoken } = options || {};
			if (resumptionToken) {
				this._startOrAuthSse({
					resumptionToken,
					replayMessageId: require_types.isJSONRPCRequest(message) ? message.id : void 0
				}).catch((err) => this.onerror?.(err));
				return;
			}
			const headers = await this._commonHeaders();
			headers.set("content-type", "application/json");
			headers.set("accept", "application/json, text/event-stream");
			const init = {
				...this._requestInit,
				method: "POST",
				headers,
				body: JSON.stringify(message),
				signal: this._abortController?.signal
			};
			const response = await (this._fetch ?? fetch)(this._url, init);
			const sessionId = response.headers.get("mcp-session-id");
			if (sessionId) this._sessionId = sessionId;
			if (!response.ok) {
				const text = await response.text().catch(() => null);
				if (response.status === 401 && this._authProvider) {
					if (this._hasCompletedAuthFlow) throw new StreamableHTTPError(401, "Server returned 401 after successful authentication");
					const { resourceMetadataUrl, scope } = require_auth.extractWWWAuthenticateParams(response);
					this._resourceMetadataUrl = resourceMetadataUrl;
					this._scope = scope;
					if (await require_auth.auth(this._authProvider, {
						serverUrl: this._url,
						resourceMetadataUrl: this._resourceMetadataUrl,
						scope: this._scope,
						fetchFn: this._fetchWithInit
					}) !== "AUTHORIZED") throw new require_auth.UnauthorizedError();
					this._hasCompletedAuthFlow = true;
					return this.send(message);
				}
				if (response.status === 403 && this._authProvider) {
					const { resourceMetadataUrl, scope, error } = require_auth.extractWWWAuthenticateParams(response);
					if (error === "insufficient_scope") {
						const wwwAuthHeader = response.headers.get("WWW-Authenticate");
						if (this._lastUpscopingHeader === wwwAuthHeader) throw new StreamableHTTPError(403, "Server returned 403 after trying upscoping");
						if (scope) this._scope = scope;
						if (resourceMetadataUrl) this._resourceMetadataUrl = resourceMetadataUrl;
						this._lastUpscopingHeader = wwwAuthHeader ?? void 0;
						if (await require_auth.auth(this._authProvider, {
							serverUrl: this._url,
							resourceMetadataUrl: this._resourceMetadataUrl,
							scope: this._scope,
							fetchFn: this._fetch
						}) !== "AUTHORIZED") throw new require_auth.UnauthorizedError();
						return this.send(message);
					}
				}
				throw new StreamableHTTPError(response.status, `Error POSTing to endpoint: ${text}`);
			}
			this._hasCompletedAuthFlow = false;
			this._lastUpscopingHeader = void 0;
			if (response.status === 202) {
				await response.body?.cancel();
				if (require_types.isInitializedNotification(message)) this._startOrAuthSse({ resumptionToken: void 0 }).catch((err) => this.onerror?.(err));
				return;
			}
			const hasRequests = (Array.isArray(message) ? message : [message]).filter((msg) => "method" in msg && "id" in msg && msg.id !== void 0).length > 0;
			const contentType = response.headers.get("content-type");
			if (hasRequests) if (contentType?.includes("text/event-stream")) this._handleSseStream(response.body, { onresumptiontoken }, false);
			else if (contentType?.includes("application/json")) {
				const data = await response.json();
				const responseMessages = Array.isArray(data) ? data.map((msg) => require_types.JSONRPCMessageSchema.parse(msg)) : [require_types.JSONRPCMessageSchema.parse(data)];
				for (const msg of responseMessages) this.onmessage?.(msg);
			} else {
				await response.body?.cancel();
				throw new StreamableHTTPError(-1, `Unexpected content type: ${contentType}`);
			}
			else await response.body?.cancel();
		} catch (error) {
			this.onerror?.(error);
			throw error;
		}
	}
	get sessionId() {
		return this._sessionId;
	}
	/**
	* Terminates the current session by sending a DELETE request to the server.
	*
	* Clients that no longer need a particular session
	* (e.g., because the user is leaving the client application) SHOULD send an
	* HTTP DELETE to the MCP endpoint with the Mcp-Session-Id header to explicitly
	* terminate the session.
	*
	* The server MAY respond with HTTP 405 Method Not Allowed, indicating that
	* the server does not allow clients to terminate sessions.
	*/
	async terminateSession() {
		if (!this._sessionId) return;
		try {
			const headers = await this._commonHeaders();
			const init = {
				...this._requestInit,
				method: "DELETE",
				headers,
				signal: this._abortController?.signal
			};
			const response = await (this._fetch ?? fetch)(this._url, init);
			await response.body?.cancel();
			if (!response.ok && response.status !== 405) throw new StreamableHTTPError(response.status, `Failed to terminate session: ${response.statusText}`);
			this._sessionId = void 0;
		} catch (error) {
			this.onerror?.(error);
			throw error;
		}
	}
	setProtocolVersion(version) {
		this._protocolVersion = version;
	}
	get protocolVersion() {
		return this._protocolVersion;
	}
	/**
	* Resume an SSE stream from a previous event ID.
	* Opens a GET SSE connection with Last-Event-ID header to replay missed events.
	*
	* @param lastEventId The event ID to resume from
	* @param options Optional callback to receive new resumption tokens
	*/
	async resumeStream(lastEventId, options) {
		await this._startOrAuthSse({
			resumptionToken: lastEventId,
			onresumptiontoken: options?.onresumptiontoken
		});
	}
};
//#endregion
//#region ../../packages/workbuddy-server/src/connector/connector-managed-npx-resolver.ts
function parseNpxPackageSpec(args) {
	const safeArgs = args ?? [];
	const packageIndex = safeArgs.findIndex((arg) => arg && !arg.startsWith("-"));
	if (packageIndex < 0) return;
	const packageSpec = safeArgs[packageIndex];
	const versionSeparator = packageSpec.startsWith("@") ? packageSpec.indexOf("@", 1) : packageSpec.indexOf("@");
	return {
		packageSpec,
		packageName: versionSeparator > 0 ? packageSpec.slice(0, versionSeparator) : packageSpec,
		serverArgs: safeArgs.slice(packageIndex + 1)
	};
}
function getManagedNpmCliPath(runtime) {
	return (0, path.join)((0, path.dirname)(runtime.nodeInfo.executablePath), "node_modules", "npm", "bin", "npm-cli.js");
}
function getStableNpxPackageDir(packageSpec) {
	return (0, path.join)(CLI_CONNECTOR_PACKAGES_DIR, "mcp-npx-packages", crypto.default.createHash("sha256").update(packageSpec).digest("hex").slice(0, 12));
}
async function ensureStableNpxPackage(packageSpec, packageDir, runtime, env, logger) {
	const packageJsonPath = (0, path.join)(packageDir, "package.json");
	(0, fs.mkdirSync)(packageDir, { recursive: true });
	if (!(0, fs.existsSync)(packageJsonPath)) (0, fs.writeFileSync)(packageJsonPath, JSON.stringify({ private: true }, null, 2), "utf-8");
	logger.info(`[ConnectorMcpProxy] stdio MCP npx install start: package=${packageSpec} dir=${packageDir}`);
	await new Promise((resolvePromise, rejectPromise) => {
		(0, child_process.execFile)(runtime.nodeInfo.executablePath, [
			getManagedNpmCliPath(runtime),
			"install",
			"--no-audit",
			"--no-fund",
			packageSpec
		], {
			cwd: packageDir,
			env,
			windowsHide: true,
			maxBuffer: 1024 * 1024 * 4
		}, (error, stdout, stderr) => {
			if (error) {
				const output = (stderr || stdout || error.message).trim();
				logger.warn(`[ConnectorMcpProxy] stdio MCP npx install failed: package=${packageSpec} error=${output}`);
				rejectPromise(/* @__PURE__ */ new Error(`npm install ${packageSpec} failed: ${output}`));
				return;
			}
			logger.info(`[ConnectorMcpProxy] stdio MCP npx install success: package=${packageSpec}`);
			resolvePromise();
		});
	});
}
function resolvePackageBin(packageDir, packageName, runtime, serverArgs) {
	const installedPackageDir = (0, path.join)(packageDir, "node_modules", ...packageName.split("/"));
	const { bin } = JSON.parse((0, fs.readFileSync)((0, path.join)(installedPackageDir, "package.json"), "utf-8"));
	if (!bin) return;
	const fallbackBinName = packageName.split("/").pop() ?? packageName;
	const binNames = typeof bin === "string" ? [] : Object.keys(bin);
	if (typeof bin !== "string" && binNames.length === 0) return;
	const binName = typeof bin === "string" ? fallbackBinName : binNames.includes(fallbackBinName) ? fallbackBinName : binNames[0];
	const binRelativePath = typeof bin === "string" ? bin : bin[binName];
	const nativeBin = (0, path.join)(installedPackageDir, "node_modules", ".bin_real", `${binName}.exe`);
	if (process.platform === "win32" && (0, fs.existsSync)(nativeBin)) return {
		command: nativeBin,
		args: serverArgs
	};
	const binPath = (0, path.resolve)(installedPackageDir, binRelativePath);
	if (process.platform === "win32" && (0, path.extname)(binPath).toLowerCase() === ".cmd") return {
		command: "cmd.exe",
		args: [
			"/c",
			binPath,
			...serverArgs
		]
	};
	return {
		command: runtime.nodeInfo.executablePath,
		args: [binPath, ...serverArgs]
	};
}
async function resolveManagedNpxCommand(options) {
	const { configId, command, args, runtime, env, logger } = options;
	if (process.platform !== "win32" || command !== "npx" || !runtime) return {
		command,
		args
	};
	const parsed = parseNpxPackageSpec(args);
	if (!parsed) return {
		command,
		args
	};
	try {
		const packageDir = getStableNpxPackageDir(parsed.packageSpec);
		logger.info(`[ConnectorMcpProxy] stdio MCP ${configId} npx resolve start: package=${parsed.packageSpec} packageName=${parsed.packageName} args=${parsed.serverArgs.length} dir=${packageDir}`);
		await ensureStableNpxPackage(parsed.packageSpec, packageDir, runtime, env, logger);
		const resolved = resolvePackageBin(packageDir, parsed.packageName, runtime, parsed.serverArgs);
		if (resolved) {
			logger.info(`[ConnectorMcpProxy] stdio MCP ${configId} resolved npx package ${parsed.packageSpec} to ${resolved.command}`);
			logger.info(`[ConnectorMcpProxy] stdio MCP ${configId} npx resolve success: package=${parsed.packageSpec} command=${resolved.command} args=${resolved.args?.length ?? 0}`);
			return resolved;
		}
		logger.warn(`[ConnectorMcpProxy] stdio MCP ${configId} npx resolve empty: package=${parsed.packageSpec} packageName=${parsed.packageName} dir=${packageDir}`);
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		logger.warn(`[ConnectorMcpProxy] stdio MCP ${configId} failed to resolve npx package; falling back to npx: ${message}`);
	}
	return {
		command,
		args
	};
}
//#endregion
//#region ../../packages/workbuddy-server/src/connector/connector-mcp-proxy.ts
/**
* Connector MCP 代理 — 连接池 + 工具路由
*
* 职责：
* 1. 管理 N 个到真实 MCP Server 的客户端连接（每个 connector 一个）
* 2. 维护工具路由表（toolName → configId → client）
* 3. 聚合所有 connector 的工具列表
* 4. 转发 tool call 到对应的 MCP Client
*
* 使用 @modelcontextprotocol/sdk 的 Client 直连 MCP Server，
* 同时支持 stdio / SSE / Streamable HTTP 三种 transport，
* 支持 timeout 配置和 OAuth 认证。
*/
require_log_acl_guard.init_src();
require_common$2.init_decorateMetadata();
require_common$2.init_decorate();
var _ref$7, _ref2$4, _ref3$2, _ConnectorMcpProxy;
var DEFAULT_CONNECTOR_MCP_PROXY_HOST_CAPABILITIES = {
	openExternal: async () => {
		throw new Error("ConnectorMcpProxy host capability openExternal is not available");
	},
	getAppVersion: () => void 0,
	sendRuntimeProgress: () => {
		throw new Error("ConnectorMcpProxy host capability sendRuntimeProgress is not available");
	}
};
/**
* Temporarily inject extra headers into an MCP Client's underlying HTTP transport.
* Skips silently for stdio transports (no HTTP headers).
*/
async function withExtraHeaders(client, headers, operation) {
	if (!headers || Object.keys(headers).length === 0) return operation();
	const transport = client._transport;
	if (!transport || typeof transport !== "object") return operation();
	const prev = transport._requestInit;
	transport._requestInit = {
		...prev ?? {},
		headers: {
			...toHeaderRecord(prev?.headers),
			...headers
		}
	};
	try {
		return await operation();
	} finally {
		transport._requestInit = prev;
	}
}
function toHeaderRecord(headers) {
	if (!headers) return {};
	if (typeof headers.forEach === "function") {
		const result = {};
		headers.forEach((value, key) => {
			result[key] = value;
		});
		return result;
	}
	if (Array.isArray(headers)) return Object.fromEntries(headers.map(([key, value]) => [String(key), String(value)]));
	if (typeof headers === "object") return Object.fromEntries(Object.entries(headers).map(([key, value]) => [key, String(value)]));
	return {};
}
/** 内置 Ardot MCP 的 configId（用于 transport 生命周期日志中加专属前缀，便于 grep） */
var ARDOT_MCP_CONFIG_ID = "custom-mcp:ardot";
var ARDOT_MCP_DIAG_PREFIX = "[ArdotMCPDiag]";
var AUTH_INJECTION_LOG_PREFIX = "[ConnectorAuthInjection]";
var HIDDEN_CLI_TOOL_CONNECTORS = new Set(["tencent-docs", "tencent-docs-oa"]);
var ARDOT_CREATE_DESIGN_TOOL_NAME = "ardot_create_design";
var ARDOT_CREATE_DESIGN_ORIGINAL_TOOL_NAME = "create_design";
/**
* 官方 `connector:*` 的 stdio command 命中以下值时，即便 marketplace 未声明
* `runtime.type='node'` 也自动通过 binary-manager 准备 Node runtime（详见
* `maybeInjectNodeRuntime` 的注释）。
*
* 自定义 MCP（`custom-mcp:*`）默认不在此兜底范围内，避免改变用户预期；
* 自定义 MCP 想用 WorkBuddy 托管 Node 时，应显式声明 `runtime: { type: 'node' }`。
*/
var NODE_AUTO_FALLBACK_COMMANDS = new Set([
	"node",
	"npm",
	"npx"
]);
var ConnectorMcpProxy = class ConnectorMcpProxy {
	static {
		_ConnectorMcpProxy = this;
	}
	logger;
	authService;
	/**
	* 业务监控上报器。运行时读模块级 reporter（由宿主在 bootstrap 时经
	* `setConnectorMetricReporter` 注入，详见 connector-mcp-proxy-metric.ts）；
	* 未注入时所有上报安全降级为 noop。
	*/
	metric = new ConnectorMetricReporter();
	hostCapabilities = DEFAULT_CONNECTOR_MCP_PROXY_HOST_CAPABILITIES;
	setHostCapabilities(capabilities) {
		this.hostCapabilities = {
			...this.hostCapabilities,
			...capabilities
		};
	}
	/** IOA 服务端 MCP 认证管理器（由 ConnectorService 注入） */
	ioaAuth;
	setIoaServerSideAuth(auth) {
		this.ioaAuth = auth;
	}
	/**
	* Node.js / Python 等运行时管理器（来自 @genie/binary-manager，可选注入）。
	*
	* 当 stdio MCP 的 `serverConfig.runtime?.type === 'node'`，或官方
	* `connector:*` 的 stdio command 命中 `node`/`npm`/`npx` 时，会通过它准备
	* Node runtime 并把 PATH/npm_config_* 注入到 stdio 子进程 env。
	*
	* 未注入（理论上不应该发生，因为 binary-manager 已在 desktop 启动时初始化）
	* 时降级为 "继承主进程 PATH" 的老行为 —— 用户若系统已装 Node 仍可工作，
	* 否则 spawn 时报 ENOENT/command not found，错误源比 WorkBuddy 内部错误更易理解。
	*/
	binaryManager;
	/** 连接池：configId → 内部连接条目 */
	clients = /* @__PURE__ */ new Map();
	/**
	* 工具路由：prefixedToolName → 候选 connector 列表（按 priority 降序）。
	*
	* 设计动机（issue: lexiang MCP 撞名）：
	*   官方 connector（如 `connector:lexiang`，资料库授权）和用户在 mcp.json
	*   自配的 `custom-mcp:lexiang` 会产生同样的 short name `lexiang`，从而
	*   写入相同的 prefixedToolName（如 `lexiang_search_knowledge`）。
	*
	*   旧实现是 `Map<name, configId>` 单值——后写入者覆盖先写入者，谁先
	*   连上完全取决于异步连接顺序；并且 disconnect 一方时另一方的路由
	*   被一并清空，要重启客户端才能恢复。
	*
	*   现在改为多候选数组：
	*     - upsertToolRoute 写入时按 configId 前缀打 priority
	*       （connector:* 100 > plugin-mcp:* 50 > custom-mcp:* 10）
	*     - removeToolRoute 只移除指定 configId 的候选，其余继续兜底
	*     - resolveToolRoute 调用时优先选 status='connected' 的最高优先级
	*       候选；都没 connected 时退回到第一个候选（保持旧行为可读性）
	*
	*   效果：
	*     - 资料库 connected 时 `lexiang_*` 一律走资料库（priority=100）
	*     - 资料库 error/unauthorized 时自动降级到 custom-mcp:lexiang 兜底
	*     - 用户在 mcp.json 里删掉 custom 的 `lexiang` 后，资料库候选仍在，
	*       不需要重启客户端
	*
	*   同一 priority 体系也被 listAllTools()/getToolServerMap() 复用，用于
	*   构造工具暴露面的 short-name primary 视图，避免低优 custom 工具污染
	*   LLM 可见工具表。
	*/
	toolRoutes = /* @__PURE__ */ new Map();
	/** suppression warn 去重，避免 tools/list 高频请求重复刷日志。 */
	toolExposureSuppressionLogKeys = /* @__PURE__ */ new Set();
	/** 工具原始名映射：prefixedToolName → originalToolName（用于 callTool 转发） */
	toolOriginalNames = /* @__PURE__ */ new Map();
	/**
	* configId 前缀对应的路由优先级。数字越大越优先。
	*
	* - `connector:*`  → 100  // 官方 marketplace connector，控制面经过严格校验
	* - `plugin-mcp:*` →  50  // 插件 MCP（中间档）
	* - `custom-mcp:*` →  10  // 用户在 mcp.json 自配，优先级最低，仅做兜底
	* - 其它前缀         →   0
	*
	* 当同一 prefixedToolName 被多个 configId 暴露时（典型场景：资料库
	* `connector:lexiang` 与用户自配 `custom-mcp:lexiang` 产生同样的
	* `lexiang_*` 工具），按这里的数值决定谁是 primary，避免 "先连先赢"。
	*/
	getConfigPriority(configId) {
		if (configId.startsWith("connector:")) return 100;
		if (configId.startsWith("plugin-mcp:")) return 50;
		if (configId.startsWith("custom-mcp:")) return 10;
		return 0;
	}
	/**
	* 写入/更新一个 tool 的路由候选。同一 configId 多次写入时保留最新一份
	* （避免重复），并按 priority 降序重排，保证后续 resolveToolRoute 直接
	* 顺序遍历即可。
	*/
	upsertToolRoute(toolName, configId) {
		const filtered = (this.toolRoutes.get(toolName) ?? []).filter((c) => c.configId !== configId);
		filtered.push({
			configId,
			priority: this.getConfigPriority(configId)
		});
		filtered.sort((a, b) => b.priority - a.priority);
		this.toolRoutes.set(toolName, filtered);
	}
	/**
	* 从一个 tool 的路由候选里移除指定 configId。
	* 候选清空后直接删 entry，避免空数组散落。
	*/
	removeToolRoute(toolName, configId) {
		const list = this.toolRoutes.get(toolName);
		if (!list || list.length === 0) return;
		const next = list.filter((c) => c.configId !== configId);
		if (next.length === 0) this.toolRoutes.delete(toolName);
		else this.toolRoutes.set(toolName, next);
	}
	/**
	* 解析一个 tool 当前应路由到的 configId。
	*
	* 规则：
	*   1. 在所有候选里挑出 client.status === 'connected' 的，按 priority
	*      降序取第一个 → 这就是 "资料库 connected 时一律走资料库" 的关键
	*   2. 没有 connected 候选时（极少见，例如所有 connector 都还在握手中），
	*      退回到 priority 最高的那个候选，由调用方进一步处理
	*      （callTool 内部会先 classifyPreflightState 再决定 reconnect 或报错）
	*
	* 注意：状态变化（markEntryConnected/Error/Unauthorized）不需要主动
	* notifyToolsChanged——resolveToolRoute 是按需读 client.status 的，
	* 下一次 callTool 自然就走到正确的候选上。
	*/
	resolveToolRoute(toolName) {
		const list = this.toolRoutes.get(toolName);
		if (!list || list.length === 0) return;
		const connected = list.find((c) => this.clients.get(c.configId)?.status === "connected");
		if (connected) return connected.configId;
		return list[0]?.configId;
	}
	/**
	* 构造工具暴露面的 short-name primary 视图。
	*
	* callTool 仍按单个 tool 的候选路由兜底；tools/list 与透明代理 config
	* 必须先按 server short name 去重，只暴露最高优先级且 connected 的来源，
	* 避免同名 custom-mcp 把官方 connector 的工具集合扩宽。
	*/
	selectPrimaryConnectedClientsByShortName() {
		const buckets = /* @__PURE__ */ new Map();
		let order = 0;
		for (const [configId, entry] of this.clients) {
			const currentOrder = order++;
			if (entry.status !== "connected") continue;
			const shortName = this.extractServerShortName(configId);
			const candidates = buckets.get(shortName) ?? [];
			candidates.push({
				configId,
				entry,
				priority: this.getConfigPriority(configId),
				order: currentOrder
			});
			buckets.set(shortName, candidates);
		}
		const selections = /* @__PURE__ */ new Map();
		for (const [shortName, candidates] of buckets) {
			candidates.sort((a, b) => {
				const priorityDiff = b.priority - a.priority;
				return priorityDiff !== 0 ? priorityDiff : a.order - b.order;
			});
			const primary = candidates[0];
			if (!primary) continue;
			const suppressed = candidates.slice(1);
			const suppressedConfigIds = suppressed.map((candidate) => candidate.configId);
			const suppressedToolCount = suppressed.reduce((total, candidate) => total + candidate.entry.tools.length, 0);
			selections.set(shortName, {
				configId: primary.configId,
				entry: primary.entry,
				suppressedConfigIds,
				suppressedToolCount
			});
			if (suppressedConfigIds.length > 0) this.logToolExposureSuppressed(shortName, primary.configId, suppressedConfigIds, suppressedToolCount);
		}
		return selections;
	}
	shouldHideToolsFromCli(shortName) {
		return HIDDEN_CLI_TOOL_CONNECTORS.has(shortName);
	}
	logToolExposureSuppressed(shortName, primaryConfigId, suppressedConfigIds, suppressedToolCount) {
		const logKey = `${shortName}|${primaryConfigId}|${suppressedConfigIds.join(",")}`;
		if (this.toolExposureSuppressionLogKeys.has(logKey)) return;
		this.toolExposureSuppressionLogKeys.add(logKey);
		this.logger.warn(`[ConnectorMcpProxy] tool exposure suppressed: shortName=${shortName}, primaryConfigId=${primaryConfigId}, suppressedConfigIds=[${suppressedConfigIds.join(", ")}], suppressedToolCount=${suppressedToolCount}`);
	}
	/** 工具列表变更监听器（proxy server / MCP Apps catalog 共用） */
	toolsChangedCallbacks = /* @__PURE__ */ new Set();
	/** Token 保存后回调（用于触发 token 提前刷新） */
	tokensSavedCallback;
	/**
	* 未授权事件回调：当某个 connector 被 markEntryUnauthorized 标记为
	* 未授权（如 runtime 401、token refresh 失败等）时触发，供业务侧（例如
	* 腾讯文档 store）及时切换到"需要重新授权"状态。
	*/
	unauthorizedCallback;
	/** OAuth callback 端口（由 proxy server 设置） */
	callbackPort = 18484;
	/** OAuth redirect 使用的 base URL（完整的 mcpSchemaUrl），为空则使用 HTTP fallback */
	oauthBaseUrl = "";
	/** OAuth 完成事件回调（统一来源：scheme 回调和 HTTP fallback） */
	oauthCompletedCallback;
	/** 每个 configId 的 OAuthClientProvider（用于 token exchange） */
	oauthProviders = /* @__PURE__ */ new Map();
	/**
	* 每个 configId 的 provider memoryTokens 写入器。
	*
	* provider 的 tokens() 内存优先短路（命中 memoryTokens 就不读文件），而 token
	* 刷新路径（refreshTokenIfNeeded / 后台 ConnectorTokenRefresher）只调
	* oauthStore.saveTokens 写文件，不经过 provider.saveTokens。若不同步内存，刷新出的
	* 新 token 永远进不了内存，连接持续用过期旧 token → 401 → 周期性误弹授权页
	* （Issue #59496）。此 map 在 provider 创建时注册写入器，刷新成功后回灌内存，
	* 保证“内存 = source of truth”不变量。
	*/
	providerMemoryTokenWriters = /* @__PURE__ */ new Map();
	/**
	* 每个 configId 的 provider memoryClientInfo 读取器。
	*
	* 后台 ConnectorTokenRefresher.doRefresh 读磁盘 clientInfo 刷新 token，一旦磁盘
	* 缺 client_id（历史 redirect_uri 回退清过、或从未落盘）就抛错 → invalid_grant
	* 反复断连（Issue #62378）。此 map 让 refresher 在磁盘缺失时能回退问内存 provider
	* 拿 clientInformation()，用它 + 旧 refresh_token 完成刷新并顺带补写磁盘。
	*/
	providerMemoryClientInfoReaders = /* @__PURE__ */ new Map();
	authorizationRedirectStarted = /* @__PURE__ */ new Set();
	/** 记录 OAuth provider 创建时的 silent 模式，避免静默重连复用交互式 provider。 */
	oauthProviderSilentModes = /* @__PURE__ */ new Map();
	/** 每个 configId 的 OAuth 浏览器重定向起始时间戳，用于测量"OAuth 启动到回调抵达"耗时 */
	oauthRedirectStartedAt = /* @__PURE__ */ new Map();
	/**
	* 记录每个 configId 上一次 OAuthClientProvider.saveTokens 被调用的时间戳。
	* SDK 在 OAuth 流程的两个点会触发 saveTokens：
	*   1) refresh_token 刷新成功（authInternal）
	*   2) authorization_code 换取 token 成功（OAuth 回调）
	* doConnect catch 分支以"本次连接开始后是否发生过 saveTokens + 仍 401"作为
	* **行为级**判定来识别 SDK 防循环死局，比纯字符串匹配更稳健（SDK 改错误文本也不影响）。
	*/
	tokenSavedAt = /* @__PURE__ */ new Map();
	/**
	* 记录每个 configId 上一次触发 post-auth 401 修复的时间戳。
	* 节流窗口内（POST_AUTH_REFUSAL_THROTTLE_MS）二次撞同样的错误时，不再清凭证 + 弹浏览器，
	* 而是按普通 unauthorized 上报。防止"服务端始终不认 token"场景下用户被反复弹授权页。
	*/
	postAuthRefusalLastRecoveredAt = /* @__PURE__ */ new Map();
	static POST_AUTH_REFUSAL_THROTTLE_MS = 300 * 1e3;
	/**
	* MCP Device Flow（RFC 8628）正在进行中的轮询控制器（configId → AbortController）。
	*
	* MCP 服务端在 OAuth metadata 中声明 `device_authorization_endpoint` 时，本 proxy
	* 会走 device flow 分支：POST device endpoint → 推送 user_code → 后台轮询 token endpoint。
	* 用户在 Device Code Modal 上点取消时，`abortDeviceFlow(configId)` 通过这个 Map 找到
	* 对应的 controller 调用 `.abort()`，让 polling 循环立即退出。
	*
	* 当前阶段（2026-05）：
	* - **CLI device flow** 已通过 ConnectorCliExecutor 在 stdout 解析层完整支持
	* - **MCP device flow** 取消基础设施（本字段 + `abortDeviceFlow` 方法）已就绪，
	*   但实际的「检测 metadata + POST device endpoint + 轮询」业务逻辑尚未在
	*   `redirectToAuthorization` 中实现 —— 等到 marketplace 中出现真实声明
	*   `device_authorization_endpoint` 的 MCP 服务时再补全（届时只需新增私有方法
	*   `runDeviceFlow(configId, ...)`，把创建的 AbortController 写入此 Map 即可）。
	*/
	activeDeviceFlows = /* @__PURE__ */ new Map();
	/**
	* 控制面外置（externally-managed）的 connector 白名单——按 server URL host 区分。
	*
	* 这些 connector 的 access_token / mcp_token 由独立的资料库授权流维护
	* （例如乐享：由 packages/agent-ui 下的
	* `tencent-lexiang/components/auth/lexiang-auth-store.ts` 通过
	* `lexiangStartAuth` + webview 完成授权后，把 mcp_token 通过
	* `updateConnectorHeaders` 写入 ConnectorService.persistentState.headerOverrides，
	* 最终经 applyOverrides 合并到 mcp.json.headers.Authorization）。
	*
	* 他们**不应**进入 MCP SDK 的 OAuthClientProvider 流程：
	*   - 不发起 Dynamic Client Registration（DCR）
	*   - 不走 redirect_uri 回调（避免 callback 端口漂移导致的 client 失配）
	*   - 不在 401 时调 redirectToAuthorization 弹系统浏览器
	*
	* transport 出现 401（外置 token 失效）时直接抛 Unauthorized，
	* 由 ConnectorService 触发 `connector:unauthorized` 事件，
	* 资料库 store 收到后切到 expired，引导用户在原入口重新授权。
	*
	* 同时这份白名单也作为 resolveEffectiveHeaders 的旁路条件：外置命中的
	* connector，即使 oauthStore 里有历史残留的 clientInfo，也**不**剥静态
	* Authorization（保护资料库授权流注入的新鲜 token）。
	*
	* 用 host 维度而非 configId，是为了同时覆盖：
	*   - marketplace 版 `connector:lexiang` / `connector:tencent-docs`
	*   - 用户在 mcp.json 自配的 `custom-mcp:lexiang` / `custom-mcp:lx` /
	*     `custom-mcp:乐享` / `custom-mcp:tencent-docs` 等任意 configId
	* 用 `URL.host` 精确匹配（而非 includes），避免子串误判。
	*
	* 注意：host 仅作为**必要条件**，完整判定还需 headers.Authorization 已注入
	* （见 isExternallyManaged 注释）。这样同一 host 上可以区分：
	*   - 非 OA 用户（走资料库授权 → 有 Authorization → 外置短路）
	*   - OA 用户（走原 connector OAuth → 无 Authorization → 不短路，照常走 OAuth）
	*/
	/**
	* 判定一个 connector 是否属于「控制面外置」类别——access_token 由独立的
	* 资料库授权流维护，不应进入 MCP SDK 的 OAuth/DCR 流程。
	*
	* 双重判定（host + 托管鉴权 header 同时命中才算外置）：
	*  1. serverUrl.host ∈ EXTERNALLY_MANAGED_HOSTS
	*  2. headers.Authorization 或 headers.X-Oneid-Access-Token 非空
	*
	* 之所以不能仅按 host 判定，是因为乐享 / 腾讯文档 connector（host =
	* mcp.lexiang-app.com / docs.qq.com）
	* 同时存在两类用户：
	*   - 非 OA 用户：connector-panel 把「连接」入口路由到资料库授权页，
	*     由 lexiangStartAuth + updateConnectorHeaders 把 mcp_token 写入
	*     headerOverrides.Authorization。这才是真正的「外置」语义，要短路 OAuth。
	*   - OA 用户：connector-panel 上没有乐享导航入口（见
	*     `tencentLexiangKnowledgeEnabled && !isTencentUser` 判定），点击「连接」
	*     会沿用原 MCP connector 的 OAuth 流程（webview/系统浏览器授权），
	*     此时 headers 里**没有** Authorization。如果仅按 host 短路，会把
	*     OAuth provider 拦掉，transport 既无 OAuth token 也无静态 bearer，
	*     直接握手 401（业务码 41 / SSE 405）。
	*
	* 以 "Authorization 是否已被资料库授权流注入" 作为辅助判定，能在
	*   - 同一 host 上区分 OA / 非 OA 用户
	*   - 又不会误命中 homo_mcp 等场景（host 不同，第一关就过滤了）
	*
	* Header key 大小写不敏感（mcp.json 用户可能写成 authorization）。
	*/
	isExternallyManaged(_configId, serverUrl, headers) {
		if (!serverUrl) return false;
		let host;
		try {
			host = new URL(serverUrl).host;
		} catch {
			return false;
		}
		if (!require_workbuddy_auth_product_coordinator.EXTERNALLY_MANAGED_HOSTS.has(host)) return false;
		if (!headers) return false;
		const auth = headers.Authorization ?? headers.authorization;
		const oneidAccessToken = headers["X-Oneid-Access-Token"] ?? headers["x-oneid-access-token"];
		return typeof auth === "string" && auth.length > 0 || typeof oneidAccessToken === "string" && oneidAccessToken.length > 0;
	}
	/** 每个 configId 的 server URL（用于 OAuth token exchange） */
	serverUrls = /* @__PURE__ */ new Map();
	/**
	* 每个 configId 的 OAuth Protected Resource Metadata URL。
	*
	* 来自服务端 401 响应头 `WWW-Authenticate: Bearer resource_metadata="..."`
	* （RFC 9728 §5.1 resource-specific metadata path）。
	*
	* 首次 transport 连接收到 401 时由 SDK 自动解析并缓存到 `transport._resourceMetadataUrl`，
	* 我们在 connectWithFallback 里把它抄存到这个 Map，供后续 handleOAuthCallback
	* 在 token exchange 阶段调用 `discoverOAuthProtectedResourceMetadata` 时用作 hint，
	* 避免服务端用子路径 metadata 时落到根 well-known 404。
	*
	* 详见 issue #35399。
	*/
	resourceMetadataUrls = /* @__PURE__ */ new Map();
	/** OAuth state → configId 映射（CSRF 防护） */
	stateToConfigId = /* @__PURE__ */ new Map();
	/** 并发连接去重 */
	inFlightConnects = /* @__PURE__ */ new Map();
	/**
	* 临时止血:对 Ardot `create_design` 做同参 in-flight 合并。
	*
	* 当前 live MCP App tool_call 会形成两条近乎同时到达的调用:
	*   1. Agent CLI 原始 `tools/call`
	*   2. Host bootstrap 为初始化 MCP App 复刻的 `tools/call`
	*
	* `create_design` 非幂等,重复执行会在 Ardot 后端创建两份文件。
	* 在完整 Agent Loop 结果复用落地前,这里把同 config/tool/args 的
	* 并发调用合并到第一次真实上游调用的 Promise 上。
	*/
	inFlightArdotCreateDesignCalls = /* @__PURE__ */ new Map();
	/** OAuth token 持久化存储（按用户 ID 隔离） */
	get oauthStore() {
		const status = this.authService.getStatus();
		return new require_workbuddy_auth_product_coordinator.ConnectorOAuthStore(status.loggedIn && status.user?.id ? status.user.id : "default", { backupBaseDir: require_runtime_context.getWorkbuddyRuntimeUserDataDir() });
	}
	/** 活跃连接的配置快照（用于 sync 变更检测） */
	activeConfigs = /* @__PURE__ */ new Map();
	/** 内置工具（Desktop MCP 工具，不通过 MCP Client 连接） */
	builtinTools = /* @__PURE__ */ new Map();
	/** sync 串行化锁，防止快速连接/断开导致状态竞争 */
	syncLockPromise = Promise.resolve();
	/**
	* URL MCP connect 的最低/默认总超时（60 秒）。
	*
	* 双重语义：
	*   - 下限：用户在 mcp.json 配 `timeout` 字段时，会被 `Math.max(MIN, user)` 抬到至少 60s
	*   - 默认：用户没配 `timeout` 时使用 60s
	*
	* 走 fallback 时由内部均分给两段，每段 timeout/2。
	* 同时作为 SDK initialize JSON-RPC 请求的 timeout。
	*/
	static MIN_CONNECT_TIMEOUT_MS = 6e4;
	/**
	* stdio MCP 冷启动经常包含 `npx` 包解析/下载 + server 初始化 + tools/list，
	* 默认/下限抬到 120 秒；URL MCP 仍保持原来的 60 秒策略。
	*/
	static STDIO_MIN_CONNECT_TIMEOUT_MS = 12e4;
	/**
	* 健康状态下的基础探活间隔（60 秒）。
	*
	* 每轮还会叠加 [0, HEALTH_CHECK_JITTER_MS) 的随机抖动，让大量客户端不会在
	* 同一个固定时刻集中向 MCP server 发 ping。实际健康探活间隔为 60～90 秒。
	*/
	static HEALTH_CHECK_INTERVAL_MS = 6e4;
	/** 健康探活的最大随机抖动（不含上界）：0～30 秒。 */
	static HEALTH_CHECK_JITTER_MS = 3e4;
	/**
	* 健康检查 ping 的显式超时（5 秒）。
	*
	* 不设这个超时时，ping 会沿用 SDK 的 DEFAULT_REQUEST_TIMEOUT_MSEC（通常 60 秒）。
	* 网络真挂掉时，单次 ping 要等 60 秒才返回失败，会显著拉长连续失败判定。
	*
	* 设成 5 秒：网络异常时快速释放本轮探活，下一轮按 60～90 秒随机间隔调度；
	* 配合连续失败计数滤波，对偶发抖动仍然容忍。
	*/
	static HEALTH_CHECK_PING_TIMEOUT_MS = 5e3;
	/**
	* 健康检查连续失败阈值。
	*
	* 历史实现是「一次 ping 失败立即 tryReconnect」零容忍策略，结果：
	*   - WiFi 1-2 秒切换抖动 → ping 命中 → 立即升级 reconnect
	*   - iOA 网关 5 秒抽风 → reconnect 3 次都赶上抽风 → markUnauthorized
	*   - 用户体感：连接经常莫名其妙变「需要认证」，需要手动救
	*
	* 改为「连续 N 次失败才升级」：
	*   - 阈值 2 + 60～90 秒随机间隔，显著降低健康连接的探活流量
	*   - 之间还会重置计数，进一步降低误判
	*   - transport onclose/onerror 仍会立即重连；只有未收到生命周期事件时才等待两轮 ping 兜底
	*/
	static HEALTH_CHECK_FAILURE_THRESHOLD = 2;
	/**
	* tryReconnect 失败后进入 'error' 状态时启动的指数退避探活节奏（毫秒）。
	*
	* 历史行为：tryReconnect 3 次都失败 → 一律 markUnauthorized → 健康检查停止 →
	* connector 永久停摆，必须用户手动点「连接」才能救活。这对 transport 错误
	* （DNS/网络抖动/服务端临时不可达）非常不友好——网络恢复后没人去重连。
	*
	* 新行为：transport 错误 → markEntryError → 启动 backoff probe，按
	* 30s/1m/2m/5m/10m 的节奏自动 tryReconnect。任意一次成功就回到 connected
	* 状态。最多探活 5 次（约 18 分钟）后停止，避免永远耗资源。用户也可以
	* 手动点「重连」立即触发。
	*
	* auth 错误依然走 markUnauthorized（不在此列表覆盖范围）——OAuth token 失效
	* 必须用户重新授权，自动重试无意义。
	*/
	static BACKOFF_PROBE_DELAYS_MS = [
		3e4,
		6e4,
		12e4,
		3e5,
		6e5
	];
	/**
	* 单段 transport.start() 握手卡死的快速兜底（12 秒）。
	*
	* 比 connect 总超时更激进：握手本来就是秒级动作，卡过 10s 基本是协议错配/网络异常，
	* 再等也无果，应立即降级到 fallback。
	*
	* 工作原理：在 connectStepWithTimeout 里用 Promise.race + 主动 transport.close()
	* 强制中止 SDK 内部 pending 的 start() Promise；否则 SSE transport 在 TCP 握手成功
	* 但服务端不发 endpoint 事件时会无限期 pending，把整段 connect 拖死。
	*/
	static HANDSHAKE_TIMEOUT_MS = 12e3;
	/** reconnect 重试节奏（毫秒）
	*
	* tryReconnect 主循环内还内置了一个 sawTransportTrouble 哨兵：本轮如果
	* 出现过 OAuth metadata 拉取的瞬态错误（HTTP 5xx / 抓包代理 502 / TLS reset 等），
	* 后续 attempt 即便 SDK 标了 needsAuth=true，也视为可疑信号继续重试，并在
	* EXHAUSTED 阶段强制走 markEntryError + backoff probe，避免"断网一晚后醒来开关
	* 被自动关掉、需要手动重新授权"的误判。真正的 OAuth 失效（无网络抖动）依旧
	* 由 isAuthMessage(finalError) 在 EXHAUSTED 阶段命中 markUnauthorized。
	*/
	static RECONNECT_RETRY_DELAYS_MS = [
		0,
		1e3,
		3e3
	];
	/**
	* 网络型错误（ERR_NETWORK_CHANGED / Connect Timeout / fetch failed / ENOTFOUND / ECONNREFUSED /
	* ECONNRESET）首次失败后，把进入下一轮 attempt 的等待覆盖为更长的退避。
	*
	* 原因：macOS 唤醒后 power event bridge 触发 connector 对账，但 WiFi/DNS 真正
	* 就绪经常滞后到 5-8 秒。tryReconnect 默认第二次 attempt 仅等 1s，5 秒能给系统多一次
	* "网络真就绪"的喘息（issue #49159）。仅替换"上一次失败是网络型且这是 attempt 1->2"这一档，
	* 不影响 attempt 2->3 节奏。
	*/
	static NETWORK_ERROR_BACKOFF_MS = 5e3;
	/**
	* 判断错误是否属于网络瞬态（DNS/TCP/socket 抖动），用于决定首次重试是否需要更长退避。
	*
	* 输入是 stringify 后的 error message（来自 `connectWithFallback` 的 `result.error`），
	* 拿不到结构化 `error.code`，只能靠正则匹配。相比 `classifyCallToolError` 里的
	* `isTransportErrorByCode` 判据（Issue #60615 方案 B），这里是"降级版"—— 但因为
	* Node 错误 code 名（如 `ECONNRESET`）会被拼进 message，正则匹配依然可靠。
	*
	* 关键约束（Issue #60615 方案 B）：
	* - 用**词边界锚定**的正则替代历史上的 `includes`：避免把 `'closed'` / `'connection'`
	*   这类模糊词误命中业务错误的 text（例如 server 返回的错误消息里恰好含 "connection")
	* - 只匹配明确的 Node error code 名 / 完整无歧义短语
	* - `fetch failed` 和 `socket hang up` 用行首行尾锚定，防止业务 text 里出现同样字面被误判
	*/
	static NETWORK_TRANSIENT_MESSAGE_PATTERNS = [
		/\bERR_NETWORK_CHANGED\b/i,
		/\bECONNRESET\b/i,
		/\bECONNREFUSED\b/i,
		/\bECONNABORTED\b/i,
		/\bETIMEDOUT\b/i,
		/\bENETUNREACH\b/i,
		/\bENOTFOUND\b/i,
		/\bEAI_AGAIN\b/i,
		/\bUND_ERR_(?:SOCKET|CONNECT_TIMEOUT|HEADERS_TIMEOUT|BODY_TIMEOUT|ABORTED)\b/i,
		/\bconnect\s+timeout\b/i,
		/\bfetch failed\b/i,
		/\bsocket hang up\b/i
	];
	static isNetworkTransientError(message) {
		if (!message) return false;
		return _ConnectorMcpProxy.NETWORK_TRANSIENT_MESSAGE_PATTERNS.some((re) => re.test(message));
	}
	/**
	* url MCP 双向 fallback 的「跳过 fallback」错误特征（正则，全词/状态码语境匹配）。
	* 命中以下任意一种时，第一段 transport 失败后应直接抛错，
	* 而不要尝试另一种 transport：
	*   - 401 / 403 / Unauthorized / Forbidden：协议层 OK，是认证问题；
	*     另一种 transport 通常也会 401，而且若 SDK 已开始 OAuth 流程，
	*     二次连接会触发第二个浏览器弹窗。
	*   - aborted：用户主动取消或超时，重试无意义。
	*
	* 改为正则的原因：纯子串匹配会把任意含 "401"/"unauthorized" 字样的错误
	* （URL/资源路径/请求 ID/数字串等）误判为认证失败，进而触发"重新授权"。
	* 这里限定为：
	*   - HTTP 状态码 401 / 403 必须前后非数字（避免 4012、tx_4031 之类误命中）；
	*   - "Unauthorized" / "Forbidden" 走"左侧词边界 + 右侧可接 Error/Exception 后缀"，
	*     既覆盖 "401 Unauthorized" 这类裸词，也覆盖 SDK 抛的 "UnauthorizedError"
	*     / "ForbiddenException" 等类名形式，但不会被 "rfc_unauthorized_xxx" 这种
	*     右侧紧跟下划线/字母数字的标识符误命中。
	*   - "abort" 词形覆盖 "AbortError" / "request aborted" / "aborted"。
	*
	* 抄自 packages/agent-mcp/src/common/manager/mcp-connect-manager.ts:shouldSkipSseFallback()
	* （此处语义已扩展为双向 fallback 通用判定）
	*/
	static SKIP_FALLBACK_PATTERNS = [
		/(?:^|[^0-9])401(?:[^0-9]|$)/,
		/(?:^|[^0-9])403(?:[^0-9]|$)/,
		/\bunauthorized(?:error|exception)?\b/i,
		/\bforbidden(?:error|exception)?\b/i,
		/\babort(?:ed|error)?\b/i
	];
	/** 健康检查定时器（逐轮 setTimeout，以便每轮重新计算 jitter 且避免 ping 重叠） */
	healthCheckTimers = /* @__PURE__ */ new Map();
	/**
	* 每次 startHealthCheck 创建一个唯一 token。stop 后即删除，用于阻止已经在执行中的
	* async ping 在结束后重新挂下一轮 timer。
	*/
	healthCheckTokens = /* @__PURE__ */ new Map();
	/**
	* 'error' 状态下的指数退避探活定时器。
	*
	* tryReconnect 完全失败（且非 auth 错误）时不再永久停摆，而是按
	* BACKOFF_PROBE_DELAYS_MS 节奏继续轻量探活。任意一次 tryReconnect 成功就
	* 进入 connected 状态，定时器自动停止；状态被改成其他值（如 connecting /
	* unauthorized）也会立即停止。
	*/
	backoffProbeTimers = /* @__PURE__ */ new Map();
	/** 重连进行中标记（防止并发重连） */
	reconnecting = /* @__PURE__ */ new Set();
	/**
	* 正在进行的 tryReconnect Promise（每个 configId 至多一个）。
	*
	* 用途：当 callTool 拿到 McpError code=-32000 "Connection closed" 时，说明该请求
	* 被并发进行的 disconnect() 副作用（SDK Protocol._onclose reject pending 请求）殃及。
	* 此时应当等待正在进行的 reconnect 完成，然后用新 client 重发一次原请求，而不是
	* 直接抛错（Issue #60615 方案 E）。
	*
	* 与 `reconnecting` Set 并行维护：
	* - Set 用于快速 O(1) 判断"是否有 reconnect 在进行"（现有 tryReconnect 内部 SKIP 逻辑）
	* - 这个 Map 用于 executeForwardCall 的 catch 分支 await 拿到 reconnect 结果
	* 两者的生命周期完全同步（同时 add/set，同时 delete/clear）。
	*/
	reconnectingPromises = /* @__PURE__ */ new Map();
	/**
	* HTTP MCP transport 共享的 undici Agent。
	*
	* 关键参数：
	* - `bodyTimeout: 0` —— 关掉 undici 默认 5 分钟 body 超时（自上次收到 chunk 起计时）。
	*   StreamableHTTPClientTransport 会主动维护一条用于接 server-initiated 消息的长 GET
	*   SSE 流，server 长时间没有 server→client 消息时，这条流上字节流量为 0；
	*   undici 的 bodyTimeout 默认会在 5 分钟到点时把 socket 强制 terminate（产生
	*   `TypeError: terminated`，被 SDK 包成 `SSE stream disconnected: ...`）。
	*   关掉之后由 MCP 自身的 ping（健康期 60～90 秒一次独立 POST）+
	*   transport 生命周期事件兜底。
	* - `headersTimeout: 0` —— 同样关掉 5 分钟 headers 超时；初始 connect 时序由
	*   `getConnectTimeout` 单独控制，不依赖 undici 默认值。
	*
	* 复用同一个 Agent 实例：
	* - undici 内部按 origin pool 复用 socket，跨 reconnect 不重建连接池；
	* - 跨 connector 共享是安全的，每个连接是独立的（pool 只控复用），dispatcher 行为一致。
	*/
	mcpHttpDispatcher;
	getMcpHttpDispatcher() {
		if (!this.mcpHttpDispatcher) {
			const debugProxyUrl = process.env.WORKBUDDY_MCP_DEBUG_PROXY === "1" ? process.env.HTTPS_PROXY || process.env.https_proxy || process.env.HTTP_PROXY || process.env.http_proxy : void 0;
			if (debugProxyUrl) {
				this.mcpHttpDispatcher = new import_undici.ProxyAgent({
					uri: debugProxyUrl,
					bodyTimeout: 0,
					headersTimeout: 0
				});
				this.logger.info(`[ConnectorMcpProxy] created ProxyAgent for HTTP MCP transports: proxy=${debugProxyUrl}, bodyTimeout=0, headersTimeout=0 (WORKBUDDY_MCP_DEBUG_PROXY=1, debug only)`);
			} else {
				this.mcpHttpDispatcher = new import_undici.Agent({
					bodyTimeout: 0,
					headersTimeout: 0
				});
				this.logger.info("[ConnectorMcpProxy] created shared undici dispatcher for HTTP MCP transports: bodyTimeout=0, headersTimeout=0");
			}
		}
		return this.mcpHttpDispatcher;
	}
	/** 连接状态变更回调（通知 ConnectorService 更新 UI） */
	statusChangedCallback;
	/** runtime auth failure 重连前的外部鉴权刷新回调（如企业态 OneID token 拉新）。 */
	refreshExternalAuthBeforeReconnect;
	/**
	* tools/call request-time 动态认证 header 解析回调。
	* projectId：发起该 tool call 的会话所属项目（供 netdrive X-Project-Id per-request 注入换票）。
	*/
	resolveRequestAuthInjectionHeaders;
	/** 当前 tools/call async context 里的 request-time 动态 headers，customFetch 最终合入。 */
	requestScopedHeaders = new async_hooks.AsyncLocalStorage();
	/** 解析本地 CLI host runtime base URL（http://127.0.0.1:PORT），用于注入 CODEBUDDY_SERVICE_PROXY_URL */
	cliEndpointResolver;
	/**
	* 设置 OAuth callback 端口（proxy server 启动后调用）
	*/
	setCallbackPort(port) {
		this.callbackPort = port;
	}
	/**
	* 设置本地 CLI host runtime 端点解析器（由 main-bootstrap 用 SidecarManager.getHostEndpoint 注入）。
	* 用于给插件 stdio MCP 子进程注入 CODEBUDDY_SERVICE_PROXY_URL，使其可访问本地 CLI 的
	* /internal/hooks/services/invoke 服务代理（与 hook、CLI inline 插件 MCP 行为一致）。
	*/
	setCliEndpointResolver(resolver) {
		this.cliEndpointResolver = resolver;
	}
	/**
	* 当本地 CLI host runtime 端点变化（轮转 / 崩溃恢复，端口变更）后调用：强制重连所有
	* stdio MCP 服务器。已 spawn 的子进程在 spawn 时定格了 CODEBUDDY_SERVICE_PROXY_URL，
	* 必须重连（重新 spawn）才能拿到新端点；url 型服务器不注入该 env，无需处理。
	*/
	async resyncStdioForCliEndpointChange() {
		const stdioConfigs = [...this.activeConfigs.entries()].filter(([, config]) => typeof config.command === "string" && config.command.length > 0);
		if (stdioConfigs.length === 0) return;
		this.logger.info(`[ConnectorMcpProxy] CLI endpoint changed; reconnecting ${stdioConfigs.length} stdio MCP server(s) to refresh service proxy URL`);
		for (const [configId, config] of stdioConfigs) try {
			await this.connect(configId, config, true);
		} catch (error) {
			this.logger.warn(`[ConnectorMcpProxy] resync reconnect failed for ${configId}:`, error);
		}
	}
	/**
	* 设置 OAuth redirect 使用的 base URL（完整的 mcpSchemaUrl，如 'codebuddy://codebuddy-ide/mcp'）
	* 为空则使用 HTTP fallback（http://127.0.0.1:PORT/oauth/callback）
	*/
	setOAuthBaseUrl(mcpSchemaUrl) {
		if (!mcpSchemaUrl) {
			this.oauthBaseUrl = "";
			this.logger.info("[ConnectorMcpProxy] OAuth base URL cleared (HTTP fallback)");
			return;
		}
		try {
			const parsed = new URL(mcpSchemaUrl);
			if (!parsed.protocol || !parsed.host) {
				this.logger.warn(`[ConnectorMcpProxy] Invalid mcpSchemaUrl (missing protocol or host): ${mcpSchemaUrl}, using HTTP fallback`);
				this.oauthBaseUrl = "";
				return;
			}
			this.oauthBaseUrl = `${parsed.protocol}//${parsed.host}${parsed.pathname.replace(/\/+$/, "")}`;
		} catch {
			this.logger.warn(`[ConnectorMcpProxy] Invalid mcpSchemaUrl: ${mcpSchemaUrl}, using HTTP fallback`);
			this.oauthBaseUrl = "";
			return;
		}
		this.logger.info(`[ConnectorMcpProxy] OAuth base URL set to: ${this.oauthBaseUrl}`);
	}
	/**
	* 判断 URL 是否为当前配置的 OAuth 回调 URL（同步，纯匹配）
	*/
	isOAuthCallbackUrl(url) {
		if (!this.oauthBaseUrl) return false;
		try {
			const parsed = new URL(url);
			return `${parsed.protocol}//${parsed.host}${parsed.pathname}`.startsWith(this.oauthBaseUrl + "/") && parsed.pathname.endsWith("/oauth/callback");
		} catch {
			return false;
		}
	}
	/**
	* 从 OAuth 回调 URL 的 pathname 中解析 configId（兜底手段）。
	*
	* scheme 路径回调 URL 形如 `{oauthBaseUrl}/{encodedConfigId}/oauth/callback`，
	* 例如 `workbuddy://workbuddy/mcp/connector%3Atencent-docs/oauth/callback`
	* → configId `connector:tencent-docs`。
	*
	* HTTP fallback 路径（`http://127.0.0.1:PORT/oauth/callback`）pathname 不含
	* configId，返回 undefined。
	*
	* 用于 state 反查失败（unknown state）/ code|state 缺失等场景，让失败返回值
	* 仍能携带 configId，从而触发 UI 层清理对应 connector 的 pendingOAuth。
	*/
	extractConfigIdFromCallbackUrl(url) {
		try {
			const pathname = new URL(url).pathname;
			if (!pathname.endsWith("/oauth/callback")) return;
			const head = pathname.slice(0, -15);
			const lastSlash = head.lastIndexOf("/");
			if (lastSlash < 0 || lastSlash === head.length - 1) return;
			const encoded = head.slice(lastSlash + 1);
			return decodeURIComponent(encoded) || void 0;
		} catch {
			return;
		}
	}
	/**
	* 从完整的 OAuth 回调 URL 中解析参数并处理
	*/
	async handleOAuthCallbackFromUrl(url) {
		const parsed = new URL(url);
		const error = parsed.searchParams.get("error");
		const state = parsed.searchParams.get("state");
		const code = parsed.searchParams.get("code");
		if (error) {
			const configId = state ? this.stateToConfigId.get(state) : void 0;
			if (state) this.stateToConfigId.delete(state);
			const errorDescription = parsed.searchParams.get("error_description");
			const message = errorDescription ? `${error}: ${errorDescription}` : error;
			this.logger.info(`[ConnectorMcpProxy] OAuth callback error: ${message}, configId=${configId ?? "unknown"}`);
			const result = {
				success: false,
				configId,
				error: message
			};
			this.emitOAuthCompleted(result);
			return result;
		}
		if (!code || !state) {
			const fallbackConfigId = this.extractConfigIdFromCallbackUrl(url);
			this.logger.warn(`[ConnectorMcpProxy] OAuth callback URL missing code or state, configId=${fallbackConfigId ?? "unknown"}`);
			const result = {
				success: false,
				configId: fallbackConfigId,
				error: "Missing code or state"
			};
			this.emitOAuthCompleted(result);
			return result;
		}
		const fallbackConfigId = this.extractConfigIdFromCallbackUrl(url);
		return this.handleOAuthCallback(state, code, fallbackConfigId);
	}
	/**
	* 设置连接状态变更回调
	* 当连接成功/失败/断开时触发，用于 ConnectorService 更新 UI
	*/
	onStatusChanged(callback) {
		this.statusChangedCallback = callback;
	}
	/**
	* 注册 OAuth 完成事件回调（统一来源：scheme 回调和 HTTP fallback）
	*/
	onOAuthCompleted(callback) {
		this.oauthCompletedCallback = callback;
	}
	/**
	* 触发 OAuth 完成事件（成功和失败都要触发，否则 UI 会卡在 connecting）。
	*
	* 相关 issue #33024：乐享 token endpoint 返 404 时，旧实现只在成功分支触发
	* callback，失败分支只 return，ConnectorUiAdapter 的 pendingOAuth 不会被清掉，
	* UI 一直 connecting 到 5 分钟超时。
	*/
	emitOAuthCompleted(result) {
		if (!this.oauthCompletedCallback) return;
		try {
			this.oauthCompletedCallback(result);
		} catch (err) {
			this.logger.warn("[ConnectorMcpProxy] oauthCompletedCallback error:", err);
		}
	}
	/**
	* 连接到真实 MCP Server
	*
	* @param silent 静默模式（启动自动恢复时为 true）：不打开浏览器，只尝试用已有 token 连接
	* @param options.force 跳过"已连接且配置未变"的缓存短路，强制走 doConnect 重拉 tools/list。
	*   注意：force 不绕过 inFlightConnects in-flight dedup（并发时仍复用同一个 promise），
	*   也不影响 OAuth 鉴权路径。仅用于用户主动点刷新场景（reconnectMcpServer），
	*   tryReconnect 内部调用不应传 force:true。
	*/
	async connect(configId, serverConfig, silent = false, options) {
		const existing = this.inFlightConnects.get(configId);
		if (existing) return existing;
		const start = Date.now();
		const serverShortName = this.extractServerShortName(configId);
		const report = (outcome, extras) => {
			this.metric.connect({
				serverShortName,
				outcome,
				silent,
				...extras?.withDuration !== false && { durationMs: Date.now() - start },
				...extras?.errorKind && { errorKind: extras.errorKind }
			});
		};
		report("began", { withDuration: false });
		const entry = this.clients.get(configId);
		const oldConfig = this.activeConfigs.get(configId);
		if (!options?.force && entry?.status === "connected" && oldConfig && !this.configChanged(configId, oldConfig, serverConfig)) {
			this.activeConfigs.set(configId, { ...serverConfig });
			entry.serverConfig = { ...serverConfig };
			report("cached");
			return { success: true };
		}
		this.authorizationRedirectStarted.delete(configId);
		const promise = this.doConnect(configId, serverConfig, silent);
		this.inFlightConnects.set(configId, promise);
		try {
			const result = await promise;
			if (result.success) report("success");
			else if (result.needsAuth) report("needs_auth", { errorKind: "auth" });
			else report("failed", { errorKind: "unknown" });
			return result;
		} catch (err) {
			const errMsg = err instanceof Error ? err.message : String(err);
			report("failed", { errorKind: /unauthor|401|403/i.test(errMsg) ? "auth" : "unknown" });
			throw err;
		} finally {
			this.inFlightConnects.delete(configId);
		}
	}
	/**
	* 断开连接。
	*
	* 行为约定：
	* - 没有活跃 client → 上报 outcome='noop' 直接返回，幂等友好。
	* - client.close() 抛错 → 仍然继续清理 toolRoutes / clients / activeConfigs，
	*   并上报 outcome='failed'。**不**走 finally：清理顺序依赖 entry.tools，
	*   close 抛错并不会破坏 entry 内存结构，调用方继续 reconnect 是安全的。
	*   transport 偶发 close 失败仅作为可观测信号供看板排查。
	*
	* @param reason 触发来源，用于 wb.connector.main.disconnect 埋点维度。
	*   所有内部/外部调用都应显式传入对应来源；缺省 'unknown' 仅作为兜底。
	*/
	async disconnect(configId, reason = "unknown") {
		this.stopHealthCheck(configId);
		const serverShortName = this.extractServerShortName(configId);
		const report = (outcome, extras) => {
			this.metric.disconnect({
				serverShortName,
				outcome,
				reason,
				...extras?.durationMs !== void 0 && { durationMs: extras.durationMs },
				...extras?.errorKind && { errorKind: extras.errorKind }
			});
		};
		const entry = this.clients.get(configId);
		if (!entry) {
			report("noop");
			return;
		}
		const start = Date.now();
		let closed = true;
		try {
			entry.manualDisconnect = true;
			await entry.client.close();
		} catch (error) {
			closed = false;
			this.logger.warn(`[ConnectorMcpProxy] close(${configId}) error:`, error);
		}
		for (const tool of entry.tools) {
			this.removeToolRoute(tool.name, configId);
			if (!this.toolRoutes.has(tool.name)) this.toolOriginalNames.delete(tool.name);
		}
		this.clients.delete(configId);
		this.activeConfigs.delete(configId);
		this.notifyToolsChanged();
		report(closed ? "success" : "failed", {
			durationMs: Date.now() - start,
			errorKind: closed ? void 0 : "transport"
		});
	}
	/**
	* 聚合已选 primary connector 的工具列表 + 内置工具。
	*
	* `_meta` 被透传，用于 MCP Apps Host 等消费方通过 `_meta.ui.resourceUri`
	* 在 tool definition 阶段就识别 "app-capable tool"。
	*
	* @param options.welcomeMode - 调用方所在 session 的 welcomeMode
	*   （'coding' / 'working' / 'design' 等）。当传入 **非 design 值** 时，
	*   仅在创意设计会话下暴露的内置 connector（当前是 ardot）会从结果里
	*   被剔除，避免它们出现在 ConnectorProxyServer 的 tools/list 响应里、
	*   进而被 CLI 索引到 ToolSearch 的 deferred 列表中。
	*
	*   ⚠️ 与"安全默认"相反：**未传 `welcomeMode` 时全量暴露 ardot**。
	*   理由：listAllTools 还服务于 mcp-apps catalog 等纯发现场景（不带
	*   session 上下文），这些场景需要看到所有工具来构建 UI app 索引。
	*   只有 CLI tools/list 这一条路径会显式注入 welcomeMode 做过滤——
	*   见 ConnectorProxyServer.registerToolHandlersFor。
	*/
	listAllTools(options) {
		const filterDesignOnly = options?.welcomeMode !== void 0 && options.welcomeMode !== "design";
		const hasProjectId = !!options?.projectId;
		const toolMap = /* @__PURE__ */ new Map();
		for (const [serverShortName, selection] of this.selectPrimaryConnectedClientsByShortName()) {
			if (filterDesignOnly && serverShortName === "ardot") continue;
			if (selection.configId.startsWith("project-mcp:") && !hasProjectId) continue;
			if (serverShortName === "netdrive" && !hasProjectId) continue;
			if (this.shouldHideToolsFromCli(serverShortName)) continue;
			const disabledTools = this.getDisabledToolNames(selection.configId);
			for (const tool of selection.entry.tools) {
				if (disabledTools.has(tool.name)) continue;
				toolMap.set(tool.name, {
					...tool,
					_meta: {
						...tool._meta ?? {},
						serverName: serverShortName
					}
				});
			}
		}
		for (const tool of this.builtinTools.values()) if (!toolMap.has(tool.name)) toolMap.set(tool.name, {
			name: tool.name,
			description: tool.description,
			inputSchema: tool.inputSchema,
			...tool._meta ? { _meta: tool._meta } : {}
		});
		return [...toolMap.values()];
	}
	/**
	* 读取某个 connector 当前的 disabledTools[]（用户在设置页禁用的单 tool 黑名单）。
	* 数据源：activeConfigs 中保存的最新 server config 快照（由 sync() 即时刷新）。
	*/
	getDisabledToolNames(configId) {
		const list = this.activeConfigs.get(configId)?.disabledTools;
		if (!Array.isArray(list)) return /* @__PURE__ */ new Set();
		return new Set(list.filter((v) => typeof v === "string"));
	}
	/**
	* Return the configId currently routing a given prefixed tool name, if any.
	* Built-in tools have no connector, in which case this returns undefined.
	*/
	findConfigIdForTool(prefixedToolName) {
		return this.resolveToolRoute(prefixedToolName);
	}
	/**
	* 按调用方传入的 tool name 解析对应的 builtin 工具。
	*
	* 调用链：LLM 经 ToolSearch + DeferExecuteTool 调用 `mcp__connector-proxy__<tool>`，
	* agent-cli 把它当作 connector-proxy 这个 MCP server 上的工具，tools/call 时把
	* name 拼成 `<serverShortName>_<tool>`（即 `connector-proxy_<tool>`）下发给本类。
	* 而 builtin 工具注册时用的是裸名（`pick_location` / `present_files` 等），
	* 与 connector 工具的命名契约一致（见 listAllTools / registerBuiltinTool）。
	*
	* 因此查找需要两轮：
	* 1. 先按原 name 命中（裸名直调路径，保留历史兼容）；
	* 2. 未命中且 name 形如 `${CONNECTOR_PROXY_MCP_NAME}_<rest>` 时 strip 前缀再查
	*    —— 前缀必须恰为 connector-proxy（builtin 自身没有 connector，但调用方按
	*    listTools 给出的 server short name 拼了前缀），避免误把真正的 connector
	*    工具（如 `qq-mail_search_mail`）当成 builtin。
	*
	* shouldDefer=true 的 builtin（如 pick_location）走 deferred MCP 路径时才会带上
	* 前缀，shouldDefer=false 的历史 builtin 直接以裸名出现在主提示词里，所以历史上
	* 没暴露过该 prefix 漏命中问题（真机回归 B5）。
	*/
	resolveBuiltinTool(name) {
		const direct = this.builtinTools.get(name);
		if (direct) return direct;
		const prefix = `${require_workbuddy_auth_product_coordinator.CONNECTOR_PROXY_MCP_NAME}_`;
		if (name.startsWith(prefix)) return this.builtinTools.get(name.slice(prefix.length));
	}
	/** {@link IConnectorMcpProxy.getMcpInvokeDims} */
	getMcpInvokeDims(toolName) {
		const isBuiltin = !!this.resolveBuiltinTool(toolName);
		return {
			mcpServer: isBuiltin ? "builtin" : this.resolveToolRoute(toolName) || "unknown",
			isBuiltin
		};
	}
	/**
	* Read a resource from the MCP server identified by configId.
	* Uses the existing pooled SDK Client (which already holds auth, transport, etc.).
	*/
	async readResourceForConnector(configId, uri) {
		const entry = this.clients.get(configId);
		if (!entry) throw new Error(`Connector "${configId}" is not registered`);
		if (entry.status !== "connected") throw new Error(`Connector "${configId}" is not connected (status=${entry.status})`);
		try {
			return await entry.client.readResource({ uri });
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			this.logger.warn(`[ConnectorMcpProxy] readResource(${configId}, ${uri}) failed: ${message}`);
			throw error;
		}
	}
	/**
	* Read a resource from the MCP server that currently owns the given tool.
	* Built-in tools are rejected because they have no upstream MCP connection.
	*/
	async readResourceForTool(prefixedToolName, uri) {
		const configId = this.resolveToolRoute(prefixedToolName);
		if (!configId) throw new Error(`Tool "${prefixedToolName}" is not routed to any connector`);
		return this.readResourceForConnector(configId, uri);
	}
	/**
	* 获取连接器（非自定义 MCP）的工具名列表
	* 用于 buildConnectorProxyMcpConfig 标记这些工具为非延迟加载
	*/
	getConnectorToolNames() {
		const names = [];
		for (const [configId, entry] of this.clients) {
			if (configId.startsWith("custom-mcp:")) continue;
			if (this.shouldHideToolsFromCli(this.extractServerShortName(configId))) continue;
			if (entry.status === "connected") for (const tool of entry.tools) names.push(tool.name);
		}
		this.logger.info(`[ConnectorMcpProxy] getConnectorToolNames: clients=${this.clients.size}, connectorTools=[${names.join(", ")}]`);
		return names;
	}
	/**
	* 获取 connector 工具名 → serverShortName 映射（透明代理配置用）
	* 返回如 { "qq-mail_search_mail": "qq-mail", "lexiang_search_docs": "lexiang" }
	*/
	getToolServerMap() {
		const map = {};
		for (const [serverShortName, selection] of this.selectPrimaryConnectedClientsByShortName()) {
			if (this.shouldHideToolsFromCli(serverShortName)) continue;
			for (const tool of selection.entry.tools) map[tool.name] = serverShortName;
		}
		return map;
	}
	classifyPreflightState(configId, entry) {
		if (!entry) {
			this.logger.info(`[ConnectorMcpProxy] preflight(${configId}): MISSING — no client entry`);
			return "missing";
		}
		if (entry.status === "connected") return "ready";
		if (entry.status === "unauthorized" || entry.needsAuth) {
			this.logger.info(`[ConnectorMcpProxy] preflight(${configId}): AUTH — status=${entry.status}, needsAuth=${entry.needsAuth}`);
			return "auth";
		}
		if (entry.status === "connecting") {
			this.logger.info(`[ConnectorMcpProxy] preflight(${configId}): RECOVERING — status=connecting`);
			return "recovering";
		}
		this.logger.info(`[ConnectorMcpProxy] preflight(${configId}): TRANSPORT — status=${entry.status}, error=${entry.error}`);
		return "transport";
	}
	classifyCallToolError(error, configId, entry) {
		const message = error instanceof Error ? error.message : String(error);
		const errorCode = error instanceof Error ? error.code : void 0;
		if (this.isAuthMessage(message)) {
			this.logger.info(`[ConnectorMcpProxy] classifyError(${configId}): AUTH — message contains auth signal`);
			return "auth";
		}
		if (isHttpBusinessError(error)) {
			this.logger.info(`[ConnectorMcpProxy] classifyError(${configId}): BUSINESS — http ${error.code}`);
			return "business";
		}
		if (isTransportErrorByCode(error)) {
			this.logger.info(`[ConnectorMcpProxy] classifyError(${configId}): TRANSPORT — matched Node error code chain`);
			return "transport";
		}
		const fallbackHit = FALLBACK_TRANSPORT_MESSAGE_PATTERNS.find((re) => re.test(message));
		if (fallbackHit) {
			this.logger.info(`[ConnectorMcpProxy] classifyError(${configId}): TRANSPORT — fallback message pattern matched: ${fallbackHit}`);
			return "transport";
		}
		if (entry.status !== "connected") {
			this.logger.info(`[ConnectorMcpProxy] classifyError(${configId}): TRANSPORT — defensive fallback because entry.status=${entry.status} (not connected). Error did not match code/message signals: errorCode=${errorCode ?? "(none)"}, message="${message.substring(0, 200)}"`);
			return "transport";
		}
		this.logger.info(`[ConnectorMcpProxy] classifyError(${configId}): UNKNOWN — no transport signal, entry.status=connected, errorCode=${errorCode ?? "(none)"}, message="${message.substring(0, 100)}"`);
		return "unknown";
	}
	/**
	* 判断错误消息是否属于"认证失败"。
	*
	* 历史实现是 `includes('Unauthorized') || includes('401')` —— 子串匹配会把
	* URL/请求 ID/数字串里偶然出现的 "401"/"unauthorized" 误判为 token 失效，
	* 导致连接器被错误地标成 unauthorized、UI 弹"重新授权"。
	*
	* 收紧规则（保持与 SKIP_FALLBACK_PATTERNS 一致的判定语义）：
	*   - 401 必须处在 HTTP 状态码语境（前后非数字），避免 4012 / id=4011 之类误命中；
	*   - "Unauthorized" 走"左侧词边界 + 右侧可接 Error/Exception 后缀"，覆盖
	*     "401 Unauthorized" / "OAuth UnauthorizedError" 等常见写法，但不会被
	*     "rfc_unauthorized_xxx" 这种右侧紧跟下划线/字母数字的标识符误命中。
	*
	* 注意：403 不在此判定内 —— 403 表示"已认证但无权限"，重新走 OAuth 也无意义，
	* 应该当作 transport/unknown 错误冒泡给上层，而不是触发 markUnauthorized。
	*/
	static AUTH_MESSAGE_PATTERNS = [/(?:^|[^0-9])401(?:[^0-9]|$)/, /\bunauthorized(?:error|exception)?\b/i];
	/** OneID MCP 业务错误码/消息同样表示 token 失效，需要走 auth 恢复路径。 */
	static ONEID_AUTH_MESSAGE_PATTERNS = [
		/\b400006\b/,
		/oneid\s+token\s+invalid/i,
		/invalid\s+or\s+expired\s+oneid\s+access\s+token/i
	];
	/**
	* OAuth 2.0 (RFC 6750) 标准 token 失效信号。
	*
	* 部分 SaaS（如腾讯文档）在 access_token 失效时不会返回 HTTP 401，而是返回
	*   {"error":"invalid_token","error_description":"invalid or expired token"}
	* SDK 把该 JSON 拼进 error.message，原 401/Unauthorized 模式不会命中，导致
	* tryReconnect 走 transport 分支、跳过 refreshExternalAuthBeforeReconnect，
	* 用旧 token 反复重试最终进入 backoffProbe（用户体感"超时/连不上"）。
	*
	* 这里独立成组而非塞进 AUTH_MESSAGE_PATTERNS：
	*   - 这是 RFC 6750 定义的标准 OAuth Bearer 错误码，跨 vendor 通用，与
	*     "401 状态码字面" 是两个不同的判定维度，独立更清晰；
	*   - iOA 的 HTML 错误页中没有 invalid_token 字样，新增模式不会回归。
	*/
	static OAUTH_TOKEN_INVALID_PATTERNS = [/\binvalid_token\b/i, /\binvalid\s+or\s+expired\s+(?:access\s+)?token\b/i];
	/**
	* iOA 网关在设备认证失效时返回 HTML 错误页（含 `401 Unauthorized Device` /
	* 「检查 iOA 登录状态」/「注销 iOA 重新登录」），SDK transport 把整个 HTML
	* 拼进 error.message，会被 AUTH_MESSAGE_PATTERNS 误命中（"401" 字面）。
	*
	* 但 iOA 设备认证 ≠ MCP server 的 OAuth token 失效：
	*   - token 还在有效期内
	*   - 走 OAuth 重授权流程也救不了（iOA 是另一套 SSO）
	*   - UI 不应该显示「需要认证 / 连接」按钮，应提示用户检查 iOA 登录状态
	*
	* 因此把 iOA 的 HTML 401 从 isAuthMessage 排除，让它走 transport 错误分支。
	* 上层的 tryReconnect / 健康检查会照常对网络瞬态做重试和恢复。
	*/
	static IOA_DEVICE_UNAUTHORIZED_PATTERNS = [
		/401\s+Unauthorized\s+Device/i,
		/检查\s*iOA\s*登录状态/,
		/注销\s*iOA\s*重新登录/
	];
	isIOADeviceUnauthorized(message) {
		return _ConnectorMcpProxy.IOA_DEVICE_UNAUTHORIZED_PATTERNS.some((p) => p.test(message));
	}
	isAuthMessage(message) {
		if (this.isIOADeviceUnauthorized(message)) return false;
		return _ConnectorMcpProxy.AUTH_MESSAGE_PATTERNS.some((p) => p.test(message)) || _ConnectorMcpProxy.ONEID_AUTH_MESSAGE_PATTERNS.some((p) => p.test(message)) || _ConnectorMcpProxy.OAUTH_TOKEN_INVALID_PATTERNS.some((p) => p.test(message));
	}
	markEntryUnauthorized(configId, error, options = {}) {
		const entry = this.clients.get(configId);
		if (!entry) return;
		const shouldNotify = options.notify ?? true;
		const wasConnected = entry.status === "connected";
		this.logger.info(`[ConnectorMcpProxy] markUnauthorized(${configId}): error=${error?.substring(0, 100)}, notify=${shouldNotify}`);
		entry.status = "unauthorized";
		entry.needsAuth = true;
		entry.error = error ? this.appendManagedAuthContext(error, entry.serverConfig) : error;
		entry.lastFailureKind = "auth";
		entry.lastFailureAt = Date.now();
		this.stopHealthCheck(configId);
		this.stopBackoffProbe(configId);
		if (wasConnected) this.metric.transportError(configId, "auth");
		if (shouldNotify && this.unauthorizedCallback) try {
			this.unauthorizedCallback(configId, error);
		} catch (err) {
			this.logger.warn(`[ConnectorMcpProxy] unauthorizedCallback(${configId}) threw:`, err);
		}
	}
	/**
	* 为 WorkBuddy 托管认证的 connector 错误信息附加 oauthName 前缀，
	* 便于 UI / 日志定位是哪一个 server-side MCP 出了问题。
	*
	* 如果错误消息已包含 "oauthName=" 前缀则原样返回（幂等）。
	*/
	appendManagedAuthContext(error, serverConfig) {
		const auth = serverConfig?._workbuddyManagedAuth;
		const oauthName = serverConfig?._workbuddyManagedAuthOauthName;
		if (auth !== "server-side" || typeof oauthName !== "string" || oauthName.length === 0) return error;
		const prefix = `oauthName=${oauthName}: `;
		if (error.startsWith(prefix)) return error;
		return `${prefix}${error}`;
	}
	markEntryConnected(configId) {
		const entry = this.clients.get(configId);
		if (!entry) return;
		this.logger.info(`[ConnectorMcpProxy] markConnected(${configId}): clearing recovery state`);
		entry.status = "connected";
		entry.needsAuth = false;
		entry.error = void 0;
		entry.lastFailureKind = void 0;
		entry.lastFailureAt = void 0;
		entry.reconnectAttempts = 0;
		entry.consecutivePingFailures = 0;
		const now = Date.now();
		entry.connectedAt = now;
		entry.lastPingAt = now;
		entry.lastActivityAt = void 0;
		entry.lastTransportErrorAt = void 0;
		this.stopBackoffProbe(configId);
	}
	/**
	* 把条目标记为 'error' 状态：transport / network / 其他非 auth 类失败。
	*
	* 与 markEntryUnauthorized 对照：
	*   - markEntryUnauthorized：OAuth token 失效，必须用户重新授权（终态）
	*   - markEntryError：网络 / 服务端瞬态 / iOA 网关问题，自动 backoff probe 探活恢复
	*
	* UI 端应区分两种状态显示不同提示：
	*   - unauthorized → 「需要认证」+「连接」按钮（触发 OAuth）
	*   - error → 「连接失败 / 网络异常」+「重连」按钮（触发 tryReconnect）
	*/
	markEntryError(configId, error) {
		const entry = this.clients.get(configId);
		if (!entry) return;
		const wasConnected = entry.status === "connected";
		this.logger.info(`[ConnectorMcpProxy] markError(${configId}): error=${error?.substring(0, 100)}`);
		entry.status = "error";
		entry.needsAuth = false;
		entry.error = error;
		entry.lastFailureKind = "transport";
		entry.lastFailureAt = Date.now();
		this.stopHealthCheck(configId);
		if (wasConnected) this.metric.transportError(configId, "transport");
	}
	/**
	* 启动指数退避探活：connector 进入 'error' 状态后用 30s/1m/2m/5m/10m 节奏
	* 周期性 tryReconnect，直到成功或耗尽重试。
	*
	* @param attempt 当前重试索引（0-based），递归调用时 +1
	*/
	startBackoffProbe(configId, attempt = 0) {
		this.stopBackoffProbe(configId);
		if (attempt >= _ConnectorMcpProxy.BACKOFF_PROBE_DELAYS_MS.length) {
			this.logger.info(`[ConnectorMcpProxy] backoffProbe(${configId}): EXHAUSTED — all ${_ConnectorMcpProxy.BACKOFF_PROBE_DELAYS_MS.length} probes failed, giving up`);
			return;
		}
		const delayMs = _ConnectorMcpProxy.BACKOFF_PROBE_DELAYS_MS[attempt];
		this.logger.info(`[ConnectorMcpProxy] backoffProbe(${configId}): scheduled attempt ${attempt + 1}/${_ConnectorMcpProxy.BACKOFF_PROBE_DELAYS_MS.length} in ${delayMs}ms`);
		const timer = setTimeout(async () => {
			this.backoffProbeTimers.delete(configId);
			const entry = this.clients.get(configId);
			if (!entry || entry.status !== "error") {
				this.logger.info(`[ConnectorMcpProxy] backoffProbe(${configId}): SKIP — status changed to ${entry?.status ?? "(removed)"}`);
				return;
			}
			this.logger.info(`[ConnectorMcpProxy] backoffProbe(${configId}): probing attempt ${attempt + 1}`);
			try {
				if (await this.tryReconnect(configId, { reason: "health-check" })) {
					this.logger.info(`[ConnectorMcpProxy] backoffProbe(${configId}): RECOVERED`);
					return;
				}
				if (this.clients.get(configId)?.status === "error") this.startBackoffProbe(configId, attempt + 1);
			} catch (probeError) {
				this.logger.warn(`[ConnectorMcpProxy] backoffProbe(${configId}): exception, continuing backoff: ${probeError}`);
				this.startBackoffProbe(configId, attempt + 1);
			}
		}, delayMs);
		this.backoffProbeTimers.set(configId, timer);
	}
	stopBackoffProbe(configId) {
		const timer = this.backoffProbeTimers.get(configId);
		if (timer) {
			clearTimeout(timer);
			this.backoffProbeTimers.delete(configId);
		}
	}
	/** 路由 tool call（builtin 优先，再路由 connector），wb.connector.invoke 由 ProxyServer 统一上报。 */
	async callTool(name, args, context, onProgress) {
		this.logger.info(`[ConnectorMcpProxy] callTool: name=${name}, args=${JSON.stringify(args).substring(0, 200)}`);
		const builtin = this.resolveBuiltinTool(name);
		if (builtin) {
			this.logger.info(`[ConnectorMcpProxy] callTool: routing to builtin tool "${name}"`);
			try {
				return await builtin.handler(args, context);
			} catch (error) {
				return {
					content: [{
						type: "text",
						text: `Error: ${error instanceof Error ? error.message : String(error)}`
					}],
					isError: true
				};
			}
		}
		const configId = this.resolveToolRoute(name);
		this.logger.info(`[ConnectorMcpProxy] callTool: toolRoutes lookup "${name}" → configId=${configId || "(not found)"}`);
		if (!configId) throw new Error(`Tool "${name}" not found in any connected connector`);
		if (this.getDisabledToolNames(configId).has(name)) {
			this.logger.warn(`[ConnectorMcpProxy] callTool: tool "${name}" is disabled by user on connector "${configId}", refusing to forward`);
			throw new Error(`Tool "${name}" is disabled by user`);
		}
		let entry = this.clients.get(configId);
		this.logger.info(`[ConnectorMcpProxy] callTool: connector "${configId}" status=${entry?.status || "(no entry)"}, needsAuth=${entry?.needsAuth}, tools=${entry?.tools.length || 0}`);
		const preflight = this.classifyPreflightState(configId, entry);
		if (preflight === "missing") throw new Error(`Connector "${configId}" is unavailable`);
		if (preflight === "auth") throw new Error(`Connector "${configId}" requires re-authorization`);
		if (preflight === "recovering") throw new Error(`Connector "${configId}" is reconnecting`);
		if (preflight === "transport") {
			if (!await this.tryReconnect(configId, { reason: "runtime-transport" })) throw new Error(`Connector "${configId}" is unavailable`);
			entry = this.clients.get(configId);
		}
		if (!entry || entry.status !== "connected") throw new Error(`Connector "${configId}" is not connected`);
		const originalName = this.toolOriginalNames.get(name) || name;
		const callContext = {
			configId,
			toolName: name,
			originalToolName: originalName,
			args: summarizeConnectorToolArgsForLog(args)
		};
		const buildForwardRequest = () => buildConnectorCallToolRequest(configId, originalName, args, context);
		const buildRequestOptions = () => {
			const options = {
				timeout: this.getRuntimeRequestTimeout(entry.serverConfig),
				resetTimeoutOnProgress: true
			};
			if (onProgress) options.onprogress = (p) => {
				try {
					onProgress(p.progress, p.total, p.message);
				} catch (err) {
					this.logger.debug?.(`[ConnectorMcpProxy] onProgress callback threw for "${name}": ${err instanceof Error ? err.message : String(err)}`);
				}
			};
			return options;
		};
		const resolveRequestAuthHeaders = async (targetConfigId) => {
			if (!this.resolveRequestAuthInjectionHeaders) return;
			try {
				const headers = await this.resolveRequestAuthInjectionHeaders(targetConfigId, context?.workbuddySessionId, context?.projectId);
				return Object.keys(headers).length > 0 ? headers : void 0;
			} catch (error) {
				const message = error instanceof Error ? error.message : String(error);
				this.logger.warn(`${AUTH_INJECTION_LOG_PREFIX} resolve failed configId=${targetConfigId} error=${message}`);
				return;
			}
		};
		const getModelHeaders = () => context?.modelId ? { [require_common$2.MODEL_ID_HEADER]: context.modelId } : void 0;
		const logOutboundArdotRequest = (request) => {
			if (configId !== ARDOT_MCP_CONFIG_ID) return;
			this.logger.info(formatConnectorProxyLog("[ConnectorMcpProxy] outbound Ardot tools/call request", {
				configId,
				toolName: name,
				originalToolName: originalName,
				hasArguments: Object.keys(request.arguments).length > 0,
				workbuddySessionId: request._meta?.["workbuddy.ai/sessionId"],
				metaKeys: request._meta ? Object.keys(request._meta) : []
			}));
		};
		const executeForwardCall = async () => {
			this.logger.info(`[ConnectorMcpProxy] callTool: forwarding configId=${configId} toolName=${name} originalToolName=${originalName} args=${JSON.stringify(callContext.args).substring(0, 500)}`);
			entry.lastActivityAt = Date.now();
			try {
				const request = buildForwardRequest();
				logOutboundArdotRequest(request);
				const requestAuthHeaders = await resolveRequestAuthHeaders(configId);
				const result = await this.requestScopedHeaders.run(requestAuthHeaders ?? {}, () => withExtraHeaders(entry.client, getModelHeaders(), () => entry.client.callTool(request, void 0, buildRequestOptions())));
				this.logger.info(`[ConnectorMcpProxy] callTool: result configId=${configId} toolName=${name} originalToolName=${originalName} result=${JSON.stringify(result).substring(0, 200)}`);
				return this.markQqMailConfirmationRequired(configId, originalName, result) ?? result;
			} catch (error) {
				const message = error instanceof Error ? error.message : String(error);
				this.logger.error(`[ConnectorMcpProxy] callTool: error from "${configId}" tool "${name}": ${message}`);
				this.logger.error(formatConnectorProxyLog("[ConnectorMcpProxy] callTool primary attempt failed", {
					...callContext,
					entryStatus: entry.status,
					error: serializeConnectorProxyErrorForLog(error)
				}));
				const currentSessionId = entry.client.transport?.sessionId;
				if (isMcpSessionLost(error, currentSessionId)) {
					this.logger.info(`[ConnectorMcpProxy] callTool: MCP-SESSION-LOST for "${configId}" tool "${name}" — server returned 404 for request with sessionId=${currentSessionId.substring(0, 8)}... triggering new session (MCP spec 2025-11-25 §Session 4)`);
					const reconnected = await this.tryReconnect(configId, {
						reason: "session-lost",
						sourceError: error
					});
					let sessionReadyForRetry = reconnected;
					if (!reconnected && this.reconnectingPromises.has(configId)) {
						this.logger.info(`[ConnectorMcpProxy] callTool: session-lost detected concurrent reconnect in-flight for "${configId}" — waiting for it to complete before deciding`);
						sessionReadyForRetry = (await this.waitForReconnect(configId)).ok;
					}
					if (sessionReadyForRetry) {
						const retryEntry = this.clients.get(configId);
						if (retryEntry?.status === "connected") {
							this.logger.info(`[ConnectorMcpProxy] callTool: retrying after new MCP session for "${configId}" tool "${name}"`);
							try {
								const request = buildForwardRequest();
								logOutboundArdotRequest(request);
								const retryRequestAuthHeaders = await resolveRequestAuthHeaders(configId);
								const retryResult = await this.requestScopedHeaders.run(retryRequestAuthHeaders ?? {}, () => withExtraHeaders(retryEntry.client, getModelHeaders(), () => retryEntry.client.callTool(request, void 0, buildRequestOptions())));
								return this.markQqMailConfirmationRequired(configId, originalName, retryResult) ?? retryResult;
							} catch (retryError) {
								const retryMsg = retryError instanceof Error ? retryError.message : String(retryError);
								const retryCode = retryError instanceof Error ? retryError.code : void 0;
								this.logger.error(`[ConnectorMcpProxy] callTool: MCP-SESSION-LOST retry failed for "${configId}" tool "${name}": errorCode=${retryCode ?? "(none)"} message=${retryMsg}`);
								throw new Error(`Connector "${configId}" call failed after MCP session recovery. Retry error: ${retryMsg}`);
							}
						}
						this.logger.warn(`[ConnectorMcpProxy] callTool: session-lost reconnect reported success but entry.status=${retryEntry?.status ?? "(missing)"} at retry time for "${configId}" tool "${name}"`);
					}
					throw new Error(`Connector "${configId}" MCP session was lost (HTTP 404) and could not be re-established. Original error: ${message}`);
				}
				if (isReconnectRipple(error)) {
					this.logger.info(`[ConnectorMcpProxy] callTool: RIPPLE detected for "${configId}" tool "${name}" — waiting for in-flight reconnect and retrying once`);
					const waitResult = await this.waitForReconnect(configId);
					if (waitResult.ok) {
						const retryEntry = this.clients.get(configId);
						if (retryEntry?.status === "connected") {
							this.logger.info(`[ConnectorMcpProxy] callTool: RIPPLE retry for "${configId}" tool "${name}"`);
							try {
								const request = buildForwardRequest();
								logOutboundArdotRequest(request);
								const retryRequestAuthHeaders = await resolveRequestAuthHeaders(configId);
								const retryResult = await this.requestScopedHeaders.run(retryRequestAuthHeaders ?? {}, () => withExtraHeaders(retryEntry.client, getModelHeaders(), () => retryEntry.client.callTool(request, void 0, buildRequestOptions())));
								return this.markQqMailConfirmationRequired(configId, originalName, retryResult) ?? retryResult;
							} catch (retryError) {
								const retryMsg = retryError instanceof Error ? retryError.message : String(retryError);
								const retryCode = retryError instanceof Error ? retryError.code : void 0;
								this.logger.error(`[ConnectorMcpProxy] callTool: RIPPLE retry failed for "${configId}" tool "${name}": errorCode=${retryCode ?? "(none)"} message=${retryMsg}`);
								throw new Error(`Connector "${configId}" call failed after reconnect ripple retry. Retry error: ${retryMsg}`);
							}
						}
					}
					const failure = waitResult.ok ? {
						ok: false,
						reason: "reconnect-failed"
					} : waitResult;
					throw new Error(buildRippleFailureMessage(configId, failure));
				}
				const errorKind = this.classifyCallToolError(error, configId, entry);
				if (errorKind === "business") {
					entry.lastFailureKind = "business";
					entry.lastFailureAt = Date.now();
					const businessResult = buildBusinessErrorResult(error);
					this.logger.info(`[ConnectorMcpProxy] callTool: BUSINESS error from "${configId}" tool "${name}" — returning as tool result (isError:true) instead of throwing`);
					return this.markQqMailConfirmationRequired(configId, originalName, businessResult) ?? businessResult;
				}
				if (errorKind === "auth") {
					if (await this.tryReconnect(configId, {
						reason: "runtime-auth",
						sourceError: error
					})) {
						const retryEntry = this.clients.get(configId);
						if (retryEntry?.status === "connected") {
							this.logger.info(`[ConnectorMcpProxy] callTool: retrying after auth recovery for "${configId}"`);
							const request = buildForwardRequest();
							logOutboundArdotRequest(request);
							const retryRequestAuthHeaders = await resolveRequestAuthHeaders(configId);
							const retryResult = await this.requestScopedHeaders.run(retryRequestAuthHeaders ?? {}, () => withExtraHeaders(retryEntry.client, getModelHeaders(), () => retryEntry.client.callTool(request, void 0, buildRequestOptions())));
							return this.markQqMailConfirmationRequired(configId, originalName, retryResult) ?? retryResult;
						}
					}
					throw new Error(`Connector "${configId}" requires re-authorization`);
				}
				if (errorKind === "transport") {
					if (await this.tryReconnect(configId, {
						reason: "runtime-transport",
						sourceError: error
					})) {
						const retryEntry = this.clients.get(configId);
						if (retryEntry?.status === "connected") {
							this.logger.info(`[ConnectorMcpProxy] callTool: retrying after transport recovery for "${configId}"`);
							const request = buildForwardRequest();
							logOutboundArdotRequest(request);
							const retryRequestAuthHeaders = await resolveRequestAuthHeaders(configId);
							const retryResult = await this.requestScopedHeaders.run(retryRequestAuthHeaders ?? {}, () => withExtraHeaders(retryEntry.client, getModelHeaders(), () => retryEntry.client.callTool(request, void 0, buildRequestOptions())));
							return this.markQqMailConfirmationRequired(configId, originalName, retryResult) ?? retryResult;
						}
					}
					throw new Error(`Connector "${configId}" is unavailable after recovery. Original error: ${message}`);
				}
				throw error;
			}
		};
		if (shouldDedupeArdotCreateDesignCall(configId, name, originalName)) {
			const dedupeKey = buildArdotCreateDesignDedupeKey(configId, originalName, args);
			const existing = this.inFlightArdotCreateDesignCalls.get(dedupeKey);
			const now = Date.now();
			if (existing) {
				this.logger.info(`[ConnectorMcpProxy] callTool: dedupe in-flight ardot_create_design configId=${configId} toolName=${name} originalToolName=${originalName} ageMs=${now - existing.startedAt} key=${dedupeKey.substring(0, 200)} args=${JSON.stringify(callContext.args).substring(0, 500)}`);
				return existing.promise;
			}
			this.logger.info(`[ConnectorMcpProxy] callTool: create in-flight ardot_create_design configId=${configId} toolName=${name} originalToolName=${originalName} key=${dedupeKey.substring(0, 200)} args=${JSON.stringify(callContext.args).substring(0, 500)}`);
			const promise = executeForwardCall().finally(() => {
				if (this.inFlightArdotCreateDesignCalls.get(dedupeKey)?.promise === promise) {
					this.inFlightArdotCreateDesignCalls.delete(dedupeKey);
					this.logger.info(`[ConnectorMcpProxy] callTool: clear in-flight ardot_create_design configId=${configId} toolName=${name} originalToolName=${originalName} key=${dedupeKey.substring(0, 200)}`);
				}
			});
			this.inFlightArdotCreateDesignCalls.set(dedupeKey, {
				startedAt: now,
				promise
			});
			return promise;
		}
		return executeForwardCall();
	}
	/**
	* 获取单个 client 条目（供 ConnectorService 查询状态）
	*/
	getClientEntry(configId) {
		const entry = this.clients.get(configId);
		if (!entry) return;
		return {
			configId: entry.configId,
			client: entry.client,
			transport: null,
			tools: entry.tools,
			prompts: entry.prompts,
			resources: entry.resources,
			resourceTemplates: entry.resourceTemplates,
			status: entry.status,
			needsAuth: entry.needsAuth,
			error: entry.error
		};
	}
	/**
	* 获取所有 client 条目
	*/
	getAllClientEntries() {
		const result = /* @__PURE__ */ new Map();
		for (const [id, entry] of this.clients) result.set(id, {
			configId: entry.configId,
			client: entry.client,
			transport: null,
			tools: entry.tools,
			prompts: entry.prompts,
			resources: entry.resources,
			resourceTemplates: entry.resourceTemplates,
			status: entry.status,
			needsAuth: entry.needsAuth,
			error: entry.error
		});
		return result;
	}
	/**
	* 注册工具变更回调
	*/
	onToolsChanged(callback) {
		this.toolsChangedCallbacks.add(callback);
		return () => {
			this.toolsChangedCallbacks.delete(callback);
		};
	}
	/**
	* 注册 token 保存后回调（用于触发 TokenRefresher 重新设置刷新定时器）
	*/
	onTokensSaved(callback) {
		this.tokensSavedCallback = callback;
	}
	/**
	* 把刷新出的新 token 回灌到 provider 闭包的 memoryTokens。
	*
	* token 刷新路径（proxy.refreshTokenIfNeeded / 后台 ConnectorTokenRefresher）只调
	* oauthStore.saveTokens 写文件，不经过 provider.saveTokens，因此 provider 的内存
	* 缓存不会更新。而 provider.tokens() 内存优先短路（命中 memoryTokens 就不读文件），
	* 导致刷新后连接仍用过期旧 token → 401 → 周期性误弹授权页（Issue #59496）。
	*
	* 刷新成功写文件后调用本方法，恢复“内存 = source of truth”不变量。
	* 接受 connector: 前缀或裸 configId，统一归一化到 provider map 的 key。
	*/
	syncProviderMemoryTokens(configId, tokens) {
		const proxyConfigId = require_workbuddy_auth_product_coordinator.toProxyConfigId(configId);
		const writer = this.providerMemoryTokenWriters.get(proxyConfigId);
		if (writer) {
			writer(tokens);
			this.logger.info(`[ConnectorMcpProxy] syncProviderMemoryTokens(${proxyConfigId}): memory tokens updated after refresh`);
		}
	}
	/**
	* 读取指定 connector 内存 provider 缓存的 clientInfo（Issue #62378）。
	*
	* 后台 ConnectorTokenRefresher.doRefresh 磁盘缺 client_id 时，通过本方法回退拿
	* 内存里的 clientInformation()，用它 + 旧 refresh_token 完成刷新，避免 invalid_grant
	* 反复断连。接受 connector: 前缀或裸 configId，统一归一化到 provider map 的 key。
	* provider 不存在（未连接过 / 已销毁）时返回 undefined。
	*/
	getProviderMemoryClientInfo(configId) {
		const proxyConfigId = require_workbuddy_auth_product_coordinator.toProxyConfigId(configId);
		return this.providerMemoryClientInfoReaders.get(proxyConfigId)?.();
	}
	/**
	* 注册未授权事件回调：当某个 connector 被判定需要重新授权时触发。
	* 业务侧可在此感知 token 失效（例如腾讯文档的 mcp_token 过期），
	* 并驱动 UI 回到授权页。
	*/
	onUnauthorized(callback) {
		this.unauthorizedCallback = callback;
	}
	/**
	* 注册 runtime auth failure 重连前的外部鉴权刷新回调。
	* ConnectorService 通过这里把企业态 OneID `/accesstoken` 同步能力注入 proxy。
	*/
	onRefreshExternalAuthBeforeReconnect(callback) {
		this.refreshExternalAuthBeforeReconnect = callback;
	}
	onResolveRequestAuthInjectionHeaders(callback) {
		this.resolveRequestAuthInjectionHeaders = callback;
	}
	mergeRequestScopedHeadersForFetch(configId, initHeaders, requestInitHeaders) {
		const requestScopedHeaders = this.requestScopedHeaders.getStore() ?? {};
		if (Object.keys(requestScopedHeaders).length === 0) return {
			hasScopedHeaders: false,
			headers: initHeaders
		};
		const headers = new Headers(initHeaders ?? requestInitHeaders);
		for (const [key, value] of Object.entries(requestScopedHeaders)) headers.set(key, value);
		this.logger.debug?.(`${AUTH_INJECTION_LOG_PREFIX} request scoped headers applied configId=${configId} headers=[${Object.keys(requestScopedHeaders).join(",")}]`);
		return {
			hasScopedHeaders: true,
			headers
		};
	}
	/**
	* 检查是否有已保存的 OAuth token（未过期）
	*/
	hasSavedTokens(configId, serverUrl) {
		return !this.oauthStore.isTokenExpired(configId, serverUrl);
	}
	invalidateCredentials(configId, serverUrl, scope = "all", headers) {
		const provider = this.oauthProviders.get(configId);
		if (provider?.invalidateCredentials) {
			provider.invalidateCredentials(scope);
			return;
		}
		if (scope === "all") this.oauthStore.deleteAll(configId, serverUrl, headers);
		else if (scope === "client") this.oauthStore.deleteClientInfo(configId, serverUrl, headers);
		else if (scope === "tokens") this.oauthStore.clearAccessTokenOnly(configId, serverUrl, headers);
	}
	/**
	* 中断指定 connector 正在进行中的 OAuth Device Flow 轮询。
	*
	* 由 ConnectorService.cancelConnect 调用（用户在 Device Code Modal 点取消时）。
	* 找到 `activeDeviceFlows[configId]` 对应的 AbortController 调 `.abort()`，让正在
	* 轮询 token endpoint 的循环立即退出（loop 内监听 signal）。
	*
	* @returns true 如果有匹配的流程被中断；false 表示当前没有进行中的 device flow
	*   （可能流程已自然结束，或该 connector 走的是 authorization_code 而非 device flow）
	*/
	abortDeviceFlow(configId) {
		const controller = this.activeDeviceFlows.get(configId);
		if (!controller) return false;
		this.activeDeviceFlows.delete(configId);
		try {
			controller.abort();
			return true;
		} catch {
			return false;
		}
	}
	/**
	* 清理所有连接
	*/
	dispose() {
		for (const configId of this.healthCheckTimers.keys()) this.stopHealthCheck(configId);
		for (const configId of this.backoffProbeTimers.keys()) this.stopBackoffProbe(configId);
		for (const [configId, entry] of this.clients) entry.client.close().catch((err) => {
			this.logger.warn(`[ConnectorMcpProxy] dispose close(${configId}) error:`, err);
		});
		this.clients.clear();
		this.toolRoutes.clear();
		this.toolOriginalNames.clear();
		this.activeConfigs.clear();
		this.oauthProviders.clear();
		this.providerMemoryTokenWriters.clear();
		this.providerMemoryClientInfoReaders.clear();
		this.authorizationRedirectStarted.clear();
		this.oauthProviderSilentModes.clear();
		this.serverUrls.clear();
		this.resourceMetadataUrls.clear();
		this.stateToConfigId.clear();
		this.toolsChangedCallbacks.clear();
		this.statusChangedCallback = void 0;
	}
	/**
	* 仅清空进程内"与当前账号绑定的 OAuth 内存缓存"，不动磁盘 token、不动
	* client 列表、不动 callbacks。
	*
	* 用于"账号切换"场景：调用方应当先 sync({}) 把 clients 全部断掉，再调用本方法。
	*
	* 清理范围（仅与账号身份强相关的进程内状态）：
	* - oauthProviders：每个 provider 闭包里缓存了 memoryTokens / memoryClientInfo，
	*   不清会导致新账号 connect 命中旧账号 token；
	* - stateToConfigId：旧账号正在进行的 OAuth 授权 state 在新账号语境下不应再生效，
	*   清掉等价于让旧授权流程在 callback 时返回 "Unknown OAuth state"。
	*
	* 不清理（与账号无关或会破坏后续工作）：
	* - serverUrls / resourceMetadataUrls：MCP server URL/metadata 与账号无关；
	* - clients / toolRoutes / activeConfigs：由 sync({}) 负责对账清理；
	* - toolsChangedCallbacks / statusChangedCallback：ConnectorService 在 doInit
	*   时一次性注册且不会重新订阅，必须保留；
	* - oauthBaseUrl / callbackPort：全局配置，与账号无关。
	*/
	clearOAuthProviderCache() {
		this.oauthProviders.clear();
		this.providerMemoryTokenWriters.clear();
		this.providerMemoryClientInfoReaders.clear();
		this.authorizationRedirectStarted.clear();
		this.oauthProviderSilentModes.clear();
		this.stateToConfigId.clear();
		this.logger.info("[ConnectorMcpProxy] clearOAuthProviderCache: oauthProviders + auth redirect markers + stateToConfigId cleared");
	}
	/**
	* 处理 OAuth 回调 — 用 code 交换 token
	*
	* ProxyServer 收到 /oauth/callback 后调用此方法。
	* 通过 state 参数反查 configId（CSRF 防护），再用 code 交换 token。
	*
	* @param configIdFallback state 反查失败时从 URL pathname 解析的兜底 configId，
	*   用于 unknown state 场景让失败广播仍能携带 configId，UI 层可据此清理
	*   pendingOAuth。仅影响失败返回值与广播，不影响成功路径的 configId（成功路径
	*   始终用 state 反查到的 configId）。
	*/
	async handleOAuthCallback(state, code, configIdFallback) {
		const startedAt = Date.now();
		const configId = this.stateToConfigId.get(state);
		if (configId) {
			const redirectStartedAt = this.oauthRedirectStartedAt.get(configId);
			if (redirectStartedAt) {
				this.logger.info(`[ConnectorMcpProxy] OAuth callback intercepted: configId=${configId}, elapsed since redirect start=${startedAt - redirectStartedAt}ms`);
				this.oauthRedirectStartedAt.delete(configId);
			}
		}
		if (!configId) {
			const error = "Unknown OAuth state";
			this.logger.warn("[ConnectorMcpProxy] handleOAuthCallback: unknown state, possible CSRF attack");
			this.metric.oauthCallback({
				serverShortName: "unknown",
				durationMs: Date.now() - startedAt,
				outcome: "failed",
				errorKind: "unknown_state"
			});
			const result = {
				success: false,
				configId: configIdFallback,
				error
			};
			this.emitOAuthCompleted(result);
			return result;
		}
		const serverShortName = this.extractServerShortName(configId);
		const provider = this.oauthProviders.get(configId);
		const serverUrl = this.serverUrls.get(configId);
		if (!provider || !serverUrl) {
			const error = "Missing OAuth provider or server URL";
			this.logger.warn(`[ConnectorMcpProxy] handleOAuthCallback: no provider/url for ${configId}`);
			this.stateToConfigId.delete(state);
			const result = {
				success: false,
				configId,
				error
			};
			this.emitOAuthCompleted(result);
			this.metric.oauthCallback({
				serverShortName,
				durationMs: Date.now() - startedAt,
				outcome: "failed",
				errorKind: "no_provider"
			});
			return result;
		}
		try {
			const { exchangeAuthorization, discoverOAuthProtectedResourceMetadata, discoverAuthorizationServerMetadata, selectResourceURL } = await Promise.resolve().then(() => require("./auth.js")).then((n) => n.auth_exports);
			const exchangeStartedAt = Date.now();
			let authServerUrl = serverUrl;
			let protectedResourceMetaHit = false;
			let authServerFallbackKind = "none";
			let discoveredResourceMeta;
			const cachedResourceMetadataUrl = this.resourceMetadataUrls.get(configId);
			try {
				const resourceMeta = await discoverOAuthProtectedResourceMetadata(serverUrl, cachedResourceMetadataUrl ? { resourceMetadataUrl: cachedResourceMetadataUrl } : void 0);
				discoveredResourceMeta = resourceMeta;
				if (resourceMeta?.authorization_servers?.length) {
					authServerUrl = resourceMeta.authorization_servers[0];
					protectedResourceMetaHit = true;
					authServerFallbackKind = "protected-resource-meta";
				}
			} catch (discoveryError) {
				try {
					const rootUrl = new URL("/", serverUrl).toString();
					if (rootUrl !== authServerUrl) {
						authServerUrl = rootUrl;
						authServerFallbackKind = "root-origin";
					}
				} catch {}
				this.logger.warn(formatConnectorProxyLog("[ConnectorMcpProxy] OAuth token exchange: protected resource metadata unavailable, falling back to origin", {
					configId,
					serverUrl,
					authServerUrl,
					fallbackKind: authServerFallbackKind,
					resourceMetadataUrlHint: cachedResourceMetadataUrl ?? null,
					error: discoveryError instanceof Error ? discoveryError.message.slice(0, 200) : String(discoveryError).slice(0, 200)
				}));
			}
			const metadata = await discoverAuthorizationServerMetadata(authServerUrl);
			const clientInformation = await provider.clientInformation();
			const codeVerifier = await provider.codeVerifier();
			const redirectUri = provider.redirectUrl;
			const resource = await selectResourceURL(serverUrl, provider, discoveredResourceMeta);
			this.logger.info(formatConnectorProxyLog("[ConnectorMcpProxy] OAuth token exchange: request context", {
				configId,
				serverUrl,
				authServerUrl,
				protectedResourceMetaHit,
				authServerFallbackKind,
				resourceMetadataUrlHint: cachedResourceMetadataUrl ?? null,
				resource: resource?.toString() ?? null,
				tokenEndpoint: metadata?.token_endpoint,
				authorizationEndpoint: metadata?.authorization_endpoint,
				registrationEndpoint: metadata?.registration_endpoint,
				clientId: clientInformation?.client_id,
				redirectUri: typeof redirectUri === "string" ? redirectUri : redirectUri?.toString(),
				hasCodeVerifier: Boolean(codeVerifier),
				codeLength: code?.length ?? 0
			}));
			if (!clientInformation) {
				const error = "Missing OAuth client information";
				this.logger.warn(`[ConnectorMcpProxy] handleOAuthCallback: no clientInformation for ${configId}`);
				this.stateToConfigId.delete(state);
				const result = {
					success: false,
					configId,
					error
				};
				this.emitOAuthCompleted(result);
				this.metric.oauthCallback({
					serverShortName,
					durationMs: Date.now() - startedAt,
					outcome: "failed",
					errorKind: "no_client_info"
				});
				return result;
			}
			if (!redirectUri) {
				const error = "Missing OAuth redirect URI";
				this.logger.warn(`[ConnectorMcpProxy] handleOAuthCallback: no redirectUri for ${configId}`);
				this.stateToConfigId.delete(state);
				const result = {
					success: false,
					configId,
					error
				};
				this.emitOAuthCompleted(result);
				this.metric.oauthCallback({
					serverShortName,
					durationMs: Date.now() - startedAt,
					outcome: "failed",
					errorKind: "no_redirect_uri"
				});
				return result;
			}
			const tokens = await exchangeAuthorization(authServerUrl, {
				metadata,
				clientInformation,
				authorizationCode: code,
				codeVerifier,
				redirectUri,
				resource
			});
			await provider.saveTokens(tokens);
			this.stateToConfigId.delete(state);
			const tokenShape = tokens;
			this.logger.info(formatConnectorProxyLog("[ConnectorMcpProxy] OAuth token exchange: success", {
				configId,
				tokenEndpoint: metadata?.token_endpoint,
				tokenType: tokenShape.token_type,
				expiresIn: tokenShape.expires_in,
				scope: tokenShape.scope,
				hasRefreshToken: Boolean(tokenShape.refresh_token),
				elapsedMs: Date.now() - exchangeStartedAt
			}));
			const result = {
				success: true,
				configId
			};
			this.emitOAuthCompleted(result);
			this.metric.oauthCallback({
				serverShortName,
				durationMs: Date.now() - startedAt,
				outcome: "success"
			});
			return result;
		} catch (error) {
			const msg = error instanceof Error ? error.message : String(error);
			this.logger.error(formatConnectorProxyLog("[ConnectorMcpProxy] OAuth token exchange: failed", {
				configId,
				serverUrl,
				error: msg,
				errorName: error instanceof Error ? error.name : void 0
			}));
			this.stateToConfigId.delete(state);
			const result = {
				success: false,
				configId,
				error: msg
			};
			this.emitOAuthCompleted(result);
			this.metric.oauthCallback({
				serverShortName,
				durationMs: Date.now() - startedAt,
				outcome: "failed",
				errorKind: "exchange_failed"
			});
			return result;
		}
	}
	/**
	* 注册内置工具（Desktop MCP 工具，进程内执行）
	*/
	registerBuiltinTool(tool) {
		this.builtinTools.set(tool.name, tool);
		this.logger.info(`[ConnectorMcpProxy] Registered builtin tool: ${tool.name}`);
		this.notifyToolsChanged();
	}
	/**
	* 注销内置工具
	*/
	unregisterBuiltinTool(name) {
		const deleted = this.builtinTools.delete(name);
		if (deleted) {
			this.logger.info(`[ConnectorMcpProxy] Unregistered builtin tool: ${name}`);
			this.notifyToolsChanged();
		}
		return deleted;
	}
	/**
	* 检测配置是否变化（需要重连）
	* 参考 Craft: mcpConfigChanged()
	*/
	configChanged(configId, oldConfig, newConfig) {
		if (oldConfig.url !== newConfig.url) return true;
		if (oldConfig.type !== newConfig.type) return true;
		const serverUrl = newConfig.url ?? oldConfig.url;
		const isOAuthConnector = serverUrl ? !!this.oauthStore.loadClientInfo(configId, serverUrl, newConfig.headers) : false;
		const isManagedAuth = this.isWorkBuddyManagedAuthConfig(oldConfig);
		if (!isOAuthConnector && !isManagedAuth) {
			if (oldConfig.headers?.["Authorization"] !== newConfig.headers?.["Authorization"]) return true;
		}
		return false;
	}
	/**
	* 获取 sync 串行化锁
	*/
	acquireSyncLock() {
		let release;
		const prev = this.syncLockPromise;
		this.syncLockPromise = new Promise((resolve) => {
			release = resolve;
		});
		return prev.then(() => release);
	}
	/**
	* 对账式同步（带并发锁保护）
	*
	* 对比期望配置 vs 当前活跃连接，增量 connect/disconnect/reconnect。
	* 参考 Craft McpClientPool.sync()
	*/
	async sync(desiredConfigs) {
		const release = await this.acquireSyncLock();
		try {
			return await this.doSync(desiredConfigs);
		} finally {
			release();
		}
	}
	async doSync(desiredConfigs) {
		const desiredIds = new Set(Object.keys(desiredConfigs));
		const currentIds = new Set(this.clients.keys());
		const result = {
			added: [],
			removed: [],
			reconnected: [],
			failed: []
		};
		for (const id of currentIds) if (!desiredIds.has(id)) {
			if (this.inFlightConnects.has(id)) {
				this.logger.info(`[ConnectorMcpProxy] sync: skip removing in-flight ${id}`);
				continue;
			}
			await this.disconnect(id, "sync_removed");
			result.removed.push(id);
		}
		const toConnect = [];
		for (const [configId, config] of Object.entries(desiredConfigs)) if (!currentIds.has(configId)) toConnect.push({
			id: configId,
			config,
			isReconnect: false
		});
		else {
			const oldConfig = this.activeConfigs.get(configId);
			const entry = this.clients.get(configId);
			const statusBroken = entry !== void 0 && entry.status === "error";
			const configHasChanged = oldConfig !== void 0 && this.configChanged(configId, oldConfig, config);
			if (configHasChanged || statusBroken) {
				const reason = configHasChanged ? "config changed" : `status=${entry?.status}`;
				this.logger.info(`[ConnectorMcpProxy] sync: ${reason} for ${configId}, reconnecting`);
				await this.disconnect(configId, configHasChanged ? "config_changed" : "status_broken");
				toConnect.push({
					id: configId,
					config,
					isReconnect: true
				});
			} else {
				this.activeConfigs.set(configId, { ...config });
				if (entry) entry.serverConfig = { ...config };
			}
		}
		if (toConnect.length > 0) {
			const connectResults = await Promise.allSettled(toConnect.map(({ id, config, isReconnect }) => {
				const syncTimeout = this.getConnectTimeout(config) + 2e3;
				return Promise.race([this.connect(id, config, true).then((r) => ({
					id,
					isReconnect,
					result: r
				})), new Promise((_, reject) => setTimeout(() => reject(/* @__PURE__ */ new Error(`Connection timeout (${syncTimeout}ms) for ${id}`)), syncTimeout))]);
			}));
			for (const r of connectResults) if (r.status === "fulfilled") {
				const { id, isReconnect, result: connectResult } = r.value;
				if (connectResult.success) (isReconnect ? result.reconnected : result.added).push(id);
				else {
					result.failed.push(id);
					this.logger.warn(`[ConnectorMcpProxy] sync: connect ${id} returned failure: ${connectResult.error}`);
				}
			} else {
				const errorMsg = r.reason instanceof Error ? r.reason.message : String(r.reason);
				this.logger.warn(`[ConnectorMcpProxy] sync: connect failed: ${errorMsg}`);
				result.failed.push(errorMsg);
			}
		}
		if (result.added.length > 0 || result.removed.length > 0 || result.reconnected.length > 0) this.notifyToolsChanged();
		this.logger.info(`[ConnectorMcpProxy] sync complete: +${result.added.length} -${result.removed.length} ~${result.reconnected.length} !${result.failed.length}`);
		return result;
	}
	/**
	* 创建 OAuthClientProvider（打通持久化 + 随机 state CSRF 防护）
	*
	* - tokens()/saveTokens(): 内存 + oauthStore 双写
	* - clientInformation()/saveClientInformation(): 内存 + oauthStore 双写
	* - state(): 随机 32 字节，通过 stateToConfigId 映射反查
	* - silent=true 时 redirectToAuthorization 抛 Unauthorized（不弹浏览器）
	*/
	createOAuthProvider(configId, serverUrl, silent, headers) {
		let memoryTokens;
		let memoryClientInfo;
		let codeVerifierValue;
		this.providerMemoryTokenWriters.set(configId, (tokens) => {
			memoryTokens = tokens;
		});
		this.providerMemoryClientInfoReaders.set(configId, () => memoryClientInfo);
		const oauthStore = this.oauthStore;
		const stateToConfigId = this.stateToConfigId;
		const callbackPort = this.callbackPort;
		const tokensSavedCallback = this.tokensSavedCallback;
		const authorizationRedirectStartedSet = this.authorizationRedirectStarted;
		const oauthRedirectStartedAtMap = this.oauthRedirectStartedAt;
		const logger = this.logger;
		const tokenSavedAtMap = this.tokenSavedAt;
		const hostCapabilities = this.hostCapabilities;
		const getRedirectUrl = () => {
			if (this.oauthBaseUrl) {
				const encodedConfigId = encodeURIComponent(configId);
				return `${this.oauthBaseUrl}/${encodedConfigId}/oauth/callback`;
			}
			return `http://127.0.0.1:${callbackPort}/oauth/callback`;
		};
		return {
			get redirectUrl() {
				return getRedirectUrl();
			},
			get clientMetadata() {
				return {
					redirect_uris: [getRedirectUrl()],
					client_name: `WorkBuddy Connector (${configId})`,
					token_endpoint_auth_method: "none",
					grant_types: ["authorization_code", "refresh_token"],
					response_types: ["code"]
				};
			},
			state() {
				const randomState = crypto.default.randomBytes(32).toString("base64url");
				stateToConfigId.set(randomState, configId);
				return randomState;
			},
			clientInformation() {
				if (memoryClientInfo) return memoryClientInfo;
				return oauthStore.loadClientInfo(configId, serverUrl, headers);
			},
			saveClientInformation(info) {
				memoryClientInfo = info;
				const ci = info;
				oauthStore.saveClientInfo(configId, serverUrl, ci, headers);
			},
			tokens() {
				if (memoryTokens) return memoryTokens;
				return oauthStore.loadTokens(configId, serverUrl, headers);
			},
			saveTokens(t) {
				memoryTokens = t;
				oauthStore.saveTokens(configId, serverUrl, t, headers);
				if (memoryClientInfo && !oauthStore.loadClientInfo(configId, serverUrl, headers)) {
					oauthStore.saveClientInfo(configId, serverUrl, memoryClientInfo, headers);
					logger.info(`[ConnectorMcpProxy] saveTokens(${configId}): backfilled missing client_id from memory (Issue #62378)`);
				}
				tokensSavedCallback?.(configId, serverUrl, t, headers);
				tokenSavedAtMap.set(configId, Date.now());
			},
			async redirectToAuthorization(authorizationUrl) {
				if (silent) {
					logger.info(`[ConnectorMcpProxy] OAuth redirect suppressed for ${configId}: silent connect`);
					throw new Error("Unauthorized");
				}
				authorizationRedirectStartedSet.add(configId);
				oauthRedirectStartedAtMap.set(configId, Date.now());
				logger.info(`[ConnectorMcpProxy] OAuth start: opening browser for ${configId}, url=${authorizationUrl.toString()}`);
				await hostCapabilities.openExternal(authorizationUrl.toString());
			},
			async validateResourceURL(serverUrl, resourceFromMetadata) {
				if (resourceFromMetadata) return new URL(resourceFromMetadata);
				return typeof serverUrl === "string" ? new URL(serverUrl) : serverUrl;
			},
			saveCodeVerifier(verifier) {
				codeVerifierValue = verifier;
			},
			codeVerifier() {
				if (!codeVerifierValue) codeVerifierValue = crypto.default.randomBytes(32).toString("base64url");
				return codeVerifierValue;
			},
			invalidateCredentials(scope) {
				switch (scope) {
					case "all":
						memoryClientInfo = void 0;
						memoryTokens = void 0;
						codeVerifierValue = void 0;
						oauthStore.deleteAll(configId, serverUrl, headers);
						break;
					case "client":
						memoryClientInfo = void 0;
						oauthStore.deleteClientInfo(configId, serverUrl, headers);
						break;
					case "tokens":
						memoryTokens = void 0;
						oauthStore.clearAccessTokenOnly(configId, serverUrl, headers);
						break;
					case "verifier":
						codeVerifierValue = void 0;
						break;
				}
			}
		};
	}
	shouldLogStdioStderr() {
		return Boolean(process.env.CONNECTOR_MCP_DEBUG_STDERR || process.env.MCP_DEBUG);
	}
	attachStdioDebugOutput(configId, transport) {
		if (!this.shouldLogStdioStderr()) return;
		const stderr = transport.stderr;
		if (!stderr || typeof stderr.on !== "function") return;
		stderr.on("data", (chunk) => {
			const trimmed = (Buffer.isBuffer(chunk) ? chunk.toString() : String(chunk ?? "")).trim();
			if (trimmed) this.logger.info(`[ConnectorMcpProxy][stdio:${configId}] ${trimmed}`);
		});
	}
	createClient(configId) {
		return new Client({
			name: `connector:${configId}`,
			version: "1.0.0"
		});
	}
	createConnectingEntry(configId, client, serverConfig) {
		return {
			configId,
			client,
			tools: [],
			status: "connecting",
			needsAuth: false,
			error: void 0,
			reconnectAttempts: 0,
			manualDisconnect: false,
			serverConfig: { ...serverConfig }
		};
	}
	/**
	* 解析 mcp.json 的 timeout 字段为毫秒。
	* - 用户值 < 1000 视为秒（兼容老配置 `timeout: 30`）
	* - URL MCP 沿用 60s 默认/下限；stdio MCP 使用 120s 默认/下限
	*/
	getConnectTimeout(serverConfig) {
		const configTimeout = serverConfig.timeout;
		const parsedTimeout = this.parseTimeoutMs(configTimeout);
		return Math.max(this.getMinimumTimeout(serverConfig), parsedTimeout);
	}
	getRuntimeRequestTimeout(serverConfig) {
		const parsedTimeout = this.parseTimeoutMs(serverConfig?.timeout);
		return Math.max(this.getMinimumTimeout(serverConfig), parsedTimeout);
	}
	getMinimumTimeout(serverConfig) {
		return this.isStdioServerConfig(serverConfig) ? _ConnectorMcpProxy.STDIO_MIN_CONNECT_TIMEOUT_MS : _ConnectorMcpProxy.MIN_CONNECT_TIMEOUT_MS;
	}
	isStdioServerConfig(serverConfig) {
		return Boolean(serverConfig?.command || serverConfig?.type === "stdio");
	}
	isWorkBuddyManagedAuthConfig(serverConfig) {
		const managed = serverConfig?._workbuddyManagedAuth;
		return managed === "enterprise" || managed === "server-side";
	}
	parseTimeoutMs(configTimeout) {
		return configTimeout ? configTimeout < 1e3 ? configTimeout * 1e3 : configTimeout : 0;
	}
	hasAuthorizationRedirectStarted(configId) {
		return this.authorizationRedirectStarted.has(configId);
	}
	getOrCreateAuthProvider(configId, serverUrl, silent, headers) {
		if (this.isExternallyManaged(configId, serverUrl, headers)) return;
		let authProvider = this.oauthProviders.get(configId);
		const providerSilent = this.oauthProviderSilentModes.get(configId);
		if (!authProvider || providerSilent !== silent || !silent) {
			authProvider = this.createOAuthProvider(configId, serverUrl, silent, headers);
			this.oauthProviders.set(configId, authProvider);
			this.oauthProviderSilentModes.set(configId, silent);
		}
		return authProvider;
	}
	getWorkbuddyConfigDir() {
		return process.env.WORKBUDDY_CONFIG_DIR?.trim() || process.env.CODEBUDDY_CONFIG_DIR?.trim() || (0, path.join)((0, os.homedir)(), ".workbuddy");
	}
	sanitizeRuntimeDirName(configId) {
		return `${configId.replace(/[^a-zA-Z0-9._-]+/g, "_").replace(/^_+|_+$/g, "").slice(0, 80) || "mcp-server"}-${crypto.default.createHash("sha256").update(configId).digest("hex").slice(0, 8)}`;
	}
	/**
	* 把显式配置的 cwd 解析成一个可用目录：
	* - 已存在且是目录 → 直接用
	* - 不存在 → 自动 mkdir -p（对齐默认 cwd 的创建语义，避免让用户先手动 mkdir）
	* - 已存在但不是目录（指向文件 / 符号链接到文件等）→ fail-fast，属于真正的
	*   配置错误，自动创建无法修复，继续走会导致 spawn 行为不可预期
	*/
	ensureDirectory(cwd, configId) {
		const resolved = (0, path.resolve)(cwd);
		if ((0, fs.existsSync)(resolved)) {
			if (!(0, fs.statSync)(resolved).isDirectory()) throw new Error(`Configured cwd for MCP server "${configId}" is not a directory: ${resolved}`);
			return resolved;
		}
		try {
			(0, fs.mkdirSync)(resolved, { recursive: true });
		} catch (err) {
			const message = err instanceof Error ? err.message : String(err);
			throw new Error(`Configured cwd for MCP server "${configId}" could not be created at ${resolved}: ${message}`);
		}
		return resolved;
	}
	/**
	* 默认 stdio MCP 工作目录基底。
	*
	* 设计决策（与 ConnectorService.resolveOwnedMcpProcessCwd 保持同步）：
	* 第三方 MCP 子进程会以相对路径写运行时产物（最常见的是 winston 的
	* `logs/mcp-xxx-YYYY-MM-DD.log`），这些其实都是业务日志，应当和
	* WorkBuddy 其它业务日志（update / perf / network / migration）放在
	* 同一日志树下，以便被「Open Logs Folder」/ 用户反馈打包流程自动带走，
	* 跨平台路径也保持一致。
	*
	*   macOS:   ~/.workbuddy/logs/mcp-runtime/<safe-id>/
	*   Windows: %USERPROFILE%\.workbuddy\logs\mcp-runtime\<safe-id>\
	*
	* 早期实现曾放在 `<userData>/mcp-runtime/` 下，但那棵树本身不会进入
	* 日志打包流程，第三方 MCP 自己写的 `logs/` 会被用户「隐式丢失」。
	*/
	getDefaultStdioCwd(configId) {
		return (0, path.join)(this.getWorkbuddyConfigDir(), "logs", "mcp-runtime", this.sanitizeRuntimeDirName(configId));
	}
	resolveStdioCwd(configId, serverConfig) {
		const defaultCwd = this.getDefaultStdioCwd(configId);
		(0, fs.mkdirSync)(defaultCwd, { recursive: true });
		const configuredCwd = typeof serverConfig.cwd === "string" ? serverConfig.cwd.trim() : "";
		if (!configuredCwd) return defaultCwd;
		const resolvedCwd = (0, path.isAbsolute)(configuredCwd) ? configuredCwd : (0, path.join)(defaultCwd, configuredCwd);
		return this.ensureDirectory(resolvedCwd, configId);
	}
	/**
	* 解析本地 CLI host runtime 的 service proxy 端点，用于注入到插件 stdio MCP 子进程，
	* 让插件能像 hook 一样通过 CODEBUDDY_SERVICE_PROXY_URL 访问 /internal/hooks/services/invoke。
	* 未配置解析器或解析失败（host runtime 未就绪等）时返回 undefined，不阻塞 MCP 连接。
	*/
	async resolveCliServiceProxyUrl() {
		if (!this.cliEndpointResolver) return;
		try {
			const base = await this.cliEndpointResolver();
			if (!base) return;
			return `${base.replace(/\/+$/, "")}/internal/hooks/services/invoke`;
		} catch (error) {
			this.logger.warn("[ConnectorMcpProxy] Failed to resolve CLI service proxy URL; plugin MCP servers using service proxy may fail:", error);
			return;
		}
	}
	/**
	* 启动 stdio MCP 子进程前若需要 Node runtime，则通过 binary-manager 准备并把
	* PATH/npm_config_* 注入到子进程 env。
	*
	* 触发条件（任一命中即注入）：
	* 1. `serverConfig.runtime?.type === 'node'`：用户/marketplace 显式声明
	*    Node runtime 依赖（推荐写法）。
	* 2. 官方 `connector:*` 的 `command` 命中 `node` / `npm` / `npx`：兜底覆盖
	*    存量未声明 runtime 的 marketplace connector（如 cloudbase 的 npx 配置），
	*    避免用户系统未装 Node 时连不上。自定义 MCP（`custom-mcp:*`）默认不兜底，
	*    避免改变用户预期。
	*
	* 不命中任何条件时直接返回，保留原"继承主进程 PATH"行为，与现有自定义 MCP 兼容。
	*
	* binary-manager 未注入时只打 warn 不抛错（与 ConnectorCliExecutor 保持一致），
	* 让 spawn 阶段返回更友好的 ENOENT 错误。
	*/
	async maybeInjectNodeRuntime(configId, serverConfig, env, silent) {
		const runtime = serverConfig.runtime;
		const command = (serverConfig.command ?? "").trim();
		const isOfficialNodeCommand = configId.startsWith("connector:") && NODE_AUTO_FALLBACK_COMMANDS.has(command);
		if (!(runtime?.type === "node" || isOfficialNodeCommand)) return;
		if (!this.binaryManager) {
			this.logger.warn(`[ConnectorMcpProxy] stdio MCP ${configId} requires Node.js runtime but BinaryManager is not available; falling back to inherited PATH`);
			return;
		}
		try {
			const prepared = await prepareNodeRuntimeEnv(this.binaryManager, {
				versionRange: runtime?.version ?? "*",
				registry: serverConfig.npmRegistries?.[0] ?? serverConfig.npmRegistry
			}, this.logger, {
				silent,
				send: this.hostCapabilities.sendRuntimeProgress
			});
			applyNodeRuntimeEnv(env, prepared);
			this.logger.info(`[ConnectorMcpProxy] stdio MCP ${configId} Node runtime injected: command=${command} version=${prepared.nodeInfo.version} source=${prepared.nodeInfo.source}`);
			this.logger.info(`[ConnectorMcpProxy] stdio MCP ${configId} Node runtime detail: node=${prepared.nodeInfo.executablePath} registry=${prepared.registry}`);
			return prepared;
		} catch (err) {
			this.logger.warn(`[ConnectorMcpProxy] stdio MCP ${configId} Node runtime preparation failed; falling back to inherited PATH: ${err instanceof Error ? err.message : String(err)}`);
			return;
		}
	}
	async createTransport(configId, serverConfig, silent, cliServiceProxyUrl) {
		const { command, url } = serverConfig;
		if (command) {
			const shouldPipeStderr = this.shouldLogStdioStderr();
			const baseEnv = {
				...process.env,
				...serverConfig.env,
				...serverConfig.staticEnv,
				...cliServiceProxyUrl ? { CODEBUDDY_SERVICE_PROXY_URL: cliServiceProxyUrl } : {}
			};
			stripDebugNodeOptions(baseEnv);
			const runtime = await this.maybeInjectNodeRuntime(configId, serverConfig, baseEnv, silent);
			const resolvedCommand = await resolveManagedNpxCommand({
				configId,
				command,
				args: serverConfig.args,
				runtime,
				env: baseEnv,
				logger: this.logger
			});
			const cwd = this.resolveStdioCwd(configId, serverConfig);
			this.logger.info(`[ConnectorMcpProxy] stdio MCP ${configId} transport: command=${resolvedCommand.command} args=${resolvedCommand.args?.length ?? 0} cwd=${cwd} runtimeInjected=${Boolean(runtime)}`);
			const transport = new StdioClientTransport({
				command: resolvedCommand.command,
				args: resolvedCommand.args,
				cwd,
				env: baseEnv,
				...shouldPipeStderr ? { stderr: "pipe" } : {}
			});
			this.attachStdioDebugOutput(configId, transport);
			return transport;
		}
		if (!url) throw new Error("MCP server config missing url or command");
		const authProvider = this.isWorkBuddyManagedAuthConfig(serverConfig) ? void 0 : this.getOrCreateAuthProvider(configId, url, silent, serverConfig.headers);
		this.serverUrls.set(configId, url);
		let authProviderSnapshot = { present: !!authProvider };
		if (authProvider) try {
			authProviderSnapshot = {
				present: true,
				redirectUrl: authProvider.redirectUrl,
				clientMetadata: authProvider.clientMetadata,
				clientInformation: authProvider.clientInformation?.(),
				tokens: authProvider.tokens?.()
			};
		} catch (err) {
			authProviderSnapshot = {
				present: true,
				snapshotError: String(err)
			};
		}
		this.logger.info(`[MCP-DEBUG][${configId}] url=${url} headers=${JSON.stringify(serverConfig.headers ?? {})} authProvider=${JSON.stringify(authProviderSnapshot)}`);
		const explicitType = (serverConfig.type ?? "").toString().toLowerCase();
		const legacyType = (serverConfig.transportType ?? "").toString().toLowerCase();
		let order;
		let source;
		if (explicitType === "sse") {
			order = "sse-first";
			source = "type";
		} else if (explicitType === "streamablehttp" || explicitType === "http") {
			order = "stream-first";
			source = "type";
		} else if (!explicitType && legacyType === "sse") {
			order = "sse-first";
			source = "transportType";
		} else {
			order = "stream-first";
			source = "default";
		}
		this.logger.info(`[ConnectorMcpProxy] createTransport(${configId}): order=${order} (source=${source})`);
		const effectiveHeaders = this.resolveEffectiveHeaders(configId, url, serverConfig.headers, serverConfig);
		const staticHeaders = serverConfig.staticHeaders;
		const mergedWithStatic = staticHeaders ? {
			...staticHeaders,
			...effectiveHeaders
		} : effectiveHeaders;
		return {
			kind: "fallback",
			order,
			source,
			url,
			authProvider,
			headers: mergedWithStatic
		};
	}
	/**
	* 决定真正传给 transport 的 headers。
	*
	* 控制面外置的 connector（乐享 / 腾讯文档 / IMA）依赖资料库授权流注入的
	* 静态 Authorization 作为握手凭据，必须完整保留；其它 OAuth connector 若
	* 同时残留 mcp.json headers.Authorization，则剥离静态 Authorization，避免
	* 旧 PAT 覆盖 SDK OAuth token。
	*/
	resolveEffectiveHeaders(configId, serverUrl, rawHeaders, serverConfig) {
		if (!rawHeaders) return;
		if (this.isExternallyManaged(configId, serverUrl, rawHeaders)) return rawHeaders;
		if (serverConfig?._workbuddyManagedAuth === "server-side") return rawHeaders;
		if (!(rawHeaders.Authorization ?? rawHeaders.authorization)) return rawHeaders;
		if (!!!this.oauthStore.loadClientInfo(configId, serverUrl, rawHeaders)) return rawHeaders;
		this.logger.warn(`[ConnectorMcpProxy] ${configId}: detected mcp.json headers.Authorization coexisting with OAuth registration. Stripping static Authorization to let OAuth tokens take effect. Remove headers.Authorization from mcp.json to silence this warning.`);
		const stripped = {};
		for (const [key, value] of Object.entries(rawHeaders)) {
			if (key.toLowerCase() === "authorization") continue;
			stripped[key] = value;
		}
		return Object.keys(stripped).length > 0 ? stripped : void 0;
	}
	getAppVersion() {
		return this.hostCapabilities.getAppVersion() ?? "unknown";
	}
	/**
	* 判断 transport 失败错误是否应该跳过 fallback。
	* 401/403/Unauthorized/aborted 类错误降级到另一种 transport 既无意义，
	* 也可能触发二次 OAuth 弹窗，必须跳过。
	*/
	shouldSkipFallback(error) {
		const msg = error instanceof Error ? error.message : String(error);
		return _ConnectorMcpProxy.SKIP_FALLBACK_PATTERNS.some((p) => p.test(msg));
	}
	/**
	* 从 MCP SDK transport 抓取并缓存 `_resourceMetadataUrl`。
	*
	* MCP SDK 的 Streamable HTTP 和 SSE transport 在首次收到 401 时会从
	* `WWW-Authenticate: Bearer resource_metadata="..."` 里解析出 URL，存到
	* transport 实例的 `_resourceMetadataUrl` 字段上（声明为 private，运行时可读）。
	*
	* 我们在 connect 失败后把该值 snapshot 到 proxy 的 Map 里，供 handleOAuthCallback
	* 在 token exchange 阶段作为 `resourceMetadataUrl` hint 传给
	* `discoverOAuthProtectedResourceMetadata`。
	*
	* 不传这个 hint 时，SDK 只会按 serverUrl path 去构造根 `.well-known/oauth-protected-resource`
	* 路径，错过服务端显式给出的 resource-specific metadata path（RFC 9728 §5.1），
	* 最终猜测出的 token endpoint 命中主站 404 HTML → JSON 解析报错（见 issue #35399）。
	*
	* 两种 transport 字段名一致（streamableHttp.js:328 / sse.js:83）。
	*/
	captureResourceMetadataUrl(configId, transport) {
		const raw = transport._resourceMetadataUrl;
		if (!raw) return;
		let serialized;
		if (typeof raw === "string" && raw.length > 0) serialized = raw;
		else if (raw instanceof URL) serialized = raw.toString();
		else {
			const s = String(raw);
			if (s && s !== "[object Object]") serialized = s;
		}
		if (!serialized) return;
		if (this.resourceMetadataUrls.get(configId) === serialized) return;
		this.resourceMetadataUrls.set(configId, serialized);
		this.logger.info(`[ConnectorMcpProxy] captureResourceMetadataUrl(${configId}): ${serialized}`);
	}
	/**
	* 给单段 transport.connect 加一个真正生效的总超时。
	*
	* 背景：MCP SDK 的 Client.connect() 内部 = transport.start() + initialize request。
	* 它接受的 `{ timeout }` 选项**只**作用于 initialize request，对 transport.start()
	* 这一阶段无效。SSE transport 在 TCP 握手成功但服务端不发 `endpoint` 事件时，
	* start() 的 Promise 会无限期 pending，从而把整个 connect 卡住。
	*
	* 解决方案：拆成两段独立计时
	*   - handshakeTimeoutMs：兜底整段 connect()，用 Promise.race + 主动 close transport
	*     强制中止 SDK pending 的 Promise。这是为了应对 transport.start() 卡死的场景，
	*     12s 足够覆盖跨地域 + TLS + OAuth 重定向，再多等也是浪费。
	*   - requestTimeoutMs：传给 SDK 的 `{ timeout }`，控制 initialize JSON-RPC 请求等待。
	*     业务请求合理上限 60s。
	*
	* 实际生效的 cap = min(handshakeTimeoutMs, requestTimeoutMs)，因为 race 任一胜出即返回。
	* 正常情况握手在毫秒级完成，跑完整段只取决于 requestTimeoutMs；
	* 异常 hung 时 handshakeTimeoutMs 兜底，~12s 内进入 fallback。
	*/
	async connectStepWithTimeout(client, transport, handshakeTimeoutMs, requestTimeoutMs, stepName) {
		let timer;
		const timeoutPromise = new Promise((_, reject) => {
			timer = setTimeout(() => {
				transport.close().catch(() => {});
				reject(/* @__PURE__ */ new Error(`${stepName} connect timed out after ${handshakeTimeoutMs}ms (transport handshake hung)`));
			}, handshakeTimeoutMs);
		});
		try {
			await Promise.race([client.connect(transport, { timeout: requestTimeoutMs }), timeoutPromise]);
		} finally {
			if (timer) clearTimeout(timer);
		}
	}
	/**
	* url 形式 MCP 的两段式连接。
	*
	* 按 meta.order 决定优先尝试哪种 transport，第一段失败后自动 fallback 另一段。
	* 仅 ConnectorMcpProxy.doConnect 会调用本方法（命中 FallbackTransportMeta 分支时）。
	* stdio 类型不会进入此函数。
	*
	* 设计动机：
	*   - mcp.json 的 type 字段在用户配置中经常出错（例如把 sse 服务写成 http），
	*     若 type 独占 transport 选择会导致此类配置永远连不上。
	*   - 双向 fallback 把 type 退化为「优先级」语义，错配也能自动修正。
	*   - 401/403/abort 命中 SKIP_FALLBACK_PATTERNS 时仍直接抛错，避免二次 OAuth。
	*
	* 与 packages/agent-mcp/src/common/manager/mcp-connect-manager.ts:392-446 对齐。
	*/
	async connectWithFallback(configId, client, meta, timeout) {
		const requestInit = { headers: {
			"User-Agent": `WorkBuddy/${this.getAppVersion()}`,
			...meta.headers
		} };
		const url = new URL(meta.url);
		const perStepRequestTimeout = Math.max(1e3, Math.floor(timeout / 2));
		const perStepHandshakeTimeout = Math.min(_ConnectorMcpProxy.HANDSHAKE_TIMEOUT_MS, perStepRequestTimeout);
		const dispatcher = this.getMcpHttpDispatcher();
		const isArdot = configId === ARDOT_MCP_CONFIG_ID;
		const fetchTagPrefix = isArdot ? ARDOT_MCP_DIAG_PREFIX + " " : "";
		const customFetch = async (input, init) => {
			const scopedHeaders = this.mergeRequestScopedHeadersForFetch(configId, init?.headers, requestInit.headers);
			try {
				return await (0, import_undici.fetch)(input, {
					...init,
					...scopedHeaders.hasScopedHeaders ? { headers: scopedHeaders.headers } : {},
					dispatcher
				});
			} catch (error) {
				this.logger.warn(`${fetchTagPrefix}[ConnectorMcpProxy] fetch error configId=${configId} target=${typeof input === "string" ? input : input?.url ?? "<url-like>"} ${formatUndiciFetchErrorForLog(error)}`);
				throw error;
			}
		};
		if (isArdot) this.logger.info(`${ARDOT_MCP_DIAG_PREFIX} [ConnectorMcpProxy] HTTP transport using custom fetch with bodyTimeout=0/headersTimeout=0`);
		const buildStreamable = () => new StreamableHTTPClientTransport(url, {
			authProvider: meta.authProvider,
			requestInit,
			fetch: customFetch
		});
		const buildSse = () => new SSEClientTransport(url, {
			authProvider: meta.authProvider,
			requestInit
		});
		const streamStep = {
			name: "streamableHttp",
			build: buildStreamable
		};
		const sseStep = {
			name: "sse",
			build: buildSse
		};
		const [first, second] = meta.order === "sse-first" ? [sseStep, streamStep] : [streamStep, sseStep];
		const firstTransport = first.build();
		let firstErrorMessage = "";
		try {
			await this.connectStepWithTimeout(client, firstTransport, perStepHandshakeTimeout, perStepRequestTimeout, first.name);
			this.logger.info(`[ConnectorMcpProxy] connectWithFallback(${configId}): ${first.name} OK (primary)`);
			return firstTransport;
		} catch (e) {
			firstErrorMessage = e instanceof Error ? e.message : String(e);
			this.captureResourceMetadataUrl(configId, firstTransport);
			if (this.shouldSkipFallback(e)) {
				this.logger.info(`[ConnectorMcpProxy] connectWithFallback(${configId}): skip ${second.name} fallback (auth/abort): ${firstErrorMessage}`);
				throw e;
			}
			this.logger.info(`[ConnectorMcpProxy] connectWithFallback(${configId}): ${first.name} failed, trying ${second.name}: ${firstErrorMessage}`);
			try {
				await firstTransport.close();
			} catch {}
		}
		const secondTransport = second.build();
		try {
			await this.connectStepWithTimeout(client, secondTransport, perStepHandshakeTimeout, perStepRequestTimeout, second.name);
			this.logger.info(`[ConnectorMcpProxy] connectWithFallback(${configId}): ${second.name} OK (fallback)`);
			return secondTransport;
		} catch (e) {
			const secondErrorMessage = e instanceof Error ? e.message : String(e);
			this.captureResourceMetadataUrl(configId, secondTransport);
			try {
				await secondTransport.close();
			} catch {}
			this.logger.error(`[ConnectorMcpProxy] connectWithFallback(${configId}): both transports failed | ${first.name}: ${firstErrorMessage} | ${second.name}: ${secondErrorMessage}`);
			throw new Error(`${first.name} connect failed: ${firstErrorMessage}; ${second.name} connect failed: ${secondErrorMessage}`);
		}
	}
	attachTransportLifecycleHandlers(configId, transport) {
		const lifecycle = transport;
		const previousClose = lifecycle.onclose;
		const previousError = lifecycle.onerror;
		const isArdot = configId === ARDOT_MCP_CONFIG_ID;
		const tagFor = (label) => isArdot ? `${ARDOT_MCP_DIAG_PREFIX} ${label}` : label;
		lifecycle.onclose = () => {
			previousClose?.();
			const entry = this.clients.get(configId);
			if (!entry || entry.manualDisconnect) {
				if (isArdot) this.logger.info(formatConnectorProxyLog(tagFor("[ConnectorMcpProxy] transport close ignored"), {
					configId,
					reason: !entry ? "no-entry" : "manualDisconnect"
				}));
				return;
			}
			const lifecycleContext = this.buildTransportLifecycleContext(entry);
			this.logger.warn(formatConnectorProxyLog(tagFor(`[ConnectorMcpProxy] transport closed for ${configId}; triggering reconnect`), {
				configId,
				inferredCloseKind: lifecycleContext.lastTransportErrorAtMsAgo !== void 0 ? "after-error" : "standalone-close",
				...lifecycleContext
			}));
			entry.status = "error";
			entry.needsAuth = false;
			entry.error = "MCP transport closed";
			entry.lastFailureKind = "transport";
			entry.lastFailureAt = Date.now();
			this.stopHealthCheck(configId);
			this.tryReconnect(configId, {
				reason: "runtime-transport",
				sourceError: /* @__PURE__ */ new Error("MCP transport closed")
			}).catch((error) => {
				this.logger.warn(tagFor(`[ConnectorMcpProxy] transport close reconnect failed for ${configId}: ${error}`));
			});
		};
		lifecycle.onerror = (error) => {
			previousError?.(error);
			const entry = this.clients.get(configId);
			if (!entry || entry.manualDisconnect) {
				if (isArdot) this.logger.info(formatConnectorProxyLog(tagFor("[ConnectorMcpProxy] transport error ignored"), {
					configId,
					reason: !entry ? "no-entry" : "manualDisconnect"
				}));
				return;
			}
			const currentSessionId = transport.sessionId;
			if (isMcpSessionLost(error, currentSessionId)) {
				entry.lastTransportErrorAt = Date.now();
				this.logger.info(formatConnectorProxyLog(tagFor("[ConnectorMcpProxy] transport error deferred (mcp session lost)"), {
					configId,
					httpStatus: 404,
					note: "handled by executeForwardCall catch → session-lost short-circuit"
				}));
				return;
			}
			if (isHttpBusinessError(error)) {
				entry.lastTransportErrorAt = Date.now();
				entry.lastFailureKind = "business";
				entry.lastFailureAt = Date.now();
				this.logger.info(formatConnectorProxyLog(tagFor("[ConnectorMcpProxy] transport error ignored (http business error)"), {
					configId,
					httpStatus: error.code,
					error: serializeConnectorProxyErrorForLog(error)
				}));
				return;
			}
			entry.lastTransportErrorAt = Date.now();
			const lifecycleContext = this.buildTransportLifecycleContext(entry);
			this.logger.warn(formatConnectorProxyLog(tagFor("[ConnectorMcpProxy] transport error"), {
				configId,
				error: serializeConnectorProxyErrorForLog(error),
				inferredCloseKind: inferTransportCloseKind(error),
				...lifecycleContext
			}));
			entry.status = "error";
			entry.needsAuth = false;
			entry.error = error.message;
			entry.lastFailureKind = "transport";
			entry.lastFailureAt = Date.now();
			this.stopHealthCheck(configId);
			this.tryReconnect(configId, {
				reason: "runtime-transport",
				sourceError: error
			}).catch((reconnectError) => {
				this.logger.warn(tagFor(`[ConnectorMcpProxy] transport error reconnect failed for ${configId}: ${reconnectError}`));
			});
		};
	}
	/**
	* 把 transport 关闭/错误时的会话上下文打包成纯数据结构，方便 grep 与人工排查。
	* 关键字段：
	* - `uptimeMs`：自最近一次成功 connect 以来的毫秒数
	* - `msSinceLastPing` / `msSinceLastActivity`：最后一次活动距离当前的毫秒数
	* - `lastTransportErrorAtMsAgo`：用于区分"close 是孤立触发"vs "close 紧跟 error"
	*/
	buildTransportLifecycleContext(entry) {
		const now = Date.now();
		return {
			transportKind: entry.transportKind,
			uptimeMs: entry.connectedAt ? now - entry.connectedAt : void 0,
			msSinceLastPing: entry.lastPingAt ? now - entry.lastPingAt : void 0,
			msSinceLastActivity: entry.lastActivityAt ? now - entry.lastActivityAt : void 0,
			lastTransportErrorAtMsAgo: entry.lastTransportErrorAt ? now - entry.lastTransportErrorAt : void 0,
			lastFailureKind: entry.lastFailureKind,
			reconnectAttempts: entry.reconnectAttempts ?? 0,
			previousStatus: entry.status
		};
	}
	registerListChangedHandler(configId, client) {
		const capabilities = client.getServerCapabilities?.();
		if (capabilities?.tools?.listChanged) client.setNotificationHandler(require_types.ToolListChangedNotificationSchema, async () => {
			this.refreshTools(configId).catch((err) => {
				this.logger.warn(`[ConnectorMcpProxy] refreshTools(${configId}) error:`, err);
			});
		});
		if (capabilities?.prompts?.listChanged) client.setNotificationHandler(require_types.PromptListChangedNotificationSchema, async () => {
			this.refreshPrompts(configId).catch((err) => {
				this.logger.debug?.(`[ConnectorMcpProxy] refreshPrompts(${configId}) error:`, err);
			});
		});
		if (capabilities?.resources?.listChanged) client.setNotificationHandler(require_types.ResourceListChangedNotificationSchema, async () => {
			this.refreshResources(configId).catch((err) => {
				this.logger.debug?.(`[ConnectorMcpProxy] refreshResources(${configId}) error:`, err);
			});
		});
	}
	/**
	* Best-effort 拉取 prompts / resources / resourceTemplates。
	*
	* MCP 协议中这三类都是 optional capability，多数 server 只实现 tools，
	* 调 listPrompts/listResources 会抛 `Method not found`（-32601）。
	* 必须 catch 住，绝不能让单个失败导致整个 connect 失败。
	*/
	async loadPromptsAndResources(configId, client, entry, serverConfig) {
		const capabilities = client.getServerCapabilities?.();
		const timeout = this.getRuntimeRequestTimeout(serverConfig);
		const serverShortName = this.extractServerShortName(configId);
		const recordList = async (kind, supported, doList) => {
			if (!supported) {
				this.metric.list({
					serverShortName,
					kind,
					durationMs: 0,
					outcome: "unsupported"
				});
				return;
			}
			const start = Date.now();
			try {
				await doList();
				this.metric.list({
					serverShortName,
					kind,
					durationMs: Date.now() - start,
					outcome: "success"
				});
			} catch (err) {
				this.metric.list({
					serverShortName,
					kind,
					durationMs: Date.now() - start,
					outcome: "failed",
					errorKind: classifyMcpListErrorKind(err)
				});
				throw err;
			}
		};
		await recordList("prompt", !!capabilities?.prompts, async () => {
			try {
				entry.prompts = ((await client.listPrompts(void 0, { timeout }))?.prompts ?? []).map((p) => ({
					name: p.name,
					description: p.description,
					arguments: p.arguments
				}));
			} catch (err) {
				this.logger.debug?.(`[ConnectorMcpProxy] listPrompts(${configId}) failed: ${err}`);
				entry.prompts = void 0;
				throw err;
			}
		}).catch(() => {});
		if (!capabilities?.prompts) entry.prompts = void 0;
		if (capabilities?.resources) {
			await recordList("resource", true, async () => {
				try {
					entry.resources = ((await client.listResources(void 0, { timeout }))?.resources ?? []).map((r) => ({
						uri: r.uri,
						name: r.name,
						description: r.description,
						mimeType: r.mimeType
					}));
				} catch (err) {
					this.logger.debug?.(`[ConnectorMcpProxy] listResources(${configId}) failed: ${err}`);
					entry.resources = void 0;
					throw err;
				}
			}).catch(() => {});
			await recordList("resource_template", true, async () => {
				try {
					entry.resourceTemplates = ((await client.listResourceTemplates(void 0, { timeout }))?.resourceTemplates ?? []).map((rt) => ({
						uriTemplate: rt.uriTemplate,
						name: rt.name,
						description: rt.description,
						mimeType: rt.mimeType
					}));
				} catch (err) {
					this.logger.debug?.(`[ConnectorMcpProxy] listResourceTemplates(${configId}) failed: ${err}`);
					entry.resourceTemplates = void 0;
					throw err;
				}
			}).catch(() => {});
		} else {
			this.metric.list({
				serverShortName,
				kind: "resource",
				durationMs: 0,
				outcome: "unsupported"
			});
			this.metric.list({
				serverShortName,
				kind: "resource_template",
				durationMs: 0,
				outcome: "unsupported"
			});
			entry.resources = void 0;
			entry.resourceTemplates = void 0;
		}
	}
	async refreshPrompts(configId) {
		const entry = this.clients.get(configId);
		if (!entry || entry.status !== "connected") return;
		try {
			entry.prompts = ((await entry.client.listPrompts(void 0, { timeout: this.getRuntimeRequestTimeout(entry.serverConfig) }))?.prompts ?? []).map((p) => ({
				name: p.name,
				description: p.description,
				arguments: p.arguments
			}));
			this.notifyToolsChanged();
		} catch (err) {
			this.logger.debug?.(`[ConnectorMcpProxy] refreshPrompts(${configId}) failed: ${err}`);
		}
	}
	async refreshResources(configId) {
		const entry = this.clients.get(configId);
		if (!entry || entry.status !== "connected") return;
		try {
			const timeout = this.getRuntimeRequestTimeout(entry.serverConfig);
			entry.resources = ((await entry.client.listResources(void 0, { timeout }))?.resources ?? []).map((r) => ({
				uri: r.uri,
				name: r.name,
				description: r.description,
				mimeType: r.mimeType
			}));
			try {
				entry.resourceTemplates = ((await entry.client.listResourceTemplates(void 0, { timeout }))?.resourceTemplates ?? []).map((rt) => ({
					uriTemplate: rt.uriTemplate,
					name: rt.name,
					description: rt.description,
					mimeType: rt.mimeType
				}));
			} catch (err) {
				this.logger.debug?.(`[ConnectorMcpProxy] refreshResources/templates(${configId}) failed: ${err}`);
			}
			this.notifyToolsChanged();
		} catch (err) {
			this.logger.debug?.(`[ConnectorMcpProxy] refreshResources(${configId}) failed: ${err}`);
		}
	}
	async loadRawTools(client, serverConfig, configId) {
		const start = Date.now();
		const serverShortName = configId ? this.extractServerShortName(configId) : "unknown";
		try {
			const toolsResult = await client.listTools(void 0, { timeout: this.getRuntimeRequestTimeout(serverConfig) });
			client._cachedToolOutputValidators?.clear();
			this.metric.list({
				serverShortName,
				kind: "tool",
				durationMs: Date.now() - start,
				outcome: "success"
			});
			return (toolsResult.tools ?? []).map(({ outputSchema, ...rest }) => rest);
		} catch (err) {
			this.metric.list({
				serverShortName,
				kind: "tool",
				durationMs: Date.now() - start,
				outcome: "failed",
				errorKind: classifyMcpListErrorKind(err)
			});
			throw err;
		}
	}
	replaceEntryTools(configId, entry, rawTools) {
		for (const oldTool of entry.tools) {
			this.removeToolRoute(oldTool.name, configId);
			if (!this.toolRoutes.has(oldTool.name)) this.toolOriginalNames.delete(oldTool.name);
		}
		const serverShortName = this.extractServerShortName(configId);
		const tools = rawTools.map((t) => ({
			...t,
			name: `${serverShortName}_${t.name}`
		}));
		entry.tools = tools;
		for (let i = 0; i < tools.length; i++) {
			this.upsertToolRoute(tools[i].name, configId);
			this.toolOriginalNames.set(tools[i].name, rawTools[i].name);
		}
		return tools;
	}
	/**
	* SDK 防循环错误特征：transport 拿到缓存 token 发请求 → 401 → SDK 调 auth() 走 refresh
	* → refresh 成功 → 用新 token 重试 → 服务端**仍然** 401 → SDK 抛此错并不再调
	* `redirectToAuthorization`（参见 `@modelcontextprotocol/sdk` streamableHttp.ts 中的
	* `_hasCompletedAuthFlow` 保护）。
	*
	* 网关 token 体系实际遇到过：refresh 端点签发新 token 成功（HTTP 200 + 合法 JWT），
	* 但下游 MCP 资源端拒绝新 token（再次 401）。
	* 此时本地缓存 token 已被 SDK 改写成"看似合法但用不了"的状态，普通重连再走多少次
	* 都会卡在同一个分支。修复办法是清掉缓存凭证、让 SDK 下次从 `tokens()=null` 重新
	* 走完整 OAuth 流程（startAuthorization → redirectToAuthorization → 弹浏览器）。
	*/
	static POST_AUTH_401_MESSAGE = "Server returned 401 after successful authentication";
	isPostAuthRefusalMessage(message) {
		return message.includes(_ConnectorMcpProxy.POST_AUTH_401_MESSAGE);
	}
	async doConnect(configId, serverConfig, silent = false, options = {}) {
		if (this.clients.has(configId)) await this.disconnect(configId, "reconnect");
		const connectStartedAt = Date.now();
		const url = serverConfig.url;
		const command = serverConfig.command;
		if (!url && !command) return {
			success: false,
			error: "MCP server config missing url or command"
		};
		if (this.ioaAuth && url) {
			if (!silent) {
				if (this.clients.has(configId)) await this.disconnect(configId, "reconnect");
				const earlyClient = this.createClient(configId);
				const earlyEntry = this.createConnectingEntry(configId, earlyClient, serverConfig);
				this.clients.set(configId, earlyEntry);
				this.statusChangedCallback?.(configId, "connecting");
			}
			try {
				const ioaResult = await this.ioaAuth.handleConnect(configId, serverConfig, silent, {
					onNeedsAuth: () => {
						const entry = this.clients.get(configId);
						if (entry) entry.needsAuth = true;
					},
					onAuthorized: async (decoratedConfig) => {
						const result = await this.connect(configId, decoratedConfig, true);
						if (configId.startsWith("connector:") && result.success) this.emitOAuthCompleted({
							configId,
							success: true
						});
					}
				});
				if (ioaResult.handled) {
					this.statusChangedCallback?.(configId, "unauthorized", "IOA authorization in progress");
					return {
						success: false,
						error: "IOA authorization in progress",
						needsAuth: true,
						authFlowStarted: true
					};
				}
				serverConfig = ioaResult.serverConfig;
			} catch (e) {
				const errMsg = e instanceof Error ? e.message : String(e);
				this.logger.warn(`[ConnectorMcpProxy] doConnect(${configId}): IOA auth failed: ${errMsg}`);
				if (!silent && this.clients.has(configId)) {
					this.markEntryUnauthorized(configId, errMsg, { notify: true });
					this.statusChangedCallback?.(configId, "unauthorized", errMsg);
				}
				return {
					success: false,
					error: errMsg
				};
			}
		}
		try {
			const cliServiceProxyUrl = command ? await this.resolveCliServiceProxyUrl() : void 0;
			const created = await this.createTransport(configId, serverConfig, silent, cliServiceProxyUrl);
			const client = this.createClient(configId);
			const timeout = this.getConnectTimeout(serverConfig);
			const entry = this.createConnectingEntry(configId, client, serverConfig);
			this.clients.set(configId, entry);
			let transport;
			if ("kind" in created && created.kind === "fallback") transport = await this.connectWithFallback(configId, client, created, timeout);
			else {
				transport = created;
				await client.connect(transport, { timeout });
			}
			entry.transportKind = transport instanceof StdioClientTransport ? "stdio" : "http";
			this.attachTransportLifecycleHandlers(configId, transport);
			this.registerListChangedHandler(configId, client);
			const rawTools = await this.loadRawTools(client, serverConfig, configId);
			const tools = this.replaceEntryTools(configId, entry, rawTools);
			await this.loadPromptsAndResources(configId, client, entry, serverConfig);
			this.markEntryConnected(configId);
			this.startHealthCheck(configId);
			this.activeConfigs.set(configId, { ...serverConfig });
			this.notifyToolsChanged();
			this.logger.info(`[ConnectorMcpProxy] Connected to ${configId}, ${tools.length} tools: [${tools.map((t) => t.name).join(", ")}]`);
			return {
				success: true,
				tools: tools.map((t) => ({
					name: t.name,
					description: t.description
				}))
			};
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			if (command) this.logger.warn(`[ConnectorMcpProxy] stdio MCP ${configId} connect failed: ${message}`);
			if (message.includes("redirect_uri") && this.oauthBaseUrl && url) {
				this.logger.info(`[ConnectorMcpProxy] ${configId} redirect_uri rejected with scheme mode, falling back to HTTP callback`);
				this.invalidateCredentials(configId, url, "all", serverConfig.headers);
				this.oauthProviders.delete(configId);
				this.oauthProviderSilentModes.delete(configId);
				this.providerMemoryTokenWriters.delete(configId);
				this.providerMemoryClientInfoReaders.delete(configId);
				this.authorizationRedirectStarted.delete(configId);
				this.resourceMetadataUrls.delete(configId);
				const savedBaseUrl = this.oauthBaseUrl;
				this.oauthBaseUrl = "";
				try {
					return await this.doConnect(configId, serverConfig, silent);
				} finally {
					this.oauthBaseUrl = savedBaseUrl;
				}
			}
			const isUnauthorized = this.isAuthMessage(message);
			const isManagedAuth = this.isWorkBuddyManagedAuthConfig(serverConfig);
			const tokenSavedDuringThisConnect = (this.tokenSavedAt.get(configId) ?? 0) > connectStartedAt;
			const isPostAuthRefusalSignal = tokenSavedDuringThisConnect || this.isPostAuthRefusalMessage(message);
			const lastRecovered = this.postAuthRefusalLastRecoveredAt.get(configId) ?? 0;
			const isWithinThrottle = Date.now() - lastRecovered < _ConnectorMcpProxy.POST_AUTH_REFUSAL_THROTTLE_MS;
			if (isUnauthorized && !isManagedAuth && isPostAuthRefusalSignal && url && !options.postAuthRefusalRecovered && !isWithinThrottle) {
				this.logger.warn(`[ConnectorMcpProxy] ${configId} hit post-auth 401 (behavior=${tokenSavedDuringThisConnect}, message=${this.isPostAuthRefusalMessage(message)}) — clearing cached credentials and restarting OAuth flow`);
				this.postAuthRefusalLastRecoveredAt.set(configId, Date.now());
				this.invalidateCredentials(configId, url, "all");
				this.resourceMetadataUrls.delete(configId);
				this.authorizationRedirectStarted.delete(configId);
				if (!silent) return await this.doConnect(configId, serverConfig, silent, { postAuthRefusalRecovered: true });
			} else if (isUnauthorized && !isManagedAuth && isPostAuthRefusalSignal && isWithinThrottle) this.logger.warn(`[ConnectorMcpProxy] ${configId} hit post-auth 401 again within ${Math.round(_ConnectorMcpProxy.POST_AUTH_REFUSAL_THROTTLE_MS / 1e3)}s — service likely rejecting tokens server-side; surfacing as unauthorized`);
			if (isUnauthorized && !isManagedAuth) {
				this.markEntryUnauthorized(configId, message, { notify: !silent });
				this.logger.info(`[ConnectorMcpProxy] ${configId} needs OAuth authorization`);
				this.statusChangedCallback?.(configId, "unauthorized", message);
				return {
					success: false,
					needsAuth: true,
					authFlowStarted: this.hasAuthorizationRedirectStarted(configId),
					error: message
				};
			}
			this.markEntryError(configId, message);
			this.logger.error(`[ConnectorMcpProxy] connect(${configId}) failed:`, message);
			this.statusChangedCallback?.(configId, "error", message);
			return {
				success: false,
				error: message
			};
		}
	}
	/**
	* 刷新某个 connector 的工具列表（tools/list_changed 通知后调用，或用户主动刷新时）
	*/
	async refreshTools(configId) {
		const entry = this.clients.get(configId);
		if (!entry || entry.status !== "connected") return;
		try {
			const rawTools = await this.loadRawTools(entry.client, entry.serverConfig, configId);
			this.replaceEntryTools(configId, entry, rawTools);
			this.notifyToolsChanged();
		} catch (error) {
			this.logger.warn(`[ConnectorMcpProxy] refreshTools(${configId}) failed:`, error);
		}
	}
	/**
	* 从 configId 提取 server 短名（用作工具名前缀）
	*
	* configId 格式: "connector:qq-mail" → "qq-mail"
	*                "custom-mcp:playwright" → "playwright"
	*                "bare-id" → "bare-id"
	*/
	extractServerShortName(configId) {
		const colonIdx = configId.indexOf(":");
		return colonIdx >= 0 ? configId.slice(colonIdx + 1) : configId;
	}
	notifyToolsChanged() {
		this.toolExposureSuppressionLogKeys.clear();
		if (this.toolsChangedCallbacks.size > 0) try {
			for (const callback of this.toolsChangedCallbacks) try {
				callback();
			} catch (error) {
				this.logger.warn("[ConnectorMcpProxy] toolsChangedCallback error:", error);
			}
		} catch (error) {
			this.logger.warn("[ConnectorMcpProxy] toolsChangedCallbacks dispatch error:", error);
		}
	}
	/**
	* 等待正在进行的 tryReconnect 完成（Issue #60615 方案 E）。
	*
	* 使用场景：callTool catch 到 McpError code=-32000 "Connection closed" 时，说明本请求
	* 被并发进行的 disconnect() 副作用殃及。此时应等待正在进行的 reconnect，然后用新
	* client 重发原请求。
	*
	* 返回 `WaitForReconnectResult`，区分 4 种失败原因：
	* - `{ ok: true }` — reconnect 完成且当前 entry 已回到 connected 状态（可以安全重试）
	* - `{ ok: false, reason: 'no-inflight' }` — 没有 reconnect 在进行（entry 仍在但状态不
	*   connected，通常是手动 disconnect / handleServiceStopping 等清理路径造成的 -32000）
	* - `{ ok: false, reason: 'entry-lost' }` — entry 已被 clients.delete 清理
	* - `{ ok: false, reason: 'timeout' }` — 有 in-flight reconnect 但超过 10s 未完成
	* - `{ ok: false, reason: 'reconnect-failed' }` — reconnect promise 报了成功但 entry
	*   状态又不 connected（后续 disconnect 又把它打回去了）
	*
	* 超时策略：`WAIT_FOR_RECONNECT_TIMEOUT_MS`（默认 10s）内 reconnect 未完成就放弃，
	* 让上层抛出正常错误。实测 reconnect 通常在 300-500ms 内完成，但网络抖动叠加
	* tryReconnect 的指数退避（attempt 1 失败后 5s backoff），累计可能需要 6-8s；
	* 10s 能覆盖大部分真实场景。再长就说明真的有大问题，让错误正常抛出比让用户
	* 干等更好。
	*/
	static WAIT_FOR_RECONNECT_TIMEOUT_MS = 1e4;
	async waitForReconnect(configId) {
		const pending = this.reconnectingPromises.get(configId);
		if (!pending) {
			const entry = this.clients.get(configId);
			if (entry?.status === "connected") return { ok: true };
			return {
				ok: false,
				reason: entry ? "no-inflight" : "entry-lost"
			};
		}
		this.logger.info(`[ConnectorMcpProxy] waitForReconnect(${configId}): awaiting in-flight reconnect`);
		let timer;
		const TIMEOUT_SENTINEL = Symbol("timeout");
		const timeoutPromise = new Promise((resolve) => {
			timer = setTimeout(() => {
				this.logger.warn(`[ConnectorMcpProxy] waitForReconnect(${configId}): TIMEOUT after ${_ConnectorMcpProxy.WAIT_FOR_RECONNECT_TIMEOUT_MS}ms`);
				resolve(TIMEOUT_SENTINEL);
			}, _ConnectorMcpProxy.WAIT_FOR_RECONNECT_TIMEOUT_MS);
		});
		try {
			if (await Promise.race([pending, timeoutPromise]) === TIMEOUT_SENTINEL) return {
				ok: false,
				reason: "timeout"
			};
			if (this.clients.get(configId)?.status === "connected") return { ok: true };
			return {
				ok: false,
				reason: "reconnect-failed"
			};
		} finally {
			if (timer) clearTimeout(timer);
		}
	}
	/**
	* 尝试重连：刷新 token 后重新连接
	*/
	async tryReconnect(configId, options = {}) {
		const reason = options.reason ?? "unknown";
		if (this.reconnecting.has(configId)) {
			this.logger.info(`[ConnectorMcpProxy] tryReconnect(${configId}): SKIP — already reconnecting`);
			return false;
		}
		let resolveTracker = () => {};
		const trackerPromise = new Promise((resolve) => {
			resolveTracker = resolve;
		});
		this.reconnectingPromises.set(configId, trackerPromise);
		try {
			const result = await this.tryReconnectImpl(configId, options, reason);
			resolveTracker(result);
			return result;
		} catch (error) {
			resolveTracker(false);
			throw error;
		} finally {
			if (this.reconnectingPromises.get(configId) === trackerPromise) this.reconnectingPromises.delete(configId);
		}
	}
	/**
	* tryReconnect 的实际实现（原 tryReconnect 主体）。抽出来是为了让 tryReconnect
	* 顶层可以用 deferred 模式维护 reconnectingPromises（方案 E）。
	*/
	async tryReconnectImpl(configId, options, reason) {
		let config = this.activeConfigs.get(configId);
		if (!config) {
			this.logger.info(`[ConnectorMcpProxy] tryReconnect(${configId}): SKIP — no active config`);
			return false;
		}
		const sourceError = options.sourceError instanceof Error ? options.sourceError.message : String(options.sourceError ?? "none");
		this.logger.info(`[ConnectorMcpProxy] tryReconnect(${configId}): START — reason=${reason}, sourceError=${sourceError}`);
		this.reconnecting.add(configId);
		this.stopHealthCheck(configId);
		const entry = this.clients.get(configId);
		if (entry) {
			entry.status = "connecting";
			entry.lastFailureKind = options.reason === "runtime-auth" ? "auth" : "transport";
			entry.lastFailureAt = Date.now();
		}
		const retryDelays = _ConnectorMcpProxy.RECONNECT_RETRY_DELAYS_MS;
		let sawTransportTrouble = false;
		let externalAuthRefreshTried = false;
		let lastFailureWasNetwork = false;
		try {
			for (let i = 0; i < retryDelays.length; i++) {
				const reconnectEntry = this.clients.get(configId);
				if (reconnectEntry) reconnectEntry.reconnectAttempts = i + 1;
				const baseDelayMs = retryDelays[i];
				const delayMs = lastFailureWasNetwork && baseDelayMs < _ConnectorMcpProxy.NETWORK_ERROR_BACKOFF_MS ? _ConnectorMcpProxy.NETWORK_ERROR_BACKOFF_MS : baseDelayMs;
				if (delayMs > 0) {
					const reasonSuffix = delayMs !== baseDelayMs ? " (network-error backoff)" : "";
					this.logger.info(`[ConnectorMcpProxy] tryReconnect(${configId}): attempt ${i + 1}/${retryDelays.length}, waiting ${delayMs}ms${reasonSuffix}...`);
					await new Promise((resolve) => setTimeout(resolve, delayMs));
				} else this.logger.info(`[ConnectorMcpProxy] tryReconnect(${configId}): attempt ${i + 1}/${retryDelays.length}, immediate`);
				const serverUrl = this.serverUrls.get(configId);
				if (serverUrl) {
					const refreshResult = await this.refreshTokenIfNeeded(configId, serverUrl);
					const refreshSummary = !refreshResult.ok ? `kind=${refreshResult.kind}, error=${refreshResult.error?.substring(0, 80)}` : `refreshed=${"refreshed" in refreshResult ? refreshResult.refreshed : "?"}`;
					this.logger.info(`[ConnectorMcpProxy] tryReconnect(${configId}): refresh result ok=${refreshResult.ok}, ${refreshSummary}`);
					if (!refreshResult.ok && refreshResult.kind === "auth") {
						this.logger.info(`[ConnectorMcpProxy] tryReconnect(${configId}): STOP — auth refresh failure, marking unauthorized`);
						this.markEntryUnauthorized(configId, refreshResult.error);
						this.statusChangedCallback?.(configId, "unauthorized", refreshResult.error);
						return false;
					}
					if (!refreshResult.ok && refreshResult.kind === "transient") sawTransportTrouble = true;
				}
				if (options.reason === "runtime-auth" && this.refreshExternalAuthBeforeReconnect && !externalAuthRefreshTried) {
					externalAuthRefreshTried = true;
					const externalRefresh = await this.refreshExternalAuthBeforeReconnect(configId);
					const refreshSummary = externalRefresh.ok ? `ok=true, serverConfig=${externalRefresh.serverConfig ? "provided" : "active"}` : `ok=false, kind=${externalRefresh.kind}, error=${externalRefresh.error.substring(0, 80)}`;
					this.logger.info(`[ConnectorMcpProxy] tryReconnect(${configId}): external auth refresh ${refreshSummary}`);
					if (!externalRefresh.ok && externalRefresh.kind === "auth") {
						this.markEntryUnauthorized(configId, externalRefresh.error);
						this.statusChangedCallback?.(configId, "unauthorized", externalRefresh.error);
						return false;
					}
					if (!externalRefresh.ok && externalRefresh.kind === "transient") sawTransportTrouble = true;
					if (externalRefresh.ok) {
						const latestConfig = externalRefresh.serverConfig ?? this.activeConfigs.get(configId);
						if (latestConfig) {
							config = latestConfig;
							this.activeConfigs.set(configId, { ...latestConfig });
						}
					}
				}
				if (this.ioaAuth && options.reason === "runtime-auth" && this.isWorkBuddyManagedAuthConfig(config) && config._workbuddyManagedAuth === "server-side") try {
					const refreshResult = await this.ioaAuth.resolveToken(config, { interactive: false });
					if (refreshResult?.success && refreshResult.rule) {
						config = this.ioaAuth.decorateConfig(config, refreshResult.rule, refreshResult.accessToken);
						this.activeConfigs.set(configId, { ...config });
						this.logger.info(`[ConnectorMcpProxy] tryReconnect(${configId}): IOA token refreshed (oauthName=${refreshResult.rule.oauthName})`);
					}
				} catch (e) {
					this.logger.warn(`[ConnectorMcpProxy] tryReconnect(${configId}): IOA token refresh failed:`, e);
				}
				const result = await this.connect(configId, config, true);
				this.logger.info(`[ConnectorMcpProxy] tryReconnect(${configId}): connect result success=${result.success}, needsAuth=${result.needsAuth}, error=${result.error?.substring(0, 80)}`);
				if (result.success) {
					this.logger.info(`[ConnectorMcpProxy] tryReconnect(${configId}): SUCCESS — reconnected on attempt ${i + 1}`);
					this.statusChangedCallback?.(configId, "connected");
					return true;
				}
				if (result.needsAuth) {
					if (sawTransportTrouble) {
						this.logger.warn(`[ConnectorMcpProxy] tryReconnect(${configId}): attempt ${i + 1}/${retryDelays.length} got needsAuth after transport trouble — treating as transient. error=${result.error?.substring(0, 80)}`);
						const latestEntry = this.clients.get(configId);
						if (latestEntry) {
							latestEntry.status = "error";
							latestEntry.needsAuth = false;
							latestEntry.error = result.error;
							latestEntry.lastFailureKind = "transport";
							latestEntry.lastFailureAt = Date.now();
						}
						lastFailureWasNetwork = false;
						continue;
					}
					this.logger.info(`[ConnectorMcpProxy] tryReconnect(${configId}): STOP — needsAuth, marking unauthorized`);
					this.markEntryUnauthorized(configId, result.error);
					this.statusChangedCallback?.(configId, "unauthorized", result.error);
					return false;
				}
				this.logger.warn(`[ConnectorMcpProxy] tryReconnect(${configId}): attempt ${i + 1}/${retryDelays.length} FAILED: ${result.error}`);
				if (!this.isAuthMessage(result.error ?? "")) sawTransportTrouble = true;
				lastFailureWasNetwork = _ConnectorMcpProxy.isNetworkTransientError(result.error);
				const latestEntry = this.clients.get(configId);
				if (latestEntry) {
					latestEntry.status = "error";
					latestEntry.needsAuth = false;
					latestEntry.error = result.error;
					latestEntry.lastFailureKind = "transport";
					latestEntry.lastFailureAt = Date.now();
				}
			}
			const finalError = this.clients.get(configId)?.error || "Reconnect exhausted";
			if (!(sawTransportTrouble || !this.isAuthMessage(finalError))) {
				this.logger.info(`[ConnectorMcpProxy] tryReconnect(${configId}): EXHAUSTED — all ${retryDelays.length} attempts failed with auth error, marking unauthorized. Final error: ${finalError}`);
				this.markEntryUnauthorized(configId, finalError);
				this.statusChangedCallback?.(configId, "unauthorized", finalError);
			} else {
				this.logger.info(`[ConnectorMcpProxy] tryReconnect(${configId}): EXHAUSTED — all ${retryDelays.length} attempts failed with transport error${sawTransportTrouble ? " (sawTransportTrouble=true, demoted from auth)" : ""}, marking error + backoff probe. Final error: ${finalError}`);
				this.markEntryError(configId, finalError);
				this.statusChangedCallback?.(configId, "error", finalError);
				this.startBackoffProbe(configId);
			}
			return false;
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			this.logger.error(`[ConnectorMcpProxy] tryReconnect(${configId}): EXCEPTION — ${message}`);
			if (this.isAuthMessage(message)) {
				this.markEntryUnauthorized(configId, message);
				this.statusChangedCallback?.(configId, "unauthorized", message);
			} else {
				this.markEntryError(configId, message);
				this.statusChangedCallback?.(configId, "error", message);
				this.startBackoffProbe(configId);
			}
			return false;
		} finally {
			this.logger.info(`[ConnectorMcpProxy] tryReconnect(${configId}): END — releasing reconnecting lock`);
			this.reconnecting.delete(configId);
		}
	}
	/**
	* 检查 token 是否过期，过期则主动刷新
	*/
	async refreshTokenIfNeeded(configId, serverUrl) {
		const headers = this.activeConfigs.get(configId)?.headers;
		const tokens = this.oauthStore.loadTokens(configId, serverUrl, headers);
		if (!tokens?.refresh_token) {
			this.logger.info(`[ConnectorMcpProxy] refreshToken(${configId}): SKIP — no refresh_token`);
			return {
				ok: true,
				refreshed: false
			};
		}
		if (tokens.expires_in !== void 0 && tokens.expires_in > 60) {
			this.logger.info(`[ConnectorMcpProxy] refreshToken(${configId}): SKIP — token still valid (expires_in=${tokens.expires_in}s)`);
			return {
				ok: true,
				refreshed: false
			};
		}
		this.logger.info(`[ConnectorMcpProxy] refreshToken(${configId}): REFRESHING — token expired or expiring (expires_in=${tokens.expires_in})`);
		try {
			const clientInfo = this.oauthStore.loadClientInfo(configId, serverUrl, headers);
			const { refreshAuthorization, discoverOAuthProtectedResourceMetadata, discoverAuthorizationServerMetadata, selectResourceURL } = await Promise.resolve().then(() => require("./auth.js")).then((n) => n.auth_exports);
			let authServerUrl;
			let protectedResourceMetaHit = false;
			let authServerFallbackKind = "root-origin";
			let discoveredResourceMeta;
			const cachedResourceMetadataUrl = this.resourceMetadataUrls.get(configId);
			try {
				const resourceMeta = await discoverOAuthProtectedResourceMetadata(serverUrl, cachedResourceMetadataUrl ? { resourceMetadataUrl: cachedResourceMetadataUrl } : void 0);
				discoveredResourceMeta = resourceMeta;
				authServerUrl = resourceMeta.authorization_servers?.[0] || new URL(serverUrl).origin;
				if (resourceMeta.authorization_servers?.length) {
					protectedResourceMetaHit = true;
					authServerFallbackKind = "protected-resource-meta";
				}
			} catch {
				authServerUrl = new URL(serverUrl).origin;
			}
			const metadata = await discoverAuthorizationServerMetadata(authServerUrl);
			const refreshProvider = this.oauthProviders.get(configId);
			const resource = refreshProvider ? await selectResourceURL(serverUrl, refreshProvider, discoveredResourceMeta) : discoveredResourceMeta?.resource ? new URL(discoveredResourceMeta.resource) : new URL(serverUrl);
			this.logger.info(formatConnectorProxyLog(`[ConnectorMcpProxy] refreshToken(${configId}): request context`, {
				configId,
				serverUrl,
				authServerUrl,
				protectedResourceMetaHit,
				authServerFallbackKind,
				resourceMetadataUrlHint: cachedResourceMetadataUrl ?? null,
				resource: resource?.toString() ?? null,
				tokenEndpoint: metadata?.token_endpoint,
				clientId: clientInfo?.client_id
			}));
			const newTokens = await refreshAuthorization(authServerUrl, {
				metadata,
				clientInformation: clientInfo || { client_id: "" },
				refreshToken: tokens.refresh_token,
				resource
			});
			this.oauthStore.saveTokens(configId, serverUrl, newTokens, headers);
			this.syncProviderMemoryTokens(configId, newTokens);
			this.logger.info(`[ConnectorMcpProxy] refreshToken(${configId}): SUCCESS — new token saved`);
			return {
				ok: true,
				refreshed: true
			};
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			this.logger.warn(`[ConnectorMcpProxy] refreshToken(${configId}): FAILED — ${message}`);
			if (/\binvalid_grant\b/.test(message) || /\binvalid_client\b/.test(message) || /\bunauthorized_client\b/.test(message) || this.isAuthMessage(message)) {
				this.logger.info(`[ConnectorMcpProxy] refreshToken(${configId}): classified as AUTH failure, invalidating tokens`);
				this.invalidateCredentials(configId, serverUrl, "tokens", headers);
				return {
					ok: false,
					kind: "auth",
					error: message
				};
			}
			this.logger.info(`[ConnectorMcpProxy] refreshToken(${configId}): classified as TRANSIENT failure`);
			return {
				ok: false,
				kind: "transient",
				error: message
			};
		}
	}
	/**
	* 启动健康检查（连接成功后调用）
	*/
	startHealthCheck(configId) {
		this.stopHealthCheck(configId);
		const token = Symbol(configId);
		this.healthCheckTokens.set(configId, token);
		const scheduleNext = () => {
			if (this.healthCheckTokens.get(configId) !== token) return;
			const entry = this.clients.get(configId);
			if (!entry || entry.status !== "connected") {
				this.stopHealthCheck(configId);
				return;
			}
			const delayMs = _ConnectorMcpProxy.getHealthCheckDelayMs();
			const timer = setTimeout(async () => {
				if (this.healthCheckTokens.get(configId) !== token) return;
				const currentEntry = this.clients.get(configId);
				if (!currentEntry || currentEntry.status !== "connected") {
					this.stopHealthCheck(configId);
					return;
				}
				try {
					await currentEntry.client.ping({ timeout: _ConnectorMcpProxy.HEALTH_CHECK_PING_TIMEOUT_MS });
					if (this.healthCheckTokens.get(configId) !== token) return;
					currentEntry.lastPingAt = Date.now();
					currentEntry.consecutivePingFailures = 0;
					scheduleNext();
				} catch (error) {
					if (this.healthCheckTokens.get(configId) !== token) return;
					const failures = (currentEntry.consecutivePingFailures ?? 0) + 1;
					currentEntry.consecutivePingFailures = failures;
					const threshold = _ConnectorMcpProxy.HEALTH_CHECK_FAILURE_THRESHOLD;
					this.logger.warn(`[ConnectorMcpProxy] healthCheck: ping failed (${failures}/${threshold}) for ${configId}: ${error}`);
					if (failures < threshold) {
						scheduleNext();
						return;
					}
					this.logger.warn(`[ConnectorMcpProxy] healthCheck: failure threshold reached (${failures}/${threshold}) for ${configId}, triggering reconnect`);
					this.stopHealthCheck(configId);
					this.tryReconnect(configId, {
						reason: "health-check",
						sourceError: error
					}).catch((err) => {
						this.logger.warn(`[ConnectorMcpProxy] healthCheck: reconnect failed for ${configId}: ${err}`);
					});
				}
			}, delayMs);
			this.healthCheckTimers.set(configId, timer);
		};
		scheduleNext();
		this.logger.info(`[ConnectorMcpProxy] healthCheck: started for ${configId} (interval=${_ConnectorMcpProxy.HEALTH_CHECK_INTERVAL_MS}ms, jitter<${_ConnectorMcpProxy.HEALTH_CHECK_JITTER_MS}ms)`);
	}
	static getHealthCheckDelayMs() {
		return _ConnectorMcpProxy.HEALTH_CHECK_INTERVAL_MS + Math.floor(Math.random() * _ConnectorMcpProxy.HEALTH_CHECK_JITTER_MS);
	}
	/**
	* 停止健康检查
	*/
	stopHealthCheck(configId) {
		const timer = this.healthCheckTimers.get(configId);
		if (timer) {
			clearTimeout(timer);
			this.healthCheckTimers.delete(configId);
		}
		this.healthCheckTokens.delete(configId);
	}
	/**
	* 构造 42801 二次确认的模型动作指令。
	*
	* Why: QQ Mail 首次返回 confirmation_token 后，模型若只看到原始 JSON，
	* 有概率把它当普通错误或误总结为已完成。这里在真实需要确认时再给出强约束，
	* 要求下一步调用 AskUserQuestion 展示确认卡片，避免 listTools 阶段注入特定工具说明。
	*/
	buildQqMailConfirmationInstruction(params) {
		return [
			"QQ Mail requires explicit user confirmation before this operation can continue.",
			"",
			"Your NEXT action MUST be to call the AskUserQuestion tool.",
			"Do NOT ask for confirmation in plain chat text.",
			"Do NOT produce a final answer yet.",
			"Do NOT say the email operation has completed.",
			"Do NOT retry this QQ Mail tool automatically.",
			"",
			"AskUserQuestion requirements:",
			"- Use one question.",
			"- Provide exactly two options: \"确认发送\" and \"取消\".",
			"- Summarize the operation from the server response below.",
			"- Wait for the user to select an option in the confirmation card.",
			"",
			`After the user selects "确认发送", retry the same QQ Mail tool (${params.originalName})`,
			"with the same arguments plus:",
			`confirmation_token: ${params.token}`,
			"",
			params.expiresAt ? `The confirmation token expires at: ${params.expiresAt}.` : "",
			"",
			"Original QQ Mail confirmation response:",
			params.originalText
		].filter(Boolean).join("\n");
	}
	/**
	* 检测并标记 qq-mail 42801 二次确认错误，让模型通过 AskUserQuestion 展示确认卡片。
	*
	* 背景：qq-mail 对 SendMessage 等敏感操作会返回
	*   {error: {code: 42801, details: {confirmation_token, expires_at}, _hints: {suggested_action: "confirm_with_token"}}}
	* 要求客户端再次调用时带上 confirmation_token。
	*
	* 检测到 42801 后，把 MCP response 改写成带 `isError: true` 的明确下一步动作指令，
	* 要求模型调用 AskUserQuestion。这样确认指引只在真实需要确认时出现，
	* 不再在 listTools 阶段对特定工具追加 description。
	*
	* 作用域：仅对 qq-mail connector 生效（configId 包含 "qq-mail"）
	* 严格四条件：code===42801 + confirmation_token 非空 + expires_at 未过期 + suggested_action==="confirm_with_token"
	*
	* @returns 若识别到 42801 → 返回带 isError:true 的新 result；否则返回 null（走原路径）
	*/
	markQqMailConfirmationRequired(configId, originalName, firstResult) {
		if (!configId.includes("qq-mail")) return null;
		const firstContent = firstResult?.content?.[0];
		if (!firstContent || firstContent.type !== "text" || typeof firstContent.text !== "string") return null;
		let parsed;
		try {
			parsed = JSON.parse(firstContent.text);
		} catch {
			return null;
		}
		const err = parsed?.error;
		if (!err || err.code !== 42801) return null;
		const token = err.details?.confirmation_token;
		if (!token || typeof token !== "string") return null;
		const expiresAt = err.details?.expires_at;
		if (expiresAt) {
			const expiresMs = Date.parse(expiresAt);
			if (!Number.isFinite(expiresMs) || expiresMs <= Date.now()) this.logger.warn(`[ConnectorMcpProxy] 42801 confirmation token already expired server=${configId} tool=${originalName} expires_at=${expiresAt}`);
		}
		if (err._hints?.suggested_action !== "confirm_with_token") return null;
		const tokenPreview = token.slice(0, 12);
		const expiresInSec = expiresAt ? Math.max(0, Math.floor((Date.parse(expiresAt) - Date.now()) / 1e3)) : -1;
		this.logger.info(`[ConnectorMcpProxy] 42801 confirmation required server=${configId} tool=${originalName} token=${tokenPreview}... expiresInSec=${expiresInSec} — marking result as isError and instructing model to call AskUserQuestion`);
		return {
			content: [{
				type: "text",
				text: this.buildQqMailConfirmationInstruction({
					token,
					expiresAt,
					originalName,
					originalText: firstContent.text
				})
			}],
			isError: true
		};
	}
};
require_common$2.__decorate([(0, import_common$1.Autowired)(import_common$1.Logger), require_common$2.__decorateMetadata("design:type", typeof (_ref$7 = typeof import_common$1.Logger !== "undefined" && import_common$1.Logger) === "function" ? _ref$7 : Object)], ConnectorMcpProxy.prototype, "logger", void 0);
require_common$2.__decorate([(0, import_common$1.Autowired)(require_workbuddy_auth_product_coordinator.AuthService), require_common$2.__decorateMetadata("design:type", typeof (_ref2$4 = typeof require_workbuddy_auth_product_coordinator.AuthService !== "undefined" && require_workbuddy_auth_product_coordinator.AuthService) === "function" ? _ref2$4 : Object)], ConnectorMcpProxy.prototype, "authService", void 0);
require_common$2.__decorate([
	(0, import_common$1.Autowired)(require_log_acl_guard.BinaryManager),
	(0, import_common$1.Optional)(),
	require_common$2.__decorateMetadata("design:type", typeof (_ref3$2 = typeof require_log_acl_guard.BinaryManager !== "undefined" && require_log_acl_guard.BinaryManager) === "function" ? _ref3$2 : Object)
], ConnectorMcpProxy.prototype, "binaryManager", void 0);
ConnectorMcpProxy = _ConnectorMcpProxy = require_common$2.__decorate([(0, import_common$1.Component)(require_workbuddy_auth_product_coordinator.ConnectorMcpProxyToken)], ConnectorMcpProxy);
function summarizeConnectorToolArgsForLog(args) {
	const summary = {};
	const entries = Object.entries(args).slice(0, 10);
	for (const [key, value] of entries) {
		if (key === "url" && typeof value === "string") {
			summary.url = value;
			continue;
		}
		summary[key] = sanitizeConnectorProxyLogValue(value);
	}
	return summary;
}
function formatConnectorProxyLog(message, meta) {
	return meta ? `${message} ${JSON.stringify(meta)}` : message;
}
/**
* 把 undici fetch 抛出的错误链拍平成"name=...; code=...; cause.code=...; message=..."
* 形态，便于从日志直接看出是 `UND_ERR_BODY_TIMEOUT` / `UND_ERR_HEADERS_TIMEOUT`
* / `UND_ERR_SOCKET` / `UND_ERR_ABORTED` 之类的 undici 内部错误码。
*
* MCP SDK 的 `processStream` 把原始错误包成 `SSE stream disconnected: ${err}`
* 字符串后会丢失 `cause` 信息；我们必须在 fetch / body 层就地捕获才能拿到 code。
*/
function formatUndiciFetchErrorForLog(error) {
	if (!(error instanceof Error)) return `error=${JSON.stringify(error)}`;
	const parts = [];
	parts.push(`name=${error.name}`);
	const code = error.code;
	if (code !== void 0) parts.push(`code=${String(code)}`);
	let cursor = error.cause;
	let depth = 0;
	while (cursor && depth < 4) {
		if (cursor instanceof Error) {
			const causeCode = cursor.code;
			parts.push(`cause[${depth}]=${cursor.name}${causeCode !== void 0 ? `(${String(causeCode)})` : ""}: ${cursor.message}`);
			cursor = cursor.cause;
		} else {
			parts.push(`cause[${depth}]=${String(cursor)}`);
			cursor = void 0;
		}
		depth++;
	}
	parts.push(`message=${error.message}`);
	return parts.join("; ");
}
/**
* 判定错误是否为「HTTP 业务错误」——server 用 HTTP 4xx（除 401/403）明确拒绝这次请求。
*
* 语义边界（Issue #60615）：
* - **业务错误 ≠ 连接故障**。能返 HTTP status 就证明 TCP/TLS/HTTP 全链路健康，
*   只是 server 拒绝了这一次调用的 payload（例如 QQ 邮箱 SendMessage 的
*   40001 body_hash_mismatch）。此时 reconnect 不但救不了下一次调用，还会在
*   disconnect 阶段把 pending 请求 reject 成 McpError(-32000, "Connection closed")，
*   让上层误判为「连接器断开」。
* - **401 / 403 走 auth 分支**：refresh token 后重连是有意义的，交给现有 isAuthMessage
*   / classifyCallToolError 的 auth 判定链。
* - **5xx 走 transport 分支**：server 挂了，等一下再试合理。
* - **无 HTTP status 走 transport 分支**：真网络错误（ECONNRESET/超时/fetch failed 等）
*   根本进不到 status 判定，isHttpBusinessError 返 false，走原路径。
*
* 依据：MCP SDK 的 StreamableHTTPError 把 HTTP 状态码挂在 `.code` 字段上
* （见 node_modules/@modelcontextprotocol/sdk/dist/esm/client/streamableHttp.js
* 的 `class StreamableHTTPError`）。这里走 duck typing，不硬依赖 SDK 内部类型。
*/
function isHttpBusinessError(error) {
	if (!(error instanceof Error)) return false;
	const code = error.code;
	if (typeof code !== "number") return false;
	if (code === 401 || code === 403) return false;
	return code >= 400 && code < 500;
}
/**
* 把 SDK 抛出的 StreamableHTTPError(4xx, "Error POSTing to endpoint: <body>") 还原成
* MCP tool result，使得业务错误能像正常错误结果一样被模型看到，而不是被 workbuddy
* 误判成 transport 故障并抛出「连接器断开」。
*
* SDK 消息格式（见 SDK streamableHttp.js:364）：
*   "Streamable HTTP error: Error POSTing to endpoint: <server response body>"
* 其中 body 通常是 server 返回的 JSON-RPC error payload（例如 QQ 邮箱的 40001）。
*
* 无法解析出 body 时降级为原文，保证上层永远拿到可用的 tool result。
*/
function buildBusinessErrorResult(error) {
	const raw = error instanceof Error ? error.message : String(error);
	return {
		content: [{
			type: "text",
			text: raw.match(/Error POSTing to endpoint:\s*(.+)$/s)?.[1]?.trim() || raw
		}],
		isError: true
	};
}
/**
* Node.js / undici 层的**标准网络错误码**枚举，用于结构化识别 transport 错误。
*
* 相比按 `error.message` 做字符串匹配（脆弱、易被上游改字破坏），检查 `error.code`
* 是**跨版本稳定**的判据：Node.js 官方文档明确列出这些 code 名，绝大部分底层网络
* 错误都会挂上其中之一。
*
* 覆盖分类：
* - **TCP 层**：连接建立 / 复用阶段的 socket 错误
* - **DNS 层**：域名解析失败
* - **undici 层**：fetch 内部的 socket / 超时 / 主动 abort
*
* 不包括 MCP protocol code（-32000 等 JSON-RPC 保留码）——这类错误由 `isReconnectRipple`
* 单独识别，且业务/协议错误不应被误判为 transport。
*/
var TRANSPORT_ERROR_CODES = new Set([
	"ECONNRESET",
	"ECONNREFUSED",
	"ECONNABORTED",
	"ETIMEDOUT",
	"ENETUNREACH",
	"ENOTCONN",
	"ENOTFOUND",
	"EAI_AGAIN",
	"UND_ERR_SOCKET",
	"UND_ERR_CONNECT_TIMEOUT",
	"UND_ERR_HEADERS_TIMEOUT",
	"UND_ERR_BODY_TIMEOUT",
	"UND_ERR_ABORTED"
]);
/**
* 检查错误链上的任一层是否为 Node.js / undici 标准网络错误码。
*
* fetch / undici 的错误通常是**多层嵌套**（`TypeError: fetch failed` 是外壳，真实
* code 在 `error.cause` 或 `error.cause.cause` 上）。遍历 cause 链（最多 5 层，防
* 循环引用）任何一层命中 `TRANSPORT_ERROR_CODES` 即视为 transport。
*
* 与 `isHttpBusinessError` 的分工：
* - `isHttpBusinessError` 看 HTTP status code（数字 400-499）—— server 响应了明确的
*   业务错误
* - `isTransportErrorByCode` 看 Node 错误 code（字符串 `ECONNRESET` 等）—— 底层网络
*   本身出问题，根本没走到 HTTP 响应
*/
function isTransportErrorByCode(error) {
	let cursor = error;
	let depth = 0;
	while (cursor && depth < 5) {
		if (cursor instanceof Error) {
			const code = cursor.code;
			if (typeof code === "string" && TRANSPORT_ERROR_CODES.has(code)) return true;
			cursor = cursor.cause;
		} else break;
		depth++;
	}
	return false;
}
/**
* Transport 错误的**兜底 message 判据**（当结构化 code 都不命中时使用）。
*
* 硬约束：
* 1. **必须行首行尾锚定**（`^...$`），禁止 `includes` 类模糊匹配
* 2. 每条只匹配**唯一无歧义的历史遗留短语**（Node 老版本 http/stream 层，无 code）
* 3. **禁止**再加入 `closed` / `connection` / `network` 这类会被业务错误碰上的模糊词
*
* 相比历史上的 `['closed','connection','network','timeout','socket','fetch failed']`
* 字符串 `includes`，这里几乎不可能误命中业务错误的 text。
*/
var FALLBACK_TRANSPORT_MESSAGE_PATTERNS = [
	/\bsocket hang up\b/i,
	/\bpremature close\b/i,
	/^aborted$/i
];
/**
* 判定错误是否为「reconnect 副作用」——SDK Protocol._onclose() 在 disconnect 时把
* 所有 pending 请求 reject 成的 `McpError(code=-32000, "Connection closed")`。
*
* 关键洞察：这个错误**不来自网络**，而是 workbuddy 自己触发 tryReconnect → disconnect
* 时的副作用。只要错误 code 是 MCP 保留的 `ConnectionClosed`（-32000），就一定是这条路径
* 产生的（server 侧不允许使用 -32000 这个保留码）。因此不需要文本判断，靠数字 code
* 就能精确识别（避免按 message 文本判断的脆弱性）。
*
* 幂等安全性：只要拿到 `-32000`，就意味着 transport 层从未成功收到过 server 对该请求的
* 响应（否则 SDK 会 resolve 而不是 reject）。所以 server 端 100% 未处理该请求，
* 自动重试是幂等安全的。
*/
function isReconnectRipple(error) {
	if (!(error instanceof Error)) return false;
	return error.code === -32e3;
}
/**
* 判定错误是否为「MCP 会话丢失」——即 MCP spec 2025-11-25 §Session 4 定义的场景：
* client 携带 `Mcp-Session-Id` 发起请求，server 返回 HTTP 404 表示该 session 已被
* server 侧回收（常见于 server 空闲会话 TTL 清理）。
*
* spec 原文：
*   "The server MAY terminate the session at any time, after which it MUST respond
*    to requests containing that session ID with HTTP 404 Not Found."
*   "When a client receives HTTP 404 in response to a request containing an
*    MCP-Session-Id, it MUST start a new session by sending a new InitializeRequest
*    without a session ID attached."
*
* 判据：
* 1. `error instanceof Error` 且 `error.code === 404`（SDK StreamableHTTPError 把
*    HTTP status 挂在 `.code` 字段上，参见 `isHttpBusinessError` 注释）
* 2. 调用侧传入的 `sessionId` 是非空字符串——只有请求真的带了 session id 时，
*    404 才具备 session-lost 语义
*
* 为什么把 `sessionId` 作为参数传入而不是在 helper 内部读取：
* - 保持 helper 纯函数，便于单测
* - 调用点通过 `client.transport?.sessionId`（SDK Transport 接口标准字段）拿到
* - 若 sessionId 为空/undefined（如初始化未完成 / 已 terminateSession），本函数返回
*   false，让错误走原有的 business error 分支（清晰报错，避免错误 URL 反复 reconnect）
*
* 幂等安全性：session 已被 server 清理，本次请求的 payload 必然未被处理（server 都
* 不知道 session）。因此 reconnect + 重试是幂等安全的。
*/
function isMcpSessionLost(error, sessionId) {
	if (!(error instanceof Error)) return false;
	if (error.code !== 404) return false;
	return typeof sessionId === "string" && sessionId.length > 0;
}
/**
* 根据 `waitForReconnect` 的失败原因生成精准的错误消息（issue #60615 review followup）。
*
* 历史上 ripple 分支所有失败都抛"reconnect did not recover in time"，但实际有 4 种情况：
* 手动 disconnect / entry 已清理 / 真超时 / reconnect 完但状态又变。统一错误消息会误导
* 排查——尤其"手动 disconnect"完全没有 reconnect 在跑，用"未超时内恢复"是纯粹的假信号。
*/
function buildRippleFailureMessage(configId, result) {
	switch (result.reason) {
		case "no-inflight": return `Connector "${configId}" was disconnected during call (no in-flight reconnect).`;
		case "entry-lost": return `Connector "${configId}" was removed during call.`;
		case "timeout": return `Connector "${configId}" call failed due to reconnect ripple and reconnect did not recover in time.`;
		case "reconnect-failed": return `Connector "${configId}" reconnected but was disconnected again before retry could proceed.`;
	}
}
/**
* 基于错误对象 / 错误链的字符串特征，对 transport 错误做启发式归类。
* 仅作日志辅助标签，不参与 reconnect 决策。
*
* 主要用于区分以下几类典型断联：
* - `sse-body-terminated`：MCP SDK 的 SSE 流被对端强制关闭（最常见，等价于 server `res.destroy()` / TCP RST）
* - `aborted`：客户端 AbortController 主动中止
* - `econnreset` / `econnrefused`：底层 TCP 错误
* - `headers-timeout` / `body-timeout`：undici 超时
* - `unknown`：未匹配到已知模式
*/
function inferTransportCloseKind(error) {
	const messages = [];
	let cursor = error;
	let depth = 0;
	while (cursor && depth < 5) {
		if (cursor instanceof Error) {
			messages.push(`${cursor.name}: ${cursor.message}`);
			const code = cursor.code;
			if (typeof code === "string") messages.push(code);
			cursor = cursor.cause;
		} else if (typeof cursor === "string") {
			messages.push(cursor);
			cursor = void 0;
		} else cursor = void 0;
		depth++;
	}
	const haystack = messages.join(" | ").toLowerCase();
	if (!haystack) return "unknown";
	if (haystack.includes("sse stream disconnected") && haystack.includes("terminated")) return "sse-body-terminated";
	if (haystack.includes("und_err_aborted") || haystack.includes("aborterror") || haystack.includes("the operation was aborted")) return "aborted";
	if (haystack.includes("econnreset") || haystack.includes("und_err_socket")) return "econnreset";
	if (haystack.includes("econnrefused")) return "econnrefused";
	if (haystack.includes("und_err_headers_timeout")) return "headers-timeout";
	if (haystack.includes("und_err_body_timeout")) return "body-timeout";
	if (haystack.includes("terminated")) return "undici-terminated";
	if (haystack.includes("mcp transport closed")) return "transport-closed";
	return "unknown";
}
function serializeConnectorProxyErrorForLog(error) {
	if (error instanceof Error) {
		const errorWithExtras = error;
		return {
			name: error.name,
			message: error.message,
			stack: error.stack,
			code: errorWithExtras.code,
			data: sanitizeConnectorProxyLogValue(errorWithExtras.data),
			cause: errorWithExtras.cause ? serializeConnectorProxyErrorCauseForLog(errorWithExtras.cause) : void 0
		};
	}
	return { message: String(error) };
}
function serializeConnectorProxyErrorCauseForLog(error) {
	if (error instanceof Error) return serializeConnectorProxyErrorForLog(error);
	return String(error);
}
function sanitizeConnectorProxyLogValue(value, depth = 0) {
	if (depth >= 3) return "[truncated]";
	if (value == null || typeof value === "number" || typeof value === "boolean" || typeof value === "string") return value;
	if (Array.isArray(value)) return value.slice(0, 10).map((item) => sanitizeConnectorProxyLogValue(item, depth + 1));
	if (value instanceof Error) return serializeConnectorProxyErrorForLog(value);
	if (typeof value === "object") {
		const entries = Object.entries(value).slice(0, 20);
		return Object.fromEntries(entries.map(([key, nested]) => [key, sanitizeConnectorProxyLogValue(nested, depth + 1)]));
	}
	return String(value);
}
function shouldDedupeArdotCreateDesignCall(configId, toolName, originalToolName) {
	return configId === ARDOT_MCP_CONFIG_ID && toolName === ARDOT_CREATE_DESIGN_TOOL_NAME && originalToolName === ARDOT_CREATE_DESIGN_ORIGINAL_TOOL_NAME;
}
function buildConnectorCallToolRequest(configId, originalToolName, args, context) {
	const request = {
		name: originalToolName,
		arguments: args
	};
	if (shouldInjectArdotSessionMeta(configId, context)) request._meta = { "workbuddy.ai/sessionId": context.workbuddySessionId };
	return request;
}
function shouldInjectArdotSessionMeta(configId, context) {
	return configId === ARDOT_MCP_CONFIG_ID && typeof context?.workbuddySessionId === "string" && context.workbuddySessionId.length > 0;
}
function buildArdotCreateDesignDedupeKey(configId, originalToolName, args) {
	return `${configId}:${originalToolName}:${stableStringifyConnectorToolArgs(args)}`;
}
function stableStringifyConnectorToolArgs(value) {
	try {
		return JSON.stringify(stableConnectorToolArgValue(value));
	} catch {
		try {
			return JSON.stringify(value);
		} catch {
			return String(value);
		}
	}
}
function stableConnectorToolArgValue(value) {
	if (value == null || typeof value === "number" || typeof value === "boolean" || typeof value === "string") return value;
	if (Array.isArray(value)) return value.map((item) => stableConnectorToolArgValue(item));
	if (typeof value === "object") {
		const out = {};
		for (const key of Object.keys(value).sort()) out[key] = stableConnectorToolArgValue(value[key]);
		return out;
	}
	return String(value);
}
//#endregion
//#region ../../packages/workbuddy-server/src/connector/connector-proxy-server.ts
/**
* Connector Proxy MCP Server
*
* 职责：
* 1. 在固定端口启动 HTTP Server，实现标准 MCP 协议
* 2. 将 CLI 的 tools/list 请求转发为聚合所有 connector 的工具列表
* 3. 将 CLI 的 tools/call 请求路由到对应 connector 的 MCP Client
* 4. connector 工具变化时推送 tools/list_changed 通知
* 5. 处理 /oauth/callback 路由（OAuth 授权回调）
*
* CLI 通过 .mcp.json 中的 connector-proxy 配置连接此 Server。
*/
require_common$2.init_decorateMetadata();
require_common$2.init_decorate();
var _ref$6, _ref2$3;
/**
* Host / Origin 白名单：仅允许环回地址。
*
* 用于阻断 DNS Rebinding 攻击 —— 即使 server 绑定在 127.0.0.1，浏览器仍可能
* 把攻击者域名解析到 127.0.0.1 并发起"看似同源"的请求；通过 Host 头白名单
* 强制要求请求声明的目标主机必须是环回地址，可以拒绝这类请求。
*/
var ALLOWED_LOOPBACK_HOSTS = new Set([
	"127.0.0.1",
	"localhost",
	"::1",
	"0:0:0:0:0:0:0:1"
]);
var ConnectorProxyServer = class ConnectorProxyServer {
	logger;
	proxy;
	/**
	* ConnectorService 引用（仅用于 connector_invoke 埋点的元数据查询）。
	*
	* 采用 setter 注入（`setConnectorService`）而非 `@Autowired`：
	* ConnectorService 强依赖 ConnectorProxyServer（启动 proxy server），
	* 若反向再用 `@Autowired` 注入 ConnectorService，CellJS 在解析
	* `toDynamicValue` 时会触发循环依赖检查报错（issue #__bootstrap 启动失败）。
	* 启动时由 `ConnectorService.init()` 在 `proxyServer.start()` 之前注入。
	* 当 ContainerUtil.get 不可用时作为 fallback。
	*/
	connectorService;
	eventService;
	httpServer = null;
	port = 0;
	/** Proxy 认证 secret（每次启动随机生成） */
	proxySecret = "";
	/**
	* MCP SDK 构造器（start() 时异步 import 得到，供 per-session 工厂复用）
	*/
	McpServerCtor = null;
	StreamableHTTPServerTransportCtor = null;
	/**
	* Per-session 对象：每个 CLI 会话独立一份 { McpServer, Transport }，
	* 避免多 session 共享 McpServer 导致 Protocol._transport 被后来者覆盖
	* （参考 DesktopMcpServer 多 session 修复思路）。
	* key: sessionId
	*/
	sessions = /* @__PURE__ */ new Map();
	/**
	* 启动 Proxy MCP Server
	* @returns 实际监听端口
	*/
	/**
	* 获取 Proxy 认证 secret（供 CLIManager 注入环境变量）
	*/
	getProxySecret() {
		return this.proxySecret;
	}
	/**
	* 注入 ConnectorService 引用（用于 connector_invoke 埋点）。
	*
	* 见字段注释：通过 setter 注入打破 ConnectorService ↔ ConnectorProxyServer
	* 的 DI 循环依赖。由 `ConnectorService.init()` 在启动 proxy 前调用。
	*/
	setConnectorService(service) {
		this.connectorService = service;
	}
	/**
	* 业务监控上报器。运行时读模块级 reporter（由宿主在 bootstrap 时经
	* `setConnectorMetricReporter` 注入，详见 connector-mcp-proxy-metric.ts）；
	* 未注入时所有上报安全降级为 noop。
	*/
	metric = new ConnectorMetricReporter();
	async start() {
		this.proxySecret = (0, node_crypto.randomBytes)(32).toString("base64url");
		this.logger.info(`[ConnectorProxyServer] Generated proxy secret (length=${this.proxySecret.length})`);
		const { McpServer } = await Promise.resolve().then(() => require("./mcp.js"));
		const { StreamableHTTPServerTransport } = await Promise.resolve().then(() => require("./streamableHttp.js"));
		this.McpServerCtor = McpServer;
		this.StreamableHTTPServerTransportCtor = StreamableHTTPServerTransport;
		this.proxy.onToolsChanged(() => {
			this.notifyToolsChanged();
		});
		this.httpServer = node_http.createServer(async (req, res) => {
			try {
				await this.handleRequest(req, res);
			} catch (error) {
				this.logger.error("[ConnectorProxyServer] Request error:", error);
				if (!res.headersSent) {
					res.writeHead(500);
					res.end("Internal Server Error");
				}
			}
		});
		this.port = await this.listenOnPort(this.httpServer);
		this.proxy.setCallbackPort(this.port);
		this.logger.info(`[ConnectorProxyServer] Listening on http://127.0.0.1:${this.port}`);
		return this.port;
	}
	/**
	* 停止 Server
	*/
	stop() {
		for (const [, pair] of this.sessions) {
			try {
				pair.transport.close();
			} catch {}
			try {
				pair.server.close?.();
			} catch {}
		}
		this.sessions.clear();
		if (this.httpServer) {
			this.httpServer.close();
			this.httpServer = null;
		}
		this.logger.info("[ConnectorProxyServer] Stopped");
	}
	/**
	* 获取监听端口
	*/
	getPort() {
		return this.port;
	}
	/**
	* 为单个 CLI 会话创建独立的 { McpServer, Transport } 对。
	*
	* 每个 session 独立一对，不共享 Protocol._transport，彻底避免
	* "后来者覆盖 Protocol._transport 导致旧 session 响应走错"的问题。
	*/
	async createSessionPair(workbuddySessionId, welcomeMode, projectId) {
		const server = new this.McpServerCtor({
			name: "connector-proxy",
			version: "1.0.0"
		}, { capabilities: {
			tools: { listChanged: true },
			resources: { listChanged: true }
		} });
		await this.registerToolHandlersFor(server, () => ({
			workbuddySessionId,
			welcomeMode,
			projectId
		}));
		const transport = new this.StreamableHTTPServerTransportCtor({
			sessionIdGenerator: () => (0, node_crypto.randomUUID)(),
			onsessioninitialized: (sid) => {
				this.sessions.set(sid, {
					server,
					transport,
					workbuddySessionId,
					welcomeMode,
					projectId
				});
				this.logger.info(`[ConnectorProxyServer] New session: ${sid} (total=${this.sessions.size}) workbuddySessionId=${workbuddySessionId ?? "(unset)"} welcomeMode=${welcomeMode ?? "(unset)"}`);
			},
			onsessionclosed: (sid) => {
				const pair = this.sessions.get(sid);
				this.sessions.delete(sid);
				this.logger.info(`[ConnectorProxyServer] Session closed: ${sid} (remaining=${this.sessions.size})`);
				try {
					pair?.server.close?.();
				} catch (error) {
					this.logger.warn("[ConnectorProxyServer] Error closing session McpServer:", error);
				}
			}
		});
		await server.connect(transport);
		return {
			server,
			transport
		};
	}
	/**
	* 注册 MCP tool/resource handlers 到指定 McpServer 实例
	*
	* McpServer 的高级 API（.tool()）需要预先注册工具名称，
	* 但我们的工具是动态的（connector 增删时变化）。
	*
	* 所以我们直接用底层 Server 的 setRequestHandler 来处理
	* tools/list / tools/call / resources/list / resources/templates/list /
	* resources/read，实现动态路由。
	*/
	async registerToolHandlersFor(mcpServer, getContext) {
		const { ListToolsRequestSchema, CallToolRequestSchema, ListResourcesRequestSchema, ListResourceTemplatesRequestSchema, ReadResourceRequestSchema } = await Promise.resolve().then(() => require("./types.js")).then((n) => n.types_exports);
		const server = mcpServer.server;
		server.setRequestHandler(ListToolsRequestSchema, async () => {
			const { welcomeMode, projectId } = getContext();
			return { tools: this.proxy.listAllTools({
				welcomeMode,
				projectId
			}) };
		});
		server.setRequestHandler(CallToolRequestSchema, async (request, extra) => {
			const { name, arguments: args, _meta: meta } = request.params;
			const callContext = this.buildConnectorMcpCallContext(getContext, meta);
			const startTime = Date.now();
			const progressToken = meta?.progressToken;
			const onProgress = progressToken !== void 0 && typeof extra?.sendNotification === "function" ? (progress, total, message) => {
				extra.sendNotification({
					method: "notifications/progress",
					params: {
						progressToken,
						progress,
						total,
						message
					}
				}).catch((err) => {
					this.logger.debug?.(`[ConnectorProxyServer] forward progress failed for "${name}": ${err instanceof Error ? err.message : String(err)}`);
				});
			} : void 0;
			const invokeDims = this.proxy.getMcpInvokeDims(name);
			const invokeDimsBase = {
				mcpServer: invokeDims.mcpServer,
				toolName: name,
				isBuiltin: invokeDims.isBuiltin
			};
			try {
				const result = await this.proxy.callTool(name, args || {}, callContext, onProgress);
				this.metric.invoke({
					dims: invokeDimsBase,
					durationMs: Date.now() - startTime,
					result
				});
				this.reportConnectorInvoke(name, callContext, startTime, {
					isSuccessful: true,
					toolStatus: "success"
				});
				const attributionMeta = { "workbuddy.ai/connectorServer": invokeDims.mcpServer };
				if (Array.isArray(result)) return {
					content: result,
					_meta: attributionMeta
				};
				if (result && typeof result === "object" && Array.isArray(result.content)) {
					const typed = result;
					const baseMeta = {
						...typed._meta ?? {},
						...attributionMeta
					};
					if (typed.isError && typed.tool_error_code) return {
						content: typed.content,
						isError: true,
						_meta: {
							...baseMeta,
							tool_error_code: typed.tool_error_code
						}
					};
					return {
						...typed,
						_meta: baseMeta
					};
				}
				return {
					content: [{
						type: "text",
						text: typeof result === "string" ? result : JSON.stringify(result)
					}],
					_meta: attributionMeta
				};
			} catch (error) {
				const message = error instanceof Error ? error.message : String(error);
				this.metric.invoke({
					dims: invokeDimsBase,
					durationMs: Date.now() - startTime,
					error
				});
				this.reportConnectorInvoke(name, callContext, startTime, {
					isSuccessful: false,
					toolStatus: this.classifyToolStatus(error),
					errorCode: this.extractErrorCode(error)
				});
				this.logger.error(formatProxyServerLog("[ConnectorProxyServer] tools/call failed", {
					toolName: name,
					args: summarizeProxyCallArgsForLog(args || {}),
					error: serializeProxyServerErrorForLog(error)
				}));
				return {
					content: [{
						type: "text",
						text: `Error: ${message}`
					}],
					isError: true,
					_meta: { tool_error_code: "90001" }
				};
			}
		});
		server.setRequestHandler(ListResourcesRequestSchema, async () => {
			return { resources: this.aggregateAllResources() };
		});
		server.setRequestHandler(ListResourceTemplatesRequestSchema, async () => {
			return { resourceTemplates: this.aggregateAllResourceTemplates() };
		});
		server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
			const uri = request.params?.uri;
			if (typeof uri !== "string" || uri.length === 0) throw new Error("resources/read: missing uri");
			const configId = this.findConfigIdForResourceUri(uri);
			if (!configId) throw new Error(`resources/read: no connector owns resource URI "${uri}"`);
			return { contents: (await this.proxy.readResourceForConnector(configId, uri)).contents };
		});
	}
	/**
	* 聚合所有已连接 connector 的静态资源，添加来源 hint。
	*/
	aggregateAllResources() {
		const result = [];
		for (const [, entry] of this.proxy.getAllClientEntries()) {
			if (entry.status !== "connected" || !entry.resources?.length) continue;
			for (const r of entry.resources) result.push({
				uri: r.uri,
				name: r.name ?? r.uri,
				description: r.description,
				mimeType: r.mimeType
			});
		}
		return result;
	}
	/**
	* 聚合所有已连接 connector 的资源模板。
	*/
	aggregateAllResourceTemplates() {
		const result = [];
		for (const [, entry] of this.proxy.getAllClientEntries()) {
			if (entry.status !== "connected" || !entry.resourceTemplates?.length) continue;
			for (const t of entry.resourceTemplates) result.push({
				uriTemplate: t.uriTemplate,
				name: t.name ?? t.uriTemplate,
				description: t.description,
				mimeType: t.mimeType
			});
		}
		return result;
	}
	/**
	* 由 URI 反查 owning configId。匹配优先级：
	* 1. 静态资源完全匹配 (entry.resources[*].uri === uri)
	* 2. 模板匹配（用 entry.resourceTemplates[*].uriTemplate 把 `{...}` 替换为通配再匹配 URI）
	*
	* 找不到时返回 undefined，由调用方报错给上游（cbc → LLM）。
	*/
	findConfigIdForResourceUri(uri) {
		for (const [configId, entry] of this.proxy.getAllClientEntries()) {
			if (entry.status !== "connected") continue;
			if (entry.resources?.some((r) => r.uri === uri)) return configId;
		}
		for (const [configId, entry] of this.proxy.getAllClientEntries()) {
			if (entry.status !== "connected" || !entry.resourceTemplates?.length) continue;
			for (const t of entry.resourceTemplates) if (matchesUriTemplate(uri, t.uriTemplate)) return configId;
		}
	}
	async handleRequest(req, res) {
		const url = new URL(req.url || "/", `http://127.0.0.1:${this.port}`);
		if (!this.verifyHost(req, res)) return;
		if (!this.verifyOrigin(req, res)) return;
		if (url.pathname.startsWith("/.well-known/")) {
			res.writeHead(404, { "Content-Type": "application/json" });
			res.end(JSON.stringify({
				error: "not_found",
				error_description: "This server does not support OAuth discovery"
			}));
			return;
		}
		if (url.pathname === "/oauth/callback") {
			this.handleOAuthCallback(url, res);
			return;
		}
		if (url.pathname === "/health" && req.method === "GET") {
			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(JSON.stringify({
				status: "ok",
				tools: this.proxy.listAllTools().length
			}));
			return;
		}
		if (url.pathname === "/internal/tencent-docs/tokens" && req.method === "GET") {
			if (!this.verifyAuth(req, res)) return;
			await this.handleTencentDocsTokenRequest(res);
			return;
		}
		if (url.pathname === "/mcp") {
			if (!this.verifyAuth(req, res)) return;
			await this.handleMcpRequest(req, res);
			return;
		}
		res.writeHead(404);
		res.end("Not Found");
	}
	async handleTencentDocsTokenRequest(res) {
		if (!this.connectorService?.getTencentDocsPluginTokens) {
			res.writeHead(503, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ error: "connector_service_unavailable" }));
			return;
		}
		try {
			const tokens = await this.connectorService.getTencentDocsPluginTokens();
			this.logger.info(`[TencentDocsPluginToken] request served personal=${tokens.personal.available ? "available" : tokens.personal.reason ?? "unavailable"} enterprise=${tokens.enterprise.available ? "available" : tokens.enterprise.reason ?? "unavailable"}`);
			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(JSON.stringify(tokens));
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			this.logger.warn(`[ConnectorProxyServer] Tencent Docs token provider failed: ${message}`);
			res.writeHead(500, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ error: "token_provider_failed" }));
		}
	}
	/**
	* 处理 MCP 协议请求
	*
	* Per-session 模型：每个新 CLI 连接（POST 无 mcp-session-id）都会
	* 创建独立的 { McpServer, Transport } 对；已有 session 的请求通过
	* mcp-session-id 路由到对应那一对。
	*/
	async handleMcpRequest(req, res) {
		const sessionId = req.headers["mcp-session-id"];
		if (sessionId && this.sessions.has(sessionId)) {
			await this.sessions.get(sessionId).transport.handleRequest(req, res);
			return;
		}
		if (req.method === "POST") {
			const workbuddySessionId = readHeader(req, require_workbuddy_auth_product_coordinator.WORKBUDDY_SESSION_ID_HEADER);
			const welcomeMode = readHeader(req, require_workbuddy_auth_product_coordinator.WORKBUDDY_WELCOME_MODE_HEADER);
			const projectId = readHeader(req, require_workbuddy_auth_product_coordinator.WORKBUDDY_PROJECT_ID_HEADER);
			const { transport } = await this.createSessionPair(workbuddySessionId, welcomeMode, projectId);
			await transport.handleRequest(req, res);
			return;
		}
		this.logger.warn(`[ConnectorProxyServer] Bad MCP request: method=${req.method} sessionId=${sessionId ?? "none"}`);
		res.writeHead(400);
		res.end("Bad Request: No valid session");
	}
	/**
	* 处理 OAuth 回调（HTTP fallback）
	*
	* 直接调用 mcpProxy.handleOAuthCallback，
	* mcpProxy 内部会触发 onOAuthCompleted 统一事件。
	*/
	async handleOAuthCallback(url, res) {
		const code = url.searchParams.get("code");
		const state = url.searchParams.get("state");
		const error = url.searchParams.get("error");
		this.logger.info(`[ConnectorProxyServer] OAuth callback: code=${code ? "present" : "missing"}, state=${state ? "present" : "missing"}, error=${error ?? "none"}`);
		if (error) {
			await this.proxy.handleOAuthCallbackFromUrl(url.toString());
			const errorDescription = url.searchParams.get("error_description");
			const displayMsg = errorDescription ? `${error}: ${errorDescription}` : error;
			res.writeHead(400, { "Content-Type": "text/html; charset=utf-8" });
			res.end(`
                <!DOCTYPE html>
                <html>
                <head><title>授权失败</title></head>
                <body style="display:flex;justify-content:center;align-items:center;height:100vh;font-family:system-ui;">
                    <div style="text-align:center;">
                        <h2>授权失败</h2>
                        <p>${displayMsg}，请返回 WorkBuddy 重试。</p>
                    </div>
                </body>
                </html>
            `);
			return;
		}
		if (!state || !code) {
			await this.proxy.handleOAuthCallbackFromUrl(url.toString());
			res.writeHead(400, { "Content-Type": "text/html; charset=utf-8" });
			res.end(`
                <!DOCTYPE html>
                <html>
                <head><title>授权失败</title></head>
                <body style="display:flex;justify-content:center;align-items:center;height:100vh;font-family:system-ui;">
                    <div style="text-align:center;">
                        <h2>授权失败</h2>
                        <p>缺少必要的 OAuth 参数，请返回 WorkBuddy 重试。</p>
                    </div>
                </body>
                </html>
            `);
			return;
		}
		try {
			const result = await this.proxy.handleOAuthCallback(state, code);
			this.logger.info(`[ConnectorProxyServer] OAuth callback result: success=${result.success}, configId=${result.configId}`);
			if (!result.success) {
				res.writeHead(400, { "Content-Type": "text/html; charset=utf-8" });
				res.end(`
                    <!DOCTYPE html>
                    <html>
                    <head><title>授权失败</title></head>
                    <body style="display:flex;justify-content:center;align-items:center;height:100vh;font-family:system-ui;">
                        <div style="text-align:center;">
                            <h2>授权失败</h2>
                            <p>${result.error || "OAuth 处理失败，请返回 WorkBuddy 重试。"}</p>
                        </div>
                    </body>
                    </html>
                `);
				return;
			}
			res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
			res.end(`
                <!DOCTYPE html>
                <html>
                <head><title>授权成功</title></head>
                <body style="display:flex;justify-content:center;align-items:center;height:100vh;font-family:system-ui;">
                    <div style="text-align:center;">
                        <h2>授权成功</h2>
                        <p>您可以关闭此页面，返回 WorkBuddy。</p>
                    </div>
                </body>
                </html>
            `);
		} catch (error) {
			this.logger.error("[ConnectorProxyServer] OAuth callback processing error:", error);
			res.writeHead(500, { "Content-Type": "text/html; charset=utf-8" });
			res.end(`
                <!DOCTYPE html>
                <html>
                <head><title>授权失败</title></head>
                <body style="display:flex;justify-content:center;align-items:center;height:100vh;font-family:system-ui;">
                    <div style="text-align:center;">
                        <h2>授权失败</h2>
                        <p>OAuth 回调处理异常，请返回 WorkBuddy 重试。</p>
                    </div>
                </body>
                </html>
            `);
		}
	}
	/**
	* 向所有已连接的 CLI 发送 tools/list_changed 通知
	*/
	notifyToolsChanged() {
		this.logger.info(`[ConnectorProxyServer] notifyToolsChanged: ${this.sessions.size} sessions`);
		for (const [sessionId, pair] of this.sessions) try {
			pair.transport.send({
				jsonrpc: "2.0",
				method: "notifications/tools/list_changed"
			});
		} catch (error) {
			this.logger.warn(`[ConnectorProxyServer] Failed to notify session ${sessionId}:`, error);
		}
	}
	/**
	* 验证 Bearer token 认证
	*
	* 安全：强制要求 Authorization header 携带正确的 Bearer token。
	*
	* 旧逻辑"无 token 则放行"会被 DNS Rebinding / 本机恶意进程利用 ——
	* 浏览器跨域 fetch 默认不带 Authorization，本地恶意脚本也可省略，
	* 都会命中放行分支，导致敏感工具被未授权调用（窃取 JWT、读取历史对话等）。
	*
	* 内嵌 CLI 通过 buildConnectorProxyMcpConfig 注入真实 Bearer secret 到
	* mcp config 的 headers 字段（详见该函数 proxySecret 参数注释），
	* 启动 + 每次 ACP loadSession 都会带上正确 Authorization。其他来源
	* （恶意网页 / 其他本机进程）无法获取 secret，必然被此校验拒绝。
	*
	* @returns true 如果认证通过，false 如果已返回 401
	*/
	verifyAuth(req, res) {
		const rawAuth = req.headers["authorization"];
		if (typeof rawAuth !== "string" || rawAuth !== `Bearer ${this.proxySecret}`) {
			this.logger.warn("[ConnectorProxyServer] Unauthorized request rejected (missing or invalid Bearer token)");
			res.writeHead(401, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ error: "Unauthorized" }));
			return false;
		}
		return true;
	}
	/**
	* 验证 Host 头白名单（防 DNS Rebinding 攻击）
	*
	* 即使 server 绑定在 127.0.0.1，攻击者仍可通过 DNS Rebinding 让浏览器把
	* `attacker.example.com` 解析到 127.0.0.1，此时浏览器视角是"同源"请求，
	* 但 Host 头会是 `attacker.example.com:18484`。我们通过严格匹配 Host 头
	* 是否为环回地址来阻断这类攻击。
	*
	* @returns true 如果 Host 合法，false 如果已返回 403
	*/
	verifyHost(req, res) {
		const host = req.headers["host"];
		if (!host) {
			this.logger.warn("[ConnectorProxyServer] Forbidden: missing Host header");
			res.writeHead(403, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ error: "Forbidden: missing Host header" }));
			return false;
		}
		const hostname = this.extractHostname(host).toLowerCase();
		if (!ALLOWED_LOOPBACK_HOSTS.has(hostname)) {
			this.logger.warn(`[ConnectorProxyServer] Forbidden: invalid Host header "${host}"`);
			res.writeHead(403, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ error: "Forbidden: invalid host" }));
			return false;
		}
		return true;
	}
	/**
	* 验证 Origin 头（防恶意网页跨域请求）
	*
	* 同进程的内嵌 CLI / Node.js fetch 通常不发送 Origin 头，允许放行。
	* 浏览器发起的跨域请求一定带 Origin，仅当 Origin 指向环回地址时才放行。
	*
	* @returns true 如果 Origin 合法或不存在，false 如果已返回 403
	*/
	verifyOrigin(req, res) {
		const origin = req.headers["origin"];
		if (!origin) return true;
		try {
			let originHost = new URL(origin).hostname.toLowerCase();
			if (originHost.startsWith("[") && originHost.endsWith("]")) originHost = originHost.slice(1, -1);
			if (!ALLOWED_LOOPBACK_HOSTS.has(originHost)) {
				this.logger.warn(`[ConnectorProxyServer] Forbidden: invalid Origin "${origin}"`);
				res.writeHead(403, { "Content-Type": "application/json" });
				res.end(JSON.stringify({ error: "Forbidden: invalid origin" }));
				return false;
			}
			return true;
		} catch {
			this.logger.warn(`[ConnectorProxyServer] Forbidden: malformed Origin "${origin}"`);
			res.writeHead(403, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ error: "Forbidden: malformed origin" }));
			return false;
		}
	}
	/**
	* 从 Host 头中提取 hostname（去掉端口部分）。
	* 支持 IPv6 字面量形式 `[::1]:18484` → `::1`。
	*/
	extractHostname(host) {
		const trimmed = host.trim();
		if (trimmed.startsWith("[")) {
			const end = trimmed.indexOf("]");
			if (end > 0) return trimmed.slice(1, end);
			return trimmed;
		}
		const colonIdx = trimmed.indexOf(":");
		return colonIdx >= 0 ? trimmed.slice(0, colonIdx) : trimmed;
	}
	/**
	* 绑定监听端口。
	*
	* 安全考虑：使用 `port: 0` 让操作系统分配随机的临时端口（ephemeral port），
	* 避免固定端口 `18484` 被攻击者直接构造 PoC 利用 DNS Rebinding 攻击。
	* - 攻击者必须先扫描受害者本机端口才能定位 Connector Proxy
	* - 浏览器对 localhost 的端口扫描有严格限制（PNA、端口黑名单、RTT 探测限速）
	* - 实际监听端口对外只通过 `getPort()` 暴露给同进程内嵌 CLI / OAuth 回调，
	*   外部进程无法获取
	*
	* 注：保留 `PROXY_SERVER_DEFAULT_PORT` / `PROXY_SERVER_PORT_RETRIES` 常量
	* 仅为兼容历史 import 引用，实际不再使用。
	*/
	listenOnPort(server) {
		return new Promise((resolve, reject) => {
			server.once("error", (err) => {
				reject(err);
			});
			server.listen(0, "127.0.0.1", () => {
				const address = server.address();
				if (address && typeof address === "object") resolve(address.port);
				else reject(/* @__PURE__ */ new Error("[ConnectorProxyServer] Failed to obtain listening port"));
			});
		});
	}
	/**
	* 把 ACP / MCP 透传过来的 `_meta.workbuddy.ai/*` 字段映射为 `ConnectorMcpCallContext`。
	*/
	buildConnectorMcpCallContext(getContext, meta) {
		const baseCtx = getContext();
		const m = meta ?? {};
		const pickString = (key) => {
			const v = m[`workbuddy.ai/${key}`];
			return typeof v === "string" && v.length > 0 ? v : void 0;
		};
		const triggerSourceRaw = pickString("triggerSource");
		const triggerSource = triggerSourceRaw === "auto" || triggerSourceRaw === "skill" || triggerSourceRaw === "user_mention" ? triggerSourceRaw : void 0;
		return {
			workbuddySessionId: baseCtx.workbuddySessionId,
			projectId: baseCtx.projectId,
			conversationId: pickString("conversationId"),
			requestId: pickString("requestId"),
			messageId: pickString("messageId"),
			toolCallId: pickString("toolCallId"),
			agentMode: pickString("mode"),
			expertId: pickString("expertId"),
			triggerSource,
			modelId: typeof m.modelId === "string" && m.modelId.length > 0 ? m.modelId : void 0
		};
	}
	/**
	* 把异常映射为 connector_invoke 的 toolStatus 字段。
	*
	* - AbortError / 含 'aborted' 关键词 → cancelled
	* - 其他 → failed
	*
	* 注：'skipped' 在当前调用链没有可观测来源，端侧暂不上报。
	*/
	classifyToolStatus(error) {
		if (error instanceof DOMException && error.name === "AbortError") return "cancelled";
		const message = error instanceof Error ? error.message : String(error);
		if (/aborted|cancell?ed/i.test(message)) return "cancelled";
		return "failed";
	}
	/**
	* 从异常中抽取一个稳定的 errorCode（最多 64 字符），用于聚合 Top 错误码。
	*/
	extractErrorCode(error) {
		const message = error instanceof Error ? error.message : String(error);
		if (!message) return;
		const head = message.split(":")[0]?.trim().slice(0, 64);
		return head && head.length > 0 ? head : void 0;
	}
	/**
	* 上报 connector_invoke。失败安全：拿不到 ConnectorService / EventService / connector
	* 元数据时静默跳过，不影响 tools/call 主流程。
	*/
	reportConnectorInvoke(toolName, ctx, startTime, outcome) {
		if (!this.eventService || !this.connectorService) return;
		const configId = this.proxy.findConfigIdForTool(toolName);
		if (!configId) return;
		const finishTime = Date.now();
		this.connectorService.getConfigs().then((configs) => {
			const rawConfigId = require_workbuddy_auth_product_coordinator.toRawConfigId(configId);
			const config = configs.find((c) => c.id === rawConfigId);
			const connectorType = this.inferConnectorKind(config);
			const payload = {
				mode: "LOCAL",
				connectorId: rawConfigId,
				connectorName: config?.name ?? rawConfigId,
				connectorType,
				conversationId: ctx.conversationId ?? "",
				requestId: ctx.requestId ?? "",
				messageId: ctx.messageId ?? "",
				toolName,
				toolCallId: ctx.toolCallId ?? "",
				agentMode: ctx.agentMode ?? "unknown",
				expertId: ctx.expertId,
				triggerSource: ctx.triggerSource ?? "auto",
				isSuccessful: outcome.isSuccessful,
				toolStatus: outcome.toolStatus,
				errorCode: outcome.errorCode,
				cost: finishTime - startTime,
				invokeAt: finishTime
			};
			this.eventService.report(require_common$2.Events.ConnectorInvoke, payload);
		}).catch((err) => {
			this.logger.warn("[ConnectorProxyServer] connector_invoke report failed:", err);
		});
	}
	/**
	* 从 ConnectorConfigInfo 推导 ConnectorInvokeKind。
	* 与 agent-ui 的 inferConnectorKind 保持一致；这里独立维护一份避免后端依赖前端。
	*/
	inferConnectorKind(config) {
		if (!config) return "oauthMCP";
		if (config.type === "cli") return "oauthCli";
		if (config.authMode === "token") return "tokenMCP";
		return "oauthMCP";
	}
};
require_common$2.__decorate([(0, import_common$1.Autowired)(import_common$1.Logger), require_common$2.__decorateMetadata("design:type", typeof (_ref$6 = typeof import_common$1.Logger !== "undefined" && import_common$1.Logger) === "function" ? _ref$6 : Object)], ConnectorProxyServer.prototype, "logger", void 0);
require_common$2.__decorate([(0, import_common$1.Autowired)(require_workbuddy_auth_product_coordinator.ConnectorMcpProxyToken), require_common$2.__decorateMetadata("design:type", Object)], ConnectorProxyServer.prototype, "proxy", void 0);
require_common$2.__decorate([
	(0, import_common$1.Autowired)(require_common$2.EventService),
	(0, import_common$1.Optional)(),
	require_common$2.__decorateMetadata("design:type", typeof (_ref2$3 = typeof require_common$2.EventService !== "undefined" && require_common$2.EventService) === "function" ? _ref2$3 : Object)
], ConnectorProxyServer.prototype, "eventService", void 0);
ConnectorProxyServer = require_common$2.__decorate([(0, import_common$1.Component)(require_workbuddy_auth_product_coordinator.ConnectorProxyServerToken)], ConnectorProxyServer);
function summarizeProxyCallArgsForLog(args) {
	const entries = Object.entries(args).slice(0, 10);
	return Object.fromEntries(entries.map(([key, value]) => [key, sanitizeProxyServerLogValue(value)]));
}
/**
* Test whether a concrete URI matches an RFC 6570 URI template (subset).
*
* Supports the same subset implemented in agent-cli's `McpResourceCatalogService`:
* - Basic substitution `{name}` matches any non-empty path segment value
* - Query continuation `{?p1,p2}` matches optional `?…` query string
*
* The match is anchored — the URI must equal the rendered template
* (regex anchors `^…$`) — so `starrocks://tables/foo` will NOT accidentally
* be claimed by template `starrocks://databases/{db}`.
*/
function matchesUriTemplate(uri, uriTemplate) {
	let working = uriTemplate;
	let hasQueryBlock = false;
	const queryMatch = working.match(/\{\?[^}]+\}/);
	if (queryMatch) {
		working = working.replace(queryMatch[0], "");
		hasQueryBlock = true;
	}
	let pattern = working.replace(/[.+^$|()\\[\]]/g, "\\$&").replace(/\{[^}?]+\}/g, "[^/?#]+");
	if (hasQueryBlock) pattern += "(?:\\?.*)?";
	return new RegExp(`^${pattern}$`).test(uri);
}
function formatProxyServerLog(message, meta) {
	return meta ? `${message} ${JSON.stringify(meta)}` : message;
}
function readHeader(req, name) {
	const value = req.headers[name.toLowerCase()];
	if (Array.isArray(value)) return value[0];
	return value;
}
function serializeProxyServerErrorForLog(error) {
	if (error instanceof Error) {
		const errorWithExtras = error;
		return {
			name: error.name,
			message: error.message,
			stack: error.stack,
			code: errorWithExtras.code,
			data: sanitizeProxyServerLogValue(errorWithExtras.data),
			cause: errorWithExtras.cause ? serializeProxyServerErrorCauseForLog(errorWithExtras.cause) : void 0
		};
	}
	return { message: String(error) };
}
function serializeProxyServerErrorCauseForLog(error) {
	if (error instanceof Error) return serializeProxyServerErrorForLog(error);
	return String(error);
}
function sanitizeProxyServerLogValue(value, depth = 0) {
	if (depth >= 3) return "[truncated]";
	if (value == null || typeof value === "number" || typeof value === "boolean" || typeof value === "string") return value;
	if (Array.isArray(value)) return value.slice(0, 10).map((item) => sanitizeProxyServerLogValue(item, depth + 1));
	if (value instanceof Error) return serializeProxyServerErrorForLog(value);
	if (typeof value === "object") {
		const entries = Object.entries(value).slice(0, 20);
		return Object.fromEntries(entries.map(([key, nested]) => [key, sanitizeProxyServerLogValue(nested, depth + 1)]));
	}
	return String(value);
}
//#endregion
//#region ../../packages/workbuddy-server/src/connector/connector-ui-adapter.ts
/**
* Connector UI 适配器
*
* 在 ConnectorService 标准接口之上，适配 UI 的消费模式：
* - connect() 对 OAuth 场景：保持 connecting 状态，后台等回调完成后自动重连
* - getStates() 对 OAuth 进行中的 connector：映射 unauthorized → connecting
*
* ConnectorService 保持标准语义（调一次返回一次结果），
* UI 的异步等待逻辑全部在这里处理。
*/
require_common$2.init_decorateMetadata();
require_common$2.init_decorate();
var _ref$5, _ConnectorUiAdapter;
var ConnectorUiAdapter = class ConnectorUiAdapter {
	static {
		_ConnectorUiAdapter = this;
	}
	logger;
	connectorService;
	mcpProxy;
	/** 正在等待 OAuth 回调的 connector 集合 */
	pendingOAuth = /* @__PURE__ */ new Set();
	/** 正在处理 OAuth 回调（token exchange + 重连）的 connector，防止重复处理 */
	processingOAuth = /* @__PURE__ */ new Set();
	/** OAuth 等待超时计时器，超时后自动清理 pendingOAuth */
	pendingOAuthTimeouts = /* @__PURE__ */ new Map();
	/**
	* 每个 connector 进入 pendingOAuth 的时间戳。
	*
	* 用于 configId=undefined 的失败广播场景：此时无法定位具体 connector，
	* 仅清理"进入 pending 已超过 60s"的 connector，避免误清并发 OAuth 中
	* 刚发起的其它 connector。
	*/
	pendingOAuthStartedAt = /* @__PURE__ */ new Map();
	static OAUTH_TIMEOUT_MS = 300 * 1e3;
	/**
	* configId=undefined 失败广播时的清理阈值：仅清理进入 pending 超 60s 的 connector。
	*
	* 用户重放 deep link 通常发生在前 30s 内，超过 60s 仍 pending 说明真有问题；
	* 并发 OAuth 中刚发起的 connector 不会被误清。
	*/
	static OAUTH_FALLBACK_CLEAN_THRESHOLD_MS = 60 * 1e3;
	constructor() {
		setTimeout(() => this.registerOAuthListener(), 0);
	}
	registerOAuthListener() {
		this.mcpProxy.onOAuthCompleted((result) => {
			const configId = result.configId;
			if (!configId) {
				this.cleanupStalePendingOAuth();
				return;
			}
			this.logger.info(`[ConnectorUiAdapter] OAuth completed for ${configId}, success=${result.success}`);
			if (!this.pendingOAuth.has(configId)) {
				this.logger.info(`[ConnectorUiAdapter] OAuth completed for ${configId} but not in pendingOAuth, ignoring`);
				return;
			}
			if (!result.success) {
				const rawId = require_workbuddy_auth_product_coordinator.toRawConfigId(configId);
				this.connectorService.markOAuthFailed(rawId, result.error ?? "access_denied");
				this.pendingOAuth.delete(configId);
				this.processingOAuth.delete(configId);
				this.clearOAuthTimeout(configId);
				return;
			}
			if (this.processingOAuth.has(configId)) return;
			this.processingOAuth.add(configId);
			const serviceConfigId = require_workbuddy_auth_product_coordinator.toRawConfigId(configId);
			(configId.startsWith("custom-mcp:") ? this.connectorService.reconnectMcpServer(configId.slice(11), { skipClearClientInfo: true }).then(() => ({ success: true })) : this.connectorService.connect(serviceConfigId, {
				skipClearClientInfo: true,
				silent: true
			})).then((result) => {
				if (result.success) this.logger.info(`[ConnectorUiAdapter] OAuth reconnect ${configId}: success`);
				else this.logger.warn(`[ConnectorUiAdapter] OAuth reconnect ${configId} failed: ${result.error}`);
				this.pendingOAuth.delete(configId);
				this.processingOAuth.delete(configId);
				this.clearOAuthTimeout(configId);
			}).catch((err) => {
				this.logger.error(`[ConnectorUiAdapter] OAuth reconnect ${configId} failed:`, err);
				this.pendingOAuth.delete(configId);
				this.processingOAuth.delete(configId);
				this.clearOAuthTimeout(configId);
			});
		});
	}
	/**
	* UI 发起连接
	*
	* 流程：
	* 1. 调 service.connect() 尝试连接
	* 2. 如果成功 → 直接返回 success
	* 3. 如果 needsAuth → 加入 pendingOAuth，返回 success（UI 保持 connecting 轮询）
	* 4. 如果其他错误 → 返回 error
	*
	* OAuth 完成后，proxyServer 的回调触发重连，UI 下次轮询 getStates() 就能看到 connected。
	*/
	async connect(configId, options) {
		const userInitiated = options?.userInitiated === true;
		const silent = options?.silent === true || !userInitiated;
		this.logger.info(`[ConnectorUiAdapter] connect(${configId}): START userInitiated=${userInitiated} silent=${silent}`);
		const result = await this.connectorService.connect(configId, {
			forceFreshAuth: userInitiated,
			silent
		});
		const proxyConfigId = require_workbuddy_auth_product_coordinator.toProxyConfigId(configId);
		if (result.success) {
			this.logger.info(`[ConnectorUiAdapter] connect(${configId}): SUCCESS — clearing pending oauth state`);
			this.pendingOAuth.delete(proxyConfigId);
			this.processingOAuth.delete(proxyConfigId);
			this.clearOAuthTimeout(proxyConfigId);
			return result;
		}
		const state = (await this.connectorService.getStates())[configId];
		if (state?.needsAuth || state?.status === "unauthorized") {
			if (silent) {
				this.logger.info(`[ConnectorUiAdapter] connect(${configId}): NEEDS_AUTH — silent, not entering pendingOAuth`);
				return {
					success: false,
					needsAuth: true,
					error: result.error
				};
			}
			this.pendingOAuth.add(proxyConfigId);
			this.startOAuthTimeout(proxyConfigId);
			this.logger.info(`[ConnectorUiAdapter] connect(${configId}): NEEDS_AUTH — added to pendingOAuth, waiting for callback`);
			return { success: true };
		}
		this.logger.info(`[ConnectorUiAdapter] connect(${configId}): FAILED — error=${result.error}`);
		return result;
	}
	/**
	* UI 发起自定义 MCP 重连
	*
	* 流程：
	* 1. 调 service.reconnectMcpServer() 发起连接（fire-and-forget）
	* 2. 检查 mcpProxy 的 clientEntry 状态
	* 3. 如果 needsAuth → 加入 pendingOAuth，等 OAuth 回调重连完成后 resolve
	* 4. 如果不需要 OAuth → 立即返回
	*
	* mcp-panel 的 handleReconnect 在 await 完成后会触发 loadServers 刷新 UI。
	*/
	async reconnectMcpServer(serverName) {
		const configId = `custom-mcp:${serverName}`;
		this.logger.info(`[ConnectorUiAdapter] reconnectMcpServer(${serverName}): START, configId=${configId}, caller=${(/* @__PURE__ */ new Error()).stack?.split("\n")[2]?.trim()}`);
		this.pendingOAuth.add(configId);
		this.startOAuthTimeout(configId);
		try {
			await this.connectorService.reconnectMcpServer(serverName);
		} catch (error) {
			this.pendingOAuth.delete(configId);
			this.processingOAuth.delete(configId);
			this.clearOAuthTimeout(configId);
			throw error;
		}
		this.logger.info(`[ConnectorUiAdapter] reconnectMcpServer(${serverName}): waiting for connected/oauth callback`);
		return new Promise((resolve) => {
			let resolved = false;
			const finish = (reason) => {
				if (resolved) return;
				resolved = true;
				clearInterval(checkInterval);
				clearTimeout(timeoutId);
				this.pendingOAuth.delete(configId);
				this.processingOAuth.delete(configId);
				this.clearOAuthTimeout(configId);
				this.logger.info(`[ConnectorUiAdapter] reconnectMcpServer(${serverName}): RESOLVED — ${reason}`);
				resolve();
			};
			const checkInterval = setInterval(() => {
				if (!this.pendingOAuth.has(configId)) {
					finish("pendingOAuth cleared");
					return;
				}
				const clientEntry = this.mcpProxy.getClientEntry(configId);
				this.logger.info(`[ConnectorUiAdapter] reconnectMcpServer(${serverName}): poll status=${clientEntry?.status}, needsAuth=${clientEntry?.needsAuth}`);
				if (clientEntry?.status === "connected") {
					finish("connected");
					return;
				}
				if (clientEntry && !clientEntry.needsAuth && clientEntry.status !== "connecting") finish(`terminal-${clientEntry.status}`);
			}, 500);
			const timeoutId = setTimeout(() => {
				this.logger.warn(`[ConnectorUiAdapter] reconnectMcpServer(${serverName}): TIMEOUT — OAuth callback did not arrive in ${_ConnectorUiAdapter.OAUTH_TIMEOUT_MS}ms`);
				finish("timeout");
			}, _ConnectorUiAdapter.OAUTH_TIMEOUT_MS);
		});
	}
	/**
	* UI 获取状态
	*
	* 对正在等 OAuth 回调的 connector，将 unauthorized/error 映射为 connecting，
	* 让 UI 继续显示 connecting 并保持轮询。
	*/
	async getStates() {
		const states = await this.connectorService.getStates();
		for (const proxyConfigId of this.pendingOAuth) {
			const stateKey = require_workbuddy_auth_product_coordinator.toRawConfigId(proxyConfigId);
			if (states[stateKey]) {
				const status = states[stateKey].status;
				if (status === "unauthorized" || status === "error") states[stateKey] = {
					...states[stateKey],
					status: "connecting"
				};
			}
		}
		return states;
	}
	/**
	* UI 主动取消进行中的连接。
	*
	* 处理 4 种取消场景（思源 `/project/2026-05/连接器授权取消功能方案`）：
	* 1. CLI auth spawn 中：委托 `connectorService.cancelConnect` → AbortController 中断 spawn
	* 2. CLI poll 中：委托 `connectorService.cancelConnect` → 中断 poll 循环
	* 3. OAuth 等待回调中：清 pendingOAuth / processingOAuth / pendingOAuthTimeouts，
	*    再委托 service 推 state 到 'disconnected'
	* 4. 已连接 / 未连接：noop，返回 success
	*
	* 注意：cancel 后 state 写 'disconnected' **不带 error**——
	* feedback/2026-05/skill-only token 模式 UI 状态管理经验：
	* 超时检测 toast 触发条件是 `connecting → non-connected + state.error 存在`，
	* 不带 error 就不会误弹超时 toast。
	*/
	async cancelConnect(configId) {
		this.logger.info(`[ConnectorUiAdapter] cancelConnect(${configId}): START`);
		const proxyConfigId = require_workbuddy_auth_product_coordinator.toProxyConfigId(configId);
		const wasPending = this.pendingOAuth.has(proxyConfigId);
		this.pendingOAuth.delete(proxyConfigId);
		this.processingOAuth.delete(proxyConfigId);
		this.clearOAuthTimeout(proxyConfigId);
		if (wasPending) this.logger.info(`[ConnectorUiAdapter] cancelConnect(${configId}): cleared pendingOAuth state`);
		return this.connectorService.cancelConnect(configId);
	}
	startOAuthTimeout(proxyConfigId) {
		this.clearOAuthTimeout(proxyConfigId);
		this.pendingOAuthStartedAt.set(proxyConfigId, Date.now());
		this.pendingOAuthTimeouts.set(proxyConfigId, setTimeout(() => {
			this.logger.info(`[ConnectorUiAdapter] OAuth timeout for ${proxyConfigId}, clearing pending state`);
			this.pendingOAuth.delete(proxyConfigId);
			this.processingOAuth.delete(proxyConfigId);
			this.pendingOAuthTimeouts.delete(proxyConfigId);
			this.pendingOAuthStartedAt.delete(proxyConfigId);
		}, _ConnectorUiAdapter.OAUTH_TIMEOUT_MS));
	}
	clearOAuthTimeout(proxyConfigId) {
		const timer = this.pendingOAuthTimeouts.get(proxyConfigId);
		if (timer) {
			clearTimeout(timer);
			this.pendingOAuthTimeouts.delete(proxyConfigId);
		}
		this.pendingOAuthStartedAt.delete(proxyConfigId);
	}
	/**
	* configId=undefined 的失败广播兜底清理。
	*
	* 仅清理进入 pending 已超过 OAUTH_FALLBACK_CLEAN_THRESHOLD_MS（60s）的 connector，
	* 避免误清并发 OAuth 中刚发起的其它 connector。这是失败广播，不会误清成功路径
	* （成功路径的 configId 一定有值，走上面的精确清理分支）。
	*/
	cleanupStalePendingOAuth() {
		const now = Date.now();
		const staleIds = [];
		for (const [proxyConfigId, startedAt] of this.pendingOAuthStartedAt) if (now - startedAt >= _ConnectorUiAdapter.OAUTH_FALLBACK_CLEAN_THRESHOLD_MS) staleIds.push(proxyConfigId);
		if (staleIds.length === 0) {
			this.logger.warn("[ConnectorUiAdapter] OAuth completed: unknown configId, no stale pendingOAuth to clean");
			return;
		}
		this.logger.warn(`[ConnectorUiAdapter] OAuth completed: unknown configId, cleaning stale pendingOAuth: ${staleIds.join(", ")}`);
		for (const proxyConfigId of staleIds) {
			this.pendingOAuth.delete(proxyConfigId);
			this.processingOAuth.delete(proxyConfigId);
			this.clearOAuthTimeout(proxyConfigId);
		}
	}
};
require_common$2.__decorate([(0, import_common$1.Autowired)(import_common$1.Logger), require_common$2.__decorateMetadata("design:type", typeof (_ref$5 = typeof import_common$1.Logger !== "undefined" && import_common$1.Logger) === "function" ? _ref$5 : Object)], ConnectorUiAdapter.prototype, "logger", void 0);
require_common$2.__decorate([(0, import_common$1.Autowired)(require_workbuddy_auth_product_coordinator.ConnectorServiceToken), require_common$2.__decorateMetadata("design:type", Object)], ConnectorUiAdapter.prototype, "connectorService", void 0);
require_common$2.__decorate([(0, import_common$1.Autowired)(require_workbuddy_auth_product_coordinator.ConnectorMcpProxyToken), require_common$2.__decorateMetadata("design:type", Object)], ConnectorUiAdapter.prototype, "mcpProxy", void 0);
ConnectorUiAdapter = _ConnectorUiAdapter = require_common$2.__decorate([(0, import_common$1.Component)(require_workbuddy_auth_product_coordinator.ConnectorUiAdapterToken), require_common$2.__decorateMetadata("design:paramtypes", [])], ConnectorUiAdapter);
//#endregion
//#region ../../packages/workbuddy-server/src/expert/cache-manager.ts
/**
* Expert manifest 磁盘缓存管理器
*
* 纯 Node FS 操作，无 CellJS 依赖。
* 构造时传入 cacheDir，Desktop 宿主负责拼接路径。
*/
var MANIFEST_FILE = "manifest.json";
var VERSION_FILE = "version.txt";
var METADATA_FILE = "metadata.json";
var CACHE_FORMAT_VERSION = 2;
var ExpertCacheManager = class {
	constructor(cacheDir) {
		this.cacheDir = cacheDir;
	}
	async getManifest() {
		const p = this.filePath(MANIFEST_FILE);
		if (!await this.exists(p)) return null;
		try {
			return JSON.parse(await fs.promises.readFile(p, "utf-8"));
		} catch {
			return null;
		}
	}
	async saveManifest(manifest, sourceSignature) {
		await this.ensureDir();
		await fs.promises.writeFile(this.filePath(MANIFEST_FILE), JSON.stringify(manifest, null, 2), "utf-8");
		await fs.promises.writeFile(this.filePath(VERSION_FILE), manifest.version, "utf-8");
		await this.saveMetadata({
			version: manifest.version,
			cachedAt: (/* @__PURE__ */ new Date()).toISOString(),
			sourceSignature,
			manifestHash: this.computeHash(manifest),
			cacheFormatVersion: CACHE_FORMAT_VERSION
		});
	}
	async getMetadata() {
		const p = this.filePath(METADATA_FILE);
		if (!await this.exists(p)) return null;
		try {
			return JSON.parse(await fs.promises.readFile(p, "utf-8"));
		} catch {
			return null;
		}
	}
	async isCompatible(sourceSignature) {
		return (await this.getMetadata())?.sourceSignature === sourceSignature;
	}
	async getCachedVersion() {
		const p = this.filePath(VERSION_FILE);
		if (!await this.exists(p)) return null;
		try {
			return (await fs.promises.readFile(p, "utf-8")).trim();
		} catch {
			return null;
		}
	}
	async getCachedHash() {
		const meta = await this.getMetadata();
		if (meta?.manifestHash) return meta.manifestHash;
		const manifest = await this.getManifest();
		return manifest ? this.computeHash(manifest) : null;
	}
	async clear() {
		try {
			if (await this.exists(this.cacheDir)) await fs.promises.rm(this.cacheDir, {
				recursive: true,
				force: true
			});
		} catch {}
	}
	computeHash(manifest) {
		return (0, crypto.createHash)("sha256").update(JSON.stringify(manifest)).digest("hex");
	}
	filePath(name) {
		return path.join(this.cacheDir, name);
	}
	async ensureDir() {
		await fs.promises.mkdir(this.cacheDir, { recursive: true });
	}
	async saveMetadata(meta) {
		await fs.promises.writeFile(this.filePath(METADATA_FILE), JSON.stringify(meta, null, 2), "utf-8");
	}
	async exists(p) {
		try {
			await fs.promises.access(p, fs.constants.F_OK);
			return true;
		} catch {
			return false;
		}
	}
};
//#endregion
//#region ../../packages/workbuddy-server/src/expert/manifest-provider.ts
/**
* Expert manifest provider.
*
* 职责：manifest 加载、磁盘缓存、后台更新。
* 作为策略注入到 ExpertService。
*/
require_common$2.init_decorate();
var CURRENT_SOURCE_SIGNATURE = JSON.stringify({
	baseUrl: require_workbuddy_auth_product_coordinator.EXPERT_CENTER_COS_CONFIG.baseUrl,
	manifestPath: require_workbuddy_auth_product_coordinator.EXPERT_CENTER_COS_CONFIG.manifestPath
});
var ExpertManifestProvider = class ExpertManifestProvider {
	cacheManager = new ExpertCacheManager(path.join(require_runtime_context.getWorkbuddyRuntimeUserDataDir(), "cache", "experts"));
	manifest = null;
	initPromise = null;
	async init() {
		if (this.initPromise) return this.initPromise;
		this.initPromise = this.doInit();
		return this.initPromise;
	}
	async getManifest() {
		await this.ensureManifestLoaded();
		return this.manifest;
	}
	async refresh(force = false) {
		if (force) await this.clearCache();
		else this.initPromise = null;
		await this.init();
	}
	async clearCache() {
		await this.cacheManager.clear();
		this.manifest = null;
		this.initPromise = null;
	}
	async doInit() {
		try {
			await this.loadManifestFromCache();
			if (this.manifest) await this.syncManifestBeforeReady();
			else await this.fetchAndCacheManifest();
			this.backgroundManifestUpdate();
		} catch (error) {
			console.error("[ExpertCenter] Init failed:", error);
		}
	}
	async loadManifestFromCache() {
		try {
			if (!await this.cacheManager.isCompatible(CURRENT_SOURCE_SIGNATURE)) {
				if (await this.cacheManager.getMetadata()) console.log("[ExpertCenter] Clearing incompatible cache");
				await this.cacheManager.clear();
				this.manifest = null;
				return;
			}
			const cachedManifest = await this.cacheManager.getManifest();
			if (cachedManifest) {
				this.manifest = cachedManifest;
				console.log("[ExpertCenter] Manifest loaded from cache:", {
					version: cachedManifest.version,
					expertCount: cachedManifest.experts?.length ?? 0
				});
			}
		} catch (error) {
			console.warn("[ExpertCenter] Failed to load manifest from cache:", error);
		}
	}
	async fetchAndCacheManifest() {
		const remoteManifest = await require_workbuddy_auth_product_coordinator.ExpertCloudService.fetchManifest();
		this.manifest = remoteManifest;
		await this.cacheManager.saveManifest(remoteManifest, CURRENT_SOURCE_SIGNATURE);
		console.log("[ExpertCenter] Manifest fetched from remote:", {
			version: remoteManifest.version,
			expertCount: remoteManifest.experts?.length ?? 0
		});
	}
	async syncManifestBeforeReady() {
		if (!this.manifest) return;
		try {
			const remoteManifest = await require_workbuddy_auth_product_coordinator.ExpertCloudService.fetchManifest();
			const currentHash = this.cacheManager.computeHash(this.manifest);
			const remoteHash = this.cacheManager.computeHash(remoteManifest);
			if (this.manifest.version === remoteManifest.version && currentHash === remoteHash) return;
			this.manifest = remoteManifest;
			await this.cacheManager.saveManifest(remoteManifest, CURRENT_SOURCE_SIGNATURE);
		} catch (error) {
			console.warn("[ExpertCenter] Foreground manifest sync failed, using cached:", error);
		}
	}
	backgroundManifestUpdate() {
		setImmediate(() => {
			this.doBackgroundManifestUpdate().catch(() => {});
		});
	}
	async doBackgroundManifestUpdate() {
		try {
			const remoteManifest = await require_workbuddy_auth_product_coordinator.ExpertCloudService.fetchManifest();
			const currentHash = this.manifest ? this.cacheManager.computeHash(this.manifest) : null;
			const cachedHash = await this.cacheManager.getCachedHash();
			const activeHash = currentHash ?? cachedHash;
			const remoteHash = this.cacheManager.computeHash(remoteManifest);
			if (!this.manifest || this.manifest.version !== remoteManifest.version || activeHash !== remoteHash) {
				this.manifest = remoteManifest;
				await this.cacheManager.saveManifest(remoteManifest, CURRENT_SOURCE_SIGNATURE);
			}
		} catch (error) {
			console.warn("[ExpertCenter] Background update failed:", error);
		}
	}
	async ensureManifestLoaded() {
		if (this.manifest) return;
		await this.init();
		if (this.manifest) return;
		try {
			await this.fetchAndCacheManifest();
		} catch (error) {
			console.error("[ExpertCenter] Manifest fallback fetch failed:", error);
		}
		if (!this.manifest) throw new Error("Expert center manifest not loaded");
	}
};
ExpertManifestProvider = require_common$2.__decorate([(0, import_common$1.Component)(require_workbuddy_auth_product_coordinator.DesktopManifestProviderToken)], ExpertManifestProvider);
//#endregion
//#region ../../packages/workbuddy-server/src/expert/resource-loader.ts
/**
* 专家中心资源加载器
*
* 迁移自 packages/plugin-chat/src/common/expert-center/expert-center-resource-loader.ts
*/
require_common$2.init_decorate();
/**
* 仅司内 / 仅司外的额外清单相对路径。
* 与 packages/plugin-chat/.../expert-center-resource-loader.ts 保持一致。
*
* 设计目的（issue #38308 后续）：
* - 公共 expert_center.json 不再包含「司内专属」「司外专属」专家
* - 司内专家放 internalExpert.json；司外专家放 externalExpert.json
* - 客户端三份并行拉取后合并，再交由前端按 enterpriseId 过滤可见性
*
* 老客户端不感知这两个文件，从公共清单也拉不到这些专家，自然不会泄漏。
*/
var SCOPED_MANIFEST_PATHS = ["/internalExpert.json", "/externalExpert.json"];
var ExpertCenterResourceLoader = class ExpertCenterResourceLoader {
	async fetchManifest() {
		const baseManifestUrl = require_workbuddy_auth_product_coordinator.buildExpertUrl(require_workbuddy_auth_product_coordinator.EXPERT_CENTER_COS_CONFIG.manifestPath);
		console.log("[ExpertCenterDebug][DesktopLoader] fetch manifest:", {
			baseUrl: require_workbuddy_auth_product_coordinator.EXPERT_CENTER_COS_CONFIG.baseUrl,
			manifestUrl: baseManifestUrl,
			scopedPaths: SCOPED_MANIFEST_PATHS
		});
		const [baseManifest, ...scopedResults] = await Promise.all([this.fetchBaseManifest(baseManifestUrl), ...SCOPED_MANIFEST_PATHS.map((p) => this.fetchScopedManifestSafe(p))]);
		const scopedManifests = scopedResults.filter((m) => m !== null);
		const merged = scopedManifests.length === 0 ? baseManifest : mergeExpertManifests(baseManifest, scopedManifests);
		console.log("[ExpertCenterDebug][DesktopLoader] fetchManifest:done", {
			manifestUrl: baseManifestUrl,
			version: merged.version,
			baseExperts: baseManifest.experts?.length ?? 0,
			scopedExperts: scopedManifests.map((m) => m.experts?.length ?? 0),
			mergedExperts: merged.experts?.length ?? 0,
			baseExpertIds: (baseManifest.experts ?? []).slice(0, 10).map((e) => e.id),
			scopedExpertIdsAll: scopedManifests.map((m) => (m.experts ?? []).map((e) => e.id)),
			mergedHasInternalSample: (merged.experts ?? []).some((e) => e.id === "TencentCloudPriceExpert"),
			mergedHasExternalSample: (merged.experts ?? []).some((e) => e.id === "ReportDistributionAgent")
		});
		return merged;
	}
	async fetchBaseManifest(url) {
		const response = await this.fetchWithTimeout(url);
		if (!response.ok) throw new Error(`Failed to fetch manifest: ${response.status}`);
		const manifest = await response.json();
		console.log("[ExpertCenterDebug][DesktopLoader] fetchBaseManifest:done", {
			url,
			status: response.status,
			version: manifest.version,
			experts: manifest.experts?.length ?? 0,
			categories: manifest.categories?.length ?? 0
		});
		return manifest;
	}
	async fetchScopedManifestSafe(relativePath) {
		const url = require_workbuddy_auth_product_coordinator.buildExpertUrl(relativePath);
		console.log("[ExpertCenterDebug][DesktopLoader] fetchScopedManifest:start", {
			relativePath,
			url
		});
		try {
			const response = await this.fetchWithTimeout(url);
			if (!response.ok) {
				console.warn("[ExpertCenterDebug][DesktopLoader] fetchScopedManifest non-ok:", {
					relativePath,
					url,
					status: response.status
				});
				return null;
			}
			const manifest = await response.json();
			console.log("[ExpertCenterDebug][DesktopLoader] fetchScopedManifest:done", {
				relativePath,
				url,
				status: response.status,
				version: manifest.version,
				experts: manifest.experts?.length ?? 0,
				categories: manifest.categories?.length ?? 0,
				expertIds: (manifest.experts ?? []).map((e) => e.id),
				categoryIds: (manifest.categories ?? []).map((c) => c.id)
			});
			return manifest;
		} catch (error) {
			console.warn("[ExpertCenterDebug][DesktopLoader] fetchScopedManifest failed (silent fallback):", {
				relativePath,
				url,
				error: error instanceof Error ? error.message : String(error)
			});
			return null;
		}
	}
	async fetchPrompt(promptPath) {
		const url = require_workbuddy_auth_product_coordinator.buildExpertUrl(promptPath);
		console.log("[ExpertCenterDebug][DesktopLoader] fetch prompt:", {
			promptPath,
			url
		});
		const response = await this.fetchWithTimeout(url);
		if (!response.ok) throw new Error(`Failed to fetch prompt: ${response.status} - ${url}`);
		return await response.text();
	}
	async fetchPromptWithRetry(promptPath) {
		const { maxRetries, retryDelay } = require_workbuddy_auth_product_coordinator.EXPERT_CENTER_COS_CONFIG.download;
		let lastError;
		for (let attempt = 0; attempt <= maxRetries; attempt++) try {
			return await this.fetchPrompt(promptPath);
		} catch (error) {
			lastError = error;
			console.warn(`[ExpertCenter] Prompt download failed (attempt ${attempt + 1}/${maxRetries + 1}):`, error);
			if (attempt < maxRetries) await this.sleep(retryDelay);
		}
		throw lastError instanceof Error ? lastError : /* @__PURE__ */ new Error(`Failed to fetch prompt: ${promptPath}`);
	}
	async fetchPromptsBatch(tasks, onProgress) {
		const results = /* @__PURE__ */ new Map();
		const total = tasks.length;
		if (!total) {
			onProgress?.(0, 0, 0);
			return results;
		}
		const { batchConcurrency } = require_workbuddy_auth_product_coordinator.EXPERT_CENTER_COS_CONFIG.download;
		let completed = 0;
		let failed = 0;
		for (let i = 0; i < tasks.length; i += batchConcurrency) {
			const batch = tasks.slice(i, i + batchConcurrency);
			const settled = await Promise.allSettled(batch.map(async (task) => {
				const content = await this.fetchPromptWithRetry(task.path);
				return {
					...task,
					content
				};
			}));
			for (const item of settled) if (item.status === "fulfilled") {
				const value = item.value;
				results.set(`${value.expertId}_${value.locale}`, value);
				completed += 1;
			} else {
				failed += 1;
				console.warn("[ExpertCenter] Batch download failed:", item.reason);
			}
			onProgress?.(completed, total, failed);
		}
		return results;
	}
	async fetchWithTimeout(url, timeout = require_workbuddy_auth_product_coordinator.EXPERT_CENTER_COS_CONFIG.download.timeout) {
		const controller = new AbortController();
		const timer = setTimeout(() => controller.abort(), timeout);
		try {
			return await fetch(url, {
				signal: controller.signal,
				headers: { Accept: "application/json, text/plain, text/markdown" }
			});
		} catch (error) {
			if (error.name === "AbortError") throw new Error(`Request timeout after ${timeout}ms: ${url}`);
			throw error;
		} finally {
			clearTimeout(timer);
		}
	}
	sleep(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
};
ExpertCenterResourceLoader = require_common$2.__decorate([(0, import_common$1.Component)(require_workbuddy_auth_product_coordinator.ExpertCenterResourceLoaderToken)], ExpertCenterResourceLoader);
/**
* 按 id 去重合并多份额外清单到公共清单上。
* 合并规则：base 先入 Map，overlay 依次覆盖同 id 项，因此实际效果是 **overlay 覆盖 base**。
* 与 plugin-chat 镜像保持语义一致。
*/
function mergeExpertManifests(base, overlays) {
	const categoryMap = /* @__PURE__ */ new Map();
	for (const c of base.categories ?? []) categoryMap.set(c.id, c);
	for (const overlay of overlays) for (const c of overlay.categories ?? []) categoryMap.set(c.id, c);
	const expertMap = /* @__PURE__ */ new Map();
	for (const e of base.experts ?? []) expertMap.set(e.id, e);
	for (const overlay of overlays) for (const e of overlay.experts ?? []) expertMap.set(e.id, e);
	const mergedExperts = Array.from(expertMap.values());
	const mergedCategories = Array.from(categoryMap.values());
	const allManifests = [base, ...overlays];
	const newestVersion = allManifests.map((m) => m.version ?? "").reduce((a, b) => a >= b ? a : b, "");
	const newestLastUpdated = allManifests.map((m) => typeof m.lastUpdated === "string" ? m.lastUpdated : "").reduce((a, b) => a >= b ? a : b, "");
	return {
		...base,
		categories: mergedCategories,
		experts: mergedExperts,
		statistics: {
			totalExperts: mergedExperts.length,
			totalCategories: mergedCategories.length
		},
		version: newestVersion || base.version,
		lastUpdated: newestLastUpdated || base.lastUpdated
	};
}
//#endregion
//#region ../../packages/workbuddy-server/src/expert/history-service.ts
require_common$2.init_decorateMetadata();
require_common$2.init_decorate();
var ExpertHistoryService = class ExpertHistoryService {
	cache;
	storage;
	_maxExpertsPerSession = 5;
	initPromise = null;
	async getRecentExperts(sessionId) {
		await this.ensureInitialized();
		return this.cache.getRecentExperts(sessionId);
	}
	async addExpert(sessionId, expert) {
		await this.ensureInitialized();
		this.cache.addExpert(sessionId, expert, this._maxExpertsPerSession);
		this.persistToStorage();
		console.log(`[ExpertHistory] Added expert '${expert.name}' (${expert.id}) to scoped history`);
	}
	async removeExpert(sessionId, expertId) {
		await this.ensureInitialized();
		if (this.cache.removeExpert(sessionId, expertId)) {
			this.persistToStorage();
			console.log(`[ExpertHistory] Removed expert ${expertId} from scoped history`);
		}
	}
	async clearHistory(sessionId) {
		await this.ensureInitialized();
		if (this.cache.clearHistory(sessionId)) {
			this.persistToStorage();
			console.log("[ExpertHistory] Cleared scoped history");
		}
	}
	async flush() {
		await this.storage.flush();
	}
	async ensureInitialized() {
		if (this.cache.isInitialized()) return;
		if (!this.initPromise) this.initPromise = this.doInitialize();
		await this.initPromise;
	}
	async doInitialize() {
		try {
			console.log("[ExpertHistory] Initializing service...");
			const loadedData = await this.storage.load();
			const { data, migrated } = this.migrateToSharedHistory(loadedData);
			this.cache.initFromData(data);
			if (migrated && data) {
				this.storage.saveAsync(data);
				console.log("[ExpertHistory] Migrated legacy session-based history to shared history");
			}
			console.log("[ExpertHistory] Service initialized successfully");
		} catch (error) {
			console.error("[ExpertHistory] Failed to initialize:", error);
			this.cache.initFromData(null);
		}
	}
	migrateToSharedHistory(data) {
		if (!data) return {
			data: null,
			migrated: false
		};
		const sessionEntries = Object.entries(data.sessions ?? {});
		if (sessionEntries.length === 0) return {
			data,
			migrated: false
		};
		if (sessionEntries.length === 1 && sessionEntries[0][0] === "__global__") return {
			data,
			migrated: false
		};
		const deduped = /* @__PURE__ */ new Map();
		for (const experts of sessionEntries.map(([, experts]) => experts)) for (const expert of experts ?? []) {
			if (!expert?.id) continue;
			const existing = deduped.get(expert.id);
			if (!existing || (expert.summonedAt ?? 0) >= (existing.summonedAt ?? 0)) deduped.set(expert.id, expert);
		}
		const mergedExperts = Array.from(deduped.values()).sort((a, b) => (b.summonedAt ?? 0) - (a.summonedAt ?? 0)).slice(0, this._maxExpertsPerSession);
		return {
			data: {
				version: data.version,
				sessions: mergedExperts.length > 0 ? { [require_workbuddy_auth_product_coordinator.SHARED_HISTORY_KEY]: mergedExperts } : {},
				lastUpdated: Date.now()
			},
			migrated: true
		};
	}
	persistToStorage() {
		const data = this.cache.getAllData();
		this.storage.saveAsync(data);
	}
};
require_common$2.__decorate([(0, import_common$1.Autowired)(require_workbuddy_auth_product_coordinator.ExpertHistoryCacheToken), require_common$2.__decorateMetadata("design:type", Object)], ExpertHistoryService.prototype, "cache", void 0);
require_common$2.__decorate([(0, import_common$1.Autowired)(require_workbuddy_auth_product_coordinator.ExpertHistoryStorageToken), require_common$2.__decorateMetadata("design:type", Object)], ExpertHistoryService.prototype, "storage", void 0);
ExpertHistoryService = require_common$2.__decorate([(0, import_common$1.Component)(require_workbuddy_auth_product_coordinator.ExpertHistoryServiceToken)], ExpertHistoryService);
//#endregion
//#region ../../packages/workbuddy-server/src/expert/history-storage.ts
require_common$2.init_decorateMetadata();
require_common$2.init_decorate();
var _ExpertHistoryStorage;
var ExpertHistoryStorage = _ExpertHistoryStorage = class ExpertHistoryStorage {
	storagePath;
	writeTimer = null;
	pendingData = null;
	writeDebounceMs = 500;
	isWriting = false;
	constructor() {
		const storageDir = node_path.join(require_runtime_context.getWorkbuddyRuntimeUserDataDir(), "data");
		this.storagePath = node_path.join(storageDir, require_workbuddy_auth_product_coordinator.DEFAULT_STORAGE_FILE);
		this.initSync(storageDir);
	}
	initSync(storageDir) {
		try {
			if (!node_fs.existsSync(storageDir)) node_fs.mkdirSync(storageDir, { recursive: true });
			if (!node_fs.existsSync(this.storagePath)) {
				const emptyData = _ExpertHistoryStorage.createEmptyData();
				node_fs.writeFileSync(this.storagePath, JSON.stringify(emptyData, null, 2));
			}
		} catch (e) {
			console.warn("[ExpertHistory] Failed to init storage sync:", e);
		}
	}
	configure(options) {
		if (options.writeDebounceMs !== void 0 && options.writeDebounceMs >= 0) this.writeDebounceMs = options.writeDebounceMs;
	}
	async load() {
		try {
			if (!await this.exists(this.storagePath)) {
				console.log("[ExpertHistory] Storage file does not exist, starting fresh");
				return null;
			}
			const content = await node_fs.promises.readFile(this.storagePath, "utf-8");
			const data = JSON.parse(content);
			if (!this.isValidData(data)) {
				console.warn("[ExpertHistory] Invalid data format, starting fresh");
				return null;
			}
			return this.loadLegacyStorageWhenCurrentEmpty(data);
		} catch (error) {
			if (error instanceof SyntaxError) console.warn("[ExpertHistory] Failed to parse storage file, starting fresh:", error.message);
			else console.warn("[ExpertHistory] Failed to load from storage:", error);
			return null;
		}
	}
	saveAsync(data) {
		this.pendingData = data;
		if (this.writeTimer) clearTimeout(this.writeTimer);
		this.writeTimer = setTimeout(() => {
			this.flushPendingWrite();
		}, this.writeDebounceMs);
	}
	async flush() {
		if (this.writeTimer) {
			clearTimeout(this.writeTimer);
			this.writeTimer = null;
		}
		if (this.pendingData) {
			const dataToWrite = this.pendingData;
			this.pendingData = null;
			await this.doWrite(dataToWrite);
		}
	}
	async clear() {
		try {
			if (await this.exists(this.storagePath)) {
				await node_fs.promises.unlink(this.storagePath);
				console.log("[ExpertHistory] Storage file cleared");
			}
		} catch (error) {
			console.error("[ExpertHistory] Failed to clear storage:", error);
		}
	}
	getStoragePath() {
		return this.storagePath;
	}
	async flushPendingWrite() {
		this.writeTimer = null;
		if (!this.pendingData) return;
		const dataToWrite = this.pendingData;
		this.pendingData = null;
		await this.doWrite(dataToWrite);
	}
	async doWrite(data) {
		if (this.isWriting) {
			this.pendingData = data;
			return;
		}
		this.isWriting = true;
		try {
			const dir = node_path.dirname(this.storagePath);
			await node_fs.promises.mkdir(dir, { recursive: true });
			const tempPath = `${this.storagePath}.tmp`;
			const content = JSON.stringify(data, null, 2);
			await node_fs.promises.writeFile(tempPath, content, "utf-8");
			await node_fs.promises.rename(tempPath, this.storagePath);
			console.log(`[ExpertHistory] Saved ${Object.keys(data.sessions).length} sessions to storage`);
		} catch (error) {
			console.error("[ExpertHistory] Failed to save to storage:", error);
		} finally {
			this.isWriting = false;
			if (this.pendingData) {
				const nextData = this.pendingData;
				this.pendingData = null;
				setImmediate(() => {
					this.doWrite(nextData);
				});
			}
		}
	}
	async exists(filePath) {
		try {
			await node_fs.promises.access(filePath, node_fs.constants.F_OK);
			return true;
		} catch {
			return false;
		}
	}
	hasHistory(data) {
		return Object.values(data.sessions ?? {}).some((experts) => Array.isArray(experts) && experts.length > 0);
	}
	getLegacyStorageCandidates() {
		const userDataDir = require_runtime_context.getWorkbuddyRuntimeUserDataDir();
		if (node_path.basename(userDataDir) !== "app") return [];
		const configDir = node_path.dirname(userDataDir);
		return Array.from(new Set([node_path.join(configDir, ".workbuddy", require_workbuddy_auth_product_coordinator.DEFAULT_STORAGE_FILE), node_path.join(configDir, require_workbuddy_auth_product_coordinator.DEFAULT_STORAGE_FILE)])).filter((candidate) => candidate !== this.storagePath);
	}
	async readLegacyStorage(candidate) {
		try {
			if (!await this.exists(candidate)) return null;
			const content = await node_fs.promises.readFile(candidate, "utf-8");
			const data = JSON.parse(content);
			return this.isValidData(data) && this.hasHistory(data) ? data : null;
		} catch {
			return null;
		}
	}
	async loadLegacyStorageWhenCurrentEmpty(data) {
		if (this.hasHistory(data)) return data;
		for (const candidate of this.getLegacyStorageCandidates()) {
			const legacyData = await this.readLegacyStorage(candidate);
			if (legacyData) {
				await this.doWrite(legacyData);
				return legacyData;
			}
		}
		return data;
	}
	isValidData(data) {
		if (!data || typeof data !== "object") return false;
		const d = data;
		if (typeof d.version !== "number") return false;
		if (!d.sessions || typeof d.sessions !== "object") return false;
		if (typeof d.lastUpdated !== "number") return false;
		return true;
	}
	static createEmptyData() {
		return {
			version: 1,
			sessions: {},
			lastUpdated: Date.now()
		};
	}
	async dispose() {
		console.log("[ExpertHistory] Disposing storage...");
		if (this.writeTimer) {
			clearTimeout(this.writeTimer);
			this.writeTimer = null;
		}
		if (this.pendingData) {
			try {
				await this.doWrite(this.pendingData);
			} catch (e) {
				console.warn("[ExpertHistory] Failed to flush pending data on dispose:", e);
			}
			this.pendingData = null;
		}
		console.log("[ExpertHistory] Storage disposed successfully");
	}
};
ExpertHistoryStorage = _ExpertHistoryStorage = require_common$2.__decorate([(0, import_common$1.Component)(require_workbuddy_auth_product_coordinator.ExpertHistoryStorageToken), require_common$2.__decorateMetadata("design:paramtypes", [])], ExpertHistoryStorage);
//#endregion
//#region ../../packages/workbuddy-server/src/expert/history-cache.ts
require_common$2.init_decorate();
var ExpertHistoryCache = class ExpertHistoryCache {
	data = {
		version: 1,
		sessions: {},
		lastUpdated: Date.now()
	};
	initialized = false;
	getRecentExperts(sessionId) {
		const sessionKey = this.resolveSessionKey(sessionId);
		return this.resolveExpertsForRead(sessionKey).slice();
	}
	addExpert(sessionId, expert, maxCount) {
		const sessionKey = this.resolveSessionKey(sessionId);
		const experts = this.resolveExpertsForWrite(sessionKey);
		const existingExpert = experts.find((e) => e.id === expert.id);
		const filteredExperts = experts.filter((e) => e.id !== expert.id);
		const newExperts = [{
			...existingExpert,
			...expert,
			isCustomExpert: expert.isCustomExpert ?? existingExpert?.isCustomExpert,
			summonedAt: Date.now()
		}, ...filteredExperts].slice(0, maxCount);
		this.data.sessions = {
			...this.data.sessions,
			[sessionKey]: newExperts
		};
		this.data.lastUpdated = Date.now();
		return newExperts.slice();
	}
	removeExpert(sessionId, expertId) {
		const sessionKey = this.resolveSessionKey(sessionId);
		if (sessionKey === "__global__") return this.removeExpertFromAllScopes(expertId);
		return this.removeExpertFromScope(sessionKey, expertId);
	}
	clearHistory(sessionId) {
		const sessionKey = this.resolveSessionKey(sessionId);
		if (this.resolveExpertsForRead(sessionKey).length === 0) return false;
		const nextSessions = { ...this.data.sessions };
		if (sessionKey === "__global__") delete nextSessions[sessionKey];
		else nextSessions[sessionKey] = [];
		this.data.sessions = nextSessions;
		this.data.lastUpdated = Date.now();
		return true;
	}
	resolveSessionKey(sessionId) {
		return (typeof sessionId === "string" ? sessionId.trim() : "") || "__global__";
	}
	hasScope(sessionKey) {
		return Object.prototype.hasOwnProperty.call(this.data.sessions, sessionKey);
	}
	resolveExpertsForRead(sessionKey) {
		if (this.hasScope(sessionKey)) return this.data.sessions[sessionKey] ?? [];
		if (sessionKey !== "__global__") return this.data.sessions["__global__"] ?? [];
		return [];
	}
	resolveExpertsForWrite(sessionKey) {
		if (this.hasScope(sessionKey)) return this.data.sessions[sessionKey] ?? [];
		if (sessionKey !== "__global__") return this.data.sessions["__global__"] ?? [];
		return [];
	}
	removeExpertFromScope(sessionKey, expertId) {
		const experts = this.data.sessions[sessionKey];
		if (!experts || experts.length === 0) {
			if (this.hasScope(sessionKey) || sessionKey === "__global__") return false;
			const legacyExperts = this.data.sessions["__global__"] ?? [];
			const filteredLegacyExperts = legacyExperts.filter((e) => e.id !== expertId);
			if (filteredLegacyExperts.length === legacyExperts.length) return false;
			this.data.sessions = {
				...this.data.sessions,
				[sessionKey]: filteredLegacyExperts
			};
			this.data.lastUpdated = Date.now();
			return true;
		}
		const filteredExperts = experts.filter((e) => e.id !== expertId);
		if (filteredExperts.length === experts.length) return false;
		const nextSessions = { ...this.data.sessions };
		if (filteredExperts.length > 0) nextSessions[sessionKey] = filteredExperts;
		else if (sessionKey === "__global__") delete nextSessions[sessionKey];
		else nextSessions[sessionKey] = [];
		this.data.sessions = nextSessions;
		this.data.lastUpdated = Date.now();
		return true;
	}
	removeExpertFromAllScopes(expertId) {
		let changed = false;
		const nextSessions = {};
		for (const [sessionKey, experts] of Object.entries(this.data.sessions)) {
			const filteredExperts = experts.filter((e) => e.id !== expertId);
			if (filteredExperts.length !== experts.length) changed = true;
			if (filteredExperts.length > 0) nextSessions[sessionKey] = filteredExperts;
		}
		if (!changed) return false;
		this.data.sessions = nextSessions;
		this.data.lastUpdated = Date.now();
		return true;
	}
	getAllData() {
		const sessions = Object.fromEntries(Object.entries(this.data.sessions).map(([key, experts]) => [key, experts.slice()]));
		return {
			...this.data,
			sessions
		};
	}
	initFromData(data) {
		if (this.initialized) return;
		if (data) this.data = {
			version: data.version ?? 1,
			sessions: data.sessions ?? {},
			lastUpdated: data.lastUpdated ?? Date.now()
		};
		this.initialized = true;
	}
	isInitialized() {
		return this.initialized;
	}
	static createEmptyData() {
		return {
			version: 1,
			sessions: {},
			lastUpdated: Date.now()
		};
	}
};
ExpertHistoryCache = require_common$2.__decorate([(0, import_common$1.Component)(require_workbuddy_auth_product_coordinator.ExpertHistoryCacheToken)], ExpertHistoryCache);
//#endregion
//#region ../../packages/workbuddy-server/src/expert/plugin-service.ts
/**
* 专家 Plugin 服务
*
* 核心职责：
* 1. 下载 tar.gz/zip → 解压到 ~/.workbuddy/plugins/marketplaces/experts/plugins/{id}/
* 2. 更新 experts marketplace.json（让 DirectoryMarketplace 能扫描到专家）
* 3. 清理历史遗留的 plugin 目录 settings.json 中的 agent 覆盖，避免全局污染 default agent
* 4. 提供 switchExpertPluginForSession：通过 sidecar 查询 session acpEndpoint，
*    调用 CLI 的 /api/v1/plugins/switch 控制专家 plugin 在该 session 上原子切换
*
* 本地目录结构：
*   ~/.workbuddy/plugins/marketplaces/experts/
*   ├── .codebuddy-plugin/
*   │   └── marketplace.json         ← 自动生成/更新
*   └── plugins/
*       ├── TradingAgentTeam/
*       │   ├── .workbuddy-plugin/
*       │   │   └── plugin.json
*       │   ├── settings.json        ← 历史遗留的 agent 覆盖文件，启动时会清理
*       │   ├── agents/
*       │   └── skills/
*       └── InternalCommsExpert/
*           └── ...
*/
var import_tar = /* @__PURE__ */ require_chunk.__toESM(require_workbuddy_auth_product_coordinator.require_tar());
require_common$2.init_decorateMetadata();
require_common$2.init_decorate();
/** Plugin 清单文件查找目录（按优先级） */
var PLUGIN_METADATA_DIRS = [".codebuddy-plugin", ".workbuddy-plugin"];
var PLUGIN_MANIFEST_FILE = "plugin.json";
var PLUGIN_SETTINGS_FILE = "settings.json";
var expertPluginLog = {
	log: (...args) => console.log(...args),
	warn: (...args) => console.warn(...args),
	error: (...args) => console.error(...args)
};
/** 专家 marketplace 名称 */
var EXPERTS_MARKETPLACE = "experts";
var MAX_CUSTOM_EXPERT_AVATAR_BYTES = 5 * 1024 * 1024;
var expertMarketLogger = require_logger.createWorkbuddyScopedLogger("expert-market");
var DEFAULT_EXPERT_PLUGIN_HOST_CAPABILITIES = {
	getConfigDir: () => require_runtime_context.getWorkbuddyRuntimeConfigDir(),
	resolveSessionHttpBase: async () => void 0
};
/** 异步判断路径是否存在 */
async function pathExists(p) {
	try {
		await fs_promises.access(p);
		return true;
	} catch {
		return false;
	}
}
function isRecord(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
/** 将 { zh: [...], en: [...] } 旧格式兼容为 [{ zh, en }] 列表。 */
function normalizeLocalizedManifestItems(value) {
	if (value === void 0) return;
	if (Array.isArray(value)) return value;
	if (!isRecord(value)) return [];
	const zhItems = Array.isArray(value.zh) ? value.zh : [];
	const enItems = Array.isArray(value.en) ? value.en : [];
	const length = Math.max(zhItems.length, enItems.length);
	if (length === 0) return [];
	return Array.from({ length }, (_, index) => {
		const item = {};
		if (zhItems[index] !== void 0) item.zh = zhItems[index];
		if (enItems[index] !== void 0) item.en = enItems[index];
		return item;
	});
}
/** 将外部 manifest 数组字段归一化；缺失保持缺失，非数组脏数据降级为空数组。 */
function normalizeManifestItems(value) {
	if (value === void 0) return;
	return Array.isArray(value) ? value : [];
}
function readWorkbuddyMeta(config) {
	const raw = config["x-workbuddy"];
	return isRecord(raw) ? raw : void 0;
}
function resolveLocalized(value, locale) {
	if (typeof value === "string") return value;
	if (isRecord(value)) {
		const localized = value[locale] ?? value.zh ?? value.en;
		return typeof localized === "string" ? localized : void 0;
	}
}
function localizeWorkbuddyMeta(meta, locale) {
	const tokenSchema = meta.auth?.tokenSchema;
	const localizedTokenSchema = tokenSchema ? {
		...tokenSchema,
		title: resolveLocalized(tokenSchema.title, locale),
		description: resolveLocalized(tokenSchema.description, locale),
		docLabel: resolveLocalized(tokenSchema.docLabel, locale),
		fields: (tokenSchema.fields ?? []).map((field) => ({
			...field,
			label: resolveLocalized(field.label, locale) ?? field.key,
			placeholder: resolveLocalized(field.placeholder, locale),
			description: resolveLocalized(field.description, locale)
		}))
	} : tokenSchema;
	return {
		...meta,
		displayName: resolveLocalized(meta.displayName, locale),
		description: resolveLocalized(meta.description, locale),
		...meta.auth ? { auth: {
			...meta.auth,
			tokenSchema: localizedTokenSchema
		} } : {}
	};
}
var ExpertPluginService = class ExpertPluginService {
	constructor() {
		this.removePersistedGeneratedAgentOverrides().catch(() => {});
	}
	activeExperts = /* @__PURE__ */ new Set();
	downloadingExperts = /* @__PURE__ */ new Map();
	/** expertId → bundleName（plugin 字段值）映射，用于定位本地 plugin 目录 */
	expertBundleMap = /* @__PURE__ */ new Map();
	/**
	* 自定义专家 DTO 缓存：dirName → { mtimeMs, dto }。
	* 按 plugin.json mtime 失效，跨 userId 共享，避免切 tab 反复全量扫盘 + base64 头像编码阻塞事件循环。
	*/
	customExpertDtoCache = /* @__PURE__ */ new Map();
	/** scanCustomExperts in-flight 去重：userKey → 正在执行的 Promise，合并并发重复调用。 */
	scanCustomExpertsInflight = /* @__PURE__ */ new Map();
	/** 每个 httpBase 只需注册一次 experts marketplace，用此 Set 做去重 */
	marketplaceRegistered = /* @__PURE__ */ new Set();
	hostCapabilities = DEFAULT_EXPERT_PLUGIN_HOST_CAPABILITIES;
	setHostCapabilities(capabilities) {
		this.hostCapabilities = {
			...this.hostCapabilities,
			...capabilities
		};
	}
	getConfigDir() {
		return this.hostCapabilities.getConfigDir();
	}
	async activateExpert(expertId, pluginName, updatedAt, marketplace, downloadUrl) {
		let bundleName = pluginName;
		try {
			bundleName = bundleName || await this.lookupBundleNameFromManifestCache(expertId) || this.toKebabCase(expertId);
			this.expertBundleMap.set(expertId, bundleName);
			let localPath;
			if (marketplace) localPath = this.getPluginDirForMarketplace(bundleName, marketplace);
			else localPath = await this.ensureDownloaded(bundleName, updatedAt, downloadUrl);
			const manifest = await this.readPluginManifestAsync(localPath);
			if (!manifest) return {
				success: false,
				expertType: "skill",
				error: `Failed to read plugin.json for expert: ${expertId}`
			};
			const expertType = manifest.expertType || "skill";
			const agentName = await this.resolveExpertAgentName(localPath, manifest, expertId);
			await this.updateMarketplaceManifest(bundleName, marketplace);
			await this.removeGeneratedAgentOverrideFile(localPath);
			const pluginRegisteredName = manifest.name;
			this.activeExperts.add(expertId);
			console.log(`[ExpertPluginService] Expert activated: ${expertId}`, {
				expertType,
				agentName,
				pluginRegisteredName,
				localPath
			});
			return {
				success: true,
				expertType,
				agentName,
				localPath,
				pluginRegisteredName
			};
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			console.error("[ExpertPluginService] Failed to activate expert:", {
				expertId,
				bundleName,
				pluginName,
				updatedAt,
				error
			});
			return {
				success: false,
				expertType: "skill",
				error: message
			};
		}
	}
	/**
	* 删除历史生成的 settings.json（仅清理纯 `{ agent: string }` 覆盖文件）。
	*
	* 这些文件会让 plugin-loader-manager 在 rebuildAgents 时把旧专家 agent
	* 全局 patch 到 default agent，导致会话外串脏。
	*/
	async removeGeneratedAgentOverrideFile(pluginDir) {
		try {
			const settingsPath = path.join(pluginDir, PLUGIN_SETTINGS_FILE);
			const payload = await this.readGeneratedAgentOverride(settingsPath);
			if (!payload) return;
			await fs_promises.unlink(settingsPath);
			console.log(`[ExpertPluginService] Removed stale expert settings.json: ${settingsPath}`, payload);
		} catch (error) {
			console.warn(`[ExpertPluginService] Failed to remove settings.json at ${pluginDir}:`, error);
		}
	}
	async deactivateExpert(expertId) {
		this.activeExperts.delete(expertId);
		const pluginDir = await this.getExpertLocalPath(expertId);
		if (pluginDir) await this.removeGeneratedAgentOverrideFile(pluginDir);
		console.log(`[ExpertPluginService] Expert deactivated: ${expertId}`);
	}
	/**
	* 原子切换专家 plugin：在一次 HTTP 调用中 disable 旧 + enable 新，只触发一次 rebuildAgents。
	* 如果 plugin 未变化但专家对应的 agent 变化，也会下发 session 级 agent override。
	*
	* @param sessionId  目标 session 的 id
	* @param disablePluginName  要 disable 的 plugin 名称（可为 undefined 表示无需 disable）
	* @param enablePluginName   要 enable 的 plugin 名称（可为 undefined 表示无需 enable）
	* @param agentName  当前 session 应绑定的专家 agent 名称（可为 undefined 表示清除 override）
	* @param sourcePluginId 供 AgentManager 定位 plugin 的 "name@marketplace"；未传则用 enable 字段
	* @param internalModelRequestHeaders 要下发给 CLI 的内部模型请求临时 headers
	*/
	async switchExpertPluginForSession(sessionId, disablePluginName, enablePluginName, agentName, sourcePluginId, internalModelRequestHeaders) {
		if (!sessionId) {
			console.warn("[ExpertPluginService] switchExpertPluginForSession: sessionId required");
			return false;
		}
		if (!disablePluginName && !enablePluginName && !agentName && !sourcePluginId && internalModelRequestHeaders === void 0) return false;
		const httpBase = await this.resolveSessionHttpBase(sessionId);
		if (!httpBase) {
			console.warn(`[ExpertPluginService] plugin switch skipped: no acpEndpoint sessionId=${sessionId}, disable=${disablePluginName || "none"}, enable=${enablePluginName || "none"}, agent=${agentName || "none"}`);
			return false;
		}
		await this.ensureExpertsMarketplaceRegistered(httpBase);
		const url = `${httpBase}/api/v1/plugins/switch`;
		const payload = { persist: false };
		if (disablePluginName) payload.disable = `${disablePluginName}@${await this.resolvePluginMarketplace(disablePluginName)}`;
		if (enablePluginName) payload.enable = `${enablePluginName}@${await this.resolvePluginMarketplace(enablePluginName)}`;
		if (agentName) payload.agentName = agentName;
		const resolvedSourcePluginId = sourcePluginId ?? (enablePluginName ? `${enablePluginName}@${await this.resolvePluginMarketplace(enablePluginName)}` : void 0);
		if (resolvedSourcePluginId) payload.sourcePluginId = resolvedSourcePluginId;
		if (internalModelRequestHeaders !== void 0) payload.internalModelRequestHeaders = internalModelRequestHeaders;
		const shouldRefreshCustomExpertAgentOverride = !!agentName && !!enablePluginName && resolvedSourcePluginId?.endsWith(`@my-experts`);
		if (shouldRefreshCustomExpertAgentOverride) {
			delete payload.agentName;
			delete payload.sourcePluginId;
			delete payload.internalModelRequestHeaders;
		}
		try {
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					...require_workbuddy_auth_product_coordinator.gatewaySecretHeaders()
				},
				body: JSON.stringify(payload)
			});
			if (!response.ok) {
				const text = await response.text().catch(() => "");
				console.warn(`[ExpertPluginService] plugin switch failed: status=${response.status} ${response.statusText}, sessionId=${sessionId}, disable=${disablePluginName || "none"}, enable=${enablePluginName || "none"}, agent=${agentName || "none"}, sourcePluginId=${resolvedSourcePluginId || "none"}, internalModelRequestHeaders=${Object.keys(internalModelRequestHeaders ?? {}).length}, body=${text}`);
				return false;
			}
			if (shouldRefreshCustomExpertAgentOverride) {
				const overrideResponse = await fetch(url, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						...require_workbuddy_auth_product_coordinator.gatewaySecretHeaders()
					},
					body: JSON.stringify({
						persist: false,
						...agentName ? { agentName } : {},
						...resolvedSourcePluginId ? { sourcePluginId: resolvedSourcePluginId } : {},
						...internalModelRequestHeaders !== void 0 ? { internalModelRequestHeaders } : {}
					})
				});
				if (!overrideResponse.ok) {
					const text = await overrideResponse.text().catch(() => "");
					console.warn(`[ExpertPluginService] plugin agent override refresh failed: status=${overrideResponse.status} ${overrideResponse.statusText}, sessionId=${sessionId}, agent=${agentName || "none"}, sourcePluginId=${resolvedSourcePluginId || "none"}, body=${text}`);
					return false;
				}
			}
			console.log(`[ExpertPluginService] plugin switch succeeded: disable=${disablePluginName || "none"}, enable=${enablePluginName || "none"} agent=${agentName || "none"}, sourcePluginId=${resolvedSourcePluginId || "none"} internalModelRequestHeaders=${Object.keys(internalModelRequestHeaders ?? {}).length} on session ${sessionId}`);
			return true;
		} catch (error) {
			console.warn("[ExpertPluginService] plugin switch request failed:", {
				sessionId,
				disablePluginName,
				enablePluginName,
				agentName,
				sourcePluginId: resolvedSourcePluginId,
				internalModelRequestHeaders,
				error
			});
			return false;
		}
	}
	/**
	* 以当前 agent-cli runtime 的插件列表为准判断专家插件是否仍启用。
	*
	* 专家插件通过 `persist:false` 只在当前 CLI 进程内生效；WorkBuddy server 侧的
	* "已应用"缓存可能因为插件被 disable、runtime 重建等原因变旧，所以跳过
	* apply 前必须回到当前 CLI 进程查询真实状态。
	*/
	async isExpertPluginEnabledForSession(sessionId, pluginName, marketplace) {
		if (!sessionId || !pluginName || !marketplace) return false;
		const httpBase = await this.resolveSessionHttpBase(sessionId);
		if (!httpBase) return false;
		try {
			const response = await fetch(`${httpBase}/api/v1/plugins`, { headers: require_workbuddy_auth_product_coordinator.gatewaySecretHeaders() });
			if (!response.ok) return false;
			const payload = await response.json().catch(() => void 0);
			return (Array.isArray(payload) ? payload : payload && typeof payload === "object" && Array.isArray(payload.data) ? payload.data : []).some((plugin) => {
				if (!plugin || typeof plugin !== "object") return false;
				const item = plugin;
				return item.name === pluginName && item.marketplace === marketplace && item.status === "enabled";
			});
		} catch (error) {
			console.warn("[ExpertPluginService] isExpertPluginEnabledForSession failed:", {
				sessionId,
				pluginName,
				marketplace,
				error
			});
			return false;
		}
	}
	/**
	* 从 sidecar 查询指定 session 的 agent-cli HTTP base URL。
	*/
	async resolveSessionHttpBase(sessionId) {
		try {
			return await this.hostCapabilities.resolveSessionHttpBase(sessionId);
		} catch (error) {
			console.warn("[ExpertPluginService] resolveSessionHttpBase failed:", error);
			return;
		}
	}
	/**
	* 确保 experts marketplace（及 my-experts 自定义专家 marketplace）已在 CLI 端 PluginManager 中注册。
	*/
	async ensureExpertsMarketplaceRegistered(httpBase) {
		await this.registerMarketplaceIfNeeded(httpBase, EXPERTS_MARKETPLACE, this.getMarketplaceDir());
		const myExpertsDir = path.join(this.hostCapabilities.getConfigDir(), "plugins", "marketplaces", require_workbuddy_auth_product_coordinator.CUSTOM_EXPERT_MY_EXPERT_DIR_NAME);
		if (await pathExists(myExpertsDir)) await this.registerMarketplaceIfNeeded(httpBase, require_workbuddy_auth_product_coordinator.CUSTOM_EXPERT_MY_EXPERT_DIR_NAME, myExpertsDir);
	}
	async registerMarketplaceIfNeeded(httpBase, marketplaceName, marketplaceDir) {
		const key = `${httpBase}:${marketplaceName}`;
		if (this.marketplaceRegistered.has(key)) return;
		try {
			const url = `${httpBase}/api/v1/plugins/marketplaces`;
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					...require_workbuddy_auth_product_coordinator.gatewaySecretHeaders()
				},
				body: JSON.stringify({
					source: marketplaceDir,
					name: marketplaceName
				})
			});
			if (response.ok) {
				this.marketplaceRegistered.add(key);
				console.log(`[ExpertPluginService] Marketplace "${marketplaceName}" registered on ${httpBase}`);
			} else {
				const text = await response.text().catch(() => "");
				console.warn(`[ExpertPluginService] Failed to register "${marketplaceName}" marketplace: ${response.status} ${text}`);
			}
		} catch (error) {
			console.warn(`[ExpertPluginService] registerMarketplaceIfNeeded("${marketplaceName}") failed:`, error);
		}
	}
	getActiveExperts() {
		return [...this.activeExperts];
	}
	async isExpertDownloaded(expertId) {
		const bundleName = await this.resolveBundleName(expertId);
		return this.hasPluginManifestAsync(this.getPluginDir(bundleName));
	}
	async getExpertLocalPath(expertId) {
		const bundleName = await this.resolveBundleName(expertId);
		const p = this.getPluginDir(bundleName);
		return await this.hasPluginManifestAsync(p) ? p : void 0;
	}
	async getExpertManifest(expertId) {
		const bundleName = await this.resolveBundleName(expertId);
		return await this.readPluginManifestAsync(this.getPluginDir(bundleName)) ?? void 0;
	}
	async getExpertManifestFromMarketplace(expertId, marketplace) {
		const bundleName = await this.resolveBundleName(expertId);
		return await this.readPluginManifestAsync(this.getPluginDirForMarketplace(bundleName, marketplace)) ?? void 0;
	}
	async resolveExpertDependencies(expertId, pluginName, marketplace, locale = "zh") {
		const bundleName = pluginName || await this.resolveBundleName(expertId);
		const pluginDir = await this.resolveDependencyPluginDir(bundleName, marketplace);
		const manifest = await this.readPluginManifestAsync(pluginDir);
		if (!manifest) return [];
		const mcpServers = await this.readExpertMcpServers(pluginDir, manifest);
		const mcpDependencies = Object.entries(mcpServers).map(([name, config]) => {
			const rawMeta = readWorkbuddyMeta(config);
			const meta = rawMeta ? localizeWorkbuddyMeta(rawMeta, locale) : void 0;
			return {
				type: "mcp",
				name,
				displayName: meta?.displayName,
				description: meta?.description,
				icon: meta?.icon,
				config,
				workbuddy: meta
			};
		});
		const connectorDependencies = (manifest.dependencies?.connectors ?? []).filter((id) => typeof id === "string" && id.trim().length > 0).map((id) => ({
			type: "connector",
			id
		}));
		return [...mcpDependencies, ...connectorDependencies];
	}
	async getExpertAgentName(expertId) {
		const pluginDir = await this.getExpertLocalPath(expertId);
		if (!pluginDir) return;
		const manifest = await this.readPluginManifestAsync(pluginDir);
		if (!manifest) return;
		return this.resolveExpertAgentName(pluginDir, manifest, expertId);
	}
	async getExpertAgentNameFromMarketplace(expertId, marketplace) {
		const bundleName = await this.resolveBundleName(expertId);
		const pluginDir = this.getPluginDirForMarketplace(bundleName, marketplace);
		if (!await this.hasPluginManifestAsync(pluginDir)) return;
		const manifest = await this.readPluginManifestAsync(pluginDir);
		if (!manifest) return;
		return this.resolveExpertAgentName(pluginDir, manifest, expertId);
	}
	/**
	* 解析专家的完整位置信息（manifest + marketplace + agentName）。
	*
	* 查找优先级：hintMarketplace → 官方 experts → 自定义 my-experts。
	* 若本地无 manifest，会自动 activateExpert（下载/解压），激活后再查。
	*/
	async resolveExpertLocation(expertId, hintMarketplace) {
		let resolved = await this.findManifestAcrossMarketplaces(expertId, hintMarketplace);
		if (!resolved) {
			if (!(await this.activateExpert(expertId, void 0, void 0, hintMarketplace ?? void 0)).success) return null;
			resolved = await this.findManifestAcrossMarketplaces(expertId, hintMarketplace);
		}
		if (!resolved) return null;
		const agentName = await this.findAgentNameAcrossMarketplaces(expertId, resolved.marketplace);
		if (!agentName) return null;
		return {
			manifest: resolved.manifest,
			marketplace: resolved.marketplace,
			agentName
		};
	}
	/**
	* 按优先级在多个 marketplace 中查找 manifest。
	* 优先级：hintMarketplace → 官方 experts → 自定义 my-experts。
	*/
	async findManifestAcrossMarketplaces(expertId, hintMarketplace) {
		if (hintMarketplace && hintMarketplace !== "experts") {
			const manifest = await this.getExpertManifestFromMarketplace(expertId, hintMarketplace);
			if (manifest?.name) return {
				manifest,
				marketplace: hintMarketplace
			};
		}
		const officialManifest = await this.getExpertManifest(expertId);
		if (officialManifest?.name) return {
			manifest: officialManifest,
			marketplace: "experts"
		};
		const myExpertsManifest = await this.getExpertManifestFromMarketplace(expertId, require_workbuddy_auth_product_coordinator.CUSTOM_EXPERT_MY_EXPERT_DIR_NAME);
		if (myExpertsManifest?.name) return {
			manifest: myExpertsManifest,
			marketplace: require_workbuddy_auth_product_coordinator.CUSTOM_EXPERT_MY_EXPERT_DIR_NAME
		};
		return null;
	}
	/**
	* 按优先级在多个 marketplace 中查找 agentName。
	* 优先级：已确定的 marketplace → 官方 experts → 自定义 my-experts。
	*/
	async findAgentNameAcrossMarketplaces(expertId, resolvedMarketplace) {
		if (resolvedMarketplace !== "experts") {
			const agentName = await this.getExpertAgentNameFromMarketplace(expertId, resolvedMarketplace);
			if (agentName) return agentName;
		}
		const officialAgentName = await this.getExpertAgentName(expertId);
		if (officialAgentName) return officialAgentName;
		return this.getExpertAgentNameFromMarketplace(expertId, require_workbuddy_auth_product_coordinator.CUSTOM_EXPERT_MY_EXPERT_DIR_NAME);
	}
	/**
	* 增量更新 experts marketplace 的 marketplace.json。
	* 只新增/更新指定 bundleName 对应的条目，不全量扫描所有子目录。
	*/
	async updateMarketplaceManifest(bundleName, marketplace) {
		const marketplaceName = marketplace || EXPERTS_MARKETPLACE;
		const marketplaceDir = marketplace ? path.join(this.getConfigDir(), "plugins", "marketplaces", marketplace) : this.getMarketplaceDir();
		const metaDir = path.join(marketplaceDir, ".codebuddy-plugin");
		const manifestPath = path.join(metaDir, "marketplace.json");
		await fs_promises.mkdir(metaDir, { recursive: true });
		let existing = {
			name: marketplaceName,
			description: `${marketplaceName} marketplace (auto-generated)`,
			plugins: []
		};
		try {
			const content = await fs_promises.readFile(manifestPath, "utf-8");
			existing = JSON.parse(content);
		} catch {}
		const pluginDir = path.join(marketplaceDir, "plugins", bundleName);
		const manifest = await this.readPluginManifestAsync(pluginDir);
		if (!manifest) {
			console.warn(`[ExpertPluginService] updateMarketplaceManifest: no manifest for ${bundleName}`);
			return;
		}
		const entry = {
			name: manifest.name || bundleName,
			source: `./plugins/${bundleName}`,
			description: manifest.description
		};
		const idx = existing.plugins.findIndex((p) => p.source === entry.source);
		if (idx >= 0) existing.plugins[idx] = entry;
		else existing.plugins.push(entry);
		await fs_promises.writeFile(manifestPath, JSON.stringify(existing, null, 2), "utf-8");
		console.log(`[ExpertPluginService] Updated marketplace.json (incremental): ${existing.plugins.length} plugins`, { updatedBundle: bundleName });
	}
	/**
	* 确保专家 Plugin 已下载到本地且是最新版本。
	* - 本地没有 → 下载
	* - 本地有但远程 updatedAt 比本地下载时间新 → 重新下载
	* - 本地有且是最新 → 跳过下载
	*/
	async ensureDownloaded(bundleName, updatedAt, downloadUrl) {
		const localPath = this.getPluginDir(bundleName);
		if (await this.hasPluginManifestAsync(localPath)) if (updatedAt && await this.isLocalStale(localPath, updatedAt)) console.log(`[ExpertPluginService] Local cache stale, re-downloading: ${bundleName}`);
		else {
			await this.logBundleSnapshot("cache", bundleName, localPath);
			return localPath;
		}
		const existing = this.downloadingExperts.get(bundleName);
		if (existing) return existing;
		const downloadPromise = this.downloadAndExtract(bundleName, localPath, downloadUrl);
		this.downloadingExperts.set(bundleName, downloadPromise);
		try {
			return await downloadPromise;
		} finally {
			this.downloadingExperts.delete(bundleName);
		}
	}
	/**
	* 优先从接口返回地址下载专家包；缺失时回退 COS tar.gz，并解压到本地目录。
	*/
	async downloadAndExtract(bundleName, targetDir, downloadUrl) {
		const explicitDownloadUrl = downloadUrl?.trim();
		const explicitBundleUrl = explicitDownloadUrl && this.isTrustedDownloadUrl(explicitDownloadUrl) ? explicitDownloadUrl : void 0;
		if (explicitDownloadUrl && !explicitBundleUrl) console.warn("[ExpertPluginService] untrusted expert bundle URL ignored:", {
			bundleName,
			bundleUrl: this.redactUrlForLog(explicitDownloadUrl)
		});
		const source = explicitBundleUrl ? "operation-platform" : "cos";
		const bundleUrl = explicitBundleUrl || require_workbuddy_auth_product_coordinator.buildExpertUrl(`/bundles/${bundleName}.tar.gz`);
		const safeBundleUrl = this.redactUrlForLog(bundleUrl);
		expertMarketLogger.info("expert bundle download start", {
			bundleName,
			source,
			bundleUrl: safeBundleUrl
		});
		const { timeout } = require_workbuddy_auth_product_coordinator.EXPERT_CENTER_COS_CONFIG.download;
		const controller = new AbortController();
		const timer = setTimeout(() => controller.abort(), timeout);
		let response;
		try {
			response = await fetch(bundleUrl, { signal: controller.signal });
		} catch (error) {
			console.warn("[ExpertPluginService] expert bundle download request failed:", {
				bundleName,
				bundleUrl: safeBundleUrl,
				error
			});
			if (explicitBundleUrl) return this.downloadAndExtract(bundleName, targetDir);
			throw error;
		} finally {
			clearTimeout(timer);
		}
		if (!response.ok) {
			console.warn("[ExpertPluginService] expert bundle download returned non-OK:", {
				bundleName,
				bundleUrl: safeBundleUrl,
				status: response.status,
				statusText: response.statusText
			});
			if (explicitBundleUrl) return this.downloadAndExtract(bundleName, targetDir);
			throw new Error(`Failed to download expert bundle: ${response.status} ${response.statusText} - ${safeBundleUrl}`);
		}
		try {
			await fs_promises.rm(targetDir, {
				recursive: true,
				force: true
			});
			await fs_promises.mkdir(targetDir, { recursive: true });
			const archiveKind = this.inferArchiveKind(bundleUrl);
			const tmpFile = path.join(targetDir, archiveKind === "zip" ? "__bundle.zip" : "__bundle.tar.gz");
			await fs_promises.writeFile(tmpFile, Buffer.from(await response.arrayBuffer()));
			try {
				if (archiveKind === "zip") await this.extractZipArchive(tmpFile, targetDir);
				else await import_tar.extract({
					file: tmpFile,
					cwd: targetDir
				});
				await this.normalizeExtractedPluginRoot(targetDir);
			} finally {
				await fs_promises.unlink(tmpFile).catch(() => {});
			}
			if (!await this.hasPluginManifestAsync(targetDir)) throw new Error(`Extracted bundle does not contain plugin.json: ${bundleName}`);
			await this.logBundleSnapshot(source, bundleName, targetDir);
			await fs_promises.writeFile(path.join(targetDir, ".downloaded_at"), (/* @__PURE__ */ new Date()).toISOString(), "utf-8");
			return targetDir;
		} catch (err) {
			if (explicitBundleUrl) {
				console.warn("[ExpertPluginService] explicit expert bundle invalid, fallback to COS:", {
					bundleName,
					bundleUrl: safeBundleUrl,
					error: err
				});
				await fs_promises.rm(targetDir, {
					recursive: true,
					force: true
				}).catch(() => {});
				return this.downloadAndExtract(bundleName, targetDir);
			}
			throw new Error(`Failed to extract expert bundle "${bundleName}": ${err instanceof Error ? err.message : err}`);
		}
	}
	async logBundleSnapshot(source, bundleName, localPath) {
		const manifest = await this.readPluginManifestAsync(localPath).catch(() => null);
		expertMarketLogger.info("expert bundle ready", {
			bundleName,
			source,
			localPath,
			pluginName: manifest?.name,
			version: manifest?.version,
			expertType: manifest?.expertType,
			agentName: manifest?.agentName
		});
	}
	isTrustedDownloadUrl(url) {
		try {
			const parsed = new URL(url);
			const host = parsed.hostname.toLowerCase();
			const cosHost = new URL(require_workbuddy_auth_product_coordinator.EXPERT_CENTER_COS_CONFIG.baseUrl).hostname.toLowerCase();
			return parsed.protocol === "https:" && (host === cosHost || host.endsWith(".myqcloud.com") || host.endsWith(".tencentcos.cn") || host === "openplatform-cdn.codebuddy.cn");
		} catch {
			return false;
		}
	}
	redactUrlForLog(url) {
		try {
			const parsed = new URL(url);
			const redacted = `${parsed.origin}${parsed.pathname}`;
			return parsed.search || parsed.hash ? `${redacted}?<redacted>` : redacted;
		} catch {
			return "<invalid-url>";
		}
	}
	inferArchiveKind(url) {
		try {
			return new URL(url).pathname.toLowerCase().endsWith(".zip") ? "zip" : "tar";
		} catch {
			return url.split("?")[0].toLowerCase().endsWith(".zip") ? "zip" : "tar";
		}
	}
	async extractZipArchive(zipPath, targetDir) {
		const entries = new import_adm_zip.default(zipPath).getEntries();
		const directoryLikeEntries = /* @__PURE__ */ new Set();
		for (const entry of entries) {
			const entryName = entry.rawEntryName.toString("utf8").replace(/\\/g, "/").replace(/\/+$/, "");
			const parts = entryName.split("/").filter(Boolean);
			for (let i = 1; i < parts.length; i++) directoryLikeEntries.add(parts.slice(0, i).join("/"));
			if (entry.isDirectory && entryName) directoryLikeEntries.add(entryName);
		}
		const resolvedRoot = path.resolve(targetDir);
		for (const entry of entries) {
			const entryName = entry.rawEntryName.toString("utf8").replace(/\\/g, "/");
			const normalizedEntryName = entryName.replace(/\/+$/, "");
			const targetPath = path.resolve(resolvedRoot, normalizedEntryName || entryName);
			const rel = path.relative(resolvedRoot, targetPath);
			if (rel.startsWith("..") || path.isAbsolute(rel)) throw new Error(`[zip-slip] entry escapes targetDir: ${entryName}`);
			if (entry.isDirectory || entryName.endsWith("/") || entry.header.size === 0 && directoryLikeEntries.has(normalizedEntryName)) {
				await fs_promises.mkdir(targetPath, { recursive: true });
				continue;
			}
			await fs_promises.mkdir(path.dirname(targetPath), { recursive: true });
			await fs_promises.writeFile(targetPath, entry.getData());
		}
	}
	async normalizeExtractedPluginRoot(targetDir) {
		if (await this.hasPluginManifestAsync(targetDir)) return;
		const dirs = (await fs_promises.readdir(targetDir, { withFileTypes: true })).filter((entry) => entry.isDirectory());
		for (const dir of dirs) {
			const childDir = path.join(targetDir, dir.name);
			if (!await this.hasPluginManifestAsync(childDir)) continue;
			for (const childEntry of await fs_promises.readdir(childDir)) await fs_promises.rename(path.join(childDir, childEntry), path.join(targetDir, childEntry));
			await fs_promises.rm(childDir, {
				recursive: true,
				force: true
			});
			return;
		}
	}
	/**
	* 检查本地缓存是否过期（远程 updatedAt 比本地下载时间新）
	*/
	async isLocalStale(localPath, remoteUpdatedAt) {
		try {
			const tsFile = path.join(localPath, ".downloaded_at");
			const content = await fs_promises.readFile(tsFile, "utf-8");
			const localTime = new Date(content.trim()).getTime();
			return new Date(remoteUpdatedAt).getTime() > localTime;
		} catch {
			return true;
		}
	}
	/**
	* 从本地 manifest 缓存中查找专家的 plugin 字段。
	* 用于把稳定 expertId 映射到实际 bundle/plugin 目录名。
	*/
	async lookupBundleNameFromManifestCache(expertId) {
		try {
			const manifestPath = path.join(this.getConfigDir(), "app", "cache", "experts", "manifest.json");
			const content = await fs_promises.readFile(manifestPath, "utf-8");
			const expert = JSON.parse(content).experts?.find((e) => e.id === expertId);
			return typeof expert?.plugin === "string" && expert.plugin.trim() !== "" ? expert.plugin : void 0;
		} catch {
			return;
		}
	}
	async resolveBundleName(expertId) {
		const bundleName = this.expertBundleMap.get(expertId) || await this.lookupBundleNameFromManifestCache(expertId) || expertId;
		this.expertBundleMap.set(expertId, bundleName);
		return bundleName;
	}
	/**
	* 解析当前专家真正应写入 settings.agent 的 agent 名。
	*
	* 优先级：
	* 1. plugin.json 显式声明的 agentName
	* 2. team 型专家的 teamInfo.leadAgent
	* 3. agents/ 中与 expertId slug 对应文件的 frontmatter name
	* 4. agents/ 中唯一 agent 文件的 frontmatter name
	* 5. expertId 的 kebab-case fallback
	*/
	async resolveExpertAgentName(pluginDir, manifest, expertId) {
		if (manifest.agentName) return manifest.agentName;
		if (manifest.expertType === "team" && manifest.teamInfo?.leadAgent) return manifest.teamInfo.leadAgent;
		const expertSlug = this.toKebabCase(expertId);
		return await this.resolveAgentNameFromPluginFiles(pluginDir, manifest, expertSlug) || expertSlug;
	}
	async resolveAgentNameFromPluginFiles(pluginDir, manifest, expertSlug) {
		const candidatePaths = await this.resolveAgentMarkdownFiles(pluginDir, manifest.agents);
		const matchedPath = candidatePaths.find((filePath) => path.basename(filePath, ".md") === expertSlug);
		if (matchedPath) return this.readAgentNameFromMarkdown(matchedPath);
		if (candidatePaths.length === 1) return this.readAgentNameFromMarkdown(candidatePaths[0]);
	}
	async resolveAgentMarkdownFiles(pluginDir, agents) {
		const configuredAgentPaths = this.normalizeManifestAgentPaths(agents);
		if (configuredAgentPaths.length === 0) return this.listMarkdownFiles(path.join(pluginDir, "agents"));
		return (await Promise.all(configuredAgentPaths.map(async (relativePath) => {
			const absolutePath = path.join(pluginDir, relativePath);
			try {
				const stat = await fs_promises.stat(absolutePath);
				if (stat.isDirectory()) return this.listMarkdownFiles(absolutePath);
				if (stat.isFile() && absolutePath.endsWith(".md")) return [absolutePath];
			} catch {
				return [];
			}
			return [];
		}))).flat();
	}
	normalizeManifestAgentPaths(agents) {
		if (!agents) return [];
		return (Array.isArray(agents) ? agents : [agents]).map((agentPath) => agentPath.trim()).filter((agentPath) => agentPath !== "").map((agentPath) => agentPath.replace(/^\.\//, ""));
	}
	async listMarkdownFiles(dir) {
		try {
			const entries = await fs_promises.readdir(dir, { withFileTypes: true });
			return (await Promise.all(entries.map(async (entry) => {
				const absolutePath = path.join(dir, entry.name);
				if (entry.isDirectory()) return this.listMarkdownFiles(absolutePath);
				if (entry.isFile() && entry.name.endsWith(".md")) return [absolutePath];
				return [];
			}))).flat();
		} catch {
			return [];
		}
	}
	async readAgentNameFromMarkdown(filePath) {
		try {
			const frontmatter = (await fs_promises.readFile(filePath, "utf-8")).match(/^---\s*\n([\s\S]*?)\n---/)?.[1];
			if (!frontmatter) return path.basename(filePath, ".md");
			const rawName = frontmatter.match(/^name:\s*(.+)$/m)?.[1]?.trim();
			if (!rawName) return path.basename(filePath, ".md");
			return rawName.replace(/^['"]|['"]$/g, "");
		} catch {
			return;
		}
	}
	async readGeneratedAgentOverride(settingsPath) {
		try {
			if (!await pathExists(settingsPath)) return null;
			const raw = await fs_promises.readFile(settingsPath, "utf-8");
			const parsed = JSON.parse(raw);
			if (Object.keys(parsed).length !== 1 || typeof parsed.agent !== "string" || parsed.agent.trim() === "") return null;
			return { agent: parsed.agent };
		} catch {
			return null;
		}
	}
	async removePersistedGeneratedAgentOverrides() {
		try {
			const pluginsDir = path.join(this.getMarketplaceDir(), "plugins");
			if (!await pathExists(pluginsDir)) return;
			const entries = await fs_promises.readdir(pluginsDir, { withFileTypes: true });
			for (const entry of entries) {
				if (!entry.isDirectory()) continue;
				const settingsPath = path.join(pluginsDir, entry.name, PLUGIN_SETTINGS_FILE);
				const payload = await this.readGeneratedAgentOverride(settingsPath);
				if (!payload) continue;
				await fs_promises.unlink(settingsPath);
				console.log(`[ExpertPluginService] Removed persisted expert agent override on startup: ${settingsPath}`, payload);
			}
		} catch (error) {
			console.warn("[ExpertPluginService] Failed to remove persisted expert agent overrides on startup:", error);
		}
	}
	/** 获取 experts marketplace 根目录 */
	getMarketplaceDir() {
		return path.join(this.getConfigDir(), "plugins", "marketplaces", EXPERTS_MARKETPLACE);
	}
	/** 获取专家 Plugin 的本地目录路径，以 bundleName（plugin 字段值）为目录名 */
	getPluginDir(bundleName) {
		const configDir = this.getConfigDir();
		return path.join(configDir, "plugins", "marketplaces", EXPERTS_MARKETPLACE, "plugins", bundleName);
	}
	/** 获取指定 marketplace 下的 Plugin 目录路径 */
	getPluginDirForMarketplace(bundleName, marketplace) {
		const configDir = this.getConfigDir();
		return path.join(configDir, "plugins", "marketplaces", marketplace, "plugins", bundleName);
	}
	/**
	* 根据 pluginName 判断所属 marketplace：
	* 优先检查 my-experts，fallback 到 experts
	*/
	async resolvePluginMarketplace(pluginName) {
		const myExpertsPath = this.getPluginDirForMarketplace(pluginName, require_workbuddy_auth_product_coordinator.CUSTOM_EXPERT_MY_EXPERT_DIR_NAME);
		if (await this.hasPluginManifestAsync(myExpertsPath)) return require_workbuddy_auth_product_coordinator.CUSTOM_EXPERT_MY_EXPERT_DIR_NAME;
		return EXPERTS_MARKETPLACE;
	}
	async resolveDependencyPluginDir(bundleName, marketplace) {
		if (marketplace && marketplace !== EXPERTS_MARKETPLACE) return this.getPluginDirForMarketplace(bundleName, marketplace);
		if (!marketplace) {
			const myExpertsDir = this.getPluginDirForMarketplace(bundleName, require_workbuddy_auth_product_coordinator.CUSTOM_EXPERT_MY_EXPERT_DIR_NAME);
			if (await this.hasPluginManifestAsync(myExpertsDir)) return myExpertsDir;
		}
		return this.ensureDownloaded(bundleName);
	}
	async readExpertMcpServers(pluginDir, manifest) {
		const declared = manifest.dependencies?.mcpServers ?? manifest.mcpServers;
		if (declared !== void 0) return this.readMcpServersDeclaration(pluginDir, declared);
		const fallbackPath = path.join(pluginDir, ".mcp.json");
		if (await pathExists(fallbackPath)) return this.readMcpServersFile(fallbackPath);
		return {};
	}
	async readMcpServersDeclaration(pluginDir, declared) {
		if (typeof declared === "string") return this.readMcpServersFile(path.resolve(pluginDir, declared));
		if (Array.isArray(declared)) {
			const result = {};
			for (const item of declared) {
				if (typeof item !== "string") continue;
				Object.assign(result, await this.readMcpServersFile(path.resolve(pluginDir, item)));
			}
			return result;
		}
		return this.normalizeMcpServers(declared, pluginDir);
	}
	async readMcpServersFile(filePath) {
		try {
			const content = await fs_promises.readFile(filePath, "utf-8");
			const parsed = JSON.parse(content);
			return this.normalizeMcpServers(parsed, path.dirname(filePath));
		} catch (error) {
			expertPluginLog.warn(`[ExpertPluginService] Failed to read MCP dependency file ${filePath}:`, error);
			return {};
		}
	}
	async normalizeMcpServers(raw, baseDir) {
		if (!isRecord(raw)) return {};
		const source = isRecord(raw.mcpServers) ? raw.mcpServers : raw;
		const result = {};
		for (const [name, config] of Object.entries(source)) if (isRecord(config)) result[name] = await this.resolveMcpIconConfig(config, baseDir);
		return result;
	}
	async resolveMcpIconConfig(config, baseDir) {
		const meta = readWorkbuddyMeta(config);
		if (!meta || typeof meta.icon !== "string" || /^(https?:|data:|file:)/.test(meta.icon)) return config;
		const icon = await this.resolveAvatarToDataUrl(meta.icon, baseDir);
		if (!icon) return config;
		return {
			...config,
			"x-workbuddy": {
				...meta,
				icon
			}
		};
	}
	/**
	* PascalCase/camelCase → kebab-case
	* 例: LivestreamEcommerceCoach → livestream-ecommerce-coach
	*      TradingAgentTeam → trading-agent-team
	*/
	toKebabCase(str) {
		return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/([A-Z])([A-Z][a-z])/g, "$1-$2").toLowerCase();
	}
	/** 检查目录下是否存在 plugin.json（支持多种元数据目录名） */
	async hasPluginManifestAsync(dir) {
		if (!await pathExists(dir)) return false;
		for (const metaDir of PLUGIN_METADATA_DIRS) if (await pathExists(path.join(dir, metaDir, PLUGIN_MANIFEST_FILE))) return true;
		return false;
	}
	/** 读取 plugin.json（异步版本，用于不阻塞主线程的场景） */
	async readPluginManifestAsync(dir) {
		for (const metaDir of PLUGIN_METADATA_DIRS) {
			const manifestPath = path.join(dir, metaDir, PLUGIN_MANIFEST_FILE);
			try {
				const content = await fs_promises.readFile(manifestPath, "utf-8");
				return JSON.parse(content);
			} catch {}
		}
		return null;
	}
	/**
	* 扫描本地自定义专家列表。
	* 基于 marketplace.json 注册清单扫描，只返回已注册且有效的专家。
	* 若 marketplace.json 仅因尾逗号等格式问题损坏，则修复格式后继续扫描。
	* 传入 userId 时，进一步过滤只返回属于该用户的专家。
	*/
	async scanCustomExperts(userId) {
		const userKey = userId ?? "";
		const inflight = this.scanCustomExpertsInflight.get(userKey);
		if (inflight) return inflight;
		const promise = this.doScanCustomExperts(userId);
		this.scanCustomExpertsInflight.set(userKey, promise);
		try {
			return await promise;
		} finally {
			this.scanCustomExpertsInflight.delete(userKey);
		}
	}
	async doScanCustomExperts(userId) {
		try {
			const configDir = this.getConfigDir();
			const marketplaceDir = path.join(configDir, "plugins", "marketplaces", require_workbuddy_auth_product_coordinator.CUSTOM_EXPERT_MY_EXPERT_DIR_NAME);
			const pluginsDir = path.join(marketplaceDir, "plugins");
			const manifestPath = path.join(marketplaceDir, ".codebuddy-plugin", "marketplace.json");
			if (!await pathExists(manifestPath)) return [];
			let manifest;
			let shouldRewriteManifest = false;
			try {
				const content = await fs_promises.readFile(manifestPath, "utf-8");
				try {
					manifest = JSON.parse(content);
				} catch (parseError) {
					const normalized = this.repairJsonTrailingCommas(content);
					if (normalized === content) throw parseError;
					manifest = JSON.parse(normalized);
					shouldRewriteManifest = true;
					expertPluginLog.warn("[ExpertPluginService] scanCustomExperts: repaired malformed marketplace.json");
				}
			} catch {
				expertPluginLog.warn("[ExpertPluginService] scanCustomExperts: failed to parse marketplace.json");
				return [];
			}
			const registeredPlugins = manifest?.plugins;
			if (!Array.isArray(registeredPlugins) || registeredPlugins.length === 0) {
				if (shouldRewriteManifest) await this.reconcileCustomMarketplaceManifest(manifestPath, manifest, [], true, true);
				return [];
			}
			let userExpertIds;
			if (userId) {
				const ids = await this.readUserExpertIds(userId);
				userExpertIds = new Set(ids);
			}
			const experts = [];
			const validManifestEntries = [];
			const validDirNames = /* @__PURE__ */ new Set();
			for (const plugin of registeredPlugins) {
				if (!plugin.source) continue;
				const dirName = plugin.source.replace(/^\.\/plugins\//, "");
				if (!dirName || this.isUnsafePath(dirName)) continue;
				const expertDir = path.join(pluginsDir, dirName);
				try {
					if (!await pathExists(expertDir)) {
						this.customExpertDtoCache.delete(dirName);
						continue;
					}
					const pluginManifest = await this.readPluginManifestAsync(expertDir);
					if (!pluginManifest) {
						this.customExpertDtoCache.delete(dirName);
						continue;
					}
					validDirNames.add(dirName);
					validManifestEntries.push({
						name: pluginManifest.name || plugin.name || dirName,
						source: `./plugins/${dirName}`,
						description: pluginManifest.description ?? plugin.description
					});
					if (userExpertIds && !userExpertIds.has(dirName)) continue;
					const expert = await this.readCustomExpertFromDirCached(expertDir, dirName);
					if (expert) experts.push(expert);
				} catch (err) {
					expertPluginLog.warn("[ExpertPluginService] scanCustomExperts: skipping", dirName, err);
				}
			}
			await this.reconcileCustomMarketplaceManifest(manifestPath, manifest, validManifestEntries, true, shouldRewriteManifest);
			for (const cachedDir of this.customExpertDtoCache.keys()) if (!validDirNames.has(cachedDir)) this.customExpertDtoCache.delete(cachedDir);
			return experts;
		} catch (error) {
			expertPluginLog.error("[ExpertPluginService] scanCustomExperts failed:", error);
			return [];
		}
	}
	/**
	* 修复 JSON 中字符串外的尾逗号。
	* 逐字符识别字符串与转义状态，避免误改 description 等字符串里的 ",]" / ",}" 文本。
	*/
	repairJsonTrailingCommas(content) {
		let repaired = "";
		let inString = false;
		let escaping = false;
		let changed = false;
		for (let i = 0; i < content.length; i += 1) {
			const ch = content[i];
			if (inString) {
				repaired += ch;
				if (escaping) escaping = false;
				else if (ch === "\\") escaping = true;
				else if (ch === "\"") inString = false;
				continue;
			}
			if (ch === "\"") {
				inString = true;
				repaired += ch;
				continue;
			}
			if (ch === ",") {
				let next = i + 1;
				while (next < content.length && /\s/.test(content[next])) next += 1;
				if (next < content.length && (content[next] === "}" || content[next] === "]")) {
					changed = true;
					continue;
				}
			}
			repaired += ch;
		}
		return changed ? repaired : content;
	}
	/**
	* 将扫描得到的有效注册项写回 marketplace.json。
	* 仅用于格式修复和清理 stale entry，不主动注册磁盘裸目录。
	*/
	async reconcileCustomMarketplaceManifest(manifestPath, manifest, validEntries, manifestExists, forceRewrite = false) {
		const currentPlugins = Array.isArray(manifest.plugins) ? manifest.plugins : [];
		if (!forceRewrite && manifestExists && JSON.stringify(currentPlugins) === JSON.stringify(validEntries)) return;
		if (!manifestExists && validEntries.length === 0) return;
		await fs_promises.mkdir(path.dirname(manifestPath), { recursive: true });
		const nextManifest = {
			name: manifest.name || "my-experts",
			description: manifest.description || `my-experts marketplace (auto-generated)`,
			plugins: validEntries
		};
		await fs_promises.writeFile(manifestPath, JSON.stringify(nextManifest, null, 2), "utf-8");
	}
	/**
	* 带 mtime 缓存的自定义专家读取：plugin.json 未变则复用缓存 DTO，
	* 跳过 readFile + 头像 base64 编码（切 tab 卡顿的主要 CPU 来源）。
	*/
	async readCustomExpertFromDirCached(expertDir, entryName) {
		const mtimeMs = await this.statManifestMtimeMs(expertDir);
		if (mtimeMs !== void 0) {
			const cached = this.customExpertDtoCache.get(entryName);
			if (cached && cached.mtimeMs === mtimeMs) return cached.dto;
		}
		const dto = await this.readCustomExpertFromDir(expertDir, entryName);
		if (dto && mtimeMs !== void 0) this.customExpertDtoCache.set(entryName, {
			mtimeMs,
			dto
		});
		return dto;
	}
	/** 返回专家 plugin.json 的 mtimeMs（用于缓存失效判定）；找不到返回 undefined */
	async statManifestMtimeMs(expertDir) {
		for (const metaDir of PLUGIN_METADATA_DIRS) try {
			return (await fs_promises.stat(path.join(expertDir, metaDir, PLUGIN_MANIFEST_FILE))).mtimeMs;
		} catch {}
	}
	/** 根据 ID 获取单个本地自定义专家 */
	async getCustomExpert(expertId) {
		if (!expertId || this.isUnsafePath(expertId)) return null;
		try {
			const configDir = this.getConfigDir();
			const pluginsDir = path.join(configDir, "plugins", "marketplaces", require_workbuddy_auth_product_coordinator.CUSTOM_EXPERT_MY_EXPERT_DIR_NAME, "plugins");
			const expertDir = path.join(pluginsDir, expertId);
			if (!expertDir.startsWith(pluginsDir)) return null;
			if (!await pathExists(expertDir)) return null;
			return await this.readCustomExpertFromDir(expertDir, expertId);
		} catch (error) {
			expertPluginLog.error("[ExpertPluginService] getCustomExpert failed:", error);
			return null;
		}
	}
	/** 删除本地自定义专家（目录 + marketplace.json + 用户列表） */
	async deleteCustomExpert(expertId, userId) {
		if (!expertId || this.isUnsafePath(expertId)) return {
			success: false,
			error: "invalid expertId"
		};
		try {
			const configDir = this.getConfigDir();
			const pluginsDir = path.join(configDir, "plugins", "marketplaces", require_workbuddy_auth_product_coordinator.CUSTOM_EXPERT_MY_EXPERT_DIR_NAME, "plugins");
			const expertDir = path.join(pluginsDir, expertId);
			if (!expertDir.startsWith(pluginsDir)) return {
				success: false,
				error: "invalid expert path"
			};
			if (!await pathExists(expertDir)) return {
				success: false,
				error: "expert directory not found"
			};
			let pluginName;
			const manifest = await this.readPluginManifestAsync(expertDir);
			if (manifest?.name) pluginName = manifest.name;
			await fs_promises.rm(expertDir, {
				recursive: true,
				force: true
			});
			this.customExpertDtoCache.delete(expertId);
			await this.removeFromMarketplaceManifest(expertId);
			if (userId) await this.removeFromUserExperts(userId, expertId);
			if (pluginName) try {
				await this.deactivateExpert(expertId);
			} catch (err) {
				expertPluginLog.warn("[ExpertPluginService] deleteCustomExpert: deactivate failed:", err);
			}
			expertPluginLog.log(`[ExpertPluginService] Custom expert deleted: ${expertId}`);
			return { success: true };
		} catch (error) {
			const msg = error instanceof Error ? error.message : String(error);
			expertPluginLog.error("[ExpertPluginService] deleteCustomExpert failed:", msg);
			return {
				success: false,
				error: msg
			};
		}
	}
	/** 将专家 ID 添加到用户的自定义专家列表（去重） */
	async addUserExperts(userId, expertIds) {
		if (!userId || !expertIds.length || this.isUnsafePath(userId)) return;
		try {
			const jsonPath = this.getUserExpertsJsonPath(userId);
			const current = await this.readUserExpertIds(userId);
			const idSet = new Set(current);
			let changed = false;
			for (const id of expertIds) if (!idSet.has(id)) {
				idSet.add(id);
				changed = true;
			}
			if (!changed) return;
			await fs_promises.mkdir(path.dirname(jsonPath), { recursive: true });
			await fs_promises.writeFile(jsonPath, JSON.stringify(Array.from(idSet), null, 2), "utf-8");
		} catch (err) {
			expertPluginLog.warn("[ExpertPluginService] addUserExperts failed:", err);
		}
	}
	/** 获取本地自定义专家注册清单监听路径 */
	getCustomExpertWatchPath() {
		return path.join(this.getConfigDir(), "plugins", "marketplaces", require_workbuddy_auth_product_coordinator.CUSTOM_EXPERT_MY_EXPERT_DIR_NAME, ".codebuddy-plugin", "marketplace.json");
	}
	/** 获取单个自定义专家的 plugin.json 监听路径 */
	getCustomExpertPluginJsonPath(expertId) {
		return path.join(this.getConfigDir(), "plugins", "marketplaces", require_workbuddy_auth_product_coordinator.CUSTOM_EXPERT_MY_EXPERT_DIR_NAME, "plugins", expertId, ".codebuddy-plugin", "plugin.json");
	}
	/** 清除专家的 .created-by-session 标记文件 */
	async clearCustomExpertSessionMarker(expertId) {
		if (!expertId || this.isUnsafePath(expertId)) return;
		try {
			const configDir = this.getConfigDir();
			const markerPath = path.join(configDir, "plugins", "marketplaces", require_workbuddy_auth_product_coordinator.CUSTOM_EXPERT_MY_EXPERT_DIR_NAME, "plugins", expertId, ".created-by-session");
			if (await pathExists(markerPath)) await fs_promises.unlink(markerPath);
			this.customExpertDtoCache.delete(expertId);
		} catch (err) {
			expertPluginLog.warn("[ExpertPluginService] clearCustomExpertSessionMarker failed:", err);
		}
	}
	/** 安全路径检查：拒绝包含路径穿越的 ID */
	isUnsafePath(id) {
		return /(?:^|[\\/])\.\.(?:[\\/]|$)/.test(id) || /[\\/]/.test(id);
	}
	/** 用户自定义专家列表路径 */
	getUserExpertsJsonPath(userId) {
		return path.join(this.getConfigDir(), "experts", "custom", userId, "experts.json");
	}
	/** 读取用户的自定义专家 ID 列表 */
	async readUserExpertIds(userId) {
		if (this.isUnsafePath(userId)) return [];
		try {
			const jsonPath = this.getUserExpertsJsonPath(userId);
			if (!await pathExists(jsonPath)) return [];
			const raw = await fs_promises.readFile(jsonPath, "utf-8");
			const parsed = JSON.parse(raw);
			return Array.isArray(parsed) ? parsed : [];
		} catch {
			return [];
		}
	}
	/** 从用户列表中移除专家 ID */
	async removeFromUserExperts(userId, expertId) {
		if (this.isUnsafePath(userId)) return;
		try {
			const jsonPath = this.getUserExpertsJsonPath(userId);
			const current = await this.readUserExpertIds(userId);
			const filtered = current.filter((id) => id !== expertId);
			if (filtered.length === current.length) return;
			await fs_promises.mkdir(path.dirname(jsonPath), { recursive: true });
			await fs_promises.writeFile(jsonPath, JSON.stringify(filtered, null, 2), "utf-8");
		} catch (err) {
			expertPluginLog.warn("[ExpertPluginService] removeFromUserExperts failed:", err);
		}
	}
	/** 从 marketplace.json 中移除指定 expertId 的条目 */
	async removeFromMarketplaceManifest(expertId) {
		try {
			const configDir = this.getConfigDir();
			const manifestPath = path.join(configDir, "plugins", "marketplaces", require_workbuddy_auth_product_coordinator.CUSTOM_EXPERT_MY_EXPERT_DIR_NAME, ".codebuddy-plugin", "marketplace.json");
			if (!await pathExists(manifestPath)) return;
			const content = await fs_promises.readFile(manifestPath, "utf-8");
			const manifest = JSON.parse(content);
			if (manifest?.plugins && Array.isArray(manifest.plugins)) {
				manifest.plugins = manifest.plugins.filter((p) => p.source !== `./plugins/${expertId}`);
				await fs_promises.writeFile(manifestPath, JSON.stringify(manifest, null, 2), "utf-8");
			}
		} catch (err) {
			expertPluginLog.warn("[ExpertPluginService] removeFromMarketplaceManifest failed:", err);
		}
	}
	/**
	* 从指定目录读取单个本地自定义专家的 plugin.json 并构造 CustomExpertInfoDTO。
	* 头像相对路径会被转换为 base64 data URL。
	*/
	async readCustomExpertFromDir(expertDir, entryName) {
		const manifest = await this.readPluginManifestAsync(expertDir);
		if (!manifest) return null;
		const json = { ...manifest };
		for (const field of [
			"tags",
			"quickPrompts",
			"triggerPrompts"
		]) {
			const normalized = normalizeLocalizedManifestItems(json[field]);
			if (normalized !== void 0) json[field] = normalized;
		}
		for (const field of [
			"members",
			"connectorIds",
			"bin",
			"references"
		]) {
			const normalized = normalizeManifestItems(json[field]);
			if (normalized !== void 0) json[field] = normalized;
		}
		if (!json.version) json.version = "1.0.0";
		if (json.avatar) json.avatar = await this.resolveAvatarToDataUrl(json.avatar, expertDir);
		if (Array.isArray(json.members)) {
			for (const member of json.members) if (typeof member === "object" && member) {
				if ((!member.id || typeof member.id !== "string") && typeof member.agent === "string" && member.agent.trim()) member.id = member.agent.trim();
				if (member.avatar) member.avatar = await this.resolveAvatarToDataUrl(member.avatar, expertDir);
			}
		}
		json.expertRootDir = expertDir;
		json.id = json.id || json.name || entryName;
		json.isCustomExpert = true;
		json.marketplace = require_workbuddy_auth_product_coordinator.CUSTOM_EXPERT_MY_EXPERT_DIR_NAME;
		try {
			const sessionMarkerPath = path.join(expertDir, ".created-by-session");
			if (await pathExists(sessionMarkerPath)) {
				const sessionId = await fs_promises.readFile(sessionMarkerPath, "utf-8");
				if (sessionId.trim()) json.createdBySession = sessionId.trim();
			}
		} catch {}
		return json;
	}
	/** 头像相对路径 → base64 data URL 的通用转换 */
	async resolveAvatarToDataUrl(avatarPath, baseDir) {
		if (!avatarPath) return "";
		if (/^(https?|data):/.test(avatarPath)) return avatarPath;
		const rel = avatarPath.replace(/^\.\//, "");
		const abs = path.resolve(baseDir, rel);
		const resolvedBase = path.resolve(baseDir);
		if (!abs.startsWith(resolvedBase + path.sep) && abs !== resolvedBase) return "";
		try {
			const stat = await fs_promises.stat(abs);
			if (!stat.isFile()) return "";
			if (stat.size > MAX_CUSTOM_EXPERT_AVATAR_BYTES) {
				expertPluginLog.warn("[ExpertPluginService] resolveAvatarToDataUrl: avatar file is too large:", avatarPath, stat.size);
				return "";
			}
			const base64Data = (await fs_promises.readFile(abs)).toString("base64");
			return `data:${{
				png: "image/png",
				jpg: "image/jpeg",
				jpeg: "image/jpeg",
				svg: "image/svg+xml",
				webp: "image/webp",
				gif: "image/gif"
			}[path.extname(rel).replace(".", "").toLowerCase() || "png"] || "image/png"};base64,${base64Data}`;
		} catch (error) {
			expertPluginLog.warn("[ExpertPluginService] resolveAvatarToDataUrl failed:", avatarPath, error);
		}
		return "";
	}
};
ExpertPluginService = require_common$2.__decorate([(0, import_common$1.Component)(require_workbuddy_auth_product_coordinator.ExpertPluginServiceToken), require_common$2.__decorateMetadata("design:paramtypes", [])], ExpertPluginService);
//#endregion
//#region ../../packages/workbuddy-server/src/net/rest-operations-proxy-interceptor.ts
/**
* App-server RestOperations 代理 + 日志拦截器。
*
* 给 app-server CellJS 容器里的默认 `RestOperations`（`@celljs/http` 的 axios 实例）挂上：
*   1. 请求拦截器：按目标 URL 挂 httpsAgent/httpAgent，解决 HTTPS/HTTP 请求走代理的问题；
*      记录起始时间和代理决策；
*   2. 响应拦截器（成功 + 失败）：打一条 `[NetLog] METHOD URL -> proxy=... (status=..., ms=...)`。
*
* 这弥补了 app-server 容器里 **没有** 加载 `@genie/agent-cli` 的 HttpProxyInterceptor 的
* 覆盖空缺。具体失败 case 见 Issue 现场 main.log：
*   - `[Report Service] connect ETIMEDOUT 120.53.101.203:443`（EventService 经 RestOperations）
*   - `[ExternalLinkAuthenticationProvider] fetch auth state error: ETIMEDOUT`
*
* 关于 baseURL：`@genie/product` 的 `ProductEndpointHttpInterceptor` 在运行时用
* `config.baseURL = productManager.getEndpoint()` 动态注入。然而 axios 默认配置
* `legacyInterceptorReqResOrdering=true`，拦截器执行顺序是 **注册倒序** —— 本模块
* 作为 workbuddyModule autoBind 最后注册，实际 **最先** 执行，那时 `config.baseURL`
* 还没被 Product 拦截器填上，`resolveTargetUrl` 会拿到一个相对路径 `/v2/xxx`，URL
* 解析失败 → `shouldBypassProxy` 保守返回 true → 不挂代理 → 直连超时。
*
* 修复：在 `resolveTargetUrl` 中 fallback 到 `ContainerUtil.get(ProductManager).getEndpoint()`
* （与 `ProductEndpointHttpInterceptor` 的做法一致）。
*/
require_common$2.init_common$3();
require_common$2.init_decorateMetadata();
require_common$2.init_decorate();
var _ref$4;
var NET_LOG_KEY = "__workbuddyNetLog";
function getProductEndpointSafely() {
	try {
		return import_common$1.ContainerUtil.get(require_common$2.ProductManager)?.getEndpoint?.() || "";
	} catch {
		return "";
	}
}
function resolveTargetUrl(config) {
	const url = config.url || "";
	if (/^https?:\/\//i.test(url)) return url;
	const base = config.baseURL || getProductEndpointSafely();
	if (!base) return url;
	if (!url) return base;
	return `${base.endsWith("/") ? base.slice(0, -1) : base}${url.startsWith("/") ? url : `/${url}`}`;
}
var WorkbuddyRestOperationsProxyInterceptor = class WorkbuddyRestOperationsProxyInterceptor {
	restOperations;
	async initialize() {
		this.restOperations.interceptors.request.use((config) => {
			const typed = config;
			try {
				const targetUrl = resolveTargetUrl(typed);
				if (targetUrl) {
					const { httpAgent, httpsAgent } = require_net_log.getAxiosAgentsForUrl(targetUrl);
					if (httpAgent) typed.httpAgent = httpAgent;
					if (httpsAgent) typed.httpsAgent = httpsAgent;
					typed[NET_LOG_KEY] = {
						startedAt: Date.now(),
						method: (typed.method || "GET").toUpperCase(),
						url: targetUrl,
						proxy: require_net_log.describeProxyForLog(targetUrl)
					};
				}
			} catch {}
			return typed;
		});
		this.restOperations.interceptors.response.use((response) => {
			const slot = response.config[NET_LOG_KEY];
			if (slot) require_net_log.logNetRequest({
				method: slot.method,
				url: slot.url,
				proxy: slot.proxy,
				status: response.status,
				durationMs: Date.now() - slot.startedAt,
				source: "RestOperations"
			});
			return response;
		}, (error) => {
			const slot = error?.config ? error.config[NET_LOG_KEY] : void 0;
			if (slot) require_net_log.logNetRequest({
				method: slot.method,
				url: slot.url,
				proxy: slot.proxy,
				status: error?.response?.status,
				durationMs: Date.now() - slot.startedAt,
				error,
				source: "RestOperations"
			});
			return Promise.reject(error);
		});
	}
};
require_common$2.__decorate([(0, import_common$1.Autowired)(import_common.RestOperations), require_common$2.__decorateMetadata("design:type", typeof (_ref$4 = typeof import_common.RestOperations !== "undefined" && import_common.RestOperations) === "function" ? _ref$4 : Object)], WorkbuddyRestOperationsProxyInterceptor.prototype, "restOperations", void 0);
WorkbuddyRestOperationsProxyInterceptor = require_common$2.__decorate([(0, import_common$1.Component)(import_common$1.ApplicationLifecycle)], WorkbuddyRestOperationsProxyInterceptor);
//#endregion
//#region ../../packages/workbuddy-server/src/net/tls-verification-interceptor.ts
/**
* App-server TLS 证书校验开关拦截器。
*
* 随 app-server CellJS 容器装配（daemon 模式跑在 daemon 进程、legacy 模式跑在主进程），
* 注入 `ProductManager`，在 `initialize()`：
*   1. 抑制 `NODE_TLS_REJECT_UNAUTHORIZED` 噪声告警；
*   2. 读取当前 `productFeatures.DisableTlsVerification` 并应用一次（覆盖本地配置）；
*   3. 订阅 `configuration` 变更（远端 `/v3/config` overlay 经 `publishResolvedConfiguration()`
*      发布后触发），命中即应用（承载服务端下发 + 运行期变更）。
*
* 这是「服务端下发」的主路径，与 bootstrap 阶段的早期同步注入互补：bootstrap 覆盖 CellJS/远端
* 就绪前的最早请求，本拦截器覆盖容器就绪后的本地/远端配置。
*
* env 为进程级全局且方向不可逆（false→true 即生效并保持），运行期不主动回退为 '1'，
* 与 CLI 的一次性 `initialize` 行为一致，避免半途切换造成连接抖动。
*
* 结构参考 `rest-operations-proxy-interceptor.ts`。
*/
require_common$2.init_common$3();
require_common$2.init_decorateMetadata();
require_common$2.init_decorate();
var _ref$3;
var DISABLE_REASON = "ProductFeature.DisableTlsVerification";
var WorkbuddyTlsVerificationInterceptor = class WorkbuddyTlsVerificationInterceptor {
	productManager;
	async initialize() {
		require_workbuddy_auth_product_coordinator.suppressTlsRejectWarning();
		this.applyFromConfiguration();
		this.productManager.configuration.subscribe(() => {
			this.applyFromConfiguration();
		});
	}
	/** 读取当前配置，命中开关则幂等关闭 TLS 校验。 */
	applyFromConfiguration() {
		if ((this.productManager.configuration.getValue() || {}).productFeatures?.[require_common$2.ProductFeature.DisableTlsVerification]) require_workbuddy_auth_product_coordinator.disableTlsVerificationForProcess(DISABLE_REASON);
	}
};
require_common$2.__decorate([(0, import_common$1.Autowired)(require_common$2.ProductManager), require_common$2.__decorateMetadata("design:type", typeof (_ref$3 = typeof require_common$2.ProductManager !== "undefined" && require_common$2.ProductManager) === "function" ? _ref$3 : Object)], WorkbuddyTlsVerificationInterceptor.prototype, "productManager", void 0);
WorkbuddyTlsVerificationInterceptor = require_common$2.__decorate([(0, import_common$1.Component)(import_common$1.ApplicationLifecycle)], WorkbuddyTlsVerificationInterceptor);
//#endregion
//#region ../../packages/workbuddy-server/src/runtime/custom-models-product-provider.ts
require_common$2.init_common$5();
require_common$2.init_common$3();
require_common$2.init_common$4();
require_common$2.init_decorateMetadata();
require_common$2.init_decorate();
var _ref$2, _ref2$2, _ref3$1, _ref4$1, _WorkbuddyCustomModelsProductProvider;
var MODEL_TAG_CUSTOM = "custom";
var baseProductConfigurationProvider;
function setWorkbuddyCustomModelsBaseProductConfigurationProvider(provider) {
	baseProductConfigurationProvider = provider;
}
var WorkbuddyCustomModelsProductProvider = class WorkbuddyCustomModelsProductProvider {
	static {
		_WorkbuddyCustomModelsProductProvider = this;
	}
	priority = require_common$2.ProductProviderPriority.ENV - 1e3;
	fs;
	logger;
	policyService;
	productManager;
	listenerRegistered = false;
	lastAllowed;
	fileWatcher;
	fileWatcherPath;
	debounceSyncTimer;
	static FILE_WATCH_DEBOUNCE_MS = 1e3;
	async provide(ctx) {
		if (!this.fs) return {};
		if (!ctx.current.productFeatures?.[require_common$2.ProductFeature.CustomModelsJSON]) {
			this.logger.info("disable use custom model");
			return {};
		}
		this.ensurePolicyListener();
		if (this.policyService) {
			const policy = this.policyService.getCachedSnapshot();
			if (!policy) {
				this.policyService.scheduleRefresh();
				this.lastAllowed = true;
			} else {
				this.lastAllowed = policy.allowed;
				if (!policy.allowed) {
					this.logger.info(`[CustomModelsProvider] policy disallow: reason=${policy.reason} mode=${policy.policy_mode} source=${policy.source}; skipping local custom models`);
					return {};
				}
			}
		}
		const userConfigPath = this.getUserConfigPath();
		this.ensureFileWatcher(userConfigPath);
		try {
			if (!this.fs.existsSync(userConfigPath)) return {};
			const content = this.fs.readFileSync(userConfigPath, { encoding: "utf-8" });
			const parsed = JSON.parse(content.toString());
			const { models: rawModels, availableModels: rawAvailableModels } = this.extractUserConfig(parsed);
			const models = rawModels.map((model) => this.normalizeCustomModel(model));
			if (ctx.current.productFeatures?.[require_common$2.ProductFeature.CustomModelIdPrefix]) {
				for (const model of models) if (typeof model.id === "string" && !model.id.startsWith("custom-local:")) model.id = `${require_common$2.CUSTOM_LOCAL_MODEL_PREFIX}${model.id}`;
			}
			this.logger.info(`Loaded custom models config from user: ${userConfigPath} (entries=${models.length})`);
			if (Array.isArray(rawAvailableModels)) {
				const shouldPrefixId = !!ctx.current.productFeatures?.[require_common$2.ProductFeature.CustomModelIdPrefix];
				let mergedAvailableModels = rawAvailableModels;
				if (shouldPrefixId) {
					const prefixedIds = rawAvailableModels.filter((id) => !id.startsWith(require_common$2.CUSTOM_LOCAL_MODEL_PREFIX)).map((id) => `${require_common$2.CUSTOM_LOCAL_MODEL_PREFIX}${id}`);
					mergedAvailableModels = Array.from(new Set([...rawAvailableModels, ...prefixedIds]));
				}
				return {
					models,
					availableModels: mergedAvailableModels,
					mergeStrategy: require_common$2.MergeStrategy.SmartMerge
				};
			}
			const currentAvailable = ctx.current.availableModels;
			if (Array.isArray(currentAvailable) && currentAvailable.length > 0) {
				const customIds = this.collectCustomModelIds(models);
				return {
					models,
					availableModels: Array.from(new Set([...currentAvailable, ...customIds])),
					mergeStrategy: require_common$2.MergeStrategy.SmartMerge
				};
			}
			return {
				models,
				mergeStrategy: require_common$2.MergeStrategy.SmartMerge
			};
		} catch (error) {
			this.logger.error(`Failed to load user-level custom models configuration from ${userConfigPath}`, error);
			return {};
		}
	}
	extractUserConfig(parsed) {
		if (Array.isArray(parsed)) return {
			models: parsed,
			availableModels: void 0
		};
		if (parsed !== null && typeof parsed === "object") {
			const obj = parsed;
			return {
				models: Array.isArray(obj.models) ? obj.models : [],
				availableModels: Array.isArray(obj.availableModels) ? obj.availableModels.filter((item) => typeof item === "string") : void 0
			};
		}
		return {
			models: [],
			availableModels: void 0
		};
	}
	collectCustomModelIds(models) {
		const ids = [];
		for (const model of models) {
			const rawId = model.id;
			if (typeof rawId !== "string") continue;
			const trimmed = rawId.trim();
			if (trimmed.length > 0) ids.push(trimmed);
		}
		return ids;
	}
	getUserConfigPath() {
		const configuredDir = process.env.WORKBUDDY_CONFIG_DIR?.trim() || process.env.CODEBUDDY_CONFIG_DIR?.trim();
		if (configuredDir) return node_path.join(configuredDir, "models.json");
		const dataFolderName = baseProductConfigurationProvider?.()?.dataFolderName;
		if (typeof dataFolderName === "string" && dataFolderName.trim()) return node_path.join((0, node_os.homedir)(), dataFolderName.trim(), "models.json");
		return node_path.join(require_runtime_context.getWorkbuddyRuntimeConfigDir(), "models.json");
	}
	normalizeCustomModel(model) {
		const normalizedModel = {
			disabled: false,
			...model
		};
		const tags = Array.isArray(normalizedModel.tags) ? [...normalizedModel.tags] : [];
		if (!tags.includes(MODEL_TAG_CUSTOM)) tags.push(MODEL_TAG_CUSTOM);
		normalizedModel.tags = tags;
		if (normalizedModel.apiKey) normalizedModel.apiKey = require_common$2.EnvUtils.resolveEnvVariables(normalizedModel.apiKey);
		if (normalizedModel.url) normalizedModel.url = require_common$2.EnvUtils.resolveEnvVariables(normalizedModel.url);
		return normalizedModel;
	}
	ensureFileWatcher(filePath) {
		if (this.fileWatcher && this.fileWatcherPath === filePath) return;
		if (this.fileWatcher) {
			this.fileWatcher.close();
			this.fileWatcher = void 0;
		}
		try {
			const dir = node_path.dirname(filePath);
			const basename = node_path.basename(filePath);
			this.fileWatcher = (0, node_fs.watch)(dir, (_, filename) => {
				if (filename === basename) this.debounceSyncForFileChange();
			});
			this.fileWatcher.on("error", () => {
				this.fileWatcher?.close();
				this.fileWatcher = void 0;
			});
			this.fileWatcherPath = filePath;
			this.logger.info(`[CustomModelsProvider] watching ${filePath} for changes`);
		} catch {}
	}
	debounceSyncForFileChange() {
		if (this.debounceSyncTimer) clearTimeout(this.debounceSyncTimer);
		this.debounceSyncTimer = setTimeout(() => {
			const productManager = this.productManager ?? (() => {
				try {
					return import_common$1.ContainerUtil.get(require_common$2.ProductManager);
				} catch {
					return;
				}
			})();
			if (!productManager) return;
			this.logger.info("[CustomModelsProvider] models.json changed, triggering sync");
			productManager.sync(true).catch((error) => {
				this.logger.warn(`[CustomModelsProvider] sync after file change failed: ${String(error)}`);
			});
		}, _WorkbuddyCustomModelsProductProvider.FILE_WATCH_DEBOUNCE_MS);
	}
	ensurePolicyListener() {
		if (this.listenerRegistered || !this.policyService) return;
		this.listenerRegistered = true;
		this.policyService.onChanged((snapshot) => {
			if (this.lastAllowed === void 0 || this.lastAllowed === snapshot.allowed) return;
			this.lastAllowed = snapshot.allowed;
			(this.productManager ?? (() => {
				try {
					return import_common$1.ContainerUtil.get(require_common$2.ProductManager);
				} catch {
					return;
				}
			})())?.sync(true).catch((error) => {
				this.logger.warn(`[CustomModelsProvider] productManager.sync failed: ${String(error)}`);
			});
		});
	}
};
require_common$2.__decorate([
	(0, import_common$1.Autowired)(require_common$2.FileSystem),
	(0, import_common$1.Optional)(),
	require_common$2.__decorateMetadata("design:type", typeof (_ref$2 = typeof require_common$2.FileSystem !== "undefined" && require_common$2.FileSystem) === "function" ? _ref$2 : Object)
], WorkbuddyCustomModelsProductProvider.prototype, "fs", void 0);
require_common$2.__decorate([(0, import_common$1.Autowired)(import_common$1.Logger), require_common$2.__decorateMetadata("design:type", typeof (_ref2$2 = typeof import_common$1.Logger !== "undefined" && import_common$1.Logger) === "function" ? _ref2$2 : Object)], WorkbuddyCustomModelsProductProvider.prototype, "logger", void 0);
require_common$2.__decorate([
	(0, import_common$1.Autowired)(require_workbuddy_auth_product_coordinator.MemberCustomModelPolicyServiceToken),
	(0, import_common$1.Optional)(),
	require_common$2.__decorateMetadata("design:type", typeof (_ref3$1 = typeof require_workbuddy_auth_product_coordinator.MemberCustomModelPolicyService !== "undefined" && require_workbuddy_auth_product_coordinator.MemberCustomModelPolicyService) === "function" ? _ref3$1 : Object)
], WorkbuddyCustomModelsProductProvider.prototype, "policyService", void 0);
require_common$2.__decorate([
	(0, import_common$1.Autowired)(require_common$2.ProductManager),
	(0, import_common$1.Optional)(),
	require_common$2.__decorateMetadata("design:type", typeof (_ref4$1 = typeof require_common$2.ProductManager !== "undefined" && require_common$2.ProductManager) === "function" ? _ref4$1 : Object)
], WorkbuddyCustomModelsProductProvider.prototype, "productManager", void 0);
WorkbuddyCustomModelsProductProvider = _WorkbuddyCustomModelsProductProvider = require_common$2.__decorate([(0, import_common$1.Component)(require_common$2.ProductProvider)], WorkbuddyCustomModelsProductProvider);
//#endregion
//#region src/main/system/runtime/workspace.ts
require_workbuddy_product_config.init_bundled_assets();
require_dev_env_override.init_dev_env_override();
require_workbuddy_product_config.init_workbuddy_product_config();
require_common$2.init_common$4();
require_common$2.init_decorate();
var WorkbuddyDesktopWorkspace = class WorkbuddyDesktopWorkspace {
	folders = [{
		uri: require_common$2.URI.file(path.join(os.homedir(), "workbuddyMainThread")),
		name: "WorkbuddyDesktop",
		index: 0
	}];
	get workspaceFolders() {
		return this.folders;
	}
};
WorkbuddyDesktopWorkspace = require_common$2.__decorate([(0, import_common$1.Component)({
	id: require_common$2.Workspace,
	rebind: true
})], WorkbuddyDesktopWorkspace);
//#endregion
//#region src/main/system/runtime/workbuddy-enterprise-models-product-provider.ts
require_common$2.init_common();
require_common$2.init_common$5();
require_common$2.init_common$3();
require_common$2.init_common$4();
require_common$2.init_decorateMetadata();
require_common$2.init_decorate();
var _ref$1, _ref2$1, _ref3, _ref4, _WorkbuddyEnterpriseModelsProductProvider;
var DEFAULT_MODELS_PATH = "/console/enterprises/{enterpriseId}/config/models";
var ADMIN_MODEL_TYPE_CHAT = "chat";
/** 企业模型 last-good 持久化 key（localStorage entry），按 uid+enterpriseId+endpoint 分片存数组 */
var ENTERPRISE_MODELS_LAST_GOOD_KEY = "workbuddy_enterprise_models_last_good";
/** last-good 分片 LRU 上限，与 CloudProductManager disk cache 对齐 */
var ENTERPRISE_MODELS_LAST_GOOD_MAX = 20;
var WorkbuddyEnterpriseModelsProductProvider = class WorkbuddyEnterpriseModelsProductProvider {
	static {
		_WorkbuddyEnterpriseModelsProductProvider = this;
	}
	priority = require_common$2.ProductProviderPriority.MODELS;
	restOperations;
	authenticationManager;
	logger;
	/**
	* 跨进程 last-good 存储（issue #59223 Batch 2）。@Optional 注入：headless / 单测
	* 不注入时退回纯进程内行为（warm/persist 均 no-op），不影响主链路。
	*/
	localStorage;
	init() {
		this.authenticationManager?.currentSessionSubject.subscribe((session) => {
			const enterpriseId = session?.account?.enterpriseId;
			if (enterpriseId && !this.hasTriggeredSyncForEnterprise) {
				this.hasTriggeredSyncForEnterprise = true;
				this.logger.info(`[WorkbuddyEnterpriseModels] enterpriseId became available: ${enterpriseId}, triggering sync`);
				setImmediate(() => {
					import_common$1.ContainerUtil.get(require_common$2.ProductManager)?.sync(true);
				});
			}
		});
	}
	hasTriggeredSyncForEnterprise = false;
	/**
	* 已尝试从磁盘 warm 的 last-good key。
	* - 同一 key 只读一次盘，避免每次 provide 命中 IO。
	* - key 变化（切租户 / 切 endpoint）时清空内存 cachedResult，防止旧租户结果串用。
	*/
	lastWarmedKey;
	/**
	* 上一次成功获取的配置。API 失败/空响应时复用此结果作为兜底，
	* 避免 merge 后配置抖动让 ProductManager 反复判定变更，
	* 也避免企业模型从客户端模型列表里短暂"消失"（issue #52373）。
	*/
	cachedResult;
	/**
	* 失败/空响应后的退避截止时间。在此时间之前直接复用上一份结果，
	* 不再重打接口。force 同步（如 enterpriseId 就绪后的显式重试）可绕过退避。
	*/
	retryBackoffUntil = 0;
	/** 连续失败次数，用于指数退避 */
	consecutiveFailures = 0;
	/** 失败退避最小间隔 30s */
	static MIN_FAILURE_BACKOFF_MS = 30 * 1e3;
	/** 失败退避最大间隔 5min */
	static MAX_FAILURE_BACKOFF_MS = 300 * 1e3;
	async provide(ctx) {
		if (!this.restOperations || !this.authenticationManager) return {};
		const session = this.authenticationManager.currentSessionSubject.value;
		const enterpriseId = session?.account?.enterpriseId;
		this.logger.info(`[WorkbuddyEnterpriseModels] enterpriseId: ${enterpriseId || "undefined"}, endpoint: ${ctx.current?.endpoint}`);
		if (!enterpriseId) return {};
		const endpoint = require_dev_env_override.resolveEndpointOverride() ?? ctx.current?.endpoint;
		if (!endpoint) {
			this.logger.warn("[WorkbuddyEnterpriseModels] endpoint is missing, skipping API call");
			return {};
		}
		const lastGoodKey = this.buildLastGoodKey(session?.account?.uid, enterpriseId, endpoint);
		await this.warmLastGoodFromDisk(lastGoodKey);
		if (!ctx.force && Date.now() < this.retryBackoffUntil) {
			this.logger.debug("[WorkbuddyEnterpriseModels] in failure backoff window, reusing last result");
			return this.getFallbackResult();
		}
		const modelsUrl = DEFAULT_MODELS_PATH.replace("{enterpriseId}", enterpriseId);
		try {
			const url = new URL(modelsUrl, endpoint);
			const res = await this.restOperations.get(url.href, {
				baseURL: endpoint,
				timeout: 5e3
			});
			if (res?.data?.data?.length) {
				const models = res.data.data.map((model) => ({
					...model,
					modelType: model.id?.startsWith("custom:") ? "enterprise" : "built-in"
				}));
				this.logger.info(`[WorkbuddyEnterpriseModels] Got ${models.length} models from API`);
				const result = this.processModelAgentRelations(ctx.current, models);
				this.cachedResult = result;
				this.consecutiveFailures = 0;
				this.retryBackoffUntil = 0;
				this.persistLastGood(lastGoodKey, result);
				return result;
			}
			this.logger.warn("[WorkbuddyEnterpriseModels] API returned empty or invalid data");
			this.applyFailureBackoff();
			return this.getFallbackResult();
		} catch (error) {
			this.logger.error(`[WorkbuddyEnterpriseModels] API call failed: ${error}`);
			this.applyFailureBackoff();
			return this.getFallbackResult();
		}
	}
	/**
	* 兜底结果：优先复用上一份成功获取的配置，避免空响应/异常导致 merge 后
	* 配置抖动、企业模型短暂消失。没有缓存时（首次启动等）返回空对象，
	* 维持 4.22.16 上原有的 `return {}` 语义。
	*/
	getFallbackResult() {
		return this.cachedResult ?? {};
	}
	/**
	* 构建企业模型 last-good 的稳定 hash key：uid + enterpriseId + endpoint。
	* - 含 enterpriseId → 天然防串租户；含 endpoint → 防串环境。
	* - md5 后存储，不在明文 key 中暴露身份/域名，且不含 token。
	* - uid 缺失（未登录早期）返回 undefined → warm/persist 均 no-op，退回纯进程内行为。
	*/
	buildLastGoodKey(uid, enterpriseId, endpoint) {
		if (!uid) return;
		return require_common$2.HashUtils.md5([
			uid,
			enterpriseId,
			endpoint
		].join("|"));
	}
	/**
	* 进程内 cachedResult 为空时，从磁盘按 key 读回一次企业模型 last-good 暖到内存。
	* - lastWarmedKey 去重：同一 key 只读一次盘，避免每次 provide 命中 IO。
	* - 切 key（切租户 / 切 endpoint）时先清空内存 cachedResult，防止旧租户结果串用，
	*   再尝试读新 key 的 last-good。
	* - 读失败仅 warn，不阻断主链路。
	*/
	async warmLastGoodFromDisk(key) {
		if (!key || !this.localStorage) return;
		if (this.lastWarmedKey === key) return;
		this.lastWarmedKey = key;
		this.cachedResult = void 0;
		try {
			const item = (await this.localStorage.get(ENTERPRISE_MODELS_LAST_GOOD_KEY, []) ?? []).find((i) => i.key === key);
			if (item?.data) {
				this.cachedResult = item.data;
				this.logger.info(`[WorkbuddyEnterpriseModels] warmed last-good from disk (models=${item.data.models?.length ?? 0})`);
			}
		} catch (error) {
			this.logger.warn(`[WorkbuddyEnterpriseModels] read last-good from disk failed: ${String(error)}`);
		}
	}
	/**
	* API 权威成功后把企业模型配置写盘做 last-good。
	* - 内容 hash 去重：与同 key 已存内容一致则跳过写，避免重复 IO。
	* - LRU 截断到 {@link ENTERPRISE_MODELS_LAST_GOOD_MAX}。
	* - 异步写、写失败仅 warn，不阻断主链路。
	* - 企业模型配置不含 token，写盘安全（不持久化任何身份凭证）。
	*/
	persistLastGood(key, data) {
		if (!key || !this.localStorage) return;
		this.writeLastGoodToDisk(this.localStorage, key, data).catch((error) => {
			this.logger.warn(`[WorkbuddyEnterpriseModels] persist last-good failed: ${String(error)}`);
		});
	}
	async writeLastGoodToDisk(storage, key, data) {
		const hash = require_common$2.HashUtils.md5(JSON.stringify(data));
		const arr = await storage.get(ENTERPRISE_MODELS_LAST_GOOD_KEY, []) ?? [];
		const idx = arr.findIndex((i) => i.key === key);
		if (idx !== -1 && arr[idx].hash === hash) return;
		if (idx !== -1) arr.splice(idx, 1);
		arr.push({
			key,
			hash,
			data,
			ts: Date.now()
		});
		while (arr.length > ENTERPRISE_MODELS_LAST_GOOD_MAX) arr.shift();
		await storage.set(ENTERPRISE_MODELS_LAST_GOOD_KEY, arr);
	}
	/**
	* 记录一次失败/空响应并设置指数退避截止时间（30s ~ 5min）。
	*/
	applyFailureBackoff() {
		this.consecutiveFailures += 1;
		const backoff = Math.min(_WorkbuddyEnterpriseModelsProductProvider.MIN_FAILURE_BACKOFF_MS * 2 ** (this.consecutiveFailures - 1), _WorkbuddyEnterpriseModelsProductProvider.MAX_FAILURE_BACKOFF_MS);
		this.retryBackoffUntil = Date.now() + backoff;
		this.logger.warn(`[WorkbuddyEnterpriseModels] backing off model API for ${backoff}ms after ${this.consecutiveFailures} consecutive failure(s)`);
	}
	processModelAgentRelations(config, models) {
		const agents = config.agents ? config.agents.map((a) => ({
			...a,
			models: []
		})) : [];
		const taggedModels = models.map((model) => ({
			...model,
			modelType: model.id?.startsWith("custom:") ? "enterprise" : "built-in"
		}));
		for (const model of taggedModels) if ((model.tags ?? []).includes(ADMIN_MODEL_TYPE_CHAT)) {
			for (const agent of agents) if (!agent.models.includes(model.id)) agent.models.unshift(model.id);
		}
		return {
			mergeStrategy: require_common$2.MergeStrategy.DeepSmartMerge,
			models: taggedModels,
			agents
		};
	}
};
require_common$2.__decorate([
	(0, import_common$1.Autowired)(import_common.RestOperations),
	(0, import_common$1.Optional)(),
	require_common$2.__decorateMetadata("design:type", typeof (_ref$1 = typeof import_common.RestOperations !== "undefined" && import_common.RestOperations) === "function" ? _ref$1 : Object)
], WorkbuddyEnterpriseModelsProductProvider.prototype, "restOperations", void 0);
require_common$2.__decorate([
	(0, import_common$1.Autowired)(require_common$2.AuthenticationManager),
	(0, import_common$1.Optional)(),
	require_common$2.__decorateMetadata("design:type", typeof (_ref2$1 = typeof require_common$2.AuthenticationManager !== "undefined" && require_common$2.AuthenticationManager) === "function" ? _ref2$1 : Object)
], WorkbuddyEnterpriseModelsProductProvider.prototype, "authenticationManager", void 0);
require_common$2.__decorate([(0, import_common$1.Autowired)(import_common$1.Logger), require_common$2.__decorateMetadata("design:type", typeof (_ref3 = typeof import_common$1.Logger !== "undefined" && import_common$1.Logger) === "function" ? _ref3 : Object)], WorkbuddyEnterpriseModelsProductProvider.prototype, "logger", void 0);
require_common$2.__decorate([
	(0, import_common$1.Autowired)(require_common$2.LocalStorage),
	(0, import_common$1.Optional)(),
	require_common$2.__decorateMetadata("design:type", typeof (_ref4 = typeof require_common$2.LocalStorage !== "undefined" && require_common$2.LocalStorage) === "function" ? _ref4 : Object)
], WorkbuddyEnterpriseModelsProductProvider.prototype, "localStorage", void 0);
require_common$2.__decorate([
	(0, import_common$1.PostConstruct)(),
	require_common$2.__decorateMetadata("design:type", Function),
	require_common$2.__decorateMetadata("design:paramtypes", []),
	require_common$2.__decorateMetadata("design:returntype", void 0)
], WorkbuddyEnterpriseModelsProductProvider.prototype, "init", null);
WorkbuddyEnterpriseModelsProductProvider = _WorkbuddyEnterpriseModelsProductProvider = require_common$2.__decorate([(0, import_common$1.Component)(require_common$2.ProductProvider)], WorkbuddyEnterpriseModelsProductProvider);
//#endregion
//#region src/main/system/runtime/workbuddy-file-local-storage.ts
require_common$2.init_common$5();
require_common$2.init_common$4();
require_common$2.init_decorateMetadata();
require_common$2.init_decorate();
var LOCAL_STORAGE_FOLDER = "local_storage";
var ENTRY_PREFIX = "wb_entry_";
var ENTRY_EXT = ".info";
var logger = require_logger.createWorkbuddyScopedLogger("WorkbuddyFileLocalStorage");
var WorkbuddyFileLocalStorage = class WorkbuddyFileLocalStorage {
	emitter = new import_common$1.Emitter();
	changeEvent = this.emitter.event;
	init() {
		logger.info(`initialized, storageRoot=${this.resolveStorageRoot()}`);
	}
	async set(key, value) {
		const entryPath = this.resolveEntryPath(key);
		const entryDir = path.default.dirname(entryPath);
		try {
			if (!fs.existsSync(entryDir)) fs.mkdirSync(entryDir, { recursive: true });
			fs.writeFileSync(entryPath, JSON.stringify(value));
			logger.info(`set succeeded, keyHash=${this.resolveKeyHash(key)}`);
			this.emitter.fire({ domain: key });
		} catch (error) {
			logger.error(`set failed, keyHash=${this.resolveKeyHash(key)}, error=${this.formatError(error)}`);
			throw error;
		}
	}
	getSync(key, defaultValue) {
		const entryPath = this.resolveEntryPath(key);
		const keyHash = this.resolveKeyHash(key);
		try {
			if (!fs.existsSync(entryPath)) {
				logger.info(`get missed, keyHash=${keyHash}`);
				return defaultValue;
			}
			const content = fs.readFileSync(entryPath, { encoding: "utf-8" });
			try {
				logger.info(`get hit, keyHash=${keyHash}`);
				return JSON.parse(content.toString());
			} catch (error) {
				logger.warn(`get failed to parse cache, keyHash=${keyHash}, error=${this.formatError(error)}`);
				return defaultValue;
			}
		} catch (error) {
			logger.warn(`get failed, keyHash=${keyHash}, error=${this.formatError(error)}`);
			return defaultValue;
		}
	}
	async get(key, defaultValue) {
		return this.getSync(key, defaultValue);
	}
	async remove(key) {
		const entryPath = this.resolveEntryPath(key);
		const keyHash = this.resolveKeyHash(key);
		try {
			if (fs.existsSync(entryPath)) fs.rmSync(entryPath);
			logger.info(`remove succeeded, keyHash=${keyHash}`);
			this.emitter.fire({ domain: key });
		} catch (error) {
			logger.error(`remove failed, keyHash=${keyHash}, error=${this.formatError(error)}`);
			throw error;
		}
	}
	resolveEntryPath(key) {
		return path.default.join(this.resolveStorageRoot(), `${ENTRY_PREFIX}${this.resolveKeyHash(key)}${ENTRY_EXT}`);
	}
	resolveStorageRoot() {
		return path.default.join(this.resolveHomeDir(), LOCAL_STORAGE_FOLDER);
	}
	resolveHomeDir() {
		return process.env.WORKBUDDY_CONFIG_DIR?.trim() || path.default.join(os.homedir(), this.getDefaultConfigDirname());
	}
	resolveKeyHash(key) {
		return require_common$2.HashUtils.md5(key);
	}
	formatError(error) {
		return error instanceof Error ? error.message : String(error);
	}
	getDefaultConfigDirname() {
		const dataFolderName = require_workbuddy_product_config.tryGetWorkbuddyBaseProductConfiguration()?.dataFolderName;
		if (typeof dataFolderName === "string" && dataFolderName.trim()) return dataFolderName;
		return ".workbuddy";
	}
};
require_common$2.__decorate([
	(0, import_common$1.PostConstruct)(),
	require_common$2.__decorateMetadata("design:type", Function),
	require_common$2.__decorateMetadata("design:paramtypes", []),
	require_common$2.__decorateMetadata("design:returntype", void 0)
], WorkbuddyFileLocalStorage.prototype, "init", null);
WorkbuddyFileLocalStorage = require_common$2.__decorate([(0, import_common$1.Component)({
	id: require_common$2.LocalStorage,
	rebind: true
})], WorkbuddyFileLocalStorage);
//#endregion
//#region src/main/system/runtime/workbuddy-product-env-service.ts
require_common$2.init_common();
require_common$2.init_common$3();
require_workbuddy_product_config.init_workbuddy_product_config();
require_common$2.init_decorateMetadata();
require_common$2.init_decorate();
var _ref, _ref2;
var WorkbuddyProductEnvService = class WorkbuddyProductEnvService {
	logger;
	productManager;
	lastSwitchedEnv;
	init() {
		this.logger.setContext("WorkbuddyProductEnvService");
		const currentEnv = process.env[require_common$2.ENV_KEY_CODEBUDDY_COPILOT_INTERNET_ENVIRONMENT];
		if (currentEnv) {
			this.lastSwitchedEnv = currentEnv;
			return;
		}
		const resolvedEnv = require_workbuddy_product_config.resolveWorkbuddyProductEnvironmentFromSessionFile();
		if (resolvedEnv) {
			process.env[require_common$2.ENV_KEY_CODEBUDDY_COPILOT_INTERNET_ENVIRONMENT] = resolvedEnv;
			this.lastSwitchedEnv = resolvedEnv;
		}
	}
	async switch(env) {
		if (env) {
			if (env === this.lastSwitchedEnv && process.env["CODEBUDDY_COPILOT_INTERNET_ENVIRONMENT"] === env) return;
			this.lastSwitchedEnv = env;
			process.env[require_common$2.ENV_KEY_CODEBUDDY_COPILOT_INTERNET_ENVIRONMENT] = env;
			return;
		}
		this.lastSwitchedEnv = void 0;
		delete process.env[require_common$2.ENV_KEY_CODEBUDDY_COPILOT_INTERNET_ENVIRONMENT];
	}
	async switchBySession(session) {
		const coordinator = this.getCoordinator();
		const resolvedEnv = session ? coordinator.resolveEnvironment(session, this.productManager.configuration.getValue()) : void 0;
		await this.switch(resolvedEnv);
		coordinator.publishResolvedSnapshot(session, this.productManager.configuration.getValue(), "product-env-switch");
	}
	async getCurrent() {
		const currentEnv = process.env[require_common$2.ENV_KEY_CODEBUDDY_COPILOT_INTERNET_ENVIRONMENT];
		if (currentEnv) return currentEnv;
		const session = import_common$1.ContainerUtil.get(require_common$2.AuthenticationManager).currentSessionSubject.getValue();
		return this.getCoordinator().getResolvedSnapshot(this.productManager.configuration.getValue(), session).networkEnvironment;
	}
	getCoordinator() {
		return import_common$1.ContainerUtil.get(require_workbuddy_auth_product_coordinator.WorkbuddyAuthProductCoordinator);
	}
};
require_common$2.__decorate([(0, import_common$1.Autowired)(import_common$1.Logger), require_common$2.__decorateMetadata("design:type", typeof (_ref = typeof import_common$1.Logger !== "undefined" && import_common$1.Logger) === "function" ? _ref : Object)], WorkbuddyProductEnvService.prototype, "logger", void 0);
require_common$2.__decorate([(0, import_common$1.Autowired)(require_common$2.ProductManager), require_common$2.__decorateMetadata("design:type", typeof (_ref2 = typeof require_common$2.ProductManager !== "undefined" && require_common$2.ProductManager) === "function" ? _ref2 : Object)], WorkbuddyProductEnvService.prototype, "productManager", void 0);
require_common$2.__decorate([
	(0, import_common$1.PostConstruct)(),
	require_common$2.__decorateMetadata("design:type", Function),
	require_common$2.__decorateMetadata("design:paramtypes", []),
	require_common$2.__decorateMetadata("design:returntype", void 0)
], WorkbuddyProductEnvService.prototype, "init", null);
WorkbuddyProductEnvService = require_common$2.__decorate([(0, import_common$1.Component)({
	id: require_common$2.ProductEnvService,
	rebind: true
})], WorkbuddyProductEnvService);
//#endregion
//#region src/main/system/runtime/index.ts
require_dev_env_override.init_dev_env_override();
require_workbuddy_product_config.init_workbuddy_product_config();
if (process.env.NODE_ENV === "development" || require_dev_env_override.isDevEnvSwitchBuildEnabled()) require_dev_env_override.forceEnableDevEnvOverride();
require_file_authentication_storage.setWorkbuddyAuthenticationConfigurationProvider(require_workbuddy_product_config.getWorkbuddyAuthenticationConfiguration);
setWorkbuddyAuthDevEnvProvider({
	isOverrideEnabled: require_dev_env_override.isDevEnvOverrideEnabled,
	readDevEnv: require_dev_env_override.readDevEnv
});
require_workbuddy_auth_product_coordinator.setConnectorDevEnvProvider({ readDevEnv: require_dev_env_override.readConnectorDevEnv });
setWorkbuddyAuthSessionSyncer((session) => import_common$1.ContainerUtil.get(require_workbuddy_auth_product_coordinator.WorkbuddyAuthProductCoordinator).syncResolvedProduct(session));
require_module_base.setWorkbuddyClientInfoAssetResolver(require_workbuddy_product_config.resolveBundledAsset);
setConnectorBundledAssetResolver(require_workbuddy_product_config.resolveBundledAsset);
setArdotEmbedUrlProvider({ resolveEmbedUrl: require_dev_env_override.resolveArdotEndpoint });
setWorkbuddyCustomModelsBaseProductConfigurationProvider(require_workbuddy_product_config.tryGetWorkbuddyBaseProductConfiguration);
require_module_base.setDevEnvEndpointResolver({ resolve: require_dev_env_override.resolveEndpointOverride });
setConnectorMetricReporter(require_workbuddy_auth_product_coordinator.createMonitorReporter(async () => {
	const { DesktopMonitorService } = await Promise.resolve().then(() => require("./desktop-monitor-service2.js"));
	return DesktopMonitorService.getSharedInstance();
}));
//#endregion
//#region src/main/module.app-server.ts
if (typeof require_module_base.WorkbuddyInternetEnviromentProductProvider !== "function") throw new Error("WorkbuddyInternetEnviromentProductProvider registration is unavailable; check @genie/workbuddy-server subpath export shape");
var workbuddyAppServerModule = require_module_base.createWorkbuddyAutoBindModule();
//#endregion
exports.baseModules = require_module_base.baseModules;
exports.default = workbuddyAppServerModule;
exports.setConnectorMetricReporter = setConnectorMetricReporter;
