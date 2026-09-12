import { n as __esmMin } from "./chunk-BRZcfu7K.js";
//#region ../../packages/agent-ui/src/telemetry/types.ts
var AgentTelemetryEvents, SkillUrlInstallFlowStage, PlaybookCtaSource;
var init_types = __esmMin((() => {
	AgentTelemetryEvents = /* @__PURE__ */ function(AgentTelemetryEvents) {
		AgentTelemetryEvents["NewTaskButtonClicked"] = "agent_new_task_button_clicked";
		AgentTelemetryEvents["GroupNewTaskButtonClicked"] = "agent_group_new_task_button_clicked";
		AgentTelemetryEvents["TaskArchiveClicked"] = "agent_task_archive_clicked";
		AgentTelemetryEvents["TaskDeleteClicked"] = "agent_task_delete_clicked";
		AgentTelemetryEvents["TaskArchived"] = "agent_task_archived";
		AgentTelemetryEvents["TaskDeleted"] = "agent_task_deleted";
		AgentTelemetryEvents["TaskFilterApplied"] = "agent_task_filter_applied";
		AgentTelemetryEvents["TaskCreated"] = "agent_task_created";
		AgentTelemetryEvents["TaskModeSwitched"] = "agent_task_mode_switched";
		AgentTelemetryEvents["TemplateClicked"] = "agent_template_clicked";
		AgentTelemetryEvents["ConnectorAuthInitiated"] = "agent_connector_auth_initiated";
		AgentTelemetryEvents["UploadFileClicked"] = "agent_upload_file_clicked";
		AgentTelemetryEvents["TaskTitleEdited"] = "agent_task_title_edited";
		AgentTelemetryEvents["EditorOpened"] = "agent_editor_opened";
		AgentTelemetryEvents["ConnectorEntryShow"] = "connector_entry_show";
		AgentTelemetryEvents["ConnectorEntryClick"] = "connector_entry_click";
		AgentTelemetryEvents["ConnectorAuthResult"] = "connector_auth_result";
		AgentTelemetryEvents["ConnectorDetailShow"] = "connector_detail_show";
		AgentTelemetryEvents["ConnectorUnbind"] = "connector_unbind";
		AgentTelemetryEvents["ConnectorInvoke"] = "connector_invoke";
		AgentTelemetryEvents["ConnectorManagementShow"] = "connector_management_show";
		AgentTelemetryEvents["CustomMcpEntryClick"] = "custom_mcp_entry_click";
		AgentTelemetryEvents["CustomMcpConnectSuccess"] = "custom_mcp_connect_success";
		AgentTelemetryEvents["ArtifactTopMenuClicked"] = "agent_artifact_top_menu_clicked";
		AgentTelemetryEvents["ArtifactSidebarClicked"] = "agent_artifact_sidebar_clicked";
		AgentTelemetryEvents["ArtifactDownloadClicked"] = "agent_artifact_download_clicked";
		AgentTelemetryEvents["WebPageShow"] = "web_page_show";
		AgentTelemetryEvents["AgentsPageVisit"] = "agents_page_visit";
		/** 插件市场操作（添加/删除/刷新市场） */
		AgentTelemetryEvents["PluginMarketplaceAction"] = "plugin_marketplace_action";
		/** 插件市场页面曝光 */
		AgentTelemetryEvents["PluginMarketplacePageShow"] = "plugin_marketplace_page_show";
		/** 插件操作（安装/卸载/启用/禁用/更新） */
		AgentTelemetryEvents["PluginAction"] = "plugin_action";
		/** 插件能力调用 */
		AgentTelemetryEvents["PluginCapabilityCall"] = "plugin_capability_call";
		AgentTelemetryEvents["SkillInstalled"] = "skill_installed";
		/** Skill 操作（安装/卸载/启用/禁用） */
		AgentTelemetryEvents["SkillAction"] = "skill_action";
		/** URL 安装链路关键流程 */
		AgentTelemetryEvents["SkillUrlInstallFlow"] = "skill_url_install_flow";
		AgentTelemetryEvents["WechatLinked"] = "wechat_linked";
		AgentTelemetryEvents["ExpertSummoned"] = "expert_summoned";
		AgentTelemetryEvents["TemplateUsed"] = "template_used";
		/** 行业分类点击 */
		AgentTelemetryEvents["ExpertIndustryClick"] = "expert_industry_click";
		/** 立即传唤按钮点击 */
		AgentTelemetryEvents["ExpertSummonClick"] = "expert_summon_click";
		/** 专家实际使用 */
		AgentTelemetryEvents["ExpertActualUse"] = "expert_actual_use";
		/** 左侧菜单专家入口点击 */
		AgentTelemetryEvents["ExpertMenuClick"] = "expert_menu_click";
		/** 专家搜索 */
		AgentTelemetryEvents["ExpertSearch"] = "expert_search";
		/** 点击自定义专家创建 */
		AgentTelemetryEvents["ExpertCreateClick"] = "expert_create_click";
		/** 自定义专家成功创建 */
		AgentTelemetryEvents["ExpertCreateSuccess"] = "expert_create_success";
		/** 自定义专家上传成功 */
		AgentTelemetryEvents["ExpertUploadSuccess"] = "expert_upload_success";
		/** 自定义专家导入成功 */
		AgentTelemetryEvents["ExpertImportSuccess"] = "expert_import_success";
		/** 签到卡片/弹窗曝光（同一会话内单卡片只上报一次） */
		AgentTelemetryEvents["CheckinCardShow"] = "checkin_card_show";
		/** "立即领取"按钮点击（含点击 + 接口结果两次上报，用 stage 区分） */
		AgentTelemetryEvents["CheckinClaimClick"] = "checkin_claim_click";
		/** "体验专家团"按钮点击 */
		AgentTelemetryEvents["CheckinExpertEntryClick"] = "checkin_expert_entry_click";
		/**
		* Agent Mail 操作结果（发送验证码 / 开通 / 停用 / 重新激活 / 刷新）。
		* 单一事件用 action 区分动作、isSuccessful 区分结果，失败带 errorCode/errorMessage。
		*/
		AgentTelemetryEvents["AgentMailAction"] = "agent_mail_action";
		/** 用户成功创建一条带模板的任务（发送第一条消息） */
		AgentTelemetryEvents["TaskCreatedWithTemplate"] = "agent_task_created_with_template";
		/** 用户成功创建一条自动化任务 */
		AgentTelemetryEvents["AutomatedTaskCreateSuc"] = "automated_task_create_suc";
		/** 用户删除/取消一条自动化任务 */
		AgentTelemetryEvents["AutomatedTaskDelete"] = "automated_task_delete";
		/** 自动化任务实际执行 */
		AgentTelemetryEvents["AutomatedTaskExecute"] = "automated_task_execute";
		/**
		* Teams Collab：endTurn 兜底归零触发（issue #48240）。
		* 当 session_info_update.completed 已到、但等待 N 毫秒后 session/endTurn
		* 仍未到达时，UI 主动归零 isStreaming，避免输入框永久卡在"AI 还在返回"。
		* 用于量化 endTurn 丢失/延迟在线上的发生率。
		*/
		AgentTelemetryEvents["CollabTaskEndTurnFallback"] = "collab_task_end_turn_fallback";
		/**
		* 项目/协作任务：用户 query 发送事件。
		*
		* 独立事件（不再挂在 web_element_click 下的 elementName='project_task_query_send'），
		* eventCode 直接为 `project_task_query_send`，与 BI 侧新看板取数字段对齐；
		* 消息 payload 由 `buildProjectTaskQuerySendPayload` 汇总构造（file/todo/skill/connector 元信息 + 请求追踪字段）。
		* 覆盖 5 条链路：本地任务 · 云端新建 · handoff fork · 续聊 · 重发。
		*/
		AgentTelemetryEvents["ProjectTaskQuerySend"] = "project_task_query_send";
		/**
		* Teams Collab：live 通知流处理异常（issue #<待补>）。
		* scope='frame' → for-await 体内某一帧处理抛错，被 per-frame try/catch 兜住并 skip
		* （live 流未中断）；scope='loop' → 整条 processNotificationLoop 抛错退出（非连接类，
		* 由 use-chat-messages loop catch 兜底）。用于定位"任务未完成、时间线却停在某一步"
		* 的前端根因（后端仍在流式推进，前端却因坏帧/异常停止渲染）。
		*/
		AgentTelemetryEvents["CollabTaskLiveLoopError"] = "collab_task_live_loop_error";
		/** 元素点击（通用） */
		AgentTelemetryEvents["WebElementClick"] = "web_element_click";
		/** 点击「制作我的版本」CTA */
		AgentTelemetryEvents["PlaybookCtaClick"] = "playbook_cta_click";
		/** Dialog 中发送 Prompt */
		AgentTelemetryEvents["PlaybookPromptSend"] = "playbook_prompt_send";
		/** 搜索提交 */
		AgentTelemetryEvents["PlaybookSearch"] = "playbook_search";
		/** 用户点击「任务保留期限」下拉选择器 */
		AgentTelemetryEvents["DataRetentionDropdownClick"] = "data_retention_dropdown_click";
		/** 用户在下拉中选中某个选项（from/to 反映切换前后） */
		AgentTelemetryEvents["DataRetentionPolicySelect"] = "data_retention_policy_select";
		/** 切换确认后 Toast 展示（仅在用户确认后上报） */
		AgentTelemetryEvents["DataRetentionToastShow"] = "data_retention_toast_show";
		/** Skill 推荐三场景共用事件:推荐返回 / 选择推荐 / 关闭推荐(按 payload 字段子集区分场景) */
		AgentTelemetryEvents["SkillRecommend"] = "skill_recommend";
		/** 用户发送(选了 skill 且推荐过)那一刻立即上报一次,requestId 用前端 generatedRequestId */
		AgentTelemetryEvents["SkillRequestSend"] = "skill_request_send";
		/** 进入「通用 → 网络代理」分区曝光 */
		AgentTelemetryEvents["ProxySettingPageView"] = "proxy_setting_page_view";
		/** 切换代理模式（none / system / manual） */
		AgentTelemetryEvents["ProxyModeChange"] = "proxy_mode_change";
		/** manual URL 输入（500ms debounce，仅上报长度 + has_auth boolean） */
		AgentTelemetryEvents["ProxyUrlInput"] = "proxy_url_input";
		/** 「测试连接」按钮点击 */
		AgentTelemetryEvents["ProxyTestClick"] = "proxy_test_click";
		/** 「测试连接」结果返回 */
		AgentTelemetryEvents["ProxyTestResult"] = "proxy_test_result";
		/** 保存代理设置成功（saveSettings ok=true） */
		AgentTelemetryEvents["ProxySaveSuccess"] = "proxy_save_success";
		/** searchSuggestedForQuery 接口调用结果上报（每 query 一次） */
		AgentTelemetryEvents["IntentSuggestedSearch"] = "intent_suggested_search";
		/** 意图推荐列表点击（插件 / 连接器） */
		AgentTelemetryEvents["IntentSuggestedClick"] = "intent_suggested_click";
		/** 升级/续期按钮点击 */
		AgentTelemetryEvents["SubscribeEntryClick"] = "subscribe_entry_click";
		/** 用量触发（剩余5%或用尽时弹窗展示及按钮点击） */
		AgentTelemetryEvents["SubscribeQuotaTrigger"] = "subscribe_quota_trigger";
		/** 到期提醒（展示及按钮点击） */
		AgentTelemetryEvents["SubscribeExpireRemind"] = "subscribe_expire_remind";
		return AgentTelemetryEvents;
	}({});
	SkillUrlInstallFlowStage = /* @__PURE__ */ function(SkillUrlInstallFlowStage) {
		SkillUrlInstallFlowStage["IntentReceived"] = "intent_received";
		SkillUrlInstallFlowStage["InvalidIntentPayload"] = "invalid_intent_payload";
		SkillUrlInstallFlowStage["AdapterCapabilityMissing"] = "adapter_capability_missing";
		SkillUrlInstallFlowStage["ConfirmResult"] = "confirm_result";
		SkillUrlInstallFlowStage["InstallStarted"] = "install_started";
		SkillUrlInstallFlowStage["DuplicateDetected"] = "duplicate_detected";
		SkillUrlInstallFlowStage["InstallWarning"] = "install_warning";
		SkillUrlInstallFlowStage["InstallSucceeded"] = "install_succeeded";
		SkillUrlInstallFlowStage["InstallFailed"] = "install_failed";
		return SkillUrlInstallFlowStage;
	}({});
	PlaybookCtaSource = /* @__PURE__ */ function(PlaybookCtaSource) {
		PlaybookCtaSource["Featured"] = "featured";
		PlaybookCtaSource["Scene"] = "scene";
		PlaybookCtaSource["Search"] = "search";
		PlaybookCtaSource["Favorite"] = "favorite";
		PlaybookCtaSource["Deeplink"] = "deeplink";
		PlaybookCtaSource["Detail"] = "detail";
		PlaybookCtaSource["Dialog"] = "dialog";
		PlaybookCtaSource["Home"] = "home";
		return PlaybookCtaSource;
	}({});
}));
//#endregion
export { init_types as i, PlaybookCtaSource as n, SkillUrlInstallFlowStage as r, AgentTelemetryEvents as t };
