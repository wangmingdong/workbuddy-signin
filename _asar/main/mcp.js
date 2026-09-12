require("./chunk.js");
const require_helpers = require("./helpers.js");
const require_types = require("./types.js");
//#region ../../node_modules/@modelcontextprotocol/sdk/dist/esm/experimental/tasks/server.js
/**
* Experimental server task features for MCP SDK.
* WARNING: These APIs are experimental and may change without notice.
*
* @experimental
*/
/**
* Experimental task features for low-level MCP servers.
*
* Access via `server.experimental.tasks`:
* ```typescript
* const stream = server.experimental.tasks.requestStream(request, schema, options);
* ```
*
* For high-level server usage with task-based tools, use `McpServer.experimental.tasks` instead.
*
* @experimental
*/
var ExperimentalServerTasks = class {
	constructor(_server) {
		this._server = _server;
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
		return this._server.requestStream(request, resultSchema, options);
	}
	/**
	* Sends a sampling request and returns an AsyncGenerator that yields response messages.
	* The generator is guaranteed to end with either a 'result' or 'error' message.
	*
	* For task-augmented requests, yields 'taskCreated' and 'taskStatus' messages
	* before the final result.
	*
	* @example
	* ```typescript
	* const stream = server.experimental.tasks.createMessageStream({
	*     messages: [{ role: 'user', content: { type: 'text', text: 'Hello' } }],
	*     maxTokens: 100
	* }, {
	*     onprogress: (progress) => {
	*         // Handle streaming tokens via progress notifications
	*         console.log('Progress:', progress.message);
	*     }
	* });
	*
	* for await (const message of stream) {
	*     switch (message.type) {
	*         case 'taskCreated':
	*             console.log('Task created:', message.task.taskId);
	*             break;
	*         case 'taskStatus':
	*             console.log('Task status:', message.task.status);
	*             break;
	*         case 'result':
	*             console.log('Final result:', message.result);
	*             break;
	*         case 'error':
	*             console.error('Error:', message.error);
	*             break;
	*     }
	* }
	* ```
	*
	* @param params - The sampling request parameters
	* @param options - Optional request options (timeout, signal, task creation params, onprogress, etc.)
	* @returns AsyncGenerator that yields ResponseMessage objects
	*
	* @experimental
	*/
	createMessageStream(params, options) {
		const clientCapabilities = this._server.getClientCapabilities();
		if ((params.tools || params.toolChoice) && !clientCapabilities?.sampling?.tools) throw new Error("Client does not support sampling tools capability.");
		if (params.messages.length > 0) {
			const lastMessage = params.messages[params.messages.length - 1];
			const lastContent = Array.isArray(lastMessage.content) ? lastMessage.content : [lastMessage.content];
			const hasToolResults = lastContent.some((c) => c.type === "tool_result");
			const previousMessage = params.messages.length > 1 ? params.messages[params.messages.length - 2] : void 0;
			const previousContent = previousMessage ? Array.isArray(previousMessage.content) ? previousMessage.content : [previousMessage.content] : [];
			const hasPreviousToolUse = previousContent.some((c) => c.type === "tool_use");
			if (hasToolResults) {
				if (lastContent.some((c) => c.type !== "tool_result")) throw new Error("The last message must contain only tool_result content if any is present");
				if (!hasPreviousToolUse) throw new Error("tool_result blocks are not matching any tool_use from the previous message");
			}
			if (hasPreviousToolUse) {
				const toolUseIds = new Set(previousContent.filter((c) => c.type === "tool_use").map((c) => c.id));
				const toolResultIds = new Set(lastContent.filter((c) => c.type === "tool_result").map((c) => c.toolUseId));
				if (toolUseIds.size !== toolResultIds.size || ![...toolUseIds].every((id) => toolResultIds.has(id))) throw new Error("ids of tool_result blocks and tool_use blocks from previous message do not match");
			}
		}
		return this.requestStream({
			method: "sampling/createMessage",
			params
		}, require_types.CreateMessageResultSchema, options);
	}
	/**
	* Sends an elicitation request and returns an AsyncGenerator that yields response messages.
	* The generator is guaranteed to end with either a 'result' or 'error' message.
	*
	* For task-augmented requests (especially URL-based elicitation), yields 'taskCreated'
	* and 'taskStatus' messages before the final result.
	*
	* @example
	* ```typescript
	* const stream = server.experimental.tasks.elicitInputStream({
	*     mode: 'url',
	*     message: 'Please authenticate',
	*     elicitationId: 'auth-123',
	*     url: 'https://example.com/auth'
	* }, {
	*     task: { ttl: 300000 } // Task-augmented for long-running auth flow
	* });
	*
	* for await (const message of stream) {
	*     switch (message.type) {
	*         case 'taskCreated':
	*             console.log('Task created:', message.task.taskId);
	*             break;
	*         case 'taskStatus':
	*             console.log('Task status:', message.task.status);
	*             break;
	*         case 'result':
	*             console.log('User action:', message.result.action);
	*             break;
	*         case 'error':
	*             console.error('Error:', message.error);
	*             break;
	*     }
	* }
	* ```
	*
	* @param params - The elicitation request parameters
	* @param options - Optional request options (timeout, signal, task creation params, etc.)
	* @returns AsyncGenerator that yields ResponseMessage objects
	*
	* @experimental
	*/
	elicitInputStream(params, options) {
		const clientCapabilities = this._server.getClientCapabilities();
		const mode = params.mode ?? "form";
		switch (mode) {
			case "url":
				if (!clientCapabilities?.elicitation?.url) throw new Error("Client does not support url elicitation.");
				break;
			case "form":
				if (!clientCapabilities?.elicitation?.form) throw new Error("Client does not support form elicitation.");
				break;
		}
		const normalizedParams = mode === "form" && params.mode === void 0 ? {
			...params,
			mode: "form"
		} : params;
		return this.requestStream({
			method: "elicitation/create",
			params: normalizedParams
		}, require_types.ElicitResultSchema, options);
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
		return this._server.getTask({ taskId }, options);
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
		return this._server.getTaskResult({ taskId }, resultSchema, options);
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
		return this._server.listTasks(cursor ? { cursor } : void 0, options);
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
		return this._server.cancelTask({ taskId }, options);
	}
};
//#endregion
//#region ../../node_modules/@modelcontextprotocol/sdk/dist/esm/server/index.js
/**
* An MCP server on top of a pluggable transport.
*
* This server will automatically respond to the initialization flow as initiated from the client.
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
* // Create typed server
* const server = new Server<CustomRequest, CustomNotification, CustomResult>({
*   name: "CustomServer",
*   version: "1.0.0"
* })
* ```
* @deprecated Use `McpServer` instead for the high-level API. Only use `Server` for advanced use cases.
*/
var Server = class extends require_helpers.Protocol {
	/**
	* Initializes this server with the given name and version information.
	*/
	constructor(_serverInfo, options) {
		super(options);
		this._serverInfo = _serverInfo;
		this._loggingLevels = /* @__PURE__ */ new Map();
		this.LOG_LEVEL_SEVERITY = new Map(require_types.LoggingLevelSchema.options.map((level, index) => [level, index]));
		this.isMessageIgnored = (level, sessionId) => {
			const currentLevel = this._loggingLevels.get(sessionId);
			return currentLevel ? this.LOG_LEVEL_SEVERITY.get(level) < this.LOG_LEVEL_SEVERITY.get(currentLevel) : false;
		};
		this._capabilities = options?.capabilities ?? {};
		this._instructions = options?.instructions;
		this._jsonSchemaValidator = options?.jsonSchemaValidator ?? new require_helpers.AjvJsonSchemaValidator();
		this.setRequestHandler(require_types.InitializeRequestSchema, (request) => this._oninitialize(request));
		this.setNotificationHandler(require_types.InitializedNotificationSchema, () => this.oninitialized?.());
		if (this._capabilities.logging) this.setRequestHandler(require_types.SetLevelRequestSchema, async (request, extra) => {
			const transportSessionId = extra.sessionId || extra.requestInfo?.headers["mcp-session-id"] || void 0;
			const { level } = request.params;
			const parseResult = require_types.LoggingLevelSchema.safeParse(level);
			if (parseResult.success) this._loggingLevels.set(transportSessionId, parseResult.data);
			return {};
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
		if (!this._experimental) this._experimental = { tasks: new ExperimentalServerTasks(this) };
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
	* Override request handler registration to enforce server-side validation for tools/call.
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
		if (methodValue === "tools/call") {
			const wrappedHandler = async (request, extra) => {
				const validatedRequest = require_helpers.safeParse(require_types.CallToolRequestSchema, request);
				if (!validatedRequest.success) {
					const errorMessage = validatedRequest.error instanceof Error ? validatedRequest.error.message : String(validatedRequest.error);
					throw new require_types.McpError(require_types.ErrorCode.InvalidParams, `Invalid tools/call request: ${errorMessage}`);
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
				const validationResult = require_helpers.safeParse(require_types.CallToolResultSchema, result);
				if (!validationResult.success) {
					const errorMessage = validationResult.error instanceof Error ? validationResult.error.message : String(validationResult.error);
					throw new require_types.McpError(require_types.ErrorCode.InvalidParams, `Invalid tools/call result: ${errorMessage}`);
				}
				return validationResult.data;
			};
			return super.setRequestHandler(requestSchema, wrappedHandler);
		}
		return super.setRequestHandler(requestSchema, handler);
	}
	assertCapabilityForMethod(method) {
		switch (method) {
			case "sampling/createMessage":
				if (!this._clientCapabilities?.sampling) throw new Error(`Client does not support sampling (required for ${method})`);
				break;
			case "elicitation/create":
				if (!this._clientCapabilities?.elicitation) throw new Error(`Client does not support elicitation (required for ${method})`);
				break;
			case "roots/list":
				if (!this._clientCapabilities?.roots) throw new Error(`Client does not support listing roots (required for ${method})`);
				break;
			case "ping": break;
		}
	}
	assertNotificationCapability(method) {
		switch (method) {
			case "notifications/message":
				if (!this._capabilities.logging) throw new Error(`Server does not support logging (required for ${method})`);
				break;
			case "notifications/resources/updated":
			case "notifications/resources/list_changed":
				if (!this._capabilities.resources) throw new Error(`Server does not support notifying about resources (required for ${method})`);
				break;
			case "notifications/tools/list_changed":
				if (!this._capabilities.tools) throw new Error(`Server does not support notifying of tool list changes (required for ${method})`);
				break;
			case "notifications/prompts/list_changed":
				if (!this._capabilities.prompts) throw new Error(`Server does not support notifying of prompt list changes (required for ${method})`);
				break;
			case "notifications/elicitation/complete":
				if (!this._clientCapabilities?.elicitation?.url) throw new Error(`Client does not support URL elicitation (required for ${method})`);
				break;
			case "notifications/cancelled": break;
			case "notifications/progress": break;
		}
	}
	assertRequestHandlerCapability(method) {
		if (!this._capabilities) return;
		switch (method) {
			case "completion/complete":
				if (!this._capabilities.completions) throw new Error(`Server does not support completions (required for ${method})`);
				break;
			case "logging/setLevel":
				if (!this._capabilities.logging) throw new Error(`Server does not support logging (required for ${method})`);
				break;
			case "prompts/get":
			case "prompts/list":
				if (!this._capabilities.prompts) throw new Error(`Server does not support prompts (required for ${method})`);
				break;
			case "resources/list":
			case "resources/templates/list":
			case "resources/read":
				if (!this._capabilities.resources) throw new Error(`Server does not support resources (required for ${method})`);
				break;
			case "tools/call":
			case "tools/list":
				if (!this._capabilities.tools) throw new Error(`Server does not support tools (required for ${method})`);
				break;
			case "tasks/get":
			case "tasks/list":
			case "tasks/result":
			case "tasks/cancel":
				if (!this._capabilities.tasks) throw new Error(`Server does not support tasks capability (required for ${method})`);
				break;
			case "ping":
			case "initialize": break;
		}
	}
	assertTaskCapability(method) {
		require_helpers.assertClientRequestTaskCapability(this._clientCapabilities?.tasks?.requests, method, "Client");
	}
	assertTaskHandlerCapability(method) {
		if (!this._capabilities) return;
		require_helpers.assertToolsCallTaskCapability(this._capabilities.tasks?.requests, method, "Server");
	}
	async _oninitialize(request) {
		const requestedVersion = request.params.protocolVersion;
		this._clientCapabilities = request.params.capabilities;
		this._clientVersion = request.params.clientInfo;
		return {
			protocolVersion: require_types.SUPPORTED_PROTOCOL_VERSIONS.includes(requestedVersion) ? requestedVersion : require_types.LATEST_PROTOCOL_VERSION,
			capabilities: this.getCapabilities(),
			serverInfo: this._serverInfo,
			...this._instructions && { instructions: this._instructions }
		};
	}
	/**
	* After initialization has completed, this will be populated with the client's reported capabilities.
	*/
	getClientCapabilities() {
		return this._clientCapabilities;
	}
	/**
	* After initialization has completed, this will be populated with information about the client's name and version.
	*/
	getClientVersion() {
		return this._clientVersion;
	}
	getCapabilities() {
		return this._capabilities;
	}
	async ping() {
		return this.request({ method: "ping" }, require_types.EmptyResultSchema);
	}
	async createMessage(params, options) {
		if (params.tools || params.toolChoice) {
			if (!this._clientCapabilities?.sampling?.tools) throw new Error("Client does not support sampling tools capability.");
		}
		if (params.messages.length > 0) {
			const lastMessage = params.messages[params.messages.length - 1];
			const lastContent = Array.isArray(lastMessage.content) ? lastMessage.content : [lastMessage.content];
			const hasToolResults = lastContent.some((c) => c.type === "tool_result");
			const previousMessage = params.messages.length > 1 ? params.messages[params.messages.length - 2] : void 0;
			const previousContent = previousMessage ? Array.isArray(previousMessage.content) ? previousMessage.content : [previousMessage.content] : [];
			const hasPreviousToolUse = previousContent.some((c) => c.type === "tool_use");
			if (hasToolResults) {
				if (lastContent.some((c) => c.type !== "tool_result")) throw new Error("The last message must contain only tool_result content if any is present");
				if (!hasPreviousToolUse) throw new Error("tool_result blocks are not matching any tool_use from the previous message");
			}
			if (hasPreviousToolUse) {
				const toolUseIds = new Set(previousContent.filter((c) => c.type === "tool_use").map((c) => c.id));
				const toolResultIds = new Set(lastContent.filter((c) => c.type === "tool_result").map((c) => c.toolUseId));
				if (toolUseIds.size !== toolResultIds.size || ![...toolUseIds].every((id) => toolResultIds.has(id))) throw new Error("ids of tool_result blocks and tool_use blocks from previous message do not match");
			}
		}
		if (params.tools) return this.request({
			method: "sampling/createMessage",
			params
		}, require_types.CreateMessageResultWithToolsSchema, options);
		return this.request({
			method: "sampling/createMessage",
			params
		}, require_types.CreateMessageResultSchema, options);
	}
	/**
	* Creates an elicitation request for the given parameters.
	* For backwards compatibility, `mode` may be omitted for form requests and will default to `'form'`.
	* @param params The parameters for the elicitation request.
	* @param options Optional request options.
	* @returns The result of the elicitation request.
	*/
	async elicitInput(params, options) {
		switch (params.mode ?? "form") {
			case "url": {
				if (!this._clientCapabilities?.elicitation?.url) throw new Error("Client does not support url elicitation.");
				const urlParams = params;
				return this.request({
					method: "elicitation/create",
					params: urlParams
				}, require_types.ElicitResultSchema, options);
			}
			case "form": {
				if (!this._clientCapabilities?.elicitation?.form) throw new Error("Client does not support form elicitation.");
				const formParams = params.mode === "form" ? params : {
					...params,
					mode: "form"
				};
				const result = await this.request({
					method: "elicitation/create",
					params: formParams
				}, require_types.ElicitResultSchema, options);
				if (result.action === "accept" && result.content && formParams.requestedSchema) try {
					const validationResult = this._jsonSchemaValidator.getValidator(formParams.requestedSchema)(result.content);
					if (!validationResult.valid) throw new require_types.McpError(require_types.ErrorCode.InvalidParams, `Elicitation response content does not match requested schema: ${validationResult.errorMessage}`);
				} catch (error) {
					if (error instanceof require_types.McpError) throw error;
					throw new require_types.McpError(require_types.ErrorCode.InternalError, `Error validating elicitation response: ${error instanceof Error ? error.message : String(error)}`);
				}
				return result;
			}
		}
	}
	/**
	* Creates a reusable callback that, when invoked, will send a `notifications/elicitation/complete`
	* notification for the specified elicitation ID.
	*
	* @param elicitationId The ID of the elicitation to mark as complete.
	* @param options Optional notification options. Useful when the completion notification should be related to a prior request.
	* @returns A function that emits the completion notification when awaited.
	*/
	createElicitationCompletionNotifier(elicitationId, options) {
		if (!this._clientCapabilities?.elicitation?.url) throw new Error("Client does not support URL elicitation (required for notifications/elicitation/complete)");
		return () => this.notification({
			method: "notifications/elicitation/complete",
			params: { elicitationId }
		}, options);
	}
	async listRoots(params, options) {
		return this.request({
			method: "roots/list",
			params
		}, require_types.ListRootsResultSchema, options);
	}
	/**
	* Sends a logging message to the client, if connected.
	* Note: You only need to send the parameters object, not the entire JSON RPC message
	* @see LoggingMessageNotification
	* @param params
	* @param sessionId optional for stateless and backward compatibility
	*/
	async sendLoggingMessage(params, sessionId) {
		if (this._capabilities.logging) {
			if (!this.isMessageIgnored(params.level, sessionId)) return this.notification({
				method: "notifications/message",
				params
			});
		}
	}
	async sendResourceUpdated(params) {
		return this.notification({
			method: "notifications/resources/updated",
			params
		});
	}
	async sendResourceListChanged() {
		return this.notification({ method: "notifications/resources/list_changed" });
	}
	async sendToolListChanged() {
		return this.notification({ method: "notifications/tools/list_changed" });
	}
	async sendPromptListChanged() {
		return this.notification({ method: "notifications/prompts/list_changed" });
	}
};
//#endregion
//#region ../../node_modules/@modelcontextprotocol/sdk/dist/esm/server/completable.js
var COMPLETABLE_SYMBOL = Symbol.for("mcp.completable");
/**
* Checks if a schema is completable (has completion metadata).
*/
function isCompletable(schema) {
	return !!schema && typeof schema === "object" && COMPLETABLE_SYMBOL in schema;
}
/**
* Gets the completer callback from a completable schema, if it exists.
*/
function getCompleter(schema) {
	return schema[COMPLETABLE_SYMBOL]?.complete;
}
var McpZodTypeKind;
(function(McpZodTypeKind) {
	McpZodTypeKind["Completable"] = "McpCompletable";
})(McpZodTypeKind || (McpZodTypeKind = {}));
//#endregion
//#region ../../node_modules/@modelcontextprotocol/sdk/dist/esm/shared/toolNameValidation.js
/**
* Tool name validation utilities according to SEP: Specify Format for Tool Names
*
* Tool names SHOULD be between 1 and 128 characters in length (inclusive).
* Tool names are case-sensitive.
* Allowed characters: uppercase and lowercase ASCII letters (A-Z, a-z), digits
* (0-9), underscore (_), dash (-), and dot (.).
* Tool names SHOULD NOT contain spaces, commas, or other special characters.
*/
/**
* Regular expression for valid tool names according to SEP-986 specification
*/
var TOOL_NAME_REGEX = /^[A-Za-z0-9._-]{1,128}$/;
/**
* Validates a tool name according to the SEP specification
* @param name - The tool name to validate
* @returns An object containing validation result and any warnings
*/
function validateToolName(name) {
	const warnings = [];
	if (name.length === 0) return {
		isValid: false,
		warnings: ["Tool name cannot be empty"]
	};
	if (name.length > 128) return {
		isValid: false,
		warnings: [`Tool name exceeds maximum length of 128 characters (current: ${name.length})`]
	};
	if (name.includes(" ")) warnings.push("Tool name contains spaces, which may cause parsing issues");
	if (name.includes(",")) warnings.push("Tool name contains commas, which may cause parsing issues");
	if (name.startsWith("-") || name.endsWith("-")) warnings.push("Tool name starts or ends with a dash, which may cause parsing issues in some contexts");
	if (name.startsWith(".") || name.endsWith(".")) warnings.push("Tool name starts or ends with a dot, which may cause parsing issues in some contexts");
	if (!TOOL_NAME_REGEX.test(name)) {
		const invalidChars = name.split("").filter((char) => !/[A-Za-z0-9._-]/.test(char)).filter((char, index, arr) => arr.indexOf(char) === index);
		warnings.push(`Tool name contains invalid characters: ${invalidChars.map((c) => `"${c}"`).join(", ")}`, "Allowed characters are: A-Z, a-z, 0-9, underscore (_), dash (-), and dot (.)");
		return {
			isValid: false,
			warnings
		};
	}
	return {
		isValid: true,
		warnings
	};
}
/**
* Issues warnings for non-conforming tool names
* @param name - The tool name that triggered the warnings
* @param warnings - Array of warning messages
*/
function issueToolNameWarning(name, warnings) {
	if (warnings.length > 0) {
		console.warn(`Tool name validation warning for "${name}":`);
		for (const warning of warnings) console.warn(`  - ${warning}`);
		console.warn("Tool registration will proceed, but this may cause compatibility issues.");
		console.warn("Consider updating the tool name to conform to the MCP tool naming standard.");
		console.warn("See SEP: Specify Format for Tool Names (https://github.com/modelcontextprotocol/modelcontextprotocol/issues/986) for more details.");
	}
}
/**
* Validates a tool name and issues warnings for non-conforming names
* @param name - The tool name to validate
* @returns true if the name is valid, false otherwise
*/
function validateAndWarnToolName(name) {
	const result = validateToolName(name);
	issueToolNameWarning(name, result.warnings);
	return result.isValid;
}
//#endregion
//#region ../../node_modules/@modelcontextprotocol/sdk/dist/esm/experimental/tasks/mcp-server.js
/**
* Experimental McpServer task features for MCP SDK.
* WARNING: These APIs are experimental and may change without notice.
*
* @experimental
*/
/**
* Experimental task features for McpServer.
*
* Access via `server.experimental.tasks`:
* ```typescript
* server.experimental.tasks.registerToolTask('long-running', config, handler);
* ```
*
* @experimental
*/
var ExperimentalMcpServerTasks = class {
	constructor(_mcpServer) {
		this._mcpServer = _mcpServer;
	}
	registerToolTask(name, config, handler) {
		const execution = {
			taskSupport: "required",
			...config.execution
		};
		if (execution.taskSupport === "forbidden") throw new Error(`Cannot register task-based tool '${name}' with taskSupport 'forbidden'. Use registerTool() instead.`);
		return this._mcpServer._createRegisteredTool(name, config.title, config.description, config.inputSchema, config.outputSchema, config.annotations, execution, config._meta, handler);
	}
};
//#endregion
//#region ../../node_modules/@modelcontextprotocol/sdk/dist/esm/server/mcp.js
/**
* High-level MCP server that provides a simpler API for working with resources, tools, and prompts.
* For advanced usage (like sending notifications or setting custom request handlers), use the underlying
* Server instance available via the `server` property.
*/
var McpServer = class {
	constructor(serverInfo, options) {
		this._registeredResources = {};
		this._registeredResourceTemplates = {};
		this._registeredTools = {};
		this._registeredPrompts = {};
		this._toolHandlersInitialized = false;
		this._completionHandlerInitialized = false;
		this._resourceHandlersInitialized = false;
		this._promptHandlersInitialized = false;
		this.server = new Server(serverInfo, options);
	}
	/**
	* Access experimental features.
	*
	* WARNING: These APIs are experimental and may change without notice.
	*
	* @experimental
	*/
	get experimental() {
		if (!this._experimental) this._experimental = { tasks: new ExperimentalMcpServerTasks(this) };
		return this._experimental;
	}
	/**
	* Attaches to the given transport, starts it, and starts listening for messages.
	*
	* The `server` object assumes ownership of the Transport, replacing any callbacks that have already been set, and expects that it is the only user of the Transport instance going forward.
	*/
	async connect(transport) {
		return await this.server.connect(transport);
	}
	/**
	* Closes the connection.
	*/
	async close() {
		await this.server.close();
	}
	setToolRequestHandlers() {
		if (this._toolHandlersInitialized) return;
		this.server.assertCanSetRequestHandler(getMethodValue(require_types.ListToolsRequestSchema));
		this.server.assertCanSetRequestHandler(getMethodValue(require_types.CallToolRequestSchema));
		this.server.registerCapabilities({ tools: { listChanged: true } });
		this.server.setRequestHandler(require_types.ListToolsRequestSchema, () => ({ tools: Object.entries(this._registeredTools).filter(([, tool]) => tool.enabled).map(([name, tool]) => {
			const toolDefinition = {
				name,
				title: tool.title,
				description: tool.description,
				inputSchema: (() => {
					const obj = require_helpers.normalizeObjectSchema(tool.inputSchema);
					return obj ? require_helpers.toJsonSchemaCompat(obj, {
						strictUnions: true,
						pipeStrategy: "input"
					}) : EMPTY_OBJECT_JSON_SCHEMA;
				})(),
				annotations: tool.annotations,
				execution: tool.execution,
				_meta: tool._meta
			};
			if (tool.outputSchema) {
				const obj = require_helpers.normalizeObjectSchema(tool.outputSchema);
				if (obj) toolDefinition.outputSchema = require_helpers.toJsonSchemaCompat(obj, {
					strictUnions: true,
					pipeStrategy: "output"
				});
			}
			return toolDefinition;
		}) }));
		this.server.setRequestHandler(require_types.CallToolRequestSchema, async (request, extra) => {
			try {
				const tool = this._registeredTools[request.params.name];
				if (!tool) throw new require_types.McpError(require_types.ErrorCode.InvalidParams, `Tool ${request.params.name} not found`);
				if (!tool.enabled) throw new require_types.McpError(require_types.ErrorCode.InvalidParams, `Tool ${request.params.name} disabled`);
				const isTaskRequest = !!request.params.task;
				const taskSupport = tool.execution?.taskSupport;
				const isTaskHandler = "createTask" in tool.handler;
				if ((taskSupport === "required" || taskSupport === "optional") && !isTaskHandler) throw new require_types.McpError(require_types.ErrorCode.InternalError, `Tool ${request.params.name} has taskSupport '${taskSupport}' but was not registered with registerToolTask`);
				if (taskSupport === "required" && !isTaskRequest) throw new require_types.McpError(require_types.ErrorCode.MethodNotFound, `Tool ${request.params.name} requires task augmentation (taskSupport: 'required')`);
				if (taskSupport === "optional" && !isTaskRequest && isTaskHandler) return await this.handleAutomaticTaskPolling(tool, request, extra);
				const args = await this.validateToolInput(tool, request.params.arguments, request.params.name);
				const result = await this.executeToolHandler(tool, args, extra);
				if (isTaskRequest) return result;
				await this.validateToolOutput(tool, result, request.params.name);
				return result;
			} catch (error) {
				if (error instanceof require_types.McpError) {
					if (error.code === require_types.ErrorCode.UrlElicitationRequired) throw error;
				}
				return this.createToolError(error instanceof Error ? error.message : String(error));
			}
		});
		this._toolHandlersInitialized = true;
	}
	/**
	* Creates a tool error result.
	*
	* @param errorMessage - The error message.
	* @returns The tool error result.
	*/
	createToolError(errorMessage) {
		return {
			content: [{
				type: "text",
				text: errorMessage
			}],
			isError: true
		};
	}
	/**
	* Validates tool input arguments against the tool's input schema.
	*/
	async validateToolInput(tool, args, toolName) {
		if (!tool.inputSchema) return;
		const parseResult = await require_helpers.safeParseAsync(require_helpers.normalizeObjectSchema(tool.inputSchema) ?? tool.inputSchema, args);
		if (!parseResult.success) {
			const errorMessage = require_helpers.getParseErrorMessage("error" in parseResult ? parseResult.error : "Unknown error");
			throw new require_types.McpError(require_types.ErrorCode.InvalidParams, `Input validation error: Invalid arguments for tool ${toolName}: ${errorMessage}`);
		}
		return parseResult.data;
	}
	/**
	* Validates tool output against the tool's output schema.
	*/
	async validateToolOutput(tool, result, toolName) {
		if (!tool.outputSchema) return;
		if (!("content" in result)) return;
		if (result.isError) return;
		if (!result.structuredContent) throw new require_types.McpError(require_types.ErrorCode.InvalidParams, `Output validation error: Tool ${toolName} has an output schema but no structured content was provided`);
		const parseResult = await require_helpers.safeParseAsync(require_helpers.normalizeObjectSchema(tool.outputSchema), result.structuredContent);
		if (!parseResult.success) {
			const errorMessage = require_helpers.getParseErrorMessage("error" in parseResult ? parseResult.error : "Unknown error");
			throw new require_types.McpError(require_types.ErrorCode.InvalidParams, `Output validation error: Invalid structured content for tool ${toolName}: ${errorMessage}`);
		}
	}
	/**
	* Executes a tool handler (either regular or task-based).
	*/
	async executeToolHandler(tool, args, extra) {
		const handler = tool.handler;
		if ("createTask" in handler) {
			if (!extra.taskStore) throw new Error("No task store provided.");
			const taskExtra = {
				...extra,
				taskStore: extra.taskStore
			};
			if (tool.inputSchema) {
				const typedHandler = handler;
				return await Promise.resolve(typedHandler.createTask(args, taskExtra));
			} else {
				const typedHandler = handler;
				return await Promise.resolve(typedHandler.createTask(taskExtra));
			}
		}
		if (tool.inputSchema) {
			const typedHandler = handler;
			return await Promise.resolve(typedHandler(args, extra));
		} else {
			const typedHandler = handler;
			return await Promise.resolve(typedHandler(extra));
		}
	}
	/**
	* Handles automatic task polling for tools with taskSupport 'optional'.
	*/
	async handleAutomaticTaskPolling(tool, request, extra) {
		if (!extra.taskStore) throw new Error("No task store provided for task-capable tool.");
		const args = await this.validateToolInput(tool, request.params.arguments, request.params.name);
		const handler = tool.handler;
		const taskExtra = {
			...extra,
			taskStore: extra.taskStore
		};
		const createTaskResult = args ? await Promise.resolve(handler.createTask(args, taskExtra)) : await Promise.resolve(handler.createTask(taskExtra));
		const taskId = createTaskResult.task.taskId;
		let task = createTaskResult.task;
		const pollInterval = task.pollInterval ?? 5e3;
		while (task.status !== "completed" && task.status !== "failed" && task.status !== "cancelled") {
			await new Promise((resolve) => setTimeout(resolve, pollInterval));
			const updatedTask = await extra.taskStore.getTask(taskId);
			if (!updatedTask) throw new require_types.McpError(require_types.ErrorCode.InternalError, `Task ${taskId} not found during polling`);
			task = updatedTask;
		}
		return await extra.taskStore.getTaskResult(taskId);
	}
	setCompletionRequestHandler() {
		if (this._completionHandlerInitialized) return;
		this.server.assertCanSetRequestHandler(getMethodValue(require_types.CompleteRequestSchema));
		this.server.registerCapabilities({ completions: {} });
		this.server.setRequestHandler(require_types.CompleteRequestSchema, async (request) => {
			switch (request.params.ref.type) {
				case "ref/prompt":
					require_types.assertCompleteRequestPrompt(request);
					return this.handlePromptCompletion(request, request.params.ref);
				case "ref/resource":
					require_types.assertCompleteRequestResourceTemplate(request);
					return this.handleResourceCompletion(request, request.params.ref);
				default: throw new require_types.McpError(require_types.ErrorCode.InvalidParams, `Invalid completion reference: ${request.params.ref}`);
			}
		});
		this._completionHandlerInitialized = true;
	}
	async handlePromptCompletion(request, ref) {
		const prompt = this._registeredPrompts[ref.name];
		if (!prompt) throw new require_types.McpError(require_types.ErrorCode.InvalidParams, `Prompt ${ref.name} not found`);
		if (!prompt.enabled) throw new require_types.McpError(require_types.ErrorCode.InvalidParams, `Prompt ${ref.name} disabled`);
		if (!prompt.argsSchema) return EMPTY_COMPLETION_RESULT;
		const field = require_helpers.getObjectShape(prompt.argsSchema)?.[request.params.argument.name];
		if (!isCompletable(field)) return EMPTY_COMPLETION_RESULT;
		const completer = getCompleter(field);
		if (!completer) return EMPTY_COMPLETION_RESULT;
		return createCompletionResult(await completer(request.params.argument.value, request.params.context));
	}
	async handleResourceCompletion(request, ref) {
		const template = Object.values(this._registeredResourceTemplates).find((t) => t.resourceTemplate.uriTemplate.toString() === ref.uri);
		if (!template) {
			if (this._registeredResources[ref.uri]) return EMPTY_COMPLETION_RESULT;
			throw new require_types.McpError(require_types.ErrorCode.InvalidParams, `Resource template ${request.params.ref.uri} not found`);
		}
		const completer = template.resourceTemplate.completeCallback(request.params.argument.name);
		if (!completer) return EMPTY_COMPLETION_RESULT;
		return createCompletionResult(await completer(request.params.argument.value, request.params.context));
	}
	setResourceRequestHandlers() {
		if (this._resourceHandlersInitialized) return;
		this.server.assertCanSetRequestHandler(getMethodValue(require_types.ListResourcesRequestSchema));
		this.server.assertCanSetRequestHandler(getMethodValue(require_types.ListResourceTemplatesRequestSchema));
		this.server.assertCanSetRequestHandler(getMethodValue(require_types.ReadResourceRequestSchema));
		this.server.registerCapabilities({ resources: { listChanged: true } });
		this.server.setRequestHandler(require_types.ListResourcesRequestSchema, async (request, extra) => {
			const resources = Object.entries(this._registeredResources).filter(([_, resource]) => resource.enabled).map(([uri, resource]) => ({
				uri,
				name: resource.name,
				...resource.metadata
			}));
			const templateResources = [];
			for (const template of Object.values(this._registeredResourceTemplates)) {
				if (!template.resourceTemplate.listCallback) continue;
				const result = await template.resourceTemplate.listCallback(extra);
				for (const resource of result.resources) templateResources.push({
					...template.metadata,
					...resource
				});
			}
			return { resources: [...resources, ...templateResources] };
		});
		this.server.setRequestHandler(require_types.ListResourceTemplatesRequestSchema, async () => {
			return { resourceTemplates: Object.entries(this._registeredResourceTemplates).map(([name, template]) => ({
				name,
				uriTemplate: template.resourceTemplate.uriTemplate.toString(),
				...template.metadata
			})) };
		});
		this.server.setRequestHandler(require_types.ReadResourceRequestSchema, async (request, extra) => {
			const uri = new URL(request.params.uri);
			const resource = this._registeredResources[uri.toString()];
			if (resource) {
				if (!resource.enabled) throw new require_types.McpError(require_types.ErrorCode.InvalidParams, `Resource ${uri} disabled`);
				return resource.readCallback(uri, extra);
			}
			for (const template of Object.values(this._registeredResourceTemplates)) {
				const variables = template.resourceTemplate.uriTemplate.match(uri.toString());
				if (variables) return template.readCallback(uri, variables, extra);
			}
			throw new require_types.McpError(require_types.ErrorCode.InvalidParams, `Resource ${uri} not found`);
		});
		this._resourceHandlersInitialized = true;
	}
	setPromptRequestHandlers() {
		if (this._promptHandlersInitialized) return;
		this.server.assertCanSetRequestHandler(getMethodValue(require_types.ListPromptsRequestSchema));
		this.server.assertCanSetRequestHandler(getMethodValue(require_types.GetPromptRequestSchema));
		this.server.registerCapabilities({ prompts: { listChanged: true } });
		this.server.setRequestHandler(require_types.ListPromptsRequestSchema, () => ({ prompts: Object.entries(this._registeredPrompts).filter(([, prompt]) => prompt.enabled).map(([name, prompt]) => {
			return {
				name,
				title: prompt.title,
				description: prompt.description,
				arguments: prompt.argsSchema ? promptArgumentsFromSchema(prompt.argsSchema) : void 0
			};
		}) }));
		this.server.setRequestHandler(require_types.GetPromptRequestSchema, async (request, extra) => {
			const prompt = this._registeredPrompts[request.params.name];
			if (!prompt) throw new require_types.McpError(require_types.ErrorCode.InvalidParams, `Prompt ${request.params.name} not found`);
			if (!prompt.enabled) throw new require_types.McpError(require_types.ErrorCode.InvalidParams, `Prompt ${request.params.name} disabled`);
			if (prompt.argsSchema) {
				const parseResult = await require_helpers.safeParseAsync(require_helpers.normalizeObjectSchema(prompt.argsSchema), request.params.arguments);
				if (!parseResult.success) {
					const errorMessage = require_helpers.getParseErrorMessage("error" in parseResult ? parseResult.error : "Unknown error");
					throw new require_types.McpError(require_types.ErrorCode.InvalidParams, `Invalid arguments for prompt ${request.params.name}: ${errorMessage}`);
				}
				const args = parseResult.data;
				const cb = prompt.callback;
				return await Promise.resolve(cb(args, extra));
			} else {
				const cb = prompt.callback;
				return await Promise.resolve(cb(extra));
			}
		});
		this._promptHandlersInitialized = true;
	}
	resource(name, uriOrTemplate, ...rest) {
		let metadata;
		if (typeof rest[0] === "object") metadata = rest.shift();
		const readCallback = rest[0];
		if (typeof uriOrTemplate === "string") {
			if (this._registeredResources[uriOrTemplate]) throw new Error(`Resource ${uriOrTemplate} is already registered`);
			const registeredResource = this._createRegisteredResource(name, void 0, uriOrTemplate, metadata, readCallback);
			this.setResourceRequestHandlers();
			this.sendResourceListChanged();
			return registeredResource;
		} else {
			if (this._registeredResourceTemplates[name]) throw new Error(`Resource template ${name} is already registered`);
			const registeredResourceTemplate = this._createRegisteredResourceTemplate(name, void 0, uriOrTemplate, metadata, readCallback);
			this.setResourceRequestHandlers();
			this.sendResourceListChanged();
			return registeredResourceTemplate;
		}
	}
	registerResource(name, uriOrTemplate, config, readCallback) {
		if (typeof uriOrTemplate === "string") {
			if (this._registeredResources[uriOrTemplate]) throw new Error(`Resource ${uriOrTemplate} is already registered`);
			const registeredResource = this._createRegisteredResource(name, config.title, uriOrTemplate, config, readCallback);
			this.setResourceRequestHandlers();
			this.sendResourceListChanged();
			return registeredResource;
		} else {
			if (this._registeredResourceTemplates[name]) throw new Error(`Resource template ${name} is already registered`);
			const registeredResourceTemplate = this._createRegisteredResourceTemplate(name, config.title, uriOrTemplate, config, readCallback);
			this.setResourceRequestHandlers();
			this.sendResourceListChanged();
			return registeredResourceTemplate;
		}
	}
	_createRegisteredResource(name, title, uri, metadata, readCallback) {
		const registeredResource = {
			name,
			title,
			metadata,
			readCallback,
			enabled: true,
			disable: () => registeredResource.update({ enabled: false }),
			enable: () => registeredResource.update({ enabled: true }),
			remove: () => registeredResource.update({ uri: null }),
			update: (updates) => {
				if (typeof updates.uri !== "undefined" && updates.uri !== uri) {
					delete this._registeredResources[uri];
					if (updates.uri) this._registeredResources[updates.uri] = registeredResource;
				}
				if (typeof updates.name !== "undefined") registeredResource.name = updates.name;
				if (typeof updates.title !== "undefined") registeredResource.title = updates.title;
				if (typeof updates.metadata !== "undefined") registeredResource.metadata = updates.metadata;
				if (typeof updates.callback !== "undefined") registeredResource.readCallback = updates.callback;
				if (typeof updates.enabled !== "undefined") registeredResource.enabled = updates.enabled;
				this.sendResourceListChanged();
			}
		};
		this._registeredResources[uri] = registeredResource;
		return registeredResource;
	}
	_createRegisteredResourceTemplate(name, title, template, metadata, readCallback) {
		const registeredResourceTemplate = {
			resourceTemplate: template,
			title,
			metadata,
			readCallback,
			enabled: true,
			disable: () => registeredResourceTemplate.update({ enabled: false }),
			enable: () => registeredResourceTemplate.update({ enabled: true }),
			remove: () => registeredResourceTemplate.update({ name: null }),
			update: (updates) => {
				if (typeof updates.name !== "undefined" && updates.name !== name) {
					delete this._registeredResourceTemplates[name];
					if (updates.name) this._registeredResourceTemplates[updates.name] = registeredResourceTemplate;
				}
				if (typeof updates.title !== "undefined") registeredResourceTemplate.title = updates.title;
				if (typeof updates.template !== "undefined") registeredResourceTemplate.resourceTemplate = updates.template;
				if (typeof updates.metadata !== "undefined") registeredResourceTemplate.metadata = updates.metadata;
				if (typeof updates.callback !== "undefined") registeredResourceTemplate.readCallback = updates.callback;
				if (typeof updates.enabled !== "undefined") registeredResourceTemplate.enabled = updates.enabled;
				this.sendResourceListChanged();
			}
		};
		this._registeredResourceTemplates[name] = registeredResourceTemplate;
		const variableNames = template.uriTemplate.variableNames;
		if (Array.isArray(variableNames) && variableNames.some((v) => !!template.completeCallback(v))) this.setCompletionRequestHandler();
		return registeredResourceTemplate;
	}
	_createRegisteredPrompt(name, title, description, argsSchema, callback) {
		const registeredPrompt = {
			title,
			description,
			argsSchema: argsSchema === void 0 ? void 0 : require_helpers.objectFromShape(argsSchema),
			callback,
			enabled: true,
			disable: () => registeredPrompt.update({ enabled: false }),
			enable: () => registeredPrompt.update({ enabled: true }),
			remove: () => registeredPrompt.update({ name: null }),
			update: (updates) => {
				if (typeof updates.name !== "undefined" && updates.name !== name) {
					delete this._registeredPrompts[name];
					if (updates.name) this._registeredPrompts[updates.name] = registeredPrompt;
				}
				if (typeof updates.title !== "undefined") registeredPrompt.title = updates.title;
				if (typeof updates.description !== "undefined") registeredPrompt.description = updates.description;
				if (typeof updates.argsSchema !== "undefined") registeredPrompt.argsSchema = require_helpers.objectFromShape(updates.argsSchema);
				if (typeof updates.callback !== "undefined") registeredPrompt.callback = updates.callback;
				if (typeof updates.enabled !== "undefined") registeredPrompt.enabled = updates.enabled;
				this.sendPromptListChanged();
			}
		};
		this._registeredPrompts[name] = registeredPrompt;
		if (argsSchema) {
			if (Object.values(argsSchema).some((field) => {
				return isCompletable(field instanceof require_types.ZodOptional ? field._def?.innerType : field);
			})) this.setCompletionRequestHandler();
		}
		return registeredPrompt;
	}
	_createRegisteredTool(name, title, description, inputSchema, outputSchema, annotations, execution, _meta, handler) {
		validateAndWarnToolName(name);
		const registeredTool = {
			title,
			description,
			inputSchema: getZodSchemaObject(inputSchema),
			outputSchema: getZodSchemaObject(outputSchema),
			annotations,
			execution,
			_meta,
			handler,
			enabled: true,
			disable: () => registeredTool.update({ enabled: false }),
			enable: () => registeredTool.update({ enabled: true }),
			remove: () => registeredTool.update({ name: null }),
			update: (updates) => {
				if (typeof updates.name !== "undefined" && updates.name !== name) {
					if (typeof updates.name === "string") validateAndWarnToolName(updates.name);
					delete this._registeredTools[name];
					if (updates.name) this._registeredTools[updates.name] = registeredTool;
				}
				if (typeof updates.title !== "undefined") registeredTool.title = updates.title;
				if (typeof updates.description !== "undefined") registeredTool.description = updates.description;
				if (typeof updates.paramsSchema !== "undefined") registeredTool.inputSchema = require_helpers.objectFromShape(updates.paramsSchema);
				if (typeof updates.outputSchema !== "undefined") registeredTool.outputSchema = require_helpers.objectFromShape(updates.outputSchema);
				if (typeof updates.callback !== "undefined") registeredTool.handler = updates.callback;
				if (typeof updates.annotations !== "undefined") registeredTool.annotations = updates.annotations;
				if (typeof updates._meta !== "undefined") registeredTool._meta = updates._meta;
				if (typeof updates.enabled !== "undefined") registeredTool.enabled = updates.enabled;
				this.sendToolListChanged();
			}
		};
		this._registeredTools[name] = registeredTool;
		this.setToolRequestHandlers();
		this.sendToolListChanged();
		return registeredTool;
	}
	/**
	* tool() implementation. Parses arguments passed to overrides defined above.
	*/
	tool(name, ...rest) {
		if (this._registeredTools[name]) throw new Error(`Tool ${name} is already registered`);
		let description;
		let inputSchema;
		let outputSchema;
		let annotations;
		if (typeof rest[0] === "string") description = rest.shift();
		if (rest.length > 1) {
			const firstArg = rest[0];
			if (isZodRawShapeCompat(firstArg)) {
				inputSchema = rest.shift();
				if (rest.length > 1 && typeof rest[0] === "object" && rest[0] !== null && !isZodRawShapeCompat(rest[0])) annotations = rest.shift();
			} else if (typeof firstArg === "object" && firstArg !== null) {
				if (Object.values(firstArg).some((v) => typeof v === "object" && v !== null)) throw new Error(`Tool ${name} expected a Zod schema or ToolAnnotations, but received an unrecognized object`);
				annotations = rest.shift();
			}
		}
		const callback = rest[0];
		return this._createRegisteredTool(name, void 0, description, inputSchema, outputSchema, annotations, { taskSupport: "forbidden" }, void 0, callback);
	}
	/**
	* Registers a tool with a config object and callback.
	*/
	registerTool(name, config, cb) {
		if (this._registeredTools[name]) throw new Error(`Tool ${name} is already registered`);
		const { title, description, inputSchema, outputSchema, annotations, _meta } = config;
		return this._createRegisteredTool(name, title, description, inputSchema, outputSchema, annotations, { taskSupport: "forbidden" }, _meta, cb);
	}
	prompt(name, ...rest) {
		if (this._registeredPrompts[name]) throw new Error(`Prompt ${name} is already registered`);
		let description;
		if (typeof rest[0] === "string") description = rest.shift();
		let argsSchema;
		if (rest.length > 1) argsSchema = rest.shift();
		const cb = rest[0];
		const registeredPrompt = this._createRegisteredPrompt(name, void 0, description, argsSchema, cb);
		this.setPromptRequestHandlers();
		this.sendPromptListChanged();
		return registeredPrompt;
	}
	/**
	* Registers a prompt with a config object and callback.
	*/
	registerPrompt(name, config, cb) {
		if (this._registeredPrompts[name]) throw new Error(`Prompt ${name} is already registered`);
		const { title, description, argsSchema } = config;
		const registeredPrompt = this._createRegisteredPrompt(name, title, description, argsSchema, cb);
		this.setPromptRequestHandlers();
		this.sendPromptListChanged();
		return registeredPrompt;
	}
	/**
	* Checks if the server is connected to a transport.
	* @returns True if the server is connected
	*/
	isConnected() {
		return this.server.transport !== void 0;
	}
	/**
	* Sends a logging message to the client, if connected.
	* Note: You only need to send the parameters object, not the entire JSON RPC message
	* @see LoggingMessageNotification
	* @param params
	* @param sessionId optional for stateless and backward compatibility
	*/
	async sendLoggingMessage(params, sessionId) {
		return this.server.sendLoggingMessage(params, sessionId);
	}
	/**
	* Sends a resource list changed event to the client, if connected.
	*/
	sendResourceListChanged() {
		if (this.isConnected()) this.server.sendResourceListChanged();
	}
	/**
	* Sends a tool list changed event to the client, if connected.
	*/
	sendToolListChanged() {
		if (this.isConnected()) this.server.sendToolListChanged();
	}
	/**
	* Sends a prompt list changed event to the client, if connected.
	*/
	sendPromptListChanged() {
		if (this.isConnected()) this.server.sendPromptListChanged();
	}
};
var EMPTY_OBJECT_JSON_SCHEMA = {
	type: "object",
	properties: {}
};
/**
* Checks if a value looks like a Zod schema by checking for parse/safeParse methods.
*/
function isZodTypeLike(value) {
	return value !== null && typeof value === "object" && "parse" in value && typeof value.parse === "function" && "safeParse" in value && typeof value.safeParse === "function";
}
/**
* Checks if an object is a Zod schema instance (v3 or v4).
*
* Zod schemas have internal markers:
* - v3: `_def` property
* - v4: `_zod` property
*
* This includes transformed schemas like z.preprocess(), z.transform(), z.pipe().
*/
function isZodSchemaInstance(obj) {
	return "_def" in obj || "_zod" in obj || isZodTypeLike(obj);
}
/**
* Checks if an object is a "raw shape" - a plain object where values are Zod schemas.
*
* Raw shapes are used as shorthand: `{ name: z.string() }` instead of `z.object({ name: z.string() })`.
*
* IMPORTANT: This must NOT match actual Zod schema instances (like z.preprocess, z.pipe),
* which have internal properties that could be mistaken for schema values.
*/
function isZodRawShapeCompat(obj) {
	if (typeof obj !== "object" || obj === null) return false;
	if (isZodSchemaInstance(obj)) return false;
	if (Object.keys(obj).length === 0) return true;
	return Object.values(obj).some(isZodTypeLike);
}
/**
* Converts a provided Zod schema to a Zod object if it is a ZodRawShapeCompat,
* otherwise returns the schema as is. Throws if the value is not a valid Zod schema.
*/
function getZodSchemaObject(schema) {
	if (!schema) return;
	if (isZodRawShapeCompat(schema)) return require_helpers.objectFromShape(schema);
	if (!isZodSchemaInstance(schema)) throw new Error("inputSchema must be a Zod schema or raw shape, received an unrecognized object");
	return schema;
}
function promptArgumentsFromSchema(schema) {
	const shape = require_helpers.getObjectShape(schema);
	if (!shape) return [];
	return Object.entries(shape).map(([name, field]) => {
		return {
			name,
			description: require_helpers.getSchemaDescription(field),
			required: !require_helpers.isSchemaOptional(field)
		};
	});
}
function getMethodValue(schema) {
	const methodSchema = require_helpers.getObjectShape(schema)?.method;
	if (!methodSchema) throw new Error("Schema is missing a method literal");
	const value = require_helpers.getLiteralValue(methodSchema);
	if (typeof value === "string") return value;
	throw new Error("Schema method literal must be a string");
}
function createCompletionResult(suggestions) {
	return { completion: {
		values: suggestions.slice(0, 100),
		total: suggestions.length,
		hasMore: suggestions.length > 100
	} };
}
var EMPTY_COMPLETION_RESULT = { completion: {
	values: [],
	hasMore: false
} };
//#endregion
exports.McpServer = McpServer;
