#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""import_file.py —— 腾讯文档 MCP 文件导入辅助脚本（SaaS 版，纯 Python / 跨平台）。

完成文件导入的前两步：
  1. 计算文件的 MD5 和大小
  2. 调用 manage.apply_upload 获取 COS 上传链接、obj_key、task_id
  3. 将文件 PUT 上传到 COS
  4. 输出 obj_key / file_name / file_ext / file_md5 / file_size / task_id
     供后续 manage.complete_upload

复用同目录 tencentdocs.py 的 token 加载、JSON-RPC 调用、COS PUT 能力，无需 curl/jq/bash，
Windows / macOS / Linux 通用。

用法：
    python3 import_file.py <file_path> [--no-proxy]

成功输出：
    IMPORT_READY
    OBJ_KEY:<obj_key>
    FILE_NAME:<file_name>
    FILE_EXT:<file_ext>
    FILE_MD5:<file_md5>
    TASK_ID:<task_id>
    FILE_SIZE:<file_size>
失败输出：
    ERROR:<error_message>
"""

import argparse
import hashlib
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import tencentdocs  # noqa: E402  同目录模块

MCP_SERVICE = "tencent-saas-docs"


def _md5_of(path):
    h = hashlib.md5()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def _extract_result(rsp):
    """从 JSON-RPC 响应里取业务结果：优先 result.structuredContent，
    退回 result.content[0].text 再解一层 JSON。"""
    result = rsp.get("result") or {}
    if isinstance(result.get("structuredContent"), dict):
        return result["structuredContent"]
    content = result.get("content") or []
    if content and isinstance(content[0], dict) and content[0].get("text"):
        try:
            return json.loads(content[0]["text"])
        except json.JSONDecodeError:
            return None
    return None


def main(argv=None):
    ap = argparse.ArgumentParser(prog="import_file.py")
    ap.add_argument("file_path", help="待上传的本地文件路径")
    ap.add_argument("--no-proxy", action="store_true", help="本次请求绕过所有代理")
    args = ap.parse_args(argv)

    path = args.file_path
    if not os.path.isfile(path):
        print(f"ERROR:file_not_found - 文件不存在: {path}")
        return 1

    base = os.path.basename(path)
    root, ext = os.path.splitext(base)
    file_name = root
    file_ext = ext[1:] if ext.startswith(".") else ext  # 去掉点；无扩展名时为空
    file_size = os.path.getsize(path)
    if file_size <= 0:
        print(f"ERROR:empty_file - 文件为空: {path}")
        return 1
    file_md5 = _md5_of(path)

    print(f"📄 文件名: {file_name}")
    print(f"📄 文件后缀: {file_ext}")
    print(f"📏 大小: {file_size} bytes")
    print(f"🔑 MD5:  {file_md5}\n")

    # Step 1: manage.apply_upload 获取上传链接
    print("⏳ 正在获取上传链接...")
    rsp, err = tencentdocs.call_tool(
        MCP_SERVICE, "manage.apply_upload",
        {"name": file_name, "ext": file_ext, "file_size": file_size, "md5": file_md5},
        no_proxy=args.no_proxy)
    if err:
        print(f"ERROR:apply_upload_failed - manage.apply_upload 调用失败: {err}")
        return 1
    if rsp.get("error"):
        print(f"ERROR:apply_upload_failed - manage.apply_upload 返回 error: "
              f"{rsp['error'].get('message', 'unknown')}")
        return 1

    result = _extract_result(rsp)
    if not result:
        print(f"ERROR:bad_apply_upload_result - 无法解析 manage.apply_upload 响应: {rsp}")
        return 1

    upload_url = result.get("upload_url") or ""
    obj_key = result.get("obj_key") or ""
    task_id = result.get("task_id") or ""
    if not upload_url:
        print(f"ERROR:no_upload_url - 未获取到上传链接: {result}")
        return 1
    if not obj_key:
        print(f"ERROR:no_obj_key - 未获取到 obj_key: {result}")
        return 1
    print("✅ 获取上传链接成功\n")

    # Step 2: PUT 上传到 COS
    print("⏳ 正在上传文件到 COS...")
    try:
        status = tencentdocs.put_upload(upload_url, path, no_proxy=args.no_proxy)
    except OSError as e:
        print(f"ERROR:upload_failed - 上传文件失败: {e}")
        return 1
    if not (200 <= status < 300):
        print(f"ERROR:upload_http_error - COS 上传返回 HTTP {status}")
        return 1
    print(f"✅ 文件上传成功 (HTTP {status})\n")

    # 输出结果
    print("IMPORT_READY")
    print(f"OBJ_KEY:{obj_key}")
    print(f"FILE_NAME:{file_name}")
    print(f"FILE_EXT:{file_ext}")
    print(f"FILE_MD5:{file_md5}")
    print(f"TASK_ID:{task_id}")
    print(f"FILE_SIZE:{file_size}\n")
    print("📋 下一步：调用 manage.complete_upload 触发导入")
    next_args = json.dumps({"task_id": task_id, "file_size": str(file_size),
                            "obj_key": obj_key, "name": file_name,
                            "ext": file_ext, "md5": file_md5}, ensure_ascii=False)
    print(f"   python3 tencentdocs.py tdoc_call tencent-saas-docs manage.complete_upload '{next_args}'")
    return 0


if __name__ == "__main__":
    sys.exit(main())
