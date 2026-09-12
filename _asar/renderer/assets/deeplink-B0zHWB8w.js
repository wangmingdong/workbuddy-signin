import { n as __esmMin } from "./chunk-BRZcfu7K.js";
//#region ../../packages/workbuddy-server/src/deeplink/parser.ts
/**
* 判断是否为 task deeplink 的协议头 + host（不校验 action）。
* 接受任意自定义 scheme（workbuddy://），但拒绝 http/https，避免与普通 web URL 混淆。
*/
function parseTaskUrl(rawUrl) {
	let url;
	try {
		url = new URL(rawUrl);
	} catch {
		return null;
	}
	const protocol = url.protocol.toLowerCase();
	if (protocol === "http:" || protocol === "https:") return null;
	if ((url.hostname || "").toLowerCase() !== "task") return null;
	return url;
}
/** 取参数的第一个值（重复参数取首个），空串归一为 undefined。 */
function firstParam(params, key) {
	const value = params.get(key);
	if (value == null) return;
	const trimmed = value.trim();
	return trimmed.length > 0 ? trimmed : void 0;
}
/** 解析逗号分隔列表：trim、去空、去重、截断到上限。 */
function parseCommaList(raw, warnings, field) {
	if (!raw) return;
	const items = raw.split(",").map((s) => s.trim()).filter((s) => s.length > 0);
	const unique = Array.from(new Set(items));
	if (unique.length === 0) return;
	if (unique.length > 20) {
		warnings.push(`${field} 数量超过上限 20，已截断`);
		return unique.slice(0, 20);
	}
	return unique;
}
/**
* 解析 JSON 数组参数（promptContentBlocks 混排直传）。
*
* best-effort：JSON 解析失败 / 非数组 / 空数组都降级为 undefined + warning，不阻断整体。
* 用 unknown[] 保持 domain 与 ACP 类型解耦，结构校验交消费方（task-executor）。
*/
function parseJsonArrayParam(raw, warnings, field) {
	if (!raw) return;
	try {
		const parsed = JSON.parse(raw);
		if (Array.isArray(parsed)) return parsed.length > 0 ? parsed : void 0;
		warnings.push(`${field} 不是数组，已忽略`);
	} catch {
		warnings.push(`${field} JSON 解析失败，已忽略`);
	}
}
/**
* 解析 task deeplink URL。
*
* @param rawUrl 形如 `workbuddy://task?action=start&prompt=...`
*/
function parseDeeplink(rawUrl) {
	const url = parseTaskUrl(rawUrl);
	if (!url) return {
		ok: false,
		reason: "not-task-protocol",
		message: "非 task deeplink 协议"
	};
	const params = url.searchParams;
	const action = (firstParam(params, "action") ?? "").toLowerCase();
	if (action !== "start") return {
		ok: false,
		reason: "invalid-action",
		message: `不支持的 action: ${action || "(缺失)"}`
	};
	const warnings = [];
	const payloadId = firstParam(params, "payloadId");
	let prompt = firstParam(params, "prompt");
	if (prompt && prompt.length > 8e3) {
		warnings.push(`prompt 超过 ${MAX_PROMPT_LENGTH} 字符，已截断（长内容应走 payloadId）`);
		prompt = prompt.slice(0, MAX_PROMPT_LENGTH);
	}
	const promptContentBlocks = parseJsonArrayParam(firstParam(params, "promptContentBlocks"), warnings, "promptContentBlocks");
	if (!payloadId && !prompt && !promptContentBlocks) return {
		ok: false,
		reason: "missing-required",
		message: "payloadId、prompt 与 promptContentBlocks 至少需要一个"
	};
	let permissionMode;
	const rawPermissionMode = firstParam(params, "permissionMode");
	if (rawPermissionMode) if (VALID_PERMISSION_MODES.has(rawPermissionMode)) permissionMode = rawPermissionMode;
	else {
		warnings.push(`permissionMode "${rawPermissionMode}" 非法，降级为 default`);
		permissionMode = "default";
	}
	let welcomeMode;
	const rawWelcomeMode = firstParam(params, "welcomeMode");
	if (rawWelcomeMode) if (VALID_WELCOME_MODES.has(rawWelcomeMode)) welcomeMode = rawWelcomeMode;
	else warnings.push(`welcomeMode "${rawWelcomeMode}" 非法，已忽略`);
	return {
		ok: true,
		value: {
			domain: "task",
			action: "start",
			payloadId,
			prompt,
			promptContentBlocks,
			cwd: firstParam(params, "cwd"),
			expertId: firstParam(params, "expertId"),
			skills: parseCommaList(firstParam(params, "skills"), warnings, "skills"),
			connectorIds: parseCommaList(firstParam(params, "connectorIds"), warnings, "connectorIds"),
			model: firstParam(params, "model"),
			mode: firstParam(params, "mode"),
			welcomeMode,
			permissionMode
		},
		warnings
	};
}
var MAX_PROMPT_LENGTH, VALID_PERMISSION_MODES, VALID_WELCOME_MODES;
var init_parser = __esmMin((() => {
	MAX_PROMPT_LENGTH = 8e3;
	VALID_PERMISSION_MODES = new Set(["default", "fullAccess"]);
	VALID_WELCOME_MODES = new Set([
		"coding",
		"working",
		"design"
	]);
}));
//#endregion
//#region ../../packages/workbuddy-server/src/deeplink/guard.ts
/**
* deeplink/guard · 仲裁 URL 是否属于 Task Deeplink 新协议。
*
* 用途：renderer `handleDesktopOpenUrl` 在所有旧 deeplink 分支**之前**调用，
* 命中即由新协议接管（写 task intent store + return），不落旧逻辑。
*
* 并存安全性：判定条件 = host `task` + `action=start`。`task` 不在旧
* `KNOWN_HOSTS`（home/chat/expert/experts/skills/templates/automation/playbook/
* tdoc/library/my-files/ima/lexiang）中，与旧协议零碰撞。
*
* 纯函数，不抛异常（非法 URL 返回 false）。
*/
/**
* 判断是否为领域对象 Deeplink（本期仅 task）。
*
* @param rawUrl 待判定的 deeplink URL
* @returns host=task 且 action=start 时为 true
*/
function isDomainObjectDeeplink(rawUrl) {
	let url;
	try {
		url = new URL(rawUrl);
	} catch {
		return false;
	}
	const protocol = url.protocol.toLowerCase();
	if (protocol === "http:" || protocol === "https:") return false;
	if ((url.hostname || "").toLowerCase() !== "task") return false;
	return (url.searchParams.get("action") ?? "").toLowerCase() === "start";
}
var init_guard = __esmMin((() => {}));
//#endregion
//#region ../../packages/workbuddy-server/src/deeplink/mock-repo.ts
var MOCK_FULL_PAYLOAD, MOCK_TEXT_PAYLOAD, MockDeeplinkRepo;
var init_mock_repo = __esmMin((() => {
	MOCK_FULL_PAYLOAD = {
		domain: "task",
		action: "start",
		prompt: "hello test_6.txt 这是什么",
		promptContentBlocks: [
			{
				type: "text",
				text: "hello "
			},
			{
				type: "resource_link",
				name: "test_6.txt",
				uri: "tdoc://CmoWtNrGBNrI",
				title: "test_6.txt",
				_meta: {
					mentionType: "tencent-doc",
					type: "tencent-doc",
					displayAsContext: false,
					displayAsPhrase: true,
					icon: {
						url: "https://docs.qq.com/favicon.ico",
						alt: "test_6.txt"
					},
					description: "",
					fileId: "CmoWtNrGBNrI",
					fileType: "DRIVE",
					fileExt: "txt",
					displayText: "test_6.txt",
					timestamp: 1749653138048
				}
			},
			{
				type: "text",
				text: " 这是什么"
			}
		],
		cwd: "/Users/forrestfli/WorkBuddy",
		skills: ["agent-browser", "pdf"],
		connectorIds: ["tencent-docs", "lexiang"],
		model: "claude-opus-4.6",
		mode: "craft",
		welcomeMode: "coding",
		permissionMode: "default"
	};
	MOCK_TEXT_PAYLOAD = {
		domain: "task",
		action: "start",
		prompt: "帮我写一个快速排序"
	};
	MockDeeplinkRepo = class {
		async resolveTaskPayload(payloadId) {
			await new Promise((resolve) => setTimeout(resolve, 50));
			switch (payloadId) {
				case "mock-expired": return {
					ok: false,
					reason: "expired",
					message: "短连接已过期"
				};
				case "mock-forbidden": return {
					ok: false,
					reason: "forbidden",
					message: "无权访问该短连接"
				};
				case "mock-notfound": return {
					ok: false,
					reason: "not-found",
					message: "短连接不存在"
				};
				case "mock-text": return {
					ok: true,
					value: { ...MOCK_TEXT_PAYLOAD }
				};
				default: return {
					ok: true,
					value: { ...MOCK_FULL_PAYLOAD }
				};
			}
		}
	};
}));
//#endregion
//#region ../../packages/workbuddy-server/src/deeplink/index.ts
var init_deeplink = __esmMin((() => {
	init_parser();
	init_guard();
	init_mock_repo();
}));
//#endregion
export { parseDeeplink as i, MockDeeplinkRepo as n, isDomainObjectDeeplink as r, init_deeplink as t };
