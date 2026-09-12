import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { a as init_i18n, c as saveLocale, l as setLocale, n as getLocale, o as onLocaleChange, r as getSupportedLocales, u as t } from "./i18n-Bt_Wap4p.js";
//#region ../../packages/agent-ui/src/i18n/useI18n.ts
/**
* useI18n Hook
*
* @example
* ```tsx
* const { t, locale, setLocale } = useI18n();
*
* return (
*   <div>
*     <span>{t('conversation.newTask')}</span>
*     <select value={locale} onChange={e => setLocale(e.target.value)}>
*       {supportedLocales.map(l => (
*         <option key={l.value} value={l.value}>{l.label}</option>
*       ))}
*     </select>
*   </div>
* );
* ```
*/
function useI18n() {
	const [locale, setLocaleState] = (0, import_react.useState)(getLocale);
	(0, import_react.useEffect)(() => {
		return onLocaleChange((newLocale) => {
			setLocaleState(newLocale);
		});
	}, []);
	return {
		t,
		locale,
		setLocale: (0, import_react.useCallback)((newLocale, persist = true) => {
			if (persist) saveLocale(newLocale);
			else setLocale(newLocale);
		}, []),
		supportedLocales: (0, import_react.useMemo)(() => getSupportedLocales(), [])
	};
}
/**
* useTranslation Hook - 简化版本
*
* 返回一个响应式的翻译函数，当 locale 变化时函数引用会改变，
* 确保依赖此函数的 useMemo/useCallback 能够正确更新。
*
* @example
* ```tsx
* const t = useTranslation();
* return <span>{t('conversation.newTask')}</span>;
* ```
*/
function useTranslation() {
	const [locale, setLocaleState] = (0, import_react.useState)(getLocale);
	(0, import_react.useEffect)(() => {
		return onLocaleChange((newLocale) => {
			setLocaleState(newLocale);
		});
	}, []);
	return (0, import_react.useCallback)((key, params) => t(key, params), [locale]);
}
var import_react;
var init_useI18n = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_i18n();
}));
//#endregion
export { useI18n as n, useTranslation as r, init_useI18n as t };
