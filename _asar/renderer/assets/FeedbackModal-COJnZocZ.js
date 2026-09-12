import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { Yr as toast, t as init_src } from "./src-DRGoWjIu.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { t as require_react_dom } from "./react-dom-IYSM6kDg.js";
import { S as resolveProductVersion, i as getFeedbackApiUrl, p as init_environment, v as isOverseas, y as isWorkBuddy } from "./environment-DKqg3f0G.js";
import { _t as useAccount, gt as init_account_context, t as init_contexts } from "./contexts-D7XKqa2J.js";
import { r as useAdapter } from "./adapter-context-DGaRYQ5R.js";
import { r as useTranslation, t as init_useI18n } from "./useI18n-DDytAo7_.js";
//#region ../../packages/agent-ui/src/components/setting/components/panels/FeedbackModal.less
var init_FeedbackModal$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/feedback-service.ts
/**
* 获取或生成 machineId
*
* 复用与 AdapterTelemetryService 相同的 localStorage key，
* 确保反馈提交和埋点上报使用同一个机器标识。
*/
function getOrCreateMachineId() {
	try {
		const stored = localStorage.getItem(MACHINE_ID_STORAGE_KEY);
		if (stored) return stored;
		const newId = crypto.randomUUID();
		localStorage.setItem(MACHINE_ID_STORAGE_KEY, newId);
		return newId;
	} catch {
		return crypto.randomUUID();
	}
}
/**
* 推断当前操作系统平台
*
* 从 navigator.platform / navigator.userAgent 推断为接口要求的平台字符串
*/
function getPlatform() {
	if (typeof navigator === "undefined") return "unknown";
	const platform = navigator.platform?.toLowerCase() ?? "";
	const userAgent = navigator.userAgent?.toLowerCase() ?? "";
	if (platform.includes("mac") || userAgent.includes("mac")) return "macos";
	if (platform.includes("win") || userAgent.includes("windows")) return "windows";
	if (platform.includes("linux") || userAgent.includes("linux")) return "linux";
	return "unknown";
}
/**
* 带超时的 Promise 包装
*
* 当原始 Promise 在指定时间内未 resolve/reject 时，自动 reject 超时错误
*/
function withTimeout(promise, ms, message) {
	return new Promise((resolve, reject) => {
		const timer = setTimeout(() => reject(new Error(message)), ms);
		promise.then((value) => {
			clearTimeout(timer);
			resolve(value);
		}, (error) => {
			clearTimeout(timer);
			reject(error);
		});
	});
}
/**
* 将 File 对象转换为可序列化的格式（用于 IPC 传输）
*
* Electron IPC 不支持传递 File/Blob 对象，需要先转为 base64 字符串
*/
async function serializeFile(file) {
	const arrayBuffer = await file.arrayBuffer();
	const uint8Array = new Uint8Array(arrayBuffer);
	let binary = "";
	for (let i = 0; i < uint8Array.length; i++) binary += String.fromCharCode(uint8Array[i]);
	return {
		name: file.name,
		type: file.type,
		base64: btoa(binary)
	};
}
/**
* 检测是否可以通过 WorkBuddy IPC 通道提交反馈
*/
function hasWorkBuddyUserFeedbackAPI() {
	return typeof window !== "undefined" && !!window.workAPI?.userFeedback?.submit;
}
/**
* 构建统一的 IPC 请求参数
*
* 将 FeedbackModal 的 File 对象序列化为可跨进程传输的 base64 格式
*/
async function buildIPCPayload(params) {
	const { content, images, logFile, includeLog, account } = params;
	const clientType = isWorkBuddy() ? "workbuddy" : "ide";
	const platform = getPlatform();
	const clientVersion = await resolveProductVersion();
	const machineId = getOrCreateMachineId();
	const serializedImages = await Promise.all(images.map(serializeFile));
	const serializedLogFile = logFile ? await serializeFile(logFile) : null;
	return {
		content,
		clientType,
		platform,
		clientVersion: clientVersion ?? void 0,
		images: serializedImages,
		logFile: serializedLogFile,
		includeLog: includeLog ?? false,
		userId: account?.uid ?? void 0,
		machineId
	};
}
/**
* 处理 IPC 提交结果，转换为 feedback_id 或抛出错误
*
* 始终抛出 FeedbackApiError 以保留后端返回的 errorCode 和 error 信息，
* 避免因降级为普通 Error 导致前端无法展示具体错误详情。
*/
function handleIPCResult(result) {
	if (!result.success) {
		let code = result.errorCode ?? -1;
		if (code <= 0 && result.error) {
			const httpMatch = result.error.match(/status code (\d{3})/);
			if (httpMatch) code = parseInt(httpMatch[1], 10);
		}
		throw new FeedbackApiError(code, result.error || "Unknown error");
	}
	return result.feedbackId ?? 0;
}
/**
* 通过 adapter IPC 通道提交反馈（WebView → Extension Host → 后端 /v2/feedback）
*
* 这是 IDE 环境中的首选路径，请求经过：
* 1. adapter.submitUserFeedback()
* 2. backendProvider.submitUserFeedback()（IPCBackendProvider）
* 3. IWidgetChannel.callMethod('__backend__', ...)
* 4. Extension Host: BackendBridgeService.handleSubmitUserFeedback()
* 5. restOperations.post('/v2/feedback', ...)
*/
async function submitViaAdapterIPC(params) {
	const payload = await buildIPCPayload(params);
	return handleIPCResult(await params.adapter.submitUserFeedback(payload));
}
/**
* 通过 WorkBuddy IPC 通道提交反馈（渲染进程 → 主进程 → 后端）
*
* 参考 /v2/update 的链路：渲染进程通过 workAPI IPC 调用主进程，
* 主进程的 UserFeedbackService 负责实际的 HTTP 请求。
*/
async function submitViaWorkBuddyIPC(params) {
	const payload = await buildIPCPayload(params);
	console.log("[FEEDBACK_DEBUG] submitViaWorkBuddyIPC - 发送 IPC 请求...");
	const result = await window.workAPI.userFeedback.submit(payload);
	console.log("[FEEDBACK_DEBUG] submitViaWorkBuddyIPC - IPC 返回:", JSON.stringify(result));
	return handleIPCResult(result);
}
/**
* 通过 fetch API 直接提交反馈（非 WorkBuddy 环境的回退方案）
*/
async function submitViaFetch(params) {
	const { content, images, logFile, account } = params;
	const formData = new FormData();
	formData.append("content", content);
	const clientType = isWorkBuddy() ? "workbuddy" : "ide";
	formData.append("client_type", clientType);
	formData.append("platform", getPlatform());
	const clientVersion = await resolveProductVersion();
	if (clientVersion) formData.append("client_version", clientVersion);
	if (images.length > 0) images.forEach((file) => formData.append("images", file));
	if (logFile) formData.append("log", logFile);
	const headers = { "X-Machine-Id": getOrCreateMachineId() };
	if (account?.uid) headers["X-User-Id"] = account.uid;
	const response = await fetch(getFeedbackApiUrl(), {
		method: "POST",
		headers,
		body: formData
	});
	let json;
	try {
		json = await response.json();
	} catch {
		throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
	}
	if (json.code !== 0) throw new FeedbackApiError(json.code, json.msg);
	return json.data.feedback_id;
}
/**
* 提交用户反馈
*
* 在 WorkBuddy（Electron）环境下，通过 IPC 通道将数据发送到主进程，
* 由主进程的 UserFeedbackService 调用后端 /v2/feedback 接口。
* 在非 WorkBuddy 环境下，直接使用 fetch API 发送请求。
*
* @param params - 反馈参数
* @returns feedback_id - 反馈记录 ID
* @throws {FeedbackApiError} 当服务端返回业务错误时
* @throws {Error} 当网络错误或其他异常时
*/
async function submitFeedback(params) {
	if (params.adapter?.submitUserFeedback) return submitViaAdapterIPC(params);
	if (hasWorkBuddyUserFeedbackAPI()) return withTimeout(submitViaWorkBuddyIPC(params), SUBMIT_TIMEOUT_MS, "Feedback submit timeout");
	return withTimeout(submitViaFetch(params), SUBMIT_TIMEOUT_MS, "Feedback submit timeout");
}
var FeedbackApiError, MACHINE_ID_STORAGE_KEY, SUBMIT_TIMEOUT_MS;
var init_feedback_service = __esmMin((() => {
	init_environment();
	FeedbackApiError = class extends Error {
		constructor(code, msg) {
			super(msg);
			this.name = "FeedbackApiError";
			this.code = code;
			this.msg = msg;
		}
	};
	MACHINE_ID_STORAGE_KEY = "agents_machine_id";
	SUBMIT_TIMEOUT_MS = 12e4;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/setting/components/panels/FeedbackModal.tsx
/**
* 意见反馈弹框
*/
function FeedbackModal({ visible, onClose, prefillContent }) {
	const t = useTranslation();
	const adapter = useAdapter();
	const { account } = useAccount();
	const textareaRef = (0, import_react.useRef)(null);
	const fileInputRef = (0, import_react.useRef)(null);
	const [text, setText] = (0, import_react.useState)("");
	const [images, setImages] = (0, import_react.useState)([]);
	const [uploadLog, setUploadLog] = (0, import_react.useState)(true);
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	/** 隐私保护声明链接 */
	const PRIVACY_URL = isOverseas() ? "https://www.workbuddy.ai/document/privacy-policy" : "https://privacy.qq.com/document/preview/771d9a58551449e9a7e7445ebfe04966";
	/** 打开隐私保护声明 */
	const handleOpenPrivacyLink = (0, import_react.useCallback)((e) => {
		e.preventDefault();
		e.stopPropagation();
		if (adapter?.environmentType === "local") adapter?.emit("open-external", PRIVACY_URL);
		else window.open(PRIVACY_URL, "_blank");
	}, [adapter]);
	/** 重置表单 */
	const resetForm = (0, import_react.useCallback)(() => {
		setText("");
		setImages((prev) => {
			prev.forEach((img) => URL.revokeObjectURL(img.previewUrl));
			return [];
		});
		setUploadLog(true);
	}, []);
	/** 关闭弹框 */
	const handleClose = (0, import_react.useCallback)(() => {
		if (submitting) return;
		resetForm();
		onClose();
	}, [
		resetForm,
		onClose,
		submitting
	]);
	/** ESC 键关闭 */
	(0, import_react.useEffect)(() => {
		if (!visible) return;
		const handleKeyDown = (e) => {
			if (e.key === "Escape" && !submitting) handleClose();
		};
		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [
		visible,
		handleClose,
		submitting
	]);
	/**
	* 预填：仅在 visible 由 false → true 的那次跳变时注入外部内容。
	* 之后用户输入不会被覆盖；MAX_TEXT_LENGTH 硬截断防止破坏 UI。
	*
	* 注意 initial 值必须为 false：本组件通过 React.lazy 条件挂载，
	* 首次挂载时 visible 已经是 true，若 ref 初始化为 visible 会导致
	* mount 时判定成"稳定 true"，跳过首次注入。
	*/
	const prevVisibleRef = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (visible && !prevVisibleRef.current && prefillContent) setText(prefillContent.slice(0, MAX_TEXT_LENGTH));
		prevVisibleRef.current = visible;
	}, [visible, prefillContent]);
	/** 清理图片预览 URL */
	(0, import_react.useEffect)(() => () => {
		images.forEach((img) => URL.revokeObjectURL(img.previewUrl));
	}, []);
	/** 点击遮罩关闭 */
	const handleOverlayClick = (0, import_react.useCallback)((e) => {
		if (submitting) return;
		if (e.target === e.currentTarget) handleClose();
	}, [handleClose, submitting]);
	/** 文本输入 */
	const handleTextChange = (0, import_react.useCallback)((e) => {
		setText(e.target.value);
	}, []);
	/**
	* 添加单张图片：校验格式和大小，并通过函数式更新确保数量上限原子校验。
	* 调用方负责在进入此函数前给出超限提示，此处静默忽略超限情况以避免重复 toast。
	*/
	const handleAddImage = (0, import_react.useCallback)((file) => {
		if (!SUPPORTED_IMAGE_TYPES.includes(file.type)) {
			toast.error(t("settings.helpFeedback.feedbackModal.imageFormatError"));
			return;
		}
		if (file.size > MAX_IMAGE_SIZE) {
			toast.error(t("settings.helpFeedback.feedbackModal.imageSizeError"));
			return;
		}
		setImages((prev) => {
			if (prev.length >= MAX_IMAGE_COUNT) return prev;
			const previewUrl = URL.createObjectURL(file);
			return [...prev, {
				file,
				previewUrl
			}];
		});
	}, [t]);
	/** 粘贴图片（Ctrl+V / ⌘+V） */
	const handlePaste = (0, import_react.useCallback)((e) => {
		const imageItems = Array.from(e.clipboardData.items).filter((item) => item.kind === "file" && item.type.startsWith("image/"));
		if (imageItems.length === 0) return;
		e.preventDefault();
		const remaining = MAX_IMAGE_COUNT - images.length;
		if (imageItems.length > remaining) toast.error(t("settings.helpFeedback.feedbackModal.imageCountError", { count: MAX_IMAGE_COUNT }));
		imageItems.slice(0, remaining).forEach((item) => {
			const file = item.getAsFile();
			if (file) handleAddImage(file);
		});
	}, [
		images.length,
		handleAddImage,
		t
	]);
	/** 触发文件选择 */
	const handleUploadClick = (0, import_react.useCallback)(() => {
		if (images.length >= MAX_IMAGE_COUNT) return;
		fileInputRef.current?.click();
	}, [images.length]);
	/** 文件选择回调 */
	const handleFileChange = (0, import_react.useCallback)((e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		e.target.value = "";
		if (images.length >= MAX_IMAGE_COUNT) {
			toast.error(t("settings.helpFeedback.feedbackModal.imageCountError", { count: MAX_IMAGE_COUNT }));
			return;
		}
		handleAddImage(file);
	}, [
		images.length,
		handleAddImage,
		t
	]);
	/** 删除图片 */
	const handleRemoveImage = (0, import_react.useCallback)((index) => {
		setImages((prev) => {
			const newImages = [...prev];
			URL.revokeObjectURL(newImages[index].previewUrl);
			newImages.splice(index, 1);
			return newImages;
		});
	}, []);
	/** 提交反馈 */
	const handleSubmit = (0, import_react.useCallback)(async () => {
		if (!text.trim() || submitting) {
			textareaRef.current?.focus();
			return;
		}
		setSubmitting(true);
		try {
			await submitFeedback({
				content: text.trim(),
				images: images.map((img) => img.file),
				includeLog: uploadLog,
				account,
				adapter
			});
			toast.success(t("settings.helpFeedback.feedbackModal.submitSuccess"));
			resetForm();
			onClose();
		} catch (error) {
			if (error instanceof FeedbackApiError) switch (error.code) {
				case 14003:
				case 429:
					toast.error(t("settings.helpFeedback.feedbackModal.rateLimitError"));
					break;
				case 10001:
					toast.error(error.msg);
					break;
				default:
					toast.error(error.code > 0 ? t("settings.helpFeedback.feedbackModal.submitFailedWithDetail", {
						code: error.code,
						msg: error.msg
					}) : error.msg || t("settings.helpFeedback.feedbackModal.submitFailed"));
					break;
			}
			else if (error instanceof Error && error.message === "Feedback submit timeout") toast.error(t("settings.helpFeedback.feedbackModal.submitTimeout"));
			else toast.error(t("settings.helpFeedback.feedbackModal.submitFailed"));
		} finally {
			setSubmitting(false);
		}
	}, [
		text,
		images,
		uploadLog,
		submitting,
		resetForm,
		onClose,
		account,
		t
	]);
	if (!visible) return null;
	return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "feedback-modal-overlay",
		onClick: handleOverlayClick,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "feedback-modal",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "feedback-modal__header",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "feedback-modal__title",
						children: t("settings.helpFeedback.feedbackModal.title")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "feedback-modal__close-btn",
						onClick: handleClose,
						role: "button",
						tabIndex: 0,
						onKeyDown: (e) => e.key === "Enter" && handleClose(),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
							viewBox: "0 0 24 24",
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
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "feedback-modal__body",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "feedback-modal__textarea-wrap",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								ref: textareaRef,
								className: "feedback-modal__textarea",
								placeholder: t("settings.helpFeedback.feedbackModal.placeholder"),
								maxLength: MAX_TEXT_LENGTH,
								value: text,
								onChange: handleTextChange,
								onPaste: handlePaste
							}),
							images.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "feedback-modal__image-preview",
								children: images.map((img, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "feedback-modal__image-item",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: img.previewUrl,
										alt: ""
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "feedback-modal__image-remove",
										onClick: () => handleRemoveImage(index),
										role: "button",
										tabIndex: 0,
										onKeyDown: (e) => e.key === "Enter" && handleRemoveImage(index),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
											viewBox: "0 0 24 24",
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
										})
									})]
								}, img.previewUrl))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "feedback-modal__textarea-bottom",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `feedback-modal__upload-btn ${images.length >= MAX_IMAGE_COUNT ? "feedback-modal__upload-btn--disabled" : ""}`,
									onClick: handleUploadClick,
									role: "button",
									tabIndex: 0,
									onKeyDown: (e) => e.key === "Enter" && handleUploadClick(),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
										viewBox: "0 0 24 24",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
												x: "3",
												y: "3",
												width: "18",
												height: "18",
												rx: "3",
												ry: "3"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
												cx: "8.5",
												cy: "8.5",
												r: "1.5"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "21 15 16 10 5 21" })
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										t("settings.helpFeedback.feedbackModal.uploadImage"),
										" (",
										images.length,
										"/",
										MAX_IMAGE_COUNT,
										")"
									] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "feedback-modal__char-count",
									children: [
										text.length,
										"/",
										MAX_TEXT_LENGTH
									]
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: fileInputRef,
						type: "file",
						accept: "image/png,image/jpg,image/jpeg,image/gif,image/bmp,image/webp",
						style: { display: "none" },
						onChange: handleFileChange
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "feedback-modal__footer",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "feedback-modal__log-checkbox",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: uploadLog,
								onChange: (e) => setUploadLog(e.target.checked)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "feedback-modal__custom-checkbox",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
									viewBox: "0 0 24 24",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "20 6 9 17 4 12" })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "feedback-modal__log-label",
								children: [t("settings.helpFeedback.feedbackModal.uploadLog"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "feedback-modal__privacy-link",
									role: "link",
									tabIndex: 0,
									onClick: handleOpenPrivacyLink,
									onKeyDown: (e) => e.key === "Enter" && handleOpenPrivacyLink(e),
									children: t("settings.helpFeedback.feedbackModal.privacyLink")
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: `feedback-modal__submit-btn ${!text.trim() || submitting ? "feedback-modal__submit-btn--disabled" : ""}`,
						onClick: handleSubmit,
						disabled: !text.trim() || submitting,
						children: submitting ? t("settings.helpFeedback.feedbackModal.submitting") : t("settings.helpFeedback.feedbackModal.submit")
					})]
				})
			]
		})
	}), document.body);
}
var import_react, import_react_dom, import_jsx_runtime, MAX_TEXT_LENGTH, MAX_IMAGE_COUNT, MAX_IMAGE_SIZE, SUPPORTED_IMAGE_TYPES;
var init_FeedbackModal = __esmMin((() => {
	init_FeedbackModal$1();
	init_src();
	import_react = /* @__PURE__ */ __toESM(require_react());
	import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
	init_contexts();
	init_account_context();
	init_useI18n();
	init_environment();
	init_feedback_service();
	import_jsx_runtime = require_jsx_runtime();
	MAX_TEXT_LENGTH = 1e4;
	MAX_IMAGE_COUNT = 6;
	MAX_IMAGE_SIZE = 10 * 1024 * 1024;
	SUPPORTED_IMAGE_TYPES = [
		"image/jpeg",
		"image/png",
		"image/gif",
		"image/bmp",
		"image/webp"
	];
}));
//#endregion
export { init_FeedbackModal as n, FeedbackModal as t };
