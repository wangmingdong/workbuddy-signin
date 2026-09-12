#!/bin/bash
# Shared safe-delete implementation for rm / unlink / rmdir wrappers.

set -o pipefail

REAL_RM="${SAFE_DELETE_REAL_RM:-/bin/rm}"
[ -x "$REAL_RM" ] || REAL_RM="/usr/bin/rm"
REAL_UNLINK="${SAFE_DELETE_REAL_UNLINK:-/usr/bin/unlink}"
[ -x "$REAL_UNLINK" ] || REAL_UNLINK="/bin/unlink"
REAL_RMDIR="${SAFE_DELETE_REAL_RMDIR:-/bin/rmdir}"
[ -x "$REAL_RMDIR" ] || REAL_RMDIR="/usr/bin/rmdir"

OS="$(uname -s)"
NOW="$(date -u +%Y-%m-%dT%H:%M:%S)"
SAFE_DELETE_BIN_DIR="$(CDPATH= cd -- "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

_safe_delete_one_line() {
    printf '%s' "$1" | tr '\n\r' '  '
}

_safe_delete_diag() {
    echo "[safe-delete][diag] $*" >&2
}

safe_delete_json_string() {
    local value="$1"
    if command -v python3 >/dev/null 2>&1; then
        python3 -c 'import json,sys; print(json.dumps(sys.argv[1], ensure_ascii=False))' "$value" 2>/dev/null && return 0
    fi
    if command -v python >/dev/null 2>&1; then
        python -c 'import json,sys; print(json.dumps(sys.argv[1], ensure_ascii=False))' "$value" 2>/dev/null && return 0
    fi
    local escaped
    escaped="$(printf '%s' "$value" | sed 's/\\/\\\\/g; s/"/\\"/g')"
    printf '"%s"' "$escaped"
}

safe_delete_record_trash() {
    local p="$1"
    [ -n "${CODEBUDDY_SAFE_DELETE_REPORT_PATH:-}" ] || return 0
    local path_json timestamp
    path_json="$(safe_delete_json_string "$p")"
    timestamp="$(date +%s 2>/dev/null || printf '0')"
    printf '{"operation":"trash","runtime":"bash","path":%s,"timestamp":%s}\n' \
        "$path_json" "$timestamp" >> "$CODEBUDDY_SAFE_DELETE_REPORT_PATH" 2>/dev/null || true
}

safe_delete_bulk_guard_check() {
    [ "$#" -gt 0 ] || return 0
    [ -n "${CODEBUDDY_SAFE_DELETE_BULK_STATE_DIR:-}" ] || return 0
    [ -n "${CODEBUDDY_TOOL_CALL_ID:-}" ] || return 0
    if [ -z "${CODEBUDDY_NODE_BIN:-}" ] || [ -z "${CODEBUDDY_SAFE_DELETE_BULK_GUARD:-}" ] || [ ! -f "$CODEBUDDY_SAFE_DELETE_BULK_GUARD" ]; then
        echo "[safe-delete][SAFE_DELETE_BULK_GUARD_ERROR] msg=helper-unavailable guard=${CODEBUDDY_SAFE_DELETE_BULK_GUARD:-unset}" >&2
        return 1
    fi

    local args=()
    local p
    for p in "$@"; do
        args+=(--target "$(safe_delete_abs_path "$p")")
    done
    NODE_OPTIONS= "$CODEBUDDY_NODE_BIN" "$CODEBUDDY_SAFE_DELETE_BULK_GUARD" check "${args[@]}"
}

is_dir_empty() {
    local p="$1"
    [ -z "$(ls -A "$p" 2>/dev/null)" ]
}

safe_delete_normalize_path() {
    local p="$1"
    while [ "$p" != "/" ] && [ "${p%/}" != "$p" ]; do
        p="${p%/}"
    done
    case "$OS" in
        MINGW*|MSYS*|CYGWIN*)
            p="$(printf '%s' "$p" | tr '[:upper:]' '[:lower:]')"
            ;;
    esac
    printf '%s' "$p"
}

safe_delete_to_unix_path_if_possible() {
    local p="$1"
    if command -v cygpath >/dev/null 2>&1; then
        cygpath -u "$p" 2>/dev/null && return 0
    fi
    printf '%s' "$p"
}

safe_delete_resolve_os_tmp_dir() {
    local tmp="${TMPDIR:-${TMP:-${TEMP:-/tmp}}}"
    safe_delete_to_unix_path_if_possible "$tmp"
}

safe_delete_abs_path() {
    local p="$1"
    local abs
    if command -v python3 >/dev/null 2>&1; then
        abs="$(python3 -c 'import os,sys; print(os.path.abspath(sys.argv[1]))' "$p" 2>/dev/null)" && {
            safe_delete_to_unix_path_if_possible "$abs"
            return 0
        }
    elif command -v python >/dev/null 2>&1; then
        abs="$(python -c 'import os,sys; print(os.path.abspath(sys.argv[1]))' "$p" 2>/dev/null)" && {
            safe_delete_to_unix_path_if_possible "$abs"
            return 0
        }
    fi
    case "$p" in
        /*|[A-Za-z]:/*) abs="$p" ;;
        *)              abs="$PWD/$p" ;;
    esac
    abs="$(CDPATH= cd -P -- "$(dirname "$abs")" 2>/dev/null && printf '%s/%s' "$PWD" "$(basename "$abs")" || printf '%s' "$abs")"
    safe_delete_to_unix_path_if_possible "$abs"
}

safe_delete_tmp_root_allowed() {
    local root="$1"
    [ -n "$root" ] || return 1
    [ "$root" != "/" ] || return 1
    [ -d "$root" ] || return 1
    return 0
}

safe_delete_build_os_tmp_dirs() {
    local seen="|" candidate root
    for candidate in \
        "$(safe_delete_resolve_os_tmp_dir)" \
        "/tmp" \
        "/private/tmp"
    do
        [ -n "$candidate" ] || continue
        root="$(safe_delete_normalize_path "$(safe_delete_abs_path "$candidate")")"
        safe_delete_tmp_root_allowed "$root" || continue
        case "$seen" in
            *"|$root|"*) ;;
            *)
                seen="${seen}${root}|"
                printf '%s\n' "$root"
                ;;
        esac
    done
}

SAFE_DELETE_OS_TMP_DIRS="$(safe_delete_build_os_tmp_dirs)"

safe_delete_is_under_os_tmp_dir() {
    local abs
    abs="$(safe_delete_normalize_path "$(safe_delete_abs_path "$1")")"
    while IFS= read -r tmp_dir; do
        [ -n "$tmp_dir" ] || continue
        case "$abs" in
            "$tmp_dir"/*) return 0 ;;
        esac
    done <<EOF
$SAFE_DELETE_OS_TMP_DIRS
EOF
    return 1
}

# ---- platform-specific trash helpers -----------------------------------------

trash_darwin() {
    local p="$1"

    # macOS fallback: use CoreServices API via python ctypes.
    # This avoids AppleScript/Finder automation permissions in sandbox.
    local py_out
    py_out="$(python3 - "$p" 2>&1 <<'PY'
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
PY
)"
    local py_rc=$?
    if [ $py_rc -ne 0 ]; then
        _safe_delete_diag "python ctypes fallback failed: exit=$py_rc path=$p stderr=$(_safe_delete_one_line "$py_out")"
        return 1
    fi

    # API 调用成功后追加存在性校验：路径仍在原处 = 失败，拒绝删除（fail-closed）
    if [ -e "$p" ] || [ -L "$p" ]; then
        _safe_delete_diag "python ctypes fallback reported success but file still exists: path=$p"
        return 1
    fi
    _safe_delete_diag "python ctypes fallback succeeded: path=$p"
    return 0
}

trash_linux() {
    local p="$1"
    local d="${XDG_DATA_HOME:-$HOME/.local/share}/Trash"
    mkdir -p "$d/files" "$d/info" 2>/dev/null || return 1

    local b="${p##*/}"
    local tf="$d/files/$b" ti="$d/info/$b.trashinfo"
    local n=1
    while [ -e "$tf" ] || [ -e "$ti" ]; do
        n=$((n + 1))
        [ $n -gt 1000 ] && return 1
        tf="$d/files/$b.$n"
        ti="$d/info/$b.$n.trashinfo"
    done

    # freedesktop spec 要求 Path 字段百分比编码非 ASCII 字符。
    # 已知限制：此处不编码，含中文/Unicode 文件名与 Node.js/Python 版本的
    # trashinfo 格式不一致。bash 下无法可靠实现 UTF-8 字节级编码，暂且接受。
    printf '[Trash Info]\nPath=%s\nDeletionDate=%s\n' "$p" "$NOW" > "$ti" || return 1
    chmod 600 "$ti" 2>/dev/null

    if mv "$p" "$tf" 2>/dev/null; then
        return 0
    fi

    # EXDEV: cross-device — fall back to copy + delete
    # 使用 $REAL_RM 而非裸 rm：PATH 中 safe-bin/ 已前置，裸 rm 会递归回自身
    if [ -d "$p" ] && [ ! -L "$p" ]; then
        cp -R "$p" "$tf" 2>/dev/null || { "$REAL_RM" -f "$ti" 2>/dev/null; return 1; }
        "$REAL_RM" -rf "$p" 2>/dev/null || { "$REAL_RM" -f "$ti" 2>/dev/null; "$REAL_RM" -rf "$tf" 2>/dev/null; return 1; }
    else
        cp "$p" "$tf" 2>/dev/null || { "$REAL_RM" -f "$ti" 2>/dev/null; return 1; }
        "$REAL_RM" -f "$p" 2>/dev/null || { "$REAL_RM" -f "$ti" 2>/dev/null; "$REAL_RM" -f "$tf" 2>/dev/null; return 1; }
    fi
}

# ---- 解析 genie-trash binary 路径 ----

_gt_arch() {
    case "$(uname -m)" in
        arm64|aarch64) echo arm64 ;;
        x86_64|amd64)  echo x64 ;;
        *)             echo "$(uname -m)" ;;
    esac
}

# 将 Git Bash / MSYS2 / Cygwin 的 uname -s 输出映射为 win32，
# 使其与 genie-trash binary 文件名（win32-x64.exe）和 process.platform 一致。
_gt_platform() {
    case "$(uname -s)" in
        MINGW*|MSYS*|CYGWIN*) echo "win32" ;;
        *)                     echo "$(uname -s | tr 'A-Z' 'a-z')" ;;
    esac
}

GT_PLATFORM="$(_gt_platform)"
GT_ARCH="$(_gt_arch)"
GT_EXT=""
[ "$GT_PLATFORM" = "win32" ] && GT_EXT=".exe"

if [ -n "${GENIE_TRASH_DIR:-}" ]; then
    TRASH_BIN="${GENIE_TRASH_DIR}/${GT_PLATFORM}-${GT_ARCH}${GT_EXT}"
else
    TRASH_BIN="${SAFE_DELETE_BIN_DIR}/../../genie-trash/${GT_PLATFORM}-${GT_ARCH}${GT_EXT}"
fi

trash_windows() {
    local p="$1"
    # 转为 Windows 风格路径（powershell 不接受 / 分隔的路径）
    local wp
    wp="$(cygpath -w "$p" 2>/dev/null || echo "$p" | sed 's|/|\\|g')"
    # 转义路径中的单引号：' → ''（PowerShell 单引号字符串内的转义方式）
    local wp_escaped="${wp//\'/\'\'}"

    # 用 powershell COM API 移入回收站，与 Node.js shim 的 trashOnWindows 一致
    local ps_out
    ps_out="$(powershell -NoProfile -NonInteractive -Command "
        try {
            \$targetPath = '${wp_escaped}'
            if (Test-Path -LiteralPath \$targetPath -PathType Container) {
                Add-Type -AssemblyName Microsoft.VisualBasic
                [Microsoft.VisualBasic.FileIO.FileSystem]::DeleteDirectory(\$targetPath,
                    [Microsoft.VisualBasic.FileIO.UIOption]::OnlyErrorDialogs,
                    [Microsoft.VisualBasic.FileIO.RecycleOption]::SendToRecycleBin)
            } else {
                Add-Type -AssemblyName Microsoft.VisualBasic
                [Microsoft.VisualBasic.FileIO.FileSystem]::DeleteFile(\$targetPath,
                    [Microsoft.VisualBasic.FileIO.UIOption]::OnlyErrorDialogs,
                    [Microsoft.VisualBasic.FileIO.RecycleOption]::SendToRecycleBin)
            }
            Write-Output 'OK'
        } catch {
            Write-Error \$_.Exception.Message
        }
    " 2>&1)"
    local ps_rc=$?

    if [ $ps_rc -eq 0 ] && echo "$ps_out" | grep -q '^OK$'; then
        # API 调用成功后追加存在性校验（fail-closed）
        if [ -e "$p" ]; then
            _safe_delete_diag "powershell COM reported success but file still exists: path=$p"
            return 1
        fi
        _safe_delete_diag "powershell COM succeeded: path=$p"
        return 0
    fi
    _safe_delete_diag "powershell COM fallback failed: exit=$ps_rc path=$p stderr=$(_safe_delete_one_line "$ps_out")"
    return 1
}

trash_one() {
    local p="$1"
    # 转为绝对路径：genie-trash binary 拒绝相对路径
    # / 开头（Unix）或盘符开头（C:/... Windows）都视为绝对路径
    case "$p" in
        /*|[A-Za-z]:/*) ;;
        *)              p="$PWD/$p" ;;
    esac
    # 优先 native binary
    if [ -x "$TRASH_BIN" ]; then
        local native_path="$p"
        if [ "$GT_PLATFORM" = "win32" ]; then
            native_path="$(cygpath -w "$p" 2>/dev/null || echo "$p" | sed 's|/|\\|g')"
        fi
        local native_out
        native_out="$("$TRASH_BIN" "$native_path" 2>&1)"
        local native_rc=$?
        if [ $native_rc -eq 0 ]; then
            return 0
        fi
        _safe_delete_diag "genie-trash failed: exit=$native_rc bin=$TRASH_BIN path=$p stderr=$(_safe_delete_one_line "$native_out")"
    else
        _safe_delete_diag "genie-trash unavailable: bin-not-executable path=$TRASH_BIN"
    fi
    # ---- 降级：当前平台实现 ----
    case "$OS" in
        Darwin)               trash_darwin "$p" ;;
        MINGW*|MSYS*|CYGWIN*) trash_windows "$p" ;;
        Linux)                trash_linux "$p" ;;
        *)                    return 1 ;;
    esac
}

try_trash() {
    local p="$1"
    local abs
    abs="$(safe_delete_abs_path "$p")"
    if trash_one "$p"; then
        safe_delete_record_trash "$abs"
        return 0
    fi
    local target_json trash_bin_json genie_trash_dir_json
    target_json="$(safe_delete_json_string "$p")"
    trash_bin_json="$(safe_delete_json_string "${TRASH_BIN:-unset}")"
    genie_trash_dir_json="$(safe_delete_json_string "${GENIE_TRASH_DIR:-unset}")"
    echo "[safe-delete][SAFE_DELETE_FAIL_CLOSED] {\"target\":$target_json,\"reason\":\"trash-failed\",\"trashBin\":$trash_bin_json,\"genieTrashDir\":$genie_trash_dir_json}" >&2
    return 1
}

# ---- command mode dispatch ----------------------------------------------------

safe_delete_rm() {
    local targets=()
    local force=false
    local recursive=false
    local allow_dir=false
    local interactive=false
    local after_double_dash=false
    local a

    for a in "$@"; do
        if $after_double_dash; then
            targets+=("$a")
            continue
        fi
        if [ "$a" = "--" ]; then
            after_double_dash=true
            continue
        fi
        case "$a" in
            -f|--force) force=true ;;
            -r|-R|--recursive) recursive=true ;;
            -d|--dir|--directory) allow_dir=true ;;
            -i|-I|--interactive|--interactive=*) interactive=true ;;
            -[!-]*)
                # 仅解析短选项组合（如 -rf/-fr/-di）；不把长选项
                # --preserve-root 误判为包含 -r。
                [[ "$a" == *f* ]] && force=true
                [[ "$a" == *r* || "$a" == *R* ]] && recursive=true
                [[ "$a" == *d* ]] && allow_dir=true
                [[ "$a" == *i* || "$a" == *I* ]] && interactive=true
                ;;
        esac
        case "$a" in
            -*) : ;;
            *)  targets+=("$a") ;;
        esac
    done

    # No targets (e.g. "rm --help") → let real rm handle
    if [ ${#targets[@]} -eq 0 ]; then
        exec "$REAL_RM" "$@"
    fi

    # rm -i / --interactive 有 prompt 语义；不能回退真删，只能 fail-closed。
    if $interactive; then
        echo "rm: interactive mode is not supported by safe-delete" >&2
        return 1
    fi

    local _exit=0
    local trash_targets=()
    local p
    for p in "${targets[@]}"; do
        if [ -e "$p" ] || [ -L "$p" ]; then
            if [ -d "$p" ] && [ ! -L "$p" ]; then
                if ! $recursive && ! $allow_dir; then
                    echo "rm: $p: is a directory" >&2
                    _exit=1
                    continue
                fi
                if ! $recursive && $allow_dir && ! is_dir_empty "$p"; then
                    echo "rm: $p: Directory not empty" >&2
                    _exit=1
                    continue
                fi
            fi
            trash_targets+=("$p")
        elif $force; then
            # -f: silently skip non-existent files (match real rm behavior)
            :
        else
            # No -f: report error for non-existent files (match real rm behavior)
            echo "rm: $p: No such file or directory" >&2
            _exit=1
        fi
    done
    local guarded_targets=()
    for p in "${trash_targets[@]}"; do
        if safe_delete_is_under_os_tmp_dir "$p"; then
            local native_args=()
            $force && native_args+=("-f")
            $recursive && native_args+=("-r")
            $allow_dir && native_args+=("-d")
            if ! "$REAL_RM" "${native_args[@]}" -- "$p"; then
                _exit=1
            fi
        else
            guarded_targets+=("$p")
        fi
    done

    if ! safe_delete_bulk_guard_check "${guarded_targets[@]}"; then
        return 1
    fi
    for p in "${guarded_targets[@]}"; do
        if ! try_trash "$p"; then
            _exit=1
        fi
    done
    return $_exit
}

safe_delete_unlink() {
    local target=""

    if [ "$#" -eq 0 ]; then
        exec "$REAL_UNLINK" "$@"
    fi

    if [ "$1" = "--" ]; then
        if [ "$#" -ne 2 ]; then
            exec "$REAL_UNLINK" "$@"
        fi
        target="$2"
    else
        case "$1" in
            -*) exec "$REAL_UNLINK" "$@" ;;
        esac
        if [ "$#" -ne 1 ]; then
            exec "$REAL_UNLINK" "$@"
        fi
        target="$1"
    fi

    if [ ! -e "$target" ] && [ ! -L "$target" ]; then
        echo "unlink: $target: No such file or directory" >&2
        return 1
    fi
    if [ -d "$target" ] && [ ! -L "$target" ]; then
        echo "unlink: $target: Is a directory" >&2
        return 1
    fi

    if safe_delete_is_under_os_tmp_dir "$target"; then
        "$REAL_UNLINK" -- "$target"
        return $?
    fi
    if ! safe_delete_bulk_guard_check "$target"; then
        return 1
    fi

    try_trash "$target"
    return $?
}

safe_delete_rmdir() {
    local targets=()
    local after_double_dash=false
    local has_option=false
    local a

    for a in "$@"; do
        if $after_double_dash; then
            targets+=("$a")
            continue
        fi
        if [ "$a" = "--" ]; then
            after_double_dash=true
            continue
        fi
        case "$a" in
            -*) has_option=true ;;
            *)  targets+=("$a") ;;
        esac
    done

    # No targets (e.g. "rmdir --help") → let real rmdir handle
    if [ ${#targets[@]} -eq 0 ]; then
        exec "$REAL_RMDIR" "$@"
    fi
    # rmdir 的选项（-p/--ignore-fail-on-non-empty 等）会改变删除语义；
    # 不能回退真删，只能 fail-closed。
    if $has_option; then
        echo "rmdir: options are not supported by safe-delete" >&2
        return 1
    fi

    local _exit=0
    local trash_targets=()
    local p
    for p in "${targets[@]}"; do
        if [ ! -e "$p" ] && [ ! -L "$p" ]; then
            echo "rmdir: $p: No such file or directory" >&2
            _exit=1
            continue
        fi
        if [ -L "$p" ] || [ ! -d "$p" ]; then
            echo "rmdir: $p: Not a directory" >&2
            _exit=1
            continue
        fi
        if ! is_dir_empty "$p"; then
            echo "rmdir: $p: Directory not empty" >&2
            _exit=1
            continue
        fi
        trash_targets+=("$p")
    done
    local guarded_targets=()
    for p in "${trash_targets[@]}"; do
        if safe_delete_is_under_os_tmp_dir "$p"; then
            if ! "$REAL_RMDIR" -- "$p"; then
                _exit=1
            fi
        else
            guarded_targets+=("$p")
        fi
    done

    if ! safe_delete_bulk_guard_check "${guarded_targets[@]}"; then
        return 1
    fi
    for p in "${guarded_targets[@]}"; do
        if ! try_trash "$p"; then
            _exit=1
        fi
    done
    return $_exit
}

safe_delete_main() {
    local mode="$1"
    shift
    case "$mode" in
        rm)     safe_delete_rm "$@"; return $? ;;
        unlink) safe_delete_unlink "$@"; return $? ;;
        rmdir)  safe_delete_rmdir "$@"; return $? ;;
        *)
            echo "[safe-delete] unknown mode: $mode" >&2
            return 2
            ;;
    esac
}
