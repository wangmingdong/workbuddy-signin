import { n as __esmMin } from "./chunk-BRZcfu7K.js";
import { Dn as require_main, _n as Emitter, vn as init_event } from "./esm-cVQVEiWG.js";
import { $l as init_es, Cd as getI18nLanguage, Xu as domainConfig, ql as FieldType, wd as i18n } from "./execution-result-erkS5q1j.js";
import { n as init_esm, r as ua } from "./esm-mgJiqgJI.js";
import { t as init_es$1 } from "./es-BQsslXL1.js";
import { C as isKanbanTodoIconAlias, H as pen, S as init_icon, U as init_resources, V as init_pen, pt as NormalIconAlias, v as WbSharedConfig, vt as init_style, w as toThemedKanbanTodoIconAlias, x as KanbanTodoIconAlias, y as init_wb_config, yt as style } from "./canvas-view-DDuMsrmC.js";
import { C as getAvatarColor, S as init_field_collector, b as init_avatar_time_utils, d as getWbSpecialMeasureFieldType, f as init_wb_cell, l as collectWbSpecialCell, m as isWbSpecialField, u as formatFieldTooltipLabel, v as formatRelativeTime, w as getAvatarText, x as fieldCollector } from "./auto-scroll-Cn43Kqkt.js";
import { n as mapWbFieldTitle, t as init_field_title } from "./field-title-CxPwqqcd.js";
import { n as getDefaultGroupValueCollectConfig, r as init_config } from "./config-DWNn7aqz.js";
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/shared/canvas-tooltip.js
var TOOLTIP_BACKGROUND, TOOLTIP_TEXT_COLOR, TOOLTIP_FONT_SIZE, TOOLTIP_PADDING_X, TOOLTIP_PADDING_Y, TOOLTIP_BORDER_RADIUS, TOOLTIP_SHADOW_BLUR, TOOLTIP_SHADOW_COLOR, TOOLTIP_ANCHOR_GAP, TOOLTIP_OFFSET_Y, TOOLTIP_ARROW_SIZE, FADE_STEP, CanvasTooltip;
var init_canvas_tooltip = __esmMin((() => {
	init_pen();
	TOOLTIP_BACKGROUND = "rgba(46, 50, 56, 0.92)";
	TOOLTIP_TEXT_COLOR = "#FFFFFF";
	TOOLTIP_FONT_SIZE = 12;
	TOOLTIP_PADDING_X = 8;
	TOOLTIP_PADDING_Y = 6;
	TOOLTIP_BORDER_RADIUS = 6;
	TOOLTIP_SHADOW_BLUR = 8;
	TOOLTIP_SHADOW_COLOR = "rgba(0, 0, 0, 0.18)";
	TOOLTIP_ANCHOR_GAP = 4;
	TOOLTIP_OFFSET_Y = -6;
	TOOLTIP_ARROW_SIZE = 8;
	FADE_STEP = .2;
	CanvasTooltip = /* @__PURE__ */ function() {
		"use strict";
		function CanvasTooltip(layer, stageRect) {
			/** 当前显示状态：'shown'=完全可见；'fading-in'/'fading-out'=动画中；'hidden'=已清空 */ this.status = "hidden";
			/** 当前 opacity（受 fade 动画与可见性切换驱动） */ this.opacity = 0;
			/** 当前正在显示的内容（仅 fading-in / shown 时非空） */ this.current = null;
			/** raf 句柄；切换 fade 方向 / dispose 前必须取消，避免叠加 */ this.fadeRaf = null;
			this.group = pen.group(Object.assign(Object.assign({}, stageRect), {
				batch: false,
				overflow: "visible"
			}));
			layer.addGroup(this.group);
		}
		var _proto = CanvasTooltip.prototype;
		/**
		* 在指定锚点之上显示 tooltip。
		*
		* 调度规则：
		* - 已在显示 + 内容文本相同 + 锚点 rect 几何相同 → 静默 no-op（避免 mousemove 频繁触发重画）；
		* - 已在显示 + 内容 / 锚点变了 → 立即跳到 opacity=1 重画（位置切换不再走 fade，避免视觉抖动）；
		* - 当前隐藏 / 正在 fading-out → 重置 opacity=0 走 fade-in 到 1。
		*
		* 由 `HoverTooltipController` 在命中切换时按命中 id 决策走哪一路：同 id 调本方法等同 no-op；
		* 不同 id 先 `hide()` 旧的（fade-out），再 `show()` 新的（fade-in），形成视觉上的「淡出 → 淡入」。
		* 也可以省略 hide 直接 show 切换（位置平移、不闪烁），但当前实现为「淡出 + 淡入」以贴合需求中
		* 「hover 后需要渐变出现和消失」语义（每次新出现都从透明开始）。
		*/ _proto.show = function show(opts) {
			var _a, _b, _c, _d, _e;
			var sameContent = ((_a = this.current) === null || _a === void 0 ? void 0 : _a.content.text) === opts.content.text && ((_b = this.current) === null || _b === void 0 ? void 0 : _b.anchorRect.x) === opts.anchorRect.x && ((_c = this.current) === null || _c === void 0 ? void 0 : _c.anchorRect.y) === opts.anchorRect.y && ((_d = this.current) === null || _d === void 0 ? void 0 : _d.anchorRect.width) === opts.anchorRect.width && ((_e = this.current) === null || _e === void 0 ? void 0 : _e.anchorRect.height) === opts.anchorRect.height;
			if (sameContent && this.status === "shown") return;
			this.current = opts;
			if (sameContent && this.status === "fading-in") return;
			this.cancelFade();
			this.opacity = 0;
			this.status = "fading-in";
			this.runFade("in");
		};
		/**
		* 触发渐出：当前显示中 → fading-out → 完全清空。
		* 已隐藏 / 已在 fading-out 中重复调用为 no-op，避免动画叠加。
		*/ _proto.hide = function hide() {
			if (this.status === "hidden" || this.status === "fading-out") return;
			this.cancelFade();
			this.status = "fading-out";
			this.runFade("out");
		};
		/**
		* 容器尺寸 / 滚动状态变化时更新 group 自身的 stage 视口矩形——保证 group 的 clip 区与可见 stage 一致，
		* 避免浮层被裁。调用方（feature）在 render 时调用即可，等同 hover feature 里 `setAttrs(globalRect)`。
		*/ _proto.updateStageRect = function updateStageRect(stageRect) {
			this.group.setAttrs(stageRect);
		};
		_proto.dispose = function dispose() {
			this.cancelFade();
			this.group.clear();
			this.current = null;
			this.status = "hidden";
			this.opacity = 0;
		};
		/** 渐入/渐出动画主循环。 */ _proto.runFade = function runFade(direction) {
			var tick = () => {
				this.fadeRaf = null;
				if (direction === "in" && this.status !== "fading-in") return;
				if (direction === "out" && this.status !== "fading-out") return;
				var next = direction === "in" ? this.opacity + FADE_STEP : this.opacity - FADE_STEP;
				this.opacity = Math.max(0, Math.min(1, Math.floor(next * 100) / 100));
				this.draw(this.opacity);
				if (!(direction === "in" ? this.opacity >= 1 : this.opacity <= 0)) {
					this.fadeRaf = requestAnimationFrame(tick);
					return;
				}
				if (direction === "in") this.status = "shown";
				else {
					this.status = "hidden";
					this.current = null;
					this.group.clear();
				}
			};
			this.fadeRaf = requestAnimationFrame(tick);
		};
		_proto.cancelFade = function cancelFade() {
			if (this.fadeRaf !== null) {
				cancelAnimationFrame(this.fadeRaf);
				this.fadeRaf = null;
			}
		};
		/**
		* 按当前 `current` + `opacity` 绘制一帧。
		*
		* 几何流程：
		* 1) 算出气泡内容宽 / 高（measureTextWidth + 内边距）；
		* 2) 居中于锚点水平方向，竖直默认贴在锚点上方 GAP，上方不够时翻转到下方；
		* 3) 横向越界则回弹到 stage 边界（保证完整可见）；
		* 4) 在「靠锚点一侧」中点画一个 45° 旋转的小正方形作为箭头底坯，气泡再画在它上面，
		*    让气泡圆角矩形盖住箭头与气泡相接那一半，只露出指向锚点的小三角形；
		* 5) 最后整体（气泡 + 箭头）一起施加 `TOOLTIP_OFFSET_Y` 微调位移。
		*
		* z 顺序：箭头放到 rotate:45 的子 group（Group.draw 中子 group 总在 pool 之后绘制）。
		* 因此把气泡 add 到 this.group 的 pool、把箭头放到子 group → 箭头自动盖在气泡之上。
		*
		* 箭头几何：边长 `TOOLTIP_ARROW_SIZE` 的正方形，绕中心旋转 45° 后对角线长 = `size*√2`，
		* 视觉上「露出三角形高度 = size*√2/2」。
		* - 气泡在锚点上方（placement=top）：箭头中心放在气泡**底边**中点（y = bubbleBottom），
		*   下半对角线伸出气泡，形成朝下倒三角指向锚点；
		* - 气泡在锚点下方（placement=bottom）：箭头中心放在气泡**顶边**中点，上半对角线伸出，
		*   形成朝上正三角指向锚点。
		*
		* 箭头 X：水平居中于锚点中心，但回退到 `[bubbleLeft + arrowSafePad, bubbleRight - arrowSafePad]`
		* 内（避免箭头落到圆角弧线之外，露出双色边）。
		*
		* 注：每帧 group.clear() + 重 add 是 wb 已有 fade-in 范式，参考 hover feature `runFadeIn`。
		*/ _proto.draw = function draw(opacity) {
			if (!this.current) return;
			this.group.clear();
			if (opacity <= 0) return;
			var { anchorRect, stageRect, content } = this.current;
			var bubbleWidth = pen.util.measureTextWidth(content.text, TOOLTIP_FONT_SIZE) + TOOLTIP_PADDING_X * 2;
			var bubbleHeight = TOOLTIP_FONT_SIZE + TOOLTIP_PADDING_Y * 2;
			var anchorCenterX = anchorRect.x + anchorRect.width / 2;
			var x = anchorCenterX - bubbleWidth / 2;
			var minX = stageRect.x;
			var maxX = stageRect.x + stageRect.width - bubbleWidth;
			if (x < minX) x = minX;
			if (x > maxX) x = Math.max(minX, maxX);
			var y = anchorRect.y - bubbleHeight - TOOLTIP_ANCHOR_GAP;
			var placement = "top";
			if (y < stageRect.y) {
				y = anchorRect.y + anchorRect.height + TOOLTIP_ANCHOR_GAP;
				placement = "bottom";
			}
			y += TOOLTIP_OFFSET_Y;
			var arrowSafePad = TOOLTIP_BORDER_RADIUS + TOOLTIP_ARROW_SIZE / 2;
			var arrowMinCenterX = x + arrowSafePad;
			var arrowMaxCenterX = x + bubbleWidth - arrowSafePad;
			var arrowCenterX = anchorCenterX;
			if (arrowCenterX < arrowMinCenterX) arrowCenterX = arrowMinCenterX;
			if (arrowCenterX > arrowMaxCenterX) arrowCenterX = arrowMaxCenterX;
			var arrowCenterY = placement === "top" ? y + bubbleHeight : y;
			var arrowGroup = pen.group({
				x: arrowCenterX - TOOLTIP_ARROW_SIZE / 2,
				y: arrowCenterY - TOOLTIP_ARROW_SIZE / 2,
				width: TOOLTIP_ARROW_SIZE,
				height: TOOLTIP_ARROW_SIZE,
				batch: false,
				overflow: "visible",
				rotate: 45
			});
			arrowGroup.add(pen.config.rect({
				x: arrowCenterX - TOOLTIP_ARROW_SIZE / 2,
				y: arrowCenterY - TOOLTIP_ARROW_SIZE / 2,
				width: TOOLTIP_ARROW_SIZE,
				height: TOOLTIP_ARROW_SIZE,
				background: TOOLTIP_BACKGROUND,
				opacity
			}));
			this.group.addGroup(arrowGroup);
			this.group.add(pen.config.rect({
				x,
				y,
				width: bubbleWidth,
				height: bubbleHeight,
				background: TOOLTIP_BACKGROUND,
				borderRadius: TOOLTIP_BORDER_RADIUS,
				shadowBlur: TOOLTIP_SHADOW_BLUR,
				shadowColor: TOOLTIP_SHADOW_COLOR,
				opacity
			}));
			this.group.add(pen.config.text({
				text: content.text,
				x: x + TOOLTIP_PADDING_X,
				y,
				width: bubbleWidth - TOOLTIP_PADDING_X * 2,
				height: bubbleHeight,
				fontSize: TOOLTIP_FONT_SIZE,
				color: TOOLTIP_TEXT_COLOR,
				align: "center",
				wrap: "none",
				ellipsis: true,
				opacity
			}));
		};
		return CanvasTooltip;
	}();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/shared/hover-tooltip-controller.js
/**
* 把 `HoverTooltipController` 包成 `Disposable` 兼容对象，方便 feature `_register` 使用：
*
* ```ts
* const controller = this._register(makeHoverTooltipDisposable(new HoverTooltipController({...})));
* ```
*
* 该 helper 仅做 `{dispose}` 适配，不引入额外状态。
*/ function makeHoverTooltipDisposable(controller) {
	return { dispose: () => controller.dispose() };
}
var HoverTooltipController;
var init_hover_tooltip_controller = __esmMin((() => {
	init_canvas_tooltip();
	HoverTooltipController = /* @__PURE__ */ function() {
		"use strict";
		function HoverTooltipController(deps) {
			this.deps = deps;
			this.currentHitId = "";
			this.disposables = [];
			this.onMouseMove = (evt) => {
				var hit = this.deps.resolveHit(evt.x, evt.y, evt.target);
				if (!hit) {
					this.hideIfShown();
					return;
				}
				if (hit.id === this.currentHitId) return;
				this.currentHitId = hit.id;
				this.tooltip.hide();
				this.tooltip.show({
					anchorRect: hit.anchorRect,
					stageRect: this.deps.getStageRect(),
					content: { text: hit.label }
				});
			};
			this.onMouseLeave = () => {
				this.hideIfShown();
			};
			this.onScroll = () => {
				this.hideIfShown();
			};
			this.tooltip = new CanvasTooltip(deps.layer, deps.getStageRect());
			this.disposables.push(deps.uiEvent.stage.onMouseMove(this.onMouseMove));
			this.disposables.push(deps.uiEvent.stage.onMouseLeave(this.onMouseLeave));
			if (deps.onScroll) this.disposables.push(deps.onScroll(this.onScroll));
		}
		var _proto = HoverTooltipController.prototype;
		/**
		* 视图 render() 时调用：把 stage 视口尺寸同步到 tooltip group，避免 stage resize 后浮层被裁。
		*
		* 同时做一次「数据失效 → 立即 hide」：底层数据变化（重收集）后，旧 anchorRect 的语义可能改变，
		* 强制 hide 比 silently 重画更安全；下一次 mousemove 会以新数据重建命中。
		*/ _proto.syncStageRect = function syncStageRect() {
			this.tooltip.updateStageRect(this.deps.getStageRect());
			this.hideIfShown();
		};
		_proto.dispose = function dispose() {
			this.disposables.forEach((d) => d.dispose());
			this.disposables.length = 0;
			this.tooltip.dispose();
			this.currentHitId = "";
		};
		_proto.hideIfShown = function hideIfShown() {
			if (this.currentHitId === "") return;
			this.currentHitId = "";
			this.tooltip.hide();
		};
		return HoverTooltipController;
	}();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/shared/bottom-collectors.js
/**
* 收集「重叠头像组」DrawConfig。
*
* 与 kanban-todo `collectCardBottom` 第 2 段语义、视觉、几何完全等价；
* 唯一区别：本函数**只产出 configs + width**，不负责把它们塞进 contents 数据结构，
* 也不负责对齐（左/右对齐由调用方通过 `startX` 决定）。
*
* 设计动机：
* - kanban-todo 是「左对齐紧挨」（startX = cursorX）；
* - grid-list 是「反向布局」（最右一项先放，再倒序累加），调用方传 measure 用的 startX=0
*   再整体平移到真实位置，本函数零感知；
* - 跨视图复用同一份 pen.config 拼装 + 同一套色板 + 同一套首字母提取，避免 drift。
*/ function collectAvatarGroup(input) {
	var _a;
	var { users, startX, centerY, avatarSize, textFontSize, drawEmptyPlaceholder } = input;
	var maxCount = AVATAR_GROUP_MAX_COUNT;
	var overlap = AVATAR_GROUP_OVERLAP;
	var realCount = Math.min(users.length, maxCount);
	var hasOverflow = users.length > maxCount;
	var totalSlots = hasOverflow ? realCount + 1 : realCount;
	var radius = avatarSize / 2;
	var avatarY = centerY - radius;
	if (totalSlots <= 0) {
		if (!drawEmptyPlaceholder) return {
			configs: [],
			width: 0,
			slots: []
		};
		var emptyIconSize = Math.max(0, avatarSize - 2);
		var emptyIconOffset = (avatarSize - emptyIconSize) / 2;
		var emptyIconRect = {
			x: startX + emptyIconOffset,
			y: avatarY + emptyIconOffset,
			width: emptyIconSize,
			height: emptyIconSize
		};
		var emptySlotRect = {
			x: startX,
			y: avatarY,
			width: avatarSize,
			height: avatarSize
		};
		return {
			configs: [pen.config.icon(toThemedKanbanTodoIconAlias(KanbanTodoIconAlias.AVATAR_EMPTY), emptyIconRect)],
			width: avatarSize,
			groupRect: emptySlotRect,
			slots: [{
				rect: emptySlotRect,
				isOverflow: false,
				tooltipLabel: i18n.t("无")
			}]
		};
	}
	var configs = [];
	var slots = [];
	var innerOffset = RING_BORDER_WIDTH + RING_INNER_PADDING;
	var innerSize = Math.max(0, avatarSize - innerOffset * 2);
	var innerRadius = innerSize / 2;
	var slotRect = (i) => {
		var x = startX + i * (avatarSize - overlap);
		return {
			outer: {
				x,
				y: avatarY,
				width: avatarSize,
				height: avatarSize
			},
			inner: {
				x: x + innerOffset,
				y: avatarY + innerOffset,
				width: innerSize,
				height: innerSize
			}
		};
	};
	var pushRing = (outer) => {
		configs.push(pen.config.rect(Object.assign(Object.assign({}, outer), {
			background: style.color.normalBackground,
			borderRadius: radius,
			borderWidth: RING_BORDER_WIDTH,
			borderColor: style.color.normalBorderColor
		})));
	};
	var pushAvatarInner = (user, inner) => {
		var _a;
		var bg = getAvatarColor((_a = user.id) !== null && _a !== void 0 ? _a : "");
		configs.push(pen.config.rect(Object.assign(Object.assign({}, inner), {
			background: bg,
			borderRadius: innerRadius,
			borderWidth: 0
		})));
		configs.push(pen.config.text(Object.assign(Object.assign({ text: getAvatarText(user) }, inner), {
			y: inner.y + AVATAR_TEXT_WIN_OFFSET_Y,
			fontSize: textFontSize,
			fontStyle: "500",
			color: style.color.normalBackground,
			align: "center",
			wrap: "none",
			ellipsis: true
		})));
	};
	var overflowSlotIndex = hasOverflow ? maxCount : -1;
	var overflowCount = hasOverflow ? users.length - maxCount : 0;
	if (hasOverflow) {
		var { outer, inner } = slotRect(overflowSlotIndex);
		pushRing(outer);
		var overflowLabel = `+${overflowCount}`;
		configs.push(pen.config.text(Object.assign(Object.assign({ text: overflowLabel }, inner), {
			y: inner.y + AVATAR_TEXT_WIN_OFFSET_Y,
			fontSize: textFontSize,
			fontStyle: "500",
			color: style.color.lightUltraFontColor,
			align: "center",
			wrap: "none",
			ellipsis: true
		})));
		slots.push({
			rect: outer,
			isOverflow: true,
			tooltipLabel: overflowLabel
		});
	}
	for (var i = realCount - 1; i >= 0; i--) {
		var { outer: outer1, inner: inner1 } = slotRect(i);
		pushRing(outer1);
		pushAvatarInner(users[i], inner1);
		slots.push({
			rect: outer1,
			isOverflow: false,
			user: users[i],
			tooltipLabel: (_a = users[i].name) !== null && _a !== void 0 ? _a : getAvatarText(users[i])
		});
	}
	var width = (totalSlots - 1) * (avatarSize - overlap) + avatarSize;
	return {
		configs,
		width,
		groupRect: {
			x: startX,
			y: avatarY,
			width,
			height: avatarSize
		},
		slots
	};
}
/**
* 给头像组的 slots 附加「列名前缀」的 tooltip 文案。
*
* 语义与 `formatFieldTooltipLabel` 一致：`列名：值`（列名来自 `WbSharedConfig.fieldTitleMap[fieldTitle]`），
* 未命中 map 时保留原 value 不加前缀（向后兼容宿主自定义未登记的 fieldTitle）。
*
* 关键约束：
* - **只处理真头像槽**（`isOverflow=false`）。`+N` 槽的 tooltip 语义是「还有 N 位未展示」，与列名维度无关，
*   给它加「处理人：+3」这种前缀反而语义割裂 —— 保持原 `+N` 文本；
* - 就地更新 `slot.tooltipLabel`，不新建对象/数组，避免引用漂移。调用方仍持有同一 `slots` 引用继续透出。
*
* 复用点：grid-list 行右侧 owner 段、kanban-todo 卡片底部 owner 段各自调一次即可，
* fieldTitle 由调用方根据自身 config（如 `WbSharedConfig.card.bottom.ownerFieldTitle`）传入。
* 未来配置改成 `sys_created_by` / `sys_created_at` 等其它人员/时间字段时，前缀自动跟随，无需改这里。
*/ function applyAvatarSlotsFieldTitlePrefix(slots, fieldTitle) {
	for (var slot of slots) {
		if (slot.isOverflow) continue;
		slot.tooltipLabel = formatFieldTooltipLabel(fieldTitle, slot.tooltipLabel);
	}
}
/**
* 收集「底部状态文案」DrawConfig。
*
* 与 kanban-todo `collectCardBottom` 第 1 段（statusText）的语义、视觉、几何完全等价；
* 同时复用到 grid-list 左侧 status 列（按 `ListConfig.recordLeftShowFieldTitles` 末尾追加），
* 保证两视图状态文案 1:1 一致。
*
* 视觉规则（写死，与设计稿对齐）：
* - `fontStyle: '500'`、`color: style.color.normalFontColor`；
* - `wrap: 'none'`、`ellipsis: true`；
* - 渲染 width 默认 = `measureTextWidth + 4`（额外 4px 用于让最后一个字与紧邻元素留点呼吸）。
*
* 空文本（如 `getBottomStatusText` 返回 ''）：返回 `{ configs: [], width: 0 }`，调用方据此跳过本段。
*/ function collectStatusText(input) {
	var { text, startX, y, rowHeight, fontSize, maxWidth, align = "left" } = input;
	if (!text) return {
		configs: [],
		width: 0
	};
	var measured = pen.util.measureTextWidth(text, fontSize) + 4;
	var width = typeof maxWidth === "number" ? Math.min(measured, maxWidth) : measured;
	if (width <= 0) return {
		configs: [],
		width: 0
	};
	return {
		configs: [pen.config.text({
			text,
			x: startX,
			y,
			width,
			height: rowHeight,
			fontSize,
			fontStyle: "500",
			color: style.color.normalFontColor,
			wrap: "none",
			ellipsis: true,
			align
		})],
		width
	};
}
/**
* 收集「相对时间文本」DrawConfig。
*
* 与 kanban-todo `collectCardBottom` 第 3 段语义等价，但解耦了「贴行右边」这个对齐
* 策略——`align` 让调用方自己选：
*
* - kanban-todo：`align='right'`，调用方传 `startX = rowRect.x + rowRect.width - width`
*   实现「相对时间右对齐紧贴行右边」；
* - grid-list：`align='left'`（默认），反向布局已经从右向左累加 cursor，
*   传过去的 startX 已经是文本左上角的真实 x，文本内自身不再做 right-align。
*
* 文本为空（如 timestamp 为 0）时返回 `{ configs: [], width: 0 }`。
*/ function collectRelativeTimeText(input) {
	var { text, startX, y, rowHeight, fontSize, align = "left", slotWidth } = input;
	if (!text) return {
		configs: [],
		width: 0
	};
	var measuredWidth = pen.util.measureTextWidth(text, fontSize);
	var renderWidth = slotWidth !== null && slotWidth !== void 0 ? slotWidth : measuredWidth;
	return {
		configs: [pen.config.text({
			text,
			x: startX,
			y,
			width: renderWidth,
			height: rowHeight,
			fontSize,
			color: style.color.lightUltraFontColor,
			wrap: "none",
			ellipsis: true,
			align
		})],
		width: measuredWidth
	};
}
/**
* 计算「相对时间」列应占用的固定槽宽（px）。
*
* 背景：grid-list 行右侧 date 列用**固定槽宽**渲染相对时间（`align='right'` + `ellipsis`），
* 目的是让不同行的 owner 头像 X 严格对齐（详见 SizeCollector.relativeDateSlotWidth 注释）。
* 若把槽宽写死（历史值 60px 仅够中文「11 个月前」），英文 `dayjs.fromNow()` 的
* 「44 minutes ago / 11 months ago」会超出槽宽被 ellipsis 截断成「2 hours ...」。
*
* 做法：用 `formatRelativeTime` 生成**当前语言**下各量级（分/时/天/月/年）的「最长形态」
* 样本文本（复用同一格式化路径，天然覆盖 zh-CN/zh-HK/en-US 及未来新增语言），
* 逐个 `measureTextWidth` 取最大值 + 余量。结果按「语言+字号」缓存，避免逐行重复测量。
*
* 之所以取两位数量级样本（44 分钟 / 23 小时 / 11 个月…）：dayjs.fromNow() 数字部分最宽即两位，
* 单位复数形态也在此覆盖，足以框定该语言下的最宽输出。
*/ function measureRelativeTimeSlotWidth(fontSize) {
	var cacheKey = `${getI18nLanguage()}:${fontSize}`;
	var cached = relativeTimeSlotWidthCache.get(cacheKey);
	if (cached !== void 0) return cached;
	var MINUTE = 6e4;
	var HOUR = 60 * MINUTE;
	var DAY = 24 * HOUR;
	var now = Date.now();
	var sampleTimestamps = [
		now - 44 * MINUTE,
		now - 23 * HOUR,
		now - 25 * DAY,
		now - 340 * DAY,
		now - 11 * 365 * DAY
	];
	var maxWidth = 0;
	for (var ts of sampleTimestamps) {
		var w = pen.util.measureTextWidth(formatRelativeTime(ts), fontSize);
		if (w > maxWidth) maxWidth = w;
	}
	var slotWidth = Math.ceil(maxWidth) + RELATIVE_TIME_SLOT_PADDING;
	relativeTimeSlotWidthCache.set(cacheKey, slotWidth);
	return slotWidth;
}
var AVATAR_GROUP_MAX_COUNT, RING_BORDER_WIDTH, RING_INNER_PADDING, AVATAR_GROUP_OVERLAP, AVATAR_TEXT_WIN_OFFSET_Y, relativeTimeSlotWidthCache, RELATIVE_TIME_SLOT_PADDING;
var init_bottom_collectors = __esmMin((() => {
	init_esm();
	init_es();
	init_pen();
	init_style();
	init_icon();
	init_avatar_time_utils();
	init_wb_cell();
	AVATAR_GROUP_MAX_COUNT = 5;
	RING_BORDER_WIDTH = 1;
	RING_INNER_PADDING = 0;
	AVATAR_GROUP_OVERLAP = 6;
	AVATAR_TEXT_WIN_OFFSET_Y = ua.isWindows ? 2 : 0;
	relativeTimeSlotWidthCache = /* @__PURE__ */ new Map();
	RELATIVE_TIME_SLOT_PADDING = 4;
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/shared/group-key-config.js
/**
* 分组头「特殊配置」共享层
*
* 同时被 kanban-todo / grid-list 两个视图复用，规则一致：
* - 命中 `WbSharedConfig.head.groupBys[fieldTitle]` 后，再按 groupValue 文本反查
*   `groupKeys[].matchValue`，得到一份 `WbGroupKeyConfig`；
* - 视图层根据 keyConf 在分组头绘制「icon / 圆点 + 标题」的装饰段
*   （`collectGroupKeyDecoration`）；
* - 未命中 keyConf 时视图层回到自身的"普通分组渲染"路径
*   （kanban-todo 走 fieldCollector.collect 真实 groupValue；
*    grid-list 直接绘制 groupValue 文本）。
*
* 注意：本模块**只**负责"反查 + 装饰段绘制"，不包含 head 容器/背景/+按钮/全选等
* 与视图布局相关的部分，那些由各视图自己组装。
*/ /**
* 按 (groupField, groupValueText) 反查 keyConf。
*
* - groupField 为空 / 配置外字段 → undefined；
* - 命中字段但 groupValueText 不在 groupKeys 中 → undefined；
* - 命中 → 返回对应 keyConf（与 WbSharedConfig 引用同一个对象，调用方禁止改写）。
*/ function resolveGroupKeyConf(groupField, groupValueText) {
	if (!groupField) return;
	var groupByConfig = WbSharedConfig.head.groupBys[groupField.getTitle()];
	if (!groupByConfig) return;
	for (var keyConf of groupByConfig.groupKeys) if (keyConf.matchValue === groupValueText) return keyConf;
}
/**
* 收集 keyConf 的"装饰段"DrawConfig 列表：左侧 icon（或圆点）+ 右侧尾随 gap。
*
* 视图层把 startX 设为装饰段左边界，绘制完后用返回的 `width`（含尾随 gap）
* 把标题/数量等内容继续向右推进。
*
* - 配置 icon 命中 NormalIconAlias / KanbanTodoIconAlias：按 iconSize 绘制图标；
*   KanbanTodoIconAlias 走主题切换，NormalIconAlias 原样透传；
* - icon 为空或不在已知集合：按 dotSize 绘制 keyConf.color 实心圆。
*
* @param keyConf      反查得到的 keyConf；调用方需保证非空
* @param startX       装饰段左边界 X
* @param centerY      装饰段垂直居中线（icon / dot 都以此居中）
* @param iconSize     icon 命中分支的边长
* @param dotSize      dot 兜底分支的圆点直径
* @param trailingGap  装饰段右侧与后续内容之间的间距
*/ function collectGroupKeyDecoration(params) {
	var { keyConf, startX, centerY, iconSize, dotSize, trailingGap } = params;
	var iconAlias = keyConf.icon || "";
	var configs = [];
	if (iconAlias && isKnownGroupKeyIcon(iconAlias)) {
		var themedAlias = isKanbanTodoIconAlias(iconAlias) ? toThemedKanbanTodoIconAlias(iconAlias) : iconAlias;
		configs.push(pen.config.icon(themedAlias, {
			x: startX,
			y: centerY - iconSize / 2,
			width: iconSize,
			height: iconSize
		}));
		return {
			configs,
			width: iconSize + trailingGap
		};
	}
	var dotColor = keyConf.color || style.color.lightFontColor;
	configs.push(pen.config.rect({
		x: startX,
		y: centerY - dotSize / 2,
		width: dotSize,
		height: dotSize,
		background: dotColor,
		borderRadius: dotSize / 2,
		borderWidth: 0
	}));
	return {
		configs,
		width: dotSize + trailingGap
	};
}
/**
* keyConf.icon 是否在已知图标集合（NormalIconAlias / KanbanTodoIconAlias）中。
* 不在集合中时退化到 dot 兜底绘制，避免画一个找不到的 icon。
*/ function isKnownGroupKeyIcon(alias) {
	return Object.values(NormalIconAlias).includes(alias) || Object.values(KanbanTodoIconAlias).includes(alias);
}
/**
* 分组单元格 → 文本（用于"分组头只渲染分组值文本"的统一规则）。
*
* 同时被 kanban-todo / grid-list 两个视图的"普通分组头"渲染分支复用，
* 与设计稿契约一致：分组头**不**走 fieldCollector 整单元格渲染（不画 tag / 头像 /
* 相对时间等富展示），只取分组值的 `text` 段做单行文本展示。
*
* 入参兼容三种形态：
* - `IStandardCell | null`（单层分组场景：kanban-todo / 一层 grid-list，或多层 groupTree 里
*   `tree.value` 传下来的当前层 cell）；
* - `(IStandardCell | null)[]`（旧扁平分组：每层一个 cell 拼成的 path 数组）；
* - `undefined`（缺省/出错兜底）。
*
* 关键约束：单 cell 内的 `data` 可能是**多值**（例如按「多选（标签）列」分组时，同一组
* record 共享的 tag 组合会作为一整个分组，`data.length > 1`），必须遍历 `data` 全量拼接，
* 否则分组头只会显示第一个 tag 文本。规则与 grid / gantt 视图的 `getGroupValueText` 完全一致。
*
* 数组形态下按顺序对每层递归拼接（与 grid 视图旧扁平分组渲染语义一致）；全部为空时
* 返回空串，由视图层决定是否再做 "未分组" 等本地化兜底。
*/ function getGroupValueText(groupValue) {
	if (!groupValue) return "";
	if (Array.isArray(groupValue)) return groupValue.map((cell) => getGroupValueText(cell)).join(",");
	var data = groupValue.data;
	if (!(data === null || data === void 0 ? void 0 : data.length)) return "";
	return data.map((item) => {
		var _a;
		return (_a = item === null || item === void 0 ? void 0 : item.text) !== null && _a !== void 0 ? _a : "";
	}).filter((text) => text !== "").join(",");
}
/**
* 按 `WbSharedConfig.head.groupTextMap` 对原始分组文本做一次显示映射。
*
* 同时被 kanban-todo / grid-list 两个视图复用，规则一致：
* - 当分组依据列的列标题命中 groupTextMap 顶层 key，且原始文本命中二级 key 时，返回映射后的文本；
* - 任一未命中（含 groupField 为空），原样返回 `rawText`。
*
* 视图层应在拿到分组值文本后、用于「标题渲染」与「keyConf.matchValue 反查」之前调用本函数；
* 这样把"原始 → 显示"的映射只做一次，且能让 keyConf 的 matchValue 直接写映射后文案而无需关心原值。
*
* 特殊列动态映射：`sys_source`（来源列）的展示文案不再走静态 map，而是委托给
* `domainConfig.getWbSourceInfo(rawText).displayName`——由宿主侧（iswb 等）按当前业务上下文
* 决定显示文案（如「手动创建」「他人转交」或其他来源类型）；宿主未注入 handler 时
* `domainConfig` 自身会回落到 `rawText.toUpperCase()` 兜底，保持非空展示。
*
* 该映射不改变底层数据，只影响视觉展示与 matchValue 比对。
*/ function applyGroupTextMap(groupField, rawText) {
	var _a;
	if (!groupField) return rawText;
	var fieldTitle = groupField.getTitle();
	if (fieldTitle === "sys_source") return rawText ? domainConfig.getWbSourceInfo(rawText).displayName : rawText;
	var fieldMap = (_a = WbSharedConfig.head.groupTextMap) === null || _a === void 0 ? void 0 : _a[fieldTitle];
	if (!fieldMap) return rawText;
	var mapped = fieldMap[rawText];
	return mapped !== null && mapped !== void 0 ? mapped : rawText;
}
/**
* 把原始 cell 文本（matchValue 维度）映射为「展示用 title」。
*
* 复用 head 分组头那条标准链路：
*   `rawText → applyGroupTextMap(field, rawText) → resolveGroupKeyConf(field, mapped).title ?? mapped`
*
* 适用场景：
* - 卡片底部 / 行内 status 文案（kanban-todo / grid-list 的 `getBottomStatusText`），
*   存储是 `pending/running/...`，但 UI 要显示 `WbSharedConfig.head.groupBys[*].groupKeys[].title`
*   配置的本地化文案（如「待开始」「进行中」）；
* - 与 head 完全同源，避免两边各写一份"matchValue→title"的映射。
*
* 入参 `field` 缺失（如该列未配置 / 反查不到）时直接原样返回 `rawText`，
* 调用方无需再做兜底。
*/ function mapGroupValueToDisplayTitle(field, rawText) {
	var _a;
	if (!field || !rawText) return rawText;
	var mapped = applyGroupTextMap(field, rawText);
	var keyConf = resolveGroupKeyConf(field, mapped);
	return (_a = keyConf === null || keyConf === void 0 ? void 0 : keyConf.title) !== null && _a !== void 0 ? _a : mapped;
}
/**
* 分组头「空分组」文案与样式判定 —— 同时被 kanban-todo / grid-list 视图复用。
*
* 语义：拿到「原始分组文本」（已走 groupTextMap 显示映射后的文案，若为多值分组则为拼接后
* 的结果字符串；仍为「原文」维度，未做 keyConf 反查）后，判定该分组是否为空分组，并生成
* 与 grid 视图 `getEmptyGroupValueStandardCell` 视觉一致的兜底文案：
*
* - 非空：`{ text: rawGroupText, isEmpty: false }`，视图层沿用原有加粗 + 正常字色渲染；
* - 空　：`{ text: "{displayFieldTitle}: {空}", isEmpty: true }`，视图层应切成不加粗
*   + `style.color.lightUltraFontColor`（浅色），与 grid 视图 util-group-value 的
*   `isEmptyGroupValue` 分支同源。displayFieldTitle 走 `mapWbFieldTitle`，与列头
*   `collectTitle` 的映射策略保持单一来源；未拿到 field 或非 wb 时退化为「空」单文案。
*
* 该 helper 仅生产**文本 + isEmpty 标记**，样式由调用方按视图排版基线注入 —— 避免把
* fontStyle / color 等 pen 层参数耦合到 shared 层。
*/ function resolveGroupHeadTitle(groupField, rawGroupText) {
	if (rawGroupText) return {
		text: rawGroupText,
		isEmpty: false
	};
	var displayTitle = mapWbFieldTitle(groupField === null || groupField === void 0 ? void 0 : groupField.getTitle());
	var emptyText = i18n.t("空");
	return {
		text: displayTitle ? `${displayTitle}: ${emptyText}` : emptyText,
		isEmpty: true
	};
}
var init_group_key_config = __esmMin((() => {
	init_es();
	init_pen();
	init_resources();
	init_style();
	init_icon();
	init_field_title();
	init_wb_config();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/shared/group-value-rich.js
/**
* 收集分组值的富内容 DrawConfig。
*
* @param cell        分组单元格；调用方需保证 data.length > 0（空值不进入本函数）
* @param field       分组依据字段
* @param rect        富内容可绘矩形（内容坐标，视图侧保证已垂直居中并留好左右间距）
* @param viewScope   视图作用域，用于 wb 特殊列分支
* @param options     可选覆盖：
*   - `ellipsis`：默认 true，与 content 单元格一致；
*   - `offsetY`：wb 特殊列产物向下平移的像素数，默认 3。用于修正 wb-cell pill 基线视觉
*     误差 —— pill 内部从 `rect.y + 1` 起绘，几何居中 rect 视觉仍偏上，统一向下抵 3px，
*     与 grid 视图 `views/grid/collector/content/util-group-value.ts` 的 `offsetY = 3`
*     同源。**仅作用于 wb special 分支**；默认 fieldCollector 分支不受影响。
*     调用方若已在传入 rect 上自行做过基线修正，可显式传 0 覆盖。
*/ function collectRichGroupValue(cell, field, rect, viewScope, options) {
	var _a, _b;
	var collectConfig = getDefaultGroupValueCollectConfig();
	if (field.getType() === FieldType.LOOKUP) collectConfig.checkboxConfig.hasTitle = false;
	if ((options === null || options === void 0 ? void 0 : options.ellipsis) === false) collectConfig.textConfig.ellipsis = false;
	var offsetY = (_a = options === null || options === void 0 ? void 0 : options.offsetY) !== null && _a !== void 0 ? _a : 3;
	var wb = tryCollectWbSpecialGroupValue(cell, field, offsetY ? Object.assign(Object.assign({}, rect), { y: rect.y + offsetY }) : rect, viewScope, collectConfig);
	var configs = (_b = wb === null || wb === void 0 ? void 0 : wb.configs) !== null && _b !== void 0 ? _b : fieldCollector.collect(rect, collectConfig, cell, field);
	if (!(configs === null || configs === void 0 ? void 0 : configs.length)) return {
		configs: [],
		width: 0
	};
	var measureFieldType = wb === null || wb === void 0 ? void 0 : wb.measureFieldType;
	var width = measureFieldType ? fieldCollector.measureWidth(measureFieldType, configs) : fieldCollector.measureWidth(field, configs);
	if (width === 0) width = rect.width;
	if (width > rect.width) width = rect.width;
	return {
		configs,
		width
	};
}
/**
* wb 特殊列分支：与 content 单元格、grid 分组头三处接入点保持视觉 1:1 一致。
*
* 返回值：
* - `{ configs, measureFieldType }`：命中特殊列且收集器给出了产物（含空数组 `[]`：明确
*   「不画」，调用方应当作已处理不再回落默认 fieldCollector）；
* - `undefined`：未启用 wb / 字段未列入特殊表 / 特殊收集器返回 undefined（明确回落）。
*
* `measureFieldType` 用于 measure 派发：wb 特殊列产物首位为 RectConfig 时走 SINGLE_SELECT
* measure；走 TEXT measure 会过滤掉 RectConfig 拿到 0 宽度导致排版塌陷。时间列产物是
* TextConfig[]，走 TEXT measure —— 由 `getWbSpecialMeasureFieldType` 精确派发。
*/ function tryCollectWbSpecialGroupValue(cell, field, rect, viewScope, collectConfig) {
	if (!domainConfig.getIsWb()) return;
	var fieldTitle = field.getTitle();
	if (!fieldTitle || !isWbSpecialField(fieldTitle, viewScope)) return;
	var configs = collectWbSpecialCell({
		fieldTitle,
		viewScope,
		rect,
		collectConfig,
		standardCell: cell,
		field
	});
	if (!configs) return;
	return {
		configs,
		measureFieldType: getWbSpecialMeasureFieldType(fieldTitle, viewScope)
	};
}
var init_group_value_rich = __esmMin((() => {
	init_es();
	init_es$1();
	init_field_collector();
	init_config();
	init_wb_cell();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/shared/batch-selection.js
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
var import_main, BatchSelection;
var init_batch_selection = __esmMin((() => {
	init_event();
	import_main = require_main();
	BatchSelection = /* @__PURE__ */ function(Disposable) {
		"use strict";
		_inherits(BatchSelection, Disposable);
		function BatchSelection() {
			var _this = Disposable.call(this) || this;
			_this.mode = false;
			_this.selected = /* @__PURE__ */ new Set();
			_this.onChangeEmitter = _this._register(new Emitter());
			_this.onChange = _this.onChangeEmitter.event;
			return _this;
		}
		var _proto = BatchSelection.prototype;
		/** 当前是否处于批量选择模式 */ _proto.isMode = function isMode() {
			return this.mode;
		};
		/**
		* 进入 / 退出批量选择模式。
		* 退出时自动清空已选集合并 fire 一次空数组通知（即便原本集合就是空的，也会 fire 一次，
		* 让外部订阅者拿到「退出批量模式」的语义信号——与历史 kanban-todo 行为保持一致）。
		*/ _proto.setMode = function setMode(enable) {
			this.mode = enable;
			if (!enable) {
				this.selected.clear();
				this.onChangeEmitter.fire([]);
			}
		};
		/** 某个 recordId 是否被选中 */ _proto.isSelected = function isSelected(recordId) {
			return this.selected.has(recordId);
		};
		/** 当前选中的 recordIds 副本（避免外部修改内部集合） */ _proto.getSelectedIds = function getSelectedIds() {
			return [...this.selected];
		};
		/** 切换单个 recordId 的选中状态并 fire 事件 */ _proto.toggle = function toggle(recordId) {
			if (this.selected.has(recordId)) this.selected.delete(recordId);
			else this.selected.add(recordId);
			this.onChangeEmitter.fire(this.getSelectedIds());
		};
		/**
		* 批量设置一组 recordId 的选中状态（用于「分组全选 / 取消全选」）。
		* recordIds 为空时直接返回，不触发事件。
		*/ _proto.setIdsSelected = function setIdsSelected(recordIds, select) {
			if (recordIds.length === 0) return;
			if (select) recordIds.forEach((id) => this.selected.add(id));
			else recordIds.forEach((id) => this.selected.delete(id));
			this.onChangeEmitter.fire(this.getSelectedIds());
		};
		/**
		* 判定一组 recordId 是否全部已被选中（典型用法：判断某分组是否全选）。
		* recordIds 为空时返回 false。
		*/ _proto.areAllSelected = function areAllSelected(recordIds) {
			if (recordIds.length === 0) return false;
			return recordIds.every((id) => this.selected.has(id));
		};
		/** 清空已选集合（外部主动重置时使用），并 fire 一次空数组事件 */ _proto.clear = function clear() {
			if (this.selected.size === 0) return;
			this.selected.clear();
			this.onChangeEmitter.fire([]);
		};
		/**
		* 用「当前仍然存在的 recordId 集合」剪裁选中集，剔除已经不存在的 phantom id。
		*
		* 触发场景：批量删除 / 撤销新增 / 视图切换等造成 record 消失后，若不清理，
		* `getSelectedIds()` 会继续返回早已不存在的 recordId，让外部 SDK 拿到脏数据
		* （例如"批量删除后仍展示已删记录的选中"，或调用方误以为还有选中项）。
		*
		* 语义要点：
		* - 仅剔除，不新增 —— 只是按 existingIds 过滤已有选中集，不会把 existingIds 里的其它 id 加进来；
		* - 幂等：无 phantom 需要清理时静默返回，不 fire 事件，避免搅动外部订阅者；
		* - 有清理发生时 fire 一次最新数组，让 UI（如批量操作栏的"已选 N 项"）自然收敛；
		* - 不受 `mode` 影响：即便当前处于非批量模式，只要集合里有 phantom 也照样清（防御性）。
		*
		* 应由持有 dataUtil 的 StateCenter 在数据变化后（例如每次 collect/patch）调用。
		*/ _proto.pruneByExistingIds = function pruneByExistingIds(existingIds) {
			if (this.selected.size === 0) return;
			var changed = false;
			for (var id of this.selected) if (!existingIds.has(id)) {
				this.selected.delete(id);
				changed = true;
			}
			if (changed) this.onChangeEmitter.fire(this.getSelectedIds());
		};
		return BatchSelection;
	}(import_main.Disposable);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/shared/source-field.js
/**
* 读取指定列单元格的展示文本（`cell.data[0].text`）。fieldId 为空 / cell 为空时返回 ''。
*
* 适用：底部状态字段、父记录主列回溯等需要按 text 做判定的场景。
*/ function readCellText(dataUtil, fieldId, recordId) {
	var _a;
	var first = readFirstCellData(dataUtil, fieldId, recordId);
	return ((_a = first === null || first === void 0 ? void 0 : first.text) !== null && _a !== void 0 ? _a : "").toString();
}
/**
* 读取指定列单元格的第一条标准数据（`cell.data[0]`），用于需要拿 text 之外字段
* （如 user 列的 userId 等）的场景。
* fieldId 为空 / cell 不存在 / data 为空时返回 undefined。
*/ function readFirstCellData(dataUtil, fieldId, recordId) {
	var _a;
	if (!fieldId) return;
	var cell = dataUtil.getStandardCell(fieldId, recordId);
	return (_a = cell === null || cell === void 0 ? void 0 : cell.data) === null || _a === void 0 ? void 0 : _a[0];
}
var init_source_field = __esmMin((() => {}));
//#endregion
export { makeHoverTooltipDisposable as S, collectStatusText as _, collectRichGroupValue as a, HoverTooltipController as b, collectGroupKeyDecoration as c, mapGroupValueToDisplayTitle as d, resolveGroupHeadTitle as f, collectRelativeTimeText as g, collectAvatarGroup as h, init_batch_selection as i, getGroupValueText as l, applyAvatarSlotsFieldTitlePrefix as m, readCellText as n, init_group_value_rich as o, resolveGroupKeyConf as p, BatchSelection as r, applyGroupTextMap as s, init_source_field as t, init_group_key_config as u, init_bottom_collectors as v, init_hover_tooltip_controller as x, measureRelativeTimeSlotWidth as y };
