import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { t as init_contexts } from "./contexts-D7XKqa2J.js";
import { r as useAdapter } from "./adapter-context-DGaRYQ5R.js";
import { n as init_ima_api_context, r as useOptionalImaApiBridge } from "./ima-api-context-C8-EzcEu.js";
import { r as useTranslation, t as init_useI18n } from "./useI18n-DDytAo7_.js";
import { Dt as init_no_knowledge_base_update, G as fetchFrequentTeams, J as fetchPinnedTeamSpaces, Ot as no_knowledge_base_update_default, P as fetchLexiangTempLoginUrl, R as init_auth_service, U as fetchEntryChildren, X as fetchRecentSpaces, Y as fetchRecentEntries, Z as fetchTeamSpaces, a as KbDefaultIcon, at as isDirectlyUsableLogoUrl, c as init_team_default_icon, et as searchKb, l as init_api, o as init_kb_default_icon, ot as parseLexiangSearchExtraInfo, q as fetchPersonalSpace, rt as init_mcp_client, s as TeamDefaultIcon, st as resolveSpaceLogoUrl, tt as searchTeams } from "./lexiang-file-type-icon-BHHdkoaP.js";
import { C as init_constants, T as LEXIANG_WEB_ORIGIN_STAGING, a as init_use_lexiang_check_auth_gate, c as lexiangAuthStore, n as init_auth_guide, o as useLexiangCheckAuthGate, s as init_lexiang_auth_store, t as AuthGuide, u as useLexiangAuth, w as LEXIANG_WEB_ORIGIN_PROD } from "./auth-guide-DhEAKsIJ.js";
import { _ as useLexiangLicense, a as useDebouncedValue, c as KbItemRow, d as init_kb_cascade_view, f as DocKindIcon, g as init_use_lexiang_license, h as init_license_denied, i as init_use_debounced_value, l as init_kb_item_row, m as LexiangLicenseDeniedView, n as init_merge_pinned_spaces, o as PickerDialogShell, p as init_picker_icons, r as mergePinnedAndNormalSpaces, s as init_picker_dialog_shell, t as filterOutPinned, u as KbCascadeView, v as init_tokens } from "./merge-pinned-spaces-D2eSKMrF.js";
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/components/picker/lexiang-content-picker.less
var init_lexiang_content_picker$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/components/picker/shared/doc-node-state.ts
function createEmptyDocNodeState() {
	return {
		children: [],
		loading: false,
		loaded: false,
		error: null,
		nextPageToken: void 0
	};
}
function shouldLoadDocNode(state) {
	return !state.loaded && !state.loading;
}
function mergeDocChildrenPage(state, page, previousPageToken) {
	const validNextPageToken = page.children.length > 0 && page.nextPageToken !== previousPageToken ? page.nextPageToken : void 0;
	return {
		...state,
		children: [...state.children, ...page.children],
		loading: false,
		loaded: true,
		error: null,
		nextPageToken: validNextPageToken
	};
}
var init_doc_node_state = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/components/picker/use-lexiang-content-data.ts
function mapTeam(raw) {
	return {
		id: raw.id,
		name: raw.name
	};
}
function mapSpace(raw, visitTime) {
	return {
		id: raw.id,
		name: raw.name,
		lastVisitedAt: visitTime ? Number(visitTime) * 1e3 : void 0,
		meta: {
			rootEntryId: raw.root_entry_id,
			teamId: raw.team_id,
			rawLogo: raw.logo
		}
	};
}
/**
* 过滤掉缺少关键字段（id 或 name）的原始 entry。
* 乐享接口偶发返回空壳条目（没有 name/id），直接渲染会出现空白行，且 React key 缺失，统一在数据源过滤。
*/
function isValidRawEntry(raw) {
	if (!raw) return false;
	if (!raw.id) return false;
	if (typeof raw.name !== "string" || raw.name.trim().length === 0) return false;
	return true;
}
function mapEntryKind(entryType, extension) {
	if (entryType === "folder") return "folder";
	if (entryType === "flink") return "other";
	const ext = extension?.toLowerCase();
	if (ext === "sheet" || ext === "smartsheet" || ext === "xlsx" || ext === "xls") return "sheet";
	if (ext === "mind" || ext === "mm") return "mind";
	if (ext === "slide" || ext === "ppt" || ext === "pptx") return "slide";
	if (ext === "pdf") return "pdf";
	return "doc";
}
function mapEntry(raw, kbId, kbName, teamId, teamName) {
	return {
		id: raw.id,
		name: raw.name,
		kind: mapEntryKind(raw.entry_type, raw.extension),
		extension: raw.extension,
		kbId,
		kbName,
		teamId,
		teamName,
		parentId: raw.parent_id,
		updatedAt: raw.edited_at ? Number(raw.edited_at) * 1e3 : void 0,
		meta: {
			hasChildren: raw.has_children ?? false,
			entryType: raw.entry_type,
			targetId: raw.target_id
		}
	};
}
/**
* 批量解析知识库列表中的 logo URL（就地修改 kbItem.logoUrl）。
* 返回 true 表示有任何 logo 被成功解析（需要触发重渲染）。
*/
async function resolveLogosForKbs(kbs) {
	const toResolve = kbs.filter((kb) => kb.meta?.rawLogo && !kb.logoUrl);
	if (toResolve.length === 0) return false;
	return (await Promise.allSettled(toResolve.map(async (kb) => {
		const url = await resolveSpaceLogoUrl(kb.meta?.rawLogo);
		if (url) {
			kb.logoUrl = url;
			return true;
		}
		return false;
	}))).some((r) => r.status === "fulfilled" && r.value === true);
}
function cachedFetch(key, fetcher) {
	if (!contentCache.has(key)) {
		const promise = fetcher().catch((err) => {
			contentCache.delete(key);
			throw err;
		});
		contentCache.set(key, promise);
	}
	return contentCache.get(key);
}
function clearContentDataCache() {
	contentCache.clear();
}
function useLexiangContentData() {
	const isConnected = useLexiangAuth((s) => s.authStatus) === "connected";
	const [loading, setLoading] = (0, import_react$1.useState)(false);
	const [error, setError] = (0, import_react$1.useState)(null);
	const [teams, setTeams] = (0, import_react$1.useState)([]);
	const [teamsHasMore, setTeamsHasMore] = (0, import_react$1.useState)(false);
	const [teamsLoadingMore, setTeamsLoadingMore] = (0, import_react$1.useState)(false);
	const teamsNextPageTokenRef = (0, import_react$1.useRef)(void 0);
	const teamsLoadingMoreRef = (0, import_react$1.useRef)(false);
	const [recentKbs, setRecentKbs] = (0, import_react$1.useState)([]);
	const [personalKb, setPersonalKb] = (0, import_react$1.useState)(null);
	const [recentDocs, setRecentDocs] = (0, import_react$1.useState)([]);
	const [recentDocsLoading, setRecentDocsLoading] = (0, import_react$1.useState)(false);
	const spaceMapRef = (0, import_react$1.useRef)(/* @__PURE__ */ new Map());
	const teamKbsRef = (0, import_react$1.useRef)(/* @__PURE__ */ new Map());
	const docNodeStatesRef = (0, import_react$1.useRef)(/* @__PURE__ */ new Map());
	const [renderVersion, forceUpdate] = (0, import_react$1.useState)(0);
	const forceRender = (0, import_react$1.useCallback)(() => forceUpdate((n) => n + 1), []);
	const loadingKeysRef = (0, import_react$1.useRef)(/* @__PURE__ */ new Set());
	const teamsRef = (0, import_react$1.useRef)([]);
	const isLoadingRef = (0, import_react$1.useRef)(false);
	const emptyDocNodeStateRef = (0, import_react$1.useRef)(createEmptyDocNodeState());
	const getDocCacheKey = (0, import_react$1.useCallback)((kbId, parentId) => parentId ? `children:${parentId}` : `root:${kbId}`, []);
	const getOrCreateDocNodeState = (0, import_react$1.useCallback)((kbId, parentId) => {
		const cacheKey = getDocCacheKey(kbId, parentId);
		let state = docNodeStatesRef.current.get(cacheKey);
		if (!state) {
			state = createEmptyDocNodeState();
			docNodeStatesRef.current.set(cacheKey, state);
		}
		return state;
	}, [getDocCacheKey]);
	const getDocNodeState = (0, import_react$1.useCallback)((kbId, parentId) => docNodeStatesRef.current.get(getDocCacheKey(kbId, parentId)) ?? emptyDocNodeStateRef.current, [getDocCacheKey]);
	const requestDocChildren = (0, import_react$1.useCallback)((kbId, parentId, mode) => {
		const state = getOrCreateDocNodeState(kbId, parentId);
		if (state.loading) return;
		if (mode === "initial" && !shouldLoadDocNode(state)) return;
		if (mode === "append" && !state.nextPageToken) return;
		const spaceInfo = spaceMapRef.current.get(kbId);
		const actualParentId = parentId ?? spaceInfo?.rootEntryId;
		if (!actualParentId) {
			docNodeStatesRef.current.set(getDocCacheKey(kbId, parentId), {
				...state,
				loading: false,
				loaded: true,
				error: null,
				nextPageToken: void 0
			});
			if (mode !== "initial") forceRender();
			return;
		}
		const pageToken = mode === "append" ? state.nextPageToken : void 0;
		const requestState = {
			...state,
			children: mode === "append" ? state.children : [],
			loading: true,
			error: null,
			nextPageToken: mode === "append" ? state.nextPageToken : void 0
		};
		docNodeStatesRef.current.set(getDocCacheKey(kbId, parentId), requestState);
		if (mode !== "initial") forceRender();
		const kbName = spaceInfo?.name ?? kbId;
		const teamId = spaceInfo?.teamId;
		const teamName = teamId ? teamsRef.current.find((t) => t.id === teamId)?.name : void 0;
		fetchEntryChildren(actualParentId, ENTRY_PAGE_SIZE, pageToken, "sort_id", "staff").then((data) => {
			const latest = getOrCreateDocNodeState(kbId, parentId);
			const page = {
				children: (data.entries ?? []).filter(isValidRawEntry).map((e) => mapEntry(e, kbId, kbName, teamId, teamName)),
				nextPageToken: data.next_page_token || void 0
			};
			const nextState = mergeDocChildrenPage(mode === "append" ? latest : {
				...latest,
				children: []
			}, page, pageToken);
			docNodeStatesRef.current.set(getDocCacheKey(kbId, parentId), nextState);
			forceRender();
		}).catch((err) => {
			const latest = getOrCreateDocNodeState(kbId, parentId);
			docNodeStatesRef.current.set(getDocCacheKey(kbId, parentId), {
				...latest,
				loading: false,
				loaded: mode === "append" ? latest.loaded : false,
				error: err instanceof Error ? err.message : String(err)
			});
			forceRender();
		});
	}, [
		forceRender,
		getDocCacheKey,
		getOrCreateDocNodeState
	]);
	const getDocsByKb = (0, import_react$1.useCallback)((kbId, parentId) => {
		requestDocChildren(kbId, parentId, "initial");
		return getDocNodeState(kbId, parentId).children;
	}, [getDocNodeState, requestDocChildren]);
	const loadMoreDocChildren = (0, import_react$1.useCallback)((kbId, parentId) => {
		requestDocChildren(kbId, parentId, "append");
	}, [requestDocChildren]);
	const retryDocChildren = (0, import_react$1.useCallback)((kbId, parentId) => {
		requestDocChildren(kbId, parentId, "retry");
	}, [requestDocChildren]);
	const getKbsByTeam = (0, import_react$1.useCallback)((teamId) => {
		if (teamKbsRef.current.has(teamId)) return teamKbsRef.current.get(teamId);
		const loadingKey = `team-spaces:${teamId}`;
		if (loadingKeysRef.current.has(loadingKey)) return {
			kbs: [],
			hasMore: false,
			loading: true,
			loadingMore: false,
			pinnedIds: /* @__PURE__ */ new Set()
		};
		loadingKeysRef.current.add(loadingKey);
		const mapAndRegister = (s) => {
			const kb = mapSpace(s);
			const teamName = teamsRef.current.find((t) => t.id === teamId)?.name;
			if (teamName) kb.teamName = teamName;
			spaceMapRef.current.set(s.id, {
				...kb,
				rootEntryId: s.root_entry_id,
				teamId: s.team_id
			});
			return kb;
		};
		Promise.allSettled([fetchPinnedTeamSpaces(teamId), fetchTeamSpaces(teamId, KB_PAGE_SIZE, void 0, { sortBy: "-edited_at" })]).then(async ([pinnedResult, normalResult]) => {
			if (normalResult.status === "rejected") {
				teamKbsRef.current.set(teamId, {
					kbs: [],
					hasMore: false,
					loading: false,
					loadingMore: false,
					pinnedIds: /* @__PURE__ */ new Set()
				});
				forceRender();
				return;
			}
			if (pinnedResult.status === "rejected") console.warn("[lexiang][useLexiangContentData] fetchPinnedTeamSpaces failed, fallback to normal list only:", pinnedResult.reason);
			const pinnedKbs = pinnedResult.status === "fulfilled" ? (pinnedResult.value.spaces ?? []).map(mapAndRegister) : [];
			const normalKbs = (normalResult.value.spaces ?? []).map(mapAndRegister);
			const { merged, pinnedIds } = mergePinnedAndNormalSpaces(pinnedKbs, normalKbs);
			const hasMore = normalKbs.length >= KB_PAGE_SIZE && !!normalResult.value.next_page_token;
			teamKbsRef.current.set(teamId, {
				kbs: merged,
				nextPageToken: normalResult.value.next_page_token ?? void 0,
				hasMore,
				loading: false,
				loadingMore: false,
				pinnedIds
			});
			forceRender();
			if (await resolveLogosForKbs(merged)) forceRender();
		}).finally(() => {
			loadingKeysRef.current.delete(loadingKey);
		});
		return {
			kbs: [],
			hasMore: false,
			loading: true,
			loadingMore: false,
			pinnedIds: /* @__PURE__ */ new Set()
		};
	}, [forceRender]);
	const loadMoreKbsByTeam = (0, import_react$1.useCallback)((teamId) => {
		const page = teamKbsRef.current.get(teamId);
		if (!page || !page.hasMore || page.loadingMore || !page.nextPageToken) return;
		page.loadingMore = true;
		forceRender();
		fetchTeamSpaces(teamId, KB_PAGE_SIZE, page.nextPageToken, { sortBy: "-edited_at" }).then(async (data) => {
			const rawNewKbs = (data.spaces ?? []).map((s) => {
				const kb = mapSpace(s);
				const teamName = teamsRef.current.find((t) => t.id === teamId)?.name;
				if (teamName) kb.teamName = teamName;
				spaceMapRef.current.set(s.id, {
					...kb,
					rootEntryId: s.root_entry_id,
					teamId: s.team_id
				});
				return kb;
			});
			const newKbs = filterOutPinned(rawNewKbs, page.pinnedIds);
			const hasMore = rawNewKbs.length > 0 && !!data.next_page_token;
			const allKbs = [...page.kbs, ...newKbs];
			teamKbsRef.current.set(teamId, {
				kbs: allKbs,
				nextPageToken: data.next_page_token ?? void 0,
				hasMore,
				loading: false,
				loadingMore: false,
				pinnedIds: page.pinnedIds
			});
			forceRender();
			if (await resolveLogosForKbs(newKbs)) forceRender();
		}).catch(() => {
			page.loadingMore = false;
			page.hasMore = false;
			forceRender();
		});
	}, [forceRender]);
	const load = (0, import_react$1.useCallback)(async () => {
		if (isLoadingRef.current) return;
		isLoadingRef.current = true;
		setLoading(true);
		setError(null);
		try {
			const [teamsResult, spacesResult, personalSpaceResult] = await Promise.allSettled([
				cachedFetch("frequent-teams", () => fetchFrequentTeams(20)),
				cachedFetch("recent-spaces", () => fetchRecentSpaces(20, "team")),
				cachedFetch("personal-space", () => fetchPersonalSpace())
			]);
			const teamsOk = teamsResult.status === "fulfilled";
			const spacesOk = spacesResult.status === "fulfilled";
			const personalOk = personalSpaceResult.status === "fulfilled";
			if (!teamsOk) throw teamsResult.reason instanceof Error ? teamsResult.reason : new Error(String(teamsResult.reason));
			const teamsData = teamsResult.value;
			const spacesData = spacesOk ? spacesResult.value : {
				spaces: [],
				visits: {}
			};
			const personalSpaceData = personalOk ? personalSpaceResult.value : null;
			let mappedPersonalKb = null;
			if (personalSpaceData?.space) {
				const ps = personalSpaceData.space;
				mappedPersonalKb = {
					id: ps.id,
					name: ps.name,
					logoUrl: isDirectlyUsableLogoUrl(ps.logo) ? ps.logo : void 0,
					meta: {
						rootEntryId: ps.root_entry_id,
						teamId: ps.team_id,
						isPersonal: true,
						rawLogo: ps.logo
					}
				};
			}
			setPersonalKb(mappedPersonalKb);
			if (mappedPersonalKb) spaceMapRef.current.set(mappedPersonalKb.id, {
				...mappedPersonalKb,
				rootEntryId: mappedPersonalKb.meta?.rootEntryId,
				teamId: mappedPersonalKb.meta?.teamId
			});
			const mappedTeams = teamsData.teams.map(mapTeam);
			const seenTeamIds = /* @__PURE__ */ new Set();
			const dedupedTeams = [];
			for (const team of mappedTeams) if (!seenTeamIds.has(team.id)) {
				seenTeamIds.add(team.id);
				dedupedTeams.push(team);
			}
			setTeams(dedupedTeams);
			teamsRef.current = dedupedTeams;
			const nextToken = teamsData.next_page_token || void 0;
			teamsNextPageTokenRef.current = nextToken;
			setTeamsHasMore(!!nextToken);
			setTeamsLoadingMore(false);
			teamsLoadingMoreRef.current = false;
			const newSpaceMap = /* @__PURE__ */ new Map();
			const spacesTeamMap = spacesData.teams ?? {};
			const mappedSpaces = spacesData.spaces.map((s) => {
				const visitTime = spacesData.visits?.[s.id];
				const kb = mapSpace(s, visitTime);
				const teamName = s.team_id ? spacesTeamMap[s.team_id]?.name : void 0;
				if (teamName) kb.teamName = teamName;
				newSpaceMap.set(s.id, {
					...kb,
					rootEntryId: s.root_entry_id,
					teamId: s.team_id,
					teamName
				});
				return kb;
			});
			for (const [id, info] of spaceMapRef.current.entries()) if (!newSpaceMap.has(id)) newSpaceMap.set(id, info);
			spaceMapRef.current = newSpaceMap;
			setRecentKbs(mappedSpaces);
			resolveLogosForKbs(mappedSpaces).then((updated) => {
				if (updated) setRecentKbs([...mappedSpaces]);
			});
		} catch (err) {
			setError(err?.message ?? String(err));
		} finally {
			isLoadingRef.current = false;
			setLoading(false);
		}
	}, []);
	const loadMoreTeams = (0, import_react$1.useCallback)(() => {
		if (teamsLoadingMoreRef.current) return;
		const token = teamsNextPageTokenRef.current;
		if (!token) return;
		teamsLoadingMoreRef.current = true;
		setTeamsLoadingMore(true);
		fetchFrequentTeams(20, void 0, token).then((data) => {
			const newTeams = (data.teams ?? []).map(mapTeam);
			const nextToken = data.next_page_token || void 0;
			if (newTeams.length === 0) {
				teamsNextPageTokenRef.current = void 0;
				setTeamsHasMore(false);
				return;
			}
			if (nextToken && nextToken === token) {
				teamsNextPageTokenRef.current = void 0;
				setTeamsHasMore(false);
			} else {
				teamsNextPageTokenRef.current = nextToken;
				setTeamsHasMore(!!nextToken);
			}
			setTeams((prev) => {
				const seen = new Set(prev.map((t) => t.id));
				const merged = [...prev];
				for (const t of newTeams) if (!seen.has(t.id)) {
					merged.push(t);
					seen.add(t.id);
				}
				teamsRef.current = merged;
				return merged;
			});
		}).catch((err) => {
			console.error("[lexiang] loadMoreTeams failed", err);
			teamsNextPageTokenRef.current = void 0;
			setTeamsHasMore(false);
		}).finally(() => {
			teamsLoadingMoreRef.current = false;
			setTeamsLoadingMore(false);
		});
	}, []);
	const RECENT_DOCS_LIMIT = 50;
	const recentDocsLoadedRef = (0, import_react$1.useRef)(false);
	const loadRecentDocs = (0, import_react$1.useCallback)(() => {
		if (recentDocsLoadedRef.current || recentDocsLoading) return;
		recentDocsLoadedRef.current = true;
		setRecentDocsLoading(true);
		fetchRecentEntries(RECENT_DOCS_LIMIT, "staff,space").then((data) => {
			const docs = [];
			const spacesMap = data.spaces ?? {};
			for (const entry of data.entries ?? []) {
				if (!isValidRawEntry(entry)) continue;
				if (entry.entry_type !== "folder") {
					const spaceId = entry.space_id;
					const space = spaceId ? spacesMap[spaceId] : void 0;
					const kbName = space?.name ?? "";
					const teamId = space?.team_id;
					const teamName = teamId ? teamsRef.current.find((t) => t.id === teamId)?.name : void 0;
					docs.push(mapEntry(entry, spaceId ?? "", kbName, teamId, teamName));
				}
			}
			setRecentDocs(docs);
		}).catch(() => {
			recentDocsLoadedRef.current = false;
		}).finally(() => {
			setRecentDocsLoading(false);
		});
	}, [recentDocsLoading]);
	const refresh = (0, import_react$1.useCallback)(() => {
		clearContentDataCache();
		docNodeStatesRef.current.clear();
		teamKbsRef.current.clear();
		loadingKeysRef.current.clear();
		isLoadingRef.current = false;
		recentDocsLoadedRef.current = false;
		teamsNextPageTokenRef.current = void 0;
		teamsLoadingMoreRef.current = false;
		setTeamsHasMore(false);
		setTeamsLoadingMore(false);
		setRecentDocs([]);
		load();
	}, [load]);
	const search = (0, import_react$1.useCallback)(async (keyword, pageToken) => {
		const SEARCH_PAGE_SIZE = 20;
		const [spaceResult, entryResult, teamResult] = await Promise.allSettled([
			searchKb(keyword, {
				type: "space",
				limit: SEARCH_PAGE_SIZE,
				pageToken
			}),
			searchKb(keyword, {
				type: "entry",
				limit: SEARCH_PAGE_SIZE,
				pageToken
			}),
			searchTeams(keyword, SEARCH_PAGE_SIZE, pageToken)
		]);
		const teams = [];
		const docs = [];
		const kbs = [];
		if (teamResult.status === "fulfilled") {
			const teamData = teamResult.value;
			for (const t of teamData.teams ?? []) teams.push({
				id: t.id,
				name: t.name
			});
		}
		let spaceData;
		if (spaceResult.status === "fulfilled") {
			spaceData = spaceResult.value;
			for (const d of spaceData.docs ?? []) {
				if (d.target_type !== "kb_space") continue;
				const teamName = d.team_id ? spaceData.team?.[d.team_id] ?? teamsRef.current.find((t) => t.id === d.team_id)?.name : void 0;
				const { rootEntryId, logo } = parseLexiangSearchExtraInfo(d.extra_info);
				kbs.push({
					id: d.target_id ?? d.space_id ?? d.id,
					name: d.title,
					teamId: d.team_id,
					teamName,
					logoUrl: isDirectlyUsableLogoUrl(logo) ? logo : void 0,
					meta: {
						rootEntryId,
						teamId: d.team_id,
						rawLogo: logo
					}
				});
			}
		}
		let entryData;
		if (entryResult.status === "fulfilled") {
			entryData = entryResult.value;
			for (const d of entryData.docs ?? []) {
				if (!d.id || typeof d.title !== "string" || d.title.trim().length === 0) continue;
				docs.push({
					id: d.id,
					name: d.title,
					kind: "doc",
					kbId: d.space_id,
					kbName: d.space_id && entryData.space ? entryData.space[d.space_id] : void 0,
					teamId: d.team_id,
					teamName: d.team_id && entryData.team ? entryData.team[d.team_id] : void 0,
					updatedAt: d.updated_at ? Number(d.updated_at) * 1e3 : void 0
				});
			}
		}
		return {
			teams,
			docs,
			kbs,
			total: teams.length + docs.length + kbs.length,
			hasMore: !!(spaceData?.page_token || entryData?.page_token),
			nextPageToken: entryData?.page_token ?? spaceData?.page_token ?? void 0
		};
	}, []);
	const prevConnectedRef = (0, import_react$1.useRef)(isConnected);
	(0, import_react$1.useEffect)(() => {
		const wasConnected = prevConnectedRef.current;
		prevConnectedRef.current = isConnected;
		if (!isConnected) return;
		if (wasConnected) return;
		const timer = setTimeout(() => {
			refresh();
		}, 500);
		return () => clearTimeout(timer);
	}, [isConnected, refresh]);
	return {
		loading,
		error,
		teams,
		teamsHasMore,
		teamsLoadingMore,
		loadMoreTeams,
		recentKbs,
		personalKb,
		recentDocs,
		recentDocsLoading,
		loadRecentDocs,
		getKbsByTeam,
		loadMoreKbsByTeam,
		getDocsByKb,
		getDocNodeState,
		loadMoreDocChildren,
		retryDocChildren,
		search,
		refresh,
		renderVersion
	};
}
var import_react$1, KB_PAGE_SIZE, ENTRY_PAGE_SIZE, contentCache;
var init_use_lexiang_content_data = __esmMin((() => {
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_api();
	init_lexiang_auth_store();
	init_merge_pinned_spaces();
	init_doc_node_state();
	KB_PAGE_SIZE = 20;
	ENTRY_PAGE_SIZE = 20;
	contentCache = /* @__PURE__ */ new Map();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/components/picker/lexiang-content-picker.tsx
function CollapsibleSection({ title, items, maxItems = COLLAPSED_MAX, pageSize = PAGE_SIZE }) {
	const t = useTranslation();
	const [expanded, setExpanded] = (0, import_react.useState)(false);
	const [page, setPage] = (0, import_react.useState)(1);
	const sentinelRef = (0, import_react.useRef)(null);
	const needCollapse = items.length > maxItems;
	const visibleCount = expanded ? Math.min(page * pageSize, items.length) : needCollapse ? maxItems : items.length;
	const hasMore = expanded && visibleCount < items.length;
	(0, import_react.useEffect)(() => {
		const sentinel = sentinelRef.current;
		if (!sentinel || !hasMore) return;
		const observer = new IntersectionObserver((entries) => {
			if (entries[0]?.isIntersecting) setPage((p) => p + 1);
		}, { threshold: .1 });
		observer.observe(sentinel);
		return () => observer.disconnect();
	}, [hasMore, visibleCount]);
	(0, import_react.useEffect)(() => {
		if (!expanded) setPage(1);
	}, [expanded]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "lexiang-content-picker__section-header",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "lexiang-content-picker__section-title",
			children: title
		}), needCollapse && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			className: "lexiang-content-picker__expand-btn",
			onClick: () => setExpanded(!expanded),
			children: [expanded ? t("tencentLexiang.picker.collapse") : t("tencentLexiang.picker.expand"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `lexiang-content-picker__expand-arrow${expanded ? " lexiang-content-picker__expand-arrow--up" : ""}`,
				children: "‹"
			})]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "lexiang-content-picker__section-body",
		children: [items.slice(0, visibleCount), hasMore && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "lexiang-content-picker__load-more-indicator",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "lexiang-content-picker__load-more-spinner" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: sentinelRef,
			className: "lexiang-content-picker__load-more-sentinel"
		})] })]
	})] });
}
function PaginatedSection({ title, items, pageSize = PAGE_SIZE }) {
	const [page, setPage] = (0, import_react.useState)(1);
	const sentinelRef = (0, import_react.useRef)(null);
	const visibleCount = Math.min(page * pageSize, items.length);
	const hasMore = visibleCount < items.length;
	(0, import_react.useEffect)(() => {
		const sentinel = sentinelRef.current;
		if (!sentinel || !hasMore) return;
		const observer = new IntersectionObserver((entries) => {
			if (entries[0]?.isIntersecting) setPage((p) => p + 1);
		}, { threshold: .1 });
		observer.observe(sentinel);
		return () => observer.disconnect();
	}, [hasMore, visibleCount]);
	(0, import_react.useEffect)(() => {
		setPage(1);
	}, [items.length]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "lexiang-content-picker__section-header",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "lexiang-content-picker__section-title",
			children: title
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "lexiang-content-picker__section-body",
		children: [items.slice(0, visibleCount), hasMore && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "lexiang-content-picker__load-more-indicator",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "lexiang-content-picker__load-more-spinner" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: sentinelRef,
			className: "lexiang-content-picker__load-more-sentinel"
		})] })]
	})] });
}
/** 移除后端搜索高亮返回的 `<em>` 标签，只保留纯文本 */
function stripEmTags(text) {
	return text.replace(/<\/?em>/g, "");
}
/** 清理 PickedNode 中 name 字段的 `<em>` 标签，避免传递给外部 */
function sanitizePickedNode(node) {
	switch (node.type) {
		case "team": return {
			...node,
			team: {
				...node.team,
				name: stripEmTags(node.team.name)
			}
		};
		case "kb": return {
			...node,
			kb: {
				...node.kb,
				name: stripEmTags(node.kb.name)
			}
		};
		case "doc": return {
			...node,
			doc: {
				...node.doc,
				name: stripEmTags(node.doc.name)
			}
		};
		default: return node;
	}
}
function LexiangContentPicker({ visible, defaultTab = "directory", multiple = true, maxCount, searchPlaceholder, confirmText, cancelText, bypassConnectorAuth = false, onClose, onConfirm, containerStyle }) {
	const t = useTranslation();
	const resolvedSearchPlaceholder = searchPlaceholder ?? t("tencentLexiang.picker.searchTeamKbKnowledge");
	const resolvedConfirmText = confirmText ?? t("tencentLexiang.picker.confirm");
	const resolvedCancelText = cancelText ?? t("tencentLexiang.picker.cancel");
	const authStatus = useLexiangAuth((s) => s.authStatus);
	const isAuthorized = bypassConnectorAuth || authStatus === "connected";
	const triggerCheckAuth = useLexiangCheckAuthGate();
	const license = useLexiangLicense(visible && isAuthorized);
	const adapter = useAdapter();
	const imaBridge = useOptionalImaApiBridge();
	const handleAssignLicense = (0, import_react.useCallback)(async () => {
		const intendUrl = `${(imaBridge ? await imaBridge.isStagingEnv().catch(() => false) : false) ? LEXIANG_WEB_ORIGIN_STAGING : LEXIANG_WEB_ORIGIN_PROD}/s/license`;
		try {
			const loginUrl = await fetchLexiangTempLoginUrl(adapter, {
				intendUrl,
				mode: "iframe"
			});
			await adapter.openExternal?.(loginUrl);
		} catch (err) {
			console.warn("[lexiang] license assign temp-login-url 失败，降级使用原始 URL", err);
			await adapter.openExternal?.(intendUrl).catch(() => {});
		}
	}, [adapter, imaBridge]);
	const { error, teams, teamsHasMore, teamsLoadingMore, loadMoreTeams, recentKbs, personalKb, recentDocs, recentDocsLoading, loadRecentDocs, getKbsByTeam, loadMoreKbsByTeam, getDocsByKb, getDocNodeState, loadMoreDocChildren, retryDocChildren, search, refresh, renderVersion } = useLexiangContentData();
	const prevVisibleRef = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (visible && !prevVisibleRef.current) if (bypassConnectorAuth) refresh();
		else if (lexiangAuthStore.getState().authStatus === "connected") refresh();
		else triggerCheckAuth();
		prevVisibleRef.current = visible;
	}, [
		visible,
		refresh,
		bypassConnectorAuth,
		triggerCheckAuth
	]);
	const [activeTab, setActiveTab] = (0, import_react.useState)(defaultTab);
	const [keyword, setKeyword] = (0, import_react.useState)("");
	const debouncedKeyword = useDebouncedValue(keyword, 300);
	const [searchFocused, setSearchFocused] = (0, import_react.useState)(false);
	const [activeTeamId, setActiveTeamId] = (0, import_react.useState)("");
	const [activeKbId, setActiveKbId] = (0, import_react.useState)("");
	const [isPersonalSpaceActive, setIsPersonalSpaceActive] = (0, import_react.useState)(false);
	const [searchResultTeams, setSearchResultTeams] = (0, import_react.useState)([]);
	const [searchResultDocs, setSearchResultDocs] = (0, import_react.useState)([]);
	const [searchResultKbs, setSearchResultKbs] = (0, import_react.useState)([]);
	const [searchLoading, setSearchLoading] = (0, import_react.useState)(false);
	const [searchHasMore, setSearchHasMore] = (0, import_react.useState)(false);
	const [searchNextPageToken, setSearchNextPageToken] = (0, import_react.useState)();
	const [searchLoadingMore, setSearchLoadingMore] = (0, import_react.useState)(false);
	const searchSentinelRef = (0, import_react.useRef)(null);
	const searchSeqRef = (0, import_react.useRef)(0);
	const handleTabChange = (0, import_react.useCallback)((tabId) => {
		setActiveTab(tabId);
		if (tabId === "recent") loadRecentDocs();
		if (tabId === "directory") if (personalKb) {
			setIsPersonalSpaceActive(true);
			setActiveTeamId("");
			setActiveKbId(personalKb.id);
		} else {
			setIsPersonalSpaceActive(false);
			const firstTeamId = teams[0]?.id ?? "";
			setActiveTeamId(firstTeamId);
			if (firstTeamId) setActiveKbId(getKbsByTeam(firstTeamId).kbs[0]?.id ?? "");
			else setActiveKbId("");
		}
	}, [
		teams,
		getKbsByTeam,
		loadRecentDocs,
		personalKb
	]);
	const [selected, setSelected] = (0, import_react.useState)(/* @__PURE__ */ new Map());
	(0, import_react.useEffect)(() => {
		if (visible) {
			setActiveTab(defaultTab);
			setKeyword("");
			setSearchFocused(false);
			if (personalKb) {
				setIsPersonalSpaceActive(true);
				setActiveTeamId("");
				setActiveKbId(personalKb.id);
			} else {
				setIsPersonalSpaceActive(false);
				setActiveTeamId("");
				setActiveKbId("");
			}
			setSelected(/* @__PURE__ */ new Map());
			setSearchResultTeams([]);
			setSearchResultDocs([]);
			setSearchResultKbs([]);
			setSearchHasMore(false);
			setSearchNextPageToken(void 0);
		}
	}, [visible, defaultTab]);
	const teamsLoadedOnceRef = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (teams.length > 0 && visible && !teamsLoadedOnceRef.current) {
			teamsLoadedOnceRef.current = true;
			if (activeTab === "recent") loadRecentDocs();
			else if (activeTab === "directory") if (personalKb) {
				setIsPersonalSpaceActive(true);
				setActiveTeamId("");
				setActiveKbId(personalKb.id);
			} else {
				const firstTeamId = teams[0]?.id ?? "";
				setActiveTeamId(firstTeamId);
				if (firstTeamId) setActiveKbId(getKbsByTeam(firstTeamId).kbs[0]?.id ?? "");
			}
		}
		if (!visible) teamsLoadedOnceRef.current = false;
	}, [
		teams,
		visible,
		activeTab,
		loadRecentDocs,
		getKbsByTeam,
		personalKb
	]);
	const isSearching = debouncedKeyword.trim().length > 0;
	(0, import_react.useEffect)(() => {
		const kw = debouncedKeyword.trim();
		if (!kw) {
			setSearchResultTeams([]);
			setSearchResultDocs([]);
			setSearchResultKbs([]);
			setSearchHasMore(false);
			setSearchNextPageToken(void 0);
			return;
		}
		const seq = ++searchSeqRef.current;
		setSearchLoading(true);
		setSearchResultTeams([]);
		setSearchResultDocs([]);
		setSearchResultKbs([]);
		setSearchHasMore(false);
		setSearchNextPageToken(void 0);
		search(kw).then((result) => {
			if (searchSeqRef.current !== seq) return;
			setSearchResultTeams(result.teams);
			setSearchResultDocs(result.docs);
			setSearchResultKbs(result.kbs);
			setSearchHasMore(result.hasMore);
			setSearchNextPageToken(result.nextPageToken);
		}).catch(() => {
			if (searchSeqRef.current !== seq) return;
			setSearchResultTeams([]);
			setSearchResultDocs([]);
			setSearchResultKbs([]);
			setSearchHasMore(false);
		}).finally(() => {
			if (searchSeqRef.current === seq) setSearchLoading(false);
		});
	}, [debouncedKeyword, search]);
	const loadMoreSearch = (0, import_react.useCallback)(async () => {
		if (searchLoadingMore || !searchHasMore || !searchNextPageToken) return;
		const kw = debouncedKeyword.trim();
		if (!kw) return;
		const seq = searchSeqRef.current;
		setSearchLoadingMore(true);
		try {
			const result = await search(kw, searchNextPageToken);
			if (searchSeqRef.current !== seq) return;
			setSearchResultTeams((prev) => [...prev, ...result.teams]);
			setSearchResultDocs((prev) => [...prev, ...result.docs]);
			setSearchResultKbs((prev) => [...prev, ...result.kbs]);
			setSearchHasMore(result.hasMore);
			setSearchNextPageToken(result.nextPageToken);
		} catch {} finally {
			if (searchSeqRef.current === seq) setSearchLoadingMore(false);
		}
	}, [
		debouncedKeyword,
		search,
		searchHasMore,
		searchNextPageToken,
		searchLoadingMore
	]);
	(0, import_react.useEffect)(() => {
		const sentinel = searchSentinelRef.current;
		if (!sentinel || !searchHasMore || searchLoadingMore) return;
		const observer = new IntersectionObserver((entries) => {
			if (entries[0]?.isIntersecting) loadMoreSearch();
		}, { threshold: .1 });
		observer.observe(sentinel);
		return () => observer.disconnect();
	}, [
		searchHasMore,
		searchLoadingMore,
		loadMoreSearch
	]);
	const hasSearchResults = searchResultTeams.length > 0 || searchResultDocs.length > 0 || searchResultKbs.length > 0;
	const toggleSelect = (0, import_react.useCallback)((node) => {
		const key = node.type === "team" ? `team:${node.team.id}` : node.type === "kb" ? `kb:${node.kb.id}` : `doc:${node.doc.id}`;
		setSelected((prev) => {
			const next = new Map(prev);
			if (next.has(key)) {
				next.delete(key);
				return next;
			}
			if (!multiple) next.clear();
			if (multiple && typeof maxCount === "number" && next.size >= maxCount) return prev;
			next.set(key, node);
			return next;
		});
	}, [multiple, maxCount]);
	const toggleTeamSelect = (0, import_react.useCallback)((team) => {
		toggleSelect({
			type: "team",
			team
		});
	}, [toggleSelect]);
	const toggleFolderSelect = (0, import_react.useCallback)((folder, descendants) => {
		setSelected((prev) => {
			const next = new Map(prev);
			const folderKey = `doc:${folder.id}`;
			if (next.has(folderKey)) for (const d of [folder, ...descendants]) next.delete(`doc:${d.id}`);
			else for (const d of [folder, ...descendants]) {
				if (next.has(`doc:${d.id}`)) continue;
				if (!multiple) next.clear();
				if (multiple && typeof maxCount === "number" && next.size >= maxCount) break;
				next.set(`doc:${d.id}`, {
					type: "doc",
					doc: d
				});
			}
			return next;
		});
	}, [multiple, maxCount]);
	const handleConfirm = (0, import_react.useCallback)(() => {
		onConfirm(Array.from(selected.values()).map(sanitizePickedNode));
	}, [selected, onConfirm]);
	const activeTeamKbPage = (0, import_react.useMemo)(() => activeTeamId ? getKbsByTeam(activeTeamId) : {
		kbs: [],
		hasMore: false,
		loading: false,
		loadingMore: false
	}, [
		activeTeamId,
		getKbsByTeam,
		renderVersion
	]);
	const kbsOfActiveTeam = isPersonalSpaceActive ? personalKb ? [personalKb] : [] : activeTeamKbPage.kbs;
	(0, import_react.useEffect)(() => {
		if (activeTeamId && kbsOfActiveTeam.length > 0 && !activeKbId) setActiveKbId(kbsOfActiveTeam[0].id);
	}, [
		activeTeamId,
		kbsOfActiveTeam,
		activeKbId
	]);
	(0, import_react.useEffect)(() => {
		if (isPersonalSpaceActive && personalKb) setActiveKbId(personalKb.id);
	}, [isPersonalSpaceActive, personalKb]);
	const rootDocs = (0, import_react.useMemo)(() => activeKbId ? getDocsByKb(activeKbId) : [], [
		activeKbId,
		getDocsByKb,
		renderVersion
	]);
	const rootDocNodeState = (0, import_react.useMemo)(() => activeKbId ? getDocNodeState(activeKbId) : void 0, [
		activeKbId,
		getDocNodeState,
		renderVersion
	]);
	const getDocChildren = (0, import_react.useCallback)((parentId) => activeKbId ? getDocsByKb(activeKbId, parentId) : [], [
		activeKbId,
		getDocsByKb,
		renderVersion
	]);
	const getActiveDocNodeState = (0, import_react.useCallback)((parentId) => activeKbId ? getDocNodeState(activeKbId, parentId) : void 0, [
		activeKbId,
		getDocNodeState,
		renderVersion
	]);
	const loadMoreActiveDocChildren = (0, import_react.useCallback)((parentId) => {
		if (activeKbId) loadMoreDocChildren(activeKbId, parentId);
	}, [activeKbId, loadMoreDocChildren]);
	const retryActiveDocChildren = (0, import_react.useCallback)((parentId) => {
		if (activeKbId) retryDocChildren(activeKbId, parentId);
	}, [activeKbId, retryDocChildren]);
	const loadMoreRootDocs = (0, import_react.useCallback)(() => {
		if (activeKbId) loadMoreDocChildren(activeKbId);
	}, [activeKbId, loadMoreDocChildren]);
	const retryRootDocs = (0, import_react.useCallback)(() => {
		if (activeKbId) retryDocChildren(activeKbId);
	}, [activeKbId, retryDocChildren]);
	const selectedKbIds = (0, import_react.useMemo)(() => {
		const s = /* @__PURE__ */ new Set();
		for (const n of selected.values()) if (n.type === "team") s.add(`team:${n.team.id}`);
		else if (n.type === "kb") s.add(n.kb.id);
		return s;
	}, [selected]);
	const selectedDocIds = (0, import_react.useMemo)(() => {
		const s = /* @__PURE__ */ new Set();
		for (const n of selected.values()) if (n.type === "doc") s.add(n.doc.id);
		return s;
	}, [selected]);
	const renderBody = () => {
		if (!isAuthorized) {
			if (authStatus === "checking") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "lexiang-content-picker__empty",
				children: t("tencentLexiang.auth.checking")
			});
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthGuide, { source: "file_picker" });
		}
		if (license.status === "checking") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "lexiang-content-picker__empty",
			children: t("tencentLexiang.license.checking")
		});
		if (license.status === "denied") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LexiangLicenseDeniedView, {
			isAdmin: license.isAdmin,
			onAssign: license.isAdmin ? handleAssignLicense : void 0
		});
		if (teams.length === 0 && !personalKb && recentKbs.length === 0 && !error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "lexiang-content-picker__empty",
			children: t("tencentLexiang.picker.loading")
		});
		if (keyword.trim().length > 0 && !isSearching) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "lexiang-content-picker__empty",
			children: t("tencentLexiang.picker.searchHint")
		});
		if (isSearching) {
			if (searchLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "lexiang-content-picker__empty",
				children: t("tencentLexiang.picker.searching")
			});
			if (!hasSearchResults) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lexiang-content-picker__empty",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					className: "lexiang-content-picker__empty-icon",
					src: no_knowledge_base_update_default,
					alt: "",
					"aria-hidden": "true"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("tencentLexiang.picker.noFileResultsRetry") })]
			});
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lexiang-content-picker__sectioned-list",
				children: [
					searchResultTeams.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollapsibleSection, {
						title: t("tencentLexiang.picker.team"),
						maxItems: COLLAPSED_MAX,
						items: searchResultTeams.map((team) => {
							const fakeKbId = `team:${team.id}`;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KbItemRow, {
								item: {
									id: fakeKbId,
									name: team.name,
									kind: "team",
									teamId: team.id,
									teamName: team.name
								},
								selected: selectedKbIds.has(fakeKbId),
								selectionMode: multiple ? "checkbox" : "radio",
								highlightKeyword: debouncedKeyword,
								onClick: () => toggleTeamSelect(team)
							}, fakeKbId);
						})
					}),
					searchResultKbs.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollapsibleSection, {
						title: t("tencentLexiang.picker.knowledgeBase"),
						maxItems: COLLAPSED_MAX,
						items: searchResultKbs.map((kb) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KbItemRow, {
							item: kb,
							selected: selectedKbIds.has(kb.id),
							selectionMode: multiple ? "checkbox" : "radio",
							highlightKeyword: debouncedKeyword,
							sourceLabel: kb.teamName,
							onClick: () => toggleSelect({
								type: "kb",
								kb,
								team: kb.teamId ? teams.find((tt) => tt.id === kb.teamId) : void 0
							})
						}, kb.id))
					}),
					searchResultDocs.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lexiang-content-picker__section-header",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "lexiang-content-picker__section-title",
							children: t("tencentLexiang.picker.knowledge")
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lexiang-content-picker__section-body",
						children: [searchResultDocs.map((doc) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KbItemRow, {
							item: doc,
							selected: selectedDocIds.has(doc.id),
							selectionMode: multiple ? "checkbox" : "radio",
							highlightKeyword: debouncedKeyword,
							sourceLabel: doc.kbName,
							onClick: () => toggleSelect({
								type: "doc",
								doc
							})
						}, doc.id)), searchHasMore && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [searchLoadingMore && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "lexiang-content-picker__load-more-indicator",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "lexiang-content-picker__load-more-spinner" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							ref: searchSentinelRef,
							className: "lexiang-content-picker__load-more-sentinel"
						})] })]
					})] })
				]
			});
		}
		if (activeTab === "recent") {
			if (recentKbs.length === 0 && recentDocs.length === 0 && !recentDocsLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lexiang-content-picker__empty",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					className: "lexiang-content-picker__empty-icon",
					src: no_knowledge_base_update_default,
					alt: "",
					"aria-hidden": "true"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("tencentLexiang.picker.noRecentRecords") })]
			});
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lexiang-content-picker__sectioned-list",
				children: [
					recentKbs.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollapsibleSection, {
						title: t("tencentLexiang.picker.knowledgeBase"),
						maxItems: COLLAPSED_MAX,
						pageSize: PAGE_SIZE,
						items: recentKbs.map((kb) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KbItemRow, {
							item: kb,
							selected: selectedKbIds.has(kb.id),
							selectionMode: multiple ? "checkbox" : "radio",
							sourceLabel: kb.teamName,
							onClick: () => toggleSelect({
								type: "kb",
								kb,
								team: kb.teamId ? teams.find((t) => t.id === kb.teamId) : void 0
							})
						}, kb.id))
					}),
					recentDocsLoading && recentDocs.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lexiang-content-picker__empty",
						children: t("tencentLexiang.picker.loading")
					}),
					recentDocs.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginatedSection, {
						title: t("tencentLexiang.picker.knowledge"),
						pageSize: PAGE_SIZE,
						items: recentDocs.map((doc) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KbItemRow, {
							item: doc,
							selected: selectedDocIds.has(doc.id),
							disabled: doc.disabled,
							selectionMode: multiple ? "checkbox" : "radio",
							sourceLabel: doc.kbName,
							onClick: () => toggleSelect({
								type: "doc",
								doc
							})
						}, doc.id))
					})
				]
			});
		}
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KbCascadeView, {
			teams,
			activeTeamId,
			onTeamChange: (teamId) => {
				setActiveTeamId(teamId);
				setActiveKbId("");
				setIsPersonalSpaceActive(false);
			},
			teamSelectionMode: multiple ? "checkbox" : "radio",
			selectedTeamIds: selectedKbIds,
			onTeamSelect: (team) => toggleTeamSelect(team),
			teamsHasMore,
			teamsLoadingMore,
			onTeamsLoadMore: loadMoreTeams,
			personalSpaceLabel: personalKb ? t("tencentLexiang.picker.personalSpace") : void 0,
			isPersonalSpaceActive,
			onPersonalSpaceClick: personalKb ? () => {
				setIsPersonalSpaceActive(true);
				setActiveTeamId("");
				setActiveKbId(personalKb.id);
			} : void 0,
			kbs: kbsOfActiveTeam,
			activeKbId,
			onKbChange: (kbId) => setActiveKbId(kbId),
			kbSelectionMode: multiple ? "checkbox" : "radio",
			selectedKbIds,
			onKbSelect: (kb) => toggleSelect({
				type: "kb",
				kb,
				team: teams.find((t) => t.id === activeTeamId)
			}),
			kbsHasMore: isPersonalSpaceActive ? false : activeTeamKbPage.hasMore,
			kbsLoading: isPersonalSpaceActive ? false : activeTeamKbPage.loading,
			kbsLoadingMore: isPersonalSpaceActive ? false : activeTeamKbPage.loadingMore,
			onKbsLoadMore: () => activeTeamId && loadMoreKbsByTeam(activeTeamId),
			docs: rootDocs,
			getDocChildren,
			getDocNodeState: getActiveDocNodeState,
			loadMoreDocChildren: loadMoreActiveDocChildren,
			retryDocChildren: retryActiveDocChildren,
			rootDocNodeState,
			loadMoreRootDocs,
			retryRootDocs,
			docSelectionMode: multiple ? "checkbox" : "radio",
			selectedDocIds,
			onDocSelect: (doc) => toggleSelect({
				type: "doc",
				doc
			}),
			onFolderSelect: toggleFolderSelect,
			resizable: true
		});
	};
	const [showSelectedPanel, setShowSelectedPanel] = (0, import_react.useState)(false);
	const selectedPanelRef = (0, import_react.useRef)(null);
	const selectedTriggerRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!showSelectedPanel) return;
		const handleClick = (e) => {
			if (selectedPanelRef.current?.contains(e.target)) return;
			if (selectedTriggerRef.current?.contains(e.target)) return;
			setShowSelectedPanel(false);
		};
		document.addEventListener("mousedown", handleClick);
		return () => document.removeEventListener("mousedown", handleClick);
	}, [showSelectedPanel]);
	(0, import_react.useEffect)(() => {
		if (!visible) setShowSelectedPanel(false);
	}, [visible]);
	const removeSelected = (0, import_react.useCallback)((key) => {
		setSelected((prev) => {
			const next = new Map(prev);
			next.delete(key);
			return next;
		});
	}, []);
	const getNodeDisplayName = (0, import_react.useCallback)((node) => {
		if (node.type === "team") return stripEmTags(node.team.name);
		if (node.type === "kb") return stripEmTags(node.kb.name);
		return stripEmTags(node.doc.name);
	}, []);
	const getNodeKindIcon = (0, import_react.useCallback)((node) => {
		if (node.type === "team") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamDefaultIcon, { size: 16 });
		if (node.type === "kb") {
			const rawLogo = node.kb.meta?.rawLogo;
			const logoSrc = node.kb.logoUrl || (isDirectlyUsableLogoUrl(rawLogo) ? rawLogo : void 0);
			if (logoSrc) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				className: "lexiang-content-picker__selected-panel-logo",
				src: logoSrc,
				alt: "",
				referrerPolicy: "no-referrer"
			});
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KbDefaultIcon, { size: 16 });
		}
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocKindIcon, {
			kind: node.doc.kind,
			extension: node.doc.extension,
			size: 16,
			onlineDocSize: 20
		});
	}, []);
	const footerLeft = multiple && selected.size > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "lexiang-content-picker__footer-selected",
		ref: selectedTriggerRef,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "lexiang-content-picker__summary",
			onClick: () => setShowSelectedPanel(!showSelectedPanel),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("tencentLexiang.selection.selectedCount", { count: selected.size }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
				className: `lexiang-content-picker__chevron${showSelectedPanel ? " lexiang-content-picker__chevron--up" : ""}`,
				xmlns: "http://www.w3.org/2000/svg",
				width: "16",
				height: "16",
				viewBox: "0 0 16 16",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					fill: "currentColor",
					fillOpacity: "0.4",
					transform: "translate(2.4 5.4)",
					d: "M10.176.175a.6.6 0 0 1 .849.001.6.6 0 0 1-.001.849L6.731 5.315a1 1 0 0 1-1.415 0L.176 1.025l-.077-.095A.6.6 0 0 1 .175.176a.6.6 0 0 1 .755-.077l.094.076L5.317 4.466a.2.2 0 0 0 .283 0L10.176.175Z"
				})
			})]
		}), showSelectedPanel && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "lexiang-content-picker__selected-panel",
			ref: selectedPanelRef,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lexiang-content-picker__selected-panel-header",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "lexiang-content-picker__selected-panel-title",
					children: t("tencentLexiang.selection.selectedItems", { count: selected.size })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "lexiang-content-picker__selected-panel-clear",
					onClick: () => setSelected(/* @__PURE__ */ new Map()),
					children: t("tencentLexiang.selection.clearAll")
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "lexiang-content-picker__selected-panel-list",
				children: Array.from(selected.entries()).map(([key, node]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lexiang-content-picker__selected-panel-item",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "lexiang-content-picker__selected-panel-icon",
							children: getNodeKindIcon(node)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "lexiang-content-picker__selected-panel-name",
							title: getNodeDisplayName(node),
							children: getNodeDisplayName(node)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "lexiang-content-picker__selected-panel-remove",
							onClick: () => removeSelected(key),
							"aria-label": t("tencentLexiang.selection.remove"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
								width: "14",
								height: "14",
								viewBox: "0 0 16 16",
								fill: "none",
								xmlns: "http://www.w3.org/2000/svg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M2.626 2.626a.6.6 0 0 1 .849 0L8 7.152l4.525-4.526a.6.6 0 0 1 .849.849L8.848 8l4.526 4.525a.6.6 0 0 1-.849.849L8 8.848l-4.525 4.526a.6.6 0 0 1-.849-.849L7.152 8 2.626 3.475a.6.6 0 0 1 0-.849z",
									fill: "currentColor"
								})
							})
						})
					]
				}, key))
			})]
		})]
	}) : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickerDialogShell, {
		visible,
		title: t("tencentLexiang.picker.selectFromLexiangTitle"),
		tabs: [{
			id: "recent",
			label: t("tencentLexiang.picker.recentUsed")
		}, {
			id: "directory",
			label: t("tencentLexiang.picker.kbDirectory")
		}],
		activeTabId: activeTab,
		onTabChange: (id) => handleTabChange(id),
		searchKeyword: keyword,
		onSearchKeywordChange: setKeyword,
		searchPlaceholder: resolvedSearchPlaceholder,
		searchFocused,
		onSearchFocusChange: setSearchFocused,
		confirmText: resolvedConfirmText,
		cancelText: resolvedCancelText,
		confirmDisabled: selected.size === 0,
		footerLeft,
		hideToolbar: !isAuthorized || license.status === "checking" || license.status === "denied",
		hideFooter: !isAuthorized || license.status === "checking" || license.status === "denied",
		containerStyle,
		resizable: true,
		onClose,
		onConfirm: handleConfirm,
		children: renderBody()
	});
}
var import_react, import_jsx_runtime, COLLAPSED_MAX, PAGE_SIZE;
var init_lexiang_content_picker = __esmMin((() => {
	init_tokens();
	init_lexiang_content_picker$1();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_contexts();
	init_ima_api_context();
	init_useI18n();
	init_auth_service();
	init_mcp_client();
	init_no_knowledge_base_update();
	init_constants();
	init_use_lexiang_check_auth_gate();
	init_use_lexiang_license();
	init_auth_guide();
	init_lexiang_auth_store();
	init_kb_default_icon();
	init_team_default_icon();
	init_license_denied();
	init_kb_cascade_view();
	init_kb_item_row();
	init_picker_dialog_shell();
	init_picker_icons();
	init_use_debounced_value();
	init_use_lexiang_content_data();
	import_jsx_runtime = require_jsx_runtime();
	COLLAPSED_MAX = 3;
	PAGE_SIZE = 20;
}));
//#endregion
export { init_lexiang_content_picker as n, init_use_lexiang_content_data as r, LexiangContentPicker as t };
