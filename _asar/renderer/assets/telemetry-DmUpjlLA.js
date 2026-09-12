import { n as __esmMin } from "./chunk-BRZcfu7K.js";
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/telemetry.ts
/**
* 上报 web_page_show 事件
*/
function reportPageShow(adapter, pageName) {
	try {
		adapter?.reportTelemetry?.("web_page_show", { pageName });
	} catch (error) {
		console.warn("[TDocTelemetry] reportPageShow failed:", error);
	}
}
/**
* 上报 web_element_show 事件
*/
function reportElementShow(adapter, params) {
	try {
		adapter?.reportTelemetry?.("web_element_show", params);
	} catch (error) {
		console.warn("[TDocTelemetry] reportElementShow failed:", error);
	}
}
/**
* 上报 web_element_click 事件
*/
function reportElementClick(adapter, params) {
	try {
		adapter?.reportTelemetry?.("web_element_click", params);
	} catch (error) {
		console.warn("[TDocTelemetry] reportElementClick failed:", error);
	}
}
/** 腾讯文档资料库 - "最近" tab 文件列表展示 */
function reportTDocListRecent(adapter) {
	reportPageShow(adapter, "tdoc_library_list_recent");
}
/** 腾讯文档资料库 - "我的文件" tab 文件列表展示 */
function reportTDocListMyFile(adapter) {
	reportPageShow(adapter, "tdoc_library_list_myfile");
}
/** 腾讯文档文件选择器弹窗曝光（授权成功后触发） */
function reportAttachTDocChooser(adapter) {
	reportElementShow(adapter, {
		pageName: "new_task",
		elementId: "attach_tdoc_chooser",
		elementName: "腾讯文档文件选择器弹窗"
	});
}
/** 腾讯文档资料库入口点击 */
function reportTDocLibEntry(adapter) {
	reportElementClick(adapter, {
		elementId: "tdoc_lib_entry",
		elementName: "腾讯文档资料库入口",
		pageName: "tdoc_lib"
	});
}
/** 更多按钮点击 */
function reportTDocLibMore(adapter) {
	reportElementClick(adapter, {
		elementId: "tdoc_lib_more",
		elementName: "更多按钮",
		pageName: "tdoc_lib"
	});
}
/** 更多 - 打开文件 */
function reportTDocLibMoreOpen(adapter) {
	reportElementClick(adapter, {
		elementId: "tdoc_lib_more_open",
		elementName: "打开文件",
		pageName: "tdoc_lib"
	});
}
/** 更多 - 复制链接 */
function reportTDocLibMoreCopyLink(adapter) {
	reportElementClick(adapter, {
		elementId: "tdoc_lib_more_copy_link",
		elementName: "复制链接",
		pageName: "tdoc_lib"
	});
}
/** 更多 - 重命名 */
function reportTDocLibMoreRename(adapter) {
	reportElementClick(adapter, {
		elementId: "tdoc_lib_more_rename",
		elementName: "重命名",
		pageName: "tdoc_lib"
	});
}
/** 更多 - 删除 */
function reportTDocLibMoreDelete(adapter) {
	reportElementClick(adapter, {
		elementId: "tdoc_lib_more_delete",
		elementName: "删除",
		pageName: "tdoc_lib"
	});
}
/** 文件点击预览 */
function reportTDocLibFileOpen(adapter, source, type) {
	reportElementClick(adapter, {
		elementId: "tdoc_lib_file_open",
		elementName: "文件点击预览",
		pageName: "tdoc_lib",
		source,
		type,
		mode: "tdocs"
	});
}
/** 新建文件 */
function reportTDocLibNewFile(adapter, source) {
	reportElementClick(adapter, {
		elementId: "tdoc_lib_new_file",
		elementName: "新建文件",
		pageName: "tdoc_lib",
		source,
		mode: "tdocs"
	});
}
/** 上传文件 */
function reportTDocLibUpload(adapter) {
	reportElementClick(adapter, {
		elementId: "tdoc_lib_upload",
		elementName: "上传文件",
		pageName: "tdoc_lib"
	});
}
/** 搜索入口 */
function reportTDocLibSearch(adapter) {
	reportElementClick(adapter, {
		elementId: "tdoc_lib_search",
		elementName: "搜索入口",
		pageName: "tdoc_lib"
	});
}
/** 文件详情页点击"上传到云端（腾讯文档）"按钮 */
function reportSaveToTdocBtn(adapter) {
	reportElementClick(adapter, {
		elementId: "save_to_tdoc_btn",
		elementName: "上传到腾讯文档按钮"
	});
}
/** 上传到腾讯文档目录选择器弹窗曝光（授权成功后） */
function reportSaveToTdocPopShow(adapter) {
	reportElementShow(adapter, {
		elementId: "save_to_tdoc_pop_show",
		elementName: "上传到腾讯文档的弹窗曝光"
	});
}
/** 点击"立即上传" */
function reportSaveToTdocConfirm(adapter) {
	reportElementClick(adapter, {
		elementId: "save_to_tdoc_confirm",
		elementName: "确认上传到腾讯文档"
	});
}
/**
* 上传到腾讯文档成功
*
* `source` 用来区分上报来源：所有"上传到腾讯文档成功"统一汇总到该事件，
* 通过 source 区分入口（如 task_result_save 产物上传 / tdoc_lib_upload 资料库上传 等）。
*/
function reportSaveToTdocSuccess(adapter, params) {
	reportElementClick(adapter, {
		elementId: "save_to_tdoc_success",
		elementName: "上传到腾讯文档成功",
		source: params.source
	});
}
/** hover 添加至任务 */
function reportTDocLibAddToTaskHover(adapter) {
	reportElementClick(adapter, {
		elementId: "tdoc_lib_add_to_task_hover",
		elementName: "hover添加至任务",
		pageName: "tdoc_lib",
		mode: "tdocs"
	});
}
/** 批量添加至任务 */
function reportTDocLibAddToTaskBatch(adapter) {
	reportElementClick(adapter, {
		elementId: "tdoc_lib_add_to_task_batch",
		elementName: "批量添加至任务",
		pageName: "tdoc_lib",
		mode: "tdocs"
	});
}
/** 腾讯文档附件添加成功（资料库场景复用） */
function reportAttachTDocSuccess(adapter, pageName, source, type) {
	reportElementClick(adapter, {
		elementId: "attach_tdoc_success",
		elementName: "腾讯文档附件添加成功",
		pageName,
		source,
		type,
		mode: "tdocs"
	});
}
/** 腾讯文档登录授权页展示 */
function reportTDocAuthPageShow(adapter) {
	reportPageShow(adapter, "tdoc_auth_page");
}
/** 从资料库触达授权 */
function reportTDocAuthFromLibrary(adapter) {
	reportElementClick(adapter, {
		elementId: "tdoc_auth_from_library",
		elementName: "从资料库触达授权"
	});
}
/** 从文件选择器触达授权 */
function reportTDocAuthFromFilePicker(adapter) {
	reportElementClick(adapter, {
		elementId: "tdoc_auth_from_file_picker",
		elementName: "从文件选择器触达授权"
	});
}
/** 从文件上传触达授权 */
function reportTDocAuthFromFileUpload(adapter) {
	reportElementClick(adapter, {
		elementId: "tdoc_auth_from_file_upload",
		elementName: "从文件上传触达授权"
	});
}
/** 从连接器触达授权 */
function reportTDocAuthFromConnector(adapter) {
	reportElementClick(adapter, {
		elementId: "tdoc_auth_from_connector",
		elementName: "从连接器触达授权"
	});
}
/** 授权成功 */
function reportTDocAuthSuccess(adapter) {
	reportElementClick(adapter, {
		elementId: "knowledge_base_auth_success",
		elementName: "授权成功",
		type: "tencent_doc"
	});
}
/** 授权失败 */
function reportTDocAuthFail(adapter) {
	reportElementClick(adapter, {
		elementId: "tdoc_auth_fail",
		elementName: "授权失败"
	});
}
/** 解绑腾讯文档账号 */
function reportTDocUnbind(adapter) {
	reportElementClick(adapter, {
		elementId: "tdoc_unbind",
		elementName: "解绑腾讯文档账号"
	});
}
/** 确认解绑 */
function reportTDocUnbindConfirm(adapter) {
	reportElementClick(adapter, {
		elementId: "tdoc_unbind_confirm",
		elementName: "确认解绑"
	});
}
/** B-1: 腾讯文档资料库开通页曝光（管理员） */
function reportTDocActivatePageShowAdmin(adapter) {
	reportPageShow(adapter, "tdoc_activate_admin");
}
/** B-2: 腾讯文档资料库开通页曝光（非管理员） */
function reportTDocActivatePageShowMember(adapter) {
	reportPageShow(adapter, "tdoc_activate_member");
}
/** B-3: 开通页点击「立即开通」（管理员，唤出 OneID 开通弹窗时上报） */
function reportTDocActivateButtonClickAdmin(adapter) {
	reportElementClick(adapter, {
		pageName: "tdoc_activate_admin",
		elementId: "tdoc_activate_btn_admin",
		elementName: "点击立即开通（管理员）"
	});
}
/** B-4: 开通页点击「提醒管理员开通」（非管理员） */
function reportTDocActivateButtonClickMember(adapter) {
	reportElementClick(adapter, {
		pageName: "tdoc_activate_member",
		elementId: "tdoc_activate_btn_member",
		elementName: "点击提醒管理员开通（非管理员）"
	});
}
/**
* B-5: One ID 登录弹窗曝光（管理员）
*
* 截图把 `tdoc_oneid_login_modal_show_admin` 写在 PageName 列、event 为 web_element_show。
* 与乐享同型处理：pageName 收敛到模块级 `tdocs`，把弹窗曝光标识作为 elementId，
* 保证「曝光」与「点击授权」两个事件的 elementId 各自唯一可区分。
*/
function reportTDocOneidLoginModalShowAdmin(adapter) {
	reportElementShow(adapter, {
		pageName: "tdocs",
		elementId: "tdoc_oneid_login_modal_show_admin",
		elementName: "腾讯文档资料库的开通页面，One ID 登录弹窗曝光（管理员）"
	});
}
/**
* B-6: One ID 登录弹窗曝光后，点击授权（管理员）
*
* OneID 官方组件 `OneidAppActivation` 不提供「用户点击授权按钮」的事件回调，
* 实际可观测的最早信号是 `onSuccess`（授权成功）。这里在 onSuccess 触发瞬间上报，
* 业务语义上等价于「用户完成授权」，与截图描述一致；如需严格区分「点击 vs 成功」，
* 需 OneID SDK 暴露中间事件，目前无可行落点（沿用乐享口径）。
*/
function reportTDocOneidLoginAuthClickAdmin(adapter) {
	reportElementClick(adapter, {
		pageName: "tdocs",
		elementId: "tdoc_oneid_login_auth_admin",
		elementName: "腾讯文档资料库的开通页面，One ID 登录授权（管理员）"
	});
}
/**
* B-7: 管理员首次将腾讯文档开通成功（管理员）
*
* 「首次」语义按 enterpriseId + accountUid 维度由调用方持久化（localStorage 标记），
* 同账号 + 同企业再次开通不再重复上报。
*/
function reportTDocActivateSuccessAdminFirst(adapter) {
	reportElementClick(adapter, {
		pageName: "tdocs",
		elementId: "tdoc_activate_success_admin_first",
		elementName: "腾讯文档资料库，管理员首次将腾讯文档开通成功（管理员）"
	});
}
/** B-8: 列表页右上角「…」下拉菜单整体曝光（管理员，菜单打开时上报） */
function reportTDocLibAdminMoreMenuShow(adapter) {
	reportElementShow(adapter, {
		pageName: "tdocs",
		elementId: "tdoc_lib_admin_more_menu_show",
		elementName: "腾讯文档资料库列表页，点击右上角「…」-下拉菜单整体曝光（管理员）"
	});
}
/** B-9: 列表页右上角「…」-「管理后台」（管理员） */
function reportTDocLibAdminConsoleClick(adapter) {
	reportElementClick(adapter, {
		pageName: "tdocs",
		elementId: "tdoc_lib_admin_console",
		elementName: "腾讯文档资料库列表页，点击右上角「…」-管理后台（管理员）"
	});
}
/** B-10: 列表页右上角「…」-「升级版」（管理员 & 免费版） */
function reportTDocLibAdminUpgradeClick(adapter) {
	reportElementClick(adapter, {
		pageName: "tdocs",
		elementId: "tdoc_lib_admin_upgrade",
		elementName: "腾讯文档资料库列表页，点击右上角「…」-升级版（管理员 & 免费版）"
	});
}
var init_telemetry = __esmMin((() => {}));
//#endregion
export { reportTDocLibMoreOpen as A, reportTDocUnbindConfirm as B, reportTDocLibAdminMoreMenuShow as C, reportTDocLibMore as D, reportTDocLibFileOpen as E, reportTDocListMyFile as F, reportTDocListRecent as I, reportTDocOneidLoginAuthClickAdmin as L, reportTDocLibNewFile as M, reportTDocLibSearch as N, reportTDocLibMoreCopyLink as O, reportTDocLibUpload as P, reportTDocOneidLoginModalShowAdmin as R, reportTDocLibAdminConsoleClick as S, reportTDocLibEntry as T, reportTDocAuthFromLibrary as _, reportSaveToTdocConfirm as a, reportTDocLibAddToTaskBatch as b, reportTDocActivateButtonClickAdmin as c, reportTDocActivatePageShowMember as d, reportTDocActivateSuccessAdminFirst as f, reportTDocAuthFromFileUpload as g, reportTDocAuthFromFilePicker as h, reportSaveToTdocBtn as i, reportTDocLibMoreRename as j, reportTDocLibMoreDelete as k, reportTDocActivateButtonClickMember as l, reportTDocAuthFromConnector as m, reportAttachTDocChooser as n, reportSaveToTdocPopShow as o, reportTDocAuthFail as p, reportAttachTDocSuccess as r, reportSaveToTdocSuccess as s, init_telemetry as t, reportTDocActivatePageShowAdmin as u, reportTDocAuthPageShow as v, reportTDocLibAdminUpgradeClick as w, reportTDocLibAddToTaskHover as x, reportTDocAuthSuccess as y, reportTDocUnbind as z };
