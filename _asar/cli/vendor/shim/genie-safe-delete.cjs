/**
 * genie-safe-delete — Node.js 运行时安全删除 shim
 *
 * 通过 NODE_OPTIONS="--require=genie-safe-delete.cjs" 注入，
 * 拦截 fs 删除 API，把文件移入操作系统的回收站而不是真删。
 *
 * - macOS：python3 ctypes 调 CoreServices.FSMoveObjectToTrashSync
 * - Windows：powershell 调 Microsoft.VisualBasic.FileIO.FileSystem
 * - Linux：实现 freedesktop Trash spec（~/.local/share/Trash/）
 *
 * 设计要点见 apps/workbuddy-desktop/docs/safe-delete-runtime-trash.md
 */

'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');
const url = require('url');
const { execFileSync } = require('child_process');

// ---------------------------------------------------------------------------
// 触发条件：会话 ID 缺失则零开销退出
// ---------------------------------------------------------------------------

const SESSION_ID = process.env.CODEBUDDY_SESSION_ID
    || process.env.CLAUDE_SESSION_ID;

if (!SESSION_ID) {
    return;
}

// ---------------------------------------------------------------------------
// 全局状态
// ---------------------------------------------------------------------------

const PLATFORM = process.platform; // 'darwin' | 'win32' | 'linux' | ...
const REPORT_PATH = process.env.CODEBUDDY_SAFE_DELETE_REPORT_PATH;

function normalizePathForCompare(filePath) {
    let resolved = path.resolve(filePath);
    try {
        resolved = fs.realpathSync.native(resolved);
    } catch (_) {
        try {
            resolved = fs.realpathSync(resolved);
        } catch (_) {
            // Keep path.resolve fallback for missing or inaccessible paths.
        }
    }
    return PLATFORM === 'win32' ? resolved.toLowerCase() : resolved;
}

function isUsableTempRoot(filePath) {
    try {
        const resolved = path.resolve(filePath);
        if (path.parse(resolved).root === resolved) return false;
        return fs.statSync(resolved).isDirectory();
    } catch (_) {
        return false;
    }
}

function buildOsTmpDirs() {
    const candidates = [
        os.tmpdir(),
    ];
    if (PLATFORM !== 'win32') {
        candidates.push('/tmp');
        candidates.push('/private/tmp');
    }

    const roots = [];
    const seen = new Set();
    for (const candidate of candidates) {
        if (!candidate || !isUsableTempRoot(candidate)) continue;
        const root = normalizePathForCompare(candidate);
        if (seen.has(root)) continue;
        seen.add(root);
        roots.push(root);
    }
    return roots;
}

const OS_TMP_DIRS = buildOsTmpDirs();

function isUnderAnyTempDir(absPath, roots) {
    const target = normalizePathForCompare(absPath);
    return roots.some(root => {
        const rel = path.relative(root, target);
        return !!rel && rel !== '..' && !rel.startsWith(`..${path.sep}`) && !path.isAbsolute(rel);
    });
}

function buildNpmCacheTmpDirs() {
    const candidates = [];
    const configuredCache = process.env.npm_config_cache || process.env.NPM_CONFIG_CACHE;
    if (configuredCache) {
        candidates.push(path.join(configuredCache, '_cacache', 'tmp'));
    }

    if (PLATFORM === 'win32') {
        const localAppData = process.env.LOCALAPPDATA;
        if (localAppData) candidates.push(path.join(localAppData, 'npm-cache', '_cacache', 'tmp'));
    } else {
        const homeDir = os.homedir();
        if (homeDir) candidates.push(path.join(homeDir, '.npm', '_cacache', 'tmp'));
    }

    const roots = [];
    const seen = new Set();
    for (const candidate of candidates) {
        if (!candidate || !isUsableTempRoot(candidate)) continue;
        const root = normalizePathForCompare(candidate);
        if (seen.has(root)) continue;
        seen.add(root);
        roots.push(root);
    }
    return roots;
}

const NPM_CACHE_TMP_DIRS = buildNpmCacheTmpDirs();
const WORKBUDDY_CONFIG_DIRS = [
    process.env.WORKBUDDY_CONFIG_DIR,
    process.env.CODEBUDDY_CONFIG_DIR,
].filter(candidate => candidate && candidate.trim())
    .map(candidate => normalizePathForCompare(candidate.trim()));
const NPM_CACHE_LOG_DIRS = [
    PLATFORM === 'win32' && process.env.LOCALAPPDATA
        ? path.join(process.env.LOCALAPPDATA, 'npm-cache', '_logs')
        : null,
    PLATFORM !== 'win32' && os.homedir()
        ? path.join(os.homedir(), '.npm', '_logs')
        : null,
    ...WORKBUDDY_CONFIG_DIRS.map(configDir =>
        path.join(configDir, 'binaries', 'node', 'cli-connector-cache', '_logs')
    ),
].filter(Boolean).map(root => normalizePathForCompare(root));

function isNpmCacheLogFile(absPath) {
    const target = normalizePathForCompare(absPath);
    const baseName = path.basename(target);
    if (!baseName.toLowerCase().endsWith('.log')) return false;
    const parent = normalizePathForCompare(path.dirname(target));
    return NPM_CACHE_LOG_DIRS.includes(parent);
}

function isManagedNodeStagingName(name) {
    const match = name.match(/^\.[^/\\]+-([A-Za-z0-9_-]{6,})$/);
    return !!match && /[A-Za-z]/.test(match[1]) && /\d/.test(match[1]);
}

function isManagedNodeStagingRoot(parts, nodeModulesIndex) {
    if (parts[nodeModulesIndex] !== 'node_modules') return false;
    const stagingName = parts[nodeModulesIndex + 1];
    if (!stagingName || !isManagedNodeStagingName(stagingName)) return false;
    return (parts[2] === 'versions' && nodeModulesIndex === 4)
        || (parts[2] === 'cli-connector-packages' && nodeModulesIndex >= 3);
}

function isWorkBuddyManagedNodeInstallStagingPath(absPath) {
    const target = normalizePathForCompare(absPath);
    return WORKBUDDY_CONFIG_DIRS.some(configDir => {
        const rel = path.relative(configDir, target);
        if (!rel || rel === '..' || rel.startsWith(`..${path.sep}`) || path.isAbsolute(rel)) {
            return false;
        }

        const parts = rel.split(path.sep).filter(Boolean);
        if (parts[0] !== 'binaries' || parts[1] !== 'node') return false;
        return parts.some((part, index) => part === 'node_modules' && isManagedNodeStagingRoot(parts, index));
    });
}

function shouldUseNativeDelete(absPath) {
    return isUnderAnyTempDir(absPath, OS_TMP_DIRS)
        || isUnderAnyTempDir(absPath, NPM_CACHE_TMP_DIRS)
        || isNpmCacheLogFile(absPath)
        || isWorkBuddyManagedNodeInstallStagingPath(absPath);
}

function recordTrash(absPath) {
    if (!REPORT_PATH) return;
    try {
        fs.appendFileSync(
            REPORT_PATH,
            JSON.stringify({
                operation: 'trash',
                runtime: 'node',
                path: absPath,
                timestamp: Date.now(),
            }) + '\n',
            'utf8',
        );
    } catch (_) {
        // Reporting is best-effort and must never change delete semantics.
    }
}

function checkBulkDeleteGuard(absPath) {
    const guardPath = process.env.CODEBUDDY_SAFE_DELETE_BULK_GUARD;
    const nodeBin = process.env.CODEBUDDY_NODE_BIN;
    if (!process.env.CODEBUDDY_SAFE_DELETE_BULK_STATE_DIR || !process.env.CODEBUDDY_TOOL_CALL_ID) {
        return;
    }
    if (!guardPath || !nodeBin || !fs.existsSync(guardPath)) {
        throw new Error(`[safe-delete][SAFE_DELETE_BULK_GUARD_ERROR] msg=helper-unavailable guard=${guardPath || 'unset'}`);
    }
    try {
        execFileSync(nodeBin, [guardPath, 'check', '--target', absPath], {
            stdio: ['ignore', 'ignore', 'pipe'],
            timeout: 10_000,
            windowsHide: true,
            env: {
                ...process.env,
                NODE_OPTIONS: '',
            },
        });
    } catch (e) {
        const detail = e && e.stderr ? String(e.stderr).trim() : '';
        if (detail) {
            throw new Error(detail);
        }
        throw new Error(`[safe-delete][SAFE_DELETE_BULK_GUARD_ERROR] ${(e && e.message) || String(e)}`);
    }
}

// ---------------------------------------------------------------------------
// 平台分发
// ---------------------------------------------------------------------------

// ---- 解析 genie-trash binary 路径 ----
// 优先使用 GENIE_TRASH_DIR 环境变量（由 buildSafeDeleteEnv() 注入），
// 解决打包后 extraResources（<Resources>/vendor/genie-trash/）与
// shim（app.asar.unpacked/cli/vendor/shim/）不共父目录的路径错位问题。
// 开发环境 fallback: ../genie-trash/ 相对 __dirname
function resolveTrashBin() {
    const ext = PLATFORM === 'win32' ? '.exe' : '';
    const fileName = `${PLATFORM}-${process.arch}${ext}`;
    if (process.env.GENIE_TRASH_DIR) {
        return path.join(process.env.GENIE_TRASH_DIR, fileName);
    }
    return path.resolve(__dirname, '..', 'genie-trash', fileName);
}

// ---- 尝试 native binary，不可用则降级 ----
let _trashBinAvailable = null; // null=未探测, true=可用, false=不可用

function trashViaBinary(absPath) {
    if (_trashBinAvailable === false) return false; // 已知不可用，快速短路
    try {
        execFileSync(resolveTrashBin(), [absPath], {
            stdio: ['ignore', 'pipe', 'pipe'],
            timeout: 5_000,
        });
        _trashBinAvailable = true;
        return true;
    } catch (e) {
        // ENOENT：binary 不存在，进程生命周期内不会凭空出现，缓存禁用
        if (e.code === 'ENOENT') {
            _trashBinAvailable = false;
            return false;
        }
        // EACCES：权限问题可能是临时状态（如 chmod +x 后恢复），不缓存
        if (e.code === 'EACCES') {
            return false;
        }
        // binary 已启动但对该路径操作失败（exit code 1）或超时——向上抛，不真删
        const detail = e.stderr ? e.stderr.toString().trim() : '';
        throw new Error(`[safe-delete] 操作失败: ${detail || e.message}`);
    }
}

/**
 * 把文件/目录移入系统回收站。
 * 优先 native binary（性能最优），不可用时自动降级到平台实现。
 * 同步调用，失败抛错（调用方捕获后 fallback 到原生删除）。
 *
 * @param {string} absPath 绝对路径
 */
function trashItem(absPath) {
    // 优先 native binary
    if (trashViaBinary(absPath)) return;

    // ---- 降级：当前平台实现（全部保留） ----
    if (PLATFORM === 'darwin') {
        return trashOnMac(absPath);
    }
    if (PLATFORM === 'win32') {
        return trashOnWindows(absPath);
    }
    // linux / freebsd / 其它 POSIX
    return trashOnFreedesktop(absPath);
}

// ----- macOS -----

const DARWIN_TRASH_PYTHON_SCRIPT = `
import os
import sys
from ctypes import Structure, byref, c_char, c_char_p, cdll
from ctypes.util import find_library

path = sys.argv[1]
foundation_path = find_library("Foundation")
coreservices_path = find_library("CoreServices")
if not foundation_path or not coreservices_path:
    print("Foundation/CoreServices unavailable", file=sys.stderr)
    sys.exit(1)

Foundation = cdll.LoadLibrary(foundation_path)
CoreServices = cdll.LoadLibrary(coreservices_path)
GetMacOSStatusCommentString = Foundation.GetMacOSStatusCommentString
GetMacOSStatusCommentString.restype = c_char_p
FSPathMakeRefWithOptions = CoreServices.FSPathMakeRefWithOptions
FSMoveObjectToTrashSync = CoreServices.FSMoveObjectToTrashSync

class FSRef(Structure):
    _fields_ = [("hidden", c_char * 80)]

def status_to_message(code: int) -> str:
    raw = GetMacOSStatusCommentString(code)
    if not raw:
        return f"OSStatus {code}"
    return raw.decode("utf-8", errors="replace")

path_b = os.fsencode(path)
fp = FSRef()
rc = FSPathMakeRefWithOptions(path_b, 0x01, byref(fp), None)
if rc:
    print(status_to_message(rc), file=sys.stderr)
    sys.exit(1)

rc = FSMoveObjectToTrashSync(byref(fp), None, 0)
if rc:
    print(status_to_message(rc), file=sys.stderr)
    sys.exit(1)
`.trim();

function pathStillExists(absPath) {
    if (fs.existsSync(absPath)) {
        return true;
    }
    try {
        // existsSync 对 dangling symlink 返回 false，lstat 可识别该场景。
        fs.lstatSync(absPath);
        return true;
    } catch (_) {
        return false;
    }
}

function trashOnMac(absPath) {
    execFileSync('python3', ['-', absPath], {
        input: DARWIN_TRASH_PYTHON_SCRIPT,
        stdio: ['pipe', 'ignore', 'pipe'],
        timeout: 10_000,
    });
    // API 调用成功后追加存在性校验：路径仍在原处视为失败（fail-closed）。
    if (pathStillExists(absPath)) {
        throw new Error('File still exists after python ctypes trash command');
    }
}

// ----- Windows -----

function trashOnWindows(absPath) {
    // 用 Microsoft.VisualBasic.FileIO.FileSystem 的 SendToRecycleBin 选项
    // 它对文件和目录有不同的 API：DeleteFile / DeleteDirectory
    const stat = fs.lstatSync(absPath);
    const method = stat.isDirectory() ? 'DeleteDirectory' : 'DeleteFile';
    // 路径中的单引号需双写（PowerShell 单引号字符串）
    const escaped = absPath.replace(/'/g, "''");
    const script = [
        '$ErrorActionPreference = "Stop"',
        'Add-Type -AssemblyName Microsoft.VisualBasic',
        `[Microsoft.VisualBasic.FileIO.FileSystem]::${method}('${escaped}',`
            + ' [Microsoft.VisualBasic.FileIO.UIOption]::OnlyErrorDialogs,'
            + ' [Microsoft.VisualBasic.FileIO.RecycleOption]::SendToRecycleBin)',
    ].join('; ');
    execFileSync('powershell', ['-NoProfile', '-NonInteractive', '-Command', script], {
        stdio: ['ignore', 'ignore', 'pipe'],
        timeout: 15_000,
        windowsHide: true,
    });
}

// ----- Linux freedesktop -----

const HOME = os.homedir();
const XDG_DATA_HOME = process.env.XDG_DATA_HOME || path.join(HOME, '.local', 'share');
const TRASH_FILES = path.join(XDG_DATA_HOME, 'Trash', 'files');
const TRASH_INFO = path.join(XDG_DATA_HOME, 'Trash', 'info');

let _dirsEnsured = false;

function trashOnFreedesktop(absPath) {
    // freedesktop spec 要求 trash 目录权限 0700
    if (!_dirsEnsured) {
        fs.mkdirSync(TRASH_FILES, { recursive: true, mode: 0o700 });
        fs.mkdirSync(TRASH_INFO, { recursive: true, mode: 0o700 });
        _dirsEnsured = true;
    }

    const baseName = path.basename(absPath);
    // writeTrashInfo 内部使用原子 wx 写入 + EEXIST 重试，消除 TOCTOU 窗口
    const { destFiles, destInfo } = writeTrashInfo(absPath, baseName);

    try {
        fs.renameSync(absPath, destFiles);
    } catch (e) {
        if (e.code === 'EXDEV') {
            // 跨设备：copy + delete 回退（参照 Python send2trash 的 shutil.move 回退）
            try {
                const st = fs.lstatSync(absPath);
                if (st.isDirectory()) {
                    copyRecursiveSync(absPath, destFiles);
                    origRmSync
                        ? origRmSync(absPath, { recursive: true, force: true })
                        : removeRecursiveSync(absPath);
                } else {
                    fs.copyFileSync(absPath, destFiles);
                    origUnlinkSync(absPath);
                }
                return;
            } catch (copyErr) {
                // copy 也失败 / 源删除失败 → 清理 trashinfo 和已复制到 trash 的文件
                try { origUnlinkSync(destInfo); } catch (_) { /* ignore */ }
                try {
                    if (fs.existsSync(destFiles)) {
                        origRmSync
                            ? origRmSync(destFiles, { recursive: true, force: true })
                            : removeRecursiveSync(destFiles);
                    }
                } catch (_) { /* ignore */ }
                throw copyErr;
            }
        }
        // 其他错误（权限不足等）→ 清理 trashinfo，向上抛
        try { origUnlinkSync(destInfo); } catch (_) { /* ignore */ }
        throw e;
    }
}

/**
 * 递归删除目录（origRmSync 不可用时的回退）。
 */
function removeRecursiveSync(dirPath) {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    for (const entry of entries) {
        const full = path.join(dirPath, entry.name);
        if (entry.isDirectory()) {
            removeRecursiveSync(full);
        } else {
            origUnlinkSync(full);
        }
    }
    origRmdirSync(dirPath);
}

/**
 * 递归复制目录（fs.cpSync 不可用时的回退，Node < 16.7）。
 */
function copyRecursiveSync(src, dest) {
    if (fs.cpSync) {
        fs.cpSync(src, dest, { recursive: true });
        return;
    }
    fs.mkdirSync(dest, { recursive: true });
    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (const entry of entries) {
        const srcFull = path.join(src, entry.name);
        const destFull = path.join(dest, entry.name);
        if (entry.isDirectory()) {
            copyRecursiveSync(srcFull, destFull);
        } else {
            fs.copyFileSync(srcFull, destFull);
        }
    }
}

/**
 * 写入 .trashinfo 文件并返回 dest 路径。
 *
 * 使用原子 writeFileSync('wx') + EEXIST 重试，缩小 existsSync→write 之间的
 * TOCTOU 窗口（另一进程在检查与写入之间创建同名文件时可重试）。
 *
 * 命名策略: baseName, baseName.2, baseName.3, ...（freedesktop spec 兼容）
 *
 * @param {string} absPath  原始文件绝对路径（用于写入 trashinfo 的 Path 字段）
 * @param {string} baseName 文件名（不含目录），用于构造 trash 中的目标名
 * @returns {{ destFiles: string, destInfo: string, trashedName: string }}
 */
function writeTrashInfo(absPath, baseName) {
    const deletionDate = new Date().toISOString().replace(/\.\d{3}Z$/, '');
    const escapedPath = absPath.split('/').map(s => {
        return s.replace(/[^\x20-\x7E]/g, c => encodeURIComponent(c));
    }).join('/');
    const info = `[Trash Info]\nPath=${escapedPath}\nDeletionDate=${deletionDate}\n`;

    let name = baseName;
    let i = 2;
    const nextName = () => {
        name = `${baseName}.${i++}`;
        if (i > 1000) {
            throw new Error('Too many trash name conflicts');
        }
    };
    while (true) {
        const destFiles = path.join(TRASH_FILES, name);
        const destInfo = path.join(TRASH_INFO, name + '.trashinfo');
        // 半残留场景：files 存在但 info 缺失，必须避开，避免后续 rename 覆盖旧文件
        if (fs.existsSync(destFiles)) {
            nextName();
            continue;
        }
        try {
            // wx：原子创建，若文件已存在抛 EEXIST → 自增重试
            fs.writeFileSync(destInfo, info, { flag: 'wx', mode: 0o600 });
            // 竞争窗口：若另一进程在本次写入后创建了同名 files，删除刚写入的 info 并重试
            if (fs.existsSync(destFiles)) {
                try { origUnlinkSync(destInfo); } catch (_) { /* ignore */ }
                nextName();
                continue;
            }
            return { destFiles, destInfo, trashedName: name };
        } catch (e) {
            if (e.code === 'EEXIST') {
                nextName();
                continue;
            }
            throw e;
        }
    }
}

// ---------------------------------------------------------------------------
// 核心：尝试移入回收站。失败/超限时返回 false，调用方走原生删除。
// ---------------------------------------------------------------------------

/**
 * 把文件/目录移入系统回收站。失败时抛错（fail-closed），不降级真删。
 * @param {string} absPath 绝对路径
 */
function tryTrash(absPath) {
    checkBulkDeleteGuard(absPath);
    trashItem(absPath); // 成功静默；失败抛错，调用方不应继续真删
    recordTrash(absPath);
    return true;
}

// ---------------------------------------------------------------------------
// fs 入口包装
// ---------------------------------------------------------------------------

// 保存原始引用（必须在所有 patch 之前）
const origUnlinkSync = fs.unlinkSync.bind(fs);
const origRmdirSync = fs.rmdirSync.bind(fs);
const origRmSync = fs.rmSync ? fs.rmSync.bind(fs) : null;

const origUnlink = fs.unlink.bind(fs);
const origRmdir = fs.rmdir.bind(fs);
const origRm = fs.rm ? fs.rm.bind(fs) : null;

const origPromisesUnlink = fs.promises ? fs.promises.unlink.bind(fs.promises) : null;
const origPromisesRmdir = fs.promises ? fs.promises.rmdir.bind(fs.promises) : null;
const origPromisesRm = fs.promises && fs.promises.rm ? fs.promises.rm.bind(fs.promises) : null;

// ----- 简单入口（unlink / rmdir）-----

/**
 * 将 fs API 的 filePath 参数转为绝对路径。
 * 处理 URL 对象（如 new URL('file:///tmp/x')），避免 String(URL) 产生无效路径绕过 shim。
 * @param {string|Buffer|URL} filePath
 * @returns {string} 绝对路径
 */
function toAbsPath(filePath) {
    if (filePath instanceof URL) {
        return url.fileURLToPath(filePath);
    }
    // 防御跨 VM context 的 URL 对象（instanceof 跨 realm 返回 false）
    if (filePath && typeof filePath === 'object' && filePath.href && typeof filePath.protocol === 'string') {
        return url.fileURLToPath(filePath);
    }
    return path.resolve(String(filePath));
}

function makeSyncWrapper(orig, requireDir) {
    return function (filePath, ...rest) {
        const absPath = toAbsPath(filePath);
        if (shouldUseNativeDelete(absPath)) return orig(filePath, ...rest);
        if (requireDir) {
            const st = safeLstat(absPath);
            if (st === null) return orig(filePath, ...rest); // ENOENT → 原生抛
            if (!st) { /* EACCES/ELOOP：无法 stat，跳过类型检查直接尝试 trash */ }
            else {
                if (!st.isDirectory()) return orig(filePath, ...rest); // ENOTDIR
                // rmdirSync 不带 {recursive: true} 时，非空目录交还原生抛 ENOTEMPTY
                // 带 {recursive: true} 时跳过 isDirEmpty 检查，让 tryTrash 处理整个目录树
                const opts = rest[0];
                if (!(opts && opts.recursive) && !isDirEmpty(absPath)) return orig(filePath, ...rest);
            }
        } else {
            const st = safeLstat(absPath);
            if (st === null) return orig(filePath, ...rest); // ENOENT
            if (st && st.isDirectory()) return orig(filePath, ...rest); // EISDIR（stat 成功 + 是目录）
        }

        tryTrash(absPath); // 失败时抛错，不调 orig（fail-closed）
        return undefined;
    };
}

/**
 * 安全的 lstat：区分 ENOENT（文件不存在）和其他错误（EACCES/ELOOP 等）。
 * @returns {object|null|undefined}
 *   Stats 对象 — 成功
 *   null — 文件不存在 (ENOENT)
 *   undefined — 无法获取状态（EACCES/ELOOP 等），调用方应回退原生
 */
function safeLstat(absPath) {
    try { return fs.lstatSync(absPath); } catch (e) {
        if (e.code === 'ENOENT') return null;
        return undefined;
    }
}

function isDirEmpty(absPath) {
    try { return fs.readdirSync(absPath).length === 0; } catch (_) { return false; }
}

function makeCallbackWrapper(orig, requireDir) {
    return function (filePath, ...rest) {
        const cb = rest[rest.length - 1];
        // 保持 Node callback API 参数校验语义：
        // callback 缺失/非函数时交还原生抛 ERR_INVALID_ARG_TYPE，
        // 不应在参数非法时触发 safe-delete。
        if (typeof cb !== 'function') {
            return orig(filePath, ...rest);
        }
        const absPath = toAbsPath(filePath);
        if (shouldUseNativeDelete(absPath)) return orig(filePath, ...rest);

        const st = safeLstat(absPath);
        if (st === null) return orig(filePath, ...rest); // ENOENT → 原生抛
        if (st) {
            if (requireDir && !st.isDirectory()) return orig(filePath, ...rest);
            if (!requireDir && st.isDirectory()) return orig(filePath, ...rest);
        }
        // rmdir 不带 {recursive: true} 时，非空目录交还原生抛 ENOTEMPTY
        // rest 可能是 [callback] 或 [options, callback]
        const opts = rest[0] && typeof rest[0] === 'object' ? rest[0] : null;
        if (requireDir && st && !(opts && opts.recursive) && !isDirEmpty(absPath)) return orig(filePath, ...rest);

        try {
            tryTrash(absPath);
        } catch (e) {
            if (typeof cb === 'function') {
                process.nextTick(() => cb(e));
                return;
            }
            throw e;
        }
        if (typeof cb === 'function') process.nextTick(() => cb(null));
    };
}

function makePromiseWrapper(orig, requireDir) {
    return async function (filePath, ...rest) {
        const absPath = toAbsPath(filePath);
        if (shouldUseNativeDelete(absPath)) return orig(filePath, ...rest);
        const st = safeLstat(absPath);
        if (st === null) return orig(filePath, ...rest); // ENOENT → 原生抛
        if (st) {
            if (requireDir && !st.isDirectory()) return orig(filePath, ...rest);
            if (!requireDir && st.isDirectory()) return orig(filePath, ...rest);
        }
        // rmdir 不带 {recursive: true} 时，非空目录交还原生抛 ENOTEMPTY
        const opts = rest[0] || null;
        if (requireDir && st && !(opts && opts.recursive) && !isDirEmpty(absPath)) return orig(filePath, ...rest);

        tryTrash(absPath); // 失败抛错 → async 函数自动转 rejected Promise（fail-closed）
        return undefined;
    };
}

// ----- rm / rmSync / promises.rm（支持 recursive / force）-----

/**
 * @returns {{ done: boolean }}
 *   done=true  → 已移入回收站，调用方返回成功
 *   done=false → 前置条件不满足（ENOENT / stat 错误 / 非 recursive 删目录），调用方走原生
 *   throws     → 回收站操作失败（fail-closed），调用方不得真删
 */
function tryRm(absPath, opts) {
    if (shouldUseNativeDelete(absPath)) {
        return { done: false };
    }

    const recursive = !!(opts && opts.recursive);
    const force = !!(opts && opts.force);

    const st = safeLstat(absPath);
    // st === null：文件不存在 (ENOENT)
    if (st === null) {
        if (force) return { done: true }; // force + 不存在 = 静默成功
        return { done: false }; // 让原生抛 ENOENT
    }
    // st === undefined：EACCES/ELOOP 等 stat 错误 → 仍尝试移入回收站
    // 不降级真删：文件可能可通过 trash 路径处理（如权限允许 rename 但不允许 lstat），
    // 若 trash 也失败则抛错（fail-closed），与 makeSyncWrapper / makeCallbackWrapper 一致
    if (!st) {
        tryTrash(absPath);
        return { done: true };
    }

    // 非 recursive 删目录 → 让原生抛 EISDIR / ENOTEMPTY
    if (st.isDirectory() && !recursive) {
        return { done: false };
    }

    tryTrash(absPath); // 失败时抛错（fail-closed）
    return { done: true };
}

function wrappedRmSync(filePath, options) {
    const absPath = toAbsPath(filePath);
    const r = tryRm(absPath, options || {});
    if (r.done) return undefined;
    return origRmSync(filePath, options);
}

function wrappedRm(filePath, options, callback) {
    let opts, cb;
    if (typeof options === 'function') { opts = {}; cb = options; }
    else { opts = options || {}; cb = callback; }

    // 保持 Node callback API 参数校验语义：
    // fs.rm 的 callback 必填，缺失/非函数时应先报参数错，
    // 且不触发任何删除动作（包括 safe-delete / 真删）。
    if (typeof cb !== 'function') {
        const err = new TypeError('The "cb" argument must be of type function.');
        err.code = 'ERR_INVALID_ARG_TYPE';
        throw err;
    }

    const absPath = toAbsPath(filePath);
    let r;
    try {
        r = tryRm(absPath, opts);
    } catch (e) {
        // trash 失败（fail-closed）：传给 callback 或同步抛出
        if (typeof cb === 'function') return process.nextTick(() => cb(e));
        throw e;
    }

    if (r.done) {
        if (typeof cb === 'function') return process.nextTick(() => cb(null));
        return undefined;
    }
    return origRm(filePath, options, callback);
}

async function wrappedPromisesRm(filePath, options) {
    const absPath = toAbsPath(filePath);
    const r = tryRm(absPath, options || {});
    if (r.done) return undefined;
    return origPromisesRm(filePath, options);
}

// ---------------------------------------------------------------------------
// 安装 patch
// ---------------------------------------------------------------------------

fs.unlinkSync = makeSyncWrapper(origUnlinkSync, false);
fs.rmdirSync = makeSyncWrapper(origRmdirSync, true);
if (origRmSync) fs.rmSync = wrappedRmSync;

fs.unlink = makeCallbackWrapper(origUnlink, false);
fs.rmdir = makeCallbackWrapper(origRmdir, true);
if (origRm) fs.rm = wrappedRm;

if (fs.promises) {
    fs.promises.unlink = makePromiseWrapper(origPromisesUnlink, false);
    fs.promises.rmdir = makePromiseWrapper(origPromisesRmdir, true);
    if (origPromisesRm) fs.promises.rm = wrappedPromisesRm;
}
