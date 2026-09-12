import { n as __esmMin, o as __toCommonJS } from "./chunk-BRZcfu7K.js";
import { Xl as init_services, xc as getFacades } from "./agent-mail-CiuzbR2o.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { C as Excel_default, S as init_folder, _ as init_markdown, a as init_web, b as init_image, c as unknown_default, d as init_ppt, f as ppt_default, g as pdf_default, h as init_pdf, i as webvideo_default, l as init_txt, m as podcast_default, n as word_default, o as web_default, p as init_podcast, r as init_webvideo, s as init_unknown, t as init_word, u as txt_default, v as markdown_default, w as init_Excel, x as folder_default, y as image_default } from "./word-Ccn6X4sP.js";
import { A as LEXIANG_OAUTH_NAME, C as init_constants, D as isVpcEndpointHost, E as deriveLexiangVpcWebOriginFromEndpoint, j as init_lexiang_auth_constants, l as lexiang_auth_store_exports, s as init_lexiang_auth_store, v as LEXIANG_LIBRARY_EMBED_UI_QUERY, w as LEXIANG_WEB_ORIGIN_PROD, y as LEXIANG_PAGE_PREVIEW_UI_QUERY } from "./auth-guide-DhEAKsIJ.js";
import { a as init_tdoc_slide, c as tdoc_mind_default, i as tdoc_smartcanvas_default, l as init_tdoc_folder, n as tdoc_smartsheet_default, o as tdoc_slide_default, r as init_tdoc_smartcanvas, s as init_tdoc_mind, t as init_tdoc_smartsheet, u as tdoc_folder_default } from "./tdoc-smartsheet-BpkxxL4U.js";
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/assets/no-knowledge-base-update.svg
var no_knowledge_base_update_default;
var init_no_knowledge_base_update = __esmMin((() => {
	no_knowledge_base_update_default = "" + new URL("empty-CopzwuXE.svg", import.meta.url).href;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/telemetry.ts
/** iframe 加载完成 */
function reportIframePageShow(adapter) {
	safeReport(adapter, "web_page_show", { pageName: "lexiang_library_iframe" });
}
/** 原生文件列表展示 */
function reportLibraryListPageShow(adapter) {
	safeReport(adapter, "web_page_show", { pageName: "lexiang_library_list" });
}
/** JSAPI 调用成功 */
function reportJsApiSuccess(adapter, method) {
	safeReport(adapter, "web_element_click", {
		pageName: "lexiang",
		elementId: `lexiang_jsapi_${method}_success`,
		elementName: `JSAPI ${method} 成功`
	});
}
/** JSAPI 调用失败 */
function reportJsApiFail(adapter, method) {
	safeReport(adapter, "web_element_click", {
		pageName: "lexiang",
		elementId: `lexiang_jsapi_${method}_fail`,
		elementName: `JSAPI ${method} 失败`
	});
}
/** addKnowledgeTask: hover 方式添加 */
function reportAddToTaskHover(adapter) {
	safeReport(adapter, "web_element_click", {
		pageName: "lexiang",
		elementId: "lexiang_lib_add_to_task_hover",
		elementName: "hover添加到对话"
	});
}
/** addKnowledgeTask: batch 方式添加 */
function reportAddToTaskBatch(adapter) {
	safeReport(adapter, "web_element_click", {
		pageName: "lexiang",
		elementId: "lexiang_lib_add_to_task_batch",
		elementName: "批量添加到对话"
	});
}
/** iframe 内搜索 */
function reportSearch(adapter) {
	safeReport(adapter, "web_element_click", {
		pageName: "lexiang",
		elementId: "lexiang_lib_search",
		elementName: "搜索"
	});
}
/** 在乐享中打开（外链） */
function reportOpenInLexiang(adapter) {
	safeReport(adapter, "web_element_click", {
		pageName: "lexiang",
		elementId: "lexiang_lib_open_in_lexiang",
		elementName: "在乐享中打开"
	});
}
/** B-1: 乐享开通页曝光（管理员） */
function reportActivatePageShowAdmin(adapter) {
	safeReport(adapter, "web_page_show", { pageName: "lexiang_activate_admin" });
}
/** B-2: 乐享开通页曝光（非管理员） */
function reportActivatePageShowMember(adapter) {
	safeReport(adapter, "web_page_show", { pageName: "lexiang_activate_member" });
}
/** B-3: 开通页点击「立即开通」（管理员，唤出开通弹窗时上报） */
function reportActivateButtonClickAdmin(adapter) {
	safeReport(adapter, "web_element_click", {
		pageName: "lexiang",
		elementId: "lexiang_activate_btn_admin",
		elementName: "乐享知识库的开通页面，点击立即开通（管理员）"
	});
}
/** B-4: 开通页点击「提醒管理员开通」（非管理员） */
function reportActivateButtonClickMember(adapter) {
	safeReport(adapter, "web_element_click", {
		pageName: "lexiang",
		elementId: "lexiang_activate_btn_member",
		elementName: "乐享知识库的开通页面，点击提醒管理员开通（非管理员）"
	});
}
/**
* B-5: One ID 登录弹窗曝光（管理员）
*
* 注意：表格里的 `pageId` 写为 `lexiang_oneid_login_modal_show_admin`，但 envent
* 是 `web_element_show`。按现有上报封装（`pageName` 字段承载 pageId 含义），
* 这里把 `pageName='lexiang'`、`elementId='lexiang_oneid_login_modal_show_admin'`
* 对齐表格语义，elementName 沿用文档给出的中文描述。
*/
function reportOneidLoginModalShowAdmin(adapter) {
	safeReport(adapter, "web_element_show", {
		pageName: "lexiang",
		elementId: "lexiang_oneid_login_modal_show_admin",
		elementName: "乐享知识库的开通页，One ID 登录弹窗曝光（管理员）"
	});
}
/**
* B-6: One ID 登录弹窗曝光后，点击授权（管理员）
*
* 由于 OneID 官方组件 `OneidAppActivation` 不提供"用户点击授权按钮"的事件回调，
* 实际可观测到的最早信号是 `onSuccess`（授权成功）。这里在 onSuccess 触发瞬间
* 上报，业务语义上等价于"用户完成授权"，与表格描述基本一致；如需严格区分
* 「点击 vs 成功」，需要 OneID SDK 暴露中间事件，目前无可行落点。
*/
function reportOneidLoginAuthClickAdmin(adapter) {
	safeReport(adapter, "web_element_click", {
		pageName: "lexiang",
		elementId: "lexiang_oneid_login_auth_admin",
		elementName: "乐享知识库的开通页，One ID 登录弹窗点击授权（管理员）"
	});
}
/**
* B-7: 管理员首次将腾讯乐享开通成功（管理员）
*
* 「首次」语义按 enterpriseId + accountUid 维度持久化（localStorage 标记），
* 下一次同账号 + 同企业再开通时不再重复上报。
*/
function reportActivateSuccessAdminFirst(adapter) {
	safeReport(adapter, "web_element_click", {
		pageName: "lexiang",
		elementId: "lexiang_activate_success_admin_first",
		elementName: "乐享知识库里，管理员首次将腾讯文档开通成功（管理员）"
	});
}
/**
* B-8: 缺少 license 的空白页曝光
*
* 触发：乐享面板或弹窗（picker）内，license=denied 拦截视图首次挂载。
*/
function reportLicenseDeniedPageShow(adapter) {
	safeReport(adapter, "web_page_show", {
		pageName: "lexiang_no_license",
		elementName: "乐享知识库的页面或弹窗里，缺少 license 的空白页曝光"
	});
}
function safeReport(adapter, eventName, payload) {
	try {
		adapter?.reportTelemetry?.(eventName, payload);
	} catch {}
}
var init_telemetry = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/api/auth-error.ts
var LEXIANG_AUTH_EXPIRED_CODES, isLexiangAuthExpiredCode, AUTH_EXPIRED_MESSAGE_PATTERNS, isLexiangAuthExpiredError;
var init_auth_error = __esmMin((() => {
	init_mcp_client();
	LEXIANG_AUTH_EXPIRED_CODES = new Set([41, 401]);
	isLexiangAuthExpiredCode = (code) => {
		if (typeof code === "number") return LEXIANG_AUTH_EXPIRED_CODES.has(code);
		if (typeof code === "string") {
			const num = Number(code);
			return !Number.isNaN(num) && LEXIANG_AUTH_EXPIRED_CODES.has(num);
		}
		return false;
	};
	AUTH_EXPIRED_MESSAGE_PATTERNS = [
		/\b401\b/,
		/\bunauthorized\b/i,
		/\binvalid[_\s]?token\b/i
	];
	isLexiangAuthExpiredError = (error) => {
		if (!error) return false;
		if (isLexiangApiError(error)) {
			const apiError = error;
			if (isLexiangAuthExpiredCode(apiError.bizCode)) return true;
			if (isLexiangAuthExpiredCode(apiError.mcpCode)) return true;
		}
		const message = error instanceof Error ? error.message : typeof error === "string" ? error : "";
		if (!message) return false;
		return AUTH_EXPIRED_MESSAGE_PATTERNS.some((pattern) => pattern.test(message));
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/api/auth-refresh.ts
var LexiangTokenRefreshError, inflightRefresh, refreshLexiangConnectorTokenOnce, doRefresh;
var init_auth_refresh = __esmMin((() => {
	init_lexiang_auth_constants();
	LexiangTokenRefreshError = class extends Error {
		constructor(message, options) {
			super(message);
			this.name = "LexiangTokenRefreshError";
			this.isAuthExpired = options?.isAuthExpired ?? true;
		}
	};
	inflightRefresh = null;
	refreshLexiangConnectorTokenOnce = (adapter) => {
		if (inflightRefresh) return inflightRefresh;
		inflightRefresh = doRefresh(adapter).finally(() => {
			inflightRefresh = null;
		});
		return inflightRefresh;
	};
	doRefresh = async (adapter) => {
		if (!adapter?.connectorOauthAccessToken) throw new LexiangTokenRefreshError("[lexiang-auth-refresh] adapter.connectorOauthAccessToken 不可用", { isAuthExpired: true });
		let token;
		try {
			token = (await adapter.connectorOauthAccessToken("lexiang-ol"))?.data?.access_token ?? "";
			if (!token) throw new LexiangTokenRefreshError("[lexiang-auth-refresh] connectorOauthAccessToken 返回空 token", { isAuthExpired: true });
		} catch (e) {
			if (e instanceof LexiangTokenRefreshError) throw e;
			throw new LexiangTokenRefreshError(`[lexiang-auth-refresh] 获取 access_token 失败: ${e instanceof Error ? e.message : String(e)}`, { isAuthExpired: true });
		}
		if (!adapter?.updateConnectorHeaders) throw new LexiangTokenRefreshError("[lexiang-auth-refresh] adapter.updateConnectorHeaders 不可用", { isAuthExpired: false });
		try {
			if (!(await adapter.updateConnectorHeaders("lexiang", { Authorization: token }))?.success) throw new LexiangTokenRefreshError("[lexiang-auth-refresh] updateConnectorHeaders 返回失败", { isAuthExpired: false });
		} catch (e) {
			if (e instanceof LexiangTokenRefreshError) throw e;
			throw new LexiangTokenRefreshError(`[lexiang-auth-refresh] 同步 connector headers 失败: ${e instanceof Error ? e.message : String(e)}`, { isAuthExpired: false });
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/api/mcp-client.ts
/**
* 解析 `SearchData.docs[].extra_info` JSON 字符串字段。
*
* 乐享搜索接口把 `logo` / `root_entry_id` 等扩展字段塞在序列化的 JSON 字符串里，
* 这里做一次防御解析：解析失败 / 类型异常一律返回空对象，不抛错。
*/
function parseLexiangSearchExtraInfo(raw) {
	if (!raw || typeof raw !== "string") return {};
	try {
		const parsed = JSON.parse(raw);
		return {
			logo: typeof parsed.logo === "string" ? parsed.logo : void 0,
			rootEntryId: typeof parsed.root_entry_id === "string" ? parsed.root_entry_id : void 0
		};
	} catch {
		return {};
	}
}
/** 类型守卫：判断一个未知错误是否是 `LexiangApiError` 实例。 */
function isLexiangApiError(err) {
	return err instanceof LexiangApiError || typeof err === "object" && err !== null && err.name === "LexiangApiError";
}
function generateRequestId() {
	return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
function getTencentLexiangFacade$1() {
	const facade = getFacades()?.tencentLexiang;
	if (!facade?.gatewayPost) throw new Error("[lexiang-api] tencentLexiang.gatewayPost facade 不可用");
	return facade;
}
/**
* 获取 adapter 实例（用于 retry 时的 token refresh）。
* 从 auth store 获取当前 adapter 引用。
*/
function getAdapterForRefresh() {
	try {
		const { lexiangAuthStore } = (init_lexiang_auth_store(), __toCommonJS(lexiang_auth_store_exports));
		return lexiangAuthStore.getState().adapter;
	} catch {
		return null;
	}
}
/**
* 内部：发送 MCP 请求并解析响应。
*
* 将请求发送和响应解析逻辑拆成独立函数，供 retry 逻辑复用。
*/
async function executeMcpRequest(toolName, body) {
	const tencentLexiang = getTencentLexiangFacade$1();
	let json;
	try {
		json = await tencentLexiang.gatewayPost(GATEWAY_MCP_PATH, body);
	} catch (e) {
		console.error(`[lexiang-api] ✗ ${toolName} gatewayPost 抛错`, e);
		throw e;
	}
	if (json?.error) {
		const errMsg = typeof json.error === "string" ? json.error : json.error.message ?? JSON.stringify(json.error);
		throw new LexiangApiError({
			toolName,
			message: `[lexiang-api] ${toolName} MCP error: ${errMsg} (code=${json.error?.code})`,
			mcpCode: typeof json.error === "object" ? json.error?.code : void 0,
			bizMessage: typeof json.error === "object" ? json.error?.message : errMsg
		});
	}
	const result = json?.result;
	if (result?.isError) {
		let bizCode;
		let bizMessage;
		let requestId;
		const errTextPart = Array.isArray(result.content) ? result.content.find((c) => c?.type === "text" && typeof c.text === "string") : void 0;
		if (errTextPart?.text) try {
			const parsed = JSON.parse(errTextPart.text);
			if (parsed && typeof parsed === "object") {
				if (typeof parsed.code === "number") bizCode = parsed.code;
				if (typeof parsed.message === "string") bizMessage = parsed.message;
				if (typeof parsed.request_id === "string") requestId = parsed.request_id;
			}
		} catch {
			bizMessage = errTextPart.text;
		}
		throw new LexiangApiError({
			toolName,
			message: `[lexiang-api] ${toolName} tool isError: ${bizMessage ?? JSON.stringify(result.content)}${bizCode !== void 0 ? ` (code=${bizCode})` : ""}`,
			bizCode,
			bizMessage,
			requestId
		});
	}
	const textPart = Array.isArray(result?.content) ? result.content.find((c) => c?.type === "text" && typeof c.text === "string") : void 0;
	if (textPart?.text) {
		let parsed;
		try {
			parsed = JSON.parse(textPart.text);
		} catch {
			return textPart.text;
		}
		if (parsed && typeof parsed === "object" && typeof parsed.code === "number" && "data" in parsed) {
			if (parsed.code !== 0) throw new LexiangApiError({
				toolName,
				message: `[lexiang-api] ${toolName} 业务失败: ${parsed.message ?? "no message"} (code=${parsed.code})`,
				bizCode: parsed.code,
				bizMessage: typeof parsed.message === "string" ? parsed.message : void 0,
				requestId: typeof parsed.request_id === "string" ? parsed.request_id : void 0
			});
			return parsed.data;
		}
		return parsed;
	}
	const structured = result?.structuredContent;
	if (structured && typeof structured === "object") {
		if (typeof structured.code === "number" && "data" in structured) {
			const s = structured;
			if (s.code !== 0) throw new LexiangApiError({
				toolName,
				message: `[lexiang-api] ${toolName} 业务失败: ${s.message ?? "no message"} (code=${s.code})`,
				bizCode: s.code,
				bizMessage: typeof s.message === "string" ? s.message : void 0,
				requestId: typeof s.request_id === "string" ? s.request_id : void 0
			});
			return s.data;
		}
		return structured;
	}
	throw new LexiangApiError({
		toolName,
		message: `[lexiang-api] ${toolName} 响应结构未知: ${JSON.stringify(json)?.slice(0, 500)}`
	});
}
/**
* 调用一个 MCP 工具并返回解析后的业务数据。
*
* 通过 AppProviders.facades.tencentLexiang.gatewayPost 发起请求，避免 renderer
* 直连外部 MCP 服务引发 CORS 问题。
*
* 401/41 自动恢复：第一次请求失败且命中 auth-like 错误时，通过 single-flight
* token refresh 刷新乐享 token 并重试原请求一次；仍失败才抛结构化 auth error。
*/
async function callMcpTool(toolName, args) {
	getTencentLexiangFacade$1();
	const body = {
		id: generateRequestId(),
		method: "tools/call",
		params: {
			name: "call_rpc",
			arguments: {
				tool_name: toolName,
				arguments: args
			}
		}
	};
	try {
		return await executeMcpRequest(toolName, body);
	} catch (firstError) {
		if (!isLexiangAuthExpiredError(firstError)) throw firstError;
		const adapter = getAdapterForRefresh();
		if (!adapter) throw firstError;
		try {
			await refreshLexiangConnectorTokenOnce(adapter);
		} catch {
			throw firstError;
		}
		return executeMcpRequest(toolName, {
			...body,
			id: generateRequestId()
		});
	}
}
/**
* 判断一个 logo URL 是否可以直接作为 img src 展示（无需 API 解析）。
*
* 规则：URL 路径部分（去掉查询参数后）以 `.{ext}` 结尾即可直接展示，
* 例如 `https://static.lexiang-asset.com/kb/assets/logos/space/51.png`。
* 而 `/assets/{hex-id}?company_from=xxx` 这种不含扩展名的需要解析。
*
* 注意：还会校验 URL 基本格式（如域名后需有有效路径），
* 防止格式异常的 URL（如域名后缺少 / 导致路径被拼入 hostname）被误判为可用。
*/
function isDirectlyUsableLogoUrl(url) {
	if (!url) return false;
	try {
		const parsed = new URL(url);
		if (parsed.hostname.length > 60) return false;
		return /\.\w{2,5}$/.test(parsed.pathname);
	} catch {
		return /\.\w{2,5}(\?|#|$)/.test(url);
	}
}
/**
* 解析乐享知识库 logo URL。
*
* 规则：
* - 如果 logo 地址格式为 `https://{host}/assets/{id}(可选?查询参数)`，需要通过主进程代理调用乐享 API 换取真实图片地址。
* - 如果不是上述格式（含文件扩展名），直接返回原始 URL。
* - 返回 null 表示无法解析或无 logo。
*/
async function resolveSpaceLogoUrl(logo) {
	if (!logo) return null;
	if (logoUrlCache.has(logo)) {
		const cached = logoUrlCache.get(logo) ?? null;
		if (cached !== null) return cached;
		const failedTime = logoFailedAt.get(logo);
		if (failedTime && Date.now() - failedTime < LOGO_RETRY_INTERVAL) return null;
		logoUrlCache.delete(logo);
		logoFailedAt.delete(logo);
	}
	if (!(!isDirectlyUsableLogoUrl(logo) && /\/assets\/[^./]+(\?|$)/i.test(logo))) {
		logoUrlCache.set(logo, logo);
		return logo;
	}
	const tencentLexiang = getFacades()?.tencentLexiang;
	if (!tencentLexiang?.resolveAssetUrl) {
		console.warn("[lexiang-api] tencentLexiang.resolveAssetUrl facade 不可用");
		logoUrlCache.set(logo, null);
		logoFailedAt.set(logo, Date.now());
		return null;
	}
	try {
		const resolvedUrl = (await tencentLexiang.resolveAssetUrl(logo))?.url ?? null;
		if (resolvedUrl) {
			try {
				const parsed = new URL(resolvedUrl);
				if (parsed.pathname.length <= 1) {
					console.warn("[lexiang-api] resolveSpaceLogoUrl: suspicious URL, no path:", resolvedUrl);
					logoUrlCache.set(logo, null);
					logoFailedAt.set(logo, Date.now());
					return null;
				}
				if (parsed.hostname.length > 60) {
					console.warn("[lexiang-api] resolveSpaceLogoUrl: hostname too long, likely missing / in URL:", resolvedUrl);
					logoUrlCache.set(logo, null);
					logoFailedAt.set(logo, Date.now());
					return null;
				}
			} catch {
				console.warn("[lexiang-api] resolveSpaceLogoUrl: invalid URL returned:", resolvedUrl);
				logoUrlCache.set(logo, null);
				logoFailedAt.set(logo, Date.now());
				return null;
			}
			logoUrlCache.set(logo, resolvedUrl);
		} else {
			logoUrlCache.set(logo, null);
			logoFailedAt.set(logo, Date.now());
		}
		return resolvedUrl;
	} catch (e) {
		console.warn("[lexiang-api] resolveSpaceLogoUrl failed:", e);
		logoUrlCache.set(logo, null);
		logoFailedAt.set(logo, Date.now());
		return null;
	}
}
/** 清除 logo URL 缓存（在 refresh 时使用） */
function clearLogoUrlCache() {
	logoUrlCache.clear();
	logoFailedAt.clear();
}
/** 失效指定 logo key 的缓存（用于图片加载失败后重试） */
function invalidateLogoUrlCache(logo) {
	if (!logo) return;
	logoUrlCache.delete(logo);
	logoFailedAt.delete(logo);
}
var GATEWAY_MCP_PATH, LexiangApiError, logoUrlCache, LOGO_RETRY_INTERVAL, logoFailedAt;
var init_mcp_client = __esmMin((() => {
	init_services();
	init_auth_error();
	init_auth_refresh();
	GATEWAY_MCP_PATH = "/mcp";
	LexiangApiError = class extends Error {
		constructor(opts) {
			super(opts.message);
			this.name = "LexiangApiError";
			this.toolName = opts.toolName;
			this.bizCode = opts.bizCode;
			this.bizMessage = opts.bizMessage;
			this.mcpCode = opts.mcpCode;
			this.requestId = opts.requestId;
		}
	};
	logoUrlCache = /* @__PURE__ */ new Map();
	LOGO_RETRY_INTERVAL = 1e4;
	logoFailedAt = /* @__PURE__ */ new Map();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/api/catalog-service.ts
/**
* 获取当前用户的常用团队列表（对齐乐享 `team_list_frequent_teams`）。
*
* 与 `team_list_teams` 的差异：常用团队会优先返回用户高频访问的团队，
* 适合作为默认排序。`team_list_teams` 返回的是全量团队。
*
* ⚠️ 接口约束：服务端校验 `limit <= 20`（int32.lte），超过会返回 code=51 校验错误。
*
* @param limit     每页数量，默认 20（接口上限），传入 >20 会被自动 clamp
* @param type      可选过滤类型：'personal' | 'company'
* @param pageToken 分页 token
*/
async function fetchFrequentTeams(limit = 20, type, pageToken) {
	const args = { limit: Math.min(Math.max(1, limit), 20) };
	if (type) args.type = type;
	if (pageToken) args.page_token = pageToken;
	return callMcpTool("team_list_frequent_teams", args);
}
async function fetchRecentSpaces(limit = 20, include) {
	const args = { limit };
	if (include) args.include = include;
	return callMcpTool("space_list_recently_spaces", args);
}
/**
* 拉取某团队下的知识库列表（对齐 `space_list_spaces`）。
*
* 设计要点：
* - 默认带 `sort_by={@link LEXIANG_TEAM_SPACES_SORT_BY}`（`-edited_at`）与站内行为对齐；
*   调用方可通过 `options.sortBy` 覆盖。
* - 当 `options.isPinned=true` 时透传 `is_pinned`，**服务端会按 `-pinned_at` 查询并忽略
*   分页 token**（来自接口文档），此模式下：
*   1. 不携带 `page_token`（即使 caller 传了也忽略）；
*   2. 不携带 `sort_by`（pinned 模式下排序由服务端固定为 `-pinned_at`，传入会被忽略，
*      为避免误导阅读者，干脆不带）。
*
* @param teamId    团队 id
* @param limit     每页数量；pinned 模式下作为单页全量上限
* @param pageToken 分页 token；pinned 模式下会被忽略
* @param options   可选项：sortBy / isPinned
*/
async function fetchTeamSpaces(teamId, limit = 20, pageToken, options) {
	const args = {
		team_id: teamId,
		limit
	};
	if (options?.isPinned === true) args.is_pinned = true;
	else {
		args.sort_by = options?.sortBy ?? "-edited_at";
		if (pageToken) args.page_token = pageToken;
	}
	if (options?.permission) args.permission = options.permission;
	return callMcpTool("space_list_spaces", args);
}
/**
* 拉取某团队下的「置顶」知识库列表（对齐站内 `/sapi/kb/space/v1/spaces?is_pinned=1`）。
*
* 内部委托 {@link fetchTeamSpaces} 走 `is_pinned: true` 分支：
* - 服务端按 `-pinned_at` 排序；
* - 服务端会忽略 `page_token`（即「单页全量」语义），调用方无需关心分页。
*
* 与 {@link fetchTeamSpaces} 分开导出的原因：语义独立（单页 / 不分页），独立函数
* 便于上层做 in-flight 去重、缓存键隔离与失败兜底。
*/
async function fetchPinnedTeamSpaces(teamId, limit = 50, permission) {
	return fetchTeamSpaces(teamId, limit, void 0, {
		isPinned: true,
		permission
	});
}
async function fetchPersonalSpace() {
	return callMcpTool("space_describe_personal_space", { is_async: false });
}
async function fetchExampleSpace() {
	return callMcpTool("entry_list_example_space_entries", {});
}
async function fetchLatestEntries(spaceId, limit = 20, pageToken) {
	const args = {
		space_id: spaceId,
		limit
	};
	if (pageToken) args.page_token = pageToken;
	return callMcpTool("entry_list_latest_entries", args);
}
/**
* 获取当前用户最近访问过的知识条目列表（跨知识库），按访问时间倒序排列。
*
* 对应 MCP 工具：entry_list_recently_entries
* 传 include='staff' 时返回条目关联的人员信息（owned_by 对应的用户详情）。
* 传 include='space' 时返回条目关联的知识库信息（space_id 对应的知识库详情）。
* 可组合使用：include='staff,space'
*
* 注意：该接口不支持分页（不返回 next_page_token），调用方一次性拿到 limit 条结果即视为全部。
*/
async function fetchRecentEntries(limit = 10, include) {
	const args = { limit };
	if (include) args.include = include;
	return callMcpTool("entry_list_recently_entries", args);
}
async function fetchEntryChildren(parentId, limit = 50, pageToken, sortBy, include) {
	const key = buildEntryChildrenKey(parentId, limit, pageToken, sortBy, include);
	const existing = inflightEntryChildren.get(key);
	if (existing) return existing;
	const args = {
		parent_id: parentId,
		limit
	};
	if (sortBy) args.sort_by = sortBy;
	if (pageToken) args.page_token = pageToken;
	if (include) args.include = include;
	const promise = callMcpTool("entry_list_children", args).finally(() => {
		inflightEntryChildren.delete(key);
	});
	inflightEntryChildren.set(key, promise);
	return promise;
}
async function searchKb(keyword, options = {}) {
	const args = {
		keyword,
		type: options.type ?? "all",
		highlight: options.highlight ?? true,
		limit: options.limit ?? 20
	};
	if (options.teamId) args.team_id = options.teamId;
	if (options.spaceId) args.space_id = options.spaceId;
	if (options.pageToken) args.page_token = options.pageToken;
	if (options.titleOnly !== void 0) args.title_only = options.titleOnly;
	if (options.sortBy) args.sort_by = options.sortBy;
	return callMcpTool("search_kb_search", args);
}
/**
* 按关键字搜索团队（通过 team_list_teams 接口的 keyword 参数过滤）。
*
* @param keyword 团队名关键字
* @param limit   每页数量，默认 20
* @param pageToken 分页 token
*/
async function searchTeams(keyword, limit = 20, pageToken) {
	const args = {
		keyword,
		limit
	};
	if (pageToken) args.page_token = pageToken;
	return callMcpTool("team_list_teams", args);
}
/**
* 拉取指定父节点下的一层子条目（对齐 `entry_list_children`）。
*
* @param parentId  父节点 id；从知识库根目录开始时传 `space.root_entry_id`
* @param pageToken 分页 token，首页不传；翻页时传上一次响应的 `next_page_token`
* @param limit     本次返回的子条目数量，默认 {@link LEXIANG_CATALOG_PAGE_SIZE}
* @returns 已映射为面板通用 `LexiangFile` 的一页子节点 + `nextPageToken`
*
* @example
* // 首次加载某知识库根目录
* const { items, nextPageToken } = await fetchCatalogChildren(kb.rootEntryId!);
*
* // 加载下一页
* const next = await fetchCatalogChildren(kb.rootEntryId!, nextPageToken);
*/
async function fetchCatalogChildren(parentId, pageToken, limit = 20, sortBy) {
	const data = await fetchEntryChildren(parentId, limit, pageToken, sortBy, "staff");
	return {
		items: (data.entries ?? []).map((entry) => mapRawEntry(entry, data.staffs)),
		nextPageToken: data.next_page_token || void 0
	};
}
/**
* 创建一个知识条目（本期仅开放文档类：page / smartsheet）。
*
* @param params.parentEntryId 父节点 id（一级条目可传知识库 `root_entry_id`）
* @param params.type          本地枚举（doc / sheet）
* @param params.name          条目名称（用户未指定时调用方提供默认值）
* @returns 后端创建后的 entry 对象；`entry.id` 可用于拼 `pages/{id}` 预览 URL。
*/
async function createEntry(params) {
	const entryType = CREATE_DOC_TYPE_TO_MCP_ENTRY_TYPE[params.type];
	return callMcpTool("entry_create_entry", {
		entry_type: entryType,
		parent_entry_id: params.parentEntryId,
		name: params.name
	});
}
/**
* 将 createEntry 抛出的任意错误归一为 {@link CreateEntryErrorDetail}。
*
* 此函数只做分类，不做 i18n。各端根据 `kind` 自行取对应文案。
*/
function classifyCreateEntryError(err) {
	if (!isLexiangApiError(err)) return { kind: "network" };
	const { bizCode, bizMessage, requestId } = err;
	if (bizCode === 401 || bizCode === 403) return {
		kind: "forbidden",
		bizCode,
		bizMessage,
		requestId
	};
	if (bizCode === 429) return {
		kind: "rateLimit",
		bizCode,
		bizMessage,
		requestId
	};
	if (typeof bizCode === "number" && bizCode >= 500) return {
		kind: "server",
		bizCode,
		bizMessage,
		requestId
	};
	return {
		kind: "generic",
		bizCode,
		bizMessage,
		requestId
	};
}
/** 获取乐享首页 URL：知识库页 → `/spaces/{kbId}`；团队页 → `/t/{teamCode}/spaces`；指定 path → 直接拼接 */
function getLexiangHomeUrl(opts) {
	if (opts?.path) return `${LEXIANG_WEB_ORIGIN_PROD}${opts.path}`;
	if (opts?.kbId) return `${LEXIANG_WEB_ORIGIN_PROD}/spaces/${opts.kbId}`;
	if (opts?.teamCode) return `${LEXIANG_WEB_ORIGIN_PROD}/t/${opts.teamCode}/spaces`;
	return LEXIANG_WEB_ORIGIN_PROD;
}
var LEXIANG_CATALOG_SORT_BY, inflightEntryChildren, buildEntryChildrenKey, mapEntryType, mapFileType, mapRawEntry, CREATE_DOC_TYPE_TO_MCP_ENTRY_TYPE;
var init_catalog_service = __esmMin((() => {
	init_constants();
	init_mcp_client();
	LEXIANG_CATALOG_SORT_BY = "-edited_at";
	inflightEntryChildren = /* @__PURE__ */ new Map();
	buildEntryChildrenKey = (parentId, limit, pageToken, sortBy, include) => JSON.stringify([
		parentId,
		limit,
		pageToken ?? "",
		sortBy ?? "",
		include ?? ""
	]);
	mapEntryType = (entryType) => {
		if (entryType === "folder" || entryType === "page" || entryType === "flink") return entryType;
		return "other";
	};
	mapFileType = (entryType, extension) => {
		if (entryType === "folder") return "folder";
		if (entryType === "flink") return "other";
		const ext = extension?.toLowerCase();
		if (ext === "sheet" || ext === "smartsheet" || ext === "xlsx" || ext === "xls") return "sheet";
		if (ext === "mind" || ext === "mm") return "mind";
		if (ext === "slide" || ext === "ppt" || ext === "pptx") return "slide";
		if (ext === "pdf") return "pdf";
		return "doc";
	};
	mapRawEntry = (raw, staffs) => {
		const editedAtSec = raw.edited_at ? Number(raw.edited_at) : 0;
		const updatedAtMs = Number.isFinite(editedAtSec) ? editedAtSec * 1e3 : 0;
		const staff = raw.owned_by && staffs ? staffs[raw.owned_by] : void 0;
		return {
			id: raw.id,
			title: raw.name,
			type: mapFileType(raw.entry_type, raw.extension),
			ext: raw.extension,
			is_folder: raw.entry_type === "folder",
			owner: { name: staff?.display_name ?? "" },
			updated_at: updatedAtMs,
			entry_type: mapEntryType(raw.entry_type),
			parent_id: raw.parent_id,
			target_id: raw.target_id,
			extension: raw.extension,
			has_children: raw.has_children
		};
	};
	CREATE_DOC_TYPE_TO_MCP_ENTRY_TYPE = {
		doc: "page",
		sheet: "smartsheet",
		folder: "folder"
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/api/auth-service.ts
/**
* 调用免登接口，把原始乐享 URL 转换成带一次性登录态的 URL。
*
* 注意：本期后端接口仅消费 `intend_url` 一个字段，不再透传 `file_id` / `open_type`。
*
* 401/41 自动恢复（仅 native 模式）：
* 第一次请求失败且命中 auth-like 错误码时，通过 single-flight token refresh
* 刷新乐享 token 并重试原请求一次；仍失败才抛错。
* iframe 模式走 B 端企业免登（OneID），不自动刷新 C 端 OAuth token。
*
* @param adapter           IAgentAdapter 实例（用于发起 temp-login-url IPC）
* @param params.intendUrl  原始乐享页面 URL（必填）
* @param params.mode       iframe 走 B 端企业免登，native 保持 C 端 OAuth 免登
* @returns 后端签发的 login_url
*/
async function fetchLexiangTempLoginUrl(adapter, params) {
	const body = { intend_url: params.intendUrl };
	const doRequest = async () => {
		const resp = params.mode === "iframe" ? await fetchEnterpriseTempLoginUrl(adapter, body) : await fetchOauthTempLoginUrl(adapter, body);
		if (resp?.code !== 0) throw new TempLoginUrlError(`[lexiang-auth] temp-login-url 失败: ${resp?.msg ?? "unknown"} (code=${resp?.code})`, resp?.code);
		const loginUrl = resp.data?.login_url;
		if (!loginUrl) throw new Error("[lexiang-auth] temp-login-url 返回 data.login_url 为空");
		return loginUrl;
	};
	try {
		return await doRequest();
	} catch (firstError) {
		if (!(firstError instanceof TempLoginUrlError && isLexiangAuthExpiredCode(firstError.respCode)) || params.mode !== "native") throw firstError;
		try {
			await refreshLexiangConnectorTokenOnce(adapter);
		} catch {
			throw firstError;
		}
		return doRequest();
	}
}
/**
* 已知是 VPC（专享版）账号时，从 endpoint 派生乐享 Web origin。
*
* 防御性后缀白名单：即便调用方 `isVpcAccount` 判定不严格（如把 SaaS exclusive
* 套餐当 VPC 部署），也只对命中 `isVpcEndpointHost` 的 endpoint 派生 `-lx` 子域名，
* 避免对 SaaS 域名（如 `copilot.tencent.com`）派生不存在的 `-lx` 子域名。
*
* 线上 VPC endpoint 形如 `zxonline070122.copilot.qq.com`，预发形如
* `*.copilot-staging.qq.com`；SaaS 域名不在白名单，返回 undefined 由调用方兜底。
*
* 与 `deriveLexiangVpcWebOriginFromEndpoint`（origins.ts，给 license / company-status 用）
* 的区别：本函数仅在调用方已确认 `isVpcAccount === true` 时调用，而前者在无 account
* 上下文的场景下也能安全派生（同样基于 `isVpcEndpointHost` 后缀白名单防御）。
*
* 安全前提：本函数仅做 HTTPS / 非 IP / 后缀白名单等格式校验，不校验域名归属。
* 调用方须保证 endpoint 来自受信 daemon 产品配置（如 `imaBridge.getProductEndpoint`），
* 不可来自用户输入，否则可能将任意 `*.copilot.qq.com` 子域派生出对应的 `-lx` origin。
*/
function deriveLexiangWebOriginForVpcAccount(endpoint) {
	const rawEndpoint = endpoint?.trim();
	if (!rawEndpoint) return;
	try {
		const url = new URL(rawEndpoint);
		if (url.protocol !== "https:") return;
		const host = url.hostname;
		if (!isVpcEndpointHost(host)) return;
		const labels = host.split(".");
		if (!labels[0]) return;
		if (!labels[0].endsWith("-lx")) labels[0] = `${labels[0]}-lx`;
		const port = url.port ? `:${url.port}` : "";
		return `${url.protocol}//${labels.join(".")}${port}`;
	} catch {
		return;
	}
}
/**
* 根据宿主环境选择 B 端乐享域名。
*
* - `isVpcAccount` 为 true（专享版 / VPC）时：无论 staging / prod，都从当前 endpoint
*   派生 `*-lx` 子域名，派生失败兜底 `LEXIANG_WEB_ORIGIN_PROD`。
* - 非 VPC 账号（旗舰版 / 个人版）保持原逻辑：
*   - `isStaging` 由调用方从 IMA bridge 读取（宿主侧基于产品配置 endpoint 判断）。
*   - `true` → 优先派生 VPC staging `*-lx.copilot-staging.qq.com`；无法派生时走
*     `LEXIANG_WEB_ORIGIN_STAGING`（`lexiangla.net`，绑定 OneID 741 测试环境）。
*   - `false` → 兜底 `LEXIANG_WEB_ORIGIN_PROD`（`lexiangla.com`），以"能加载出正式环境看板"为优先。
*
* 注意：B 端看板两种模式（主看板 / 指定空间）都走同一个 helper，保证域名一致。
*/
function resolveLexiangBOrigin(isStaging, endpoint, isVpcAccount) {
	if (isVpcAccount) return deriveLexiangWebOriginForVpcAccount(endpoint) ?? "https://lexiangla.com";
	if (!isStaging) return LEXIANG_WEB_ORIGIN_PROD;
	return deriveLexiangVpcWebOriginFromEndpoint(endpoint) ?? "https://lexiangla.net";
}
async function resolveProductEndpoint(adapter, isStaging, endpoint) {
	const explicitEndpoint = endpoint?.trim();
	if (explicitEndpoint) return explicitEndpoint;
	try {
		const product = await adapter.getProductConfiguration?.();
		return (isStaging ? product?.stagingEndpoint ?? product?.endpoint : product?.endpoint)?.trim() || void 0;
	} catch {
		return;
	}
}
/**
* 根据 entry id 生成原始乐享页面 URL，供 `intend_url` 使用。
*
* 规则：`https://lexiangla.com/pages/{entry.id}` + 预览裁剪 query。
* 文件夹与文件使用相同的 URL 协议，统一拼接 entry id 即可。
*/
function buildLexiangPageUrl(entryId) {
	const query = buildQueryString(LEXIANG_PAGE_PREVIEW_UI_QUERY);
	return `${LEXIANG_WEB_ORIGIN_PROD}/pages/${entryId}${query ? `?${query}` : ""}`;
}
/**
* 生成乐享 B 端主看板原始 URL，仅作为 temp-login-url 的 intend_url。
*
* 固定使用 /wb 路径（乐享 B 端工作台入口），
* 域名由 `resolveLexiangBOrigin(isStaging, endpoint, isVpcAccount)` 动态选择：
*   VPC 账号 → 从 endpoint 派生 `*-lx` 子域名（线上/预发均派生）
*   非 VPC staging → `.net` 或 VPC staging `*-lx.copilot-staging.qq.com`
*   其他环境 → `.com`
*/
function buildLexiangLibraryUrl(isStaging, params = {}) {
	const origin = resolveLexiangBOrigin(isStaging, params.endpoint, params.isVpcAccount);
	const query = buildQueryString(LEXIANG_LIBRARY_EMBED_UI_QUERY);
	return `${origin}/wb${query ? `?${query}` : ""}`;
}
/**
* 获取乐享 B 端主看板的免登 iframe URL。
*
* @param isStaging 是否预发环境（调用方通过 `useOptionalImaApiBridge().isStagingEnv()` 读取）。
*/
async function getLexiangLibraryEmbedUrl(adapter, isStaging, params = {}) {
	const endpoint = await resolveProductEndpoint(adapter, isStaging, params.endpoint);
	return fetchLexiangTempLoginUrl(adapter, {
		intendUrl: buildLexiangLibraryUrl(isStaging, {
			...params,
			endpoint
		}),
		mode: "iframe"
	});
}
/**
* 拼接 B 端「空间内打开指定条目」的原始 URL：
*   https://{B端域名}/wb/spaces/{spaceId}?entry_id={entryId}&{embed UI query}
*
* 仅作为 temp-login-url 的 intend_url 使用。
* 域名由 `resolveLexiangBOrigin(isStaging, endpoint, isVpcAccount)` 动态选择。
*/
function buildLexiangSpaceUrl(isStaging, params) {
	const origin = resolveLexiangBOrigin(isStaging, params.endpoint, params.isVpcAccount);
	const query = buildQueryString({
		...LEXIANG_LIBRARY_EMBED_UI_QUERY,
		entry_id: params.entryId
	});
	const suffix = query ? `?${query}` : "";
	return `${origin}/wb/spaces/${params.spaceId}${suffix}`;
}
/**
* 获取乐享 B 端「空间 + 指定条目」的免登 iframe URL，
* 用于上传成功后跳转 iframe 直接定位到目标条目所在空间。
*
* @param isStaging 是否预发环境（调用方通过 `useOptionalImaApiBridge().isStagingEnv()` 读取）。
*/
async function getLexiangSpaceEmbedUrl(adapter, isStaging, params) {
	const endpoint = await resolveProductEndpoint(adapter, isStaging, params.endpoint);
	return fetchLexiangTempLoginUrl(adapter, {
		intendUrl: buildLexiangSpaceUrl(isStaging, {
			...params,
			endpoint
		}),
		mode: "iframe"
	});
}
/**
* 获取 LexiangFile 的"可嵌入 iframe"预览 URL。
*
* 用列表行的 `id`（= entry.id）拼 intend_url → 调免登接口 → 返回 login_url。
* 文件夹与文件使用相同的 URL 协议（`/pages/{id}`），统一走此路径。
*/
async function getLexiangPreviewEmbedUrl(adapter, file) {
	return fetchLexiangTempLoginUrl(adapter, {
		intendUrl: buildLexiangPageUrl(file.id),
		mode: "native"
	});
}
var buildQueryString, fetchOauthTempLoginUrl, fetchEnterpriseTempLoginUrl, TempLoginUrlError;
var init_auth_service = __esmMin((() => {
	init_lexiang_auth_constants();
	init_constants();
	init_auth_error();
	init_auth_refresh();
	buildQueryString = (params) => {
		return new URLSearchParams(params).toString();
	};
	fetchOauthTempLoginUrl = async (adapter, body) => {
		if (!adapter?.connectorOauthTempLoginUrl) throw new Error("[lexiang-auth] adapter.connectorOauthTempLoginUrl not supported");
		return adapter.connectorOauthTempLoginUrl(LEXIANG_OAUTH_NAME, body);
	};
	fetchEnterpriseTempLoginUrl = async (adapter, body) => {
		if (!adapter?.connectorEnterpriseTempLoginUrl) throw new Error("[lexiang-auth] adapter.connectorEnterpriseTempLoginUrl not supported");
		return adapter.connectorEnterpriseTempLoginUrl(LEXIANG_OAUTH_NAME, body);
	};
	TempLoginUrlError = class extends Error {
		constructor(message, respCode) {
			super(message);
			this.name = "TempLoginUrlError";
			this.respCode = respCode;
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/api/upload-error.ts
var UPLOAD_ERR_MESSAGE_PREFIX, extractUploadErrorMessages, parseUploadTaggedMessage, parseUploadError;
var init_upload_error = __esmMin((() => {
	UPLOAD_ERR_MESSAGE_PREFIX = "__LX_UPLOAD_ERR__";
	extractUploadErrorMessages = (err, seen = /* @__PURE__ */ new Set()) => {
		if (typeof err === "string") return [err];
		if (err instanceof Error) {
			const extras = err;
			return [
				err.message,
				...extractUploadErrorMessages(extras.cause, seen),
				...extractUploadErrorMessages(extras.data, seen),
				...extractUploadErrorMessages(extras.error, seen)
			].filter((message) => Boolean(message));
		}
		if (!err || typeof err !== "object") return [];
		if (seen.has(err)) return [];
		seen.add(err);
		const envelope = err;
		return [
			...extractUploadErrorMessages(envelope.message, seen),
			...extractUploadErrorMessages(envelope.error, seen),
			...extractUploadErrorMessages(envelope.data, seen),
			...extractUploadErrorMessages(envelope.cause, seen)
		];
	};
	parseUploadTaggedMessage = (rawMsg) => {
		if (!rawMsg) return;
		const prefixIdx = rawMsg.indexOf(UPLOAD_ERR_MESSAGE_PREFIX);
		if (prefixIdx === -1) return;
		const tail = rawMsg.slice(prefixIdx + 17);
		const sepIdx = tail.indexOf("|");
		const jsonPart = sepIdx === -1 ? tail : tail.slice(0, sepIdx);
		try {
			const parsed = JSON.parse(jsonPart);
			if (parsed && typeof parsed === "object" && typeof parsed.kind === "string") return {
				kind: parsed.kind,
				bizCode: typeof parsed.bizCode === "number" ? parsed.bizCode : void 0,
				bizMessage: typeof parsed.bizMessage === "string" ? parsed.bizMessage : void 0,
				stage: typeof parsed.stage === "string" ? parsed.stage : void 0
			};
		} catch {}
	};
	parseUploadError = (err) => {
		for (const rawMsg of extractUploadErrorMessages(err)) {
			const detail = parseUploadTaggedMessage(rawMsg);
			if (detail) return detail;
		}
		return { kind: "generic" };
	};
}));
//#endregion
//#region ../../packages/workbuddy-server/src/tencent-lexiang/contract.ts
/**
* 类型守卫：判断一个未知错误是否是 `LexiangSpApiError` 实例。
*
* 跨 bundle / 热重载时 `instanceof` 可能失效，兜底按 `name` 判断。
*/
function isLexiangSpApiError(err) {
	return err instanceof LexiangSpApiError || typeof err === "object" && err !== null && err.name === "LexiangSpApiError";
}
var TENCENT_LEXIANG_RPC_CHANNELS, LexiangSpApiError;
var init_contract = __esmMin((() => {
	TENCENT_LEXIANG_RPC_CHANNELS = {
		GATEWAY_POST: "tencentLexiang:gatewayPost",
		UPLOAD_LEXIANG_FILE: "tencentLexiang:uploadLexiangFile",
		RESOLVE_ASSET_URL: "tencentLexiang:resolveAssetUrl",
		CLEAR_WEB_COOKIES: "tencentLexiang:clearWebCookies",
		CHECK_LICENSE: "tencentLexiang:checkLicense",
		CHECK_COMPANY_STATUS: "tencentLexiang:checkCompanyStatus",
		SP_API_REQUEST: "tencentLexiang:spApiRequest",
		INVALIDATE_ACCESS_TOKEN: "tencentLexiang:invalidateAccessToken"
	};
	LexiangSpApiError = class extends Error {
		name = "LexiangSpApiError";
		/** HTTP 状态码；网络错误/无响应时为 0 */
		status;
		/** 请求 method（大写） */
		method;
		/** SPAPI 路径（不含 origin，如 `/spapi/xxx`） */
		path;
		/** 客户端生成的请求 ID，用于跨端日志串联 */
		reqId;
		/** 服务端返回的 x-request-id / body.request_id（若有） */
		serverRequestId;
		/** 响应体片段（最多 500 字符），便于排查；不会含敏感 token */
		bodySnippet;
		constructor(opts) {
			super(opts.message);
			this.status = opts.status;
			this.method = opts.method;
			this.path = opts.path;
			this.reqId = opts.reqId;
			this.serverRequestId = opts.serverRequestId;
			this.bodySnippet = opts.bodySnippet;
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/api/spapi-client.ts
function getTencentLexiangFacade() {
	const facade = getFacades()?.tencentLexiang;
	if (!facade?.spApiRequest) throw new Error("[lexiang-spapi] tencentLexiang.spApiRequest facade 不可用");
	return facade;
}
/**
* 乐享 SPAPI 通用请求方法。
*
* 通过 Node 层 Facade 代理发送，避免 CORS。
* 支持 GET/POST/PUT/DELETE/PATCH。
*/
async function callSpApi(params) {
	return await getTencentLexiangFacade().spApiRequest({
		method: params.method ?? "GET",
		path: params.path,
		query: params.query,
		body: params.body
	});
}
/**
* 从 SPAPI 响应中提取 data 字段。
*
* 兼容两种形态：
* - 标准包装：{ code, message, data: T } → 返回 .data
* - 裸数据：直接返回原值
*/
function unwrapData(raw) {
	if (raw && typeof raw === "object" && "data" in raw) return raw.data;
	return raw;
}
var init_spapi_client = __esmMin((() => {
	init_contract();
	init_services();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/api/team-service.ts
/**
* 按关键字搜索团队（用于团队选择下拉）。
* 关键字为空时返回默认列表（最近/常用团队）。
*
* 对齐 SPAPI `GET /spapi/team/v1/teams?keyword=<keyword>`。
*/
async function searchTeamsByKeyword(keyword, limit = 20, pageToken) {
	try {
		const query = {
			limit,
			permission: "edit"
		};
		if (keyword.trim()) query.keyword = keyword.trim();
		if (pageToken) query.page_token = pageToken;
		const data = unwrapData(await callSpApi({
			path: "/spapi/team/v1/teams",
			query
		}));
		const teams = data?.teams ?? [];
		return {
			teams,
			hasMore: teams.length === limit,
			nextPageToken: data?.next_page_token
		};
	} catch {
		return {
			teams: [],
			hasMore: false
		};
	}
}
/**
* 按名称精确搜索团队（用于"重名检查"场景）。
*
* 对齐 SPAPI `GET /spapi/team/v1/teams?name=<keyword>`，与 shield
* `useSearchTeamByName` 行为一致。
*/
async function searchTeamsByName(name, limit = 20) {
	const trimmed = name.trim();
	if (!trimmed) return [];
	try {
		return unwrapData(await callSpApi({
			path: "/spapi/team/v1/teams",
			query: {
				name: trimmed,
				limit
			}
		}))?.teams ?? [];
	} catch {
		return [];
	}
}
/**
* 创建团队。
*
* 对齐 SPAPI `POST /spapi/team/v1/teams`。
*/
async function createTeam(params) {
	const body = { name: params.name };
	if (params.signature) body.signature = params.signature;
	if (params.logo) body.logo = params.logo;
	if (params.is_secret !== void 0) body.is_secret = params.is_secret;
	if (params.privileges?.length) body.privileges = params.privileges;
	return unwrapData(await callSpApi({
		method: "POST",
		path: "/spapi/team/v1/teams",
		body
	}));
}
var init_team_service = __esmMin((() => {
	init_spapi_client();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/api/privilege-service.ts
/**
* 获取资源权限人数统计。
* 对应 SPAPI `GET /spapi/kb/perm/v1/privileges/count`。
*
* @param resourceId   资源 id（团队 id / 知识库 id）
* @param resourceType 资源类型（'team' | 'space'）
*/
async function fetchPrivilegeCount(resourceId, resourceType) {
	if (!resourceId) return { count: {} };
	try {
		const data = unwrapData(await callSpApi({
			path: "/spapi/kb/perm/v1/privileges/count",
			query: {
				resource_id: resourceId,
				resource_type: resourceType
			}
		})) ?? {};
		if (data.count) for (const k of Object.keys(data.count)) {
			const v = data.count[k];
			if (v !== void 0) data.count[k] = Number(v);
		}
		return data;
	} catch {
		return { count: {} };
	}
}
/**
* 获取资源权限成员列表（分页）。
* 对应 SPAPI `GET /spapi/kb/perm/v1/privileges`。
* 对齐 shield useGetPrivilegePagination。
*
* @param resourceId   资源 id
* @param resourceType 资源类型
* @param role         过滤角色（'manager' | 'member' 等）
* @param pageToken    分页 token
* @param limit        每页条数，默认 20
*/
async function fetchPrivilegePagination(resourceId, resourceType, options = {}) {
	if (!resourceId) return { privileges: [] };
	const { pageToken, limit = 20 } = options;
	try {
		const query = {
			resource_id: resourceId,
			resource_type: resourceType,
			limit
		};
		if (pageToken) query.page_token = pageToken;
		const raw = unwrapData(await callSpApi({
			path: "/spapi/kb/perm/v1/privileges",
			query
		})) ?? { privileges: [] };
		return {
			privileges: (raw.privileges ?? []).map((item) => ({
				...item,
				subject_type: item.subject_type,
				staff: raw.staffs?.[item.subject_id] ?? void 0,
				department: raw.departments?.[item.subject_id] ?? void 0
			})),
			next_page_token: raw.next_page_token
		};
	} catch {
		return { privileges: [] };
	}
}
/**
* 获取当前用户在指定资源上的权限列表。
* 对应 SPAPI `GET /spapi/kb/perm/v1/staff/permissions`。
* 对齐 shield getStaffPermissions。
*
* 失败时返回空数组（降级为无权）。
*/
async function fetchStaffPermissions(resourceId, resourceType) {
	if (!resourceId) return [];
	try {
		return unwrapData(await callSpApi({
			path: "/spapi/kb/perm/v1/staff/permissions",
			query: {
				resource_id: resourceId,
				resource_type: resourceType
			}
		}))?.permissions ?? [];
	} catch {
		return [];
	}
}
var init_privilege_service = __esmMin((() => {
	init_spapi_client();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/api/contact-service.ts
/**
* 搜索联系人（成员/部门/标签）。
*
* 对齐 SPAPI `GET /spapi/contact/v1/search`，返回规范化的统一列表：
* staffs → model: 'staff'，departments → model: 'department'，tags → model: 'contact_tag'。
*
* @param keyword  搜索关键字（按姓名前缀匹配）
* @param options.limit           最大条数，默认 20
* @param options.withDepartment  是否返回部门，默认 true
* @param options.withTags        是否返回标签，默认 false
* @param options.onlyStaff       是否仅返回 staff 类型，默认 false
*/
async function searchContacts(keyword, options = {}) {
	const trimmed = keyword.trim();
	if (!trimmed) return [];
	const { limit = 20, withDepartment = true, withTags = false, onlyStaff = false } = options;
	try {
		const data = (await callSpApi({
			path: "/spapi/contact/v1/search",
			query: {
				starts_with: trimmed,
				limit,
				with_department: withDepartment ? 1 : 0,
				with_tags: withTags ? 1 : 0
			}
		}))?.data ?? {};
		const staffs = (data.staffs ?? []).map((s) => ({
			id: s.id,
			display_name: s.display_name,
			model: "staff",
			avatar: s.avatar,
			organization: s.organization,
			is_resigned: s.is_resigned
		}));
		const departments = onlyStaff ? [] : (data.departments ?? []).map((d) => ({
			id: d.id,
			display_name: d.name,
			model: "department",
			organization: d.path_name
		}));
		const tags = onlyStaff || !withTags ? [] : (data.tags ?? []).map((t) => ({
			id: t.id,
			display_name: t.name,
			model: "contact_tag"
		}));
		return [
			...departments,
			...tags,
			...staffs
		];
	} catch {
		return [];
	}
}
/**
* 获取单个部门信息。
*
* 对齐 shield `useGetDepartment`，对应 SPAPI：
* `GET /spapi/contact/v1/departments/:id`
*
* 部门不存在或无权限时返回 `null`。
*/
async function getDepartment(id) {
	if (!id) return null;
	try {
		return unwrapData(await callSpApi({ path: `/spapi/contact/v1/departments/${encodeURIComponent(id)}` }))?.department ?? null;
	} catch {
		return null;
	}
}
var init_contact_service = __esmMin((() => {
	init_spapi_client();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/api/space-service.ts
/**
* 创建知识库。
* 对应 SPAPI `POST /spapi/kb/space/v1/spaces`。
* 后台返回 `{ data: { space: Space } }`，解包到 Space 层。
*/
async function createSpace(params) {
	return unwrapData(await callSpApi({
		method: "POST",
		path: "/spapi/kb/space/v1/spaces",
		body: params
	})).space;
}
var init_space_service = __esmMin((() => {
	init_spapi_client();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/api/feature-flag-service.ts
/**
* 获取公司级 feature flag 配置。
* 失败时返回空对象（所有开关默认关闭）。
*/
async function fetchFeatureFlags() {
	try {
		return unwrapData(await callSpApi({ path: "/spapi/feature-flag/v1/company/version" }))?.feature_flags ?? {};
	} catch {
		return {};
	}
}
var init_feature_flag_service = __esmMin((() => {
	init_spapi_client();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/api/index.ts
var init_api = __esmMin((() => {
	init_mcp_client();
	init_catalog_service();
	init_auth_service();
	init_upload_error();
	init_team_service();
	init_privilege_service();
	init_contact_service();
	init_space_service();
	init_feature_flag_service();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/components/icons/team-default-icon.tsx
function TeamDefaultIcon({ size = 16 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("svg", {
		viewBox: "0 0 16 16",
		xmlns: "http://www.w3.org/2000/svg",
		width: size,
		height: size,
		style: { display: "block" },
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("path", {
			fill: "currentColor",
			d: "M11.1846 7.00391C13.107 7.09275 14.7062 8.54649 14.9629 10.4717L15.1983 12.2354C15.3481 13.3591 14.5377 14.3655 13.4395 14.4873L13.2158 14.5H7.78421C6.57472 14.4999 5.64193 13.4343 5.80178 12.2354L6.03714 10.4717C6.3021 8.48451 7.99723 7.00006 10.002 7H10.9981L11.1846 7.00391ZM4.50003 7C5.19037 7 5.83873 7.19695 6.38967 7.53906C6.11113 7.82934 5.86795 8.15449 5.66507 8.50684C5.31892 8.31269 4.9218 8.2002 4.50003 8.2002C3.2869 8.20023 2.26674 9.11016 2.12893 10.3154L1.94632 11.9092C1.89213 12.3837 2.26367 12.7995 2.74124 12.7998H4.79592C4.83866 13.2315 4.97432 13.6387 5.18362 14H2.74124C1.62147 13.9998 0.735643 13.0853 0.741237 11.9932L0.754909 11.7725L0.93655 10.1797C1.14357 8.36828 2.67683 7.00004 4.50003 7ZM10.002 8.2002C8.59869 8.20025 7.41209 9.2389 7.22659 10.6299L6.99124 12.3945C6.92748 12.8739 7.30056 13.2997 7.78421 13.2998H13.2158C13.6994 13.2996 14.0725 12.8739 14.0088 12.3945L13.7735 10.6299C13.588 9.23895 12.4013 8.20035 10.9981 8.2002H10.002ZM4.50003 2.5C5.6046 2.5 6.50003 3.39543 6.50003 4.5C6.50003 5.60457 5.6046 6.5 4.50003 6.5C3.39546 6.5 2.50003 5.60457 2.50003 4.5C2.50003 3.39543 3.39546 2.5 4.50003 2.5ZM10.5 1.5C11.8807 1.5 13 2.61929 13 4C13 5.38071 11.8807 6.5 10.5 6.5C9.11932 6.5 8.00003 5.38071 8.00003 4C8.00003 2.61929 9.11932 1.5 10.5 1.5ZM10.5 2.7002C9.78206 2.7002 9.20022 3.28203 9.20022 4C9.20022 4.71797 9.78206 5.2998 10.5 5.2998C11.218 5.2998 11.7998 4.71797 11.7998 4C11.7998 3.28203 11.218 2.7002 10.5 2.7002ZM4.50003 3.7002C4.0582 3.7002 3.70022 4.05817 3.70022 4.5C3.70022 4.94183 4.0582 5.2998 4.50003 5.2998C4.94185 5.2998 5.29983 4.94183 5.29983 4.5C5.29983 4.05817 4.94185 3.7002 4.50003 3.7002Z"
		})
	});
}
var import_jsx_runtime$2;
var init_team_default_icon = __esmMin((() => {
	require_react();
	import_jsx_runtime$2 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/assets/kb.svg
var kb_default;
var init_kb = __esmMin((() => {
	kb_default = "" + new URL("kb-BQsWXcm2.svg", import.meta.url).href;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/components/icons/kb-default-icon.tsx
function KbDefaultIcon({ size = 24 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("img", {
		src: kb_default,
		width: size,
		height: size,
		alt: "kb",
		draggable: false,
		style: { display: "block" }
	});
}
var import_jsx_runtime$1;
var init_kb_default_icon = __esmMin((() => {
	require_react();
	init_kb();
	import_jsx_runtime$1 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/assets/ima/group.svg
var group_default;
var init_group = __esmMin((() => {
	group_default = "data:image/svg+xml,%3csvg%20width='38'%20height='37'%20viewBox='0%200%2038%2037'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cmask%20id='mask0_263_5889'%20style='mask-type:luminance'%20maskUnits='userSpaceOnUse'%20x='0'%20y='0'%20width='38'%20height='37'%3e%3cpath%20d='M2.4658%2014.1918C3.05192%2018.4693%205.7146%2022.6298%209.59751%2025.2775C9.89268%2025.4763%2010.0946%2025.8083%2010.1111%2026.1926C10.1154%2026.2948%2010.102%2026.3919%2010.0819%2026.4903L9.41404%2029.5227L9.37299%2029.6918C9.35241%2029.7775%209.3355%2029.8645%209.33919%2029.9511C9.35301%2030.2705%209.62131%2030.5196%209.9399%2030.5057C10.065%2030.5004%2010.1648%2030.4489%2010.2681%2030.3833L13.9522%2028.0215C14.2293%2027.8438%2014.526%2027.7294%2014.8569%2027.7152C15.0027%2027.7087%2015.1432%2027.7252%2015.2795%2027.7532C16.3964%2028.0027%2017.5576%2028.1405%2018.7563%2028.1405C22.4058%2028.1405%2025.2965%2027.2915%2028.0267%2025.2829C27.9557%2026.419%2027.6141%2027.7866%2027.3021%2028.5919C24.7319%2035.2227%2017.2927%2038.0969%209.49618%2035.5363C2.71683%2033.3097%20-1.43746%2025.3604%200.460624%2018.725C0.969594%2016.9467%201.48969%2015.7268%202.4658%2014.1918ZM35.3033%2013.984C39.5873%2019.5436%2038.4047%2028.0801%2032.3965%2032.7096C30.9042%2033.8596%2029.1646%2034.5324%2027.4646%2035.003C28.8759%2033.4896%2029.996%2031.6586%2030.6957%2029.5652C33.325%2021.6957%2029.0613%2013.1373%2021.1723%2010.4497C21.0011%2010.3917%2020.8292%2010.3406%2020.6576%2010.2888C25.986%208.31283%2031.8887%209.55262%2035.3033%2013.984ZM18.7715%204.48291e-07C24.2262%200.000769023%2029.0438%203.35283%2030.9484%207.26913L30.6726%207.17838C26.3649%205.79777%2020.5398%205.65427%2015.0763%209.82818C11.9853%2012.4156%209.62772%2015.9358%208.99208%2020.4118C7.30627%2018.6461%206.1275%2015.8548%205.81198%2013.7391C5.35176%2010.6596%206.08643%207.5716%208.26855%204.93309C11.5362%200.98186%2015.9089%20-0.00076633%2018.7715%204.48291e-07Z'%20fill='white'%20style='fill:white;fill-opacity:1;'/%3e%3c/mask%3e%3cg%20mask='url(%23mask0_263_5889)'%3e%3cpath%20d='M0%200H37.8612V36.4644H0V0Z'%20fill='%2306C15F'%20style='fill:%2306C15F;fill:color(display-p3%200.0235%200.7569%200.3725);fill-opacity:1;'/%3e%3c/g%3e%3c/svg%3e";
}));
//#endregion
//#region ../../packages/agent-ui/src/assets/ima/wechat.svg
var wechat_default;
var init_wechat = __esmMin((() => {
	wechat_default = "data:image/svg+xml,%3csvg%20width='64'%20height='64'%20viewBox='0%200%2064%2064'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M4%207.5C4%204.73858%206.23858%202.5%209%202.5H55C57.7614%202.5%2060%204.73858%2060%207.5V56.5C60%2059.2614%2057.7614%2061.5%2055%2061.5H9C6.23858%2061.5%204%2059.2614%204%2056.5V7.5Z'%20fill='white'%20style='fill:white;fill-opacity:1;'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M55%205.5H9C7.89543%205.5%207%206.39543%207%207.5V56.5C7%2057.6046%207.89543%2058.5%209%2058.5H55C56.1046%2058.5%2057%2057.6046%2057%2056.5V7.5C57%206.39543%2056.1046%205.5%2055%205.5ZM9%202.5C6.23858%202.5%204%204.73858%204%207.5V56.5C4%2059.2614%206.23858%2061.5%209%2061.5H55C57.7614%2061.5%2060%2059.2614%2060%2056.5V7.5C60%204.73858%2057.7614%202.5%2055%202.5H9Z'%20fill='%235CC971'%20fill-opacity='0.64'%20style='fill:%235CC971;fill:color(display-p3%200.3608%200.7882%200.4431);fill-opacity:0.64;'/%3e%3cg%20clip-path='url(%23clip0_263_5881)'%3e%3cmask%20id='mask0_263_5881'%20style='mask-type:luminance'%20maskUnits='userSpaceOnUse'%20x='-43'%20y='-112'%20width='334'%20height='707'%3e%3cpath%20d='M290.515%20-111.556V594.707H-42.6566V-111.556H290.515Z'%20fill='white'%20style='fill:white;fill-opacity:1;'/%3e%3c/mask%3e%3cg%20mask='url(%23mask0_263_5881)'%3e%3cmask%20id='mask1_263_5881'%20style='mask-type:luminance'%20maskUnits='userSpaceOnUse'%20x='13'%20y='13'%20width='38'%20height='38'%3e%3cpath%20d='M15.4659%2028.1516C16.052%2032.4291%2018.7147%2036.5895%2022.5976%2039.2372C22.8928%2039.436%2023.0947%2039.768%2023.1112%2040.1523C23.1155%2040.2545%2023.1021%2040.3516%2023.0821%2040.45L22.4142%2043.4825L22.3731%2043.6515C22.3525%2043.7372%2022.3356%2043.8242%2022.3393%2043.9108C22.3531%2044.2302%2022.6214%2044.4793%2022.94%2044.4655C23.0651%2044.4601%2023.1649%2044.4087%2023.2682%2044.343L26.9523%2041.9813C27.2294%2041.8035%2027.5261%2041.6892%2027.857%2041.675C28.0028%2041.6684%2028.1433%2041.6849%2028.2796%2041.713C29.3966%2041.9625%2030.5577%2042.1003%2031.7564%2042.1003C35.4059%2042.1003%2038.2966%2041.2512%2041.0269%2039.2426C40.9559%2040.3787%2040.6142%2041.7464%2040.3022%2042.5516C37.732%2049.1825%2030.2928%2052.0566%2022.4963%2049.496C15.7169%2047.2694%2011.5627%2039.3201%2013.4607%2032.6847C13.9697%2030.9064%2014.4898%2029.6865%2015.4659%2028.1516ZM48.3034%2027.9438C52.5875%2033.5033%2051.4049%2042.0398%2045.3966%2046.6693C43.9043%2047.8193%2042.1647%2048.4922%2040.4647%2048.9627C41.8761%2047.4493%2042.9961%2045.6184%2043.6958%2043.5249C46.3251%2035.6555%2042.0615%2027.097%2034.1724%2024.4094C34.0012%2024.3514%2033.8293%2024.3004%2033.6577%2024.2485C38.9862%2022.2725%2044.8888%2023.5123%2048.3034%2027.9438ZM31.7716%2013.9597C37.2264%2013.9605%2042.0439%2017.3125%2043.9485%2021.2288L43.6727%2021.1381C39.3651%2019.7575%2033.5399%2019.614%2028.0764%2023.7879C24.9854%2026.3754%2022.6278%2029.8955%2021.9922%2034.3715C20.3064%2032.6058%2019.1276%2029.8145%2018.8121%2027.6988C18.3519%2024.6193%2019.0865%2021.5313%2021.2687%2018.8928C24.5363%2014.9416%2028.909%2013.959%2031.7716%2013.9597Z'%20fill='white'%20style='fill:white;fill-opacity:1;'/%3e%3c/mask%3e%3cg%20mask='url(%23mask1_263_5881)'%3e%3cpath%20d='M13.0001%2013.9597H50.8613V50.4241H13.0001V13.9597Z'%20fill='%2306C15F'%20style='fill:%2306C15F;fill:color(display-p3%200.0235%200.7569%200.3725);fill-opacity:1;'/%3e%3c/g%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_263_5881'%3e%3crect%20width='38'%20height='36.4646'%20fill='white'%20style='fill:white;fill-opacity:1;'%20transform='translate(13%2013.9596)'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/components/icons/lexiang-file-type-icon.tsx
/**
* 根据乐享文件类型 / extension / isFolder 解析对应的图标 URL。
*
* 匹配优先级：
* 1. isFolder → 文件夹图标
* 2. extension 命中 LOCAL_FILE_EXT_ICON_MAP → 本地文件图标
* 3. extension 命中 ONLINE_DOC_EXT_ICON_MAP → 在线文档品牌图标
* 4. type 命中 LEXIANG_TYPE_ICON_MAP → 在线文档品牌图标
* 5. default → 未知文件图标
*/
function getLexiangIconUrl(type, extension, isFolder) {
	if (isFolder) return folder_default;
	if (extension) {
		const ext = extension.toLowerCase();
		const localIcon = LOCAL_FILE_EXT_ICON_MAP[ext];
		if (localIcon) return localIcon;
		const onlineIcon = ONLINE_DOC_EXT_ICON_MAP[ext];
		if (onlineIcon) return onlineIcon;
	}
	if (type && LEXIANG_TYPE_ICON_MAP[type]) return LEXIANG_TYPE_ICON_MAP[type];
	return unknown_default;
}
/**
* 判断图标是否来自在线文档品牌图标（PNG）。
*
* 用于在调用方需要为 PNG 来源做视觉尺寸补偿时，区分本地 SVG 和在线 PNG。
*/
function isLexiangOnlineDocIcon(type, extension, isFolder) {
	if (isFolder) return false;
	if (extension) {
		const ext = extension.toLowerCase();
		if (LOCAL_FILE_EXT_ICON_MAP[ext]) return false;
		if (ONLINE_DOC_EXT_ICON_MAP[ext]) return true;
	}
	return Boolean(type && LEXIANG_TYPE_ICON_MAP[type]);
}
var import_jsx_runtime, LOCAL_FILE_EXT_ICON_MAP, ONLINE_DOC_EXT_ICON_MAP, LEXIANG_TYPE_ICON_MAP, LexiangFileTypeIcon;
var init_lexiang_file_type_icon = __esmMin((() => {
	require_react();
	init_Excel();
	init_folder();
	init_group();
	init_image();
	init_markdown();
	init_pdf();
	init_podcast();
	init_ppt();
	init_txt();
	init_unknown();
	init_web();
	init_webvideo();
	init_wechat();
	init_word();
	init_tdoc_folder();
	init_tdoc_mind();
	init_tdoc_slide();
	init_tdoc_smartcanvas();
	init_tdoc_smartsheet();
	import_jsx_runtime = require_jsx_runtime();
	LOCAL_FILE_EXT_ICON_MAP = {
		doc: word_default,
		xls: Excel_default,
		ppt: ppt_default,
		pdf: pdf_default,
		txt: txt_default,
		md: markdown_default,
		ofd: unknown_default,
		image: image_default,
		video: webvideo_default,
		audio: podcast_default,
		link: web_default,
		flink: web_default,
		iwiki: web_default,
		pkg: group_default,
		code: txt_default,
		wechat: wechat_default,
		faq: unknown_default,
		unknown: unknown_default
	};
	ONLINE_DOC_EXT_ICON_MAP = {
		page: tdoc_smartcanvas_default,
		smartcanvas: tdoc_smartcanvas_default,
		smartsheet: tdoc_smartsheet_default
	};
	LEXIANG_TYPE_ICON_MAP = {
		doc: tdoc_smartcanvas_default,
		sheet: tdoc_smartsheet_default,
		mind: tdoc_mind_default,
		slide: tdoc_slide_default,
		folder: tdoc_folder_default
	};
	LexiangFileTypeIcon = ({ type, extension, isFolder, size = 20, onlineDocSize }) => {
		const iconUrl = getLexiangIconUrl(type, extension, isFolder);
		const renderSize = isLexiangOnlineDocIcon(type, extension, isFolder) && onlineDocSize ? onlineDocSize : size;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "lexiang-file-type-icon",
			style: {
				width: size,
				height: size,
				display: "inline-flex",
				flexShrink: 0,
				alignItems: "center",
				justifyContent: "center"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: iconUrl,
				width: renderSize,
				height: renderSize,
				alt: extension || type,
				draggable: false,
				style: { display: "block" }
			})
		});
	};
}));
//#endregion
export { init_catalog_service as $, isLexiangSpApiError as A, classifyCreateEntryError as B, searchTeamsByKeyword as C, reportOneidLoginAuthClickAdmin as Ct, unwrapData as D, init_no_knowledge_base_update as Dt, init_spapi_client as E, reportSearch as Et, getLexiangLibraryEmbedUrl as F, fetchFrequentTeams as G, fetchCatalogChildren as H, getLexiangPreviewEmbedUrl as I, fetchPinnedTeamSpaces as J, fetchLatestEntries as K, getLexiangSpaceEmbedUrl as L, buildLexiangPageUrl as M, deriveLexiangWebOriginForVpcAccount as N, TENCENT_LEXIANG_RPC_CHANNELS as O, no_knowledge_base_update_default as Ot, fetchLexiangTempLoginUrl as P, getLexiangHomeUrl as Q, init_auth_service as R, init_team_service as S, reportLicenseDeniedPageShow as St, callSpApi as T, reportOpenInLexiang as Tt, fetchEntryChildren as U, createEntry as V, fetchExampleSpace as W, fetchRecentSpaces as X, fetchRecentEntries as Y, fetchTeamSpaces as Z, fetchPrivilegeCount as _, reportAddToTaskHover as _t, KbDefaultIcon as a, isDirectlyUsableLogoUrl as at, init_privilege_service as b, reportJsApiSuccess as bt, init_team_default_icon as c, init_auth_error as ct, init_feature_flag_service as d, reportActivateButtonClickAdmin as dt, searchKb as et, createSpace as f, reportActivateButtonClickMember as ft, searchContacts as g, reportAddToTaskBatch as gt, init_contact_service as h, reportActivateSuccessAdminFirst as ht, isLexiangOnlineDocIcon as i, invalidateLogoUrlCache as it, parseUploadError as j, init_contract as k, init_api as l, isLexiangAuthExpiredError as lt, getDepartment as m, reportActivatePageShowMember as mt, getLexiangIconUrl as n, clearLogoUrlCache as nt, init_kb_default_icon as o, parseLexiangSearchExtraInfo as ot, init_space_service as p, reportActivatePageShowAdmin as pt, fetchPersonalSpace as q, init_lexiang_file_type_icon as r, init_mcp_client as rt, TeamDefaultIcon as s, resolveSpaceLogoUrl as st, LexiangFileTypeIcon as t, searchTeams as tt, fetchFeatureFlags as u, init_telemetry as ut, fetchPrivilegePagination as v, reportIframePageShow as vt, searchTeamsByName as w, reportOneidLoginModalShowAdmin as wt, createTeam as x, reportLibraryListPageShow as xt, fetchStaffPermissions as y, reportJsApiFail as yt, LEXIANG_CATALOG_SORT_BY as z };
