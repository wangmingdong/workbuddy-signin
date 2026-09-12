import { n as __esmMin } from "./chunk-BRZcfu7K.js";
import jsx, { t as init_jsx } from "./jsx-DJAz9FpC.js";
import typescript, { t as init_typescript } from "./typescript-DG9O1Vif.js";
//#region ../../node_modules/refractor/lang/tsx.js
/** @param {Refractor} Prism */
function tsx(Prism) {
	Prism.register(jsx);
	Prism.register(typescript);
	(function(Prism) {
		var typescript = Prism.util.clone(Prism.languages.typescript);
		Prism.languages.tsx = Prism.languages.extend("jsx", typescript);
		delete Prism.languages.tsx["parameter"];
		delete Prism.languages.tsx["literal-property"];
		var tag = Prism.languages.tsx.tag;
		tag.pattern = RegExp(/(^|[^\w$]|(?=<\/))/.source + "(?:" + tag.pattern.source + ")", tag.pattern.flags);
		tag.lookbehind = true;
	})(Prism);
}
//#endregion
__esmMin((() => {
	init_jsx();
	init_typescript();
	tsx.displayName = "tsx";
	tsx.aliases = [];
}))();
export { tsx as default };
