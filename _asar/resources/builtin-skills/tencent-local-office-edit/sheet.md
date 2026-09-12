# sheet（本地 Excel 类）编辑接口

上级：[SKILL.md](./SKILL.md)。工具名带 `sheet_` 前缀。

```bash
python3 edsdk.py list sheet
python3 edsdk.py schema <sheet_tool>
python3 edsdk.py call <sheet_tool> file_id=<id> sheet_id=<sid> ...
```

完整工具清单和参数以服务端 `tools/list` / `schema` 实时返回为准；本文只记录 sheet 特有的操作约定。

> ⚠️ 接口列表只用于选工具；真正调用任何 `sheet_*` 工具前，必须先执行
> `python3 edsdk.py schema <工具名>` 获取参数，不要凭列表或记忆填写。
> 复杂参数用 `--json '{...}'`；对参数拿不准时只查本次要用的工具 schema，不要全量拉取。

## 关键约定

- 批量写值优先用 `sheet_set_range_value` 或 `sheet_set_range_value_by_csv`。
- 批量文本替换用 `sheet_replace`。
- 单元格、区域、行列、样式、图表、透视表、筛选等操作都应先明确目标 `sheet_id` 和范围。
- 图表、透视表、筛选、合并单元格等对象类操作，先读当前状态，再按 schema 更新。

## 坐标规则

- `file_id` 定位工作簿，`sheet_id` 定位子表；不要把路径、工作簿名或子表名当作 ID。
- 行列索引、区域边界按 schema 填写；本地 sheet 工具通常使用 0-based 坐标。
- 普通写值 / 改样式不会改变坐标；插入、删除、移动行列或区域会改变结构，旧坐标、旧范围、对象锚点可能失效，继续操作前先重新读取。

## 操作顺序

- 需要大量写入时，用 `sheet_set_range_value` / `sheet_set_range_value_by_csv`，不要逐格循环调用。
- 需要批量查找替换时，用 `sheet_replace`；调用前查 schema，确认是否按公式、大小写、正则等维度匹配。
- 需要“结构调整 + 写值”时，优先先完成结构调整并重新读取坐标，再写目标数据；如果先写值再增删行列，也要意识到后续坐标会被结构操作改写。
- 参与计算、图表、透视表的数据单元格应尽量写成数值类型；纯字符串即使看起来像数字，也可能影响公式、排序、图表和透视表的数据表达。

## 图表提示

- `sheet_add_chart` / `sheet_update_chart` 调用前先查 schema；复杂参数和不支持类型以 schema description / 接口错误为准。
- `drawing_id` 是图表标识，新增时需唯一，后续更新 / 删除都靠它定位。
- `data_range` / `location` 使用 0-based 行列，`location` 偏移和宽高是像素；数据源避免隐藏行列、无关数据和字符串数字。
- 改过数据源、图表类型或系列方向后，先 `sheet_get_charts` 读回真实系列数量和顺序，再改 `options.series`。
- `options` 是 patch，只传要改的字段；饼图 / 环形图扇区样式写到 `series[0].dataPoints`。

## 对象操作

- 图表、透视表、筛选、合并单元格等对象都应先读当前状态，再按 schema 更新；不要凭旧缓存拼更新参数。
- 透视表更新只适合改已有配置；如果需要换数据源范围，通常删除后重建更清晰。
- 合并单元格、筛选范围、透视表锚点、图表锚点都可能受结构性行列操作影响；结构变化后先重新读取对象列表或详情。

## 接口列表

| 工具 | 说明 |
|---|---|
| `sheet_add_chart` | 在本地表格中添加图表 |
| `sheet_add_pivot_table` | 在本地表格中创建透视表 |
| `sheet_add_sheet` | 在本地表格中添加一个新的子表 |
| `sheet_audit_formula_consistency` | 审计某区域内公式结构的一致性：把每个公式归一化为 R1C1（位置无关）后按结构分组 |
| `sheet_calculate_formulas` | 批量试算本地表格中的多个公式 |
| `sheet_calculate_single_formula` | 试算本地表格中的公式 |
| `sheet_clear_border` | 清除本地表格指定区域单元格的边框 |
| `sheet_clear_link` | 清除本地表格指定单元格的超链接 |
| `sheet_clear_range_all` | 清除本地表格指定区域内所有单元格的内容和样式 |
| `sheet_clear_range_cells` | 清除本地表格指定区域内所有单元格的内容 |
| `sheet_clear_range_style` | 清除本地表格指定区域内所有单元格的样式（如字体、颜色、背景色、对齐、数字格式等） |
| `sheet_copy_sheet` | 复制本地表格中的子表，生成一个内容相同的副本子表 |
| `sheet_delete_chart` | 删除本地表格中指定的图表 |
| `sheet_delete_dimension` | 删除本地表格指定位置的行或列 |
| `sheet_delete_range` | 在本地表格指定区域删除单元格，通过删除行或列实现后续单元格的左移或上移 |
| `sheet_delete_sheet` | 删除本地表格中指定的子表 |
| `sheet_get_cell_data` | 获取本地表格指定区域的单元格数据 |
| `sheet_get_cell_style` | 获取本地表格指定区域单元格的样式信息 |
| `sheet_get_charts` | 获取本地表格指定子表下的所有图表信息 |
| `sheet_get_dimension_size` | 读取本地表格指定行的行高或指定列的列宽，返回单位为像素 |
| `sheet_get_merged_cells` | 获取本地表格指定区域内与该区域相交的合并单元格信息 |
| `sheet_get_object_list` | 获取本地表格指定子表上的对象列表 |
| `sheet_get_pivot_table_detail` | 读取指定透视表的详细配置（数据源、行/列/值/筛选、锚点位置、ID 等） |
| `sheet_get_sheet_info` | 获取本地表格的子表信息 |
| `sheet_insert_dimension` | 在本地表格指定位置插入行或列 |
| `sheet_insert_image` | 在本地表格指定单元格插入一张图片 |
| `sheet_insert_range` | 在本地表格指定区域插入空白单元格，通过插入行或列实现选中区域的右移或下移 |
| `sheet_merge_cell` | 合并本地表格指定范围的单元格 |
| `sheet_move_dimension` | 在本地表格中移动一段连续的行或列到新的位置 |
| `sheet_move_sheet` | 移动本地表格中子表的顺序 |
| `sheet_remove_filter` | 移除本地表格的筛选 |
| `sheet_remove_pivot_table` | 删除指定的透视表 |
| `sheet_rename_sheet` | 重命名本地表格中指定的子表 |
| `sheet_replace` | 在本地表格中查找并替换文本 |
| `sheet_set_border` | 设置本地表格指定区域单元格的边框样式 |
| `sheet_set_cell_style` | 设置本地表格指定范围单元格的样式 |
| `sheet_set_cell_value` | 设置本地表格指定单元格的值 |
| `sheet_set_dimension_size` | 批量设置本地表格指定行的行高或指定列的列宽 |
| `sheet_set_dimension_visible` | 批量设置本地表格指定行或列的可见状态 |
| `sheet_set_filter` | 为本地表格指定数据区域设置筛选 |
| `sheet_set_freeze` | 设置本地表格的冻结行列数 |
| `sheet_set_link` | 为本地表格指定单元格设置超链接 |
| `sheet_set_range_value` | 批量设置本地表格多个单元格的值 |
| `sheet_set_range_value_by_csv` | 以CSV格式批量插入数据到本地表格 |
| `sheet_set_sheet_visible` | 设置本地表格中指定子表的可见状态 |
| `sheet_sort_range` | 对本地表格指定区域按列排序 |
| `sheet_unmerge_cell` | 取消本地表格指定区域的单元格合并 |
| `sheet_unset_freeze` | 删除本地表格指定子表的所有冻结行列 |
| `sheet_update_chart` | 更新本地表格中指定图表的类型、位置、尺寸、数据区域和标题 |
| `sheet_update_filter` | 更新本地表格已有筛选的范围和/或列筛选项 |
| `sheet_update_pivot_table` | 更新已有透视表的字段配置（行分组、列分组、数据值、筛选、计算字段） |

> 参数 schema 以服务端 `tools/list` 实时返回为准；上表为一句话摘要。
