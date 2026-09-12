import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { Hl as init_use_narrow_layout, Jc as useDebouncedValue, Kd as init_task_starter_store, Ns as ASSISTANT_NAME, Ps as init_brand, Ul as useNarrowLayout, Yd as newSkillCreated$, Yl as useNamedPageShow, al as init_keyword_match, c as useTopBarRootClassName, i as SidebarNewTaskButton, o as init_workbuddy_topbar, ol as textMatchesKeyword, qc as init_use_debounced_value, ql as init_use_named_page_show, r as SidebarExpandButton, sl as init_telemetry, ul as useAgentTelemetry } from "./agent-mail-CiuzbR2o.js";
import { m as getBuiltinMarketSkillId, n as init_common } from "./common-CwB_VqKR.js";
import { V as SearchInput, Yr as toast, t as init_src } from "./src-DRGoWjIu.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { b as isWorkBuddyDesktop, p as init_environment } from "./environment-DKqg3f0G.js";
import { a as init_i18n, n as getLocale } from "./i18n-Bt_Wap4p.js";
import { D as useAccountService, E as init_auth_context, t as init_contexts, xt as useConversations } from "./contexts-D7XKqa2J.js";
import { r as useAdapter } from "./adapter-context-DGaRYQ5R.js";
import { I as Dropdown, ct as Button, g as Tooltip, t as init_foundation, tt as Input, v as Breadcrumb } from "./foundation-QOglV606.js";
import { Fr as AddCircleIcon, rr as ChevronLeftIcon } from "./icons-Cj3UopO9.js";
import { r as useTranslation, t as init_useI18n } from "./useI18n-DDytAo7_.js";
import { n as isIOAUser, t as init_account } from "./account-BDHahT9K.js";
import { i as useModuleHost } from "./module-host-context-CI9spvhq.js";
import { H as InstalledSkillIcon, r as init_icons } from "./oauth-callback-IQ0UCaVX.js";
import { d as notifySkillListRefresh, m as init_extension_refresh_events, u as init_high_risk_notification_store, v as notifySkillsUpdateBadgeRefresh } from "./skill-import-errors-BlMOiDaZ.js";
import { N as init_skills_utils, P as isNewerVersion, dt as init_use_auto_update_preference, et as init_types, ft as useAutoUpdatePreference } from "./center-Cjtv6Q1N.js";
import { A as BatchUpdateModal, C as useInstalledSkills, M as init_use_delayed_visible, N as useDelayedVisible, O as SkillDetailView, S as init_use_installed_skills, T as PersonalSkillImportModal, _ as init_use_knot, a as InstalledSection, b as useSkillHub, c as useSkillDetail, d as init_use_plugins, f as usePlugins, g as useBuiltinMarket, h as init_use_builtin_market, i as openSkillUploadModal, j as PluginDetailView, k as ModifiedSkillUpdateConfirmModal, l as init_use_skill_search, m as useEnterpriseSkills, o as DiscoverSection, p as init_use_enterprise_skills, s as init_use_skill_detail, t as init_components, u as useSkillSearch, v as useKnot, y as init_use_skillhub } from "./components-2rgQGZi4.js";
import { t as init_context } from "./context-2xODbZdo.js";
import { t as init_skills$1 } from "./skills-DApVmNog.js";
//#region ../../packages/agent-ui/src/components/icons/ArrowUpIcon.tsx
var import_jsx_runtime$1, ArrowUpIcon;
var init_ArrowUpIcon = __esmMin((() => {
	require_react();
	import_jsx_runtime$1 = require_jsx_runtime();
	ArrowUpIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
			d: "M8 3L8 13",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round"
		}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
			d: "M3.5 7L8 3L12.5 7",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})]
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/hooks/use-scroll-to-top.ts
/**
* Hook that tracks scroll position and provides a smooth scroll-to-top action.
* Shows the back-to-top indicator once scrollTop exceeds the given threshold.
*/
function useScrollToTop(threshold = 300) {
	const scrollRef = (0, import_react$2.useRef)(null);
	const [showBackToTop, setShowBackToTop] = (0, import_react$2.useState)(false);
	(0, import_react$2.useEffect)(() => {
		const el = scrollRef.current;
		if (!el) return;
		const onScroll = () => {
			setShowBackToTop(el.scrollTop > threshold);
		};
		el.addEventListener("scroll", onScroll, { passive: true });
		return () => el.removeEventListener("scroll", onScroll);
	}, [threshold]);
	return {
		scrollRef,
		showBackToTop,
		scrollToTop: (0, import_react$2.useCallback)(() => {
			if (scrollRef.current) scrollRef.current.scrollTop = 0;
		}, [])
	};
}
var import_react$2;
var init_use_scroll_to_top = __esmMin((() => {
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/hooks/use-skills-data.ts
function useSkillsData(visible, active, skillRiskMap = /* @__PURE__ */ new Map(), clearRisk = () => void 0, autoInstallNonHighRisk = false, onAutoInstallNonHighRiskChange, addAsyncTask, removeAsyncTask, updateAsyncTask, scanEnabled = true) {
	const adapter = useAdapter();
	const t = useTranslation();
	const { reportEvent, Events } = useAgentTelemetry();
	const { account } = useAccountService();
	let pluginFacade;
	try {
		pluginFacade = useModuleHost().facades.plugin;
	} catch {
		pluginFacade = void 0;
	}
	let marketplace;
	try {
		marketplace = useModuleHost().facades.skillsMarketplace;
	} catch {
		marketplace = void 0;
	}
	const isIOA = isIOAUser(account?.enterpriseId ?? "");
	(0, import_react$1.useEffect)(() => {
		if (!adapter?.migrateBuiltinMarketDirsToSkillId) return;
		if (bmMigratePromise) return;
		bmMigratePromise = (async () => {
			try {
				const result = await adapter.migrateBuiltinMarketDirsToSkillId();
				if (!result.alreadyDone && (result.migrated || result.skipped || result.failed)) console.log("[useSkillsData] BM dir skillId migration:", result);
			} catch (error) {
				console.warn("[useSkillsData] BM dir skillId migration failed:", error);
				bmMigratePromise = null;
			}
		})();
	}, [adapter]);
	const [discoverTab, setDiscoverTab] = (0, import_react$1.useState)("recommend");
	const [selectedRecommendTagIndex, setSelectedRecommendTagIndex] = (0, import_react$1.useState)(-1);
	const installedGridRef = (0, import_react$1.useRef)(null);
	const [installedColumns, setInstalledColumns] = (0, import_react$1.useState)(3);
	const [batchUpdating, setBatchUpdating] = (0, import_react$1.useState)(false);
	const installedSkillsHook = useInstalledSkills({
		t,
		reportEvent,
		Events,
		skillRiskMap,
		clearRisk,
		autoInstallNonHighRisk,
		onAutoInstallNonHighRiskChange,
		addAsyncTask,
		removeAsyncTask,
		updateAsyncTask,
		scanEnabled
	});
	const skillDetailHook = useSkillDetail();
	const [enterpriseSkillIconMap, setEnterpriseSkillIconMap] = (0, import_react$1.useState)(/* @__PURE__ */ new Map());
	const enrichedInstalledSkills = (0, import_react$1.useMemo)(() => {
		if (enterpriseSkillIconMap.size === 0) return installedSkillsHook.installedSkills;
		const isRenderableUrl = (v) => !!v && /^https?:\/\//i.test(v.trim());
		const list = installedSkillsHook.installedSkills;
		let mutated = false;
		const next = list.map((skill) => {
			if (!!skill.iconUrl || isRenderableUrl(skill.iconSource)) return skill;
			const iconUrl = (skill.filePath ? enterpriseSkillIconMap.get(skill.filePath) : void 0) || (skill.skillId ? enterpriseSkillIconMap.get(skill.skillId) : void 0) || (skill.slug ? enterpriseSkillIconMap.get(skill.slug) : void 0);
			if (!iconUrl) return skill;
			mutated = true;
			return {
				...skill,
				iconUrl,
				iconSource: iconUrl
			};
		});
		return mutated ? next : list;
	}, [installedSkillsHook.installedSkills, enterpriseSkillIconMap]);
	const [hideInstalled, setHideInstalled] = (0, import_react$1.useState)(false);
	const searchHook = useSkillSearch({
		installedSkills: enrichedInstalledSkills,
		recommendedSkills: installedSkillsHook.recommendedSkills,
		isIOAUser: isIOA,
		hideInstalled
	});
	const skillHubHook = useSkillHub({
		t,
		reportEvent,
		Events,
		installedSkills: installedSkillsHook.installedSkills,
		installedLoading: installedSkillsHook.installedLoading,
		loadSkills: installedSkillsHook.loadSkills,
		visible,
		active,
		discoverTab
	});
	const knotHook = useKnot({
		t,
		reportEvent,
		Events,
		installedSkills: installedSkillsHook.installedSkills,
		loadSkills: installedSkillsHook.loadSkills,
		discoverTab,
		isIOAUser: isIOA
	});
	const pluginsHook = usePlugins({
		pluginFacade,
		adapter,
		discoverTab,
		t
	});
	const builtinMarketHook = useBuiltinMarket({
		t,
		reportEvent,
		Events,
		installedSkills: installedSkillsHook.installedSkills,
		loadSkills: installedSkillsHook.loadSkills,
		discoverTab,
		visible,
		active
	});
	const enterpriseHook = useEnterpriseSkills({
		discoverTab,
		visible,
		t,
		reportEvent,
		Events,
		installedSkills: installedSkillsHook.installedSkills,
		installedLoaded: installedSkillsHook.installedLoaded,
		loadSkills: installedSkillsHook.loadSkills,
		searchKeyword: searchHook.skillsSearch
	});
	const enterpriseId = account?.enterpriseId ?? "";
	let enterpriseSkillsFacade;
	try {
		enterpriseSkillsFacade = useModuleHost().facades.enterpriseSkills;
	} catch {
		enterpriseSkillsFacade = void 0;
	}
	const [enterpriseUpdateMap, setEnterpriseUpdateMap] = (0, import_react$1.useState)(/* @__PURE__ */ new Map());
	const [enterpriseDownloadUrlMap, setEnterpriseDownloadUrlMap] = (0, import_react$1.useState)(/* @__PURE__ */ new Map());
	const [enterpriseUpdateCheckCompleted, setEnterpriseUpdateCheckCompleted] = (0, import_react$1.useState)(false);
	(0, import_react$1.useEffect)(() => {
		if (!visible || !active) {
			setEnterpriseUpdateCheckCompleted(false);
			setEnterpriseUpdateMap(/* @__PURE__ */ new Map());
			setEnterpriseDownloadUrlMap(/* @__PURE__ */ new Map());
			setEnterpriseSkillIconMap(/* @__PURE__ */ new Map());
			return;
		}
		if (!enterpriseSkillsFacade || !enterpriseId) {
			setEnterpriseUpdateCheckCompleted(true);
			setEnterpriseUpdateMap(/* @__PURE__ */ new Map());
			setEnterpriseDownloadUrlMap(/* @__PURE__ */ new Map());
			setEnterpriseSkillIconMap(/* @__PURE__ */ new Map());
			return;
		}
		setEnterpriseUpdateCheckCompleted(false);
		let cancelled = false;
		(async () => {
			try {
				const metas = await enterpriseSkillsFacade.getInstalledMetas({ enterpriseId });
				if (cancelled) return;
				if (metas.length === 0) {
					setEnterpriseUpdateMap(/* @__PURE__ */ new Map());
					setEnterpriseDownloadUrlMap(/* @__PURE__ */ new Map());
					setEnterpriseSkillIconMap(/* @__PURE__ */ new Map());
					return;
				}
				const ids = metas.map((m) => m.skillId);
				const remoteResult = await enterpriseSkillsFacade.getByIds({
					enterpriseId,
					ids
				});
				if (cancelled) return;
				const map = /* @__PURE__ */ new Map();
				const urlMap = /* @__PURE__ */ new Map();
				const iconMap = /* @__PURE__ */ new Map();
				for (const remote of remoteResult.skills) {
					const url = (remote?.icon_url || "").trim();
					if (remote?.id && /^https?:\/\//i.test(url)) iconMap.set(remote.id, url);
				}
				for (const m of metas) {
					if (m.userModified) continue;
					const remote = remoteResult.skills.find((s) => s.id === m.skillId);
					if (remote?.version && m.version && isNewerVersion(remote.version, m.version)) {
						map.set(m.skillId, remote.version);
						const downloadUrl = (remote.download_url || "").trim();
						if (downloadUrl) urlMap.set(m.skillId, downloadUrl);
					}
				}
				if (!cancelled) {
					setEnterpriseUpdateMap(map);
					setEnterpriseDownloadUrlMap(urlMap);
					setEnterpriseSkillIconMap(iconMap);
				}
			} catch {
				if (!cancelled) {
					setEnterpriseUpdateMap(/* @__PURE__ */ new Map());
					setEnterpriseDownloadUrlMap(/* @__PURE__ */ new Map());
					setEnterpriseSkillIconMap(/* @__PURE__ */ new Map());
				}
			} finally {
				if (!cancelled) setEnterpriseUpdateCheckCompleted(true);
			}
		})();
		return () => {
			cancelled = true;
		};
	}, [
		visible,
		active,
		enterpriseSkillsFacade,
		enterpriseId
	]);
	const isSkillDetailView = skillDetailHook.isSkillDetailView;
	const isPluginDetailView = !!pluginsHook.selectedPlugin;
	const isDetailView = isSkillDetailView || isPluginDetailView;
	const { tagCategories: marketplaceTagCategories } = installedSkillsHook;
	const recommendTagCategories = (0, import_react$1.useMemo)(() => {
		if (getLocale() === "en") return marketplaceTagCategories.tags_en ?? marketplaceTagCategories.tags_zh ?? [];
		return marketplaceTagCategories.tags_zh ?? marketplaceTagCategories.tags_en ?? [];
	}, [marketplaceTagCategories, t]);
	const selectedRecommendTag = selectedRecommendTagIndex >= 0 && selectedRecommendTagIndex < recommendTagCategories.length ? recommendTagCategories[selectedRecommendTagIndex] : "";
	const setSelectedRecommendTag = (0, import_react$1.useCallback)((tag) => {
		if (!tag) setSelectedRecommendTagIndex(-1);
		else {
			const idx = recommendTagCategories.indexOf(tag);
			setSelectedRecommendTagIndex(idx >= 0 ? idx : -1);
		}
	}, [recommendTagCategories]);
	const filteredRecommendedByTag = (0, import_react$1.useMemo)(() => {
		const skills = searchHook.mergedRecommendedSkills;
		if (!selectedRecommendTag) return skills;
		const locale = getLocale();
		return skills.filter((skill) => {
			return (locale === "en" ? skill.tags_en ?? skill.tags_zh : skill.tags_zh ?? skill.tags_en)?.includes(selectedRecommendTag);
		});
	}, [
		searchHook.mergedRecommendedSkills,
		selectedRecommendTagIndex,
		recommendTagCategories,
		t
	]);
	(0, import_react$1.useEffect)(() => {
		const gridEl = installedGridRef.current;
		if (!gridEl) return;
		const updateColumns = () => {
			const width = gridEl.clientWidth;
			setInstalledColumns(Math.max(1, Math.floor((width + 12) / 274)));
		};
		const ro = new ResizeObserver(() => updateColumns());
		ro.observe(gridEl);
		updateColumns();
		return () => ro.disconnect();
	}, [installedSkillsHook.installedLoading, isDetailView]);
	const defaultVisibleCount = installedColumns * 2;
	const [recentlyInstalledKeys, setRecentlyInstalledKeys] = (0, import_react$1.useState)(/* @__PURE__ */ new Set());
	const [recentlyInstalledBmIds, setRecentlyInstalledBmIds] = (0, import_react$1.useState)(/* @__PURE__ */ new Set());
	const prevDiscoverTabRef = (0, import_react$1.useRef)(discoverTab);
	(0, import_react$1.useEffect)(() => {
		if (prevDiscoverTabRef.current !== discoverTab) {
			prevDiscoverTabRef.current = discoverTab;
			setRecentlyInstalledKeys(/* @__PURE__ */ new Set());
			setRecentlyInstalledBmIds(/* @__PURE__ */ new Set());
		}
	}, [discoverTab]);
	/** 切 L1 tab（市场 ↔ 已安装）时由 panel 调用，清空白名单。 */
	const refreshDisplayFilter = (0, import_react$1.useCallback)(() => {
		setRecentlyInstalledKeys(/* @__PURE__ */ new Set());
		setRecentlyInstalledBmIds(/* @__PURE__ */ new Set());
	}, []);
	const markRecentlyInstalledSlug = (0, import_react$1.useCallback)((slug) => {
		const key = slug.toLowerCase();
		setRecentlyInstalledKeys((prev) => {
			if (prev.has(key)) return prev;
			const next = new Set(prev);
			next.add(key);
			return next;
		});
	}, []);
	const markRecentlyInstalledBmSkill = (0, import_react$1.useCallback)((skill, skillIdResolver) => {
		const id = skillIdResolver();
		const name = (skill.name || "").toLowerCase();
		if (!id && !name) return;
		setRecentlyInstalledBmIds((prev) => {
			const next = new Set(prev);
			if (id) next.add(id);
			if (name) next.add(name);
			return next;
		});
	}, []);
	const displayHubSkills = (0, import_react$1.useMemo)(() => skillHubHook.hubSkills.filter((s) => {
		const slug = s.slug.toLowerCase();
		return recentlyInstalledKeys.has(slug) || !searchHook.installedIdSet.has(slug);
	}), [
		skillHubHook.hubSkills,
		searchHook.installedIdSet,
		recentlyInstalledKeys
	]);
	const displayKnotSkills = (0, import_react$1.useMemo)(() => knotHook.knotSkills.filter((s) => {
		const slug = s.slug.toLowerCase();
		return recentlyInstalledKeys.has(slug) || !searchHook.installedIdSet.has(slug);
	}), [
		knotHook.knotSkills,
		searchHook.installedIdSet,
		recentlyInstalledKeys
	]);
	const displayBuiltinMarketSkills = (0, import_react$1.useMemo)(() => builtinMarketHook.displayBuiltinMarketSkills.filter((s) => {
		const id = getBuiltinMarketSkillId(s);
		const name = (s.name || "").toLowerCase();
		const isRecent = recentlyInstalledBmIds.has(id) || !!name && recentlyInstalledBmIds.has(name);
		const isInstalled = builtinMarketHook.installedSkillIds.has(id) || !!name && builtinMarketHook.installedSkillIds.has(name) || searchHook.installedIdSet.has(id) || searchHook.installedIdSet.has(name);
		return isRecent || !isInstalled;
	}), [
		builtinMarketHook.displayBuiltinMarketSkills,
		builtinMarketHook.installedSkillIds,
		searchHook.installedIdSet,
		recentlyInstalledBmIds
	]);
	const displayFeaturedSkills = (0, import_react$1.useMemo)(() => builtinMarketHook.featuredSkills.filter((s) => {
		const id = getBuiltinMarketSkillId(s);
		const name = (s.name || "").toLowerCase();
		const isRecent = recentlyInstalledBmIds.has(id) || !!name && recentlyInstalledBmIds.has(name);
		const isInstalled = builtinMarketHook.installedSkillIds.has(id) || !!name && builtinMarketHook.installedSkillIds.has(name) || searchHook.installedIdSet.has(id) || searchHook.installedIdSet.has(name);
		return isRecent || !isInstalled;
	}), [
		builtinMarketHook.featuredSkills,
		builtinMarketHook.installedSkillIds,
		searchHook.installedIdSet,
		recentlyInstalledBmIds
	]);
	const displayEnterpriseSkills = (0, import_react$1.useMemo)(() => enterpriseHook.enterpriseSkills.filter((s) => {
		const id = (s.id || "").toLowerCase();
		const name = (s.name || "").toLowerCase();
		return !!id && recentlyInstalledBmIds.has(id) || !!name && recentlyInstalledBmIds.has(name) || !enterpriseHook.isEnterpriseSkillInstalled(s);
	}), [
		enterpriseHook.enterpriseSkills,
		enterpriseHook.isEnterpriseSkillInstalled,
		recentlyInstalledBmIds
	]);
	const prefetchedRef = (0, import_react$1.useRef)(false);
	const skipNextVisibilityRef = (0, import_react$1.useRef)(false);
	(0, import_react$1.useEffect)(() => {
		if (adapter && !prefetchedRef.current) {
			prefetchedRef.current = true;
			skipNextVisibilityRef.current = true;
			installedSkillsHook.loadSkills(installedSkillsHook.hasCacheRef.current);
			pluginsHook.loadInstalledPlugins(installedSkillsHook.hasCacheRef.current);
			pluginsHook.loadPluginMarketplaces();
		}
	}, [adapter]);
	(0, import_react$1.useEffect)(() => {
		if (skipNextVisibilityRef.current) {
			skipNextVisibilityRef.current = false;
			return;
		}
		if (visible && active && prefetchedRef.current) {
			installedSkillsHook.loadSkills(true);
			pluginsHook.loadInstalledPlugins(true);
		}
	}, [active, visible]);
	const isSearchActive = searchHook.skillsSearch.trim().length > 0;
	(0, import_react$1.useEffect)(() => {
		if (!isSearchActive) return;
		const loadForSearch = async () => {
			if (pluginsHook.pluginMarketplaces.length === 0) {
				await pluginsHook.loadPluginMarketplaces();
				return;
			}
			if (!pluginsHook.allMarketplacePluginsLoaded) pluginsHook.loadAllMarketplacePlugins(pluginsHook.pluginMarketplaces);
		};
		loadForSearch();
	}, [
		isSearchActive,
		pluginsHook.pluginMarketplaces,
		pluginsHook.allMarketplacePluginsLoaded,
		pluginsHook.loadPluginMarketplaces,
		pluginsHook.loadAllMarketplacePlugins
	]);
	const handleToggleSkill = (0, import_react$1.useCallback)(async (skillPath, enabled) => {
		await installedSkillsHook.handleToggleSkill(skillPath, enabled, skillDetailHook.selectedSkill, skillDetailHook.setSelectedSkill);
	}, [
		installedSkillsHook,
		skillDetailHook.selectedSkill,
		skillDetailHook.setSelectedSkill
	]);
	const handleDeleteSkill = (0, import_react$1.useCallback)(async () => {
		let skillToDelete = skillDetailHook.selectedSkill;
		let setSelectedSkill = skillDetailHook.setSelectedSkill;
		if (skillToDelete?.filePath?.startsWith("marketplace://")) {
			const installedSkill = installedSkillsHook.installedSkills.find((s) => s.name === skillToDelete.name);
			if (installedSkill) skillToDelete = installedSkill;
		}
		if (!skillToDelete && skillDetailHook.selectedHubSkill) {
			const hubSkill = skillDetailHook.selectedHubSkill;
			const hubSlug = hubSkill.slug;
			const isBuiltinMarketOrEnterprise = typeof hubSlug !== "string";
			let installedSkill;
			if (isBuiltinMarketOrEnterprise) {
				const slugKey = hubSkill.name?.toLowerCase();
				const descKey = hubSkill.description?.toLowerCase();
				const dispZhKey = hubSkill.display_name_zh?.toLowerCase();
				const dispEnKey = hubSkill.display_name_en?.toLowerCase();
				const idKey = hubSkill.id;
				const idStr = typeof idKey === "string" ? idKey.toLowerCase() : void 0;
				installedSkill = installedSkillsHook.installedSkills.find((s) => {
					const n = s.name?.toLowerCase();
					if (!n) return false;
					if (n === slugKey || n === descKey || n === dispZhKey || n === dispEnKey) return true;
					if (idStr && s.skillId?.toLowerCase() === idStr) return true;
					return false;
				});
			} else installedSkill = installedSkillsHook.installedSkills.find((s) => s.name === hubSkill.name || s.slug === hubSlug);
			if (installedSkill) {
				skillToDelete = installedSkill;
				setSelectedSkill = () => skillDetailHook.setSelectedHubSkill(null);
			}
		}
		if (skillToDelete) await installedSkillsHook.handleDeleteSkill(skillToDelete, setSelectedSkill);
	}, [
		installedSkillsHook,
		skillDetailHook.selectedSkill,
		skillDetailHook.setSelectedSkill,
		skillDetailHook.selectedHubSkill,
		skillDetailHook.setSelectedHubSkill,
		installedSkillsHook.installedSkills
	]);
	const handleSkillCardClick = (0, import_react$1.useCallback)((skill) => {
		pluginsHook.setSelectedPlugin(null);
		skillDetailHook.handleSkillCardClick(skill);
	}, [pluginsHook, skillDetailHook]);
	const handleHubSkillCardClick = (0, import_react$1.useCallback)((skill) => {
		pluginsHook.setSelectedPlugin(null);
		skillDetailHook.handleHubSkillCardClick(skill);
	}, [pluginsHook, skillDetailHook]);
	const handleKnotSkillCardClick = (0, import_react$1.useCallback)((skill) => {
		pluginsHook.setSelectedPlugin(null);
		skillDetailHook.handleHubSkillCardClick(skill);
	}, [pluginsHook, skillDetailHook]);
	const handleBuiltinMarketSkillCardClick = (0, import_react$1.useCallback)((skill) => {
		pluginsHook.setSelectedPlugin(null);
		skillDetailHook.handleHubSkillCardClick(skill);
	}, [pluginsHook, skillDetailHook]);
	const handleEnterpriseSkillCardClick = (0, import_react$1.useCallback)((skill) => {
		pluginsHook.setSelectedPlugin(null);
		skillDetailHook.handleHubSkillCardClick({
			...skill,
			source: skill.source ?? "custom"
		});
	}, [pluginsHook, skillDetailHook]);
	const handleSearchResultSkillClick = (0, import_react$1.useCallback)((skill) => {
		pluginsHook.setSelectedPlugin(null);
		if (skill._source === "recommend") {
			const originalSkill = installedSkillsHook.recommendedSkills.find((s) => s.name === skill.name);
			if (originalSkill) {
				skillDetailHook.handleSkillCardClick(originalSkill);
				return;
			}
		}
		skillDetailHook.handleHubSkillCardClick(skill);
	}, [
		pluginsHook,
		skillDetailHook,
		installedSkillsHook.recommendedSkills
	]);
	const handlePluginCardClick = (0, import_react$1.useCallback)((plugin) => {
		skillDetailHook.clearSkillSelection();
		pluginsHook.handlePluginCardClick(plugin);
	}, [skillDetailHook, pluginsHook]);
	const handleToggleInstalledPlugin = (0, import_react$1.useCallback)(async (plugin, enabled) => {
		const scope = plugin.installedScopes?.[0] || "user";
		await pluginsHook.handleTogglePluginStatus(plugin, enabled, scope);
	}, [pluginsHook]);
	const handleBackFromDetail = (0, import_react$1.useCallback)(() => {
		skillDetailHook.handleBackFromDetail();
		pluginsHook.setSelectedPlugin(null);
	}, [skillDetailHook, pluginsHook]);
	const handleOpenSkillInFolder = (0, import_react$1.useCallback)(async (skill) => {
		if (skill.filePath && adapter?.openFolder) await adapter.openFolder(skill.filePath);
	}, [adapter]);
	const filteredInstalledPlugins = (0, import_react$1.useMemo)(() => {
		const keyword = searchHook.skillsSearch.trim().toLowerCase();
		if (!keyword) return pluginsHook.installedPlugins;
		return pluginsHook.installedPlugins.filter((plugin) => {
			const name = plugin.name.toLowerCase();
			const desc = plugin.description?.toLowerCase() ?? "";
			return textMatchesKeyword(name, keyword) || textMatchesKeyword(desc, keyword);
		});
	}, [pluginsHook.installedPlugins, searchHook.skillsSearch]);
	const mergedUpdatableSkills = (0, import_react$1.useMemo)(() => {
		const result = [];
		const includedNames = new Set(result.map((u) => u.skill.name));
		const { hubVersionMap, localVersionMap, hubMetaSlugs, hubSkillByName } = skillHubHook;
		const { knotVersionMap, knotLocalVersionMap, knotInstalledSlugs } = knotHook;
		for (const skill of installedSkillsHook.installedSkills) {
			if (includedNames.has(skill.name)) continue;
			if (skill.userModified) continue;
			const hubSkill = hubSkillByName.get(skill.name.toLowerCase());
			const slug = skill.slug ?? hubSkill?.slug ?? skill.name.toLowerCase();
			if (hubMetaSlugs.has(slug)) {
				const remoteVersion = hubVersionMap[slug] || hubSkill?.version;
				if (!remoteVersion) continue;
				const hubLocalVersion = localVersionMap[slug];
				if (!hubLocalVersion && hubMetaSlugs.has(slug)) {
					result.push({
						skill,
						currentVersion: hubLocalVersion || "",
						latestVersion: remoteVersion
					});
					includedNames.add(skill.name);
				} else if (hubLocalVersion && isNewerVersion(remoteVersion, hubLocalVersion)) {
					result.push({
						skill,
						currentVersion: hubLocalVersion,
						latestVersion: remoteVersion
					});
					includedNames.add(skill.name);
				}
				continue;
			}
			if (knotInstalledSlugs.has(slug)) {
				const knotRemoteVersion = knotVersionMap[slug];
				const knotLocalVersion = knotLocalVersionMap[slug];
				if (!knotRemoteVersion) continue;
				if (!knotLocalVersion) {
					result.push({
						skill,
						currentVersion: "",
						latestVersion: knotRemoteVersion
					});
					includedNames.add(skill.name);
				} else if (isNewerVersion(knotRemoteVersion, knotLocalVersion)) {
					result.push({
						skill,
						currentVersion: knotLocalVersion,
						latestVersion: knotRemoteVersion
					});
					includedNames.add(skill.name);
				}
				continue;
			}
			const bmUpdate = builtinMarketHook.getInstalledBuiltinMarketSkillUpdate(skill);
			if (bmUpdate.hasUpdate && bmUpdate.remoteVersion) {
				result.push({
					skill,
					currentVersion: skill.version || "",
					latestVersion: bmUpdate.remoteVersion
				});
				includedNames.add(skill.name);
			}
		}
		if (enterpriseUpdateMap.size > 0) for (const skill of installedSkillsHook.installedSkills) {
			if (includedNames.has(skill.name)) continue;
			const skillId = typeof skill.skillId === "string" && skill.skillId.trim() ? skill.skillId : void 0;
			if (!skillId) continue;
			const remoteVersion = enterpriseUpdateMap.get(skillId);
			if (remoteVersion) {
				result.push({
					skill,
					currentVersion: skill.version || "",
					latestVersion: remoteVersion
				});
				includedNames.add(skill.name);
			}
		}
		return result;
	}, [
		installedSkillsHook.installedSkills,
		skillHubHook.hubVersionMap,
		skillHubHook.localVersionMap,
		skillHubHook.hubMetaSlugs,
		skillHubHook.hubSkillByName,
		knotHook.knotVersionMap,
		knotHook.knotLocalVersionMap,
		knotHook.knotInstalledSlugs,
		builtinMarketHook.getInstalledBuiltinMarketSkillUpdate,
		enterpriseUpdateMap
	]);
	const handleBatchUpdateSkills = (0, import_react$1.useCallback)(async (skills) => {
		if (skills.length === 0) return;
		setBatchUpdating(true);
		let successCount = 0;
		const failedNames = [];
		const { hubMetaSlugs, hubSkillByName } = skillHubHook;
		const { knotInstalledSlugs, knotSkillByName } = knotHook;
		const { builtinMarketSkillByName } = builtinMarketHook;
		for (const { skill, latestVersion } of skills) try {
			const hubSkill = hubSkillByName.get(skill.name.toLowerCase());
			const slug = skill.slug ?? hubSkill?.slug ?? skill.name.toLowerCase();
			const isFromSkillHub = hubMetaSlugs.has(slug);
			const isFromKnot = knotInstalledSlugs.has(slug);
			const backendSkillId = typeof skill.skillId === "string" && skill.skillId.trim().length > 0 ? skill.skillId : void 0;
			const bmSkill = builtinMarketSkillByName.get(skill.name.toLowerCase()) ?? (backendSkillId ? builtinMarketHook.builtinMarketSkills.find((s) => getBuiltinMarketSkillId(s) === backendSkillId) : void 0);
			let result;
			if (isFromSkillHub && marketplace) {
				const skillHubIconUrl = hubSkill?.iconUrl ?? skill.iconSource;
				const skillHubLabels = hubSkill?.labels ?? skill.labels;
				result = await marketplace.skillhub.install(slug, latestVersion, skill.name, skillHubIconUrl, skillHubLabels);
			} else if (isFromKnot && marketplace) {
				const knotSkill = knotSkillByName.get(skill.name.toLowerCase()) || knotSkillByName.get(slug.toLowerCase());
				if (knotSkill) result = await marketplace.knot.install(knotSkill.id, latestVersion, knotSkill.name, knotSkill.skill_name, knotSkill.slug);
				else result = {
					success: false,
					errorMessage: "Knot skill details not available for batch update"
				};
			} else if (backendSkillId && enterpriseUpdateMap.has(backendSkillId) && enterpriseSkillsFacade) {
				const installRes = await enterpriseSkillsFacade.install({
					skillId: backendSkillId,
					version: latestVersion,
					name: skill.name,
					downloadUrl: enterpriseDownloadUrlMap.get(backendSkillId)
				});
				result = {
					success: installRes.success,
					errorMessage: installRes.errorMessage
				};
			} else if (isFromBuiltinMarket && bmSkill && marketplace) {
				const installRes = await marketplace.builtin.install({
					skillId: bmSkillId,
					version: latestVersion,
					name: installName,
					skillName: installSkillName,
					...installIcon ? { icon: installIcon } : {},
					...bmSkill?.examples_zh ? { examples_zh: bmSkill.examples_zh } : {},
					...bmSkill?.examples_en ? { examples_en: bmSkill.examples_en } : {}
				});
				result = {
					success: installRes.success,
					errorMessage: installRes.errorMessage
				};
			} else result = {
				success: false,
				errorMessage: "No install method available"
			};
			if (result.success) successCount++;
			else failedNames.push(skill.name);
		} catch {
			failedNames.push(skill.name);
		}
		setBatchUpdating(false);
		if (successCount > 0) {
			toast({
				message: t("skills.batchUpdate.success", { count: String(successCount) }),
				type: "success"
			});
			skillHubHook.resetHubUpdateCheck();
			knotHook.resetKnotUpdateCheck();
			builtinMarketHook.resetBuiltinMarketUpdateCheck();
			setEnterpriseUpdateMap(/* @__PURE__ */ new Map());
			setEnterpriseDownloadUrlMap(/* @__PURE__ */ new Map());
			setEnterpriseSkillIconMap(/* @__PURE__ */ new Map());
			setEnterpriseUpdateCheckCompleted(false);
			await installedSkillsHook.loadSkills(true);
			notifySkillsUpdateBadgeRefresh();
		}
		if (failedNames.length > 0) toast({
			message: t("skills.batchUpdate.partialFailed", { names: failedNames.join(", ") }),
			type: "error"
		});
	}, [
		marketplace,
		t,
		installedSkillsHook.loadSkills,
		skillHubHook.hubMetaSlugs,
		skillHubHook.hubSkillByName,
		skillHubHook.resetHubUpdateCheck,
		knotHook.knotInstalledSlugs,
		knotHook.knotSkillByName,
		knotHook.resetKnotUpdateCheck,
		builtinMarketHook.installedSkillIds,
		builtinMarketHook.builtinMarketSkillByName,
		builtinMarketHook.builtinMarketSkills,
		builtinMarketHook.resetBuiltinMarketUpdateCheck,
		enterpriseSkillsFacade,
		enterpriseUpdateMap,
		enterpriseDownloadUrlMap
	]);
	const { handleNewTask, disableAllExtensions, setDisableAllExtensionsState } = useConversations();
	/**
	* Issue #41110 反向联动：用户主动安装 skill / plugin / mcp 时，
	* 若全局「禁用全部插件」开关处于开启状态，自动关闭并清空快照。
	* 语义对齐 `resetDisableAllOnUserEnable`：用户既然主动安装新项，
	* 就放弃整体恢复点。
	*/
	const resetDisableAllIfOn = (0, import_react$1.useCallback)(() => {
		if (disableAllExtensions && setDisableAllExtensionsState) setDisableAllExtensionsState(false, null);
	}, [disableAllExtensions, setDisableAllExtensionsState]);
	const handleTrySkill = (0, import_react$1.useCallback)((skillName, examples, displayText, skillId) => {
		let resolvedExamples = examples;
		if (!resolvedExamples || resolvedExamples.length === 0) {
			const lowerName = skillName.toLowerCase();
			const matched = builtinMarketHook.builtinMarketSkillByName.get(lowerName) ?? builtinMarketHook.builtinMarketSkills.find((s) => s.name?.toLowerCase() === lowerName || s.description?.toLowerCase() === lowerName) ?? (skillId ? builtinMarketHook.builtinMarketSkillByName.get(skillId.toLowerCase()) : void 0) ?? installedSkillsHook.recommendedSkills.find((s) => s.name === skillName);
			if (matched) resolvedExamples = getLocale() === "en" ? matched.examples_en && matched.examples_en.length > 0 ? matched.examples_en : matched.examples_zh : matched.examples_zh && matched.examples_zh.length > 0 ? matched.examples_zh : matched.examples_en;
		}
		const exampleText = resolvedExamples && resolvedExamples.length > 0 ? resolvedExamples[0] : void 0;
		handleNewTask?.(true);
		newSkillCreated$.next({
			skillName,
			exampleText,
			displayText,
			skillId
		});
	}, [
		handleNewTask,
		installedSkillsHook.recommendedSkills,
		builtinMarketHook.builtinMarketSkillByName,
		builtinMarketHook.builtinMarketSkills
	]);
	const getMarketplaceSkillUpdate = (0, import_react$1.useCallback)((skill) => {
		const bmUpdate = builtinMarketHook.getInstalledBuiltinMarketSkillUpdate(skill);
		if (bmUpdate.hasUpdate || bmUpdate.isUpdating) return {
			hasUpdate: bmUpdate.hasUpdate,
			isUpdating: bmUpdate.isUpdating,
			latestVersion: bmUpdate.remoteVersion
		};
		const skillId = typeof skill.skillId === "string" && skill.skillId.trim() ? skill.skillId : void 0;
		if (skillId) {
			const enterpriseRemoteVersion = enterpriseUpdateMap.get(skillId);
			if (enterpriseRemoteVersion) return {
				hasUpdate: true,
				isUpdating: false,
				latestVersion: enterpriseRemoteVersion
			};
		}
		return {
			hasUpdate: false,
			isUpdating: false,
			latestVersion: void 0
		};
	}, [builtinMarketHook.getInstalledBuiltinMarketSkillUpdate, enterpriseUpdateMap]);
	const [pendingModifiedUpdate, setPendingModifiedUpdate] = (0, import_react$1.useState)(null);
	const modifiedUpdateModalVisible = pendingModifiedUpdate !== null;
	const confirmModifiedUpdate = (0, import_react$1.useCallback)(() => {
		const run = pendingModifiedUpdate;
		setPendingModifiedUpdate(null);
		if (run) run();
	}, [pendingModifiedUpdate]);
	const cancelModifiedUpdate = (0, import_react$1.useCallback)(() => {
		setPendingModifiedUpdate(null);
	}, []);
	/** 拦截"已编辑 skill"的更新动作；未编辑则直接执行 runUpdate。 */
	const guardModifiedUpdate = (0, import_react$1.useCallback)((skill, runUpdate) => {
		if (skill?.userModified) {
			setPendingModifiedUpdate(() => runUpdate);
			return;
		}
		runUpdate();
	}, []);
	const handleUpdateMarketplaceSkill = (0, import_react$1.useCallback)((skill) => {
		const runUpdate = () => {
			const backendSkillId = typeof skill.skillId === "string" && skill.skillId.trim().length > 0 ? skill.skillId : void 0;
			if (backendSkillId && enterpriseUpdateMap.has(backendSkillId) && enterpriseSkillsFacade) {
				const remoteVersion = enterpriseUpdateMap.get(backendSkillId);
				enterpriseSkillsFacade.install({
					skillId: backendSkillId,
					version: remoteVersion,
					name: skill.name,
					downloadUrl: enterpriseDownloadUrlMap.get(backendSkillId)
				}).then((res) => {
					if (res.success) {
						toast({
							message: t("skills.recommend.installSuccess", { name: skill.name }),
							type: "success"
						});
						installedSkillsHook.loadSkills(true);
						setEnterpriseUpdateMap((prev) => {
							const next = new Map(prev);
							next.delete(backendSkillId);
							return next;
						});
						notifySkillsUpdateBadgeRefresh();
					} else toast({
						message: t("skills.recommend.installFailed", { name: skill.name }),
						type: "error"
					});
				}).catch(() => {
					toast({
						message: t("skills.recommend.installFailed", { name: skill.name }),
						type: "error"
					});
				});
				return;
			}
			if (backendSkillId) {
				const lowerName = skill.name.toLowerCase();
				const bmFromId = builtinMarketHook.builtinMarketSkillByName.get(lowerName) ?? builtinMarketHook.builtinMarketSkills.find((s) => getBuiltinMarketSkillId(s) === backendSkillId);
				if (bmFromId) {
					builtinMarketHook.handleInstallBuiltinMarketSkill(bmFromId, handleTrySkill, true);
					return;
				}
				if (!marketplace) {
					toast({
						message: t("skills.recommend.installFailed", { name: skill.name }),
						type: "error"
					});
					return;
				}
				(async () => {
					try {
						const remoteSkill = (await marketplace.builtin.getByIds([backendSkillId]))?.data?.skills?.find((s) => getBuiltinMarketSkillId(s) === backendSkillId);
						if (remoteSkill) {
							builtinMarketHook.handleInstallBuiltinMarketSkill(remoteSkill, handleTrySkill, true);
							return;
						}
						toast({
							message: t("skills.recommend.installFailed", { name: skill.name }),
							type: "error"
						});
					} catch (err) {
						console.warn("[useSkillsData] getByIds for update failed:", err);
						toast({
							message: t("skills.recommend.installFailed", { name: skill.name }),
							type: "error"
						});
					}
				})();
				return;
			}
			installedSkillsHook.handleUpdateMarketplaceSkill(skill, handleTrySkill);
		};
		guardModifiedUpdate(skill, runUpdate);
	}, [
		builtinMarketHook,
		installedSkillsHook,
		handleTrySkill,
		guardModifiedUpdate,
		enterpriseSkillsFacade,
		enterpriseUpdateMap,
		enterpriseDownloadUrlMap,
		marketplace,
		t
	]);
	return {
		discoverTab,
		setDiscoverTab,
		refreshDisplayFilter,
		skillsSearch: searchHook.skillsSearch,
		setSkillsSearch: searchHook.setSkillsSearch,
		searchPartialFail: searchHook.searchPartialFail,
		isHubSearching: searchHook.isHubSearching,
		isKnotSearching: searchHook.isKnotSearching,
		isBuiltinMarketSearching: searchHook.isBuiltinMarketSearching,
		mergedSearchResults: searchHook.mergedSearchResults,
		builtinMarketSearchResults: searchHook.builtinMarketSearchResults,
		mergedRecommendedSkills: searchHook.mergedRecommendedSkills,
		hideInstalled,
		setHideInstalled,
		installedSkills: enrichedInstalledSkills,
		installedLoading: installedSkillsHook.installedLoading,
		installedExpanded: installedSkillsHook.installedExpanded,
		setInstalledExpanded: installedSkillsHook.setInstalledExpanded,
		filteredInstalledSkills: searchHook.filteredInstalledSkills,
		installedGridRef,
		defaultVisibleCount,
		showDeleteSkillConfirm: installedSkillsHook.showDeleteSkillConfirm,
		setShowDeleteSkillConfirm: installedSkillsHook.setShowDeleteSkillConfirm,
		recommendedSkills: installedSkillsHook.recommendedSkills,
		recommendLoading: installedSkillsHook.recommendLoading,
		recommendTagCategories,
		selectedRecommendTag,
		setSelectedRecommendTag,
		filteredRecommendedByTag,
		updatableSkills: mergedUpdatableSkills,
		updateCheckCompleted: !installedSkillsHook.recommendLoading && skillHubHook.hubUpdateCheckCompleted && knotHook.knotUpdateCheckCompleted && builtinMarketHook.builtinMarketUpdateCheckCompleted && enterpriseUpdateCheckCompleted,
		batchUpdating,
		getMarketplaceSkillUpdate,
		handleUpdateMarketplaceSkill,
		handleBatchUpdateSkills,
		modifiedUpdateModalVisible,
		confirmModifiedUpdate,
		cancelModifiedUpdate,
		hubSkills: skillHubHook.hubSkills,
		hubTotal: skillHubHook.hubTotal,
		hubPage: skillHubHook.hubPage,
		hubLoading: skillHubHook.hubLoading,
		hubError: skillHubHook.hubError,
		hubCategories: skillHubHook.hubCategories,
		hubSelectedCategory: skillHubHook.hubSelectedCategory,
		setHubSelectedCategory: skillHubHook.setHubSelectedCategory,
		hubSortBy: skillHubHook.hubSortBy,
		setHubSortBy: skillHubHook.setHubSortBy,
		displayHubSkills,
		loadHubSkills: skillHubHook.loadHubSkills,
		getInstalledHubSkillUpdate: skillHubHook.getInstalledHubSkillUpdate,
		getHubInstallBtnState: skillHubHook.getHubInstallBtnState,
		isHubSkillInstalling: skillHubHook.isHubSkillInstalling,
		isHubSkillInstalled: skillHubHook.isHubSkillInstalled,
		knotSkills: knotHook.knotSkills,
		knotTotal: knotHook.knotTotal,
		knotPage: knotHook.knotPage,
		knotLoading: knotHook.knotLoading,
		knotError: knotHook.knotError,
		knotCategories: knotHook.knotCategories,
		knotTags: knotHook.knotTags,
		knotSelectedCategory: knotHook.knotSelectedCategory,
		setKnotSelectedCategory: knotHook.setKnotSelectedCategory,
		knotSelectedTag: knotHook.knotSelectedTag,
		setKnotSelectedTag: knotHook.setKnotSelectedTag,
		knotSortBy: knotHook.knotSortBy,
		setKnotSortBy: knotHook.setKnotSortBy,
		displayKnotSkills,
		loadKnotSkills: knotHook.loadKnotSkills,
		getKnotInstallBtnState: knotHook.getKnotInstallBtnState,
		getInstalledKnotSkillUpdate: knotHook.getInstalledKnotSkillUpdate,
		isKnotSkillInstalling: knotHook.isKnotSkillInstalling,
		isKnotSkillInstalled: knotHook.isKnotSkillInstalled,
		builtinMarketSkills: builtinMarketHook.builtinMarketSkills,
		displayBuiltinMarketSkills,
		builtinMarketTotal: builtinMarketHook.builtinMarketTotal,
		builtinMarketPage: builtinMarketHook.builtinMarketPage,
		builtinMarketLoading: builtinMarketHook.builtinMarketLoading,
		builtinMarketError: builtinMarketHook.builtinMarketError,
		builtinMarketCategories: builtinMarketHook.builtinMarketCategories,
		builtinMarketSelectedCategory: builtinMarketHook.builtinMarketSelectedCategory,
		setBuiltinMarketSelectedCategory: builtinMarketHook.setBuiltinMarketSelectedCategory,
		loadBuiltinMarketList: builtinMarketHook.loadBuiltinMarketList,
		getBuiltinMarketInstallBtnState: builtinMarketHook.getBuiltinMarketInstallBtnState,
		getInstalledBuiltinMarketSkillUpdate: builtinMarketHook.getInstalledBuiltinMarketSkillUpdate,
		isBuiltinMarketSkillInstalling: builtinMarketHook.isBuiltinMarketSkillInstalling,
		featuredSkills: displayFeaturedSkills,
		featuredLoading: builtinMarketHook.featuredLoading,
		loadFeaturedSkills: builtinMarketHook.loadFeaturedSkills,
		handleBuiltinMarketSkillCardClick,
		handleInstallBuiltinMarketSkill: (skill) => {
			markRecentlyInstalledBmSkill(skill, () => getBuiltinMarketSkillId(skill));
			resetDisableAllIfOn();
			return builtinMarketHook.handleInstallBuiltinMarketSkill(skill, handleTrySkill);
		},
		handleUpdateBuiltinMarketSkill: (skill) => {
			markRecentlyInstalledBmSkill(skill, () => getBuiltinMarketSkillId(skill));
			const lower = (skill?.name || "").toLowerCase();
			const skillId = getBuiltinMarketSkillId(skill);
			guardModifiedUpdate(installedSkillsHook.installedSkills.find((s) => {
				const n = (s.name || "").toLowerCase();
				return skillId && s.skillId === skillId || !!n && n === lower;
			}) ?? null, () => {
				builtinMarketHook.handleInstallBuiltinMarketSkill(skill, handleTrySkill, true);
			});
		},
		selectedSkill: skillDetailHook.selectedSkill,
		selectedHubSkill: skillDetailHook.selectedHubSkill,
		skillPreviewMode: skillDetailHook.skillPreviewMode,
		setSkillPreviewMode: skillDetailHook.setSkillPreviewMode,
		openMoreMenu: skillDetailHook.openMoreMenu,
		setOpenMoreMenu: skillDetailHook.setOpenMoreMenu,
		skillContentLoading: skillDetailHook.skillContentLoading,
		skillDetailMarkdown: skillDetailHook.skillDetailMarkdown,
		isSkillDetailView,
		isDetailView,
		moreMenuRef: skillDetailHook.moreMenuRef,
		installedPlugins: pluginsHook.installedPlugins,
		filteredInstalledPlugins,
		pluginsLoading: pluginsHook.pluginsLoading,
		selectedPlugin: pluginsHook.selectedPlugin,
		setSelectedPlugin: pluginsHook.setSelectedPlugin,
		isPluginDetailView,
		marketplacePlugins: pluginsHook.marketplacePlugins,
		marketplacePluginsLoading: pluginsHook.marketplacePluginsLoading,
		allMarketplacePlugins: pluginsHook.allMarketplacePlugins,
		allMarketplacePluginsLoading: pluginsHook.allMarketplacePluginsLoading,
		pluginMarketplaces: pluginsHook.pluginMarketplaces,
		pluginMarketplacesLoading: pluginsHook.pluginMarketplacesLoading,
		pluginsInitialized: pluginsHook.pluginsInitialized,
		currentPluginMarketplace: pluginsHook.currentPluginMarketplace,
		handlePluginMarketplaceChange: pluginsHook.handlePluginMarketplaceChange,
		showAddMarketplaceModal: pluginsHook.showAddMarketplaceModal,
		setShowAddMarketplaceModal: pluginsHook.setShowAddMarketplaceModal,
		addMarketplaceLoading: pluginsHook.addMarketplaceLoading,
		addMarketplaceError: pluginsHook.addMarketplaceError,
		setAddMarketplaceError: pluginsHook.setAddMarketplaceError,
		refreshingMarketplaces: pluginsHook.refreshingMarketplaces,
		handleAddMarketplace: pluginsHook.handleAddMarketplace,
		handleDeleteMarketplace: pluginsHook.handleDeleteMarketplace,
		handleRefreshMarketplace: pluginsHook.handleRefreshMarketplace,
		deleteConfirmVisible: pluginsHook.deleteConfirmVisible,
		pendingDeleteMarketplace: pluginsHook.pendingDeleteMarketplace,
		pendingDeletePluginNames: pluginsHook.pendingDeletePluginNames,
		deleteConfirmLoading: pluginsHook.deleteConfirmLoading,
		confirmDeleteMarketplace: pluginsHook.confirmDeleteMarketplace,
		cancelDeleteMarketplace: pluginsHook.cancelDeleteMarketplace,
		handleInstallPlugin: (plugin, scope) => {
			resetDisableAllIfOn();
			return pluginsHook.handleInstallPlugin(plugin, scope);
		},
		handleUninstallPlugin: pluginsHook.handleUninstallPlugin,
		handleTogglePluginStatus: pluginsHook.handleTogglePluginStatus,
		handleUpdatePlugin: pluginsHook.handleUpdatePlugin,
		handleOpenPluginInEditor: pluginsHook.handleOpenInEditor,
		handleOpenPluginInFolder: pluginsHook.handleOpenInFolder,
		handleOpenPluginHomepage: pluginsHook.handleOpenHomepage,
		hasProjectPath: pluginsHook.hasProjectPath,
		handleBatchUninstallPlugins: pluginsHook.handleBatchUninstallPlugins,
		handleBatchTogglePlugins: pluginsHook.handleBatchTogglePlugins,
		importFlow: installedSkillsHook.importFlow,
		showUploadModal: installedSkillsHook.showUploadModal,
		setShowUploadModal: installedSkillsHook.setShowUploadModal,
		uploading: installedSkillsHook.uploading,
		isDraggingOver: installedSkillsHook.isDraggingOver,
		uploadPolicy: installedSkillsHook.uploadPolicy,
		refreshUploadPolicy: installedSkillsHook.refreshUploadPolicy,
		uploadScanResult: installedSkillsHook.uploadScanResult,
		autoInstallNonHighRisk: installedSkillsHook.autoInstallNonHighRisk,
		onAutoInstallNonHighRiskChange: installedSkillsHook.onAutoInstallNonHighRiskChange,
		handleConfirmRiskyInstall: installedSkillsHook.handleConfirmRiskyInstall,
		handleCancelScanResult: installedSkillsHook.handleCancelScanResult,
		handleSkipScanResult: installedSkillsHook.handleSkipScanResult,
		skillRiskMap: installedSkillsHook.skillRiskMap,
		clearRisk: installedSkillsHook.clearRisk,
		handleSkillCardClick,
		handleHubSkillCardClick,
		handleKnotSkillCardClick,
		handleSearchResultSkillClick,
		handlePluginCardClick,
		handleToggleSkill,
		handleToggleInstalledPlugin,
		handleTrySkill,
		handleInstallRecommendedSkill: (skill) => {
			resetDisableAllIfOn();
			return installedSkillsHook.handleInstallRecommendedSkill(skill, handleTrySkill);
		},
		handleInstallHubSkill: (skill) => {
			if (skill?.slug) markRecentlyInstalledSlug(skill.slug);
			resetDisableAllIfOn();
			return skillHubHook.handleInstallHubSkill(skill, handleTrySkill);
		},
		handleUpdateHubSkill: (skill) => {
			if (skill?.slug) markRecentlyInstalledSlug(skill.slug);
			const slug = (skill?.slug || "").toLowerCase();
			const lower = (skill?.name || "").toLowerCase();
			guardModifiedUpdate(installedSkillsHook.installedSkills.find((s) => slug && s.slug === slug || lower && s.name?.toLowerCase() === lower) ?? null, () => {
				skillHubHook.handleInstallHubSkill(skill, handleTrySkill, true);
			});
		},
		handleInstallKnotSkill: (skill) => {
			if (skill?.slug) markRecentlyInstalledSlug(skill.slug);
			resetDisableAllIfOn();
			return knotHook.handleInstallKnotSkill(skill, handleTrySkill);
		},
		handleUpdateKnotSkill: (skill) => {
			if (skill?.slug) markRecentlyInstalledSlug(skill.slug);
			const slug = (skill?.slug || "").toLowerCase();
			const lower = (skill?.name || "").toLowerCase();
			guardModifiedUpdate(installedSkillsHook.installedSkills.find((s) => slug && s.slug === slug || lower && s.name?.toLowerCase() === lower) ?? null, () => {
				knotHook.handleInstallKnotSkill(skill, handleTrySkill, true);
			});
		},
		handleImportSkill: installedSkillsHook.handleImportSkill,
		handleUploadConfirm: installedSkillsHook.handleUploadConfirm,
		handleDragOver: installedSkillsHook.handleDragOver,
		handleDragLeave: installedSkillsHook.handleDragLeave,
		handleDrop: installedSkillsHook.handleDrop,
		handleCreateSkill: installedSkillsHook.handleCreateSkill,
		handleFindSkill: installedSkillsHook.handleFindSkill,
		handleEditSkill: isWorkBuddyDesktop() ? installedSkillsHook.handleEditSkill : void 0,
		handleDeleteSkill,
		handleBackFromDetail,
		handleOpenSkillInFolder,
		handleBatchUninstall: installedSkillsHook.handleBatchUninstall,
		handleBatchToggle: installedSkillsHook.handleBatchToggle,
		isPluginInstalling: pluginsHook.isPluginInstalling,
		enterpriseVisible: enterpriseHook.enterpriseVisible,
		enterpriseSkills: enterpriseHook.enterpriseSkills,
		displayEnterpriseSkills,
		enterpriseCategories: enterpriseHook.enterpriseCategories,
		enterpriseSelectedCategory: enterpriseHook.enterpriseSelectedCategory,
		setEnterpriseSelectedCategory: enterpriseHook.setEnterpriseSelectedCategory,
		enterpriseLoading: enterpriseHook.enterpriseLoading,
		enterpriseError: enterpriseHook.enterpriseError,
		enterpriseTotal: enterpriseHook.enterpriseTotal,
		enterprisePage: enterpriseHook.enterprisePage,
		loadEnterpriseSkills: enterpriseHook.loadEnterpriseSkills,
		enterpriseHasNewBadge: enterpriseHook.enterpriseHasNewBadge,
		markEnterpriseTabSeen: enterpriseHook.markEnterpriseTabSeen,
		handleEnterpriseSkillCardClick,
		handleInstallEnterpriseSkill: (skill) => {
			markRecentlyInstalledBmSkill(skill, () => (skill.id || "").toLowerCase());
			resetDisableAllIfOn();
			return enterpriseHook.handleInstallEnterpriseSkill(skill, handleTrySkill);
		},
		isEnterpriseSkillInstalling: enterpriseHook.isEnterpriseSkillInstalling,
		isEnterpriseSkillInstalled: enterpriseHook.isEnterpriseSkillInstalled,
		enterpriseSearchResults: enterpriseHook.enterpriseSearchResults,
		isEnterpriseSearching: enterpriseHook.isEnterpriseSearching,
		t,
		reportEvent,
		Events
	};
}
var import_react$1, bmMigratePromise;
var init_use_skills_data = __esmMin((() => {
	init_common();
	init_src();
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_task_starter_store();
	init_contexts();
	init_auth_context();
	init_i18n();
	init_useI18n();
	init_telemetry();
	init_account();
	init_environment();
	init_keyword_match();
	init_context();
	init_extension_refresh_events();
	init_types();
	init_skills_utils();
	init_use_builtin_market();
	init_use_enterprise_skills();
	init_use_installed_skills();
	init_use_knot();
	init_use_plugins();
	init_use_skill_detail();
	init_use_skill_search();
	init_use_skillhub();
	bmMigratePromise = null;
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/components/skills.tsx
var import_react, import_jsx_runtime, SkillsPanel;
var init_skills = __esmMin((() => {
	init_skills$1();
	init_src();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_icons();
	init_ArrowUpIcon();
	init_workbuddy_topbar();
	init_brand();
	init_foundation();
	init_use_debounced_value();
	init_use_delayed_visible();
	init_use_named_page_show();
	init_use_narrow_layout();
	init_use_scroll_to_top();
	init_account();
	init_environment();
	init_context();
	init_high_risk_notification_store();
	init_use_auto_update_preference();
	init_use_skills_data();
	init_components();
	import_jsx_runtime = require_jsx_runtime();
	SkillsPanel = ({ visible, active, showMcpButton, onMcpClick, skillRiskMap, clearRisk, autoInstallNonHighRisk: autoInstallNonHighRiskProp, onAutoInstallNonHighRiskChange: onAutoInstallNonHighRiskChangeProp, addAsyncTask, removeAsyncTask, updateAsyncTask, scanEnabled, headerLeft, renderDetailBack }) => {
		const host = useModuleHost();
		useNamedPageShow({
			active: !!(visible && active),
			elementId: "skill_market_page_show",
			elementName: "技能市场页面"
		});
		const adapter = host.adapter;
		const isDesktop = isWorkBuddyDesktop();
		const assistantName = ASSISTANT_NAME;
		const topBarRootClassName = useTopBarRootClassName();
		const { screenWidth } = useNarrowLayout();
		const isTopbarNarrow = screenWidth > 0 && screenWidth < 980;
		const isIOA = isIOAUser(host.accountInfo?.enterpriseId ?? "");
		const isLocalMode = adapter?.environmentType === "local";
		const handleOpenExternal = (0, import_react.useCallback)((url) => {
			if (isLocalMode) adapter?.emit("open-external", url);
			else window.open(url, "_blank");
		}, [isLocalMode, adapter]);
		const data = useSkillsData(visible, active, skillRiskMap, clearRisk, autoInstallNonHighRiskProp, onAutoInstallNonHighRiskChangeProp, addAsyncTask, removeAsyncTask, updateAsyncTask, scanEnabled);
		const { skillsSearch, setSkillsSearch, isSkillDetailView, isPluginDetailView, selectedPlugin, handleImportSkill, handleCreateSkill, handleFindSkill, uploadPolicy, importFlow, updatableSkills, updateCheckCompleted, batchUpdating, handleBatchUpdateSkills, modifiedUpdateModalVisible, confirmModifiedUpdate, cancelModifiedUpdate, refreshDisplayFilter, t } = data;
		const { scrollRef, showBackToTop, scrollToTop } = useScrollToTop();
		const showUploadOverlay = useDelayedVisible(importFlow.uploading, 3e3);
		const isUnifiedMarket = !!headerLeft;
		const [unifiedSearch, setUnifiedSearch] = (0, import_react.useState)("");
		const debouncedUnifiedSearch = useDebouncedValue(unifiedSearch, 200);
		const [level1Tab, setLevel1TabRaw] = (0, import_react.useState)("market");
		const setLevel1Tab = (0, import_react.useCallback)((tab) => {
			setLevel1TabRaw(tab);
			refreshDisplayFilter();
		}, [refreshDisplayFilter]);
		const [searchTab, setSearchTab] = (0, import_react.useState)("recommend");
		const autoSelectPendingRef = (0, import_react.useRef)(true);
		const userPickedTabRef = (0, import_react.useRef)(false);
		(0, import_react.useEffect)(() => {
			autoSelectPendingRef.current = true;
			userPickedTabRef.current = false;
			setSearchTab("recommend");
		}, [skillsSearch]);
		/**
		* 「+ 添加技能」统一入口（与聊天框 SkillSelector 的 handleImport 同款逻辑）：
		* - Desktop：直接调 importFlow.handleImportSkill（即旧 handleImportSkill），
		*   弹出 SkillsPanel 内置的 PersonalSkillImportModal——三处入口共用同一套
		*   usePersonalSkillImport hook，行为完全一致
		* - Web：走 cloud-upload-modal（multipart 上传 + 后端轮询）
		*/
		const handleAddSkill = (0, import_react.useCallback)(() => {
			if (isDesktop) {
				handleImportSkill();
				return;
			}
			openSkillUploadModal.personal({
				facades: { personalSkills: host.facades.personalSkills },
				scanEnabled: scanEnabled ?? true,
				onAsyncScanCancel: removeAsyncTask,
				onSuccess: () => {
					notifySkillListRefresh();
				}
			});
		}, [
			isDesktop,
			handleImportSkill,
			host.facades.personalSkills,
			scanEnabled,
			removeAsyncTask
		]);
		(0, import_react.useEffect)(() => {
			if (isUnifiedMarket && debouncedUnifiedSearch !== skillsSearch) setSkillsSearch(debouncedUnifiedSearch);
		}, [
			isUnifiedMarket,
			debouncedUnifiedSearch,
			skillsSearch,
			setSkillsSearch
		]);
		const isUnifiedSubPage = isUnifiedMarket && level1Tab === "installed";
		const handleBackToSkillsMarket = (0, import_react.useCallback)(() => {
			setLevel1Tab("market");
		}, [setLevel1Tab]);
		const { autoUpdateEnabled } = useAutoUpdatePreference();
		const [showBatchUpdateModal, setShowBatchUpdateModal] = (0, import_react.useState)(false);
		const batchUpdateShownRef = (0, import_react.useRef)(false);
		const getTodayDateString = (0, import_react.useCallback)(() => {
			const today = /* @__PURE__ */ new Date();
			return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
		}, []);
		const wasModalShownToday = (0, import_react.useCallback)(() => {
			try {
				return localStorage.getItem("skills_batch_update_modal_date") === getTodayDateString();
			} catch {
				return false;
			}
		}, [getTodayDateString]);
		const markModalShownToday = (0, import_react.useCallback)(() => {
			try {
				localStorage.setItem("skills_batch_update_modal_date", getTodayDateString());
			} catch {}
		}, [getTodayDateString]);
		const modalUpdatableSkills = autoUpdateEnabled ? [] : updatableSkills.filter((u) => !u.skill.userModified);
		(0, import_react.useEffect)(() => {
			if (visible && active && updateCheckCompleted && modalUpdatableSkills.length > 0 && !batchUpdateShownRef.current && !wasModalShownToday()) {
				batchUpdateShownRef.current = true;
				setShowBatchUpdateModal(true);
				markModalShownToday();
			}
			if (!visible || !active) batchUpdateShownRef.current = false;
		}, [
			visible,
			active,
			updateCheckCompleted,
			modalUpdatableSkills.length,
			wasModalShownToday,
			markModalShownToday
		]);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatchUpdateModal, {
				visible: showBatchUpdateModal,
				updatableSkills: modalUpdatableSkills,
				updating: batchUpdating,
				onClose: (0, import_react.useCallback)(() => {
					setShowBatchUpdateModal(false);
				}, []),
				onConfirm: (0, import_react.useCallback)(() => {
					handleBatchUpdateSkills(modalUpdatableSkills);
					setShowBatchUpdateModal(false);
				}, [handleBatchUpdateSkills, modalUpdatableSkills]),
				t
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModifiedSkillUpdateConfirmModal, {
				visible: modifiedUpdateModalVisible,
				onCancel: cancelModifiedUpdate,
				onConfirm: confirmModifiedUpdate,
				t
			}),
			isDesktop && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonalSkillImportModal, {
				flow: importFlow,
				scanEnabled: scanEnabled ?? true,
				showUploadOverlay
			}),
			(isSkillDetailView || isPluginDetailView) && isUnifiedMarket && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "skills-view skills-view--detail",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
						className: `${topBarRootClassName} ec-topbar ec-topbar--subpage`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ec-topbar__left",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarExpandButton, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarNewTaskButton, {}),
								renderDetailBack?.({
									fromInstalled: isUnifiedSubPage,
									onBackToInstalled: data.handleBackFromDetail,
									onBackToMarket: () => {
										data.handleBackFromDetail();
										handleBackToSkillsMarket();
									}
								}) ?? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "ec-topbar__back",
									onClick: data.handleBackFromDetail,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeftIcon, {
										width: 16,
										height: 16
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("skills.title") })]
								})
							]
						})
					}),
					isSkillDetailView && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillDetailView, { data }),
					isPluginDetailView && selectedPlugin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PluginDetailView, {
						data,
						selectedPlugin
					})
				]
			}),
			!isSkillDetailView && !isPluginDetailView && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "skills-view",
				children: [
					isUnifiedMarket && !isUnifiedSubPage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: `${topBarRootClassName} ec-topbar`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ec-topbar__left",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarExpandButton, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarNewTaskButton, {}),
								headerLeft
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ec-topbar__right",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "ec-search-wrapper",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input.Search, {
										placeholder: t("unifiedMarket.search.skills"),
										value: unifiedSearch,
										onChange: (e) => setUnifiedSearch(e.target.value),
										allowClear: true
									})
								}),
								(() => {
									const installedTotal = data.installedSkills.length + (data.installedPlugins?.length ?? 0);
									const installedLabel = t("unifiedMarket.myInstalled");
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
										content: isTopbarNarrow ? installedLabel : void 0,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											variant: "grey",
											iconOnly: isTopbarNarrow,
											"aria-label": installedLabel,
											leftIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstalledSkillIcon, {}),
											onClick: () => setLevel1Tab("installed"),
											"data-track-id": "skill_market_my_installed_open",
											"data-track-name": "打开我安装的技能",
											children: [!isTopbarNarrow && installedLabel, !isTopbarNarrow && installedTotal > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "skills-installed-pill-badge",
												children: installedTotal
											})]
										})
									});
								})(),
								uploadPolicy?.allowed !== false && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
									content: isTopbarNarrow ? t("unifiedMarket.addSkill") : void 0,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dropdown, {
										placement: "bottom-end",
										items: [
											{
												key: "find",
												label: t("skills.find.button")
											},
											{
												key: "upload",
												label: t("skills.import.button"),
												trackId: "skill_upload",
												trackName: "上传技能",
												trackProps: { type: "upload" }
											},
											{
												key: "create",
												label: t("skills.create.button"),
												trackId: "skill_create_new",
												trackName: "创建技能",
												trackProps: { type: "create" }
											}
										],
										onSelect: (key) => {
											if (key === "find") handleFindSkill();
											else if (key === "upload") handleAddSkill();
											else if (key === "create") handleCreateSkill();
										},
										trigger: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "grey",
											iconOnly: isTopbarNarrow,
											"aria-label": t("unifiedMarket.addSkill"),
											leftIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddCircleIcon, {}),
											children: !isTopbarNarrow && t("unifiedMarket.addSkill")
										})
									})
								})
							]
						})]
					}),
					isUnifiedMarket && isUnifiedSubPage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
						className: `${topBarRootClassName} ec-topbar ec-topbar--subpage`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ec-topbar__left",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarExpandButton, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarNewTaskButton, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Breadcrumb, {
									leadingIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeftIcon, {
										width: 16,
										height: 16
									}),
									onLeadingIconClick: handleBackToSkillsMarket,
									leadingIconAriaLabel: t("skills.backToAll"),
									items: [{
										key: "all-skills",
										label: t("skills.backToAll"),
										onClick: (e) => {
											e.preventDefault();
											handleBackToSkillsMarket();
										}
									}]
								})
							]
						})
					}),
					!isUnifiedMarket && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "skills-view-header",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "skills-view-header-top",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: t("skills.title") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("skills.subtitle", { name: assistantName }) })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "skills-header-actions",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchInput, {
									placeholder: t("skills.searchPlaceholder"),
									value: skillsSearch,
									onChange: (value) => setSkillsSearch(value),
									clearable: true
								}), uploadPolicy?.allowed !== false && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dropdown, {
									placement: "bottom-end",
									items: [
										{
											key: "find",
											label: t("skills.find.button")
										},
										{
											key: "upload",
											label: t("skills.import.button"),
											trackId: "skill_upload",
											trackName: "上传技能",
											trackProps: { type: "upload" }
										},
										{
											key: "create",
											label: t("skills.create.button"),
											trackId: "skill_create_new",
											trackName: "创建技能",
											trackProps: { type: "create" }
										}
									],
									onSelect: (key) => {
										if (key === "find") handleFindSkill();
										else if (key === "upload") handleAddSkill();
										else if (key === "create") handleCreateSkill();
									},
									trigger: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "small",
										variant: "grey",
										leftIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddCircleIcon, {}),
										children: t("skills.add.button")
									})
								})]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "skills-content",
						ref: scrollRef,
						children: [level1Tab === "market" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DiscoverSection, {
							data,
							showMcpButton,
							onMcpClick,
							isIOAUser: isIOA,
							onOpenExternal: handleOpenExternal,
							searchTab,
							setSearchTab,
							autoSelectPendingRef,
							userPickedTabRef
						}), level1Tab === "installed" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstalledSection, {
							data,
							resetSortOrder: active,
							scrollRef,
							subPage: isUnifiedSubPage ? { onBack: handleBackToSkillsMarket } : void 0
						})]
					}),
					showBackToTop && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "skills-back-to-top",
						onClick: scrollToTop,
						"aria-label": "Back to top",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpIcon, {})
					})
				]
			}),
			isSkillDetailView && !isUnifiedMarket && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillDetailView, { data }),
			isPluginDetailView && selectedPlugin && !isUnifiedMarket && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PluginDetailView, {
				data,
				selectedPlugin
			})
		] });
	};
}));
//#endregion
export { init_skills as n, SkillsPanel as t };
