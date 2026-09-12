import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_react_dom } from "./react-dom-IYSM6kDg.js";
import { Ct as CornerDownLeft, t as init_lucide_react } from "./lucide-react-CmX0JwWL.js";
import { C as f, D as J, E as v$1, ft as v$2, pt as e, rt as o$3, t as init_dist$1, w as o$2, x as a$3 } from "./dist-BfO6AyhP.js";
import { a as init_i18n, c as a$4, d as require_shim, g as t$2, l as init_footnote_context, m as init_events, o as o$4, p as i$3, r as init_footnote_ops, s as s$3, t as a$5, u as s$2 } from "./footnote-ops-Df7sU36u.js";
//#region ../../node_modules/@react-hookz/web/dist/useSyncedRef/index.js
/**
* Like `useRef`, but it returns immutable ref that contains actual value.
*
* @param value
*/
function useSyncedRef(value) {
	const ref = (0, import_react$55.useRef)(value);
	ref.current = value;
	return (0, import_react$55.useMemo)(() => Object.freeze({ get current() {
		return ref.current;
	} }), []);
}
var import_react$55;
var init_useSyncedRef = __esmMin((() => {
	import_react$55 = /* @__PURE__ */ __toESM(require_react(), 1);
}));
var init_useUnmountEffect = __esmMin((() => {
	require_react();
}));
var init_useDebouncedCallback = __esmMin((() => {
	require_react();
})), isBrowser;
var init_const = __esmMin((() => {
	isBrowser = typeof globalThis !== "undefined" && typeof navigator !== "undefined" && typeof document !== "undefined";
}));
var init_useRafCallback = __esmMin((() => {
	require_react();
}));
var init_useThrottledCallback = __esmMin((() => {
	require_react();
}));
var init_useConditionalEffect = __esmMin((() => {
	require_react();
}));
//#endregion
//#region ../../node_modules/@react-hookz/web/dist/util/misc.js
function on(object, ...args) {
	object?.addEventListener?.(...args);
}
function off(object, ...args) {
	object?.removeEventListener?.(...args);
}
var hasOwnProperty, yieldTrue, yieldFalse;
var init_misc = __esmMin((() => {
	hasOwnProperty = (object, property) => Object.hasOwn(object, property);
	yieldTrue = () => true;
	yieldFalse = () => false;
}));
var init_useCustomCompareEffect = __esmMin((() => {
	require_react();
}));
var init_useDebouncedEffect = __esmMin((() => {
	require_react();
}));
//#endregion
//#region ../../node_modules/@ver0/deep-equal/dist/is-equal.js
var valueOf, toString;
var init_is_equal = __esmMin((() => {
	({valueOf, toString} = Object.prototype);
}));
var init_useDeepCompareEffect = __esmMin((() => {
	init_is_equal();
	require_react();
}));
var init_useFirstMountState = __esmMin((() => {
	require_react();
}));
//#endregion
//#region ../../node_modules/@react-hookz/web/dist/useIsMounted/index.js
/**
* Returns a function that returns the current mount state. This hook is useful when you have to
* detect component mount state within async effects.
*
* @param initialValue Initial value.
*
* @return Function that returns `true` only if the component is mounted.
*/
function useIsMounted(initialValue = false) {
	const isMounted = (0, import_react$45.useRef)(initialValue);
	const get = (0, import_react$45.useCallback)(() => isMounted.current, []);
	(0, import_react$45.useEffect)(() => {
		isMounted.current = true;
		return () => {
			isMounted.current = false;
		};
	}, []);
	return get;
}
var import_react$45;
var init_useIsMounted = __esmMin((() => {
	import_react$45 = /* @__PURE__ */ __toESM(require_react(), 1);
}));
var init_useIsomorphicLayoutEffect = __esmMin((() => {
	require_react();
}));
var init_useMountEffect = __esmMin((() => {
	require_react();
}));
var init_useRafEffect = __esmMin((() => {
	require_react();
}));
var init_useRerender = __esmMin((() => {
	require_react();
}));
var init_useThrottledEffect = __esmMin((() => {
	require_react();
}));
var init_useUpdateEffect = __esmMin((() => {
	require_react();
}));
var init_useLifecycleLogger = __esmMin((() => {
	require_react();
}));
var init_useIntervalEffect = __esmMin((() => {
	require_react();
}));
var init_useTimeoutEffect = __esmMin((() => {
	require_react();
}));
var init_useControlledRerenderState = __esmMin((() => {
	require_react();
}));
var init_useMediatedState = __esmMin((() => {
	require_react();
}));
var init_useCounter = __esmMin((() => {
	require_react();
}));
var init_useDebouncedState = __esmMin((() => {
	require_react();
}));
var init_useCustomCompareMemo = __esmMin((() => {
	require_react();
}));
//#endregion
//#region ../../node_modules/@react-hookz/web/dist/useDeepCompareMemo/index.js
var init_useDeepCompareMemo = __esmMin((() => {
	init_is_equal();
}));
var init_useFunctionalState = __esmMin((() => {
	require_react();
}));
var init_useList = __esmMin((() => {
	require_react();
}));
var init_useMap = __esmMin((() => {
	require_react();
	Map.prototype;
}));
var init_usePrevious = __esmMin((() => {
	require_react();
}));
var init_usePreviousDistinct = __esmMin((() => {
	require_react();
}));
var init_useQueue = __esmMin((() => {
	require_react();
}));
var init_useRafState = __esmMin((() => {
	require_react();
}));
var init_useRenderCount = __esmMin((() => {
	require_react();
}));
var init_useSet = __esmMin((() => {
	require_react();
	Set.prototype;
}));
var init_useToggle = __esmMin((() => {
	require_react();
}));
var init_useThrottledState = __esmMin((() => {
	require_react();
}));
var init_useValidator = __esmMin((() => {
	require_react();
})), navigator$1;
var init_useNetworkState = __esmMin((() => {
	require_react();
	init_const();
	navigator$1 = isBrowser ? globalThis.navigator : void 0;
	navigator$1 && (navigator$1.connection ?? navigator$1.mozConnection ?? navigator$1.webkitConnection);
})), init_usePermission = __esmMin((() => {
	require_react();
}));
var init_useVibrate = __esmMin((() => {
	require_react();
	init_const();
	!isBrowser || navigator.vibrate;
}));
var init_useHookableRef = __esmMin((() => {
	require_react();
}));
var init_useLocalStorageValue = __esmMin((() => {
	init_const();
	try {
		isBrowser && Boolean(globalThis.localStorage);
	} catch {}
}));
var init_useSessionStorageValue = __esmMin((() => {
	init_const();
	try {
		isBrowser && Boolean(globalThis.sessionStorage);
	} catch {}
}));
var init_useAsync = __esmMin((() => {
	require_react();
}));
var init_useAsyncAbortable = __esmMin((() => {
	require_react();
}));
var init_useIntersectionObserver = __esmMin((() => {
	require_react();
}));
var init_useResizeObserver = __esmMin((() => {
	require_react();
}));
var init_useMeasure = __esmMin((() => {
	require_react();
}));
var init_useMediaQuery = __esmMin((() => {
	require_react();
}));
//#endregion
//#region ../../node_modules/@react-hookz/web/dist/useEventListener/index.js
/**
*  An HTML element or ref object containing an HTML element.
*
* @param target An HTML element or ref object containing an HTML element.
* @param params Parameters specific to the target element's `addEventListener` method. Commonly
* something like `[eventName, listener, options]`.
*/
function useEventListener(target, ...params) {
	const isMounted = useIsMounted();
	const listenerRef = useSyncedRef(params[1]);
	const eventListener = (0, import_react$8.useMemo)(() => function(...args) {
		if (!isMounted()) return;
		if (typeof listenerRef.current === "function") listenerRef.current.apply(this, args);
		else if (typeof listenerRef.current.handleEvent === "function") listenerRef.current.handleEvent.apply(this, args);
	}, []);
	(0, import_react$8.useEffect)(() => {
		const tgt = isRefObject(target) ? target.current : target;
		if (!tgt) return;
		const restParams = params.slice(2);
		on(tgt, params[0], eventListener, ...restParams);
		return () => {
			off(tgt, params[0], eventListener, ...restParams);
		};
	}, [target, params[0]]);
}
function isRefObject(target) {
	return target !== null && typeof target === "object" && hasOwnProperty(target, "current");
}
var import_react$8;
var init_useEventListener = __esmMin((() => {
	import_react$8 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_useIsMounted();
	init_useSyncedRef();
	init_misc();
}));
//#endregion
//#region ../../node_modules/@react-hookz/web/dist/useKeyboardEvent/index.js
/**
* Invokes a callback when a keyboard event occurs on the chosen target element.
*
* @param keyOrPredicate Filters key presses on which `callback` is invoked.
* @param callback Function to call when a key is pressed and `keyOrPredicate` matches positive.
* @param deps Dependencies list that is passed to the underlying `useMemo`.
* @param options Hook options.
*/
function useKeyboardEvent(keyOrPredicate, callback, deps = [], options = {}) {
	const { event = "keydown", target = WINDOW_OR_NULL, eventOptions } = options;
	const cbRef = useSyncedRef(callback);
	useEventListener(target, event, (0, import_react$7.useMemo)(() => {
		const predicate = createKeyPredicate(keyOrPredicate);
		return function(ev) {
			if (predicate(ev)) cbRef.current.call(this, ev);
		};
	}, deps), eventOptions);
}
var import_react$7, createKeyPredicate, WINDOW_OR_NULL;
var init_useKeyboardEvent = __esmMin((() => {
	import_react$7 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_useEventListener();
	init_useSyncedRef();
	init_const();
	init_misc();
	createKeyPredicate = (keyFilter) => {
		if (typeof keyFilter === "function") return keyFilter;
		if (typeof keyFilter === "string") return (ev) => ev.key === keyFilter;
		return keyFilter ? yieldTrue : yieldFalse;
	};
	WINDOW_OR_NULL = isBrowser ? globalThis : null;
}));
var init_useDocumentVisibility = __esmMin((() => {
	require_react();
}));
//#endregion
//#region ../../node_modules/@react-hookz/web/dist/useScreenOrientation/index.js
var init_useScreenOrientation = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@react-hookz/web/dist/useClickOutside/index.js
/**
* Triggers a callback when the user clicks outside a target element.
*
* @param ref React ref object containing the target HTML element.
* @param callback Callback invoked when the user clicks outside the target element.
* @param events List of events that will be used as triggers for the outside click. Default:
* 'mousedown', 'touchstart'
*/
function useClickOutside(ref, callback, events = DEFAULT_EVENTS) {
	const cbRef = useSyncedRef(callback);
	const refRef = useSyncedRef(ref);
	(0, import_react$5.useEffect)(() => {
		function handler(event) {
			if (!refRef.current.current) return;
			const { target: evtTarget } = event;
			const cb = cbRef.current;
			if (!evtTarget || Boolean(evtTarget) && !refRef.current.current.contains(evtTarget)) cb.call(this, event);
		}
		for (const name of events) on(document, name, handler, { passive: true });
		return () => {
			for (const name of events) off(document, name, handler, { passive: true });
		};
	}, [...events]);
}
var import_react$5, DEFAULT_EVENTS;
var init_useClickOutside = __esmMin((() => {
	import_react$5 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_useSyncedRef();
	init_misc();
	DEFAULT_EVENTS = ["mousedown", "touchstart"];
}));
var init_useWindowSize = __esmMin((() => {
	require_react();
}));
//#endregion
//#region ../../node_modules/@react-hookz/web/dist/index.js
var init_dist = __esmMin((() => {
	init_useDebouncedCallback();
	init_useRafCallback();
	init_useThrottledCallback();
	init_useConditionalEffect();
	init_useCustomCompareEffect();
	init_useDebouncedEffect();
	init_useDeepCompareEffect();
	init_useFirstMountState();
	init_useIsMounted();
	init_useIsomorphicLayoutEffect();
	init_useMountEffect();
	init_useRafEffect();
	init_useRerender();
	init_useThrottledEffect();
	init_useUnmountEffect();
	init_useUpdateEffect();
	init_useLifecycleLogger();
	init_useIntervalEffect();
	init_useTimeoutEffect();
	init_useControlledRerenderState();
	init_useCounter();
	init_useDebouncedState();
	init_useDeepCompareMemo();
	init_useFunctionalState();
	init_useList();
	init_useMap();
	init_useMediatedState();
	init_usePrevious();
	init_usePreviousDistinct();
	init_useQueue();
	init_useRafState();
	init_useRenderCount();
	init_useSet();
	init_useToggle();
	init_useThrottledState();
	init_useValidator();
	init_useNetworkState();
	init_usePermission();
	init_useVibrate();
	init_useSyncedRef();
	init_useHookableRef();
	init_useCustomCompareMemo();
	init_useLocalStorageValue();
	init_useSessionStorageValue();
	init_useAsync();
	init_useAsyncAbortable();
	init_useIntersectionObserver();
	init_useResizeObserver();
	init_useMeasure();
	init_useMediaQuery();
	init_useKeyboardEvent();
	init_useDocumentVisibility();
	init_useScreenOrientation();
	init_useClickOutside();
	init_useEventListener();
	init_useWindowSize();
	init_const();
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-plugin-footnote/dist/components/footnote-editor.less
var init_footnote_editor$1 = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-plugin-footnote/dist/components/footnote-editor.mjs
function u({ open: u, mode: d, anchor: f$1, existingDefs: p, initialContent: m = ``, onSubmit: h, onSelectExisting: g, onCancel: _ }) {
	let v = o$4(), [y, b] = (0, import_react$3.useState)(m), [x, S] = (0, import_react$3.useState)(!1), C = (0, import_react$3.useRef)(null);
	(0, import_react$3.useEffect)(() => {
		u && (b(m), S(!1), requestAnimationFrame(() => {
			C.current?.focus(), C.current?.select();
		}));
	}, [u, m]);
	let { position: w, popoverRef: T } = f({
		anchor: f$1,
		container: null,
		offset: { y: 6 },
		followScroll: !1,
		deps: [f$1, u]
	});
	useKeyboardEvent(`Escape`, () => {
		u && _();
	}), useClickOutside(T, () => {
		u && _();
	});
	let E = (0, import_react$3.useCallback)(() => {
		let e = y.trim();
		if (!e) {
			_();
			return;
		}
		h(e);
	}, [
		y,
		h,
		_
	]), D = (0, import_react$3.useCallback)((e) => {
		e.key === `Enter` && !e.shiftKey && (e.preventDefault(), E());
	}, [E]);
	if (!u || !f$1) return null;
	let O = w === null, k = d === `insert` ? v(`footnote.modal.insert`, `插入`) : v(`footnote.modal.save`, `保存`), A = y.trim().length > 0;
	return import_react_dom$1.createPortal(import_react$3.createElement(`div`, {
		ref: T,
		className: `sc-footnote-popover`,
		style: {
			top: w?.top ?? 0,
			left: w?.left ?? 0,
			visibility: O ? `hidden` : `visible`
		}
	}, import_react$3.createElement(`textarea`, {
		ref: C,
		className: `sc-footnote-popover__textarea`,
		value: y,
		onChange: (e) => b(e.target.value),
		onKeyDown: D,
		placeholder: v(`footnote.modal.placeholder`, `输入脚注内容`),
		spellCheck: !1
	}), d === `insert` && g && import_react$3.createElement(import_react$3.Fragment, null, import_react$3.createElement(`div`, { className: `sc-footnote-popover__divider` }), import_react$3.createElement(`button`, {
		type: `button`,
		className: `sc-footnote-popover__choose`,
		onClick: () => S((e) => !e)
	}, import_react$3.createElement(`span`, null, v(`footnote.modal.choose`, `或者 选择当前页面已有脚注`)), import_react$3.createElement(`span`, { className: `sc-footnote-popover__choose__chevron` }, x ? `⌃` : `›`)), x && import_react$3.createElement(`div`, { className: `sc-footnote-popover__list` }, p.length === 0 ? import_react$3.createElement(`div`, { className: `sc-footnote-popover__empty` }, v(`footnote.modal.empty`, `暂无已有脚注`)) : p.map((e) => import_react$3.createElement(`button`, {
		type: `button`,
		key: e.fnId,
		className: `sc-footnote-popover__item`,
		onClick: () => g(e.fnId)
	}, import_react$3.createElement(`span`, { className: `sc-footnote-popover__item__num` }, e.number, `.`), import_react$3.createElement(`span`, { className: `sc-footnote-popover__item__preview` }, e.preview || `（空内容）`))))), import_react$3.createElement(`div`, { className: `sc-footnote-popover__footer` }, import_react$3.createElement(`button`, {
		type: `button`,
		className: `sc-footnote-popover__btn sc-footnote-popover__btn--ghost`,
		onClick: _
	}, v(`footnote.modal.cancel`, `取消`)), import_react$3.createElement(`button`, {
		type: `button`,
		className: `sc-footnote-popover__btn sc-footnote-popover__btn--primary`,
		onClick: E,
		disabled: !A
	}, k))), document.body);
}
var import_react$3, import_react_dom$1;
var init_footnote_editor = __esmMin((() => {
	init_i18n();
	init_dist$1();
	import_react$3 = /* @__PURE__ */ __toESM(require_react(), 1);
	import_react_dom$1 = /* @__PURE__ */ __toESM(require_react_dom(), 1);
	init_dist();
	init_footnote_editor$1();
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-plugin-footnote/dist/components/footnote-list.less
var init_footnote_list$1 = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-plugin-footnote/dist/components/footnote-list.mjs
function s() {
	let s = o$2(), c = s$2(s), l = o$4(), u = (0, import_react$2.useCallback)((e) => {
		e && J.scrollToBlock(s, e, {
			align: `center`,
			highlight: !0
		});
	}, [s]);
	return c.defs.length === 0 ? null : import_react$2.createElement(`div`, { className: `sc-footnote-list` }, import_react$2.createElement(`h4`, { className: `sc-footnote-list__title` }, l(`footnote.list.title`, `脚注`)), import_react$2.createElement(`ol`, { className: `sc-footnote-list__items` }, c.defs.map((e) => import_react$2.createElement(`li`, {
		key: e.fnId,
		className: `sc-footnote-list__item`,
		"data-footnote-id": e.fnId
	}, import_react$2.createElement(`span`, { className: `sc-footnote-list__item__num` }, e.number, `.`), import_react$2.createElement(`span`, { className: `sc-footnote-list__item__content` }, e.preview || `（空内容）`), import_react$2.createElement(`button`, {
		type: `button`,
		className: `sc-footnote-list__item__back`,
		title: l(`footnote.list.backToRef`, `返回原文`),
		disabled: !e.firstRefBlockId,
		onClick: () => u(e.firstRefBlockId)
	}, import_react$2.createElement(CornerDownLeft, { size: 14 }))))));
}
var import_react$2;
var init_footnote_list = __esmMin((() => {
	init_footnote_context();
	init_i18n();
	init_dist$1();
	init_lucide_react();
	import_react$2 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_footnote_list$1();
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-plugin-footnote/dist/helpers/collect-inline-refs.mjs
function t$1(t) {
	let n = t[1];
	if (!n) return null;
	for (let [t, r] of n) if (t === e.Footnote && typeof r == `string` && r) return r;
	return null;
}
function n$2(e, n, r) {
	let i = e.getById(n);
	if (!i) return;
	let a = i.props?.title ?? [];
	for (let e of a) {
		let i = t$1(e);
		i && r.push({
			fnId: i,
			blockId: n
		});
	}
}
function r$2(e, t) {
	let r = e.recordView, i = [], a = [t], o = /* @__PURE__ */ new Set();
	for (; a.length;) {
		let e = a.pop();
		if (!e || o.has(e)) continue;
		o.add(e), n$2(r, e, i);
		let t = r.childrenIds(e);
		for (let e = t.length - 1; e >= 0; --e) a.push(t[e]);
	}
	return i;
}
var init_collect_inline_refs = __esmMin((() => {
	init_dist$1();
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-plugin-footnote/dist/compute-footnote-data.mjs
function n$1(e, t) {
	let n = e.recordView, r = [...n.childrenIds(t)];
	for (let e of r) if (n.getById(e)?.type === `footnote_list`) {
		let t = [];
		for (let r of n.childrenIds(e)) {
			let e = n.getById(r);
			e?.type === `footnote_def` && t.push(e);
		}
		return t;
	}
	let i = [];
	for (let e of n.valuesOfTable(`block`)) e.type === `footnote_def` && i.push(e);
	return i;
}
function r$1(e, t) {
	let n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
	for (let { fnId: t, blockId: a } of e) i.set(t, (i.get(t) ?? 0) + 1), r.has(t) || r.set(t, a), n.has(t) || n.set(t, n.size + 1);
	for (let e of t) {
		let t = e.props?.fnId ?? ``;
		t && !n.has(t) && n.set(t, n.size + 1);
	}
	return {
		numbers: n,
		firstRefByFnId: r,
		refCounts: i
	};
}
function i$1(e, t) {
	let n = e.recordView, r = [], i = [...n.childrenIds(t)];
	for (; i.length;) {
		let e = i.shift();
		if (!e) continue;
		let t = n.getById(e);
		if (!t) continue;
		let a = (t.props?.title ?? []).map(([e]) => e).join(``);
		a && r.push(a);
		for (let t of n.childrenIds(e)) i.push(t);
	}
	return r.join(` `).replace(/\s+/g, ` `).trim();
}
function a(a, o) {
	let s = n$1(a, o), c = r$2(a, o);
	if (s.length === 0 && c.length === 0) return t;
	let { numbers: l, firstRefByFnId: u, refCounts: d } = r$1(c, s), f = /* @__PURE__ */ new Map();
	for (let e of s) {
		let t = e.props?.fnId ?? ``;
		t && f.set(t, e);
	}
	let p = [], m = [];
	for (let [e, t] of l.entries()) {
		let n = f.get(e);
		if (!n) {
			m.push(e);
			continue;
		}
		p.push({
			recordId: n.id,
			fnId: e,
			number: t,
			childRecordIds: [...a.recordView.childrenIds(n.id)],
			preview: i$1(a, n.id),
			refCount: d.get(e) ?? 0,
			firstRefBlockId: u.get(e) ?? null
		});
	}
	return p.sort((e, t) => e.number - t.number), {
		defs: p,
		numbers: l,
		hasAny: p.length > 0 || c.length > 0,
		orphanRefIds: m
	};
}
var t;
var init_compute_footnote_data = __esmMin((() => {
	init_collect_inline_refs();
	t = {
		defs: [],
		numbers: /* @__PURE__ */ new Map(),
		hasAny: !1,
		orphanRefIds: []
	};
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-plugin-footnote/dist/hooks/use-footnotes.mjs
function i(i) {
	let a$6 = o$2();
	return (0, import_shim.useSyncExternalStore)((e) => a$6.subscribe(e), () => a$6.recordView), (0, import_react$1.useMemo)(() => a(a$6, i), [i, a$6]);
}
var import_react$1, import_shim;
var init_use_footnotes = __esmMin((() => {
	init_compute_footnote_data();
	init_dist$1();
	import_react$1 = /* @__PURE__ */ __toESM(require_react(), 1);
	import_shim = require_shim();
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-plugin-footnote/dist/footnote-plugin-component.mjs
function y() {
	let y = o$2(), b = a$3(), x = o$3(), { i18n: S } = v$1(), [C, w] = (0, import_react.useState)(v), [T, E] = (0, import_react.useState)(null);
	s$3(S);
	let D = i(b);
	(0, import_react.useEffect)(() => {
		a$4(y, D);
	}, [y, D]), (0, import_react.useEffect)(() => {
		let e = x.getRootEl();
		if (!e) return;
		let t = !1, n = null, r = () => {
			let e = x.getPageBottomEl();
			if (!e) return !1;
			let r = e.querySelector(`:scope > .sc-footnote-list-mount`);
			if (r) n = r, t = !1;
			else {
				let r = document.createElement(`div`);
				r.className = `sc-footnote-list-mount`, e.appendChild(r), n = r, t = !0;
			}
			return E(n), !0;
		};
		if (r()) return () => {
			t && n?.parentNode && n.parentNode.removeChild(n), E(null);
		};
		let i = new MutationObserver(() => {
			r() && i.disconnect();
		});
		return i.observe(e, {
			childList: !0,
			subtree: !0
		}), () => {
			i.disconnect(), t && n?.parentNode && n.parentNode.removeChild(n), E(null);
		};
	}, [x]), (0, import_react.useEffect)(() => t$2(y, (e) => {
		let { ctx: t, resolve: n } = e;
		w({
			open: !0,
			mode: `insert`,
			anchor: t.anchorRect ? {
				top: t.anchorRect.top,
				bottom: t.anchorRect.bottom,
				left: t.anchorRect.left,
				right: t.anchorRect.right
			} : null,
			insertResolve: n
		});
	}), [y]), (0, import_react.useEffect)(() => i$3(y, (e) => {
		let t = [...y.recordView.childrenIds(e.defRecordId)].map((e) => (y.recordView.getById(e)?.props?.title ?? []).map(([e]) => e).join(``)).join(`
`);
		w({
			open: !0,
			mode: `edit`,
			anchor: x.getRootEl()?.querySelector(`[data-footnote-ref-id="${e.fnId}"]`) ?? null,
			editDefRecordId: e.defRecordId,
			initialContent: t
		});
	}), [y, x]);
	let O = (0, import_react.useCallback)((e) => {
		if (C.mode === `insert` && C.insertResolve) {
			let t = v$2(8);
			C.insertResolve({
				fnId: t,
				content: e,
				rootId: b
			});
		} else C.mode === `edit` && C.editDefRecordId && a$5(y, C.editDefRecordId, e);
		w(v);
	}, [
		y,
		C,
		b
	]), k = (0, import_react.useCallback)((e) => {
		C.mode === `insert` && C.insertResolve && C.insertResolve(e), w(v);
	}, [C]), A = (0, import_react.useCallback)(() => {
		C.mode === `insert` && C.insertResolve && C.insertResolve(null), w(v);
	}, [C]);
	return import_react.createElement(import_react.Fragment, null, import_react.createElement(u, {
		open: C.open,
		mode: C.mode,
		anchor: C.anchor,
		existingDefs: D.defs,
		initialContent: C.initialContent,
		onSubmit: O,
		onSelectExisting: k,
		onCancel: A
	}), T ? (0, import_react_dom.createPortal)(import_react.createElement(s, null), T) : null);
}
var import_react, import_react_dom, v;
//#endregion
__esmMin((() => {
	init_events();
	init_footnote_context();
	init_i18n();
	init_footnote_ops();
	init_footnote_editor();
	init_footnote_list();
	init_use_footnotes();
	init_dist$1();
	import_react = /* @__PURE__ */ __toESM(require_react(), 1);
	import_react_dom = /* @__PURE__ */ __toESM(require_react_dom(), 1);
	v = {
		open: !1,
		mode: `insert`,
		anchor: null
	};
}))();
export { y as default };
