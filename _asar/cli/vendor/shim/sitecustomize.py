"""
genie-safe-delete — Python 运行时安全删除 shim

通过 PYTHONPATH 中的 sitecustomize.py 自动加载，
拦截 os.remove / os.rmdir / shutil.rmtree / pathlib 的删除 API，
把文件移入操作系统的回收站而不是真删。

实现：优先调用 genie-trash native binary；不可用时回退到平台内联实现
（macOS: ctypes FSMoveObjectToTrashSync，Windows: ctypes SHFileOperationW，
 Linux: freedesktop Trash spec 纯 Python 实现）。

设计要点见 apps/workbuddy-desktop/docs/safe-delete-runtime-trash.md
"""

import errno
import json
import os
import stat
import sys
import tempfile
import time

# ---------------------------------------------------------------------------
# 触发条件
# ---------------------------------------------------------------------------

_SESSION_ID = (
    os.environ.get("CODEBUDDY_SESSION_ID")
    or os.environ.get("CLAUDE_SESSION_ID")
)
_IN_SANDBOX = os.environ.get("CODEBUDDY_SAFE_DELETE_SANDBOX") == "1"

if _SESSION_ID:
    # __file__ 在 sitecustomize 加载时指向本文件路径，dirname 即 vendor/shim/
    _SHIM_DIR = os.path.dirname(os.path.abspath(__file__))

    # sitecustomize 是 Python 保留文件名，Python 启动时会自动 import
    # sys.path 上第一个匹配的模块。把 shim 目录前置到 PYTHONPATH 后，
    # 用户环境原有的 sitecustomize（conda / virtualenv / 企业配置等）会被覆盖。
    # 因此在注入 shim 前，先临时从 sys.modules 和 sys.path 中移除自身，
    # 尝试加载原始的 sitecustomize，再恢复自身。
    _self = sys.modules.pop("sitecustomize", None)
    if _SHIM_DIR in sys.path:
        sys.path.remove(_SHIM_DIR)
    try:
        __import__("sitecustomize")
    except ImportError as e:
        # 只有模块本身不存在时才静默（e.name == "sitecustomize"）；
        # 若模块存在但内部导入失败（e.name 为其他名），输出 traceback 到 stderr
        if e.name is not None and e.name != "sitecustomize":
            import traceback
            traceback.print_exc(file=sys.stderr)
    if _SHIM_DIR not in sys.path:
        sys.path.insert(0, _SHIM_DIR)
    if _self is not None:
        sys.modules["sitecustomize"] = _self

    # -----------------------------------------------------------------------
    # 平台内联 trash 实现（genie-trash binary 不可用时的降级路径）
    # 仅使用标准库，无第三方依赖。
    # -----------------------------------------------------------------------

    if sys.platform == "darwin":
        # macOS: ctypes → CoreServices.FSMoveObjectToTrashSync
        # API 在 macOS 10.8 标记 deprecated，但至今仍可用；不依赖 Finder，headless 安全。
        from ctypes import cdll, byref, Structure, c_char, c_char_p
        from ctypes.util import find_library as _find_library

        _Foundation = cdll.LoadLibrary(_find_library("Foundation"))
        _CoreServices = cdll.LoadLibrary(_find_library("CoreServices"))
        _GetOSStatusComment = _Foundation.GetMacOSStatusCommentString
        _GetOSStatusComment.restype = c_char_p
        _FSPathMakeRefWithOptions = _CoreServices.FSPathMakeRefWithOptions
        _FSMoveObjectToTrashSync = _CoreServices.FSMoveObjectToTrashSync

        class _FSRef(Structure):
            _fields_ = [("hidden", c_char * 80)]

        def _platform_trash(abs_path):
            path_b = abs_path.encode("utf-8") if isinstance(abs_path, str) else abs_path
            fp = _FSRef()
            rc = _FSPathMakeRefWithOptions(path_b, 0x01, byref(fp), None)
            if rc:
                raise OSError(_GetOSStatusComment(rc).decode("utf-8", errors="replace"))
            rc = _FSMoveObjectToTrashSync(byref(fp), None, 0)
            if rc:
                raise OSError(_GetOSStatusComment(rc).decode("utf-8", errors="replace"))

    elif sys.platform == "win32":
        # Windows: ctypes → shell32.SHFileOperationW
        # API 在 Vista 后标记 deprecated（推荐 IFileOperation），但仍广泛可用。
        from ctypes import (
            windll, Structure, byref, c_uint,
            create_unicode_buffer, addressof,
            GetLastError, FormatError,
        )
        from ctypes.wintypes import HWND, UINT, BOOL, LPCWSTR

        _kernel32 = windll.kernel32
        _shell32 = windll.shell32
        _FO_DELETE = 3
        _FOF_FLAGS = 64 | 16 | 1024 | 4  # ALLOWUNDO | NOCONFIRMATION | NOERRORUI | SILENT

        class _SHFILEOPSTRUCTW(Structure):
            _fields_ = [
                ("hwnd", HWND), ("wFunc", UINT), ("pFrom", LPCWSTR),
                ("pTo", LPCWSTR), ("fFlags", c_uint), ("fAnyOperationsAborted", BOOL),
                ("hNameMappings", c_uint), ("lpszProgressTitle", LPCWSTR),
            ]

        def _get_short_path(path):
            """调用 GetShortPathNameW 处理超长路径和特殊字符。"""
            prefix = "\\\\?\\"
            long_path = (prefix + "UNC" + path[1:]) if path.startswith("\\\\") else (prefix + path)
            n = _kernel32.GetShortPathNameW(long_path, None, 0)
            if not n:
                err = GetLastError()
                raise OSError(err, FormatError(err), path)
            buf = create_unicode_buffer(n)
            _kernel32.GetShortPathNameW(long_path, buf, n)
            s = buf.value
            # 还原 UNC 前缀：\\?\UNC\server → \\server
            if s.startswith("\\\\?\\UNC"):
                return "\\" + s[7:]
            # 普通路径：去掉 \\?\
            return s[4:] if s.startswith(prefix) else s

        def _platform_trash(abs_path):
            path = _get_short_path(os.path.abspath(abs_path))
            # pFrom 需要双 null 终止的字符串（SHFileOperationW 规范）
            buf = create_unicode_buffer(path, len(path) + 2)
            fileop = _SHFILEOPSTRUCTW()
            fileop.wFunc = _FO_DELETE
            fileop.pFrom = LPCWSTR(addressof(buf))
            fileop.fFlags = _FOF_FLAGS
            result = _shell32.SHFileOperationW(byref(fileop))
            if result:
                raise OSError("SHFileOperationW 失败: 0x%x" % result)

    else:
        # Linux / 其他 POSIX: freedesktop Trash spec（XDG Base Directory）
        from datetime import datetime as _datetime
        import shutil as _shutil

        def _trashinfo_encode(s):
            """仅编码非 ASCII 和控制字符，与 Node.js/Bash 版本保持一致。"""
            parts = []
            for ch in s:
                if '\x20' <= ch <= '\x7e':
                    parts.append(ch)
                else:
                    parts.append(''.join('%{:02X}'.format(b) for b in ch.encode('utf-8')))
            return ''.join(parts)

        _uid = os.getuid()
        _xdg_data = os.fsencode(
            os.environ.get("XDG_DATA_HOME", os.path.expanduser("~/.local/share"))
        )
        _home_trash = os.path.join(_xdg_data, b"Trash")

        def _find_ext_volume_trash(volume_root):
            """freedesktop spec §1: 优先 .Trash/$uid（需 sticky bit），否则 .Trash-$uid。"""
            uid_b = str(_uid).encode()
            trash_base = os.path.join(volume_root, b".Trash")
            if (
                os.path.isdir(trash_base)
                and not os.path.islink(trash_base)
                and bool(os.lstat(trash_base).st_mode & 0o1000)  # sticky bit
            ):
                trash_dir = os.path.join(trash_base, uid_b)
                os.makedirs(trash_dir, 0o700, exist_ok=True)
                return trash_dir
            trash_dir = os.path.join(volume_root, b".Trash-" + uid_b)
            os.makedirs(trash_dir, 0o700, exist_ok=True)
            return trash_dir

        def _trash_move(path_b, dest_trash, topdir):
            """将文件移动到 dest_trash，并写入对应的 .trashinfo。"""
            files_dir = os.path.join(dest_trash, b"files")
            info_dir = os.path.join(dest_trash, b"info")
            os.makedirs(files_dir, 0o700, exist_ok=True)
            os.makedirs(info_dir, 0o700, exist_ok=True)

            filename = os.path.basename(path_b)
            base, ext = os.path.splitext(filename)
            dest_name = filename
            counter = 0
            while os.path.exists(os.path.join(files_dir, dest_name)) or \
                    os.path.exists(os.path.join(info_dir, dest_name + b".trashinfo")):
                counter += 1
                dest_name = base + b"." + str(counter).encode() + ext

            real_path = os.path.realpath(path_b)
            real_top = os.path.realpath(topdir)
            if real_path.startswith(real_top):
                info_path = _trashinfo_encode(os.fsdecode(os.path.relpath(path_b, topdir)))
            else:
                info_path = _trashinfo_encode(os.fsdecode(os.path.abspath(path_b)))

            info_content = "[Trash Info]\nPath=%s\nDeletionDate=%s\n" % (
                info_path, _datetime.now().strftime("%Y-%m-%dT%H:%M:%S")
            )
            info_file = os.path.join(info_dir, dest_name + b".trashinfo")
            fd = os.open(info_file, os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o600)
            try:
                with os.fdopen(fd, "w") as f:
                    f.write(info_content)
            except Exception:
                try:
                    _orig_unlink(info_file)
                except OSError:
                    pass
                raise

            dest_file = os.path.join(files_dir, dest_name)
            try:
                os.rename(path_b, dest_file)
            except OSError as e:
                if e.errno == errno.EXDEV:
                    # _shutil.move 内部调用 shutil.rmtree，后者已被补丁为
                    # _safe_shutil_rmtree —— 这会重入 _try_trash 形成循环。
                    # 临时将 shutil.rmtree 恢复为原始版本后再调用。
                    _saved_rmtree = shutil.rmtree
                    shutil.rmtree = _orig_shutil_rmtree
                    try:
                        _shutil.move(os.fsdecode(path_b), os.fsdecode(dest_file))
                    except Exception:
                        try:
                            _orig_unlink(info_file)
                        except OSError:
                            pass
                        raise
                    finally:
                        shutil.rmtree = _saved_rmtree
                else:
                    try:
                        _orig_unlink(info_file)
                    except OSError:
                        pass
                    raise

        def _platform_trash(abs_path):
            path_b = os.fsencode(abs_path)
            path_dev = os.lstat(path_b).st_dev
            home_dev = os.lstat(os.path.expanduser(b"~")).st_dev
            if path_dev == home_dev:
                _trash_move(path_b, _home_trash, _xdg_data)
            else:
                mount = os.path.realpath(path_b)
                while not os.path.ismount(mount):
                    mount = os.path.split(mount)[0]
                dest_trash = _find_ext_volume_trash(mount)
                try:
                    _trash_move(path_b, dest_trash, mount)
                except OSError as e:
                    if e.errno == errno.EXDEV:
                        _trash_move(path_b, _home_trash, _xdg_data)
                    else:
                        raise

    # -----------------------------------------------------------------------
    # 全局状态
    # -----------------------------------------------------------------------

    # 保存原始引用（patch 前）
    import shutil
    import subprocess
    import pathlib
    import platform

    _orig_remove = os.remove
    _orig_unlink = os.unlink
    _orig_rmdir = os.rmdir
    _orig_shutil_rmtree = shutil.rmtree
    _orig_path_unlink = pathlib.Path.unlink
    _orig_path_rmdir = pathlib.Path.rmdir
    _report_path = os.environ.get("CODEBUDDY_SAFE_DELETE_REPORT_PATH")

    def _path_for_compare(path):
        return os.path.normcase(os.path.realpath(os.path.abspath(path)))

    def _is_usable_temp_root(path):
        try:
            root = _path_for_compare(path)
            if os.path.dirname(root) == root:
                return False
            return os.path.isdir(root)
        except Exception:
            return False

    def _build_os_tmp_dirs():
        candidates = [
            tempfile.gettempdir(),
        ]
        if sys.platform != "win32":
            candidates.append("/tmp")
            candidates.append("/private/tmp")

        roots = []
        seen = set()
        for candidate in candidates:
            if not candidate or not _is_usable_temp_root(candidate):
                continue
            root = _path_for_compare(candidate)
            if root in seen:
                continue
            seen.add(root)
            roots.append(root)
        return roots

    _os_tmp_dirs = _build_os_tmp_dirs()

    def _record_trash(abs_path):
        if not _report_path:
            return
        try:
            with open(_report_path, "a", encoding="utf-8") as f:
                f.write(json.dumps({
                    "operation": "trash",
                    "runtime": "python",
                    "path": abs_path,
                    "timestamp": int(time.time() * 1000),
                }, ensure_ascii=False, separators=(",", ":")) + "\n")
        except Exception:
            pass

    def _exit_bulk_guard_control(message):
        try:
            sys.stderr.write(message)
            if not message.endswith("\n"):
                sys.stderr.write("\n")
            sys.stderr.flush()
        finally:
            raise SystemExit(1)

    def _check_bulk_delete_guard(abs_path):
        guard_path = os.environ.get("CODEBUDDY_SAFE_DELETE_BULK_GUARD")
        node_bin = os.environ.get("CODEBUDDY_NODE_BIN")
        if not os.environ.get("CODEBUDDY_SAFE_DELETE_BULK_STATE_DIR") \
                or not os.environ.get("CODEBUDDY_TOOL_CALL_ID"):
            return
        if not guard_path or not node_bin or not os.path.isfile(guard_path):
            _exit_bulk_guard_control(
                "[safe-delete][SAFE_DELETE_BULK_GUARD_ERROR] msg=helper-unavailable guard=%s"
                % (guard_path or "unset")
            )
        env = dict(os.environ)
        env["NODE_OPTIONS"] = ""
        try:
            result = subprocess.run(
                [node_bin, guard_path, "check", "--target", abs_path],
                capture_output=True, text=True, timeout=10, env=env
            )
        except Exception as e:
            _exit_bulk_guard_control(
                "[safe-delete][SAFE_DELETE_BULK_GUARD_ERROR] %s" % e
            )
        if result.returncode != 0:
            _exit_bulk_guard_control(
                result.stderr.strip()
                or "[safe-delete][SAFE_DELETE_BULK_GUARD_ERROR] exit %d" % result.returncode
            )

    # -----------------------------------------------------------------------
    # genie-trash native binary 支持（优先路径，不可用自动降级）
    # 优先使用 GENIE_TRASH_DIR 环境变量（由 buildSafeDeleteEnv() 注入），
    # 解决打包后 extraResources 与 shim 不共父目录的路径错位问题。
    # -----------------------------------------------------------------------

    def _get_trash_bin():
        system = "win32" if sys.platform == "win32" else platform.system().lower()
        machine = platform.machine().lower()
        if machine in ("arm64", "aarch64"):
            arch = "arm64"
        elif machine in ("x86_64", "amd64"):
            arch = "x64"
        else:
            arch = machine
        ext = ".exe" if sys.platform == "win32" else ""
        file_name = "%s-%s%s" % (system, arch, ext)
        trash_dir = os.environ.get("GENIE_TRASH_DIR")
        if trash_dir:
            return os.path.join(trash_dir, file_name)
        shim_dir = os.path.dirname(os.path.abspath(__file__))
        return os.path.join(shim_dir, "..", "genie-trash", file_name)

    _trash_bin_available = None  # None=未探测, True=可用, False=不可用

    def _try_trash_via_binary(abs_path):
        global _trash_bin_available
        if _trash_bin_available is False:
            return False
        try:
            result = subprocess.run(
                [_get_trash_bin(), abs_path],
                capture_output=True, text=True, timeout=5
            )
            if result.returncode == 0:
                _trash_bin_available = True
                return True
            # binary 已启动但对该路径失败：抛错，不降级真删
            raise OSError(
                "[safe-delete] 操作失败: %s"
                % (result.stderr.strip() or "exit %d" % result.returncode)
            )
        except FileNotFoundError:
            _trash_bin_available = False  # binary 不存在，进程生命周期内不会凭空出现
            return False
        except PermissionError:
            # 不缓存：权限问题可能是临时状态（如 chmod +x 后恢复）
            return False
        except subprocess.TimeoutExpired:
            return False  # 超时是临时问题，不永久禁用 native binary
        except OSError:
            raise
        except Exception:
            pass
        _trash_bin_available = False
        return False

    # -----------------------------------------------------------------------
    # 核心：尝试移入回收站。优先 binary，降级到平台内联实现。
    # 返回 True=已移入回收站；抛错=fail-closed，调用方不得真删。
    # -----------------------------------------------------------------------

    def _try_trash(abs_path):
        if sys.platform == "win32" and _IN_SANDBOX:
            message = (
                "[safe-delete][SAFE_DELETE_FAIL_CLOSED] "
                + json.dumps({
                    "target": abs_path,
                    "reason": "windows-sandbox-recycle-bin-unavailable",
                }, ensure_ascii=False)
            )
            try:
                sys.stderr.write(message + "\n")
                sys.stderr.flush()
            except Exception:
                pass
            raise OSError(message)
        _check_bulk_delete_guard(abs_path)
        if _try_trash_via_binary(abs_path):
            _record_trash(abs_path)
            return True
        _platform_trash(abs_path)
        _record_trash(abs_path)
        return True

    def _safe_lstat(abs_path):
        try:
            return os.lstat(abs_path)
        except OSError as e:
            if e.errno == errno.ENOENT:
                return None
            # EACCES / ELOOP 等错误：让调用方回退原生
            return False  # 与 None 区分开

    def _is_dir_empty(abs_path):
        try:
            return len(os.listdir(abs_path)) == 0
        except OSError:
            return False

    def _is_under_os_tmp_dir(abs_path):
        try:
            target = _path_for_compare(os.fsdecode(abs_path))
        except (TypeError, UnicodeError):
            return False
        for tmp_dir in _os_tmp_dirs:
            try:
                rel = os.path.relpath(target, tmp_dir)
            except ValueError:
                continue
            if rel not in ("", ".") and rel != ".." and not rel.startswith(".." + os.sep) and not os.path.isabs(rel):
                return True
        return False

    def _is_pip_site_packages_temp_dir(abs_path):
        try:
            target = _path_for_compare(os.fsdecode(abs_path))
        except (TypeError, UnicodeError):
            return False
        parts = target.split(os.sep)
        for index, part in enumerate(parts[:-1]):
            if part not in ("site-packages", "dist-packages"):
                continue
            backup_root = parts[index + 1]
            if backup_root.startswith("~") or backup_root.startswith("accesstest_deleteme"):
                return True
        return False

    # -----------------------------------------------------------------------
    # 包装：os.remove / os.unlink （文件，不能是目录）
    # -----------------------------------------------------------------------

    def _safe_remove(path, *, dir_fd=None):
        # dir_fd 不为 None → 走原生（无法解析到 abs_path）
        if dir_fd is not None:
            return _orig_remove(path, dir_fd=dir_fd)
        abs_path = os.path.abspath(os.fspath(path))
        if _is_under_os_tmp_dir(abs_path) or _is_pip_site_packages_temp_dir(abs_path):
            return _orig_remove(path)
        st = _safe_lstat(abs_path)
        if not st:
            return _orig_remove(path)  # ENOENT / stat 错误 → 让原生抛
        if stat.S_ISDIR(st.st_mode):
            return _orig_remove(path)  # 让原生抛 EISDIR / EPERM
        _try_trash(abs_path)

    # -----------------------------------------------------------------------
    # 包装：os.rmdir（必须是空目录）
    # -----------------------------------------------------------------------

    def _safe_rmdir(path, *, dir_fd=None):
        if dir_fd is not None:
            return _orig_rmdir(path, dir_fd=dir_fd)
        abs_path = os.path.abspath(os.fspath(path))
        if _is_under_os_tmp_dir(abs_path) or _is_pip_site_packages_temp_dir(abs_path):
            return _orig_rmdir(path)
        st = _safe_lstat(abs_path)
        if not st:
            return _orig_rmdir(path)  # ENOENT / stat 错误
        if not stat.S_ISDIR(st.st_mode):
            return _orig_rmdir(path)  # ENOTDIR
        if not _is_dir_empty(abs_path):
            return _orig_rmdir(path)  # ENOTEMPTY
        _try_trash(abs_path)

    # -----------------------------------------------------------------------
    # 包装：shutil.rmtree（递归删目录）
    # -----------------------------------------------------------------------

    def _safe_shutil_rmtree(path, ignore_errors=False, onerror=None, **kwargs):
        # Python 3.12+ 引入 onexc，3.14+ 还有 dir_fd——一并 forward 给原生
        try:
            abs_path = os.path.abspath(os.fspath(path))
        except TypeError:
            return _orig_shutil_rmtree(
                path, ignore_errors=ignore_errors, onerror=onerror, **kwargs
            )

        if _is_under_os_tmp_dir(abs_path) or _is_pip_site_packages_temp_dir(abs_path):
            return _orig_shutil_rmtree(
                path, ignore_errors=ignore_errors, onerror=onerror, **kwargs
            )

        st = _safe_lstat(abs_path)
        if not st:
            return _orig_shutil_rmtree(
                path, ignore_errors=ignore_errors, onerror=onerror, **kwargs
            )
        if not stat.S_ISDIR(st.st_mode):
            # 不是目录 → 让原生处理（rmtree 会抛 NotADirectoryError）
            return _orig_shutil_rmtree(
                path, ignore_errors=ignore_errors, onerror=onerror, **kwargs
            )

        try:
            _try_trash(abs_path)
        except Exception as e:
            if ignore_errors:
                return
            if onerror is not None:
                onerror(_safe_shutil_rmtree, path, sys.exc_info())
                return
            raise

    # -----------------------------------------------------------------------
    # 包装：pathlib.Path.unlink / rmdir
    # -----------------------------------------------------------------------

    def _safe_path_unlink(self, missing_ok=False):
        abs_path = os.path.abspath(str(self))
        if _is_under_os_tmp_dir(abs_path) or _is_pip_site_packages_temp_dir(abs_path):
            return _orig_path_unlink(self, missing_ok=missing_ok)
        st = _safe_lstat(abs_path)
        if not st:
            if st is None and missing_ok:
                return None
            return _orig_path_unlink(self, missing_ok=missing_ok)  # 让原生抛
        if stat.S_ISDIR(st.st_mode):
            return _orig_path_unlink(self, missing_ok=missing_ok)  # 抛 IsADirectoryError
        _try_trash(abs_path)

    def _safe_path_rmdir(self):
        abs_path = os.path.abspath(str(self))
        if _is_under_os_tmp_dir(abs_path) or _is_pip_site_packages_temp_dir(abs_path):
            return _orig_path_rmdir(self)
        st = _safe_lstat(abs_path)
        if not st:
            return _orig_path_rmdir(self)  # ENOENT / stat 错误 → 让原生抛
        if not stat.S_ISDIR(st.st_mode):
            return _orig_path_rmdir(self)  # 抛 NotADirectoryError
        if not _is_dir_empty(abs_path):
            return _orig_path_rmdir(self)  # 抛 OSError(ENOTEMPTY)
        _try_trash(abs_path)

    # -----------------------------------------------------------------------
    # 安装 patch
    # -----------------------------------------------------------------------

    os.remove = _safe_remove
    os.unlink = _safe_remove  # CPython 里 os.unlink is os.remove，显式 patch 兼容其它实现
    os.rmdir = _safe_rmdir
    shutil.rmtree = _safe_shutil_rmtree
    pathlib.Path.unlink = _safe_path_unlink
    pathlib.Path.rmdir = _safe_path_rmdir
