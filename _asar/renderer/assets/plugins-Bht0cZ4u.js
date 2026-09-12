import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { $a as SECURITY_AUTO_INSTALL_CHANGE_EVENT, $c as McpModal, Gc as ConnectorPanel, Kc as init_connector_panel, Ms as useAssistantDisplay, Qa as ENABLE_SKILL_SECURITY_SCAN_KEY, Rl as init_use_vpc_connector_policy, Yl as useNamedPageShow, a as WorkBuddyTopBar, c as useTopBarRootClassName, ca as init_use_connector_feature, el as init_mcp_modal, eo as SECURITY_AUTO_INSTALL_KEY, js as init_use_assistant_display, la as useConnectorFeature, ll as init_telemetry_context, o as init_workbuddy_topbar, ql as init_use_named_page_show, r as SidebarExpandButton, to as init_skills_security_types, ul as useAgentTelemetry, zl as useVpcConnectorPolicy } from "./agent-mail-CiuzbR2o.js";
import { Yr as toast, b as Plugins, t as init_src } from "./src-DRGoWjIu.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { p as init_environment, y as isWorkBuddy } from "./environment-DKqg3f0G.js";
import { t as init_contexts } from "./contexts-D7XKqa2J.js";
import { r as useAdapter } from "./adapter-context-DGaRYQ5R.js";
import { ct as Button, nt as init_Input, st as init_Button, tt as Input } from "./foundation-QOglV606.js";
import { r as useTranslation, t as init_useI18n } from "./useI18n-DDytAo7_.js";
import { i as useModuleHost } from "./module-host-context-CI9spvhq.js";
import { H as InstalledSkillIcon, gt as AddCircleIcon, ot as ChevronLeftIcon, r as init_icons } from "./oauth-callback-IQ0UCaVX.js";
import { o as asyncSecurityScanService, s as init_async_security_scan_service } from "./skill-import-errors-BlMOiDaZ.js";
import { ht as writeCache, mt as readCache, pt as init_local_cache } from "./center-Cjtv6Q1N.js";
import { t as init_context } from "./context-2xODbZdo.js";
import { n as init_skills, t as SkillsPanel } from "./skills-8UqBvkjc.js";
//#region ../../packages/agent-ui/src/components/plugins-panel/styles.less
var init_styles = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/hooks/use-async-security-scan.ts
function useAsyncSecurityScan() {
	const t = useTranslation();
	const personalSkillsFacade = useModuleHost().facades.personalSkills;
	const [pendingTasks, setPendingTasks] = (0, import_react$4.useState)(() => asyncSecurityScanService.pendingTasks$.getValue());
	const [skillRiskMap, setSkillRiskMap] = (0, import_react$4.useState)(() => asyncSecurityScanService.skillRiskMap$.getValue());
	(0, import_react$4.useEffect)(() => {
		asyncSecurityScanService.setPersonalSkillsFacade(personalSkillsFacade ?? null);
	}, [personalSkillsFacade]);
	(0, import_react$4.useEffect)(() => {
		const sub = asyncSecurityScanService.pendingTasks$.subscribe(setPendingTasks);
		return () => sub.unsubscribe();
	}, []);
	(0, import_react$4.useEffect)(() => {
		const sub = asyncSecurityScanService.skillRiskMap$.subscribe(setSkillRiskMap);
		return () => sub.unsubscribe();
	}, []);
	(0, import_react$4.useEffect)(() => {
		const sub = asyncSecurityScanService.completedEvent$.subscribe((event) => {
			if (!event || !event.task.skillName) return;
			switch (event.type) {
				case "riskFound":
					toast({
						message: t("skills.security.async.riskFound", { name: event.task.skillName }),
						type: "warning"
					});
					break;
				case "safe":
					toast({
						message: t("skills.security.async.safe", { name: event.task.skillName }),
						type: "success"
					});
					break;
				case "timeout":
					toast({
						message: t("skills.security.async.timeout", { name: event.task.skillName }),
						type: "warning"
					});
					break;
				case "error":
					toast({
						message: t("skills.security.async.error", { name: event.task.skillName }),
						type: "error"
					});
					break;
			}
		});
		return () => sub.unsubscribe();
	}, [t]);
	return {
		addTask: (0, import_react$4.useCallback)((task) => {
			asyncSecurityScanService.addTask(task);
		}, []),
		removeTask: (0, import_react$4.useCallback)((md5) => {
			asyncSecurityScanService.removeTask(md5);
		}, []),
		updateTask: (0, import_react$4.useCallback)((md5, updates) => {
			asyncSecurityScanService.updateTask(md5, updates);
		}, []),
		pendingTasks,
		skillRiskMap,
		clearRisk: (0, import_react$4.useCallback)((filePath) => {
			asyncSecurityScanService.clearRisk(filePath);
		}, [])
	};
}
var import_react$4;
var init_use_async_security_scan = __esmMin((() => {
	init_src();
	import_react$4 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_async_security_scan_service();
	init_context();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/hooks/use-security-preference.ts
function useSecurityPreference(adapter) {
	const [scanEnabled, setScanEnabled] = (0, import_react$3.useState)(true);
	const [autoInstallNonHighRisk, setAutoInstallNonHighRisk] = (0, import_react$3.useState)(() => readCache("skills-security-auto-install-non-high-risk") ?? false);
	(0, import_react$3.useEffect)(() => {
		if (!adapter?.getProductFeatures) return;
		let cancelled = false;
		adapter.getProductFeatures().then((features) => {
			if (!cancelled && features && "SkillSecurityScan" in features) setScanEnabled(features[ENABLE_SKILL_SECURITY_SCAN_KEY] !== false);
		});
		return () => {
			cancelled = true;
		};
	}, [adapter]);
	(0, import_react$3.useEffect)(() => {
		if (!adapter?.onProductConfigChanged) return;
		return adapter.onProductConfigChanged((params) => {
			if (params.productFeatures && "SkillSecurityScan" in params.productFeatures) setScanEnabled(params.productFeatures[ENABLE_SKILL_SECURITY_SCAN_KEY] !== false);
		});
	}, [adapter]);
	(0, import_react$3.useEffect)(() => {
		const handlePreferenceChanged = (event) => {
			const detail = event.detail;
			if (typeof detail?.enabled === "boolean") {
				setAutoInstallNonHighRisk(detail.enabled);
				return;
			}
			setAutoInstallNonHighRisk(readCache("skills-security-auto-install-non-high-risk") ?? false);
		};
		window.addEventListener(SECURITY_AUTO_INSTALL_CHANGE_EVENT, handlePreferenceChanged);
		return () => {
			window.removeEventListener(SECURITY_AUTO_INSTALL_CHANGE_EVENT, handlePreferenceChanged);
		};
	}, []);
	return {
		scanEnabled,
		autoInstallNonHighRisk,
		toggleAutoInstall: (0, import_react$3.useCallback)((enabled) => {
			setAutoInstallNonHighRisk(enabled);
			writeCache(SECURITY_AUTO_INSTALL_KEY, enabled);
			window.dispatchEvent(new CustomEvent(SECURITY_AUTO_INSTALL_CHANGE_EVENT, { detail: { enabled } }));
		}, [])
	};
}
var import_react$3;
var init_use_security_preference = __esmMin((() => {
	import_react$3 = /* @__PURE__ */ __toESM(require_react());
	init_local_cache();
	init_skills_security_types();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/plugins-panel/hooks/use-plugin-telemetry.ts
var import_react$2, mapScope, getMarketplaceSource, getPluginCapabilities, usePluginTelemetry;
var init_use_plugin_telemetry = __esmMin((() => {
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
	init_telemetry_context();
	mapScope = (scope) => {
		if (scope === "project-local") return "project-local";
		return scope;
	};
	getMarketplaceSource = (marketplace) => {
		const source = marketplace.source;
		if (!source) return marketplace.installLocation || marketplace.name || "";
		if (typeof source === "string") return source;
		if (typeof source === "object") {
			if (source.url) return source.url;
			if (source.repo) return `https://github.com/${source.repo}`;
		}
		return marketplace.installLocation || marketplace.name || "";
	};
	getPluginCapabilities = (plugin) => ({
		hasAgents: Boolean(plugin.agents && plugin.agents.length > 0),
		hasCommands: Boolean(plugin.commands && plugin.commands.length > 0),
		hasSkills: Boolean(plugin.skills && plugin.skills.length > 0),
		hasMcpServers: Boolean(plugin.mcpServers && plugin.mcpServers.length > 0),
		hasHooks: Boolean(plugin.hooks && plugin.hooks.length > 0),
		hasRules: Boolean(plugin.rules && plugin.rules.length > 0)
	});
	usePluginTelemetry = () => {
		const { reportEvent, Events } = useAgentTelemetry();
		return {
			reportMarketplaceAction: (0, import_react$2.useCallback)((marketplace, action, success, error) => {
				const marketplaceType = marketplace.type === "github" ? "github" : "local";
				reportEvent(Events.PluginMarketplaceAction, {
					name: marketplace.name,
					source: getMarketplaceSource(marketplace),
					type: marketplaceType,
					action,
					actionSuccessful: success,
					errorCode: error?.code,
					errorMessage: error?.message,
					isBuiltIn: marketplace.isBuiltIn ?? false
				});
			}, [reportEvent, Events]),
			reportPageShow: (0, import_react$2.useCallback)((marketplaceName, marketplaceCount, installedPluginCount) => {
				reportEvent(Events.PluginMarketplacePageShow, {
					page: "plugin_marketplace",
					name: marketplaceName || void 0,
					count: marketplaceCount,
					total: installedPluginCount
				});
			}, [reportEvent, Events]),
			reportPluginAction: (0, import_react$2.useCallback)((plugin, action, scope, success) => {
				const capabilities = getPluginCapabilities(plugin);
				reportEvent(Events.PluginAction, {
					name: plugin.name,
					version: plugin.version,
					pName: plugin.marketplaceName,
					action,
					scope: mapScope(scope),
					isBuiltIn: plugin.isBuiltIn ?? false,
					...capabilities
				});
			}, [reportEvent, Events]),
			reportCapabilityCall: (0, import_react$2.useCallback)((plugin, capabilityType, capabilityName, conversationId, requestId) => {
				reportEvent(Events.PluginCapabilityCall, {
					name: plugin.name,
					version: plugin.version,
					pName: plugin.marketplaceName,
					type: capabilityType,
					action: capabilityName,
					conversationId,
					requestId
				});
			}, [reportEvent, Events])
		};
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/plugins-panel/index.tsx
/**
* 稳定合并 marketplace 列表：保持已有项的顺序，新增项追加到末尾
* 防止后端返回顺序不一致导致 tab 跳变
*/
function mergeMarketplaces(existing, incoming) {
	const incomingMap = new Map(incoming.map((m) => [m.name, m]));
	const merged = [];
	const seen = /* @__PURE__ */ new Set();
	for (const old of existing) {
		const updated = incomingMap.get(old.name);
		if (updated) {
			merged.push(updated);
			seen.add(old.name);
		}
	}
	for (const item of incoming) if (!seen.has(item.name)) merged.push(item);
	return merged;
}
var import_react$1, import_jsx_runtime$1, CACHE_KEY_MARKETPLACES, CACHE_KEY_PLUGINS, CACHE_KEY_INSTALLED, mapPluginStatus, PluginsPanel;
var init_plugins_panel = __esmMin((() => {
	init_styles();
	init_src();
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_contexts();
	init_Button();
	init_Input();
	init_use_connector_feature();
	init_use_named_page_show();
	init_use_vpc_connector_policy();
	init_useI18n();
	init_mcp_modal();
	init_connector_panel();
	init_skills();
	init_use_async_security_scan();
	init_use_security_preference();
	init_environment();
	init_local_cache();
	init_icons();
	init_use_assistant_display();
	init_workbuddy_topbar();
	init_use_plugin_telemetry();
	import_jsx_runtime$1 = require_jsx_runtime();
	CACHE_KEY_MARKETPLACES = "plugins-cache-marketplaces";
	CACHE_KEY_PLUGINS = "plugins-cache-plugins";
	CACHE_KEY_INSTALLED = "plugins-cache-installed";
	mapPluginStatus = (status) => {
		if (status === "enabled") return "enabled";
		if (status === "disabled") return "disabled";
		if (status === "not-installed") return;
		if (status === "installed") return "installed";
	};
	PluginsPanel = ({ visible, view, headerLeft }) => {
		const adapter = useAdapter();
		const t = useTranslation();
		const { name: assistantName = "CodeBuddy" } = useAssistantDisplay(adapter);
		const { reportMarketplaceAction, reportPageShow, reportPluginAction } = usePluginTelemetry();
		const topBarRootClassName = useTopBarRootClassName();
		const isVisible = visible ?? false;
		const [mcpEnabled, setMcpEnabled] = (0, import_react$1.useState)(true);
		(0, import_react$1.useEffect)(() => {
			if (!adapter?.getProductFeatures) return;
			let cancelled = false;
			adapter.getProductFeatures().then((features) => {
				if (!cancelled && features && "McpPanel" in features) setMcpEnabled(features.McpPanel !== false);
			});
			return () => {
				cancelled = true;
			};
		}, [adapter]);
		const canShowMcp = isWorkBuddy() && mcpEnabled;
		const remoteConnectorFeatureEnabled = useConnectorFeature();
		const { isVpcAccount: isVpcAccountForConnector } = useVpcConnectorPolicy();
		const connectorFeatureEnabled = remoteConnectorFeatureEnabled || isVpcAccountForConnector;
		const [skillsExternalSearch, setSkillsExternalSearch] = (0, import_react$1.useState)("");
		const [skillsExternalTab, setSkillsExternalTab] = (0, import_react$1.useState)("market");
		const skillsAddRef = (0, import_react$1.useRef)(null);
		const handleToggleSkillsTab = (0, import_react$1.useCallback)(() => {
			setSkillsExternalTab((prev) => prev === "installed" ? "market" : "installed");
		}, []);
		const handleBackToSkillsMarket = (0, import_react$1.useCallback)(() => {
			setSkillsExternalTab("market");
		}, []);
		const handleTriggerAddSkill = (0, import_react$1.useCallback)(() => {
			skillsAddRef.current?.();
		}, []);
		const mainView = view ?? "plugins";
		useNamedPageShow({
			active: isVisible && mainView === "skills",
			elementId: "skill_market_entry_click",
			elementName: "技能市场入口"
		});
		useNamedPageShow({
			active: isVisible && mainView === "connector",
			elementId: "connector_center_entry_click",
			elementName: "连接器入口"
		});
		const isCloudMode = adapter?.environmentType === "cloud";
		const isZhLocale = (0, import_react$1.useMemo)(() => {
			return (navigator.language?.toLowerCase() || "").startsWith("zh");
		}, []);
		const hasCacheRef = (0, import_react$1.useRef)(false);
		const [loading, setLoading] = (0, import_react$1.useState)(false);
		const [plugins, setPlugins] = (0, import_react$1.useState)(() => readCache(CACHE_KEY_PLUGINS) || []);
		const [installedPlugins, setInstalledPlugins] = (0, import_react$1.useState)(() => readCache(CACHE_KEY_INSTALLED) || []);
		const [marketplaces, setMarketplaces] = (0, import_react$1.useState)(() => {
			const cached = readCache(CACHE_KEY_MARKETPLACES);
			if (cached?.length) hasCacheRef.current = true;
			return cached || [];
		});
		const [currentMarketplace, setCurrentMarketplace] = (0, import_react$1.useState)(() => {
			try {
				return localStorage.getItem("agent-ui-selected-marketplace") || null;
			} catch (e) {
				return null;
			}
		});
		const [refreshingMarketplaces, setRefreshingMarketplaces] = (0, import_react$1.useState)(/* @__PURE__ */ new Set());
		const [searchText, setSearchText] = (0, import_react$1.useState)("");
		const searchTextRef = (0, import_react$1.useRef)("");
		const marketplacesRef = (0, import_react$1.useRef)(marketplaces);
		(0, import_react$1.useEffect)(() => {
			marketplacesRef.current = marketplaces;
		}, [marketplaces]);
		const resolveMarketplaceId = (0, import_react$1.useCallback)((marketplaceName) => {
			return marketplacesRef.current.find((m) => m.name === marketplaceName)?.storageName || marketplaceName;
		}, []);
		const [allPluginsCache, setAllPluginsCache] = (0, import_react$1.useState)([]);
		const [selectedPluginKey, setSelectedPluginKey] = (0, import_react$1.useState)(null);
		const [showMcpModal, setShowMcpModal] = (0, import_react$1.useState)(false);
		const { addTask, removeTask, updateTask, skillRiskMap, clearRisk } = useAsyncSecurityScan();
		const securityPreference = useSecurityPreference(adapter);
		const selectedPlugin = (0, import_react$1.useMemo)(() => {
			if (!selectedPluginKey) return null;
			const match = (p) => p.name === selectedPluginKey.name && p.marketplaceName === selectedPluginKey.marketplaceName;
			return installedPlugins.find(match) ?? plugins.find(match) ?? null;
		}, [
			selectedPluginKey,
			installedPlugins,
			plugins
		]);
		const isMarketplacesLoadedRef = (0, import_react$1.useRef)(false);
		const currentMarketplaceRef = (0, import_react$1.useRef)(currentMarketplace);
		const loadMarketplacesRef = (0, import_react$1.useRef)();
		const loadMarketplacePluginsOnlyRef = (0, import_react$1.useRef)();
		/**
		* 加载已安装的插件列表
		*/
		const loadInstalledPlugins = (0, import_react$1.useCallback)(async (forceRefresh = false) => {
			try {
				if (adapter?.getInstalledPlugins) {
					const pluginsList = (await adapter.getInstalledPlugins(forceRefresh)).map((p) => {
						const mapScope = (scope) => {
							if (scope === "local") return "project-local";
							return scope || "user";
						};
						return {
							name: p.name,
							marketplaceName: p.marketplaceName || "local",
							description: p.description,
							version: p.version,
							status: p.status,
							installedScopes: p.installedScopes?.map(mapScope) || (p.installScope ? [mapScope(p.installScope)] : ["user"]),
							installedScopesStatus: p.installedScopesStatus,
							installedPath: p.installedPath,
							source: "",
							agents: p.agents,
							commands: p.commands,
							skills: p.skills,
							mcpServers: p.mcpServers,
							hooks: p.hooks,
							rules: p.rules,
							canRemove: p.canRemove,
							canSwitchoff: p.canSwitchoff,
							canEdit: p.canEdit
						};
					});
					setInstalledPlugins(pluginsList);
					writeCache(CACHE_KEY_INSTALLED, pluginsList);
					return pluginsList;
				}
				return [];
			} catch (error) {
				return [];
			}
		}, [adapter]);
		/**
		* 加载市场中的插件列表
		*
		* 入参 marketplaceName 是 UI 一直在用的展示名（也是 PluginViewConfig.marketplaceName 的值）；
		* 调用 sidecar 时翻译成稳定 ID（storageName），避免名称带空格 / 中文 / 特殊字符
		* 时被 URL 编码后下游 marketplace 查找失败。
		*/
		const loadMarketplacePlugins = (0, import_react$1.useCallback)(async (marketplaceName, forceRefresh = false) => {
			if (!adapter?.getMarketplacePlugins) return installedPlugins;
			try {
				const currentSearchText = searchTextRef.current;
				const marketplaceId = resolveMarketplaceId(marketplaceName);
				return (await adapter.getMarketplacePlugins(marketplaceId, forceRefresh, currentSearchText || void 0)).map((p) => ({
					name: p.name,
					marketplaceName: p.marketplaceName,
					description: p.description,
					version: p.version,
					author: p.author,
					homepage: p.homepage,
					status: mapPluginStatus(p.status),
					installedScopes: p.installedScopes,
					installedScopesStatus: p.installedScopesStatus,
					installedPath: p.installedPath,
					hasUpdate: p.hasUpdate,
					source: "",
					agents: p.agents,
					commands: p.commands,
					skills: p.skills,
					mcpServers: p.mcpServers,
					hooks: p.hooks,
					rules: p.rules
				}));
			} catch (error) {
				return [];
			}
		}, [adapter, installedPlugins]);
		/**
		* 加载市场插件列表（不刷新已安装列表）
		* @param marketplaceName 市场名称
		* @param showLoading 是否显示 loading 遮罩
		* @param forceRefresh 是否让后端绕过缓存强制拉取最新数据（刷新市场后必须为 true）
		*/
		const loadMarketplacePluginsOnly = (0, import_react$1.useCallback)(async (marketplaceName, showLoading = false, forceRefresh = false) => {
			if (showLoading) setLoading(true);
			try {
				if (marketplaceName && adapter?.getMarketplacePlugins) {
					const marketplacePlugins = await loadMarketplacePlugins(marketplaceName, forceRefresh);
					if (currentMarketplaceRef.current === marketplaceName) {
						setPlugins(marketplacePlugins);
						writeCache(CACHE_KEY_PLUGINS, marketplacePlugins);
					} else console.log(`[PluginsPanel] loadMarketplacePluginsOnly: Skipping setPlugins, marketplace changed from ${marketplaceName} to ${currentMarketplaceRef.current}`);
				} else setPlugins(installedPlugins);
			} catch (error) {} finally {
				setLoading(false);
			}
		}, [
			adapter,
			loadMarketplacePlugins,
			installedPlugins
		]);
		/**
		* 初始加载（同时加载已安装列表和市场插件）
		*/
		const loadAllPlugins = (0, import_react$1.useCallback)(async (marketplaceName, showLoading = false) => {
			if (showLoading) setLoading(true);
			try {
				const installed = await loadInstalledPlugins();
				if (marketplaceName && adapter?.getMarketplacePlugins) {
					const marketplacePlugins = await loadMarketplacePlugins(marketplaceName);
					if (currentMarketplaceRef.current === marketplaceName) {
						setPlugins(marketplacePlugins);
						writeCache(CACHE_KEY_PLUGINS, marketplacePlugins);
					} else console.log(`[PluginsPanel] Skipping setPlugins: marketplace changed from ${marketplaceName} to ${currentMarketplaceRef.current}`);
				} else {
					setPlugins(installed);
					writeCache(CACHE_KEY_PLUGINS, installed);
				}
			} catch (error) {} finally {
				setLoading(false);
			}
		}, [
			adapter,
			loadInstalledPlugins,
			loadMarketplacePlugins
		]);
		/**
		* 加载所有市场的所有插件到缓存（用于跨市场搜索）
		* 参考 chat-ui 的实现，不传 searchText，获取完整列表后在本地过滤
		*/
		const loadAllMarketplacePlugins = (0, import_react$1.useCallback)(async () => {
			console.log("[PluginsPanel] loadAllMarketplacePlugins called:", {
				hasAdapter: !!adapter?.getMarketplacePlugins,
				marketplacesLen: marketplaces.length,
				marketplaces: marketplaces.map((m) => m.name)
			});
			if (!adapter?.getMarketplacePlugins || marketplaces.length === 0) {
				console.log("[PluginsPanel] loadAllMarketplacePlugins skipped: no adapter or no marketplaces");
				return [];
			}
			try {
				const allPlugins = [];
				const loadPromises = marketplaces.map(async (marketplace) => {
					try {
						const marketplaceId = marketplace.storageName || marketplace.name;
						console.log("[PluginsPanel] Loading plugins from marketplace:", marketplace.name);
						const result = await adapter.getMarketplacePlugins(marketplaceId, false);
						console.log("[PluginsPanel] Got plugins from", marketplace.name, ":", result.length);
						return result.map((p) => ({
							name: p.name,
							marketplaceName: p.marketplaceName,
							description: p.description,
							version: p.version,
							author: p.author,
							homepage: p.homepage,
							status: mapPluginStatus(p.status),
							installedScopes: p.installedScopes,
							installedScopesStatus: p.installedScopesStatus,
							installedPath: p.installedPath,
							hasUpdate: p.hasUpdate,
							source: "",
							agents: p.agents,
							commands: p.commands,
							skills: p.skills,
							mcpServers: p.mcpServers,
							hooks: p.hooks,
							rules: p.rules
						}));
					} catch (err) {
						console.error("[PluginsPanel] Failed to load plugins from", marketplace.name, err);
						return [];
					}
				});
				const results = await Promise.all(loadPromises);
				const seen = /* @__PURE__ */ new Set();
				for (const marketplacePlugins of results) for (const plugin of marketplacePlugins) {
					const key = `${plugin.marketplaceName}/${plugin.name}`;
					if (!seen.has(key)) {
						seen.add(key);
						allPlugins.push(plugin);
					}
				}
				console.log("[PluginsPanel] Total plugins loaded:", allPlugins.length);
				setAllPluginsCache(allPlugins);
				return allPlugins;
			} catch (error) {
				console.error("[PluginsPanel] Failed to load all marketplace plugins:", error);
				return [];
			}
		}, [adapter, marketplaces]);
		/**
		* 加载市场列表
		* @param forceRefresh 是否强制刷新
		* @param skipLoadPlugins 是否跳过自动加载插件（用于添加新市场后手动控制插件加载）
		*/
		const loadMarketplaces = (0, import_react$1.useCallback)(async (forceRefresh = false, skipLoadPlugins = false) => {
			if (!forceRefresh && isMarketplacesLoadedRef.current) return;
			if (!hasCacheRef.current) setLoading(true);
			try {
				if (adapter?.getPluginMarketplaces) {
					const result = await adapter.getPluginMarketplaces(forceRefresh);
					if (result && result.length > 0) {
						isMarketplacesLoadedRef.current = true;
						hasCacheRef.current = true;
						const incomingList = result.map((m) => ({
							name: m.name,
							storageName: m.id,
							type: m.type,
							source: m.source,
							description: m.description
						}));
						setMarketplaces((prev) => {
							const merged = prev.length > 0 ? mergeMarketplaces(prev, incomingList) : incomingList;
							if (prev.length === merged.length && prev.every((m, i) => m.name === merged[i].name)) return prev;
							writeCache(CACHE_KEY_MARKETPLACES, merged);
							return merged;
						});
						if (skipLoadPlugins) {
							setLoading(false);
							return;
						}
						const selectedMarketplaceExists = currentMarketplaceRef.current ? incomingList.some((m) => m.name === currentMarketplaceRef.current) : false;
						if ((!currentMarketplaceRef.current || !selectedMarketplaceExists) && incomingList.length > 0) {
							const firstMarketplace = incomingList[0].name;
							setCurrentMarketplace(firstMarketplace);
							currentMarketplaceRef.current = firstMarketplace;
							try {
								localStorage.setItem("agent-ui-selected-marketplace", firstMarketplace);
							} catch (e) {}
							await loadAllPlugins(firstMarketplace, false);
						} else if (currentMarketplaceRef.current && selectedMarketplaceExists) await loadAllPlugins(currentMarketplaceRef.current, false);
					} else {
						console.log("[PluginsPanel] No marketplaces found, will retry...");
						if (forceRefresh || !hasCacheRef.current) {
							setMarketplaces([]);
							setPlugins([]);
							setCurrentMarketplace(null);
							currentMarketplaceRef.current = null;
							writeCache(CACHE_KEY_MARKETPLACES, []);
							writeCache(CACHE_KEY_PLUGINS, []);
							try {
								localStorage.removeItem("agent-ui-selected-marketplace");
							} catch (e) {}
						}
					}
				} else if (!hasCacheRef.current) {
					setMarketplaces([]);
					setPlugins([]);
				}
			} catch (error) {
				if (!hasCacheRef.current) {
					setMarketplaces([]);
					setPlugins([]);
				}
			} finally {
				setLoading(false);
			}
		}, [adapter, loadAllPlugins]);
		const retryCountRef = (0, import_react$1.useRef)(0);
		const maxRetries = 10;
		const retryDelay = 2e3;
		(0, import_react$1.useEffect)(() => {
			if (!isVisible || marketplaces.length > 0 || retryCountRef.current >= maxRetries) return;
			const timer = setTimeout(() => {
				retryCountRef.current += 1;
				console.log(`[PluginsPanel] Retrying to load marketplaces (attempt ${retryCountRef.current}/${maxRetries})`);
				loadMarketplaces(true);
			}, retryDelay);
			return () => clearTimeout(timer);
		}, [
			isVisible,
			marketplaces.length,
			loadMarketplaces
		]);
		(0, import_react$1.useEffect)(() => {
			if (marketplaces.length > 0) retryCountRef.current = 0;
		}, [marketplaces.length]);
		loadMarketplacesRef.current = loadMarketplaces;
		loadMarketplacePluginsOnlyRef.current = loadMarketplacePluginsOnly;
		const prefetchedRef = (0, import_react$1.useRef)(false);
		(0, import_react$1.useEffect)(() => {
			if (adapter && !prefetchedRef.current) {
				prefetchedRef.current = true;
				loadMarketplaces(true);
			}
		}, [adapter]);
		(0, import_react$1.useEffect)(() => {
			if (adapter && isVisible && isMarketplacesLoadedRef.current) {
				loadInstalledPlugins(true);
				if (currentMarketplaceRef.current) loadMarketplacePluginsOnly(currentMarketplaceRef.current, false);
			}
		}, [isVisible]);
		const prevMainViewRef2 = (0, import_react$1.useRef)(mainView);
		(0, import_react$1.useEffect)(() => {
			const prev = prevMainViewRef2.current;
			prevMainViewRef2.current = mainView;
			if (mainView === "plugins" && prev !== "plugins") {
				setSearchText("");
				searchTextRef.current = "";
				setSelectedPluginKey(null);
				const firstMarketplace = marketplaces.length > 0 ? marketplaces[0].name : null;
				setCurrentMarketplace(firstMarketplace);
				currentMarketplaceRef.current = firstMarketplace;
				if (firstMarketplace) {
					try {
						localStorage.setItem("agent-ui-selected-marketplace", firstMarketplace);
					} catch {}
					loadMarketplacePluginsOnly(firstMarketplace, false);
				}
			}
		}, [
			mainView,
			marketplaces,
			loadMarketplacePluginsOnly
		]);
		const prevMainViewRef = (0, import_react$1.useRef)(null);
		const prevIsVisibleRef = (0, import_react$1.useRef)(false);
		(0, import_react$1.useEffect)(() => {
			const isNowPluginsView = isVisible && mainView === "plugins";
			const wasPluginsView = prevIsVisibleRef.current && prevMainViewRef.current === "plugins";
			if (isNowPluginsView && !wasPluginsView && marketplaces.length > 0) if (adapter?.getInstalledPlugins) adapter.getInstalledPlugins(false).then((plugins) => {
				const installedCount = plugins?.length ?? 0;
				reportPageShow(currentMarketplace, marketplaces.length, installedCount);
			}).catch(() => {
				reportPageShow(currentMarketplace, marketplaces.length, installedPlugins.length);
			});
			else reportPageShow(currentMarketplace, marketplaces.length, installedPlugins.length);
			prevMainViewRef.current = mainView;
			prevIsVisibleRef.current = isVisible;
		}, [
			isVisible,
			mainView,
			marketplaces.length,
			currentMarketplace,
			installedPlugins.length,
			adapter,
			reportPageShow
		]);
		(0, import_react$1.useEffect)(() => {
			if (!adapter?.onPluginsChanged || !isVisible) return;
			return adapter.onPluginsChanged((options) => {
				console.log("[PluginsPanel] Received plugins changed notification, refreshing...", options);
				setAllPluginsCache([]);
				if (options?.newMarketplaceName) {
					console.log("[PluginsPanel] New marketplace added:", options.newMarketplaceName, "current:", currentMarketplaceRef.current);
					if (!currentMarketplaceRef.current) {
						setCurrentMarketplace(options.newMarketplaceName);
						currentMarketplaceRef.current = options.newMarketplaceName;
						try {
							localStorage.setItem("agent-ui-selected-marketplace", options.newMarketplaceName);
						} catch (e) {}
					}
					loadMarketplacesRef.current?.(true);
				} else if (options?.forceRefreshMarketplaces) {
					console.log("[PluginsPanel] Force refreshing marketplaces list (built-in marketplace installation completed)");
					isMarketplacesLoadedRef.current = false;
					loadMarketplacesRef.current?.(true);
				} else {
					console.log("[PluginsPanel] Refreshing plugins after plugin status change");
					setAllPluginsCache([]);
					loadInstalledPlugins(true).then(() => {
						console.log("[PluginsPanel] Installed plugins list refreshed");
					});
					if (currentMarketplaceRef.current) loadMarketplacePluginsOnlyRef.current?.(currentMarketplaceRef.current, false);
				}
			});
		}, [adapter, isVisible]);
		const handleSearch = (0, import_react$1.useCallback)(async (text) => {
			setSearchText(text);
			searchTextRef.current = text;
			if (!text.trim()) {
				if (currentMarketplace) await loadMarketplacePluginsOnly(currentMarketplace, false);
				return;
			}
			const searchLower = text.toLowerCase();
			const localFilter = (list) => list.filter((plugin) => plugin.name.toLowerCase().includes(searchLower) || plugin.description?.toLowerCase().includes(searchLower));
			try {
				if (allPluginsCache.length > 0) setPlugins(localFilter(allPluginsCache));
				else {
					setPlugins(localFilter(plugins));
					const allPlugins = await loadAllMarketplacePlugins();
					if (searchTextRef.current === text) setPlugins(localFilter(allPlugins));
				}
			} catch (error) {
				console.error("[PluginsPanel] Search failed:", error);
			}
		}, [
			currentMarketplace,
			allPluginsCache,
			loadMarketplacePluginsOnly,
			loadAllMarketplacePlugins
		]);
		const handleMarketplaceSelect = (0, import_react$1.useCallback)(async (marketplace) => {
			setCurrentMarketplace(marketplace.name);
			currentMarketplaceRef.current = marketplace.name;
			try {
				localStorage.setItem("agent-ui-selected-marketplace", marketplace.name);
			} catch {}
			setSearchText("");
			searchTextRef.current = "";
			try {
				setPlugins(await loadMarketplacePlugins(marketplace.name));
			} catch {}
		}, [loadMarketplacePlugins]);
		const handleAddMarketplace = (0, import_react$1.useCallback)(async (source) => {
			if (!adapter?.addPluginMarketplace) throw new Error(t("plugins.addMarketplace.notSupported") || "Adding marketplace is not supported in this environment");
			const result = await adapter.addPluginMarketplace(source);
			if (result.success) {
				const returnedName = result.marketplace?.name;
				if (result.alreadyExists && returnedName) {
					setCurrentMarketplace(returnedName);
					currentMarketplaceRef.current = returnedName;
					try {
						localStorage.setItem("agent-ui-selected-marketplace", returnedName);
					} catch {}
					setLoading(true);
					try {
						setPlugins(await loadMarketplacePlugins(returnedName, true));
					} finally {
						setLoading(false);
					}
					toast({
						message: t("plugins.addMarketplace.alreadyExists", { name: returnedName }) || `Marketplace ${returnedName} already exists`,
						type: "info"
					});
					return;
				}
				isMarketplacesLoadedRef.current = false;
				await loadMarketplaces(true, true);
				if (returnedName) {
					setCurrentMarketplace(returnedName);
					currentMarketplaceRef.current = returnedName;
					try {
						localStorage.setItem("agent-ui-selected-marketplace", returnedName);
					} catch {}
					setLoading(true);
					try {
						setPlugins(await loadMarketplacePlugins(returnedName, true));
					} finally {
						setLoading(false);
					}
					reportMarketplaceAction({
						name: returnedName,
						type: "github",
						source: { url: source }
					}, "add", true);
				}
				toast({
					message: t("plugins.addMarketplace.success") || "Marketplace added successfully",
					type: "success"
				});
			} else {
				reportMarketplaceAction({
					name: source,
					type: "github",
					source: { url: source }
				}, "add", false, { message: result.error });
				throw new Error(result.error || "Failed to add marketplace");
			}
		}, [
			adapter,
			loadMarketplaces,
			loadMarketplacePlugins,
			t,
			reportMarketplaceAction
		]);
		const handleDeleteMarketplace = (0, import_react$1.useCallback)(async (marketplace) => {
			if (!adapter?.removePluginMarketplace) {
				toast({
					message: t("plugins.deleteMarketplace.notSupported") || "Deleting marketplace is not supported in this environment",
					type: "warning"
				});
				return;
			}
			const marketplaceId = marketplace.storageName || marketplace.name;
			try {
				const result = await adapter.removePluginMarketplace(marketplaceId);
				if (result.success) {
					reportMarketplaceAction(marketplace, "remove", true);
					toast({
						message: "Marketplace deleted successfully",
						type: "success"
					});
					await loadMarketplaces(true);
				} else {
					reportMarketplaceAction(marketplace, "remove", false, { message: result.error });
					toast({
						message: result.error || "Failed to delete marketplace",
						type: "error"
					});
				}
			} catch (error) {
				reportMarketplaceAction(marketplace, "remove", false, { message: error?.message });
				toast({
					message: error?.message || "Failed to delete marketplace",
					type: "error"
				});
			}
		}, [
			adapter,
			t,
			reportMarketplaceAction,
			loadMarketplaces
		]);
		const handleRefreshMarketplace = (0, import_react$1.useCallback)(async (marketplace) => {
			setRefreshingMarketplaces((prev) => new Set(prev).add(marketplace.name));
			try {
				const marketplaceId = marketplace.storageName || marketplace.name;
				if (adapter?.refreshPluginMarketplace) {
					const result = await adapter.refreshPluginMarketplace(marketplaceId);
					if (result.success) {
						if (currentMarketplace === marketplace.name) await loadMarketplacePluginsOnly(marketplace.name, false, true);
						await loadInstalledPlugins(true);
						reportMarketplaceAction(marketplace, "refresh", true);
						toast({
							message: t("plugins.updateSuccess", { name: marketplace.name }),
							type: "success"
						});
					} else {
						reportMarketplaceAction(marketplace, "refresh", false, { message: result.error });
						toast({
							message: result.error || t("plugins.updateFailed", { error: "Unknown error" }),
							type: "error"
						});
					}
				} else if (currentMarketplace) {
					await loadMarketplacePluginsOnly(currentMarketplace, true, true);
					await loadInstalledPlugins(true);
					reportMarketplaceAction(marketplace, "refresh", true);
					toast({
						message: t("plugins.updateSuccess", { name: marketplace.name }),
						type: "success"
					});
				}
			} catch (error) {
				reportMarketplaceAction(marketplace, "refresh", false, { message: error?.message });
				toast({
					message: t("plugins.updateFailed", { error: error?.message || String(error) }),
					type: "error"
				});
			} finally {
				setRefreshingMarketplaces((prev) => {
					const newSet = new Set(prev);
					newSet.delete(marketplace.name);
					return newSet;
				});
			}
		}, [
			adapter,
			currentMarketplace,
			loadMarketplacePluginsOnly,
			loadInstalledPlugins,
			reportMarketplaceAction,
			t
		]);
		const handleInstall = (0, import_react$1.useCallback)(async (plugin, scope) => {
			if (adapter?.installPlugins) {
				const marketplaceId = resolveMarketplaceId(plugin.marketplaceName);
				const result = await adapter.installPlugins([plugin.name], marketplaceId, scope === "project-local" ? "project" : scope);
				if (result.success) {
					reportPluginAction(plugin, "install", scope, true);
					toast({
						message: t("plugins.installSuccess", { name: plugin.name }),
						type: "success"
					});
				} else {
					reportPluginAction(plugin, "install", scope, false);
					toast({
						message: result.error || t("plugins.installFailed", { error: "Unknown error" }),
						type: "error"
					});
				}
			}
		}, [
			adapter,
			t,
			reportPluginAction
		]);
		const handleUninstall = (0, import_react$1.useCallback)(async (plugin, scope) => {
			if (adapter?.uninstallPlugin) {
				const marketplaceId = resolveMarketplaceId(plugin.marketplaceName);
				const result = await adapter.uninstallPlugin(plugin.name, marketplaceId, scope === "project-local" ? "project" : scope);
				if (result.success) {
					reportPluginAction(plugin, "uninstall", scope, true);
					toast({
						message: t("plugins.uninstallSuccess", { name: plugin.name }),
						type: "success"
					});
				} else {
					reportPluginAction(plugin, "uninstall", scope, false);
					toast({
						message: result.error || t("plugins.uninstallFailed", { error: "Unknown error" }),
						type: "error"
					});
				}
			} else toast({
				message: "Uninstall is not supported in this environment",
				type: "warning"
			});
		}, [
			adapter,
			t,
			reportPluginAction
		]);
		const handleUpdate = (0, import_react$1.useCallback)(async (plugin) => {
			if (adapter?.updatePlugin) {
				const marketplaceId = resolveMarketplaceId(plugin.marketplaceName);
				const result = await adapter.updatePlugin(plugin.name, marketplaceId);
				if (result.success) {
					reportPluginAction(plugin, "update", "user", true);
					toast({
						message: t("plugins.updateSuccess", { name: plugin.name }),
						type: "success"
					});
				} else {
					reportPluginAction(plugin, "update", "user", false);
					toast({
						message: result.error || t("plugins.updateFailed", { error: "Unknown error" }),
						type: "error"
					});
				}
			} else toast({
				message: "Update is not supported in this environment",
				type: "warning"
			});
		}, [
			adapter,
			t,
			reportPluginAction
		]);
		const handleToggleStatus = (0, import_react$1.useCallback)(async (plugin, enabled, scope) => {
			if (adapter?.batchTogglePlugins) {
				const pluginScope = scope === "project-local" ? "project" : scope === "user" ? "user" : "project";
				const marketplaceId = resolveMarketplaceId(plugin.marketplaceName);
				const result = await adapter.batchTogglePlugins({ items: [{
					pluginName: plugin.name,
					marketplaceName: marketplaceId,
					scope: pluginScope,
					operation: enabled ? "enable" : "disable"
				}] });
				if (result.success) reportPluginAction(plugin, enabled ? "enable" : "disable", scope, true);
				else {
					reportPluginAction(plugin, enabled ? "enable" : "disable", scope, false);
					toast({
						message: result.failedPlugins?.[0]?.error || "Toggle status failed",
						type: "error"
					});
				}
			}
		}, [adapter, reportPluginAction]);
		const handleOpenInEditor = (0, import_react$1.useCallback)(async (plugin) => {
			if (plugin.installedPath && adapter?.openFolderInNewWindow) await adapter.openFolderInNewWindow(plugin.installedPath);
			else toast({
				message: "Open in Editor is not supported in this environment",
				type: "warning"
			});
		}, [adapter]);
		const handleOpenHomepage = (0, import_react$1.useCallback)((homepage) => {
			window.open(homepage, "_blank");
		}, []);
		const handleShare = (0, import_react$1.useCallback)((plugin) => {
			if (plugin.source && typeof plugin.source === "object" && "repo" in plugin.source) {
				const repo = plugin.source.repo;
				const ref = plugin.source.ref || "main";
				window.open(`https://github.com/${repo}/tree/${ref}`, "_blank");
			} else toast({
				message: t("plugins.cannotGenerateUrl"),
				type: "warning"
			});
		}, []);
		const hasProjectPath = (0, import_react$1.useCallback)(async () => false, []);
		const handleSelectedPluginChange = (0, import_react$1.useCallback)((plugin) => {
			if (mainView !== "plugins") return;
			setSelectedPluginKey(plugin ? {
				name: plugin.name,
				marketplaceName: plugin.marketplaceName
			} : null);
		}, [mainView]);
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
			className: "plugins-panel",
			children: [
				mainView === "skills" && headerLeft ? mainView === "skills" && skillsExternalTab === "installed" ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(import_jsx_runtime$1.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("header", {
					className: `${topBarRootClassName} ec-topbar ec-topbar--subpage`,
					children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "ec-topbar__left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(SidebarExpandButton, {}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("button", {
							type: "button",
							className: "ec-topbar__back",
							onClick: handleBackToSkillsMarket,
							children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ChevronLeftIcon, {
								width: 16,
								height: 16
							}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", { children: t("unifiedMarket.backToAllSkills") })]
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("h2", {
					className: "ec-subpage-title",
					children: t("unifiedMarket.myInstalled")
				})] }) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("header", {
					className: `${topBarRootClassName} ec-topbar`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "ec-topbar__left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(SidebarExpandButton, {}), headerLeft]
					}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "ec-topbar__right",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
								className: "ec-search-wrapper",
								children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Input.Search, {
									placeholder: t("unifiedMarket.search.skills"),
									value: skillsExternalSearch,
									onChange: (e) => setSkillsExternalSearch(e.target.value),
									allowClear: true
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Button, {
								variant: "grey",
								leftIcon: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(InstalledSkillIcon, {}),
								onClick: handleToggleSkillsTab,
								children: t("unifiedMarket.myInstalled")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Button, {
								variant: "grey",
								leftIcon: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AddCircleIcon, {}),
								onClick: handleTriggerAddSkill,
								children: t("unifiedMarket.addSkill")
							})
						]
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(WorkBuddyTopBar, {
					title: headerLeft,
					hideNewTask: true,
					className: "ec-topbar"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
					className: "plugins-panel-content",
					children: mainView === "skills" ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
						className: "plugins-panel-main",
						children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(SkillsPanel, {
							visible: isVisible,
							active: mainView === "skills",
							showMcpButton: !connectorFeatureEnabled && !isCloudMode && canShowMcp,
							onMcpClick: () => setShowMcpModal(true),
							skillRiskMap,
							clearRisk,
							autoInstallNonHighRisk: securityPreference.autoInstallNonHighRisk,
							onAutoInstallNonHighRiskChange: securityPreference.toggleAutoInstall,
							addAsyncTask: addTask,
							removeAsyncTask: removeTask,
							updateAsyncTask: updateTask,
							scanEnabled: securityPreference.scanEnabled
						})
					}) : mainView === "connector" ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
						className: "plugins-panel-main",
						children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ConnectorPanel, {
							visible: isVisible,
							active: mainView === "connector"
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
						className: "plugins-panel-main",
						children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Plugins, {
							plugins,
							marketplaces,
							currentMarketplace,
							loading,
							refreshingMarketplaces,
							isZhLocale,
							isSearchMode: !!searchText.trim(),
							userScopeOnly: true,
							productName: assistantName,
							selectedPlugin,
							onSelectedPluginChange: handleSelectedPluginChange,
							onMarketplaceSelect: handleMarketplaceSelect,
							onAddMarketplace: handleAddMarketplace,
							onDeleteMarketplace: handleDeleteMarketplace,
							onRefreshMarketplace: handleRefreshMarketplace,
							onSearch: handleSearch,
							onInstall: handleInstall,
							onUninstall: handleUninstall,
							onUpdate: isCloudMode ? void 0 : handleUpdate,
							onToggleStatus: handleToggleStatus,
							onOpenInEditor: isCloudMode ? void 0 : handleOpenInEditor,
							onOpenHomepage: handleOpenHomepage,
							onShare: handleShare,
							hasProjectPath,
							showToast: (type, message) => toast({
								message,
								type
							})
						})
					})
				}),
				canShowMcp && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(McpModal, {
					visible: showMcpModal,
					onClose: () => setShowMcpModal(false)
				})
			]
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/pages/plugins.tsx
function PluginsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PluginsPanel, {
		visible: true,
		view: "plugins"
	});
}
var import_jsx_runtime;
//#endregion
__esmMin((() => {
	require_react();
	init_plugins_panel();
	import_jsx_runtime = require_jsx_runtime();
}))();
export { PluginsPage };
