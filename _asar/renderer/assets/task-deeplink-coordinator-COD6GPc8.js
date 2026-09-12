import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { Gr as expertAPI, Iu as emitTaskPrefillIntent, Lc as applyDeeplinkConnectorIds, Lu as init_task_prefill_intent, Mu as init_task_deeplink_intent_store, Nc as init_connector, Pu as subscribePendingTaskDeeplinkUrl, U as init_expert } from "./agent-mail-CiuzbR2o.js";
import { m as getBuiltinMarketSkillId, n as init_common } from "./common-CwB_VqKR.js";
import { Yr as toast, t as init_src } from "./src-DRGoWjIu.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { a as init_i18n, u as t } from "./i18n-Bt_Wap4p.js";
import { o as writeRendererLog, t as init_http_logger } from "./http-logger-BE9rNaof.js";
import { r as useTranslation, t as init_useI18n } from "./useI18n-DDytAo7_.js";
import { i as useModuleHost, n as init_module_host_context } from "./module-host-context-CI9spvhq.js";
import { i as parseDeeplink, t as init_deeplink } from "./deeplink-B0zHWB8w.js";
//#region ../../packages/agent-ui/src/modules/deeplink/skill-preselect.ts
/**
* 解析一批 deeplink skill name，返回 chips + 失败信息。
*
* best-effort：单个失败只跳过该 skill，不影响其余。
*/
async function resolveDeeplinkSkills(host, names) {
	if (!names || names.length === 0) return {
		chips: [],
		notFound: [],
		installFailed: []
	};
	const installedKeys = await loadInstalledSkillKeys(host);
	const chips = [];
	const notFound = [];
	const installFailed = [];
	for (const rawName of names) {
		const name = rawName.trim();
		if (!name) continue;
		const lower = name.toLowerCase();
		if (installedKeys.has(lower)) {
			chips.push(name);
			continue;
		}
		const outcome = await installFromEcosystem(host, name);
		if (outcome.kind === "ok") chips.push(outcome.chipName);
		else if (outcome.kind === "not-found") notFound.push(name);
		else installFailed.push(name);
	}
	return {
		chips,
		notFound,
		installFailed
	};
}
/** 读取已安装 skill 的 name/slug/skillId（lowercase）集合。 */
async function loadInstalledSkillKeys(host) {
	const keys = /* @__PURE__ */ new Set();
	const personalSkills = host.facades.personalSkills;
	if (!personalSkills) return keys;
	try {
		const res = await personalSkills.list();
		for (const skill of res.results ?? []) {
			if (skill.name) keys.add(skill.name.toLowerCase());
			if (skill.slug) keys.add(skill.slug.toLowerCase());
			if (skill.skillId) keys.add(skill.skillId.toLowerCase());
		}
	} catch (error) {
		console.warn(`${TAG$2} load installed skills failed:`, String(error));
	}
	return keys;
}
/** 按 name 在自有生态反查并可信安装。 */
async function installFromEcosystem(host, name) {
	const marketplace = host.facades.skillsMarketplace;
	if (!marketplace) return { kind: "not-found" };
	const enterpriseId = normalizeEnterpriseId(host.accountInfo?.enterpriseId);
	try {
		const listRes = await marketplace.builtin.list({
			keyword: name,
			page: 1,
			pageSize: 20,
			enterpriseId
		});
		if (listRes.code !== 0) {
			console.warn(`${TAG$2} builtin.list failed for "${name}": code=${listRes.code}`);
			return { kind: "install-failed" };
		}
		const lower = name.toLowerCase();
		const matched = (listRes.data?.skills ?? []).find((s) => s.name.toLowerCase() === lower);
		if (!matched) {
			console.warn(`${TAG$2} skill "${name}" not found in ecosystem, skip`);
			return { kind: "not-found" };
		}
		const installRes = await marketplace.builtin.install({
			skillId: getBuiltinMarketSkillId(matched),
			version: matched.version,
			name: matched.description,
			skillName: matched.name,
			icon: matched.icon || matched.icon_url
		});
		if (installRes.success) return {
			kind: "ok",
			chipName: matched.name
		};
		console.warn(`${TAG$2} install "${name}" failed:`, installRes.errorMessage);
		return { kind: "install-failed" };
	} catch (error) {
		console.warn(`${TAG$2} ecosystem install "${name}" error:`, String(error));
		return { kind: "install-failed" };
	}
}
/** enterpriseId 归一：非空字符串才返回。 */
function normalizeEnterpriseId(eid) {
	return typeof eid === "string" && eid.trim() ? eid.trim() : void 0;
}
var TAG$2;
var init_skill_preselect = __esmMin((() => {
	init_common();
	TAG$2 = "[TaskDeeplink][skills]";
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/deeplink/task-executor.ts
/**
* 执行 task deeplink 草稿预填。
*
* @returns Promise<void> —— 所有副作用 best-effort，单项失败不阻断其余预填。
*/
async function executeTaskDeeplink(deps) {
	const { task, host } = deps;
	if (task.expertId) try {
		await expertAPI.summon(host, {
			id: task.expertId,
			source: "task-deeplink"
		});
	} catch (error) {
		console.warn(`${TAG$1} summon expert "${task.expertId}" failed, skip:`, String(error));
	}
	try {
		host.navigation.goHome();
	} catch (error) {
		console.warn(`${TAG$1} navigation.goHome failed:`, String(error));
	}
	await new Promise((resolve) => setTimeout(resolve, 0));
	emitTaskPrefillIntent({
		prompt: task.prompt,
		promptContentBlocks: task.promptContentBlocks,
		cwd: task.cwd,
		model: task.model,
		mode: task.mode,
		welcomeMode: task.welcomeMode,
		permissionMode: task.permissionMode
	});
	if (task.skills && task.skills.length > 0) resolveDeeplinkSkills(host, task.skills).then(({ chips, notFound, installFailed }) => {
		if (chips.length > 0) emitTaskPrefillIntent({ skills: chips });
		const missed = [...notFound, ...installFailed];
		if (missed.length > 0) toast.warning(t("deeplink.task.skills.notFound", { names: missed.join("、") }));
	}).catch((error) => {
		console.warn(`${TAG$1} resolve skills failed:`, String(error));
	});
	if (task.connectorIds && task.connectorIds.length > 0) applyDeeplinkConnectorIds(task.connectorIds).catch((error) => {
		console.warn(`${TAG$1} apply connectorIds failed:`, String(error));
	});
}
var TAG$1;
var init_task_executor = __esmMin((() => {
	init_src();
	init_i18n();
	init_connector();
	init_expert();
	init_skill_preselect();
	init_task_prefill_intent();
	TAG$1 = "[TaskDeeplink]";
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/deeplink/task-deeplink-coordinator.tsx
/**
* 把 URL 直传的 TaskDeeplink 转成与 payload 同构的 TaskPayload（去 payloadId）。
*
* 直传模式下 promptContentBlocks 已由 parser 从 query 解出，随 `...rest` 透传，
* 无需再走 payloadId 短链换取。
*/
function toTaskPayloadFromUrl(parsed) {
	const { payloadId: _payloadId, ...rest } = parsed;
	return { ...rest };
}
function TaskDeeplinkCoordinator() {
	const host = useModuleHost();
	const t = useTranslation();
	const hostRef = (0, import_react.useRef)(host);
	hostRef.current = host;
	const tRef = (0, import_react.useRef)(t);
	tRef.current = t;
	(0, import_react.useEffect)(() => {
		const handle = async (url) => {
			writeRendererLog("task-deeplink", "info", "coordinator handle invoked");
			const parsed = parseDeeplink(url);
			if (!parsed.ok) {
				if (parsed.reason === "missing-required") toast.error(tRef.current("deeplink.task.error.missingRequired"));
				console.warn(`${TAG} parse failed:`, parsed.reason, parsed.message);
				return;
			}
			const deeplink = parsed.value;
			if (parsed.warnings.length > 0) console.warn(`${TAG} parsed with warnings:`, parsed.warnings);
			let task;
			if (deeplink.payloadId) {
				const facade = hostRef.current.facades.deeplink;
				if (!facade) {
					toast.error(tRef.current("deeplink.task.error.payloadUnavailable"));
					console.warn(`${TAG} deeplink facade not available, cannot resolve payloadId`);
					return;
				}
				const result = await facade.resolveTaskPayload(deeplink.payloadId);
				if (!result.ok) {
					toast.error(tRef.current(`deeplink.task.error.payload.${result.reason}`));
					console.warn(`${TAG} resolveTaskPayload failed:`, result.reason, result.message);
					return;
				}
				task = result.value;
			} else task = toTaskPayloadFromUrl(deeplink);
			try {
				await executeTaskDeeplink({
					task,
					host: hostRef.current
				});
			} catch (error) {
				console.error(`${TAG} executeTaskDeeplink failed:`, String(error));
			}
		};
		return subscribePendingTaskDeeplinkUrl((url) => {
			handle(url);
		});
	}, []);
	return null;
}
var import_react, TAG;
//#endregion
__esmMin((() => {
	init_src();
	init_deeplink();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_http_logger();
	init_module_host_context();
	init_task_deeplink_intent_store();
	init_task_executor();
	TAG = "[TaskDeeplink]";
}))();
export { TaskDeeplinkCoordinator };
