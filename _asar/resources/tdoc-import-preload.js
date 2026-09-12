// Tencent Docs (Personal) import webview preload — 加载在 partition=
// "persist:tdoc-import" 的 <webview> 里（src=docs.qq.com/desktop?type=selector）。
//
// 干两件事：
//   A. picker 消息转发：监听 message 事件 → ipcRenderer.sendToHost。
//   B. 外链拦截：把白名单外的 http(s) 链接抛给宿主走系统浏览器。
//
// 关键约束：腾讯文档 SPA 走 detached anchor + click() 跳转，事件不冒泡到
// document；contextIsolation 下 isolated world 改 prototype 也碰不到 main
// world，所以必须用 <script> 注入 main-world patch 劫持
// HTMLAnchorElement.prototype.click / EventTarget.prototype.dispatchEvent /
// window.open / history.{push,replace}State，命中外链时用 postMessage 桥
// 回 isolated world 再 sendToHost。
//
// Plain CommonJS：通过 <webview preload> 直接以 file:// 加载，不走构建管线。

'use strict';

try {
    const { ipcRenderer } = require('electron');

    // 标识当前 frame，方便宿主排查日志来源。
    const frameTag = (() => {
        try {
            return `${(window.top === window) ? 'main' : 'sub'}@${location.href.slice(0, 120)}`;
        } catch {
            return 'unknown-frame';
        }
    })();

    // eslint-disable-next-line no-console
    console.info(`[tdoc-import-preload] loaded in frame: ${frameTag}`);

    // ── 1. message 监听（picker 选中转发） ─────────────────────────────
    // capture: true 但不 stopPropagation，guest 自身逻辑正常运行。
    // nodeIntegrationInSubFrames=yes 时所有 frame 都跑这段。
    window.addEventListener(
        'message',
        event => {
            try {
                const origin = (event && event.origin) || '';
                let preview = '';
                try {
                    preview = typeof event.data === 'string'
                        ? event.data.slice(0, 200)
                        : JSON.stringify(event.data).slice(0, 200);
                } catch {
                    preview = '<unstringifiable>';
                }
                // 跳过我们自己注入的 main-world bridge 消息（在下方处理）。
                if (event && event.data && event.data.__type === 'tdoc-import-bridge:external') {
                    return;
                }
                // eslint-disable-next-line no-console
                console.info(
                    `[tdoc-import-preload] message captured frame=${frameTag} origin=${origin} preview=${preview}`,
                );

                ipcRenderer.sendToHost('tdoc-import:picked', {
                    origin,
                    frame: frameTag,
                    data: event.data,
                });
            } catch (err) {
                // eslint-disable-next-line no-console
                console.error('[tdoc-import-preload] forward failed:', err);
            }
        },
        { capture: true },
    );

    // ── 2. 外链判定（白名单留 webview / 其它一律外抛） ───────────────
    //
    // 白名单：登录链路 + 文档主功能（docs.qq.com / *.ptlogin2 / *.captcha /
    // accounts/graph/*.weixin/*.wx 系列）；其它一律外抛。docs.qq.com 内的
    // /policy /about /agreement /privacy /help /feedback /doc 路径虽同源
    // 也外抛。锚点 (#) 与非 http(s) 协议放行。
    //
    // ⚠️ 与下列三处必须严格对齐（白名单 host / 路径例外）：
    //   - window-manager.ts::isTdocImportInternalNavigation
    //   - window-manager.ts 内 subFrameInjection 字符串
    //   - 本文件第 5 节 main-world patch 内的 isExternal
    var DOCS_QQ_EXTERNAL_PATH_PREFIXES = ['/policy', '/about', '/agreement', '/privacy', '/help', '/feedback', '/doc'];

    // *.ptlogin2.qq.com 中需外抛的路径（QQ 注册新账号入口）
    var PTLOGIN2_EXTERNAL_PATH_PREFIXES = ['/j_newreg_url'];

    function isDocsQqExternalPath(pathname) {
        var lower = (pathname || '').toLowerCase();
        // docs.qq.com 根路径（"" 或 "/"）→ 视为外链
        if (lower === '' || lower === '/') { return true; }
        for (var i = 0; i < DOCS_QQ_EXTERNAL_PATH_PREFIXES.length; i++) {
            var p = DOCS_QQ_EXTERNAL_PATH_PREFIXES[i];
            if (lower === p || lower.indexOf(p + '/') === 0 || lower.indexOf(p + '.') === 0) {
                return true;
            }
        }
        return false;
    }

    function isPtlogin2ExternalPath(pathname) {
        var lower = (pathname || '').toLowerCase();
        for (var i = 0; i < PTLOGIN2_EXTERNAL_PATH_PREFIXES.length; i++) {
            var p = PTLOGIN2_EXTERNAL_PATH_PREFIXES[i];
            if (lower === p || lower.indexOf(p + '/') === 0 || lower.indexOf(p + '?') === 0) {
                return true;
            }
        }
        return false;
    }

    function isPtlogin2Host(hostname) {
        if (!hostname) { return false; }
        return hostname === 'ptlogin2.qq.com' || /\.ptlogin2\.qq\.com$/.test(hostname);
    }

    function isHostKeptInWebview(hostname) {
        if (!hostname) { return false; }
        if (hostname === 'docs.qq.com') { return true; }
        if (hostname === 'docs.gtimg.com') { return true; }
        if (hostname === 'accounts.qq.com' || hostname === 'graph.qq.com' || /\.graph\.qq\.com$/.test(hostname)) { return true; }
        if (hostname === 'ptlogin2.qq.com' || /\.ptlogin2\.qq\.com$/.test(hostname)) { return true; }
        if (hostname === 'captcha.qq.com' || /\.captcha\.qq\.com$/.test(hostname)) { return true; }
        // *.weixin.qq.com / *.wx.qq.com 整族放行（扫码链路涉及多个子域）
        if (hostname === 'weixin.qq.com' || /\.weixin\.qq\.com$/.test(hostname)) { return true; }
        if (hostname === 'wx.qq.com' || /\.wx\.qq\.com$/.test(hostname)) { return true; }
        return false;
    }

    function isExternalLinkForBrowser(rawHref) {
        if (!rawHref || typeof rawHref !== 'string') { return false; }
        var trimmed = rawHref.trim();
        if (trimmed.length === 0) { return false; }
        if (trimmed.charAt(0) === '#') { return false; }
        var parsed;
        try {
            parsed = new URL(trimmed, location.href);
        } catch {
            return false;
        }
        if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
            return false;
        }
        // docs.qq.com 政策/关于/帮助/反馈路径 → 视为外链
        if (parsed.hostname === 'docs.qq.com' && isDocsQqExternalPath(parsed.pathname)) {
            return true;
        }
        // *.ptlogin2.qq.com 的注册入口（/j_newreg_url）→ 外抛浏览器
        if (isPtlogin2Host(parsed.hostname) && isPtlogin2ExternalPath(parsed.pathname)) {
            return true;
        }
        // 在白名单内 → 留 webview
        if (isHostKeptInWebview(parsed.hostname)) {
            return false;
        }
        // 其它全部当外链
        return true;
    }

    /**
     * 把 url 抛给宿主，由宿主走 adapter.openExternal 唤起系统浏览器。
     */
    function reportExternalLink(url, reason) {
        try {
            // eslint-disable-next-line no-console
            console.info(
                `[tdoc-import-preload] external link captured frame=${frameTag} reason=${reason} url=${url}`,
            );
            ipcRenderer.sendToHost('tdoc-import:open-external', {
                url,
                reason,
                frame: frameTag,
            });
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error('[tdoc-import-preload] sendToHost(open-external) failed:', err);
        }
    }

    // ── 3. click / auxclick capture（isolated world） ─────────────────
    // 只能拦到 <a> 在 DOM + 真实鼠标点击；detached anchor 跳转靠下面 main-world patch。
    function handleClickLike(eventType) {
        return event => {
            try {
                if (event.button !== 0 && event.button !== 1) { return; }

                let anchor = null;
                const path = typeof event.composedPath === 'function' ? event.composedPath() : [];
                for (const node of path) {
                    if (node && node.nodeType === 1 && node.tagName === 'A') {
                        anchor = node;
                        break;
                    }
                }
                if (!anchor) {
                    let cur = event.target;
                    while (cur && cur.nodeType === 1) {
                        if (cur.tagName === 'A') { anchor = cur; break; }
                        cur = cur.parentNode;
                    }
                }
                if (!anchor) { return; }

                const rawHref = anchor.getAttribute('href') || anchor.href || '';
                if (!isExternalLinkForBrowser(rawHref)) { return; }

                let absoluteUrl;
                try {
                    absoluteUrl = new URL(rawHref, location.href).toString();
                } catch {
                    absoluteUrl = rawHref;
                }

                event.preventDefault();
                if (typeof event.stopImmediatePropagation === 'function') {
                    event.stopImmediatePropagation();
                } else {
                    event.stopPropagation();
                }

                reportExternalLink(absoluteUrl, eventType);
            } catch (err) {
                // eslint-disable-next-line no-console
                console.error('[tdoc-import-preload] click handler error:', err);
            }
        };
    }

    document.addEventListener('click', handleClickLike('click'), { capture: true });
    document.addEventListener('auxclick', handleClickLike('auxclick'), { capture: true });

    // ── 4. window.open 劫持（isolated world） ──────────────────────────
    // main world 副本在第 5 节一并 patch。
    try {
        const originalOpen = window.open.bind(window);
        window.open = function patchedOpen(rawUrl /* , target, features */) {
            try {
                if (typeof rawUrl === 'string' && isExternalLinkForBrowser(rawUrl)) {
                    let absoluteUrl;
                    try {
                        absoluteUrl = new URL(rawUrl, location.href).toString();
                    } catch {
                        absoluteUrl = rawUrl;
                    }
                    reportExternalLink(absoluteUrl, 'window.open');
                    return null;
                }
            } catch (err) {
                // eslint-disable-next-line no-console
                console.error('[tdoc-import-preload] patched window.open error:', err);
            }
            return originalOpen.apply(this, arguments);
        };
    } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('[tdoc-import-preload] patch window.open failed (non-fatal):', err);
    }

    // ── 5. main-world prototype 注入（关键） ──────────────────────────
    //
    // 通过 <script src=blob:...> 把 patch 代码注入 main world，劫持：
    //   - HTMLAnchorElement.prototype.click（detached anchor 真实跳转入口）
    //   - EventTarget.prototype.dispatchEvent
    //   - window.open（main world 副本）
    //   - history.pushState / replaceState
    //
    // 命中外链 → postMessage 一条 __type='tdoc-import-bridge:external' 的消息
    // 回 isolated world，preload 监听后 reportExternalLink。
    try {
        const BRIDGE_TYPE = 'tdoc-import-bridge:external';

        // 跨 world postMessage 的 e.source 在不同 world 包装下不等于 window，
        // 这里只通过 __type 标记区分。
        window.addEventListener('message', e => {
            try {
                if (!e || !e.data) { return; }
                if (e.data.__type !== BRIDGE_TYPE) { return; }
                const url = e.data.url;
                const reason = e.data.reason;
                if (typeof url === 'string' && url.length > 0) {
                    reportExternalLink(url, reason || 'main-world');
                }
            } catch (err) {
                // eslint-disable-next-line no-console
                console.error('[tdoc-import-preload] bridge message handler error:', err);
            }
        });

        // 注入到 main world 的代码：跑在另一个 world，闭包不可达，只能
        // 用 stringify 常量。isExternal 与 isolated world/主进程/子 frame 注入版本对齐。
        const mainWorldPatch = `
        (function () {
            'use strict';
            if (window.__tdocImportMainWorldPatched__) { return; }
            window.__tdocImportMainWorldPatched__ = true;

            var BRIDGE_TYPE = ${JSON.stringify(BRIDGE_TYPE)};
            var DOCS_QQ_EXTERNAL_PATH_PREFIXES = ['/policy', '/about', '/agreement', '/privacy', '/help', '/feedback', '/doc'];

            function isDocsQqExternalPath(pathname) {
                var lower = (pathname || '').toLowerCase();
                if (lower === '' || lower === '/') { return true; }
                for (var i = 0; i < DOCS_QQ_EXTERNAL_PATH_PREFIXES.length; i++) {
                    var p = DOCS_QQ_EXTERNAL_PATH_PREFIXES[i];
                    if (lower === p || lower.indexOf(p + '/') === 0 || lower.indexOf(p + '.') === 0) {
                        return true;
                    }
                }
                return false;
            }

            var PTLOGIN2_EXTERNAL_PATH_PREFIXES = ['/j_newreg_url'];

            function isPtlogin2ExternalPath(pathname) {
                var lower = (pathname || '').toLowerCase();
                for (var i = 0; i < PTLOGIN2_EXTERNAL_PATH_PREFIXES.length; i++) {
                    var p = PTLOGIN2_EXTERNAL_PATH_PREFIXES[i];
                    if (lower === p || lower.indexOf(p + '/') === 0 || lower.indexOf(p + '?') === 0) {
                        return true;
                    }
                }
                return false;
            }

            function isPtlogin2Host(hostname) {
                if (!hostname) { return false; }
                return hostname === 'ptlogin2.qq.com' || /\\.ptlogin2\\.qq\\.com$/.test(hostname);
            }

            function isHostKeptInWebview(hostname) {
                if (!hostname) { return false; }
                if (hostname === 'docs.qq.com') { return true; }
                if (hostname === 'docs.gtimg.com') { return true; }
                if (hostname === 'accounts.qq.com' || hostname === 'graph.qq.com' || /\\.graph\\.qq\\.com$/.test(hostname)) { return true; }
                if (hostname === 'ptlogin2.qq.com' || /\\.ptlogin2\\.qq\\.com$/.test(hostname)) { return true; }
                if (hostname === 'captcha.qq.com' || /\\.captcha\\.qq\\.com$/.test(hostname)) { return true; }
                if (hostname === 'weixin.qq.com' || /\\.weixin\\.qq\\.com$/.test(hostname)) { return true; }
                if (hostname === 'wx.qq.com' || /\\.wx\\.qq\\.com$/.test(hostname)) { return true; }
                return false;
            }

            function isExternal(rawHref) {
                if (!rawHref || typeof rawHref !== 'string') { return false; }
                var trimmed = rawHref.trim();
                if (trimmed.length === 0) { return false; }
                if (trimmed.charAt(0) === '#') { return false; }
                var parsed;
                try { parsed = new URL(trimmed, location.href); }
                catch (e) { return false; }
                if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') { return false; }
                if (parsed.hostname === 'docs.qq.com' && isDocsQqExternalPath(parsed.pathname)) { return true; }
                if (isPtlogin2Host(parsed.hostname) && isPtlogin2ExternalPath(parsed.pathname)) { return true; }
                if (isHostKeptInWebview(parsed.hostname)) { return false; }
                return true;
            }

            function postExternal(rawHref, reason) {
                var absolute;
                try { absolute = new URL(rawHref, location.href).toString(); }
                catch (e) { absolute = rawHref; }
                try {
                    window.postMessage({ __type: BRIDGE_TYPE, url: absolute, reason: reason }, '*');
                } catch (e) { /* ignore */ }
                try {
                    console.info('[tdoc-import-preload][main-world] external captured reason=' + reason + ' url=' + absolute);
                } catch (e) { /* ignore */ }
            }

            // ── HTMLAnchorElement.prototype.click 劫持 ──
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

            // ── EventTarget.prototype.dispatchEvent 劫持 ──
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

            // ── window.open 劫持（main world 副本） ──
            try {
                var originalOpen = window.open;
                window.open = function patchedOpen(rawUrl /*, target, features */) {
                    try {
                        if (typeof rawUrl === 'string' && isExternal(rawUrl)) {
                            postExternal(rawUrl, 'window.open');
                            return null;
                        }
                    } catch (e) { /* ignore */ }
                    return originalOpen.apply(this, arguments);
                };
            } catch (e) { /* ignore */ }

            // ── history.pushState / replaceState 劫持 ──
            // 仅当跨 origin 或同 origin 但 pathname 不同时视为外链；
            // 纯 query/hash 变化（selector 内部 tab 切换）放行。
            function shouldTreatHistoryUrlAsExternal(rawUrl) {
                if (!rawUrl || typeof rawUrl !== 'string') { return null; }
                var target;
                try { target = new URL(rawUrl, location.href); }
                catch (e) { return null; }
                if (target.protocol !== 'http:' && target.protocol !== 'https:') { return null; }
                if (!isExternal(target.toString())) { return null; }
                if (target.origin !== location.origin) { return target.toString(); }
                if (target.pathname !== location.pathname) { return target.toString(); }
                return null;
            }

            function patchHistoryMethod(methodName) {
                try {
                    var original = history[methodName];
                    if (typeof original !== 'function') { return; }
                    history[methodName] = function patchedHistoryMethod(_state, _title, url) {
                        try {
                            var externalUrl = shouldTreatHistoryUrlAsExternal(url);
                            if (externalUrl) {
                                postExternal(externalUrl, 'history.' + methodName);
                                return undefined;
                            }
                        } catch (e) { /* ignore */ }
                        return original.apply(this, arguments);
                    };
                } catch (e) { /* ignore */ }
            }
            patchHistoryMethod('replaceState');
            patchHistoryMethod('pushState');
        })();
        `;

        // 注入策略：docs.qq.com CSP 禁止 inline script，优先 blob:，失败回退
        // data:，再失败退化到 inline（多半被拦）。preload 跑得比页面任何脚本
        // 都早，document.head 不一定存在，用 documentElement 兜底。
        const tryInjectVia = (label, makeScriptSrc) => {
            try {
                const script = document.createElement('script');
                script.onload = () => {
                    // 诊断信号：看到这行说明 main-world patch 装上了；
                    // 没看到说明 CSP 拦了，需要换注入方式。
                    // eslint-disable-next-line no-console
                    console.info(
                        `[tdoc-import-preload] main-world patch installed via ${label} (frame=${frameTag})`,
                    );
                    try {
                        if (script.parentNode) {
                            script.parentNode.removeChild(script);
                        }
                    } catch (e) { /* ignore */ }
                };
                script.onerror = e => {
                    // eslint-disable-next-line no-console
                    console.error('[tdoc-import-preload] main-world script onerror via ' + label, e);
                };
                script.src = makeScriptSrc();
                (document.head || document.documentElement).appendChild(script);
                return true;
            } catch (err) {
                // eslint-disable-next-line no-console
                console.error('[tdoc-import-preload] inject via ' + label + ' threw:', err);
                return false;
            }
        };

        const inject = () => {
            const tryBlob = () => {
                try {
                    if (typeof Blob !== 'function' || typeof URL === 'undefined' || typeof URL.createObjectURL !== 'function') {
                        return false;
                    }
                    const blob = new Blob([mainWorldPatch], { type: 'application/javascript' });
                    const url = URL.createObjectURL(blob);
                    return tryInjectVia('blob', () => url);
                } catch (err) {
                    // eslint-disable-next-line no-console
                    console.warn('[tdoc-import-preload] blob inject failed:', err);
                    return false;
                }
            };

            const tryDataUrl = () => {
                try {
                    const url = 'data:application/javascript;base64,' + btoa(mainWorldPatch);
                    return tryInjectVia('data', () => url);
                } catch (err) {
                    // eslint-disable-next-line no-console
                    console.warn('[tdoc-import-preload] data inject failed:', err);
                    return false;
                }
            };

            const tryInline = () => {
                try {
                    const script = document.createElement('script');
                    script.textContent = mainWorldPatch;
                    (document.head || document.documentElement).appendChild(script);
                    if (script.parentNode) {
                        script.parentNode.removeChild(script);
                    }
                    return true;
                } catch (err) {
                    // eslint-disable-next-line no-console
                    console.error('[tdoc-import-preload] inline inject threw:', err);
                    return false;
                }
            };

            tryBlob() || tryDataUrl() || tryInline();
        };
        if (document.documentElement) {
            inject();
        } else {
            document.addEventListener('readystatechange', inject, { once: true });
        }
    } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('[tdoc-import-preload] main-world bridge install failed (non-fatal):', err);
    }

    // ── 6. postMessage 透明探针 ────────────────────────────────────────
    // 排查诊断用：所有 postMessage 调用都打日志，区分「腾讯文档没抛」
    // vs「抛了但路由到别处」两种现象。BRIDGE_TYPE 消息也会被打但前面
    // listener 已 early-return，不会误转发给宿主。
    try {
        const originalPostMessage = window.postMessage.bind(window);
        window.postMessage = function patchedPostMessage(...args) {
            try {
                let preview;
                try {
                    preview = typeof args[0] === 'string'
                        ? args[0].slice(0, 200)
                        : JSON.stringify(args[0]).slice(0, 200);
                } catch {
                    preview = '<unstringifiable>';
                }
                // eslint-disable-next-line no-console
                console.info(
                    `[tdoc-import-preload] postMessage called frame=${frameTag} target=${args[1] ?? '<unset>'} preview=${preview}`,
                );
            } catch { /* ignore */ }
            return originalPostMessage.apply(this, args);
        };
    } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('[tdoc-import-preload] patch postMessage failed (non-fatal):', err);
    }
} catch (err) {
    // eslint-disable-next-line no-console
    console.error('[tdoc-import-preload] initialization failed:', err);
}
