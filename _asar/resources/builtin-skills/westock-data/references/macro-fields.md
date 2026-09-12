# 宏观经济指标字段说明

本文档列出 `westock-data macro` 命令返回的所有字段及其含义。

> 数据来源：腾讯自选股宏观经济数据接口

## 指标列表

### 按年查询的指标（传入日期自动转为 YYYY-01-01）

| 指标代码 | 完整代码 | 名称 | 分类 |
| -------- | -------- | ---- | -------- |
| `gdp` | `macro_gdp` | GDP数量指标 | GDP |
| `cpi_ppi` | `macro_cpi_ppi` | GDP价格指标(CPI/PPI) | GDP |
| `pmi` | `macro_pmi` | GDP供给指标(PMI) | GDP |
| `profit` | `macro_profit` | GDP供给指标(工业企业利润) | GDP |
| `value_added` | `macro_valueadded` | GDP供给指标(工业增加值) | GDP |
| `consumption` | `macro_consumption` | GDP需求指标(消费) | GDP |
| `investment` | `macro_investment` | GDP需求指标(投资) | GDP |
| `export` | `macro_export` | GDP需求指标(进出口) | GDP |
| `prosperity` | `macro_prosperity` | GDP供给指标(企业景气指数) | GDP |
| `fiscal` | `macro_fiscal` | GDP财政指标 | GDP |
| `power_consumption` | `macro_power_consumption` | GDP供给指标(用电量) | GDP |
| `disposable_income` | `macro_disposable_income` | GDP需求指标(可支配收入) | GDP |
| `capacity_utilization` | `macro_capacity_utilization` | GDP供给指标(产能利用率) | GDP |
| `product_output` | `macro_product_output` | GDP供给指标(宏观产量) | GDP |
| `export_value` | `macro_export_value` | GDP需求指标(出口交货值) | GDP |
| `financing` | `macro_financing` | 货币需求指标(融资) | 货币 |
| `fundquantity` | `macro_fundquantity` | 货币供给指标(数量) | 货币 |
| `fundcost` | `macro_fundcost` | 货币供给指标(利率) | 货币 |
| `yield_curve` | `macro_yield_curve` | 货币供给指标(国债收益率曲线) | 货币 |
| `mlf` | `macro_mlf` | 货币供给指标(公开市场操作/MLF) | 货币 |
| `employment` | `macro_employment` | 就业情况 | 综合 |
| `forecast` | `macro_forecast` | 宏观预测 | 综合 |
| `calendar_hist` | `macro_calendar_hist` | 宏观日历历史 | 综合 |

### 按日期查询的指标（使用实际日期）

| 指标代码 | 完整代码 | 名称 | 分类 |
| -------- | -------- | ---- | -------- |
| `core_indicators_cur` | `macro_core_indicators_cur_p1` / `macro_core_indicators_cur_p2` | 最新核心宏观指标 | 综合 |
| `premium_curve` | `macro_premium_curve` | 溢价率曲线(红利/股债) | 估值 |
| `premium_value` | `macro_premium_value` | 溢价率水平(含10年分位) | 估值 |
| `term_spread` | `macro_term_spread` | 期限利差与曲线形态 | 估值 |
| `calendar_future` | `macro_calendar_future` | 宏观日历未来 | 综合 |

> **注意**：查询 `core_indicators_cur` 时会同时返回 `macro_core_indicators_cur_p1` 和 `macro_core_indicators_cur_p2` 两个数据集。

---

## GDP数量指标

| 字段 | 说明 |
| ---- | ---- |
| `CONTRI_ALGRICULTURE_CUM` | GDP贡献率:农林牧渔业:累计值:季(%) |
| `CONTRI_BUILD_CUM` | GDP贡献率:建筑业:累计值:季(%) |
| `CONTRI_CAPITAL_CUM` | GDP贡献率:资本形成总额:累计值:季(%) |
| `CONTRI_CAPITAL_CUR` | GDP贡献率:资本形成总额:当期值:季(%) |
| `CONTRI_CONSUME_CUM` | GDP贡献率:最终消费支出:累计值:季(%) |
| `CONTRI_CONSUME_CUR` | GDP贡献率:最终消费支出:当期值:季(%) |
| `CONTRI_FINANCE_CUM` | GDP贡献率:金融业:累计值:季(%) |
| `CONTRI_FIRST_CUM` | GDP贡献率:第一产业:累计值:季(%) |
| `CONTRI_FIRST_CUR` | GDP贡献率:第一产业:当期值:季(%) |
| `CONTRI_IMPORT_CUM` | GDP贡献率:货物和服务净出口:累计值:季(%) |
| `CONTRI_IMPORT_CUR` | GDP贡献率:货物和服务净出口:当期值:季(%) |
| `CONTRI_IT_CUM` | GDP贡献率:信息传输、软件和信息技术服务业:累计值:季(%) |
| `CONTRI_MANUFACTURE_CUM` | GDP贡献率:工业:累计值:季(%) |
| `CONTRI_OTHER_CUM` | GDP贡献率:其他服务业:累计值:季(%) |
| `CONTRI_REALESTATE_CUM` | GDP贡献率:房地产业:累计值:季(%) |
| `CONTRI_RENT_CUM` | GDP贡献率:租赁和商务服务业:累计值:季(%) |
| `CONTRI_RESTERAUNT_CUM` | GDP贡献率:住宿和餐饮业:累计值:季(%) |
| `CONTRI_RETAIL_CUM` | GDP贡献率:批发和零售业:累计值:季(%) |
| `CONTRI_SECOND_CUM` | GDP贡献率:第二产业:累计值:季(%) |
| `CONTRI_SECOND_CUR` | GDP贡献率:第二产业:当期值:季(%) |
| `CONTRI_THIRD_CUM` | GDP贡献率:第三产业:累计值:季(%) |
| `CONTRI_THIRD_CUR` | GDP贡献率:第三产业:当期值:季(%) |
| `CONTRI_TRANSPORT_CUM` | GDP贡献率:交通运输、仓储和邮政业:累计值:季(%) |
| `GDP_ENDDATE` | GDP指标截止日期 |
| `GDP_INFOPUBLDATE` | GDP指标发布日期 |
| `NOMINAL_GDP_CUM` | GDP(现价):累计值:季(亿) |
| `NOMINAL_GDP_CUM_YOY` | GDP(现价):累计同比:季(亿) |
| `NOMINAL_GDP_CUR` | GDP(现价):当期值:季(亿) |
| `NOMINAL_GDP_CUR_YOY` | GDP(现价):当期同比:季(亿) |
| `PULL_ALGRICULTURE_CUM` | GDP拉动率:农林牧渔业:累计值:季(%) |
| `PULL_BUILD_CUM` | GDP拉动率:建筑业:累计值:季(%) |
| `PULL_CAPITAL_CUM` | GDP拉动率:资本形成总额:累计值:季(%) |
| `PULL_CAPITAL_CUR` | GDP拉动率:资本形成总额:当期值:季(%) |
| `PULL_CONSUME_CUM` | GDP拉动率:最终消费支出:累计值:季(%) |
| `PULL_CONSUME_CUR` | GDP拉动率:最终消费支出:当期值:季(%) |
| `PULL_FINANCE_CUM` | GDP拉动率:金融业:累计值:季(%) |
| `PULL_FIRST_CUM` | GDP拉动率:第一产业:累计值:季(%) |
| `PULL_FIRST_CUR` | GDP拉动率:第一产业:当期值:季(%) |
| `PULL_IMPORT_CUM` | GDP拉动率:货物和服务净出口:累计值:季(%) |
| `PULL_IMPORT_CUR` | GDP拉动率:货物和服务净出口:当期值:季(%) |
| `PULL_IT_CUM` | GDP拉动率:信息传输、软件和信息技术服务业:累计值:季(%) |
| `PULL_MANUFACTURE_CUM` | GDP拉动率:工业:累计值:季(%) |
| `PULL_OTHER_CUM` | GDP拉动率:其他服务业:累计值:季(%) |
| `PULL_REALESTATE_CUM` | GDP拉动率:房地产业:累计值:季(%) |
| `PULL_RENT_CUM` | GDP拉动率:租赁和商务服务业:累计值:季(%) |
| `PULL_RESTERAUNT_CUM` | GDP拉动率:住宿和餐饮业:累计值:季(%) |
| `PULL_RETAIL_CUM` | GDP拉动率:批发和零售业:累计值:季(%) |
| `PULL_SECOND_CUM` | GDP拉动率:第二产业:累计值:季(%) |
| `PULL_SECOND_CUR` | GDP拉动率:第二产业:当期值:季(%) |
| `PULL_THIRD_CUM` | GDP拉动率:第三产业:累计值:季(%) |
| `PULL_THIRD_CUR` | GDP拉动率:第三产业:当期值:季(%) |
| `PULL_TRANSPORT_CUM` | GDP拉动率:交通运输、仓储和邮政业:累计值:季(%) |
| `REAL_GDP_CUM` | GDP(不变价):累计值:季(亿) |
| `REAL_GDP_CUM_YOY` | GDP(不变价):累计同比:季(%) |
| `REAL_GDP_CUR` | GDP(不变价):当期值:季(亿) |
| `REAL_GDP_CUR_YOY` | GDP(不变价):当期同比:季(%) |

## CPI/PPI（GDP价格指标）

| 字段 | 说明 |
| ---- | ---- |
| `CPI_PPI_ENDDATE` | CPI-PPI指标截止日期 |
| `CPI_PPI_INFOPUBLDATE` | CPI-PPI指标发布日期 |
| `CPI_YOY` | CPI:当期同比:月(%) |
| `CPI_YOY_CORE` | CPI:不包括食品和能源:当期同比:月(%) |
| `CPI_YOY_FOOD` | CPI:食品类:当期同比:月(%) |
| `CPI_YOY_JTTX` | CPI:交通和通信类:当期同比:月(%) |
| `CPI_YOY_JYWY` | CPI:教育文化和娱乐类:当期同比:月(%) |
| `CPI_YOY_JZ` | CPI:居住类:当期同比:月(%) |
| `CPI_YOY_NON_FOOD` | CPI:非食品类:当期同比:月(%) |
| `CPI_YOY_OTHER` | CPI:其他用品和服务类:当期同比:月(%) |
| `CPI_YOY_SHYP` | CPI:生活用品及服务类:当期同比:月(%) |
| `CPI_YOY_SPYJ` | CPI:食品烟酒类:当期同比:月(%) |
| `CPI_YOY_YLBJ` | CPI:医疗保健类:当期同比:月(%) |
| `CPI_YOY_YZ` | CPI:衣着类:当期同比:月(%) |
| `PPIRM_MOM` | 工业生产者购进价格指数PPIRM:环比:月(%) |
| `PPIRM_MOM_AGRICULTURE` | 工业生产者购进价格指数PPIRM:农副产品类:环比:月(%) |
| `PPIRM_MOM_BLACK_METAL` | 工业生产者购进价格指数PPIRM:黑色金属材料类:环比:月(%) |
| `PPIRM_MOM_BUILDING` | 工业生产者购进价格指数PPIRM:建筑材料类:环比:月(%) |
| `PPIRM_MOM_CHEMICAL_METAL` | 工业生产者购进价格指数PPIRM:化工原料类:环比:月(%) |
| `PPIRM_MOM_FUEL` | 工业生产者购进价格指数PPIRM:燃料、动力类:环比:月(%) |
| `PPIRM_MOM_INDUSTRIAL` | 工业生产者购进价格指数PPIRM:其他工业原材料及半成品类:环比:月(%) |
| `PPIRM_MOM_NONFERROUS_METAL` | 工业生产者购进价格指数PPIRM:有色金属材料类:环比:月(%) |
| `PPIRM_MOM_TEXTILE` | 工业生产者购进价格指数PPIRM:纺织原料类:环比:月(%) |
| `PPIRM_MOM_TIMBER` | 工业生产者购进价格指数PPIRM:木材及纸浆类:环比:月(%) |
| `PPIRM_YOY` | 工业生产者购进价格指数PPIRM:当期同比:月(%) |
| `PPIRM_YOY_AGRICULTURE` | 工业生产者购进价格指数PPIRM:农副产品类:当期同比:月(%) |
| `PPIRM_YOY_BLACK_METAL` | 工业生产者购进价格指数PPIRM:黑色金属材料类:当期同比:月(%) |
| `PPIRM_YOY_BUILDING` | 工业生产者购进价格指数PPIRM:建筑材料类:当期同比:月(%) |
| `PPIRM_YOY_CHEMICAL_METAL` | 工业生产者购进价格指数PPIRM:化工原料类:当期同比:月(%) |
| `PPIRM_YOY_FUEL` | 工业生产者购进价格指数PPIRM:燃料、动力类:当期同比:月(%) |
| `PPIRM_YOY_INDUSTRIAL` | 工业生产者购进价格指数PPIRM:其他工业原材料及半成品类:当期同比:月(%) |
| `PPIRM_YOY_NONFERROUS_METAL` | 工业生产者购进价格指数PPIRM:有色金属材料类:当期同比:月(%) |
| `PPIRM_YOY_TEXTILE` | 工业生产者购进价格指数PPIRM:纺织原料类:当期同比:月(%) |
| `PPIRM_YOY_TIMBER` | 工业生产者购进价格指数PPIRM:木材及纸浆类:当期同比:月(%) |
| `PPI_YOY` | PPI:当期同比:月(%) |
| `PPI_YOY_CONSUM` | PPI:耐用消费品类:当期同比:月(%) |
| `PPI_YOY_FOOD` | PPI:食品类:当期同比:月(%) |
| `PPI_YOY_LIVE` | PPI:生活资料:当期同比:月(%) |
| `PPI_YOY_PRODUCE` | PPI:生产资料:当期同比:月(%) |
| `PPI_YOY_USE` | PPI:一般日用品类:当期同比:月(%) |
| `PPI_YOY_WEAR` | PPI:衣着类:当期同比:月(%) |
| `PRICE_SCISSORS_CPI_PPI` | CPI-PPI:当期同比:月(%) |
| `PRICE_SCISSORS_CPI_PPI_FOOD` | CPI-PPI:食品类:当期同比:月(%) |
| `PRICE_SCISSORS_PPI_PPIRM` | PPI-PPIRM:当期同比:月(%) |

## PMI（GDP供给指标）

| 字段 | 说明 |
| ---- | ---- |
| `PMI_COMPREHENSIVE_CCZS` | 综合PMI:产出指数:季调:月 |
| `PMI_COMPREHENSIVE_CCZS_MOM` | 综合PMI:产出指数:季调:环比:月(%) |
| `PMI_ENDDATE` | PMI指标截止日期 |
| `PMI_INFOPUBLDATE` | PMI指标发布日期 |
| `PMI_MANU` | 制造业PMI:季调:月 |
| `PMI_MANU_CUR_YOY` | 制造业PMI:当期同比:月(%) |
| `PMI_MANU_IMPORT` | 制造业PMI:进口:季调:月 |
| `PMI_MANU_MOM` | 制造业PMI:季调:环比:月(%) |
| `PMI_MANU_ORDER_EXPORT` | 制造业PMI:新出口订单:季调:月 |
| `PMI_MANU_ORDER_INHAND` | 制造业PMI:在手订单:季调:月 |
| `PMI_MANU_ORDER_NEW` | 制造业PMI:新订单:季调:月 |
| `PMI_MANU_PRODUCE` | 制造业PMI:生产:季调:月 |
| `PMI_MANU_PRODUCT_INVENTORY` | 制造业PMI:产成品库存:季调:月 |
| `PMI_MANU_PURCHASE` | 制造业PMI:采购量:季调:月 |
| `PMI_MANU_RAWMATERIAL_INVENTORY` | 制造业PMI:原材料库存:季调:月 |
| `PMI_MANU_RAWMATERIAL_PURCHASE` | 制造业PMI:主要原材料购进价格:季调:月 |
| `PMI_NON_MANU_BUSINESS_ACTIVITY` | 非制造业PMI:商务活动:季调:月 |
| `PMI_NON_MANU_MATERIAL_PRICE` | 非制造业PMI:投入品价格:季调:月 |
| `PMI_NON_MANU_ORDER_EXPORT` | 非制造业PMI:新出口订单:季调:月 |
| `PMI_NON_MANU_ORDER_NEW` | 非制造业PMI:新订单:季调:月 |

## 工业企业利润（GDP供给指标）

| 字段 | 说明 |
| ---- | ---- |
| `ENTERPRISE_PROFIT_CUM` | 规模以上工业企业利润总额:累计值:月 |
| `ENTERPRISE_PROFIT_CUM_YOY` | 规模以上工业企业利润总额:累计同比:月(%) |
| `ENTERPRISE_PROFIT_CUM_YOY_CHEMICAL` | 规模以上工业企业利润总额:化学原料和化学制品制造业:累计同比:月(%) |
| `ENTERPRISE_PROFIT_CUM_YOY_COAL` | 规模以上工业企业利润总额:煤炭开采和洗选业:累计同比:月(%) |
| `ENTERPRISE_PROFIT_CUM_YOY_COMMON_EQUIP` | 规模以上工业企业利润总额:通用设备制造业:累计同比:月(%) |
| `ENTERPRISE_PROFIT_CUM_YOY_DEDICATED_EQUIP` | 规模以上工业企业利润总额:专用设备制造业:累计同比:月(%) |
| `ENTERPRISE_PROFIT_CUM_YOY_ELECTRIC` | 规模以上工业企业利润总额:电力、热力生产和供应业:累计同比:月(%) |
| `ENTERPRISE_PROFIT_CUM_YOY_ELECTRIC_EQUIP` | 规模以上工业企业利润总额:电气机械和器材制造业:累计同比:月(%) |
| `ENTERPRISE_PROFIT_CUM_YOY_FOOD` | 规模以上工业企业利润总额:食品制造业:累计同比:月(%) |
| `ENTERPRISE_PROFIT_CUM_YOY_FURNITURE` | 规模以上工业企业利润总额:家具制造业:累计同比:月(%) |
| `ENTERPRISE_PROFIT_CUM_YOY_INSTRUMENTATION` | 规模以上工业企业利润总额:仪器仪表制造业:累计同比:月(%) |
| `ENTERPRISE_PROFIT_CUM_YOY_MEDICINE` | 规模以上工业企业利润总额:医药制造业:累计同比:月(%) |
| `ENTERPRISE_PROFIT_CUM_YOY_METAL` | 规模以上工业企业利润总额:有色金属冶炼和压延加工业:累计同比:月(%) |
| `ENTERPRISE_PROFIT_CUM_YOY_OIL` | 规模以上工业企业利润总额:石油和天然气开采业:累计同比:月(%) |
| `ENTERPRISE_PROFIT_CUM_YOY_PLASTIC` | 规模以上工业企业利润总额:橡胶和塑料制品业:累计同比:月(%) |
| `PROFIT_ENDDATE` | 工业企业利润指标截止日期 |
| `PROFIT_INFOPUBLDATE` | 工业企业利润指标发布日期 |

## 工业增加值（GDP供给指标）

| 字段 | 说明 |
| ---- | ---- |
| `IAV_CUM_YOY` | 规模以上工业增加值:累计同比:月(%) |
| `IAV_CUM_YOY_AGIRICULTURE` | 规模以上工业增加值:农副食品加工业:累计同比:月(%) |
| `IAV_CUM_YOY_BLACK_METAL` | 规模以上工业增加值:黑色金属冶炼和压延加工业:累计同比:月(%) |
| `IAV_CUM_YOY_CAR` | 规模以上工业增加值:汽车制造业:累计同比:月(%) |
| `IAV_CUM_YOY_CHEMICAL` | 规模以上工业增加值:化学原料和化学制品制造业:累计同比:月(%) |
| `IAV_CUM_YOY_COAL` | 规模以上工业增加值:煤炭开采和洗选业:累计同比:月(%) |
| `IAV_CUM_YOY_COMMON_EQUIP` | 规模以上工业增加值:通用设备制造业:累计同比:月(%) |
| `IAV_CUM_YOY_DEDICATED_EQUIP` | 规模以上工业增加值:专用设备制造业:累计同比:月(%) |
| `IAV_CUM_YOY_ELECTRIC` | 规模以上工业增加值:电力、热力生产和供应业:累计同比:月(%) |
| `IAV_CUM_YOY_ELECTRIC_EQUIP` | 规模以上工业增加值:电气机械和器材制造业:累计同比:月(%) |
| `IAV_CUM_YOY_FOOD` | 规模以上工业增加值:食品制造业:累计同比:月(%) |
| `IAV_CUM_YOY_HIGH_TEC` | 规模以上工业增加值:高技术制造业:累计同比:月(%) |
| `IAV_CUM_YOY_MEDICINE` | 规模以上工业增加值:医药制造业:累计同比:月(%) |
| `IAV_CUM_YOY_METAL_PRODUCTS` | 规模以上工业增加值:金属制品业:累计同比:月(%) |
| `IAV_CUM_YOY_MINING` | 规模以上工业增加值:采矿业:累计同比:月(%) |
| `IAV_CUM_YOY_NONFERROUS_METAL` | 规模以上工业增加值:有色金属冶炼和压延加工业:累计同比:月(%) |
| `IAV_CUM_YOY_NON_MENTAL` | 规模以上工业增加值:非金属矿物制品业:累计同比:月(%) |
| `IAV_CUM_YOY_OIL` | 规模以上工业增加值:石油和天然气开采业:累计同比:月(%) |
| `IAV_CUM_YOY_PLASTIC` | 规模以上工业增加值:橡胶和塑料制品业:累计同比:月(%) |
| `IAV_CUM_YOY_RAILWAY` | 规模以上工业增加值:铁路、船舶、航空航天和其他运输设备制造业:累计同比:月(%) |
| `IAV_CUM_YOY_TEXTILE` | 规模以上工业增加值:纺织业:累计同比:月(%) |
| `IAV_CUM_YOY_TMT` | 规模以上工业增加值:计算机、通信和其他电子设备制造业:累计同比:月(%) |
| `IAV_CUM_YOY_WINE` | 规模以上工业增加值:酒、饮料和精制茶制造业:累计同比:月(%) |
| `VALUEADDED_ENDDATE` | 工业增加值指标截止日期 |
| `VALUEADDED_INFOPUBLDATE` | 工业增加值指标发布日期 |

## 消费（GDP需求指标）

| 字段 | 说明 |
| ---- | ---- |
| `CONSUMPTION_ENDDATE` | 消费指标截止日期 |
| `CONSUMPTION_INFOPUBLDATE` | 消费指标发布日期 |
| `CONSUMP_CAR_CUM` | 限额以上单位商品零售总额:汽车类:累计值:月(亿) |
| `CONSUMP_CAR_CUM_YOY` | 限额以上单位商品零售总额:汽车类:累计同比:月(%) |
| `CONSUMP_COSMETIC_CUM` | 限额以上单位商品零售总额:化妆品类:累计值:月(亿) |
| `CONSUMP_COSMETIC_CUM_YOY` | 限额以上单位商品零售总额:化妆品类:累计同比:月(%) |
| `CONSUMP_CUM` | 社会消费品零售总额:累计值:月(亿) |
| `CONSUMP_CUM_YOY` | 社会消费品零售总额:累计同比:月(%) |
| `CONSUMP_CUR` | 社会消费品零售总额:当期值:月(亿) |
| `CONSUMP_CUR_MOM` | 社会消费品零售总额:环比:月(%) |
| `CONSUMP_CUR_YOY` | 社会消费品零售总额:当期同比:月(%) |
| `CONSUMP_DECORATE_CUM` | 限额以上单位商品零售总额:建筑及装潢材料类:累计值:月(亿) |
| `CONSUMP_DECORATE_CUM_YOY` | 限额以上单位商品零售总额:建筑及装潢材料类:累计同比:月(%) |
| `CONSUMP_ENTERTAIN_CUM` | 限额以上单位商品零售总额:体育、娱乐用品类:累计值:月(亿) |
| `CONSUMP_ENTERTAIN_CUM_YOY` | 限额以上单位商品零售总额:体育、娱乐用品类:累计同比:月(%) |
| `CONSUMP_FURNITURE_CUM` | 限额以上单位商品零售总额:家具类:累计值:月(亿) |
| `CONSUMP_FURNITURE_CUM_YOY` | 限额以上单位商品零售总额:家具类:累计同比:月(%) |
| `CONSUMP_JEWELRY_CUM` | 限额以上单位商品零售总额:金银珠宝类:累计值:月(亿) |
| `CONSUMP_JEWELRY_CUM_YOY` | 限额以上单位商品零售总额:金银珠宝类:累计同比:月(%) |
| `CONSUMP_MAGZINE_CUM` | 限额以上单位商品零售总额:书报杂志类:累计值:月(亿) |
| `CONSUMP_MAGZINE_CUM_YOY` | 限额以上单位商品零售总额:书报杂志类:累计同比:月(%) |
| `CONSUMP_MEDISN_CUM` | 限额以上单位商品零售总额:中西药品类:累计值:月(亿) |
| `CONSUMP_MEDISN_CUM_YOY` | 限额以上单位商品零售总额:中西药品类:累计同比:月(%) |
| `CONSUMP_OFFICE_CUM` | 限额以上单位商品零售总额:文化办公用品类:累计值:月(亿) |
| `CONSUMP_OFFICE_CUM_YOY` | 限额以上单位商品零售总额:文化办公用品类:累计同比:月(%) |
| `CONSUMP_OIL_CUM` | 限额以上单位商品零售总额:石油及制品类:累计值:月(亿) |
| `CONSUMP_OIL_CUM_YOY` | 限额以上单位商品零售总额:石油及制品类:累计同比:月(%) |
| `CONSUMP_PHONE_CUM` | 限额以上单位商品零售总额:通讯器材类:累计值:月(亿) |
| `CONSUMP_PHONE_CUM_YOY` | 限额以上单位商品零售总额:通讯器材类:累计同比:月(%) |
| `CONSUMP_TELEVISION_CUM` | 限额以上单位商品零售总额:家用电器和音像器材类:累计值:月(亿) |
| `CONSUMP_TELEVISION_CUM_YOY` | 限额以上单位商品零售总额:家用电器和音像器材类:累计同比:月(%) |

## 投资（GDP需求指标）

| 字段 | 说明 |
| ---- | ---- |
| `INVEST_ENDDATE` | 投资指标截止日期 |
| `INVEST_INFOPUBLDATE` | 投资指标发布日期 |
| `INV_INFRA_COM_MACHINE_CUM_YOY` | 固定资产投资额:通用设备制造业:累计同比:月(%) |
| `INV_INFRA_CUM_YOY` | 民间固定资产投资额:基础设施:累计同比:月(%) |
| `INV_INFRA_INFO_TRANS_CUM_YOY` | 固定资产投资额:信息传输业:累计同比:月(%) |
| `INV_INFRA_ROAD_TRANS_CUM_YOY` | 固定资产投资额:道路运输业:累计同比:月(%) |
| `INV_INFRA_SMELT_CUM_YOY` | 固定资产投资额:黑色金属冶炼及压延加工业:累计同比:月(%) |
| `INV_MANU_CAR_CUM_YOY` | 民间固定资产投资额:汽车制造业:累计同比:月(%) |
| `INV_MANU_CUM_YOY` | 民间固定资产投资额:制造业:累计同比:月(%) |
| `INV_MANU_DEDIC_MACHINE_CUM_YOY` | 民间固定资产投资额:专用设备制造业:累计同比:月(%) |
| `INV_MANU_ELECTRICAL_CUM_YOY` | 民间固定资产投资额:电气机械和器材制造业:累计同比:月(%) |
| `INV_MANU_RAIL_CUM_YOY` | 民间固定资产投资额:铁路、船舶、航空航天和其他运输设备制造业:累计同比:月(%) |
| `INV_MANU_TMT_CUM_YOY` | 民间固定资产投资额:计算机、通信和其他电子设备制造业:累计同比:月(%) |
| `INV_REALESTATE_AMT_COMPLETE_CUM` | 房地产开发投资完成额:累计值:月 |
| `INV_REALESTATE_AMT_COMPLETE_CUM_YOY` | 房地产开发投资完成额:累计同比:月(%) |
| `INV_REALESTATE_AMT_CUR` | 房地产开发投资额:当期值:月 |
| `INV_REALESTATE_AMT_CUR_MOM` | 房地产开发投资额:环比:月(%) |
| `INV_REALESTATE_AMT_CUR_YOY` | 房地产开发投资额:当期同比:月(%) |
| `INV_REALESTATE_AMT_TOTAL_CUM` | 房地产开发投资总额:累计值:月 |
| `INV_REALESTATE_AMT_TOTAL_CUM_YOY` | 房地产开发投资总额:累计同比:月(%) |
| `INV_REALESTATE_CAP_DEPOSIT_CUM` | 房地产开发投资额:按资金来源:定金及预收款:累计值:月 |
| `INV_REALESTATE_CAP_DEPOSIT_CUM_YOY` | 房地产开发投资额:按资金来源:定金及预收款:累计同比:月(%) |
| `INV_REALESTATE_CAP_FOREIGN_CUM` | 房地产开发投资额:按资金来源:利用外资:累计值:月 |
| `INV_REALESTATE_CAP_FOREIGN_CUM_YOY` | 房地产开发投资额:按资金来源:利用外资:累计同比:月(%) |
| `INV_REALESTATE_CAP_LOAN_CUM` | 房地产开发投资额:按资金来源:国内贷款:累计值:月 |
| `INV_REALESTATE_CAP_LOAN_CUM_YOY` | 房地产开发投资额:按资金来源:国内贷款:累计同比:月(%) |
| `INV_REALESTATE_CAP_OTHER_CUM` | 房地产开发投资额:按资金来源:其他资金:累计值:月 |
| `INV_REALESTATE_CAP_OTHER_CUM_YOY` | 房地产开发投资额:按资金来源:其他资金:累计同比:月(%) |
| `INV_REALESTATE_CAP_SELF_CUM` | 房地产开发投资额:按资金来源:自筹资金:累计值:月 |
| `INV_REALESTATE_CAP_SELF_CUM_YOY` | 房地产开发投资额:按资金来源:自筹资金:累计同比:月(%) |
| `INV_REALESTATE_COMPLETE_CUM` | 房屋竣工面积:累计值:月 |
| `INV_REALESTATE_COMPLETE_CUM_YOY` | 房屋竣工面积:累计同比:月(%) |
| `INV_REALESTATE_FORSALE` | 房屋待售面积:月 |
| `INV_REALESTATE_FORSALE_YOY` | 房屋待售面积:同比:月(%) |
| `INV_REALESTATE_INCONSTRU_CUM` | 房屋施工面积:累计值:月 |
| `INV_REALESTATE_INCONSTRU_CUM_YOY` | 房屋施工面积:累计同比:月(%) |
| `INV_REALESTATE_NEW_CUM` | 房屋新开工面积:累计值:月 |
| `INV_REALESTATE_NEW_CUM_YOY` | 房屋新开工面积:累计同比:月(%) |
| `INV_REALESTATE_REVENUE_CUM` | 房屋销售额:累计值:月 |
| `INV_REALESTATE_REVENUE_CUM_YOY` | 房屋销售额:累计同比:月(%) |
| `INV_REALESTATE_SALED_CUM` | 房屋销售面积:累计值:月 |
| `INV_REALESTATE_SALED_CUM_YOY` | 房屋销售面积:累计同比:月(%) |
| `INV_REALESTATE_SALED_CUR` | 房屋销售面积:当期值:月 |
| `INV_REALESTATE_SALED_CUR_YOY` | 房屋销售面积:当期同比:月(%) |

## 融资（货币需求指标）

| 字段 | 说明 |
| ---- | ---- |
| `FINANCING_ENDDATE` | 社融指标截止日期 |
| `FINANCING_INFOPUBLDATE` | 社融指标发布日期 |
| `SR_INC` | 社会融资规模增量:累计值:月 |
| `SR_INC_ABS` | 社会融资规模增量:存款类金融机构资产支持证券:月 |
| `SR_INC_BOND` | 社会融资规模增量:企业债券:月 |
| `SR_INC_ENTRUSTED_LOAN` | 社会融资规模增量:委托贷款:月 |
| `SR_INC_FOREIGN_LOAN` | 社会融资规模增量:外币贷款(折合人民币):月 |
| `SR_INC_GOVERN_BOND` | 社会融资规模增量:政府债券:月 |
| `SR_INC_LOAN` | 社会融资规模增量:人民币贷款:月 |
| `SR_INC_LOAN_WRITEOFF` | 社会融资规模增量:贷款核销:月 |
| `SR_INC_STOCK` | 社会融资规模增量:非金融企业境内股票融资:月 |
| `SR_INC_TRUST` | 社会融资规模增量:信托贷款:月 |
| `SR_INC_UNDISCOUNTED_BANK_ACCEPTANCE` | 社会融资规模增量:未贴现银行承兑汇票:月 |
| `SR_INC_YOY` | 社会融资规模增量:累计同比:月(%) |
| `SR_INC_YOY_ABS` | 社会融资规模增量:存款类金融机构资产支持证券:同比:月(%) |
| `SR_INC_YOY_BOND` | 社会融资规模增量:企业债券:同比:月(%) |
| `SR_INC_YOY_ENTRUSTED_LOAN` | 社会融资规模增量:委托贷款:同比:月(%) |
| `SR_INC_YOY_FOREIGN_LOAN` | 社会融资规模增量:外币贷款(折合人民币):同比:月(%) |
| `SR_INC_YOY_GOVERN_BOND` | 社会融资规模增量:政府债券:同比:月(%) |
| `SR_INC_YOY_LOAN` | 社会融资规模增量:人民币贷款:同比:月(%) |
| `SR_INC_YOY_LOAN_WRITEOFF` | 社会融资规模增量:贷款核销:同比:月(%) |
| `SR_INC_YOY_STOCK` | 社会融资规模增量:非金融企业境内股票融资:同比:月(%) |
| `SR_INC_YOY_TRUST` | 社会融资规模增量:信托贷款:同比:月(%) |
| `SR_INC_YOY_UNDISCOUNTED_BANK_ACCEPTANCE` | 社会融资规模增量:未贴现银行承兑汇票:同比:月(%) |
| `SR_SIZE` | 社会融资规模存量:月 |
| `SR_SIZE_ABS` | 社会融资规模存量:存款类金融机构资产支持证券:月 |
| `SR_SIZE_BOND` | 社会融资规模存量:企业债券:月 |
| `SR_SIZE_ENTRUSTED_LOAN` | 社会融资规模存量:委托贷款:月 |
| `SR_SIZE_FOREIGN_LOAN` | 社会融资规模存量:外币贷款(折合人民币):月 |
| `SR_SIZE_GOVERN_BOND` | 社会融资规模存量:政府债券:月 |
| `SR_SIZE_LOAN` | 社会融资规模存量:人民币贷款:月 |
| `SR_SIZE_LOAN_WRITEOFF` | 社会融资规模存量:贷款核销:月 |
| `SR_SIZE_STOCK` | 社会融资规模存量:非金融企业境内股票融资:月 |
| `SR_SIZE_TRUST` | 社会融资规模存量:信托贷款:月 |
| `SR_SIZE_UNDISCOUNTED_BANK_ACCEPTANCE` | 社会融资规模存量:未贴现银行承兑汇票:月 |
| `SR_SIZE_YOY` | 社会融资规模存量:同比:月(%) |
| `SR_SIZE_YOY_ABS` | 社会融资规模存量:存款类金融机构资产支持证券:同比:月(%) |
| `SR_SIZE_YOY_BOND` | 社会融资规模存量:企业债券:同比:月(%) |
| `SR_SIZE_YOY_ENTRUSTED_LOAN` | 社会融资规模存量:委托贷款:同比:月(%) |
| `SR_SIZE_YOY_FOREIGN_LOAN` | 社会融资规模存量:外币贷款(折合人民币):同比:月(%) |
| `SR_SIZE_YOY_GOVERN_BOND` | 社会融资规模存量:政府债券:同比:月(%) |
| `SR_SIZE_YOY_LOAN` | 社会融资规模存量:人民币贷款:同比:月(%) |
| `SR_SIZE_YOY_LOAN_WRITEOFF` | 社会融资规模存量:贷款核销:同比:月(%) |
| `SR_SIZE_YOY_STOCK` | 社会融资规模存量:非金融企业境内股票融资:同比:月(%) |
| `SR_SIZE_YOY_TRUST` | 社会融资规模存量:信托贷款:同比:月(%) |
| `SR_SIZE_YOY_UNDISCOUNTED_BANK_ACCEPTANCE` | 社会融资规模存量:未贴现银行承兑汇票:同比:月(%) |

## 货币供应量（货币供给指标）

| 字段 | 说明 |
| ---- | ---- |
| `FUNDQUANTITY_ENDDATE` | 货币供给量指标截止日期 |
| `FUNDQUANTITY_INFOPUBLDATE` | 货币供给量指标发布日期 |
| `M0` | 流通中现金(M0):月(亿) |
| `M0_YOY` | 流通中现金(M0):同比:月(%) |
| `M1` | 狭义货币供应量(M1):月(亿) |
| `M1_YOY` | 狭义货币供应量(M1):同比:月(%) |
| `M2` | 货币和准货币(M2):月(亿) |
| `M2_YOY` | 货币和准货币(M2):同比:月(%) |
| `SCISSORS_M1_M2` | M1-M2剪刀差:月(%) |
| `SCISSORS_M1_M2_MOM` | M1-M2剪刀差:环比:月(%) |

## 利率（货币供给指标）

| 字段 | 说明 |
| ---- | ---- |
| `FDR001` | 银行间回购定盘利率:FDR001:日 |
| `FDR007` | 银行间回购定盘利率:FDR007:日 |
| `FDR014` | 银行间回购定盘利率:FDR014:日 |
| `FR001` | 银行间回购定盘利率:FR001:日 |
| `FR007` | 银行间回购定盘利率:FR007:日 |
| `FR014` | 银行间回购定盘利率:FR014:日 |
| `FUNDCOST_ENDDATE` | 货币供给利率指标截止日期 |
| `FUNDCOST_INFOPUBLDATE` | 货币供给利率指标发布日期 |
| `GC001` | 债券回购加权平均:质押式回购:GC001:上海证券交易所:日 |
| `GC007` | 债券回购加权平均:质押式回购:GC007:上海证券交易所:日 |
| `GC014` | 债券回购加权平均:质押式回购:GC014:上海证券交易所:日 |
| `R001` | 质押式回购:深圳证券交易所:R-001:日 |
| `R002` | 质押式回购:深圳证券交易所:R-002:日 |
| `R003` | 质押式回购:深圳证券交易所:R-003:日 |
| `R004` | 质押式回购:深圳证券交易所:R-004:日 |
| `R007` | 质押式回购:深圳证券交易所:R-007:日 |
| `R014` | 质押式回购:深圳证券交易所:R-014:日 |
| `R028` | 质押式回购:深圳证券交易所:R-028:日 |
| `R091` | 质押式回购:深圳证券交易所:R-091:日 |
| `R182` | 质押式回购:深圳证券交易所:R-182:日 |
| `SHIBOR_1M` | SHIBOR:1个月:日 |
| `SHIBOR_1W` | SHIBOR:1周:日 |
| `SHIBOR_1Y` | SHIBOR:1年:日 |
| `SHIBOR_2W` | SHIBOR:2周:日 |
| `SHIBOR_3M` | SHIBOR:3个月:日 |
| `SHIBOR_6M` | SHIBOR:6个月:日 |
| `SHIBOR_9M` | SHIBOR:9个月:日 |
| `SHIBOR_OVERNIGHT` | SHIBOR:隔夜:日 |

## 国债收益率曲线（货币供给指标）

| 字段 | 说明 |
| ---- | ---- |
| `YTM_END_DATE` | 国债收益率:截止日期 |
| `YTM_INFO_DATE` | 国债收益率:发布日期 |
| `YTM_YIELD_6M` | 银行间国债收益率曲线:6月:日(%) |
| `YTM_YIELD_1Y` | 银行间国债收益率曲线:1年:日(%) |
| `YTM_YIELD_2Y` | 银行间国债收益率曲线:2年:日(%) |
| `YTM_YIELD_3Y` | 银行间国债收益率曲线:3年:日(%) |
| `YTM_YIELD_4Y` | 银行间国债收益率曲线:4年:日(%) |
| `YTM_YIELD_5Y` | 银行间国债收益率曲线:5年:日(%) |
| `YTM_YIELD_6Y` | 银行间国债收益率曲线:6年:日(%) |
| `YTM_YIELD_7Y` | 银行间国债收益率曲线:7年:日(%) |
| `YTM_YIELD_8Y` | 银行间国债收益率曲线:8年:日(%) |
| `YTM_YIELD_10Y` | 银行间国债收益率曲线:10年:日(%) |
| `YTM_YIELD_15Y` | 银行间国债收益率曲线:15年:日(%) |
| `YTM_YIELD_20Y` | 银行间国债收益率曲线:20年:日(%) |
| `YTM_YIELD_30Y` | 银行间国债收益率曲线:30年:日(%) |

## 公开市场操作 MLF（货币供给指标）

| 字段 | 说明 |
| ---- | ---- |
| `MLF_END_DATE` | MLF:截止日期 |
| `MLF_INFO_DATE` | MLF:发布日期 |
| `MLF_MLF_OPERATION_3M` | 中期借贷便利(MLF):操作金额:3个月:当期值:月(亿元) |
| `MLF_MLF_OPERATION_6M` | 中期借贷便利(MLF):操作金额:6个月:当期值:月(亿元) |
| `MLF_MLF_OPERATION_1Y` | 中期借贷便利(MLF):操作金额:1年:当期值:月(亿元) |
| `MLF_MLF_OPERATION_TOTAL` | 中期借贷便利(MLF):操作金额:当期值:月(亿元) |
| `MLF_MLF_BALANCE_MONTH` | 中期借贷便利(MLF):月末余额:月(亿元) |
| `MLF_MLF_DUE` | 中期借贷便利(MLF):到期量:月(亿元) |
| `MLF_MLF_NET_INJECTION` | 中期借贷便利(MLF):净投放:月(亿元) |

## 进出口（GDP需求指标）

| 字段 | 说明 |
| ---- | ---- |
| `EXP_END_DATE` | 储备:截止日期 |
| `EXP_INFO_DATE` | 储备:发布日期 |
| `EXP_BALANCE_GOODS_SUM_CUM` | 国际货物贸易差额(以人民币计):累计值:月(亿元) |
| `EXP_BAL_GOODS_SVC_SUM_CUM` | 国际货物及服务贸易差额:累计值:月(亿美元) |
| `EXP_BAL_SVC_SUM_CUM` | 国际服务贸易差额(以人民币计):累计值:月(亿元) |
| `EXP_BAL_SVC_SUM_CUM_BUILD` | 国际服务贸易差额(以人民币计):建筑:累计值:月(亿元) |
| `EXP_BAL_SVC_SUM_CUM_FIN` | 国际服务贸易差额(以人民币计):金融服务:累计值:月(亿元) |
| `EXP_BAL_SVC_SUM_CUM_GOV` | 国际服务贸易差额(以人民币计):别处未提及的政府服务:累计值:月(亿元) |
| `EXP_BAL_SVC_SUM_CUM_IP` | 国际服务贸易差额(以人民币计):知识产权使用费:累计值:月(亿元) |
| `EXP_BAL_SVC_SUM_CUM_OTHER` | 国际服务贸易差额(以人民币计):其他商业服务:累计值:月(亿元) |
| `EXP_BAL_SVC_SUM_CUM_PROC` | 国际服务贸易差额(以人民币计):加工服务:累计值:月(亿元) |
| `EXP_BAL_SVC_SUM_CUM_TRANS` | 国际服务贸易差额(以人民币计):运输:累计值:月(亿元) |
| `EXP_BAL_SVC_SUM_CUM_TRAVEL` | 国际服务贸易差额(以人民币计):旅行:累计值:月(亿元) |
| `EXP_EX_RESERVES_MONTHLY` | 外汇储备:月(美元) |
| `EXP_GOLD_RESERVES_MONTHLY` | 黄金储备:月(盎司) |

## 企业景气指数（GDP供给指标）

| 字段 | 说明 |
| ---- | ---- |
| `ENT_END_DATE` | 企业景气指数:截止日期 |
| `ENT_ENT_BOOM_IDX_Q` | 企业景气指数:季 |
| `ENT_ENT_BOOM_IDX_MFG_Q` | 企业景气指数:制造业:季 |
| `ENT_ENT_BOOM_IDX_MINING_Q` | 企业景气指数:采矿业:季 |
| `ENT_BOOM_IDX_CONSTR_Q` | 企业景气指数:建筑业:季 |
| `ENT_BOOM_IDX_HOTEL_Q` | 企业景气指数:住宿和餐饮业:季 |
| `ENT_BOOM_IDX_IT_CS_SOFT_Q` | 企业景气指数:信息传输、计算机服务和软件业:季 |
| `ENT_BOOM_IDX_REALESTATE_Q` | 企业景气指数:房地产业:季 |
| `ENT_BOOM_IDX_TRANS_POST_Q` | 企业景气指数:交通运输、仓储和邮政业:季 |
| `ENT_BOOM_IDX_WS_RTL_Q` | 企业景气指数:批发和零售业:季 |
| `ENT_ENT_CUR_BOOM_IDX_Q` | 企业即期景气指数:季 |
| `ENT_ENT_CUR_BOOM_IDX_MFG_Q` | 企业即期景气指数:制造业:季 |
| `ENT_CUR_BOOM_IDX_CONSTR_Q` | 企业即期景气指数:建筑业:季 |
| `ENT_CUR_BOOM_IDX_CULT_Q` | 企业即期景气指数:文化、体育和娱乐业:季 |
| `ENT_CUR_BOOM_IDX_EDU_Q` | 企业即期景气指数:教育:季 |
| `ENT_CUR_BOOM_IDX_HLTH_Q` | 企业即期景气指数:卫生和社会工作:季 |
| `ENT_CUR_BOOM_IDX_HOTEL_Q` | 企业即期景气指数:住宿和餐饮业:季 |
| `ENT_CUR_BOOM_IDX_IT_SVC_Q` | 企业即期景气指数:信息传输、软件和信息技术服务业:季 |
| `ENT_CUR_BOOM_IDX_LEASE_Q` | 企业即期景气指数:租赁和商务服务业:季 |
| `ENT_CUR_BOOM_IDX_MINING_Q` | 企业即期景气指数:采矿业:季 |
| `ENT_CUR_BOOM_IDX_RE_Q` | 企业即期景气指数:房地产业:季 |
| `ENT_CUR_BOOM_IDX_RSVC_Q` | 企业即期景气指数:居民服务、修理和其他服务业:季 |
| `ENT_CUR_BOOM_IDX_SCITECH_Q` | 企业即期景气指数:科学研究和技术服务业:季 |
| `ENT_CUR_BOOM_IDX_TRANS_POS` | 企业即期景气指数:交通运输、仓储和邮政业:季 |
| `ENT_CUR_BOOM_IDX_UTILITY_Q` | 企业即期景气指数:电力、热力、燃气及水生产和供应业:季 |
| `ENT_CUR_BOOM_IDX_WATER_Q` | 企业即期景气指数:水利、环境和公共设施管理业:季 |
| `ENT_CUR_BOOM_IDX_WS_RETAIL` | 企业即期景气指数:批发和零售业:季 |
| `ENT_ENT_EXP_BOOM_IDX_Q` | 企业预期景气指数:季 |
| `ENT_ENT_EXP_BOOM_IDX_MFG_Q` | 企业预期景气指数:制造业:季 |
| `ENT_EXP_BOOM_IDX_CONSTR_Q` | 企业预期景气指数:建筑业:季 |
| `ENT_EXP_BOOM_IDX_CULT_Q` | 企业预期景气指数:文化、体育和娱乐业:季 |
| `ENT_EXP_BOOM_IDX_EDU_Q` | 企业预期景气指数:教育:季 |
| `ENT_EXP_BOOM_IDX_HLTH_Q` | 企业预期景气指数:卫生和社会工作:季 |
| `ENT_EXP_BOOM_IDX_HOTEL_Q` | 企业预期景气指数:住宿和餐饮业:季 |
| `ENT_EXP_BOOM_IDX_IT_SVC_Q` | 企业预期景气指数:信息传输、软件和信息技术服务业:季 |
| `ENT_EXP_BOOM_IDX_LEASE_Q` | 企业预期景气指数:租赁和商务服务业:季 |
| `ENT_EXP_BOOM_IDX_MINING_Q` | 企业预期景气指数:采矿业:季 |
| `ENT_EXP_BOOM_IDX_RE_Q` | 企业预期景气指数:房地产业:季 |
| `ENT_EXP_BOOM_IDX_RSVC_Q` | 企业预期景气指数:居民服务、修理和其他服务业:季 |
| `ENT_EXP_BOOM_IDX_SCITECH_Q` | 企业预期景气指数:科学研究和技术服务业:季 |
| `ENT_EXP_BOOM_IDX_TRANS_POS` | 企业预期景气指数:交通运输、仓储和邮政业:季 |
| `ENT_EXP_BOOM_IDX_UTILITY_Q` | 企业预期景气指数:电力、热力、燃气及水生产和供应业:季 |
| `ENT_EXP_BOOM_IDX_WATER_Q` | 企业预期景气指数:水利、环境和公共设施管理业:季 |
| `ENT_EXP_BOOM_IDX_WS_RETAIL` | 企业预期景气指数:批发和零售业:季 |
| `ENT_ECON_CUR_BOOM_IDX_Q` | 经济学家即期景气指数:季 |
| `ENT_ECON_EXP_BOOM_IDX_Q` | 经济学家预期景气指数:季 |

## 财政指标（GDP财政指标）

| 字段 | 说明 |
| ---- | ---- |
| `FISCAL_END_DATE` | 一般公共预算:截止日期 |
| `FISCAL_INFO_DATE` | 一般公共预算:发布日期 |
| `FISCAL_BAL` | 财政收支差额:当期值:月(元) |
| `FISCAL_BAL_YOY` | 国家财政收支差额:当期同比:月(%) |
| `FISCAL_BAL_YTD` | 国家财政收支差额:累计值:月(元) |
| `FISCAL_BAL_YTD_YOY` | 国家财政收支差额:累计同比:月(%) |
| `FISCAL_DEFICIT_PRG_YTD` | 公共财政赤字进度:累计值:月(%) |
| `FISCAL_DEFICIT_YTD` | 财政赤字:累计值:月(亿元) |
| `FISCAL_DEFICIT_YTD_YOY` | 财政赤字:累计同比:月(%) |
| `FISCAL_PUB_REV` | 一般公共预算收入:当期值:月(亿元) |
| `FISCAL_PUB_REV_YOY` | 一般公共预算收入:当期同比:月(%) |
| `FISCAL_PUB_REV_YTD` | 一般公共预算收入:累计值:月(亿元) |
| `FISCAL_PUB_REV_YTD_YOY` | 一般公共预算收入:累计同比:月(%) |
| `FISCAL_PUB_EXP` | 一般公共预算支出:当期值:月(亿元) |
| `FISCAL_PUB_EXP_YOY` | 一般公共预算支出:当期同比:月(%) |
| `FISCAL_PUB_EXP_YTD` | 一般公共预算支出:累计值:月(亿元) |
| `FISCAL_PUB_EXP_YTD_YOY` | 一般公共预算支出:累计同比:月(%) |
| `FISCAL_EXP_AGR_YTD` | 一般公共预算支出:农林水事务:累计值:月(亿元) |
| `FISCAL_EXP_AGR_YTD_YOY` | 一般公共预算支出:农林水事务:累计同比:月(%) |
| `FISCAL_EXP_DEBT_YTD` | 一般公共预算支出:债务付息:累计值:月(亿元) |
| `FISCAL_EXP_DEBT_YTD_YOY` | 一般公共预算支出:债务付息:累计同比:月(%) |
| `FISCAL_EXP_EDU_YTD` | 一般公共预算支出:教育:累计值:月(亿元) |
| `FISCAL_EXP_EDU_YTD_YOY` | 一般公共预算支出:教育:累计同比:月(%) |
| `FISCAL_EXP_MED_YTD` | 一般公共预算支出:医疗卫生支出:累计值:月(亿元) |
| `FISCAL_EXP_MED_YTD_YOY` | 一般公共预算支出:医疗卫生支出:累计同比:月(%) |
| `FISCAL_EXP_SS_YTD` | 一般公共预算支出:社会保障和就业:累计值:月(亿元) |
| `FISCAL_EXP_SS_YTD_YOY` | 一般公共预算支出:社会保障和就业:累计同比:月(%) |
| `FISCAL_EXP_TECH_YTD` | 一般公共预算支出:科学技术:累计值:月(亿元) |
| `FISCAL_EXP_TECH_YTD_YOY` | 一般公共预算支出:科学技术:累计同比:月(%) |
| `FISCAL_EXP_TRANS_YTD` | 一般公共预算支出:交通运输:累计值:月(亿元) |
| `FISCAL_EXP_TRANS_YTD_YOY` | 一般公共预算支出:交通运输:累计同比:月(%) |
| `FISCAL_EXP_URB_YTD` | 一般公共预算支出:城乡社区事务:累计值:月(亿元) |
| `FISCAL_EXP_URB_YTD_YOY` | 一般公共预算支出:城乡社区事务:累计同比:月(%) |
| `FISCAL_REV_NTAX_YTD` | 一般公共预算收入:非税收收入:累计值:月(亿元) |
| `FISCAL_REV_NTAX_YTD_YOY` | 全国一般公共预算收入:非税收入:累计同比:月(%) |
| `FISCAL_REV_TAX_YTD` | 一般公共预算收入:税收收入:累计值:月(亿元) |
| `FISCAL_REV_TAX_YTD_YOY` | 一般公共预算收入:税收收入:累计同比:月(%) |
| `FISCAL_REV_TAX_VAT_YTD` | 一般公共预算收入:税收收入:国内增值税:累计值:月(亿元) |
| `FISCAL_REV_TAX_VAT_YTD_YOY` | 一般公共预算收入:税收收入:国内增值税:累计同比:月(%) |
| `FISCAL_REV_TAX_CIT_YTD` | 一般公共预算收入:税收收入:企业所得税:累计值:月(亿元) |
| `FISCAL_REV_TAX_CIT_YTD_YOY` | 一般公共预算收入:税收收入:企业所得税:累计同比:月(%) |
| `FISCAL_REV_TAX_PIT_YTD` | 一般公共预算收入:税收收入:个人所得税:累计值:月(亿元) |
| `FISCAL_REV_TAX_PIT_YTD_YOY` | 一般公共预算收入:税收收入:个人所得税:累计同比:月(%) |
| `FISCAL_REV_TAX_CT_YTD` | 一般公共预算收入:税收收入:国内消费税:累计值:月(亿元) |
| `FISCAL_REV_TAX_CT_YTD_YOY` | 一般公共预算收入:税收收入:国内消费税:累计同比:月(%) |
| `FISCAL_REV_TAX_CUST_YTD` | 一般公共预算收入:税收收入:海关代征增值税和消费税:累计值:月(亿元) |
| `FISCAL_REV_TAX_CUST_YTD_YO` | 一般公共预算收入:税收收入:海关代征增值税和消费税:累计同比:月(%) |
| `FISCAL_REV_TAX_TARIFF_YTD` | 一般公共预算收入:税收收入:关税:累计值:月(亿元) |
| `FISCAL_REV_TAX_TARIFF_YTD_` | 一般公共预算收入:税收收入:关税:累计同比:月(%) |
| `FISCAL_REV_TAX_DEED_YTD` | 一般公共预算收入:税收收入:契税:累计值:月(亿元) |
| `FISCAL_REV_TAX_DEED_YTD_YO` | 一般公共预算收入:税收收入:契税:累计同比:月(%) |
| `FISCAL_REV_TAX_LT_YTD` | 一般公共预算收入:税收收入:土地增值税:累计值:月(亿元) |
| `FISCAL_REV_TAX_LT_YTD_YOY` | 一般公共预算收入:税收收入:土地增值税:累计同比:月(%) |
| `FISCAL_REV_TAX_PROP_YTD` | 一般公共预算收入:税收收入:房产税:累计值:月(亿元) |
| `FISCAL_REV_TAX_PROP_YTD_YO` | 一般公共预算收入:税收收入:房产税:累计同比:月(%) |
| `FISCAL_REV_TAX_RES_YTD` | 一般公共预算收入:税收收入:资源税:累计值:月(亿元) |
| `FISCAL_REV_TAX_RES_YTD_YOY` | 一般公共预算收入:税收收入:资源税:累计同比:月(%) |
| `FISCAL_REV_TAX_SEC_YTD` | 一般公共预算收入:税收收入:证券交易印花税:累计值:月(亿元) |
| `FISCAL_REV_TAX_SEC_YTD_YOY` | 一般公共预算收入:税收收入:证券交易印花税:累计同比:月(%) |
| `FISCAL_FUND_REV_YTD` | 政府性基金预算收入:累计值:月(元) |
| `FISCAL_FUND_REV_YTD_YOY` | 政府性基金预算收入:累计同比:月(%) |
| `FISCAL_FUND_EXP_YTD` | 全国政府性基金支出:累计值:月(亿元) |
| `FISCAL_FUND_EXP_YTD_YOY` | 全国政府性基金支出:累计同比:月(%) |
| `FISCAL_FUND_DEFICIT_YTD` | 政府性基金赤字:累计值:月(亿元) |
| `FISCAL_LGB_ISS` | 地方政府债券发行额:当期值:月(亿元) |
| `FISCAL_LGB_ISS_YTD` | 地方政府债券发行额:累计值:月(亿元) |
| `FISCAL_LGB_GEN_ISS` | 地方政府债券发行额:一般债券:当期值:月(亿元) |
| `FISCAL_LGB_GEN_ISS_YTD` | 地方政府债券发行额:一般债券:累计值:月(亿元) |
| `FISCAL_LGB_SPC_ISS` | 地方政府债券发行额:专项债券:当期值:月(亿元) |
| `FISCAL_LGB_SPC_ISS_YTD` | 地方政府债券发行额:专项债券:累计值:月(亿元) |

## 用电量（GDP供给指标）

| 字段 | 说明 |
| ---- | ---- |
| `POWERUSE_END_DATE` | 发电量:截止日期 |
| `POWERUSE_INFO_DATE` | 发电量:发布日期 |
| `POWERUSE_ELEC` | 全社会用电量:当期值:月(亿千瓦时) |
| `POWERUSE_ELEC_YOY` | 全社会用电量:当期同比:月(%) |
| `POWERUSE_ELEC_YTD` | 全社会用电量:累计值:月(亿千瓦时) |
| `POWERUSE_ELEC_YTD_YOY` | 全社会用电量:累计同比:月(%) |
| `POWERUSE_ELEC_RESID_YOY` | 全社会用电量:城乡居民:当期同比:月(%) |
| `POWERUSE_ELEC_RESID_YTD_YO` | 全社会用电量:城乡居民:累计同比:月(%) |
| `POWERUSE_ELEC_SEC_YOY` | 全社会用电量:第二产业:当期同比:月(%) |
| `POWERUSE_ELEC_SEC_YTD_YOY` | 全社会用电量:第二产业:累计同比:月(%) |
| `POWERUSE_ELEC_TERT_YOY` | 全社会用电量:第三产业:当期同比:月(%) |
| `POWERUSE_ELEC_TERT_YTD_YOY` | 全社会用电量:第三产业:累计同比:月(%) |
| `POWERUSE_ELEC_RATE_HYDRO_Y` | 用电率:水电:累计同比:月(%) |
| `POWERUSE_ELEC_RATE_THERM_Y` | 用电率:火电:累计同比:月(%) |
| `POWERUSE_PWR_SHR_HYDRO` | 发电量比重:水电:当期值:月(%) |
| `POWERUSE_PWR_SHR_HYDRO_YTD` | 发电量比重:水电:累计值:月(%) |
| `POWERUSE_PWR_SHR_THERM` | 发电量比重:火电:当期值:月(%) |
| `POWERUSE_PWR_SHR_THERM_YTD` | 发电量比重:火电:累计值:月(%) |
| `POWERUSE_PWR_SHR_SOLAR` | 发电量比重:太阳能:当期值:月(%) |
| `POWERUSE_PWR_SHR_SOLAR_YTD` | 发电量比重:太阳能:累计值:月(%) |
| `POWERUSE_PWR_SHR_WIND` | 发电量比重:风电:当期值:月(%) |
| `POWERUSE_PWR_SHR_WIND_YTD` | 发电量比重:风电:累计值:月(%) |
| `POWERUSE_UTIL_HR_YTD` | 电力设备平均利用小时:累计值:月(小时) |
| `POWERUSE_UTIL_HR_HYDRO_YTD` | 电力设备平均利用小时:水力发电:累计值:月(小时) |
| `POWERUSE_CRUDE_OUT_YTD` | 原油产量:累计值:月(万吨) |
| `POWERUSE_CRUDE_OUT_YTD_YOY` | 原油产量:累计同比:月(%) |

## 可支配收入（GDP需求指标）

| 字段 | 说明 |
| ---- | ---- |
| `PERCAP_END_DATE` | 人均可支配:截止日期 |
| `PERCAP_INFO_DATE` | 人均可支配:发布日期 |
| `PERCAP_DISP_INC_YOY` | 居民人均可支配收入:当期同比:季(%) |
| `PERCAP_DISP_INC_YTD` | 居民人均可支配收入:累计值:季(元) |
| `PERCAP_DISP_INC_YTD_YOY` | 居民人均可支配收入:累计同比:季(%) |
| `PERCAP_DISP_INC_REAL_YTD_Y` | 居民人均可支配收入:实际累计同比:季(%) |
| `PERCAP_DISP_INC_MED_YTD` | 居民人均可支配收入中位数:累计值:季(元) |
| `PERCAP_DISP_INC_MED_YTD_YO` | 居民人均可支配收入中位数:累计同比:季(%) |
| `PERCAP_DISP_INC_WAGE_YTD_Y` | 居民人均可支配收入:工资性收入:累计同比:季(%) |
| `PERCAP_DISP_INC_BIZ_YTD_YO` | 居民人均可支配收入:经营净收入:累计同比:季(%) |
| `PERCAP_DISP_INC_PROP_YTD_Y` | 居民人均可支配收入:财产净收入:累计同比:季(%) |
| `PERCAP_DISP_INC_TRSF_YTD_Y` | 居民人均可支配收入:转移净收入:累计同比:季(%) |
| `PERCAP_CONS_EXP_YOY` | 居民人均消费支出:当期同比:季(%) |
| `PERCAP_CONS_EXP_YTD` | 居民人均消费支出:累计值:季(元) |
| `PERCAP_CONS_EXP_YTD_YOY` | 居民人均消费支出:累计同比:季(%) |
| `PERCAP_CONS_EXP_REAL_YTD_Y` | 居民人均消费支出:实际累计同比:季(%) |
| `PERCAP_CONS_EXP_FOOD_YTD_Y` | 居民人均消费支出:食品烟酒:累计同比:季(%) |
| `PERCAP_CONS_EXP_CLTH_YTD_Y` | 居民人均消费支出:衣着:累计同比:季(%) |
| `PERCAP_CONS_EXP_HOUS_YTD_Y` | 居民人均消费支出:居住:累计同比:季(%) |
| `PERCAP_CONS_EXP_HH_YTD_YOY` | 居民人均消费支出:生活用品及服务:累计同比:季(%) |
| `PERCAP_CONS_EXP_COMM_YTD_Y` | 居民人均消费支出:交通通信:累计同比:季(%) |
| `PERCAP_CONS_EXP_EDUC_YTD_Y` | 居民人均消费支出:教育文化娱乐:累计同比:季(%) |
| `PERCAP_CONS_EXP_HLTH_YTD_Y` | 居民人均消费支出:医疗保健:累计同比:季(%) |
| `PERCAP_CONS_EXP_OTHR_YTD_Y` | 居民人均消费支出:其他用品和服务:累计同比:季(%) |

## 产能利用率（GDP供给指标）

| 字段 | 说明 |
| ---- | ---- |
| `CAPU_END_DATE` | 工业产能利用率:截止日期 |
| `CAPU_INFO_DATE` | 工业产能利用率:发布日期 |
| `CAPU_CAPU` | 工业产能利用率:当期值:季(%) |
| `CAPU_CAPU_CHG` | 工业产能利用率:当期同比增减量:季(%) |
| `CAPU_CAPU_MFG` | 工业产能利用率:制造业:当期值:季(%) |
| `CAPU_CAPU_MINING` | 工业产能利用率:采矿业:当期值:季(%) |
| `CAPU_CAPU_UTIL` | 工业产能利用率:电力、热力、燃气及水生产和供应业:当期值:季(%) |
| `CAPU_CAPU_COAL` | 工业产能利用率:煤炭开采和洗选业:当期值:季(%) |
| `CAPU_CAPU_COAL_CHG` | 工业产能利用率:煤炭开采和洗选业:当期同比增减量:季(%) |
| `CAPU_CAPU_PETRO` | 工业产能利用率:石油和天然气开采业:当期值:季(%) |
| `CAPU_CAPU_FOOD` | 工业产能利用率:食品制造业:当期值:季(%) |
| `CAPU_CAPU_TEXTL` | 工业产能利用率:纺织业:当期值:季(%) |
| `CAPU_CAPU_CHEM` | 工业产能利用率:化学原料和化学制品制造业:当期值:季(%) |
| `CAPU_CAPU_CHEM_CHG` | 工业产能利用率:化学原料和化学制品制造业:当期同比增减量:季(%) |
| `CAPU_CAPU_FIBER` | 工业产能利用率:化学纤维制造业:当期值:季(%) |
| `CAPU_CAPU_PHARM` | 工业产能利用率:医药制造业:当期值:季(%) |
| `CAPU_CAPU_NMET` | 工业产能利用率:非金属矿物制品业:当期值:季(%) |
| `CAPU_CAPU_NMET_CHG` | 工业产能利用率:非金属矿物制品业:当期同比增减量:季(%) |
| `CAPU_CAPU_FERR` | 工业产能利用率:黑色金属冶炼和压延加工业:当期值:季(%) |
| `CAPU_CAPU_FERR_CHG` | 工业产能利用率:黑色金属冶炼和压延加工业:当期同比增减量:季(%) |
| `CAPU_CAPU_NFERR` | 工业产能利用率:有色金属冶炼和压延加工业:当期值:季(%) |
| `CAPU_CAPU_NFERR_CHG` | 工业产能利用率:有色金属冶炼和压延加工业:当期同比增减量:季(%) |
| `CAPU_CAPU_GNEQ` | 工业产能利用率:通用设备制造业:当期值:季(%) |
| `CAPU_CAPU_SPEQ` | 工业产能利用率:专用设备制造业:当期值:季(%) |
| `CAPU_CAPU_AUTO` | 工业产能利用率:汽车制造业:当期值:季(%) |
| `CAPU_CAPU_AUTO_CHG` | 工业产能利用率:汽车制造业:当期同比增减量:季(%) |
| `CAPU_CAPU_ELEC` | 工业产能利用率:电气机械和器材制造业:当期值:季(%) |
| `CAPU_CAPU_ELEC_CHG` | 工业产能利用率:电气机械和器材制造业:当期同比增减量:季(%) |
| `CAPU_CAPU_ICT` | 工业产能利用率:计算机、通信和其他电子设备制造业:当期值:季(%) |
| `CAPU_CAPU_ICT_CHG` | 工业产能利用率:计算机、通信和其他电子设备制造业:当期同比增减量:季(%) |

## 宏观产量（GDP供给指标）

| 字段 | 说明 |
| ---- | ---- |
| `PROD_END_DATE` | 产量:截止日期 |
| `PROD_INFO_DATE` | 产量:发布日期 |
| `PROD_OUT_COAL_YOY` | 产量:原煤:当期同比:月(%) |
| `PROD_OUT_COAL_YTD_YOY` | 产量:原煤:累计同比:月(%) |
| `PROD_OUT_COKE_YOY` | 产量:焦炭:当期同比:月(%) |
| `PROD_OUT_COKE_YTD_YOY` | 产量:焦炭:累计同比:月(%) |
| `PROD_OUT_NGAS_YOY` | 产量:天然气:当期同比:月(%) |
| `PROD_OUT_NGAS_YTD_YOY` | 产量:天然气:累计同比:月(%) |
| `PROD_OUT_REFINE_YOY` | 产量:原油加工量:当期同比:月(%) |
| `PROD_OUT_REFINE_YTD_YOY` | 产量:原油加工量:累计同比:月(%) |
| `PROD_OUT_GASOL_YOY` | 产量:汽油:当期同比:月(%) |
| `PROD_OUT_DIESEL_YOY` | 产量:柴油:当期同比:月(%) |
| `PROD_OUT_ETHYL_YOY` | 产量:乙烯:当期同比:月(%) |
| `PROD_OUT_ETHYL_YTD_YOY` | 产量:乙烯:累计同比:月(%) |
| `PROD_OUT_NAOH_YOY` | 产量:烧碱:当期同比:月(%) |
| `PROD_OUT_NAOH_YTD_YOY` | 产量:烧碱:累计同比:月(%) |
| `PROD_OUT_FERT_YOY` | 产量:农用氮磷钾化肥(折纯):当期同比:月(%) |
| `PROD_OUT_FERT_YTD_YOY` | 产量:农用氮磷钾化肥(折纯):累计同比:月(%) |
| `PROD_OUT_PEST_YOY` | 产量:化学农药原药:当期同比:月(%) |
| `PROD_OUT_PEST_YTD_YOY` | 产量:化学农药原药:累计同比:月(%) |
| `PROD_OUT_GLASS_YOY` | 产量:平板玻璃:当期同比:月(%) |
| `PROD_OUT_GLASS_YTD_YOY` | 产量:平板玻璃:累计同比:月(%) |
| `PROD_OUT_TGLASS_YOY` | 产量:钢化玻璃:当期同比:月(%) |
| `PROD_OUT_TGLASS_YTD_YOY` | 产量:钢化玻璃:累计同比:月(%) |
| `PROD_OUT_CEMENT_YOY` | 产量:水泥:当期同比:月(%) |
| `PROD_OUT_CEMENT_YTD_YOY` | 产量:水泥:累计同比:月(%) |
| `PROD_OUT_PIGIRON_YOY` | 产量:生铁:当期同比:月(%) |
| `PROD_OUT_PIGIRON_YTD_YOY` | 产量:生铁:累计同比:月(%) |
| `PROD_OUT_CSTEEL_YOY` | 产量:粗钢:当期同比:月(%) |
| `PROD_OUT_CSTEEL_YTD_YOY` | 产量:粗钢:累计同比:月(%) |
| `PROD_OUT_STEEL_YOY` | 产量:成品钢材:当期同比:月(%) |
| `PROD_OUT_STEEL_YTD_YOY` | 产量:成品钢材:累计同比:月(%) |
| `PROD_OUT_REBAR_YOY` | 产量:钢筋:当期同比:月(%) |
| `PROD_OUT_REBAR_YTD_YOY` | 产量:钢筋:累计同比:月(%) |
| `PROD_OUT_COPPER_YOY` | 产量:精炼铜(电解铜):当期同比:月(%) |
| `PROD_OUT_COPPER_YTD_YOY` | 产量:精炼铜(电解铜):累计同比:月(%) |
| `PROD_OUT_ALUM_YOY` | 产量:原铝(电解铝):当期同比:月(%) |
| `PROD_OUT_ALUM_YTD_YOY` | 产量:原铝(电解铝):累计同比:月(%) |
| `PROD_OUT_NFM10_YOY` | 产量:十种有色金属:当期同比:月(%) |
| `PROD_OUT_NFM10_YTD_YOY` | 产量:十种有色金属:累计同比:月(%) |
| `PROD_OUT_AUTO_YOY` | 产量:汽车:当期同比:月(%) |
| `PROD_OUT_AUTO_YTD_YOY` | 产量:汽车:累计同比:月(%) |
| `PROD_OUT_NEV_YOY` | 产量:新能源汽车:当期同比:月(%) |
| `PROD_OUT_NEV_YTD_YOY` | 产量:新能源汽车:累计同比:月(%) |
| `PROD_OUT_EMU_YOY` | 产量:动车组:当期同比:月(%) |
| `PROD_OUT_EMU_YTD_YOY` | 产量:动车组:累计同比:月(%) |
| `PROD_OUT_CNC_YOY` | 产量:数控金属切削机床:当期同比:月(%) |
| `PROD_OUT_CNC_YTD_YOY` | 产量:数控金属切削机床:累计同比:月(%) |
| `PROD_OUT_EXCAV_YOY` | 产量:挖掘机:当期同比:月(%) |
| `PROD_OUT_EXCAV_YTD_YOY` | 产量:挖掘机:累计同比:月(%) |
| `PROD_OUT_PGEN_YOY` | 产量:发电设备:当期同比:月(%) |
| `PROD_OUT_PGEN_YTD_YOY` | 产量:发电设备:累计同比:月(%) |
| `PROD_OUT_ROBOT_YOY` | 产量:工业机器人:当期同比:月(%) |
| `PROD_OUT_ROBOT_YTD_YOY` | 产量:工业机器人:累计同比:月(%) |
| `PROD_OUT_PV_YOY` | 产量:太阳能电池(光伏电池):当期同比:月(%) |
| `PROD_OUT_PV_YTD_YOY` | 产量:太阳能电池(光伏电池):累计同比:月(%) |
| `PROD_OUT_WIND_YOY` | 产量:风电:当期同比:月(%) |
| `PROD_OUT_WIND_YTD_YOY` | 产量:风电:累计同比:月(%) |
| `PROD_OUT_IC_YOY` | 产量:半导体集成电路:当期同比:月(%) |
| `PROD_OUT_IC_YTD_YOY` | 产量:半导体集成电路:累计同比:月(%) |
| `PROD_OUT_PHONE_YOY` | 产量:移动电话机:当期同比:月(%) |
| `PROD_OUT_PHONE_YTD_YOY` | 产量:移动电话机:累计同比:月(%) |
| `PROD_OUT_SMTPH_YOY` | 产量:智能手机:当期同比:月(%) |
| `PROD_OUT_BTS_YOY` | 产量:移动通信基站设备:当期同比:月(%) |
| `PROD_OUT_BTS_YTD_YOY` | 产量:移动通信基站设备:累计同比:月(%) |
| `PROD_OUT_AC_YOY` | 产量:房间空气调节器:当期同比:月(%) |
| `PROD_OUT_AC_YTD_YOY` | 产量:房间空气调节器:累计同比:月(%) |
| `PROD_OUT_FRIDGE_YOY` | 产量:家用电冰箱:当期同比:月(%) |
| `PROD_OUT_FRIDGE_YTD_YOY` | 产量:家用电冰箱:累计同比:月(%) |
| `PROD_OUT_BEER_YOY` | 产量:啤酒:当期同比:月(%) |
| `PROD_OUT_BEER_YTD_YOY` | 产量:啤酒:累计同比:月(%) |
| `PROD_OUT_LIQUOR_YOY` | 产量:白酒:当期同比:月(%) |
| `PROD_OUT_LIQUOR_YTD_YOY` | 产量:白酒:累计同比:月(%) |
| `PROD_OUT_DAIRY_YOY` | 产量:乳制品:当期同比:月(%) |
| `PROD_OUT_DAIRY_YTD_YOY` | 产量:乳制品:累计同比:月(%) |

## 出口交货值（GDP需求指标）

| 字段 | 说明 |
| ---- | ---- |
| `EDV_END_DATE` | 出口交货值:截止日期 |
| `EDV_INFO_DATE` | 出口交货值:发布日期 |
| `EDV_EDV_TEXTL_YTD_YOY` | 出口交货值:纺织业:累计同比:月(%) |
| `EDV_EDV_APRL_YTD_YOY` | 出口交货值:纺织服装、服饰业:累计同比:月(%) |
| `EDV_EDV_FURN_YTD_YOY` | 出口交货值:家具制造业:累计同比:月(%) |
| `EDV_EDV_CULT_YTD_YOY` | 出口交货值:文教、工美、体育和娱乐用品制造业:累计同比:月(%) |
| `EDV_EDV_CHEM_YTD_YOY` | 出口交货值:化学原料和化学制品制造业:累计同比:月(%) |
| `EDV_EDV_PHARM_YTD_YOY` | 出口交货值:医药制造业:累计同比:月(%) |
| `EDV_EDV_RUBPL_YTD_YOY` | 出口交货值:橡胶和塑料制品业:累计同比:月(%) |
| `EDV_EDV_FERR_YTD_YOY` | 出口交货值:黑色金属冶炼和压延加工业:累计同比:月(%) |
| `EDV_EDV_NFERR_YTD_YOY` | 出口交货值:有色金属冶炼和压延加工业:累计同比:月(%) |
| `EDV_EDV_METAL_YTD_YOY` | 出口交货值:金属制品业:累计同比:月(%) |
| `EDV_EDV_GNEQ_YTD_YOY` | 出口交货值:通用设备制造业:累计同比:月(%) |
| `EDV_EDV_SPEQ_YTD_YOY` | 出口交货值:专用设备制造业:累计同比:月(%) |
| `EDV_EDV_AUTO_YTD_YOY` | 出口交货值:汽车制造业:累计同比:月(%) |
| `EDV_EDV_TRANSEQ_YTD_YOY` | 出口交货值:铁路、船舶、航空航天和其他运输设备制造业:累计同比:月(%) |
| `EDV_EDV_ELEC_YTD_YOY` | 出口交货值:电气机械和器材制造业:累计同比:月(%) |
| `EDV_EDV_ICT_YTD_YOY` | 出口交货值:计算机、通信和其他电子设备制造业:累计同比:月(%) |
| `EDV_EDV_INSTR_YTD_YOY` | 出口交货值:仪器仪表制造业:累计同比:月(%) |

## 宏观预测（综合）

| 字段 | 说明 |
| ---- | ---- |
| `FORECAST_END_DATE` | 预测值:截止日期 |
| `FORECAST_INFO_DATE` | 预测值:发布日期 |
| `FORECAST_GDP_FC_YOY` | GDP:预测值:当期同比:季(%) |
| `FORECAST_CPI_FC_YOY` | CPI:预测值:当期同比:月(%) |
| `FORECAST_PPI_FC_YOY` | 生产者价格指数PPI:预测值:当期同比:月(%) |
| `FORECAST_PMI_FC` | 制造业采购经理指数PMI:预测值:当期值:月(%) |
| `FORECAST_M1_FC_YOY` | M1:预测值:当期同比:月(%) |
| `FORECAST_M2_FC_YOY` | M2:预测值:当期同比:月(%) |
| `FORECAST_LOAN_FC_YOY` | 人民币贷款:预测值:当期同比:月(%) |
| `FORECAST_NEW_LOAN_FC` | 新增人民币贷款:预测值:月(元) |
| `FORECAST_TSF_FC` | 社会融资规模:预测值:月(亿元) |
| `FORECAST_FAI_FC_YTD_YOY` | 固定资产投资:预测值:累计同比:月(%) |
| `FORECAST_RETAIL_FC_YOY` | 社会消费品零售总额:预测值:当期同比:月(%) |
| `FORECAST_IND_VA_FC_YOY` | 工业增加值:预测值:当期同比:月(%) |
| `FORECAST_EXPORT_FC_YOY` | 出口:预测值:当期同比:月(%) |
| `FORECAST_IMPORT_FC_YOY` | 进口:预测值:当期同比:月(%) |
| `FORECAST_TRADE_SUR_FC` | 贸易顺差:预测值:月(美元) |
| `FORECAST_TRADE_SUR_FC_YOY` | 贸易顺差:预测值:同比:月(%) |
| `FORECAST_FX_RSV_FC` | 官方储备资产:外汇储备:预测值:月(亿美元) |
| `FORECAST_FX_RSV_FC_YOY` | 官方储备资产:外汇储备:预测值:同比:月(%) |
| `FORECAST_USDCNY_FC` | 美元兑人民币汇率:预测值:月(美元/人民币) |
| `FORECAST_RRR_LG_FC` | 存款准备金率:大型金融机构:预测值:月(%) |
| `FORECAST_RRR_LG_FC_YOY` | 存款准备金率:大型金融机构:预测值:同比:月(%) |

## 就业情况（综合）

| 字段 | 说明 |
| ---- | ---- |
| `EMPLOY_END_DATE` | 失业率:截止日期 |
| `EMPLOY_INFO_DATE` | 失业率:发布日期 |
| `EMPLOY_UNEMP` | 城镇调查失业率:当期值:月(%) |
| `EMPLOY_UNEMP_YOY` | 城镇调查失业率:同比:月(%) |
| `EMPLOY_UNEMP_16_24` | 城镇调查失业率(不包含在校生):16-24岁:月(%) |
| `EMPLOY_UNEMP_25_29` | 城镇调查失业率(不包含在校生):25-29岁:月(%) |
| `EMPLOY_UNEMP_30_59` | 城镇调查失业率(不包含在校生):30-59岁:月(%) |
| `EMPLOY_UNEMP_MIGR` | 城镇调查失业率:外来户籍人口:月(%) |
| `EMPLOY_UNEMP_RURAL_MIGR` | 城镇调查失业率:外来农业户籍人口:月(%) |
| `EMPLOY_AVG_WORKHRS` | 就业人员周平均工作时间:当期值:月(小时) |
| `EMPLOY_NEW_EMP_YTD` | 城镇新增就业人数:累计值:月(万人) |
| `EMPLOY_NEW_EMP_YTD_YOY` | 城镇新增就业人数:累计同比:月(%) |
| `EMPLOY_BDI_JOBSEEK` | 百度搜索指数:找工作:日(次) |
| `EMPLOY_BDI_RECRUIT` | 百度搜索指数:招聘:日(次) |
| `EMPLOY_BDI_UNEMP` | 百度搜索指数:失业:日(次) |
| `EMPLOY_BDI_UNEMP2` | 百度搜索指数:失业:日(次) |

## 最新核心宏观指标（综合）

> 数据特性：返回最新的核心宏观指标数据，包含 GDP、CPI、PMI、货币供应量、利率、社融等关键指标。

（字段定义待补充）

## 溢价率曲线（估值）

> 数据特性：单次查询返回**约 2400+ 条**历史日频数据（时序），覆盖近 10 年的红利溢价率与股债溢价率走势。

| 字段 | 说明 |
| ---- | ---- |
| `EndDate` | 数据日期 |
| `DividendPremium` | 红利溢价率(%) |
| `EquityPremium` | 股债溢价率(%) |

## 溢价率水平（估值）

> 数据特性：返回**当前最新值**及在过去 10 年的历史百分位（一次返回 1 条）。

| 字段 | 说明 |
| ---- | ---- |
| `EndDate` | 数据日期 |
| `DividendPremium` | 红利溢价率(%) |
| `EquityPremium` | 股债溢价率(%) |
| `DprPct10Y` | 红利溢价率在过去10年的百分位(%) |
| `EprPct10Y` | 股债溢价率在过去10年的百分位(%) |

## 期限利差与曲线形态（货币）

> 数据特性：返回**当前最新值**（一次返回 1 条），含 10Y/2Y 国债收益率、期限利差及多周期形态。`CurveForm*` 字段值为中文枚举：`牛陡` / `牛平` / `熊陡` / `熊平`。

| 字段 | 说明 |
| ---- | ---- |
| `EndDate` | 数据日期 |
| `Yield10Y` | 国债收益率10y(%) |
| `Yield2Y` | 国债收益率2y(%) |
| `TermSpread` | 期限利差(bps) |
| `CurveFormD` | 日形态（牛陡/牛平/熊陡/熊平） |
| `CurveFormW` | 周形态 |
| `CurveFormM` | 月形态 |
| `CurveFormQ` | 季形态 |
| `CurveFormY` | 年形态 |
| `LongDifD` | 长端日变化(%) |
| `LongDifW` | 长端周变化(%) |
| `LongDifM` | 长端月变化(%) |
| `LongDifQ` | 长端季变化(%) |
| `LongDifY` | 长端年变化(%) |
| `ShortDifD` | 短端日变化(%) |
| `ShortDifW` | 短端周变化(%) |
| `ShortDifM` | 短端月变化(%) |
| `ShortDifQ` | 短端季变化(%) |
| `ShortDifY` | 短端年变化(%) |

## 宏观日历历史（综合）

> 数据特性：返回历史宏观事件日历数据。

| 字段 | 说明 |
| ---- | ---- |
| `EndDate` | 数据日期 |
| `EventDate` | 事件日期 |
| `EventType` | 事件类型 |
| `EventDesc` | 事件描述 |
| `Importance` | 重要程度 |

## 宏观日历未来（综合）

> 数据特性：返回未来宏观事件日历数据。

| 字段 | 说明 |
| ---- | ---- |
| `EndDate` | 数据日期 |
| `EventDate` | 事件日期 |
| `EventType` | 事件类型 |
| `EventDesc` | 事件描述 |
| `Importance` | 重要程度 |
| `ForecastValue` | 预测值 |
| `PreviousValue` | 前值 |
