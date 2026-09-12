/**
 * DevTools Terminal Panel - ghostty-web powered.
 *
 * Talks to the inspected page preload bridge. The preload bridge forwards
 * terminal attach/input/data through Electron IPC so the panel does not open
 * direct sockets.
 */

/* global GhosttyWeb, chrome */

let terminalSubscriptionId = null;
let terminalPumpVersion = 0;
let terminal = null;
let terminalResizeObserver = null;
let terminalResizeRafId = 0;
let asyncEvalCounter = 0;
let daemonFrameCounter = 0;

const sessionSelect = document.getElementById('session-select');
const attachBtn = document.getElementById('attach-btn');
const refreshBtn = document.getElementById('refresh-btn');
const statusText = document.getElementById('status-text');
const statusDot = document.getElementById('status-dot');
const terminalContainer = document.getElementById('terminal-container');
const placeholder = document.getElementById('placeholder');
const debugEl = document.getElementById('debug');

// --- Helpers ---

function shortId(id) { return id.slice(0, 8) + '...'; }

function friendlyName(id) {
    if (id === '__workbuddy_cli_host__') return 'CLI Host';
    if (id.startsWith('__') && id.endsWith('__')) return id.slice(2, -2).replace(/_/g, ' ');
    return shortId(id);
}

function setStatus(text, state) {
    statusText.textContent = text;
    statusDot.className = 'status-dot' + (state ? ` ${state}` : '');
}

function clearTerminalContainer() {
    while (terminalContainer.firstChild && terminalContainer.firstChild !== placeholder) {
        terminalContainer.removeChild(terminalContainer.firstChild);
    }
}

function disposeTerminalView() {
    if (terminalResizeObserver) {
        terminalResizeObserver.disconnect();
        terminalResizeObserver = null;
    }
    if (terminalResizeRafId) {
        cancelAnimationFrame(terminalResizeRafId);
        terminalResizeRafId = 0;
    }
    if (terminal) {
        terminal.dispose();
        terminal = null;
    }
}

function decodeBase64Chunk(base64) {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) {
        bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// --- Daemon RPC via inspected page ---

const ASYNC_EVAL_STORE_KEY = '__workbuddyDevtoolsTerminalAsyncEvalResults';
const ASYNC_EVAL_TIMEOUT_MS = 10_000;
const ASYNC_EVAL_POLL_MS = 25;

function evalInspectedPageJson(expression) {
    return new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(expression, (result, error) => {
            if (error) {
                resolve({ ok: false, error: error.message || String(error) });
                return;
            }
            if (result && typeof result === 'object' && typeof result.ok === 'boolean') {
                resolve(result);
                return;
            }
            if (typeof result !== 'string') {
                resolve({ ok: false, error: 'inspected page returned a non-string result' });
                return;
            }
            try {
                resolve(JSON.parse(result));
            } catch {
                resolve({ ok: false, error: 'failed to parse inspected page result' });
            }
        });
    });
}

async function evalInspectedPageAsync(taskExpression) {
    const requestId = `devtools-terminal-${Date.now()}-${asyncEvalCounter += 1}`;
    const startExpression = `(function () {
        var storeKey = ${JSON.stringify(ASYNC_EVAL_STORE_KEY)};
        var requestId = ${JSON.stringify(requestId)};
        var store = window[storeKey] || (window[storeKey] = Object.create(null));
        Promise.resolve()
            .then(function () { return (${taskExpression}); })
            .then(function (result) {
                store[requestId] = JSON.stringify({ ok: true, result: result });
            }, function (error) {
                store[requestId] = JSON.stringify({
                    ok: false,
                    error: error && error.message ? error.message : String(error),
                });
            });
        return JSON.stringify({ ok: true, pending: true });
    })()`;

    const started = await evalInspectedPageJson(startExpression);
    if (!started.ok) {
        return started;
    }

    const deadline = Date.now() + ASYNC_EVAL_TIMEOUT_MS;
    while (Date.now() < deadline) {
        const pollExpression = `(function () {
            var store = window[${JSON.stringify(ASYNC_EVAL_STORE_KEY)}];
            var requestId = ${JSON.stringify(requestId)};
            if (!store || typeof store[requestId] !== 'string') {
                return JSON.stringify({ ok: true, pending: true });
            }
            var value = store[requestId];
            delete store[requestId];
            return value;
        })()`;
        const response = await evalInspectedPageJson(pollExpression);
        if (!response.ok || !response.pending) {
            return response;
        }
        await delay(ASYNC_EVAL_POLL_MS);
    }

    await evalInspectedPageJson(`(function () {
        var store = window[${JSON.stringify(ASYNC_EVAL_STORE_KEY)}];
        if (store) {
            delete store[${JSON.stringify(requestId)}];
        }
        return JSON.stringify({ ok: true });
    })()`);
    return { ok: false, error: 'inspected page async eval timed out' };
}

async function rpcInvoke(channel, ...args) {
    daemonFrameCounter += 1;
    const requestId = `devtools-terminal-rpc-${Date.now()}-${daemonFrameCounter}`;
    const expression = `(async function () {
        if (!window.workbuddyDesktop) {
            throw new Error('window.workbuddyDesktop is unavailable');
        }
        if (typeof MessageChannel !== 'function') {
            throw new Error('MessageChannel is unavailable');
        }
        var responseFrame = await new Promise(function (resolve, reject) {
            var settled = false;
            var channel = new MessageChannel();
            var port = channel.port1;
            function finish(error, value) {
                if (settled) return;
                settled = true;
                port.onmessage = null;
                port.onmessageerror = null;
                port.close();
                if (error) {
                    reject(error);
                } else {
                    resolve(value);
                }
            }
            port.onmessage = function (event) {
                var payload = event.data;
                if (!payload || typeof payload !== 'object') return;
                if (payload.kind === 'open') {
                    port.postMessage({
                        kind: 'message',
                        text: JSON.stringify({
                            id: ${JSON.stringify(requestId)},
                            type: 'request',
                            channel: ${JSON.stringify(channel)},
                            args: ${JSON.stringify(args)},
                        }),
                    });
                    return;
                }
                if (payload.kind === 'message') {
                    finish(
                        null,
                        payload.text || (
                            payload.json !== undefined && payload.json !== null
                                ? JSON.stringify(payload.json)
                                : payload.binaryBase64 || ''
                        ),
                    );
                } else if (payload.kind === 'error') {
                    finish(new Error(payload.error || 'daemon transport error'));
                } else if (payload.kind === 'close') {
                    finish(new Error(payload.reason || 'daemon transport closed'));
                }
            };
            port.onmessageerror = function () {
                finish(new Error('daemon transport port message error'));
            };
            port.start();
            try {
                window.postMessage({
                    type: 'workbuddy:open-local-daemon-transport-port',
                    target: { transportType: 'local' },
                }, '*', [channel.port2]);
            } catch (error) {
                finish(error);
            }
        });
        var response = JSON.parse(String(responseFrame));
        if (response.type === 'error' || response.error) {
            throw new Error(
                response.error && response.error.message
                    ? response.error.message
                    : 'daemon RPC failed'
            );
        }
        return response.result;
    })()`;
    const response = await evalInspectedPageAsync(expression);
    if (!response.ok) {
        throw new Error(response.error || 'daemon RPC failed');
    }
    return response.result;
}

async function devtoolsTerminalInvoke(method, ...args) {
    const expression = `(async function () {
        var bridge = window.__workbuddyDevtoolsTerminal;
        var method = ${JSON.stringify(method)};
        if (!bridge || typeof bridge[method] !== 'function') {
            throw new Error('window.__workbuddyDevtoolsTerminal.' + method + ' is unavailable');
        }
        return await bridge[method](...${JSON.stringify(args)});
    })()`;
    const response = await evalInspectedPageAsync(expression);
    if (!response.ok) {
        throw new Error(response.error || 'DevTools terminal IPC failed');
    }
    return response.result;
}

// --- Session list ---

async function refreshSessions() {
    try {
        const [sessions, appSessions] = await Promise.all([
            rpcInvoke('sidecar:list'),
            rpcInvoke('session:list')
                .then(r => Array.isArray(r) ? r : (r?.agents ?? r?.sessions ?? []))
                .catch(() => []),
        ]);

        const titleMap = new Map();
        for (const s of appSessions) {
            const id = s.sessionId || s.id;
            const name = s.name || s.title;
            if (id && name) titleMap.set(id, name);
        }

        sessionSelect.innerHTML = '<option value="">Select a session...</option>';
        if (Array.isArray(sessions)) {
            sessions.forEach(s => {
                const opt = document.createElement('option');
                const id = s.sessionId || s.id;
                opt.value = id;

                const name = titleMap.get(id) || friendlyName(id);
                const port = s.acpEndpoint?.match(/:(\d+)/)?.[1];
                const pid = s.pid || '?';
                opt.textContent = (name === shortId(id)) ? `${id} (pid ${pid})` : name;
                opt.title = `${id}\npid ${pid} - port ${port || '?'} - ${s.cols}x${s.rows}`;
                sessionSelect.appendChild(opt);
            });
            setStatus(`${sessions.length} session${sessions.length !== 1 ? 's' : ''}`, '');
        }
    } catch (err) {
        setStatus(err.message, 'error');
    }
}

// --- Terminal IPC stream ---

async function detachCurrentTerminalSubscription() {
    terminalPumpVersion += 1;
    const subscriptionId = terminalSubscriptionId;
    terminalSubscriptionId = null;
    if (subscriptionId) {
        await devtoolsTerminalInvoke('detach', subscriptionId).catch(() => {});
    }
}

function startTerminalEventPump(subscriptionId, handlers) {
    terminalPumpVersion += 1;
    const pumpVersion = terminalPumpVersion;

    const pump = async () => {
        while (pumpVersion === terminalPumpVersion && terminalSubscriptionId === subscriptionId) {
            try {
                const result = await devtoolsTerminalInvoke('poll', subscriptionId);
                const events = Array.isArray(result?.events) ? result.events : [];
                for (const event of events) {
                    if (event.type === 'data' && typeof event.data === 'string') {
                        handlers.onData(decodeBase64Chunk(event.data));
                        continue;
                    }
                    if (event.type === 'closed') {
                        if (terminalSubscriptionId === subscriptionId) {
                            terminalSubscriptionId = null;
                            terminalPumpVersion += 1;
                        }
                        handlers.onClosed?.();
                        return;
                    }
                    if (event.type === 'error') {
                        if (terminalSubscriptionId === subscriptionId) {
                            terminalSubscriptionId = null;
                            terminalPumpVersion += 1;
                        }
                        handlers.onError?.(event.message || 'terminal stream error');
                        return;
                    }
                }
                await delay(events.length > 0 ? 5 : 33);
            } catch (err) {
                if (pumpVersion === terminalPumpVersion) {
                    terminalSubscriptionId = null;
                    terminalPumpVersion += 1;
                    handlers.onError?.(err.message || String(err));
                }
                return;
            }
        }
    };

    void pump();
}

async function attachTerminalSubscription(sessionId) {
    setStatus('connecting...', 'connecting');
    const result = await devtoolsTerminalInvoke('attach', sessionId);
    const subscriptionId = result?.subscriptionId;
    if (typeof subscriptionId !== 'string' || !subscriptionId) {
        throw new Error('DevTools terminal attach returned an invalid subscriptionId');
    }
    terminalSubscriptionId = subscriptionId;
    setStatus('connected', 'connected');
    return subscriptionId;
}

// --- Attach to PTY with ghostty-web ---

async function attach() {
    const sessionId = sessionSelect.value;
    if (!sessionId) return;
    await attachToSession(sessionId);
}

async function attachToSession(sessionId) {
    await detachCurrentTerminalSubscription();
    disposeTerminalView();
    clearTerminalContainer();
    debugEl.style.display = 'none';
    debugEl.textContent = '';
    placeholder.style.display = 'none';

    try {
        setStatus('loading ghostty...', 'connecting');

        await GhosttyWeb.init();

        terminal = new GhosttyWeb.Terminal({
            fontSize: 13,
            fontFamily: "'SF Mono', 'Fira Code', Menlo, Monaco, monospace",
            cursorBlink: true,
            scrollback: 10000,
            theme: {
                background: '#0f0f11',
                foreground: '#e8e8ed',
                cursor: '#5e6ad2',
                cursorAccent: '#0f0f11',
                selectionBackground: 'rgba(94, 106, 210, 0.3)',
                black: '#1f1f23',
                red: '#f87171',
                green: '#4ade80',
                yellow: '#facc15',
                blue: '#5e6ad2',
                magenta: '#c084fc',
                cyan: '#22d3ee',
                white: '#e8e8ed',
                brightBlack: '#5c5c63',
                brightRed: '#fca5a5',
                brightGreen: '#86efac',
                brightYellow: '#fde68a',
                brightBlue: '#8b95e6',
                brightMagenta: '#d8b4fe',
                brightCyan: '#67e8f9',
                brightWhite: '#ffffff',
            },
        });

        const fitAddon = new GhosttyWeb.FitAddon();
        terminal.loadAddon(fitAddon);

        terminal.open(terminalContainer);
        await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
        fitAddon.fit();

        terminalResizeObserver = new ResizeObserver((entries) => {
            const { width, height } = entries[0].contentRect;
            if (width > 0 && height > 0) {
                cancelAnimationFrame(terminalResizeRafId);
                terminalResizeRafId = requestAnimationFrame(() => fitAddon.fit());
            }
        });
        terminalResizeObserver.observe(terminalContainer);

        const dims = { cols: terminal.cols || 80, rows: terminal.rows || 24 };
        await devtoolsTerminalInvoke('resize', sessionId, dims.cols, dims.rows).catch(() => {});

        const subscriptionId = await attachTerminalSubscription(sessionId);

        let dataBuffer = [];
        let flushTimer;
        const flushData = () => {
            if (!dataBuffer.length) {
                flushTimer = undefined;
                return;
            }
            const chunks = dataBuffer;
            dataBuffer = [];
            flushTimer = undefined;
            for (const chunk of chunks) {
                if (terminal) {
                    terminal.write(chunk);
                }
            }
        };

        startTerminalEventPump(subscriptionId, {
            onData(chunk) {
                dataBuffer.push(chunk);
                if (flushTimer === undefined) {
                    flushTimer = setTimeout(flushData, 5);
                }
            },
            onClosed() {
                setStatus('disconnected', '');
            },
            onError(message) {
                setStatus(message, 'error');
            },
        });

        terminal.onData((data) => {
            if (terminalSubscriptionId === subscriptionId) {
                devtoolsTerminalInvoke('input', subscriptionId, data).catch(() => {});
            }
        });

        terminal.onResize(({ cols, rows }) => {
            devtoolsTerminalInvoke('resize', sessionId, cols, rows).catch(() => {});
        });
    } catch (err) {
        await detachCurrentTerminalSubscription();
        disposeTerminalView();
        await attachRawTerminal(sessionId, err);
    }
}

async function attachRawTerminal(sessionId, originalError) {
    debugEl.textContent = 'ATTACH ERROR: ' + originalError.message + ' | stack: ' + (originalError.stack || '').substring(0, 200);
    debugEl.style.display = 'block';

    clearTerminalContainer();
    const pre = document.createElement('pre');
    pre.style.cssText = 'width:100%;height:100%;overflow:auto;padding:8px;margin:0;' +
        "font-family:'SF Mono','Fira Code',Menlo,Monaco,monospace;font-size:13px;color:#e8e8ed;" +
        'background:#0f0f11;white-space:pre-wrap;';
    terminalContainer.appendChild(pre);

    try {
        await devtoolsTerminalInvoke('resize', sessionId, 80, 24).catch(() => {});
        const subscriptionId = await attachTerminalSubscription(sessionId);
        const decoder = new TextDecoder();
        startTerminalEventPump(subscriptionId, {
            onData(chunk) {
                pre.textContent += decoder.decode(chunk, { stream: true });
                pre.scrollTop = pre.scrollHeight;
            },
            onClosed() {
                setStatus('disconnected (raw)', '');
            },
            onError(message) {
                setStatus(message, 'error');
            },
        });
    } catch (err) {
        setStatus(err.message || String(err), 'error');
    }
}

// --- Event handlers ---

attachBtn.addEventListener('click', attach);
refreshBtn.addEventListener('click', refreshSessions);

setTimeout(refreshSessions, 500);

window.addEventListener('beforeunload', () => {
    void detachCurrentTerminalSubscription();
});
