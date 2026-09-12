import { n as __esmMin, o as __toCommonJS } from "./chunk-BRZcfu7K.js";
import { B as accountService, D as isStateUpdateNotification, O as CloudE2BFilesystem, S as LocalAgentProvider, V as httpService, i as createIPCBackendProvider, j as CloudAgentProvider, n as init_common, s as createBackendProvider, t as common_exports, y as AgentClient, z as withWebAgentsListOrigin } from "./common-CwB_VqKR.js";
import { Yr as toast, t as init_src } from "./src-DRGoWjIu.js";
import { p as init_environment, r as getEnvironmentType, t as getBrandName, v as isOverseas, y as isWorkBuddy } from "./environment-DKqg3f0G.js";
import { a as init_i18n, u as t } from "./i18n-Bt_Wap4p.js";
import { l as getWorkspaceGroupTitle, u as init_file_path } from "./file-path-DzzGeaqx.js";
import { c as init_auth_expired_detector, h as init_timing, i as init_product_features, l as notifyIfAuthExpired, n as ToolState, o as readRuntimeProductFeatures, p as DebouncedMap, r as init_chat_types } from "./chat-types-BMkaZPiE.js";
import { A as init_city_tree, C as modelsSubject, D as chatStateStore, M as setCityTreeUrl, O as init_chat_state_store, S as init_subscriptions, T as ChatState, a as SearchToolAdapter, c as init_read_tool_adapter, l as EditToolAdapter, n as init_message_converter, o as init_search_tool_adapter, s as ReadToolAdapter, t as MessageConverter, u as init_edit_tool_adapter, w as subagentsSubject, x as commandSubject } from "./message-converter-CCG28Swi.js";
import { n as todoStatusStore, t as init_todo_status_store } from "./todo-status-store-ElN_35v9.js";
import { n as init_acp_message_accumulator, t as ACPMessageAccumulator } from "./acp-message-accumulator-DFww5ygX.js";
//#region ../../packages/agent-ui/src/utils/get-smh-host.ts
/**
* 获取当前运行环境对应的 SMH 服务域名。
*
* 调用约定：返回值是完整 origin（含 scheme），不带末尾斜杠。调用方拼接 path 时直接 `${host}/api/...`。
*
* @returns SMH 服务域名，如 'https://smh26tqjmz2qlj4i.api.tencentsmh.cn'
*/
function getSMHHost() {
	if (typeof window === "undefined" || typeof document === "undefined") return SMH_HOST_DOMESTIC;
	const injected = document.body?.getAttribute("data-smh-host");
	if (injected) return injected;
	const hostname = window.location.hostname;
	if (OVERSEAS_PROD_HOSTNAMES.has(hostname)) return SMH_HOST_OVERSEAS_PROD;
	if (OVERSEAS_STAGING_HOSTNAMES.has(hostname)) return SMH_HOST_OVERSEAS_STAGING;
	return SMH_HOST_DOMESTIC;
}
var SMH_HOST_DOMESTIC, SMH_HOST_OVERSEAS_STAGING, SMH_HOST_OVERSEAS_PROD, OVERSEAS_STAGING_HOSTNAMES, OVERSEAS_PROD_HOSTNAMES;
var init_get_smh_host = __esmMin((() => {
	SMH_HOST_DOMESTIC = "https://smh26tqjmz2qlj4i.api.tencentsmh.cn";
	SMH_HOST_OVERSEAS_STAGING = "https://smh2k7vpgat96vqi.ap-singapore.api.tencentsmh.com";
	SMH_HOST_OVERSEAS_PROD = "https://smh38ewydmp37j7v.ap-singapore.api.tencentsmh.com";
	OVERSEAS_STAGING_HOSTNAMES = new Set([
		"staging.workbuddy.cc",
		"test1.workbuddy.cc",
		"test2.workbuddy.cc",
		"staging.workbuddy.ai",
		"staging-codebuddy.tencent.com"
	]);
	OVERSEAS_PROD_HOSTNAMES = new Set([
		"www.workbuddy.cc",
		"workbuddy.cc",
		"www.workbuddy.ai",
		"workbuddy.ai",
		"www.codebuddy.ai",
		"codebuddy.ai"
	]);
}));
//#endregion
//#region ../../packages/agent-ui/src/adapters/pending-message-tracker.ts
var PendingMessageTracker;
var init_pending_message_tracker = __esmMin((() => {
	PendingMessageTracker = class {
		constructor() {
			this.sessionStates = /* @__PURE__ */ new Map();
		}
		/**
		* 记录新发送的消息请求
		*/
		addPendingRequest(sessionId, userMessageId) {
			let requests = this.sessionStates.get(sessionId);
			if (!requests) {
				requests = [];
				this.sessionStates.set(sessionId, requests);
			}
			requests.push({
				userMessageId,
				createdAt: Date.now()
			});
		}
		/**
		* 获取第一个待处理的临时用户消息 ID
		* 仅查询，不修改状态
		*/
		getFirstPendingUserMessageId(sessionId) {
			return this.sessionStates.get(sessionId)?.[0]?.userMessageId;
		}
		/**
		* 清除指定 session 的最早一条 PendingRequest（FIFO）
		*/
		clearLatestPendingRequest(sessionId) {
			const requests = this.sessionStates.get(sessionId);
			if (!requests || requests.length === 0) return;
			requests.shift();
		}
		/**
		* 清除指定 session 的所有跟踪状态
		* 在 loadSession 或会话结束时调用
		*/
		clearSession(sessionId) {
			if (this.sessionStates.get(sessionId)) {}
			this.sessionStates.delete(sessionId);
		}
		/**
		* 清除所有跟踪状态
		* 在 adapter 销毁时调用
		*/
		clearAll() {
			this.sessionStates.clear();
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/adapters/task-converter.ts
var TaskConverter;
var init_task_converter = __esmMin((() => {
	TaskConverter = class {
		/**
		* 将 ACP PlanEntryStatus 映射为 TaskData status
		* ACP: 'pending' | 'in_progress' | 'completed' | 'cancelled'
		* TaskData: 'pending' | 'in_progress' | 'completed' | 'cancelled'
		*/
		static mapPlanEntryStatusToTaskStatus(status) {
			switch (status) {
				case "pending": return "pending";
				case "in_progress": return "in_progress";
				case "completed": return "completed";
				case "cancelled": return "cancelled";
				default: return "pending";
			}
		}
		/**
		* 将 ACP PlanEntry 转换为 TaskData
		*/
		static convertPlanEntryToTask(entry, index) {
			const cbMeta = entry._meta?.["codebuddy.ai"];
			return {
				id: entry._meta?.id || `task-${index}`,
				content: entry.content || "",
				activeForm: cbMeta?.activeForm,
				status: this.mapPlanEntryStatusToTaskStatus(entry.status),
				dependencies: entry._meta?.dependencies || [],
				createdAt: entry.createdAt,
				updatedAt: entry.updatedAt
			};
		}
		/**
		* 将完整的 ACPTodoItem 转换为 TaskData（优先使用）
		*/
		static convertTodoItemToTask(item, index) {
			return {
				id: item.id || `task-${index}`,
				content: item.content || "",
				activeForm: item.activeForm,
				status: this.mapPlanEntryStatusToTaskStatus(item.status),
				dependencies: item.dependencies || [],
				createdAt: item.createdAt,
				updatedAt: item.updatedAt
			};
		}
		/**
		* 将 ACP PlanUpdate 转换为 TaskData[]
		* 优先使用 _meta.todolist（完整数据），否则从 entries 解析
		*/
		static convertACPPlanUpdate(planUpdate, options) {
			const todolist = planUpdate._meta?.todolist;
			if (todolist && todolist.length > 0) return { tasks: todolist.map((item, index) => this.convertTodoItemToTask(item, index)) };
			return { tasks: (planUpdate.entries || []).map((entry, index) => this.convertPlanEntryToTask(entry, index)) };
		}
		/**
		* 将 ACP PlanEntry 转换为 TaskData[]（简化版）
		*/
		static convertACPPlanEntries(entries) {
			return entries.map((entry, index) => this.convertPlanEntryToTask(entry, index));
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/adapters/tools/plan-tool-adapter.ts
var PLAN_CREATE_NAMES, PLAN_UPDATE_KEYWORD, MERGEABLE_FIELDS, LOG_PREFIX, PlanToolAdapter;
var init_plan_tool_adapter = __esmMin((() => {
	PLAN_CREATE_NAMES = ["plan_create", "PLAN_CREATE"];
	PLAN_UPDATE_KEYWORD = "plan_update";
	MERGEABLE_FIELDS = [
		"status",
		"todolist",
		"overview",
		"name",
		"parts",
		"explorationStatus"
	];
	LOG_PREFIX = "[PlanToolAdapter]";
	PlanToolAdapter = class PlanToolAdapter {
		/**
		* 检查 update 是否为 plan_update 工具调用
		*/
		static isPlanUpdateToolCall(update) {
			if ((update?.title || "").toLowerCase().includes(PLAN_UPDATE_KEYWORD)) return true;
			if ((update?.toolCall?.name || update?.toolName || update?.name || "").toLowerCase().includes(PLAN_UPDATE_KEYWORD)) return true;
			return false;
		}
		/**
		* 从消息内容中提取 plan_update 工具的 args（状态更新字段）
		*
		* plan_update 的 args 包含真正的更新内容（如 { status: "building" }），
		* 而 result.result.data 只是原始 plan 数据的回显。
		*
		* @param messageContent AssistantMessage 的 content 数组
		* @returns plan_update 的 args 对象，或 undefined
		*/
		static extractPlanUpdateArgs(messageContent) {
			if (!Array.isArray(messageContent)) return;
			const planUpdateToolContent = messageContent.find((c) => c?.type === "tool-call" && c?.tool && c.tool.name?.toLowerCase().includes(PLAN_UPDATE_KEYWORD));
			if (!planUpdateToolContent) return;
			const args = planUpdateToolContent.tool?.args;
			if (args && typeof args === "object") {
				console.log(`${LOG_PREFIX} extractPlanUpdateArgs: found args=`, JSON.stringify(args).substring(0, 200));
				return args;
			}
			if (typeof args === "string") try {
				const parsed = JSON.parse(args);
				console.log(`${LOG_PREFIX} extractPlanUpdateArgs: parsed string args=`, JSON.stringify(parsed).substring(0, 200));
				return parsed;
			} catch {}
			console.log(`${LOG_PREFIX} extractPlanUpdateArgs: no valid args found`);
		}
		/**
		* 检查内容项是否为 plan_create 工具调用
		*/
		static isPlanCreateToolCall(contentItem) {
			return contentItem?.type === "tool-call" && contentItem?.tool && PLAN_CREATE_NAMES.includes(contentItem.tool.name);
		}
		/**
		* 将 plan_update 的 args 合并到 plan_create tool 的 result.result.data 中
		*
		* plan_create 的 data 是 JSON 字符串，需要：
		* 1. 解析原始 JSON
		* 2. 合并 args 中的更新字段（status, todolist 等）
		* 3. 重新序列化为 JSON 字符串
		* 4. 创建新的 tool 引用以触发 React re-render
		*
		* @param planCreateContentItem plan_create 的 content item
		* @param updateArgs plan_update 的 args 对象（如 { status: "building" }）
		* @returns 新的 content item（新引用）
		*/
		static applyPlanUpdateToCreateTool(planCreateContentItem, updateArgs) {
			const existingResult = planCreateContentItem.tool.result || {};
			const existingData = existingResult?.result?.data;
			let mergedDataStr;
			if (typeof existingData === "string" && existingData.trim()) try {
				const parsed = JSON.parse(existingData);
				for (const field of MERGEABLE_FIELDS) if (updateArgs[field] !== void 0) parsed[field] = updateArgs[field];
				mergedDataStr = JSON.stringify(parsed, null, 4);
			} catch {
				console.warn(`${LOG_PREFIX} applyPlanUpdateToCreateTool: failed to parse existing data, using original`);
				mergedDataStr = existingData;
			}
			else mergedDataStr = JSON.stringify(updateArgs, null, 4);
			return {
				...planCreateContentItem,
				tool: {
					...planCreateContentItem.tool,
					result: {
						...existingResult,
						result: {
							...existingResult.result || {},
							data: mergedDataStr
						}
					}
				}
			};
		}
		/**
		* 处理 plan_update：检测并将 plan_update 的状态合并到 plan_create 的消息上
		*
		* 查找 plan_create 的优先级：
		* 1. finalMessage（当前合并后的消息）
		* 2. existingMessage（缓存中同一 messageId 的旧版本）
		* 3. sessionCache（session 中所有消息的缓存，跨 message 查找）
		*/
		static applyPlanUpdateToMessage(update, originalMessage, finalMessage, existingMessage, sessionCache) {
			const RESULT_NOT_UPDATED = {
				updated: false,
				extraMessages: []
			};
			if (!PlanToolAdapter.isPlanUpdateToolCall(update)) return RESULT_NOT_UPDATED;
			let updateArgs = PlanToolAdapter.extractPlanUpdateArgs(originalMessage.content);
			if (!updateArgs && finalMessage !== originalMessage && Array.isArray(finalMessage.content)) updateArgs = PlanToolAdapter.extractPlanUpdateArgs(finalMessage.content);
			if (!updateArgs) {
				console.log(`${LOG_PREFIX} applyPlanUpdateToMessage: no updateArgs extracted, returning false`);
				return RESULT_NOT_UPDATED;
			}
			console.log(`${LOG_PREFIX} applyPlanUpdateToMessage: updateArgs=`, JSON.stringify(updateArgs));
			if (finalMessage.content && Array.isArray(finalMessage.content)) {
				if (finalMessage.content.some((c) => PlanToolAdapter.isPlanCreateToolCall(c))) {
					finalMessage.content = finalMessage.content.map((c) => {
						if (PlanToolAdapter.isPlanCreateToolCall(c)) return PlanToolAdapter.applyPlanUpdateToCreateTool(c, updateArgs);
						return c;
					});
					console.log(`${LOG_PREFIX} applyPlanUpdateToMessage: [策略1] updated plan_create in finalMessage`);
					return {
						updated: true,
						extraMessages: []
					};
				}
			}
			if (existingMessage?.content && Array.isArray(existingMessage.content)) {
				const planCreateItem = existingMessage.content.find((c) => PlanToolAdapter.isPlanCreateToolCall(c));
				if (planCreateItem) {
					const updatedPlanCreate = PlanToolAdapter.applyPlanUpdateToCreateTool(planCreateItem, updateArgs);
					finalMessage.content.push(updatedPlanCreate);
					console.log(`${LOG_PREFIX} applyPlanUpdateToMessage: [策略2] found plan_create in existingMessage`);
					return {
						updated: true,
						extraMessages: []
					};
				}
			}
			if (sessionCache && sessionCache.size > 0) for (const [msgId, cachedMsg] of sessionCache) {
				if (!cachedMsg || cachedMsg.messageType !== "assistant") continue;
				const cachedContent = cachedMsg.content;
				if (!Array.isArray(cachedContent)) continue;
				const planCreateIdx = cachedContent.findIndex((c) => PlanToolAdapter.isPlanCreateToolCall(c));
				if (planCreateIdx >= 0) {
					const originalPlanCreateItem = cachedContent[planCreateIdx];
					const updatedPlanCreate = PlanToolAdapter.applyPlanUpdateToCreateTool(originalPlanCreateItem, updateArgs);
					const updatedContent = [...cachedContent];
					updatedContent[planCreateIdx] = updatedPlanCreate;
					const updatedMsg = {
						...cachedMsg,
						content: updatedContent,
						createTime: Date.now()
					};
					sessionCache.set(msgId, updatedMsg);
					return {
						updated: true,
						extraMessages: [updatedMsg]
					};
				}
			}
			console.log(`${LOG_PREFIX} applyPlanUpdateToMessage: no plan_create found anywhere`);
			return RESULT_NOT_UPDATED;
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/adapters/agent-new-adapter.ts
var AgentNewAdapter;
var init_agent_new_adapter = __esmMin((() => {
	init_common();
	init_src();
	init_chat_state_store();
	init_i18n();
	init_city_tree();
	init_chat_types();
	init_auth_expired_detector();
	init_file_path();
	init_message_converter();
	init_pending_message_tracker();
	init_subscriptions();
	init_task_converter();
	init_todo_status_store();
	init_edit_tool_adapter();
	init_plan_tool_adapter();
	init_read_tool_adapter();
	init_search_tool_adapter();
	AgentNewAdapter = class AgentNewAdapter {
		static {
			this.PENDING_EXPERT_SESSION_KEY = "__pending_expert__";
		}
		static {
			this.SHARED_EXPERT_HISTORY_KEY = "__global__";
		}
		/**
		* 运行环境类型
		* - 'local': IDE 本地环境
		* - 'cloud': 云端环境
		*/
		get environmentType() {
			return this.client.environmentType;
		}
		/**
		* Sessions 资源访问器
		* 用于订阅 sessionsChanged 等事件
		*/
		get sessions() {
			return this.client.sessions;
		}
		/**
		* Backend Provider 访问器
		* 用于认证相关操作和事件监听
		*/
		getBackendProvider() {
			return this.backendProvider;
		}
		/**
		* 构造函数
		* @param client - AgentClient 实例
		* @param initialConfig - 初始配置，包含 cwd 和 conversationId
		* @param backendProvider - 可选的 BackendProvider 实例，用于获取 Cloud Agent 列表
		* @param channel - 可选的 IWidgetChannel，用于在 Local 模式下发送状态同步请求
		*/
		constructor(client, initialConfig, backendProvider, channel) {
			this.messageCallbacks = /* @__PURE__ */ new Set();
			this.errorCallbacks = /* @__PURE__ */ new Set();
			this.checkpointCallbacks = /* @__PURE__ */ new Set();
			this.artifactCallbacks = /* @__PURE__ */ new Set();
			this.artifactTimestampsByUri = /* @__PURE__ */ new Map();
			this.taskUpdateCallbacks = /* @__PURE__ */ new Set();
			this.sendPromptRequestCallbacks = /* @__PURE__ */ new Set();
			this.insertContentBlocksRequestCallbacks = /* @__PURE__ */ new Set();
			this.pendingInsertRequest = null;
			this.openBrowserCallbacks = /* @__PURE__ */ new Set();
			this.openResultViewCallbacks = /* @__PURE__ */ new Set();
			this.workspaceInfoCallbacks = /* @__PURE__ */ new Set();
			this.browserUrlCache = /* @__PURE__ */ new Map();
			this.viewPlanCallbacks = /* @__PURE__ */ new Set();
			this.viewTaskCallbacks = /* @__PURE__ */ new Set();
			this.modeUpdateCallbacks = /* @__PURE__ */ new Set();
			this.modelUpdateCallbacks = /* @__PURE__ */ new Set();
			this.stateUpdateCallbacks = /* @__PURE__ */ new Set();
			this.workspaceInitCallbacks = /* @__PURE__ */ new Set();
			this.latestProductConfig = null;
			this.mcpServerChangeCallbacks = /* @__PURE__ */ new Set();
			this.expertLoadStateListeners = /* @__PURE__ */ new Set();
			this.expertLoadedCache = /* @__PURE__ */ new Set();
			this.selectedExpertBySession = /* @__PURE__ */ new Map();
			this.selectedExpertListeners = /* @__PURE__ */ new Set();
			this.currentExpertLoadState = {
				status: "idle",
				manifestStatus: "not_loaded",
				loadedPromptCount: 0,
				totalExpertCount: 0,
				progress: 0
			};
			this.initialized = false;
			this.messageCache = /* @__PURE__ */ new Map();
			this.processedOffsets = /* @__PURE__ */ new Map();
			this.toolCallIdToMessageId = /* @__PURE__ */ new Map();
			this.sessionConfigs = /* @__PURE__ */ new Map();
			this.sessionModels = /* @__PURE__ */ new Map();
			this.listenedSessionIds = /* @__PURE__ */ new Set();
			this.currentActiveSessionId = null;
			this.currentActiveSessionPromise = null;
			this.isNewLoadInProgress = null;
			this.pendingMessageTracker = new PendingMessageTracker();
			this._productConfigCache = null;
			this._productConfigPromise = null;
			this._isFullscreen = false;
			this.uploadFile = async (params) => {
				try {
					const result = await this.client.sessions.uploadFile(params);
					if (!result.success) console.warn("[AgentNewAdapter] File upload failed:", result.error);
					return result;
				} catch (error) {
					const errorMessage = error instanceof Error ? error.message : "Unknown error";
					console.error("[AgentNewAdapter] uploadFile failed:", errorMessage);
					return {
						success: false,
						error: errorMessage
					};
				}
			};
			this.client = client;
			this.backendProvider = backendProvider;
			this.channel = channel;
			this.initialConfig = initialConfig;
			this.setupGlobalSessionEventListeners();
		}
		/**
		* 上报埋点事件（Local 模式）
		* 通过 provider 链路发送：adapter → client.sessions → provider → ACP → IDE EventService
		*/
		reportTelemetry(eventName, payload) {
			this.client.sessions.reportTelemetry?.(eventName, payload).catch((error) => {
				console.warn("[AgentNewAdapter] reportTelemetry failed:", error);
			});
		}
		async reportTelemetrySync(eventName, payload) {
			await this.client.sessions.reportTelemetry?.(eventName, payload);
		}
		async _fetchProductConfiguration(forceUpdate = false) {
			if (this._productConfigCache && !forceUpdate) return this._productConfigCache;
			if (this._productConfigPromise && !forceUpdate) return await this._productConfigPromise ?? {};
			const promise = (async () => {
				try {
					this._productConfigCache = await this.client.sessions.getProductConfiguration?.() ?? {};
					const poiUrl = this._productConfigCache.links?.poiCityTreeUrl;
					if (poiUrl) setCityTreeUrl(poiUrl);
					return this._productConfigCache;
				} catch (error) {
					console.warn("[AgentNewAdapter] getProductConfiguration failed:", error);
					return {};
				} finally {
					this._productConfigPromise = null;
				}
			})();
			this._productConfigPromise = promise;
			return promise;
		}
		async getProductConfiguration() {
			const config = await this._fetchProductConfiguration();
			return {
				deploymentType: config.deploymentType,
				customModelSettings: config.customModelSettings,
				channelBranding: config.channelBranding,
				modelGroups: config.modelGroups,
				allowSkills: config.allowSkills,
				endpoint: config.endpoint
			};
		}
		async getProductConfig() {
			const config = await this._fetchProductConfiguration();
			return {
				creditPurchaseActions: config.creditPurchaseActions,
				networkEnvironment: config.networkEnvironment
			};
		}
		async getUserInfo() {
			console.log("[AgentNewAdapter] getUserInfo() called");
			try {
				const result = await this.client.sessions.getUserInfo?.();
				console.log("[AgentNewAdapter] getUserInfo() result:", JSON.stringify(result));
				return result ?? {};
			} catch (error) {
				console.warn("[AgentNewAdapter] getUserInfo failed:", error);
				return {};
			}
		}
		async getProductLinks(forceUpdate) {
			const config = await this._fetchProductConfiguration(forceUpdate);
			return {
				craftFeedback: config.links?.craftFeedback,
				mcpMarketUrl: config.links?.mcpMarketUrl,
				mcpDocumentUrl: config.links?.mcpDocumentUrl,
				helpDocument: config.links?.helpDocument,
				creditsRedirectUrl: config.links?.creditsRedirectUrl,
				poiCityTreeUrl: config.links?.poiCityTreeUrl
			};
		}
		async getProductName() {
			return (await this._fetchProductConfiguration()).productName;
		}
		async getProductFeatures() {
			return (await this._fetchProductConfiguration()).productFeatures;
		}
		async getFeatureToggles(forceUpdate = false) {
			return (await this._fetchProductConfiguration(forceUpdate)).featureToggles;
		}
		async getIdentityName() {
			console.log("[AgentNewAdapter] getIdentityName() called");
			try {
				const result = await this.client.sessions.getIdentityName?.();
				console.log("[AgentNewAdapter] getIdentityName() result:", JSON.stringify(result));
				return result ?? {};
			} catch (error) {
				console.warn("[AgentNewAdapter] getIdentityName() failed:", error);
				return {};
			}
		}
		/**
		* 设置全局 session 事件监听器
		* 监听 client.sessions 的事件，将 sessionCreated 转换为统一的 conversation 事件
		*/
		setupGlobalSessionEventListeners() {
			this.client.sessions.on("sessionCreated", (sessionInfo) => {
				if (!this.sessionConfigs.has(sessionInfo.id)) {
					this.sessionConfigs.set(sessionInfo.id, {
						cwd: sessionInfo.cwd || "",
						mcpServers: []
					});
					console.log("[AgentNewAdapter] Added sessionConfig for external session:", sessionInfo.id);
				}
				const conversation = {
					id: sessionInfo.id,
					cwd: sessionInfo.cwd || "",
					title: sessionInfo.name || "",
					timestamp: sessionInfo.lastActivityAt ? new Date(sessionInfo.lastActivityAt) : sessionInfo.createdAt ? new Date(sessionInfo.createdAt) : /* @__PURE__ */ new Date(),
					status: sessionInfo.status || "pending",
					isPlayground: sessionInfo.isPlayground || false
				};
				this.emitMessage({
					type: "conversation",
					conversation
				});
			});
			this.client.sessions.on("sessionUpdated", (sessionInfo) => {
				const conversation = { id: sessionInfo.id };
				if (sessionInfo.name !== void 0) conversation.title = sessionInfo.name;
				if (sessionInfo.status !== void 0) conversation.status = sessionInfo.status;
				if (sessionInfo.cwd !== void 0) conversation.cwd = sessionInfo.cwd;
				if (sessionInfo.lastActivityAt) conversation.timestamp = new Date(sessionInfo.lastActivityAt);
				else if (sessionInfo.createdAt) conversation.timestamp = new Date(sessionInfo.createdAt);
				if (sessionInfo.isPlayground !== void 0) conversation.isPlayground = sessionInfo.isPlayground;
				if (sessionInfo.isUserDefinedTitle !== void 0) conversation.isUserDefinedTitle = sessionInfo.isUserDefinedTitle;
				this.emitMessage({
					type: "conversation",
					conversation
				});
			});
			const onExpertLoadStateUpdate = (state) => {
				this.updateExpertLoadState(state);
			};
			this.client.sessions.on?.("expertLoadStateChanged", onExpertLoadStateUpdate);
			this.client.sessions.on?.("expertLoadStateChange", onExpertLoadStateUpdate);
			this.client.sessions.on?.("modelsChanged", (params) => {
				const availableModels = params?.availableModels || [];
				modelsSubject.next({ availableModels });
			});
			this.client.sessions.on("productConfigChanged", (params) => {
				console.log("[AgentNewAdapter] productConfigChanged event received, productFeatures:", JSON.stringify(params?.productFeatures));
				this.latestProductConfig = params;
				if (params?.availableModels?.length) modelsSubject.next({ availableModels: params.availableModels });
				if (this._productConfigCache && params?.productFeatures) this._productConfigCache = {
					...this._productConfigCache,
					productFeatures: params.productFeatures
				};
			});
			this.client.sessions.on("mcpServersChanged", (params) => {
				const timestamp = (/* @__PURE__ */ new Date()).toLocaleTimeString();
				console.log(`[AgentNewAdapter] 📨 mcpServersChanged event received at ${timestamp}, servers: ${params?.servers?.length ?? 0}`);
				const servers = params?.servers || [];
				servers.forEach((s, idx) => {
					console.log(`  [${idx}] ${s.name}: status=${s.status}, needsAuth=${s.needsAuth}, error=${s.error}`);
				});
				const callbackCount = this.mcpServerChangeCallbacks.size;
				console.log(`[AgentNewAdapter] 🔔 Notifying ${callbackCount} callback(s)`);
				let callbackIdx = 0;
				this.mcpServerChangeCallbacks.forEach((callback) => {
					callbackIdx++;
					try {
						console.log(`[AgentNewAdapter] ➡️  Calling callback ${callbackIdx}/${callbackCount}`);
						callback(servers);
						console.log(`[AgentNewAdapter] ✅ Callback ${callbackIdx} completed successfully`);
					} catch (error) {
						console.error(`[AgentNewAdapter] ❌ mcpServerChange callback ${callbackIdx} error:`, error);
					}
				});
			});
		}
		createBackendRequestId() {
			return `req-${Date.now()}-${Math.random().toString(36).slice(2)}`;
		}
		async callExpertCenterRpc(method, params) {
			const sessionsWithCall = this.client.sessions;
			const isExpertHistoryMethod = method.startsWith("expert-history/");
			if (isExpertHistoryMethod) console.log("[EXPERT_HISTORY_TRACE][adapter.rpc.request]", {
				method,
				params
			});
			if (typeof sessionsWithCall.call === "function") {
				const result = await sessionsWithCall.call(method, params);
				if (isExpertHistoryMethod) console.log("[EXPERT_HISTORY_TRACE][adapter.rpc.response]", {
					method,
					transport: "client.sessions.call",
					result
				});
				return result;
			}
			if (!this.channel) throw new Error("Expert center RPC channel is unavailable");
			const shouldConvert = method.startsWith("expert-center/") || method.startsWith("expert-history/");
			const primaryMethod = shouldConvert ? `backend:${method.replace(/\//g, "-")}` : method;
			const requestPayload = {
				type: "backend",
				requestId: this.createBackendRequestId(),
				params: {
					type: primaryMethod,
					params: params ?? {}
				}
			};
			try {
				const result = (await this.channel.callMethod("__backend__", requestPayload, 3e4))?.data;
				if (isExpertHistoryMethod) console.log("[EXPERT_HISTORY_TRACE][adapter.rpc.response]", {
					method,
					transport: "__backend__:primary",
					primaryMethod,
					result
				});
				return result;
			} catch (error) {
				if (isExpertHistoryMethod) console.warn("[EXPERT_HISTORY_TRACE][adapter.rpc.primary-failed]", {
					method,
					primaryMethod,
					error: error instanceof Error ? error.message : String(error)
				});
				if (shouldConvert && primaryMethod !== method) {
					const fallbackPayload = {
						...requestPayload,
						requestId: this.createBackendRequestId(),
						params: {
							type: method,
							params: params ?? {}
						}
					};
					const fallbackResult = (await this.channel.callMethod("__backend__", fallbackPayload, 3e4))?.data;
					if (isExpertHistoryMethod) console.log("[EXPERT_HISTORY_TRACE][adapter.rpc.response]", {
						method,
						transport: "__backend__:fallback",
						result: fallbackResult
					});
					return fallbackResult;
				}
				throw error;
			}
		}
		notifyExpertLoadStateListeners(state) {
			this.expertLoadStateListeners.forEach((listener) => {
				try {
					listener(state);
				} catch (error) {
					console.error("[AgentNewAdapter] expert load state listener error:", error);
				}
			});
		}
		updateExpertLoadState(nextState) {
			if (!nextState) return;
			this.currentExpertLoadState = {
				...this.currentExpertLoadState,
				...nextState,
				status: nextState.status ?? this.currentExpertLoadState.status ?? "idle",
				progress: typeof nextState.progress === "number" ? nextState.progress : this.currentExpertLoadState.progress ?? 0,
				error: nextState.status === "error" ? nextState.error ?? this.currentExpertLoadState.error : nextState.error
			};
			this.notifyExpertLoadStateListeners(this.currentExpertLoadState);
		}
		markExpertLoaded(expertId) {
			if (expertId) this.expertLoadedCache.add(expertId);
		}
		/**
		* 响应用户的权限决策
		*
		* @param sessionId ACP 会话 ID
		* @param requestId 权限请求 ID (如 'perm-xxx')
		* @param permissionOptions 用户选择的选项数组（通常只有一个元素）
		*/
		async respondToPermission(sessionId, requestId, permissionOptions) {
			try {
				const { session } = await this.loadSessionInternal(sessionId);
				if (permissionOptions && permissionOptions.length > 0) {
					const selectedOption = permissionOptions[0];
					const optionId = selectedOption.optionId;
					if (selectedOption.kind === "allow_once" || selectedOption.kind === "allow_always") session.resolvePermission(requestId, optionId);
					else session.rejectPermission(requestId, "User rejected");
				} else session.rejectPermission(requestId, "User cancelled");
			} catch (error) {
				console.error("[AgentNewAdapter] respondToPermission failed:", error);
				throw error;
			}
		}
		/**
		* 设置会话模式
		*
		* 用于在会话中切换不同的代理模式（如 'ask', 'architect', 'code', 'craft' 等）
		*
		* @param sessionId ACP 会话 ID
		* @param modeId 要切换到的模式 ID
		*/
		async setMode(sessionId, modeId) {
			try {
				const { session } = await this.loadSessionInternal(sessionId);
				const isCustomAgent = modeId.startsWith("custom:");
				await session.setMode(modeId, isCustomAgent);
			} catch (error) {
				console.error("[AgentNewAdapter] setMode failed:", error);
				throw error;
			}
		}
		/**
		* 设置会话模型
		*
		* 用于在会话中切换不同的 AI 模型
		*
		* @param sessionId ACP 会话 ID
		* @param modelId 要切换到的模型 ID
		*/
		async setSessionModel(sessionId, modelId) {
			try {
				const { session } = await this.loadSessionInternal(sessionId);
				await session.setSessionModel(modelId);
				this.sessionModels.set(sessionId, modelId);
			} catch (error) {
				console.error("🐸[AgentNewAdapter] setSessionModel failed:", error);
				throw error;
			}
		}
		async resolveAndSyncSessionModel(session, sessionId, requestedModelId) {
			const availableModels = session.availableModels || [];
			const cachedModelId = this.sessionModels.get(sessionId) || session.currentModelId || void 0;
			const requestedModelExists = requestedModelId ? availableModels.some((model) => model.id === requestedModelId) : false;
			const resolvedModelId = requestedModelExists ? requestedModelId : cachedModelId || availableModels[0]?.id;
			if (!resolvedModelId) return;
			if (requestedModelId && !requestedModelExists && availableModels.length > 0) console.warn("[AgentNewAdapter] Requested model is not in availableModels, fallback to resolved model:", {
				sessionId,
				requestedModelId,
				resolvedModelId
			});
			await this.setSessionModel(sessionId, resolvedModelId);
			return resolvedModelId;
		}
		async ensureSessionModelBeforeSend(session, sessionId, requestedModelId) {
			const cachedModelId = this.sessionModels.get(sessionId) || session.currentModelId || void 0;
			if (!requestedModelId) return cachedModelId;
			const availableModels = session.availableModels;
			if (availableModels && availableModels.length > 0) {
				if (!availableModels.some((model) => model.id === requestedModelId)) {
					const fallbackModelId = cachedModelId || availableModels[0]?.id;
					console.warn("[AgentNewAdapter] Requested model is not in availableModels, fallback to current model:", {
						sessionId,
						requestedModelId,
						fallbackModelId
					});
					if (fallbackModelId) await this.setSessionModel(sessionId, fallbackModelId);
					return fallbackModelId;
				}
			}
			if (cachedModelId === requestedModelId) {
				this.sessionModels.set(sessionId, requestedModelId);
				return requestedModelId;
			}
			await this.setSessionModel(sessionId, requestedModelId);
			return requestedModelId;
		}
		async requestYieldAfterCurrentStep(sessionId) {
			try {
				return await this.client.sessions.requestYieldAfterCurrentStep(sessionId);
			} catch (error) {
				console.warn("[AgentNewAdapter] requestYieldAfterCurrentStep failed:", error);
				return false;
			}
		}
		async getConversationMessageQueue(sessionId) {
			try {
				return await this.client.sessions.getConversationMessageQueue(sessionId);
			} catch (error) {
				console.warn("[AgentNewAdapter] getConversationMessageQueue failed:", error);
				return;
			}
		}
		async saveConversationMessageQueue(data) {
			try {
				await this.client.sessions.saveConversationMessageQueue(data);
			} catch (error) {
				console.warn("[AgentNewAdapter] saveConversationMessageQueue failed:", error);
			}
		}
		async enqueueConversationMessageQueueItem(sessionId, contentBlocks) {
			return this.client.sessions.enqueueConversationMessageQueueItem(sessionId, contentBlocks);
		}
		async removeConversationMessageQueueItem(sessionId, itemId) {
			return this.client.sessions.removeConversationMessageQueueItem(sessionId, itemId);
		}
		async popConversationMessageQueueItemForEdit(sessionId, itemId) {
			return this.client.sessions.popConversationMessageQueueItemForEdit(sessionId, itemId);
		}
		async reorderConversationMessageQueueItems(sessionId, orderedIds) {
			return this.client.sessions.reorderConversationMessageQueueItems(sessionId, orderedIds);
		}
		async sendConversationMessageQueueItemNow(sessionId, itemId) {
			return this.client.sessions.sendConversationMessageQueueItemNow(sessionId, itemId);
		}
		async activateConversationMessageQueue(sessionId) {
			return this.client.sessions.activateConversationMessageQueue(sessionId);
		}
		async pauseConversationMessageQueue(sessionId, reason) {
			return this.client.sessions.pauseConversationMessageQueue(sessionId, reason);
		}
		async resumeConversationMessageQueue(sessionId) {
			return this.client.sessions.resumeConversationMessageQueue(sessionId);
		}
		/**
		* 初始化工作区
		*
		* 为未来的会话初始化工作区环境
		*
		* @param cwd 工作目录
		* @param mcpServers MCP 服务器配置数组
		* @returns Promise<{ success: boolean; sessionId?: string; error?: string }>
		*/
		async initializeWorkspace(cwd, mcpServers = []) {
			try {
				this.clearSessionCache();
				const result = await this.client.sessions.initializeWorkspace({
					cwd,
					mcpServers,
					needActivated: false
				});
				if (result.success) this.workspaceInitCallbacks.forEach((callback) => {
					try {
						callback(cwd);
					} catch (err) {
						console.error("[AgentNewAdapter] Error in workspaceInitCallback:", err);
					}
				});
				return result;
			} catch (error) {
				console.error("🐸[AgentNewAdapter] initializeWorkspace failed:", error);
				return {
					success: false,
					error: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		/**
		* 获取当前工作区列表
		*
		* 返回当前打开的工作区列表
		*
		* @param filter 可选的过滤参数
		* @returns Promise<Array<{ path: string; label: string }>> 工作区列表
		*/
		async getCurrentWorkspaces(filter) {
			try {
				return await this.client.sessions.getCurrentWorkspaces(filter);
			} catch (error) {
				console.error("[AgentNewAdapter] getCurrentWorkspaces failed:", error);
				return [];
			}
		}
		async getAutomationSnapshot() {
			try {
				return await this.client.sessions.getAutomationSnapshot();
			} catch (error) {
				console.error("[AgentNewAdapter] getAutomationSnapshot failed:", error);
				return {
					automations: [],
					inbox: [],
					runtimeState: {},
					updatedAt: Date.now()
				};
			}
		}
		/**
		* 订阅 Automation 快照实时推送
		* 通过 client.sessions.on('automationSnapshotUpdate') 监听服务端推送
		*/
		onAutomationSnapshotUpdate(callback) {
			const handler = (snapshot) => {
				try {
					callback(snapshot);
				} catch (err) {
					console.error("[AgentNewAdapter] Automation snapshot callback error:", err);
				}
			};
			this.client.sessions.on("automationSnapshotUpdate", handler);
			return () => {
				this.client.sessions.off("automationSnapshotUpdate", handler);
			};
		}
		/**
		* 订阅会话消息队列快照实时推送
		* 通过 client.sessions.on('conversationMessageQueueUpdated') 监听服务端推送
		*/
		onConversationMessageQueueUpdated(callback) {
			const handler = (snapshot) => {
				try {
					callback(snapshot);
				} catch (err) {
					console.error("[AgentNewAdapter] Conversation message queue callback error:", err);
				}
			};
			this.client.sessions.on("conversationMessageQueueUpdated", handler);
			return () => {
				this.client.sessions.off("conversationMessageQueueUpdated", handler);
			};
		}
		/**
		* 订阅插件/市场变更推送
		* 通过 client.sessions.on('pluginsChanged') 监听服务端推送
		* 当插件安装、卸载或市场配置变化时触发回调
		* @param callback 回调函数，接收可选的变更信息
		*/
		onPluginsChanged(callback) {
			const handler = (options) => {
				try {
					callback(options);
				} catch (err) {
					console.error("[AgentNewAdapter] Plugins changed callback error:", err);
				}
			};
			this.client.sessions.on("pluginsChanged", handler);
			return () => {
				this.client.sessions.off("pluginsChanged", handler);
			};
		}
		/**
		* 订阅模型列表变更推送
		* 通过 client.sessions.on('modelsChanged') 监听服务端推送
		* 当 ProductManager 配置变化导致模型列表更新时触发回调
		* @param callback 回调函数，接收包含 availableModels 的变更信息
		*/
		onModelsChanged(callback) {
			const handler = (params) => {
				try {
					callback(params);
				} catch (err) {
					console.error("[AgentNewAdapter] Models changed callback error:", err);
				}
			};
			this.client.sessions.on("modelsChanged", handler);
			return () => {
				this.client.sessions.off("modelsChanged", handler);
			};
		}
		/**
		* 订阅 Product 配置变更推送
		* 通过 client.sessions.on('productConfigChanged') 监听服务端推送
		* 当 ProductManager.onDidChange 触发时（账号切换、配置远端同步等）回调
		* @param callback 回调函数，接收包含 productFeatures 等信息的配置参数
		*/
		onProductConfigChanged(callback) {
			const handler = (params) => {
				try {
					console.log("[AgentNewAdapter] Product config changed, productFeatures:", JSON.stringify(params?.productFeatures));
					callback(params);
				} catch (err) {
					console.error("[AgentNewAdapter] Product config changed callback error:", err);
				}
			};
			this.client.sessions.on("productConfigChanged", handler);
			if (this.latestProductConfig) try {
				console.log("[AgentNewAdapter] Replaying cached productConfig to new subscriber");
				callback(this.latestProductConfig);
			} catch (err) {
				console.error("[AgentNewAdapter] Product config replay callback error:", err);
			}
			return () => {
				this.client.sessions.off("productConfigChanged", handler);
			};
		}
		async updateAutomation(payload) {
			try {
				return await this.client.sessions.updateAutomation(payload);
			} catch (error) {
				console.error("[AgentNewAdapter] updateAutomation failed:", error);
				return {
					success: false,
					message: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		async deleteAutomation(id) {
			try {
				return await this.client.sessions.deleteAutomation(id);
			} catch (error) {
				console.error("[AgentNewAdapter] deleteAutomation failed:", error);
				return {
					success: false,
					message: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		async archiveAutomationInboxItem(itemId) {
			try {
				return await this.client.sessions.archiveAutomationInboxItem(itemId);
			} catch (error) {
				console.error("[AgentNewAdapter] archiveAutomationInboxItem failed:", error);
				return {
					success: false,
					message: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		async deleteAutomationInboxItem(itemId) {
			try {
				return await this.client.sessions.deleteAutomationInboxItem(itemId);
			} catch (error) {
				console.error("[AgentNewAdapter] deleteAutomationInboxItem failed:", error);
				return {
					success: false,
					message: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		async testAutomation(id) {
			try {
				return await this.client.sessions.testAutomation(id);
			} catch (error) {
				console.error("[AgentNewAdapter] testAutomation failed:", error);
				return {
					success: false,
					message: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		/**
		* ACP 协议: initialize - 初始化连接
		*
		* AgentClient 不需要显式初始化，返回默认响应
		*/
		async initialize(request) {
			if (this.initialized) return {
				protocolVersion: 1,
				agentCapabilities: {},
				agentInfo: {
					name: "Agent",
					version: "1.0.0"
				}
			};
			try {
				this.initialized = true;
				return {
					protocolVersion: 1,
					agentCapabilities: {},
					agentInfo: {
						name: "Agent",
						version: "1.0.0"
					}
				};
			} catch (error) {
				console.error("[AgentNewAdapter] Initialize failed:", error);
				throw error;
			}
		}
		/**
		* 清理 session 缓存
		* 清除所有与当前 session 相关的缓存状态
		*
		* 注意：不清理 messageCache，因为：
		* 1. 消息缓存按 sessionId 隔离存储
		* 2. 切换会话时旧会话的消息缓存可能还需要（用于后台任务完成后的更新）
		* 3. 消息缓存在 archiveSession/destroy 时会被清理
		*
		* 关键修复：在清除缓存前，移除旧 session 的所有事件监听器（包括 connection 上的监听器）
		* 使用 session.detach() 而不是 session.disconnect()：
		* - detach(): 只移除监听器，不断开连接（适用于连接复用场景）
		* - disconnect(): 移除监听器并断开连接
		*/
		clearSessionCache() {
			console.log(`[RT-DEBUG][UI:Adapter] clearSessionCache: prevSessionId=${this.currentActiveSessionId?.substring(0, 8)}, hasCurrentSession=${!!this.currentSession}`);
			if (this.currentSession) {
				console.log("[AgentNewAdapter] clearSessionCache: Detaching old session from connection events", { sessionId: this.currentActiveSessionId?.substring(0, 8) });
				try {
					this.currentSession.detach();
					console.log("[AgentNewAdapter] clearSessionCache: Old session detached successfully");
				} catch (err) {
					console.warn("[AgentNewAdapter] clearSessionCache: Error detaching session:", err);
				}
			}
			if (this.currentActiveSessionId) {
				this.listenedSessionIds.delete(this.currentActiveSessionId);
				console.log("[AgentNewAdapter] clearSessionCache: Removed from listenedSessionIds", { sessionId: this.currentActiveSessionId.substring(0, 8) });
			}
			this.currentActiveSessionId = null;
			this.currentSession = void 0;
			this.currentActiveSessionPromise = null;
			this.isNewLoadInProgress = null;
		}
		/**
		* 重置所有缓存（用户退出登录/切换用户时调用）
		*
		* 这个方法是公开的，供 UI 层（如 App.tsx）在用户状态变化时调用。
		* 清除所有 session 相关缓存，确保重新登录后：
		* 1. loadSessionInternal 不会命中旧缓存
		* 2. 必须重新调用 client.sessions.load() 获取最新数据
		*
		* 必须清理的缓存包括：
		* - session 缓存（currentActiveSessionId, currentSession, currentActiveSessionPromise）
		* - 消息缓存（messageCache, toolCallIdToMessageId）
		* - session 配置缓存（sessionConfigs）
		* - 已监听的 session ID 集合（listenedSessionIds）
		* - session 模型缓存（sessionModels）
		* - 浏览器 URL 缓存（browserUrlCache）
		* - 待处理消息跟踪器（pendingMessageTracker）
		*/
		resetAllCaches() {
			console.log("[AgentNewAdapter] resetAllCaches: Clearing all session caches for user logout/switch");
			this.clearSessionCache();
			this.messageCache.clear();
			this.toolCallIdToMessageId.clear();
			this.processedOffsets.clear();
			this.sessionConfigs.clear();
			this.listenedSessionIds.clear();
			this.sessionModels.clear();
			this.browserUrlCache.clear();
			this.pendingMessageTracker.clearAll();
		}
		/**
		* 会话切换前处理指定会话的缓存
		*
		* 注意：不能在这里删除 messageCache。
		* automation 后台运行时，消息可能已进入 messageCache 但尚未来得及持久化；
		* 若在 loadSession 前清空，会导致“切换会话空白/发起消息丢失”。
		*
		* @param sessionId 会话 ID
		*/
		clearMessageCacheForSession(sessionId) {
			const sessionCache = this.messageCache.get(sessionId);
			if (sessionCache && sessionCache.size > 0) {
				console.log("[AgentNewAdapter] Preserving message cache for replay:", sessionId.substring(0, 8), "size=", sessionCache.size);
				return;
			}
			const keysToDelete = [];
			for (const key of this.toolCallIdToMessageId.keys()) if (key.startsWith(`${sessionId}:`)) keysToDelete.push(key);
			keysToDelete.forEach((key) => this.toolCallIdToMessageId.delete(key));
		}
		/**
		* 检查是否应该跳过重复的 offset
		* @param sessionId 会话 ID
		* @param offset 消息的 offset 值
		* @returns true 表示应该跳过（重复），false 表示应该处理
		*/
		shouldSkipDuplicateOffset(sessionId, offset) {
			if (offset === void 0 || offset === null) return false;
			const offsets = this.processedOffsets.get(sessionId);
			return offsets ? offsets.has(offset) : false;
		}
		/**
		* 记录已处理的 offset
		* @param sessionId 会话 ID
		* @param offset 消息的 offset 值
		*/
		recordProcessedOffset(sessionId, offset) {
			if (!this.processedOffsets.has(sessionId)) this.processedOffsets.set(sessionId, /* @__PURE__ */ new Set());
			this.processedOffsets.get(sessionId).add(offset);
		}
		/**
		* 清理会话的 offset 记录
		* @param sessionId 会话 ID
		*/
		clearProcessedOffsets(sessionId) {
			this.processedOffsets.delete(sessionId);
		}
		/**
		* 会话激活时同步模型状态
		* 使用 session 的 currentModelId 更新本地缓存
		*/
		syncSessionModelOnActivation(sessionId, session) {
			if (session.currentModelId) this.sessionModels.set(sessionId, session.currentModelId);
		}
		/**
		* 将前端构建的消息（用户消息、分隔线等）写入 messageCache
		*
		* 场景：用户消息由前端乐观创建后通过 addOrUpdateMessage 展示，
		* 但 EH 不会将 ACP 来源的消息回传（acp-session-event-handler.ts 的去重逻辑），
		* 因此这类消息不会经过 handleMessageUpdate 进入 messageCache。
		* 调用此方法可确保 PATH1 切换时 replayMessageCache 能正确还原这些消息。
		*
		* @param sessionId 会话 ID
		* @param message 需要缓存的消息
		*/
		cacheMessage(sessionId, message) {
			if (!sessionId || !message?.id) return;
			let sessionCache = this.messageCache.get(sessionId);
			if (!sessionCache) {
				sessionCache = /* @__PURE__ */ new Map();
				this.messageCache.set(sessionId, sessionCache);
			}
			sessionCache.set(message.id, message);
		}
		/**
		* 从 messageCache 中移除指定消息。
		* 用于 resend/edit 场景：前端删除消息后同步清理缓存，
		* 避免 tab 切换 / replayMessageCache 时旧消息复现。
		*/
		uncacheMessages(sessionId, messageIds) {
			const sessionCache = this.messageCache.get(sessionId);
			if (!sessionCache) return;
			for (const id of messageIds) sessionCache.delete(id);
		}
		/**
		* 从 messageCache 中重新推送指定会话的所有缓存消息到 UI
		*
		* 使用场景：
		* - 自动化任务在后台运行时，emitMessage 因为会话过滤（currentActiveSessionId 不匹配）
		*   丢弃了消息推送，但消息已保存在 messageCache 中
		* - 当用户从 Automation 面板切换到该对话时，loadSession 命中缓存（session 已加载），
		*   不会重新调用 client.sessions.load()，因此服务端不会重新推送历史消息
		* - 此方法将 messageCache 中的消息按协议 offset（回退 createTime）顺序重新推送到 UI，填补空白
		*
		* @param sessionId 要重播消息的会话 ID
		*/
		replayMessageCache(sessionId) {
			const sessionCache = this.messageCache.get(sessionId);
			if (!sessionCache || sessionCache.size === 0) {
				console.log("[AgentNewAdapter] replayMessageCache: No cached messages for session", sessionId.substring(0, 8));
				return;
			}
			const messages = Array.from(sessionCache.values());
			const messageTypeStats = messages.reduce((acc, message) => {
				const messageType = message?.messageType || "unknown";
				acc[messageType] = (acc[messageType] || 0) + 1;
				return acc;
			}, {});
			const validOffsets = messages.map((message) => message._offset).filter((value) => typeof value === "number" && Number.isFinite(value));
			console.log("[AgentNewAdapter] replay_path_used:", {
				sessionId: sessionId.substring(0, 8),
				messageCount: messages.length,
				messageTypeStats,
				offsetRange: validOffsets.length > 0 ? {
					min: Math.min(...validOffsets),
					max: Math.max(...validOffsets)
				} : null
			});
			messages.sort((a, b) => {
				const offsetA = a._offset;
				const offsetB = b._offset;
				if (typeof offsetA === "number" && Number.isFinite(offsetA) && typeof offsetB === "number" && Number.isFinite(offsetB)) return offsetA - offsetB;
				if (typeof offsetA === "number" && Number.isFinite(offsetA)) return -1;
				if (typeof offsetB === "number" && Number.isFinite(offsetB)) return 1;
				return (a.createTime || 0) - (b.createTime || 0);
			});
			for (const message of messages) this.emitMessage(message);
		}
		/**
		* 核心方法：获取或加载 session（唯一访问 client.sessions.load 的地方）
		*
		* 缓存策略：
		* 1. 如果 sessionId 匹配且 currentSession 已存在 → 直接返回缓存（最快）
		* 2. 如果 sessionId 匹配且 promise 存在 → 等待进行中的加载（避免重复）
		* 3. 否则 → 清理旧缓存，调用 client.sessions.load 加载新 session
		*
		* 关键时序：
		* - 事件监听器必须在 ACP loadSession 调用之前设置
		* - 因为服务端会在返回 loadSession 响应之前推送历史消息（sessionUpdate 通知）
		* - 使用 onSessionCreated 回调确保监听器在历史消息推送前就绑定好
		*
		* @param sessionId 会话 ID
		* @returns 包含 ActiveSession 和加载路径信息
		*/
		async loadSessionInternal(sessionId) {
			if (this.currentActiveSessionId === sessionId && this.currentSession) {
				console.log(`[RT-DEBUG][UI:Adapter] loadSessionInternal PATH1: cache hit, sessionId=${sessionId.substring(0, 8)}`);
				return {
					session: this.currentSession,
					path: "PATH1"
				};
			}
			if (this.currentActiveSessionId === sessionId && this.currentActiveSessionPromise) {
				const effectivePath = this.isNewLoadInProgress === sessionId ? "PATH3" : "PATH2";
				console.log(`[RT-DEBUG][UI:Adapter] loadSessionInternal PATH2: in-progress, sessionId=${sessionId.substring(0, 8)}, effectivePath=${effectivePath}`);
				return {
					session: await this.currentActiveSessionPromise,
					path: effectivePath
				};
			}
			console.log(`[RT-DEBUG][UI:Adapter] loadSessionInternal PATH3: new load, sessionId=${sessionId.substring(0, 8)}, prevSessionId=${this.currentActiveSessionId?.substring(0, 8)}`);
			this.clearSessionCache();
			this.isNewLoadInProgress = sessionId;
			this.currentActiveSessionId = sessionId;
			this.clearMessageCacheForSession(sessionId);
			this.clearProcessedOffsets(sessionId);
			const config = this.sessionConfigs.get(sessionId);
			if (!config) throw new Error(`[AgentNewAdapter] Session config not found for: ${sessionId}. Please call loadSession or createNewSession first.`);
			const loadPromise = this.client.sessions.load({
				sessionId,
				cwd: config.cwd,
				mcpServers: config.mcpServers,
				onSessionCreated: (session) => {
					console.log("[AgentNewAdapter] onSessionCreated callback - setting up listeners before history push", { sessionId: sessionId.substring(0, 8) });
					this.setupSessionEventListeners(session, sessionId);
				}
			});
			this.currentActiveSessionPromise = loadPromise;
			const session = await loadPromise;
			console.log("[AgentNewAdapter] loadSessionInternal: Session loaded", {
				sessionId: sessionId.substring(0, 8),
				session
			});
			if (this.isNewLoadInProgress === sessionId) this.isNewLoadInProgress = null;
			if (this.currentActiveSessionPromise !== loadPromise) {
				console.warn("[AgentNewAdapter] Session load outdated, skipping cache update", { sessionId: sessionId.substring(0, 8) });
				return {
					session,
					path: "PATH3"
				};
			}
			this.syncSessionModelOnActivation(sessionId, session);
			this.currentSession = session;
			this.currentActiveSessionId = sessionId;
			return {
				session,
				path: "PATH3"
			};
		}
		/**
		* 设置 session 事件监听器
		* @param session - ActiveSession 实例
		*/
		setupSessionEventListeners(session, fallbackSessionId) {
			const rawSessionId = session?.id ?? session?.sessionId ?? fallbackSessionId;
			const resolvedSessionId = typeof rawSessionId === "string" && rawSessionId.length > 0 ? rawSessionId : `unknown-${Date.now().toString(36)}`;
			const shortSessionId = resolvedSessionId.substring(0, 8);
			if (!rawSessionId) console.warn("[AgentNewAdapter] setupSessionEventListeners: session id is missing, fallback id is used", {
				fallbackSessionId,
				resolvedSessionId
			});
			console.log(`[RT-DEBUG][UI:Adapter] setupSessionEventListeners: sessionId=${shortSessionId}, alreadyListened=${this.listenedSessionIds.has(resolvedSessionId)}`);
			if (this.listenedSessionIds.has(resolvedSessionId)) {
				console.log(`[RT-DEBUG][UI:Adapter] setupSessionEventListeners SKIPPED: already listened, sessionId=${shortSessionId}`);
				return;
			}
			this.listenedSessionIds.add(resolvedSessionId);
			session.on("sessionUpdate", (notification) => {
				this.handleSessionUpdate(notification);
			});
			session.on("permissionRequest", (data) => {
				this.handlePermissionRequest(data);
			});
			session.on("artifactCreated", (artifact) => {
				this.emitArtifact(resolvedSessionId, artifact, "created");
			});
			session.on("artifactUpdated", (artifact) => {
				this.emitArtifact(resolvedSessionId, artifact, "updated");
			});
			session.on("artifactDeleted", (artifact) => {
				this.emitArtifact(resolvedSessionId, artifact, "deleted");
			});
			session.on("checkpointCreated", (checkpoint) => {
				this.emitCheckpoint(resolvedSessionId, "created", checkpoint);
			});
			session.on("checkpointUpdated", (checkpoint) => {
				this.emitCheckpoint(resolvedSessionId, "updated", checkpoint);
			});
			session.on("command", (command) => {
				this.handleCommand(resolvedSessionId, command);
			});
			session.on("error", (error) => {
				console.error("[AgentNewAdapter] Session error:", error);
				this.handleError(error);
			});
			session.on("connected", () => {});
			session.on("disconnected", () => {});
		}
		/**
		* ACP 协议: session/new - 创建新会话
		*
		* 使用 AgentClient.sessions.create()
		* 注意：tags 和 prompt 参数仅用于 Cloud 场景，Local 场景忽略这些参数
		*/
		async createNewSession(cwd, options) {
			try {
				const { mcpServers = [], mode: modeID = "craft", model: modelID, isPlayground = false, welcomeMode, tags: _tags, prompt: _prompt } = options || {};
				if (isPlayground) cwd = "";
				const session = await this.client.sessions.create({
					cwd,
					options: {
						mcpServers,
						_meta: { "codebuddy.ai": {
							isPlayground,
							...welcomeMode ? { welcomeMode } : {}
						} }
					}
				});
				const createdSessionId = session.id ?? session.sessionId;
				if (!createdSessionId) throw new Error("Create session returned invalid session id");
				const actualCwd = session.cwd || cwd;
				this.sessionConfigs.set(createdSessionId, {
					cwd: actualCwd,
					mcpServers
				});
				this.setupSessionEventListeners(session, createdSessionId);
				this.currentSession = session;
				this.currentActiveSessionId = createdSessionId;
				this.currentActiveSessionPromise = Promise.resolve(session);
				await this.setMode(createdSessionId, modeID);
				const responseCurrentModelId = await this.resolveAndSyncSessionModel(session, createdSessionId, modelID);
				return {
					activeSession: session,
					response: {
						sessionId: createdSessionId,
						modes: session.availableModes && session.currentMode ? {
							availableModes: session.availableModes,
							currentModeId: session.currentMode
						} : void 0,
						models: session.availableModels && responseCurrentModelId ? {
							availableModels: session.availableModels,
							currentModelId: responseCurrentModelId
						} : void 0
					}
				};
			} catch (error) {
				this.clearSessionCache();
				console.error("🐸[AgentNewAdapter] Create new session failed:", error);
				throw error;
			}
		}
		/**
		* ACP 协议: session/load - 加载已有会话
		*
		* 使用 AgentClient.sessions.load()
		* @returns 包含 modes 和 models 信息的结果
		*/
		async loadSession(sessionId, cwd, mcpServers = []) {
			try {
				const existingConfig = this.sessionConfigs.get(sessionId);
				const effectiveCwd = cwd || existingConfig?.cwd || "";
				const effectiveMcpServers = mcpServers.length > 0 ? mcpServers : existingConfig?.mcpServers || [];
				this.sessionConfigs.set(sessionId, {
					cwd: effectiveCwd,
					mcpServers: effectiveMcpServers
				});
				const { session, path } = await this.loadSessionInternal(sessionId);
				console.log("[AgentNewAdapter] session_switch_path:", {
					sessionId: sessionId.substring(0, 8),
					path,
					cacheSize: this.messageCache.get(sessionId)?.size || 0,
					offsetCount: this.processedOffsets.get(sessionId)?.size || 0
				});
				console.log(`[AgentNewAdapter] replayMessageCache for ${path}:`, sessionId.substring(0, 8));
				this.replayMessageCache(sessionId);
				const result = {};
				if (session.availableModes) result.modes = {
					availableModes: session.availableModes,
					currentModeId: session.currentMode || ""
				};
				if (session.availableModels) {
					const currentModelId = this.sessionModels.get(sessionId) || session.currentModelId || "";
					result.models = {
						availableModels: session.availableModels,
						currentModelId
					};
				}
				return result;
			} catch (error) {
				if (this.currentActiveSessionId === sessionId) this.clearSessionCache();
				console.error("[AgentNewAdapter] Load session failed:", error);
				throw error;
			}
		}
		/**
		* 获取指定会话的历史消息
		*
		* 读取策略：
		* 1. 优先从 messageCache 中读取（当前或最近活跃的 session 有缓存）
		* 2. 如果缓存为空，通过独立的 client.sessions.load 加载历史消息
		*    - 通过 sessionUpdate 事件收集消息，不影响当前活跃 session
		*
		* @param sessionId 会话 ID
		* @param cwd 工作目录（用于没有缓存时的 loadSession 调用）
		* @returns 消息数组（按 offset/createTime 排序）
		*/
		async getSessionMessages(sessionId, cwd = "") {
			const sortMessages = (messages) => {
				messages.sort((a, b) => {
					const offsetA = a._offset;
					const offsetB = b._offset;
					if (typeof offsetA === "number" && Number.isFinite(offsetA) && typeof offsetB === "number" && Number.isFinite(offsetB)) return offsetA - offsetB;
					return (a.createTime || 0) - (b.createTime || 0);
				});
				return messages;
			};
			const sessionCache = this.messageCache.get(sessionId);
			if (sessionCache && sessionCache.size > 0) {
				console.log("[AgentNewAdapter] getSessionMessages: cache hit", sessionId.substring(0, 8), "size=", sessionCache.size);
				return sortMessages(Array.from(sessionCache.values()));
			}
			console.log("[AgentNewAdapter] getSessionMessages: cache miss, loading via independent session load", sessionId.substring(0, 8));
			try {
				const effectiveCwd = cwd || this.sessionConfigs.get(sessionId)?.cwd || "";
				const LOAD_TIMEOUT_MS = 3e4;
				const loadPromise = this.client.sessions.load({
					sessionId,
					cwd: effectiveCwd,
					onSessionCreated: (loadedSession) => {
						this.setupSessionEventListeners(loadedSession, sessionId);
					}
				});
				const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(/* @__PURE__ */ new Error(`sessions.load timed out after ${LOAD_TIMEOUT_MS}ms`)), LOAD_TIMEOUT_MS));
				const session = await Promise.race([loadPromise, timeoutPromise]);
				await new Promise((resolve) => setTimeout(resolve, 1e3));
				const loadedCache = this.messageCache.get(sessionId);
				if (loadedCache && loadedCache.size > 0) {
					console.log("[AgentNewAdapter] getSessionMessages: loaded", loadedCache.size, "messages for", sessionId.substring(0, 8));
					return sortMessages(Array.from(loadedCache.values()));
				}
				session.detach();
				console.log("[AgentNewAdapter] getSessionMessages: no messages found after load", sessionId.substring(0, 8));
				return [];
			} catch (error) {
				console.error("[AgentNewAdapter] getSessionMessages failed:", error);
				return [];
			}
		}
		/**
		* 加载所有会话
		* 通过 client.sessions.list() 获取指定用户的 session 列表
		* @param userId - 用户 ID（必传，用于多用户隔离）
		*/
		async loadAllConversation(userId) {
			const startTime = performance.now();
			console.log("🐸[AgentNewAdapter:Perf] loadAllConversation starting...");
			try {
				if (!userId) {
					console.warn("🐸[AgentNewAdapter] loadAllConversation: No userId provided, returning empty list");
					return [];
				}
				console.log("🐸[AgentNewAdapter:Perf] Calling client.sessions.list...");
				const listStart = performance.now();
				const result = await this.client.sessions.list({ userId });
				console.log(`🐸[AgentNewAdapter:Perf] client.sessions.list completed in ${(performance.now() - listStart).toFixed(0)}ms`);
				const conversations = result.agents.map((sessionInfo) => ({
					id: sessionInfo.id,
					cwd: sessionInfo.cwd ?? "",
					title: sessionInfo.name || t("conversation.creatingTask"),
					lastMessage: "",
					timestamp: sessionInfo.lastActivityAt ? new Date(sessionInfo.lastActivityAt) : sessionInfo.createdAt ?? /* @__PURE__ */ new Date(),
					status: sessionInfo.status,
					isPlayground: sessionInfo.isPlayground
				}));
				console.log(`🐸[AgentNewAdapter:Perf] loadAllConversation total time: ${(performance.now() - startTime).toFixed(0)}ms, got ${conversations.length} sessions`);
				return conversations;
			} catch (error) {
				console.error(`🐸[AgentNewAdapter] Load all sessions failed after ${(performance.now() - startTime).toFixed(0)}ms:`, error);
				throw error;
			}
		}
		/**
		* 加载已归档的会话列表
		* 通过 client.sessions.list() 获取 status=archived 的 session 列表
		* @param userId - 用户 ID（必传，用于多用户隔离）
		*/
		async loadArchivedConversations(userId) {
			try {
				if (!userId) {
					console.warn("🐸[AgentNewAdapter] loadArchivedConversations: No userId provided, returning empty list");
					return [];
				}
				return (await this.client.sessions.list({
					userId,
					filters: [{
						field: "status",
						value: "archived"
					}],
					sort: {
						orderBy: "updatedAt",
						order: "desc"
					}
				})).agents.map((sessionInfo) => ({
					id: sessionInfo.id,
					cwd: sessionInfo.cwd ?? "",
					title: sessionInfo.name || t("conversation.creatingTask"),
					lastMessage: "",
					timestamp: sessionInfo.lastActivityAt ? new Date(sessionInfo.lastActivityAt) : sessionInfo.createdAt ?? /* @__PURE__ */ new Date(),
					status: sessionInfo.status,
					isPlayground: sessionInfo.isPlayground
				}));
			} catch (error) {
				console.error("🐸[AgentNewAdapter] loadArchivedConversations failed:", error);
				throw error;
			}
		}
		/**
		* 创建新会话
		*/
		async newSession(request) {
			const codebuddyMeta = request._meta?.["codebuddy.ai"];
			const modeID = codebuddyMeta?.mode || "craft";
			const modelID = typeof codebuddyMeta?.model === "string" && codebuddyMeta.model ? codebuddyMeta.model : void 0;
			const welcomeMode = codebuddyMeta?.welcomeMode || "coding";
			if (welcomeMode === "coding") {} else if (welcomeMode === "working") {}
			return (await this.createNewSession(request.cwd, {
				mcpServers: request.mcpServers,
				mode: modeID,
				model: modelID,
				isPlayground: welcomeMode !== "coding"
			})).response;
		}
		/**
		* 获取 Session 列表（使用 client.sessions.list()）
		* @param userId - 用户 ID（必传，用于多用户隔离）
		*/
		async getSessions(userId) {
			try {
				if (!userId) {
					console.warn("🐸[AgentNewAdapter] getSessions: No userId provided, returning empty list");
					return { sessions: [] };
				}
				return { sessions: (await this.client.sessions.list({ userId })).agents.map((s) => ({
					id: s.id,
					name: s.name,
					status: s.status,
					createdAt: s.createdAt
				})) };
			} catch (error) {
				console.error("[AgentNewAdapter] Get sessions failed:", error);
				throw error;
			}
		}
		/**
		* 获取会话列表 (支持过滤、排序、分页)
		*
		* Local 模式: 本地过滤/排序，返回分组数据，无分页
		* 注意: Cloud 模式请使用 CloudAgentAdapter
		*/
		async listConversations(options) {
			try {
				const result = await this.client.sessions.list(options);
				const conversations = result.agents.map((session) => ({
					id: session.id,
					cwd: session.cwd ?? "",
					title: session.name || t("conversation.creatingTask"),
					lastMessage: "",
					timestamp: session.lastActivityAt ? new Date(session.lastActivityAt) : session.createdAt ?? /* @__PURE__ */ new Date(),
					status: session.status || "pending",
					isPlayground: session.isPlayground ?? false,
					isBackgroundAutomation: session.isBackgroundAutomation ?? false,
					isUserDefinedTitle: session.isUserDefinedTitle
				}));
				if (conversations.length > 0) return {
					conversations,
					groups: this.groupConversationsByCwd(conversations),
					pagination: result.pagination
				};
				return {
					conversations,
					pagination: result.pagination
				};
			} catch (error) {
				console.error("[AgentNewAdapter] List conversations failed:", error);
				throw error;
			}
		}
		/**
		* 按 cwd 分组会话
		*/
		groupConversationsByCwd(conversations) {
			const groupMap = /* @__PURE__ */ new Map();
			for (const conv of conversations) {
				const key = conv.cwd || "other";
				if (!groupMap.has(key)) groupMap.set(key, []);
				groupMap.get(key).push(conv);
			}
			const groups = [];
			for (const [key, convs] of groupMap) groups.push({
				key,
				title: getWorkspaceGroupTitle(key),
				conversations: convs
			});
			return groups;
		}
		/**
		* 处理 ACP 协议的 session/update 事件
		* Local 模式：只对流式文本消息使用累积器（作为兼容层）
		*/
		handleSessionUpdate(notification) {
			const { update, sessionId } = notification;
			const updateType = update.sessionUpdate;
			console.log(`[RT-DEBUG][UI:Adapter] handleSessionUpdate ENTRY: type=${updateType}, sessionId=${sessionId?.substring(0, 8)}, currentActiveSessionId=${this.currentActiveSessionId?.substring(0, 8)}`);
			const rawOffset = (notification._meta?.["codebuddy.ai"])?.offset;
			const offset = typeof rawOffset === "number" ? rawOffset : typeof rawOffset === "string" && rawOffset.trim() !== "" && Number.isFinite(Number(rawOffset)) ? Number(rawOffset) : void 0;
			if (this.shouldSkipDuplicateOffset(sessionId, offset)) {
				console.log("[AgentNewAdapter] duplicate_offset_dropped:", {
					sessionId: sessionId.substring(0, 8),
					offset,
					updateType: notification.updateType || updateType || "unknown"
				});
				return;
			}
			if (offset !== void 0) this.recordProcessedOffset(sessionId, offset);
			if (isStateUpdateNotification(update)) {
				this.handleStateUpdate(update);
				this.emitStateUpdate(sessionId, notification);
				return;
			}
			if (updateType === "state_update") {
				this.handleNonStandardStateUpdate(sessionId, notification);
				this.emitStateUpdate(sessionId, notification);
				return;
			}
			if (updateType === "current_mode_update") {
				const modeUpdate = update;
				const notificationMeta = notification._meta?.["codebuddy.ai"];
				const updateMeta = modeUpdate._meta?.["codebuddy.ai"];
				const metaInfo = notificationMeta || updateMeta;
				if (metaInfo) {
					if (metaInfo.is_subagents_changed ?? false) {
						subagentsSubject.next({
							sessionId,
							results: []
						});
						return;
					}
					const modelId = metaInfo.modelId;
					if (modelId) this.emitModelUpdate(sessionId, modelId);
				}
				this.emitModeUpdate(sessionId, modeUpdate);
				return;
			}
			if (updateType === "available_commands_update") {
				if (this.currentActiveSessionId === sessionId && this.currentActiveSessionPromise) this.currentActiveSessionPromise.then((session) => {
					const commands = (update.availableCommands || []).map((cmd) => ({
						name: cmd.name,
						description: cmd.description,
						input: cmd.input ? { hint: cmd.input.hint } : void 0,
						_meta: cmd._meta
					}));
					session.setAvailableCommands(commands);
					commandSubject.next({
						sessionId,
						commands
					});
				}).catch((err) => {
					console.error("🐸[AgentNewAdapter] Failed to update available commands:", err);
				});
				return;
			}
			if (updateType === "session_info_update") {
				const meta = notification._meta?.["codebuddy.ai"];
				if (meta?.isSessionSeparator && meta?.messageId) {
					const separatorMessage = {
						id: meta.messageId,
						requestId: "",
						conversationId: sessionId,
						messageType: "system",
						createTime: meta.createTime ?? Date.now(),
						complete: true,
						content: "",
						extra: meta.separatorExtra ?? { isSessionSeparator: true }
					};
					if (offset !== void 0) separatorMessage._offset = offset;
					this.cacheMessage(sessionId, separatorMessage);
					this.emitMessage(separatorMessage);
					return;
				}
				this.handleSessionInfoUpdate(sessionId, update);
				return;
			}
			if (updateType === "plan") {
				this.handlePlanSessionUpdate(sessionId, update, notification._meta);
				return;
			}
			let messageId = "";
			let requestId = "";
			if (notification._meta) {
				const meta = notification._meta["codebuddy.ai"];
				messageId = meta?.messageId || "";
				requestId = meta?.messageRequestId || "";
			}
			this.handleMessageUpdate(notification, messageId, requestId, offset);
		}
		/**
		* 处理 IDE → Local 状态同步
		* 接收 IDE 端的状态推送，更新 chatStateStore
		*/
		handleStateUpdate(stateUpdate) {
			const { conversationId, chatState, event, source, timestamp, eventId } = stateUpdate;
			if (source === "local") return;
			const state = chatState === "talking" ? ChatState.TALKING : ChatState.IDLE;
			chatStateStore.setStateWithMeta(conversationId, state, source, timestamp);
			if (eventId && this.client.environmentType === "local" && this.channel) this.sendStateSyncToIDE(conversationId, event, eventId);
		}
		handleNonStandardStateUpdate(sessionId, notification) {
			const update = notification.update;
			const meta = notification._meta?.["codebuddy.ai"];
			const currentState = update.currentState || meta?.state;
			const timestamp = typeof update.timestamp === "number" ? update.timestamp : Date.now();
			if (!currentState) return;
			const chatState = new Set([
				"running",
				"preparing",
				"summarizing",
				"waiting_user_input",
				"waiting_team_members"
			]).has(currentState) ? ChatState.TALKING : ChatState.IDLE;
			chatStateStore.setStateWithMeta(sessionId, chatState, "ide", timestamp);
			console.log("[AgentNewAdapter] Received state_update (non-standard format):", {
				sessionId,
				currentState,
				chatState
			});
		}
		/**
		* 处理会话信息更新（标题、状态等）
		*
		* 当收到 session_info_update 消息时：
		* - title 在 update 对象中
		* - status 在 _meta 中
		* 需要分别处理这两个字段，避免相互干扰。
		*/
		handleSessionInfoUpdate(sessionId, update) {
			const title = update.title;
			const status = update._meta?.status;
			if (title !== void 0 || status !== void 0) {
				const conversation = { id: sessionId };
				if (title !== void 0) conversation.title = title;
				if (status !== void 0) conversation.status = status;
				this.emitMessage({
					type: "conversation",
					conversation
				});
			}
		}
		/**
		* 触发 State 更新回调
		* 只有当 sessionId 匹配当前活跃的 session 时才触发回调
		*
		* @param sessionId 会话 ID
		* @param update 状态更新内容
		*/
		emitStateUpdate(sessionId, notification) {
			if (!this.currentActiveSessionId) {
				console.log("[AgentNewAdapter] Skipping state update - no active session:", { sessionId: sessionId.substring(0, 8) });
				return;
			}
			if (sessionId !== this.currentActiveSessionId) {
				console.log("[AgentNewAdapter] Skipping state update for non-active session:", {
					sessionId: sessionId.substring(0, 8),
					currentActiveSessionId: this.currentActiveSessionId.substring(0, 8)
				});
				return;
			}
			this.stateUpdateCallbacks.forEach((callback) => {
				try {
					callback(sessionId, notification);
				} catch (err) {
					console.error("[AgentNewAdapter] State update callback error:", err);
				}
			});
		}
		/**
		* 发送状态同步请求到 IDE（Local → IDE）
		* 当 Local Agents 发送消息或取消时，通知 IDE 端更新状态
		*
		* P03 修复：区分触发来源
		* - responseEventId 有值: 响应 IDE 状态推送，携带 eventId 用于循环检测
		* - responseEventId 无值: Local 主动触发（如用户发消息），不携带 eventId
		*
		* @param conversationId 会话 ID（与 sessionId 相同）
		* @param event 触发状态变更的事件类型
		* @param responseEventId 响应 IDE 推送时携带的 eventId（可选，Local 主动触发时不传）
		*/
		sendStateSyncToIDE(conversationId, event, responseEventId) {
			if (!this.channel) {
				console.warn("[AgentNewAdapter] Cannot send state sync: channel not available");
				return;
			}
			const timestamp = Date.now();
			const stateSyncRequest = {
				conversationId,
				event,
				source: "local",
				timestamp,
				...responseEventId && { eventId: responseEventId }
			};
			this.channel.callMethod(conversationId, {
				type: "acp-rpc",
				payload: {
					jsonrpc: "2.0",
					method: "stateSync",
					params: {
						...stateSyncRequest,
						sessionId: conversationId
					},
					id: "stateSync-" + timestamp
				}
			}, 5e3).then((response) => {}).catch((error) => {
				console.warn("[AgentNewAdapter] stateSync failed:", error instanceof Error ? error.message : String(error));
			});
		}
		/**
		* 处理消息更新（统一逻辑）
		*/
		handleMessageUpdate(notification, messageId, requestId, offset) {
			const { update, sessionId } = notification;
			const updateType = update.sessionUpdate;
			console.log(`[RT-DEBUG][UI:Adapter] handleMessageUpdate: type=${updateType}, messageId=${messageId?.substring(0, 8)}, sessionId=${sessionId?.substring(0, 8)}, offset=${offset ?? "N/A"}`);
			let effectiveMessageId = messageId;
			if (updateType === "tool_call_update" || updateType === "tool_call") {
				const toolCallId = update?.toolCallId || update?.toolCall?.id || update?.toolCall?.toolCallId;
				if (toolCallId) {
					const mappedMessageId = this.toolCallIdToMessageId.get(`${sessionId}:${toolCallId}`);
					if (mappedMessageId) effectiveMessageId = mappedMessageId;
					else if (updateType === "tool_call") {
						if (!effectiveMessageId) effectiveMessageId = `${sessionId}-tool-${toolCallId}`;
						this.toolCallIdToMessageId.set(`${sessionId}:${toolCallId}`, effectiveMessageId);
					}
				}
			}
			try {
				const result = MessageConverter.convertACPUpdateToMessage(update, {
					sessionId,
					requestId,
					messageId: effectiveMessageId,
					isStreaming: true,
					_meta: notification._meta ?? void 0
				});
				if (!result) return;
				let finalMessage = result.message;
				const cacheKeyMessageId = effectiveMessageId || result.messageId;
				let sessionCache = this.messageCache.get(sessionId);
				const existingMessage = cacheKeyMessageId && sessionCache ? sessionCache.get(cacheKeyMessageId) : void 0;
				if (existingMessage && existingMessage.messageType === "assistant") try {
					const newToolContent = result.message.content?.find((c) => c?.type === "tool-call");
					if (newToolContent && newToolContent.tool && newToolContent.tool.id) {
						const toolId = newToolContent.tool.id;
						const mergedContent = existingMessage.content.map((ec) => {
							if (ec?.type === "tool-call" && ec?.tool && ec.tool.id === toolId) {
								const existingTool = ec.tool || {};
								const incomingTool = newToolContent.tool || {};
								const mergedArgs = {
									...existingTool.args || {},
									...incomingTool.args || {}
								};
								const mergedResult = {
									...existingTool.result || {},
									...incomingTool.result || {}
								};
								const mergedMetaData = {
									...existingTool.metaData || {},
									...incomingTool.metaData || {}
								};
								const isAwaitingPermission = existingTool.status === ToolState.PENDING && existingTool.metaData?.["acp_request_permission"];
								const isTerminalOrExecuting = incomingTool.status === ToolState.EXECUTED || incomingTool.status === "completed" || incomingTool.status === ToolState.FAILED || incomingTool.status === ToolState.CANCELLED || incomingTool.status === ToolState.SKIPPED || incomingTool.status === ToolState.DESTROYED || incomingTool.status === ToolState.STREAM_EXECUTING || incomingTool.status === ToolState.FULL_EXECUTING;
								const mergedStatus = isAwaitingPermission && !isTerminalOrExecuting ? existingTool.status : incomingTool.status ?? existingTool.status;
								const mergedTool = {
									...existingTool,
									status: mergedStatus,
									ready: incomingTool.ready ?? existingTool.ready,
									args: Object.keys(mergedArgs).length > 0 ? mergedArgs : existingTool.args,
									result: Object.keys(mergedResult).length > 0 ? mergedResult : existingTool.result,
									metaData: Object.keys(mergedMetaData).length > 0 ? mergedMetaData : existingTool.metaData
								};
								try {
									if (EditToolAdapter.isEditToolCall(existingTool)) {
										EditToolAdapter.applyUpdateToToolCall(existingTool, update, notification._meta);
										const updatedTool = {
											...existingTool,
											status: mergedTool.status,
											result: existingTool.result || mergedTool.result,
											metaData: mergedTool.metaData
										};
										return {
											...ec,
											tool: updatedTool
										};
									}
									if (ReadToolAdapter.isReadToolCall(existingTool)) {
										ReadToolAdapter.applyUpdateToToolCall(existingTool, update, notification._meta);
										const updatedTool = {
											...existingTool,
											status: mergedTool.status,
											args: existingTool.args || mergedTool.args,
											result: existingTool.result || mergedTool.result,
											metaData: mergedTool.metaData
										};
										return {
											...ec,
											tool: updatedTool
										};
									}
									if (SearchToolAdapter.isSearchToolCall(existingTool)) {
										SearchToolAdapter.applyUpdateToToolCall(existingTool, update, notification._meta);
										const updatedTool = {
											...existingTool,
											status: mergedTool.status,
											result: existingTool.result || mergedTool.result,
											metaData: mergedTool.metaData
										};
										return {
											...ec,
											tool: updatedTool
										};
									}
								} catch (err) {
									console.warn("[AgentNewAdapter] ToolAdapter.applyUpdateToToolCall failed", err);
								}
								return {
									...ec,
									tool: mergedTool
								};
							}
							return ec;
						});
						finalMessage = {
							...existingMessage,
							content: mergedContent,
							complete: result.message.complete || existingMessage.complete
						};
					} else finalMessage = result.message;
				} catch (mergeErr) {
					finalMessage = MessageConverter.mergeStreamingMessage(existingMessage, result.message);
				}
				if (existingMessage && existingMessage.messageType === "assistant") try {
					finalMessage.updateTime = Date.now();
					finalMessage.extra = {
						...finalMessage.extra || {},
						_updateCounter: ((finalMessage.extra || {})._updateCounter || 0) + 1
					};
				} catch (err) {
					console.warn("[AgentNewAdapter] Failed to bump updateTime/extra on merged message", err);
				}
				if (!sessionCache) {
					sessionCache = /* @__PURE__ */ new Map();
					this.messageCache.set(sessionId, sessionCache);
				}
				const existingOffset = typeof existingMessage?._offset === "number" ? existingMessage._offset : void 0;
				const effectiveOffset = existingOffset !== void 0 ? offset !== void 0 ? Math.min(existingOffset, offset) : existingOffset : offset;
				if (effectiveOffset !== void 0) finalMessage._offset = effectiveOffset;
				let finalCacheKey = effectiveMessageId || result.messageId;
				if (result.message?.messageType === "user") {
					const pendingTempId = this.pendingMessageTracker.getFirstPendingUserMessageId(sessionId);
					if (pendingTempId) {
						finalCacheKey = pendingTempId;
						finalMessage = {
							...finalMessage,
							id: pendingTempId
						};
						this.pendingMessageTracker.clearLatestPendingRequest(sessionId);
					}
				}
				if (finalCacheKey) sessionCache.set(finalCacheKey, finalMessage);
				if (updateType === "tool_call") try {
					const toolCallId = update?.toolCallId || update?.toolCall?.id || update?.toolCall?.toolCallId;
					if (toolCallId && finalCacheKey) this.toolCallIdToMessageId.set(`${sessionId}:${toolCallId}`, finalCacheKey);
				} catch {}
				if (updateType === "tool_call" || updateType === "tool_call_update") {
					try {
						const planResult = PlanToolAdapter.applyPlanUpdateToMessage(update, result.message, finalMessage, existingMessage, sessionCache);
						if (planResult.updated && planResult.extraMessages.length > 0) for (const extraMsg of planResult.extraMessages) {
							console.log(`[AgentNewAdapter] PlanToolAdapter: emitting extraMessage, id=${extraMsg?.id}, messageType=${extraMsg?.messageType}, content.length=${Array.isArray(extraMsg?.content) ? extraMsg.content.length : "N/A"}`);
							this.emitMessage(extraMsg);
						}
					} catch (err) {
						console.error("[AgentNewAdapter] PlanToolAdapter: error", err);
					}
					this.syncTodoStatusFromMessage(sessionId, finalMessage);
				}
				this.emitMessage(finalMessage);
			} catch (error) {
				console.error("[AgentNewAdapter] Failed to convert ACP update to Message:", error);
			}
		}
		/**
		* 从消息中检测 todo_write 工具调用，将 todos 数据同步到 todoStatusStore
		* 这样同一会话中所有 PlanTask 卡片都能获取到最新的 todo 状态
		*
		* 关键逻辑：merge=false（replace 模式）时先 reset 存储，避免上一轮 completed 状态
		* 因权重高于新一轮的 in_progress/pending 而无法被覆盖，导致卡片显示旧状态。
		*/
		syncTodoStatusFromMessage(sessionId, message) {
			try {
				if (!message?.content || !Array.isArray(message.content)) return;
				for (const content of message.content) {
					if (content?.type !== "tool-call") continue;
					const tool = content?.tool;
					if (!tool || tool.name !== "todo_write" && tool.name !== "TodoWrite") continue;
					const toolResult = tool.result;
					const toolArgs = tool.args;
					let isMerge;
					if (toolResult?.result && "merge" in toolResult.result) isMerge = toolResult.result.merge === true;
					else if (toolArgs?.merge !== void 0) isMerge = toolArgs.merge === "true" || toolArgs.merge === true;
					else isMerge = false;
					if (!isMerge) todoStatusStore.reset(sessionId);
					const todos = this.extractTodosFromTool(tool);
					if (todos.length > 0) todoStatusStore.reportTodos(sessionId, todos);
				}
			} catch (err) {}
		}
		/**
		* 从 todo_write 工具的 args/result 中提取 todos 列表
		*/
		extractTodosFromTool(tool) {
			const result = tool.result;
			const args = tool.args;
			if (result?.result?.todos && Array.isArray(result.result.todos)) return result.result.todos.filter((t) => t.id && t.status);
			let todos;
			if (args?.todos) {
				if (typeof args.todos === "string") try {
					const parsed = JSON.parse(args.todos);
					if (Array.isArray(parsed)) todos = parsed;
				} catch {}
				else if (Array.isArray(args.todos)) todos = args.todos;
			}
			if (todos) return todos.filter((t) => t.id && t.status);
			return [];
		}
		/**
		* 处理 sessionUpdate: 'plan' 类型的更新
		* 将 ACP Plan entries 转换为 TaskData 并触发回调
		*/
		handlePlanSessionUpdate(sessionId, update, _meta) {
			if (!this.currentActiveSessionId || sessionId !== this.currentActiveSessionId) return;
			try {
				const tasks = TaskConverter.convertACPPlanEntries(update.entries || []);
				todoStatusStore.reportTaskData(sessionId, tasks);
				const codeBuddyMeta = _meta?.["codebuddy.ai"];
				this.emitTaskUpdate(sessionId, tasks, codeBuddyMeta?.enableEdit || false, codeBuddyMeta?.uri);
			} catch (error) {
				console.error("[AgentNewAdapter] Failed to handle plan session update:", error);
			}
		}
		/**
		* 处理 ACP 权限请求事件
		*/
		async handlePermissionRequest(data) {
			const { requestId } = data;
			const { sessionId, options, toolCall } = data.params;
			const toolCallId = toolCall.toolCallId;
			const timestamp = Date.now();
			const messageId = requestId;
			const toolCallKey = `${sessionId}:${toolCallId}`;
			const mappedMessageId = this.toolCallIdToMessageId.get(toolCallKey);
			let sessionCache = this.messageCache.get(sessionId);
			let message;
			if (mappedMessageId && sessionCache) message = sessionCache.get(mappedMessageId);
			if (!message) {
				console.warn("[AgentNewAdapter] No message found for request_permission, creating placeholder message");
				message = {
					id: messageId,
					requestId: messageId,
					conversationId: sessionId,
					messageType: "assistant",
					createTime: timestamp,
					complete: false,
					content: []
				};
				if (!sessionCache) {
					sessionCache = /* @__PURE__ */ new Map();
					this.messageCache.set(sessionId, sessionCache);
				}
				sessionCache.set(messageId, message);
				if (toolCallId) this.toolCallIdToMessageId.set(toolCallKey, messageId);
			}
			const existingToolCallContent = message.content.find((c) => c.type === "tool-call" && "tool" in c && c.tool && c.tool.id === toolCallId);
			if (existingToolCallContent && "tool" in existingToolCallContent) {
				const existingTool = existingToolCallContent.tool;
				existingTool.status = "pending";
				existingTool.metaData = { "acp_request_permission": {
					requestId,
					permissionOptions: options
				} };
				this.emitMessage(message);
			} else {
				const rawInput = toolCall.rawInput;
				const newToolCallContent = {
					type: "tool-call",
					tool: {
						id: toolCallId,
						name: rawInput?.name || "unknown",
						args: rawInput?.arguments || {},
						status: "pending",
						permissionOptions: options,
						metaData: { "acp_request_permission": {
							requestId,
							permissionOptions: options
						} }
					}
				};
				const updatedContent = [...message.content, newToolCallContent];
				const updatedMessage = {
					...message,
					content: updatedContent,
					messageType: "assistant"
				};
				sessionCache.set(messageId, updatedMessage);
				this.emitMessage(updatedMessage);
			}
		}
		/**
		* 处理错误事件
		*/
		handleError(error) {
			this.emitError(error);
		}
		/**
		* 为 content block 添加 CodeBuddy 模型元数据
		* 保留现有元数据，只添加/更新 _meta['codebuddy.ai'].model 字段
		*
		* @param meta - 原始元数据
		* @param modelId - 要设置的模型 ID
		* @returns 包含模型信息的新元数据
		*/
		addModelToMeta(meta, modelId, modeId) {
			const existingMeta = meta || {};
			const codebuddyMeta = existingMeta["codebuddy.ai"] || {};
			return {
				...existingMeta,
				"codebuddy.ai": {
					...codebuddyMeta,
					...modelId ? { model: modelId } : {},
					...modeId ? { mode: modeId } : {}
				}
			};
		}
		/**
		* 发送消息
		* 使用 ActiveSession.prompts.send()
		*
		* 如果 session 不存在（首次发送），会自动创建新 session
		*/
		async sendMessage(request, userMessageId, options) {
			try {
				const sessionId = request.sessionId;
				if (options?.beforePrompt) {
					const sessionConfig = this.sessionConfigs.get(sessionId);
					await options.beforePrompt({ workspacePath: sessionConfig?.cwd || void 0 }).catch((err) => {
						console.error("[AgentNewAdapter] beforePrompt callback failed:", err);
					});
				}
				if (this.client.environmentType === "local" && this.channel) this.sendStateSyncToIDE(sessionId, "input");
				let session;
				if (!this.sessionConfigs.has(sessionId)) {
					const meta = request._meta;
					const cwd = meta?.cwd || meta?.workspace || "";
					const mcpServers = meta?.mcpServers || [];
					const codebuddyMeta = meta?.["codebuddy.ai"];
					const modeID = codebuddyMeta?.mode || "craft";
					const modelID = typeof codebuddyMeta?.model === "string" && codebuddyMeta.model ? codebuddyMeta.model : void 0;
					const isPlayground = codebuddyMeta?.isPlayground ?? false;
					session = (await this.createNewSession(cwd, {
						mcpServers,
						mode: modeID,
						model: modelID,
						isPlayground
					})).activeSession;
				} else if (this.currentSession && this.currentSession.id === sessionId) session = this.currentSession;
				else session = (await this.loadSessionInternal(sessionId)).session;
				const requestedModelId = (request._meta && request._meta["codebuddy.ai"]?.model) ?? this.sessionModels.get(sessionId);
				const currentModelId = await this.ensureSessionModelBeforeSend(session, sessionId, requestedModelId);
				const currentModeId = request._meta && request._meta["codebuddy.ai"]?.mode;
				this.pendingMessageTracker.addPendingRequest(sessionId, userMessageId);
				const contentBlocks = [];
				for (const block of request.prompt) switch (block.type) {
					case "text":
						contentBlocks.push({
							type: "text",
							text: block.text,
							_meta: this.addModelToMeta(block._meta, currentModelId, currentModeId)
						});
						break;
					case "image":
						contentBlocks.push({
							type: "image",
							data: block.data,
							mimeType: block.mimeType,
							uri: block.uri,
							_meta: this.addModelToMeta(block._meta, currentModelId, currentModeId)
						});
						break;
					case "audio":
						console.warn("[AgentNewAdapter] Audio content blocks are not supported, skipping");
						break;
					case "resource": {
						const resource = block.resource;
						if (resource && resource.uri) contentBlocks.push({
							type: "resource",
							uri: resource.uri,
							_meta: this.addModelToMeta(block._meta, currentModelId, currentModeId)
						});
						else console.warn("[AgentNewAdapter] Resource block without uri:", block);
						break;
					}
					case "resource_link":
						if (block.uri) contentBlocks.push({
							type: "resource_link",
							uri: block.uri,
							name: block.name,
							title: block.title,
							_meta: this.addModelToMeta(block._meta, currentModelId, currentModeId)
						});
						else console.warn("[AgentNewAdapter] Resource link without uri:", block);
						break;
					default:
						console.warn("[AgentNewAdapter] Unsupported content block type:", block.type);
						break;
				}
				const requestMeta = request._meta || {};
				const requestCodeBuddyMeta = requestMeta["codebuddy.ai"] || {};
				const requestExpertMeta = requestCodeBuddyMeta["expert"];
				console.log("[AgentNewAdapter][Expert] forwarding prompt meta", {
					sessionId,
					hasExpertMeta: !!requestExpertMeta,
					expertId: requestExpertMeta?.id,
					expertPromptSize: typeof requestExpertMeta?.prompt === "string" ? requestExpertMeta.prompt.length : 0
				});
				const result = await session.prompts.send({
					content: contentBlocks.length > 0 ? contentBlocks : "",
					_meta: {
						...requestMeta,
						"codebuddy.ai": {
							...requestCodeBuddyMeta,
							...currentModelId ? { model: currentModelId } : {},
							...currentModeId ? { mode: currentModeId } : {},
							userMessageId: requestCodeBuddyMeta?.userMessageId ?? userMessageId
						}
					}
				});
				return {
					stopReason: result.stopReason,
					_meta: result._meta
				};
			} catch (error) {
				console.error("[AgentNewAdapter] Send message failed:", error);
				throw error;
			}
		}
		async sendMessageToSessionSilently(request, userMessageId) {
			try {
				const sessionId = request.sessionId;
				if (!sessionId) throw new Error("[AgentNewAdapter] silent send requires sessionId");
				const sessionConfig = this.sessionConfigs.get(sessionId);
				if (!sessionConfig) throw new Error(`[AgentNewAdapter] Session config not found for silent send: ${sessionId}`);
				if (this.client.environmentType === "local" && this.channel) this.sendStateSyncToIDE(sessionId, "input");
				const session = await this.client.sessions.load({
					sessionId,
					cwd: sessionConfig.cwd,
					mcpServers: sessionConfig.mcpServers,
					onSessionCreated: (createdSession) => {
						this.setupSessionEventListeners(createdSession, sessionId);
					}
				});
				this.setupSessionEventListeners(session, sessionId);
				const requestedModelId = (request._meta && request._meta["codebuddy.ai"]?.model) ?? this.sessionModels.get(sessionId);
				const currentModelId = await this.ensureSessionModelBeforeSend(session, sessionId, requestedModelId);
				const currentModeId = request._meta && request._meta["codebuddy.ai"]?.mode;
				this.pendingMessageTracker.addPendingRequest(sessionId, userMessageId);
				const contentBlocks = [];
				for (const block of request.prompt) switch (block.type) {
					case "text":
						contentBlocks.push({
							type: "text",
							text: block.text,
							_meta: this.addModelToMeta(block._meta, currentModelId, currentModeId)
						});
						break;
					case "image":
						contentBlocks.push({
							type: "image",
							data: block.data,
							mimeType: block.mimeType,
							uri: block.uri,
							_meta: this.addModelToMeta(block._meta, currentModelId, currentModeId)
						});
						break;
					case "audio":
						console.warn("[AgentNewAdapter] Audio content blocks are not supported, skipping");
						break;
					case "resource": {
						const resource = block.resource;
						if (resource && resource.uri) contentBlocks.push({
							type: "resource",
							uri: resource.uri,
							_meta: this.addModelToMeta(block._meta, currentModelId, currentModeId)
						});
						else console.warn("[AgentNewAdapter] Resource block without uri:", block);
						break;
					}
					case "resource_link":
						if (block.uri) contentBlocks.push({
							type: "resource_link",
							uri: block.uri,
							_meta: this.addModelToMeta(block._meta, currentModelId, currentModeId)
						});
						else console.warn("[AgentNewAdapter] Resource link without uri:", block);
						break;
					default:
						console.warn("[AgentNewAdapter] Unsupported content block type:", block.type);
						break;
				}
				const requestMeta = request._meta || {};
				const requestCodeBuddyMeta = requestMeta["codebuddy.ai"] || {};
				const result = await session.prompts.send({
					content: contentBlocks.length > 0 ? contentBlocks : "",
					_meta: {
						...requestMeta,
						"codebuddy.ai": {
							...requestCodeBuddyMeta,
							...currentModelId ? { model: currentModelId } : {},
							...currentModeId ? { mode: currentModeId } : {},
							userMessageId: requestCodeBuddyMeta?.userMessageId ?? userMessageId
						}
					}
				});
				return {
					stopReason: result.stopReason,
					_meta: result._meta
				};
			} catch (error) {
				console.error("[AgentNewAdapter] Silent send message failed:", error);
				throw error;
			}
		}
		async getModels(cwd) {
			try {
				return await this.client.sessions.models.list(cwd || "");
			} catch (error) {
				console.error("🐸[AgentNewAdapter] Get models failed:", error);
				throw error;
			}
		}
		async getLocalCustomModels() {
			if (!this.backendProvider?.getLocalCustomModels) throw new Error("Local custom model management is not supported in current environment");
			return await this.backendProvider.getLocalCustomModels();
		}
		async openLocalFile(filePath) {
			if (!this.backendProvider?.openLocalFile) throw new Error("Opening local files is not supported in current environment");
			await this.backendProvider.openLocalFile(filePath);
		}
		async saveLocalCustomModel(request) {
			if (!this.backendProvider?.saveLocalCustomModel) throw new Error("Local custom model management is not supported in current environment");
			return await this.backendProvider.saveLocalCustomModel(request);
		}
		async deleteLocalCustomModel(id) {
			if (!this.backendProvider?.deleteLocalCustomModel) throw new Error("Local custom model management is not supported in current environment");
			return await this.backendProvider.deleteLocalCustomModel(id);
		}
		/**
		* 向指定会话注入系统消息（供 /clear 命令调用）
		* 通过后端 BackendBridgeService 将分隔线消息写入持久化存储
		*/
		async injectSystemMessage(params) {
			try {
				console.log("[clear context] injectSystemMessage: sending via ACP session, conversationId:", params.conversationId, "messageId:", params.messageId);
				const sessionId = params.conversationId;
				let session;
				if (this.currentActiveSessionId === sessionId && this.currentActiveSessionPromise) session = await this.currentActiveSessionPromise;
				else session = (await this.loadSessionInternal(sessionId)).session;
				const result = await session.prompts.send({
					content: "",
					_meta: {
						timestamp: new Date(params.createTime ?? Date.now()).toISOString(),
						"codebuddy.ai": {
							isClearSession: true,
							clearMessageId: params.messageId,
							clearExtra: params.extra ?? { isSessionSeparator: true }
						}
					}
				});
				const success = result?.stopReason !== "error";
				console.log("[clear context] injectSystemMessage via ACP: stopReason=", result?.stopReason);
				return { success };
			} catch (error) {
				console.error("[AgentNewAdapter] injectSystemMessage failed:", error);
				return {
					success: false,
					error: error.message || "Unknown error"
				};
			}
		}
		/**
		* 开始执行计划
		* 通过 requestSendPrompt 机制发送消息到 MainContentCore
		*/
		async buildPlan(data) {
			this.emit("build-plan", data);
			this.requestSendPrompt({
				sessionId: data.sessionId,
				prompt: [{
					type: "text",
					text: "接受计划并立即开始"
				}]
			});
		}
		/**
		* 写入文件到工作区
		* 通过 session.files.write 写入文件
		*/
		async writeFile(sessionId, path, content, options) {
			try {
				const { session } = await this.loadSessionInternal(sessionId);
				const writeOpts = options?.allowedDirs?.length ? { allowedDirs: options.allowedDirs } : void 0;
				await session.files.write(path, content, writeOpts);
				return { success: true };
			} catch (error) {
				console.error("[AgentNewAdapter] Write file failed:", error);
				return {
					success: false,
					error: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		/**
		* 查看计划
		* 触发 viewPlan 回调通知 App.tsx 切换 sidebarView 到 artifacts
		*/
		viewPlan(params) {
			this.viewPlanCallbacks.forEach((callback) => {
				try {
					callback(params);
				} catch (err) {
					console.error("[AgentNewAdapter] ViewPlan callback error:", err);
				}
			});
		}
		/**
		* 监听查看计划请求
		* 当用户点击 viewPlan 按钮时触发
		*/
		onViewPlan(callback) {
			this.viewPlanCallbacks.add(callback);
			return () => {
				this.viewPlanCallbacks.delete(callback);
			};
		}
		/**
		* 查看任务
		* 触发 viewTask 回调通知 App.tsx 切换 sidebarView 到 artifacts
		*/
		viewTask(params) {
			this.viewTaskCallbacks.forEach((callback) => {
				try {
					callback(params);
				} catch (err) {
					console.error("[AgentNewAdapter] ViewTask callback error:", err);
				}
			});
		}
		/**
		* 监听查看任务请求
		* 当用户点击 plan 中的 task 时触发
		*/
		onViewTask(callback) {
			this.viewTaskCallbacks.add(callback);
			return () => {
				this.viewTaskCallbacks.delete(callback);
			};
		}
		/**
		* 下载计划
		* 通过 emit 发送事件到 IDE 端下载计划文件
		*/
		downloadPlan(params) {
			this.emit("download-plan", params);
		}
		async readFile(sessionId, path, format = "text") {
			try {
				const { session } = await this.loadSessionInternal(sessionId);
				return {
					success: true,
					content: await session.files.read(path, { format })
				};
			} catch (error) {
				console.error("[AgentNewAdapter] Read file failed:", error);
				return {
					success: false,
					error: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		/**
		* 取消消息
		* 使用 ActiveSession.prompts.cancel()
		*/
		async cancelMessage(request) {
			const sessionId = request.sessionId;
			if (this.client.environmentType === "local" && this.channel) this.sendStateSyncToIDE(sessionId, "stop");
			const { session } = await this.loadSessionInternal(sessionId);
			await session.prompts.cancel();
		}
		/**
		* 原子回退：将会话历史指针回退到指定 fork 点（Phase 3）。
		* 通过 ACP prompts.rollback() 调用 CLI 端 handleRollback。
		* 与 WorkbuddyAgentAdapter.rollback() 保持一致的实现模式。
		* @see issue #50495 / docs/plans/2026-06-20-resend-edit-unified-plan.md
		*/
		async rollback(request) {
			try {
				const { session } = await this.loadSessionInternal(request.sessionId);
				return await session.prompts.rollback(request) ?? {
					applied: false,
					error: "rollback returned null"
				};
			} catch (err) {
				return {
					applied: false,
					error: String(err)
				};
			}
		}
		/**
		* 发送事件到 Channel
		* 处理特定事件（如 restart-ide、close-agent-manager）通过对应的方法执行
		*/
		emit(event, data) {
			if (event === "restart-ide") {
				const params = data;
				this.reloadWindow(params).catch((error) => {
					console.error("[AgentNewAdapter] reloadWindow failed:", error);
				});
				return;
			}
			if (event === "save-locale") {
				const params = data;
				this.saveLocale(params).catch((error) => {
					console.error("[AgentNewAdapter] saveLocale failed:", error);
				});
				return;
			}
			if (event === "save-power-blocker") {
				const params = data;
				this.savePowerBlocker(params).catch((error) => {
					console.error("[AgentNewAdapter] savePowerBlocker failed:", error);
				});
				return;
			}
			if (event === "save-memory-settings") {
				const params = data;
				this.saveMemorySettings(params).catch((error) => {
					console.error("[AgentNewAdapter] saveMemorySettings failed:", error);
				});
				return;
			}
			if (event === "submit-memory-suggestion") {
				const params = data;
				this.submitMemorySuggestion(params).catch((error) => {
					console.error("[AgentNewAdapter] submitMemorySuggestion failed:", error);
				});
				return;
			}
			if (event === "import-memory-content") {
				const params = data;
				this.importMemoryContent(params).catch((error) => {
					console.error("[AgentNewAdapter] importMemoryContent failed:", error);
				});
				return;
			}
			if (event === "close-agent-manager") {
				this.closeAgentManager().catch((error) => {
					console.error("[AgentNewAdapter] closeAgentManager failed:", error);
				});
				return;
			}
			if (event === "open-external") {
				const url = data;
				if (url) this.openExternal(url).catch((error) => {
					console.error("[AgentNewAdapter] openExternal failed:", error);
				});
				return;
			}
			if (event === "wecom-start") {
				window.dispatchEvent(new CustomEvent("codebuddy:wecom-start"));
				return;
			}
			if (event === "wecom-stop") {
				window.dispatchEvent(new CustomEvent("codebuddy:wecom-stop"));
				return;
			}
			if (event === "wecom-status") {
				window.dispatchEvent(new CustomEvent("codebuddy:wecom-status-request"));
				return;
			}
			if (event === "check-system-permissions") {
				if (this.channel) {
					console.log("[AgentNewAdapter] check-system-permissions 透传 data:", JSON.stringify(data));
					this.channel.emit("check-system-permissions", data);
				}
				return;
			}
			if (event === "check-for-updates") {
				if (this.channel) this.channel.emit("check-for-updates");
				else window.dispatchEvent(new CustomEvent("codebuddy:check-for-updates"));
				return;
			}
			if (event === "get-update-state") {
				if (this.channel) this.channel.emit("get-update-state");
				return;
			}
			if (event === "quit-and-install") {
				if (this.channel) this.channel.emit("quit-and-install");
				else window.dispatchEvent(new CustomEvent("codebuddy:quit-and-install"));
				return;
			}
			if (event === "open-claw") {
				if (this.channel) this.channel.emit("open-claw", data);
				return;
			}
			if (event.startsWith("claw:")) {
				if (this.channel) this.channel.emit(event, data);
				return;
			}
			if (event.startsWith("memory-") || event.includes("memory")) {
				console.debug("[AgentNewAdapter] Ignored memory event from emit:", event);
				return;
			}
			console.warn("[AgentNewAdapter] Unhandled event:", event, data);
		}
		/**
		* 监听 Channel 事件
		* 支持:
		* - 'account-changed': 通过 accountService 订阅 account 变化
		* - 其他事件: 委托给 channel.on() 监听（如 'claw-session-ready'）
		*/
		on(event, callback) {
			if (event === "account-changed") {
				const { accountService } = (init_common(), __toCommonJS(common_exports));
				return accountService.subscribe((account) => {
					callback(account);
				});
			}
			if (event === "wecom-status-response") {
				const handler = (e) => {
					callback(e.detail);
				};
				window.addEventListener("codebuddy:wecom-status-response", handler);
				return () => {
					window.removeEventListener("codebuddy:wecom-status-response", handler);
				};
			}
			if (event === "update-state-changed") {
				if (this.channel) {
					console.log("[AgentNewAdapter] Registering update-state-changed listener via channel");
					this.channel.on("update-state-changed", callback);
					console.log("[AgentNewAdapter] Requesting initial update state via channel");
					this.channel.emit("get-update-state");
					return () => {
						this.channel?.off("update-state-changed", callback);
					};
				}
				console.warn("[AgentNewAdapter] No channel available for update-state-changed");
				return () => {};
			}
			if (event === "update-state-response") {
				if (this.channel) {
					console.log("[AgentNewAdapter] Registering update-state-response listener via channel");
					this.channel.on("update-state-response", callback);
					return () => {
						this.channel?.off("update-state-response", callback);
					};
				}
				console.warn("[AgentNewAdapter] No channel available for update-state-response");
				return () => {};
			}
			if (event === "window-fullscreen-changed") {
				if (this.channel) {
					const handler = (data) => {
						this._isFullscreen = !!data;
						callback(data);
					};
					this.channel.on("window-fullscreen-changed", handler);
					return () => {
						this.channel?.off("window-fullscreen-changed", handler);
					};
				}
				return () => {};
			}
			if (this.channel) {
				this.channel.on(event, callback);
				return () => {
					this.channel?.off(event, callback);
				};
			}
			console.warn("[AgentNewAdapter] on() called for unsupported event:", event);
			return () => {};
		}
		/**
		* Returns the cached macOS fullscreen state.
		* Useful as an initial value for React state to avoid a flash when a new panel mounts.
		*/
		isMacFullscreen() {
			return this._isFullscreen;
		}
		/**
		* 监听消息
		*/
		onMessage(callback) {
			this.messageCallbacks.add(callback);
			return () => {
				this.messageCallbacks.delete(callback);
			};
		}
		/**
		* 监听错误
		*/
		onError(callback) {
			this.errorCallbacks.add(callback);
			return () => {
				this.errorCallbacks.delete(callback);
			};
		}
		/**
		* 监听 Checkpoint 事件
		*/
		onCheckpoint(callback) {
			this.checkpointCallbacks.add(callback);
			return () => {
				this.checkpointCallbacks.delete(callback);
			};
		}
		/**
		* 监听工作区初始化完成事件
		*/
		onWorkspaceInitialized(callback) {
			this.workspaceInitCallbacks.add(callback);
			return () => {
				this.workspaceInitCallbacks.delete(callback);
			};
		}
		/**
		* 触发消息回调
		* 只有当消息的 conversationId 匹配当前活跃的 session 时才触发回调
		*
		* 会话过滤逻辑：
		* - 当用户切换会话时，后台仍在运行的会话可能会继续发送消息
		* - 这些消息不应该推送到 UI，否则会导致消息显示异常
		* - 但是，消息会被保存到各自会话的历史记录中，用户切换回去时可以看到
		*/
		emitMessage(data) {
			if ("type" in data && data.type === "conversation") {
				this.messageCallbacks.forEach((callback) => {
					try {
						callback(data);
					} catch (error) {
						console.error("[AgentNewAdapter] Message callback error:", error);
					}
				});
				return;
			}
			const message = data;
			const messageConversationId = message.conversationId;
			if (!this.currentActiveSessionId) {
				console.log(`[RT-DEBUG][UI:Adapter] emitMessage FILTERED: no active session, messageId=${message.id?.substring(0, 8)}, msgConvId=${messageConversationId?.substring(0, 8)}`);
				return;
			}
			if (messageConversationId && messageConversationId !== this.currentActiveSessionId) {
				console.log(`[RT-DEBUG][UI:Adapter] emitMessage FILTERED: session mismatch, msgConvId=${messageConversationId?.substring(0, 8)}, currentActiveSessionId=${this.currentActiveSessionId?.substring(0, 8)}`);
				return;
			}
			const textLength = Array.isArray(message.content) ? message.content.filter((b) => b.type === "text" && "text" in b).map((b) => b.text).join("").length : 0;
			if (!message.complete && textLength < 100) console.log("[AgentNewAdapter] Message streaming started:", {
				id: message.id.substring(0, 8),
				conversationId: message.conversationId?.substring(0, 8),
				callbacks: this.messageCallbacks.size
			});
			else if (message.complete) console.log("[AgentNewAdapter] Message streaming ended:", {
				id: message.id.substring(0, 8),
				complete: message.complete,
				finalLength: textLength
			});
			this.messageCallbacks.forEach((callback) => {
				try {
					callback(message);
				} catch (error) {
					console.error("[AgentNewAdapter] Message callback error:", error);
				}
			});
		}
		/**
		* 监听 Artifact 更新事件
		* 当收到 _codebuddy.ai/artifact 扩展通知时触发
		*/
		onArtifactUpdate(callback) {
			this.artifactCallbacks.add(callback);
			return () => {
				this.artifactCallbacks.delete(callback);
			};
		}
		/**
		* 触发 Artifact 回调
		* 只有当 sessionId 匹配当前活跃的 session 时才触发回调
		*/
		emitArtifact(sessionId, artifact, event) {
			if (!this.currentActiveSessionId) return;
			if (sessionId !== this.currentActiveSessionId) return;
			const { createdAt, updatedAt } = this.resolveArtifactTimestamps(artifact, event);
			const artifactWithTimestamps = {
				...artifact,
				createdAt,
				updatedAt
			};
			this.artifactCallbacks.forEach((callback) => {
				try {
					callback(sessionId, artifactWithTimestamps, event);
				} catch (err) {
					console.error("[AgentNewAdapter] Artifact callback error:", err);
				}
			});
		}
		resolveArtifactTimestamps(artifact, event) {
			const now = Date.now();
			const cached = this.artifactTimestampsByUri.get(artifact.uri);
			if (event === "created") {
				const createdAt = artifact.createdAt ?? now;
				const updatedAt = artifact.updatedAt ?? now;
				this.artifactTimestampsByUri.set(artifact.uri, {
					createdAt,
					updatedAt
				});
				return {
					createdAt,
					updatedAt
				};
			}
			if (event === "updated") {
				const createdAt = artifact.createdAt ?? cached?.createdAt ?? now;
				const updatedAt = artifact.updatedAt ?? now;
				this.artifactTimestampsByUri.set(artifact.uri, {
					createdAt,
					updatedAt
				});
				return {
					createdAt,
					updatedAt
				};
			}
			this.artifactTimestampsByUri.delete(artifact.uri);
			return {
				createdAt: artifact.createdAt ?? cached?.createdAt ?? now,
				updatedAt: artifact.updatedAt ?? cached?.updatedAt ?? now
			};
		}
		/**
		* 监听 Task 更新事件
		* 当收到 sessionUpdate: 'plan' 时触发
		*/
		onTaskUpdate(callback) {
			this.taskUpdateCallbacks.add(callback);
			return () => {
				this.taskUpdateCallbacks.delete(callback);
			};
		}
		/**
		* 触发 Task 更新回调
		* 只有当 sessionId 匹配当前活跃的 session 时才触发回调
		*/
		emitTaskUpdate(sessionId, tasks, enableEdit, uri) {
			if (!this.currentActiveSessionId) return;
			if (sessionId !== this.currentActiveSessionId) return;
			this.taskUpdateCallbacks.forEach((callback) => {
				try {
					callback(sessionId, tasks, enableEdit, uri);
				} catch (err) {
					console.error("[AgentNewAdapter] Task update callback error:", err);
				}
			});
		}
		/**
		* 监听 Mode 更新事件
		* 当收到 sessionUpdate: 'current_mode_update' 时触发
		*/
		onModeUpdate(callback) {
			this.modeUpdateCallbacks.add(callback);
			return () => {
				this.modeUpdateCallbacks.delete(callback);
			};
		}
		/**
		* 监听 State 更新事件
		* 当收到 sessionUpdate: 'state_update' 时触发
		* 用于同步 IDE 和 Local 之间的聊天状态
		*/
		onStateChange(callback) {
			this.stateUpdateCallbacks.add(callback);
			return () => {
				this.stateUpdateCallbacks.delete(callback);
			};
		}
		/**
		* 触发 Mode 更新回调
		* @param sessionId 会话 ID
		* @param update 模式更新内容
		*
		* 注意：这个方法用于处理从服务器发送的 current_mode_update 通知
		* 回调函数应该只更新本地 UI 状态，不应该再调用 adapter.setMode()
		* 否则会造成循环：服务器通知 → agent-ui → adapter.setMode() → 服务器通知 → ...
		*
		* 只有当 sessionId 匹配当前活跃的 session 时才触发回调
		*/
		emitModeUpdate(sessionId, update) {
			if (!this.currentActiveSessionId) return;
			if (sessionId !== this.currentActiveSessionId) return;
			this.modeUpdateCallbacks.forEach((callback) => {
				try {
					callback(sessionId, update);
				} catch (err) {
					console.error("[AgentNewAdapter] Mode update callback error:", err);
				}
			});
		}
		/**
		* 监听 Model 更新事件
		* 当收到 sessionUpdate: 'current_mode_update' 且 _meta 中包含 modelId 时触发
		*/
		onModelUpdate(callback) {
			this.modelUpdateCallbacks.add(callback);
			return () => {
				this.modelUpdateCallbacks.delete(callback);
			};
		}
		/**
		* 触发 Model 更新回调
		* @param sessionId 会话 ID
		* @param modelId 模型 ID
		*
		* 注意：这个方法用于处理从服务器发送的 current_mode_update 通知中的 modelId
		* 回调函数应该只更新本地 UI 状态，不应该再调用 adapter.setSessionModel()
		* 否则会造成循环：服务器通知 → agent-ui → adapter.setSessionModel() → 服务器通知 → ...
		*
		* 只有当 sessionId 匹配当前活跃的 session 时才触发回调
		*/
		emitModelUpdate(sessionId, modelId) {
			this.sessionModels.set(sessionId, modelId);
			if (this.currentActiveSessionId && sessionId !== this.currentActiveSessionId) return;
			this.modelUpdateCallbacks.forEach((callback) => {
				try {
					callback(sessionId, modelId);
				} catch (err) {
					console.error("[AgentNewAdapter] Model update callback error:", err);
				}
			});
		}
		/**
		* 请求发送消息（跨组件通信）
		* App.tsx 调用此方法请求 MainContentCore 执行发送
		*/
		requestSendPrompt(data) {
			this.sendPromptRequestCallbacks.forEach((callback) => {
				try {
					callback(data);
				} catch (err) {
					console.error("[AgentNewAdapter] Send prompt request callback error:", err);
				}
			});
		}
		/**
		* 监听发送消息请求（跨组件通信）
		* MainContentCore 调用此方法监听来自 App.tsx 的发送请求
		*/
		onSendPromptRequest(callback) {
			this.sendPromptRequestCallbacks.add(callback);
			return () => {
				this.sendPromptRequestCallbacks.delete(callback);
			};
		}
		/**
		* 请求插入内容块到输入框（跨组件通信，仅填入不发送）
		* 外部面板（如灵感面板）调用此方法请求 MainContentCore 将内容块插入输入框
		*
		* 如果当前没有消费者（如聊天视图尚未挂载），请求会被暂存，
		* 待消费者通过 onInsertContentBlocksRequest 注册后自动投递。
		*/
		requestInsertContentBlocks(data) {
			if (this.insertContentBlocksRequestCallbacks.size === 0) {
				this.pendingInsertRequest = data;
				return;
			}
			this.pendingInsertRequest = null;
			this.insertContentBlocksRequestCallbacks.forEach((callback) => {
				try {
					callback(data);
				} catch (err) {
					console.error("[AgentNewAdapter] Insert content blocks request callback error:", err);
				}
			});
		}
		/**
		* 监听插入内容块请求（跨组件通信）
		* MainContentCore 调用此方法监听来自外部面板的插入请求
		*
		* 如果注册时已有暂存的请求，同步投递给消费者。
		* 消费者侧有 try-catch 兜底处理 Slate 未就绪的情况。
		*/
		onInsertContentBlocksRequest(callback) {
			this.insertContentBlocksRequestCallbacks.add(callback);
			if (this.pendingInsertRequest) {
				const pending = this.pendingInsertRequest;
				this.pendingInsertRequest = null;
				try {
					callback(pending);
				} catch (err) {
					console.error("[AgentNewAdapter] Flush pending insert request error:", err);
				}
			}
			return () => {
				this.insertContentBlocksRequestCallbacks.delete(callback);
			};
		}
		/**
		* 监听打开浏览器命令
		* 当收到 action: 'openBrowser' 的 command 时触发
		*/
		onOpenBrowser(callback) {
			this.openBrowserCallbacks.add(callback);
			return () => {
				this.openBrowserCallbacks.delete(callback);
			};
		}
		/**
		* 监听打开结果视图命令
		* 当收到 action: 'openResultView' 的 command 时触发
		*/
		onOpenResultView(callback) {
			this.openResultViewCallbacks.add(callback);
			return () => {
				this.openResultViewCallbacks.delete(callback);
			};
		}
		/**
		* 注册 workspace_info 命令回调
		* 当收到 action: 'workspace_info' 的 command 时触发
		* 用于通知 UI 当前工作区是否为 Git 仓库，以决定是否显示"变更"Tab
		*/
		onWorkspaceInfo(callback) {
			this.workspaceInfoCallbacks.add(callback);
			return () => {
				this.workspaceInfoCallbacks.delete(callback);
			};
		}
		/**
		* 触发错误回调
		*/
		emitError(error) {
			notifyIfAuthExpired(error);
			this.errorCallbacks.forEach((callback) => {
				try {
					callback(error);
				} catch (err) {
					console.error("[AgentNewAdapter] Error callback error:", err);
				}
			});
		}
		/**
		* 触发 Checkpoint 回调
		* 只有当 sessionId 匹配当前活跃的 session 时才触发回调
		*/
		emitCheckpoint(sessionId, event, checkpoint) {
			if (!this.currentActiveSessionId) return;
			if (sessionId !== this.currentActiveSessionId) return;
			this.checkpointCallbacks.forEach((callback) => {
				try {
					callback(sessionId, event, checkpoint);
				} catch (err) {
					console.error("[AgentNewAdapter] Checkpoint callback error:", err);
				}
			});
		}
		/**
		* 处理 Command 事件
		*/
		handleCommand(sessionId, command) {
			console.log("handleCommand:", JSON.stringify(command));
			if (command.action === "openBrowser" && command.params?.url) {
				const url = command.params.url;
				this.browserUrlCache.set(sessionId, url);
				this.openBrowserCallbacks.forEach((callback) => {
					try {
						callback(url, sessionId);
					} catch (err) {
						console.error("[AgentNewAdapter] OpenBrowser callback error:", err);
					}
				});
				return;
			}
			if (command.action === "openResultView" && command.params?.targetFile) {
				const data = {
					targetFile: command.params.targetFile,
					viewType: command.params.viewType || "artifacts",
					explanation: command.params.explanation,
					metaInfo: command.params.metaInfo
				};
				this.openResultViewCallbacks.forEach((callback) => {
					try {
						callback(sessionId, data);
					} catch (err) {
						console.error("[AgentNewAdapter] OpenResultView callback error:", err);
					}
				});
				return;
			}
			if (command.action === "workspace_info" && command.params !== void 0) {
				const isGitWorkspace = Boolean(command.params.isGitWorkspace);
				const isProjectionActive = command.params.isProjectionActive === true ? true : void 0;
				this.workspaceInfoCallbacks.forEach((callback) => {
					try {
						callback(sessionId, isGitWorkspace, isProjectionActive);
					} catch (err) {
						console.error("[AgentNewAdapter] WorkspaceInfo callback error:", err);
					}
				});
				return;
			}
		}
		/**
		* 获取会话缓存的浏览器预览 URL
		*/
		getBrowserUrlForSession(sessionId) {
			return this.browserUrlCache.get(sessionId);
		}
		/**
		* 设置会话的浏览器预览 URL 缓存
		*/
		setBrowserUrlForSession(sessionId, url) {
			this.browserUrlCache.set(sessionId, url);
		}
		/**
		* 获取消息请求跟踪器
		* 用于管理临时消息 ID 和 requestId 的关联
		*/
		getPendingMessageTracker() {
			return this.pendingMessageTracker;
		}
		/**
		* 销毁适配器
		*/
		destroy() {
			this.client.dispose();
			this.messageCallbacks.clear();
			this.errorCallbacks.clear();
			this.checkpointCallbacks.clear();
			this.artifactCallbacks.clear();
			this.artifactTimestampsByUri.clear();
			this.taskUpdateCallbacks.clear();
			this.workspaceInitCallbacks.clear();
			this.sendPromptRequestCallbacks.clear();
			this.insertContentBlocksRequestCallbacks.clear();
			this.pendingInsertRequest = null;
			this.openBrowserCallbacks.clear();
			this.openResultViewCallbacks.clear();
			this.workspaceInfoCallbacks.clear();
			this.browserUrlCache.clear();
			this.viewPlanCallbacks.clear();
			this.viewTaskCallbacks.clear();
			this.expertLoadStateListeners.clear();
			this.expertLoadedCache.clear();
			this.selectedExpertBySession.clear();
			this.selectedExpertListeners.clear();
			this.currentExpertLoadState = {
				status: "idle",
				manifestStatus: "not_loaded",
				loadedPromptCount: 0,
				totalExpertCount: 0,
				progress: 0
			};
			this.messageCache.clear();
			this.sessionConfigs.clear();
			this.pendingMessageTracker.clearAll();
		}
		async getAccount() {
			if (!this.backendProvider) return null;
			try {
				return await this.backendProvider.getAccount();
			} catch (error) {
				console.error("[AgentNewAdapter] Get account failed:", error);
				return null;
			}
		}
		async getAccountUsage() {
			if (!this.backendProvider?.getAccountUsage) return null;
			try {
				return await this.backendProvider.getAccountUsage();
			} catch (error) {
				console.error("[AgentNewAdapter] Get account usage failed:", error);
				return null;
			}
		}
		async getCheckinStatus() {
			if (!this.backendProvider?.getCheckinStatus) return null;
			try {
				return await this.backendProvider.getCheckinStatus();
			} catch (error) {
				console.error("[AgentNewAdapter] Get checkin status failed:", error);
				return null;
			}
		}
		async claimDailyCheckin() {
			if (!this.backendProvider?.claimDailyCheckin) throw new Error("claimDailyCheckin not available");
			return await this.backendProvider.claimDailyCheckin();
		}
		async getActivityBanner() {
			if (!this.backendProvider?.getActivityBanner) {
				console.warn("[AgentNewAdapter] getActivityBanner not available");
				return null;
			}
			try {
				return await this.backendProvider.getActivityBanner();
			} catch (error) {
				console.error("[AgentNewAdapter] Get activity banner failed:", error);
				return null;
			}
		}
		async getAmbassadorStatus() {
			if (!this.backendProvider?.getAmbassadorStatus) return null;
			try {
				return await this.backendProvider.getAmbassadorStatus();
			} catch (error) {
				console.error("[AgentNewAdapter] Get ambassador status failed:", error);
				return null;
			}
		}
		async createCloudAgent(_params) {
			throw new Error("createCloudAgent is not implemented in base AgentNewAdapter; override it in the host-specific adapter (e.g. WorkbuddyAgentAdapterNext).");
		}
		async getCloudAgent(_params) {
			throw new Error("getCloudAgent is not implemented in base AgentNewAdapter; override it in the host-specific adapter (e.g. WorkbuddyAgentAdapterNext).");
		}
		async deleteCloudAgent(_params) {
			throw new Error("deleteCloudAgent is not implemented in base AgentNewAdapter; override it in the host-specific adapter (e.g. WorkbuddyAgentAdapterNext).");
		}
		async cloneCloudAgent(_params) {
			throw new Error("cloneCloudAgent is not implemented in base AgentNewAdapter; override it in the host-specific adapter (e.g. WorkbuddyAgentAdapterNext).");
		}
		async publishCloudAgentVersion(_params) {
			throw new Error("publishCloudAgentVersion is not implemented in base AgentNewAdapter; override it in the host-specific adapter (e.g. WorkbuddyAgentAdapterNext).");
		}
		async listGrantedCloudAgents(_params) {
			throw new Error("listGrantedCloudAgents is not implemented in base AgentNewAdapter; override it in the host-specific adapter (e.g. WorkbuddyAgentAdapterNext).");
		}
		async listEnterprisePublishedCloudAgents(_params) {
			throw new Error("listEnterprisePublishedCloudAgents is not implemented in base AgentNewAdapter; override it in the host-specific adapter (e.g. WorkbuddyAgentAdapterNext).");
		}
		async getEnterpriseAgentMarket() {
			throw new Error("getEnterpriseAgentMarket is not implemented in base AgentNewAdapter; override it in the host-specific adapter (e.g. WorkbuddyAgentAdapterNext).");
		}
		async createEnterpriseAgentConversation(_params) {
			throw new Error("createEnterpriseAgentConversation is not implemented in base AgentNewAdapter; override it in the host-specific adapter.");
		}
		async createCloudAgentInstance(_params) {
			throw new Error("createCloudAgentInstance is not implemented in base AgentNewAdapter; override it in the host-specific adapter (e.g. WorkbuddyAgentAdapterNext).");
		}
		async getCloudAgentInstance(_params) {
			throw new Error("getCloudAgentInstance is not implemented in base AgentNewAdapter; override it in the host-specific adapter (e.g. WorkbuddyAgentAdapterNext).");
		}
		async rebuildCloudAgentInstance(_params) {
			throw new Error("rebuildCloudAgentInstance is not implemented in base AgentNewAdapter; override it in the host-specific adapter (e.g. WorkbuddyAgentAdapterNext).");
		}
		async getCloudAgentSandboxSession(_params) {
			throw new Error("getCloudAgentSandboxSession is not implemented in base AgentNewAdapter; override it in the host-specific adapter (e.g. WorkbuddyAgentAdapterNext).");
		}
		async lexiangCheckAuthStatus() {
			if (this.backendProvider && "lexiangCheckAuthStatus" in this.backendProvider) return await this.backendProvider.lexiangCheckAuthStatus();
			console.warn("[AgentNewAdapter] lexiangCheckAuthStatus: not available in this adapter");
			return { status: "not_connected" };
		}
		async lexiangStartAuth(_params) {
			if (this.backendProvider && "lexiangStartAuth" in this.backendProvider) return await this.backendProvider.lexiangStartAuth(_params);
			console.warn("[AgentNewAdapter] lexiangStartAuth: not available in this adapter");
			throw new Error("lexiangStartAuth not available in this adapter");
		}
		async lexiangRevokeAuth() {
			if (this.backendProvider && "lexiangRevokeAuth" in this.backendProvider) return await this.backendProvider.lexiangRevokeAuth();
			console.warn("[AgentNewAdapter] lexiangRevokeAuth: not available in this adapter");
			throw new Error("lexiangRevokeAuth not available in this adapter");
		}
		async submitUserFeedback(params) {
			if (!this.backendProvider?.submitUserFeedback) return {
				success: false,
				error: "submitUserFeedback not available in backendProvider"
			};
			try {
				return await this.backendProvider.submitUserFeedback(params);
			} catch (error) {
				console.error("[AgentNewAdapter] Submit user feedback failed:", error);
				return {
					success: false,
					error: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		async speechToText(params) {
			if (!this.backendProvider?.speechToText) return {
				success: false,
				error: "speechToText not available in backendProvider"
			};
			try {
				return await this.backendProvider.speechToText(params);
			} catch (error) {
				console.error("[AgentNewAdapter] Speech to text failed:", error);
				return {
					success: false,
					error: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		async getSkillHubList(params) {
			if (!this.backendProvider?.getSkillHubList) throw new Error("getSkillHubList not available");
			try {
				return await this.backendProvider.getSkillHubList(params);
			} catch (error) {
				console.error("[AgentNewAdapter] Get SkillHub list failed:", error);
				throw error;
			}
		}
		async getSkillHubCategories() {
			if (!this.backendProvider?.getSkillHubCategories) throw new Error("getSkillHubCategories not available");
			try {
				return await this.backendProvider.getSkillHubCategories();
			} catch (error) {
				console.error("[AgentNewAdapter] Get SkillHub categories failed:", error);
				throw error;
			}
		}
		async getSkillHubSearch(q, limit = 20) {
			if (!this.backendProvider?.getSkillHubSearch) throw new Error("getSkillHubSearch not available");
			try {
				return await this.backendProvider.getSkillHubSearch(q, limit);
			} catch (error) {
				console.error("[AgentNewAdapter] SkillHub search failed:", error);
				throw error;
			}
		}
		async getSkillHubDetail(slug) {
			if (!this.backendProvider?.getSkillHubDetail) throw new Error("getSkillHubDetail not available");
			try {
				return await this.backendProvider.getSkillHubDetail(slug);
			} catch (error) {
				console.error("[AgentNewAdapter] Get SkillHub detail failed:", error);
				throw error;
			}
		}
		async getSkillHubExists(slugs) {
			if (!this.backendProvider?.getSkillHubExists) throw new Error("getSkillHubExists not available");
			try {
				return await this.backendProvider.getSkillHubExists(slugs);
			} catch (error) {
				console.error("[AgentNewAdapter] SkillHub exists check failed:", error);
				throw error;
			}
		}
		async reportSkillHubStats(slug, inc) {
			if (!this.backendProvider?.reportSkillHubStats) return;
			try {
				await this.backendProvider.reportSkillHubStats(slug, inc);
			} catch {}
		}
		async installSkillHubSkill(slug, version, name, iconUrl, labels) {
			if (!this.backendProvider?.installSkillHubSkill) return {
				success: false,
				skillName: slug,
				errorMessage: "installSkillHubSkill not available"
			};
			try {
				return await this.backendProvider.installSkillHubSkill(slug, version, name, iconUrl, labels);
			} catch (error) {
				console.error("[AgentNewAdapter] Install SkillHub skill failed:", error);
				throw error;
			}
		}
		async getSkillHubInstalledMetas() {
			if (!this.backendProvider?.getSkillHubInstalledMetas) return [];
			try {
				return await this.backendProvider.getSkillHubInstalledMetas();
			} catch (error) {
				console.error("[AgentNewAdapter] Get SkillHub installed metas failed:", error);
				return [];
			}
		}
		async getKnotList(params) {
			if (!this.backendProvider?.getKnotList) return {
				code: 0,
				message: "success",
				data: {
					total: 0,
					skills: []
				}
			};
			try {
				return await this.backendProvider.getKnotList(params);
			} catch (error) {
				console.error("[AgentNewAdapter] Get Knot list failed:", error);
				return {
					code: -1,
					message: String(error),
					data: {
						total: 0,
						skills: []
					}
				};
			}
		}
		async getKnotByIds(ids) {
			if (!this.backendProvider?.getKnotByIds) return {
				code: 0,
				message: "success",
				data: []
			};
			try {
				return await this.backendProvider.getKnotByIds(ids);
			} catch (error) {
				console.error("[AgentNewAdapter] Get Knot by ids failed:", error);
				return {
					code: -1,
					message: String(error),
					data: []
				};
			}
		}
		async getKnotCategories() {
			if (!this.backendProvider?.getKnotCategories) return {
				items: [],
				count: 0
			};
			try {
				return await this.backendProvider.getKnotCategories();
			} catch {
				return {
					items: [],
					count: 0
				};
			}
		}
		async getKnotTags() {
			if (!this.backendProvider?.getKnotTags) return {
				code: 0,
				message: "success",
				data: []
			};
			try {
				return await this.backendProvider.getKnotTags();
			} catch (error) {
				console.error("[AgentNewAdapter] Get Knot tags failed:", error);
				return {
					code: -1,
					message: String(error),
					data: []
				};
			}
		}
		async getKnotSearch(q, limit = 20) {
			if (!this.backendProvider?.getKnotSearch) return { results: [] };
			try {
				return await this.backendProvider.getKnotSearch(q, limit);
			} catch {
				return { results: [] };
			}
		}
		async getKnotDetail(slug) {
			if (!this.backendProvider?.getKnotDetail) throw new Error("getKnotDetail not available");
			return await this.backendProvider.getKnotDetail(slug);
		}
		async getKnotExists(slugs) {
			if (!this.backendProvider?.getKnotExists) {
				const exists = {};
				for (const s of slugs) exists[s] = false;
				return {
					exists,
					count: 0
				};
			}
			try {
				return await this.backendProvider.getKnotExists(slugs);
			} catch {
				const exists = {};
				for (const s of slugs) exists[s] = false;
				return {
					exists,
					count: 0
				};
			}
		}
		async reportKnotStats(slug, inc) {
			if (!this.backendProvider?.reportKnotStats) return;
			try {
				await this.backendProvider.reportKnotStats(slug, inc);
			} catch {}
		}
		async installKnotSkill(id, version, name, skillName, slug) {
			if (!this.backendProvider?.installKnotSkill) return {
				success: false,
				skillName: name || String(id),
				errorMessage: "installKnotSkill not available"
			};
			try {
				return await this.backendProvider.installKnotSkill(id, version, name, skillName, slug);
			} catch (error) {
				console.error("[AgentNewAdapter] Install Knot skill failed:", error);
				throw error;
			}
		}
		async getKnotInstalledMetas() {
			if (!this.backendProvider?.getKnotInstalledMetas) return [];
			try {
				return await this.backendProvider.getKnotInstalledMetas();
			} catch {
				return [];
			}
		}
		async getBuiltinMarketList(params) {
			if (!this.backendProvider?.getBuiltinMarketList) return {
				code: 0,
				msg: "success",
				data: {
					total_count: 0,
					skills: []
				}
			};
			try {
				return await this.backendProvider.getBuiltinMarketList(params);
			} catch (error) {
				console.error("[AgentNewAdapter] Get BuiltinMarket list failed:", error);
				return {
					code: -1,
					msg: String(error),
					data: {
						total_count: 0,
						skills: []
					}
				};
			}
		}
		async getBuiltinMarketByIds(skillIds) {
			if (!this.backendProvider?.getBuiltinMarketByIds) return {
				code: 0,
				msg: "success",
				data: {
					total_count: 0,
					skills: []
				}
			};
			try {
				return await this.backendProvider.getBuiltinMarketByIds(skillIds);
			} catch (error) {
				console.error("[AgentNewAdapter] Get BuiltinMarket by ids failed:", error);
				return {
					code: -1,
					msg: String(error),
					data: {
						total_count: 0,
						skills: []
					}
				};
			}
		}
		async getBuiltinMarketCategories(type = "skill") {
			if (!this.backendProvider?.getBuiltinMarketCategories) return {
				code: 0,
				msg: "success",
				data: {
					type,
					total: 0,
					items: []
				}
			};
			try {
				return await this.backendProvider.getBuiltinMarketCategories(type);
			} catch (error) {
				console.error("[AgentNewAdapter] Get BuiltinMarket categories failed:", error);
				return {
					code: -1,
					msg: String(error),
					data: {
						type,
						total: 0,
						items: []
					}
				};
			}
		}
		async installBuiltinMarketSkill(params) {
			if (!this.backendProvider?.installBuiltinMarketSkill) return {
				success: false,
				skillName: params.skillName || params.skillId,
				errorMessage: "installBuiltinMarketSkill not available"
			};
			try {
				return await this.backendProvider.installBuiltinMarketSkill(params);
			} catch (error) {
				console.error("[AgentNewAdapter] Install BuiltinMarket skill failed:", error);
				throw error;
			}
		}
		async getBuiltinMarketInstalledMetas() {
			if (!this.backendProvider?.getBuiltinMarketInstalledMetas) return [];
			try {
				return await this.backendProvider.getBuiltinMarketInstalledMetas();
			} catch {
				return [];
			}
		}
		async backfillBuiltinMarketSkillId(params) {
			if (!this.backendProvider?.backfillBuiltinMarketSkillId) return 0;
			try {
				return await this.backendProvider.backfillBuiltinMarketSkillId(params);
			} catch {
				return 0;
			}
		}
		async backfillBuiltinMarketIconSource(params) {
			if (!this.backendProvider?.backfillBuiltinMarketIconSource) return 0;
			try {
				return await this.backendProvider.backfillBuiltinMarketIconSource(params);
			} catch {
				return 0;
			}
		}
		async migrateBuiltinMarketDirsToSkillId() {
			const empty = {
				migrated: 0,
				skipped: 0,
				failed: 0,
				alreadyDone: false
			};
			if (!this.backendProvider?.migrateBuiltinMarketDirsToSkillId) return empty;
			try {
				return await this.backendProvider.migrateBuiltinMarketDirsToSkillId();
			} catch {
				return empty;
			}
		}
		async getUserConnector() {
			if (!this.backendProvider) throw new Error("No backendProvider configured");
			return await this.backendProvider.getUserConnector();
		}
		/**
		* 修改用户连接器连接状态
		* 委托给 BackendProvider 处理
		*/
		async modifyUserConnectorConnectStatus(request) {
			if (!this.backendProvider) throw new Error("No backendProvider configured");
			return await this.backendProvider.modifyUserConnectorConnectStatus(request);
		}
		/**
		* 修改用户连接器仓库
		* 委托给 BackendProvider 处理
		*/
		async modifyUserConnectorRepo(request) {
			if (!this.backendProvider) throw new Error("No backendProvider configured");
			return await this.backendProvider.modifyUserConnectorRepo(request);
		}
		/**
		* 修改用户连接器激活状态
		* 委托给 BackendProvider 处理
		*/
		async modifyUserConnectorActiveStatus(request) {
			if (!this.backendProvider) throw new Error("No backendProvider configured");
			return await this.backendProvider.modifyUserConnectorActiveStatus(request);
		}
		/**
		* 删除用户连接器
		* 委托给 BackendProvider 处理
		*/
		async deleteUserConnector(name) {
			if (!this.backendProvider) throw new Error("No backendProvider configured");
			return await this.backendProvider.deleteUserConnector(name);
		}
		/**
		* 添加任务
		* 委托给 BackendProvider 处理
		*/
		async addConnectorTask(request) {
			if (!this.backendProvider) throw new Error("No backendProvider configured");
			return await this.backendProvider.addConnectorTask(request);
		}
		/**
		* 获取任务连接器列表
		* 委托给 BackendProvider 处理
		*/
		async getTaskConnector(taskId) {
			if (!this.backendProvider) throw new Error("No backendProvider configured");
			return await this.backendProvider.getTaskConnector(taskId);
		}
		/**
		* 修改任务连接器激活状态
		* 委托给 BackendProvider 处理
		*/
		async modifyTaskConnectorActiveStatus(request) {
			if (!this.backendProvider) throw new Error("No backendProvider configured");
			return await this.backendProvider.modifyTaskConnectorActiveStatus(request);
		}
		/**
		* 修改任务连接器仓库
		* 委托给 BackendProvider 处理
		*/
		async modifyTaskConnectorRepo(request) {
			if (!this.backendProvider) throw new Error("No backendProvider configured");
			return await this.backendProvider.modifyTaskConnectorRepo(request);
		}
		/**
		* oauth回调，后端用第三方的code换token的
		* 委托给 BackendProvider 处理
		*/
		async saveOauthToken(request) {
			if (!this.backendProvider) throw new Error("No backendProvider configured");
			return await this.backendProvider.saveOauthToken(request);
		}
		/**
		* 获取OAuth连接器的仓库列表
		*/
		async getRepoList(request) {
			if (!this.backendProvider) throw new Error("No backendProvider configured");
			return await this.backendProvider.getRepoList(request);
		}
		/**
		* 撤销OAuth连接器的所有连接
		*/
		async revokeAll(request) {
			if (!this.backendProvider) throw new Error("No backendProvider configured");
			return await this.backendProvider.revokeAll(request);
		}
		/**
		* 获取 OAuth 用户信息
		*/
		async getOauthUser(request) {
			if (!this.backendProvider) throw new Error("No backendProvider configured");
			return await this.backendProvider.getOauthUser(request);
		}
		/**
		* 获取文件信息
		*/
		async getFile(request) {
			if (!this.backendProvider) throw new Error("No backendProvider configured");
			return await this.backendProvider.getFile(request);
		}
		/**
		* 触发登录流程
		* 委托给 BackendProvider 处理，不同环境有不同实现：
		* - Web 环境: 跳转到登录页面
		* - IDE 环境: 通过 IPC 通知 IDE 打开登录流程
		*/
		async login(params) {
			if (!this.backendProvider) {
				const redirectUrl = encodeURIComponent(window.location.href);
				window.location.href = `${window.location.origin}/login?redirect=${redirectUrl}`;
				return;
			}
			let pollingStopped = false;
			const pollAuthUrl = async () => {
				while (!pollingStopped) {
					try {
						const url = await this.backendProvider.getLoginUrl?.();
						if (url) {
							this.channel?.emit("authUrlChanged", { authUrl: url });
							return;
						}
					} catch {}
					await new Promise((r) => setTimeout(r, 500));
				}
			};
			if (this.backendProvider.getLoginUrl && this.channel) pollAuthUrl();
			try {
				await this.backendProvider.login(params);
			} catch (error) {
				console.error("[AgentNewAdapter] Login failed:", error);
				throw error;
			} finally {
				pollingStopped = true;
			}
		}
		async savePendingInput(code) {
			return await this.backendProvider?.savePendingInput?.(code) ?? null;
		}
		async loadPendingInput(codeId) {
			return await this.backendProvider?.loadPendingInput?.(codeId) ?? null;
		}
		/**
		* 登出账号
		* 委托给 BackendProvider 处理
		*
		* 重要：登出时必须清除所有 session 缓存和消息缓存
		* 否则重新登录后，loadSessionInternal 会命中旧缓存，
		* 不会调用 client.sessions.load()，导致消息列表为空
		*/
		async logout() {
			console.log("[AgentNewAdapter] Logout: Clearing all session caches");
			this.clearSessionCache();
			this.messageCache.clear();
			this.toolCallIdToMessageId.clear();
			this.sessionConfigs.clear();
			this.listenedSessionIds.clear();
			this.sessionModels.clear();
			this.browserUrlCache.clear();
			this.pendingMessageTracker.clearAll();
			if (!this.backendProvider) return;
			try {
				await this.backendProvider.logout();
			} catch (error) {
				console.error("[AgentNewAdapter] Logout failed:", error);
				throw error;
			}
		}
		/**
		* 重新加载窗口
		* 委托给 BackendProvider 处理（用于应用语言设置等）
		*/
		async reloadWindow(params) {
			if (!this.backendProvider?.reloadWindow) return;
			try {
				await this.backendProvider.reloadWindow(params);
			} catch (error) {
				console.error("[AgentNewAdapter] ReloadWindow failed:", error);
				throw error;
			}
		}
		/**
		* Save locale to argv.json without restarting the app.
		* The change takes effect on next manual restart.
		*/
		async saveLocale(params) {
			if (!this.backendProvider?.saveLocale) return;
			try {
				await this.backendProvider.saveLocale(params);
			} catch (error) {
				console.error("[AgentNewAdapter] saveLocale failed:", error);
				throw error;
			}
		}
		/**
		* 设置防休眠状态
		* 委托给 BackendProvider 处理，通知主进程启用/禁用 powerSaveBlocker
		*/
		async savePowerBlocker(params) {
			if (!this.backendProvider?.savePowerBlocker) return;
			try {
				await this.backendProvider.savePowerBlocker(params);
			} catch (error) {
				console.error("[AgentNewAdapter] savePowerBlocker failed:", error);
				throw error;
			}
		}
		/**
		* 锁屏远程：读取当前 PowerManager 状态，UI 据此渲染开关与活跃指示。
		*/
		async getPowerSaveBlockerState() {
			if (!this.backendProvider?.getPowerSaveBlockerState) return {
				isEnabled: false,
				isActive: false
			};
			try {
				return await this.backendProvider.getPowerSaveBlockerState();
			} catch (error) {
				console.error("[AgentNewAdapter] getPowerSaveBlockerState failed:", error);
				return {
					isEnabled: false,
					isActive: false
				};
			}
		}
		/**
		* 获取用户级记忆概要（设置页）
		*/
		async getMemoryProfile() {
			if (!this.backendProvider?.getMemoryProfile) return { memoryBlock: "" };
			try {
				return await this.backendProvider.getMemoryProfile();
			} catch (error) {
				console.error("[AgentNewAdapter] getMemoryProfile failed:", error);
				throw error;
			}
		}
		/**
		* 保存记忆设置开关
		*/
		async saveMemorySettings(params) {
			if (!this.backendProvider?.saveMemorySettings) return {
				success: true,
				generateMemoryEnabled: params.generateMemoryEnabled
			};
			try {
				return await this.backendProvider.saveMemorySettings(params);
			} catch (error) {
				console.error("[AgentNewAdapter] saveMemorySettings failed:", error);
				throw error;
			}
		}
		/**
		* 提交记忆修改建议
		*/
		async submitMemorySuggestion(params) {
			if (!this.backendProvider?.submitMemorySuggestion) return {
				success: false,
				accepted: false,
				error: "backend submitMemorySuggestion is unavailable"
			};
			try {
				return await this.backendProvider.submitMemorySuggestion(params);
			} catch (error) {
				console.error("[AgentNewAdapter] submitMemorySuggestion failed:", error);
				throw error;
			}
		}
		/**
		* 导入记忆内容
		*/
		async importMemoryContent(params) {
			if (!this.backendProvider?.importMemoryContent) return {
				success: false,
				imported: false,
				error: "backend importMemoryContent is unavailable"
			};
			try {
				return await this.backendProvider.importMemoryContent(params);
			} catch (error) {
				console.error("[AgentNewAdapter] importMemoryContent failed:", error);
				throw error;
			}
		}
		/**
		* 检查记忆是否有正在进行的更新（Phase6 M5）
		*/
		async checkMemoryUpdating() {
			if (!this.backendProvider?.checkMemoryUpdating) return {
				isUpdating: false,
				error: "backend checkMemoryUpdating is unavailable"
			};
			try {
				return await this.backendProvider.checkMemoryUpdating();
			} catch (error) {
				console.error("[AgentNewAdapter] checkMemoryUpdating failed:", error);
				return {
					isUpdating: false,
					error: error instanceof Error ? error.message : "checkMemoryUpdating failed"
				};
			}
		}
		/**
		* 清空用户记忆（Phase11 M7）
		*/
		async clearMemory() {
			if (!this.backendProvider?.clearMemory) return {
				success: false,
				isEmpty: false,
				error: "backend clearMemory is unavailable"
			};
			try {
				return await this.backendProvider.clearMemory();
			} catch (error) {
				console.error("[AgentNewAdapter] clearMemory failed:", error);
				return {
					success: false,
					isEmpty: false,
					error: error instanceof Error ? error.message : "clearMemory failed"
				};
			}
		}
		/**
		* 关闭 Agent Manager 面板
		* 委托给 BackendProvider 处理，用于 Local 模式下返回 IDE
		*/
		async closeAgentManager() {
			if (!this.backendProvider?.closeAgentManager) {
				window.close();
				return;
			}
			try {
				await this.backendProvider.closeAgentManager();
			} catch (error) {
				console.error("[AgentNewAdapter] closeAgentManager failed:", error);
				throw error;
			}
		}
		/**
		* 在外部浏览器中打开链接
		* 委托给 BackendProvider 处理，用于 Local 模式下打开外部 URL
		*/
		async openExternal(url) {
			if (!this.backendProvider?.openExternal) {
				window.open(url, "_blank", "noopener,noreferrer");
				return;
			}
			try {
				await this.backendProvider.openExternal(url);
			} catch (error) {
				console.error("[AgentNewAdapter] openExternal failed:", error);
				throw error;
			}
		}
		/**
		* 唤起元宝 App
		* 通过 BackendProvider 委托给 Extension Host 执行 OpenYuanbaoCommand：
		* - 已安装未启动：通过 open -a 拉起元宝 App
		* - 未安装：跳转元宝下载页面
		*/
		async openYuanbao() {
			const YUANBAO_DOWNLOAD_URL = "https://yuanbao.tencent.com/download";
			if (!this.backendProvider?.openYuanbao) {
				await this.openExternal(YUANBAO_DOWNLOAD_URL);
				return;
			}
			try {
				await this.backendProvider.openYuanbao();
			} catch (error) {
				await this.openExternal(YUANBAO_DOWNLOAD_URL);
			}
		}
		/**
		* 工具回调操作
		* 用于对正在执行的工具进行 skip 或 cancel 操作
		*
		* @param sessionId ACP 会话 ID
		* @param toolCallId 工具调用 ID
		* @param toolName 工具名称
		* @param action 操作类型 ('approve' | 'skip' | 'cancel')
		*/
		async toolCallback(sessionId, toolCallId, toolName, action) {
			try {
				const { session } = await this.loadSessionInternal(sessionId);
				return await session.toolCallback(toolCallId, toolName, action) || { success: true };
			} catch (error) {
				console.error("[AgentNewAdapter] toolCallback failed:", error);
				return {
					success: false,
					error: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		/**
		* 获取会话的可用命令列表
		*
		* 通过 client.sessions.getAvailableCommands() 获取命令
		* 如果 session.availableCommands 有值则返回缓存值，否则从后端获取
		*
		* @param params 命令获取参数
		* @returns Promise<AvailableCommand[]> 可用命令列表
		*/
		async getAvailableCommands(params) {
			try {
				return await this.client.sessions.getAvailableCommands(params);
			} catch (error) {
				console.error("[AgentNewAdapter] Get available commands failed:", error);
				return [];
			}
		}
		/**
		* 列出目录内容（用于懒加载文件树）
		* 将 EntryInfo[] 转换为 TreeNode[]
		*
		* @param sessionId 会话 ID
		* @param path 目录路径
		* @param depth 深度（默认1层）
		* @returns Promise<TreeNode[]> 树形节点数组
		*/
		async listDirectory(sessionId, path, depth = 1) {
			try {
				const { session } = await this.loadSessionInternal(sessionId);
				const entries = await session.files.list(path, { depth });
				return this.convertEntriesToTreeNodes(entries, path, depth);
			} catch (error) {
				console.error("[AgentNewAdapter] listDirectory failed:", error);
				return [];
			}
		}
		/**
		* 归档会话
		* 通过 client.sessions.archive() 归档会话
		*
		* @param sessionId 会话 ID（即 Agent ID）
		* @returns Promise<{ success: boolean; error?: string }> 归档结果
		*/
		async archiveSession(sessionId) {
			try {
				await this.client.sessions.archive(sessionId);
				this.sessionConfigs.delete(sessionId);
				this.sessionModels.delete(sessionId);
				this.messageCache.delete(sessionId);
				this.clearProcessedOffsets(sessionId);
				return { success: true };
			} catch (error) {
				console.error("🐸[AgentNewAdapter] archiveSession failed:", error);
				return {
					success: false,
					error: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		/**
		* 取消归档会话（恢复任务）
		* 通过 client.sessions.updateStatus() 将会话状态从 archived 恢复
		*
		* @param sessionId 会话 ID（即 Agent ID）
		* @param restoreStatus 恢复后的状态，默认为 completed
		* @returns Promise<{ success: boolean; error?: string }> 恢复结果
		*/
		async unarchiveSession(sessionId, restoreStatus = "completed") {
			try {
				await this.client.sessions.updateStatus(sessionId, restoreStatus);
				return { success: true };
			} catch (error) {
				console.error("🐸[AgentNewAdapter] unarchiveSession failed:", error);
				return {
					success: false,
					error: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		/**
		* 删除会话（硬删除，不可恢复）
		* 通过 client.sessions.delete() 删除会话，不删除工作空间目录
		*
		* @param sessionId 会话 ID（即 Agent ID）
		* @returns Promise<{ success: boolean; error?: string }> 删除结果
		*/
		async deleteSession(sessionId) {
			try {
				await this.client.sessions.delete(sessionId);
				this.sessionConfigs.delete(sessionId);
				this.sessionModels.delete(sessionId);
				this.messageCache.delete(sessionId);
				this.clearProcessedOffsets(sessionId);
				return { success: true };
			} catch (error) {
				console.error("🐸[AgentNewAdapter] deleteSession failed:", error);
				return {
					success: false,
					error: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		/**
		* 删除工作空间及其所有任务
		* 获取该工作空间路径下的所有 session，逐个删除
		*
		* @param workspacePath 工作空间路径
		* @returns Promise<{ success: boolean; error?: string }> 删除结果
		*/
		async deleteWorkspaceAndFiles(workspacePath) {
			try {
				const deletePromises = (await this.client.sessions.list()).agents.filter((s) => s.cwd === workspacePath).map(async (session) => {
					try {
						await this.client.sessions.delete(session.id);
						this.sessionConfigs.delete(session.id);
						this.sessionModels.delete(session.id);
						this.messageCache.delete(session.id);
						this.clearProcessedOffsets(session.id);
					} catch (error) {
						console.error(`🐸[AgentNewAdapter] deleteWorkspaceAndFiles: failed to delete session ${session.id}:`, error);
					}
				});
				await Promise.all(deletePromises);
				return { success: true };
			} catch (error) {
				console.error("🐸[AgentNewAdapter] deleteWorkspaceAndFiles failed:", error);
				return {
					success: false,
					error: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		/**
		* 重命名会话
		* 通过 client.sessions.rename() 重命名会话
		*
		* @param sessionId 会话 ID（即 Agent ID）
		* @param title 新标题
		* @returns Promise<{ success: boolean; error?: string }> 重命名结果
		*/
		async renameSession(sessionId, title) {
			try {
				await this.client.sessions.rename(sessionId, title);
				return { success: true };
			} catch (error) {
				console.error("🐸[AgentNewAdapter] renameSession failed:", error);
				return {
					success: false,
					error: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		/**
		* 移动会话
		* 将 Playground 会话转换为普通会话（从 Playground 移动到 Workspace）
		* 通过 client.sessions.move() 移动会话
		*
		* @param sessionId 会话 ID（即 Agent ID）
		* @returns Promise<{ success: boolean; error?: string }> 移动结果
		*/
		async moveSession(sessionId) {
			try {
				await this.client.sessions.move(sessionId);
				return { success: true };
			} catch (error) {
				console.error("🐸[AgentNewAdapter] moveSession failed:", error);
				return {
					success: false,
					error: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		/**
		* 将 EntryInfo[] 转换为 TreeNode[] 树形结构
		*/
		convertEntriesToTreeNodes(entries, basePath, depth) {
			const nodeMap = /* @__PURE__ */ new Map();
			const rootNodes = [];
			const getDepthLevel = (path) => {
				return (path.startsWith(basePath) ? path.slice(basePath.length) : path).split("/").filter((s) => s.length > 0).length;
			};
			for (const entry of entries) {
				const fullPath = entry.path || `${basePath}/${entry.name}`;
				const isFile = entry.type === "file";
				const nodeDepthLevel = getDepthLevel(fullPath);
				const isLoaded = !isFile ? nodeDepthLevel < depth - 1 : void 0;
				const node = {
					path: fullPath,
					name: entry.name,
					type: isFile ? "file" : "dir",
					children: !isFile ? [] : void 0,
					isLoaded
				};
				nodeMap.set(fullPath, node);
			}
			for (const entry of entries) {
				const fullPath = entry.path || `${basePath}/${entry.name}`;
				const node = nodeMap.get(fullPath);
				if (!node) continue;
				const parentPath = fullPath.substring(0, fullPath.lastIndexOf("/"));
				if (parentPath === basePath || parentPath === "") rootNodes.push(node);
				else {
					const parentNode = nodeMap.get(parentPath);
					if (parentNode && parentNode.children) parentNode.children.push(node);
					else rootNodes.push(node);
				}
			}
			const sortNodes = (nodes) => {
				nodes.sort((a, b) => {
					if (a.type !== b.type) return a.type === "dir" ? -1 : 1;
					return a.name.localeCompare(b.name, void 0, {
						numeric: true,
						sensitivity: "base"
					});
				});
				for (const node of nodes) if (node.children) sortNodes(node.children);
			};
			sortNodes(rootNodes);
			return rootNodes;
		}
		/**
		* 监听目录变更
		*
		* @param sessionId 会话 ID
		* @param path 监听的目录路径
		* @param callback 变更回调
		* @returns 取消监听的函数
		*/
		async watchDirectory(sessionId, path, callback) {
			try {
				const { session } = await this.loadSessionInternal(sessionId);
				const watchHandle = await session.files.watchDir(path, (event) => {
					const fullPath = event.path || `${path}/${event.name}`;
					callback({
						type: this.mapFilesystemEventType(event.type),
						path: fullPath
					});
				}, { recursive: true });
				return async () => {
					await watchHandle.stop();
				};
			} catch (error) {
				console.error("[AgentNewAdapter] watchDirectory failed:", error);
				return () => {};
			}
		}
		/**
		* 映射 e2b FilesystemEventType 到我们的事件类型
		*/
		mapFilesystemEventType(type) {
			switch (type) {
				case "create": return "create";
				case "write":
				case "chmod": return "update";
				case "remove": return "delete";
				case "rename": return "rename";
				default: return "update";
			}
		}
		/**
		* 打开工作区窗口
		*
		* 用于在 LocalAgentProvider 环境中打开一个新的工作区窗口
		*
		* @param currentConversation 当前会话对象
		* @param needActivated 是否激活工作区窗口到前台（默认 true）
		* @param executeCommand 打开窗口后执行的 VS Code 命令（可选）
		* @returns Promise<InitializeWorkspaceResponse> 打开结果
		*/
		async openWorkspace(currentConversation, needActivated = true, executeCommand) {
			try {
				const cwd = currentConversation.cwd;
				if (!cwd || cwd.trim().length === 0) {
					console.warn("🐸[AgentNewAdapter] No cwd in conversation, cannot open workspace");
					return {
						success: false,
						error: "No working directory specified in conversation"
					};
				}
				const mcpServers = this.sessionConfigs.get(currentConversation.id)?.mcpServers || [];
				if (mcpServers.length > 0) {}
				const request = {
					cwd: cwd.trim(),
					mcpServers,
					needActivated
				};
				if (executeCommand) request.executeCommand = executeCommand;
				const result = await this.client.sessions.openWorkspace(request);
				if (!result.success) {
					console.warn("🐸[AgentNewAdapter] openWorkspace returned failure:", result.error);
					return result;
				}
				return result;
			} catch (error) {
				const errorMessage = error instanceof Error ? error.message : "Unknown error";
				const isUnsupportedError = errorMessage.includes("does not support") || errorMessage.includes("not supported") || errorMessage.includes("not available");
				console.error("🐸[AgentNewAdapter] openWorkspace failed:", {
					error,
					errorMessage,
					isUnsupportedError,
					conversationId: currentConversation.id
				});
				return {
					success: false,
					error: isUnsupportedError ? "Opening workspace is only supported in local environment" : errorMessage
				};
			}
		}
		/**
		* Pick file - 打开文件选择对话框
		*
		* 调用链：
		* AgentNewAdapter.pickFile()
		*   -> AgentClient.sessions.pickFile()
		*   -> LocalAgentProvider.pickFile()
		*   -> BackendProvider.pickFile()
		*   -> BackendService.pickFile()
		*   -> ipcRenderer.invoke('codebuddy:pickFile')
		*   -> electron-main app.ts IPC handler
		*   -> DialogMainService.pickFile()
		*
		* @param params - 文件选择参数
		* @returns 文件选择响应
		*/
		async pickFile(params) {
			try {
				const result = await this.client.sessions.pickFile(params);
				if (result.canceled) return result;
				return result;
			} catch (error) {
				const errorMessage = error instanceof Error ? error.message : "Unknown error";
				const isUnsupportedError = errorMessage.includes("does not support") || errorMessage.includes("not supported") || errorMessage.includes("not available");
				console.error("🐸[AgentNewAdapter] pickFile failed:", {
					error,
					errorMessage,
					isUnsupportedError
				});
				return {
					files: [],
					canceled: true,
					error: isUnsupportedError ? "File picker is only supported in local environment" : errorMessage
				};
			}
		}
		/**
		* Pick folder - 打开文件夹选择对话框
		*
		* 调用链：
		* AgentNewAdapter.pickFolder()
		*   -> AgentClient.sessions.pickFolder()
		*   -> LocalAgentProvider.pickFolder()
		*   -> BackendService.pickFolder()
		*   -> ipcRenderer.invoke('codebuddy:pickFolder')
		*   -> electron-main app.ts IPC handler
		*   -> DialogMainService.pickFolder()
		*
		* @param params - 文件夹选择参数
		* @returns 文件夹选择响应
		*/
		async pickFolder(params) {
			try {
				const result = await this.client.sessions.pickFolder(params);
				if (result.canceled) return result;
				return result;
			} catch (error) {
				const errorMessage = error instanceof Error ? error.message : "Unknown error";
				const isUnsupportedError = errorMessage.includes("does not support") || errorMessage.includes("not supported") || errorMessage.includes("not available");
				console.error("🐸[AgentNewAdapter] pickFolder failed:", {
					error,
					errorMessage,
					isUnsupportedError
				});
				return {
					folderPaths: [],
					canceled: true,
					error: isUnsupportedError ? "Folder picker is only supported in local environment" : errorMessage
				};
			}
		}
		async saveFileToLocal(url, defaultFileName, options) {
			const signal = options?.signal;
			try {
				if (signal?.aborted) return {
					success: false,
					error: "User cancelled"
				};
				const folderResult = await this.pickFolder();
				if (folderResult.canceled || !folderResult.folderPaths?.length) return {
					success: false,
					error: "User cancelled"
				};
				if (signal?.aborted) return {
					success: false,
					error: "User cancelled"
				};
				const savePath = `${folderResult.folderPaths[0]}/${defaultFileName}`;
				options?.onStart?.();
				await new Promise((resolve) => setTimeout(resolve, 0));
				const response = await fetch(url, {
					credentials: "include",
					...signal ? { signal } : {}
				});
				if (!response.ok) return {
					success: false,
					error: `Download failed: HTTP ${response.status}`
				};
				let blob;
				const contentLength = response.headers.get("content-length");
				const headerTotalBytes = contentLength ? parseInt(contentLength, 10) : 0;
				const hintTotalBytes = options?.totalBytesHint && options.totalBytesHint > 0 ? options.totalBytesHint : 0;
				if ((options?.onProgress || signal) && response.body) {
					const totalBytes = Number.isFinite(headerTotalBytes) && headerTotalBytes > 0 ? headerTotalBytes : hintTotalBytes;
					console.info("[NetDrive] saveFileToLocal: progress totals:", {
						contentLength,
						hintTotalBytes,
						totalBytes
					});
					let loadedBytes = 0;
					let lastReportedPercent = -1;
					if (totalBytes > 0) {
						options?.onProgress?.(0, 0, totalBytes);
						await new Promise((resolve) => setTimeout(resolve, 0));
					}
					const reader = response.body.getReader();
					const onAbort = () => {
						try {
							reader.cancel("User cancelled");
						} catch {}
					};
					if (signal) if (signal.aborted) onAbort();
					else signal.addEventListener("abort", onAbort, { once: true });
					const chunks = [];
					try {
						while (true) {
							if (signal?.aborted) return {
								success: false,
								error: "User cancelled"
							};
							const { done, value } = await reader.read();
							if (done) break;
							chunks.push(value);
							loadedBytes += value.length;
							if (totalBytes > 0) {
								const rawPercent = Math.min(100, Math.round(loadedBytes / totalBytes * 1e3) / 10);
								const percent = rawPercent >= 100 ? 99.9 : rawPercent;
								if (percent !== lastReportedPercent) {
									lastReportedPercent = percent;
									options?.onProgress?.(percent, loadedBytes, totalBytes);
									await new Promise((resolve) => setTimeout(resolve, 0));
								}
							} else {
								options?.onProgress?.(-1, loadedBytes, 0);
								await new Promise((resolve) => setTimeout(resolve, 0));
							}
						}
					} finally {
						if (signal) signal.removeEventListener("abort", onAbort);
					}
					if (signal?.aborted) return {
						success: false,
						error: "User cancelled"
					};
					blob = new Blob(chunks);
				} else blob = await response.blob();
				const arrayBuffer = await blob.arrayBuffer();
				const uint8Array = new Uint8Array(arrayBuffer);
				let binary = "";
				const chunkSize = 8192;
				for (let i = 0; i < uint8Array.length; i += chunkSize) binary += String.fromCharCode(...uint8Array.slice(i, i + chunkSize));
				const base64Content = btoa(binary);
				if (this.backendProvider && this.backendProvider.writeLocalFile) await this.backendProvider.writeLocalFile(savePath, base64Content, "base64");
				else {
					const blobUrl = URL.createObjectURL(blob);
					const link = document.createElement("a");
					link.href = blobUrl;
					link.download = defaultFileName;
					link.style.display = "none";
					document.body.appendChild(link);
					link.click();
					document.body.removeChild(link);
					URL.revokeObjectURL(blobUrl);
					return { success: true };
				}
				return {
					success: true,
					filePath: savePath
				};
			} catch (error) {
				return {
					success: false,
					error: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		/**
		* Search file - 搜索文件
		*
		* 调用链：
		* AgentNewAdapter.searchFile()
		*   -> AgentClient.sessions.searchFile()
		*   -> LocalAgentProvider.searchFile()
		*   -> BackendService.searchFile()
		*   -> ipcRenderer.invoke('codebuddy:searchFile')
		*   -> FileSearchService.getWorkspaceFiles()
		*
		* @param params - 搜索参数
		* @returns 搜索结果
		*/
		async searchFile(params) {
			try {
				return await this.client.sessions.searchFile(params);
			} catch (error) {
				const errorMessage = error instanceof Error ? error.message : "Unknown error";
				return {
					results: [],
					error: errorMessage.includes("does not support") || errorMessage.includes("not supported") || errorMessage.includes("not available") ? "File search is only supported in local environment" : errorMessage
				};
			}
		}
		/**
		* Get subagent list - 获取 Subagent 列表
		*
		* 调用链：
		* AgentNewAdapter.getSubagentList()
		*   -> AgentClient.sessions.getSubagentList()
		*   -> LocalAgentProvider.getSubagentList()
		*   -> sendBroadcastRequest('getSubagentList')
		*   -> SubagentsService.getSubagents()
		*
		* @param params - 查询参数
		* @returns Subagent 列表
		*/
		async getSubagentList(params) {
			try {
				return await this.client.sessions.getSubagentList(params);
			} catch (error) {
				const errorMessage = error instanceof Error ? error.message : "Unknown error";
				const isUnsupportedError = errorMessage.includes("does not support") || errorMessage.includes("not supported") || errorMessage.includes("not available");
				console.error("🐸[AgentNewAdapter] getSubagentList failed:", {
					error,
					errorMessage,
					isUnsupportedError
				});
				return {
					results: [],
					error: isUnsupportedError ? "Subagent list is only supported in local environment" : errorMessage
				};
			}
		}
		/**
		* Get skill list - 获取 Skill 列表
		*
		* 优先从 product 配置中获取 skillScanDirs，然后合并到请求参数中传入。
		*
		* @param params - 查询参数
		* @returns Skill 列表
		*/
		async getSkillList(params) {
			try {
				const mergedParams = await this.mergeSkillScanDirs(params);
				return await this.client.sessions.getSkillList(mergedParams);
			} catch (error) {
				const errorMessage = error instanceof Error ? error.message : "Unknown error";
				console.error("[AgentNewAdapter] getSkillList failed:", error);
				return {
					results: [],
					error: errorMessage
				};
			}
		}
		/**
		* 合并 product 配置中的 skillScanDirs 到请求参数
		* 优先使用调用方传入的 skillScanDirs，未传入时从 product 配置获取
		*/
		async mergeSkillScanDirs(params) {
			if (params?.skillScanDirs && params.skillScanDirs.length > 0) return params;
			try {
				const skillScanDirs = (await this._fetchProductConfiguration()).skillScanDirs;
				if (skillScanDirs && skillScanDirs.length > 0) return {
					...params,
					skillScanDirs
				};
			} catch {}
			return params;
		}
		/**
		* Import skill - 导入 Skill 文件夹
		*
		* @param params - 导入参数
		* @returns 导入结果
		*/
		async importSkill(params) {
			try {
				const result = await this.client.sessions.importSkill(params);
				if (result.success) this.reportTelemetry("skill_create", {
					id: result.skillName || "unknown",
					source: params.source || "userSettings"
				});
				return result;
			} catch (error) {
				const errorMessage = error instanceof Error ? error.message : "Unknown error";
				console.error("[AgentNewAdapter] importSkill failed:", error);
				return {
					success: false,
					error: errorMessage
				};
			}
		}
		/**
		* Install skill by path - 通过路径直接安装 Skill（跳过文件选择弹窗和安全检测）
		*
		* @param params - 安装参数，包含 folderPath
		* @returns 安装结果
		*/
		async installSkillByPath(params) {
			try {
				const result = await this.client.sessions.installSkillByPath(params);
				if (result.success) this.reportTelemetry("skill_create", {
					id: result.skillName || "unknown",
					source: params.source || "userSettings"
				});
				return result;
			} catch (error) {
				const errorMessage = error instanceof Error ? error.message : "Unknown error";
				console.error("[AgentNewAdapter] installSkillByPath failed:", error);
				return {
					success: false,
					error: errorMessage
				};
			}
		}
		/**
		* Query skill security scan result
		*/
		async querySkillScanResult(params) {
			try {
				return await this.client.sessions.querySkillScanResult(params);
			} catch (error) {
				console.error("[AgentNewAdapter] querySkillScanResult failed:", error);
				return null;
			}
		}
		/**
		* Install skill from URL - 从 URL 安装 Skill 包
		*/
		async installSkillFromUrl(params) {
			try {
				const result = await this.client.sessions.installSkillFromUrl(params);
				if (result.success) this.reportTelemetry("skill_create", {
					id: result.skillName || params.skillName || "unknown",
					channelType: params.channelType || "userSettings"
				});
				return result;
			} catch (error) {
				const errorMessage = error instanceof Error ? error.message : "Unknown error";
				console.error("[AgentNewAdapter] installSkillFromUrl failed:", error);
				return {
					success: false,
					errorKey: "installFromUrlFailed",
					errorMessage
				};
			}
		}
		/**
		* Toggle skill - 切换 Skill 启用/禁用状态
		*
		* @param params - 切换参数，包含 filePath 和 disable 状态
		* @returns 切换结果
		*/
		async toggleSkill(params) {
			try {
				return await this.client.sessions.toggleSkill(params);
			} catch (error) {
				const errorMessage = error instanceof Error ? error.message : "Unknown error";
				console.error("[AgentNewAdapter] toggleSkill failed:", error);
				return {
					success: false,
					error: errorMessage
				};
			}
		}
		/**
		* Delete skill - 删除已安装的 Skill
		*
		* @param params - 删除参数，包含 filePath 和 name
		* @returns 删除结果
		*/
		async deleteSkill(params) {
			try {
				return await this.client.sessions.deleteSkill(params);
			} catch (error) {
				const errorMessage = error instanceof Error ? error.message : "Unknown error";
				console.error("[AgentNewAdapter] deleteSkill failed:", error);
				return {
					success: false,
					error: errorMessage
				};
			}
		}
		/**
		* Get skill content - 获取 Skill 文件内容
		*
		* @param params - 包含 filePath 的参数
		* @returns Skill 文件内容
		*/
		async getSkillContent(params) {
			try {
				return await this.client.sessions.getSkillContent(params);
			} catch (error) {
				const errorMessage = error instanceof Error ? error.message : "Unknown error";
				console.error("[AgentNewAdapter] getSkillContent failed:", error);
				return {
					content: "",
					error: errorMessage
				};
			}
		}
		async initExpertCenter() {
			try {
				this.updateExpertLoadState({
					status: "loading",
					progress: 0,
					error: void 0
				});
				const result = await this.callExpertCenterRpc("expert-center/init");
				this.updateExpertLoadState(result?.loadState);
			} catch (error) {
				const errorMessage = error instanceof Error ? error.message : "Unknown error";
				this.updateExpertLoadState({
					status: "error",
					error: errorMessage
				});
				console.error("[AgentNewAdapter] initExpertCenter failed:", error);
				throw new Error(`Failed to initialize expert center: ${errorMessage}`);
			}
		}
		async getExpertCategories() {
			try {
				return (await this.callExpertCenterRpc("expert-center/categories"))?.categories ?? [];
			} catch (error) {
				console.error("[AgentNewAdapter] getExpertCategories failed:", error);
				return [];
			}
		}
		async getExperts(categoryId) {
			try {
				return (await this.callExpertCenterRpc("expert-center/experts", { categoryId }))?.experts ?? [];
			} catch (error) {
				console.error("[AgentNewAdapter] getExperts failed:", error);
				return [];
			}
		}
		async getExpert(expertId, locale = "zh", options) {
			try {
				this.updateExpertLoadState({
					status: "downloading_prompt",
					error: void 0
				});
				const result = await this.callExpertCenterRpc("expert-center/expert", {
					expertId,
					locale,
					...options?.marketExpertId ? { marketExpertId: options.marketExpertId } : {}
				});
				if (!result?.expert) throw new Error(`Expert not found: ${expertId}`);
				this.updateExpertLoadState(result.loadState ?? { status: "downloading_prompt_done" });
				if (locale === "en" ? result.expert.prompt?.en : result.expert.prompt?.zh ?? result.expert.prompt?.en) this.markExpertLoaded(expertId);
				return result.expert;
			} catch (error) {
				const errorMessage = error instanceof Error ? error.message : "Unknown error";
				this.updateExpertLoadState({
					status: "error",
					error: errorMessage
				});
				console.error("[AgentNewAdapter] getExpert failed:", error);
				throw new Error(`Failed to get expert "${expertId}": ${errorMessage}`);
			}
		}
		isExpertLoaded(expertId) {
			return this.expertLoadedCache.has(expertId);
		}
		getExpertLoadState() {
			return this.currentExpertLoadState;
		}
		onExpertLoadStateChange(callback) {
			this.expertLoadStateListeners.add(callback);
			try {
				callback(this.currentExpertLoadState);
			} catch (error) {
				console.error("[AgentNewAdapter] onExpertLoadStateChange initial callback failed:", error);
			}
			return () => {
				this.expertLoadStateListeners.delete(callback);
			};
		}
		async refreshExpertCenter(force = false) {
			try {
				if (force) this.expertLoadedCache.clear();
				this.updateExpertLoadState({
					status: "loading",
					progress: 0,
					error: void 0
				});
				const result = await this.callExpertCenterRpc("expert-center/refresh", { force });
				this.updateExpertLoadState(result?.loadState);
			} catch (error) {
				const errorMessage = error instanceof Error ? error.message : "Unknown error";
				this.updateExpertLoadState({
					status: "error",
					error: errorMessage
				});
				console.error("[AgentNewAdapter] refreshExpertCenter failed:", error);
				throw new Error(`Failed to refresh expert center: ${errorMessage}`);
			}
		}
		/**
		* 获取专家排行榜数据
		* 完全对齐 getCheckinStatus 的调用方式
		*
		* @param options.limit 期望返回的专家条数（服务端默认仅返回 100 条）
		*/
		async getExpertRanking(options) {
			if (!this.backendProvider?.getExpertRanking) {
				console.warn("[AgentNewAdapter] getExpertRanking not available on backendProvider");
				return {
					items: [],
					total: 0,
					updateTime: Date.now()
				};
			}
			try {
				return await this.backendProvider.getExpertRanking(options) ?? {
					items: [],
					total: 0,
					updateTime: Date.now()
				};
			} catch (error) {
				console.error("[AgentNewAdapter] getExpertRanking failed:", error);
				return {
					items: [],
					total: 0,
					updateTime: Date.now()
				};
			}
		}
		/**
		* 获取用户成长体系数据
		* 完全对齐 getExpertRanking 的调用方式
		*/
		async getGrowthBuddy() {
			if (!this.backendProvider?.getGrowthBuddy) {
				console.warn("[AgentNewAdapter] getGrowthBuddy not available on backendProvider");
				return null;
			}
			try {
				return await this.backendProvider.getGrowthBuddy();
			} catch (error) {
				console.error("[AgentNewAdapter] getGrowthBuddy failed:", error);
				return null;
			}
		}
		setSelectedExpert(expert) {
			const targetSessionId = this.currentActiveSessionId ?? AgentNewAdapter.PENDING_EXPERT_SESSION_KEY;
			if (expert) this.selectedExpertBySession.set(targetSessionId, expert);
			else this.selectedExpertBySession.delete(targetSessionId);
			this.notifySelectedExpertListeners();
		}
		getSelectedExpert() {
			const sessionId = this.currentActiveSessionId;
			if (sessionId) return this.selectedExpertBySession.get(sessionId) ?? null;
			return this.selectedExpertBySession.get(AgentNewAdapter.PENDING_EXPERT_SESSION_KEY) ?? null;
		}
		/**
		* 获取 pending 中的专家（仅用于新会话创建时绑定）
		*/
		getPendingExpert() {
			return this.selectedExpertBySession.get(AgentNewAdapter.PENDING_EXPERT_SESSION_KEY) ?? null;
		}
		/**
		* 设置 pending 中的专家（仅用于召唤专家场景）
		* 与 setSelectedExpert 不同，此方法始终写入 pending 状态，
		* 不管是否有 active session
		*/
		setPendingExpert(expert) {
			if (expert) this.selectedExpertBySession.set(AgentNewAdapter.PENDING_EXPERT_SESSION_KEY, expert);
			else this.selectedExpertBySession.delete(AgentNewAdapter.PENDING_EXPERT_SESSION_KEY);
			this.notifySelectedExpertListeners(void 0, expert);
		}
		clearSelectedExpert() {
			const sessionId = this.currentActiveSessionId;
			if (sessionId) this.selectedExpertBySession.delete(sessionId);
			this.selectedExpertBySession.delete(AgentNewAdapter.PENDING_EXPERT_SESSION_KEY);
			this.notifySelectedExpertListeners();
		}
		/**
		* 按 sessionId 设置 expert（推荐方式，避免跨 session 共享）
		*/
		setSelectedExpertForSession(sessionId, expert) {
			if (expert) {
				this.selectedExpertBySession.set(sessionId, expert);
				this.selectedExpertBySession.delete(AgentNewAdapter.PENDING_EXPERT_SESSION_KEY);
			} else this.selectedExpertBySession.delete(sessionId);
			this.notifySelectedExpertListeners(sessionId);
		}
		/**
		* 按 sessionId 获取 expert（推荐方式）
		*/
		getSelectedExpertForSession(sessionId) {
			return this.selectedExpertBySession.get(sessionId) ?? null;
		}
		/**
		* 清除指定 session 的 expert
		*/
		clearSelectedExpertForSession(sessionId) {
			this.selectedExpertBySession.delete(sessionId);
			this.notifySelectedExpertListeners();
		}
		/**
		* 订阅 selectedExpert 变化
		* @param callback 回调函数，接收 expert 和可选的 sessionId 参数
		*   - expert: 当前活跃会话的专家（如果有）
		*   - sessionId: 触发此次通知的会话 ID（可选，用于处理新会话绑定场景）
		* @returns 取消订阅函数
		*/
		onSelectedExpertChange(callback) {
			this.selectedExpertListeners.add(callback);
			return () => {
				this.selectedExpertListeners.delete(callback);
			};
		}
		/**
		* 通知所有专家变化监听器
		* @param triggerSessionId 可选，触发此次通知的会话 ID
		*   用于新会话绑定场景：React state 可能还没更新，但我们知道是哪个会话绑定了专家
		*/
		notifySelectedExpertListeners(triggerSessionId, expertOverride) {
			const expert = expertOverride ?? this.getSelectedExpert();
			for (const listener of this.selectedExpertListeners) try {
				listener(expert, triggerSessionId);
			} catch (error) {
				console.error("[AgentNewAdapter] Error in selectedExpert listener:", error);
			}
		}
		selectExpert(expert) {
			this.setSelectedExpert(expert);
		}
		summonExpert(expert) {
			this.setPendingExpert(expert);
		}
		/**
		* 获取指定 session 的工作区路径
		* @param sessionId 会话 ID
		* @returns 工作区路径，如果不存在则返回 undefined
		*/
		getWorkspacePathForSession(sessionId) {
			return this.sessionConfigs.get(sessionId)?.cwd || this.initialConfig.cwd || void 0;
		}
		/**
		* 解析共享最近专家历史的上下文
		* 保留 sessionId 入参仅用于推断工作区路径，实际历史数据始终写入当前用户共享列表
		*/
		getExpertHistoryContext(sessionId) {
			const normalizedSessionId = sessionId && sessionId !== AgentNewAdapter.SHARED_EXPERT_HISTORY_KEY ? sessionId : void 0;
			const context = {
				historyKey: AgentNewAdapter.SHARED_EXPERT_HISTORY_KEY,
				workspacePath: normalizedSessionId ? this.getWorkspacePathForSession(normalizedSessionId) : this.initialConfig.cwd || void 0
			};
			console.log("[EXPERT_HISTORY_TRACE][adapter.getExpertHistoryContext]", {
				inputSessionId: sessionId ?? null,
				normalizedSessionId: normalizedSessionId ?? null,
				historyKey: context.historyKey,
				workspacePath: context.workspacePath ?? null
			});
			return context;
		}
		/**
		* 获取当前用户共享的最近召唤专家列表
		* @param sessionId 会话 ID（仅用于兼容现有调用）
		* @returns 最近召唤的专家列表
		*/
		async getRecentExperts(sessionId) {
			try {
				const { historyKey, workspacePath } = this.getExpertHistoryContext(sessionId);
				console.log("[EXPERT_HISTORY_TRACE][adapter.getRecentExperts.request]", {
					inputSessionId: sessionId,
					historyKey,
					workspacePath: workspacePath ?? null
				});
				const result = await this.callExpertCenterRpc("expert-history/get-recent", {
					sessionId: historyKey,
					workspacePath
				});
				console.log("[EXPERT_HISTORY_TRACE][adapter.getRecentExperts.response]", {
					inputSessionId: sessionId,
					historyKey,
					count: result?.experts?.length ?? 0,
					expertIds: result?.experts?.map((expert) => expert.id) ?? []
				});
				return result?.experts ?? [];
			} catch (error) {
				console.error("[AgentNewAdapter] getRecentExperts failed:", error);
				return [];
			}
		}
		/**
		* 添加专家到当前用户共享的历史记录
		* @param sessionId 会话 ID（仅用于兼容现有调用）
		* @param expert 专家信息
		*/
		async addExpertToHistory(sessionId, expert) {
			try {
				const { historyKey, workspacePath } = this.getExpertHistoryContext(sessionId);
				console.log("[EXPERT_HISTORY_TRACE][adapter.addExpertToHistory.request]", {
					inputSessionId: sessionId,
					historyKey,
					workspacePath: workspacePath ?? null,
					expertId: expert.id,
					expertName: expert.name
				});
				await this.callExpertCenterRpc("expert-history/add", {
					sessionId: historyKey,
					expert,
					workspacePath
				});
				console.log("[EXPERT_HISTORY_TRACE][adapter.addExpertToHistory.saved]", {
					inputSessionId: sessionId,
					historyKey,
					expertId: expert.id
				});
			} catch (error) {
				console.error("[AgentNewAdapter] addExpertToHistory failed:", error);
			}
		}
		/**
		* 从当前用户共享历史中移除某个专家
		* @param sessionId 会话 ID（仅用于兼容现有调用）
		* @param expertId 专家 ID
		*/
		async removeExpertFromHistory(sessionId, expertId) {
			try {
				const { historyKey, workspacePath } = this.getExpertHistoryContext(sessionId);
				await this.callExpertCenterRpc("expert-history/remove", {
					sessionId: historyKey,
					expertId,
					workspacePath
				});
			} catch (error) {
				console.error("[AgentNewAdapter] removeExpertFromHistory failed:", error);
			}
		}
		/**
		* 清除当前用户共享历史记录
		* @param sessionId 会话 ID（仅用于兼容现有调用）
		*/
		async clearExpertHistory(sessionId) {
			try {
				const { historyKey, workspacePath } = this.getExpertHistoryContext(sessionId);
				await this.callExpertCenterRpc("expert-history/clear", {
					sessionId: historyKey,
					workspacePath
				});
			} catch (error) {
				console.error("[AgentNewAdapter] clearExpertHistory failed:", error);
			}
		}
		/**
		* 获取灵感卡片列表
		* @param query 查询参数（分页、过滤等）
		* @returns 灵感卡片列表结果
		*/
		async listInspirations(query) {
			try {
				return await this.callExpertCenterRpc("backend:inspiration-list", query) ?? {
					cards: [],
					total: 0,
					hasMore: false
				};
			} catch (error) {
				console.error("[AgentNewAdapter] listInspirations failed:", error);
				return {
					cards: [],
					total: 0,
					hasMore: false
				};
			}
		}
		/**
		* 直接通过文件路径读取文件内容，返回 base64 字符串
		* 不依赖 sessionId，适用于新建会话场景（如上传图片到输入框）
		*/
		async readFileByPath(filePath) {
			if (!this.channel) return {
				success: false,
				error: "channel unavailable"
			};
			try {
				return (await this.channel.callMethod("__backend__", {
					type: "backend",
					requestId: `read-file-${Date.now()}-${Math.random().toString(36).slice(2)}`,
					params: {
						type: "backend:read-file-by-path",
						params: { path: filePath }
					}
				}, 1e4))?.data ?? {
					success: false,
					error: "empty response"
				};
			} catch (error) {
				const msg = error instanceof Error ? error.message : String(error);
				console.error("[AgentNewAdapter] readFileByPath failed:", msg);
				return {
					success: false,
					error: msg
				};
			}
		}
		/**
		* 读取指定目录下的文件列表，不依赖 sessionId
		* 适用于读取本地 pwd 目录下的文件列表
		*/
		async readDirByPath(dirPath, depth) {
			if (!this.channel) return {
				success: false,
				error: "channel unavailable"
			};
			try {
				return (await this.channel.callMethod("__backend__", {
					type: "backend",
					requestId: `read-dir-${Date.now()}-${Math.random().toString(36).slice(2)}`,
					params: {
						type: "backend:read-dir-by-path",
						params: {
							path: dirPath,
							depth
						}
					}
				}, 15e3))?.data ?? {
					success: false,
					error: "empty response"
				};
			} catch (error) {
				const msg = error instanceof Error ? error.message : String(error);
				console.error("[AgentNewAdapter] readDirByPath failed:", msg);
				return {
					success: false,
					error: msg
				};
			}
		}
		/**
		* Get inspiration card detail (lazy-load detail/actions/sources)
		*/
		async getInspirationCard(params) {
			try {
				return await this.callExpertCenterRpc("backend:inspiration-detail", params);
			} catch (error) {
				console.error("[AgentNewAdapter] getInspirationCard failed:", error);
				return null;
			}
		}
		async getInspirationSettings() {
			try {
				return await this.callExpertCenterRpc("backend:inspiration-settings-get", {});
			} catch (error) {
				console.error("[AgentNewAdapter] getInspirationSettings failed:", error);
				return null;
			}
		}
		async saveInspirationSettings(config) {
			try {
				return await this.callExpertCenterRpc("backend:inspiration-settings-save", config);
			} catch (error) {
				console.error("[AgentNewAdapter] saveInspirationSettings failed:", error);
				return {
					success: false,
					error: String(error)
				};
			}
		}
		async checkInspirationOnboarding() {
			try {
				return await this.callExpertCenterRpc("backend:inspiration-onboarding-check", {});
			} catch (error) {
				console.error("[AgentNewAdapter] checkInspirationOnboarding failed:", error);
				return { completed: false };
			}
		}
		async completeInspirationOnboarding() {
			try {
				return await this.callExpertCenterRpc("backend:inspiration-onboarding-complete", {});
			} catch (error) {
				console.error("[AgentNewAdapter] completeInspirationOnboarding failed:", error);
				return {
					success: false,
					error: String(error)
				};
			}
		}
		/**
		* 注入 demo 灵感卡片（首次引导完成后调用）
		*/
		async injectDemoInspirationCards() {
			try {
				return await this.callExpertCenterRpc("backend:inspiration-inject-demo", {});
			} catch (error) {
				console.error("[AgentNewAdapter] injectDemoInspirationCards failed:", error);
				return {
					success: false,
					error: String(error)
				};
			}
		}
		async submitInspirationFeedback(feedback) {
			try {
				return await this.callExpertCenterRpc("backend:inspiration-feedback", feedback);
			} catch (error) {
				console.error("[AgentNewAdapter] submitInspirationFeedback failed:", error);
				return {
					success: false,
					error: String(error)
				};
			}
		}
		async markInspirationRead(params) {
			try {
				return await this.callExpertCenterRpc("backend:inspiration-mark-read", params);
			} catch (error) {
				console.error("[AgentNewAdapter] markInspirationRead failed:", error);
				return {
					success: false,
					error: String(error)
				};
			}
		}
		async recordInspirationTabView() {
			try {
				return await this.callExpertCenterRpc("backend:inspiration-record-tab-view", {});
			} catch (error) {
				console.error("[AgentNewAdapter] recordInspirationTabView failed:", error);
				return {
					success: false,
					error: String(error)
				};
			}
		}
		async markAllInspirationRead(params) {
			try {
				return await this.callExpertCenterRpc("backend:inspiration-mark-all-read", params ?? {});
			} catch (error) {
				console.error("[AgentNewAdapter] markAllInspirationRead failed:", error);
				return {
					success: false,
					error: String(error)
				};
			}
		}
		async saveInspirationCard(params) {
			try {
				return await this.callExpertCenterRpc("backend:inspiration-save", params);
			} catch (error) {
				console.error("[AgentNewAdapter] saveInspirationCard failed:", error);
				return {
					success: false,
					error: String(error)
				};
			}
		}
		async listCurationDirectives() {
			try {
				return await this.callExpertCenterRpc("backend:inspiration-curation-list", {});
			} catch (error) {
				console.error("[AgentNewAdapter] listCurationDirectives failed:", error);
				return [];
			}
		}
		async addCurationDirective(params) {
			try {
				return await this.callExpertCenterRpc("backend:inspiration-curation-add", params);
			} catch (error) {
				console.error("[AgentNewAdapter] addCurationDirective failed:", error);
				return null;
			}
		}
		async updateCurationDirective(params) {
			try {
				return await this.callExpertCenterRpc("backend:inspiration-curation-update", params);
			} catch (error) {
				console.error("[AgentNewAdapter] updateCurationDirective failed:", error);
				return {
					success: false,
					error: String(error)
				};
			}
		}
		async deleteCurationDirective(params) {
			try {
				return await this.callExpertCenterRpc("backend:inspiration-curation-delete", params);
			} catch (error) {
				console.error("[AgentNewAdapter] deleteCurationDirective failed:", error);
				return {
					success: false,
					error: String(error)
				};
			}
		}
		/**
		* Get marketplace skill content - 获取市场 Skill 内容
		*
		* @param params 包含 skillName 的参数
		* @returns Skill 文件内容
		*/
		async getMarketplaceSkillContent(params) {
			try {
				return await this.client.sessions.getMarketplaceSkillContent(params);
			} catch (error) {
				const errorMessage = error instanceof Error ? error.message : "Unknown error";
				console.error("[AgentNewAdapter] getMarketplaceSkillContent failed:", error);
				return {
					content: "",
					error: errorMessage
				};
			}
		}
		/**
		* Install marketplace skill - 安装市场 Skill 到用户目录
		*
		* @param params 包含 skillName 的参数
		* @returns 安装结果
		*/
		async installMarketplaceSkill(params) {
			try {
				return await this.client.sessions.installMarketplaceSkill(params);
			} catch (error) {
				const errorMessage = error instanceof Error ? error.message : "Unknown error";
				console.error("[AgentNewAdapter] installMarketplaceSkill failed:", error);
				return {
					success: false,
					skillName: params.skillName,
					errorMessage
				};
			}
		}
		/**
		* Batch toggle plugins - 批量切换插件状态
		*
		* 调用链：
		* AgentNewAdapter.batchTogglePlugins()
		*   -> AgentClient.sessions.batchTogglePlugins()
		*   -> LocalAgentProvider.batchTogglePlugins()
		*   -> BackendService.batchTogglePlugins()
		*   -> ipcRenderer.invoke('codebuddy:batchTogglePlugins')
		*   -> Main Process -> Extension Host -> PluginService
		*
		* @param request - 批量插件操作请求
		* @returns 批量操作结果
		*/
		async batchTogglePlugins(request) {
			try {
				return await this.client.sessions.batchTogglePlugins(request);
			} catch (error) {
				const errorMessage = error instanceof Error ? error.message : "Unknown error";
				const isUnsupportedError = errorMessage.includes("does not support") || errorMessage.includes("not supported") || errorMessage.includes("not available");
				console.error("🐸[AgentNewAdapter] batchTogglePlugins failed:", {
					error,
					errorMessage,
					isUnsupportedError
				});
				return {
					success: false,
					succeededPlugins: [],
					failedPlugins: request.items.map((item) => ({
						...item,
						error: isUnsupportedError ? "Plugin batch toggle is only supported in local environment" : errorMessage
					}))
				};
			}
		}
		/**
		* 获取模板场景列表（IDE/Local 环境）
		* 通过 ACP 协议从产品配置中获取场景模板数据
		*
		* 调用链：
		* 1. useTemplates hook 调用 adapter.getTemplates()
		* 2. AgentNewAdapter.getTemplates() 调用 client.sessions.getProductScenes()
		* 3. LocalAgentProvider → channel.callMethod('__backend__') → BackendService
		* 4. BackendService → ipcRenderer.invoke('codebuddy:getProductScenes') → Main Process
		* 5. Main Process → fs.readFile(scenes.json) → 返回 SupportScene[]
		* 6. useTemplates 将数据提供给 QuickActions 组件展示
		*
		* 注意：Web 环境使用 CloudAgentAdapter，通过 backendProvider 直接调用 API
		*
		* @param locale - 可选，语言环境（如 'zh-CN', 'en-US'），用于获取对应语言的场景数据
		*/
		async getTemplates(locale) {
			try {
				if (this.client.sessions.getProductScenes) {
					const scenes = await this.client.sessions.getProductScenes(locale);
					if (scenes && scenes.length > 0) return scenes.filter((scene) => scene.prompts && scene.prompts.length > 0).filter((scene) => !scene.target || scene.target === "all" || scene.target === "local");
				}
				return [];
			} catch (error) {
				console.error("[AgentNewAdapter] getTemplates failed:", error);
				return [];
			}
		}
		/**
		* 获取已安装插件列表
		* Local 环境通过 IPC 调用 IDE 端的插件管理服务
		*/
		async getInstalledPlugins(forceRefresh) {
			try {
				if (this.client.sessions.getInstalledPlugins) return await this.client.sessions.getInstalledPlugins(forceRefresh) ?? [];
				return [];
			} catch (error) {
				console.error("[AgentNewAdapter] getInstalledPlugins failed:", error);
				return [];
			}
		}
		/**
		* 安装插件
		* Local 环境通过 IPC 调用 IDE 端的插件管理服务
		* @param pluginNames 插件名称数组
		* @param marketplaceName 插件市场名称
		* @param installScope 安装范围
		* @param marketplaceSource 市场源地址（当市场不存在时用于自动添加市场）
		*/
		async installPlugins(pluginNames, marketplaceName, installScope, marketplaceSource, workspacePath) {
			try {
				if (this.client.sessions.installPlugins) return await this.client.sessions.installPlugins(pluginNames, marketplaceName, installScope, marketplaceSource, workspacePath);
				return {
					success: false,
					error: "installPlugins not supported by provider"
				};
			} catch (error) {
				console.error("[AgentNewAdapter] installPlugins failed:", error);
				return {
					success: false,
					error: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		/**
		* 卸载插件
		* Local 环境通过 IPC 调用 IDE 端的插件管理服务
		*
		* 调用链：
		* AgentNewAdapter.uninstallPlugin()
		*   -> AgentClient.sessions.uninstallPlugin()
		*   -> LocalAgentProvider.uninstallPlugin()
		*   -> AcpJsonRpcClient.uninstallPlugin()
		*   -> Extension Host -> PluginService.uninstallPlugin()
		*
		* @param pluginName 插件名称
		* @param marketplaceName 插件市场名称
		* @param scope 卸载范围
		* @returns 卸载结果
		*/
		async uninstallPlugin(pluginName, marketplaceName, scope) {
			console.log("🐸[AgentNewAdapter] uninstallPlugin", {
				pluginName,
				marketplaceName,
				scope
			});
			try {
				if (this.client.sessions.uninstallPlugin) {
					const result = await this.client.sessions.uninstallPlugin(pluginName, marketplaceName, scope);
					console.log("🐸[AgentNewAdapter] uninstallPlugin result:", result);
					return result;
				}
				return {
					success: false,
					error: "uninstallPlugin not supported by provider"
				};
			} catch (error) {
				console.error("[AgentNewAdapter] uninstallPlugin failed:", error);
				return {
					success: false,
					error: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		/**
		* 更新插件到最新版本
		* Local 环境通过 IPC 调用 IDE 端的插件管理服务
		*
		* 调用链：
		* AgentNewAdapter.updatePlugin()
		*   -> AgentClient.sessions.updatePlugin()
		*   -> LocalAgentProvider.updatePlugin()
		*   -> AcpJsonRpcClient.updatePlugin()
		*   -> Extension Host -> PluginService.updatePlugin()
		*
		* @param pluginName 插件名称
		* @param marketplaceName 插件市场名称
		* @returns 更新结果
		*/
		async updatePlugin(pluginName, marketplaceName) {
			console.log("🐸[AgentNewAdapter] updatePlugin", {
				pluginName,
				marketplaceName
			});
			try {
				if (this.client.sessions.updatePlugin) {
					const result = await this.client.sessions.updatePlugin(pluginName, marketplaceName);
					console.log("🐸[AgentNewAdapter] updatePlugin result:", result);
					return result;
				}
				return {
					success: false,
					error: "updatePlugin not supported by provider"
				};
			} catch (error) {
				console.error("[AgentNewAdapter] updatePlugin failed:", error);
				return {
					success: false,
					error: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		/**
		* 获取插件市场列表
		* 用于获取所有可用的插件市场
		*
		* 调用链：
		* AgentNewAdapter.getPluginMarketplaces()
		*   -> AgentClient.sessions.getPluginMarketplaces()
		*   -> LocalAgentProvider.getPluginMarketplaces()
		*   -> AcpJsonRpcClient.getPluginMarketplaces()
		*   -> Extension Host -> PluginService.getPluginMarketplaces()
		*
		* @param forceRefresh 是否强制刷新缓存
		* @returns 插件市场列表
		*/
		async getPluginMarketplaces(forceRefresh) {
			console.log("🐸[AgentNewAdapter] getPluginMarketplaces", { forceRefresh });
			try {
				if (this.client.sessions.getPluginMarketplaces) {
					const result = await this.client.sessions.getPluginMarketplaces(forceRefresh);
					console.log("🐸[AgentNewAdapter] getPluginMarketplaces result:", result);
					return result;
				}
				return [];
			} catch (error) {
				console.error("[AgentNewAdapter] getPluginMarketplaces failed:", error);
				return [];
			}
		}
		/**
		* 获取市场下的插件列表
		* 用于浏览某个市场中的所有插件
		*
		* 调用链：
		* AgentNewAdapter.getMarketplacePlugins()
		*   -> AgentClient.sessions.getMarketplacePlugins()
		*   -> LocalAgentProvider.getMarketplacePlugins()
		*   -> AcpJsonRpcClient.getMarketplacePlugins()
		*   -> Extension Host -> PluginService.getMarketplacePlugins()
		*
		* @param marketplaceName 市场名称
		* @param forceRefresh 是否强制刷新缓存
		* @param searchText 搜索关键词
		* @returns 插件列表
		*/
		async getMarketplacePlugins(marketplaceName, forceRefresh, searchText) {
			console.log("🐸[AgentNewAdapter] getMarketplacePlugins", {
				marketplaceName,
				forceRefresh,
				searchText
			});
			try {
				if (this.client.sessions.getMarketplacePlugins) {
					const result = await this.client.sessions.getMarketplacePlugins(marketplaceName, forceRefresh, searchText);
					console.log("🐸[AgentNewAdapter] getMarketplacePlugins result:", result?.length);
					return result;
				}
				return [];
			} catch (error) {
				console.error("[AgentNewAdapter] getMarketplacePlugins failed:", error);
				return [];
			}
		}
		/**
		* 获取插件详情
		* 用于查看插件的详细信息
		*
		* 调用链：
		* AgentNewAdapter.getPluginDetail()
		*   -> AgentClient.sessions.getPluginDetail()
		*   -> LocalAgentProvider.getPluginDetail()
		*   -> AcpJsonRpcClient.getPluginDetail()
		*   -> Extension Host -> PluginService.getPluginDetail()
		*
		* @param pluginName 插件名称
		* @param marketplaceName 市场名称
		* @returns 插件详情
		*/
		async getPluginDetail(pluginName, marketplaceName) {
			console.log("🐸[AgentNewAdapter] getPluginDetail", {
				pluginName,
				marketplaceName
			});
			try {
				if (this.client.sessions.getPluginDetail) {
					const result = await this.client.sessions.getPluginDetail(pluginName, marketplaceName);
					console.log("🐸[AgentNewAdapter] getPluginDetail result:", result);
					return result;
				}
				return null;
			} catch (error) {
				console.error("[AgentNewAdapter] getPluginDetail failed:", error);
				return null;
			}
		}
		/**
		* 添加插件市场
		* 用于添加新的第三方插件市场
		*
		* 调用链：
		* AgentNewAdapter.addPluginMarketplace()
		*   -> AgentClient.sessions.addPluginMarketplace()
		*   -> LocalAgentProvider.addPluginMarketplace()
		*   -> AcpJsonRpcClient.addPluginMarketplace()
		*   -> Extension Host -> PluginService.addPluginMarketplace()
		*
		* @param source 市场源 URL 或 GitHub repo
		* @param name 市场名称（可选）
		* @returns 添加结果
		*/
		async addPluginMarketplace(source, name) {
			console.log("🐸[AgentNewAdapter] addPluginMarketplace", {
				source,
				name
			});
			try {
				if (this.client.sessions.addPluginMarketplace) {
					const result = await this.client.sessions.addPluginMarketplace(source, name);
					console.log("🐸[AgentNewAdapter] addPluginMarketplace result:", result);
					return result;
				}
				return {
					success: false,
					error: "addPluginMarketplace not supported by provider"
				};
			} catch (error) {
				console.error("[AgentNewAdapter] addPluginMarketplace failed:", error);
				return {
					success: false,
					error: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		/**
		* 删除插件市场
		* 用于移除已添加的插件市场
		*
		* 调用链：
		* AgentNewAdapter.removePluginMarketplace()
		*   -> AgentClient.sessions.removePluginMarketplace()
		*   -> LocalAgentProvider.removePluginMarketplace()
		*   -> AcpJsonRpcClient.removePluginMarketplace()
		*   -> Extension Host -> PluginService.removePluginMarketplace()
		*
		* @param marketplaceName 市场名称
		* @returns 删除结果
		*/
		async removePluginMarketplace(marketplaceName) {
			console.log("🐸[AgentNewAdapter] removePluginMarketplace", { marketplaceName });
			try {
				if (this.client.sessions.removePluginMarketplace) {
					const result = await this.client.sessions.removePluginMarketplace(marketplaceName);
					console.log("🐸[AgentNewAdapter] removePluginMarketplace result:", result);
					return result;
				}
				return {
					success: false,
					error: "removePluginMarketplace not supported by provider"
				};
			} catch (error) {
				console.error("[AgentNewAdapter] removePluginMarketplace failed:", error);
				return {
					success: false,
					error: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		/**
		* 刷新插件市场
		* 用于更新市场的插件列表
		*
		* 调用链：
		* AgentNewAdapter.refreshPluginMarketplace()
		*   -> AgentClient.sessions.refreshPluginMarketplace()
		*   -> LocalAgentProvider.refreshPluginMarketplace()
		*   -> AcpJsonRpcClient.refreshPluginMarketplace()
		*   -> Extension Host -> PluginService.refreshPluginMarketplace()
		*
		* @param marketplaceName 市场名称
		* @returns 刷新结果
		*/
		async refreshPluginMarketplace(marketplaceName) {
			console.log("🐸[AgentNewAdapter] refreshPluginMarketplace", { marketplaceName });
			try {
				if (this.client.sessions.refreshPluginMarketplace) {
					const result = await this.client.sessions.refreshPluginMarketplace(marketplaceName);
					console.log("🐸[AgentNewAdapter] refreshPluginMarketplace result:", result);
					return result;
				}
				return {
					success: false,
					error: "refreshPluginMarketplace not supported by provider"
				};
			} catch (error) {
				console.error("[AgentNewAdapter] refreshPluginMarketplace failed:", error);
				return {
					success: false,
					error: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		/**
		* 用新窗口打开文件夹
		*
		* 调用链：
		* AgentNewAdapter.openFolderInNewWindow()
		*   -> AgentClient.sessions.openFolderInNewWindow()
		*   -> LocalAgentProvider.openFolderInNewWindow()
		*   -> AcpJsonRpcClient.openFolderInNewWindow()
		*   -> Extension Host -> PluginService.openFolderInNewWindow()
		*
		* @param folderPath 文件夹路径
		*/
		async openFolderInNewWindow(folderPath) {
			console.log("🐸[AgentNewAdapter] openFolderInNewWindow", { folderPath });
			try {
				if (this.client.sessions.openFolderInNewWindow) {
					await this.client.sessions.openFolderInNewWindow(folderPath);
					console.log("🐸[AgentNewAdapter] openFolderInNewWindow success");
				} else throw new Error("openFolderInNewWindow not supported by provider");
			} catch (error) {
				console.error("[AgentNewAdapter] openFolderInNewWindow failed:", error);
				throw error;
			}
		}
		/**
		* 在系统文件管理器中打开目录
		*
		* @param folderPath 文件夹路径
		*/
		async openFolder(folderPath) {
			console.log("🐸[AgentNewAdapter] openFolder", { folderPath });
			try {
				if (this.client.sessions.openFolder) {
					const result = await this.client.sessions.openFolder(folderPath);
					console.log("🐸[AgentNewAdapter] openFolder success");
					if (!result) toast({
						message: t("contextMenu.openFolder.failed"),
						type: "warning"
					});
					return result;
				} else throw new Error("openFolder not supported by provider");
			} catch (error) {
				console.error("[AgentNewAdapter] openFolder failed:", error);
				toast({
					message: t("contextMenu.openFolder.failed"),
					type: "warning"
				});
				throw error;
			}
		}
		/**
		* 检查路径是否存在
		*
		* @param path 要检查的路径
		* @returns 路径是否存在
		*/
		async checkPathExists(path) {
			try {
				if (this.client.sessions.checkPathExists) return await this.client.sessions.checkPathExists(path);
				else {
					console.warn("[AgentNewAdapter] checkPathExists not supported by provider");
					return true;
				}
			} catch (error) {
				console.error("[AgentNewAdapter] checkPathExists failed:", error);
				return true;
			}
		}
		async checkPathsExist(paths) {
			if (paths.length === 0) return {};
			try {
				if (this.client.sessions.checkPathsExist) return await this.client.sessions.checkPathsExist(paths);
			} catch (error) {
				console.error("[AgentNewAdapter] checkPathsExist failed:", error);
			}
			const entries = await Promise.all(paths.map(async (path) => [path, await this.checkPathExists(path)]));
			return Object.fromEntries(entries);
		}
		/**
		* 响应 MCP Sampling 确认请求
		* 将用户的决策发送到后端
		*
		* 调用链：
		* AgentNewAdapter.respondToSampling()
		*   -> AgentClient.sessions.respondToSampling()
		*   -> LocalAgentProvider.respondToSampling()
		*   -> AcpJsonRpcClient.sendRequest('respondToSampling', response)
		*   -> Extension Host -> McpSamplingDispatcher.respondToConfirmRequest()
		*
		* @param sessionId 会话 ID
		* @param response Sampling 确认响应
		*/
		async respondToSampling(sessionId, response) {
			await this.client.sessions.respondToSampling?.(sessionId, response);
		}
		/**
		* 响应 MCP Roots 确认请求
		* 将用户的决策发送到后端
		*
		* 调用链：
		* AgentNewAdapter.respondToRoots()
		*   -> AgentClient.sessions.respondToRoots()
		*   -> LocalAgentProvider.respondToRoots()
		*   -> AcpJsonRpcClient.sendRequest('respondToRoots', response)
		*   -> Extension Host -> McpRootsDispatcher.respondToConfirmRequest()
		*
		* @param sessionId 会话 ID
		* @param response Roots 确认响应
		*/
		async respondToRoots(sessionId, response) {
			await this.client.sessions.respondToRoots?.(sessionId, response);
		}
		/**
		* 订阅 MCP Sampling 确认请求
		* 当 MCP 服务器发起 Sampling 请求时触发回调
		*
		* 调用链：
		* AgentNewAdapter.subscribeSamplingRequests()
		*   -> AgentClient.sessions.subscribeSamplingRequests()
		*   -> LocalAgentProvider.subscribeSamplingRequests()
		*   -> 监听 channel 'mcp-sampling-confirm-request' 事件
		*
		* @param serverName MCP 服务器名称
		* @param callback 请求回调
		* @returns 取消订阅函数
		*/
		subscribeSamplingRequests(serverName, callback) {
			return this.client.sessions.subscribeSamplingRequests?.(serverName, callback) ?? (() => {});
		}
		/**
		* 订阅 MCP Roots 确认请求
		* 当 MCP 服务器发起 Roots 请求时触发回调
		*
		* 调用链：
		* AgentNewAdapter.subscribeRootsRequests()
		*   -> AgentClient.sessions.subscribeRootsRequests()
		*   -> LocalAgentProvider.subscribeRootsRequests()
		*   -> 监听 channel 'mcp-roots-confirm-request' 事件
		*
		* @param serverName MCP 服务器名称
		* @param callback 请求回调
		* @returns 取消订阅函数
		*/
		subscribeRootsRequests(serverName, callback) {
			return this.client.sessions.subscribeRootsRequests?.(serverName, callback) ?? (() => {});
		}
		/**
		* 订阅 MCP 服务器变化事件
		* 当服务器状态、错误信息或认证状态发生变化时触发回调
		*
		* 事件链路：
		* McpServerService (token patrol / connect / disconnect)
		*   -> AcpConnection.mcpServersChangedNotification()
		*   -> extNotification '_codebuddy.ai/mcp_servers_changed'
		*   -> LocalAgentProvider.channel.emit('mcpServersChanged')
		*   -> AgentClient.sessions.on('mcpServersChanged')
		*   -> AgentNewAdapter.mcpServerChangeCallbacks
		*
		* @param callback 回调函数，接收更新后的服务器列表
		* @returns 取消订阅函数
		*/
		onMcpServerChange(callback) {
			this.mcpServerChangeCallbacks.add(callback);
			return () => {
				this.mcpServerChangeCallbacks.delete(callback);
			};
		}
		/**
		* 获取 MCP 服务器列表
		*
		* 调用链：
		* AgentNewAdapter.getMcpServers()
		*   -> AgentClient.sessions.getMcpServers()
		*   -> LocalAgentProvider.getMcpServers()
		*   -> AcpJsonRpcClient.sendRequest('getMcpServers')
		*   -> Extension Host -> McpServerService.getServers()
		*
		* @returns MCP 服务器列表
		*/
		async getMcpServers() {
			console.log("[AgentNewAdapter] getMcpServers");
			try {
				if (this.client.sessions.getMcpServers) {
					const servers = await this.client.sessions.getMcpServers();
					console.log("[AgentNewAdapter] getMcpServers result:", servers?.length ?? 0, "servers");
					return servers ?? [];
				}
				console.warn("[AgentNewAdapter] getMcpServers not supported by provider");
				return [];
			} catch (error) {
				console.error("[AgentNewAdapter] getMcpServers failed:", error);
				return [];
			}
		}
		/**
		* 切换 MCP 服务器启用/禁用状态
		*
		* 调用链：
		* AgentNewAdapter.toggleMcpServer()
		*   -> AgentClient.sessions.toggleMcpServer()
		*   -> LocalAgentProvider.toggleMcpServer()
		*   -> AcpJsonRpcClient.sendRequest('toggleMcpServer', { serverName, enabled })
		*   -> Extension Host -> McpServerService.toggleServer()
		*
		* @param serverName 服务器名称
		* @param enabled 是否启用
		*/
		async toggleMcpServer(serverName, enabled) {
			console.log("[AgentNewAdapter] toggleMcpServer", {
				serverName,
				enabled
			});
			try {
				if (this.client.sessions.toggleMcpServer) {
					await this.client.sessions.toggleMcpServer(serverName, enabled);
					console.log("[AgentNewAdapter] toggleMcpServer success");
				} else throw new Error("toggleMcpServer not supported by provider");
			} catch (error) {
				console.error("[AgentNewAdapter] toggleMcpServer failed:", error);
				throw error;
			}
		}
		/**
		* 重新连接 MCP 服务器
		*
		* 调用链：
		* AgentNewAdapter.reconnectMcpServer()
		*   -> AgentClient.sessions.reconnectMcpServer()
		*   -> LocalAgentProvider.reconnectMcpServer()
		*   -> AcpJsonRpcClient.sendRequest('reconnectMcpServer', { serverName, forceHttpCallback })
		*   -> Extension Host -> McpConnectManager.reconnect()
		*
		* @param serverName 服务器名称
		* @param forceHttpCallback 是否强制使用 HTTP 回调（忽略 mcpSchemaUrl 配置）
		*/
		async reconnectMcpServer(serverName, forceHttpCallback) {
			console.log("[AgentNewAdapter] reconnectMcpServer", {
				serverName,
				forceHttpCallback
			});
			try {
				if (this.client.sessions.reconnectMcpServer) {
					await this.client.sessions.reconnectMcpServer(serverName, forceHttpCallback);
					console.log("[AgentNewAdapter] reconnectMcpServer success");
				} else throw new Error("reconnectMcpServer not supported by provider");
			} catch (error) {
				console.error("[AgentNewAdapter] reconnectMcpServer failed:", error);
				throw error;
			}
		}
		/**
		* 删除 MCP 服务器
		*
		* 调用链：
		* AgentNewAdapter.deleteMcpServer()
		*   -> AgentClient.sessions.deleteMcpServer()
		*   -> LocalAgentProvider.deleteMcpServer()
		*   -> AcpJsonRpcClient.sendRequest('deleteMcpServer', { serverName })
		*   -> Extension Host -> McpServerService.deleteServer()
		*
		* @param serverName 服务器名称
		*/
		async deleteMcpServer(serverName) {
			console.log("[AgentNewAdapter] deleteMcpServer", { serverName });
			try {
				if (this.client.sessions.deleteMcpServer) {
					await this.client.sessions.deleteMcpServer(serverName);
					console.log("[AgentNewAdapter] deleteMcpServer success");
				} else throw new Error("deleteMcpServer not supported by provider");
			} catch (error) {
				console.error("[AgentNewAdapter] deleteMcpServer failed:", error);
				throw error;
			}
		}
		/**
		* 切换单个 MCP Tool 的启用/禁用状态
		*
		* 调用链：
		* AgentNewAdapter.toggleToolStatus()
		*   -> AgentClient.sessions.toggleToolStatus()
		*   -> LocalAgentProvider.toggleToolStatus()
		*   -> AcpJsonRpcClient.sendRequest('toggleToolStatus')
		*   -> AcpConnection handler
		*   -> AcpAgent.toggleToolStatus()
		*   -> McpToolDisableService.toggleTool()
		*/
		async toggleToolStatus(serverName, toolName) {
			if (this.client.sessions.toggleToolStatus) await this.client.sessions.toggleToolStatus(serverName, toolName);
			else throw new Error("toggleToolStatus not supported by provider");
		}
		/**
		* 打开 MCP 配置文件
		*
		* 调用链：
		* AgentNewAdapter.openMcpConfig()
		*   -> AgentClient.sessions.openMcpConfig()
		*   -> LocalAgentProvider.openMcpConfig()
		*   -> AcpJsonRpcClient.sendRequest('openMcpConfig')
		*   -> Extension Host -> 打开 MCP 配置文件
		*/
		async openMcpConfig() {
			console.log("[AgentNewAdapter] openMcpConfig");
			try {
				if (this.client.sessions.openMcpConfig) {
					await this.client.sessions.openMcpConfig();
					console.log("[AgentNewAdapter] openMcpConfig success");
				} else throw new Error("openMcpConfig not supported by provider");
			} catch (error) {
				console.error("[AgentNewAdapter] openMcpConfig failed:", error);
				throw error;
			}
		}
		/**
		* 获取 MCP 配置文件内容
		*
		* 调用链：
		* AgentNewAdapter.getMcpConfigContent()
		*   -> AgentClient.sessions.getMcpConfigContent()
		*   -> LocalAgentProvider.getMcpConfigContent()
		*   -> AcpJsonRpcClient.sendRequest('getMcpConfigContent')
		*   -> Extension Host -> PluginService.getMcpConfigContent()
		*/
		async getMcpConfigContent() {
			console.log("[AgentNewAdapter] getMcpConfigContent");
			try {
				if (this.client.sessions.getMcpConfigContent) {
					const result = await this.client.sessions.getMcpConfigContent();
					console.log("[AgentNewAdapter] getMcpConfigContent success:", result.filePath);
					return result;
				} else throw new Error("getMcpConfigContent not supported by provider");
			} catch (error) {
				console.error("[AgentNewAdapter] getMcpConfigContent failed:", error);
				throw error;
			}
		}
		/**
		* 保存 MCP 配置文件内容
		*
		* 调用链：
		* AgentNewAdapter.saveMcpConfigContent()
		*   -> AgentClient.sessions.saveMcpConfigContent()
		*   -> LocalAgentProvider.saveMcpConfigContent()
		*   -> AcpJsonRpcClient.sendRequest('saveMcpConfigContent')
		*   -> Extension Host -> PluginService.saveMcpConfigContent()
		*/
		async saveMcpConfigContent(content) {
			console.log("[AgentNewAdapter] saveMcpConfigContent");
			try {
				if (this.client.sessions.saveMcpConfigContent) {
					await this.client.sessions.saveMcpConfigContent(content);
					console.log("[AgentNewAdapter] saveMcpConfigContent success");
				} else throw new Error("saveMcpConfigContent not supported by provider");
			} catch (error) {
				console.error("[AgentNewAdapter] saveMcpConfigContent failed:", error);
				throw error;
			}
		}
		/**
		* 读取系统剪贴板文本
		*
		* 调用链：
		* AgentNewAdapter.clipboardReadText()
		*   -> AgentClient.sessions.clipboardReadText()
		*   -> LocalAgentProvider.clipboardReadText()
		*   -> AcpJsonRpcClient.sendRequest('clipboardReadText')
		*   -> Extension Host -> PluginService.clipboardReadText()
		*   -> vscode.env.clipboard.readText()
		*/
		async clipboardReadText() {
			console.log("[AgentNewAdapter] clipboardReadText");
			try {
				if (this.client.sessions.clipboardReadText) {
					const text = await this.client.sessions.clipboardReadText();
					console.log("[AgentNewAdapter] clipboardReadText success");
					return text;
				} else {
					console.warn("[AgentNewAdapter] clipboardReadText not supported by provider, trying browser API");
					try {
						return await navigator.clipboard.readText();
					} catch (browserError) {
						console.warn("[AgentNewAdapter] Browser clipboard API also failed:", browserError);
						return "";
					}
				}
			} catch (error) {
				console.error("[AgentNewAdapter] clipboardReadText failed:", error);
				return "";
			}
		}
		/**
		* 获取 MCP 市场 URL
		*
		* 直接从 product 配置中获取，不需要调用到插件层
		* 复用已有的 getProductConfiguration 调用链
		*/
		async getMcpMarketUrl() {
			console.log("[AgentNewAdapter] getMcpMarketUrl");
			try {
				const url = (await this._fetchProductConfiguration()).links?.mcpMarketUrl || "";
				console.log("[AgentNewAdapter] getMcpMarketUrl result:", url);
				return url;
			} catch (error) {
				console.error("[AgentNewAdapter] getMcpMarketUrl failed:", error);
				return "";
			}
		}
		/**
		* 获取 MCP 文档 URL
		*
		* 直接从 product 配置中获取，不需要调用到插件层
		* 复用已有的 getProductConfiguration 调用链
		* 用于 Troubleshooting 链接
		*/
		async getMcpDocumentUrl() {
			console.log("[AgentNewAdapter] getMcpDocumentUrl");
			try {
				const url = (await this._fetchProductConfiguration()).links?.mcpDocumentUrl || "";
				console.log("[AgentNewAdapter] getMcpDocumentUrl result:", url);
				return url;
			} catch (error) {
				console.error("[AgentNewAdapter] getMcpDocumentUrl failed:", error);
				return "";
			}
		}
		/**
		* 获取 Connector 配置列表
		*
		* 调用链：
		* AgentNewAdapter.getConnectorConfigs()
		*   -> AgentClient.sessions.getConnectorConfigs()
		*   -> LocalAgentProvider.getConnectorConfigs()
		*   -> AcpJsonRpcClient.sendRequest('getConnectorConfigs')
		*   -> Extension Host -> AcpAgentImpl.getConnectorConfigs()
		*   -> ConnectorService.getConfigs()
		*/
		async getConnectorConfigs() {
			console.log("[AgentNewAdapter] getConnectorConfigs");
			try {
				if (this.client.sessions.getConnectorConfigs) {
					const configs = await this.client.sessions.getConnectorConfigs();
					console.log("[AgentNewAdapter] getConnectorConfigs returned", configs.length, "configs");
					return configs;
				} else {
					console.warn("[AgentNewAdapter] getConnectorConfigs not supported by provider");
					return [];
				}
			} catch (error) {
				console.error("[AgentNewAdapter] getConnectorConfigs failed:", error);
				return [];
			}
		}
		/**
		* 获取 Connector 状态列表
		*
		* 调用链：
		* AgentNewAdapter.getConnectorStates()
		*   -> AgentClient.sessions.getConnectorStates()
		*   -> LocalAgentProvider.getConnectorStates()
		*   -> AcpJsonRpcClient.sendRequest('getConnectorStates')
		*   -> Extension Host -> AcpAgentImpl.getConnectorStates()
		*   -> ConnectorService.getStates()
		*/
		async getConnectorStates() {
			console.log("[AgentNewAdapter] getConnectorStates");
			try {
				if (this.client.sessions.getConnectorStates) {
					const states = await this.client.sessions.getConnectorStates();
					console.log("[AgentNewAdapter] getConnectorStates returned", Object.keys(states).length, "states");
					return states;
				} else {
					console.warn("[AgentNewAdapter] getConnectorStates not supported by provider");
					return {};
				}
			} catch (error) {
				console.error("[AgentNewAdapter] getConnectorStates failed:", error);
				return {};
			}
		}
		/**
		* 连接 Connector
		*
		* 调用链：
		* AgentNewAdapter.connectConnector()
		*   -> AgentClient.sessions.connectConnector()
		*   -> LocalAgentProvider.connectConnector()
		*   -> AcpJsonRpcClient.sendRequest('connectConnector')
		*   -> Extension Host -> AcpAgentImpl.connectConnector()
		*   -> ConnectorService.connect()
		*/
		async connectConnector(configId) {
			console.log("[AgentNewAdapter] connectConnector:", configId);
			try {
				if (this.client.sessions.connectConnector) {
					const result = await this.client.sessions.connectConnector(configId);
					console.log("[AgentNewAdapter] connectConnector result:", result);
					return result;
				} else {
					console.warn("[AgentNewAdapter] connectConnector not supported by provider");
					return {
						success: false,
						error: "Not supported by provider"
					};
				}
			} catch (error) {
				console.error("[AgentNewAdapter] connectConnector failed:", error);
				return {
					success: false,
					error: error instanceof Error ? error.message : "Connection failed"
				};
			}
		}
		/**
		* 断开 Connector
		*
		* 调用链：
		* AgentNewAdapter.disconnectConnector()
		*   -> AgentClient.sessions.disconnectConnector()
		*   -> LocalAgentProvider.disconnectConnector()
		*   -> AcpJsonRpcClient.sendRequest('disconnectConnector')
		*   -> Extension Host -> AcpAgentImpl.disconnectConnector()
		*   -> ConnectorService.disconnect()
		*/
		async disconnectConnector(configId) {
			console.log("[AgentNewAdapter] disconnectConnector:", configId);
			try {
				if (this.client.sessions.disconnectConnector) {
					const result = await this.client.sessions.disconnectConnector(configId);
					console.log("[AgentNewAdapter] disconnectConnector result:", result);
					return result;
				} else {
					console.warn("[AgentNewAdapter] disconnectConnector not supported by provider");
					return {
						success: false,
						error: "Not supported by provider"
					};
				}
			} catch (error) {
				console.error("[AgentNewAdapter] disconnectConnector failed:", error);
				return {
					success: false,
					error: error instanceof Error ? error.message : "Disconnect failed"
				};
			}
		}
		/**
		* 更新 Connector 的 MCP headers
		*/
		async updateConnectorHeaders(configId, headers) {
			console.log("[AgentNewAdapter] updateConnectorHeaders:", configId);
			try {
				if (this.client.sessions.updateConnectorHeaders) {
					const result = await this.client.sessions.updateConnectorHeaders(configId, headers);
					console.log("[AgentNewAdapter] updateConnectorHeaders result:", result);
					return result;
				} else {
					console.warn("[AgentNewAdapter] updateConnectorHeaders not supported by provider");
					return {
						success: false,
						error: "Not supported by provider"
					};
				}
			} catch (error) {
				console.error("[AgentNewAdapter] updateConnectorHeaders failed:", error);
				return {
					success: false,
					error: error instanceof Error ? error.message : "Update headers failed"
				};
			}
		}
		/**
		* 更新 Connector 的 MCP 环境变量
		*/
		async updateConnectorEnv(configId, env) {
			console.log("[AgentNewAdapter] updateConnectorEnv:", configId);
			try {
				if (this.client.sessions.updateConnectorEnv) {
					const result = await this.client.sessions.updateConnectorEnv(configId, env);
					console.log("[AgentNewAdapter] updateConnectorEnv result:", result);
					return result;
				} else {
					console.warn("[AgentNewAdapter] updateConnectorEnv not supported by provider");
					return {
						success: false,
						error: "Not supported by provider"
					};
				}
			} catch (error) {
				console.error("[AgentNewAdapter] updateConnectorEnv failed:", error);
				return {
					success: false,
					error: error instanceof Error ? error.message : "Update env failed"
				};
			}
		}
		/**
		* 解绑 Connector（删除 OAuth 授权 + 断开连接）
		*/
		async unbindConnector(configId) {
			console.log("[AgentNewAdapter] unbindConnector:", configId);
			try {
				if (this.client.sessions.unbindConnector) {
					const result = await this.client.sessions.unbindConnector(configId);
					console.log("[AgentNewAdapter] unbindConnector result:", result);
					return result;
				} else {
					console.warn("[AgentNewAdapter] unbindConnector not supported by provider");
					return {
						success: false,
						error: "Not supported by provider"
					};
				}
			} catch (error) {
				console.error("[AgentNewAdapter] unbindConnector failed:", error);
				return {
					success: false,
					error: error instanceof Error ? error.message : "Unbind failed"
				};
			}
		}
		async resetConnector(configId) {
			console.log("[AgentNewAdapter] resetConnector:", configId);
			try {
				if (this.client.sessions.resetConnector) {
					const result = await this.client.sessions.resetConnector(configId);
					console.log("[AgentNewAdapter] resetConnector result:", result);
					return result;
				} else {
					console.warn("[AgentNewAdapter] resetConnector not supported by provider");
					return {
						success: false,
						error: "Not supported by provider"
					};
				}
			} catch (error) {
				console.error("[AgentNewAdapter] resetConnector failed:", error);
				return {
					success: false,
					error: error instanceof Error ? error.message : "Reset failed"
				};
			}
		}
		/**
		* 检查 Connector 是否有本地 OAuth token
		*/
		async hasConnectorOAuthToken(configId) {
			try {
				if (this.client.sessions.hasConnectorOAuthToken) return await this.client.sessions.hasConnectorOAuthToken(configId);
				return false;
			} catch {
				return false;
			}
		}
		/**
		* 取消指定会话的排队
		*/
		async cancelQueueByConversation(conversationId) {
			try {
				await this.client.sessions.cancelQueueByConversation(conversationId);
			} catch (error) {
				console.error("[AgentNewAdapter] cancelQueueByConversation failed:", error);
				throw error;
			}
		}
		/**
		* 查询指定会话的排队状态快照
		* 通过 IPC 调用 plugin-chat 层的 QueuePollingManager.getQueueState
		*/
		async getQueueState(conversationId) {
			try {
				return await this.client.sessions.getQueueState(conversationId);
			} catch (error) {
				console.error("[AgentNewAdapter] getQueueState failed:", error);
				return null;
			}
		}
		/**
		* 订阅排队状态变化
		* 通过 client.sessions.on('queueStateChanged') 监听服务端推送
		*/
		onQueueStateChanged(callback) {
			const handler = (snapshot) => {
				try {
					callback(snapshot);
				} catch (err) {
					console.error("[AgentNewAdapter] Queue state changed callback error:", err);
				}
			};
			this.client.sessions.on("queueStateChanged", handler);
			return () => {
				this.client.sessions.off("queueStateChanged", handler);
			};
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/adapters/mode-mapping-utils.ts
/**
* Cloud 模式映射工具
*
* 在 Cloud 模式下，服务器返回多种模式（default, acceptEdits, plan, bypassPermissions），
* 但 UI 只展示两种模式：craft (Agent) 和 plan (Plan)。
*
* 这个模块负责在 UI 和服务器之间进行双向映射。
*/
/**
* Server Mode → UI Mode 映射
*
* 将服务器返回的模式 ID 映射为 UI 显示的模式 ID
*
* @param serverModeId - 服务器模式 ID (default, acceptEdits, plan, bypassPermissions)
* @returns UI 模式 ID (craft 或 plan)
*
* @example
* mapServerModeToUI('plan') // => 'plan'
* mapServerModeToUI('bypassPermissions') // => 'craft'
* mapServerModeToUI('default') // => 'craft'
*/
function mapServerModeToUI(serverModeId) {
	if (serverModeId === "plan") return "plan";
	return "craft";
}
/**
* UI Mode → Server Mode 映射
*
* 将 UI 选择的模式 ID 映射为服务器需要的模式 ID
*
* @param uiModeId - UI 模式 ID (craft 或 plan)
* @returns 服务器模式 ID (bypassPermissions 或 plan)
*
* @example
* mapUIModeToServer('craft') // => 'bypassPermissions'
* mapUIModeToServer('plan') // => 'plan'
*/
function mapUIModeToServer(uiModeId) {
	if (uiModeId === "plan") return "plan";
	if (uiModeId === "craft") return "bypassPermissions";
	return uiModeId;
}
/**
* 过滤并转换服务器返回的 modes 列表
*
* 将服务器返回的多个模式转换为 UI 需要的两个模式：
* - craft (Agent): 映射自 bypassPermissions
* - plan (Plan): 保持不变
*
* @param serverModes - 服务器返回的模式列表
* @returns 转换后的 UI 模式列表
*
* @example
* const serverModes = [
*   { id: 'default', name: 'Default', ... },
*   { id: 'plan', name: 'Plan', ... },
*   { id: 'bypassPermissions', name: 'Bypass', ... }
* ];
* filterAndMapServerModes(serverModes)
* // => [
* //   { id: 'craft', name: 'Agent', description: 'mode.agent.description', ... },
* //   { id: 'plan', name: 'Plan', ... }
* // ]
*/
function filterAndMapServerModes(serverModes) {
	const planMode = serverModes.find((m) => m.id === "plan");
	const bypassPermissionsMode = serverModes.find((m) => m.id === "bypassPermissions");
	const result = [];
	if (bypassPermissionsMode) result.push({
		...bypassPermissionsMode,
		id: "craft",
		name: "Agent",
		description: "mode.agent.description"
	});
	if (planMode) result.push(planMode);
	return result;
}
var init_mode_mapping_utils = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/adapters/cloud-agent-adapter.ts
var CLOUD_HELP_DOCUMENT_URL, CloudAgentAdapter;
var init_cloud_agent_adapter = __esmMin((() => {
	init_common();
	init_i18n();
	init_city_tree();
	init_auth_expired_detector();
	init_environment();
	init_product_features();
	init_timing();
	init_acp_message_accumulator();
	init_message_converter();
	init_mode_mapping_utils();
	init_pending_message_tracker();
	init_subscriptions();
	init_task_converter();
	CLOUD_HELP_DOCUMENT_URL = "https://www.codebuddy.cn/docs/ide/Introduction";
	CloudAgentAdapter = class CloudAgentAdapter {
		static {
			this.MAX_BACKGROUND_SESSIONS = 5;
		}
		/** 检查 offset 是否已处理过（ACP SSE 抖动去重）。 */
		shouldSkipDuplicateOffset(sessionId, offset) {
			if (offset === void 0 || offset === null) return false;
			const offsets = this.processedOffsets.get(sessionId);
			return offsets ? offsets.has(offset) : false;
		}
		/** 记录已处理的 offset。 */
		recordProcessedOffset(sessionId, offset) {
			if (!this.processedOffsets.has(sessionId)) this.processedOffsets.set(sessionId, /* @__PURE__ */ new Set());
			this.processedOffsets.get(sessionId).add(offset);
		}
		/** 清理会话的 offset 去重记录（仅全新 loadSession PATH3 时调用）。 */
		clearProcessedOffsets(sessionId) {
			this.processedOffsets.delete(sessionId);
		}
		/**
		* 根据 sandboxEpoch 判定帧是否为日志派发权威帧。
		* - 帧带 epoch → 更新锚点，返回 true（权威）
		* - 帧缺 epoch 且 anchor 已确立 → 返回 false���拖尾/快照帧，应跳过 status 变更）
		* - 帧缺 epoch 且 anchor 未确立 → 返回 true（兼容旧后端）
		*/
		isSandboxAuthoritativeFrame(epoch) {
			if (epoch) {
				this.sandboxEpoch = epoch;
				return true;
			}
			return this.sandboxEpoch === void 0;
		}
		/** 复位 sandboxEpoch（全新 loadSession 时调用）。 */
		resetSandboxEpoch() {
			this.sandboxEpoch = void 0;
		}
		/**
		* 运行环境类型 - Cloud 环境固定为 'cloud'
		*/
		get environmentType() {
			return "cloud";
		}
		/**
		* Sessions 资源访问器
		*/
		get sessions() {
			return this.client.sessions;
		}
		/**
		* 构造函数
		*/
		constructor(client, initialConfig, backendProvider) {
			this.messageCallbacks = /* @__PURE__ */ new Set();
			this.errorCallbacks = /* @__PURE__ */ new Set();
			this.checkpointCallbacks = /* @__PURE__ */ new Set();
			this.artifactCallbacks = /* @__PURE__ */ new Set();
			this.artifactTimestampsByUri = /* @__PURE__ */ new Map();
			this.taskUpdateCallbacks = /* @__PURE__ */ new Set();
			this.sendPromptRequestCallbacks = /* @__PURE__ */ new Set();
			this.insertContentBlocksRequestCallbacks = /* @__PURE__ */ new Set();
			this.pendingInsertRequest = null;
			this.openBrowserCallbacks = /* @__PURE__ */ new Set();
			this.openResultViewCallbacks = /* @__PURE__ */ new Set();
			this.browserUrlCache = /* @__PURE__ */ new Map();
			this.statusSyncDebouncer = new DebouncedMap(500);
			this.initialized = false;
			this.messageCache = /* @__PURE__ */ new Map();
			this.toolCallIdToMessageId = /* @__PURE__ */ new Map();
			this._acpHistoryBuffering = null;
			this._acpHistoryRendered = /* @__PURE__ */ new Set();
			this.sessionConfigs = /* @__PURE__ */ new Map();
			this.sessionModels = /* @__PURE__ */ new Map();
			this.backgroundSessions = /* @__PURE__ */ new Map();
			this.processedOffsets = /* @__PURE__ */ new Map();
			this.pendingMessageTracker = new PendingMessageTracker();
			this.client = client;
			this.backendProvider = backendProvider;
			this.initialConfig = initialConfig;
			this.messageAccumulator = new ACPMessageAccumulator({ logPrefix: "[CloudAgentAdapter]" });
			this.setupGlobalSessionEventListeners();
		}
		/**
		* 设置全局 session 事件监听器
		*/
		setupGlobalSessionEventListeners() {
			this.client.sessions.on("sessionCreated", (sessionInfo) => {
				console.log("[CloudAgentAdapter] sessionCreated received:", sessionInfo.id);
				const conversation = {
					id: sessionInfo.id,
					cwd: sessionInfo.cwd || "",
					title: sessionInfo.name || "",
					timestamp: sessionInfo.lastActivityAt ? new Date(sessionInfo.lastActivityAt) : sessionInfo.createdAt ? new Date(sessionInfo.createdAt) : /* @__PURE__ */ new Date(),
					status: sessionInfo.status || "pending"
				};
				this.emitMessage({
					type: "conversation",
					conversation
				});
			});
		}
		/**
		* 处理 sessionPrepared 回调 - POST 成功后立即显示 UI
		*/
		handleSessionPrepared(sessionInfo, promptContentBlocks) {
			console.log("[CloudAgentAdapter] sessionPrepared callback:", sessionInfo.id);
			const conversation = {
				id: sessionInfo.id,
				cwd: sessionInfo.cwd || "",
				title: sessionInfo.name || "",
				timestamp: sessionInfo.createdAt ? new Date(sessionInfo.createdAt) : /* @__PURE__ */ new Date(),
				status: "connecting"
			};
			this.emitMessage({
				type: "conversation",
				conversation
			});
			if (promptContentBlocks && promptContentBlocks.length > 0) {
				const userMessage = MessageConverter.convertContentBlocksToUserMessage(promptContentBlocks, {
					sessionId: sessionInfo.id,
					requestId: `${sessionInfo.id}-initial`
				});
				this.emitMessage(userMessage);
				const loadingAssistantMessage = {
					id: `${sessionInfo.id}-assistant-loading`,
					requestId: `${sessionInfo.id}-initial`,
					conversationId: sessionInfo.id,
					messageType: "assistant",
					createTime: Date.now(),
					complete: false,
					content: [],
					extra: {}
				};
				this.emitMessage(loadingAssistantMessage);
			}
		}
		/**
		* Backend Provider 访问器
		*/
		getBackendProvider() {
			return this.backendProvider;
		}
		async initialize(request) {
			if (this.initialized) return {
				protocolVersion: 1,
				agentCapabilities: {},
				agentInfo: {
					name: "CloudAgent",
					version: "1.0.0"
				}
			};
			this.initialized = true;
			return {
				protocolVersion: 1,
				agentCapabilities: {},
				agentInfo: {
					name: "CloudAgent",
					version: "1.0.0"
				}
			};
		}
		/**
		* 创建新会话
		* @param cwd 工作目录
		* @param options 可选配置（模型、模式、标签等）
		*/
		async createNewSession(cwd, options) {
			try {
				this.disconnectAndCleanSession();
				const { mcpServers = [], mode: modeID = "craft", model: modelID, tags, welcomeMode, prompt, promptContentBlocks, projectId } = options || {};
				const session = await this.client.sessions.create({
					cwd,
					options: {
						mcpServers,
						prompt,
						model: modelID,
						tags,
						projectId,
						_meta: { "codebuddy.ai": {
							...welcomeMode ? { welcomeMode } : {},
							...tags ? { tags } : {}
						} },
						onSessionPrepared: (sessionInfo) => {
							this.handleSessionPrepared({
								id: sessionInfo.id,
								cwd: sessionInfo.cwd,
								name: sessionInfo.name,
								createdAt: sessionInfo.createdAt
							}, promptContentBlocks);
						}
					}
				});
				this.sessionConfigs.set(session.id, {
					cwd,
					mcpServers
				});
				this.currentSession = session;
				this.setupSessionEventListeners(session);
				await Promise.all([this.resolveAndSetMode(session, modeID), this.resolveAndSetModel(session, modelID)]);
				const models = await this.resolveModelsResponse(session, cwd);
				return {
					activeSession: session,
					response: {
						sessionId: session.id,
						modes: session.availableModes && session.currentMode ? {
							availableModes: filterAndMapServerModes(session.availableModes),
							currentModeId: mapServerModeToUI(session.currentMode)
						} : void 0,
						models
					}
				};
			} catch (error) {
				console.error("🐸[CloudAgentAdapter] Create new session failed:", error);
				throw error;
			}
		}
		async loadSession(sessionId, cwd, mcpServers = []) {
			try {
				if (this.currentSession && this.currentSession.id !== sessionId) {
					this.backgroundSessions.set(this.currentSession.id, this.currentSession);
					this.currentSession = void 0;
				}
				const cached = this.backgroundSessions.get(sessionId);
				if (cached) {
					this.backgroundSessions.delete(sessionId);
					this.enforceBackgroundSessionLimit();
					this.currentSession = cached;
					this.sessionConfigs.set(sessionId, {
						cwd,
						mcpServers
					});
					const sessionCache = this.messageCache.get(sessionId);
					const messages = sessionCache ? Array.from(sessionCache.values()) : [];
					this.emitMessage({
						type: "messages_batch",
						conversationId: sessionId,
						messages
					});
					const result = {};
					if (cached.availableModes) result.modes = {
						availableModes: filterAndMapServerModes(cached.availableModes),
						currentModeId: cached.currentMode ? mapServerModeToUI(cached.currentMode) : ""
					};
					result.models = await this.resolveModelsResponse(cached, cwd);
					return result;
				}
				this.enforceBackgroundSessionLimit();
				this.messageAccumulator.clear(sessionId);
				this.messageCache.delete(sessionId);
				this.clearProcessedOffsets(sessionId);
				this.resetSandboxEpoch();
				this.sessionConfigs.set(sessionId, {
					cwd,
					mcpServers
				});
				const session = await this.client.sessions.load({
					sessionId,
					cwd,
					mcpServers,
					onSessionCreated: (session) => {
						this.messageAccumulator.clear(sessionId);
						this.messageCache.delete(sessionId);
						this._acpHistoryBuffering = sessionId;
						this.setupSessionEventListeners(session);
						this.currentSession = session;
					}
				});
				if (this._acpHistoryBuffering === sessionId) {
					this._acpHistoryBuffering = null;
					this.flushMessageCacheOnly(sessionId);
					const sessionCache = this.messageCache.get(sessionId);
					const messages = sessionCache ? Array.from(sessionCache.values()) : [];
					this.emitMessage({
						type: "messages_batch",
						conversationId: sessionId,
						messages
					});
					this._acpHistoryRendered.add(sessionId);
				}
				const result = {};
				if (session.availableModes) result.modes = {
					availableModes: filterAndMapServerModes(session.availableModes),
					currentModeId: session.currentMode ? mapServerModeToUI(session.currentMode) : ""
				};
				result.models = await this.resolveModelsResponse(session, cwd);
				return result;
			} catch (error) {
				console.error("[CloudAgentAdapter] Load session failed:", error);
				if (this._acpHistoryBuffering === sessionId) this._acpHistoryBuffering = null;
				throw error;
			}
		}
		/**
		* 获取指定会话的历史消息
		* 优先从 messageCache 读取，没有缓存时返回空数组
		* （Cloud 模式下历史消息通过 loadSession 的 sessionUpdate 事件推送）
		*
		* @param sessionId 会话 ID
		* @param cwd 工作目录
		* @returns 消息数组（按 createTime 排序）
		*/
		async getSessionMessages(sessionId, _cwd = "") {
			const sessionCache = this.messageCache.get(sessionId);
			if (sessionCache && sessionCache.size > 0) {
				console.log("[CloudAgentAdapter] getSessionMessages: cache hit", sessionId.substring(0, 8), "size=", sessionCache.size);
				const messages = Array.from(sessionCache.values());
				messages.sort((a, b) => {
					return (a.createTime || 0) - (b.createTime || 0);
				});
				return messages;
			}
			console.log("[CloudAgentAdapter] getSessionMessages: no cache for", sessionId.substring(0, 8));
			return [];
		}
		async newSession(request) {
			const codebuddyMeta = request._meta?.["codebuddy.ai"];
			const modeID = codebuddyMeta?.mode || "craft";
			const modelID = typeof codebuddyMeta?.model === "string" && codebuddyMeta.model ? codebuddyMeta.model : void 0;
			const welcomeMode = codebuddyMeta?.welcomeMode || "coding";
			const tags = codebuddyMeta?.tags;
			return (await this.createNewSession(request.cwd, {
				mcpServers: request.mcpServers,
				mode: modeID,
				model: modelID,
				isPlayground: welcomeMode !== "coding",
				...tags ? { tags } : {}
			})).response;
		}
		async getSessions(userId) {
			const account = accountService.getAccount();
			if (!account) {
				console.warn("[CloudAgentAdapter] getSessions: User not logged in, returning empty list");
				return { sessions: [] };
			}
			const effectiveUserId = userId || account.uid;
			return { sessions: (await this.client.sessions.list({ userId: effectiveUserId })).agents.map((s) => ({
				id: s.id,
				name: s.name,
				status: s.status,
				createdAt: s.createdAt
			})) };
		}
		/**
		* 获取会话列表 - Cloud 模式返回扁平数据 + 分页
		*/
		async listConversations(options) {
			try {
				if (!accountService.getAccount()) {
					console.warn("[CloudAgentAdapter] listConversations: User not logged in, returning empty list");
					return {
						conversations: [],
						pagination: {
							page: 1,
							size: 30,
							total: 0,
							totalPages: 0,
							hasNext: false,
							hasPrev: false
						}
					};
				}
				const result = await this.client.sessions.list(options);
				return {
					conversations: result.agents.map((session) => ({
						id: session.id,
						cwd: session.cwd ?? "",
						title: session.name || t("conversation.creatingTask"),
						lastMessage: "",
						timestamp: session.lastActivityAt ? new Date(session.lastActivityAt) : session.createdAt ?? /* @__PURE__ */ new Date(),
						status: session.status || "pending",
						isPlayground: session.isPlayground ?? false,
						isUserDefinedTitle: session.isUserDefinedTitle,
						conversationOrigin: session.conversationOrigin
					})),
					pagination: result.pagination
				};
			} catch (error) {
				console.error("[CloudAgentAdapter] List conversations failed:", error);
				throw error;
			}
		}
		async loadAllConversation(userId) {
			const account = accountService.getAccount();
			if (!account) {
				console.warn("[CloudAgentAdapter] loadAllConversation: User not logged in, returning empty list");
				return [];
			}
			const effectiveUserId = userId || account.uid;
			return (await this.client.sessions.list(withWebAgentsListOrigin({ userId: effectiveUserId }))).agents.map((sessionInfo) => ({
				id: sessionInfo.id,
				cwd: sessionInfo.cwd ?? "",
				title: sessionInfo.name || t("conversation.creatingTask"),
				lastMessage: "",
				timestamp: sessionInfo.lastActivityAt ? new Date(sessionInfo.lastActivityAt) : sessionInfo.createdAt ?? /* @__PURE__ */ new Date(),
				status: sessionInfo.status,
				isPlayground: sessionInfo.isPlayground ?? false,
				conversationOrigin: sessionInfo.conversationOrigin
			}));
		}
		/**
		* 按 ID 批量获取会话（绕过分页窗口）。
		*
		* #50748: 置顶区域需要展示「不在当前分页/搜索窗口内」的会话；调用方先用窗口内已有数据命中，
		* 仅对缺失的 id 调本方法兜底。此前 Cloud 端未实现该可选方法，导致置顶项滚出首屏/搜索后
		* 找不到完整数据被丢弃，表现为「置顶经常失效 + 取消置顶按钮消失」。
		* 内部走 client.sessions.getByIds（限并发 + 跳过已删除 id）。
		*/
		async getConversationsByIds(ids) {
			const { conversations } = await this.getConversationsByIdsDetailed(ids);
			return conversations;
		}
		/**
		* #50748: 返回会话数据 + 「确认已删除」的 id（区分 404 删除与拉取失败），
		* 供置顶区安全清理脏项，避免首屏竞态/网络抖动误删置顶列表。
		*/
		async getConversationsByIdsDetailed(ids) {
			if (!ids || ids.length === 0) return {
				conversations: [],
				missingIds: []
			};
			if (!accountService.getAccount()) return {
				conversations: [],
				missingIds: []
			};
			try {
				const { sessions, missingIds } = await this.client.sessions.getByIds(ids);
				return {
					conversations: sessions.map((sessionInfo) => ({
						id: sessionInfo.id,
						cwd: sessionInfo.cwd ?? "",
						title: sessionInfo.name || t("conversation.creatingTask"),
						lastMessage: "",
						timestamp: sessionInfo.lastActivityAt ? new Date(sessionInfo.lastActivityAt) : sessionInfo.createdAt ?? /* @__PURE__ */ new Date(),
						status: sessionInfo.status,
						isPlayground: sessionInfo.isPlayground ?? false,
						isUserDefinedTitle: sessionInfo.isUserDefinedTitle
					})),
					missingIds
				};
			} catch (error) {
				console.warn("[CloudAgentAdapter] getConversationsByIdsDetailed failed:", error);
				return {
					conversations: [],
					missingIds: []
				};
			}
		}
		async loadArchivedConversations(userId) {
			const account = accountService.getAccount();
			if (!account) {
				console.warn("[CloudAgentAdapter] loadArchivedConversations: User not logged in, returning empty list");
				return [];
			}
			const effectiveUserId = userId || account.uid;
			return (await this.client.sessions.list(withWebAgentsListOrigin({
				userId: effectiveUserId,
				filters: [{
					field: "status",
					value: "archived"
				}],
				sort: {
					orderBy: "updatedAt",
					order: "desc"
				}
			}))).agents.map((sessionInfo) => ({
				id: sessionInfo.id,
				cwd: sessionInfo.cwd ?? "",
				title: sessionInfo.name || t("conversation.creatingTask"),
				lastMessage: "",
				timestamp: sessionInfo.lastActivityAt ? new Date(sessionInfo.lastActivityAt) : sessionInfo.createdAt ?? /* @__PURE__ */ new Date(),
				status: sessionInfo.status,
				isPlayground: sessionInfo.isPlayground ?? false,
				conversationOrigin: sessionInfo.conversationOrigin
			}));
		}
		/**
		* 发送消息 - Cloud 模式在发送前 flush 累积器
		*/
		async sendMessage(request, userMessageId) {
			const sessionId = request.sessionId;
			this.flushAndEmit(sessionId);
			const meta = request._meta;
			const codebuddyMeta = meta?.["codebuddy.ai"];
			let session;
			if (!this.sessionConfigs.has(sessionId)) {
				const cwd = meta?.cwd || meta?.workspace || "";
				const mcpServers = meta?.mcpServers || [];
				const modeID = codebuddyMeta?.mode || "craft";
				const modelID = typeof codebuddyMeta?.model === "string" && codebuddyMeta.model ? codebuddyMeta.model : void 0;
				const isPlayground = codebuddyMeta?.isPlayground ?? false;
				const initTags = codebuddyMeta?.tags;
				session = (await this.createNewSession(cwd, {
					mcpServers,
					mode: modeID,
					model: modelID,
					isPlayground,
					...initTags ? { tags: initTags } : {}
				})).activeSession;
			} else if (this.currentSession && this.currentSession.id === sessionId) session = this.currentSession;
			else session = await this.lookupSession(sessionId);
			const currentModelId = this.sessionModels.get(sessionId);
			const currentModeId = request._meta && request._meta["codebuddy.ai"]?.mode;
			const serverModeId = currentModeId ? mapUIModeToServer(currentModeId) : void 0;
			const tags = request._meta && request._meta["codebuddy.ai"]?.tags;
			const contentBlocks = this.convertPromptToContentBlocks(request.prompt, currentModelId, serverModeId);
			this.pendingMessageTracker.addPendingRequest(sessionId, userMessageId);
			const sendOnce = async (targetSession) => {
				const result = await targetSession.prompts.send({
					content: contentBlocks.length > 0 ? contentBlocks : "",
					_meta: { "codebuddy.ai": {
						model: currentModelId,
						mode: serverModeId,
						userMessageId: codebuddyMeta?.userMessageId ?? userMessageId,
						...tags ? { tags } : {}
					} }
				});
				return {
					stopReason: result.stopReason,
					_meta: result._meta
				};
			};
			try {
				const response = await sendOnce(session);
				const sessionMessages = this.messageCache.get(sessionId);
				if (sessionMessages) {
					const messages = Array.from(sessionMessages.values());
					console.log("[Message] conversation end, all messages:", sessionId, messages);
				}
				return response;
			} catch (error) {
				this.disconnectAndCleanSession(sessionId);
				console.error("[CloudAgentAdapter] Send message failed:", error);
				throw error;
			}
		}
		async cancelMessage(request) {
			await (await this.lookupSession(request.sessionId)).prompts.cancel();
		}
		/**
		* 原子回退：将会话历史指针回退到指定 fork 点（Phase 3）。
		* 通过 ACP prompts.rollback() 调用 CLI 端 handleRollback。
		* 与 WorkbuddyAgentAdapter.rollback() 保持一致的实现模式。
		* @see issue #50495 / docs/plans/2026-06-20-resend-edit-unified-plan.md
		*/
		async rollback(request) {
			try {
				const session = await this.lookupSession(request.sessionId);
				if (!session.prompts.rollback) return {
					applied: false,
					error: "rollback not supported by this session"
				};
				return await session.prompts.rollback(request) ?? {
					applied: false,
					error: "rollback returned null"
				};
			} catch (err) {
				return {
					applied: false,
					error: String(err)
				};
			}
		}
		/**
		* 从 messageCache 中移除指定消息。
		* 用于 resend/edit 场景：前端删除消息后同步清理缓存，
		* 避免 tab 切换 / loadSession 历史回放时旧消息复现。
		*/
		uncacheMessages(sessionId, messageIds) {
			const sessionCache = this.messageCache.get(sessionId);
			if (!sessionCache) return;
			for (const id of messageIds) sessionCache.delete(id);
		}
		setupSessionEventListeners(session) {
			session.on("sessionUpdate", (notification) => {
				this.handleSessionUpdate(notification);
			});
			session.on("permissionRequest", (data) => {
				this.handlePermissionRequest(data);
			});
			session.on("artifactCreated", (artifact) => {
				this.emitArtifact(session.id, artifact, "created");
			});
			session.on("artifactUpdated", (artifact) => {
				this.emitArtifact(session.id, artifact, "updated");
			});
			session.on("artifactDeleted", (artifact) => {
				this.emitArtifact(session.id, artifact, "deleted");
			});
			session.on("checkpointCreated", (checkpoint) => {
				this.emitCheckpoint(session.id, "created", checkpoint);
			});
			session.on("checkpointUpdated", (checkpoint) => {
				this.emitCheckpoint(session.id, "updated", checkpoint);
			});
			session.on("command", (command) => {
				this.handleCommand(session.id, command);
			});
			session.on("questionRequest", (data) => {
				this.handleQuestionRequest(session.id, data);
			});
			session.on("error", (error) => {
				console.error("[CloudAgentAdapter] Session error:", error);
				this.emitError(error);
			});
			session.on("connected", () => {});
			session.on("disconnected", () => {});
		}
		/**
		* 处理 session 更新 - Cloud 模式使用 ACPMessageAccumulator 统一处理
		*
		* 核心逻辑（第一性原理）：
		* 1. ACP 流式 chunk（agent_message_chunk、tool_call、tool_call_update 等）需要累积
		* 2. 每次更新都输出当前累积的完整 AssistantMessageContent[]
		* 3. 通过 emitMessage 将累积的消息发送到 UI
		* 4. 特殊消息类型（plan、mode_update 等）单独处理
		*/
		handleSessionUpdate(notification) {
			const { update, sessionId } = notification;
			const updateType = update.sessionUpdate;
			const meta = notification._meta;
			const codebuddyMeta = meta && typeof meta === "object" ? meta["codebuddy.ai"] : void 0;
			const rawOffset = codebuddyMeta?.offset;
			const offset = typeof rawOffset === "number" ? rawOffset : typeof rawOffset === "string" && rawOffset.trim() !== "" && Number.isFinite(Number(rawOffset)) ? Number(rawOffset) : void 0;
			if (this.shouldSkipDuplicateOffset(sessionId, offset)) {
				console.log("[CloudAgentAdapter] duplicate_offset_dropped:", {
					sessionId: sessionId.substring(0, 8),
					offset,
					updateType
				});
				return;
			}
			if (offset !== void 0) this.recordProcessedOffset(sessionId, offset);
			if (updateType === "session_info_update") {
				const rawEpoch = codebuddyMeta?.sandboxEpoch;
				const sandboxEpoch = typeof rawEpoch === "string" ? rawEpoch : void 0;
				if (!this.isSandboxAuthoritativeFrame(sandboxEpoch)) {
					if (!(update.title !== void 0)) {
						console.log("[CloudAgentAdapter] non_log_sourced_frame_skipped:", { sessionId: sessionId.substring(0, 8) });
						return;
					}
					console.log("[CloudAgentAdapter] non_log_sourced_title_only_forwarded:", { sessionId: sessionId.substring(0, 8) });
				}
			}
			const parentToolUseId = codebuddyMeta?.parentToolUseId;
			if (meta && typeof meta === "object") {
				if (typeof parentToolUseId === "string" && parentToolUseId.length > 0) {
					let toolCallId;
					if (updateType === "tool_call") toolCallId = update.toolCallId;
					else if (updateType === "tool_call_update") toolCallId = update.toolCallId;
					if (parentToolUseId !== toolCallId) {
						if (updateType === "tool_call") {
							const result = this.messageAccumulator.handleSubAgentToolCall(sessionId, parentToolUseId, update, notification);
							if (result) {
								let sessionCache = this.messageCache.get(sessionId);
								if (!sessionCache) {
									sessionCache = /* @__PURE__ */ new Map();
									this.messageCache.set(sessionId, sessionCache);
								}
								sessionCache.set(result.messageId, result.message);
								if (this._acpHistoryBuffering !== sessionId) this.emitMessage(result.message);
							}
						} else if (updateType === "tool_call_update") {
							const result = this.messageAccumulator.handleSubAgentToolCallUpdate(sessionId, update, notification);
							if (result) {
								let sessionCache = this.messageCache.get(sessionId);
								if (!sessionCache) {
									sessionCache = /* @__PURE__ */ new Map();
									this.messageCache.set(sessionId, sessionCache);
								}
								sessionCache.set(result.messageId, result.message);
								if (this._acpHistoryBuffering !== sessionId) this.emitMessage(result.message);
							}
						}
						return;
					}
				}
			}
			if (updateType === "current_mode_update") return;
			if (updateType === "available_commands_update") {
				if (this.currentSession && this.currentSession.id === sessionId) {
					const commands = (update.availableCommands || []).filter((cmd) => !CloudAgentAdapter.HIDDEN_COMMANDS.has(cmd.name)).map((cmd) => ({
						name: cmd.name,
						description: cmd.description,
						input: cmd.input ? { hint: cmd.input.hint } : void 0,
						_meta: cmd._meta
					}));
					this.currentSession.setAvailableCommands(commands);
					commandSubject.next({
						sessionId,
						commands
					});
				}
				return;
			}
			if (updateType === "session_info_update") {
				if (!sessionId) {
					console.warn("[CloudAgentAdapter] session_info_update missing sessionId, update:", update);
					return;
				}
				this.handleSessionInfoUpdate(sessionId, update);
				return;
			}
			if (updateType === "plan") {
				if (this._acpHistoryBuffering === sessionId) this.flushMessageCacheOnly(sessionId);
				else {
					this.flushAndEmit(sessionId);
					this.handlePlanUpdate(sessionId, update, notification._meta);
				}
				return;
			}
			if (this.messageAccumulator.isAccumulatableUpdate(updateType)) {
				const result = this.messageAccumulator.handleUpdate(sessionId, notification);
				let sessionCache = this.messageCache.get(sessionId);
				if (!sessionCache) {
					sessionCache = /* @__PURE__ */ new Map();
					this.messageCache.set(sessionId, sessionCache);
				}
				sessionCache.set(result.messageId, result.message);
				if (updateType === "tool_call" || updateType === "tool_call_update") {
					const toolCallId = update.toolCallId;
					if (toolCallId) this.toolCallIdToMessageId.set(`${sessionId}:${toolCallId}`, result.messageId);
				}
				if (this._acpHistoryBuffering !== sessionId) this.emitMessage(result.message);
				return;
			}
			if (this._acpHistoryBuffering === sessionId) this.flushMessageCacheOnly(sessionId);
			else this.flushAndEmit(sessionId);
			this.handleOtherMessageUpdate(notification);
		}
		/**
		* Flush 累积器并发送最终消息
		*/
		flushAndEmit(sessionId) {
			if (!this.messageAccumulator.hasActiveState(sessionId)) return;
			const result = this.messageAccumulator.flush(sessionId);
			if (result) {
				let sessionCache = this.messageCache.get(sessionId);
				if (!sessionCache) {
					sessionCache = /* @__PURE__ */ new Map();
					this.messageCache.set(sessionId, sessionCache);
				}
				sessionCache.set(result.messageId, result.message);
				console.log("[Message] flushAndEmit complete:", {
					sessionId,
					messageId: result.messageId,
					role: result.message.role,
					content: result.message.content
				});
				this.emitMessage(result.message);
			}
		}
		/**
		* Flush 累积器到 messageCache，但不 emitMessage。
		* 用于 ACP 历史缓冲模式：消息写入 cache 后由 loadSession 统一 batch 推送。
		*/
		flushMessageCacheOnly(sessionId) {
			if (!this.messageAccumulator.hasActiveState(sessionId)) return;
			const result = this.messageAccumulator.flush(sessionId);
			if (result) {
				let sessionCache = this.messageCache.get(sessionId);
				if (!sessionCache) {
					sessionCache = /* @__PURE__ */ new Map();
					this.messageCache.set(sessionId, sessionCache);
				}
				sessionCache.set(result.messageId, result.message);
			}
		}
		handlePlanUpdate(sessionId, update, _meta) {
			try {
				const tasks = TaskConverter.convertACPPlanEntries(update.entries || []);
				const codeBuddyMeta = _meta?.["codebuddy.ai"];
				this.emitTaskUpdate(sessionId, tasks, codeBuddyMeta?.enableEdit || false, codeBuddyMeta?.uri);
			} catch (error) {
				console.error("[CloudAgentAdapter] Failed to handle plan update:", error);
			}
		}
		/**
		* 处理会话信息更新（标题、状态等）
		*
		* 当收到 session_info_update 消息时：
		* - title 在 update 对象中
		* - status 在 _meta 中
		* 需要分别处理这两个字段，避免相互干扰。
		*
		* 当 status 更新时，会异步同步到另一个服务。
		*/
		handleSessionInfoUpdate(sessionId, update) {
			const title = update.title;
			const status = update._meta?.["codebuddy.ai"]?.status;
			if (title !== void 0 || status !== void 0) {
				const conversation = { id: sessionId };
				if (title !== void 0) conversation.title = title;
				if (status !== void 0) {
					conversation.status = status;
					this.syncSessionStatus(sessionId, status);
				}
				this.emitMessage({
					type: "conversation",
					conversation
				});
			}
		}
		/**
		* 异步同步会话状态到服务端（带防抖）
		* 用于跨服务同步场景，当一个服务更新状态后，主动推送到另一个服务
		*
		* 防抖策略：对于同一个 sessionId，在 500ms 内只发送最后一次状态
		*/
		syncSessionStatus(sessionId, status) {
			this.statusSyncDebouncer.call(sessionId, () => {
				this.client.sessions.updateStatus(sessionId, status).catch((error) => {
					console.warn("[CloudAgentAdapter] Failed to sync session status:", sessionId, status, error);
				});
			});
		}
		handleOtherMessageUpdate(notification) {
			const { update, sessionId } = notification;
			let messageId = "";
			if (notification._meta) messageId = notification._meta["codebuddy.ai"]?.messageId || "";
			try {
				const result = MessageConverter.convertACPUpdateToMessage(update, {
					sessionId,
					requestId: notification.sessionId,
					messageId,
					isStreaming: true,
					_meta: notification._meta ?? void 0
				});
				if (!result) return;
				if (this._acpHistoryBuffering === sessionId) {
					let sessionCache = this.messageCache.get(sessionId);
					if (!sessionCache) {
						sessionCache = /* @__PURE__ */ new Map();
						this.messageCache.set(sessionId, sessionCache);
					}
					sessionCache.set(result.messageId, result.message);
					return;
				}
				this.emitMessage(result.message);
			} catch (error) {
				console.error("[CloudAgentAdapter] Failed to convert ACP update:", error);
			}
		}
		/**
		* 处理 question 请求（askuserquestion 工具的专用通道）
		*
		* 通过 `_codebuddy.ai/question` 扩展方法接收问题数据，
		* 将其转换为 tool content 并插入消息流。
		*/
		handleQuestionRequest(sessionId, data) {
			const { toolCallId, request } = data;
			const questions = request.schema?.questions || request.questions || [];
			const result = this.messageAccumulator.handleQuestionRequest(sessionId, toolCallId, questions);
			if (result) this.emitMessage(result.message);
		}
		async handlePermissionRequest(data) {
			const { requestId } = data;
			const { sessionId, options, toolCall } = data.params;
			const toolCallId = toolCall.toolCallId;
			const messageId = requestId;
			let sessionCache = this.messageCache.get(sessionId);
			const newMessage = {
				id: messageId,
				requestId: messageId,
				conversationId: sessionId,
				messageType: "assistant",
				createTime: Date.now(),
				complete: false,
				content: []
			};
			if (!sessionCache) {
				sessionCache = /* @__PURE__ */ new Map();
				this.messageCache.set(sessionId, sessionCache);
			}
			sessionCache.set(messageId, newMessage);
			if (toolCallId) this.toolCallIdToMessageId.set(`${sessionId}:${toolCallId}`, messageId);
			const rawInput = toolCall.rawInput;
			const toolCallContent = {
				type: "tool-call",
				tool: {
					id: toolCallId,
					name: rawInput?.name || "unknown",
					args: rawInput?.arguments || {},
					status: "pending",
					permissionOptions: options
				}
			};
			newMessage.content.push(toolCallContent);
			this.emitMessage(newMessage);
		}
		async respondToPermission(sessionId, requestId, permissionOptions) {
			const session = await this.lookupSession(sessionId);
			if (permissionOptions && permissionOptions.length > 0) {
				const selectedOption = permissionOptions[0];
				if (selectedOption.kind === "allow_once" || selectedOption.kind === "allow_always") session.resolvePermission(requestId, selectedOption.optionId);
				else session.rejectPermission(requestId, "User rejected");
			} else session.rejectPermission(requestId, "User cancelled");
		}
		async setMode(sessionId, modeId) {
			const serverModeId = mapUIModeToServer(modeId);
			await (await this.lookupSession(sessionId)).setMode(serverModeId);
		}
		async setSessionModel(sessionId, modelId) {
			await (await this.lookupSession(sessionId)).setSessionModel(modelId);
			this.sessionModels.set(sessionId, modelId);
		}
		async initializeWorkspace(cwd, mcpServers = []) {
			try {
				this.disconnectAndCleanSession();
				return await this.client.sessions.initializeWorkspace({
					cwd,
					mcpServers
				});
			} catch (error) {
				return {
					success: false,
					error: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		async getCurrentWorkspaces(filter) {
			try {
				return await this.client.sessions.getCurrentWorkspaces(filter);
			} catch (error) {
				return [];
			}
		}
		async getAutomationSnapshot() {
			return {
				automations: [],
				inbox: [],
				runtimeState: {},
				updatedAt: Date.now()
			};
		}
		async updateAutomation(_payload) {
			return {
				success: false,
				message: "Automation is only supported in local environment"
			};
		}
		async deleteAutomation(_id) {
			return {
				success: false,
				message: "Automation is only supported in local environment"
			};
		}
		async archiveAutomationInboxItem(_itemId) {
			return {
				success: false,
				message: "Automation is only supported in local environment"
			};
		}
		async deleteAutomationInboxItem(_itemId) {
			return {
				success: false,
				message: "Automation is only supported in local environment"
			};
		}
		async testAutomation(_id) {
			return {
				success: false,
				message: "Automation is only supported in local environment"
			};
		}
		async openWorkspace(currentConversation, _needActivated, _executeCommand) {
			return {
				success: false,
				error: "Opening workspace is only supported in local environment"
			};
		}
		async writeFile(sessionId, path, content, options) {
			try {
				const session = await this.lookupSession(sessionId);
				const writeOpts = options?.allowedDirs?.length ? { allowedDirs: options.allowedDirs } : void 0;
				await session.files.write(path, content, writeOpts);
				return { success: true };
			} catch (error) {
				return {
					success: false,
					error: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		async readFile(sessionId, path, format = "text") {
			try {
				return {
					success: true,
					content: await (await this.lookupSession(sessionId)).files.read(path, { format })
				};
			} catch (error) {
				return {
					success: false,
					error: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		async listDirectory(sessionId, path, depth = 1) {
			try {
				const entries = await (await this.lookupSession(sessionId)).files.list(path, { depth });
				return this.convertEntriesToTreeNodes(entries, path, depth);
			} catch (error) {
				console.error("[CloudAgentAdapter] listDirectory failed:", error);
				return [];
			}
		}
		async watchDirectory(sessionId, path, callback) {
			try {
				const watchHandle = await (await this.lookupSession(sessionId)).files.watchDir(path, (event) => {
					const fullPath = event.path || `${path}/${event.name}`;
					callback({
						type: this.mapFilesystemEventType(event.type),
						path: fullPath
					});
				}, { recursive: true });
				return async () => {
					await watchHandle.stop();
				};
			} catch (error) {
				return () => {};
			}
		}
		/**
		* 订阅单个 sandbox 文件变更。
		*
		* 实现策略：从 `currentSession` 取当前 sandbox session，调 `files.watchDir`
		* 监听文件所在目录（envd 不支持单文件 watch，watchDir 是目录粒度）；
		* 在事件回调里按 name 过滤命中当前文件时触发 callback。
		*
		* 严格 sync 返回 unsubscribe（避免 React useEffect cleanup 异步带来的竞态）；
		* 异步握手（watchDir 建 watcher）在后台完成，握手完成前 unsubscribe 已被调用
		* 也会正确取消（`stopped` 标志位 + 释放 handle）。
		*
		* 实现对照 `WorkbuddyAgentAdapterNext.subscribeFileChange`
		* (packages/workbuddy-app/src/adapter/workbuddy-agent-adapter-next.ts:23035)
		* 与 `ProjectChatService.subscribeFileChange`
		* (packages/workbuddy-server/src/project/project-chat-service.ts:1184)。
		*/
		subscribeFileChange(filePath, callback) {
			const lastSlash = filePath.lastIndexOf("/");
			const dir = lastSlash > 0 ? filePath.substring(0, lastSlash) : "/";
			const fileName = lastSlash >= 0 ? filePath.substring(lastSlash + 1) : filePath;
			if (!fileName) {
				console.warn("[CloudAgentAdapter] subscribeFileChange: empty fileName from path:", filePath);
				return () => {};
			}
			let stopped = false;
			let watchHandle;
			(async () => {
				const session = this.currentSession;
				if (!session) return;
				if (stopped) return;
				try {
					const handle = await session.files.watchDir(dir, (event) => {
						if (stopped) return;
						if (event.name === fileName) try {
							callback();
						} catch (err) {
							console.error("[CloudAgentAdapter] subscribeFileChange callback error:", String(err));
						}
					}, { recursive: false });
					if (stopped) {
						try {
							await handle.stop();
						} catch (err) {
							console.warn("[CloudAgentAdapter] subscribeFileChange handle.stop error:", String(err));
						}
						return;
					}
					watchHandle = handle;
				} catch (err) {
					console.error("[CloudAgentAdapter] subscribeFileChange watchDir failed:", {
						filePath,
						dir,
						error: err instanceof Error ? err.message : String(err)
					});
				}
			})();
			return () => {
				if (stopped) return;
				stopped = true;
				if (watchHandle) {
					watchHandle.stop().catch((err) => {
						console.warn("[CloudAgentAdapter] subscribeFileChange stop error:", String(err));
					});
					watchHandle = void 0;
				}
			};
		}
		async injectSystemMessage(params) {
			try {
				const backendWithInject = this.backendProvider;
				if (typeof backendWithInject?.injectSystemMessage === "function") return await backendWithInject.injectSystemMessage(params);
				return { success: true };
			} catch (error) {
				console.error("[CloudAgentAdapter] injectSystemMessage failed:", error);
				return {
					success: false,
					error: error.message || "Unknown error"
				};
			}
		}
		async getAccount() {
			if (!this.backendProvider) return null;
			try {
				return await this.backendProvider.getAccount();
			} catch (error) {
				return null;
			}
		}
		async getAccountUsage() {
			if (!this.backendProvider?.getAccountUsage) return null;
			try {
				return await this.backendProvider.getAccountUsage();
			} catch (error) {
				return null;
			}
		}
		async getCheckinStatus() {
			if (!this.backendProvider?.getCheckinStatus) return null;
			try {
				return await this.backendProvider.getCheckinStatus();
			} catch (error) {
				return null;
			}
		}
		async claimDailyCheckin() {
			if (!this.backendProvider?.claimDailyCheckin) throw new Error("claimDailyCheckin not available");
			return await this.backendProvider.claimDailyCheckin();
		}
		async getGrowthBuddy() {
			if (!this.backendProvider?.getGrowthBuddy) return null;
			try {
				return await this.backendProvider.getGrowthBuddy();
			} catch (error) {
				console.error("[CloudAgentAdapter] getGrowthBuddy failed:", error);
				return null;
			}
		}
		async login() {
			if (!this.backendProvider) {
				const redirectUrl = encodeURIComponent(window.location.href);
				window.location.href = `${window.location.origin}/login?redirect=${redirectUrl}`;
				return;
			}
			await this.backendProvider.login();
		}
		async savePendingInput(code) {
			return await this.backendProvider?.savePendingInput?.(code) ?? null;
		}
		async loadPendingInput(codeId) {
			return await this.backendProvider?.loadPendingInput?.(codeId) ?? null;
		}
		async logout() {
			if (this.backendProvider) await this.backendProvider.logout();
		}
		/**
		* 获取用户连接器列表
		* 委托给 BackendProvider 处理
		*/
		async getUserConnector() {
			if (!this.backendProvider) throw new Error("No backendProvider configured");
			return await this.backendProvider.getUserConnector();
		}
		/**
		* 修改用户连接器连接状态
		* 委托给 BackendProvider 处理
		*/
		async modifyUserConnectorConnectStatus(request) {
			if (!this.backendProvider) throw new Error("No backendProvider configured");
			return await this.backendProvider.modifyUserConnectorConnectStatus(request);
		}
		/**
		* 修改用户连接器仓库
		* 委托给 BackendProvider 处理
		*/
		async modifyUserConnectorRepo(request) {
			if (!this.backendProvider) throw new Error("No backendProvider configured");
			return await this.backendProvider.modifyUserConnectorRepo(request);
		}
		/**
		* 修改用户连接器激活状态
		* 委托给 BackendProvider 处理
		*/
		async modifyUserConnectorActiveStatus(request) {
			if (!this.backendProvider) throw new Error("No backendProvider configured");
			return await this.backendProvider.modifyUserConnectorActiveStatus(request);
		}
		/**
		* 删除用户连接器
		* 委托给 BackendProvider 处理
		*/
		async deleteUserConnector(name) {
			if (!this.backendProvider) throw new Error("No backendProvider configured");
			return await this.backendProvider.deleteUserConnector(name);
		}
		/**
		* 添加任务
		* 委托给 BackendProvider 处理
		*/
		async addConnectorTask(request) {
			if (!this.backendProvider) throw new Error("No backendProvider configured");
			return await this.backendProvider.addConnectorTask(request);
		}
		/**
		* 获取任务连接器列表
		* 委托给 BackendProvider 处理
		*/
		async getTaskConnector(taskId) {
			if (!this.backendProvider) throw new Error("No backendProvider configured");
			return await this.backendProvider.getTaskConnector(taskId);
		}
		/**
		* 修改任务连接器激活状态
		* 委托给 BackendProvider 处理
		*/
		async modifyTaskConnectorActiveStatus(request) {
			if (!this.backendProvider) throw new Error("No backendProvider configured");
			return await this.backendProvider.modifyTaskConnectorActiveStatus(request);
		}
		/**
		* 修改任务连接器仓库
		* 委托给 BackendProvider 处理
		*/
		async modifyTaskConnectorRepo(request) {
			if (!this.backendProvider) throw new Error("No backendProvider configured");
			return await this.backendProvider.modifyTaskConnectorRepo(request);
		}
		/**
		* oauth回调，后端用第三方的code换token的
		* 委托给 BackendProvider 处理
		*/
		async saveOauthToken(request) {
			if (!this.backendProvider) throw new Error("No backendProvider configured");
			return await this.backendProvider.saveOauthToken(request);
		}
		/**
		* 获取OAuth连接器的仓库列表
		*/
		async getRepoList(request) {
			if (!this.backendProvider) throw new Error("No backendProvider configured");
			return await this.backendProvider.getRepoList(request);
		}
		/**
		* 撤销OAuth连接器的所有连接
		*/
		async revokeAll(request) {
			if (!this.backendProvider) throw new Error("No backendProvider configured");
			return await this.backendProvider.revokeAll(request);
		}
		/**
		* 获取 OAuth 用户信息
		*/
		async getOauthUser(request) {
			if (!this.backendProvider) throw new Error("No backendProvider configured");
			return await this.backendProvider.getOauthUser(request);
		}
		/**
		* 获取文件信息
		*/
		async getFile(request) {
			if (!this.backendProvider) throw new Error("No backendProvider configured");
			return await this.backendProvider.getFile(request);
		}
		async getModels(cwd) {
			try {
				let url = `/console/enterprises/${accountService.getAccount()?.enterpriseId || "personal"}/models`;
				if (cwd) url += `?repos[]=${encodeURIComponent(cwd)}`;
				const resp = await httpService.get(url);
				const payload = resp.data ?? resp;
				const allModels = payload.models ?? [];
				const agents = payload.agents ?? [];
				try {
					const provider = this.client.provider;
					if (provider && !provider.productConfigCache) provider.productConfigCache = payload;
				} catch {}
				const cliModelIds = agents.find((a) => a.name === "cli")?.models ?? [];
				return (cliModelIds.length > 0 ? allModels.filter((m) => cliModelIds.includes(m.id)) : allModels).map((m) => ({
					id: m.id,
					name: m.name ?? m.id,
					description: m.description,
					credits: m.credits,
					configurable: m.configurable,
					configured: m.configured,
					isDefault: m.isDefault,
					supportsImages: m.supportsImages,
					supportsReasoning: m.supportsReasoning,
					onlyReasoning: m.onlyReasoning,
					reasoning: m.reasoning,
					disabledMultimodal: m.disabledMultimodal,
					disabled: m.disabled,
					disabledReason: m.disabledReason,
					disabledAction: m.disabledAction
				}));
			} catch (error) {
				console.warn("[CloudAgentAdapter] getModels via HTTP failed, fallback to ACP SDK:", error);
				return this.client.sessions.models.list(cwd || "");
			}
		}
		static {
			this.DEFAULT_FEATURE_TOGGLES = {
				Connector: true,
				DisableShareFeature: true,
				DisableSlotSystem: true
			};
		}
		static {
			this.DEFAULT_CREDIT_ACTIONS = {
				"14018": {
					labelZh: "获取 Credits",
					labelEn: "Get credits",
					url: "https://www.codebuddy.cn/profile/plan",
					showButton: true
				},
				"6004": {
					labelZh: "升级专业版",
					labelEn: "Upgrade to Pro",
					url: "https://www.codebuddy.cn/profile/plan",
					showButton: true
				},
				"6005": {
					labelZh: "升级专业版",
					labelEn: "Upgrade to Pro",
					url: "https://www.codebuddy.cn/profile/plan",
					showButton: true
				}
			};
		}
		/**
		* 获取产品配置（用于限额错误弹窗）
		* 包含 creditPurchaseActions
		*
		* @returns Promise<{ creditPurchaseActions: Record<string, CreditPurchaseActionConfig> }> 配置（始终返回，包含默认值）
		*/
		async getProductConfig() {
			try {
				const provider = this.client.provider;
				if (!provider || typeof provider.getCreditPurchaseActions !== "function") {
					console.warn("[CloudAgentAdapter] Provider does not support getCreditPurchaseActions, using default");
					return { creditPurchaseActions: CloudAgentAdapter.DEFAULT_CREDIT_ACTIONS };
				}
				let creditPurchaseActions = provider.getCreditPurchaseActions();
				if (!provider.productConfigCache) {
					console.log("[CloudAgentAdapter] Product config cache empty, initializing...");
					await this.getModels();
					creditPurchaseActions = provider.getCreditPurchaseActions();
				}
				return { creditPurchaseActions };
			} catch (error) {
				console.error("[CloudAgentAdapter] getProductConfig failed:", error);
				return { creditPurchaseActions: CloudAgentAdapter.DEFAULT_CREDIT_ACTIONS };
			}
		}
		async getPresignedUrls(objectKeys) {
			const resp = await httpService.post("/console/as/support/presigned_url", { object_keys: objectKeys });
			if (!resp.data) throw new Error("No data in presigned URL response");
			return resp.data;
		}
		/**
		* 获取产品配置（用于判断部署类型和品牌配置）
		* 包含 deploymentType 和 channelBranding（从 v3/config API 获取，Web 特有）
		*
		* @returns Promise<{ deploymentType?: string; channelBranding?: {...} }> 配置
		*/
		async getProductConfiguration() {
			try {
				const provider = this.client.provider;
				let deploymentType;
				if (provider && typeof provider.getDeploymentType === "function") {
					if (!provider.productConfigCache) {
						console.log("[CloudAgentAdapter] Product config cache empty, initializing...");
						await this.getModels();
					}
					deploymentType = provider.getDeploymentType();
				} else deploymentType = "SaaS";
				let channelBranding = void 0;
				let allowSkills;
				let modelGroups;
				try {
					const configResponse = await httpService.get("/v3/config");
					channelBranding = configResponse?.config?.channelBranding;
					const raw = configResponse?.config?.allowSkills;
					if (Array.isArray(raw)) allowSkills = raw.filter((s) => typeof s === "string" && s.length > 0);
					const rawGroups = configResponse?.config?.modelGroups;
					if (Array.isArray(rawGroups) && rawGroups.length > 0) modelGroups = rawGroups;
				} catch (error) {
					console.warn("[CloudAgentAdapter] Failed to fetch v3/config for channelBranding:", error);
				}
				return {
					deploymentType,
					channelBranding,
					modelGroups,
					allowSkills
				};
			} catch (error) {
				console.error("[CloudAgentAdapter] getProductConfiguration failed:", error);
				return { deploymentType: "SaaS" };
			}
		}
		/**
		* 获取产品功能开关
		* 从 models 接口返回的 productFeatures 中读取
		* 兜底逻辑：如果返回的功能开关中没有 Connector 字段，默认为 true
		*
		* @returns Promise<Record<string, boolean> | undefined> 功能开关
		*/
		async getProductFeatures() {
			const runtimeFeatures = readRuntimeProductFeatures() ?? {};
			try {
				const provider = this.client.provider;
				if (!provider || typeof provider.getProductFeatures !== "function") return {
					...CloudAgentAdapter.DEFAULT_FEATURE_TOGGLES,
					...runtimeFeatures
				};
				if (!provider.productConfigCache) await this.getModels();
				const features = provider.getProductFeatures();
				if (!features) return {
					...CloudAgentAdapter.DEFAULT_FEATURE_TOGGLES,
					...runtimeFeatures
				};
				return {
					...CloudAgentAdapter.DEFAULT_FEATURE_TOGGLES,
					...features,
					...runtimeFeatures
				};
			} catch (error) {
				console.error("[CloudAgentAdapter] getProductFeatures failed:", error);
				return {
					...CloudAgentAdapter.DEFAULT_FEATURE_TOGGLES,
					...runtimeFeatures
				};
			}
		}
		/**
		* 获取产品链接配置
		* 从 models 接口返回的 links 中读取
		*/
		async getProductLinks(forceUpdate) {
			try {
				const provider = this.client.provider;
				if (!provider) return;
				if (forceUpdate && provider.productConfigCache) provider.productConfigCache = void 0;
				if (!provider.productConfigCache) await this.getModels();
				const links = provider.productConfigCache?.links;
				if (!links) return;
				if (links.poiCityTreeUrl) setCityTreeUrl(links.poiCityTreeUrl);
				return {
					craftFeedback: links.craftFeedback || links.issueFeedback,
					mcpMarketUrl: links.mcpMarketUrl,
					mcpDocumentUrl: links.mcpDocumentUrl,
					helpDocument: CLOUD_HELP_DOCUMENT_URL,
					creditsRedirectUrl: links.creditsRedirectUrl,
					poiCityTreeUrl: links.poiCityTreeUrl
				};
			} catch (error) {
				console.error("[CloudAgentAdapter] getProductLinks failed:", error);
				return;
			}
		}
		/**
		* 在外部浏览器中打开链接
		* Cloud 环境直接使用 window.open
		*/
		async openExternal(url) {
			window.open(url, "_blank", "noopener,noreferrer");
		}
		/**
		* 获取用户信息（包含 enterpriseId）
		* 用于判断是否为个人版用户
		*
		* @returns Promise<{ enterpriseId?: string } | undefined> 用户信息，如果未登录则返回 undefined
		*/
		async getUserInfo() {
			try {
				const account = accountService.getAccount();
				if (!account) return;
				return { enterpriseId: account.enterpriseId };
			} catch (error) {
				console.error("[CloudAgentAdapter] getUserInfo failed:", error);
				return;
			}
		}
		static {
			this.HIDDEN_COMMANDS = new Set([
				"cnb-connector",
				"figma-connector",
				"github-connector",
				"gongfeng-connector"
			]);
		}
		async getProductName() {
			return isWorkBuddy() ? getBrandName() : "CodeBuddy";
		}
		async getAvailableCommands(params) {
			try {
				const sessionId = params?.sessionId;
				if (!sessionId) return [];
				return ((await this.lookupSession(sessionId)).availableCommands || []).filter((cmd) => !CloudAgentAdapter.HIDDEN_COMMANDS.has(cmd.name));
			} catch (error) {
				return [];
			}
		}
		async archiveSession(sessionId) {
			try {
				await this.client.sessions.archive(sessionId);
				this.sessionConfigs.delete(sessionId);
				this.sessionModels.delete(sessionId);
				this.messageCache.delete(sessionId);
				this.messageAccumulator.clear(sessionId);
				return { success: true };
			} catch (error) {
				return {
					success: false,
					error: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		async unarchiveSession(sessionId, restoreStatus = "completed") {
			try {
				await this.client.sessions.updateStatus(sessionId, restoreStatus);
				return { success: true };
			} catch (error) {
				return {
					success: false,
					error: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		/**
		* 删除会话（硬删除，不可恢复）
		* 通过 client.sessions.delete() 删除会话，不删除工作空间目录
		*
		* @param sessionId 会话 ID（即 Agent ID）
		* @returns Promise<{ success: boolean; error?: string }> 删除结果
		*/
		async deleteSession(sessionId) {
			try {
				await this.client.sessions.delete(sessionId);
				this.sessionConfigs.delete(sessionId);
				this.sessionModels.delete(sessionId);
				this.messageCache.delete(sessionId);
				this.messageAccumulator.clear(sessionId);
				return { success: true };
			} catch (error) {
				return {
					success: false,
					error: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		/**
		* 删除工作空间及其所有任务
		* 获取该工作空间路径下的所有 session，逐个删除
		*/
		async deleteWorkspaceAndFiles(workspacePath) {
			try {
				const deletePromises = (await this.client.sessions.list()).agents.filter((s) => s.cwd === workspacePath).map(async (session) => {
					try {
						await this.client.sessions.delete(session.id);
						this.sessionConfigs.delete(session.id);
						this.sessionModels.delete(session.id);
						this.messageCache.delete(session.id);
						this.messageAccumulator.clear(session.id);
					} catch (error) {
						console.error(`[CloudAgentAdapter] deleteWorkspaceAndFiles: failed to delete session ${session.id}:`, error);
					}
				});
				await Promise.all(deletePromises);
				return { success: true };
			} catch (error) {
				return {
					success: false,
					error: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		async renameSession(sessionId, title) {
			try {
				await this.client.sessions.rename(sessionId, title);
				return { success: true };
			} catch (error) {
				return {
					success: false,
					error: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		async toolCallback(sessionId, toolCallId, toolName, action) {
			try {
				return await (await this.lookupSession(sessionId)).toolCallback(toolCallId, toolName, action) || { success: true };
			} catch (error) {
				return {
					success: false,
					error: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		/**
		* 回答问题请求 (askuserquestion 工具)
		* 将用户的回答作为 tool result 发送给 Agent
		*/
		answerQuestion(sessionId, toolCallId, answers) {
			try {
				if (!this.currentSession || this.currentSession.id !== sessionId) {
					console.error("[CloudAgentAdapter] answerQuestion: session not found or mismatch");
					return {
						success: false,
						error: "SESSION_MISMATCH",
						message: `Expected session ${sessionId}, current: ${this.currentSession?.id || "none"}`
					};
				}
				if (!this.currentSession.answerQuestion(toolCallId, answers)) {
					console.error("[CloudAgentAdapter] answerQuestion: question not found in pending, toolCallId:", toolCallId);
					this.updateToolStatusToFailed(sessionId, toolCallId);
					return {
						success: false,
						error: "QUESTION_NOT_FOUND",
						message: `Question ${toolCallId} not found (may have timed out or already answered)`
					};
				}
				const questionAnswer = {
					questions: this.getQuestionsFromTool(toolCallId).map((q) => {
						const answer = answers[q.id];
						const answerArray = Array.isArray(answer) ? answer : [answer];
						const questionText = typeof q.question === "string" ? q.question : "";
						return {
							id: q.id,
							question: questionText,
							answers: answerArray
						};
					}),
					title: this.getToolTitle(toolCallId)
				};
				const updateResult = this.messageAccumulator.updateToolStatus(sessionId, toolCallId, "executed", {
					questionAnswer,
					questionSkipped: false
				});
				if (updateResult) this.emitMessage(updateResult.message);
				return true;
			} catch (error) {
				console.error("[CloudAgentAdapter] answerQuestion failed:", error);
				this.updateToolStatusToFailed(sessionId, toolCallId);
				return {
					success: false,
					error: "UNKNOWN_ERROR",
					message: error instanceof Error ? error.message : String(error)
				};
			}
		}
		/**
		* 取消问题请求 (askuserquestion 工具)
		* 用户选择跳过问题
		*/
		cancelQuestion(sessionId, toolCallId, reason) {
			try {
				if (!this.currentSession || this.currentSession.id !== sessionId) {
					console.error("[CloudAgentAdapter] cancelQuestion: session not found or mismatch");
					return false;
				}
				const result = this.currentSession.cancelQuestion(toolCallId, reason);
				if (result) {
					const updateResult = this.messageAccumulator.updateToolStatus(sessionId, toolCallId, "executed", { questionSkipped: true });
					if (updateResult) this.emitMessage(updateResult.message);
				}
				return result;
			} catch (error) {
				console.error("[CloudAgentAdapter] cancelQuestion failed:", error);
				return false;
			}
		}
		/**
		* 更新工具状态为 failed（问卷失效，如超时）
		* 用于在 answerQuestion 失败时隐藏 UI 上的问卷
		*/
		updateToolStatusToFailed(sessionId, toolCallId) {
			const updateResult = this.messageAccumulator.updateToolStatus(sessionId, toolCallId, "failed");
			if (updateResult) this.emitMessage(updateResult.message);
		}
		/**
		* 获取工具的标题（用于构造 questionAnswer）
		*/
		getToolTitle(toolCallId) {
			if (!this.currentSession) return;
			const state = this.messageAccumulator.getState(this.currentSession.id);
			if (!state) return;
			const index = state.toolCallIdToIndex.get(toolCallId);
			if (index === void 0) return;
			const block = state.contentBlocks[index];
			if (block.type !== "tool-call") return;
			return block.tool.args?.title || void 0;
		}
		/**
		* 获取工具的问题列表（用于构造 questionAnswer）
		*/
		getQuestionsFromTool(toolCallId) {
			if (!this.currentSession) return [];
			const state = this.messageAccumulator.getState(this.currentSession.id);
			if (!state) return [];
			const index = state.toolCallIdToIndex.get(toolCallId);
			if (index === void 0) return [];
			const block = state.contentBlocks[index];
			if (block.type !== "tool-call") return [];
			const args = block.tool.args;
			if (!args || !Array.isArray(args.questions)) return [];
			return args.questions;
		}
		async buildPlan(data) {
			this.emit("build-plan", data);
			const request = {
				sessionId: data.sessionId,
				prompt: [{
					type: "text",
					text: "接受计划并立即开始"
				}]
			};
			const userMessageId = `build-plan-${Date.now()}`;
			return this.sendMessage(request, userMessageId);
		}
		viewPlan(params) {
			this.emit("view-plan", params);
		}
		downloadPlan(params) {
			this.emit("download-plan", params);
		}
		async pickFile(params) {
			try {
				return await this.client.sessions.pickFile(params);
			} catch (error) {
				return {
					files: [],
					canceled: true,
					error: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		async pickFolder(params) {
			return {
				folderPaths: [],
				canceled: true,
				error: "Folder picker is not supported in cloud environment"
			};
		}
		async uploadFile(params) {
			try {
				return await this.client.sessions.uploadFile(params);
			} catch (error) {
				return {
					success: false,
					error: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		async searchFile(params) {
			try {
				return await this.client.sessions.searchFile(params);
			} catch (error) {
				return {
					results: [],
					error: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		/**
		* 获取模板场景列表（Web/Cloud 环境）
		* 通过 CloudAgentProvider 直接调用后端 API 获取支持的场景列表
		*
		* 调用链：
		* 1. useTemplates hook 调用 adapter.getTemplates()
		* 2. CloudAgentAdapter.getTemplates() 调用 client.sessions.getSupportScenes()
		* 3. AgentClient.sessions.getSupportScenes() -> CloudAgentProvider.getSupportScenes()
		* 4. CloudAgentProvider -> HTTP GET /console/as/support/scenes
		* 5. 返回 SupportScene[] 转换为 TemplateScene[]
		* 6. useTemplates 将数据提供给 QuickActions 组件展示
		*
		* 注意：IDE 环境使用 AgentNewAdapter，通过 ACP 协议调用 Extension Host
		*
		* @param locale - 可选，语言环境（如 'zh-CN', 'en-US'），用于获取对应语言的场景数据
		*/
		async getTemplates(locale) {
			try {
				return (await this.client.sessions.getSupportScenes(locale)).filter((scene) => scene.prompts && scene.prompts.length > 0).filter((scene) => !scene.target || scene.target === "all" || scene.target === "cloud");
			} catch (error) {
				console.error("[CloudAgentAdapter] getTemplates failed:", error);
				return [];
			}
		}
		/**
		* 获取仓库分支列表（Web/Cloud 环境）
		* 通过 BackendProvider 直接调用后端 API 获取分支列表
		*
		* @param connector 连接器名称 ('github' | 'gongfeng' | 'cnb')
		* @param params 平台特定的查询参数
		* @param page 页码，从1开始，0表示不分页获取全部
		* @param perPage 每页数量，最大100
		* @returns Promise<OauthBranch[]> 分支列表
		*/
		async getBranches(connector, params, page = 0, perPage = 100) {
			console.info("[CloudAgentAdapter][getBranches] enter", {
				connector,
				params,
				page,
				perPage
			});
			if (!this.backendProvider) {
				console.warn("[CloudAgentAdapter][getBranches] No backendProvider configured, return []");
				return [];
			}
			if (typeof this.backendProvider.getBranches !== "function") {
				console.warn("[CloudAgentAdapter][getBranches] backendProvider.getBranches is not a function", { providerKeys: Object.keys(this.backendProvider) });
				return [];
			}
			try {
				const branches = await this.backendProvider.getBranches(connector, params, page, perPage);
				console.info("[CloudAgentAdapter][getBranches] success", {
					connector,
					count: Array.isArray(branches) ? branches.length : 0,
					sample: Array.isArray(branches) ? branches.slice(0, 3) : branches
				});
				return branches ?? [];
			} catch (error) {
				console.error("[CloudAgentAdapter][getBranches] failed", {
					connector,
					params,
					error
				});
				throw error;
			}
		}
		/**
		* 获取仓库列表（Web/Cloud 环境）
		* 通过 BackendProvider 直接调用后端 API 获取仓库列表
		*
		* Note: 由于工蜂原生支持的 Search 能力会匹配 path/name/description 部分，
		* 且不支持定制，不满足产品要求（只按 name 匹配），因此前端拉取全量数据后做筛选。
		*
		* @param connector 连接器名称 ('github' | 'gongfeng' | 'cnb')
		* @param page 页码，从1开始，0表示不分页获取全部
		*             - GitHub 只支持全量数据，必须传 0
		*             - 工蜂和 CNB 依据前端逻辑而定
		* @param perPage 每页数量，最大100
		* @returns Promise<ListReposResponse> 仓库列表响应
		*/
		async getRepositories(connector, page = 0, perPage = 100) {
			try {
				if (!this.backendProvider) {
					console.warn("[CloudAgentAdapter] No backendProvider configured");
					return {};
				}
				return await this.backendProvider.getRepositories?.(connector, page, perPage) ?? {};
			} catch (error) {
				console.error("[CloudAgentAdapter] getRepositories failed:", error);
				return {};
			}
		}
		emit(event, data) {
			if (event === "open-external") {
				const url = data;
				if (url) try {
					const parsedUrl = new URL(url, window.location.href);
					const link = document.createElement("a");
					link.href = parsedUrl.toString();
					link.target = "_blank";
					link.rel = "noopener noreferrer";
					link.style.display = "none";
					document.body.appendChild(link);
					link.click();
					document.body.removeChild(link);
				} catch (error) {
					console.error("[CloudAgentAdapter] open-external failed:", error);
				}
				return;
			}
			console.warn("[CloudAgentAdapter] emit() called:", event, data);
		}
		on(event, callback) {
			if (event === "account-changed") {
				const { accountService } = (init_common(), __toCommonJS(common_exports));
				return accountService.subscribe((account) => {
					callback(account);
				});
			}
			return () => {};
		}
		onMessage(callback) {
			this.messageCallbacks.add(callback);
			return () => {
				this.messageCallbacks.delete(callback);
			};
		}
		onError(callback) {
			this.errorCallbacks.add(callback);
			return () => {
				this.errorCallbacks.delete(callback);
			};
		}
		onCheckpoint(callback) {
			this.checkpointCallbacks.add(callback);
			return () => {
				this.checkpointCallbacks.delete(callback);
			};
		}
		onArtifactUpdate(callback) {
			this.artifactCallbacks.add(callback);
			return () => {
				this.artifactCallbacks.delete(callback);
			};
		}
		onTaskUpdate(callback) {
			this.taskUpdateCallbacks.add(callback);
			return () => {
				this.taskUpdateCallbacks.delete(callback);
			};
		}
		requestSendPrompt(data) {
			this.sendPromptRequestCallbacks.forEach((callback) => {
				try {
					callback(data);
				} catch (err) {
					console.error("[CloudAgentAdapter] Send prompt request callback error:", err);
				}
			});
		}
		onSendPromptRequest(callback) {
			this.sendPromptRequestCallbacks.add(callback);
			return () => {
				this.sendPromptRequestCallbacks.delete(callback);
			};
		}
		/**
		* 获取消息请求跟踪器
		* 用于管理临时消息 ID 和 requestId 的关联
		*/
		getPendingMessageTracker() {
			return this.pendingMessageTracker;
		}
		async getNetDriveAccessToken(params) {
			const pid = params.projectId;
			const apiPath = pid ? `/console/as/netdrive/projects/${pid}/access-token` : "/console/as/netdrive/access-token";
			console.log("[CloudAgentAdapter] getNetDriveAccessToken:", {
				projectId: pid,
				apiPath
			});
			const resp = await httpService.post(apiPath, {});
			const data = resp?.data ?? resp;
			const result = data?.data?.accessToken ? data.data : data?.accessToken ? data : data?.data ?? data;
			if (!result?.success && data?.code !== 0 && !result?.accessToken) throw new Error(result?.error || data?.msg || "获取网盘 token 失败");
			return {
				success: true,
				accessToken: result.accessToken,
				refreshToken: result.refreshToken,
				tokenType: result.tokenType || "Bearer",
				expiresIn: result.expiresIn,
				userId: result.userId,
				scope: result.scope || "all",
				edition: result.edition,
				tenantId: result.tenantId,
				spaceId: result.spaceId,
				projectId: result.projectId || pid || "",
				clientId: result.clientId,
				appId: result.appId,
				actions: result.actions,
				resources: result.resources,
				baseUrl: result.baseUrl,
				envName: result.envName,
				envId: result.envId,
				dirName: result.dirName
			};
		}
		async getNetDriveNicknames(params) {
			const pid = params.projectId;
			const apiPath = pid ? `/console/as/netdrive/projects/${pid}/nicknames` : "/console/as/netdrive/nicknames";
			try {
				const resp = await httpService.post(apiPath, { netdriveUserIds: params.netdriveUserIds });
				const data = resp?.data ?? resp;
				const result = data?.data ?? data;
				return {
					success: true,
					nicknames: result.nicknames || {},
					notFound: result.notFound || [],
					data: result
				};
			} catch (error) {
				console.error("[CloudAgentAdapter] getNetDriveNicknames failed:", error);
				return {
					success: false,
					nicknames: {},
					notFound: params.netdriveUserIds,
					data: null
				};
			}
		}
		async getNetDrivePurchaseCode() {
			const apiPath = "/console/as/netdrive/issue-jump-code";
			try {
				return {
					success: true,
					code: ((await httpService.get(apiPath))?.data || {}).jumpCode || ""
				};
			} catch (error) {
				console.error("[CloudAgentAdapter] getNetDrivePurchaseCode failed:", error);
				return {
					success: false,
					code: ""
				};
			}
		}
		async getNetDriveEnterpriseInfo() {
			const apiPath = "/console/as/netdrive/enterprise-info";
			try {
				return {
					success: true,
					encrypted: ((await httpService.post(apiPath, {}))?.data || {}).encrypted || ""
				};
			} catch (error) {
				console.error("[CloudAgentAdapter] getNetDriveEnterpriseInfo failed:", error);
				return {
					success: false,
					encrypted: ""
				};
			}
		}
		destroy() {
			this.client.dispose();
			this.messageCallbacks.clear();
			this.errorCallbacks.clear();
			this.checkpointCallbacks.clear();
			this.artifactCallbacks.clear();
			this.taskUpdateCallbacks.clear();
			this.sendPromptRequestCallbacks.clear();
			this.insertContentBlocksRequestCallbacks.clear();
			this.pendingInsertRequest = null;
			this.openBrowserCallbacks.clear();
			this.openResultViewCallbacks.clear();
			this.browserUrlCache.clear();
			this.messageCache.clear();
			this.sessionConfigs.clear();
			this.messageAccumulator.clearAll();
			this.pendingMessageTracker.clearAll();
			this.backgroundSessions.forEach((session) => {
				try {
					session.disconnect();
				} catch (error) {
					console.error("[CloudAgentAdapter] Error disconnecting background session on destroy:", error);
				}
			});
			this.backgroundSessions.clear();
		}
		/**
		* Issue #65298 · Blocker3：把某个后台会话标记为"最近使用"（LRU 刷新）。
		* Map 保持插入顺序，delete→set 会把该 key 移动到队尾，代表最近访问。
		* 在 lookupSession / loadSession 命中 backgroundSessions 复用时调用。
		*/
		touchBackgroundSession(sessionId) {
			const session = this.backgroundSessions.get(sessionId);
			if (session) {
				this.backgroundSessions.delete(sessionId);
				this.backgroundSessions.set(sessionId, session);
			}
		}
		/**
		* Issue #65298 · Blocker3：将 backgroundSessions 数量裁剪到 MAX_BACKGROUND_SESSIONS。
		* 淘汰最久未用（Map 队首）的会话——真正 disconnect 其 SSE 连接并清理累积缓存，防止
		* teams 高频切换下 SSE 连接与内存无上限增长。current 会话不在此 Map 中，不受影响。
		*/
		enforceBackgroundSessionLimit() {
			while (this.backgroundSessions.size > CloudAgentAdapter.MAX_BACKGROUND_SESSIONS) {
				const oldestId = this.backgroundSessions.keys().next().value;
				if (!oldestId) break;
				const oldest = this.backgroundSessions.get(oldestId);
				this.backgroundSessions.delete(oldestId);
				try {
					oldest?.disconnect();
				} catch (error) {
					console.error("[CloudAgentAdapter] Error disconnecting evicted background session:", error);
				}
				this.messageAccumulator.clear(oldestId);
				this.messageCache.delete(oldestId);
				this.clearProcessedOffsets(oldestId);
				console.log("[CloudAgentAdapter] Evicted least-recently-used background session:", oldestId);
			}
		}
		/**
		* 断开旧 session 并清理相关状态
		*
		* 在以下场景调用：
		* 1. createNewSession - 创建新 session 前断开旧 session
		* 2. loadSession - 切换到不同 session 时断开旧 session
		* 3. initializeWorkspace - 初始化工作区时断开旧 session
		*
		* @param sessionId 可选，要清理的 session ID，默认为 currentSession
		*/
		disconnectAndCleanSession(sessionId) {
			const targetSessionId = sessionId || this.currentSession?.id;
			if (!targetSessionId) return;
			console.log("[CloudAgentAdapter] Disconnecting and cleaning session:", targetSessionId);
			if (this.currentSession && this.currentSession.id === targetSessionId) {
				try {
					this.currentSession.disconnect();
				} catch (error) {
					console.error("[CloudAgentAdapter] Error disconnecting session:", error);
				}
				this.currentSession = void 0;
			}
			const backgroundSession = this.backgroundSessions.get(targetSessionId);
			if (backgroundSession) {
				try {
					backgroundSession.disconnect();
				} catch (error) {
					console.error("[CloudAgentAdapter] Error disconnecting background session:", error);
				}
				this.backgroundSessions.delete(targetSessionId);
			}
			this.messageAccumulator.clear(targetSessionId);
			this.messageCache.delete(targetSessionId);
			this.clearProcessedOffsets(targetSessionId);
			console.log("[CloudAgentAdapter] Session disconnected and cleaned:", targetSessionId);
		}
		/**
		* 基于返回列表设置 mode
		* 策略：传入的在列表中则使用，否则用第一个，列表为空则抛错
		*/
		async resolveAndSetMode(session, requestedModeID) {
			const availableModes = session.availableModes;
			if (!availableModes || availableModes.length === 0) {
				if (requestedModeID) throw new Error(`[CloudAgentAdapter] availableModes is empty, cannot set mode: ${requestedModeID}`);
				return;
			}
			const serverModeId = requestedModeID ? mapUIModeToServer(requestedModeID) : void 0;
			const finalModeId = serverModeId && availableModes.some((m) => m.id === serverModeId) && serverModeId ? serverModeId : availableModes[0].id;
			await session.setMode(finalModeId);
		}
		/**
		* 基于返回列表设置 model
		* 策略：传入的在列表中则使用，否则用第一个，列表为空则抛错
		*/
		async resolveAndSetModel(session, requestedModelID) {
			const availableModels = session.availableModels;
			if (!availableModels || availableModels.length === 0) {
				if (requestedModelID) throw new Error(`[CloudAgentAdapter] availableModels is empty, cannot set model: ${requestedModelID}`);
				return;
			}
			const finalModelId = requestedModelID && availableModels.some((m) => m.id === requestedModelID) && requestedModelID ? requestedModelID : availableModels[0].id;
			await session.setSessionModel(finalModelId);
			this.sessionModels.set(session.id, finalModelId);
		}
		/**
		* 获取实时模型列表并校正 currentModelId。
		* 复用于 createNewSession / loadSession 两处。
		*/
		async resolveModelsResponse(session, cwd) {
			try {
				const freshModels = await this.getModels(cwd);
				if (freshModels.length > 0) {
					const currentId = session.currentModelId || "";
					return {
						availableModels: freshModels,
						currentModelId: currentId && freshModels.some((m) => m.id === currentId) ? currentId : freshModels.find((m) => m.isDefault)?.id ?? freshModels[0].id
					};
				}
			} catch {}
			if (session.availableModels) return {
				availableModels: session.availableModels,
				currentModelId: session.currentModelId || ""
			};
		}
		/**
		* Issue #65298 · Blocker2：获取指定 session 的 ActiveSession 引用「用于发指令 / 做 IO」，
		* **不改变 UI 当前活跃会话（currentSession）**。
		*
		* 背景：老的 `loadSessionInternal` 在拿 session 的同时会把它 promote 成 currentSession，
		* 并把原 currentSession 挪进 backgroundSessions。它被 respondToPermission / setMode /
		* setSessionModel / cancelMessage / read/write/listDir/watchDir / getAvailableCommands 等
		* 12 处内部方法调用——这些都是「针对某个 sessionId 发一次指令或读一次数据」的后台操作，
		* 一旦隐式 promote，就会在用户毫无操作的情况下把 UI 当前会话偷换成后台会话（例如后台会话
		* 弹权限、被 setMode）。故拆分职责：
		*   - `lookupSession`（本方法）：只解析引用，命中 current / background 直接只读返回；
		*     都没有时才真正建连，且**纳入 backgroundSessions 管理**（而非 promote current），
		*     既不误伤用户视图，也不泄漏连接。
		*   - `loadSession`（用户显式切换会话）：保留 promote / 搬运语义。
		*/
		async lookupSession(sessionId) {
			const config = this.sessionConfigs.get(sessionId);
			if (!config) throw new Error(`[CloudAgentAdapter] Session config not found for: ${sessionId}`);
			if (this.currentSession && this.currentSession.id === sessionId) return this.currentSession;
			const cached = this.backgroundSessions.get(sessionId);
			if (cached) {
				this.touchBackgroundSession(sessionId);
				return cached;
			}
			const session = await this.client.sessions.load({
				sessionId,
				cwd: config.cwd,
				mcpServers: config.mcpServers,
				onSessionCreated: (loadedSession) => {
					this.setupSessionEventListeners(loadedSession);
					this.backgroundSessions.set(loadedSession.id, loadedSession);
				}
			});
			if (!this.backgroundSessions.has(session.id) && !(this.currentSession && this.currentSession.id === session.id)) {
				this.setupSessionEventListeners(session);
				this.backgroundSessions.set(session.id, session);
			}
			this.enforceBackgroundSessionLimit();
			return session;
		}
		mapFilesystemEventType(type) {
			switch (type) {
				case "create": return "create";
				case "write":
				case "chmod": return "update";
				case "remove": return "delete";
				case "rename": return "rename";
				default: return "update";
			}
		}
		addModelToMeta(meta, modelId, modeId) {
			const existingMeta = meta || {};
			const codebuddyMeta = existingMeta["codebuddy.ai"] || {};
			return {
				...existingMeta,
				"codebuddy.ai": {
					...codebuddyMeta,
					...modelId ? { model: modelId } : {},
					...modeId ? { mode: modeId } : {}
				}
			};
		}
		convertPromptToContentBlocks(prompt, currentModelId, currentModeId) {
			const contentBlocks = [];
			for (const block of prompt) switch (block.type) {
				case "text":
					contentBlocks.push({
						type: "text",
						text: block.text,
						_meta: this.addModelToMeta(block._meta, currentModelId, currentModeId)
					});
					break;
				case "image":
					contentBlocks.push({
						type: "image",
						data: block.data,
						mimeType: block.mimeType,
						uri: block.uri,
						_meta: this.addModelToMeta(block._meta, currentModelId, currentModeId)
					});
					break;
				case "resource": {
					const resource = block.resource;
					if (resource && resource.uri) contentBlocks.push({
						type: "resource",
						uri: resource.uri,
						_meta: this.addModelToMeta(block._meta, currentModelId, currentModeId)
					});
					break;
				}
				case "resource_link":
					if (block.uri) contentBlocks.push({
						type: "resource_link",
						uri: block.uri,
						name: block.name,
						title: block.title ?? null,
						mimeType: block.mimeType ?? null,
						_meta: this.addModelToMeta(block._meta, currentModelId, currentModeId)
					});
					break;
			}
			return contentBlocks;
		}
		convertEntriesToTreeNodes(entries, basePath, depth) {
			const nodeMap = /* @__PURE__ */ new Map();
			const rootNodes = [];
			const getDepthLevel = (path) => {
				return (path.startsWith(basePath) ? path.slice(basePath.length) : path).split("/").filter((s) => s.length > 0).length;
			};
			for (const entry of entries) {
				const fullPath = entry.path || `${basePath}/${entry.name}`;
				const isFile = entry.type === "file";
				const nodeDepthLevel = getDepthLevel(fullPath);
				const isLoaded = !isFile ? nodeDepthLevel < depth : void 0;
				const node = {
					path: fullPath,
					name: entry.name,
					type: isFile ? "file" : "dir",
					children: !isFile ? [] : void 0,
					isLoaded
				};
				nodeMap.set(fullPath, node);
			}
			for (const entry of entries) {
				const fullPath = entry.path || `${basePath}/${entry.name}`;
				const node = nodeMap.get(fullPath);
				if (!node) continue;
				const parentPath = fullPath.substring(0, fullPath.lastIndexOf("/"));
				if (parentPath === basePath || parentPath === "") rootNodes.push(node);
				else {
					const parentNode = nodeMap.get(parentPath);
					if (parentNode && parentNode.children) parentNode.children.push(node);
					else rootNodes.push(node);
				}
			}
			const sortNodes = (nodes) => {
				nodes.sort((a, b) => {
					if (a.type !== b.type) return a.type === "dir" ? -1 : 1;
					return a.name.localeCompare(b.name, void 0, {
						numeric: true,
						sensitivity: "base"
					});
				});
				for (const node of nodes) if (node.children) sortNodes(node.children);
			};
			sortNodes(rootNodes);
			return rootNodes;
		}
		/**
		* 注入预加载的历史通知（网盘首屏加速）。
		*
		* 将 ACP 格式的 SessionNotification[] 通过 handleSessionUpdate 管线
		* 转为 Message 并推送到 UI。
		*
		* 时序：在 loadSession 还在等待沙箱唤醒时调用，网盘数据先展示；
		* ACP sessionUpdate 到达后通过相同的 emitMessage 路径自然覆盖。
		*/
		injectPrefetchNotifications(sessionId, notifications) {
			if (this._acpHistoryBuffering === sessionId || this._acpHistoryRendered.has(sessionId)) {
				console.warn("[NetdrivePrefetch] SKIPPED: ACP authoritative data buffering/rendered for", sessionId.substring(0, 8));
				return;
			}
			console.log("[NetdrivePrefetch] injecting", notifications.length, "notifications for", sessionId.substring(0, 8));
			const messages = [];
			let conversationStatus;
			for (const notification of notifications) {
				const n = notification;
				const update = n.update;
				const updateType = update?.sessionUpdate;
				if (updateType === "user_message_chunk") {
					const meta = n._meta;
					const messageId = meta?.["codebuddy.ai"]?.messageId || `prefetch-user-${Date.now()}`;
					try {
						const result = MessageConverter.convertACPUpdateToMessage(update, {
							sessionId,
							requestId: sessionId,
							messageId,
							isStreaming: false,
							_meta: meta
						});
						if (result) {
							messages.push(result.message);
							console.log("[NetdrivePrefetch] user message added:", result.message.content?.[0]?.text?.substring(0, 20));
						}
					} catch (err) {
						console.warn("[NetdrivePrefetch] failed to convert user_message_chunk:", err);
					}
				} else if (updateType === "agent_message_chunk") {
					const meta = n._meta;
					const codebuddyMeta = meta?.["codebuddy.ai"] || {};
					const messageId = codebuddyMeta.messageId || `prefetch-assistant-${Date.now()}`;
					const text = update.content?.text || "";
					if (text) {
						messages.push({
							id: messageId,
							requestId: codebuddyMeta.requestId || messageId,
							conversationId: sessionId,
							messageType: "assistant",
							createTime: meta?.timestamp ? new Date(meta.timestamp).getTime() : Date.now(),
							complete: true,
							content: [{
								type: "text",
								text
							}],
							extra: {
								...codebuddyMeta.modelId ? { modelId: codebuddyMeta.modelId } : {},
								...codebuddyMeta.modelName ? { modelName: codebuddyMeta.modelName } : {}
							}
						});
						console.log("[NetdrivePrefetch] assistant message added, text length:", text.length);
					}
				} else if (updateType === "session_info_update") {
					const status = update._meta?.["codebuddy.ai"]?.status;
					if (status) conversationStatus = status;
				}
			}
			if (conversationStatus) this.emitMessage({
				type: "conversation",
				conversation: {
					id: sessionId,
					status: conversationStatus
				}
			});
			if (messages.length > 0) {
				let sessionCache = this.messageCache.get(sessionId);
				if (!sessionCache) {
					sessionCache = /* @__PURE__ */ new Map();
					this.messageCache.set(sessionId, sessionCache);
				}
				for (const msg of messages) sessionCache.set(msg.id, msg);
				this.emitMessage({
					type: "messages_batch",
					conversationId: sessionId,
					messages
				});
			}
			console.log("[NetdrivePrefetch] done. messages:", messages.length, "status:", conversationStatus || "none", "callbacks:", this.messageCallbacks.size);
		}
		emitMessage(data) {
			this.messageCallbacks.forEach((callback) => {
				try {
					callback(data);
				} catch (error) {
					console.error("[CloudAgentAdapter] Message callback error:", error);
				}
			});
		}
		emitError(error) {
			notifyIfAuthExpired(error);
			this.errorCallbacks.forEach((callback) => {
				try {
					callback(error);
				} catch (err) {
					console.error("[CloudAgentAdapter] Error callback error:", err);
				}
			});
		}
		/**
		* 触发 Checkpoint 回调
		* 只有当 sessionId 匹配当前活跃的 session 时才触发回调
		*/
		emitCheckpoint(sessionId, event, checkpoint) {
			const currentSessionId = this.currentSession?.id;
			if (currentSessionId && sessionId !== currentSessionId) return;
			this.checkpointCallbacks.forEach((callback) => {
				try {
					callback(sessionId, event, checkpoint);
				} catch (err) {
					console.error("[CloudAgentAdapter] Checkpoint callback error:", err);
				}
			});
		}
		/**
		* 触发 Artifact 回调
		* 只有当 sessionId 匹配当前活跃的 session 时才触发回调
		*/
		emitArtifact(sessionId, artifact, event) {
			const currentSessionId = this.currentSession?.id;
			if (currentSessionId && sessionId !== currentSessionId) return;
			const now = Date.now();
			const cached = this.artifactTimestampsByUri.get(artifact.uri);
			let createdAt;
			let updatedAt;
			if (event === "created") {
				createdAt = artifact.createdAt ?? now;
				updatedAt = artifact.updatedAt ?? now;
				this.artifactTimestampsByUri.set(artifact.uri, {
					createdAt,
					updatedAt
				});
			} else if (event === "updated") {
				createdAt = artifact.createdAt ?? cached?.createdAt ?? now;
				updatedAt = artifact.updatedAt ?? now;
				this.artifactTimestampsByUri.set(artifact.uri, {
					createdAt,
					updatedAt
				});
			} else {
				createdAt = artifact.createdAt ?? cached?.createdAt ?? now;
				updatedAt = artifact.updatedAt ?? cached?.updatedAt ?? now;
				this.artifactTimestampsByUri.delete(artifact.uri);
			}
			const artifactWithTimestamps = {
				...artifact,
				createdAt,
				updatedAt
			};
			this.artifactCallbacks.forEach((callback) => {
				try {
					callback(sessionId, artifactWithTimestamps, event);
				} catch (err) {
					console.error("[CloudAgentAdapter] Artifact callback error:", err);
				}
			});
		}
		/**
		* 触发 Task 更新回调
		* 只有当 sessionId 匹配当前活跃的 session 时才触发回调
		*
		* 注：task 事件在 main chat 链路（App.tsx → useArtifactsManager.handleTaskUpdate）
		* 是作为 type:'task' 的 artifact 灌进同一个单一 artifacts state（并非 per-session
		* Map），与 artifact/checkpoint 同构。故此处过滤与 emitArtifact/emitCheckpoint 保持
		* 一致，切会话保活场景的后台 task 恢复走「切回重放」兜底，不在此放行（见 issue #65298
		* 调研文档 §3）。
		*/
		emitTaskUpdate(sessionId, tasks, enableEdit, uri) {
			const currentSessionId = this.currentSession?.id;
			if (currentSessionId && sessionId !== currentSessionId) return;
			this.taskUpdateCallbacks.forEach((callback) => {
				try {
					callback(sessionId, tasks, enableEdit, uri);
				} catch (err) {
					console.error("[CloudAgentAdapter] Task update callback error:", err);
				}
			});
		}
		/**
		* 处理 Command 事件
		*/
		handleCommand(sessionId, command) {
			console.log("[CloudAgentAdapter] handleCommand:", {
				sessionId,
				action: command.action,
				paramsKeys: command.params ? Object.keys(command.params) : [],
				openBrowserCallbacksCount: this.openBrowserCallbacks.size
			});
			if (command.action === "openBrowser" && command.params?.url) {
				const url = command.params.url;
				this.browserUrlCache.set(sessionId, url);
				this.openBrowserCallbacks.forEach((callback) => {
					try {
						callback(url, sessionId);
					} catch (err) {
						console.error("[CloudAgentAdapter] OpenBrowser callback error:", err);
					}
				});
				return;
			}
			if (command.action === "openResultView" && command.params?.targetFile) {
				const data = {
					targetFile: command.params.targetFile,
					viewType: command.params.viewType || "artifacts",
					explanation: command.params.explanation,
					metaInfo: command.params.metaInfo
				};
				this.openResultViewCallbacks.forEach((callback) => {
					try {
						callback(sessionId, data);
					} catch (err) {
						console.error("[CloudAgentAdapter] OpenResultView callback error:", err);
					}
				});
				return;
			}
		}
		/**
		* 获取会话缓存的浏览器预览 URL
		*/
		getBrowserUrlForSession(sessionId) {
			return this.browserUrlCache.get(sessionId);
		}
		/**
		* 设置会话的浏览器预览 URL 缓存
		*/
		setBrowserUrlForSession(sessionId, url) {
			this.browserUrlCache.set(sessionId, url);
		}
		/**
		* 监听打开浏览器命令
		* 当收到 action: 'openBrowser' 的 command 时触发
		*/
		onOpenBrowser(callback) {
			this.openBrowserCallbacks.add(callback);
			return () => {
				this.openBrowserCallbacks.delete(callback);
			};
		}
		/**
		* 监听打开结果视图命令
		* 当收到 action: 'openResultView' 的 command 时触发
		*/
		onOpenResultView(callback) {
			this.openResultViewCallbacks.add(callback);
			return () => {
				this.openResultViewCallbacks.delete(callback);
			};
		}
		async moveSession(sessionId) {
			return {
				success: false,
				error: "Move session is not supported in cloud environment"
			};
		}
		setCurrentIsPlayground(isPlayground) {}
		getCurrentIsPlayground() {
			return false;
		}
		/**
		* 获取已安装插件列表
		*/
		async getInstalledPlugins(forceRefresh) {
			if (!this.client.sessions.getInstalledPlugins) return [];
			return await this.client.sessions.getInstalledPlugins(forceRefresh);
		}
		/**
		* 安装插件
		*/
		async installPlugins(pluginNames, marketplaceName, installScope, marketplaceSource, workspacePath) {
			if (!this.client.sessions.installPlugins) return {
				success: false,
				error: "installPlugins not supported"
			};
			return await this.client.sessions.installPlugins(pluginNames, marketplaceName, installScope, marketplaceSource, workspacePath);
		}
		/**
		* 获取插件市场列表
		*/
		async getPluginMarketplaces(forceRefresh) {
			if (!this.client.sessions.getPluginMarketplaces) return [];
			return await this.client.sessions.getPluginMarketplaces(forceRefresh);
		}
		/**
		* 获取市场下的插件列表
		*/
		async getMarketplacePlugins(marketplaceName, forceRefresh, searchText) {
			if (!this.client.sessions.getMarketplacePlugins) return [];
			return (await this.client.sessions.getMarketplacePlugins(marketplaceName, forceRefresh, searchText)).map((p) => ({
				...p,
				marketplaceName,
				status: p.status || "not-installed"
			}));
		}
		/**
		* 获取插件详情
		*/
		async getPluginDetail(pluginName, marketplaceName) {
			if (!this.client.sessions.getPluginDetail) return null;
			const detail = await this.client.sessions.getPluginDetail(marketplaceName, pluginName);
			if (!detail) return null;
			return {
				...detail,
				marketplaceName,
				status: detail.status || "not-installed"
			};
		}
		/**
		* 添加插件市场
		*/
		async addPluginMarketplace(source, name) {
			if (!this.client.sessions.addPluginMarketplace) return {
				success: false,
				error: "addPluginMarketplace not supported"
			};
			return await this.client.sessions.addPluginMarketplace(source, name);
		}
		/**
		* 删除插件市场
		*/
		async removePluginMarketplace(marketplaceName) {
			if (!this.client.sessions.removePluginMarketplace) return {
				success: false,
				error: "removePluginMarketplace not supported"
			};
			return await this.client.sessions.removePluginMarketplace(marketplaceName);
		}
		/**
		* 刷新插件市场
		*/
		async refreshPluginMarketplace(marketplaceName) {
			if (!this.client.sessions.refreshPluginMarketplace) return {
				success: false,
				error: "refreshPluginMarketplace not supported"
			};
			return await this.client.sessions.refreshPluginMarketplace(marketplaceName);
		}
		/**
		* 批量切换插件启用/禁用状态
		*/
		async batchTogglePlugins(request) {
			if (!this.client.sessions.batchTogglePlugins) return {
				success: false,
				succeededPlugins: [],
				failedPlugins: request.items.map((item) => ({
					...item,
					error: "batchTogglePlugins not supported"
				}))
			};
			return await this.client.sessions.batchTogglePlugins(request);
		}
		/**
		* 卸载插件
		* 调用后端 API: POST /user/plugins/installed/:id/uninstall
		*
		* 完整链路：
		* CloudAgentAdapter.uninstallPlugin()
		*   -> AgentClient.sessions.uninstallPlugin()
		*   -> CloudAgentProvider.uninstallPlugin()
		*   -> HTTP POST /user/plugins/installed/:id/uninstall
		*   -> agentserver: PluginInstallService.Uninstall()
		*   -> 软删除 DB + 异步同步到活跃沙箱
		*/
		async uninstallPlugin(pluginName, marketplaceName, scope) {
			if (!this.client.sessions.uninstallPlugin) return {
				success: false,
				error: "uninstallPlugin not supported"
			};
			return await this.client.sessions.uninstallPlugin(pluginName, marketplaceName, scope);
		}
		/**
		* 请求插入内容块到输入框（跨组件通信，仅填入不发送）
		* 外部面板（如灵感面板）调用此方法请求 MainContentCore 将内容块插入输入框
		*
		* 如果当前没有消费者（如聊天视图尚未挂载），请求会被暂存，
		* 待消费者通过 onInsertContentBlocksRequest 注册后自动投递。
		*/
		requestInsertContentBlocks(data) {
			if (this.insertContentBlocksRequestCallbacks.size === 0) {
				this.pendingInsertRequest = data;
				return;
			}
			this.pendingInsertRequest = null;
			this.insertContentBlocksRequestCallbacks.forEach((callback) => {
				try {
					callback(data);
				} catch (err) {
					console.error("[CloudAgentAdapter] Insert content blocks request callback error:", err);
				}
			});
		}
		/**
		* 监听插入内容块请求（跨组件通信）
		* MainContentCore 调用此方法监听来自外部面板的插入请求
		*
		* 如果注册时已有暂存的请求，同步投递给消费者。
		* 消费者侧有 try-catch 兜底处理 Slate 未就绪的情况。
		*/
		onInsertContentBlocksRequest(callback) {
			this.insertContentBlocksRequestCallbacks.add(callback);
			if (this.pendingInsertRequest) {
				const pending = this.pendingInsertRequest;
				this.pendingInsertRequest = null;
				try {
					callback(pending);
				} catch (err) {
					console.error("[CloudAgentAdapter] Flush pending insert request error:", err);
				}
			}
			return () => {
				this.insertContentBlocksRequestCallbacks.delete(callback);
			};
		}
		/**
		* 上报埋点事件（Cloud 模式）
		* 通过 provider 链路发送：adapter → client.sessions → provider → /v2/report
		*/
		reportTelemetry(eventName, payload) {
			this.client.sessions.reportTelemetry?.(eventName, payload).catch((error) => {
				console.warn("[CloudAgentAdapter] reportTelemetry failed:", error);
			});
		}
		async reportTelemetrySync(eventName, payload) {
			await this.client.sessions.reportTelemetry?.(eventName, payload);
		}
		/**
		* 获取大使状态
		* 委托给 BackendProvider 处理
		*/
		async getAmbassadorStatus() {
			if (!this.backendProvider?.getAmbassadorStatus) return null;
			return await this.backendProvider.getAmbassadorStatus();
		}
		async speechToText(params) {
			if (!this.backendProvider?.speechToText) return {
				success: false,
				error: "speechToText not available in backendProvider"
			};
			try {
				return await this.backendProvider.speechToText(params);
			} catch (error) {
				console.error("[CloudAgentAdapter] Speech to text failed:", error);
				return {
					success: false,
					error: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		/**
		* 获取指定会话的 Sandbox ID（即后端 runtimeId）。
		* 从 ActiveSession.connectionInfo.sandboxId 取值。
		*/
		getSandboxId(sessionId) {
			if (this.currentSession?.id === sessionId) return this.currentSession.connectionInfo?.sandboxId;
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/adapters/types.ts
var init_types = __esmMin((() => {
	init_pending_message_tracker();
}));
//#endregion
//#region ../../packages/agent-ui/src/adapters/index.ts
/**
* 创建 Agent Adapter
*
* 根据配置或环境自动选择合适的 Provider 和 Adapter:
* - SSE/Cloud 模式: CloudAgentProvider + CloudAgentAdapter
* - IPC/Local 模式: LocalAgentProvider + AgentNewAdapter
*
* 设计理念：
* - CloudAgentAdapter 专门处理 Cloud 环境的消息拼接逻辑
* - AgentNewAdapter 专注于 Local 环境的消息处理
* - 通过工厂函数选择不同的 Provider 和 Adapter
*
* 注意：
* - Adapter 创建不依赖登录态
* - CloudAgentProvider 自动订阅 accountService，登录后会自动更新 headers
*/
async function createAgentAdapter(config) {
	const overallStart = performance.now();
	console.log("[Adapter:Perf] Starting createAgentAdapter...");
	const type = config?.type || (getEnvironmentType() === "ide" ? "ipc" : "sse");
	console.log(`[Adapter:Perf] Environment type: ${type}`);
	if (type === "sse") {
		const backendProvider = createBackendProvider({
			baseUrl: config?.sse?.baseUrl || `${window.location.origin}/`,
			smhHost: getSMHHost()
		});
		const logger = config?.logger ?? console;
		const adapter = new CloudAgentAdapter(new AgentClient({
			provider: new CloudAgentProvider({
				endpoint: window.location.origin,
				filesystemFactory: (info) => CloudE2BFilesystem.connect(info),
				reportEndpoint: config?.sse?.reportEndpoint,
				isOversea: isOverseas(),
				logger
			}),
			logger,
			environmentType: "cloud"
		}), {}, backendProvider);
		console.log(`[Adapter:Perf] Cloud adapter created in ${(performance.now() - overallStart).toFixed(0)}ms`);
		return adapter;
	} else {
		const channel = config?.ipc?.channel;
		if (!channel) throw new Error("IPC mode requires a channel");
		let stepStart = performance.now();
		console.log("[Adapter:Perf] Creating LocalAgentProvider...");
		const localProvider = new LocalAgentProvider({
			channel,
			debug: config?.debug ?? false,
			acpConfig: { timeoutMs: 3e4 }
		});
		console.log(`[Adapter:Perf] LocalAgentProvider created in ${(performance.now() - stepStart).toFixed(0)}ms`);
		stepStart = performance.now();
		console.log("[Adapter:Perf] Creating AgentClient...");
		const client = new AgentClient({
			provider: localProvider,
			logger: config?.logger ?? console,
			environmentType: "local"
		});
		console.log(`[Adapter:Perf] AgentClient created in ${(performance.now() - stepStart).toFixed(0)}ms`);
		stepStart = performance.now();
		console.log("[Adapter:Perf] Creating IPCBackendProvider...");
		const backendProvider = createIPCBackendProvider({ channel });
		console.log(`[Adapter:Perf] IPCBackendProvider created in ${(performance.now() - stepStart).toFixed(0)}ms`);
		const cwd = config?.ipc?.cwd;
		const conversationId = config?.ipc?.conversationId;
		stepStart = performance.now();
		console.log("[Adapter:Perf] Creating AgentNewAdapter...");
		const adapter = new AgentNewAdapter(client, {
			cwd,
			conversationId
		}, backendProvider, channel);
		console.log(`[Adapter:Perf] AgentNewAdapter created in ${(performance.now() - stepStart).toFixed(0)}ms`);
		console.log(`[Adapter:Perf] Total adapter creation time: ${(performance.now() - overallStart).toFixed(0)}ms`);
		return adapter;
	}
}
var init_adapters = __esmMin((() => {
	init_common();
	init_environment();
	init_get_smh_host();
	init_agent_new_adapter();
	init_cloud_agent_adapter();
	init_types();
	init_plan_tool_adapter();
	init_acp_message_accumulator();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/share-preview/components/loginRedirect.ts
var PREVIEW_LOGIN_REDIRECT_KEY, savePathForLoginRedirect;
var init_loginRedirect = __esmMin((() => {
	PREVIEW_LOGIN_REDIRECT_KEY = "cb_preview_login_redirect";
	savePathForLoginRedirect = () => {
		try {
			const currentPath = window.location.pathname + window.location.search;
			sessionStorage.setItem(PREVIEW_LOGIN_REDIRECT_KEY, currentPath);
			console.log("[Preview] Saved path for login redirect:", currentPath);
		} catch (e) {
			console.warn("[Preview] Failed to save redirect path:", e);
		}
	};
}));
//#endregion
export { PlanToolAdapter as a, init_task_converter as c, getSMHHost as d, init_get_smh_host as f, init_adapters as i, PendingMessageTracker as l, savePathForLoginRedirect as n, init_plan_tool_adapter as o, createAgentAdapter as r, TaskConverter as s, init_loginRedirect as t, init_pending_message_tracker as u };
