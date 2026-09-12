// Client-menu (custom 菜单) webview preload —— 运行在
// `<webview partition="client-menu-webview">` 内，承载运营平台下发的自建菜单页。
//
// 为什么需要这个 preload（issue #40861）：
//
//   自建菜单页通过 wb SDK 向宿主请求登录态（`wb:getToken` / `wb:getUserInfo`），
//   SDK 的实现是 `window.parent.postMessage(request)` + 监听 `window` 的
//   `message` 事件拿响应。
//
//   在 Web 端，菜单页是 DOM `<iframe>`，`window.parent` 就是宿主 renderer 的
//   window，宿主 `window.addEventListener('message')` 能直接收到请求并回投响应。
//
//   但在 Desktop 端，菜单页跑在 Electron `<webview>` 里 —— 这是一个**独立的
//   webContents**，它的 `window` 与宿主 renderer 的 `window` 完全隔离。
//   guest 页的 `window.postMessage` **不会**冒泡到宿主 window，所以宿主侧
//   `window.addEventListener('message')`（见 webview-menu-host 旧实现）永远收不到
//   `wb:getToken`，桌面自建菜单的鉴权通道就此失效。
//
//   唯一可靠的桥接方式：在 guest 内部挂这个 preload，用 `ipcRenderer.sendToHost`
//   把 wb: 请求抛回宿主 renderer（宿主侧 `webview.addEventListener('ipc-message')`
//   接收），宿主处理完再通过 `webview.send('client-menu:wb-response', ...)` 把响应
//   投回来，preload 收到后用 `window.postMessage` 重新派发到 guest window，触发
//   guest SDK 的响应监听。
//
// 通信链路：
//
//   guest 页  --window.postMessage(wb:getToken)-->  preload(本文件, isolated world)
//   preload   --ipcRenderer.sendToHost('client-menu:wb-request')-->  宿主 renderer
//   宿主       --webview.send('client-menu:wb-response')-->  preload
//   preload   --window.postMessage(wb:getToken:response)-->  guest 页 SDK
//
// 注意：
//   - 在 webview 顶层 frame 中 `window.parent === window`，所以 SDK 的
//     `window.parent.postMessage` 与 `window.postMessage` 都落在本 window 上，
//     preload 的 `window` message 监听都能捕获。
//   - 只转发「请求」（wb:* 且非 *:response），避免把宿主回投的响应又当请求转回去
//     造成死循环。
//
// Plain CommonJS on purpose：本文件以 file:// URL 通过 `<webview preload>` 加载，
// 不经过 renderer 构建管线。

'use strict';

try {
    const { ipcRenderer } = require('electron');

    // ── guest → host：转发 wb:* 请求 ───────────────────────────────────
    window.addEventListener('message', event => {
        try {
            const data = event && event.data;
            if (!data || typeof data !== 'object') { return; }
            if (typeof data.type !== 'string') { return; }
            if (!data.type.startsWith('wb:')) { return; }
            // 宿主回投的响应（wb:xxx:response）不再回传，避免死循环
            if (data.type.endsWith(':response')) { return; }
            if (!data.requestId) { return; }

            ipcRenderer.sendToHost('client-menu:wb-request', {
                type: data.type,
                requestId: data.requestId,
            });
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error('[client-menu-preload] request bridge error:', err);
        }
    });

    // ── host → guest：把宿主处理结果重新派发到 guest window ─────────────
    ipcRenderer.on('client-menu:wb-response', (_event, payload) => {
        try {
            if (!payload || typeof payload !== 'object') { return; }
            // payload 形如 { type: 'wb:getToken:response', requestId, code, message, data }
            window.postMessage(payload, '*');
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error('[client-menu-preload] response bridge error:', err);
        }
    });

    // eslint-disable-next-line no-console
    console.info('[client-menu-preload] loaded');
} catch (err) {
    // eslint-disable-next-line no-console
    console.error('[client-menu-preload] initialization failed:', err);
}
