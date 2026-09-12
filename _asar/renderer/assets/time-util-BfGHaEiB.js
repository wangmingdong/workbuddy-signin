import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { n as __awaiter, o as __metadata, p as init_tslib_es6, r as __decorate } from "./tslib.es6-8NkKEYUK.js";
import { Dn as require_main, Sn as init_module, _n as Emitter, kn as createDecorator, vn as init_event, xn as require_dayjs_min } from "./esm-cVQVEiWG.js";
import { $l as init_es, Cu as OptionStyle, Hu as globalVar, Xc as CoreAppConfigKey, _d as debounceHighPriority, hi as TimeBarColorType, lu as mergeArr, qc as coreAppConfigService, ql as FieldType } from "./execution-result-erkS5q1j.js";
import { c as require_cloneDeep } from "./merge-vXYl4M0x.js";
import { t as init_es$1 } from "./es-BQsslXL1.js";
//#region ../../node_modules/@tencent/xtable-view/es/plugins/range-model/index.interface.js
var SelectionType, SelectedRowValue, NotifySourceType;
var init_index_interface = __esmMin((() => {
	init_module();
	(function(SelectionType) {
		SelectionType[SelectionType["EMPTY_SELECTION"] = 1] = "EMPTY_SELECTION";
		SelectionType[SelectionType["ROW_SELECTION"] = 2] = "ROW_SELECTION";
		SelectionType[SelectionType["COLUMN_SELECTION"] = 3] = "COLUMN_SELECTION";
		SelectionType[SelectionType["RANGE_SELECTION"] = 4] = "RANGE_SELECTION";
	})(SelectionType || (SelectionType = {}));
	(function(SelectedRowValue) {
		SelectedRowValue[SelectedRowValue["UNSELECTED"] = 0] = "UNSELECTED";
		SelectedRowValue[SelectedRowValue["SELECTED"] = 1] = "SELECTED";
	})(SelectedRowValue || (SelectedRowValue = {}));
	(function(NotifySourceType) {
		NotifySourceType[NotifySourceType["MEETING"] = 1] = "MEETING";
		NotifySourceType[NotifySourceType["OTHERS"] = 2] = "OTHERS";
		NotifySourceType[NotifySourceType["RECALCULATE"] = 3] = "RECALCULATE";
		NotifySourceType[NotifySourceType["RENDER_DESTROY"] = 4] = "RENDER_DESTROY";
		NotifySourceType[NotifySourceType["SWITCH_SHEET"] = 5] = "SWITCH_SHEET";
		NotifySourceType[NotifySourceType["CLICK_OUTSIDE_CANVAS"] = 6] = "CLICK_OUTSIDE_CANVAS";
		NotifySourceType[NotifySourceType["LITE_TABLE_SEARCH"] = 7] = "LITE_TABLE_SEARCH";
		NotifySourceType[NotifySourceType["SHORTCUT_EXTEND"] = 8] = "SHORTCUT_EXTEND";
	})(NotifySourceType || (NotifySourceType = {}));
	createDecorator("IRangeModel");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/plugins/range-model/base-selection/index.js
var BaseSelection;
var init_base_selection = __esmMin((() => {
	BaseSelection = /* @__PURE__ */ function() {
		"use strict";
		function BaseSelection(activeView) {
			this.activeView = activeView;
			/**
			* 是否行选择
			*/ this.isRowSelected = false;
			/**
			* 是否全选
			*/ this.isColumnSelected = false;
			/**
			* 是否分区选择：包含选择列（转为范围选区）、部分选区
			*/ this.isRangeSelected = false;
			/**
			* 是否空选区
			*/ this.isEmptySelected = false;
			/**
			* 选区中的激活点
			*/ this.activePoint = null;
		}
		var _proto = BaseSelection.prototype;
		_proto.isEmptySelection = function isEmptySelection() {
			return this.isEmptySelected;
		};
		_proto.isRowSelection = function isRowSelection() {
			return this.isRowSelected;
		};
		_proto.isColumnSelection = function isColumnSelection() {
			return this.isColumnSelected;
		};
		_proto.isRangeSelection = function isRangeSelection() {
			return this.isRangeSelected;
		};
		_proto.getActivePoint = function getActivePoint() {
			return this.activePoint;
		};
		_proto.resetRanges = function resetRanges() {
			this.selected = null;
			this.setActivePoint(null);
		};
		_proto.setActivePoint = function setActivePoint(activePoint) {
			this.activePoint = activePoint;
		};
		_proto.getCurrentView = function getCurrentView() {
			return this.activeView;
		};
		return BaseSelection;
	}();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/plugins/range-model/utils.js
/**
* 生成连续的 ranges
* @param intArray
*/ function generateConsecutiveRanges(intArray) {
	return intArray.reduce((ranges, value, index) => {
		var _a;
		if (value === SelectedRowValue.UNSELECTED) return ranges;
		var lastIndex = ranges.length - 1;
		if (((_a = ranges[lastIndex]) === null || _a === void 0 ? void 0 : _a.end) !== index - 1) {
			ranges.push({
				start: index,
				end: index
			});
			return ranges;
		}
		ranges[lastIndex].end = index;
		return ranges;
	}, []);
}
var init_utils = __esmMin((() => {
	init_index_interface();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/plugins/range-model/dimension-selection/index.js
function _inherits$5(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$5(subClass, superClass);
}
function _set_prototype_of$5(o, p) {
	_set_prototype_of$5 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$5(o, p);
}
var DimensionSelection;
var init_dimension_selection = __esmMin((() => {
	init_base_selection();
	init_index_interface();
	init_utils();
	DimensionSelection = /* @__PURE__ */ function(BaseSelection) {
		"use strict";
		_inherits$5(DimensionSelection, BaseSelection);
		function DimensionSelection() {
			var _this = BaseSelection.apply(this, arguments) || this;
			_this.selected = null;
			return _this;
		}
		var _proto = DimensionSelection.prototype;
		_proto.isEmptyRanges = function isEmptyRanges() {
			if (this.selected === null) return true;
			return this.selected.every((selected) => selected === SelectedRowValue.UNSELECTED);
		};
		/**
		* 给定的 range 是否在当前的 selection 中
		* @param range
		*/ _proto.isRangeInDimensionSelection = function isRangeInDimensionSelection(range) {
			var _a;
			var { start, end } = range;
			var slicedRange = (_a = this.selected) === null || _a === void 0 ? void 0 : _a.slice(start, end + 1);
			if (!slicedRange) return false;
			if (slicedRange.length !== end + 1 - start) return false;
			return slicedRange.every((isSelected) => isSelected === SelectedRowValue.SELECTED);
		};
		_proto.getDimensionIntersectRange = function getDimensionIntersectRange(range) {
			var _a, _b;
			var { start, end } = range;
			return generateConsecutiveRanges((_b = (_a = this.selected) === null || _a === void 0 ? void 0 : _a.slice(start, end + 1)) !== null && _b !== void 0 ? _b : new Uint8Array());
		};
		/**
		* 根据 [start, end] 和 selected 标识添加 dimension selection
		* @param dimensionSelection
		*/ _proto.setDimensionSelection = function setDimensionSelection(dimensionSelection) {
			var { start, end, selected } = dimensionSelection;
			this.ensureSelectedValid(end + 1);
			for (var loopIndex = start; loopIndex <= end; loopIndex++) this.selected[loopIndex] = selected ? SelectedRowValue.SELECTED : SelectedRowValue.UNSELECTED;
		};
		/**
		* 获取 dimension range, [start, end] 前闭区间后闭区间
		*/ _proto.getDimensionRanges = function getDimensionRanges() {
			if (!this.selected) return [];
			return generateConsecutiveRanges(this.selected);
		};
		/**
		* 确保 selected 是具有 range 足够长度的
		* @param count
		*/ _proto.ensureSelectedValid = function ensureSelectedValid(count) {
			var _a, _b;
			var reservedCount = Math.min(this.selectedCountLimit, count + 100);
			var length = (_b = (_a = this.selected) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
			if (this.selected && length >= count) return;
			if (!this.selected) {
				this.selected = new Uint8Array(reservedCount);
				return;
			}
			var temporaryArray = [...this.selected];
			var insertArray = new Array(reservedCount - length).fill(SelectedRowValue.UNSELECTED);
			temporaryArray.splice(length - 1, 0, ...insertArray);
			this.selected = new Uint8Array(temporaryArray);
		};
		return DimensionSelection;
	}(BaseSelection);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/plugins/range-model/column-selection/index.js
function _inherits$4(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$4(subClass, superClass);
}
function _set_prototype_of$4(o, p) {
	_set_prototype_of$4 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$4(o, p);
}
function matchFields(viewModel, fieldIds, columnRange, isSelected = false) {
	viewModel === null || viewModel === void 0 || viewModel.getVisibleFieldIds().slice(columnRange.startColumn, columnRange.endColumn + 1).forEach((fieldId) => {
		if (isSelected) {
			fieldIds.add(fieldId);
			return;
		}
		fieldIds.delete(fieldId);
	});
}
var ColumnSelection;
var init_column_selection = __esmMin((() => {
	init_es$1();
	init_dimension_selection();
	ColumnSelection = /* @__PURE__ */ function(DimensionSelection) {
		"use strict";
		_inherits$4(ColumnSelection, DimensionSelection);
		function ColumnSelection() {
			var _this = DimensionSelection.apply(this, arguments) || this;
			_this.fieldGroupRect = void 0;
			_this.fieldGroupId = void 0;
			_this.isColumnSelected = true;
			_this.selectedCountLimit = coreAppConfigService.getConfig()[CoreAppConfigKey.MAXIMUM_FIELD_LIMIT];
			_this.fieldIds = /* @__PURE__ */ new Set();
			return _this;
		}
		var _proto = ColumnSelection.prototype;
		/**
		* 根据 [startColumn, endColumn] 和 selected 标识添加 column selection
		* @param columnSelection
		*/ _proto.setSelection = function setSelection(columnSelection) {
			var { startColumn: start, endColumn: end, selected, fieldGroupId, fieldGroupRect } = columnSelection;
			this.fieldGroupRect = fieldGroupRect;
			this.fieldGroupId = fieldGroupId;
			this.setDimensionSelection({
				start,
				end,
				selected
			});
			matchFields(this.getCurrentView(), this.fieldIds, columnSelection, selected);
		};
		_proto.resetRanges = function resetRanges() {
			DimensionSelection.prototype.resetRanges.call(this);
			this.fieldIds.clear();
		};
		/**
		* 获取 column selection 的 ranges
		*/ _proto.getRanges = function getRanges() {
			return this.getDimensionRanges().map((range) => ({
				startColumn: range.start,
				endColumn: range.end
			}));
		};
		_proto.getFieldIds = function getFieldIds() {
			return new Set(this.fieldIds);
		};
		/**
		* 给定的 range 是否在当前的 selection 中
		* @param range
		*/ _proto.isRangeInSelection = function isRangeInSelection(range) {
			var { startColumn, endColumn } = range;
			return this.isRangeInDimensionSelection({
				start: startColumn,
				end: endColumn
			});
		};
		_proto.isIntersected = function isIntersected(dimension) {
			return this.getDimensionIntersectRange({
				start: dimension.column,
				end: dimension.column
			}).length > 0;
		};
		return ColumnSelection;
	}(DimensionSelection);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/plugins/range-model/empty-selection/index.js
function _inherits$3(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$3(subClass, superClass);
}
function _set_prototype_of$3(o, p) {
	_set_prototype_of$3 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$3(o, p);
}
var EmptySelection;
var init_empty_selection = __esmMin((() => {
	init_base_selection();
	EmptySelection = /* @__PURE__ */ function(BaseSelection) {
		"use strict";
		_inherits$3(EmptySelection, BaseSelection);
		function EmptySelection() {
			var _this = BaseSelection.apply(this, arguments) || this;
			_this.isEmptySelected = true;
			_this.selected = null;
			return _this;
		}
		var _proto = EmptySelection.prototype;
		_proto.isRangeInSelection = function isRangeInSelection(_range) {
			return false;
		};
		_proto.setSelection = function setSelection(_range) {};
		_proto.getRanges = function getRanges() {
			return null;
		};
		_proto.isEmptyRanges = function isEmptyRanges() {
			return true;
		};
		_proto.isIntersected = function isIntersected(_dimension) {
			return false;
		};
		return EmptySelection;
	}(BaseSelection);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/plugins/range-model/range-selection/index.js
function _inherits$2(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$2(subClass, superClass);
}
function _set_prototype_of$2(o, p) {
	_set_prototype_of$2 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$2(o, p);
}
/**
* 根据是否插入判断移动方向
* @param number
* @param isInsertion
*/ function movePoint(number, isInsertion) {
	return number + (isInsertion ? 1 : -1);
}
var import_cloneDeep$1, RangeSelection;
var init_range_selection = __esmMin((() => {
	import_cloneDeep$1 = /* @__PURE__ */ __toESM(require_cloneDeep());
	init_base_selection();
	RangeSelection = /* @__PURE__ */ function(BaseSelection) {
		"use strict";
		_inherits$2(RangeSelection, BaseSelection);
		function RangeSelection() {
			var _this = BaseSelection.apply(this, arguments) || this;
			_this.selected = null;
			_this.isRangeSelected = true;
			_this.activeCell = void 0;
			return _this;
		}
		var _proto = RangeSelection.prototype;
		/**
		* 根据 [startRow, endRow] 和 [startColumn, endColumn] 设置框选 selection
		* @param rangeSelection
		* @param activePoint
		*/ _proto.setSelection = function setSelection(rangeSelection, activePoint) {
			this.selected = rangeSelection;
			this.setActivePoint(activePoint);
			this.matchActiveCell();
		};
		_proto.resetRanges = function resetRanges() {
			BaseSelection.prototype.resetRanges.call(this);
			this.setActiveId();
		};
		/**
		* 获取框选分区 ranges
		*/ _proto.getRanges = function getRanges() {
			return (0, import_cloneDeep$1.default)(this.selected);
		};
		_proto.isEmptyRanges = function isEmptyRanges() {
			return this.selected === null;
		};
		_proto.getActiveCell = function getActiveCell() {
			return (0, import_cloneDeep$1.default)(this.activeCell);
		};
		/**
		* 给定的 range 是否在当前的 selection 中
		* @param range
		*/ _proto.isRangeInSelection = function isRangeInSelection(range) {
			if (!this.selected) return false;
			var { startRow, endRow, startColumn, endColumn } = range;
			var { selected } = this;
			if (startRow < selected.startRow || selected.endRow < endRow) return false;
			if (startColumn < selected.startColumn || selected.endColumn < endColumn) return false;
			return true;
		};
		_proto.isIntersected = function isIntersected(dimension) {
			var { selected } = this;
			if (!selected) return false;
			var { startRow, endRow, startColumn, endColumn } = selected;
			if ("row" in dimension) return startRow <= dimension.row && dimension.row <= endRow;
			return startColumn <= dimension.column && dimension.column <= endColumn;
		};
		_proto.insertRow = function insertRow(row) {
			return this.insertOrDeleteRow(row, true);
		};
		_proto.deleteRow = function deleteRow(row) {
			return this.insertOrDeleteRow(row, false);
		};
		_proto.insertColumn = function insertColumn(column) {
			return this.insertOrDeleteColumn(column, true);
		};
		_proto.deleteColumn = function deleteColumn(column) {
			return this.insertOrDeleteColumn(column, false);
		};
		_proto.matchActiveCell = function matchActiveCell() {
			var { activePoint } = this;
			var viewModel = this.getCurrentView();
			this.setActiveId(activePoint ? viewModel === null || viewModel === void 0 ? void 0 : viewModel.getDisplayedRecordIds()[activePoint.row] : void 0, activePoint ? viewModel === null || viewModel === void 0 ? void 0 : viewModel.getVisibleFieldIds()[activePoint.column] : void 0);
		};
		_proto.setActiveId = function setActiveId(recordId, fieldId) {
			if (!recordId || !fieldId) {
				this.activeCell = void 0;
				return;
			}
			this.activeCell = {
				recordId,
				fieldId
			};
		};
		/**
		* 修正选区位置
		* @private
		*/ _proto.corglobalSelection = function corglobalSelection() {
			var { selected } = this;
			if (!selected) return;
			var { startRow, endRow, startColumn, endColumn } = selected;
			if (endRow < startRow || endColumn < startColumn) this.selected = null;
		};
		_proto.insertOrDeleteRow = function insertOrDeleteRow(row, isInsertion) {
			var { selected } = this;
			if (!selected) return false;
			var { startRow, endRow } = selected;
			if (isInsertion && row === startRow) selected.startRow = movePoint(selected.startRow, isInsertion);
			if (row < startRow) selected.startRow = movePoint(selected.startRow, isInsertion);
			if (row <= endRow) selected.endRow = movePoint(selected.endRow, isInsertion);
			this.corglobalSelection();
			return true;
		};
		_proto.insertOrDeleteColumn = function insertOrDeleteColumn(column, isInsertion) {
			var { selected } = this;
			if (!selected) return false;
			var { startColumn, endColumn } = selected;
			if (isInsertion && column === startColumn) selected.startColumn = movePoint(selected.startColumn, isInsertion);
			if (column < startColumn) selected.startColumn = movePoint(selected.startColumn, isInsertion);
			if (column <= endColumn) selected.endColumn = movePoint(selected.endColumn, isInsertion);
			this.corglobalSelection();
			return true;
		};
		return RangeSelection;
	}(BaseSelection);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/plugins/range-model/row-selection/index.js
function _inherits$1(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$1(subClass, superClass);
}
function _set_prototype_of$1(o, p) {
	_set_prototype_of$1 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$1(o, p);
}
function matchRecords(viewModel, recordIds, rowRange, isSelected = false) {
	viewModel === null || viewModel === void 0 || viewModel.getDisplayedRecordIds().slice(rowRange.startRow, rowRange.endRow + 1).forEach((recordId) => {
		if (isSelected) {
			recordIds.add(recordId);
			return;
		}
		recordIds.delete(recordId);
	});
}
var RowSelection;
var init_row_selection = __esmMin((() => {
	init_es$1();
	init_dimension_selection();
	RowSelection = /* @__PURE__ */ function(DimensionSelection) {
		"use strict";
		_inherits$1(RowSelection, DimensionSelection);
		function RowSelection() {
			var _this = DimensionSelection.apply(this, arguments) || this;
			_this.isRowSelected = true;
			_this.recordIds = /* @__PURE__ */ new Set();
			_this.selectedCountLimit = coreAppConfigService.getConfig()[CoreAppConfigKey.MAXIMUM_RECORD_LIMIT];
			return _this;
		}
		var _proto = RowSelection.prototype;
		/**
		* 根据 [startRow, endRow] 和 selected 标识添加 row selection
		* @param rowSelection
		*/ _proto.setSelection = function setSelection(rowSelection) {
			var { startRow: start, endRow: end, selected } = rowSelection;
			this.setDimensionSelection({
				start,
				end,
				selected
			});
			matchRecords(this.getCurrentView(), this.recordIds, rowSelection, selected);
		};
		_proto.resetRanges = function resetRanges() {
			DimensionSelection.prototype.resetRanges.call(this);
			this.recordIds.clear();
		};
		/**
		* 获取 row selection 的 ranges
		*/ _proto.getRanges = function getRanges() {
			return this.getDimensionRanges().map((range) => ({
				startRow: range.start,
				endRow: range.end
			}));
		};
		_proto.getRecordIds = function getRecordIds() {
			return new Set(this.recordIds);
		};
		/**
		* 给定的 range 是否在当前的 selection 中
		* @param range
		*/ _proto.isRangeInSelection = function isRangeInSelection(range) {
			var { startRow, endRow } = range;
			return this.isRangeInDimensionSelection({
				start: startRow,
				end: endRow
			});
		};
		_proto.isIntersected = function isIntersected(dimension) {
			return this.getDimensionIntersectRange({
				start: dimension.row,
				end: dimension.row
			}).length > 0;
		};
		return RowSelection;
	}(DimensionSelection);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/plugins/range-model/index.js
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
var import_main, RangeModel;
var init_range_model = __esmMin((() => {
	init_tslib_es6();
	init_event();
	import_main = require_main();
	init_es();
	init_column_selection();
	init_empty_selection();
	init_index_interface();
	init_range_selection();
	init_row_selection();
	RangeModel = /* @__PURE__ */ function(Disposable) {
		"use strict";
		_inherits(RangeModel, Disposable);
		function RangeModel(activeTable, activeView) {
			var _this = Disposable.call(this) || this;
			_this.activeTable = activeTable;
			_this.activeView = activeView;
			_this.emptySelection = new EmptySelection(_this.activeView);
			_this.rowSelection = new RowSelection(_this.activeView);
			_this.columnSelection = new ColumnSelection(_this.activeView);
			_this.rangeSelection = new RangeSelection(_this.activeView);
			_this.currentSelection = _this.rangeSelection;
			_this.onSelectionChangedEmitter = _this._register(new Emitter());
			_this.onActivePointChangedEmitter = _this._register(new Emitter());
			_this.onSelectionChanged = _this.onSelectionChangedEmitter.event;
			_this.onActivePointChanged = _this.onActivePointChangedEmitter.event;
			globalVar.rangeModelInitEvent.fire();
			return _this;
		}
		var _proto = RangeModel.prototype;
		_proto.getCurrentSelection = function getCurrentSelection() {
			return this.currentSelection;
		};
		/**
		* 行选择/全选
		* @param selectedRow
		* @param sourceType
		*/ _proto.selectRow = function selectRow(selectedRow, sourceType = NotifySourceType.OTHERS) {
			this.switchSelection(this.rowSelection);
			this.rowSelection.setSelection(Object.assign(Object.assign({}, selectedRow), { selected: true }));
			this.notifyEvent(sourceType);
		};
		/**
		* 行取消选择/全选
		* @param unselectedRow
		*/ _proto.unselectRow = function unselectRow(unselectedRow) {
			this.switchSelection(this.rowSelection);
			this.rowSelection.setSelection(Object.assign(Object.assign({}, unselectedRow), { selected: false }));
			if (this.rowSelection.isEmptyRanges()) this.resetSelection();
			this.notifyEvent();
		};
		_proto.setActiveColumnSelection = function setActiveColumnSelection(selectedColumn) {
			this.switchSelection(this.columnSelection);
			this.resetRanges();
			this.columnSelection.setSelection(Object.assign(Object.assign({}, selectedColumn), { selected: true }));
			this.notifyEvent();
		};
		/**
		* 列选择/全选
		* @param selectedColumn
		* @param sourceType
		*/ _proto.selectColumn = function selectColumn(selectedColumn, sourceType = NotifySourceType.OTHERS) {
			this.switchSelection(this.columnSelection);
			this.columnSelection.setSelection(Object.assign(Object.assign({}, selectedColumn), { selected: true }));
			this.notifyEvent(sourceType);
		};
		/**
		* 列取消选择/全选
		* @param unselectedColumn
		*/ _proto.unselectColumn = function unselectColumn(unselectedColumn) {
			this.switchSelection(this.columnSelection);
			this.columnSelection.setSelection(Object.assign(Object.assign({}, unselectedColumn), { selected: false }));
			if (this.columnSelection.isEmptyRanges()) this.resetSelection();
			this.notifyEvent();
		};
		/**
		* 框选
		* @param rangeSelection
		* @param activePoint
		* @param sourceType
		*/ _proto.selectRange = function selectRange(rangeSelection, activePoint = null, sourceType = NotifySourceType.OTHERS) {
			this.switchSelection(this.rangeSelection);
			this.rangeSelection.setSelection(rangeSelection, activePoint);
			this.notifyEvent(sourceType);
		};
		/**
		* reset 当前的 selection，通过标识处理
		* @param needNotify
		* @param sourceType
		*/ _proto.resetSelection = function resetSelection(sourceType = NotifySourceType.OTHERS, needNotify = true) {
			this.switchSelection(this.emptySelection);
			if (!needNotify) return;
			this.notifyEvent(sourceType);
		};
		/**
		* 通知当前状态改变
		*/ _proto.notifyEvent = function notifyEvent(sourceType = NotifySourceType.OTHERS) {
			this.notifyActivePointChange(sourceType);
			this.notifySelectionRangeChanged(sourceType);
		};
		/**
		* 给定 range 范围数组，获取 merged IViewCopy
		* @param ranges
		*/ _proto.getStandardValueFromMergedRange = function getStandardValueFromMergedRange(ranges = [], customGet, table, view) {
			return __awaiter(this, void 0, void 0, function* () {
				var recordIds = [];
				var fieldIds = [];
				var targeTable = table || this.activeTable;
				var targetView = view || this.activeView;
				if (!targeTable || !targetView) return null;
				var visibleRecordIds = targetView.getDisplayedRecordIds();
				var visibleFieldIds = targetView.getVisibleFieldIds();
				ranges.forEach((range) => {
					var { startRow = 0, endRow = visibleRecordIds.length - 1, startColumn = 0, endColumn = visibleFieldIds.length - 1 } = range;
					recordIds = mergeArr(recordIds, visibleRecordIds.slice(startRow, endRow + 1));
					fieldIds = fieldIds.concat(visibleFieldIds.slice(startColumn, endColumn + 1));
				});
				return targeTable.getStandardValueMatrixFromIds({
					recordIds,
					fieldIds
				});
			});
		};
		_proto.resetRanges = function resetRanges() {
			this.currentSelection.resetRanges();
		};
		_proto.switchSelection = function switchSelection(selection) {
			if (this.currentSelection === selection) return;
			this.resetRanges();
			this.currentSelection = selection;
		};
		/**
		* 通知当前的 selection-range 变更
		*/ _proto.notifySelectionRangeChanged = function notifySelectionRangeChanged(sourceType) {
			this.onSelectionChangedEmitter.fire({
				sourceType,
				selection: this.currentSelection
			});
		};
		/**
		* 通知当前的 active-point 变更
		*/ _proto.notifyActivePointChange = function notifyActivePointChange(sourceType) {
			this.onActivePointChangedEmitter.fire({
				sourceType,
				activePoint: this.currentSelection.getActivePoint()
			});
		};
		return RangeModel;
	}(import_main.Disposable);
	__decorate([
		debounceHighPriority(true),
		__metadata("design:type", Function),
		__metadata("design:paramtypes", [Object]),
		__metadata("design:returntype", void 0)
	], RangeModel.prototype, "notifyEvent", null);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/shared/utils/format-time.js
/**
* 获取今天的日期
* @returns
*/ function getToday() {
	return /* @__PURE__ */ new Date();
}
/**
* 获取 time 所在周的周一时间
* @param time
* @returns
*/ function toMondayTime(time) {
	return (0, import_dayjs_min.default)(time).startOf("week").valueOf();
}
function toSundayTime(time) {
	return (0, import_dayjs_min.default)(time).endOf("week").valueOf();
}
/**
* 获取 time 所在月的第一天时间
* @param time
* @returns
*/ function toMonthFirstDateTime(time) {
	return (0, import_dayjs_min.default)(time).startOf("month").valueOf();
}
/**
* 获取 time 所在月的最后一天时间
* @param time
* @returns
*/ function toMonthLastDateTime(time) {
	return (0, import_dayjs_min.default)(time).endOf("month").valueOf();
}
function toToday(time) {
	return (0, import_dayjs_min.default)(time).startOf("day").valueOf();
}
var import_dayjs_min;
var init_format_time = __esmMin((() => {
	import_dayjs_min = /* @__PURE__ */ __toESM(require_dayjs_min());
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/shared/time-util/index.js
function getDateFormulaTimeValue(field, recordId) {
	var formulaResults = field.getStandardCell(recordId).data;
	if (formulaResults.length !== 1) return null;
	var first = formulaResults[0];
	if (first.isError || first.formatterType !== FieldType.DATE_TIME) return null;
	return first.timestamp;
}
function getDateLookupTimeValue(field, recordId) {
	var lookupResults = field.getStandardCell(recordId).data;
	if (lookupResults.length !== 1) return null;
	var first = lookupResults[0];
	if (first.isError || first.formatterType !== FieldType.DATE_TIME) return null;
	return first.timestamp;
}
/**
* 修正时间范围
* @param start
* @param end
* @param fixToday 没有设置时是否默认为今天
* @returns
*/ function fixRange(start, end, fixToday) {
	if (!start && !end) {
		if (!fixToday) return null;
		var today = getToday().getTime();
		return [today, today];
	}
	var startTime;
	var endTime;
	if (start) startTime = start;
	else startTime = end;
	if (end) endTime = end;
	else endTime = start;
	return [toToday(startTime), toToday(endTime)];
}
var import_cloneDeep, TimeUtil;
var init_time_util = __esmMin((() => {
	import_cloneDeep = /* @__PURE__ */ __toESM(require_cloneDeep());
	init_es();
	init_es$1();
	init_format_time();
	TimeUtil = /* @__PURE__ */ function() {
		"use strict";
		function TimeUtil(context, status) {
			this.context = context;
			this.status = status;
			/**
			* 获取日期配置
			* @param ignorePermission 忽略权限判断, 默认为 false
			*/ this.getDateConfig = (ignorePermission = false) => {
				var currentView = this.context.getCurrentView();
				if (!(currentView === null || currentView === void 0 ? void 0 : currentView.getDateConfig)) return;
				var canReadField = (fieldId) => this.status.getPermissionStatus("canReadField", { fieldId });
				var dateConfig = (0, import_cloneDeep.default)(currentView.getDateConfig());
				var { startDateFieldId, endDateFieldId, labelFieldId, dateColorConfig } = dateConfig;
				if (ignorePermission) return dateConfig;
				if (startDateFieldId && !canReadField(startDateFieldId)) dateConfig.startDateFieldId = null;
				if (endDateFieldId && !canReadField(endDateFieldId)) dateConfig.endDateFieldId = null;
				if (labelFieldId && !canReadField(labelFieldId)) dateConfig.labelFieldId = null;
				if (dateColorConfig.type === TimeBarColorType.BY_SELECT_FIELD && !canReadField(dateColorConfig.selectFieldId)) dateConfig.dateColorConfig = {
					type: TimeBarColorType.BY_SPECIFIC_COLOR,
					specificColor: OptionStyle.tagpalette_C2
				};
				return dateConfig;
			};
		}
		var _proto = TimeUtil.prototype;
		_proto.getRecordRangeTime = function getRecordRangeTime(recordId) {
			var dateConfig = this.getDateConfig();
			if (!dateConfig) return null;
			var { startDateFieldId, endDateFieldId } = dateConfig;
			return fixRange(startDateFieldId ? this.getOriginTime(recordId, startDateFieldId) : null, endDateFieldId ? this.getOriginTime(recordId, endDateFieldId) : null);
		};
		_proto.getOriginTimeByField = function getOriginTimeByField(recordId, field) {
			var _a, _b;
			if (field.type === FieldType.DATE_TIME) {
				var table = this.context.getCurrentTable();
				return (_b = (_a = table === null || table === void 0 ? void 0 : table.getCell(recordId, field.getId())) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : null;
			}
			if (field.type === FieldType.FORMULA) return getDateFormulaTimeValue(field, recordId);
			if (field.type === FieldType.LOOKUP) return getDateLookupTimeValue(field, recordId);
			return null;
		};
		_proto.getOriginTime = function getOriginTime(recordId, fieldId) {
			var table = this.context.getCurrentTable();
			var field = table === null || table === void 0 ? void 0 : table.getFieldByFieldId(fieldId);
			if (!field) return null;
			return this.getOriginTimeByField(recordId, field);
		};
		return TimeUtil;
	}();
}));
//#endregion
export { init_format_time as a, toMonthLastDateTime as c, init_range_model as d, NotifySourceType as f, getToday as i, toSundayTime as l, fixRange as n, toMondayTime as o, init_index_interface as p, init_time_util as r, toMonthFirstDateTime as s, TimeUtil as t, RangeModel as u };
