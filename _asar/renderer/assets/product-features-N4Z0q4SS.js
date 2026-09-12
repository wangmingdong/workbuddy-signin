import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { n as init_adapter_context, t as AdapterContext } from "./adapter-context-DGaRYQ5R.js";
import { r as setStorageUpgradeEntrySnapshot, t as init_storage_upgrade_entry_snapshot } from "./storage-upgrade-entry-snapshot-BgU4-HWF.js";
//#region ../../packages/agent-ui/src/hooks/create-product-feature-hook.ts
function createProductFeatureHook(options) {
	const { resolve, disableDelayMs } = options;
	let cachedEnabled = void 0;
	let sharedAdapter;
	let sharedAdapterUnsubscribe;
	let sharedBootstrapPromise = null;
	let shouldForceNextBootstrap = false;
	let bootstrapGeneration = 0;
	/**
	* 「enable→disable」延迟生效的待执行 timer。
	* 仅当 disableDelayMs 配置且 prevValue=true、新值=false 时挂起。
	*/
	let pendingDisableTimer = null;
	const sharedStateListeners = /* @__PURE__ */ new Set();
	const clearPendingDisableTimer = () => {
		if (pendingDisableTimer) {
			clearTimeout(pendingDisableTimer);
			pendingDisableTimer = null;
		}
	};
	const broadcast = (nextEnabled) => {
		sharedStateListeners.forEach((listener) => {
			try {
				listener(nextEnabled);
			} catch {}
		});
	};
	const applySharedFeature = (features) => {
		if (!features) return;
		const nextEnabled = resolve(features, cachedEnabled);
		if (nextEnabled === void 0) return;
		const prevEnabled = cachedEnabled;
		if (disableDelayMs && disableDelayMs > 0 && prevEnabled === true && nextEnabled === false) {
			if (pendingDisableTimer) return;
			pendingDisableTimer = setTimeout(() => {
				pendingDisableTimer = null;
				if (cachedEnabled !== false) {
					cachedEnabled = false;
					broadcast(false);
				}
			}, disableDelayMs);
			return;
		}
		clearPendingDisableTimer();
		cachedEnabled = nextEnabled;
		if (prevEnabled === nextEnabled && sharedStateListeners.size === 0) return;
		broadcast(nextEnabled);
	};
	const detachSharedAdapterSubscription = () => {
		if (sharedAdapterUnsubscribe) {
			sharedAdapterUnsubscribe();
			sharedAdapterUnsubscribe = void 0;
		}
	};
	const ensureSharedFeatureSubscription = (adapter) => {
		if (sharedAdapter === adapter && (sharedAdapterUnsubscribe || sharedBootstrapPromise)) return;
		if (sharedAdapter && sharedAdapter !== adapter) {
			detachSharedAdapterSubscription();
			sharedBootstrapPromise = null;
			bootstrapGeneration += 1;
		}
		sharedAdapter = adapter;
		if (adapter.onProductConfigChanged && !sharedAdapterUnsubscribe) sharedAdapterUnsubscribe = adapter.onProductConfigChanged((params) => {
			applySharedFeature(params?.productFeatures);
		});
		if (adapter.getProductFeatures && !sharedBootstrapPromise) {
			const forceUpdate = shouldForceNextBootstrap;
			const requestGeneration = bootstrapGeneration;
			shouldForceNextBootstrap = false;
			sharedBootstrapPromise = adapter.getProductFeatures(forceUpdate).then((features) => {
				if (requestGeneration !== bootstrapGeneration || sharedAdapter !== adapter) return;
				applySharedFeature(features);
			}).catch(() => {}).finally(() => {
				if (requestGeneration === bootstrapGeneration) sharedBootstrapPromise = null;
			});
		}
	};
	const resetFeatureCache = () => {
		const currentAdapter = sharedAdapter;
		detachSharedAdapterSubscription();
		clearPendingDisableTimer();
		sharedAdapter = void 0;
		sharedBootstrapPromise = null;
		cachedEnabled = void 0;
		shouldForceNextBootstrap = true;
		bootstrapGeneration += 1;
		sharedStateListeners.forEach((listener) => {
			try {
				listener(void 0);
			} catch {}
		});
		if (currentAdapter && sharedStateListeners.size > 0) ensureSharedFeatureSubscription(currentAdapter);
	};
	const useFeature = () => {
		const adapter = (0, import_react.useContext)(AdapterContext);
		const [enabled, setEnabled] = (0, import_react.useState)(cachedEnabled);
		(0, import_react.useEffect)(() => {
			if (!adapter?.onProductConfigChanged && !adapter?.getProductFeatures) return;
			const listener = (nextEnabled) => {
				setEnabled((prev) => prev === nextEnabled ? prev : nextEnabled);
			};
			sharedStateListeners.add(listener);
			listener(cachedEnabled);
			ensureSharedFeatureSubscription(adapter);
			return () => {
				sharedStateListeners.delete(listener);
				if (sharedStateListeners.size === 0) {
					detachSharedAdapterSubscription();
					clearPendingDisableTimer();
					sharedAdapter = void 0;
					sharedBootstrapPromise = null;
					bootstrapGeneration += 1;
				}
			};
		}, [adapter]);
		return enabled;
	};
	return {
		useFeature,
		resetFeatureCache
	};
}
var import_react;
var init_create_product_feature_hook = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_adapter_context();
}));
//#endregion
//#region ../../packages/agent-ui/src/hooks/product-features.ts
/**
* 通用 resolver：缺 key === 该账号没有这个能力。
*
* 历史曾经为了规避"中间态推送临时缺字段闪烁"在缺 key + 已有 cache 时返回 undefined
* （= 保留旧值）。但这导致**账号切换**时新账号若不显式下发该 key，UI 会一直停留在
* 旧账号的值，必须刷新页面才能更新（issue #53640 复现链路：MaxMode 在新账号
* productFeatures 里缺 key → resolver 返回 undefined → applySharedFeature 走
* "keep prev" 分支 → cachedEnabled 永远是上个账号的 true）。
*
* 现策略：缺 key 一律 fallback 到默认值。如确有"中间态推送会临时缺字段"需求的
* 个别 feature（目前只有 WechatMiniProgramIntegration #43093 / #35200），自己写
* 私有 resolver（见下方），不要走通用 resolver。
*/
function resolveDisableFeature(features, _prevValue, featureKey) {
	return features[featureKey] !== true;
}
function resolveEnableFeature(features, _prevValue, featureKey, defaultEnabled = false) {
	if (!Object.prototype.hasOwnProperty.call(features, featureKey)) return defaultEnabled;
	return features[featureKey] === true;
}
function useStorageUpgradeEntryFeature() {
	const enabled = storageUpgradeEntryFeature.useFeature();
	setStorageUpgradeEntrySnapshot(enabled);
	return enabled;
}
var enterpriseConsole, useEnterpriseConsoleFeature, resetEnterpriseConsoleFeatureCache, welcomeAppsConnectors, useWelcomeAppsConnectorsFeature, resetWelcomeAppsConnectorsFeatureCache, showUsageEntry, useShowUsageEntryFeature, resetShowUsageEntryFeatureCache, wechatMiniProgramIntegration, useWechatMiniProgramIntegrationFeature, resetWechatMiniProgramIntegrationFeatureCache, showCreditsBalance, useShowCreditsBalanceFeature, resetShowCreditsBalanceFeatureCache, wecomBotIntegration, useWecomBotIntegrationFeature, creditsEntry, useCreditsEntryFeature, resetCreditsEntryFeatureCache, manageCenterEntryFeature, useManageCenterEntryFeature, resetManageCenterEntryFeatureCache, shareFeature, useShareFeature, resetShareFeatureCache, htmlPreviewShare, useHtmlPreviewShareFeature, resetHtmlPreviewShareFeatureCache, publishedAppsFeature, usePublishedAppsFeature, resetPublishedAppsFeatureCache, archivedTasksFeature, useArchivedTasksFeature, resetArchivedTasksFeatureCache, cloudAssistantUpgradeBannerFeature, useCloudAssistantUpgradeBannerFeature, resetCloudAssistantUpgradeBannerFeatureCache, teamsProjectFeature, useTeamsProjectFeature, resetTeamsProjectFeatureCache, inspirationEntryFeature, useInspirationEntryFeature, resetInspirationEntryFeatureCache, homePlaybooksFeature, useHomePlaybooksFeature, resetHomePlaybooksFeatureCache, gaokaoFeature, useGaokaoFeature, resetGaokaoFeatureCache, checkinFeature, useCheckinFeature, resetCheckinFeatureCache, slotSystemFeature, useSlotSystemFeature, resetSlotSystemFeatureCache, activityBannerFeature, resetActivityBannerFeatureCache, creditPurchaseGuideFeature, useCreditPurchaseGuideFeature, resetCreditPurchaseGuideFeatureCache, modelOptimizationFeature, useModelOptimizationFeature, resetModelOptimizationFeatureCache, channelSlack, useChannelSlackFeature, resetChannelSlackFeatureCache, channelTelegram, useChannelTelegramFeature, resetChannelTelegramFeatureCache, channelDiscord, useChannelDiscordFeature, resetChannelDiscordFeatureCache, channelWechatKf, useChannelWechatKfFeature, resetChannelWechatKfFeatureCache, voiceInput, useVoiceInputFeature, resetVoiceInputFeatureCache, voiceOutput, useVoiceOutputFeature, resetVoiceOutputFeatureCache, skillRecommendFeature, useSkillRecommendFeature, resetSkillRecommendFeatureCache, intentRecommendFeature, useIntentRecommendFeature, resetIntentRecommendFeatureCache, todoAssistantDelegateFeature, useTodoAssistantDelegateFeature, resetTodoAssistantDelegateFeatureCache, maxModeFeature, useMaxModeFeature, resetMaxModeFeatureCache, autoModeFeature, useAutoModeFeature, resetAutoModeFeatureCache, mobileConnectV2Feature, useMobileConnectV2Feature, resetMobileConnectV2FeatureCache, updateChangelogFeature, useUpdateChangelogFeature, resetUpdateChangelogFeatureCache, skillHubFeature, useSkillHubFeature, resetSkillHubFeatureCache, storageUpgradeEntryFeature, resetStorageUpgradeEntryFeatureCache;
var init_product_features = __esmMin((() => {
	init_create_product_feature_hook();
	init_storage_upgrade_entry_snapshot();
	enterpriseConsole = createProductFeatureHook({
		featureKey: "EnterpriseConsole",
		resolve: (features) => features.EnterpriseConsole === true
	});
	useEnterpriseConsoleFeature = enterpriseConsole.useFeature;
	resetEnterpriseConsoleFeatureCache = enterpriseConsole.resetFeatureCache;
	welcomeAppsConnectors = createProductFeatureHook({
		featureKey: "WelcomeAppsConnectors",
		resolve: (features) => features.WelcomeAppsConnectors === true
	});
	useWelcomeAppsConnectorsFeature = welcomeAppsConnectors.useFeature;
	resetWelcomeAppsConnectorsFeatureCache = welcomeAppsConnectors.resetFeatureCache;
	showUsageEntry = createProductFeatureHook({
		featureKey: "ShowUsageEntry",
		resolve: (features) => features.ShowUsageEntry === true
	});
	useShowUsageEntryFeature = showUsageEntry.useFeature;
	resetShowUsageEntryFeatureCache = showUsageEntry.resetFeatureCache;
	wechatMiniProgramIntegration = createProductFeatureHook({
		featureKey: "DisableWechatMiniProgramIntegration",
		resolve: (features, prevValue) => {
			if (!Object.prototype.hasOwnProperty.call(features, "DisableWechatMiniProgramIntegration")) return prevValue === void 0 ? true : void 0;
			return features.DisableWechatMiniProgramIntegration !== true;
		}
	});
	useWechatMiniProgramIntegrationFeature = wechatMiniProgramIntegration.useFeature;
	resetWechatMiniProgramIntegrationFeatureCache = wechatMiniProgramIntegration.resetFeatureCache;
	showCreditsBalance = createProductFeatureHook({
		featureKey: "ShowCreditsBalance",
		resolve: (features) => features.ShowCreditsBalance !== false
	});
	useShowCreditsBalanceFeature = showCreditsBalance.useFeature;
	resetShowCreditsBalanceFeatureCache = showCreditsBalance.resetFeatureCache;
	wecomBotIntegration = createProductFeatureHook({
		featureKey: "DisableWecomBotIntegration",
		resolve: (features, prevValue) => {
			if (!Object.prototype.hasOwnProperty.call(features, "DisableWecomBotIntegration")) return prevValue === void 0 ? true : void 0;
			return features.DisableWecomBotIntegration !== true;
		}
	});
	useWecomBotIntegrationFeature = wecomBotIntegration.useFeature;
	wecomBotIntegration.resetFeatureCache;
	creditsEntry = createProductFeatureHook({
		featureKey: "DisableCreditsEntry",
		resolve: (features, prevValue) => resolveDisableFeature(features, prevValue, "DisableCreditsEntry")
	});
	useCreditsEntryFeature = creditsEntry.useFeature;
	resetCreditsEntryFeatureCache = creditsEntry.resetFeatureCache;
	manageCenterEntryFeature = createProductFeatureHook({
		featureKey: "DisableManageCenterEntry",
		resolve: (features, prevValue) => resolveDisableFeature(features, prevValue, "DisableManageCenterEntry")
	});
	useManageCenterEntryFeature = manageCenterEntryFeature.useFeature;
	resetManageCenterEntryFeatureCache = manageCenterEntryFeature.resetFeatureCache;
	shareFeature = createProductFeatureHook({
		featureKey: "DisableShareFeature",
		resolve: (features, prevValue) => resolveDisableFeature(features, prevValue, "DisableShareFeature")
	});
	useShareFeature = shareFeature.useFeature;
	resetShareFeatureCache = shareFeature.resetFeatureCache;
	htmlPreviewShare = createProductFeatureHook({
		featureKey: "HtmlPreviewShare",
		resolve: (features, prevValue) => resolveEnableFeature(features, prevValue, "HtmlPreviewShare", true)
	});
	useHtmlPreviewShareFeature = htmlPreviewShare.useFeature;
	resetHtmlPreviewShareFeatureCache = htmlPreviewShare.resetFeatureCache;
	publishedAppsFeature = createProductFeatureHook({
		featureKey: "DisablePublishedApps",
		resolve: (features, prevValue) => resolveDisableFeature(features, prevValue, "DisablePublishedApps")
	});
	usePublishedAppsFeature = publishedAppsFeature.useFeature;
	resetPublishedAppsFeatureCache = publishedAppsFeature.resetFeatureCache;
	archivedTasksFeature = createProductFeatureHook({
		featureKey: "DisableArchivedTasks",
		resolve: (features, prevValue) => resolveDisableFeature(features, prevValue, "DisableArchivedTasks")
	});
	useArchivedTasksFeature = archivedTasksFeature.useFeature;
	resetArchivedTasksFeatureCache = archivedTasksFeature.resetFeatureCache;
	cloudAssistantUpgradeBannerFeature = createProductFeatureHook({
		featureKey: "DisableCloudAssistantUpgradeBanner",
		resolve: (features, prevValue) => resolveDisableFeature(features, prevValue, "DisableCloudAssistantUpgradeBanner")
	});
	useCloudAssistantUpgradeBannerFeature = cloudAssistantUpgradeBannerFeature.useFeature;
	resetCloudAssistantUpgradeBannerFeatureCache = cloudAssistantUpgradeBannerFeature.resetFeatureCache;
	teamsProjectFeature = createProductFeatureHook({
		featureKey: "DisableTeamsProject",
		resolve: (features, prevValue) => resolveDisableFeature(features, prevValue, "DisableTeamsProject")
	});
	useTeamsProjectFeature = teamsProjectFeature.useFeature;
	resetTeamsProjectFeatureCache = teamsProjectFeature.resetFeatureCache;
	inspirationEntryFeature = createProductFeatureHook({
		featureKey: "DisableInspirationEntry",
		resolve: (features, prevValue) => resolveDisableFeature(features, prevValue, "DisableInspirationEntry")
	});
	useInspirationEntryFeature = inspirationEntryFeature.useFeature;
	resetInspirationEntryFeatureCache = inspirationEntryFeature.resetFeatureCache;
	homePlaybooksFeature = createProductFeatureHook({
		featureKey: "HomePlaybooks",
		resolve: (features, prevValue) => resolveEnableFeature(features, prevValue, "HomePlaybooks", false)
	});
	useHomePlaybooksFeature = homePlaybooksFeature.useFeature;
	resetHomePlaybooksFeatureCache = homePlaybooksFeature.resetFeatureCache;
	gaokaoFeature = createProductFeatureHook({
		featureKey: "gaokaoEnabled",
		resolve: (features, prevValue) => resolveEnableFeature(features, prevValue, "gaokaoEnabled", true)
	});
	useGaokaoFeature = gaokaoFeature.useFeature;
	resetGaokaoFeatureCache = gaokaoFeature.resetFeatureCache;
	checkinFeature = createProductFeatureHook({
		featureKey: "DisableCheckin",
		resolve: (features, prevValue) => resolveDisableFeature(features, prevValue, "DisableCheckin")
	});
	useCheckinFeature = checkinFeature.useFeature;
	resetCheckinFeatureCache = checkinFeature.resetFeatureCache;
	slotSystemFeature = createProductFeatureHook({
		featureKey: "DisableSlotSystem",
		resolve: (features, prevValue) => resolveDisableFeature(features, prevValue, "DisableSlotSystem")
	});
	useSlotSystemFeature = slotSystemFeature.useFeature;
	resetSlotSystemFeatureCache = slotSystemFeature.resetFeatureCache;
	activityBannerFeature = createProductFeatureHook({
		featureKey: "DisableActivityBanner",
		resolve: (features, prevValue) => resolveDisableFeature(features, prevValue, "DisableActivityBanner")
	});
	activityBannerFeature.useFeature;
	resetActivityBannerFeatureCache = activityBannerFeature.resetFeatureCache;
	creditPurchaseGuideFeature = createProductFeatureHook({
		featureKey: "DisableCreditPurchaseGuide",
		resolve: (features, prevValue) => resolveDisableFeature(features, prevValue, "DisableCreditPurchaseGuide")
	});
	useCreditPurchaseGuideFeature = creditPurchaseGuideFeature.useFeature;
	resetCreditPurchaseGuideFeatureCache = creditPurchaseGuideFeature.resetFeatureCache;
	modelOptimizationFeature = createProductFeatureHook({
		featureKey: "DefaultModelOptimizationOff",
		resolve: (features, prevValue) => resolveDisableFeature(features, prevValue, "DefaultModelOptimizationOff")
	});
	useModelOptimizationFeature = modelOptimizationFeature.useFeature;
	resetModelOptimizationFeatureCache = modelOptimizationFeature.resetFeatureCache;
	channelSlack = createProductFeatureHook({
		featureKey: "ChannelSlack",
		resolve: (features, prevValue) => resolveEnableFeature(features, prevValue, "ChannelSlack")
	});
	useChannelSlackFeature = channelSlack.useFeature;
	resetChannelSlackFeatureCache = channelSlack.resetFeatureCache;
	channelTelegram = createProductFeatureHook({
		featureKey: "ChannelTelegram",
		resolve: (features, prevValue) => resolveEnableFeature(features, prevValue, "ChannelTelegram")
	});
	useChannelTelegramFeature = channelTelegram.useFeature;
	resetChannelTelegramFeatureCache = channelTelegram.resetFeatureCache;
	channelDiscord = createProductFeatureHook({
		featureKey: "ChannelDiscord",
		resolve: (features, prevValue) => resolveEnableFeature(features, prevValue, "ChannelDiscord")
	});
	useChannelDiscordFeature = channelDiscord.useFeature;
	resetChannelDiscordFeatureCache = channelDiscord.resetFeatureCache;
	channelWechatKf = createProductFeatureHook({
		featureKey: "ChannelWechatKf",
		resolve: (features, prevValue) => resolveEnableFeature(features, prevValue, "ChannelWechatKf")
	});
	useChannelWechatKfFeature = channelWechatKf.useFeature;
	resetChannelWechatKfFeatureCache = channelWechatKf.resetFeatureCache;
	voiceInput = createProductFeatureHook({
		featureKey: "DisableVoiceInput",
		resolve: (features, prevValue) => resolveDisableFeature(features, prevValue, "DisableVoiceInput")
	});
	useVoiceInputFeature = voiceInput.useFeature;
	resetVoiceInputFeatureCache = voiceInput.resetFeatureCache;
	voiceOutput = createProductFeatureHook({
		featureKey: "DisableVoiceOutput",
		resolve: (features, prevValue) => resolveDisableFeature(features, prevValue, "DisableVoiceOutput")
	});
	useVoiceOutputFeature = voiceOutput.useFeature;
	resetVoiceOutputFeatureCache = voiceOutput.resetFeatureCache;
	skillRecommendFeature = createProductFeatureHook({
		featureKey: "SkillRecommend",
		resolve: (features, prevValue) => resolveEnableFeature(features, prevValue, "SkillRecommend", false)
	});
	useSkillRecommendFeature = skillRecommendFeature.useFeature;
	resetSkillRecommendFeatureCache = skillRecommendFeature.resetFeatureCache;
	intentRecommendFeature = createProductFeatureHook({
		featureKey: "IntentRecommend",
		resolve: (features, prevValue) => resolveEnableFeature(features, prevValue, "IntentRecommend", false)
	});
	useIntentRecommendFeature = intentRecommendFeature.useFeature;
	resetIntentRecommendFeatureCache = intentRecommendFeature.resetFeatureCache;
	todoAssistantDelegateFeature = createProductFeatureHook({
		featureKey: "TodoAssistantDelegate",
		resolve: (features, prevValue) => resolveEnableFeature(features, prevValue, "TodoAssistantDelegate", false)
	});
	useTodoAssistantDelegateFeature = todoAssistantDelegateFeature.useFeature;
	resetTodoAssistantDelegateFeatureCache = todoAssistantDelegateFeature.resetFeatureCache;
	maxModeFeature = createProductFeatureHook({
		featureKey: "MaxMode",
		resolve: (features, prevValue) => resolveEnableFeature(features, prevValue, "MaxMode", false)
	});
	useMaxModeFeature = maxModeFeature.useFeature;
	resetMaxModeFeatureCache = maxModeFeature.resetFeatureCache;
	autoModeFeature = createProductFeatureHook({
		featureKey: "AutoMode",
		resolve: (features, prevValue) => resolveEnableFeature(features, prevValue, "AutoMode", false)
	});
	useAutoModeFeature = autoModeFeature.useFeature;
	resetAutoModeFeatureCache = autoModeFeature.resetFeatureCache;
	mobileConnectV2Feature = createProductFeatureHook({
		featureKey: "EnableMobileConnectV2",
		resolve: (features, prevValue) => resolveEnableFeature(features, prevValue, "EnableMobileConnectV2", false)
	});
	useMobileConnectV2Feature = mobileConnectV2Feature.useFeature;
	resetMobileConnectV2FeatureCache = mobileConnectV2Feature.resetFeatureCache;
	updateChangelogFeature = createProductFeatureHook({
		featureKey: "DisableUpdateChangelog",
		resolve: (features, prevValue) => resolveDisableFeature(features, prevValue, "DisableUpdateChangelog")
	});
	useUpdateChangelogFeature = updateChangelogFeature.useFeature;
	resetUpdateChangelogFeatureCache = updateChangelogFeature.resetFeatureCache;
	skillHubFeature = createProductFeatureHook({
		featureKey: "DisableSkillHub",
		resolve: (features, prevValue) => resolveDisableFeature(features, prevValue, "DisableSkillHub")
	});
	useSkillHubFeature = skillHubFeature.useFeature;
	resetSkillHubFeatureCache = skillHubFeature.resetFeatureCache;
	storageUpgradeEntryFeature = createProductFeatureHook({
		featureKey: "DisableStorageUpgradeEntry",
		resolve: (features, prevValue) => resolveDisableFeature(features, prevValue, "DisableStorageUpgradeEntry")
	});
	resetStorageUpgradeEntryFeatureCache = storageUpgradeEntryFeature.resetFeatureCache;
}));
//#endregion
export { useIntentRecommendFeature as $, resetStorageUpgradeEntryFeatureCache as A, useChannelDiscordFeature as B, resetPublishedAppsFeatureCache as C, resetSkillHubFeatureCache as D, resetShowUsageEntryFeatureCache as E, resetVoiceOutputFeatureCache as F, useCloudAssistantUpgradeBannerFeature as G, useChannelTelegramFeature as H, resetWechatMiniProgramIntegrationFeatureCache as I, useEnterpriseConsoleFeature as J, useCreditPurchaseGuideFeature as K, resetWelcomeAppsConnectorsFeatureCache as L, resetTodoAssistantDelegateFeatureCache as M, resetUpdateChangelogFeatureCache as N, resetSkillRecommendFeatureCache as O, resetVoiceInputFeatureCache as P, useInspirationEntryFeature as Q, useArchivedTasksFeature as R, resetModelOptimizationFeatureCache as S, resetShowCreditsBalanceFeatureCache as T, useChannelWechatKfFeature as U, useChannelSlackFeature as V, useCheckinFeature as W, useHomePlaybooksFeature as X, useGaokaoFeature as Y, useHtmlPreviewShareFeature as Z, resetInspirationEntryFeatureCache as _, useWechatMiniProgramIntegrationFeature as _t, resetChannelDiscordFeatureCache as a, useShareFeature as at, resetMaxModeFeatureCache as b, createProductFeatureHook as bt, resetChannelWechatKfFeatureCache as c, useSkillHubFeature as ct, resetCreditPurchaseGuideFeatureCache as d, useStorageUpgradeEntryFeature as dt, useManageCenterEntryFeature as et, resetCreditsEntryFeatureCache as f, useTeamsProjectFeature as ft, resetHtmlPreviewShareFeatureCache as g, useVoiceOutputFeature as gt, resetHomePlaybooksFeatureCache as h, useVoiceInputFeature as ht, resetAutoModeFeatureCache as i, usePublishedAppsFeature as it, resetTeamsProjectFeatureCache as j, resetSlotSystemFeatureCache as k, resetCheckinFeatureCache as l, useSkillRecommendFeature as lt, resetGaokaoFeatureCache as m, useUpdateChangelogFeature as mt, resetActivityBannerFeatureCache as n, useMobileConnectV2Feature as nt, resetChannelSlackFeatureCache as o, useShowCreditsBalanceFeature as ot, resetEnterpriseConsoleFeatureCache as p, useTodoAssistantDelegateFeature as pt, useCreditsEntryFeature as q, resetArchivedTasksFeatureCache as r, useModelOptimizationFeature as rt, resetChannelTelegramFeatureCache as s, useShowUsageEntryFeature as st, init_product_features as t, useMaxModeFeature as tt, resetCloudAssistantUpgradeBannerFeatureCache as u, useSlotSystemFeature as ut, resetIntentRecommendFeatureCache as v, useWecomBotIntegrationFeature as vt, resetShareFeatureCache as w, resetMobileConnectV2FeatureCache as x, init_create_product_feature_hook as xt, resetManageCenterEntryFeatureCache as y, useWelcomeAppsConnectorsFeature as yt, useAutoModeFeature as z };
