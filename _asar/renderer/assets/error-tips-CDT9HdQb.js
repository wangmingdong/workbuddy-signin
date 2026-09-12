import { n as __esmMin } from "./chunk-BRZcfu7K.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { n as __awaiter, p as init_tslib_es6 } from "./tslib.es6-8NkKEYUK.js";
import { $l as init_es, Dl as init_index_interface$2, Iu as WeblogReportKey, Jc as init_core_app_config, Ju as formatStack, Qu as Snackbar, Sl as init_execution_error, Tl as PermissionExplanation, Xc as CoreAppConfigKey, Xu as domainConfig, Yu as logger, Zc as init_index_interface$1, a as init_registry, bl as ErrorCode, i as coreInstantiationService, iu as showModalConfirm, jd as breakWorkSnackbarShow, nd as HostAppType, qc as coreAppConfigService, rd as hostApp, su as showNotAllEditableToast, td as reporter, vl as ISmartSheetCore, wd as i18n, xl as TreatmentType, yl as init_index_interface } from "./execution-result-erkS5q1j.js";
import { n as init_esm, r as ua } from "./esm-mgJiqgJI.js";
//#region ../../node_modules/@tencent/xtable-core/es/constant/execution-result/error-tips.js
function showErrorTipsIfNecessary(error) {
	var _a, _b, _c, _d, _e, _f, _g, _h;
	var { errorCode, errorMessage, type, permissionExplanation } = error;
	var reportData = (_a = ReportConfigs[errorCode]) === null || _a === void 0 ? void 0 : _a.call(ReportConfigs, permissionExplanation);
	reportData && reporter.metricsKVR(reportData);
	var core = coreInstantiationService.invokeFunction((accessor) => accessor.get(ISmartSheetCore));
	var shutdown = (shutdownParams) => {
		var _a, _b;
		(_b = (_a = core.permissionService).shutdown) === null || _b === void 0 || _b.call(_a, shutdownParams);
	};
	if (core.permissionService.getPermissionStatus("isShutdown", void 0)) return;
	switch (type) {
		case TreatmentType.TERMINATE_AND_INFO:
		case TreatmentType.TERMINATE_AND_WARNING:
			if (errorCode === ErrorCode.TABLE_NOT_EDITABLE) {
				showNotAllEditableToast(errorMessage);
				return;
			}
			var modalProps = (_b = ModalTipsConfig[errorCode]) === null || _b === void 0 ? void 0 : _b.call(ModalTipsConfig);
			if (modalProps) {
				showModalConfirm(Object.assign(Object.assign({}, modalProps), {
					okText: i18n.t("ok"),
					cancelText: null
				}));
				break;
			}
			var message = ((_d = (_c = WarningNoticeConfigs[errorCode]) === null || _c === void 0 ? void 0 : _c.call(WarningNoticeConfigs, permissionExplanation)) === null || _d === void 0 ? void 0 : _d.message) || errorMessage;
			breakWorkSnackbarShow(Object.assign(Object.assign({
				testId: "smartsheet-snackbar-terminate-and-warning",
				type: "info"
			}, (_e = WarningNoticeConfigs[errorCode]) === null || _e === void 0 ? void 0 : _e.call(WarningNoticeConfigs, permissionExplanation)), { message: wrapAutoWrap(message) }));
			break;
		case TreatmentType.FATAL_ERROR:
			if (errorCode === ErrorCode.COLLAB) {
				if (hostApp.getType() !== HostAppType.SMART_CANVAS) return shutdown({
					errorCode: "D0001",
					description: JSON.stringify({
						errorCode,
						errorMessage,
						stackChunks: error.stack && formatStack(error.stack)
					})
				});
				breakWorkSnackbarShow({
					type: "info",
					message: i18n.t("collab_error_tip"),
					autoClose: false,
					action: [{
						text: i18n.t("click_to_refresh"),
						onClick: () => __awaiter(this, void 0, void 0, function* () {
							yield new Promise((resolve) => {
								var _a, _b;
								(_b = (_a = window.tdocs) === null || _a === void 0 ? void 0 : _a.forcePopAllPage) === null || _b === void 0 || _b.call(_a, {});
								setTimeout(resolve, 500);
							});
							window.location.reload();
						})
					}]
				});
				return shutdown();
			}
			if (errorCode === ErrorCode.OFFLINE) {
				if (domainConfig.getIsToc()) return;
				return shutdown({
					info: "N0011",
					errorCode: void 0
				});
			}
			var modalProps1 = (_f = ModalTipsConfig[errorCode]) === null || _f === void 0 ? void 0 : _f.call(ModalTipsConfig);
			if (modalProps1) {
				if (hasErrorConfirmShow) break;
				hasErrorConfirmShow = true;
				showModalConfirm(Object.assign(Object.assign({}, modalProps1), {
					okText: i18n.t("ok"),
					cancelText: null,
					closable: false,
					onOk: () => __awaiter(this, void 0, void 0, function* () {
						yield new Promise((resolve) => {
							var _a, _b;
							(_b = (_a = window.tdocs) === null || _a === void 0 ? void 0 : _a.forcePopAllPage) === null || _b === void 0 || _b.call(_a, {});
							setTimeout(resolve, 500);
						});
						window.location.reload();
					})
				}));
				break;
			}
			var errorConfig = (_g = WarningNoticeConfigs[errorCode]) === null || _g === void 0 ? void 0 : _g.call(WarningNoticeConfigs, permissionExplanation);
			var message1 = (errorConfig === null || errorConfig === void 0 ? void 0 : errorConfig.message) || i18n.t("request_run_catch_error");
			if (domainConfig.getIsWeCom()) shutdown({
				info: (_h = errorConfig === null || errorConfig === void 0 ? void 0 : errorConfig.shutDownErrorCode) !== null && _h !== void 0 ? _h : "SS_FATAL_ERROR",
				description: JSON.stringify({
					errorCode,
					errorMessage,
					toastMessage: message1,
					stackChunks: error.stack && formatStack(error.stack)
				}),
				errorCode: void 0
			});
			else {
				shutdown();
				Snackbar.show({
					testId: "smartsheet-snackbar-fatal-error",
					id: TreatmentType.FATAL_ERROR,
					message: message1,
					type: "error",
					zIndex: 19998,
					autoClose: false,
					onClose: () => true,
					action: [{
						text: i18n.t("click_to_refresh"),
						onClick: () => __awaiter(this, void 0, void 0, function* () {
							yield new Promise((resolve) => {
								var _a, _b;
								(_b = (_a = window.tdocs) === null || _a === void 0 ? void 0 : _a.forcePopAllPage) === null || _b === void 0 || _b.call(_a, {});
								setTimeout(resolve, 500);
							});
							window.location.reload();
						})
					}]
				});
			}
			var endTs = Number(/* @__PURE__ */ new Date());
			var startTs = endTs - 1440 * 60 * 1e3;
			logger.report(WeblogReportKey.FATAL_ERROR, {
				startTs,
				endTs
			});
			break;
		default: break;
	}
}
var import_jsx_runtime, hasErrorConfirmShow, wrapAutoWrap, CONTENT_PERMISSION_REPORT, ReportConfigs, ModalTipsConfig, WarningNoticeConfigs;
var init_error_tips = __esmMin((() => {
	init_tslib_es6();
	import_jsx_runtime = require_jsx_runtime();
	init_esm();
	init_es();
	init_execution_error();
	init_index_interface();
	init_registry();
	init_core_app_config();
	init_index_interface$1();
	init_index_interface$2();
	hasErrorConfirmShow = false;
	wrapAutoWrap = (message) => (0, import_jsx_runtime.jsx)("div", Object.assign({ style: {
		whiteSpace: "normal",
		wordBreak: "break-word",
		maxWidth: ua.isPC ? void 0 : "150px"
	} }, { children: message }));
	CONTENT_PERMISSION_REPORT = {
		biz: "wecomDocs",
		itemname: "content_permission_prevent_toast"
	};
	ReportConfigs = {
		[ErrorCode.NO_PERMISSION]: () => Object.assign(Object.assign({}, CONTENT_PERMISSION_REPORT), { Channel1: "content" }),
		[ErrorCode.NO_PERMISSION_TO_FILL_RECORD]: () => Object.assign(Object.assign({}, CONTENT_PERMISSION_REPORT), { Channel1: "content" }),
		[ErrorCode.NO_PERMISSION_TO_INSERT_TABLE]: () => Object.assign(Object.assign({}, CONTENT_PERMISSION_REPORT), { Channel1: "table" }),
		[ErrorCode.NO_PERMISSION_TO_MOVE_VIEW]: () => Object.assign(Object.assign({}, CONTENT_PERMISSION_REPORT), { Channel1: "view" }),
		[ErrorCode.NO_PERMISSION_TO_INSERT_VIEW]: () => Object.assign(Object.assign({}, CONTENT_PERMISSION_REPORT), { Channel1: "view" }),
		[ErrorCode.NO_PERMISSION_TO_EDIT_VIEW_CONFIG]: () => Object.assign(Object.assign({}, CONTENT_PERMISSION_REPORT), { Channel1: "view" }),
		[ErrorCode.NO_PERMISSION_TO_MOVE_RECORD]: (permissionExplanation) => permissionExplanation === PermissionExplanation.EXTERNAL_DATA_SOURCE_RESTRICT ? void 0 : Object.assign(Object.assign({}, CONTENT_PERMISSION_REPORT), { Channel1: "view" }),
		[ErrorCode.NO_PERMISSION_TO_DELETE_VIEW]: () => Object.assign(Object.assign({}, CONTENT_PERMISSION_REPORT), { Channel1: "view" })
	};
	ModalTipsConfig = {
		[ErrorCode.MAXIMUM_FIELD_SIZE_REACHED]: () => ({
			title: i18n.t("field_max_size_reach"),
			content: i18n.t("field_max_size_reach_content", { limit: coreAppConfigService.getConfig()[CoreAppConfigKey.MAXIMUM_FIELD_LIMIT].toLocaleString("en-US") })
		}),
		[ErrorCode.MAXIMUM_FIELD_GROUP_SIZE_REACHED]: () => ({
			title: i18n.t("field_group_max_size_reach"),
			content: i18n.t("field_group_max_size_reach_content", { limit: coreAppConfigService.getConfig()[CoreAppConfigKey.MAXIMUM_FIELD_LIMIT].toLocaleString("en-US") })
		}),
		[ErrorCode.MAXIMUM_RECORD_SIZE_REACHED]: () => ({
			title: i18n.t("record_max_size_reach"),
			content: i18n.t("record_max_size_reach_content", { limit: coreAppConfigService.getConfig()[CoreAppConfigKey.MAXIMUM_RECORD_LIMIT].toLocaleString("en-US") })
		}),
		[ErrorCode.MAXIMUM_CELL_SIZE_REACHED]: () => ({
			title: i18n.t("cell_max_size_reach"),
			content: i18n.t("cell_max_size_reach_content", { limit: (coreAppConfigService.getConfig()[CoreAppConfigKey.MAXIMUM_CELL_LIMIT] / 1e4).toLocaleString("en-US") })
		})
	};
	WarningNoticeConfigs = {
		[ErrorCode.PRIMARY_FIELD_CAN_NOT_DELETE]: () => ({ message: i18n.t("delete_include_primary_field") }),
		[ErrorCode.MAXIMUM_FIELD_SIZE_REACHED]: () => ({ message: i18n.t("field_max_size_reach", { field: coreAppConfigService.getConfig()[CoreAppConfigKey.MAXIMUM_FIELD_LIMIT] }) }),
		[ErrorCode.MAXIMUM_RECORD_SIZE_REACHED]: () => ({ message: i18n.t("record_max_size_reach", { field: coreAppConfigService.getConfig()[CoreAppConfigKey.MAXIMUM_RECORD_LIMIT] }) }),
		[ErrorCode.MAXIMUM_CELL_SIZE_REACHED]: () => ({ message: i18n.t("cell_max_size_reach", { field: coreAppConfigService.getConfig()[CoreAppConfigKey.MAXIMUM_CELL_LIMIT] }) }),
		[ErrorCode.MAXIMUM_VIEW_SIZE_REACHED]: () => ({ message: i18n.t("view_max_size_reach", { view: coreAppConfigService.getConfig()[CoreAppConfigKey.MAXIMUM_VIEW_LIMIT] }) }),
		[ErrorCode.MAXIMUM_PASTE_CELL_REACHED]: () => ({ message: i18n.t("paste_max_cell_reach", { view: coreAppConfigService.getConfig()[CoreAppConfigKey.MAXIMUM_PASTE_CELL_LIMIT] }) }),
		[ErrorCode.NO_PERMISSION]: () => ({ message: i18n.t("no_permission") }),
		[ErrorCode.NO_PERMISSION_TO_INSERT_TABLE]: () => ({ message: i18n.t("no_permission_to_insert_table") }),
		[ErrorCode.NO_PERMISSION_TO_INSERT_VIEW]: () => ({ message: i18n.t("no_permission_to_create_view") }),
		[ErrorCode.NO_PERMISSION_TO_MOVE_VIEW]: () => ({ message: i18n.t("no_permission_to_move_view") }),
		[ErrorCode.NO_PERMISSION_TO_DELETE_VIEW]: () => ({ message: i18n.t("no_permission_to_delete_view") }),
		[ErrorCode.MAXIMUM_TABLE_SIZE_REACHED]: () => ({ message: i18n.t("table_max_size_reach", { table: coreAppConfigService.getConfig()[CoreAppConfigKey.MAXIMUM_TABLE_LIMIT] }) }),
		[ErrorCode.REQUEST_MAP_NOT_LOADED]: () => ({ message: i18n.t("data_loading") }),
		[ErrorCode.APP_NOT_EDITABLE]: () => ({ message: i18n.t("data_loading") }),
		[ErrorCode.TABLE_LOADING]: () => ({ message: i18n.t("table_loading") }),
		[ErrorCode.ID_DUPLICATED]: () => ({ message: i18n.t("operation_invalid") }),
		[ErrorCode.INDEX_INVALID]: () => ({ message: i18n.t("operation_invalid") }),
		[ErrorCode.NOT_EXIST]: () => ({ message: i18n.t("refresh_and_try") }),
		[ErrorCode.ARGS_EMPTY]: () => ({ message: i18n.t("operation_invalid") }),
		[ErrorCode.CAPACITY_EXCEEDED]: () => ({ message: i18n.t("capacity_exceeded") }),
		[ErrorCode.PRIMARY_FIELD_CAN_NOT_MOVE]: () => ({ message: i18n.t("cannot_move_primary_field") }),
		[ErrorCode.IS_NOT_PRIMARY_FIELD_TYPES]: () => ({ message: i18n.t("is_not_primary_field_types") }),
		[ErrorCode.VIEW_NOT_SUPPORT_GROUP]: () => ({ message: i18n.t("view_not_support_group") }),
		[ErrorCode.FIELD_NOT_SUPOORT_OPTION_GROUP]: () => ({ message: i18n.t("field_not_support_option_group") }),
		[ErrorCode.FIELD_WIDTH_ILLEGAL]: () => ({ message: i18n.t("operation_invalid") }),
		[ErrorCode.FIELD_STAT_VALUE_ILLEGAL]: () => ({ message: i18n.t("operation_invalid") }),
		[ErrorCode.FROZEN_FIELD_COUNT_ILLEGAL]: () => ({ message: i18n.t("operation_invalid") }),
		[ErrorCode.ROW_HEIGHT_LEVEL_ILLEGAL]: () => ({ message: i18n.t("operation_invalid") }),
		[ErrorCode.VIEW_NOT_SUPPORT_FROZEN_FIELD_COUNT]: () => ({ message: i18n.t("view_not_support_frozen_field_count") }),
		[ErrorCode.AT_LEAST_ONE_VIEW]: () => ({
			message: i18n.t("at_least_one_view"),
			shutDownErrorCode: "SS_EXPECTED_FIX"
		}),
		[ErrorCode.NO_PERMISSION_TO_MOVE_RECORD]: (permissionExplanation) => {
			var _a;
			return (_a = { [PermissionExplanation.EXTERNAL_DATA_SOURCE_RESTRICT]: { message: i18n.t("no_permission_to_move_group_record_external_restrict") } }[permissionExplanation]) !== null && _a !== void 0 ? _a : {
				message: i18n.t("no_permission_to_move_record"),
				action: domainConfig.getIsWeCom() && !ua.isMobile ? i18n.t("view_setting") : void 0,
				onClickAction: () => {
					var _a, _b;
					(_b = (_a = coreInstantiationService.invokeFunction((accessor) => accessor.get(ISmartSheetCore)).permissionService).viewPermissionSetting) === null || _b === void 0 || _b.call(_a);
				}
			};
		},
		[ErrorCode.NO_PERMISSION_TO_EDIT_VIEW_CONFIG]: () => ({
			message: i18n.t("no_permission_to_edit_view_config"),
			action: domainConfig.getIsWeCom() && !ua.isMobile ? i18n.t("view_setting") : void 0,
			onClickAction: () => {
				var _a, _b;
				(_b = (_a = coreInstantiationService.invokeFunction((accessor) => accessor.get(ISmartSheetCore)).permissionService).viewPermissionSetting) === null || _b === void 0 || _b.call(_a);
			}
		}),
		[ErrorCode.NO_PERMISSION_TO_EDIT_FIELD_GROUP]: () => ({
			message: i18n.t("no_permission_to_edit_field_group"),
			action: domainConfig.getIsWeCom() && !ua.isMobile ? i18n.t("view_setting") : void 0,
			onClickAction: () => {
				var _a, _b;
				(_b = (_a = coreInstantiationService.invokeFunction((accessor) => accessor.get(ISmartSheetCore)).permissionService).viewPermissionSetting) === null || _b === void 0 || _b.call(_a);
			}
		}),
		[ErrorCode.NO_PERMISSION_TO_FILL_RECORD]: () => ({
			action: domainConfig.getIsWeCom() && !ua.isMobile ? i18n.t("view_setting") : void 0,
			onClickAction: () => {
				var _a, _b;
				(_b = (_a = coreInstantiationService.invokeFunction((accessor) => accessor.get(ISmartSheetCore)).permissionService).viewPermissionSetting) === null || _b === void 0 || _b.call(_a);
			}
		}),
		[ErrorCode.INSERT_VIEW_OWNER_EMPTY]: () => ({ message: i18n.t("operation_invalid") }),
		[ErrorCode.PASTE_RANGE_INVALID]: () => ({ message: i18n.t("reselect_paste_area") }),
		[ErrorCode.NO_PERMISSION_TO_SET_PRIMARY_FIELD]: () => {
			var isToB = domainConfig.getIsWeCom() || domainConfig.getIsPrivateToc();
			return {
				message: i18n.t(isToB ? "no_permission_to_set_primary_field" : "no_permission_to_set_primary_field_toc"),
				action: domainConfig.getIsWeCom() && !ua.isMobile ? i18n.t("view_setting") : void 0,
				onClickAction: () => {
					var _a, _b;
					(_b = (_a = coreInstantiationService.invokeFunction((accessor) => accessor.get(ISmartSheetCore)).permissionService).viewPermissionSetting) === null || _b === void 0 || _b.call(_a);
				}
			};
		},
		[ErrorCode.NO_PERMISSION_TO_COPY_FORMULA_FIELD]: () => ({ message: i18n.t("no_permission_to_copy_formula_field") })
	};
}));
//#endregion
export { showErrorTipsIfNecessary as n, init_error_tips as t };
