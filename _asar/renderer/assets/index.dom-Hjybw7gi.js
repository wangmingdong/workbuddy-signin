import { n as __esmMin } from "./chunk-BRZcfu7K.js";
//#region ../../node_modules/decode-named-character-reference/index.dom.js
/**
* @param {string} value
* @returns {string | false}
*/
function decodeNamedCharacterReference(value) {
	const characterReference = "&" + value + ";";
	element.innerHTML = characterReference;
	const character = element.textContent;
	if (character.charCodeAt(character.length - 1) === 59 && value !== "semi") return false;
	return character === characterReference ? false : character;
}
var element;
var init_index_dom = __esmMin((() => {
	element = document.createElement("i");
}));
//#endregion
export { init_index_dom as n, decodeNamedCharacterReference as t };
