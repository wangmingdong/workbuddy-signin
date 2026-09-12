// MCP Apps webview preload — runs inside the sandboxed `<webview>` that
// hosts an MCP App's HTML resource. Bridges the app's `window.postMessage`
// JSON-RPC traffic to the host renderer via Electron's
// `ipcRenderer.sendToHost` / `ipc-message` pair.
//
// Plain CommonJS on purpose: loaded directly from a `file://` URL by
// `<webview preload="...">`, so it does NOT go through the renderer build.
//
// ============================================================================
// Why capture-phase + `stopImmediatePropagation` on the message listener
// ============================================================================
//
// In a normal browser iframe, `window.parent !== window`, so the MCP Apps
// SDK's `PostMessageTransport.send` (which calls
// `window.parent.postMessage(msg, "*")`) targets the parent window and
// never comes back locally. Inside an Electron `<webview>` there is no
// real parent: `window.parent === window`. A naïve preload that just
// listened on `message` would see every outbound SDK request come back
// through its own transport listener, which would treat it as an INCOMING
// request. The SDK has no handler for host-owned methods like
// `ui/initialize` or `tools/call`, so it replies with JSON-RPC `-32601
// Method not found`. That error is also self-posted, correlates with the
// pending outbound request, and rejects `app.connect()` / `callServerTool`
// BEFORE the host's real response arrives.
//
// Monkey-patching `window.postMessage` is unreliable: in some Chromium
// configurations the property descriptor is non-writable and assignment
// silently no-ops. We therefore intercept at the DOM event layer:
//
//   1. Register a CAPTURE-phase `message` listener. Capture listeners
//      always fire before any bubble-phase listener on the same target,
//      and in registration order. Since this preload runs before any
//      guest-page script, our capture listener is guaranteed to fire
//      first.
//   2. For app-originated JSON-RPC payloads we forward to the host and
//      call `stopImmediatePropagation()`, which prevents every remaining
//      listener — including the SDK's bubble-phase transport listener —
//      from seeing the event. The self-loop is physically broken.
//   3. For host-originated payloads (dispatched below from
//      `ipcRenderer.on`) we let the event proceed so the SDK's transport
//      listener can consume it normally. We disambiguate the two by
//      stashing host-originated payloads in a `WeakSet` right before
//      dispatch.
//
// Security posture:
// - Only `jsonrpc: "2.0"` payloads are treated as MCP traffic. Any other
//   `window.postMessage` use (analytics iframes, dev tooling, …) passes
//   through unchanged.
// - The webview is sandboxed via host-side `webpreferences`
//   (`nodeIntegration=no,sandbox=no,contextIsolation=no`), so only this
//   preload has `require` / `ipcRenderer` access; the guest page does not.

'use strict';

try {
    const { contextBridge, ipcRenderer } = require('electron');

    /**
     * Payloads the preload just dispatched from the host side; the
     * capture-phase listener lets these through to the SDK's transport
     * listener instead of bouncing them back to the host.
     */
    const hostOriginated = new WeakSet();
    const pendingTestRequests = new Map();
    let nextTestRequestId = 1;

    function summarize(data) {
        if (!data || typeof data !== 'object') {
            return { kind: typeof data };
        }
        return {
            id: data.id,
            method: data.method,
            hasResult: data.result !== undefined,
            hasError: data.error !== undefined,
        };
    }

    function createRpcError(error) {
        if (!error || typeof error !== 'object') {
            return new Error('Unknown MCP host error');
        }
        const message = typeof error.message === 'string' ? error.message : 'Unknown MCP host error';
        const wrapped = new Error(message);
        wrapped.code = error.code;
        wrapped.data = error.data;
        return wrapped;
    }

    function isTestApiResponse(data) {
        return !!data
            && typeof data === 'object'
            && data.jsonrpc === '2.0'
            && typeof data.id === 'string'
            && data.id.startsWith('__mcpHostTestApi__')
            && (data.result !== undefined || data.error !== undefined);
    }

    function settlePendingTestRequest(data) {
        if (!data || typeof data !== 'object' || data.id === undefined || data.id === null) {
            return false;
        }
        if (data.result === undefined && data.error === undefined) {
            return false;
        }
        const key = String(data.id);
        const pending = pendingTestRequests.get(key);
        if (!pending) {
            return false;
        }
        pendingTestRequests.delete(key);
        clearTimeout(pending.timeoutId);
        if (data.error !== undefined) {
            pending.reject(createRpcError(data.error));
        } else {
            pending.resolve(data.result);
        }
        return true;
    }

    window.addEventListener(
        'message',
        event => {
            const data = event && event.data;
            if (!data || typeof data !== 'object' || data.jsonrpc !== '2.0') {
                return;
            }

            if (isTestApiResponse(data)) {
                settlePendingTestRequest(data);
                event.stopImmediatePropagation();
                return;
            }

            if (hostOriginated.has(data)) {
                // host -> app dispatch; let the SDK transport consume it.
                hostOriginated.delete(data);
                // eslint-disable-next-line no-console
                console.info('[mcp-app-preload] host->app', summarize(data));
                return;
            }

            // app -> host: forward to host, then prevent the SDK's own
            // bubble-phase transport listener from re-processing this
            // event as if it were incoming.
            // eslint-disable-next-line no-console
            console.info('[mcp-app-preload] app->host', summarize(data));
            try {
                ipcRenderer.sendToHost('mcp-app-client-message', data);
            } catch (err) {
                // eslint-disable-next-line no-console
                console.error('[mcp-app-preload] sendToHost failed:', err);
            }
            event.stopImmediatePropagation();
        },
        { capture: true },
    );

    // Test helper: resolve/reject promises created by
    // `window.__mcpHostTestApi.getToken()` when host replies to the
    // forwarded JSON-RPC request.
    window.addEventListener('message', event => {
        const data = event && event.data;
        if (!data || typeof data !== 'object' || data.jsonrpc !== '2.0') {
            return;
        }
        settlePendingTestRequest(data);
    });

    function requestHost(method, params) {
        return new Promise((resolve, reject) => {
            const id = `__mcpHostTestApi__${nextTestRequestId++}`;
            const timeoutId = setTimeout(() => {
                pendingTestRequests.delete(id);
                reject(new Error(`[mcp-app-preload] ${method} timed out`));
            }, 30000);

            pendingTestRequests.set(id, { resolve, reject, timeoutId });

            try {
                // Use the same JSON-RPC app -> host protocol as normal MCP Apps
                // traffic, but send directly through the preload bridge. This
                // keeps the helper independent from the page world's
                // postMessage / SDK listeners while still exercising
                // McpAppsBridge's `host/getToken` handler.
                ipcRenderer.sendToHost('mcp-app-client-message', {
                    jsonrpc: '2.0',
                    id,
                    method,
                    params: params || {},
                });
            } catch (err) {
                pendingTestRequests.delete(id);
                clearTimeout(timeoutId);
                reject(err);
            }
        });
    }

    const testApi = {
        getToken() {
            return requestHost('host/getToken', {});
        },
        getWBCurrentSessionId() {
            return requestHost('host/getWBCurrentSessionId', {});
        },
        // Ardot MCP App 在画布加载完成后回调宿主，传入 fileId / fileName。
        // 宿主据此把 Ardot 文档登记为正式 artifact（custom-artifact + customType
        // 'ardor/canvas'），不会触发任何 DetailPanel UI 副作用。
        // 协议沿用 host/getToken 同一通道（requestHost），不引入新 ipc channel。
        onArdotReady(payload) {
            return requestHost('host/onArdotReady', payload || {});
        },
    };

    try {
        if (contextBridge && typeof contextBridge.exposeInMainWorld === 'function') {
            contextBridge.exposeInMainWorld('__mcpHostTestApi', testApi);
        } else {
            Object.defineProperty(window, '__mcpHostTestApi', {
                configurable: true,
                enumerable: false,
                value: testApi,
                writable: false,
            });
        }
    } catch (err) {
        // Fall back for contextIsolation=false or unexpected bridge failures.
        Object.defineProperty(window, '__mcpHostTestApi', {
            configurable: true,
            enumerable: false,
            value: testApi,
            writable: false,
        });
    }

    ipcRenderer.on('mcp-app-host-message', (_event, message) => {
        try {
            if (isTestApiResponse(message)) {
                settlePendingTestRequest(message);
                return;
            }
            if (message && typeof message === 'object') {
                hostOriginated.add(message);
            }
            // `source: window` mirrors what `window.parent.postMessage`
            // would produce in a real iframe: the SDK's transport
            // compares `event.source` against its `eventSource`, which is
            // `window.parent` — i.e. `window` inside a webview.
            const ev = new MessageEvent('message', {
                data: message,
                origin: window.location.origin,
                source: window,
            });
            window.dispatchEvent(ev);
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error('[mcp-app-preload] dispatch failed:', err);
        }
    });
} catch (err) {
    // eslint-disable-next-line no-console
    console.error('[mcp-app-preload] initialization failed:', err);
}
