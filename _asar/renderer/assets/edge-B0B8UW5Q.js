import { n as __esmMin } from "./chunk-BRZcfu7K.js";
import { n as init_html, t as html_default } from "./html-DmjLxlal.js";
import { n as typescript_default, t as init_typescript } from "./typescript-CH8sHJ0O.js";
import html_derivative_default, { t as init_html_derivative } from "./html-derivative-BDj5PPb_.js";
//#region ../../node_modules/@shikijs/langs/dist/edge.mjs
var lang, edge_default;
//#endregion
__esmMin((() => {
	init_typescript();
	init_html();
	init_html_derivative();
	lang = Object.freeze(JSON.parse("{\"displayName\":\"Edge\",\"injections\":{\"text.html.edge - (meta.embedded | meta.tag | comment.block.edge), L:(text.html.edge meta.tag - (comment.block.edge | meta.embedded.block.edge)), L:(source.ts.embedded.html - (comment.block.edge | meta.embedded.block.edge))\":{\"patterns\":[{\"include\":\"#comment\"},{\"include\":\"#escapedMustache\"},{\"include\":\"#safeMustache\"},{\"include\":\"#mustache\"},{\"include\":\"#nonSeekableTag\"},{\"include\":\"#tag\"}]}},\"name\":\"edge\",\"patterns\":[{\"include\":\"text.html.basic\"},{\"include\":\"text.html.derivative\"}],\"repository\":{\"comment\":{\"begin\":\"\\\\{\\\\{--\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.definition.comment.begin.edge\"}},\"end\":\"--}}\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.definition.comment.end.edge\"}},\"name\":\"comment.block\"},\"escapedMustache\":{\"begin\":\"@\\\\{\\\\{\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.definition.comment.begin.edge\"}},\"end\":\"}}\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.definition.comment.end.edge\"}},\"name\":\"comment.block\"},\"mustache\":{\"begin\":\"\\\\{\\\\{\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.mustache.begin\"}},\"end\":\"}}\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.mustache.end\"}},\"name\":\"meta.embedded.block.javascript\",\"patterns\":[{\"include\":\"source.ts#expression\"}]},\"nonSeekableTag\":{\"captures\":{\"2\":{\"name\":\"support.function.edge\"}},\"match\":\"^(\\\\s*)((@{1,2})(!)?([.A-Z_a-z]+))(~)?$\",\"name\":\"meta.embedded.block.javascript\",\"patterns\":[{\"include\":\"source.ts#expression\"}]},\"safeMustache\":{\"begin\":\"\\\\{\\\\{\\\\{\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.mustache.begin\"}},\"end\":\"}}}\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.mustache.end\"}},\"name\":\"meta.embedded.block.javascript\",\"patterns\":[{\"include\":\"source.ts#expression\"}]},\"tag\":{\"begin\":\"^(\\\\s*)((@{1,2})(!)?([.A-Z_a-z]+)(\\\\s{0,2}))(\\\\()\",\"beginCaptures\":{\"2\":{\"name\":\"support.function.edge\"},\"7\":{\"name\":\"punctuation.paren.open\"}},\"end\":\"\\\\)\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.paren.close\"}},\"name\":\"meta.embedded.block.javascript\",\"patterns\":[{\"include\":\"source.ts#expression\"}]}},\"scopeName\":\"text.html.edge\",\"embeddedLangs\":[\"typescript\",\"html\",\"html-derivative\"]}"));
	edge_default = [
		...typescript_default,
		...html_default,
		...html_derivative_default,
		lang
	];
}))();
export { edge_default as default };
