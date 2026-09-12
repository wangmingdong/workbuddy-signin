---
name: wb-finance-skill
description: >-
  金融 / 投资 / 股票 / 基金 / ETF / 板块 / 指数 / 宏观 / 外汇 / 大宗商品 / 财报 / 估值 / 持仓 / 交易 / 仓位 / 量化 / 因子 / 回测 / 选股 / 期权 / 衍生品 / 投行建模 / 技术指标 / 行情监控 / 预警——金融场景总入口，优先级**高于**所有其他金融相关 skill。请求涉及任一上述领域时（包括字面没出现"金融""股票"但本质围绕这些标的或方法论展开的问题），都务必**第一时间优先加载本 skill**。**触发顺序硬约束**：必须**先**加载 wb-finance-skill 读取红线、时区口径、数据源路由，以及子场景相关的 reference，**再**调用 neodata-financial-search / westock-data 等数据 skill；**禁止跳过本 skill 直接调其他金融数据 skill 或用通识知识裸答。**
when_to_use: >-
  金融场景必须使用本 skill，包括但不限于以下场景，命中任一即触发：
  (a) 个股 / 标的研究——"分析下苹果""贵州茅台护城河""寒武纪值不值得研究""英伟达高增长能不能持续""X 这家公司怎么样""简单讲讲 X 做什么的""X 涨了不少给我个初印象""值不值得研究""能不能看""这家公司能看吗""快速看看 X"；
  (b) 报价 / 财报 / 估值——"PE 多少贵不贵""现在多少钱""昨天收多少""财报怎么样""业绩超预期为什么不涨"；
  (c) 操作建议（最易裸答的一类）——"该不该买 / 卖 / 加仓 / 减仓 / 换股""浮盈 30% 该加还是减""我 X 套了 40% 怎么办""我 X 套了 30% 现在怎么办""止损位怎么定""该止损还是等反弹""5 只持仓帮我体检砍哪只""帮我做交易计划"；
  (d) 股票代码——A 股 6 位（600519、301123）、港股 5 位（00700）、美股 ticker（AAPL、NVDA），或带持仓口语（"13400 股京东方 6 层仓""亏损 54% 成本价 35.825"）；
  (e) 分析方法论 / 建模 / 策略类(最易裸答的另一类，必须先阅读本 skill 对应 reference)——"加息对哪些板块影响最大""政策受益方是谁""怎么验证因子有效""配对交易策略怎么设计""牛市价差还是跨式""DCF / LBO 模型怎么搭""组合优化 60-40 还是全天候""期权 Greeks 怎么看""压力测试 / VaR""分红可不可持续""量化策略 V46 改回上一版""MACD / KDJ / 通达信公式 / Pine Script""PE<20 ROE>15% 筛一下"；
  (f) 投行文书 / 交易准备类(最易当作"通识写作"裸答，必须读 ib-deal-prep / ib-models reference)——"NDA / 保密协议 怎么写""pitch deck 结构有什么讲究""投委会备忘录 / IC memo 怎么准备""流程函 / process letter 怎么写""尽调清单 / DD list 怎么列""teaser / 匿名预告 怎么写""信息备忘录 / IM 数据包结构""融资摘要 / 融资 deck 写法""路演材料怎么准备"。
version: 1.6.0
---


## 红线（金融场景一票否决）

- **禁止编造数据**：不虚构数据/事件/公司名/财务数字；数据源缺失时直接说明"当前数据源未覆盖 / 需进一步核实"，不要编一组数据再加"待核实"标签；引用不确定的研报/论文时标"该引用需核实原文"
- **禁止核心概念混淆**：客户 vs 竞争对手、整机厂 vs 零部件厂、净利润 vs 归母净利润、同比 vs 环比、财年 vs 自然年；不确定时用"据我理解"前缀并请用户确认
- **禁止数据自相矛盾**：同一回答内数据与结论必须一致；多组数据先交叉校验；数据源冲突时优先采信高层级来源（交易所、公司公告、年报）并显式标注分歧
- **强制免责声明**：所有包含具体投资建议、操作价位、买卖判断、仓位调整建议的输出，必须在回复末尾附加以下免责声明模板（固定文案，禁止模型自行改写、缩减或省略）：

  > **免责声明**：以上内容基于公开数据和量化分析，仅供参考，不构成投资建议。市场有风险，投资需谨慎。任何投资决策应结合个人风险承受能力、资金状况和投资目标独立判断，必要时咨询持牌专业机构。过往表现不预示未来收益。

## Available Capabilities

三个数据 skill 协同覆盖 A股/港股/美股 全品类金融数据：

- **`neodata-financial-search`**：自然语言通用金融数据搜索，覆盖股票、指数、板块、公募基金、宏观、外汇、贵金属和大宗商品期货；股票覆盖 A股/港股/美股，宏观/外汇/商品覆盖全球,支持实时行情与长期历史数据
- **`westock-data`**：腾讯自选股结构化行情数据 skill，**查单只标的的详细数据**——实时行情、K线/分时、财务报表、资金流向、技术指标、筹码、机构评级/研报/一致预期、新闻/公告、风险事件、股东结构、分红除权、业绩预告、ETF、板块/概念成份股、热搜、投资日历、新股日历、宏观经济等；支持沪深/科创/北交所、港股、美股
- **`westock-tool`**：腾讯自选股**选股 / 选基筛选** skill，**从全市场批量筛选出符合条件的股票/ETF 列表**——条件选股（filter，如 PE<20 且 ROE>15）、策略选股（strategy，如 MACD金叉/巴菲特策略）、标签选股（label，如央企/ST股/破净股/高股息ETF）、事件选股（event，如近期解禁/回购/增减持的股票池）、排行选股（ranking，如评分TOP10/两融减仓最多/ETF规模榜）。**与 westock-data 分工：找"哪些股票"用 westock-tool，查"某只股票详情"用 westock-data**

## 数据查询优先级策略

**先判断任务类型，再选择首选数据源；“优先”只在数据源适用的前提下成立。**
| 任务类型 | 首选数据源 | 直接跳过首选源的条件 |
|---|---|---|
| 全市场选股、筛选、排行 | `westock-tool` | 不适用其他通用数据源先拉全量数据再手工筛选 |
| 单标的技术指标、筹码、股东结构、ETF 持仓等明确结构化字段 | `westock-data` | 字段不在其覆盖范围 |
| 自然语言综合查询、宏观、行情、财报等通用金融数据 | `neodata-financial-search` | neodata 明确不覆盖目标市场、资产或字段 |
| 特殊字段补充或多源交叉验证 | 通达信 MCP（如可用） | 环境未安装或无对应工具 |
| 以上均不适用或不可用 | 公开信息检索 | — |

不得因某个数据源的命令示例更具体而跳过任务路由。只有在首选源不覆盖、发生可恢复失败、结果不满足时效要求或需要交叉验证时，才进入下一可用数据源。

### 第一优先：`neodata-financial-search`
- **默认优先使用此 skill** 查询金融数据
- **为什么通用查询优先使用它**：neodata 适合自然语言金融查询，覆盖多个市场与资产类别，并能直接返回带时点的结构化结果。对其明确不覆盖的字段或场景，应直接路由到对应数据源，不做无效调用。
  但命中下列典型限制时直接跳过，避免无效调用
- 覆盖股票行情、财报、基金净值、板块异动、宏观指标、外汇、大宗商品等
- 支持自然语言提问，实时数据，即问即答
- **典型限制**：公募基金主要覆盖中国境内基金，不覆盖香港基金；板块/指数基础、板块资金和估值主要覆盖 A股；龙虎榜、融资融券、业绩发布会、估值/同行对比等偏 A股；商品/贵金属以行情为主，不等同于完整基本面数据库
- **触发条件**：金融数据查询先判断覆盖范围；在覆盖范围内优先用它，明确不覆盖时直接用 westock-data 或公开信息检索
- **降级策略**：neodata 优先但首次失败后，可在确认查询表达或参数存在调整空间时重试一次；若仍失败或错误明确不可恢复，立即降级。

### 第二优先：`westock-data`
当以下情况出现时，切换或补充 westock-data：
- neodata-financial-search **没有覆盖**该数据类型（如技术指标、筹码成本、股东结构、ETF 持仓明细、龙虎榜、大宗交易、融资融券、投资日历、新股日历等）
- 需要**更精确的结构化数据**或特定字段
- 需要**跨市场批量对比**（westock-data 支持逗号分隔多股代码）

**westock-data 命令速查：**
```bash
# 代码格式：沪市 sh600519 / 深市 sz000001 / 港股 hk00700 / 美股 usAAPL

westock-data search 腾讯控股                         # 搜索股票/ETF/指数
westock-data quote sh600519                          # 实时行情
westock-data kline sh600519 --period day --limit 20  # K线
westock-data minute sh600519                         # 分时
westock-data finance sh600519 --num 4                # 财务报表（最近4期）
westock-data profile sh600519                        # 公司简况
westock-data asfund sh600519                         # A股资金流向
westock-data hkfund hk00700                          # 港股资金
westock-data usfund usAAPL                           # 美股卖空
westock-data lhb sz000001                            # 龙虎榜（仅A股）
westock-data blocktrade sz000001                     # 大宗交易（仅沪深）
westock-data margintrade sz000001                    # 融资融券（仅沪深）
westock-data technical sh600519 --group macd         # 技术指标
westock-data chip sh600519                           # 筹码成本（仅A股）
westock-data shareholder sh600519                    # 股东结构
westock-data dividend sh600519                       # 分红数据
westock-data etf sh510300                            # ETF详情
westock-data etf-holdings sh510300                   # ETF持仓
westock-data hot stock                               # 热搜股票
westock-data sector --search 华为                    # 搜索板块/概念
westock-data calendar "$TARGET_DATE"                 # 按目标日期查询投资日历
westock-data macro --indicator gdp --year "$TARGET_YEAR"    # 投资日历
westock-data ipo hs                                  # 新股日历
westock-data reserve sh600519                        # 业绩预告
westock-data suspension hs                           # 停复牌信息
westock-data macro --indicator gdp --year <YYYY>   # 按用户要求或目标周期查询宏观数据
```
**westock-data CLI 路径容错**：若执行 `westock-data` 报 `command not found`，**优先用软链接把 CLI 挂回 PATH**。先定位 skill 根目录下的入口（`package.json` → `bin`，通常为 `scripts/index.js`；Base directory 以实际环境为准），再链到用户 PATH 目录，例如 macOS：

```bash
mkdir -p ~/.local/bin
ln -sf /Applications/WorkBuddy.app/Contents/Resources/app.asar.unpacked/resources/builtin-skills/westock-data/scripts/index.js ~/.local/bin/westock-data
# 确保 ~/.local/bin 在 PATH 中后，直接 westock-data <subcommand> …
```

软链不可用或仍失败时，可直接执行该 `scripts/index.js` 绝对路径；再失败才降级其他数据源。禁止无限搜路径或重复裸跑同一失败命令。

**westock-data 已知限制：**
- 龙虎榜/大宗交易/融资融券：仅支持沪深（sh/sz）
- 筹码成本：仅支持沪深京A股（sh/sz/bj）
- 股东结构：仅支持A股和港股
- 港股/美股货币单位：展示时必须标注正确货币单位，禁止使用人民币符号
- `search`/`minute`：不支持批量查询

### 选股 / 筛选场景专用：`westock-tool`（按场景分流，不是兜底）
**只要用户要的是"从全市场找出哪些股票 / ETF"——而不是查某只标的的详情——就用 `westock-tool`，不要用 westock-data 拉一堆代码再手动排序过滤。**

触发口语：「找一只 / 哪些股票 / 帮我选 / 推荐 / 排行榜 / TOP / 筛选 / 选基 / 选 ETF」、「PE<20 且 ROE>15 的股票」、「MACD 金叉的票」、「央企股 / ST股 / 破净股 / 新股」、「高股息 ETF / 千亿基金」、「近期解禁 / 回购 / 增减持的股票」、「两融减仓最多 / 评分 TOP10 / 涨停封单最大」。

五个入口（详见 `westock-tool` 自身的 SKILL.md + references）：
- `filter`：自定义条件表达式（PE<20 且 ROE>15）/ `filter --preset`：条件型预设（低PE股、高股息股）
- `strategy`：预置策略信号（MACD金叉、巴菲特策略）
- `label`：分类标签（央企 / ST股 / 破净股 / 新股；ETF 加 `--asset etf`）
- `event`：事件触发的**股票池**（近期解禁 / 回购 / 大宗 / 上龙虎榜 / 董监高增减持的"哪些股票"）
- `ranking`：按指标排序 / TOP / 榜单（评分、两融变动、涨停封单、ETF 规模 / 估值，支持在板块/标签/策略结果内二次排序）

**与 westock-data 的高频边界（务必区分）**：
- "**哪些股票** XX" / "**最近 N 天** XX 的股票" / "XX 排行榜" → **westock-tool**（股票池 / 排序）
- "**某只股票** XX 的明细" / "**某天** XX 的清单" → **westock-data**（个股详情 / 日期日历）
- 例：「近期回购的股票」用 `westock-tool event buyback`；「腾讯的回购明细」用 `westock-data buyback hk00700`
- ❌ 概念股 / 板块成份查询不属于 westock-tool，用 `westock-data sector --search`
- ❌ 不要"手搓筛选"（westock-data 拉行情再 Python/awk 过滤）——westock-tool 的 filter/ranking 已直接支持

**调用避坑（实测踩过的坑，调用前务必注意）**：
- `label` / `event` 必须用**英文 listcode**（如央企用 `shareholder_central_state`，不是中文"央企"，否则报 `service error`）；不确定先 `label --list` / `event --list` 查
- `filter` 多条件必须用 `intersect([A, B, C])`，不支持 `&` / `AND`；亏损股 PE/PB 为负，要先排 `PE_TTM > 0`
- 港股加 `--market hk` 且用港股字段名（`PeTTM` / `DivTTM`，与沪深 `PE_TTM` / `ROETTM` 不同口径），美股 `--market us`
- 央企用 `shareholder_central_state`；用户口语"国企"通常指地方国企，用 `shareholder_local_state`

### 第三优先（如可用）：通达信 MCP
**仅在用户环境装了通达信 MCP 时启用**——通过列出的 MCP 工具是否包含 `tdx_quotes` / `tdx_kline` / `tdx_api_data` / `tdx_indicator_select` / `tdx_screener` / `tdx_lookup_stock` / `wenda_news_query` / `wenda_notice_query` / `wenda_report_query` / `wenda_macro_query` 来判断。可用时优先在以下场景调用：

- 上面两个 skill 没覆盖或返回不全的细分接口（深度财务三表多期、十大流通股东全历史、限售解禁、股本变动、港股财报多期回溯、个股 / 全市场龙虎榜结构化、自然语言条件选股、宏观时序数据）
- 需要按通达信特有路由（`entry` + `fixedTag` + `code`）取结构化字段，而不是 LLM 描述
- 验证两个 skill 给出数据是否准确（多源交叉验证）

**调用前先读 references/tdx-mcp-quick-reference.md** —— 里面是 10 个工具的实测调用示例、参数含义、fixedTag 路由表、错误排查方法、已知限制。**不要凭记忆拼参数**（setcode、target、fixedTag 都有踩坑点）。

### 第四优先：公开信息检索
当上述都无法满足时：
- 使用 WebSearch 检索公开信息
- 明确告知用户数据来源，并说明非实时性

## 数据底线

- **前提显式**：问操作类问题（买/卖/加仓/减仓/换股）时，先列前提（市场环境 + 用户风险偏好 + 资金量/期限），再给"条件 → 操作 → 风险提示"。前提缺失时主动追问而非直接给操作建议
- **工具优先于记忆**：提及具体股票/基金/指数/宏观指标时，先调 `neodata-financial-search` 或 `westock-data`（选股 / 筛选 / 排行类用 `westock-tool`；如通达信 MCP 可用，按"数据查询优先级策略"中的场景调用）拉数据，禁止纯凭记忆作答；记忆中的数字只能作为合理性 sanity check，不能作为答案
- **禁止硬编码数据**：所有行情、财务、宏观和技术指标必须通过工具动态获取并标注来源和时点，禁止在回答中直接引用训练数据中的历史数值或凭记忆输出数字
- **时效意图与目标周期解析**：用户表达“最新、当前、今天、今年、近期”等时效要求时，先结合运行时日期、市场交易状态、指标发布频率和数据发布时间确定目标周期，不得把当前年份直接等同于最新有效数据周期。用户明确指定历史日期、年份、季度、财年或回测时点时，以用户指定范围为准，不得自动改写为当前周期。

- **查询结果时效校验**：数据返回后核对其统计周期、发布时间和数据截止时间是否满足用户要求：
  1. 数据已覆盖目标周期时，按实际周期使用并标注时点；
  2. 当前周期尚未发布时，使用最近已发布周期，并明确说明数据截止时间；
  3. 返回数据明显早于目标周期时，调整时间参数或更换数据源重新查询；
  4. 仍无法取得满足要求的数据时，明确声明数据缺口和最近可用时点，不得将历史数据表述为当前数据。
- **所有关键数据必须可追溯到来源 + 时间戳**：行情 / 财务 / 宏观 / 研报数字不能裸出；每个关键数字附近都要能追溯到"来源 + 时点"（YYYY-MM-DD 或 YYYYQn），不要只在文末放一个总来源。同一数据块共享相同来源、周期和口径时，可在表头、表尾或图注统一标注，来源或周期不同时，再分别标注。来源可来自 neodata / westock-data / 通达信 MCP / 交易所公告 / 公司年报 / 港交所披露易 / 研报 / WebSearch；WebSearch 兜底时也要标媒体名 + 日期，若生成 HTML，最好把 WebSearch 原文链接做成可点击链接。研报和媒体数据要标清"非一手来源 / 需核实原文"，不要把它们和公司公告同等处理
- **来源标注粒度与数据粒度匹配**：同一表格、图表或数据卡片中的数据共享相同来源、统计周期和口径时，可在表头、表尾或图注统一标注，无需在每个单元格重复。只有不同子项来源、时点或计算口径不同时，才需要分别标注。任何关键结论都应能追溯到对应的数据来源和时点。
- **来源质量分级**：
  - **一手来源**（交易所公告、统计局、公司年报/季报、央行/监管机构）：可直接采信，标注机构名 + 发布日期
  - **非一手来源**（财经媒体、研报引用、第三方数据平台二次引用）：必须标注"需核实原文"，不得与一手来源同等处理。研报引用还需标注研报机构 + 发布时间
- **输出来源规范**：HTML 报告应在数据卡片、图表或表格附近标注来源和数据时点；Markdown 应在关键数据首次出现处标注来源。共享来源的数据可合并标注，避免重复信息影响可读性。
## 时间口径（跨时区/跨市场必查）

金融数据强时效，回答时遵守以下规则：

- **先判断交易状态**：回答"现价/最新/今天"前，先确认是不是该市场交易时段；不在时段内必须标注"盘前/盘中/盘后/休市"和对应的最近一次 close
- **美股时间先核对 DST**：美国夏令时期间美股开盘对应北京 21:30，冬令时对应 22:30；每次按当前日期推导，不要硬记切换日
- **事件时点本地+北京双标**：财报、央行决议、经济数据等事件，同时给本地时间和北京时间，并标注盘前还是盘后。例：苹果 FY25Q1 财报 = 2025-01-30 美东盘后 16:30（北京时间 2025-01-31 05:30）
- **相对时间默认北京时区**：用户说"今天/昨天/本周"按北京时间解释；有歧义时（如"昨天美股"）第一句先点明绝对日期
- **跨市场比较先对齐窗口**：A股 T 日收盘 / 港股 T 日收盘 / 美股 T-1 夜盘 / 美股 T 日盘 不是同一时点；做联动分析时点明用的是哪种对齐
- **跨市场财报同期对比按自然年季度对齐**：FY 标号本身不能直接对（如腾讯 FY26Q1 = 自然年 2026Q1，阿里 FY26Q1 = 自然年 2025Q2，对不上）。先把每家 FY 拆成它实际覆盖的自然年季度（腾讯 FY = 自然年；阿里 FY 4 月制；苹果 FY 9 月底制；微软 FY 7 月制），再按"自然年同季度"配对做季度比，或用 **TTM 滚动 4 季** 做年度比——TTM 本身就是按自然年季度滚动求和，自动消除 FY 定义差异。详细步骤与币种 / 估值口径一致性见 `references/peer-comparison.md` 与 `references/valuation-pricing.md`

## 使用指南

**核心原则：最大化使用插件能力** — 任何涉及金融市场数据的请求，都要主动使用这几个数据源。

1. **识别意图**：判断请求需要实时/自然语言搜索（neodata）、单只标的结构化字段（westock-data），还是全市场选股 / 筛选 / 排行（westock-tool）
2. **自主执行**：不要让用户选择数据源，自行判断最合适的数据源
3. **错误兜底**：一个数据源报错或数据缺失时，自动尝试另一个
4. **清晰呈现**：用中文表头的可读表格展示返回结果
5. **按需组合**：复杂请求中多个数据源互补使用（如先 westock-tool 选出股票池，再 westock-data 逐只看详情）
6. **置信度分层**：高置信度直接断言；中等用"倾向于 / 大概率"；低用"不排除 / 有可能"。不要把所有可能性平铺让用户自选
7. **结果尽可能用 HTML 可视化呈现**：分析、对比、研报型回答尽量产出 HTML 文件（用 `Write` 落地 HTML，对话里把文件路径告诉用户）；简短 Q&A、单数字查询、Yes-No 判断仍用 Markdown。HTML 用浅底深字研报风、首屏结论先行；数据图用 ECharts、关系拓扑图用 SVG/CSS、查阅型用表格。**关键约束：手写的内联 JS / ECharts option 极易括号或引号失配，一处错整页图表全废——HTML 写完交付前必须做一次 JS 语法自检（`node --check` 或等价），报错改到通过再交付。** 复杂图优先套用现成 option 骨架填 data，不要从零手敲嵌套结构。HTML 风格、ECharts 骨架、图表分工与质量细则（图表可切换 / 多取周期消空值 / 双轴量级 / 空值不入图）见 `references/html-report-style.md`，产出 HTML 前先读它。
8. **加载后必须匹配 reference**：进入本 skill 后，必须完成以下三步，**不要只读 SKILL.md 主文件就直接答**——主文件只讲红线和路由，具体方法论（步骤、阈值、避坑）都在对应 reference 里。

   **第一步：问题拆解为场景标签**
   把用户问题拆成一个或多个场景标签。复合问题必须拆分（如"结合大盘分析 X 该不该买"→ `market-state` + `stock-deep-research` + `valuation-pricing` + `trade-plan`），禁止用单个宽泛标签覆盖全部需求。

   **第二步：核心方法论加载**
   每个主场景必须加载对应的核心 reference；存在多个主场景时分别加载。核心 reference 加载完成后，根据问题中的具体维度追加补充 reference。Reference 加载遵循“最小充分集合”原则：每个主场景优先选择一个最相关的核心方法论；只有用户需求包含独立分析维度、且当前核心 reference 无法覆盖时，才追加补充 reference。不设置机械固定上限，但禁止为了完成清单无边界加载无关文件。判断依据是方法论是否实际用于分析，而不是读取文件数量。

   问题场景与核心必选 / 条件追加对照：

   | 问题场景 | 核心必选 | 条件追加 | 质量底线 |
   |---|---|---|---|
   | 市场展望 / 大盘 | `market-state` + `macro-transmission` | 主线研判加 `market-mainline`；板块轮动加 `sector-comparison` | 不能只做指数涨跌描述 |
   | 个股全面分析 | `stock-deep-research` + `valuation-pricing` | 按问题加 `business-model` / `quality-growth` / `peer-comparison` / `industry-chain` | "全面"不能只加载个股初探 |
   | 技术指标 / 形态 | `price-action-tools` | 仅突破、VCP、波缩、真假突破时加 `breakout-patterns` | MACD/RSI 查询不强制加载 VCP |
   | 红利 / 分红 / 回购 | `dividend-buyback` | 估值性价比加 `valuation-pricing`；现金质量加 `quality-growth` | 不能以单次股息率代替持续性验证 |
   | 政策 / 题材 / 热点 | `policy-impact` | 市场主线加 `market-mainline`；产业映射加 `industry-chain` | 必须给出政策→行业→公司传导链 |
   | 订单 / 合同负债 / 前瞻指标 | `earnings-preview` + `quality-growth` | 收入模式加 `business-model`；涉及定价兑现才加 `valuation-pricing` | 不能把所有经营前瞻指标机械路由到估值 |

   **第三步：自检（输出前必须通过）**
   - 每个主场景是否都有核心方法论 reference？
   - 数据源是否按路由表选择，且降级原因合理？
   - 用户要求的关键分析维度是否均已覆盖？
   - 方法论是否实际体现在答案中，而不是只完成文件读取？
   - 每个关键数据是否能对应到来源、时点和口径；
     不同来源/周期的子项是否分别标注？
   - 是否包含具体买卖、价位或仓位建议；
     若包含，固定免责声明是否完整位于回复末尾？
   - 若存在缺失，继续补充、重新查询或明确缩小回答范围，
     禁止假装完成全面分析。

   `html-report-style.md` **只负责输出格式，必须在方法论匹配完成后加载，不能替代任何方法论 reference。** 禁止仅加载格式类、工具类或数据源类 reference 就直接输出分析结论。
9. **优先用 scripts/ 现成工具，不要从零重写算法**：`scripts/price-action/` 含 7 个技术分析信号引擎（K 线 / 谐波 / 波浪 / 缠论 / 一目 / SMC / 基础指标），`scripts/quant/` 含 6 个量化策略引擎（配对 / 季节性 / 波动率 / 多因子 / 基本面 / 分钟级），`scripts/ib/` 含 2 个投行 utility（DCF Excel 校验 / 投行材料数字一致性）。涉及技术指标计算 / 量化策略 / DCF 审核等场景时，**先 Read 对应 script 看输入约定，再 Bash 执行**，远比 model 自己重写算法快且不出错。具体工具清单见对应 reference 末尾的"可执行工具"section
10. **多角度深度挖掘（数据返回后必跑反思）**：拿到工具数据不是答题终点而是挖掘起点。每次数据返回后过 5 维，任一维度触发新线索 → 继续检索；五维都无增量才收尾。**不为凑深度硬造，但也不要拿到一条数据就收尾**
    - ① **纵向**再追一个"为什么"：查到"净利润下滑"→ 继续拆成本 / 收入结构
    - ② **横向**看上下游 / 竞对：查到"比亚迪毛利走低"→ 顺查赛力斯 / 理想看是不是行业性
    - ③ **时间**放到 3-5 年周期看分位：查到"PE 25×"→ 调 5 年 PE 带看历史分位是高是低
    - ④ **反面**找最薄弱假设：依赖"消费复苏"→ 主动查社零 / CPI 反驳信号
    - ⑤ **行动**给条件化决策：补"若 X 跌破 Y 则 ……"，让用户拿到可操作框架
11. **有观点 + 反向声音**：分析类回答必须给经过推演的判断（不是平铺 N 种可能让用户自选）；主动点出"市场普遍知道什么、还没充分定价什么"，必要时给反向声音（"这个加仓决定可能基于一个错误的归因 —— X 的上涨其实是 Y 引起的"），不要顺着用户思路一路点头

## 数据口径与标的核对

- **先核对标的身份**：公司名、港股代码、美股代码、ADR、ETF、同名公司必须先确认，避免把不同上市主体、ADR、本地股、ETF 或同名公司混用
- **香港产品先确认类型**：港股 `7709.HK` 这类代码可能是 ETF、杠杆产品、牛熊证或结构化产品；查 NAV 前必须先确认产品类型。对香港 ETF/杠杆产品，优先搜索基金管理人、HKEX、etnet/基金专页
- **多源交叉验证**：同一指标不同数据源给出不同数值时，至少列两个来源，优先采信交易所/公司公告/年报等一手来源，并显式说明分歧；不要静默选一个高于另一个的版本作为答案
- **区间 / 累计涨跌幅优先采信数据源的预计算字段，不要用 K 线自行重算**：问"近 N 日 / 区间 / 自某日起 累计涨跌幅"时，neodata 股票历史走势会直接给出「区间涨跌幅为 X%」并附起始价 / 终止价（口径＝窗口前一交易日收盘价 → 末日收盘价；中段行情折叠为"省略…禁止推断"标记，不可据其补全或累加）。westock-data kline 只给逐日 OHLC，自行取首末收盘算会因"基准取哪天 / 窗口含不含首日"口径偏差。已知事故：保变电气（600550）近 20 日累计涨跌幅，neodata 给 −17.09%（05-20 收盘 15.04 → 06-18 收盘 12.47），agent 改走 westock kline 按"今日收盘 vs 20 日前收盘(REF(C,20))"自算成 −11.81%（基准错取 05-22 收盘 14.14、窗口漏掉 05-20/05-21），与权威源差约 5pp。正确流程：① 这类 query 先走 neodata（自然语言搜"X 近 N 日累计涨跌幅"）→ ② 直接采信 payload 里「区间涨跌幅」那一行及其起始价 / 终止价，照搬其数值与口径 → ③ 仅当 neodata 不可用才退回 westock kline 自算，且基准必须取窗口**前一交易日**收盘价以与 neodata 区间涨跌幅同口径，禁止用窗口首日收盘当基准

## 场景方法论 references

`references/` 目录下是按场景蒸馏的金融分析方法论，覆盖个股研究、估值、财报事件、交易决策、板块主线、资金机构、宏观传导、技术分析、量化策略、衍生品、跨资产、危机周期、投行建模、日常 routine 以及 HTML 输出规范等。**当用户的请求落入对应场景时，先读取相应 reference 再作答。**

**使用规则**：
- 每条 reference 是"方法论 + 量化阈值 + 避坑"三段式，不是输出模板——分析时按其框架思考，但**不照抄章节标题或字数限制**
- 多场景叠加时（如"分析 A 股票该不该买"同时涉及个股研究 + 估值 + 仓位决策），并行读取多个 reference 综合判断
- 方法论类 references 只管"分析框架"，**数据获取走 neodata-financial-search / westock-data / westock-tool（选股）/ 通达信 MCP（如可用）**

**索引（按场景类别分组）**：

**数据源调用**
- `tdx-mcp-quick-reference.md` 通达信 MCP 调用速查（10 个工具实测示例、fixedTag 路由表、避坑清单、已知限制）—— 仅在用户装了通达信 MCP 时使用

**个股研究**
- `stock-first-look.md` 个股初探（含热门股快读）
- `stock-deep-research.md` 个股深度研究（投资逻辑研究）
- `business-model.md` 业务模式拆解
- `valuation-pricing.md` 估值与定价（PE/PB/DCF/PEG/分部估值）
- `moat-quality.md` 护城河与公司质地
- `management-assessment.md` 管理层体检
- `peer-comparison.md` 同业比选
- `quality-growth.md` 质量增长匹配（高质复利 / 增长质检 / 价值股息）

**财报与事件**
- `earnings-preview.md` 财报前瞻
- `earnings-review.md` 财报后反应（业绩会提炼 / 财后漂移）
- `announcement-impact.md` 公告影响与股东信解读
- `event-catalyst.md` 事件驱动短线催化

**交易与持仓**
- `trade-plan.md` 交易计划与买卖点
- `position-sizing.md` 仓位决策与加减仓
- `portfolio-checkup.md` 持仓体检与风控
- `stop-discipline.md` 止损纪律
- `monitor-alert.md` 监控告警与停复牌

**板块主线题材**
- `sector-comparison.md` 板块比较与轮动
- `market-mainline.md` 市场主线与情绪
- `market-state.md` 市场状态与广度
- `theme-lifecycle.md` 题材周期与龙头
- `leader-game.md` 涨停龙头博弈与龙虎榜

**资金与机构**
- `fund-flow.md` 资金流与北向
- `institutional-holding.md` 机构持仓与拥挤度

**宏观/政策/产业链**
- `macro-transmission.md` 宏观行业个股传导
- `policy-impact.md` 政策解读与受益映射
- `industry-chain.md` 产业链映射与卡点

**技术分析**
- `breakout-patterns.md` 波缩突破与 VCP
- `price-action-tools.md` 技术指标与形态识别（K 线 / 谐波 / 波浪 / 缠论 / 一目 / SMC）
- `abnormal-detection.md` 放量异动与跳空归因

**风险与量化**
- `risk-stress.md` 风险压力测试（VaR / CVaR / 蒙特卡洛）
- `quant-factor-research.md` 因子研究框架
- `systematic-strategies.md` 量化策略库（配对 / 事件驱动 / 季节性 / ML / 对冲 / 波动率）
- `portfolio-optimization.md` 资产配置与组合优化

**衍生品与跨资产**
- `options-strategies.md` 期权策略（多腿组合 + Greeks）
- `fixed-income.md` 固定收益与可转债
- `forex-commodity.md` 外汇与大宗商品
- `crypto-derivatives.md` 加密衍生品（仅在用户明确要求时使用）

**主题**
- `dividend-buyback.md` 分红回购与股东回报
- `going-global.md` 出海链投资
- `crisis-event.md` 危机 / 反转 / 周期拐点

**投行建模**
- `ib-models.md` 投行估值建模（DCF / LBO / comps / 三表 / M&A / Unit Economics）
- `ib-deal-prep.md` 投行交易准备（尽调 / 投委会 / IM / pitch / NDA）

**日常 routine**
- `daily-briefing.md` 每日投研简报（盘前 / 收盘 / 晨会）

**输出规范**
- `html-report-style.md` HTML 研报输出（JS 自检 / ECharts 骨架 / 图表分工与质量细则）——产出 HTML 前先读
