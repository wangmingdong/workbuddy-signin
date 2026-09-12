import { n as __esmMin } from "./chunk-BRZcfu7K.js";
//#region ../../node_modules/@juggle/resize-observer/lib/utils/resizeObservers.js
var resizeObservers;
var init_resizeObservers = __esmMin((() => {
	resizeObservers = [];
}));
//#endregion
//#region ../../node_modules/@juggle/resize-observer/lib/algorithms/hasActiveObservations.js
var hasActiveObservations;
var init_hasActiveObservations = __esmMin((() => {
	init_resizeObservers();
	hasActiveObservations = function() {
		return resizeObservers.some(function(ro) {
			return ro.activeTargets.length > 0;
		});
	};
}));
//#endregion
//#region ../../node_modules/@juggle/resize-observer/lib/algorithms/hasSkippedObservations.js
var hasSkippedObservations;
var init_hasSkippedObservations = __esmMin((() => {
	init_resizeObservers();
	hasSkippedObservations = function() {
		return resizeObservers.some(function(ro) {
			return ro.skippedTargets.length > 0;
		});
	};
}));
//#endregion
//#region ../../node_modules/@juggle/resize-observer/lib/algorithms/deliverResizeLoopError.js
var msg, deliverResizeLoopError;
var init_deliverResizeLoopError = __esmMin((() => {
	msg = "ResizeObserver loop completed with undelivered notifications.";
	deliverResizeLoopError = function() {
		var event;
		if (typeof ErrorEvent === "function") event = new ErrorEvent("error", { message: msg });
		else {
			event = document.createEvent("Event");
			event.initEvent("error", false, false);
			event.message = msg;
		}
		window.dispatchEvent(event);
	};
}));
//#endregion
//#region ../../node_modules/@juggle/resize-observer/lib/ResizeObserverBoxOptions.js
var ResizeObserverBoxOptions;
var init_ResizeObserverBoxOptions = __esmMin((() => {
	(function(ResizeObserverBoxOptions) {
		ResizeObserverBoxOptions["BORDER_BOX"] = "border-box";
		ResizeObserverBoxOptions["CONTENT_BOX"] = "content-box";
		ResizeObserverBoxOptions["DEVICE_PIXEL_CONTENT_BOX"] = "device-pixel-content-box";
	})(ResizeObserverBoxOptions || (ResizeObserverBoxOptions = {}));
}));
//#endregion
//#region ../../node_modules/@juggle/resize-observer/lib/utils/freeze.js
var freeze;
var init_freeze = __esmMin((() => {
	freeze = function(obj) {
		return Object.freeze(obj);
	};
}));
//#endregion
//#region ../../node_modules/@juggle/resize-observer/lib/ResizeObserverSize.js
var ResizeObserverSize;
var init_ResizeObserverSize = __esmMin((() => {
	init_freeze();
	ResizeObserverSize = function() {
		function ResizeObserverSize(inlineSize, blockSize) {
			this.inlineSize = inlineSize;
			this.blockSize = blockSize;
			freeze(this);
		}
		return ResizeObserverSize;
	}();
}));
//#endregion
//#region ../../node_modules/@juggle/resize-observer/lib/DOMRectReadOnly.js
var DOMRectReadOnly;
var init_DOMRectReadOnly = __esmMin((() => {
	init_freeze();
	DOMRectReadOnly = function() {
		function DOMRectReadOnly(x, y, width, height) {
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
			this.top = this.y;
			this.left = this.x;
			this.bottom = this.top + this.height;
			this.right = this.left + this.width;
			return freeze(this);
		}
		DOMRectReadOnly.prototype.toJSON = function() {
			var _a = this;
			return {
				x: _a.x,
				y: _a.y,
				top: _a.top,
				right: _a.right,
				bottom: _a.bottom,
				left: _a.left,
				width: _a.width,
				height: _a.height
			};
		};
		DOMRectReadOnly.fromRect = function(rectangle) {
			return new DOMRectReadOnly(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
		};
		return DOMRectReadOnly;
	}();
}));
//#endregion
//#region ../../node_modules/@juggle/resize-observer/lib/utils/element.js
var isSVG, isHidden, isElement, isReplacedElement;
var init_element = __esmMin((() => {
	isSVG = function(target) {
		return target instanceof SVGElement && "getBBox" in target;
	};
	isHidden = function(target) {
		if (isSVG(target)) {
			var _a = target.getBBox(), width = _a.width, height = _a.height;
			return !width && !height;
		}
		var _b = target, offsetWidth = _b.offsetWidth, offsetHeight = _b.offsetHeight;
		return !(offsetWidth || offsetHeight || target.getClientRects().length);
	};
	isElement = function(obj) {
		var _a;
		if (obj instanceof Element) return true;
		var scope = (_a = obj === null || obj === void 0 ? void 0 : obj.ownerDocument) === null || _a === void 0 ? void 0 : _a.defaultView;
		return !!(scope && obj instanceof scope.Element);
	};
	isReplacedElement = function(target) {
		switch (target.tagName) {
			case "INPUT": if (target.type !== "image") break;
			case "VIDEO":
			case "AUDIO":
			case "EMBED":
			case "OBJECT":
			case "CANVAS":
			case "IFRAME":
			case "IMG": return true;
		}
		return false;
	};
}));
//#endregion
//#region ../../node_modules/@juggle/resize-observer/lib/utils/global.js
var global;
var init_global = __esmMin((() => {
	global = typeof window !== "undefined" ? window : {};
}));
//#endregion
//#region ../../node_modules/@juggle/resize-observer/lib/algorithms/calculateBoxSize.js
var cache, scrollRegexp, verticalRegexp, IE, parseDimension, size, zeroBoxes, calculateBoxSizes, calculateBoxSize;
var init_calculateBoxSize = __esmMin((() => {
	init_ResizeObserverBoxOptions();
	init_ResizeObserverSize();
	init_DOMRectReadOnly();
	init_element();
	init_freeze();
	init_global();
	cache = /* @__PURE__ */ new WeakMap();
	scrollRegexp = /auto|scroll/;
	verticalRegexp = /^tb|vertical/;
	IE = /msie|trident/i.test(global.navigator && global.navigator.userAgent);
	parseDimension = function(pixel) {
		return parseFloat(pixel || "0");
	};
	size = function(inlineSize, blockSize, switchSizes) {
		if (inlineSize === void 0) inlineSize = 0;
		if (blockSize === void 0) blockSize = 0;
		if (switchSizes === void 0) switchSizes = false;
		return new ResizeObserverSize((switchSizes ? blockSize : inlineSize) || 0, (switchSizes ? inlineSize : blockSize) || 0);
	};
	zeroBoxes = freeze({
		devicePixelContentBoxSize: size(),
		borderBoxSize: size(),
		contentBoxSize: size(),
		contentRect: new DOMRectReadOnly(0, 0, 0, 0)
	});
	calculateBoxSizes = function(target, forceRecalculation) {
		if (forceRecalculation === void 0) forceRecalculation = false;
		if (cache.has(target) && !forceRecalculation) return cache.get(target);
		if (isHidden(target)) {
			cache.set(target, zeroBoxes);
			return zeroBoxes;
		}
		var cs = getComputedStyle(target);
		var svg = isSVG(target) && target.ownerSVGElement && target.getBBox();
		var removePadding = !IE && cs.boxSizing === "border-box";
		var switchSizes = verticalRegexp.test(cs.writingMode || "");
		var canScrollVertically = !svg && scrollRegexp.test(cs.overflowY || "");
		var canScrollHorizontally = !svg && scrollRegexp.test(cs.overflowX || "");
		var paddingTop = svg ? 0 : parseDimension(cs.paddingTop);
		var paddingRight = svg ? 0 : parseDimension(cs.paddingRight);
		var paddingBottom = svg ? 0 : parseDimension(cs.paddingBottom);
		var paddingLeft = svg ? 0 : parseDimension(cs.paddingLeft);
		var borderTop = svg ? 0 : parseDimension(cs.borderTopWidth);
		var borderRight = svg ? 0 : parseDimension(cs.borderRightWidth);
		var borderBottom = svg ? 0 : parseDimension(cs.borderBottomWidth);
		var borderLeft = svg ? 0 : parseDimension(cs.borderLeftWidth);
		var horizontalPadding = paddingLeft + paddingRight;
		var verticalPadding = paddingTop + paddingBottom;
		var horizontalBorderArea = borderLeft + borderRight;
		var verticalBorderArea = borderTop + borderBottom;
		var horizontalScrollbarThickness = !canScrollHorizontally ? 0 : target.offsetHeight - verticalBorderArea - target.clientHeight;
		var verticalScrollbarThickness = !canScrollVertically ? 0 : target.offsetWidth - horizontalBorderArea - target.clientWidth;
		var widthReduction = removePadding ? horizontalPadding + horizontalBorderArea : 0;
		var heightReduction = removePadding ? verticalPadding + verticalBorderArea : 0;
		var contentWidth = svg ? svg.width : parseDimension(cs.width) - widthReduction - verticalScrollbarThickness;
		var contentHeight = svg ? svg.height : parseDimension(cs.height) - heightReduction - horizontalScrollbarThickness;
		var borderBoxWidth = contentWidth + horizontalPadding + verticalScrollbarThickness + horizontalBorderArea;
		var borderBoxHeight = contentHeight + verticalPadding + horizontalScrollbarThickness + verticalBorderArea;
		var boxes = freeze({
			devicePixelContentBoxSize: size(Math.round(contentWidth * devicePixelRatio), Math.round(contentHeight * devicePixelRatio), switchSizes),
			borderBoxSize: size(borderBoxWidth, borderBoxHeight, switchSizes),
			contentBoxSize: size(contentWidth, contentHeight, switchSizes),
			contentRect: new DOMRectReadOnly(paddingLeft, paddingTop, contentWidth, contentHeight)
		});
		cache.set(target, boxes);
		return boxes;
	};
	calculateBoxSize = function(target, observedBox, forceRecalculation) {
		var _a = calculateBoxSizes(target, forceRecalculation), borderBoxSize = _a.borderBoxSize, contentBoxSize = _a.contentBoxSize, devicePixelContentBoxSize = _a.devicePixelContentBoxSize;
		switch (observedBox) {
			case ResizeObserverBoxOptions.DEVICE_PIXEL_CONTENT_BOX: return devicePixelContentBoxSize;
			case ResizeObserverBoxOptions.BORDER_BOX: return borderBoxSize;
			default: return contentBoxSize;
		}
	};
}));
//#endregion
//#region ../../node_modules/@juggle/resize-observer/lib/ResizeObserverEntry.js
var ResizeObserverEntry;
var init_ResizeObserverEntry = __esmMin((() => {
	init_calculateBoxSize();
	init_freeze();
	ResizeObserverEntry = function() {
		function ResizeObserverEntry(target) {
			var boxes = calculateBoxSizes(target);
			this.target = target;
			this.contentRect = boxes.contentRect;
			this.borderBoxSize = freeze([boxes.borderBoxSize]);
			this.contentBoxSize = freeze([boxes.contentBoxSize]);
			this.devicePixelContentBoxSize = freeze([boxes.devicePixelContentBoxSize]);
		}
		return ResizeObserverEntry;
	}();
}));
//#endregion
//#region ../../node_modules/@juggle/resize-observer/lib/algorithms/calculateDepthForNode.js
var calculateDepthForNode;
var init_calculateDepthForNode = __esmMin((() => {
	init_element();
	calculateDepthForNode = function(node) {
		if (isHidden(node)) return Infinity;
		var depth = 0;
		var parent = node.parentNode;
		while (parent) {
			depth += 1;
			parent = parent.parentNode;
		}
		return depth;
	};
}));
//#endregion
//#region ../../node_modules/@juggle/resize-observer/lib/algorithms/broadcastActiveObservations.js
var broadcastActiveObservations;
var init_broadcastActiveObservations = __esmMin((() => {
	init_resizeObservers();
	init_ResizeObserverEntry();
	init_calculateDepthForNode();
	init_calculateBoxSize();
	broadcastActiveObservations = function() {
		var shallowestDepth = Infinity;
		var callbacks = [];
		resizeObservers.forEach(function processObserver(ro) {
			if (ro.activeTargets.length === 0) return;
			var entries = [];
			ro.activeTargets.forEach(function processTarget(ot) {
				var entry = new ResizeObserverEntry(ot.target);
				var targetDepth = calculateDepthForNode(ot.target);
				entries.push(entry);
				ot.lastReportedSize = calculateBoxSize(ot.target, ot.observedBox);
				if (targetDepth < shallowestDepth) shallowestDepth = targetDepth;
			});
			callbacks.push(function resizeObserverCallback() {
				ro.callback.call(ro.observer, entries, ro.observer);
			});
			ro.activeTargets.splice(0, ro.activeTargets.length);
		});
		for (var _i = 0, callbacks_1 = callbacks; _i < callbacks_1.length; _i++) {
			var callback = callbacks_1[_i];
			callback();
		}
		return shallowestDepth;
	};
}));
//#endregion
//#region ../../node_modules/@juggle/resize-observer/lib/algorithms/gatherActiveObservationsAtDepth.js
var gatherActiveObservationsAtDepth;
var init_gatherActiveObservationsAtDepth = __esmMin((() => {
	init_resizeObservers();
	init_calculateDepthForNode();
	gatherActiveObservationsAtDepth = function(depth) {
		resizeObservers.forEach(function processObserver(ro) {
			ro.activeTargets.splice(0, ro.activeTargets.length);
			ro.skippedTargets.splice(0, ro.skippedTargets.length);
			ro.observationTargets.forEach(function processTarget(ot) {
				if (ot.isActive()) if (calculateDepthForNode(ot.target) > depth) ro.activeTargets.push(ot);
				else ro.skippedTargets.push(ot);
			});
		});
	};
}));
//#endregion
//#region ../../node_modules/@juggle/resize-observer/lib/utils/process.js
var process;
var init_process = __esmMin((() => {
	init_hasActiveObservations();
	init_hasSkippedObservations();
	init_deliverResizeLoopError();
	init_broadcastActiveObservations();
	init_gatherActiveObservationsAtDepth();
	process = function() {
		var depth = 0;
		gatherActiveObservationsAtDepth(depth);
		while (hasActiveObservations()) {
			depth = broadcastActiveObservations();
			gatherActiveObservationsAtDepth(depth);
		}
		if (hasSkippedObservations()) deliverResizeLoopError();
		return depth > 0;
	};
}));
//#endregion
//#region ../../node_modules/@juggle/resize-observer/lib/utils/queueMicroTask.js
var trigger, callbacks, notify, queueMicroTask;
var init_queueMicroTask = __esmMin((() => {
	callbacks = [];
	notify = function() {
		return callbacks.splice(0).forEach(function(cb) {
			return cb();
		});
	};
	queueMicroTask = function(callback) {
		if (!trigger) {
			var toggle_1 = 0;
			var el_1 = document.createTextNode("");
			new MutationObserver(function() {
				return notify();
			}).observe(el_1, { characterData: true });
			trigger = function() {
				el_1.textContent = "".concat(toggle_1 ? toggle_1-- : toggle_1++);
			};
		}
		callbacks.push(callback);
		trigger();
	};
}));
//#endregion
//#region ../../node_modules/@juggle/resize-observer/lib/utils/queueResizeObserver.js
var queueResizeObserver;
var init_queueResizeObserver = __esmMin((() => {
	init_queueMicroTask();
	queueResizeObserver = function(cb) {
		queueMicroTask(function ResizeObserver() {
			requestAnimationFrame(cb);
		});
	};
}));
//#endregion
//#region ../../node_modules/@juggle/resize-observer/lib/utils/scheduler.js
var watching, isWatching, CATCH_PERIOD, observerConfig, events, time, scheduled, scheduler, updateCount;
var init_scheduler = __esmMin((() => {
	init_process();
	init_global();
	init_queueResizeObserver();
	watching = 0;
	isWatching = function() {
		return !!watching;
	};
	CATCH_PERIOD = 250;
	observerConfig = {
		attributes: true,
		characterData: true,
		childList: true,
		subtree: true
	};
	events = [
		"resize",
		"load",
		"transitionend",
		"animationend",
		"animationstart",
		"animationiteration",
		"keyup",
		"keydown",
		"mouseup",
		"mousedown",
		"mouseover",
		"mouseout",
		"blur",
		"focus"
	];
	time = function(timeout) {
		if (timeout === void 0) timeout = 0;
		return Date.now() + timeout;
	};
	scheduled = false;
	scheduler = new (function() {
		function Scheduler() {
			var _this = this;
			this.stopped = true;
			this.listener = function() {
				return _this.schedule();
			};
		}
		Scheduler.prototype.run = function(timeout) {
			var _this = this;
			if (timeout === void 0) timeout = CATCH_PERIOD;
			if (scheduled) return;
			scheduled = true;
			var until = time(timeout);
			queueResizeObserver(function() {
				var elementsHaveResized = false;
				try {
					elementsHaveResized = process();
				} finally {
					scheduled = false;
					timeout = until - time();
					if (!isWatching()) return;
					if (elementsHaveResized) _this.run(1e3);
					else if (timeout > 0) _this.run(timeout);
					else _this.start();
				}
			});
		};
		Scheduler.prototype.schedule = function() {
			this.stop();
			this.run();
		};
		Scheduler.prototype.observe = function() {
			var _this = this;
			var cb = function() {
				return _this.observer && _this.observer.observe(document.body, observerConfig);
			};
			document.body ? cb() : global.addEventListener("DOMContentLoaded", cb);
		};
		Scheduler.prototype.start = function() {
			var _this = this;
			if (this.stopped) {
				this.stopped = false;
				this.observer = new MutationObserver(this.listener);
				this.observe();
				events.forEach(function(name) {
					return global.addEventListener(name, _this.listener, true);
				});
			}
		};
		Scheduler.prototype.stop = function() {
			var _this = this;
			if (!this.stopped) {
				this.observer && this.observer.disconnect();
				events.forEach(function(name) {
					return global.removeEventListener(name, _this.listener, true);
				});
				this.stopped = true;
			}
		};
		return Scheduler;
	}())();
	updateCount = function(n) {
		!watching && n > 0 && scheduler.start();
		watching += n;
		!watching && scheduler.stop();
	};
}));
//#endregion
//#region ../../node_modules/@juggle/resize-observer/lib/ResizeObservation.js
var skipNotifyOnElement, ResizeObservation;
var init_ResizeObservation = __esmMin((() => {
	init_ResizeObserverBoxOptions();
	init_calculateBoxSize();
	init_element();
	skipNotifyOnElement = function(target) {
		return !isSVG(target) && !isReplacedElement(target) && getComputedStyle(target).display === "inline";
	};
	ResizeObservation = function() {
		function ResizeObservation(target, observedBox) {
			this.target = target;
			this.observedBox = observedBox || ResizeObserverBoxOptions.CONTENT_BOX;
			this.lastReportedSize = {
				inlineSize: 0,
				blockSize: 0
			};
		}
		ResizeObservation.prototype.isActive = function() {
			var size = calculateBoxSize(this.target, this.observedBox, true);
			if (skipNotifyOnElement(this.target)) this.lastReportedSize = size;
			if (this.lastReportedSize.inlineSize !== size.inlineSize || this.lastReportedSize.blockSize !== size.blockSize) return true;
			return false;
		};
		return ResizeObservation;
	}();
}));
//#endregion
//#region ../../node_modules/@juggle/resize-observer/lib/ResizeObserverDetail.js
var ResizeObserverDetail;
var init_ResizeObserverDetail = __esmMin((() => {
	ResizeObserverDetail = function() {
		function ResizeObserverDetail(resizeObserver, callback) {
			this.activeTargets = [];
			this.skippedTargets = [];
			this.observationTargets = [];
			this.observer = resizeObserver;
			this.callback = callback;
		}
		return ResizeObserverDetail;
	}();
}));
//#endregion
//#region ../../node_modules/@juggle/resize-observer/lib/ResizeObserverController.js
var observerMap, getObservationIndex, ResizeObserverController;
var init_ResizeObserverController = __esmMin((() => {
	init_scheduler();
	init_ResizeObservation();
	init_ResizeObserverDetail();
	init_resizeObservers();
	observerMap = /* @__PURE__ */ new WeakMap();
	getObservationIndex = function(observationTargets, target) {
		for (var i = 0; i < observationTargets.length; i += 1) if (observationTargets[i].target === target) return i;
		return -1;
	};
	ResizeObserverController = function() {
		function ResizeObserverController() {}
		ResizeObserverController.connect = function(resizeObserver, callback) {
			var detail = new ResizeObserverDetail(resizeObserver, callback);
			observerMap.set(resizeObserver, detail);
		};
		ResizeObserverController.observe = function(resizeObserver, target, options) {
			var detail = observerMap.get(resizeObserver);
			var firstObservation = detail.observationTargets.length === 0;
			if (getObservationIndex(detail.observationTargets, target) < 0) {
				firstObservation && resizeObservers.push(detail);
				detail.observationTargets.push(new ResizeObservation(target, options && options.box));
				updateCount(1);
				scheduler.schedule();
			}
		};
		ResizeObserverController.unobserve = function(resizeObserver, target) {
			var detail = observerMap.get(resizeObserver);
			var index = getObservationIndex(detail.observationTargets, target);
			var lastObservation = detail.observationTargets.length === 1;
			if (index >= 0) {
				lastObservation && resizeObservers.splice(resizeObservers.indexOf(detail), 1);
				detail.observationTargets.splice(index, 1);
				updateCount(-1);
			}
		};
		ResizeObserverController.disconnect = function(resizeObserver) {
			var _this = this;
			var detail = observerMap.get(resizeObserver);
			detail.observationTargets.slice().forEach(function(ot) {
				return _this.unobserve(resizeObserver, ot.target);
			});
			detail.activeTargets.splice(0, detail.activeTargets.length);
		};
		return ResizeObserverController;
	}();
}));
//#endregion
//#region ../../node_modules/@juggle/resize-observer/lib/ResizeObserver.js
var ResizeObserver;
var init_ResizeObserver = __esmMin((() => {
	init_ResizeObserverController();
	init_element();
	ResizeObserver = function() {
		function ResizeObserver(callback) {
			if (arguments.length === 0) throw new TypeError("Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.");
			if (typeof callback !== "function") throw new TypeError("Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.");
			ResizeObserverController.connect(this, callback);
		}
		ResizeObserver.prototype.observe = function(target, options) {
			if (arguments.length === 0) throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.");
			if (!isElement(target)) throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element");
			ResizeObserverController.observe(this, target, options);
		};
		ResizeObserver.prototype.unobserve = function(target) {
			if (arguments.length === 0) throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.");
			if (!isElement(target)) throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element");
			ResizeObserverController.unobserve(this, target);
		};
		ResizeObserver.prototype.disconnect = function() {
			ResizeObserverController.disconnect(this);
		};
		ResizeObserver.toString = function() {
			return "function ResizeObserver () { [polyfill code] }";
		};
		return ResizeObserver;
	}();
}));
//#endregion
//#region ../../node_modules/@juggle/resize-observer/lib/exports/resize-observer.js
var init_resize_observer = __esmMin((() => {
	init_ResizeObserver();
	init_ResizeObserverEntry();
	init_ResizeObserverSize();
}));
//#endregion
export { ResizeObserver as n, init_resize_observer as t };
