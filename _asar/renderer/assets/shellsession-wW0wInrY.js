import { n as __esmMin } from "./chunk-BRZcfu7K.js";
import { n as shellscript_default, t as init_shellscript } from "./shellscript-BufYw77J.js";
//#region ../../node_modules/@shikijs/langs/dist/shellsession.mjs
var lang, shellsession_default;
//#endregion
__esmMin((() => {
	init_shellscript();
	lang = Object.freeze(JSON.parse("{\"displayName\":\"Shell Session\",\"fileTypes\":[\"sh-session\"],\"name\":\"shellsession\",\"patterns\":[{\"captures\":{\"1\":{\"name\":\"entity.other.prompt-prefix.shell-session\"},\"2\":{\"name\":\"punctuation.separator.prompt.shell-session\"},\"3\":{\"name\":\"source.shell\",\"patterns\":[{\"include\":\"source.shell\"}]}},\"match\":\"^(?:((?:\\\\(\\\\S+\\\\)\\\\s*)?(?:sh\\\\S*?|\\\\w+\\\\S+[:@]\\\\S+(?:\\\\s+\\\\S+)?|\\\\[\\\\S+?[:@]\\\\N+?].*?))\\\\s*)?([#$%>❯➜\\\\p{Greek}])\\\\s+(.*)$\"},{\"match\":\"^.+$\",\"name\":\"meta.output.shell-session\"}],\"scopeName\":\"text.shell-session\",\"embeddedLangs\":[\"shellscript\"],\"aliases\":[\"console\"]}"));
	shellsession_default = [...shellscript_default, lang];
}))();
export { shellsession_default as default };
