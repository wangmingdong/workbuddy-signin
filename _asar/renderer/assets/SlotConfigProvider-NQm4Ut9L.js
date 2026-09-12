import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { a as init_i18n, n as getLocale, o as onLocaleChange } from "./i18n-Bt_Wap4p.js";
import { t as require_zustand } from "./zustand-BGHu9tpa.js";
import { n as init_vanilla, t as createStore } from "./vanilla-BfruURAe.js";
import { t as init_product_features, ut as useSlotSystemFeature } from "./product-features-N4Z0q4SS.js";
import { t as init_common } from "./common-Czfscgga.js";
import { i as useModuleHost } from "./module-host-context-CI9spvhq.js";
//#region ../../packages/agent-ui/src/modules/slot/slot-store.ts
var import_zustand, slotStore, useSlotStore;
var init_slot_store = __esmMin((() => {
	import_zustand = require_zustand();
	init_vanilla();
	slotStore = createStore(() => ({
		configs: {},
		loading: true
	}));
	useSlotStore = (selector) => (0, import_zustand.useStore)(slotStore, selector);
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/slot/SlotConfigProvider.tsx
/**
* 把 i18n 内部 locale（如 'zh-cn' / 'en'）转成 slot API 期望的 lang（'zh' / 'en'）。
*
* Desktop 主进程的 app.getLocale() 只反映系统语言，无法感知应用内 i18n 切换；
* 因此每次拉取必须由 renderer 把当前 i18n locale 显式带过去。
*/
function getCurrentLang() {
	return getLocale().toLowerCase().startsWith("zh") ? "zh" : "en";
}
function getValidCallIntervalSec(value) {
	return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : null;
}
function getBatchCallIntervalSec(configs) {
	return getValidCallIntervalSec(Object.values(configs).find((config) => Boolean(config))?.call_interval_sec) ?? DEFAULT_CALL_INTERVAL_SEC;
}
/**
* SlotConfigProvider — 作为 services 贡献点，负责数据拉取和轮询，写入 slotStore。
* 不再包裹 children，不再使用 React Context。
*/
function SlotConfigProvider() {
	const { facades, accountInfo } = useModuleHost();
	const slotSystemEnabled = useSlotSystemFeature();
	const mountedRef = (0, import_react.useRef)(true);
	const batchTimerRef = (0, import_react.useRef)(null);
	const fetchConfigsRef = (0, import_react.useRef)(async () => {});
	/**
	* 账号标识 key：由 enterpriseId + userId 组合而成。
	* 用作 effect 依赖，确保账号切换时驱动 store 清空 + 重新拉取。
	* 未登录时为 undefined，此时不触发 reset 避免匿名态污染 store。
	*
	* 注意：不包含 account.type —— type 会在启动后异步从后端获取（undefined → 'personal' 等），
	* 若包含则 type 就绪时会触发 effect 重跑，先清空 store 再重新 fetch，
	* 如果此时 slotSystemEnabled 恰好处于 reset 中间态则 fetch 会被跳过，导致运营位消失。
	* 真正的账号切换由 enterpriseId + userId 变化驱动即可。
	*/
	const accountKey = accountInfo?.userId || accountInfo?.enterpriseId ? `${accountInfo?.enterpriseId ?? ""}:${accountInfo?.userId ?? ""}` : void 0;
	const clearBatchTimer = (0, import_react.useCallback)(() => {
		if (batchTimerRef.current) {
			clearTimeout(batchTimerRef.current);
			batchTimerRef.current = null;
		}
	}, []);
	const scheduleBatchRefresh = (0, import_react.useCallback)((intervalSec) => {
		clearBatchTimer();
		batchTimerRef.current = setTimeout(() => {
			fetchConfigsRef.current().catch((err) => {
				console.error("[SlotDomain] scheduled batch refresh error:", String(err));
			});
		}, intervalSec * 1e3);
	}, [clearBatchTimer]);
	const fetchConfigs = (0, import_react.useCallback)(async () => {
		if (slotSystemEnabled !== true) {
			clearBatchTimer();
			slotStore.setState({
				configs: {},
				loading: false
			});
			return;
		}
		try {
			const slotFacade = facades?.slot;
			if (!slotFacade?.getActiveConfigs) return;
			const data = await slotFacade.getActiveConfigs({ lang: getCurrentLang() });
			if (mountedRef.current) {
				const hasData = Object.keys(data).length > 0;
				const hasExisting = Object.keys(slotStore.getState().configs).length > 0;
				if (hasData || !hasExisting) slotStore.setState({
					configs: data,
					loading: false
				});
				else slotStore.setState({ loading: false });
				scheduleBatchRefresh(getBatchCallIntervalSec(data));
			}
		} catch (err) {
			console.error("[SlotDomain] fetchConfigs failed:", String(err));
			if (mountedRef.current) {
				slotStore.setState({ loading: false });
				scheduleBatchRefresh(DEFAULT_CALL_INTERVAL_SEC);
			}
		}
	}, [
		clearBatchTimer,
		facades,
		scheduleBatchRefresh,
		slotSystemEnabled
	]);
	(0, import_react.useEffect)(() => {
		fetchConfigsRef.current = fetchConfigs;
	}, [fetchConfigs]);
	/**
	* 核心生命周期 effect：初始化 + 账号切换时重新拉取。
	*
	* 依赖 accountKey + slotFacadeReady 确保：
	* 1. 账号切换时 cleanup 清空 timer → reset store → 重新 fetch
	* 2. facade 从不可用变为可用时（首次登录或重新登录后 facade 延迟 ready），补一次拉取
	*
	* 仅在 accountKey 有值（已登录）且 facade 已就绪时才执行 reset + fetch，
	* 避免未登录 / facade 未 ready 时把 store 卡在 loading:true。
	*/
	const slotFacadeReady = Boolean(facades?.slot?.getActiveConfigs);
	(0, import_react.useEffect)(() => {
		mountedRef.current = true;
		if (slotSystemEnabled !== true) {
			clearBatchTimer();
			slotStore.setState({
				configs: {},
				loading: false
			});
			return () => {
				mountedRef.current = false;
			};
		}
		if (!accountKey || !slotFacadeReady) return () => {
			mountedRef.current = false;
		};
		slotStore.setState({
			configs: {},
			loading: true
		});
		fetchConfigsRef.current();
		return () => {
			mountedRef.current = false;
			clearBatchTimer();
		};
	}, [
		accountKey,
		slotFacadeReady,
		slotSystemEnabled,
		clearBatchTimer
	]);
	(0, import_react.useEffect)(() => onLocaleChange(() => {
		fetchConfigs();
	}), [fetchConfigs]);
	return null;
}
/** 手动刷新 slot 配置（触发 store 重新拉取） */
function useSlotConfigRefresh() {
	const { facades } = useModuleHost();
	const slotEnabled = useSlotSystemFeature();
	return (0, import_react.useCallback)(async () => {
		if (!slotEnabled) return;
		try {
			const slotFacade = facades?.slot;
			if (!slotFacade?.getActiveConfigs) return;
			const data = await slotFacade.getActiveConfigs({ lang: getCurrentLang() });
			slotStore.setState({
				configs: data,
				loading: false
			});
		} catch (err) {
			console.error("[SlotDomain] refresh error:", String(err));
		}
	}, [facades, slotEnabled]);
}
/**
* 按需刷新单个 slot 配置（按 slot_key 精确刷新，其它 slot 保持原值）。
*
* 典型场景：点击侧边栏「新建任务」时只刷 home slot，不必拉一整批。
* 走后端 `/operation-platform/slots/active` 单查接口（每次 1 个 slot_key）。
*
* - 命中：写入 slotStore.configs[slotKey] = ActiveSlotConfig
* - 未命中：写入 slotStore.configs[slotKey] = null（与批量接口的"未命中"语义一致）
* - facade 缺 getActiveConfig（旧实现）或异常：静默失败、保留原状态
* - 不参与定时调度（call_interval_sec 仅用于批量刷新）
*/
function useRefreshSingleSlot() {
	const { facades } = useModuleHost();
	const slotEnabled = useSlotSystemFeature();
	return (0, import_react.useCallback)(async (slotKey) => {
		if (!slotEnabled) return;
		try {
			const slotFacade = facades?.slot;
			if (!slotFacade?.getActiveConfig) return;
			const config = await slotFacade.getActiveConfig(slotKey, { lang: getCurrentLang() });
			slotStore.setState((prev) => ({ configs: {
				...prev.configs,
				[slotKey]: config
			} }));
		} catch (err) {
			console.error("[SlotDomain] refresh single slot error: slotKey=%s, error=%s", slotKey, String(err));
		}
	}, [facades, slotEnabled]);
}
var import_react, DEFAULT_CALL_INTERVAL_SEC;
var init_SlotConfigProvider = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_product_features();
	init_i18n();
	init_common();
	init_slot_store();
	DEFAULT_CALL_INTERVAL_SEC = 300;
}));
//#endregion
export { init_slot_store as a, useSlotConfigRefresh as i, init_SlotConfigProvider as n, useSlotStore as o, useRefreshSingleSlot as r, SlotConfigProvider as t };
