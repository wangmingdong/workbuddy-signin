const require_workbuddy_product_config = require("./workbuddy-product-config.js");
var en_US_default = {
	common: {
		"send": "Send",
		"cancel": "Cancel",
		"ok": "OK",
		"error": "Error",
		"retry": "Retry",
		"close": "Close",
		"save": "Save",
		"delete": "Delete",
		"copy": "Copy",
		"copied": "Copied",
		"loading": "Loading"
	},
	chat: {
		"placeholder": "Type a message... (Enter to send, Shift+Enter for new line)",
		"inputPlaceholder": "Type a message... (Enter to send)",
		"thinking": "Thinking",
		"thinkingActive": "Thinking...",
		"permissionRequest": "Permission Request",
		"toolRunning": "Tool running",
		"toolCompleted": "Tool completed",
		"toolFailed": "Tool failed",
		"allow": "Allow",
		"deny": "Deny",
		"newChat": "New Chat",
		"recentChats": "Recent Chats",
		"noChats": "No chats yet",
		"welcome": "Welcome to WorkBuddy",
		"welcomeDesc": "Type a message below to start chatting",
		"emptyInput": "Please enter a message",
		"emptyPlaceholder": "Start your first message",
		"status": {
			"pending": "Pending",
			"running": "Running",
			"completed": "Completed",
			"failed": "Failed"
		},
		"modelUsed": "Model",
		"input": "Input",
		"output": "Output",
		"error": "Error",
		"tool": "Tool",
		"reason": "Reason",
		"approved": "Approved",
		"denied": "Denied",
		"answered": "Answered",
		"enterAnswer": "Please enter your answer",
		"viewDetails": "View Details",
		"duration": "Duration",
		"cliNotRunning": "CLI is not running, please check status",
		"connecting": "Connecting...",
		"startMessaging": "Start typing to chat",
		"inputHint": "Enter to send · Shift+Enter for new line",
		"edit": "Edit",
		"resend": "Resend",
		"copy": "Copy",
		"copied": "Copied",
		"revert": "Revert",
		"like": "Like",
		"dislike": "Dislike",
		"more": "More",
		"cancel": "Cancel",
		"submit": "Submit",
		"save": "Save",
		"saving": "Saving...",
		"feedbackTitle": "Select feedback reason",
		"editHint": "Enter to save · Escape to cancel",
		"copyMessage": "Copy Message",
		"copyRequestId": "Copy Request ID",
		"delete": "Delete"
	},
	sidebar: {
		"newChat": "New Chat",
		"recentChats": "Recent Chats",
		"loading": "Loading...",
		"noChats": "No chats yet",
		"untitledChat": "New Chat",
		"yesterday": "Yesterday",
		"daysAgo": "{{days}} days ago",
		"confirmDelete": "Are you sure you want to delete this chat?",
		"rename": "Rename",
		"delete": "Delete",
		"settings": "Settings",
		"loadError": "Failed to load, please retry"
	},
	leftSidebar: {
		"newTask": "New Task",
		"claw": "Claw",
		"expert": "Expert",
		"skill": "Skills",
		"plugin": "Plugins",
		"automation": "Automation",
		"tasks": "Tasks",
		"searchPlaceholder": "Search tasks",
		"noSearchResults": "No matching tasks found",
		"user": "User",
		"justNow": "Just now",
		"hoursAgo": "{{hours}}h ago",
		"yesterday": "Yesterday",
		"daysAgo": "{{days}}d ago"
	},
	detailPanel: {
		"tasks": "Tasks",
		"artifacts": "Artifacts",
		"allFiles": "All Files",
		"changes": "Changes",
		"preview": "Preview",
		"pendingTodos": "{{count}} pending tasks",
		"noTodos": "No tasks yet",
		"noFiles": "No files yet",
		"noChanges": "No changes yet",
		"noPreview": "No preview available",
		"hide": "Hide panel",
		"show": "Show panel"
	},
	tencentDocs: { "localPreview": {
		"saveDialogTitle": "Save Document",
		"saveDialogMessage": "Save \"{{name}}\"?",
		"saveDialogDetail": "\"Save\" will overwrite the original document, or choose \"Save As\" to create a new copy.",
		"readOnlySaveDialogDetail": "The original document is read-only and cannot be overwritten. Use Save As to create a new file in a writable folder.",
		"readOnlySavePreventedMessage": "The original document is read-only and cannot be saved in place. Use Save As instead.",
		"saveButton": "Save",
		"saveAsButton": "Save As",
		"cancelButton": "Cancel",
		"discardButton": "Don't Save",
		"chooseSaveAsDirectoryTitle": "Choose Save As Folder",
		"saveCanceledMessage": "Save canceled",
		"saveAsCanceledMessage": "Save As canceled",
		"dirtyCloseTitle": "Save Document Changes",
		"dirtyCloseMessage": "Save changes to \"{{name}}\"?",
		"dirtyCloseDetail": "Unsaved changes will be lost when the document is closed.",
		"readOnlyDirtyCloseDetail": "The original document is read-only and cannot be overwritten. Use Save As to keep changes in a writable folder, or choose Don't Save and confirm discarding changes.",
		"discardConfirmTitle": "Close Without Saving?",
		"discardConfirmMessage": "Don't save changes to \"{{name}}\"?",
		"discardConfirmDetail": "Unsaved changes will be lost. Confirming Don't Save will close the preview service and discard current changes.",
		"overwriteButton": "Overwrite Anyway",
		"acknowledgeButton": "Got it",
		"originalChangedNotificationTitle": "Original Document Changed",
		"originalChangedNotificationBody": "\"{{name}}\" was modified by another app. Saving after further edits may overwrite those changes.",
		"originalChangedDirtyNotificationDetail": "Save As is recommended, or cancel and refresh the document to review the external changes first.",
		"originalChangedCleanNotificationBody": "\"{{name}}\" was modified by another app. Refresh the document to view the latest content.",
		"originalChangedCleanNotificationDetail": "The current preview is still showing the content from when it was opened. Refresh or reopen the document before continuing.",
		"originalChangedConflictTitle": "Original Document Changed",
		"originalChangedConflictMessage": "\"{{name}}\" was modified by another app.",
		"originalChangedConflictDetail": "Saving to the original document will overwrite external changes. Save As is recommended, or cancel and review the original document first. Choose Overwrite Anyway only if you are sure."
	} },
	connection: {
		"connected": "Connected",
		"connecting": "Connecting...",
		"disconnected": "Disconnected",
		"error": "Connection Error",
		"cliStarting": "CLI starting...",
		"cliCrashed": "CLI crashed",
		"reconnecting": "Reconnecting..."
	},
	connectors: {
		"runtime": {
			"preparing": "Preparing connector runtime…",
			"preparingWithProgress": "Preparing connector runtime {{percent}}%",
			"preparingDesc": "Downloading runtime for first use. Please wait.",
			"prepareFailed": "Failed to prepare connector runtime",
			"prepareFailedNetwork": "Network error. Please check your connection and retry",
			"prepareFailedGeneric": "Something went wrong. Please retry",
			"retry": "Retry"
		},
		"tokenConfig": {
			"defaultTitle": "Connector Configuration",
			"defaultDocLabel": "View configuration docs",
			"save": "Save & Connect",
			"saving": "Saving…",
			"cancel": "Cancel",
			"fieldRequired": "This field is required",
			"passwordExistsPlaceholder": "Saved; leave blank to keep unchanged",
			"submitFailed": "Failed to save. Please retry."
		}
	},
	safeDelete: {
		"target": {
			"mac": "Trash",
			"windows": "Recycle Bin",
			"linux": "Trash",
			"generic": "system Trash"
		},
		"toast": {
			"single": "Moved to {{target}}. You can restore it if needed.",
			"multiple": "Moved {{count}} files to {{target}}. You can restore them if needed."
		}
	},
	settings: {
		"title": "Settings",
		"general": "General",
		"model": "Model",
		"mcp": "MCP Servers",
		"theme": "Theme",
		"themeLight": "Light Mode",
		"themeDark": "Dark Mode",
		"themeSystem": "System",
		"language": "Language"
	},
	error: {
		"appError": "Application Error",
		"appErrorDescription": "The application encountered an unexpected error. Please refresh the page to try again.",
		"refreshPage": "Refresh Page",
		"retry": "Retry",
		"details": "Error Details",
		"moduleError": "Module Error",
		"unknownError": "Unknown error",
		"viewDetails": "View Details",
		"componentError": "Component failed to load",
		"creditsFetchFailed": "Failed to load credits, please try again later"
	},
	menu: {
		"edit": "Edit",
		"editWithMnemonic": "Edit(&&E)",
		"undo": "Undo",
		"undoWithMnemonic": "Undo(&&U)",
		"redo": "Redo",
		"redoWithMnemonic": "Redo(&&R)",
		"cut": "Cut",
		"cutWithMnemonic": "Cut(&&T)",
		"copy": "Copy",
		"copyWithMnemonic": "Copy(&&C)",
		"paste": "Paste",
		"pasteWithMnemonic": "Paste(&&P)",
		"selectAll": "Select All",
		"selectAllWithMnemonic": "Select All(&&A)",
		"view": "View",
		"reload": "Reload",
		"forceReload": "Force Reload",
		"toggleDevTools": "Toggle Developer Tools",
		"toggleDevToolsWithMnemonic": "Developer Tools(&&D)",
		"resetZoom": "Reset Zoom",
		"zoomIn": "Zoom In",
		"zoomOut": "Zoom Out",
		"toggleFullscreen": "Toggle Fullscreen",
		"window": "Window",
		"windowWithMnemonic": "Window(&&W)",
		"minimize": "Minimize",
		"zoom": "Zoom",
		"front": "Front",
		"help": "Help",
		"helpWithMnemonic": "Help(&&H)",
		"documentation": "Documentation",
		"networkCheck": "Network Check",
		"about": "About {{name}}",
		"checkForUpdates": "Check for Updates...",
		"checkingForUpdates": "Checking for Updates...",
		"downloadUpdate": "Download Update",
		"downloadingUpdate": "Downloading Update...",
		"installUpdate": "Install Update...",
		"quit": "Quit {{name}}",
		"closeWindow": "Close Window",
		"closeWindowWithMnemonic": "Close Window(&&C)",
		"openLogsFolder": "Open Logs Folder",
		"openLogsFolderWithMnemonic": "Open Logs Folder(&&L)",
		"helpFeedback": "Feedback",
		"copyUserId": "Copy UID",
		"openApiConsole": "Open API Console",
		"perfStartRecording": "Start Performance Recording",
		"perfStopRecording": "Stop Recording",
		"perfStopAndAnalyze": "Stop Recording & Analyze with Agent",
		"copyStartupTraceId": "Copy Startup Trace ID",
		"openStartupReport": "Startup Report"
	},
	window: {
		"maximize": "Maximize",
		"restore": "Restore"
	},
	automation: { "test": {
		"notFound": "Automation not found: {{id}}.",
		"executionServiceNotReady": "The automation execution service is not ready. Please try again later.",
		"alreadyRunning": "This automation is already running. Please try again later.",
		"concurrencyLimit": "The maximum concurrency limit for automation tasks has been exceeded (up to {{max}}). Please try again later.",
		"triggered": "Test run triggered.",
		"startFailed": "Failed to start the automation task. Please try again later."
	} },
	lexiang: {
		"search": "Search",
		"confirm": "OK",
		"cancel": "Cancel",
		"close": "Close",
		"clear": "Clear",
		"expand": "Expand",
		"collapse": "Collapse",
		"team": "Team",
		"knowledgeBase": "Knowledge Base",
		"knowledge": "Knowledge",
		"kbDirectory": "KB Directory",
		"recentKb": "Recent KB",
		"teamKb": "Team KB",
		"recentUsed": "Recent",
		"searchKb": "Search knowledge bases",
		"searchKbAndKnowledge": "Search knowledge bases and articles",
		"searchTeamKbKnowledge": "Search teams, knowledge bases, articles",
		"noAccessibleTeams": "No accessible teams",
		"noKbInTeam": "No knowledge bases in this team",
		"selectKbFirst": "Please select a knowledge base first",
		"noContentInDir": "No content in this directory",
		"noResults": "No results found",
		"noKbResults": "No matching knowledge bases found",
		"noFileResults": "No files found, try different keywords",
		"searchHint": "Enter keywords to search files in Lexiang knowledge bases",
		"loadingMore": "Loading more...",
		"noRecentKb": "No recently used knowledge bases",
		"noRecentRecords": "No recent records",
		"noData": "No data",
		"selectedCount": "{{count}} selected",
		"saveToLexiangTitle": "Save to Lexiang Knowledge Base",
		"saveToLexiangSubtitle": "Please select a target knowledge base first",
		"selectFromLexiangTitle": "Select from Lexiang Knowledge Base",
		"browseKbTitle": "Switch Knowledge Base",
		"browseKbSubtitle": "Please select a target knowledge base first",
		"auth": {
			"title": "Lexiang Knowledge Base Authorization",
			"subtitle": "Log in and authorize to use Lexiang knowledge base",
			"iframeTitle": "Lexiang Login Authorization",
			"loading": "Loading authorization page...",
			"checking": "Checking authorization status...",
			"notConnected": "Not Connected to Lexiang Knowledge Base",
			"notConnectedDesc": "Log in and authorize Lexiang Knowledge Base to browse and use knowledge base content",
			"startAuth": "Authorize Now",
			"authorizing": "Authorizing",
			"authorizingDesc": "Please complete the login on the authorization page. It will redirect automatically once done.",
			"cancelAuth": "Cancel Authorization",
			"success": "Authorization Successful",
			"successDesc": "Successfully connected to Lexiang Knowledge Base, redirecting...",
			"failed": "Authorization Failed",
			"failedDesc": "An error occurred during authorization, please retry",
			"expired": "Authorization Expired",
			"expiredDesc": "Authorization link has expired, please re-initiate authorization",
			"retry": "Retry",
			"corpNotEnabled": "Lexiang Knowledge Base Not Enabled",
			"corpNotEnabledDesc": "Lexiang Knowledge Base is not enabled for your organization. Please contact your administrator.",
			"iKnow": "I Understand",
			"loadFailed": "Authorization Page Load Failed",
			"loadFailedDesc": "The embedded login page could not be loaded. You can complete authorization in the browser.",
			"openInBrowser": "Open in Browser",
			"unbind": "Unbind Account",
			"unbindConfirmTitle": "Unbind Lexiang Knowledge Base?",
			"unbindConfirmDesc": "After unbinding, all Lexiang features (library browsing, file selection, search sources, etc.) will be unavailable until re-authorized.",
			"unbindSuccess": "Successfully unbound Lexiang Knowledge Base account",
			"goBack": "Go Back"
		}
	},
	databaseRecovery: {
		"title": "Database Auto-Recovered",
		"ok": "Got it",
		"message": "Local database corruption was detected and automatically repaired. Some conversation history may have been lost, but this will not affect future usage.",
		"messageWalOnly": "Local database corruption was detected and automatically repaired. A small amount of recent conversation history may have been lost, but this will not affect future usage.",
		"messageFullCorruption": "Local database corruption was detected and automatically repaired. Automation tasks and some history records may have been lost, but this will not affect future usage.",
		"reason": "Reason: {{reason}}"
	},
	windowLifecycle: {
		"activeTasksQuit": {
			"cancel": "Cancel",
			"quitAnyway": "Quit Anyway",
			"title": "WorkBuddy",
			"message": "Tasks are still running. Quit anyway?",
			"detail": "Quitting will force running tasks to stop and may cause progress loss."
		},
		"activeTasksUpdate": {
			"cancel": "Later",
			"updateAnyway": "Restart Anyway",
			"title": "WorkBuddy",
			"message": "Tasks are still running. Restarting now may cause conversation history loss.",
			"detail": "It's recommended to wait until tasks are completed before restarting."
		},
		"closeToTrayHint": {
			"title": "WorkBuddy is still running",
			"body": "Click this notification to reopen the window. You can also find WorkBuddy in the system tray. Right-click the tray icon to quit.",
			"balloonContent": "Click the system tray icon to reopen the window. Right-click the tray icon to quit."
		},
		"taskCompleted": {
			"title": "Task Completed",
			"body": "\"{{taskTitle}}\" has been successfully completed. You can view the results in the editor."
		}
	}
};
var zh_CN_default = {
	common: {
		"send": "发送",
		"cancel": "取消",
		"ok": "确定",
		"error": "错误",
		"retry": "重试",
		"close": "关闭",
		"save": "保存",
		"delete": "删除",
		"copy": "复制",
		"copied": "已复制",
		"loading": "加载中"
	},
	chat: {
		"placeholder": "输入消息... (Enter 发送，Shift+Enter 换行)",
		"inputPlaceholder": "输入消息... (Enter 发送)",
		"thinking": "思考过程",
		"thinkingActive": "思考中...",
		"permissionRequest": "权限请求",
		"toolRunning": "工具运行中",
		"toolCompleted": "工具完成",
		"toolFailed": "工具失败",
		"allow": "允许",
		"deny": "拒绝",
		"newChat": "新对话",
		"recentChats": "最近对话",
		"noChats": "暂无对话",
		"welcome": "欢迎使用 WorkBuddy",
		"welcomeDesc": "在下方输入消息开始对话",
		"emptyInput": "请输入消息",
		"emptyPlaceholder": "开始您的第一条消息",
		"status": {
			"pending": "等待中",
			"running": "运行中",
			"completed": "已完成",
			"failed": "失败"
		},
		"modelUsed": "使用模型",
		"input": "输入",
		"output": "输出",
		"error": "错误",
		"tool": "工具",
		"reason": "原因",
		"approved": "已批准",
		"denied": "已拒绝",
		"answered": "已回答",
		"enterAnswer": "请输入答案",
		"viewDetails": "查看详情",
		"duration": "耗时",
		"cliNotRunning": "CLI 未运行，请检查状态",
		"connecting": "连接中...",
		"startMessaging": "开始输入消息进行对话",
		"inputHint": "Enter 发送 · Shift+Enter 换行",
		"edit": "编辑",
		"resend": "重新发送",
		"copy": "复制",
		"copied": "已复制",
		"revert": "回退",
		"like": "点赞",
		"dislike": "点踩",
		"more": "更多",
		"cancel": "取消",
		"submit": "提交",
		"save": "保存",
		"saving": "保存中...",
		"feedbackTitle": "请选择反馈原因",
		"editHint": "Enter 保存 · Escape 取消",
		"copyMessage": "复制消息",
		"copyRequestId": "复制请求 ID",
		"delete": "删除"
	},
	sidebar: {
		"newChat": "新对话",
		"recentChats": "最近对话",
		"loading": "加载中...",
		"noChats": "暂无对话",
		"untitledChat": "新对话",
		"yesterday": "昨天",
		"daysAgo": "{{days}}天前",
		"confirmDelete": "确定要删除这个对话吗？",
		"rename": "重命名",
		"delete": "删除",
		"settings": "设置",
		"loadError": "加载失败，请重试"
	},
	leftSidebar: {
		"newTask": "新建任务",
		"claw": "Claw",
		"expert": "专家",
		"skill": "技能",
		"plugin": "插件",
		"automation": "自动化",
		"tasks": "任务",
		"searchPlaceholder": "搜索任务",
		"noSearchResults": "没有找到匹配的任务",
		"user": "用户",
		"justNow": "刚刚",
		"hoursAgo": "{{hours}}h 前",
		"yesterday": "昨天",
		"daysAgo": "{{days}}d 前"
	},
	detailPanel: {
		"tasks": "任务",
		"artifacts": "产物",
		"allFiles": "全部文件",
		"changes": "变更",
		"preview": "预览",
		"pendingTodos": "{{count}} 个待办任务",
		"noTodos": "暂无任务",
		"noFiles": "暂无文件",
		"noChanges": "暂无变更",
		"noPreview": "暂无预览内容",
		"hide": "收起面板",
		"show": "展开面板"
	},
	tencentDocs: { "localPreview": {
		"saveDialogTitle": "保存文档",
		"saveDialogMessage": "保存“{{name}}”？",
		"saveDialogDetail": "“保存”将覆盖原文档，或选择“另存为”创建新副本。",
		"readOnlySaveDialogDetail": "原文档只读，无法覆盖保存。请使用另存为在可写目录中生成新文件。",
		"readOnlySavePreventedMessage": "原文档只读，无法保存到原文档，请使用另存为。",
		"saveButton": "保存",
		"saveAsButton": "另存为",
		"cancelButton": "取消",
		"discardButton": "不保存",
		"chooseSaveAsDirectoryTitle": "选择另存为目录",
		"saveCanceledMessage": "已取消保存",
		"saveAsCanceledMessage": "已取消另存为",
		"dirtyCloseTitle": "保存文档修改",
		"dirtyCloseMessage": "是否保存对“{{name}}”的修改？",
		"dirtyCloseDetail": "未保存的修改将在关闭后丢失。",
		"readOnlyDirtyCloseDetail": "原文档只读，无法覆盖保存；请另存为在可写目录中保留修改，或选择不保存并确认丢弃修改。",
		"discardConfirmTitle": "不保存并关闭预览？",
		"discardConfirmMessage": "不保存“{{name}}”的修改？",
		"discardConfirmDetail": "未保存的内容将丢失。确认不保存后会直接关闭预览服务并放弃当前修改。",
		"overwriteButton": "继续覆盖",
		"acknowledgeButton": "知道了",
		"originalChangedNotificationTitle": "原文档已被修改",
		"originalChangedNotificationBody": "“{{name}}”已被其他应用修改，继续编辑后保存可能覆盖外部修改。",
		"originalChangedDirtyNotificationDetail": "建议先另存为当前修改，或取消后刷新文档确认外部修改。",
		"originalChangedCleanNotificationBody": "“{{name}}”已被其他应用修改，请刷新文档以查看最新内容。",
		"originalChangedCleanNotificationDetail": "当前预览仍是打开时的内容；如果要继续处理，请先刷新或重新打开文档。",
		"originalChangedConflictTitle": "原文档已被修改",
		"originalChangedConflictMessage": "“{{name}}”已被其他应用修改。",
		"originalChangedConflictDetail": "保存到原文档会覆盖外部修改。建议选择另存为，或取消保存后先确认原文档内容；只有确认需要覆盖时再选择继续覆盖。"
	} },
	connection: {
		"connected": "已连接",
		"connecting": "连接中...",
		"disconnected": "未连接",
		"error": "连接错误",
		"cliStarting": "CLI 启动中...",
		"cliCrashed": "CLI 已崩溃",
		"reconnecting": "重新连接中..."
	},
	connectors: {
		"runtime": {
			"preparing": "正在准备连接器运行环境…",
			"preparingWithProgress": "正在准备连接器运行环境 {{percent}}%",
			"preparingDesc": "首次使用需要下载运行环境，请稍候。",
			"prepareFailed": "连接器运行环境准备失败",
			"prepareFailedNetwork": "网络连接异常，请检查网络后重试",
			"prepareFailedGeneric": "发生未知错误，请重试",
			"retry": "重试"
		},
		"tokenConfig": {
			"defaultTitle": "连接器配置",
			"defaultDocLabel": "查看配置文档",
			"save": "保存并连接",
			"saving": "保存中…",
			"cancel": "取消",
			"fieldRequired": "此项为必填",
			"passwordExistsPlaceholder": "已保存，留空保持不变",
			"submitFailed": "保存失败，请重试"
		}
	},
	safeDelete: {
		"target": {
			"mac": "废纸篓",
			"windows": "回收站",
			"linux": "垃圾箱",
			"generic": "系统垃圾箱"
		},
		"toast": {
			"single": "已移到{{target}}，可在需要时恢复",
			"multiple": "已将 {{count}} 个文件移到{{target}}，可在需要时恢复"
		}
	},
	settings: {
		"title": "设置",
		"general": "通用",
		"model": "模型",
		"mcp": "MCP 服务器",
		"theme": "主题",
		"themeLight": "浅色",
		"themeDark": "深色",
		"themeSystem": "跟随系统",
		"language": "语言"
	},
	error: {
		"appError": "应用程序错误",
		"appErrorDescription": "应用程序遇到意外错误。请刷新页面重试。",
		"refreshPage": "刷新页面",
		"retry": "重试",
		"details": "错误详情",
		"moduleError": "模块错误",
		"unknownError": "未知错误",
		"viewDetails": "查看详情",
		"componentError": "组件加载失败",
		"creditsFetchFailed": "积分信息获取失败，请稍后重试"
	},
	menu: {
		"edit": "编辑",
		"editWithMnemonic": "编辑(&&E)",
		"undo": "撤销",
		"undoWithMnemonic": "撤销(&&U)",
		"redo": "重做",
		"redoWithMnemonic": "重做(&&R)",
		"cut": "剪切",
		"cutWithMnemonic": "剪切(&&T)",
		"copy": "复制",
		"copyWithMnemonic": "复制(&&C)",
		"paste": "粘贴",
		"pasteWithMnemonic": "粘贴(&&P)",
		"selectAll": "全选",
		"selectAllWithMnemonic": "全选(&&A)",
		"view": "查看",
		"reload": "重新加载",
		"forceReload": "强制重新加载",
		"toggleDevTools": "打开开发者工具",
		"toggleDevToolsWithMnemonic": "开发者工具(&&D)",
		"resetZoom": "重置缩放",
		"zoomIn": "放大",
		"zoomOut": "缩小",
		"toggleFullscreen": "切换全屏",
		"window": "窗口",
		"windowWithMnemonic": "窗口(&&W)",
		"minimize": "最小化",
		"zoom": "缩放",
		"front": "前置",
		"help": "帮助",
		"helpWithMnemonic": "帮助(&&H)",
		"documentation": "使用文档",
		"networkCheck": "网络检查",
		"about": "关于 {{name}}",
		"checkForUpdates": "检查更新...",
		"checkingForUpdates": "正在检查更新...",
		"downloadUpdate": "下载更新",
		"downloadingUpdate": "正在下载更新...",
		"installUpdate": "安装更新...",
		"quit": "退出 {{name}}",
		"closeWindow": "关闭窗口",
		"closeWindowWithMnemonic": "关闭窗口(&&C)",
		"openLogsFolder": "打开日志文件夹",
		"openLogsFolderWithMnemonic": "打开日志目录(&&L)",
		"helpFeedback": "意见反馈",
		"copyUserId": "复制 UID",
		"openApiConsole": "开放 API",
		"perfStartRecording": "开始录制性能采集",
		"perfStopRecording": "完成录制",
		"perfStopAndAnalyze": "完成录制并启动 Agent 分析",
		"copyStartupTraceId": "复制启动 Trace ID",
		"openStartupReport": "启动报告"
	},
	window: {
		"maximize": "最大化",
		"restore": "还原"
	},
	lexiang: {
		"search": "搜索",
		"confirm": "确定",
		"cancel": "取消",
		"close": "关闭",
		"clear": "清除",
		"expand": "展开",
		"collapse": "收起",
		"team": "团队",
		"knowledgeBase": "知识库",
		"knowledge": "知识",
		"kbDirectory": "知识库目录",
		"recentKb": "最近知识库",
		"teamKb": "团队知识库",
		"recentUsed": "最近使用",
		"searchKb": "搜索知识库",
		"searchKbAndKnowledge": "搜索知识库与知识",
		"searchTeamKbKnowledge": "搜索团队、知识库、知识",
		"noAccessibleTeams": "暂无可访问的团队",
		"noKbInTeam": "该团队下暂无知识库",
		"selectKbFirst": "请先选择一个知识库",
		"noContentInDir": "该目录下暂无内容",
		"noResults": "未找到相关结果",
		"noKbResults": "未找到相关知识库",
		"noFileResults": "未找到相关文件，请更换关键词重试",
		"searchHint": "输入关键词搜索乐享知识库中的文件",
		"loadingMore": "加载更多...",
		"noRecentKb": "暂无最近使用的知识库",
		"noRecentRecords": "暂无最近使用记录",
		"noData": "暂无数据",
		"selectedCount": "已选 {{count}} 个",
		"saveToLexiangTitle": "保存到乐享知识库",
		"saveToLexiangSubtitle": "请先选择目标知识库",
		"selectFromLexiangTitle": "从乐享知识库中选择",
		"browseKbTitle": "切换知识库",
		"browseKbSubtitle": "请先选择目标知识库",
		"auth": {
			"title": "乐享知识库授权",
			"subtitle": "登录并授权后即可使用乐享知识库",
			"iframeTitle": "乐享登录授权",
			"loading": "正在加载授权页...",
			"checking": "正在检查授权状态...",
			"notConnected": "尚未连接乐享知识库",
			"notConnectedDesc": "登录并授权乐享知识库后，即可浏览和使用知识库内容",
			"startAuth": "立即授权",
			"authorizing": "授权中",
			"authorizingDesc": "请在授权页面完成登录，完成后将自动跳转",
			"cancelAuth": "取消授权",
			"success": "授权成功",
			"successDesc": "已成功连接乐享知识库，正在跳转...",
			"failed": "授权失败",
			"failedDesc": "授权过程中出现错误，请重试",
			"expired": "授权已过期",
			"expiredDesc": "授权链接已过期，请重新发起授权",
			"retry": "重试",
			"corpNotEnabled": "企业未开通乐享知识库",
			"corpNotEnabledDesc": "您所在的企业暂未开通乐享知识库服务，请联系管理员",
			"iKnow": "我知道了",
			"loadFailed": "授权页加载失败",
			"loadFailedDesc": "内嵌登录页无法加载，您可以在浏览器中完成授权",
			"openInBrowser": "在浏览器中打开",
			"unbind": "解绑账号",
			"unbindConfirmTitle": "确认解绑乐享知识库？",
			"unbindConfirmDesc": "解绑后，所有乐享相关功能（资料库浏览、文件选择、搜索信源等）将不可用，需重新授权",
			"unbindSuccess": "已成功解绑乐享知识库账号",
			"goBack": "返回"
		}
	},
	automation: { "test": {
		"notFound": "未找到对应的自动化任务：{{id}}。",
		"executionServiceNotReady": "自动化执行服务尚未就绪，请稍后再试。",
		"alreadyRunning": "该自动化任务正在执行中，请稍后再试。",
		"concurrencyLimit": "已超过自动化任务最大并发限制（最多 {{max}} 个），请稍后再试。",
		"triggered": "已触发测试运行。",
		"startFailed": "自动化任务启动失败，请稍后再试。"
	} },
	databaseRecovery: {
		"title": "数据库已自动修复",
		"ok": "我知道了",
		"message": "检测到本地数据库文件损坏，已自动修复。部分历史会话记录可能丢失，但不影响后续正常使用。",
		"messageWalOnly": "检测到本地数据库文件损坏，已自动修复。少量历史会话记录可能丢失，但不影响后续正常使用。",
		"messageFullCorruption": "检测到本地数据库文件损坏，已自动修复。自动化任务和部分历史记录可能丢失，但不影响后续正常使用。",
		"reason": "原因：{{reason}}"
	},
	windowLifecycle: {
		"activeTasksQuit": {
			"cancel": "取消",
			"quitAnyway": "仍然退出",
			"title": "WorkBuddy",
			"message": "有任务正在执行中，确认要退出吗？",
			"detail": "退出将强制中断正在执行的任务，可能导致进度丢失。"
		},
		"activeTasksUpdate": {
			"cancel": "稍后再试",
			"updateAnyway": "仍然重启",
			"title": "WorkBuddy",
			"message": "有任务正在执行中，立即重启可能导致对话记录丢失。",
			"detail": "建议等任务完成后再重启更新。"
		},
		"closeToTrayHint": {
			"title": "WorkBuddy 仍在后台运行",
			"body": "点击此通知可重新打开窗口；也可以在任务栏右下角托盘中找到 WorkBuddy 图标。右键托盘图标可退出应用。",
			"balloonContent": "点击系统托盘图标可重新打开窗口；右键托盘图标可退出应用。"
		},
		"taskCompleted": {
			"title": "任务已完成",
			"body": "「{{taskTitle}}」 已成功完成，您可以在编辑器中查看结果。"
		}
	}
};
//#endregion
//#region src/main/features/i18n/menu-i18n.ts
/**
* 主进程国际化支持
*
* 提供菜单文案与 Renderer i18n 文案读取能力，避免 Electron 主进程直接依赖 Renderer i18n 运行时。
*/
require_workbuddy_product_config.init_workbuddy_product_config();
var rendererI18nResources = {
	"zh-CN": zh_CN_default,
	"en-US": en_US_default
};
var menuTranslations = {
	"zh-CN": {
		about: "关于",
		edit: "编辑",
		undo: "撤销",
		redo: "重做",
		cut: "剪切",
		copy: "复制",
		paste: "粘贴",
		selectAll: "全选",
		view: "查看",
		reload: "重新加载",
		forceReload: "强制重新加载",
		toggleDevTools: "打开开发者工具",
		resetZoom: "重置缩放",
		zoomIn: "放大",
		zoomOut: "缩小",
		toggleFullscreen: "切换全屏",
		window: "窗口",
		minimize: "最小化",
		zoom: "缩放",
		front: "前置",
		help: "帮助",
		documentation: "使用文档",
		networkCheck: "网络检查",
		openLogsFolder: "打开日志文件夹",
		helpFeedback: "意见反馈",
		copyUserId: "复制UID",
		checkForUpdates: "检查更新...",
		checkingForUpdates: "正在检查更新...",
		downloadUpdate: "下载更新",
		downloadingUpdate: "正在下载更新...",
		installUpdate: "安装更新...",
		quit: "退出",
		showWindow: "显示窗口",
		closeWindow: "关闭窗口",
		hide: "隐藏",
		hideOthers: "隐藏其他",
		unhide: "显示全部",
		services: "服务",
		switchEnv: "切换环境",
		envProd: "线上 (prod)",
		envStaging: "预发 (staging)",
		addCustomEnv: "添加自定义环境...",
		clearCustomEnvs: "清空所有自定义环境",
		disableEnvSwitch: "关闭环境切换",
		currentEnvIndicator: "✓ ",
		allowNonTencentIM: "允许非腾讯系 IM 通道",
		openApiConsole: "开放 API",
		perfStartRecording: "开始录制性能采集",
		perfStopRecording: "完成录制",
		perfStopAndAnalyze: "完成录制并启动 Agent 分析",
		copyStartupTraceId: "复制启动 Trace ID",
		openStartupReport: "启动报告",
		aboutTitle: "关于 {appName}",
		aboutDetail: "版本: {version} ({commit})\nElectron: {electron}\nChrome: {chrome}\nNode.js: {node}",
		ok: "确定"
	},
	"en-US": {
		about: "About",
		edit: "Edit",
		undo: "Undo",
		redo: "Redo",
		cut: "Cut",
		copy: "Copy",
		paste: "Paste",
		selectAll: "Select All",
		view: "View",
		reload: "Reload",
		forceReload: "Force Reload",
		toggleDevTools: "Toggle Developer Tools",
		resetZoom: "Reset Zoom",
		zoomIn: "Zoom In",
		zoomOut: "Zoom Out",
		toggleFullscreen: "Toggle Fullscreen",
		window: "Window",
		minimize: "Minimize",
		zoom: "Zoom",
		front: "Front",
		help: "Help",
		documentation: "Documentation",
		networkCheck: "Network Check",
		openLogsFolder: "Open Logs Folder",
		helpFeedback: "Feedback",
		copyUserId: "Copy UID",
		checkForUpdates: "Check for Updates...",
		checkingForUpdates: "Checking for Updates...",
		downloadUpdate: "Download Update",
		downloadingUpdate: "Downloading Update...",
		installUpdate: "Install Update...",
		quit: "Quit",
		showWindow: "Show Window",
		closeWindow: "Close Window",
		hide: "Hide",
		hideOthers: "Hide Others",
		unhide: "Show All",
		services: "Services",
		switchEnv: "Switch Environment",
		envProd: "Production",
		envStaging: "Staging",
		addCustomEnv: "Add Custom Environment...",
		clearCustomEnvs: "Clear All Custom Environments",
		disableEnvSwitch: "Disable Environment Switch",
		currentEnvIndicator: "✓ ",
		allowNonTencentIM: "Allow Non-Tencent IM Channels",
		openApiConsole: "Open API Console",
		perfStartRecording: "Start Performance Recording",
		perfStopRecording: "Stop Recording",
		perfStopAndAnalyze: "Stop Recording & Analyze with Agent",
		copyStartupTraceId: "Copy Startup Trace ID",
		openStartupReport: "Startup Report",
		aboutTitle: "About {appName}",
		aboutDetail: "Version: {version} ({commit})\nElectron: {electron}\nChrome: {chrome}\nNode.js: {node}",
		ok: "OK"
	}
};
function getMenuTranslation(key, locale = "zh-CN") {
	return menuTranslations[locale]?.[key] ?? key;
}
/**
* 读取当前品牌的产品显示名（来自 `product.json#productName`，
* 经 `apply-brand-patch` 后会变成 `LearnBuddy` 等品牌名）。
*
* 用于 `getRendererTranslation` 中 `{{productName}}` 占位符插值；
* 兜底为 `WorkBuddy`，避免读不到 product 时空串导致 UI 出现空白标题。
*/
function getProductName() {
	const productName = require_workbuddy_product_config.tryGetWorkbuddyBaseProductConfiguration()?.productName;
	if (typeof productName === "string" && productName.trim()) return productName.trim();
	return "WorkBuddy";
}
/**
* 翻译资源中允许的占位符与对应取值。
*
* 内置 `{{productName}}` 用于跨品牌（WorkBuddy / LearnBuddy / …）复用文案；
* 调用方可通过 `vars` 传入额外占位符（如 `{{taskTitle}}`）做一次性插值。
* 把产品名/动态数据写进 JSON 等于硬编码，必须走占位符。
*/
function resolveInterpolation(template, vars) {
	return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, name) => {
		if (name === "productName") return getProductName();
		if (vars && Object.prototype.hasOwnProperty.call(vars, name)) return vars[name];
		return match;
	});
}
function getRendererTranslation(key, localeOrVars = getMenuLocale(), maybeVars) {
	const hasExplicitLocale = typeof localeOrVars === "string";
	const locale = hasExplicitLocale ? localeOrVars : getMenuLocale();
	const vars = hasExplicitLocale ? maybeVars : localeOrVars;
	const value = key.split(".").reduce((current, part) => {
		if (!current || typeof current !== "object") return;
		return current[part];
	}, rendererI18nResources[locale]);
	if (typeof value !== "string") return key;
	return resolveInterpolation(value, vars);
}
function getMenuLocale() {
	const savedLocale = process.env.WORKBUDDY_MENU_LOCALE;
	if (isMenuLocale(savedLocale)) return savedLocale;
	const product = require_workbuddy_product_config.tryGetWorkbuddyBaseProductConfiguration();
	if (product?.isOversea === true) return "en-US";
	const endpoint = product?.endpoint;
	if (typeof endpoint === "string" && endpoint.includes("workbuddy.ai")) return "en-US";
	return isChineseLocale(getSystemLocale()) ? "zh-CN" : "en-US";
}
function getSystemLocale() {
	try {
		const { app } = require("electron");
		return app.getLocale() || "en-US";
	} catch {
		return process.env.LANG || "en-US";
	}
}
function isMenuLocale(locale) {
	return locale === "zh-CN" || locale === "en-US";
}
function isChineseLocale(locale) {
	return /^zh|^cn/.test(locale.toLowerCase());
}
function setMenuLocale(locale) {
	process.env.WORKBUDDY_MENU_LOCALE = locale;
}
//#endregion
Object.defineProperty(exports, "getMenuLocale", {
	enumerable: true,
	get: function() {
		return getMenuLocale;
	}
});
Object.defineProperty(exports, "getMenuTranslation", {
	enumerable: true,
	get: function() {
		return getMenuTranslation;
	}
});
Object.defineProperty(exports, "getRendererTranslation", {
	enumerable: true,
	get: function() {
		return getRendererTranslation;
	}
});
Object.defineProperty(exports, "setMenuLocale", {
	enumerable: true,
	get: function() {
		return setMenuLocale;
	}
});
