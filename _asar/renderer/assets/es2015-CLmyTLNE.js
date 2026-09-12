import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { l as __rest, p as init_tslib_es6, t as __assign } from "./tslib.es6-8NkKEYUK.js";
//#region ../../node_modules/react-remove-scroll-bar/dist/es2015/constants.js
var zeroRightClassName, fullWidthClassName, noScrollbarsClassName, removedBarSizeVariable;
var init_constants = __esmMin((() => {
	zeroRightClassName = "right-scroll-bar-position";
	fullWidthClassName = "width-before-scroll-bar";
	noScrollbarsClassName = "with-scroll-bars-hidden";
	removedBarSizeVariable = "--removed-body-scroll-bar-size";
}));
//#endregion
//#region ../../node_modules/use-callback-ref/dist/es2015/assignRef.js
/**
* Assigns a value for a given ref, no matter of the ref format
* @param {RefObject} ref - a callback function or ref object
* @param value - a new value
*
* @see https://github.com/theKashey/use-callback-ref#assignref
* @example
* const refObject = useRef();
* const refFn = (ref) => {....}
*
* assignRef(refObject, "refValue");
* assignRef(refFn, "refValue");
*/
function assignRef(ref, value) {
	if (typeof ref === "function") ref(value);
	else if (ref) ref.current = value;
	return ref;
}
var init_assignRef = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/use-callback-ref/dist/es2015/useRef.js
/**
* creates a MutableRef with ref change callback
* @param initialValue - initial ref value
* @param {Function} callback - a callback to run when value changes
*
* @example
* const ref = useCallbackRef(0, (newValue, oldValue) => console.log(oldValue, '->', newValue);
* ref.current = 1;
* // prints 0 -> 1
*
* @see https://reactjs.org/docs/hooks-reference.html#useref
* @see https://github.com/theKashey/use-callback-ref#usecallbackref---to-replace-reactuseref
* @returns {MutableRefObject}
*/
function useCallbackRef(initialValue, callback) {
	var ref = (0, import_react$4.useState)(function() {
		return {
			value: initialValue,
			callback,
			facade: {
				get current() {
					return ref.value;
				},
				set current(value) {
					var last = ref.value;
					if (last !== value) {
						ref.value = value;
						ref.callback(value, last);
					}
				}
			}
		};
	})[0];
	ref.callback = callback;
	return ref.facade;
}
var import_react$4;
var init_useRef = __esmMin((() => {
	import_react$4 = /* @__PURE__ */ __toESM(require_react());
}));
//#endregion
//#region ../../node_modules/use-callback-ref/dist/es2015/useMergeRef.js
/**
* Merges two or more refs together providing a single interface to set their value
* @param {RefObject|Ref} refs
* @returns {MutableRefObject} - a new ref, which translates all changes to {refs}
*
* @see {@link mergeRefs} a version without buit-in memoization
* @see https://github.com/theKashey/use-callback-ref#usemergerefs
* @example
* const Component = React.forwardRef((props, ref) => {
*   const ownRef = useRef();
*   const domRef = useMergeRefs([ref, ownRef]); // 👈 merge together
*   return <div ref={domRef}>...</div>
* }
*/
function useMergeRefs(refs, defaultValue) {
	var callbackRef = useCallbackRef(defaultValue || null, function(newValue) {
		return refs.forEach(function(ref) {
			return assignRef(ref, newValue);
		});
	});
	useIsomorphicLayoutEffect(function() {
		var oldValue = currentValues.get(callbackRef);
		if (oldValue) {
			var prevRefs_1 = new Set(oldValue);
			var nextRefs_1 = new Set(refs);
			var current_1 = callbackRef.current;
			prevRefs_1.forEach(function(ref) {
				if (!nextRefs_1.has(ref)) assignRef(ref, null);
			});
			nextRefs_1.forEach(function(ref) {
				if (!prevRefs_1.has(ref)) assignRef(ref, current_1);
			});
		}
		currentValues.set(callbackRef, refs);
	}, [refs]);
	return callbackRef;
}
var import_react$3, useIsomorphicLayoutEffect, currentValues;
var init_useMergeRef = __esmMin((() => {
	import_react$3 = /* @__PURE__ */ __toESM(require_react());
	init_assignRef();
	init_useRef();
	useIsomorphicLayoutEffect = typeof window !== "undefined" ? import_react$3.useLayoutEffect : import_react$3.useEffect;
	currentValues = /* @__PURE__ */ new WeakMap();
}));
//#endregion
//#region ../../node_modules/use-callback-ref/dist/es2015/index.js
var init_es2015$5 = __esmMin((() => {
	init_assignRef();
	init_useRef();
	init_useMergeRef();
}));
//#endregion
//#region ../../node_modules/use-sidecar/dist/es2015/medium.js
function ItoI(a) {
	return a;
}
function innerCreateMedium(defaults, middleware) {
	if (middleware === void 0) middleware = ItoI;
	var buffer = [];
	var assigned = false;
	return {
		read: function() {
			if (assigned) throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
			if (buffer.length) return buffer[buffer.length - 1];
			return defaults;
		},
		useMedium: function(data) {
			var item = middleware(data, assigned);
			buffer.push(item);
			return function() {
				buffer = buffer.filter(function(x) {
					return x !== item;
				});
			};
		},
		assignSyncMedium: function(cb) {
			assigned = true;
			while (buffer.length) {
				var cbs = buffer;
				buffer = [];
				cbs.forEach(cb);
			}
			buffer = {
				push: function(x) {
					return cb(x);
				},
				filter: function() {
					return buffer;
				}
			};
		},
		assignMedium: function(cb) {
			assigned = true;
			var pendingQueue = [];
			if (buffer.length) {
				var cbs = buffer;
				buffer = [];
				cbs.forEach(cb);
				pendingQueue = buffer;
			}
			var executeQueue = function() {
				var cbs = pendingQueue;
				pendingQueue = [];
				cbs.forEach(cb);
			};
			var cycle = function() {
				return Promise.resolve().then(executeQueue);
			};
			cycle();
			buffer = {
				push: function(x) {
					pendingQueue.push(x);
					cycle();
				},
				filter: function(filter) {
					pendingQueue = pendingQueue.filter(filter);
					return buffer;
				}
			};
		}
	};
}
function createSidecarMedium(options) {
	if (options === void 0) options = {};
	var medium = innerCreateMedium(null);
	medium.options = __assign({
		async: true,
		ssr: false
	}, options);
	return medium;
}
var init_medium = __esmMin((() => {
	init_tslib_es6();
}));
//#endregion
//#region ../../node_modules/use-sidecar/dist/es2015/exports.js
function exportSidecar(medium, exported) {
	medium.useMedium(exported);
	return SideCar;
}
var import_react$2, SideCar;
var init_exports = __esmMin((() => {
	init_tslib_es6();
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
	SideCar = function(_a) {
		var sideCar = _a.sideCar, rest = __rest(_a, ["sideCar"]);
		if (!sideCar) throw new Error("Sidecar: please provide `sideCar` property to import the right car");
		var Target = sideCar.read();
		if (!Target) throw new Error("Sidecar medium not found");
		return import_react$2.createElement(Target, __assign({}, rest));
	};
	SideCar.isSideCarExport = true;
}));
//#endregion
//#region ../../node_modules/use-sidecar/dist/es2015/index.js
var init_es2015$4 = __esmMin((() => {
	init_medium();
	init_exports();
}));
//#endregion
//#region ../../node_modules/get-nonce/dist/es2015/index.js
var currentNonce, getNonce;
var init_es2015$3 = __esmMin((() => {
	getNonce = function() {
		if (currentNonce) return currentNonce;
		if (typeof __webpack_nonce__ !== "undefined") return __webpack_nonce__;
	};
}));
//#endregion
//#region ../../node_modules/react-style-singleton/dist/es2015/singleton.js
function makeStyleTag() {
	if (!document) return null;
	var tag = document.createElement("style");
	tag.type = "text/css";
	var nonce = getNonce();
	if (nonce) tag.setAttribute("nonce", nonce);
	return tag;
}
function injectStyles(tag, css) {
	if (tag.styleSheet) tag.styleSheet.cssText = css;
	else tag.appendChild(document.createTextNode(css));
}
function insertStyleTag(tag) {
	(document.head || document.getElementsByTagName("head")[0]).appendChild(tag);
}
var stylesheetSingleton;
var init_singleton = __esmMin((() => {
	init_es2015$3();
	stylesheetSingleton = function() {
		var counter = 0;
		var stylesheet = null;
		return {
			add: function(style) {
				if (counter == 0) {
					if (stylesheet = makeStyleTag()) {
						injectStyles(stylesheet, style);
						insertStyleTag(stylesheet);
					}
				}
				counter++;
			},
			remove: function() {
				counter--;
				if (!counter && stylesheet) {
					stylesheet.parentNode && stylesheet.parentNode.removeChild(stylesheet);
					stylesheet = null;
				}
			}
		};
	};
}));
//#endregion
//#region ../../node_modules/react-style-singleton/dist/es2015/hook.js
var import_react$1, styleHookSingleton;
var init_hook = __esmMin((() => {
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_singleton();
	styleHookSingleton = function() {
		var sheet = stylesheetSingleton();
		return function(styles, isDynamic) {
			import_react$1.useEffect(function() {
				sheet.add(styles);
				return function() {
					sheet.remove();
				};
			}, [styles && isDynamic]);
		};
	};
}));
//#endregion
//#region ../../node_modules/react-style-singleton/dist/es2015/component.js
var styleSingleton;
var init_component$1 = __esmMin((() => {
	init_hook();
	styleSingleton = function() {
		var useStyle = styleHookSingleton();
		var Sheet = function(_a) {
			var styles = _a.styles, dynamic = _a.dynamic;
			useStyle(styles, dynamic);
			return null;
		};
		return Sheet;
	};
}));
//#endregion
//#region ../../node_modules/react-style-singleton/dist/es2015/index.js
var init_es2015$2 = __esmMin((() => {
	init_component$1();
	init_singleton();
	init_hook();
}));
//#endregion
//#region ../../node_modules/react-remove-scroll-bar/dist/es2015/utils.js
var zeroGap, parse, getOffset, getGapWidth;
var init_utils = __esmMin((() => {
	zeroGap = {
		left: 0,
		top: 0,
		right: 0,
		gap: 0
	};
	parse = function(x) {
		return parseInt(x || "", 10) || 0;
	};
	getOffset = function(gapMode) {
		var cs = window.getComputedStyle(document.body);
		var left = cs[gapMode === "padding" ? "paddingLeft" : "marginLeft"];
		var top = cs[gapMode === "padding" ? "paddingTop" : "marginTop"];
		var right = cs[gapMode === "padding" ? "paddingRight" : "marginRight"];
		return [
			parse(left),
			parse(top),
			parse(right)
		];
	};
	getGapWidth = function(gapMode) {
		if (gapMode === void 0) gapMode = "margin";
		if (typeof window === "undefined") return zeroGap;
		var offsets = getOffset(gapMode);
		var documentWidth = document.documentElement.clientWidth;
		var windowWidth = window.innerWidth;
		return {
			left: offsets[0],
			top: offsets[1],
			right: offsets[2],
			gap: Math.max(0, windowWidth - documentWidth + offsets[2] - offsets[0])
		};
	};
}));
//#endregion
//#region ../../node_modules/react-remove-scroll-bar/dist/es2015/component.js
var import_react, Style, lockAttribute, getStyles, getCurrentUseCounter, useLockAttribute, RemoveScrollBar;
var init_component = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_es2015$2();
	init_constants();
	init_utils();
	Style = styleSingleton();
	lockAttribute = "data-scroll-locked";
	getStyles = function(_a, allowRelative, gapMode, important) {
		var left = _a.left, top = _a.top, right = _a.right, gap = _a.gap;
		if (gapMode === void 0) gapMode = "margin";
		return "\n  .".concat(noScrollbarsClassName, " {\n   overflow: hidden ").concat(important, ";\n   padding-right: ").concat(gap, "px ").concat(important, ";\n  }\n  body[").concat(lockAttribute, "] {\n    overflow: hidden ").concat(important, ";\n    overscroll-behavior: contain;\n    ").concat([
			allowRelative && "position: relative ".concat(important, ";"),
			gapMode === "margin" && "\n    padding-left: ".concat(left, "px;\n    padding-top: ").concat(top, "px;\n    padding-right: ").concat(right, "px;\n    margin-left:0;\n    margin-top:0;\n    margin-right: ").concat(gap, "px ").concat(important, ";\n    "),
			gapMode === "padding" && "padding-right: ".concat(gap, "px ").concat(important, ";")
		].filter(Boolean).join(""), "\n  }\n  \n  .").concat(zeroRightClassName, " {\n    right: ").concat(gap, "px ").concat(important, ";\n  }\n  \n  .").concat(fullWidthClassName, " {\n    margin-right: ").concat(gap, "px ").concat(important, ";\n  }\n  \n  .").concat(zeroRightClassName, " .").concat(zeroRightClassName, " {\n    right: 0 ").concat(important, ";\n  }\n  \n  .").concat(fullWidthClassName, " .").concat(fullWidthClassName, " {\n    margin-right: 0 ").concat(important, ";\n  }\n  \n  body[").concat(lockAttribute, "] {\n    ").concat(removedBarSizeVariable, ": ").concat(gap, "px;\n  }\n");
	};
	getCurrentUseCounter = function() {
		var counter = parseInt(document.body.getAttribute("data-scroll-locked") || "0", 10);
		return isFinite(counter) ? counter : 0;
	};
	useLockAttribute = function() {
		import_react.useEffect(function() {
			document.body.setAttribute(lockAttribute, (getCurrentUseCounter() + 1).toString());
			return function() {
				var newCounter = getCurrentUseCounter() - 1;
				if (newCounter <= 0) document.body.removeAttribute(lockAttribute);
				else document.body.setAttribute(lockAttribute, newCounter.toString());
			};
		}, []);
	};
	RemoveScrollBar = function(_a) {
		var noRelative = _a.noRelative, noImportant = _a.noImportant, _b = _a.gapMode, gapMode = _b === void 0 ? "margin" : _b;
		useLockAttribute();
		var gap = import_react.useMemo(function() {
			return getGapWidth(gapMode);
		}, [gapMode]);
		return import_react.createElement(Style, { styles: getStyles(gap, !noRelative, gapMode, !noImportant ? "!important" : "") });
	};
}));
//#endregion
//#region ../../node_modules/react-remove-scroll-bar/dist/es2015/index.js
var init_es2015$1 = __esmMin((() => {
	init_component();
}));
//#endregion
//#region ../../node_modules/aria-hidden/dist/es2015/index.js
var getDefaultParent, counterMap, uncontrolledNodes, markerMap, lockCount, unwrapHost, correctTargets, applyAttributeToOthers, hideOthers;
var init_es2015 = __esmMin((() => {
	getDefaultParent = function(originalTarget) {
		if (typeof document === "undefined") return null;
		return (Array.isArray(originalTarget) ? originalTarget[0] : originalTarget).ownerDocument.body;
	};
	counterMap = /* @__PURE__ */ new WeakMap();
	uncontrolledNodes = /* @__PURE__ */ new WeakMap();
	markerMap = {};
	lockCount = 0;
	unwrapHost = function(node) {
		return node && (node.host || unwrapHost(node.parentNode));
	};
	correctTargets = function(parent, targets) {
		return targets.map(function(target) {
			if (parent.contains(target)) return target;
			var correctedTarget = unwrapHost(target);
			if (correctedTarget && parent.contains(correctedTarget)) return correctedTarget;
			console.error("aria-hidden", target, "in not contained inside", parent, ". Doing nothing");
			return null;
		}).filter(function(x) {
			return Boolean(x);
		});
	};
	applyAttributeToOthers = function(originalTarget, parentNode, markerName, controlAttribute) {
		var targets = correctTargets(parentNode, Array.isArray(originalTarget) ? originalTarget : [originalTarget]);
		if (!markerMap[markerName]) markerMap[markerName] = /* @__PURE__ */ new WeakMap();
		var markerCounter = markerMap[markerName];
		var hiddenNodes = [];
		var elementsToKeep = /* @__PURE__ */ new Set();
		var elementsToStop = new Set(targets);
		var keep = function(el) {
			if (!el || elementsToKeep.has(el)) return;
			elementsToKeep.add(el);
			keep(el.parentNode);
		};
		targets.forEach(keep);
		var deep = function(parent) {
			if (!parent || elementsToStop.has(parent)) return;
			Array.prototype.forEach.call(parent.children, function(node) {
				if (elementsToKeep.has(node)) deep(node);
				else try {
					var attr = node.getAttribute(controlAttribute);
					var alreadyHidden = attr !== null && attr !== "false";
					var counterValue = (counterMap.get(node) || 0) + 1;
					var markerValue = (markerCounter.get(node) || 0) + 1;
					counterMap.set(node, counterValue);
					markerCounter.set(node, markerValue);
					hiddenNodes.push(node);
					if (counterValue === 1 && alreadyHidden) uncontrolledNodes.set(node, true);
					if (markerValue === 1) node.setAttribute(markerName, "true");
					if (!alreadyHidden) node.setAttribute(controlAttribute, "true");
				} catch (e) {
					console.error("aria-hidden: cannot operate on ", node, e);
				}
			});
		};
		deep(parentNode);
		elementsToKeep.clear();
		lockCount++;
		return function() {
			hiddenNodes.forEach(function(node) {
				var counterValue = counterMap.get(node) - 1;
				var markerValue = markerCounter.get(node) - 1;
				counterMap.set(node, counterValue);
				markerCounter.set(node, markerValue);
				if (!counterValue) {
					if (!uncontrolledNodes.has(node)) node.removeAttribute(controlAttribute);
					uncontrolledNodes.delete(node);
				}
				if (!markerValue) node.removeAttribute(markerName);
			});
			lockCount--;
			if (!lockCount) {
				counterMap = /* @__PURE__ */ new WeakMap();
				counterMap = /* @__PURE__ */ new WeakMap();
				uncontrolledNodes = /* @__PURE__ */ new WeakMap();
				markerMap = {};
			}
		};
	};
	hideOthers = function(originalTarget, parentNode, markerName) {
		if (markerName === void 0) markerName = "data-aria-hidden";
		var targets = Array.from(Array.isArray(originalTarget) ? originalTarget : [originalTarget]);
		var activeParentNode = parentNode || getDefaultParent(originalTarget);
		if (!activeParentNode) return function() {
			return null;
		};
		targets.push.apply(targets, Array.from(activeParentNode.querySelectorAll("[aria-live]")));
		return applyAttributeToOthers(targets, activeParentNode, markerName, "aria-hidden");
	};
}));
//#endregion
export { init_es2015$2 as a, exportSidecar as c, useMergeRefs as d, fullWidthClassName as f, RemoveScrollBar as i, createSidecarMedium as l, zeroRightClassName as m, init_es2015 as n, styleSingleton as o, init_constants as p, init_es2015$1 as r, init_es2015$4 as s, hideOthers as t, init_es2015$5 as u };
