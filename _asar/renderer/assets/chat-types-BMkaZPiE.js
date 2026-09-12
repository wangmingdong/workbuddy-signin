import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { W as Lock, t as init_lucide_react } from "./lucide-react-CmX0JwWL.js";
import { t as require_client } from "./client-BPkZUIji.js";
import { a as init_i18n, u as t } from "./i18n-Bt_Wap4p.js";
import { H as Modal, ct as Button, t as init_foundation } from "./foundation-QOglV606.js";
//#region ../../packages/agent-ui/src/utils/timing.ts
/**
* 防抖和节流工具
*
* 使用场景：
* 1. 搜索输入防抖 - 用户停止输入后才发起请求
* 2. 滚动事件节流 - 限制滚动处理频率
* 3. 按钮点击节流 - 防止重复提交
* 4. 窗口 resize 防抖 - 停止调整后才重新计算布局
*/
/**
* 创建防抖函数
* 在指定延迟内只执行最后一次调用
*
* @param fn 要防抖的函数
* @param delay 延迟时间（毫秒），默认 400ms
* @returns 防抖后的函数
*
* @example
* // 搜索输入防抖
* const debouncedSearch = debounce((query: string) => {
*     fetch(`/api/search?q=${query}`);
* }, 300);
* input.addEventListener('input', (e) => debouncedSearch(e.target.value));
*
* @example
* // 窗口 resize 防抖
* const debouncedResize = debounce(() => recalculateLayout(), 200);
* window.addEventListener('resize', debouncedResize);
*/
function debounce(fn, delay = 400) {
	let timeoutId = null;
	return (...args) => {
		if (timeoutId) clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			fn(...args);
			timeoutId = null;
		}, delay);
	};
}
/**
* 创建节流函数
* 在指定时间间隔内只执行第一次调用
*
* @param fn 要节流的函数
* @param interval 时间间隔（毫秒），默认 400ms
* @returns 节流后的函数
*
* @example
* // 滚动事件节流
* const throttledScroll = throttle(() => {
*     console.log('scroll position:', window.scrollY);
* }, 100);
* window.addEventListener('scroll', throttledScroll);
*
* @example
* // 按钮点击节流（防止重复提交）
* const throttledSubmit = throttle(() => submitForm(), 1000);
* button.addEventListener('click', throttledSubmit);
*/
function throttle(fn, interval = 400) {
	let lastTime = 0;
	return (...args) => {
		const now = Date.now();
		if (now - lastTime >= interval) {
			fn(...args);
			lastTime = now;
		}
	};
}
var DebouncedMap;
var init_timing = __esmMin((() => {
	DebouncedMap = class {
		constructor(delay = 400) {
			this.timers = /* @__PURE__ */ new Map();
			this.delay = delay;
		}
		/**
		* 执行防抖调用
		* @param key 唯一标识，相同 key 的调用会被防抖
		* @param fn 要执行的函数
		*/
		call(key, fn) {
			const existingTimer = this.timers.get(key);
			if (existingTimer) clearTimeout(existingTimer);
			const timer = setTimeout(() => {
				fn();
				this.timers.delete(key);
			}, this.delay);
			this.timers.set(key, timer);
		}
		/**
		* 清除所有待执行的防抖调用
		*/
		clear() {
			for (const timer of this.timers.values()) clearTimeout(timer);
			this.timers.clear();
		}
		/**
		* 清除指定 key 的防抖调用
		*/
		cancel(key) {
			const timer = this.timers.get(key);
			if (timer) {
				clearTimeout(timer);
				this.timers.delete(key);
			}
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/utils/login-expired-dialog.scss
var init_login_expired_dialog$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/utils/login-expired-dialog.tsx
function LoginExpiredDialogContent({ onConfirm, onClose }) {
	const [visible, setVisible] = (0, import_react.useState)(true);
	const handleConfirm = () => {
		setVisible(false);
		onConfirm();
	};
	const handleClose = () => {
		setVisible(false);
		onClose();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, {
		open: visible,
		onOpenChange: (next) => {
			if (!next) handleClose();
		},
		size: "small",
		width: 420,
		centered: true,
		closable: false,
		footer: null,
		className: "wb-login-expired",
		ariaLabel: t("auth.expired.title"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "wb-login-expired__close",
				"aria-label": t("auth.expired.later"),
				onClick: handleClose,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": true,
					children: "×"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "wb-login-expired__body",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "wb-login-expired__icon",
					"aria-hidden": true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
						width: 20,
						height: 20,
						strokeWidth: 2
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "wb-login-expired__text",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "wb-login-expired__title",
						children: t("auth.expired.title")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "wb-login-expired__desc",
						children: t("auth.expired.content")
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "wb-login-expired__footer",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "grey",
					size: "medium",
					onClick: handleClose,
					children: t("auth.expired.later")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "primary",
					size: "medium",
					className: "wb-login-expired__btn-confirm",
					onClick: handleConfirm,
					children: t("auth.expired.confirm")
				})]
			})
		]
	});
}
/**
* 显示登录过期弹窗。已显示时不会重复挂载，只更新点击"立即重新登录"的回调。
*/
function showLoginExpiredDialog(onSignIn) {
	pendingSignInHandler = onSignIn;
	if (dialogContainer) return;
	dialogContainer = document.createElement("div");
	dialogContainer.id = "login-expired-dialog-root";
	document.body.appendChild(dialogContainer);
	dialogRoot = (0, import_client.createRoot)(dialogContainer);
	const handleConfirm = () => {
		const handler = pendingSignInHandler;
		hideLoginExpiredDialog();
		handler?.();
	};
	dialogRoot.render(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoginExpiredDialogContent, {
		onConfirm: handleConfirm,
		onClose: hideLoginExpiredDialog
	}));
}
/**
* 关闭弹窗。
*
* 注意：这里只关弹窗、不清除全局过期态——按协议要求"稍后"关闭后下一次请求还要再弹，
* 全局态由 auth-expired-detector 统一管理。
*/
function hideLoginExpiredDialog() {
	pendingSignInHandler = null;
	if (dialogRoot) {
		dialogRoot.unmount();
		dialogRoot = null;
	}
	if (dialogContainer) {
		dialogContainer.remove();
		dialogContainer = null;
	}
}
var import_react, import_client, import_jsx_runtime, dialogRoot, dialogContainer, pendingSignInHandler;
var init_login_expired_dialog = __esmMin((() => {
	init_login_expired_dialog$1();
	init_lucide_react();
	import_react = /* @__PURE__ */ __toESM(require_react());
	import_client = /* @__PURE__ */ __toESM(require_client());
	init_foundation();
	init_i18n();
	import_jsx_runtime = require_jsx_runtime();
	dialogRoot = null;
	dialogContainer = null;
	pendingSignInHandler = null;
}));
//#endregion
//#region ../../packages/agent-ui/src/utils/auth-expired-detector.ts
function setExpired(next) {
	if (isAuthExpired === next) return;
	isAuthExpired = next;
	expiredListeners.forEach((fn) => {
		try {
			fn(next);
		} catch (err) {
			console.error("[AuthExpired] listener error:", err);
		}
	});
}
/**
* 注册"打开登录"回调。AuthProvider 在 backendProvider 就绪后调用一次。
* 返回反注册函数，AuthProvider unmount 时清理（虽然实际上一直挂着）。
*/
function registerAuthExpiredSignInHandler(handler) {
	signInHandler = handler;
	return () => {
		if (signInHandler === handler) signInHandler = null;
	};
}
/** 订阅 isAuthExpired 变化。立即拿一次当前值。 */
function subscribeAuthExpired(listener) {
	expiredListeners.add(listener);
	listener(isAuthExpired);
	return () => {
		expiredListeners.delete(listener);
	};
}
/**
* 命中后清除登录过期态。
* 用户重新登录成功 / 主动 logout 走完后调用，让 UI 回到正常未登录或已登录态。
*/
function clearAuthExpired() {
	setExpired(false);
	hideLoginExpiredDialog();
}
/**
* 判断错误对象是否带有约定的 data.category === 'auth' 鉴权失效信号。
*
* 数据来源：
*   服务端 acp-agent 抛 RpcError → Desktop preload 的 toRpcErrorEnvelope 包成
*   { __rpcErrorEnvelope, code, data, ... } 信封 → renderer 的 create-domain-proxy
*   按 __rpcErrorEnvelope 重建 Error 并保留 code / data，这里直接读 data.category。
*
* 兼容形式：
*   - error.data.category === 'auth'（标准约定）
*   - error.cause?.data?.category === 'auth'（被包了一层 wrap 的情况）
*   - 嵌套在 message 里的 JSON-RPC 错误体（refusal stopReason 路径）
*/
function isAuthExpiredError(error) {
	if (!error || typeof error !== "object") return false;
	const candidates = [error];
	const causeHolder = error;
	if (causeHolder.cause && typeof causeHolder.cause === "object") candidates.push(causeHolder.cause);
	const dataHolder = error.data;
	if (dataHolder && typeof dataHolder === "object") candidates.push(dataHolder);
	for (const candidate of candidates) {
		const data = candidate.data;
		if (data && typeof data === "object" && data.category === "auth") return true;
	}
	const message = error.message;
	if (typeof message === "string" && message.includes("\"category\"") && message.includes("\"auth\"")) try {
		const start = message.indexOf("{");
		const end = message.lastIndexOf("}");
		if (start >= 0 && end > start) {
			if (JSON.parse(message.slice(start, end + 1))?.data?.category === "auth") return true;
		}
	} catch {}
	return false;
}
/**
* 由各错误展示出口调用（adapter.emitError / prompt 的 catch / refusal stopReason /
* collab 的 onError bridge）：识别命中 → 设置全局态 + 弹弹窗。
*
* - 已经处于 expired 状态时不重复弹（弹窗自身已防重，这里再加一道保险）
* - 没注册 signInHandler（一般不会）也不阻塞，按钮点击走 noop
*/
function notifyIfAuthExpired(error) {
	if (!isAuthExpiredError(error)) return false;
	setExpired(true);
	showLoginExpiredDialog(() => {
		signInHandler?.();
	});
	return true;
}
/**
* UI 主动触发（如左下角"点击登录"按钮）：直接弹弹窗，不再次置位过期态。
*/
function openLoginExpiredDialog() {
	showLoginExpiredDialog(() => {
		signInHandler?.();
	});
}
var signInHandler, isAuthExpired, expiredListeners;
var init_auth_expired_detector = __esmMin((() => {
	init_login_expired_dialog();
	signInHandler = null;
	isAuthExpired = false;
	expiredListeners = /* @__PURE__ */ new Set();
}));
//#endregion
//#region ../../packages/agent-ui/src/utils/product-features.ts
/**
* 产品特性开关（PRODUCT_FEATURES）读取工具
*
* 收敛散落各处的「容错读 window.PRODUCT_FEATURES」逻辑。`window.PRODUCT_FEATURES`
* 由部署侧注入，是一段 JSON 字符串（非对象），需 JSON.parse 后取字段。
* 所有读取都做非浏览器环境 / 解析失败的容错，失败时返回安全默认值。
*/
/**
* 容错解析 window.PRODUCT_FEATURES 为对象。
* 非浏览器环境、未注入或解析失败时返回 null。
*/
function parseProductFeatures() {
	if (typeof window === "undefined") return null;
	const raw = window.PRODUCT_FEATURES;
	if (!raw) return null;
	try {
		const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
		return parsed && typeof parsed === "object" ? parsed : null;
	} catch {
		return null;
	}
}
/**
* 读取部署侧注入的 boolean ProductFeatures。
*
* Web 端 `window.PRODUCT_FEATURES` 是部署时注入的产品级兜底开关；只透出 boolean，
* 避免把异常结构传入通用 ProductFeature 解析链路。
*/
function readRuntimeProductFeatures() {
	const features = parseProductFeatures();
	if (!features) return;
	const result = {};
	Object.entries(features).forEach(([key, value]) => {
		if (typeof value === "boolean") result[key] = value;
	});
	return result;
}
/**
* 是否隐藏积分消耗（企业版部署 PRODUCT_FEATURES.DisableCreditsConsumed）。
*
* 企业版配置在运行期不变，调用方按需一次性读取即可（对齐旧链路 useMemo(...,[])）。
* 非浏览器 / 未注入 / 解析失败时返回 false（默认展示积分）。
*/
function readDisableCreditsConsumed() {
	return readRuntimeProductFeatures()?.DisableCreditsConsumed === true;
}
var init_product_features = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/types/chat-types.ts
var MessageType, ToolState;
var init_chat_types = __esmMin((() => {
	MessageType = /* @__PURE__ */ function(MessageType) {
		MessageType["USER"] = "user";
		MessageType["ASSISTANT"] = "assistant";
		MessageType["SYSTEM"] = "system";
		MessageType["FUNCTION"] = "function";
		MessageType["TOOL"] = "tool";
		return MessageType;
	}({});
	ToolState = /* @__PURE__ */ function(ToolState) {
		ToolState["IDLE"] = "idle";
		ToolState["PARSING"] = "parsing";
		ToolState["PENDING"] = "pending";
		ToolState["STREAM_EXECUTING"] = "stream_executing";
		ToolState["FULL_EXECUTING"] = "full_executing";
		ToolState["EXECUTED"] = "executed";
		ToolState["SKIPPED"] = "skipped";
		ToolState["FAILED"] = "failed";
		ToolState["CANCELLED"] = "cancelled";
		ToolState["DESTROYED"] = "destroyed";
		return ToolState;
	}({});
}));
//#endregion
export { readDisableCreditsConsumed as a, init_auth_expired_detector as c, registerAuthExpiredSignInHandler as d, subscribeAuthExpired as f, throttle as g, init_timing as h, init_product_features as i, notifyIfAuthExpired as l, debounce as m, ToolState as n, readRuntimeProductFeatures as o, DebouncedMap as p, init_chat_types as r, clearAuthExpired as s, MessageType as t, openLoginExpiredDialog as u };
