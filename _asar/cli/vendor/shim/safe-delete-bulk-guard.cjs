#!/usr/bin/env node
'use strict';

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const CONFIRM_MARKER = '[safe-delete][SAFE_DELETE_BULK_CONFIRM_REQUIRED]';
const REJECTED_MARKER = '[safe-delete][SAFE_DELETE_BULK_REJECTED]';
const ERROR_MARKER = '[safe-delete][SAFE_DELETE_BULK_GUARD_ERROR]';
const DEFAULT_THRESHOLD = 20;
const LOCK_TIMEOUT_MS = 2000;
const STALE_LOCK_MS = 5 * 60 * 1000;
const TURN_STATE_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const TARGET_SAMPLE_LIMIT = 5;
const DISPLAY_COUNT_LIMIT = 9999;

class GuardError extends Error {}

function fail(message) {
    throw new GuardError(message);
}

function parseArgs(argv) {
    const command = argv[2];
    const targets = [];
    let scope;
    for (let i = 3; i < argv.length; i++) {
        const arg = argv[i];
        if (arg === '--target') {
            const target = argv[++i];
            if (!target) fail('missing --target value');
            targets.push(target);
        } else if (arg === '--scope') {
            scope = argv[++i];
            if (!scope) fail('missing --scope value');
        } else {
            fail(`unknown argument: ${arg}`);
        }
    }
    return { command, targets, scope };
}

function requireEnv(name) {
    const value = process.env[name];
    if (!value) fail(`${name} is not set`);
    return value;
}

function normalizeThreshold(value) {
    const raw = value === undefined || value === null || value === '' ? DEFAULT_THRESHOLD : value;
    const threshold = Number.parseInt(String(raw), 10);
    if (!Number.isFinite(threshold) || threshold <= 0) fail(`invalid threshold: ${value}`);
    return threshold;
}

function createSafeDeleteBulkGuardContext(input) {
    if (!input || !input.stateRoot || !input.sessionId || !input.toolCallId) {
        fail('missing bulk guard context');
    }
    const threshold = normalizeThreshold(input.threshold);
    const sessionId = input.sessionId;
    const conversationRequestId = input.conversationRequestId;
    const sessionHash = crypto.createHash('sha256').update(sessionId).digest('hex');
    const sessionDir = path.join(input.stateRoot, sessionHash);
    return {
        stateRoot: input.stateRoot,
        sessionId,
        toolCallId: input.toolCallId,
        requestId: conversationRequestId || input.toolCallId,
        threshold,
        conversationRequestId,
        sessionHash,
        sessionDir,
        statePath: path.join(sessionDir, 'state.json'),
    };
}

function getContext() {
    return createSafeDeleteBulkGuardContext({
        stateRoot: requireEnv('CODEBUDDY_SAFE_DELETE_BULK_STATE_DIR'),
        sessionId: requireEnv('CODEBUDDY_SESSION_ID'),
        toolCallId: requireEnv('CODEBUDDY_TOOL_CALL_ID'),
        conversationRequestId: process.env.CODEBUDDY_CONVERSATION_REQUEST_ID,
        threshold: process.env.CODEBUDDY_SAFE_DELETE_BULK_THRESHOLD || DEFAULT_THRESHOLD,
    });
}

function defaultState() {
    return { requests: {}, toolApprovals: {}, requestRejections: {} };
}

function normalizeState(parsed) {
    if (!parsed || typeof parsed !== 'object') return defaultState();
    return {
        requests: parsed.requests && typeof parsed.requests === 'object' ? parsed.requests : {},
        toolApprovals: parsed.toolApprovals && typeof parsed.toolApprovals === 'object' ? parsed.toolApprovals : {},
        requestRejections: parsed.requestRejections && typeof parsed.requestRejections === 'object' ? parsed.requestRejections : {},
    };
}

function readState(statePath) {
    try {
        return normalizeState(JSON.parse(fs.readFileSync(statePath, 'utf-8')));
    } catch (error) {
        if (error && error.code === 'ENOENT') return defaultState();
        fail(`failed to read state: ${error && error.message ? error.message : String(error)}`);
    }
}

function writeState(statePath, state) {
    const tmpPath = `${statePath}.${process.pid}.tmp`;
    fs.writeFileSync(tmpPath, `${JSON.stringify(state)}\n`, 'utf-8');
    fs.renameSync(tmpPath, statePath);
}

function normalizeRequest(request, now) {
    if (!request || typeof request !== 'object') return { count: 0, updatedAt: now };
    return {
        count: Number.isFinite(request.count) ? request.count : 0,
        updatedAt: Number.isFinite(request.updatedAt) ? request.updatedAt : now,
    };
}

function normalizeToolApproval(approval, now) {
    if (!approval || typeof approval !== 'object') return { approved: false, updatedAt: now };
    return {
        approved: approval.approved === true,
        updatedAt: Number.isFinite(approval.updatedAt) ? approval.updatedAt : now,
    };
}

function normalizeRequestRejection(rejection, now) {
    if (!rejection || typeof rejection !== 'object') {
        return { rejected: false, updatedAt: now };
    }
    const targets = Array.isArray(rejection.targets)
        ? rejection.targets.filter(target => typeof target === 'string').slice(0, TARGET_SAMPLE_LIMIT)
        : [];
    return {
        rejected: rejection.rejected === true,
        updatedAt: Number.isFinite(rejection.updatedAt) ? rejection.updatedAt : now,
        count: Number.isFinite(rejection.count) ? rejection.count : 0,
        threshold: Number.isFinite(rejection.threshold) ? rejection.threshold : DEFAULT_THRESHOLD,
        targets,
        targetCount: Number.isFinite(rejection.targetCount) ? rejection.targetCount : targets.length,
    };
}

function pruneExpired(state, now) {
    let changed = false;
    const nextRequests = {};
    for (const [requestId, rawRequest] of Object.entries(state.requests)) {
        const request = normalizeRequest(rawRequest, now);
        if (now - request.updatedAt > TURN_STATE_TTL_MS) {
            changed = true;
            continue;
        }
        nextRequests[requestId] = request;
        if (
            !rawRequest
            || typeof rawRequest !== 'object'
            || rawRequest.count !== request.count
            || rawRequest.updatedAt !== request.updatedAt
        ) {
            changed = true;
        }
    }
    if (changed) state.requests = nextRequests;

    const nextToolApprovals = {};
    for (const [toolCallId, rawApproval] of Object.entries(state.toolApprovals)) {
        const approval = normalizeToolApproval(rawApproval, now);
        if (now - approval.updatedAt > TURN_STATE_TTL_MS) {
            changed = true;
            continue;
        }
        nextToolApprovals[toolCallId] = approval;
        if (
            !rawApproval
            || typeof rawApproval !== 'object'
            || rawApproval.approved !== approval.approved
            || rawApproval.updatedAt !== approval.updatedAt
        ) {
            changed = true;
        }
    }
    if (changed) state.toolApprovals = nextToolApprovals;

    const nextRequestRejections = {};
    for (const [requestId, rawRejection] of Object.entries(state.requestRejections || {})) {
        const rejection = normalizeRequestRejection(rawRejection, now);
        if (now - rejection.updatedAt > TURN_STATE_TTL_MS) {
            changed = true;
            continue;
        }
        if (rejection.rejected) {
            nextRequestRejections[requestId] = rejection;
        }
        if (
            !rawRejection
            || typeof rawRejection !== 'object'
            || rawRejection.rejected !== rejection.rejected
            || rawRejection.updatedAt !== rejection.updatedAt
            || rawRejection.count !== rejection.count
            || rawRejection.threshold !== rejection.threshold
            || rawRejection.targetCount !== rejection.targetCount
        ) {
            changed = true;
        }
    }
    if (changed) state.requestRejections = nextRequestRejections;
    return changed;
}

function sleepMs(ms) {
    try {
        Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
    } catch (_) {
        const end = Date.now() + ms;
        while (Date.now() < end) {
            // fallback for constrained Node runtimes
        }
    }
}

function removeStaleLock(lockDir) {
    try {
        const stat = fs.statSync(lockDir);
        if (!stat.isDirectory() || Date.now() - stat.mtimeMs <= STALE_LOCK_MS) return false;
        fs.rmSync(lockDir, { recursive: true, force: true });
        return true;
    } catch (_) {
        return false;
    }
}

function withLock(context, fn) {
    fs.mkdirSync(context.sessionDir, { recursive: true });
    const lockDir = path.join(context.sessionDir, '.lock');
    const started = Date.now();
    for (;;) {
        try {
            fs.mkdirSync(lockDir);
            break;
        } catch (error) {
            if (!error || error.code !== 'EEXIST') fail(`failed to acquire lock: ${error && error.message ? error.message : String(error)}`);
            if (removeStaleLock(lockDir)) continue;
            if (Date.now() - started > LOCK_TIMEOUT_MS) fail('state lock timeout');
            sleepMs(25);
        }
    }
    try {
        return fn(context.statePath);
    } finally {
        try { fs.rmdirSync(lockDir); } catch (_) { /* best effort */ }
    }
}

function normalizeTargetPath(target) {
    if (process.platform !== 'win32' || typeof target !== 'string') return target;
    if (/^[A-Za-z]:[\\/]/.test(target)) return target;
    const msysMatch = target.match(/^\/([A-Za-z])(?:\/(.*))?$/);
    if (!msysMatch) return target;
    const drive = msysMatch[1].toUpperCase();
    const rest = (msysMatch[2] || '').replace(/\//g, '\\');
    return rest ? `${drive}:\\${rest}` : `${drive}:\\`;
}

function countTarget(target, remaining) {
    if (remaining <= 0) return 0;
    target = normalizeTargetPath(target);
    let stat;
    try {
        stat = fs.lstatSync(target);
    } catch (error) {
        if (error && error.code === 'ENOENT') return 0;
        fail(`failed to stat target: ${target}`);
    }
    if (!stat.isDirectory() || stat.isSymbolicLink()) return 1;

    let dir;
    try {
        dir = fs.opendirSync(target);
    } catch (_) {
        fail(`failed to read directory: ${target}`);
    }
    let count = 0;
    try {
        for (;;) {
            if (count >= remaining) break;
            const entry = dir.readSync();
            if (!entry) break;
            if (entry.isDirectory() && !entry.isSymbolicLink()) {
                count += countTarget(path.join(target, entry.name), remaining - count);
            } else {
                count += 1;
            }
        }
    } finally {
        try { dir.closeSync(); } catch (_) { /* best effort */ }
    }
    return count;
}

function countTargets(targets, limit) {
    let count = 0;
    for (const target of targets) {
        if (count >= limit) break;
        count += countTarget(target, limit - count);
    }
    return count;
}

function checkSafeDeleteBulkGuard(context, targets) {
    if (!targets || targets.length === 0) fail('check requires at least one target');
    let decision = { kind: 'allow' };
    withLock(context, statePath => {
        const now = Date.now();
        const state = readState(statePath);
        const pruned = pruneExpired(state, now);
        const rejection = normalizeRequestRejection(state.requestRejections && state.requestRejections[context.requestId], now);
        if (rejection.rejected) {
            decision = {
                kind: 'rejected',
                payload: {
                    count: rejection.count,
                    threshold: rejection.threshold,
                    scope: 'turn',
                    targets: rejection.targets,
                    targetCount: rejection.targetCount,
                },
            };
            if (pruned) writeState(statePath, state);
            return;
        }
        const request = normalizeRequest(state.requests[context.requestId], now);
        const approval = normalizeToolApproval(state.toolApprovals[context.toolCallId], now);
        const deleteCount = countTargets(targets, DISPLAY_COUNT_LIMIT);
        if (deleteCount === 0) {
            if (pruned) writeState(statePath, state);
            return;
        }
        const totalCount = request.count + deleteCount;
        if (approval.approved) {
            state.requests[context.requestId] = { count: totalCount, updatedAt: now };
            writeState(statePath, state);
            return;
        }
        if (totalCount >= context.threshold) {
            decision = {
                kind: 'confirmRequired',
                payload: {
                    count: totalCount,
                    threshold: context.threshold,
                    scope: 'turn',
                    targets: targets.slice(0, TARGET_SAMPLE_LIMIT),
                    targetCount: targets.length,
                },
            };
            if (pruned) writeState(statePath, state);
            return;
        }
        state.requests[context.requestId] = { count: totalCount, updatedAt: now };
        writeState(statePath, state);
    });
    return decision;
}

function signalFilePath(context) {
    return path.join(context.sessionDir, `signal-${context.toolCallId}.json`);
}

function writeSignalFile(context, signal) {
    try {
        fs.mkdirSync(context.sessionDir, { recursive: true });
        const tmpPath = `${signalFilePath(context)}.${process.pid}.tmp`;
        fs.writeFileSync(tmpPath, `${JSON.stringify(signal)}\n`, 'utf-8');
        fs.renameSync(tmpPath, signalFilePath(context));
    } catch (_) {
        // Best-effort: stderr marker is the fallback.
    }
}

function handleCheck(args) {
    if (args.targets.length === 0) fail('check requires at least one --target');
    const context = getContext();
    const decision = checkSafeDeleteBulkGuard(context, args.targets);
    if (decision.kind === 'confirmRequired') {
        writeSignalFile(context, { type: 'confirmRequired', payload: decision.payload });
        process.stderr.write(`${CONFIRM_MARKER} ${JSON.stringify(decision.payload)}\n`);
        process.exit(2);
    }
    if (decision.kind === 'rejected') {
        writeSignalFile(context, { type: 'rejected', payload: decision.payload });
        process.stderr.write(`${REJECTED_MARKER} ${JSON.stringify(decision.payload)}\n`);
        process.exit(3);
    }
}

function approveSafeDeleteBulkGuard(context, scope) {
    if (scope && scope !== 'turn') fail('approve requires scope turn');
    withLock(context, statePath => {
        const now = Date.now();
        const state = readState(statePath);
        pruneExpired(state, now);
        state.toolApprovals[context.toolCallId] = { approved: true, updatedAt: now };
        writeState(statePath, state);
    });
}

function rejectSafeDeleteBulkGuard(context, payload) {
    const normalized = normalizeRequestRejection({ ...payload, rejected: true }, Date.now());
    withLock(context, statePath => {
        const now = Date.now();
        const state = readState(statePath);
        pruneExpired(state, now);
        state.requests[context.requestId] = {
            count: normalized.count,
            updatedAt: now,
        };
        state.requestRejections[context.requestId] = {
            rejected: true,
            updatedAt: now,
            count: normalized.count,
            threshold: normalized.threshold,
            targets: normalized.targets,
            targetCount: normalized.targetCount,
        };
        delete state.toolApprovals[context.toolCallId];
        writeState(statePath, state);
    });
}

function handleApprove(args) {
    if (args.scope && args.scope !== 'turn') fail('approve requires scope turn');
    approveSafeDeleteBulkGuard(getContext(), args.scope);
}

function main() {
    const args = parseArgs(process.argv);
    if (args.command === 'check') return handleCheck(args);
    if (args.command === 'approve') return handleApprove(args);
    fail(`unknown command: ${args.command || '(empty)'}`);
}

module.exports = {
    approveSafeDeleteBulkGuard,
    checkSafeDeleteBulkGuard,
    createSafeDeleteBulkGuardContext,
    rejectSafeDeleteBulkGuard,
    DEFAULT_THRESHOLD,
    CONFIRM_MARKER,
    REJECTED_MARKER,
    ERROR_MARKER,
};

if (require.main === module) {
    try {
        main();
    } catch (error) {
        process.stderr.write(`${ERROR_MARKER} ${error && error.message ? error.message : String(error)}\n`);
        process.exit(1);
    }
}
