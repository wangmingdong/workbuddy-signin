var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../../node_modules/@tencent/tencent-docs-ai-engine/lib/common/document-types.js
var require_document_types = __commonJS({
  "../../node_modules/@tencent/tencent-docs-ai-engine/lib/common/document-types.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.TENCENT_DOCS_ENGINE_SUPPORTED_EXTENSIONS = exports2.TENCENT_DOCS_ENGINE_FILE_TYPES = void 0;
    exports2.getTencentDocsEngineDocType = getTencentDocsEngineDocType;
    exports2.getTencentDocsSelectionFileType = getTencentDocsSelectionFileType;
    exports2.isTencentDocsEngineSupportedExtension = isTencentDocsEngineSupportedExtension;
    exports2.isTencentDocsEngineDocType = isTencentDocsEngineDocType2;
    exports2.TENCENT_DOCS_ENGINE_FILE_TYPES = Object.freeze([
      Object.freeze({
        engineType: "doc",
        selectionFileType: "word",
        extensions: Object.freeze([
          ".doc",
          ".docx",
          ".dot",
          ".dotx",
          ".wps",
          ".wpt",
          ".docm",
          ".dotm"
        ])
      }),
      Object.freeze({
        engineType: "sheet",
        selectionFileType: "excel",
        extensions: Object.freeze([".csv", ".xls", ".xlsx", ".xlt", ".xltx", ".xlsm", ".xltm"])
      }),
      Object.freeze({
        engineType: "slide",
        selectionFileType: "ppt",
        extensions: Object.freeze([
          ".pptx",
          ".ppt",
          ".pps",
          ".pot",
          ".pptm",
          ".ppsx",
          ".ppsm",
          ".potx",
          ".potm"
        ])
      }),
      Object.freeze({
        engineType: "pdf",
        selectionFileType: "pdf",
        extensions: Object.freeze([".pdf"])
      })
    ]);
    exports2.TENCENT_DOCS_ENGINE_SUPPORTED_EXTENSIONS = Object.freeze(exports2.TENCENT_DOCS_ENGINE_FILE_TYPES.flatMap((item) => item.extensions));
    var engineDocTypeSet = new Set(exports2.TENCENT_DOCS_ENGINE_FILE_TYPES.map((item) => item.engineType));
    var extensionToFileType = /* @__PURE__ */ new Map();
    for (const item of exports2.TENCENT_DOCS_ENGINE_FILE_TYPES) {
      for (const ext of item.extensions) {
        extensionToFileType.set(ext, item);
      }
    }
    function normalizeTencentDocsFileExtension(value) {
      const trimmed = value.trim();
      if (!trimmed) {
        return "";
      }
      if (!/[\\/]/.test(trimmed) && !trimmed.includes(".")) {
        const bare = trimmed.split(/[?#]/, 1)[0] ?? "";
        return bare ? `.${bare.toLowerCase()}` : "";
      }
      const slashIndex = Math.max(trimmed.lastIndexOf("/"), trimmed.lastIndexOf("\\"));
      const fileName = trimmed.slice(slashIndex + 1);
      const dotIndex = fileName.lastIndexOf(".");
      if (dotIndex < 0 || dotIndex === fileName.length - 1) {
        return "";
      }
      const extToken = fileName.slice(dotIndex + 1).split(/[?#]/, 1)[0] ?? "";
      return extToken ? `.${extToken.toLowerCase()}` : "";
    }
    function getTencentDocsEngineFileType(value) {
      return extensionToFileType.get(normalizeTencentDocsFileExtension(value));
    }
    function getTencentDocsEngineDocType(value) {
      return getTencentDocsEngineFileType(value)?.engineType;
    }
    function getTencentDocsSelectionFileType(value) {
      return getTencentDocsEngineFileType(value)?.selectionFileType;
    }
    function isTencentDocsEngineSupportedExtension(value) {
      return Boolean(getTencentDocsEngineFileType(value));
    }
    function isTencentDocsEngineDocType2(value) {
      return Boolean(value && engineDocTypeSet.has(value));
    }
  }
});

// ../../packages/workbuddy-server/src/docs-shared/feature-list.ts
function getFeatureValue(options) {
  const inConversation = Boolean(options?.inConversation);
  const aiEditEnabled = options?.aiEditEnabled !== false;
  return { aiEdit: inConversation && aiEditEnabled };
}
function getDocsFeatureListString(options) {
  return JSON.stringify(getFeatureValue(options));
}
var WORKBUDDY_DOCS_FEATURE_LIST_RESOLVE_CHANNEL = "workbuddy:tencentDocs:resolveFeatureList";

// ../../packages/workbuddy-server/src/docs-shared/mqq/bridge.ts
var WORKBUDDY_MQQ_BRIDGE_CHANNEL = "workbuddy:mqqBridge";

// ../../packages/workbuddy-server/src/docs-shared/url-guards.ts
var import_document_types = __toESM(require_document_types());

// ../../packages/workbuddy-server/src/tencent-docs/webview-download.ts
var WORKBUDDY_TENCENT_DOCS_WEBVIEW_DOWNLOAD_CHANNEL = "workbuddy:tencentDocs:webviewDownload";
var MAIN_WORLD_DOWNLOAD_TRIGGER_KEY = "__tencentDocsWebviewDownload";
function isExclusiveExportHost(hostname) {
  const idx = hostname.indexOf("-docs.");
  if (idx <= 0) {
    return false;
  }
  const subdomain = hostname.slice(0, idx);
  return subdomain.includes("export");
}
function isTencentDocsDownloadHref(url) {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") {
      return false;
    }
    const hostname = parsed.hostname;
    if (hostname === "export.docs.qq.com" || hostname.endsWith(".export.docs.qq.com")) {
      return true;
    }
    if (isExclusiveExportHost(hostname)) {
      return true;
    }
    const disposition = parsed.searchParams.get("response-content-disposition") ?? "";
    return disposition.toLowerCase().includes("attachment");
  } catch {
    return false;
  }
}

// ../../packages/workbuddy-server/src/docs-shared/url-guards.ts
function isTencentDocsUrl(url) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" && (parsed.hostname === "docs.qq.com" || parsed.hostname.endsWith(".docs.qq.com"));
  } catch {
    return false;
  }
}
function isLocalTencentDocsEnginePreviewUrl(url) {
  try {
    const parsed = new URL(url);
    const segments = parsed.pathname.split("/").filter(Boolean);
    return parsed.protocol === "http:" && (parsed.hostname === "127.0.0.1" || parsed.hostname === "localhost") && segments.length === 3 && segments[0] === "static" && (0, import_document_types.isTencentDocsEngineDocType)(segments[1]) && segments[2] === "pc.html";
  } catch {
    return false;
  }
}
function isTencentDocsClipboardOrigin(originOrUrl, localEngineOrigin) {
  if (!originOrUrl) {
    return false;
  }
  if (isTencentDocsUrl(originOrUrl)) {
    return true;
  }
  if (!localEngineOrigin) {
    return false;
  }
  try {
    return new URL(originOrUrl).origin === new URL(localEngineOrigin).origin;
  } catch {
    return false;
  }
}

// ../../packages/workbuddy-server/src/docs-shared/mqq/guest-telemetry.ts
var WORKBUDDY_REPORT_TELEMETRY_API = "workbuddy.reportTelemetry";

// ../../packages/workbuddy-server/src/docs-shared/mqq/protocol.ts
var DOCX_ON_SELECTION_CHANGE_API = "docx.onSelectionChange";
var DOCX_ON_SELECTION_SEND_API = "docx.onSelectionSend";
var DOCX_ON_DOCUMENT_STATUS_CHANGED_API = "docx.onDocumentStatusChanged";
var DOCUMENT_FRAME_WILL_APPEAR_EVENT = "documentFrameWillAppear";
var DOCUMENT_FRAME_WILL_DISAPPEAR_EVENT = "documentFrameWillDisappear";
var DOCUMENT_FRAME_WILL_CLOSE_EVENT = "documentFrameWillClose";
var DOCUMENT_FRAME_CLOSE_EVENT = "documentFrameClose";
var DOCUMENT_FRAME_WILL_REMOVE_EVENT = "documentFrameWillRemove";
var DOCUMENT_FRAME_REMOVED_EVENT = "documentFrameRemoved";
function buildMqqSubscriberSubscribeApi(eventName) {
  return `subscriber.subscribe#${eventName}`;
}
function buildMqqSubscriberUnsubscribeApi(eventName) {
  return `subscriber.unsubscribe#${eventName}`;
}
var DOCUMENT_FRAME_WILL_APPEAR_SUBSCRIBE_API = buildMqqSubscriberSubscribeApi(
  DOCUMENT_FRAME_WILL_APPEAR_EVENT
);
var DOCUMENT_FRAME_WILL_APPEAR_UNSUBSCRIBE_API = buildMqqSubscriberUnsubscribeApi(
  DOCUMENT_FRAME_WILL_APPEAR_EVENT
);
var DOCUMENT_FRAME_WILL_DISAPPEAR_SUBSCRIBE_API = buildMqqSubscriberSubscribeApi(
  DOCUMENT_FRAME_WILL_DISAPPEAR_EVENT
);
var DOCUMENT_FRAME_WILL_DISAPPEAR_UNSUBSCRIBE_API = buildMqqSubscriberUnsubscribeApi(
  DOCUMENT_FRAME_WILL_DISAPPEAR_EVENT
);
var DOCUMENT_FRAME_WILL_CLOSE_SUBSCRIBE_API = buildMqqSubscriberSubscribeApi(
  DOCUMENT_FRAME_WILL_CLOSE_EVENT
);
var DOCUMENT_FRAME_WILL_CLOSE_UNSUBSCRIBE_API = buildMqqSubscriberUnsubscribeApi(
  DOCUMENT_FRAME_WILL_CLOSE_EVENT
);
var DOCUMENT_FRAME_CLOSE_SUBSCRIBE_API = buildMqqSubscriberSubscribeApi(
  DOCUMENT_FRAME_CLOSE_EVENT
);
var DOCUMENT_FRAME_CLOSE_UNSUBSCRIBE_API = buildMqqSubscriberUnsubscribeApi(
  DOCUMENT_FRAME_CLOSE_EVENT
);
var DOCUMENT_FRAME_WILL_REMOVE_SUBSCRIBE_API = buildMqqSubscriberSubscribeApi(
  DOCUMENT_FRAME_WILL_REMOVE_EVENT
);
var DOCUMENT_FRAME_WILL_REMOVE_UNSUBSCRIBE_API = buildMqqSubscriberUnsubscribeApi(
  DOCUMENT_FRAME_WILL_REMOVE_EVENT
);
var DOCUMENT_FRAME_REMOVED_SUBSCRIBE_API = buildMqqSubscriberSubscribeApi(
  DOCUMENT_FRAME_REMOVED_EVENT
);
var DOCUMENT_FRAME_REMOVED_UNSUBSCRIBE_API = buildMqqSubscriberUnsubscribeApi(
  DOCUMENT_FRAME_REMOVED_EVENT
);
var TENCENT_DOCS_MQQ_API_PERMISSIONS = [
  // Guest 页统一埋点上报：与选区同档 C_LOCAL_EDIT，在线 docs.qq.com + 本地引擎均放行。
  { apiName: WORKBUDDY_REPORT_TELEMETRY_API, level: "C_LOCAL_EDIT" /* C_LOCAL_EDIT */ },
  { apiName: DOCX_ON_SELECTION_CHANGE_API, level: "C_LOCAL_EDIT" /* C_LOCAL_EDIT */ },
  { apiName: DOCX_ON_SELECTION_SEND_API, level: "C_LOCAL_EDIT" /* C_LOCAL_EDIT */ },
  { apiName: DOCX_ON_DOCUMENT_STATUS_CHANGED_API, level: "C_LOCAL_EDIT" /* C_LOCAL_EDIT */ },
  { apiName: DOCUMENT_FRAME_WILL_APPEAR_SUBSCRIBE_API, level: "C_LOCAL_EDIT" /* C_LOCAL_EDIT */ },
  { apiName: DOCUMENT_FRAME_WILL_APPEAR_UNSUBSCRIBE_API, level: "C_LOCAL_EDIT" /* C_LOCAL_EDIT */ },
  { apiName: DOCUMENT_FRAME_WILL_DISAPPEAR_SUBSCRIBE_API, level: "C_LOCAL_EDIT" /* C_LOCAL_EDIT */ },
  { apiName: DOCUMENT_FRAME_WILL_DISAPPEAR_UNSUBSCRIBE_API, level: "C_LOCAL_EDIT" /* C_LOCAL_EDIT */ },
  { apiName: DOCUMENT_FRAME_WILL_CLOSE_SUBSCRIBE_API, level: "C_LOCAL_EDIT" /* C_LOCAL_EDIT */ },
  { apiName: DOCUMENT_FRAME_WILL_CLOSE_UNSUBSCRIBE_API, level: "C_LOCAL_EDIT" /* C_LOCAL_EDIT */ },
  { apiName: DOCUMENT_FRAME_CLOSE_SUBSCRIBE_API, level: "C_LOCAL_EDIT" /* C_LOCAL_EDIT */ },
  { apiName: DOCUMENT_FRAME_CLOSE_UNSUBSCRIBE_API, level: "C_LOCAL_EDIT" /* C_LOCAL_EDIT */ },
  { apiName: DOCUMENT_FRAME_WILL_REMOVE_SUBSCRIBE_API, level: "C_LOCAL_EDIT" /* C_LOCAL_EDIT */ },
  { apiName: DOCUMENT_FRAME_WILL_REMOVE_UNSUBSCRIBE_API, level: "C_LOCAL_EDIT" /* C_LOCAL_EDIT */ },
  { apiName: DOCUMENT_FRAME_REMOVED_SUBSCRIBE_API, level: "C_LOCAL_EDIT" /* C_LOCAL_EDIT */ },
  { apiName: DOCUMENT_FRAME_REMOVED_UNSUBSCRIBE_API, level: "C_LOCAL_EDIT" /* C_LOCAL_EDIT */ }
];
var MQQ_API_NOT_IMPLEMENTED_MESSAGE = "mqq API is not implemented";
var MQQ_PERMISSION_DENIED_MESSAGE = "\u5F53\u524D\u9875\u9762\u65E0\u8BBF\u95EE\u6743\u9650";
function createUnhandledBridgeResponse(id) {
  return {
    id,
    errCode: -32601,
    ret: MQQ_API_NOT_IMPLEMENTED_MESSAGE,
    hasHandled: false
  };
}
var MQQ_INTERNAL_ERROR_CODE = -32603;
function toCallbackResult(response) {
  if (response.errCode !== 0 || !response.hasHandled) {
    return {
      code: response.errCode,
      err: typeof response.ret === "string" ? response.ret : MQQ_API_NOT_IMPLEMENTED_MESSAGE,
      hasHandled: response.hasHandled
    };
  }
  return {
    code: response.errCode,
    data: response.ret,
    hasHandled: response.hasHandled
  };
}
function toInternalErrorResult(error) {
  return {
    code: MQQ_INTERNAL_ERROR_CODE,
    err: error instanceof Error ? error.message : String(error),
    hasHandled: false
  };
}
function createPermissionDeniedResult() {
  return {
    code: MQQ_INTERNAL_ERROR_CODE,
    err: MQQ_PERMISSION_DENIED_MESSAGE,
    hasHandled: false
  };
}
function isPromiseLike(value) {
  return Boolean(value && typeof value === "object" && typeof value.then === "function");
}
function canAccessMqqLevel(pageUrl2, level, localEngineOrigin) {
  if (!pageUrl2) {
    return false;
  }
  switch (level) {
    case "C_DOCS" /* C_DOCS */:
      return isTencentDocsUrl(pageUrl2);
    case "C_LOCAL_EDIT" /* C_LOCAL_EDIT */:
      return isTencentDocsUrl(pageUrl2) || isLocalTencentDocsEnginePreviewUrl(pageUrl2) && isTencentDocsClipboardOrigin(pageUrl2, localEngineOrigin);
    default:
      return false;
  }
}
function buildApiPermissionMap(apiPermissions) {
  return new Map((apiPermissions ?? []).map((permission) => [permission.apiName, permission.level]));
}
function checkMqqApiPermission(apiName, pageUrl2, localEngineOrigin, apiPermissionMap, requireRegisteredApiPermission) {
  const level = apiPermissionMap.get(apiName);
  if (!level) {
    if (requireRegisteredApiPermission) {
      return false;
    }
    return true;
  }
  if (level === "C_LOCAL_EDIT" /* C_LOCAL_EDIT */ && pageUrl2 && isLocalTencentDocsEnginePreviewUrl(pageUrl2)) {
    return true;
  }
  if (!canAccessMqqLevel(pageUrl2, level, localEngineOrigin)) {
    return false;
  }
  return true;
}
function shouldExposeMqqProtocol(url) {
  return isTencentDocsUrl(url) || isLocalTencentDocsEnginePreviewUrl(url);
}
var MqqSubscriberImpl = class {
  constructor(name, subscriberId, invokeBridge, eventHandlers) {
    this.name = name;
    this.subscriberId = subscriberId;
    this.invokeBridge = invokeBridge;
    this.eventHandlers = eventHandlers;
  }
  callbackMap = /* @__PURE__ */ new Map();
  nextCallId = 0;
  subscribe(callback) {
    if (this.callbackMap.size === 0) {
      this.invokeBridge(buildMqqSubscriberSubscribeApi(this.name), [{ subscriberId: this.subscriberId }]);
    }
    this.nextCallId += 1;
    this.callbackMap.set(this.nextCallId, callback);
    const handlers = this.eventHandlers.get(this.name) ?? [];
    handlers.push(callback);
    this.eventHandlers.set(this.name, handlers);
    return this.nextCallId;
  }
  unsubscribe(callId) {
    const callback = this.callbackMap.get(callId);
    if (!callback || !this.callbackMap.delete(callId)) {
      return;
    }
    const handlers = this.eventHandlers.get(this.name);
    if (handlers) {
      const index = handlers.indexOf(callback);
      if (index >= 0) {
        handlers.splice(index, 1);
      }
      if (handlers.length === 0) {
        this.eventHandlers.delete(this.name);
      }
    }
    if (this.callbackMap.size === 0) {
      this.invokeBridge(buildMqqSubscriberUnsubscribeApi(this.name), [{ subscriberId: this.subscriberId }]);
    }
  }
};
function createMqqProtocol(options = {}) {
  const callbacks = /* @__PURE__ */ new Map();
  const subscriberCallbacks = /* @__PURE__ */ new Map();
  const invokeHandler = options.invokeHandler;
  const pageUrl2 = options.pageUrl;
  const localEngineOrigin = options.localEngineOrigin;
  const apiPermissionMap = buildApiPermissionMap(options.apiPermissions);
  const requireRegisteredApiPermission = options.requireRegisteredApiPermission === true;
  let nextRequestId = 0;
  let nextSubscriberId = 0;
  const runInvoke = (request, callback) => {
    const result = invokeHandler?.(request) ?? createUnhandledBridgeResponse(request.id);
    if (isPromiseLike(result)) {
      result.then((ret) => callback?.(toCallbackResult(ret))).catch((error) => callback?.(toInternalErrorResult(error)));
      return;
    }
    callback?.(toCallbackResult(result));
  };
  const invokeBridge = (apiName, args, callback) => {
    if (!checkMqqApiPermission(
      apiName,
      pageUrl2,
      localEngineOrigin,
      apiPermissionMap,
      requireRegisteredApiPermission
    )) {
      callback?.(createPermissionDeniedResult());
      return;
    }
    nextRequestId += 1;
    runInvoke({
      id: nextRequestId,
      apiName,
      args
    }, callback);
  };
  return {
    invoke(moduleName, methodName, args = {}, callback) {
      invokeBridge(`${moduleName}.${methodName}`, [args], callback);
    },
    addEventListener(eventName, handler) {
      const handlers = callbacks.get(eventName) ?? [];
      handlers.push(handler);
      callbacks.set(eventName, handlers);
      return true;
    },
    removeEventListener(eventName, handler) {
      const handlers = callbacks.get(eventName);
      if (!handlers) {
        return;
      }
      const index = handlers.indexOf(handler);
      if (index >= 0) {
        handlers.splice(index, 1);
      }
      if (handlers.length === 0) {
        callbacks.delete(eventName);
      }
    },
    async execEventCallback(eventName, ...args) {
      const handlers = [
        ...callbacks.get(eventName) ?? [],
        ...subscriberCallbacks.get(eventName) ?? []
      ];
      if (handlers.length === 0) {
        return void 0;
      }
      return Promise.all(handlers.slice().map((handler) => {
        try {
          return handler(...args);
        } catch (error) {
          return error instanceof Error ? error : new Error(String(error));
        }
      }));
    },
    createSubscribe(name) {
      nextSubscriberId += 1;
      return new MqqSubscriberImpl(name, nextSubscriberId, invokeBridge, subscriberCallbacks);
    }
  };
}

// src/tencent-docs/preload/webview-preload.ts
var import_electron2 = require("electron");

// src/preload/webview-drag-release-guard.ts
var WEBVIEW_DRAG_RELEASE_BRIDGE_DRAG_START_CHANNEL = "workbuddy:webview-drag-release-bridge:drag-start";
var WEBVIEW_DRAG_RELEASE_BRIDGE_DRAG_END_CHANNEL = "workbuddy:webview-drag-release-bridge:drag-end";
var WEBVIEW_DRAG_RELEASE_BRIDGE_HOST_RELEASE_CHANNEL = "workbuddy:webview-drag-release-bridge:host-release";
function installWebviewDragReleaseGuard(targetDocument = document, options = {}) {
  const targetWindow = targetDocument.defaultView;
  if (!targetWindow) {
    return () => void 0;
  }
  const ownerWindow = targetWindow;
  const state = {
    isPrimaryMouseDown: false,
    isPrimaryPointerDown: false,
    isDispatchingSyntheticRelease: false
  };
  const listenerOptions = { capture: true, passive: false };
  const removeHostReleaseListener = options.listenHostRelease?.((payload) => {
    releaseFromHost(payload);
  });
  const onMouseDown = (event) => {
    if (event.button !== 0) {
      return;
    }
    state.isPrimaryMouseDown = true;
    state.lastMouseDownTarget = readDispatchTarget(event.target, targetDocument);
    state.lastMouseEvent = event;
    options.notifyHostDragStart?.();
  };
  const onMouseUp = (event) => {
    if (event.button !== 0 || state.isDispatchingSyntheticRelease) {
      clearMouseState(state);
      options.notifyHostDragEnd?.();
      return;
    }
    const releaseTarget = state.lastMouseDownTarget;
    clearMouseState(state);
    dispatchMouseReleaseIfNeeded(releaseTarget, event, targetDocument, ownerWindow, state);
    options.notifyHostDragEnd?.();
  };
  const onPointerDown = (event) => {
    if (!event.isPrimary || event.button !== 0) {
      return;
    }
    state.isPrimaryPointerDown = true;
    state.primaryPointerId = event.pointerId;
    state.lastPointerDownTarget = readDispatchTarget(event.target, targetDocument);
    state.lastPointerEvent = event;
  };
  const onPointerUpOrCancel = (event) => {
    if (state.primaryPointerId !== void 0 && event.pointerId !== state.primaryPointerId) {
      return;
    }
    clearPointerState(state);
  };
  targetDocument.addEventListener("mousedown", onMouseDown, listenerOptions);
  targetDocument.addEventListener("mouseup", onMouseUp, listenerOptions);
  targetDocument.addEventListener("pointerdown", onPointerDown, listenerOptions);
  targetDocument.addEventListener("pointerup", onPointerUpOrCancel, listenerOptions);
  targetDocument.addEventListener("pointercancel", onPointerUpOrCancel, listenerOptions);
  return () => {
    removeHostReleaseListener?.();
    targetDocument.removeEventListener("mousedown", onMouseDown, listenerOptions);
    targetDocument.removeEventListener("mouseup", onMouseUp, listenerOptions);
    targetDocument.removeEventListener("pointerdown", onPointerDown, listenerOptions);
    targetDocument.removeEventListener("pointerup", onPointerUpOrCancel, listenerOptions);
    targetDocument.removeEventListener("pointercancel", onPointerUpOrCancel, listenerOptions);
  };
  function releaseFromHost(payload) {
    const mouseTarget = state.lastMouseDownTarget;
    const mouseEvent = state.lastMouseEvent;
    const pointerTarget = state.lastPointerDownTarget;
    const pointerEvent = state.lastPointerEvent;
    const shouldDispatchMouseRelease = state.isPrimaryMouseDown;
    const shouldDispatchPointerRelease = state.isPrimaryPointerDown;
    clearMouseState(state);
    clearPointerState(state);
    if (shouldDispatchPointerRelease) {
      dispatchPointerRelease(pointerTarget, pointerEvent, payload, targetDocument, ownerWindow);
    }
    if (shouldDispatchMouseRelease) {
      dispatchMouseRelease(mouseTarget, mouseEvent, payload, targetDocument, ownerWindow, state);
    }
    if (shouldDispatchMouseRelease || shouldDispatchPointerRelease) {
      options.notifyHostDragEnd?.();
    }
  }
}
function dispatchMouseReleaseIfNeeded(releaseTarget, event, ownerDocument, ownerWindow, state) {
  const dispatchTarget = readDispatchTarget(releaseTarget, ownerDocument);
  if (isSameOrInsideTarget(dispatchTarget, event.target, ownerWindow)) {
    return;
  }
  state.isDispatchingSyntheticRelease = true;
  try {
    dispatchTarget.dispatchEvent(new ownerWindow.MouseEvent("mouseup", buildMouseReleaseInitFromEvent(event)));
  } finally {
    state.isDispatchingSyntheticRelease = false;
  }
}
function dispatchMouseRelease(releaseTarget, fallbackEvent, payload, ownerDocument, ownerWindow, state) {
  const dispatchTarget = readDispatchTarget(releaseTarget, ownerDocument);
  state.isDispatchingSyntheticRelease = true;
  try {
    dispatchTarget.dispatchEvent(new ownerWindow.MouseEvent(
      "mouseup",
      buildMouseReleaseInit(payload, fallbackEvent)
    ));
  } finally {
    state.isDispatchingSyntheticRelease = false;
  }
}
function dispatchPointerRelease(releaseTarget, fallbackEvent, payload, ownerDocument, ownerWindow) {
  const dispatchTarget = readDispatchTarget(releaseTarget, ownerDocument);
  if (typeof ownerWindow.PointerEvent !== "function") {
    return;
  }
  dispatchTarget.dispatchEvent(new ownerWindow.PointerEvent(
    "pointerup",
    buildPointerReleaseInit(payload, fallbackEvent)
  ));
}
function readDispatchTarget(target, ownerDocument) {
  if (target && typeof target.dispatchEvent === "function") {
    return target;
  }
  return ownerDocument;
}
function isSameOrInsideTarget(releaseTarget, eventTarget, ownerWindow) {
  if (releaseTarget === eventTarget) {
    return true;
  }
  const releaseNode = releaseTarget instanceof ownerWindow.Node ? releaseTarget : void 0;
  const eventNode = eventTarget instanceof ownerWindow.Node ? eventTarget : void 0;
  return Boolean(releaseNode && eventNode && releaseNode.contains(eventNode));
}
function clearMouseState(state) {
  state.isPrimaryMouseDown = false;
  state.lastMouseDownTarget = void 0;
  state.lastMouseEvent = void 0;
}
function clearPointerState(state) {
  state.isPrimaryPointerDown = false;
  state.primaryPointerId = void 0;
  state.lastPointerDownTarget = void 0;
  state.lastPointerEvent = void 0;
}
function buildMouseReleaseInitFromEvent(event) {
  return buildMouseReleaseInit(void 0, event);
}
function buildMouseReleaseInit(payload, fallbackEvent) {
  return {
    bubbles: true,
    cancelable: true,
    composed: true,
    button: 0,
    buttons: 0,
    detail: fallbackEvent?.detail ?? 0,
    screenX: payload?.screenX ?? fallbackEvent?.screenX ?? 0,
    screenY: payload?.screenY ?? fallbackEvent?.screenY ?? 0,
    clientX: payload?.clientX ?? fallbackEvent?.clientX ?? 0,
    clientY: payload?.clientY ?? fallbackEvent?.clientY ?? 0,
    ctrlKey: payload?.ctrlKey ?? fallbackEvent?.ctrlKey ?? false,
    altKey: payload?.altKey ?? fallbackEvent?.altKey ?? false,
    shiftKey: payload?.shiftKey ?? fallbackEvent?.shiftKey ?? false,
    metaKey: payload?.metaKey ?? fallbackEvent?.metaKey ?? false
  };
}
function buildPointerReleaseInit(payload, fallbackEvent) {
  return {
    ...buildMouseReleaseInit(payload, fallbackEvent),
    pointerId: fallbackEvent?.pointerId ?? 1,
    width: fallbackEvent?.width ?? 1,
    height: fallbackEvent?.height ?? 1,
    pressure: 0,
    tangentialPressure: fallbackEvent?.tangentialPressure ?? 0,
    tiltX: fallbackEvent?.tiltX ?? 0,
    tiltY: fallbackEvent?.tiltY ?? 0,
    twist: fallbackEvent?.twist ?? 0,
    pointerType: fallbackEvent?.pointerType ?? "mouse",
    isPrimary: fallbackEvent?.isPrimary ?? true
  };
}

// src/tencent-docs/preload/install-guest-telemetry-bridge.ts
var import_electron = require("electron");
var requestSeq = 0;
function readWbSourceFromUrl(pageUrl2) {
  try {
    const value = new URL(pageUrl2).searchParams.get("wb_source");
    return value && value.trim().length > 0 ? value : void 0;
  } catch {
    return void 0;
  }
}
function installGuestTelemetryBridge(options) {
  const wbSourceFromUrl = readWbSourceFromUrl(options.pageUrl);
  try {
    import_electron.contextBridge.exposeInMainWorld("__workbuddyTelemetry", {
      report: (params) => {
        requestSeq += 1;
        options.ipcRenderer.invoke(WORKBUDDY_MQQ_BRIDGE_CHANNEL, {
          id: requestSeq,
          apiName: WORKBUDDY_REPORT_TELEMETRY_API,
          // pageURL / wb_source 缺省由 preload 从 URL 补；调用方显式传入时以其为准（后铺覆盖）。
          args: [{
            pageURL: options.pageUrl,
            ...wbSourceFromUrl ? { wb_source: wbSourceFromUrl } : {},
            ...params
          }],
          documentResourceUri: options.documentResourceUri,
          filePath: options.filePath
        }).catch((error) => {
          console.warn("[GuestTelemetry] report failed (non-fatal):", error);
        });
      }
    });
  } catch (error) {
    console.warn("[GuestTelemetry] expose __workbuddyTelemetry failed (non-fatal):", error);
  }
}

// src/tencent-docs/preload/webview-preload.ts
var pageUrl = window.location.href;
var localFilePath = readLocalFilePath(pageUrl);
var documentResourceUri = localFilePath ? toFileResourceUri(localFilePath) : void 0;
if (shouldExposeMqqProtocol(pageUrl)) {
  injectDocsFeatureList();
  if (isTencentDocsUrl(pageUrl)) {
    installWebviewDragReleaseGuard(document, {
      notifyHostDragStart: () => import_electron2.ipcRenderer.sendToHost(WEBVIEW_DRAG_RELEASE_BRIDGE_DRAG_START_CHANNEL),
      notifyHostDragEnd: () => import_electron2.ipcRenderer.sendToHost(WEBVIEW_DRAG_RELEASE_BRIDGE_DRAG_END_CHANNEL),
      listenHostRelease: (handler) => {
        const listener = (_event, payload) => {
          handler(typeof payload === "object" && payload !== null ? payload : void 0);
        };
        import_electron2.ipcRenderer.on(WEBVIEW_DRAG_RELEASE_BRIDGE_HOST_RELEASE_CHANNEL, listener);
        return () => {
          import_electron2.ipcRenderer.removeListener(WEBVIEW_DRAG_RELEASE_BRIDGE_HOST_RELEASE_CHANNEL, listener);
        };
      }
    });
  }
  import_electron2.contextBridge.exposeInMainWorld("mqq", createMqqProtocol({
    pageUrl,
    apiPermissions: TENCENT_DOCS_MQQ_API_PERMISSIONS,
    requireRegisteredApiPermission: true,
    invokeHandler: (request) => import_electron2.ipcRenderer.invoke(WORKBUDDY_MQQ_BRIDGE_CHANNEL, {
      ...request,
      documentResourceUri,
      filePath: localFilePath
    })
  }));
  installGuestTelemetryBridge({ pageUrl, documentResourceUri, filePath: localFilePath, ipcRenderer: import_electron2.ipcRenderer });
  document.addEventListener("click", (event) => {
    const target = event.target;
    const anchor = target?.closest?.("a");
    if (!anchor) {
      return;
    }
    const proto = (anchor.protocol || "").toLowerCase();
    if (anchor.hasAttribute("download") || proto === "blob:" || proto === "data:") {
      event.stopImmediatePropagation();
    }
  }, true);
  import_electron2.contextBridge.exposeInMainWorld(MAIN_WORLD_DOWNLOAD_TRIGGER_KEY, (url) => {
    if (typeof url !== "string" || !isTencentDocsDownloadHref(url)) {
      return false;
    }
    import_electron2.ipcRenderer.send(WORKBUDDY_TENCENT_DOCS_WEBVIEW_DOWNLOAD_CHANNEL, url);
    return true;
  });
}
function readLocalFilePath(url) {
  try {
    return new URL(url).searchParams.get("localFilePath") ?? void 0;
  } catch {
    return void 0;
  }
}
function injectDocsFeatureList() {
  let json;
  try {
    const resolved = import_electron2.ipcRenderer.sendSync(WORKBUDDY_DOCS_FEATURE_LIST_RESOLVE_CHANNEL);
    json = typeof resolved === "string" && resolved.length > 0 ? resolved : getDocsFeatureListString({ inConversation: false });
  } catch {
    json = getDocsFeatureListString({ inConversation: false });
  }
  import_electron2.webFrame.executeJavaScript(`window.__WB_DOCS_FEATURE_LIST__ = ${json};`).catch(() => {
  });
}
function toFileResourceUri(filePath) {
  const normalized = filePath.replace(/\\/g, "/");
  const withLeadingSlash = normalized.startsWith("/") ? normalized : `/${normalized}`;
  const encoded = withLeadingSlash.split("/").map(encodeFileUriSegment).join("/");
  return `file://${encoded}`;
}
function encodeFileUriSegment(segment) {
  return encodeURIComponent(segment).replace(/~/g, "%7E").replace(/%24/g, "$").replace(/%26/g, "&").replace(/%2B/g, "+").replace(/%2C/g, ",").replace(/%3A/g, ":").replace(/%3B/g, ";").replace(/%3D/g, "=").replace(/%40/g, "@");
}
