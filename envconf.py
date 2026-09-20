# -*- coding: utf-8 -*-
"""本地 .env 配置加载器（零依赖，纯标准库）。

用法（放到脚本顶部 import 之后）：
    from envconf import load_local_env
    load_local_env()
    HOST = os.environ.get("ECS_HOST", "默认值")

- 只读项目根目录的 `.env`（与 envconf.py 同级），不修改任何变量若已存在；
- `.env` 含敏感信息，已被 .gitignore 忽略，不会入库；
- 没有 `.env` 时静默跳过，所有读取都带默认值 → 脚本仍可运行（用默认值或要求手动填）。
"""
import os


def load_local_env(path=None):
    if path is None:
        path = os.path.join(os.path.dirname(os.path.abspath(__file__)), ".env")
    if not os.path.exists(path):
        return False
    with open(path, encoding="utf-8") as f:
        for raw in f:
            line = raw.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, val = line.split("=", 1)
            key, val = key.strip(), val.strip()
            # 去掉可能的引号
            if len(val) >= 2 and val[0] == val[-1] and val[0] in ("'", '"'):
                val = val[1:-1]
            os.environ.setdefault(key, val)
    return True
