const require_chunk = require("./chunk.js");
const require_common$1 = require("./common.js");
const require_dev_env_override = require("./dev-env-override.js");
let fs = require("fs");
fs = require_chunk.__toESM(fs);
let os = require("os");
os = require_chunk.__toESM(os);
let path = require("path");
path = require_chunk.__toESM(path);
//#region ../../packages/workbuddy-server/src/agent/cli-product-env.ts
function resolveAgentCliProductEnv({ processEnv = process.env, productConfigEnv, productConfigPathEnv, fallbackProductConfigEnv, fallbackProductConfigPathEnv } = {}) {
	const resolvedProductConfigPathEnv = productConfigPathEnv ?? processEnv["ACC_PRODUCT_CONFIG_PATH"] ?? fallbackProductConfigPathEnv;
	const resolvedProductConfigEnv = productConfigEnv ?? (resolvedProductConfigPathEnv ? void 0 : processEnv.ACC_PRODUCT_CONFIG_V3) ?? (resolvedProductConfigPathEnv ? void 0 : fallbackProductConfigEnv);
	const env = {
		ACC_PRODUCT_CONFIG_V3: resolvedProductConfigEnv,
		[AGENT_CLI_PRODUCT_CONFIG_PATH_ENV_KEY]: resolvedProductConfigPathEnv
	};
	applyAgentCliHostedProductEnvironment(env, processEnv);
	return {
		productConfigEnv: resolvedProductConfigEnv,
		productConfigPathEnv: resolvedProductConfigPathEnv,
		hostedCliInternetEnv: env[AGENT_CLI_HOSTED_INTERNET_ENVIRONMENT_KEY]
	};
}
async function resolveAgentCliProductEnvAsync({ processEnv = process.env, productConfigEnv, productConfigPathEnv, fallbackProductConfigEnv, fallbackProductConfigPathEnv } = {}) {
	const resolvedProductConfigPathEnv = productConfigPathEnv ?? processEnv["ACC_PRODUCT_CONFIG_PATH"] ?? fallbackProductConfigPathEnv;
	const resolvedProductConfigEnv = productConfigEnv ?? (resolvedProductConfigPathEnv ? void 0 : processEnv.ACC_PRODUCT_CONFIG_V3) ?? (resolvedProductConfigPathEnv ? void 0 : fallbackProductConfigEnv);
	const env = {
		ACC_PRODUCT_CONFIG_V3: resolvedProductConfigEnv,
		[AGENT_CLI_PRODUCT_CONFIG_PATH_ENV_KEY]: resolvedProductConfigPathEnv
	};
	await applyAgentCliHostedProductEnvironmentAsync(env, processEnv);
	return {
		productConfigEnv: resolvedProductConfigEnv,
		productConfigPathEnv: resolvedProductConfigPathEnv,
		hostedCliInternetEnv: env[AGENT_CLI_HOSTED_INTERNET_ENVIRONMENT_KEY]
	};
}
function applyAgentCliHostedProductEnvironment(env, processEnv = process.env) {
	const networkEnvironment = resolveAgentCliHostedInternetEnvironment(env, processEnv);
	if (networkEnvironment) env[AGENT_CLI_HOSTED_INTERNET_ENVIRONMENT_KEY] = networkEnvironment;
	else delete env[AGENT_CLI_HOSTED_INTERNET_ENVIRONMENT_KEY];
	return env;
}
async function applyAgentCliHostedProductEnvironmentAsync(env, processEnv = process.env) {
	const networkEnvironment = await resolveAgentCliHostedInternetEnvironmentAsync(env, processEnv);
	if (networkEnvironment) env[AGENT_CLI_HOSTED_INTERNET_ENVIRONMENT_KEY] = networkEnvironment;
	else delete env[AGENT_CLI_HOSTED_INTERNET_ENVIRONMENT_KEY];
	return env;
}
function resolveAgentCliHostedInternetEnvironment(env, processEnv = process.env) {
	const mergedEnv = env ? {
		...processEnv,
		...env
	} : processEnv;
	for (const key of AGENT_CLI_PRODUCT_CONFIG_ENV_KEYS) {
		const configValue = readAgentCliProductConfigJsonByKey(key, mergedEnv);
		if (!configValue) continue;
		try {
			const networkEnvironment = JSON.parse(configValue)?.networkEnvironment;
			if (isAgentCliProductEnvironment(networkEnvironment)) return networkEnvironment;
		} catch {}
	}
	const currentEnvironment = processEnv[require_common$1.ENV_KEY_CODEBUDDY_COPILOT_INTERNET_ENVIRONMENT];
	if (isAgentCliProductEnvironment(currentEnvironment)) return currentEnvironment;
}
async function resolveAgentCliHostedInternetEnvironmentAsync(env, processEnv = process.env) {
	const mergedEnv = env ? {
		...processEnv,
		...env
	} : processEnv;
	for (const key of AGENT_CLI_PRODUCT_CONFIG_ENV_KEYS) {
		const configValue = await readAgentCliProductConfigJsonByKeyAsync(key, mergedEnv);
		if (!configValue) continue;
		try {
			const networkEnvironment = JSON.parse(configValue)?.networkEnvironment;
			if (isAgentCliProductEnvironment(networkEnvironment)) return networkEnvironment;
		} catch {}
	}
	const currentEnvironment = processEnv[require_common$1.ENV_KEY_CODEBUDDY_COPILOT_INTERNET_ENVIRONMENT];
	if (isAgentCliProductEnvironment(currentEnvironment)) return currentEnvironment;
}
function readAgentCliProductConfigJsonByKey(key, env = process.env) {
	const inline = env[key];
	if (inline) return inline;
	if (key !== "ACC_PRODUCT_CONFIG_V3") return;
	const filePath = env[AGENT_CLI_PRODUCT_CONFIG_PATH_ENV_KEY];
	if (!filePath) return;
	try {
		return fs.readFileSync(filePath, "utf8");
	} catch {
		return;
	}
}
async function readAgentCliProductConfigJsonByKeyAsync(key, env = process.env) {
	const inline = env[key];
	if (inline) return inline;
	if (key !== "ACC_PRODUCT_CONFIG_V3") return;
	const filePath = env[AGENT_CLI_PRODUCT_CONFIG_PATH_ENV_KEY];
	if (!filePath) return;
	try {
		return await fsp.readFile(filePath, "utf8");
	} catch {
		return;
	}
}
function isAgentCliProductEnvironment(value) {
	return typeof value === "string" && Object.values(require_common$1.ProductEnviroment).includes(value);
}
var fsp, AGENT_CLI_PRODUCT_CONFIG_ENV_KEYS, AGENT_CLI_PRODUCT_CONFIG_PATH_ENV_KEY, AGENT_CLI_HOSTED_INTERNET_ENVIRONMENT_KEY;
var init_cli_product_env = require_chunk.__esmMin((() => {
	require_common$1.init_common();
	fsp = fs.promises;
	AGENT_CLI_PRODUCT_CONFIG_ENV_KEYS = ["ACC_PRODUCT_CONFIG_V3", "ACC_PRODUCT_CONFIG_V2"];
	AGENT_CLI_PRODUCT_CONFIG_PATH_ENV_KEY = "ACC_PRODUCT_CONFIG_PATH";
	AGENT_CLI_HOSTED_INTERNET_ENVIRONMENT_KEY = "CODEBUDDY_INTERNET_ENVIRONMENT";
}));
//#endregion
//#region src/main/system/runtime/bundled-assets.ts
/**
* Unified bundled-asset path resolution.
*
* Aligned with craft-agents-oss: one module owns the root, every consumer
* resolves through it. Handles dev vs production paths transparently.
*
* Usage:
*   // main/index.ts (once, early)
*   setBundledAssetsRoot(__dirname);
*
*   // anywhere
*   resolveBundledAsset('builtin-skills');          // → first existing path
*   resolveBundledAsset('cli', 'bin', 'codebuddy'); // → nested lookup
*/
/**
* Set the root directory for bundled asset resolution.
* Call once from the main process entry with `__dirname`.
*
* In production (electron-vite):  __dirname → <app>/dist/main/
* In development (electron-vite): __dirname → <project>/dist/main/ (or source)
*/
function setBundledAssetsRoot(dir) {
	_root = dir;
}
function getAssetsRoot() {
	return _root ?? process.cwd();
}
function getElectronResourcesPath() {
	const resourcesPath = process.resourcesPath;
	return typeof resourcesPath === "string" && resourcesPath.length > 0 ? resourcesPath : void 0;
}
/**
* Resolve a bundled asset path by trying candidate locations in priority order.
*
* Candidate chain:
*   1. <root>/<segments>                — packaged app root
*   2. <root>/resources/<segments>      — dev: resources/ subdir
*   3. <root>/../../<segments>          — dev: dist/main → project root
*   4. <root>/../../resources/<segments> — dev: project root resources/
*/
function resolveBundledAsset(...segments) {
	const root = getAssetsRoot();
	for (const fn of CANDIDATES_FNS) {
		const p = fn(root, segments);
		if (p && (0, fs.existsSync)(p)) return p;
	}
}
function requireBundledAsset(...segments) {
	const resolved = resolveBundledAsset(...segments);
	if (!resolved) {
		const root = getAssetsRoot();
		throw new Error(`[bundled-assets] Cannot locate "${segments.join("/")}".\n  Root: ${root}\n  Searched:
` + CANDIDATES_FNS.map((fn) => {
			const candidate = fn(root, segments);
			return candidate ? `    - ${candidate}` : null;
		}).filter(Boolean).join("\n"));
	}
	return resolved;
}
var _root, CANDIDATES_FNS;
var init_bundled_assets = require_chunk.__esmMin((() => {
	CANDIDATES_FNS = [
		(_root, segments) => {
			const resourcesPath = getElectronResourcesPath();
			return resourcesPath ? (0, path.join)(resourcesPath, "app.asar.unpacked", "resources", ...segments) : void 0;
		},
		(_root, segments) => {
			const resourcesPath = getElectronResourcesPath();
			return resourcesPath ? (0, path.join)(resourcesPath, "app.asar.unpacked", ...segments) : void 0;
		},
		(root, segments) => (0, path.join)(root, ...segments),
		(root, segments) => (0, path.join)(root, "..", "resources", ...segments),
		(root, segments) => (0, path.join)(root, "resources", ...segments),
		(root, segments) => (0, path.join)(root, "..", "..", ...segments),
		(root, segments) => (0, path.join)(root, "..", "..", "resources", ...segments)
	];
}));
//#endregion
//#region src/main/system/runtime/install-channel.ts
function resolveMacInstallChannelDir(product, env = process.env) {
	const override = normalizeString(env.WORKBUDDY_INSTALL_CHANNEL_DIR);
	if (override) return override;
	const appSupportName = normalizeString(product?.productName) ?? normalizeString(product?.applicationName) ?? DEFAULT_APP_SUPPORT_NAME;
	return path.join(os.homedir(), "Library", "Application Support", appSupportName);
}
function resolveMacInstallChannelPath(product, env = process.env) {
	return path.join(resolveMacInstallChannelDir(product, env), INSTALL_CHANNEL_FILE_NAME);
}
function resolveMacInstallChannelUpdateMarkerPath(product, env = process.env) {
	return path.join(resolveMacInstallChannelDir(product, env), UPDATE_MARKER_FILE_NAME);
}
function writeMacInstallChannelUpdateMarker(product, options) {
	if ((options?.platform ?? process.platform) !== "darwin") return;
	const marker = {
		source: "auto-update",
		startedAt: options?.now ?? Date.now(),
		targetVersion: normalizeString(options?.targetVersion),
		bundleId: getBundleId(product)
	};
	writeJsonAtomically(resolveMacInstallChannelUpdateMarkerPath(product, options?.env), marker);
}
function reconcileMacInstallChannel(product, options) {
	if ((options?.platform ?? process.platform) !== "darwin") return;
	const channelPath = resolveMacInstallChannelPath(product, options?.env);
	if (consumedUpdateMarker || consumeFreshUpdateMarker(product, options)) return readInstallChannelRecord(channelPath);
	const seed = getInstallChannelSeed(product);
	if (seed?.mode === "channel-package" && seed.channel) {
		const record = {
			downloadChannel: seed.channel,
			source: seed.source,
			writtenAt: new Date(options?.now ?? Date.now()).toISOString(),
			appVersion: getProductVersion(product),
			bundleId: getBundleId(product)
		};
		writeJsonAtomically(channelPath, record);
		return record;
	}
	if (seed?.mode === "official") {
		deleteFile(channelPath);
		return;
	}
	return readInstallChannelRecord(channelPath);
}
function applyMacInstallChannelToProductConfiguration(product, options) {
	const record = reconcileMacInstallChannel(product, options);
	if (!record?.downloadChannel) return product;
	const config = isRecord(product.config) ? { ...product.config } : {};
	const rawBranding = config.channelBranding;
	const channelBranding = isRecord(rawBranding) ? { ...rawBranding } : {};
	channelBranding.channelId = record.downloadChannel;
	return {
		...product,
		downloadChannel: record.downloadChannel,
		config: {
			...config,
			channelBranding
		}
	};
}
function consumeFreshUpdateMarker(product, options) {
	const markerPath = resolveMacInstallChannelUpdateMarkerPath(product, options?.env);
	const marker = readJsonFile(markerPath);
	deleteFile(markerPath);
	if (marker?.source !== "auto-update" || typeof marker.startedAt !== "number") return false;
	const now = options?.now ?? Date.now();
	const isFresh = now - marker.startedAt >= 0 && now - marker.startedAt <= UPDATE_MARKER_TTL_MS;
	if (isFresh) consumedUpdateMarker = true;
	return isFresh;
}
function getInstallChannelSeed(product) {
	const rawSeed = product.installChannel;
	if (!isRecord(rawSeed)) return;
	const mode = normalizeString(rawSeed.mode);
	const channel = normalizeChannel(rawSeed.channel);
	if (mode === "channel-package" && channel) return {
		mode,
		channel,
		source: normalizeString(rawSeed.source) ?? "installChannel"
	};
	if (mode === "official") return {
		mode,
		source: normalizeString(rawSeed.source) ?? "installChannel"
	};
}
function readInstallChannelRecord(channelPath) {
	const record = readJsonFile(channelPath);
	const downloadChannel = normalizeChannel(record?.downloadChannel);
	if (!downloadChannel) return;
	return {
		downloadChannel,
		source: normalizeString(record?.source) ?? "persisted",
		writtenAt: normalizeString(record?.writtenAt) ?? "",
		appVersion: normalizeString(record?.appVersion),
		bundleId: normalizeString(record?.bundleId)
	};
}
function readJsonFile(filePath) {
	try {
		return JSON.parse(fs.readFileSync(filePath, "utf8"));
	} catch {
		return;
	}
}
function writeJsonAtomically(filePath, value) {
	fs.mkdirSync(path.dirname(filePath), {
		recursive: true,
		mode: 448
	});
	const tempPath = `${filePath}.tmp`;
	fs.writeFileSync(tempPath, `${JSON.stringify(value, null, 2)}\n`, {
		encoding: "utf8",
		mode: 384
	});
	fs.renameSync(tempPath, filePath);
}
function deleteFile(filePath) {
	try {
		fs.rmSync(filePath, { force: true });
	} catch {}
}
function normalizeString(value) {
	if (typeof value !== "string") return;
	return value.trim() || void 0;
}
function normalizeChannel(value) {
	const channel = normalizeString(value);
	if (!channel || /[\0\r\n]/.test(channel)) return;
	return channel;
}
function isRecord(value) {
	return !!value && typeof value === "object" && !Array.isArray(value);
}
function getProductVersion(product) {
	return normalizeString(product.productVersion) ?? normalizeString(product.genieVersion);
}
function getBundleId(product) {
	return normalizeString(product?.darwinBundleIdentifier);
}
var INSTALL_CHANNEL_FILE_NAME, UPDATE_MARKER_FILE_NAME, UPDATE_MARKER_TTL_MS, DEFAULT_APP_SUPPORT_NAME, consumedUpdateMarker;
var init_install_channel = require_chunk.__esmMin((() => {
	INSTALL_CHANNEL_FILE_NAME = "install-channel.json";
	UPDATE_MARKER_FILE_NAME = "install-channel-update-marker.json";
	UPDATE_MARKER_TTL_MS = 1800 * 1e3;
	DEFAULT_APP_SUPPORT_NAME = "WorkBuddy";
	consumedUpdateMarker = false;
}));
//#endregion
//#region src/main/system/runtime/workbuddy-product-config.ts
function resolveAccProductConfigCachePath() {
	const base = process.env.WORKBUDDY_CONFIG_DIR?.trim() || process.env.CODEBUDDY_CONFIG_DIR?.trim() || path.join(os.homedir(), ".workbuddy");
	return path.join(base, "cache", "acc-product-config-v3.json");
}
function readAccProductConfigV3Json(env = process.env) {
	const inline = env.ACC_PRODUCT_CONFIG_V3;
	if (inline) return inline;
	const filePath = env[ACC_PRODUCT_CONFIG_PATH_ENV];
	if (filePath) try {
		return fs.readFileSync(filePath, "utf8");
	} catch {
		return;
	}
}
function assignAccProductConfigV3ToProcessEnv(json) {
	if (process.platform !== "linux" || Buffer.byteLength(json, "utf8") <= ACC_PRODUCT_CONFIG_INLINE_ENV_MAX_BYTES) {
		setInlineAccProductConfigV3(json);
		return;
	}
	const configPath = resolveAccProductConfigCachePath();
	try {
		fs.mkdirSync(path.dirname(configPath), {
			recursive: true,
			mode: 448
		});
		const tempPath = `${configPath}.tmp`;
		fs.writeFileSync(tempPath, json, {
			encoding: "utf8",
			mode: 384
		});
		fs.renameSync(tempPath, configPath);
	} catch (error) {
		console.warn(`[WorkbuddyProductConfig] Failed to spill ACC_PRODUCT_CONFIG_V3 to ${configPath}, falling back to inline env (${Buffer.byteLength(json, "utf8")} bytes):`, error);
		setInlineAccProductConfigV3(json);
		return;
	}
	delete process.env.ACC_PRODUCT_CONFIG_V3;
	process.env[ACC_PRODUCT_CONFIG_PATH_ENV] = configPath;
	console.log(`[WorkbuddyProductConfig] Spilled oversized ACC_PRODUCT_CONFIG_V3 (${Buffer.byteLength(json, "utf8")} bytes) to ${configPath} to avoid execve E2BIG.`);
}
function setInlineAccProductConfigV3(json) {
	process.env.ACC_PRODUCT_CONFIG_V3 = json;
	const stalePath = process.env[ACC_PRODUCT_CONFIG_PATH_ENV];
	if (stalePath) try {
		fs.rmSync(stalePath, { force: true });
	} catch {}
	delete process.env[ACC_PRODUCT_CONFIG_PATH_ENV];
}
function readProductConfigurationFromDisk(fileName = "product.json") {
	const resolved = resolveBundledAsset("cli", fileName);
	if (resolved) try {
		return JSON.parse(fs.readFileSync(resolved, "utf-8"));
	} catch {}
	throw new Error(`[WorkbuddyProductConfig] Failed to locate cli/${fileName}.`);
}
function getWorkbuddyBaseProductConfiguration() {
	if (!cachedBaseProductConfiguration) cachedBaseProductConfiguration = readProductConfigurationFromDisk();
	return cachedBaseProductConfiguration;
}
function tryGetWorkbuddyBaseProductConfiguration() {
	try {
		return getWorkbuddyBaseProductConfiguration();
	} catch {
		return;
	}
}
/**
* 读取当前构建产物里的 commit SHA。
*
* 基础 `cli/product.json` 不带 `commit`（只有 ACC patch 出的
* `product.{env}.json` 才会注入）。因此启动早期（未登录、env 未确定）
* 时，依次尝试所有已知 env 产品的 commit；拿到任一即可，因为同一次
* ACC patch 对所有 env 产品写入同一个 commit。
*
* 全程失败静默，拿不到返回 undefined，调用方自行兜底。
*/
function tryGetWorkbuddyProductCommit() {
	const base = tryGetWorkbuddyBaseProductConfiguration();
	if (base?.commit) return base.commit;
	for (const fileName of [
		"product.cloudhosted.json",
		"product.internal.json",
		"product.selfhosted.json",
		"product.ioa.json",
		"product.external.json"
	]) try {
		const product = readProductConfigurationFromDisk(fileName);
		if (product.commit) return product.commit;
	} catch {}
}
function getWorkbuddyBootstrapProductConfiguration() {
	return buildWorkbuddyResolvedProductConfiguration({ networkEnvironment: resolveWorkbuddyProductEnvironmentFromSessionFile() });
}
function getWorkbuddyBootstrapProductConfigurationEnv() {
	if (!cachedBootstrapProductConfigurationEnv) cachedBootstrapProductConfigurationEnv = JSON.stringify(getWorkbuddyBootstrapProductConfiguration());
	return cachedBootstrapProductConfigurationEnv;
}
function ensureWorkbuddyBootstrapProductEnv() {
	const networkEnvironment = resolveWorkbuddyProductEnvironmentFromSessionFile();
	if (networkEnvironment && !process.env["CODEBUDDY_COPILOT_INTERNET_ENVIRONMENT"]) process.env[require_common$1.ENV_KEY_CODEBUDDY_COPILOT_INTERNET_ENVIRONMENT] = networkEnvironment;
	if (!readAccProductConfigV3Json()) assignAccProductConfigV3ToProcessEnv(getWorkbuddyBootstrapProductConfigurationEnv());
	if (!process.env.CODEBUDDY_WAIT_FOR_MCP_SERVERS_ENABLED) process.env.CODEBUDDY_WAIT_FOR_MCP_SERVERS_ENABLED = "0";
	ensureWorkbuddyCustomUserDataDirEnv();
	ensureWorkbuddyCustomAppNameEnv();
}
function ensureWorkbuddyCustomUserDataDirEnv() {
	if (process.env.WORKBUDDY_CONFIG_DIR?.trim()) return;
	const customUserDataDir = tryGetWorkbuddyBaseProductConfiguration()?.config?.customUserDataDir;
	if (typeof customUserDataDir !== "string") return;
	const trimmed = customUserDataDir.trim();
	if (!trimmed) return;
	process.env.WORKBUDDY_CONFIG_DIR = path.join(os.homedir(), trimmed);
}
/**
* custom/专享版下，让 runtime 的 {@link getWorkbuddyAppName} 直接落到 cli/product.json 的
* `defaultFolderName`（由 copy-cli.js 写入）。
*
* 背景：apply-brand-patch.js 会在编译前把 app-instance.ts 的 `DEFAULT_APP_NAME` 改成企业名，
* 但一些增量打包/本地调试路径可能读到旧的字面量。通过 env 注入，运行时以 product.json 为准，
* 任务默认 cwd / Claw 工作区目录 / 系统托盘 tooltip 等均会落到 `~/{enterpriseLabel}`。
*
* SaaS 不设置 defaultFolderName 的 enterprise 分支，行为保持默认 'WorkBuddy'。
*/
function ensureWorkbuddyCustomAppNameEnv() {
	if (process.env.WORKBUDDY_APP_NAME?.trim()) return;
	const product = tryGetWorkbuddyBaseProductConfiguration();
	const productName = product?.productName;
	if (typeof productName === "string" && productName.trim()) {
		process.env.WORKBUDDY_APP_NAME = productName.trim();
		return;
	}
	const defaultFolderName = product?.defaultFolderName;
	if (typeof defaultFolderName !== "string") return;
	const trimmed = defaultFolderName.trim();
	if (!trimmed) return;
	process.env.WORKBUDDY_APP_NAME = trimmed;
}
function getWorkbuddyAuthenticationConfiguration() {
	const auth = tryGetWorkbuddyBaseProductConfiguration()?.authentication;
	if (!auth) return;
	if (process.env.NODE_ENV === "development") {
		const baseId = auth.id ?? "workbuddy-desktop";
		if (!baseId.endsWith("-dev")) return {
			...auth,
			id: `${baseId}-dev`
		};
	}
	return auth;
}
function resolveWorkbuddyProductEnvironmentFromSession(session, sourceProduct) {
	const domain = session?.auth?.domain;
	if (!domain) return;
	const attributes = getMergedAuthenticationConfiguration(sourceProduct)?.attributes ?? {};
	if (isMatchingDomain(attributes.internalDomain, domain)) return require_common$1.ProductEnviroment.Internal;
	if (isMatchingDomain(attributes.iOADomain, domain)) return require_common$1.ProductEnviroment.IOA;
	if (isMatchingDomain(attributes.cloudHostedDomain, domain)) return require_common$1.ProductEnviroment.Cloudhosted;
	if (isMatchingDomain(attributes.externalDomain, domain)) return require_common$1.ProductEnviroment.External;
	return require_common$1.ProductEnviroment.Selfhosted;
}
function resolveWorkbuddyProductEnvironmentFromSessionFile() {
	const authPath = getWorkbuddyAuthFilePath();
	if (!authPath || !fs.existsSync(authPath) || fs.existsSync(`${authPath}.logged-out`)) return;
	try {
		return resolveWorkbuddyProductEnvironmentFromSession(JSON.parse(fs.readFileSync(authPath, "utf-8")));
	} catch {
		return;
	}
}
function buildWorkbuddyResolvedProductConfiguration(options) {
	const base = getWorkbuddyBaseProductConfiguration();
	const source = options?.product;
	const networkEnvironment = options?.networkEnvironment ?? resolveWorkbuddyProductEnvironmentFromSession(options?.session, source ?? base) ?? source?.networkEnvironment ?? base.networkEnvironment;
	const environmentProduct = getWorkbuddyEnvironmentProductConfiguration(networkEnvironment);
	const authentication = getMergedAuthenticationConfiguration(source);
	const mergedProductFeatures = mergeObjectLayers(base.productFeatures, environmentProduct?.productFeatures, source?.productFeatures);
	if (process.env.WORKBUDDY_PRODUCT_CONFIG_DEBUG === "1") {
		console.log("[WorkbuddyProductConfig] networkEnvironment:", networkEnvironment);
		console.log("[WorkbuddyProductConfig] loaded environment config:", networkEnvironment ? `product.${networkEnvironment.toLowerCase()}.json` : "none");
		console.log("[WorkbuddyProductConfig] environmentProduct productFeatures:", environmentProduct?.productFeatures);
		console.log("[WorkbuddyProductConfig] base productFeatures:", base.productFeatures);
		console.log("[WorkbuddyProductConfig] source productFeatures:", source?.productFeatures);
		console.log("[WorkbuddyProductConfig] merged productFeatures:", JSON.stringify(mergedProductFeatures, null, 2));
	}
	let resolved = {
		...base,
		...environmentProduct,
		...source,
		networkEnvironment,
		authentication,
		productFeatures: mergedProductFeatures,
		featureToggles: mergeObjectLayers(base.featureToggles, environmentProduct?.featureToggles, source?.featureToggles),
		config: mergeObjectLayers(base.config, environmentProduct?.config, source?.config),
		prompts: mergeNamedArrayLayers(base.prompts, environmentProduct?.prompts, source?.prompts),
		agents: mergeNamedArrayLayers(base.agents, environmentProduct?.agents, source?.agents),
		models: options?.remoteHasModels && source?.models?.length ? source.models : mergeNamedArrayLayers(base.models, environmentProduct?.models, source?.models),
		skills: mergeNamedArrayLayers(base.skills, environmentProduct?.skills, source?.skills),
		tools: mergeNamedArrayLayers(base.tools, environmentProduct?.tools, source?.tools),
		modelPromotions: mergeNamedArrayLayers(base.modelPromotions, environmentProduct?.modelPromotions, source?.modelPromotions)
	};
	const useRemoteReplace = !!(options?.remoteHasModels && source?.models?.length);
	try {
		const logger = import_common.ContainerUtil.get(import_common.Logger);
		const getModelIds = (models) => models?.map((m) => m.id).filter(Boolean).join(", ") || "(none)";
		logger.info(`[buildResolvedProductConfig] remoteHasModels=${!!options?.remoteHasModels}, useRemoteReplace=${useRemoteReplace}, base=${base.models?.length ?? 0}, env=${environmentProduct?.models?.length ?? 0}, source=${source?.models?.length ?? 0}, resolved=${resolved.models?.length ?? 0}`);
		logger.info(`[buildResolvedProductConfig] base ids: ${getModelIds(base.models)}`);
		logger.info(`[buildResolvedProductConfig] env ids: ${getModelIds(environmentProduct?.models)}`);
		logger.info(`[buildResolvedProductConfig] source ids: ${getModelIds(source?.models)}`);
		logger.info(`[buildResolvedProductConfig] resolved ids: ${getModelIds(resolved.models)}`);
	} catch {}
	const endpointOverride = require_dev_env_override.resolveEndpointOverride();
	if (endpointOverride) {
		resolved.endpoint = endpointOverride;
		if (resolved.authentication) resolved.authentication = {
			...resolved.authentication,
			endpoint: endpointOverride
		};
	}
	if (process.env.NODE_ENV === "development" && resolved.authentication) {
		const baseId = resolved.authentication.id ?? "workbuddy-desktop";
		if (!baseId.endsWith("-dev")) resolved.authentication = {
			...resolved.authentication,
			id: `${baseId}-dev`
		};
	}
	resolved = applyMacInstallChannelToProductConfiguration(resolved);
	return resolved;
}
function getWorkbuddyAuthFilePath() {
	const authenticationId = getWorkbuddyAuthenticationConfiguration()?.id;
	if (!authenticationId) return;
	return path.join(getSharedAuthDirectory(), `${authenticationId}.info`);
}
function getSharedAuthDirectory() {
	switch (process.platform) {
		case "darwin": return path.join(os.homedir(), "Library", "Application Support", "CodeBuddyExtension", "Data", "Public", "auth");
		case "win32": return path.join(os.homedir(), "AppData", "Local", "CodeBuddyExtension", "Data", "Public", "auth");
		default: return path.join(os.homedir(), ".local", "share", "CodeBuddyExtension", "Data", "Public", "auth");
	}
}
function getMergedAuthenticationConfiguration(sourceProduct) {
	const baseAuthentication = tryGetWorkbuddyBaseProductConfiguration()?.authentication;
	const sourceAuthentication = sourceProduct?.authentication;
	if (!baseAuthentication && !sourceAuthentication) return;
	return {
		...sourceAuthentication ?? {},
		...baseAuthentication ?? {},
		attributes: {
			...baseAuthentication?.attributes ?? {},
			...sourceAuthentication?.attributes ?? {}
		}
	};
}
function getWorkbuddyEnvironmentProductConfiguration(networkEnvironment) {
	if (!networkEnvironment) return;
	const cacheKey = networkEnvironment.toLowerCase();
	if (cachedEnvironmentProductConfigurations.has(cacheKey)) return cachedEnvironmentProductConfigurations.get(cacheKey);
	try {
		const product = readProductConfigurationFromDisk(`product.${cacheKey}.json`);
		delete product.authentication;
		cachedEnvironmentProductConfigurations.set(cacheKey, product);
		return product;
	} catch {
		cachedEnvironmentProductConfigurations.set(cacheKey, void 0);
		return;
	}
}
/**
* Merge named arrays by id/name key (matching ProductMerger's SmartMerge behavior).
* Later layers override earlier ones for items with the same key; new items are appended.
*
* 导出供 WorkbuddyProductManager.publishResolvedConfiguration() 复用，
* 保证 modelPromotions 在两条 resolved 路径上都按 id 合并（Issue #57623）。
*/
function mergeNamedArrayLayers(...layers) {
	const definedLayers = layers.filter((layer) => Array.isArray(layer));
	if (definedLayers.length === 0) return;
	const getKey = (item) => item.id ?? item.name;
	const result = [...definedLayers[0]];
	for (let i = 1; i < definedLayers.length; i++) for (const item of definedLayers[i]) {
		const key = getKey(item);
		if (key) {
			const existingIndex = result.findIndex((r) => getKey(r) === key);
			if (existingIndex >= 0) result[existingIndex] = {
				...result[existingIndex],
				...item
			};
			else result.push(item);
		} else result.push(item);
	}
	return result;
}
function mergeObjectLayers(...layers) {
	const definedLayers = layers.filter((layer) => !!layer);
	if (definedLayers.length === 0) return;
	return Object.assign({}, ...definedLayers);
}
function isMatchingDomain(configuredDomain, currentDomain) {
	if (!configuredDomain) return false;
	return (Array.isArray(configuredDomain) ? configuredDomain : [configuredDomain]).some((domainPattern) => {
		if (domainPattern === currentDomain) return true;
		if (!domainPattern.includes("*")) return false;
		return new RegExp(`^${domainPattern.replace(/\./g, "\\.").replace(/\*/g, "[^.]*")}$`).test(currentDomain);
	});
}
var import_common, cachedBaseProductConfiguration, cachedBootstrapProductConfigurationEnv, cachedEnvironmentProductConfigurations, ACC_PRODUCT_CONFIG_PATH_ENV, ACC_PRODUCT_CONFIG_INLINE_ENV_MAX_BYTES;
var init_workbuddy_product_config = require_chunk.__esmMin((() => {
	import_common = require_common$1.require_common$1();
	require_common$1.init_common();
	init_cli_product_env();
	init_bundled_assets();
	require_dev_env_override.init_dev_env_override();
	init_install_channel();
	cachedEnvironmentProductConfigurations = /* @__PURE__ */ new Map();
	ACC_PRODUCT_CONFIG_PATH_ENV = "ACC_PRODUCT_CONFIG_PATH";
	ACC_PRODUCT_CONFIG_INLINE_ENV_MAX_BYTES = 48e3;
}));
//#endregion
Object.defineProperty(exports, "ACC_PRODUCT_CONFIG_PATH_ENV", {
	enumerable: true,
	get: function() {
		return ACC_PRODUCT_CONFIG_PATH_ENV;
	}
});
Object.defineProperty(exports, "AGENT_CLI_HOSTED_INTERNET_ENVIRONMENT_KEY", {
	enumerable: true,
	get: function() {
		return AGENT_CLI_HOSTED_INTERNET_ENVIRONMENT_KEY;
	}
});
Object.defineProperty(exports, "assignAccProductConfigV3ToProcessEnv", {
	enumerable: true,
	get: function() {
		return assignAccProductConfigV3ToProcessEnv;
	}
});
Object.defineProperty(exports, "buildWorkbuddyResolvedProductConfiguration", {
	enumerable: true,
	get: function() {
		return buildWorkbuddyResolvedProductConfiguration;
	}
});
Object.defineProperty(exports, "ensureWorkbuddyBootstrapProductEnv", {
	enumerable: true,
	get: function() {
		return ensureWorkbuddyBootstrapProductEnv;
	}
});
Object.defineProperty(exports, "ensureWorkbuddyCustomAppNameEnv", {
	enumerable: true,
	get: function() {
		return ensureWorkbuddyCustomAppNameEnv;
	}
});
Object.defineProperty(exports, "ensureWorkbuddyCustomUserDataDirEnv", {
	enumerable: true,
	get: function() {
		return ensureWorkbuddyCustomUserDataDirEnv;
	}
});
Object.defineProperty(exports, "getWorkbuddyAuthenticationConfiguration", {
	enumerable: true,
	get: function() {
		return getWorkbuddyAuthenticationConfiguration;
	}
});
Object.defineProperty(exports, "getWorkbuddyBaseProductConfiguration", {
	enumerable: true,
	get: function() {
		return getWorkbuddyBaseProductConfiguration;
	}
});
Object.defineProperty(exports, "getWorkbuddyBootstrapProductConfiguration", {
	enumerable: true,
	get: function() {
		return getWorkbuddyBootstrapProductConfiguration;
	}
});
Object.defineProperty(exports, "getWorkbuddyBootstrapProductConfigurationEnv", {
	enumerable: true,
	get: function() {
		return getWorkbuddyBootstrapProductConfigurationEnv;
	}
});
Object.defineProperty(exports, "getWorkbuddyEnvironmentProductConfiguration", {
	enumerable: true,
	get: function() {
		return getWorkbuddyEnvironmentProductConfiguration;
	}
});
Object.defineProperty(exports, "init_bundled_assets", {
	enumerable: true,
	get: function() {
		return init_bundled_assets;
	}
});
Object.defineProperty(exports, "init_cli_product_env", {
	enumerable: true,
	get: function() {
		return init_cli_product_env;
	}
});
Object.defineProperty(exports, "init_install_channel", {
	enumerable: true,
	get: function() {
		return init_install_channel;
	}
});
Object.defineProperty(exports, "init_workbuddy_product_config", {
	enumerable: true,
	get: function() {
		return init_workbuddy_product_config;
	}
});
Object.defineProperty(exports, "mergeNamedArrayLayers", {
	enumerable: true,
	get: function() {
		return mergeNamedArrayLayers;
	}
});
Object.defineProperty(exports, "readAccProductConfigV3Json", {
	enumerable: true,
	get: function() {
		return readAccProductConfigV3Json;
	}
});
Object.defineProperty(exports, "readAgentCliProductConfigJsonByKey", {
	enumerable: true,
	get: function() {
		return readAgentCliProductConfigJsonByKey;
	}
});
Object.defineProperty(exports, "requireBundledAsset", {
	enumerable: true,
	get: function() {
		return requireBundledAsset;
	}
});
Object.defineProperty(exports, "resolveAgentCliProductEnv", {
	enumerable: true,
	get: function() {
		return resolveAgentCliProductEnv;
	}
});
Object.defineProperty(exports, "resolveAgentCliProductEnvAsync", {
	enumerable: true,
	get: function() {
		return resolveAgentCliProductEnvAsync;
	}
});
Object.defineProperty(exports, "resolveBundledAsset", {
	enumerable: true,
	get: function() {
		return resolveBundledAsset;
	}
});
Object.defineProperty(exports, "resolveWorkbuddyProductEnvironmentFromSession", {
	enumerable: true,
	get: function() {
		return resolveWorkbuddyProductEnvironmentFromSession;
	}
});
Object.defineProperty(exports, "resolveWorkbuddyProductEnvironmentFromSessionFile", {
	enumerable: true,
	get: function() {
		return resolveWorkbuddyProductEnvironmentFromSessionFile;
	}
});
Object.defineProperty(exports, "setBundledAssetsRoot", {
	enumerable: true,
	get: function() {
		return setBundledAssetsRoot;
	}
});
Object.defineProperty(exports, "tryGetWorkbuddyBaseProductConfiguration", {
	enumerable: true,
	get: function() {
		return tryGetWorkbuddyBaseProductConfiguration;
	}
});
Object.defineProperty(exports, "tryGetWorkbuddyProductCommit", {
	enumerable: true,
	get: function() {
		return tryGetWorkbuddyProductCommit;
	}
});
Object.defineProperty(exports, "writeMacInstallChannelUpdateMarker", {
	enumerable: true,
	get: function() {
		return writeMacInstallChannelUpdateMarker;
	}
});
