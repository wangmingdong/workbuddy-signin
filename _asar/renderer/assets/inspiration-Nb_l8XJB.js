import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { lc as DisplayMeta, t as init_src, uc as UIMeta } from "./src-DRGoWjIu.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { p as init_environment, y as isWorkBuddy } from "./environment-DKqg3f0G.js";
import { f as useNavigate, r as init_dist, u as useLocation } from "./dist-BlOCCi14.js";
import { t as init_contexts, xt as useConversations } from "./contexts-D7XKqa2J.js";
import { r as useAdapter } from "./adapter-context-DGaRYQ5R.js";
import { n as useI18n, t as init_useI18n } from "./useI18n-DDytAo7_.js";
import { j as matchShellRoute, t as init_router } from "./router-O5ZnP5xt.js";
import { t as init_inspiration_feature_config } from "./inspiration-feature-config-Ccv7h0He.js";
//#region ../../packages/agent-ui/src/components/inspiration-panel/styles.less
var init_styles = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/inspiration-panel/curation-modal.tsx
var import_react$7, import_jsx_runtime$7, FREQUENCY_OPTIONS, FREQUENCY_LABEL_MAP, CurationModal;
var init_curation_modal = __esmMin((() => {
	import_react$7 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	import_jsx_runtime$7 = require_jsx_runtime();
	FREQUENCY_OPTIONS = [
		{
			value: "daily",
			label: "curation.daily"
		},
		{
			value: "weekly_mon",
			label: "curation.weeklyMon"
		},
		{
			value: "weekly_fri",
			label: "curation.weeklyFri"
		},
		{
			value: "once",
			label: "curation.once"
		},
		{
			value: "custom",
			label: "curation.custom"
		}
	];
	FREQUENCY_LABEL_MAP = {
		daily: "curation.daily",
		weekly_mon: "curation.weeklyMon",
		weekly_fri: "curation.weeklyFri",
		once: "curation.once",
		custom: "curation.custom"
	};
	CurationModal = (0, import_react$7.memo)(function CurationModal({ visible, directives, onAdd, onToggle, onDelete, onClose }) {
		const { t } = useI18n();
		const [text, setText] = (0, import_react$7.useState)("");
		const [frequency, setFrequency] = (0, import_react$7.useState)("daily");
		(0, import_react$7.useEffect)(() => {
			if (visible) {
				setText("");
				setFrequency("daily");
			}
		}, [visible]);
		const handleSubmit = (0, import_react$7.useCallback)(() => {
			const trimmed = text.trim();
			if (!trimmed) return;
			onAdd(trimmed, frequency);
			setText("");
		}, [
			text,
			frequency,
			onAdd
		]);
		const handleOverlayClick = (0, import_react$7.useCallback)((e) => {
			if (e.target === e.currentTarget) onClose();
		}, [onClose]);
		if (!visible) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
			className: "inspiration-modal-overlay",
			onClick: handleOverlayClick,
			children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
				className: "inspiration-modal",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
						className: "inspiration-modal-head",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("h2", { children: t("curation.addDirective") }), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("button", {
							className: "inspiration-modal-close",
							onClick: onClose,
							children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("svg", {
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: "2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("line", {
									x1: "18",
									y1: "6",
									x2: "6",
									y2: "18"
								}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("line", {
									x1: "6",
									y1: "6",
									x2: "18",
									y2: "18"
								})]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
						className: "inspiration-modal-body",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
								className: "inspiration-fg",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("label", { children: t("curation.label") }), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("textarea", {
									className: "inspiration-finput",
									rows: 3,
									placeholder: t("curation.directivePlaceholder"),
									value: text,
									onChange: (e) => setText(e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
								className: "inspiration-fg",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("label", { children: t("curation.frequency") }), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("select", {
									className: "inspiration-select",
									value: frequency,
									onChange: (e) => setFrequency(e.target.value),
									children: FREQUENCY_OPTIONS.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("option", {
										value: opt.value,
										children: t(opt.label)
									}, opt.value))
								})]
							}),
							directives.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
								className: "inspiration-existing-dir",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("h4", { children: t("curation.existingDirectives") }), directives.map((dir) => /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
									className: "inspiration-dir-item",
									children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
										className: "inspiration-dir-info",
										children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
											className: "inspiration-dir-text",
											children: dir.directive
										}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
											className: "inspiration-dir-freq",
											children: [
												t(FREQUENCY_LABEL_MAP[dir.frequency] || dir.frequency),
												" · ",
												dir.active ? t("curation.active") : t("curation.inactive")
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
										className: "inspiration-dir-actions",
										children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
											className: `inspiration-toggle${dir.active ? " on" : ""}`,
											onClick: () => onToggle(dir.id, !dir.active)
										}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("button", {
											className: "inspiration-dir-delete",
											onClick: () => onDelete(dir.id),
											title: t("common.delete"),
											children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("svg", {
												viewBox: "0 0 24 24",
												fill: "none",
												stroke: "currentColor",
												strokeWidth: "2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("line", {
													x1: "18",
													y1: "6",
													x2: "6",
													y2: "18"
												}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("line", {
													x1: "6",
													y1: "6",
													x2: "18",
													y2: "18"
												})]
											})
										})]
									})]
								}, dir.id))]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
						className: "inspiration-modal-foot",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("button", {
							className: "inspiration-btn-cancel",
							onClick: onClose,
							children: t("common.cancel")
						}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("button", {
							className: "inspiration-btn-submit",
							onClick: handleSubmit,
							disabled: !text.trim(),
							children: t("curation.saveDirective")
						})]
					})
				]
			})
		});
	});
	CurationModal.displayName = "CurationModal";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/inspiration-panel/assets/card1.png
var card1_default;
var init_card1 = __esmMin((() => {
	card1_default = "" + new URL("card1-CQErPK1E.png", import.meta.url).href;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/inspiration-panel/assets/card2.png
var card2_default;
var init_card2 = __esmMin((() => {
	card2_default = "" + new URL("card2-Cn-awAWZ.png", import.meta.url).href;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/inspiration-panel/assets/card3.png
var card3_default;
var init_card3 = __esmMin((() => {
	card3_default = "" + new URL("card3-6UEfxHo_.png", import.meta.url).href;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/inspiration-panel/demo-cards.ts
/**
* 获取当天日期字符串 YYYY-MM-DD
*/
function getTodayDate() {
	const d = /* @__PURE__ */ new Date();
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
/**
* 生成 3 个 demo 卡片的前端展示数据
*/
function getDemoCards() {
	const today = getTodayDate();
	const now = (/* @__PURE__ */ new Date()).toISOString();
	return [
		{
			cardId: "card-demo-001",
			date: today,
			category: "industry_insight",
			title: "今天你最需要关注的变化，灵感已经先替你筛好了",
			summary: "一条灵感不会只给你一段资讯摘要，而会把重点变化、为什么值得看，以及下一步能做什么整理成更适合行动的研究结果。",
			detail: DEMO_DETAIL_001,
			topicSource: "demo",
			priority: 8,
			prompt: "帮我从今天的行业动态中筛出和我当前工作最相关的3条变化，并按优先级排好告诉我该先跟进哪一条",
			cover: card1_default,
			actions: [{
				label: "深入探索",
				type: "explore",
				payload: "explore-tech-trends"
			}],
			sources: [],
			read: false,
			saved: false,
			feedback: null,
			viewCount: 0,
			createdAt: now,
			expiredAt: "2099-12-31T23:59:59Z"
		},
		{
			cardId: "card-demo-002",
			date: today,
			category: "efficiency_tip",
			title: "一个模糊想法，怎么一步步变成可交付结果",
			summary: "从一句模糊需求开始，逐步补成结构化方向，再推进成原型、文档或其他交付物。重点是事情真的往前走。",
			detail: DEMO_DETAIL_002,
			topicSource: "demo",
			priority: 9,
			prompt: "我有一个还没成形的想法，帮我用\"压问题→定交付物→补背景→排顺序\"四步法整理成一版可以拿去讨论的提纲",
			cover: card2_default,
			actions: [{
				label: "开始尝试",
				type: "task",
				payload: "start-tutorial"
			}],
			sources: [],
			read: false,
			saved: false,
			feedback: null,
			viewCount: 0,
			createdAt: now,
			expiredAt: "2099-12-31T23:59:59Z"
		},
		{
			cardId: "card-demo-003",
			date: today,
			category: "skill_growth",
			title: "第一次接触新课题，怎么在 10 分钟内摸清背景",
			summary: "面对一个全新的主题，怎样在短时间内先建立方向感，再决定后面要往哪里深入。",
			detail: DEMO_DETAIL_003,
			topicSource: "demo",
			priority: 8,
			prompt: "帮我用定义、时间点、角色、路径、连接点五个锚点，快速摸底一个我刚接触的新课题并输出一张背景地图",
			cover: card3_default,
			actions: [{
				label: "开始项目",
				type: "task",
				payload: "start-project"
			}],
			sources: [],
			read: false,
			saved: false,
			feedback: null,
			viewCount: 0,
			createdAt: now,
			expiredAt: "2099-12-31T23:59:59Z"
		}
	];
}
var SAMPLE_COVERS, DEMO_DETAIL_001, DEMO_DETAIL_002, DEMO_DETAIL_003;
var init_demo_cards = __esmMin((() => {
	init_card1();
	init_card2();
	init_card3();
	SAMPLE_COVERS = [
		card1_default,
		card2_default,
		card3_default
	];
	DEMO_DETAIL_001 = `# 今天你最需要关注的变化，灵感已经先替你筛好了

> **核心一句**
> 每天最费神的一步，常常发生在真正开始之前：你得先判断，今天该把注意力放在哪里。

- **阅读时长**：约 4 分钟
- **关键词**：变化筛选、相关度判断、行动起点
- **这篇在讲什么**：灵感会把外部变化接到你手头的事上，让信息更快进入可用状态

---

## 先说那个最常见的卡点

每天最消耗人的，常常是变化成片涌来。

你会看到新工具上线、同行开始换打法、一个原本不起眼的话题忽然被反复提起；群消息、订阅、网页、收藏夹，像同时打开的十几个水龙头，声音都不小。真正让人停住的，是那一下犹豫：**今天到底该先看哪一个，哪一个只是路过，哪一个会真的影响你接下来的判断。**

很多人卡就卡在这里。信息一直在更新，工作也得往前走，可摆在前面的常常是一轮分拣。打开很多页面，扫过很多标题，花了不少时间，最后还是只能凭感觉决定"先看这个吧"。工作还没真正开始，精力已经先被磨掉一截。

---

## 为什么这件事会越来越难

原因其实很直接：变化更多了，来源更散了，类型也混在一起了。

今天值得关注的变化，可能来自：

- 行业新闻
- 某个产品更新
- 某位创作者的最新表达
- 一条并不显眼、但和你当前任务高度相关的线索

过去还可以依赖几个固定入口。现在不太行。你很难用同一种方式处理所有变化，于是"获取信息"慢慢也成了一项额外工作。

> 信息一直在增加。
> 真正稀缺的，是能帮你排出先后顺序的判断。

---

## WorkBuddy 灵感先替你做了哪三步

灵感先做的一件事，是把这些变化放回你的工作上下文里。你看到的，不会只是几个更新标题，后面还会跟着一层更实用的判断：这和我手头的事有没有关系，要不要继续追。

### 1. 先把零散变化收拢起来

它会先把值得放在一起看的内容整理成几个清晰主题：哪些是趋势层面的变化，哪些和具体工作方法有关，哪些只是短期热闹、暂时不值得投入。

你眼前先出现的是一个已经整理过的版面。线索彼此有关系，重点也更靠前。

### 2. 再把相关度排出来

对多数人来说，真正有价值的，是那些会影响当前判断的变化。

同样一条更新，对不同的人价值完全不同。灵感会把这种差别拉出来，让与你的工作、你的关注方向、你的思考背景更接近的内容优先出现。这样一来，你不用先把所有内容过一遍，再自己做第二轮筛选。

### 3. 最后给你一个能继续往前走的入口

一条变化值不值得看，关键在它会不会推动后面的判断：

- 要不要深入了解
- 要不要调整原有思路
- 要不要马上试一试
- 要不要先记住，等后续再跟

灵感会把信息整理成更接近工作起点的版本。读完以后，你大概知道这条变化和自己有什么关系，下一步又该往哪里追。

---

## 你最终拿到的，会是一份已经带着轻重缓急的简报

更好的结果，通常会包含这些信息：

- **重点变化是什么**
- **为什么它今天值得你看**
- **它和你手上的事情有什么关系**
- **如果要继续推进，下一步该问什么、看什么、做什么**

这几个动作看上去不大，却刚好省掉了最容易被忽略的那段认知成本。

一天效率的差距，很多时候在开始前就拉开了。注意力先被什么占住，往往决定后面能不能顺畅推进。有人花半小时四处浏览，最后仍拿不准重点；也有人只花几分钟，就已经抓住当天最值得处理的信号。

前面那一轮筛选，常常决定后面的节奏。

---

## 如果没有这一步，你大概率会这样开始一天

| 常见状态 | 表面上像什么 | 实际上发生了什么 |
| --- | --- | --- |
| 开很多网页 | 很积极地在跟进变化 | 注意力被切碎 |
| 扫很多标题 | 以为自己已经掌握全貌 | 其实还没形成判断 |
| 收藏很多内容 | 感觉"之后再看" | 真正重要的内容反而被淹没 |
| 最后凭感觉决定先看什么 | 好像也能动起来 | 但判断来得太晚，成本已经付掉了 |

这种工作流并不陌生：开很多网页、切很多标签页、收藏几条可能有用的内容、告诉自己"晚点再细看"，最后留下的是一种模糊的焦虑——好像看了很多，又好像没有真正看进去。

判断当然能做，只是做得太晚，注意力已经先被消耗掉不少。

---

## 最后

灵感把这段前置动作提前放到了前面：先收拢，先排序，再把值得留神的变化摆出来。

它不会替你下结论，也不会把复杂问题压成几个口号。它更像一次预处理，让你在真正投入时间之前，先站到一个更清楚的位置上。

> 于是你第一眼看到的，会是今天最值得先处理的那几个变化。
> 一天的起点，也跟着清楚了很多。

灵感替你留住的，既有内容里的重点，也有一天开始时最贵的判断力。`;
	DEMO_DETAIL_002 = `# 一个模糊想法，怎么一步步变成可交付结果

> **核心问题**
> 很多想法卡住，往往是因为它一直停在"感觉不错"这一步，还没有被压缩成第一版。

- **阅读时长**：约 4 分钟
- **关键词**：模糊想法、第一版、推进路径、可交付
- **这篇在讲什么**：当一个念头还带着雾气时，怎样把它一步步推成能讨论、能修改、能继续往下做的结果

---

## 先把目标换一下

很多想法最开始都带着一点模糊感。

你会隐约觉得它有价值，能写成一篇内容，能变成一个方案，能发展成一次项目讨论，甚至能长成一个新的工作方向。可只要准备往下接，脑子里立刻会冒出更多问题：范围多大，角度在哪，要查哪些背景，第一稿该怎么起。

人最容易在这里停住。表面上像是在思考，实际上一直没有把东西落到桌面上。

真正让事情开始转动的，通常是一版东西先出现。它可以还粗，可以还需要改，但只要它已经摆在桌面上，接下来的讨论、反馈和推进就有了抓手。

---

## 把一个模糊想法推成第一版，通常要过四道关

下面这四步，适合处理那种"已经有感觉，但还没成形"的念头。重点不在一步到位，而在于把它从脑内状态推到工作状态。

### 1. 先把它压成一个清楚的问题

很多想法发散，是因为里面同时混着太多东西：趋势、用户、案例、表达方式、现实约束，全都想带上一点，最后重心反而散了。

先问自己一句话：

> **这个想法，到底在回应什么问题？**

你可以先写下三件事：

- 我想解决什么卡点
- 这件事为什么值得现在处理
- 如果只留一句话，最核心的判断是什么

当问题被压清楚，想法才真正有了中心。

### 2. 再把它收窄成一个"第一版交付物"

想法一旦太大，人就容易迟疑。因为你眼前是一整团任务，很难立刻动手。

所以第二步非常关键：**先定义第一版到底要长什么样。**

它可以是：

- 一页 brief
- 一份提纲
- 一段核心论述
- 一版会议讨论稿
- 一个能拿去内部对齐的结构草图

第一版的形状一旦清楚，压力会立刻小很多。手上的任务开始变具体，人也更容易动起来。

### 3. 补"够用"的背景，先给第一版托底

很多人会在这里掉进资料坑。

一查就开很多网页，一开就想看全，一看全就迟迟回不到桌面。最后知道了不少信息，手里还是没有成稿。

更稳的做法，是只补这一版真正需要的背景。通常够用的就这几类：

| 要补什么 | 目的 |
| --- | --- |
| 相关案例 | 看看别人怎么处理类似问题 |
| 当前环境 | 判断这件事为什么值得现在做 |
| 受众关心点 | 决定表达重点该落在哪 |
| 现有约束 | 提前知道哪些方向走不通 |

这一轮背景的任务很明确：给第一版托底。只要够用，就已经达标。

### 4. 排一条最短推进链，让它先落桌

到这一步，你手上通常已经有了问题、背景和一些零散材料。接下来最重要的，是先把顺序排出来。

你可以直接按最短链条走：

1. 开头交代现在为什么值得谈
2. 中段展开核心判断或方案主线
3. 补一个案例、依据或对照材料
4. 收尾给出下一步动作

这条链不追求漂亮，追求的是顺。只要顺，一版就能出来；只要一版出来，讨论和修改都会跟上。

---

## 一版能推进的结果，最低配置长这样

如果你想判断"这版到底算不算落桌"，可以直接看这四样东西在不在：

- [ ] 有一句说得清的问题定义
- [ ] 有一个明确的第一版产物
- [ ] 有一层够用的背景支撑
- [ ] 有一条能继续展开的结构顺序

这四样一旦齐了，想法就已经进入可以被讨论、被修改、被推进的状态。

---

## 很多项目的分水岭，就在第一版出现得够不够早

项目后面能不能顺起来，和第一版出现的时间很有关系。

第一版会带来三件事：

- 你终于知道自己到底在做什么
- 别人终于可以给出具体反馈
- 后续动作终于有了可接的起点

桌面上没有第一版时，很多讨论都会悬着。桌面上有了第一版，模糊处反而会自己暴露出来。那时候再改，效率通常会高很多。

---

## 如果你想把前面的助跑缩短一点

这类工作里，WorkBuddy 十分适合帮你完成"前置整理"这类任务。

比如你已经有了一个大致方向，但还缺背景、缺结构、缺第一稿，就可以让它先帮你：

- 整理相关资料，压缩成可读摘要
- 把零散信息归到几个明确小节里
- 先起一版提纲或讨论稿
- 把下一步要追的问题列出来

当然，它并不只适合用在前面这一步。等第一版出来以后，后续的补充、整理、改写、扩展，其实也都能继续接上。这里先不展开，边用边摸会更有感觉。

---

## 最后

一个模糊想法要变成结果，关键在于先让第一版出现。

你先把问题压清楚，再把交付物收窄，把背景补到够用，把顺序排出来。做到这里，事情就已经从"我有一个念头"走到了"我们有一版可以继续推进的东西"。

> 很多工作真正开始的时刻，
> 都是第一版落到桌面的那一刻。`;
	DEMO_DETAIL_003 = `# 第一次接触新课题，怎么在 10 分钟内摸清背景

> **核心一句**
> 第一次碰到陌生课题时，先拿到一张背景地图，后面的阅读才会越来越清楚。

- **阅读时长**：约 4 分钟
- **关键词**：快速摸底、背景地图、认知锚点、入门判断
- **这篇在讲什么**：面对一个全新的主题，怎样在短时间内先建立方向感，再决定后面要往哪里深入

---

## 先别急着铺资料

很多人第一次接触陌生课题，动作都很像：打开搜索框、连着点开十几个页面、快速扫标题、记住几个新词，然后继续搜。

忙了一阵之后，心里还是空的。你大概见过一些信息，却还没形成真正的理解。因为这时候最需要的，通常是一张能帮你定方向的背景地图。

这张图一旦出现，后面的阅读会越来越顺。没有这张图，资料再多，也只是堆在眼前。

---

## 快速摸底时，先抓五个认知锚点

第一次摸底，不用一开始就求全。先把下面五个锚点补出来，方向感基本就有了。

### 锚点 1：它到底是什么

先给这个课题一个能站住的定义。

你需要先回答：

- 它属于哪一类问题
- 它解决的核心矛盾是什么
- 它和你原本熟悉的概念，最近的一层关系是什么

定义一旦站稳，后面的信息才有地方落。否则你读到的新词只会越积越多，脑子里却没有坐标。

### 锚点 2：它为什么会在现在浮上来

很多课题早就存在，只是到了某个时间点，讨论密度、应用场景、行业关注度一起抬起来了。

这一层通常要看：

- 最近发生了什么变化
- 是技术成熟了，还是市场启动了
- 是讨论升温了，还是开始真正落地了

看懂"为什么是现在"，你就更容易分清这是短期热度，还是值得长期跟进的新变量。

### 锚点 3：谁在推动，谁在使用

任何课题只要开始进入现实，就一定会出现角色分工。

可以先粗看三类人：

- **推动者**：谁在提这个方向，谁在做产品或方案
- **使用者**：谁真的会用，谁最先感受到它的价值
- **旁观者或质疑者**：争议通常从哪里冒出来

看到这里，你对这个课题的"棋盘"会有直觉。后面再看案例和讨论，很多观点也会更容易放回对应位置。

### 锚点 4：现在主流的路径长什么样

这一步看的是"它通常是怎么被做出来的"。

你不用马上掌握全部细节，但最好先知道：

- 现在常见做法有哪几类
- 主流路径分别适合什么场景
- 关键分歧一般卡在哪一段
- 哪些词是热闹，哪些词是真正的关节点

这会直接影响后面的阅读效率。因为你终于知道该看哪里，也知道哪些材料可以先略过去。

### 锚点 5：它和我有什么关系

这是最决定后续动作的一步。

一个新课题可以很热，也可以离你很远。只有当它和你手头的内容、项目、判断、任务目标发生连接时，它才真正值得继续投入时间。

这里可以直接问自己三句：

1. 它会影响我正在做的哪件事
2. 它会改变我原来的哪个判断
3. 我接下来要不要把它纳入当前工作流

关系一旦说清楚，后面的阅读就开始服务于具体工作。

---

## 10 分钟摸底时，可以直接照着这张表走

| 你要搞清的事 | 最简问题 |
| --- | --- |
| 定义 | 这到底是什么 |
| 时间点 | 为什么最近值得看 |
| 角色 | 谁在推动，谁在使用 |
| 路径 | 现在主流做法是什么 |
| 连接点 | 它和我手头的工作有什么关系 |

如果这五格已经填得七七八八，你对这个课题就已经脱离"完全陌生"的状态了。

---

## 很多人把时间花在了"找入口"上

真正耗时间的，往往是前面那段来回换关键词、反复试入口、刚看懂一点又被新概念打断的过程。

标签页越开越多，人越容易产生一种错觉：自己已经看了很多。可只要这五个锚点还没建立，理解就始终很散。

地图一旦先搭起来，后面的动作就会清楚很多：

- 该追哪篇深度内容
- 该看哪个案例
- 该找谁进一步聊
- 该把这个课题放回自己的哪项工作里

这时候，输入才真正开始变得有价值。

---

## 如果你想让这张地图更快成形

WorkBuddy 在这篇方法里，能接住的其实不只是前面的资料整理。

你刚开始接触一个课题时，它可以先帮你汇总公开信息、压缩背景、把零散输入归到"定义、时间点、角色、路径、连接点"这些关键栏位里；当你已经有了初步地图，它也可以继续帮你补案例、列问题、整理分歧点，或者把一堆阅读记录收成一版更清楚的提纲。

换句话说，从摸底、归纳，到继续追踪和回收信息，它基本都能参与进来。你可以把它当成一个会持续陪跑的研究助手，而不是只用一次的摘要工具。

当然，最后决定往哪条线深入、哪些判断值得保留，还是要回到你自己手里。

---

## 最后

第一次接触新课题时，最有用的动作，是先把背景地图搭出来。

定义、时间点、角色、路径、连接点，这五个锚点一旦站住，陌生感会明显下降，后面的阅读也会更聚焦。

> 对新课题来说，
> 前 10 分钟先把地图拿到手，后面的半小时才更值得投入。`;
}));
//#endregion
//#region ../../packages/agent-ui/src/assets/inspiration-fallback-1.png
var inspiration_fallback_1_default;
var init_inspiration_fallback_1 = __esmMin((() => {
	inspiration_fallback_1_default = "" + new URL("inspiration-fallback-1-m8CwnVTg.png", import.meta.url).href;
}));
//#endregion
//#region ../../packages/agent-ui/src/assets/inspiration-fallback-2.png
var inspiration_fallback_2_default;
var init_inspiration_fallback_2 = __esmMin((() => {
	inspiration_fallback_2_default = "" + new URL("inspiration-fallback-2-BjuVRAev.png", import.meta.url).href;
}));
//#endregion
//#region ../../packages/agent-ui/src/assets/inspiration-fallback-3.png
var inspiration_fallback_3_default;
var init_inspiration_fallback_3 = __esmMin((() => {
	inspiration_fallback_3_default = "" + new URL("inspiration-fallback-3-CnnWP50C.png", import.meta.url).href;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/inspiration-panel/fallback-covers.ts
/**
* Simple deterministic hash for shuffling the assignment order.
* Uses djb2 algorithm.
*/
function simpleHash(str) {
	let hash = 5381;
	for (let i = 0; i < str.length; i++) {
		hash = (hash << 5) + hash + str.charCodeAt(i);
		hash = hash >>> 0;
	}
	return hash;
}
/**
* Build a non-repeating assignment of fallback covers for a batch of card IDs.
*
* Strategy:
* 1. Sort card IDs lexicographically for deterministic order.
* 2. Use the hash of the first card ID as a rotation offset so different
*    batches get a different starting image.
* 3. Assign fallback images round-robin from the rotated array, guaranteeing
*    no duplicates within a batch of up to FALLBACK_COVERS.length cards.
*/
function buildFallbackMapping(cardIds) {
	const key = cardIds.slice().sort().join("|");
	if (cachedMapping && cachedKey === key) return cachedMapping;
	const sorted = cardIds.slice().sort();
	const offset = sorted.length > 0 ? simpleHash(sorted[0]) : 0;
	const mapping = /* @__PURE__ */ new Map();
	for (let i = 0; i < sorted.length; i++) {
		const coverIndex = (offset + i) % FALLBACK_COVERS.length;
		mapping.set(sorted[i], FALLBACK_COVERS[coverIndex]);
	}
	cachedMapping = mapping;
	cachedKey = key;
	return mapping;
}
/**
* Get fallback cover URL for a single card.
*
* If `buildFallbackMapping` has been called for a batch that includes this
* card, the cached result is returned.  Otherwise falls back to hash-based
* selection (for edge cases like a single card viewed in isolation).
*/
function getFallbackCoverUrl(cardId) {
	if (cachedMapping?.has(cardId)) return cachedMapping.get(cardId);
	return FALLBACK_COVERS[simpleHash(cardId) % FALLBACK_COVERS.length];
}
var FALLBACK_COVERS, cachedMapping, cachedKey;
var init_fallback_covers = __esmMin((() => {
	init_inspiration_fallback_1();
	init_inspiration_fallback_2();
	init_inspiration_fallback_3();
	FALLBACK_COVERS = [
		inspiration_fallback_1_default,
		inspiration_fallback_2_default,
		inspiration_fallback_3_default
	];
	cachedMapping = null;
	cachedKey = "";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/inspiration-panel/inspiration-card.less
var init_inspiration_card$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/inspiration-panel/inspiration-card.tsx
/**
* Convert an absolute file path to a vscode-file:// URL that Electron's
* ProtocolMainService can serve.  The authority must be "vscode-app" so
* that the registered protocol handler picks it up correctly.
*
* Network URLs (https:, http:, data:, etc.) are returned as-is.
* Windows paths (C:\foo) are normalised to forward slashes first.
*
* In WorkBuddy Desktop the vscode-file:// protocol is not registered;
* paths (including Vite dev-server /@fs/… paths) are already valid URLs
* and must be returned as-is.
*/
function toFileUrl$1(filePath) {
	if (!filePath) return "";
	if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(filePath)) return filePath;
	if (isWorkBuddy()) return filePath;
	if (/^[a-zA-Z]:[/\\]/.test(filePath)) return `vscode-file://vscode-app/${filePath.replace(/\\/g, "/")}`;
	if (filePath.startsWith("/")) return `vscode-file://vscode-app${filePath}`;
	return filePath;
}
var import_react$6, import_jsx_runtime$6, InspirationCard;
var init_inspiration_card = __esmMin((() => {
	init_inspiration_card$1();
	import_react$6 = /* @__PURE__ */ __toESM(require_react());
	init_environment();
	init_fallback_covers();
	import_jsx_runtime$6 = require_jsx_runtime();
	InspirationCard = (0, import_react$6.memo)(function InspirationCard({ cardId, title, summary, cover, onClick, className }) {
		const coverUrl = (0, import_react$6.useMemo)(() => cover ? toFileUrl$1(cover) : getFallbackCoverUrl(cardId), [cover, cardId]);
		const handleCardClick = () => {
			onClick?.(cardId);
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
			className: ["inspiration-card", className || ""].filter(Boolean).join(" "),
			onClick: handleCardClick,
			role: "button",
			tabIndex: 0,
			children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
				className: "inspiration-card-cover",
				children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("img", {
					src: coverUrl,
					alt: title
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
				className: "inspiration-card-body",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
					className: "inspiration-card-title",
					children: title
				}), summary && /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
					className: "inspiration-card-summary",
					children: summary
				})]
			})]
		});
	});
	InspirationCard.displayName = "InspirationCard";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/inspiration-panel/inspiration-card-skeleton.less
var init_inspiration_card_skeleton$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/inspiration-panel/inspiration-card-skeleton.tsx
var import_react$5, import_jsx_runtime$5, InspirationCardSkeleton;
var init_inspiration_card_skeleton = __esmMin((() => {
	init_inspiration_card_skeleton$1();
	import_react$5 = /* @__PURE__ */ __toESM(require_react());
	import_jsx_runtime$5 = require_jsx_runtime();
	InspirationCardSkeleton = (0, import_react$5.memo)(function InspirationCardSkeleton({ className }) {
		return /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
			className: ["inspiration-card-skeleton", className || ""].filter(Boolean).join(" "),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
					className: "inspiration-card-skeleton-header",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", { className: "inspiration-card-skeleton-category" }),
						/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
							className: "inspiration-card-skeleton-title-section",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", { className: "inspiration-card-skeleton-title shimmer" }), /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", { className: "inspiration-card-skeleton-source shimmer" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", { className: "inspiration-card-skeleton-time shimmer" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", { className: "inspiration-card-skeleton-summary shimmer" }),
				/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", { className: "inspiration-card-skeleton-summary-line shimmer" }),
				/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
					className: "inspiration-card-skeleton-footer",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", { className: "inspiration-card-skeleton-metadata" }), /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
						className: "inspiration-card-skeleton-actions",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", { className: "inspiration-card-skeleton-action-btn shimmer" }),
							/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", { className: "inspiration-card-skeleton-action-btn shimmer" }),
							/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", { className: "inspiration-card-skeleton-action-btn shimmer" })
						]
					})]
				})
			]
		});
	});
	InspirationCardSkeleton.displayName = "InspirationCardSkeleton";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/inspiration-panel/inspiration-loading.tsx
var import_react$4, import_jsx_runtime$4, InspirationLoading;
var init_inspiration_loading = __esmMin((() => {
	import_react$4 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	import_jsx_runtime$4 = require_jsx_runtime();
	InspirationLoading = (0, import_react$4.memo)(function InspirationLoading() {
		const { t } = useI18n();
		return /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
			className: "insp-loading-container",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
					className: "insp-loading-badge",
					children: t("inspiration.loading.badge")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
					className: "insp-loading-hero",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
							className: "insp-loading-hero-circle",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", { className: "insp-bulb-glow" }),
								/* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("svg", {
									className: "insp-loading-hero-bulb",
									viewBox: "0 0 64 80",
									fill: "none",
									xmlns: "http://www.w3.org/2000/svg",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("path", {
											d: "M32 4C18.745 4 8 14.745 8 28c0 8.837 4.791 16.548 11.912 20.706C22.364 50.277 24 53.298 24 56.5V58h16v-1.5c0-3.202 1.636-6.223 4.088-7.794C51.209 44.548 56 36.837 56 28 56 14.745 45.255 4 32 4z",
											fill: "url(#insp-bulbGrad)",
											stroke: "#e6b800",
											strokeWidth: "1.5"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("ellipse", {
											cx: "32",
											cy: "28",
											rx: "12",
											ry: "14",
											fill: "url(#insp-innerGlow)",
											opacity: "0.6"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("path", {
											d: "M28 36V28c0-2.2 1.8-4 4-4s4 1.8 4 4v8",
											stroke: "#cc9900",
											strokeWidth: "1.5",
											strokeLinecap: "round",
											fill: "none"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("path", {
											d: "M26 28h12",
											stroke: "#cc9900",
											strokeWidth: "1",
											opacity: "0.4",
											strokeLinecap: "round"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("rect", {
											x: "24",
											y: "58",
											width: "16",
											height: "4",
											rx: "1",
											fill: "#d4d4d8",
											stroke: "#a1a1aa",
											strokeWidth: "0.8"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("rect", {
											x: "25",
											y: "62",
											width: "14",
											height: "3",
											rx: "1",
											fill: "#d4d4d8",
											stroke: "#a1a1aa",
											strokeWidth: "0.8"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("rect", {
											x: "26",
											y: "65",
											width: "12",
											height: "3",
											rx: "1",
											fill: "#d4d4d8",
											stroke: "#a1a1aa",
											strokeWidth: "0.8"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("rect", {
											x: "27.5",
											y: "68",
											width: "9",
											height: "3",
											rx: "1.5",
											fill: "#d4d4d8",
											stroke: "#a1a1aa",
											strokeWidth: "0.8"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("defs", { children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("radialGradient", {
											id: "insp-bulbGrad",
											cx: "50%",
											cy: "40%",
											r: "60%",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("stop", {
													offset: "0%",
													stopColor: "#fff9c4"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("stop", {
													offset: "50%",
													stopColor: "#ffe082"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("stop", {
													offset: "100%",
													stopColor: "#ffd54f"
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("radialGradient", {
											id: "insp-innerGlow",
											cx: "50%",
											cy: "50%",
											r: "50%",
											children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("stop", {
												offset: "0%",
												stopColor: "#ffffff",
												stopOpacity: "0.9"
											}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("stop", {
												offset: "100%",
												stopColor: "#fff9c4",
												stopOpacity: "0"
											})]
										})] })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", { className: "insp-sparkle-ray" }),
								/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", { className: "insp-sparkle-ray" }),
								/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", { className: "insp-sparkle-ray" }),
								/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", { className: "insp-sparkle-ray" }),
								/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", { className: "insp-sparkle-ray" }),
								/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", { className: "insp-sparkle-ray" }),
								/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", { className: "insp-sparkle-ray" }),
								/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", { className: "insp-sparkle-ray" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", { className: "insp-sparkle insp-sparkle-1" }),
						/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", { className: "insp-sparkle insp-sparkle-2" }),
						/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", { className: "insp-sparkle insp-sparkle-3" }),
						/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", { className: "insp-twinkle-star" }),
						/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", { className: "insp-twinkle-star" }),
						/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", { className: "insp-twinkle-star" }),
						/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", { className: "insp-twinkle-star" }),
						/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", { className: "insp-twinkle-star" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("h2", {
					className: "insp-loading-title",
					children: t("inspiration.loading.title")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("p", {
					className: "insp-loading-desc",
					children: t("inspiration.loading.desc")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
					className: "insp-loading-phases",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
							className: "insp-loading-phase",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", { className: "insp-phase-dot" }), t("inspiration.loading.phase1")]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
							className: "insp-loading-phase",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", { className: "insp-phase-dot" }), t("inspiration.loading.phase2")]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
							className: "insp-loading-phase",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", { className: "insp-phase-dot" }), t("inspiration.loading.phase3")]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
					className: "insp-loading-dots",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", { className: "insp-loading-dot" }),
						/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", { className: "insp-loading-dot" }),
						/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", { className: "insp-loading-dot" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
					className: "insp-loading-hint",
					children: t("inspiration.loading.hint")
				})
			]
		});
	});
	InspirationLoading.displayName = "InspirationLoading";
})), INTEREST_TAG_DEFINITIONS, ONBOARDING_TAG_ORDER;
var init_tag_definitions = __esmMin((() => {
	INTEREST_TAG_DEFINITIONS = [
		{
			id: "efficiency_tools",
			zhLabel: "效率工具",
			enLabel: "Productivity Tools"
		},
		{
			id: "office_collaboration",
			zhLabel: "办公协作",
			enLabel: "Office Collaboration"
		},
		{
			id: "project_management",
			zhLabel: "项目管理",
			enLabel: "Project Management"
		},
		{
			id: "data_analysis",
			zhLabel: "数据分析",
			enLabel: "Data Analysis"
		},
		{
			id: "workplace_skills",
			zhLabel: "职场技能",
			enLabel: "Workplace Skills"
		},
		{
			id: "lifestyle",
			zhLabel: "生活好物",
			enLabel: "Lifestyle Picks"
		},
		{
			id: "health_wellness",
			zhLabel: "健康养生",
			enLabel: "Health & Wellness"
		},
		{
			id: "home_organization",
			zhLabel: "家居收纳",
			enLabel: "Home Organization"
		},
		{
			id: "cooking",
			zhLabel: "美食烹饪",
			enLabel: "Cooking & Food"
		},
		{
			id: "travel",
			zhLabel: "旅行出行",
			enLabel: "Travel"
		},
		{
			id: "finance",
			zhLabel: "理财消费",
			enLabel: "Personal Finance"
		},
		{
			id: "ai_models",
			zhLabel: "AI 大模型",
			enLabel: "AI & Large Models"
		},
		{
			id: "product_design",
			zhLabel: "产品设计",
			enLabel: "Product Design"
		},
		{
			id: "industry_trends",
			zhLabel: "行业趋势",
			enLabel: "Industry Trends"
		},
		{
			id: "learning",
			zhLabel: "学习提升",
			enLabel: "Learning & Growth"
		},
		{
			id: "career",
			zhLabel: "职业发展",
			enLabel: "Career Development"
		}
	];
	ONBOARDING_TAG_ORDER = [
		"efficiency_tools",
		"lifestyle",
		"finance",
		"office_collaboration",
		"health_wellness",
		"ai_models",
		"project_management",
		"home_organization",
		"product_design",
		"data_analysis",
		"cooking",
		"industry_trends",
		"workplace_skills",
		"travel",
		"learning",
		"career"
	];
	new Set(INTEREST_TAG_DEFINITIONS.map((t) => t.id));
	new Map([...INTEREST_TAG_DEFINITIONS.map((t) => [t.zhLabel, t.id]), ["AI大模型", "ai_models"]]);
}));
//#endregion
//#region ../../packages/agent-ui/src/components/inspiration-panel/onboarding-modal.tsx
var import_react$3, import_jsx_runtime$3, OB_TAG_DEFS, OnboardingModal;
var init_onboarding_modal = __esmMin((() => {
	import_react$3 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_demo_cards();
	init_tag_definitions();
	import_jsx_runtime$3 = require_jsx_runtime();
	OB_TAG_DEFS = ONBOARDING_TAG_ORDER.map((id) => INTEREST_TAG_DEFINITIONS.find((t) => t.id === id));
	OnboardingModal = (0, import_react$3.memo)(function OnboardingModal({ visible, onComplete, onSkip, onCardClick }) {
		const { t } = useI18n();
		const [currentStep, setCurrentStep] = (0, import_react$3.useState)(0);
		const [selectedTags, setSelectedTags] = (0, import_react$3.useState)([]);
		const [freeText, setFreeText] = (0, import_react$3.useState)("");
		if (!visible) return null;
		const demoCards = getDemoCards();
		const toggleTag = (tag) => {
			setSelectedTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]);
		};
		const handleEnable = () => {
			setCurrentStep(1);
		};
		const handleGenerate = () => {
			onComplete({
				selectedTags,
				freeText
			});
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
			className: "ob-inline",
			children: [currentStep === 0 && /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)(import_jsx_runtime$3.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
				className: "ob-welcome-banner",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
					className: "ob-welcome-content",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("h2", {
						className: "ob-welcome-title",
						children: t("onboarding.welcomeTitle")
					}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("p", {
						className: "ob-welcome-desc",
						children: t("onboarding.welcomeDescription")
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("button", {
					className: "ob-welcome-btn",
					onClick: handleEnable,
					children: t("onboarding.enableButton")
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
				className: "ob-sample-cards",
				children: demoCards.map((card, idx) => /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
					className: "ob-sample-card",
					onClick: () => onCardClick?.(card.cardId),
					role: "button",
					tabIndex: 0,
					style: { cursor: "pointer" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
						className: "ob-sample-cover",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("img", {
							src: SAMPLE_COVERS[idx],
							alt: card.title
						}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
							className: "ob-sample-badge",
							children: t("onboarding.sampleBadge")
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
						className: "ob-sample-body",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
							className: "ob-sample-title",
							children: card.title
						}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
							className: "ob-sample-summary",
							children: card.summary
						})]
					})]
				}, card.cardId))
			})] }), currentStep === 1 && /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)(import_jsx_runtime$3.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
				className: "ob-interest-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("h2", {
						className: "ob-interest-title",
						children: t("onboarding.step2.title")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("p", {
						className: "ob-interest-desc",
						children: t("onboarding.step2.description")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
						className: "ob-interest-section",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
							className: "ob-interest-label",
							children: t("onboarding.interestDirection")
						}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
							className: "ob-tags",
							children: OB_TAG_DEFS.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("button", {
								className: `ob-tag${selectedTags.includes(tag.id) ? " ob-tag--selected" : ""}`,
								onClick: () => toggleTag(tag.id),
								children: t(`tags.${tag.id}`)
							}, tag.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
						className: "ob-interest-section",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
							className: "ob-interest-label",
							children: t("onboarding.tellMeMore")
						}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("input", {
							type: "text",
							className: "ob-input",
							value: freeText,
							onChange: (e) => setFreeText(e.target.value),
							placeholder: t("onboarding.step2.tagsPlaceholder")
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
						className: "ob-generate-row",
						children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("button", {
							className: "ob-generate-btn",
							onClick: handleGenerate,
							children: t("onboarding.generateFirst")
						})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
				className: "ob-mini-cards",
				children: demoCards.map((card, idx) => /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
					className: "ob-mini-card",
					onClick: () => onCardClick?.(card.cardId),
					role: "button",
					tabIndex: 0,
					style: { cursor: "pointer" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
						className: "ob-mini-cover",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("img", {
							src: SAMPLE_COVERS[idx],
							alt: card.title
						}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
							className: "ob-mini-badge",
							children: t("onboarding.sampleBadge")
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
						className: "ob-mini-title",
						children: card.title
					})]
				}, card.cardId))
			})] })]
		});
	});
	OnboardingModal.displayName = "OnboardingModal";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/inspiration-panel/settings-modal.tsx
var import_react$2, import_jsx_runtime$2, SettingsModal;
var init_settings_modal = __esmMin((() => {
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_tag_definitions();
	import_jsx_runtime$2 = require_jsx_runtime();
	SettingsModal = (0, import_react$2.memo)(function SettingsModal({ visible, config, onSave, onClose }) {
		const { t } = useI18n();
		const [enabled, setEnabled] = (0, import_react$2.useState)(true);
		const [selectedTags, setSelectedTags] = (0, import_react$2.useState)(/* @__PURE__ */ new Set());
		const [curationText, setCurationText] = (0, import_react$2.useState)("");
		(0, import_react$2.useEffect)(() => {
			if (config) {
				setEnabled(config.enabled);
				setSelectedTags(new Set(config.interestTags));
				setCurationText(config.curationText ?? "");
			}
		}, [config]);
		const handleTagToggle = (0, import_react$2.useCallback)((tag) => {
			setSelectedTags((prev) => {
				const next = new Set(prev);
				if (next.has(tag)) next.delete(tag);
				else next.add(tag);
				return next;
			});
		}, []);
		const handleSave = (0, import_react$2.useCallback)(() => {
			if (!config) return;
			onSave({
				...config,
				enabled,
				interestTags: Array.from(selectedTags),
				curationText,
				updatedAt: (/* @__PURE__ */ new Date()).toISOString()
			});
		}, [
			config,
			enabled,
			selectedTags,
			curationText,
			onSave
		]);
		const handleOverlayClick = (0, import_react$2.useCallback)((e) => {
			if (e.target === e.currentTarget) onClose();
		}, [onClose]);
		if (!visible) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
			className: "inspiration-modal-overlay",
			onClick: handleOverlayClick,
			children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
				className: "inspiration-modal",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
						className: "inspiration-modal-head",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("h2", { children: t("inspiration.settingsTitle") }), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("button", {
							className: "inspiration-modal-close",
							onClick: onClose,
							children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("svg", {
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: "2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("line", {
									x1: "18",
									y1: "6",
									x2: "6",
									y2: "18"
								}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("line", {
									x1: "6",
									y1: "6",
									x2: "18",
									y2: "18"
								})]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
						className: "inspiration-modal-body",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
								className: "inspiration-set-section",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("h3", { children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("svg", {
									viewBox: "0 0 24 24",
									fill: "none",
									stroke: "currentColor",
									strokeWidth: "2",
									children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("path", { d: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 12 18.469V21" })
								}), t("settings.basicSettings")] }), /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
									className: "inspiration-set-row",
									children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
										className: "inspiration-set-label",
										children: t("settings.feature")
									}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
										className: "inspiration-set-desc",
										children: t("settings.description")
									})] }), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
										className: `inspiration-toggle${enabled ? " on" : ""}`,
										onClick: () => setEnabled(!enabled)
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
								className: "inspiration-set-section",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("h3", { children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("svg", {
									viewBox: "0 0 24 24",
									fill: "none",
									stroke: "currentColor",
									strokeWidth: "2",
									children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("path", { d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" })
								}), t("settings.interestTags")] }), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
									className: "inspiration-tag-editor",
									children: INTEREST_TAG_DEFINITIONS.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
										className: `inspiration-itag${selectedTags.has(tag.id) ? " selected" : ""}`,
										onClick: () => handleTagToggle(tag.id),
										children: t(`tags.${tag.id}`)
									}, tag.id))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
								className: "inspiration-set-section",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("h3", { children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("svg", {
										viewBox: "0 0 24 24",
										fill: "none",
										stroke: "currentColor",
										strokeWidth: "2",
										children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" })
									}), t("settings.curationLabel")] }),
									/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
										className: "inspiration-set-desc",
										style: { marginBottom: 8 },
										children: t("settings.curationSublabel")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("textarea", {
										className: "inspiration-curation-textarea",
										value: curationText,
										onChange: (e) => setCurationText(e.target.value),
										placeholder: t("settings.curationPlaceholder"),
										rows: 4
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
						className: "inspiration-modal-foot",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("button", {
							className: "inspiration-btn-cancel",
							onClick: onClose,
							children: t("settings.cancelButton")
						}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("button", {
							className: "inspiration-btn-submit",
							onClick: handleSave,
							children: t("settings.saveButton")
						})]
					})
				]
			})
		});
	});
	SettingsModal.displayName = "SettingsModal";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/inspiration-panel/index.tsx
function getTodayDateString() {
	const d = /* @__PURE__ */ new Date();
	return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 ${[
		"周日",
		"周一",
		"周二",
		"周三",
		"周四",
		"周五",
		"周六"
	][d.getDay()]}`;
}
var import_react$1, InspirationPanel;
var init_inspiration_panel = __esmMin((() => {
	init_styles();
	init_src();
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_dist();
	init_contexts();
	init_useI18n();
	init_router();
	init_environment();
	init_inspiration_feature_config();
	init_curation_modal();
	init_demo_cards();
	init_fallback_covers();
	init_inspiration_card();
	init_inspiration_card_skeleton();
	init_inspiration_loading();
	init_onboarding_modal();
	init_settings_modal();
	require_jsx_runtime();
	InspirationPanel = () => {
		const { t } = useI18n();
		const adapter = useAdapter();
		const { setInspirationNewCount, setInspirationBadgeStatus, setInspirationOnboardingCompleted } = useConversations();
		const location = useLocation();
		const navigate = useNavigate();
		matchShellRoute(location.pathname)?.handle.view;
		const inspirationDisabled = true;
		const isVisible = false;
		const [loading, setLoading] = (0, import_react$1.useState)(false);
		const [error, setError] = (0, import_react$1.useState)(null);
		const [cards, setCards] = (0, import_react$1.useState)([]);
		const [, setHasMore] = (0, import_react$1.useState)(false);
		const [drawerCardId, setDrawerCardId] = (0, import_react$1.useState)(null);
		const [drawerCard, setDrawerCard] = (0, import_react$1.useState)(null);
		const [drawerLoading, setDrawerLoading] = (0, import_react$1.useState)(false);
		const detailCacheRef = (0, import_react$1.useRef)(/* @__PURE__ */ new Map());
		const [showOnboarding, setShowOnboarding] = (0, import_react$1.useState)(false);
		const [showSettings, setShowSettings] = (0, import_react$1.useState)(false);
		const [showCuration, setShowCuration] = (0, import_react$1.useState)(false);
		const [config, setConfig] = (0, import_react$1.useState)(null);
		const [directives, setDirectives] = (0, import_react$1.useState)([]);
		(0, import_react$1.useMemo)(() => getTodayDateString(), []);
		const loadInspirations = (0, import_react$1.useCallback)(async () => {
			if (!adapter?.listInspirations) {
				console.warn("[InspirationPanel] listInspirations method not available");
				return;
			}
			try {
				setLoading(true);
				setError(null);
				const now = /* @__PURE__ */ new Date();
				const todayDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
				const result = await adapter.listInspirations({
					date: todayDate,
					offset: 0,
					limit: 20
				});
				if (result?.cards) {
					setCards(result.cards);
					setHasMore(result.hasMore ?? false);
					if (result.cards.some((c) => !c.read) && adapter.markAllInspirationRead) adapter.markAllInspirationRead({ date: todayDate }).catch((err) => {
						console.error("[InspirationPanel] Mark all read failed:", err);
					});
				} else {
					setCards([]);
					setHasMore(false);
				}
			} catch (err) {
				console.error("[InspirationPanel] Load inspirations failed:", err);
				setError(err instanceof Error ? err.message : "Failed to load inspirations");
				setCards([]);
			} finally {
				setLoading(false);
			}
		}, [adapter]);
		const checkOnboarding = (0, import_react$1.useCallback)(async () => {
			if (!adapter?.checkInspirationOnboarding) return;
			try {
				if (!(await adapter.checkInspirationOnboarding()).completed) setShowOnboarding(true);
			} catch (err) {
				console.error("[InspirationPanel] Check onboarding failed:", err);
			}
		}, [adapter]);
		const loadConfig = (0, import_react$1.useCallback)(async () => {
			if (!adapter?.getInspirationSettings) return;
			try {
				const result = await adapter.getInspirationSettings();
				if (result) {
					setConfig(result);
					if (result.onboardingCompleted) setInspirationOnboardingCompleted?.(true);
				}
			} catch (err) {
				console.error("[InspirationPanel] Load config failed:", err);
			}
		}, [adapter, setInspirationOnboardingCompleted]);
		const loadDirectives = (0, import_react$1.useCallback)(async () => {
			if (!adapter?.listCurationDirectives) return;
			try {
				setDirectives(await adapter.listCurationDirectives() ?? []);
			} catch (err) {
				console.error("[InspirationPanel] Load directives failed:", err);
			}
		}, [adapter]);
		(0, import_react$1.useEffect)(() => {}, [
			isVisible,
			loadConfig,
			loadInspirations,
			checkOnboarding,
			adapter
		]);
		(0, import_react$1.useEffect)(() => {
			if (cards.length === 0 || !adapter?.getInspirationCard) return;
			const cache = detailCacheRef.current;
			cache.clear();
			console.log(`[InspirationPanel] Starting prefetch for ${cards.length} cards`);
			for (const card of cards) {
				if (card.cardId.startsWith("card-demo-")) continue;
				const promise = adapter.getInspirationCard({ cardId: card.cardId }).then((fullCard) => {
					if (fullCard) console.log(`[InspirationPanel] Prefetch success for ${card.cardId}: hasDetail=${!!fullCard.detail}, detailLen=${fullCard.detail?.length ?? 0}`);
					else console.warn(`[InspirationPanel] Prefetch returned null for ${card.cardId}`);
					return fullCard ?? null;
				}).catch((err) => {
					console.error(`[InspirationPanel] Prefetch detail failed for ${card.cardId}:`, err);
					return null;
				});
				cache.set(card.cardId, promise);
			}
		}, [cards, adapter]);
		(0, import_react$1.useRef)(false);
		(0, import_react$1.useEffect)(() => {}, [
			isVisible,
			inspirationDisabled,
			loading,
			cards.length,
			error,
			adapter,
			setInspirationNewCount,
			setInspirationBadgeStatus
		]);
		(0, import_react$1.useCallback)(async (cardId) => {
			console.log(`[InspirationPanel] Card clicked: ${cardId}`);
			setDrawerCardId(cardId);
			if (cardId.startsWith("card-demo-")) {
				const demoCard = getDemoCards().find((c) => c.cardId === cardId);
				if (demoCard) {
					setDrawerCard(demoCard);
					return;
				}
			}
			if (adapter?.markInspirationRead) {
				adapter.markInspirationRead({ cardId }).catch((err) => {
					console.error("[InspirationPanel] Mark read failed:", err);
				});
				setCards((prev) => prev.map((c) => c.cardId === cardId ? {
					...c,
					read: true
				} : c));
			}
			const indexCard = cards.find((c) => c.cardId === cardId);
			if (indexCard) {
				console.log(`[InspirationPanel] Set drawer card from index: ${cardId}, hasDetail=${!!indexCard.detail}, summaryLen=${indexCard.summary?.length ?? 0}`);
				setDrawerCard(indexCard);
			}
			const cachedPromise = detailCacheRef.current.get(cardId);
			console.log(`[InspirationPanel] Fetching card detail: ${cardId}, hasCachedPromise=${!!cachedPromise}`);
			const detailPromise = cachedPromise ?? (adapter?.getInspirationCard ? adapter.getInspirationCard({ cardId }).catch((err) => {
				console.error("[InspirationPanel] Load card detail failed:", err);
				return null;
			}) : null);
			if (detailPromise) {
				setDrawerLoading(true);
				try {
					const fullCard = await detailPromise;
					if (fullCard) {
						console.log(`[InspirationPanel] Detail loaded: ${cardId}, hasDetail=${!!fullCard.detail}, detailLen=${fullCard.detail?.length ?? 0}`);
						setDrawerCard(fullCard);
						setCards((prev) => prev.map((c) => c.cardId === cardId ? {
							...c,
							detail: fullCard.detail,
							actions: fullCard.actions,
							sources: fullCard.sources
						} : c));
					} else console.warn(`[InspirationPanel] Detail promise resolved to null for ${cardId}`);
				} finally {
					setDrawerLoading(false);
				}
			}
		}, [adapter, cards]);
		(0, import_react$1.useCallback)(() => {
			setDrawerCardId(null);
			setDrawerCard(null);
		}, []);
		(0, import_react$1.useCallback)(async () => {
			if (!drawerCard || !adapter?.requestInsertContentBlocks) return;
			let card = drawerCard;
			if (!card.detail && adapter?.getInspirationCard && !card.cardId.startsWith("card-demo-")) try {
				const fullCard = await adapter.getInspirationCard({ cardId: card.cardId });
				if (fullCard) card = fullCard;
			} catch (err) {
				console.error("[InspirationPanel] handleDeepExplore: fetch card failed", err);
			}
			const block = {
				type: "resource_link",
				name: card.title,
				uri: card.dataPath || "",
				title: card.title,
				_meta: {
					mentionType: "inspiration",
					[DisplayMeta.DISPLAY_AS_CONTEXT]: false,
					[DisplayMeta.DISPLAY_AS_PHRASE]: true,
					[UIMeta.ICON]: "💡",
					[UIMeta.DESCRIPTION]: card.summary,
					cardTitle: card.title,
					cardSummary: card.summary,
					detail: card.detail || "",
					sources: card.sources || [],
					actions: card.actions || [],
					inspirationCardId: card.cardId
				}
			};
			setDrawerCardId(null);
			setDrawerCard(null);
			navigate("/");
			adapter.requestInsertContentBlocks({
				contentBlocks: [block],
				clearFirst: true,
				promptText: card.prompt || void 0
			});
		}, [
			drawerCard,
			adapter,
			navigate
		]);
		(0, import_react$1.useCallback)(async () => {
			await loadConfig();
			await loadDirectives();
			setShowSettings(true);
		}, [loadConfig, loadDirectives]);
		(0, import_react$1.useCallback)(async (result) => {
			setShowOnboarding(false);
			const now = (/* @__PURE__ */ new Date()).toISOString();
			const newConfig = {
				...config ?? {
					enabled: true,
					interestTags: [],
					curationDirectives: [],
					preferredCardCount: 6,
					onboardingCompleted: false,
					createdAt: now,
					updatedAt: now
				},
				interestTags: result.selectedTags,
				curationText: result.freeText || config?.curationText || "",
				onboardingCompleted: true,
				updatedAt: now
			};
			if (adapter?.saveInspirationSettings) try {
				await adapter.saveInspirationSettings(newConfig);
				setConfig(newConfig);
			} catch (err) {
				console.error("[InspirationPanel] Save onboarding config failed:", err);
			}
			if (adapter?.completeInspirationOnboarding) await adapter.completeInspirationOnboarding();
			setInspirationOnboardingCompleted?.(true);
			if (adapter?.injectDemoInspirationCards) try {
				await adapter.injectDemoInspirationCards();
			} catch (err) {
				console.error("[InspirationPanel] Inject demo cards failed:", err);
			}
			loadInspirations();
		}, [
			adapter,
			config,
			loadInspirations,
			setInspirationOnboardingCompleted
		]);
		(0, import_react$1.useCallback)(async () => {
			setShowOnboarding(false);
			const now = (/* @__PURE__ */ new Date()).toISOString();
			const skipConfig = {
				...config ?? {
					enabled: true,
					interestTags: [],
					curationDirectives: [],
					preferredCardCount: 6,
					onboardingCompleted: false,
					createdAt: now,
					updatedAt: now
				},
				onboardingCompleted: true,
				updatedAt: now
			};
			if (adapter?.saveInspirationSettings) try {
				await adapter.saveInspirationSettings(skipConfig);
				setConfig(skipConfig);
			} catch (err) {
				console.error("[InspirationPanel] Save skip config failed:", err);
			}
			if (adapter?.completeInspirationOnboarding) await adapter.completeInspirationOnboarding();
			setInspirationOnboardingCompleted?.(true);
		}, [
			adapter,
			config,
			setInspirationOnboardingCompleted
		]);
		(0, import_react$1.useCallback)(async (newConfig) => {
			if (!adapter?.saveInspirationSettings) return;
			try {
				await adapter.saveInspirationSettings(newConfig);
				setConfig(newConfig);
				setShowSettings(false);
			} catch (err) {
				console.error("[InspirationPanel] Save settings failed:", err);
			}
		}, [adapter]);
		(0, import_react$1.useCallback)(async (text, frequency) => {
			if (!adapter?.addCurationDirective) return;
			try {
				const newDir = await adapter.addCurationDirective({
					text,
					frequency
				});
				if (newDir) setDirectives((prev) => [...prev, newDir]);
			} catch (err) {
				console.error("[InspirationPanel] Add directive failed:", err);
			}
		}, [adapter]);
		(0, import_react$1.useCallback)(async (id, active) => {
			if (!adapter?.updateCurationDirective) return;
			try {
				await adapter.updateCurationDirective({
					id,
					active
				});
				setDirectives((prev) => prev.map((d) => d.id === id ? {
					...d,
					active
				} : d));
			} catch (err) {
				console.error("[InspirationPanel] Toggle directive failed:", err);
			}
		}, [adapter]);
		(0, import_react$1.useCallback)(async (id) => {
			if (!adapter?.deleteCurationDirective) return;
			try {
				await adapter.deleteCurationDirective({ id });
				setDirectives((prev) => prev.filter((d) => d.id !== id));
			} catch (err) {
				console.error("[InspirationPanel] Delete directive failed:", err);
			}
		}, [adapter]);
		(0, import_react$1.useMemo)(() => {
			if (cards.length > 0) buildFallbackMapping(cards.map((c) => c.cardId));
		}, [cards]);
		return null;
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/pages/inspiration.tsx
function InspirationPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InspirationPanel, {});
}
var import_jsx_runtime;
//#endregion
__esmMin((() => {
	require_react();
	init_inspiration_panel();
	import_jsx_runtime = require_jsx_runtime();
}))();
export { InspirationPage };
