import { n as __esmMin } from "./chunk-BRZcfu7K.js";
import { $l as init_es, Qs as BaseSelectField, Rr as isSupportGroupPath, Tl as PermissionExplanation, Vl as ViewType, td as reporter, uo as isFieldSupportEditGroup, wd as i18n } from "./execution-result-erkS5q1j.js";
import { n as init_esm, r as ua } from "./esm-mgJiqgJI.js";
import { Rt as canInsertRecordInGroup, t as init_es$1 } from "./es-BQsslXL1.js";
import { A as Status, j as init_base_status, vt as init_style, yt as style } from "./canvas-view-DDuMsrmC.js";
//#region ../../node_modules/@tencent/xtable-view/es/plugins/status/groupable-status.js
function _defineProperties(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, descriptor.key, descriptor);
	}
}
function _create_class(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties(Constructor, staticProps);
	return Constructor;
}
function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of(subClass, superClass);
}
function _set_prototype_of(o, p) {
	_set_prototype_of = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of(o, p);
}
var EditGroupRejectReason, GroupableStatus;
var init_groupable_status = __esmMin((() => {
	init_es$1();
	init_base_status();
	(function(EditGroupRejectReason) {
		EditGroupRejectReason["NO_GROUP_FIELD"] = "NO_GROUP_FIELD";
		EditGroupRejectReason["NOT_SUPPORT_FILED"] = "NOT_SUPPORT_FIELD";
		EditGroupRejectReason["CANNOT_EDIT_FIELD_CONFIG"] = "CANNOT_EDIT_FIELD_CONFIG";
		EditGroupRejectReason["CANNOT_EDIT_FIELD"] = "CANNOT_EDIT_FIELD";
		EditGroupRejectReason["CANNOT_INSERT_RECORD"] = "CANNOT_INSERT_RECORD";
		EditGroupRejectReason["FIELD_RESTRICTION"] = "FIELD_RESTRICTION";
		EditGroupRejectReason["CANNOT_INSERT_GROUP"] = "CANNOT_INSERT_GROUP";
	})(EditGroupRejectReason || (EditGroupRejectReason = {}));
	GroupableStatus = /* @__PURE__ */ function(Status) {
		"use strict";
		_inherits(GroupableStatus, Status);
		function GroupableStatus() {
			return Status.apply(this, arguments) || this;
		}
		var _proto = GroupableStatus.prototype;
		_proto.getCanEditGroup = function getCanEditGroup(groupField = this.groupFields[0]) {
			return !this.getShouldDisableGroupEdit(groupField) && !this.getShouldHideGroupEdit(groupField);
		};
		/**
		* @description 需要隐藏的情况： 1.非可编辑分组列类型 2.列类型能力限制
		* @param {IField} groupField
		*/ _proto.getShouldHideGroupEdit = function getShouldHideGroupEdit(groupField = this.groupFields[0]) {
			var checkCanEditGroupResult = this.checkCanEditGroup(groupField);
			if (checkCanEditGroupResult.pass) return false;
			return [EditGroupRejectReason.NO_GROUP_FIELD, EditGroupRejectReason.NOT_SUPPORT_FILED].includes(checkCanEditGroupResult.reason);
		};
		/**
		* @description 需要置灰的情况：无编辑权限
		* @param {IField} groupField
		*/ _proto.getShouldDisableGroupEdit = function getShouldDisableGroupEdit(groupField = this.groupFields[0]) {
			var checkCanEditGroupResult = this.checkCanEditGroup(groupField);
			if (checkCanEditGroupResult.pass) return false;
			return [
				EditGroupRejectReason.NO_GROUP_FIELD,
				EditGroupRejectReason.CANNOT_EDIT_FIELD_CONFIG,
				EditGroupRejectReason.FIELD_RESTRICTION,
				EditGroupRejectReason.CANNOT_EDIT_FIELD
			].includes(checkCanEditGroupResult.reason);
		};
		/**
		* @description 需要隐藏的情况： 1.非可编辑分组列类型 2.列类型能力限制 3. 不能新增记录
		* @param {IField} groupField
		*/ _proto.getShouldHideGroupInsert = function getShouldHideGroupInsert(groupField = this.groupFields[0]) {
			return !this.getPermissionStatus("canInsertRecord", {}) || this.getShouldHideGroupEdit(groupField);
		};
		/**
		* @description 需要置灰的情况：无新增分组权限
		* @param {IField} groupField
		*/ _proto.getShouldDisableGroupInsert = function getShouldDisableGroupInsert() {
			var checkCanInsertGroupResult = this.checkCanInsertGroup();
			if (checkCanInsertGroupResult.pass) return false;
			return [EditGroupRejectReason.CANNOT_INSERT_GROUP].includes(checkCanInsertGroupResult.reason);
		};
		_proto.checkCanEditGroup = function checkCanEditGroup(groupField = this.groupFields[0]) {
			if (!groupField) return {
				pass: false,
				reason: EditGroupRejectReason.NO_GROUP_FIELD
			};
			if (!isFieldSupportEditGroup(groupField.type)) return {
				pass: false,
				reason: EditGroupRejectReason.NOT_SUPPORT_FILED
			};
			if (BaseSelectField.isSelectField(groupField)) {
				var fieldRestriction = this.getFieldRestriction(groupField.getId());
				if (!(fieldRestriction === null || fieldRestriction === void 0 ? void 0 : fieldRestriction.canEditFieldConfig)) return {
					pass: false,
					reason: EditGroupRejectReason.FIELD_RESTRICTION
				};
				var canEditFieldConfig = this.getPermissionStatus("canEditFieldConfig", { fieldId: groupField.getId() });
				return {
					pass: !!(fieldRestriction === null || fieldRestriction === void 0 ? void 0 : fieldRestriction.canEditFieldConfig) && canEditFieldConfig,
					reason: EditGroupRejectReason.CANNOT_EDIT_FIELD_CONFIG
				};
			}
			return {
				pass: this.getPermissionStatus("canEditField", { fieldId: groupField.getId() }),
				reason: EditGroupRejectReason.CANNOT_EDIT_FIELD
			};
		};
		_proto.checkCanInsertGroup = function checkCanInsertGroup(groupField = this.groupFields[0]) {
			if (!groupField) return { pass: true };
			var fieldRestriction = this.getFieldRestriction(groupField.getId());
			if (!(fieldRestriction === null || fieldRestriction === void 0 ? void 0 : fieldRestriction.canEditFieldConfig)) return {
				pass: false,
				reason: EditGroupRejectReason.FIELD_RESTRICTION
			};
			var explanation = this.getPermissionExplanation("explainInsertGroup", {});
			return {
				pass: explanation === PermissionExplanation.ALLOW,
				reason: explanation === PermissionExplanation.EXTERNAL_DATA_SOURCE_RESTRICT ? EditGroupRejectReason.FIELD_RESTRICTION : EditGroupRejectReason.CANNOT_INSERT_GROUP
			};
		};
		_create_class(GroupableStatus, [
			{
				key: "canEditGroupFields",
				get: function() {
					return this.groupFields.every((field) => this.getPermissionStatus("canEditField", { fieldId: field.getId() }));
				}
			},
			{
				key: "canInsertGroup",
				get: function() {
					return this.checkCanInsertGroup().pass;
				}
			},
			{
				key: "canInsertRecordInGroup",
				get: function() {
					return this.getPermissionStatus("canInsertRecord", {}) && canInsertRecordInGroup(this.core.permissionService, this.groupFields, this.table.id);
				}
			},
			{
				key: "canEditGroup",
				get: function() {
					return this.getCanEditGroup();
				}
			},
			{
				key: "groupFields",
				get: function() {
					var _a;
					var { view } = this;
					if (!view || !isSupportGroupPath(view)) return [];
					return (_a = view === null || view === void 0 ? void 0 : view.getGroupFields()) !== null && _a !== void 0 ? _a : [];
				}
			},
			{
				key: "canEditGroupFieldWhenInsertRecord",
				get: function() {
					return this.groupFields.every((field) => this.getPermissionStatus("canEditFieldOnlyWhenInsertRecord", { fieldId: field.getId() }) || this.getPermissionStatus("canEditField", { fieldId: field.getId() }));
				}
			}
		]);
		return GroupableStatus;
	}(Status);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/plugins/report/production/index.js
var GridProductReport, KanbanGalleryProductReport, ProductReport, productReport;
var init_production = __esmMin((() => {
	init_es();
	init_es$1();
	GridProductReport = /* @__PURE__ */ function() {
		"use strict";
		function GridProductReport() {}
		var _proto = GridProductReport.prototype;
		/**
		* 上报移动列操作成功
		*/ _proto.fileMoveSuccess = function fileMoveSuccess() {
			reporter.metricsTdw({
				action: "move_col",
				module: "col"
			});
		};
		/**
		* 上报移动行操作成功
		*/ _proto.recordMoveSuccess = function recordMoveSuccess() {
			reporter.metricsTdw({
				action: "mov_record",
				module: "record"
			});
		};
		/**
		* 表格和甘特上报展开行
		*/ _proto.recordExpanded = function recordExpanded() {
			reporter.metricsTdw({
				action: "expand_record",
				module: "record"
			});
		};
		/**
		* 上报展开行, 所有视图
		*/ _proto.recordExpandedAllViewType = function recordExpandedAllViewType(viewTypeName) {
			reporter.metricsKVR({
				biz: "wecomDocs",
				itemname: "smartsheet_record_show",
				Channel2: viewTypeName
			});
		};
		/**
		* 上报选中行
		*/ _proto.recordSelected = function recordSelected() {
			reporter.metricsTdw({
				action: "check_record",
				module: "record"
			});
		};
		/**
		* 上报选中行（快捷键 shift 批量选中）
		*/ _proto.recordBatchSelected = function recordBatchSelected() {
			reporter.metricsTdw({
				action: "shift_record",
				module: "record"
			});
		};
		/**
		* 上报显示协作者选中提示
		*/ _proto.showCollaboratorSelect = function showCollaboratorSelect() {
			reporter.metricsTdw({
				action: "select_hover_tag",
				module: "co-edit"
			});
		};
		/**
		* 上报显示协作者编辑提示
		*/ _proto.showCollaboratorEdit = function showCollaboratorEdit() {
			reporter.metricsTdw({
				action: "edit_hover_tag",
				module: "co-edit"
			});
		};
		/**
		* 智能填充单元格成功
		* @param fieldType
		*/ _proto.smartFillSuccess = function smartFillSuccess(fieldType) {
			reporter.metricsTdw({
				action: "fill",
				module: "record",
				ver5: fieldType
			});
		};
		/**
		* 浮层显示
		* @param action
		*/ _proto.showFloatLayer = function showFloatLayer(action) {
			reporter.metricsTdw({
				action,
				module: "record"
			});
		};
		return GridProductReport;
	}();
	KanbanGalleryProductReport = /* @__PURE__ */ function() {
		"use strict";
		function KanbanGalleryProductReport() {
			/**
			* 看板卡片相关的
			*/ this.addCard = (viewType) => {
				this.report("add_card", viewType);
			};
			/**
			* 点击卡片
			*/ this.clickCard = (viewType) => {
				this.report("cli_card", viewType);
			};
			/**
			* 拖拽卡片
			*/ this.moveCard = (viewType) => {
				this.report("move_card", viewType);
			};
			/**
			* 复制卡片
			*/ this.copyCard = (viewType) => {
				this.report("copy_card", viewType);
			};
			/**
			* 展开卡片
			*/ this.expandCard = (viewType) => {
				this.report("expand_card", viewType);
			};
			/**
			* 向左插入卡片
			*/ this.insertLastCard = (viewType) => {
				this.report("insert_last_card", viewType);
			};
			/**
			* 向右插入卡片
			*/ this.insertNextCard = (viewType) => {
				this.report("insert_next_card", viewType);
			};
			/**
			* 删除卡片
			*/ this.delCard = (viewType) => {
				this.report("del_card", viewType);
			};
			/**
			* 点击分组依据入口
			*/ this.clickGroupByBtn = (viewType) => {
				this.report("group", viewType);
			};
			/**
			* 点击列设置
			*/ this.clickColSetting = (viewType) => {
				this.report("col_setting", viewType);
			};
			/**
			* 点击显示字段名称
			*/ this.clickShowFieldTitle = (viewType) => {
				this.report("col_name", viewType);
			};
			/**
			* 点击切换封面
			*/ this.clickSwitchCover = (viewType) => {
				this.report("cover", viewType);
			};
			/**
			* 添加分组
			*/ this.addGroup = (viewType) => {
				this.report("add_group", viewType);
			};
			/**
			* 折叠分组
			*/ this.foldGroup = (viewType) => {
				this.report("fold_group", viewType);
			};
			/**
			* 展开分组
			*/ this.unFoldGroup = (viewType) => {
				this.report("unfold_group", viewType);
			};
			/**
			* 删除分组
			*/ this.deleteGroup = (viewType) => {
				this.report("del_group", viewType);
			};
			/**
			* 重命名分组
			*/ this.renameGroup = (viewType) => {
				this.report("rename_group", viewType);
			};
			this.report = (action, viewType) => {
				var moduleName = ViewType[viewType];
				reporter.metricsTdw({
					action,
					module: moduleName.toLowerCase()
				});
			};
		}
		var _proto = KanbanGalleryProductReport.prototype;
		_proto.toggleLike = function toggleLike(viewType) {
			reporter.metricsTdw({
				module: "co-edit",
				action: "like",
				ver5: viewType === ViewType.GALLERY ? 3 : 2
			});
		};
		return KanbanGalleryProductReport;
	}();
	ProductReport = function ProductReport() {
		"use strict";
		this.grid = new GridProductReport();
		this.kanbanGallery = new KanbanGalleryProductReport();
	};
	productReport = new ProductReport();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/shared/utils/scroll-info.js
function getScrollTipInfo(position, targetRect) {
	var hoverTip = i18n.t("左右滑动查看（{{shortcut}}+鼠标滚轮）", { shortcut: ua.isMac ? "⇧" : "shift" });
	var { size, marginEdge } = style.consts.scrollBarStyle;
	return {
		hoverTip,
		tipRect: {
			x: position.x,
			y: position.y - size - marginEdge,
			width: targetRect.width,
			height: size
		}
	};
}
var init_scroll_info = __esmMin((() => {
	init_esm();
	init_es();
	init_style();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/shared/utils/fix-scroll-delta.js
function fixScrollDelta(delta, offset, scrollSize, viewSize, scrollFactor = 3) {
	if (delta === 0) return 0;
	delta = scrollFactor === 1 ? delta : Math.round(delta / scrollFactor);
	if (scrollSize === Infinity) return delta;
	if (scrollSize < viewSize) return 0;
	if (offset + delta < 0) return -offset;
	if (offset + delta + viewSize > scrollSize) return scrollSize - viewSize - offset;
	return delta;
}
var init_fix_scroll_delta = __esmMin((() => {}));
//#endregion
export { init_production as a, init_groupable_status as c, init_scroll_info as i, init_fix_scroll_delta as n, productReport as o, getScrollTipInfo as r, GroupableStatus as s, fixScrollDelta as t };
