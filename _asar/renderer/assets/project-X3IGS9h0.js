import { n as __esmMin } from "./chunk-BRZcfu7K.js";
import { d as init_todo_errors, g as init_quota_errors, n as init_project_chat_service, u as init_cloud_repo } from "./project-chat-service-BzKCqmVb.js";
//#region ../../packages/workbuddy-server/src/project/local-task-resource-service.ts
var LocalTaskResourceService;
var init_local_task_resource_service = __esmMin((() => {
	LocalTaskResourceService = class {
		constructor(expertProvider, projectProvider, connectorRegistry, skillManifest, connectorPreferences) {
			this.expertProvider = expertProvider;
			this.projectProvider = projectProvider;
			this.connectorRegistry = connectorRegistry;
			this.skillManifest = skillManifest;
			this.connectorPreferences = connectorPreferences;
		}
		/**
		* 获取专家列表：
		* - 有 projectId → 返回项目配置的专家（转为 RecentExpert 格式）
		* - 无 projectId → 走原 ExpertFacade 全局历史
		*/
		async getRecentExperts(params) {
			if (params.projectId) return { experts: ((await this.projectProvider.listExperts(params.projectId)).items ?? []).map((item) => ({
				id: item.expertId,
				name: item.displayNameZh || item.displayNameEn || item.expertId,
				profession: item.professionZh || item.professionEn || "",
				avatarUrl: item.icon || "",
				summonedAt: Date.now(),
				industryId: item.categories?.[0] || ""
			})) };
			return this.expertProvider.getRecent({ sessionId: params.sessionId });
		}
		/**
		* 获取项目本地任务所需的全部资源（connector skill/MCP + 项目 skill）。
		* 仅在有 projectId 时调用；普通本地任务不会走这里。
		*
		* best-effort：任何接口失败不阻塞，返回部分结果。
		*/
		async getProjectResources(projectId) {
			const [connectorResources, projectSkills] = await Promise.all([this.fetchConnectorResources(projectId), this.fetchProjectSkills(projectId)]);
			return {
				connectorResources,
				projectSkills
			};
		}
		async getProjectSessionResources(projectId) {
			const { connectorResources, projectSkills } = await this.getProjectResources(projectId);
			return {
				connectorSkills: connectorResources.filter((item) => item.skillId && item.skillDownloadUrl).map((item) => ({
					skillId: item.skillId,
					downloadUrl: item.skillDownloadUrl,
					connectorName: item.name
				})),
				mcpServers: connectorResources.filter((item) => item.mcpServerName && item.mcpGatewayUrl).map((item) => ({
					serverName: item.mcpServerName,
					gatewayUrl: item.mcpGatewayUrl,
					transport: item.mcpTransport || "http",
					connectorName: item.name
				})),
				projectSkills
			};
		}
		async fetchConnectorResources(projectId) {
			if (!this.connectorRegistry) return [];
			try {
				const [result, preferences] = await Promise.all([this.connectorRegistry.listRegistry({
					scope: "all",
					projectId
				}), this.connectorPreferences?.listProjectUserConnectorPreferences(projectId).catch(() => void 0)]);
				const preferenceItems = preferences?.connectors ?? [];
				const hasPreferences = preferenceItems.length > 0;
				const activePublicConnectorNames = new Set(preferenceItems.filter((item) => item.authMode === "public" && item.activeStatus).map((item) => item.name));
				return (result.list ?? []).filter((item) => item.isConnected && item.capabilities?.includes("public_auth_supported")).filter((item) => !hasPreferences || activePublicConnectorNames.has(item.name)).map((item) => {
					const skillData = item.data?.skill;
					const mcpData = item.mcp;
					return {
						name: item.name,
						displayName: item.displayName,
						skillDownloadUrl: skillData?.download_url || void 0,
						skillId: skillData?.skill_id || void 0,
						mcpGatewayUrl: mcpData?.gateway_url || void 0,
						mcpServerName: mcpData?.ide_server_name || void 0,
						mcpTransport: mcpData?.transport || void 0
					};
				}).filter((item) => item.skillDownloadUrl || item.mcpGatewayUrl);
			} catch (err) {
				console.warn("[LocalTaskResourceService] fetchConnectorResources failed:", err);
				return [];
			}
		}
		async fetchProjectSkills(projectId) {
			if (!this.skillManifest) return [];
			try {
				return ((await this.skillManifest.getManifestPreview(projectId)).skills ?? []).map((s) => ({
					name: s.name,
					downloadUrl: s.downloadUrl || s.download_url || "",
					source: s.source
				})).filter((s) => !!s.downloadUrl);
			} catch (err) {
				console.warn("[LocalTaskResourceService] fetchProjectSkills failed:", err);
				return [];
			}
		}
	};
}));
//#endregion
//#region ../../packages/workbuddy-server/src/project/index.ts
var init_project = __esmMin((() => {
	init_cloud_repo();
	init_quota_errors();
	init_todo_errors();
	init_project_chat_service();
	init_local_task_resource_service();
}));
//#endregion
export { LocalTaskResourceService as n, init_project as t };
