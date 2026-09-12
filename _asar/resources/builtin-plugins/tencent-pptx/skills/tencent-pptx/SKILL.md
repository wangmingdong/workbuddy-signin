---
name: tencent-pptx
description: 创建专业的 PowerPoint 演示文稿。适用于根据主题、大纲、文档、数据或参考材料生成完整 .pptx；在新建演示文稿时参考上传PPTX 的视觉风格；也可基于材料或旧 PPT 内容重新生成一版演示文稿。
author: Tencent Docs
version: v20260712
---

# Tencent-PPTX Skill

## 快速导航
| 任务类型 | 执行路径 |
|---| --- | 
| 从零开始创建、生成PPT      | 阅读 [creat-from-scratch](references/create-from-scratch.md) |
| 基于上传的参考材料创建、生成PPT | 阅读 [create-from-material](references/create-from-material.md) |

**核心原则：倘若基于选择的参考材料的生成PPT时，严格使用本SKILL的材料解析能力，避免寻求外部解析能力。**



## PPTX文件的编辑

**核心原则：PPTX 文件完全生成后，所有后续的内容修改/编辑通过阅读使用 `tencent-local-office-edit` SKILL完成。禁止回退到 JSX 源文件进行修改。**

## 需求澄清

| 关键信息 | 处理 |
|---|---|
| 主题 / 核心议题 | 缺失**必问** |
| 受众 / 场合 | 缺失且影响表达，可**轻问 1 次**；否则按"专业商务汇报"默认 |
| 期望页数 | 默认 10-15 页，不问 |
| 风格倾向 | 默认商务浅色，不问 |
| 演讲者备注 | 默认不写，不问 |

用户说"直接做 / 你决定 / 看着办"或信息已完整 → 跳过反问。**禁止多轮追问**。沟通时统一用「页 / 封面 / 目录 / 这一页」等术语，不暴露内部实现。



## 目录结构规范
```markdown
<your_project_dir>/
├── DESIGN.md                 # 项目设计稿
├── STORY.md                  # PPT 内容叙事文档
├── style_preview/            # 上传 PPTX 的 6/9 宫格风格图（可选）
├── resources/extracted/      # extract.py 输出（docx/pdf 提取产物，可选）
├── resources/images/         # 本地图片资源（生图或复制材料图）
├── pages/                    # PPT 页面文件
│   ├── slide_01_cover.jsx
│   ├── slide_02_catalog.jsx
│   └── slide_10_end.jsx
```
命名约定：
- 页面文件：`slide_{两位序号}_{snake_case 描述}.jsx`，如 `slide_01_cover.jsx`。
- 图片文件：禁用中文、空格、特殊字符。

## 环境介绍

| 变量 | 含义 | 值 |
|---| --- | --- |
| `WB_HOME`        | WorkBuddy 基础目录 | `$HOME/.workbuddy` |
| `NODE_BIN_DIR`   | 托管 Node.js 的目录 | `$HOME/.workbuddy/binaries/node/versions/22.22.2/bin` |
| `NPM_BIN_DIR`    | 托管 npm 的目录 | `$HOME/.workbuddy/binaries/node/versions/22.22.2/bin` |
| `PYTHON_BIN_DIR` | 托管 Python 的目录 | `$HOME/.workbuddy/binaries/python/versions/3.13.12/bin` |
