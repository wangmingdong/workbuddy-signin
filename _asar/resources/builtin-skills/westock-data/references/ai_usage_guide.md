# WeStock Data - AI 深度参考指南

> **定位**：本文档提供详细的数据格式参考、分析模板。命令列表和基本用法请参见 [SKILL.md](../SKILL.md)。
> 完整分析场景示例请参见 [scenarios-guide.md](./scenarios-guide.md)。

---

## 一、输出格式

命令执行后输出 **Markdown 表格**，AI 直接从表格中读取数据进行分析。

**单股查询**：输出一个 Markdown 表格，每列对应一个数据字段。

**批量查询**：输出批量摘要行 + 每个 symbol 的独立表格。

**查询失败**：输出 JSON 格式的错误信息（含 `success: false` 和 `error` 对象）。

---

## 二、各命令数据格式

### 实时行情（`quote`）

输出表格列（共通字段，三市场均返回）：
`code | name | price | prevClose | open | high | low | volume | amount | change | changePercent | turnoverRate | volumeRatio | rangePct | avgPrice | peRatio | peFwd | peLyr | pbRatio | dividendRatioTtm | totalMarketCap | circulatingMarketCap | totalShares | floatShares | high52week | low52week | chg5d | chg10d | chg20d | chg60d | chgYtd`

#### 市场差异化字段（按 `market_type` 区分）

| 字段 | 说明 | A股 | 港股 | 美股 |
|------|------|:---:|:---:|:---:|
| `price_ceiling` | 涨停价（元） | ✅ | — | — |
| `price_floor` | 跌停价（元） | ✅ | — | — |
| `inner_volume` | 内盘（主动卖出量） | ✅ | — | — |
| `outer_volume` | 外盘（主动买入量） | ✅ | — | — |
| `wb_ratio` | 委比（%） | ✅ | ✅ | — |
| `lot` | 每手股数 | — | ✅ | — |
| `adr_conversion_price` | ADR 换算价（港元） | — | ✅ | — |
| `relative_hk_stock_price` | 相对港股价格 | — | ✅ | — |
| `relative_hk_stock_chg_pct` | 相对港股涨跌幅（%） | — | ✅ | — |
| `dividend_ttm` | 股息 TTM（元） | — | ✅ | ✅ |
| `eps_ttm` | 每股收益 TTM（元） | — | — | ✅ |
| `pre_market_price` | 盘前价（美元） | — | — | ✅ |
| `pre_market_price_chg` | 盘前涨跌额 | — | — | ✅ |
| `pre_market_price_chg_pct` | 盘前涨跌幅（%） | — | — | ✅ |
| `post_market_price` | 盘后价（美元） | — | — | ✅ |
| `post_market_price_chg` | 盘后涨跌额 | — | — | ✅ |
| `post_market_price_chg_pct` | 盘后涨跌幅（%） | — | — | ✅ |

> `market_type` 取值：`1`=沪A，`51`=深A，`62`=北交所，`100`=港股，`200`=美股。
> 差异字段仅在对应市场返回，其他市场该字段为 `undefined`，分析时需先判断。

#### 可转债维度字段（仅可转债代码返回，来源 `Kzz_*`）

可转债（沪 `sh11xxxx`/`sh13xxxx`、深 `sz12xxxx`）走 `quote` 时，在上述通用 + A股交易机制字段之外，额外返回以下转债维度字段；单只查询以竖排「项目/内容」表展示（规模换算为亿元、日期规整为 `YYYY-MM-DD`，缺失字段自动跳过），批量/`--raw` 则随结构化对象返回。

| 字段 | 说明 |
|------|------|
| `bond_equity_value` | 转股价值 |
| `bond_pure_value` | 纯债价值 |
| `bond_equity_premium` | 转股溢价率（%） |
| `bond_pure_premium` | 纯债溢价率（%） |
| `bond_double_low` | 双低 |
| `bond_rating` | 转债评级 |
| `bond_total_size` | 总规模（万元） |
| `bond_undue_size` | 剩余规模（万元） |
| `bond_term` | 期限（年） |
| `bond_undue_term` | 剩余期限（年） |
| `bond_due_date` | 到期日期 |
| `bond_ytm` | 到期收益率（%） |
| `bond_convertible` | 是否转股 |
| `bond_convert_price` | 转股价（元） |
| `bond_convert_start_date` | 转股起始日 |
| `bond_redeem_price_due` | 到期赎回价（元） |
| `bond_redeem_price_compulsory` | 强制赎回价（元） |
| `bond_redeem_price_trigger` | 强赎触发价（元） |
| `bond_buyback_price_trigger` | 回售触发价（元） |
| `bond_buyback_start_date` | 回售起始日 |
| `bond_stock_pb` | 正股 PB |
| `bond_stock_code` | 正股代码 |

> 行情接口**不返回债券简称**（`name` 为空）；可交换债及临近到期老券可能缺失部分 `Kzz_*` 字段，分析时需判空。完整发行要素/条款/现金流用 `bond detail`。

### K线（`kline`）

输出表格列：`date | open | last | high | low | volume | amount | exchange`

> K线数值为原始数值，AI 在分析时自行进行单位换算

### 资金数据

#### 港股资金流向（`fund flow hk<代码>`）

| 字段 | 单位 | 说明 |
|------|------|------|
| `TotalNetFlow` | 港元 | 总净流入 |
| `MainNetFlow` | 港元 | 主力净流入 |
| `RetailNetFlow` | 港元 | 散户净流入 |

#### 港股卖空数据（`fund short hk<代码>`）

| 字段 | 单位 | 说明 |
|------|------|------|
| `ShortShares` | 股 | 卖空股数 |
| `ShortAmount` | 港元 | 卖空金额 |
| `ShortRatio` | % | 卖空比率（卖空股数/成交量） |

#### A股资金流向（`fund flow sh/sz<代码>`）

| 字段 | 单位 | 说明 |
|------|------|------|
| `MainNetFlow` | 元 | 主力净流入（正=流入，负=流出）|
| `JumboNetFlow` | 元 | 超大单净流入 |
| `BlockNetFlow` | 元 | 大单净流入 |
| `MidNetFlow` | 元 | 中单净流入 |
| `SmallNetFlow` | 元 | 小单净流入 |
| `MainInFlow` | 元 | 主力流入 |
| `MainOutFlow` | 元 | 主力流出 |
| `RetailInFlow` | 元 | 散户流入 |
| `RetailOutFlow` | 元 | 散户流出 |

> 扩展字段（历史数据）：`MainNetFlow5D`/`MainNetFlow10D`/`MainNetFlow20D`（5/10/20日主力净流入）、`MainInflowRank`（流入排名）、`MainInflowCircRate`（占流通盘比例）、`MainInflowIndustryRank`（行业排名）

#### 美股卖空数据（`fund short us<代码>`）

> ⚠️ **美股限制**：美股不支持 `fund flow`（资金流向），只支持 `fund short`（卖空数据）

| 字段 | 单位 | 说明 |
|------|------|------|
| `ShortRatio` | % | 卖空比率（卖空股数/流通股数） |
| `ShortShares` | 股 | 卖空股数 |
| `ShortRecoverDays` | 天 | 回补天数（卖空股数/日均成交量） |

### 机构评级（`rating`）

> 自 [Unreleased] 起重构为 **3 段精简结构**，A 股/港股/美股按市场自动分发，输出一致。

#### 段 1：目标价 & 当前评级摘要

输出表格列：`code | name | targetPriceAvg | targetPriceMax | targetPriceMin | upsideAvg | upsideMax | currentBuyCnt | currentIncCnt | currentHoldCnt | currentDecCnt | currentSellCnt | totalRatingCnt | forecastInstitutions`

- `targetPriceAvg/Max/Min`：目标价的平均/最高/最低值
- `upsideAvg/Max`：上涨空间百分比（基于当前价）
- `currentBuyCnt/IncCnt/...`：当前评级分布

#### 段 2：评级月度趋势统计（近 7 个月）

输出表格按月分布：`month | buyCnt | incCnt | holdCnt | decCnt | sellCnt`，反映买入/增持/中性/减持/卖出 5 档评级在最近 7 个月的变化趋势。

#### 段 3：价格 vs 目标价历史走势对比

输出表格列：`date | closePrice | targetPriceAvg`，逐日对比股价与机构目标价均值。

> **分析要点**：
> - 段 1 看共识强度（买入家数 vs 卖出家数）和上涨空间（upside）
> - 段 2 看评级动量（最近 1-2 个月评级是否上调/下调）
> - 段 3 看股价是否已 price-in 机构预期，或仍有低估空间

### 一致预期（`consensus`）

按代码前缀自动分发：A 股走 `queryCNConsensusForecast`，港股走 `queryHKConsensusForecast`，美股暂不支持。

#### A 股

输出表格，列含 `code | name | targetPrice`，以及 `forecasts` 数组中的 `year | revenue | netProfit | eps | pe | pb | ps | revenueYoy | netProfitYoy | institutionCnt`

#### 港股

按"时间维度"展示（行=季度，列=各指标）。顶层字段：`code | name | quarters`。

##### `quarters` 主表（按 `period` 升序）

| 字段 | 下游字段 | 说明 |
|------|---------|------|
| `period` | `ForecastPeriod` | 预测报告期（如 `2025Q4`、`2026Q1`） |
| `epsForecast` | `EPSForecast` | 每股收益-预测 |
| `revenueForecast` | `RevenueForecast` | 营业收入-预测（亿港币） |
| `netProfitForecast` | `NetProfitForecast` | 净利润-预测（亿港币） |
| `peRatioForecast` | `PERatioForecast` | 市盈率-预测 |
| `psRatioForecast` | `PSRatioForecast` | 市销率-预测 |
| `roeForecast` | `ROEForecast` | 净资产收益率-预测 |

> 列顺序固定为 EPS → 营收 → 净利润 → PE → PS → ROE（与微证券页面 tab 顺序一致）；某指标在该季度没有预测时该列为 `undefined`/缺省。

> **数据源**：`stock_quote_history` 拉取最近 18 个月的 `EarningsForecast`（json），按 `(ForecastType, ForecastPeriod)` 聚合，每对取该窗口内最后一次出现的预测值。下游的 `EarningsForecast` 是**滚动型字段**——每个交易日只包含截至当日的最新预测期（通常 1 个 ForecastPeriod 跨多个 ForecastType），过段时间会切换到下一报告期。所以可见季度数等于该股票在窗口内被覆盖过的不同报告期数量（实测大多数港股目前能拿到 2 个季度）。

**分析要点**：目标价 vs 当前价（上涨空间）、EPS增速（盈利确定性）、PE走势（估值消化）、机构数（共识可信度）

---

### 脱水研报（`dehydrated`）

通过 `research_report_list_get` 获取脱水研报摘要列表，包含机构调研和行业风口两种类型。

**命令用法**：
```bash
westock-data dehydrated                         # 脱水研报列表（默认第1页，每页10条）
westock-data dehydrated --page 2 --size 20    # 自定义分页
westock-data dehydrated detail <研报ID>         # 研报详情
```

**输出格式**：
- 列表：Markdown 表格，含 `id | title | summary | pub_time | institution`
- 详情：Markdown 格式，含关联标的、投资要点、正文（HTML）

> 研报ID 从列表的 `id` 字段获取，用于查询详情。

---

### 技术指标（`technical`）

#### 截面查询

输出表格列：`code | name | date | closePrice | ma.MA_5 | ma.MA_10 | ... | macd.DIF | macd.DEA | macd.MACD | kdj.KDJ_K | ...`

嵌套对象（ma/macd/kdj/rsi/boll/bias/wr/dmi）的字段会展平为 `分组.字段名` 格式。

#### 历史区间查询

输出表格，每行一个交易日，列名同上。

### 筹码成本（`chip`）

#### 截面

输出表格列：`code | name | date | closePrice | chipProfitRate | chipAvgCost | chipConcentration90 | chipConcentration70`

#### 历史区间

输出表格，每行一个交易日，列名同上。

**解读**：盈利率>80%=获利盘占优；收盘价>平均成本=整体盈利；集中度越低=筹码越集中（主力控盘可能）

### 市场/指数/板块（`market`）

#### 截面（`MarketQuoteData`）关键字段

| 字段 | 说明 |
|------|------|
| `closePrice`/`changePct` | 收盘价/涨跌幅 |
| `chg5D`/`chg10D`/`chg20D`/`chg60D`/`chgYtd` | 多日涨跌幅(%) |
| `advancingCount`/`decliningCount` | 上涨/下跌家数 |
| `mainNetFlow`/`jumboNetFlow`/`blockNetFlow` | 主力/超大单/大单净流入（沪深，元）|
| `midNetFlow`/`smallNetFlow` | 中单/小单净流入（沪深，元）|
| `totalNetFlow`/`retailNetFlow` | 总/散户净流入（港股，港元）|

> ⚠️ 美股不支持资金流向字段，仅支持 `fund short`（卖空数据）

#### 历史区间

输出表格，每行一个交易日，含 `date | closePrice | changePct | mainNetFlow | ...`

### 市场总览（`market-overview`，A 股大盘画像）

8 个子类（type）归并到单一入口，提供 A 股大盘"宏观体检"。来源是 8 个 `market_statis_*` 后端清单。

| type | 中文 | 说明 |
|------|------|------|
| `summary` | 画像总评（默认） | 14 维度得分 + 状态文案（估值/情绪/技术/趋势/风格轮动/股市规模/宏观情绪/北向资金/两融情绪/PMI 等） |
| `trade` | 三大指数收盘统计 | 上证/深证/创业板 + 成交额多周期均值（5D/20D/60D） |
| `interval` | 三大指数多周期涨跌 | 5D/20D/60D/250D 涨跌 + 52 周高低 |
| `technical` | 大盘技术面 | MACD / KDJ / RSI / BOLL / MA |
| `updown` | A 股涨跌停 / 红绿盘 | 涨停/跌停家数 + 红绿盘比 + 创新高/新低家数 |
| `margin` | 两融余额变动 | 两融余额 + 多周期变动 |
| `valuation` | 估值百分位 | 中证全指 PE/PB/PS + 历史百分位 |
| `rotation` | 风格轮动 | 沪深300 / 中证1000 / 成长 / 价值 板块轮动 |

**用法**：
```
westock-data market-overview                    # 默认 summary（最常用，给 LLM 做"今日市场点评"）
westock-data market-overview --type trade       # 单 type
westock-data market-overview --type technical,updown   # 多 type 一次拉
westock-data market-overview --type all         # 全量 8 个
westock-data market-overview list               # 列出所有 type
```

**summary 14 维度** 每个维度含：`name`（维度名）、`score`（0~100 得分）、`status`（状态文案，如"估值偏高"、"情绪乐观"）。**这是给 AI 做今日市场点评最直接的入口** —— 一次调用即可得到"估值/情绪/技术/趋势/风格"5 大类共 14 个维度的状态画像。

### 排行数据（`rank`）

输出 Markdown 表格，列头为字段中文标签（来自 `list_data_schema`），如"市盈率TTM(倍)"、"股息率TTM(%)"等。

**返回信息**：
- 清单名称、查询日期、总条数
- 排序字段（中文标签）和方向（升序/降序）
- 分页信息（offset/limit/hasMore）
- 每行含股票代码、名称及各指标字段

**参数说明**：

| 参数 | 说明 | 可选值 |
|------|------|--------|
| 清单代码 | 排行清单代码，如 `fin_valuation` | 见 SKILL.md 排行清单表 |
| --limit | 每页条数，默认20，最大50 | 数字 |
| --offset | 偏移量，默认0 | 数字 |
| --desc | 排序方向，默认true（降序） | `true`/`false` |

> 字段中文标签由 API 的 `list_data_schema` 自动解析，无需手动映射

---

### 市场资讯（`news market`）

输出 Markdown 表格，列含 `time | id | type | symbol | title | url | ...`

**用法**：
- `--market hs|hk|us`（默认 hs）：预设市场
- `--code <代码1,代码2,...>`：自定义指数代码（如 `sh000001,sz399001`）
- `--market` 与 `--code` 互斥

### 分红数据（`dividend list/calendar`）

输出表格，字段因市场不同：

- **A股**：`reportEndDate | dividendFlag | procedure | dividendType | proposalSn | rightRegDate | exDiviDate | bonusShareRatio | tranAddShareRatio | cashDiviRMB | totalCashDiviComRMB | dividendPlan`
- **港股**：`reportEndDate | exDiviDate | cashPayDate | cashDivPerShare | specialDivPerShare | totalCashDivi | dividendPlan`
- **美股**：`exDivDate | regDate | payDate | dividendCurrency | dividend | dividendPlan`

> 美股可能额外包含 `splitInfo`（拆合股信息）

**参数说明**：
- 默认查询最近分红数据
- `--years N`：查询近N年分红历史（如 `--years 5`、`--years 10`）
- `--all`：返回所有记录（含未实施分红方案），默认只返回已实施分红的记录
- 返回记录按报告期/除权日降序排列（最新的在前）

### 财报披露日历（`disclosure`）

输出表格，字段因市场不同：

- **A股**：`reportEndDate | disclosureEndDate | disclosureDate | disclosureDesc`
- **港股**：`reportEndDate | disclosureDesc`
- **美股**：`reportEndDate | disclosureDate | disclosureDesc`

### 命令参数详细说明

#### news article（个股新闻列表）

| 参数位置 | 说明 | 可选值 |
|---------|------|--------|
| 代码 | 股票代码，支持逗号分隔批量 | - |
| 页码 | 页码，默认1 | 数字，从1开始 |
| 每页数量 | 每页返回条数，默认20 | 数字 |
| 类型 | 新闻类型 | `0`=公告，`1`=研报，`2`=新闻，`3`=全部（默认） |

#### notice list（公告列表）

| 参数位置 | 说明 | 可选值 |
|---------|------|--------|
| 代码 | 股票代码，支持逗号分隔批量 | - |
| 类型 | 公告类型 | `0`=全部（默认），`1`=财务，`2`=配股，`3`=增发，`4`=股权变动，`5`=重大事项，`6`=风险，`7`=其他 |

#### report（研报列表）

| 参数位置 | 说明 | 可选值 |
|---------|------|--------|
| 代码 | 股票代码，支持逗号分隔批量 | - |
| 页码 | 页码，默认1 | 数字，从1开始 |
| 每页数量 | 每页返回条数，默认20 | 数字 |
| 类型 | 研报类型 | `0`=全部（默认），`1`=研报，`2`=业绩会 |

#### calendar（投资日历）

| 参数位置 | 说明 | 可选值 |
|---------|------|--------|
| 日期 | 查询日期，不传则返回有事件的日期列表 | `YYYY-MM-DD` |
| 天数 | 向后查询天数，默认30 | 数字 |
| 地区 | 筛选地区 | `1`=中国，`2`=美国，`3`=港股，不传=全部 |
| 指标类型 | 筛选指标类型 | `1`=经济，`2`=央行，`3`=事件，`4`=休市，不传=全部 |

#### index constituent（指数成份股）

| 参数 | 说明 |
|------|------|
| 代码 | 指数代码，支持逗号分隔批量。A 股（如 sh000300）、港股（如 hkHSI）自动路由 |
| --list | 查询指数清单 |
| --search 关键词 | 搜索指数 |

#### connect（沪深港通成份股 / 北向 · 陆股通）

> 沪深港通成份股名单（标的池），不是资金流量数据；如需资金买卖方向请用 `fund flow` / `fund margin` / `fund block`。

| 参数 | 说明 | 可选值 |
|---------|------|--------|
| `--exchange` | 交易所（必填） | `sh`=沪股通，`sz`=深股通 |
| `--limit` | 每页条数，默认 50，最多 100 | 数字 |
| `--offset` | 偏移量（用于翻页） | 数字 |

---

## 三、货币单位处理

> ⚠️ **重要**：港股财报返回港元/美元，美股返回美元，展示时**必须**标注正确货币单位

**港股**：检查 `CurrencyType`（"港币"/"美元"/"人民币"）和 `CurrencyUnit` 字段
- ✅ 正确：`营业收入：832.3亿港元`
- ❌ 错误：`营业收入：¥832.3亿`

**跨期对比注意**：同比/环比增长率可能受汇率换算影响，展示时建议添加说明：`"注：同比数据可能受汇率波动影响"`

---

## 四、单位换算

| 数据类型 | 原始单位 | 转换 |
|---------|---------|------|
| 成交量 | 手 | ÷10000=万手 |
| 成交额/市值/主力资金 | 元 | ÷100000000=亿元 |
| 港股金额 | 港元 | ÷100000000=亿港元 |
| 美股金额 | 美元 | ÷100000000=亿美元 |
| 卖空数量 | 股 | ÷1000000=百万股 |

---

## 四点五、ETF 数据字段

### ETF 详情（`etf`）

| 字段 | 说明 |
|------|------|
| `etfType` | ETF类别 |
| `establishDate` | 成立日期 |
| `manageInstitution` | 管理人 |
| `trusteeInstitution` | 托管人 |
| `trackIndexCode/Name` | 跟踪指数代码/名称 |
| `isTPlus0` | 是否支持T+0 |
| `subscriptionFee` | 新发认购费率(%) |
| `managementFee` | 管理费率(%) |
| `custodyFee` | 托管费率(%) |
| `serviceFee` | 销售服务费(%) |
| `nav` | 单位净值 |
| `disc` | 溢折率(%) |
| `size` | 规模 |
| `shares` | 份额 |
| `sharesChg` | 净申购份额 |
| `sharesChgRatio` | 净申购比例(%) |
| `discountRatioCurve` | 溢折率(曲线) |
| `avgDiscountRatioCurve` | 同指数平均溢折率 |
| `indexDailyChange` | 跟踪指数当日涨跌幅(%) |
| `index1YReturn` | 跟踪指数近1年年化收益(%) |
| `ytdReturn` | 今年以来收益率(%) |
| `return1M/3M/6M/1Y/3Y` | 近1月/3月/6月/1年/3年收益率(%) |
| `ytdMaxDrawdown` | 今年以来最大回撤(%) |
| `maxDrawdown1M/3M/6M/1Y/3Y` | 近N月最大回撤(%) |
| `topStockChanges` | 重仓股票涨跌幅(JSON数组) |
| `classification` | **详细分类对象**（来自 `etf_classification` 清单）：`primary` 资产类别 / `secondary` 投资风格 / `tertiary` 细分领域 / `quaternary` 具体方向 / `memo` 跟踪标的 |
| `managerHistory` | **基金经理历史对象**（来自 `etf_manager` 清单）：`current` 当前在任(数组) / `first` 首任 / `longest` 任职最长(数组) / `history` 全部历任(数组) |

> ⚠️ **清单增强字段降级**：`classification` / `managerHistory` 来自独立的清单接口（`query_list_data_by_date`），与主体数据并行获取。当清单接口失败时，detail 主流程仍正常返回，仅这两个字段为空，不影响其他字段使用。
>
> ⚠️ **自定义 fields 时跳过增强**：若调用 `batchQueryETFDetail(codes, date, customFields)` 传入自定义 fields，认为是按需精确取数，会跳过清单增强请求以减少开销。

### topStockChanges 解析字段

| 字段 | 说明 |
|------|------|
| `code` | 股票代码 |
| `name` | 股票名称 |
| `ratio` | 占比(%) |
| `rate` | 涨跌幅(%) |
| `change` | 较上期占比变化 |

---

## 四点六、公司回购字段

### 回购数据（`buyback`）

**港股字段**：
| 字段 | 说明 |
|------|------|
| `BuybackShares` | 回购股份(股) |
| `BuybackMoney` | 回购金额(港元) |
| `BuybackPrice` | 回购均价(港元) |
| `BuybackCumMoney` | 本轮回购累计金额(港元) |

**A股字段**（BuybackAttach 数组）：
| 字段 | 说明 |
|------|------|
| `BuybackFunds` | 本次回购资金(元) |
| `BuybackSum` | 本次回购数量(股) |
| `BuybackPrice` | 本次回购均价(元) |

> 回购数据按日期降序排列，仅返回有回购记录的交易日

---

### 风险事件（`risk`）

#### 特别处理（ST）

| 字段 | 说明 |
|------|------|
| `type` | 特别处理类型（ST/\*ST/SST/撤销ST） |
| `explain` | 事项描述 |
| `date` | 信息发布日期 |
| `riskLevel` | 风险等级：high（高风险）、medium（中风险）、low（低风险） |

#### 股权质押

| 字段 | 说明 |
|------|------|
| `date` | 股权质押披露截止日期 |
| `floatPledgedVolume` | 无限售股份质押数量（万股） |
| `nonFloatPledgedVolume` | 有限售股份质押数量（万股） |
| `pledgeNum` | 质押笔数 |
| `pledgeRatio` | 质押比例 |
| `totalPledge` | 质押数量（万股） |
| `riskLevel` | 风险等级：high（质押比例≥50%）、medium（30%-50%）、low（<30%） |

#### 解禁信息

| 字段 | 说明 |
|------|------|
| `initialInfoPublDate` | 解禁信息首次发布日期 |
| `infoPublDate` | 解禁信息最新发布日期 |
| `estimateActual` | 解禁日期类型 |
| `shareHolderName` | 解禁股东名 |
| `changeReason` | 解禁原因 |
| `restrictedCondition` | 限售条件说明 |
| `newAFloatListed` | 新增可售A股 |
| `actualFloatListedShares` | 实际上市流通数量 |
| `riskLevel` | 风险等级：high、medium、low |

#### 诉讼仲裁

| 字段 | 说明 |
|------|------|
| `date` | 诉讼仲裁最新公告日期 |
| `actionDesc` | 行为描述 |
| `subjectMatterStat` | 案由简称 |
| `latestSuitSum` | 涉诉金额（元） |
| `eventSubject` | 事件主体 |
| `eventSubjectRole` | 事件主体在诉讼中的角色 |
| `plaintiff` | 诉讼仲裁原告 |
| `defendant` | 诉讼仲裁被告 |
| `plaintiffAssociation` | 原告与上市公司关联关系 |
| `defendantAssociation` | 被告与上市公司关联关系 |
| `caseStatus` | 仲裁状态 |
| `firstInstanceStatus` | 一审状态 |
| `secondInstanceStatus` | 二审状态 |
| `sppStatus` | 最高院监督状态 |
| `adjudgementStatus` | 判决执行状态 |
| `riskLevel` | 风险等级：high（涉诉金额>1亿或作为被告）、medium（>1000万）、low |

#### 增发信息

| 字段 | 说明 |
|------|------|
| `issueType` | 增发类别 |
| `eventProcedure` | 事件进程 |
| `advanceDate` | 预案公告日期 |
| `smDeciPublDate` | 决案公告日期 |
| `intentLetterPublDate` | 意向书发布日期 |
| `prospectusPublDate` | 新股说明书发布日期 |
| `sacApprovalPublDate` | 国资委通过日期 |
| `csrcApprovalPublDate` | 证监会批准日期 |
| `advanceValidStartDate` | 预案有效期起始日期 |
| `advanceValidEndDate` | 预案有效期截止日期 |
| `newSharesListDate` | 增发新股上市日期 |
| `stockType` | 增发A股类型 |
| `issuePurpose` | 增发目的 |
| `issueObject` | 发行对象 |
| `issuePriceCeiling` | 发行价上限（元） |
| `issuePriceFloor` | 发行价下限（元） |
| `issuePrice` | 每股发行价（元） |
| `issueVol` | 发行量（万股） |
| `seoProceeds` | 增发新股募集资金总额（元） |
| `seoNetProceeds` | 增发新股募集资金净额（元） |

#### 高管变动（LeaderChange）

| 字段 | 说明 |
|------|------|
| `leaderName` | 高管姓名 |
| `leaderPosition` | 职位（如 副总裁/董事/总经理） |
| `leaderPositionType` | 职位类型（如 经营层/董事会） |
| `leaderStartDate` | 任职起始日期（已规范化为 YYYY-MM-DD） |
| `leaderChangeReason` | 变动原因（如 退休/辞职/换届） |

> **接入说明**：通过 `stock_quote_snapshot` 截面查询，`LeaderChange` 字段是嵌套 JSON 数组字符串。结果按任职起始日期倒序。

#### 高管增减持（ExecutiveTransferPlans）

| 字段 | 说明 |
|------|------|
| `managerName` | 高管姓名 |
| `managerSharesChange` | 股份变动数量（**负数表示减持，正数表示增持**） |
| `managerDealPrice` | 成交均价（元） |
| `managerHoldChangeDeclareDate` | 公告日期（已规范化为 YYYY-MM-DD） |

> **接入说明**：`stock_quote_history` 取近 1 年序列 + `stock_quote_snapshot` 兜底最新一条，按 (公告日期, 姓名, 变动数) 三元组去重，结果按公告日期倒序。

#### 评级信息（BondRatingInfo）

| 字段 | 说明 |
|------|------|
| `rating` | 评级（如 AAA/AA+/AA） |
| `ratingOutlook` | 评级展望（如 稳定/正面/负面） |
| `ratingChgDirection` | 变动方向（如 维持/上调/下调） |
| `ratingStandard` | 评级标准 |
| `ratingOrg` | 评级机构（如 中诚信国际/联合资信） |

> **接入说明（⚠️ 待下游确认）**：实测下游 `stock_quote_history` 与 `stock_quote_snapshot` 对 `BondRatingInfo` 字段的返回均为空（仅含 EndDate/SecuCode），尝试过 BondRating/CreditRating/IssuerRating/Rating/RatingInfo 等字段名变体也均无数据。客户端解析逻辑已就绪，待下游接入完整后即可生效。当前查询此类型可能返回空，AI 应明确告知用户"暂无评级信息"，**不应编造评级**。

> **注意**：风险事件只提供客观数据展示，不进行主观评分或风险等级判定。用户需根据实际情况自行判断风险程度。

---

### 事件总览（`events`，42 类标签）

> **与 risk 的差别**：`risk` 是 8 类风险事件**细查**（按个股取明细字段），`events` 是 42 类事件标签**速览**（按 `stock_event` 全市场清单一次拉取后客户端过滤）。`events` 仅展示挂在股票身上的事件 ID + 中文描述，覆盖中性+利好+风险全场景，不含明细字段。

**返回字段**：

| 字段 | 说明 |
|------|------|
| `date` | 查询日期（YYYY-MM-DD） |
| `stocks[].code` | 股票代码（如 sh600519） |
| `stocks[].name` | 股票名称（清单未返回时通过 `stock_quote_snapshot` 兜底补全） |
| `stocks[].tagIds` | 命中的事件 ID 数组（按 `--types` 过滤后） |
| `stocks[].tagDescs` | 事件 ID 对应中文描述（与 tagIds 顺序一致） |

**42 类事件 ID 映射（按大类分组）**：

| 大类 | 事件 ID | 说明 |
|------|---------|------|
| 交易异动 | 1 | 过去1个月内的大宗交易 |
| 交易异动 | 21 | 过去2周内的龙虎榜上榜详情 |
| 交易异动 | 22 | 过去2周内的龙虎榜上榜统计 |
| 股本变动 | 2 | 过去1个月内发生了回购披露的 |
| 股本变动 | 5 | 在过去1个月内发布了实施公告但尚未除权除息(含权期) |
| 股本变动 | 6 | 在过去3天内已经除权除息(正在填权观察窗口期) |
| 股本变动 | 7 | 在过去1个月内发布了分红预案(已过董事会) |
| 股本变动 | 8 | 在过去1个月内发布了分红决案(已过股东大会) |
| 股本变动 | 17 | 定增上市后一月 |
| 股本变动 | 18 | 定增上市后三月 |
| 股本变动 | 19 | 定增上市前一月 |
| 股本变动 | 20 | 定增上市前一周 |
| 业绩披露 | 9 | 过去1个月新增发布业绩快报 |
| 业绩披露 | 10 | 过去1个月新增发布业绩预告 |
| 业绩披露 | 11 | 过去7天新增发布财报 |
| 业绩披露 | 12 | 已经披露了将在未来1个月内发布新财报 |
| 指数变动 | 13 | 刚加入重要指数成分股一周内 |
| 指数变动 | 14 | 已披露即将加入重要指数成分股 |
| 指数变动 | 15 | 刚被踢出重要指数成分股一周内 |
| 指数变动 | 16 | 已披露即将踢出重要指数成分股 |
| 董监高 | 23 | 过去1个月内有董监高变动 |
| 董监高 | 24 | 过去1个月内发生了董监高增减持的披露 |
| 董监高 | 25 | 披露了计划增持且正在计划实施中的 |
| 董监高 | 26 | 已经披露计划增持但尚未进入实施 |
| 董监高 | 27 | 披露了计划减持且正在计划实施中的 |
| 董监高 | 28 | 已经披露计划减持但尚未进入实施 |
| 股权事件 | 29 | 将在1个月内召开股东大会 |
| 股权事件 | 30 | 尚未否决或结束的吸收合并 |
| 股权事件 | 31 | 尚未否决或结束的资产重组 |
| 股权事件 | 32 | 已公告即将更名，尚未生效 |
| 股权事件 | 33 | 过去3个月内刚更名的观察期 |
| 股权事件 | 38 | 尚未否决或结束的要约收购 |
| 限售解禁 | 34 | 已经发布了实际解禁公告将在不远的近期发生实际解禁 |
| 限售解禁 | 35 | 实际解禁份额已上市的2周观察期内 |
| 限售解禁 | 36 | 预计将在未来3个月内解禁 |
| 法律处罚 | 3 | 已经披露被处罚但尚未生效 |
| 法律处罚 | 4 | 已经生效的重大违规处罚一月内 |
| 法律处罚 | 37 | 过去一个月内披露涉诉 |
| 停复牌 | 39 | 预计将在未来3天内复牌 |
| 停复牌 | 40 | 过去1周内已复牌的 |
| 停复牌 | 41 | 处在停牌中的股票 |
| 停复牌 | 42 | 停牌已超过30天的股票 |

> 完整中文描述与最新分组通过 `westock-data events list` 查看（动态生成，与代码同源）。

**典型用法**：

```bash
westock-data events tags sh600519                  # 个股事件标签速览
westock-data events tags sh600519,sz000001         # 批量
westock-data events tags sh600519 --types 23,24    # 仅看董监高变动+增减持
westock-data events list                           # 列出全部 42 类
```

**与 risk 的选择**：
- 想知道**有没有**某类事件 → `events`（轻量速览，1 次接口拉清单）
- 想拿到**明细字段**（如解禁数量、质押比例、诉讼金额、高管姓名） → `risk`

> **数据特性**：`events` 命中规则由 `stock_event` 清单维护方决定（如"过去 1 个月内"、"未来 3 天内"等窗口）；某些 ID（如停复牌系列）只在事件发生窗口内才会被打标。当某只股票 `events` 返回为空时，应明确告知用户"当前无事件命中"，**不应编造事件**。

---

## 五、分析模板

### 成交量分析

1. `kline <CODE> day 20` → 从表格中提取 `volume` 列
2. 计算：平均值、最大/最小值、前10日均值 vs 后10日均值
3. 识别：放量日（>均值×1.5）、缩量日（<均值×0.5）

### 资金流向分析

**A股**：`fund flow <CODE>` → 提取 `MainNetFlow`/`JumboNetFlow`/`BlockNetFlow` → 转换单位（元→亿元）→ 统计净流入/流出天数

**港股资金**：`fund flow <CODE>` → 提取 `TotalNetFlow`/`MainNetFlow` → 分析主力趋势

**港股卖空**：`fund short <CODE>` → 提取 `ShortShares`/`ShortAmount`/`ShortRatio` → 卖空比率>15%需关注

**美股卖空**：`fund short <CODE>` → 提取 `ShortRatio`/`ShortShares`/`ShortRecoverDays` → `ShortRatio`>10%或`ShortRecoverDays`>5天需关注

**指数/板块**：`market <CODE>` → 提取 `mainNetFlow`/`jumboNetFlow`/`blockNetFlow` → 转换单位 → 判断主力方向

### 技术指标分析

**MACD**：DIF与DEA交叉（金叉=买信号/死叉=卖信号）、MACD柱正负变化、DIF/DEA相对0轴位置

**KDJ**：K与D交叉、J值>80超买/<20超卖

**RSI**：RSI_6>70超买/<30超卖，RSI_6与RSI_12背离

**均线**：多头排列（MA5>MA10>MA20>MA60）、MA60/120/250作为支撑/压力位

### 筹码趋势分析（历史区间）

- 盈利率上升 = 获利盘增加（股价上涨）
- 平均成本抬升 = 筹码成本中枢上移（主力可能建仓）
- 集中度下降 = 筹码趋于集中（主力吸筹控盘）
- 集中度上升 = 筹码趋于分散（可能派发）

### 机构评级分析（港股/美股）

1. 评级共识度：`(ratingBuyCnt + ratingIncCnt) / ratingCnt`
2. 目标均价 vs 当前价 → 上涨/下跌空间
3. 港股：`earningsForecast` EPS × 目标PE → 合理估值区间

### A股一致预期分析

1. 目标价 vs 当前价 → 上涨空间
2. 多年度EPS增速 → 盈利增长确定性
3. PE走势 → 估值是否逐年降低（估值消化）
4. `institutionCnt` → 共识覆盖度

### 宏观经济数据分析

**可用指标**：

| 指标代码 | 名称 | 分组 | 查询方式 |
|----------|------|------|----------|
| `gdp` | GDP数量指标 | GDP | `--year` |
| `cpi_ppi` | GDP价格指标(CPI/PPI) | GDP | `--year` |
| `pmi` | GDP供给指标(PMI) | GDP | `--year` / `--start` `--end` |
| `profit` | GDP供给指标(工业企业利润) | GDP | `--year` |
| `value_added` | GDP供给指标(工业增加值) | GDP | `--year` |
| `consumption` | GDP需求指标(消费) | GDP | `--year` |
| `investment` | GDP需求指标(投资) | GDP | `--year` |
| `prosperity` | GDP供给指标(企业景气指数) | GDP | `--year` |
| `fiscal` | GDP财政指标 | GDP | `--year` |
| `power_consumption` | GDP供给指标(用电量) | GDP | `--year` |
| `disposable_income` | GDP需求指标(可支配收入) | GDP | `--year` |
| `capacity_utilization` | GDP供给指标(产能利用率) | GDP | `--year` |
| `product_output` | GDP供给指标(宏观产量) | GDP | `--year` |
| `export_value` | GDP需求指标(出口交货值) | GDP | `--year` |
| `export` | GDP需求指标(进出口) | GDP | `--date`（月频） |
| `financing` | 货币需求指标 | 货币 | `--year` |
| `fundquantity` | 货币供给指标(数量) | 货币 | `--year` |
| `fundcost` | 货币供给指标(利率) | 货币 | `--year` |
| `yield_curve` | 货币供给指标(国债收益率曲线) | 货币 | `--year` |
| `mlf` | 货币供给指标(公开市场操作/MLF) | 货币 | `--year` |
| `term_spread` | 期限利差与曲线形态 | 货币 | `--date`（最新值） |
| `premium_curve` | 溢价率曲线（红利/股债） | 估值 | `--date`（日频） |
| `premium_value` | 溢价率水平（含10年分位） | 估值 | `--date`（最新值） |
| `core_indicators_cur` | 最新核心宏观指标 | 综合 | `--date`（同时返回 p1 和 p2） |
| `forecast` | 宏观预测 | 综合 | `--year`（月频） |
| `employment` | 就业情况 | 综合 | `--year`（日频） |
| `calendar_hist` | 宏观日历历史 | 综合 | `--year` |
| `calendar_future` | 宏观日历未来 | 综合 | `--date` |

> **两种查询方式**：
> 1. **`--year` / `--start --end`**（标准年份型）：GDP/CPI/PMI 等大多数指标，后端按 YYYY-01-01 查询
> 2. **`--date`**（按指定日期）：`core_indicators_cur`（最新核心宏观指标）/ `premium_curve` / `premium_value` / `term_spread` / `calendar_future` —— 按实际日期查询最新值
>
> **注意**：查询 `core_indicators_cur` 时会同时返回 `macro_core_indicators_cur_p1` 和 `macro_core_indicators_cur_p2` 两个数据集。

**PMI 分析要点**：
1. 制造业 PMI > 50 → 扩张，< 50 → 收缩
2. 关注新订单 vs 产成品库存差值 → 未来景气领先指标
3. 连续 3 个月趋势比单月数值更重要

**GDP 价格指标分析**：
1. CPI 同比 > 3% → 通胀压力，< 0 → 通缩风险
2. PPI vs CPI 剪刀差 → 上下游传导效率
3. 核心 CPI（剔除食品能源）→ 真实通胀水平

**货币指标分析**：
1. M2 增速 > 名义 GDP 增速 → 流动性宽裕
2. M1-M2 剪刀差收窄 → 企业活期存款增加（经营活跃）
3. 社融增量同比 → 实体经济融资需求
4. LPR/MLF 利率变动 → 央行政策信号

**国债收益率曲线分析**（`yield_curve`）：
1. 10Y-1Y 利差扩大 → 经济预期改善；倒挂 → 衰退预期
2. 长端利率（10Y/30Y）下行 → 风险偏好回落或宽松预期
3. 短端利率（1Y/2Y）跟随政策利率（MLF/逆回购）

**MLF 公开市场操作分析**（`mlf`）：
1. 净投放（投放-到期）持续为正 → 央行主动宽松
2. 操作利率下调 → LPR 大概率跟随下调，宽松信号
3. 月末余额变化反映总量基调

**财政指标分析**（`fiscal`）：
1. 财政赤字进度（`FISCAL_DEFICIT_PRG_YTD`）→ 全年赤字执行节奏
2. 税收/非税收占比 → 财政质量
3. 地方债发行（一般+专项）→ 基建发力强度
4. 民生支出占比（教育/医疗/社保）→ 财政结构

**就业指标分析**（`employment`）：
1. 城镇调查失业率 → 整体就业景气
2. 16-24 岁青年失业率 → 结构性矛盾
3. 百度搜索指数（招聘/失业/找工作）→ 高频领先信号

**产能利用率分析**（`capacity_utilization`）：
1. 制造业产能利用率 < 75% → 产能过剩；> 80% → 偏紧
2. 同比改善幅度大的行业 → 景气拐点

**进出口分析**（`export`）：
1. 货物贸易差额 → 顺差/逆差对人民币汇率影响
2. 服务贸易差额（旅行/运输等）→ 跨境消费/物流变化
3. 外汇储备 + 黄金储备 → 央行储备资产配置

**宏观预测分析**（`forecast`）：
1. 与官方公布值对比 → 市场一致预期偏离
2. PMI/CPI/M2 等核心指标的预测值 → 短期市场博弈基准
3. 多份预测值的中位数比单一来源更可靠

**溢价率分析**（`premium_value` / `premium_curve`）：
1. **股债溢价率（EquityPremium）= E/P - 10Y国债收益率**：衡量股票相对债券的吸引力
   - 数值越高 → 股票相对债券越便宜 → 股市性价比高
   - `EprPct10Y` 在 80%+ → 历史高位，股市偏便宜；< 20% → 历史低位，股市偏贵
2. **红利溢价率（DividendPremium）= 股息率 - 10Y国债收益率**：衡量高股息资产相对债券的吸引力
   - 高位 → 高股息策略胜率提升
3. **`premium_curve`（约 2400 条历史日频）→ 长期分位上下轨**；`premium_value`（1 条最新值 + 10 年分位）→ 当前快速判断

**期限利差分析**（`term_spread`）：
1. **`TermSpread` = Yield10Y - Yield2Y（单位 bps）**：衡量长短端国债利差
   - 利差扩大（变陡） → 经济预期改善；倒挂 → 衰退预期信号
2. **`CurveForm*` 中文枚举**（牛陡/牛平/熊陡/熊平），多周期视角：
   - **牛陡**：短端下行更快 → 宽松预期/避险买短债
   - **牛平**：长端下行更快 → 衰退/通缩预期、避险买长债
   - **熊陡**：长端上行更快 → 通胀/经济过热预期
   - **熊平**：短端上行更快 → 央行紧缩预期
3. **长短端变化对比**（`LongDif*` vs `ShortDif*`）→ 判断曲线驱动来自哪一端

### 板块成份股分析

> ⚠️ **概念股查询重点**：当用户问"XX概念有哪些股票"（如"华为概念股"、"AI概念股"、"新能源汽车概念"），必须使用统一 `search` 入口两步查询：
> 1. `westock-data search 华为 --type sector` — 搜索板块代码
> 2. `westock-data sector constituent <搜索到的代码>` — 查询成份股
>
> **不要用外部搜索工具**；按指定清单收口（`--scope industry_list_sw1` 等）需要用 `sector search` 子命令。

**板块代码格式**：

| 前缀 | 类型 | 示例 |
|------|------|------|
| `sw1_` | 申万一级行业 | `sw1_pt01801080`(电子) |
| `sw2_` | 申万二级行业 | `sw2_pt01801081`(半导体) |
| `sw3_` | 申万三级行业 | `sw3_pt01801081` |
| `area_` | 聚源地域概念 | `area_pt0001`(北京) |
| `style_` | 聚源产业概念 | `style_pt0001` |
| `indus_` | 聚源风格概念 | `indus_pt0001` |

> 指数成份股请使用 `index` 命令：`westock-data index constituent sh000300`（A 股）/ `westock-data index constituent hkHSI`（港股）

**港股指数成份股**：

港股指数（如 `hkHSI` 恒生指数、`hkHSCEI` 国企指数、`hkHSTECH` 恒生科技）不支持清单代码查询，改用 `stock_quote_snapshot` + `BkComponentStocks` 字段查询。

**返回字段（港股指数成份股）**：

| 字段 | 说明 |
|------|------|
| `code` | 成份股代码（如 hk00700） |
| `name` | 成份股名称（如 腾讯控股） |
| `chg` | 涨跌幅（%） |
| `turnover` | 成交额 |

**与 A 股指数成份股的差别**：

| 对比项 | A 股指数 | 港股指数 |
|--------|----------|----------|
| 查询方式 | `query_list_data_by_date`（清单代码） | `stock_quote_snapshot`（BkComponentStocks） |
| 返回字段 | code, name | code, name, chg, turnover |
| 成份数量 | 全量（如沪深300返回300只） | 仅返回当前涨幅/跌幅前20只 |

> **注意**：港股指数 `BkComponentStocks` 仅返回涨跌幅前 20 只成份股，非完整成份股列表。如需恒生指数全部 80 只成份股，建议通过 A 股对应指数或 ETF 持仓间接获取。

**常见分析思路**：
1. 查成份股列表 → 统计成份股数量和行业分布
2. 成份股列表 + 批量行情 → 板块内涨跌排行
3. 区间查询对比 → 分析成份股调入调出变化
4. 多板块交叉 → 找出同时属于多个板块的交集股票

---

## 六、格式化输出规范

- 金额超过亿元：使用"亿元"/"亿港元"/"亿美元"
- 成交量超过万手：使用"万手"
- 涨跌幅：保留2位小数，带 +/- 号
- 日期：YYYY-MM-DD 格式
- 数据为空时说明"暂无数据"，**不可伪造数据**
- 港股/美股财务数据必须标注货币单位
