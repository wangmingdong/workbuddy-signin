import { n as __esmMin, t as __commonJSMin } from "./chunk-BRZcfu7K.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { E as v, ft as v$1, mt as e$6, nt as O, t as init_dist } from "./dist-BfO6AyhP.js";
//#region ../../node_modules/@tencent/smart-doc-plugin-footnote/dist/events.mjs
function t$1(t, n) {
	return t.onPlugin(e$5, n);
}
function n$1(t, n) {
	return new Promise((r) => {
		t.emitPlugin(e$5, {
			ctx: n,
			resolve: r
		});
	});
}
function i$2(e, t) {
	return e.onPlugin(r$2, t);
}
function a$3(e, t) {
	e.emitPlugin(r$2, t);
}
var e$5, r$2;
var init_events = __esmMin((() => {
	e$5 = `footnote:requestInsert`;
	r$2 = `footnote:openEditModal`;
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-plugin-footnote/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.production.js
/**
* @license React
* use-sync-external-store-shim.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_use_sync_external_store_shim_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var React = require_react();
	function is(x, y) {
		return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
	}
	var objectIs = "function" === typeof Object.is ? Object.is : is, useState = React.useState, useEffect = React.useEffect, useLayoutEffect = React.useLayoutEffect, useDebugValue = React.useDebugValue;
	function useSyncExternalStore$2(subscribe, getSnapshot) {
		var value = getSnapshot(), _useState = useState({ inst: {
			value,
			getSnapshot
		} }), inst = _useState[0].inst, forceUpdate = _useState[1];
		useLayoutEffect(function() {
			inst.value = value;
			inst.getSnapshot = getSnapshot;
			checkIfSnapshotChanged(inst) && forceUpdate({ inst });
		}, [
			subscribe,
			value,
			getSnapshot
		]);
		useEffect(function() {
			checkIfSnapshotChanged(inst) && forceUpdate({ inst });
			return subscribe(function() {
				checkIfSnapshotChanged(inst) && forceUpdate({ inst });
			});
		}, [subscribe]);
		useDebugValue(value);
		return value;
	}
	function checkIfSnapshotChanged(inst) {
		var latestGetSnapshot = inst.getSnapshot;
		inst = inst.value;
		try {
			var nextValue = latestGetSnapshot();
			return !objectIs(inst, nextValue);
		} catch (error) {
			return !0;
		}
	}
	function useSyncExternalStore$1(subscribe, getSnapshot) {
		return getSnapshot();
	}
	var shim = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? useSyncExternalStore$1 : useSyncExternalStore$2;
	exports.useSyncExternalStore = void 0 !== React.useSyncExternalStore ? React.useSyncExternalStore : shim;
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-plugin-footnote/node_modules/use-sync-external-store/shim/index.js
var require_shim = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_use_sync_external_store_shim_production();
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-plugin-footnote/dist/hooks/footnote-context.mjs
function i$1(e) {
	let t = r$1.get(e);
	return t || (t = /* @__PURE__ */ new Set(), r$1.set(e, t)), t;
}
function a$2(e, t) {
	n.set(e, t);
	for (let t of i$1(e)) t();
}
function o$2(e) {
	return n.get(e) ?? t;
}
function s$1(t) {
	return (0, import_shim.useSyncExternalStore)((e) => {
		let n = i$1(t);
		return n.add(e), () => {
			n.delete(e);
		};
	}, () => o$2(t));
}
var import_shim, t, n, r$1;
var init_footnote_context = __esmMin((() => {
	import_shim = require_shim();
	t = {
		defs: [],
		numbers: /* @__PURE__ */ new Map(),
		hasAny: !1,
		orphanRefIds: []
	}, n = /* @__PURE__ */ new WeakMap(), r$1 = /* @__PURE__ */ new WeakMap();
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-plugin-footnote/dist/locales/en-US.mjs
var e$3;
var init_en_US = __esmMin((() => {
	e$3 = {
		"footnote.menu.label": `Footnote`,
		"footnote.modal.title": `Insert footnote`,
		"footnote.modal.placeholder": `Enter footnote content`,
		"footnote.modal.choose": `Or pick an existing footnote on this page`,
		"footnote.modal.empty": `No existing footnotes`,
		"footnote.modal.cancel": `Cancel`,
		"footnote.modal.insert": `Insert`,
		"footnote.popover.hint": `Enter to confirm · Esc to cancel`,
		"footnote.popover.edit": `Edit`,
		"footnote.popover.missing": `Footnote content is undefined`,
		"footnote.list.title": `Footnotes`,
		"footnote.list.backToRef": `Back to reference`
	};
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-plugin-footnote/dist/locales/ja-JP.mjs
var e$2;
var init_ja_JP = __esmMin((() => {
	e$2 = {
		"footnote.menu.label": `脚注`,
		"footnote.modal.title": `脚注を挿入`,
		"footnote.modal.placeholder": `脚注の内容を入力`,
		"footnote.modal.choose": `または このページの既存の脚注から選択`,
		"footnote.modal.empty": `既存の脚注がありません`,
		"footnote.modal.cancel": `キャンセル`,
		"footnote.modal.insert": `挿入`,
		"footnote.popover.hint": `Enter で確定 · Esc でキャンセル`,
		"footnote.popover.edit": `編集`,
		"footnote.popover.missing": `脚注の内容が未定義です`,
		"footnote.list.title": `脚注`,
		"footnote.list.backToRef": `本文に戻る`
	};
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-plugin-footnote/dist/locales/zh-CN.mjs
var e$1;
var init_zh_CN = __esmMin((() => {
	e$1 = {
		"footnote.menu.label": `脚注`,
		"footnote.modal.title": `插入脚注`,
		"footnote.modal.placeholder": `输入脚注内容`,
		"footnote.modal.choose": `或者 选择当前页面已有脚注`,
		"footnote.modal.empty": `暂无已有脚注`,
		"footnote.modal.cancel": `取消`,
		"footnote.modal.insert": `插入`,
		"footnote.popover.hint": `回车确认 · Esc 取消`,
		"footnote.popover.edit": `修改`,
		"footnote.popover.missing": `脚注内容未定义`,
		"footnote.list.title": `脚注`,
		"footnote.list.backToRef": `返回原文`
	};
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-plugin-footnote/dist/locales/zh-HK.mjs
var e;
var init_zh_HK = __esmMin((() => {
	e = {
		"footnote.menu.label": `腳註`,
		"footnote.modal.title": `插入腳註`,
		"footnote.modal.placeholder": `輸入腳註內容`,
		"footnote.modal.choose": `或者 選擇當前頁面已有腳註`,
		"footnote.modal.empty": `暫無已有腳註`,
		"footnote.modal.cancel": `取消`,
		"footnote.modal.insert": `插入`,
		"footnote.popover.hint": `Enter 確認 · Esc 取消`,
		"footnote.popover.edit": `修改`,
		"footnote.popover.missing": `腳註內容未定義`,
		"footnote.list.title": `腳註`,
		"footnote.list.backToRef": `返回原文`
	};
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-plugin-footnote/dist/i18n/index.mjs
function o$1() {
	return v(a$1).t;
}
function s(i) {
	i.addResourceBundle(`zh-CN`, a$1, e$1, !0, !1), i.addResourceBundle(`zh-HK`, a$1, e, !0, !1), i.addResourceBundle(`en-US`, a$1, e$3, !0, !1), i.addResourceBundle(`ja-JP`, a$1, e$2, !0, !1);
}
var a$1;
var init_i18n = __esmMin((() => {
	init_en_US();
	init_ja_JP();
	init_zh_CN();
	init_zh_HK();
	init_dist();
	a$1 = `sc-editor-plugin-footnote`;
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-plugin-footnote/dist/helpers/footnote-ops.mjs
function r(e, n) {
	let r = [...e.recordView.childrenIds(n)];
	for (let t of r) if (e.recordView.getById(t)?.type === `footnote_list`) return t;
	let i = ``;
	if (e.dispatch((r) => {
		i = O.appendChildBlock(e, r, n, `footnote_list`).newBlockId ?? ``;
	}), !i) throw Error(`创建 footnote_list 容器失败`);
	return i;
}
function i(i, a, o, s) {
	let c = s ?? v$1(8), l = r(i, o), u = a ? [[a]] : [];
	return i.dispatch((n) => {
		let r = O.appendChildBlock(i, n, l, `footnote_def`, [], { fnId: c }).newBlockId;
		r && O.appendChildBlock(i, n, r, e$6.Text, u);
	}), c;
}
function a(n, r, i) {
	if (!n.recordView.getById(r)) return;
	let a = i ? [[i]] : [], o = [...n.recordView.childrenIds(r)][0];
	n.dispatch((i) => {
		o ? O.updateBlockProps(n, i, o, { title: a }) : O.appendChildBlock(n, i, r, e$6.Text, a);
	});
}
function o(e, n) {
	e.dispatch((r) => {
		O.deleteBlock(e, r, n);
	});
}
var init_footnote_ops = __esmMin((() => {
	init_dist();
}));
//#endregion
export { init_i18n as a, a$2 as c, require_shim as d, a$3 as f, t$1 as g, n$1 as h, o as i, init_footnote_context as l, init_events as m, i as n, o$1 as o, i$2 as p, init_footnote_ops as r, s, a as t, s$1 as u };
