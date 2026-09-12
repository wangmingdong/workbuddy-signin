import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { t as require_react_dom } from "./react-dom-IYSM6kDg.js";
import { $ as Root3, B as Item2, F as Root2$1, G as Sub2, H as Portal2, I as Trigger$3, J as Trigger$2, K as SubContent2, L as init_dist$19, N as Content$1, P as List, Q as Provider, R as Content2$1, U as Root2, V as Label2, W as Separator2, X as Content2, Y as init_dist$18, Z as Portal$2, et as Trigger$1, q as SubTrigger2, tt as init_dist$17, z as Group2 } from "./dist-BfO6AyhP.js";
import { n as init_clsx, t as clsx } from "./clsx-kwfm3TVm.js";
import { l as __rest, p as init_tslib_es6, t as __assign, u as __spreadArray } from "./tslib.es6-8NkKEYUK.js";
import { a as init_es2015$4, c as exportSidecar, d as useMergeRefs, f as fullWidthClassName, i as RemoveScrollBar, l as createSidecarMedium, m as zeroRightClassName, n as init_es2015$5, o as styleSingleton, p as init_constants, r as init_es2015$3, s as init_es2015$1, t as hideOthers, u as init_es2015$2 } from "./es2015-CLmyTLNE.js";
//#region ../../node_modules/@tencent/smart-doc-plugin-equation/dist/events.mjs
function t$6(t, n) {
	return t.onPlugin(e$2, n);
}
function n$1(t, n) {
	t.emitPlugin(e$2, n);
}
var e$2;
var init_events = __esmMin((() => {
	e$2 = `equation:openModal`;
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-ui/dist/_virtual/_rolldown/runtime.mjs
var e$1, t$5;
var init_runtime = __esmMin((() => {
	e$1 = Object.defineProperty, t$5 = (t, n) => {
		let r = {};
		for (var i in t) e$1(r, i, {
			get: t[i],
			enumerable: !0
		});
		return n || e$1(r, Symbol.toStringTag, { value: `Module` }), r;
	};
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-ui/dist/tooltip/tooltip.less
var init_tooltip$2 = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-ui/dist/tooltip/tooltip.mjs
var import_react$25, r$4, i$3, a$6, o$4;
var init_tooltip$1 = __esmMin((() => {
	init_clsx();
	import_react$25 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_tooltip$2();
	init_dist$17();
	r$4 = Provider, i$3 = Root3, a$6 = Trigger$1, o$4 = import_react$25.forwardRef(({ className: r, sideOffset: i = 6, ...a }, o) => import_react$25.createElement(Portal$2, null, import_react$25.createElement(Content2, {
		ref: o,
		className: clsx(`sc-tooltip-content`, r),
		sideOffset: i,
		...a
	})));
	o$4.displayName = `Tooltip.Content`;
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-ui/dist/tooltip/index.mjs
var a$5;
var init_tooltip = __esmMin((() => {
	init_runtime();
	init_tooltip$1();
	a$5 = t$5({
		Content: () => o$4,
		Provider: () => r$4,
		Root: () => i$3,
		Trigger: () => a$6
	});
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-ui/dist/button/button.less
var init_button$1 = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-ui/dist/button/button.mjs
function s$2() {
	return import_react$24.createElement(`svg`, {
		className: `sc-icon-btn-chevron`,
		width: `12`,
		height: `12`,
		viewBox: `0 0 12 12`,
		"aria-hidden": `true`
	}, import_react$24.createElement(`path`, {
		d: `M3 4.5L6 7.5L9 4.5`,
		fill: `none`,
		stroke: `currentColor`,
		strokeWidth: `1.5`,
		strokeLinecap: `round`,
		strokeLinejoin: `round`
	}));
}
var import_react$24, o$3, c$2;
var init_button = __esmMin((() => {
	init_tooltip$1();
	init_button$1();
	init_clsx();
	import_react$24 = /* @__PURE__ */ __toESM(require_react(), 1);
	o$3 = import_react$24.forwardRef(({ variant: e = `ghost`, size: t = `md`, className: n, children: r, ...o }, s) => import_react$24.createElement(`button`, {
		ref: s,
		type: `button`,
		className: clsx(`sc-btn`, `sc-btn--${e}`, `sc-btn--${t}`, n),
		...o
	}, r));
	o$3.displayName = `Button`;
	c$2 = import_react$24.forwardRef(({ icon: c, suffix: l, showChevron: u, className: d, tooltip: f, tooltipSide: p = `top`, ...m }, h) => {
		let g = l ?? (u ? import_react$24.createElement(s$2, null) : void 0), _ = g != null, v = import_react$24.createElement(o$3, {
			ref: h,
			className: clsx(`sc-icon-btn`, _ && `sc-icon-btn--with-suffix`, d),
			...m
		}, import_react$24.createElement(`span`, { className: `sc-icon-btn-icon` }, c), g && import_react$24.createElement(`span`, { className: `sc-icon-btn-suffix` }, g));
		return f ? import_react$24.createElement(r$4, { delayDuration: 400 }, import_react$24.createElement(i$3, null, import_react$24.createElement(a$6, { asChild: !0 }, v), import_react$24.createElement(o$4, { side: p }, f))) : v;
	});
	c$2.displayName = `IconButton`;
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-ui/dist/dialog/dialog.less
var init_dialog$2 = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-ui/node_modules/@radix-ui/primitive/dist/index.mjs
function composeEventHandlers(originalEventHandler, ourEventHandler, { checkForDefaultPrevented = true } = {}) {
	return function handleEvent(event) {
		originalEventHandler?.(event);
		if (checkForDefaultPrevented === false || !event.defaultPrevented) return ourEventHandler?.(event);
	};
}
var init_dist$16 = __esmMin((() => {
	typeof window !== "undefined" && window.document && window.document.createElement;
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-ui/node_modules/@radix-ui/react-compose-refs/dist/index.mjs
function setRef$1(ref, value) {
	if (typeof ref === "function") return ref(value);
	else if (ref !== null && ref !== void 0) ref.current = value;
}
function composeRefs(...refs) {
	return (node) => {
		let hasCleanup = false;
		const cleanups = refs.map((ref) => {
			const cleanup = setRef$1(ref, node);
			if (!hasCleanup && typeof cleanup == "function") hasCleanup = true;
			return cleanup;
		});
		if (hasCleanup) return () => {
			for (let i = 0; i < cleanups.length; i++) {
				const cleanup = cleanups[i];
				if (typeof cleanup == "function") cleanup();
				else setRef$1(refs[i], null);
			}
		};
	};
}
function useComposedRefs(...refs) {
	return import_react$23.useCallback(composeRefs(...refs), refs);
}
var import_react$23;
var init_dist$15 = __esmMin((() => {
	import_react$23 = /* @__PURE__ */ __toESM(require_react(), 1);
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-ui/node_modules/@radix-ui/react-context/dist/index.mjs
function createContext2(rootComponentName, defaultContext) {
	const Context = import_react$22.createContext(defaultContext);
	Context.displayName = rootComponentName + "Context";
	const Provider = (props) => {
		const { children, ...context } = props;
		const value = import_react$22.useMemo(() => context, Object.values(context));
		return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(Context.Provider, {
			value,
			children
		});
	};
	Provider.displayName = rootComponentName + "Provider";
	function useContext2(consumerName) {
		const context = import_react$22.useContext(Context);
		if (context) return context;
		if (defaultContext !== void 0) return defaultContext;
		throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
	}
	return [Provider, useContext2];
}
function createContextScope(scopeName, createContextScopeDeps = []) {
	let defaultContexts = [];
	function createContext3(rootComponentName, defaultContext) {
		const BaseContext = import_react$22.createContext(defaultContext);
		BaseContext.displayName = rootComponentName + "Context";
		const index = defaultContexts.length;
		defaultContexts = [...defaultContexts, defaultContext];
		const Provider = (props) => {
			const { scope, children, ...context } = props;
			const Context = scope?.[scopeName]?.[index] || BaseContext;
			const value = import_react$22.useMemo(() => context, Object.values(context));
			return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(Context.Provider, {
				value,
				children
			});
		};
		Provider.displayName = rootComponentName + "Provider";
		function useContext2(consumerName, scope) {
			const Context = scope?.[scopeName]?.[index] || BaseContext;
			const context = import_react$22.useContext(Context);
			if (context) return context;
			if (defaultContext !== void 0) return defaultContext;
			throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
		}
		return [Provider, useContext2];
	}
	const createScope = () => {
		const scopeContexts = defaultContexts.map((defaultContext) => {
			return import_react$22.createContext(defaultContext);
		});
		return function useScope(scope) {
			const contexts = scope?.[scopeName] || scopeContexts;
			return import_react$22.useMemo(() => ({ [`__scope${scopeName}`]: {
				...scope,
				[scopeName]: contexts
			} }), [scope, contexts]);
		};
	};
	createScope.scopeName = scopeName;
	return [createContext3, composeContextScopes(createScope, ...createContextScopeDeps)];
}
function composeContextScopes(...scopes) {
	const baseScope = scopes[0];
	if (scopes.length === 1) return baseScope;
	const createScope = () => {
		const scopeHooks = scopes.map((createScope2) => ({
			useScope: createScope2(),
			scopeName: createScope2.scopeName
		}));
		return function useComposedScopes(overrideScopes) {
			const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
				const currentScope = useScope(overrideScopes)[`__scope${scopeName}`];
				return {
					...nextScopes2,
					...currentScope
				};
			}, {});
			return import_react$22.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
		};
	};
	createScope.scopeName = baseScope.scopeName;
	return createScope;
}
var import_react$22, import_jsx_runtime$5;
var init_dist$14 = __esmMin((() => {
	import_react$22 = /* @__PURE__ */ __toESM(require_react(), 1);
	import_jsx_runtime$5 = require_jsx_runtime();
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-ui/node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs
var import_react$21, useLayoutEffect2;
var init_dist$13 = __esmMin((() => {
	import_react$21 = /* @__PURE__ */ __toESM(require_react(), 1);
	useLayoutEffect2 = globalThis?.document ? import_react$21.useLayoutEffect : () => {};
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-ui/node_modules/@radix-ui/react-id/dist/index.mjs
function useId(deterministicId) {
	const [id, setId] = import_react$20.useState(useReactId());
	useLayoutEffect2(() => {
		if (!deterministicId) setId((reactId) => reactId ?? String(count$1++));
	}, [deterministicId]);
	return deterministicId || (id ? `radix-${id}` : "");
}
var import_react$20, useReactId, count$1;
var init_dist$12 = __esmMin((() => {
	import_react$20 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_dist$13();
	useReactId = import_react$20[" useId ".trim().toString()] || (() => void 0);
	count$1 = 0;
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-ui/node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs
function useControllableState({ prop, defaultProp, onChange = () => {}, caller }) {
	const [uncontrolledProp, setUncontrolledProp, onChangeRef] = useUncontrolledState({
		defaultProp,
		onChange
	});
	const isControlled = prop !== void 0;
	const value = isControlled ? prop : uncontrolledProp;
	{
		const isControlledRef = import_react$18.useRef(prop !== void 0);
		import_react$18.useEffect(() => {
			const wasControlled = isControlledRef.current;
			if (wasControlled !== isControlled) console.warn(`${caller} is changing from ${wasControlled ? "controlled" : "uncontrolled"} to ${isControlled ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`);
			isControlledRef.current = isControlled;
		}, [isControlled, caller]);
	}
	return [value, import_react$18.useCallback((nextValue) => {
		if (isControlled) {
			const value2 = isFunction(nextValue) ? nextValue(prop) : nextValue;
			if (value2 !== prop) onChangeRef.current?.(value2);
		} else setUncontrolledProp(nextValue);
	}, [
		isControlled,
		prop,
		setUncontrolledProp,
		onChangeRef
	])];
}
function useUncontrolledState({ defaultProp, onChange }) {
	const [value, setValue] = import_react$18.useState(defaultProp);
	const prevValueRef = import_react$18.useRef(value);
	const onChangeRef = import_react$18.useRef(onChange);
	useInsertionEffect(() => {
		onChangeRef.current = onChange;
	}, [onChange]);
	import_react$18.useEffect(() => {
		if (prevValueRef.current !== value) {
			onChangeRef.current?.(value);
			prevValueRef.current = value;
		}
	}, [value, prevValueRef]);
	return [
		value,
		setValue,
		onChangeRef
	];
}
function isFunction(value) {
	return typeof value === "function";
}
var import_react$18, useInsertionEffect;
var init_dist$11 = __esmMin((() => {
	import_react$18 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_dist$13();
	require_react();
	useInsertionEffect = import_react$18[" useInsertionEffect ".trim().toString()] || useLayoutEffect2;
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-ui/node_modules/@radix-ui/react-slot/dist/index.mjs
/* @__NO_SIDE_EFFECTS__ */
function createSlot(ownerName) {
	const Slot2 = import_react$17.forwardRef((props, forwardedRef) => {
		let { children, ...slotProps } = props;
		let slottableElement = null;
		let hasSlottable = false;
		const newChildren = [];
		if (isLazyComponent(children) && typeof use === "function") children = use(children._payload);
		import_react$17.Children.forEach(children, (maybeSlottable) => {
			if (isSlottable(maybeSlottable)) {
				hasSlottable = true;
				const slottable = maybeSlottable;
				let child = "child" in slottable.props ? slottable.props.child : slottable.props.children;
				if (isLazyComponent(child) && typeof use === "function") child = use(child._payload);
				slottableElement = getSlottableElementFromSlottable(slottable, child);
				newChildren.push(slottableElement?.props?.children);
			} else newChildren.push(maybeSlottable);
		});
		if (slottableElement) slottableElement = import_react$17.cloneElement(slottableElement, void 0, newChildren);
		else if (!hasSlottable && import_react$17.Children.count(children) === 1 && import_react$17.isValidElement(children)) slottableElement = children;
		const slottableElementRef = slottableElement ? getElementRef$1(slottableElement) : void 0;
		const composedRef = useComposedRefs(forwardedRef, slottableElementRef);
		if (!slottableElement) {
			if (children || children === 0) throw new Error(hasSlottable ? createSlottableError(ownerName) : createSlotError(ownerName));
			return children;
		}
		const mergedProps = mergeProps(slotProps, slottableElement.props ?? {});
		if (slottableElement.type !== import_react$17.Fragment) mergedProps.ref = forwardedRef ? composedRef : slottableElementRef;
		return import_react$17.cloneElement(slottableElement, mergedProps);
	});
	Slot2.displayName = `${ownerName}.Slot`;
	return Slot2;
}
function mergeProps(slotProps, childProps) {
	const overrideProps = { ...childProps };
	for (const propName in childProps) {
		const slotPropValue = slotProps[propName];
		const childPropValue = childProps[propName];
		if (/^on[A-Z]/.test(propName)) {
			if (slotPropValue && childPropValue) overrideProps[propName] = (...args) => {
				const result = childPropValue(...args);
				slotPropValue(...args);
				return result;
			};
			else if (slotPropValue) overrideProps[propName] = slotPropValue;
		} else if (propName === "style") overrideProps[propName] = {
			...slotPropValue,
			...childPropValue
		};
		else if (propName === "className") overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
	}
	return {
		...slotProps,
		...overrideProps
	};
}
function getElementRef$1(element) {
	let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
	let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
	if (mayWarn) return element.ref;
	getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
	mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
	if (mayWarn) return element.props.ref;
	return element.props.ref || element.ref;
}
function isSlottable(child) {
	return import_react$17.isValidElement(child) && typeof child.type === "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER;
}
function isLazyComponent(element) {
	return element != null && typeof element === "object" && "$$typeof" in element && element.$$typeof === REACT_LAZY_TYPE && "_payload" in element && isPromiseLike(element._payload);
}
function isPromiseLike(value) {
	return typeof value === "object" && value !== null && "then" in value;
}
var import_react$17, SLOTTABLE_IDENTIFIER, getSlottableElementFromSlottable, REACT_LAZY_TYPE, createSlotError, createSlottableError, use;
var init_dist$10 = __esmMin((() => {
	import_react$17 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_dist$15();
	SLOTTABLE_IDENTIFIER = Symbol.for("radix.slottable");
	getSlottableElementFromSlottable = (slottable, child) => {
		if ("child" in slottable.props) {
			const child2 = slottable.props.child;
			if (!import_react$17.isValidElement(child2)) return null;
			return import_react$17.cloneElement(child2, void 0, slottable.props.children(child2.props.children));
		}
		return import_react$17.isValidElement(child) ? child : null;
	};
	REACT_LAZY_TYPE = Symbol.for("react.lazy");
	createSlotError = (ownerName) => {
		return `${ownerName} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`;
	};
	createSlottableError = (ownerName) => {
		return `${ownerName} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`;
	};
	use = import_react$17[" use ".trim().toString()];
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-ui/node_modules/@radix-ui/react-primitive/dist/index.mjs
function dispatchDiscreteCustomEvent(target, event) {
	if (target) import_react_dom$1.flushSync(() => target.dispatchEvent(event));
}
var import_react$16, import_react_dom$1, import_jsx_runtime$4, Primitive;
var init_dist$9 = __esmMin((() => {
	import_react$16 = /* @__PURE__ */ __toESM(require_react(), 1);
	import_react_dom$1 = /* @__PURE__ */ __toESM(require_react_dom(), 1);
	init_dist$10();
	import_jsx_runtime$4 = require_jsx_runtime();
	Primitive = [
		"a",
		"button",
		"div",
		"form",
		"h2",
		"h3",
		"img",
		"input",
		"label",
		"li",
		"nav",
		"ol",
		"p",
		"select",
		"span",
		"svg",
		"ul"
	].reduce((primitive, node) => {
		const Slot = /* @__PURE__ */ createSlot(`Primitive.${node}`);
		const Node = import_react$16.forwardRef((props, forwardedRef) => {
			const { asChild, ...primitiveProps } = props;
			const Comp = asChild ? Slot : node;
			if (typeof window !== "undefined") window[Symbol.for("radix-ui")] = true;
			return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(Comp, {
				...primitiveProps,
				ref: forwardedRef
			});
		});
		Node.displayName = `Primitive.${node}`;
		return {
			...primitive,
			[node]: Node
		};
	}, {});
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-ui/node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs
function useCallbackRef(callback) {
	const callbackRef = import_react$15.useRef(callback);
	import_react$15.useEffect(() => {
		callbackRef.current = callback;
	});
	return import_react$15.useMemo(() => ((...args) => callbackRef.current?.(...args)), []);
}
var import_react$15;
var init_dist$8 = __esmMin((() => {
	import_react$15 = /* @__PURE__ */ __toESM(require_react(), 1);
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-ui/node_modules/@radix-ui/react-use-escape-keydown/dist/index.mjs
function useEscapeKeydown(onEscapeKeyDownProp, ownerDocument = globalThis?.document) {
	const onEscapeKeyDown = useCallbackRef(onEscapeKeyDownProp);
	import_react$14.useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === "Escape") onEscapeKeyDown(event);
		};
		ownerDocument.addEventListener("keydown", handleKeyDown, { capture: true });
		return () => ownerDocument.removeEventListener("keydown", handleKeyDown, { capture: true });
	}, [onEscapeKeyDown, ownerDocument]);
}
var import_react$14;
var init_dist$7 = __esmMin((() => {
	import_react$14 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_dist$8();
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-ui/node_modules/@radix-ui/react-dismissable-layer/dist/index.mjs
function usePointerDownOutside(onPointerDownOutside, ownerDocument = globalThis?.document) {
	const handlePointerDownOutside = useCallbackRef(onPointerDownOutside);
	const isPointerInsideReactTreeRef = import_react$13.useRef(false);
	const handleClickRef = import_react$13.useRef(() => {});
	import_react$13.useEffect(() => {
		const handlePointerDown = (event) => {
			if (event.target && !isPointerInsideReactTreeRef.current) {
				let handleAndDispatchPointerDownOutsideEvent2 = function() {
					handleAndDispatchCustomEvent(POINTER_DOWN_OUTSIDE, handlePointerDownOutside, eventDetail, { discrete: true });
				};
				const eventDetail = { originalEvent: event };
				if (event.pointerType === "touch") {
					ownerDocument.removeEventListener("click", handleClickRef.current);
					handleClickRef.current = handleAndDispatchPointerDownOutsideEvent2;
					ownerDocument.addEventListener("click", handleClickRef.current, { once: true });
				} else handleAndDispatchPointerDownOutsideEvent2();
			} else ownerDocument.removeEventListener("click", handleClickRef.current);
			isPointerInsideReactTreeRef.current = false;
		};
		const timerId = window.setTimeout(() => {
			ownerDocument.addEventListener("pointerdown", handlePointerDown);
		}, 0);
		return () => {
			window.clearTimeout(timerId);
			ownerDocument.removeEventListener("pointerdown", handlePointerDown);
			ownerDocument.removeEventListener("click", handleClickRef.current);
		};
	}, [ownerDocument, handlePointerDownOutside]);
	return { onPointerDownCapture: () => isPointerInsideReactTreeRef.current = true };
}
function useFocusOutside(onFocusOutside, ownerDocument = globalThis?.document) {
	const handleFocusOutside = useCallbackRef(onFocusOutside);
	const isFocusInsideReactTreeRef = import_react$13.useRef(false);
	import_react$13.useEffect(() => {
		const handleFocus = (event) => {
			if (event.target && !isFocusInsideReactTreeRef.current) handleAndDispatchCustomEvent(FOCUS_OUTSIDE, handleFocusOutside, { originalEvent: event }, { discrete: false });
		};
		ownerDocument.addEventListener("focusin", handleFocus);
		return () => ownerDocument.removeEventListener("focusin", handleFocus);
	}, [ownerDocument, handleFocusOutside]);
	return {
		onFocusCapture: () => isFocusInsideReactTreeRef.current = true,
		onBlurCapture: () => isFocusInsideReactTreeRef.current = false
	};
}
function dispatchUpdate() {
	const event = new CustomEvent(CONTEXT_UPDATE);
	document.dispatchEvent(event);
}
function handleAndDispatchCustomEvent(name, handler, detail, { discrete }) {
	const target = detail.originalEvent.target;
	const event = new CustomEvent(name, {
		bubbles: false,
		cancelable: true,
		detail
	});
	if (handler) target.addEventListener(name, handler, { once: true });
	if (discrete) dispatchDiscreteCustomEvent(target, event);
	else target.dispatchEvent(event);
}
var import_react$13, import_jsx_runtime$3, DISMISSABLE_LAYER_NAME, CONTEXT_UPDATE, POINTER_DOWN_OUTSIDE, FOCUS_OUTSIDE, originalBodyPointerEvents, DismissableLayerContext, DismissableLayer, BRANCH_NAME, DismissableLayerBranch;
var init_dist$6 = __esmMin((() => {
	import_react$13 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_dist$16();
	init_dist$9();
	init_dist$15();
	init_dist$8();
	init_dist$7();
	import_jsx_runtime$3 = require_jsx_runtime();
	DISMISSABLE_LAYER_NAME = "DismissableLayer";
	CONTEXT_UPDATE = "dismissableLayer.update";
	POINTER_DOWN_OUTSIDE = "dismissableLayer.pointerDownOutside";
	FOCUS_OUTSIDE = "dismissableLayer.focusOutside";
	DismissableLayerContext = import_react$13.createContext({
		layers: /* @__PURE__ */ new Set(),
		layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
		branches: /* @__PURE__ */ new Set()
	});
	DismissableLayer = import_react$13.forwardRef((props, forwardedRef) => {
		const { disableOutsidePointerEvents = false, onEscapeKeyDown, onPointerDownOutside, onFocusOutside, onInteractOutside, onDismiss, ...layerProps } = props;
		const context = import_react$13.useContext(DismissableLayerContext);
		const [node, setNode] = import_react$13.useState(null);
		const ownerDocument = node?.ownerDocument ?? globalThis?.document;
		const [, force] = import_react$13.useState({});
		const composedRefs = useComposedRefs(forwardedRef, (node2) => setNode(node2));
		const layers = Array.from(context.layers);
		const [highestLayerWithOutsidePointerEventsDisabled] = [...context.layersWithOutsidePointerEventsDisabled].slice(-1);
		const highestLayerWithOutsidePointerEventsDisabledIndex = layers.indexOf(highestLayerWithOutsidePointerEventsDisabled);
		const index = node ? layers.indexOf(node) : -1;
		const isBodyPointerEventsDisabled = context.layersWithOutsidePointerEventsDisabled.size > 0;
		const isPointerEventsEnabled = index >= highestLayerWithOutsidePointerEventsDisabledIndex;
		const pointerDownOutside = usePointerDownOutside((event) => {
			const target = event.target;
			const isPointerDownOnBranch = [...context.branches].some((branch) => branch.contains(target));
			if (!isPointerEventsEnabled || isPointerDownOnBranch) return;
			onPointerDownOutside?.(event);
			onInteractOutside?.(event);
			if (!event.defaultPrevented) onDismiss?.();
		}, ownerDocument);
		const focusOutside = useFocusOutside((event) => {
			const target = event.target;
			if ([...context.branches].some((branch) => branch.contains(target))) return;
			onFocusOutside?.(event);
			onInteractOutside?.(event);
			if (!event.defaultPrevented) onDismiss?.();
		}, ownerDocument);
		useEscapeKeydown((event) => {
			if (!(index === context.layers.size - 1)) return;
			onEscapeKeyDown?.(event);
			if (!event.defaultPrevented && onDismiss) {
				event.preventDefault();
				onDismiss();
			}
		}, ownerDocument);
		import_react$13.useEffect(() => {
			if (!node) return;
			if (disableOutsidePointerEvents) {
				if (context.layersWithOutsidePointerEventsDisabled.size === 0) {
					originalBodyPointerEvents = ownerDocument.body.style.pointerEvents;
					ownerDocument.body.style.pointerEvents = "none";
				}
				context.layersWithOutsidePointerEventsDisabled.add(node);
			}
			context.layers.add(node);
			dispatchUpdate();
			return () => {
				if (disableOutsidePointerEvents) {
					context.layersWithOutsidePointerEventsDisabled.delete(node);
					if (context.layersWithOutsidePointerEventsDisabled.size === 0) ownerDocument.body.style.pointerEvents = originalBodyPointerEvents;
				}
			};
		}, [
			node,
			ownerDocument,
			disableOutsidePointerEvents,
			context
		]);
		import_react$13.useEffect(() => {
			return () => {
				if (!node) return;
				context.layers.delete(node);
				context.layersWithOutsidePointerEventsDisabled.delete(node);
				dispatchUpdate();
			};
		}, [node, context]);
		import_react$13.useEffect(() => {
			const handleUpdate = () => force({});
			document.addEventListener(CONTEXT_UPDATE, handleUpdate);
			return () => document.removeEventListener(CONTEXT_UPDATE, handleUpdate);
		}, []);
		return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Primitive.div, {
			...layerProps,
			ref: composedRefs,
			style: {
				pointerEvents: isBodyPointerEventsDisabled ? isPointerEventsEnabled ? "auto" : "none" : void 0,
				...props.style
			},
			onFocusCapture: composeEventHandlers(props.onFocusCapture, focusOutside.onFocusCapture),
			onBlurCapture: composeEventHandlers(props.onBlurCapture, focusOutside.onBlurCapture),
			onPointerDownCapture: composeEventHandlers(props.onPointerDownCapture, pointerDownOutside.onPointerDownCapture)
		});
	});
	DismissableLayer.displayName = DISMISSABLE_LAYER_NAME;
	BRANCH_NAME = "DismissableLayerBranch";
	DismissableLayerBranch = import_react$13.forwardRef((props, forwardedRef) => {
		const context = import_react$13.useContext(DismissableLayerContext);
		const ref = import_react$13.useRef(null);
		const composedRefs = useComposedRefs(forwardedRef, ref);
		import_react$13.useEffect(() => {
			const node = ref.current;
			if (node) {
				context.branches.add(node);
				return () => {
					context.branches.delete(node);
				};
			}
		}, [context.branches]);
		return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Primitive.div, {
			...props,
			ref: composedRefs
		});
	});
	DismissableLayerBranch.displayName = BRANCH_NAME;
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-ui/node_modules/@radix-ui/react-focus-scope/dist/index.mjs
function focusFirst(candidates, { select = false } = {}) {
	const previouslyFocusedElement = document.activeElement;
	for (const candidate of candidates) {
		focus(candidate, { select });
		if (document.activeElement !== previouslyFocusedElement) return;
	}
}
function getTabbableEdges(container) {
	const candidates = getTabbableCandidates(container);
	return [findVisible(candidates, container), findVisible(candidates.reverse(), container)];
}
function getTabbableCandidates(container) {
	const nodes = [];
	const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, { acceptNode: (node) => {
		const isHiddenInput = node.tagName === "INPUT" && node.type === "hidden";
		if (node.disabled || node.hidden || isHiddenInput) return NodeFilter.FILTER_SKIP;
		return node.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
	} });
	while (walker.nextNode()) nodes.push(walker.currentNode);
	return nodes;
}
function findVisible(elements, container) {
	for (const element of elements) if (!isHidden(element, { upTo: container })) return element;
}
function isHidden(node, { upTo }) {
	if (getComputedStyle(node).visibility === "hidden") return true;
	while (node) {
		if (upTo !== void 0 && node === upTo) return false;
		if (getComputedStyle(node).display === "none") return true;
		node = node.parentElement;
	}
	return false;
}
function isSelectableInput(element) {
	return element instanceof HTMLInputElement && "select" in element;
}
function focus(element, { select = false } = {}) {
	if (element && element.focus) {
		const previouslyFocusedElement = document.activeElement;
		element.focus({ preventScroll: true });
		if (element !== previouslyFocusedElement && isSelectableInput(element) && select) element.select();
	}
}
function createFocusScopesStack() {
	let stack = [];
	return {
		add(focusScope) {
			const activeFocusScope = stack[0];
			if (focusScope !== activeFocusScope) activeFocusScope?.pause();
			stack = arrayRemove(stack, focusScope);
			stack.unshift(focusScope);
		},
		remove(focusScope) {
			stack = arrayRemove(stack, focusScope);
			stack[0]?.resume();
		}
	};
}
function arrayRemove(array, item) {
	const updatedArray = [...array];
	const index = updatedArray.indexOf(item);
	if (index !== -1) updatedArray.splice(index, 1);
	return updatedArray;
}
function removeLinks(items) {
	return items.filter((item) => item.tagName !== "A");
}
var import_react$12, import_jsx_runtime$2, AUTOFOCUS_ON_MOUNT, AUTOFOCUS_ON_UNMOUNT, EVENT_OPTIONS, FOCUS_SCOPE_NAME, FocusScope, focusScopesStack;
var init_dist$5 = __esmMin((() => {
	import_react$12 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_dist$15();
	init_dist$9();
	init_dist$8();
	import_jsx_runtime$2 = require_jsx_runtime();
	AUTOFOCUS_ON_MOUNT = "focusScope.autoFocusOnMount";
	AUTOFOCUS_ON_UNMOUNT = "focusScope.autoFocusOnUnmount";
	EVENT_OPTIONS = {
		bubbles: false,
		cancelable: true
	};
	FOCUS_SCOPE_NAME = "FocusScope";
	FocusScope = import_react$12.forwardRef((props, forwardedRef) => {
		const { loop = false, trapped = false, onMountAutoFocus: onMountAutoFocusProp, onUnmountAutoFocus: onUnmountAutoFocusProp, ...scopeProps } = props;
		const [container, setContainer] = import_react$12.useState(null);
		const onMountAutoFocus = useCallbackRef(onMountAutoFocusProp);
		const onUnmountAutoFocus = useCallbackRef(onUnmountAutoFocusProp);
		const lastFocusedElementRef = import_react$12.useRef(null);
		const composedRefs = useComposedRefs(forwardedRef, (node) => setContainer(node));
		const focusScope = import_react$12.useRef({
			paused: false,
			pause() {
				this.paused = true;
			},
			resume() {
				this.paused = false;
			}
		}).current;
		import_react$12.useEffect(() => {
			if (trapped) {
				let handleFocusIn2 = function(event) {
					if (focusScope.paused || !container) return;
					const target = event.target;
					if (container.contains(target)) lastFocusedElementRef.current = target;
					else focus(lastFocusedElementRef.current, { select: true });
				}, handleFocusOut2 = function(event) {
					if (focusScope.paused || !container) return;
					const relatedTarget = event.relatedTarget;
					if (relatedTarget === null) return;
					if (!container.contains(relatedTarget)) focus(lastFocusedElementRef.current, { select: true });
				}, handleMutations2 = function(mutations) {
					if (document.activeElement !== document.body) return;
					for (const mutation of mutations) if (mutation.removedNodes.length > 0) focus(container);
				};
				document.addEventListener("focusin", handleFocusIn2);
				document.addEventListener("focusout", handleFocusOut2);
				const mutationObserver = new MutationObserver(handleMutations2);
				if (container) mutationObserver.observe(container, {
					childList: true,
					subtree: true
				});
				return () => {
					document.removeEventListener("focusin", handleFocusIn2);
					document.removeEventListener("focusout", handleFocusOut2);
					mutationObserver.disconnect();
				};
			}
		}, [
			trapped,
			container,
			focusScope.paused
		]);
		import_react$12.useEffect(() => {
			if (container) {
				focusScopesStack.add(focusScope);
				const previouslyFocusedElement = document.activeElement;
				if (!container.contains(previouslyFocusedElement)) {
					const mountEvent = new CustomEvent(AUTOFOCUS_ON_MOUNT, EVENT_OPTIONS);
					container.addEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);
					container.dispatchEvent(mountEvent);
					if (!mountEvent.defaultPrevented) {
						focusFirst(removeLinks(getTabbableCandidates(container)), { select: true });
						if (document.activeElement === previouslyFocusedElement) focus(container);
					}
				}
				return () => {
					container.removeEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);
					setTimeout(() => {
						const unmountEvent = new CustomEvent(AUTOFOCUS_ON_UNMOUNT, EVENT_OPTIONS);
						container.addEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus);
						container.dispatchEvent(unmountEvent);
						if (!unmountEvent.defaultPrevented) focus(previouslyFocusedElement ?? document.body, { select: true });
						container.removeEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus);
						focusScopesStack.remove(focusScope);
					}, 0);
				};
			}
		}, [
			container,
			onMountAutoFocus,
			onUnmountAutoFocus,
			focusScope
		]);
		const handleKeyDown = import_react$12.useCallback((event) => {
			if (!loop && !trapped) return;
			if (focusScope.paused) return;
			const isTabKey = event.key === "Tab" && !event.altKey && !event.ctrlKey && !event.metaKey;
			const focusedElement = document.activeElement;
			if (isTabKey && focusedElement) {
				const container2 = event.currentTarget;
				const [first, last] = getTabbableEdges(container2);
				if (!(first && last)) {
					if (focusedElement === container2) event.preventDefault();
				} else if (!event.shiftKey && focusedElement === last) {
					event.preventDefault();
					if (loop) focus(first, { select: true });
				} else if (event.shiftKey && focusedElement === first) {
					event.preventDefault();
					if (loop) focus(last, { select: true });
				}
			}
		}, [
			loop,
			trapped,
			focusScope.paused
		]);
		return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Primitive.div, {
			tabIndex: -1,
			...scopeProps,
			ref: composedRefs,
			onKeyDown: handleKeyDown
		});
	});
	FocusScope.displayName = FOCUS_SCOPE_NAME;
	focusScopesStack = createFocusScopesStack();
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-ui/node_modules/@radix-ui/react-portal/dist/index.mjs
var import_react$11, import_react_dom, import_jsx_runtime$1, PORTAL_NAME$1, Portal$1;
var init_dist$4 = __esmMin((() => {
	import_react$11 = /* @__PURE__ */ __toESM(require_react(), 1);
	import_react_dom = /* @__PURE__ */ __toESM(require_react_dom(), 1);
	init_dist$9();
	init_dist$13();
	import_jsx_runtime$1 = require_jsx_runtime();
	PORTAL_NAME$1 = "Portal";
	Portal$1 = import_react$11.forwardRef((props, forwardedRef) => {
		const { container: containerProp, ...portalProps } = props;
		const [mounted, setMounted] = import_react$11.useState(false);
		useLayoutEffect2(() => setMounted(true), []);
		const container = containerProp || mounted && globalThis?.document?.body;
		return container ? import_react_dom.createPortal(/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Primitive.div, {
			...portalProps,
			ref: forwardedRef
		}), container) : null;
	});
	Portal$1.displayName = PORTAL_NAME$1;
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-ui/node_modules/@radix-ui/react-presence/dist/index.mjs
function useStateMachine(initialState, machine) {
	return import_react$10.useReducer((state, event) => {
		return machine[state][event] ?? state;
	}, initialState);
}
function usePresence(present) {
	const [node, setNode] = import_react$9.useState();
	const stylesRef = import_react$9.useRef(null);
	const prevPresentRef = import_react$9.useRef(present);
	const prevAnimationNameRef = import_react$9.useRef("none");
	const [state, send] = useStateMachine(present ? "mounted" : "unmounted", {
		mounted: {
			UNMOUNT: "unmounted",
			ANIMATION_OUT: "unmountSuspended"
		},
		unmountSuspended: {
			MOUNT: "mounted",
			ANIMATION_END: "unmounted"
		},
		unmounted: { MOUNT: "mounted" }
	});
	import_react$9.useEffect(() => {
		const currentAnimationName = getAnimationName(stylesRef.current);
		prevAnimationNameRef.current = state === "mounted" ? currentAnimationName : "none";
	}, [state]);
	useLayoutEffect2(() => {
		const styles = stylesRef.current;
		const wasPresent = prevPresentRef.current;
		if (wasPresent !== present) {
			const prevAnimationName = prevAnimationNameRef.current;
			const currentAnimationName = getAnimationName(styles);
			if (present) send("MOUNT");
			else if (currentAnimationName === "none" || styles?.display === "none") send("UNMOUNT");
			else if (wasPresent && prevAnimationName !== currentAnimationName) send("ANIMATION_OUT");
			else send("UNMOUNT");
			prevPresentRef.current = present;
		}
	}, [present, send]);
	useLayoutEffect2(() => {
		if (node) {
			let timeoutId;
			const ownerWindow = node.ownerDocument.defaultView ?? window;
			const handleAnimationEnd = (event) => {
				const isCurrentAnimation = getAnimationName(stylesRef.current).includes(CSS.escape(event.animationName));
				if (event.target === node && isCurrentAnimation) {
					send("ANIMATION_END");
					if (!prevPresentRef.current) {
						const currentFillMode = node.style.animationFillMode;
						node.style.animationFillMode = "forwards";
						timeoutId = ownerWindow.setTimeout(() => {
							if (node.style.animationFillMode === "forwards") node.style.animationFillMode = currentFillMode;
						});
					}
				}
			};
			const handleAnimationStart = (event) => {
				if (event.target === node) prevAnimationNameRef.current = getAnimationName(stylesRef.current);
			};
			node.addEventListener("animationstart", handleAnimationStart);
			node.addEventListener("animationcancel", handleAnimationEnd);
			node.addEventListener("animationend", handleAnimationEnd);
			return () => {
				ownerWindow.clearTimeout(timeoutId);
				node.removeEventListener("animationstart", handleAnimationStart);
				node.removeEventListener("animationcancel", handleAnimationEnd);
				node.removeEventListener("animationend", handleAnimationEnd);
			};
		} else send("ANIMATION_END");
	}, [node, send]);
	return {
		isPresent: ["mounted", "unmountSuspended"].includes(state),
		ref: import_react$9.useCallback((node2) => {
			stylesRef.current = node2 ? getComputedStyle(node2) : null;
			setNode(node2);
		}, [])
	};
}
function setRef(ref, value) {
	if (typeof ref === "function") return ref(value);
	else if (ref !== null && ref !== void 0) ref.current = value;
}
function useStableComposedRefs(...refs) {
	const refsRef = import_react$9.useRef(refs);
	refsRef.current = refs;
	return import_react$9.useCallback((node) => {
		const currentRefs = refsRef.current;
		let hasCleanup = false;
		const cleanups = currentRefs.map((ref) => {
			const cleanup = setRef(ref, node);
			if (!hasCleanup && typeof cleanup === "function") hasCleanup = true;
			return cleanup;
		});
		if (hasCleanup) return () => {
			for (let i = 0; i < cleanups.length; i++) {
				const cleanup = cleanups[i];
				if (typeof cleanup === "function") cleanup();
				else setRef(currentRefs[i], null);
			}
		};
	}, []);
}
function getAnimationName(styles) {
	return styles?.animationName || "none";
}
function getElementRef(element) {
	let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
	let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
	if (mayWarn) return element.ref;
	getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
	mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
	if (mayWarn) return element.props.ref;
	return element.props.ref || element.ref;
}
var import_react$9, import_react$10, Presence;
var init_dist$3 = __esmMin((() => {
	import_react$9 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_dist$13();
	import_react$10 = /* @__PURE__ */ __toESM(require_react(), 1);
	Presence = (props) => {
		const { present, children } = props;
		const presence = usePresence(present);
		const child = typeof children === "function" ? children({ present: presence.isPresent }) : import_react$9.Children.only(children);
		const ref = useStableComposedRefs(presence.ref, getElementRef(child));
		return typeof children === "function" || presence.isPresent ? import_react$9.cloneElement(child, { ref }) : null;
	};
	Presence.displayName = "Presence";
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-ui/node_modules/@radix-ui/react-focus-guards/dist/index.mjs
function useFocusGuards() {
	import_react$8.useEffect(() => {
		if (!guards) guards = {
			start: createFocusGuard(),
			end: createFocusGuard()
		};
		const { start, end } = guards;
		if (document.body.firstElementChild !== start) document.body.insertAdjacentElement("afterbegin", start);
		if (document.body.lastElementChild !== end) document.body.insertAdjacentElement("beforeend", end);
		count++;
		return () => {
			if (count === 1) {
				guards?.start.remove();
				guards?.end.remove();
				guards = null;
			}
			count = Math.max(0, count - 1);
		};
	}, []);
}
function createFocusGuard() {
	const element = document.createElement("span");
	element.setAttribute("data-radix-focus-guard", "");
	element.tabIndex = 0;
	element.style.outline = "none";
	element.style.opacity = "0";
	element.style.position = "fixed";
	element.style.pointerEvents = "none";
	return element;
}
var import_react$8, count, guards;
var init_dist$2 = __esmMin((() => {
	import_react$8 = /* @__PURE__ */ __toESM(require_react(), 1);
	count = 0;
	guards = null;
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-ui/node_modules/react-remove-scroll/dist/es2015/medium.js
var effectCar;
var init_medium = __esmMin((() => {
	init_es2015$1();
	effectCar = createSidecarMedium();
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-ui/node_modules/react-remove-scroll/dist/es2015/UI.js
var import_react$7, nothing, RemoveScroll;
var init_UI = __esmMin((() => {
	init_tslib_es6();
	import_react$7 = /* @__PURE__ */ __toESM(require_react());
	init_constants();
	init_es2015$2();
	init_medium();
	nothing = function() {};
	RemoveScroll = import_react$7.forwardRef(function(props, parentRef) {
		var ref = import_react$7.useRef(null);
		var _a = import_react$7.useState({
			onScrollCapture: nothing,
			onWheelCapture: nothing,
			onTouchMoveCapture: nothing
		}), callbacks = _a[0], setCallbacks = _a[1];
		var forwardProps = props.forwardProps, children = props.children, className = props.className, removeScrollBar = props.removeScrollBar, enabled = props.enabled, shards = props.shards, sideCar = props.sideCar, noRelative = props.noRelative, noIsolation = props.noIsolation, inert = props.inert, allowPinchZoom = props.allowPinchZoom, _b = props.as, Container = _b === void 0 ? "div" : _b, gapMode = props.gapMode, rest = __rest(props, [
			"forwardProps",
			"children",
			"className",
			"removeScrollBar",
			"enabled",
			"shards",
			"sideCar",
			"noRelative",
			"noIsolation",
			"inert",
			"allowPinchZoom",
			"as",
			"gapMode"
		]);
		var SideCar = sideCar;
		var containerRef = useMergeRefs([ref, parentRef]);
		var containerProps = __assign(__assign({}, rest), callbacks);
		return import_react$7.createElement(import_react$7.Fragment, null, enabled && import_react$7.createElement(SideCar, {
			sideCar: effectCar,
			removeScrollBar,
			shards,
			noRelative,
			noIsolation,
			inert,
			setCallbacks,
			allowPinchZoom: !!allowPinchZoom,
			lockRef: ref,
			gapMode
		}), forwardProps ? import_react$7.cloneElement(import_react$7.Children.only(children), __assign(__assign({}, containerProps), { ref: containerRef })) : import_react$7.createElement(Container, __assign({}, containerProps, {
			className,
			ref: containerRef
		}), children));
	});
	RemoveScroll.defaultProps = {
		enabled: true,
		removeScrollBar: true,
		inert: false
	};
	RemoveScroll.classNames = {
		fullWidth: fullWidthClassName,
		zeroRight: zeroRightClassName
	};
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-ui/node_modules/react-remove-scroll/dist/es2015/aggresiveCapture.js
var passiveSupported, options, nonPassive;
var init_aggresiveCapture = __esmMin((() => {
	passiveSupported = false;
	if (typeof window !== "undefined") try {
		options = Object.defineProperty({}, "passive", { get: function() {
			passiveSupported = true;
			return true;
		} });
		window.addEventListener("test", options, options);
		window.removeEventListener("test", options, options);
	} catch (err) {
		passiveSupported = false;
	}
	nonPassive = passiveSupported ? { passive: false } : false;
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-ui/node_modules/react-remove-scroll/dist/es2015/handleScroll.js
var alwaysContainsScroll, elementCanBeScrolled, elementCouldBeVScrolled, elementCouldBeHScrolled, locationCouldBeScrolled, getVScrollVariables, getHScrollVariables, elementCouldBeScrolled, getScrollVariables, getDirectionFactor, handleScroll;
var init_handleScroll = __esmMin((() => {
	alwaysContainsScroll = function(node) {
		return node.tagName === "TEXTAREA";
	};
	elementCanBeScrolled = function(node, overflow) {
		if (!(node instanceof Element)) return false;
		var styles = window.getComputedStyle(node);
		return styles[overflow] !== "hidden" && !(styles.overflowY === styles.overflowX && !alwaysContainsScroll(node) && styles[overflow] === "visible");
	};
	elementCouldBeVScrolled = function(node) {
		return elementCanBeScrolled(node, "overflowY");
	};
	elementCouldBeHScrolled = function(node) {
		return elementCanBeScrolled(node, "overflowX");
	};
	locationCouldBeScrolled = function(axis, node) {
		var ownerDocument = node.ownerDocument;
		var current = node;
		do {
			if (typeof ShadowRoot !== "undefined" && current instanceof ShadowRoot) current = current.host;
			if (elementCouldBeScrolled(axis, current)) {
				var _a = getScrollVariables(axis, current);
				if (_a[1] > _a[2]) return true;
			}
			current = current.parentNode;
		} while (current && current !== ownerDocument.body);
		return false;
	};
	getVScrollVariables = function(_a) {
		return [
			_a.scrollTop,
			_a.scrollHeight,
			_a.clientHeight
		];
	};
	getHScrollVariables = function(_a) {
		return [
			_a.scrollLeft,
			_a.scrollWidth,
			_a.clientWidth
		];
	};
	elementCouldBeScrolled = function(axis, node) {
		return axis === "v" ? elementCouldBeVScrolled(node) : elementCouldBeHScrolled(node);
	};
	getScrollVariables = function(axis, node) {
		return axis === "v" ? getVScrollVariables(node) : getHScrollVariables(node);
	};
	getDirectionFactor = function(axis, direction) {
		/**
		* If the element's direction is rtl (right-to-left), then scrollLeft is 0 when the scrollbar is at its rightmost position,
		* and then increasingly negative as you scroll towards the end of the content.
		* @see https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollLeft
		*/
		return axis === "h" && direction === "rtl" ? -1 : 1;
	};
	handleScroll = function(axis, endTarget, event, sourceDelta, noOverscroll) {
		var directionFactor = getDirectionFactor(axis, window.getComputedStyle(endTarget).direction);
		var delta = directionFactor * sourceDelta;
		var target = event.target;
		var targetInLock = endTarget.contains(target);
		var shouldCancelScroll = false;
		var isDeltaPositive = delta > 0;
		var availableScroll = 0;
		var availableScrollTop = 0;
		do {
			if (!target) break;
			var _a = getScrollVariables(axis, target), position = _a[0];
			var elementScroll = _a[1] - _a[2] - directionFactor * position;
			if (position || elementScroll) {
				if (elementCouldBeScrolled(axis, target)) {
					availableScroll += elementScroll;
					availableScrollTop += position;
				}
			}
			var parent_1 = target.parentNode;
			target = parent_1 && parent_1.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? parent_1.host : parent_1;
		} while (!targetInLock && target !== document.body || targetInLock && (endTarget.contains(target) || endTarget === target));
		if (isDeltaPositive && (noOverscroll && Math.abs(availableScroll) < 1 || !noOverscroll && delta > availableScroll)) shouldCancelScroll = true;
		else if (!isDeltaPositive && (noOverscroll && Math.abs(availableScrollTop) < 1 || !noOverscroll && -delta > availableScrollTop)) shouldCancelScroll = true;
		return shouldCancelScroll;
	};
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-ui/node_modules/react-remove-scroll/dist/es2015/SideEffect.js
function RemoveScrollSideCar(props) {
	var shouldPreventQueue = import_react$6.useRef([]);
	var touchStartRef = import_react$6.useRef([0, 0]);
	var activeAxis = import_react$6.useRef();
	var id = import_react$6.useState(idCounter++)[0];
	var Style = import_react$6.useState(styleSingleton)[0];
	var lastProps = import_react$6.useRef(props);
	import_react$6.useEffect(function() {
		lastProps.current = props;
	}, [props]);
	import_react$6.useEffect(function() {
		if (props.inert) {
			document.body.classList.add("block-interactivity-".concat(id));
			var allow_1 = __spreadArray([props.lockRef.current], (props.shards || []).map(extractRef), true).filter(Boolean);
			allow_1.forEach(function(el) {
				return el.classList.add("allow-interactivity-".concat(id));
			});
			return function() {
				document.body.classList.remove("block-interactivity-".concat(id));
				allow_1.forEach(function(el) {
					return el.classList.remove("allow-interactivity-".concat(id));
				});
			};
		}
	}, [
		props.inert,
		props.lockRef.current,
		props.shards
	]);
	var shouldCancelEvent = import_react$6.useCallback(function(event, parent) {
		if ("touches" in event && event.touches.length === 2 || event.type === "wheel" && event.ctrlKey) return !lastProps.current.allowPinchZoom;
		var touch = getTouchXY(event);
		var touchStart = touchStartRef.current;
		var deltaX = "deltaX" in event ? event.deltaX : touchStart[0] - touch[0];
		var deltaY = "deltaY" in event ? event.deltaY : touchStart[1] - touch[1];
		var currentAxis;
		var target = event.target;
		var moveDirection = Math.abs(deltaX) > Math.abs(deltaY) ? "h" : "v";
		if ("touches" in event && moveDirection === "h" && target.type === "range") return false;
		var selection = window.getSelection();
		var anchorNode = selection && selection.anchorNode;
		if (anchorNode ? anchorNode === target || anchorNode.contains(target) : false) return false;
		var canBeScrolledInMainDirection = locationCouldBeScrolled(moveDirection, target);
		if (!canBeScrolledInMainDirection) return true;
		if (canBeScrolledInMainDirection) currentAxis = moveDirection;
		else {
			currentAxis = moveDirection === "v" ? "h" : "v";
			canBeScrolledInMainDirection = locationCouldBeScrolled(moveDirection, target);
		}
		if (!canBeScrolledInMainDirection) return false;
		if (!activeAxis.current && "changedTouches" in event && (deltaX || deltaY)) activeAxis.current = currentAxis;
		if (!currentAxis) return true;
		var cancelingAxis = activeAxis.current || currentAxis;
		return handleScroll(cancelingAxis, parent, event, cancelingAxis === "h" ? deltaX : deltaY, true);
	}, []);
	var shouldPrevent = import_react$6.useCallback(function(_event) {
		var event = _event;
		if (!lockStack.length || lockStack[lockStack.length - 1] !== Style) return;
		var delta = "deltaY" in event ? getDeltaXY(event) : getTouchXY(event);
		var sourceEvent = shouldPreventQueue.current.filter(function(e) {
			return e.name === event.type && (e.target === event.target || event.target === e.shadowParent) && deltaCompare(e.delta, delta);
		})[0];
		if (sourceEvent && sourceEvent.should) {
			if (event.cancelable) event.preventDefault();
			return;
		}
		if (!sourceEvent) {
			var shardNodes = (lastProps.current.shards || []).map(extractRef).filter(Boolean).filter(function(node) {
				return node.contains(event.target);
			});
			if (shardNodes.length > 0 ? shouldCancelEvent(event, shardNodes[0]) : !lastProps.current.noIsolation) {
				if (event.cancelable) event.preventDefault();
			}
		}
	}, []);
	var shouldCancel = import_react$6.useCallback(function(name, delta, target, should) {
		var event = {
			name,
			delta,
			target,
			should,
			shadowParent: getOutermostShadowParent(target)
		};
		shouldPreventQueue.current.push(event);
		setTimeout(function() {
			shouldPreventQueue.current = shouldPreventQueue.current.filter(function(e) {
				return e !== event;
			});
		}, 1);
	}, []);
	var scrollTouchStart = import_react$6.useCallback(function(event) {
		touchStartRef.current = getTouchXY(event);
		activeAxis.current = void 0;
	}, []);
	var scrollWheel = import_react$6.useCallback(function(event) {
		shouldCancel(event.type, getDeltaXY(event), event.target, shouldCancelEvent(event, props.lockRef.current));
	}, []);
	var scrollTouchMove = import_react$6.useCallback(function(event) {
		shouldCancel(event.type, getTouchXY(event), event.target, shouldCancelEvent(event, props.lockRef.current));
	}, []);
	import_react$6.useEffect(function() {
		lockStack.push(Style);
		props.setCallbacks({
			onScrollCapture: scrollWheel,
			onWheelCapture: scrollWheel,
			onTouchMoveCapture: scrollTouchMove
		});
		document.addEventListener("wheel", shouldPrevent, nonPassive);
		document.addEventListener("touchmove", shouldPrevent, nonPassive);
		document.addEventListener("touchstart", scrollTouchStart, nonPassive);
		return function() {
			lockStack = lockStack.filter(function(inst) {
				return inst !== Style;
			});
			document.removeEventListener("wheel", shouldPrevent, nonPassive);
			document.removeEventListener("touchmove", shouldPrevent, nonPassive);
			document.removeEventListener("touchstart", scrollTouchStart, nonPassive);
		};
	}, []);
	var removeScrollBar = props.removeScrollBar, inert = props.inert;
	return import_react$6.createElement(import_react$6.Fragment, null, inert ? import_react$6.createElement(Style, { styles: generateStyle(id) }) : null, removeScrollBar ? import_react$6.createElement(RemoveScrollBar, {
		noRelative: props.noRelative,
		gapMode: props.gapMode
	}) : null);
}
function getOutermostShadowParent(node) {
	var shadowParent = null;
	while (node !== null) {
		if (node instanceof ShadowRoot) {
			shadowParent = node.host;
			node = node.host;
		}
		node = node.parentNode;
	}
	return shadowParent;
}
var import_react$6, getTouchXY, getDeltaXY, extractRef, deltaCompare, generateStyle, idCounter, lockStack;
var init_SideEffect = __esmMin((() => {
	init_tslib_es6();
	import_react$6 = /* @__PURE__ */ __toESM(require_react());
	init_es2015$3();
	init_es2015$4();
	init_aggresiveCapture();
	init_handleScroll();
	getTouchXY = function(event) {
		return "changedTouches" in event ? [event.changedTouches[0].clientX, event.changedTouches[0].clientY] : [0, 0];
	};
	getDeltaXY = function(event) {
		return [event.deltaX, event.deltaY];
	};
	extractRef = function(ref) {
		return ref && "current" in ref ? ref.current : ref;
	};
	deltaCompare = function(x, y) {
		return x[0] === y[0] && x[1] === y[1];
	};
	generateStyle = function(id) {
		return "\n  .block-interactivity-".concat(id, " {pointer-events: none;}\n  .allow-interactivity-").concat(id, " {pointer-events: all;}\n");
	};
	idCounter = 0;
	lockStack = [];
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-ui/node_modules/react-remove-scroll/dist/es2015/sidecar.js
var sidecar_default;
var init_sidecar = __esmMin((() => {
	init_es2015$1();
	init_SideEffect();
	init_medium();
	sidecar_default = exportSidecar(effectCar, RemoveScrollSideCar);
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-ui/node_modules/react-remove-scroll/dist/es2015/Combination.js
var import_react$5, ReactRemoveScroll;
var init_Combination = __esmMin((() => {
	init_tslib_es6();
	import_react$5 = /* @__PURE__ */ __toESM(require_react());
	init_UI();
	init_sidecar();
	ReactRemoveScroll = import_react$5.forwardRef(function(props, ref) {
		return import_react$5.createElement(RemoveScroll, __assign({}, props, {
			ref,
			sideCar: sidecar_default
		}));
	});
	ReactRemoveScroll.classNames = RemoveScroll.classNames;
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-ui/node_modules/react-remove-scroll/dist/es2015/index.js
var init_es2015 = __esmMin((() => {
	init_Combination();
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-ui/node_modules/@radix-ui/react-dialog/dist/index.mjs
function getState(open) {
	return open ? "open" : "closed";
}
var import_react$4, import_jsx_runtime, DIALOG_NAME, createDialogContext, createDialogScope, DialogProvider, useDialogContext, Dialog, TRIGGER_NAME, DialogTrigger, PORTAL_NAME, PortalProvider, usePortalContext, DialogPortal, OVERLAY_NAME, DialogOverlay, Slot, DialogOverlayImpl, CONTENT_NAME, DialogContent, DialogContentModal, DialogContentNonModal, DialogContentImpl, TITLE_NAME, DialogTitle, DESCRIPTION_NAME, DialogDescription, CLOSE_NAME, DialogClose, TITLE_WARNING_NAME, WarningProvider, useWarningContext, TitleWarning, DESCRIPTION_WARNING_NAME, DescriptionWarning, Root, Trigger, Portal, Overlay, Content, Title, Description, Close;
var init_dist$1 = __esmMin((() => {
	import_react$4 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_dist$16();
	init_dist$15();
	init_dist$14();
	init_dist$12();
	init_dist$11();
	init_dist$6();
	init_dist$5();
	init_dist$4();
	init_dist$3();
	init_dist$9();
	init_dist$2();
	init_es2015();
	init_es2015$5();
	init_dist$10();
	import_jsx_runtime = require_jsx_runtime();
	DIALOG_NAME = "Dialog";
	[createDialogContext, createDialogScope] = createContextScope(DIALOG_NAME);
	[DialogProvider, useDialogContext] = createDialogContext(DIALOG_NAME);
	Dialog = (props) => {
		const { __scopeDialog, children, open: openProp, defaultOpen, onOpenChange, modal = true } = props;
		const triggerRef = import_react$4.useRef(null);
		const contentRef = import_react$4.useRef(null);
		const [open, setOpen] = useControllableState({
			prop: openProp,
			defaultProp: defaultOpen ?? false,
			onChange: onOpenChange,
			caller: DIALOG_NAME
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogProvider, {
			scope: __scopeDialog,
			triggerRef,
			contentRef,
			contentId: useId(),
			titleId: useId(),
			descriptionId: useId(),
			open,
			onOpenChange: setOpen,
			onOpenToggle: import_react$4.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
			modal,
			children
		});
	};
	Dialog.displayName = DIALOG_NAME;
	TRIGGER_NAME = "DialogTrigger";
	DialogTrigger = import_react$4.forwardRef((props, forwardedRef) => {
		const { __scopeDialog, ...triggerProps } = props;
		const context = useDialogContext(TRIGGER_NAME, __scopeDialog);
		const composedTriggerRef = useComposedRefs(forwardedRef, context.triggerRef);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.button, {
			type: "button",
			"aria-haspopup": "dialog",
			"aria-expanded": context.open,
			"aria-controls": context.open ? context.contentId : void 0,
			"data-state": getState(context.open),
			...triggerProps,
			ref: composedTriggerRef,
			onClick: composeEventHandlers(props.onClick, context.onOpenToggle)
		});
	});
	DialogTrigger.displayName = TRIGGER_NAME;
	PORTAL_NAME = "DialogPortal";
	[PortalProvider, usePortalContext] = createDialogContext(PORTAL_NAME, { forceMount: void 0 });
	DialogPortal = (props) => {
		const { __scopeDialog, forceMount, children, container } = props;
		const context = useDialogContext(PORTAL_NAME, __scopeDialog);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalProvider, {
			scope: __scopeDialog,
			forceMount,
			children: import_react$4.Children.map(children, (child) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
				present: forceMount || context.open,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal$1, {
					asChild: true,
					container,
					children: child
				})
			}))
		});
	};
	DialogPortal.displayName = PORTAL_NAME;
	OVERLAY_NAME = "DialogOverlay";
	DialogOverlay = import_react$4.forwardRef((props, forwardedRef) => {
		const portalContext = usePortalContext(OVERLAY_NAME, props.__scopeDialog);
		const { forceMount = portalContext.forceMount, ...overlayProps } = props;
		const context = useDialogContext(OVERLAY_NAME, props.__scopeDialog);
		return context.modal ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
			present: forceMount || context.open,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlayImpl, {
				...overlayProps,
				ref: forwardedRef
			})
		}) : null;
	});
	DialogOverlay.displayName = OVERLAY_NAME;
	Slot = /* @__PURE__ */ createSlot("DialogOverlay.RemoveScroll");
	DialogOverlayImpl = import_react$4.forwardRef((props, forwardedRef) => {
		const { __scopeDialog, ...overlayProps } = props;
		const context = useDialogContext(OVERLAY_NAME, __scopeDialog);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReactRemoveScroll, {
			as: Slot,
			allowPinchZoom: true,
			shards: [context.contentRef],
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
				"data-state": getState(context.open),
				...overlayProps,
				ref: forwardedRef,
				style: {
					pointerEvents: "auto",
					...overlayProps.style
				}
			})
		});
	});
	CONTENT_NAME = "DialogContent";
	DialogContent = import_react$4.forwardRef((props, forwardedRef) => {
		const portalContext = usePortalContext(CONTENT_NAME, props.__scopeDialog);
		const { forceMount = portalContext.forceMount, ...contentProps } = props;
		const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
			present: forceMount || context.open,
			children: context.modal ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContentModal, {
				...contentProps,
				ref: forwardedRef
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContentNonModal, {
				...contentProps,
				ref: forwardedRef
			})
		});
	});
	DialogContent.displayName = CONTENT_NAME;
	DialogContentModal = import_react$4.forwardRef((props, forwardedRef) => {
		const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
		const contentRef = import_react$4.useRef(null);
		const composedRefs = useComposedRefs(forwardedRef, context.contentRef, contentRef);
		import_react$4.useEffect(() => {
			const content = contentRef.current;
			if (content) return hideOthers(content);
		}, []);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContentImpl, {
			...props,
			ref: composedRefs,
			trapFocus: context.open,
			disableOutsidePointerEvents: context.open,
			onCloseAutoFocus: composeEventHandlers(props.onCloseAutoFocus, (event) => {
				event.preventDefault();
				context.triggerRef.current?.focus();
			}),
			onPointerDownOutside: composeEventHandlers(props.onPointerDownOutside, (event) => {
				const originalEvent = event.detail.originalEvent;
				const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
				if (originalEvent.button === 2 || ctrlLeftClick) event.preventDefault();
			}),
			onFocusOutside: composeEventHandlers(props.onFocusOutside, (event) => event.preventDefault())
		});
	});
	DialogContentNonModal = import_react$4.forwardRef((props, forwardedRef) => {
		const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
		const hasInteractedOutsideRef = import_react$4.useRef(false);
		const hasPointerDownOutsideRef = import_react$4.useRef(false);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContentImpl, {
			...props,
			ref: forwardedRef,
			trapFocus: false,
			disableOutsidePointerEvents: false,
			onCloseAutoFocus: (event) => {
				props.onCloseAutoFocus?.(event);
				if (!event.defaultPrevented) {
					if (!hasInteractedOutsideRef.current) context.triggerRef.current?.focus();
					event.preventDefault();
				}
				hasInteractedOutsideRef.current = false;
				hasPointerDownOutsideRef.current = false;
			},
			onInteractOutside: (event) => {
				props.onInteractOutside?.(event);
				if (!event.defaultPrevented) {
					hasInteractedOutsideRef.current = true;
					if (event.detail.originalEvent.type === "pointerdown") hasPointerDownOutsideRef.current = true;
				}
				const target = event.target;
				if (context.triggerRef.current?.contains(target)) event.preventDefault();
				if (event.detail.originalEvent.type === "focusin" && hasPointerDownOutsideRef.current) event.preventDefault();
			}
		});
	});
	DialogContentImpl = import_react$4.forwardRef((props, forwardedRef) => {
		const { __scopeDialog, trapFocus, onOpenAutoFocus, onCloseAutoFocus, ...contentProps } = props;
		const context = useDialogContext(CONTENT_NAME, __scopeDialog);
		const contentRef = import_react$4.useRef(null);
		const composedRefs = useComposedRefs(forwardedRef, contentRef);
		useFocusGuards();
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FocusScope, {
			asChild: true,
			loop: true,
			trapped: trapFocus,
			onMountAutoFocus: onOpenAutoFocus,
			onUnmountAutoFocus: onCloseAutoFocus,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DismissableLayer, {
				role: "dialog",
				id: context.contentId,
				"aria-describedby": context.descriptionId,
				"aria-labelledby": context.titleId,
				"data-state": getState(context.open),
				...contentProps,
				ref: composedRefs,
				onDismiss: () => context.onOpenChange(false)
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TitleWarning, { titleId: context.titleId }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DescriptionWarning, {
			contentRef,
			descriptionId: context.descriptionId
		})] })] });
	});
	TITLE_NAME = "DialogTitle";
	DialogTitle = import_react$4.forwardRef((props, forwardedRef) => {
		const { __scopeDialog, ...titleProps } = props;
		const context = useDialogContext(TITLE_NAME, __scopeDialog);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.h2, {
			id: context.titleId,
			...titleProps,
			ref: forwardedRef
		});
	});
	DialogTitle.displayName = TITLE_NAME;
	DESCRIPTION_NAME = "DialogDescription";
	DialogDescription = import_react$4.forwardRef((props, forwardedRef) => {
		const { __scopeDialog, ...descriptionProps } = props;
		const context = useDialogContext(DESCRIPTION_NAME, __scopeDialog);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.p, {
			id: context.descriptionId,
			...descriptionProps,
			ref: forwardedRef
		});
	});
	DialogDescription.displayName = DESCRIPTION_NAME;
	CLOSE_NAME = "DialogClose";
	DialogClose = import_react$4.forwardRef((props, forwardedRef) => {
		const { __scopeDialog, ...closeProps } = props;
		const context = useDialogContext(CLOSE_NAME, __scopeDialog);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.button, {
			type: "button",
			...closeProps,
			ref: forwardedRef,
			onClick: composeEventHandlers(props.onClick, () => context.onOpenChange(false))
		});
	});
	DialogClose.displayName = CLOSE_NAME;
	TITLE_WARNING_NAME = "DialogTitleWarning";
	[WarningProvider, useWarningContext] = createContext2(TITLE_WARNING_NAME, {
		contentName: CONTENT_NAME,
		titleName: TITLE_NAME,
		docsSlug: "dialog"
	});
	TitleWarning = ({ titleId }) => {
		const titleWarningContext = useWarningContext(TITLE_WARNING_NAME);
		const MESSAGE = `\`${titleWarningContext.contentName}\` requires a \`${titleWarningContext.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${titleWarningContext.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${titleWarningContext.docsSlug}`;
		import_react$4.useEffect(() => {
			if (titleId) {
				if (!document.getElementById(titleId)) console.error(MESSAGE);
			}
		}, [MESSAGE, titleId]);
		return null;
	};
	DESCRIPTION_WARNING_NAME = "DialogDescriptionWarning";
	DescriptionWarning = ({ contentRef, descriptionId }) => {
		const MESSAGE = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${useWarningContext(DESCRIPTION_WARNING_NAME).contentName}}.`;
		import_react$4.useEffect(() => {
			const describedById = contentRef.current?.getAttribute("aria-describedby");
			if (descriptionId && describedById) {
				if (!document.getElementById(descriptionId)) console.warn(MESSAGE);
			}
		}, [
			MESSAGE,
			contentRef,
			descriptionId
		]);
		return null;
	};
	Root = Dialog;
	Trigger = DialogTrigger;
	Portal = DialogPortal;
	Overlay = DialogOverlay;
	Content = DialogContent;
	Title = DialogTitle;
	Description = DialogDescription;
	Close = DialogClose;
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-ui/dist/dialog/dialog.mjs
var import_react$3, r$3, i$2, a$3, o$2, s$1, c$1, l$2, u$1;
var init_dialog$1 = __esmMin((() => {
	init_clsx();
	import_react$3 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_dialog$2();
	init_dist$1();
	r$3 = Root, i$2 = Trigger, a$3 = Portal, o$2 = Close, s$1 = Title, c$1 = Description, l$2 = import_react$3.forwardRef(({ className: r, ...i }, a) => import_react$3.createElement(Overlay, {
		ref: a,
		className: clsx(`sc-dialog-overlay`, r),
		...i
	}));
	l$2.displayName = `Dialog.Overlay`;
	u$1 = import_react$3.forwardRef(({ className: r, children: i, ...o }, s) => import_react$3.createElement(a$3, null, import_react$3.createElement(l$2, null), import_react$3.createElement(Content, {
		ref: s,
		className: clsx(`sc-dialog-content`, r),
		...o
	}, i)));
	u$1.displayName = `Dialog.Content`;
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-ui/dist/dialog/index.mjs
var l$1;
var init_dialog = __esmMin((() => {
	init_runtime();
	init_dialog$1();
	l$1 = t$5({
		Close: () => o$2,
		Content: () => u$1,
		Description: () => c$1,
		Overlay: () => l$2,
		Portal: () => a$3,
		Root: () => r$3,
		Title: () => s$1,
		Trigger: () => i$2
	});
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-ui/dist/dropdown-menu/dropdown-menu.less
var init_dropdown_menu$2 = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-ui/dist/dropdown-menu/dropdown-menu.mjs
function m$1({ icon: e, suffix: n, children: r, ...i }) {
	return import_react$2.createElement(l, i, e && import_react$2.createElement(`span`, { className: `sc-dropdown-item-icon` }, e), import_react$2.createElement(`span`, { className: `sc-dropdown-item-label` }, r), n && import_react$2.createElement(`span`, { className: `sc-dropdown-item-shortcut` }, n));
}
function h({ icon: e, arrow: n, children: r, ...i }) {
	return import_react$2.createElement(u, i, e && import_react$2.createElement(`span`, { className: `sc-dropdown-item-icon` }, e), import_react$2.createElement(`span`, { className: `sc-dropdown-item-label` }, r), import_react$2.createElement(`span`, { className: `sc-dropdown-item-arrow` }, n ?? `›`));
}
var import_react$2, r$2, i$1, a$2, o$1, s, c, l, u, d, f, p;
var init_dropdown_menu$1 = __esmMin((() => {
	init_clsx();
	import_react$2 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_dropdown_menu$2();
	init_dist$18();
	r$2 = Root2, i$1 = Trigger$2, a$2 = Portal2, o$1 = Group2, s = Sub2, c = import_react$2.forwardRef(({ className: r, sideOffset: i = 4, onCloseAutoFocus: a, ...o }, s) => import_react$2.createElement(Content2$1, {
		ref: s,
		className: clsx(`sc-dropdown-content`, r),
		sideOffset: i,
		onCloseAutoFocus: (e) => {
			e.preventDefault(), a?.(e);
		},
		...o
	}));
	c.displayName = `DropdownMenu.Content`;
	l = import_react$2.forwardRef(({ className: r, ...i }, a) => import_react$2.createElement(Item2, {
		ref: a,
		className: clsx(`sc-dropdown-item`, r),
		...i
	}));
	l.displayName = `DropdownMenu.Item`;
	u = import_react$2.forwardRef(({ className: r, ...i }, a) => import_react$2.createElement(SubTrigger2, {
		ref: a,
		className: clsx(`sc-dropdown-sub-trigger`, r),
		...i
	}));
	u.displayName = `DropdownMenu.SubTrigger`;
	d = import_react$2.forwardRef(({ className: r, sideOffset: i = 2, ...a }, o) => import_react$2.createElement(SubContent2, {
		ref: o,
		className: clsx(`sc-dropdown-content`, `sc-dropdown-sub-content`, r),
		sideOffset: i,
		...a
	}));
	d.displayName = `DropdownMenu.SubContent`;
	f = import_react$2.forwardRef(({ className: r, ...i }, a) => import_react$2.createElement(Separator2, {
		ref: a,
		className: clsx(`sc-dropdown-separator`, r),
		...i
	}));
	f.displayName = `DropdownMenu.Separator`;
	p = import_react$2.forwardRef(({ className: r, ...i }, a) => import_react$2.createElement(Label2, {
		ref: a,
		className: clsx(`sc-dropdown-label`, r),
		...i
	}));
	p.displayName = `DropdownMenu.Label`;
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-ui/dist/dropdown-menu/index.mjs
var m;
var init_dropdown_menu = __esmMin((() => {
	init_runtime();
	init_dropdown_menu$1();
	m = t$5({
		Content: () => c,
		Group: () => o$1,
		Item: () => l,
		ItemWithIcon: () => m$1,
		Label: () => p,
		Portal: () => a$2,
		Root: () => r$2,
		Separator: () => f,
		Sub: () => s,
		SubContent: () => d,
		SubTrigger: () => u,
		SubTriggerWithIcon: () => h,
		Trigger: () => i$1
	});
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-ui/dist/icon/icon.mjs
function t$1(e) {
	return typeof e == `string` && (e.startsWith(`http`) || e.startsWith(`data:`));
}
function n(e) {
	if (typeof e == `function`) return !0;
	if (typeof e == `object` && e && `$$typeof` in e) {
		let t = e;
		if (`props` in t) return !1;
		if (typeof t.render == `function` || t.type != null) return !0;
	}
	return !1;
}
function r$1({ src: r, size: i, className: a }) {
	if (!r) return null;
	if (t$1(r)) return import_react$1.createElement(`img`, {
		src: r,
		width: i,
		height: i,
		className: a,
		alt: ``,
		"aria-hidden": `true`
	});
	if (n(r)) {
		let t = r;
		return import_react$1.createElement(t, {
			width: i,
			height: i,
			className: a
		});
	}
	return import_react$1.createElement(import_react$1.Fragment, null, r);
}
var import_react$1;
var init_icon = __esmMin((() => {
	import_react$1 = /* @__PURE__ */ __toESM(require_react(), 1);
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-ui/dist/tabs/tabs.less
var init_tabs$2 = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-ui/dist/tabs/tabs.mjs
var import_react, r, i, a$1, o;
var init_tabs$1 = __esmMin((() => {
	init_clsx();
	import_react = /* @__PURE__ */ __toESM(require_react(), 1);
	init_tabs$2();
	init_dist$19();
	r = Root2$1, i = Content$1, a$1 = import_react.forwardRef(({ className: r, ...i }, a) => import_react.createElement(List, {
		ref: a,
		className: clsx(`sc-tabs-list`, r),
		...i
	}));
	a$1.displayName = `Tabs.List`;
	o = import_react.forwardRef(({ className: r, ...i }, a) => import_react.createElement(Trigger$3, {
		ref: a,
		className: clsx(`sc-tabs-trigger`, r),
		...i
	}));
	o.displayName = `Tabs.Trigger`;
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-ui/dist/tabs/index.mjs
var a;
var init_tabs = __esmMin((() => {
	init_runtime();
	init_tabs$1();
	a = t$5({
		Content: () => i,
		List: () => a$1,
		Root: () => r,
		Trigger: () => o
	});
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-ui/dist/index.mjs
var init_dist = __esmMin((() => {
	init_tooltip();
	init_button();
	init_dialog();
	init_dropdown_menu();
	init_icon();
	init_tabs();
}));
//#endregion
export { l$1 as a, a$5 as c, t$6 as d, m as i, init_events as l, a as n, c$2 as o, r$1 as r, o$3 as s, init_dist as t, n$1 as u };
