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

// ../../packages/workbuddy-server/src/docs-shared/url-guards.ts
var import_document_types = __toESM(require_document_types());

// ../../packages/workbuddy-server/src/tencent-docs/webview-download.ts
var WORKBUDDY_TENCENT_DOCS_WEBVIEW_DOWNLOAD_CHANNEL = "workbuddy:tencentDocs:webviewDownload";
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
function isTencentDocsHostname(hostname) {
  const host = hostname.toLowerCase();
  if (host === "docs.qq.com" || host.endsWith(".docs.qq.com")) {
    return true;
  }
  const idx = host.indexOf("-docs.");
  if (idx > 0) {
    const tail = host.slice(idx + "-docs.".length);
    return Boolean(tail && !tail.startsWith(".") && !tail.endsWith("."));
  }
  return false;
}
function isInPlaceCreateFileUrl(url) {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return false;
    }
    return isTencentDocsHostname(parsed.hostname) && parsed.pathname.startsWith("/api/create/file");
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

// src/tencent-docs/preload/tdoc-preview-preload.ts
var import_electron3 = require("electron");

// ../../packages/workbuddy-server/src/docs-shared/feature-list.ts
function getFeatureValue(options) {
  const inConversation = Boolean(options?.inConversation);
  const aiEditEnabled = options?.aiEditEnabled !== false;
  return { aiEdit: inConversation && aiEditEnabled };
}
function getDocsFeatureListString(options) {
  return JSON.stringify(getFeatureValue(options));
}

// ../../packages/workbuddy-server/src/docs-shared/mqq/bridge.ts
var WORKBUDDY_MQQ_BRIDGE_CHANNEL = "workbuddy:mqqBridge";

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

// src/tencent-docs/preload/tdoc-preview-mqq.ts
var import_electron2 = require("electron");

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

// src/tencent-docs/preload/tdoc-preview-mqq.ts
var pageUrl = window.location.href;
if (shouldExposeMqqProtocol(pageUrl)) {
  try {
    import_electron2.contextBridge.exposeInMainWorld("mqq", createMqqProtocol({
      pageUrl,
      apiPermissions: TENCENT_DOCS_MQQ_API_PERMISSIONS,
      requireRegisteredApiPermission: true,
      invokeHandler: (request) => import_electron2.ipcRenderer.invoke(WORKBUDDY_MQQ_BRIDGE_CHANNEL, {
        ...request,
        documentResourceUri: void 0,
        filePath: void 0
      })
    }));
    installGuestTelemetryBridge({ pageUrl, ipcRenderer: import_electron2.ipcRenderer });
    console.info("[tdoc-preview-preload] mqq protocol exposed", { pageUrl: pageUrl.slice(0, 120) });
  } catch (mqqError) {
    console.warn("[tdoc-preview-preload] expose mqq protocol failed (non-fatal):", mqqError);
  }
}

// src/tencent-docs/preload/tdoc-preview-preload.ts
var WORKBUDDY_DOCS_FEATURE_LIST_RESOLVE_CHANNEL = "workbuddy:tencentDocs:resolveFeatureList";
try {
  let isExternalNavigation = function(rawHref) {
    if (!rawHref || typeof rawHref !== "string") {
      return false;
    }
    const trimmed = rawHref.trim();
    if (trimmed.length === 0) {
      return false;
    }
    if (trimmed.startsWith("#")) {
      return false;
    }
    let parsed;
    try {
      parsed = new URL(trimmed, location.href);
    } catch {
      return false;
    }
    return parsed.protocol === "https:";
  }, redactUrlForLog = function(rawUrl) {
    try {
      return new URL(rawUrl, location.href).origin;
    } catch {
      return "<unparsable-url>";
    }
  }, reportExternal = function(url, reason) {
    if (isTencentDocsDownloadHref(url)) {
      try {
        console.info(
          `[tdoc-preview-preload] download captured frame=${frameTag} reason=${reason} url=${redactUrlForLog(url)}`
        );
        import_electron3.ipcRenderer.send(WORKBUDDY_TENCENT_DOCS_WEBVIEW_DOWNLOAD_CHANNEL, url);
      } catch (err) {
        console.error("[tdoc-preview-preload] download IPC send failed:", err);
      }
      return;
    }
    const inPlace = isInPlaceCreateFileUrl(url);
    const channel = inPlace ? "tdoc-preview:navigate-in-place" : "tdoc-preview:open-external";
    try {
      console.info(
        `[tdoc-preview-preload] link captured frame=${frameTag} reason=${reason} channel=${channel} url=${redactUrlForLog(url)}`
      );
      import_electron3.ipcRenderer.sendToHost(channel, { url, reason, frame: frameTag });
    } catch (err) {
      console.error("[tdoc-preview-preload] sendToHost failed:", err);
    }
  }, handleClickLike = function(eventType) {
    return (event) => {
      try {
        if (event.button !== 0 && event.button !== 1) {
          return;
        }
        let anchor = null;
        const path = typeof event.composedPath === "function" ? event.composedPath() : [];
        for (const node of path) {
          const el = node;
          if (el && el.nodeType === 1 && el.tagName === "A") {
            anchor = el;
            break;
          }
        }
        if (!anchor) {
          let cur = event.target;
          while (cur && cur.nodeType === 1) {
            if (cur.tagName === "A") {
              anchor = cur;
              break;
            }
            cur = cur.parentNode;
          }
        }
        if (!anchor) {
          return;
        }
        const rawHref = anchor.getAttribute("href") || anchor.href || "";
        if (!isExternalNavigation(rawHref)) {
          return;
        }
        let absoluteUrl;
        try {
          absoluteUrl = new URL(rawHref, location.href).toString();
        } catch {
          absoluteUrl = rawHref;
        }
        event.preventDefault();
        if (typeof event.stopImmediatePropagation === "function") {
          event.stopImmediatePropagation();
        } else {
          event.stopPropagation();
        }
        reportExternal(absoluteUrl, eventType);
      } catch (err) {
        console.error("[tdoc-preview-preload] click handler error:", err);
      }
    };
  }, shouldTreatHistoryUrlAsExternal = function(rawUrl) {
    if (!rawUrl || typeof rawUrl !== "string") {
      return null;
    }
    let target;
    try {
      target = new URL(rawUrl, location.href);
    } catch {
      return null;
    }
    if (target.protocol !== "http:" && target.protocol !== "https:") {
      return null;
    }
    if (target.origin !== location.origin) {
      return target.toString();
    }
    return null;
  }, patchHistoryMethod = function(methodName) {
    try {
      const original = history[methodName];
      if (typeof original !== "function") {
        return;
      }
      history[methodName] = function patchedHistoryMethod(...args) {
        const url = args[2];
        try {
          const externalUrl = shouldTreatHistoryUrlAsExternal(url);
          if (externalUrl) {
            reportExternal(externalUrl, `history.${methodName}`);
            return void 0;
          }
        } catch (err) {
          console.error(`[tdoc-preview-preload] patched history.${methodName} error:`, err);
        }
        return original.apply(this, args);
      };
    } catch (err) {
      console.warn(`[tdoc-preview-preload] patch history.${methodName} failed (non-fatal):`, err);
    }
  };
  const frameTag = (() => {
    try {
      return `${window.top === window ? "main" : "sub"}@${location.href.slice(0, 120)}`;
    } catch {
      return "unknown-frame";
    }
  })();
  let featureListJson;
  try {
    const resolved = import_electron3.ipcRenderer.sendSync(WORKBUDDY_DOCS_FEATURE_LIST_RESOLVE_CHANNEL);
    featureListJson = typeof resolved === "string" && resolved.length > 0 ? resolved : getDocsFeatureListString({ inConversation: false });
  } catch {
    featureListJson = getDocsFeatureListString({ inConversation: false });
  }
  try {
    import_electron3.webFrame.executeJavaScript(`window.__WB_DOCS_FEATURE_LIST__ = ${featureListJson};`).catch(() => {
    });
  } catch (featureListError) {
    console.warn("[tdoc-preview-preload] inject feature list failed:", featureListError);
  }
  document.addEventListener("click", handleClickLike("click"), { capture: true });
  document.addEventListener("auxclick", handleClickLike("auxclick"), { capture: true });
  try {
    const BRIDGE_TYPE = "tdoc-preview-bridge:external";
    window.addEventListener("message", (e) => {
      try {
        if (!e || !e.data) {
          return;
        }
        if (e.data.__type !== BRIDGE_TYPE) {
          return;
        }
        const url = e.data.url;
        const reason = e.data.reason;
        if (typeof url === "string" && url.length > 0) {
          reportExternal(url, typeof reason === "string" && reason ? reason : "main-world");
        }
      } catch (err) {
        console.error("[tdoc-preview-preload] bridge message handler error:", err);
      }
    });
    const mainWorldPatch = `
        (function () {
            'use strict';
            if (window.__tdocPreviewMainWorldPatched__) { return; }
            window.__tdocPreviewMainWorldPatched__ = true;

            var BRIDGE_TYPE = ${JSON.stringify(BRIDGE_TYPE)};

            // \u534F\u8BAE\u6536\u7A84\u5230 https-only\uFF0C\u4E0E\u5BBF\u4E3B shell.openExternal \u95F8\u95E8 + isolated world
            // isExternalNavigation \u4FDD\u6301\u4E00\u81F4\uFF08http: \u629B\u7ED9\u5BBF\u4E3B\u4F1A\u88AB\u9759\u9ED8\u4E22\u5F03\uFF09\u3002
            function isExternal(rawHref) {
                if (!rawHref || typeof rawHref !== 'string') { return false; }
                var trimmed = rawHref.trim();
                if (trimmed.length === 0) { return false; }
                if (trimmed.charAt(0) === '#') { return false; }
                var parsed;
                try { parsed = new URL(trimmed, location.href); }
                catch (e) { return false; }
                return parsed.protocol === 'https:';
            }

            // \u65E5\u5FD7\u8131\u654F\uFF1A\u53EA\u7559 origin\uFF0C\u4E22\u5F03\u53EF\u80FD\u542B share token / file id \u7684 path/query/hash\u3002
            function redactForLog(rawUrl) {
                try { return new URL(rawUrl, location.href).origin; }
                catch (e) { return '<unparsable-url>'; }
            }

            function postExternal(rawHref, reason) {
                var absolute;
                try { absolute = new URL(rawHref, location.href).toString(); }
                catch (e) { absolute = rawHref; }
                try {
                    window.postMessage({ __type: BRIDGE_TYPE, url: absolute, reason: reason }, '*');
                } catch (e) { /* ignore */ }
                try {
                    console.info('[tdoc-preview-preload][main-world] external captured reason=' + reason + ' url=' + redactForLog(absolute));
                } catch (e) { /* ignore */ }
            }

            // \u2500\u2500 HTMLAnchorElement.prototype.click \u52AB\u6301 \u2500\u2500
            try {
                var anchorProto = HTMLAnchorElement.prototype;
                var originalAnchorClick = anchorProto.click;
                anchorProto.click = function patchedAnchorClick() {
                    try {
                        var rawHref = this.getAttribute('href') || this.href || '';
                        if (isExternal(rawHref)) {
                            postExternal(rawHref, 'anchor.click');
                            return;
                        }
                    } catch (e) { /* ignore */ }
                    return originalAnchorClick.apply(this, arguments);
                };
            } catch (e) { /* ignore */ }

            // \u2500\u2500 EventTarget.prototype.dispatchEvent \u52AB\u6301 \u2500\u2500
            try {
                var originalDispatchEvent = EventTarget.prototype.dispatchEvent;
                EventTarget.prototype.dispatchEvent = function patchedDispatchEvent(event) {
                    try {
                        if (
                            event
                            && event.type === 'click'
                            && (typeof event.button !== 'number' || event.button === 0 || event.button === 1)
                        ) {
                            var anchor = null;
                            if (this instanceof HTMLAnchorElement) {
                                anchor = this;
                            } else if (typeof event.composedPath === 'function') {
                                var path = event.composedPath();
                                for (var i = 0; i < path.length; i++) {
                                    var n = path[i];
                                    if (n && n.nodeType === 1 && n.tagName === 'A') { anchor = n; break; }
                                }
                            }
                            if (anchor) {
                                var rawHref = anchor.getAttribute('href') || anchor.href || '';
                                if (isExternal(rawHref)) {
                                    postExternal(rawHref, 'anchor.dispatchEvent');
                                    return true;
                                }
                            }
                        }
                    } catch (e) { /* ignore */ }
                    return originalDispatchEvent.apply(this, arguments);
                };
            } catch (e) { /* ignore */ }

            // \u2500\u2500 window.open \u52AB\u6301\uFF08main world \u526F\u672C\uFF09\uFF1A\u540C origin \u653E\u884C\u539F\u751F window.open
            // \uFF08\u4E3B\u8FDB\u7A0B setWindowOpenHandler \u5206\u6D41\uFF09\uFF0C\u8DE8 origin \u5916\u94FE\u624D postExternal \u4E0A\u62A5\u3002\u2500\u2500
            try {
                var originalOpen = window.open;
                window.open = function patchedOpen(rawUrl /*, target, features */) {
                    try {
                        if (typeof rawUrl === 'string' && isExternal(rawUrl)) {
                            var parsed;
                            try { parsed = new URL(rawUrl, location.href); } catch (e) { parsed = null; }
                            if (parsed && parsed.origin === location.origin) {
                                return originalOpen.apply(this, arguments);
                            }
                            postExternal(rawUrl, 'window.open');
                            return null;
                        }
                    } catch (e) { /* ignore */ }
                    return originalOpen.apply(this, arguments);
                };
            } catch (e) { /* ignore */ }
        })();
        `;
    const tryInjectVia = (label, makeScriptSrc) => {
      try {
        const script = document.createElement("script");
        script.onload = () => {
          try {
            if (script.parentNode) {
              script.parentNode.removeChild(script);
            }
          } catch {
          }
        };
        script.onerror = (e) => {
          console.error(`[tdoc-preview-preload] main-world script onerror via ${label}`, e);
        };
        script.src = makeScriptSrc();
        (document.head || document.documentElement).appendChild(script);
        return true;
      } catch (err) {
        console.error(`[tdoc-preview-preload] inject via ${label} threw:`, err);
        return false;
      }
    };
    const inject = () => {
      const tryBlob = () => {
        try {
          if (typeof Blob !== "function" || typeof URL === "undefined" || typeof URL.createObjectURL !== "function") {
            return false;
          }
          const blob = new Blob([mainWorldPatch], { type: "application/javascript" });
          const url = URL.createObjectURL(blob);
          return tryInjectVia("blob", () => url);
        } catch (err) {
          console.warn("[tdoc-preview-preload] blob inject failed:", err);
          return false;
        }
      };
      const tryDataUrl = () => {
        try {
          const url = `data:application/javascript;base64,${btoa(mainWorldPatch)}`;
          return tryInjectVia("data", () => url);
        } catch (err) {
          console.warn("[tdoc-preview-preload] data inject failed:", err);
          return false;
        }
      };
      const tryInline = () => {
        try {
          const script = document.createElement("script");
          script.textContent = mainWorldPatch;
          (document.head || document.documentElement).appendChild(script);
          if (script.parentNode) {
            script.parentNode.removeChild(script);
          }
          return true;
        } catch (err) {
          console.error("[tdoc-preview-preload] inline inject threw:", err);
          return false;
        }
      };
      if (!tryBlob() && !tryDataUrl()) {
        tryInline();
      }
    };
    if (document.documentElement) {
      inject();
    } else {
      document.addEventListener("readystatechange", inject, { once: true });
    }
  } catch (err) {
    console.warn("[tdoc-preview-preload] main-world bridge install failed (non-fatal):", err);
  }
  try {
    const originalOpen = window.open.bind(window);
    window.open = function patchedOpen(...args) {
      const rawUrl = args[0];
      try {
        if (typeof rawUrl === "string" && isExternalNavigation(rawUrl)) {
          let absoluteUrl;
          try {
            absoluteUrl = new URL(rawUrl, location.href).toString();
          } catch {
            absoluteUrl = rawUrl;
          }
          reportExternal(absoluteUrl, "window.open");
          return null;
        }
      } catch (err) {
        console.error("[tdoc-preview-preload] patched window.open error:", err);
      }
      return originalOpen.apply(this, args);
    };
  } catch (err) {
    console.warn("[tdoc-preview-preload] patch window.open failed (non-fatal):", err);
  }
  patchHistoryMethod("replaceState");
  patchHistoryMethod("pushState");
} catch (err) {
  console.error("[tdoc-preview-preload] initialization failed:", err);
}
