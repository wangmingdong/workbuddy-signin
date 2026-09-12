import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { Mt as WORKBUDDY_FLOATING_LAYER_OPEN_BODY_CLASS, Nt as useBodyClassRefCount, xt as init_hooks } from "./agent-mail-CiuzbR2o.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { b as isWorkBuddyDesktop, p as init_environment } from "./environment-DKqg3f0G.js";
import { a as init_i18n, n as getLocale } from "./i18n-Bt_Wap4p.js";
import { r as useTranslation, t as init_useI18n } from "./useI18n-DDytAo7_.js";
import { i as useModuleHost } from "./module-host-context-CI9spvhq.js";
import { C as CategoryChip, a as getBuiltinMarketDisplayName, c as init_skill_card_helpers, r as init_skill_card, t as SkillCard, w as init_category_chip } from "./skill-card-BX-gt0I0.js";
import { t as init_context } from "./context-2xODbZdo.js";
import { t as init_skills } from "./skills-DApVmNog.js";
//#region ../../packages/agent-ui/src/modules/skills/components/skill-picker.less
var init_skill_picker$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/components/skill-picker-helpers.ts
/**
* 按 tab 加载对应市场的分类列表，归一化为 NormalizedCategory[]。
* - recommend → builtin.getCategories('skill')
* - skillhub → skillhub.getCategories()
* - knot     → knot.getCategories()
* - plugins / installed → 无分类，返回空数组
*/
async function loadCategoriesForTab(tab, marketplace) {
	const isEn = getLocale() === "en";
	if (tab === "recommend") {
		const res = await marketplace.builtin.getCategories("skill");
		if (res.code !== 0 || !Array.isArray(res.data?.items)) return [];
		return res.data.items.map((c) => ({
			id: c.id,
			label: (isEn ? c.name_en || c.name_zh : c.name_zh || c.name_en) || c.id,
			sortOrder: c.sort_order
		})).sort((a, b) => a.sortOrder - b.sortOrder);
	}
	if (tab === "skillhub") {
		const res = await marketplace.skillhub.getCategories();
		if (!Array.isArray(res.items)) return [];
		return res.items.filter((c) => c.active !== false).map((c) => ({
			id: c.key,
			label: (isEn ? c.nameEn || c.name : c.name || c.nameEn) || c.key,
			sortOrder: c.sortOrder
		})).sort((a, b) => a.sortOrder - b.sortOrder);
	}
	if (tab === "knot") {
		const res = await marketplace.knot.getCategories();
		if (!Array.isArray(res.items)) return [];
		return res.items.filter((c) => c.active !== false).map((c) => ({
			id: c.key,
			label: (isEn ? c.nameEn || c.name : c.name || c.nameEn) || c.key,
			sortOrder: c.sortOrder
		})).sort((a, b) => a.sortOrder - b.sortOrder);
	}
	return [];
}
function getSkillDisplayName(skill) {
	return getBuiltinMarketDisplayName(skill);
}
function getSkillDescription(skill) {
	return getLocale() === "en" ? skill.description_en || skill.description || skill.description_zh || "" : skill.description_zh || skill.description || skill.description_en || "";
}
function getSkillIcon(skill) {
	const raw = (skill.icon_url || skill.icon || "").trim();
	return /^https?:\/\//i.test(raw) ? raw : void 0;
}
function getSkillId(skill) {
	return skill.skill_id || skill.slug || skill.id || skill.name;
}
function skillToPickerItem(skill) {
	return {
		id: getSkillId(skill),
		name: getSkillDisplayName(skill),
		description: getSkillDescription(skill),
		iconUrl: getSkillIcon(skill)
	};
}
function useInfiniteScroll(onLoadMore, enabled) {
	const [sentinelEl, setSentinelEl] = (0, import_react$1.useState)(null);
	(0, import_react$1.useEffect)(() => {
		if (!sentinelEl || !enabled) return;
		const observer = new IntersectionObserver((entries) => {
			if (entries[0]?.isIntersecting) onLoadMore();
		}, { rootMargin: "200px" });
		observer.observe(sentinelEl);
		return () => observer.disconnect();
	}, [
		sentinelEl,
		onLoadMore,
		enabled
	]);
	return (0, import_react$1.useCallback)((node) => setSentinelEl(node), []);
}
var import_react$1, TAB_LABELS;
var init_skill_picker_helpers = __esmMin((() => {
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_i18n();
	init_skill_card_helpers();
	TAB_LABELS = {
		recommend: "skills.tab.recommend",
		skillhub: "skills.tab.skillhub",
		plugins: "skills.tab.plugins",
		knot: "skills.tab.knot",
		installed: "skills.tab.installed"
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/components/skill-picker.tsx
var import_react, import_jsx_runtime, PAGE_SIZE, CloseIcon, SkillPicker;
//#endregion
__esmMin((() => {
	init_skills();
	init_skill_picker$1();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_hooks();
	init_useI18n();
	init_environment();
	init_context();
	init_category_chip();
	init_skill_card();
	init_skill_picker_helpers();
	import_jsx_runtime = require_jsx_runtime();
	PAGE_SIZE = 100;
	CloseIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 24",
		width: "18",
		height: "18",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: "18",
			y1: "6",
			x2: "6",
			y2: "18"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: "6",
			y1: "6",
			x2: "18",
			y2: "18"
		})]
	});
	SkillPicker = ({ visible, onSelect, onClose, selectedIds: externalSelectedIds, selectedItems: externalSelectedItems, markets: propMarkets, tabs: propTabs }) => {
		const t = useTranslation();
		const host = useModuleHost();
		useBodyClassRefCount(WORKBUDDY_FLOATING_LAYER_OPEN_BODY_CLASS, visible);
		const showInstalledTab = isWorkBuddyDesktop();
		const [activeTab, setActiveTab] = (0, import_react.useState)("recommend");
		const [categoriesByTab, setCategoriesByTab] = (0, import_react.useState)({});
		const [selectedCategory, setSelectedCategory] = (0, import_react.useState)("");
		const [skills, setSkills] = (0, import_react.useState)([]);
		const [isLoading, setIsLoading] = (0, import_react.useState)(false);
		const [searchKeyword, setSearchKeyword] = (0, import_react.useState)("");
		const [localSearch, setLocalSearch] = (0, import_react.useState)("");
		const [pickedIds, setPickedIds] = (0, import_react.useState)(/* @__PURE__ */ new Set());
		const searchTimerRef = (0, import_react.useRef)(null);
		const [page, setPage] = (0, import_react.useState)(1);
		const [total, setTotal] = (0, import_react.useState)(0);
		const [isLoadingMore, setIsLoadingMore] = (0, import_react.useState)(false);
		const [installedSkills, setInstalledSkills] = (0, import_react.useState)([]);
		const [isInstalledLoading, setIsInstalledLoading] = (0, import_react.useState)(false);
		const allSkillsMapRef = (0, import_react.useRef)(/* @__PURE__ */ new Map());
		const marketplace = (0, import_react.useMemo)(() => {
			try {
				return host.facades.skillsMarketplace;
			} catch {
				return;
			}
		}, [host.facades]);
		const pluginFacade = (0, import_react.useMemo)(() => {
			try {
				return host.facades.plugin;
			} catch {
				return;
			}
		}, [host.facades]);
		const enterpriseId = (0, import_react.useMemo)(() => {
			const eid = host.accountInfo?.enterpriseId;
			return typeof eid === "string" && eid.trim() ? eid.trim() : void 0;
		}, [host.accountInfo]);
		(0, import_react.useEffect)(() => {
			if (!visible || !marketplace) return;
			if (activeTab === "plugins" || activeTab === "installed") return;
			if (categoriesByTab[activeTab]) return;
			let cancelled = false;
			loadCategoriesForTab(activeTab, marketplace).then((items) => {
				if (cancelled) return;
				setCategoriesByTab((prev) => ({
					...prev,
					[activeTab]: items
				}));
			}).catch(() => {});
			return () => {
				cancelled = true;
			};
		}, [
			visible,
			marketplace,
			activeTab,
			categoriesByTab
		]);
		/** 当前 tab 对应的归一化分类列表 */
		const categories = categoriesByTab[activeTab] ?? [];
		const loadSkills = (0, import_react.useCallback)(async (targetPage, append) => {
			if (!marketplace) return;
			if (append) setIsLoadingMore(true);
			else setIsLoading(true);
			try {
				let result = [];
				let resultTotal = 0;
				if (activeTab === "recommend") {
					const params = {
						page: targetPage,
						pageSize: PAGE_SIZE
					};
					if (selectedCategory) params.categories = [selectedCategory];
					if (searchKeyword.trim()) params.keyword = searchKeyword.trim();
					if (enterpriseId) params.enterpriseId = enterpriseId;
					const res = await marketplace.builtin.list(params);
					result = res.code === 0 ? res.data?.skills ?? [] : [];
					resultTotal = res.data?.total_count ?? result.length;
				} else if (activeTab === "skillhub") {
					const params = {
						page: targetPage,
						pageSize: PAGE_SIZE
					};
					if (selectedCategory) params.category = selectedCategory;
					if (searchKeyword.trim()) params.keyword = searchKeyword.trim();
					const res = await marketplace.skillhub.list(params);
					result = (res.data?.skills ?? []).map((s) => ({
						id: s.slug || s.name,
						skill_id: s.slug || s.name,
						name: s.name,
						description: s.display_name || s.name,
						description_zh: s.description_zh || s.description,
						description_en: s.description_en || s.description,
						icon: s.icon,
						icon_url: s.icon_url,
						version: s.version
					}));
					resultTotal = res.data?.total ?? result.length;
				} else if (activeTab === "knot") {
					const params = {
						page: targetPage,
						pageSize: PAGE_SIZE
					};
					if (selectedCategory) params.category = selectedCategory;
					if (searchKeyword.trim()) params.keyword = searchKeyword.trim();
					const res = await marketplace.knot.list(params);
					result = (res.data?.skills ?? []).map((s) => ({
						id: s.slug || s.name || String(s.id),
						skill_id: s.slug || s.name || String(s.id),
						name: s.name || s.skill_name,
						description: s.display_name || s.name,
						description_zh: s.description_zh || s.description,
						description_en: s.description_en || s.description,
						icon: s.icon,
						icon_url: s.icon_url,
						version: s.version
					}));
					resultTotal = res.data?.total ?? result.length;
				} else if (activeTab === "plugins") {
					if (pluginFacade) {
						const filtered = (await pluginFacade.getPluginMarketplaces(false) ?? []).filter((m) => m.name !== "experts" && m.name !== "my-experts");
						if (filtered.length > 0) {
							const allResults = await Promise.allSettled(filtered.map((m) => pluginFacade.getMarketplacePlugins(m.id || m.name, false)));
							for (const r of allResults) if (r.status === "fulfilled" && r.value) for (const p of r.value) result.push({
								id: p.name || p.slug,
								skill_id: p.name || p.slug,
								name: p.name,
								description: p.displayName || p.description || p.name,
								description_zh: p.description,
								description_en: p.description,
								icon: p.icon
							});
						}
					}
					resultTotal = result.length;
				}
				const provider = activeTab === "recommend" ? "market" : activeTab;
				for (const s of result) allSkillsMapRef.current.set(getSkillId(s), {
					...skillToPickerItem(s),
					provider
				});
				if (append) setSkills((prev) => [...prev, ...result]);
				else setSkills(result);
				setPage(targetPage);
				setTotal(resultTotal);
			} catch {
				if (!append) setSkills([]);
			} finally {
				if (append) setIsLoadingMore(false);
				else setIsLoading(false);
			}
		}, [
			marketplace,
			pluginFacade,
			activeTab,
			selectedCategory,
			searchKeyword,
			enterpriseId
		]);
		(0, import_react.useEffect)(() => {
			if (!visible || !marketplace || activeTab === "installed") return;
			loadSkills(1, false);
		}, [
			visible,
			marketplace,
			activeTab,
			selectedCategory,
			searchKeyword,
			enterpriseId
		]);
		(0, import_react.useEffect)(() => {
			if (!visible || !showInstalledTab || activeTab !== "installed") return;
			const personalSkills = host.facades.personalSkills;
			if (!personalSkills) return;
			let cancelled = false;
			setIsInstalledLoading(true);
			personalSkills.list({
				cwd: "",
				global: false,
				excludePluginSkills: true
			}).then((res) => {
				if (cancelled) return;
				const rawResults = (res.results ?? []).filter((s) => s.source !== "builtin" && s.source !== "connector");
				const items = rawResults.map((s) => {
					const resolvedId = s.skillId || s.slug || s.name;
					return {
						id: resolvedId,
						skill_id: resolvedId,
						name: s.name,
						description: s.displayName || s.name,
						description_zh: s.description || s.displayName,
						description_en: s.description || s.displayName,
						icon: s.icon,
						icon_url: s.iconUrl,
						version: s.version
					};
				});
				setInstalledSkills(items);
				setPickedIds((prev) => {
					const nameToIdMap = /* @__PURE__ */ new Map();
					for (const item of items) {
						const sid = getSkillId(item);
						if (sid !== item.name) nameToIdMap.set(item.name, sid);
					}
					let changed = false;
					const next = new Set(prev);
					for (const pickedId of prev) {
						const resolved = nameToIdMap.get(pickedId);
						if (resolved) {
							next.delete(pickedId);
							next.add(resolved);
							changed = true;
						}
					}
					return changed ? next : prev;
				});
				for (let i = 0; i < items.length; i++) {
					const sid = getSkillId(items[i]);
					const raw = rawResults[i];
					const existing = allSkillsMapRef.current.get(sid);
					if (existing && existing.provider !== "custom") continue;
					const item = skillToPickerItem(items[i]);
					item.filePath = raw?.filePath;
					allSkillsMapRef.current.set(sid, {
						...item,
						provider: "custom"
					});
				}
			}).catch(() => {
				if (!cancelled) setInstalledSkills([]);
			}).finally(() => {
				if (!cancelled) setIsInstalledLoading(false);
			});
			return () => {
				cancelled = true;
			};
		}, [
			visible,
			showInstalledTab,
			activeTab,
			host.facades
		]);
		const hasMore = skills.length < total && !isLoading;
		const sentinelRef = useInfiniteScroll((0, import_react.useCallback)(() => {
			if (!isLoadingMore && !isLoading && hasMore) loadSkills(page + 1, true);
		}, [
			isLoadingMore,
			isLoading,
			hasMore,
			page,
			loadSkills
		]), hasMore);
		(0, import_react.useEffect)(() => {
			if (visible) {
				setPickedIds(new Set(externalSelectedIds ?? []));
				allSkillsMapRef.current = /* @__PURE__ */ new Map();
				setCategoriesByTab({});
				setActiveTab("recommend");
				setSelectedCategory("");
				setSearchKeyword("");
				setLocalSearch("");
			}
		}, [visible, externalSelectedIds]);
		const handleTabChange = (0, import_react.useCallback)((tab) => {
			setActiveTab(tab);
			setSelectedCategory("");
		}, []);
		(0, import_react.useEffect)(() => {
			if (!visible) return;
			const h = (e) => {
				if (e.key === "Escape") onClose();
			};
			document.addEventListener("keydown", h);
			return () => document.removeEventListener("keydown", h);
		}, [visible, onClose]);
		const handleSearchInput = (0, import_react.useCallback)((value) => {
			setLocalSearch(value);
			if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
			searchTimerRef.current = setTimeout(() => setSearchKeyword(value), 250);
		}, []);
		const handleToggle = (0, import_react.useCallback)((id) => {
			setPickedIds((prev) => {
				const next = new Set(prev);
				if (next.has(id)) next.delete(id);
				else next.add(id);
				return next;
			});
		}, []);
		const externalItemsMap = (0, import_react.useMemo)(() => {
			if (!externalSelectedItems?.length) return /* @__PURE__ */ new Map();
			return new Map(externalSelectedItems.map((s) => [s.id, s]));
		}, [externalSelectedItems]);
		const handleConfirm = (0, import_react.useCallback)(() => {
			if (pickedIds.size === 0) {
				onClose();
				return;
			}
			const selected = [];
			for (const id of pickedIds) {
				const cached = allSkillsMapRef.current.get(id);
				if (cached) {
					selected.push(cached);
					continue;
				}
				const skill = skills.find((s) => getSkillId(s) === id) || installedSkills.find((s) => getSkillId(s) === id);
				if (skill) {
					const fallbackProvider = activeTab === "installed" ? "market" : activeTab === "recommend" ? "market" : activeTab;
					selected.push({
						...skillToPickerItem(skill),
						provider: fallbackProvider
					});
					continue;
				}
				const externalItem = externalItemsMap.get(id);
				if (externalItem) selected.push({
					...externalItem,
					provider: externalItem.provider ?? "market"
				});
				else selected.push({
					id,
					name: id,
					provider: "market"
				});
			}
			onSelect(selected);
		}, [
			pickedIds,
			skills,
			installedSkills,
			externalItemsMap,
			onSelect,
			onClose
		]);
		const handleOverlayClick = (0, import_react.useCallback)((e) => {
			if (e.target === e.currentTarget) onClose();
		}, [onClose]);
		const baseTabs = propMarkets ?? propTabs ?? [
			"recommend",
			"skillhub",
			"plugins",
			"knot"
		];
		const tabs = (0, import_react.useMemo)(() => {
			if (showInstalledTab && !propMarkets && !baseTabs.includes("installed")) return [...baseTabs, "installed"];
			return baseTabs;
		}, [
			showInstalledTab,
			propMarkets,
			baseTabs
		]);
		const displayLoading = activeTab === "installed" ? isInstalledLoading : isLoading;
		const allowedProviders = (0, import_react.useMemo)(() => {
			const set = /* @__PURE__ */ new Set();
			for (const tab of baseTabs) if (tab === "recommend") set.add("market");
			else if (tab !== "installed") set.add(tab);
			set.add("custom");
			return set;
		}, [baseTabs]);
		const filteredDisplaySkills = (0, import_react.useMemo)(() => {
			if (activeTab !== "installed") return skills;
			let source = installedSkills;
			source = source.filter((s) => {
				const sid = getSkillId(s);
				const cached = allSkillsMapRef.current.get(sid);
				return !cached?.provider || allowedProviders.has(cached.provider);
			});
			if (searchKeyword.trim()) {
				const kw = searchKeyword.trim().toLowerCase();
				source = source.filter((s) => getSkillDisplayName(s).toLowerCase().includes(kw) || getSkillDescription(s).toLowerCase().includes(kw));
			}
			return source;
		}, [
			activeTab,
			installedSkills,
			skills,
			searchKeyword,
			allowedProviders
		]);
		if (!visible) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "skill-picker-overlay",
			onClick: handleOverlayClick,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "skill-picker-panel",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "skill-picker-header",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "skill-picker-title",
							children: t("skills.picker.title")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "skill-picker-header-right",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								className: "skill-picker-search",
								placeholder: t("skills.picker.searchPlaceholder"),
								value: localSearch,
								onChange: (e) => handleSearchInput(e.target.value)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "skill-picker-close",
								onClick: onClose,
								"aria-label": "Close",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloseIcon, {})
							})]
						})]
					}),
					tabs.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "skill-picker-tabs",
						children: tabs.map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: `skill-picker-tab${activeTab === tab ? " skill-picker-tab--active" : ""}`,
							onClick: () => handleTabChange(tab),
							children: t(TAB_LABELS[tab])
						}, tab))
					}),
					activeTab !== "installed" && activeTab !== "plugins" && !searchKeyword && categories.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "skill-picker-categories",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryChip, {
							label: t("expertCenter.allCategory"),
							active: !selectedCategory,
							onClick: () => setSelectedCategory("")
						}), categories.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryChip, {
							label: cat.label,
							active: selectedCategory === cat.id,
							onClick: () => setSelectedCategory(cat.id)
						}, cat.id))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "skill-picker-body",
						children: displayLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "skill-picker-loading",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "ec-grid-spinner" })
						}) : filteredDisplaySkills.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "skill-picker-empty",
							children: searchKeyword ? t("skills.picker.noResult") : t(`skills.picker.empty.${activeTab}`)
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "skill-picker-grid",
							children: [
								filteredDisplaySkills.map((skill, index) => {
									const skillId = getSkillId(skill);
									const isSelected = pickedIds.has(skillId);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: `skill-picker-card${isSelected ? " skill-picker-card--selected" : ""}`,
										onClick: (e) => {
											e.stopPropagation();
											handleToggle(skillId);
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillCard, {
											name: getSkillDisplayName(skill),
											description: getSkillDescription(skill),
											useAvatar: true,
											skillIconUrl: getSkillIcon(skill)
										}), isSelected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "skill-picker-check",
											"aria-hidden": "true",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
												width: "12",
												height: "12",
												viewBox: "0 0 16 16",
												fill: "none",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
													d: "M3.5 8.5L6.5 11.5L12.5 4.5",
													stroke: "currentColor",
													strokeWidth: "2.5",
													strokeLinecap: "round",
													strokeLinejoin: "round"
												})
											})
										})]
									}, `${skillId}-${index}`);
								}),
								activeTab !== "installed" && hasMore && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									ref: sentinelRef,
									style: { height: 1 }
								}),
								activeTab !== "installed" && isLoadingMore && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "skill-picker-loading-more",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "ec-grid-spinner" })
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "skill-picker-footer",
						children: [pickedIds.size > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "skill-picker-count",
							children: t("skills.picker.selectedCount", { count: String(pickedIds.size) })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "skill-picker-footer-actions",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "skill-picker-btn skill-picker-btn--secondary",
								onClick: onClose,
								children: t("skills.picker.cancel")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "skill-picker-btn skill-picker-btn--primary",
								onClick: handleConfirm,
								disabled: pickedIds.size === 0,
								children: t("skills.picker.confirm")
							})]
						})]
					})
				]
			})
		});
	};
}))();
export { SkillPicker as default };
