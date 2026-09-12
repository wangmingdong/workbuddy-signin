import { n as __esmMin } from "./chunk-BRZcfu7K.js";
import { $l as init_es, $u as dom, Xu as domainConfig, dn as normalizeLeafChildrenToRecordIds, un as isFormattedTreeNode } from "./execution-result-erkS5q1j.js";
import { t as init_es$1 } from "./es-BQsslXL1.js";
import { B as init_feature_single, R as BaseFeature } from "./canvas-view-DDuMsrmC.js";
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/collector/interface.js
var RowType;
var init_interface = __esmMin((() => {
	(function(RowType) {
		RowType["Spacing"] = "Spacing";
		RowType["Stat"] = "Stat";
		RowType["GroupHead"] = "GroupHead";
		RowType["GroupFoot"] = "GroupFoot";
		RowType["Record"] = "Record";
		RowType["RecordRange"] = "RecordRange";
		RowType["RecordAdd"] = "RecordAdd";
		RowType["GroupAdd"] = "GroupAdd";
		RowType["GroupStat"] = "GroupStat";
	})(RowType || (RowType = {}));
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/utils/string-group-path.js
var stringifyGroupPath;
var init_string_group_path = __esmMin((() => {
	stringifyGroupPath = (groupPath) => {
		if (!groupPath || groupPath.length === 1 && groupPath[0] === null) return JSON.stringify(null);
		return String(groupPath);
	};
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/collector/structure/helpers/run-group.js
function runGroupTree(status, state, rowInfos, handler, trees, level, parent = { headIndex: -1 }) {
	var _a;
	var treeLength = trees.length;
	var parentGroup = parent.group;
	var parentHeadIndex = parent.headIndex;
	var isEndRecordTree = false;
	var recordRangeStartIndex = -1;
	var recordRangeLength = 0;
	var firstTree = trees[0];
	if (typeof firstTree === "string" || firstTree !== void 0 && !isFormattedTreeNode(firstTree)) {
		var recordIds = normalizeLeafChildrenToRecordIds(trees);
		recordRangeStartIndex = handler(RowType.RecordRange, parentHeadIndex, { recordIds });
		recordRangeLength = recordIds.length;
		isEndRecordTree = true;
	} else trees.forEach((tree, index) => {
		if (typeof tree !== "object" || !isFormattedTreeNode(tree)) return;
		var currentLevel = tree.level || level;
		var groupFieldId = tree.field.getId();
		var groupHeadIndex = handler(RowType.GroupHead, parentHeadIndex, {
			level: currentLevel,
			headInfo: {
				groupValue: tree.value,
				count: tree.count,
				path: tree.path,
				fold: state.isGroupFold(tree.path)
			}
		});
		if (tree.children.length) runGroupTree(status, state, rowInfos, handler, tree.children, currentLevel, {
			treeLength,
			group: groupFieldId,
			treeIndex: index,
			headIndex: groupHeadIndex
		});
	});
	if (isEndRecordTree) {
		var recordAddIndex = handler(RowType.RecordAdd, parentHeadIndex);
		setGroupHeadStickyEnd(rowInfos, parentHeadIndex, recordAddIndex !== -1 ? recordAddIndex : recordRangeStartIndex + recordRangeLength - 1);
	} else if (parentGroup) setGroupHeadStickyEnd(rowInfos, parentHeadIndex, handler(RowType.GroupFoot, parentHeadIndex));
	if (!((parent.treeLength && parent.treeLength - 1) === parent.treeIndex)) {
		handler(RowType.Spacing, ((_a = rowInfos.get(parentHeadIndex)) === null || _a === void 0 ? void 0 : _a.parent) || -1);
		return;
	}
	if (parentHeadIndex === -1 && !status.getShouldHideGroupInsert() && !domainConfig.getIsWb()) {
		handler(RowType.Spacing, -1);
		handler(RowType.GroupAdd, -1);
	}
}
/**
* 将本分组的 sticky 尾锚行 index 回填到 parentHeadIndex 对应的 GroupHeadRowInfo 上。
* 仅在该 GroupHead 存在且尚未设置时回填，避免被后续外层递归覆盖。
*/ function setGroupHeadStickyEnd(rowInfos, headIndex, endIndex) {
	if (headIndex < 0 || endIndex < 0) return;
	var headRowInfo = rowInfos.get(headIndex);
	if ((headRowInfo === null || headRowInfo === void 0 ? void 0 : headRowInfo.type) === RowType.GroupHead && headRowInfo.stickyEndIndex === void 0) headRowInfo.stickyEndIndex = endIndex;
}
function runGroupFlatten(state, dataUtil, rowInfos, handler, groupInfos) {
	groupInfos.forEach((groupInfo, groupInfoIndex) => {
		var { path, values, recordIds } = groupInfo;
		var records = recordIds.length;
		var headIndex = handler(RowType.GroupHead, -1, {
			level: 0,
			headInfo: {
				count: records,
				path,
				groupValue: values,
				fold: state.isGroupFold(path)
			}
		});
		if (dataUtil.isFieldStatEnabled()) handler(RowType.Stat, headIndex);
		handler(RowType.RecordRange, headIndex, { recordIds });
		setGroupHeadStickyEnd(rowInfos, headIndex, handler(RowType.GroupFoot, headIndex));
		if (groupInfoIndex !== groupInfos.length - 1) handler(RowType.Spacing, -1);
	});
}
var init_run_group = __esmMin((() => {
	init_es();
	init_es$1();
	init_interface();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/shared/features/storage-sync.js
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
var StorageSync;
var init_storage_sync = __esmMin((() => {
	init_es();
	init_feature_single();
	StorageSync = /* @__PURE__ */ function(BaseFeature) {
		"use strict";
		_inherits(StorageSync, BaseFeature);
		function StorageSync() {
			var _this = BaseFeature.apply(this, arguments) || this;
			_this.hasClickOutsideSync = false;
			_this.visibilitychange = () => {
				if (document.visibilityState === "hidden") _this.syncToStorage();
			};
			_this.onBeforeunload = (event) => {
				_this.syncToStorage();
				event.returnValue = "";
			};
			_this.onDocumentMouseDown = (evt) => {
				if (evt.target.isOutStage && !_this.hasClickOutsideSync) {
					_this.syncToStorage();
					_this.hasClickOutsideSync = true;
					return;
				}
				_this.hasClickOutsideSync = false;
			};
			return _this;
		}
		var _proto = StorageSync.prototype;
		_proto.bootstrap = function bootstrap() {
			this.register(dom.addDisposableListener(window, "beforeunload", this.onBeforeunload));
			this.register(dom.addDisposableListener(document, "visibilitychange", this.visibilitychange));
			this._register(this.UIEvent.document.onMouseDown(this.onDocumentMouseDown));
		};
		_proto.render = function render() {};
		_proto.register = function register(t) {
			if (!t) return;
			return this._register(t);
		};
		return StorageSync;
	}(BaseFeature);
}));
//#endregion
export { runGroupTree as a, RowType as c, runGroupFlatten as i, init_interface as l, init_storage_sync as n, init_string_group_path as o, init_run_group as r, stringifyGroupPath as s, StorageSync as t };
