import { n as __esmMin } from "./chunk-BRZcfu7K.js";
//#region ../../node_modules/hast-util-whitespace/lib/index.js
/**
* Check if the given value is *inter-element whitespace*.
*
* @param {Nodes | string} thing
*   Thing to check (`Node` or `string`).
* @returns {boolean}
*   Whether the `value` is inter-element whitespace (`boolean`): consisting of
*   zero or more of space, tab (`\t`), line feed (`\n`), carriage return
*   (`\r`), or form feed (`\f`); if a node is passed it must be a `Text` node,
*   whose `value` field is checked.
*/
function whitespace(thing) {
	return typeof thing === "object" ? thing.type === "text" ? empty(thing.value) : false : empty(thing);
}
/**
* @param {string} value
* @returns {boolean}
*/
function empty(value) {
	return value.replace(re, "") === "";
}
var re;
var init_lib = __esmMin((() => {
	re = /[ \t\n\f\r]/g;
}));
//#endregion
//#region ../../node_modules/hast-util-whitespace/index.js
var init_hast_util_whitespace = __esmMin((() => {
	init_lib();
}));
//#endregion
export { whitespace as n, init_hast_util_whitespace as t };
