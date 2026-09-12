import { n as __esmMin } from "./chunk-BRZcfu7K.js";
import { C as init_mermaid_59c9be08, Dt as require_dist, T as lineBreakRegex } from "./mermaid-59c9be08-DUdjYWP7.js";
//#region ../../node_modules/mermaid/dist/svgDrawCommon-70a69047.js
var import_dist, drawRect, drawBackgroundRect, drawText, drawImage, drawEmbeddedImage, getNoteRect, getTextObj;
var init_svgDrawCommon_70a69047 = __esmMin((() => {
	import_dist = require_dist();
	init_mermaid_59c9be08();
	drawRect = (element, rectData) => {
		const rectElement = element.append("rect");
		rectElement.attr("x", rectData.x);
		rectElement.attr("y", rectData.y);
		rectElement.attr("fill", rectData.fill);
		rectElement.attr("stroke", rectData.stroke);
		rectElement.attr("width", rectData.width);
		rectElement.attr("height", rectData.height);
		if (rectData.name) rectElement.attr("name", rectData.name);
		rectData.rx !== void 0 && rectElement.attr("rx", rectData.rx);
		rectData.ry !== void 0 && rectElement.attr("ry", rectData.ry);
		if (rectData.attrs !== void 0) for (const attrKey in rectData.attrs) rectElement.attr(attrKey, rectData.attrs[attrKey]);
		rectData.class !== void 0 && rectElement.attr("class", rectData.class);
		return rectElement;
	};
	drawBackgroundRect = (element, bounds) => {
		drawRect(element, {
			x: bounds.startx,
			y: bounds.starty,
			width: bounds.stopx - bounds.startx,
			height: bounds.stopy - bounds.starty,
			fill: bounds.fill,
			stroke: bounds.stroke,
			class: "rect"
		}).lower();
	};
	drawText = (element, textData) => {
		const nText = textData.text.replace(lineBreakRegex, " ");
		const textElem = element.append("text");
		textElem.attr("x", textData.x);
		textElem.attr("y", textData.y);
		textElem.attr("class", "legend");
		textElem.style("text-anchor", textData.anchor);
		textData.class !== void 0 && textElem.attr("class", textData.class);
		const tspan = textElem.append("tspan");
		tspan.attr("x", textData.x + textData.textMargin * 2);
		tspan.text(nText);
		return textElem;
	};
	drawImage = (elem, x, y, link) => {
		const imageElement = elem.append("image");
		imageElement.attr("x", x);
		imageElement.attr("y", y);
		const sanitizedLink = (0, import_dist.sanitizeUrl)(link);
		imageElement.attr("xlink:href", sanitizedLink);
	};
	drawEmbeddedImage = (element, x, y, link) => {
		const imageElement = element.append("use");
		imageElement.attr("x", x);
		imageElement.attr("y", y);
		const sanitizedLink = (0, import_dist.sanitizeUrl)(link);
		imageElement.attr("xlink:href", `#${sanitizedLink}`);
	};
	getNoteRect = () => {
		return {
			x: 0,
			y: 0,
			width: 100,
			height: 100,
			fill: "#EDF2AE",
			stroke: "#666",
			anchor: "start",
			rx: 0,
			ry: 0
		};
	};
	getTextObj = () => {
		return {
			x: 0,
			y: 0,
			width: 100,
			height: 100,
			"text-anchor": "start",
			style: "#666",
			textMargin: 0,
			rx: 0,
			ry: 0,
			tspan: true
		};
	};
}));
//#endregion
export { drawText as a, init_svgDrawCommon_70a69047 as c, drawRect as i, drawEmbeddedImage as n, getNoteRect as o, drawImage as r, getTextObj as s, drawBackgroundRect as t };
