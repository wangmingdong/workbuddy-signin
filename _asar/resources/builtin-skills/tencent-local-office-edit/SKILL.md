---
name: tencent-local-office-edit
description: 通过本地 editor_sdk 实时读写本机磁盘上的 Office/WPS 类型文件——文件打开后用户在编辑器中实时可见，编辑所见即所得，保存用 save_file 即可、不要主动 close_file。适用于本地 doc/docx/dot/wps/wpt、xls/xlsx/xlt/csv/tsv、ppt/pptx/pps/pot 等文件的打开、编辑、保存与新建；含宏格式可打开但宏不执行，et/ett/dps/dpt 不支持。按 doc/sheet/slide 三类调用对应工具，调用任一编辑工具前先用 edsdk.py schema 查它单个的参数、不要凭摘要猜参数。所有操作经本目录 edsdk.py（python3 edsdk.py list/schema/call）封装，端点自动发现、上层无需关心底层细节。触发词：本地文档、本机 docx/xlsx/pptx/wps、Office/WPS 文件、editor_sdk、edsdk.py、本地编辑、实时编辑。
author: Tencent Docs
version: "0.0.1"
---

# 本地 editor_sdk MCP 应用

> 面向**本机磁盘文档**，通过本地 `editor_sdk` 进程的 MCP 服务读写。支持编辑的格式按三个品类归类：
> - **doc**：`.doc` `.dot` `.wps` `.wpt` `.docx` `.dotx` `.docm` `.dotm`
> - **sheet**：`.xls` `.xlt` `.xlsx` `.xltx` `.xlsm` `.xltm` `.csv` `.tsv`
> - **slide**：`.ppt` `.pps` `.pot` `.pptx` `.ppsx` `.potx` `.pptm` `.ppsm` `.potm`
>
> 打开时按文件内容（magic bytes）自动识别品类，扩展名仅作兜底。
> ⚠️ 这是**本地 Office/WPS 文件操作**通道，只操作本机磁盘上的文件。

### 格式限制

- **新建文件**：`create_doc` / `create_sheet` / `create_slide` 使用内置空白模板，分别新建 `.docx` / `.xlsx` / `.pptx`。
- **含宏格式**：`.docm` `.dotm` `.xlsm` `.xltm` `.pptm` `.ppsm` `.potm` 可按对应品类打开和编辑文档结构，但**宏不执行**，剥离宏后可能导致数据或样式差异。
- **不支持的 WPS 专属格式**：`.et` `.ett` `.dps` `.dpt` 当前不支持；需要先用 WPS 客户端另存为 `.xlsx` 或 `.pptx` 后再处理。
- **不属于本 Skill 的编辑范围**：`.xmind` 有独立 Mind Editor 但本目录未暴露 mind MCP 工具；`.pdf` / `.ofd` 仅查看，不提供编辑工具。

## 前置

- `python3`
- 本地 `editor_sdk` 服务已运行（默认从端口 39099 起探测）
- 所有调用都通过本目录的 **`edsdk.py`** 封装脚本完成（HTTP 直连 MCP 端点）：
  ```bash
  python3 edsdk.py list        # 验通：能列出工具即 OK
  ```
  > 未设置 `editor_sdk_port` 时，按顺序探测 `39099` 到 `39108` 共 10 个端口；命中后复用该端点。
  > 如需固定端口：`editor_sdk_port=40001 python3 edsdk.py list`（设置后只访问指定端口）。
  > 如服务启用鉴权，设置 `editor_sdk_token`。

## 🚧 强制流程（违反将导致参数错误 / 调用失败）

对任何 `doc_*` / `sheet_*` / `slide_*` 编辑工具：**渐进式按需查询，不要一次性拉全量 schema**。流程：

1. **选工具**：从子文档（[doc.md](./doc.md) / [sheet.md](./sheet.md) / [slide.md](./slide.md)）的一句话清单里挑出要用的工具——这一步不需要命令，清单就是索引。
2. **只查该工具 schema**：`python3 edsdk.py schema <工具名>`，直接得到必填项与各字段说明（内部只取这一个工具，不会全量打印）：
   ```bash
   python3 edsdk.py schema doc_insert_text
   ```
3. **调用**：确认 `[✓]` 必填项与各字段语义后再调。

> 用到一个才查一个，没用到的工具不要预先查。未经 `schema` 查询直接拼参数调用，属于流程违规。

调用前自检（三项缺一不可）：

- ☐ 已对**本次要用的工具**跑过 `edsdk.py schema <工具名>`
- ☐ 已确认全部 `[✓]` 必填字段
- ☐ 已确认位置 / 坐标 / 单位约定（如 doc 的 UTF-16 偏移、slide 的磅(pt)）

> 若你不确定某工具的必填参数，**默认你没查过**——先 `schema` 再调，不要凭子文档表里的一句话摘要猜参数。

## 约定 —— `edsdk.py` 三条命令

| 命令                                                        | 作用                                                                                   |
| ----------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `python3 edsdk.py list [doc\|sheet\|slide\|common]`         | 列出工具（工具名 + 一句话描述）；可按品类过滤                                          |
| `python3 edsdk.py schema <工具名>`                          | **按需**查单个工具的完整参数（required + 各字段说明）。加 `--raw` 附带原始 inputSchema |
| `python3 edsdk.py call <工具名> [k=v ...] [--json '{...}']` | 调用工具                                                                               |

入参写法：`key=value`（值优先按 JSON 解析：数字 / 布尔 / 数组 / 对象 / null，失败则当字符串）；
复杂 / 嵌套参数用 `--json '{...}'`（与 `key=value` 合并，同名键以 `--json` 为准）。

- **`file_id` 是一切编辑的入口**：先 `open_file` / `create_*` / `get_pool_status` 拿到工具返回的真实 `file_id`，再调品类工具。⚠️ **不要拿 `file_path` 当 `file_id` 用**——必须用工具实际返回的 `file_id`。
- **品类由文档类型决定**：`doc_*` 只能作用于 doc 文档，依此类推；类型不匹配会报错。
- **编辑后重新读取**：编辑后若要基于文档现状继续操作，先重新读取最新数据；不要沿用编辑前缓存的内容、位置或版本。
- **保存后不要主动关闭**：保存用 `save_file`；不要主动 `close_file`，除非用户明确要求关闭或确实需要释放资源。
- **源码 1:1 对应**：`doc_*` → `server/mcp/doc/`，`sheet_*` → `server/mcp/sheet/`，`slide_*` → `server/mcp/slide/`。

## 工作流：先打开文件，再编辑，最后保存

> ⚠️ **本套操作是实时、可视化的**——文件打开后用户正在实时查看编辑效果。
> **不要主动调 `close_file`**：保存用 `save_file` 即可，关闭会关掉用户正在看的视图、释放编辑器。
> 仅在用户明确要求关闭、或确实需要释放资源时才调 `close_file`。

> ⚠️ **打开文档必须用 `present_files` 工具**：要让用户在预览面板中看到文档，必须调用 `present_files` 工具把文件打开呈现给用户——这是打开动作的硬约束，不能只在回复文字里说「已打开」而不实际调用。`edsdk.py call open_file` 只是拿到编辑用的 `file_id`，不会把视图呈现给用户。
>
> ⚠️ **已用 `present_files` 打开的文档，不要再 `open_file` 重复打开**：此时文档已在编辑器里，应调 **`get_pool_status` 列出当前打开的文档**，按文件路径 / 文件名匹配出目标文档对应的 `file_id`，再直接调编辑工具；也可 **从用户的选区信息中获取** `file_id`。重复 `open_file` 会另起一个编辑实例，和用户正在看的视图脱节。
>
> ⚠️ **`present_files` 返回的是文件地址，不是 editor_sdk 的 `file_id`**：那个地址不能直接当 `file_id` 传给 `doc_*` / `sheet_*` / `slide_*` 编辑工具。真正的 `file_id` 只能来自 `open_file` / `create_*` 的返回，或用 `get_pool_status` 查已打开实例、按路径匹配拿到。

```bash
# 1. 打开本地文件 → 在预览面板中呈现给用户（硬约束：必须调用 present_files 工具）
#    present_files 工具：把 /abs/a.docx 在预览面板中打开给用户看
# 2. 从返回结果里取真实的 file_id（不要拿 file_path 当 file_id 用）
python3 edsdk.py call open_file file_path=/abs/a.docx
#    → 返回 {"file_id": "<真实ID>", ...}；后续所有调用都用这个返回的 file_id

# 3. 编辑（按品类调用，见下方子文档；调用前先 schema 查参数）
python3 edsdk.py schema doc_insert_text
python3 edsdk.py call doc_insert_text file_id=<上一步返回的 file_id> idx=0 text="hi"

# 4. 保存（file_path 省略则覆盖原文件）—— 到此即可，不要主动 close
python3 edsdk.py call save_file file_id=<上一步返回的 file_id>
```

> **文档已用 `present_files` 打开（没走 `open_file`）时**：先用 `get_pool_status` 列出当前打开的文档，按文件路径 / 文件名匹配出目标，取它的 `file_id`，再直接编辑——不要重新 `open_file`。
>
> ```bash
> python3 edsdk.py call get_pool_status     # 返回已打开文档列表，含各自的 file_id 与路径
> # 按 /abs/a.docx 匹配到对应条目 → 取其 file_id
> python3 edsdk.py call doc_insert_text file_id=<匹配到的 file_id> idx=0 text="hi"
> ```

## 通用工具（文件 / 会话管理，无品类前缀）

这些是**入口工具**，所有品类共用；具体编辑接口见各子文档。

| 工具 | 必填 | 说明 |
|---|---|---|
| `open_file` | `file_path` | **无头打开**本地文件（doc/sheet/slide 自动识别），仅返回编辑用的 `file_id`，**不会展示任何界面**。只有任务明确不需要给用户展示时才直接用它；**一般「打开」都应走 `present_files` 工具**，让用户在预览面板中实时看到文档。⚠️ 文档已用 `present_files` 打开后不要再 `open_file`，改用 `get_pool_status` 查已打开实例或从选区拿 `file_id` |
| `get_pool_status` | — | 查看当前打开的编辑器池状态；用它拿到**已打开文档**的 `file_id`，避免对已展示的文档重复 `open_file` |
| `save_file` | — | 保存到本地；`file_path` 省略则覆盖原文件 |
| `close_file` | `file_id` | 关闭编辑器、释放资源。⚠️ **实时可视化场景下不要主动调**——会关掉用户正在看的视图；仅在用户明确要求时调 |
| `create_doc` / `create_sheet` / `create_slide` | — | 从空白模板新建对应类型文档，返回 file_id |
| `shutdown` | — | 关停 editor_sdk 服务 |

## 品类编辑接口（按文档类型进入子文档）

`file_id` 拿到后，按文档类型调对应品类的工具（工具名带品类前缀）：

| 品类      | 文档类型                         | 工具数 | 子文档                 |
| --------- | -------------------------------- | ------ | ---------------------- |
| **doc**   | Word/WPS 文档类（doc/docx/dot/wps/wpt…） | 37     | [doc.md](./doc.md)     |
| **sheet** | Excel 表格类（xls/xlsx/xlt/csv/tsv…）    | 51     | [sheet.md](./sheet.md) |
| **slide** | PPT 演示类（ppt/pptx/pps/pot…）          | 77     | [slide.md](./slide.md) |
