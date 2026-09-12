const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./common-CcjScYt2.js","./common-CwB_VqKR.js","./chunk-BRZcfu7K.js","./preload-helper-E3UYCQGP.js","./dist-DNjXzICC.js","./dist-CSHw4oQX.js"])))=>i.map(i=>d[i]);
import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { B as accountService, n as init_common } from "./common-CwB_VqKR.js";
import { n as init_preload_helper, t as __vitePreload } from "./preload-helper-E3UYCQGP.js";
import { Yr as toast, t as init_src } from "./src-DRGoWjIu.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { m as useParams, r as init_dist } from "./dist-BlOCCi14.js";
import { n as parseLoginError, t as init_login_error_parser } from "./login-error-parser-D0A9vxdd.js";
import { i as init_adapters, n as savePathForLoginRedirect, r as createAgentAdapter, t as init_loginRedirect } from "./loginRedirect-C0Cwucud.js";
import { n as init_StatusPlaceholder, t as StatusPlaceholder } from "./StatusPlaceholder-ap1bLSpN.js";
//#region ../../packages/agent-ui/src/components/agent-share/index.tsx
/**
* 硬跳转到主站 entry 的指定路径。
*
* share entry 路由表只有三个分享路由，/task/:id、/ 等路径在 share entry 中匹配不到，
* 必须通过 window.location.replace() 让浏览器重新加载主站 entry（index.html）。
*
* basename 检测逻辑与 share-router.tsx 中的 detectBasename 保持一致。
*
* @param path 目标路径，如 `/task/${sessionId}` 或 `/`
*/
function redirectToMainEntry(path) {
	const { pathname } = window.location;
	let basename = "";
	if (pathname === "/agents" || pathname.startsWith("/agents/")) basename = "/agents";
	else if (pathname === "/app" || pathname.startsWith("/app/")) basename = "/app";
	else if (pathname === "/workbuddy" || pathname.startsWith("/workbuddy/")) basename = "/workbuddy";
	window.location.replace(`${basename}${path}`);
}
/**
* 等待 runtime 就绪（ACP 端口可达）
*
* 通过尝试 ACP initialize 握手来确认 runtime 已就绪。
* - wasUpgraded=true: manifest 更新触发 pm2 reload，初始等待 3s，最多重试 6 次
* - wasUpgraded=false: runtime 可能短暂不可达，无初始等待，最多重试 3 次
*
* 超时后不阻塞跳转，交给 task 页面的正常 connect 流程处理。
*/
async function waitForRuntimeReady(sessionId, setMessage, wasUpgraded) {
	const maxAttempts = wasUpgraded ? 6 : 3;
	const { httpService } = await __vitePreload(async () => {
		const { httpService } = await import("./common-CcjScYt2.js");
		return { httpService };
	}, __vite__mapDeps([0,1,2,3,4,5]), import.meta.url);
	console.log(`[AgentShare] waitForRuntimeReady: start, sessionId=${sessionId}, wasUpgraded=${wasUpgraded}`);
	if (wasUpgraded) {
		setMessage(`Agent 版本已更新，正在启动新版本 (${sessionId})...`);
		await new Promise((r) => setTimeout(r, 3e3));
	} else setMessage(`会话创建成功 (${sessionId})，正在连接...`);
	for (let attempt = 1; attempt <= maxAttempts; attempt++) try {
		const resp = await httpService.get(`/console/as/conversations/${sessionId}/session`);
		const link = resp?.data?.link;
		const token = resp?.data?.token;
		if (!link || !token) throw new Error(`session data incomplete: link=${!!link}, token=${!!token}`);
		const endpoint = link.replace(/^http:\/\//, "https://");
		console.log(`[AgentShare] waitForRuntimeReady: attempt ${attempt}/${maxAttempts}, endpoint=${endpoint}`);
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), 5e3);
		try {
			const probeResp = await fetch(endpoint, {
				method: "HEAD",
				headers: { "Authorization": `Bearer ${token}` },
				signal: controller.signal
			});
			clearTimeout(timeoutId);
			console.log(`[AgentShare] waitForRuntimeReady: ACP reachable on attempt ${attempt}, status=${probeResp.status}`);
			setMessage(`连接成功 (${sessionId})，正在进入会话...`);
			return;
		} catch (probeErr) {
			clearTimeout(timeoutId);
			if (probeErr?.name === "AbortError") throw new Error("ACP probe timeout (5s)");
			throw probeErr;
		}
	} catch (err) {
		const delayMs = wasUpgraded ? Math.min(attempt + 2, 5) * 1e3 : Math.min(attempt + 1, 3) * 1e3;
		console.warn(`[AgentShare] waitForRuntimeReady: attempt ${attempt}/${maxAttempts} failed: ${err?.message || err}, retrying in ${delayMs}ms`);
		setMessage(`Agent 正在启动中 (${sessionId})，请稍候...`);
		await new Promise((r) => setTimeout(r, delayMs));
	}
	console.warn(`[AgentShare] waitForRuntimeReady: all ${maxAttempts} attempts exhausted, proceeding to navigate`);
	setMessage(`正在进入会话 (${sessionId})...`);
}
var import_react, import_jsx_runtime, AgentSharePage;
//#endregion
__esmMin((() => {
	init_common();
	init_src();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_dist();
	init_adapters();
	init_login_error_parser();
	init_loginRedirect();
	init_StatusPlaceholder();
	import_jsx_runtime = require_jsx_runtime();
	init_preload_helper();
	AgentSharePage = () => {
		const { agentBusinessId } = useParams();
		const [adapter, setAdapter] = (0, import_react.useState)(null);
		const [backendProvider, setBackendProvider] = (0, import_react.useState)(null);
		const [account, setAccount] = (0, import_react.useState)(() => accountService.getAccount());
		const [accountLoading, setAccountLoading] = (0, import_react.useState)(() => !accountService.isInitialized());
		const [message, setMessage] = (0, import_react.useState)("正在准备...");
		const createStartedRef = (0, import_react.useRef)(false);
		(0, import_react.useEffect)(() => {
			let mounted = true;
			createAgentAdapter().then((inst) => {
				if (!mounted) return;
				setAdapter(inst);
				const bp = inst.getBackendProvider?.();
				if (bp) setBackendProvider(bp);
			}).catch(() => {
				if (mounted) {
					setMessage("初始化失败");
					toast.error("初始化失败，请刷新重试");
				}
			});
			return () => {
				mounted = false;
			};
		}, []);
		(0, import_react.useEffect)(() => {
			const unsubscribe = accountService.subscribe((newAccount) => {
				setAccount(newAccount);
				setAccountLoading(false);
			});
			if (accountService.isInitialized() && accountLoading) {
				setAccountLoading(false);
				setAccount(accountService.getAccount());
			}
			return unsubscribe;
		}, [accountLoading]);
		(0, import_react.useEffect)(() => {
			if (!backendProvider || accountService.isInitialized()) return;
			backendProvider.getAccount().catch(() => {
				setAccountLoading(false);
			});
		}, [backendProvider]);
		(0, import_react.useEffect)(() => {
			if (!backendProvider || accountLoading || createStartedRef.current) return;
			if (!agentBusinessId) return;
			if (!account) {
				setMessage("正在跳转登录...");
				savePathForLoginRedirect();
				Promise.resolve(adapter?.login?.()).catch((err) => {
					const parsed = parseLoginError(err);
					const userMsg = parsed.code === "AUTH_UNKNOWN" ? err.message || "登录失败" : parsed.rawMessage.slice(parsed.code.length + 1).trimStart() || err.message || "登录失败";
					console.error("[AgentShare] Login failed:", parsed.rawMessage);
					toast.error(userMsg);
				});
				return;
			}
			createStartedRef.current = true;
			setMessage("正在创建会话...");
			const createInstance = async () => {
				if (!backendProvider.createInstanceFromShare) throw new Error("接口不可用，请刷新重试");
				const result = await backendProvider.createInstanceFromShare(agentBusinessId);
				if ("error" in result) {
					const errMsg = result.error || "";
					if (errMsg.includes("未启用") || errMsg.toLowerCase().includes("not enabled")) {
						toast.error("Agent 未启用，请联系 Agent 管理员");
						redirectToMainEntry("/");
						return;
					}
					throw new Error(result.error);
				}
				const { instance, wasUpgraded } = result;
				if (!instance.sessionId) throw new Error("会话创建中，请稍后重试");
				await waitForRuntimeReady(instance.sessionId, setMessage, wasUpgraded);
				redirectToMainEntry(`/task/${instance.sessionId}`);
			};
			createInstance().catch((err) => {
				const msg = err.message || "未知错误";
				if (msg.includes("未启用") || msg.toLowerCase().includes("not enabled")) toast.error("Agent 未启用，请联系 Agent 管理员");
				else toast.error(msg);
				redirectToMainEntry("/");
			});
		}, [
			backendProvider,
			account,
			accountLoading,
			agentBusinessId,
			adapter
		]);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				height: "100vh"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPlaceholder, {
				type: "loading",
				title: message
			})
		});
	};
}))();
export { AgentSharePage, AgentSharePage as default };
