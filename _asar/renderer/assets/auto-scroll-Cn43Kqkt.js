import { n as __esmMin, s as __toESM, t as __commonJSMin } from "./chunk-BRZcfu7K.js";
import { l as __rest, p as init_tslib_es6 } from "./tslib.es6-8NkKEYUK.js";
import { Dn as require_main, xn as require_dayjs_min } from "./esm-cVQVEiWG.js";
import { $l as init_es, $u as dom, Ac as getFormulaError, As as DEFAULT_TEXT_FORMAT, Cd as getI18nLanguage, Fl as DefaultConfig, Fu as getVirtualSizeBySize, Is as require_zh_cn, Ja as isAllSuccess, Ka as formattedLookupCell, Mu as getRealSizeByVirtualSize, Nu as getThumbnailFixedHeight, Pc as isFormulaLoadingErrorType, Pu as getThumbnailUrl, Ra as getErrorCell, Rc as isFormulaLikeField, Sd as SupportedLanguages, Vl as ViewType, Xu as domainConfig, Ya as isSingleType, Yu as logger, cc as getRenderCorpInfoByCorpName, da as getHyperlinkTypeByFileInfo, fu as isDarkMode, js as TextType, ku as getAttachmentThumbUrl, oa as LinkType, ql as FieldType, tc as CheckboxIconType, ua as HyperlinkType, wd as i18n, xu as getSelectOptionStyleConfig } from "./execution-result-erkS5q1j.js";
import { n as init_esm, r as ua } from "./esm-mgJiqgJI.js";
import { c as require_cloneDeep } from "./merge-vXYl4M0x.js";
import { Ht as getHyperlinkTypeFromTob, r as attachmentPreviewImageLoader, t as init_es$1, zt as isGroupStandardCellData } from "./es-BQsslXL1.js";
import { $ as measureTextWidth, Dt as init_checkbox_icon, E as wbColors, Et as getCheckboxIconAliasIndex, G as resourceLoader, H as pen, K as init_lib, O as getOptionStyleWithDarkMode, Q as init_measurer, S as init_icon, T as init_color, Tt as CheckboxType, U as init_resources, V as init_pen, W as registerIconSrcMap, X as DrawType, Y as Level, _t as init_normal_icon, bt as init_ai_alias, ct as HyperlinkTypeIcons, dt as getHyperLinkTypeIconAlias, ft as init_hyperlink_icon, k as init_get_block_style, lt as generateHyperlinkType, pt as NormalIconAlias, ut as generateHyperlinkTypeToc, v as WbSharedConfig, vt as init_style, w as toThemedKanbanTodoIconAlias, wt as CheckboxIconsMapList, xt as svgToBase64, y as init_wb_config, yt as style } from "./canvas-view-DDuMsrmC.js";
//#region ../../node_modules/@tencent/xtable-view/es/field-collector/common/constants.js
var LabelTypes;
var init_constants = __esmMin((() => {
	init_es$1();
	LabelTypes = [
		FieldType.SINGLE_SELECT,
		FieldType.MULTIPLE_SELECT,
		FieldType.LINK_RECORDS,
		FieldType.TWO_WAY_LINK_RECORDS,
		FieldType.USER,
		FieldType.USER_C,
		FieldType.ATTACHMENT,
		FieldType.GROUP_B
	];
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/field-collector/common/abstract.js
var BaseFieldCollector;
var init_abstract = __esmMin((() => {
	BaseFieldCollector = function BaseFieldCollector() {
		"use strict";
	};
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/field-collector/common/label.js
function _inherits$13(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$13(subClass, superClass);
}
function _set_prototype_of$13(o, p) {
	_set_prototype_of$13 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$13(o, p);
}
var initX, initY, minLabelWidth, AVATAR_FALLBACK_RECT_ID, LabelFieldCollector;
var init_label = __esmMin((() => {
	init_es$1();
	init_abstract();
	init_lib();
	init_measurer();
	init_pen();
	init_style();
	initX = 1;
	initY = 1;
	minLabelWidth = 35;
	AVATAR_FALLBACK_RECT_ID = "label-avatar-fallback";
	LabelFieldCollector = /* @__PURE__ */ function(BaseFieldCollector) {
		"use strict";
		_inherits$13(LabelFieldCollector, BaseFieldCollector);
		function LabelFieldCollector() {
			var _this = BaseFieldCollector.apply(this, arguments) || this;
			_this.textWidthCache = /* @__PURE__ */ new Map();
			return _this;
		}
		var _proto = LabelFieldCollector.prototype;
		_proto.measureWidth = function measureWidth(drawConfigs, measureConfig) {
			var rects = this.getMeasurableRects(drawConfigs);
			var firstRect = rects[0];
			var lastRect = rects[rects.length - 1];
			if (!firstRect || !lastRect) return 0;
			var firstRectStartX = firstRect.x;
			var totalLabelWidth = lastRect.x + lastRect.width - firstRectStartX;
			if (!measureConfig) return totalLabelWidth;
			return this.measureAdaptiveColumnWidth({
				totalLabelWidth,
				drawConfigs: rects,
				measureConfig
			});
		};
		_proto.measureHeight = function measureHeight(drawConfigs) {
			var rects = this.getMeasurableRects(drawConfigs);
			var firstRect = rects[0];
			var lastRect = rects[rects.length - 1];
			if (!firstRect || !lastRect) return 0;
			var firstRectStartY = firstRect.y;
			return lastRect.y + lastRect.height - firstRectStartY;
		};
		_proto.collect = function collect(rect, standardCell, collectConfig) {
			var startX = rect.x;
			var startY = rect.y;
			var drawConfigs = [];
			this.getRenderLabels(standardCell.data, collectConfig, rect).forEach((renderLabel) => {
				var { option, rect: _$rect } = renderLabel;
				var outerRect = {
					x: startX + _$rect.x,
					y: startY + _$rect.y,
					width: _$rect.width,
					height: _$rect.height
				};
				var textX = outerRect.x + option.paddingH;
				var textWidth = outerRect.width - option.paddingH;
				var iconMarginH = option.iconMarginH || 0;
				var hasFallbackAvatar = option.avatarText !== void 0 && option.avatarBackground !== void 0;
				var iconRect = {
					x: outerRect.x + iconMarginH,
					y: outerRect.y + (outerRect.height - option.iconSize) / 2,
					width: option.iconSize,
					height: option.iconSize,
					borderRadius: option.iconBorderRadius
				};
				if (this.hasFrontAvatar(option)) {
					if (option.iconAlias) drawConfigs.push(pen.config.icon(option.iconAlias, iconRect));
					else if (option.iconUrl) drawConfigs.push(pen.config.image(option.iconUrl, iconRect));
					textX = iconRect.x + iconRect.width + iconMarginH;
					textWidth -= iconRect.width + iconMarginH * 2;
				}
				drawConfigs.push(pen.config.rect(Object.assign(Object.assign({}, outerRect), {
					level: Level.L2,
					borderColor: option.borderColor,
					borderRadius: option.borderRadius,
					background: option.background,
					extraInfo: renderLabel.extraInfo
				})));
				if (hasFallbackAvatar) {
					drawConfigs.push(pen.config.rect({
						x: iconRect.x,
						y: iconRect.y,
						width: iconRect.width,
						height: iconRect.height,
						id: AVATAR_FALLBACK_RECT_ID,
						level: Level.L2,
						borderColor: "transparent",
						borderRadius: option.iconSize / 2,
						background: option.avatarBackground
					}));
					drawConfigs.push(pen.config.text({
						x: iconRect.x,
						y: iconRect.y,
						width: iconRect.width,
						height: iconRect.height,
						text: option.avatarText,
						color: style.color.normalBackground,
						fontSize: Math.round(option.iconSize / 2),
						fontStyle: "500",
						align: "center",
						verticalAlign: "middle",
						wrap: "none",
						ellipsis: true
					}));
				}
				if (option.deleteIcon) textWidth -= option.iconSize;
				drawConfigs.push(pen.config.text(Object.assign(Object.assign(Object.assign({}, collectConfig.textConfig), outerRect), {
					width: textWidth,
					x: textX,
					text: option.text,
					color: option.fontColor,
					fontSize: option.fontSize,
					fontStyle: option.fontStyle,
					verticalAlign: "middle",
					wrap: "none"
				})));
				if (option.suffix && option.suffixMargin) {
					var textPrefixWidth = measureTextWidth({
						text: option.text,
						fontSize: option.fontSize,
						fontStyle: option.fontStyle
					}, textWidth);
					var renderContentWidth = Math.min(textPrefixWidth, textWidth);
					var renderSuffixWidth = textWidth - renderContentWidth;
					drawConfigs.push(pen.config.text(Object.assign(Object.assign(Object.assign({}, collectConfig.textConfig), outerRect), {
						text: option.suffix,
						color: option.suffixFontColor,
						width: renderSuffixWidth,
						x: textX + renderContentWidth + option.suffixMargin,
						fontSize: option.fontSize,
						fontStyle: option.fontStyle,
						verticalAlign: "middle",
						wrap: "none"
					})));
				}
				if (option.deleteIcon) {
					var iconOption = {
						id: option.deleteIcon,
						x: outerRect.x + outerRect.width - option.iconSize,
						y: outerRect.y + (outerRect.height - option.iconSize) / 2,
						width: option.iconSize,
						height: option.iconSize
					};
					drawConfigs.push(pen.config.icon(option.deleteIcon, iconOption));
				}
			});
			return drawConfigs;
		};
		_proto.mergeOptionConfig = function mergeOptionConfig(collectConfig, customOption) {
			var { labelConfig } = collectConfig;
			var labelOption = Object.assign(Object.assign({}, LabelFieldCollector.defaultLabelOption), customOption);
			if (labelConfig.fontSize) labelOption.fontSize = labelConfig.fontSize;
			if (labelConfig.tagHeight) labelOption.height = labelConfig.tagHeight;
			if (labelConfig.fontStyle) labelOption.fontStyle = labelConfig.fontStyle;
			return labelOption;
		};
		_proto.getRenderLabels = function getRenderLabels(cellDatas, collectConfig, rect) {
			var { labels, wraps } = this.getLabelAndWraps(cellDatas, collectConfig, rect);
			return this.getDisplayLabels(labels, wraps);
		};
		_proto.getLabelAndWraps = function getLabelAndWraps(cellDatas, collectConfig, rect) {
			var maxWidth = rect.width;
			var maxLines = collectConfig.labelConfig.canWrap ? collectConfig.maxLines : 1;
			var options = this.getLabelOptions(cellDatas, collectConfig);
			var labels = this.getLabels(options, maxWidth);
			return {
				labels,
				wraps: this.getWraps(labels, rect, maxWidth, maxLines)
			};
		};
		_proto.getLabels = function getLabels(options, maxWidth = 0) {
			return options.map((option) => ({
				option,
				rect: {
					x: 0,
					y: 0,
					height: option.height,
					width: Math.ceil(this.getOptionWidth(option, maxWidth))
				}
			}));
		};
		/**
		* 获取标签的宽度
		* 文字宽度 + 左右边距
		*/ _proto.getOptionWidth = function getOptionWidth(option, maxWidth = 0) {
			var useCache = !maxWidth;
			var { text, fontSize, fontStyle, marginH } = option;
			var nonTextTakeWidth = this.getOptionNonTextTakeWidth(option);
			var labelKey = `${text}/${fontSize}/${fontStyle}`;
			var cacheTextWidth = this.textWidthCache.get(labelKey);
			if (useCache && cacheTextWidth) return cacheTextWidth;
			var textWidth = pen.util.measureTextWidth(text, fontSize, fontStyle, maxWidth);
			var suffixTextWidth = 0;
			if (option.suffix) suffixTextWidth = pen.util.measureTextWidth(option.suffix, fontSize, fontStyle, maxWidth);
			var renderWidth = textWidth + nonTextTakeWidth + suffixTextWidth;
			if (useCache) this.textWidthCache.set(labelKey, renderWidth);
			if (maxWidth) return Math.min(maxWidth - marginH, renderWidth);
			return renderWidth;
		};
		/**
		* 获取选项除了文字外所需的宽度
		*/ _proto.getOptionNonTextTakeWidth = function getOptionNonTextTakeWidth(option) {
			var iconTakeWidth = 0;
			var deleteIconTakeWidth = 0;
			var twoSidePadding = option.paddingH * 2;
			var suffixTakeWidth = 0;
			var hasFrontIcon = this.hasFrontAvatar(option);
			var hasBackIcon = option.deleteIcon;
			if (hasFrontIcon) {
				twoSidePadding -= option.paddingH;
				iconTakeWidth = option.iconSize + 2 * (option.iconMarginH || 0);
			}
			if (option.deleteIcon) {
				twoSidePadding -= option.paddingH;
				deleteIconTakeWidth = option.deleteIcon ? option.iconSize : 0;
			}
			if (hasFrontIcon && hasBackIcon) twoSidePadding += option.paddingH;
			if (option.suffixMargin !== void 0) suffixTakeWidth = option.suffixMargin;
			return twoSidePadding + deleteIconTakeWidth + iconTakeWidth + suffixTakeWidth;
		};
		/**
		* 获取 label 的多行排版结构
		* 类似于：[[0,1,2],[3],[4]]
		*/ _proto.getWraps = function getWraps(labels, rect, maxWidth, maxLines) {
			var totalCoverWidth = initX;
			var lineWraps = [];
			var currentLine = [];
			var undisplayedLabel = labels.length;
			for (var index = 0; index < labels.length; index++) {
				var label = labels[index];
				var tagCoverWidth = label.rect.width + label.option.marginH;
				if (!(tagCoverWidth + totalCoverWidth > rect.width + label.option.marginH)) {
					totalCoverWidth += tagCoverWidth;
					currentLine.push(labels[index]);
					undisplayedLabel -= 1;
					continue;
				}
				if (lineWraps.length + 1 === maxLines) {
					currentLine.push(labels[index]);
					undisplayedLabel -= 1;
					var lastLine = currentLine.slice();
					var lastLineWrapWithOverFlowLabel = this.getLastLineWrapWithOverFlowLabel(lastLine, undisplayedLabel, rect.width);
					lineWraps.push(lastLineWrapWithOverFlowLabel);
					currentLine.length = 0;
					break;
				}
				if (!currentLine.length) {
					currentLine.push(labels[index]);
					undisplayedLabel -= 1;
					continue;
				}
				lineWraps.push(currentLine.slice());
				currentLine.length = 0;
				currentLine.push(labels[index]);
				undisplayedLabel -= 1;
				totalCoverWidth = tagCoverWidth;
			}
			if (currentLine.length) lineWraps.push(currentLine.slice());
			return lineWraps;
		};
		/**
		* 获取显示的 labels，包括位置信息（x, y）
		*/ _proto.getDisplayLabels = function getDisplayLabels(labels, lineWraps) {
			if (!labels.length) return [];
			var labelHeight = labels[0].option.height;
			var labelMargin = labels[0].option.marginH;
			var startX = initX;
			var startY = initY;
			var renderLabels = [];
			lineWraps.forEach((lineIndexes, index) => {
				var line = index + 1;
				lineIndexes.forEach((label) => {
					label.rect.x = startX;
					label.rect.y = startY;
					startX += label.rect.width + labelMargin;
					renderLabels.push(label);
				});
				startX = initX;
				startY = line * (labelHeight + labelMargin) + initY;
			});
			return renderLabels;
		};
		_proto.getLastLineWrapWithOverFlowLabel = function getLastLineWrapWithOverFlowLabel(lastLine, undisplayedLabel, rectWidth) {
			var lastLineWithOverFlowLabel = [];
			var currentUndisplayedLabel = undisplayedLabel + lastLine.length;
			var canUsedWidth = rectWidth;
			var overFlowLabelOption = Object.assign(Object.assign({}, LabelFieldCollector.defaultLabelOption), { text: "" });
			for (var label of lastLine) {
				currentUndisplayedLabel -= 1;
				overFlowLabelOption.text = `+${currentUndisplayedLabel}`;
				var overFlowLabelWidth = this.getOptionWidth(overFlowLabelOption);
				var tagCoverWidth = label.rect.width + label.option.marginH;
				if (!(tagCoverWidth + overFlowLabelWidth + label.option.marginH > canUsedWidth)) {
					canUsedWidth -= tagCoverWidth;
					lastLineWithOverFlowLabel.push(label);
					continue;
				}
				canUsedWidth = currentUndisplayedLabel === 0 ? canUsedWidth - label.option.marginH : canUsedWidth - overFlowLabelWidth - label.option.marginH;
				if (canUsedWidth >= minLabelWidth) {
					var newLabelWidth = this.getOptionWidth(label.option, canUsedWidth);
					lastLineWithOverFlowLabel.push({
						option: label.option,
						rect: {
							x: 0,
							y: 0,
							height: label.option.height,
							width: newLabelWidth
						}
					});
				} else {
					currentUndisplayedLabel += 1;
					overFlowLabelOption.text = `+${currentUndisplayedLabel}`;
				}
				if (currentUndisplayedLabel) lastLineWithOverFlowLabel.push({
					option: overFlowLabelOption,
					rect: {
						x: 0,
						y: 0,
						height: label.option.height,
						width: this.getOptionWidth(overFlowLabelOption)
					},
					extraInfo: currentUndisplayedLabel
				});
				break;
			}
			return lastLineWithOverFlowLabel;
		};
		_proto.measureAdaptiveColumnWidth = function measureAdaptiveColumnWidth(param) {
			var { totalLabelWidth, drawConfigs, measureConfig } = param;
			if (drawConfigs.length === 0) return 0;
			var { isDefaultHeight, rowHeight } = measureConfig;
			if (isDefaultHeight) return totalLabelWidth + 2 * style.size.cellPadding;
			var singleRectHeight = drawConfigs[0].height;
			var visualCellRows = Math.floor((rowHeight - style.size.cellPadding) / (singleRectHeight + style.size.tagMargin));
			if (drawConfigs.length <= visualCellRows) return drawConfigs.reduce((curMaxLabelWidth, currentLabel) => Math.max(curMaxLabelWidth, currentLabel.width), 0);
			var binaryDrawConfigs = this.binaryAdaptColWidth(measureConfig, singleRectHeight);
			return this.maxLabelArrColWidth(binaryDrawConfigs) + 2 * style.size.cellPadding;
		};
		_proto.binaryAdaptColWidth = function binaryAdaptColWidth(measureConfig, singleRectHeight) {
			var { rowHeight, standardCell, contentConfig } = measureConfig;
			var labelHeight = rowHeight - style.size.cellPadding;
			var low = DefaultConfig.COLUMN_MIN_WIDTH;
			var high = DefaultConfig.COLUMN_MAX_WIDTH;
			var middle = 0;
			var finalConfig = [];
			while (low <= high) {
				middle = low + Math.floor((high - low) / 2);
				var contentRect = {
					x: 0,
					y: 0,
					width: middle,
					height: Infinity
				};
				contentConfig.labelConfig.canWrap = true;
				var measureConfigs = this.collect(contentRect, standardCell, contentConfig);
				finalConfig = measureConfigs;
				var curHeight = this.measureHeight(measureConfigs);
				if (curHeight <= labelHeight && curHeight + style.size.tagMargin + singleRectHeight > labelHeight) return finalConfig;
				if (curHeight + style.size.tagMargin + singleRectHeight <= labelHeight) high = middle - 1;
				else if (curHeight > labelHeight) low = middle + 1;
			}
			return finalConfig;
		};
		_proto.maxLabelArrColWidth = function maxLabelArrColWidth(drawConfigs) {
			var sameYRectObject = this.getMeasurableRects(drawConfigs).reduce((acc, cur) => {
				var positionY = cur.y;
				if (!acc[positionY]) acc[positionY] = 0;
				acc[positionY] = Math.max(cur.x + cur.width, acc[positionY]);
				return acc;
			}, {});
			return Object.values(sameYRectObject).reduce((acc, width) => Math.max(acc, width), 0);
		};
		/**
		* 从 drawConfigs 中筛出「参与尺寸测量」的 rect：类型为 Rect 且非 fallback 头像圆形。
		* 供 measureWidth / measureHeight / maxLabelArrColWidth 复用，保证测量语义一致。
		*/ _proto.getMeasurableRects = function getMeasurableRects(drawConfigs) {
			return drawConfigs.filter((config) => config.type === DrawType.Rect && config.id !== AVATAR_FALLBACK_RECT_ID);
		};
		/**
		* 是否需要在 label 左侧绘制头像（icon / image / fallback 首字母头像任一）。
		*/ _proto.hasFrontAvatar = function hasFrontAvatar(option) {
			return Boolean(option.iconAlias || option.iconUrl || option.avatarText !== void 0 && option.avatarBackground !== void 0);
		};
		return LabelFieldCollector;
	}(BaseFieldCollector);
	LabelFieldCollector.defaultLabelOption = {
		borderColor: "transparent",
		fontSize: style.size.fontSizeNormal,
		height: style.size.tagLarge,
		marginH: style.size.tagMargin,
		paddingH: style.size.tagPaddingLeft,
		background: style.color.tagBackground,
		borderRadius: style.size.tagBorderRadius,
		iconSize: style.size.iconSmall,
		iconMarginH: style.size.tagPaddingLeft / 2
	};
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/resources/wb-icons/attachment.js
function getFileExtension(fileName) {
	var _a, _b, _c;
	if (typeof fileName !== "string") return "";
	var normalized = (_b = (_a = fileName.split(/[?#]/)[0]) === null || _a === void 0 ? void 0 : _a.trim().toLowerCase()) !== null && _b !== void 0 ? _b : "";
	var lastSegment = (_c = normalized.split(/[\\/]/).pop()) !== null && _c !== void 0 ? _c : normalized;
	var dotIndex = lastSegment.lastIndexOf(".");
	return dotIndex >= 0 ? lastSegment.slice(dotIndex + 1) : "";
}
/**
* 根据文件名/路径推断图标 kind。
* folder 不在这里推断（文件夹没有扩展名），需要调用方显式传入 `kind="folder"`。
*/ function getWbAttachmentIconKind(fileName) {
	var ext = getFileExtension(fileName);
	if (ext === "pdf") return "pdf";
	if (ext === "doc" || ext === "docx") return "word";
	if (ext === "ppt" || ext === "pptx") return "presentation";
	if (ext === "xls" || ext === "xlsx" || ext === "csv") return "spreadsheet";
	if (ext === "md" || ext === "markdown") return "markdown";
	if (ext === "drawio" || ext === "dio") return "drawio";
	if (IMAGE_EXTS.has(ext)) return "image";
	if (VIDEO_EXTS.has(ext)) return "video";
	if (AUDIO_EXTS.has(ext)) return "audio";
	if (ext === "html" || ext === "htm" || CODE_EXTS.has(ext)) return "code";
	return "default";
}
/**
* **本地上传链路防御逻辑** —— 对齐 WorkBuddy `project-plan-attachment-list.tsx` 的
* `getFileNameForIcon`（L108–137）。
*
* 为什么需要：本地文件上传链路里，`fileExt` 字段可能写的是 MIME（如 `"text/html"`）
* 而不是扩展名（`"html"`）。直接拼 `${name}.${fileExt}` = `"index.html.text/html"`，
* 送到 `getWbAttachmentIconKind` 会被 `split('/')` 切坏、最终回落 default 灰图标。
*
* 优先级：
* 1. `name` 自带扩展名（最后一个 `.` 后是纯 `[a-z0-9]{1,}`）→ 直接用 name，忽略 fileExt；
* 2. `name` 没扩展名 → 用 `fileExt` 兜底，但要求 fileExt 是"干净扩展名"
*    （无 `/`、无空白、长度 ≤ 6、纯 `[a-z0-9]`），否则视为 MIME 忽略。
*/ function getFileNameForWbAttachmentIcon(attachment) {
	var _a, _b, _c, _d, _e;
	var baseName = ((_b = (_a = attachment.name) !== null && _a !== void 0 ? _a : attachment.externalId) !== null && _b !== void 0 ? _b : "").trim();
	var lastSegment = (_c = baseName.split(/[\\/]/).pop()) !== null && _c !== void 0 ? _c : "";
	var dotIndex = lastSegment.lastIndexOf(".");
	if (dotIndex > 0 && dotIndex < lastSegment.length - 1 && /^[a-z0-9]+$/i.test(lastSegment.slice(dotIndex + 1))) return baseName;
	var rawFileExt = (_e = (_d = attachment.fileExt) === null || _d === void 0 ? void 0 : _d.replace(/^\./, "").trim()) !== null && _e !== void 0 ? _e : "";
	if (!(rawFileExt.length > 0 && rawFileExt.length <= 6 && /^[a-z0-9]+$/i.test(rawFileExt))) return baseName;
	return baseName ? `${baseName}.${rawFileExt}` : `attachment.${rawFileExt}`;
}
/**
* 给定一条 attachment，返回 wb 附件图标 alias（可直接喂 `pen.config.icon(alias)`）。
*
* 内部两步：
* 1. `getFileNameForWbAttachmentIcon` 处理 `fileExt` 是 MIME 的防御场景；
* 2. `getWbAttachmentIconKind` 按扩展名推断 kind；
* 3. 用 `WB_ATTACHMENT_KIND_TO_ALIAS` 分发到 alias。
*
* 特殊情形调用方可自行短路：
* - 文件夹场景直接传 `WbAttachmentIconAlias.FOLDER`（附件字段 collector 无此场景）。
*/ function getWbAttachmentIconAlias(attachment) {
	return WB_ATTACHMENT_KIND_TO_ALIAS[getWbAttachmentIconKind(getFileNameForWbAttachmentIcon(attachment))];
}
var IMAGE_EXTS, VIDEO_EXTS, AUDIO_EXTS, CODE_EXTS, PdfSvg, WordSvg, SpreadsheetSvg, PresentationSvg, MarkdownSvg, CodeSvg, DrawioSvg, ImageSvg, VideoSvg, AudioSvg, FolderSvg, UnknownSvg, WbAttachmentIconAlias, WB_ATTACHMENT_KIND_TO_ALIAS, WbAttachmentIconSrc;
var init_attachment$1 = __esmMin((() => {
	init_ai_alias();
	init_resources();
	IMAGE_EXTS = new Set([
		"png",
		"jpg",
		"jpeg",
		"gif",
		"webp",
		"svg",
		"bmp",
		"ico",
		"tiff",
		"tif",
		"avif",
		"heic"
	]);
	VIDEO_EXTS = new Set([
		"mp4",
		"mov",
		"avi",
		"mkv",
		"webm",
		"m4v",
		"flv",
		"wmv"
	]);
	AUDIO_EXTS = new Set([
		"mp3",
		"wav",
		"flac",
		"ogg",
		"m4a",
		"aac",
		"wma",
		"opus"
	]);
	CODE_EXTS = new Set([
		"ts",
		"tsx",
		"js",
		"jsx",
		"mjs",
		"cjs",
		"py",
		"rb",
		"go",
		"rs",
		"java",
		"kt",
		"swift",
		"c",
		"cc",
		"cpp",
		"cxx",
		"h",
		"hh",
		"hpp",
		"cs",
		"php",
		"lua",
		"pl",
		"sh",
		"bash",
		"zsh",
		"fish",
		"ps1",
		"css",
		"scss",
		"sass",
		"less",
		"styl",
		"json",
		"json5",
		"yaml",
		"yml",
		"toml",
		"ini",
		"xml",
		"env",
		"sql",
		"graphql",
		"gql",
		"proto",
		"vue",
		"svelte",
		"astro",
		"r",
		"m",
		"scala",
		"dart",
		"ex",
		"exs",
		"erl"
	]);
	PdfSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path fill="#E57163" transform="matrix(1 0 0 1 2 1.33333)" d="M0.6657 0C0.2983 0 0 0.296 0 0.6612L0 12.6721C0 13.0298 0.2965 13.3333 0.6623 13.3333L11.3377 13.3333C11.7034 13.3333 12 13.0326 12 12.6617L11.9998 3.3333L8.6667 0L0.6657 0ZM5 3.6667L6.3333 3.6667C6.3333 5.3266 7.7624 7.1069 9.5441 7.7009L9.2391 8.9933C7.1489 8.6947 4.9881 9.5869 3.0365 10.8881L2.2502 9.8127C2.9743 9.2335 3.6686 8.2505 4.1833 7.1023C4.6962 5.9582 5 4.7183 5 3.6667ZM5.4 7.6477C5.5782 7.2501 5.7362 6.8375 5.8691 6.419C6.1836 6.9021 6.5702 7.3455 7.0068 7.7302C6.3523 7.8474 5.7111 8.0397 5.0902 8.2851C5.2 8.0762 5.3034 7.8632 5.4 7.6477Z"/></svg>`;
	WordSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path fill="#528AE3" transform="matrix(1 0 0 1 2 1.33333)" d="M8.6667 0L12 3.3333L12 12.6721C12 13.0373 11.7034 13.3333 11.3377 13.3333L0.6623 13.3333C0.2965 13.3333 0 13.0298 0 12.6721L0 0.6612C0 0.296 0.2966 0 0.6623 0L8.6667 0ZM7.3333 4L7.3333 7.326L6 6L4.6739 7.3333L4.6667 4L3.3333 4L3.3333 9.3333L4.6667 9.3333L6 8L7.3333 9.3333L8.6667 9.3333L8.6667 4L7.3333 4Z"/></svg>`;
	SpreadsheetSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path fill="#49AB69" transform="matrix(1 0 0 1 1.66666 0.999997)" d="M12.6667 6.4526C12.6667 5.6429 12.6667 5.2381 12.5171 4.8733C12.3675 4.5086 12.0832 4.2204 11.5146 3.6439L9.0958 1.1913C8.5163 0.6036 8.2265 0.3098 7.8562 0.1549C7.4858 0 7.0732 0 6.2478 0L4.6667 0C2.4759 0 1.3737 -0.0068 0.6834 0.6834C-0.0068 1.3737 0 2.4759 0 4.6667L0 9.3333C0 11.5241 -0.0068 12.6263 0.6834 13.3166C1.3737 14.0068 2.4759 14 4.6667 14L8 14C10.1908 14 11.293 14.0068 11.9832 13.3166C12.6735 12.6263 12.6667 11.5241 12.6667 9.3333L12.6667 6.4526Z"/><g opacity="0.5"><path fill="#8FF57A" transform="matrix(1 0 0 1 6.4668 1)" d="M7.8649 5.4766C7.8617 5.3089 7.8522 5.1927 7.8257 5.0811C7.7894 4.9289 7.7297 4.783 7.6484 4.6491C7.5568 4.4979 7.4287 4.368 7.1724 4.1081L3.8289 0.7179C3.5677 0.453 3.437 0.3205 3.284 0.2257C3.1486 0.1419 3.0005 0.0799 2.8456 0.0423C2.6707 0 2.4847 0 2.1126 0L0 0L0 0.0067L1.5067 0.0067L1.5272 0.0067C2.2209 0.0067 2.5719 0.0067 2.7926 0.2274C3.0133 0.4479 3.0133 0.7992 3.0133 1.4928L3.0133 1.5133L3.0133 1.89L3.0133 1.9312C3.0133 3.3185 3.0133 4.0207 3.4546 4.4621C3.896 4.9033 4.5981 4.9033 5.9855 4.9033L6.0267 4.9033L6.4033 4.9033L6.4238 4.9033C7.1175 4.9033 7.4688 4.9033 7.6893 5.124C7.7799 5.2145 7.8333 5.3271 7.8649 5.4766Z"/></g><path fill="#FFF" transform="matrix(1 0 0 1 3.85677 8.9917)" d="M8.2867 2.4012C8.2867 3.0253 7.7302 3.5312 7.0437 3.5312L4.6613 3.5312L4.6613 2.2365L8.2867 2.2365L8.2867 2.4012ZM0 3.3665C0 2.7424 0.5565 2.2365 1.243 2.2365L3.6254 2.2365L3.6254 3.5312L0 3.5312L0 3.3665ZM8.2867 0.1648C8.2867 0.7888 7.7302 1.2948 7.0437 1.2948L4.6613 1.2948L4.6613 0L8.2867 0L8.2867 0.1648ZM0 1.13C0 0.506 0.5565 0 1.243 0L3.6254 0L3.6254 1.2948L0 1.2948L0 1.13Z"/></svg>`;
	PresentationSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path fill="#D24F31" transform="matrix(1 0 0 1 2 1.33333)" d="M8.6667 0L12 3.3333L12 12.6721C12 13.0373 11.7034 13.3333 11.3377 13.3333L0.6623 13.3333C0.2965 13.3333 0 13.0298 0 12.6721L0 0.6612C0 0.296 0.2966 0 0.6623 0L8.6667 0ZM3.3333 4L3.3333 9.3333L4.6667 9.3333L4.6667 8L8.6667 8L8.6667 4L3.3333 4ZM4.6667 5.3333L7.3333 5.3333L7.3333 6.6667L4.6667 6.6667L4.6667 5.3333Z"/></svg>`;
	MarkdownSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path fill="#4AA5AD" transform="matrix(1 0 0 1 1.66666 0.999997)" d="M12.6667 6.4526C12.6667 5.6429 12.6667 5.2381 12.5171 4.8733C12.3675 4.5086 12.0832 4.2204 11.5146 3.6439L9.0958 1.1913C8.5163 0.6036 8.2265 0.3098 7.8562 0.1549C7.4858 0 7.0732 0 6.2478 0L4.6667 0C2.4759 0 1.3737 -0.0068 0.6834 0.6834C-0.0068 1.3737 0 2.4759 0 4.6667L0 9.3333C0 11.5241 -0.0068 12.6263 0.6834 13.3166C1.3737 14.0068 2.4759 14 4.6667 14L8 14C10.1908 14 11.293 14.0068 11.9832 13.3166C12.6735 12.6263 12.6667 11.5241 12.6667 9.3333L12.6667 6.4526Z"/><g opacity="0.5"><path fill="#72E2E6" transform="matrix(1 0 0 1 6.4668 1)" d="M7.8649 5.4766C7.8617 5.3089 7.8522 5.1927 7.8257 5.0811C7.7894 4.9289 7.7297 4.783 7.6484 4.6491C7.5568 4.4979 7.4287 4.368 7.1724 4.1081L3.8289 0.7179C3.5677 0.453 3.437 0.3205 3.284 0.2257C3.1486 0.1419 3.0005 0.0799 2.8456 0.0423C2.6707 0 2.4847 0 2.1126 0L0 0L0 0.0067L1.5067 0.0067L1.5272 0.0067C2.2209 0.0067 2.5719 0.0067 2.7926 0.2274C3.0133 0.4479 3.0133 0.7992 3.0133 1.4928L3.0133 1.5133L3.0133 1.89L3.0133 1.9312C3.0133 3.3185 3.0133 4.0207 3.4546 4.4621C3.896 4.9033 4.5981 4.9033 5.9855 4.9033L6.0267 4.9033L6.4033 4.9033L6.4238 4.9033C7.1175 4.9033 7.4688 4.9033 7.6893 5.124C7.7799 5.2145 7.8333 5.3271 7.8649 5.4766Z"/></g><path fill="#FFF" transform="matrix(1 0 0 1 4.61003 7.24626)" d="M0 1.2148C0 0.5622 0.5145 0.0299 1.1599 0.0012C1.1667 0.0008 1.1737 0.0005 1.1806 0.0005C1.192 0.0002 1.2033 0 1.2148 0L1.2148 0.0008C1.6818 0.0124 2.0994 0.2985 2.278 0.7322L3.39 3.431L4.502 0.7322C4.6806 0.2985 5.0982 0.0124 5.5652 0.0008L5.5652 0C5.5767 0 5.588 0.0002 5.5994 0.0005C5.6063 0.0005 5.6133 0.0008 5.6201 0.0012C6.2655 0.0299 6.78 0.5622 6.78 1.2148L6.78 5.65C6.1091 5.65 5.5652 5.1061 5.5652 4.4353L5.5652 1.3824L4.2246 4.2297C4.106 4.4815 3.8904 4.6677 3.6346 4.7522C3.5842 4.7839 3.5242 4.8025 3.4582 4.8025C3.4353 4.8025 3.4126 4.8017 3.39 4.8002C3.3674 4.8017 3.3447 4.8025 3.3218 4.8025C3.2558 4.8025 3.1958 4.7839 3.1454 4.7522C2.8896 4.6677 2.674 4.4815 2.5554 4.2297L1.2148 1.3824L1.2148 4.4353C1.2148 5.1061 0.6709 5.65 0 5.65L0 1.2148Z"/></svg>`;
	CodeSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path fill="#5A8AA4" transform="matrix(1 0 0 1 2 1.33333)" d="M8.6667 0L12 3.3333L12 12.6721C12 13.0373 11.7034 13.3333 11.3377 13.3333L0.6623 13.3333C0.2965 13.3333 0 13.0298 0 12.6721L0 0.6612C0 0.296 0.2966 0 0.6623 0L8.6667 0ZM9.7713 6.6667L7.4142 4.3096L6.4714 5.2524L7.8856 6.6667L6.4714 8.0809L7.4142 9.0237L9.7713 6.6667ZM2.2288 6.6667L4.5858 9.0237L5.5286 8.0809L4.1144 6.6667L5.5286 5.2524L4.5858 4.3096L2.2288 6.6667Z"/></svg>`;
	DrawioSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path fill="#EB9752" transform="matrix(1 0 0 1 1.66666 0.999997)" d="M12.6667 6.4526C12.6667 5.6429 12.6667 5.2381 12.5171 4.8733C12.3675 4.5086 12.0832 4.2204 11.5146 3.6439L9.0958 1.1913C8.5163 0.6036 8.2265 0.3098 7.8562 0.1549C7.4858 0 7.0732 0 6.2478 0L4.6667 0C2.4759 0 1.3737 -0.0068 0.6834 0.6834C-0.0068 1.3737 0 2.4759 0 4.6667L0 9.3333C0 11.5241 -0.0068 12.6263 0.6834 13.3166C1.3737 14.0068 2.4759 14 4.6667 14L8 14C10.1908 14 11.293 14.0068 11.9832 13.3166C12.6735 12.6263 12.6667 11.5241 12.6667 9.3333L12.6667 6.4526Z"/><g opacity="0.5"><path fill="#FFE2AB" transform="matrix(1 0 0 1 6.4668 1)" d="M7.8649 5.4766C7.8617 5.3089 7.8522 5.1927 7.8257 5.0811C7.7894 4.9289 7.7297 4.783 7.6484 4.6491C7.5568 4.4979 7.4287 4.368 7.1724 4.1081L3.8289 0.7179C3.5677 0.453 3.437 0.3205 3.284 0.2257C3.1486 0.1419 3.0005 0.0799 2.8456 0.0423C2.6707 0 2.4847 0 2.1126 0L0 0L0 0.0067L1.5067 0.0067L1.5272 0.0067C2.2209 0.0067 2.5719 0.0067 2.7926 0.2274C3.0133 0.4479 3.0133 0.7992 3.0133 1.4928L3.0133 1.5133L3.0133 1.89L3.0133 1.9312C3.0133 3.3185 3.0133 4.0207 3.4546 4.4621C3.896 4.9033 4.5981 4.9033 5.9855 4.9033L6.0267 4.9033L6.4033 4.9033L6.4238 4.9033C7.1175 4.9033 7.4688 4.9033 7.6893 5.124C7.7799 5.2145 7.8333 5.3271 7.8649 5.4766Z"/></g><path fill="#FFF" transform="matrix(1 0 0 1 4.61003 7)" d="M1.9105 0.5597C1.8854 0.6544 1.8854 0.7696 1.8854 1C1.8854 1.2304 1.8854 1.3456 1.9105 1.4403C1.9771 1.6912 2.1699 1.8907 2.4168 1.9668L1.3999 3.5783L1 3.5783C0.7696 3.5783 0.6544 3.5783 0.5597 3.6034C0.2993 3.6725 0.0942 3.8776 0.0251 4.138C0 4.2327 0 4.3479 0 4.5783C0 4.8087 0 4.9239 0.0251 5.0186C0.0942 5.279 0.2993 5.4841 0.5597 5.5532C0.6544 5.5783 0.7696 5.5783 1 5.5783L2.0133 5.5783C2.2437 5.5783 2.3589 5.5783 2.4536 5.5532C2.7141 5.4841 2.9192 5.279 2.9882 5.0186C3.0133 4.9239 3.0133 4.8087 3.0133 4.5783C3.0133 4.3479 3.0133 4.2327 2.9882 4.138C2.9192 3.8776 2.7141 3.6725 2.4536 3.6034C2.4072 3.5911 2.3559 3.5848 2.2886 3.5816L3.2866 2L3.4944 2L4.4942 3.5816C4.4266 3.5848 4.3751 3.5911 4.3286 3.6034C4.0681 3.6725 3.8631 3.8776 3.794 4.138C3.7689 4.2327 3.7689 4.3479 3.7689 4.5783C3.7689 4.8087 3.7689 4.9239 3.794 5.0186C3.8631 5.279 4.0681 5.4841 4.3286 5.5532C4.4233 5.5783 4.5385 5.5783 4.7689 5.5783L5.7822 5.5783C6.0126 5.5783 6.1278 5.5783 6.2225 5.5532C6.4829 5.4841 6.688 5.279 6.7571 5.0186C6.7822 4.9239 6.7822 4.8087 6.7822 4.5783C6.7822 4.3479 6.7822 4.2327 6.7571 4.138C6.688 3.8776 6.4829 3.6725 6.2225 3.6034C6.1278 3.5783 6.0126 3.5783 5.7822 3.5783L5.3834 3.5783L4.3651 1.9675C4.6131 1.892 4.8069 1.692 4.8736 1.4403C4.8987 1.3456 4.8988 1.2304 4.8987 1C4.8988 0.7696 4.8987 0.6544 4.8736 0.5597C4.8046 0.2993 4.5995 0.0942 4.339 0.0251C4.2443 0 4.1291 0 3.8987 0L2.8854 0C2.655 0 2.5398 0 2.4451 0.0251C2.1847 0.0942 1.9796 0.2993 1.9105 0.5597Z"/></svg>`;
	ImageSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path fill="#5484D1" transform="matrix(1 0 0 1 1.66666 0.999997)" d="M12.6667 6.4526C12.6667 5.6429 12.6667 5.2381 12.5171 4.8733C12.3675 4.5086 12.0832 4.2204 11.5146 3.6439L9.0958 1.1913C8.5163 0.6036 8.2265 0.3098 7.8562 0.1549C7.4858 0 7.0732 0 6.2478 0L4.6667 0C2.4759 0 1.3737 -0.0068 0.6834 0.6834C-0.0068 1.3737 0 2.4759 0 4.6667L0 9.3333C0 11.5241 -0.0068 12.6263 0.6834 13.3166C1.3737 14.0068 2.4759 14 4.6667 14L8 14C10.1908 14 11.293 14.0068 11.9832 13.3166C12.6735 12.6263 12.6667 11.5241 12.6667 9.3333L12.6667 6.4526Z"/><g opacity="0.5"><path fill="#A1D7FF" transform="matrix(1 0 0 1 6.4668 1)" d="M7.8649 5.4766C7.8617 5.3089 7.8522 5.1927 7.8257 5.0811C7.7894 4.9289 7.7297 4.783 7.6484 4.6491C7.5568 4.4979 7.4287 4.368 7.1724 4.1081L3.8289 0.7179C3.5677 0.453 3.437 0.3205 3.284 0.2257C3.1486 0.1419 3.0005 0.0799 2.8456 0.0423C2.6707 0 2.4847 0 2.1126 0L0 0L0 0.0067L1.5067 0.0067L1.5272 0.0067C2.2209 0.0067 2.5719 0.0067 2.7926 0.2274C3.0133 0.4479 3.0133 0.7992 3.0133 1.4928L3.0133 1.5133L3.0133 1.89L3.0133 1.9312C3.0133 3.3185 3.0133 4.0207 3.4546 4.4621C3.896 4.9033 4.5981 4.9033 5.9855 4.9033L6.0267 4.9033L6.4033 4.9033L6.4238 4.9033C7.1175 4.9033 7.4688 4.9033 7.6893 5.124C7.7799 5.2145 7.8333 5.3271 7.8649 5.4766Z"/></g><circle fill="#FFF" transform="matrix(1 0 0 1 9.13005 6.86995)" cx="1.13" cy="1.13" r="1.13"/><path fill="#FFF" transform="matrix(1 0 0 1 4.18311 8.55046)" d="M7.2282 3.9695C7.5346 3.9695 7.7128 3.6232 7.5347 3.3739L6.5937 2.0565C6.3231 1.6777 5.7772 1.6325 5.448 1.9617L5.2539 2.1558C5.0918 2.3179 4.8238 2.2988 4.6862 2.1154L3.3257 0.3013C3.0138 -0.1145 2.3845 -0.097 2.0962 0.3355L0.0639 3.3839C-0.103 3.6342 0.0765 3.9695 0.3773 3.9695L7.2282 3.9695Z"/></svg>`;
	VideoSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path fill="#49AB69" transform="matrix(1 0 0 1 1.66666 0.999997)" d="M12.6667 6.4526C12.6667 5.6429 12.6667 5.2381 12.5171 4.8733C12.3675 4.5086 12.0832 4.2204 11.5146 3.6439L9.0958 1.1913C8.5163 0.6036 8.2265 0.3098 7.8562 0.1549C7.4858 0 7.0732 0 6.2478 0L4.6667 0C2.4759 0 1.3737 -0.0068 0.6834 0.6834C-0.0068 1.3737 0 2.4759 0 4.6667L0 9.3333C0 11.5241 -0.0068 12.6263 0.6834 13.3166C1.3737 14.0068 2.4759 14 4.6667 14L8 14C10.1908 14 11.293 14.0068 11.9832 13.3166C12.6735 12.6263 12.6667 11.5241 12.6667 9.3333L12.6667 6.4526Z"/><g opacity="0.5"><path fill="#8FF57A" transform="matrix(1 0 0 1 6.4668 1)" d="M7.8649 5.4766C7.8617 5.3089 7.8522 5.1927 7.8257 5.0811C7.7894 4.9289 7.7297 4.783 7.6484 4.6491C7.5568 4.4979 7.4287 4.368 7.1724 4.1081L3.8289 0.7179C3.5677 0.453 3.437 0.3205 3.284 0.2257C3.1486 0.1419 3.0005 0.0799 2.8456 0.0423C2.6707 0 2.4847 0 2.1126 0L0 0L0 0.0067L1.5067 0.0067L1.5272 0.0067C2.2209 0.0067 2.5719 0.0067 2.7926 0.2274C3.0133 0.4479 3.0133 0.7992 3.0133 1.4928L3.0133 1.5133L3.0133 1.89L3.0133 1.9312C3.0133 3.3185 3.0133 4.0207 3.4546 4.4621C3.896 4.9033 4.5981 4.9033 5.9855 4.9033L6.0267 4.9033L6.4033 4.9033L6.4238 4.9033C7.1175 4.9033 7.4688 4.9033 7.6893 5.124C7.7799 5.2145 7.8333 5.3271 7.8649 5.4766Z"/></g><path fill="#FFF" transform="matrix(-4.37114e-08 1 -1 -4.37114e-08 10.5599 6.889)" d="M1.3496 1.335C1.8866 0.4978 2.1552 0 2.6177 0C3.0803 0 3.3489 0.4978 3.8859 1.335L4.3914 2.123C4.9967 3.0666 5.4088 3.5978 5.1635 4.0493C4.917 4.5032 4.2454 4.4431 3.1232 4.4431L2.1123 4.4431C0.9901 4.4431 0.3185 4.5032 0.072 4.0493C-0.1733 3.5978 0.2388 3.0666 0.8441 2.123L1.3496 1.335Z"/></svg>`;
	AudioSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path fill="#4AA5AD" transform="matrix(1 0 0 1 1.66666 0.999997)" d="M12.6667 6.4526C12.6667 5.6429 12.6667 5.2381 12.5171 4.8733C12.3675 4.5086 12.0832 4.2204 11.5146 3.6439L9.0958 1.1913C8.5163 0.6036 8.2265 0.3098 7.8562 0.1549C7.4858 0 7.0732 0 6.2478 0L4.6667 0C2.4759 0 1.3737 -0.0068 0.6834 0.6834C-0.0068 1.3737 0 2.4759 0 4.6667L0 9.3333C0 11.5241 -0.0068 12.6263 0.6834 13.3166C1.3737 14.0068 2.4759 14 4.6667 14L8 14C10.1908 14 11.293 14.0068 11.9832 13.3166C12.6735 12.6263 12.6667 11.5241 12.6667 9.3333L12.6667 6.4526Z"/><g opacity="0.5"><path fill="#72E2E6" transform="matrix(1 0 0 1 6.4668 1)" d="M7.8649 5.4766C7.8617 5.3089 7.8522 5.1927 7.8257 5.0811C7.7894 4.9289 7.7297 4.783 7.6484 4.6491C7.5568 4.4979 7.4287 4.368 7.1724 4.1081L3.8289 0.7179C3.5677 0.453 3.437 0.3205 3.284 0.2257C3.1486 0.1419 3.0005 0.0799 2.8456 0.0423C2.6707 0 2.4847 0 2.1126 0L0 0L0 0.0067L1.5067 0.0067L1.5272 0.0067C2.2209 0.0067 2.5719 0.0067 2.7926 0.2274C3.0133 0.4479 3.0133 0.7992 3.0133 1.4928L3.0133 1.5133L3.0133 1.89L3.0133 1.9312C3.0133 3.3185 3.0133 4.0207 3.4546 4.4621C3.896 4.9033 4.5981 4.9033 5.9855 4.9033L6.0267 4.9033L6.4033 4.9033L6.4238 4.9033C7.1175 4.9033 7.4688 4.9033 7.6893 5.124C7.7799 5.2145 7.8333 5.3271 7.8649 5.4766Z"/></g><path fill="#FFF" transform="matrix(1 0 0 1 4.2334 6.82308)" d="M5.2733 3.0738L5.2733 1.2336C5.2733 1.2159 5.2733 1.1991 5.2733 1.1831C5.2579 1.1876 5.2417 1.1925 5.2249 1.1975L2.6635 1.9659C2.6541 1.9687 2.6452 1.9714 2.6367 1.974L2.6367 2.002L2.6367 5.3203L2.6231 5.3203C2.5763 5.6446 2.4291 5.914 2.1814 6.1285C1.9337 6.343 1.646 6.4503 1.3183 6.4503C0.9543 6.4503 0.6436 6.3216 0.3861 6.0641C0.1287 5.8067 0 5.496 0 5.132C0 4.7679 0.1287 4.4572 0.3861 4.1997C0.6436 3.9423 0.9543 3.8136 1.3183 3.8136C1.3498 3.8136 1.3813 3.8147 1.4128 3.817C1.4442 3.8193 1.4755 3.8226 1.5067 3.8271L1.5067 2.002C1.5067 1.7667 1.5299 1.592 1.5764 1.4781C1.6376 1.3283 1.7311 1.2026 1.857 1.101C1.9528 1.0237 2.1134 0.9512 2.3388 0.8836L4.9001 0.1152C5.2678 0.0049 5.5385 -0.0262 5.7122 0.0219C5.9472 0.0869 6.1295 0.2226 6.2593 0.429C6.3553 0.5816 6.4033 0.8498 6.4033 1.2336L6.4033 4.567L6.3898 4.567C6.343 4.8913 6.1957 5.1607 5.9481 5.3752C5.7004 5.5897 5.4127 5.6969 5.085 5.6969C4.721 5.6969 4.4102 5.5682 4.1528 5.3108C3.8954 5.0534 3.7667 4.7427 3.7667 4.3786C3.7667 4.0146 3.8954 3.7038 4.1528 3.4464C4.4102 3.189 4.721 3.0603 5.085 3.0603C5.1165 3.0603 5.148 3.0614 5.1794 3.0637C5.2108 3.0659 5.2421 3.0693 5.2733 3.0738Z"/></svg>`;
	FolderSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path fill="#CACAD1" transform="matrix(1 0 0 1 1.33333 2.33333)" d="M0 2.6667C0 1.7321 0 1.2648 0.1815 0.9095C0.3413 0.5968 0.5968 0.3413 0.9095 0.1815C1.2648 0 1.7321 0 2.6667 0L4.8187 0C5.4854 0 5.8187 0 6.1049 0.1091C6.3574 0.2053 6.583 0.3617 6.7618 0.5643C6.9644 0.794 7.0814 1.1061 7.3156 1.7303L8.6667 5.3333L0 5.3333L0 2.6667Z"/><path fill="#A4A4A9" transform="matrix(1 0 0 1 1.33333 2.33333)" d="M0 2.6667C0 1.7321 0 1.2648 0.1815 0.9095C0.3413 0.5968 0.5968 0.3413 0.9095 0.1815C1.2648 0 1.7321 0 2.6667 0L4.8187 0C5.4854 0 5.8187 0 6.1049 0.1091C6.3574 0.2053 6.583 0.3617 6.7618 0.5643C6.9644 0.794 7.0814 1.1061 7.3156 1.7303L8.6667 5.3333L0 5.3333L0 2.6667Z"/><path fill="#A4A4A9" transform="matrix(1 0 0 1 1.33333 4.33333)" d="M10.6667 0C11.6012 0 12.0685 0 12.4239 0.1815C12.7365 0.3413 12.9921 0.5968 13.1518 0.9095C13.3333 1.2648 13.3333 1.7321 13.3333 2.6667L13.3333 6.6667C13.3333 7.6012 13.3333 8.0685 13.1518 8.4239C12.9921 8.7365 12.7365 8.9921 12.4239 9.1518C12.0685 9.3333 11.6012 9.3333 10.6667 9.3333L2.6667 9.3333C1.7321 9.3333 1.2648 9.3333 0.9095 9.1518C0.5968 8.9921 0.3413 8.7365 0.1815 8.4239C0 8.0685 0 7.6012 0 6.6667L0 0L10.6667 0Z"/><path fill="#CACAD1" transform="matrix(1 0 0 1 1.33333 4.33333)" d="M10.6667 0C11.6012 0 12.0685 0 12.4239 0.1815C12.7365 0.3413 12.9921 0.5968 13.1518 0.9095C13.3333 1.2648 13.3333 1.7321 13.3333 2.6667L13.3333 6.6667C13.3333 7.6012 13.3333 8.0685 13.1518 8.4239C12.9921 8.7365 12.7365 8.9921 12.4239 9.1518C12.0685 9.3333 11.6012 9.3333 10.6667 9.3333L2.6667 9.3333C1.7321 9.3333 1.2648 9.3333 0.9095 9.1518C0.5968 8.9921 0.3413 8.7365 0.1815 8.4239C0 8.0685 0 7.6012 0 6.6667L0 0L10.6667 0Z"/></svg>`;
	UnknownSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path fill="#CACAD1" transform="matrix(1 0 0 1 1.66666 0.999997)" d="M12.6667 6.4526C12.6667 5.6429 12.6667 5.2381 12.5171 4.8733C12.3675 4.5086 12.0832 4.2204 11.5146 3.6439L9.0958 1.1913C8.5163 0.6036 8.2265 0.3098 7.8562 0.1549C7.4858 0 7.0732 0 6.2478 0L4.6667 0C2.4759 0 1.3737 -0.0068 0.6834 0.6834C-0.0068 1.3737 0 2.4759 0 4.6667L0 9.3333C0 11.5241 -0.0068 12.6263 0.6834 13.3166C1.3737 14.0068 2.4759 14 4.6667 14L8 14C10.1908 14 11.293 14.0068 11.9832 13.3166C12.6735 12.6263 12.6667 11.5241 12.6667 9.3333L12.6667 6.4526Z"/><g opacity="0.5"><path fill="#7F7F82" transform="matrix(1 0 0 1 6.4668 1)" d="M7.8649 5.4766C7.8617 5.3089 7.8522 5.1927 7.8257 5.0811C7.7894 4.9289 7.7297 4.783 7.6484 4.6491C7.5568 4.4979 7.4287 4.368 7.1724 4.1081L3.8289 0.7179C3.5677 0.453 3.437 0.3205 3.284 0.2257C3.1486 0.1419 3.0005 0.0799 2.8456 0.0423C2.6707 0 2.4847 0 2.1126 0L0 0L0 0.0067L1.5067 0.0067L1.5272 0.0067C2.2209 0.0067 2.5719 0.0067 2.7926 0.2274C3.0133 0.4479 3.0133 0.7992 3.0133 1.4928L3.0133 1.5133L3.0133 1.89L3.0133 1.9312C3.0133 3.3185 3.0133 4.0207 3.4546 4.4621C3.896 4.9033 4.5981 4.9033 5.9855 4.9033L6.0267 4.9033L6.4033 4.9033L6.4238 4.9033C7.1175 4.9033 7.4688 4.9033 7.6893 5.124C7.7799 5.2145 7.8333 5.3271 7.8649 5.4766Z"/></g></svg>`;
	(function(WbAttachmentIconAlias) {
		WbAttachmentIconAlias["PDF"] = "WB_ATTACH_PDF";
		WbAttachmentIconAlias["WORD"] = "WB_ATTACH_WORD";
		WbAttachmentIconAlias["SPREADSHEET"] = "WB_ATTACH_SPREADSHEET";
		WbAttachmentIconAlias["PRESENTATION"] = "WB_ATTACH_PRESENTATION";
		WbAttachmentIconAlias["MARKDOWN"] = "WB_ATTACH_MARKDOWN";
		WbAttachmentIconAlias["CODE"] = "WB_ATTACH_CODE";
		WbAttachmentIconAlias["DRAWIO"] = "WB_ATTACH_DRAWIO";
		WbAttachmentIconAlias["IMAGE"] = "WB_ATTACH_IMAGE";
		WbAttachmentIconAlias["VIDEO"] = "WB_ATTACH_VIDEO";
		WbAttachmentIconAlias["AUDIO"] = "WB_ATTACH_AUDIO";
		WbAttachmentIconAlias["FOLDER"] = "WB_ATTACH_FOLDER";
		WbAttachmentIconAlias["UNKNOWN"] = "WB_ATTACH_UNKNOWN";
	})(WbAttachmentIconAlias || (WbAttachmentIconAlias = {}));
	WB_ATTACHMENT_KIND_TO_ALIAS = {
		pdf: WbAttachmentIconAlias.PDF,
		word: WbAttachmentIconAlias.WORD,
		spreadsheet: WbAttachmentIconAlias.SPREADSHEET,
		presentation: WbAttachmentIconAlias.PRESENTATION,
		markdown: WbAttachmentIconAlias.MARKDOWN,
		html: WbAttachmentIconAlias.CODE,
		code: WbAttachmentIconAlias.CODE,
		drawio: WbAttachmentIconAlias.DRAWIO,
		image: WbAttachmentIconAlias.IMAGE,
		video: WbAttachmentIconAlias.VIDEO,
		audio: WbAttachmentIconAlias.AUDIO,
		folder: WbAttachmentIconAlias.FOLDER,
		default: WbAttachmentIconAlias.UNKNOWN
	};
	WbAttachmentIconSrc = {
		[WbAttachmentIconAlias.PDF]: svgToBase64(PdfSvg),
		[WbAttachmentIconAlias.WORD]: svgToBase64(WordSvg),
		[WbAttachmentIconAlias.SPREADSHEET]: svgToBase64(SpreadsheetSvg),
		[WbAttachmentIconAlias.PRESENTATION]: svgToBase64(PresentationSvg),
		[WbAttachmentIconAlias.MARKDOWN]: svgToBase64(MarkdownSvg),
		[WbAttachmentIconAlias.CODE]: svgToBase64(CodeSvg),
		[WbAttachmentIconAlias.DRAWIO]: svgToBase64(DrawioSvg),
		[WbAttachmentIconAlias.IMAGE]: svgToBase64(ImageSvg),
		[WbAttachmentIconAlias.VIDEO]: svgToBase64(VideoSvg),
		[WbAttachmentIconAlias.AUDIO]: svgToBase64(AudioSvg),
		[WbAttachmentIconAlias.FOLDER]: svgToBase64(FolderSvg),
		[WbAttachmentIconAlias.UNKNOWN]: svgToBase64(UnknownSvg)
	};
	registerIconSrcMap(WbAttachmentIconSrc);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/resources/wb-icons/index.js
var init_wb_icons = __esmMin((() => {
	init_attachment$1();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/field-collector/fields/attachment/index.js
function _inherits$12(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$12(subClass, superClass);
}
function _set_prototype_of$12(o, p) {
	_set_prototype_of$12 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$12(o, p);
}
var thumbnailStyle, AttachmentCollector;
var init_attachment = __esmMin((() => {
	init_es();
	init_es$1();
	init_label();
	init_pen();
	init_resources();
	init_hyperlink_icon();
	init_wb_icons();
	init_style();
	thumbnailStyle = { marginRight: 3 };
	AttachmentCollector = /* @__PURE__ */ function(LabelFieldCollector) {
		"use strict";
		_inherits$12(AttachmentCollector, LabelFieldCollector);
		function AttachmentCollector() {
			return LabelFieldCollector.apply(this, arguments) || this;
		}
		var _proto = AttachmentCollector.prototype;
		_proto.collect = function collect(rect, standardCell, collectConfig) {
			if (collectConfig.attachmentConfig.thumbnailMode) return this.collectThumbnail(rect, standardCell, collectConfig);
			return LabelFieldCollector.prototype.collect.call(this, rect, standardCell, collectConfig);
		};
		_proto.getLabelOptions = function getLabelOptions(cellDatas, collectConfig) {
			var labelOptions = [];
			var { tagHeight } = collectConfig.labelConfig;
			var height = tagHeight !== null && tagHeight !== void 0 ? tagHeight : style.size.tagLarge;
			cellDatas.forEach((cellData) => {
				var { text, attachment } = cellData;
				var iconAlias = "";
				if (attachment) {
					if (domainConfig.getIsWb()) iconAlias = getWbAttachmentIconAlias(attachment);
					if (!iconAlias) {
						var { classify, fileExt, name, docType, fileUrl } = attachment;
						iconAlias = generateHyperlinkType(HyperlinkType.DEFAULT);
						if (domainConfig.getIsToc() && classify) {
							var hyperlinkType = getHyperlinkTypeByFileInfo(classify, fileExt);
							iconAlias = HyperlinkTypeIcons[generateHyperlinkTypeToc(hyperlinkType)] ? generateHyperlinkTypeToc(hyperlinkType) : generateHyperlinkType(hyperlinkType);
						} else if (fileUrl && docType) iconAlias = generateHyperlinkType(getHyperlinkTypeFromTob(fileUrl, name, docType));
					}
				}
				var labelOption = this.mergeOptionConfig(collectConfig, {
					text: text.replace(/\n/g, " "),
					iconAlias,
					height
				});
				if (collectConfig.labelConfig.canDelete) labelOption.deleteIcon = NormalIconAlias.CLOSE_DARK;
				labelOptions.push(labelOption);
			});
			return labelOptions;
		};
		_proto.collectThumbnail = function collectThumbnail(rect, standardCell, _collectConfig) {
			var thumbnailInfos = [];
			standardCell.data.forEach((attachmentData) => {
				var _a;
				var attachment = attachmentData.attachment;
				var { classify, fileExt } = attachment;
				var hyperlinkType = getHyperlinkTypeByFileInfo(classify, fileExt);
				var iconSrc = HyperlinkTypeIcons[generateHyperlinkTypeToc(hyperlinkType)];
				var previewUrl = getAttachmentThumbUrl((_a = attachmentPreviewImageLoader.getPreviewUrl(attachment, attachmentData.baseId)) !== null && _a !== void 0 ? _a : "");
				if (previewUrl) {
					var image = resourceLoader.loadUrl(previewUrl);
					if (!(image instanceof Promise)) thumbnailInfos.push(image);
				} else {
					var iconType = iconSrc ? generateHyperlinkTypeToc(hyperlinkType) : generateHyperlinkType(hyperlinkType);
					thumbnailInfos.push(iconType);
				}
			});
			if (thumbnailInfos.length !== standardCell.data.length) return [];
			var configs = [];
			var startX = 0;
			var thumbnailHeight = rect.height;
			thumbnailInfos.forEach((thumbnailInfo) => {
				if (typeof thumbnailInfo === "string") {
					configs.push(pen.config.icon(thumbnailInfo, {
						x: rect.x + startX,
						y: rect.y,
						width: thumbnailHeight,
						height: thumbnailHeight
					}));
					startX += thumbnailHeight;
				} else {
					var width = Math.round(thumbnailHeight / thumbnailInfo.height * thumbnailInfo.width);
					configs.push(pen.config.image("", {
						image: thumbnailInfo,
						x: rect.x + startX,
						y: rect.y,
						width,
						height: thumbnailHeight,
						borderWidth: style.size.borderWidth,
						borderRadius: style.size.borderRadius
					}));
					startX += width;
				}
				startX += thumbnailStyle.marginRight;
			});
			return configs;
		};
		return AttachmentCollector;
	}(LabelFieldCollector);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/field-collector/common/overflow-label.js
function getOverFlowLabelWidth(text) {
	return 2 * style.size.tagPaddingLeft + pen.util.measureTextWidth(text);
}
function collectOverFlowLabel(rect, text) {
	return {
		rectConfig: pen.config.rect(Object.assign(Object.assign({}, rect), {
			borderRadius: style.size.tagBorderRadius,
			borderColor: "transparent",
			background: style.color.tagBackground
		})),
		textConfig: pen.config.text(Object.assign(Object.assign({}, rect), {
			text,
			fontSize: style.size.fontSizeNormal,
			verticalAlign: "middle",
			align: "center",
			wrap: "none"
		}))
	};
}
var init_overflow_label = __esmMin((() => {
	init_pen();
	init_style();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/field-collector/fields/checkbox/get-icon-alias.js
function getIconAlias(isSelect, iconConfig) {
	if (!iconConfig) return isSelect ? CheckboxType.CHECKBOX_CELL_CHECKED : CheckboxType.CHECKBOX_CELL_UNCHECKED;
	var { type, style } = iconConfig;
	var iconAlias = isSelect ? CheckboxType.CHECKBOX_CELL_CHECKED : CheckboxType.CHECKBOX_CELL_UNCHECKED;
	var index = getCheckboxIconAliasIndex(style);
	switch (type) {
		case CheckboxIconType.CANCEL:
			iconAlias = isSelect ? CheckboxIconsMapList[CheckboxType.CHECKBOX_CANCEL_CHECKED][index] : CheckboxType.CHECKBOX_CANCEL_UNCHECKED;
			break;
		case CheckboxIconType.STAR:
			iconAlias = isSelect ? CheckboxIconsMapList[CheckboxType.CHECKBOX_STAR_CHECKED][index] : CheckboxType.CHECKBOX_STAR_UNCHECKED;
			break;
		case CheckboxIconType.LOVE:
			iconAlias = isSelect ? CheckboxIconsMapList[CheckboxType.CHECKBOX_LOVE_CHECKED][index] : CheckboxType.CHECKBOX_LOVE_UNCHECKED;
			break;
		case CheckboxIconType.FLAG:
			iconAlias = isSelect ? CheckboxIconsMapList[CheckboxType.CHECKBOX_FLAG_CHECKED][index] : CheckboxType.CHECKBOX_FLAG_UNCHECKED;
			break;
		case CheckboxIconType.PIN:
			iconAlias = isSelect ? CheckboxIconsMapList[CheckboxType.CHECKBOX_PIN_CHECKED][index] : CheckboxType.CHECKBOX_PIN_UNCHECKED;
			break;
		case CheckboxIconType.TICK:
			var checkboxType = isDarkMode() ? CheckboxType.CHECKBOX_TICK_UNCHECKED_DARK : CheckboxType.CHECKBOX_TICK_UNCHECKED;
			iconAlias = isSelect ? CheckboxIconsMapList[CheckboxType.CHECKBOX_TICK_CHECKED][index] : checkboxType;
			break;
		default:
			iconAlias = isSelect ? CheckboxType.CHECKBOX_CELL_CHECKED : CheckboxType.CHECKBOX_CELL_UNCHECKED;
			break;
	}
	return iconAlias;
}
var init_get_icon_alias = __esmMin((() => {
	init_es();
	init_es$1();
	init_checkbox_icon();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/field-collector/fields/checkbox/index.js
function _inherits$11(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$11(subClass, superClass);
}
function _set_prototype_of$11(o, p) {
	_set_prototype_of$11 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$11(o, p);
}
var textMarginLeft, batchMarginRight, CheckboxCollector;
var init_checkbox = __esmMin((() => {
	init_es$1();
	init_abstract();
	init_overflow_label();
	init_get_icon_alias();
	init_lib();
	init_pen();
	init_style();
	textMarginLeft = 8;
	batchMarginRight = 7;
	CheckboxCollector = /* @__PURE__ */ function(BaseFieldCollector) {
		"use strict";
		_inherits$11(CheckboxCollector, BaseFieldCollector);
		function CheckboxCollector() {
			return BaseFieldCollector.apply(this, arguments) || this;
		}
		var _proto = CheckboxCollector.prototype;
		_proto.measureWidth = function measureWidth(_drawConfigs) {
			return 0;
		};
		_proto.measureHeight = function measureHeight(drawConfigs) {
			var height = 0;
			var firstIcon = drawConfigs[0];
			var lastIcon = drawConfigs[drawConfigs.length - 1];
			if (firstIcon.type === DrawType.Bitmap && lastIcon.type === DrawType.Bitmap) height = lastIcon.y + lastIcon.height - firstIcon.y;
			return height;
		};
		_proto.collect = function collect(rect, standardCell, collectConfig, field) {
			if (!standardCell.data || standardCell.data.length === 0) return [];
			if (standardCell.data.length > 1) {
				if (collectConfig.maxLines === 1) return this.collectSingleLineCheckbox(rect, collectConfig, standardCell, field);
				return this.collectMultiCheckbox(rect, collectConfig, standardCell, field);
			}
			return this.collectSingleCheckbox(rect, collectConfig, standardCell.data[0], field);
		};
		_proto.collectMultiCheckbox = function collectMultiCheckbox(rect, collectConfig, standardCell, field) {
			var drawConfigs = [];
			var iconSize = style.size.iconNormal;
			var oneIconTakeWidth = iconSize;
			var startX = 0;
			var startY = 0;
			standardCell.data.forEach((data) => {
				if (rect.width > oneIconTakeWidth && startX + oneIconTakeWidth > rect.width) {
					startX = 0;
					startY += iconSize;
				}
				if (startY + iconSize > rect.height) return;
				var drawRect = {
					x: rect.x + startX,
					y: rect.y + startY,
					width: rect.width,
					height: rect.height
				};
				var result = this.collectSingleCheckbox(drawRect, collectConfig, data, field);
				drawConfigs.push(...result);
				startX += oneIconTakeWidth;
			});
			return drawConfigs;
		};
		_proto.collectSingleLineCheckbox = function collectSingleLineCheckbox(rect, collectConfig, standardCell, field) {
			var drawConfigs = [];
			var iconSize = style.size.iconNormal;
			var marginRight = batchMarginRight;
			var oneIconTakeWidth = iconSize + marginRight;
			var checkboxCellData = standardCell.data;
			var currentUndisplayedLabel = checkboxCellData.length;
			var overFlowLabelOptionText = "";
			var startX = 0;
			for (var checkbox of checkboxCellData) {
				currentUndisplayedLabel -= 1;
				overFlowLabelOptionText = `+${currentUndisplayedLabel}`;
				var overFlowLabelWidth = getOverFlowLabelWidth(overFlowLabelOptionText);
				if (!(startX + oneIconTakeWidth + overFlowLabelWidth + marginRight > rect.width)) {
					var drawRect = {
						x: rect.x + startX,
						y: rect.y,
						width: iconSize,
						height: iconSize
					};
					drawConfigs.push(...this.collectSingleCheckbox(drawRect, collectConfig, checkbox, field));
					startX += oneIconTakeWidth;
					continue;
				}
				overFlowLabelOptionText = `+${currentUndisplayedLabel + 1}`;
				var { rectConfig, textConfig } = collectOverFlowLabel({
					x: rect.x + startX,
					y: rect.y + (rect.height - iconSize) / 2,
					width: getOverFlowLabelWidth(overFlowLabelOptionText),
					height: iconSize
				}, overFlowLabelOptionText);
				drawConfigs.push(rectConfig, textConfig);
				break;
			}
			return drawConfigs;
		};
		_proto.collectSingleCheckbox = function collectSingleCheckbox(rect, collectConfig, standardCellData, field) {
			var _a;
			var drawConfigs = [];
			var iconAlias = this.getIcon(standardCellData);
			var { x, y, width, height } = rect;
			var iconSize = style.size.iconNormal;
			var isCheckbox = field.getType() === FieldType.CHECKBOX;
			var offsetX = isCheckbox ? (width - iconSize) / 2 : 0;
			var offsetY = isCheckbox ? (height - iconSize) / 2 : 0;
			var iconRect = {
				x: x + offsetX,
				y: y + offsetY,
				width: iconSize,
				height: iconSize
			};
			if ((_a = collectConfig.checkboxConfig) === null || _a === void 0 ? void 0 : _a.hasTitle) {
				var title = field.getTitle();
				iconRect = {
					x,
					y: y + (height - iconSize) / 2,
					width: iconSize,
					height: iconSize
				};
				var iconTakeWidth = iconSize + textMarginLeft;
				var textRect = {
					x: x + iconTakeWidth,
					y,
					width: width - iconTakeWidth,
					height
				};
				drawConfigs.push(pen.config.text(Object.assign(Object.assign(Object.assign({}, textRect), collectConfig.textConfig), {
					text: title,
					verticalAlign: "middle"
				})));
			}
			drawConfigs.push(pen.config.icon(iconAlias, iconRect));
			return drawConfigs;
		};
		_proto.getIcon = function getIcon(cellData) {
			var _a;
			return getIconAlias((_a = cellData === null || cellData === void 0 ? void 0 : cellData.checked) !== null && _a !== void 0 ? _a : false, cellData === null || cellData === void 0 ? void 0 : cellData.iconConfig);
		};
		return CheckboxCollector;
	}(BaseFieldCollector);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/field-collector/fields/error/index.js
function _inherits$10(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$10(subClass, superClass);
}
function _set_prototype_of$10(o, p) {
	_set_prototype_of$10 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$10(o, p);
}
var ErrorCollector;
var init_error = __esmMin((() => {
	init_es$1();
	init_abstract();
	init_pen();
	init_normal_icon();
	init_style();
	ErrorCollector = /* @__PURE__ */ function(BaseFieldCollector) {
		"use strict";
		_inherits$10(ErrorCollector, BaseFieldCollector);
		function ErrorCollector() {
			return BaseFieldCollector.apply(this, arguments) || this;
		}
		var _proto = ErrorCollector.prototype;
		_proto.measureWidth = function measureWidth(_drawConfigs) {
			return 0;
		};
		_proto.measureHeight = function measureHeight(_drawConfigs) {
			return 0;
		};
		_proto.collect = function collect(rect, standardCell, collectConfig, field) {
			var drawConfigs = [];
			var drawRect = Object.assign({}, rect);
			var { textConfig } = collectConfig;
			var iconSize = style.size.iconSmall;
			var iconY = Math.max(0, (((textConfig === null || textConfig === void 0 ? void 0 : textConfig.fontSize) || 1) * ((textConfig === null || textConfig === void 0 ? void 0 : textConfig.lineHeight) || 1.5) - iconSize) / 2);
			var iconRect = {
				x: drawRect.x,
				y: drawRect.y + iconY,
				width: iconSize,
				height: iconSize
			};
			drawConfigs.push(pen.config.icon(NormalIconAlias.FAILED_ICON_GRAY, iconRect));
			drawRect.x += iconSize + 2;
			drawRect.width -= iconSize;
			var errorCellData = getErrorCell(field.fieldErrorType).data;
			drawConfigs.push(pen.config.text(Object.assign(Object.assign(Object.assign({}, drawRect), collectConfig.textConfig), { text: errorCellData[0].text })));
			return drawConfigs;
		};
		return ErrorCollector;
	}(BaseFieldCollector);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/field-collector/fields/image/index.js
function _inherits$9(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$9(subClass, superClass);
}
function _set_prototype_of$9(o, p) {
	_set_prototype_of$9 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$9(o, p);
}
var ImageStyle, ImageCollector;
var init_image = __esmMin((() => {
	init_es();
	init_abstract();
	init_pen();
	init_style();
	ImageStyle = {
		margin: 5,
		maxRate: 16 / 9
	};
	ImageCollector = /* @__PURE__ */ function(BaseFieldCollector) {
		"use strict";
		_inherits$9(ImageCollector, BaseFieldCollector);
		function ImageCollector() {
			return BaseFieldCollector.apply(this, arguments) || this;
		}
		var _proto = ImageCollector.prototype;
		_proto.measureWidth = function measureWidth(configs, measureConfig) {
			var firstConfig = configs[0];
			var lastConfig = configs[configs.length - 1];
			if (!firstConfig || !lastConfig) return 0;
			var imageListWidth = lastConfig.x + lastConfig.width - firstConfig.x;
			if (!measureConfig) return imageListWidth;
			return imageListWidth + 2 * style.size.cellPadding;
		};
		_proto.measureHeight = function measureHeight(configs) {
			var firstConfig = configs[0];
			if (firstConfig) return firstConfig.height;
			return 0;
		};
		_proto.collect = function collect(rect, standardCell) {
			var configs = [];
			var showHeight = rect.height;
			var imageFixedHeight = getThumbnailFixedHeight(showHeight);
			var unkonwSize = showHeight;
			var currentX = 0;
			for (var i = 0; i < standardCell.data.length; i++) {
				if (currentX > rect.width) break;
				var { width, height, imageUrl } = standardCell.data[i];
				var loadUrl = getThumbnailUrl(imageUrl, {
					originWidth: width,
					originHeight: height,
					fixedHeight: imageFixedHeight
				});
				var virtualSize = getVirtualSizeBySize(width || unkonwSize, height || unkonwSize, showHeight, ImageStyle.maxRate);
				var adjustSize = getRealSizeByVirtualSize({
					width: virtualSize.width,
					height: virtualSize.height
				}, ImageStyle.maxRate);
				configs.push(pen.config.image(loadUrl, {
					x: rect.x + currentX,
					y: rect.y,
					width: adjustSize.width,
					height: adjustSize.height,
					borderRadius: style.size.borderRadius,
					borderWidth: style.size.borderWidth
				}));
				currentX += adjustSize.width + ImageStyle.margin;
			}
			return configs;
		};
		return ImageCollector;
	}(BaseFieldCollector);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/field-collector/fields/link-record/index.js
function _inherits$8(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$8(subClass, superClass);
}
function _set_prototype_of$8(o, p) {
	_set_prototype_of$8 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$8(o, p);
}
var getLinkRecordTagStyle, getLinkRecordPlaceholder, LinkRecordCollector;
var init_link_record = __esmMin((() => {
	init_es();
	init_label();
	init_resources();
	init_style();
	getLinkRecordTagStyle = () => ({
		background: style.color.tagBackground,
		textColor: style.color.normalFontColor,
		borderColor: "transparent"
	});
	getLinkRecordPlaceholder = () => i18n.t("未命名记录");
	LinkRecordCollector = /* @__PURE__ */ function(LabelFieldCollector) {
		"use strict";
		_inherits$8(LinkRecordCollector, LabelFieldCollector);
		function LinkRecordCollector() {
			return LabelFieldCollector.apply(this, arguments) || this;
		}
		var _proto = LinkRecordCollector.prototype;
		_proto.getLabelOptions = function getLabelOptions(cellDatas, collectConfig) {
			var labelOptions = [];
			var linkRecordTagStyle = getLinkRecordTagStyle();
			cellDatas.forEach((cellData) => {
				var _a;
				var { text, canRead } = cellData;
				var title = canRead ? text.replace(/\n/g, " ") || getLinkRecordPlaceholder() : i18n.t("无权限的记录");
				var height = (_a = collectConfig.labelConfig.tagHeight) !== null && _a !== void 0 ? _a : style.size.tagLarge;
				var labelOption = this.mergeOptionConfig(collectConfig, {
					text: title,
					height,
					fontColor: linkRecordTagStyle.textColor,
					borderColor: linkRecordTagStyle.borderColor,
					background: linkRecordTagStyle.background,
					iconAlias: canRead ? NormalIconAlias.DATA_QUOTE : NormalIconAlias.RECORD_NO_PERMISSION
				});
				if (collectConfig.labelConfig.canDelete) labelOption.deleteIcon = NormalIconAlias.CLOSE_DARK;
				labelOptions.push(labelOption);
			});
			return labelOptions;
		};
		return LinkRecordCollector;
	}(LabelFieldCollector);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/field-collector/fields/location/index.js
function _inherits$7(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$7(subClass, superClass);
}
function _set_prototype_of$7(o, p) {
	_set_prototype_of$7 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$7(o, p);
}
var import_cloneDeep$1, LocaltionCollector;
var init_location = __esmMin((() => {
	import_cloneDeep$1 = /* @__PURE__ */ __toESM(require_cloneDeep());
	init_es$1();
	init_abstract();
	init_resources();
	init_style();
	LocaltionCollector = /* @__PURE__ */ function(BaseFieldCollector) {
		"use strict";
		_inherits$7(LocaltionCollector, BaseFieldCollector);
		function LocaltionCollector(getCollector) {
			var _this = BaseFieldCollector.call(this) || this;
			_this.getCollector = getCollector;
			return _this;
		}
		var _proto = LocaltionCollector.prototype;
		_proto.measureWidth = function measureWidth(drawConfigs) {
			return this.getCollector(FieldType.TEXT).measureWidth(drawConfigs);
		};
		_proto.measureHeight = function measureHeight(drawConfigs) {
			return this.getCollector(FieldType.TEXT).measureHeight(drawConfigs);
		};
		_proto.collect = function collect(rect, standardCell, collectConfig, field) {
			var linkConfig = (0, import_cloneDeep$1.default)(collectConfig);
			linkConfig.textConfig.color = style.color.linkColor;
			return this.getCollector(FieldType.TEXT).collect(rect, standardCell, linkConfig, field, {
				hasIcon: true,
				iconAlias: NormalIconAlias.LOCATION_DEFAULT
			});
		};
		return LocaltionCollector;
	}(BaseFieldCollector);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/field-collector/fields/lookup/index.js
function _inherits$6(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$6(subClass, superClass);
}
function _set_prototype_of$6(o, p) {
	_set_prototype_of$6 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$6(o, p);
}
var OriginalDrawTypes, LookupCollector;
var init_lookup = __esmMin((() => {
	init_es$1();
	init_abstract();
	init_pen();
	init_resources();
	init_style();
	OriginalDrawTypes = [
		FieldType.SINGLE_SELECT,
		FieldType.MULTIPLE_SELECT,
		FieldType.USER,
		FieldType.USER_C,
		FieldType.CREATED_USER,
		FieldType.MODIFIED_USER,
		FieldType.LINK_RECORDS,
		FieldType.TWO_WAY_LINK_RECORDS,
		FieldType.IMAGE,
		FieldType.ATTACHMENT,
		FieldType.CHECKBOX,
		FieldType.PROGRESS
	];
	LookupCollector = /* @__PURE__ */ function(BaseFieldCollector) {
		"use strict";
		_inherits$6(LookupCollector, BaseFieldCollector);
		function LookupCollector(getCollector) {
			var _this = BaseFieldCollector.call(this) || this;
			_this.getCollector = getCollector;
			return _this;
		}
		var _proto = LookupCollector.prototype;
		_proto.measureWidth = function measureWidth(drawConfigs, measureConfig) {
			if (!measureConfig) return 0;
			var { standardCell } = measureConfig;
			var isSingleLookupCellData = standardCell.data.length === 1;
			var finalMeasureConfig = Object.assign(Object.assign({}, measureConfig), { isSingleLineField: isSingleLookupCellData });
			var fieldType = this.getAssembleCell(standardCell.data).sourceType;
			return this.getCollector(fieldType).measureWidth(drawConfigs, finalMeasureConfig);
		};
		_proto.measureHeight = function measureHeight(_drawConfigs) {
			return 0;
		};
		_proto.collect = function collect(rect, standardCell, collectConfig, field) {
			var cellData = standardCell.data;
			var error = this.getError(cellData);
			if (error) return this.collectError(rect, error, collectConfig);
			var assembleCell = this.getAssembleCell(cellData);
			return this.getCollector(assembleCell.sourceType).collect(rect, assembleCell, collectConfig, field);
		};
		/**
		* 首先尝试获取引用错误
		* @param cellDataList
		* @returns
		*/ _proto.getError = function getError(cellDataList) {
			return getFormulaError(cellDataList);
		};
		/**
		* 根据 cellData 获取最终绘制结构的 standardCell
		* @param cellDataList
		* @returns
		*/ _proto.getAssembleCell = function getAssembleCell(cellDataList) {
			var cellData = cellDataList;
			if (!isAllSuccess(cellData)) return {
				sourceType: FieldType.TEXT,
				data: formattedLookupCell(cellData, {
					isTextField: false,
					isUrlField: false,
					isLocationField: false
				})
			};
			var { isSingle, fieldType } = isSingleType(cellData);
			if (!isSingle) return {
				sourceType: FieldType.TEXT,
				data: formattedLookupCell(cellData, {
					isTextField: false,
					isUrlField: false,
					isLocationField: false
				})
			};
			if (OriginalDrawTypes.includes(fieldType)) return {
				sourceType: fieldType,
				data: cellData
			};
			if (cellData.length === 1 && (fieldType === FieldType.PROGRESS || fieldType === FieldType.PHONE || fieldType === FieldType.EMAIL)) return {
				sourceType: fieldType,
				data: cellData
			};
			return {
				sourceType: FieldType.TEXT,
				data: formattedLookupCell(cellData, {
					isTextField: fieldType === FieldType.TEXT,
					isUrlField: fieldType === FieldType.URL,
					isLocationField: fieldType === FieldType.LOCATION
				})
			};
		};
		/**
		* 绘制错误样式
		*/ _proto.collectError = function collectError(rect, cellData, collectConfig) {
			var { errorType, text } = cellData;
			if (isFormulaLoadingErrorType(errorType)) return [pen.config.text(Object.assign(Object.assign(Object.assign({}, rect), collectConfig.textConfig), {
				color: style.color.lightUltraFontColor,
				text
			}))];
			var errorShowType = collectConfig.formulaConfig.errorType;
			var { x, y, width, height } = rect;
			var iconSize = style.size.iconNormal;
			var drawConfigs = [];
			if (errorShowType === "onlyIcon") drawConfigs.push(pen.config.icon(NormalIconAlias.FAILED_ICON_GRAY, {
				x: x + (width - iconSize) / 2,
				y: y + (height - iconSize) / 2,
				width: iconSize,
				height: iconSize,
				opacity: style.consts.errorOpacity
			}));
			if (errorShowType === "withText") {
				drawConfigs.push(pen.config.icon(NormalIconAlias.FAILED_ICON_GRAY, Object.assign(Object.assign({}, rect), {
					width: iconSize,
					height: iconSize,
					opacity: style.consts.errorOpacity
				})));
				drawConfigs.push(pen.config.text(Object.assign(Object.assign(Object.assign(Object.assign({}, rect), { x: rect.x + iconSize + 6 }), collectConfig.textConfig), {
					text,
					color: style.color.lightUltraFontColor
				})));
			}
			return drawConfigs;
		};
		return LookupCollector;
	}(BaseFieldCollector);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/field-collector/fields/progress/index.js
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
var defaultStyle$1, MaxTextShowRate, MaxProgressShowWidth, progressPadding, ProgressCollector;
var init_progress = __esmMin((() => {
	init_esm();
	init_es$1();
	init_abstract();
	init_lib();
	init_pen();
	init_style();
	defaultStyle$1 = { textMarginLeft: 4 };
	MaxTextShowRate = .4;
	MaxProgressShowWidth = 45;
	progressPadding = 10;
	ProgressCollector = /* @__PURE__ */ function(BaseFieldCollector) {
		"use strict";
		_inherits$5(ProgressCollector, BaseFieldCollector);
		function ProgressCollector(getCollector) {
			var _this = BaseFieldCollector.call(this) || this;
			_this.getCollector = getCollector;
			return _this;
		}
		var _proto = ProgressCollector.prototype;
		_proto.measureWidth = function measureWidth(_drawConfigs, measureConfig) {
			if (!!measureConfig) return 140;
			if (ua.isMobile) return 140;
			return 0;
		};
		_proto.measureHeight = function measureHeight(drawConfigs) {
			return this.getCollector(FieldType.TEXT).measureHeight(drawConfigs);
		};
		_proto.collect = function collect(rect, standardCell, collectConfig) {
			var cellDatas = standardCell.data;
			var drawConfigs = [];
			var collectData = (data) => {
				var { number: progressNumber, text = "", color } = data;
				var isUnset = typeof progressNumber === "undefined";
				var isZero = typeof progressNumber === "number" && progressNumber <= 0;
				var isFull = typeof progressNumber === "number" && progressNumber >= 1;
				var { fontSize = style.size.fontSizeNormal, fontStyle } = collectConfig.textConfig;
				var textOriginWidth = pen.util.measureTextWidth(text, fontSize, fontStyle);
				var textRectWidth = rect.width * MaxTextShowRate;
				var textTakeWidth = Math.min(textOriginWidth, textRectWidth);
				var progressOuterHeight = style.size.progressHeight;
				var progressRadius = 2;
				var progressOuterWidth = rect.width - textRectWidth - defaultStyle$1.textMarginLeft;
				var progressMargin = 6;
				if (progressOuterWidth >= MaxProgressShowWidth) {
					var progressRect = {
						x: rect.x,
						y: startY + progressMargin,
						width: progressOuterWidth,
						height: progressOuterHeight
					};
					if (isUnset || isZero || isFull) drawConfigs.push(pen.config.rect(Object.assign(Object.assign({}, progressRect), {
						level: Level.L1,
						borderRadius: progressRadius,
						background: isFull ? color : style.color.tspStrongBackground
					})));
					else {
						drawConfigs.push(pen.config.rect(Object.assign(Object.assign({}, progressRect), {
							level: Level.L1,
							borderRadius: progressRadius,
							background: style.color.tspStrongBackground
						})));
						var progressWidth = Math.ceil(progressOuterWidth * progressNumber);
						drawConfigs.push(pen.config.rect(Object.assign(Object.assign({}, progressRect), {
							level: Level.L1,
							width: progressWidth,
							borderRadius: [
								progressRadius,
								0,
								0,
								progressRadius
							],
							background: color
						})));
					}
				} else textTakeWidth = Math.min(textOriginWidth, rect.width);
				if (!isUnset && text) {
					var textRect = {
						x: rect.x + rect.width - textTakeWidth - style.size.cellPadding,
						y: startY,
						width: textTakeWidth + style.size.cellPadding,
						height: style.size.fontSizeNormal
					};
					drawConfigs.push(pen.config.text(Object.assign(Object.assign(Object.assign({}, textRect), collectConfig.textConfig), {
						verticalAlign: "top",
						text,
						align: "right"
					})));
				}
				startY += progressPadding + progressOuterHeight;
			};
			var startY = rect.y;
			if (cellDatas.length === 0) collectData({});
			else cellDatas.forEach(collectData);
			return drawConfigs;
		};
		return ProgressCollector;
	}(BaseFieldCollector);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/field-collector/fields/select/index.js
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
var SelectCollector;
var init_select = __esmMin((() => {
	init_es();
	init_label();
	init_resources();
	SelectCollector = /* @__PURE__ */ function(LabelFieldCollector) {
		"use strict";
		_inherits$4(SelectCollector, LabelFieldCollector);
		function SelectCollector() {
			return LabelFieldCollector.apply(this, arguments) || this;
		}
		var _proto = SelectCollector.prototype;
		_proto.getLabelOptions = function getLabelOptions(cellDatas, collectConfig) {
			var labelOptions = [];
			cellDatas.forEach((cellData) => {
				var optionStyle = getSelectOptionStyleConfig(cellData.style);
				var labelOption = this.mergeOptionConfig(collectConfig, {
					text: cellData.text,
					fontColor: optionStyle.textColor,
					borderColor: optionStyle.borderColor,
					background: optionStyle.background
				});
				if (collectConfig.labelConfig.canDelete) labelOption.deleteIcon = optionStyle.iconColor === "rgba(0,0,0,0.64)" ? NormalIconAlias.CLOSE_DARK : NormalIconAlias.CLOSE_WHITE;
				labelOptions.push(labelOption);
			});
			return labelOptions;
		};
		return SelectCollector;
	}(LabelFieldCollector);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/field-collector/fields/text/index.js
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
/**
* 结束收集后检查是否需要添加省略号
*/ function addEllipsForMulti(rect, drawConfigs, textMinWidth, hasUnCollectConfig, lineHeight) {
	var _a, _b, _c, _d;
	if (drawConfigs.length === 1 && drawConfigs[0].type === DrawType.Text && ((_a = drawConfigs[0].layouts) === null || _a === void 0 ? void 0 : _a.length) === 0) return;
	var textConfigs = drawConfigs.reduce((acc, config, index) => {
		if (config.type !== DrawType.Bitmap) acc.push(Object.assign(Object.assign({}, config), { drawConfigsIndex: index }));
		return acc;
	}, []);
	if (textConfigs.length === 0) return;
	var lastConfig = textConfigs[textConfigs.length - 1];
	if (!lastConfig) return;
	var totalLayouts = textConfigs.reduce((acc, textConfig, index) => {
		var textLayouts = textConfig.layouts;
		var textConfigIndex = textConfigs[index].drawConfigsIndex;
		if (textLayouts === null || textLayouts === void 0 ? void 0 : textLayouts.length) {
			var { y: firstY, x: firstX } = textLayouts[0];
			var finalTextLayouts = textLayouts.map((textLayout, index) => {
				var _a;
				return Object.assign(Object.assign({}, textLayout), {
					y: textConfig.y + textLayout.y - firstY,
					x: textConfig.x + textLayout.x - firstX,
					drawConfigsIndex: textConfigIndex,
					textLayoutIndex: index,
					text: ((_a = textConfig.text) === null || _a === void 0 ? void 0 : _a.endsWith(pen.util.TextChar.break)) ? textConfig.text : textLayout.text
				});
			});
			acc.push(...finalTextLayouts);
		}
		return acc;
	}, []);
	if (totalLayouts.length === 0) return;
	var visibleLastY = (Math.floor((rect.height + 2 * style.size.cellPadding) / lineHeight) - 1) * lineHeight + ((_c = (_b = totalLayouts[0]) === null || _b === void 0 ? void 0 : _b.y) !== null && _c !== void 0 ? _c : 0);
	var visibleLayouts = totalLayouts.filter((layout) => layout.y <= visibleLastY && !layout.text.endsWith(pen.util.TextChar.break));
	if (visibleLayouts.length === 0) return;
	var lastLayout = visibleLayouts.reduce((acc, layout) => {
		if (layout.y > acc.y || layout.y === acc.y && layout.x > acc.x) acc = layout;
		return acc;
	}, totalLayouts[0]);
	var lastDrawConfig = drawConfigs[lastLayout.drawConfigsIndex];
	if (!lastDrawConfig) return;
	var lastTextLayoutIndex = lastLayout.textLayoutIndex;
	var lastTextLayout = (_d = lastDrawConfig.layouts) === null || _d === void 0 ? void 0 : _d[lastTextLayoutIndex];
	if (!lastTextLayout) return;
	addEllipsisCharForLastTextLayout({
		rect,
		lastConfig,
		lastTextLayout,
		lastTextLayoutIndex,
		textMinWidth,
		hasUnCollectConfig
	});
}
/**
* 找到对应布局决定是否添加省略号
* @param rect 对应单元格的 rect
* @param lastConfig 最后一个内容的 config, 包含多个 layout
* @param lastTextLayout 最后一个文本的 layout
* @param textMinWidth 文本的最小宽度
* @param hasUnCollectConfig 是否有未收集的内容
*/ function addEllipsisCharForLastTextLayout(param) {
	var _a;
	var { rect, lastConfig, lastTextLayout, lastTextLayoutIndex, textMinWidth, hasUnCollectConfig } = param;
	var { text, width, x } = lastTextLayout;
	var { ellipsis } = pen.util.TextChar;
	if (text.endsWith(ellipsis)) return;
	if (!hasUnCollectConfig) {
		var { layouts } = lastConfig;
		if (!!layouts && lastTextLayoutIndex === layouts.length - 1 && ((_a = layouts[lastTextLayoutIndex]) === null || _a === void 0 ? void 0 : _a.text) === lastTextLayout.text) return;
	}
	var lastEndX = x + width;
	if (rect.width - lastEndX > textMinWidth) {
		var ellipsisWidth = pen.util.measureTextWidth(ellipsis, lastConfig.fontSize || textMinWidth, lastConfig.fontStyle);
		lastTextLayout.text += ellipsis;
		lastTextLayout.width += ellipsisWidth;
	} else lastTextLayout.text = text.slice(0, -1) + ellipsis;
}
/**
* 光标换行
* @param cursor
* @param lineHeight
* @param fullWith
*/ function breakLineCursor(cursor, lineHeight, fullWith) {
	cursor.x = 0;
	cursor.y += lineHeight;
	cursor.restWidth = fullWith;
	cursor.restHeight -= lineHeight;
}
/**
* 根据 textConfig 更新 cursor 信息
* @param cursor
* @param textConfig
*/ function updateCursorByTextConfig(cursor, textConfig, lineHeight) {
	var layouts = textConfig.layouts || [];
	var lastLayout = layouts[layouts.length - 1];
	if (!lastLayout) return;
	cursor.x += lastLayout.x + lastLayout.width;
	cursor.restWidth -= lastLayout.width;
	var breakTimes = layouts.length - 1;
	cursor.y += breakTimes * lineHeight;
	cursor.restHeight -= breakTimes * lineHeight;
}
/**
* 判断字体颜色是否为黑色
* @param fontColor 字体颜色值
* @returns 是否为黑色
*/ function isBlackColor(fontColor) {
	if (!fontColor) return false;
	var normalizedColor = fontColor.replace(/\s/g, "").toLowerCase();
	return [
		"#000000",
		"#000",
		"rgb(0,0,0)",
		"rgba(0,0,0,1)",
		"black"
	].includes(normalizedColor);
}
/**
* 获取文本样式
* @param type
* @param format
* @param config
* @returns
*/ function getTextStyle(type, format, collectConfig) {
	var { fontColor, italic, bold, underline, strikeThrough } = format || {};
	var styles = {};
	if (fontColor) styles.color = fontColor.includes("var(") || isBlackColor(fontColor) ? style.color.normalFontColor : fontColor;
	if (italic || bold) styles.fontStyle = `${italic ? "italic" : ""} ${bold ? "bold" : ""}`.trim();
	if (underline || strikeThrough) styles.textDecoration = `${underline ? "underline" : ""} ${strikeThrough ? "line-through" : ""}`.trim();
	if (type === TextType.URL) styles.color = style.color.linkColor;
	return Object.assign(Object.assign({}, collectConfig.textConfig), styles);
}
/**
* 获取文本图标
* @param textData
* @returns
*/ function getTextIcon(textData, customStyle) {
	if (customStyle.iconAlias) return customStyle.iconAlias;
	if ("link" in textData && textData.link) return getHyperLinkTypeIconAlias(textData.link);
}
function getIconTakeWidth() {
	return defaultStyle.iconSize + defaultStyle.iconMarginRight;
}
/**
* 获取文本片段
*/ function getFragment(field, textData, collectConfig, customStyle) {
	if (!textData.text) return null;
	var _$style = "format" in textData ? getTextStyle(textData.type, textData.format, collectConfig) : collectConfig.textConfig;
	if (collectConfig.maxLines !== Infinity) _$style.maxLines = collectConfig.maxLines;
	var icon = customStyle.hasIcon ? getTextIcon(textData, customStyle) : void 0;
	if (field.getType() === FieldType.TEXT && textData.type === TextType.URL && !!icon) _$style.maxLines = 1;
	return {
		text: textData.text,
		icon,
		style: _$style
	};
}
/**
* 一行占据的高度
*/ function getLineHeight(collectConfig) {
	return Math.ceil(getFontSize(collectConfig) * (collectConfig.textConfig.lineHeight || style.defaultTextConfig.lineHeight || 1));
}
/**
* 字体大小
*/ function getFontSize(collectConfig) {
	return collectConfig.textConfig.fontSize || style.size.fontSizeNormal;
}
/**
* 能绘制文本内容的最小宽度，不足则需要换行
*/ function getMinWidth(collectConfig) {
	return getFontSize(collectConfig);
}
/**
* 测量返回自适应列宽
* @param drawConfigs 绘制配置
* @param textContentWidth 默认高度下的总宽度
* @param measureConfig 测量宽度配置
*/ function measureAdaptiveColumnWidth(textContent) {
	var { drawConfigs, textContentWidth, measureConfig } = textContent;
	var { isSingleLineField, isDefaultHeight, rowHeight } = measureConfig;
	if (isDefaultHeight || isSingleLineField) return textContentWidth + paddingWidth;
	var textConfigs = drawConfigs.filter((config) => config.type !== DrawType.Bitmap);
	var isIncludeDocLink = drawConfigs.length !== textConfigs.length;
	var cellRows = textConfigs.reduce((acc, cur) => {
		if (!acc.includes(cur.y)) acc.push(cur.y);
		return acc;
	}, []).length;
	var { fontSize, lineHeight } = textConfigs[0];
	var singleFontSize = fontSize !== null && fontSize !== void 0 ? fontSize : style.size.fontSizeNormal;
	var singleTextHeight = singleFontSize * (lineHeight !== null && lineHeight !== void 0 ? lineHeight : style.defaultTextConfig.lineHeight);
	var visualCellRows = Math.floor((rowHeight - paddingWidth) / singleTextHeight);
	var cellInfo = {
		cellRows,
		visualCellRows,
		ellipsisCharWidth: singleFontSize
	};
	if (!isIncludeDocLink) return handlePlainTextWidth(textConfigs, visualCellRows);
	return handleColWidthIncludeDocLink({
		drawConfigs,
		measureConfig,
		cellInfo
	});
}
/**
* 纯文本文本列列宽处理
* @param textConfigs 纯文本绘制配置
* @param visualCellRows 可视区域换行数
* @returns 纯文本情况下最终列宽
*/ function handlePlainTextWidth(textConfigs, visualCellRows) {
	return textConfigs.slice(0, visualCellRows).reduce((acc, lineData) => {
		var _a, _b;
		var lineDataWidth = (_b = (_a = lineData.layouts) === null || _a === void 0 ? void 0 : _a.reduce((accumulator, layoutData) => accumulator + layoutData.width, 0)) !== null && _b !== void 0 ? _b : 0;
		return Math.max(acc, lineDataWidth);
	}, 0) + paddingWidth;
}
/**
* 含文档链接文本列列宽处理
* @param drawConfigs 绘制配置
* @param measureConfig 测量宽度配置
* @param cellInfo 单元格数据信息
* @returns 含文档链接情况下最终列宽
*/ function handleColWidthIncludeDocLink(param) {
	var { drawConfigs, measureConfig, cellInfo } = param;
	var { currentColumnWidth } = measureConfig;
	var { cellRows, visualCellRows, ellipsisCharWidth } = cellInfo;
	var curMaxDocLinkWidth = getMaxDocLinkWidth(drawConfigs);
	var cellColumnWidth = currentColumnWidth - paddingWidth;
	var addEllipsisCharWidth = cellRows > visualCellRows ? ellipsisCharWidth : 0;
	if (cellColumnWidth <= curMaxDocLinkWidth) return curMaxDocLinkWidth + paddingWidth + addEllipsisCharWidth;
	var maxSingleLineWidth = getMaxSingleLineWidth(drawConfigs);
	return Math.min(cellColumnWidth, maxSingleLineWidth) + paddingWidth + addEllipsisCharWidth;
}
/**
* 获取最长文档链接宽度
*/ function getMaxDocLinkWidth(drawConfigs) {
	return drawConfigs.reduce((acc, drawConfig, index, arr) => {
		var _a, _b;
		if (drawConfig.type !== DrawType.Bitmap) return acc;
		var docText = arr[index + 1];
		var docTextWidth = (_b = (_a = docText.layouts) === null || _a === void 0 ? void 0 : _a[0].width) !== null && _b !== void 0 ? _b : 0;
		var docLinkWidth = docText.x - drawConfig.x + docTextWidth;
		return Math.max(acc, docLinkWidth);
	}, 0);
}
/**
* 获取最长换行数据宽度
*/ function getMaxSingleLineWidth(drawConfigs) {
	var sameYTextLineWidthObject = drawConfigs.filter((config) => config.type !== DrawType.Bitmap).reduce((acc, textConfig) => {
		var _a, _b;
		var textY = textConfig.y;
		if (!acc[textY]) acc[textY] = 0;
		acc[textY] = Math.max(acc[textY], textConfig.x + ((_b = (_a = textConfig.layouts) === null || _a === void 0 ? void 0 : _a[0].width) !== null && _b !== void 0 ? _b : 0));
		return acc;
	}, {});
	return Object.values(sameYTextLineWidthObject).reduce((acc, width) => Math.max(acc, width), 0);
}
var defaultStyle, TextCollector, paddingWidth;
var init_text = __esmMin((() => {
	init_es$1();
	init_abstract();
	init_lib();
	init_pen();
	init_hyperlink_icon();
	init_style();
	defaultStyle = {
		hasIcon: true,
		iconMarginRight: 2,
		iconSize: style.size.iconSmall
	};
	TextCollector = /* @__PURE__ */ function(BaseFieldCollector) {
		"use strict";
		_inherits$3(TextCollector, BaseFieldCollector);
		function TextCollector() {
			return BaseFieldCollector.apply(this, arguments) || this;
		}
		var _proto = TextCollector.prototype;
		_proto.measureWidth = function measureWidth(drawConfigs, measureConfig) {
			var _a;
			var firstConfig = drawConfigs[0];
			var lastConfig = drawConfigs[drawConfigs.length - 1];
			if (!firstConfig || !lastConfig) return 0;
			var firstConfigStartX = 0;
			if (firstConfig.type === DrawType.Text) {
				var firstConfigLayouts = firstConfig.layouts;
				firstConfigStartX = firstConfig.x + (((_a = firstConfigLayouts === null || firstConfigLayouts === void 0 ? void 0 : firstConfigLayouts[0]) === null || _a === void 0 ? void 0 : _a.x) || 0);
			} else if (firstConfig.type === DrawType.Bitmap) firstConfigStartX = firstConfig.x;
			var lastConfigEndX = 0;
			if (lastConfig.type === DrawType.Text) {
				var lastConfigLayouts = lastConfig.layouts;
				var lastLayout = lastConfigLayouts === null || lastConfigLayouts === void 0 ? void 0 : lastConfigLayouts[lastConfigLayouts.length - 1];
				lastConfigEndX = lastConfig.x + ((lastLayout === null || lastLayout === void 0 ? void 0 : lastLayout.x) || 0) + ((lastLayout === null || lastLayout === void 0 ? void 0 : lastLayout.width) || 0);
			} else if (lastConfig.type === DrawType.Bitmap) lastConfigEndX = lastConfig.x + lastConfig.width;
			var textContentWidth = Math.max(0, lastConfigEndX - firstConfigStartX);
			if (!measureConfig) return textContentWidth;
			return measureAdaptiveColumnWidth({
				drawConfigs,
				textContentWidth,
				measureConfig
			});
		};
		_proto.measureHeight = function measureHeight(drawConfigs) {
			var _a;
			var textConfigs = drawConfigs.filter((config) => config.type === DrawType.Text);
			var firstConfig = textConfigs[0];
			var lastConfig = textConfigs[textConfigs.length - 1];
			if ((firstConfig === null || firstConfig === void 0 ? void 0 : firstConfig.type) !== DrawType.Text || (lastConfig === null || lastConfig === void 0 ? void 0 : lastConfig.type) !== DrawType.Text) return 0;
			var firstTextY = firstConfig.y;
			var { fontSize } = firstConfig;
			var { lineHeight } = firstConfig;
			var lastTextY = lastConfig.y;
			var lastConfigLayouts = lastConfig.layouts;
			var lastContentY = lastTextY + (((_a = lastConfigLayouts === null || lastConfigLayouts === void 0 ? void 0 : lastConfigLayouts[lastConfigLayouts.length - 1]) === null || _a === void 0 ? void 0 : _a.y) || 0);
			var oneLineTakeHeight = (lineHeight || 1) * (fontSize || style.size.fontSizeNormal);
			return Math.max(0, lastContentY + oneLineTakeHeight - firstTextY);
		};
		_proto.collect = function collect(rect, standardCell, collectConfig, field, customStyle = defaultStyle) {
			var _$style = Object.assign({}, defaultStyle, customStyle);
			if (collectConfig.maxLines > 1) return this.collectMulti(rect, standardCell, collectConfig, _$style, field);
			return this.collectSingle(rect, standardCell, collectConfig, _$style, field);
		};
		/**
		* 单行模式，比较简单
		*/ _proto.collectSingle = function collectSingle(rect, standardCell, collectConfig, customStyle, field) {
			var minWidth = getMinWidth(collectConfig);
			var resultConfigs = [];
			var cursor = {
				x: 0,
				restWidth: rect.width
			};
			for (var i = 0; i < standardCell.data.length; i++) {
				var cellData = standardCell.data[i];
				resultConfigs.push(...this.getSingleContent(cellData, collectConfig, rect, cursor, customStyle, field));
				var nextCellData = standardCell.data[i + 1];
				if (cursor.restWidth < minWidth) {
					var lastConfig = resultConfigs[resultConfigs.length - 1];
					var lastConfigLayouts = lastConfig.layouts;
					if (!lastConfigLayouts || lastConfigLayouts.length === 0) break;
					var lastTextLayoutIndex = lastConfigLayouts.length - 1;
					var lastTextLayout = lastConfigLayouts[lastTextLayoutIndex];
					if (!lastTextLayout) break;
					addEllipsisCharForLastTextLayout({
						rect,
						lastConfig,
						lastTextLayout,
						lastTextLayoutIndex,
						textMinWidth: minWidth,
						hasUnCollectConfig: !!nextCellData
					});
					break;
				}
			}
			return resultConfigs;
		};
		/**
		* 收集单行内容
		*/ _proto.getSingleContent = function getSingleContent(textData, collectConfig, rect, cursor, customStyle, field) {
			var fragmentConfigs = [];
			var fragment = getFragment(field, textData, collectConfig, customStyle);
			if (!fragment) return [];
			if (fragment.icon) {
				var iconTakeWidth = getIconTakeWidth();
				var iconRect = {
					x: rect.x + cursor.x,
					y: rect.y + (rect.height - defaultStyle.iconSize) / 2,
					width: defaultStyle.iconSize,
					height: defaultStyle.iconSize
				};
				fragmentConfigs.push(pen.config.icon(fragment.icon, iconRect));
				cursor.x += iconTakeWidth;
				cursor.restWidth -= iconTakeWidth;
			}
			var textRect = {
				x: rect.x + cursor.x,
				y: rect.y,
				width: cursor.restWidth,
				height: rect.height
			};
			var textConfig = pen.config.text(Object.assign(Object.assign({
				maxLines: collectConfig.maxLines,
				text: fragment.text.replace(/(\r?\n)/, " ")
			}, textRect), fragment.style));
			fragmentConfigs.push(textConfig);
			var layouts = textConfig.layouts || [];
			var lastLayout = layouts[layouts.length - 1];
			if (lastLayout) {
				cursor.x += lastLayout.width;
				cursor.restWidth -= lastLayout.width;
			}
			return fragmentConfigs;
		};
		/**
		* 多行模式收集
		*/ _proto.collectMulti = function collectMulti(rect, standardCell, collectConfig, customStyle, field) {
			var resultConfigs = [];
			var hasUnCollectConfig = false;
			var minWidth = getMinWidth(collectConfig);
			var lineHeight = getLineHeight(collectConfig);
			var cursor = {
				x: 0,
				y: 0,
				restWidth: rect.width,
				restHeight: rect.height
			};
			for (var i = 0; i < standardCell.data.length; i++) {
				if (rect.width - cursor.x < minWidth) {
					if (standardCell.data[i].text !== pen.util.TextChar.break) breakLineCursor(cursor, lineHeight, rect.width);
				}
				if (cursor.restHeight <= 0) {
					hasUnCollectConfig = !!standardCell.data[i];
					break;
				}
				var cellData = standardCell.data[i];
				resultConfigs.push(...this.getMultiContent(cellData, collectConfig, rect, cursor, customStyle, field));
			}
			addEllipsForMulti(rect, resultConfigs, minWidth, hasUnCollectConfig, lineHeight);
			return resultConfigs;
		};
		/**
		* 收集多行文本内容
		*/ _proto.getMultiContent = function getMultiContent(textData, collectConfig, rect, cursor, customStyle, field) {
			var fragment = getFragment(field, textData, collectConfig, customStyle);
			if (!fragment) return [];
			var fragmentConfigs = [];
			var lineHeight = getLineHeight(collectConfig);
			var isPlainUrl = textData.type === TextType.URL && !fragment.icon;
			if (fragment.icon && textData.type === TextType.URL) {
				var iconTakeWidth = getIconTakeWidth();
				var totalWidth = iconTakeWidth + pen.util.measureTextWidth(fragment.text, fragment.style.fontSize, fragment.style.fontStyle);
				var isNewLine = cursor.x === 0;
				if (cursor.restWidth < totalWidth) if (isNewLine) collectConfig.textConfig.ellipsis = true;
				else breakLineCursor(cursor, lineHeight, rect.width);
				else collectConfig.textConfig.ellipsis = false;
				var iconRect = {
					x: rect.x + cursor.x,
					y: rect.y + cursor.y + (lineHeight - defaultStyle.iconSize) / 2,
					width: defaultStyle.iconSize,
					height: defaultStyle.iconSize
				};
				fragmentConfigs.push(pen.config.icon(fragment.icon, iconRect));
				cursor.x += iconTakeWidth;
				cursor.restWidth -= iconTakeWidth;
				var textRect = {
					x: rect.x + cursor.x,
					y: rect.y + cursor.y,
					width: cursor.restWidth,
					height: cursor.restHeight
				};
				var textConfig = pen.config.text(Object.assign(Object.assign({ text: fragment.text }, textRect), fragment.style));
				fragmentConfigs.push(textConfig);
				updateCursorByTextConfig(cursor, textConfig, lineHeight);
				return fragmentConfigs;
			}
			if (isPlainUrl) {
				var textWidth1 = pen.util.measureTextWidth(fragment.text, fragment.style.fontSize, fragment.style.fontStyle);
				var isNewLine1 = cursor.x === 0;
				if (cursor.restWidth < textWidth1) {
					if (!isNewLine1) breakLineCursor(cursor, lineHeight, rect.width);
				}
			}
			if (cursor.restWidth < getMinWidth(collectConfig)) {
				if (textData.text !== pen.util.TextChar.break) breakLineCursor(cursor, lineHeight, rect.width);
			}
			var isBreakEnd = fragment.text.endsWith(pen.util.TextChar.break);
			var textRect1 = {
				x: rect.x + cursor.x,
				y: rect.y + cursor.y,
				width: cursor.restWidth,
				height: cursor.restHeight
			};
			var firstTextConfig = pen.config.text(Object.assign(Object.assign({ text: fragment.text }, textRect1), fragment.style));
			var layouts = firstTextConfig.layouts || [];
			if (cursor.x !== 0 && layouts.length > 1) {
				var firstLineLayout = layouts[0];
				firstTextConfig.layouts = [firstLineLayout];
				fragmentConfigs.push(firstTextConfig);
				var resetText = fragment.text.substring(firstLineLayout.text.length, fragment.text.length);
				breakLineCursor(cursor, lineHeight, rect.width);
				var resetTextRect = {
					x: rect.x + cursor.x,
					y: rect.y + cursor.y,
					width: cursor.restWidth,
					height: cursor.restHeight
				};
				var resetTextConfig = pen.config.text(Object.assign(Object.assign({ text: resetText }, resetTextRect), fragment.style));
				fragmentConfigs.push(resetTextConfig);
				updateCursorByTextConfig(cursor, resetTextConfig, lineHeight);
			} else {
				fragmentConfigs.push(firstTextConfig);
				updateCursorByTextConfig(cursor, firstTextConfig, lineHeight);
			}
			if (isBreakEnd) breakLineCursor(cursor, lineHeight, rect.width);
			return fragmentConfigs;
		};
		return TextCollector;
	}(BaseFieldCollector);
	paddingWidth = 2 * style.size.cellPadding;
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/field-collector/fields/url/index.js
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
var import_cloneDeep, UrlCollector;
var init_url = __esmMin((() => {
	import_cloneDeep = /* @__PURE__ */ __toESM(require_cloneDeep());
	init_es$1();
	init_abstract();
	init_style();
	UrlCollector = /* @__PURE__ */ function(BaseFieldCollector) {
		"use strict";
		_inherits$2(UrlCollector, BaseFieldCollector);
		function UrlCollector(getCollector) {
			var _this = BaseFieldCollector.call(this) || this;
			_this.getCollector = getCollector;
			return _this;
		}
		var _proto = UrlCollector.prototype;
		_proto.measureWidth = function measureWidth(drawConfigs) {
			return this.getCollector(FieldType.TEXT).measureWidth(drawConfigs);
		};
		_proto.measureHeight = function measureHeight(drawConfigs) {
			return this.getCollector(FieldType.TEXT).measureHeight(drawConfigs);
		};
		_proto.collect = function collect(rect, standardCell, collectConfig, field) {
			var hasIcon = false;
			if (field.type === FieldType.URL) hasIcon = field.getProperty().type === LinkType.ICON_TEXT;
			else if (isFormulaLikeField(field)) {
				var resultFieldAttributes = field.getResultFieldAttributes();
				var resultFieldProperty = resultFieldAttributes === null || resultFieldAttributes === void 0 ? void 0 : resultFieldAttributes.getProperty();
				hasIcon = (resultFieldProperty === null || resultFieldProperty === void 0 ? void 0 : resultFieldProperty.type) === LinkType.ICON_TEXT;
			}
			var linkConfig = (0, import_cloneDeep.default)(collectConfig);
			linkConfig.textConfig.color = style.color.linkColor;
			return this.getCollector(FieldType.TEXT).collect(rect, standardCell, linkConfig, field, { hasIcon });
		};
		return UrlCollector;
	}(BaseFieldCollector);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/shared/avatar-palette.js
/**
* 根据 userId 稳定 hash 到预设头像色板。
*
* - 入参为空字符串时返回色板第 0 项；
* - 算法 `((hash << 5) - hash + charCode) | 0`（等价 `hash * 31 + charCode`，初值 0），
*   与协作模块 `TeamsUserAvatar.stableToneIndex` 完全一致，保证 wb_view canvas 头像
*   与 React DOM 头像在同一 userId 下取到同一色板索引（视觉跨端对齐）。
*
* 如修改算法，必须同步修改 `TeamsUserAvatar` 内的 `stableToneIndex`，否则两端会
* 出现「同一用户头像颜色不一致」的视觉差异。
*
* 放在纯净的 palette 模块（不引入 dayjs 等重依赖），供 field-collector 无副作用引入。
*/ function getAvatarColor(userId) {
	if (!userId) return AVATAR_PALETTE[0];
	var hash = 0;
	for (var i = 0; i < userId.length; i++) hash = (hash << 5) - hash + userId.charCodeAt(i) | 0;
	return AVATAR_PALETTE[Math.abs(hash) % AVATAR_PALETTE.length];
}
/**
* 取用户名首字符作为 fallback 头像文字。
*
* - 优先用 user.name；缺失时回落到 user.text；都为空返回 '?'；
* - 用 Array.from 处理 emoji / 双字节字符，避免取到半个 surrogate；
* - 取首字符后大写。
*/ function getAvatarText(user) {
	var _a;
	var name = user.name || user.text || "";
	if (!name) return "?";
	return ((_a = Array.from(name.trim())[0]) !== null && _a !== void 0 ? _a : "?").toUpperCase();
}
var AVATAR_PALETTE;
var init_avatar_palette = __esmMin((() => {
	AVATAR_PALETTE = [
		"#5AC57A",
		"#607D8B",
		"#3498DB",
		"#8B5CF6",
		"#F59E0B"
	];
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/field-collector/fields/user/index.js
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
var UserCollector;
var init_user = __esmMin((() => {
	init_es();
	init_es$1();
	init_label();
	init_resources();
	init_style();
	init_avatar_palette();
	UserCollector = /* @__PURE__ */ function(LabelFieldCollector) {
		"use strict";
		_inherits$1(UserCollector, LabelFieldCollector);
		function UserCollector() {
			return LabelFieldCollector.apply(this, arguments) || this;
		}
		var _proto = UserCollector.prototype;
		_proto.getLabelOptions = function getLabelOptions(cellDatas, collectConfig) {
			var labelOptions = [];
			var isWecom = domainConfig.getIsWeCom();
			var isWb = domainConfig.getIsWb();
			cellDatas.forEach((cellData) => {
				var _a;
				var { name = "", avatarUrl, corpName = "", uidSource, isShowCorpName, isPersistenceUser, avatarPlaceholder } = cellData;
				var option = {
					text: name,
					height: style.size.tagLarge
				};
				if (isGroupStandardCellData(cellData)) option.iconAlias = NormalIconAlias.GROUP_AVATAR;
				else if (isWb) {
					option.avatarText = getAvatarText(cellData);
					option.avatarBackground = getAvatarColor((_a = cellData.id) !== null && _a !== void 0 ? _a : "");
				} else if (avatarPlaceholder) option.iconAlias = NormalIconAlias.USER_AVATAR;
				else if (avatarUrl) option.iconUrl = avatarUrl;
				else option.iconAlias = NormalIconAlias.USER_AVATAR;
				if (isWecom && isPersistenceUser) return;
				var labelOption = this.mergeOptionConfig(collectConfig, option);
				if (!isWecom) labelOption.iconBorderRadius = labelOption.iconSize / 2;
				if (collectConfig.labelConfig.canDelete) labelOption.deleteIcon = NormalIconAlias.CLOSE_DARK;
				if (corpName || domainConfig.getIsSaaS()) {
					var { corpName: renderCorpName, corpNameColor } = getRenderCorpInfoByCorpName(corpName, isShowCorpName, uidSource);
					if (renderCorpName) {
						labelOption.suffix = renderCorpName ? `@${renderCorpName}` : "";
						labelOption.suffixFontColor = renderCorpName ? corpNameColor : void 0;
						labelOption.suffixMargin = renderCorpName ? 2 : void 0;
					}
				}
				labelOptions.push(labelOption);
			});
			return labelOptions;
		};
		return UserCollector;
	}(LabelFieldCollector);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/field-collector/utils/get-measure-field-type.js
/**
* 获取测量列类型的最终显示类型
* @param field
* @returns
*/ function getMeasureFieldType(field) {
	var _a;
	if (typeof field === "number") return field;
	if (isFormulaLikeField(field)) {
		var formatterType = (_a = field.getResultFieldAttributes()) === null || _a === void 0 ? void 0 : _a.getType();
		if (formatterType) return formatterType;
	}
	return field.type;
}
var init_get_measure_field_type = __esmMin((() => {
	init_es$1();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/field-collector/index.js
function getAIPlaceholder(aiStyle, isGroupAI, isEmpty, isAiDirty, isSummaring) {
	if (!aiStyle) return "";
	if (aiStyle === "InfoAI" && isEmpty && isAiDirty) return i18n.t("正在生成…");
	if (aiStyle === "SumAI") {
		if (isEmpty) return isGroupAI ? i18n.t("待群主进行总结") : i18n.t("待添加人进行总结");
		if (isSummaring) return i18n.t("正在总结…");
	}
	return "";
}
var FieldCollector, fieldCollector;
var init_field_collector = __esmMin((() => {
	init_es();
	init_es$1();
	init_attachment();
	init_checkbox();
	init_error();
	init_image();
	init_link_record();
	init_location();
	init_lookup();
	init_progress();
	init_select();
	init_text();
	init_url();
	init_user();
	init_get_measure_field_type();
	init_style();
	FieldCollector = /* @__PURE__ */ function() {
		"use strict";
		function FieldCollector() {
			this.textCollector = new TextCollector();
			this.selectCollector = new SelectCollector();
			this.linkRecordCollector = new LinkRecordCollector();
			this.userCollector = new UserCollector();
			this.attachmentCollector = new AttachmentCollector();
			this.checkboxCollector = new CheckboxCollector();
			this.progressCollector = new ProgressCollector(this.getCollector.bind(this));
			this.imageCollector = new ImageCollector();
			this.lookupCollector = new LookupCollector(this.getCollector.bind(this));
			this.errorCollector = new ErrorCollector();
			this.urlCollector = new UrlCollector(this.getCollector.bind(this));
			this.locationCollector = new LocaltionCollector(this.getCollector.bind(this));
			this.collectors = /* @__PURE__ */ new Map();
			this.collectors.set(FieldType.SINGLE_SELECT, this.selectCollector);
			this.collectors.set(FieldType.MULTIPLE_SELECT, this.selectCollector);
			this.collectors.set(FieldType.LINK_RECORDS, this.linkRecordCollector);
			this.collectors.set(FieldType.TWO_WAY_LINK_RECORDS, this.linkRecordCollector);
			this.collectors.set(FieldType.USER, this.userCollector);
			this.collectors.set(FieldType.USER_C, this.userCollector);
			this.collectors.set(FieldType.CREATED_USER, this.userCollector);
			this.collectors.set(FieldType.MODIFIED_USER, this.userCollector);
			this.collectors.set(FieldType.ATTACHMENT, this.attachmentCollector);
			this.collectors.set(FieldType.CHECKBOX, this.checkboxCollector);
			this.collectors.set(FieldType.PROGRESS, this.progressCollector);
			this.collectors.set(FieldType.FORMULA, this.lookupCollector);
			this.collectors.set(FieldType.IMAGE, this.imageCollector);
			this.collectors.set(FieldType.LOOKUP, this.lookupCollector);
			this.collectors.set(FieldType.URL, this.urlCollector);
			this.collectors.set(FieldType.LOCATION, this.locationCollector);
			this.collectors.set(FieldType.GROUP_B, this.userCollector);
			for (var fieldType in FieldType) {
				var fieldTypeValue = Number(fieldType);
				if (!this.collectors.has(fieldTypeValue) && !isNaN(fieldTypeValue)) this.collectors.set(fieldTypeValue, this.textCollector);
			}
		}
		var _proto = FieldCollector.prototype;
		_proto.getCollector = function getCollector(fieldType) {
			return this.collectors.get(fieldType) || this.textCollector;
		};
		/**
		* 收集列类型的绘制内容
		* @param rect 内容绘制区域
		* @param collectConfig 收集配置
		* @param standardCell 单元格数据
		* @param field 列属性
		* @returns
		*/ _proto.collect = function collect(rect, collectConfig, standardCell, field) {
			var _a;
			if ((_a = collectConfig.aiConfig) === null || _a === void 0 ? void 0 : _a.aiFieldStyle) {
				var aiResult = this.getAIResult(collectConfig, standardCell);
				if (aiResult) {
					collectConfig = aiResult.collectConfig;
					standardCell = aiResult.newStandardCell;
				}
			}
			if (standardCell.data.length === 0 && (field === null || field === void 0 ? void 0 : field.getType()) !== FieldType.PROGRESS) return [];
			if (field === null || field === void 0 ? void 0 : field.fieldErrorType) return this.errorCollector.collect(rect, standardCell, collectConfig, field);
			var collector = this.collectors.get(standardCell.sourceType);
			if (collector) return collector.collect(rect, standardCell, collectConfig, field);
			return [];
		};
		_proto.getDefaultConfig = function getDefaultConfig(assignConfig) {
			return {
				maxLines: (assignConfig === null || assignConfig === void 0 ? void 0 : assignConfig.maxLines) || 1,
				textConfig: Object.assign({}, assignConfig === null || assignConfig === void 0 ? void 0 : assignConfig.textConfig),
				labelConfig: Object.assign({
					canWrap: true,
					canDelete: false
				}, assignConfig === null || assignConfig === void 0 ? void 0 : assignConfig.labelConfig),
				checkboxConfig: Object.assign({ hasTitle: false }, assignConfig === null || assignConfig === void 0 ? void 0 : assignConfig.checkboxConfig),
				formulaConfig: Object.assign({ errorType: "onlyIcon" }, assignConfig === null || assignConfig === void 0 ? void 0 : assignConfig.formulaConfig),
				attachmentConfig: Object.assign({ thumbnailMode: false }, assignConfig === null || assignConfig === void 0 ? void 0 : assignConfig.attachmentConfig)
			};
		};
		/**
		* 获取收集内容的总宽度（一行渲染完的总宽度）
		* 内容 drawConfigs 必须是以固定一行高度收集的
		* @param drawConfigs 通过 collect 方法获取的内容
		* @returns
		*/ _proto.measureWidth = function measureWidth(field, drawConfigs, measureConfig) {
			var _a;
			var fieldType = getMeasureFieldType(field);
			return Math.ceil((_a = this.getCollector(fieldType)) === null || _a === void 0 ? void 0 : _a.measureWidth(drawConfigs, measureConfig)) || 0;
		};
		/**
		* 获取收集内容的总高度（一列渲染完的总高度）
		* 内容 drawConfigs 必须是以固定宽度收集的
		* @param drawConfigs 通过 collect 方法收集到的内容
		* @returns
		*/ _proto.measureHeight = function measureHeight(field, drawConfigs) {
			var _a;
			var fieldType = getMeasureFieldType(field);
			return Math.ceil((_a = this.getCollector(fieldType)) === null || _a === void 0 ? void 0 : _a.measureHeight(drawConfigs)) || 0;
		};
		_proto.getAIResult = function getAIResult(collectConfig, standardCell) {
			if (!collectConfig.aiConfig) return;
			var isEmpty = standardCell.data.length === 0;
			var { aiFieldStyle, isAiDirty, isGroupAi } = collectConfig.aiConfig;
			var text = getAIPlaceholder(aiFieldStyle, isGroupAi, isEmpty, isAiDirty, standardCell.data.length === 1 && standardCell.data[0].aiCalcStatus);
			if (!text) return;
			var newStandardCell = Object.assign(Object.assign({}, standardCell), { data: [{ text }] });
			collectConfig.textConfig.color = style.color.lightUltraFontColor;
			return {
				newStandardCell,
				collectConfig
			};
		};
		return FieldCollector;
	}();
	fieldCollector = new FieldCollector();
}));
//#endregion
//#region ../../node_modules/dayjs/plugin/relativeTime.js
var require_relativeTime = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(r, e) {
		"object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (r = "undefined" != typeof globalThis ? globalThis : r || self).dayjs_plugin_relativeTime = e();
	})(exports, (function() {
		"use strict";
		return function(r, e, t) {
			r = r || {};
			var n = e.prototype, o = {
				future: "in %s",
				past: "%s ago",
				s: "a few seconds",
				m: "a minute",
				mm: "%d minutes",
				h: "an hour",
				hh: "%d hours",
				d: "a day",
				dd: "%d days",
				M: "a month",
				MM: "%d months",
				y: "a year",
				yy: "%d years"
			};
			function i(r, e, t, o) {
				return n.fromToBase(r, e, t, o);
			}
			t.en.relativeTime = o, n.fromToBase = function(e, n, i, d, u) {
				for (var f, a, s, l = i.$locale().relativeTime || o, h = r.thresholds || [
					{
						l: "s",
						r: 44,
						d: "second"
					},
					{
						l: "m",
						r: 89
					},
					{
						l: "mm",
						r: 44,
						d: "minute"
					},
					{
						l: "h",
						r: 89
					},
					{
						l: "hh",
						r: 21,
						d: "hour"
					},
					{
						l: "d",
						r: 35
					},
					{
						l: "dd",
						r: 25,
						d: "day"
					},
					{
						l: "M",
						r: 45
					},
					{
						l: "MM",
						r: 10,
						d: "month"
					},
					{
						l: "y",
						r: 17
					},
					{
						l: "yy",
						d: "year"
					}
				], m = h.length, c = 0; c < m; c += 1) {
					var y = h[c];
					y.d && (f = d ? t(e).diff(i, y.d, !0) : i.diff(e, y.d, !0));
					var p = (r.rounding || Math.round)(Math.abs(f));
					if (s = f > 0, p <= y.r || !y.r) {
						p <= 1 && c > 0 && (y = h[c - 1]);
						var v = l[y.l];
						u && (p = u("" + p)), a = "string" == typeof v ? v.replace("%d", p) : v(p, n, y.l, s);
						break;
					}
				}
				if (n) return a;
				var M = s ? l.future : l.past;
				return "function" == typeof M ? M(a) : M.replace("%s", a);
			}, n.to = function(r, e) {
				return i(r, e, this, !0);
			}, n.from = function(r, e) {
				return i(r, e, this);
			};
			var d = function(r) {
				return r.$u ? t.utc() : t();
			};
			n.toNow = function(r) {
				return this.to(d(this), r);
			}, n.fromNow = function(r) {
				return this.from(d(this), r);
			};
		};
	}));
}));
//#endregion
//#region ../../node_modules/dayjs/locale/zh-hk.js
var require_zh_hk = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(_, e) {
		"object" == typeof exports && "undefined" != typeof module ? module.exports = e(require_dayjs_min()) : "function" == typeof define && define.amd ? define(["dayjs"], e) : (_ = "undefined" != typeof globalThis ? globalThis : _ || self).dayjs_locale_zh_hk = e(_.dayjs);
	})(exports, (function(_) {
		"use strict";
		function e(_) {
			return _ && "object" == typeof _ && "default" in _ ? _ : { default: _ };
		}
		var d = e(_), t = {
			name: "zh-hk",
			months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),
			monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
			weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),
			weekdaysShort: "週日_週一_週二_週三_週四_週五_週六".split("_"),
			weekdaysMin: "日_一_二_三_四_五_六".split("_"),
			ordinal: function(_, e) {
				return "W" === e ? _ + "週" : _ + "日";
			},
			formats: {
				LT: "HH:mm",
				LTS: "HH:mm:ss",
				L: "YYYY/MM/DD",
				LL: "YYYY年M月D日",
				LLL: "YYYY年M月D日 HH:mm",
				LLLL: "YYYY年M月D日dddd HH:mm",
				l: "YYYY/M/D",
				ll: "YYYY年M月D日",
				lll: "YYYY年M月D日 HH:mm",
				llll: "YYYY年M月D日dddd HH:mm"
			},
			relativeTime: {
				future: "%s內",
				past: "%s前",
				s: "幾秒",
				m: "一分鐘",
				mm: "%d 分鐘",
				h: "一小時",
				hh: "%d 小時",
				d: "一天",
				dd: "%d 天",
				M: "一個月",
				MM: "%d 個月",
				y: "一年",
				yy: "%d 年"
			},
			meridiem: function(_, e) {
				var d = 100 * _ + e;
				return d < 600 ? "凌晨" : d < 900 ? "早上" : d < 1100 ? "上午" : d < 1300 ? "中午" : d < 1800 ? "下午" : "晚上";
			}
		};
		return d.default.locale(t, null, !0), t;
	}));
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/shared/avatar-time-utils.js
/**
* 注册 dayjs `relativeTime` 插件（idempotent）。
*
* 调用方应在首次使用 `formatRelativeTime` 前显式调用一次（一般在 state ctor）。
* 多次调用安全：内部用 module-level flag 去重；插件 extend 失败时仅打 warn 不抛错。
*/ function ensureRelativeTimePlugin() {
	if (pluginLoaded) return;
	try {
		import_dayjs_min.default.extend(import_relativeTime.default);
	} catch (e) {
		logger.warn("wb_views/shared", "dayjs.extend(relativeTime) failed", e.message);
	}
	pluginLoaded = true;
}
/**
* 把当前 i18n 语言映射为 dayjs 本地化 code（供 `fromNow()` **按实例**取译文）。
*
* 为何按实例而非全局：gantt / calendar 的 time collector 里有全局 `dayjs.locale('zh-cn')`
* 副作用，会污染全局默认 locale —— 英文环境下 `fromNow()` 仍返回「X 分钟前」。
* 这里在调用处用 `dayjs(ts).locale(code)` 固定当前语言，绕开全局污染。
*/ function getRelativeTimeLocale() {
	switch (getI18nLanguage()) {
		case SupportedLanguages.EN_US: return "en";
		case SupportedLanguages.ZH_HK: return "zh-hk";
		default: return "zh-cn";
	}
}
/**
* 相对时间格式化：1 分钟内显示「刚刚」，其余走 dayjs.fromNow()。
*
* - timestamp 为 0 / 负值 / NaN 时返回 ''；
* - 文案随当前 i18n 语言切换（「刚刚」走 i18n，相对时间按实例 locale，见 {@link getRelativeTimeLocale}）；
* - dayjs.fromNow 抛错时回落到 `M/D` 格式（极端情况，理论上不会触发）。
*
* 调用方需先调用 `ensureRelativeTimePlugin` 注册插件。
*/ function formatRelativeTime(timestamp) {
	if (!timestamp) return "";
	var diff = Date.now() - timestamp;
	if (diff >= 0 && diff < 60 * 1e3) return i18n.t("刚刚");
	var locale = getRelativeTimeLocale();
	try {
		return (0, import_dayjs_min.default)(timestamp).locale(locale).fromNow();
	} catch (_e) {
		return (0, import_dayjs_min.default)(timestamp).format("M/D");
	}
}
/**
* 从 date 列 `IStandardCell` 中抽出「完整时间展示文本」，即 field 自身
* `IBaseTimeProperty.format` 已格式化好的绝对时间文本（如 `2026-06-25 19:53`）。
*
* 与 `wb-cell.ts#makePrefixedDateTimeCollector(useRelativeTime=false)` 完全同源，
* 保证卡片底部相对时间 hover tooltip 时的「完整时间」与 field 原生 DateTime 渲染视觉一致。
*
* 单元格为空 / data[0] 缺失 / text 为空时返回空字符串 —— 由调用方决定是否兜底为
* `formatRelativeTime(timestamp)` 或直接跳过 tooltip。
*
* 抽到 shared 里避免 grid-list / kanban-todo 各写一份、后续格式改动漂移。
*/ function getDateCellFullText(cell) {
	var _a, _b;
	var first = (_a = cell === null || cell === void 0 ? void 0 : cell.data) === null || _a === void 0 ? void 0 : _a[0];
	return (_b = first === null || first === void 0 ? void 0 : first.text) !== null && _b !== void 0 ? _b : "";
}
var import_dayjs_min, import_relativeTime, pluginLoaded;
var init_avatar_time_utils = __esmMin((() => {
	import_dayjs_min = /* @__PURE__ */ __toESM(require_dayjs_min());
	import_relativeTime = /* @__PURE__ */ __toESM(require_relativeTime());
	init_es();
	require_zh_cn();
	require_zh_hk();
	init_avatar_palette();
	pluginLoaded = false;
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/shared/wb-cell.js
/**
* 通用「按单行文本绘制」适配：拼装 TEXT 类型的 `IStandardCell` 并交给 `textCollector` 收集。
*
* - 复用 `DEFAULT_TEXT_FORMAT` 兜底所有未指定的 format 字段（bold / italic / underline / strikeThrough）；
* - `fontColor` 可选：状态列需要染色（取 groupKey.color），其他列保持默认色；
* - 明确绕过 `sourceType` 派发，避免被误派发到 LabelCollector / DateTimeCollector 等。
*/ function collectAsText(params) {
	var { rect, collectConfig, field, text, fontColor } = params;
	var textCell = {
		sourceType: FieldType.TEXT,
		data: [{
			text,
			type: TextType.TEXT,
			format: fontColor ? Object.assign(Object.assign({}, DEFAULT_TEXT_FORMAT), { fontColor }) : Object.assign({}, DEFAULT_TEXT_FORMAT)
		}]
	};
	return fieldCollector.textCollector.collect(rect, textCell, collectConfig, field);
}
/**
* 按 fieldTitle 取 pill 的 icon 几何（`iconOffsetLeft` / `iconTextGap` / `iconSize`）。
*
* 抽出该函数是为了让「按列覆写 icon 几何」的判定只在一处，避免同一 `fieldTitle === STATUS_FIELD_TITLE`
* 分支在多个消费点重复散写（当前消费点：`collectStatusCell` / `collectBodyTag` 的 `drawOnePill`）。
* 后续若 sys_source / sys_tags 需要各自覆写，只需在 `BODY_TAG_PILL_GEOMETRY` 加对应子对象、
* 在此函数补一个分支即可，消费点保持不变。
*
* 状态列（sys_status_id）：icon 20px、iconOffsetLeft -4、iconTextGap 0，比通用胶囊更紧凑显眼。
* 其它列：走通用值 icon 16px、iconOffsetLeft 0、iconTextGap 4。
*/ function getPillIconGeometryByField(fieldTitle) {
	if (fieldTitle === STATUS_FIELD_TITLE) return {
		iconOffsetLeft: BODY_TAG_PILL_GEOMETRY.status.iconOffsetLeft,
		iconTextGap: BODY_TAG_PILL_GEOMETRY.status.iconTextGap,
		iconSize: BODY_TAG_PILL_GEOMETRY.status.iconSize
	};
	return {
		iconOffsetLeft: BODY_TAG_PILL_GEOMETRY.iconOffsetLeft,
		iconTextGap: BODY_TAG_PILL_GEOMETRY.iconTextGap,
		iconSize: BODY_TAG_PILL_GEOMETRY.iconSize
	};
}
/**
* 拼装带列名前缀的 tooltip 文案：`列名：值`。
*
* 用户可见的中文列名从 `WbSharedConfig.fieldTitleMap` 反查（内部标识 `sys_*` → 中文），
* 未命中时省略前缀直接返回原 value（例如宿主自定义 fieldTitle 未在 map 中登记）。
*
* 复用点：
* - `resolveBodyTagItem` 的 STATUS / SOURCE / PRIORITY 分支产出 body tag pill tooltipLabel；
* - grid-list `content.ts` 的 `statusIconTooltipLabel`（主列前置裸 status icon）；
* - 后续新增的 icon-only / iconOnly-展开 pill tooltip 场景。
*
* 分隔符使用中文全角冒号 `：`，与站内其他"字段：值"文案风格一致
* （避免半角冒号 `:` 在中文语境中出现视觉突兀）。
*/ function formatFieldTooltipLabel(fieldTitle, value) {
	var _a;
	var displayName = (_a = WbSharedConfig.fieldTitleMap) === null || _a === void 0 ? void 0 : _a[fieldTitle];
	if (!displayName) return value;
	return `${displayName}：${value}`;
}
/**
* 从 fieldTitle + standardCell 解析出该列要绘制的 BodyTagItem；
* 未识别 / 数据层确判跳过时返回 undefined。
*
* 空数据语义（业务约定）：
* - sys_source：rawText 空 → undefined；rawText 非空但 displayName 空（未命中映射 / 命中但显式空串）→ undefined；
* - sys_priority：rawText 空 → 显示「无」文案 pill（不再走「未设置优先级」不画约定）。
*/ function resolveBodyTagItem(fieldTitle, standardCell) {
	var _a, _b, _c, _d, _e, _f;
	if (fieldTitle === STATUS_FIELD_TITLE) {
		var rawText = (_b = (_a = standardCell === null || standardCell === void 0 ? void 0 : standardCell.data) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.text;
		if (!rawText) return;
		var groupKey = (_c = WbSharedConfig.head.groupBys[STATUS_FIELD_TITLE]) === null || _c === void 0 ? void 0 : _c.groupKeys.find((item) => item.matchValue === rawText);
		if (!groupKey) return;
		return {
			text: groupKey.title,
			iconAlias: groupKey.icon || void 0,
			iconOnly: true,
			tooltipLabel: formatFieldTooltipLabel(STATUS_FIELD_TITLE, groupKey.title)
		};
	}
	if (fieldTitle === SOURCE_FIELD_TITLE) {
		var rawText1 = (_e = (_d = standardCell === null || standardCell === void 0 ? void 0 : standardCell.data) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.text;
		if (!rawText1) return;
		var info = domainConfig.getWbSourceInfo(rawText1);
		if (!(info === null || info === void 0 ? void 0 : info.displayName)) return;
		return {
			text: info.displayName,
			iconUrl: info.iconUrl,
			tooltipLabel: formatFieldTooltipLabel(SOURCE_FIELD_TITLE, info.displayName)
		};
	}
	if (fieldTitle === PRIORITY_FIELD_TITLE) {
		var cellData = (_f = standardCell === null || standardCell === void 0 ? void 0 : standardCell.data) === null || _f === void 0 ? void 0 : _f[0];
		var rawText2 = cellData === null || cellData === void 0 ? void 0 : cellData.text;
		if (!rawText2) {
			var priorityNoneText = getPriorityNoneText();
			return Object.assign({
				text: priorityNoneText,
				tooltipLabel: formatFieldTooltipLabel(PRIORITY_FIELD_TITLE, priorityNoneText)
			}, getWhitePillOverride());
		}
		var label = getPriorityTextMap()[rawText2] || rawText2;
		return Object.assign({
			text: label,
			tooltipLabel: formatFieldTooltipLabel(PRIORITY_FIELD_TITLE, label)
		}, getSelectOptionPillVisual(cellData.style));
	}
}
/**
* 「白底 + 1px 灰边框」pill 视觉覆盖片段。
*
* 复用点：`sys_priority` 无值时的「无」占位 pill + `sys_tags` / `sys_priority` 的 `+N` 折叠 pill。
* 有值的 SELECT pill（`sys_tags` / `sys_priority`）走 `getSelectOptionPillVisual` 真彩渲染，不套此覆盖。
*/ function getWhitePillOverride() {
	return {
		pillBackground: style.color.normalBackground,
		pillBorderColor: style.color.normalBorderColor,
		pillBorderWidth: 1
	};
}
/**
* 把 SELECT 选项的色板枚举（`OptionStyle`）解析为 pill 视觉片段
* （`pillBackground` / `pillFontColor` / 可选 `pillBorderColor` + `pillBorderWidth`）。
*
* - 亮色直接取色板，暗色由 `getOptionStyleWithDarkMode` 统一换算；
* - 深色底色板通常 `borderColor='transparent'`（省略描边），浅色底自带 1px 描边，
*   与 grid 视图 select cell 的绘制策略一致。
*
* 复用点（两列同为 SELECT 家族、cellData 携带 style 色板，视觉规则完全同构）：
* - `sys_tags`（多值 MULTIPLE_SELECT）：`resolveTagsCellItems` 对每颗 tag 各调一次；
* - `sys_priority`（单值 SINGLE_SELECT）：`resolveBodyTagItem` 有值分支调用一次。
*/ function getSelectOptionPillVisual(optionStyleEnum) {
	var optionStyle = getOptionStyleWithDarkMode(optionStyleEnum);
	var isTransparentBorder = !optionStyle.borderColor || optionStyle.borderColor === "transparent" || optionStyle.borderColor === "rgba(0,0,0,0)" || optionStyle.borderColor === "rgba(0, 0, 0, 0)";
	return Object.assign({
		pillBackground: optionStyle.background,
		pillFontColor: optionStyle.textColor
	}, isTransparentBorder ? {} : {
		pillBorderColor: optionStyle.borderColor,
		pillBorderWidth: 1
	});
}
/**
* 把 `sys_tags` 的 IStandardCell 展开为一组 BodyTagItem，每颗 tag 一个 item。
*
* - 数据源：`standardCell.data` 是 `ISelectStandardCellData[]`；每个 cellData.text 即 tag 名，
*   `cellData.style` 为该选项的色板枚举（`OptionStyle`），与 grid 视图 select cell 同源；
* - 视觉：按 `cellData.style` 通过 `getOptionStyleWithDarkMode` 取色板配置
*   （亮色直接返回，暗色走 `darkBackground/darkBorderColor/darkTextColor` 或动态换算），
*   直接映射为 pill 的 `pillBackground` / `pillBorderColor` / `pillFontColor`；
*   色板里深色底通常 `borderColor='transparent'`，浅色底自带 1px 描边，视觉与 grid 单元格
*   里的 select tag 保持一致。tag 列不承载图标语义，无 icon。
* - 空数据（无 data / data 空 / 全部 text 为空）→ 返回 `[]`，调用方按语义决定"不画"还是"回落"。
*/ function resolveTagsCellItems(standardCell) {
	var _a;
	var dataList = (_a = standardCell === null || standardCell === void 0 ? void 0 : standardCell.data) !== null && _a !== void 0 ? _a : [];
	if (!dataList.length) return [];
	var items = [];
	for (var cellData of dataList) {
		var text = cellData === null || cellData === void 0 ? void 0 : cellData.text;
		if (!text) continue;
		items.push(Object.assign({ text }, getSelectOptionPillVisual(cellData.style)));
	}
	return items;
}
/**
* 单 pill 的三层 DrawConfig 产出（rect 底 → 可选 icon → text）。
* 几何 / 视觉完全由调用方计算并传入；本函数不做任何数值推算，仅按位绘制。
*
* 顺序（决定渲染层级）：底矩形 → icon → text。
*/ function collectBodyTagPillFromItem(item, geom) {
	var _a, _b, _c;
	var configs = [];
	var { x, y, pillWidth, itemHeight, textWidth, hasIcon, iconBlockWidth, iconSize, paddingX, iconOffsetLeft = 0, borderRadius, fontSize, background, fontColor, fontStyle } = geom;
	var bgColor = (_a = item.pillBackground) !== null && _a !== void 0 ? _a : background;
	var borderWidth = (_b = item.pillBorderWidth) !== null && _b !== void 0 ? _b : 0;
	var borderColor = item.pillBorderColor;
	configs.push(pen.config.rect(Object.assign(Object.assign({
		x,
		y,
		width: pillWidth,
		height: itemHeight,
		background: bgColor,
		borderRadius,
		borderWidth
	}, borderWidth > 0 && borderColor ? { borderColor } : {}), { level: Level.L2 })));
	if (hasIcon) {
		var iconY = y + (itemHeight - iconSize) / 2;
		var iconX = x + paddingX + iconOffsetLeft;
		if (item.iconAlias) configs.push(pen.config.icon(toThemedKanbanTodoIconAlias(item.iconAlias), {
			x: iconX,
			y: iconY,
			width: iconSize,
			height: iconSize
		}));
		else if (item.iconUrl) configs.push(pen.config.image(item.iconUrl, {
			x: iconX,
			y: iconY,
			width: iconSize,
			height: iconSize
		}));
	}
	if (!item.iconOnly) {
		var textColor = (_c = item.pillFontColor) !== null && _c !== void 0 ? _c : fontColor;
		configs.push(pen.config.text(Object.assign({
			text: item.text,
			x: x + paddingX + iconBlockWidth,
			y: y + 1,
			width: textWidth,
			height: itemHeight,
			fontSize,
			color: textColor,
			wrap: "none",
			ellipsis: true,
			align: "left"
		}, fontStyle ? { fontStyle } : {})));
	}
	return configs;
}
/**
* 单元格分发场景：在给定 contentRect 内顶对齐绘制单 pill。
*
* 适用：grid / kanban-todo / grid-list 视图下，按列分发到 `collectStatusCell` /
* `collectSourceCell` / `collectPriorityCell` 时，pill 起点固定在 `rect.x` / `rect.y`，
* 宽度自适应（受 rect.width 上限收敛）。
*
* 对齐约定：与 grid 默认 cell content 行为一致——`getContentRect` 已扣掉 cellPaddingTop，
* 内容从 rect 顶部开始往下排（参见 `views/grid/collector/content/index.ts#getContentRectByInfo`），
* 因此 pill 的 y 基准是 `rect.y`，再叠加 `BODY_TAG_PILL_GEOMETRY.yOffset`（当前 -3）做小幅上移，
* 使 pill 视觉中心近似对齐 row 中心 / 首行文本行盒中心（详见常量注释）。
* **不做基于 rect.height 的垂直居中**：
*   - 大行高（tall / extraTall / super）下垂直居中会与同行其他列的文本基线错位；
*   - 选中态浮层 `rect.height = Infinity` 时垂直居中会让 pill 被画到无穷远 y → 整列空白。
*
* 文本超长策略：先按 `BODY_TAG_PILL_GEOMETRY.maxTextWidth` 截断，再受 rect 剩余宽度二次收敛；
* 若 rect 太窄连一颗 pill 都画不下（textWidth ≤ 0），返回 `[]`。
*
* @param overrides pill 视觉覆盖：
*   - `background`：pill 底色，默认 `wbColors.tagDefaultBg`（sys_source / sys_priority 使用）；
*     `sys_status_id` 分发时传入 `groupKey.background` 让底色跟随状态语义色（浅底）。
*   - `fontColor`：pill 文字色，默认 `style.color.normalFontColor`；
*     `sys_status_id` 分发时传入 `groupKey.color` 让文字跟随状态语义色（深色）。
*   - `fontStyle`：pill 文字字重；缺省不传（渲染层走默认字重）。当前仅
*     `collectStatusCell` 传 `'600'`（semi-bold），用于视觉上突出「状态」相较于
*     `sys_source` / `sys_priority` / `sys_tags` 的从属地位。
*   - `fieldTitle`：仅用于按列覆写 pill 内 icon 几何（`iconOffsetLeft` / `iconTextGap` / `iconSize`）；
*     传 `sys_status_id` 会自动取 `BODY_TAG_PILL_GEOMETRY.status` 覆写值，让状态胶囊比通用胶囊
*     更紧凑显眼（icon 20px 左贴、与文字零间距）。其它字段或不传时走通用几何。
*   item 自身若声明 `pillBackground` / `pillBorderColor` / `pillBorderWidth`（如 sys_tags 白底+灰边框）
*   仍会在 `collectBodyTagPillFromItem` 内部覆盖这里的 background；两级覆盖不冲突。
*/ function collectBodyTagPillInRect(rect, item, overrides) {
	var _a, _b, _c;
	var { itemHeight, borderRadius, paddingX, fontSize, maxTextWidth, yOffset } = BODY_TAG_PILL_GEOMETRY;
	var { iconOffsetLeft, iconTextGap, iconSize } = getPillIconGeometryByField(overrides === null || overrides === void 0 ? void 0 : overrides.fieldTitle);
	var hasIcon = !!(item.iconAlias || item.iconUrl);
	var iconBlockWidth = hasIcon ? iconSize + iconTextGap : 0;
	var measured = pen.util.measureTextWidth(item.text, fontSize, (_a = overrides === null || overrides === void 0 ? void 0 : overrides.fontStyle) !== null && _a !== void 0 ? _a : "normal");
	var rectTextBudget = rect.width - paddingX * 2 - iconBlockWidth;
	if (rectTextBudget <= 0) return [];
	var textWidth = Math.min(measured, maxTextWidth, rectTextBudget);
	var pillWidth = paddingX + iconBlockWidth + textWidth + paddingX;
	return collectBodyTagPillFromItem(item, {
		x: rect.x,
		y: rect.y + yOffset,
		pillWidth,
		itemHeight,
		textWidth,
		hasIcon,
		iconBlockWidth,
		iconSize,
		paddingX,
		iconOffsetLeft,
		borderRadius,
		fontSize,
		background: (_b = overrides === null || overrides === void 0 ? void 0 : overrides.background) !== null && _b !== void 0 ? _b : wbColors.tagDefaultBg,
		fontColor: (_c = overrides === null || overrides === void 0 ? void 0 : overrides.fontColor) !== null && _c !== void 0 ? _c : style.color.normalFontColor,
		fontStyle: overrides === null || overrides === void 0 ? void 0 : overrides.fontStyle
	});
}
/**
* 判定 `hovered` 命中信息是否落在 `pill` 上（rect 坐标 identity 比较）。
*
* ⚠️ **不能用 fieldId 做匹配**：sys_tags 是单字段多值列，同一段内所有 pill（含 `+N`）
* 共享同一个 sys_tags fieldId；按 fieldId 匹配会导致 hover 任意一颗时整段 pill 全部
* 同时呈现 hover 反馈。用 rect 坐标（x/y/w/h 全等）唯一定位单颗 pill：
* - 同一 record 内 pill 顺次排布不重叠，rect 坐标天然唯一；
* - 与 `hitInfoKey / cellHitKey` 用同一维度信息（rect + fieldId 序列化）保持一致。
*
* @param hovered 上次 mousemove 命中的 pill（`resolveTagPillHit` 返回；`undefined` 表示未命中）
* @param pill    当前迭代的 pill（含 `rect`）
*/ function isSameTagPillHit(hovered, pill) {
	if (!hovered) return false;
	return hovered.rect.x === pill.rect.x && hovered.rect.y === pill.rect.y && hovered.rect.width === pill.rect.width && hovered.rect.height === pill.rect.height;
}
/**
* 在给定矩形内按顺序排布 sys_tags 的多颗 pill，容器不足时以 `+N` pill 折叠。
*
* 溢出算法（对齐 SelectCollector 语义）：
* 1) 若所有 tag 都能装下（Σ pillWidth + gap ≤ rect.width）：全部绘制，无 `+N`；
* 2) 装不下：从头累加，每加一颗都要为末尾的 `+N` pill 预留空间；累加到"再加下一颗
*    会挤掉 `+N`"时停手，末尾放 `+N`，M = 剩余未绘制 tag 数量；
* 3) 一颗普通 pill 都放不下（rect 太窄）：`+N` 独占整段，M = 总数，宽度收敛到 rect.width。
*
* 命中：所有绘制成功的 pill（含 `+N`）都写入 `pillRects`，`+N` pill 额外携带 `overflowItems`
* 供上层 tooltip 展开溢出 tag 完整列表。`fieldId` 由调用方按 sys_tags 列的 fieldId 注入
* （grid 单元格分发场景没有独立 fieldId 概念，可传空串或 sys_tags 列 fieldId）。
*
* 视觉：`+N` pill 与普通 tag pill 完全同款（白底 + 1px 灰边框 + 相同圆角/字号），文本为 `+M`。
*
* @param rect          绘制矩形（宽度用于溢出判定；y 起点视 `applyYOffset` 决定是否叠加 `yOffset`）。
* @param items         待绘制 tag 列表（顺序即绘制顺序）。
* @param fieldId       命中回传的 fieldId（一般为 sys_tags 列 fieldId；grid 单元格分发可为空串）。
* @param applyYOffset  是否对 rect.y 叠加 `BODY_TAG_PILL_GEOMETRY.yOffset`（默认 true 兼容 grid 单元格分发场景）。
*                      - `true`（grid 单元格分发）：rect.y = grid contentRect 顶部（已扣 cellPaddingTop），
*                        pill 需上移 4px 让几何中心近似对齐 row 中心 / 首行行盒中心。
*                      - `false`（grid-list / kanban-todo 独立段）：rect 已是精确的「pill 段容器」
*                        （height = itemHeight，y 由调用方按段布局精确计算），直接 `pillY = rect.y`，
*                        再上移会导致：① pill 视觉偏上；② segRect 收紧 clip 时切掉 pill 顶部边框。
* @param fieldTitle    可选列名开关（如 `SYS_TAGS_FIELD_TITLE`）—— 传入后仅对**真 tag pill**（非 `+N`）
*                      且**文本因 `maxTextWidth` 上限被截断显示省略号**的场景，自动写入
*                      `pillRects[i].tooltipLabel = item.text`（完整原文），供上层 tooltip feature
*                      命中弹层展示。**不拼列名前缀**：pill 视觉本身已明示"这是标签"，再拼「标签：xxx」
*                      属冗余（与 owner/date 需列名区分文本语义的场景不同）。
*                      未截断的 pill / `+N` pill / `item.tooltipLabel` 已自带值时**不覆盖**（自带优先），
*                      对现有 iconOnly pill 场景（sys_priority / sys_source）零影响。
*                      未传（默认空串）：完全等价旧行为，`tooltipLabel` 只取 `item.tooltipLabel`。
*                      形参名保留 `fieldTitle` 而非改成 `enableTruncatedTooltip` 是为了给未来「同一
*                      共享函数需按列语义差异化 tooltip 文案」预留扩展位（届时可按 fieldTitle 分支）。
*/ function collectTagsPillsInRect(rect, items, fieldId = "", applyYOffset = true, fieldTitle = "") {
	if (!items.length) return {
		configs: [],
		pillRects: [],
		width: 0
	};
	var { itemHeight, borderRadius, paddingX, iconOffsetLeft, iconTextGap, iconSize, fontSize, maxTextWidth, yOffset } = BODY_TAG_PILL_GEOMETRY;
	var gap = TAGS_CELL_PILL_GAP;
	var pillY = applyYOffset ? rect.y + yOffset : rect.y;
	/**
	* 计算单颗 BodyTagItem 的 pill 宽度（受 maxTextWidth 上限；不考虑 rect 收敛）。
	*
	* `isTruncated` 反映"实测文本宽度是否超过 `maxTextWidth` 而被截断（省略号呈现）"，
	* 供上层决定是否给该 pill 补一个「hover → 完整文本」的 tooltip：仅截断的 pill 才需要 tooltip，
	* 未截断的直接看得清完整文本，弹 tooltip 反而信息冗余。
	*/ var measurePillWidth = (item) => {
		var hasIcon = !!(item.iconAlias || item.iconUrl);
		var iconBlockWidth = hasIcon ? iconSize + iconTextGap : 0;
		var measured = pen.util.measureTextWidth(item.text, fontSize);
		var textWidth = Math.min(measured, maxTextWidth);
		return {
			pillWidth: paddingX + iconBlockWidth + textWidth + paddingX,
			textWidth,
			hasIcon,
			iconBlockWidth,
			isTruncated: measured > maxTextWidth
		};
	};
	/** 构造 `+N` pill 的 BodyTagItem（复用白底 pill 视觉覆盖，无 icon）。 */ var makePlusNItem = (n) => Object.assign({ text: `+${n}` }, getWhitePillOverride());
	var measured = items.map(measurePillWidth);
	var totalWidthAllVisible = measured.reduce((sum, m, i) => sum + m.pillWidth + (i > 0 ? gap : 0), 0);
	var containerWidth = rect.width;
	var configs = [];
	var pillRects = [];
	var cursorX = rect.x;
	/**
	* 绘制一颗 pill（普通 tag 或 `+N`）并推进 cursor / 命中数组。
	*
	* tooltip 决策优先级：
	* 1) `item.tooltipLabel` 自带（iconOnly pill 场景，如 sys_priority / sys_source）—— 直接沿用；
	* 2) 否则若为真 tag pill（未传 `overflowItems`）且 `fieldTitle` 传入（视作"启用截断自动 tooltip"
	*    的开关）且 `geom.isTruncated` 命中 → 直接把 `item.text`（完整文本）作为 tooltipLabel；
	*    与 owner / date 等其他 tooltip 不同，标签的完整文本本身已自带列语义（用户看得到 pill 视觉），
	*    再拼「标签：xxx」反而冗余，产品明确只要「xxx」；
	* 3) 否则 `tooltipLabel = undefined`（+N pill / 未截断的普通 pill）。
	*/ var drawPill = (item, geom, overflowItems) => {
		var _a;
		var { pillWidth, textWidth, hasIcon, iconBlockWidth, isTruncated } = geom;
		for (var cfg of collectBodyTagPillFromItem(item, {
			x: cursorX,
			y: pillY,
			pillWidth,
			itemHeight,
			textWidth,
			hasIcon,
			iconBlockWidth,
			iconSize,
			paddingX,
			iconOffsetLeft,
			borderRadius,
			fontSize,
			background: wbColors.tagDefaultBg,
			fontColor: style.color.normalFontColor
		})) configs.push(cfg);
		var autoTooltipLabel = !overflowItems && !item.tooltipLabel && fieldTitle && isTruncated ? item.text : void 0;
		pillRects.push(Object.assign({
			fieldId,
			rect: {
				x: cursorX,
				y: pillY,
				width: pillWidth,
				height: itemHeight
			},
			tooltipLabel: (_a = item.tooltipLabel) !== null && _a !== void 0 ? _a : autoTooltipLabel
		}, overflowItems ? { overflowItems } : {}));
		cursorX += pillWidth + gap;
	};
	if (totalWidthAllVisible <= containerWidth) {
		for (var i = 0; i < items.length; i += 1) drawPill(items[i], measured[i]);
		return {
			configs,
			pillRects,
			width: Math.max(0, cursorX - rect.x - gap)
		};
	}
	var keepCount = 0;
	for (var k = items.length - 1; k >= 1; k -= 1) {
		var totalWidth = measurePillWidth(makePlusNItem(items.length - k)).pillWidth;
		for (var i1 = 0; i1 < k; i1 += 1) totalWidth += measured[i1].pillWidth + gap;
		if (totalWidth <= containerWidth) {
			keepCount = k;
			break;
		}
	}
	if (keepCount >= 1) {
		for (var i2 = 0; i2 < keepCount; i2 += 1) drawPill(items[i2], measured[i2]);
		var overflowItems = items.slice(keepCount);
		var plusNItem1 = makePlusNItem(overflowItems.length);
		drawPill(plusNItem1, measurePillWidth(plusNItem1), overflowItems);
		return {
			configs,
			pillRects,
			width: Math.max(0, cursorX - rect.x - gap)
		};
	}
	var overflowItems1 = items;
	var plusNItem2 = makePlusNItem(items.length);
	var plusNGeom2 = measurePillWidth(plusNItem2);
	var bounded = plusNGeom2.pillWidth <= containerWidth ? plusNGeom2 : (() => {
		var pillWidth = Math.max(0, containerWidth);
		var textBudget = Math.max(0, pillWidth - paddingX * 2);
		return {
			pillWidth,
			textWidth: Math.min(plusNGeom2.textWidth, textBudget),
			hasIcon: false,
			iconBlockWidth: 0,
			isTruncated: false
		};
	})();
	if (bounded.pillWidth <= 0) return {
		configs: [],
		pillRects: [],
		width: 0
	};
	drawPill(plusNItem2, bounded, overflowItems1);
	return {
		configs,
		pillRects,
		width: Math.max(0, cursorX - rect.x - gap)
	};
}
/**
* 从 dateTime 列的 `IStandardCell.data[0]` 提取时间戳（ms）。
*
* - 优先取 `timestamp`（dateTime 列规范字段），其次回退到把 `text` 当 ISO/字符串解析；
* - 解析失败或为 0：返回 undefined（调用方回落默认绘制，避免出现"创建时间：Invalid Date"）。
*/ function readDateTimeMs(standardCell) {
	var cellData = standardCell.data[0];
	var ts = cellData === null || cellData === void 0 ? void 0 : cellData.timestamp;
	if (typeof ts === "number" && ts > 0) return ts;
	var text = cellData === null || cellData === void 0 ? void 0 : cellData.text;
	if (text) {
		var parsed = Date.parse(text);
		if (!Number.isNaN(parsed) && parsed > 0) return parsed;
	}
}
/**
* 创建带固定前缀的时间列收集器工厂。
*
* 前缀（如「创建时间：」「截止时间：」）+ 时间文案，拼接后按纯文本绘制。
*
* @param getPrefix 文案前缀取值器（惰性）：含冒号 / 空格 / 国际化处理由调用方完成。
*   之所以传 getter 而非字符串：本文件在模块顶层就构造好收集器（`collectCreatedAtCell` 等），
*   若直接传 `i18n.t(...)` 结果会在模块加载时（i18n 语言默认 zh-CN）把前缀冻结成中文，
*   切到英文/繁体后「创建时间：」不翻译。改为在收集时才调用 `getPrefix()` 取当前语言译文。
* @param useRelativeTime 时间文案模式：
*   - true：调用 `formatRelativeTime(ts)` 生成"X 分钟前 / 刚刚"等相对时间文本，
*     与卡片底部 `sys_updated_at` 视觉一致；
*   - false：直接取 dateTime 列规范字段 `standardCell.data[0].text`，即 field 自身
*     `IBaseTimeProperty.format` 已格式化好的绝对时间展示文本（如 `2026-06-25 19:53`），
*     与列原生 DateTime 渲染保持一致。
*
* 取值不可用时（时间戳解析失败 / 相对时间返回空 / 绝对文本空）回 undefined，调用方回落默认收集。
*/ function makePrefixedDateTimeCollector(getPrefix, useRelativeTime) {
	return ({ rect, collectConfig, standardCell, field }) => {
		var _a;
		var timeText;
		if (useRelativeTime) {
			var ts = readDateTimeMs(standardCell);
			if (!ts) return;
			timeText = formatRelativeTime(ts);
		} else timeText = (_a = standardCell.data[0]) === null || _a === void 0 ? void 0 : _a.text;
		if (!timeText) return;
		return collectAsText({
			rect,
			collectConfig,
			field,
			text: `${getPrefix()}${timeText}`
		});
	};
}
/** 取注册项；若 fieldTitle 未注册或 scope 不在该列适用集合内，返回 undefined。 */ function getActiveEntry(fieldTitle, viewScope) {
	if (!fieldTitle) return;
	var entry = wbSpecialCellCollectors[fieldTitle];
	if (!entry || !entry.scopes.includes(viewScope)) return;
	return entry;
}
/** O(1) 判断该列在指定视图作用域下是否需要走 wb 特殊收集。 */ function isWbSpecialField(fieldTitle, viewScope) {
	return !!getActiveEntry(fieldTitle, viewScope);
}
/**
* 判定一个 field 在 wb 场景下是否属于「文本类」—— 即需要「按内容撑开高度」的字段族。
*
* 语义：
* - 直接 field.getType() 命中 `WB_TEXT_LIKE_FIELD_TYPES` 白名单 → 文本类；
* - LOOKUP / FORMULA 派生列：透视到 `getResultFieldAttributes().getType()`，再走同一白名单
*   —— 用户视觉上引用出来的就是文本，也应视为文本类。
*
* 用途：
* - 选中态浮层高度策略（`views/grid/features/pc/active-point`）：wb 宿主下仅文本类允许按
*   内容撑开（长文本要看得全），其余（select / user / status / tags / date / attachment 等）
*   与单元格 1:1 对齐（不出现"比行更高"的浮层，避免与卡片化视觉分裂）。
*
* 抽到 `wb-cell.ts` 与 `isWbSpecialField` 同层，供 wb 相关特性共享，避免重复实现 field-type 白名单。
*/ function isWbTextLikeField(field) {
	var _a;
	if (!field) return false;
	var type = field.getType();
	if (type === FieldType.LOOKUP || type === FieldType.FORMULA) {
		var resultType = (_a = field.getResultFieldAttributes()) === null || _a === void 0 ? void 0 : _a.getType();
		if (resultType) type = resultType;
	}
	return WB_TEXT_LIKE_FIELD_TYPES.has(type);
}
/**
* 取「wb 特殊列产物」该用哪个 `FieldType` 做 measureWidth / measureHeight。
*
* 背景：调用方（card-single / grid-list/content）需要对产物做 measure 以决定布局位置；
* 但 `fieldCollector.measureXxx` 是按 fieldType 派发到对应 collector 的，
* 而 wb 特殊收集器**可能与原 field 类型不一致**：
* - sys_created_at / sys_due_date：产物为 TextCollector 的 TextConfig[]，
*   即便原 field 是 DATE_TIME，也必须用 `FieldType.TEXT` 测量，否则会派发到 DateTimeCollector
*   拿不到正确几何。
* - sys_status_id / sys_source / sys_priority / sys_tags：产物为 pill 三层 DrawConfig（RectConfig + 可选 IconConfig/ImageConfig + TextConfig），
*   首位是 RectConfig；应该用 `FieldType.SINGLE_SELECT` 走 LabelFieldCollector 基于 Rect 的测量；
*   若误走 TEXT，measureWidth 会过滤掉 RectConfig 拿不到 pill 总宽返回 0。
*
* 未列入特殊表 / scope 未启用的 fieldTitle 返回 undefined（调用方应直接用原 field 走默认 measure）。
*/ function getWbSpecialMeasureFieldType(fieldTitle, viewScope) {
	if (!getActiveEntry(fieldTitle, viewScope)) return;
	if (fieldTitle === STATUS_FIELD_TITLE || fieldTitle === PRIORITY_FIELD_TITLE || fieldTitle === SOURCE_FIELD_TITLE || fieldTitle === TAGS_FIELD_TITLE) return FieldType.SINGLE_SELECT;
	return FieldType.TEXT;
}
/**
* 按 fieldTitle + viewScope 分发到对应特殊收集器。
* - 命中（且 scope 启用）且能产出有效 drawConfigs：返回该 drawConfigs（可能为 [] —— 表示「故意空绘制」）；
* - 未命中 / scope 未启用 / 收集器返回 undefined：返回 undefined，调用方回落默认 `fieldCollector.collect`。
*/ function collectWbSpecialCell(params) {
	var { fieldTitle, viewScope } = params, rest = __rest(params, ["fieldTitle", "viewScope"]);
	var entry = getActiveEntry(fieldTitle, viewScope);
	if (!entry) return;
	return entry.collector(Object.assign(Object.assign({}, rest), { viewScope }));
}
/**
* 收集「body 区标签组」DrawConfig。
*
* 视觉规则（与 sys_tags 视觉对齐）：
* - pill 底：`style.color.tagBackground` + 圆角 `borderRadius`；
* - 可选 icon 居 pill 左侧；text 紧随其后，单行，超长 ellipsis；
* - 多 pill 横向并排，pill 间距 `itemGap`。
*
* 调用方需保证 `fieldIds` 已经过 visible 闸门过滤；本函数只负责：
* - 按 fieldTitle 分发取数（`resolveBodyTagItem`）；
* - 几何 / 视觉计算后委托给 `collectBodyTagPillFromItem` 输出三层 DrawConfig；
* - 数据层空 / 未识别 fieldTitle 时跳过该 pill；
* - 不入 contents 结构 —— 让调用方自行决定向 cardInfo / leftFieldsContents 中的哪个段累加。
*
* 容器宽度溢出处理：本函数不做容器宽度收敛——pill 总宽可能超出调用方容器
* （如卡片 cardWidth - cardPadding*2）。调用方需在渲染层通过 `clipArea` 把绘制
* 内容裁剪到自己的可用矩形（kanban-todo card 在 collect 阶段把 tagRow 的 clipArea
* 写到每个 pill DrawConfig 上），避免修改本函数复杂的几何逻辑。
*/ function collectBodyTag(input) {
	var _loop = function(fieldId) {
		var field = getField(fieldId);
		if (!field) return "continue";
		var fieldTitle = field.getTitle();
		var standardCell = getStandardCell(fieldId, recordId);
		if (fieldTitle === SOURCE_FIELD_TITLE) {
			if (((_b = (_a = standardCell === null || standardCell === void 0 ? void 0 : standardCell.data) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.text) === "manual") return "continue";
		}
		if (fieldTitle === TAGS_FIELD_TITLE) return "continue";
		var item = resolveBodyTagItem(fieldTitle, standardCell);
		if (!item) return "continue";
		var pillItem = item;
		if (expandIconOnly && item.iconOnly) {
			pillItem = Object.assign(Object.assign({}, item), { iconOnly: false });
			if (fieldTitle === STATUS_FIELD_TITLE) {
				var rawText = (_d = (_c = standardCell === null || standardCell === void 0 ? void 0 : standardCell.data) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.text;
				var groupKey = rawText ? (_e = WbSharedConfig.head.groupBys[STATUS_FIELD_TITLE]) === null || _e === void 0 ? void 0 : _e.groupKeys.find((gk) => gk.matchValue === rawText) : void 0;
				if (groupKey) pillItem = Object.assign(Object.assign({}, pillItem), {
					pillBackground: wbColors.tagDefaultBg,
					pillFontColor: (_f = groupKey.color) !== null && _f !== void 0 ? _f : pillItem.pillFontColor
				});
			}
		}
		drawOnePill(pillItem, fieldTitle, fieldId);
	};
	var _a, _b, _c, _d, _e, _f;
	var { fieldIds, recordId, getField, getStandardCell, startX, y, itemGap, background = style.color.tagBackground, fontColor = style.color.normalFontColor, expandIconOnly = false } = input;
	var { itemHeight, borderRadius, paddingX, iconSize, fontSize } = BODY_TAG_PILL_GEOMETRY;
	if (!fieldIds.length) return {
		configs: [],
		width: 0,
		pillRects: []
	};
	var configs = [];
	var pillRects = [];
	var cursorX = startX;
	var drawnCount = 0;
	/**
	* 单颗 pill 的绘制：几何计算 + 三层 DrawConfig 产出 + 命中记录 + cursor 推进。
	* 抽出内部函数是为了同时服务两条上层来源：
	* - 单值 fieldTitle（sys_status_id / sys_priority / sys_source）：resolveBodyTagItem 返回 1 项；
	* - 多值 fieldTitle（sys_tags）：resolveTagsCellItems 展开为 N 项，每颗 tag 都跑一遍这里。
	*
	* 返回 true 表示该 pill 已绘制成功；调用方据此判断是否累加 drawnCount。
	*/ var drawOnePill = (item, fieldTitle, fieldId) => {
		var hasIcon = !!(item.iconAlias || item.iconUrl);
		var isIconOnly = !!item.iconOnly;
		var isStatusField = fieldTitle === STATUS_FIELD_TITLE;
		var { iconOffsetLeft, iconTextGap, iconSize: perFieldIconSize } = getPillIconGeometryByField(fieldTitle);
		var effectiveIconSize = isStatusField ? perFieldIconSize : iconSize;
		var pillFontStyle = "normal";
		var textWidth = isIconOnly ? 0 : pen.util.measureTextWidth(item.text, fontSize, pillFontStyle);
		var iconBlockWidth = isIconOnly ? hasIcon ? effectiveIconSize : 0 : hasIcon ? effectiveIconSize + iconTextGap : 0;
		var pillWidth = isIconOnly ? itemHeight : paddingX + iconBlockWidth + textWidth + paddingX;
		var effectivePaddingX = isIconOnly ? (itemHeight - effectiveIconSize) / 2 : paddingX;
		var pillBorderRadius = isIconOnly ? itemHeight / 2 : borderRadius;
		for (var cfg of collectBodyTagPillFromItem(item, Object.assign({
			x: cursorX,
			y,
			pillWidth,
			itemHeight,
			textWidth,
			hasIcon,
			iconBlockWidth,
			iconSize: effectiveIconSize,
			paddingX: effectivePaddingX,
			iconOffsetLeft: isIconOnly ? 0 : iconOffsetLeft,
			borderRadius: pillBorderRadius,
			fontSize,
			background,
			fontColor
		}, pillFontStyle !== "normal" ? { fontStyle: pillFontStyle } : {}))) configs.push(cfg);
		pillRects.push({
			fieldId,
			rect: {
				x: cursorX,
				y,
				width: pillWidth,
				height: itemHeight
			},
			tooltipLabel: item.tooltipLabel
		});
		cursorX += pillWidth + itemGap;
		drawnCount += 1;
	};
	for (var fieldId of fieldIds) _loop(fieldId);
	if (drawnCount === 0) return {
		configs: [],
		width: 0,
		pillRects: []
	};
	return {
		configs,
		width: cursorX - startX - itemGap,
		pillRects
	};
}
var ALL_SCOPES, CARD_ONLY_SCOPES, TAGS_SCOPES, STATUS_FIELD_TITLE, SYS_STATUS_FIELD_TITLE, SOURCE_FIELD_TITLE, PRIORITY_FIELD_TITLE, SYS_PRIORITY_FIELD_TITLE, TAGS_FIELD_TITLE, SYS_TAGS_FIELD_TITLE, CREATED_AT_FIELD_TITLE, DUE_DATE_FIELD_TITLE, BODY_TAG_PILL_GEOMETRY, getPriorityNoneText, getPriorityTextMap, collectStatusCell, collectSourceCell, collectPriorityCell, TAGS_CELL_PILL_GAP, collectTagsCell, collectCreatedAtCell, collectDueDateCell, wbSpecialCellCollectors, WB_TEXT_LIKE_FIELD_TYPES;
var init_wb_cell = __esmMin((() => {
	init_tslib_es6();
	init_es();
	init_es$1();
	init_field_collector();
	init_lib();
	init_pen();
	init_style();
	init_get_block_style();
	init_color();
	init_icon();
	init_avatar_time_utils();
	init_wb_config();
	ALL_SCOPES = [
		ViewType.GRID,
		ViewType.KANBAN,
		ViewType.LIST
	];
	CARD_ONLY_SCOPES = [ViewType.KANBAN, ViewType.LIST];
	TAGS_SCOPES = ALL_SCOPES;
	STATUS_FIELD_TITLE = "sys_status_id";
	SYS_STATUS_FIELD_TITLE = STATUS_FIELD_TITLE;
	SOURCE_FIELD_TITLE = "sys_source";
	PRIORITY_FIELD_TITLE = "sys_priority";
	SYS_PRIORITY_FIELD_TITLE = PRIORITY_FIELD_TITLE;
	TAGS_FIELD_TITLE = "sys_tags";
	SYS_TAGS_FIELD_TITLE = TAGS_FIELD_TITLE;
	CREATED_AT_FIELD_TITLE = "sys_created_at";
	DUE_DATE_FIELD_TITLE = "sys_due_date";
	BODY_TAG_PILL_GEOMETRY = {
		itemHeight: 20,
		borderRadius: 8,
		paddingX: 8,
		iconOffsetLeft: 0,
		iconTextGap: 4,
		iconSize: 16,
		fontSize: 12,
		maxTextWidth: 100,
		yOffset: 3,
		status: {
			iconOffsetLeft: -4,
			iconTextGap: 0,
			iconSize: 20
		}
	};
	getPriorityNoneText = () => i18n.t("无");
	getPriorityTextMap = () => ({
		urgent: i18n.t("紧急"),
		high: i18n.t("高"),
		medium: i18n.t("中"),
		low: i18n.t("低")
	});
	collectStatusCell = ({ rect, standardCell }) => {
		var _a, _b;
		var matchValue = (_a = standardCell.data[0]) === null || _a === void 0 ? void 0 : _a.text;
		if (!matchValue) return;
		var groupKey = (_b = WbSharedConfig.head.groupBys[STATUS_FIELD_TITLE]) === null || _b === void 0 ? void 0 : _b.groupKeys.find((item) => item.matchValue === matchValue);
		if (!groupKey) return;
		return collectBodyTagPillInRect(rect, {
			text: groupKey.title,
			iconAlias: groupKey.icon || void 0,
			iconOnly: false
		}, {
			background: wbColors.tagDefaultBg,
			fontColor: groupKey.color,
			fontStyle: "",
			fieldTitle: STATUS_FIELD_TITLE
		});
	};
	collectSourceCell = ({ rect, standardCell, viewScope }) => {
		var item = resolveBodyTagItem(SOURCE_FIELD_TITLE, standardCell);
		if (!item) return [];
		return collectBodyTagPillInRect(rect, viewScope === ViewType.GRID ? Object.assign(Object.assign({}, item), {
			iconUrl: void 0,
			iconAlias: void 0
		}) : item);
	};
	collectPriorityCell = ({ rect, standardCell }) => {
		var item = resolveBodyTagItem(PRIORITY_FIELD_TITLE, standardCell);
		if (!item) return [];
		return collectBodyTagPillInRect(rect, item);
	};
	TAGS_CELL_PILL_GAP = 4;
	collectTagsCell = ({ rect, standardCell }) => {
		var items = resolveTagsCellItems(standardCell);
		if (!items.length) return [];
		var { configs } = collectTagsPillsInRect(rect, items);
		return configs;
	};
	collectCreatedAtCell = makePrefixedDateTimeCollector(() => `${i18n.t("创建时间")}：`, false);
	collectDueDateCell = makePrefixedDateTimeCollector(() => `${i18n.t("截止时间")}：`, false);
	wbSpecialCellCollectors = {
		[STATUS_FIELD_TITLE]: {
			collector: collectStatusCell,
			scopes: ALL_SCOPES
		},
		[SOURCE_FIELD_TITLE]: {
			collector: collectSourceCell,
			scopes: ALL_SCOPES
		},
		[PRIORITY_FIELD_TITLE]: {
			collector: collectPriorityCell,
			scopes: ALL_SCOPES
		},
		[TAGS_FIELD_TITLE]: {
			collector: collectTagsCell,
			scopes: TAGS_SCOPES
		},
		[CREATED_AT_FIELD_TITLE]: {
			collector: collectCreatedAtCell,
			scopes: CARD_ONLY_SCOPES
		},
		[DUE_DATE_FIELD_TITLE]: {
			collector: collectDueDateCell,
			scopes: CARD_ONLY_SCOPES
		}
	};
	WB_TEXT_LIKE_FIELD_TYPES = new Set([
		FieldType.TEXT,
		FieldType.PHONE,
		FieldType.EMAIL,
		FieldType.NUMBER,
		FieldType.PERCENT,
		FieldType.CURRENCY,
		FieldType.AUTO_NUMBER
	]);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/plugins/auto-scroll/index.js
function _construct(Parent, args, Class) {
	if (_is_native_reflect_construct()) _construct = Reflect.construct;
	else _construct = function construct(Parent, args, Class) {
		var a = [null];
		a.push.apply(a, args);
		var instance = new (Function.bind.apply(Parent, a))();
		if (Class) _set_prototype_of(instance, Class.prototype);
		return instance;
	};
	return _construct.apply(null, arguments);
}
function _get_prototype_of(o) {
	_get_prototype_of = Object.setPrototypeOf ? Object.getPrototypeOf : function getPrototypeOf(o) {
		return o.__proto__ || Object.getPrototypeOf(o);
	};
	return _get_prototype_of(o);
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
function _is_native_function(fn) {
	return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
function _set_prototype_of(o, p) {
	_set_prototype_of = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of(o, p);
}
function _wrap_native_super(Class) {
	var _cache = typeof Map === "function" ? /* @__PURE__ */ new Map() : void 0;
	_wrap_native_super = function wrapNativeSuper(Class) {
		if (Class === null || !_is_native_function(Class)) return Class;
		if (typeof Class !== "function") throw new TypeError("Super expression must either be null or a function");
		if (typeof _cache !== "undefined") {
			if (_cache.has(Class)) return _cache.get(Class);
			_cache.set(Class, Wrapper);
		}
		function Wrapper() {
			return _construct(Class, arguments, _get_prototype_of(this).constructor);
		}
		Wrapper.prototype = Object.create(Class.prototype, { constructor: {
			value: Wrapper,
			enumerable: false,
			writable: true,
			configurable: true
		} });
		return _set_prototype_of(Wrapper, Class);
	};
	return _wrap_native_super(Class);
}
function _is_native_reflect_construct() {
	try {
		var result = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
	} catch (_) {}
	return (_is_native_reflect_construct = function() {
		return !!result;
	})();
}
var import_main, Direction, MouseDirection, defaultAdvance, AutoScrollCustomMouseEvent, AutoScroll;
var init_auto_scroll = __esmMin((() => {
	import_main = require_main();
	init_es();
	(function(Direction) {
		Direction[Direction["X"] = 0] = "X";
		Direction[Direction["Y"] = 1] = "Y";
		Direction[Direction["BOTH"] = 2] = "BOTH";
	})(Direction || (Direction = {}));
	(function(MouseDirection) {
		MouseDirection[MouseDirection["LEFT"] = 0] = "LEFT";
		MouseDirection[MouseDirection["RIGHT"] = 1] = "RIGHT";
		MouseDirection[MouseDirection["UP"] = 2] = "UP";
		MouseDirection[MouseDirection["DOWN"] = 3] = "DOWN";
	})(MouseDirection || (MouseDirection = {}));
	defaultAdvance = 20;
	AutoScrollCustomMouseEvent = /* @__PURE__ */ function(MouseEvent1) {
		"use strict";
		_inherits(AutoScrollCustomMouseEvent, MouseEvent1);
		function AutoScrollCustomMouseEvent() {
			return MouseEvent1.apply(this, arguments) || this;
		}
		return AutoScrollCustomMouseEvent;
	}(_wrap_native_super(MouseEvent));
	AutoScroll = /* @__PURE__ */ function(Disposable) {
		"use strict";
		_inherits(AutoScroll, Disposable);
		function AutoScroll(options) {
			var _this = Disposable.call(this) || this;
			_this.options = options;
			_this.cacheOffsetX = 0;
			_this.cacheOffsetY = 0;
			_this.direction = Direction.Y;
			_this.mouseDirectionX = MouseDirection.LEFT;
			_this.mouseDirectionY = MouseDirection.DOWN;
			_this.eventDispose = new import_main.DisposableStore();
			_this.onWindowMouseMove = (event) => {
				if (event instanceof AutoScrollCustomMouseEvent || !_this.options) return;
				_this.cancelAutoScroll();
				var { clientX, clientY } = event;
				if (clientY !== _this.cacheOffsetY) _this.mouseDirectionY = clientY > _this.cacheOffsetY ? MouseDirection.DOWN : MouseDirection.UP;
				if (clientX !== _this.cacheOffsetX) _this.mouseDirectionX = clientX > _this.cacheOffsetX ? MouseDirection.RIGHT : MouseDirection.LEFT;
				_this.cacheOffsetX = clientX;
				_this.cacheOffsetY = clientY;
				switch (_this.direction) {
					case Direction.X:
						_this.autoScrollX(clientX, clientY);
						break;
					case Direction.Y:
						_this.autoScrollY(clientX, clientY);
						break;
					case Direction.BOTH:
						_this.autoScrollX(clientX, clientY);
						_this.autoScrollY(clientX, clientY);
						break;
				}
			};
			_this.onDocumentMouseUp = () => {
				_this.dispose();
			};
			return _this;
		}
		var _proto = AutoScroll.prototype;
		_proto.readyX = function readyX(options) {
			this.readyWhenMouseDown(Direction.X, options);
		};
		_proto.readyY = function readyY(options) {
			this.readyWhenMouseDown(Direction.Y, options);
		};
		_proto.readyBoth = function readyBoth(options) {
			this.readyWhenMouseDown(Direction.BOTH, options);
		};
		_proto.dispose = function dispose() {
			Disposable.prototype.dispose.call(this);
			this.cancelAutoScroll();
			this.raf = 0;
			this.cacheOffsetX = 0;
			this.cacheOffsetY = 0;
			this.eventDispose.clear();
		};
		_proto.isDispatching = function isDispatching() {
			return !!this.raf;
		};
		_proto.update = function update(options) {
			this.options = Object.assign({}, this.options, options);
		};
		_proto.autoY = function autoY(...parameters) {
			this.autoScrollY(...parameters);
		};
		_proto.readyWhenMouseDown = function readyWhenMouseDown(direction, options) {
			this.direction = direction;
			this.options = Object.assign({}, this.options, options);
			this.eventDispose.add(dom.addDisposableListener(window, "mousemove", this.onWindowMouseMove));
			this.eventDispose.add(dom.addDisposableListener(document, "mouseup", this.onDocumentMouseUp));
		};
		_proto.autoScrollX = function autoScrollX(clientX, clientY) {
			var _a, _b;
			var { left, right } = this.getAdvances();
			var { offsetX, offsetY } = this.getViewOffset(clientX, clientY);
			if ((_b = (_a = this.options).preventX) === null || _b === void 0 ? void 0 : _b.call(_a, offsetX, offsetY)) return;
			var boundRect = this.options.getBoundRect();
			var scrollLeft = this.options.getScrollLeft();
			if (this.mouseDirectionX === MouseDirection.RIGHT && offsetX > boundRect.right - right) {
				this.startAutoScroll(this.getPace(offsetX, boundRect.right - right) + scrollLeft, MouseDirection.RIGHT);
				return;
			}
			if (this.mouseDirectionX === MouseDirection.LEFT && offsetX < boundRect.left + left) {
				this.startAutoScroll(scrollLeft - this.getPace(offsetX, boundRect.left + left), MouseDirection.LEFT);
				return;
			}
		};
		_proto.autoScrollY = function autoScrollY(clientX, clientY) {
			var _a, _b;
			var { offsetX, offsetY } = this.getViewOffset(clientX, clientY);
			if ((_b = (_a = this.options).preventY) === null || _b === void 0 ? void 0 : _b.call(_a, offsetX, offsetY)) return;
			var boundRect = this.options.getBoundRect();
			var { top, bottom } = this.getAdvances();
			var scrollTop = this.options.getScrollTop();
			if (this.mouseDirectionY === MouseDirection.DOWN && offsetY >= boundRect.bottom - bottom) {
				this.startAutoScroll(this.getPace(offsetY, boundRect.bottom - bottom) + scrollTop, MouseDirection.DOWN);
				return;
			}
			if (this.mouseDirectionY === MouseDirection.UP && offsetY - top <= boundRect.top) {
				this.startAutoScroll(scrollTop - this.getPace(offsetY, boundRect.top + top), MouseDirection.UP);
				return;
			}
		};
		_proto.startAutoScroll = function startAutoScroll(scrollTo, direction) {
			var _a, _b;
			var { top, bottom, left, right } = this.getAdvances();
			var x = this.cacheOffsetX;
			var y = this.cacheOffsetY;
			var newScrollTo = scrollTo;
			if (direction === MouseDirection.LEFT) {
				if (this.options.getScrollLeft() === 0) return;
				newScrollTo -= left;
				this.options.scrollToX(newScrollTo);
			}
			if (direction === MouseDirection.RIGHT) {
				newScrollTo += right;
				this.options.scrollToX(newScrollTo);
			}
			if (direction === MouseDirection.UP) {
				if (this.options.getScrollTop() === 0) return;
				y = ((_b = (_a = this.options).getBoundRectTopEdgeOffset) === null || _b === void 0 ? void 0 : _b.call(_a)) || y;
				newScrollTo -= top;
				this.options.scrollToY(newScrollTo);
			}
			if (direction === MouseDirection.DOWN) {
				newScrollTo += bottom;
				this.options.scrollToY(newScrollTo);
			}
			try {
				var event = new AutoScrollCustomMouseEvent("mousemove", {
					clientX: x,
					clientY: y
				});
				window.dispatchEvent(event);
			} catch (e) {}
			this.raf = requestAnimationFrame(() => {
				this.startAutoScroll(newScrollTo, direction);
			});
		};
		_proto.cancelAutoScroll = function cancelAutoScroll() {
			if (this.raf) cancelAnimationFrame(this.raf);
		};
		_proto.getPace = function getPace(offset, edge) {
			return Math.round(Math.abs(offset - edge * this.options.getScale()));
		};
		_proto.getAdvances = function getAdvances() {
			var _a, _b, _c, _d, _e, _f, _g, _h;
			var top = ((_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.advanceRect) === null || _b === void 0 ? void 0 : _b.top) || defaultAdvance;
			return {
				left: ((_d = (_c = this.options) === null || _c === void 0 ? void 0 : _c.advanceRect) === null || _d === void 0 ? void 0 : _d.left) || defaultAdvance,
				right: ((_f = (_e = this.options) === null || _e === void 0 ? void 0 : _e.advanceRect) === null || _f === void 0 ? void 0 : _f.right) || defaultAdvance,
				top,
				bottom: ((_h = (_g = this.options) === null || _g === void 0 ? void 0 : _g.advanceRect) === null || _h === void 0 ? void 0 : _h.bottom) || defaultAdvance
			};
		};
		_proto.getViewOffset = function getViewOffset(clientX, clientY) {
			var rootOffset = this.options.getRoot().getBoundingClientRect();
			return {
				offsetX: (clientX - rootOffset.left) / this.options.getScale(),
				offsetY: (clientY - rootOffset.top) / this.options.getScale()
			};
		};
		return AutoScroll;
	}(import_main.Disposable);
}));
//#endregion
export { getAvatarColor as C, init_constants as E, init_field_collector as S, LabelTypes as T, ensureRelativeTimePlugin as _, SYS_STATUS_FIELD_TITLE as a, init_avatar_time_utils as b, collectTagsPillsInRect as c, getWbSpecialMeasureFieldType as d, init_wb_cell as f, resolveTagsCellItems as g, isWbTextLikeField as h, SYS_PRIORITY_FIELD_TITLE as i, collectWbSpecialCell as l, isWbSpecialField as m, init_auto_scroll as n, SYS_TAGS_FIELD_TITLE as o, isSameTagPillHit as p, BODY_TAG_PILL_GEOMETRY as r, collectBodyTag as s, AutoScroll as t, formatFieldTooltipLabel as u, formatRelativeTime as v, getAvatarText as w, fieldCollector as x, getDateCellFullText as y };
