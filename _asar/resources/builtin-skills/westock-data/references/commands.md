# WeStock Data - 详细命令用法

> 本文档包含所有命令的完整语法、参数说明、使用示例。
> 按功能分组组织，便于快速查找。

> ⚙️ **示例约定**：下文示例统一写作 `westock-data <命令>`（逻辑命令名）。实际执行时按本 skill runtime 提供的入口调用，**不要硬编码绝对路径**。

> 📌 **配套文档**：
> - 路由规则、高频意图对照、能力差异速查 → [routing-guide.md](./routing-guide.md)
> - 完整分析场景模板 → [scenarios-guide.md](./scenarios-guide.md)
> - 返回字段说明 → [ai_usage_guide.md](./ai_usage_guide.md)
>
---

## 一、行情

> 价格序列、技术指标、筹码成本。含单标的时序数据（`quote`/`kline`/`minute`/`technical`/`chip`）。

### 实时行情与 K 线

```bash
westock-data search 腾讯控股                    # 默认仅搜股票（A股/港股/美股，排除 ETF/可转债/板块/指数等）
westock-data search 沪深300 --type etf          # 搜索 ETF
westock-data search 银行 --type sector          # 搜索板块
westock-data search 黄金 --type futures         # 搜索期货
westock-data search 离岸 --type forex           # 搜索外汇
westock-data search 三星电子 --market kr        # 日韩股专用入口（独立于 --type）
westock-data quote sh600000                    # 实时行情（个股/指数/板块/ETF）
westock-data quote sh600000 --date 2026-03-20  # 指定历史日期截面
westock-data quote ks005930,t7203              # 日韩股票实时行情（韩股 ks/kq、日股 t，支持批量）
westock-data kline sh600000 --period day --limit 20    # K线（day/week/month/season/year）
westock-data kline sz000001 --period day --limit 60 --fq qfq    # 复权（qfq/hfq/bfq，最大2000条）
westock-data kline sh600000 --start 2025-01-01 --end 2025-12-31    # 按日期范围查K（优先级高于 --limit）
westock-data kline sh600000 --start 2025-06-01                     # 仅指定起始日（end=今天）
westock-data minute sh600000 --days 5          # 分时（1~5日）
```

> 实时行情按市场差异化：A股含涨跌停价/每手/股息TTM；港股含每手/ADR；美股含盘前盘后/EPS TTM。`search`/`minute` 不支持批量。
> **K线日期范围**：`kline` 支持 `--start` / `--end`（YYYY-MM-DD），优先级高于 `--limit`；范围模式下 `--limit` 仅作为返回条数上限保护，默认放宽到 2000。仅指定 `--start` 时 `end` 默认今天；仅指定 `--end` 时自动按周期回溯一段窗口。**期货/外汇 K 线暂不支持日期范围**，传入会自动降级到 `--limit` 模式并提示。
> **统一 `search`**：**默认仅搜股票**（A股/港股/美股个股）；用 `--type etf|bond|sector|index|futures|forex` 切换到其它类型（**不会跨类型 fan-out**）；日韩股用独立 `--market jp|kr` 入口。按板块清单收口（`--scope industry_list_sw1` 等）仍需用 `sector search`。
> **日韩股票**：`quote` 支持韩股 `ks*`/`kq*`（如 `ks005930` 三星电子）、日股 `t*`（如 `t7203` 丰田），可批量；仅支持搜索与实时行情，**不支持** K线/分时/技术指标/筹码等；行情源不直接返回涨跌额/涨跌幅（由最新价与昨收自算），货币为韩元/日元，展示时禁用人民币符号；代码请先用 `search --market jp|kr` 获取（日韩股使用独立 `--market` 入口，不归在 `--type` 下）。

### 技术指标与筹码

```bash
westock-data technical sh600000 --group macd,rsi   # 技术指标（ma/macd/kdj/rsi/boll/bias/wr/dmi/all）
westock-data technical sh600000 --group macd --start 2026-02-01 --end 2026-03-01    # 历史区间
westock-data chip sh600519                         # 筹码成本（仅沪深京A股）
```

> 技术指标输出截面或历史区间数据；筹码成本仅支持沪深京A股，用于分析获利盘/套牢盘比例。

---

## 二、市场

> 全市场截面/总览/指数/互联互通。含龙虎榜、指数成份股、市场总览（A 股大盘画像）、涨跌分布、沪深港通成份股。

### 龙虎榜（仅A股）

```bash
westock-data lhb --type institution,hotmoney    # 龙虎榜（机构榜/游资榜/活跃席位/高胜率买入/高胜率席位）
westock-data lhb --type activeseat --date 2026-03-20
```

> 龙虎榜仅支持A股。

### 指数数据

```bash
westock-data index constituent sh000300        # A股指数成份股
westock-data index constituent hkHSI           # 港股指数成份股（恒生指数）
westock-data index constituent hkHSCEI,hkHSTECH # 多个港股指数
westock-data index list                         # 指数清单（支持 --limit/--offset 分页）
westock-data search 沪深300 --type index        # 搜索指数（统一 search 入口）
```

**常用指数**：`sh000001`(上证)、`sz399001`(深证成指)、`sz399006`(创业板)、`hkHSI`(恒生)、`us.IXIC`(纳斯达克)、`us.INX`(标普500)

### 市场总览（A 股大盘画像）

> `market-overview` 是 A 股大盘的"宏观体检"：8个维度（画像总评/收盘/区间/技术/涨跌分布/两融/估值/风格）共用同一组 `market_statis_*` 后端清单。
> 不带 type 时默认输出 **summary 画像总评**（14 维度得分 + 状态文案，含估值/情绪/技术/趋势/风格轮动等），
> 是给 LLM 做"市场点评"最直接的入口。

```bash
westock-data market-overview                                          # 默认 = summary（市场画像总评）
westock-data market-overview --type trade                             # 三大指数收盘统计 + 两市成交额多周期均值
westock-data market-overview --type interval                          # 三大指数 5/10/20/60/120/250D 涨跌 + 52W 高低
westock-data market-overview --type technical                         # 大盘 MACD/KDJ/RSI/BOLL/MA + 神奇九转
westock-data market-overview --type updown                            # A 股涨跌停/红绿盘/多周期新高新低数
westock-data market-overview --type margin                            # 两融余额多周期变动
westock-data market-overview --type valuation                         # 中证全指 PE/PB/PS + 历史百分位（数据通常滞后 1~4 个交易日）
westock-data market-overview --type rotation                          # 沪深300/中证1000/成长/价值 风格轮动
westock-data market-overview --type technical,updown                  # 多类一次拉
westock-data market-overview --type all --date 2026-05-18             # 全部 8 类
westock-data market-overview list                                     # 列出全部 type
```

### 沪深港通成份股（互联互通）

```bash
westock-data connect --exchange sh                              # 沪股通成份股（北向 / 陆股通标的池）
westock-data connect --exchange sz --limit 50 --offset 50       # 深股通成份股（统一用 --limit/--offset 分页）
```

> ⚠️ **职责边界**：`connect` = 沪深港通**标的池**（标的列表）；`fund flow sh600000` = 北向资金流量（金额数据）；二者不要混用。

### 新股日历

```bash
westock-data ipo --market hs                    # 新股日历（--market hs/hk/us）
```

> 新股日历查询新股申购与上市信息，支持沪深/港股/美股三个市场。

### 市场涨跌分布

```bash
westock-data changedist                         # 沪深A股涨跌分布（涨跌/涨跌停/停牌家数 + 上涨占比情绪 + 涨跌幅区间分布 + 两市成交额）
westock-data changedist --raw                   # 输出 JSON
```

> 涨跌分布为沪深A股全市场截面（实时）：概览含上涨/下跌/平盘、涨停/跌停、停牌家数与上涨占比情绪文案；明细为 11 个涨跌幅区间（涨停→>7%→…→平→…→跌停）的家数分布，并附两市成交额及其较上日变动。

---

## 三、板块

> 板块/概念股查询（搜索/成份股/行情榜）。

### 板块成份股（含概念股查询）

> ⚠️ **概念股查询**："华为概念股"、"AI 概念股"等问法 → 用 `search <关键词> --type sector` → `sector constituent <代码>` 两步查询。

```bash
westock-data sector list industry_list_sw1        # 申万一级行业清单
westock-data search 华为 --type sector            # 搜索板块代码（华为/AI/新能源等概念）
westock-data sector search 银行 --scope industry_list_sw1   # 按指定清单收口（--scope 是 sector search 独有，统一 search 不支持）
westock-data sector constituent pt01801080        # 板块成份股
```

> **板块代码**：使用 `search --type sector` / `sector list` 返回的"代码"列裸码（如 `pt01801080`、`pt02GN2328`）。

> **`sector constituent <代码>` vs `sector info <代码>`**：
> - `sector constituent <代码>`：返回板块**全部成份股**（含 SectorCode 字段，可逐只展开分析）
> - `sector info <代码>`：返回板块**基础信息 + 区间交易数据**（名称、板块类型、成份股数量、区间涨跌幅、区间成交额等）。**不含成份股**，适合用户问"XX板块怎么样"等总览类问题。

### 板块行情榜（涨幅 / 资金流入）

```bash
westock-data sector ranking                     # 板块行情榜（行业涨幅 Top10 + 概念涨幅 Top10 + 行业资金流入 Top5 + 北向热门板块）
```

> **`sector ranking` vs `sector constituent/info` vs `hot board` 区分**：
> - `sector ranking`：**全市场板块行情榜**（行业涨幅 + 概念涨幅 + 资金流入 + 北向热门），用于"今天哪些板块在涨/资金在流入"类问题
> - `sector constituent/info`：**按代码精查**（成份股 / 画像 / 区间交易），用于"消费板块成份股有哪些 / 半导体板块怎么样"类问题
> - `hot board`（hot 子命令）：板块**热度**排名（搜索/讨论度），用于"哪些板块最火"类问题
> - 决策入口：泛问"市场上哪些板块涨得多/资金流向" → `sector ranking`；指定"XX 板块的成份股/画像" → `sector constituent/info`；问"哪些板块最热" → `hot board`

---

## 四、研究

> 评分/评级/一致预期/研报/脱水研报。覆盖个股的多维度评估视角。

### 评估与研究

```bash
westock-data score sh600519                        # 个股评分（综合/资金/基本面/风险/技术 + 周/月/季变动）
                                                   # ↑ 单股查询；评分排行选股请用 westock-tool ranking CompScore
westock-data rating hk00700                       # 机构评级（港股/美股，3段：目标价&评级 / 评级月度趋势 / 价格 vs 目标价）
westock-data consensus sh600519                    # 一致预期（A股、港股，自动分发）
westock-data report sh600000 --limit 20            # 研报列表（--type：0全部/1研报/2业绩会）
westock-data report detail <研报ID>                # 研报详情（ID 从研报列表获取）
westock-data dehydrated                         # 脱水研报列表
westock-data dehydrated detail 1056             # 脱水研报详情
```

> **`report` 命令使用流程**：
> 1. 先通过 `westock-data report sh600000` 获取研报列表
> 2. 从列表中复制研报 ID（如 `res832471322631`）
> 3. 使用 `westock-data report detail res832471322631` 查看完整研报内容

---

## 五、事件

> 事件标签/风险事件/投资日历/停复牌。覆盖个股的事件监控、风险明细与交易状态。

### 事件总览（42 类标签）

> **`risk` vs `events` 决策入口**：
> - 用户**泛问**"XX 公司有什么风险/事件" → **优先 `events tags`**（看全貌，标签化输出，覆盖中性+利好+风险 42 类）
> - 用户**指定**风险细节（如"质押率"、"诉讼明细"、"解禁规模"） → 用 `risk --types <类型>`（含明细字段，仅 8 类）
> - 二者关系：`events` 是入口与速览，`risk` 是钻取与细查；先 events 后 risk 是常规链路

```bash
westock-data events tags sh600519                  # 单股事件标签
westock-data events tags sh600519,sz000001         # 批量
westock-data events tags sh600519 --types 23,24    # 仅看指定事件 ID（23=董监高变动、24=董监高增减持）
westock-data events list                           # 列出全部 42 类事件 ID 及中文说明
```

**事件大类**（共 9 组 42 类）：交易异动（大宗/龙虎榜）、股本变动（回购/定增/分红）、业绩披露（快报/预告/财报）、指数变动（纳入/剔除）、董监高（变动/增减持）、股权事件（股东大会/重组/更名/要约）、限售解禁、法律处罚、停复牌。完整 ID→中文映射通过 `events list` 查看。

### 投资日历

查询个股事件日历，按事件类型分组输出。宏观经济日历请使用 `macro indicator calendar_future|calendar_hist`。

```bash
westock-data calendar                                          # 今天所有类型事件
westock-data calendar --date 2026-06-04                      # 指定日期
westock-data calendar --event dividend                          # 只看分红派息
westock-data calendar --event financial_report --market hs     # 财报发布（沪深）
westock-data calendar --event ipo --market hk                # 新股发行（港股）
westock-data calendar --event trading_halt,meeting,lockup_release  # 多类型（逗号分隔）
westock-data calendar --event all --market us --limit 30     # 美股所有事件，限制30条
```

**参数说明**：

| 参数 | 说明 | 默认值 |
| --- | --- | --- |
| `--date` | 查询日期 YYYY-MM-DD | 今天 |
| `--event` | 事件类型过滤，可选值见下表 | `all` |
| `--market` | 市场：`hs`（沪深）/ `hk`（港股）/ `us`（美股） | `hs` |
| `--limit` | 返回条数 | 10 |

**`--event` 可选值**：

| 英文术语 | 中文标签 | API 短码 |
| --- | --- | --- |
| `financial_report` | 财报发布 | cbfb |
| `dividend` | 分红派息 | fh |
| `ipo` | 新股发行 | xg |
| `trading_halt` | 停复牌 | tfp |
| `meeting` | 会议 | hy |
| `lockup_release` | 限售解禁 | jj |
| `rights_issue` | 增发 | zf |
| `all` | 全部（不筛选） | all |

> 输出按中文标签分组（财报发布/分红派息/新股发行/停复牌/会议/限售解禁/增发）。

### 风险事件（仅A股，8 种类型）

```bash
westock-data risk sh600000                            # 全部风险事件
westock-data risk sz000001 --types pledge,unlock      # 仅指定类型
westock-data risk sh600000,sz000001 --types pledge    # 批量
```

**8 种类型**：`specialtrade`(ST)、`pledge`(质押)、`unlock`(解禁)、`lawsuit`(诉讼)、`seasonedissue`(增发)、`leaderchange`(高管变动)、`executivetransfer`(高管增减持)、`bondrating`(评级)。

**别名**：`st`/`special`→specialtrade、`addition`→seasonedissue、`leader`→leaderchange、`executive`→executivetransfer、`rating`→bondrating。

### 停复牌信息

```bash
westock-data suspension --market hs             # 停复牌信息（--market hs/hk/us）
```

---

## 六、资讯

> 新闻、公告、原文。含个股新闻/公告和市场资讯。

### 新闻与公告

```bash
westock-data news article sh600000 --limit 20     # 新闻列表
westock-data news detail nesSN20260320...           # 新闻详情（id 来自 news 返回）
westock-data notice list sh600000 --type 1              # 公告列表（--type：0全部/1财务/2配股/3增发/4股权变动/5重大/6风险/7其他）
westock-data notice detail nos1224809143                # 公告全文（nos沪深→纯文本；nok港股/nou美股→PDF URL）
```

> `news article` 除个股外，还支持指数（`sh000001`）、ETF（`sh510300`）、板块（`pt01801081`）、可转债（`sh113052`）、期货（`fuCL`）、外汇（`fxUSDCNH`）等代码；接口不分页，用 `--limit` 控制返回条数。

> 整体市场资讯（非个股）请用「发现」章节的 `news market`。

---

## 七、资金

> 二级市场资金流向。含个股资金、卖空数据、融资融券、大宗交易。

### 资金流向（个股/板块）

```bash
# A股：主力资金（单日 / --start..--end 区间）
westock-data fund flow sh600000
westock-data fund flow sh600000,sz000001 --start 2026-05-01 --end 2026-05-20

# A股板块：资金流向（支持 pt 开头板块代码）
westock-data fund flow pt01801081

# 港股：资金流向
westock-data fund flow hk00700

# 港股：卖空数据（单日 / --start..--end 区间）
westock-data fund short hk00700
westock-data fund short hk00700 --start 2026-05-01 --end 2026-05-20

# 美股：卖空数据（单日 / --start..--end 区间）
westock-data fund short usAAPL
westock-data fund short usAAPL --start 2026-05-01 --end 2026-05-20

# 大宗交易（仅沪深）
westock-data fund block sh600519

# 融资融券（仅沪深）
westock-data fund margin sh600519
```

> ⚠️ **美股限制**：美股不支持 `fund flow`（资金流向），只支持 `fund short`（卖空数据）

> ⚠️ **命令区分**：`flow` = 资金流向（主力/散户/南北向）；`short` = 卖空数据（卖空股数/金额/比率）；`block` = 大宗交易；`margin` = 融资融券

> ⚠️ **市场限制**：`block`/`margin` 仅支持沪深（sh/sz）；`short` 支持港股和美股；`main` 支持三市场

> 沪深港通成份股（北向 / 陆股通标的池）属于"市场"分组，见第二章；不在资金流量数据范围内。

---

## 八、简况

> 公司基本信息/股东/分红/回购。

### 公司基本信息

```bash
westock-data profile sh600000                  # 公司简况
westock-data shareholder sh600519              # 股东结构（A股：十大股东/十大流通/股东户数；港股：持股股东+机构持仓）
westock-data disclosure sh600519               # 财报披露日历（财报发布前的预约披露日）
```

### 分红数据

```bash
westock-data dividend list sh600519 --years 5                           # 分红派息（A股/港股/美股）
westock-data dividend list sh600519 --all                               # 含未实施的分红方案
```

> ⚠️ **货币单位**：港股返回港元/美元，美股返回美元，展示时必须标注正确货币单位

### 公司回购

```bash
westock-data buyback sh600519                 # 公司回购（A股/港股）
westock-data buyback hk01810 --start 2026-03-01 --end 2026-04-14
```

---

## 九、财务

> 三大报表/财报披露日历。

### 财务数据

```bash
# A股：lrb(利润表) / zcfz(资产负债表) / xjll(现金流量表)
westock-data finance sh600000                  # 完整财报，最新1期
westock-data finance sh600000 --num 4          # 最近4期
westock-data finance sh600000 --type lrb --num 8

# 港股：zhsy(综合损益表) / zcfz / xjll（⚠️ 港股利润表用 zhsy，不是 lrb）
westock-data finance hk00700 --type zhsy --num 4

# 美股：income / balance / cashflow
westock-data finance usBABA --type income --num 4
```

### 财报披露日历

```bash
westock-data disclosure sh600519               # 财报披露日历（A股/港股/美股；又称业绩预约披露日）
```

---

## 十、ETF

> ETF 全维度。含详情/持仓/净值/公司/持有人/财务指标。
>
> ⚠️ **路由强信号**：用户问 ETF 的「**基本信息 / 管理人 / 托管人 / 跟踪指数 / 费率 / 收益率（YTD/近1月/3月/6月/1年/3年）/ 4 级分类（资产类别/投资风格/细分领域/具体方向）/ 基金经理历史 / Top20 重仓**」时——一律用 `etf detail`，**不要**用 `quote`/`kline`/`etf nav` 拼凑。`quote` 只有行情字段（价格/涨跌幅/规模），缺管理人/费率/分类/收益率维度。

```bash
westock-data etf detail sh510300                                       # ETF 详情（含 4 级分类、基金经理历史、Top20 持仓）
westock-data etf holdings sh510300                                     # ETF 持仓明细
westock-data etf nav sh510300 --start 2026-01-01 --end 2026-03-31      # 净值历史
westock-data etf company sh510300                                      # 基金公司信息
westock-data etf holders sh510300                                      # 持有人结构
westock-data etf financial sh510300                                    # 财务指标
```

> `etf detail` 输出 5 段表格：主体行情/规模/费率 → **详细分类**（资产类别/投资风格/细分领域/具体方向/跟踪标的）→ 基金经理 → **基金经理历史**（当前在任/首任/任职最长/全部历任）→ 持仓 Top20。

> 详细字段说明见 [references/ai_usage_guide.md](./ai_usage_guide.md)

---

## 十一、发现

> 搜索/热搜/股单。这一组命令是**全市场维度**工具（非按代码查个股，也非筛选选股），用于市场资讯浏览、热度发现、榜单查询。

### 市场资讯与热搜

```bash
westock-data news market --market hs              # 市场资讯（--market hs/hk/us 整体市场，非个股）
westock-data hot stock                   # 热搜（子命令：stock/wechat/news/board/etf）
```

> 板块行情榜请用 `sector ranking`，按代码精查请用本章节的其它 `sector` 子命令。
> **日韩股票搜索**：`search 关键词 --market jp|kr` 按市场搜日股/韩股，返回统一前缀代码（韩股 `ks*`/`kq*`，日股 `t*`，如 `ks005930`/`t7203`）；`--market` 是 `search` 唯一的可选参数，也支持按数字代码搜（如 `search 005930 --market kr`）。

### 热门股单

```bash
westock-data stocklist                              # 默认 = rank 榜单
westock-data stocklist rank --sort updateTime --limit 10   # 股单排行（--sort 排序，--limit/--offset 分页）
westock-data stocklist detail gd000767              # 查指定股单详情（ID 来自 rank 榜单）
```

> `stocklist` 是公开股单榜单：`rank` 查榜单列表，`detail <股单ID>` 查单个股单的成份与简介。

---

## 十二、宏观

> 宏观经济指标。含 GDP/CPI/PMI/财政/就业/预测/溢价率等。

```bash
# 列出所有宏观指标
westock-data macro list                                              # 列出所有宏观指标（共 27 个）

# 按年份查询（大部分指标）
westock-data macro indicator gdp --year 2025                         # 单指标
westock-data macro indicator cpi_ppi,pmi --year 2025                 # 多指标
westock-data macro indicator pmi --start 2024 --end 2025             # 区间趋势

# 按日期查询（以下指标支持具体日期）
westock-data macro indicator core_indicators_cur --date 2026-06-08   # 最新核心宏观指标（同时返回 p1 和 p2）
westock-data macro indicator premium_curve --date 2026-06-08          # 溢价率曲线
westock-data macro indicator premium_value --date 2026-06-08          # 溢价率水平
westock-data macro indicator term_spread --date 2026-06-08            # 期限利差与曲线形态
westock-data macro indicator calendar_future --date 2026-06-08       # 宏观日历未来

# 按年份查询（GDP/货币/财政等）
westock-data macro indicator forecast --year 2025                      # 宏观预测（按年份）
westock-data macro indicator calendar_hist --year 2025                 # 宏观日历历史（按年份）

# 按年份查询（新增指标，年份型）
westock-data macro indicator prosperity --year 2025                   # 企业景气指数
westock-data macro indicator fiscal --year 2025                       # 财政指标
westock-data macro indicator power_consumption --year 2025            # 用电量
westock-data macro indicator disposable_income --year 2025            # 可支配收入
westock-data macro indicator capacity_utilization --year 2025         # 产能利用率
westock-data macro indicator product_output --year 2025              # 宏观产量
westock-data macro indicator export_value --year 2025                # 出口交货值
```

**指标分组**：

| 分组 | 指标 | 查询方式 |
|------|------|----------|
| GDP | gdp / cpi_ppi / pmi / profit / valueadded / consumption / investment / export / prosperity / fiscal / power_consumption / disposable_income / capacity_utilization / product_output / export_value | `--year`（后端按 YYYY-01-01） |
| 货币 | financing / fundquantity / fundcost / yield_curve / mlf / employment | `--year` |
| 估值 | **premium_curve** / **premium_value** / **term_spread** | `--date` |
| 综合 | **core_indicators_cur** / forecast / calendar_hist / calendar_future | forecast/calendar_hist 按 `--year`；core_indicators_cur/calendar_future 按 `--date` |

> **两种查询方式**：
> 1. **按年份**（`--year` 或 `--start --end`）：GDP/CPI/PMI/货币/财政等绝大多数指标，后端按 `YYYY-01-01` 查询
> 2. **按日期**（`--date`）：`core_indicators_cur`（最新核心宏观指标）/ `premium_curve` / `premium_value` / `term_spread` / `calendar_future` —— 按实际日期查询最新值
>
> **注意**：查询 `core_indicators_cur` 时会同时返回 `macro_core_indicators_cur_p1` 和 `macro_core_indicators_cur_p2` 两个数据集。
>
> **日期型 vs 年份型**：日期型指标使用 `--date` 参数；年份型指标使用 `--year` 参数（或 `--start --end` 区间）。

### 专业研究场景速查（指标组合）

> 按机构投研常用研究框架组织。每行对应 `scenarios-guide.md` 中的一个专业场景。

```bash
# 通胀全景（场景 59）：CPI/PPI 剪刀差、核心 CPI、上下游传导
westock-data macro indicator cpi_ppi --start 2024 --end 2025

# 国债收益率曲线（场景 60）：期限结构 + 牛陡/熊平判断
westock-data macro indicator yield_curve --year 2025
westock-data macro indicator term_spread --date 2026-06-08

# 股债性价比 / 风险溢价（场景 61）：大类资产配置核心指标（含 10 年分位）
westock-data macro indicator premium_value --date 2026-06-08
westock-data macro indicator premium_curve --date 2026-06-08

# 流动性投放与货币市场（场景 62）：MLF 操作 + SHIBOR/回购利率
westock-data macro indicator mlf --year 2025
westock-data macro indicator fundcost --year 2025

# 工业景气全景（场景 63）：5 维交叉验证（量/效/能/景气/产量）
westock-data macro indicator profit,valueadded,prosperity,capacity_utilization,power_consumption --year 2025
westock-data macro indicator product_output --year 2025

# 财政发力强度（场景 64）：收支结构 + 专项债进度
westock-data macro indicator fiscal --year 2025

# 进出口深度解读（场景 65）：贸易差额 + 行业出口结构
westock-data macro indicator export --year 2025
westock-data macro indicator export_value --year 2025

# 居民收入与消费（场景 66）：收入结构 + 消费分项
westock-data macro indicator disposable_income --year 2025
westock-data macro indicator consumption --year 2025

# 就业市场（场景 67）：失业率分组 + 百度搜索指数高频信号
westock-data macro indicator employment --year 2025

# 宏观日历事件预案（场景 68）：未来事件 + 历史回放 + 机构预测
westock-data macro indicator calendar_future --date 2026-06-08
westock-data macro indicator calendar_hist --year 2025
westock-data macro indicator forecast --year 2025
```


---

## 十三、期货

> 外盘商品/金融期货（CME/COMEX/CBOT/NYMEX/LME 等）+ 港股股指期货。
> 标准代码前缀：`fu*`（外盘长版行情）、`hf_*`（LME 金属）、`r_hd*`（港股股指期货）。

### 合约搜索与资料

```bash
westock-data search 黄金 --type futures            # 关键词→合约代码（支持 名称/品类/交易所/代码）
westock-data search 贵金属 --type futures           # 按品类搜（贵金属/基本金属/能源化工/农产品/外汇/利率/股指/港股股指）
westock-data search 恒指 --type futures             # 港股股指期货
westock-data futures detail fuGC                   # 合约资料（交易所/规模/币种/最小变动/交易时间等）
```

### 期货行情（复用 quote）

```bash
westock-data quote fuGC                            # 黄金（COMEX，延时行情）
westock-data quote hf_CAD                           # 伦铜（LME）
westock-data quote r_hdHSImain                      # 恒生指数期货
westock-data quote fuGC,fuCL,fu6E                   # 批量（黄金/原油/欧元）
```

### 期货分时与 K 线（复用 minute / kline）

```bash
westock-data minute fuCN                            # 富时A50指数期货分时（当日）
westock-data minute fuCN --days 5                   # 五日分时
westock-data minute r_hdHSImain                     # 恒指期货分时
westock-data kline fuGC --period day --limit 30     # 黄金日K（含 OHLC/成交量/持仓量）
westock-data kline fuCN --period week --limit 20    # 周K（day/week/month/season/year）
westock-data kline r_hdHSImain --period day         # 恒指期货K线
```

> ⚠️ **期货限制**：外盘期货多为**延时行情**（输出 `isDelayed`）。`minute`/`kline` 仅支持带 `stockType` 的合约（`fu*` 外盘、`r_hd*` 港股股指）；`hf_*`（LME 金属/伦敦金银现货）**仅支持 `quote`**，不支持分时/K线。期货**不支持复权**（`--fq` 对期货无效）与 `news`。合约代码请先用 `search --type futures` 获取，避免猜测。

---

## 十四、外汇

> 离岸人民币、主要货币对、美元指数等即期现货汇率。
> 标准代码前缀：`fx*`（如 `fxCNH` 离岸人民币、`fxUSDJPY` 美元日元、`fxDINIW` 美元指数）。

### 品种搜索与列表

```bash
westock-data forex list                            # 列出全部外汇品种（代码/名称）
westock-data search 美元 --type forex              # 关键词→品种代码（匹配 名称/代码/裸代码）
westock-data search 离岸 --type forex              # 离岸人民币 → fxCNH
westock-data search 日元 --type forex              # 含日元的货币对（fxUSDJPY/fxEURJPY 等）
```

### 外汇行情/K线/分时（复用 quote / kline / minute）

```bash
westock-data quote fxUSDJPY                         # 美元日元即期汇率
westock-data quote fxCNH,fxEURUSD,fxDINIW           # 批量（离岸人民币/欧元美元/美元指数）
westock-data kline fxCNH --period day --limit 30    # 离岸人民币日K（day/week/month/season/year）
westock-data minute fxCNH                           # 离岸人民币当日分时
```

> ⚠️ **外汇限制**：外汇**仅提供当日分时**，`minute` 的 `--days 5` 对外汇无效（数据源不支持五日分时，参数会被忽略并返回当日数据）。外汇**不支持复权**（`--fq` 对外汇无效）与 `news`。品种代码请先用 `search --type forex` 或 `forex list` 获取，避免猜测。

## 十五、债券（可转债 / 可交换债）

> 沪深可转债/可交换债。标准代码：沪市 `sh11xxxx`（110/111/113 可转债、118 科创板可转债）、`sh13xxxx`（132 可交换债）；深市 `sz12xxxx`（123/127/128 可转债、120 可交换债）。
> 行情/分时/K线沿用 sh/sz 前缀，直接复用个股通道，无需特殊命令。

### 可转债行情/分时/K线（复用 quote / minute / kline）

```bash
westock-data quote sh113052                         # 可转债行情（价格/涨跌/涨跌停价 + 转债维度，竖排展示）
westock-data quote sh113052,sh113044                # 批量
westock-data minute sh113052                        # 当日分时
westock-data kline sh113052 --period day --limit 30 # 日K（day/week/month/season/year）
```

> 可转债行情在通用价格/成交字段之外，额外返回**转债维度**：转股价值、纯债价值、转股/纯债溢价率、双低、总规模/剩余规模、评级、期限/剩余期限/到期日、到期收益率、是否转股、转股价/转股起始日、到期赎回价/强赎价/强赎触发价、回售触发价/回售起始日、正股 PB/正股代码。单只查询时以竖排「项目/内容」表展示，规模换算为亿元、日期规整为 `YYYY-MM-DD`。

### 可转债详情（bond detail）

```bash
westock-data bond detail sh113052                   # 核心要素：发行/规模/评级/期限利率/转股/赎回回售/关键日期
westock-data bond detail sh113052 --terms           # 追加条款全文（利率付息/转股价修正/赎回/回售/强赎等）
westock-data bond detail sh113052 --schedule        # 追加明细表（利率变动/现金流/赎回/回售/修正详情）
westock-data bond detail sh113052,sz123245          # 批量查询
```

> ⚠️ **可转债说明**：行情接口**不返回债券简称**（`quote` 的 `name` 为空），可借 `bond detail` 的发行人/正股代码识别标的。`bond detail` 复用 `stock_quote_snapshot` 的 `Bond*`/`Kzz_*` 字段；可交换债及临近到期的老券可能缺失部分转股相关（`Kzz_*`）字段。规模金额已统一换算为「亿元」，日期已规整为 `YYYY-MM-DD`。
