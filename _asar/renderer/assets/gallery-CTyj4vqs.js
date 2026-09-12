import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { o as __metadata, p as init_tslib_es6, r as __decorate } from "./tslib.es6-8NkKEYUK.js";
import { Dn as require_main, Sn as init_module, _n as Emitter, kn as createDecorator, vn as init_event } from "./esm-cVQVEiWG.js";
import { $l as init_es, Vl as ViewType$1, bd as SmartSheetEventName, fu as isDarkMode, gd as debounce, qu as ViewType, uu as slicePush, yd as fireEvent } from "./execution-result-erkS5q1j.js";
import { n as init_esm, r as ua } from "./esm-mgJiqgJI.js";
import { t as init_es$1 } from "./es-BQsslXL1.js";
import { At as init_utils, B as init_feature_single, Bt as performanceReport, F as init_scroller, Ft as Direction, G as resourceLoader, H as pen, I as init_register_esc_to_cancel, L as registerEscToCancel, M as BaseRenderer, Mt as renderAppConfigService, N as init_base_renderer, Nt as RenderAppConfigKey, P as CommonScroller, Pt as init_index_interface, R as BaseFeature, Rt as init_common, U as init_resources, V as init_pen, a as BaseCollector, d as getStorageValue, et as init_is_in_rect, f as init_storage_sync, h as init_data_util$1, i as init_base_renderer_model, jt as init_render_app_config, kt as getScrollConfig, l as BaseSizeCollector, m as BaseCollectorDataUtil, nt as FeatureUIEvent, o as init_collector$1, ot as Cursor, p as setStorageValue, pt as NormalIconAlias, r as BaseRendererModel, rt as init_feature_event, st as init_cursor, tt as isHitRect, u as init_size$1, vt as init_style, yt as style, z as FeatureAuth, zt as init_performance } from "./canvas-view-DDuMsrmC.js";
import { S as init_field_collector, n as init_auto_scroll$1, t as AutoScroll, x as fieldCollector } from "./auto-scroll-Cn43Kqkt.js";
import { a as init_binary_search, i as binarySearch } from "./common-action-BPA9xdl-.js";
import { c as init_groupable_status, i as init_scroll_info, n as init_fix_scroll_delta, r as getScrollTipInfo, s as GroupableStatus, t as fixScrollDelta } from "./fix-scroll-delta-C4NjXGCK.js";
import { t as require_clamp } from "./clamp-B7QjjXLG.js";
import { a as calcCardHeight, c as init_field_fixed_height, d as init_card_single, f as CommonCardActive, h as init_action$1, i as init_collector_state, l as CardSingleCollector, m as CardAction, n as init_view, o as init_calc_card_heigth, p as init_card_active$1, r as BaseStateCenter, s as fieldFixedContent, t as KanbanGalleryView, u as SpecailContentID } from "./view-DGZEPJsr.js";
import { n as init_content_hover, t as CardContentHover } from "./content-hover-DdfS9wKa.js";
//#region ../../node_modules/@tencent/xtable-view/es/views/gallery/features/common/card-active/interface.js
var IGalleryCardActive;
var init_interface$5 = __esmMin((() => {
	init_module();
	IGalleryCardActive = createDecorator("IGalleryCardActive");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gallery/features/action.js
function _inherits$17(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$17(subClass, superClass);
}
function _set_prototype_of$17(o, p) {
	_set_prototype_of$17 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$17(o, p);
}
var GalleryAction;
var init_action = __esmMin((() => {
	init_action$1();
	GalleryAction = /* @__PURE__ */ function(CardAction) {
		"use strict";
		_inherits$17(GalleryAction, CardAction);
		function GalleryAction(context, dataUtil, collector) {
			var _this = CardAction.call(this, context, dataUtil) || this;
			_this.context = context;
			_this.dataUtil = dataUtil;
			_this.collector = collector;
			return _this;
		}
		var _proto = GalleryAction.prototype;
		_proto.getScale = function getScale() {
			return this.collector.size.scale;
		};
		return GalleryAction;
	}(CardAction);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gallery/features/gallery-feature.js
function _defineProperties$4(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, descriptor.key, descriptor);
	}
}
function _create_class$4(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties$4(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties$4(Constructor, staticProps);
	return Constructor;
}
function _inherits$16(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$16(subClass, superClass);
}
function _set_prototype_of$16(o, p) {
	_set_prototype_of$16 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$16(o, p);
}
var GalleryFeatureBase;
var init_gallery_feature = __esmMin((() => {
	init_action();
	init_feature_single();
	GalleryFeatureBase = /* @__PURE__ */ function(BaseFeature) {
		"use strict";
		_inherits$16(GalleryFeatureBase, BaseFeature);
		function GalleryFeatureBase() {
			var _this = BaseFeature.apply(this, arguments) || this;
			_this.action = _this._register(new GalleryAction(_this.context, _this.collector.dataUtil, _this.collector));
			return _this;
		}
		_create_class$4(GalleryFeatureBase, [
			{
				key: "root",
				get: function() {
					return this.renderer.root;
				}
			},
			{
				key: "context",
				get: function() {
					return this.renderer.context;
				}
			},
			{
				key: "emitter",
				get: function() {
					return this.renderer.context.emitter;
				}
			},
			{
				key: "layer",
				get: function() {
					return this.renderer.getFeatureLayer();
				}
			},
			{
				key: "parentApi",
				get: function() {
					return this.renderer;
				}
			},
			{
				key: "collector",
				get: function() {
					return this.renderer.collector;
				}
			},
			{
				key: "UIEvent",
				get: function() {
					return this.renderer.UIEvent;
				}
			}
		]);
		return GalleryFeatureBase;
	}(BaseFeature);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gallery/features/common/card-active/main.js
function _inherits$15(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$15(subClass, superClass);
}
function _set_prototype_of$15(o, p) {
	_set_prototype_of$15 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$15(o, p);
}
var GalleryCardActive;
var init_main$6 = __esmMin((() => {
	init_gallery_feature();
	init_card_active$1();
	GalleryCardActive = /* @__PURE__ */ function(GalleryFeatureBase) {
		"use strict";
		_inherits$15(GalleryCardActive, GalleryFeatureBase);
		function GalleryCardActive() {
			var _this = GalleryFeatureBase.apply(this, arguments) || this;
			_this.render = () => {
				_this.cardActive.show();
			};
			_this.getCardRectInfos = (recordId) => {
				var cardInfo = _this.collector.card.getCardInfo(recordId);
				if (!cardInfo) return;
				var { scrollTop } = _this.collector.range;
				return [{
					renderRect: Object.assign(Object.assign({}, cardInfo.rect), { y: cardInfo.rect.y - scrollTop }),
					clipRect: _this.collector.size.globalRect
				}];
			};
			return _this;
		}
		var _proto = GalleryCardActive.prototype;
		_proto.bootstrap = function bootstrap() {
			this.cardActive = this._register(new CommonCardActive(this.emitter, {
				getClipRect: () => this.collector.size.globalRect,
				getCardRectInfos: (recordId) => this.getCardRectInfos(recordId),
				getHighlightActiveRecordId: () => this.collector.state.getHighlightActiveRecordId(),
				scrollCardToVisibility: (recordId) => this.parentApi.scrollCardToVisibility(recordId)
			}));
			this.layer.addGroup(this.cardActive.group);
		};
		return GalleryCardActive;
	}(GalleryFeatureBase);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gallery/features/common/card-active/index.js
var init_card_active = __esmMin((() => {
	init_interface$5();
	init_main$6();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gallery/features/common/v-scroller/interface.js
var IGalleryVerticalScroller;
var init_interface$4 = __esmMin((() => {
	init_module();
	IGalleryVerticalScroller = createDecorator("IGalleryVerticalScroller");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gallery/features/common/v-scroller/main.js
function _defineProperties$3(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, descriptor.key, descriptor);
	}
}
function _create_class$3(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties$3(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties$3(Constructor, staticProps);
	return Constructor;
}
function _inherits$14(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$14(subClass, superClass);
}
function _set_prototype_of$14(o, p) {
	_set_prototype_of$14 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$14(o, p);
}
var GalleryVeticalScroller;
var init_main$5 = __esmMin((() => {
	init_esm();
	init_utils();
	init_scroller();
	init_gallery_feature();
	init_scroll_info();
	GalleryVeticalScroller = /* @__PURE__ */ function(GalleryFeatureBase) {
		"use strict";
		_inherits$14(GalleryVeticalScroller, GalleryFeatureBase);
		function GalleryVeticalScroller() {
			var _this = GalleryFeatureBase.apply(this, arguments) || this;
			_this.render = () => {
				_this.updatePosition();
			};
			_this.isHovering = () => {
				var _a, _b;
				return ((_a = _this.vertical) === null || _a === void 0 ? void 0 : _a.isHovering()) || ((_b = _this.vertical) === null || _b === void 0 ? void 0 : _b.isDragging()) || false;
			};
			return _this;
		}
		var _proto = GalleryVeticalScroller.prototype;
		_proto.bootstrap = function bootstrap() {
			var _a;
			if (!((_a = getScrollConfig(this.context.getId())) === null || _a === void 0 ? void 0 : _a.useOuterVerticalScroll)) this.vertical = this._register(new CommonScroller({
				vertical: true,
				autoHide: ua.isMobile,
				id: "v-scroller",
				root: this.root,
				getViewRect: () => this.viewRect,
				getScrollTop: () => this.collector.range.scrollTop * this.collector.size.scale,
				getScrollHeight: () => this.collector.size.globalHeight * this.collector.size.scale,
				scrollToY: (y) => {
					this.action.hideToolTip();
					this.parentApi.scrollToY(y / this.collector.size.scale);
				},
				onMouseEnter: (event) => {
					var targetRect = event.target.getBoundingClientRect();
					var scrollTip = getScrollTipInfo(this.getAbsolutePosition(targetRect.x, targetRect.y), targetRect);
					this.action.showToolTip(scrollTip.hoverTip, scrollTip.tipRect, { props: { placement: "top" } });
				},
				onMouseLeave: () => this.action.hideToolTip()
			}));
		};
		_proto.updatePosition = function updatePosition() {
			var _a;
			(_a = this.vertical) === null || _a === void 0 || _a.updatePosition();
		};
		_create_class$3(GalleryVeticalScroller, [{
			key: "viewRect",
			get: function() {
				var { size } = this.collector;
				return {
					x: 0,
					y: 0,
					width: size.rootWidth * size.scale,
					height: size.rootHeight * size.scale
				};
			}
		}]);
		return GalleryVeticalScroller;
	}(GalleryFeatureBase);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gallery/features/common/v-scroller/index.js
var init_v_scroller = __esmMin((() => {
	init_interface$4();
	init_main$5();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gallery/features/mobile/tap-interactive/interface.js
var IGalleryTapInteractive;
var init_interface$3 = __esmMin((() => {
	init_module();
	IGalleryTapInteractive = createDecorator("IGalleryTapInteractive");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gallery/features/mobile/tap-interactive/main.js
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
var GalleryTapInteractive;
var init_main$4 = __esmMin((() => {
	init_pen();
	init_style();
	init_gallery_feature();
	init_content_hover();
	GalleryTapInteractive = /* @__PURE__ */ function(GalleryFeatureBase) {
		"use strict";
		_inherits$13(GalleryTapInteractive, GalleryFeatureBase);
		function GalleryTapInteractive() {
			var _this = GalleryFeatureBase.apply(this, arguments) || this;
			_this.onStageTap = (evt) => {
				_this.group.clear();
				var { recordId } = evt.target;
				if (recordId) _this.tapCard(evt.x, evt.y, recordId);
			};
			return _this;
		}
		var _proto = GalleryTapInteractive.prototype;
		_proto.bootstrap = function bootstrap() {
			this.group = this._register(pen.group(this.collector.size.globalRect));
			this.layer.addGroup(this.group);
			this.contentHover = new CardContentHover(this.action, this.collector.dataUtil);
			this._register(this.UIEvent.stage.onTap(this.onStageTap));
		};
		_proto.render = function render() {
			this.group.clear();
		};
		_proto.tapCard = function tapCard(x, y, recordId) {
			var cardInfo = this.collector.card.getCardInfo(recordId);
			if (!cardInfo) return;
			var { scrollTop } = this.collector.range;
			var isHitPart = cardInfo.contents.some((content) => this.contentHover.hover(this.group, content, {
				x,
				y,
				recordId,
				startY: 0,
				offsetX: 0,
				offsetY: scrollTop
			}));
			this.group.add(pen.config.rect(Object.assign(Object.assign({}, cardInfo.rect), {
				y: cardInfo.rect.y - scrollTop,
				background: style.color.hoverBackground,
				borderRadius: style.size.borderRadius,
				onTap: () => {
					if (!isHitPart) this.action.expandRow(recordId);
					this.cancelTap();
				}
			})));
		};
		_proto.cancelTap = function cancelTap() {
			setTimeout(() => this.group.clear(), 300);
		};
		return GalleryTapInteractive;
	}(GalleryFeatureBase);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gallery/features/mobile/tap-interactive/index.js
var init_tap_interactive = __esmMin((() => {
	init_interface$3();
	init_main$4();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gallery/features/mobile/entries.js
function getMobileFeatures() {
	return [
		{
			id: IGalleryVerticalScroller,
			ctor: GalleryVeticalScroller,
			config: { auth: FeatureAuth.None }
		},
		{
			id: IGalleryTapInteractive,
			ctor: GalleryTapInteractive,
			config: { auth: FeatureAuth.None }
		},
		{
			id: IGalleryCardActive,
			ctor: GalleryCardActive,
			config: { auth: FeatureAuth.None }
		}
	];
}
var init_entries$1 = __esmMin((() => {
	init_card_active();
	init_v_scroller();
	init_tap_interactive();
	init_feature_single();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gallery/features/common/auto-scroll/interface.js
var IGalleryAutoScroll;
var init_interface$2 = __esmMin((() => {
	init_module();
	IGalleryAutoScroll = createDecorator("IGalleryAutoScroll");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gallery/features/common/auto-scroll/main.js
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
var GalleryAutoScroll;
var init_main$3 = __esmMin((() => {
	init_auto_scroll$1();
	init_gallery_feature();
	GalleryAutoScroll = /* @__PURE__ */ function(GalleryFeatureBase) {
		"use strict";
		_inherits$12(GalleryAutoScroll, GalleryFeatureBase);
		function GalleryAutoScroll() {
			return GalleryFeatureBase.apply(this, arguments) || this;
		}
		var _proto = GalleryAutoScroll.prototype;
		_proto.bootstrap = function bootstrap() {
			this.autoScroll = this._register(new AutoScroll({
				scrollToX: () => {},
				scrollToY: (scrollY) => this.renderer.scrollToY(scrollY),
				getRoot: () => this.root,
				getScrollLeft: () => 0,
				getScrollTop: () => this.collector.range.scrollTop,
				getScale: () => this.collector.size.scale,
				getBoundRect: () => {
					var { size } = this.collector;
					return {
						left: size.globalRect.x,
						right: size.globalRect.x + size.globalRect.width,
						top: size.globalRect.y,
						bottom: size.globalRect.y + size.globalRect.height
					};
				}
			}));
		};
		_proto.readyX = function readyX(options) {
			this.autoScroll.readyX(options);
		};
		_proto.readyY = function readyY(options) {
			this.autoScroll.readyY(options);
		};
		_proto.readyBoth = function readyBoth(options) {
			this.autoScroll.readyBoth(options);
		};
		_proto.render = function render() {};
		return GalleryAutoScroll;
	}(GalleryFeatureBase);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gallery/features/common/auto-scroll/index.js
var init_auto_scroll = __esmMin((() => {
	init_interface$2();
	init_main$3();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gallery/features/pc/area-interactive/interface.js
var IGalleryAreaInteractive;
var init_interface$1 = __esmMin((() => {
	init_module();
	IGalleryAreaInteractive = createDecorator("IGalleryAreaInteractive");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gallery/features/pc/area-interactive/main.js
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
var defaultStyle, GalleryAreaInteractive;
var init_main$2 = __esmMin((() => {
	init_es();
	init_pen();
	init_style();
	init_gallery_feature();
	init_interface$1();
	init_cursor();
	init_content_hover();
	init_binary_search();
	init_is_in_rect();
	defaultStyle = { opacityStep: .02 };
	GalleryAreaInteractive = /* @__PURE__ */ function(GalleryFeatureBase) {
		"use strict";
		_inherits$11(GalleryAreaInteractive, GalleryFeatureBase);
		function GalleryAreaInteractive() {
			var _this = GalleryFeatureBase.apply(this, arguments) || this;
			_this.opacity = 0;
			_this.offsetX = 0;
			_this.offsetY = 0;
			_this.shadowDiv = document.createElement("div");
			_this.render = () => {
				var _a;
				_this.hideHoverCard();
				if ((_a = _this.target) === null || _a === void 0 ? void 0 : _a.recordId) _this.hoverCard(_this.target.recordId, _this.offsetX, _this.offsetY);
			};
			_this.onDocumentMouseMove = (evt) => {
				if (_this.isPreventFromOtherFeature()) {
					_this.hideHoverCard();
					_this.target = void 0;
					return;
				}
				_this.group.clear();
				_this.group.setAttrs(_this.collector.size.globalRect);
				var isInCanvas = evt.event.target === _this.layer.getElement();
				if (evt.target.recordId && isInCanvas) {
					_this.hoverCard(evt.target.recordId, evt.x, evt.y);
					_this.target = evt.target;
					_this.offsetX = evt.x;
					_this.offsetY = evt.y;
				} else {
					_this.hideHoverCard();
					_this.target = void 0;
				}
			};
			return _this;
		}
		var _proto = GalleryAreaInteractive.prototype;
		_proto.bootstrap = function bootstrap() {
			this.initShadowDiv();
			this.group = this._register(pen.group(this.collector.size.globalRect));
			this.layer.addGroup(this.group);
			this.contentHover = new CardContentHover(this.action, this.collector.dataUtil);
			this._register(this.UIEvent.document.onMouseMove(this.onDocumentMouseMove));
		};
		_proto.dispose = function dispose(trace) {
			GalleryFeatureBase.prototype.dispose.call(this, trace);
			this.root.removeChild(this.shadowDiv);
		};
		_proto.initShadowDiv = function initShadowDiv() {
			this.shadowDiv.setAttribute("hidden", "");
			this.shadowDiv.style.zIndex = "1";
			this.shadowDiv.style.position = "absolute";
			this.shadowDiv.style.pointerEvents = "none";
			this.shadowDiv.style.border = "none";
			this.shadowDiv.style.borderRadius = `${style.size.borderRadius}px`;
			if (!isDarkMode()) this.shadowDiv.style.boxShadow = "5px 5px 15px #d4d4d4, -1px -1px 5px #ebebeb";
			this.root.appendChild(this.shadowDiv);
		};
		_proto.shadowAnimation = function shadowAnimation() {
			var doDisappearAnimation = () => {
				if (this.opacity >= 1) {
					this.shadowDiv.style.opacity = "1";
					return;
				}
				this.opacity = Math.floor((this.opacity + defaultStyle.opacityStep) * 100) / 100;
				this.shadowDiv.style.opacity = this.opacity.toString();
				requestAnimationFrame(doDisappearAnimation);
			};
			doDisappearAnimation();
		};
		_proto.hoverCard = function hoverCard(recordId, x, y) {
			var cardInfo = this.collector.card.getCardInfo(recordId);
			if (!cardInfo) return;
			var { rect } = cardInfo;
			var { scale } = this.collector.size;
			var { scrollTop } = this.collector.range;
			var cardRect = Object.assign(Object.assign({}, rect), { y: rect.y - scrollTop });
			this.shadowDiv.style.left = `${cardRect.x * scale}px`;
			this.shadowDiv.style.top = `${cardRect.y * scale}px`;
			this.shadowDiv.style.width = `${cardRect.width * scale}px`;
			this.shadowDiv.style.height = `${cardRect.height * scale}px`;
			this.shadowDiv.removeAttribute("hidden");
			if (this.opacity === 0) this.shadowAnimation();
			this.setCursor(Cursor.POINTER);
			if (isHitRect(x, y, cardRect)) {
				var hitIndex = binarySearch(y, 0, cardInfo.contents.length - 1, (index) => {
					return cardInfo.contents[index][0].y - scrollTop;
				});
				var cardContent = cardInfo.contents[hitIndex];
				if (!cardContent) return;
				this.setCursor(Cursor.POINTER);
				var isHitContent = this.contentHover.hover(this.group, cardContent, {
					x,
					y,
					startY: 0,
					offsetX: 0,
					offsetY: scrollTop,
					recordId
				});
				this.group.add(pen.config.rect(Object.assign(Object.assign({}, cardRect), {
					borderRadius: style.size.borderRadius,
					onMouseUpWithRight: () => {
						this.collector.state.setContextMenuActivePoint(recordId);
					},
					onClick: () => {
						if (!isHitContent) this.action.expandRow(recordId);
					}
				})));
			}
		};
		_proto.hideHoverCard = function hideHoverCard() {
			this.group.clear();
			this.setCursor(Cursor.DEFAULT);
			this.shadowDiv.setAttribute("hidden", "");
			this.opacity = 0;
		};
		_proto.isPreventFromOtherFeature = function isPreventFromOtherFeature() {
			return this.featureLock.isPreventFromOtherFeature(IGalleryAreaInteractive);
		};
		return GalleryAreaInteractive;
	}(GalleryFeatureBase);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gallery/features/pc/area-interactive/index.js
var init_area_interactive = __esmMin((() => {
	init_interface$1();
	init_main$2();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gallery/features/pc/card-move/interface.js
var IGalleryCardMove;
var init_interface = __esmMin((() => {
	init_module();
	IGalleryCardMove = createDecorator("IGalleryCardMove");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gallery/utils/get-target-by-offset.js
function getTargetByOffset(offset, collector) {
	var { x: offsetX, y: offsetY } = offset;
	var { globalRect } = collector.size;
	var isOutsideStage = !isHitRect(offsetX, offsetY, globalRect);
	var { range, card } = collector;
	var rowIndex = binarySearch(offsetY, 0, range.rowCount - 1, (index) => range.getRowY(index) - range.scrollTop);
	return {
		isBlank: isOutsideStage,
		isOutStage: isOutsideStage,
		recordId: range.getRowRecordIds(rowIndex).find((recordId) => {
			var cardInfo = card.getCardInfo(recordId);
			if (!cardInfo) return false;
			if (isHitRect(offsetX, offsetY, Object.assign(Object.assign({}, cardInfo.rect), { y: cardInfo.rect.y - range.scrollTop }))) return true;
		})
	};
}
var init_get_target_by_offset = __esmMin((() => {
	init_binary_search();
	init_is_in_rect();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gallery/features/pc/card-move/main.js
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
var GalleryCardMove;
var init_main$1 = __esmMin((() => {
	init_common();
	init_pen();
	init_style();
	init_auto_scroll();
	init_gallery_feature();
	init_interface();
	init_get_target_by_offset();
	init_cursor();
	init_register_esc_to_cancel();
	GalleryCardMove = /* @__PURE__ */ function(GalleryFeatureBase) {
		"use strict";
		_inherits$10(GalleryCardMove, GalleryFeatureBase);
		function GalleryCardMove() {
			var _this = GalleryFeatureBase.apply(this, arguments) || this;
			_this.dragBuffer = 6;
			_this.draglineBorder = style.size.borderWidth * 2;
			_this.isInDragging = false;
			_this.isReadyToDrag = false;
			_this.moveDirection = Direction.RIGHT;
			_this.onStageMousedown = (evt) => {
				var _a;
				var { target } = evt;
				if (!target.recordId) return;
				var cardInfo = _this.collector.card.getCardInfo(target.recordId);
				if (!cardInfo) return;
				_this.isReadyToDrag = true;
				_this.clickInfo = Object.assign(Object.assign({}, target), {
					cardInfo,
					scrollTop: _this.collector.range.scrollTop
				});
				_this.mouseDownOffset = {
					x: evt.x,
					y: evt.y
				};
				_this.listenDragReady();
				(_a = _this.renderer.getFeature(IGalleryAutoScroll)) === null || _a === void 0 || _a.readyY();
			};
			_this.onWindowMouseMove = (evt) => {
				if (!_this.isReadyToDrag) return;
				var deltaX = evt.x - _this.mouseDownOffset.x;
				var deltaY = evt.y - _this.mouseDownOffset.y;
				_this.isInDragging = _this.isInDragging || Math.abs(deltaX) > _this.dragBuffer || Math.abs(deltaY) > _this.dragBuffer;
				if (_this.isReadyToDrag && _this.isInDragging) {
					_this.moveDirection = deltaX > 0 ? Direction.RIGHT : Direction.LEFT;
					_this.mouseMoveOffset = {
						x: evt.x,
						y: evt.y
					};
					_this.doMousemoveDragging(evt.target.recordId);
				}
			};
			_this.onDocumentMouseup = () => {
				if (!_this.isDragging()) {
					_this.clearAllStatus();
					return;
				}
				_this.moveCard();
				_this.clearAllStatus();
			};
			return _this;
		}
		var _proto = GalleryCardMove.prototype;
		_proto.bootstrap = function bootstrap() {
			this.group = this._register(pen.group(this.collector.size.globalRect));
			this.layer.addGroup(this.group);
			this._register(this.UIEvent.stage.onMouseDown(this.onStageMousedown));
		};
		_proto.render = function render() {
			if (this.isReadyToDrag && this.isInDragging) {
				this.group.clear();
				var targetInfo = getTargetByOffset(this.mouseMoveOffset, this.collector);
				this.doMousemoveDragging(targetInfo.recordId);
			}
		};
		_proto.isDragging = function isDragging() {
			return this.isInDragging && this.isReadyToDrag;
		};
		_proto.getFeatureLockConfig = function getFeatureLockConfig() {
			return { default: {
				id: IGalleryCardMove,
				isLock: () => this.isDragging()
			} };
		};
		_proto.listenDragReady = function listenDragReady() {
			this.cancelDragReady();
			this.mouseUpDisposable = this.UIEvent.document.onMouseUp(this.onDocumentMouseup);
			this.mouseMoveDisposable = this.UIEvent.window.onMouseMove(this.onWindowMouseMove);
			this.escDisposable = registerEscToCancel(this.UIEvent, () => {
				if (this.isDragging()) {
					this.cancelDragReady();
					this.clearAllStatus();
				}
			});
		};
		_proto.cancelDragReady = function cancelDragReady() {
			var _a, _b, _c;
			(_a = this.mouseUpDisposable) === null || _a === void 0 || _a.dispose();
			(_b = this.mouseMoveDisposable) === null || _b === void 0 || _b.dispose();
			(_c = this.escDisposable) === null || _c === void 0 || _c.dispose();
		};
		_proto.doMousemoveDragging = function doMousemoveDragging(recordId) {
			this.group.clear();
			this.drawOriginRecordBackground();
			this.updateCard();
			this.updateDragLineAndTargetInfo(recordId);
			this.setCursor(Cursor.GRABBING);
		};
		_proto.drawOriginRecordBackground = function drawOriginRecordBackground() {
			var _a;
			if (!((_a = this.clickInfo) === null || _a === void 0 ? void 0 : _a.cardInfo)) return;
			var { cardInfo } = this.clickInfo;
			var { scrollTop } = this.collector.range;
			var cardRect = Object.assign(Object.assign({}, cardInfo.rect), {
				x: cardInfo.rect.x,
				y: cardInfo.rect.y - scrollTop
			});
			this.group.add(pen.config.rect(Object.assign(Object.assign({}, cardRect), { background: style.color.activedBackground })));
		};
		_proto.updateCard = function updateCard() {
			if (!this.clickInfo) return;
			var offsetX = this.mouseMoveOffset.x - this.mouseDownOffset.x;
			var offsetY = -this.clickInfo.scrollTop + this.mouseMoveOffset.y - this.mouseDownOffset.y;
			var clipArea = Object.assign(Object.assign({}, this.clickInfo.cardInfo.rect), {
				x: this.clickInfo.cardInfo.rect.x + offsetX,
				y: this.clickInfo.cardInfo.rect.y + offsetY
			});
			var cardBox = pen.config.rect(Object.assign(Object.assign({}, this.clickInfo.cardInfo.rect), {
				borderWidth: style.size.borderWidth,
				borderRadius: style.size.borderRadius,
				background: style.color.normalBackground
			}));
			this.group.add(cardBox, offsetX, offsetY);
			this.clickInfo.cardInfo.contents.forEach((contents) => {
				contents[1].forEach((drawConfig) => this.group.add(Object.assign({}, drawConfig), offsetX, offsetY, clipArea));
			});
		};
		_proto.updateDragLineAndTargetInfo = function updateDragLineAndTargetInfo(recordId) {
			var _a;
			var targetId = recordId !== null && recordId !== void 0 ? recordId : this.targetId;
			this.targetId = targetId;
			if (!targetId || targetId === ((_a = this.clickInfo) === null || _a === void 0 ? void 0 : _a.recordId)) return;
			var cardInfo = this.collector.card.getCardInfo(targetId);
			if (!cardInfo) return;
			var { scrollTop } = this.collector.range;
			var { size } = this.collector;
			var cardLineOffset = this.moveDirection === Direction.LEFT ? cardInfo.rect.x - size.cardPadding / 2 - this.draglineBorder / 2 : cardInfo.rect.x + cardInfo.rect.width + size.cardPadding / 2 + 2 * style.size.borderWidth - this.draglineBorder / 2;
			this.group.add(pen.config.line({
				x: cardLineOffset,
				y: cardInfo.rect.y - scrollTop,
				points: [
					0,
					0,
					0,
					cardInfo.rect.height
				],
				borderColor: style.color.selectionBorderColor,
				borderWidth: this.draglineBorder
			}));
		};
		_proto.moveCard = function moveCard() {
			var _a, _b, _c;
			var context = this.collector.dataUtil.getContext();
			if (context.customConfig || !this.targetId || !((_a = this.clickInfo) === null || _a === void 0 ? void 0 : _a.recordId) || this.clickInfo.recordId === this.targetId) return;
			var view = context.getCurrentView();
			var behaviorApi = context.getBehaviorApi();
			var tableId = (_b = context.getCurrentTable()) === null || _b === void 0 ? void 0 : _b.id;
			if (!view || !tableId) return;
			var targetIndex = this.getTargetIndex(this.targetId);
			if (targetIndex < 0) return;
			behaviorApi.moveRecord({
				tableId,
				viewId: view.id,
				delta: {
					recordIds: [this.clickInfo.recordId],
					nextRecordId: (_c = view.getAllRecordIds()[targetIndex]) !== null && _c !== void 0 ? _c : null,
					groupPath: [null]
				}
			});
		};
		/**
		* 获取 targetIndex
		* @private
		* @param {string} recordId
		* @return {*}  {number}
		* @memberof CardMove
		*/ _proto.getTargetIndex = function getTargetIndex(recordId) {
			var _a, _b;
			var view = this.collector.dataUtil.getContext().getCurrentView();
			if (!view || !((_a = this.clickInfo) === null || _a === void 0 ? void 0 : _a.recordId)) return -1;
			var targetIndex = (_b = view.getAllRecordIds().indexOf(recordId)) !== null && _b !== void 0 ? _b : -1;
			targetIndex = this.moveDirection === Direction.RIGHT ? targetIndex + 1 : targetIndex;
			var targetRecordId = view.getAllRecordIds()[targetIndex];
			if (view.getAllRecordIds().indexOf(this.clickInfo.recordId) <= view.getAllRecordIds().indexOf(targetRecordId)) targetIndex -= 1;
			targetIndex = Math.max(0, Math.min(view.getAllRecordIds().length - 1, targetIndex));
			return targetIndex;
		};
		_proto.clearAllStatus = function clearAllStatus() {
			this.group.clear();
			this.mouseDownOffset = {
				x: 0,
				y: 0
			};
			this.mouseMoveOffset = {
				x: 0,
				y: 0
			};
			this.clickInfo = void 0;
			this.moveDirection = Direction.RIGHT;
			this.targetId = void 0;
			this.isReadyToDrag = false;
			this.isInDragging = false;
			this.setCursor(Cursor.DEFAULT);
		};
		return GalleryCardMove;
	}(GalleryFeatureBase);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gallery/features/pc/card-move/index.js
var init_card_move = __esmMin((() => {
	init_interface();
	init_main$1();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gallery/features/pc/entries.js
function getPcFeatures() {
	return [
		{
			id: IGalleryAutoScroll,
			ctor: GalleryAutoScroll,
			config: { auth: FeatureAuth.None }
		},
		{
			id: IGalleryVerticalScroller,
			ctor: GalleryVeticalScroller,
			config: { auth: FeatureAuth.None }
		},
		{
			id: IGalleryAreaInteractive,
			ctor: GalleryAreaInteractive,
			config: { auth: FeatureAuth.None }
		},
		{
			id: IGalleryCardActive,
			ctor: GalleryCardActive,
			config: { auth: FeatureAuth.None }
		},
		{
			id: IGalleryCardMove,
			ctor: GalleryCardMove,
			config: { auth: FeatureAuth.Record }
		}
	];
}
var init_entries = __esmMin((() => {
	init_auto_scroll();
	init_card_active();
	init_v_scroller();
	init_area_interactive();
	init_card_move();
	init_feature_single();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gallery/event-handler/index.js
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
var import_main$3, GalleryEventHandler;
var init_event_handler = __esmMin((() => {
	import_main$3 = require_main();
	init_feature_event();
	init_get_target_by_offset();
	GalleryEventHandler = /* @__PURE__ */ function(Disposable) {
		"use strict";
		_inherits$9(GalleryEventHandler, Disposable);
		function GalleryEventHandler(stage, root, rendererModel) {
			var _this = Disposable.call(this) || this;
			_this.stage = stage;
			_this.root = root;
			_this.rendererModel = rendererModel;
			_this.UIEvent = _this._register(new FeatureUIEvent({
				root: _this.root,
				stage: _this.stage,
				getScale: () => _this.rendererModel.collector.size.scale,
				targetGetter: (offset) => getTargetByOffset(offset, _this.rendererModel.collector)
			}));
			return _this;
		}
		return GalleryEventHandler;
	}(import_main$3.Disposable);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gallery/renderer/main/index.js
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
var import_main$2, MainRenderer;
var init_main = __esmMin((() => {
	import_main$2 = require_main();
	init_pen();
	init_style();
	init_card_single();
	MainRenderer = /* @__PURE__ */ function(Disposable) {
		"use strict";
		_inherits$8(MainRenderer, Disposable);
		function MainRenderer(collector) {
			var _this = Disposable.call(this) || this;
			_this.collector = collector;
			return _this;
		}
		var _proto = MainRenderer.prototype;
		_proto.render = function render(container) {
			var { range } = this.collector;
			range.doRowRange((rowIndex) => {
				range.getRowRecordIds(rowIndex).forEach((recordId) => this.renderCard(container, recordId));
			});
		};
		_proto.renderCard = function renderCard(container, recordId) {
			var card = this.collector.card.getCardInfo(recordId);
			if (!card) return;
			var { scrollTop } = this.collector.range;
			var isHighlight = this.collector.state.isHighlightRecord(recordId);
			container.add(pen.config.rect(Object.assign(Object.assign({}, card.rect), {
				borderWidth: style.size.borderWidth,
				borderRadius: style.size.borderRadius,
				background: isHighlight ? style.color.searchHighlightBackground : style.color.normalBackground
			})), 0, -scrollTop);
			var clipRect = Object.assign(Object.assign({}, card.rect), {
				y: card.rect.y - scrollTop,
				width: card.rect.width - style.size.borderWidth
			});
			card.contents.forEach((contents) => {
				var [contentRect, drawConfigs, id] = contents;
				if (contentRect.y - scrollTop > this.collector.size.globalRect.height || contentRect.y + contentRect.height < 0) return;
				var clipArea = id === SpecailContentID.Cover ? clipRect : Object.assign(Object.assign({}, contentRect), { y: contentRect.y - scrollTop });
				drawConfigs.forEach((drawConfig) => container.add(drawConfig, 0, -scrollTop, clipArea));
			});
		};
		return MainRenderer;
	}(import_main$2.Disposable);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gallery/renderer/index.js
function _defineProperties$2(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, descriptor.key, descriptor);
	}
}
function _create_class$2(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties$2(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties$2(Constructor, staticProps);
	return Constructor;
}
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
var GalleryRenderer;
var init_renderer = __esmMin((() => {
	init_tslib_es6();
	init_es();
	init_pen();
	init_performance();
	init_event_handler();
	init_main();
	init_base_renderer();
	GalleryRenderer = /* @__PURE__ */ function(BaseRenderer) {
		"use strict";
		_inherits$7(GalleryRenderer, BaseRenderer);
		function GalleryRenderer(rendererModel, root) {
			var _this = BaseRenderer.call(this, root, rendererModel.collector.dataUtil.getContext()) || this;
			_this.rendererModel = rendererModel;
			_this.root = root;
			_this.isRendering = false;
			_this.collector = _this.rendererModel.collector;
			_this.mainLayer = _this._register(pen.layer(_this.mainLayerConfig));
			_this.featureLayer = _this._register(pen.layer(_this.featureLayerConfig));
			_this.stage.addLayer(_this.mainLayer);
			_this.stage.addLayer(_this.featureLayer);
			_this.mainGroup = _this._register(pen.group(Object.assign(Object.assign({}, _this.collector.size.globalRect), { batch: true })));
			_this.mainLayer.addGroup(_this.mainGroup);
			_this.mainRenderer = _this._register(new MainRenderer(_this.collector));
			_this._register(_this.rendererModel.onRenderModelChange(() => {
				_this.render();
			}));
			_this.eventHandler = _this._register(new GalleryEventHandler(_this.stage, _this.root, _this.rendererModel));
			_this.UIEvent = _this.eventHandler.UIEvent;
			return _this;
		}
		var _proto = GalleryRenderer.prototype;
		_proto.getFeatureLayer = function getFeatureLayer() {
			return this.featureLayer;
		};
		_proto.render = function render() {
			if (!this.isRendering) {
				this.isRendering = true;
				requestAnimationFrame(() => {
					var _a;
					if (((_a = this.collector.dataUtil.getCurrentView()) === null || _a === void 0 ? void 0 : _a.type) !== ViewType.GALLERY) return;
					performanceReport.common.markRenderStart();
					this.rendererModel.collector.card.collectVisibleCards();
					this.renderMain();
					this.renderFeature();
					performanceReport.common.markRenderEnd(this.collector.dataUtil.getContext());
					this.isRendering = false;
				});
			}
		};
		_proto.renderMain = function renderMain() {
			this.mainGroup.clear();
			this.mainRenderer.render(this.mainGroup);
		};
		_proto.renderFeature = function renderFeature() {
			this.featureRenderer.render();
		};
		_proto.resize = function resize() {
			if (this.collector.state.isExporting()) {
				this.originResize();
				return;
			}
			this.debounceResize();
		};
		_proto.originResize = function originResize() {
			this.mainLayer.setAttrs(this.mainLayerConfig);
			this.featureLayer.setAttrs(this.featureLayerConfig);
			this.mainGroup.setAttrs(this.collector.size.globalRect);
			this.render();
		};
		_proto.debounceResize = function debounceResize() {
			this.originResize();
		};
		_create_class$2(GalleryRenderer, [{
			key: "mainLayerConfig",
			get: function() {
				var { scale, globalOriginRootWidth, globalOriginRootHeight } = this.collector.size;
				return {
					id: "main-layer",
					scale,
					x: 0,
					y: 0,
					width: globalOriginRootWidth,
					height: globalOriginRootHeight
				};
			}
		}, {
			key: "featureLayerConfig",
			get: function() {
				var { scale, globalOriginRootWidth, globalOriginRootHeight } = this.collector.size;
				return {
					id: "feature-layer",
					listening: true,
					scale,
					x: 0,
					y: 0,
					width: globalOriginRootWidth,
					height: globalOriginRootHeight
				};
			}
		}]);
		return GalleryRenderer;
	}(BaseRenderer);
	__decorate([
		debounce(200),
		__metadata("design:type", Function),
		__metadata("design:paramtypes", []),
		__metadata("design:returntype", void 0)
	], GalleryRenderer.prototype, "debounceResize", null);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gallery/collector/card.js
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
var import_main$1, CardCollector;
var init_card = __esmMin((() => {
	init_event();
	import_main$1 = require_main();
	init_es();
	init_field_collector();
	init_field_fixed_height();
	init_pen();
	init_resources();
	init_style();
	init_card_single();
	CardCollector = /* @__PURE__ */ function(Disposable) {
		"use strict";
		_inherits$6(CardCollector, Disposable);
		function CardCollector(dataUtil, size, range, state, status) {
			var _this = Disposable.call(this) || this;
			_this.dataUtil = dataUtil;
			_this.size = size;
			_this.range = range;
			_this.state = state;
			_this.status = status;
			_this.cardInfo = /* @__PURE__ */ new Map();
			_this.asyncTask = null;
			_this.onContentChangeEmitter = _this._register(new Emitter());
			_this.onContentChange = _this.onContentChangeEmitter.event;
			_this.cardSingle = new CardSingleCollector(_this.dataUtil, _this.status, fieldCollector.getDefaultConfig({
				maxLines: 2,
				textConfig: {
					wrap: "word",
					ellipsis: true,
					verticalAlign: "top"
				},
				labelConfig: {
					canWrap: false,
					canDelete: false
				},
				formulaConfig: { errorType: "withText" }
			}));
			return _this;
		}
		var _proto = CardCollector.prototype;
		_proto.dispose = function dispose() {
			var _a;
			Disposable.prototype.dispose.call(this);
			this.beforeCollect();
			(_a = this.asyncTask) === null || _a === void 0 || _a.abort();
		};
		_proto.collect = function collect() {
			this.beforeCollect();
			if (this.state.isExporting()) this.collectAll();
			else this.collectVisibleCards();
		};
		_proto.patch = function patch(_mutations) {
			this.collect();
		};
		_proto.getCardInfo = function getCardInfo(recordId) {
			return this.cardInfo.get(recordId);
		};
		_proto.collectVisibleCards = function collectVisibleCards() {
			this.range.doRowRange((rowIndex, colIndex) => {
				var recordId = this.range.getRecordByIndex(rowIndex, colIndex);
				if (recordId && !this.cardInfo.has(recordId)) {
					var recordIndex = this.size.cardCountEachRow * rowIndex + colIndex;
					this.collectCardContent(recordId, recordIndex);
				}
			});
		};
		_proto.getCardRectByRecordId = function getCardRectByRecordId(recordId) {
			var recordIndex = this.dataUtil.getRecordIndexFromVisibleRecordIds(recordId);
			return this.getCardRect(recordIndex);
		};
		_proto.getCardRect = function getCardRect(recordIndex) {
			var columnIndex = recordIndex % this.size.cardCountEachRow;
			var rowIndex = Math.floor(recordIndex / this.size.cardCountEachRow);
			return {
				x: this.size.globalPaddingLeft + columnIndex * (this.size.cardWidth + this.size.cardMargin),
				y: this.range.getRowY(rowIndex),
				width: this.size.cardWidth,
				height: this.size.cardHeight
			};
		};
		_proto.beforeCollect = function beforeCollect() {
			this.cardInfo.clear();
		};
		_proto.collectAll = function collectAll() {
			this.dataUtil.getDisplayedRecordIds().forEach((recordId, index) => {
				this.collectCardContent(recordId, index);
			});
		};
		_proto.collectCardContent = function collectCardContent(recordId, recordIndex) {
			var cardConfig = this.dataUtil.getCardConfig();
			if (!cardConfig) return;
			if (this.cardInfo.has(recordId)) return;
			var cardInfo = {
				rect: this.getCardRect(recordIndex),
				contents: []
			};
			var option = {
				recordId,
				collectStartX: cardInfo.rect.x,
				collectStartY: cardInfo.rect.y,
				collectHeight: 0,
				cardWidth: cardInfo.rect.width,
				cardPadding: this.size.cardPadding,
				coverHeight: this.size.cardCoverHeight,
				cardContentGap: this.size.cardContentGap,
				cardFieldTitleGap: this.size.cardFieldTitleGap,
				cardFieldTitleHeight: this.size.cardFieldTitleHeight
			};
			var contentStartY = option.collectStartY;
			if (cardConfig.isShowCover) {
				option.collectHeight = this.size.cardCoverHeight;
				var coverInfo = this.cardSingle.collectCover(cardConfig.coverFieldId, contentStartY, option);
				if (coverInfo) {
					if (coverInfo.contents.length) slicePush(cardInfo.contents, coverInfo.contents);
					else {
						var grayRect = {
							x: option.collectStartX + style.size.borderWidth,
							y: option.collectStartY + style.size.borderWidth,
							width: option.cardWidth - style.size.borderWidth * 2,
							height: option.coverHeight - style.size.borderWidth * 2
						};
						var grayBackConfig = pen.config.rect(Object.assign(Object.assign({}, grayRect), { background: style.color.headerBackground }));
						var iconSize = 48;
						var emptyIcon = pen.config.icon(NormalIconAlias.DEFAULT_IMAGE, {
							x: grayRect.x + (grayRect.width - iconSize) / 2,
							y: grayRect.y + (grayRect.height - iconSize) / 2,
							width: iconSize,
							height: iconSize
						});
						cardInfo.contents.push([grayRect, [grayBackConfig, emptyIcon]]);
					}
					contentStartY += coverInfo.takeHeight + option.cardContentGap;
				}
			} else contentStartY += this.size.cardPadding;
			option.collectHeight = this.size.cardPrimaryFieldHeight;
			var primaryInfo = this.cardSingle.collectPrimaryTitle(contentStartY, option);
			if (primaryInfo) {
				slicePush(cardInfo.contents, primaryInfo.contents);
				contentStartY += primaryInfo.takeHeight + option.cardContentGap;
			}
			var cellInfo = this.cardSingle.collectCellContents(contentStartY, option, cardConfig.isShowFieldTitle, fieldFixedContent.getFixedContentDrawHeight.bind(fieldFixedContent));
			if (cellInfo) {
				slicePush(cardInfo.contents, cellInfo.contents);
				contentStartY += cellInfo.takeHeight;
			}
			if (cardConfig.isShowInteractionData) {
				option.collectHeight = this.size.cardInteractionSize;
				var interactionInfo = this.cardSingle.collectInteraction(cardInfo.rect.y + cardInfo.rect.height - style.size.cellPadding - style.size.iconLarge, option);
				if (interactionInfo) {
					slicePush(cardInfo.contents, interactionInfo.contents);
					contentStartY += interactionInfo.takeHeight;
				}
			}
			this.cardInfo.set(recordId, cardInfo);
		};
		return CardCollector;
	}(import_main$1.Disposable);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gallery/collector/data-util.js
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
var DataUtil;
var init_data_util = __esmMin((() => {
	init_data_util$1();
	DataUtil = /* @__PURE__ */ function(BaseCollectorDataUtil) {
		"use strict";
		_inherits$5(DataUtil, BaseCollectorDataUtil);
		function DataUtil(context) {
			var _this = BaseCollectorDataUtil.call(this, context) || this;
			_this.context = context;
			return _this;
		}
		var _proto = DataUtil.prototype;
		/**
		* 获取画册卡片配置
		*/ _proto.getCardConfig = function getCardConfig() {
			var _a;
			return (_a = this.getCurrentView()) === null || _a === void 0 ? void 0 : _a.getCardConfig();
		};
		/**
		* 获取画册卡片点赞数据
		*/ _proto.getInteractionData = function getInteractionData(type, recordId) {
			var _a;
			return (_a = this.getCurrentTable()) === null || _a === void 0 ? void 0 : _a.getRecordInteractionData(type, recordId);
		};
		return DataUtil;
	}(BaseCollectorDataUtil);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gallery/utils/storage-key.js
var GalleryStorageType;
var init_storage_key = __esmMin((() => {
	(function(GalleryStorageType) {
		GalleryStorageType["Position"] = "GalleryScrollPosition";
	})(GalleryStorageType || (GalleryStorageType = {}));
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gallery/collector/range.js
function _defineProperties$1(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, descriptor.key, descriptor);
	}
}
function _create_class$1(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties$1(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties$1(Constructor, staticProps);
	return Constructor;
}
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
var import_main, RangeCollector;
var init_range = __esmMin((() => {
	init_event();
	import_main = require_main();
	init_utils();
	init_storage_key();
	init_binary_search();
	init_storage_sync();
	RangeCollector = /* @__PURE__ */ function(Disposable) {
		"use strict";
		_inherits$4(RangeCollector, Disposable);
		function RangeCollector(dataUtil, size) {
			var _this;
			var _a;
			_this = Disposable.call(this) || this;
			_this.dataUtil = dataUtil;
			_this.size = size;
			_this.scrollTop = 0;
			_this.rowCount = 0;
			_this.startRow = 0;
			_this.endRow = 0;
			_this.onRangeChangeEmitter = _this._register(new Emitter());
			_this.onScrollEmitter = _this._register(new Emitter());
			_this.onRangeChange = _this.onRangeChangeEmitter.event;
			_this.onScroll = _this.onScrollEmitter.event;
			if (!((_a = getScrollConfig(dataUtil.getContext().getId())) === null || _a === void 0 ? void 0 : _a.notReuseScrollPosition)) {
				var scrollTop = JSON.parse(getStorageValue(_this.dataUtil.getContext(), GalleryStorageType.Position) || "0");
				_this.scrollTop = scrollTop;
			}
			return _this;
		}
		var _proto = RangeCollector.prototype;
		_proto.collect = function collect() {
			this.collectRowRange();
			this.collectTotalHeight();
		};
		_proto.patch = function patch(_mutations) {
			this.collect();
			if (this.scrollTop > this.size.globalHeight) this.updateScrollTop(this.size.globalHeight - this.size.rootHeight);
		};
		_proto.updateScrollTop = function updateScrollTop(scrollTop) {
			var _a;
			if (scrollTop === this.scrollTop) return;
			this.scrollTop = Math.min(this.size.globalHeight - this.size.rootHeight, this.scrollTop);
			this.scrollTop = Math.max(0, scrollTop);
			if (!((_a = getScrollConfig(this.dataUtil.getContext().getId())) === null || _a === void 0 ? void 0 : _a.notReuseScrollPosition)) setStorageValue(this.dataUtil.getContext(), GalleryStorageType.Position, String(this.scrollTop));
			this.onScrollEmitter.fire();
			this.collect();
		};
		_proto.getRowY = function getRowY(rowIndex) {
			return this.size.globalPaddingTop + rowIndex * this.cardTakeHeight;
		};
		_proto.getRange = function getRange() {
			return {
				start: this.startRow,
				end: this.endRow
			};
		};
		_proto.doRowRange = function doRowRange(callback) {
			for (var rowIndex = this.startRow; rowIndex <= this.endRow; rowIndex++) for (var columnIndex = 0; columnIndex < this.size.cardCountEachRow; columnIndex++) callback(rowIndex, columnIndex);
		};
		_proto.getRowRecordIds = function getRowRecordIds(rowIndex) {
			var recordIds = this.dataUtil.getDisplayedRecordIds();
			var recordStartIndex = rowIndex * this.size.cardCountEachRow;
			var recordEndIndex = Math.min(recordStartIndex + this.size.cardCountEachRow, recordIds.length - 1);
			return recordIds.slice(recordStartIndex, recordEndIndex + 1);
		};
		_proto.getRecordByIndex = function getRecordByIndex(rowIndex, colIndex) {
			var recordIds = this.dataUtil.getDisplayedRecordIds();
			var recordIndex = rowIndex * this.size.cardCountEachRow + colIndex;
			if (recordIndex < recordIds.length) return recordIds[recordIndex];
		};
		_proto.getScrollStatus = function getScrollStatus() {
			return {
				x: 0,
				y: this.scrollTop,
				isTop: true,
				isBottom: true
			};
		};
		_proto.collectRowRange = function collectRowRange() {
			var originStartRow = this.startRow;
			var originEndRow = this.endRow;
			this.rowCount = Math.ceil(this.dataUtil.getDisplayedRecordIds().length / this.size.cardCountEachRow);
			var maxIndex = this.rowCount - 1;
			this.startRow = binarySearch(this.scrollTop, 0, maxIndex, this.getRowY.bind(this));
			this.endRow = this.startRow;
			while (this.endRow < maxIndex) {
				if (this.getRowY(this.endRow) + this.cardTakeHeight - this.scrollTop > this.size.rootHeight) break;
				this.endRow += 1;
			}
			this.endRow = Math.min(this.endRow, maxIndex);
			if (originStartRow !== this.startRow || originEndRow !== this.endRow) this.onRangeChangeEmitter.fire();
		};
		_proto.collectTotalHeight = function collectTotalHeight() {
			this.size.setGlobalHeight(this.rowCount * this.cardTakeHeight + this.size.globalPaddingTop + this.size.globalPaddingBottom);
		};
		_create_class$1(RangeCollector, [{
			key: "cardTakeHeight",
			get: function() {
				return this.size.cardHeight + this.size.cardMargin;
			}
		}]);
		return RangeCollector;
	}(import_main.Disposable);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gallery/collector/size.js
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
var SizeCollector;
var init_size = __esmMin((() => {
	init_esm();
	init_es$1();
	init_render_app_config();
	init_index_interface();
	init_style();
	init_size$1();
	init_calc_card_heigth();
	SizeCollector = /* @__PURE__ */ function(BaseSizeCollector) {
		"use strict";
		_inherits$3(SizeCollector, BaseSizeCollector);
		function SizeCollector(dataUtil) {
			var _this = BaseSizeCollector.call(this, dataUtil) || this;
			_this.dataUtil = dataUtil;
			_this.cardMargin = ua.isMobile ? 8 : 16;
			_this.cardPadding = 12;
			_this.cardPrimaryFieldHeight = 20;
			_this.cardFieldTitleHeight = 14;
			_this.cardFieldTitleGap = 8;
			_this.cardContentGap = 12;
			_this.cardCoverHeight = ua.isMobile ? 120 : 180;
			_this.cardInteractionSize = style.size.iconLarge;
			_this.maxCardWidth = ua.isMobile ? 190 : 300;
			_this.$cardWidth = 0;
			_this.$cardHeight = 0;
			_this.$cardCountEachRow = 0;
			_this.$globalHeight = 0;
			return _this;
		}
		var _proto = SizeCollector.prototype;
		_proto.patch = function patch() {
			BaseSizeCollector.prototype.patch.call(this);
			this.calcCardWidth();
			this.$cardHeight = calcCardHeight(this.dataUtil, this);
		};
		_proto.setGlobalHeight = function setGlobalHeight(height) {
			this.$globalHeight = height;
		};
		_proto.calcCardWidth = function calcCardWidth() {
			var availableWidth = this.rootWidth - this.globalPaddingLeft - this.globalPaddingRight;
			this.$cardCountEachRow = Math.max(1, Math.ceil(availableWidth / (this.maxCardWidth + this.cardMargin)));
			if (ua.isMobile && this.rootWidth <= 640) this.$cardCountEachRow = 2;
			this.$cardWidth = Math.ceil((availableWidth - this.cardMargin * (this.$cardCountEachRow - 1)) / this.$cardCountEachRow);
		};
		_create_class(SizeCollector, [
			{
				key: "globalPaddingLeft",
				get: function() {
					var { globalPaddingLeft } = this.sizeConfig;
					if (globalPaddingLeft !== void 0) return globalPaddingLeft;
					return ua.isMobile ? 8 : 16;
				}
			},
			{
				key: "globalPaddingRight",
				get: function() {
					var { globalPaddingRight } = this.sizeConfig;
					if (globalPaddingRight !== void 0) return globalPaddingRight;
					return ua.isMobile ? 8 : 16;
				}
			},
			{
				key: "globalPaddingTop",
				get: function() {
					var { globalPaddingTop } = this.sizeConfig;
					if (globalPaddingTop !== void 0) return globalPaddingTop;
					return ua.isMobile ? 8 : 1;
				}
			},
			{
				key: "globalPaddingBottom",
				get: function() {
					var { globalPaddingBottom } = this.sizeConfig;
					if (globalPaddingBottom !== void 0) return globalPaddingBottom;
					return ua.isMobile ? 80 : 16;
				}
			},
			{
				key: "globalHeight",
				get: function() {
					return this.$globalHeight;
				}
			},
			{
				key: "rootWidth",
				get: function() {
					return Math.ceil(this.globalOriginRootWidth / this.scale);
				}
			},
			{
				key: "rootHeight",
				get: function() {
					return Math.ceil(this.globalOriginRootHeight / this.scale);
				}
			},
			{
				key: "globalRect",
				get: function() {
					return {
						x: 0,
						y: 0,
						width: this.rootWidth,
						height: this.rootHeight
					};
				}
			},
			{
				key: "cardWidth",
				get: function() {
					return this.$cardWidth;
				}
			},
			{
				key: "cardHeight",
				get: function() {
					return this.$cardHeight;
				}
			},
			{
				key: "cardCountEachRow",
				get: function() {
					return this.$cardCountEachRow;
				}
			},
			{
				key: "sizeConfig",
				get: function() {
					var _a, _b;
					return (_b = (_a = renderAppConfigService.getConfig()[RenderAppConfigKey.SIZE_CONFIG]) === null || _a === void 0 ? void 0 : _a[ViewType$1.GALLERY]) !== null && _b !== void 0 ? _b : {};
				}
			}
		]);
		return SizeCollector;
	}(BaseSizeCollector);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gallery/collector/index.js
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
var GalleryCollector;
var init_collector = __esmMin((() => {
	init_resources();
	init_card();
	init_data_util();
	init_range();
	init_size();
	init_collector$1();
	init_collector_state();
	GalleryCollector = /* @__PURE__ */ function(BaseCollector) {
		"use strict";
		_inherits$2(GalleryCollector, BaseCollector);
		function GalleryCollector(context, status) {
			var _this = BaseCollector.call(this, context) || this;
			_this.context = context;
			_this.status = status;
			_this.state = new BaseStateCenter();
			_this.dataUtil = _this._register(new DataUtil(context));
			_this.size = _this._register(new SizeCollector(_this.dataUtil));
			_this.range = _this._register(new RangeCollector(_this.dataUtil, _this.size));
			_this.card = _this._register(new CardCollector(_this.dataUtil, _this.size, _this.range, _this.state, _this.status));
			return _this;
		}
		var _proto = GalleryCollector.prototype;
		_proto.handleCollect = function handleCollect() {
			this.size.collect();
			this.range.collect();
			this.card.collect();
		};
		_proto.handlePatch = function handlePatch(mutations) {
			this.size.patch();
			this.range.patch(mutations);
			this.card.patch(mutations);
		};
		_proto.handleResize = function handleResize(scale) {
			this.size.setScale(scale);
			if (this.state.isExporting()) resourceLoader.refreshLoadingCount();
			this.size.patch();
			this.range.patch();
			this.card.patch();
		};
		return GalleryCollector;
	}(BaseCollector);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gallery/renderer-model/index.js
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
var GalleryRendererModel;
var init_renderer_model = __esmMin((() => {
	init_event();
	init_utils();
	init_groupable_status();
	init_collector();
	init_base_renderer_model();
	init_fix_scroll_delta();
	GalleryRendererModel = /* @__PURE__ */ function(BaseRendererModel) {
		"use strict";
		_inherits$1(GalleryRendererModel, BaseRendererModel);
		function GalleryRendererModel(context) {
			var _this = BaseRendererModel.call(this, context) || this;
			_this.context = context;
			_this.onRenderModelChangeEmitter = _this._register(new Emitter());
			_this.onRenderModelChange = _this.onRenderModelChangeEmitter.event;
			_this.status = new GroupableStatus(context.getCurrentTable(), context.getCurrentView(), context.getCore());
			_this.collector = _this._register(new GalleryCollector(_this.context, _this.status));
			_this.collector.collect();
			_this._register(_this.collector.card.onContentChange(() => {
				_this.onRenderModelChangeEmitter.fire();
			}));
			_this._register(_this.collector.range.onRangeChange(() => {
				_this.onRenderModelChangeEmitter.fire();
			}));
			_this._register(_this.collector.range.onScroll(() => {
				_this.onRenderModelChangeEmitter.fire();
			}));
			return _this;
		}
		var _proto = GalleryRendererModel.prototype;
		_proto.getStatus = function getStatus() {
			return this.status;
		};
		_proto.scrollByDelta = function scrollByDelta(scrollInfo) {
			var _a;
			var { scrollTop } = this.collector.range;
			var y = fixScrollDelta(scrollInfo.deltaY, scrollTop, this.collector.size.globalHeight, this.collector.size.rootHeight, (_a = getScrollConfig(this.context.getId())) === null || _a === void 0 ? void 0 : _a.scrollerFactor);
			if (y) this.collector.range.updateScrollTop(scrollTop + y);
		};
		_proto.handleModelChange = function handleModelChange(mutations) {
			this.collector.patch(mutations);
			this.onRenderModelChangeEmitter.fire();
		};
		return GalleryRendererModel;
	}(BaseRendererModel);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gallery/index.js
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
var import_clamp, GALLERY_EXPORT_IMAGE_WIDTH, GalleryView;
var init_gallery = __esmMin((() => {
	import_clamp = /* @__PURE__ */ __toESM(require_clamp());
	init_esm();
	init_es();
	init_es$1();
	init_utils();
	init_entries$1();
	init_entries();
	init_renderer();
	init_renderer_model();
	init_get_target_by_offset();
	init_view();
	GALLERY_EXPORT_IMAGE_WIDTH = 1200;
	GalleryView = /* @__PURE__ */ function(KanbanGalleryView) {
		"use strict";
		_inherits(GalleryView, KanbanGalleryView);
		function GalleryView(context) {
			var _this = KanbanGalleryView.call(this, context) || this;
			_this.initFeatures();
			return _this;
		}
		var _proto = GalleryView.prototype;
		_proto.getType = function getType() {
			return ViewType$1.GALLERY;
		};
		_proto.initFeatures = function initFeatures() {
			(ua.isPC ? getPcFeatures() : getMobileFeatures()).forEach((featureOption) => this.installFeature(featureOption));
		};
		_proto.getFeatureLayer = function getFeatureLayer() {
			return this.renderer.getFeatureLayer();
		};
		_proto.scrollToY = function scrollToY(scrollTop) {
			var _a;
			if ((_a = getScrollConfig(this.context.getId())) === null || _a === void 0 ? void 0 : _a.useOuterVerticalScroll) {
				var validScrollTop = (0, import_clamp.default)(scrollTop, 0, this.collector.size.globalHeight - this.collector.size.rootHeight);
				if (validScrollTop !== this.collector.range.scrollTop) fireEvent.execute(SmartSheetEventName.INNER_TO_OUTER_VIEWPORT_SCROLL, {
					deltaY: validScrollTop - this.collector.range.scrollTop,
					deltaX: 0,
					editorId: this.context.getId()
				});
				return;
			}
			this.collector.range.updateScrollTop(scrollTop);
		};
		_proto.beforeExport = function beforeExport() {
			var _a;
			KanbanGalleryView.prototype.beforeExport.call(this);
			var { globalHeight, rootWidth, cardHeight, globalPaddingLeft, globalPaddingRight, globalPaddingTop, globalPaddingBottom, maxCardWidth, cardMargin } = this.collector.size;
			if (!ua.isMobile) {
				this.scrollToY(0);
				this.setRootSize(rootWidth, globalHeight);
			} else {
				var availableWidth = GALLERY_EXPORT_IMAGE_WIDTH - globalPaddingLeft - globalPaddingRight;
				var countEachRow = Math.max(1, Math.ceil(availableWidth / (maxCardWidth + cardMargin)));
				var recordCount = (_a = this.context.getCurrentView()) === null || _a === void 0 ? void 0 : _a.getDisplayedRecordIds().length;
				if (typeof recordCount !== "number") return false;
				var exportImageHeight = Math.ceil(recordCount / countEachRow) * (cardHeight + cardMargin) + globalPaddingTop + globalPaddingBottom;
				this.setRootSize(GALLERY_EXPORT_IMAGE_WIDTH, exportImageHeight);
				this.scrollToY(0);
			}
			return true;
		};
		_proto.scrollCardToVisibility = function scrollCardToVisibility(recordId) {
			var _a;
			var cardInfoRect = (_a = this.collector.card.getCardInfo(recordId)) === null || _a === void 0 ? void 0 : _a.rect;
			if (!cardInfoRect) cardInfoRect = this.collector.card.getCardRectByRecordId(recordId);
			var { scrollTop } = this.collector.range;
			var cardRect = Object.assign(Object.assign({}, cardInfoRect), { y: cardInfoRect.y - scrollTop });
			var { globalRect, globalPaddingTop, globalPaddingBottom } = this.collector.size;
			if (cardRect.y < globalRect.y + globalRect.height && cardRect.y + cardRect.height > globalRect.y) return;
			var cardStartY = cardRect.y;
			if (cardStartY < 0) {
				this.scrollToY(scrollTop + cardStartY - globalPaddingTop);
				return;
			}
			var bottomDelta = cardRect.y + cardRect.height - globalRect.height;
			if (bottomDelta > 0) {
				this.scrollToY(scrollTop + bottomDelta + globalPaddingBottom);
				return;
			}
		};
		_proto.scrollByDelta = function scrollByDelta(scrollInfo) {
			this.rendererModel.scrollByDelta(scrollInfo);
		};
		_proto.getContextMenuActivePoint = function getContextMenuActivePoint() {
			var { collector } = this;
			return { recordId: collector.state.contextMenuRecordId };
		};
		_proto.getGalleryCardIndex = function getGalleryCardIndex(recordId) {
			return this.collector.dataUtil.getDisplayedRecordIds().indexOf(recordId);
		};
		_proto.getCardRect = function getCardRect(recordIndex) {
			return this.collector.card.getCardRect(recordIndex);
		};
		_proto.getOffsetY = function getOffsetY() {
			return this.collector.range.scrollTop;
		};
		_proto.isHiddenRecord = function isHiddenRecord(recordId) {
			return this.collector.dataUtil.getDisplayedRecordIds().indexOf(recordId) === -1;
		};
		_proto.getTarget = function getTarget(evtOffsetX, evtOffsetY) {
			return getTargetByOffset({
				x: evtOffsetX,
				y: evtOffsetY
			}, this.collector);
		};
		/**
		* 截取规则：
		* 1. 由于卡片是自适应，所以宽度全部截取
		* 2. 高度由于可能不满一屏，所以需要按需截取，不能保留空白区域
		* @returns
		*/ _proto.getPreviewTplRect = function getPreviewTplRect() {
			var _a;
			var clientRect = this.getTableDescRect();
			var { size } = this.collector;
			return {
				x: this.globalPaddingLeft / 2,
				y: (_a = clientRect === null || clientRect === void 0 ? void 0 : clientRect.y) !== null && _a !== void 0 ? _a : 0 + this.globalPaddingTop,
				width: size.globalOriginRootWidth - this.globalPaddingLeft,
				height: this.getPreviewTplHeight(clientRect)
			};
		};
		_proto.createRendererModel = function createRendererModel() {
			return new GalleryRendererModel(this.context);
		};
		_proto.createRenderer = function createRenderer() {
			return new GalleryRenderer(this.rendererModel, this.context.getRenderRoot());
		};
		/**
		* 获取模板截取高度
		* 1. 如果卡片全部展示在窗口内，那么就截取到最后一行卡片，不保留空白区域
		* 2. 如果卡片展示不下，那么就截取整个canvas画布的区域
		* @param clientRect
		* @returns
		*/ _proto.getPreviewTplHeight = function getPreviewTplHeight(clientRect) {
			var _a;
			var { range, size } = this.collector;
			var { rowCount } = range;
			var cardHeight = size.cardHeight + size.cardMargin;
			var height = (_a = clientRect === null || clientRect === void 0 ? void 0 : clientRect.height) !== null && _a !== void 0 ? _a : 0;
			var index = Array.from({ length: rowCount }).findIndex((item, i) => cardHeight * (i + 1) > size.globalRect.height);
			if (index < 0) index = rowCount;
			height += cardHeight * (index + 1);
			return Math.min(height, size.globalRect.height + (clientRect ? clientRect.height : 0));
		};
		return GalleryView;
	}(KanbanGalleryView);
}));
//#endregion
export { init_gallery as n, GalleryView as t };
