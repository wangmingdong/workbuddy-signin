#!/usr/bin/env python3
"""
Expert Initializer - Creates a new expert package from template

Usage:
    init_expert.py <expert-name> --type agent|team --path <output-dir>

Examples:
    init_expert.py my-expert --type agent --path ./output
    init_expert.py my-team --type team --path ./output
"""

import sys
import json
import os
import re
from pathlib import Path


def get_expert_plugins_dir():
    """获取专家目录，优先读取 WORKBUDDY_CONFIG_DIR 环境变量。"""
    config_dir = os.environ.get('WORKBUDDY_CONFIG_DIR', '').strip()
    if not config_dir:
        config_dir = str(Path.home() / '.workbuddy')
    return Path(config_dir) / 'plugins' / 'marketplaces' / 'my-experts' / 'plugins'


def title_case(name):
    """Convert kebab-case to Title Case."""
    return ' '.join(word.capitalize() for word in name.split('-'))


AGENT_PLUGIN_JSON = """{
  "name": "%(name)s",
  "version": "1.0.0",
  "description": "[TODO: English one-line description]",
  "author": {
    "name": "[TODO: author name]",
    "email": "[TODO: author email]"
  },
  "agents": ["./agents/%(agent_name)s.md"],

  "expertType": "agent",
  "agentName": "%(agent_name)s",

  "displayName": {
    "en": "[TODO: English display name]",
    "zh": "[TODO: 中文显示名称]"
  },
  "profession": {
    "en": "[TODO: English profession]",
    "zh": "[TODO: 中文职业头衔]"
  },
  "displayDescription": {
    "en": "[TODO: English detailed description]",
    "zh": "[TODO: 中文详细描述，40-50字]"
  },
  "avatar": "avatars/expert.png",
  "categoryId": "[TODO: XX-CategoryName]",
  "defaultInitPrompt": {
    "zh": "[TODO: 中文首次对话提示]",
    "en": "[TODO: English first prompt]"
  },
  "plugin": "%(name)s",
  "tags": [
    { "en": "[TODO: Tag1]", "zh": "[TODO: 标签1]" },
    { "en": "[TODO: Tag2]", "zh": "[TODO: 标签2]" },
    { "en": "[TODO: Tag3]", "zh": "[TODO: 标签3]" }
  ],
  "quickPrompts": [
    { "en": "[TODO: Prompt1, same as defaultInitPrompt]", "zh": "[TODO: 提示词1，同defaultInitPrompt]" },
    { "en": "[TODO: Prompt2]", "zh": "[TODO: 提示词2]" },
    { "en": "[TODO: Prompt3]", "zh": "[TODO: 提示词3]" }
  ]
}
"""

TEAM_PLUGIN_JSON = """{
  "name": "%(name)s",
  "version": "1.0.0",
  "description": "[TODO: English one-line description]",
  "author": {
    "name": "[TODO: author name]",
    "email": "[TODO: author email]"
  },
  "agents": [
    "./agents/%(team)s-team-lead.md",
    "./agents/[TODO: member-a].md"
  ],

  "expertType": "team",
  "agentName": "%(team)s-team-lead",
  "teamInfo": {
    "leadAgent": "%(team)s-team-lead",
    "memberAgents": ["[TODO: member-a]"]
  },

  "displayName": {
    "en": "[TODO: English team name]",
    "zh": "[TODO: 中文团队名称]"
  },
  "profession": {
    "en": "[TODO: same as displayName.en]",
    "zh": "[TODO: 同displayName.zh]"
  },
  "displayDescription": {
    "en": "[TODO: English team description]",
    "zh": "[TODO: 中文团队描述，40-50字]"
  },
  "avatar": "avatars/team.png",
  "categoryId": "[TODO: XX-CategoryName]",
  "defaultInitPrompt": {
    "zh": "[TODO: 中文首次问候]",
    "en": "[TODO: English first prompt]"
  },
  "plugin": "%(name)s",
  "tags": [
    { "en": "[TODO: Tag1]", "zh": "[TODO: 标签1]" },
    { "en": "[TODO: Tag2]", "zh": "[TODO: 标签2]" },
    { "en": "[TODO: Tag3]", "zh": "[TODO: 标签3]" }
  ],
  "quickPrompts": [
    { "en": "[TODO: Prompt1, same as defaultInitPrompt]", "zh": "[TODO: 提示词1，同defaultInitPrompt]" },
    { "en": "[TODO: Prompt2]", "zh": "[TODO: 提示词2]" },
    { "en": "[TODO: Prompt3]", "zh": "[TODO: 提示词3]" }
  ],
  "members": [
    {
      "id": "%(team)s-team-lead",
      "displayName": { "en": "[TODO]", "zh": "[TODO]" },
      "profession": { "en": "[TODO]", "zh": "[TODO]" },
      "avatar": "avatars/%(team)s-team-lead.png",
      "role": "lead"
    },
    {
      "id": "[TODO: member-a]",
      "displayName": { "en": "[TODO]", "zh": "[TODO]" },
      "profession": { "en": "[TODO]", "zh": "[TODO]" },
      "avatar": "avatars/[TODO: member-a].png",
      "role": "member"
    }
  ]
}
"""

AGENT_MD_TEMPLATE = """---
name: %(agent_name)s
description: "[TODO: English description for AI to determine when to activate]"
displayName:
  en: "[TODO: English display name]"
  zh: "[TODO: 中文显示名称]"
profession:
  en: "[TODO: English profession title]"
  zh: "[TODO: 中文职业头衔]"
maxTurns: 50
---

# [TODO: 角色名称] - [TODO: 人名]

[TODO: 角色描述，说明这是谁，擅长什么]

## 核心能力
1. **[TODO: 能力1]**：[TODO: 描述]
2. **[TODO: 能力2]**：[TODO: 描述]
3. **[TODO: 能力3]**：[TODO: 描述]

## 工作流程
1. [TODO: 步骤1]
2. [TODO: 步骤2]
3. [TODO: 步骤3]

## 输出规范
- [TODO: 规范1]
- [TODO: 规范2]

## 注意事项
- [TODO: 约束或边界条件]
"""

TEAM_LEAD_MD_TEMPLATE = """---
name: %(team)s-team-lead
description: "[TODO: English description]"
displayName:
  en: "[TODO: English display name]"
  zh: "[TODO: 中文显示名称]"
profession:
  en: "[TODO: English profession title]"
  zh: "[TODO: 中文职业头衔]"
maxTurns: 150
---

# [TODO: 团队名称] - 主理人

[TODO: 主理人角色描述，负责协调团队完成什么任务]

## 团队成员

| 成员 ID | 名字 | 职责 |
|---------|------|------|
| %(team)s-team-lead | [TODO] | 编排调度 |
| [TODO: member-a] | [TODO] | [TODO: 职责] |

## 标准工作流程（SOP）

### Phase 1: [TODO: 阶段名]
[TODO: 调用哪些成员、输入输出说明]

### Phase 2: [TODO: 阶段名]
[TODO: ...]

### Phase N: 最终报告
综合所有分析结果，生成最终报告返回用户。

## 团队协作机制（铁律）

你必须走正式的**团队协作流程**，严禁简化或跳过：

1. **建立团队**：任务开始时由主理人亲自创建团队（TeamCreate），明确协作边界。**团队创建必须且只能由主理人执行，严禁委派任何成员创建团队**
2. **调度成员**：按 SOP 阶段将成员拉入协作、下发独立任务；成员作为独立协作方输出专业产出，不得由主理人代写
3. **消息中转**：成员产出回传给主理人，由主理人汇总、转交下一阶段；所有跨成员信息流必须经主理人中转，不得互相直连
4. **成员结论为准**：任何专业产出必须由对应成员输出后再采信，主理人只做编排与汇编

### 严禁行为
- ❌ 禁止跳过 TeamCreate，直接自己模拟成员发言或并行写出多角色内容
- ❌ 禁止自己代写任何团队成员的专业产出
- ❌ 禁止未完成前序阶段就跳到后续阶段
- ❌ 禁止让成员互相直连通信，所有跨成员信息流必须经主理人中转
- ❌ 禁止 spawn 主理人自己

## 协作规则
1. 所有成员调度必须经过"建立团队 → 调度成员 → 成员回传"流程
2. 每阶段结束后，将完整产出原文传递给下一阶段成员
3. 每完成一个阶段向用户简要通报
4. 所有输出使用与用户原始需求相同的语言
5. 调度成员时，Agent 工具的 `name` 参数传入成员的 **Agent ID**（MD 文件名，不含 .md），`subagent_type` 也传入相同值。禁止使用中文名或自创名称
"""

TEAM_MEMBER_MD_TEMPLATE = """---
name: [TODO: member-id]
description: "[TODO: English description]"
displayName:
  en: "[TODO: English display name]"
  zh: "[TODO: 中文显示名称]"
profession:
  en: "[TODO: English profession title]"
  zh: "[TODO: 中文职业头衔]"
maxTurns: 50
---

# [TODO: 角色名称] - [TODO: 人名]

[TODO: 角色描述]

## 核心能力
1. **[TODO: 能力1]**：[TODO: 描述]
2. **[TODO: 能力2]**：[TODO: 描述]
3. **[TODO: 能力3]**：[TODO: 描述]

## 工作流程
1. [TODO: 步骤1]
2. [TODO: 步骤2]
3. [TODO: 步骤3]

## 输出规范
- [TODO: 结构化输出模板]

## SendMessage 回传
分析完成后，**必须通过 SendMessage 将完整分析结果回传给主理人**。
"""

README_TEMPLATE = """# %(title)s

%(description)s

## 类型

%(expert_type)s

## 功能

[TODO: 详细功能说明]

## 使用示例

- [TODO: 示例提示词1]
- [TODO: 示例提示词2]
- [TODO: 示例提示词3]

## 头像

头像已自动生成在 `avatars/` 目录下。如需替换为自定义头像，要求：
- 格式：PNG（推荐）或 JPG
- 尺寸：512×512 px
- 大小：单张不超过 500KB

## 安装

将专家包目录放到专家目录下：

```
%(expert_plugins_dir)s/%(name)s/
```

然后运行注册命令使其可见：

```bash
python3 scripts/register_expert.py <expert-dir>
```

## 打包分享

```bash
zip -r %(name)s.zip %(name)s/
```
"""

SETTINGS_JSON = '{\n  "agent": "%(team)s-team-lead"\n}\n'


def init_agent(expert_dir, name):
    """Initialize an Agent-type expert package."""
    agent_name = name

    # .codebuddy-plugin/plugin.json
    plugin_dir = expert_dir / '.codebuddy-plugin'
    plugin_dir.mkdir()
    (plugin_dir / 'plugin.json').write_text(
        AGENT_PLUGIN_JSON % {'name': name, 'agent_name': agent_name},
        encoding='utf-8'
    )
    print("  ✅ .codebuddy-plugin/plugin.json")

    # agents/
    agents_dir = expert_dir / 'agents'
    agents_dir.mkdir()
    (agents_dir / f'{agent_name}.md').write_text(
        AGENT_MD_TEMPLATE % {'agent_name': agent_name},
        encoding='utf-8'
    )
    print(f"  ✅ agents/{agent_name}.md")

    # avatars/
    avatars_dir = expert_dir / 'avatars'
    avatars_dir.mkdir()
    (avatars_dir / '.gitkeep').touch()
    print("  ✅ avatars/ (awaiting ImageGen)")

    # README.md
    (expert_dir / 'README.md').write_text(
        README_TEMPLATE % {
            'title': title_case(name),
            'description': '[TODO: 一句话描述]',
            'expert_type': 'Agent 型（单个 AI 专家）',
            'name': name,
            'expert_plugins_dir': str(get_expert_plugins_dir()),
        },
        encoding='utf-8'
    )
    print("  ✅ README.md")


def init_team(expert_dir, name):
    """Initialize a Team-type expert package."""
    team = name

    # .codebuddy-plugin/plugin.json
    plugin_dir = expert_dir / '.codebuddy-plugin'
    plugin_dir.mkdir()
    (plugin_dir / 'plugin.json').write_text(
        TEAM_PLUGIN_JSON % {'name': name, 'team': team},
        encoding='utf-8'
    )
    print("  ✅ .codebuddy-plugin/plugin.json")

    # agents/
    agents_dir = expert_dir / 'agents'
    agents_dir.mkdir()
    (agents_dir / f'{team}-team-lead.md').write_text(
        TEAM_LEAD_MD_TEMPLATE % {'team': team},
        encoding='utf-8'
    )
    print(f"  ✅ agents/{team}-team-lead.md")

    (agents_dir / 'member-placeholder.md').write_text(TEAM_MEMBER_MD_TEMPLATE, encoding='utf-8')
    print("  ✅ agents/member-placeholder.md (rename to actual member ID)")

    # avatars/
    avatars_dir = expert_dir / 'avatars'
    avatars_dir.mkdir()
    (avatars_dir / '.gitkeep').touch()
    print("  ✅ avatars/ (awaiting ImageGen)")

    # settings.json
    (expert_dir / 'settings.json').write_text(
        SETTINGS_JSON % {'team': team},
        encoding='utf-8'
    )
    print("  ✅ settings.json")

    # README.md
    (expert_dir / 'README.md').write_text(
        README_TEMPLATE % {
            'title': title_case(name),
            'description': '[TODO: 一句话描述]',
            'expert_type': 'Team 型（多角色协作团队）',
            'name': name,
            'expert_plugins_dir': str(get_expert_plugins_dir()),
        },
        encoding='utf-8'
    )
    print("  ✅ README.md")


def main():
    # Parse arguments
    if len(sys.argv) < 6:
        print("Usage: init_expert.py <expert-name> --type agent|team --path <output-dir>")
        print("\nExamples:")
        print("  python3 init_expert.py my-expert --type agent --path ./output")
        print("  python3 init_expert.py my-team --type team --path ./output")
        sys.exit(1)

    name = sys.argv[1]
    expert_type = None
    output_path = None

    i = 2
    while i < len(sys.argv):
        if sys.argv[i] == '--type' and i + 1 < len(sys.argv):
            expert_type = sys.argv[i + 1]
            i += 2
        elif sys.argv[i] == '--path' and i + 1 < len(sys.argv):
            output_path = sys.argv[i + 1]
            i += 2
        else:
            i += 1

    if not expert_type or expert_type not in ('agent', 'team'):
        print("❌ Error: --type must be one of: agent, team")
        sys.exit(1)

    if not output_path:
        print("❌ Error: --path is required")
        sys.exit(1)

    # 硬检查：--path 必须是专家目录
    expected_path = get_expert_plugins_dir()
    resolved_path = Path(output_path).expanduser().resolve()
    if resolved_path != expected_path.resolve():
        print(f"❌ Error: --path 必须为专家目录: {expected_path}")
        print(f"   当前传入: {resolved_path}")
        print(f"   非专家目录下创建的专家无法被检测到。")
        sys.exit(1)

    # Validate name
    if len(name) < 2 or not re.match(r'^[a-z0-9][a-z0-9-]*[a-z0-9]$', name):
        print(f"❌ Error: name '{name}' must be kebab-case (lowercase letters, digits, hyphens)")
        sys.exit(1)

    # Create expert directory
    expert_dir = Path(output_path).resolve() / name
    if expert_dir.exists():
        print(f"❌ Error: directory already exists: {expert_dir}")
        sys.exit(1)

    expert_dir.mkdir(parents=True)
    print(f"🚀 Initializing {expert_type} expert: {name}")
    print(f"   Location: {expert_dir}\n")

    if expert_type == 'agent':
        init_agent(expert_dir, name)
    elif expert_type == 'team':
        init_team(expert_dir, name)

    print(f"\n✅ Expert '{name}' ({expert_type}) initialized at {expert_dir}")
    print("\nNext steps:")
    print("  1. Fill in all [TODO] placeholders in generated files")
    print("  2. Generate avatars using ImageGen (see references/avatar-spec.md)")
    print("  3. Run validate_expert.py to check the package")
    print("  4. Run register_expert.py to register in marketplace.json (makes it visible in WorkBuddy)")
    print(f"\n   Note: The expert will NOT appear in WorkBuddy until registered.")


if __name__ == "__main__":
    main()
