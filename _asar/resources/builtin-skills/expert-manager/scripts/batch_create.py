#!/usr/bin/env python3
"""
批量创建专家 — 每个专家串行走完整标准流程（init → validate → register）。

Usage:
    python3 scripts/batch_create.py <batch-config.json> [--session-id <id>]

batch-config.json:
    {
      "path": "<expert-plugins-dir>",
      "experts": [
        { "name": "my-expert", "type": "agent" },
        { "name": "my-team", "type": "team" }
      ]
    }
"""

import sys
import json
import os
import subprocess
import time
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent.resolve()
REGISTER_MAX_RETRIES = 2
REGISTER_RETRY_DELAY = 1  # seconds


def run_step(script_name: str, args: list) -> bool:
    """运行单个标准流程脚本，返回是否成功。"""
    cmd = [sys.executable, str(SCRIPT_DIR / script_name)] + args
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.stdout.strip():
        print(result.stdout.strip())
    if result.returncode != 0 and result.stderr.strip():
        print(result.stderr.strip())
    return result.returncode == 0


def process_one_expert(name: str, expert_type: str, output_dir: Path, session_id: str = None) -> bool:
    """
    单个专家的完整标准流程。
    每个专家必须串行经过：init → validate → register，缺一不可。
    """
    expert_dir = output_dir / name
    expert_path = str(expert_dir)

    # Step 1: 初始化目录
    print(f"\n{'─'*40}")
    print(f"📦 [{name}] Step 1/3: 初始化")
    if not run_step('init_expert.py', [name, '--type', expert_type, '--path', str(output_dir)]):
        print(f"   ❌ [{name}] 初始化失败，跳过该专家")
        return False

    # ═══════════════════════════════════════════════════════
    # Step 2: AI 填充内容（在实际使用中，这里由 AI 写入文件）
    # 本脚本仅做流程示例，不包含内容生成逻辑。
    # AI 在此步骤应写入 plugin.json、agents/*.md、头像等文件。
    # ═══════════════════════════════════════════════════════

    # Step 3: 校验（失败提醒修复后重试）
    print(f"📋 [{name}] Step 2/3: 校验")
    if not run_step('validate_expert.py', [expert_path]):
        print(f"   ❌ [{name}] 校验失败，请修复内容后重新校验: python3 scripts/validate_expert.py {expert_path}")
        return False

    # Step 4: 注册（含重试，失败则提醒）
    print(f"📝 [{name}] Step 3/3: 注册")
    register_args = [expert_path]
    if session_id:
        register_args.extend(['--session-id', session_id])

    for attempt in range(1, REGISTER_MAX_RETRIES + 1):
        if run_step('register_expert.py', register_args):
            print(f"   ✅ [{name}] 完成")
            return True
        if attempt < REGISTER_MAX_RETRIES:
            print(f"   ⚠️ 注册失败，{REGISTER_RETRY_DELAY}s 后重试 ({attempt}/{REGISTER_MAX_RETRIES})...")
            time.sleep(REGISTER_RETRY_DELAY)

    # 重试耗尽：保留目录（内容已生成），提醒手动重试注册
    print(f"   ❌ [{name}] 注册失败（已重试 {REGISTER_MAX_RETRIES} 次），目录已保留: {expert_path}")
    print(f"   💡 请稍后手动重试: python3 scripts/register_expert.py {expert_path} --session-id <session-id>")
    return False


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)

    config_path = Path(sys.argv[1]).resolve()
    session_id = None

    i = 2
    while i < len(sys.argv):
        if sys.argv[i] == '--session-id' and i + 1 < len(sys.argv):
            session_id = sys.argv[i + 1]
            i += 2
        else:
            i += 1

    with open(config_path, 'r', encoding='utf-8') as f:
        config = json.load(f)

    default_config = os.environ.get('WORKBUDDY_CONFIG_DIR', '').strip() or str(Path.home() / '.workbuddy')
    default_plugins_path = str(Path(default_config) / 'plugins' / 'marketplaces' / 'my-experts' / 'plugins')
    output_dir = Path(config.get('path', default_plugins_path)).expanduser().resolve()
    experts = config.get('experts', [])

    if not experts:
        print("❌ 配置中无专家列表")
        sys.exit(1)

    print(f"🚀 批量创建 {len(experts)} 个专家 → {output_dir}\n")

    passed = []
    failed = []

    # ⚠️ 串行执行：逐个专家依次走完整流程，禁止并行/异步。
    for expert in experts:
        name = expert.get('name', '')
        expert_type = expert.get('type', 'agent')
        if not name:
            continue
        if process_one_expert(name, expert_type, output_dir, session_id):
            passed.append(name)
        else:
            failed.append(name)

    # 汇总
    print(f"\n{'═'*40}")
    print(f"📊 结果: {len(passed)} 成功, {len(failed)} 失败")
    if failed:
        print(f"   失败: {', '.join(failed)}")
    sys.exit(1 if failed else 0)


if __name__ == "__main__":
    main()
