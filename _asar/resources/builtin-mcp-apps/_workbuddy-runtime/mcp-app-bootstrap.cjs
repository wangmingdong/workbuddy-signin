// WorkBuddy MCP App child-process bootstrap.
//
// Loaded via `node --require <thisFile> <appCli>` (we run with
// `process.execPath` + `ELECTRON_RUN_AS_NODE=1`). Runs *before* the bundled
// MCP App entry (`cli.cjs`) so any HTTP server it later creates inherits our
// patched defaults.
//
// Why this exists
// ----------------
// Node.js v18+ ships with `http.Server.requestTimeout = 300000` (5 minutes).
// That timer runs from the moment a request *starts*, NOT idle time, so it
// forcibly tears down long-lived streaming responses (MCP Streamable HTTP /
// SSE) at exactly the 5-minute mark even when the stream is actively pushing
// data. WorkBuddy main observes the resulting socket teardown as
// `TypeError: terminated` from undici fetch, surfaced to the MCP SDK as
// `SSE stream disconnected: TypeError: terminated`.
//
// Bundled MCP Apps (e.g. Ardot's `cli.cjs`) typically don't override that
// default. Patching from a `--require`-injected bootstrap lets WorkBuddy fix
// the behavior without modifying upstream code.
//
// Triple-defense patch strategy
// -----------------------------
// 1. Wrap `createServer` on `http`/`node:http`/`https`/`node:https`. Catches
//    `(0, http.createServer)()` style call sites.
// 2. Wrap `Server.prototype.listen`. Safety net for direct `new Server()`
//    paths and for frameworks that wrap their own server class.
// 3. Lock the values via `Object.defineProperty` getter/setter on each
//    server instance once we have it: assignments are swallowed (with a log
//    line), reads always return 0. This blocks any later
//    `server.requestTimeout = 300000` reassignment from the app or its
//    framework — we observed earlier that wrapping alone wasn't enough.
//
// Diagnostic logs (single-line, JSON-ish) on stdout: WorkBuddy main pipes
// child stdout into `[ConnectorService] built-in Ardot MCP stdout: ...` so
// these are immediately visible without extra DEBUG flags.
//
// Compatibility notes
// -------------------
// - CommonJS on purpose: `cli.cjs` is CJS, no `--experimental-vm-modules`.
// - Defensive `try/catch` around every step: a broken bootstrap must NEVER
//   crash the spawned MCP App process — worst case is "no patch, fall back
//   to original 5-minute behavior".
// - No third-party deps; only Node built-ins.

'use strict';

const TAG = '[mcp-app-bootstrap]';
const createPatches = [];
const listenPatches = [];

/**
 * Lock a server instance's `requestTimeout` / `headersTimeout` to 0 with a
 * configurable getter/setter pair. Subsequent assignments by the app are
 * swallowed (and logged for observability) so we cannot be silently undone.
 */
function lockTimeoutsTo0(server, label) {
    if (!server) {
        return { requestTimeoutBefore: undefined, headersTimeoutBefore: undefined };
    }
    const before = {
        requestTimeoutBefore: server.requestTimeout,
        headersTimeoutBefore: server.headersTimeout,
    };
    for (const prop of ['requestTimeout', 'headersTimeout']) {
        try {
            Object.defineProperty(server, prop, {
                configurable: true,
                enumerable: true,
                get() {
                    return 0;
                },
                set(value) {
                    if (value !== 0 && value !== undefined && value !== null) {
                        console.log(`${TAG} ${label}: swallowed ${prop}=${value} (kept at 0)`);
                    }
                },
            });
        } catch (err) {
            console.warn(`${TAG} ${label}: defineProperty(${prop}) failed:`, err && err.message ? err.message : err);
        }
    }
    return before;
}

for (const moduleName of ['http', 'node:http', 'https', 'node:https']) {
    let lib;
    try {
        lib = require(moduleName);
    } catch (_err) {
        continue;
    }
    if (!lib) {
        continue;
    }

    // 1) Wrap `createServer`. Idempotent across module-cache aliases via
    //    `__workbuddyPatched` tag (since `node:http` and `http` share the
    //    same builtin module instance, the second iteration is a no-op).
    try {
        const originalCreate = lib.createServer;
        if (typeof originalCreate === 'function' && !originalCreate.__workbuddyPatched) {
            const wrappedCreate = function patchedCreateServer(...args) {
                const server = originalCreate.apply(this, args);
                const before = lockTimeoutsTo0(server, `${moduleName}.createServer`);
                console.log(
                    `${TAG} ${moduleName}.createServer fired: `
                    + `requestTimeout ${before.requestTimeoutBefore}->0, `
                    + `headersTimeout ${before.headersTimeoutBefore}->0`,
                );
                return server;
            };
            wrappedCreate.__workbuddyPatched = true;
            lib.createServer = wrappedCreate;
            createPatches.push(moduleName);
        }
    } catch (err) {
        console.warn(`${TAG} ${moduleName}.createServer wrap failed:`, err && err.message ? err.message : err);
    }

    // 2) Wrap `Server.prototype.listen` so EVERY server (regardless of
    //    construction path) gets timeouts locked right before binding.
    try {
        const ServerCls = lib.Server;
        const proto = ServerCls && ServerCls.prototype;
        if (proto && typeof proto.listen === 'function' && !proto.listen.__workbuddyPatched) {
            const originalListen = proto.listen;
            const wrappedListen = function patchedListen(...args) {
                const before = lockTimeoutsTo0(this, `${moduleName}.listen`);
                console.log(
                    `${TAG} ${moduleName}.listen fired: `
                    + `requestTimeout ${before.requestTimeoutBefore}->0, `
                    + `headersTimeout ${before.headersTimeoutBefore}->0, `
                    + `args=[${args.filter(a => typeof a !== 'function').map(a => JSON.stringify(a)).join(', ')}]`,
                );
                return originalListen.apply(this, args);
            };
            wrappedListen.__workbuddyPatched = true;
            proto.listen = wrappedListen;
            listenPatches.push(moduleName);
        }
    } catch (err) {
        console.warn(`${TAG} ${moduleName}.Server.prototype.listen wrap failed:`, err && err.message ? err.message : err);
    }
}

console.log(`${TAG} loaded: createServer=[${createPatches.join(', ') || 'none'}], listen=[${listenPatches.join(', ') || 'none'}]`);
