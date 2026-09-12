const require_chunk = require("./chunk.js");
const require_common = require("./common.js");
const require_workbuddy_auth_product_coordinator = require("./workbuddy-auth-product-coordinator.js");
const require_logger = require("./logger.js");
const require_initialize = require("./initialize.js");
const require_net_log = require("./net-log.js");
const require_workbuddy_product_config = require("./workbuddy-product-config.js");
const require_dev_env_override = require("./dev-env-override.js");
const require_marks = require("./marks.js");
const require_file_authentication_storage = require("./file-authentication-storage.js");
const require_legacy_auth_session_migrator = require("./legacy-auth-session-migrator.js");
const require_module_base = require("./module-base.js");
const require_module_app_server = require("./module.app-server.js");
let node_fs = require("node:fs");
node_fs = require_chunk.__toESM(node_fs);
let _tencent_tencent_docs_ai_engine = require("@tencent/tencent-docs-ai-engine");
//#region ../../packages/workbuddy-server/src/docs/mcp/tencent-docs-engine-provider.ts
require_common.init_common$3();
function createTencentDocsEngineProvider(options) {
	const { documentService, logger } = options;
	return { async resolveAgentEnv() {
		if (await documentService.canEnsureEngineStart().catch(() => false) && !documentService.isEngineStarted()) documentService.ensureEngineStarted("agent-spawn").catch((error) => {
			logger?.warn?.("[TencentDocsEngine] background engine warmup failed during session init", { error: error instanceof Error ? error.message : String(error) });
		});
		const engineStarted = documentService.isEngineStarted();
		const enginePort = documentService.getEnginePort();
		const env = engineStarted ? { ...(0, _tencent_tencent_docs_ai_engine.buildTencentDocsLocalMcpEnv)(enginePort) } : {};
		if (engineStarted && enginePort) env.editor_sdk_port = String(enginePort);
		logger?.info?.("[TencentDocsEngine] resolveAgentEnv result", {
			engineStarted,
			enginePort,
			envKeys: Object.keys(env)
		});
		return env;
	} };
}
//#endregion
//#region ../../packages/workbuddy-server/src/session/tencent-docs-document-lifecycle-port.ts
function resolveStoredSessionTitle(database, sessionId) {
	const row = database.getSession(sessionId);
	const customTitle = row?.customTitle?.trim();
	if (customTitle) return customTitle;
	return row?.title?.trim() || void 0;
}
//#endregion
//#region src/main/features/workflows/migration/file-localstorage-migration-service.ts
var FileBackedLegacyLocalStorageMigrationService = class {
	constructor(resultPath) {
		this.resultPath = resultPath;
	}
	async migrate() {
		if (!this.resultPath) return createSkippedLocalStorageResult("legacy_localstorage_result_path_missing");
		let raw;
		try {
			raw = node_fs.readFileSync(this.resultPath, "utf8");
		} catch (error) {
			return createSkippedLocalStorageResult(`legacy_localstorage_result_read_failed: ${formatError(error)}`);
		}
		try {
			return normalizeLocalStorageResult(JSON.parse(raw));
		} catch (error) {
			return createSkippedLocalStorageResult(`legacy_localstorage_result_parse_failed: ${formatError(error)}`);
		}
	}
};
function normalizeLocalStorageResult(value) {
	if (!value || typeof value !== "object") return createSkippedLocalStorageResult("legacy_localstorage_result_invalid");
	const record = value;
	const entries = isStringRecord(record.entries) ? record.entries : {};
	const sourceSessionPath = typeof record.sourceSessionPath === "string" ? record.sourceSessionPath : "";
	const currentSessionPath = typeof record.currentSessionPath === "string" ? record.currentSessionPath : "";
	const skipped = record.skipped === true;
	const reason = typeof record.reason === "string" ? record.reason : void 0;
	if (skipped) return {
		sourceSessionPath,
		currentSessionPath,
		skipped: true,
		reason,
		entries
	};
	return {
		sourceSessionPath,
		currentSessionPath,
		skipped: false,
		entries
	};
}
function createSkippedLocalStorageResult(reason) {
	return {
		sourceSessionPath: "",
		currentSessionPath: "",
		skipped: true,
		reason,
		entries: {}
	};
}
function isStringRecord(value) {
	if (!value || typeof value !== "object") return false;
	return Object.values(value).every((entry) => typeof entry === "string");
}
function formatError(error) {
	return error instanceof Error ? error.message : String(error);
}
//#endregion
//#region src/main/daemon/app-server/desktop-host-bridge.ts
require_workbuddy_product_config.init_bundled_assets();
require_dev_env_override.init_dev_env_override();
require_workbuddy_product_config.init_workbuddy_product_config();
function createAppServerDesktopHostBridge({ parent, events, appName, appVersion, appLocale, appConfigDir, isPackaged }) {
	return {
		...require_initialize.NOOP_DESKTOP_HOST,
		app: {
			...require_initialize.NOOP_DESKTOP_HOST.app,
			getName: () => appName || require_initialize.NOOP_DESKTOP_HOST.app.getName(),
			getVersion: () => appVersion || require_initialize.NOOP_DESKTOP_HOST.app.getVersion(),
			getLocale: () => appLocale || require_initialize.NOOP_DESKTOP_HOST.app.getLocale(),
			getConfigDir: () => appConfigDir || require_initialize.NOOP_DESKTOP_HOST.app.getConfigDir(),
			isPackaged: () => isPackaged === true
		},
		dialog: createBridgeDialog(parent),
		shell: {
			...require_initialize.NOOP_DESKTOP_HOST.shell,
			openExternal: async (url) => {
				const result = await parent.invoke(require_initialize.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.OPEN_EXTERNAL, url);
				const opened = result === false ? false : true;
				console.log(`[DesktopHostBridge] openExternal RPC result=${String(result)} -> opened=${opened} for: ${url}`);
				return opened;
			},
			openPath: async (filePath) => {
				const result = await parent.invoke(require_initialize.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.OPEN_PATH, filePath);
				return typeof result === "string" ? result : "";
			},
			showItemInFolder: async (filePath) => {
				await parent.invoke(require_initialize.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.SHOW_ITEM_IN_FOLDER, filePath);
			}
		},
		network: {
			...require_initialize.NOOP_DESKTOP_HOST.network,
			fetch: async (url, init) => fetch(url, init),
			getDefaultSession: () => createBridgeSession(parent, "default"),
			getSessionPartition: (partition) => createBridgeSession(parent, partitionToScope(partition)),
			clearDefaultSessionCookiesForDomains: async (domains) => {
				const result = await parent.invoke(require_initialize.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.CLEAR_DEFAULT_SESSION_COOKIES_FOR_DOMAINS, { domains });
				return typeof result === "number" ? result : 0;
			},
			resolveProxy: async (targetUrl) => {
				const result = await parent.invoke(require_initialize.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.RESOLVE_PROXY, { targetUrl });
				return typeof result === "string" ? result : "DIRECT";
			},
			applyProxySettings: async (settings) => {
				const result = await parent.invoke(require_initialize.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.APPLY_PROXY_SETTINGS, { settings });
				if (result && typeof result === "object" && "HTTP_PROXY" in result && "HTTPS_PROXY" in result && "NO_PROXY" in result) return result;
				return {
					HTTP_PROXY: "",
					HTTPS_PROXY: "",
					NO_PROXY: ""
				};
			}
		},
		auth: {
			...require_initialize.NOOP_DESKTOP_HOST.auth,
			decryptLegacyAuthSession: async (encryptedBase64) => {
				const result = await parent.invoke(require_initialize.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.DECRYPT_LEGACY_AUTH_SESSION, { encryptedBase64 });
				return typeof result === "string" ? result : void 0;
			}
		},
		window: {
			...require_initialize.NOOP_DESKTOP_HOST.window,
			send(channel, data) {
				events.push(channel, data);
				return true;
			}
		},
		showTaskCompletedNotification(payload) {
			events.push(require_initialize.WORKBUDDY_APP_SERVER_HOST_EVENT_CHANNELS.TASK_COMPLETED_NOTIFICATION, payload);
			return true;
		}
	};
}
function createBridgeSession(parent, scope) {
	return { cookies: {
		async set(details) {
			await parent.invoke(require_initialize.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.COOKIE_SET, {
				scope,
				details
			});
		},
		async get(filter) {
			const result = await parent.invoke(require_initialize.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.COOKIE_GET, {
				scope,
				filter
			});
			return Array.isArray(result) ? result : [];
		},
		async remove(url, name) {
			await parent.invoke(require_initialize.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.COOKIE_REMOVE, {
				scope,
				url,
				name
			});
		}
	} };
}
function partitionToScope(partition) {
	if (partition === "persist:tdoc-import") return "tdoc-import";
	if (partition === "persist:tdoc-preview") return "tdoc-preview";
	throw new Error(`Unsupported app-server desktop host partition: ${partition}`);
}
function createBridgeDialog(parent) {
	return {
		async showOpenDialog(options) {
			const params = {
				title: options.title,
				defaultPath: options.defaultPath,
				filters: options.filters,
				properties: options.properties
			};
			return readOpenDialogResult(await parent.invoke(require_initialize.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.SHOW_OPEN_DIALOG, params));
		},
		async showSaveDialog(options) {
			const params = {
				title: options.title,
				defaultPath: options.defaultPath,
				filters: options.filters
			};
			return readSaveDialogResult(await parent.invoke(require_initialize.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.SHOW_SAVE_DIALOG, params));
		},
		async showMessageBox(options) {
			const params = {
				type: options.type,
				title: options.title,
				message: options.message,
				detail: options.detail,
				buttons: options.buttons,
				defaultId: options.defaultId,
				cancelId: options.cancelId,
				noLink: options.noLink
			};
			return readMessageBoxResult(await parent.invoke(require_initialize.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.SHOW_MESSAGE_BOX, params));
		}
	};
}
function readOpenDialogResult(value) {
	if (!value || typeof value !== "object") return {
		canceled: true,
		filePaths: []
	};
	const record = value;
	const filePaths = Array.isArray(record.filePaths) ? record.filePaths.filter((item) => typeof item === "string") : [];
	return {
		canceled: record.canceled !== false && filePaths.length === 0,
		filePaths
	};
}
function readSaveDialogResult(value) {
	if (!value || typeof value !== "object") throw new Error("desktopHost.showSaveDialog returned an invalid result");
	const record = value;
	if (record.canceled === true) return { canceled: true };
	const filePath = typeof record.filePath === "string" && record.filePath.trim() ? record.filePath : void 0;
	if (!filePath) throw new Error("desktopHost.showSaveDialog returned an invalid result");
	return {
		canceled: false,
		filePath
	};
}
function readMessageBoxResult(value) {
	if (!value || typeof value !== "object") return { response: 0 };
	const record = value;
	return { response: typeof record.response === "number" ? record.response : 0 };
}
//#endregion
//#region src/main/daemon/daemon-app-server-main.ts
/**
* daemon 子进程侧启动打点（F 段）。daemon 已在入口 initStartupContextFromEnv('daemon')，
* 故 mark 会带 source=daemon、pid=main pid，落进同一个 `<pid>-<time>.jsonl`，供瀑布分泳道
* 展示 daemon 与 main(C)/renderer(E) 的并行。直接用 perf logger，不引 electron（守卫约束）。
* 全程吞异常，绝不阻塞 daemon 启动。
*/
function markDaemon(id) {
	try {
		const def = require_marks.STARTUP_MARKS[id];
		if (!def) return;
		require_marks.getWorkbuddyPerfLogger(require_marks.PerfFlow.STARTUP).mark(def.key, {
			id: def.id,
			phase: def.phase
		});
	} catch {}
}
function requireStdioMode() {
	require_initialize.assertWorkbuddyAppServerStdioMode(process.argv);
}
var daemonAppServerLogger = {
	info: (message, ...args) => {
		require_logger.createWorkbuddyScopedLogger("daemon-app-server").info(message, ...args);
	},
	warn: (message, ...args) => {
		require_logger.createWorkbuddyScopedLogger("daemon-app-server").warn(message, ...args);
	},
	error: (message, ...args) => {
		require_logger.createWorkbuddyScopedLogger("daemon-app-server").error(message, ...args);
	}
};
async function runDaemonAppServerEntry() {
	requireStdioMode();
	require_workbuddy_product_config.setBundledAssetsRoot(__dirname);
	markDaemon("F1");
	const platform = require_initialize.createWorkbuddyAppServerPlatformFromEnv({ processResourcesPath: process.resourcesPath });
	require_initialize.configureWorkbuddyAppServerRuntimeContextFromEnv(platform);
	const daemonServer = new require_initialize.DaemonServer({ logger: {
		info: (message, meta) => daemonAppServerLogger.info(message, meta ?? {}),
		warn: (message, meta) => daemonAppServerLogger.warn(message, meta ?? {})
	} });
	const parentHost = require_initialize.createStdioParentRpcClient({ output: process.stdout });
	const desktopHost = createAppServerDesktopHostBridge({
		parent: parentHost,
		events: daemonServer,
		appName: process.env.WORKBUDDY_APP_NAME,
		appVersion: platform.appVersion,
		appLocale: platform.appLocale(),
		appConfigDir: platform.configDir,
		isPackaged: platform.isPackaged
	});
	const syncTencentDocsEngineOriginToMain = (origin) => {
		parentHost.invoke(require_initialize.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.TENCENT_DOCS_ENGINE_ORIGIN_CHANGED, { ...origin ? { origin } : {} }).catch((error) => {
			daemonAppServerLogger.warn("Failed to sync Tencent Docs engine origin to main:", error);
		});
	};
	const disposeTencentDocsEngineOriginSync = require_workbuddy_auth_product_coordinator.onActiveTencentDocsEngineOriginChange(syncTencentDocsEngineOriginToMain);
	syncTencentDocsEngineOriginToMain(require_workbuddy_auth_product_coordinator.getActiveTencentDocsEngineOrigin());
	require_file_authentication_storage.setWorkbuddyLegacyAuthSessionMigrator(require_legacy_auth_session_migrator.createLegacyAuthSessionMigrator({ decryptString: (encrypted) => desktopHost.auth.decryptLegacyAuthSession(encrypted.toString("base64")) }, daemonAppServerLogger));
	const resolveDaemonProxyEnv = () => require_initialize.resolveProxyEnv(void 0, { resolveProxy: (targetUrl) => desktopHost.network.resolveProxy(targetUrl) });
	let celljsContainerReady = false;
	let daemonReady = false;
	const resources = {};
	const lifecycle = require_initialize.startWorkbuddyAppServerStdioLifecycle({
		server: daemonServer,
		emitReady: false,
		getPingStatus: () => ({
			ok: true,
			pid: process.pid,
			appVersion: platform.appVersion,
			celljsReady: celljsContainerReady,
			daemonReady
		}),
		shutdown: async () => {
			parentHost.rejectPending(/* @__PURE__ */ new Error("Daemon app-server shutting down"));
			await (await resources.backgroundPromise?.catch(() => void 0))?.stop().catch((error) => {
				daemonAppServerLogger.error("Failed to stop background services:", error);
			});
			try {
				resources.mcpAppsHost?.stop();
			} catch (error) {
				daemonAppServerLogger.error("Failed to stop MCP Apps host:", error);
			}
			resources.disposeMigrationRuntimeHandlers?.();
			resources.disposeEdgeSyncPowerRecovery?.();
			resources.hostPowerEvents?.dispose();
			await resources.pacRpc?.close().catch((error) => {
				daemonAppServerLogger.warn("Failed to stop PAC RPC service:", error);
			});
			for (const dispose of disposeTencentDocsSelectionBroadcast) try {
				dispose();
			} catch {}
			await resources.daemon?.stop().catch((error) => {
				daemonAppServerLogger.error("Failed to stop daemon:", error);
			});
			disposeTencentDocsEngineOriginSync();
			resources.database?.dispose();
		},
		logger: {
			error: (message, ...args) => {
				daemonAppServerLogger.error(message, ...args);
			},
			warn: (message, meta) => {
				daemonAppServerLogger.warn(message, meta ?? {});
			}
		},
		onUnhandledFrame: (frame) => parentHost.handleFrame(frame),
		exit: (code) => process.exit(code)
	});
	resources.pacRpc = await configureDaemonNetworkProxy(resolveDaemonProxyEnv, process.env.WORKBUDDY_PAC_RESOLVER === "off" ? void 0 : (targetUrl) => desktopHost.network.resolveProxy(targetUrl));
	const celljsContainer = await require_initialize.initializeCellJSContainer({
		baseModules: require_module_base.baseModules,
		workbuddyModule: require_module_app_server.default
	});
	celljsContainerReady = true;
	const database = require_initialize.createInitializedWorkbuddyAppServerDatabase({
		configDir: platform.configDir,
		logger: { info: (message) => daemonAppServerLogger.info(message) }
	});
	resources.database = database;
	markDaemon("F2");
	const celljs = require_initialize.resolveCellJSDeps(celljsContainer, {
		database,
		windowManager: require_initialize.createNoopWorkbuddyAppServerWindowManager()
	});
	markDaemon("F3");
	const tencentDocsNativeHostPlatform = {
		osPlatform: platform.osPlatform ?? process.platform,
		showMessageBox: (options) => desktopHost.dialog.showMessageBox(options),
		showOpenDialog: (options) => desktopHost.dialog.showOpenDialog(options),
		showSaveDialog: (options) => desktopHost.dialog.showSaveDialog(options)
	};
	const reportTencentDocsPreviewTelemetry = (eventCode, payload) => {
		try {
			Promise.resolve(celljs.eventService.report(eventCode, payload)).catch((error) => {
				daemonAppServerLogger.warn("[TencentDocsPreviewTelemetry] report rejected:", eventCode, error);
			});
		} catch (error) {
			daemonAppServerLogger.warn("[TencentDocsPreviewTelemetry] report threw:", eventCode, error);
		}
	};
	const tencentDocsDocumentService = require_workbuddy_auth_product_coordinator.initializeTencentDocsDocumentService({
		requestDirtyEditorCloseDecision: require_workbuddy_auth_product_coordinator.createNativeHostDirtyEditorCloseDecision(tencentDocsNativeHostPlatform),
		requestOriginalFileConflictDecision: require_workbuddy_auth_product_coordinator.createNativeHostOriginalFileConflictDecision(tencentDocsNativeHostPlatform),
		notifyOriginalFileChanged: require_workbuddy_auth_product_coordinator.createNativeHostOriginalFileChangedNotifier(tencentDocsNativeHostPlatform),
		reportTelemetry: reportTencentDocsPreviewTelemetry
	});
	tencentDocsDocumentService.setEngineReadyHandler(() => {
		daemonServer.push(require_initialize.TENCENT_DOCS_RENDERER_PUSH_CHANNELS.ENGINE_READY, {});
	});
	tencentDocsDocumentService.setPreviewReloadHandler((payload) => {
		daemonServer.push(require_initialize.TENCENT_DOCS_RENDERER_PUSH_CHANNELS.RELOAD_EMBEDDED_PREVIEW, payload);
	});
	const tencentDocsMcp = createTencentDocsEngineProvider({
		documentService: tencentDocsDocumentService,
		logger: daemonAppServerLogger
	});
	const localDocsFacade = require_initialize.createLocalDocsHostFacade({
		documentService: tencentDocsDocumentService,
		platform: tencentDocsNativeHostPlatform,
		logger: daemonAppServerLogger,
		isTencentDocsAiEditEnabled: () => require_workbuddy_auth_product_coordinator.resolveTencentDocsAiEditConfigEnabled(celljs.productManager?.getCurrentConfiguration?.()?.productFeatures, celljs.authenticationManager?.currentSessionSubject.getValue()?.account)
	});
	const pushTencentDocsSelection = (notification) => {
		daemonServer.push(notification.sendAction ? require_workbuddy_auth_product_coordinator.DOCS_RPC_EX_CHANNELS.SELECTION_SEND : require_workbuddy_auth_product_coordinator.DOCS_RPC_EX_CHANNELS.SELECTION_CHANGED, notification);
	};
	const disposeTencentDocsSelectionBroadcast = [tencentDocsDocumentService.onSelectionChange(pushTencentDocsSelection), require_initialize.getOnlineDocumentSelectionStore().onSelectionChange(pushTencentDocsSelection)];
	markDaemon("F4");
	const migrationService = new require_initialize.MigrationService(database, celljs.logger, void 0, void 0, {
		userIdProvider: () => celljs.authService.getAccount()?.uid,
		localStorageServiceFactory: () => new FileBackedLegacyLocalStorageMigrationService(process.env.WORKBUDDY_LEGACY_LOCALSTORAGE_MIGRATION_RESULT_PATH)
	});
	let baseMigrationRuntimeHandlersRegistered = false;
	const ensureBaseMigrationRuntimeHandlers = (server) => {
		if (baseMigrationRuntimeHandlersRegistered) return;
		resources.disposeMigrationRuntimeHandlers = require_initialize.registerWorkbuddyMainRuntimeHandlers(server, { migration: {
			getHistoryStatus: () => migrationService.getHistoryStatus(),
			replayArchived: (ids) => migrationService.replayArchivedManual(ids),
			getPendingLocalStorageMigration: () => migrationService.getPendingLocalStorageMigration(),
			completeLocalStorageMigration: (result) => migrationService.completeLocalStorageMigration(result),
			getArchivedSyncService: () => migrationService.getArchivedSyncService(),
			logger: {
				info: (message) => daemonAppServerLogger.info(message),
				warn: (message, ...args) => daemonAppServerLogger.warn(message, ...args),
				error: (message, ...args) => daemonAppServerLogger.error(message, ...args)
			}
		} });
		baseMigrationRuntimeHandlersRegistered = true;
	};
	markDaemon("F5");
	const runtimeManager = require_initialize.createWorkbuddySidecarManager({
		getMcpConfig: () => require_workbuddy_auth_product_coordinator.buildConnectorProxyMcpConfig(celljs.connectorProxyServer.getPort(), {
			cloudMemoryEnabled: celljs.configService.get("generateMemoryEnabled") !== false,
			proxySecret: celljs.connectorProxyServer.getProxySecret(),
			netdriveEnabled: false
		}),
		getConnectorTokenEnv: () => celljs.connectorService.getSkillOnlyTokenEnv(),
		getQimei36: () => process.env.CODEBUDDY_QIMEI36?.trim() || void 0,
		resolveProxyEnv: resolveDaemonProxyEnv,
		resolveCliEnvRouteMode: require_dev_env_override.resolveCliEnvRouteModeOverride
	});
	const sendMetric = (payload) => {
		parentHost.invoke(require_initialize.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.MONITOR_REPORT_METRIC, payload).catch(() => void 0);
	};
	const remoteMonitorService = {
		applyRendererSessionId: (sessionId) => {
			parentHost.invoke(require_initialize.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.MONITOR_APPLY_RENDERER_SESSION_ID, { sessionId }).catch(() => void 0);
		},
		recordDuration: (metric, durationMs, dims) => {
			sendMetric({
				kind: "duration",
				metric,
				value: durationMs,
				dims
			});
		},
		addCounter: (metric, count, dims) => {
			sendMetric({
				kind: "counter",
				metric,
				value: count,
				dims
			});
		},
		reportEvent: (name, ext) => {
			sendMetric({
				kind: "event",
				name,
				ext
			});
		}
	};
	require_module_app_server.setConnectorMetricReporter({
		recordDuration: (metric, durationMs, dims) => {
			sendMetric({
				kind: "duration",
				metric,
				value: durationMs,
				dims
			});
		},
		addCounter: (metric, count, dims) => {
			sendMetric({
				kind: "counter",
				metric,
				value: count,
				dims
			});
		}
	});
	markDaemon("F6");
	markDaemon("F7");
	const daemon = await require_initialize.bootstrapDaemon({
		celljs,
		platform,
		runtimeManager,
		desktopHost,
		createRpcServer: () => daemonServer,
		rpcHandlerProfile: "daemon-app-server",
		resolveProxyEnv: resolveDaemonProxyEnv,
		tencentDocsMcp,
		localDocsReleaseBridge: require_initialize.createLocalDocsReleaseBridgeFromFacade(localDocsFacade),
		localDocs: localDocsFacade,
		tencentDocsRuntime: {
			documentService: tencentDocsDocumentService,
			push: (channel, data) => daemonServer.push(channel, data),
			documentPreviewPoolCapacity: 5
		},
		localDocumentMediaTypes: require_initialize.createTencentDocsLocalDocumentMediaTypes(),
		createDocumentLifecycle: ({ sessionManager }) => {
			const documentLifecycle = require_initialize.createTencentDocsDocumentLifecycleDeps({
				sessionManager,
				documentService: tencentDocsDocumentService
			});
			tencentDocsDocumentService.setSessionConflictLookups({
				isSessionStillProcessing: documentLifecycle.isSessionStillProcessing,
				getSessionTitle: (sessionId) => resolveStoredSessionTitle(database, sessionId)
			});
			return documentLifecycle;
		},
		monitorEvent: (name, ext) => {
			sendMetric({
				kind: "event",
				name,
				ext
			});
		},
		promptTraceReporters: {
			reportForwarding: (payload) => {
				parentHost.invoke(require_initialize.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.MONITOR_REPORT_PROMPT_FORWARDING, payload).catch(() => void 0);
			},
			reportDone: (payload) => {
				parentHost.invoke(require_initialize.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.MONITOR_REPORT_PROMPT_DONE, payload).catch(() => void 0);
			},
			reportTrace: async (payload) => {
				try {
					await parentHost.invoke(require_initialize.WORKBUDDY_APP_SERVER_HOST_RPC_CHANNELS.MONITOR_REPORT_PROMPT_TRACE, payload);
				} catch {}
			}
		},
		getMonitorService: () => remoteMonitorService,
		onRpcReady: (server) => {
			ensureBaseMigrationRuntimeHandlers(server);
			lifecycle.signalReady();
		},
		docsService: {
			getPreviewUrl: (filePath, options) => tencentDocsDocumentService.createPreviewUrl(filePath, options),
			dispose: () => tencentDocsDocumentService.dispose()
		},
		getSandboxPreviewMountService: () => resources.mcpAppsHost?.sandboxPreviewMountService,
		getSandboxPreviewHttpPort: () => resources.mcpAppsHost?.getSandboxPreviewHttpPort?.() ?? 0
	});
	resources.daemon = daemon;
	markDaemon("F8");
	daemonReady = true;
	ensureBaseMigrationRuntimeHandlers(daemon.server);
	lifecycle.signalReady();
	markDaemon("F9");
	const startupMigration = await require_initialize.startWorkbuddyAppServerStartupMigration({
		migrationService,
		productName: await resolveProductName(celljs),
		onHistoryProgress: (current, total, name) => {
			daemon.server.push(require_workbuddy_auth_product_coordinator.MIGRATION_RPC_CHANNELS.HISTORY_PROGRESS, {
				current,
				total,
				name
			});
		},
		logger: {
			info: (message) => daemonAppServerLogger.info(message),
			warn: (message, ...args) => daemonAppServerLogger.warn(message, ...args)
		}
	});
	markDaemon("F10");
	resources.disposeMigrationRuntimeHandlers?.();
	resources.disposeMigrationRuntimeHandlers = require_initialize.registerWorkbuddyMainRuntimeHandlers(daemon.server, { migration: startupMigration.createRuntimeHandlersDeps({ logger: {
		info: (message) => daemonAppServerLogger.info(message),
		warn: (message, ...args) => daemonAppServerLogger.warn(message, ...args),
		error: (message, ...args) => daemonAppServerLogger.error(message, ...args)
	} }) });
	{
		const FRAGMENT_REPAIR_TIMEOUT_MS = 3e5;
		const fileLogger = require_initialize.MigrationFileLogger.getInstance();
		const runFragmentRepair = async (historyResult) => {
			if (historyResult && !historyResult.success) {
				fileLogger.warn(`[SessionFragmentRepair] Skipping repair because history migration did not succeed (${historyResult.error ?? historyResult.message})`);
				return;
			}
			const repairPromise = new require_initialize.SessionFragmentRepairService().repair(database, fileLogger);
			repairPromise.catch(() => {});
			let repairTimer;
			const timeoutPromise = new Promise((_, reject) => {
				repairTimer = setTimeout(() => {
					fileLogger.warn(`[SessionFragmentRepair] Repair aborted by timeout after ${FRAGMENT_REPAIR_TIMEOUT_MS}ms — marker NOT written, will retry on next startup`);
					reject(/* @__PURE__ */ new Error(`repair timed out after ${FRAGMENT_REPAIR_TIMEOUT_MS}ms`));
				}, FRAGMENT_REPAIR_TIMEOUT_MS);
				repairTimer.unref?.();
			});
			try {
				return await Promise.race([repairPromise, timeoutPromise]);
			} catch (err) {
				daemonAppServerLogger.warn(`[SessionFragmentRepair] Failed (non-fatal): ${err instanceof Error ? err.message : String(err)}`);
				fileLogger.error("[SessionFragmentRepair] Failed (non-fatal):", err instanceof Error ? err : new Error(String(err)));
			} finally {
				clearTimeout(repairTimer);
			}
		};
		const deferredHistory = startupMigration.deferredHistory;
		if (deferredHistory) deferredHistory.then(runFragmentRepair).catch(() => {});
		else Promise.resolve().then(() => runFragmentRepair()).catch(() => {});
	}
	const hostPowerEvents = require_initialize.createWorkbuddyAppServerHostPowerEvents();
	resources.hostPowerEvents = hostPowerEvents;
	hostPowerEvents.registerHandlers(daemon.server);
	resources.disposeEdgeSyncPowerRecovery = hostPowerEvents.onResume(() => {
		daemon.recoverEdgeSyncAfterNetworkResume("system-resume").catch((error) => {
			daemonAppServerLogger.warn("[EdgeSync] recovery after system resume failed:", error);
		});
	});
	resources.mcpAppsHost = await require_initialize.startWorkbuddyAppServerDefaultMcpAppsHost({
		celljs,
		daemon,
		connectorOauthFetch: (url, init) => fetch(url, init),
		serverFetch: (url, init) => fetch(url, init),
		resolveBundledAsset: require_workbuddy_product_config.resolveBundledAsset,
		logger: daemonAppServerLogger
	});
	markDaemon("F11");
	const backgroundPromise = require_initialize.startWorkbuddyAppServerDefaultBackgroundServices({
		celljs,
		runtimeManager,
		daemon,
		builtinSkillsDir: require_workbuddy_product_config.requireBundledAsset("builtin-skills"),
		connectorOauthFetch: (url, init) => fetch(url, init),
		resolveBundledAsset: require_workbuddy_product_config.resolveBundledAsset,
		resolveBuiltinMarketEndpointOverride: require_dev_env_override.resolveEndpointOverride,
		logger: daemonAppServerLogger,
		connectorPowerEvents: hostPowerEvents,
		prewarmPool: daemon.cliPrewarmPool,
		...resources.mcpAppsHost?.staticHtmlServer ? { staticHtmlServer: resources.mcpAppsHost.staticHtmlServer } : {}
	});
	resources.backgroundPromise = backgroundPromise;
	markDaemon("F12");
	backgroundPromise.then(() => {
		markDaemon("F13");
	}, (error) => {
		daemonAppServerLogger.error("Background services start error:", error);
	});
	const shutdown = () => {
		lifecycle.shutdown().catch((error) => {
			daemonAppServerLogger.error("[DaemonAppServer] Shutdown failed:", error);
		});
	};
	process.on("SIGTERM", shutdown);
	process.on("SIGINT", shutdown);
}
async function configureDaemonNetworkProxy(resolveDaemonProxyEnv, pacResolver) {
	let pacRpcHandle;
	if (pacResolver) {
		try {
			require_net_log.setPacResolver(pacResolver);
			daemonAppServerLogger.info("PAC resolver installed (per-request resolveProxy via host bridge)");
		} catch (error) {
			daemonAppServerLogger.warn("install PAC resolver failed (non-fatal, falling back to env)", error);
		}
		try {
			pacRpcHandle = await require_initialize.startPacRpcService(pacResolver, { logger: {
				info: (msg) => daemonAppServerLogger.info(msg),
				warn: (msg) => daemonAppServerLogger.warn(msg)
			} });
			if (pacRpcHandle) {
				process.env[require_initialize.PAC_RPC_SOCKET_ENV] = pacRpcHandle.socketPath;
				process.env[require_initialize.PAC_RPC_TOKEN_ENV] = pacRpcHandle.token;
				daemonAppServerLogger.info(`PAC RPC service started: socket=${pacRpcHandle.socketPath} (token written to env)`);
			}
		} catch (error) {
			daemonAppServerLogger.warn("start PAC RPC service failed (non-fatal, CLI will skip L0)", error);
		}
	}
	try {
		const proxyEnv = await resolveDaemonProxyEnv();
		for (const [key, value] of Object.entries(proxyEnv)) {
			if (key === "NODE_OPTIONS") continue;
			if (typeof value === "string" && value.length > 0) process.env[key] = value;
		}
	} catch (error) {
		daemonAppServerLogger.warn("resolve daemon proxy env failed (non-fatal)", error);
	}
	require_net_log.installUndiciProxyDispatcher();
	require_net_log.installAxiosGlobalProxy();
	require_workbuddy_auth_product_coordinator.suppressTlsRejectWarning();
	try {
		if (require_workbuddy_product_config.tryGetWorkbuddyBaseProductConfiguration()?.productFeatures?.[require_common.ProductFeature.DisableTlsVerification]) require_workbuddy_auth_product_coordinator.disableTlsVerificationForProcess("bootstrap:daemon:product.json");
	} catch (error) {
		daemonAppServerLogger.warn("[TlsVerification] early bootstrap injection skipped (non-fatal)", error);
	}
	return pacRpcHandle;
}
async function resolveProductName(celljs) {
	const fromEnv = process.env.WORKBUDDY_PRODUCT_NAME?.trim();
	if (fromEnv) return fromEnv;
	try {
		const productName = (await celljs.productManager?.waitConfiguration?.())?.productName ?? celljs.productManager?.configuration?.productName;
		if (typeof productName === "string" && productName.trim()) return productName;
	} catch {}
	return "WorkBuddy";
}
//#endregion
exports.runDaemonAppServerEntry = runDaemonAppServerEntry;
