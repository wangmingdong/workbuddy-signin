import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { $l as init_es, $r as ViewColorConditionType, Aa as OperationType, Bu as require_isEmpty, Ca as init_two_way_link_records, Ci as DEFAULT_START_RANK_ID, Da as applyPatchAndFix, Ea as traversePatch, Hc as init_env, Hl as init_type, Hr as isSupportDateView, Jl as init_field_interface, Jo as init_default_settings, Ko as DEFAULT_TEXT_FORMAT_PROPERTY, Ml as DashboardComponentType, Nl as init_index_interface, Si as rankHelper, Ta as patchToRecordIds, Uc as isServerAddTwoWayLinkMutation, Ur as getTwoWayLinkField, Vl as ViewType, Vr as init_date_view, Wr as init_get_two_way_link_field, Xt as init_default_values, Xu as domainConfig, Yt as InitializationUtil, Yu as logger, _o as isUserField, du as getThemeTokenValue, ed as require_isEqual, ei as init_color_config_interface, fl as FilterConditionType, go as init_is_user_field, hl as init_filter_info_interface, ja as init_operation_interface, ka as init_diff_array, mr as init_set_records, pr as SetRecordsMutation, ql as FieldType, qo as getDefaultTableDescription, td as reporter, wd as i18n, wi as init_constant, xd as BlockType, xi as init_rank_helper } from "./execution-result-erkS5q1j.js";
import { c as require_cloneDeep } from "./merge-vXYl4M0x.js";
//#region ../../node_modules/@tencent/xtable-core/es/constant/config/dashboard.js
var DEFAULT_COMPONENTS_SIZE;
var init_dashboard = __esmMin((() => {
	init_index_interface();
	DEFAULT_COMPONENTS_SIZE = {
		[DashboardComponentType.WORD_CLOUD]: {
			width: 4,
			height: 3,
			minWidth: 2,
			minHeight: 2
		},
		[DashboardComponentType.CHART]: {
			width: 4,
			height: 3,
			minWidth: 2,
			minHeight: 2
		},
		[DashboardComponentType.TABLE]: {
			width: 4,
			height: 3,
			minWidth: 2,
			minHeight: 2
		},
		[DashboardComponentType.NUMBER]: {
			width: 4,
			height: 3,
			minWidth: 2,
			minHeight: 2
		},
		[DashboardComponentType.TEXT]: {
			width: 4,
			height: 3,
			minWidth: 2,
			minHeight: 1
		}
	};
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-core/es/model/view/utils/ability/date.js
/**
* 从 viewModels 中找出所有时间依据与 fieldId 有关的 viewModels
* @param fieldId
* @param viewModels
*/ function getAllDateFieldRelatedDateViewsByFieldId(fieldId, viewModels) {
	return viewModels.filter((viewModel) => isSupportDateView(viewModel)).filter((viewModel) => {
		var { startDateFieldId, endDateFieldId } = viewModel.getDateConfig();
		return [startDateFieldId, endDateFieldId].includes(fieldId);
	});
}
var init_date = __esmMin((() => {
	init_date_view();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-core/es/utils/convertor/table-json-convertor.js
/**
* 生成 TableJSON
* 场景：SDK 嵌入 Sheet 时，供 Sheet 调用的 InsertTable 接口使用
* @param tableId
* @param title
* @param userInfo
* @param viewType
* @returns {ITableJSON} JSON 对象
*/ function generateTableJSON({ tableId, title, userInfo, viewType, fieldValues, cellValues, tableDescription, primaryFieldIndex, renderData }) {
	var { fieldIds, fieldMap, primaryFieldId } = InitializationUtil.generateDefaultFields(viewType, fieldValues, primaryFieldIndex);
	var { recordIds, recordMap, recordMetaMap } = InitializationUtil.generateDefaultRecords(viewType, fieldIds, userInfo.id, cellValues);
	var rankInfo = void 0;
	if (domainConfig.useRecordRank()) {
		var tableRankMap = rankHelper.sort(recordIds);
		rankInfo = {
			nextRank: recordIds.length ? rankHelper.add(tableRankMap[recordIds[recordIds.length - 1]], 1) : DEFAULT_START_RANK_ID,
			tableRankMap,
			viewRankMap: {}
		};
	}
	var { viewIds, viewMap } = InitializationUtil.generateDefaultViews(viewType, fieldIds, fieldMap, recordIds, userInfo.id, renderData);
	var description = tableDescription !== null && tableDescription !== void 0 ? tableDescription : getDefaultTableDescription();
	if ((renderData === null || renderData === void 0 ? void 0 : renderData.generateNewView) && ((renderData === null || renderData === void 0 ? void 0 : renderData.generateNewViewType) === ViewType.FORM || (renderData === null || renderData === void 0 ? void 0 : renderData.generateNewViewType) === ViewType.QUERY)) {
		var isForm = (renderData === null || renderData === void 0 ? void 0 : renderData.generateNewViewType) === ViewType.FORM;
		var currentRenderData = Object.assign(Object.assign({}, renderData), {
			groupInfos: getGroupInfos(fieldIds, fieldMap),
			title: i18n.t(isForm ? "form_collection_results" : "query_data_sources")
		});
		var { viewId: groupId, viewMap: groupViewMap } = InitializationUtil.generateSpecificViewsByViewType(ViewType.GRID, fieldIds, fieldMap, recordIds, userInfo.id, currentRenderData);
		viewIds.push(groupId);
		viewMap[groupId] = groupViewMap[groupId];
	}
	if (!domainConfig.getIsWeCom() && (renderData === null || renderData === void 0 ? void 0 : renderData.generateNewView) && (renderData === null || renderData === void 0 ? void 0 : renderData.generateNewViewType) !== ViewType.FORM && (renderData === null || renderData === void 0 ? void 0 : renderData.generateNewViewType) !== ViewType.QUERY) {
		var baseUrl = `https://docs.qq.com/sheet/${getSecretId()}?tab=${tableId}&`;
		var viewData = judgeViewByFieldType(fieldIds, fieldMap);
		var formatArray = [];
		var startIndex = 0;
		var formatCount = 0;
		var context = i18n.t("view_table");
		addFormat(formatArray, startIndex, `${baseUrl}viewId=${viewIds[0]}`);
		startIndex = startIndex + context.length;
		formatCount = formatCount + 1;
		if (viewData === null || viewData === void 0 ? void 0 : viewData.groupView) {
			var currentRenderData1 = {
				groupInfos: getGroupInfos(fieldIds, fieldMap),
				title: i18n.t("group")
			};
			var { viewId: groupId1, viewMap: groupViewMap1 } = InitializationUtil.generateSpecificViewsByViewType(ViewType.GRID, fieldIds, fieldMap, recordIds, userInfo.id, currentRenderData1);
			viewIds.push(groupId1);
			viewMap[groupId1] = groupViewMap1[groupId1];
			addFormat(formatArray, startIndex, null);
			context = `${context} | ${i18n.t("group")}`;
			addFormat(formatArray, startIndex + 3, `${baseUrl}viewId=${groupId1}`);
			startIndex = context.length;
			formatCount = formatCount + 2;
		}
		if (viewData === null || viewData === void 0 ? void 0 : viewData.GanttView) {
			var { viewId: GanttId, viewMap: GanttMap } = InitializationUtil.generateSpecificViewsByViewType(ViewType.GANTT, fieldIds, fieldMap, recordIds, userInfo.id, renderData);
			viewIds.push(GanttId);
			viewMap[GanttId] = GanttMap[GanttId];
			addFormat(formatArray, startIndex, null);
			context = `${context} | ${i18n.t("view_gantt")}`;
			addFormat(formatArray, startIndex + 3, `${baseUrl}viewId=${GanttId}`);
			startIndex = context.length;
			formatCount = formatCount + 2;
		}
		if (viewData === null || viewData === void 0 ? void 0 : viewData.kanBanView) {
			var { viewId: kanBanId, viewMap: kanBanMap } = InitializationUtil.generateSpecificViewsByViewType(ViewType.KANBAN, fieldIds, fieldMap, recordIds, userInfo.id, renderData);
			viewIds.push(kanBanId);
			viewMap[kanBanId] = kanBanMap[kanBanId];
			addFormat(formatArray, startIndex, null);
			context = `${context} | ${i18n.t("view_kanban")}`;
			addFormat(formatArray, startIndex + 3, `${baseUrl}viewId=${kanBanId}`);
			startIndex = context.length;
			formatCount = formatCount + 2;
		}
		if (viewData === null || viewData === void 0 ? void 0 : viewData.albumView) {
			var { viewId: GalleryId, viewMap: GalleryMap } = InitializationUtil.generateSpecificViewsByViewType(ViewType.GALLERY, fieldIds, fieldMap, recordIds, userInfo.id, renderData);
			viewIds.push(GalleryId);
			viewMap[GalleryId] = GalleryMap[GalleryId];
			addFormat(formatArray, startIndex, null);
			context = `${context} | ${i18n.t("view_photo")}`;
			addFormat(formatArray, startIndex + 3, `${baseUrl}viewId=${GalleryId}`);
			startIndex = context.length;
			formatCount = formatCount + 2;
		}
		if (!domainConfig.getIsWeCom()) {
			if (tableDescription) {
				description.value = `${context}\n${description.value}`;
				startIndex = context.length + 1;
			} else {
				description.value = `${context}`;
				startIndex = context.length;
			}
			updateFormat(description, formatArray, formatCount, startIndex);
		}
		handleReportData(viewData);
	}
	return {
		id: tableId,
		type: BlockType.SMART_SHEET,
		title,
		fieldMap,
		recordMap,
		recordMetaMap,
		viewMap,
		views: viewIds,
		userMap: { [userInfo.id]: userInfo },
		commentMap: {},
		mentionMap: {},
		externalDataSourceMap: {},
		description,
		primaryFieldId,
		rankInfo
	};
}
/**
* 根据单选列类型，找到分组的前两项
*/ function getGroupInfos(fieldIds, fieldMap) {
	var groupInfo = [];
	fieldIds.forEach((fieldId) => {
		if (fieldMap[fieldId].type === FieldType.SINGLE_SELECT) groupInfo.push({
			fieldId,
			desc: false
		});
	});
	return groupInfo.slice(0, 2);
}
/**
* 根据列类型，返回生成新视图的集合
*/ function judgeViewByFieldType(fieldIds, fieldMap) {
	var groupArray = [];
	var checkboxCount = 0;
	var dateTimeCount = 0;
	var imageCount = 0;
	fieldIds.forEach((fieldId) => {
		if (fieldMap[fieldId].type === FieldType.SINGLE_SELECT) {
			groupArray.push(true);
			checkboxCount = checkboxCount + 1;
		}
		if (fieldMap[fieldId].type === FieldType.DATE_TIME) dateTimeCount = dateTimeCount + 1;
		if (fieldMap[fieldId].type === FieldType.IMAGE) imageCount = imageCount + 1;
	});
	return {
		groupView: checkboxCount >= 1,
		kanBanView: checkboxCount >= 1,
		albumView: imageCount >= 1,
		GanttView: dateTimeCount >= 2
	};
}
/**
* 添加富文本信息
*/ function addFormat(formatArray, startIndex, hyperlink) {
	var format = Object.assign({}, DEFAULT_TEXT_FORMAT_PROPERTY);
	if (hyperlink !== null && hyperlink !== "") {
		format.fontColor = getThemeTokenValue("textLink");
		format.underline = true;
		format.hyperlink = hyperlink;
	}
	formatArray.push({
		startIndex,
		format
	});
}
/**
* 更新富文本信息
*/ function updateFormat(description, formatArray, formatCount, length) {
	description.textFormat = [...formatArray, ...description.textFormat];
	description.textFormat.forEach((format, index) => {
		if (index >= formatCount) format.startIndex = format.startIndex + length;
	});
}
/**
* 获取 secret ID 信息
*/ function getSecretId() {
	var urlString = location.href;
	return new URL(urlString).pathname.split("/").pop() || "";
}
/**
* 处理上报的数据
* ver5上报的字符串
*/ function handleReportData(viewData) {
	var transformArray = new Array(5).fill(0);
	transformArray[0] = 1;
	if (viewData === null || viewData === void 0 ? void 0 : viewData.kanBanView) transformArray[1] = 1;
	if (viewData === null || viewData === void 0 ? void 0 : viewData.GanttView) transformArray[2] = 1;
	if (viewData === null || viewData === void 0 ? void 0 : viewData.albumView) transformArray[3] = 1;
	if (viewData === null || viewData === void 0 ? void 0 : viewData.albumView) transformArray[3] = 1;
	if (viewData === null || viewData === void 0 ? void 0 : viewData.groupView) transformArray[4] = 1;
	var ver5Data = transformArray.toString();
	reporter.metricsTdw({
		opername: "doc_smartsheet_editor",
		module: "convert_from_sheet",
		action: "clk_convert_all",
		ver5: ver5Data
	});
}
var init_table_json_convertor = __esmMin((() => {
	require_cloneDeep();
	init_es();
	init_field_interface();
	init_constant();
	init_rank_helper();
	init_default_settings();
	init_type();
	init_default_values();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-core/es/request/utils/calc-last-sorted-index.js
var calcLastSortedIndex;
var init_calc_last_sorted_index = __esmMin((() => {
	calcLastSortedIndex = (view, _fieldIds, _fieldGroupIds, isCopyToFieldGroup) => {
		var fieldGroupIds = new Set(_fieldGroupIds);
		var fieldIds = new Set(_fieldIds);
		var lastFieldGroupIndex = -1;
		var lastSortedIndex = 0;
		var fieldIdsSorted = view.getAllFieldIdsOrderedByFieldGroup();
		fieldIdsSorted.forEach((fieldId, index) => {
			if (fieldGroupIds.has(fieldId)) lastFieldGroupIndex = Math.max(lastFieldGroupIndex, index);
			if (fieldIds.has(fieldId)) lastSortedIndex = Math.max(lastSortedIndex, index);
		});
		if (lastSortedIndex === fieldIdsSorted.length - 1) lastSortedIndex = lastSortedIndex + 1;
		else if (lastSortedIndex === lastFieldGroupIndex && !isCopyToFieldGroup) lastSortedIndex = view.getFieldIndex(fieldIdsSorted[lastSortedIndex]) + 1;
		else lastSortedIndex = view.getFieldIndex(fieldIdsSorted[Math.min(lastSortedIndex + 1, fieldIdsSorted.length - 1)]);
		return lastSortedIndex;
	};
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-core/es/request/utils/calc-dashboard-positions.js
/**
* 计算新增组件的位置
* @param positions 全部的组件位置信息
* @param componentType 新增的组件类型
* @returns DashboardComponentPosition 新增组件的位置
*/ function calcPositionsAfterInsertComponent(positions, componentType, insertComponentId) {
	var { width, height } = DEFAULT_COMPONENTS_SIZE[componentType];
	if (!Object.values(positions).length) return { [insertComponentId]: {
		offsetX: 0,
		offsetY: 0,
		width,
		height
	} };
	var sortedPositions = sortPositions(Object.entries(positions).map(([componentId, position]) => Object.assign({ componentId }, position)));
	var lastPosition = sortedPositions[sortedPositions.length - 1];
	var offsetX = lastPosition.offsetX + lastPosition.width;
	var position = {
		offsetX: offsetX + width > 12 ? 0 : offsetX,
		offsetY: lastPosition.offsetY + lastPosition.height,
		width,
		height
	};
	var positionsDelta = calcPositionsAfterCeiling([...sortedPositions, Object.assign(Object.assign({}, position), { componentId: insertComponentId })], sortedPositions.length);
	return { [insertComponentId]: (positionsDelta === null || positionsDelta === void 0 ? void 0 : positionsDelta[insertComponentId]) ? Object.assign(Object.assign({}, position), positionsDelta[insertComponentId]) : position };
}
/**
* 计算删除组件后的变更位置
* @param positions 全部的组件位置信息
* @param deleteComponentId 删除组件的 id
* @returns DashboardPositions | null 需要更新的组件位置, 返回 null 说明没有需要变更的
*/ function calcPositionsAfterDeleteComponent(positions, deleteComponentId) {
	if (!positions[deleteComponentId]) {
		logger.error(`calcPositionsAfterDeleteComponent position[${deleteComponentId}] not exist`, positions);
		return null;
	}
	var sortedPositions = sortPositions(Object.entries(positions).map(([componentId, position]) => Object.assign({ componentId }, position)));
	var deleteIndex = sortedPositions.findIndex(({ componentId }) => deleteComponentId === componentId);
	sortedPositions.splice(deleteIndex, 1);
	return calcPositionsAfterCeiling(sortedPositions, deleteIndex);
}
/**
* 计算复制组件后的变更位置
* @param positions 全部的组件位置信息
* @param copyComponentId 复制组件的 id
* @param insertComponetId 新增组件的 id
* @returns DashboardPositions | null 需要更新的组件位置, 返回 null 说明没有需要变更的
*/ function calcPositionsAfterCopyComponent(positions, copyComponentId, insertComponetId) {
	var copyPosition = positions[copyComponentId];
	var { width, height } = copyPosition;
	var offsetX = copyPosition.offsetX + width;
	var isOverMaxWidth = offsetX + width > 12;
	var position = {
		offsetX: isOverMaxWidth ? copyPosition.offsetX : offsetX,
		offsetY: isOverMaxWidth ? copyPosition.offsetY + height : copyPosition.offsetY,
		width,
		height
	};
	return Object.assign({ [insertComponetId]: position }, calcPositionsAfterFixedOverlap(Object.assign({ [insertComponetId]: position }, positions), [insertComponetId]));
}
/**
* 计算吸顶后的变更位置
* @param sortedPositions 排序后的位置列表 offsetY 从小到大排序, 如果 offsetY 相等, 则根据 offsetX 从小到大排序
* @param startIndex 开始计算吸顶的位置下标, 默认为 0
* @returns DashboardPositionsDelta 变更的位置, 为空说明没有位置需要吸顶
*/ function calcPositionsAfterCeiling(sortedPositions, startIndex = 0) {
	var newSortedPositions = [...sortedPositions];
	var positionsDelta = {};
	for (var i = startIndex; i < newSortedPositions.length; i++) {
		var position = newSortedPositions[i];
		var isIntersect = false;
		for (var j = i - 1; j >= 0; j--) {
			var prevPosition = newSortedPositions[j];
			if (position.offsetY > prevPosition.offsetY + prevPosition.height) {
				var positionDelta = { offsetY: prevPosition.offsetY + prevPosition.height };
				positionsDelta[position.componentId] = positionDelta;
				newSortedPositions[i] = Object.assign(Object.assign(Object.assign({}, position), positionDelta), { componentId: position.componentId });
			}
			if (isIntervalIntersect({
				start: prevPosition.offsetX,
				end: prevPosition.offsetX + prevPosition.width
			}, {
				start: position.offsetX,
				end: position.offsetX + position.width
			})) {
				isIntersect = true;
				break;
			}
		}
		if (!isIntersect && position.offsetY !== 0) {
			var positionDelta1 = { offsetY: 0 };
			positionsDelta[position.componentId] = positionDelta1;
			newSortedPositions[i] = Object.assign(Object.assign(Object.assign({}, position), positionDelta1), { componentId: position.componentId });
		}
	}
	return (0, import_isEmpty.default)(positionsDelta) ? null : positionsDelta;
}
/**
* 计算修复重叠后变更的位置
* @param positions 全部的组件位置信息
* @param checkComponentIdList 需要检查的组件 id 列表, 不传默认检测全部
* @returns DashboardPositionsDelta 变更的位置, 为空说明没有位置重叠
*/ function calcPositionsAfterFixedOverlap(positions, checkComponentIds) {
	var _loop = function() {
		var checkComponentId = localCheckComponentIds.shift();
		var checkIndex = sortedPositions.findIndex(({ componentId }) => componentId === checkComponentId);
		var checkPosition = sortedPositions[checkIndex];
		for (var i = checkIndex + 1; i < sortedPositions.length; i++) {
			var nextPosition = sortedPositions[i];
			if (isPositionIntersect(checkPosition, nextPosition)) {
				var nextPositionDelta = { offsetY: checkPosition.offsetY + checkPosition.height };
				positionsDelta[nextPosition.componentId] = nextPositionDelta;
				sortedPositions[i] = Object.assign(Object.assign(Object.assign({}, nextPosition), nextPositionDelta), { componentId: nextPosition.componentId });
				localCheckComponentIds.push(nextPosition.componentId);
			}
		}
		sortedPositions = sortPositions(sortedPositions, localCheckComponentIds);
	};
	var positionsDelta = {};
	var positionList = Object.entries(positions).map(([componentId, position]) => Object.assign({ componentId }, position));
	var localCheckComponentIds = checkComponentIds || [];
	var sortedPositions = sortPositions(positionList, localCheckComponentIds);
	if (checkComponentIds) checkComponentIds.forEach((componentId) => localCheckComponentIds.push(componentId));
	else sortedPositions.forEach(({ componentId }) => localCheckComponentIds.push(componentId));
	while (localCheckComponentIds.length) _loop();
	return (0, import_isEmpty.default)(positionsDelta) ? null : positionsDelta;
}
function isIntervalIntersect(interval1, interval2) {
	return Math.max(interval1.start, interval2.start) < Math.min(interval1.end, interval2.end);
}
/**
* 判断位置是否相交(不包含边缘)
*/ function isPositionIntersect(position1, position2) {
	return isIntervalIntersect({
		start: position1.offsetX,
		end: position1.offsetX + position1.width
	}, {
		start: position2.offsetX,
		end: position2.offsetX + position2.width
	}) && isIntervalIntersect({
		start: position1.offsetY,
		end: position1.offsetY + position1.height
	}, {
		start: position2.offsetY,
		end: position2.offsetY + position2.height
	});
}
function sortPositions(positionList, checkComponentIds) {
	return positionList.sort((positionA, positionB) => {
		if (positionA.offsetY !== positionB.offsetY) return positionA.offsetY - positionB.offsetY;
		if (positionA.offsetX !== positionB.offsetX) return positionA.offsetX - positionB.offsetX;
		if (checkComponentIds === null || checkComponentIds === void 0 ? void 0 : checkComponentIds.length) {
			var indexA = checkComponentIds.indexOf(positionA.componentId);
			var indexB = checkComponentIds.indexOf(positionB.componentId);
			if (indexA !== -1 || indexB !== -1) {
				if (indexA === -1) return 1;
				if (indexB === -1) return -1;
				return indexA - indexB;
			}
		}
		return positionA.componentId.localeCompare(positionB.componentId);
	});
}
var import_isEmpty;
var init_calc_dashboard_positions = __esmMin((() => {
	import_isEmpty = /* @__PURE__ */ __toESM(require_isEmpty());
	init_es();
	init_dashboard();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-core/es/request/utils/collect-two-way-link-records.js
/**
* 收集当前表格修改的双向关联单元格数据
* @param table
* @param delta 修改多行
*/ function generateTableWithCells(table, delta) {
	var cells = {};
	Object.entries(delta).forEach(([recordId, recordDelta]) => {
		Object.entries(recordDelta).forEach(([fieldId, cellDelta]) => {
			var field = table.getFieldByFieldId(fieldId);
			if (!field || field.type !== FieldType.TWO_WAY_LINK_RECORDS) return;
			var twoWayLinkRecordsCellValue = cellDelta.value;
			if (twoWayLinkRecordsCellValue === null) return;
			var key = generateKey({
				recordId,
				fieldId
			});
			cells[key] = {
				recordId,
				field,
				patch: twoWayLinkRecordsCellValue
			};
		});
	});
	return {
		table,
		cells
	};
}
/**
* 根据 RecordMapDeltaWithType 中的信息
* 收集需要重新赋值的对应关联表的双向关联单元格值
* 如：表 A 和 表 B 互相关联，表 A 单元格 a 设置关联 表 B 单元格 b
* 则需要反向设置 单元格 b 关联单元格 a
*/ function getTwoWayLinkRecordsCell(params) {
	var { base, currentTable } = params;
	var tables = {};
	var hasServerAddTwoWayLinkMutation = false;
	Object.values(currentTable.cells).forEach((cell) => {
		var info = getTwoWayLinkField({
			field: cell.field,
			base
		});
		if (!info.isSuccess) return;
		if (isServerAddTwoWayLinkMutation() && info.linkTable.id !== currentTable.table.id) {
			hasServerAddTwoWayLinkMutation = true;
			return;
		}
		var { linkField, linkTable } = info;
		if (!tables[linkTable.id]) tables[linkTable.id] = {
			table: linkTable,
			cells: {}
		};
		generateLinkCellAddsAndRemoves({
			tables,
			linkField,
			currentTable,
			recordId: cell.recordId,
			patch: cell.patch,
			linkTableId: linkTable.id
		});
	});
	return {
		currentTable,
		linkTables: generateLinkCellPatch({ tables }),
		hasServerAddTwoWayLinkMutation
	};
}
/**
* 根据 tables 所收集的单元格数据，生成额外的 SetRecordsMutation
* @param tables
*/ function generateExtraSetRecordsMutations(tables, params) {
	var { requestId, currentUserId, currentUserInfo, appendRefTableMutation } = params;
	var mutations = [];
	var modifiedTime = Date.now();
	Object.values(tables).forEach((item) => {
		var cells = Object.values(item.cells);
		if (cells.length <= 0) return;
		var delta = {};
		cells.forEach((cell) => {
			if (!delta[cell.recordId]) delta[cell.recordId] = {};
			delta[cell.recordId][cell.field.getId()] = {
				modifiedTime,
				type: FieldType.TWO_WAY_LINK_RECORDS,
				value: cell.patch,
				modifiedUserId: currentUserId
			};
		});
		mutations.push(new SetRecordsMutation({
			delta,
			requestId,
			tableId: item.table.id,
			userInfoMap: { [currentUserId]: Object.assign(Object.assign({}, item.table.getUserInfo(currentUserId)), currentUserInfo) },
			appendRefTableMutation
		}));
	});
	return mutations;
}
/**
* 将 adds\removes 包含相同项剔除
* 适用于单纯调整位置的情况
* 如：{ adds: [ item: 'A', index: 1], removes: [ item: 'B', index: 0]}
* @param patch
*/ function optimizePatch(patch) {
	var set = /* @__PURE__ */ new Set();
	var repeated = /* @__PURE__ */ new Set();
	patch.adds.forEach((add) => set.add(add.item));
	patch.removes.forEach((remove) => {
		if (set.has(remove.item)) repeated.add(remove.item);
	});
	return {
		adds: patch.adds.reduce((acc, add) => {
			if (repeated.has(add.item)) return acc;
			acc.push(add);
			return acc;
		}, []),
		removes: patch.removes.reduce((acc, remove) => {
			if (repeated.has(remove.item)) return acc;
			acc.push(remove);
			return acc;
		}, [])
	};
}
/**
* 在 generateLinkCellAddsAndRemoves 之后
* 用于确认最终 add & remove 的 index
*/ function generateLinkCellPatch(params) {
	var { tables } = params;
	var linkTables = /* @__PURE__ */ new Map();
	Object.values(tables).forEach((linkTable) => {
		if (!linkTables.has(linkTable.table.id)) linkTables.set(linkTable.table.id, {
			table: linkTable.table,
			cells: /* @__PURE__ */ new Map()
		});
		var linkTableCells = linkTables.get(linkTable.table.id).cells;
		Object.values(linkTable.cells).forEach((cell) => {
			var cellKey = generateKey({
				recordId: cell.recordId,
				fieldId: cell.field.getId()
			});
			if (!linkTableCells.has(cellKey)) linkTableCells.set(cellKey, {
				recordId: cell.recordId,
				field: cell.field,
				patch: {
					adds: [],
					removes: []
				}
			});
			var currentCell = linkTableCells.get(cellKey);
			var oldCellValue = cell.field.getCellValue(cell.recordId);
			var oldCellRecordIds = new Set(patchToRecordIds(oldCellValue));
			cell.removes.forEach((willRemovedId) => {
				if (!oldCellRecordIds.has(willRemovedId)) {
					logger.error(`[two-way-link][remove]: [${linkTable.table.id}][${linkTable.table.getTitle()}] [${cellKey}] doesn't have ${willRemovedId}`);
					return;
				}
				var targetIndex = [...oldCellRecordIds].indexOf(willRemovedId);
				currentCell.patch.removes.push({
					index: targetIndex,
					item: willRemovedId,
					type: OperationType.remove
				});
				oldCellRecordIds.delete(willRemovedId);
			});
			var removedCount = oldCellRecordIds.size;
			var addedIds = /* @__PURE__ */ new Set();
			cell.adds.forEach((willAddId, index) => {
				if (oldCellRecordIds.has(willAddId)) {
					logger.error(`[two-way-link][add]: [${linkTable.table.id}][${linkTable.table.getTitle()}] [${cellKey}] oldRecordIds already has ${willAddId}`);
					return;
				}
				if (addedIds.has(willAddId)) {
					logger.error(`[two-way-link][add]: [${linkTable.table.id}] [${linkTable.table.getTitle()}] [${cellKey}] adds already has ${willAddId}`);
					return;
				}
				currentCell.patch.adds.push({
					index: removedCount + index,
					item: willAddId,
					type: OperationType.add
				});
				addedIds.add(willAddId);
			});
		});
	});
	var result = {};
	linkTables.forEach((value, key) => {
		result[key] = {
			table: value.table,
			cells: Object.fromEntries(value.cells)
		};
	});
	return result;
}
/**
* 根据当前双关单元格中的 patch 改动
* 生成 linkTable 中 linkField 相关单元格的改动 adds & removes 收集到 tables 中
* 此时还没确定 index
*/ function generateLinkCellAddsAndRemoves(params) {
	var { tables, patch, recordId, linkField, linkTableId, currentTable } = params;
	var linkTable = tables[linkTableId];
	var linkTableCells = linkTable.cells;
	traversePatch(optimizePatch(patch), (operation) => {
		var isAdd = operation.type === OperationType.add;
		var linkRecordId = operation.item;
		var cellKey = generateKey({
			recordId: linkRecordId,
			fieldId: linkField.getId()
		});
		if (currentTable.table.id === linkTableId && currentTable.cells[cellKey]) return;
		if (!linkTable.table.getRecordByRecordId(linkRecordId)) return;
		if (!linkTableCells[cellKey]) linkTableCells[cellKey] = {
			recordId: linkRecordId,
			field: linkField,
			adds: [],
			removes: []
		};
		if (isAdd) {
			linkTableCells[cellKey].adds.push(recordId);
			return;
		}
		linkTableCells[cellKey].removes.push(recordId);
	});
}
function generateKey(params) {
	var { recordId, fieldId } = params;
	return `${recordId}-${fieldId}`;
}
var init_collect_two_way_link_records = __esmMin((() => {
	init_es();
	init_field_interface();
	init_operation_interface();
	init_two_way_link_records();
	init_get_two_way_link_field();
	init_set_records();
	init_env();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-core/es/request/utils/delete-record.js
/**
* 删除行，如果表格内有双向关联列
* 需要将关联了被删除的行的单元格进行解除关联。
* 例：A 表双向关联了 B 表; 行 a 双向关联了行 b
* A 表删除了行 a
* 需要找到 行 b 对 行 a 解除关联。
*/ function deleteRecords(params) {
	var { table, base, recordIds } = params;
	var currentTableWithCells = {
		table,
		cells: {}
	};
	table.getFields().forEach((field) => {
		if (field.type !== FieldType.TWO_WAY_LINK_RECORDS) return;
		recordIds.forEach((recordId) => {
			var cellValue = field.getCellValue(recordId);
			if (cellValue === null) return;
			var newPatch = {
				adds: [],
				removes: applyPatchAndFix([], cellValue).map((removeId, index) => ({
					index,
					item: removeId,
					type: OperationType.remove
				}))
			};
			var key = generateKey({
				recordId,
				fieldId: field.getId()
			});
			currentTableWithCells.cells[key] = {
				recordId,
				field,
				patch: newPatch
			};
		});
	});
	return getTwoWayLinkRecordsCell({
		base,
		currentTable: currentTableWithCells
	});
}
function checkLinkTableLoaded(table, base) {
	var fields = table.getFields();
	var loadTableList = [];
	for (var field of fields) {
		if (field.type !== FieldType.TWO_WAY_LINK_RECORDS) continue;
		var { tableId: linkTableId } = field.getCorrectedLinkOptions();
		var linkTable = base.getTableByTableId(linkTableId);
		if (!linkTable) continue;
		if (!linkTable.isInited()) loadTableList.push(linkTableId);
	}
	if (loadTableList.length) return {
		isSuccess: false,
		type: "table-unloaded",
		tableIds: loadTableList
	};
	return { isSuccess: true };
}
var init_delete_record = __esmMin((() => {
	init_field_interface();
	init_diff_array();
	init_operation_interface();
	init_collect_two_way_link_records();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-core/es/request/record/interface.js
var Direction;
var init_interface$1 = __esmMin((() => {
	(function(Direction) {
		Direction["DOWN"] = "DOWN";
		Direction["UP"] = "UP";
	})(Direction || (Direction = {}));
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-core/es/request/utils/generate-record-delta-by-group-record-patch.js
/**
* 根据 groupRecordPatch 获取 recordDelta
* @returns
*/ function generateRecordDeltaByGroupRecordPatch({ viewModel, currentUserId, recordId, groupRecordPatch }) {
	var delta = {};
	var groupField = viewModel.getGroupField();
	var groupFieldId = groupField.getId();
	var groupFieldType = groupField.getType();
	delta[groupFieldId] = {
		type: groupFieldType,
		value: getFinalCellValue({
			viewModel,
			currentCellValue: groupField === null || groupField === void 0 ? void 0 : groupField.getCellValue(recordId),
			groupFieldType,
			groupRecordPatch
		}),
		modifiedUserId: currentUserId
	};
	return delta;
}
function getFinalCellValue({ viewModel, currentCellValue, groupFieldType, groupRecordPatch }) {
	var { groupValues, groupIds } = viewModel.getGroups();
	var addGroupPaths = groupRecordPatch.adds;
	var removeGroupPaths = groupRecordPatch.removes;
	if (addGroupPaths.includes(null)) return null;
	var finalValue = [];
	var currentValues = [];
	if (currentCellValue && groupFieldType === FieldType.TWO_WAY_LINK_RECORDS) currentValues = applyPatchAndFix([], currentCellValue);
	else if (currentCellValue && (currentCellValue === null || currentCellValue === void 0 ? void 0 : currentCellValue.length) > 0) currentValues = isUserField(groupFieldType) ? currentCellValue.map((item) => item.id) : currentCellValue;
	groupIds.forEach((groupId) => {
		if (groupId === null) return;
		if (removeGroupPaths.includes(groupId)) return;
		if (addGroupPaths.includes(groupId) || currentValues.indexOf(groupId) > -1) {
			var targetValue = isUserField(groupFieldType) ? groupValues.get(groupId).data[0] : groupId;
			finalValue.push(targetValue);
			return;
		}
	});
	return finalValue;
}
var init_generate_record_delta_by_group_record_patch = __esmMin((() => {
	init_is_user_field();
	init_field_interface();
	init_diff_array();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-core/es/request/utils/set-field-attributes.js
/**
* 计算出删除不存在选项后的 filter conditions
*/ function clearFilterOption(conditions, fieldId, deleteOptions) {
	var isChange = false;
	return {
		newConditions: conditions.reduce((conditions, condition) => {
			if (condition.type === FilterConditionType.GROUP) {
				var clearResult = clearFilterOption(condition.filterInfo.conditions, fieldId, deleteOptions);
				if (clearResult.isChange) isChange = true;
				var newCondition = {
					type: FilterConditionType.GROUP,
					filterInfo: Object.assign(Object.assign({}, condition.filterInfo), { conditions: clearResult.newConditions })
				};
				conditions.push(newCondition);
				return conditions;
			}
			if (fieldId !== condition.fieldId) {
				conditions.push(condition);
				return conditions;
			}
			var newValue = [...condition.value || []];
			logger.info("typeof condition value is =", condition.value && typeof condition.value, condition.value);
			deleteOptions.forEach((option) => {
				if (newValue.includes(option)) {
					newValue.splice(newValue.indexOf(option), 1);
					isChange = true;
				}
			});
			conditions.push(Object.assign(Object.assign({}, condition), { value: newValue.length ? newValue : null }));
			return conditions;
		}, []),
		isChange
	};
}
/**
* 计算出删除不存在选项后的 filter conditions
*/ function clearViewColorFilterOption(fieldId, deleteOptions, conditions) {
	var isChange = false;
	if (!conditions) return {
		newConditions: [],
		isChange
	};
	return {
		newConditions: conditions.reduce((conditions, condition) => {
			if (fieldId !== condition.fieldId || condition.type === ViewColorConditionType.VIEW_COLOR_CONDITION_TYPE_COLUMN) {
				conditions.push(condition);
				return conditions;
			}
			var newValue = [...condition.value || []];
			deleteOptions.forEach((option) => {
				if (newValue.includes(option)) {
					newValue.splice(newValue.indexOf(option), 1);
					isChange = true;
				}
			});
			if (condition.operator) conditions.push(Object.assign(Object.assign({}, condition), { value: newValue.length ? newValue : null }));
			return conditions;
		}, []),
		isChange
	};
}
var init_set_field_attributes = __esmMin((() => {
	require_cloneDeep();
	require_isEqual();
	init_es();
	init_field_interface();
	init_color_config_interface();
	init_filter_info_interface();
	FieldType.SINGLE_SELECT, FieldType.MULTIPLE_SELECT;
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-core/es/request/field/interface.js
var TwoWayLinkRecordsActionType;
var init_interface = __esmMin((() => {
	(function(TwoWayLinkRecordsActionType) {
		TwoWayLinkRecordsActionType["Delete"] = "delete";
		TwoWayLinkRecordsActionType["Transform"] = "transform";
	})(TwoWayLinkRecordsActionType || (TwoWayLinkRecordsActionType = {}));
}));
//#endregion
export { init_calc_last_sorted_index as C, init_date as D, getAllDateFieldRelatedDateViewsByFieldId as E, init_dashboard as O, calcLastSortedIndex as S, init_table_json_convertor as T, init_collect_two_way_link_records as _, init_set_field_attributes as a, calcPositionsAfterInsertComponent as b, Direction as c, deleteRecords as d, init_delete_record as f, getTwoWayLinkRecordsCell as g, generateTableWithCells as h, clearViewColorFilterOption as i, init_interface$1 as l, generateKey as m, init_interface as n, generateRecordDeltaByGroupRecordPatch as o, generateExtraSetRecordsMutations as p, clearFilterOption as r, init_generate_record_delta_by_group_record_patch as s, TwoWayLinkRecordsActionType as t, checkLinkTableLoaded as u, calcPositionsAfterCopyComponent as v, generateTableJSON as w, init_calc_dashboard_positions as x, calcPositionsAfterDeleteComponent as y };
