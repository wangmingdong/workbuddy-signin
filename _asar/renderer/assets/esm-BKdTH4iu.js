import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_react_dom } from "./react-dom-IYSM6kDg.js";
import { n as require_debounce, t as require_throttle } from "./throttle-mAPE4S6V.js";
import { t as require_classnames } from "./classnames-BYn3_ESJ.js";
import { i as __extends, l as __rest, p as init_tslib_es6, t as __assign, u as __spreadArray } from "./tslib.es6-8NkKEYUK.js";
import { $ as u$10, At as l$13, B as v$7, Bt as tdw, Ct as init_esm$4, D as E$8, Dt as f$10, E as n$12, Et as S$8, Ft as o$12, G as E$7, H as t$12, K as R$4, O as O$4, Ot as h$6, Pt as i$18, S as ae, U as C$7, V as A$5, W as D$8, X as l$12, Y as g$7, Z as m$8, _t as q$3, bt as v$6, cn as Browser, dt as e$13, et as v$8, ft as t$14, gt as b$6, h as O$3, ht as initI18n, it as _$5, jt as m$7, k as _$8, l as _$6, ln as init_i18nextBrowserLanguageDetector, m as c$14, mt as translate, nt as E$6, o as a$20, ot as A$6, p as r$16, pt as init_esm$2, q as b$7, r as E$9, rt as N$7, t as init_esm$3, tt as y$6, ut as t$13, wt as openUrl, z as _$7 } from "./esm-cVQVEiWG.js";
import { n as init_esm$5, r as ua } from "./esm-mgJiqgJI.js";
import { n as memoizeOne, t as init_memoize_one_esm } from "./memoize-one.esm-vG75mWtZ.js";
import { t as require_prop_types } from "./prop-types-DD6A3Rdg.js";
import { r as require_assignWith, t as require_set } from "./set-CN3NcsdP.js";
import { n as init_i18next, r as instance } from "./i18next-DWuHLQMZ.js";
import { n as purify, t as init_purify_es } from "./purify.es-CUVKlOTh.js";
import { A as Te$2, C as s$10, D as u$13, E as e$15, F as p$10, H as m$11, I as a$23, L as m$9, M as init_dist, N as PowerPointMimeTypes, O as Ee$2, P as e$14, R as Pn$1, S as l$14, T as u$11, V as m$12, _ as init_esm$6, a as d$7, b as y$7, c as T$4, d as G$2, f as T$3, g as De$1, h as x$4, i as m$10, j as s$11, k as Me$1, l as l$15, n as getAidForReport, o as u$12, p as W$2, r as init_esm$7, s as a$21, t as init_esm$8, u as n$13, v as C$8, w as a$22, x as o$13, y as l$16, z as q$4 } from "./esm-Bj6OGMuY.js";
import { i as useDebounce, o as useAsyncFn, t as init_esm$9 } from "./esm-BGAOtrY0.js";
//#region ../../node_modules/@tencent/ai-component-pc/dist/esm/chunks/index-c23defda.js
function e$12(t) {
	return e$12 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
		return typeof e;
	} : function(e) {
		return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, e$12(t);
}
function t$11(t) {
	var a = function(t, a) {
		if ("object" != e$12(t) || !t) return t;
		var n = t[Symbol.toPrimitive];
		if (void 0 !== n) {
			var o = n.call(t, a || "default");
			if ("object" != e$12(o)) return o;
			throw new TypeError("@@toPrimitive must return a primitive value.");
		}
		return ("string" === a ? String : Number)(t);
	}(t, "string");
	return "symbol" == e$12(a) ? a : a + "";
}
function a$19(e, a, n) {
	return (a = t$11(a)) in e ? Object.defineProperty(e, a, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[a] = n, e;
}
var n$11, o$11, i, r$15;
var init_index_c23defda = __esmMin((() => {
	n$11 = {
		universalSearchActions: {
			tooltip: {
				restore: "重新生成",
				copyLink: "复制",
				share: "分享",
				unlike: "向AI助手反馈"
			},
			feedback: { "unlike-toast": "感谢反馈!" },
			share: "分享",
			createAsDocumentTitle: "用搜索结果创建文档",
			saveAsDocument: "保存为文档",
			saveToSpace: "添加至空间",
			doc: "在线文档",
			sheet: "在线表格",
			slide: "在线幻灯片",
			smartCanvas: "智能文档",
			mindMap: "思维导图"
		},
		markdown: { table: { preview: { "footer-copy": "复制" } } },
		message: {
			"recommend-questions-tips": "你可能想问：",
			"copy-success": "复制成功"
		},
		errorMessage: {
			commonError: "请求失败",
			"create-doc-failed": "文档创建失败，请稍后重试",
			searchNotFound: "在最近的10篇文档中,没有找到相关内容",
			searchNotFoundVip: "在文档中没有找到相关内容",
			searchNotFoundUniversalRecommend: "试试全网搜",
			searchNotFoundVipRecommend: "升级SVIP解锁AI搜索全部文档能力",
			sensitiveError: "亲爱的用户你好，让我们换个话题吧"
		},
		"当前空间": "当前空间",
		searchBox: {
			hunyuan: "混元",
			hunyuanTip: "适合大部分任务",
			deepSeek: "DeepSeek-V3.1",
			deepSeekTip: "多种场景回答更精炼",
			hunyuanT1: "混元（T1）",
			hunyuanT1Tip: "混元深度思考模式",
			deepSeekThinking: "DeepSeek-V3.1-Thinking",
			deepSeekThinkingTip: "更快深度思考推理",
			mydoc: "全部文档",
			partDocs: "指定范围",
			myDocTips: "选择“全部文档”时，会使用你“有查看权限”的文档进行回复。",
			network: "全网资料",
			wiki: "指定空间",
			currentWiki: "当前空间",
			history: "AI 搜索历史",
			clearHistory: "清空记录",
			hideHistory: "隐藏",
			showMore: "显示更多",
			"placeholder-space": "根据你的空间、文档或全网资料，为你提供答案",
			placeholder: "根据你的文档或全网资料，为你提供答案",
			aiCreating: "AI 创作中...",
			append: "继续提问...",
			send: "发送",
			stop: "停止"
		},
		"base-on": "基于{{range}}",
		"switch-search-range": "切换搜索范围",
		"search-import-card": {
			"vip-importing-tips": "正在根据你的全部文档建立AI检索",
			"none-vip-importing-tips": "正在根据你的最近10篇文档建立AI检索",
			"warm-tips": "初始化配置中，文档较多，你可以最小化配置先看搜索结果",
			minimize: "最小化",
			"loading-wait-tips": "初始化配置中，大概需要几分钟时间...",
			"analysis-tips": "AI助手正在解析文档...",
			"indexing-tips": "根据你的提问进行AI检索",
			"generate-tips": "生成AI搜索结果",
			"upgrade-vip-tips": "升级SVIP解锁AI搜索全部文档能力",
			"mini-card": {
				"init-tips": "初始化配置中...",
				"indexing-tips": "正在建立AI检索",
				collapse: "收起"
			}
		},
		authCard: {
			title: "AI文档助手授权",
			"title-desc": "这么做可能会将你的敏感信息提供给此网站或应用，我们会采用严格措施确保其安全，不会用于模型训练。",
			"content-title": "授权AI文档助手使用你的腾讯文档权限",
			"content-title-local": "授权AI文档助手使用你的本地文档权限",
			"content-title-desc": "你可以随时在隐私>AI文档助手开关查看或关闭访问权限",
			"list-item": {
				doc: "查看、编辑在线文档内容",
				sheet: "查看、编辑在线表格内容",
				slide: "查看、编辑在线幻灯片内容",
				smartCanvas: "查看、编辑智能文档内容",
				mindMap: "查看、编辑思维导图内容",
				pdf: "查看PDF内容",
				"local-doc": "查看、编辑本地Word内容",
				"local-pdf": "查看、编辑本地PDF内容",
				"local-sheet": "查看、编辑本地Excel内容",
				"local-slide": "查看、编辑本地PPT内容",
				voiceNotes: "查看、编辑速记内容",
				form: "查看、编辑收集表内容",
				smartsheet: "查看、编辑智能表格内容"
			},
			"scope-desc": "请你知悉，启用该功能后，AI文档助手将检索你的文档（包括但不限于你创建、有编辑或查看权限），并依据你输入的指令生成特定内容，AI文档助手处理的文档中可能包含个人信息（含敏感个人信息）或其他数据，使用该功能意味着你理解并授权该数据处理行为。我们仅依据你的指示处理有关数据，请你注意不要侵犯他人的隐私与个人信息权益。若你希望AI文档助手对上述权限文档进行搜索并生成内容，你应保证你对其所包含的任何内容的任何形式使用均已取得所有必要的合法权利。",
			"agree-button": "同意授权",
			"agree-desc": "我已阅读并同意腾讯文档的",
			and: "和",
			serviceAgreement: "服务协议",
			privacyAgreement: "隐私政策"
		},
		feedback: {
			"group-title": { "feedback-title": "反馈问题" },
			"button-text": { submit: "提交" }
		},
		file: { status: {
			uploading: "上传中",
			"upload-success": "上传成功",
			"upload-failed": "文档上传失败，请重试",
			prepare: "待解析",
			embedding: "解析中",
			"embedding-success": "解析成功",
			"embedding-failed": "文档解析失败，请重试"
		} },
		"space-list": "空间列表",
		reference: {
			"reference-count": "引用 {{count}} 篇资料作为参考",
			"reference-count-full": "共参考 {{count}} 篇参考资料",
			saveAsDoc: "保存为文档",
			saveToSpace: "添加至空间"
		},
		referenceSources: {
			link: "网页链接",
			wechat: "微信公众号",
			docs: "在线文档",
			wenku: "腾讯文库"
		},
		"message-buttons": {
			"append-remark": "插入备注",
			"create-slide": "生成PPT",
			"create-form": "生成收集表",
			"create-sheet": "生成表格",
			"create-resume": "生成简历",
			"create-smart-canvas": "生成智能文档",
			"create-document": "生成文档",
			"create-mindmap": "生成思维导图",
			"insert-content": "插入正文",
			"outline-create-all-document": "基于当前大纲生成全文",
			"create-flow-chart": "生成流程图"
		},
		"files-message": { title: "已为你生成文档:" },
		"category-name": {
			mindMap: "思维导图",
			flowChart: "流程图",
			ppt: "幻灯片",
			doc: "文档"
		},
		toast: {
			"create-file-failed": "创建{{type}}失败，请尝试重新生成",
			"bot-deepseek-thinking-not-support": "本场景暂不支持DeepSeek,已切换混元模型服务"
		},
		slide: {
			"theme-card": {
				title: "主题",
				placeholder: "输入主题: 如{{content}}",
				ppt: "图书馆调研",
				mind: "学习游泳计划",
				flowchart: "发票报销流程",
				document: "AI知识库",
				"attachment-upload": "上传参考材料",
				"continue-generate-slide": "继续生成PPT",
				"continue-generate-mind": "继续生成思维导图",
				"continue-generate-flowchart": "继续生成流程图",
				"continue-generate-document": "继续生成文档",
				requirement: "创作要求"
			},
			"external-interaction-card": {
				"change-theme-color-btn-text": "切换配色",
				"change-template-btn-text": "切换模板",
				"change-font-size-btn-text": "切换字体",
				"check-layout-btn-text": "排版检查",
				"correct-text-btn-text": "文本订正"
			},
			"requirement-selector": {
				"page-num": {
					title: "页数",
					options: {
						default: "默认",
						page10: "1-10页",
						page20: "10-20页",
						page30: "20-30页",
						page40: "30-40页"
					}
				},
				"template-style": { title: "模板风格" },
				"template-color": { title: "模板颜色" },
				"writing-style": {
					title: "写作风格",
					options: {
						default: "默认",
						yansu: "严肃",
						huopo: "活泼",
						xueshu: "学术"
					}
				},
				"image-generation": {
					title: "智能配图",
					options: {
						default: "默认",
						auto: "智能配图"
					}
				},
				"generation-mode": {
					title: "生成方式",
					options: {
						faithful: "贴近材料",
						adaptive: "适当改写"
					}
				}
			},
			"ppt-config-menu": { title: "自定义生成效果" },
			templates: {
				"list-a": {
					name1: "蓝色通用PPT模板",
					name2: "小清新通用PPT模板",
					name3: "深蓝色通用PPT模板",
					name4: "蓝黄渐变风PPT模板",
					name5: "蓝色简约风PPT模板",
					name6: "紫色通用PPT模板",
					name7: "创意绿色通用PPT模板",
					name8: "蓝色线条PPT模板",
					name9: "蓝绿色通用PPT模板",
					name10: "科技风通用PPT模板",
					name11: "蓝色简约通用PPT模板",
					name12: "炫彩通用PPT模板",
					name13: "黑蓝通用PPT模板",
					name14: "绿色通用PPT模板",
					name15: "蓝色科技风通用PPT模板"
				},
				"list-b": {
					name1: "淡蓝色通用总结汇报模板",
					name2: "互联网行业总结",
					name3: "商务汇报模板",
					name4: "商务汇报计划书",
					name5: "红色通用总结汇报模板",
					name6: "粉紫色通用总结汇报模板",
					name7: "年度员工大会",
					name8: "商务汇报模板",
					name9: "通用总结汇报",
					name10: "黄色通用总结汇报模板",
					name11: "通用汇报总结模板",
					name12: "新品发布会",
					name13: "行业品牌发布会",
					name14: "互联网新品发布",
					name15: "通用总结汇报模板",
					name16: "绿色通用总结汇报模板"
				},
				"topic-a": "助手精选",
				"topic-b": "智能推荐"
			},
			style: {
				government: "政务风",
				minimalist: "简约风",
				business: "商务风",
				"fresh-natural": "小清新",
				tech: "科技风",
				cartoon: "卡通风",
				creative: "创意风",
				"flat-design": "扁平风"
			},
			color: {
				red: "红色",
				blue: "蓝色",
				gradient: "渐变",
				green: "绿色",
				orange: "橙色",
				yellow: "黄色",
				gray: "灰色",
				black: "黑色",
				white: "白色",
				purple: "紫色",
				cyan: "青色",
				"black-gold": "黑金",
				pink: "粉色",
				brown: "棕色",
				gold: "金色",
				"light-color": "浅色"
			}
		},
		"ux-atom": {
			"uploader-box": {
				"online-tencent-docs": "腾讯文档",
				"local-file": "本地文件",
				link: "链接",
				"text-input": "输入文本",
				"beautify-ppt": "上传已有PPT",
				image: "图片",
				"online-tencent-docs-desc": "选择腾讯文档作为参考资料",
				"local-file-desc": "支持{{ format }}等格式",
				"link-desc": "上传网页链接作为参考材料",
				"text-input-desc": "复制长文内容，生成PPT",
				"beautify-ppt-desc": "上传PPT，自动美化排版样式",
				"beautify-ppt-tag": "智能美化",
				"image-desc": "支持图片格式",
				"beautify-ppt-error": "上传失败",
				"beautify-ppt-loading": "PPT上传中...",
				"text-input-placeholder": "在此输入或粘贴文本内容(提纲/文档/参考资料),支持最多50000的长文本内容",
				"text-input-max-count": "文本内容长度不能超过{{ count }}",
				"send-failed-due-to-attachment": "存在上传/解析失败文件，请检查后重试"
			},
			"icon-uploader": { "attachment-upload-tips": "上传材料" },
			"upload-size-imit": "已过滤超出{{size}}MB的文档",
			"add-link": {
				"tips-msg": "请输入正确的链接格式",
				placeholder: "粘贴或输入链接"
			}
		},
		desktop: { "create-tab": {
			slide: {
				placeholder: "输入你要创作的PPT主题",
				"tab-header": {
					theme: "主题生成",
					template: "模板生成"
				},
				upload: "上传模板",
				more: "更多",
				"based-on-attachment": "基于以上材料创作一篇PPT"
			},
			doc: {
				placeholder: "输入你要创作的文档主题",
				"based-on-attachment": "基于以上材料创作一篇文档"
			},
			mind: {
				placeholder: "输入你要创作的思维导图主题",
				"based-on-attachment": "基于以上材料创作一篇思维导图"
			}
		} },
		"use-file-import": { status: {
			uploading: "上传中",
			"upload-success": "上传成功",
			"upload-failed": "文档上传失败，请重试",
			prepare: "待解析",
			embedding: "解析中",
			"embedding-success": "解析成功",
			"embedding-failed": "文档解析失败，请重试"
		} },
		"function-call": {
			slide: { "not-support-case-of-slide": "请告诉我您的PPT主题是什么，明确主题后，我们再一起开始吧！" },
			mind: { "not-support-case-of-mind": "请告诉我您的思维导图主题是什么，明确主题后，我们再一起开始吧！" },
			flow: { "not-support-case-of-flow": "请告诉我您的流程图主题是什么，明确主题后，我们再一起开始吧！" },
			default: "请告诉我您的主题是什么，明确主题后，我们再一起开始吧！"
		},
		"guide-and-feedback-dropdown": {
			title: "帮助与反馈",
			guidance: "使用指南",
			feedback: "反馈问题"
		},
		"ai-content-notice": "内容由AI生成，仅供参考",
		"pipeline-button": {
			thinking: "深度思考",
			network: "联网搜索"
		}
	}, o$11 = {
		universalSearchActions: {
			tooltip: {
				restore: "重新生成",
				copyLink: "複製",
				share: "分享",
				unlike: "向AI助手反饋"
			},
			feedback: { "unlike-toast": "感謝反饋!" },
			share: "分享",
			createAsDocumentTitle: "用搜索結果創建文檔",
			saveAsDocument: "保存為文件",
			saveToSpace: "添加至空間",
			doc: "在線文檔",
			sheet: "在線表格",
			slide: "在線幻燈片",
			smartCanvas: "智能文檔",
			mindMap: "思維導圖"
		},
		markdown: { table: { preview: { "footer-copy": "複製" } } },
		message: {
			"recommend-questions-tips": "你可能想問：",
			"copy-success": "複製成功"
		},
		errorMessage: {
			commonError: "請求失敗",
			"create-doc-failed": "文檔創建失敗，請稍後重試",
			searchNotFound: "在最近的10篇文檔中,沒有找到相關內容",
			searchNotFoundVip: "在文檔中沒有找到相關內容",
			searchNotFoundUniversalRecommend: "試試全網搜",
			searchNotFoundVipRecommend: "升級SVIP解鎖AI搜索全部文檔能力",
			sensitiveError: "親愛的用戶你好，讓我們換個話題吧"
		},
		"当前空间": "當前空間",
		searchBox: {
			hunyuan: "混元",
			hunyuanTip: "適合大部分任務",
			deepSeek: "DeepSeek-V3.1",
			deepSeekTip: "多種情境回應更精煉",
			hunyuanT1: "混元（T1）",
			hunyuanT1Tip: "混元深度思考模式",
			deepSeekThinking: "DeepSeek-V3.1-Thinking",
			deepSeekThinkingTip: "更快速的深度思考與推理",
			mydoc: "全部文檔",
			partDocs: "指定範圍",
			myDocTips: "選擇“全部文檔”時，會使用你“有查看權限”的文檔進行回覆。",
			network: "全網資料",
			wiki: "指定空間",
			currentWiki: "當前空間",
			history: "AI搜索歷史",
			clearHistory: "清空記錄",
			hideHistory: "隱藏",
			showMore: "顯示更多",
			"placeholder-space": "根據你的空間、文檔或全網資料，爲你提供答案",
			placeholder: "根據你的文檔或全網資料，爲你提供答案",
			aiCreating: "AI 創作...",
			append: "繼續提問…",
			send: "發送",
			stop: "停止"
		},
		"base-on": "基於{{range}}",
		"switch-search-range": "切換搜索範圍",
		"search-import-card": {
			"vip-importing-tips": "正在根據你的全部文檔建立AI檢索",
			"none-vip-importing-tips": "正在根據你的最近10篇文檔建立AI檢索",
			"warm-tips": "初始化配置中，文檔較多，你可以最小化配置先看搜索結果",
			minimize: "最小化",
			"loading-wait-tips": "初始化配置中，大概需要幾分鐘時間...",
			"analysis-tips": "AI助手正在解析文檔...",
			"indexing-tips": "根據你的提問進行AI檢索",
			"generate-tips": "生成AI搜索結果",
			"upgrade-vip-tips": "升級SVIP解鎖AI搜索全部文檔能力",
			"mini-card": {
				"init-tips": "初始化配置中...",
				"indexing-tips": "正在建立AI檢索",
				collapse: "收起"
			}
		},
		authCard: {
			title: "AI文檔助手授權",
			"title-desc": "這麼做可能會將你的敏感信息提供給此網站或應用，我們會採用嚴格措施確保其安全，不會用於模型訓練。",
			"content-title": "授權AI文檔助手使用你的騰訊文檔權限",
			"content-title-local": "授權AI文件助手使用你的本機文件權限",
			"content-title-desc": "你可以隨時在隱私>AI文檔助手開關查看或關閉訪問權限",
			"list-item": {
				doc: "查看、編輯在線文檔內容",
				sheet: "查看、編輯在線表格內容",
				slide: "查看、編輯在線幻燈片內容",
				smartCanvas: "查看、編輯智能文檔內容",
				mindMap: "查看、編輯思維導圖內容",
				pdf: "查看PDF內容",
				"local-doc": "檢視、編輯本機Word內容",
				"local-pdf": "檢視、編輯本機PDF內容",
				"local-sheet": "檢視、編輯本機Excel內容",
				"local-slide": "檢視、編輯本機PPT內容",
				voiceNotes: "查看、編輯速記內容",
				form: "查看、編輯收集表內容",
				smartsheet: "查看、編輯智慧表格內容"
			},
			"scope-desc": "請你知悉，啓用該功能後，AI文檔助手將檢索你的文檔（包括但不限於你創建、有編輯或查看權限），並依據你輸入的指令生成特定內容，AI文檔助手處理的文檔中可能包含個人信息（含敏感個人信息）或其他數據，使用該功能意味着你理解並授權該數據處理行爲。我們僅依據你的指示處理有關數據，請你注意不要侵犯他人的隱私與個人信息權益。若你希望AI文檔助手對上述權限文檔進行搜索並生成內容，你應保證你對其所包含的任何內容的任何形式使用均已取得所有必要的合法權利。",
			and: "和",
			"agree-button": "同意授權",
			"agree-desc": "我已閱讀並同意騰訊文檔的",
			serviceAgreement: "服務協議",
			privacyAgreement: "隱私政策"
		},
		feedback: {
			"group-title": { "feedback-title": "反饋問題" },
			"button-text": { submit: "提交" }
		},
		file: { status: {
			uploading: "上傳中",
			"upload-success": "上傳成功",
			"upload-failed": "文檔上傳失敗，請重試",
			prepare: "待解析",
			embedding: "解析中",
			"embedding-success": "解析成功",
			"embedding-failed": "文檔解析失敗，請重試"
		} },
		"space-list": "空間列表",
		reference: {
			"reference-count": "引用 {{count}} 篇資料作為參考",
			"reference-count-full": "共參考 {{count}} 篇參考資料",
			saveAsDoc: "保存為文檔",
			saveToSpace: "添加至空間"
		},
		referenceSources: {
			link: "網頁連結",
			wechat: "微信公眾號",
			docs: "線上文件",
			wenku: "騰訊文庫"
		},
		"message-buttons": {
			"append-remark": "插入備註",
			"create-slide": "生成PPT",
			"create-form": "生成收集表",
			"create-sheet": "生成表格",
			"create-resume": "生成簡歷",
			"create-smart-canvas": "生成智能文檔",
			"create-document": "生成文檔",
			"create-mindmap": "生成思維導圖",
			"insert-content": "插入正文",
			"outline-create-all-document": "基於當前大綱生成全文",
			"create-flow-chart": "生成流程圖"
		},
		"files-message": { title: "已為你生成文檔:" },
		"category-name": {
			mindMap: "思維導圖",
			flowChart: "流程圖",
			ppt: "幻燈片",
			doc: "文檔"
		},
		toast: {
			"create-file-failed": "創建{{type}}失敗，請嘗試重新生成",
			"bot-deepseek-thinking-not-support": "本場景暫不支持DeepSeek,已切換混元模型服務"
		},
		slide: {
			"theme-card": {
				title: "主題",
				placeholder: "輸入主題: 如{{content}}",
				ppt: "圖書館調研",
				mind: "學習游泳計劃",
				flowchart: "發票報銷流程",
				document: "AI知識庫",
				"attachment-upload": "上傳參考材料",
				"continue-generate-slide": "繼續生成PPT",
				"continue-generate-mind": "繼續生成思維導圖",
				"continue-generate-flowchart": "繼續生成流程圖",
				"continue-generate-document": "繼續生成文檔",
				requirement: "創作要求"
			},
			"external-interaction-card": {
				"change-theme-color-btn-text": "切換配色",
				"change-template-btn-text": "切換模板",
				"change-font-size-btn-text": "切換字體",
				"check-layout-btn-text": "排版檢查",
				"correct-text-btn-text": "文本訂正"
			},
			"requirement-selector": {
				"page-num": {
					title: "頁數",
					options: {
						default: "默認",
						page10: "1-10頁",
						page20: "10-20頁",
						page30: "20-30頁",
						page40: "30-40頁"
					}
				},
				"template-style": { title: "模板風格" },
				"template-color": { title: "模板顏色" },
				"writing-style": {
					title: "寫作風格",
					options: {
						default: "默認",
						yansu: "嚴肅",
						huopo: "活潑",
						xueshu: "學術"
					}
				},
				"image-generation": {
					title: "智能配圖",
					options: {
						default: "默認",
						auto: "智能配圖"
					}
				},
				"generation-mode": {
					title: "生成方式",
					options: {
						faithful: "貼近材料",
						adaptive: "適當改寫"
					}
				}
			},
			"ppt-config-menu": { title: "自定義生成效果" },
			templates: {
				"list-a": {
					name1: "藍色通用PPT模板",
					name2: "小清新通用PPT模板",
					name3: "深藍色通用PPT模板",
					name4: "藍黃漸變風PPT模板",
					name5: "藍色簡約風PPT模板",
					name6: "紫色通用PPT模板",
					name7: "創意綠色通用PPT模板",
					name8: "藍色線條PPT模板",
					name9: "藍綠色通用PPT模板",
					name10: "科技風通用PPT模板",
					name11: "藍色簡約通用PPT模板",
					name12: "炫彩通用PPT模板",
					name13: "黑藍通用PPT模板",
					name14: "綠色通用PPT模板",
					name15: "藍色科技風通用PPT模板"
				},
				"list-b": {
					name1: "淡藍色通用總結匯報模板",
					name2: "互聯網行業總結",
					name3: "商務彙報模板",
					name4: "商務彙報計劃書",
					name5: "紅色通用總結匯報模板",
					name6: "粉紫色通用總結匯報模板",
					name7: "年度員工大會",
					name8: "商務彙報模板",
					name9: "通用總結匯報",
					name10: "黃色通用總結匯報模板",
					name11: "通用匯報總結模板",
					name12: "新品發佈會",
					name13: "行業品牌發佈會",
					name14: "互聯網新品發佈",
					name15: "通用總結匯報模板",
					name16: "綠色通用總結匯報模板"
				},
				"topic-a": "助手精選",
				"topic-b": "智能推薦"
			},
			style: {
				government: "政務風",
				minimalist: "簡約風",
				business: "商務風",
				"fresh-natural": "小清新",
				tech: "科技風",
				cartoon: "卡通風",
				creative: "創意風",
				"flat-design": "扁平風"
			},
			color: {
				red: "紅色",
				blue: "藍色",
				gradient: "漸變",
				green: "綠色",
				orange: "橙色",
				yellow: "黃色",
				gray: "灰色",
				black: "黑色",
				white: "白色",
				purple: "紫色",
				cyan: "青色",
				"black-gold": "黑金",
				pink: "粉色",
				brown: "棕色",
				gold: "金色",
				"light-color": "淺色"
			}
		},
		"ux-atom": {
			"uploader-box": {
				"online-tencent-docs": "騰訊文檔",
				"local-file": "本地文件",
				link: "鏈接",
				"text-input": "輸入文本",
				"beautify-ppt": "上傳已有PPT",
				image: "圖片",
				"online-tencent-docs-desc": "選擇騰訊文檔作為參考資料",
				"local-file-desc": "支持{{ format }}等格式",
				"link-desc": "上傳網頁鏈接作為參考材料",
				"text-input-desc": "複製長文內容，生成PPT",
				"beautify-ppt-desc": "上傳PPT，自動美化排版樣式",
				"beautify-ppt-tag": "智能美化",
				"image-desc": "支持圖片格式",
				"beautify-ppt-error": "上傳失敗",
				"beautify-ppt-loading": "PPT上傳中...",
				"text-input-placeholder": "在此輸入或粘貼文本內容(提綱/文檔/參考資料),支持最多50000的長文本內容",
				"text-input-max-count": "文本內容長度不能超過{{ count }}",
				"send-failed-due-to-attachment": "存在上傳/解析失敗文件，請檢查後重試"
			},
			"icon-uploader": { "attachment-upload-tips": "上傳材料" },
			"upload-size-imit": "已過濾超過{{size}}MB的文件",
			"add-link": {
				"tips-msg": "請輸入正確的連結格式",
				placeholder: "貼上或輸入連結"
			}
		},
		desktop: { "create-tab": {
			slide: {
				placeholder: "輸入你要創作的PPT主題",
				"tab-header": {
					theme: "主題生成",
					template: "模板生成"
				},
				upload: "上傳模板",
				more: "更多",
				"based-on-attachment": "基于以上材料創作一篇PPT"
			},
			doc: {
				placeholder: "輸入你要創作的文檔主題",
				"based-on-attachment": "基于以上材料創作一篇文檔"
			},
			mind: {
				placeholder: "輸入你要創作的思維導圖主題",
				"based-on-attachment": "基于以上材料創作一篇思維導圖"
			}
		} },
		"use-file-import": { status: {
			uploading: "上傳中",
			"upload-success": "上傳成功",
			"upload-failed": "上傳失敗，請重試",
			prepare: "解析中",
			embedding: "解析中",
			"embedding-success": "解析成功",
			"embedding-failed": "解析失敗，請重試"
		} },
		"function-call": {
			slide: { "not-support-case-of-slide": "請告訴我您的PPT主題是什麼，明確主題後，我們再一起開始吧！" },
			mind: { "not-support-case-of-mind": "請告訴我您的思維導圖主題是什麼，明確主題後，我們再一起開始吧！" },
			flow: { "not-support-case-of-flow": "請告訴我您的流程圖主題是什麼，明確主題後，我們再一起開始吧！" },
			default: "請告訴我您的主題是什麼，明確主題後，我們再一起開始吧！"
		},
		"guide-and-feedback-dropdown": {
			title: "幫助與反饋",
			guidance: "使用指南",
			feedback: "反饋問題"
		},
		"ai-content-notice": "內容由AI生成，僅供參考",
		"pipeline-button": {
			thinking: "深度思考",
			network: "聯網搜索"
		}
	}, i = "ai-component-pc", r$15 = {
		"en-US": a$19({}, i, {
			universalSearchActions: {
				tooltip: {
					restore: "Rewrite",
					copyLink: "Copy",
					share: "Share",
					unlike: "Feedback to AI assistant"
				},
				feedback: { "unlike-toast": "Thank you for feedback!" },
				share: "Share",
				createAsDocumentTitle: "Create document with search results",
				saveAsDocument: "Save as document",
				saveToSpace: "Save to space",
				doc: "Document",
				sheet: "Sheet",
				slide: "Slide",
				smartCanvas: "Smart Canvas",
				mindMap: "Mind Map"
			},
			markdown: { table: { preview: { "footer-copy": "Copy" } } },
			message: {
				"recommend-questions-tips": "You may want to ask:",
				"copy-success": "Copied successfully"
			},
			errorMessage: {
				commonError: "Request failed",
				"create-doc-failed": "Document creation failed, please try again later",
				searchNotFound: "No related content found in the last 10 viewed documents.",
				searchNotFoundVip: "No related content found in your documents.",
				searchNotFoundUniversalRecommend: "Try global web search",
				searchNotFoundVipRecommend: "Upgrade SVIP to unlock AI search for all documents.",
				sensitiveError: "Dear user, let's change the topic."
			},
			"当前空间": "Current Space",
			searchBox: {
				hunyuan: "Hunyuan",
				hunyuanTip: "Suitable for most tasks",
				deepSeek: "DeepSeek-v3.1",
				deepSeekTip: "More concise answers across various scenarios",
				hunyuanT1: "Hunyuan (T1)",
				hunyuanT1Tip: "Hunyuan deep thinking mode",
				deepSeekThinking: "DeepSeek-V3.1-Thinking",
				deepSeekThinkingTip: "Faster deep thinking and reasoning",
				mydoc: "My docs",
				partDocs: "Specify docs",
				myDocTips: "When you select “All Documents”, you will reply using the documents for which you have “viewing permissions”.",
				network: "Web",
				wiki: "Space",
				currentWiki: "Current Space",
				history: "AI search history",
				clearHistory: "Clear history",
				hideHistory: "Hide",
				showMore: "Show more",
				"placeholder-space": "Based on your space, documents or materials across the entire web, we will provide you with answers",
				placeholder: "Provide answers for you based on your document or the whole network data",
				aiCreating: "AI in the making...",
				append: "Continue asking...",
				send: "Send",
				stop: "Stop"
			},
			"base-on": "base on {{range}}",
			"switch-search-range ": "switch Range",
			authCard: {
				title: "AI document assistant authorization",
				"title-desc": "This may provide your sensitive information to this website or application, and we will use strict measures to ensure its security, not used for model training.",
				"content-title": "Authorize \"AI document assistant\" to use your Tencent document permissions, please confirm you have the right to authorize:",
				"content-title-local": "Authorize AI Document Assistant to use your local document permissions",
				"content-title-desc": "You can view or close access permissions at Privacy > AI document assistant switch at any time",
				"list-item": {
					doc: "View and edit online document content",
					sheet: "View and edit online spreadsheet content",
					slide: "View and edit online slide content",
					smartCanvas: "View and edit smart canvas content",
					mindMap: "View and edit mind map content",
					pdf: "View PDF content",
					"local-doc": "View and edit local Word content",
					"local-pdf": "View and edit local PDF content",
					"local-sheet": "View and edit local Excel content",
					"local-slide": "View and edit local PPT content",
					voiceNotes: "View and edit voice notes content",
					form: "View and edit form content",
					smartsheet: "View and edit smart sheet content"
				},
				"scope-desc": "Please be informed that after enabling this function, the AI Document Assistant will retrieve your documents (including but not limited to those created by you, with editing or viewing permissions), and generate specific content based on the instructions you input. The documents processed by the AI Document Assistant may contain personal information (including sensitive personal information) or other data. Using this function means that you understand and authorize the data processing behavior. We only process the relevant data in accordance with your instructions. Please be careful not to infringe upon others' privacy and personal information rights. If you wish the AI Document assistant to search for and generate content for the above-mentioned permission documents, you should ensure that you have obtained all necessary legal rights for any form of use of any content contained therein.",
				and: "And",
				"agree-button": "Agree to authorize",
				"agree-desc": "I have read and agree to Tencent document's",
				serviceAgreement: "Service Agreement",
				privacyAgreement: "Privacy Policy"
			},
			"search-import-card": {
				"vip-importing-tips": "Building AI search for all your documents",
				"none-vip-importing-tips": "Building AI search for your last 10 documents",
				"warm-tips": "Initializing configuration, there are many documents, you can minimize the configuration to see the search results first",
				minimize: "Minimize",
				"loading-wait-tips": "Initializing configuration, it may take a few minutes...",
				"analysis-tips": "AI assistant is analyzing documents...",
				"indexing-tips": "AI search for your questions",
				"generate-tips": "Generate AI search results",
				"upgrade-vip-tips": "Upgrade SVIP to unlock AI search for all documents",
				"mini-card": {
					"init-tips": "Initializing configuration...",
					"indexing-tips": "Building AI search",
					collapse: "Collapse"
				}
			},
			feedback: {
				"group-title": { "feedback-title": "Feedback" },
				"button-text": { submit: "Submit" }
			},
			file: { status: {
				uploading: "Uploading",
				"upload-success": "Upload successful",
				"upload-failed": "Document upload failed, please retry",
				prepare: "Pending parsing",
				embedding: "Parsing",
				"embedding-success": "Parsing successful",
				"embedding-failed": "Parse failed, please retry"
			} },
			"space-list": "WIKI",
			reference: {
				"reference-count": "Reference {{count}} articles as reference",
				"reference-count-full": "Total reference {{count}} articles",
				saveAsDoc: "Save as document",
				saveToSpace: "Save to space"
			},
			referenceSources: {
				link: "Web Link",
				wechat: "WeChat Official Account",
				docs: "Online Documents",
				wenku: "Tencent Wenku"
			},
			"message-buttons": {
				"append-remark": "Append Remark",
				"create-slide": "Generate PPT",
				"create-form": "Generate Form",
				"create-sheet": "Generate Sheet",
				"create-resume": "Generate Resume",
				"create-smart-canvas": "Generate SmartCanvas",
				"create-document": "Generate Document",
				"create-mindmap": "Generate mind map",
				"insert-content": "Insert content",
				"outline-create-all-document": "Generate full document",
				"create-flow-chart": "Generate flow chart"
			},
			"files-message": { title: "Generated documents for you:" },
			"category-name": {
				mindMap: "Mind map",
				flowChart: "Flow chart",
				ppt: "Slide",
				doc: "Document"
			},
			toast: {
				"create-file-failed": "Create {{type}} failed, please try again",
				"bot-deepseek-thinking-not-support": "This scenario does not support DeepSeek, has switched to Hunyuan model service"
			},
			slide: {
				"theme-card": {
					title: "Theme",
					placeholder: "Input theme: like {{content}}",
					ppt: "Library Research",
					mind: "Learn to Swim Plan",
					flowchart: "Invoice Reimbursement Process",
					document: "AI knowledge space",
					"attachment-upload": "Upload reference materials",
					"continue-generate-slide": "Generate PPT",
					"continue-generate-mind": "Generate MindMap",
					"continue-generate-flowchart": "Generate FlowChart",
					"continue-generate-document": "Generate Document",
					requirement: "Creation requirements"
				},
				"external-interaction-card": {
					"change-theme-color-btn-text": "Change theme color",
					"change-template-btn-text": "Change template",
					"change-font-size-btn-text": "Change font",
					"check-layout-btn-text": "Check layout",
					"correct-text-btn-text": "Correct text"
				},
				"requirement-selector": {
					"page-num": {
						title: "Page count",
						options: {
							default: "Default",
							page10: "1-10",
							page20: "10-20",
							page30: "20-30",
							page40: "30-40"
						}
					},
					"template-style": { title: "Style" },
					"template-color": { title: "Color" },
					"writing-style": {
						title: "Writing style",
						options: {
							default: "Default",
							yansu: "Serious",
							huopo: "Playful",
							xueshu: "Academic"
						}
					},
					"image-generation": {
						title: "Image generation",
						options: {
							default: "Default",
							auto: "Auto"
						}
					},
					"generation-mode": {
						title: "Generation mode",
						options: {
							faithful: "Faithful to original",
							adaptive: "Adaptive rewriting"
						}
					}
				},
				"ppt-config-menu": { title: "Custom generation effect" },
				templates: {
					"list-a": {
						name1: "Blue General PPT Template",
						name2: "Fresh and Clean General PPT Template",
						name3: "Dark Blue General PPT Template",
						name4: "Blue-Yellow Gradient PPT Template",
						name5: "Blue Simple PPT Template",
						name6: "Purple General PPT Template",
						name7: "Creative Green General PPT Template",
						name8: "Blue Line PPT Template",
						name9: "Blue-Green General PPT Template",
						name10: "Technology General PPT Template",
						name11: "Blue Simple General PPT Template",
						name12: "Colorful General PPT Template",
						name13: "Black and Blue General PPT Template",
						name14: "Green General PPT Template",
						name15: "Blue Technology General PPT Template"
					},
					"list-b": {
						name1: "Light Blue General Summary Report Template",
						name2: "Internet Industry Summary",
						name3: "Business Report Template",
						name4: "Business Report Plan",
						name5: "Red General Summary Report Template",
						name6: "Pink Violet General Summary Report Template",
						name7: "Annual Employee Conference",
						name8: "Business Report Template",
						name9: "General Summary Report",
						name10: "Yellow General Summary Report Template",
						name11: "General Report Summary Template",
						name12: "New Product Launch Conference",
						name13: "Industry Brand Launch Conference",
						name14: "Internet New Product Launch",
						name15: "General Summary Report Template",
						name16: "Green General Summary Report Template"
					},
					"topic-a": "Recommended by the Assistant",
					"topic-b": "Intelligent Recommendation"
				},
				style: {
					government: "Government Style",
					minimalist: "Minimalist Style",
					business: "Business Style",
					"fresh-natural": "Fresh & Natural Style",
					tech: "Tech Style",
					cartoon: "Cartoon Style",
					creative: "Creative Style",
					"flat-design": "Flat Design Style"
				},
				color: {
					red: "Red",
					blue: "Blue",
					gradient: "Gradient",
					green: "Green",
					orange: "Orange",
					yellow: "Yellow",
					gray: "Gray",
					black: "Black",
					white: "White",
					purple: "Purple",
					cyan: "Cyan / Teal",
					"black-gold": "Black & Gold ",
					pink: "Pink",
					brown: "Brown",
					gold: "Gold",
					"light-color": "Light Color"
				}
			},
			"ux-atom": {
				"uploader-box": {
					"online-tencent-docs": "Tencent Docs",
					"local-file": "Local File",
					link: "Link",
					"text-input": "Text input",
					"beautify-ppt": "Upload existing PPT",
					image: "Image",
					"online-tencent-docs-desc": "Select Tencent Docs as reference material",
					"local-file-desc": "Supports {{ format }} and other formats",
					"link-desc": "Upload web link as reference material",
					"text-input-desc": "Copy long text content to generate PPT",
					"beautify-ppt-desc": "Upload PPT to beautify",
					"beautify-ppt-tag": "Smart Beautify",
					"image-desc": "Supports image formats",
					"beautify-ppt-error": "Upload failed",
					"beautify-ppt-loading": "PPT uploading...",
					"text-input-placeholder": "Input or paste text content (outline/document/reference material), supports up to 50000 long text content",
					"text-input-max-count": "The text content length cannot exceed {{ count }}",
					"send-failed-due-to-attachment": "There are files that failed to upload/parse, please check and try again"
				},
				"icon-uploader": { "attachment-upload-tips": "Upload" },
				"upload-size-imit": "Filtered out documents larger than {{size}}MB",
				"add-link": {
					"tips-msg": "Please enter a valid link format",
					placeholder: "Paste or enter a link"
				}
			},
			desktop: { "create-tab": {
				slide: {
					placeholder: "Input the topic of the ppt you want to create",
					"tab-header": {
						theme: "Topic",
						template: "Template"
					},
					upload: "Upload template",
					more: "More",
					"based-on-attachment": "Create a PPT based on the above materials"
				},
				doc: {
					placeholder: "Input the topic of the document you want to create",
					"based-on-attachment": "Create a document based on the above materials"
				},
				mind: {
					placeholder: "Input the topic of the mind map you want to create",
					"based-on-attachment": "Create a mind map based on the above materials"
				}
			} },
			"use-file-import": { status: {
				uploading: "Uploading",
				"upload-success": "Upload successful",
				"upload-failed": "Document upload failed, please retry",
				prepare: "Pending parsing",
				embedding: "Parsing",
				"embedding-success": "Parsing successful",
				"embedding-failed": "Parse failed, please retry"
			} },
			"function-call": {
				slide: { "not-support-case-of-slide": "Please tell me your PPT theme, after clarifying the theme, we will start together!" },
				mind: { "not-support-case-of-mind": "Please tell me your mind map theme, after clarifying the theme, we will start together!" },
				flow: { "not-support-case-of-flow": "Please tell me your flow chart theme, after clarifying the theme, we will start together!" },
				default: "Please tell me what your topic is. After clarifying the topic, let's start together!"
			},
			"guide-and-feedback-dropdown": {
				title: "Help & Feedback",
				guidance: "Guidance",
				feedback: "Feedback"
			},
			"ai-content-notice": "Content generated by AI, for reference only",
			"pipeline-button": {
				thinking: "Deep Thinking",
				network: "Web Search"
			}
		}),
		"zh-CN": a$19({}, i, n$11),
		"zh-HK": a$19({}, i, o$11)
	};
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/dist/esm/chunks/unsupportedIterableToArray-ebb39036.js
function r$14(r, t) {
	(null == t || t > r.length) && (t = r.length);
	for (var n = 0, e = Array(t); n < t; n++) e[n] = r[n];
	return e;
}
function t$10(t, n) {
	if (t) {
		if ("string" == typeof t) return r$14(t, n);
		var e = {}.toString.call(t).slice(8, -1);
		return "Object" === e && t.constructor && (e = t.constructor.name), "Map" === e || "Set" === e ? Array.from(t) : "Arguments" === e || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e) ? r$14(t, n) : void 0;
	}
}
var init_unsupportedIterableToArray_ebb39036 = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/dist/esm/chunks/slicedToArray-e715395f.js
function t$9(t, e) {
	return function(r) {
		if (Array.isArray(r)) return r;
	}(t) || function(r, t) {
		var e = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
		if (null != e) {
			var n, o, a, l, u = [], i = !0, f = !1;
			try {
				if (a = (e = e.call(r)).next, 0 === t) {
					if (Object(e) !== e) return;
					i = !1;
				} else for (; !(i = (n = a.call(e)).done) && (u.push(n.value), u.length !== t); i = !0);
			} catch (r) {
				f = !0, o = r;
			} finally {
				try {
					if (!i && null != e.return && (l = e.return(), Object(l) !== l)) return;
				} finally {
					if (f) throw o;
				}
			}
			return u;
		}
	}(t, e) || t$10(t, e) || function() {
		throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}();
}
var init_slicedToArray_e715395f = __esmMin((() => {
	init_unsupportedIterableToArray_ebb39036();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/dist/esm/chunks/index-4a868389.js
function c$13(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		r && (n = n.filter((function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		}))), t.push.apply(t, n);
	}
	return t;
}
function s$8(e) {
	for (var r = 1; r < arguments.length; r++) {
		var n = null != arguments[r] ? arguments[r] : {};
		r % 2 ? c$13(Object(n), !0).forEach((function(r) {
			a$19(e, r, n[r]);
		})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : c$13(Object(n)).forEach((function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
		}));
	}
	return e;
}
var i$17;
var init_index_4a868389 = __esmMin((() => {
	init_index_c23defda();
	init_esm$2();
	initI18n({
		resources: r$15,
		ns: i
	});
	i$17 = function(e, t) {
		return translate(e, s$8(s$8({}, t), {}, { ns: i }));
	};
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/dist/esm/chunks/extends-559f37d0.js
function n$10() {
	return n$10 = Object.assign ? Object.assign.bind() : function(n) {
		for (var r = 1; r < arguments.length; r++) {
			var a = arguments[r];
			for (var t in a) ({}).hasOwnProperty.call(a, t) && (n[t] = a[t]);
		}
		return n;
	}, n$10.apply(null, arguments);
}
var init_extends_559f37d0 = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/utils/polyfill.js
var init_polyfill = __esmMin((() => {
	if (typeof String.prototype.repeat !== "function") String.prototype.repeat = function(count) {
		"use strict";
		if (this == null) throw new TypeError("can't convert " + this + " to object");
		var str = "" + this;
		count = +count;
		if (count != count) count = 0;
		if (count < 0) throw new RangeError("repeat count must be non-negative");
		if (count == Infinity) throw new RangeError("repeat count must be less than infinity");
		count = Math.floor(count);
		if (str.length == 0 || count == 0) return "";
		if (str.length * count >= 1 << 28) throw new RangeError("repeat count must not overflow maximum string size");
		var maxCount = str.length * count;
		count = Math.floor(Math.log(count) / Math.log(2));
		while (count) {
			str += str;
			count--;
		}
		str += str.substring(0, maxCount - str.length);
		return str;
	};
	if (typeof String.prototype.padStart !== "function") String.prototype.padStart = function padStart(maxLength, fillString) {
		maxLength = maxLength >> 0;
		fillString = String(typeof fillString !== "undefined" ? fillString : " ");
		if (this.length > maxLength) return String(this);
		else {
			maxLength = maxLength - this.length;
			if (maxLength > fillString.length) fillString += fillString.repeat(maxLength / fillString.length);
			return fillString.slice(0, maxLength) + String(this);
		}
	};
	if (typeof Array.prototype.fill !== "function") Array.prototype.fill = function fill(value) {
		if (this == null) throw new TypeError("this is null or not defined");
		var O = Object(this);
		var len = O.length >>> 0;
		var relativeStart = arguments[1] >> 0;
		var k = relativeStart < 0 ? Math.max(len + relativeStart, 0) : Math.min(relativeStart, len);
		var end = arguments[2];
		var relativeEnd = end === void 0 ? len : end >> 0;
		var final = relativeEnd < 0 ? Math.max(len + relativeEnd, 0) : Math.min(relativeEnd, len);
		while (k < final) {
			O[k] = value;
			k++;
		}
		return O;
	};
	if (typeof Element !== "undefined" && typeof Element.prototype.remove !== "function") Element.prototype.remove = function() {
		if (this.parentNode) this.parentNode.removeChild(this);
	};
	if (!Array.prototype.findIndex) Array.prototype.findIndex = function(predicate) {
		if (this == null) throw new TypeError("\"this\" is null or not defined");
		var o = Object(this);
		var len = o.length >>> 0;
		if (typeof predicate !== "function") throw new TypeError("predicate must be a function");
		var thisArg = arguments[1];
		var k = 0;
		while (k < len) {
			var kValue = o[k];
			if (predicate.call(thisArg, kValue, k, o)) return k;
			k++;
		}
		return -1;
	};
	if (!Array.prototype.includes) Array.prototype.includes = function(valueToFind, fromIndex) {
		if (this == null) throw new TypeError("\"this\" is null or not defined");
		var o = Object(this);
		var len = o.length >>> 0;
		if (len === 0) return false;
		var n = fromIndex | 0;
		var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
		function sameValueZero(x, y) {
			return x === y || typeof x === "number" && typeof y === "number" && isNaN(x) && isNaN(y);
		}
		while (k < len) {
			if (sameValueZero(o[k], valueToFind)) return true;
			k++;
		}
		return false;
	};
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/common/version.js
var version_default;
var init_version = __esmMin((() => {
	version_default = "1.28.2";
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/common/attribute.js
var attribute_default;
var init_attribute = __esmMin((() => {
	init_version();
	attribute_default = "data-dui-" + version_default.replace(/\./g, "-");
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/utils/helper.js
function emptyFn() {}
function trueFn() {
	return true;
}
function castInto(value, targetRange) {
	if (value > targetRange[1]) return targetRange[1];
	if (value < targetRange[0]) return targetRange[0];
	return value;
}
function inject(originalFn, additionalFn) {
	return function() {
		var args = [];
		for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
		var result = originalFn.apply(null, args);
		if (result !== false) additionalFn();
		return result;
	};
}
function wrapWithConfigDefaults(originalFn) {
	var defaultConfig = {};
	function configDefaults(defaults) {
		defaultConfig = defaults;
	}
	var wrappedFn = function(passedConfig) {
		return originalFn(__assign(__assign({}, defaultConfig), passedConfig));
	};
	wrappedFn.configDefaults = configDefaults;
	return wrappedFn;
}
function isDom(node) {
	return node && typeof node === "object" && node.nodeType === 1;
}
function shallowEqual(paramA, paramB) {
	if (paramA === paramB) return true;
	if (typeof paramA !== typeof paramB) return false;
	if (typeof paramA !== "object" || paramA === null || typeof paramB !== "object" || paramB === null) return false;
	var keysOfA = Object.keys(paramA);
	var keysOfB = Object.keys(paramB);
	if (keysOfA.length !== keysOfB.length) return false;
	return keysOfA.every(function(key) {
		return paramA[key] === paramB[key];
	});
}
function createContextValueGetter() {
	return memoizeOne(function(context) {
		return context;
	}, function(newArgs, lastArgs) {
		return shallowEqual(newArgs[0], lastArgs[0]);
	});
}
var isBrowser;
var init_helper = __esmMin((() => {
	init_tslib_es6();
	init_memoize_one_esm();
	isBrowser = typeof window !== "undefined" && typeof document !== "undefined";
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/utils/createElement.js
function h$5(type, props) {
	var children = [];
	for (var _i = 2; _i < arguments.length; _i++) children[_i - 2] = arguments[_i];
	var mergedProps = props;
	if ((props === null || props === void 0 ? void 0 : props.className) && typeof type === "string" && !isScopedAttributeDisabled) mergedProps[attribute_default] = props.className;
	return import_react$74.createElement.apply(void 0, __spreadArray([type, mergedProps], children));
}
function shouldDisableScopedAttribute() {
	var windowDisable;
	if (typeof window === "object") windowDisable = window.__dui_disable_scoped_attribute__;
	var globalDisable;
	if (typeof globalThis === "object") globalDisable = globalThis.__dui_disable_scoped_attribute__;
	return Boolean(windowDisable || globalDisable);
}
var import_react$74, isScopedAttributeDisabled;
var init_createElement = __esmMin((() => {
	init_tslib_es6();
	import_react$74 = /* @__PURE__ */ __toESM(require_react());
	init_attribute();
	init_helper();
	isScopedAttributeDisabled = shouldDisableScopedAttribute();
	if (isBrowser) window.__dui_disable_auto_focus_map__ = window.__dui_disable_auto_focus_map__ || {};
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/utils/style.js
function injectStyle(fileKey, css) {
	var key = version_default + "-" + fileKey;
	var domKey = isScopedAttributeDisabled ? fileKey : key;
	var hasElement = Boolean(isBrowser && document.head.querySelector("style[data-dui-key=\"" + domKey + "\"]") || !isBrowser);
	if (Array.isArray(styleRegistryManage.get(key)) && hasElement) {
		styleRegistryManage.add(key, bundledBy);
		warnRedundantInject(key);
		return;
	}
	styleRegistryManage.set(key, [bundledBy]);
	var versions = getFileVersions(fileKey);
	if (versions.length > 1) warnMultipleVersions(fileKey, versions);
	if (isBrowser) {
		var styleElement = document.createElement("style");
		styleElement.setAttribute("type", "text/css");
		styleElement.setAttribute("data-dui-key", domKey);
		styleElement.innerText = css;
		var currentVersionElementSelector = isScopedAttributeDisabled ? "style[data-dui-key]" : "style[data-dui-key|=\"" + version_default + "\"]";
		var existingElements = document.head.querySelectorAll(currentVersionElementSelector);
		if (existingElements.length > 0) {
			existingElements[existingElements.length - 1].after(styleElement);
			return;
		}
		document.head.insertBefore(styleElement, document.head.firstChild);
	} else if (typeof injectContentBeforeRoot === "function") {
		var styleElement = "<style type=\"text/css\" data-dui-key=\"" + domKey + "\">" + css + "</style>";
		injectContentBeforeRoot(styleElement);
	}
}
function warnRedundantInject(key) {
	if (!isBrowser || !styleRegistryManage.length || !Array.isArray(styleRegistryManage.get(key))) return;
	var count = styleRegistryManage.get(key).length;
	setTimeout(function() {
		if (styleRegistryManage.get(key).length > count) return;
		console.warn("[DUI] " + key + " 重复引入了 " + count + " 次");
	}, CONSOLE_DEBOUNCE);
}
function warnMultipleVersions(fileKey, versions) {
	if (!isBrowser) return;
	setTimeout(function() {
		if (getFileVersions(fileKey).length > versions.length) return;
		console.warn("[DUI] " + fileKey + " 存在多个版本:  " + versions.join("  "));
	}, CONSOLE_DEBOUNCE);
}
function getFileVersions(fileKey) {
	if (!styleRegistryManage.length) return [];
	return Object.getOwnPropertyNames(styleRegistryManage.registry).filter(function(k) {
		return k.indexOf(fileKey) !== -1;
	}).map(function(k) {
		return k.split("-")[0];
	});
}
var bundledBy, styleRegistryManage, CONSOLE_DEBOUNCE;
var init_style = __esmMin((() => {
	init_version();
	init_createElement();
	init_helper();
	bundledBy = "1";
	styleRegistryManage = new (function() {
		function StyleRegistryManage() {
			var globalObj = isBrowser ? window : globalThis;
			globalObj.__dui_style_registry__ = globalObj.__dui_style_registry__ || {};
			this.registry = globalObj.__dui_style_registry__;
		}
		Object.defineProperty(StyleRegistryManage.prototype, "length", {
			get: function() {
				return Object.keys(this.registry).length;
			},
			enumerable: false,
			configurable: true
		});
		StyleRegistryManage.prototype.set = function(key, bundledsBy) {
			this.registry[key] = bundledsBy;
		};
		StyleRegistryManage.prototype.get = function(key) {
			return this.registry[key];
		};
		StyleRegistryManage.prototype.add = function(key, bundledBy) {
			if (!this.registry[key]) this.registry[key] = [];
			this.registry[key].push(bundledBy);
		};
		return StyleRegistryManage;
	}())();
	CONSOLE_DEBOUNCE = 3e3;
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/utils/theme.js
function consumeTheme(renderProp) {
	return h$5(ThemeContext.Consumer, null, function(themeConfig) {
		return renderProp(createThemedClassNames(themeConfig));
	});
}
function appendThemeClassNames(themeConfig, className) {
	if (!className || !themeConfig) return className;
	var currentClassList = className.split(/\s+/);
	return currentClassList.concat.apply(currentClassList, currentClassList.map(function(name) {
		return themeConfig[name];
	}).filter(function(name) {
		return name;
	})).join(" ");
}
function createThemedClassNames(themeConfig) {
	return (function() {
		var classes = [];
		for (var _i = 0; _i < arguments.length; _i++) classes[_i] = arguments[_i];
		return appendThemeClassNames(themeConfig, import_classnames$17.default.apply(void 0, classes));
	});
}
var import_react$73, import_classnames$17, ThemeContext;
var init_theme = __esmMin((() => {
	init_style();
	init_createElement();
	import_react$73 = /* @__PURE__ */ __toESM(require_react());
	import_classnames$17 = /* @__PURE__ */ __toESM(require_classnames());
	init_esm$5();
	init_polyfill();
	injectStyle("common/global.css", "[data-dui-1-28-2]{font-family:-apple-system,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif,TdocsUncommon}[data-dui-1-28-2]:focus{outline:none}.__DARK__{--dui-mask-color:rgba(0,0,0,0.65);--dui-shadow-color:rgba(0,0,0,0.16);--dui-invert-filter:invert() hue-rotate(180deg) brightness(120%) grayscale()}");
	if (ua.isMac && !ua.isIPadEmulatedMac && !ua.isFirefox) injectStyle("common/anti-alias.css", "[data-dui-1-28-2]{-webkit-font-smoothing:antialiased}[data-dui-1-28-2~=\"dui-button\"]{font-weight:500}");
	ThemeContext = import_react$73.createContext(null);
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/components/Button/Button.js
var import_react$72, Button;
var init_Button$1 = __esmMin((() => {
	init_createElement();
	init_tslib_es6();
	import_react$72 = /* @__PURE__ */ __toESM(require_react());
	init_theme();
	Button = function(_super) {
		__extends(Button, _super);
		function Button() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.themedRender = function(classNames) {
				var _a;
				var _b = _this.props, prefixCls = _b.prefixCls, className = _b.className, style = _b.style, type = _b.type, size = _b.size, disabled = _b.disabled, disabledEffect = _b.disabledEffect, icon = _b.icon, testId = _b.testId, rest = __rest(_b, [
					"prefixCls",
					"className",
					"style",
					"type",
					"size",
					"disabled",
					"disabledEffect",
					"icon",
					"testId"
				]);
				var cls = classNames(prefixCls, className, (_a = {}, _a[prefixCls + "-type-" + type] = type, _a[prefixCls + "-size-" + size] = size, _a[prefixCls + "-with-icon"] = icon, _a[prefixCls + "-type-" + type + "-disabled"] = disabled, _a[prefixCls + "-disabled-" + disabledEffect] = disabled, _a));
				var containerCls = classNames(prefixCls + "-container");
				var iconCls = classNames(prefixCls + "-icon");
				return h$5("button", __assign({}, rest, {
					className: cls,
					style,
					disabled,
					"data-testid": testId
				}), h$5("div", { className: containerCls }, icon ? typeof icon === "string" ? h$5("span", {
					className: iconCls,
					style: { backgroundImage: "url(\"" + icon + "\")" }
				}) : icon : null, _this.props.children));
			};
			return _this;
		}
		Button.prototype.render = function() {
			return consumeTheme(this.themedRender);
		};
		return Button;
	}(import_react$72.Component);
	Button.defaultProps = {
		prefixCls: "dui-button",
		type: "default",
		size: "default",
		disabledEffect: "default"
	};
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/components/Button/index.js
var Button_default;
var init_Button = __esmMin((() => {
	init_style();
	init_Button$1();
	injectStyle("components/Button/style/index.css", "[data-dui-1-28-2~=\"dui-button\"]{outline:none;cursor:default;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-box-sizing:border-box;box-sizing:border-box;display:inline-block;white-space:nowrap;border-radius:4px;border:1px solid transparent;font-size:14px;padding:0 29px;-webkit-tap-highlight-color:transparent}[data-dui-1-28-2~=\"dui-button-container\"]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-flow:row nowrap;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}[data-dui-1-28-2~=\"dui-button\"]:disabled{pointer-events:none;cursor:auto}[data-dui-1-28-2~=\"dui-button-type-default\"]{background:var(--tsp-fill-medium,rgba(51,77,102,.08));color:var(--text-ultrastrong,rgba(0,0,0,.9))}[data-dui-1-28-2~=\"dui-button-type-default\"]:hover{background:var(--tsp-fill-strong,rgba(61,82,102,.12))}[data-dui-1-28-2~=\"dui-button-type-default\"]:active{background:var(--tsp-fill-ultrastrong,rgba(61,82,102,.16))}[data-dui-1-28-2~=\"dui-button-type-default\"]:disabled{color:var(--text-weak,rgba(0,0,0,.26));background:var(--tsp-fill-weak,rgba(51,77,102,.06))}[data-dui-1-28-2~=\"dui-button-type-primary\"]{background:var(--accent-default,#1e6fff);color:var(--text-white,#fff)}[data-dui-1-28-2~=\"dui-button-type-primary\"]:hover{background:var(--accent-hover,#175ceb)}[data-dui-1-28-2~=\"dui-button-type-primary\"]:active{background:var(--accent-pressed,#134ae0)}[data-dui-1-28-2~=\"dui-button-type-primary\"]:disabled{color:hsla(0,0%,100%,.5);background:var(--accent-disabled,#c2d8ff)}[data-dui-1-28-2~=\"dui-button-type-warning\"]{background:var(--critical-default,#ff4747);color:#fff}[data-dui-1-28-2~=\"dui-button-type-warning\"]:hover{background:var(--critical-hover,#eb3639)}[data-dui-1-28-2~=\"dui-button-type-warning\"]:active{background:var(--critical-pressed,#e02424)}[data-dui-1-28-2~=\"dui-button-type-warning\"]:disabled{color:var(--text-white,#fff);background:var(--critical-disabled,#fcc)}[data-dui-1-28-2~=\"dui-button-type-plain\"]{background:var(--bg-lv3-default,#fff);color:var(--text-link,#175ceb)}[data-dui-1-28-2~=\"dui-button-type-plain\"]:hover{background:var(--feedback-hover,rgba(51,77,102,.06))}[data-dui-1-28-2~=\"dui-button-type-plain\"]:active{background:var(--feedback-active,rgba(51,77,102,.08))}[data-dui-1-28-2~=\"dui-button-type-plain\"]:disabled{background:var(--bg-lv4-default,#fff);color:var(--accent-disabled,#c2d8ff)}[data-dui-1-28-2~=\"dui-button-type-golden\"]{background:-webkit-gradient(linear,right top,left top,from(#fdc668),to(#fcdb9f));background:-webkit-linear-gradient(right,#fdc668,#fcdb9f);background:linear-gradient(270deg,#fdc668,#fcdb9f);border:none;color:rgba(0,0,0,.88)}[data-dui-1-28-2~=\"dui-button-type-golden\"] [data-dui-1-28-2~=\"dui-button-container\"]{margin:0 1px}[data-dui-1-28-2~=\"dui-button-type-golden\"]:hover{background:-webkit-gradient(linear,left bottom,left top,from(rgba(0,0,0,.04)),to(rgba(0,0,0,.04))),-webkit-gradient(linear,right top,left top,from(#fdc668),to(#fcdb9f));background:-webkit-linear-gradient(bottom,rgba(0,0,0,.04),rgba(0,0,0,.04)),-webkit-linear-gradient(right,#fdc668,#fcdb9f);background:linear-gradient(0deg,rgba(0,0,0,.04),rgba(0,0,0,.04)),linear-gradient(270deg,#fdc668,#fcdb9f)}[data-dui-1-28-2~=\"dui-button-type-golden\"]:active{background:-webkit-gradient(linear,left bottom,left top,from(rgba(0,0,0,.08)),to(rgba(0,0,0,.08))),-webkit-gradient(linear,right top,left top,from(#fdc668),to(#fcdb9f));background:-webkit-linear-gradient(bottom,rgba(0,0,0,.08),rgba(0,0,0,.08)),-webkit-linear-gradient(right,#fdc668,#fcdb9f);background:linear-gradient(0deg,rgba(0,0,0,.08),rgba(0,0,0,.08)),linear-gradient(270deg,#fdc668,#fcdb9f)}[data-dui-1-28-2~=\"dui-button-type-golden\"]:disabled{opacity:.4}[data-dui-1-28-2~=\"dui-button-type-golden-dark\"]{background:-webkit-linear-gradient(336.31deg,#454952 15.25%,#272a33 84.75%);background:linear-gradient(113.69deg,#454952 15.25%,#272a33 84.75%);border:none;color:#fae0a5}[data-dui-1-28-2~=\"dui-button-type-golden-dark\"] [data-dui-1-28-2~=\"dui-button-container\"]{margin:0 1px}[data-dui-1-28-2~=\"dui-button-type-golden-dark\"]:hover{background:-webkit-linear-gradient(bottom,rgba(0,0,0,.16),rgba(0,0,0,.16)),-webkit-linear-gradient(336.31deg,#454952 15.25%,#272a33 84.75%);background:linear-gradient(0deg,rgba(0,0,0,.16),rgba(0,0,0,.16)),linear-gradient(113.69deg,#454952 15.25%,#272a33 84.75%)}[data-dui-1-28-2~=\"dui-button-type-golden-dark\"]:active{background:-webkit-linear-gradient(bottom,rgba(0,0,0,.32),rgba(0,0,0,.32)),-webkit-linear-gradient(336.31deg,#454952 15.25%,#272a33 84.75%);background:linear-gradient(0deg,rgba(0,0,0,.32),rgba(0,0,0,.32)),linear-gradient(113.69deg,#454952 15.25%,#272a33 84.75%)}[data-dui-1-28-2~=\"dui-button-type-golden-dark\"]:disabled{opacity:.4}[data-dui-1-28-2~=\"dui-button-type-golden-outline\"]{border-color:#db8f1c;color:#db8f1c;background:var(--bg-lv3-default,#fff)}[data-dui-1-28-2~=\"dui-button-type-golden-outline\"]:hover{background:rgba(219,143,28,.1)}[data-dui-1-28-2~=\"dui-button-type-golden-outline\"]:active{background:rgba(219,143,28,.2)}[data-dui-1-28-2~=\"dui-button-disabled-faded\"]:disabled,[data-dui-1-28-2~=\"dui-button-type-golden-outline\"]:disabled{opacity:.4}[data-dui-1-28-2~=\"dui-button-size-large\"]{height:36px;min-width:156px;font-size:16px}[data-dui-1-28-2~=\"dui-button-size-default\"]{height:36px}[data-dui-1-28-2~=\"dui-button-size-small\"]{height:28px;padding:0 17px;font-size:12px}[data-dui-1-28-2~=\"dui-button-size-small\"] [data-dui-1-28-2~=\"dui-button-container\"]{line-height:26px}[data-dui-1-28-2~=\"dui-button-with-icon\"]{padding:0 9px}[data-dui-1-28-2~=\"dui-button-icon\"]{display:inline-block;width:18px;height:18px;background-size:contain;background-repeat:no-repeat;background-position:50%;margin-right:4px}");
	Button_default = Button;
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/utils/documentDom.js
var import_react$71, DocumentDomContext;
var init_documentDom = __esmMin((() => {
	import_react$71 = /* @__PURE__ */ __toESM(require_react());
	DocumentDomContext = import_react$71.createContext(null);
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/utils/Trigger.js
var import_react$70, import_classnames$16, TriggerContext, Trigger;
var init_Trigger = __esmMin((() => {
	init_createElement();
	init_tslib_es6();
	import_react$70 = /* @__PURE__ */ __toESM(require_react());
	init_helper();
	import_classnames$16 = /* @__PURE__ */ __toESM(require_classnames());
	init_documentDom();
	init_memoize_one_esm();
	TriggerContext = import_react$70.createContext(emptyFn);
	Trigger = function(_super) {
		__extends(Trigger, _super);
		function Trigger() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.shouldCancel = false;
			_this.captureTrigger = function(e) {
				if (_this.props.disabled) return;
				setTimeout(function() {
					_this.trigger(e);
				}, 0);
			};
			_this.cancel = function(e) {
				if (_this.props.disabled) return;
				var event = e.nativeEvent;
				if (event._dui_trigger_instances) event._dui_trigger_instances.push(_this);
				else event._dui_trigger_instances = [_this];
			};
			_this.generateCancelSetter = memoizeOne(function(parentSetCancel) {
				return function(shouldCancel) {
					parentSetCancel(shouldCancel);
					_this.shouldCancel = shouldCancel;
				};
			});
			return _this;
		}
		Trigger.prototype.componentDidMount = function() {
			this.doc.addEventListener("click", this.captureTrigger, true);
			if (!this.props.disableContextMenu) this.doc.addEventListener("contextmenu", this.captureTrigger, true);
		};
		Trigger.prototype.componentWillUnmount = function() {
			this.doc.removeEventListener("click", this.captureTrigger, true);
			if (!this.props.disableContextMenu) this.doc.removeEventListener("contextmenu", this.captureTrigger, true);
		};
		Object.defineProperty(Trigger.prototype, "doc", {
			get: function() {
				return this.context || document;
			},
			enumerable: false,
			configurable: true
		});
		Trigger.prototype.trigger = function(e) {
			var _a = this.props, disabled = _a.disabled, action = _a.action, shouldTriggerAction = _a.shouldTriggerAction;
			if (disabled || this.shouldCancel) return;
			if (e._dui_trigger_instances) {
				var index = e._dui_trigger_instances.indexOf(this);
				if (index !== -1) {
					e._dui_trigger_instances.splice(index, 1);
					if (e._dui_trigger_instances.length === 0) delete e._dui_trigger_instances;
					return;
				}
			}
			if (shouldTriggerAction(e)) action();
		};
		Trigger.prototype.render = function() {
			var _this = this, _a = this.props, prefixCls = _a.prefixCls, className = _a.className, style = _a.style, children = _a.children, domRef = _a.domRef, disableContextMenu = _a.disableContextMenu, testId = _a.testId;
			_a.disabled;
			_a.action;
			_a.shouldTriggerAction;
			var rest = __rest(_a, [
				"prefixCls",
				"className",
				"style",
				"children",
				"domRef",
				"disableContextMenu",
				"testId",
				"disabled",
				"action",
				"shouldTriggerAction"
			]);
			var classes = (0, import_classnames$16.default)(prefixCls, className);
			return h$5(TriggerContext.Consumer, null, function(parentSetCancel) {
				return h$5(TriggerContext.Provider, { value: _this.generateCancelSetter(parentSetCancel) }, h$5("div", __assign({
					className: classes,
					style,
					onClickCapture: _this.cancel,
					onContextMenuCapture: disableContextMenu ? void 0 : _this.cancel,
					ref: domRef,
					"data-testid": testId
				}, rest), children));
			});
		};
		Trigger.contextType = DocumentDomContext;
		return Trigger;
	}(import_react$70.Component);
	Trigger.defaultProps = {
		prefixCls: "dui-trigger",
		action: emptyFn,
		shouldTriggerAction: trueFn,
		disabled: false,
		disableContextMenu: false
	};
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/utils/keepDom.js
function decideKeepDom(animationDuration, visible) {
	var _this = this;
	var willLeave = !visible && this._ALC_HELPER_prevVisible;
	this._ALC_HELPER_prevVisible = visible;
	if (visible) return true;
	if (!willLeave) return false;
	setTimeout(function() {
		_this.forceUpdate();
	}, animationDuration);
	return true;
}
var init_keepDom = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/utils/checkPositionChange.js
function checkPositionChange(dom, onChange) {
	if (!dom) return emptyFn;
	var prevPosition = dom.getBoundingClientRect();
	var checkTimer = setInterval(function() {
		var position = dom.getBoundingClientRect();
		if (Math.abs(prevPosition.left - position.left) > 1 || Math.abs(prevPosition.top - position.top) > 1) onChange();
		prevPosition = position;
	}, CHECK_POSITION_INTERVAL);
	return function() {
		return clearInterval(checkTimer);
	};
}
var CHECK_POSITION_INTERVAL;
var init_checkPositionChange = __esmMin((() => {
	init_helper();
	CHECK_POSITION_INTERVAL = 100;
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/components/Tooltip/Tooltip.js
var import_react$69, import_react_dom$13, TOOLTIP_VERTICAL_GAP, TOOLTIP_HORIZONTAL_GAP, ARROW_ADDITONAL_HORIZONTAL_GAP, VIEWPORT_MARGIN, TOOLTIP_TRANSITION_DURATION, defaultMetrics, arrowTransforms, Tooltip;
var init_Tooltip$1 = __esmMin((() => {
	init_createElement();
	init_tslib_es6();
	import_react$69 = /* @__PURE__ */ __toESM(require_react());
	import_react_dom$13 = /* @__PURE__ */ __toESM(require_react_dom());
	init_helper();
	init_Trigger();
	init_theme();
	init_keepDom();
	init_checkPositionChange();
	TOOLTIP_VERTICAL_GAP = 8;
	TOOLTIP_HORIZONTAL_GAP = 4;
	ARROW_ADDITONAL_HORIZONTAL_GAP = 2;
	VIEWPORT_MARGIN = 2;
	TOOLTIP_TRANSITION_DURATION = 200;
	defaultMetrics = {
		position: {
			left: "0px",
			top: "0px"
		},
		effectivePlacement: "bottom"
	};
	arrowTransforms = {
		top: "translate(-50%, -50%) rotate(225deg)",
		bottom: "translate(-50%, 50%) rotate(45deg)",
		left: "translate(-50%, -50%) rotate(135deg)",
		right: "translate(50%, -50%) rotate(-45deg)"
	};
	Tooltip = function(_super) {
		__extends(Tooltip, _super);
		function Tooltip() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.rootRef = import_react$69.createRef();
			_this.overlayContainerRef = import_react$69.createRef();
			_this.forceRenderDom = false;
			_this.cancelPositionChangeChecker = null;
			_this.state = __assign({ currentVisible: !!_this.props.defaultVisible }, defaultMetrics);
			_this.show = function() {
				if (_this.props.disabled) return;
				_this.forceRenderDom = true;
				_this.setState(defaultMetrics, function() {
					_this.runVisibleEffects();
					_this.setStateVisible(true);
					_this.forceRenderDom = false;
				});
			};
			_this.hide = function() {
				clearTimeout(_this.showTimeout);
				if (!_this.isVisible()) return;
				_this.setStateVisible(false);
			};
			_this.toggle = function() {
				if (_this.props.disabled) return;
				if (_this.isVisible()) _this.hide();
				else _this.show();
			};
			_this.handleClickAnchor = function() {
				var _a = _this.props, trigger = _a.trigger, hideOnClick = _a.hideOnClick;
				if (trigger === "click") _this.toggle();
				else if (trigger === "hover" && hideOnClick) _this.hide();
			};
			_this.handleMouseDownAnchor = function() {
				var _a = _this.props, trigger = _a.trigger;
				if (_a.hideOnMouseDown && trigger === "hover") _this.hide();
			};
			_this.handleMouseEnter = function() {
				clearTimeout(_this.hideTimeout);
				clearTimeout(_this.showTimeout);
				_this.showTimeout = setTimeout(_this.show, typeof _this.props.hoverDelay === "object" ? _this.props.hoverDelay.show : _this.props.hoverDelay);
			};
			_this.handleMouseLeave = function() {
				clearTimeout(_this.showTimeout);
				_this.hideTimeout = setTimeout(_this.hide, typeof _this.props.hoverDelay === "object" ? _this.props.hoverDelay.hide : _this.props.hoverDelay);
			};
			_this.themedRender = function(classNames) {
				var _a;
				var _b = _this.props, className = _b.className, style = _b.style, prefixCls = _b.prefixCls, children = _b.children, overlayClassName = _b.overlayClassName, overlayStyle = _b.overlayStyle, trigger = _b.trigger, offset = _b.offset, zIndex = _b.zIndex, containerClassName = _b.containerClassName, containerStyle = _b.containerStyle, destroyOnClose = _b.destroyOnClose, overlayHoverable = _b.overlayHoverable, containerDom = _b.containerDom, appendElement = _b.appendElement;
				var effectivePlacement = _this.state.effectivePlacement;
				var wrapperCls = classNames(prefixCls, className, prefixCls + "-wrapper");
				var overlayCls = classNames(prefixCls + "-content", overlayClassName);
				var overlayStyleWithOffset = __assign(__assign({}, overlayStyle), { transform: "translate" + (effectivePlacement === "top" || effectivePlacement === "bottom" ? "X" : "Y") + "(" + offset + "px)" });
				var visible = _this.isVisible();
				var overlayContainerCls = classNames(prefixCls + "-container", containerClassName, (_a = {}, _a[prefixCls + "-container-visible"] = visible, _a));
				var shouldDestroyDom = !_this.forceRenderDom && destroyOnClose && !decideKeepDom.call(_this, TOOLTIP_TRANSITION_DURATION, visible);
				var hoverTarget = "";
				if (trigger === "hover") hoverTarget = overlayHoverable ? "outer" : "inner";
				return h$5(Trigger, {
					className: wrapperCls,
					style,
					action: _this.hide,
					disabled: trigger !== "click"
				}, h$5("div", {
					onMouseEnter: hoverTarget === "outer" ? _this.handleMouseEnter : void 0,
					onMouseLeave: hoverTarget === "outer" ? _this.handleMouseLeave : void 0,
					ref: _this.rootRef
				}, h$5("div", {
					onClick: _this.handleClickAnchor,
					onMouseDown: _this.handleMouseDownAnchor,
					onMouseEnter: hoverTarget === "inner" ? _this.handleMouseEnter : void 0,
					onMouseLeave: hoverTarget === "inner" ? _this.handleMouseLeave : void 0
				}, children), shouldDestroyDom ? null : import_react_dom$13.createPortal(h$5("div", {
					className: overlayContainerCls,
					ref: _this.overlayContainerRef,
					style: __assign(__assign({ zIndex }, containerStyle), _this.state.position)
				}, h$5("div", {
					className: overlayCls,
					style: overlayStyleWithOffset,
					"aria-atomic": true,
					"aria-live": "assertive"
				}, _this.renderTitle(classNames)), _this.renderArrow(classNames)), containerDom || document.body)), appendElement);
			};
			return _this;
		}
		Tooltip.getDerivedStateFromProps = function(props, state) {
			if (props.disabled) return { currentVisible: false };
			return null;
		};
		Tooltip.prototype.componentDidMount = function() {
			if (this.isVisible()) this.runVisibleEffects();
		};
		Tooltip.prototype.componentWillUnmount = function() {
			var _a;
			(_a = this.cancelPositionChangeChecker) === null || _a === void 0 || _a.call(this);
			clearTimeout(this.showTimeout);
			clearTimeout(this.hideTimeout);
		};
		Tooltip.prototype.componentDidUpdate = function(prevProps) {
			var _a;
			if (!prevProps.visible && this.props.visible) this.runVisibleEffects();
			if (!this.isVisible()) (_a = this.cancelPositionChangeChecker) === null || _a === void 0 || _a.call(this);
		};
		Tooltip.prototype.isVisible = function() {
			var _a = this.props, forceVisible = _a.visible;
			if (_a.disabled) return false;
			var stateVisible = this.state.currentVisible;
			return typeof forceVisible === "boolean" ? forceVisible : stateVisible;
		};
		Tooltip.prototype.setStateVisible = function(currentVisible) {
			this.setState({ currentVisible });
			this.props.onVisibleChange(currentVisible);
		};
		Tooltip.prototype.runVisibleEffects = function() {
			var _this = this;
			this.setState(this.calcOverlayMetrics(), function() {
				requestAnimationFrame(function() {
					var _a;
					(_a = _this.cancelPositionChangeChecker) === null || _a === void 0 || _a.call(_this);
					_this.cancelPositionChangeChecker = checkPositionChange(_this.rootRef.current, _this.hide);
				});
			});
		};
		Tooltip.prototype.calcStartPositionByAlignment = function(parentStart, parentEnd, selfLength) {
			switch (this.props.alignment) {
				case "start": return parentStart;
				case "center": return (parentStart + parentEnd - selfLength) / 2;
				case "end": return parentEnd - selfLength;
				default: return 0;
			}
		};
		Tooltip.prototype.calcOverlayMetrics = function() {
			var rootDom = this.rootRef.current;
			var containerDom = this.overlayContainerRef.current;
			if (!rootDom || !containerDom) return defaultMetrics;
			var rootRect = rootDom.getBoundingClientRect();
			var containerRect = containerDom.getBoundingClientRect();
			var placement = this.props.placement;
			if (typeof placement === "string") return {
				position: this.calcOverlayPositionByPlacement(rootRect, containerRect, placement).position,
				effectivePlacement: placement
			};
			for (var _i = 0, _a = placement; _i < _a.length; _i++) {
				var tryPlacement = _a[_i];
				var _b = this.calcOverlayPositionByPlacement(rootRect, containerRect, tryPlacement), position = _b.position;
				if (_b.canFitIn) return {
					position,
					effectivePlacement: tryPlacement
				};
			}
			return {
				position: this.calcOverlayPositionByPlacement(rootRect, containerRect, placement[0]).position,
				effectivePlacement: placement[0]
			};
		};
		Tooltip.prototype.calcOverlayPositionByPlacement = function(rootRect, containerRect, placement) {
			var leftX = rootRect.left, rightX = rootRect.right, topY = rootRect.top, bottomY = rootRect.bottom;
			var width = containerRect.width, height = containerRect.height;
			var _a = this.props, containerOffsetX = _a.containerOffsetX, containerOffsetY = _a.containerOffsetY, showArrow = _a.showArrow;
			var resultLeft = containerOffsetX;
			var resultTop = containerOffsetY;
			var horizontalGap = TOOLTIP_HORIZONTAL_GAP + (showArrow ? ARROW_ADDITONAL_HORIZONTAL_GAP : 0);
			if (placement === "bottom" || placement === "top") resultLeft += this.calcStartPositionByAlignment(leftX, rightX, width);
			if (placement === "left") resultLeft += leftX - horizontalGap - width;
			if (placement === "right") resultLeft += rightX + horizontalGap;
			var finalLeft = castInto(resultLeft, [VIEWPORT_MARGIN, innerWidth - width - VIEWPORT_MARGIN]);
			if (placement === "left" || placement === "right") resultTop += this.calcStartPositionByAlignment(topY, bottomY, height);
			if (placement === "top") resultTop += topY - TOOLTIP_VERTICAL_GAP - height;
			if (placement === "bottom") resultTop += bottomY + TOOLTIP_VERTICAL_GAP;
			var finalTop = castInto(resultTop, [VIEWPORT_MARGIN, innerHeight - height - VIEWPORT_MARGIN]);
			return {
				position: {
					left: finalLeft + "px",
					top: finalTop + "px"
				},
				canFitIn: finalLeft === resultLeft && finalTop === resultTop
			};
		};
		Tooltip.prototype.renderArrow = function(classNames) {
			var _a = this.props, arrowOffsetX = _a.arrowOffsetX, arrowOffsetY = _a.arrowOffsetY, showArrow = _a.showArrow, prefixCls = _a.prefixCls, arrowClassName = _a.arrowClassName, arrowStyle = _a.arrowStyle;
			if (!showArrow) return null;
			var effectivePlacement = this.state.effectivePlacement;
			return h$5("div", {
				className: classNames(prefixCls + "-arrow", arrowClassName, prefixCls + "-arrow-" + effectivePlacement),
				style: __assign({ transform: "translate(" + arrowOffsetX + "px, " + arrowOffsetY + "px) " + arrowTransforms[effectivePlacement] }, arrowStyle)
			});
		};
		Tooltip.prototype.renderTitle = function(classNames) {
			var _a = this.props, prefixCls = _a.prefixCls, title = _a.title;
			if (Array.isArray(title) && title.every(function(line) {
				return typeof line === "string";
			})) return h$5("div", { className: classNames(prefixCls + "-title-multiline") }, title.map(function(line, index) {
				return h$5("div", { key: index }, line);
			}));
			return title;
		};
		Tooltip.prototype.render = function() {
			return consumeTheme(this.themedRender);
		};
		return Tooltip;
	}(import_react$69.Component);
	Tooltip.defaultProps = {
		prefixCls: "dui-tooltip",
		title: "",
		placement: "bottom",
		trigger: "hover",
		onVisibleChange: emptyFn,
		disabled: false,
		offset: 0,
		containerOffsetX: 0,
		containerOffsetY: 0,
		destroyOnClose: true,
		alignment: "center",
		hoverDelay: 400,
		hideOnClick: false,
		hideOnMouseDown: false,
		overlayHoverable: true,
		arrowOffsetX: 0,
		arrowOffsetY: 0
	};
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/components/Tooltip/index.js
var Tooltip_default;
var init_Tooltip = __esmMin((() => {
	init_style();
	init_Tooltip$1();
	injectStyle("components/Tooltip/style/index.css", "@-webkit-keyframes dui-tooltip-fade-in{0%{opacity:0}to{opacity:1}}@keyframes dui-tooltip-fade-in{0%{opacity:0}to{opacity:1}}[data-dui-1-28-2~=\"dui-tooltip-wrapper\"]{display:inline-block;position:relative}[data-dui-1-28-2~=\"dui-tooltip-container\"]{position:fixed;visibility:hidden;-webkit-transition-property:opacity,visibility;transition-property:opacity,visibility;-webkit-transition-duration:.2s;transition-duration:.2s;-webkit-transition-timing-function:linear;transition-timing-function:linear;z-index:10002;opacity:0;-webkit-animation:dui-tooltip-fade-in .2s linear;animation:dui-tooltip-fade-in .2s linear;font-size:medium}[data-dui-1-28-2~=\"dui-tooltip-container-visible\"]{visibility:visible;opacity:1}[data-dui-1-28-2~=\"dui-tooltip-content\"]{display:inline-block;padding:7px 12px;font-size:12px;line-height:18px;border:1px solid rgba(0,0,0,.1);border-radius:4px;color:var(--text-ultrastrong,rgba(0,0,0,.9));-webkit-box-shadow:0 6px 32px 2px var(--dui-shadow-color,rgba(68,73,77,.16)),0 4px 6px 2px rgba(0,0,0,.04);box-shadow:0 6px 32px 2px var(--dui-shadow-color,rgba(68,73,77,.16)),0 4px 6px 2px rgba(0,0,0,.04);word-break:break-word;background-color:var(--bg-lv4-default,#fff)}[data-dui-1-28-2~=\"dui-tooltip-title-multiline\"]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-flow:column nowrap;-ms-flex-flow:column nowrap;flex-flow:column nowrap;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;line-height:16px}[data-dui-1-28-2~=\"dui-tooltip-arrow\"]{position:absolute;border-top-left-radius:3px;border:1px solid rgba(0,0,0,.1);border-right:none;border-bottom:none;pointer-events:none;width:8px;height:8px;background:-webkit-linear-gradient(315deg,var(--bg-lv4-default,#fff) 50%,transparent 0);background:linear-gradient(135deg,var(--bg-lv4-default,#fff) 50%,transparent 0)}[data-dui-1-28-2~=\"dui-tooltip-arrow-top\"]{margin-top:-1px;top:100%;left:50%}[data-dui-1-28-2~=\"dui-tooltip-arrow-right\"]{margin-right:-1px;top:50%;right:100%}[data-dui-1-28-2~=\"dui-tooltip-arrow-bottom\"]{margin-bottom:-1px;bottom:100%;left:50%}[data-dui-1-28-2~=\"dui-tooltip-arrow-left\"]{margin-left:-1px;top:50%;left:100%}");
	Tooltip_default = Tooltip;
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/components/Modal/Dragger.js
var import_react$68, Dragger;
var init_Dragger = __esmMin((() => {
	init_createElement();
	init_tslib_es6();
	import_react$68 = /* @__PURE__ */ __toESM(require_react());
	init_helper();
	init_theme();
	Dragger = function(_super) {
		__extends(Dragger, _super);
		function Dragger() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.ref = null;
			_this.minLeft = 0;
			_this.minTop = 0;
			_this.setRef = function(ref) {
				_this.ref = ref;
			};
			_this.onMouseDown = function(e) {
				var _a, _b;
				(_b = (_a = _this.props).onMouseDown) === null || _b === void 0 || _b.call(_a, e);
				if (!_this.props.draggable || !_this.ref || _this.isFromInnerInput(e)) return;
				_this.mouse = true;
				var _c = _this.ref.getBoundingClientRect(), left = _c.left, top = _c.top, width = _c.width, height = _c.height;
				var clientX = e.clientX, clientY = e.clientY;
				_this.startLeft = left;
				_this.startTop = top;
				_this.startX = clientX;
				_this.startY = clientY;
				_this.maxLeft = window.innerWidth - width;
				_this.maxTop = window.innerHeight - height;
				_this.ref.style.userSelect = "none";
				_this.ref.parentElement.style.pointerEvents = "auto";
			};
			_this.onMouseMove = function(e) {
				if (!_this.mouse || !_this.ref) return;
				var clientX = e.clientX, clientY = e.clientY;
				var left = _this.startLeft + clientX - _this.startX;
				var top = _this.startTop + clientY - _this.startY;
				left = Math.min(Math.max(_this.minLeft, left), _this.maxLeft);
				top = Math.min(Math.max(_this.minTop, top), _this.maxTop);
				_this.ref.style.position = "absolute";
				_this.ref.style.left = left + "px";
				_this.ref.style.top = top + "px";
			};
			_this.onMouseUp = function(e) {
				if (!_this.ref) return;
				_this.mouse = false;
				_this.ref.style.userSelect = "auto";
				_this.ref.parentElement.style.pointerEvents = "";
				var _a = _this.props, onDragEnd = _a.onDragEnd;
				if (_a.draggable === true) onDragEnd(e);
			};
			_this.themedRender = function(classNames) {
				var _a = _this.props, children = _a.children, className = _a.className, prefixCls = _a.prefixCls, style = _a.style;
				_a.onDragEnd;
				_a.draggable;
				return h$5("div", __assign({}, __rest(_a, [
					"children",
					"className",
					"prefixCls",
					"style",
					"onDragEnd",
					"draggable"
				]), {
					className: classNames(prefixCls, className),
					style,
					ref: _this.setRef,
					onMouseDown: _this.onMouseDown,
					tabIndex: -1
				}), children);
			};
			return _this;
		}
		Dragger.prototype.componentDidMount = function() {
			document.body.addEventListener("mousemove", this.onMouseMove);
			document.body.addEventListener("mouseup", this.onMouseUp);
		};
		Dragger.prototype.componentWillUnmount = function() {
			document.body.removeEventListener("mousemove", this.onMouseMove);
			document.body.removeEventListener("mouseup", this.onMouseUp);
		};
		Dragger.prototype.isFromInnerInput = function(e) {
			var _a;
			var target = e.target;
			return Boolean(/input|textarea/i.test(target.tagName) && ((_a = this.ref) === null || _a === void 0 ? void 0 : _a.contains(target)));
		};
		Dragger.prototype.render = function() {
			return consumeTheme(this.themedRender);
		};
		return Dragger;
	}(import_react$68.Component);
	Dragger.defaultProps = {
		prefixCls: "dui-dragger",
		onDragEnd: emptyFn,
		onClick: emptyFn,
		draggable: false
	};
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/components/Snackbar/context.js
var import_react$67, ContainerContext;
var init_context$4 = __esmMin((() => {
	import_react$67 = /* @__PURE__ */ __toESM(require_react());
	ContainerContext = import_react$67.createContext(null);
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/utils/preventScrollPenetrate.js
function preventSelfScrollPenetrate(container, direction, stopPropagationBorder) {
	if (direction === void 0) direction = "y";
	if (stopPropagationBorder === void 0) stopPropagationBorder = null;
	if (!container || container.__preventSelfScrollPenetrate) return;
	var prevX;
	var prevY;
	var reachBorderInScroll = null;
	var handleTouchStart = function(event) {
		reachBorderInScroll = null;
		var touch = event.touches[0];
		prevX = touch.screenX;
		prevY = touch.screenY;
	};
	var handleTouchMove = function(event) {
		var touch = event.touches[0];
		var deltaX = touch.screenX - prevX;
		var deltaY = touch.screenY - prevY;
		var isAtLowerX = direction === "x" && container.scrollLeft === 0;
		var isAtUpperX = direction === "x" && container.scrollLeft === container.scrollWidth - container.offsetWidth;
		var isAtLowerY = direction === "y" && container.scrollTop === 0;
		var isAtUpperY = direction === "y" && container.scrollTop === container.scrollHeight - container.offsetHeight;
		var isScrollingBeyondBorder = direction === "x" ? deltaX > 0 && isAtLowerX || deltaX < 0 && isAtUpperX : deltaY > 0 && isAtLowerY || deltaY < 0 && isAtUpperY;
		var currentBorder = isAtLowerX || isAtLowerY ? "lower" : isAtUpperX || isAtUpperY ? "upper" : null;
		if (isScrollingBeyondBorder) {
			event.cancelable && event.preventDefault();
			if (reachBorderInScroll !== currentBorder) {
				container.dispatchEvent(new TouchEvent("touchstart", event));
				reachBorderInScroll = currentBorder;
			}
			stopPropagationBorder === currentBorder && event.stopPropagation();
		} else event.stopPropagation();
	};
	container.addEventListener("touchstart", handleTouchStart);
	container.addEventListener("touchmove", handleTouchMove, { passive: false });
	container.__preventSelfScrollPenetrate = true;
}
function calcDistance(x1, y1, x2, y2) {
	return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}
function toggleGlobalScrollEvents(disabled) {
	if (disabled && !globalScrollProperty) {
		globalScrollProperty = document.documentElement.style.overflow || "initial";
		document.documentElement.style.overflow = "hidden";
	}
	if (!disabled && globalScrollProperty) {
		document.documentElement.style.overflow = globalScrollProperty;
		globalScrollProperty = "";
	}
}
var import_react$66, STYLUS_TOUCH_MOVE_CLICK_DISTANCE, PreventScrollPenetrateContainer, globalScrollProperty;
var init_preventScrollPenetrate = __esmMin((() => {
	init_createElement();
	init_tslib_es6();
	import_react$66 = /* @__PURE__ */ __toESM(require_react());
	STYLUS_TOUCH_MOVE_CLICK_DISTANCE = 10;
	PreventScrollPenetrateContainer = function(_super) {
		__extends(PreventScrollPenetrateContainer, _super);
		function PreventScrollPenetrateContainer() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.domRef = import_react$66.createRef();
			_this.isInnerScroll = false;
			_this.startScreenX = -1;
			_this.startScreenY = -1;
			_this.handleTouchStart = function(event) {
				var container = _this.domRef.current;
				if (!container) return;
				var path = event.composedPath();
				var touch = event.touches[0];
				_this.startScreenX = touch.screenX;
				_this.startScreenY = touch.screenY;
				for (var _i = 0, path_1 = path; _i < path_1.length; _i++) {
					var elem = path_1[_i];
					if (!container.contains(elem)) {
						_this.isInnerScroll = false;
						return;
					}
					if (elem.scrollHeight > elem.clientHeight) {
						_this.isInnerScroll = true;
						preventSelfScrollPenetrate(elem);
						return;
					}
				}
				_this.isInnerScroll = false;
			};
			_this.handleTouchMove = function(event) {
				if (_this.isInnerScroll) return;
				var touch = event.touches[0];
				if (touch.touchType === "stylus" && calcDistance(_this.startScreenX, _this.startScreenY, touch.screenX, touch.screenY) < STYLUS_TOUCH_MOVE_CLICK_DISTANCE) return;
				event.cancelable && event.preventDefault();
			};
			return _this;
		}
		PreventScrollPenetrateContainer.prototype.componentDidMount = function() {
			var container = this.domRef.current;
			container.addEventListener("touchstart", this.handleTouchStart);
			container.addEventListener("touchmove", this.handleTouchMove, { passive: false });
		};
		PreventScrollPenetrateContainer.prototype.render = function() {
			return h$5("div", __assign({}, this.props, { ref: this.domRef }), this.props.children);
		};
		return PreventScrollPenetrateContainer;
	}(import_react$66.Component);
	globalScrollProperty = "";
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/utils/stylusAdapter.js
var import_react$65, TouchType, StylusAdapter, WithStylusClick;
var init_stylusAdapter = __esmMin((() => {
	import_react$65 = /* @__PURE__ */ __toESM(require_react());
	init_esm$5();
	(function(TouchType) {
		TouchType["direct"] = "direct";
		TouchType["stylus"] = "stylus";
	})(TouchType || (TouchType = {}));
	StylusAdapter = function() {
		function StylusAdapter() {}
		StylusAdapter.supportStylus = function(event, callback) {
			if (!this.isIPadStylusTouch(event)) return;
			if (event.nativeEvent.type === "touchstart") {
				this.startPos = [event.changedTouches[0].clientX, event.changedTouches[0].clientY];
				return;
			}
			if (event.nativeEvent.type === "touchend") {
				var endPos = [event.changedTouches[0].clientX, event.changedTouches[0].clientY];
				if (this.isEqualPos(this.startPos, endPos) && callback) callback();
				event.preventDefault();
			}
		};
		StylusAdapter.startPos = [0, 0];
		StylusAdapter.isIPadStylusTouch = function(event) {
			return ua.isIPad && event.changedTouches[0] && event.changedTouches[0].touchType === TouchType.stylus;
		};
		StylusAdapter.isEqualPos = function(pos1, pos2) {
			return Math.abs(pos1[0] - pos2[0]) < 10 && Math.abs(pos1[1] - pos2[1]) < 10;
		};
		return StylusAdapter;
	}();
	WithStylusClick = function(_a) {
		var children = _a.children, clickHandler = _a.clickHandler;
		return import_react$65.cloneElement(children, {
			onClick: clickHandler,
			onTouchStart: function(e) {
				return StylusAdapter.supportStylus(e, clickHandler);
			},
			onTouchEnd: function(e) {
				return StylusAdapter.supportStylus(e, clickHandler);
			}
		});
	};
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/utils/focus.js
function getFocusableNodesIn(container) {
	return Array.prototype.slice.call(container.querySelectorAll(BASE_FOCUSABLE_SELECTORS));
}
function traverseFocusIn(container, e, isReverse) {
	if (isReverse === void 0) isReverse = e === null || e === void 0 ? void 0 : e.shiftKey;
	var focusableNodes = getFocusableNodesIn(container);
	if (focusableNodes.length === 0) return;
	var focusedIndex = focusableNodes.indexOf(document.activeElement);
	var focusElement;
	if (focusedIndex < 0) focusElement = focusableNodes[0];
	else focusElement = focusableNodes[(focusedIndex + (isReverse ? -1 : 1) + focusableNodes.length) % focusableNodes.length];
	focusElement.focus();
	focusElement.scrollIntoView({
		block: "nearest",
		inline: "nearest"
	});
	e === null || e === void 0 || e.preventDefault();
}
function saveFocus() {
	activeElement = document.activeElement;
}
function runRestoreFocus() {
	activeElement === null || activeElement === void 0 || activeElement.focus();
	activeElement = null;
}
function restoreFocus() {
	if (!activeElement) return;
	if (activeElement.tagName === "BUTTON") setTimeout(runRestoreFocus, 0);
	else runRestoreFocus();
}
var BASE_FOCUSABLE_SELECTORS, activeElement;
var init_focus = __esmMin((() => {
	BASE_FOCUSABLE_SELECTORS = [
		"a[href]",
		"area[href]",
		"input:not([disabled]):not([type=\"hidden\"]):not([aria-hidden])",
		"select:not([disabled]):not([aria-hidden])",
		"textarea:not([disabled]):not([aria-hidden])",
		"button:not([disabled]):not([aria-hidden])",
		"iframe",
		"object",
		"embed",
		"[contenteditable]",
		"[tabindex]:not([tabindex^=\"-\"])"
	];
	activeElement = null;
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/common/wording.js
var controlKeyName, languages, translationMap;
var init_wording = __esmMin((() => {
	init_esm$5();
	controlKeyName = ua.isMac ? "Command" : "Ctrl";
	languages = [
		"en",
		"zh-CN",
		"th",
		"vi",
		"ms",
		"tl-PH",
		"id-ID",
		"es-MX",
		"de",
		"ja",
		"zh-HK"
	];
	translationMap = {
		avatar: [
			"Avatar",
			"头像",
			"รูปโปรไฟล์",
			"Ảnh hồ sơ",
			"Foto Profil",
			"Profile Photo",
			"Foto Profil",
			"Foto del perfil",
			"Profilfoto",
			"プロフィール写真",
			"頭像"
		],
		ok: [
			"OK",
			"确定",
			"ตกลง",
			"OK",
			"OK",
			"OK",
			"OK",
			"OK",
			"OK",
			"OK",
			"確定"
		],
		cancel: [
			"Cancel",
			"取消",
			"ยกเลิก",
			"Hủy",
			"Batalkan",
			"Kanselahin",
			"Batalkan",
			"Cancelar",
			"Abbrechen",
			"キャンセルする",
			"取消"
		],
		select: [
			"Select",
			"请选择",
			"โปรดเลือก",
			"Vui lòng lựa chọn",
			"Sila pilih",
			"Pumili",
			"Silakan pilih",
			"Por favor selecciona",
			"Bitte auswählen",
			"選択してください",
			"請選擇"
		],
		search: [
			"Search",
			"搜索选项",
			"ตัวเลือกการค้นหา",
			"Tùy chọn tìm kiếm",
			"Pilihan carian",
			"Mga opsyon sa paghahanap",
			"Opsi penelusuran",
			"Buscar opciones",
			"Options-Suche",
			"検索オプション",
			"搜尋選項"
		],
		hour: [
			"H",
			"时",
			"h",
			"giờ",
			"h",
			"h",
			"h",
			"h",
			"h",
			"時",
			"時"
		],
		minute: [
			"M",
			"分",
			"m",
			"phút",
			"m",
			"m",
			"m",
			"m",
			"m",
			"分",
			"分"
		],
		second: [
			"S",
			"秒",
			"s",
			"giây",
			"saat",
			"s",
			"s",
			"s",
			"s",
			"秒",
			"秒"
		],
		now: [
			"Now",
			"此刻",
			"ตอนนี้",
			"Ngay bây giờ",
			"Sekarang",
			"Ngayon",
			"Sekarang",
			"Ahora",
			"Jetzt",
			"今",
			"此刻"
		],
		inputHour: [
			"Enter Hour",
			"输入小时",
			"ใส่ชั่วโมง",
			"Nhập giờ",
			"Masukkan jam",
			"Ilagay ang mga oras",
			"Masukkan jam",
			"Introducir horas",
			"Stunden eingeben",
			"時間を入力します",
			"輸入小時"
		],
		inputMinute: [
			"Enter Minute",
			"输入分",
			"ใส่นาที",
			"Nhập phút",
			"Masukkan minit",
			"Ilagay ang mga minuto",
			"Masukkan menit",
			"Introducir minutos",
			"Minuten eingeben",
			"分を入力します",
			"輸入分"
		],
		inputSecond: [
			"Enter Second",
			"输入秒",
			"ใส่วินาที",
			"Nhập giây",
			"Masukkan saat",
			"Ilagay ang mga segundo",
			"Masukkan detik",
			"Introducir segundos",
			"Sekunden eingeben",
			"秒を入力します",
			"輸入秒"
		],
		close: [
			"Close",
			"关闭",
			"ปิด",
			"Đóng",
			"Tutup",
			"Isara",
			"Tutup",
			"Cerrar",
			"Schließen",
			"閉じる",
			"關閉"
		],
		loadingFailed: [
			"Loading Failed",
			"加载失败",
			"โหลดไม่สำเร็จ",
			"Tải không thành công",
			"Memuatkan tidak berjaya",
			"Hindi matagumpay ang pag-load",
			"Gagal memuat",
			"Error al cargar",
			"Laden erfolglos",
			"読み込みに失敗しました",
			"載入失敗"
		],
		noOptions: [
			"No Options Available",
			"暂无选项",
			"ไม่มีตัวเลือกที่พร้อมใช้งาน",
			"Không có tùy chọn khả dụng",
			"Tiada pilihan tersedia",
			"Walang mga opsyon na available",
			"Tidak ada opsi tersedia",
			"No hay opciones disponibles",
			"Keine Optionen verfügbar",
			"利用可能なオプションはありません",
			"暫無選項"
		],
		copySuccessed: [
			"Copy Succeeded",
			"复制成功",
			"คัดลอกสำเร็จแล้ว",
			"Sao chép thành công",
			"Berjaya menyalin",
			"Matagumpay na nakopya",
			"Berhasil disalin",
			"Copiar con éxito",
			"Erfolgreich kopiert",
			"コピーが成功しました",
			"複製成功"
		],
		copyFailed: [
			"Copy Failed",
			"复制失败",
			"การคัดลอกล้มเหลว",
			"Sao chép không thành công",
			"Gagal menyalin",
			"Hindi nakopya",
			"Gagal menyalin",
			"Error al copiar",
			"Kopieren fehlgeschlagen",
			"コピーに失敗しました",
			"複製失敗"
		],
		eyedropper: [
			"Eyedropper",
			"取色器",
			"ตัวเลือกสี",
			"Bộ chọn màu",
			"Pemilih warna",
			"Color picker",
			"Pemilih warna",
			"Selector de color",
			"Farbwähler",
			"カラーピッカー",
			"取色器"
		],
		eyedropperFailedBrowser: [
			"Eyedropper is not supported by this browser. Please open it in Chrome",
			"取色器暂不支持本浏览器, 请在 Chrome 中使用",
			"ขณะนี้เบราว์เซอร์นี้ไม่รองรับตัวเลือกสี โปรดใช้ใน Chrome",
			"Bộ chọn màu không được hỗ trợ trong trình duyệt này, vui lòng sử dụng Chrome",
			"Pemilih warna tidak disokong dalam pelayar ini pada masa ini, sila gunakannya dalam Chrome",
			"Ang color picker ay kasalukuyang hindi sinusuportahan sa browser na ito, mangyaring gamitin ito sa Chrome",
			"Pemilih warna saat ini tidak didukung di browser ini, silakan gunakan di Chrome",
			"El selector de color no es compatible actualmente con este navegador, utilícelo en Chrome",
			"Der Farbwähler wird in diesem Browser derzeit nicht unterstützt, bitte verwenden Sie ihn in Chrome",
			"カラーピッカーは現在このブラウザではサポートされていません。Chromeで使用してください",
			"取色器暫不支援本瀏覽器，請在Chrome中使用"
		],
		zoomIn: [
			"Zoom In",
			"放大",
			"ซูมเข้า",
			"Phóng to",
			"Zum masuk",
			"Mag-zoom in",
			"Perbesar",
			"Acercar",
			"Zoomen Sie herein",
			"ズームイン",
			"放大"
		],
		zoomOut: [
			"Zoom Out",
			"缩小",
			"ซูมออก",
			"Thu nhỏ",
			"Zum keluar",
			"Mag-zoom out",
			"Perkecil",
			"Alejar",
			"Zoomen Sie heraus",
			"ズームアウト",
			"縮小"
		],
		fitScreen: [
			"Fit to Screen",
			"适应屏幕",
			"ปรับให้พอดีกับหน้าจอ",
			"Vừa màn hình",
			"Muat pada skrin",
			"I-fit sa screen",
			"Sesuaikan dengan layar",
			"Ajustar a la pantalla",
			"An Bildschirm anpassen",
			"画面に合わせます",
			"適應螢幕"
		],
		actualSize: [
			"Full Image",
			"原图",
			"ภาพเต็ม",
			"Hình ảnh đầy đủ",
			"Imej penuh",
			"Buong larawan",
			"Gambar penuh",
			"Imagen Completa",
			"Volles Bild",
			"フルイメージ",
			"原圖"
		],
		download: [
			"Download",
			"下载",
			"ดาวน์โหลด",
			"Tải xuống",
			"Muat Turun",
			"I-download",
			"Unduh",
			"Descargar",
			"Herunterladen",
			"ダウンロード",
			"下載"
		],
		monthPostfix: [
			"",
			"月",
			"เดือน",
			"Tháng",
			"Bulan",
			"Buwan",
			"Bulan",
			"Mes",
			"Monat",
			"月",
			"月"
		],
		name: languages,
		today: [
			"Today",
			"今天",
			"วันนี้",
			"Hôm nay",
			"Hari ini",
			"Ngayong araw",
			"Hari ini",
			"Hoy",
			"Heute",
			"今日",
			"今天"
		],
		backToToday: [
			"Back to Today",
			"返回今天",
			"ย้อนกลับไปยังวันนี้",
			"Quay lại hôm nay",
			"Kembali ke hari ini",
			"Bumalik sa ngayon",
			"Kembali ke hari ini",
			"Volver a hoy",
			"Zum heutigen Tag zurückkehren",
			"今日に戻ります",
			"返回今天"
		],
		timeSelect: [
			"Select Time",
			"选择时间",
			"เลือกเวลา",
			"Chọn thời gian",
			"Pilih masa",
			"Piliin ang oras",
			"Pilih waktu",
			"Seleccionar hora",
			"Zeit auswählen",
			"時間を選択します",
			"選擇時間"
		],
		dateSelect: [
			"Select Date",
			"选择日期",
			"เลือกวันที่",
			"Chọn ngày",
			"Pilih tarikh",
			"Pumili ng petsa",
			"Pilih tanggal",
			"Seleccionar fecha",
			"Datum auswählen",
			"日付を選択してください",
			"選擇日期"
		],
		weekSelect: [
			"Select Week",
			"选择周",
			"เลือกสัปดาห์",
			"Chọn tuần",
			"Pilih minggu",
			"Piliin ang linggo",
			"Pilih minggu",
			"Seleccionar semana",
			"Woche wählen",
			"週を選択します",
			"選擇週"
		],
		clear: [
			"Clear",
			"清除",
			"ล้าง",
			"Xóa",
			"Kosongkan",
			"I-clear",
			"Bersihkan",
			"Borrar",
			"Löschen",
			"削除します",
			"清除"
		],
		month: [
			"Month",
			"月",
			"เดือน",
			"Tháng",
			"Bulan",
			"Buwan",
			"Bulan",
			"Mes",
			"Monat",
			"月",
			"月"
		],
		year: [
			"Year",
			"年",
			"ปี",
			"Năm",
			"Tahun",
			"Taon",
			"Tahun",
			"Año",
			"Jahr",
			"年",
			"年"
		],
		previousMonth: [
			"Previous month (PageUp)",
			"上个月 (翻页上键)",
			"เดือนที่แล้ว (ปุ่ม Page Up)",
			"Tháng trước (Phím Page Up)",
			"Bulan lepas (kekunci Halaman Atas)",
			"Nakaraang buwan (Page Up key)",
			"Bulan lalu (tombol Page Up)",
			"Último mes (Tecla Previa página)",
			"Letzter Monat (Taste Seite hoch)",
			"先月（PageUp キー）",
			"上個月（翻頁上鍵）"
		],
		nextMonth: [
			"Next month (PageDown)",
			"下个月 (翻页下键)",
			"เดือนถัดไป (ปุ่ม Page Down)",
			"Tháng sau (Phím Page Down)",
			"Bulan depan (kekunci Halaman Bawah)",
			"Susunod na buwan (Page Down key)",
			"Bulan berikutnya (tombol Page Down)",
			"Siguiente Mes (Tecla Siguiente página)",
			"Nächster Monat (Taste Bild ab)",
			"翌月（PageDown キー）",
			"下個月（翻頁下鍵）"
		],
		monthSelect: [
			"Select Month",
			"选择月份",
			"เลือกเดือน",
			"Chọn tháng",
			"Pilih bulan",
			"Piliin ang buwan",
			"Pilih bulan",
			"Seleccionar mes",
			"Monat auswählen",
			"月を選択",
			"選擇月份"
		],
		yearSelect: [
			"Select Year",
			"选择年份",
			"เลือกปี",
			"Chọn năm",
			"Pilih tahun",
			"Piliin ang taon",
			"Pilih tahun",
			"Seleccionar año",
			"Jahr wählen",
			"年を選択します",
			"選擇年份"
		],
		decadeSelect: [
			"Select Decade",
			"选择年代",
			"เลือกทศวรรษ",
			"Chọn một thập kỷ",
			"Pilih satu dekad",
			"Pumili ng dekada",
			"Pilih dekade",
			"Seleccionar una década",
			"Wählen Sie ein Jahrzehnt",
			"10年を選択します",
			"選擇年代"
		],
		yearFormat: [
			"YYYY",
			"YYYY年",
			"YYYY",
			"YYYY",
			"YYYY",
			"YYYY",
			"YYYY",
			"YYYY",
			"YYYY",
			"YYYY",
			"YYYY年"
		],
		monthFormat: [
			"M",
			"M月",
			"M",
			"M",
			"M",
			"M",
			"M",
			"M",
			"M",
			"M",
			"M月"
		],
		dayFormat: [
			"D",
			"D日",
			"D",
			"D",
			"D",
			"D",
			"D",
			"D",
			"D",
			"D",
			"D日"
		],
		dateFormat: [
			"M/D/YYYY",
			"YYYY年M月D日",
			"DD/MM/YYYY",
			"DD/MM/YYYY",
			"DD/MM/YYYY",
			"DD/MM/YYYY",
			"DD/MM/YYYY",
			"DD/MM/YYYY",
			"DD/MM/YYYY",
			"YYYY/MM/DD",
			"YYYY年M月D日"
		],
		dateTimeFormat: [
			"M/D/YYYY HH:mm:ss",
			"YYYY年M月D日 HH时mm分ss秒",
			"DD/MM/YYYY HH:mm:ss",
			"DD/MM/YYYY HH:mm:ss",
			"DD/MM/YYYY HH:mm:ss",
			"DD/MM/YYYY HH:mm:ss",
			"DD/MM/YYYY HH:mm:ss",
			"DD/MM/YYYY HH:mm:ss",
			"DD/MM/YYYY HH:mm:ss",
			"YYYY/MM/DD HH:mm:ss",
			"YYYY年M月D日 HH時mm分ss秒"
		],
		monthBeforeYear: [
			"true",
			"",
			"true",
			"true",
			"true",
			"true",
			"true",
			"true",
			"true",
			"",
			""
		],
		previousYear: [
			"Previous Year (" + controlKeyName + " + Left)",
			"上一年 (" + controlKeyName + "键加左方向键)",
			"ปีก่อนหน้า (ปุ่ม " + controlKeyName + " + ปุ่มลูกศรซ้าย)",
			"Năm trước (phím " + controlKeyName + " + phím Mũi tên Trái)",
			"Tahun sebelumnya (" + controlKeyName + " kekunci + Kekunci Anak Panah Kiri)",
			"Nakaraang taon (" + controlKeyName + " key + Left Arrow key)",
			"Tahun sebelumnya (tombol " + controlKeyName + " + tombol Panah Kiri)",
			"Año anterior (" + controlKeyName + " tecla + tecla de flecha izquierda)",
			"Vorheriges Jahr (" + controlKeyName + "Taste + Linke Pfeiltaste)",
			"前年（" + controlKeyName + "キー + 左矢印キー）",
			"上一年 (" + controlKeyName + "鍵加左方向鍵)"
		],
		nextYear: [
			"Next Year (" + controlKeyName + " + Right)",
			"下一年 (" + controlKeyName + "键加右方向键)",
			"ปีถัดไป (ปุ่ม " + controlKeyName + " + ปุ่มลูกศรขวา)",
			"Năm sau (phím " + controlKeyName + " + phím Mũi tên Phải)",
			"Tahun depan (" + controlKeyName + " kekunci + Kekunci Anak Panah Kanan)",
			"Susunod na taon (" + controlKeyName + " key + Right Arrow key)",
			"Tahun berikutnya (tombol " + controlKeyName + " + tombol Panah Kanan)",
			"Año siguiente (" + controlKeyName + " tecla + tecla de flecha derecha)",
			"Nächstes Jahr (" + controlKeyName + "Taste + Rechte Pfeiltaste)",
			"翌年（" + controlKeyName + "キー + 右矢印キー）",
			"下一年 (" + controlKeyName + "鍵加右方向鍵)"
		],
		previousDecade: [
			"Previous Decade",
			"上一年代",
			"ทศวรรษก่อนหน้า",
			"Thập kỷ trước",
			"Dekad sebelumnya",
			"Nakaraang dekada",
			"Dekade sebelumnya",
			"Década anterior",
			"Vorheriges Jahrzehnt",
			"前の10年",
			"上一年代"
		],
		nextDecade: [
			"Next Decade",
			"下一年代",
			"ทศวรรษหน้า",
			"Thập kỷ tiếp theo",
			"Dekad depan",
			"Susunod na dekada",
			"Dekade selanjutnya",
			"Década siguiente",
			"Nächstes Jahrzehnt",
			"次の10年",
			"下一年代"
		],
		previousCentury: [
			"Previous Century",
			"上一世纪",
			"ศตวรรษก่อนหน้า",
			"Thế kỷ trước",
			"Abad sebelumnya",
			"Nakaraang siglo",
			"Abad sebelumnya",
			"Siglo anterior",
			"Vorheriges Jahrhundert",
			"前の世紀",
			"上一世紀"
		],
		nextCentury: [
			"Next Century",
			"下一世纪",
			"ศตวรรษหน้า",
			"Thế kỷ tiếp theo",
			"Abad depan",
			"Susunod na siglo",
			"Abad selanjutnya",
			"Siglo siguiente",
			"Nächstes Jahrhundert",
			"次の世紀",
			"下一世紀"
		],
		time: [
			"Time",
			"时间",
			"เวลา",
			"Thời gian",
			"Masa",
			"Oras",
			"Waktu",
			"Hora",
			"Zeit",
			"時間",
			"時間"
		],
		rotate: [
			"Rotate",
			"旋转",
			"หมุน",
			"Xoay",
			"Putar",
			"Paikutin",
			"Memutar",
			"Rotar",
			"Drehen",
			"回転",
			"旋轉"
		]
	};
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/common/locale.js
function i18n(key) {
	return i18nInstance.t(key);
}
var import_assignWith, import_set, detector, resources, i18nInstance;
var init_locale = __esmMin((() => {
	import_assignWith = /* @__PURE__ */ __toESM(require_assignWith());
	import_set = /* @__PURE__ */ __toESM(require_set());
	init_i18next();
	init_i18nextBrowserLanguageDetector();
	init_wording();
	detector = new Browser();
	if (!(typeof window === "undefined")) detector.addDetector({
		name: "userAgent",
		lookup: function() {
			var match = navigator.userAgent.match(/language\/([a-zA-Z'-_]+)/i);
			if (match) return match[1].replace("_", "-");
		}
	});
	resources = {};
	languages.forEach(function(lang, index) {
		var translation = (0, import_assignWith.default)({}, translationMap, function(objectValue, sourceValue) {
			return sourceValue[index];
		});
		(0, import_set.default)(resources, [lang, "translation"], translation);
	});
	i18nInstance = instance.createInstance();
	i18nInstance.use(detector).init({
		resources,
		fallbackLng: {
			"zh-TW": ["zh-HK", "zh-CN"],
			fil: ["tl-PH"],
			id: ["id-ID"],
			es: ["es-MX"],
			default: ["zh-CN"]
		},
		detection: {
			order: [
				"querystring",
				"userAgent",
				"cookie",
				"navigator"
			],
			lookupCookie: "language",
			caches: []
		}
	});
})), import_react$64, import_react_dom$12, MODAL_TRANSITION_IN_DURATION, Modal;
var init_Modal$1 = __esmMin((() => {
	init_createElement();
	init_tslib_es6();
	import_react$64 = /* @__PURE__ */ __toESM(require_react());
	import_react_dom$12 = /* @__PURE__ */ __toESM(require_react_dom());
	init_helper();
	init_Button();
	init_Dragger();
	init_keepDom();
	init_context$4();
	init_theme();
	init_preventScrollPenetrate();
	init_stylusAdapter();
	init_focus();
	init_locale();
	MODAL_TRANSITION_IN_DURATION = 300;
	Modal = function(_super) {
		__extends(Modal, _super);
		function Modal() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.draggerRef = import_react$64.createRef();
			_this.footerRef = import_react$64.createRef();
			_this.isComposing = false;
			_this.mouseDownTarget = null;
			_this.handleClose = function(e) {
				var _a = _this.props, onClose = _a.onClose, onCancel = _a.onCancel;
				if (!_a.visible) return;
				(onClose || onCancel)(e);
			};
			_this.handleMaskClick = function(e) {
				var _a;
				var _b = _this.props, maskClosable = _b.maskClosable, onClickMask = _b.onClickMask;
				if ((_a = _this.draggerDom) === null || _a === void 0 ? void 0 : _a.contains(_this.mouseDownTarget)) return;
				if (maskClosable === true) _this.handleClose(e);
				onClickMask(e);
			};
			_this.handleDraggerClick = function(e) {
				e.stopPropagation();
			};
			_this.handleDraggerMouseDown = function(e) {
				_this.mouseDownTarget = e.target;
			};
			_this.handleCompositionStart = function() {
				_this.isComposing = true;
			};
			_this.handleCompositionEnd = function() {
				_this.isComposing = false;
			};
			_this.handleKeyDown = function(e) {
				var _a;
				var _b = _this.props, visible = _b.visible, footer = _b.footer, okDisabled = _b.okDisabled, cancelText = _b.cancelText, closable = _b.closable, enableKeyboard = _b.enableKeyboard;
				if (!visible || _this.isComposing) return;
				if (e.key === "Tab") {
					_this.traverseFocus(e);
					return;
				}
				if (typeof enableKeyboard === "boolean") {
					if (!enableKeyboard) return;
				} else if (footer || footer === null) return;
				if (!okDisabled && e.key === "Enter" && !((_a = _this.footerRef.current) === null || _a === void 0 ? void 0 : _a.contains(document.activeElement))) _this.handleClickOk();
				else if ((cancelText || closable) && e.key === "Escape") _this.handleClose();
			};
			_this.handleClickOk = function(e) {
				var _a = _this.props, visible = _a.visible, onOk = _a.onOk, okDisabled = _a.okDisabled;
				if (!visible || okDisabled) return;
				onOk(e);
			};
			_this.handleClickCancel = function(e) {
				var _a = _this.props, visible = _a.visible, onCancel = _a.onCancel;
				if (!visible) return;
				onCancel(e);
			};
			_this.handleClickAction = function(e) {
				var _a = _this.props, visible = _a.visible, onClickAction = _a.onClickAction;
				if (!visible) return;
				onClickAction(e);
			};
			_this.clearMouseDownTarget = function() {
				setTimeout(function() {
					_this.mouseDownTarget = null;
				}, 0);
			};
			_this.themedRender = function(classNames) {
				var _a, _b;
				var _c = _this.props, prefixCls = _c.prefixCls, className = _c.className, style = _c.style, title = _c.title, visible = _c.visible, maskStyle = _c.maskStyle, maskClassName = _c.maskClassName, mask = _c.mask, draggable = _c.draggable, onDragEnd = _c.onDragEnd, destroyOnClose = _c.destroyOnClose, zIndex = _c.zIndex, containerDom = _c.containerDom, header = _c.header, testId = _c.testId, icon = _c.icon;
				var cls = classNames(prefixCls, className, prefixCls + "-" + (visible ? "visible" : "hidden"), (_a = {}, _a[prefixCls + "-with-icon"] = icon, _a));
				var maskCls = classNames(prefixCls + "-mask", maskClassName, prefixCls + "-mask-" + (visible ? "visible" : "hidden"), (_b = {}, _b[prefixCls + "-mask-display"] = mask, _b[prefixCls + "-mask-in-container"] = containerDom !== document.body, _b));
				if (!containerDom || destroyOnClose && !decideKeepDom.call(_this, 240, visible)) return null;
				return import_react_dom$12.createPortal(h$5(ContainerContext.Provider, { value: _this.draggerDom }, h$5(PreventScrollPenetrateContainer, {
					className: maskCls,
					style: __assign({ zIndex }, maskStyle),
					onClick: _this.handleMaskClick,
					"aria-hidden": !visible
				}, h$5(Dragger, {
					className: cls,
					style,
					draggable,
					ref: _this.draggerRef,
					"data-testid": testId,
					onDragEnd,
					onClick: _this.handleDraggerClick,
					onKeyDown: _this.handleKeyDown,
					onMouseDown: _this.handleDraggerMouseDown,
					onCompositionStart: _this.handleCompositionStart,
					onCompositionEnd: _this.handleCompositionEnd
				}, _this.renderClose(classNames), _this.renderIcon(classNames), header ? h$5("div", { className: classNames(prefixCls + "-header") }, header) : null, title !== null ? h$5("div", { className: classNames(prefixCls + "-title") }, title) : null, _this.renderContent(classNames), _this.renderFooter(classNames)))), containerDom);
			};
			return _this;
		}
		Object.defineProperty(Modal.prototype, "draggerDom", {
			get: function() {
				var _a;
				return (_a = this.draggerRef.current) === null || _a === void 0 ? void 0 : _a.ref;
			},
			enumerable: false,
			configurable: true
		});
		Modal.prototype.isFocusInside = function() {
			var _a;
			return (_a = this.draggerDom) === null || _a === void 0 ? void 0 : _a.contains(document.activeElement);
		};
		Modal.prototype.focusSelf = function() {
			var _this = this;
			var _a = this.props, visible = _a.visible, autoFocus = _a.autoFocus;
			if (visible && autoFocus && !this.isFocusInside()) {
				saveFocus();
				setTimeout(function() {
					var _a;
					!_this.isFocusInside() && ((_a = _this.draggerDom) === null || _a === void 0 || _a.focus());
				}, MODAL_TRANSITION_IN_DURATION);
			}
		};
		Modal.prototype.restorePreviousFocus = function() {
			var _a = this.props, visible = _a.visible, autoFocus = _a.autoFocus;
			if (!visible && autoFocus) restoreFocus();
		};
		Modal.prototype.traverseFocus = function(e) {
			var container = this.draggerDom;
			if (!container) return;
			traverseFocusIn(container, e);
		};
		Modal.prototype.componentDidMount = function() {
			this.forceUpdate();
			this.focusSelf();
			var _a = this.props, visible = _a.visible, mask = _a.mask, containerDom = _a.containerDom;
			toggleGlobalScrollEvents(Boolean(visible && mask));
			containerDom === null || containerDom === void 0 || containerDom.addEventListener("click", this.clearMouseDownTarget);
		};
		Modal.prototype.componentDidUpdate = function(prevProps) {
			if (!prevProps.visible) this.focusSelf();
			else this.restorePreviousFocus();
			var _a = this.props, visible = _a.visible, mask = _a.mask;
			toggleGlobalScrollEvents(Boolean(visible && mask));
		};
		Modal.prototype.componentWillUnmount = function() {
			var _a;
			toggleGlobalScrollEvents(false);
			(_a = this.props.containerDom) === null || _a === void 0 || _a.removeEventListener("click", this.clearMouseDownTarget);
		};
		Modal.prototype.renderAction = function(classNames) {
			var _a = this.props, prefixCls = _a.prefixCls, action = _a.action, actionButtonType = _a.actionButtonType;
			if (!action) return null;
			var actionMainNode;
			var icon;
			if (action !== null && typeof action === "object") if (import_react$64.isValidElement(action)) actionMainNode = action;
			else {
				if ("text" in action) actionMainNode = action.text;
				if ("icon" in action) icon = action.icon;
			}
			else actionMainNode = action;
			return h$5(WithStylusClick, { clickHandler: this.handleClickAction }, actionButtonType ? h$5(Button_default, {
				icon,
				type: actionButtonType
			}, actionMainNode) : h$5("button", { className: classNames(prefixCls + "-footer-action") }, icon ? typeof icon === "string" ? h$5("div", {
				className: classNames(prefixCls + "-footer-action-icon"),
				style: { backgroundImage: "url(\"" + icon + "\")" }
			}) : icon : null, actionMainNode ? typeof actionMainNode === "string" ? h$5("div", { className: classNames(prefixCls + "-footer-action-text") }, actionMainNode) : actionMainNode : null));
		};
		Modal.prototype.renderFooter = function(classNames) {
			var _a = this.props, prefixCls = _a.prefixCls, footer = _a.footer, okText = _a.okText, cancelText = _a.cancelText, okDisabled = _a.okDisabled, okButtonType = _a.okButtonType, footerLayout = _a.footerLayout, footerDirection = _a.footerDirection, footerClassName = _a.footerClassName, footerStyle = _a.footerStyle;
			if (footer === null) return null;
			else if (footer) return footer;
			var cancelElement = cancelText ? h$5(WithStylusClick, { clickHandler: this.handleClickCancel }, h$5(Button_default, null, cancelText)) : null;
			var okElement = h$5(WithStylusClick, { clickHandler: this.handleClickOk }, h$5(Button_default, {
				className: classNames(prefixCls + "-footer-ok"),
				type: okButtonType,
				disabled: okDisabled
			}, okText));
			var actionElement = this.renderAction(classNames);
			var footerCls = classNames(prefixCls + "-footer", prefixCls + "-footer-" + footerLayout, footerClassName);
			var child = footerDirection === "mac" ? h$5(import_react$64.Fragment, null, actionElement, cancelElement, okElement) : h$5(import_react$64.Fragment, null, okElement, actionElement, cancelElement);
			return h$5("div", {
				className: footerCls,
				style: footerStyle,
				ref: this.footerRef
			}, child);
		};
		Modal.prototype.renderContent = function(classNames) {
			var _a;
			var _b = this.props, prefixCls = _b.prefixCls, title = _b.title, content = _b.content, children = _b.children;
			return h$5("div", { className: classNames(prefixCls + "-content", (_a = {}, _a[prefixCls + "-content-empty-title"] = title === "", _a)) }, content || children);
		};
		Modal.prototype.renderClose = function(classNames) {
			var _a = this.props, prefixCls = _a.prefixCls, closable = _a.closable, close = _a.close;
			if (!closable) return null;
			return h$5(WithStylusClick, { clickHandler: this.handleClose }, close ? h$5("div", { className: classNames(prefixCls + "-close-container") }, close) : h$5("div", { className: classNames(prefixCls + "-close") }));
		};
		Modal.prototype.renderIcon = function(classNames) {
			var _a = this.props, prefixCls = _a.prefixCls, icon = _a.icon;
			if (!icon) return null;
			var iconCls = classNames(prefixCls + "-icon");
			if (import_react$64.isValidElement(icon)) return h$5("div", { className: iconCls }, icon);
			if (typeof icon === "string") return h$5("div", {
				className: iconCls,
				style: { backgroundImage: "url(\"" + icon + "\")" }
			});
			return h$5("div", { className: classNames(prefixCls + "-icon", prefixCls + "-icon-default") });
		};
		Modal.prototype.render = function() {
			return consumeTheme(this.themedRender);
		};
		return Modal;
	}(import_react$64.Component);
	Modal.defaultProps = {
		prefixCls: "dui-modal",
		title: "",
		content: "",
		footer: "",
		onCancel: emptyFn,
		onOk: emptyFn,
		cancelText: i18n("cancel"),
		okText: i18n("ok"),
		mask: true,
		maskClosable: false,
		closable: true,
		onDragEnd: emptyFn,
		destroyOnClose: false,
		onClickMask: emptyFn,
		action: "",
		onClickAction: emptyFn,
		containerDom: typeof document !== "undefined" ? document.body : void 0,
		okDisabled: false,
		okButtonType: "primary",
		footerLayout: "default",
		footerDirection: "mac",
		autoFocus: true
	};
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/utils/show.js
function showWithTransition(_a) {
	var Component = _a.Component, transitionDuration = _a.transitionDuration, autoClose = _a.autoClose, props = _a.props, forcedProps = _a.forcedProps, _b = _a.injectClosePropNames, injectClosePropNames = _b === void 0 ? [] : _b, _c = _a.deepInjectClose, deepInjectClose = _c === void 0 ? [] : _c, contexts = _a.contexts;
	var div = document.createElement("div");
	document.body.appendChild(div);
	var timer;
	var closed = false;
	injectClosePropNames.forEach(function(key) {
		overrideSingle(props, key);
	});
	deepInjectClose.forEach(function(_a) {
		var reference = _a[0], key = _a[1];
		if (Array.isArray(reference)) {
			reference.forEach(function(obj) {
				return overrideSingle(obj, key);
			});
			return;
		}
		overrideSingle(reference, key);
	});
	var currentProps = __assign(__assign(__assign({}, props), forcedProps), { visible: true });
	function overrideSingle(obj, key) {
		obj[key] = inject(obj[key] || emptyFn, close);
	}
	function update(newProps) {
		if (closed) return;
		currentProps = __assign(__assign(__assign(__assign({}, currentProps), newProps), forcedProps), { visible: true });
		render(currentProps);
	}
	function close() {
		if (closed) return;
		closed = true;
		clearTimeout(timer);
		currentProps = __assign(__assign({}, currentProps), { visible: false });
		render(currentProps);
		setTimeout(function() {
			import_react_dom$11.unmountComponentAtNode(div);
			div.remove();
		}, transitionDuration + 20);
	}
	function render(props) {
		var element = (contexts === null || contexts === void 0 ? void 0 : contexts.length) ? composeContexts(contexts, h$5(Component, __assign({}, props))) : h$5(Component, __assign({}, props));
		import_react_dom$11.render(element, div);
	}
	render(currentProps);
	if (autoClose) timer = setTimeout(close, props.duration || 2e3);
	return {
		update,
		close
	};
}
function composeContexts(contexts, children) {
	return contexts.reduce(function(child, _a) {
		var Provider = _a.provider, value = _a.value;
		return h$5(Provider, { value }, child);
	}, children);
}
var import_react_dom$11;
var init_show$2 = __esmMin((() => {
	init_createElement();
	init_tslib_es6();
	import_react_dom$11 = /* @__PURE__ */ __toESM(require_react_dom());
	init_helper();
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/components/Modal/confirm.js
var confirm_default;
var init_confirm = __esmMin((() => {
	init_Modal$1();
	init_show$2();
	init_helper();
	confirm_default = wrapWithConfigDefaults(function(config) {
		config.onClose = config.onClose || config.onCancel;
		return showWithTransition({
			Component: Modal,
			transitionDuration: 240,
			autoClose: false,
			props: config,
			forcedProps: { destroyOnClose: true },
			injectClosePropNames: [
				"onOk",
				"onCancel",
				"onClickAction",
				"onClose"
			],
			contexts: config.contexts
		});
	});
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/components/Modal/index.js
var Modal_default;
var init_Modal = __esmMin((() => {
	init_style();
	init_Modal$1();
	init_confirm();
	injectStyle("components/Modal/style/index.css", "@-webkit-keyframes dui-modal-fade-in{0%{opacity:0}to{opacity:1}}@keyframes dui-modal-fade-in{0%{opacity:0}to{opacity:1}}@-webkit-keyframes dui-modal-pop-up{0%{opacity:0;-webkit-transform:scale3d(.9,.9,1);transform:scale3d(.9,.9,1)}to{opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1)}}@keyframes dui-modal-pop-up{0%{opacity:0;-webkit-transform:scale3d(.9,.9,1);transform:scale3d(.9,.9,1)}to{opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1)}}[data-dui-1-28-2~=\"dui-modal\"]{position:relative;width:400px;-webkit-box-sizing:border-box;box-sizing:border-box;padding:17px 24px 24px;border-radius:8px;pointer-events:auto;-webkit-animation:dui-modal-pop-up .3s cubic-bezier(.4,0,.2,1);animation:dui-modal-pop-up .3s cubic-bezier(.4,0,.2,1);-webkit-tap-highlight-color:transparent;-webkit-box-shadow:0 6px 32px 2px var(--dui-shadow-color,rgba(68,73,77,.16)),0 0 0 1px rgba(0,0,0,.04),0 4px 6px 2px rgba(0,0,0,.04);box-shadow:0 6px 32px 2px var(--dui-shadow-color,rgba(68,73,77,.16)),0 0 0 1px rgba(0,0,0,.04),0 4px 6px 2px rgba(0,0,0,.04);cursor:default;background-color:var(--bg-lv4-default,#fff)}[data-dui-1-28-2~=\"dui-modal-hidden\"],[data-dui-1-28-2~=\"dui-modal-visible\"]{-webkit-transition-timing-function:cubic-bezier(.4,0,.2,1);transition-timing-function:cubic-bezier(.4,0,.2,1);-webkit-transition-property:opacity,visibility,-webkit-transform;transition-property:opacity,visibility,-webkit-transform;transition-property:opacity,transform,visibility;transition-property:opacity,transform,visibility,-webkit-transform}[data-dui-1-28-2~=\"dui-modal-visible\"]{opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transition-duration:.3s;transition-duration:.3s}[data-dui-1-28-2~=\"dui-modal-hidden\"]{opacity:0;-webkit-transform:scale3d(.9,.9,1);transform:scale3d(.9,.9,1);-webkit-transition-duration:.24s;transition-duration:.24s}[data-dui-1-28-2~=\"dui-modal-with-icon\"]{padding-left:56px}[data-dui-1-28-2~=\"dui-modal-with-icon\"] [data-dui-1-28-2~=\"dui-modal-footer\"]{margin-left:-32px}[data-dui-1-28-2~=\"dui-modal-mask\"]{position:fixed;z-index:9998;top:0;left:0;right:0;bottom:0;opacity:1;pointer-events:none;-webkit-animation:dui-modal-fade-in .3s cubic-bezier(.4,0,.2,1);animation:dui-modal-fade-in .3s cubic-bezier(.4,0,.2,1);display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}[data-dui-1-28-2~=\"dui-modal-mask-in-container\"]{position:absolute}[data-dui-1-28-2~=\"dui-modal-mask-display\"]{pointer-events:auto;background-color:var(--dui-mask-color,hsla(0,0%,100%,.65))}[data-dui-1-28-2~=\"dui-modal-mask-visible\"]{opacity:1;visibility:visible;-webkit-transition:all .3s cubic-bezier(.4,0,.2,1);transition:all .3s cubic-bezier(.4,0,.2,1)}[data-dui-1-28-2~=\"dui-modal-mask-hidden\"]{opacity:0;visibility:hidden;-webkit-transition:all .24s cubic-bezier(.4,0,.2,1);transition:all .24s cubic-bezier(.4,0,.2,1)}[data-dui-1-28-2~=\"dui-modal-close\"]{border-radius:4px}[data-dui-1-28-2~=\"dui-modal-close\"]:before{content:\"\";position:absolute;left:0;right:0;top:0;bottom:0;background-size:contain;background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cpath fill='%23464d5a' d='M17 7.714L12.714 12 17 16.286l-.714.714L12 12.714 7.714 17 7 16.286 11.286 12 7 7.714 7.714 7 12 11.286 16.286 7z'/%3E%3C/svg%3E\");background-position:50%;background-repeat:no-repeat;border-radius:inherit;-webkit-filter:var(--dui-invert-filter,none);filter:var(--dui-invert-filter,none)}[data-dui-1-28-2~=\"dui-modal-close\"]:hover{background-color:var(--feedback-hover,rgba(51,77,102,.06))}[data-dui-1-28-2~=\"dui-modal-close\"]:active{background-color:var(--feedback-active,rgba(51,77,102,.08))}[data-dui-1-28-2~=\"dui-modal-close\"],[data-dui-1-28-2~=\"dui-modal-close-container\"]{position:absolute;z-index:1;width:24px;height:24px;top:16px;right:20px}[data-dui-1-28-2~=\"dui-modal-icon\"]{width:20px;height:20px;position:absolute;left:24px;top:26px;background-position:50%;background-size:contain;background-repeat:no-repeat}[data-dui-1-28-2~=\"dui-modal-icon-default\"]{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Ccircle cx='10' cy='10' r='8.5' fill='%230080f8'/%3E%3Cpath fill-rule='evenodd' d='M10 5a1 1 0 100 2 1 1 0 100-2zm0 4a1 1 0 00-1 1v4a1 1 0 102 0v-4a1 1 0 00-1-1z' fill='%23fff'/%3E%3C/svg%3E\")}[data-dui-1-28-2~=\"dui-modal-header\"]{margin-bottom:16px}[data-dui-1-28-2~=\"dui-modal-title\"]{font-weight:600;font-size:16px;margin-bottom:17px;line-height:22px;padding-right:24px}[data-dui-1-28-2~=\"dui-modal-content\"],[data-dui-1-28-2~=\"dui-modal-title\"]{color:var(--text-ultrastrong,rgba(0,0,0,.9))}[data-dui-1-28-2~=\"dui-modal-content\"]{font-size:14px;height:-webkit-max-content;height:-moz-max-content;height:max-content;min-height:88px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-flow:column nowrap;-ms-flex-flow:column nowrap;flex-flow:column nowrap;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:start;-webkit-align-items:flex-start;-ms-flex-align:start;align-items:flex-start;word-break:break-word}[data-dui-1-28-2~=\"dui-modal-content-empty-title\"]{margin-top:28px;min-height:60px}[data-dui-1-28-2~=\"dui-modal-footer\"]{margin-top:24px;position:relative}[data-dui-1-28-2~=\"dui-modal-footer\"],[data-dui-1-28-2~=\"dui-modal-footer-action\"]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}[data-dui-1-28-2~=\"dui-modal-footer-action\"]{border:none;margin:0;padding:0;background:transparent;-webkit-tap-highlight-color:transparent;cursor:default;font-size:12px;color:var(--text-strong,rgba(0,0,0,.76));-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-flow:row nowrap;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}[data-dui-1-28-2~=\"dui-modal-footer-action-icon\"]{display:inline-block;width:16px;height:16px;margin-right:6px;background-size:contain;background-position:50%;background-repeat:no-repeat}[data-dui-1-28-2~=\"dui-modal-footer-action-text\"]{border-top:1px solid transparent;border-bottom:1px solid transparent}[data-dui-1-28-2~=\"dui-modal-footer-action\"]:hover [data-dui-1-28-2~=\"dui-modal-footer-action-text\"]{border-bottom-color:var(--text-strong,rgba(0,0,0,.76))}[data-dui-1-28-2~=\"dui-modal-footer-default\"]{-webkit-box-pack:end;-webkit-justify-content:flex-end;-ms-flex-pack:end;justify-content:flex-end}[data-dui-1-28-2~=\"dui-modal-footer-default\"]>:nth-last-child(3){margin-right:auto}[data-dui-1-28-2~=\"dui-modal-footer-default\"]>:last-child{margin-left:var(--Space-space_medium_m,16px)}[data-dui-1-28-2~=\"dui-modal-footer-stretch\"]{-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}[data-dui-1-28-2~=\"dui-modal-footer-stretch\"]>*{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}[data-dui-1-28-2~=\"dui-modal-footer-stretch\"]>:not(:first-child){margin-left:var(--Space-space_medium_m,16px)}");
	Modal.confirm = confirm_default;
	Modal_default = Modal;
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/components/Loading/Spin.js
var import_react$63, VIEW_BOX_SIZE, Spin;
var init_Spin = __esmMin((() => {
	init_style();
	init_createElement();
	init_tslib_es6();
	import_react$63 = /* @__PURE__ */ __toESM(require_react());
	init_theme();
	injectStyle("components/Loading/style/spin.css", "[data-dui-1-28-2~=\"dui-spin\"]{position:relative;width:100%;height:100%}[data-dui-1-28-2~=\"dui-spin-container\"]{position:absolute;left:50%;top:50%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-flow:row nowrap;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;width:48px;height:48px}[data-dui-1-28-2~=\"dui-spin-circle\"]{border-radius:50%;width:100%;height:100%;-webkit-animation:dui-spin-rotate .8s linear infinite;animation:dui-spin-rotate .8s linear infinite;-webkit-box-sizing:border-box;box-sizing:border-box}[data-dui-1-28-2~=\"dui-spin-circle-light\"]{border:4px solid hsla(0,0%,100%,.4);border-top-color:#fff}[data-dui-1-28-2~=\"dui-spin-circle-dark\"]{border:4px solid rgba(0,0,0,.12);border-top-color:rgba(0,0,0,.32)}[data-dui-1-28-2~=\"dui-spin-circle-primary\"]{border:4px solid rgba(30,111,255,.24);border-top:4px solid var(--accent-default,#1e6fff)}@-webkit-keyframes dui-spin-rotate{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes dui-spin-rotate{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}");
	VIEW_BOX_SIZE = 48;
	Spin = function(_super) {
		__extends(Spin, _super);
		function Spin() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.rootRef = import_react$63.createRef();
			_this.themedRender = function(classNames) {
				var _a = _this.props, prefixCls = _a.prefixCls, className = _a.className, style = _a.style, type = _a.type, circleClassName = _a.circleClassName, circleStyle = _a.circleStyle;
				var cls = classNames(prefixCls, className);
				var circleCls = classNames(prefixCls + "-circle", prefixCls + "-circle-" + type, circleClassName);
				return h$5("div", {
					className: cls,
					style,
					ref: _this.rootRef
				}, h$5("div", {
					className: classNames(prefixCls + "-container"),
					style: _this.calcContainerTransform()
				}, h$5("div", {
					className: circleCls,
					style: circleStyle
				})));
			};
			return _this;
		}
		Spin.prototype.calcContainerTransform = function() {
			var rootDom = this.rootRef.current;
			if (!rootDom) return;
			var width = rootDom.clientWidth, height = rootDom.clientHeight;
			return { transform: "translate(-50%,-50%) scale(" + Math.min(width, height) / VIEW_BOX_SIZE + ")" };
		};
		Spin.prototype.componentDidMount = function() {
			this.forceUpdate();
		};
		Spin.prototype.render = function() {
			return consumeTheme(this.themedRender);
		};
		return Spin;
	}(import_react$63.PureComponent);
	Spin.defaultProps = {
		prefixCls: "dui-spin",
		type: "dark"
	};
})), import_react$62, import_react_dom$10, Loading;
var init_Loading$1 = __esmMin((() => {
	init_createElement();
	init_tslib_es6();
	import_react$62 = /* @__PURE__ */ __toESM(require_react());
	import_react_dom$10 = /* @__PURE__ */ __toESM(require_react_dom());
	init_Spin();
	init_keepDom();
	init_theme();
	init_preventScrollPenetrate();
	Loading = function(_super) {
		__extends(Loading, _super);
		function Loading() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.themedRender = function(classNames) {
				var _a, _b;
				var _c = _this.props, prefixCls = _c.prefixCls, className = _c.className, style = _c.style, tip = _c.tip, visible = _c.visible, children = _c.children, embedded = _c.embedded, tipStyle = _c.tipStyle, zIndex = _c.zIndex, tipClassName = _c.tipClassName, maskClassName = _c.maskClassName, maskStyle = _c.maskStyle, spinClassName = _c.spinClassName, spinStyle = _c.spinStyle;
				var type = children ? "wrap" : embedded ? "embedded" : "fixed";
				var cls = classNames(prefixCls, className, prefixCls + "-" + type, (_a = {}, _a[prefixCls + "-hidden"] = !visible && !embedded, _a));
				var maskCls = classNames(prefixCls + "-mask", prefixCls + "-mask-" + type, maskClassName, (_b = {}, _b[prefixCls + "-mask-hidden"] = !visible, _b));
				var containerCls = classNames(prefixCls + "-container", prefixCls + "-container-" + type);
				var defaultSpinSize = {
					width: "48px",
					height: "48px"
				};
				var tipElement = tip ? h$5("div", {
					className: classNames(prefixCls + "-tip", tipClassName),
					style: tipStyle
				}, tip) : null;
				if (type === "wrap") return h$5("div", { className: containerCls }, children, h$5("div", {
					className: maskCls,
					style: maskStyle,
					"aria-hidden": !visible
				}, h$5("div", {
					className: cls,
					style
				}, h$5(Spin, {
					style: __assign(__assign({}, defaultSpinSize), spinStyle),
					className: spinClassName,
					type: _this.getUserSetSpinType() || "dark"
				}), tipElement)));
				if (type === "embedded") return h$5("div", {
					className: cls,
					style: __assign(__assign({}, defaultSpinSize), style)
				}, h$5(Spin, {
					style: spinStyle,
					className: spinClassName,
					type: _this.getUserSetSpinType() || "dark"
				}));
				if (!decideKeepDom.call(_this, 200, visible)) return null;
				return import_react_dom$10.createPortal(h$5(PreventScrollPenetrateContainer, {
					className: containerCls,
					style: { zIndex },
					"aria-hidden": !visible
				}, h$5("div", {
					className: maskCls,
					style: maskStyle
				}), h$5("div", {
					className: cls,
					style
				}, h$5(Spin, {
					style: __assign(__assign({}, defaultSpinSize), spinStyle),
					className: spinClassName,
					type: _this.getUserSetSpinType() || "light"
				}), tipElement)), document.body);
			};
			return _this;
		}
		Loading.prototype.render = function() {
			return consumeTheme(this.themedRender);
		};
		Loading.prototype.getUserSetSpinType = function() {
			return this.props.spinType || (document.documentElement.classList.contains("__DARK__") ? "light" : void 0);
		};
		return Loading;
	}(import_react$62.Component);
	Loading.defaultProps = {
		prefixCls: "dui-loading",
		embedded: true
	};
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/components/Loading/show.js
var show_default$1;
var init_show$1 = __esmMin((() => {
	init_Loading$1();
	init_show$2();
	init_helper();
	show_default$1 = wrapWithConfigDefaults(function(config) {
		if (config === void 0) config = {};
		return showWithTransition({
			Component: Loading,
			transitionDuration: 200,
			autoClose: false,
			forcedProps: { embedded: false },
			props: config,
			contexts: config.contexts
		});
	});
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/components/Loading/index.js
var Loading_default;
var init_Loading = __esmMin((() => {
	init_style();
	init_show$1();
	init_Loading$1();
	injectStyle("components/Loading/style/index.css", "@-webkit-keyframes dui-loading-fade-in{0%{opacity:0}to{opacity:1}}@keyframes dui-loading-fade-in{0%{opacity:0}to{opacity:1}}@-webkit-keyframes dui-loading-rotate{0%{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes dui-loading-rotate{0%{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@-webkit-keyframes dui-loading-pop-up{0%{opacity:0;-webkit-transform:scale3d(.9,.9,1);transform:scale3d(.9,.9,1)}to{opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1)}}@keyframes dui-loading-pop-up{0%{opacity:0;-webkit-transform:scale3d(.9,.9,1);transform:scale3d(.9,.9,1)}to{opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1)}}[data-dui-1-28-2~=\"dui-loading-wrap\"] [data-dui-1-28-2~=\"dui-loading-tip\"]{color:rgba(0,0,0,.8)}[data-dui-1-28-2~=\"dui-loading-fixed\"]{background:rgba(0,0,0,.8);-webkit-animation:dui-loading-pop-up .2s ease-out;animation:dui-loading-pop-up .2s ease-out;-webkit-transition:all .2s ease-out;transition:all .2s ease-out}[data-dui-1-28-2~=\"dui-loading-fixed\"],[data-dui-1-28-2~=\"dui-loading-wrap\"]{-webkit-box-sizing:border-box;box-sizing:border-box;min-width:130px;min-height:130px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-flow:column nowrap;-ms-flex-flow:column nowrap;flex-flow:column nowrap;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;padding:26px 21px 22px;border-radius:4px}[data-dui-1-28-2~=\"dui-loading-hidden\"]{opacity:0;-webkit-transform:scale3d(.9,.9,1);transform:scale3d(.9,.9,1);visibility:hidden}[data-dui-1-28-2~=\"dui-loading-container\"]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}[data-dui-1-28-2~=\"dui-loading-container-fixed\"]{position:fixed;z-index:9999;top:0;left:0;right:0;bottom:0}[data-dui-1-28-2~=\"dui-loading-container-wrap\"]{position:relative}[data-dui-1-28-2~=\"dui-loading-mask\"]{position:absolute;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;left:0;top:0;width:100%;height:100%;background-color:var(--dui-mask-color,hsla(0,0%,100%,.65));-webkit-transition:all .2s ease-out;transition:all .2s ease-out}[data-dui-1-28-2~=\"dui-loading-mask-fixed\"]{z-index:-1;-webkit-animation:dui-loading-fade-in .2s ease-out;animation:dui-loading-fade-in .2s ease-out}[data-dui-1-28-2~=\"dui-loading-mask-hidden\"]{opacity:0;visibility:hidden}[data-dui-1-28-2~=\"dui-loading-tip\"]{color:#fff;font-size:14px;margin-top:18px;line-height:16px}");
	Loading.show = show_default$1;
	Loading_default = Loading;
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/components/Form/context.js
var import_react$61, FormItemContext;
var init_context$3 = __esmMin((() => {
	import_react$61 = /* @__PURE__ */ __toESM(require_react());
	FormItemContext = import_react$61.createContext({ status: "default" });
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/components/Input/Input.js
var import_react$60, Input;
var init_Input$2 = __esmMin((() => {
	init_createElement();
	init_tslib_es6();
	import_react$60 = /* @__PURE__ */ __toESM(require_react());
	init_helper();
	init_theme();
	init_context$3();
	Input = function(_super) {
		__extends(Input, _super);
		function Input() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.leftIconRef = import_react$60.createRef();
			_this.rightIconsRef = import_react$60.createRef();
			_this.state = { value: _this.props.defaultValue };
			_this.handleChange = function(e) {
				if (_this.props.disabled) return;
				var value = e.target.value;
				_this.props.onChange(value, e);
				_this.setState({ value });
			};
			_this.preventLoseFocus = function(e) {
				e.preventDefault();
			};
			_this.handleClear = function(e) {
				var _a, _b;
				(_b = (_a = _this.props).onClickClear) === null || _b === void 0 || _b.call(_a, e);
				_this.setState({ value: "" }, function() {
					_this.props.onChange("");
				});
			};
			_this.handleIconKeyDown = function(handler) {
				return function(e) {
					if (_this.props.disabled || !handler) return;
					if ([" ", "Enter"].includes(e.key)) {
						e.preventDefault();
						handler();
					}
				};
			};
			_this.themedRender = function(classNames) {
				var _a, _b, _c = _this.props, prefixCls = _c.prefixCls, className = _c.className, style = _c.style, disabled = _c.disabled, underline = _c.underline;
				_c.icon;
				var leftIcon = _c.leftIcon;
				_c.onClickIcon;
				var onClickLeftIcon = _c.onClickLeftIcon;
				_c.onChange;
				var inputStyle = _c.inputStyle;
				_c.showClear;
				var forcedValue = _c.value;
				_c.defaultValue;
				var inputRef = _c.inputRef, inputClassName = _c.inputClassName, testId = _c.testId, errorTip = _c.errorTip;
				_c.iconClassName;
				_c.iconStyle;
				var rest = __rest(_c, [
					"prefixCls",
					"className",
					"style",
					"disabled",
					"underline",
					"icon",
					"leftIcon",
					"onClickIcon",
					"onClickLeftIcon",
					"onChange",
					"inputStyle",
					"showClear",
					"value",
					"defaultValue",
					"inputRef",
					"inputClassName",
					"testId",
					"errorTip",
					"iconClassName",
					"iconStyle"
				]);
				var stateValue = _this.state.value;
				var status = _this.status;
				var value = typeof forcedValue === "string" ? forcedValue : stateValue;
				var cls = classNames(prefixCls, className, (_a = {}, _a[prefixCls + "-disabled"] = disabled, _a));
				var inputCls = classNames(prefixCls + "-input", inputClassName, prefixCls + "-input-" + status, (_b = {}, _b[prefixCls + "-input-underline"] = underline, _b));
				var errorTipCls = classNames(prefixCls + "-error-text");
				var clearVisible = !!(value && !disabled);
				return h$5("div", {
					className: cls,
					style,
					"data-testid": testId
				}, _this.renderSingleIcon({
					prop: leftIcon,
					description: "left",
					handler: onClickLeftIcon,
					ref: _this.leftIconRef
				}, classNames), h$5("input", __assign({
					className: inputCls,
					style: __assign(__assign({}, _this.getIconPaddings()), inputStyle),
					onChange: _this.handleChange,
					value,
					disabled,
					ref: inputRef
				}, rest)), _this.renderRightIcons(clearVisible, classNames), errorTip && h$5("div", { className: errorTipCls }, errorTip));
			};
			return _this;
		}
		Input.prototype.componentDidMount = function() {
			this.forceUpdate();
		};
		Object.defineProperty(Input.prototype, "status", {
			get: function() {
				if (this.props.errorTip) return "error";
				return this.context.status;
			},
			enumerable: false,
			configurable: true
		});
		Input.prototype.getIconPaddings = function() {
			var leftIconDom = this.leftIconRef.current;
			var rightIconsDom = this.rightIconsRef.current;
			var result = {};
			var gap = 2;
			if (leftIconDom) result.paddingLeft = leftIconDom.getBoundingClientRect().width + gap + "px";
			if (rightIconsDom) result.paddingRight = rightIconsDom.getBoundingClientRect().width + gap + "px";
			return result;
		};
		Input.prototype.renderSingleIcon = function(_a, classNames) {
			var _b;
			var prop = _a.prop, description = _a.description, handler = _a.handler, ref = _a.ref, style = _a.style, className = _a.className;
			var _c = this.props, prefixCls = _c.prefixCls, underline = _c.underline;
			var cls = classNames(prefixCls + "-icon", className, (_b = {}, _b[prefixCls + "-icon-" + description] = description, _b[prefixCls + "-icon-clickable"] = handler, _b[prefixCls + "-icon-underline"] = underline, _b));
			return prop ? h$5("div", {
				className: cls,
				onMouseDown: this.preventLoseFocus,
				onClick: handler,
				ref,
				tabIndex: handler ? 0 : -1,
				onKeyDown: handler ? this.handleIconKeyDown(handler) : void 0,
				role: "button",
				style
			}, typeof prop === "string" ? h$5("span", {
				className: classNames(prefixCls + "-icon-img"),
				style: { backgroundImage: "url(\"" + prop + "\")" }
			}) : prop) : null;
		};
		Input.prototype.renderRightIcons = function(clearVisible, classNames) {
			var _a, _b;
			var _c = this.props, prefixCls = _c.prefixCls, showClear = _c.showClear, icon = _c.icon, iconClassName = _c.iconClassName, iconStyle = _c.iconStyle, onClickIcon = _c.onClickIcon, underline = _c.underline;
			var clearCls = classNames(prefixCls + "-clear", (_a = {}, _a[prefixCls + "-clear-visible"] = clearVisible, _a[prefixCls + "-icon"] = !underline, _a[prefixCls + "-clear-underline"] = underline, _a));
			var containerCls = classNames(prefixCls + "-icon-container", (_b = {}, _b[prefixCls + "-icon-container-underline"] = underline, _b));
			return showClear || icon ? h$5("div", {
				className: containerCls,
				ref: this.rightIconsRef
			}, showClear ? h$5("button", {
				className: clearCls,
				onMouseDown: this.preventLoseFocus,
				onClick: this.handleClear
			}) : null, this.renderSingleIcon({
				prop: icon,
				handler: onClickIcon,
				className: iconClassName,
				style: iconStyle
			}, classNames)) : null;
		};
		Input.prototype.render = function() {
			return consumeTheme(this.themedRender);
		};
		Input.contextType = FormItemContext;
		return Input;
	}(import_react$60.Component);
	Input.defaultProps = {
		prefixCls: "dui-input",
		onChange: emptyFn,
		showClear: false,
		defaultValue: ""
	};
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/components/Input/interface.js
var StepType, NumberCorrectionType;
var init_interface = __esmMin((() => {
	(function(StepType) {
		StepType[StepType["UP"] = 0] = "UP";
		StepType[StepType["DOWN"] = 1] = "DOWN";
	})(StepType || (StepType = {}));
	(function(NumberCorrectionType) {
		NumberCorrectionType[NumberCorrectionType["ExceedMax"] = 0] = "ExceedMax";
		NumberCorrectionType[NumberCorrectionType["ExceedMin"] = 1] = "ExceedMin";
		NumberCorrectionType[NumberCorrectionType["Other"] = 2] = "Other";
	})(NumberCorrectionType || (NumberCorrectionType = {}));
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/components/Input/number-util.js
function transDecimalNum(value, decimalPlaces) {
	if (decimalPlaces === void 0) return "" + value;
	if (decimalPlaces === 0) return Math.floor(value).toFixed(decimalPlaces);
	return value.toFixed(decimalPlaces);
}
function transStrToDecimalNum(prop, value) {
	var _a;
	var numberVal = Number(value);
	if (isNaN(numberVal)) {
		(_a = prop.onCorrection) === null || _a === void 0 || _a.call(prop, 0, numberVal, NumberCorrectionType.Other);
		return 0;
	}
	return Number(transDecimalNum(numberVal, prop.decimalPlaces));
}
function calcValue(props, newValue) {
	var _a, _b;
	var numberValue = transStrToDecimalNum(props, newValue);
	var adjustedValue = numberValue;
	if (numberValue < (props.min || 0)) {
		adjustedValue = Math.max(props.min || 0, numberValue);
		(_a = props.onCorrection) === null || _a === void 0 || _a.call(props, adjustedValue, numberValue, NumberCorrectionType.ExceedMin);
	}
	if (props.max === void 0) return adjustedValue;
	if (adjustedValue > props.max) {
		adjustedValue = Math.min(props.max, adjustedValue);
		(_b = props.onCorrection) === null || _b === void 0 || _b.call(props, adjustedValue, numberValue, NumberCorrectionType.ExceedMax);
	}
	return adjustedValue;
}
var init_number_util = __esmMin((() => {
	init_interface();
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/components/Input/Number.js
var import_react$59, NumberInput;
var init_Number = __esmMin((() => {
	init_createElement();
	init_tslib_es6();
	import_react$59 = /* @__PURE__ */ __toESM(require_react());
	init_helper();
	init_theme();
	init_Button();
	init_Input$2();
	init_interface();
	init_number_util();
	NumberInput = function(_super) {
		__extends(NumberInput, _super);
		function NumberInput(a, b) {
			var _a;
			var _this = _super.call(this, a, b) || this;
			_this.inputRef = import_react$59.createRef();
			_this.refDom = function(dom) {
				_this.inputRef.current = dom;
				var propRef = _this.props.inputRef;
				if (!propRef) return;
				if (typeof propRef === "function") propRef(dom);
				else propRef.current = dom;
			};
			_this.handleIncrease = function(e) {
				_this.updateValue(_this.calcSetpRounding(transStrToDecimalNum(_this.props, _this.state.inputValue) + _this.state.step).toString(), true, function(value) {
					var _a, _b, _c, _d;
					(_b = (_a = _this.props).onStep) === null || _b === void 0 || _b.call(_a, value, StepType.UP, e);
					(_d = (_c = _this.props).onChange) === null || _d === void 0 || _d.call(_c, value);
				});
			};
			_this.handleDecrease = function(e) {
				_this.updateValue(_this.calcSetpRounding(transStrToDecimalNum(_this.props, _this.state.inputValue) - _this.state.step).toString(), true, function(value) {
					var _a, _b, _c, _d;
					(_b = (_a = _this.props).onStep) === null || _b === void 0 || _b.call(_a, value, StepType.DOWN, e);
					(_d = (_c = _this.props).onChange) === null || _d === void 0 || _d.call(_c, value);
				});
			};
			_this.handleInputChange = function(value, e) {
				_this.setState({
					inputValue: value,
					ignorePropChange: true
				});
			};
			_this.handleInputBlur = function(e) {
				if (!_this.isMiddleState(e.target.value)) {
					_this.updateValue(_this.state.inputValue, false, function() {
						var _a, _b;
						(_b = (_a = _this.props).onBlur) === null || _b === void 0 || _b.call(_a, e);
					});
					return;
				}
				_this.updateValue(_this.state.prevValue, false, function() {
					var _a, _b;
					(_b = (_a = _this.props).onBlur) === null || _b === void 0 || _b.call(_a, e);
				});
			};
			_this.handleKeyDown = function(event) {
				if (event.key === "Enter") _this.updateValue(_this.state.inputValue, false, function(value) {
					var _a, _b;
					(_b = (_a = _this.props).onEnter) === null || _b === void 0 || _b.call(_a, value);
				});
			};
			_this.handleInputFocus = function(e) {
				var _a, _b;
				var len = e.target.value.length;
				setTimeout((function(a) {
					return function() {
						a.setSelectionRange(len, len);
					};
				})(e.target), 0);
				(_b = (_a = _this.props).onFocus) === null || _b === void 0 || _b.call(_a, e);
			};
			_this.updateValue = function(newValue, ignoreOnchange, callback) {
				if (ignoreOnchange === void 0) ignoreOnchange = false;
				if (_this.props.disabled) return;
				if (_this.isMiddleState(newValue)) {
					_this.setState({
						inputValue: newValue,
						ignorePropChange: false
					});
					return;
				}
				var adjustedValueStr = transDecimalNum(calcValue(_this.props, newValue), _this.props.decimalPlaces);
				_this.setState({
					inputValue: adjustedValueStr,
					prevValue: adjustedValueStr,
					ignorePropChange: false
				}, function() {
					var _a, _b;
					if (!ignoreOnchange) (_b = (_a = _this.props).onChange) === null || _b === void 0 || _b.call(_a, transStrToDecimalNum(_this.props, adjustedValueStr));
					callback === null || callback === void 0 || callback(transStrToDecimalNum(_this.props, adjustedValueStr));
				});
			};
			_this.themedRender = function(classNames) {
				var _a, _b = _this.props, prefixCls = _b.prefixCls;
				_b.onEnter;
				_b.onStep;
				_b.onCorrection;
				_b.decimalPlaces;
				_b.defaultValue;
				var unit = _b.unit, inputStyle = _b.inputStyle, buttonStyle = _b.buttonStyle, buttonWrapStyle = _b.buttonWrapStyle, buttonClassName = _b.buttonClassName, buttonWrapClassName = _b.buttonWrapClassName, unitClassName = _b.unitClassName, unitStyle = _b.unitStyle, rest = __rest(_b, [
					"prefixCls",
					"onEnter",
					"onStep",
					"onCorrection",
					"decimalPlaces",
					"defaultValue",
					"unit",
					"inputStyle",
					"buttonStyle",
					"buttonWrapStyle",
					"buttonClassName",
					"buttonWrapClassName",
					"unitClassName",
					"unitStyle"
				]);
				return h$5("div", { className: "" + prefixCls }, h$5("div", { className: prefixCls + "-input-wrap" }, h$5(Input, __assign({}, rest, {
					type: "text",
					inputRef: _this.refDom,
					value: "" + _this.state.inputValue,
					onChange: _this.handleInputChange,
					onKeyDown: _this.handleKeyDown,
					onBlur: _this.handleInputBlur,
					onFocus: _this.handleInputFocus,
					inputStyle: __assign({
						border: "none",
						textAlign: "right",
						paddingRight: "2px"
					}, inputStyle)
				})), unit && h$5("div", {
					style: __assign({}, unitStyle),
					className: classNames(prefixCls + "-input-unit", unitClassName, (_a = {}, _a[prefixCls + "-input-unit-disabled"] = _this.props.disabled, _a))
				}, unit)), h$5("div", {
					style: __assign({}, buttonWrapStyle),
					className: classNames(prefixCls + "-button-wrap", buttonWrapClassName)
				}, h$5(Button_default, {
					type: "plain",
					onClick: _this.handleIncrease,
					disabled: _this.props.disabled,
					className: classNames(prefixCls + "-button", buttonClassName),
					style: __assign({}, buttonStyle)
				}, h$5("div", { className: classNames(prefixCls + "-button-arrow " + prefixCls + "-button-arrow-up") })), h$5(Button_default, {
					type: "plain",
					onClick: _this.handleDecrease,
					disabled: _this.props.disabled,
					className: classNames(prefixCls + "-button", buttonClassName),
					style: __assign({}, buttonStyle)
				}, h$5("div", { className: classNames(prefixCls + "-button-arrow " + prefixCls + "-button-arrow-down") }))));
			};
			var value = _this.props.defaultValue ? transDecimalNum(_this.props.defaultValue, _this.props.decimalPlaces) : transDecimalNum((_a = _this.props.value) !== null && _a !== void 0 ? _a : 0);
			_this.state = {
				ignorePropChange: false,
				step: _this.props.step || .1,
				inputValue: value,
				prevValue: value
			};
			return _this;
		}
		NumberInput.getDerivedStateFromProps = function(props, state) {
			var value = props.value;
			if (state.ignorePropChange) return null;
			if (typeof value === "number") return { inputValue: transDecimalNum(calcValue(props, transDecimalNum(value)), props.decimalPlaces) };
			return null;
		};
		NumberInput.calcValue = function(props, newValue) {
			var _a, _b;
			var numberValue = transStrToDecimalNum(props, newValue);
			var adjustedValue = numberValue;
			if (numberValue < (props.min || 0)) {
				adjustedValue = Math.max(props.min || 0, numberValue);
				(_a = props.onCorrection) === null || _a === void 0 || _a.call(props, adjustedValue, numberValue, NumberCorrectionType.ExceedMin);
			}
			if (props.max === void 0) return adjustedValue;
			if (adjustedValue > props.max) {
				adjustedValue = Math.min(props.max, adjustedValue);
				(_b = props.onCorrection) === null || _b === void 0 || _b.call(props, adjustedValue, numberValue, NumberCorrectionType.ExceedMax);
			}
			return adjustedValue;
		};
		NumberInput.prototype.isMiddleState = function(value) {
			var _a;
			return value === "-" || !value || ((_a = value.endsWith) === null || _a === void 0 ? void 0 : _a.call(value, ".")) || isNaN(Number(value));
		};
		NumberInput.prototype.calcSetpRounding = function(num) {
			if (this.props.stepRounding && this.props.step && this.props.decimalPlaces && this.props.decimalPlaces > 0) {
				var factor = Math.pow(10, this.props.decimalPlaces);
				var stepFactor = 1 / this.props.step;
				var roundedStep = Math.round(num * stepFactor) / stepFactor;
				return Math.round((roundedStep + Number.EPSILON) * factor) / factor;
			}
			return num;
		};
		NumberInput.prototype.render = function() {
			return consumeTheme(this.themedRender);
		};
		return NumberInput;
	}(import_react$59.Component);
	NumberInput.defaultProps = {
		prefixCls: "dui-input-number",
		onChange: emptyFn,
		onEnter: emptyFn,
		onStep: emptyFn,
		onError: emptyFn,
		onBlur: emptyFn,
		defaultValue: 0
	};
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/components/Input/Password.js
var import_react$58, openEyeUrl, closedEyeUrl, Password;
var init_Password = __esmMin((() => {
	init_createElement();
	init_tslib_es6();
	import_react$58 = /* @__PURE__ */ __toESM(require_react());
	init_Input$2();
	init_theme();
	openEyeUrl = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgZmlsbC1ydWxlPSJldmVub2RkIiBvcGFjaXR5PSIuNjM3Ij48cGF0aCBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS4yNSIgZD0iTTE1Ljk0NiA5LjIyOEE3LjcyIDcuNzIgMCAwIDAgMi4zNTEgOS4xM2E3LjcxNyA3LjcxNyAwIDAgMCAxMy41OTUuMDk4eiIvPjxwYXRoIHN0cm9rZT0iI2ZmZiIgZD0iTTkuMTUgMTIuMjAyYTMgMyAwIDEgMCAwLTYgMyAzIDAgMCAwIDAgNnoiLz48L3N2Zz4=";
	closedEyeUrl = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCI+PHBhdGggZD0iTTEuODU2IDEwLjc5NGwyLjIxMy0zLjMzTTYuNDE3IDEzbC45MTItMy43NDNtOC44NjcgMS41ODVsLTIuMDYtMy40MjdtLTIuNTcyIDUuNTkzbC0uOTM0LTMuNzZNMS44NTYgNmMyLjAzIDIuMzkzIDQuMzc0IDMuNjQ0IDcuMDMgMy43NTRzNS4wOS0xLjE0MiA3LjMxLTMuNzU0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS4yNSIgb3BhY2l0eT0iLjY0MiIvPjwvc3ZnPg==";
	Password = function(_super) {
		__extends(Password, _super);
		function Password() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.inputRef = import_react$58.createRef();
			_this.state = { passwordVisible: false };
			_this.refDom = function(dom) {
				_this.inputRef.current = dom;
				var propRef = _this.props.inputRef;
				if (!propRef) return;
				if (typeof propRef === "function") propRef(dom);
				else propRef.current = dom;
			};
			_this.togglePasswordVisibility = function() {
				var dom = _this.inputRef.current;
				var selectionStart = dom.selectionStart, selectionEnd = dom.selectionEnd;
				_this.setState(function(prevState) {
					return { passwordVisible: !prevState.passwordVisible };
				}, function() {
					setTimeout(function() {
						dom.setSelectionRange(selectionStart, selectionEnd);
					}, 0);
				});
			};
			_this.themedRender = function(classNames) {
				var _a = _this.props, showToggle = _a.showToggle, prefixCls = _a.prefixCls, rest = __rest(_a, ["showToggle", "prefixCls"]);
				var passwordVisible = _this.state.passwordVisible;
				return h$5(Input, __assign({
					icon: showToggle ? passwordVisible ? openEyeUrl : closedEyeUrl : void 0,
					iconClassName: prefixCls + "-toggle",
					inputStyle: { letterSpacing: passwordVisible ? "2px" : "4px" },
					onClickIcon: _this.togglePasswordVisibility,
					type: passwordVisible ? "text" : "password",
					inputRef: _this.refDom
				}, rest));
			};
			return _this;
		}
		Password.prototype.render = function() {
			return consumeTheme(this.themedRender);
		};
		return Password;
	}(import_react$58.Component);
	Password.defaultProps = {
		prefixCls: "dui-input-password",
		showToggle: true
	};
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/components/Input/index.js
var Input_default;
var init_Input$1 = __esmMin((() => {
	init_style();
	init_Input$2();
	init_Number();
	init_Password();
	injectStyle("components/Input/style/index.css", "[data-dui-1-28-2~=\"dui-input\"]{-webkit-tap-highlight-color:transparent;position:relative}[data-dui-1-28-2~=\"dui-input-disabled\"]{pointer-events:none}[data-dui-1-28-2~=\"dui-input-input\"]{display:block;outline:none;font-size:14px;height:36px;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box;padding:7px 11px;border:1px solid var(--border-medium,rgba(0,0,0,.08));border-radius:4px;-webkit-appearance:none;-moz-appearance:none;appearance:none;margin:0;color:var(--text-ultrastrong,rgba(0,0,0,.9));background:transparent}[data-dui-1-28-2~=\"dui-input-input\"]:not([data-dui-1-28-2~=\"dui-input-input-underline\"]):disabled{color:var(--text-weak,rgba(0,0,0,.26));border-color:var(--border-weak,rgba(0,0,0,.04))}[data-dui-1-28-2~=\"dui-input-input\"]::-webkit-input-placeholder{color:var(--text-weak,rgba(0,0,0,.26));letter-spacing:normal}[data-dui-1-28-2~=\"dui-input-input\"]::-moz-placeholder{color:var(--text-weak,rgba(0,0,0,.26));letter-spacing:normal}[data-dui-1-28-2~=\"dui-input-input\"]:-ms-input-placeholder{color:var(--text-weak,rgba(0,0,0,.26));letter-spacing:normal}[data-dui-1-28-2~=\"dui-input-input\"]::-ms-input-placeholder{color:var(--text-weak,rgba(0,0,0,.26));letter-spacing:normal}[data-dui-1-28-2~=\"dui-input-input\"]::placeholder{color:var(--text-weak,rgba(0,0,0,.26));letter-spacing:normal}[data-dui-1-28-2~=\"dui-input-input\"]:hover{border-color:var(--border-strong,rgba(0,0,0,.12))}[data-dui-1-28-2~=\"dui-input-input\"]:focus{border-color:var(--accent-default,#1e6fff)}[data-dui-1-28-2~=\"dui-input-input-underline\"]{padding:6px 0;border-color:transparent;border-bottom-color:var(--border-medium,rgba(0,0,0,.08));border-radius:0}[data-dui-1-28-2~=\"dui-input-input-underline\"]:hover{border-color:transparent;border-bottom-color:var(--border-strong,rgba(0,0,0,.12))}[data-dui-1-28-2~=\"dui-input-input-underline\"]:focus{border-color:transparent;border-bottom-color:var(--accent-default,#1e6fff)}[data-dui-1-28-2~=\"dui-input-input-underline\"]:disabled{color:var(--text-weak,rgba(0,0,0,.26));border-bottom-color:var(--border-weak,rgba(0,0,0,.04))}[data-dui-1-28-2~=\"dui-input-input-error\"],[data-dui-1-28-2~=\"dui-input-input-error\"]:focus,[data-dui-1-28-2~=\"dui-input-input-error\"]:hover{border-color:var(--critical-default,#ff4747)}[data-dui-1-28-2~=\"dui-input-input-error\"][data-dui-1-28-2~=\"dui-input-input-underline\"]{border-color:transparent;border-bottom-color:var(--critical-default,#ff4747)}[data-dui-1-28-2~=\"dui-input-clear\"],[data-dui-1-28-2~=\"dui-input-icon\"]{border:none;margin:0;padding:0;background:transparent;-webkit-tap-highlight-color:transparent}[data-dui-1-28-2~=\"dui-input-clear\"]{display:inline-block;width:16px;height:16px;background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Ccircle cx='8' cy='8' r='8' fill='%233d5266' fill-opacity='.16'/%3E%3Cpath fill-rule='evenodd' d='M10.833 10.832a.584.584 0 00.004-.814L8.822 8.002l2.015-2.02a.584.584 0 00-.004-.814.58.58 0 00-.814-.004L7.999 7.18l-2.02-2.02c-.209-.209-.592-.218-.814.004s-.218.605-.004.818l2.02 2.02-2.02 2.02a.59.59 0 00.004.814.593.593 0 00.814.004l2.02-2.02 2.02 2.015a.58.58 0 00.814-.004z' fill='%23fff'/%3E%3C/svg%3E\");background-position:50%;background-repeat:no-repeat;visibility:hidden;cursor:pointer;-webkit-filter:var(--dui-invert-filter,none);filter:var(--dui-invert-filter,none)}[data-dui-1-28-2~=\"dui-input-clear-visible\"]{visibility:visible}[data-dui-1-28-2~=\"dui-input-clear\"]:hover{opacity:.5}[data-dui-1-28-2~=\"dui-input\"]:not(:focus-within) [data-dui-1-28-2~=\"dui-input-clear\"]{visibility:hidden}[data-dui-1-28-2~=\"dui-input-icon-container\"],[data-dui-1-28-2~=\"dui-input-icon-left\"]{position:absolute;height:100%;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}[data-dui-1-28-2~=\"dui-input-icon\"],[data-dui-1-28-2~=\"dui-input-icon-container\"]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-flow:row nowrap;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}[data-dui-1-28-2~=\"dui-input-password-toggle\"]{-webkit-filter:var(--dui-invert-filter,none);filter:var(--dui-invert-filter,none)}[data-dui-1-28-2~=\"dui-input-icon\"]{width:39px;height:100%;border-radius:3px}[data-dui-1-28-2~=\"dui-input-icon-container\"]{right:0}[data-dui-1-28-2~=\"dui-input-icon-container-underline\"]>:not(:last-child){margin-right:7px}[data-dui-1-28-2~=\"dui-input-icon-underline\"]{width:auto;height:auto}[data-dui-1-28-2~=\"dui-input-icon-clickable\"]{cursor:pointer}[data-dui-1-28-2~=\"dui-input-icon-clickable\"]:not([data-dui-1-28-2~=\"dui-input-icon-underline\"]):not([data-dui-1-28-2~=\"dui-input-clear-underline\"]):hover{background-color:var(--feedback-hover,rgba(51,77,102,.06))}[data-dui-1-28-2~=\"dui-input-icon-clickable\"]:not([data-dui-1-28-2~=\"dui-input-icon-underline\"]):not([data-dui-1-28-2~=\"dui-input-clear-underline\"]):active{background-color:var(--feedback-active,rgba(51,77,102,.08))}[data-dui-1-28-2~=\"dui-input-icon-img\"]{display:inline-block;width:16px;height:16px;background-size:cover;background-position:50%;background-repeat:no-repeat}[data-dui-1-28-2~=\"dui-input-icon-left\"]{left:0}[data-dui-1-28-2~=\"dui-input-icon-right\"]{height:100%;right:0}[data-dui-1-28-2~=\"dui-input-error-text\"]{color:var(--text-error,#eb3639);font-size:12px;line-height:16px;position:absolute;top:100%;left:0;margin-top:4px}[data-dui-1-28-2~=\"dui-input-number\"]{position:relative}[data-dui-1-28-2~=\"dui-input-number\"] [data-dui-1-28-2~=\"dui-input\"]{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}[data-dui-1-28-2~=\"dui-input-number-input-wrap\"]{-webkit-box-pack:end;-webkit-justify-content:flex-end;-ms-flex-pack:end;justify-content:flex-end;padding-right:24px;border:1px solid var(--border-medium,rgba(0,0,0,.08));border-radius:4px;font-size:14px;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box;color:var(--text-ultrastrong,rgba(0,0,0,.9))}[data-dui-1-28-2~=\"dui-input-number-input-unit\"],[data-dui-1-28-2~=\"dui-input-number-input-wrap\"]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}[data-dui-1-28-2~=\"dui-input-number-input-unit\"]{-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}[data-dui-1-28-2~=\"dui-input-number-input-unit-disabled\"]{color:var(--text-weak,rgba(0,0,0,.26))}[data-dui-1-28-2~=\"dui-input-number\"] [data-dui-1-28-2~=\"dui-input-number-button\"]{width:0;height:18px;padding:0 10px;border-top-left-radius:0;border-bottom-left-radius:0}[data-dui-1-28-2~=\"dui-input-number\"] [data-dui-1-28-2~=\"dui-input-number-button\"]:nth-child(odd){border-bottom-right-radius:0}[data-dui-1-28-2~=\"dui-input-number\"] [data-dui-1-28-2~=\"dui-input-number-button\"]:nth-child(2n){border-top-right-radius:0}[data-dui-1-28-2~=\"dui-input-number\"] [data-dui-1-28-2~=\"dui-input-number-button-wrap\"]{position:absolute;top:1px;right:1px;height:calc(100% - 2px);display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between}[data-dui-1-28-2~=\"dui-input-number\"] [data-dui-1-28-2~=\"dui-input-number-button-wrap\"]:after,[data-dui-1-28-2~=\"dui-input-number\"] [data-dui-1-28-2~=\"dui-input-number-button-wrap\"]:before{content:\"\";position:absolute}[data-dui-1-28-2~=\"dui-input-number\"] [data-dui-1-28-2~=\"dui-input-number-button-wrap\"]:before{top:50%;width:22px;height:1px;border-top:1px solid var(--border-medium,rgba(0,0,0,.08))}[data-dui-1-28-2~=\"dui-input-number\"] [data-dui-1-28-2~=\"dui-input-number-button-wrap\"]:after{height:100%;width:1px;border-left:1px solid var(--border-medium,rgba(0,0,0,.08))}[data-dui-1-28-2~=\"dui-input-number-button-arrow\"]{width:0;height:12px;padding:0 10px;background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Cpath opacity='.4' d='M5 6h6l-2.988 4z'/%3E%3C/svg%3E\");-webkit-filter:var(--dui-invert-filter,none);filter:var(--dui-invert-filter,none);background-position:50%}[data-dui-1-28-2~=\"dui-input-number-button-arrow-up\"]{-webkit-transform:rotate(180deg);transform:rotate(180deg)}");
	Input.Password = Password;
	Input.Number = NumberInput;
	Input_default = Input;
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/components/Checkbox/util.js
function renderChildren(props, checkedValues, handleSingleChange, Component, itemStyle) {
	var children = props.children;
	var options = props.options || [];
	var disabled = props.disabled;
	var style = __assign({ paddingBottom: 18 }, itemStyle);
	if (options.length) return options.map(function(option, index) {
		if (typeof option === "string") return h$5(Component, {
			key: index,
			value: option,
			onChange: handleSingleChange,
			checked: checkedValues.indexOf(option) !== -1,
			disabled,
			style: __assign({}, style)
		}, option);
		else return h$5(Component, __assign({}, option, {
			key: index,
			value: option.value,
			onChange: handleSingleChange,
			checked: checkedValues.indexOf(option.value) !== -1,
			disabled: option.disabled || disabled,
			style: __assign(__assign({}, style), option.style)
		}), option.label);
	});
	return import_react$57.Children.map(children, function(child) {
		return import_react$57.cloneElement(child, {
			checked: checkedValues.indexOf(child.props.value) !== -1,
			onChange: handleSingleChange,
			disabled: child.props.disabled || disabled,
			style: __assign(__assign({}, style), child.props.style)
		});
	});
}
var import_react$57;
var init_util$1 = __esmMin((() => {
	init_createElement();
	init_tslib_es6();
	import_react$57 = /* @__PURE__ */ __toESM(require_react());
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/components/Dropdown/context.js
var import_react$56, DropdownContext, getDropdownContext;
var init_context$2 = __esmMin((() => {
	import_react$56 = /* @__PURE__ */ __toESM(require_react());
	init_helper();
	DropdownContext = import_react$56.createContext({
		visible: true,
		zIndex: 9999
	});
	getDropdownContext = createContextValueGetter();
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/utils/microTask.js
function triggerMicroTask(callback) {
	if (elem) {
		internalCallback = callback;
		elem.setAttribute("data-dui-micro-task", String(counter++));
	} else Promise.resolve().then(callback);
}
var internalCallback, elem, counter, observer;
var init_microTask = __esmMin((() => {
	internalCallback = null;
	elem = null;
	counter = 1;
	if (typeof document !== "undefined") {
		observer = new MutationObserver(function() {
			internalCallback === null || internalCallback === void 0 || internalCallback();
			internalCallback = null;
		});
		elem = document.createElement("div");
		observer.observe(elem, { attributes: true });
	}
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/components/Dropdown/Dropdown.js
var import_react$55, import_react_dom$9, import_throttle, DEFAULT_METRICS$2, DROPDOWN_TRANSITION_OUT_DURATION, DROPDOWN_TRANSITION_IN_DURATION, outerAlignments, shouldFixAnimationFlickering, HOVER_DELAY, MIN_HEIGHT, Dropdown;
var init_Dropdown$1 = __esmMin((() => {
	init_createElement();
	init_tslib_es6();
	import_react$55 = /* @__PURE__ */ __toESM(require_react());
	import_react_dom$9 = /* @__PURE__ */ __toESM(require_react_dom());
	init_helper();
	init_Trigger();
	init_context$2();
	init_theme();
	init_microTask();
	init_keepDom();
	init_documentDom();
	init_focus();
	import_throttle = /* @__PURE__ */ __toESM(require_throttle());
	init_esm$5();
	init_checkPositionChange();
	DEFAULT_METRICS$2 = {
		left: "0",
		top: "0"
	};
	DROPDOWN_TRANSITION_OUT_DURATION = 120;
	DROPDOWN_TRANSITION_IN_DURATION = 240;
	outerAlignments = [
		"auto-outer",
		"left-outer",
		"right-outer"
	];
	shouldFixAnimationFlickering = ua.isIOS || ua.isIPadEmulatedMac || ua.isIPad;
	HOVER_DELAY = 100;
	MIN_HEIGHT = 80;
	Dropdown = function(_super) {
		__extends(Dropdown, _super);
		function Dropdown() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.rootDomRef = import_react$55.createRef();
			_this.dropContentRef = import_react$55.createRef();
			_this.forceRenderDom = false;
			_this.cancelPositionChangeChecker = null;
			_this.resizeObserver = null;
			_this.isInAnimation = false;
			_this.dropContentObserver = new MutationObserver(function(mutationList) {
				if (mutationList.some(function(_a) {
					var addedNodes = _a.addedNodes, removedNodes = _a.removedNodes;
					return addedNodes.length || removedNodes.length;
				})) _this.refreshDropContentMetric();
			});
			_this.state = {
				visible: false,
				dropContentMetrics: __assign({}, DEFAULT_METRICS$2),
				actualPlacement: "bottom",
				actualAlignment: _this.isOuterAlignment ? "left-outer" : "left"
			};
			_this.refreshDropContentMetric = (0, import_throttle.default)(function() {
				_this.removePreviousClampedSize(_this.updateDropContentMetric);
			}, 20);
			_this.updateDropContentMetric = function() {
				var rootDom = _this.rootDomRef.current;
				var dropContentDom = _this.dropContentRef.current;
				if (!rootDom || !dropContentDom) return;
				var rootDomRect = rootDom.getBoundingClientRect();
				var dropContentDomRect = dropContentDom.getBoundingClientRect();
				var _a = _this.calcHorizontalMetric(rootDomRect, dropContentDomRect), actualAlignment = _a.actualAlignment, horizontalMetric = _a.metric;
				var _b = _this.calcVerticalMetric(rootDomRect, dropContentDomRect), actualPlacement = _b.actualPlacement, verticalMetric = _b.metric;
				var dropContentMetrics = __assign(__assign({}, horizontalMetric), verticalMetric);
				_this.setState({
					dropContentMetrics,
					actualPlacement,
					actualAlignment
				});
			};
			_this.hide = function(e) {
				if (e && _this.consumeKeep(e)) return;
				if (!_this.isVisible()) return;
				if (!_this.isControlled) _this.restorePreviousFocus();
				_this.setStateVisible(false);
			};
			_this.show = function(preventStateVisibleUpdate) {
				_this.forceRenderDom = true;
				_this.removePreviousClampedSize(function() {
					requestAnimationFrame(function() {
						_this.forceRenderDom = false;
						_this.updateDropContentMetric();
						!preventStateVisibleUpdate && _this.setStateVisible(true);
					});
				});
			};
			_this.toggle = function() {
				if (_this.props.disabled) return;
				if (!_this.isVisible()) _this.show();
				else _this.hide();
			};
			_this.handleMouseEnter = function() {
				if (_this.props.disabled) return;
				clearTimeout(_this.hideTimeout);
				clearTimeout(_this.showTimeout);
				if (!_this.isVisible()) _this.showTimeout = setTimeout(_this.show, HOVER_DELAY);
			};
			_this.handleMouseLeave = function() {
				if (_this.props.disabled || _this.isInAnimation) return;
				clearTimeout(_this.showTimeout);
				_this.hideTimeout = setTimeout(function() {
					return !_this.isInAnimation && _this.hide();
				}, HOVER_DELAY);
			};
			_this.handleKeydown = function(e) {
				if (e.key === "Escape") _this.hide();
				else if (e.key === "Tab") _this.traverseFocus(e);
			};
			_this.themedRender = function(classNames) {
				var _a, _b, _c;
				var _d = _this.props, prefixCls = _d.prefixCls, className = _d.className, style = _d.style, children = _d.children, dropContent = _d.dropContent, disabled = _d.disabled, dropContentStyle = _d.dropContentStyle, dropContentClassName = _d.dropContentClassName, forcedZIndex = _d.zIndex, animated = _d.animated, trigger = _d.trigger, destroyOnClose = _d.destroyOnClose, containerDom = _d.containerDom, testId = _d.testId, dropContentTestId = _d.dropContentTestId, containerFollowVisible = _d.containerFollowVisible, containerClassName = _d.containerClassName, containerStyle = _d.containerStyle, shouldHide = _d.shouldHide;
				var _e = _this.state, dropContentMetrics = _e.dropContentMetrics, actualPlacement = _e.actualPlacement, actualAlignment = _e.actualAlignment;
				var visible = _this.isVisible();
				var contextZIndex = _this.context.zIndex;
				var zIndex = forcedZIndex || contextZIndex;
				var cls = classNames(prefixCls, className, prefixCls + "-" + (visible ? "visible" : "hidden"), (_a = {}, _a[prefixCls + "-disabled"] = disabled, _a));
				var contentCls = classNames(prefixCls + "-content", dropContentClassName, prefixCls + "-content-" + actualPlacement, prefixCls + "-content-" + actualAlignment, prefixCls + "-content-" + (visible ? "visible" : "hidden"), prefixCls + "-content-" + (_this.isOuterAlignment ? "outer" : "inner"), (_b = {}, _b[prefixCls + "-content-no-animation"] = !animated, _b));
				var containerCls = classNames(prefixCls + "-container", containerClassName, (_c = {}, _c[prefixCls + "-container-" + (visible ? "visible" : "hidden")] = containerFollowVisible, _c));
				var shouldDestroyDom = !_this.forceRenderDom && destroyOnClose && !decideKeepDom.call(_this, DROPDOWN_TRANSITION_OUT_DURATION, visible);
				return h$5(Trigger, {
					action: _this.hide,
					disabled: !visible,
					className: cls,
					style,
					domRef: _this.rootDomRef,
					testId,
					shouldTriggerAction: shouldHide
				}, h$5("div", {
					onMouseEnter: trigger === "hover" ? _this.handleMouseEnter : void 0,
					onMouseLeave: trigger === "hover" ? _this.handleMouseLeave : void 0
				}, h$5("div", {
					className: containerCls,
					style: containerStyle,
					onClick: trigger === "click" ? _this.toggle : void 0
				}, children), h$5(DropdownContext.Provider, { value: getDropdownContext({
					visible,
					zIndex: zIndex + 1
				}) }, h$5(DocumentDomContext.Consumer, null, function(doc) {
					return shouldDestroyDom ? null : import_react_dom$9.createPortal(h$5("div", {
						className: contentCls,
						style: __assign(__assign({ zIndex }, dropContentMetrics), dropContentStyle),
						onClick: _this.hide,
						ref: _this.dropContentRef,
						onKeyDown: _this.handleKeydown,
						tabIndex: -1,
						"data-testid": dropContentTestId
					}, dropContent), containerDom || (doc === null || doc === void 0 ? void 0 : doc.body) || document.body);
				}))));
			};
			return _this;
		}
		Dropdown.getDerivedStateFromProps = function(props, state) {
			if (props.disabled) return { visible: false };
			return null;
		};
		Object.defineProperty(Dropdown.prototype, "isOuterAlignment", {
			get: function() {
				return outerAlignments.includes(this.props.alignment);
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(Dropdown.prototype, "isControlled", {
			get: function() {
				return typeof this.props.visible === "boolean";
			},
			enumerable: false,
			configurable: true
		});
		Dropdown.prototype.componentDidMount = function() {
			this.forceUpdate();
			if (typeof ResizeObserver === "function") this.resizeObserver = new ResizeObserver(this.refreshDropContentMetric);
		};
		Dropdown.prototype.componentDidUpdate = function(prevProps, prevState, snapshot) {
			var _this = this;
			var propVisible = this.props.visible;
			var visible = this.isVisible();
			var prevVisible = this.prevVisible;
			this.prevVisible = visible;
			if (!prevVisible && visible) {
				if (propVisible) triggerMicroTask(function() {
					return _this.show(true);
				});
				this.focusSelf();
				this.handleEnteringAnimation();
				this.addListeners();
			}
			if (prevVisible && !visible) {
				this.isControlled && this.restorePreviousFocus();
				this.clearListeners();
			}
		};
		Dropdown.prototype.addListeners = function() {
			var _a, _b, _c;
			(_a = this.resizeObserver) === null || _a === void 0 || _a.observe(this.rootDomRef.current);
			(_b = this.resizeObserver) === null || _b === void 0 || _b.observe(this.dropContentRef.current);
			(_c = this.cancelPositionChangeChecker) === null || _c === void 0 || _c.call(this);
			if (!this.props.disableScrollHide) this.cancelPositionChangeChecker = checkPositionChange(this.rootDomRef.current, this.hide);
			this.dropContentObserver.observe(this.dropContentRef.current, {
				subtree: true,
				childList: true
			});
		};
		Dropdown.prototype.clearListeners = function() {
			var _a, _b;
			(_a = this.resizeObserver) === null || _a === void 0 || _a.disconnect();
			(_b = this.cancelPositionChangeChecker) === null || _b === void 0 || _b.call(this);
			this.dropContentObserver.disconnect();
		};
		Dropdown.prototype.componentWillUnmount = function() {
			this.clearListeners();
		};
		Dropdown.prototype.getSnapshotBeforeUpdate = function() {
			return this.dropContentRef.current;
		};
		Dropdown.prototype.handleEnteringAnimation = function() {
			this.fixAnimationFlickeringOnIOS();
			this.blockPointerEventsDuringAnimation();
		};
		Dropdown.prototype.blockPointerEventsDuringAnimation = function() {
			var _this = this;
			this.isInAnimation = true;
			var style = this.dropContentRef.current.style;
			var pointerEvents = style.pointerEvents;
			style.pointerEvents = "none";
			setTimeout(function() {
				style.pointerEvents = pointerEvents;
				_this.isInAnimation = false;
			}, DROPDOWN_TRANSITION_IN_DURATION);
		};
		Dropdown.prototype.fixAnimationFlickeringOnIOS = function() {
			if (!shouldFixAnimationFlickering) return;
			var style = this.dropContentRef.current.style;
			setTimeout(function() {
				var opacity = style.opacity, transform = style.transform, transition = style.transition;
				style.opacity = "0.99";
				style.transform = "translate(0)";
				style.transition = "none";
				setTimeout(function() {
					style.opacity = opacity;
					style.transform = transform;
					style.transition = transition;
				}, 0);
			}, DROPDOWN_TRANSITION_IN_DURATION);
		};
		Dropdown.prototype.isVisible = function() {
			var _a = this.props, forceVisible = _a.visible;
			if (_a.disabled) return false;
			var stateVisible = this.state.visible;
			return typeof forceVisible === "boolean" ? forceVisible : stateVisible;
		};
		Dropdown.prototype.traverseFocus = function(e) {
			var container = this.dropContentRef.current;
			if (!container) return;
			traverseFocusIn(container, e);
		};
		Dropdown.prototype.isFocusInside = function() {
			var _a;
			return (_a = this.dropContentRef.current) === null || _a === void 0 ? void 0 : _a.contains(document.activeElement);
		};
		Dropdown.prototype.focusSelf = function() {
			var _this = this;
			if (this.props.autoFocus && this.isVisible() && !this.isFocusInside()) {
				saveFocus();
				setTimeout(function() {
					var _a;
					!_this.isFocusInside() && ((_a = _this.dropContentRef.current) === null || _a === void 0 || _a.focus());
				}, DROPDOWN_TRANSITION_IN_DURATION);
			}
		};
		Dropdown.prototype.restorePreviousFocus = function() {
			var _a = this.props, autoFocus = _a.autoFocus, onRestoreFocus = _a.onRestoreFocus;
			if (!autoFocus) return;
			if ((onRestoreFocus === null || onRestoreFocus === void 0 ? void 0 : onRestoreFocus()) === false) return;
			restoreFocus();
		};
		Dropdown.prototype.removePreviousClampedSize = function(callback) {
			this.setState({ dropContentMetrics: __assign(__assign({}, this.state.dropContentMetrics), {
				height: void 0,
				width: void 0
			}) }, callback);
		};
		Dropdown.prototype.calcHorizontalMetric = function(rootDomRect, dropContentDomRect) {
			var _a = this.props, alignment = _a.alignment, matchWidth = _a.matchWidth, viewportMargin = _a.viewportMargin, viewportBox = _a.viewportBox;
			var rootWidth = rootDomRect.width, left = rootDomRect.left, right = rootDomRect.right;
			var selfWidth = dropContentDomRect.width;
			var _b = viewportBox || {}, _c = _b.left, viewportLeft = _c === void 0 ? 0 : _c, _d = _b.width, viewportWidth = _d === void 0 ? window.innerWidth : _d;
			var viewportGap = viewportMargin;
			var constraintRight = viewportLeft + viewportWidth - viewportGap;
			var constraintLeft = viewportLeft + viewportGap;
			var actualAlignment = alignment;
			if (alignment === "auto") {
				var rightAvailableSpace = constraintRight - left;
				var leftAvailableSpace = right - constraintLeft;
				if (selfWidth > rightAvailableSpace) actualAlignment = rightAvailableSpace >= leftAvailableSpace ? "left" : "right";
				else actualAlignment = "left";
			} else if (alignment === "auto-outer") actualAlignment = left - selfWidth < constraintLeft ? "right-outer" : "left-outer";
			var result = {
				actualAlignment,
				metric: {}
			};
			var validateResult = function() {
				result.metric.left = castInto(result.metric.left, [constraintLeft, constraintRight - (result.metric.width || selfWidth)]);
			};
			if (matchWidth && !this.isOuterAlignment) {
				result.metric.left = left;
				result.metric.width = rootWidth;
				validateResult();
				return result;
			}
			var constraintWidth = viewportWidth - 2 * viewportGap;
			if (actualAlignment === "left") {
				if (selfWidth > constraintWidth) {
					result.metric.left = constraintLeft;
					result.metric.width = constraintWidth;
				} else if (left + selfWidth > constraintRight) result.metric.left = constraintRight - selfWidth;
				else result.metric.left = left;
				validateResult();
				return result;
			}
			if (actualAlignment === "right") {
				if (selfWidth > constraintWidth) {
					result.metric.left = constraintLeft;
					result.metric.width = constraintWidth;
				} else if (right - selfWidth < constraintLeft) result.metric.left = constraintLeft;
				else result.metric.left = right - selfWidth;
				validateResult();
				return result;
			}
			if (actualAlignment === "center") result.metric.left = left + (rootWidth - selfWidth) / 2;
			else if (actualAlignment === "left-outer") result.metric.left = left - selfWidth;
			else if (actualAlignment === "right-outer") result.metric.left = right;
			validateResult();
			return result;
		};
		Dropdown.prototype.calcVerticalMetric = function(rootDomRect, dropContentDomRect) {
			var _a = this.props, placement = _a.placement, viewportMargin = _a.viewportMargin, viewportBox = _a.viewportBox;
			var bottom = rootDomRect.bottom, top = rootDomRect.top, rootHeight = rootDomRect.height;
			var height = dropContentDomRect.height;
			var viewportGap = viewportMargin;
			var actualPlacement = "bottom";
			var isOuter = this.isOuterAlignment;
			var _b = viewportBox || {}, _c = _b.top, viewportTop = _c === void 0 ? 0 : _c, _d = _b.height;
			var viewportBottom = viewportTop + (_d === void 0 ? window.innerHeight : _d);
			var resultHeight;
			var resultTop = 0;
			var constraintTop = viewportTop + viewportGap;
			var constraintBottom = viewportBottom - viewportGap;
			var tryTop = function() {
				var anchor = isOuter ? bottom : top;
				resultTop = Math.max(constraintTop, anchor - height);
				resultHeight = anchor - resultTop;
				actualPlacement = "top";
				return resultHeight;
			};
			var tryBottom = function() {
				resultTop = isOuter ? top : bottom;
				resultHeight = Math.min(height, constraintBottom - resultTop);
				actualPlacement = "bottom";
				return resultHeight;
			};
			var tryMiddle = function() {
				resultHeight = Math.min(height, constraintBottom - constraintTop, rootHeight);
				resultTop = top + (rootHeight - resultHeight) / 2;
				actualPlacement = "bottom";
				return resultHeight;
			};
			if (placement === "top" || top <= constraintTop && bottom >= constraintBottom) tryTop();
			else if (placement === "bottom") tryBottom();
			else if (placement === "auto") {
				if (tryBottom() === height) {} else if (tryTop() === height) {} else if ((tryBottom() >= tryTop() ? tryBottom() : tryTop()) < MIN_HEIGHT) tryMiddle();
			}
			return {
				metric: {
					top: resultTop + "px",
					height: resultHeight && resultHeight + "px"
				},
				actualPlacement
			};
		};
		Dropdown.prototype.setStateVisible = function(visible) {
			this.setState({ visible });
			this.props.onVisibleChange(visible);
		};
		Dropdown.prototype.consumeKeep = function(e) {
			var nativeEvent = e.nativeEvent;
			var result = Boolean(nativeEvent._dui_dropdown_keep);
			delete nativeEvent._dui_dropdown_keep;
			return result;
		};
		Dropdown.prototype.render = function() {
			return consumeTheme(this.themedRender);
		};
		Dropdown.contextType = DropdownContext;
		return Dropdown;
	}(import_react$55.Component);
	Dropdown.defaultProps = {
		prefixCls: "dui-dropdown",
		alignment: "auto",
		matchWidth: false,
		disabled: false,
		onVisibleChange: emptyFn,
		placement: "auto",
		animated: true,
		trigger: "click",
		destroyOnClose: true,
		autoFocus: true,
		viewportMargin: 2,
		shouldHide: trueFn
	};
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/components/Dropdown/Keep.js
function useKeep(event) {
	var e = event;
	if (!e._dui_bypass_dropdown_keep) e._dui_dropdown_keep = true;
}
var import_react$54, Keep;
var init_Keep = __esmMin((() => {
	init_createElement();
	init_tslib_es6();
	import_react$54 = /* @__PURE__ */ __toESM(require_react());
	init_theme();
	init_Trigger();
	Keep = function(_super) {
		__extends(Keep, _super);
		function Keep() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.handleMouseUp = function(e) {
				setTimeout(function() {
					_this.context(false);
				}, 0);
			};
			_this.handleClick = function(e) {
				var _a = _this.props, onClick = _a.onClick, disabled = _a.disabled;
				onClick === null || onClick === void 0 || onClick(e);
				var event = e.nativeEvent;
				if (disabled === true || typeof disabled === "function" && disabled(e) || event._dui_bypass_dropdown_keep) return;
				event._dui_dropdown_keep = true;
			};
			_this.handleMouseDown = function(e) {
				_this.context(true);
			};
			_this.themedRender = function(classNames) {
				var _a = _this.props, prefixCls = _a.prefixCls, className = _a.className, style = _a.style, children = _a.children;
				_a.disabled;
				var domRef = _a.domRef;
				return h$5("div", __assign({}, __rest(_a, [
					"prefixCls",
					"className",
					"style",
					"children",
					"disabled",
					"domRef"
				]), {
					className: classNames(prefixCls, className),
					style,
					ref: domRef,
					onClick: _this.handleClick,
					onMouseDown: _this.handleMouseDown
				}), children);
			};
			return _this;
		}
		Keep.prototype.componentDidMount = function() {
			document.addEventListener("mouseup", this.handleMouseUp);
		};
		Keep.prototype.componentWillUnmount = function() {
			document.removeEventListener("mouseup", this.handleMouseUp);
		};
		Keep.prototype.render = function() {
			return consumeTheme(this.themedRender);
		};
		Keep.contextType = TriggerContext;
		Keep.useKeep = useKeep;
		return Keep;
	}(import_react$54.Component);
	Keep.defaultProps = {
		prefixCls: "dui-dropdown-keep",
		disabled: false
	};
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/components/Dropdown/index.js
var Dropdown_default;
var init_Dropdown = __esmMin((() => {
	init_style();
	init_Dropdown$1();
	init_Keep();
	injectStyle("components/Dropdown/style/index.css", "[data-dui-1-28-2~=\"dui-dropdown-disabled\"]{opacity:.6}@-webkit-keyframes dui-dropdown-slide-in-bottom{0%{opacity:0;-webkit-transform:scaleX(1) translateY(-20px);transform:scaleX(1) translateY(-20px)}to{opacity:1;-webkit-transform:scaleX(1) translate(0);transform:scaleX(1) translate(0)}}@keyframes dui-dropdown-slide-in-bottom{0%{opacity:0;-webkit-transform:scaleX(1) translateY(-20px);transform:scaleX(1) translateY(-20px)}to{opacity:1;-webkit-transform:scaleX(1) translate(0);transform:scaleX(1) translate(0)}}@-webkit-keyframes dui-dropdown-slide-in-top{0%{opacity:0;-webkit-transform:scaleX(1) translateY(20px);transform:scaleX(1) translateY(20px)}to{opacity:1;-webkit-transform:scaleX(1) translate(0);transform:scaleX(1) translate(0)}}@keyframes dui-dropdown-slide-in-top{0%{opacity:0;-webkit-transform:scaleX(1) translateY(20px);transform:scaleX(1) translateY(20px)}to{opacity:1;-webkit-transform:scaleX(1) translate(0);transform:scaleX(1) translate(0)}}[data-dui-1-28-2~=\"dui-dropdown\"]{-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:inline-block;-webkit-tap-highlight-color:transparent}[data-dui-1-28-2~=\"dui-dropdown-container\"]{border-radius:2px}[data-dui-1-28-2~=\"dui-dropdown-container-visible\"]{background:var(--tsp-fill-medium,rgba(51,77,102,.08))}[data-dui-1-28-2~=\"dui-dropdown-content\"]{-webkit-box-sizing:border-box;box-sizing:border-box;position:fixed;z-index:9999;-webkit-transition-property:opacity,visibility,-webkit-transform;transition-property:opacity,visibility,-webkit-transform;transition-property:opacity,transform,visibility;transition-property:opacity,transform,visibility,-webkit-transform;-webkit-transition-timing-function:cubic-bezier(.4,0,.2,1);transition-timing-function:cubic-bezier(.4,0,.2,1);-webkit-tap-highlight-color:transparent;-webkit-animation-timing-function:cubic-bezier(.4,0,.2,1);animation-timing-function:cubic-bezier(.4,0,.2,1);-webkit-animation-duration:.24s;animation-duration:.24s}[data-dui-1-28-2~=\"dui-dropdown-content-bottom\"]{-webkit-animation-name:dui-dropdown-slide-in-bottom;animation-name:dui-dropdown-slide-in-bottom}[data-dui-1-28-2~=\"dui-dropdown-content-top\"]{-webkit-animation-name:dui-dropdown-slide-in-top;animation-name:dui-dropdown-slide-in-top}[data-dui-1-28-2~=\"dui-dropdown-content-left-outer\"]{padding-right:5px}[data-dui-1-28-2~=\"dui-dropdown-content-right-outer\"]{padding-left:5px}[data-dui-1-28-2~=\"dui-dropdown-content-inner\"][data-dui-1-28-2~=\"dui-dropdown-content-bottom\"]{padding-top:5px}[data-dui-1-28-2~=\"dui-dropdown-content-inner\"][data-dui-1-28-2~=\"dui-dropdown-content-top\"]{padding-bottom:5px}[data-dui-1-28-2~=\"dui-dropdown-content-visible\"]{-webkit-transition-duration:.24s;transition-duration:.24s;visibility:visible;opacity:1;-webkit-transform:scaleX(1) translate(0);transform:scaleX(1) translate(0)}[data-dui-1-28-2~=\"dui-dropdown-content-hidden\"]{-webkit-transition-duration:.12s;transition-duration:.12s;visibility:hidden;pointer-events:none}[data-dui-1-28-2~=\"dui-dropdown-content-hidden\"][data-dui-1-28-2~=\"dui-dropdown-content-bottom\"]{opacity:0;-webkit-transform:scaleX(1) translateY(-20px);transform:scaleX(1) translateY(-20px)}[data-dui-1-28-2~=\"dui-dropdown-content-hidden\"][data-dui-1-28-2~=\"dui-dropdown-content-top\"]{opacity:0;-webkit-transform:scaleX(1) translateY(20px);transform:scaleX(1) translateY(20px)}[data-dui-1-28-2~=\"dui-dropdown-content-no-animation\"]{-webkit-transition-duration:0s;transition-duration:0s;-webkit-animation-duration:0s;animation-duration:0s}");
	Dropdown.Keep = Keep;
	Dropdown_default = Dropdown;
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/components/Menu/context.js
var import_react$53, MenuItemContext, getMenuItemContext, SubMenuContext, getSubMenuContext, ContextMenuContext, getContextMenuContext;
var init_context$1 = __esmMin((() => {
	import_react$53 = /* @__PURE__ */ __toESM(require_react());
	init_helper();
	MenuItemContext = import_react$53.createContext({
		itemStyle: void 0,
		clickHandler: emptyFn,
		selectedIds: []
	});
	getMenuItemContext = createContextValueGetter();
	SubMenuContext = import_react$53.createContext({
		zIndex: 1e4,
		visible: true,
		type: "normal",
		horizontalPlacement: "right",
		viewportMargin: 2
	});
	getSubMenuContext = createContextValueGetter();
	ContextMenuContext = import_react$53.createContext({
		visible: true,
		onClick: emptyFn,
		contextMenuId: ""
	});
	getContextMenuContext = createContextValueGetter();
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/components/Menu/Menu.js
var import_react$52, Menu;
var init_Menu$1 = __esmMin((() => {
	init_createElement();
	init_tslib_es6();
	import_react$52 = /* @__PURE__ */ __toESM(require_react());
	init_helper();
	init_context$2();
	init_context$1();
	init_theme();
	init_focus();
	Menu = function(_super) {
		__extends(Menu, _super);
		function Menu() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.listRef = import_react$52.createRef();
			_this.clickedIds = [];
			_this.selectedItemDoms = /* @__PURE__ */ new Set();
			_this.handleClick = function(e) {
				if (_this.clickedIds.length === 0) return;
				var id = _this.clickedIds.shift();
				_this.clickedIds = [];
				_this.props.onClick(id, e);
				_this.context.onClick();
			};
			_this.handleItemClick = function(id) {
				_this.clickedIds.push(id);
			};
			_this.handleContextMenu = function(e) {
				e.preventDefault();
			};
			_this.handleKeyDown = function(e) {
				if (!_this.isVisible()) return;
				var container = _this.listRef.current;
				if (e.key === "ArrowDown") traverseFocusIn(container, e, false);
				else if (e.key === "ArrowUp") traverseFocusIn(container, e, true);
			};
			_this.themedRender = function(classNames) {
				var _a, _b = _this.props, prefixCls = _b.prefixCls, className = _b.className, style = _b.style, children = _b.children, itemStyle = _b.itemStyle, selectedIds = _b.selectedIds, type = _b.type, itemClassName = _b.itemClassName, selectable = _b.selectable, subMenuViewportMargin = _b.subMenuViewportMargin, testId = _b.testId;
				_b.onClick;
				_b.visible;
				_b.keyDownEventDom;
				var rest = __rest(_b, [
					"prefixCls",
					"className",
					"style",
					"children",
					"itemStyle",
					"selectedIds",
					"type",
					"itemClassName",
					"selectable",
					"subMenuViewportMargin",
					"testId",
					"onClick",
					"visible",
					"keyDownEventDom"
				]);
				var selfVisible = _this.isVisible();
				var cls = classNames(prefixCls, prefixCls + "-" + type, className, (_a = {}, _a[prefixCls + "-hidden"] = !selfVisible, _a[prefixCls + "-non-selectable"] = !selectable, _a));
				return h$5(DropdownContext.Consumer, null, function(_a) {
					var dropdownVisible = _a.visible;
					return h$5(MenuItemContext.Provider, { value: getMenuItemContext({
						itemStyle,
						itemClassName,
						clickHandler: _this.handleItemClick,
						selectedIds,
						selectedItemDoms: _this.selectedItemDoms
					}) }, h$5(SubMenuContext.Provider, { value: getSubMenuContext({
						zIndex: 1e4,
						visible: dropdownVisible && selfVisible,
						type,
						horizontalPlacement: "right",
						viewportMargin: subMenuViewportMargin
					}) }, h$5("ul", __assign({
						className: cls,
						style,
						onClick: _this.handleClick,
						onContextMenu: _this.handleContextMenu,
						role: "menu",
						"aria-haspopup": true,
						ref: _this.listRef,
						"data-testid": testId
					}, rest), children)));
				});
			};
			return _this;
		}
		Object.defineProperty(Menu.prototype, "keyDownDom", {
			get: function() {
				return this.props.keyDownEventDom === void 0 ? document : this.props.keyDownEventDom;
			},
			enumerable: false,
			configurable: true
		});
		Menu.prototype.isVisible = function() {
			return this.context.visible && this.props.visible;
		};
		Menu.prototype.scrollToSelected = function() {
			var _a;
			(_a = Array.from(this.selectedItemDoms.values())[0]) === null || _a === void 0 || _a.scrollIntoView({ block: "nearest" });
		};
		Menu.prototype.componentDidMount = function() {
			var _a;
			this.forceUpdate();
			(_a = this.keyDownDom) === null || _a === void 0 || _a.addEventListener("keydown", this.handleKeyDown);
		};
		Menu.prototype.componentWillUnmount = function() {
			var _a;
			(_a = this.keyDownDom) === null || _a === void 0 || _a.removeEventListener("keydown", this.handleKeyDown);
		};
		Menu.prototype.render = function() {
			return consumeTheme(this.themedRender);
		};
		Menu.contextType = ContextMenuContext;
		return Menu;
	}(import_react$52.Component);
	Menu.defaultProps = {
		prefixCls: "dui-menu",
		onClick: emptyFn,
		selectedIds: [],
		visible: true,
		type: "normal",
		selectable: true,
		subMenuViewportMargin: 2
	};
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/components/Menu/Item.js
var import_react$51, Item$1;
var init_Item$1 = __esmMin((() => {
	init_createElement();
	init_tslib_es6();
	import_react$51 = /* @__PURE__ */ __toESM(require_react());
	init_helper();
	init_context$1();
	init_Keep();
	init_theme();
	init_Dropdown();
	Item$1 = function(_super) {
		__extends(Item, _super);
		function Item() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.domRef = import_react$51.createRef();
			_this.state = { actionActive: false };
			_this.refDom = function(dom) {
				_this.domRef.current = dom;
				var propRef = _this.props.domRef;
				var selectedItemDoms = _this.context.selectedItemDoms;
				if (_this.isSelected()) selectedItemDoms === null || selectedItemDoms === void 0 || selectedItemDoms.add(dom);
				else selectedItemDoms === null || selectedItemDoms === void 0 || selectedItemDoms.delete(dom);
				if (!propRef) return;
				if (typeof propRef === "function") propRef(dom);
				else propRef.current = dom;
			};
			_this.handleClick = function(e) {
				var _a;
				var clickHandler = _this.context.clickHandler;
				var _b = _this.props, disabled = _b.disabled, onClick = _b.onClick;
				if (e.detail) (_a = _this.domRef.current) === null || _a === void 0 || _a.blur();
				if (disabled || e.nativeEvent._dui_menu_item_action) return;
				if (onClick(e) === false) return;
				if (!e.isPropagationStopped()) clickHandler(_this.props.id);
			};
			_this.handleKeyDown = function(e) {
				var _a;
				var _b = _this.props, disabled = _b.disabled, onKeyDown = _b.onKeyDown;
				if (disabled) return;
				if (onKeyDown(e) === false) return;
				if ([" ", "Enter"].includes(e.key)) {
					e.preventDefault();
					(_a = _this.domRef.current) === null || _a === void 0 || _a.click();
				}
			};
			_this.handleActionClick = function(e) {
				e.nativeEvent._dui_menu_item_action = true;
			};
			_this.handleToggleAction = function(actionActive) {
				_this.setState({ actionActive });
			};
			_this.handleMouseEnter = function(e) {
				var _a = _this.props, disabled = _a.disabled, onMouseEnter = _a.onMouseEnter;
				if (disabled) return;
				onMouseEnter(e);
			};
			_this.handleMouseLeave = function(e) {
				var _a = _this.props, disabled = _a.disabled, onMouseLeave = _a.onMouseLeave;
				if (disabled) return;
				onMouseLeave(e);
			};
			_this.themedRender = function(classNames) {
				var _a, _b = _this.props, prefixCls = _b.prefixCls, className = _b.className, style = _b.style, disabled = _b.disabled, description = _b.description, htmlId = _b.htmlId, containerClassName = _b.containerClassName, containerStyle = _b.containerStyle, testId = _b.testId, action = _b.action;
				_b.id;
				_b.children;
				_b.icon;
				_b.onClick;
				_b.onKeyDown;
				_b.selected;
				_b.domRef;
				_b.actionTriggersDropdownHide;
				_b.onMouseEnter;
				_b.onMouseLeave;
				_b.actionAutoFocus;
				var rest = __rest(_b, [
					"prefixCls",
					"className",
					"style",
					"disabled",
					"description",
					"htmlId",
					"containerClassName",
					"containerStyle",
					"testId",
					"action",
					"id",
					"children",
					"icon",
					"onClick",
					"onKeyDown",
					"selected",
					"domRef",
					"actionTriggersDropdownHide",
					"onMouseEnter",
					"onMouseLeave",
					"actionAutoFocus"
				]);
				var actionActive = _this.state.actionActive;
				var _c = _this.context, itemStyle = _c.itemStyle, itemClassName = _c.itemClassName;
				var selected = _this.isSelected();
				var cls = classNames(prefixCls, className, itemClassName, (_a = {}, _a[prefixCls + "-disabled"] = disabled, _a[prefixCls + "-selected"] = selected, _a[prefixCls + "-with-action"] = action, _a[prefixCls + "-with-action-active"] = actionActive, _a));
				var containerCls = classNames(prefixCls + "-container", containerClassName);
				return h$5(Keep, {
					disabled: !disabled,
					className: containerCls,
					style: containerStyle
				}, h$5("li", __assign({
					className: cls,
					style: __assign(__assign({}, itemStyle), style),
					onClick: _this.handleClick,
					ref: _this.refDom,
					onMouseEnter: _this.handleMouseEnter,
					onMouseLeave: _this.handleMouseLeave,
					role: "menuitem",
					"aria-disabled": disabled,
					"aria-checked": selected,
					tabIndex: disabled ? -1 : 0,
					onKeyDown: _this.handleKeyDown,
					id: htmlId,
					"data-testid": testId
				}, rest), _this.renderChildren(classNames), description ? h$5("span", { className: classNames(prefixCls + "-description") }, description) : null, _this.renderAdditionalAction(classNames)));
			};
			return _this;
		}
		Item.prototype.isSelected = function() {
			if (typeof this.props.selected === "boolean") return this.props.selected;
			return this.context.selectedIds.indexOf(this.props.id) !== -1;
		};
		Item.prototype.renderChildren = function(classNames) {
			var _a = this.props, prefixCls = _a.prefixCls, children = _a.children, icon = _a.icon, iconClassName = _a.iconClassName, iconStyle = _a.iconStyle;
			var iconElem = icon ? typeof icon === "string" ? h$5("div", {
				className: classNames(prefixCls + "-icon", iconClassName),
				style: __assign({ backgroundImage: "url(\"" + icon + "\")" }, iconStyle)
			}) : icon : null;
			var content = typeof children === "string" ? h$5("div", { className: classNames(prefixCls + "-text-container") }, children) : children;
			return iconElem ? h$5("div", { className: classNames(prefixCls + "-icon-container") }, iconElem, content) : content;
		};
		Item.prototype.renderAdditionalAction = function(classNames) {
			var _a, _b;
			var _c = this.props, prefixCls = _c.prefixCls, action = _c.action, actionTriggersDropdownHide = _c.actionTriggersDropdownHide, actionAutoFocus = _c.actionAutoFocus;
			var actionActive = this.state.actionActive;
			if (!action) return null;
			var wrapperClassName = classNames(prefixCls + "-action-wrapper", (_a = {}, _a[prefixCls + "-action-wrapper-active"] = actionActive, _a));
			var actionClassName = classNames(prefixCls + "-action", (_b = {}, _b[prefixCls + "-action-active"] = actionActive, _b));
			return h$5(Dropdown_default.Keep, {
				className: wrapperClassName,
				onClick: this.handleActionClick,
				disabled: actionTriggersDropdownHide
			}, h$5(Dropdown_default, {
				dropContent: action,
				alignment: "right-outer",
				dropContentClassName: classNames(prefixCls + "-action-content"),
				visible: actionActive,
				onVisibleChange: this.handleToggleAction,
				autoFocus: actionAutoFocus
			}, h$5(Dropdown_default.Keep, { className: actionClassName })));
		};
		Item.prototype.componentWillUnmount = function() {
			var selectedItemDoms = this.context.selectedItemDoms;
			var dom = this.domRef.current;
			selectedItemDoms === null || selectedItemDoms === void 0 || selectedItemDoms.delete(dom);
		};
		Item.prototype.render = function() {
			return consumeTheme(this.themedRender);
		};
		Item.contextType = MenuItemContext;
		return Item;
	}(import_react$51.Component);
	Item$1.defaultProps = {
		prefixCls: "dui-menu-item",
		id: "",
		onMouseEnter: emptyFn,
		onMouseLeave: emptyFn,
		onClick: emptyFn,
		disabled: false,
		onKeyDown: emptyFn,
		actionTriggersDropdownHide: true
	};
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/components/Menu/SubMenu.js
var import_react$50, import_react_dom$8, DEFAULT_METRICS$1, SUBMENU_OFFSET, SubMenu;
var init_SubMenu = __esmMin((() => {
	init_createElement();
	init_tslib_es6();
	import_react$50 = /* @__PURE__ */ __toESM(require_react());
	import_react_dom$8 = /* @__PURE__ */ __toESM(require_react_dom());
	init_Item$1();
	init_context$1();
	init_Keep();
	init_theme();
	init_helper();
	init_focus();
	DEFAULT_METRICS$1 = {
		verticalPlacement: "bottom",
		horizontalPlacement: "right",
		location: {
			left: "0px",
			top: "0px"
		},
		forcedHeight: 0
	};
	SUBMENU_OFFSET = -2;
	SubMenu = function(_super) {
		__extends(SubMenu, _super);
		function SubMenu() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.itemRef = import_react$50.createRef();
			_this.popupWrapperRef = import_react$50.createRef();
			_this.popupContentRef = import_react$50.createRef();
			_this.state = {
				visible: false,
				metrics: __assign({}, DEFAULT_METRICS$1)
			};
			_this.handleMouseEnter = function() {
				clearTimeout(_this.hideTimeout);
				if (_this.props.disabled || _this.isVisible()) return;
				clearTimeout(_this.showTimeout);
				_this.showTimeout = setTimeout(function() {
					_this.setState({ metrics: __assign(__assign({}, _this.state.metrics), { forcedHeight: 0 }) }, function() {
						_this.updatePopoutMetrics();
						_this.setStateVisible(true);
					});
				}, _this.props.hoverDelay);
			};
			_this.handleMouseLeave = function(e) {
				if (_this.props.disabled || !e.relatedTarget) return;
				clearTimeout(_this.showTimeout);
				_this.hideTimeout = setTimeout(function() {
					return _this.setStateVisible(false);
				}, _this.props.hoverDelay);
			};
			_this.handleLeavePage = function() {
				if (_this.props.disabled || document.visibilityState !== "hidden") return;
				_this.setStateVisible(false);
			};
			_this.handleSubmenuClick = function(e) {
				var onClick = _this.props.onClick;
				if (onClick) {
					if (!(onClick(e) === false)) {
						var keepEvent = e.nativeEvent;
						keepEvent._dui_bypass_dropdown_keep = true;
					}
					return true;
				}
				e.stopPropagation();
				e.nativeEvent.stopImmediatePropagation();
				return false;
			};
			_this.handleSubMenuItemKeyDown = function(e) {
				if (_this.props.disabled) return false;
				if ([
					" ",
					"Enter",
					"ArrowRight"
				].includes(e.key)) {
					_this.handleMouseEnter();
					e.preventDefault();
					setTimeout(function() {
						var container = _this.popupContentRef.current;
						container && traverseFocusIn(container, null, false);
					}, 50);
				}
				return false;
			};
			_this.handleContentKeyDown = function(e) {
				var _a;
				if (_this.props.disabled) return;
				var container = _this.popupContentRef.current;
				e.stopPropagation();
				if (["ArrowDown", "ArrowUp"].includes(e.key)) {
					e.nativeEvent.stopImmediatePropagation();
					traverseFocusIn(container, e, e.key === "ArrowUp");
				}
				if (e.key === "ArrowLeft") {
					_this.setStateVisible(false);
					(_a = _this.itemDom) === null || _a === void 0 || _a.focus();
				}
			};
			_this.themedRender = function(classNames) {
				var _a, _b;
				var _c = _this.props, prefixCls = _c.prefixCls, className = _c.className, style = _c.style, children = _c.children, id = _c.id, title = _c.title, disabled = _c.disabled, popupStyle = _c.popupStyle, popupClassName = _c.popupClassName, forcedZIndex = _c.zIndex, icon = _c.icon, selectable = _c.selectable, propType = _c.type, description = _c.description, selected = _c.selected, testId = _c.testId, popupTestId = _c.popupTestId, onClick = _c.onClick, containerDom = _c.containerDom, iconStyle = _c.iconStyle, iconClassName = _c.iconClassName;
				var _d = _this.context, contextZIndex = _d.zIndex, parentType = _d.type;
				var _e = _this.state.metrics, location = _e.location, verticalPlacement = _e.verticalPlacement, forcedHeight = _e.forcedHeight, horizontalPlacement = _e.horizontalPlacement;
				var zIndex = forcedZIndex || contextZIndex;
				var visible = _this.isVisible();
				var cls = classNames(prefixCls, className, (_a = {}, _a[prefixCls + "-disabled"] = disabled, _a[prefixCls + "-with-desc"] = description, _a[prefixCls + "-clickable"] = onClick, _a[prefixCls + "-visible"] = visible, _a));
				var popupWrapperCls = classNames(prefixCls + "-wrapper", prefixCls + "-wrapper-" + (visible ? "visible" : "hidden-" + verticalPlacement));
				var type = propType || parentType;
				var contentCls = classNames(prefixCls + "-content", popupClassName, prefixCls + "-content-" + type, (_b = {}, _b[prefixCls + "-content-non-selectable"] = !selectable, _b));
				return h$5(ContextMenuContext.Consumer, null, function(_a) {
					var contextMenuId = _a.contextMenuId;
					return h$5(SubMenuContext.Provider, { value: getSubMenuContext({
						zIndex: zIndex + 1,
						visible,
						type,
						horizontalPlacement,
						viewportMargin: _this.context.viewportMargin
					}) }, h$5("div", {
						onMouseEnter: _this.handleMouseEnter,
						onMouseLeave: _this.handleMouseLeave
					}, h$5(Keep, null, h$5(Item$1, {
						id,
						className: cls,
						style,
						ref: _this.itemRef,
						disabled,
						onClick: _this.handleSubmenuClick,
						onKeyDown: _this.handleSubMenuItemKeyDown,
						icon,
						iconStyle,
						iconClassName,
						description,
						selected,
						"data-testid": testId
					}, title || id)), import_react_dom$8.createPortal(h$5("div", {
						className: popupWrapperCls,
						ref: _this.popupWrapperRef,
						style: __assign(__assign({}, location), { zIndex }),
						"data-context-menu-id": contextMenuId || void 0
					}, h$5("ul", {
						className: contentCls,
						style: __assign({ height: forcedHeight ? forcedHeight + "px" : void 0 }, popupStyle),
						ref: _this.popupContentRef,
						role: "menu",
						"aria-haspopup": true,
						"aria-expanded": visible,
						onKeyDown: _this.handleContentKeyDown,
						"data-testid": popupTestId
					}, children)), containerDom || document.body)));
				});
			};
			return _this;
		}
		SubMenu.getDerivedStateFromProps = function(props, state) {
			if (props.disabled) return { visible: false };
			return null;
		};
		Object.defineProperty(SubMenu.prototype, "itemDom", {
			get: function() {
				var _a;
				return (_a = this.itemRef.current) === null || _a === void 0 ? void 0 : _a.domRef.current;
			},
			enumerable: false,
			configurable: true
		});
		SubMenu.prototype.componentDidMount = function() {
			document.addEventListener("visibilitychange", this.handleLeavePage);
		};
		SubMenu.prototype.componentWillUnmount = function() {
			document.removeEventListener("visibilitychange", this.handleLeavePage);
			clearTimeout(this.hideTimeout);
			clearTimeout(this.showTimeout);
		};
		SubMenu.prototype.updatePopoutMetrics = function() {
			var itemDom = this.itemDom;
			if (!itemDom) return;
			var popupDom = this.popupWrapperRef.current;
			if (!popupDom) return;
			var maxRight = window.innerWidth, maxBottom = window.innerHeight;
			var _a = itemDom.getBoundingClientRect(), parentRight = _a.right, parentLeft = _a.left, parentTop = _a.top, parentBottom = _a.bottom;
			var _b = popupDom.getBoundingClientRect(), width = _b.width, height = _b.height;
			var _c = this.context, parentMenuPlacement = _c.horizontalPlacement, viewportMargin = _c.viewportMargin;
			var availableDirections = [];
			if (parentRight + width < maxRight) availableDirections.push("right");
			if (parentLeft - width > 0) availableDirections.push("left");
			var horizontalPlacement = availableDirections.includes(parentMenuPlacement) ? parentMenuPlacement : availableDirections[0] || "right";
			var gap = viewportMargin;
			var remainingBottom = maxBottom - parentTop - gap;
			var remainingTop = parentBottom - gap;
			var verticalPlacement = "bottom";
			var forcedHeight = 0;
			if (height >= remainingBottom) if (height >= remainingTop) if (remainingBottom >= remainingTop) {
				verticalPlacement = "bottom";
				forcedHeight = remainingBottom;
			} else {
				verticalPlacement = "top";
				forcedHeight = remainingTop;
			}
			else verticalPlacement = "top";
			else verticalPlacement = "bottom";
			var resultLeft = window.pageXOffset + (horizontalPlacement === "right" ? parentRight + SUBMENU_OFFSET : parentLeft - width - SUBMENU_OFFSET);
			var resultTop = window.pageYOffset + (verticalPlacement === "bottom" ? parentTop : parentBottom - (forcedHeight || height));
			var result = {
				verticalPlacement,
				horizontalPlacement,
				location: {
					left: resultLeft + "px",
					top: resultTop + "px"
				},
				forcedHeight
			};
			this.setState({ metrics: result });
		};
		SubMenu.prototype.isVisible = function() {
			var selfVisible = this.state.visible;
			var parentVisible = this.context.visible;
			var disabled = this.props.disabled;
			return parentVisible && selfVisible && !disabled;
		};
		SubMenu.prototype.setStateVisible = function(visible) {
			var _this = this;
			this.setState({ visible }, function() {
				_this.props.onVisibleChange(visible);
			});
		};
		SubMenu.prototype.render = function() {
			return consumeTheme(this.themedRender);
		};
		SubMenu.contextType = SubMenuContext;
		return SubMenu;
	}(import_react$50.Component);
	SubMenu.defaultProps = {
		prefixCls: "dui-menu-submenu",
		id: "",
		disabled: false,
		onVisibleChange: emptyFn,
		selectable: true,
		hoverDelay: 100
	};
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/components/Menu/ContextMenu.js
var import_react$49, import_react_dom$7, import_prop_types$5, DEFAULT_METRICS, ContextMenu;
var init_ContextMenu = __esmMin((() => {
	init_createElement();
	init_tslib_es6();
	import_react$49 = /* @__PURE__ */ __toESM(require_react());
	import_react_dom$7 = /* @__PURE__ */ __toESM(require_react_dom());
	import_prop_types$5 = /* @__PURE__ */ __toESM(require_prop_types());
	init_Trigger();
	init_helper();
	init_theme();
	init_context$1();
	DEFAULT_METRICS = {
		horizontal: "right",
		vertical: "bottom",
		height: 0
	};
	ContextMenu = function(_super) {
		__extends(ContextMenu, _super);
		function ContextMenu() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.popupRef = import_react$49.createRef();
			_this.anchorRef = import_react$49.createRef();
			_this.id = String(Math.round(Math.random() * 1e7));
			_this.state = {
				visible: false,
				menu: null,
				location: {
					left: 0,
					top: 0
				},
				metrics: __assign({}, DEFAULT_METRICS)
			};
			_this.handleScroll = function(e) {
				var _a;
				if (!_this.isVisible() || ((_a = _this.popupRef.current) === null || _a === void 0 ? void 0 : _a.contains(e.target)) || _this.isFromSubmenu(e.composedPath())) return;
				_this.hide();
			};
			_this.handleContextMenu = function(e) {
				e.preventDefault();
				var _a = _this.props, menu = _a.menu, disabled = _a.disabled, onVisibleChange = _a.onVisibleChange;
				if (disabled) return;
				_this.setState({
					menu: typeof menu === "function" ? menu(e) : menu,
					visible: false,
					location: {
						left: e.pageX,
						top: e.pageY
					},
					metrics: __assign(__assign({}, _this.state.metrics), { height: 0 })
				}, function() {
					_this.updatePopoutMetrics();
					_this.setState({ visible: true }, function() {
						onVisibleChange(true);
					});
				});
			};
			_this.hide = function() {
				if (!_this.isVisible()) return;
				_this.setState({ visible: false }, function() {
					_this.props.onVisibleChange(false);
				});
			};
			_this.themedRender = function(classNames) {
				var _a;
				var _b = _this.props, prefixCls = _b.prefixCls, className = _b.className, style = _b.style, children = _b.children, disabled = _b.disabled, popupStyle = _b.popupStyle, zIndex = _b.zIndex, popupClassName = _b.popupClassName;
				var visible = _this.isVisible();
				var cls = classNames(prefixCls, className, (_a = {}, _a[prefixCls + "-disabled"] = disabled, _a));
				var _c = _this.state, _d = _c.location, left = _d.left, top = _d.top, menu = _c.menu, _e = _c.metrics, height = _e.height, vertical = _e.vertical, horizontal = _e.horizontal;
				var popupCls = classNames(prefixCls + "-popup", popupClassName, prefixCls + "-popup-" + horizontal + "-" + vertical, prefixCls + "-popup-" + (visible ? "visible" : "hidden"));
				return h$5(Trigger, { action: _this.hide }, h$5("div", {
					className: cls,
					style,
					onContextMenu: _this.handleContextMenu,
					ref: _this.anchorRef
				}, children), import_react_dom$7.createPortal(h$5(Trigger, {
					className: popupCls,
					style: __assign({
						left: left + "px",
						top: top + "px",
						height: height ? height + "px" : void 0,
						zIndex
					}, popupStyle),
					action: _this.hide,
					domRef: _this.popupRef,
					disableContextMenu: true
				}, h$5(ContextMenuContext.Provider, { value: getContextMenuContext({
					visible,
					onClick: _this.hide,
					contextMenuId: _this.id
				}) }, menu)), document.body));
			};
			return _this;
		}
		ContextMenu.prototype.isFromSubmenu = function(path) {
			var _this = this;
			return path.some(function(item) {
				var _a;
				return ((_a = item.dataset) === null || _a === void 0 ? void 0 : _a.contextMenuId) === _this.id;
			});
		};
		ContextMenu.getDerivedStateFromProps = function(props, state) {
			if (props.disabled) return { visible: false };
			return null;
		};
		ContextMenu.prototype.componentDidMount = function() {
			document.addEventListener("scroll", this.handleScroll, {
				passive: true,
				capture: true
			});
			document.addEventListener("wheel", this.handleScroll);
		};
		ContextMenu.prototype.componentWillUnmount = function() {
			document.removeEventListener("scroll", this.handleScroll, { capture: true });
			document.removeEventListener("wheel", this.handleScroll);
		};
		ContextMenu.prototype.isVisible = function() {
			var _a = this.props, forceVisible = _a.visible;
			if (_a.disabled) return false;
			var stateVisible = this.state.visible;
			return typeof forceVisible === "boolean" ? forceVisible : stateVisible;
		};
		ContextMenu.prototype.updatePopoutMetrics = function() {
			var _a = this.props, popupBoundary = _a.popupBoundary, popupMargin = _a.popupMargin;
			var anchorDom = this.anchorRef.current;
			var popupDom = this.popupRef.current;
			if (!popupDom || !anchorDom) return;
			var _b = this.state.location, left = _b.left, top = _b.top;
			var targetLeft = left - window.pageXOffset;
			var targetTop = top - window.pageYOffset;
			var maxLeft = 0, maxRight = window.innerWidth, maxTop = 0, maxBottom = window.innerHeight;
			var _c = anchorDom.getBoundingClientRect(), containerLeft = _c.left, containerRight = _c.right, containerTop = _c.top, containerBottom = _c.bottom;
			if (popupBoundary === "container") {
				maxLeft = Math.max(maxLeft, containerLeft);
				maxRight = Math.min(maxRight, containerRight);
				maxTop = Math.max(maxTop, containerTop);
				maxBottom = Math.min(maxBottom, containerBottom);
			}
			maxLeft += popupMargin;
			maxRight -= popupMargin;
			maxTop += popupMargin;
			maxBottom -= popupMargin;
			var _d = popupDom.getBoundingClientRect(), width = _d.width, height = _d.height;
			var horizontal = targetLeft + width <= maxRight ? "right" : targetLeft <= (maxRight + maxLeft) / 2 ? "right" : "left";
			var remainingBottom = maxBottom - targetTop, remainingTop = targetTop - maxTop;
			var vertical = "bottom";
			var forcedHeight = 0;
			if (height > remainingBottom) if (height > remainingTop) if (remainingBottom >= remainingTop) {
				vertical = "bottom";
				forcedHeight = remainingBottom;
			} else {
				vertical = "top";
				forcedHeight = remainingTop;
			}
			else vertical = "top";
			else vertical = "bottom";
			var result = {
				horizontal,
				vertical,
				height: forcedHeight
			};
			this.setState({ metrics: result });
		};
		ContextMenu.prototype.render = function() {
			return consumeTheme(this.themedRender);
		};
		return ContextMenu;
	}(import_react$49.Component);
	ContextMenu.defaultProps = {
		prefixCls: "dui-menu-contextmenu",
		disabled: false,
		popupBoundary: "viewport",
		popupMargin: 0,
		onVisibleChange: emptyFn
	};
	ContextMenu.propTypes = {
		prefixCls: import_prop_types$5.string,
		style: import_prop_types$5.object,
		className: import_prop_types$5.string,
		menu: import_prop_types$5.any,
		disabled: import_prop_types$5.bool,
		popupStyle: import_prop_types$5.object,
		popupClassName: import_prop_types$5.string,
		visible: import_prop_types$5.bool,
		popupBoundary: import_prop_types$5.oneOf(["container", "viewport"]),
		popupMargin: import_prop_types$5.number,
		onVisibleChange: import_prop_types$5.func,
		zIndex: import_prop_types$5.number
	};
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/components/Menu/Input.js
var import_react$48, MenuInput;
var init_Input = __esmMin((() => {
	init_createElement();
	init_tslib_es6();
	import_react$48 = /* @__PURE__ */ __toESM(require_react());
	init_theme();
	init_Input$1();
	init_Keep();
	MenuInput = function(_super) {
		__extends(MenuInput, _super);
		function MenuInput() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.themedRender = function(classNames) {
				var _a = _this.props, className = _a.className, inputClassName = _a.inputClassName, prefixCls = _a.prefixCls, containerClassName = _a.containerClassName, containerStyle = _a.containerStyle, prefix = _a.prefix, postfix = _a.postfix, rest = __rest(_a, [
					"className",
					"inputClassName",
					"prefixCls",
					"containerClassName",
					"containerStyle",
					"prefix",
					"postfix"
				]);
				var cls = classNames(prefixCls, className);
				var inputCls = classNames(prefixCls + "-input", inputClassName);
				var containerCls = classNames(prefixCls + "-container", containerClassName);
				var prefixDomCls = classNames(prefixCls + "-prefix");
				var postfixDomCls = classNames(prefixCls + "-postfix");
				return h$5(Keep, {
					className: containerCls,
					style: containerStyle
				}, prefix && h$5("div", { className: prefixDomCls }, prefix), h$5(Input_default, __assign({
					className: cls,
					inputClassName: inputCls
				}, rest)), postfix && h$5("div", { className: postfixDomCls }, postfix));
			};
			return _this;
		}
		MenuInput.prototype.render = function() {
			return consumeTheme(this.themedRender);
		};
		return MenuInput;
	}(import_react$48.Component);
	MenuInput.defaultProps = { prefixCls: "dui-menu-input" };
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/components/Menu/index.js
var Menu_default;
var init_Menu = __esmMin((() => {
	init_style();
	init_Menu$1();
	init_Item$1();
	init_SubMenu();
	init_ContextMenu();
	init_Input();
	injectStyle("components/Menu/style/index.css", "[data-dui-1-28-2~=\"dui-menu\"],[data-dui-1-28-2~=\"dui-menu-submenu-content\"]{-webkit-box-shadow:0 2px 12px 2px var(--dui-shadow-color,rgba(68,73,77,.16));box-shadow:0 2px 12px 2px var(--dui-shadow-color,rgba(68,73,77,.16));list-style:none;padding:8px 0;margin:0;border:1px solid var(--border-strong,rgba(0,0,0,.12));border-radius:4px;-webkit-tap-highlight-color:transparent;overflow-y:auto;overflow-x:hidden;-webkit-box-sizing:border-box;box-sizing:border-box;height:100%;background-color:var(--bg-lv4-default,#fff)}[data-dui-1-28-2~=\"dui-menu-hidden\"]{visibility:hidden}[data-dui-1-28-2~=\"dui-menu-item\"]{position:relative;-webkit-box-sizing:content-box;box-sizing:content-box;white-space:nowrap;-webkit-transition:background-color .1s linear;transition:background-color .1s linear;padding:9px 16px 9px 28px;font-size:12px;height:12px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-flow:row nowrap;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;color:var(--text-ultrastrong,rgba(0,0,0,.9));cursor:default}[data-dui-1-28-2~=\"dui-menu-item-disabled\"]{opacity:.3;pointer-events:none}[data-dui-1-28-2~=\"dui-menu-item-icon-container\"]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}[data-dui-1-28-2~=\"dui-menu-item-with-action-active\"] [data-dui-1-28-2~=\"dui-menu-item-icon-container\"],[data-dui-1-28-2~=\"dui-menu-item-with-action\"]:hover [data-dui-1-28-2~=\"dui-menu-item-icon-container\"]{max-width:calc(100% - 24px)}[data-dui-1-28-2~=\"dui-menu-item-text-container\"]{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}[data-dui-1-28-2~=\"dui-menu-item-icon\"]{width:20px;height:20px;background-repeat:no-repeat;background-size:contain;background-position:50%;margin-right:8px;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}[data-dui-1-28-2~=\"dui-menu-item-description\"]{font-size:12px;color:var(--text-medium,rgba(0,0,0,.56));margin-left:10px}[data-dui-1-28-2~=\"dui-menu-item-disabled\"] [data-dui-1-28-2~=\"dui-menu-item-description\"]{color:var(--text-ultrastrong,rgba(0,0,0,.9))}[data-dui-1-28-2~=\"dui-menu-item-selected\"]:before{content:\"\";position:absolute;display:inline-block;width:16px;height:16px;left:8px;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);background-repeat:no-repeat;background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Cpath d='M12.5 3l1.5.944L5.671 13l-.885-.957L2 9l1.5-1 2.215 2.22z' fill='%231e6fff' fill-rule='evenodd'/%3E%3C/svg%3E\");background-size:contain;background-position:50%}:not([data-dui-1-28-2~=\"dui-menu-item-disabled\"])[data-dui-1-28-2~=\"dui-menu-item\"]:focus,:not([data-dui-1-28-2~=\"dui-menu-item-disabled\"])[data-dui-1-28-2~=\"dui-menu-item\"]:hover{background-color:var(--feedback-hover,rgba(51,77,102,.06))}:not([data-dui-1-28-2~=\"dui-menu-item-disabled\"])[data-dui-1-28-2~=\"dui-menu-item\"]:active{background-color:var(--feedback-active,rgba(51,77,102,.08))}[data-dui-1-28-2~=\"dui-menu-item-action\"]{width:24px;height:24px;border-radius:2px;background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cpath d='M7 11v2H5v-2h2zm6 0v2h-2v-2h2zm6 0v2h-2v-2h2z' fill='%23464d5a'/%3E%3C/svg%3E\");background-position:50%;background-repeat:no-repeat;background-size:contain}[data-dui-1-28-2~=\"dui-menu-item-action-active\"],[data-dui-1-28-2~=\"dui-menu-item-action\"]:hover{background-color:rgba(0,0,0,.08)}[data-dui-1-28-2~=\"dui-menu-item-action-content\"]{margin-top:-4px;margin-left:10px}[data-dui-1-28-2~=\"dui-menu-item-action-wrapper\"]{height:24px;visibility:hidden}[data-dui-1-28-2~=\"dui-menu-item-action-wrapper-active\"],[data-dui-1-28-2~=\"dui-menu-item\"]:hover [data-dui-1-28-2~=\"dui-menu-item-action-wrapper\"]{visibility:visible}[data-dui-1-28-2~=\"dui-menu-submenu\"]:after{content:\"\";background:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='6'%3E%3Cpath d='M3.936 3.123L.374 5.95a.261.261 0 01-.31 0A.158.158 0 010 5.826V.174C0 .078.098 0 .22 0a.25.25 0 01.154.05l3.562 2.827a.15.15 0 010 .246z' opacity='.4'/%3E%3C/svg%3E\");display:inline-block;width:4px;min-width:4px;height:6px;background-position:50%;background-size:cover;margin-left:24px;-webkit-filter:var(--dui-invert-filter,none);filter:var(--dui-invert-filter,none)}[data-dui-1-28-2~=\"dui-menu-submenu-visible\"]{background-color:var(--feedback-hover,rgba(51,77,102,.06))}[data-dui-1-28-2~=\"dui-menu-submenu-with-desc\"]:after{position:absolute;right:16px;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);margin-left:0}[data-dui-1-28-2~=\"dui-menu-submenu-with-desc\"] [data-dui-1-28-2~=\"dui-menu-item-description\"]{margin-right:16px}:not([data-dui-1-28-2~=\"dui-menu-submenu-clickable\"])[data-dui-1-28-2~=\"dui-menu-submenu\"]:active{background-color:var(--feedback-hover,rgba(51,77,102,.06))}[data-dui-1-28-2~=\"dui-menu-submenu-wrapper\"]{padding:0;background:transparent;position:absolute;-webkit-transition-property:visibility,opacity,-webkit-transform;transition-property:visibility,opacity,-webkit-transform;transition-property:visibility,opacity,transform;transition-property:visibility,opacity,transform,-webkit-transform;-webkit-transition-timing-function:cubic-bezier(.4,0,.2,1);transition-timing-function:cubic-bezier(.4,0,.2,1)}[data-dui-1-28-2~=\"dui-menu-submenu-wrapper-visible\"]{visibility:visible;-webkit-transition-duration:.16s;transition-duration:.16s;opacity:1;-webkit-transform:scaleX(1) translate(0);transform:scaleX(1) translate(0)}[data-dui-1-28-2~=\"dui-menu-submenu-wrapper-hidden-bottom\"],[data-dui-1-28-2~=\"dui-menu-submenu-wrapper-hidden-top\"]{visibility:hidden;-webkit-transition-duration:.12s;transition-duration:.12s}[data-dui-1-28-2~=\"dui-menu-submenu-wrapper-hidden-bottom\"]{opacity:0;-webkit-transform:scaleX(1) translateY(-5px);transform:scaleX(1) translateY(-5px)}[data-dui-1-28-2~=\"dui-menu-submenu-wrapper-hidden-top\"]{opacity:0;-webkit-transform:scaleX(1) translateY(5px);transform:scaleX(1) translateY(5px)}[data-dui-1-28-2~=\"dui-menu-contextmenu-popup\"]{position:absolute;z-index:9999;overflow-y:auto;overflow-x:hidden;-webkit-box-shadow:0 2px 12px 2px var(--dui-shadow-color,rgba(68,73,77,.16));box-shadow:0 2px 12px 2px var(--dui-shadow-color,rgba(68,73,77,.16))}[data-dui-1-28-2~=\"dui-menu-contextmenu-popup-hidden\"]{visibility:hidden}[data-dui-1-28-2~=\"dui-menu-contextmenu-popup-left-top\"]{-webkit-transform:translate(-100%,-100%);transform:translate(-100%,-100%)}[data-dui-1-28-2~=\"dui-menu-contextmenu-popup-left-bottom\"]{-webkit-transform:translateX(-100%);transform:translateX(-100%)}[data-dui-1-28-2~=\"dui-menu-contextmenu-popup-right-top\"]{-webkit-transform:translateY(-100%);transform:translateY(-100%)}[data-dui-1-28-2~=\"dui-menu\"] [data-dui-1-28-2~=\"dui-menu-input-container\"]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;color:var(--text-ultrastrong,rgba(0,0,0,.9))}[data-dui-1-28-2~=\"dui-menu\"] [data-dui-1-28-2~=\"dui-menu-input-postfix\"]{margin-left:4px}[data-dui-1-28-2~=\"dui-menu\"] [data-dui-1-28-2~=\"dui-menu-input-prefix\"]{margin-right:4px}[data-dui-1-28-2~=\"dui-menu\"] [data-dui-1-28-2~=\"dui-menu-input-input\"]{width:32px;height:20px;font-size:12px;padding:2px;text-align:center;border-radius:2px;border-color:var(--border-medium,rgba(0,0,0,.08))}[data-dui-1-28-2~=\"dui-menu-compact\"],[data-dui-1-28-2~=\"dui-menu-submenu-content-compact\"]{padding:6px 0;border:1px solid var(--border-strong,rgba(0,0,0,.12));-webkit-box-shadow:0 2px 12px 2px var(--dui-shadow-color,rgba(68,73,77,.16));box-shadow:0 2px 12px 2px var(--dui-shadow-color,rgba(68,73,77,.16))}[data-dui-1-28-2~=\"dui-menu-compact\"] [data-dui-1-28-2~=\"dui-menu-item\"],[data-dui-1-28-2~=\"dui-menu-submenu-content-compact\"] [data-dui-1-28-2~=\"dui-menu-item\"]{font-size:12px;height:12px;padding:8px 12px 8px 28px}[data-dui-1-28-2~=\"dui-menu-non-selectable\"] [data-dui-1-28-2~=\"dui-menu-item\"],[data-dui-1-28-2~=\"dui-menu-submenu-content-non-selectable\"] [data-dui-1-28-2~=\"dui-menu-item\"]{padding-left:16px}[data-dui-1-28-2~=\"dui-menu-non-selectable\"] [data-dui-1-28-2~=\"dui-menu-item-selected\"]:before,[data-dui-1-28-2~=\"dui-menu-submenu-content-non-selectable\"] [data-dui-1-28-2~=\"dui-menu-item-selected\"]:before{display:none}[data-dui-1-28-2~=\"dui-menu-submenu-content-with-icon\"] [data-dui-1-28-2~=\"dui-menu-item\"],[data-dui-1-28-2~=\"dui-menu-with-icon\"] [data-dui-1-28-2~=\"dui-menu-item\"]{height:12px}[data-dui-1-28-2~=\"dui-menu\"]>[data-dui-1-28-2~=\"dui-tooltip-wrapper\"]{display:block}");
	Menu.Item = Item$1;
	Menu.SubMenu = SubMenu;
	Menu.ContextMenu = ContextMenu;
	Menu.Input = MenuInput;
	Menu_default = Menu;
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/components/Switch/Switch.js
var import_react$47, Switch;
var init_Switch$1 = __esmMin((() => {
	init_createElement();
	init_tslib_es6();
	import_react$47 = /* @__PURE__ */ __toESM(require_react());
	init_helper();
	init_theme();
	init_stylusAdapter();
	Switch = function(_super) {
		__extends(Switch, _super);
		function Switch() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.state = { currentChecked: _this.props.defaultChecked };
			_this.handleClick = function() {
				var _a = _this.props, disabled = _a.disabled, onChange = _a.onChange, loading = _a.loading;
				if (disabled || loading) return;
				var next = !_this.isChecked();
				onChange(next);
				_this.setState({ currentChecked: next });
			};
			_this.themedRender = function(classNames) {
				var _a;
				var _b = _this.props, prefixCls = _b.prefixCls, className = _b.className, style = _b.style, disabled = _b.disabled, loading = _b.loading, size = _b.size;
				var cls = classNames(prefixCls, prefixCls + "-size-" + size, className, (_a = {}, _a[prefixCls + "-checked"] = _this.isChecked(), _a[prefixCls + "-disabled"] = disabled, _a[prefixCls + "-loading"] = loading, _a));
				return h$5(WithStylusClick, { clickHandler: _this.handleClick }, h$5("button", {
					className: cls,
					style,
					role: "switch",
					"aria-checked": _this.isChecked(),
					"aria-disabled": disabled,
					"aria-busy": loading,
					tabIndex: disabled ? -1 : void 0
				}));
			};
			return _this;
		}
		Switch.prototype.isChecked = function() {
			var forceChecked = this.props.checked;
			var stateChecked = this.state.currentChecked;
			if (typeof forceChecked === "boolean") return forceChecked;
			return stateChecked;
		};
		Switch.prototype.render = function() {
			return consumeTheme(this.themedRender);
		};
		return Switch;
	}(import_react$47.Component);
	Switch.defaultProps = {
		prefixCls: "dui-switch",
		defaultChecked: false,
		disabled: false,
		onChange: emptyFn,
		size: "default"
	};
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/components/Switch/index.js
var Switch_default;
var init_Switch = __esmMin((() => {
	init_style();
	init_Switch$1();
	injectStyle("components/Switch/style/index.css", "@-webkit-keyframes dui-switch-glow{0%{opacity:.3}to{opacity:1}}@keyframes dui-switch-glow{0%{opacity:.3}to{opacity:1}}[data-dui-1-28-2~=\"dui-switch\"]{display:inline-block;outline:none;border:1px solid transparent;position:relative;-webkit-transition:all .2s ease-out;transition:all .2s ease-out;background:var(--icon-weak,rgba(0,0,0,.26));-webkit-tap-highlight-color:transparent}[data-dui-1-28-2~=\"dui-switch-size-default\"]{border-radius:8px;width:32px;height:16px;padding:1px}[data-dui-1-28-2~=\"dui-switch-size-default\"]:after{width:12px;height:12px;border-radius:6px;left:1px;top:1px}[data-dui-1-28-2~=\"dui-switch-size-small\"]{border-radius:6px;width:24px;height:12px;padding:0}[data-dui-1-28-2~=\"dui-switch-size-small\"]:after{width:10px;height:10px;border-radius:5px;left:0;top:0}[data-dui-1-28-2~=\"dui-switch\"]:after{content:\" \";background:var(--icon-white,#fff);display:inline-block;position:absolute;-webkit-transition:all .2s ease-out;transition:all .2s ease-out}[data-dui-1-28-2~=\"dui-switch\"]:active:not([data-dui-1-28-2~=\"dui-switch-disabled\"]):not([data-dui-1-28-2~=\"dui-switch-loading\"]):after{-webkit-transform:translateX(4px);transform:translateX(4px)}[data-dui-1-28-2~=\"dui-switch-checked\"]{background:var(--accent-default,#1e6fff)}[data-dui-1-28-2~=\"dui-switch-checked\"][data-dui-1-28-2~=\"dui-switch-size-default\"]:after{-webkit-transform:translateX(16px);transform:translateX(16px)}[data-dui-1-28-2~=\"dui-switch-checked\"][data-dui-1-28-2~=\"dui-switch-size-default\"]:active:not([data-dui-1-28-2~=\"dui-switch-disabled\"]):not([data-dui-1-28-2~=\"dui-switch-loading\"]):after,[data-dui-1-28-2~=\"dui-switch-checked\"][data-dui-1-28-2~=\"dui-switch-size-small\"]:after{-webkit-transform:translateX(12px);transform:translateX(12px)}[data-dui-1-28-2~=\"dui-switch-checked\"][data-dui-1-28-2~=\"dui-switch-size-small\"]:active:not([data-dui-1-28-2~=\"dui-switch-disabled\"]):not([data-dui-1-28-2~=\"dui-switch-loading\"]):after{-webkit-transform:translateX(8px);transform:translateX(8px)}[data-dui-1-28-2~=\"dui-switch-disabled\"]{background:var(--tsp-fill-strong,rgba(61,82,102,.12))}[data-dui-1-28-2~=\"dui-switch-disabled\"][data-dui-1-28-2~=\"dui-switch-checked\"]{background:var(--accent-disabled,#c2d8ff)}[data-dui-1-28-2~=\"dui-switch\"]:not([data-dui-1-28-2~=\"dui-switch-disabled\"]):hover{background:#c1c5cb}[data-dui-1-28-2~=\"dui-switch-checked\"]:not([data-dui-1-28-2~=\"dui-switch-disabled\"]):hover{background:var(--accent-hover,#175ceb)}[data-dui-1-28-2~=\"dui-switch-loading\"]:after{-webkit-animation:dui-switch-glow .5s linear .2s infinite alternate;animation:dui-switch-glow .5s linear .2s infinite alternate}");
	Switch_default = Switch;
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/components/Divider/Divider.js
var import_react$46, import_prop_types$4, Divider;
var init_Divider$1 = __esmMin((() => {
	init_createElement();
	init_tslib_es6();
	import_react$46 = /* @__PURE__ */ __toESM(require_react());
	import_prop_types$4 = /* @__PURE__ */ __toESM(require_prop_types());
	init_context$1();
	init_theme();
	Divider = function(_super) {
		__extends(Divider, _super);
		function Divider() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.themedRender = function(classNames) {
				var _a = _this.props, prefixCls = _a.prefixCls, className = _a.className, style = _a.style, dashed = _a.dashed, children = _a.children, orientation = _a.orientation, textPosition = _a.textPosition, textStyle = _a.textStyle, textClassName = _a.textClassName;
				var containsText = children && orientation === "horizontal";
				return h$5(SubMenuContext.Consumer, null, function(_a) {
					var _b, _c;
					var isCompact = _a.type !== "with-icon";
					var cls = classNames(prefixCls, className, prefixCls + "-" + orientation + (dashed ? "-dashed" : ""), (_b = {}, _b[prefixCls + "-with-text"] = containsText, _b[prefixCls + "-compact"] = isCompact, _b));
					var textCls = classNames(prefixCls + "-text", textClassName, prefixCls + "-text-" + textPosition, (_c = {}, _c[prefixCls + "-text-compact"] = isCompact, _c));
					return h$5("div", {
						className: cls,
						style
					}, containsText ? h$5("span", {
						className: textCls,
						style: textStyle
					}, children) : null);
				});
			};
			return _this;
		}
		Divider.prototype.render = function() {
			return consumeTheme(this.themedRender);
		};
		return Divider;
	}(import_react$46.Component);
	Divider.defaultProps = {
		prefixCls: "dui-divider",
		dashed: false,
		orientation: "horizontal",
		textPosition: "center"
	};
	Divider.propTypes = {
		prefixCls: import_prop_types$4.string,
		style: import_prop_types$4.object,
		className: import_prop_types$4.string,
		dashed: import_prop_types$4.bool,
		orientation: import_prop_types$4.string,
		textPosition: import_prop_types$4.string,
		textStyle: import_prop_types$4.object,
		textClassName: import_prop_types$4.string
	};
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/components/Divider/index.js
var Divider_default;
var init_Divider = __esmMin((() => {
	init_style();
	init_Divider$1();
	injectStyle("components/Divider/style/index.css", "[data-dui-1-28-2~=\"dui-divider\"]{border:1px solid var(--border-weak,rgba(0,0,0,.04));position:relative;pointer-events:none}[data-dui-1-28-2~=\"dui-divider-horizontal\"],[data-dui-1-28-2~=\"dui-divider-horizontal-dashed\"]{display:block;width:100%;border-top:none;border-left:none;border-right:none;margin:8px 0}[data-dui-1-28-2~=\"dui-divider-horizontal-dashed\"]{border-bottom-style:dashed}[data-dui-1-28-2~=\"dui-divider-compact\"][data-dui-1-28-2~=\"dui-divider-horizontal\"]{margin:4px 0}[data-dui-1-28-2~=\"dui-divider-vertical\"],[data-dui-1-28-2~=\"dui-divider-vertical-dashed\"]{display:inline-block;border-left:none;border-top:none;border-bottom:none;margin:0 12px;height:1em}[data-dui-1-28-2~=\"dui-divider-vertical-dashed\"]{border-right-style:dashed}[data-dui-1-28-2~=\"dui-divider-compact\"][data-dui-1-28-2~=\"dui-divider-vertical\"]{margin:0 6px}[data-dui-1-28-2~=\"dui-divider-with-text\"]{margin:15px 0}[data-dui-1-28-2~=\"dui-divider-compact\"][data-dui-1-28-2~=\"dui-divider-with-text\"]{margin:10px 0}[data-dui-1-28-2~=\"dui-divider-text\"]{position:absolute;background:#fff;font-size:14px;color:#d0d0d0;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);padding:0 6px}[data-dui-1-28-2~=\"dui-divider-text-compact\"]{font-size:12px}[data-dui-1-28-2~=\"dui-divider-text-center\"]{left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}[data-dui-1-28-2~=\"dui-divider-text-left\"]{left:24px}[data-dui-1-28-2~=\"dui-divider-text-right\"]{right:24px}");
	Divider_default = Divider;
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/utils/instanceId.js
function createGlobalInstanceId(type) {
	counterMap[type] = counterMap[type] || 0;
	counterMap[type]++;
	return "dui" + type + "Id-" + counterMap[type];
}
var globalObj, counterMap;
var init_instanceId = __esmMin((() => {
	init_helper();
	globalObj = isBrowser ? window : globalThis;
	globalObj.__dui_instance_counter__ = globalObj.__dui_instance_counter__ || {};
	counterMap = globalObj.__dui_instance_counter__;
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/components/Tabs/context.js
var import_react$45, ActiveTabIdContext;
var init_context = __esmMin((() => {
	import_react$45 = /* @__PURE__ */ __toESM(require_react());
	ActiveTabIdContext = import_react$45.createContext("");
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/components/Tabs/TabPane.js
var import_react$44, TabPane;
var init_TabPane = __esmMin((() => {
	init_createElement();
	init_tslib_es6();
	import_react$44 = /* @__PURE__ */ __toESM(require_react());
	init_context();
	init_theme();
	TabPane = function(_super) {
		__extends(TabPane, _super);
		function TabPane() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.themedRender = function(classNames) {
				var _a;
				var _b = _this.props, prefixCls = _b.prefixCls, className = _b.className, style = _b.style, children = _b.children, forceRender = _b.forceRender, id = _b.id;
				var isActive = _this.context === id;
				var shouldRender = isActive || forceRender;
				return h$5("div", {
					className: classNames(prefixCls, className, prefixCls + "-" + (isActive ? "active" : "hidden"), (_a = {}, _a[prefixCls + "-keep"] = forceRender, _a)),
					style,
					role: "tabpanel"
				}, shouldRender ? children : null);
			};
			return _this;
		}
		TabPane.prototype.render = function() {
			return consumeTheme(this.themedRender);
		};
		TabPane.contextType = ActiveTabIdContext;
		return TabPane;
	}(import_react$44.Component);
	TabPane.defaultProps = {
		prefixCls: "dui-tabpane",
		forceRender: false
	};
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/utils/containerScroll.js
function scrollIntoParentViewHorizontal(child) {
	var scrollParent = child.parentElement;
	var scrollLeft = scrollParent.scrollLeft, parentWidth = scrollParent.offsetWidth;
	var childLeft = child.offsetLeft, childWidth = child.offsetWidth;
	var nextSrollLeft = scrollLeft;
	if (childLeft + childWidth > scrollLeft + parentWidth) nextSrollLeft = childLeft + childWidth - parentWidth;
	if (childLeft < scrollLeft) nextSrollLeft = childLeft;
	if (nextSrollLeft !== scrollLeft) horizontalScrollElementWithAnimation(scrollParent, scrollLeft, nextSrollLeft);
	return nextSrollLeft;
}
function horizontalScrollContainerBy(container, deltaX) {
	var scrollLeft = container.scrollLeft, scrollWidth = container.scrollWidth, offsetWidth = container.offsetWidth;
	horizontalScrollElementWithAnimation(container, scrollLeft, castInto(scrollLeft + deltaX, [0, scrollWidth - offsetWidth]));
}
function horizontalScrollElementWithAnimation(element, fromScrollLeft, toScrollLeft) {
	if (Math.abs(fromScrollLeft - toScrollLeft) < 1) return;
	requestAnimationFrame(function() {
		var nextScrollLeft = fromScrollLeft + (toScrollLeft - fromScrollLeft) / 3;
		var nextScrollLeftFixed = toScrollLeft > fromScrollLeft ? Math.ceil(nextScrollLeft) : Math.floor(nextScrollLeft);
		element.scrollLeft = nextScrollLeftFixed;
		horizontalScrollElementWithAnimation(element, nextScrollLeftFixed, toScrollLeft);
	});
}
var init_containerScroll = __esmMin((() => {
	init_helper();
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/components/Tabs/Tabs.js
var import_react$43, import_debounce, TabPaneElementType, indicatorWidthMap, Tabs;
var init_Tabs$1 = __esmMin((() => {
	init_createElement();
	init_tslib_es6();
	import_react$43 = /* @__PURE__ */ __toESM(require_react());
	init_TabPane();
	init_helper();
	init_context();
	init_theme();
	init_containerScroll();
	import_debounce = /* @__PURE__ */ __toESM(require_debounce());
	TabPaneElementType = h$5(TabPane, null).type;
	indicatorWidthMap = {
		small: 24,
		medium: 28,
		large: 32
	};
	Tabs = function(_super) {
		__extends(Tabs, _super);
		function Tabs() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.state = { currentActiveId: _this.props.defaultActiveId };
			_this.activeTabItemRef = import_react$43.createRef();
			_this.indicatorRef = import_react$43.createRef();
			_this.containerRef = import_react$43.createRef();
			_this.tabBarRef = import_react$43.createRef();
			_this.allItemIds = [];
			_this.selectTabBarItem = function(id) {
				if (id === _this.getActiveId()) return;
				_this.setState({ currentActiveId: id });
				_this.props.onChange(id);
			};
			_this.handleKeyDown = function(e) {
				if (!["ArrowLeft", "ArrowRight"].includes(e.key)) return;
				e.preventDefault();
				var currentActiveIndex = _this.allItemIds.indexOf(_this.getActiveId());
				if (currentActiveIndex < 0) return;
				var nextActiveIndex = castInto(currentActiveIndex + (e.key === "ArrowRight" ? 1 : -1), [0, _this.allItemIds.length - 1]);
				if (nextActiveIndex === currentActiveIndex) return;
				var nextId = _this.allItemIds[nextActiveIndex];
				_this.selectTabBarItem(nextId);
				setTimeout(function() {
					var _a;
					(_a = _this.activeTabItemRef.current) === null || _a === void 0 || _a.focus();
				}, 0);
			};
			_this.restoreTransitionLater = (0, import_debounce.default)(function() {
				setTimeout(function() {
					var indicatorDom = _this.indicatorRef.current;
					indicatorDom === null || indicatorDom === void 0 || indicatorDom.style.removeProperty("transition");
				}, 0);
			});
			_this.handleTabBarScroll = function() {
				_this.updateIndicator({
					skipAnimation: true,
					scrollItemIntoView: false
				});
				_this.debouncedRerender();
			};
			_this.handleResize = function() {
				_this.updateIndicator({ skipAnimation: true });
			};
			_this.handleScrollLeft = function() {
				horizontalScrollContainerBy(_this.tabBarRef.current, -_this.props.scrollDistance);
			};
			_this.handleScrollRight = function() {
				horizontalScrollContainerBy(_this.tabBarRef.current, _this.props.scrollDistance);
			};
			_this.debouncedRerender = (0, import_debounce.default)(function() {
				_this.forceUpdate();
			}, 50);
			_this.themedRender = function(classNames) {
				var _a = _this.props, prefixCls = _a.prefixCls, className = _a.className, style = _a.style, children = _a.children, contentStyle = _a.contentStyle, contentClassName = _a.contentClassName, tabBarContainerClassName = _a.tabBarContainerClassName, tabBarContainerStyle = _a.tabBarContainerStyle, onClickTabBarContainer = _a.onClickTabBarContainer, tabBar = _a.tabBar;
				var activeId = _this.getActiveId();
				var cls = classNames(prefixCls, className);
				var tabBarContainerCls = classNames(prefixCls + "-bar-container", tabBarContainerClassName);
				var contentCls = classNames(prefixCls + "-content", contentClassName);
				return h$5("div", {
					className: cls,
					style
				}, h$5("div", {
					className: tabBarContainerCls,
					style: tabBarContainerStyle,
					onClick: onClickTabBarContainer
				}, tabBar ? tabBar : _this.renderTabBar(classNames)), h$5("div", {
					className: contentCls,
					style: contentStyle,
					ref: _this.containerRef
				}, h$5(ActiveTabIdContext.Provider, { value: activeId }, children)));
			};
			return _this;
		}
		Tabs.prototype.getActiveId = function() {
			var forceActiveId = this.props.activeId;
			var stateActiveId = this.state.currentActiveId;
			return forceActiveId || stateActiveId;
		};
		Tabs.prototype.updateIndicator = function(params) {
			if (params === void 0) params = {};
			var _a = params.skipAnimation, skipAnimation = _a === void 0 ? false : _a, _b = params.scrollItemIntoView, scrollItemIntoView = _b === void 0 ? true : _b;
			var activeItemDom = this.activeTabItemRef.current;
			var indicatorDom = this.indicatorRef.current;
			var tabBarDom = this.tabBarRef.current;
			if (!activeItemDom || !indicatorDom || !tabBarDom) return;
			var targetLeft = activeItemDom.offsetLeft, targetWidth = activeItemDom.offsetWidth;
			var scrollLeft = scrollItemIntoView ? scrollIntoParentViewHorizontal(activeItemDom) : tabBarDom.scrollLeft;
			var indicatorFixedWidth = this.getIndicatorFixedWidth();
			var width = typeof indicatorFixedWidth === "number" ? indicatorFixedWidth : targetWidth;
			indicatorDom.style.transform = "translateX(" + (targetLeft - scrollLeft + (targetWidth - width) / 2) + "px)";
			indicatorDom.style.width = width + "px";
			if (skipAnimation) {
				indicatorDom.style.transition = "none";
				this.restoreTransitionLater();
			}
		};
		Tabs.prototype.getIndicatorFixedWidth = function() {
			var indicatorWidth = this.props.indicatorWidth;
			if (typeof indicatorWidth === "number") return indicatorWidth;
			if (typeof indicatorWidth === "string") return indicatorWidthMap[indicatorWidth];
			return null;
		};
		Tabs.prototype.componentDidUpdate = function() {
			this.updateIndicator({ scrollItemIntoView: false });
		};
		Tabs.prototype.componentDidMount = function() {
			this.updateIndicator({ skipAnimation: true });
			window.addEventListener("resize", this.handleResize);
			this.forceUpdate();
		};
		Tabs.prototype.componentWillUnmount = function() {
			window.removeEventListener("resize", this.handleResize);
		};
		Tabs.prototype.render = function() {
			return consumeTheme(this.themedRender);
		};
		Tabs.prototype.renderTabBarContent = function(classNames) {
			var _this = this;
			var _a = this.props, prefixCls = _a.prefixCls, children = _a.children, tabBarItemStyle = _a.tabBarItemStyle, activeItemStyle = _a.activeItemStyle, activeItemClassName = _a.activeItemClassName, tabBarItemClassName = _a.tabBarItemClassName, trigger = _a.trigger, tabBarSize = _a.tabBarSize;
			var activeId = this.getActiveId();
			this.allItemIds = [];
			return import_react$43.Children.map(children, function(child) {
				var _a, _b;
				if (child.type !== TabPaneElementType) return null;
				var _c = child.props, id = _c.id, tab = _c.tab, icon = _c.icon, activeIcon = _c.activeIcon;
				var isActive = id === activeId;
				var tabBarItemCls = classNames(prefixCls + "-bar-item", prefixCls + "-bar-item-" + tabBarSize, tabBarItemClassName, isActive && activeItemClassName, (_a = {}, _a[prefixCls + "-bar-item-active"] = isActive, _a));
				var itemStyle = __assign(__assign({}, tabBarItemStyle), isActive ? activeItemStyle : null);
				var effectiveIcon = isActive ? activeIcon || icon : icon;
				_this.allItemIds.push(id);
				return h$5("li", __assign({
					className: tabBarItemCls,
					style: itemStyle,
					key: id,
					ref: isActive ? _this.activeTabItemRef : function() {
						return null;
					},
					"aria-selected": isActive,
					role: "tab",
					tabIndex: isActive ? 0 : -1
				}, (_b = {}, _b[trigger === "click" ? "onClick" : "onMouseEnter"] = function() {
					return _this.selectTabBarItem(id);
				}, _b)), effectiveIcon ? typeof effectiveIcon === "string" ? h$5("span", {
					className: classNames(prefixCls + "-icon"),
					style: { backgroundImage: "url(\"" + effectiveIcon + "\")" }
				}) : effectiveIcon : null, tab);
			});
		};
		Tabs.prototype.renderScrollButtons = function(classNames) {
			var _a, _b;
			var prefixCls = this.props.prefixCls;
			var tabBarDom = this.tabBarRef.current;
			if (!tabBarDom) return null;
			var scrollWidth = tabBarDom.scrollWidth, offsetWidth = tabBarDom.offsetWidth, scrollLeft = tabBarDom.scrollLeft;
			if (Math.abs(scrollWidth - offsetWidth) < 1) return null;
			var canScrollLeft = scrollLeft >= 1;
			var canScrollRight = offsetWidth + scrollLeft <= scrollWidth - 1;
			var leftButtonCls = classNames(prefixCls + "-scroll-btn", prefixCls + "-scroll-btn-left", (_a = {}, _a[prefixCls + "-scroll-btn-visible"] = canScrollLeft, _a));
			var rightButtonCls = classNames(prefixCls + "-scroll-btn", prefixCls + "-scroll-btn-right", (_b = {}, _b[prefixCls + "-scroll-btn-visible"] = canScrollRight, _b));
			return h$5(import_react$43.Fragment, null, h$5("div", {
				className: leftButtonCls,
				onClick: this.handleScrollLeft
			}), h$5("div", {
				className: rightButtonCls,
				onClick: this.handleScrollRight
			}));
		};
		Tabs.prototype.renderTabBar = function(classNames) {
			var _a = this.props, prefixCls = _a.prefixCls, tabBarStyle = _a.tabBarStyle, indicatorStyle = _a.indicatorStyle, alignment = _a.alignment, indicatorClassName = _a.indicatorClassName, tabBarClassName = _a.tabBarClassName, tabBarAdditionalContent = _a.tabBarAdditionalContent, tabBarSize = _a.tabBarSize;
			var tabBarCls = classNames(prefixCls + "-bar", tabBarClassName, prefixCls + "-bar-" + alignment, prefixCls + "-bar-" + tabBarSize);
			var indicatorCls = classNames(prefixCls + "-indicator", indicatorClassName);
			return h$5(import_react$43.Fragment, null, h$5("ul", {
				className: tabBarCls,
				style: tabBarStyle,
				role: "tablist",
				onKeyDown: this.handleKeyDown,
				ref: this.tabBarRef,
				onScroll: this.handleTabBarScroll
			}, this.renderTabBarContent(classNames)), h$5("div", {
				className: indicatorCls,
				style: indicatorStyle,
				ref: this.indicatorRef
			}), this.renderScrollButtons(classNames), tabBarAdditionalContent);
		};
		return Tabs;
	}(import_react$43.Component);
	Tabs.defaultProps = {
		prefixCls: "dui-tabs",
		onChange: emptyFn,
		defaultActiveId: "",
		alignment: "center",
		trigger: "click",
		tabBarSize: "medium",
		scrollDistance: 100
	};
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/components/Tabs/index.js
var Tabs_default;
var init_Tabs = __esmMin((() => {
	init_style();
	init_Tabs$1();
	init_TabPane();
	injectStyle("components/Tabs/style/index.css", "[data-dui-1-28-2~=\"dui-tabs\"]{background:var(--bg-lv3-default,#fff)}[data-dui-1-28-2~=\"dui-tabs-bar-container\"]{position:relative;overflow:hidden}[data-dui-1-28-2~=\"dui-tabs-bar\"]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-flow:row nowrap;-ms-flex-flow:row nowrap;flex-flow:row nowrap;list-style:none;-webkit-box-sizing:border-box;box-sizing:border-box;margin:0;padding:0 16px;overflow:auto;-webkit-tap-highlight-color:transparent;-ms-overflow-style:none;scrollbar-width:none}[data-dui-1-28-2~=\"dui-tabs-bar\"]::-webkit-scrollbar{display:none}[data-dui-1-28-2~=\"dui-tabs-bar-center\"]{-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}[data-dui-1-28-2~=\"dui-tabs-bar-left\"]{-webkit-box-pack:start;-webkit-justify-content:flex-start;-ms-flex-pack:start;justify-content:flex-start}[data-dui-1-28-2~=\"dui-tabs-bar-right\"]{-webkit-box-pack:end;-webkit-justify-content:flex-end;-ms-flex-pack:end;justify-content:flex-end}[data-dui-1-28-2~=\"dui-tabs-bar-small\"]{height:36px;font-size:12px}[data-dui-1-28-2~=\"dui-tabs-bar-medium\"]{height:40px;font-size:14px}[data-dui-1-28-2~=\"dui-tabs-bar-large\"]{height:48px;font-size:16px}[data-dui-1-28-2~=\"dui-tabs-bar-item\"]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-flow:row nowrap;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;color:var(--text-strong,rgba(0,0,0,.76));-webkit-box-sizing:border-box;box-sizing:border-box;height:100%;cursor:pointer;position:relative;white-space:nowrap}[data-dui-1-28-2~=\"dui-tabs-bar-item-small\"]:not(:last-of-type){margin-right:24px}[data-dui-1-28-2~=\"dui-tabs-bar-item-large\"]:not(:last-of-type),[data-dui-1-28-2~=\"dui-tabs-bar-item-medium\"]:not(:last-of-type){margin-right:40px}[data-dui-1-28-2~=\"dui-tabs-bar-item-active\"]{color:var(--text-ultrastrong,rgba(0,0,0,.9));font-weight:600}[data-dui-1-28-2~=\"dui-tabs-indicator\"]{position:absolute;bottom:0;left:0;width:0;background:var(--text-ultrastrong,rgba(0,0,0,.9));height:3px;-webkit-transition-duration:.3s;transition-duration:.3s;-webkit-transition-timing-function:cubic-bezier(.4,0,.2,1);transition-timing-function:cubic-bezier(.4,0,.2,1);-webkit-transition-property:width,-webkit-transform;transition-property:width,-webkit-transform;transition-property:transform,width;transition-property:transform,width,-webkit-transform}[data-dui-1-28-2~=\"dui-tabs-icon\"]{display:inline-block;width:16px;height:16px;background-size:contain;background-repeat:no-repeat;background-position:50%;margin-right:4px}[data-dui-1-28-2~=\"dui-tabs-content\"]{position:relative}[data-dui-1-28-2~=\"dui-tabs-scroll-btn\"]{position:absolute;width:24px;height:100%;top:0;background-position:50%;background-size:16px;background-repeat:no-repeat;background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Cpath fill-rule='evenodd' d='M6 3.833L10.286 8 6 12.167l.857.833 4.774-4.642a.5.5 0 000-.717L6.857 3 6 3.833z' fill='%2381868f'/%3E%3C/svg%3E\");background-color:var(--bg-lv1-default,#fff);-webkit-box-shadow:0 0 8px var(--border-medium,rgba(0,0,0,.08));box-shadow:0 0 8px var(--border-medium,rgba(0,0,0,.08));visibility:hidden;opacity:0;-webkit-transition-property:visibility,opacity;transition-property:visibility,opacity;-webkit-transition-duration:.3s;transition-duration:.3s}[data-dui-1-28-2~=\"dui-tabs-scroll-btn\"]:hover{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Cpath fill-rule='evenodd' d='M6 3.833L10.286 8 6 12.167l.857.833 4.774-4.642a.5.5 0 000-.717L6.857 3 6 3.833z' fill='%23454D5A'/%3E%3C/svg%3E\");cursor:pointer}[data-dui-1-28-2~=\"dui-tabs-scroll-btn-visible\"]{visibility:visible;opacity:1}[data-dui-1-28-2~=\"dui-tabs-scroll-btn-left\"]{left:0;-webkit-transform:rotate(180deg);transform:rotate(180deg)}[data-dui-1-28-2~=\"dui-tabs-scroll-btn-right\"]{right:0}[data-dui-1-28-2~=\"dui-tabpane-hidden\"]{display:none}[data-dui-1-28-2~=\"dui-tabpane-hidden\"][data-dui-1-28-2~=\"dui-tabpane-keep\"]{display:block;position:absolute;visibility:hidden}[data-dui-1-28-2~=\"dui-tabpane-active\"]{display:block}");
	Tabs.TabPane = TabPane;
	Tabs_default = Tabs;
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/components/Checkbox/Checkbox.js
var import_react$42, Checkbox;
var init_Checkbox$1 = __esmMin((() => {
	init_createElement();
	init_tslib_es6();
	import_react$42 = /* @__PURE__ */ __toESM(require_react());
	init_helper();
	init_theme();
	init_instanceId();
	Checkbox = function(_super) {
		__extends(Checkbox, _super);
		function Checkbox() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.id = createGlobalInstanceId("Checkbox");
			_this.state = { checked: Boolean(_this.props.defaultChecked) };
			_this.handleChange = function(e) {
				var props = _this.props;
				if (props.disabled) return;
				if (!("checked" in props)) _this.setState({ checked: e.target.checked });
				props.onChange(e.target.checked, {
					target: __assign(__assign({}, props), { checked: e.target.checked }),
					stopPropagation: e.stopPropagation.bind(e),
					preventDefault: e.preventDefault.bind(e),
					nativeEvent: e.nativeEvent
				});
			};
			_this.themedRender = function(classNames) {
				var _a, _b;
				var _c = _this.props, prefixCls = _c.prefixCls, className = _c.className, style = _c.style, children = _c.children, disabled = _c.disabled, hollow = _c.hollow, labelClickable = _c.labelClickable, shape = _c.shape, iconClassName = _c.iconClassName, labelClassName = _c.labelClassName, iconStyle = _c.iconStyle, labelStyle = _c.labelStyle, fillType = _c.fillType, rest = __rest(_c, [
					"prefixCls",
					"className",
					"style",
					"children",
					"disabled",
					"hollow",
					"labelClickable",
					"shape",
					"iconClassName",
					"labelClassName",
					"iconStyle",
					"labelStyle",
					"fillType"
				]);
				var checked = "checked" in _this.props ? _this.props.checked : _this.state.checked;
				var cls = classNames(prefixCls, className, prefixCls + "-" + (hollow ? "hollow" : "normal"), prefixCls + "-" + fillType, (_a = {}, _a[prefixCls + "-multi-line"] = import_react$42.Children.count(children) > 1, _a[prefixCls + "-checked"] = checked, _a[prefixCls + "-disabled"] = disabled, _a));
				var inputCls = classNames(prefixCls + "-input", (_b = {}, _b[prefixCls + "-input-full"] = labelClickable, _b));
				var iconCls = classNames(prefixCls + "-icon", prefixCls + "-icon-" + shape, iconClassName);
				var labelCls = classNames(prefixCls + "-label", labelClassName);
				var ariaLabel = _this.id;
				return h$5("div", {
					className: cls,
					style
				}, h$5("input", __assign({}, rest, {
					type: "checkbox",
					className: inputCls,
					onChange: _this.handleChange,
					disabled,
					"aria-labelledby": ariaLabel
				})), h$5("span", {
					className: iconCls,
					style: iconStyle,
					"aria-hidden": true
				}), h$5("div", {
					className: labelCls,
					style: labelStyle,
					id: ariaLabel
				}, children));
			};
			return _this;
		}
		Checkbox.prototype.render = function() {
			return consumeTheme(this.themedRender);
		};
		return Checkbox;
	}(import_react$42.Component);
	Checkbox.defaultProps = {
		prefixCls: "dui-checkbox",
		onChange: emptyFn,
		disabled: false,
		hollow: false,
		labelClickable: true,
		shape: "square",
		fillType: "tick"
	};
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/components/Checkbox/Group.js
var import_react$41, import_prop_types$3, Group;
var init_Group = __esmMin((() => {
	init_createElement();
	init_tslib_es6();
	import_react$41 = /* @__PURE__ */ __toESM(require_react());
	import_prop_types$3 = /* @__PURE__ */ __toESM(require_prop_types());
	init_util$1();
	init_helper();
	init_Checkbox$1();
	init_theme();
	Group = function(_super) {
		__extends(Group, _super);
		function Group() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.state = { values: _this.props.defaultValues || [] };
			_this.handleSingleChange = function(checked, e) {
				if (_this.props.disabled) return;
				var checkedValues = _this.state.values;
				var newValues = [];
				if (checkedValues.indexOf(e.target.value) >= 0 && !checked) {
					newValues = checkedValues.filter(function(v) {
						return v !== e.target.value;
					});
					_this.setState({ values: newValues });
					_this.props.onChange(newValues, e);
				} else if (checkedValues.indexOf(e.target.value) === -1 && checked) {
					newValues = checkedValues.concat(e.target.value);
					_this.setState({ values: newValues });
					_this.props.onChange(newValues, e);
				}
			};
			_this.themedRender = function(classNames) {
				var _a = _this.props, prefixCls = _a.prefixCls, className = _a.className, style = _a.style, itemStyle = _a.itemStyle;
				return h$5("div", {
					className: classNames(prefixCls, className),
					style
				}, renderChildren(_this.props, _this.state.values, _this.handleSingleChange, Checkbox, itemStyle));
			};
			return _this;
		}
		Group.getDerivedStateFromProps = function(props, state) {
			if ("values" in props) return { values: props.values };
			return null;
		};
		Group.prototype.render = function() {
			return consumeTheme(this.themedRender);
		};
		return Group;
	}(import_react$41.Component);
	Group.defaultProps = {
		prefixCls: "dui-checkbox-group",
		disabled: false,
		onChange: emptyFn
	};
	Group.propTypes = {
		prefixCls: import_prop_types$3.string,
		style: import_prop_types$3.object,
		className: import_prop_types$3.string,
		options: import_prop_types$3.array,
		disabled: import_prop_types$3.bool,
		values: import_prop_types$3.array,
		children: import_prop_types$3.node,
		defaultValues: import_prop_types$3.array,
		onChange: import_prop_types$3.func,
		itemStyle: import_prop_types$3.object
	};
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/components/Checkbox/index.js
var Checkbox_default;
var init_Checkbox = __esmMin((() => {
	init_style();
	init_Checkbox$1();
	init_Group();
	injectStyle("components/Checkbox/style/index.css", "[data-dui-1-28-2~=\"dui-checkbox\"]{position:relative;padding-left:24px;font-size:14px;line-height:20px;color:var(--text-ultrastrong,rgba(0,0,0,.9));-webkit-tap-highlight-color:transparent}[data-dui-1-28-2~=\"dui-checkbox-disabled\"]{pointer-events:none}[data-dui-1-28-2~=\"dui-checkbox-multi-line\"]{padding-left:24px}[data-dui-1-28-2~=\"dui-checkbox-icon\"]{position:absolute;z-index:1;left:0;top:2px;width:16px;height:16px;border:1px solid var(--border-ultrastrong,rgba(0,0,0,.16));-webkit-box-sizing:border-box;box-sizing:border-box;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}[data-dui-1-28-2~=\"dui-checkbox-icon-square\"]{border-radius:2px}[data-dui-1-28-2~=\"dui-checkbox-icon-circle\"]{border-radius:50%}[data-dui-1-28-2~=\"dui-checkbox-normal\"]:hover [data-dui-1-28-2~=\"dui-checkbox-icon\"]{background-color:var(--feedback-hover,rgba(51,77,102,.06))}[data-dui-1-28-2~=\"dui-checkbox-normal\"]:active [data-dui-1-28-2~=\"dui-checkbox-icon\"]{background-color:var(--feedback-active,rgba(51,77,102,.08))}[data-dui-1-28-2~=\"dui-checkbox-hollow\"]:hover [data-dui-1-28-2~=\"dui-checkbox-icon\"]{border-color:var(--accent-default,#1e6fff)}[data-dui-1-28-2~=\"dui-checkbox-normal\"][data-dui-1-28-2~=\"dui-checkbox-checked\"] [data-dui-1-28-2~=\"dui-checkbox-icon\"]{background-color:var(--accent-default,#1e6fff);border-color:transparent}[data-dui-1-28-2~=\"dui-checkbox-normal\"][data-dui-1-28-2~=\"dui-checkbox-checked\"]:hover [data-dui-1-28-2~=\"dui-checkbox-icon\"]{background-color:var(--accent-hover,#175ceb)}[data-dui-1-28-2~=\"dui-checkbox-normal\"][data-dui-1-28-2~=\"dui-checkbox-checked\"]:active [data-dui-1-28-2~=\"dui-checkbox-icon\"]{background-color:var(--accent-pressed,#134ae0)}[data-dui-1-28-2~=\"dui-checkbox-hollow\"][data-dui-1-28-2~=\"dui-checkbox-checked\"] [data-dui-1-28-2~=\"dui-checkbox-icon\"]{background-color:#fff;border-color:var(--accent-default,#1e6fff)}[data-dui-1-28-2~=\"dui-checkbox-checked\"] [data-dui-1-28-2~=\"dui-checkbox-icon\"]:after{content:\"\";display:block}[data-dui-1-28-2~=\"dui-checkbox-tick\"] [data-dui-1-28-2~=\"dui-checkbox-icon\"]:after{width:100%;height:100%;background-position:50%;background-repeat:no-repeat}[data-dui-1-28-2~=\"dui-checkbox-dash\"] [data-dui-1-28-2~=\"dui-checkbox-icon\"]:after{width:8px;height:2px}[data-dui-1-28-2~=\"dui-checkbox-normal\"][data-dui-1-28-2~=\"dui-checkbox-tick\"] [data-dui-1-28-2~=\"dui-checkbox-icon\"]:after{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='8'%3E%3Cpath fill='%23fff' d='M3.64 5.6L8.9 0 10 1.168 3.57 8 0 4.204l1.17-1.242z' fill-rule='evenodd'/%3E%3C/svg%3E\")}[data-dui-1-28-2~=\"dui-checkbox-hollow\"][data-dui-1-28-2~=\"dui-checkbox-tick\"] [data-dui-1-28-2~=\"dui-checkbox-icon\"]:after{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='8'%3E%3Cpath fill='%231E6FFF' d='M3.64 5.6L8.9 0 10 1.168 3.57 8 0 4.204l1.17-1.242z' fill-rule='evenodd'/%3E%3C/svg%3E\")}[data-dui-1-28-2~=\"dui-checkbox-normal\"][data-dui-1-28-2~=\"dui-checkbox-dash\"] [data-dui-1-28-2~=\"dui-checkbox-icon\"]:after{background:#fff}[data-dui-1-28-2~=\"dui-checkbox-hollow\"][data-dui-1-28-2~=\"dui-checkbox-dash\"] [data-dui-1-28-2~=\"dui-checkbox-icon\"]:after{background:var(--accent-default,#1e6fff)}[data-dui-1-28-2~=\"dui-checkbox-disabled\"] [data-dui-1-28-2~=\"dui-checkbox-label\"]{opacity:.36}[data-dui-1-28-2~=\"dui-checkbox-disabled\"] [data-dui-1-28-2~=\"dui-checkbox-icon\"]{border-color:var(--border-weak,rgba(0,0,0,.04))}[data-dui-1-28-2~=\"dui-checkbox-normal\"][data-dui-1-28-2~=\"dui-checkbox-disabled\"] [data-dui-1-28-2~=\"dui-checkbox-icon\"]{background:var(--tsp-fill-medium,rgba(51,77,102,.08))}[data-dui-1-28-2~=\"dui-checkbox-normal\"][data-dui-1-28-2~=\"dui-checkbox-disabled\"] [data-dui-1-28-2~=\"dui-checkbox-icon\"]:after{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='8'%3E%3Cpath fill='%23fff' d='M3.64 5.6L8.9 0 10 1.168 3.57 8 0 4.204l1.17-1.242z' fill-rule='evenodd'/%3E%3C/svg%3E\")}[data-dui-1-28-2~=\"dui-checkbox-hollow\"][data-dui-1-28-2~=\"dui-checkbox-disabled\"] [data-dui-1-28-2~=\"dui-checkbox-icon\"]{border-color:var(--border-weak,rgba(0,0,0,.04))}[data-dui-1-28-2~=\"dui-checkbox-hollow\"][data-dui-1-28-2~=\"dui-checkbox-disabled\"][data-dui-1-28-2~=\"dui-checkbox-tick\"][data-dui-1-28-2~=\"dui-checkbox-checked\"] [data-dui-1-28-2~=\"dui-checkbox-icon\"]{background:#fff}[data-dui-1-28-2~=\"dui-checkbox-hollow\"][data-dui-1-28-2~=\"dui-checkbox-disabled\"][data-dui-1-28-2~=\"dui-checkbox-tick\"][data-dui-1-28-2~=\"dui-checkbox-checked\"] [data-dui-1-28-2~=\"dui-checkbox-icon\"]:after{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='8'%3E%3Cpath opacity='.08' d='M3.64 5.6L8.9 0 10 1.168 3.57 8 0 4.204l1.17-1.242z' fill-rule='evenodd'/%3E%3C/svg%3E\")}[data-dui-1-28-2~=\"dui-checkbox-hollow\"][data-dui-1-28-2~=\"dui-checkbox-disabled\"][data-dui-1-28-2~=\"dui-checkbox-dash\"][data-dui-1-28-2~=\"dui-checkbox-checked\"] [data-dui-1-28-2~=\"dui-checkbox-icon\"]{background:#fff}[data-dui-1-28-2~=\"dui-checkbox-hollow\"][data-dui-1-28-2~=\"dui-checkbox-disabled\"][data-dui-1-28-2~=\"dui-checkbox-dash\"][data-dui-1-28-2~=\"dui-checkbox-checked\"] [data-dui-1-28-2~=\"dui-checkbox-icon\"]:after{background:var(--border-weak,rgba(0,0,0,.04))}[data-dui-1-28-2~=\"dui-checkbox-input\"]{position:absolute;z-index:2;margin:0;opacity:0;left:0;top:0;width:16px;height:20px;cursor:default}[data-dui-1-28-2~=\"dui-checkbox-input-full\"]{width:100%;height:100%}");
	Checkbox.Group = Group;
	Checkbox_default = Checkbox;
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/components/Snackbar/queue.js
function getVisibleSnackbars(instance) {
	var host = instance.getContainerDom();
	host.__dui_visible_snackbars__ = host.__dui_visible_snackbars__ || [];
	return host.__dui_visible_snackbars__;
}
function getIndexOf(instance) {
	return getVisibleSnackbars(instance).findIndex(function(elem) {
		return elem.instance === instance;
	});
}
function findReplaceableSnackbar(newInstance) {
	var visibleSnackbars = getVisibleSnackbars(newInstance);
	var id = newInstance.props.id;
	if (id) {
		var sameIdIndex = visibleSnackbars.findIndex(function(elem) {
			return elem.instance.props.id === id;
		});
		if (sameIdIndex >= 0) return visibleSnackbars[sameIdIndex];
	}
	var autoCloseIndex = visibleSnackbars.findIndex(function(elem) {
		return elem.instance.props.autoClose;
	});
	if (autoCloseIndex >= 0) return visibleSnackbars[autoCloseIndex];
	return null;
}
function getNextMargin(newInstance) {
	var replacedSnackbar = findReplaceableSnackbar(newInstance);
	if (replacedSnackbar) return replacedSnackbar.marginTop;
	var occupiedMargins = getVisibleSnackbars(newInstance).map(function(elem) {
		return elem.marginTop;
	}).sort(function(a, b) {
		return a - b;
	});
	if (occupiedMargins.length === 0) return 0;
	for (var i = 0; i < occupiedMargins.length; i++) {
		var targetMargin = SNACKBAR_GAP * i;
		if (targetMargin !== occupiedMargins[i]) return targetMargin;
	}
	return occupiedMargins[occupiedMargins.length - 1] + SNACKBAR_GAP;
}
function updateVisibleSnackbars(instance) {
	var visible = instance.props.visible;
	var index = getIndexOf(instance);
	var visibleSnackbars = getVisibleSnackbars(instance);
	if (visible && index === -1) {
		var replacedSnackbar = findReplaceableSnackbar(instance);
		replacedSnackbar === null || replacedSnackbar === void 0 || replacedSnackbar.instance.handleClose();
		visibleSnackbars.push({
			instance,
			marginTop: getNextMargin(instance)
		});
		var event_1 = new CustomEvent("dui-snackbar-show", { detail: instance.props });
		document.dispatchEvent(event_1);
	}
	if (!visible && index !== -1) visibleSnackbars.splice(index, 1);
}
function getMarginTop(instance) {
	var index = getIndexOf(instance);
	var visibleSnackbars = getVisibleSnackbars(instance);
	return index !== -1 ? visibleSnackbars[index].marginTop : getNextMargin(instance);
}
function closeAll(force) {
	var snackbars = document.body.__dui_visible_snackbars__;
	snackbars === null || snackbars === void 0 || snackbars.filter(function(_a) {
		var _b = _a.instance.props, autoClose = _b.autoClose, closable = _b.closable;
		return force || autoClose || closable;
	}).forEach(function(item) {
		return item.instance.handleClose();
	});
}
function closeById(id) {
	var snackbars = document.body.__dui_visible_snackbars__;
	snackbars === null || snackbars === void 0 || snackbars.filter(function(_a) {
		return _a.instance.props.id === id;
	}).forEach(function(item) {
		return item.instance.handleClose();
	});
}
function hasVisibleInstances() {
	var _a;
	return Boolean((_a = document.body.__dui_visible_snackbars__) === null || _a === void 0 ? void 0 : _a.length);
}
var SNACKBAR_GAP;
var init_queue = __esmMin((() => {
	SNACKBAR_GAP = 50;
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/components/Snackbar/constant.js
var init_constant$1 = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/components/Snackbar/Snackbar.js
var import_react$40, import_react_dom$6, Snackbar;
var init_Snackbar$1 = __esmMin((() => {
	init_createElement();
	init_tslib_es6();
	import_react$40 = /* @__PURE__ */ __toESM(require_react());
	import_react_dom$6 = /* @__PURE__ */ __toESM(require_react_dom());
	init_helper();
	init_keepDom();
	init_Spin();
	init_context$4();
	init_theme();
	init_queue();
	init_constant$1();
	init_locale();
	Snackbar = function(_super) {
		__extends(Snackbar, _super);
		function Snackbar() {
			var _a;
			var _this = _super.apply(this, arguments) || this;
			_this.selfRef = import_react$40.createRef();
			_this.disableAutoFocus = isBrowser && ((_a = window.__dui_disable_auto_focus_map__) === null || _a === void 0 ? void 0 : _a.Snackbar) || _this.props.autoFocus === false;
			_this.handleClickAction = function() {
				_this.getEffectiveProps().onClickAction();
				_this.handleClose();
			};
			_this.handleClickClose = function() {
				_this.getEffectiveProps().onClickClose();
				_this.handleClose();
			};
			_this.handleClose = function() {
				_this.getEffectiveProps().onClose();
			};
			_this.themedRender = function(classNames) {
				var _a;
				var _b = _this.getEffectiveProps(), prefixCls = _b.prefixCls, className = _b.className, style = _b.style, action = _b.action, children = _b.children, message = _b.message, visible = _b.visible, closable = _b.closable, type = _b.type, zIndex = _b.zIndex, showIcon = _b.showIcon, testId = _b.testId, emphasize = _b.emphasize;
				var placement = "top";
				var messageCls = classNames(prefixCls + "-message");
				if (!decideKeepDom.call(_this, 200, visible)) return null;
				var containerDom = _this.getContainerDom();
				var cls = classNames(prefixCls, className, prefixCls + "-" + placement, prefixCls + "-" + type, (_a = {}, _a[prefixCls + "-emphasize"] = emphasize, _a[prefixCls + "-with-icon"] = showIcon && !_this.renderUserSetIcon(classNames), _a[prefixCls + "-hidden"] = !visible, _a[prefixCls + "-in-container"] = containerDom !== document.body, _a));
				return import_react_dom$6.createPortal(h$5("div", {
					className: cls,
					style: __assign({
						zIndex,
						marginTop: getMarginTop(_this) + "px"
					}, style),
					ref: _this.selfRef,
					role: "alert",
					"aria-live": "assertive",
					"aria-atomic": true,
					"data-testid": testId
				}, _this.renderIcon(classNames), h$5("span", { className: messageCls }, children || message), action || closable ? h$5("span", { className: classNames(prefixCls + "-controls") }, _this.renderAction(classNames), _this.renderClose(classNames)) : null), containerDom);
			};
			return _this;
		}
		Snackbar.prototype.getContainerDom = function() {
			return isDom(this.context) ? this.context : this.getEffectiveProps().containerDom;
		};
		Snackbar.prototype.getEffectiveProps = function() {
			var _a = this.props, type = _a.type, emphasize = _a.emphasize;
			if (!["error", "warning"].includes(type)) return this.props;
			if (type === "warning") return __assign(__assign({}, this.props), {
				type: "error",
				emphasize: false
			});
			if (type === "error" && emphasize === void 0) return __assign(__assign({}, this.props), {
				type: "error",
				emphasize: true
			});
			return this.props;
		};
		Snackbar.prototype.componentDidMount = function() {
			this.handleEffect();
		};
		Snackbar.prototype.componentDidUpdate = function() {
			this.handleEffect();
		};
		Snackbar.prototype.handleEffect = function() {
			updateVisibleSnackbars(this);
		};
		Snackbar.prototype.renderUserSetIcon = function(classNames) {
			var _a = this.getEffectiveProps(), prefixCls = _a.prefixCls, type = _a.type, showIcon = _a.showIcon, icon = _a.icon;
			if (!showIcon || !icon) return null;
			if (import_react$40.isValidElement(icon)) return h$5("div", { className: classNames(prefixCls + "-icon-container") }, icon);
			if (typeof icon === "object") {
				var resolvedIcon = icon[this.props.type] || icon[type];
				if (!resolvedIcon) return null;
				return h$5("div", { className: classNames(prefixCls + "-icon-container") }, resolvedIcon);
			}
			return null;
		};
		Snackbar.prototype.renderAction = function(classNames) {
			var _this = this;
			var _a = this.getEffectiveProps(), prefixCls = _a.prefixCls, action = _a.action;
			if (!action) return null;
			if (Array.isArray(action) && action.length > 0 && action[0].text) return h$5("span", { className: classNames(prefixCls + "-actions") }, action.map(function(a, index) {
				return h$5("button", {
					key: index,
					className: classNames(prefixCls + "-action"),
					onClick: function() {
						var _a;
						(_a = a.onClick) === null || _a === void 0 || _a.call(a);
						_this.handleClose();
					},
					autoFocus: !_this.disableAutoFocus && index === 0
				}, a.text);
			}));
			return h$5("button", {
				className: classNames(prefixCls + "-action"),
				onClick: this.handleClickAction,
				autoFocus: !this.disableAutoFocus
			}, action);
		};
		Snackbar.prototype.renderIcon = function(classNames) {
			var _a = this.getEffectiveProps(), prefixCls = _a.prefixCls, spinType = _a.spinType, type = _a.type;
			if (!_a.showIcon) return null;
			var userSetIcon = this.renderUserSetIcon(classNames);
			if (userSetIcon) return userSetIcon;
			return type === "loading" ? h$5(Spin, {
				type: spinType,
				className: classNames(prefixCls + "-loading-indicator"),
				circleClassName: classNames(prefixCls + "-loading-indicator-circle")
			}) : null;
		};
		Snackbar.prototype.renderClose = function(classNames) {
			var _a = this.getEffectiveProps(), prefixCls = _a.prefixCls;
			return _a.closable ? h$5("button", {
				className: classNames(prefixCls + "-close"),
				onClick: this.handleClickClose,
				"aria-label": i18n("close")
			}) : null;
		};
		Snackbar.prototype.render = function() {
			return consumeTheme(this.themedRender);
		};
		Snackbar.contextType = ContainerContext;
		return Snackbar;
	}(import_react$40.Component);
	Snackbar.defaultProps = {
		prefixCls: "dui-snackbar",
		onClickAction: emptyFn,
		closable: false,
		type: "info",
		onClose: emptyFn,
		showIcon: true,
		containerDom: typeof document !== "undefined" ? document.body : void 0,
		spinType: "primary",
		onClickClose: emptyFn,
		autoFocus: true
	};
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/components/Snackbar/show.js
var show_default;
var init_show = __esmMin((() => {
	init_Snackbar$1();
	init_show$2();
	init_helper();
	init_constant$1();
	show_default = wrapWithConfigDefaults(function(config) {
		var _a = config.autoClose, autoClose = _a === void 0 ? true : _a;
		config.autoClose = autoClose;
		return showWithTransition({
			Component: Snackbar,
			transitionDuration: 200,
			autoClose,
			props: config,
			injectClosePropNames: ["onClose"],
			contexts: config.contexts
		});
	});
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/components/Snackbar/Container.js
var import_react$39, import_prop_types$2, Container;
var init_Container = __esmMin((() => {
	init_createElement();
	init_tslib_es6();
	import_react$39 = /* @__PURE__ */ __toESM(require_react());
	import_prop_types$2 = /* @__PURE__ */ __toESM(require_prop_types());
	init_context$4();
	init_theme();
	Container = function(_super) {
		__extends(Container, _super);
		function Container() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.ref = import_react$39.createRef();
			_this.themedRender = function(classNames) {
				var _a = _this.props, prefixCls = _a.prefixCls, className = _a.className, style = _a.style, children = _a.children;
				return h$5("div", {
					className: classNames(prefixCls, className),
					style: __assign({ position: "relative" }, style),
					ref: _this.ref
				}, h$5(ContainerContext.Provider, { value: _this.ref.current }, children));
			};
			return _this;
		}
		Container.prototype.componentDidMount = function() {
			this.forceUpdate();
		};
		Container.prototype.render = function() {
			return consumeTheme(this.themedRender);
		};
		return Container;
	}(import_react$39.Component);
	Container.defaultProps = { prefixCls: "dui-snackbar-container" };
	Container.propTypes = {
		prefixCls: import_prop_types$2.string,
		style: import_prop_types$2.object,
		className: import_prop_types$2.string
	};
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/components/Snackbar/index.js
var Snackbar_default;
var init_Snackbar = __esmMin((() => {
	init_style();
	init_Snackbar$1();
	init_show();
	init_Container();
	init_queue();
	injectStyle("components/Snackbar/style/index.css", "@-webkit-keyframes dui-snackbar-slide-in{0%{opacity:0;-webkit-transform:translate(-50%,-20px);transform:translate(-50%,-20px)}to{opacity:1;-webkit-transform:translate(-50%);transform:translate(-50%)}}@keyframes dui-snackbar-slide-in{0%{opacity:0;-webkit-transform:translate(-50%,-20px);transform:translate(-50%,-20px)}to{opacity:1;-webkit-transform:translate(-50%);transform:translate(-50%)}}@-webkit-keyframes dui-snackbar-slide-in-container{0%{opacity:0;-webkit-transform:translate(-50%,-10px);transform:translate(-50%,-10px)}to{opacity:1;-webkit-transform:translate(-50%);transform:translate(-50%)}}@keyframes dui-snackbar-slide-in-container{0%{opacity:0;-webkit-transform:translate(-50%,-10px);transform:translate(-50%,-10px)}to{opacity:1;-webkit-transform:translate(-50%);transform:translate(-50%)}}[data-dui-1-28-2~=\"dui-snackbar\"]{-webkit-box-sizing:border-box;box-sizing:border-box;position:fixed;z-index:10000;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-flow:row nowrap;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;left:50%;height:40px;border-radius:4px;padding:10px 10px 10px 12px;-webkit-box-shadow:0 4px 20px 0 rgba(0,0,0,.08);box-shadow:0 4px 20px 0 rgba(0,0,0,.08);border:1px solid rgba(0,0,0,.08);background-color:var(--bg-lv4-default,#fff);color:var(--text-ultrastrong,rgba(0,0,0,.9));font-size:14px;white-space:nowrap;-webkit-transform:translateX(-50%);transform:translateX(-50%);-webkit-animation:dui-snackbar-slide-in .4s cubic-bezier(.4,0,.2,1);animation:dui-snackbar-slide-in .4s cubic-bezier(.4,0,.2,1);-webkit-transition-property:opacity,-webkit-transform;transition-property:opacity,-webkit-transform;transition-property:opacity,transform;transition-property:opacity,transform,-webkit-transform;-webkit-transition-duration:.2s;transition-duration:.2s;-webkit-transition-timing-function:cubic-bezier(.4,0,.2,1);transition-timing-function:cubic-bezier(.4,0,.2,1)}[data-dui-1-28-2~=\"dui-snackbar-with-icon\"]:before{content:\"\";display:inline-block;background-position:50%;background-repeat:no-repeat;background-size:contain}[data-dui-1-28-2~=\"dui-snackbar-icon-container\"],[data-dui-1-28-2~=\"dui-snackbar-with-icon\"]:before{width:20px;height:20px;margin-right:8px}[data-dui-1-28-2~=\"dui-snackbar-info\"]:before{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill-rule='evenodd'%3E%3Ccircle cx='10' cy='10' r='8' fill='%231e6fff'/%3E%3Cg fill='%23fff'%3E%3Cpath d='M11.778 14.89V14h-.9V8.668H8.223v.89h.888V14h-.89v.89h3.556z'/%3E%3Ccircle cx='10' cy='6.444' r='1.333'/%3E%3C/g%3E%3C/svg%3E\")}[data-dui-1-28-2~=\"dui-snackbar-error\"]:before{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Cpath fill='%23ff4747' d='M10 2a8 8 0 110 16 8 8 0 110-16zm0 10.222a1.333 1.333 0 100 2.665 1.333 1.333 0 000-2.664zm1.333-7.1H8.667l.444 6.22h1.778l.444-6.222z' fill-rule='evenodd'/%3E%3C/svg%3E\")}[data-dui-1-28-2~=\"dui-snackbar-success\"]:before{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill-rule='evenodd'%3E%3Ccircle cx='10' cy='10' r='8' fill='%2300d689'/%3E%3Cpath fill='%23fff' d='M7.47 9.167l1.645 1.646 4.126-4.125 1.178 1.178-5.303 5.303-2.824-2.824L7.47 9.167z'/%3E%3C/svg%3E\")}[data-dui-1-28-2~=\"dui-snackbar-error\"][data-dui-1-28-2~=\"dui-snackbar-emphasize\"]:before{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Cpath fill='%23fff' d='M10 2a8 8 0 110 16 8 8 0 110-16zm0 10.222a1.333 1.333 0 100 2.665 1.333 1.333 0 000-2.664zm1.333-7.1H8.667l.444 6.22h1.778l.444-6.222z' fill-rule='evenodd'/%3E%3C/svg%3E\")}[data-dui-1-28-2~=\"dui-snackbar-emphasize\"]{color:var(--bg-lv1-default,#fff);border-color:transparent}[data-dui-1-28-2~=\"dui-snackbar-emphasize\"]:before{-webkit-filter:brightness(1.2);filter:brightness(1.2)}[data-dui-1-28-2~=\"dui-snackbar-emphasize\"][data-dui-1-28-2~=\"dui-snackbar-info\"]{background-color:var(--accent-default,#1e6fff)}[data-dui-1-28-2~=\"dui-snackbar-emphasize\"][data-dui-1-28-2~=\"dui-snackbar-success\"]{background-color:var(--success-default,#00d689)}[data-dui-1-28-2~=\"dui-snackbar-emphasize\"][data-dui-1-28-2~=\"dui-snackbar-error\"]{background-color:var(--critical-default,#ff4747)}[data-dui-1-28-2~=\"dui-snackbar-emphasize\"][data-dui-1-28-2~=\"dui-snackbar-loading\"]{background-color:var(--accent-default,#1e6fff)}[data-dui-1-28-2~=\"dui-snackbar-loading\"]:before{content:none}[data-dui-1-28-2~=\"dui-snackbar-loading-indicator\"]{width:16px;height:16px;margin:0 10px 0 2px}[data-dui-1-28-2~=\"dui-snackbar-loading-indicator-circle\"]{border-width:6px}[data-dui-1-28-2~=\"dui-snackbar-hidden\"]{opacity:0;-webkit-transform:translateX(-50%) translateY(-20px);transform:translateX(-50%) translateY(-20px)}[data-dui-1-28-2~=\"dui-snackbar-top\"]{top:105px}[data-dui-1-28-2~=\"dui-snackbar-bottom\"]{bottom:105px}[data-dui-1-28-2~=\"dui-snackbar-in-container\"]{-webkit-animation-name:dui-snackbar-slide-in-container;animation-name:dui-snackbar-slide-in-container;position:absolute;top:14px}[data-dui-1-28-2~=\"dui-snackbar-in-container\"][data-dui-1-28-2~=\"dui-snackbar-hidden\"]{-webkit-transform:translate(-50%,-10px);transform:translate(-50%,-10px)}[data-dui-1-28-2~=\"dui-snackbar-message\"]{color:inherit}[data-dui-1-28-2~=\"dui-snackbar-controls\"]{margin-left:12px;line-height:20px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-flow:row nowrap;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}[data-dui-1-28-2~=\"dui-snackbar-controls\"]>:not(:last-child){margin-right:10px}[data-dui-1-28-2~=\"dui-snackbar-action\"],[data-dui-1-28-2~=\"dui-snackbar-close\"]{display:inline-block;border-radius:2px;cursor:pointer;border:none;margin:0;padding:0;background:transparent;-webkit-tap-highlight-color:transparent}[data-dui-1-28-2~=\"dui-snackbar-action\"]:hover,[data-dui-1-28-2~=\"dui-snackbar-close\"]:hover{background-color:var(--feedback-hover,rgba(51,77,102,.06))}[data-dui-1-28-2~=\"dui-snackbar-action\"]:active,[data-dui-1-28-2~=\"dui-snackbar-close\"]:active{background-color:var(--feedback-active,rgba(51,77,102,.08))}[data-dui-1-28-2~=\"dui-snackbar-actions\"]>:not(:first-child){margin-left:7px}[data-dui-1-28-2~=\"dui-snackbar-action\"]{color:var(--text-link,#175ceb);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;padding:0 4px;font-weight:500;font-size:14px}[data-dui-1-28-2~=\"dui-snackbar-emphasize\"] [data-dui-1-28-2~=\"dui-snackbar-action\"],[data-dui-1-28-2~=\"dui-snackbar-emphasize\"] [data-dui-1-28-2~=\"dui-snackbar-close\"]{color:var(--bg-lv1-default,#fff)}[data-dui-1-28-2~=\"dui-snackbar-emphasize\"] [data-dui-1-28-2~=\"dui-snackbar-action\"]:hover,[data-dui-1-28-2~=\"dui-snackbar-emphasize\"] [data-dui-1-28-2~=\"dui-snackbar-close\"]:hover{background-color:hsla(0,0%,100%,.24)}[data-dui-1-28-2~=\"dui-snackbar-emphasize\"] [data-dui-1-28-2~=\"dui-snackbar-action\"]:active,[data-dui-1-28-2~=\"dui-snackbar-emphasize\"] [data-dui-1-28-2~=\"dui-snackbar-close\"]:active{background-color:hsla(0,0%,100%,.4)}[data-dui-1-28-2~=\"dui-snackbar-close\"]{width:20px;height:20px;background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Cpath fill='%2381868f' fill-rule='evenodd' d='M8.63 8L13 12.368l-.632.632L8 8.63 3.632 13 3 12.368 7.368 8 3 3.632 3.632 3 8 7.368 12.368 3l.632.632L8.63 8z'/%3E%3C/svg%3E\");background-position:50%;background-size:16px;background-repeat:no-repeat}[data-dui-1-28-2~=\"dui-snackbar-emphasize\"] [data-dui-1-28-2~=\"dui-snackbar-close\"]{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Cpath fill='%23fff' fill-rule='evenodd' d='M8.63 8L13 12.368l-.632.632L8 8.63 3.632 13 3 12.368 7.368 8 3 3.632 3.632 3 8 7.368 12.368 3l.632.632L8.63 8z'/%3E%3C/svg%3E\")}");
	Snackbar.show = show_default;
	Snackbar.closeAll = closeAll;
	Snackbar.closeById = closeById;
	Snackbar.hasVisibleInstances = hasVisibleInstances;
	Snackbar.Container = Container;
	Snackbar_default = Snackbar;
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/components/Form/Form.js
var import_react$38, import_prop_types$1, Form;
var init_Form$1 = __esmMin((() => {
	init_createElement();
	init_tslib_es6();
	import_react$38 = /* @__PURE__ */ __toESM(require_react());
	import_prop_types$1 = /* @__PURE__ */ __toESM(require_prop_types());
	init_theme();
	Form = function(_super) {
		__extends(Form, _super);
		function Form() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.themeRender = function(classNames) {
				var _a = _this.props, prefixCls = _a.prefixCls, className = _a.className, style = _a.style, layout = _a.layout, labelStyle = _a.labelStyle;
				return h$5("div", {
					className: classNames(prefixCls, className, prefixCls + "-layout-" + layout),
					style
				}, import_react$38.Children.map(_this.props.children, function(child) {
					return import_react$38.cloneElement(child, { labelStyle: child.props.labelStyle || labelStyle });
				}));
			};
			return _this;
		}
		Form.prototype.render = function() {
			return consumeTheme(this.themeRender);
		};
		return Form;
	}(import_react$38.Component);
	Form.defaultProps = {
		prefixCls: "dui-form",
		layout: "horizontal"
	};
	Form.propTypes = {
		prefixCls: import_prop_types$1.string,
		style: import_prop_types$1.object,
		className: import_prop_types$1.string,
		form: import_prop_types$1.object,
		labelStyle: import_prop_types$1.object,
		layout: import_prop_types$1.oneOf(["horizontal", "vertical"])
	};
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/components/Form/Item.js
function getTextOfStatus(message, status) {
	if (import_react$37.isValidElement(message) || typeof message === "string") return status === "error" ? message : void 0;
	if (typeof message === "object") return message[status];
}
var import_react$37, import_prop_types, Item;
var init_Item = __esmMin((() => {
	init_createElement();
	init_tslib_es6();
	import_react$37 = /* @__PURE__ */ __toESM(require_react());
	import_prop_types = /* @__PURE__ */ __toESM(require_prop_types());
	init_context$3();
	init_theme();
	init_instanceId();
	Item = function(_super) {
		__extends(Item, _super);
		function Item() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.id = createGlobalInstanceId("FormItem");
			_this.themedRender = function(classNames) {
				var _a = _this.props, prefixCls = _a.prefixCls, className = _a.className, style = _a.style, message = _a.message, label = _a.label, labelStyle = _a.labelStyle;
				var _b = _this.props, required = _b.required, status = _b.status;
				var cls = classNames(prefixCls, className);
				var text = getTextOfStatus(message, status);
				var textCls = classNames(prefixCls + "-text", prefixCls + "-text-" + status);
				var children = Array.isArray(_this.props.children) ? _this.props.children[0] : _this.props.children;
				if (import_react$37.isValidElement(children)) {
					var props = children.props;
					if (props["data-create-form-payload"]) try {
						var _c = props["data-create-form-payload"], id = _c.id, form = _c.form, option = _c.option;
						var getFieldError = form.getFieldError, isFieldTouched = form.isFieldTouched;
						if (Array.isArray(option.rules) && option.rules.filter(function(rule) {
							return rule.required;
						}).length) required = true;
						var accountError = isFieldTouched(id) && getFieldError(id);
						if (accountError) {
							status = "error";
							text = accountError[id].errors[0].message;
							textCls = classNames(prefixCls + "-text", prefixCls + "-text-" + status);
						}
					} catch (e) {
						console.error("Item 组件内部错误", e);
					}
				}
				var hasError = status === "error";
				return h$5(FormItemContext.Provider, { value: { status } }, h$5("div", {
					className: cls,
					style,
					"aria-required": required,
					"aria-invalid": hasError,
					"aria-describedby": _this.id
				}, label ? h$5("div", {
					className: classNames(prefixCls + "-label"),
					style: labelStyle
				}, required ? h$5("span", { className: classNames(prefixCls + "-label-required") }, "*") : null, label) : null, h$5("div", { className: classNames(prefixCls + "-content") }, children, text ? h$5("div", {
					className: textCls,
					id: _this.id
				}, text) : null)));
			};
			return _this;
		}
		Item.prototype.render = function() {
			return consumeTheme(this.themedRender);
		};
		return Item;
	}(import_react$37.Component);
	Item.defaultProps = {
		prefixCls: "dui-form-item",
		status: "default",
		required: false
	};
	Item.propTypes = {
		prefixCls: import_prop_types.string,
		style: import_prop_types.object,
		className: import_prop_types.string,
		status: import_prop_types.oneOf([
			"default",
			"success",
			"error",
			"warning"
		]),
		message: import_prop_types.oneOfType([
			import_prop_types.string,
			import_prop_types.object,
			import_prop_types.element
		]),
		label: import_prop_types.oneOfType([import_prop_types.string, import_prop_types.element]),
		labelStyle: import_prop_types.object,
		required: import_prop_types.bool
	};
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/components/Form/create.js
function create(createOption) {
	return function(C) {
		return function(_super) {
			__extends(class_1, _super);
			function class_1() {
				var _this = _super !== null && _super.apply(this, arguments) || this;
				_this.state = {};
				_this.form = {
					getFieldDecorator: function(id, option) {
						if (option === void 0) option = {};
						return function(E) {
							var _a;
							var onChange = function(value) {
								var _a;
								var args = [];
								for (var _i = 1; _i < arguments.length; _i++) args[_i - 1] = arguments[_i];
								if (typeof E.props.onChange === "function") (_a = E.props).onChange.apply(_a, __spreadArray([value], args));
								_this.setState(function(state) {
									var _a;
									return _a = {}, _a[id] = __assign(__assign({}, state[id]), {
										touched: true,
										value
									}), _a;
								}, function() {
									if (createOption && typeof createOption.onValuesChange === "function") createOption.onValuesChange(_this.form.getFieldsValue([id]), _this.form.getFieldsValue());
								});
							};
							if (_this.state[id] === void 0 && option.initialValue !== void 0) _this.state[id] = __assign(__assign({}, _this.state[id]), { value: option.initialValue });
							_this.state[id] = __assign(__assign({}, _this.state[id]), { option });
							return import_react$36.cloneElement(E, {
								"data-create-form-payload": {
									id,
									form: _this.form,
									option
								},
								onChange,
								value: (_a = _this.state[id]) === null || _a === void 0 ? void 0 : _a.value
							});
						};
					},
					getFieldValue: function(id) {
						var _a;
						return (_a = _this.state[id]) === null || _a === void 0 ? void 0 : _a.value;
					},
					getFieldsValue: function(ids) {
						if (Array.isArray(ids)) {
							var values_1 = {};
							ids.forEach(function(id) {
								if (_this.state[id]) values_1[id] = _this.state[id].value;
							});
							return values_1;
						} else {
							var values_2 = {};
							Object.keys(_this.state).forEach(function(id) {
								if (_this.state[id]) values_2[id] = _this.state[id].value;
							});
							return values_2;
						}
					},
					setFieldsValue: function(values) {
						Object.keys(values).forEach(function(id) {
							if (_this.state[id]) _this.setState(function(state) {
								var _a;
								return _a = {}, _a[id] = __assign(__assign({}, state[id]), { value: values[id] }), _a;
							});
						});
					},
					resetFields: function(ids) {
						if (Array.isArray(ids)) ids.forEach(function(id) {
							if (_this.state[id]) _this.setState(function(state) {
								var _a;
								return _a = {}, _a[id] = __assign(__assign({}, state[id]), {
									touched: false,
									value: state[id].option.initialValue
								}), _a;
							});
						});
						else Object.keys(_this.state).forEach(function(id) {
							_this.setState(function(state) {
								var _a;
								return _a = {}, _a[id] = __assign(__assign({}, state[id]), {
									touched: false,
									value: state[id].option.initialValue
								}), _a;
							});
						});
					},
					isFieldTouched: function(id) {
						var _a;
						return Boolean((_a = _this.state[id]) === null || _a === void 0 ? void 0 : _a.touched);
					},
					validateFields: function(cb) {
						_this.setState(function(state) {
							var obj = {};
							Object.keys(state).forEach(function(k) {
								obj[k] = __assign(__assign({}, state[k]), { touched: true });
							});
							return obj;
						});
						cb(_this.form.getFieldsError(), _this.form.getFieldsValue());
					},
					getFieldError: function(id) {
						return _this.validate(id);
					},
					getFieldsError: function(ids) {
						var obj;
						if (Array.isArray(ids)) ids.forEach(function(id) {
							obj = __assign(__assign({}, obj), _this.validate(id));
						});
						else Object.keys(_this.state).forEach(function(id) {
							obj = __assign(__assign({}, obj), _this.validate(id));
						});
						return obj;
					}
				};
				_this.validate = function(id) {
					var _a;
					if (_this.state[id]) {
						var option = _this.state[id].option;
						var value_1 = _this.state[id].value;
						if (Array.isArray(option.rules)) {
							var errors = option.rules.filter(function(rule) {
								if (rule.required === true) {
									if (value_1 === void 0 || value_1 === "") return true;
								}
								if (rule.min !== void 0 && !isNaN(rule.min)) {
									if (value_1 === void 0 || value_1 === "") {
										if (rule.min > 0) return true;
									} else if (typeof value_1 === "string") {
										if (rule.min > value_1.length) return true;
									}
								}
								if (rule.max !== void 0 && !isNaN(rule.max)) {
									if (typeof value_1 === "string") {
										if (rule.max < value_1.length) return true;
									}
								}
								if (typeof rule.validator === "function") return !rule.validator(value_1);
								return false;
							}).map(function(rule) {
								return {
									field: id,
									message: rule.message
								};
							});
							if (errors.length) return _a = {}, _a[id] = { errors }, _a;
						}
					}
				};
				return _this;
			}
			class_1.prototype.render = function() {
				return h$5(C, __assign({}, this.props, { form: this.form }));
			};
			return class_1;
		}(import_react$36.Component);
	};
}
var import_react$36;
var init_create = __esmMin((() => {
	init_createElement();
	init_tslib_es6();
	import_react$36 = /* @__PURE__ */ __toESM(require_react());
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/components/Form/index.js
var Form_default;
var init_Form = __esmMin((() => {
	init_style();
	init_Form$1();
	init_Item();
	init_create();
	injectStyle("components/Form/style/index.css", "[data-dui-1-28-2~=\"dui-form\"]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}[data-dui-1-28-2~=\"dui-form-layout-horizontal\"]{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row}[data-dui-1-28-2~=\"dui-form-layout-horizontal\"] [data-dui-1-28-2~=\"dui-form-item\"]{margin-right:20px}[data-dui-1-28-2~=\"dui-form-layout-vertical\"]{-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}[data-dui-1-28-2~=\"dui-form-item\"]{margin-bottom:30px}[data-dui-1-28-2~=\"dui-form-item\"],[data-dui-1-28-2~=\"dui-form-item-label\"]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}[data-dui-1-28-2~=\"dui-form-item-label\"]{-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;margin-right:16px}[data-dui-1-28-2~=\"dui-form-item-label-required\"]{color:red;display:inline-block;margin-right:4px}[data-dui-1-28-2~=\"dui-form-item-content\"]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;position:relative}[data-dui-1-28-2~=\"dui-form-item-text\"]{position:absolute;top:100%;font-size:12px;height:25px;line-height:25px;font-weight:450}[data-dui-1-28-2~=\"dui-form-item-text-error\"]{color:#ff7272}");
	Form.Item = Item;
	Form.create = create;
	Form_default = Form;
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/components/Progress/util.js
function normalizePercentage(percentage) {
	if (percentage === void 0) percentage = 0;
	return castInto(percentage, [0, 100]);
}
function getAnimationDuration(oldPercentage, newPercentage, duration) {
	return Math.abs(newPercentage - oldPercentage) * duration;
}
function createNewSegment(_a) {
	var _b = _a.oldPercentage, oldPercentage = _b === void 0 ? 0 : _b, newPercentage = _a.newPercentage, duration = _a.duration;
	var normalizedPercentage = normalizePercentage(newPercentage);
	return {
		normalizedPercentage,
		animationDuration: getAnimationDuration(oldPercentage, normalizedPercentage, duration)
	};
}
var init_util = __esmMin((() => {
	init_helper();
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/components/Progress/Progress.js
var import_react$35, Progress;
var init_Progress$1 = __esmMin((() => {
	init_createElement();
	init_tslib_es6();
	import_react$35 = /* @__PURE__ */ __toESM(require_react());
	init_theme();
	init_util();
	Progress = function(_super) {
		__extends(Progress, _super);
		function Progress() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.state = { segments: [] };
			_this.themedRender = function(classNames) {
				var _a, _b = _this.props, prefixCls = _b.prefixCls, className = _b.className, style = _b.style, showInfo = _b.showInfo, isLoading = _b.isLoading, barClassName = _b.barClassName, barStyle = _b.barStyle, completedClassName = _b.completedClassName, completedStyle = _b.completedStyle, remainingClassName = _b.remainingClassName, remainingStyle = _b.remainingStyle, infoClassName = _b.infoClassName, infoStyle = _b.infoStyle;
				_b.children;
				_b.duration;
				var percentage = _b.percentage, rest = __rest(_b, [
					"prefixCls",
					"className",
					"style",
					"showInfo",
					"isLoading",
					"barClassName",
					"barStyle",
					"completedClassName",
					"completedStyle",
					"remainingClassName",
					"remainingStyle",
					"infoClassName",
					"infoStyle",
					"children",
					"duration",
					"percentage"
				]);
				var segments = _this.state.segments;
				var containerCls = classNames(prefixCls, className, (_a = {}, _a[prefixCls + "-loading"] = isLoading, _a));
				var barCls = classNames(prefixCls + "-bar", barClassName);
				var completedCls = classNames(prefixCls + "-bar-completed", completedClassName);
				var remainingCls = classNames(prefixCls + "-bar-remaining", remainingClassName);
				var infoCls = classNames(prefixCls + "-info", infoClassName);
				var segmentParams = Array.isArray(percentage) ? percentage : [];
				var totalPercentage = segments.reduce(function(accu, next) {
					return accu + next.normalizedPercentage;
				}, 0);
				return h$5("div", __assign({
					className: containerCls,
					style,
					role: "progressbar",
					tabIndex: 0,
					"aria-valuemin": 0,
					"aria-valuemax": 100,
					"aria-valuenow": totalPercentage
				}, rest), h$5("div", {
					className: barCls,
					style: barStyle
				}, segments.map(function(_a, index) {
					var normalizedPercentage = _a.normalizedPercentage, animationDuration = _a.animationDuration;
					var _b = segmentParams[index] || {}, color = _b.color, className = _b.className, style = _b.style;
					return h$5("div", {
						key: index,
						className: classNames(completedCls, className),
						style: __assign(__assign(__assign({}, completedStyle), style), {
							width: normalizedPercentage + "%",
							transitionDuration: animationDuration + "ms",
							backgroundColor: color
						})
					});
				}), h$5("div", {
					className: remainingCls,
					style: remainingStyle
				})), showInfo && h$5("div", {
					className: infoCls,
					style: infoStyle
				}, totalPercentage + "%"));
			};
			return _this;
		}
		Progress.getDerivedStateFromProps = function(props, state) {
			var percentage = props.percentage, duration = props.duration;
			var segments = state.segments;
			return { segments: (Array.isArray(percentage) ? percentage.map(function(_a) {
				return _a.value;
			}) : [percentage]).map(function(segmentPercentage, index) {
				var _a;
				return createNewSegment({
					oldPercentage: (_a = segments[index]) === null || _a === void 0 ? void 0 : _a.normalizedPercentage,
					newPercentage: segmentPercentage,
					duration
				});
			}) };
		};
		Progress.prototype.render = function() {
			return consumeTheme(this.themedRender);
		};
		return Progress;
	}(import_react$35.Component);
	Progress.defaultProps = {
		prefixCls: "dui-progress",
		percentage: 0,
		showInfo: false,
		isLoading: false,
		duration: 10
	};
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/components/Progress/index.js
var Progress_default;
var init_Progress = __esmMin((() => {
	init_style();
	init_Progress$1();
	injectStyle("components/Progress/style/index.css", "@-webkit-keyframes dui-progress-loading{0%{width:0;opacity:1}70%{width:100%;opacity:.8}to{width:100%;opacity:0}}@keyframes dui-progress-loading{0%{width:0;opacity:1}70%{width:100%;opacity:.8}to{width:100%;opacity:0}}[data-dui-1-28-2~=\"dui-progress\"]{-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;height:40px}[data-dui-1-28-2~=\"dui-progress\"],[data-dui-1-28-2~=\"dui-progress-bar\"]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal}[data-dui-1-28-2~=\"dui-progress-bar\"]{-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;-webkit-flex-basis:0;-ms-flex-preferred-size:0;flex-basis:0;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;height:6px;background-color:var(--tsp-fill-medium,rgba(51,77,102,.08));border-radius:2px}[data-dui-1-28-2~=\"dui-progress-bar-completed\"]{-webkit-box-flex:0;-webkit-flex-grow:0;-ms-flex-positive:0;flex-grow:0;-webkit-flex-basis:auto;-ms-flex-preferred-size:auto;flex-basis:auto;background-color:var(--accent-default,#1e6fff);border-radius:2px}[data-dui-1-28-2~=\"dui-progress-bar-completed\"]:not(:first-child){border-bottom-left-radius:0;border-top-left-radius:0}[data-dui-1-28-2~=\"dui-progress-bar-completed\"]:not(:nth-last-child(2)){border-bottom-right-radius:0;border-top-right-radius:0}[data-dui-1-28-2~=\"dui-progress-bar-remaining\"]{-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;-webkit-flex-basis:0;-ms-flex-preferred-size:0;flex-basis:0}[data-dui-1-28-2~=\"dui-progress-info\"]{-webkit-box-flex:0;-webkit-flex-grow:0;-ms-flex-positive:0;flex-grow:0;-webkit-flex-basis:3em;-ms-flex-preferred-size:3em;flex-basis:3em;text-align:right;margin-left:10px;font-size:12px}[data-dui-1-28-2~=\"dui-progress\"][data-dui-1-28-2~=\"dui-progress-loading\"] [data-dui-1-28-2~=\"dui-progress-bar-completed\"]{position:relative;background-color:#6ba0ff}[data-dui-1-28-2~=\"dui-progress\"][data-dui-1-28-2~=\"dui-progress-loading\"] [data-dui-1-28-2~=\"dui-progress-bar-completed\"]:before{content:\"\";position:absolute;top:0;left:0;bottom:0;background-color:var(--accent-default,#1e6fff);border-radius:inherit;-webkit-animation-name:dui-progress-loading;animation-name:dui-progress-loading;-webkit-animation-duration:1s;animation-duration:1s;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite}");
	Progress_default = Progress;
}));
//#endregion
//#region ../../node_modules/@tencent/dui/esm/index.js
var init_esm$1 = __esmMin((() => {
	init_polyfill();
	init_Button();
	init_style();
	init_createElement();
	init_theme();
	init_Tooltip();
	init_Modal();
	init_locale();
	init_Loading();
	init_keepDom();
	init_show$2();
	init_Input$1();
	init_helper();
	init_util$1();
	init_Dropdown();
	init_Menu();
	init_Switch();
	init_Divider();
	init_instanceId();
	init_Tabs();
	init_Checkbox();
	init_Snackbar();
	init_Form();
	init_preventScrollPenetrate();
	init_focus();
	init_Progress();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/dist/esm/chunks/style-inject.es-3984fa0f.js
function e$11(e, t) {
	void 0 === t && (t = {});
	var d = t.insertAt;
	if (e && "undefined" != typeof document) {
		var n = document.head || document.getElementsByTagName("head")[0], s = document.createElement("style");
		s.type = "text/css", "top" === d && n.firstChild ? n.insertBefore(s, n.firstChild) : n.appendChild(s), s.styleSheet ? s.styleSheet.cssText = e : s.appendChild(document.createTextNode(e));
	}
}
var init_style_inject_es_3984fa0f = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/dist/esm/chunks/index-ae78ab8c.js
function s$7(n) {
	return s$7 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(n) {
		return typeof n;
	} : function(n) {
		return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
	}, s$7(n);
}
function u$9() {
	return u$9 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var o in t) ({}).hasOwnProperty.call(t, o) && (n[o] = t[o]);
		}
		return n;
	}, u$9.apply(null, arguments);
}
function b$5(n, e, t) {
	return (e = function(n) {
		var e = function(n, e) {
			if ("object" != s$7(n) || !n) return n;
			var t = n[Symbol.toPrimitive];
			if (void 0 !== t) {
				var o = t.call(n, e || "default");
				if ("object" != s$7(o)) return o;
				throw new TypeError("@@toPrimitive must return a primitive value.");
			}
			return ("string" === e ? String : Number)(n);
		}(n, "string");
		return "symbol" == s$7(e) ? e : e + "";
	}(e)) in n ? Object.defineProperty(n, e, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : n[e] = t, n;
}
var import_react$33, import_react$34, import_classnames$15, f$9, g$6, w$8;
var init_index_ae78ab8c = __esmMin((() => {
	init_index_c23defda();
	init_extends_559f37d0();
	init_slicedToArray_e715395f();
	import_react$33 = /* @__PURE__ */ __toESM(require_react());
	import_react$34 = /* @__PURE__ */ __toESM(require_react());
	init_esm$1();
	import_classnames$15 = /* @__PURE__ */ __toESM(require_classnames());
	init_style_inject_es_3984fa0f();
	f$9 = function(n) {
		return import_react$33.createElement("svg", u$9({
			width: 12,
			height: 12,
			viewBox: "0 0 12 12",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg"
		}, n), import_react$33.createElement("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M5.55811 8.44194L2.55811 5.44194L3.44199 4.55806L6.00005 7.11612L8.55811 4.55806L9.44199 5.44194L6.44199 8.44194C6.19791 8.68602 5.80218 8.68602 5.55811 8.44194Z",
			fill: "#454D5A",
			style: b$5(b$5({ fill: "#454D5A" }, "fill", "color(display-p3 0.2706 0.3020 0.3529)"), "fillOpacity", 1)
		}));
	};
	e$11(".ai-component-pc-dropdown-button {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 2px;\n  border-radius: 20px;\n  border: 1px solid var(--border-medium, rgba(0, 0, 0, 0.08));\n  height: 32px;\n  box-sizing: border-box;\n  padding: 0 7px 0 12px;\n  cursor: pointer;\n  user-select: none;\n}\n.ai-component-pc-dropdown-button:hover {\n  background: var(--feedback-hover, rgba(51, 77, 102, 0.06));\n}\n.ai-component-pc-dropdown-button-small {\n  height: 28px;\n}\n.ai-component-pc-dropdown-button-dropdown.dui-dropdown-disabled {\n  opacity: 0.4;\n}\n.ai-component-pc-dropdown-button-dropdown.dui-dropdown-disabled .ai-component-pc-dropdown-button {\n  background: none;\n}\n.ai-component-pc-dropdown-button-without-toggle {\n  padding: 0 12px;\n}\n.ai-component-pc-dropdown-button-active {\n  background-color: var(--feedback-hover, rgba(29, 79, 106, 0.06));\n}\n.ai-component-pc-dropdown-button-label {\n  display: flex;\n  align-items: center;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  font-size: 12px;\n  line-height: 16px;\n  font-weight: 400;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.ai-component-pc-dropdown-button svg {\n  width: 12px;\n  height: 12px;\n}\n.ai-component-pc-dropdown-button svg path {\n  fill: var(--text-ultrastrong, rgba(0, 0, 0, 0.88)) !important;\n}\n.ai-component-pc-dropdown-button-toggle-icon-up {\n  transform: rotate(180deg);\n}\n.ai-component-pc-dropdown-button-menu {\n  min-width: 120px;\n  border-radius: 8px;\n}\n.ai-component-pc-dropdown-button-menu li.dui-menu-item {\n  padding: 9px 16px 9px 30px;\n}\n.ai-component-pc-dropdown-button-menu-item-with-desc {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  height: 36px;\n  padding-left: 32px;\n  padding-right: 20px;\n  cursor: pointer;\n  justify-content: flex-start;\n}\n.ai-component-pc-dropdown-button-menu-item-with-desc .ai-component-pc-dropdown-button-item-name {\n  font-size: 14px;\n  font-weight: 500;\n  line-height: 20px;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  margin-bottom: 2px;\n  width: 100%;\n}\n.ai-component-pc-dropdown-button-menu-item-with-desc .ai-component-pc-dropdown-button-item-desc {\n  font-size: 12px;\n  font-weight: 400;\n  line-height: 16px;\n  color: var(--text-medium, rgba(0, 0, 0, 0.48));\n  width: 100%;\n}\n");
	g$6 = "ai-component-pc-dropdown-button", w$8 = function(o) {
		var m = o.className, s = o.showIcon, u = void 0 === s || s, b = o.item, w = o.respectLabel, v = void 0 !== w && w, h = o.checkable, x = void 0 !== h && h, y = o.showToggle, E = void 0 === y || y, j = o.value, N = o.disabled, k = o.customMenu, C = o.onChange, S = o.buttonSize, L = void 0 === S ? "medium" : S, I = o.dropContentClassName, O = t$9((0, import_react$34.useState)(j || ""), 2), P = O[0], A = O[1], T = t$9((0, import_react$34.useState)(!1), 2), B = T[0], M = T[1];
		(0, import_react$34.useEffect)((function() {
			A(j || "");
		}), [j]);
		var R = (0, import_react$34.useMemo)((function() {
			var n;
			return v && (null === (n = b.options.find((function(n) {
				return n.value === P;
			}))) || void 0 === n ? void 0 : n.label) || b.label;
		}), [
			v,
			P,
			b.options,
			b.label
		]), _ = x ? { selectedIds: [P] } : {}, V = import_react$34.createElement(Menu_default, n$10({}, _, {
			onClick: function(n) {
				A(n), C?.(n, b.key);
			},
			className: "".concat(g$6, "-menu")
		}), b.options.map((function(n) {
			return n.desc ? import_react$34.createElement(Menu_default.Item, {
				key: n.value,
				id: n.value,
				className: "".concat(g$6, "-menu-item-with-desc")
			}, import_react$34.createElement("div", { className: "".concat(g$6, "-item-name") }, n.label), import_react$34.createElement("div", { className: "".concat(g$6, "-item-desc") }, n.desc)) : import_react$34.createElement(Menu_default.Item, {
				key: n.value,
				id: n.value
			}, n.label);
		})));
		return import_react$34.createElement(Dropdown_default, {
			className: "".concat(g$6, "-dropdown"),
			dropContentClassName: (0, import_classnames$15.default)(I),
			onVisibleChange: function(n) {
				M(n);
			},
			disabled: N,
			dropContent: k || V
		}, import_react$34.createElement("div", { className: (0, import_classnames$15.default)("".concat(g$6), m, a$19(a$19(a$19({}, "".concat(g$6, "-active"), B), "".concat(g$6, "-without-toggle"), !E), "".concat(g$6, "-").concat(L), !0)) }, u && b.Icon ? import_react$34.createElement(b.Icon, {
			width: 20,
			height: 20
		}) : null, import_react$34.createElement("span", { className: "".concat(g$6, "-label") }, R), E && import_react$34.createElement(f$9, {
			viewBox: "0 0 12 12",
			className: (0, import_classnames$15.default)("".concat("ai-component-pc-dropdown-button", "-toggle-icon-down"), a$19({}, "".concat("ai-component-pc-dropdown-button", "-toggle-icon-up"), B))
		})));
	};
})), import_react$32, l$10, p$1;
var init_model_selector = __esmMin((() => {
	import_react$32 = /* @__PURE__ */ __toESM(require_react());
	init_index_4a868389();
	init_index_ae78ab8c();
	init_esm$3();
	init_style_inject_es_3984fa0f();
	require_classnames();
	e$11(".ai-component-pc-model-type-selector-button {\n  display: flex;\n  align-items: center;\n  line-height: 16px;\n  font-size: 12px;\n  font-weight: 400;\n  border: none;\n  background-color: transparent;\n  padding: 7px 8px;\n  cursor: pointer;\n}\n.ai-component-pc-model-type-selector-button--bordered {\n  border: 1px solid var(--border-medium, rgba(0, 0, 0, 0.08));\n  background-color: var(--bg-lv2-default, rgba(255, 255, 255));\n  border-radius: 20px;\n  text-align: center;\n}\n.ai-component-pc-model-type-selector-button_text {\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  width: max-content;\n}\n.ai-component-pc-model-type-selector-button_arrow {\n  width: 12px;\n  height: 12px;\n  margin-left: 2px;\n}\n.ai-component-pc-model-type-selector-button_arrow_down {\n  transform: rotate(180deg);\n}\n.ai-component-pc-model-type-selector li.dui-menu-item {\n  height: 36px;\n  padding-left: 40px;\n  padding-right: 40px;\n  cursor: pointer;\n  justify-content: flex-start;\n}\n.ai-component-pc-model-type-selector li.dui-menu-item .modal-name {\n  font-size: 14px;\n  font-weight: 600;\n  line-height: 20px;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  margin-bottom: 2px;\n}\n.ai-component-pc-model-type-selector li.dui-menu-item .modal-desc {\n  font-size: 12px;\n  font-weight: 400;\n  line-height: 16px;\n  color: var(--text-medium, rgba(0, 0, 0, 0.48));\n}\n.ai-component-pc-model-type-selector li.dui-menu-item::before {\n  content: '';\n  left: 14px !important;\n}\n.model_list .ai-component-pc-dropdown-button-menu {\n  min-width: 200px;\n}\n.model_list .ai-component-pc-dropdown-button-menu li.dui-menu-item {\n  padding-left: 40px;\n}\n.model_list .ai-component-pc-dropdown-button-menu li.dui-menu-item::before {\n  left: 14px !important;\n}\n");
	l$10 = {
		key: "model",
		label: "model",
		options: [
			{
				value: E$6.DEEPSEEK_V3_1_THINKING,
				label: i$17("searchBox.deepSeekThinking"),
				desc: i$17("searchBox.deepSeekThinkingTip")
			},
			{
				value: E$6.DEEPSEEK_V3_1,
				label: i$17("searchBox.deepSeek"),
				desc: i$17("searchBox.deepSeekTip")
			},
			{
				value: E$6.HUNYUAN,
				label: i$17("searchBox.hunyuan"),
				desc: i$17("searchBox.hunyuanTip")
			},
			{
				value: E$6.HUNYUANT1,
				label: i$17("searchBox.hunyuanT1"),
				desc: i$17("searchBox.hunyuanT1Tip")
			}
		]
	}, p$1 = function(n) {
		var a = n.model, p = n.onModelChange, c = n.disabled, m = n.buttonSize, d = void 0 === m ? "medium" : m;
		return import_react$32.createElement(w$8, {
			className: "ai-component-pc-model-selector",
			dropContentClassName: "model_list",
			buttonSize: d,
			item: l$10,
			checkable: !0,
			value: a || _$5(),
			respectLabel: !0,
			disabled: c,
			onChange: function(e) {
				Object.values(E$6).includes(e) && (localStorage.setItem("tdocs-ai_model_type", e), p?.(e));
			}
		});
	};
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/dist/esm/chunks/send_disable_24-b418eed8.js
function e$9(t) {
	return e$9 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
		return typeof t;
	} : function(t) {
		return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
	}, e$9(t);
}
function r$12() {
	return r$12 = Object.assign ? Object.assign.bind() : function(t) {
		for (var e = 1; e < arguments.length; e++) {
			var r = arguments[e];
			for (var o in r) ({}).hasOwnProperty.call(r, o) && (t[o] = r[o]);
		}
		return t;
	}, r$12.apply(null, arguments);
}
function o$10(t, r, o) {
	return (r = function(t) {
		var r = function(t, r) {
			if ("object" != e$9(t) || !t) return t;
			var o = t[Symbol.toPrimitive];
			if (void 0 !== o) {
				var n = o.call(t, r || "default");
				if ("object" != e$9(n)) return n;
				throw new TypeError("@@toPrimitive must return a primitive value.");
			}
			return ("string" === r ? String : Number)(t);
		}(t, "string");
		return "symbol" == e$9(r) ? r : r + "";
	}(r)) in t ? Object.defineProperty(t, r, {
		value: o,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : t[r] = o, t;
}
function l$9(t) {
	return l$9 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
		return typeof t;
	} : function(t) {
		return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
	}, l$9(t);
}
function i$15() {
	return i$15 = Object.assign ? Object.assign.bind() : function(t) {
		for (var e = 1; e < arguments.length; e++) {
			var r = arguments[e];
			for (var o in r) ({}).hasOwnProperty.call(r, o) && (t[o] = r[o]);
		}
		return t;
	}, i$15.apply(null, arguments);
}
function a$17(t, e, r) {
	return (e = function(t) {
		var e = function(t, e) {
			if ("object" != l$9(t) || !t) return t;
			var r = t[Symbol.toPrimitive];
			if (void 0 !== r) {
				var o = r.call(t, e || "default");
				if ("object" != l$9(o)) return o;
				throw new TypeError("@@toPrimitive must return a primitive value.");
			}
			return ("string" === e ? String : Number)(t);
		}(t, "string");
		return "symbol" == l$9(e) ? e : e + "";
	}(e)) in t ? Object.defineProperty(t, e, {
		value: r,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : t[e] = r, t;
}
var import_react$31, n$9, c$11;
var init_send_disable_24_b418eed8 = __esmMin((() => {
	import_react$31 = /* @__PURE__ */ __toESM(require_react());
	n$9 = function(e) {
		return import_react$31.createElement("svg", r$12({
			width: 32,
			height: 32,
			viewBox: "0 0 32 32",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg"
		}, e), import_react$31.createElement("circle", {
			cx: 16,
			cy: 16,
			r: 16,
			fill: "url(#paint0_radial_1780_16652)",
			style: {}
		}), import_react$31.createElement("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M23.2071 16.2071C23.5976 15.8166 23.5976 15.1834 23.2071 14.7929L17.7071 9.29289C17.3166 8.90237 16.6834 8.90237 16.2929 9.29289C15.9024 9.68342 15.9024 10.3166 16.2929 10.7071L20.0858 14.5L9.5 14.5C8.94771 14.5 8.5 14.9477 8.5 15.5C8.5 16.0523 8.94772 16.5 9.5 16.5L20.0858 16.5L16.2929 20.2929C15.9024 20.6834 15.9024 21.3166 16.2929 21.7071C16.6834 22.0976 17.3166 22.0976 17.7071 21.7071L23.2071 16.2071Z",
			fill: "white",
			style: {
				fill: "white",
				fillOpacity: 1
			}
		}), import_react$31.createElement("defs", null, import_react$31.createElement("radialGradient", {
			id: "paint0_radial_1780_16652",
			cx: 0,
			cy: 0,
			r: 1,
			gradientUnits: "userSpaceOnUse",
			gradientTransform: "translate(7 -6) rotate(66.3295) scale(39.8529 27.2225)"
		}, import_react$31.createElement("stop", {
			offset: .327165,
			stopColor: "#2C91FF",
			style: o$10(o$10({ stopColor: "#2C91FF" }, "stopColor", "color(display-p3 0.1725 0.5686 1.0000)"), "stopOpacity", 1)
		}), import_react$31.createElement("stop", {
			offset: 1,
			stopColor: "#2175FF",
			style: o$10(o$10({ stopColor: "#2175FF" }, "stopColor", "color(display-p3 0.1294 0.4588 1.0000)"), "stopOpacity", 1)
		}))));
	};
	c$11 = function(e) {
		return import_react$31.createElement("svg", i$15({
			width: 32,
			height: 32,
			viewBox: "0 0 32 32",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg"
		}, e), import_react$31.createElement("g", { opacity: .4 }, import_react$31.createElement("circle", {
			cx: 16,
			cy: 16,
			r: 16,
			fill: "url(#paint0_radial_1780_16679)",
			style: {}
		}), import_react$31.createElement("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M23.2071 16.2071C23.5976 15.8166 23.5976 15.1834 23.2071 14.7929L17.7071 9.29289C17.3166 8.90237 16.6834 8.90237 16.2929 9.29289C15.9024 9.68342 15.9024 10.3166 16.2929 10.7071L20.0858 14.5L9.5 14.5C8.94771 14.5 8.5 14.9477 8.5 15.5C8.5 16.0523 8.94772 16.5 9.5 16.5L20.0858 16.5L16.2929 20.2929C15.9024 20.6834 15.9024 21.3166 16.2929 21.7071C16.6834 22.0976 17.3166 22.0976 17.7071 21.7071L23.2071 16.2071Z",
			fill: "white",
			style: {
				fill: "white",
				fillOpacity: 1
			}
		})), import_react$31.createElement("defs", null, import_react$31.createElement("radialGradient", {
			id: "paint0_radial_1780_16679",
			cx: 0,
			cy: 0,
			r: 1,
			gradientUnits: "userSpaceOnUse",
			gradientTransform: "translate(7 -6) rotate(66.3295) scale(39.8529 27.2225)"
		}, import_react$31.createElement("stop", {
			offset: .327165,
			stopColor: "#2C91FF",
			style: a$17(a$17({ stopColor: "#2C91FF" }, "stopColor", "color(display-p3 0.1725 0.5686 1.0000)"), "stopOpacity", 1)
		}), import_react$31.createElement("stop", {
			offset: 1,
			stopColor: "#2175FF",
			style: a$17(a$17({ stopColor: "#2175FF" }, "stopColor", "color(display-p3 0.1294 0.4588 1.0000)"), "stopOpacity", 1)
		}))));
	};
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/dist/esm/chunks/index-e54e83c4.js
function r$11(t, r, e, n, o, i, a) {
	try {
		var u = t[i](a), c = u.value;
	} catch (t) {
		e(t);
		return;
	}
	u.done ? r(c) : Promise.resolve(c).then(n, o);
}
function e$8(t) {
	return function() {
		var e = this, n = arguments;
		return new Promise((function(o, i) {
			var a = t.apply(e, n);
			function u(t) {
				r$11(a, o, i, u, c, "next", t);
			}
			function c(t) {
				r$11(a, o, i, u, c, "throw", t);
			}
			u(void 0);
		}));
	};
}
function n$8(t) {
	return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var o$9, i$14, a$16, u$8, c$10, f$8;
var init_index_e54e83c4 = __esmMin((() => {
	init_index_c23defda();
	o$9 = { exports: {} }, i$14 = { exports: {} };
	(function(t) {
		function r(e) {
			return t.exports = r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
				return typeof t;
			} : function(t) {
				return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
			}, t.exports.__esModule = !0, t.exports.default = t.exports, r(e);
		}
		t.exports = r, t.exports.__esModule = !0, t.exports.default = t.exports;
	})(i$14);
	a$16 = i$14.exports;
	(function(t) {
		var r = a$16.default;
		function e() {
			/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
			t.exports = e = function() {
				return o;
			}, t.exports.__esModule = !0, t.exports.default = t.exports;
			var n, o = {}, i = Object.prototype, a = i.hasOwnProperty, u = Object.defineProperty || function(t, r, e) {
				t[r] = e.value;
			}, c = "function" == typeof Symbol ? Symbol : {}, f = c.iterator || "@@iterator", l = c.asyncIterator || "@@asyncIterator", s = c.toStringTag || "@@toStringTag";
			function h(t, r, e) {
				return Object.defineProperty(t, r, {
					value: e,
					enumerable: !0,
					configurable: !0,
					writable: !0
				}), t[r];
			}
			try {
				h({}, "");
			} catch (n) {
				h = function(t, r, e) {
					return t[r] = e;
				};
			}
			function p(t, r, e, n) {
				var o = r && r.prototype instanceof w ? r : w, i = Object.create(o.prototype);
				return u(i, "_invoke", { value: T(t, e, new F(n || [])) }), i;
			}
			function y(t, r, e) {
				try {
					return {
						type: "normal",
						arg: t.call(r, e)
					};
				} catch (t) {
					return {
						type: "throw",
						arg: t
					};
				}
			}
			o.wrap = p;
			var v = "suspendedStart", d = "suspendedYield", g = "executing", m = "completed", x = {};
			function w() {}
			function b() {}
			function L() {}
			var _ = {};
			h(_, f, (function() {
				return this;
			}));
			var E = Object.getPrototypeOf, j = E && E(E(M([])));
			j && j !== i && a.call(j, f) && (_ = j);
			var O = L.prototype = w.prototype = Object.create(_);
			function S(t) {
				[
					"next",
					"throw",
					"return"
				].forEach((function(r) {
					h(t, r, (function(t) {
						return this._invoke(r, t);
					}));
				}));
			}
			function P(t, e) {
				function n(o, i, u, c) {
					var f = y(t[o], t, i);
					if ("throw" !== f.type) {
						var l = f.arg, s = l.value;
						return s && "object" == r(s) && a.call(s, "__await") ? e.resolve(s.__await).then((function(t) {
							n("next", t, u, c);
						}), (function(t) {
							n("throw", t, u, c);
						})) : e.resolve(s).then((function(t) {
							l.value = t, u(l);
						}), (function(t) {
							return n("throw", t, u, c);
						}));
					}
					c(f.arg);
				}
				var o;
				u(this, "_invoke", { value: function(t, r) {
					function i() {
						return new e((function(e, o) {
							n(t, r, e, o);
						}));
					}
					return o = o ? o.then(i, i) : i();
				} });
			}
			function T(t, r, e) {
				var o = v;
				return function(i, a) {
					if (o === g) throw Error("Generator is already running");
					if (o === m) {
						if ("throw" === i) throw a;
						return {
							value: n,
							done: !0
						};
					}
					for (e.method = i, e.arg = a;;) {
						var u = e.delegate;
						if (u) {
							var c = k(u, e);
							if (c) {
								if (c === x) continue;
								return c;
							}
						}
						if ("next" === e.method) e.sent = e._sent = e.arg;
						else if ("throw" === e.method) {
							if (o === v) throw o = m, e.arg;
							e.dispatchException(e.arg);
						} else "return" === e.method && e.abrupt("return", e.arg);
						o = g;
						var f = y(t, r, e);
						if ("normal" === f.type) {
							if (o = e.done ? m : d, f.arg === x) continue;
							return {
								value: f.arg,
								done: e.done
							};
						}
						"throw" === f.type && (o = m, e.method = "throw", e.arg = f.arg);
					}
				};
			}
			function k(t, r) {
				var e = r.method, o = t.iterator[e];
				if (o === n) return r.delegate = null, "throw" === e && t.iterator.return && (r.method = "return", r.arg = n, k(t, r), "throw" === r.method) || "return" !== e && (r.method = "throw", r.arg = /* @__PURE__ */ new TypeError("The iterator does not provide a '" + e + "' method")), x;
				var i = y(o, t.iterator, r.arg);
				if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, x;
				var a = i.arg;
				return a ? a.done ? (r[t.resultName] = a.value, r.next = t.nextLoc, "return" !== r.method && (r.method = "next", r.arg = n), r.delegate = null, x) : a : (r.method = "throw", r.arg = /* @__PURE__ */ new TypeError("iterator result is not an object"), r.delegate = null, x);
			}
			function G(t) {
				var r = { tryLoc: t[0] };
				1 in t && (r.catchLoc = t[1]), 2 in t && (r.finallyLoc = t[2], r.afterLoc = t[3]), this.tryEntries.push(r);
			}
			function N(t) {
				var r = t.completion || {};
				r.type = "normal", delete r.arg, t.completion = r;
			}
			function F(t) {
				this.tryEntries = [{ tryLoc: "root" }], t.forEach(G, this), this.reset(!0);
			}
			function M(t) {
				if (t || "" === t) {
					var e = t[f];
					if (e) return e.call(t);
					if ("function" == typeof t.next) return t;
					if (!isNaN(t.length)) {
						var o = -1, i = function r() {
							for (; ++o < t.length;) if (a.call(t, o)) return r.value = t[o], r.done = !1, r;
							return r.value = n, r.done = !0, r;
						};
						return i.next = i;
					}
				}
				throw new TypeError(r(t) + " is not iterable");
			}
			return b.prototype = L, u(O, "constructor", {
				value: L,
				configurable: !0
			}), u(L, "constructor", {
				value: b,
				configurable: !0
			}), b.displayName = h(L, s, "GeneratorFunction"), o.isGeneratorFunction = function(t) {
				var r = "function" == typeof t && t.constructor;
				return !!r && (r === b || "GeneratorFunction" === (r.displayName || r.name));
			}, o.mark = function(t) {
				return Object.setPrototypeOf ? Object.setPrototypeOf(t, L) : (t.__proto__ = L, h(t, s, "GeneratorFunction")), t.prototype = Object.create(O), t;
			}, o.awrap = function(t) {
				return { __await: t };
			}, S(P.prototype), h(P.prototype, l, (function() {
				return this;
			})), o.AsyncIterator = P, o.async = function(t, r, e, n, i) {
				void 0 === i && (i = Promise);
				var a = new P(p(t, r, e, n), i);
				return o.isGeneratorFunction(r) ? a : a.next().then((function(t) {
					return t.done ? t.value : a.next();
				}));
			}, S(O), h(O, s, "Generator"), h(O, f, (function() {
				return this;
			})), h(O, "toString", (function() {
				return "[object Generator]";
			})), o.keys = function(t) {
				var r = Object(t), e = [];
				for (var n in r) e.push(n);
				return e.reverse(), function t() {
					for (; e.length;) {
						var n = e.pop();
						if (n in r) return t.value = n, t.done = !1, t;
					}
					return t.done = !0, t;
				};
			}, o.values = M, F.prototype = {
				constructor: F,
				reset: function(t) {
					if (this.prev = 0, this.next = 0, this.sent = this._sent = n, this.done = !1, this.delegate = null, this.method = "next", this.arg = n, this.tryEntries.forEach(N), !t) for (var r in this) "t" === r.charAt(0) && a.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = n);
				},
				stop: function() {
					this.done = !0;
					var t = this.tryEntries[0].completion;
					if ("throw" === t.type) throw t.arg;
					return this.rval;
				},
				dispatchException: function(t) {
					if (this.done) throw t;
					var r = this;
					function e(e, o) {
						return u.type = "throw", u.arg = t, r.next = e, o && (r.method = "next", r.arg = n), !!o;
					}
					for (var o = this.tryEntries.length - 1; o >= 0; --o) {
						var i = this.tryEntries[o], u = i.completion;
						if ("root" === i.tryLoc) return e("end");
						if (i.tryLoc <= this.prev) {
							var c = a.call(i, "catchLoc"), f = a.call(i, "finallyLoc");
							if (c && f) {
								if (this.prev < i.catchLoc) return e(i.catchLoc, !0);
								if (this.prev < i.finallyLoc) return e(i.finallyLoc);
							} else if (c) {
								if (this.prev < i.catchLoc) return e(i.catchLoc, !0);
							} else {
								if (!f) throw Error("try statement without catch or finally");
								if (this.prev < i.finallyLoc) return e(i.finallyLoc);
							}
						}
					}
				},
				abrupt: function(t, r) {
					for (var e = this.tryEntries.length - 1; e >= 0; --e) {
						var n = this.tryEntries[e];
						if (n.tryLoc <= this.prev && a.call(n, "finallyLoc") && this.prev < n.finallyLoc) {
							var o = n;
							break;
						}
					}
					o && ("break" === t || "continue" === t) && o.tryLoc <= r && r <= o.finallyLoc && (o = null);
					var i = o ? o.completion : {};
					return i.type = t, i.arg = r, o ? (this.method = "next", this.next = o.finallyLoc, x) : this.complete(i);
				},
				complete: function(t, r) {
					if ("throw" === t.type) throw t.arg;
					return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && r && (this.next = r), x;
				},
				finish: function(t) {
					for (var r = this.tryEntries.length - 1; r >= 0; --r) {
						var e = this.tryEntries[r];
						if (e.finallyLoc === t) return this.complete(e.completion, e.afterLoc), N(e), x;
					}
				},
				catch: function(t) {
					for (var r = this.tryEntries.length - 1; r >= 0; --r) {
						var e = this.tryEntries[r];
						if (e.tryLoc === t) {
							var n = e.completion;
							if ("throw" === n.type) {
								var o = n.arg;
								N(e);
							}
							return o;
						}
					}
					throw Error("illegal catch attempt");
				},
				delegateYield: function(t, r, e) {
					return this.delegate = {
						iterator: M(t),
						resultName: r,
						nextLoc: e
					}, "next" === this.method && (this.arg = n), x;
				}
			}, o;
		}
		t.exports = e, t.exports.__esModule = !0, t.exports.default = t.exports;
	})(o$9);
	u$8 = (0, o$9.exports)(), c$10 = u$8;
	try {
		regeneratorRuntime = u$8;
	} catch (r) {
		"object" === ("undefined" == typeof globalThis ? "undefined" : e$12(globalThis)) ? globalThis.regeneratorRuntime = u$8 : Function("r", "regeneratorRuntime = r")(u$8);
	}
	f$8 = n$8(c$10);
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/@babel/runtime/helpers/esm/typeof.js
function _typeof(o) {
	"@babel/helpers - typeof";
	return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof(o);
}
var init_typeof = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/@babel/runtime/helpers/esm/toPrimitive.js
function toPrimitive(t, r) {
	if ("object" != _typeof(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var init_toPrimitive = __esmMin((() => {
	init_typeof();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/@babel/runtime/helpers/esm/toPropertyKey.js
function toPropertyKey(t) {
	var i = toPrimitive(t, "string");
	return "symbol" == _typeof(i) ? i : i + "";
}
var init_toPropertyKey = __esmMin((() => {
	init_typeof();
	init_toPrimitive();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/@babel/runtime/helpers/esm/defineProperty.js
function _defineProperty(e, r, t) {
	return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
var init_defineProperty = __esmMin((() => {
	init_toPropertyKey();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/dist/esm/chunks/index-bc35b061.js
function H$3(E, e) {
	var t = Object.keys(E);
	if (Object.getOwnPropertySymbols) {
		var _ = Object.getOwnPropertySymbols(E);
		e && (_ = _.filter((function(e) {
			return Object.getOwnPropertyDescriptor(E, e).enumerable;
		}))), t.push.apply(t, _);
	}
	return t;
}
function p$8(e) {
	for (var t = 1; t < arguments.length; t++) {
		var _ = null != arguments[t] ? arguments[t] : {};
		t % 2 ? H$3(Object(_), !0).forEach((function(t) {
			_defineProperty(e, t, _[t]);
		})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(_)) : H$3(Object(_)).forEach((function(E) {
			Object.defineProperty(e, E, Object.getOwnPropertyDescriptor(_, E));
		}));
	}
	return e;
}
var e$7, t$8, _$4, S$7, n$7, T$2, A$4, R$3, r$10, a$15, D$7, C$6, I, O$2, N$6, o$8, i$13, M$4, c$9, P$3, L$5, u$7, d$6, s$6, l$8, U$2, F$5, m$6, f$7, W$1, B$3, g$5, k$2, h$4, G$1, K$1, b$4, y$5, w$7, V$3, Y$1, v$5, x$3, X$2, j$4, Q$1, q$2, Z$3, J$1, z$5, $$1, EE, eE, tE, _E;
var init_index_bc35b061 = __esmMin((() => {
	init_defineProperty();
	(function(E) {
		E.SHEET_AI_DATA_QA = "sheet_ai_data_qa", E.SHEET_AI_GENERATE_CHART = "sheet_ai_generate_chart", E.SLIDE_AI_GENERATE_NOTES = "slide_ai_generate_notes";
	})(t$8 || (t$8 = {})), function(E) {
		E.COURSE_SCHEDULE = "CourseSchedule", E.SCORE = "Score", E.NAMELIST = "NameList";
	}(_$4 || (_$4 = {})), function(E) {
		E.TENCENT_DOCS = "tencentdocs", E.TENCENT_QQ = "tencentqq", E.TENCENT_WENKU = "tencentwenku", E.TENCENT_SPACE = "tencentspace", E.TENCENT_QQ_MINI = "tencentqqmini";
	}(S$7 || (S$7 = {})), function(E) {
		E[E.CHAT_BUBBLE = 1] = "CHAT_BUBBLE", E[E.CHAT_INPUT = 2] = "CHAT_INPUT";
	}(n$7 || (n$7 = {})), function(E) {
		E[E.SEND = 1] = "SEND", E[E.PASTE = 2] = "PASTE", E[E.FILE = 3] = "FILE", E[E.GET_RECOMMEND_COMMAND = 4] = "GET_RECOMMEND_COMMAND";
	}(T$2 || (T$2 = {})), function(E) {
		E[E.NORMAL = 0] = "NORMAL", E[E.INSERT_BELOW = 1] = "INSERT_BELOW", E[E.REPLACE_SELECTION = 2] = "REPLACE_SELECTION";
	}(A$4 || (A$4 = {})), function(E) {
		E[E.SOURCE_UNSPECIFIED = 0] = "SOURCE_UNSPECIFIED", E[E.SOURCE_SMARTCANVAS = 1] = "SOURCE_SMARTCANVAS", E[E.SOURCE_DOC = 2] = "SOURCE_DOC", E[E.SOURCE_SHEET = 3] = "SOURCE_SHEET", E[E.SOURCE_SLIDE = 4] = "SOURCE_SLIDE", E[E.SOURCE_PDF = 5] = "SOURCE_PDF", E[E.SOURCE_RESUME = 6] = "SOURCE_RESUME", E[E.SOURCE_MIND = 7] = "SOURCE_MIND", E[E.SOURCE_DESKTOP = 8] = "SOURCE_DESKTOP", E[E.SOURCE_FORM = 9] = "SOURCE_FORM", E[E.SOURCE_FLOWCHART = 10] = "SOURCE_FLOWCHART", E[E.SOURCE_SMARTSHEET = 11] = "SOURCE_SMARTSHEET", E[E.SOURCE_BOARD = 12] = "SOURCE_BOARD", E[E.SOURCE_MARKDOWN = 13] = "SOURCE_MARKDOWN", E[E.SOURCE_IMAGE = 14] = "SOURCE_IMAGE", E[E.SOURCE_SPACE = 99] = "SOURCE_SPACE", E[E.SOURCE_SPACE_FOLDER = 100] = "SOURCE_SPACE_FOLDER";
	}(R$3 || (R$3 = {})), function(E) {
		E.FORM = "form", E.DOC = "doc", E.SHEET = "sheet", E.SLIDE = "slide", E.PDF = "pdf", E.MIND = "mind", E.FLOWCHART = "flowchart", E.SMARTCANVAS = "smartcanvas", E.SMARTSHEET = "smartsheet", E.MARKDOWN = "markdown";
	}(r$10 || (r$10 = {})), function(E) {
		E[E.FULLSCREEN = 0] = "FULLSCREEN", E[E.NON_FULLSCREEN = 1] = "NON_FULLSCREEN";
	}(a$15 || (a$15 = {})), function(E) {
		E.DESKTOP = "desktop", E.DOC = "doc", E.SMARTCANVAS = "smartcanvas", E.SHEET = "sheet", E.SMARTSHEET = "smartsheet", E.SLIDE = "slide", E.PDF = "pdf", E.FORM = "form", E.MIND = "mind", E.FLOWCHART = "flowchart", E.RESUME = "resume", E.MARKDOWN = "markdown", E.IMAGE = "image", E.SPACE = "space", E.BOARD = "board";
	}(D$7 || (D$7 = {})), function(E) {
		E[E.INSERT = 0] = "INSERT", E[E.REPLACE = 1] = "REPLACE", E[E.INSERT_BELOW = 2] = "INSERT_BELOW";
	}(C$6 || (C$6 = {})), function(E) {
		E.pageNum = "pageNum", E.templateStyle = "templateStyle", E.templateColor = "templateColor", E.writingStyle = "writingStyle", E.imageGeneration = "imageGeneration", E.generationMode = "genMode";
	}(I || (I = {})), function(E) {
		E.SYSTEM = "system", E.BOT = "assistant", E.USER = "user";
	}(O$2 || (O$2 = {})), function(E) {
		E[E.CREATE_FROM_MATERIALS = 0] = "CREATE_FROM_MATERIALS", E[E.VIEW_RESULTS = 1] = "VIEW_RESULTS", E[E.REGENERATE = 2] = "REGENERATE";
	}(N$6 || (N$6 = {})), function(E) {
		E[E.UNSPECIFIED = 0] = "UNSPECIFIED", E[E.CREATE_SLIDE = 1] = "CREATE_SLIDE", E[E.CREATE_DOC = 2] = "CREATE_DOC", E[E.CREATE_SHEET = 3] = "CREATE_SHEET", E[E.CREATE_FORM = 4] = "CREATE_FORM", E[E.CREATE_MINDMAP = 5] = "CREATE_MINDMAP", E[E.CREATE_SMART_CANVAS = 6] = "CREATE_SMART_CANVAS", E[E.CREATE_SMART_SHEET = 7] = "CREATE_SMART_SHEET", E[E.CREATE_RESUME = 8] = "CREATE_RESUME", E[E.CREATE_FLOW_CHART = 9] = "CREATE_FLOW_CHART", E[E.CREATE_PDF = 10] = "CREATE_PDF", E[E.SHEET_ROLLBACK = 11] = "SHEET_ROLLBACK", E[E.SHEET_CONFIRM = 12] = "SHEET_CONFIRM", E[E.SHEET_INSERT_FORMULA = 13] = "SHEET_INSERT_FORMULA", E[E.INSERT_CHART = 14] = "INSERT_CHART", E[E.INSERT_CONTENT = 16] = "INSERT_CONTENT", E[E.APPEND_NEW_CONTENT = 17] = "APPEND_NEW_CONTENT", E[E.MIND_ADD_CHILD_NODE = 18] = "MIND_ADD_CHILD_NODE", E[E.MIND_UPDATE_TITLE = 19] = "MIND_UPDATE_TITLE", E[E.MIND_INSERT_AS_DETACHED = 20] = "MIND_INSERT_AS_DETACHED", E[E.MIND_INSERT_TO_FILE = 21] = "MIND_INSERT_TO_FILE", E[E.GENERATE_SLIDE = 22] = "GENERATE_SLIDE", E[E.APPEND_REMARK = 23] = "APPEND_REMARK", E[E.INSERT_SHEET = 24] = "INSERT_SHEET", E[E.READ_IN_DEPTH = 25] = "READ_IN_DEPTH", E[E.PREVIEW = 26] = "PREVIEW", E[E.CREATE_MARKDOWN = 27] = "CREATE_MARKDOWN";
	}(o$8 || (o$8 = {})), function(E) {
		E.LOADING = "loading", E.SUCCESS = "success", E.NOMORE = "nomore", E.ERROR = "error";
	}(i$13 || (i$13 = {})), function(E) {
		E[E.START = -1] = "START", E[E.IN_PROGRESS = 0] = "IN_PROGRESS", E[E.FINISH = 1] = "FINISH", E[E.ERROR = 2] = "ERROR", E[E.STOP = 3] = "STOP", E[E.IN_THINKING = 4] = "IN_THINKING";
	}(M$4 || (M$4 = {})), function(E) {
		E[E.UNSPECIFIED = 0] = "UNSPECIFIED", E[E.TEXT_MARKDOWN = 1] = "TEXT_MARKDOWN", E[E.DOCUMENT = 2] = "DOCUMENT", E[E.TASK_CARD = 4] = "TASK_CARD", E[E.SLIDE_TEMPLATES = 5] = "SLIDE_TEMPLATES", E[E.RECOMMENDED_QUESTION = 6] = "RECOMMENDED_QUESTION", E[E.RECOMMENDED_COMMAND = 7] = "RECOMMENDED_COMMAND", E[E.RECOMMENDED_SUMARRY = 8] = "RECOMMENDED_SUMARRY", E[E.AUTH_TIP = 9] = "AUTH_TIP", E[E.MINIPROGRAM_IMPORT_DOC = 10] = "MINIPROGRAM_IMPORT_DOC", E[E.TEXT_SELECTION = 11] = "TEXT_SELECTION", E[E.RESUME_WELCOME = 12] = "RESUME_WELCOME";
	}(c$9 || (c$9 = {})), function(E) {
		E[E.HISTORY_MESSAGE = 0] = "HISTORY_MESSAGE", E[E.COMMERCIALIZE_NOTIFICATION = 1] = "COMMERCIALIZE_NOTIFICATION";
	}(P$3 || (P$3 = {})), function(E) {
		E[E.LINK = -1] = "LINK", E[E.UNSPECIFIED = 0] = "UNSPECIFIED", E[E.DOC = 1] = "DOC", E[E.SHEET = 2] = "SHEET", E[E.SLIDE = 3] = "SLIDE", E[E.FORM = 4] = "FORM", E[E.MINDMAP = 5] = "MINDMAP", E[E.SMART_CANVAS = 6] = "SMART_CANVAS", E[E.SMART_SHEET = 7] = "SMART_SHEET", E[E.RESUME = 8] = "RESUME", E[E.FLOW_CHART = 9] = "FLOW_CHART", E[E.PDF = 10] = "PDF", E[E.IMAGE = 11] = "IMAGE", E[E.FOLDER = 12] = "FOLDER", E[E.MARKDOWN = 13] = "MARKDOWN", E[E.WIKI = 20] = "WIKI";
	}(L$5 || (L$5 = {})), function(E) {
		E[E.UNSPECIFIED = 0] = "UNSPECIFIED", E[E.LIKE = 1] = "LIKE", E[E.DISLIKE = 2] = "DISLIKE";
	}(u$7 || (u$7 = {})), function(E) {
		E.PLAN = "plan", E.RECALL = "recall", E.CITING = "citing";
	}(d$6 || (d$6 = {})), function(E) {
		E.WECHAT = "wechat", E.DOCS = "docs", E.WENKU = "wenku", E.LINK = "link";
	}(s$6 || (s$6 = {})), function(E) {
		E.messageStatus = "messageStatus", E.renderId = "renderId", E.customDescription = "customDescription";
	}(l$8 || (l$8 = {})), function(E) {
		E[E.READ_IN_DEPTH_MODE_NORMAL = 0] = "READ_IN_DEPTH_MODE_NORMAL", E[E.READ_IN_DEPTH_MODE_PAPER = 1] = "READ_IN_DEPTH_MODE_PAPER", E[E.READ_IN_DEPTH_MODE_RESEARCH = 2] = "READ_IN_DEPTH_MODE_RESEARCH", E[E.READ_IN_DEPTH_MODE_FINANCIAL_REPORT = 3] = "READ_IN_DEPTH_MODE_FINANCIAL_REPORT", E[E.READ_IN_DEPTH_MODE_BOOK = 4] = "READ_IN_DEPTH_MODE_BOOK", E[E.READ_IN_DEPTH_MODE_POLICY = 5] = "READ_IN_DEPTH_MODE_POLICY", E[E.READ_IN_DEPTH_MODE_MIND = 6] = "READ_IN_DEPTH_MODE_MIND", E[E.READ_IN_DEPTH_MODE_SUMMARY = 7] = "READ_IN_DEPTH_MODE_SUMMARY", E[E.READ_IN_DEPTH = 8] = "READ_IN_DEPTH";
	}(U$2 || (U$2 = {})), function(E) {
		E.UPLOADING = "uploading", E.UPLOAD_SUCCESS = "upload_success", E.UPLOAD_FAILED = "upload_failed";
	}(F$5 || (F$5 = {})), function(E) {
		E.PREPARE = "prepare", E.EMBEDDING = "embedding", E.EMBEDDING_SUCCESS = "embedding_success", E.EMBEDDING_FAILED = "embedding_failed";
	}(m$6 || (m$6 = {})), function(E) {
		E.UPLOAD = "Upload", E.IMPORT = "Import";
	}(f$7 || (f$7 = {}));
	_E = {
		FilePrepareStatus: [m$6.PREPARE],
		FileLoadingStatus: [m$6.EMBEDDING, F$5.UPLOADING],
		FileSuccessStatus: [m$6.EMBEDDING_SUCCESS, F$5.UPLOAD_SUCCESS],
		FileErrorStatus: [m$6.EMBEDDING_FAILED, F$5.UPLOAD_FAILED],
		FileFinishStatus: [
			m$6.EMBEDDING_SUCCESS,
			F$5.UPLOAD_SUCCESS,
			m$6.EMBEDDING_FAILED,
			F$5.UPLOAD_FAILED
		]
	};
	_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(e$7 = {}, L$5.DOC, "文档"), L$5.SHEET, "表格"), L$5.SLIDE, "幻灯片"), L$5.FORM, "收集表"), L$5.MINDMAP, "思维导图"), L$5.SMART_CANVAS, "智能文档"), L$5.SMART_SHEET, "智能表格"), L$5.RESUME, "简历"), L$5.FLOW_CHART, "流程图"), L$5.PDF, "PDF"), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(e$7, L$5.IMAGE, "图片"), L$5.FOLDER, "文件夹"), L$5.LINK, "链接"), L$5.MARKDOWN, "Markdown"), L$5.WIKI, "空间"), function(E) {
		E.SLEEP = "sleep", E.STAND_BY = "standBy", E.WRITING = "writing", E.INPUT_COMPLETE = "inputComplete", E.EDIT_COMPLETE = "editComplete";
	}(W$1 || (W$1 = {})), function(E) {
		E.IDLE = "idle", E.WRITING = "writing", E.RE_WRITING = "reWriting", E.CONTINUE_WRITING = "continueWriting", E.STOPPED = "stopped";
	}(B$3 || (B$3 = {})), function(E) {
		E.IN_CONTEXT = "inContext", E.ON_BOARD = "onBoard";
	}(g$5 || (g$5 = {})), function(E) {
		E[E.TBD = -1] = "TBD", E[E.LIKE = 0] = "LIKE", E[E.UNLIKE = 1] = "UNLIKE";
	}(k$2 || (k$2 = {})), function(E) {
		E.WRITE = "write", E.WRITE_FROM_EMPTY = "writeFromEmpty", E.SELECTION = "selection", E.COMPLETED = "completed";
	}(h$4 || (h$4 = {})), function(E) {
		E.TO_SLEEP = "toSleep", E.TO_STAND_BY = "toStandBy", E.TO_WRITING = "toWriting", E.TO_EDIT_COMPLETE = "toEditComplete", E.TO_INPUT_COMPLETE = "toInputComplete", E.BACK_TO_STAND_BY = "backToStandBy", E.AI_BE_WAKE = "aiBeWake";
	}(G$1 || (G$1 = {})), (K$1 || (K$1 = {})).POLISHING = "polishing", (b$4 || (b$4 = {})).AIModalWrite = "AIModalWrite", function(E) {
		E.SNAPSHOT_EXTRACT_TEXT = "snapshot_extract_text", E.WORDS_EXPLAIN = "words_explain", E.WORDS_TRANSLATE = "words_translate";
	}(y$5 || (y$5 = {})), function(E) {
		E.CREATE_SLIDE = "createSlide", E.DEFAULT = "default";
	}(w$7 || (w$7 = {})), function(E) {
		E[E.PaymentByPrice = 0] = "PaymentByPrice", E[E.LimitedFree = 1] = "LimitedFree", E[E.FreeForVIP = 2] = "FreeForVIP", E[E.NeedVIPAndPay = 3] = "NeedVIPAndPay", E[E.Free = 4] = "Free", E[E.FreeForSuperVIP = 5] = "FreeForSuperVIP", E[E.ChargedByUsage = 6] = "ChargedByUsage", E[E.InAppPurchased = 7] = "InAppPurchased", E[E.NoRequirementType = 10] = "NoRequirementType";
	}(V$3 || (V$3 = {})), function(E) {
		E.TEXT_INPUT = "text", E.OPTION_INPUT = "option", E.TEXT_LABEL = "label", E.TEXT_INPUT_VALUE = "text-input-value";
	}(Y$1 || (Y$1 = {})), function(E) {
		E.SUMMARY = "summary", E.DEEPREAD = "deepread", E.MINDMAP = "mindMap", E.FILEQA = "fileQa", E.CHAT = "chat", E.BEAUTIFY = "beautify";
	}(v$5 || (v$5 = {})), function(E) {
		E[E.SidebarRead = 1] = "SidebarRead", E[E.AIWriting = 2] = "AIWriting", E[E.GeneratePPT = 3] = "GeneratePPT", E[E.GenerateMindMap = 4] = "GenerateMindMap", E[E.GeneratePageModal = 5] = "GeneratePageModal", E[E.SidebarNote = 6] = "SidebarNote", E[E.Rating = 7] = "Rating", E[E.FullReview = 8] = "FullReview", E[E.ChangeFont = 9] = "ChangeFont", E[E.ChangeThemeColor = 10] = "ChangeThemeColor", E[E.ChangeTemplate = 11] = "ChangeTemplate", E[E.DataQA = 12] = "DataQA", E[E.GenerateChart = 13] = "GenerateChart", E[E.Beautify = 14] = "Beautify";
	}(x$3 || (x$3 = {})), function(E) {
		E.MARKDOWN_SEARCH_REF = "tdocs-ai-search-ref", E.MARKDOWN_SEARCH_REF_TEXT = "tdocs-ai-search-ref-text", E.MARKDOWN_SEARCH_REF_CITATIOIN = "tdocs-ai-search-ref-citation";
	}(X$2 || (X$2 = {})), function(E) {
		E.MARKDOWN_LINK_CARD = "tdocs-link-card", E.MARKDOWN_EXCEL_CHART_IMAGE_EXCHANGER = "tdocs-excel-chart-image-exchanger";
	}(j$4 || (j$4 = {})), (Q$1 || (Q$1 = {})).MARKDOWN_TABLE_PREVIEW = "tdocs-table-preview", function(E) {
		E[E.PBDEFAULT = 0] = "PBDEFAULT", E[E.Area = 1] = "Area", E[E.Area3D = 2] = "Area3D", E[E.Line = 3] = "Line", E[E.Line3D = 4] = "Line3D", E[E.HighLowCloseStock = 5] = "HighLowCloseStock", E[E.Radar = 6] = "Radar", E[E.Scatter = 7] = "Scatter", E[E.Pie = 8] = "Pie", E[E.Pie3D = 9] = "Pie3D", E[E.Doughnut = 10] = "Doughnut", E[E.ClusteredBar = 11] = "ClusteredBar", E[E.ClusteredBar3D = 12] = "ClusteredBar3D", E[E.ClusteredColumn = 13] = "ClusteredColumn", E[E.ClusteredColumn3D = 14] = "ClusteredColumn3D", E[E.PieOfPie = 15] = "PieOfPie", E[E.Surface = 16] = "Surface", E[E.Surface3D = 17] = "Surface3D", E[E.Bubble = 18] = "Bubble", E[E.CustomCombo = 19] = "CustomCombo", E[E.BoxWhisker = 20] = "BoxWhisker", E[E.Column3D = 21] = "Column3D", E[E.Funnel = 22] = "Funnel", E[E.ParetoLine = 23] = "ParetoLine", E[E.RegionMap = 24] = "RegionMap", E[E.Sunburst = 25] = "Sunburst", E[E.Treemap = 26] = "Treemap", E[E.Waterfall = 27] = "Waterfall", E[E.WordCloud = 28] = "WordCloud", E[E.StackedBar = 29] = "StackedBar", E[E.PercentStackedBar = 30] = "PercentStackedBar", E[E.StackedBar3D = 31] = "StackedBar3D", E[E.PercentStackedBar3D = 32] = "PercentStackedBar3D", E[E.StackedColumn = 33] = "StackedColumn", E[E.PercentStackedColumn = 34] = "PercentStackedColumn", E[E.StackedColumn3D = 35] = "StackedColumn3D", E[E.PercentStackedColumn3D = 36] = "PercentStackedColumn3D", E[E.StackedLine = 37] = "StackedLine", E[E.PercentStackedLine = 38] = "PercentStackedLine", E[E.MarkerLine = 39] = "MarkerLine", E[E.StackedMarkerLine = 40] = "StackedMarkerLine", E[E.PercentStackedMarkerLine = 41] = "PercentStackedMarkerLine", E[E.StackedArea = 42] = "StackedArea", E[E.PercentStackedArea = 43] = "PercentStackedArea", E[E.StackedArea3D = 44] = "StackedArea3D", E[E.PercentStackedArea3D = 45] = "PercentStackedArea3D", E[E.BarOfPie = 46] = "BarOfPie", E[E.Histogram = 47] = "Histogram", E[E.SmoothLineAndMarkerScatter = 48] = "SmoothLineAndMarkerScatter", E[E.SmoothLineScatter = 49] = "SmoothLineScatter", E[E.StraightLineAndMarkerScatter = 50] = "StraightLineAndMarkerScatter", E[E.StraightLineScatter = 51] = "StraightLineScatter", E[E.Bubble3D = 52] = "Bubble3D", E[E.OpenHighLowCloseStock = 53] = "OpenHighLowCloseStock", E[E.VolumeHighLowCloseStock = 54] = "VolumeHighLowCloseStock", E[E.VolumeOpenHighLowCloseStock = 55] = "VolumeOpenHighLowCloseStock", E[E.WireframeSurface = 56] = "WireframeSurface", E[E.WireframeSurface3D = 57] = "WireframeSurface3D", E[E.MarkerRadar = 58] = "MarkerRadar", E[E.FilledRadar = 59] = "FilledRadar", E[E.ClusteredColumnAndLineCombo = 60] = "ClusteredColumnAndLineCombo", E[E.ClusteredColumnAndLineOnSecondaryAxisCombo = 61] = "ClusteredColumnAndLineOnSecondaryAxisCombo", E[E.StackedAreaAndClusteredColumnCombo = 62] = "StackedAreaAndClusteredColumnCombo";
	}(q$2 || (q$2 = {})), function(E) {
		E.CONTROL = "control", E.THINKING = "thinking", E.CONTENT = "content", E.REFERENCES = "references", E.BUTTON = "button", E.SUGGESTION = "suggestion", E.FUNCTION_CALL = "functionCall", E.ERROR = "error", E.DONE = "done", E.STOP = "stop", E.DESCRIPTION = "description";
	}(Z$3 || (Z$3 = {})), function(E) {
		E[E.BASED_ON_UNSPECIFIED = 0] = "BASED_ON_UNSPECIFIED", E[E.BASED_ON_NETWORK = 1] = "BASED_ON_NETWORK", E[E.BASED_ON_TOPIC = 2] = "BASED_ON_TOPIC";
	}(J$1 || (J$1 = {})), function(E) {
		E[E.FULLSCREEN = 12] = "FULLSCREEN", E[E.SUMMARY = 13] = "SUMMARY", E[E.NEWSLIDE = 14] = "NEWSLIDE";
	}(z$5 || (z$5 = {})), function(E) {
		E[E.ITEM_TYPE_UNKNOW = 0] = "ITEM_TYPE_UNKNOW", E[E.ITEM_TYPE_CONV = 1] = "ITEM_TYPE_CONV", E[E.ITEM_TYPE_GROUP = 2] = "ITEM_TYPE_GROUP";
	}($$1 || ($$1 = {})), function(E) {
		E.OPEN_AI_ASSISTANT = "openAiAssistant", E.CREATE_DOC_TYPE = "createDocType", E.SEND_COMMAND_ID = "sendCommandId", E.DEFAULT_AI_TAB = "defaultAITab", E.GENERATE_AI = "AIGenerate", E.DEEP_READ_TAB = "deepReadType", E.NO_PROMOTION = "no_promotion", E.EXPAND_TYPE = "expand_type", E.ACTIVEFEATURE = "activeFeature", E.FROM_PAGE = "from_page", E.AID_POSITION = "aid_position", E.SHOW_LAYOUT = "show_layout";
	}(EE || (EE = {})), (eE || (eE = {})).RESUME = "airesume", function(E) {
		E.ASSISTANT = "aicv_assistant", E.AI_WRITING = "aicv_aiwriting", E.AI_OTHER = "aicv_other";
	}(tE || (tE = {})), window.ai_version = p$8(p$8({}, window.ai_version || {}), {}, { interface: "1.164.0 - January 22, 2026 14:10:13" });
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/dist/esm/chunks/index-b1d71213.js
function V$2(e, n) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		n && (o = o.filter((function(n) {
			return Object.getOwnPropertyDescriptor(e, n).enumerable;
		}))), t.push.apply(t, o);
	}
	return t;
}
function B$2(n) {
	for (var t = 1; t < arguments.length; t++) {
		var o = null != arguments[t] ? arguments[t] : {};
		t % 2 ? V$2(Object(o), !0).forEach((function(t) {
			a$19(n, t, o[t]);
		})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(o)) : V$2(Object(o)).forEach((function(e) {
			Object.defineProperty(n, e, Object.getOwnPropertyDescriptor(o, e));
		}));
	}
	return n;
}
var import_react$30, import_classnames$13, import_react_dom$5, N$5, D$6, P$2, j$3, A, I$2, F$4, S;
var init_index_b1d71213 = __esmMin((() => {
	init_index_c23defda();
	init_index_e54e83c4();
	init_slicedToArray_e715395f();
	import_react$30 = /* @__PURE__ */ __toESM(require_react());
	init_index_4a868389();
	init_esm$6();
	init_esm$3();
	init_esm$7();
	init_index_bc35b061();
	init_dist();
	init_esm$4();
	init_esm$1();
	import_classnames$13 = /* @__PURE__ */ __toESM(require_classnames());
	init_index_ae78ab8c();
	init_style_inject_es_3984fa0f();
	import_react_dom$5 = /* @__PURE__ */ __toESM(require_react_dom());
	e$11(".ai-component-pc-textarea {\n  border: unset;\n  width: 100%;\n  min-height: 44px;\n  resize: none;\n  outline: none;\n  background-color: transparent;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  font-family: inherit;\n  font-size: 14px;\n  line-height: 24px;\n  transition: height 0.1s ease;\n}\n.ai-component-pc-textarea.ai-component-pc-textarea-bordered {\n  border: 1px solid var(--border-strong, rgba(0, 0, 0, 0.12));\n  border-radius: 12px;\n  padding: 8px;\n  box-sizing: border-box;\n}\n.ai-component-pc-textarea-empty::placeholder {\n  color: var(--text-medium, rgba(0, 0, 0, 0.48));\n}\n.ai-component-pc-textarea::-webkit-scrollbar {\n  width: 8px;\n}\n.ai-component-pc-textarea::-webkit-scrollbar-thumb {\n  background-color: var(--border-strong, rgba(0, 0, 0, 0.12));\n  border-radius: 5px;\n}\n");
	N$5 = "ai-component-pc-textarea", D$6 = function(n) {
		var t = n.placeholder, l = n.onChange, p = n.value, d = n.minRows, m = void 0 === d ? 3 : d, u = n.maxRows, f = void 0 === u ? 6 : u, x = n.disableAutoHeight, g = void 0 !== x && x, b = n.bordered, L = void 0 !== b && b, v = n.style, h = void 0 === v ? {} : v, w = n.maxCount, k = void 0 === w ? 5e4 : w, y = n.onFocus, E = n.onBlur, M = (0, import_react$30.useRef)(null), H = t$9((0, import_react$30.useState)(p || ""), 2), Z = H[0], z = H[1], P = t$9((0, import_react$30.useState)(!p), 2), j = P[0], A = P[1];
		(0, import_react$30.useEffect)((function() {
			p && p !== Z && (z(p), l?.(p));
		}), [p]);
		return (0, import_react$30.useEffect)((function() {
			(function() {
				if (!g) {
					var e = M.current;
					if (e) {
						e.style.height = "auto";
						var n = parseInt(getComputedStyle(e).lineHeight), t = n * m, o = n * f, c = e.scrollHeight;
						c <= t ? (e.style.height = "".concat(t, "px"), e.style.overflowY = "hidden") : c <= o ? (e.style.height = "".concat(c, "px"), e.style.overflowY = "hidden") : (e.style.height = "".concat(o, "px"), e.style.overflowY = "auto");
					}
				}
			})();
		}), [
			Z,
			m,
			f
		]), (0, import_react$30.useEffect)((function() {
			void 0 !== p && (z(p), A("" === p.trim()));
		}), [p]), import_react$30.createElement("textarea", {
			ref: M,
			className: (0, import_classnames$13.default)("".concat(N$5), a$19(a$19({}, "".concat(N$5, "-empty"), j), "".concat(N$5, "-bordered"), L)),
			placeholder: t,
			value: Z,
			onChange: function(e) {
				var n = e.target.value;
				if (n.length > k) return Snackbar_default.show({
					message: i$17("ux-atom.uploader-box.text-input-max-count", { count: k }),
					type: "error"
				}), void z(n.slice(0, k));
				z(n), A("" === n.trim()), l?.(n);
			},
			onFocus: function() {
				y?.();
			},
			onBlur: function() {
				E?.();
			},
			rows: m,
			style: h
		});
	};
	e$11(".ai-component-pc-menu {\n  background: var(--bg-lv1-default, #fff);\n  border-radius: 8px;\n  border: 1px solid var(--border-strong, rgba(0, 0, 0, 0.12));\n  box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.12);\n  padding: 8px 0;\n  min-width: 200px;\n  max-width: 260px;\n}\n.ai-component-pc-menu-item {\n  padding: 10px 18px;\n  cursor: pointer;\n  transition: background-color 0.2s ease;\n  user-select: none;\n}\n.ai-component-pc-menu-item:hover:not(.ai-component-pc-menu-item-disabled) {\n  background: var(--feedback-hover, rgba(51, 77, 102, 0.06));\n}\n.ai-component-pc-menu-item:active:not(.ai-component-pc-menu-item-disabled) {\n  background: var(--feedback-active, rgba(51, 77, 102, 0.08));\n}\n.ai-component-pc-menu-item-disabled {\n  cursor: not-allowed;\n  opacity: 0.5;\n}\n.ai-component-pc-menu-item-content {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  font-size: 12px;\n  font-weight: 400;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n}\n.ai-component-pc-menu-item-main {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  overflow: hidden;\n}\n.ai-component-pc-menu-item-icon {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.ai-component-pc-menu-item-label {\n  display: flex;\n  align-items: center;\n  line-height: 20px;\n}\n.ai-component-pc-menu-item-label-with-desc {\n  font-size: 14px;\n  font-weight: 500;\n}\n.ai-component-pc-menu-item-tag {\n  transform: scale(0.9);\n  padding: 4px;\n  margin-left: 4px;\n  font-size: 12px;\n  font-weight: 500;\n  line-height: 11px;\n  color: var(--text-link, #175ceb);\n  border-radius: 2px;\n  background-color: var(--tsp-fill-accent-medium, rgba(30, 111, 255, 0.08));\n}\n.ai-component-pc-menu-item-description {\n  color: var(--text-medium, rgba(0, 0, 0, 0.48));\n  font-size: 12px;\n  line-height: 16px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n");
	P$2 = "ai-component-pc-menu", j$3 = function(e) {
		var n = e.className, t = e.children;
		return import_react$30.createElement("div", { className: (0, import_classnames$13.default)(P$2, n) }, t);
	};
	j$3.Item = function(n) {
		var t = n.icon, o = n.onClick, a = n.description, i = n.tag, r = n.disabled, l = void 0 !== r && r, p = n.children;
		return import_react$30.createElement("div", {
			className: (0, import_classnames$13.default)("".concat(P$2, "-item"), a$19({}, "".concat(P$2, "-item-disabled"), l)),
			onClick: function() {
				!l && o && o();
			}
		}, import_react$30.createElement("div", { className: "".concat(P$2, "-item-content") }, t && import_react$30.createElement("span", { className: "".concat(P$2, "-item-icon") }, t), import_react$30.createElement("div", { className: "".concat(P$2, "-item-main") }, import_react$30.createElement("span", { className: (0, import_classnames$13.default)("".concat(P$2, "-item-label"), a$19({}, "".concat(P$2, "-item-label-with-desc"), a)) }, p, i && import_react$30.createElement("span", { className: "".concat(P$2, "-item-tag") }, i)), a && import_react$30.createElement("div", { className: "".concat(P$2, "-item-description") }, a))));
	};
	e$11(".ai-component-pc-add-link-modal .dui-modal-title {\n  margin-bottom: 0;\n}\n.ai-component-pc-add-link-modal-form {\n  width: 100%;\n}\n.ai-component-pc-add-link-modal-form > div {\n  margin-bottom: 0;\n}\n.ai-component-pc-add-link-modal .dui-modal-footer {\n  margin-top: 0;\n}\n");
	I$2 = function(e) {
		var n = e.callback, t = document.createElement("div");
		document.body.appendChild(t);
		var a = function() {
			import_react_dom$5.unmountComponentAtNode(t), t.remove();
		}, r = function() {
			var t = t$9((0, import_react$30.useState)(""), 2), r = t[0], l = t[1], d = t$9((0, import_react$30.useState)(""), 2), m = d[0], u = d[1], f = function() {
				/^https?:\/\/([\w-]+\.)+[\w-]+/.test(r) ? (n?.(r), a()) : u(i$17("ux-atom.add-link.tips-msg"));
			};
			return import_react$30.createElement(Modal_default, {
				className: "ai-component-pc-add-link-modal",
				zIndex: 1e4,
				maskClosable: !0,
				visible: !0,
				onClose: a,
				title: i$17("ux-atom.uploader-box.link"),
				onOk: f,
				onCancel: a
			}, import_react$30.createElement(Form_default, {
				className: "ai-component-pc-add-link-modal-form",
				layout: "vertical"
			}, import_react$30.createElement(Form_default.Item, { label: null }, import_react$30.createElement(Input_default, {
				className: "ai-component-pc-add-link-modal-form-input",
				placeholder: i$17("ux-atom.add-link.placeholder"),
				onChange: function(e) {
					l(e);
				},
				errorTip: m,
				autoFocus: !0,
				onKeyDown: function(e) {
					"Enter" === e.key && (e.preventDefault(), f());
				}
			}))));
		};
		return import_react_dom$5.render(import_react$30.createElement(r, null), t), a;
	};
	e$11(".ai-component-pc-icon-uploader li.dui-menu-item {\n  padding: 9px 16px;\n}\n.ai-component-pc-icon-uploader-icon {\n  box-sizing: content-box;\n  width: 24px;\n  height: 24px;\n  display: flex;\n  padding: 4px;\n  justify-content: center;\n  align-items: center;\n  margin-right: 4px;\n  cursor: pointer;\n  filter: var(--icon-invert);\n}\n.ai-component-pc-icon-uploader-icon:hover {\n  border-radius: 24px;\n  background-color: var(--feedback-hover, rgba(51, 77, 102, 0.06));\n}\n.ai-component-pc-icon-uploader-icon-disable {\n  opacity: 0.5;\n}\n.ai-component-pc-icon-uploader-dropdown .dui-tooltip-wrapper {\n  display: block;\n}\n.ai-component-pc-icon-uploader-text-modal {\n  width: 840px;\n}\n.ai-component-pc-icon-uploader-text-modal .ai-component-pc-textarea {\n  padding: 6px;\n  box-sizing: border-box;\n  border-radius: 4px;\n  height: 420px;\n  border: 1px solid var(--border-strong, rgba(0, 0, 0, 0.12));\n}\n"), function(e) {
		e.Online = "online", e.Local = "local", e.Url = "url", e.Text = "text", e.BeautifyPPT = "beautifyPPT", e.Image = "image";
	}(A || (A = {}));
	F$4 = "ai-component-pc-icon-uploader-modal", S = (0, import_react$30.forwardRef)((function(l, y) {
		var E = l.className, Z = l.onChange, z = l.onGetFileTaskManager, N = l.menuItem, P = void 0 === N ? [
			A.Online,
			A.Local,
			A.Url
		] : N, V = l.type, S = void 0 === V ? "icon" : V, U = l.disabled, R = l.hasTips, _ = void 0 === R || R, Y = l.tipsTxt, W = l.maxSize, G = l.mimeTypes, K = l.supportTypes, $ = l.onUpload, q = l.soltCom, J = l.initialFiles, Q = l.buttonSize, X = void 0 === Q ? "medium" : Q, ee = l.onConfirmUploaderItem, ne = (0, import_react$30.useRef)(""), oe = t$9((0, import_react$30.useState)(!1), 2), ce = oe[0], ae = oe[1], ie = Me$1({
			initialFiles: J,
			useEmbedding: !0,
			maxSize: W,
			mimeTypes: G,
			supportTypes: K,
			onUpload: function(e, n) {
				$?.(e, n);
			},
			onLocalTaskInit: function(e) {
				console.log("tasks", e);
			},
			onSizeLimit: function(e) {
				Snackbar_default.show({
					message: i$17("ux-atom.upload-size-imit", { size: e }),
					type: "error"
				});
			}
		}), re = ie.selectOnlineDoc, le = ie.uploadLocalDoc, pe = ie.onAddLinkSuccess, se = ie.importLocalFiles, de = ie.fileTasks, me = ie.fileTaskManager;
		(0, import_react$30.useImperativeHandle)(y, (function() {
			return {
				uploadLocalDoc: le,
				selectOnlineDoc: re
			};
		})), (0, import_react$30.useEffect)((function() {
			me && z(me);
		}), [me, z]), (0, import_react$30.useEffect)((function() {
			Z(de);
		}), [de]);
		var ue = function() {
			ee?.("网页链接"), I$2({ callback: function(e) {
				return pe(e);
			} });
		}, fe = function() {
			var e = e$8(f$8.mark((function e(o) {
				var c, a, i;
				return f$8.wrap((function(e) {
					for (;;) switch (e.prev = e.next) {
						case 0: return e.next = 2, v$6.getInstance().checkIsSVIP();
						case 2:
							c = e.sent, a = "", e.t0 = o.status, e.next = e.t0 === Te$2.OverLimit ? 7 : e.t0 === Te$2.UserSizeLimit ? 10 : 13;
							break;
						case 7: return a = c ? "立刻扩容" : "开通会员", i = function() {
							O$3.payVIP({ aid: "美化PPT" });
						}, e.abrupt("break", 15);
						case 10: return a = c ? "立刻扩容" : "开通会员", i = function() {
							var e = e$8(f$8.mark((function e() {
								return f$8.wrap((function(e) {
									for (;;) switch (e.prev = e.next) {
										case 0: return e.next = 2, O$3.getStorageOverflowExtension();
										case 2: e.sent.show({
											errorCode: O$4.OWNER_OVERFLOW,
											aidOptions: "美化PPT"
										});
										case 4:
										case "end": return e.stop();
									}
								}), e);
							})));
							return function() {
								return e.apply(this, arguments);
							};
						}(), e.abrupt("break", 15);
						case 13: return a = i$17("ux-atom.uploader-box.beautify-ppt-error"), e.abrupt("break", 15);
						case 15: return e.abrupt("return", {
							message: o.message,
							action: a,
							onClickAction: i
						});
						case 16:
						case "end": return e.stop();
					}
				}), e);
			})));
			return function(n) {
				return e.apply(this, arguments);
			};
		}(), xe = function() {
			var e, o;
			ee?.("美化PPT"), se({
				maxNumber: 1,
				supportTypes: PowerPointMimeTypes,
				options: {
					style: "Silence",
					mode: f$7.IMPORT
				},
				onAfterInitTasks: (o = e$8(f$8.mark((function e() {
					return f$8.wrap((function(e) {
						for (;;) switch (e.prev = e.next) {
							case 0: Snackbar_default.show({
								message: i$17("ux-atom.uploader-box.beautify-ppt-loading"),
								type: "loading",
								autoClose: !1
							});
							case 1:
							case "end": return e.stop();
						}
					}), e);
				}))), function() {
					return o.apply(this, arguments);
				}),
				onTaskFinish: (e = e$8(f$8.mark((function e(n) {
					var o, c, a;
					return f$8.wrap((function(e) {
						for (;;) switch (e.prev = e.next) {
							case 0:
								if (!n.currentTask.fileUrl) {
									e.next = 5;
									break;
								}
								Snackbar_default.closeAll(!0), openUrl({ url: "".concat(n.currentTask.fileUrl, "?openAiAssistant=").concat(x$3.Beautify) }), e.next = 12;
								break;
							case 5: return o = n.currentTask, c = o.extra, e.next = 9, fe(c);
							case 9: a = e.sent, Snackbar_default.closeAll(!0), Snackbar_default.show(B$2({
								type: "error",
								duration: 2e3
							}, a));
							case 12:
							case "end": return e.stop();
						}
					}), e);
				}))), function(n) {
					return e.apply(this, arguments);
				})
			});
		}, ge = function() {
			ee?.("输入文本");
			var e = Modal_default.confirm({
				title: i$17("ux-atom.uploader-box.text-input"),
				style: { zIndex: 1e4 },
				maskStyle: { zIndex: 1e4 },
				content: import_react$30.createElement(D$6, {
					placeholder: i$17("ux-atom.uploader-box.text-input-placeholder"),
					disableAutoHeight: !0,
					onChange: function(e) {
						ne.current = e, t({ okDisabled: !ne.current || 0 === ne.current.trim().length });
					}
				}),
				className: "".concat(F$4, " ai-component-pc-icon-uploader-text-modal"),
				onOk: function() {
					var e = new TextEncoder(), n = ne.current.slice(0, 120), t = e.encode(ne.current).buffer, o = new Blob([t], { type: "text/plain" });
					le({ files: [new File([o], "".concat(n, ".txt"), {
						type: "text/plain",
						lastModified: Date.now()
					})] }), ne.current = "";
				},
				onCancel: function() {
					ne.current = "", n();
				},
				okDisabled: !ne.current || 0 === ne.current.trim().length
			}), n = e.close, t = e.update;
		}, be = function() {
			ee?.("图片转思维导图");
			var e = document.getElementById("ai-component-pc-img-to-mind-mount-dom");
			if (!e) {
				var n = document.createElement("div");
				n.id = "ai-component-pc-img-to-mind-mount-dom", n.className = F$4, document.body.appendChild(n), e = n;
			}
			O$3.showImageToMindModal(e, (function() {
				e && e.remove();
			}));
		};
		if (!P || 0 === P.length) return null;
		var Le = [
			{
				id: A.Online,
				label: i$17("ux-atom.uploader-box.online-tencent-docs"),
				description: i$17("ux-atom.uploader-box.online-tencent-docs-desc"),
				onClick: function() {
					return c$14(e$8(f$8.mark((function e() {
						return f$8.wrap((function(e) {
							for (;;) switch (e.prev = e.next) {
								case 0: ee?.("腾讯文档"), re(!1);
								case 2:
								case "end": return e.stop();
							}
						}), e);
					}))));
				},
				icon: import_react$30.createElement(m$9, {
					src: "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M16.6557 4.375L20.6759 8.10938L18.723 18.8691C18.6451 19.3073 18.2632 19.625 17.8188 19.625H12.3075L13.8586 11.7071L15.9758 11.707L12.6858 8.422L12.2505 10.3241L8.67581 10.331L9.95881 11.707L12.0426 11.7071L10.4934 19.625H4.29309C3.72321 19.625 3.28881 19.1116 3.38892 18.5498L5.7637 5.13083C5.84158 4.69262 6.22346 4.375 6.66785 4.375H16.6557ZM17.5418 18.375L18.5298 12.93L17.3421 12.9571L14.8868 12.957L13.8258 18.375H17.5418ZM4.68881 18.375L6.24881 9.56L9.41483 12.9571L10.5238 12.957L9.46381 18.375H4.68881ZM19.3238 8.559L16.1658 5.625H6.94481L6.33281 9.086L11.2538 9.076L11.9724 5.94321L18.5978 12.558L19.3238 8.559Z' fill='%23454D5A'/%3e%3c/svg%3e",
					size: 24
				})
			},
			{
				id: A.Local,
				label: i$17("ux-atom.uploader-box.local-file"),
				description: i$17("ux-atom.uploader-box.local-file-desc", { format: PowerPointMimeTypes.some((function(e) {
					return null == K ? void 0 : K.includes(e);
				})) ? "ppt、pptx" : "doc、docx" }),
				onClick: function() {
					return c$14(e$8(f$8.mark((function e() {
						return f$8.wrap((function(e) {
							for (;;) switch (e.prev = e.next) {
								case 0: ee?.("本地文件"), le();
								case 2:
								case "end": return e.stop();
							}
						}), e);
					}))));
				},
				icon: import_react$30.createElement(m$9, {
					src: "data:image/svg+xml,%3csvg width='25' height='25' viewBox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M13.3823 7.74295C13.6105 7.94382 13.9041 8.05462 14.2082 8.05462H19.4889L19.4889 10.3217L7.85497 10.3217C7.50979 10.3217 7.22997 10.6015 7.22997 10.9467V16.4519C7.22997 17.2278 6.62517 17.8284 5.95093 17.8413L5.95094 17.8421C5.62177 17.7822 5.37232 17.4938 5.3728 17.1474L5.38783 6.35352L11.8036 6.35352L13.3823 7.74295ZM8.08546 17.8535L18.295 17.8535C18.9544 17.8535 19.489 17.3189 19.489 16.6595L19.4889 11.5717L8.47997 11.5717V16.4519C8.47997 16.9611 8.33583 17.4437 8.08546 17.8535ZM20.739 16.2052V16.6595C20.739 18.0093 19.6448 19.1035 18.295 19.1035L6.07797 19.1035C4.9971 19.1035 4.1213 18.2265 4.1228 17.1456L4.1382 6.07974C4.13896 5.54037 4.57642 5.10352 5.11579 5.10352L12.0171 5.10352C12.1836 5.10352 12.3443 5.16418 12.4692 5.27414L14.2082 6.80462H19.7614C20.3013 6.80462 20.7389 7.2423 20.7389 7.7822V10.8768C20.7415 10.8999 20.7429 10.9232 20.7429 10.9467V16.2052H20.739Z' fill='%23454D5A'/%3e%3c/svg%3e",
					size: 24
				})
			},
			{
				id: A.Url,
				label: i$17("ux-atom.uploader-box.link"),
				description: i$17("ux-atom.uploader-box.link-desc"),
				onClick: function() {
					return c$14(ue);
				},
				icon: import_react$30.createElement(m$9, {
					src: "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8'%3f%3e%3csvg width='24px' height='24px' viewBox='0 0 24 24' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e %3ctitle%3etoolbar_add_link%3c/title%3e %3cg id='%e6%8e%a7%e4%bb%b6' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3e %3cg id='%e7%bc%96%e7%bb%84' fill='%23464D5A' fill-rule='nonzero'%3e %3cg id='%e5%bd%a2%e7%8a%b6%e7%bb%93%e5%90%88'%3e %3cpath d='M12.9827282%2c9.67619386 C13.2460803%2c9.84342437 13.4961285%2c10.0426938 13.7267173%2c10.2732827 C15.4244276%2c11.9709929 15.4244276%2c14.723525 13.7267173%2c16.4212352 L11.4212352%2c18.7267173 C9.72352495%2c20.4244276 6.97099286%2c20.4244276 5.27328265%2c18.7267173 C3.57557245%2c17.0290071 3.57557245%2c14.276475 5.27328265%2c12.5787648 L7.09587091%2c10.7552556 C7.20873369%2c11.1904702 7.41684345%2c11.5873146 7.69662436%2c11.922213 L6.15716613%2c13.4626483 C4.94761129%2c14.6722032 4.94761129%2c16.633279 6.15716613%2c17.8428339 C7.32019963%2c19.0058674 9.17805657%2c19.0505994 10.394538%2c17.97703 L10.5373517%2c17.8428339 L12.8428339%2c15.5373517 C14.0058674%2c14.3743182 14.0505994%2c12.5164612 12.97703%2c11.2999798 L12.8428339%2c11.1571661 L12.7890474%2c11.1072562 C12.9251701%2c10.7646731 13%2c10.3910753 13%2c10 C13%2c9.89059808 12.994144%2c9.78256391 12.9827282%2c9.67619386 Z M18.7267173%2c5.27328265 C20.4244276%2c6.97099286 20.4244276%2c9.72352495 18.7267173%2c11.4212352 L17.1937153%2c12.9536176 C16.9039917%2c12.6431687 16.5491476%2c12.3942797 16.150947%2c12.2287143 L17.8428339%2c10.5373517 C19.0058674%2c9.37431818 19.0505994%2c7.51646124 17.97703%2c6.29997979 L17.8428339%2c6.15716613 C16.6798004%2c4.99413263 14.8219434%2c4.94940057 13.605462%2c6.02296996 L13.4626483%2c6.15716613 L11.1571661%2c8.46264832 C9.94761129%2c9.67220316 9.94761129%2c11.633279 11.1571661%2c12.8428339 C11.5056774%2c13.1913452 11.91658%2c13.4394393 12.35392%2c13.5871161 C12.1594788%2c13.9480465 12.0375095%2c14.3555659 12.0073481%2c14.7883822 C11.3736085%2c14.584716 10.7770134%2c14.2304481 10.2732827%2c13.7267173 C8.57557245%2c12.0290071 8.57557245%2c9.27647505 10.2732827%2c7.57876484 L12.5787648%2c5.27328265 C14.276475%2c3.57557245 17.0290071%2c3.57557245 18.7267173%2c5.27328265 Z'%3e%3c/path%3e %3c/g%3e %3c/g%3e %3c/g%3e%3c/svg%3e",
					size: 24
				})
			},
			{
				id: A.Text,
				label: i$17("ux-atom.uploader-box.text-input"),
				description: i$17("ux-atom.uploader-box.text-input-desc"),
				onClick: function() {
					return c$14(ge);
				},
				icon: import_react$30.createElement(m$9, {
					src: "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M5.83929 5.83929V18.1607H18.1607V5.83929H5.83929ZM5.57143 4.5C4.97969 4.5 4.5 4.9797 4.5 5.57143V18.4286C4.5 19.0203 4.9797 19.5 5.57143 19.5H18.4286C19.0203 19.5 19.5 19.0203 19.5 18.4286V5.57143C19.5 4.97969 19.0203 4.5 18.4286 4.5H5.57143Z' fill='%2381868F'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M9.7069 16H8.5L11.3966 8H11.3966H12.6034H12.6035L15.5001 16H14.2932L13.6595 14.25H10.3405L9.7069 16ZM10.7931 13H13.207L12 9.66658L10.7931 13Z' fill='%2381868F'/%3e%3c/svg%3e",
					size: 24
				})
			},
			{
				id: A.BeautifyPPT,
				label: i$17("ux-atom.uploader-box.beautify-ppt"),
				description: i$17("ux-atom.uploader-box.beautify-ppt-desc"),
				tag: i$17("ux-atom.uploader-box.beautify-ppt-tag"),
				onClick: function() {
					return c$14(xe);
				},
				icon: import_react$30.createElement(m$9, {
					src: "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M14.6764 5.77207L15.5668 3.99121L16.4572 5.77207L18.2381 6.6625L16.4572 7.55293L15.5668 9.3338L14.6764 7.55293L12.8955 6.6625L14.6764 5.77207Z' fill='%23454D5A'/%3e%3cpath d='M5.99458 14.6765L6.6624 13.3408L7.33023 14.6765L8.66587 15.3443L7.33023 16.0121L6.6624 17.3478L5.99458 16.0121L4.65894 15.3443L5.99458 14.6765Z' fill='%23454D5A'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M7.55273 10.3867L10.3861 7.55339L11.27 8.43727L8.43662 11.2706L7.55273 10.3867Z' fill='%23454D5A'/%3e%3cpath d='M6.69405 4.43007L19.662 17.398L17.3978 19.6623L4.42978 6.69434L6.69405 4.43007Z' stroke='%23454D5A' stroke-width='1.25'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M10.5437 9.16376L18.7781 17.3982L17.3978 18.7786L9.16327 10.5441L10.5437 9.16376ZM9.65977 8.27988L6.69405 5.31415L5.31367 6.69453L8.27939 9.66026L9.65977 8.27988ZM6.69405 3.54639L7.57793 4.43027L19.662 16.5144L20.5459 17.3982L19.662 18.2821L18.2816 19.6625L17.3978 20.5464L16.5139 19.6625L4.42978 7.57842L3.5459 6.69453L4.42978 5.81065L5.81016 4.43027L6.69405 3.54639ZM15.5668 3.99141L14.6764 5.77227L12.8955 6.6627L14.6764 7.55313L15.5668 9.33399L16.4572 7.55313L18.2381 6.6627L16.4572 5.77227L15.5668 3.99141ZM6.6624 13.341L5.99458 14.6767L4.65894 15.3445L5.99458 16.0123L6.6624 17.348L7.33023 16.0123L8.66587 15.3445L7.33023 14.6767L6.6624 13.341Z' fill='%23454D5A'/%3e%3c/svg%3e",
					size: 24
				})
			},
			{
				id: A.Image,
				label: i$17("ux-atom.uploader-box.image"),
				description: i$17("ux-atom.uploader-box.image-desc"),
				onClick: function() {
					return c$14(be);
				},
				icon: import_react$30.createElement(m$9, {
					src: "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M4.75 5.11328C4.19793 5.11354 3.75 5.56115 3.75 6.11328V17.8887L3.75488 17.9912C3.8029 18.4614 4.17726 18.8358 4.64746 18.8838L4.75 18.8887H19.25L19.3525 18.8838C19.8228 18.8359 20.1971 18.4615 20.2451 17.9912L20.25 17.8887V6.11328C20.25 5.561 19.8023 5.11328 19.25 5.11328H4.75ZM9.10156 12.0215C9.37264 11.751 9.81434 11.7597 10.0742 12.041L13.249 15.4805C13.4805 15.7312 13.8606 15.7762 14.1445 15.5869L15.3154 14.8066C15.574 14.6345 15.9165 14.6603 16.1465 14.8691L19 17.4629V17.6387H5V16.123L9.10156 12.0215ZM19 15.7734L16.9873 13.9443C16.3329 13.3496 15.3579 13.2763 14.6221 13.7666L13.8457 14.2832L10.9932 11.1934C10.2516 10.3901 8.98992 10.3648 8.2168 11.1377L5 14.3545V6.36328H19V15.7734ZM14.7773 7.53516C13.7353 7.64088 12.9219 8.5209 12.9219 9.59082L12.9326 9.80176C13.0384 10.8437 13.9185 11.6572 14.9883 11.6572L15.1992 11.6465C16.1718 11.5478 16.9452 10.7743 17.0439 9.80176L17.0547 9.59082C17.0547 8.44977 16.1293 7.52462 14.9883 7.52441L14.7773 7.53516ZM14.9883 8.77441C15.4389 8.77462 15.8047 9.14013 15.8047 9.59082C15.8045 10.0414 15.4388 10.407 14.9883 10.4072C14.5376 10.4072 14.172 10.0415 14.1719 9.59082C14.1719 9.14004 14.5375 8.77448 14.9883 8.77441Z' fill='%23454D5A'/%3e%3c/svg%3e",
					size: 24
				})
			}
		], ve = null == P ? void 0 : P.map((function(e) {
			return Le.find((function(n) {
				return n.id === e;
			})) || null;
		})).filter((function(e) {
			return null !== e;
		})), he = import_react$30.createElement(j$3, { className: "ai-component-pc-icon-uploader" }, ve.map((function(e, n) {
			return import_react$30.createElement(j$3.Item, {
				key: n,
				icon: e.icon,
				onClick: e.onClick,
				description: e.description,
				tag: e.tag
			}, e.label);
		}))), we = null != Y ? Y : i$17("ux-atom.icon-uploader.attachment-upload-tips");
		return import_react$30.createElement(Dropdown_default, {
			className: (0, import_classnames$13.default)("ai-component-pc-icon-uploader-dropdown", E),
			dropContent: U ? null : he,
			onVisibleChange: function(e) {
				ae(e);
			}
		}, import_react$30.createElement(Tooltip_default, {
			disabled: !_,
			title: we,
			hideOnClick: !0
		}, q || ("text" === S ? import_react$30.createElement("div", {
			className: (0, import_classnames$13.default)("".concat("ai-component-pc-dropdown-button"), a$19(a$19({}, "".concat("ai-component-pc-dropdown-button", "-active"), ce), "".concat("ai-component-pc-dropdown-button", "-").concat(X), !0)),
			style: { padding: "0 12px" }
		}, import_react$30.createElement("span", { className: "".concat("ai-component-pc-dropdown-button", "-label") }, i$17("ux-atom.icon-uploader.attachment-upload-tips"))) : import_react$30.createElement("img", {
			src: "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M11.7002 4.54C13.4202 2.82 16.2202 2.82 17.9402 4.54C19.6102 6.2 19.6602 8.87 18.1002 10.59L17.9402 10.76L12.3202 16.35C11.3102 17.35 9.68019 17.35 8.67019 16.35C7.70019 15.39 7.66019 13.85 8.54019 12.84L8.67019 12.71L14.2902 7.12C14.5802 6.83 15.0602 6.83 15.3502 7.12C15.6202 7.39 15.6402 7.8 15.4202 8.1L15.3502 8.18L9.73019 13.77C9.31019 14.19 9.31019 14.87 9.73019 15.29C10.1202 15.68 10.7402 15.71 11.1702 15.37L11.2602 15.29L16.8802 9.7C18.0202 8.57 18.0202 6.74 16.8802 5.6C15.7902 4.51 14.0402 4.47 12.9002 5.47L12.7602 5.6L7.14019 11.19C5.29019 13.03 5.29019 16.02 7.14019 17.87C8.94019 19.66 11.8202 19.71 13.6802 18.03L13.8502 17.87L19.4702 12.28C19.7602 11.99 20.2402 11.99 20.5302 12.28C20.8002 12.55 20.8202 12.96 20.6002 13.26L20.5302 13.34L14.9102 18.93C12.4702 21.36 8.52019 21.36 6.08019 18.93C3.70019 16.56 3.64019 12.75 5.90019 10.31L6.08019 10.12L11.7002 4.53V4.54Z' fill='%23464D5A'/%3e%3c/svg%3e",
			className: (0, import_classnames$13.default)("ai-component-pc-icon-uploader-icon", { "ai-component-pc-icon-uploader-icon-disable": !!U })
		}))));
	}));
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_freeGlobal.js
var freeGlobal;
var init__freeGlobal = __esmMin((() => {
	freeGlobal = typeof globalThis == "object" && globalThis && globalThis.Object === Object && globalThis;
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_root.js
var freeSelf, root;
var init__root = __esmMin((() => {
	init__freeGlobal();
	freeSelf = typeof self == "object" && self && self.Object === Object && self;
	root = freeGlobal || freeSelf || Function("return this")();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_Symbol.js
var Symbol$1;
var init__Symbol = __esmMin((() => {
	init__root();
	Symbol$1 = root.Symbol;
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_getRawTag.js
/**
* A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
*
* @private
* @param {*} value The value to query.
* @returns {string} Returns the raw `toStringTag`.
*/
function getRawTag(value) {
	var isOwn = hasOwnProperty$14.call(value, symToStringTag$1), tag = value[symToStringTag$1];
	try {
		value[symToStringTag$1] = void 0;
		var unmasked = true;
	} catch (e) {}
	var result = nativeObjectToString$1.call(value);
	if (unmasked) if (isOwn) value[symToStringTag$1] = tag;
	else delete value[symToStringTag$1];
	return result;
}
var objectProto$4, hasOwnProperty$14, nativeObjectToString$1, symToStringTag$1;
var init__getRawTag = __esmMin((() => {
	init__Symbol();
	objectProto$4 = Object.prototype;
	hasOwnProperty$14 = objectProto$4.hasOwnProperty;
	nativeObjectToString$1 = objectProto$4.toString;
	symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : void 0;
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_objectToString.js
/**
* Converts `value` to a string using `Object.prototype.toString`.
*
* @private
* @param {*} value The value to convert.
* @returns {string} Returns the converted string.
*/
function objectToString(value) {
	return nativeObjectToString.call(value);
}
var nativeObjectToString;
var init__objectToString = __esmMin((() => {
	nativeObjectToString = Object.prototype.toString;
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_baseGetTag.js
/**
* The base implementation of `getTag` without fallbacks for buggy environments.
*
* @private
* @param {*} value The value to query.
* @returns {string} Returns the `toStringTag`.
*/
function baseGetTag(value) {
	if (value == null) return value === void 0 ? undefinedTag : nullTag;
	return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}
var nullTag, undefinedTag, symToStringTag;
var init__baseGetTag = __esmMin((() => {
	init__Symbol();
	init__getRawTag();
	init__objectToString();
	nullTag = "[object Null]", undefinedTag = "[object Undefined]";
	symToStringTag = Symbol$1 ? Symbol$1.toStringTag : void 0;
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/isObjectLike.js
/**
* Checks if `value` is object-like. A value is object-like if it's not `null`
* and has a `typeof` result of "object".
*
* @static
* @memberOf _
* @since 4.0.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is object-like, else `false`.
* @example
*
* _.isObjectLike({});
* // => true
*
* _.isObjectLike([1, 2, 3]);
* // => true
*
* _.isObjectLike(_.noop);
* // => false
*
* _.isObjectLike(null);
* // => false
*/
function isObjectLike(value) {
	return value != null && typeof value == "object";
}
var init_isObjectLike = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/isSymbol.js
/**
* Checks if `value` is classified as a `Symbol` primitive or object.
*
* @static
* @memberOf _
* @since 4.0.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
* @example
*
* _.isSymbol(Symbol.iterator);
* // => true
*
* _.isSymbol('abc');
* // => false
*/
function isSymbol(value) {
	return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag$3;
}
var symbolTag$3;
var init_isSymbol = __esmMin((() => {
	init__baseGetTag();
	init_isObjectLike();
	symbolTag$3 = "[object Symbol]";
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_arrayMap.js
/**
* A specialized version of `_.map` for arrays without support for iteratee
* shorthands.
*
* @private
* @param {Array} [array] The array to iterate over.
* @param {Function} iteratee The function invoked per iteration.
* @returns {Array} Returns the new mapped array.
*/
function arrayMap(array, iteratee) {
	var index = -1, length = array == null ? 0 : array.length, result = Array(length);
	while (++index < length) result[index] = iteratee(array[index], index, array);
	return result;
}
var init__arrayMap = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/isArray.js
var isArray;
var init_isArray = __esmMin((() => {
	isArray = Array.isArray;
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_baseToString.js
/**
* The base implementation of `_.toString` which doesn't convert nullish
* values to empty strings.
*
* @private
* @param {*} value The value to process.
* @returns {string} Returns the string.
*/
function baseToString(value) {
	if (typeof value == "string") return value;
	if (isArray(value)) return arrayMap(value, baseToString) + "";
	if (isSymbol(value)) return symbolToString ? symbolToString.call(value) : "";
	var result = value + "";
	return result == "0" && 1 / value == -INFINITY$1 ? "-0" : result;
}
var INFINITY$1, symbolProto$2, symbolToString;
var init__baseToString = __esmMin((() => {
	init__Symbol();
	init__arrayMap();
	init_isArray();
	init_isSymbol();
	INFINITY$1 = Infinity;
	symbolProto$2 = Symbol$1 ? Symbol$1.prototype : void 0, symbolToString = symbolProto$2 ? symbolProto$2.toString : void 0;
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_trimmedEndIndex.js
/**
* Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
* character of `string`.
*
* @private
* @param {string} string The string to inspect.
* @returns {number} Returns the index of the last non-whitespace character.
*/
function trimmedEndIndex(string) {
	var index = string.length;
	while (index-- && reWhitespace.test(string.charAt(index)));
	return index;
}
var reWhitespace;
var init__trimmedEndIndex = __esmMin((() => {
	reWhitespace = /\s/;
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_baseTrim.js
/**
* The base implementation of `_.trim`.
*
* @private
* @param {string} string The string to trim.
* @returns {string} Returns the trimmed string.
*/
function baseTrim(string) {
	return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
}
var reTrimStart;
var init__baseTrim = __esmMin((() => {
	init__trimmedEndIndex();
	reTrimStart = /^\s+/;
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/isObject.js
/**
* Checks if `value` is the
* [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
* of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
*
* @static
* @memberOf _
* @since 0.1.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is an object, else `false`.
* @example
*
* _.isObject({});
* // => true
*
* _.isObject([1, 2, 3]);
* // => true
*
* _.isObject(_.noop);
* // => true
*
* _.isObject(null);
* // => false
*/
function isObject(value) {
	var type = typeof value;
	return value != null && (type == "object" || type == "function");
}
var init_isObject = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/toNumber.js
/**
* Converts `value` to a number.
*
* @static
* @memberOf _
* @since 4.0.0
* @category Lang
* @param {*} value The value to process.
* @returns {number} Returns the number.
* @example
*
* _.toNumber(3.2);
* // => 3.2
*
* _.toNumber(Number.MIN_VALUE);
* // => 5e-324
*
* _.toNumber(Infinity);
* // => Infinity
*
* _.toNumber('3.2');
* // => 3.2
*/
function toNumber(value) {
	if (typeof value == "number") return value;
	if (isSymbol(value)) return NAN;
	if (isObject(value)) {
		var other = typeof value.valueOf == "function" ? value.valueOf() : value;
		value = isObject(other) ? other + "" : other;
	}
	if (typeof value != "string") return value === 0 ? value : +value;
	value = baseTrim(value);
	var isBinary = reIsBinary.test(value);
	return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}
var NAN, reIsBadHex, reIsBinary, reIsOctal, freeParseInt;
var init_toNumber = __esmMin((() => {
	init__baseTrim();
	init_isObject();
	init_isSymbol();
	NAN = NaN;
	reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
	reIsBinary = /^0b[01]+$/i;
	reIsOctal = /^0o[0-7]+$/i;
	freeParseInt = parseInt;
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/identity.js
/**
* This method returns the first argument it receives.
*
* @static
* @since 0.1.0
* @memberOf _
* @category Util
* @param {*} value Any value.
* @returns {*} Returns `value`.
* @example
*
* var object = { 'a': 1 };
*
* console.log(_.identity(object) === object);
* // => true
*/
function identity(value) {
	return value;
}
var init_identity = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/isFunction.js
/**
* Checks if `value` is classified as a `Function` object.
*
* @static
* @memberOf _
* @since 0.1.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a function, else `false`.
* @example
*
* _.isFunction(_);
* // => true
*
* _.isFunction(/abc/);
* // => false
*/
function isFunction(value) {
	if (!isObject(value)) return false;
	var tag = baseGetTag(value);
	return tag == funcTag$2 || tag == genTag$1 || tag == asyncTag || tag == proxyTag;
}
var asyncTag, funcTag$2, genTag$1, proxyTag;
var init_isFunction = __esmMin((() => {
	init__baseGetTag();
	init_isObject();
	asyncTag = "[object AsyncFunction]", funcTag$2 = "[object Function]", genTag$1 = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_coreJsData.js
var coreJsData;
var init__coreJsData = __esmMin((() => {
	init__root();
	coreJsData = root["__core-js_shared__"];
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_isMasked.js
/**
* Checks if `func` has its source masked.
*
* @private
* @param {Function} func The function to check.
* @returns {boolean} Returns `true` if `func` is masked, else `false`.
*/
function isMasked(func) {
	return !!maskSrcKey && maskSrcKey in func;
}
var maskSrcKey;
var init__isMasked = __esmMin((() => {
	init__coreJsData();
	maskSrcKey = function() {
		var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
		return uid ? "Symbol(src)_1." + uid : "";
	}();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_toSource.js
/**
* Converts `func` to its source code.
*
* @private
* @param {Function} func The function to convert.
* @returns {string} Returns the source code.
*/
function toSource(func) {
	if (func != null) {
		try {
			return funcToString$2.call(func);
		} catch (e) {}
		try {
			return func + "";
		} catch (e) {}
	}
	return "";
}
var funcToString$2;
var init__toSource = __esmMin((() => {
	funcToString$2 = Function.prototype.toString;
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_baseIsNative.js
/**
* The base implementation of `_.isNative` without bad shim checks.
*
* @private
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a native function,
*  else `false`.
*/
function baseIsNative(value) {
	if (!isObject(value) || isMasked(value)) return false;
	return (isFunction(value) ? reIsNative : reIsHostCtor).test(toSource(value));
}
var reRegExpChar, reIsHostCtor, funcProto$1, objectProto$3, funcToString$1, hasOwnProperty$13, reIsNative;
var init__baseIsNative = __esmMin((() => {
	init_isFunction();
	init__isMasked();
	init_isObject();
	init__toSource();
	reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
	reIsHostCtor = /^\[object .+?Constructor\]$/;
	funcProto$1 = Function.prototype, objectProto$3 = Object.prototype;
	funcToString$1 = funcProto$1.toString;
	hasOwnProperty$13 = objectProto$3.hasOwnProperty;
	reIsNative = RegExp("^" + funcToString$1.call(hasOwnProperty$13).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_getValue.js
/**
* Gets the value at `key` of `object`.
*
* @private
* @param {Object} [object] The object to query.
* @param {string} key The key of the property to get.
* @returns {*} Returns the property value.
*/
function getValue(object, key) {
	return object == null ? void 0 : object[key];
}
var init__getValue = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_getNative.js
/**
* Gets the native function at `key` of `object`.
*
* @private
* @param {Object} object The object to query.
* @param {string} key The key of the method to get.
* @returns {*} Returns the function if it's native, else `undefined`.
*/
function getNative(object, key) {
	var value = getValue(object, key);
	return baseIsNative(value) ? value : void 0;
}
var init__getNative = __esmMin((() => {
	init__baseIsNative();
	init__getValue();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_WeakMap.js
var WeakMap;
var init__WeakMap = __esmMin((() => {
	init__getNative();
	init__root();
	WeakMap = getNative(root, "WeakMap");
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_baseCreate.js
var objectCreate, baseCreate;
var init__baseCreate = __esmMin((() => {
	init_isObject();
	objectCreate = Object.create;
	baseCreate = function() {
		function object() {}
		return function(proto) {
			if (!isObject(proto)) return {};
			if (objectCreate) return objectCreate(proto);
			object.prototype = proto;
			var result = new object();
			object.prototype = void 0;
			return result;
		};
	}();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_apply.js
/**
* A faster alternative to `Function#apply`, this function invokes `func`
* with the `this` binding of `thisArg` and the arguments of `args`.
*
* @private
* @param {Function} func The function to invoke.
* @param {*} thisArg The `this` binding of `func`.
* @param {Array} args The arguments to invoke `func` with.
* @returns {*} Returns the result of `func`.
*/
function apply(func, thisArg, args) {
	switch (args.length) {
		case 0: return func.call(thisArg);
		case 1: return func.call(thisArg, args[0]);
		case 2: return func.call(thisArg, args[0], args[1]);
		case 3: return func.call(thisArg, args[0], args[1], args[2]);
	}
	return func.apply(thisArg, args);
}
var init__apply = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/noop.js
/**
* This method returns `undefined`.
*
* @static
* @memberOf _
* @since 2.3.0
* @category Util
* @example
*
* _.times(2, _.noop);
* // => [undefined, undefined]
*/
function noop() {}
var init_noop = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_copyArray.js
/**
* Copies the values of `source` to `array`.
*
* @private
* @param {Array} source The array to copy values from.
* @param {Array} [array=[]] The array to copy values to.
* @returns {Array} Returns `array`.
*/
function copyArray(source, array) {
	var index = -1, length = source.length;
	array || (array = Array(length));
	while (++index < length) array[index] = source[index];
	return array;
}
var init__copyArray = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_shortOut.js
/**
* Creates a function that'll short out and invoke `identity` instead
* of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
* milliseconds.
*
* @private
* @param {Function} func The function to restrict.
* @returns {Function} Returns the new shortable function.
*/
function shortOut(func) {
	var count = 0, lastCalled = 0;
	return function() {
		var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
		lastCalled = stamp;
		if (remaining > 0) {
			if (++count >= HOT_COUNT) return arguments[0];
		} else count = 0;
		return func.apply(void 0, arguments);
	};
}
var HOT_COUNT, HOT_SPAN, nativeNow;
var init__shortOut = __esmMin((() => {
	HOT_COUNT = 800, HOT_SPAN = 16;
	nativeNow = Date.now;
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/constant.js
/**
* Creates a function that returns `value`.
*
* @static
* @memberOf _
* @since 2.4.0
* @category Util
* @param {*} value The value to return from the new function.
* @returns {Function} Returns the new constant function.
* @example
*
* var objects = _.times(2, _.constant({ 'a': 1 }));
*
* console.log(objects);
* // => [{ 'a': 1 }, { 'a': 1 }]
*
* console.log(objects[0] === objects[1]);
* // => true
*/
function constant(value) {
	return function() {
		return value;
	};
}
var init_constant = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_defineProperty.js
var defineProperty;
var init__defineProperty = __esmMin((() => {
	init__getNative();
	defineProperty = function() {
		try {
			var func = getNative(Object, "defineProperty");
			func({}, "", {});
			return func;
		} catch (e) {}
	}();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_baseSetToString.js
var baseSetToString;
var init__baseSetToString = __esmMin((() => {
	init_constant();
	init__defineProperty();
	init_identity();
	baseSetToString = !defineProperty ? identity : function(func, string) {
		return defineProperty(func, "toString", {
			"configurable": true,
			"enumerable": false,
			"value": constant(string),
			"writable": true
		});
	};
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_setToString.js
var setToString;
var init__setToString = __esmMin((() => {
	init__baseSetToString();
	init__shortOut();
	setToString = shortOut(baseSetToString);
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_arrayEach.js
/**
* A specialized version of `_.forEach` for arrays without support for
* iteratee shorthands.
*
* @private
* @param {Array} [array] The array to iterate over.
* @param {Function} iteratee The function invoked per iteration.
* @returns {Array} Returns `array`.
*/
function arrayEach(array, iteratee) {
	var index = -1, length = array == null ? 0 : array.length;
	while (++index < length) if (iteratee(array[index], index, array) === false) break;
	return array;
}
var init__arrayEach = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_baseFindIndex.js
/**
* The base implementation of `_.findIndex` and `_.findLastIndex` without
* support for iteratee shorthands.
*
* @private
* @param {Array} array The array to inspect.
* @param {Function} predicate The function invoked per iteration.
* @param {number} fromIndex The index to search from.
* @param {boolean} [fromRight] Specify iterating from right to left.
* @returns {number} Returns the index of the matched value, else `-1`.
*/
function baseFindIndex(array, predicate, fromIndex, fromRight) {
	var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
	while (fromRight ? index-- : ++index < length) if (predicate(array[index], index, array)) return index;
	return -1;
}
var init__baseFindIndex = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_baseIsNaN.js
/**
* The base implementation of `_.isNaN` without support for number objects.
*
* @private
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
*/
function baseIsNaN(value) {
	return value !== value;
}
var init__baseIsNaN = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_strictIndexOf.js
/**
* A specialized version of `_.indexOf` which performs strict equality
* comparisons of values, i.e. `===`.
*
* @private
* @param {Array} array The array to inspect.
* @param {*} value The value to search for.
* @param {number} fromIndex The index to search from.
* @returns {number} Returns the index of the matched value, else `-1`.
*/
function strictIndexOf(array, value, fromIndex) {
	var index = fromIndex - 1, length = array.length;
	while (++index < length) if (array[index] === value) return index;
	return -1;
}
var init__strictIndexOf = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_baseIndexOf.js
/**
* The base implementation of `_.indexOf` without `fromIndex` bounds checks.
*
* @private
* @param {Array} array The array to inspect.
* @param {*} value The value to search for.
* @param {number} fromIndex The index to search from.
* @returns {number} Returns the index of the matched value, else `-1`.
*/
function baseIndexOf(array, value, fromIndex) {
	return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
}
var init__baseIndexOf = __esmMin((() => {
	init__baseFindIndex();
	init__baseIsNaN();
	init__strictIndexOf();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_arrayIncludes.js
/**
* A specialized version of `_.includes` for arrays without support for
* specifying an index to search from.
*
* @private
* @param {Array} [array] The array to inspect.
* @param {*} target The value to search for.
* @returns {boolean} Returns `true` if `target` is found, else `false`.
*/
function arrayIncludes(array, value) {
	return !!(array == null ? 0 : array.length) && baseIndexOf(array, value, 0) > -1;
}
var init__arrayIncludes = __esmMin((() => {
	init__baseIndexOf();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_isIndex.js
/**
* Checks if `value` is a valid array-like index.
*
* @private
* @param {*} value The value to check.
* @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
* @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
*/
function isIndex(value, length) {
	var type = typeof value;
	length = length == null ? MAX_SAFE_INTEGER$1 : length;
	return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
}
var MAX_SAFE_INTEGER$1, reIsUint;
var init__isIndex = __esmMin((() => {
	MAX_SAFE_INTEGER$1 = 9007199254740991;
	reIsUint = /^(?:0|[1-9]\d*)$/;
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_baseAssignValue.js
/**
* The base implementation of `assignValue` and `assignMergeValue` without
* value checks.
*
* @private
* @param {Object} object The object to modify.
* @param {string} key The key of the property to assign.
* @param {*} value The value to assign.
*/
function baseAssignValue(object, key, value) {
	if (key == "__proto__" && defineProperty) defineProperty(object, key, {
		"configurable": true,
		"enumerable": true,
		"value": value,
		"writable": true
	});
	else object[key] = value;
}
var init__baseAssignValue = __esmMin((() => {
	init__defineProperty();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/eq.js
/**
* Performs a
* [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
* comparison between two values to determine if they are equivalent.
*
* @static
* @memberOf _
* @since 4.0.0
* @category Lang
* @param {*} value The value to compare.
* @param {*} other The other value to compare.
* @returns {boolean} Returns `true` if the values are equivalent, else `false`.
* @example
*
* var object = { 'a': 1 };
* var other = { 'a': 1 };
*
* _.eq(object, object);
* // => true
*
* _.eq(object, other);
* // => false
*
* _.eq('a', 'a');
* // => true
*
* _.eq('a', Object('a'));
* // => false
*
* _.eq(NaN, NaN);
* // => true
*/
function eq(value, other) {
	return value === other || value !== value && other !== other;
}
var init_eq = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_assignValue.js
/**
* Assigns `value` to `key` of `object` if the existing value is not equivalent
* using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
* for equality comparisons.
*
* @private
* @param {Object} object The object to modify.
* @param {string} key The key of the property to assign.
* @param {*} value The value to assign.
*/
function assignValue(object, key, value) {
	var objValue = object[key];
	if (!(hasOwnProperty$12.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) baseAssignValue(object, key, value);
}
var hasOwnProperty$12;
var init__assignValue = __esmMin((() => {
	init__baseAssignValue();
	init_eq();
	hasOwnProperty$12 = Object.prototype.hasOwnProperty;
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_copyObject.js
/**
* Copies properties of `source` to `object`.
*
* @private
* @param {Object} source The object to copy properties from.
* @param {Array} props The property identifiers to copy.
* @param {Object} [object={}] The object to copy properties to.
* @param {Function} [customizer] The function to customize copied values.
* @returns {Object} Returns `object`.
*/
function copyObject(source, props, object, customizer) {
	var isNew = !object;
	object || (object = {});
	var index = -1, length = props.length;
	while (++index < length) {
		var key = props[index];
		var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
		if (newValue === void 0) newValue = source[key];
		if (isNew) baseAssignValue(object, key, newValue);
		else assignValue(object, key, newValue);
	}
	return object;
}
var init__copyObject = __esmMin((() => {
	init__assignValue();
	init__baseAssignValue();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_overRest.js
/**
* A specialized version of `baseRest` which transforms the rest array.
*
* @private
* @param {Function} func The function to apply a rest parameter to.
* @param {number} [start=func.length-1] The start position of the rest parameter.
* @param {Function} transform The rest array transform.
* @returns {Function} Returns the new function.
*/
function overRest(func, start, transform) {
	start = nativeMax$1(start === void 0 ? func.length - 1 : start, 0);
	return function() {
		var args = arguments, index = -1, length = nativeMax$1(args.length - start, 0), array = Array(length);
		while (++index < length) array[index] = args[start + index];
		index = -1;
		var otherArgs = Array(start + 1);
		while (++index < start) otherArgs[index] = args[index];
		otherArgs[start] = transform(array);
		return apply(func, this, otherArgs);
	};
}
var nativeMax$1;
var init__overRest = __esmMin((() => {
	init__apply();
	nativeMax$1 = Math.max;
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/isLength.js
/**
* Checks if `value` is a valid array-like length.
*
* **Note:** This method is loosely based on
* [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
*
* @static
* @memberOf _
* @since 4.0.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
* @example
*
* _.isLength(3);
* // => true
*
* _.isLength(Number.MIN_VALUE);
* // => false
*
* _.isLength(Infinity);
* // => false
*
* _.isLength('3');
* // => false
*/
function isLength(value) {
	return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}
var MAX_SAFE_INTEGER;
var init_isLength = __esmMin((() => {
	MAX_SAFE_INTEGER = 9007199254740991;
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/isArrayLike.js
/**
* Checks if `value` is array-like. A value is considered array-like if it's
* not a function and has a `value.length` that's an integer greater than or
* equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
*
* @static
* @memberOf _
* @since 4.0.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is array-like, else `false`.
* @example
*
* _.isArrayLike([1, 2, 3]);
* // => true
*
* _.isArrayLike(document.body.children);
* // => true
*
* _.isArrayLike('abc');
* // => true
*
* _.isArrayLike(_.noop);
* // => false
*/
function isArrayLike(value) {
	return value != null && isLength(value.length) && !isFunction(value);
}
var init_isArrayLike = __esmMin((() => {
	init_isFunction();
	init_isLength();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_isPrototype.js
/**
* Checks if `value` is likely a prototype object.
*
* @private
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
*/
function isPrototype(value) {
	var Ctor = value && value.constructor;
	return value === (typeof Ctor == "function" && Ctor.prototype || objectProto$2);
}
var objectProto$2;
var init__isPrototype = __esmMin((() => {
	objectProto$2 = Object.prototype;
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_baseTimes.js
/**
* The base implementation of `_.times` without support for iteratee shorthands
* or max array length checks.
*
* @private
* @param {number} n The number of times to invoke `iteratee`.
* @param {Function} iteratee The function invoked per iteration.
* @returns {Array} Returns the array of results.
*/
function baseTimes(n, iteratee) {
	var index = -1, result = Array(n);
	while (++index < n) result[index] = iteratee(index);
	return result;
}
var init__baseTimes = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_baseIsArguments.js
/**
* The base implementation of `_.isArguments`.
*
* @private
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is an `arguments` object,
*/
function baseIsArguments(value) {
	return isObjectLike(value) && baseGetTag(value) == argsTag$3;
}
var argsTag$3;
var init__baseIsArguments = __esmMin((() => {
	init__baseGetTag();
	init_isObjectLike();
	argsTag$3 = "[object Arguments]";
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/isArguments.js
var objectProto$1, hasOwnProperty$11, propertyIsEnumerable$1, isArguments;
var init_isArguments = __esmMin((() => {
	init__baseIsArguments();
	init_isObjectLike();
	objectProto$1 = Object.prototype;
	hasOwnProperty$11 = objectProto$1.hasOwnProperty;
	propertyIsEnumerable$1 = objectProto$1.propertyIsEnumerable;
	isArguments = baseIsArguments(function() {
		return arguments;
	}()) ? baseIsArguments : function(value) {
		return isObjectLike(value) && hasOwnProperty$11.call(value, "callee") && !propertyIsEnumerable$1.call(value, "callee");
	};
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/stubFalse.js
/**
* This method returns `false`.
*
* @static
* @memberOf _
* @since 4.13.0
* @category Util
* @returns {boolean} Returns `false`.
* @example
*
* _.times(2, _.stubFalse);
* // => [false, false]
*/
function stubFalse() {
	return false;
}
var init_stubFalse = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/isBuffer.js
var freeExports$2, freeModule$2, Buffer$1, isBuffer;
var init_isBuffer = __esmMin((() => {
	init__root();
	init_stubFalse();
	freeExports$2 = typeof exports == "object" && exports && !exports.nodeType && exports;
	freeModule$2 = freeExports$2 && typeof module == "object" && module && !module.nodeType && module;
	Buffer$1 = freeModule$2 && freeModule$2.exports === freeExports$2 ? root.Buffer : void 0;
	isBuffer = (Buffer$1 ? Buffer$1.isBuffer : void 0) || stubFalse;
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_baseIsTypedArray.js
/**
* The base implementation of `_.isTypedArray` without Node.js optimizations.
*
* @private
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
*/
function baseIsTypedArray(value) {
	return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}
var argsTag$2, arrayTag$2, boolTag$3, dateTag$3, errorTag$2, funcTag$1, mapTag$6, numberTag$3, objectTag$4, regexpTag$3, setTag$6, stringTag$3, weakMapTag$2, arrayBufferTag$3, dataViewTag$4, float32Tag$2, float64Tag$2, int8Tag$2, int16Tag$2, int32Tag$2, uint8Tag$2, uint8ClampedTag$2, uint16Tag$2, uint32Tag$2, typedArrayTags;
var init__baseIsTypedArray = __esmMin((() => {
	init__baseGetTag();
	init_isLength();
	init_isObjectLike();
	argsTag$2 = "[object Arguments]", arrayTag$2 = "[object Array]", boolTag$3 = "[object Boolean]", dateTag$3 = "[object Date]", errorTag$2 = "[object Error]", funcTag$1 = "[object Function]", mapTag$6 = "[object Map]", numberTag$3 = "[object Number]", objectTag$4 = "[object Object]", regexpTag$3 = "[object RegExp]", setTag$6 = "[object Set]", stringTag$3 = "[object String]", weakMapTag$2 = "[object WeakMap]";
	arrayBufferTag$3 = "[object ArrayBuffer]", dataViewTag$4 = "[object DataView]", float32Tag$2 = "[object Float32Array]", float64Tag$2 = "[object Float64Array]", int8Tag$2 = "[object Int8Array]", int16Tag$2 = "[object Int16Array]", int32Tag$2 = "[object Int32Array]", uint8Tag$2 = "[object Uint8Array]", uint8ClampedTag$2 = "[object Uint8ClampedArray]", uint16Tag$2 = "[object Uint16Array]", uint32Tag$2 = "[object Uint32Array]";
	typedArrayTags = {};
	typedArrayTags[float32Tag$2] = typedArrayTags[float64Tag$2] = typedArrayTags[int8Tag$2] = typedArrayTags[int16Tag$2] = typedArrayTags[int32Tag$2] = typedArrayTags[uint8Tag$2] = typedArrayTags[uint8ClampedTag$2] = typedArrayTags[uint16Tag$2] = typedArrayTags[uint32Tag$2] = true;
	typedArrayTags[argsTag$2] = typedArrayTags[arrayTag$2] = typedArrayTags[arrayBufferTag$3] = typedArrayTags[boolTag$3] = typedArrayTags[dataViewTag$4] = typedArrayTags[dateTag$3] = typedArrayTags[errorTag$2] = typedArrayTags[funcTag$1] = typedArrayTags[mapTag$6] = typedArrayTags[numberTag$3] = typedArrayTags[objectTag$4] = typedArrayTags[regexpTag$3] = typedArrayTags[setTag$6] = typedArrayTags[stringTag$3] = typedArrayTags[weakMapTag$2] = false;
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_baseUnary.js
/**
* The base implementation of `_.unary` without support for storing metadata.
*
* @private
* @param {Function} func The function to cap arguments for.
* @returns {Function} Returns the new capped function.
*/
function baseUnary(func) {
	return function(value) {
		return func(value);
	};
}
var init__baseUnary = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_nodeUtil.js
var freeExports$1, freeModule$1, freeProcess, nodeUtil;
var init__nodeUtil = __esmMin((() => {
	init__freeGlobal();
	freeExports$1 = typeof exports == "object" && exports && !exports.nodeType && exports;
	freeModule$1 = freeExports$1 && typeof module == "object" && module && !module.nodeType && module;
	freeProcess = freeModule$1 && freeModule$1.exports === freeExports$1 && freeGlobal.process;
	nodeUtil = function() {
		try {
			var types = freeModule$1 && freeModule$1.require && freeModule$1.require("util").types;
			if (types) return types;
			return freeProcess && freeProcess.binding && freeProcess.binding("util");
		} catch (e) {}
	}();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/isTypedArray.js
var nodeIsTypedArray, isTypedArray;
var init_isTypedArray = __esmMin((() => {
	init__baseIsTypedArray();
	init__baseUnary();
	init__nodeUtil();
	nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
	isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_arrayLikeKeys.js
/**
* Creates an array of the enumerable property names of the array-like `value`.
*
* @private
* @param {*} value The value to query.
* @param {boolean} inherited Specify returning inherited property names.
* @returns {Array} Returns the array of property names.
*/
function arrayLikeKeys(value, inherited) {
	var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
	for (var key in value) if ((inherited || hasOwnProperty$10.call(value, key)) && !(skipIndexes && (key == "length" || isBuff && (key == "offset" || key == "parent") || isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || isIndex(key, length)))) result.push(key);
	return result;
}
var hasOwnProperty$10;
var init__arrayLikeKeys = __esmMin((() => {
	init__baseTimes();
	init_isArguments();
	init_isArray();
	init_isBuffer();
	init__isIndex();
	init_isTypedArray();
	hasOwnProperty$10 = Object.prototype.hasOwnProperty;
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_overArg.js
/**
* Creates a unary function that invokes `func` with its argument transformed.
*
* @private
* @param {Function} func The function to wrap.
* @param {Function} transform The argument transform.
* @returns {Function} Returns the new function.
*/
function overArg(func, transform) {
	return function(arg) {
		return func(transform(arg));
	};
}
var init__overArg = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_nativeKeys.js
var nativeKeys;
var init__nativeKeys = __esmMin((() => {
	init__overArg();
	nativeKeys = overArg(Object.keys, Object);
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_baseKeys.js
/**
* The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
*
* @private
* @param {Object} object The object to query.
* @returns {Array} Returns the array of property names.
*/
function baseKeys(object) {
	if (!isPrototype(object)) return nativeKeys(object);
	var result = [];
	for (var key in Object(object)) if (hasOwnProperty$9.call(object, key) && key != "constructor") result.push(key);
	return result;
}
var hasOwnProperty$9;
var init__baseKeys = __esmMin((() => {
	init__isPrototype();
	init__nativeKeys();
	hasOwnProperty$9 = Object.prototype.hasOwnProperty;
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/keys.js
/**
* Creates an array of the own enumerable property names of `object`.
*
* **Note:** Non-object values are coerced to objects. See the
* [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
* for more details.
*
* @static
* @since 0.1.0
* @memberOf _
* @category Object
* @param {Object} object The object to query.
* @returns {Array} Returns the array of property names.
* @example
*
* function Foo() {
*   this.a = 1;
*   this.b = 2;
* }
*
* Foo.prototype.c = 3;
*
* _.keys(new Foo);
* // => ['a', 'b'] (iteration order is not guaranteed)
*
* _.keys('hi');
* // => ['0', '1']
*/
function keys(object) {
	return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}
var init_keys = __esmMin((() => {
	init__arrayLikeKeys();
	init__baseKeys();
	init_isArrayLike();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_nativeKeysIn.js
/**
* This function is like
* [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
* except that it includes inherited enumerable properties.
*
* @private
* @param {Object} object The object to query.
* @returns {Array} Returns the array of property names.
*/
function nativeKeysIn(object) {
	var result = [];
	if (object != null) for (var key in Object(object)) result.push(key);
	return result;
}
var init__nativeKeysIn = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_baseKeysIn.js
/**
* The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
*
* @private
* @param {Object} object The object to query.
* @returns {Array} Returns the array of property names.
*/
function baseKeysIn(object) {
	if (!isObject(object)) return nativeKeysIn(object);
	var isProto = isPrototype(object), result = [];
	for (var key in object) if (!(key == "constructor" && (isProto || !hasOwnProperty$8.call(object, key)))) result.push(key);
	return result;
}
var hasOwnProperty$8;
var init__baseKeysIn = __esmMin((() => {
	init_isObject();
	init__isPrototype();
	init__nativeKeysIn();
	hasOwnProperty$8 = Object.prototype.hasOwnProperty;
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/keysIn.js
/**
* Creates an array of the own and inherited enumerable property names of `object`.
*
* **Note:** Non-object values are coerced to objects.
*
* @static
* @memberOf _
* @since 3.0.0
* @category Object
* @param {Object} object The object to query.
* @returns {Array} Returns the array of property names.
* @example
*
* function Foo() {
*   this.a = 1;
*   this.b = 2;
* }
*
* Foo.prototype.c = 3;
*
* _.keysIn(new Foo);
* // => ['a', 'b', 'c'] (iteration order is not guaranteed)
*/
function keysIn(object) {
	return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}
var init_keysIn = __esmMin((() => {
	init__arrayLikeKeys();
	init__baseKeysIn();
	init_isArrayLike();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_isKey.js
/**
* Checks if `value` is a property name and not a property path.
*
* @private
* @param {*} value The value to check.
* @param {Object} [object] The object to query keys on.
* @returns {boolean} Returns `true` if `value` is a property name, else `false`.
*/
function isKey(value, object) {
	if (isArray(value)) return false;
	var type = typeof value;
	if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) return true;
	return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
}
var reIsDeepProp, reIsPlainProp;
var init__isKey = __esmMin((() => {
	init_isArray();
	init_isSymbol();
	reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/;
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_nativeCreate.js
var nativeCreate;
var init__nativeCreate = __esmMin((() => {
	init__getNative();
	nativeCreate = getNative(Object, "create");
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_hashClear.js
/**
* Removes all key-value entries from the hash.
*
* @private
* @name clear
* @memberOf Hash
*/
function hashClear() {
	this.__data__ = nativeCreate ? nativeCreate(null) : {};
	this.size = 0;
}
var init__hashClear = __esmMin((() => {
	init__nativeCreate();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_hashDelete.js
/**
* Removes `key` and its value from the hash.
*
* @private
* @name delete
* @memberOf Hash
* @param {Object} hash The hash to modify.
* @param {string} key The key of the value to remove.
* @returns {boolean} Returns `true` if the entry was removed, else `false`.
*/
function hashDelete(key) {
	var result = this.has(key) && delete this.__data__[key];
	this.size -= result ? 1 : 0;
	return result;
}
var init__hashDelete = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_hashGet.js
/**
* Gets the hash value for `key`.
*
* @private
* @name get
* @memberOf Hash
* @param {string} key The key of the value to get.
* @returns {*} Returns the entry value.
*/
function hashGet(key) {
	var data = this.__data__;
	if (nativeCreate) {
		var result = data[key];
		return result === HASH_UNDEFINED$2 ? void 0 : result;
	}
	return hasOwnProperty$7.call(data, key) ? data[key] : void 0;
}
var HASH_UNDEFINED$2, hasOwnProperty$7;
var init__hashGet = __esmMin((() => {
	init__nativeCreate();
	HASH_UNDEFINED$2 = "__lodash_hash_undefined__";
	hasOwnProperty$7 = Object.prototype.hasOwnProperty;
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_hashHas.js
/**
* Checks if a hash value for `key` exists.
*
* @private
* @name has
* @memberOf Hash
* @param {string} key The key of the entry to check.
* @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
*/
function hashHas(key) {
	var data = this.__data__;
	return nativeCreate ? data[key] !== void 0 : hasOwnProperty$6.call(data, key);
}
var hasOwnProperty$6;
var init__hashHas = __esmMin((() => {
	init__nativeCreate();
	hasOwnProperty$6 = Object.prototype.hasOwnProperty;
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_hashSet.js
/**
* Sets the hash `key` to `value`.
*
* @private
* @name set
* @memberOf Hash
* @param {string} key The key of the value to set.
* @param {*} value The value to set.
* @returns {Object} Returns the hash instance.
*/
function hashSet(key, value) {
	var data = this.__data__;
	this.size += this.has(key) ? 0 : 1;
	data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED$1 : value;
	return this;
}
var HASH_UNDEFINED$1;
var init__hashSet = __esmMin((() => {
	init__nativeCreate();
	HASH_UNDEFINED$1 = "__lodash_hash_undefined__";
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_Hash.js
/**
* Creates a hash object.
*
* @private
* @constructor
* @param {Array} [entries] The key-value pairs to cache.
*/
function Hash(entries) {
	var index = -1, length = entries == null ? 0 : entries.length;
	this.clear();
	while (++index < length) {
		var entry = entries[index];
		this.set(entry[0], entry[1]);
	}
}
var init__Hash = __esmMin((() => {
	init__hashClear();
	init__hashDelete();
	init__hashGet();
	init__hashHas();
	init__hashSet();
	Hash.prototype.clear = hashClear;
	Hash.prototype["delete"] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_listCacheClear.js
/**
* Removes all key-value entries from the list cache.
*
* @private
* @name clear
* @memberOf ListCache
*/
function listCacheClear() {
	this.__data__ = [];
	this.size = 0;
}
var init__listCacheClear = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_assocIndexOf.js
/**
* Gets the index at which the `key` is found in `array` of key-value pairs.
*
* @private
* @param {Array} array The array to inspect.
* @param {*} key The key to search for.
* @returns {number} Returns the index of the matched value, else `-1`.
*/
function assocIndexOf(array, key) {
	var length = array.length;
	while (length--) if (eq(array[length][0], key)) return length;
	return -1;
}
var init__assocIndexOf = __esmMin((() => {
	init_eq();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_listCacheDelete.js
/**
* Removes `key` and its value from the list cache.
*
* @private
* @name delete
* @memberOf ListCache
* @param {string} key The key of the value to remove.
* @returns {boolean} Returns `true` if the entry was removed, else `false`.
*/
function listCacheDelete(key) {
	var data = this.__data__, index = assocIndexOf(data, key);
	if (index < 0) return false;
	if (index == data.length - 1) data.pop();
	else splice.call(data, index, 1);
	--this.size;
	return true;
}
var splice;
var init__listCacheDelete = __esmMin((() => {
	init__assocIndexOf();
	splice = Array.prototype.splice;
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_listCacheGet.js
/**
* Gets the list cache value for `key`.
*
* @private
* @name get
* @memberOf ListCache
* @param {string} key The key of the value to get.
* @returns {*} Returns the entry value.
*/
function listCacheGet(key) {
	var data = this.__data__, index = assocIndexOf(data, key);
	return index < 0 ? void 0 : data[index][1];
}
var init__listCacheGet = __esmMin((() => {
	init__assocIndexOf();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_listCacheHas.js
/**
* Checks if a list cache value for `key` exists.
*
* @private
* @name has
* @memberOf ListCache
* @param {string} key The key of the entry to check.
* @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
*/
function listCacheHas(key) {
	return assocIndexOf(this.__data__, key) > -1;
}
var init__listCacheHas = __esmMin((() => {
	init__assocIndexOf();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_listCacheSet.js
/**
* Sets the list cache `key` to `value`.
*
* @private
* @name set
* @memberOf ListCache
* @param {string} key The key of the value to set.
* @param {*} value The value to set.
* @returns {Object} Returns the list cache instance.
*/
function listCacheSet(key, value) {
	var data = this.__data__, index = assocIndexOf(data, key);
	if (index < 0) {
		++this.size;
		data.push([key, value]);
	} else data[index][1] = value;
	return this;
}
var init__listCacheSet = __esmMin((() => {
	init__assocIndexOf();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_ListCache.js
/**
* Creates an list cache object.
*
* @private
* @constructor
* @param {Array} [entries] The key-value pairs to cache.
*/
function ListCache(entries) {
	var index = -1, length = entries == null ? 0 : entries.length;
	this.clear();
	while (++index < length) {
		var entry = entries[index];
		this.set(entry[0], entry[1]);
	}
}
var init__ListCache = __esmMin((() => {
	init__listCacheClear();
	init__listCacheDelete();
	init__listCacheGet();
	init__listCacheHas();
	init__listCacheSet();
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype["delete"] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_Map.js
var Map$1;
var init__Map = __esmMin((() => {
	init__getNative();
	init__root();
	Map$1 = getNative(root, "Map");
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_mapCacheClear.js
/**
* Removes all key-value entries from the map.
*
* @private
* @name clear
* @memberOf MapCache
*/
function mapCacheClear() {
	this.size = 0;
	this.__data__ = {
		"hash": new Hash(),
		"map": new (Map$1 || ListCache)(),
		"string": new Hash()
	};
}
var init__mapCacheClear = __esmMin((() => {
	init__Hash();
	init__ListCache();
	init__Map();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_isKeyable.js
/**
* Checks if `value` is suitable for use as unique object key.
*
* @private
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is suitable, else `false`.
*/
function isKeyable(value) {
	var type = typeof value;
	return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
var init__isKeyable = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_getMapData.js
/**
* Gets the data for `map`.
*
* @private
* @param {Object} map The map to query.
* @param {string} key The reference key.
* @returns {*} Returns the map data.
*/
function getMapData(map, key) {
	var data = map.__data__;
	return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
var init__getMapData = __esmMin((() => {
	init__isKeyable();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_mapCacheDelete.js
/**
* Removes `key` and its value from the map.
*
* @private
* @name delete
* @memberOf MapCache
* @param {string} key The key of the value to remove.
* @returns {boolean} Returns `true` if the entry was removed, else `false`.
*/
function mapCacheDelete(key) {
	var result = getMapData(this, key)["delete"](key);
	this.size -= result ? 1 : 0;
	return result;
}
var init__mapCacheDelete = __esmMin((() => {
	init__getMapData();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_mapCacheGet.js
/**
* Gets the map value for `key`.
*
* @private
* @name get
* @memberOf MapCache
* @param {string} key The key of the value to get.
* @returns {*} Returns the entry value.
*/
function mapCacheGet(key) {
	return getMapData(this, key).get(key);
}
var init__mapCacheGet = __esmMin((() => {
	init__getMapData();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_mapCacheHas.js
/**
* Checks if a map value for `key` exists.
*
* @private
* @name has
* @memberOf MapCache
* @param {string} key The key of the entry to check.
* @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
*/
function mapCacheHas(key) {
	return getMapData(this, key).has(key);
}
var init__mapCacheHas = __esmMin((() => {
	init__getMapData();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_mapCacheSet.js
/**
* Sets the map `key` to `value`.
*
* @private
* @name set
* @memberOf MapCache
* @param {string} key The key of the value to set.
* @param {*} value The value to set.
* @returns {Object} Returns the map cache instance.
*/
function mapCacheSet(key, value) {
	var data = getMapData(this, key), size = data.size;
	data.set(key, value);
	this.size += data.size == size ? 0 : 1;
	return this;
}
var init__mapCacheSet = __esmMin((() => {
	init__getMapData();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_MapCache.js
/**
* Creates a map cache object to store key-value pairs.
*
* @private
* @constructor
* @param {Array} [entries] The key-value pairs to cache.
*/
function MapCache(entries) {
	var index = -1, length = entries == null ? 0 : entries.length;
	this.clear();
	while (++index < length) {
		var entry = entries[index];
		this.set(entry[0], entry[1]);
	}
}
var init__MapCache = __esmMin((() => {
	init__mapCacheClear();
	init__mapCacheDelete();
	init__mapCacheGet();
	init__mapCacheHas();
	init__mapCacheSet();
	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype["delete"] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/memoize.js
/**
* Creates a function that memoizes the result of `func`. If `resolver` is
* provided, it determines the cache key for storing the result based on the
* arguments provided to the memoized function. By default, the first argument
* provided to the memoized function is used as the map cache key. The `func`
* is invoked with the `this` binding of the memoized function.
*
* **Note:** The cache is exposed as the `cache` property on the memoized
* function. Its creation may be customized by replacing the `_.memoize.Cache`
* constructor with one whose instances implement the
* [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
* method interface of `clear`, `delete`, `get`, `has`, and `set`.
*
* @static
* @memberOf _
* @since 0.1.0
* @category Function
* @param {Function} func The function to have its output memoized.
* @param {Function} [resolver] The function to resolve the cache key.
* @returns {Function} Returns the new memoized function.
* @example
*
* var object = { 'a': 1, 'b': 2 };
* var other = { 'c': 3, 'd': 4 };
*
* var values = _.memoize(_.values);
* values(object);
* // => [1, 2]
*
* values(other);
* // => [3, 4]
*
* object.a = 2;
* values(object);
* // => [1, 2]
*
* // Modify the result cache.
* values.cache.set(object, ['a', 'b']);
* values(object);
* // => ['a', 'b']
*
* // Replace `_.memoize.Cache`.
* _.memoize.Cache = WeakMap;
*/
function memoize(func, resolver) {
	if (typeof func != "function" || resolver != null && typeof resolver != "function") throw new TypeError(FUNC_ERROR_TEXT$1);
	var memoized = function() {
		var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
		if (cache.has(key)) return cache.get(key);
		var result = func.apply(this, args);
		memoized.cache = cache.set(key, result) || cache;
		return result;
	};
	memoized.cache = new (memoize.Cache || MapCache)();
	return memoized;
}
var FUNC_ERROR_TEXT$1;
var init_memoize = __esmMin((() => {
	init__MapCache();
	FUNC_ERROR_TEXT$1 = "Expected a function";
	memoize.Cache = MapCache;
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_memoizeCapped.js
/**
* A specialized version of `_.memoize` which clears the memoized function's
* cache when it exceeds `MAX_MEMOIZE_SIZE`.
*
* @private
* @param {Function} func The function to have its output memoized.
* @returns {Function} Returns the new memoized function.
*/
function memoizeCapped(func) {
	var result = memoize(func, function(key) {
		if (cache.size === MAX_MEMOIZE_SIZE) cache.clear();
		return key;
	});
	var cache = result.cache;
	return result;
}
var MAX_MEMOIZE_SIZE;
var init__memoizeCapped = __esmMin((() => {
	init_memoize();
	MAX_MEMOIZE_SIZE = 500;
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_stringToPath.js
var rePropName, reEscapeChar, stringToPath;
var init__stringToPath = __esmMin((() => {
	init__memoizeCapped();
	rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
	reEscapeChar = /\\(\\)?/g;
	stringToPath = memoizeCapped(function(string) {
		var result = [];
		if (string.charCodeAt(0) === 46) result.push("");
		string.replace(rePropName, function(match, number, quote, subString) {
			result.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
		});
		return result;
	});
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/toString.js
/**
* Converts `value` to a string. An empty string is returned for `null`
* and `undefined` values. The sign of `-0` is preserved.
*
* @static
* @memberOf _
* @since 4.0.0
* @category Lang
* @param {*} value The value to convert.
* @returns {string} Returns the converted string.
* @example
*
* _.toString(null);
* // => ''
*
* _.toString(-0);
* // => '-0'
*
* _.toString([1, 2, 3]);
* // => '1,2,3'
*/
function toString(value) {
	return value == null ? "" : baseToString(value);
}
var init_toString = __esmMin((() => {
	init__baseToString();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_castPath.js
/**
* Casts `value` to a path array if it's not one.
*
* @private
* @param {*} value The value to inspect.
* @param {Object} [object] The object to query keys on.
* @returns {Array} Returns the cast property path array.
*/
function castPath(value, object) {
	if (isArray(value)) return value;
	return isKey(value, object) ? [value] : stringToPath(toString(value));
}
var init__castPath = __esmMin((() => {
	init_isArray();
	init__isKey();
	init__stringToPath();
	init_toString();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_toKey.js
/**
* Converts `value` to a string key if it's not a string or symbol.
*
* @private
* @param {*} value The value to inspect.
* @returns {string|symbol} Returns the key.
*/
function toKey(value) {
	if (typeof value == "string" || isSymbol(value)) return value;
	var result = value + "";
	return result == "0" && 1 / value == -INFINITY ? "-0" : result;
}
var INFINITY;
var init__toKey = __esmMin((() => {
	init_isSymbol();
	INFINITY = Infinity;
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_baseGet.js
/**
* The base implementation of `_.get` without support for default values.
*
* @private
* @param {Object} object The object to query.
* @param {Array|string} path The path of the property to get.
* @returns {*} Returns the resolved value.
*/
function baseGet(object, path) {
	path = castPath(path, object);
	var index = 0, length = path.length;
	while (object != null && index < length) object = object[toKey(path[index++])];
	return index && index == length ? object : void 0;
}
var init__baseGet = __esmMin((() => {
	init__castPath();
	init__toKey();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/get.js
/**
* Gets the value at `path` of `object`. If the resolved value is
* `undefined`, the `defaultValue` is returned in its place.
*
* @static
* @memberOf _
* @since 3.7.0
* @category Object
* @param {Object} object The object to query.
* @param {Array|string} path The path of the property to get.
* @param {*} [defaultValue] The value returned for `undefined` resolved values.
* @returns {*} Returns the resolved value.
* @example
*
* var object = { 'a': [{ 'b': { 'c': 3 } }] };
*
* _.get(object, 'a[0].b.c');
* // => 3
*
* _.get(object, ['a', '0', 'b', 'c']);
* // => 3
*
* _.get(object, 'a.b.c', 'default');
* // => 'default'
*/
function get(object, path, defaultValue) {
	var result = object == null ? void 0 : baseGet(object, path);
	return result === void 0 ? defaultValue : result;
}
var init_get = __esmMin((() => {
	init__baseGet();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_arrayPush.js
/**
* Appends the elements of `values` to `array`.
*
* @private
* @param {Array} array The array to modify.
* @param {Array} values The values to append.
* @returns {Array} Returns `array`.
*/
function arrayPush(array, values) {
	var index = -1, length = values.length, offset = array.length;
	while (++index < length) array[offset + index] = values[index];
	return array;
}
var init__arrayPush = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_isFlattenable.js
/**
* Checks if `value` is a flattenable `arguments` object or array.
*
* @private
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
*/
function isFlattenable(value) {
	return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
}
var spreadableSymbol;
var init__isFlattenable = __esmMin((() => {
	init__Symbol();
	init_isArguments();
	init_isArray();
	spreadableSymbol = Symbol$1 ? Symbol$1.isConcatSpreadable : void 0;
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_baseFlatten.js
/**
* The base implementation of `_.flatten` with support for restricting flattening.
*
* @private
* @param {Array} array The array to flatten.
* @param {number} depth The maximum recursion depth.
* @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
* @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
* @param {Array} [result=[]] The initial result value.
* @returns {Array} Returns the new flattened array.
*/
function baseFlatten(array, depth, predicate, isStrict, result) {
	var index = -1, length = array.length;
	predicate || (predicate = isFlattenable);
	result || (result = []);
	while (++index < length) {
		var value = array[index];
		if (depth > 0 && predicate(value)) if (depth > 1) baseFlatten(value, depth - 1, predicate, isStrict, result);
		else arrayPush(result, value);
		else if (!isStrict) result[result.length] = value;
	}
	return result;
}
var init__baseFlatten = __esmMin((() => {
	init__arrayPush();
	init__isFlattenable();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/flatten.js
/**
* Flattens `array` a single level deep.
*
* @static
* @memberOf _
* @since 0.1.0
* @category Array
* @param {Array} array The array to flatten.
* @returns {Array} Returns the new flattened array.
* @example
*
* _.flatten([1, [2, [3, [4]], 5]]);
* // => [1, 2, [3, [4]], 5]
*/
function flatten(array) {
	return (array == null ? 0 : array.length) ? baseFlatten(array, 1) : [];
}
var init_flatten = __esmMin((() => {
	init__baseFlatten();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_flatRest.js
/**
* A specialized version of `baseRest` which flattens the rest array.
*
* @private
* @param {Function} func The function to apply a rest parameter to.
* @returns {Function} Returns the new function.
*/
function flatRest(func) {
	return setToString(overRest(func, void 0, flatten), func + "");
}
var init__flatRest = __esmMin((() => {
	init_flatten();
	init__overRest();
	init__setToString();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_getPrototype.js
var getPrototype;
var init__getPrototype = __esmMin((() => {
	init__overArg();
	getPrototype = overArg(Object.getPrototypeOf, Object);
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/isPlainObject.js
/**
* Checks if `value` is a plain object, that is, an object created by the
* `Object` constructor or one with a `[[Prototype]]` of `null`.
*
* @static
* @memberOf _
* @since 0.8.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
* @example
*
* function Foo() {
*   this.a = 1;
* }
*
* _.isPlainObject(new Foo);
* // => false
*
* _.isPlainObject([1, 2, 3]);
* // => false
*
* _.isPlainObject({ 'x': 0, 'y': 0 });
* // => true
*
* _.isPlainObject(Object.create(null));
* // => true
*/
function isPlainObject(value) {
	if (!isObjectLike(value) || baseGetTag(value) != objectTag$3) return false;
	var proto = getPrototype(value);
	if (proto === null) return true;
	var Ctor = hasOwnProperty$5.call(proto, "constructor") && proto.constructor;
	return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
}
var objectTag$3, funcProto, objectProto, funcToString, hasOwnProperty$5, objectCtorString;
var init_isPlainObject = __esmMin((() => {
	init__baseGetTag();
	init__getPrototype();
	init_isObjectLike();
	objectTag$3 = "[object Object]";
	funcProto = Function.prototype, objectProto = Object.prototype;
	funcToString = funcProto.toString;
	hasOwnProperty$5 = objectProto.hasOwnProperty;
	objectCtorString = funcToString.call(Object);
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_baseSlice.js
/**
* The base implementation of `_.slice` without an iteratee call guard.
*
* @private
* @param {Array} array The array to slice.
* @param {number} [start=0] The start position.
* @param {number} [end=array.length] The end position.
* @returns {Array} Returns the slice of `array`.
*/
function baseSlice(array, start, end) {
	var index = -1, length = array.length;
	if (start < 0) start = -start > length ? 0 : length + start;
	end = end > length ? length : end;
	if (end < 0) end += length;
	length = start > end ? 0 : end - start >>> 0;
	start >>>= 0;
	var result = Array(length);
	while (++index < length) result[index] = array[index + start];
	return result;
}
var init__baseSlice = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_basePropertyOf.js
/**
* The base implementation of `_.propertyOf` without support for deep paths.
*
* @private
* @param {Object} object The object to query.
* @returns {Function} Returns the new accessor function.
*/
function basePropertyOf(object) {
	return function(key) {
		return object == null ? void 0 : object[key];
	};
}
var init__basePropertyOf = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_stackClear.js
/**
* Removes all key-value entries from the stack.
*
* @private
* @name clear
* @memberOf Stack
*/
function stackClear() {
	this.__data__ = new ListCache();
	this.size = 0;
}
var init__stackClear = __esmMin((() => {
	init__ListCache();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_stackDelete.js
/**
* Removes `key` and its value from the stack.
*
* @private
* @name delete
* @memberOf Stack
* @param {string} key The key of the value to remove.
* @returns {boolean} Returns `true` if the entry was removed, else `false`.
*/
function stackDelete(key) {
	var data = this.__data__, result = data["delete"](key);
	this.size = data.size;
	return result;
}
var init__stackDelete = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_stackGet.js
/**
* Gets the stack value for `key`.
*
* @private
* @name get
* @memberOf Stack
* @param {string} key The key of the value to get.
* @returns {*} Returns the entry value.
*/
function stackGet(key) {
	return this.__data__.get(key);
}
var init__stackGet = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_stackHas.js
/**
* Checks if a stack value for `key` exists.
*
* @private
* @name has
* @memberOf Stack
* @param {string} key The key of the entry to check.
* @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
*/
function stackHas(key) {
	return this.__data__.has(key);
}
var init__stackHas = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_stackSet.js
/**
* Sets the stack `key` to `value`.
*
* @private
* @name set
* @memberOf Stack
* @param {string} key The key of the value to set.
* @param {*} value The value to set.
* @returns {Object} Returns the stack cache instance.
*/
function stackSet(key, value) {
	var data = this.__data__;
	if (data instanceof ListCache) {
		var pairs = data.__data__;
		if (!Map$1 || pairs.length < LARGE_ARRAY_SIZE$1 - 1) {
			pairs.push([key, value]);
			this.size = ++data.size;
			return this;
		}
		data = this.__data__ = new MapCache(pairs);
	}
	data.set(key, value);
	this.size = data.size;
	return this;
}
var LARGE_ARRAY_SIZE$1;
var init__stackSet = __esmMin((() => {
	init__ListCache();
	init__Map();
	init__MapCache();
	LARGE_ARRAY_SIZE$1 = 200;
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_Stack.js
/**
* Creates a stack cache object to store key-value pairs.
*
* @private
* @constructor
* @param {Array} [entries] The key-value pairs to cache.
*/
function Stack(entries) {
	this.size = (this.__data__ = new ListCache(entries)).size;
}
var init__Stack = __esmMin((() => {
	init__ListCache();
	init__stackClear();
	init__stackDelete();
	init__stackGet();
	init__stackHas();
	init__stackSet();
	Stack.prototype.clear = stackClear;
	Stack.prototype["delete"] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_baseAssign.js
/**
* The base implementation of `_.assign` without support for multiple sources
* or `customizer` functions.
*
* @private
* @param {Object} object The destination object.
* @param {Object} source The source object.
* @returns {Object} Returns `object`.
*/
function baseAssign(object, source) {
	return object && copyObject(source, keys(source), object);
}
var init__baseAssign = __esmMin((() => {
	init__copyObject();
	init_keys();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_baseAssignIn.js
/**
* The base implementation of `_.assignIn` without support for multiple sources
* or `customizer` functions.
*
* @private
* @param {Object} object The destination object.
* @param {Object} source The source object.
* @returns {Object} Returns `object`.
*/
function baseAssignIn(object, source) {
	return object && copyObject(source, keysIn(source), object);
}
var init__baseAssignIn = __esmMin((() => {
	init__copyObject();
	init_keysIn();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_cloneBuffer.js
/**
* Creates a clone of  `buffer`.
*
* @private
* @param {Buffer} buffer The buffer to clone.
* @param {boolean} [isDeep] Specify a deep clone.
* @returns {Buffer} Returns the cloned buffer.
*/
function cloneBuffer(buffer, isDeep) {
	if (isDeep) return buffer.slice();
	var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
	buffer.copy(result);
	return result;
}
var freeExports, freeModule, Buffer, allocUnsafe;
var init__cloneBuffer = __esmMin((() => {
	init__root();
	freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
	freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
	Buffer = freeModule && freeModule.exports === freeExports ? root.Buffer : void 0, allocUnsafe = Buffer ? Buffer.allocUnsafe : void 0;
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_arrayFilter.js
/**
* A specialized version of `_.filter` for arrays without support for
* iteratee shorthands.
*
* @private
* @param {Array} [array] The array to iterate over.
* @param {Function} predicate The function invoked per iteration.
* @returns {Array} Returns the new filtered array.
*/
function arrayFilter(array, predicate) {
	var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
	while (++index < length) {
		var value = array[index];
		if (predicate(value, index, array)) result[resIndex++] = value;
	}
	return result;
}
var init__arrayFilter = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/stubArray.js
/**
* This method returns a new empty array.
*
* @static
* @memberOf _
* @since 4.13.0
* @category Util
* @returns {Array} Returns the new empty array.
* @example
*
* var arrays = _.times(2, _.stubArray);
*
* console.log(arrays);
* // => [[], []]
*
* console.log(arrays[0] === arrays[1]);
* // => false
*/
function stubArray() {
	return [];
}
var init_stubArray = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_getSymbols.js
var propertyIsEnumerable, nativeGetSymbols, getSymbols;
var init__getSymbols = __esmMin((() => {
	init__arrayFilter();
	init_stubArray();
	propertyIsEnumerable = Object.prototype.propertyIsEnumerable;
	nativeGetSymbols = Object.getOwnPropertySymbols;
	getSymbols = !nativeGetSymbols ? stubArray : function(object) {
		if (object == null) return [];
		object = Object(object);
		return arrayFilter(nativeGetSymbols(object), function(symbol) {
			return propertyIsEnumerable.call(object, symbol);
		});
	};
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_copySymbols.js
/**
* Copies own symbols of `source` to `object`.
*
* @private
* @param {Object} source The object to copy symbols from.
* @param {Object} [object={}] The object to copy symbols to.
* @returns {Object} Returns `object`.
*/
function copySymbols(source, object) {
	return copyObject(source, getSymbols(source), object);
}
var init__copySymbols = __esmMin((() => {
	init__copyObject();
	init__getSymbols();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_getSymbolsIn.js
var getSymbolsIn;
var init__getSymbolsIn = __esmMin((() => {
	init__arrayPush();
	init__getPrototype();
	init__getSymbols();
	init_stubArray();
	getSymbolsIn = !Object.getOwnPropertySymbols ? stubArray : function(object) {
		var result = [];
		while (object) {
			arrayPush(result, getSymbols(object));
			object = getPrototype(object);
		}
		return result;
	};
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_copySymbolsIn.js
/**
* Copies own and inherited symbols of `source` to `object`.
*
* @private
* @param {Object} source The object to copy symbols from.
* @param {Object} [object={}] The object to copy symbols to.
* @returns {Object} Returns `object`.
*/
function copySymbolsIn(source, object) {
	return copyObject(source, getSymbolsIn(source), object);
}
var init__copySymbolsIn = __esmMin((() => {
	init__copyObject();
	init__getSymbolsIn();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_baseGetAllKeys.js
/**
* The base implementation of `getAllKeys` and `getAllKeysIn` which uses
* `keysFunc` and `symbolsFunc` to get the enumerable property names and
* symbols of `object`.
*
* @private
* @param {Object} object The object to query.
* @param {Function} keysFunc The function to get the keys of `object`.
* @param {Function} symbolsFunc The function to get the symbols of `object`.
* @returns {Array} Returns the array of property names and symbols.
*/
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
	var result = keysFunc(object);
	return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}
var init__baseGetAllKeys = __esmMin((() => {
	init__arrayPush();
	init_isArray();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_getAllKeys.js
/**
* Creates an array of own enumerable property names and symbols of `object`.
*
* @private
* @param {Object} object The object to query.
* @returns {Array} Returns the array of property names and symbols.
*/
function getAllKeys(object) {
	return baseGetAllKeys(object, keys, getSymbols);
}
var init__getAllKeys = __esmMin((() => {
	init__baseGetAllKeys();
	init__getSymbols();
	init_keys();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_getAllKeysIn.js
/**
* Creates an array of own and inherited enumerable property names and
* symbols of `object`.
*
* @private
* @param {Object} object The object to query.
* @returns {Array} Returns the array of property names and symbols.
*/
function getAllKeysIn(object) {
	return baseGetAllKeys(object, keysIn, getSymbolsIn);
}
var init__getAllKeysIn = __esmMin((() => {
	init__baseGetAllKeys();
	init__getSymbolsIn();
	init_keysIn();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_DataView.js
var DataView;
var init__DataView = __esmMin((() => {
	init__getNative();
	init__root();
	DataView = getNative(root, "DataView");
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_Promise.js
var Promise$1;
var init__Promise = __esmMin((() => {
	init__getNative();
	init__root();
	Promise$1 = getNative(root, "Promise");
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_Set.js
var Set$1;
var init__Set = __esmMin((() => {
	init__getNative();
	init__root();
	Set$1 = getNative(root, "Set");
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_getTag.js
var mapTag$5, objectTag$2, promiseTag, setTag$5, weakMapTag$1, dataViewTag$3, dataViewCtorString, mapCtorString, promiseCtorString, setCtorString, weakMapCtorString, getTag, _getTag_default;
var init__getTag = __esmMin((() => {
	init__DataView();
	init__Map();
	init__Promise();
	init__Set();
	init__WeakMap();
	init__baseGetTag();
	init__toSource();
	mapTag$5 = "[object Map]", objectTag$2 = "[object Object]", promiseTag = "[object Promise]", setTag$5 = "[object Set]", weakMapTag$1 = "[object WeakMap]";
	dataViewTag$3 = "[object DataView]";
	dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map$1), promiseCtorString = toSource(Promise$1), setCtorString = toSource(Set$1), weakMapCtorString = toSource(WeakMap);
	getTag = baseGetTag;
	if (DataView && getTag(new DataView(/* @__PURE__ */ new ArrayBuffer(1))) != dataViewTag$3 || Map$1 && getTag(new Map$1()) != mapTag$5 || Promise$1 && getTag(Promise$1.resolve()) != promiseTag || Set$1 && getTag(new Set$1()) != setTag$5 || WeakMap && getTag(new WeakMap()) != weakMapTag$1) getTag = function(value) {
		var result = baseGetTag(value), Ctor = result == objectTag$2 ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
		if (ctorString) switch (ctorString) {
			case dataViewCtorString: return dataViewTag$3;
			case mapCtorString: return mapTag$5;
			case promiseCtorString: return promiseTag;
			case setCtorString: return setTag$5;
			case weakMapCtorString: return weakMapTag$1;
		}
		return result;
	};
	_getTag_default = getTag;
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_initCloneArray.js
/**
* Initializes an array clone.
*
* @private
* @param {Array} array The array to clone.
* @returns {Array} Returns the initialized clone.
*/
function initCloneArray(array) {
	var length = array.length, result = new array.constructor(length);
	if (length && typeof array[0] == "string" && hasOwnProperty$4.call(array, "index")) {
		result.index = array.index;
		result.input = array.input;
	}
	return result;
}
var hasOwnProperty$4;
var init__initCloneArray = __esmMin((() => {
	hasOwnProperty$4 = Object.prototype.hasOwnProperty;
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_Uint8Array.js
var Uint8Array;
var init__Uint8Array = __esmMin((() => {
	init__root();
	Uint8Array = root.Uint8Array;
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_cloneArrayBuffer.js
/**
* Creates a clone of `arrayBuffer`.
*
* @private
* @param {ArrayBuffer} arrayBuffer The array buffer to clone.
* @returns {ArrayBuffer} Returns the cloned array buffer.
*/
function cloneArrayBuffer(arrayBuffer) {
	var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
	new Uint8Array(result).set(new Uint8Array(arrayBuffer));
	return result;
}
var init__cloneArrayBuffer = __esmMin((() => {
	init__Uint8Array();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_cloneDataView.js
/**
* Creates a clone of `dataView`.
*
* @private
* @param {Object} dataView The data view to clone.
* @param {boolean} [isDeep] Specify a deep clone.
* @returns {Object} Returns the cloned data view.
*/
function cloneDataView(dataView, isDeep) {
	var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
	return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}
var init__cloneDataView = __esmMin((() => {
	init__cloneArrayBuffer();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_cloneRegExp.js
/**
* Creates a clone of `regexp`.
*
* @private
* @param {Object} regexp The regexp to clone.
* @returns {Object} Returns the cloned regexp.
*/
function cloneRegExp(regexp) {
	var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
	result.lastIndex = regexp.lastIndex;
	return result;
}
var reFlags;
var init__cloneRegExp = __esmMin((() => {
	reFlags = /\w*$/;
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_cloneSymbol.js
/**
* Creates a clone of the `symbol` object.
*
* @private
* @param {Object} symbol The symbol object to clone.
* @returns {Object} Returns the cloned symbol object.
*/
function cloneSymbol(symbol) {
	return symbolValueOf$1 ? Object(symbolValueOf$1.call(symbol)) : {};
}
var symbolProto$1, symbolValueOf$1;
var init__cloneSymbol = __esmMin((() => {
	init__Symbol();
	symbolProto$1 = Symbol$1 ? Symbol$1.prototype : void 0, symbolValueOf$1 = symbolProto$1 ? symbolProto$1.valueOf : void 0;
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_cloneTypedArray.js
/**
* Creates a clone of `typedArray`.
*
* @private
* @param {Object} typedArray The typed array to clone.
* @param {boolean} [isDeep] Specify a deep clone.
* @returns {Object} Returns the cloned typed array.
*/
function cloneTypedArray(typedArray, isDeep) {
	var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
	return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}
var init__cloneTypedArray = __esmMin((() => {
	init__cloneArrayBuffer();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_initCloneByTag.js
/**
* Initializes an object clone based on its `toStringTag`.
*
* **Note:** This function only supports cloning values with tags of
* `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
*
* @private
* @param {Object} object The object to clone.
* @param {string} tag The `toStringTag` of the object to clone.
* @param {boolean} [isDeep] Specify a deep clone.
* @returns {Object} Returns the initialized clone.
*/
function initCloneByTag(object, tag, isDeep) {
	var Ctor = object.constructor;
	switch (tag) {
		case arrayBufferTag$2: return cloneArrayBuffer(object);
		case boolTag$2:
		case dateTag$2: return new Ctor(+object);
		case dataViewTag$2: return cloneDataView(object, isDeep);
		case float32Tag$1:
		case float64Tag$1:
		case int8Tag$1:
		case int16Tag$1:
		case int32Tag$1:
		case uint8Tag$1:
		case uint8ClampedTag$1:
		case uint16Tag$1:
		case uint32Tag$1: return cloneTypedArray(object, isDeep);
		case mapTag$4: return new Ctor();
		case numberTag$2:
		case stringTag$2: return new Ctor(object);
		case regexpTag$2: return cloneRegExp(object);
		case setTag$4: return new Ctor();
		case symbolTag$2: return cloneSymbol(object);
	}
}
var boolTag$2, dateTag$2, mapTag$4, numberTag$2, regexpTag$2, setTag$4, stringTag$2, symbolTag$2, arrayBufferTag$2, dataViewTag$2, float32Tag$1, float64Tag$1, int8Tag$1, int16Tag$1, int32Tag$1, uint8Tag$1, uint8ClampedTag$1, uint16Tag$1, uint32Tag$1;
var init__initCloneByTag = __esmMin((() => {
	init__cloneArrayBuffer();
	init__cloneDataView();
	init__cloneRegExp();
	init__cloneSymbol();
	init__cloneTypedArray();
	boolTag$2 = "[object Boolean]", dateTag$2 = "[object Date]", mapTag$4 = "[object Map]", numberTag$2 = "[object Number]", regexpTag$2 = "[object RegExp]", setTag$4 = "[object Set]", stringTag$2 = "[object String]", symbolTag$2 = "[object Symbol]";
	arrayBufferTag$2 = "[object ArrayBuffer]", dataViewTag$2 = "[object DataView]", float32Tag$1 = "[object Float32Array]", float64Tag$1 = "[object Float64Array]", int8Tag$1 = "[object Int8Array]", int16Tag$1 = "[object Int16Array]", int32Tag$1 = "[object Int32Array]", uint8Tag$1 = "[object Uint8Array]", uint8ClampedTag$1 = "[object Uint8ClampedArray]", uint16Tag$1 = "[object Uint16Array]", uint32Tag$1 = "[object Uint32Array]";
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_initCloneObject.js
/**
* Initializes an object clone.
*
* @private
* @param {Object} object The object to clone.
* @returns {Object} Returns the initialized clone.
*/
function initCloneObject(object) {
	return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
}
var init__initCloneObject = __esmMin((() => {
	init__baseCreate();
	init__getPrototype();
	init__isPrototype();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_baseIsMap.js
/**
* The base implementation of `_.isMap` without Node.js optimizations.
*
* @private
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a map, else `false`.
*/
function baseIsMap(value) {
	return isObjectLike(value) && _getTag_default(value) == mapTag$3;
}
var mapTag$3;
var init__baseIsMap = __esmMin((() => {
	init__getTag();
	init_isObjectLike();
	mapTag$3 = "[object Map]";
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/isMap.js
var nodeIsMap, isMap;
var init_isMap = __esmMin((() => {
	init__baseIsMap();
	init__baseUnary();
	init__nodeUtil();
	nodeIsMap = nodeUtil && nodeUtil.isMap;
	isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_baseIsSet.js
/**
* The base implementation of `_.isSet` without Node.js optimizations.
*
* @private
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a set, else `false`.
*/
function baseIsSet(value) {
	return isObjectLike(value) && _getTag_default(value) == setTag$3;
}
var setTag$3;
var init__baseIsSet = __esmMin((() => {
	init__getTag();
	init_isObjectLike();
	setTag$3 = "[object Set]";
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/isSet.js
var nodeIsSet, isSet;
var init_isSet = __esmMin((() => {
	init__baseIsSet();
	init__baseUnary();
	init__nodeUtil();
	nodeIsSet = nodeUtil && nodeUtil.isSet;
	isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_baseClone.js
/**
* The base implementation of `_.clone` and `_.cloneDeep` which tracks
* traversed objects.
*
* @private
* @param {*} value The value to clone.
* @param {boolean} bitmask The bitmask flags.
*  1 - Deep clone
*  2 - Flatten inherited properties
*  4 - Clone symbols
* @param {Function} [customizer] The function to customize cloning.
* @param {string} [key] The key of `value`.
* @param {Object} [object] The parent object of `value`.
* @param {Object} [stack] Tracks traversed objects and their clone counterparts.
* @returns {*} Returns the cloned value.
*/
function baseClone(value, bitmask, customizer, key, object, stack) {
	var result, isDeep = bitmask & CLONE_DEEP_FLAG$1, isFlat = bitmask & CLONE_FLAT_FLAG$1, isFull = bitmask & CLONE_SYMBOLS_FLAG$1;
	if (customizer) result = object ? customizer(value, key, object, stack) : customizer(value);
	if (result !== void 0) return result;
	if (!isObject(value)) return value;
	var isArr = isArray(value);
	if (isArr) {
		result = initCloneArray(value);
		if (!isDeep) return copyArray(value, result);
	} else {
		var tag = _getTag_default(value), isFunc = tag == funcTag || tag == genTag;
		if (isBuffer(value)) return cloneBuffer(value, isDeep);
		if (tag == objectTag$1 || tag == argsTag$1 || isFunc && !object) {
			result = isFlat || isFunc ? {} : initCloneObject(value);
			if (!isDeep) return isFlat ? copySymbolsIn(value, baseAssignIn(result, value)) : copySymbols(value, baseAssign(result, value));
		} else {
			if (!cloneableTags[tag]) return object ? value : {};
			result = initCloneByTag(value, tag, isDeep);
		}
	}
	stack || (stack = new Stack());
	var stacked = stack.get(value);
	if (stacked) return stacked;
	stack.set(value, result);
	if (isSet(value)) value.forEach(function(subValue) {
		result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
	});
	else if (isMap(value)) value.forEach(function(subValue, key) {
		result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
	});
	var props = isArr ? void 0 : (isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys)(value);
	arrayEach(props || value, function(subValue, key) {
		if (props) {
			key = subValue;
			subValue = value[key];
		}
		assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
	});
	return result;
}
var CLONE_DEEP_FLAG$1, CLONE_FLAT_FLAG$1, CLONE_SYMBOLS_FLAG$1, argsTag$1, arrayTag$1, boolTag$1, dateTag$1, errorTag$1, funcTag, genTag, mapTag$2, numberTag$1, objectTag$1, regexpTag$1, setTag$2, stringTag$1, symbolTag$1, weakMapTag, arrayBufferTag$1, dataViewTag$1, float32Tag, float64Tag, int8Tag, int16Tag, int32Tag, uint8Tag, uint8ClampedTag, uint16Tag, uint32Tag, cloneableTags;
var init__baseClone = __esmMin((() => {
	init__Stack();
	init__arrayEach();
	init__assignValue();
	init__baseAssign();
	init__baseAssignIn();
	init__cloneBuffer();
	init__copyArray();
	init__copySymbols();
	init__copySymbolsIn();
	init__getAllKeys();
	init__getAllKeysIn();
	init__getTag();
	init__initCloneArray();
	init__initCloneByTag();
	init__initCloneObject();
	init_isArray();
	init_isBuffer();
	init_isMap();
	init_isObject();
	init_isSet();
	init_keys();
	init_keysIn();
	CLONE_DEEP_FLAG$1 = 1, CLONE_FLAT_FLAG$1 = 2, CLONE_SYMBOLS_FLAG$1 = 4;
	argsTag$1 = "[object Arguments]", arrayTag$1 = "[object Array]", boolTag$1 = "[object Boolean]", dateTag$1 = "[object Date]", errorTag$1 = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag$2 = "[object Map]", numberTag$1 = "[object Number]", objectTag$1 = "[object Object]", regexpTag$1 = "[object RegExp]", setTag$2 = "[object Set]", stringTag$1 = "[object String]", symbolTag$1 = "[object Symbol]", weakMapTag = "[object WeakMap]";
	arrayBufferTag$1 = "[object ArrayBuffer]", dataViewTag$1 = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
	cloneableTags = {};
	cloneableTags[argsTag$1] = cloneableTags[arrayTag$1] = cloneableTags[arrayBufferTag$1] = cloneableTags[dataViewTag$1] = cloneableTags[boolTag$1] = cloneableTags[dateTag$1] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag$2] = cloneableTags[numberTag$1] = cloneableTags[objectTag$1] = cloneableTags[regexpTag$1] = cloneableTags[setTag$2] = cloneableTags[stringTag$1] = cloneableTags[symbolTag$1] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
	cloneableTags[errorTag$1] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_setCacheAdd.js
/**
* Adds `value` to the array cache.
*
* @private
* @name add
* @memberOf SetCache
* @alias push
* @param {*} value The value to cache.
* @returns {Object} Returns the cache instance.
*/
function setCacheAdd(value) {
	this.__data__.set(value, HASH_UNDEFINED);
	return this;
}
var HASH_UNDEFINED;
var init__setCacheAdd = __esmMin((() => {
	HASH_UNDEFINED = "__lodash_hash_undefined__";
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_setCacheHas.js
/**
* Checks if `value` is in the array cache.
*
* @private
* @name has
* @memberOf SetCache
* @param {*} value The value to search for.
* @returns {boolean} Returns `true` if `value` is found, else `false`.
*/
function setCacheHas(value) {
	return this.__data__.has(value);
}
var init__setCacheHas = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_SetCache.js
/**
*
* Creates an array cache object to store unique values.
*
* @private
* @constructor
* @param {Array} [values] The values to cache.
*/
function SetCache(values) {
	var index = -1, length = values == null ? 0 : values.length;
	this.__data__ = new MapCache();
	while (++index < length) this.add(values[index]);
}
var init__SetCache = __esmMin((() => {
	init__MapCache();
	init__setCacheAdd();
	init__setCacheHas();
	SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
	SetCache.prototype.has = setCacheHas;
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_arraySome.js
/**
* A specialized version of `_.some` for arrays without support for iteratee
* shorthands.
*
* @private
* @param {Array} [array] The array to iterate over.
* @param {Function} predicate The function invoked per iteration.
* @returns {boolean} Returns `true` if any element passes the predicate check,
*  else `false`.
*/
function arraySome(array, predicate) {
	var index = -1, length = array == null ? 0 : array.length;
	while (++index < length) if (predicate(array[index], index, array)) return true;
	return false;
}
var init__arraySome = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_cacheHas.js
/**
* Checks if a `cache` value for `key` exists.
*
* @private
* @param {Object} cache The cache to query.
* @param {string} key The key of the entry to check.
* @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
*/
function cacheHas(cache, key) {
	return cache.has(key);
}
var init__cacheHas = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_equalArrays.js
/**
* A specialized version of `baseIsEqualDeep` for arrays with support for
* partial deep comparisons.
*
* @private
* @param {Array} array The array to compare.
* @param {Array} other The other array to compare.
* @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
* @param {Function} customizer The function to customize comparisons.
* @param {Function} equalFunc The function to determine equivalents of values.
* @param {Object} stack Tracks traversed `array` and `other` objects.
* @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
*/
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
	var isPartial = bitmask & COMPARE_PARTIAL_FLAG$5, arrLength = array.length, othLength = other.length;
	if (arrLength != othLength && !(isPartial && othLength > arrLength)) return false;
	var arrStacked = stack.get(array);
	var othStacked = stack.get(other);
	if (arrStacked && othStacked) return arrStacked == other && othStacked == array;
	var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG$3 ? new SetCache() : void 0;
	stack.set(array, other);
	stack.set(other, array);
	while (++index < arrLength) {
		var arrValue = array[index], othValue = other[index];
		if (customizer) var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
		if (compared !== void 0) {
			if (compared) continue;
			result = false;
			break;
		}
		if (seen) {
			if (!arraySome(other, function(othValue, othIndex) {
				if (!cacheHas(seen, othIndex) && (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) return seen.push(othIndex);
			})) {
				result = false;
				break;
			}
		} else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
			result = false;
			break;
		}
	}
	stack["delete"](array);
	stack["delete"](other);
	return result;
}
var COMPARE_PARTIAL_FLAG$5, COMPARE_UNORDERED_FLAG$3;
var init__equalArrays = __esmMin((() => {
	init__SetCache();
	init__arraySome();
	init__cacheHas();
	COMPARE_PARTIAL_FLAG$5 = 1, COMPARE_UNORDERED_FLAG$3 = 2;
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_mapToArray.js
/**
* Converts `map` to its key-value pairs.
*
* @private
* @param {Object} map The map to convert.
* @returns {Array} Returns the key-value pairs.
*/
function mapToArray(map) {
	var index = -1, result = Array(map.size);
	map.forEach(function(value, key) {
		result[++index] = [key, value];
	});
	return result;
}
var init__mapToArray = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_setToArray.js
/**
* Converts `set` to an array of its values.
*
* @private
* @param {Object} set The set to convert.
* @returns {Array} Returns the values.
*/
function setToArray(set) {
	var index = -1, result = Array(set.size);
	set.forEach(function(value) {
		result[++index] = value;
	});
	return result;
}
var init__setToArray = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_equalByTag.js
/**
* A specialized version of `baseIsEqualDeep` for comparing objects of
* the same `toStringTag`.
*
* **Note:** This function only supports comparing values with tags of
* `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
*
* @private
* @param {Object} object The object to compare.
* @param {Object} other The other object to compare.
* @param {string} tag The `toStringTag` of the objects to compare.
* @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
* @param {Function} customizer The function to customize comparisons.
* @param {Function} equalFunc The function to determine equivalents of values.
* @param {Object} stack Tracks traversed `object` and `other` objects.
* @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
*/
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
	switch (tag) {
		case dataViewTag:
			if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) return false;
			object = object.buffer;
			other = other.buffer;
		case arrayBufferTag:
			if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other))) return false;
			return true;
		case boolTag:
		case dateTag:
		case numberTag: return eq(+object, +other);
		case errorTag: return object.name == other.name && object.message == other.message;
		case regexpTag:
		case stringTag: return object == other + "";
		case mapTag$1: var convert = mapToArray;
		case setTag$1:
			var isPartial = bitmask & COMPARE_PARTIAL_FLAG$4;
			convert || (convert = setToArray);
			if (object.size != other.size && !isPartial) return false;
			var stacked = stack.get(object);
			if (stacked) return stacked == other;
			bitmask |= COMPARE_UNORDERED_FLAG$2;
			stack.set(object, other);
			var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
			stack["delete"](object);
			return result;
		case symbolTag: if (symbolValueOf) return symbolValueOf.call(object) == symbolValueOf.call(other);
	}
	return false;
}
var COMPARE_PARTIAL_FLAG$4, COMPARE_UNORDERED_FLAG$2, boolTag, dateTag, errorTag, mapTag$1, numberTag, regexpTag, setTag$1, stringTag, symbolTag, arrayBufferTag, dataViewTag, symbolProto, symbolValueOf;
var init__equalByTag = __esmMin((() => {
	init__Symbol();
	init__Uint8Array();
	init_eq();
	init__equalArrays();
	init__mapToArray();
	init__setToArray();
	COMPARE_PARTIAL_FLAG$4 = 1, COMPARE_UNORDERED_FLAG$2 = 2;
	boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", mapTag$1 = "[object Map]", numberTag = "[object Number]", regexpTag = "[object RegExp]", setTag$1 = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]";
	arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]";
	symbolProto = Symbol$1 ? Symbol$1.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_equalObjects.js
/**
* A specialized version of `baseIsEqualDeep` for objects with support for
* partial deep comparisons.
*
* @private
* @param {Object} object The object to compare.
* @param {Object} other The other object to compare.
* @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
* @param {Function} customizer The function to customize comparisons.
* @param {Function} equalFunc The function to determine equivalents of values.
* @param {Object} stack Tracks traversed `object` and `other` objects.
* @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
*/
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
	var isPartial = bitmask & COMPARE_PARTIAL_FLAG$3, objProps = getAllKeys(object), objLength = objProps.length;
	if (objLength != getAllKeys(other).length && !isPartial) return false;
	var index = objLength;
	while (index--) {
		var key = objProps[index];
		if (!(isPartial ? key in other : hasOwnProperty$3.call(other, key))) return false;
	}
	var objStacked = stack.get(object);
	var othStacked = stack.get(other);
	if (objStacked && othStacked) return objStacked == other && othStacked == object;
	var result = true;
	stack.set(object, other);
	stack.set(other, object);
	var skipCtor = isPartial;
	while (++index < objLength) {
		key = objProps[index];
		var objValue = object[key], othValue = other[key];
		if (customizer) var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
		if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
			result = false;
			break;
		}
		skipCtor || (skipCtor = key == "constructor");
	}
	if (result && !skipCtor) {
		var objCtor = object.constructor, othCtor = other.constructor;
		if (objCtor != othCtor && "constructor" in object && "constructor" in other && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) result = false;
	}
	stack["delete"](object);
	stack["delete"](other);
	return result;
}
var COMPARE_PARTIAL_FLAG$3, hasOwnProperty$3;
var init__equalObjects = __esmMin((() => {
	init__getAllKeys();
	COMPARE_PARTIAL_FLAG$3 = 1;
	hasOwnProperty$3 = Object.prototype.hasOwnProperty;
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_baseIsEqualDeep.js
/**
* A specialized version of `baseIsEqual` for arrays and objects which performs
* deep comparisons and tracks traversed objects enabling objects with circular
* references to be compared.
*
* @private
* @param {Object} object The object to compare.
* @param {Object} other The other object to compare.
* @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
* @param {Function} customizer The function to customize comparisons.
* @param {Function} equalFunc The function to determine equivalents of values.
* @param {Object} [stack] Tracks traversed `object` and `other` objects.
* @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
*/
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
	var objIsArr = isArray(object), othIsArr = isArray(other), objTag = objIsArr ? arrayTag : _getTag_default(object), othTag = othIsArr ? arrayTag : _getTag_default(other);
	objTag = objTag == argsTag ? objectTag : objTag;
	othTag = othTag == argsTag ? objectTag : othTag;
	var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
	if (isSameTag && isBuffer(object)) {
		if (!isBuffer(other)) return false;
		objIsArr = true;
		objIsObj = false;
	}
	if (isSameTag && !objIsObj) {
		stack || (stack = new Stack());
		return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
	}
	if (!(bitmask & COMPARE_PARTIAL_FLAG$2)) {
		var objIsWrapped = objIsObj && hasOwnProperty$2.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty$2.call(other, "__wrapped__");
		if (objIsWrapped || othIsWrapped) {
			var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
			stack || (stack = new Stack());
			return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
		}
	}
	if (!isSameTag) return false;
	stack || (stack = new Stack());
	return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}
var COMPARE_PARTIAL_FLAG$2, argsTag, arrayTag, objectTag, hasOwnProperty$2;
var init__baseIsEqualDeep = __esmMin((() => {
	init__Stack();
	init__equalArrays();
	init__equalByTag();
	init__equalObjects();
	init__getTag();
	init_isArray();
	init_isBuffer();
	init_isTypedArray();
	COMPARE_PARTIAL_FLAG$2 = 1;
	argsTag = "[object Arguments]", arrayTag = "[object Array]", objectTag = "[object Object]";
	hasOwnProperty$2 = Object.prototype.hasOwnProperty;
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_baseIsEqual.js
/**
* The base implementation of `_.isEqual` which supports partial comparisons
* and tracks traversed objects.
*
* @private
* @param {*} value The value to compare.
* @param {*} other The other value to compare.
* @param {boolean} bitmask The bitmask flags.
*  1 - Unordered comparison
*  2 - Partial comparison
* @param {Function} [customizer] The function to customize comparisons.
* @param {Object} [stack] Tracks traversed `value` and `other` objects.
* @returns {boolean} Returns `true` if the values are equivalent, else `false`.
*/
function baseIsEqual(value, other, bitmask, customizer, stack) {
	if (value === other) return true;
	if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) return value !== value && other !== other;
	return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}
var init__baseIsEqual = __esmMin((() => {
	init__baseIsEqualDeep();
	init_isObjectLike();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_baseIsMatch.js
/**
* The base implementation of `_.isMatch` without support for iteratee shorthands.
*
* @private
* @param {Object} object The object to inspect.
* @param {Object} source The object of property values to match.
* @param {Array} matchData The property names, values, and compare flags to match.
* @param {Function} [customizer] The function to customize comparisons.
* @returns {boolean} Returns `true` if `object` is a match, else `false`.
*/
function baseIsMatch(object, source, matchData, customizer) {
	var index = matchData.length, length = index, noCustomizer = !customizer;
	if (object == null) return !length;
	object = Object(object);
	while (index--) {
		var data = matchData[index];
		if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) return false;
	}
	while (++index < length) {
		data = matchData[index];
		var key = data[0], objValue = object[key], srcValue = data[1];
		if (noCustomizer && data[2]) {
			if (objValue === void 0 && !(key in object)) return false;
		} else {
			var stack = new Stack();
			if (customizer) var result = customizer(objValue, srcValue, key, object, source, stack);
			if (!(result === void 0 ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$1 | COMPARE_UNORDERED_FLAG$1, customizer, stack) : result)) return false;
		}
	}
	return true;
}
var COMPARE_PARTIAL_FLAG$1, COMPARE_UNORDERED_FLAG$1;
var init__baseIsMatch = __esmMin((() => {
	init__Stack();
	init__baseIsEqual();
	COMPARE_PARTIAL_FLAG$1 = 1, COMPARE_UNORDERED_FLAG$1 = 2;
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_isStrictComparable.js
/**
* Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
*
* @private
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` if suitable for strict
*  equality comparisons, else `false`.
*/
function isStrictComparable(value) {
	return value === value && !isObject(value);
}
var init__isStrictComparable = __esmMin((() => {
	init_isObject();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_getMatchData.js
/**
* Gets the property names, values, and compare flags of `object`.
*
* @private
* @param {Object} object The object to query.
* @returns {Array} Returns the match data of `object`.
*/
function getMatchData(object) {
	var result = keys(object), length = result.length;
	while (length--) {
		var key = result[length], value = object[key];
		result[length] = [
			key,
			value,
			isStrictComparable(value)
		];
	}
	return result;
}
var init__getMatchData = __esmMin((() => {
	init__isStrictComparable();
	init_keys();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_matchesStrictComparable.js
/**
* A specialized version of `matchesProperty` for source values suitable
* for strict equality comparisons, i.e. `===`.
*
* @private
* @param {string} key The key of the property to get.
* @param {*} srcValue The value to match.
* @returns {Function} Returns the new spec function.
*/
function matchesStrictComparable(key, srcValue) {
	return function(object) {
		if (object == null) return false;
		return object[key] === srcValue && (srcValue !== void 0 || key in Object(object));
	};
}
var init__matchesStrictComparable = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_baseMatches.js
/**
* The base implementation of `_.matches` which doesn't clone `source`.
*
* @private
* @param {Object} source The object of property values to match.
* @returns {Function} Returns the new spec function.
*/
function baseMatches(source) {
	var matchData = getMatchData(source);
	if (matchData.length == 1 && matchData[0][2]) return matchesStrictComparable(matchData[0][0], matchData[0][1]);
	return function(object) {
		return object === source || baseIsMatch(object, source, matchData);
	};
}
var init__baseMatches = __esmMin((() => {
	init__baseIsMatch();
	init__getMatchData();
	init__matchesStrictComparable();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_baseHasIn.js
/**
* The base implementation of `_.hasIn` without support for deep paths.
*
* @private
* @param {Object} [object] The object to query.
* @param {Array|string} key The key to check.
* @returns {boolean} Returns `true` if `key` exists, else `false`.
*/
function baseHasIn(object, key) {
	return object != null && key in Object(object);
}
var init__baseHasIn = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_hasPath.js
/**
* Checks if `path` exists on `object`.
*
* @private
* @param {Object} object The object to query.
* @param {Array|string} path The path to check.
* @param {Function} hasFunc The function to check properties.
* @returns {boolean} Returns `true` if `path` exists, else `false`.
*/
function hasPath(object, path, hasFunc) {
	path = castPath(path, object);
	var index = -1, length = path.length, result = false;
	while (++index < length) {
		var key = toKey(path[index]);
		if (!(result = object != null && hasFunc(object, key))) break;
		object = object[key];
	}
	if (result || ++index != length) return result;
	length = object == null ? 0 : object.length;
	return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
}
var init__hasPath = __esmMin((() => {
	init__castPath();
	init_isArguments();
	init_isArray();
	init__isIndex();
	init_isLength();
	init__toKey();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/hasIn.js
/**
* Checks if `path` is a direct or inherited property of `object`.
*
* @static
* @memberOf _
* @since 4.0.0
* @category Object
* @param {Object} object The object to query.
* @param {Array|string} path The path to check.
* @returns {boolean} Returns `true` if `path` exists, else `false`.
* @example
*
* var object = _.create({ 'a': _.create({ 'b': 2 }) });
*
* _.hasIn(object, 'a');
* // => true
*
* _.hasIn(object, 'a.b');
* // => true
*
* _.hasIn(object, ['a', 'b']);
* // => true
*
* _.hasIn(object, 'b');
* // => false
*/
function hasIn(object, path) {
	return object != null && hasPath(object, path, baseHasIn);
}
var init_hasIn = __esmMin((() => {
	init__baseHasIn();
	init__hasPath();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_baseMatchesProperty.js
/**
* The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
*
* @private
* @param {string} path The path of the property to get.
* @param {*} srcValue The value to match.
* @returns {Function} Returns the new spec function.
*/
function baseMatchesProperty(path, srcValue) {
	if (isKey(path) && isStrictComparable(srcValue)) return matchesStrictComparable(toKey(path), srcValue);
	return function(object) {
		var objValue = get(object, path);
		return objValue === void 0 && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
	};
}
var COMPARE_PARTIAL_FLAG, COMPARE_UNORDERED_FLAG;
var init__baseMatchesProperty = __esmMin((() => {
	init__baseIsEqual();
	init_get();
	init_hasIn();
	init__isKey();
	init__isStrictComparable();
	init__matchesStrictComparable();
	init__toKey();
	COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_baseProperty.js
/**
* The base implementation of `_.property` without support for deep paths.
*
* @private
* @param {string} key The key of the property to get.
* @returns {Function} Returns the new accessor function.
*/
function baseProperty(key) {
	return function(object) {
		return object == null ? void 0 : object[key];
	};
}
var init__baseProperty = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_basePropertyDeep.js
/**
* A specialized version of `baseProperty` which supports deep paths.
*
* @private
* @param {Array|string} path The path of the property to get.
* @returns {Function} Returns the new accessor function.
*/
function basePropertyDeep(path) {
	return function(object) {
		return baseGet(object, path);
	};
}
var init__basePropertyDeep = __esmMin((() => {
	init__baseGet();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/property.js
/**
* Creates a function that returns the value at `path` of a given object.
*
* @static
* @memberOf _
* @since 2.4.0
* @category Util
* @param {Array|string} path The path of the property to get.
* @returns {Function} Returns the new accessor function.
* @example
*
* var objects = [
*   { 'a': { 'b': 2 } },
*   { 'a': { 'b': 1 } }
* ];
*
* _.map(objects, _.property('a.b'));
* // => [2, 1]
*
* _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
* // => [1, 2]
*/
function property(path) {
	return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
}
var init_property = __esmMin((() => {
	init__baseProperty();
	init__basePropertyDeep();
	init__isKey();
	init__toKey();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_baseIteratee.js
/**
* The base implementation of `_.iteratee`.
*
* @private
* @param {*} [value=_.identity] The value to convert to an iteratee.
* @returns {Function} Returns the iteratee.
*/
function baseIteratee(value) {
	if (typeof value == "function") return value;
	if (value == null) return identity;
	if (typeof value == "object") return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
	return property(value);
}
var init__baseIteratee = __esmMin((() => {
	init__baseMatches();
	init__baseMatchesProperty();
	init_identity();
	init_isArray();
	init_property();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_arrayAggregator.js
/**
* A specialized version of `baseAggregator` for arrays.
*
* @private
* @param {Array} [array] The array to iterate over.
* @param {Function} setter The function to set `accumulator` values.
* @param {Function} iteratee The iteratee to transform keys.
* @param {Object} accumulator The initial aggregated object.
* @returns {Function} Returns `accumulator`.
*/
function arrayAggregator(array, setter, iteratee, accumulator) {
	var index = -1, length = array == null ? 0 : array.length;
	while (++index < length) {
		var value = array[index];
		setter(accumulator, value, iteratee(value), array);
	}
	return accumulator;
}
var init__arrayAggregator = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_createBaseFor.js
/**
* Creates a base function for methods like `_.forIn` and `_.forOwn`.
*
* @private
* @param {boolean} [fromRight] Specify iterating from right to left.
* @returns {Function} Returns the new base function.
*/
function createBaseFor(fromRight) {
	return function(object, iteratee, keysFunc) {
		var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
		while (length--) {
			var key = props[fromRight ? length : ++index];
			if (iteratee(iterable[key], key, iterable) === false) break;
		}
		return object;
	};
}
var init__createBaseFor = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_baseFor.js
var baseFor;
var init__baseFor = __esmMin((() => {
	init__createBaseFor();
	baseFor = createBaseFor();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_baseForOwn.js
/**
* The base implementation of `_.forOwn` without support for iteratee shorthands.
*
* @private
* @param {Object} object The object to iterate over.
* @param {Function} iteratee The function invoked per iteration.
* @returns {Object} Returns `object`.
*/
function baseForOwn(object, iteratee) {
	return object && baseFor(object, iteratee, keys);
}
var init__baseForOwn = __esmMin((() => {
	init__baseFor();
	init_keys();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_createBaseEach.js
/**
* Creates a `baseEach` or `baseEachRight` function.
*
* @private
* @param {Function} eachFunc The function to iterate over a collection.
* @param {boolean} [fromRight] Specify iterating from right to left.
* @returns {Function} Returns the new base function.
*/
function createBaseEach(eachFunc, fromRight) {
	return function(collection, iteratee) {
		if (collection == null) return collection;
		if (!isArrayLike(collection)) return eachFunc(collection, iteratee);
		var length = collection.length, index = fromRight ? length : -1, iterable = Object(collection);
		while (fromRight ? index-- : ++index < length) if (iteratee(iterable[index], index, iterable) === false) break;
		return collection;
	};
}
var init__createBaseEach = __esmMin((() => {
	init_isArrayLike();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_baseEach.js
var baseEach;
var init__baseEach = __esmMin((() => {
	init__baseForOwn();
	init__createBaseEach();
	baseEach = createBaseEach(baseForOwn);
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_baseAggregator.js
/**
* Aggregates elements of `collection` on `accumulator` with keys transformed
* by `iteratee` and values set by `setter`.
*
* @private
* @param {Array|Object} collection The collection to iterate over.
* @param {Function} setter The function to set `accumulator` values.
* @param {Function} iteratee The iteratee to transform keys.
* @param {Object} accumulator The initial aggregated object.
* @returns {Function} Returns `accumulator`.
*/
function baseAggregator(collection, setter, iteratee, accumulator) {
	baseEach(collection, function(value, key, collection) {
		setter(accumulator, value, iteratee(value), collection);
	});
	return accumulator;
}
var init__baseAggregator = __esmMin((() => {
	init__baseEach();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_createAggregator.js
/**
* Creates a function like `_.groupBy`.
*
* @private
* @param {Function} setter The function to set accumulator values.
* @param {Function} [initializer] The accumulator object initializer.
* @returns {Function} Returns the new aggregator function.
*/
function createAggregator(setter, initializer) {
	return function(collection, iteratee) {
		var func = isArray(collection) ? arrayAggregator : baseAggregator, accumulator = initializer ? initializer() : {};
		return func(collection, setter, baseIteratee(iteratee, 2), accumulator);
	};
}
var init__createAggregator = __esmMin((() => {
	init__arrayAggregator();
	init__baseAggregator();
	init__baseIteratee();
	init_isArray();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/now.js
var now;
var init_now = __esmMin((() => {
	init__root();
	now = function() {
		return root.Date.now();
	};
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/debounce.js
/**
* Creates a debounced function that delays invoking `func` until after `wait`
* milliseconds have elapsed since the last time the debounced function was
* invoked. The debounced function comes with a `cancel` method to cancel
* delayed `func` invocations and a `flush` method to immediately invoke them.
* Provide `options` to indicate whether `func` should be invoked on the
* leading and/or trailing edge of the `wait` timeout. The `func` is invoked
* with the last arguments provided to the debounced function. Subsequent
* calls to the debounced function return the result of the last `func`
* invocation.
*
* **Note:** If `leading` and `trailing` options are `true`, `func` is
* invoked on the trailing edge of the timeout only if the debounced function
* is invoked more than once during the `wait` timeout.
*
* If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
* until to the next tick, similar to `setTimeout` with a timeout of `0`.
*
* See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
* for details over the differences between `_.debounce` and `_.throttle`.
*
* @static
* @memberOf _
* @since 0.1.0
* @category Function
* @param {Function} func The function to debounce.
* @param {number} [wait=0] The number of milliseconds to delay.
* @param {Object} [options={}] The options object.
* @param {boolean} [options.leading=false]
*  Specify invoking on the leading edge of the timeout.
* @param {number} [options.maxWait]
*  The maximum time `func` is allowed to be delayed before it's invoked.
* @param {boolean} [options.trailing=true]
*  Specify invoking on the trailing edge of the timeout.
* @returns {Function} Returns the new debounced function.
* @example
*
* // Avoid costly calculations while the window size is in flux.
* jQuery(window).on('resize', _.debounce(calculateLayout, 150));
*
* // Invoke `sendMail` when clicked, debouncing subsequent calls.
* jQuery(element).on('click', _.debounce(sendMail, 300, {
*   'leading': true,
*   'trailing': false
* }));
*
* // Ensure `batchLog` is invoked once after 1 second of debounced calls.
* var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
* var source = new EventSource('/stream');
* jQuery(source).on('message', debounced);
*
* // Cancel the trailing debounced invocation.
* jQuery(window).on('popstate', debounced.cancel);
*/
function debounce(func, wait, options) {
	var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
	if (typeof func != "function") throw new TypeError(FUNC_ERROR_TEXT);
	wait = toNumber(wait) || 0;
	if (isObject(options)) {
		leading = !!options.leading;
		maxing = "maxWait" in options;
		maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
		trailing = "trailing" in options ? !!options.trailing : trailing;
	}
	function invokeFunc(time) {
		var args = lastArgs, thisArg = lastThis;
		lastArgs = lastThis = void 0;
		lastInvokeTime = time;
		result = func.apply(thisArg, args);
		return result;
	}
	function leadingEdge(time) {
		lastInvokeTime = time;
		timerId = setTimeout(timerExpired, wait);
		return leading ? invokeFunc(time) : result;
	}
	function remainingWait(time) {
		var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
		return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
	}
	function shouldInvoke(time) {
		var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
		return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
	}
	function timerExpired() {
		var time = now();
		if (shouldInvoke(time)) return trailingEdge(time);
		timerId = setTimeout(timerExpired, remainingWait(time));
	}
	function trailingEdge(time) {
		timerId = void 0;
		if (trailing && lastArgs) return invokeFunc(time);
		lastArgs = lastThis = void 0;
		return result;
	}
	function cancel() {
		if (timerId !== void 0) clearTimeout(timerId);
		lastInvokeTime = 0;
		lastArgs = lastCallTime = lastThis = timerId = void 0;
	}
	function flush() {
		return timerId === void 0 ? result : trailingEdge(now());
	}
	function debounced() {
		var time = now(), isInvoking = shouldInvoke(time);
		lastArgs = arguments;
		lastThis = this;
		lastCallTime = time;
		if (isInvoking) {
			if (timerId === void 0) return leadingEdge(lastCallTime);
			if (maxing) {
				clearTimeout(timerId);
				timerId = setTimeout(timerExpired, wait);
				return invokeFunc(lastCallTime);
			}
		}
		if (timerId === void 0) timerId = setTimeout(timerExpired, wait);
		return result;
	}
	debounced.cancel = cancel;
	debounced.flush = flush;
	return debounced;
}
var FUNC_ERROR_TEXT, nativeMax, nativeMin;
var init_debounce = __esmMin((() => {
	init_isObject();
	init_now();
	init_toNumber();
	FUNC_ERROR_TEXT = "Expected a function";
	nativeMax = Math.max, nativeMin = Math.min;
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_arrayIncludesWith.js
/**
* This function is like `arrayIncludes` except that it accepts a comparator.
*
* @private
* @param {Array} [array] The array to inspect.
* @param {*} target The value to search for.
* @param {Function} comparator The comparator invoked per element.
* @returns {boolean} Returns `true` if `target` is found, else `false`.
*/
function arrayIncludesWith(array, value, comparator) {
	var index = -1, length = array == null ? 0 : array.length;
	while (++index < length) if (comparator(value, array[index])) return true;
	return false;
}
var init__arrayIncludesWith = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/last.js
/**
* Gets the last element of `array`.
*
* @static
* @memberOf _
* @since 0.1.0
* @category Array
* @param {Array} array The array to query.
* @returns {*} Returns the last element of `array`.
* @example
*
* _.last([1, 2, 3]);
* // => 3
*/
function last(array) {
	var length = array == null ? 0 : array.length;
	return length ? array[length - 1] : void 0;
}
var init_last = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_escapeHtmlChar.js
var escapeHtmlChar;
var init__escapeHtmlChar = __esmMin((() => {
	init__basePropertyOf();
	escapeHtmlChar = basePropertyOf({
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		"\"": "&quot;",
		"'": "&#39;"
	});
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/escape.js
/**
* Converts the characters "&", "<", ">", '"', and "'" in `string` to their
* corresponding HTML entities.
*
* **Note:** No other characters are escaped. To escape additional
* characters use a third-party library like [_he_](https://mths.be/he).
*
* Though the ">" character is escaped for symmetry, characters like
* ">" and "/" don't need escaping in HTML and have no special meaning
* unless they're part of a tag or unquoted attribute value. See
* [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
* (under "semi-related fun fact") for more details.
*
* When working with HTML you should always
* [quote attribute values](http://wonko.com/post/html-escaping) to reduce
* XSS vectors.
*
* @static
* @since 0.1.0
* @memberOf _
* @category String
* @param {string} [string=''] The string to escape.
* @returns {string} Returns the escaped string.
* @example
*
* _.escape('fred, barney, & pebbles');
* // => 'fred, barney, &amp; pebbles'
*/
function escape(string) {
	string = toString(string);
	return string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string;
}
var reUnescapedHtml, reHasUnescapedHtml;
var init_escape = __esmMin((() => {
	init__escapeHtmlChar();
	init_toString();
	reUnescapedHtml = /[&<>"']/g, reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_baseMap.js
/**
* The base implementation of `_.map` without support for iteratee shorthands.
*
* @private
* @param {Array|Object} collection The collection to iterate over.
* @param {Function} iteratee The function invoked per iteration.
* @returns {Array} Returns the new mapped array.
*/
function baseMap(collection, iteratee) {
	var index = -1, result = isArrayLike(collection) ? Array(collection.length) : [];
	baseEach(collection, function(value, key, collection) {
		result[++index] = iteratee(value, key, collection);
	});
	return result;
}
var init__baseMap = __esmMin((() => {
	init__baseEach();
	init_isArrayLike();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/map.js
/**
* Creates an array of values by running each element in `collection` thru
* `iteratee`. The iteratee is invoked with three arguments:
* (value, index|key, collection).
*
* Many lodash methods are guarded to work as iteratees for methods like
* `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
*
* The guarded methods are:
* `ary`, `chunk`, `curry`, `curryRight`, `drop`, `dropRight`, `every`,
* `fill`, `invert`, `parseInt`, `random`, `range`, `rangeRight`, `repeat`,
* `sampleSize`, `slice`, `some`, `sortBy`, `split`, `take`, `takeRight`,
* `template`, `trim`, `trimEnd`, `trimStart`, and `words`
*
* @static
* @memberOf _
* @since 0.1.0
* @category Collection
* @param {Array|Object} collection The collection to iterate over.
* @param {Function} [iteratee=_.identity] The function invoked per iteration.
* @returns {Array} Returns the new mapped array.
* @example
*
* function square(n) {
*   return n * n;
* }
*
* _.map([4, 8], square);
* // => [16, 64]
*
* _.map({ 'a': 4, 'b': 8 }, square);
* // => [16, 64] (iteration order is not guaranteed)
*
* var users = [
*   { 'user': 'barney' },
*   { 'user': 'fred' }
* ];
*
* // The `_.property` iteratee shorthand.
* _.map(users, 'user');
* // => ['barney', 'fred']
*/
function map(collection, iteratee) {
	return (isArray(collection) ? arrayMap : baseMap)(collection, baseIteratee(iteratee, 3));
}
var init_map = __esmMin((() => {
	init__arrayMap();
	init__baseIteratee();
	init__baseMap();
	init_isArray();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_parent.js
/**
* Gets the parent value at `path` of `object`.
*
* @private
* @param {Object} object The object to query.
* @param {Array} path The path to get the parent value of.
* @returns {*} Returns the parent value.
*/
function parent(object, path) {
	return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
}
var init__parent = __esmMin((() => {
	init__baseGet();
	init__baseSlice();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/isEmpty.js
/**
* Checks if `value` is an empty object, collection, map, or set.
*
* Objects are considered empty if they have no own enumerable string keyed
* properties.
*
* Array-like values such as `arguments` objects, arrays, buffers, strings, or
* jQuery-like collections are considered empty if they have a `length` of `0`.
* Similarly, maps and sets are considered empty if they have a `size` of `0`.
*
* @static
* @memberOf _
* @since 0.1.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is empty, else `false`.
* @example
*
* _.isEmpty(null);
* // => true
*
* _.isEmpty(true);
* // => true
*
* _.isEmpty(1);
* // => true
*
* _.isEmpty([1, 2, 3]);
* // => false
*
* _.isEmpty({ 'a': 1 });
* // => false
*/
function isEmpty(value) {
	if (value == null) return true;
	if (isArrayLike(value) && (isArray(value) || typeof value == "string" || typeof value.splice == "function" || isBuffer(value) || isTypedArray(value) || isArguments(value))) return !value.length;
	var tag = _getTag_default(value);
	if (tag == mapTag || tag == setTag) return !value.size;
	if (isPrototype(value)) return !baseKeys(value).length;
	for (var key in value) if (hasOwnProperty$1.call(value, key)) return false;
	return true;
}
var mapTag, setTag, hasOwnProperty$1;
var init_isEmpty = __esmMin((() => {
	init__baseKeys();
	init__getTag();
	init_isArguments();
	init_isArray();
	init_isArrayLike();
	init_isBuffer();
	init__isPrototype();
	init_isTypedArray();
	mapTag = "[object Map]", setTag = "[object Set]";
	hasOwnProperty$1 = Object.prototype.hasOwnProperty;
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/isEqual.js
/**
* Performs a deep comparison between two values to determine if they are
* equivalent.
*
* **Note:** This method supports comparing arrays, array buffers, booleans,
* date objects, error objects, maps, numbers, `Object` objects, regexes,
* sets, strings, symbols, and typed arrays. `Object` objects are compared
* by their own, not inherited, enumerable properties. Functions and DOM
* nodes are compared by strict equality, i.e. `===`.
*
* @static
* @memberOf _
* @since 0.1.0
* @category Lang
* @param {*} value The value to compare.
* @param {*} other The other value to compare.
* @returns {boolean} Returns `true` if the values are equivalent, else `false`.
* @example
*
* var object = { 'a': 1 };
* var other = { 'a': 1 };
*
* _.isEqual(object, other);
* // => true
*
* object === other;
* // => false
*/
function isEqual(value, other) {
	return baseIsEqual(value, other);
}
var init_isEqual = __esmMin((() => {
	init__baseIsEqual();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/isUndefined.js
/**
* Checks if `value` is `undefined`.
*
* @static
* @since 0.1.0
* @memberOf _
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
* @example
*
* _.isUndefined(void 0);
* // => true
*
* _.isUndefined(null);
* // => false
*/
function isUndefined(value) {
	return value === void 0;
}
var init_isUndefined = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/keyBy.js
var keyBy;
var init_keyBy = __esmMin((() => {
	init__baseAssignValue();
	init__createAggregator();
	keyBy = createAggregator(function(result, value, key) {
		baseAssignValue(result, key, value);
	});
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_baseUnset.js
/**
* The base implementation of `_.unset`.
*
* @private
* @param {Object} object The object to modify.
* @param {Array|string} path The property path to unset.
* @returns {boolean} Returns `true` if the property is deleted, else `false`.
*/
function baseUnset(object, path) {
	path = castPath(path, object);
	var index = -1, length = path.length;
	if (!length) return true;
	while (++index < length) {
		var key = toKey(path[index]);
		if (key === "__proto__" && !hasOwnProperty.call(object, "__proto__")) return false;
		if ((key === "constructor" || key === "prototype") && index < length - 1) return false;
	}
	var obj = parent(object, path);
	return obj == null || delete obj[toKey(last(path))];
}
var hasOwnProperty;
var init__baseUnset = __esmMin((() => {
	init__castPath();
	init_last();
	init__parent();
	init__toKey();
	hasOwnProperty = Object.prototype.hasOwnProperty;
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_customOmitClone.js
/**
* Used by `_.omit` to customize its `_.cloneDeep` use to only clone plain
* objects.
*
* @private
* @param {*} value The value to inspect.
* @param {string} key The key of the property to inspect.
* @returns {*} Returns the uncloned value or `undefined` to defer cloning to `_.cloneDeep`.
*/
function customOmitClone(value) {
	return isPlainObject(value) ? void 0 : value;
}
var init__customOmitClone = __esmMin((() => {
	init_isPlainObject();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/omit.js
var CLONE_DEEP_FLAG, CLONE_FLAT_FLAG, CLONE_SYMBOLS_FLAG, omit;
var init_omit = __esmMin((() => {
	init__arrayMap();
	init__baseClone();
	init__baseUnset();
	init__castPath();
	init__copyObject();
	init__customOmitClone();
	init__flatRest();
	init__getAllKeysIn();
	CLONE_DEEP_FLAG = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG = 4;
	omit = flatRest(function(object, paths) {
		var result = {};
		if (object == null) return result;
		var isDeep = false;
		paths = arrayMap(paths, function(path) {
			path = castPath(path, object);
			isDeep || (isDeep = path.length > 1);
			return path;
		});
		copyObject(object, getAllKeysIn(object), result);
		if (isDeep) result = baseClone(result, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
		var length = paths.length;
		while (length--) baseUnset(result, paths[length]);
		return result;
	});
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_createSet.js
var createSet;
var init__createSet = __esmMin((() => {
	init__Set();
	init_noop();
	init__setToArray();
	createSet = !(Set$1 && 1 / setToArray(new Set$1([, -0]))[1] == Infinity) ? noop : function(values) {
		return new Set$1(values);
	};
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/_baseUniq.js
/**
* The base implementation of `_.uniqBy` without support for iteratee shorthands.
*
* @private
* @param {Array} array The array to inspect.
* @param {Function} [iteratee] The iteratee invoked per element.
* @param {Function} [comparator] The comparator invoked per element.
* @returns {Array} Returns the new duplicate free array.
*/
function baseUniq(array, iteratee, comparator) {
	var index = -1, includes = arrayIncludes, length = array.length, isCommon = true, result = [], seen = result;
	if (comparator) {
		isCommon = false;
		includes = arrayIncludesWith;
	} else if (length >= LARGE_ARRAY_SIZE) {
		var set = iteratee ? null : createSet(array);
		if (set) return setToArray(set);
		isCommon = false;
		includes = cacheHas;
		seen = new SetCache();
	} else seen = iteratee ? [] : result;
	outer: while (++index < length) {
		var value = array[index], computed = iteratee ? iteratee(value) : value;
		value = comparator || value !== 0 ? value : 0;
		if (isCommon && computed === computed) {
			var seenIndex = seen.length;
			while (seenIndex--) if (seen[seenIndex] === computed) continue outer;
			if (iteratee) seen.push(computed);
			result.push(value);
		} else if (!includes(seen, computed, comparator)) {
			if (seen !== result) seen.push(computed);
			result.push(value);
		}
	}
	return result;
}
var LARGE_ARRAY_SIZE;
var init__baseUniq = __esmMin((() => {
	init__SetCache();
	init__arrayIncludes();
	init__arrayIncludesWith();
	init__cacheHas();
	init__createSet();
	init__setToArray();
	LARGE_ARRAY_SIZE = 200;
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/uniq.js
/**
* Creates a duplicate-free version of an array, using
* [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
* for equality comparisons, in which only the first occurrence of each element
* is kept. The order of result values is determined by the order they occur
* in the array.
*
* @static
* @memberOf _
* @since 0.1.0
* @category Array
* @param {Array} array The array to inspect.
* @returns {Array} Returns the new duplicate free array.
* @example
*
* _.uniq([2, 1, 2]);
* // => [2, 1]
*/
function uniq(array) {
	return array && array.length ? baseUniq(array) : [];
}
var init_uniq = __esmMin((() => {
	init__baseUniq();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/uniqBy.js
/**
* This method is like `_.uniq` except that it accepts `iteratee` which is
* invoked for each element in `array` to generate the criterion by which
* uniqueness is computed. The order of result values is determined by the
* order they occur in the array. The iteratee is invoked with one argument:
* (value).
*
* @static
* @memberOf _
* @since 4.0.0
* @category Array
* @param {Array} array The array to inspect.
* @param {Function} [iteratee=_.identity] The iteratee invoked per element.
* @returns {Array} Returns the new duplicate free array.
* @example
*
* _.uniqBy([2.1, 1.2, 2.3], Math.floor);
* // => [2.1, 1.2]
*
* // The `_.property` iteratee shorthand.
* _.uniqBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
* // => [{ 'x': 1 }, { 'x': 2 }]
*/
function uniqBy(array, iteratee) {
	return array && array.length ? baseUniq(array, baseIteratee(iteratee, 2)) : [];
}
var init_uniqBy = __esmMin((() => {
	init__baseIteratee();
	init__baseUniq();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/node_modules/lodash-es/lodash.js
var init_lodash = __esmMin((() => {
	init_isSymbol();
	init__baseToString();
	init_toNumber();
	init_identity();
	init__WeakMap();
	init__baseCreate();
	init_isObject();
	init__root();
	init__apply();
	init_noop();
	init_isArray();
	init_isObjectLike();
	init__copyArray();
	init__shortOut();
	init__setToString();
	init__arrayEach();
	init__arrayIncludes();
	init__isIndex();
	init__assignValue();
	init__copyObject();
	init__overRest();
	init_eq();
	init_isArrayLike();
	init__isPrototype();
	init_keys();
	init_keysIn();
	init_get();
	init__flatRest();
	init__baseGetTag();
	init_isPlainObject();
	init__baseAssignValue();
	init__toKey();
	init_toString();
	init__baseSlice();
	init__basePropertyOf();
	init__baseClone();
	init__arrayPush();
	init__baseFlatten();
	init__arrayMap();
	init__baseIteratee();
	init_constant();
	init__createAggregator();
	init__baseAssign();
	init_debounce();
	init__Stack();
	init__baseFor();
	init__cloneBuffer();
	init__cloneTypedArray();
	init__initCloneObject();
	init_isArguments();
	init_isBuffer();
	init_isFunction();
	init_isTypedArray();
	init__SetCache();
	init__arrayIncludesWith();
	init__baseUnary();
	init__cacheHas();
	init_last();
	init__baseEach();
	init__createBaseFor();
	init__createBaseEach();
	init__getTag();
	init__mapToArray();
	init_escape();
	init__arrayFilter();
	init__baseFindIndex();
	init__baseForOwn();
	init_map();
	init_flatten();
	init__hasPath();
	init_hasIn();
	init__baseIndexOf();
	init__castPath();
	init__parent();
	init__nodeUtil();
	init_isEmpty();
	init_isEqual();
	init__baseIsEqual();
	init_isLength();
	init_isMap();
	init__baseIsMatch();
	init__getMatchData();
	init__baseIsNative();
	init__coreJsData();
	init_stubFalse();
	init_isSet();
	init_isUndefined();
	init_keyBy();
	init__baseIsNaN();
	init__baseMatches();
	init__baseMatchesProperty();
	init_memoize();
	init__Symbol();
	init__setToArray();
	init_now();
	init_omit();
	init__baseGet();
	init__getAllKeysIn();
	init__baseMap();
	init__arraySome();
	init__baseProperty();
	init_property();
	init__baseUnset();
	init__baseKeys();
	init_stubArray();
	init__baseTimes();
	init__stringToPath();
	init__getPrototype();
	init__baseTrim();
	init__trimmedEndIndex();
	init__baseUniq();
	init_uniq();
	init_uniqBy();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/dist/esm/chunks/file-item-1e7b17c1.js
function E$5(e) {
	return E$5 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
		return typeof e;
	} : function(e) {
		return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, E$5(e);
}
function y$4() {
	return y$4 = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var i in n) ({}).hasOwnProperty.call(n, i) && (e[i] = n[i]);
		}
		return e;
	}, y$4.apply(null, arguments);
}
function _$3(e, t, n) {
	return (t = function(e) {
		var t = function(e, t) {
			if ("object" != E$5(e) || !e) return e;
			var n = e[Symbol.toPrimitive];
			if (void 0 !== n) {
				var i = n.call(e, t || "default");
				if ("object" != E$5(i)) return i;
				throw new TypeError("@@toPrimitive must return a primitive value.");
			}
			return ("string" === t ? String : Number)(e);
		}(e, "string");
		return "symbol" == E$5(t) ? t : t + "";
	}(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
var import_react$28, import_react$29, import_classnames$12, w$6, D$5, S$6, L$4, I$5;
var init_file_item_1e7b17c1 = __esmMin((() => {
	import_react$28 = /* @__PURE__ */ __toESM(require_react());
	import_react$29 = /* @__PURE__ */ __toESM(require_react());
	init_esm$3();
	init_index_bc35b061();
	init_esm$4();
	init_esm$1();
	import_classnames$12 = /* @__PURE__ */ __toESM(require_classnames());
	init_slicedToArray_e715395f();
	init_index_c23defda();
	init_index_4a868389();
	init_style_inject_es_3984fa0f();
	w$6 = function(t) {
		return import_react$28.createElement("svg", y$4({
			width: 24,
			height: 24,
			viewBox: "0 0 24 24",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg"
		}, t), import_react$28.createElement("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M11.1066 12.083L6.16369 17.0942L7.05705 17.9999L12 12.9887L16.943 18L17.8363 17.0943L12.8933 12.083L18 6.9057L17.1066 6L12 11.1773L6.89335 6.00009L6 6.90579L11.1066 12.083Z",
			fill: "#454D5A",
			style: _$3(_$3({ fill: "#454D5A" }, "fill", "color(display-p3 0.2706 0.3020 0.3529)"), "fillOpacity", 1)
		}));
	};
	a$19(a$19(a$19(a$19(a$19(a$19(a$19({}, F$5.UPLOADING, i$17("use-file-import.status.uploading")), F$5.UPLOAD_SUCCESS, i$17("use-file-import.status.upload-success")), F$5.UPLOAD_FAILED, i$17("use-file-import.status.upload-failed")), m$6.PREPARE, i$17("use-file-import.status.prepare")), m$6.EMBEDDING, i$17("use-file-import.status.embedding")), m$6.EMBEDDING_SUCCESS, i$17("use-file-import.status.embedding-success")), m$6.EMBEDDING_FAILED, i$17("use-file-import.status.embedding-failed"));
	S$6 = a$19(a$19(a$19(a$19(a$19(a$19(a$19({}, F$5.UPLOADING, "loading"), F$5.UPLOAD_SUCCESS, "success"), F$5.UPLOAD_FAILED, "failed"), m$6.PREPARE, "loading"), m$6.EMBEDDING, "loading"), m$6.EMBEDDING_SUCCESS, "success"), m$6.EMBEDDING_FAILED, "failed");
	e$11(".ai-component-pc-uploader-box-file-item {\n  position: relative;\n  flex-shrink: 0;\n  height: 40px;\n  width: 210px;\n  align-items: center;\n  gap: 8px;\n  padding: 6px 8px;\n  border-radius: 8px;\n  background: var(--bg-lv4-medium, #f3f5f7);\n  cursor: pointer;\n}\n.ai-component-pc-uploader-box-file-item_wrapper {\n  display: flex;\n  flex-direction: row;\n  width: 100%;\n  height: 100%;\n  box-sizing: border-box;\n  align-items: center;\n  position: relative;\n}\n.ai-component-pc-uploader-box-file-item_progress {\n  width: calc(100% - 16px);\n  position: absolute;\n  bottom: 2px;\n  height: 2px;\n}\n.ai-component-pc-uploader-box-file-item_progress .ai-component-pc-uploader-box-file-item_progress-wrapper {\n  height: 2px;\n}\n.ai-component-pc-uploader-box-file-item:hover .ai-component-pc-uploader-box-file-item_delete-btn {\n  opacity: 1;\n}\n.ai-component-pc-uploader-box-file-item_delete-btn {\n  position: absolute;\n  bottom: auto;\n  right: 0px;\n  top: 0;\n  background: inherit;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 100%;\n  opacity: 0;\n  /* 初始状态下隐藏按钮 */\n}\n.ai-component-pc-uploader-box-file-item_delete-btn-icon {\n  width: 1em;\n  height: 1em;\n  padding: 2px;\n  border-radius: 100%;\n  background: var(--feedback-active, rgba(51, 77, 102, 0.08));\n}\n.ai-component-pc-uploader-box-file-item_delete-btn-icon path {\n  fill: var(--text-ultrastrong, rgba(0, 0, 0, 0.88)) !important;\n}\n.ai-component-pc-uploader-box-file-item_delete-btn-icon:hover {\n  background: var(--feedback-active, rgba(51, 77, 102, 0.08));\n}\n.ai-component-pc-uploader-box-file-item_icon {\n  display: flex;\n  align-items: center;\n}\n.ai-component-pc-uploader-box-file-item_icon_progress {\n  position: absolute;\n  left: 0;\n  height: 100%;\n  background: var(--t-doc-light-tsp-fill-tsp-fill-accent-strong, rgba(30, 111, 255, 0.12));\n}\n.ai-component-pc-uploader-box-file-item_content {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  flex-grow: 1;\n  overflow: hidden;\n  gap: 4px;\n}\n.ai-component-pc-uploader-box-file-item_content-title {\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  font-feature-settings: 'fina' on, 'init' on;\n  font-size: 15px;\n  font-weight: 400;\n  line-height: 20px;\n  padding-right: 7px;\n  box-sizing: border-box;\n  width: calc(100% - 14px);\n}\n.ai-component-pc-uploader-box-file-item_content-title,\n.ai-component-pc-uploader-box-file-item_content-description {\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.ai-component-pc-uploader-box-file-item_content-description {\n  width: 100%;\n}\n.ai-component-pc-uploader-box-file-item_content-description {\n  color: var(--text-medium, rgba(0, 0, 0, 0.48));\n  font-size: 12px;\n  line-height: 16px;\n}\n.ai-component-pc-uploader-box-file-item_content-progress {\n  color: var(--text-medium, rgba(0, 0, 0, 0.48));\n  font-size: 12px;\n}\n.status--failed {\n  border: 1px solid var(--t-doc-light-text-text-critical, #eb3639);\n  background: var(--token-red-red-07, #fee);\n}\n.status--loading {\n  opacity: 0.5;\n}\n.error-tooltip {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  flex-shrink: 0;\n}\n.error-tooltip_text {\n  color: var(--t-doc-light-text-text-ultrastrong, var(--text-ultrastrong, rgba(0, 0, 0, 0.88)));\n  font-family: PingFang SC;\n  font-size: 12px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 16px;\n  max-width: 220px;\n  margin: 0;\n}\n"), function(e) {
		e.DEFAULT = "default", e.VIP = "vip";
	}(D$5 || (D$5 = {}));
	L$4 = "ai-component-pc-uploader-box-file-item", I$5 = function(e) {
		var x = e.fileTask, v = e.fileTaskManager, h = e.position, E = x.getTask(), y = function() {
			var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {
				timeConstant: 6e3,
				intervalFrequency: 1e3
			}, t = e.timeConstant, a = e.intervalFrequency, c = t$9((0, import_react$29.useState)(0), 2), s = c[0], p = c[1], u = (0, import_react$29.useRef)(0), d = (0, import_react$29.useRef)(null), m = (0, import_react$29.useRef)(null), f = (0, import_react$29.useRef)(!1), g = (0, import_react$29.useCallback)((function() {
				u.current += a;
				var e = parseFloat((1 - Math.exp(-1 * u.current / t)).toFixed(2));
				f.current || p(e >= 1 ? .99 : e);
			}), [t, a]), x = (0, import_react$29.useCallback)((function() {
				u.current = 0, d.current = window.setInterval(g, a);
			}), [g, a]), v = (0, import_react$29.useCallback)((function() {
				d.current && (clearInterval(d.current), d.current = null);
			}), []), h = (0, import_react$29.useCallback)((function() {
				v(), p(1);
			}), [v]);
			return (0, import_react$29.useEffect)((function() {
				return f.current = !1, m.current = setInterval(g, a), function() {
					f.current = !0, m.current && clearInterval(m.current);
				};
			}), [g, a]), {
				progress: s,
				start: x,
				stop: v,
				end: h
			};
		}(), _ = y.progress, I = y.start, N = y.end, C = _E.FileLoadingStatus, P = _E.FileFinishStatus, k = function(e) {
			e.stopPropagation(), e.preventDefault(), null != E && E.id && v.deleteFileTask(E.id);
		};
		(0, import_react$29.useEffect)((function() {
			C.includes(E.status) && I(), P.includes(E.status) && N();
		}), [
			P,
			C,
			N,
			v,
			I,
			E.status
		]);
		var A = function() {
			if ((null == E ? void 0 : E.status) === F$5.UPLOAD_SUCCESS || (null == E ? void 0 : E.status) === m$6.EMBEDDING_SUCCESS) {
				var e = E.file;
				null != e && e.url && openUrl({ url: null == e ? void 0 : e.url });
			}
		}, U = function() {
			return import_react$29.createElement("div", {
				className: (0, import_classnames$12.default)(L$4, "status--".concat(S$6[E.status])),
				style: { boxSizing: "border-box" },
				onClick: A
			}, import_react$29.createElement("div", {
				className: "".concat(L$4, "_wrapper"),
				style: { boxSizing: "border-box" }
			}, import_react$29.createElement("div", { className: "".concat(L$4, "_delete-btn") }, import_react$29.createElement(w$6, {
				viewBox: "0 0 24 24",
				className: "".concat(L$4, "_delete-btn-icon"),
				onClick: k
			})), import_react$29.createElement("div", { className: "".concat(L$4, "_icon") }, E.status === F$5.UPLOADING && import_react$29.createElement("div", {
				className: "".concat(L$4, "_progress"),
				style: { width: "".concat(100 * (_ || 0), "%") }
			}), import_react$29.createElement("img", {
				className: "ai-file-list-item_icon",
				src: (null === (e = E.file) || void 0 === e ? void 0 : e.iconUrl) || _$6[(null === (n = E.file) || void 0 === n ? void 0 : n.type) || L$5.DOC],
				width: 28,
				height: 28
			})), import_react$29.createElement("div", { className: "".concat(L$4, "_content") }, import_react$29.createElement("div", { className: "".concat(L$4, "_content-title") }, E.metadata.name))), import_react$29.createElement("div", { className: "".concat(L$4, "_progress") }, "loading" === S$6[E.status] && import_react$29.createElement(Progress_default, {
				className: "".concat(L$4, "_progress-wrapper"),
				percentage: 100 * _,
				isLoading: !0,
				barStyle: { height: 2 }
			})));
			var e, n;
		};
		if (E.status === F$5.UPLOAD_FAILED && E.errorInfo) {
			var F = E.errorInfo;
			return import_react$29.createElement(Tooltip_default, {
				overlayStyle: {
					maxWidth: "100%",
					boxSizing: "border-box",
					display: "flex",
					alignItems: "center",
					padding: "4px 12px"
				},
				title: import_react$29.createElement("div", { className: "error-tooltip" }, import_react$29.createElement("p", { className: "error-tooltip_text" }, F.message), import_react$29.createElement(Button_default, {
					size: "small",
					type: "plain",
					style: {
						padding: "0 4px",
						color: F.showType === D$5.VIP ? "var(--text-vip, #E59837)" : "var(--text-link, #175CEB)"
					},
					onClick: function() {
						return F.button.onClick(h);
					}
				}, F.button.text))
			}, U());
		}
		return U();
	};
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/dist/esm/chunks/index-6f8739a7.js
function U$1(t, e) {
	for (var o = 0; o < e.length; o++) {
		var a = e[o];
		a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(t, t$11(a.key), a);
	}
}
function j$2(n, e) {
	if (e && ("object" == e$12(e) || "function" == typeof e)) return e;
	if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
	return function(n) {
		if (void 0 === n) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return n;
	}(n);
}
function A$3(n) {
	return A$3 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
		return n.__proto__ || Object.getPrototypeOf(n);
	}, A$3(n);
}
function D$4(n, t) {
	return D$4 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, t) {
		return n.__proto__ = t, n;
	}, D$4(n, t);
}
function R$2() {
	try {
		var n = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {})));
	} catch (n) {}
	return (R$2 = function() {
		return !!n;
	})();
}
function X$1(n, t) {
	var e = Object.keys(n);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(n);
		t && (o = o.filter((function(t) {
			return Object.getOwnPropertyDescriptor(n, t).enumerable;
		}))), e.push.apply(e, o);
	}
	return e;
}
function L$3(n) {
	for (var t = 1; t < arguments.length; t++) {
		var o = null != arguments[t] ? arguments[t] : {};
		t % 2 ? X$1(Object(o), !0).forEach((function(t) {
			a$19(n, t, o[t]);
		})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(o)) : X$1(Object(o)).forEach((function(t) {
			Object.defineProperty(n, t, Object.getOwnPropertyDescriptor(o, t));
		}));
	}
	return n;
}
var import_react$27, import_classnames$11, import_react_dom$4, N$4, P$1, I$4, S$1, z$3, V$1, F;
var init_index_6f8739a7 = __esmMin((() => {
	init_index_c23defda();
	init_slicedToArray_e715395f();
	import_react$27 = /* @__PURE__ */ __toESM(require_react());
	init_model_selector();
	init_esm$7();
	init_send_disable_24_b418eed8();
	import_classnames$11 = /* @__PURE__ */ __toESM(require_classnames());
	init_index_b1d71213();
	init_esm$5();
	init_purify_es();
	init_lodash();
	import_react_dom$4 = /* @__PURE__ */ __toESM(require_react_dom());
	init_esm$1();
	init_style_inject_es_3984fa0f();
	init_file_item_1e7b17c1();
	(function(n) {
		n.TEXT_INPUT = "text", n.OPTION_INPUT = "option", n.TEXT_LABEL = "label", n.TEXT_INPUT_VALUE = "text-input-value";
	})(N$4 || (N$4 = {}));
	P$1 = function(n) {
		return "Backspace" === n.key || "Delete" === n.key;
	};
	I$4 = function(n, t) {
		var e = JSON.parse(decodeURIComponent(n.dataset.inputOptions || "[]")), o = n.dataset.value, i = function(n) {
			var t = n.getBoundingClientRect(), e = window.scrollX || window.pageXOffset, o = window.scrollY || window.pageYOffset;
			return {
				top: t.top + o,
				left: t.left + e
			};
		}(n), r = i.left, l = i.top, c = document.createElement("div");
		c.style.position = "fixed", c.style.left = "".concat(r, "px"), c.style.top = "".concat(l, "px"), c.style.top = "".concat(l, "px"), c.id = "ai-component-pc-template-input-options-root", document.body.appendChild(c), n.className += " ai-component-pc-template-input__slot-option--active";
		var u = function() {
			import_react_dom$4.unmountComponentAtNode(c), c.remove(), n.className = n.className.replace("ai-component-pc-template-input__slot-option--active", "");
		}, p = Array.from(new Map(e.map((function(n) {
			return [n.id, n];
		}))).values());
		import_react_dom$4.render(import_react$27.createElement(Dropdown_default, {
			visible: !0,
			onVisibleChange: function(n) {
				n || u();
			},
			dropContent: import_react$27.createElement(Menu_default, { className: F$4 }, p.map((function(e) {
				return import_react$27.createElement(Menu_default.Item, {
					key: e.value,
					onClick: function() {
						n.dataset.value = e.value, n.innerText = e.label, t?.(e), u();
					},
					selected: e.value === o
				}, e.label);
			})))
		}, import_react$27.createElement("div", { style: {
			width: n.clientWidth,
			height: n.clientHeight
		} })), c);
	};
	e$11(".ai-component-pc-template-input {\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 1.2;\n  min-height: 60px;\n  max-height: 180px;\n  cursor: text;\n  overflow-y: auto;\n  position: relative;\n  z-index: 3;\n  scrollbar-gutter: stable;\n}\n.ai-component-pc-template-input::-webkit-scrollbar {\n  width: 8px;\n  background: transparent;\n}\n.ai-component-pc-template-input::-webkit-scrollbar-thumb {\n  background: #ccc;\n  border-radius: 4px;\n}\n.ai-component-pc-template-input::-webkit-scrollbar-thumb:hover {\n  background: #aaa;\n}\n.ai-component-pc-template-input span[data-active='true'] {\n  border: 1px solid var(--accent-default, #1e6fff);\n}\n.ai-component-pc-template-input[data-empty='true']::after {\n  content: attr(placeholder);\n  color: var(--text-medium, rgba(0, 0, 0, 0.48));\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 400;\n}\n.ai-component-pc-template-input__left-operation-area {\n  display: flex;\n  justify-content: flex-start;\n}\n.ai-component-pc-template-input__chooseBtn {\n  margin-right: 8px;\n}\n.ai-component-pc-template-input > * {\n  vertical-align: middle;\n}\n.ai-component-pc-template-input__input {\n  word-break: break-all;\n  cursor: text;\n  caret-color: #1e6fff;\n  font-size: 14px;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  font-feature-settings: 'fina' on, 'init' on;\n  font-family: 'PingFang SC';\n  font-style: normal;\n  font-weight: 400;\n  outline: none;\n  display: inline-block;\n  width: 100%;\n  flex: 1;\n}\n.ai-component-pc-template-input__input[data-empty='true']:after {\n  content: attr(placeholder);\n  color: var(--text-strong, rgba(0, 0, 0, 0.64));\n}\n.ai-component-pc-template-input__con-left {\n  flex: 1;\n  max-height: 300px;\n  overflow: auto;\n  display: flex;\n  align-items: center;\n}\n.ai-component-pc-template-input__setBox {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.ai-component-pc-template-input__send {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.ai-component-pc-template-input__divider {\n  width: 1px;\n  height: 16px;\n  background: var(--Border-medium, rgba(0, 0, 0, 0.08));\n  margin: 0 8px;\n}\n.ai-component-pc-template-input__upload {\n  display: flex;\n  width: 24px;\n  height: 24px;\n  justify-content: center;\n  align-items: center;\n}\n.ai-component-pc-template-input__pre {\n  float: left;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 28px;\n}\n.ai-component-pc-template-input__icon {\n  width: 24px;\n  height: 24px;\n  cursor: default;\n  margin-right: 4px;\n  user-select: none;\n}\n.ai-component-pc-template-input__label {\n  position: relative;\n  display: block;\n  background: linear-gradient(230deg, #1afabf -6.03%, #05c5ff 21.83%, #0597ff 46.35%, #09b5ff 95.57%);\n  padding: 2px 4px;\n  border-radius: 4px;\n  display: inline-flex;\n  justify-content: center;\n  align-items: center;\n  margin: 0 4px;\n  height: 22px;\n  cursor: pointer;\n  text-indent: 0;\n}\n.ai-component-pc-template-input__label-bg {\n  background: var(--bg-lv4-default, #fff);\n  position: absolute;\n  top: 1px;\n  bottom: 1px;\n  left: 1px;\n  right: 1px;\n  border-radius: 3px;\n}\n.ai-component-pc-template-input__label-text {\n  background: linear-gradient(230deg, #1afabf -6.03%, #05c5ff 21.83%, #0597ff 46.35%, #09b5ff 95.57%);\n  background-clip: text;\n  -webkit-background-clip: text;\n  font-feature-settings: 'fina' on, 'init' on;\n  font-family: 'PingFang SC';\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 400;\n  color: transparent;\n  line-height: 26px;\n  z-index: 1;\n}\n.ai-component-pc-template-input__slot-text,\n.ai-component-pc-template-input__slot-option {\n  word-break: break-all;\n  display: inline-block;\n  min-height: 20px;\n  border-radius: var(---, 4px);\n  border: 1px solid var(--border-medium, rgba(0, 0, 0, 0.08));\n  background: var(--fill-weak, #f9fafb);\n  color: var(--text-ultrastrong, var(--text-ultrastrong, rgba(0, 0, 0, 0.88)));\n  padding: 2px 4px;\n  margin: 0 4px;\n  font-feature-settings: 'fina' on, 'init' on;\n  font-family: 'PingFang SC';\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 400;\n  cursor: text;\n  line-height: 20px;\n  text-indent: 0;\n  box-sizing: content-box;\n}\n.ai-component-pc-template-input__slot-option {\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 2px 2px 2px 4px;\n}\n.ai-component-pc-template-input__slot-option-icon {\n  width: 16px;\n  height: 16px;\n  pointer-events: none;\n}\n.ai-component-pc-template-input__slot-option--active::after {\n  transform: rotate(180deg);\n}\n.ai-component-pc-template-input__slot-text > div {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  outline: none;\n}\n.ai-component-pc-template-input__slot-text > div[data-placeholder]:empty:after {\n  content: attr(data-placeholder);\n  color: var(--text-strong, rgba(0, 0, 0, 0.64));\n}\n");
	S$1 = (0, import_react$27.forwardRef)((function(n, t) {
		var e = n.disabled, i = n.canDeleteTextInputValue, u = void 0 !== i && i, p = n.placeholder, d = n.onCompositionStart, s = n.onCompositionEnd, f = n.onInput, m = n.onFocus, v = n.onBlur, g = n.onClick, x = n.onEnter, h = n.wholeContentEditable, w = void 0 !== h && h, E = n.preventScrollOnFocus, C = void 0 !== E && E, k = (0, import_react$27.useRef)(!1), O = (0, import_react$27.useRef)(null), S = (0, import_react$27.useRef)(!1), U = (0, import_react$27.useRef)(!1), j = (0, import_react$27.useRef)(), A = function(n) {
			var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
			if (O.current) {
				var e = purify.sanitize(n.value || "");
				O.current.innerHTML = e.split(/({{\..*?}})/).map((function(t) {
					var a = t$9(/^{{\.(.*?)}}$/.exec(t) || [], 2)[1];
					if (a) {
						var i, r = null === (i = n.valueOptions) || void 0 === i ? void 0 : i.find((function(n) {
							return n.name === a;
						}));
						if (r) {
							var l, c;
							if (r.type === N$4.OPTION_INPUT) j.current = (null === (l = r.options) || void 0 === l ? void 0 : l.find((function(n) {
								return n.value === r.value;
							}))) || (null === (c = r.options) || void 0 === c ? void 0 : c.find((function(n) {
								return n.value === r.defaultValue;
							})));
							return function(n) {
								return n.type === N$4.TEXT_INPUT ? "<span\n    data-input-type=\"".concat(N$4.TEXT_INPUT, "\"\n    data-input-name=\"").concat(n.name, "\"\n    data-default-value=\"").concat(n.defaultValue, "\"\n    class=\"ai-component-pc-template-input__slot-text\"\n    contenteditable=\"false\"\n  ><div\n      tabindex=\"-1\"\n      data-input-type=\"").concat(N$4.TEXT_INPUT_VALUE, "\"\n      contenteditable=\"false\"\n      data-placeholder=\"").concat(n.defaultValue, "\"\n    >").concat(n.value || "", "</div></span>") : n.type === N$4.OPTION_INPUT ? "<span\n    data-input-type=\"".concat(N$4.OPTION_INPUT, "\"\n    data-input-name=\"").concat(n.name, "\"\n    data-default-value=\"").concat(n.defaultValue, "\"\n    data-input-options=\"").concat(encodeURIComponent(JSON.stringify(n.options)), "\"\n    data-value=\"").concat(n.value || n.defaultValue, "\"\n    class=\"ai-component-pc-template-input__slot-option\"\n    contenteditable=\"false\"\n  >").concat(null === (t = n.options.find((function(t) {
									return t.value === n.value;
								})) || n.options.find((function(t) {
									return t.value === n.defaultValue;
								}))) || void 0 === t ? void 0 : t.label, "<img src=\"").concat("data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8'%3f%3e%3csvg width='12px' height='12px' viewBox='0 0 12 12' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e %3ctitle%3eicon_thirdary_arrow_fill_down%3c/title%3e %3cg id='%e8%a7%86%e8%a7%89' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3e %3cg id='03_%e8%af%84%e8%ae%ba_%e8%af%84%e8%ae%ba%e5%bd%92%e6%a1%a3' transform='translate(-348.000000%2c -134.000000)'%3e %3cg id='icon_thirdary_arrow_fill_down' transform='translate(348.000000%2c 134.000000)'%3e %3cg id='PC/%e5%9f%ba%e7%a1%80/%e7%ae%ad%e5%a4%b4/%e4%b8%8a' transform='translate(6.000000%2c 6.000000) scale(1%2c -1) rotate(-360.000000) translate(-6.000000%2c -6.000000) '%3e %3crect id='%e7%9f%a9%e5%bd%a2' x='0' y='0' width='12' height='12' rx='1.5'%3e%3c/rect%3e %3cpath d='M6.16%2c4.21333333 L8.76%2c7.68 C8.82627417%2c7.76836556 8.80836556%2c7.89372583 8.72%2c7.96 C8.68538077%2c7.98596443 8.64327404%2c8 8.6%2c8 L3.4%2c8 C3.28954305%2c8 3.2%2c7.91045695 3.2%2c7.8 C3.2%2c7.75672596 3.21403557%2c7.71461923 3.24%2c7.68 L5.84%2c4.21333333 C5.90627417%2c4.12496777 6.03163444%2c4.10705916 6.12%2c4.17333333 C6.13516113%2c4.18470418 6.14862915%2c4.1981722 6.16%2c4.21333333 Z' id='%e4%b8%89%e8%a7%92%e5%bd%a2' fill='%2381868F'%3e%3c/path%3e %3c/g%3e %3c/g%3e %3c/g%3e %3c/g%3e%3c/svg%3e", "\" class=\"ai-component-pc-template-input__slot-option-icon\" /></span>") : n.type === N$4.TEXT_LABEL ? "<span\n    data-input-type=\"".concat(N$4.TEXT_LABEL, "\"\n    data-default-value=\"").concat(n.defaultValue, "\"\n    data-input-name=\"").concat(n.name, "\"\n    class=\"ai-component-pc-template-input__slot-label\"\n    contenteditable=\"false\"\n  >").concat(n.value || n.defaultValue, "</span>") : "";
								var t;
							}(r);
						}
						return "";
					}
					return t;
				})).join(""), X(), t && F();
			}
		};
		(0, import_react$27.useImperativeHandle)(t, (function() {
			return {
				focus: F,
				setContent: function(n, t) {
					A(n, t);
				},
				blur: function() {
					var n;
					return null === (n = O.current) || void 0 === n ? void 0 : n.blur();
				},
				getRef: function() {
					return O;
				},
				getCurrentSelectOption: function() {
					return j.current;
				}
			};
		}));
		var D = function(n, t) {
			var e;
			return 0 === n.startOffset && (null === (e = t.previousElementSibling) || void 0 === e || null === (e = e.dataset) || void 0 === e ? void 0 : e.inputType) === N$4.TEXT_INPUT;
		}, R = function(n) {
			var t = n.target.parentElement;
			if ("Tab" === n.key) return n.preventDefault(), void function(n) {
				var t, e = Array.prototype.filter.call((null === (t = O.current) || void 0 === t ? void 0 : t.childNodes) || [], (function(n) {
					var t;
					return (null === (t = n.dataset) || void 0 === t ? void 0 : t.inputType) === N$4.TEXT_INPUT;
				})), o = e.length, a = e.indexOf(n);
				if (-1 !== a) if (a !== o - 1) {
					var i = e[(a + 1) % e.length];
					L(i, "end");
				} else V();
			}(t);
			"ArrowUp" !== n.key && "ArrowDown" !== n.key || n.preventDefault(), P$1(n) && !u && (t.innerText || n.preventDefault());
		}, z = (0, import_react$27.useCallback)((function() {
			var n = O.current;
			return null != n && n.childNodes.length ? Array.prototype.map.call(null == n ? void 0 : n.childNodes, (function(n) {
				var t, e;
				return (null == n || null === (t = n.dataset) || void 0 === t ? void 0 : t.inputType) === N$4.TEXT_INPUT ? n.textContent || (null === (e = n.dataset) || void 0 === e ? void 0 : e.defaultValue) : (null == n ? void 0 : n.textContent) || "";
			})).join("") : (null == n ? void 0 : n.textContent) || "";
		}), []), X = function() {
			if (O.current) {
				var n, t, e = z(), o = "" === e || "​" === e;
				if (O.current.dataset.empty = String(o), o && requestAnimationFrame((function() {
					var n;
					"" === (null === (n = O.current) || void 0 === n ? void 0 : n.textContent) && (O.current.textContent = "​");
				})), !k.current) {
					var a = e.replace(/* @__PURE__ */ new RegExp("​", "g"), "");
					f?.(escape(a), (n = O.current, t = {
						value: (null == n ? void 0 : n.textContent) || "",
						valueOptions: []
					}, null != n && n.childNodes.length ? (t.value = "", n?.childNodes.forEach((function(n) {
						var e, o, a, i, r, l, c, u, p = n;
						return null != p && null !== (e = p.dataset) && void 0 !== e && e.inputType ? (t.value += "{{.".concat(null == p || null === (o = p.dataset) || void 0 === o ? void 0 : o.inputName, "}}"), t.valueOptions.push({
							name: (null == p || null === (a = p.dataset) || void 0 === a ? void 0 : a.inputName) || "",
							type: null == p || null === (i = p.dataset) || void 0 === i ? void 0 : i.inputType,
							defaultValue: (null == p || null === (r = p.dataset) || void 0 === r ? void 0 : r.defaultValue) || "",
							value: (null == p || null === (l = p.dataset) || void 0 === l ? void 0 : l.inputType) === N$4.OPTION_INPUT ? null == p ? void 0 : p.dataset.value : (null == p ? void 0 : p.textContent) || "",
							options: null != p && null !== (c = p.dataset) && void 0 !== c && c.inputOptions ? JSON.parse(decodeURIComponent(null == p || null === (u = p.dataset) || void 0 === u ? void 0 : u.inputOptions)) : void 0
						})) : t.value += null == p ? void 0 : p.textContent;
					})), t) : t));
				}
			}
		}, L = function(n) {
			var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "start", e = null == n ? void 0 : n.childNodes[0];
			e?.focus({ preventScroll: !!C || !ua.isIOS });
			var o, a = new Range();
			a.setStart(e, "end" === t && null !== (o = e.textContent) && void 0 !== o && o.length ? 1 : 0), a.collapse();
			var i = window.getSelection();
			i?.removeAllRanges(), i?.addRange(a);
		}, V = function() {
			var n, t;
			if (O.current) {
				null === (n = O.current) || void 0 === n || n.focus({ preventScroll: !!C || !ua.isIOS });
				var e = new Range();
				e.setStart(O.current, null === (t = O.current) || void 0 === t ? void 0 : t.childNodes.length), e.collapse();
				var o = window.getSelection();
				o?.removeAllRanges(), o?.addRange(e);
			}
		}, F = function() {
			var n;
			if (O.current) {
				var t = Array.prototype.find.call((null === (n = O.current) || void 0 === n ? void 0 : n.childNodes) || [], (function(n) {
					var t;
					return (null === (t = n.dataset) || void 0 === t ? void 0 : t.inputType) === N$4.TEXT_INPUT;
				}));
				t ? L(t, "end") : V();
			}
		};
		return import_react$27.createElement("div", {
			className: (0, import_classnames$11.default)("ai-component-pc-template-input"),
			ref: O,
			spellCheck: !1,
			"data-empty": "true",
			placeholder: p,
			contentEditable: !e,
			onCompositionStart: function(n) {
				k.current = !0, d?.(n);
			},
			onCompositionEnd: function(n) {
				var t = function() {
					k.current = !1, s?.(n), X();
				};
				ua.isSafari ? setTimeout((function() {
					t();
				}), 20) : t();
			},
			onFocus: function(n) {
				var t, e, o, a;
				(U.current = (null === (t = n.target.dataset) || void 0 === t ? void 0 : t.inputType) === N$4.TEXT_INPUT_VALUE, (null === (e = n.target.dataset) || void 0 === e ? void 0 : e.inputType) === N$4.TEXT_INPUT_VALUE) && (n.target.setAttribute("contenteditable", "true"), (null === (o = n.target.parentElement) || void 0 === o || null === (o = o.dataset) || void 0 === o ? void 0 : o.inputType) === N$4.TEXT_INPUT && (null === (a = n.target.parentElement) || void 0 === a || a.setAttribute("data-active", "true")));
				S.current || null == m || m(), S.current = !0, w && F();
			},
			onBlur: function(n) {
				var t;
				if (setTimeout((function() {
					S.current || null == v || v();
				})), (null === (t = n.target.dataset) || void 0 === t ? void 0 : t.inputType) === N$4.TEXT_INPUT_VALUE) {
					var e, o;
					if (n.target.setAttribute("contenteditable", "false"), (null === (e = n.target.parentElement) || void 0 === e || null === (e = e.dataset) || void 0 === e ? void 0 : e.inputType) === N$4.TEXT_INPUT) null === (o = n.target.parentElement) || void 0 === o || o.setAttribute("data-active", "false");
					n.target.textContent || (n.target.innerHTML = "");
				}
				S.current = !1;
			},
			onInput: X,
			onClick: function(n) {
				g?.(n);
				var t = n.target;
				if (t.dataset.inputType === N$4.OPTION_INPUT && (n.preventDefault(), n.stopPropagation(), I$4(t, (function(n) {
					j.current = n, X();
				}))), t.dataset.inputType === N$4.TEXT_LABEL) {
					n.preventDefault(), n.stopPropagation();
					var e = new Range();
					e.selectNode(t);
					var o = window.getSelection();
					o?.removeAllRanges(), o?.addRange(e);
				}
			},
			onPaste: function(n) {
				var t;
				if ((null === (t = n.target) || void 0 === t || null === (t = t.dataset) || void 0 === t ? void 0 : t.inputType) === N$4.TEXT_INPUT_VALUE) {
					var e = n.target;
					if (!e.textContent) return n.preventDefault(), e.textContent = n.clipboardData.getData("text/plain"), e.parentElement && L(e.parentElement, "end"), void X();
				}
				n.preventDefault(), n.stopPropagation();
				var o = n.clipboardData.getData("text/plain");
				document.execCommand("insertText", !1, o);
			},
			onKeyDown: function(n) {
				var t;
				if ("Enter" === n.key && !k.current) {
					var e, o = {
						altKey: n.altKey,
						ctrlKey: n.ctrlKey,
						shiftKey: n.shiftKey,
						metaKey: n.metaKey
					};
					if (x?.(o), U.current && n.preventDefault(), function(n) {
						return "Enter" === n.key && function(n) {
							return n.shiftKey || n.ctrlKey || n.metaKey;
						}(n);
					}(n)) n.preventDefault(), n.stopPropagation(), "true" !== (null === (e = O.current) || void 0 === e ? void 0 : e.dataset.empty) && document.execCommand("insertText", !1, "\n");
				}
				if ("Tab" === n.key && !U.current) {
					var a = window.getSelection();
					if (null != a && a.rangeCount) {
						var i, r = a.getRangeAt(0);
						if (r.startContainer === O.current && r.startOffset === (null === (i = O.current) || void 0 === i ? void 0 : i.childNodes.length)) {
							var l;
							n.preventDefault();
							var c = Array.prototype.find.call((null === (l = O.current) || void 0 === l ? void 0 : l.childNodes) || [], (function(n) {
								var t;
								return (null === (t = n.dataset) || void 0 === t ? void 0 : t.inputType) === N$4.TEXT_INPUT;
							}));
							c && L(c, "end");
							return;
						}
					}
				}
				(null === (t = n.target) || void 0 === t || null === (t = t.dataset) || void 0 === t ? void 0 : t.inputType) === N$4.TEXT_INPUT_VALUE && R(n);
				var u = window.getSelection();
				if (null == u || !u.rangeCount) return null;
				var p = u.getRangeAt(0), d = p.startContainer, s = null == d ? void 0 : d.previousElementSibling, f = null == d ? void 0 : d.nextElementSibling;
				"ArrowRight" === n.key && function(n, t) {
					var e, o;
					return n.startOffset === (null === (e = t.textContent) || void 0 === e ? void 0 : e.length) && (null === (o = t.nextElementSibling) || void 0 === o || null === (o = o.dataset) || void 0 === o ? void 0 : o.inputType) === N$4.TEXT_INPUT;
				}(p, d) ? (n.preventDefault(), L(f, "start")) : "ArrowLeft" === n.key && D(p, d) ? (n.preventDefault(), L(s, "end")) : P$1(n) && function(n, t, e, o) {
					if (D(o, t) && "" !== (null == e ? void 0 : e.textContent)) n.preventDefault(), L(e, "end");
				}(n, d, s, p);
			},
			style: { outline: "none" }
		});
	}));
	z$3 = function() {
		function n() {
			var t, e, o, a;
			return function(n, t) {
				if (!(n instanceof t)) throw new TypeError("Cannot call a class as a function");
			}(this, n), e = this, a = arguments, o = A$3(o = n), (t = j$2(e, R$2() ? Reflect.construct(o, a || [], A$3(e).constructor) : o.apply(e, a))).domRef = (0, import_react$27.createRef)(), t.handleClick = function(n) {
				var e, o = t.props, a = o.excludeSelectors, i = o.onOutsideClick;
				null != a && a.some((function(t) {
					return n.target.closest(t);
				})) || null !== (e = t.domRef) && void 0 !== e && e.current && n.target && t.domRef.current.contains(n.target) || i(n);
			}, t;
		}
		return function(n, t) {
			if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
			n.prototype = Object.create(t && t.prototype, { constructor: {
				value: n,
				writable: !0,
				configurable: !0
			} }), Object.defineProperty(n, "prototype", { writable: !1 }), t && D$4(n, t);
		}(n, import_react$27.Component), t = n, (e = [
			{
				key: "componentDidMount",
				value: function() {
					var n = this.props.trigger, t = void 0 === n ? "click" : n;
					document.addEventListener(t, this.handleClick, !0);
				}
			},
			{
				key: "componentWillUnmount",
				value: function() {
					var n = this.props.trigger, t = void 0 === n ? "click" : n;
					document.removeEventListener(t, this.handleClick, !0);
				}
			},
			{
				key: "render",
				value: function() {
					return this.props.children && import_react$27.isValidElement(this.props.children) ? import_react$27.createElement(import_react$27.Fragment, null, import_react$27.cloneElement(this.props.children, { ref: this.domRef })) : null;
				}
			}
		]) && U$1(t.prototype, e), o && U$1(t, o), Object.defineProperty(t, "prototype", { writable: !1 }), t;
		var t, e, o;
	}();
	e$11(".ai-component-pc-uploader-template-input-box {\n  --input-border-radius: 12px;\n  border-radius: var(--input-border-radius);\n  background: var(--bg-lv2-default, #fff);\n  min-height: 26px;\n  display: flex;\n  flex-direction: column;\n  position: relative;\n  width: 100%;\n  box-sizing: border-box;\n  height: 100%;\n}\n.ai-component-pc-uploader-template-input-box-border {\n  --input-border-radius: 12px;\n  border-radius: var(--input-border-radius);\n  background: var(--bg-lv2-default, #fff);\n  padding: 8px;\n  min-height: 26px;\n  display: flex;\n  flex-direction: column;\n  position: relative;\n  width: 100%;\n  border: 1px solid var(--border-strong, rgba(0, 0, 0, 0.12));\n  box-sizing: border-box;\n}\n.ai-component-pc-uploader-template-input-box-border-active::after {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: var(--bg-lv1-default, #fff);\n  background-size: 400% 400%;\n  border-radius: calc(var(--input-border-radius) - 1px);\n  z-index: 1;\n}\n.ai-component-pc-uploader-template-input-box-border-active::before {\n  content: '';\n  position: absolute;\n  top: -1px;\n  left: -1px;\n  right: -1px;\n  bottom: -1px;\n  background: linear-gradient(341deg, #45a1ff, transparent 16%, transparent 100%);\n  background-size: 100%;\n  background-origin: border-box;\n  background-clip: padding-box, border-box;\n  border-radius: var(--input-border-radius);\n  z-index: 0;\n}\n.ai-component-pc-uploader-template-input-box-textarea {\n  flex: 1;\n  overflow: hidden;\n}\n.ai-component-pc-uploader-template-input-box-textarea .ai-component-pc-template-input {\n  height: 100%;\n}\n.ai-component-pc-uploader-template-input-box-footer {\n  flex: 0;\n}\n.ai-component-pc-uploader-template-input-box-file-list,\n.ai-component-pc-uploader-template-input-box-textarea,\n.ai-component-pc-uploader-template-input-box-footer {\n  z-index: 2;\n}\n.ai-component-pc-uploader-template-input-box-file-list {\n  margin-bottom: 8px;\n}\n.ai-component-pc-uploader-template-input-box-footer {\n  margin-top: 8px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 20px;\n  height: 32px;\n}\n.ai-component-pc-uploader-template-input-box-footer-left {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  overflow-x: auto;\n  flex: 1;\n}\n.ai-component-pc-uploader-template-input-box-footer-left::-webkit-scrollbar {\n  display: none;\n}\n.ai-component-pc-uploader-template-input-box-footer-right {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex: 0;\n}\n.ai-component-pc-uploader-template-input-box-footer-right-send-icon {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n}\n");
	V$1 = "ai-component-pc-uploader-template-input-box", F = (0, import_react$27.forwardRef)((function(n, t) {
		var i = n.onSend, u = n.onChange, x = n.uploaderMenuItems, y = n.className, T = n.leftButtons, _ = n.rightButtons, w = n.iconUploaderType, E = void 0 === w ? "icon" : w, C = n.iconUploaderPlacement, k = n.uploaderClassName, N = n.placeholder, P = n.maxFileCount, I = n.onBlur, U = n.domId, j = n.onEnter, A = n.onOutsideClick, D = n.onFileTaskChange, R = n.initialFiles, X = n.buttonSize, F = void 0 === X ? "medium" : X, B = n.onTemplateValueChange, K = n.onConfirmUploaderItem, M = n.onModelChange, H = n.initState, W = t$9((0, import_react$27.useState)([]), 2), G = W[0], Y = W[1], Z = t$9((0, import_react$27.useState)(null), 2), $ = Z[0], Q = Z[1], tn = t$9((0, import_react$27.useState)(!1), 2), en = tn[0], on = tn[1], an = (0, import_react$27.useRef)(null), rn = (0, import_react$27.useRef)(null), cn = t$9((0, import_react$27.useState)({}), 2), un = cn[0], pn = cn[1], sn = t$9((0, import_react$27.useState)(0), 2), fn = sn[0], mn = sn[1];
		(0, import_react$27.useImperativeHandle)(t, (function() {
			return {
				setContent: function(n) {
					var t;
					return null === (t = rn.current) || void 0 === t ? void 0 : t.setContent(n);
				},
				focus: function() {
					var n;
					return null === (n = rn.current) || void 0 === n ? void 0 : n.focus();
				},
				blur: function() {
					var n;
					return null === (n = rn.current) || void 0 === n ? void 0 : n.blur();
				},
				isUploadAllSuccess: function() {
					return Boolean(null == $ ? void 0 : $.isAllSuccess());
				},
				getFiles: function() {
					var n;
					return (null == $ || null === (n = $.getUploadedFileData()) || void 0 === n ? void 0 : n.slice()) || [];
				},
				getCurrentSelectOption: function() {
					var n;
					return null === (n = rn.current) || void 0 === n ? void 0 : n.getCurrentSelectOption();
				}
			};
		}));
		var vn = function(n) {
			Y(n), D?.(n);
		};
		(0, import_react$27.useEffect)((function() {
			u(un);
		}), [un]);
		var gn = (0, import_react$27.useCallback)((function(n) {
			Q(n);
		}), [Q]), bn = $ ? null == G ? void 0 : G.slice().reverse().map((function(n) {
			return import_react$27.createElement(I$5, {
				key: n.getTask().id,
				fileTask: n,
				fileTaskManager: $
			});
		})) : null, xn = 0 === G.length;
		(0, import_react$27.useEffect)((function() {
			var n = new ResizeObserver((function() {
				an.current && mn(an.current.clientWidth);
			}));
			return an.current && n.observe(an.current), function() {
				n.disconnect();
			};
		}), [an.current]);
		var hn = function(n) {
			pn(L$3(L$3({}, un), n));
		}, yn = (0, import_react$27.useMemo)((function() {
			return T ? import_react$27.cloneElement(T, {
				hasAttachment: !xn,
				onChange: hn,
				buttonSize: F,
				width: fn - 150
			}) : null;
		}), [
			T,
			xn,
			un,
			fn
		]), Tn = (0, import_react$27.useMemo)((function() {
			return _ ? import_react$27.cloneElement(_, {
				hasAttachment: !xn,
				onChange: hn,
				buttonSize: F,
				width: fn - 150
			}) : null;
		}), [
			_,
			xn,
			un,
			fn
		]), _n = (0, import_react$27.useMemo)((function() {
			var n, t;
			return null != G && G.length ? !(null != $ && $.isAllSuccess() && null !== (n = un.input) && void 0 !== n && n.trim()) : !(null !== (t = un.input) && void 0 !== t && t.trim());
		}), [
			un.input,
			G,
			$
		]), wn = (0, import_react$27.useMemo)((function() {
			if (!C) {
				if ("icon" === E) return "right";
				if ("text" === E) return "left";
			}
			return C;
		}), [C, E]);
		return (0, import_react$27.useEffect)((function() {
			var n, t = null == H ? void 0 : H.input;
			t && !un.input && (pn((function(n) {
				return L$3(L$3({}, n), {}, { input: t });
			})), null === (n = rn.current) || void 0 === n || n.setContent({
				value: t,
				valueOptions: null == H ? void 0 : H.inputOptions
			}));
		}), [H]), import_react$27.createElement(z$3, {
			onOutsideClick: function() {
				on(!1), A?.();
			},
			excludeSelectors: [
				".dui-dropdown-content",
				"#Drive-Selector-Panel",
				".ai-component-pc-add-link-modal",
				".dui-menu-submenu-wrapper"
			]
		}, import_react$27.createElement("div", { className: (0, import_classnames$11.default)("".concat(V$1, "-border"), a$19({}, "".concat(V$1, "-border-active"), en), y) }, import_react$27.createElement("div", {
			className: (0, import_classnames$11.default)(V$1),
			onClick: function() {
				on(!0);
			},
			id: U
		}, !xn && import_react$27.createElement("div", { className: (0, import_classnames$11.default)("".concat(V$1, "-file-list")) }, import_react$27.createElement(a$21, null, bn)), import_react$27.createElement("div", { className: "".concat(V$1, "-textarea") }, import_react$27.createElement(S$1, {
			onFocus: function() {
				on(!0);
			},
			onBlur: function() {
				I?.();
			},
			ref: rn,
			onInput: function(n, t) {
				pn(L$3(L$3({}, un), {}, { input: n })), B?.(t);
			},
			placeholder: N,
			onEnter: j
		})), import_react$27.createElement("div", { className: "".concat(V$1, "-footer") }, import_react$27.createElement("div", {
			className: "".concat(V$1, "-footer-left"),
			ref: an
		}, import_react$27.createElement(p$1, {
			buttonSize: F,
			onModelChange: M
		}), "left" === wn ? import_react$27.createElement(S, {
			className: k,
			maxSize: P,
			onChange: vn,
			onGetFileTaskManager: gn,
			menuItem: x,
			type: E,
			buttonSize: F,
			onConfirmUploaderItem: K
		}) : null, yn), import_react$27.createElement("div", { className: "".concat(V$1, "-footer-right") }, Tn, "right" === wn ? import_react$27.createElement(S, {
			className: k,
			maxSize: P,
			onChange: vn,
			onGetFileTaskManager: gn,
			menuItem: x,
			initialFiles: R,
			type: E,
			onConfirmUploaderItem: K
		}) : null, import_react$27.createElement("div", { className: "".concat(V$1, "-footer-right-send-icon") }, _n ? null : import_react$27.createElement(n$9, { onClick: i }), _n ? import_react$27.createElement(c$11, null) : null))))));
	}));
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/dist/esm/chunks/index-8ec9b46d.js
var import_react$26, l;
var init_index_8ec9b46d = __esmMin((() => {
	import_react$26 = /* @__PURE__ */ __toESM(require_react());
	init_esm$7();
	init_file_item_1e7b17c1();
	init_style_inject_es_3984fa0f();
	e$11("");
	l = function(n) {
		var l = n.fileTasks, r = n.fileTaskManager, i = n.className, s = n.position;
		return r && null != l && l.length ? import_react$26.createElement("div", { className: i }, import_react$26.createElement(a$21, null, r ? null == l ? void 0 : l.slice().reverse().map((function(t) {
			return import_react$26.createElement(I$5, {
				key: t.getTask().id,
				fileTask: t,
				fileTaskManager: r,
				position: s
			});
		})) : null)) : null;
	};
}));
var init_ux_atom = __esmMin((() => {
	init_index_6f8739a7();
	init_index_b1d71213();
	init_index_8ec9b46d();
	require_react();
	require_classnames();
	init_purify_es();
	require_react_dom();
	init_esm$4();
	init_dist();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/dist/esm/chunks/index-a7047c5d.js
function m$5(e) {
	return m$5 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
		return typeof e;
	} : function(e) {
		return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, m$5(e);
}
function p$5() {
	return p$5 = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var l in n) ({}).hasOwnProperty.call(n, l) && (e[l] = n[l]);
		}
		return e;
	}, p$5.apply(null, arguments);
}
function d$4(e, t, n) {
	return (t = function(e) {
		var t = function(e, t) {
			if ("object" != m$5(e) || !e) return e;
			var n = e[Symbol.toPrimitive];
			if (void 0 !== n) {
				var l = n.call(e, t || "default");
				if ("object" != m$5(l)) return l;
				throw new TypeError("@@toPrimitive must return a primitive value.");
			}
			return ("string" === t ? String : Number)(e);
		}(e, "string");
		return "symbol" == m$5(t) ? t : t + "";
	}(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function h$3() {
	return h$3 = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var l in n) ({}).hasOwnProperty.call(n, l) && (e[l] = n[l]);
		}
		return e;
	}, h$3.apply(null, arguments);
}
function E$4() {
	return E$4 = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var l in n) ({}).hasOwnProperty.call(n, l) && (e[l] = n[l]);
		}
		return e;
	}, E$4.apply(null, arguments);
}
var import_react$23, import_react$24, import_classnames$9, g$3, f$6, b$2, y$3, v$4, C$5, w$4, x$2, k, q$1, A$2, j$1, M$3, S$5, L, D$3, I$3, N$3, O$1, F$3, Z$2, H$2;
var init_index_a7047c5d = __esmMin((() => {
	import_react$23 = /* @__PURE__ */ __toESM(require_react());
	import_react$24 = /* @__PURE__ */ __toESM(require_react());
	init_index_4a868389();
	init_esm$3();
	init_index_bc35b061();
	init_esm$1();
	import_classnames$9 = /* @__PURE__ */ __toESM(require_classnames());
	init_style_inject_es_3984fa0f();
	C$5 = function(t) {
		return import_react$23.createElement("svg", p$5({
			width: 24,
			height: 24,
			viewBox: "0 0 24 24",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg"
		}, t), import_react$23.createElement("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M16.584 4.36869L12.833 8.11972C13.5034 8.37526 14.1319 8.77311 14.6721 9.31326C15.0035 9.64471 15.2814 10.0095 15.5057 10.3967L19.0589 6.84356L16.584 4.36869ZM16.0258 11.6444L20.1195 7.55067C20.51 7.16015 20.51 6.52698 20.1195 6.13646L17.2911 3.30803C16.9006 2.91751 16.2674 2.91751 15.8769 3.30803L11.3917 7.79324C11.767 7.82404 12.1397 7.89507 12.5028 8.00633C10.705 7.45536 8.66972 7.89101 7.24747 9.31326C5.99298 10.5678 6.11924 11.6769 6.21725 12.5379C6.27942 13.0841 6.33022 13.5303 6.01004 13.8505C5.67808 14.1825 5.09761 14.1105 4.54175 14.0416C3.7162 13.9393 2.94493 13.8437 3.12268 15.088C3.53516 17.9753 10.1348 21.2752 14.6721 16.7379C16.0518 15.3581 16.5031 13.4015 16.0258 11.6444ZM13.7882 15.854C11.8878 17.7544 9.58977 18.0122 7.67949 17.4912C6.71344 17.2277 5.87723 16.7705 5.27941 16.2552C4.87355 15.9053 4.62406 15.5713 4.4877 15.2945C4.73782 15.3253 5.08964 15.3642 5.43242 15.3443C5.83386 15.3209 6.41955 15.2088 6.89392 14.7344C7.31577 14.3126 7.46433 13.8146 7.50211 13.3897C7.53323 13.0398 7.49165 12.6785 7.46417 12.4396L7.45923 12.3965C7.40882 11.9537 7.38204 11.6486 7.44884 11.3284C7.50831 11.0433 7.66229 10.6662 8.13136 10.1971C9.69345 8.63505 12.2261 8.63505 13.7882 10.1971C15.3503 11.7592 15.3503 14.2919 13.7882 15.854Z",
			fill: "#454D5A",
			style: d$4(d$4({ fill: "#454D5A" }, "fill", "color(display-p3 0.2706 0.3020 0.3529)"), "fillOpacity", 1)
		}));
	};
	q$1 = {
		"政务风": i$17("slide.style.government"),
		"简约风": i$17("slide.style.minimalist"),
		"商务风": i$17("slide.style.business"),
		"小清新": i$17("slide.style.fresh-natural"),
		"科技风": i$17("slide.style.tech"),
		"卡通风": i$17("slide.style.cartoon"),
		"创意风": i$17("slide.style.creative"),
		"扁平风": i$17("slide.style.flat-design")
	}, A$2 = {
		"红色": i$17("slide.color.red"),
		"蓝色": i$17("slide.color.blue"),
		"渐变": i$17("slide.color.gradient"),
		"绿色": i$17("slide.color.green"),
		"橙色": i$17("slide.color.orange"),
		"黄色": i$17("slide.color.yellow"),
		"灰色": i$17("slide.color.gray"),
		"黑色": i$17("slide.color.black"),
		"白色": i$17("slide.color.white"),
		"紫色": i$17("slide.color.purple"),
		"青色": i$17("slide.color.cyan"),
		"黑金": i$17("slide.color.black-gold"),
		"粉色": i$17("slide.color.pink"),
		"棕色": i$17("slide.color.brown"),
		"金色": i$17("slide.color.gold"),
		"浅色": i$17("slide.color.light-color")
	}, j$1 = {
		key: I.pageNum,
		label: i$17("slide.requirement-selector.page-num.title"),
		type: "option",
		options: [
			{
				value: "0",
				label: i$17("slide.requirement-selector.page-num.options.default")
			},
			{
				value: "1",
				label: i$17("slide.requirement-selector.page-num.options.page10")
			},
			{
				value: "2",
				label: i$17("slide.requirement-selector.page-num.options.page20")
			},
			{
				value: "3",
				label: i$17("slide.requirement-selector.page-num.options.page30")
			},
			{
				value: "4",
				label: i$17("slide.requirement-selector.page-num.options.page40")
			}
		],
		Icon: function(t) {
			return import_react$23.createElement("svg", h$3({
				width: 25,
				height: 25,
				viewBox: "0 0 25 25",
				fill: "none",
				xmlns: "http://www.w3.org/2000/svg"
			}, t), g$3 || (g$3 = import_react$23.createElement("path", {
				fillRule: "evenodd",
				clipRule: "evenodd",
				d: "M6.31812 5.89624V19.3962H18.8181V5.89624H6.31812ZM6.06812 4.64624C5.51583 4.64624 5.06812 5.09396 5.06812 5.64624V19.6462C5.06812 20.1985 5.51583 20.6462 6.06812 20.6462H19.0681C19.6204 20.6462 20.0681 20.1985 20.0681 19.6462V5.64624C20.0681 5.09396 19.6204 4.64624 19.0681 4.64624H6.06812Z",
				fill: "#454D5A"
			})), f$6 || (f$6 = import_react$23.createElement("rect", {
				x: 10.5681,
				y: 9.14624,
				width: 1.25,
				height: 7,
				fill: "#454D5A"
			})), b$2 || (b$2 = import_react$23.createElement("rect", {
				x: 13.3181,
				y: 9.14624,
				width: 1.25,
				height: 7,
				fill: "#454D5A"
			})), y$3 || (y$3 = import_react$23.createElement("rect", {
				x: 9.06812,
				y: 10.6462,
				width: 7,
				height: 1.25,
				fill: "#454D5A"
			})), v$4 || (v$4 = import_react$23.createElement("rect", {
				x: 9.06812,
				y: 13.3962,
				width: 7,
				height: 1.25,
				fill: "#454D5A"
			})));
		}
	}, M$3 = {
		key: I.templateStyle,
		label: i$17("slide.requirement-selector.template-style.title"),
		type: "option",
		options: q$3.map((function(e) {
			return {
				value: e,
				label: q$1[e]
			};
		})),
		Icon: C$5
	}, S$5 = {
		"黑色": "#000",
		"白色": "#fff",
		"红色": "#F22329",
		"黄色": "#F5C400",
		"蓝色": "#2972F4",
		"绿色": "#319B62",
		"紫色": "#9A38D7"
	}, L = b$6.filter((function(e) {
		return S$5[e];
	})), D$3 = {
		key: I.templateColor,
		label: i$17("slide.requirement-selector.template-color.title"),
		type: "option",
		options: L.map((function(e) {
			return {
				value: e,
				label: import_react$24.createElement("div", { style: {
					display: "inline-flex",
					alignItems: "center",
					gap: "4px"
				} }, import_react$24.createElement("div", { style: {
					boxSizing: "border-box",
					width: "14px",
					height: "14px",
					borderRadius: "3px",
					backgroundColor: S$5[e],
					border: "#fff" === S$5[e] ? "0.5px solid var(--border-strong, rgba(0, 0, 0, 0.12))" : "none"
				} }), import_react$24.createElement("span", null, A$2[e]))
			};
		})),
		Icon: function(t) {
			return import_react$23.createElement("svg", E$4({
				width: 24,
				height: 24,
				viewBox: "0 0 24 24",
				fill: "none",
				xmlns: "http://www.w3.org/2000/svg"
			}, t), w$4 || (w$4 = import_react$23.createElement("path", {
				fillRule: "evenodd",
				clipRule: "evenodd",
				d: "M9.99999 9C9.46557 9 9 8.53317 9 8C9 7.46683 9.46557 7 9.99999 7C10.5332 7 11 7.46683 11 8C11 8.53317 10.5332 9 9.99999 9ZM13 8C13 8.53317 13.4667 9 14.0003 9C14.5327 9 15 8.53317 15 8C15 7.46683 14.5333 7 14.0003 7C13.4673 7 13 7.46683 13 8ZM15 11.0003C15 11.5327 15.4668 12 16 12C16.5332 12 17 11.532 17 11.0003C17 10.4673 16.5332 10 16 10C15.4668 10 15 10.4667 15 11.0003ZM7 11.0003C7 11.5327 7.46606 12 7.99968 12C8.53268 12 9 11.532 9 11.0003C9 10.4673 8.5333 10 7.99968 10C7.46606 10 7 10.4667 7 11.0003Z",
				fill: "#454D5A"
			})), x$2 || (x$2 = import_react$23.createElement("path", {
				d: "M4.62514 12.0001L4.62513 11.9975C4.61704 10.0397 5.39117 8.15986 6.77552 6.77552C8.15986 5.39117 10.0397 4.61704 11.9975 4.62513V4.62514H12.0001C16.1692 4.62514 19.375 7.60951 19.375 11.1108C19.375 13.2551 17.7001 14.9312 15.5554 14.9312H13.9554C12.9011 14.9312 11.9974 15.8309 11.9974 16.8893C11.9974 17.4417 12.2734 17.8496 12.4445 18.1025C12.4503 18.1109 12.4559 18.1193 12.4614 18.1274L12.495 18.1772L12.5375 18.2196C12.618 18.3001 12.6528 18.3609 12.672 18.4111C12.6923 18.4644 12.7081 18.5399 12.7081 18.667C12.7081 19.0324 12.3666 19.375 12.0001 19.375C7.90149 19.375 4.62514 16.0986 4.62514 12.0001Z",
				stroke: "#454D5A",
				strokeWidth: 1.25
			})));
		}
	}, I$3 = {
		key: I.writingStyle,
		label: i$17("slide.requirement-selector.writing-style.title"),
		type: "option",
		options: [
			{
				label: i$17("slide.requirement-selector.writing-style.options.default"),
				value: i$17("slide.requirement-selector.writing-style.options.default")
			},
			{
				label: i$17("slide.requirement-selector.writing-style.options.yansu"),
				value: i$17("slide.requirement-selector.writing-style.options.yansu")
			},
			{
				label: i$17("slide.requirement-selector.writing-style.options.huopo"),
				value: i$17("slide.requirement-selector.writing-style.options.huopo")
			},
			{
				label: i$17("slide.requirement-selector.writing-style.options.xueshu"),
				value: i$17("slide.requirement-selector.writing-style.options.xueshu")
			}
		],
		Icon: C$5
	}, N$3 = {
		key: I.imageGeneration,
		label: i$17("slide.requirement-selector.image-generation.title"),
		type: "button",
		options: [{
			label: i$17("slide.requirement-selector.image-generation.options.default"),
			value: !0
		}, {
			label: i$17("slide.requirement-selector.image-generation.options.auto"),
			value: !1
		}]
	};
	(function(e) {
		e.FAITHFUL = "0", e.ADAPTIVE = "1";
	})(k || (k = {}));
	O$1 = {
		key: I.generationMode,
		label: i$17("slide.requirement-selector.generation-mode.title"),
		type: "option",
		options: [{
			label: i$17("slide.requirement-selector.generation-mode.options.faithful"),
			value: k.FAITHFUL
		}, {
			label: i$17("slide.requirement-selector.generation-mode.options.adaptive"),
			value: k.ADAPTIVE
		}]
	}, F$3 = [
		j$1,
		M$3,
		D$3,
		I$3,
		N$3,
		O$1
	];
	e$11(".ai-component-pc-slide-more-config-menu {\n  font-size: 12px;\n  font-weight: 400;\n  user-select: none;\n}\n.ai-component-pc-slide-more-config-menu-main {\n  min-width: 200px;\n  padding: 12px 0;\n  border-radius: 10px;\n}\n.ai-component-pc-slide-more-config-menu-submenu,\n.ai-component-pc-slide-more-config-menu-toggle-item {\n  padding: 8px 16px;\n}\n.ai-component-pc-slide-more-config-menu-submenu::after,\n.ai-component-pc-slide-more-config-menu-toggle-item::after {\n  margin-left: 8px;\n}\n.ai-component-pc-slide-more-config-menu-submenu-title {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  width: 100%;\n}\n.ai-component-pc-slide-more-config-menu-submenu-label {\n  flex: 1;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n}\n.ai-component-pc-slide-more-config-menu-submenu-desc {\n  margin-left: 8px;\n  font-size: 12px;\n  color: var(--icon-medium, #7f8691);\n}\n.ai-component-pc-slide-more-config-menu-menu-item:hover {\n  background-color: var(--tsp-fill-weak, rgba(29, 79, 106, 0.06));\n}\n.ai-component-pc-slide-more-config-menu-toggle-item {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n");
	Z$2 = "ai-component-pc-slide-more-config-menu", H$2 = function(e) {
		var n = e.configs, l = e.onConfigChange, i = e.className, u = e.imageGeneration, m = void 0 === u || u, p = e.generationMode, d = [
			I.generationMode,
			I.pageNum,
			I.templateColor,
			I.templateStyle,
			I.writingStyle
		].map((function(e) {
			return n[e];
		})).filter(Boolean), g = function(e) {
			var t = e.options.find((function(t) {
				return t.value === e.value;
			}));
			return (null == t ? void 0 : t.label) || "";
		};
		return import_react$24.createElement(Dropdown_default.Keep, { className: (0, import_classnames$9.default)(Z$2, i) }, import_react$24.createElement(Menu_default, { className: "".concat(Z$2, "-main") }, d.map((function(e) {
			return import_react$24.createElement(Menu_default.SubMenu, {
				disabled: e.key === I.writingStyle && p === k.FAITHFUL,
				key: e.key,
				title: import_react$24.createElement("div", { className: "".concat(Z$2, "-submenu-title") }, import_react$24.createElement("span", { className: "".concat(Z$2, "-submenu-label") }, e.label), import_react$24.createElement("span", { className: "".concat(Z$2, "-submenu-desc") }, g(e))),
				className: "".concat(Z$2, "-submenu")
			}, e.options.map((function(n) {
				return import_react$24.createElement(Menu_default.Item, {
					key: n.value,
					className: "".concat(Z$2, "-menu-item"),
					onClick: function() {
						t = n.value, i = e.key, l?.(t, i);
						return;
						var t, i;
					},
					selected: n.value === e.value
				}, n.label);
			})));
		})), function() {
			var e = n[I.imageGeneration];
			return e ? import_react$24.createElement(import_react$24.Fragment, null, import_react$24.createElement(Menu_default.Item, {
				key: e.key,
				className: "".concat(Z$2, "-toggle-item")
			}, import_react$24.createElement("span", null, e.label), import_react$24.createElement(Switch_default, {
				checked: m,
				size: "small",
				onChange: function(t) {
					return null == l ? void 0 : l(t, e.key);
				}
			}))) : null;
		}()));
	};
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/dist/esm/chunks/index-84e98abf.js
function P(e, n) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		n && (o = o.filter((function(n) {
			return Object.getOwnPropertyDescriptor(e, n).enumerable;
		}))), t.push.apply(t, o);
	}
	return t;
}
function M$2(n) {
	for (var t = 1; t < arguments.length; t++) {
		var o = null != arguments[t] ? arguments[t] : {};
		t % 2 ? P(Object(o), !0).forEach((function(t) {
			a$19(n, t, o[t]);
		})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(o)) : P(Object(o)).forEach((function(e) {
			Object.defineProperty(n, e, Object.getOwnPropertyDescriptor(o, e));
		}));
	}
	return n;
}
var import_react$22, import_classnames$8, C$4, z$2, D$2;
var init_index_84e98abf = __esmMin((() => {
	init_index_c23defda();
	init_slicedToArray_e715395f();
	import_react$22 = /* @__PURE__ */ __toESM(require_react());
	init_index_4a868389();
	import_classnames$8 = /* @__PURE__ */ __toESM(require_classnames());
	init_style_inject_es_3984fa0f();
	init_index_ae78ab8c();
	init_esm$7();
	init_index_bc35b061();
	init_lodash();
	init_index_a7047c5d();
	e$11(".ai-component-pc-click-toggle-button {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 2px;\n  border-radius: 20px;\n  border: 1px solid var(--border-strong, rgba(0, 0, 0, 0.12));\n  height: 30px;\n  padding: 0 12px;\n  cursor: pointer;\n  user-select: none;\n}\n.ai-component-pc-click-toggle-button-checked {\n  border: 1px solid var(--tsp-fill-accent-strong, rgba(30, 111, 255, 0.08));\n  background: var(--feedback-accent, rgba(0, 115, 255, 0.08));\n}\n.ai-component-pc-click-toggle-button-label {\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  font-size: 12px;\n  line-height: 16px;\n  font-weight: 400;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n");
	C$4 = "ai-component-pc-click-toggle-button", z$2 = function(n) {
		var o = n.label, r = n.onChange, a = n.checked, c = n.buttonSize, i = void 0 === c ? "medium" : c;
		return import_react$22.createElement("div", {
			className: (0, import_classnames$8.default)("".concat(C$4), a$19(a$19({}, "".concat(C$4, "-checked"), a), "".concat(C$4, "-").concat(i), !0)),
			onClick: function() {
				r(!a);
			}
		}, import_react$22.createElement("div", { className: "".concat(C$4, "-label") }, o));
	};
	D$2 = (0, import_react$22.forwardRef)((function(o, s) {
		var u = o.horizontalScrollable, C = void 0 !== u && u, P = o.hasAttachment, D = void 0 !== P && P, L = o.hasTemp, T = void 0 !== L && L, F = o.width, I$6 = o.onChange, N = o.initialParams, A = o.buttonSize, G = void 0 === A ? "medium" : A, R = o.customConfigList, q = o.allowClear, U = t$9((0, import_react$22.useState)({}), 2), $ = U[0], _ = U[1];
		(0, import_react$22.useEffect)((function() {
			I$6?.($);
		}), [$]), (0, import_react$22.useEffect)((function() {
			N && !isEqual($, N) && _(N);
		}), [N]);
		var B = function(e) {
			e && !isEqual(e, $) && _(M$2(M$2({}, $), e));
		};
		(0, import_react$22.useImperativeHandle)(s, (function() {
			return { updateParams: B };
		}));
		var J = (0, import_react$22.useMemo)((function() {
			var e = D ? [
				O$1,
				j$1,
				D$3,
				M$3,
				I$3,
				N$3
			] : [
				j$1,
				D$3,
				M$3,
				I$3,
				N$3
			];
			return T ? e.filter((function(e) {
				return e.key !== I.templateColor && e.key !== I.templateStyle;
			})) : null != R && R.length ? e.filter((function(e) {
				return R.includes(e.key);
			})) : e;
		}), [
			D,
			T,
			R
		]), K = function(n, t) {
			_((function(o) {
				var r = q && (null == o ? void 0 : o[t]) === n ? void 0 : n;
				return M$2(M$2({}, o), {}, a$19({}, t, r));
			}));
		};
		(0, import_react$22.useEffect)((function() {
			D || _((function(e) {
				return omit(e, [I.generationMode]);
			}));
		}), [D]);
		var Q = (0, import_react$22.useMemo)((function() {
			return D ? $[I.generationMode] === k.FAITHFUL ? [I.pageNum, I.writingStyle] : [] : [I.generationMode];
		}), [D, $]);
		if (C) return import_react$22.createElement(a$21, null, F$3.map((function(e) {
			return "option" === e.type ? import_react$22.createElement(w$8, {
				buttonSize: G,
				showIcon: !1,
				checkable: !0,
				item: e,
				key: e.key,
				value: $[e.key],
				onChange: K,
				respectLabel: !0,
				disabled: Q.includes(e.key)
			}) : import_react$22.createElement(z$2, {
				key: e.key,
				buttonSize: G,
				checked: $[e.key],
				label: e.label,
				onChange: function(n) {
					return K(n, e.key);
				}
			});
		})));
		if (!F) return import_react$22.createElement(import_react$22.Fragment, null, F$3.map((function(e) {
			return "option" === e.type ? import_react$22.createElement(w$8, {
				buttonSize: G,
				showIcon: !1,
				checkable: !0,
				item: e,
				key: e.key,
				value: $[e.key],
				onChange: K,
				respectLabel: !0,
				disabled: Q.includes(e.key)
			}) : import_react$22.createElement(z$2, {
				key: e.key,
				buttonSize: G,
				checked: $[e.key],
				label: e.label,
				onChange: function(n) {
					return K(n, e.key);
				}
			});
		})));
		var V = Math.floor(F / 100), W = V < J.length, X = J.slice(V);
		return import_react$22.createElement(import_react$22.Fragment, null, J.slice(0, V).map((function(e) {
			return "option" === e.type ? import_react$22.createElement(w$8, {
				buttonSize: G,
				showToggle: !1,
				checkable: !0,
				showIcon: !1,
				item: e,
				key: e.key,
				value: $[e.key],
				onChange: K,
				respectLabel: !0,
				disabled: Q.includes(e.key)
			}) : import_react$22.createElement(z$2, {
				key: e.key,
				buttonSize: G,
				checked: $[e.key],
				label: e.label,
				onChange: function(n) {
					return K(n, e.key);
				}
			});
		})), W && import_react$22.createElement(w$8, {
			buttonSize: G,
			item: {
				key: "more",
				label: i$17("desktop.create-tab.slide.more"),
				options: []
			},
			showToggle: !1,
			checkable: !0,
			customMenu: import_react$22.createElement(H$2, {
				configs: keyBy(map(X, (function(e) {
					return M$2(M$2({}, e), {}, { value: $[e.key] });
				})), "key"),
				onConfigChange: K,
				imageGeneration: $.imageGeneration,
				generationMode: $[I.generationMode]
			})
		}));
	}));
	D$2.displayName = "RequirementSelector";
}));
var init_slide = __esmMin((() => {
	init_index_84e98abf();
	init_index_a7047c5d();
	init_index_bc35b061();
	require_react();
	require_classnames();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/dist/esm/chunks/toConsumableArray-d8de034d.js
function e$5(e) {
	return function(t) {
		if (Array.isArray(t)) return r$14(t);
	}(e) || function(r) {
		if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
	}(e) || t$10(e) || function() {
		throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}();
}
var init_toConsumableArray_d8de034d = __esmMin((() => {
	init_unsupportedIterableToArray_ebb39036();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/dist/esm/chunks/index-17c96894.js
var import_react$20, f$5, u$5, x$1, v$3, w$3, C$3, E;
var init_index_17c96894 = __esmMin((() => {
	init_slicedToArray_e715395f();
	import_react$20 = /* @__PURE__ */ __toESM(require_react());
	init_index_4a868389();
	init_esm$3();
	init_esm$7();
	init_style_inject_es_3984fa0f();
	init_toConsumableArray_d8de034d();
	init_index_e54e83c4();
	init_esm$6();
	init_lodash();
	f$5 = "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M6.5126 4.65193C5.86662 4.65619 5.41828 4.8341 5.12839 5.12399C4.8385 5.41389 4.66058 5.86223 4.65633 6.5082C4.65205 7.15795 4.8262 7.96163 5.19137 8.87455C5.32538 9.2096 5.48356 9.55544 5.66493 9.90924C5.53315 10.3884 5.265 10.8091 4.90421 11.1277C4.55475 10.5166 4.26196 9.91677 4.03077 9.33879C3.62817 8.3323 3.40067 7.36301 3.40635 6.49997C3.41206 5.63316 3.65572 4.8289 4.24451 4.24011C4.83329 3.65132 5.63755 3.40767 6.50437 3.40196C7.3674 3.39628 8.33669 3.62378 9.34319 4.02638C11.3584 4.83247 13.6396 6.38734 15.735 8.48275C17.8304 10.5782 19.3853 12.8593 20.1914 14.8746C20.594 15.8811 20.8215 16.8503 20.8158 17.7134C20.8101 18.5802 20.5664 19.3844 19.9776 19.9732C19.3888 20.562 18.5846 20.8057 17.7178 20.8114C16.8547 20.8171 15.8854 20.5896 14.8789 20.187C13.713 19.7206 12.4581 19.0036 11.2016 18.0763C11.4213 17.7082 11.7319 17.4017 12.1031 17.1869C13.2293 18.0012 14.3351 18.6231 15.3432 19.0264C16.2561 19.3915 17.0598 19.5657 17.7095 19.5614C18.3555 19.5572 18.8039 19.3792 19.0937 19.0894C19.3836 18.7995 19.5616 18.3511 19.5658 17.7051C19.5701 17.0554 19.3959 16.2517 19.0308 15.3388C18.3013 13.5152 16.8562 11.3717 14.8511 9.36663C12.846 7.36154 10.7025 5.91641 8.87895 5.18697C7.96603 4.8218 7.16235 4.64765 6.5126 4.65193ZM8.5445 10.2052C8.4918 9.94169 8.11508 9.94169 8.06238 10.2052C7.67312 12.1515 6.15175 13.6729 4.20543 14.0621C3.94194 14.1148 3.94194 14.4916 4.20543 14.5443C6.15175 14.9335 7.67312 16.4549 8.06238 18.4012C8.11508 18.6647 8.4918 18.6647 8.5445 18.4012C8.93376 16.4549 10.4551 14.9335 12.4014 14.5443C12.6649 14.4916 12.6649 14.1148 12.4014 14.0621C10.4551 13.6729 8.93376 12.1515 8.5445 10.2052Z' fill='%23454D5A'/%3e%3c/svg%3e";
	e$11(".ai-sdk-commin-ai-search-import-card-file-list-wrapper {\n  max-height: 190px;\n  overflow: hidden;\n}\n.ai-sdk-commin-ai-search-import-card-file-list-content {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  transition: all var(--duration) linear;\n}\n.ai-sdk-commin-ai-search-import-card-file-list-file {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  padding: 2px 0;\n  font-size: 12px;\n  line-height: 16px;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n}\n.ai-sdk-commin-ai-search-import-card-file-list-file > img {\n  width: 16px;\n  height: 16px;\n}\n.ai-sdk-commin-ai-search-import-card-file-list-file > span {\n  flex: 1;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n");
	u$5 = "ai-sdk-commin-ai-search-import-card-file-list", x$1 = function(e) {
		var a = e.fileList, r = (0, import_react$20.useRef)(null);
		return (0, import_react$20.useEffect)((function() {
			var e = 1 * a.length, n = 28 * (a.length - 7);
			r.current && (r.current.style.setProperty("--duration", "".concat(e, "s")), setTimeout((function() {
				r.current && (r.current.style.transform = "translateY(-".concat(n, "px)"));
			}), 1e3));
		}), [a]), import_react$20.createElement("div", { className: "".concat(u$5, "-wrapper") }, import_react$20.createElement("div", {
			className: "".concat(u$5, "-content"),
			ref: r
		}, a.map((function(e) {
			var i = e.iconType, t = e.fileId, a = e.fileName;
			return import_react$20.createElement("div", {
				className: "".concat(u$5, "-file"),
				key: t
			}, import_react$20.createElement("img", { src: W$2[i] || W$2.default }), import_react$20.createElement("span", null, a));
		}))));
	}, v$3 = function(n) {
		var c = t$9((0, import_react$20.useState)(0), 2), s = c[0], l = c[1], u = t$9((0, import_react$20.useState)([]), 2), x = u[0], v = u[1], C = t$9((0, import_react$20.useState)(0), 2), E = C[0], k = C[1], b = (0, import_react$20.useRef)(null), y = (0, import_react$20.useRef)(!1), N = l$14().getImportStatus;
		return (0, import_react$20.useEffect)((function() {
			return b.current = setInterval(e$8(f$8.mark((function e() {
				var i, t, a, r, c, s, m;
				return f$8.wrap((function(e) {
					for (;;) switch (e.prev = e.next) {
						case 0:
							if (!y.current) {
								e.next = 2;
								break;
							}
							return e.abrupt("return");
						case 2: return y.current = !0, e.next = 5, N();
						case 5: i = e.sent, t = i.completed, a = i.status, r = i.importedFileNames, c = void 0 === r ? [] : r, s = i.importedTotal, y.current = !1, l(null != t ? t : 0), v((function(e) {
							return uniqBy([].concat(e$5(e), e$5(c)), "fileId");
						})), k(null != s ? s : 0), a === s$10.success && (l(100), b.current && clearTimeout(b.current), null == n || null === (m = n.onFinished) || void 0 === m || m.call(n));
						case 16:
						case "end": return e.stop();
					}
				}), e);
			}))), 1e3), function() {
				b.current && clearTimeout(b.current);
			};
		}), []), {
			progress: s,
			files: x,
			importedTotal: E
		};
	}, w$3 = "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M12 2.5C17.2467 2.5 21.5 6.75329 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM12.75 11.25V7H11.25V12.75H16V11.25H12.75Z' fill='%23454D5A'/%3e%3c/svg%3e";
	e$11(".ai-sdk-commin-ai-search-import-wrapper {\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n}\n.ai-sdk-commin-ai-search-import-content {\n  height: 432px;\n  padding: 24px;\n  border-radius: 16px;\n  border: 1px solid var(--border-strong, rgba(0, 0, 0, 0.12));\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n}\n.ai-sdk-commin-ai-search-import-title {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  justify-content: space-between;\n  font-size: 16px;\n  font-weight: 600;\n  line-height: 22px;\n}\n.ai-sdk-commin-ai-search-import-mini_wrapper {\n  display: flex;\n  justify-content: space-between;\n  width: 100%;\n}\n.ai-sdk-commin-ai-search-import-mini_size {\n  display: flex;\n  gap: 2px;\n  padding: 4px 6px;\n  border: 1px solid var(--border-strong, rgba(0, 0, 0, 0.12));\n  border-radius: 4px;\n  font-size: 12px;\n  line-height: 16px;\n  color: var(--text-strong, rgba(0, 0, 0, 0.64));\n  cursor: pointer;\n}\n.ai-sdk-commin-ai-search-import-mini_size > img {\n  width: 16px;\n  height: 16px;\n}\n.ai-sdk-commin-ai-search-import-mini_size:hover {\n  background-color: var(--feedback-hover, rgba(51, 77, 102, 0.06));\n}\n.ai-sdk-commin-ai-search-import-divider {\n  margin: 20px 0;\n  width: 100%;\n  height: 0.5px;\n  background: var(--border-strong, rgba(0, 0, 0, 0.24));\n}\n.ai-sdk-commin-ai-search-import-content_wrapper {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.ai-sdk-commin-ai-search-import-subtitle {\n  display: flex;\n  gap: 8px;\n  font-size: 14px;\n  font-weight: 600;\n  line-height: 20px;\n}\n.ai-sdk-commin-ai-search-import-subtitle > img {\n  width: 20px;\n  height: 20px;\n}\n.ai-sdk-commin-ai-search-import-file_content {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  margin-left: 10px;\n  padding-left: 18px;\n  border-left: 1px solid var(--strong-invert, #DBDDE1);\n  font-size: 12px;\n  line-height: 16px;\n}\n.ai-sdk-commin-ai-search-import-progress_wrapper {\n  display: flex;\n  align-items: center;\n  gap: 24px;\n  color: var(--text-medium, rgba(0, 0, 0, 0.48));\n}\n.ai-sdk-commin-ai-search-import-progress {\n  flex: 1;\n  height: 4px;\n  border-radius: 4px;\n  background: var(--tsp-fill-medium, rgba(51, 77, 102, 0.08));\n  overflow: hidden;\n}\n.ai-sdk-commin-ai-search-import-bar {\n  height: 100%;\n  background: var(--intent-accent-default, #1E6FFF);\n  transition: width 0.3s ease;\n}\n.ai-sdk-commin-ai-search-import-files {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  height: 190px;\n}\n.ai-sdk-commin-ai-search-import-file {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  padding: 2px 0;\n}\n.ai-sdk-commin-ai-search-import-file > img {\n  width: 16px;\n  height: 16px;\n}\n.ai-sdk-commin-ai-search-import-file > span {\n  flex: 1;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.ai-sdk-commin-ai-search-import-line {\n  margin-left: 10px;\n  border-left: 1px solid var(--strong-invert, #DBDDE1);\n  height: 24px;\n}\n");
	C$3 = "ai-sdk-commin-ai-search-import", E = function(i) {
		var l = t$9((0, import_react$20.useState)(!1), 2), o = l[0], m = l[1], p = v$3({ onFinished: i.onStartAISearch }), d = p.progress, g = p.files, h = p.importedTotal;
		(0, import_react$20.useEffect)((function() {
			v$7.aiLoadingShow();
		}), []);
		return (0, import_react$20.useEffect)((function() {
			h >= 20 && m(!0);
		}), [g]), import_react$20.createElement("div", { className: "".concat(C$3, "-wrapper") }, import_react$20.createElement("div", { className: "".concat(C$3, "-content") }, import_react$20.createElement("div", { className: "".concat(C$3, "-title") }, o ? import_react$20.createElement("span", { className: "".concat(C$3, "-mini_wrapper") }, import_react$20.createElement("span", null, i$17("search-import-card.warm-tips")), import_react$20.createElement("span", {
			className: "".concat(C$3, "-mini_size"),
			onClick: function() {
				var e;
				null === (e = i.onStartAISearch) || void 0 === e || e.call(i);
			}
		}, import_react$20.createElement("img", { src: "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M4 5.5L20 5.5C20.2761 5.5 20.5 5.72386 20.5 6V14H15C13.8954 14 13 14.8954 13 16V18.5H4C3.72386 18.5 3.5 18.2761 3.5 18L3.5 6C3.5 5.72386 3.72386 5.5 4 5.5ZM14.5 18.5H20C20.2761 18.5 20.5 18.2761 20.5 18V15.5H15C14.7239 15.5 14.5 15.7239 14.5 16V18.5ZM13 20H4C2.89543 20 2 19.1046 2 18L2 6C2 4.89543 2.89543 4 4 4L20 4C21.1046 4 22 4.89543 22 6V14V18C22 19.1046 21.1046 20 20 20L13 20Z' fill='%23454D5A'/%3e%3c/svg%3e" }), import_react$20.createElement("span", null, i$17("search-import-card.minimize")))) : import_react$20.createElement("span", null, i$17("search-import-card.loading-wait-tips"))), import_react$20.createElement("div", { className: "".concat(C$3, "-divider") }), import_react$20.createElement("div", { className: "".concat(C$3, "-content_wrapper") }, import_react$20.createElement("div", { className: "".concat(C$3, "-subtitle") }, import_react$20.createElement("img", { src: f$5 }), import_react$20.createElement("span", null, i$17("search-import-card.vip-importing-tips"))), import_react$20.createElement("div", { className: "".concat(C$3, "-file_content") }, import_react$20.createElement("div", { className: "".concat(C$3, "-progress_wrapper") }, import_react$20.createElement("div", { className: "".concat(C$3, "-progress") }, import_react$20.createElement("div", {
			className: "".concat(C$3, "-bar"),
			style: { width: "".concat(d, "%") }
		})), import_react$20.createElement("span", null, d, "%")), import_react$20.createElement(x$1, { fileList: g }), import_react$20.createElement("div", { className: "".concat(C$3, "-file") }, import_react$20.createElement("img", { src: "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M14.4822 6.25L17.75 9.51777V17.75H6.25V6.25H14.4822ZM5 6C5 5.44772 5.44772 5 6 5H14.5858C14.851 5 15.1054 5.10536 15.2929 5.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V10H20V15H19V18C19 18.5523 18.5523 19 18 19H6C5.44772 19 5 18.5523 5 18V15H4V10H5V6ZM13.75 10H15V13H13.75V10ZM10.25 10H9V13H10.25V10Z' fill='%23454D5A'/%3e%3c/svg%3e" }), import_react$20.createElement("span", null, i$17("search-import-card.analysis-tips")))), import_react$20.createElement("div", { className: "".concat(C$3, "-subtitle") }, import_react$20.createElement("img", { src: w$3 }), import_react$20.createElement("span", null, i$17("search-import-card.indexing-tips"))), import_react$20.createElement("div", { className: "".concat(C$3, "-line") }), import_react$20.createElement("div", { className: "".concat(C$3, "-subtitle") }, import_react$20.createElement("img", { src: w$3 }), import_react$20.createElement("span", null, i$17("search-import-card.generate-tips"))))));
	};
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/dist/esm/search-import-card/index.js
var import_react$19, s$3, m;
var init_search_import_card = __esmMin((() => {
	init_slicedToArray_e715395f();
	import_react$19 = /* @__PURE__ */ __toESM(require_react());
	init_index_4a868389();
	init_index_17c96894();
	init_style_inject_es_3984fa0f();
	e$11(".ai-sdk-commin-ai-search-import-mini-card-wrapper {\n  position: absolute;\n  bottom: 112px;\n  right: 0;\n  width: 208px;\n  padding: 12px;\n  border: 1px solid var(--border-strong, rgba(0, 0, 0, 0.12));\n  border-radius: 16px;\n  background: var(--bg-lv4-default, #fff);\n}\n.ai-sdk-commin-ai-search-import-mini-card-title {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  font-size: 16px;\n  line-height: 22px;\n  font-weight: 600;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n}\n.ai-sdk-commin-ai-search-import-mini-card-title-right {\n  display: flex;\n  gap: 4px;\n  font-size: 14px;\n  cursor: pointer;\n}\n.ai-sdk-commin-ai-search-import-mini-card-arrow {\n  width: 24px;\n  height: 24px;\n  transition: all 0.3s ease-in-out;\n}\n.ai-sdk-commin-ai-search-import-mini-card-arrow-expand {\n  transform: rotate(180deg);\n}\n.ai-sdk-commin-ai-search-import-mini-card-content {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  margin-top: 8px;\n}\n.ai-sdk-commin-ai-search-import-mini-card-subtitle {\n  display: flex;\n  gap: 8px;\n  font-size: 14px;\n  line-height: 20px;\n  font-weight: 600;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n}\n.ai-sdk-commin-ai-search-import-mini-card-subtitle > img {\n  width: 20px;\n  height: 20px;\n}\n.ai-sdk-commin-ai-search-import-mini-card-files {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  padding: 4px 0 4px 18px;\n  margin-left: 10px;\n  border-left: 1px solid var(--strong-invert, #DBDDE1);\n}\n.ai-sdk-commin-ai-search-import-mini-card-progress_wrapper {\n  display: flex;\n  align-items: center;\n  gap: 24px;\n  color: var(--text-medium, rgba(0, 0, 0, 0.48));\n}\n.ai-sdk-commin-ai-search-import-mini-card-progress {\n  flex: 1;\n  height: 4px;\n  border-radius: 4px;\n  background: var(--tsp-fill-medium, rgba(51, 77, 102, 0.08));\n  overflow: hidden;\n}\n.ai-sdk-commin-ai-search-import-mini-card-bar {\n  height: 100%;\n  background: var(--intent-accent-default, #1E6FFF);\n  transition: width 0.3s ease;\n}\n.ai-sdk-commin-ai-search-import-mini-card-file {\n  display: flex;\n  align-items: center;\n  padding: 2px 0;\n}\n.ai-sdk-commin-ai-search-import-mini-card-file > img {\n  width: 16px;\n  height: 16px;\n}\n.ai-sdk-commin-ai-search-import-mini-card-file-text {\n  flex: 1;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n");
	s$3 = "ai-sdk-commin-ai-search-import-mini-card", m = function(o) {
		var m = o.onFinished, p = t$9((0, import_react$19.useState)(!1), 2), d = p[0], h = p[1], x = v$3({ onFinished: function() {
			return null == m ? void 0 : m();
		} }), g = x.progress, f = x.files;
		return import_react$19.createElement("div", { className: "".concat(s$3, "-wrapper") }, import_react$19.createElement("div", { className: "".concat(s$3, "-title") }, import_react$19.createElement("span", null, i$17("search-import-card.mini-card.init-tips")), import_react$19.createElement("span", {
			className: "".concat(s$3, "-title-right"),
			onClick: function() {
				return h(!d);
			}
		}, import_react$19.createElement("span", null, d ? i$17("search-import-card.mini-card.collapse") : "".concat(g, "%")), import_react$19.createElement("img", {
			src: "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M12 15.625C12.1658 15.625 12.3247 15.5592 12.4419 15.4419L17.4419 10.4419L16.5581 9.55806L12 14.1161L7.44194 9.55806L6.55806 10.4419L11.5581 15.4419C11.6753 15.5592 11.8342 15.625 12 15.625Z' fill='%23454D5A' style='fill:%23454D5A%3bfill:color(display-p3 0.2706 0.3020 0.3529)%3bfill-opacity:1%3b'/%3e%3c/svg%3e",
			className: "".concat(s$3, "-arrow ").concat(d ? "".concat(s$3, "-arrow-expand") : "")
		}))), d ? import_react$19.createElement("div", { className: "".concat(s$3, "-content") }, import_react$19.createElement("div", { className: "".concat(s$3, "-subtitle") }, import_react$19.createElement("img", { src: f$5 }), import_react$19.createElement("span", null, i$17("search-import-card.mini-card.indexing-tips"))), import_react$19.createElement("div", { className: "".concat(s$3, "-files") }, import_react$19.createElement("div", { className: "".concat(s$3, "-progress_wrapper") }, import_react$19.createElement("div", { className: "".concat(s$3, "-progress") }, import_react$19.createElement("div", {
			className: "".concat(s$3, "-bar"),
			style: { width: "".concat(g, "%") }
		})), import_react$19.createElement("span", null, g, "%")), import_react$19.createElement(x$1, { fileList: f }))) : null);
	};
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/dist/esm/range-selector/index.js
function k$1() {
	return k$1 = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var a in n) ({}).hasOwnProperty.call(n, a) && (e[a] = n[a]);
		}
		return e;
	}, k$1.apply(null, arguments);
}
function N$2(e) {
	return N$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
		return typeof e;
	} : function(e) {
		return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, N$2(e);
}
function S$4() {
	return S$4 = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var a in n) ({}).hasOwnProperty.call(n, a) && (e[a] = n[a]);
		}
		return e;
	}, S$4.apply(null, arguments);
}
function L$2(e, t, n) {
	return (t = function(e) {
		var t = function(e, t) {
			if ("object" != N$2(e) || !e) return e;
			var n = e[Symbol.toPrimitive];
			if (void 0 !== n) {
				var a = n.call(e, t || "default");
				if ("object" != N$2(a)) return a;
				throw new TypeError("@@toPrimitive must return a primitive value.");
			}
			return ("string" === t ? String : Number)(e);
		}(e, "string");
		return "symbol" == N$2(t) ? t : t + "";
	}(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function B$1(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		t && (a = a.filter((function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		}))), n.push.apply(n, a);
	}
	return n;
}
function F$2(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = null != arguments[t] ? arguments[t] : {};
		t % 2 ? B$1(Object(n), !0).forEach((function(t) {
			a$19(e, t, n[t]);
		})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : B$1(Object(n)).forEach((function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		}));
	}
	return e;
}
var import_react$17, import_react$18, import_classnames$6, v$2, w$2, E$3, y$2, _$2, C$2, O, I$1, j, T, D$1, M$1, z;
var init_range_selector = __esmMin((() => {
	init_toConsumableArray_d8de034d();
	init_slicedToArray_e715395f();
	import_react$17 = /* @__PURE__ */ __toESM(require_react());
	import_react$18 = /* @__PURE__ */ __toESM(require_react());
	init_index_4a868389();
	init_index_ae78ab8c();
	init_esm$3();
	init_esm$1();
	import_classnames$6 = /* @__PURE__ */ __toESM(require_classnames());
	init_style_inject_es_3984fa0f();
	init_index_c23defda();
	init_esm$5();
	O = function(e) {
		return import_react$17.createElement("svg", k$1({
			width: 24,
			height: 24,
			viewBox: "0 0 24 24",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg"
		}, e), v$2 || (v$2 = import_react$17.createElement("path", {
			d: "M5.77323 4.51396C5.98674 4.20596 6.3377 4.02222 6.71247 4.02222H17.2789C17.6528 4.02222 18.0032 4.20519 18.2168 4.51212L20.6596 8.0211L12.0511 14.4502C11.619 14.7729 11.02 14.7496 10.6143 14.3942L3.3404 8.02333L5.77323 4.51396Z",
			fill: "url(#paint0_linear_96497_141066)"
		})), w$2 || (w$2 = import_react$17.createElement("g", { filter: "url(#filter0_d_96497_141066)" }, import_react$17.createElement("path", {
			d: "M7.0521 5.7934L6.52679 9.19921L12.0366 13.7354L17.4997 9.19921L16.9566 5.79059C16.9124 5.51321 16.6731 5.30908 16.3923 5.30908H7.61685C7.33489 5.30908 7.09508 5.51474 7.0521 5.7934Z",
			fill: "#CAEFFB"
		}))), E$3 || (E$3 = import_react$17.createElement("g", { filter: "url(#filter1_d_96497_141066)" }, import_react$17.createElement("path", {
			d: "M5.96751 7.00771L5.29688 11.292L12.1496 16.851L18.9442 11.292L18.2509 7.00486C18.2061 6.72808 17.9672 6.52466 17.6868 6.52466H6.53206C6.25059 6.52466 6.01104 6.72963 5.96751 7.00771Z",
			fill: "#ECFCFF"
		}))), y$2 || (y$2 = import_react$17.createElement("path", {
			d: "M20.6592 18.894C20.6591 19.4918 20.174 19.9771 19.5762 19.9771H4.42285C3.82506 19.9771 3.33989 19.4918 3.33984 18.894V8.021H20.6592V18.894Z",
			fill: "url(#paint1_linear_96497_141066)"
		})), _$2 || (_$2 = import_react$17.createElement("g", { filter: "url(#filter2_d_96497_141066)" }, import_react$17.createElement("path", {
			d: "M10.78 12.8957C10.8306 12.8704 10.8716 12.8294 10.8968 12.7788L11.7658 11.0409C11.8621 10.8484 12.1369 10.8484 12.2331 11.0409L13.1021 12.7788C13.1274 12.8294 13.1684 12.8704 13.2189 12.8957L14.9569 13.7646C15.1494 13.8609 15.1494 14.1357 14.9569 14.2319L13.2189 15.1009C13.1684 15.1262 13.1274 15.1672 13.1021 15.2177L12.2331 16.9557C12.1369 17.1482 11.8621 17.1482 11.7658 16.9557L10.8968 15.2177C10.8716 15.1672 10.8306 15.1262 10.78 15.1009L9.04207 14.2319C8.84953 14.1357 8.84953 13.8609 9.04207 13.7646L10.78 12.8957Z",
			fill: "#ECFCFF"
		}))), C$2 || (C$2 = import_react$17.createElement("defs", null, import_react$17.createElement("filter", {
			id: "filter0_d_96497_141066",
			x: 6.37441,
			y: 5.00432,
			width: 11.8872,
			height: 9.34056,
			filterUnits: "userSpaceOnUse",
			colorInterpolationFilters: "sRGB"
		}, import_react$17.createElement("feFlood", {
			floodOpacity: 0,
			result: "BackgroundImageFix"
		}), import_react$17.createElement("feColorMatrix", {
			in: "SourceAlpha",
			type: "matrix",
			values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
			result: "hardAlpha"
		}), import_react$17.createElement("feOffset", {
			dx: .304762,
			dy: .152381
		}), import_react$17.createElement("feGaussianBlur", { stdDeviation: .228571 }), import_react$17.createElement("feColorMatrix", {
			type: "matrix",
			values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
		}), import_react$17.createElement("feBlend", {
			mode: "normal",
			in2: "BackgroundImageFix",
			result: "effect1_dropShadow_96497_141066"
		}), import_react$17.createElement("feBlend", {
			mode: "normal",
			in: "SourceGraphic",
			in2: "effect1_dropShadow_96497_141066",
			result: "shape"
		})), import_react$17.createElement("filter", {
			id: "filter1_d_96497_141066",
			x: 5.14449,
			y: 6.2199,
			width: 14.5616,
			height: 11.2407,
			filterUnits: "userSpaceOnUse",
			colorInterpolationFilters: "sRGB"
		}, import_react$17.createElement("feFlood", {
			floodOpacity: 0,
			result: "BackgroundImageFix"
		}), import_react$17.createElement("feColorMatrix", {
			in: "SourceAlpha",
			type: "matrix",
			values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
			result: "hardAlpha"
		}), import_react$17.createElement("feOffset", {
			dx: .304762,
			dy: .152381
		}), import_react$17.createElement("feGaussianBlur", { stdDeviation: .228571 }), import_react$17.createElement("feColorMatrix", {
			type: "matrix",
			values: "0 0 0 0 0.0901961 0 0 0 0 0.622274 0 0 0 0 0.921569 0 0 0 0.8 0"
		}), import_react$17.createElement("feBlend", {
			mode: "normal",
			in2: "BackgroundImageFix",
			result: "effect1_dropShadow_96497_141066"
		}), import_react$17.createElement("feBlend", {
			mode: "normal",
			in: "SourceGraphic",
			in2: "effect1_dropShadow_96497_141066",
			result: "shape"
		})), import_react$17.createElement("filter", {
			id: "filter2_d_96497_141066",
			x: 8.74529,
			y: 10.5917,
			width: 7.1179,
			height: 7.1179,
			filterUnits: "userSpaceOnUse",
			colorInterpolationFilters: "sRGB"
		}, import_react$17.createElement("feFlood", {
			floodOpacity: 0,
			result: "BackgroundImageFix"
		}), import_react$17.createElement("feColorMatrix", {
			in: "SourceAlpha",
			type: "matrix",
			values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
			result: "hardAlpha"
		}), import_react$17.createElement("feOffset", {
			dx: .304762,
			dy: .152381
		}), import_react$17.createElement("feGaussianBlur", { stdDeviation: .228571 }), import_react$17.createElement("feColorMatrix", {
			type: "matrix",
			values: "0 0 0 0 0.0901961 0 0 0 0 0.622274 0 0 0 0 0.921569 0 0 0 0.8 0"
		}), import_react$17.createElement("feBlend", {
			mode: "normal",
			in2: "BackgroundImageFix",
			result: "effect1_dropShadow_96497_141066"
		}), import_react$17.createElement("feBlend", {
			mode: "normal",
			in: "SourceGraphic",
			in2: "effect1_dropShadow_96497_141066",
			result: "shape"
		})), import_react$17.createElement("linearGradient", {
			id: "paint0_linear_96497_141066",
			x1: 6.86176,
			y1: 4.02222,
			x2: 6.86176,
			y2: 15.0028,
			gradientUnits: "userSpaceOnUse"
		}, import_react$17.createElement("stop", { stopColor: "#2DA5EB" }), import_react$17.createElement("stop", {
			offset: 1,
			stopColor: "#2198EB"
		})), import_react$17.createElement("linearGradient", {
			id: "paint1_linear_96497_141066",
			x1: 11.4669,
			y1: 2.04297,
			x2: .518714,
			y2: 18.8778,
			gradientUnits: "userSpaceOnUse"
		}, import_react$17.createElement("stop", { stopColor: "#4DD1FF" }), import_react$17.createElement("stop", {
			offset: 1,
			stopColor: "#3CBFFF"
		})))));
	};
	e$11(".space-menu-item-space-list {\n  border-radius: 8px;\n}\n.ai-space-list {\n  width: 200px;\n}\n.ai-space-list .space-list-tit {\n  width: 100%;\n  box-sizing: border-box;\n  font-size: 12px;\n  font-weight: 400;\n  line-height: 30px;\n  padding: 0 16px;\n  color: var(--text-medium, rgba(0, 0, 0, 0.48));\n}\n.ai-space-list .ai-space-list-content {\n  max-height: 300px;\n  overflow-y: auto;\n  overflow-x: hidden;\n}\n.ai-space-list .space-list-con-item .space-list-con-item-txt {\n  width: 100%;\n  box-sizing: border-box;\n  height: 30px;\n  padding: 0 12px 0 16px;\n}\n.ai-space-list .space-list-con-item .space-list-con-item-txt::before {\n  left: 2px;\n  display: none;\n}\n.ai-space-list .space-list-con-item .space-list-con {\n  display: flex;\n  align-items: center;\n  line-height: 30px;\n  width: 100%;\n}\n.ai-space-list .space-list-con-item .space-list-con .space-list-con-item-icon {\n  flex: none;\n  width: 20px;\n  height: 20px;\n}\n.ai-space-list .space-list-con-item .space-list-con .space-list-con-item-title {\n  flex: 1;\n  width: 150px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  margin-left: 8px;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  font-size: 12px;\n}\n");
	I$1 = function(e) {
		var t = e.list;
		return import_react$18.createElement("div", { className: "ai-space-list" }, import_react$18.createElement("div", { className: "space-list-tit" }, i$17("space-list")), import_react$18.createElement("div", { className: "ai-space-list-content" }, t.map((function(e) {
			return import_react$18.createElement("div", {
				key: e.wikiId,
				className: "space-list-con-item"
			}, import_react$18.createElement(Menu_default.Item, {
				id: "".concat(l$12.Topic, "_").concat(e.wikiId),
				className: "space-list-con-item-txt"
			}, import_react$18.createElement("div", { className: "space-list-con" }, import_react$18.createElement(O, {
				viewBox: "0 0 24 24",
				className: "space-list-con-item-icon"
			}), import_react$18.createElement("div", { className: "space-list-con-item-title" }, e.title))));
		}))));
	};
	e$11(".ai-component-pc-search-box-select-submenu.dui-menu-item {\n  padding-right: 20px !important;\n}\n.ai-component-pc-search-box-select-submenu.dui-menu-item::after {\n  margin-left: auto;\n}\n.ai-component-pc-search-box-select-submenu .dui-menu-item-text-container {\n  font-size: 14px;\n}\n.ai-component-pc-search-box-select-popup {\n  width: 200px;\n  border-radius: 8px;\n}\n.ai-component-pc-search-box-select-label {\n  display: flex;\n  align-items: center;\n  gap: 2px;\n  padding: 7px 8px 7px 12px;\n  line-height: 16px;\n  font-size: 12px;\n  font-weight: 400;\n  cursor: pointer;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  border: 1px solid var(--border-medium, rgba(0, 0, 0, 0.08));\n  border-radius: 20px;\n  background-color: var(--bg-lv2-default, rgba(255, 255, 255));\n}\n.ai-component-pc-search-box-select-label-text {\n  max-width: 130px;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.ai-component-pc-search-box-select-label-arrow {\n  width: 12px;\n  height: 12px;\n}\n.ai-component-pc-search-box-select-label-arrow path {\n  fill: var(--text-ultrastrong, rgba(0, 0, 0, 0.88)) !important;\n}\n.ai-component-pc-search-box-select-label-arrow.up {\n  transform: rotate(180deg);\n}\n.ai-component-pc-search-box-select-label-arrow.down {\n  transform: rotate(0deg);\n}\n.ai-component-pc-search-box-select-label:hover {\n  background: var(--feedback-hover, rgba(51, 77, 102, 0.06));\n}\n.ai-component-pc-search-box-select-select li.dui-menu-item {\n  height: unset;\n  padding: 5px 16px 5px 40px;\n  cursor: pointer;\n  justify-content: flex-start;\n  pointer-events: auto;\n}\n.ai-component-pc-search-box-select-select li.dui-menu-item::before {\n  content: '';\n  left: 14px !important;\n}\n.ai-component-pc-search-box-select-select li.space-menu-item {\n  width: 100%;\n  font-size: 12px;\n  line-height: 20px;\n  font-weight: 400;\n  box-sizing: border-box;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n}\n.ai-component-pc-search-box-select-select li.space-menu-item::after {\n  margin-left: auto;\n}\n.ai-component-pc-search-box-select-select-right-icon-wrapper.dui-menu-item {\n  padding-right: 20px !important;\n}\n.ai-component-pc-search-box-select-select-right-icon-wrapper .right-icon-container {\n  display: flex;\n  align-items: center;\n}\n.ai-component-pc-search-box-select-select-right-icon-wrapper .right-icon-container .select-right-icon {\n  margin-left: 4px;\n  width: 16px;\n  height: 16px;\n  border-radius: 4px;\n}\n.ai-component-pc-search-box-select-select-right-icon-wrapper .right-icon-container .select-right-icon:hover {\n  background-color: var(--feedback-hover, rgba(51, 77, 102, 0.06));\n}\n.ai-component-pc-search-box-select-select-right-icon-wrapper .right-icon-container .dui-trigger > div > div {\n  display: flex;\n  align-items: center;\n}\n.ai-component-pc-search-box-select-select-name {\n  font-size: 12px;\n  line-height: 20px;\n  font-weight: 400;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n}\n.ai-component-pc-search-box-select-select-name-with-desc {\n  font-weight: 600;\n}\n.ai-component-pc-search-box-select-select-desc {\n  margin-top: 2px;\n  font-size: 12px;\n  font-weight: 400;\n  line-height: 16px;\n  color: var(--text-medium, rgba(0, 0, 0, 0.48));\n}\n");
	j = function(e) {
		return import_react$17.createElement("svg", S$4({
			width: 16,
			height: 16,
			viewBox: "0 0 16 16",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg"
		}, e), import_react$17.createElement("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M5.6355 3.5L3.13534 6.16528C2.99897 6.31065 2.96198 6.52314 3.04119 6.70605C3.1204 6.88896 3.30068 7.00735 3.50001 7.00735H13V6.00735H4.65459L6.36484 4.18415L5.6355 3.5ZM10.3645 12.5037L12.8647 9.8387C13.001 9.69333 13.038 9.48083 12.9588 9.29792C12.8796 9.115 12.6993 8.9966 12.5 8.9966L3.00001 8.99661L3.00001 9.99661H11.3454L9.6352 11.8195L10.3645 12.5037Z",
			fill: "#454D5A",
			style: L$2(L$2({ fill: "#454D5A" }, "fill", "color(display-p3 0.2706 0.3020 0.3529)"), "fillOpacity", 1)
		}));
	};
	e$11(".ai-search-chat-range-tab-wrapper {\n  display: flex;\n  align-items: center;\n  padding: 12px 0;\n  margin-top: 20px;\n  border-bottom: 1px solid var(--separators-medium, rgba(0, 0, 0, 0.08));\n}\n.ai-search-chat-range-tab-title {\n  font-size: 18px;\n  font-weight: 500;\n  line-height: 24px;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  margin-right: 8px;\n}\n.ai-search-chat-range-tab-menu-name {\n  color: var(--text-medium, rgba(0, 0, 0, 0.48));\n  font-size: 12px;\n  line-height: 30px;\n  padding: 0 16px;\n  height: 30px;\n}\n.ai-search-chat-range-tab-submenu.dui-menu-item {\n  padding-right: 20px !important;\n}\n.ai-search-chat-range-tab-submenu.dui-menu-item::after {\n  margin-left: auto;\n}\n.ai-search-chat-range-tab-submenu .dui-menu-item-text-container {\n  font-size: 12px;\n}\n.ai-search-chat-range-tab-popup {\n  width: 200px;\n  border-radius: 8px;\n}\n.ai-search-chat-range-tab-label {\n  display: flex;\n  align-items: center;\n  gap: 2px;\n  padding: 0 8px;\n  line-height: 16px;\n  font-size: 12px;\n  font-weight: 400;\n  cursor: pointer;\n  color: var(--text-strong, rgba(0, 0, 0, 0.64));\n  border-radius: 20px;\n  background: var(--tsp-fill-weak, rgba(51, 77, 102, 0.06));\n  height: 28px;\n  border: 0;\n}\n.ai-search-chat-range-tab-label-arrow {\n  width: 16px;\n  height: 16px;\n}\n.ai-search-chat-range-tab-label-arrow path {\n  fill: var(--text-strong, rgba(0, 0, 0, 0.64)) !important;\n}\n.ai-search-chat-range-tab-label:hover {\n  background: var(--feedback-hover, rgba(51, 77, 102, 0.06));\n}\n.ai-search-chat-range-tab-select li.dui-menu-item {\n  height: unset;\n  padding-left: 40px;\n  padding-right: 16px;\n  cursor: pointer;\n  justify-content: flex-start;\n  pointer-events: auto;\n}\n.ai-search-chat-range-tab-select li.dui-menu-item::before {\n  content: '';\n  left: 14px !important;\n}\n.ai-search-chat-range-tab-select li.space-menu-item .dui-menu-item-text-container {\n  line-height: 12px;\n}\n.ai-search-chat-range-tab-select li.space-menu-item::after {\n  margin-left: auto;\n}\n.ai-search-chat-range-tab-select-right-icon-wrapper.dui-menu-item {\n  padding-right: 20px !important;\n}\n.ai-search-chat-range-tab-select-right-icon-wrapper .right-icon-container {\n  display: flex;\n  align-items: center;\n}\n.ai-search-chat-range-tab-select-right-icon-wrapper .right-icon-container .select-right-icon {\n  margin-left: 4px;\n  width: 16px;\n  height: 16px;\n  border-radius: 4px;\n}\n.ai-search-chat-range-tab-select-right-icon-wrapper .right-icon-container .select-right-icon:hover {\n  background-color: var(--feedback-hover, rgba(51, 77, 102, 0.06));\n}\n.ai-search-chat-range-tab-select-right-icon-wrapper .right-icon-container .dui-trigger > div > div {\n  display: flex;\n  align-items: center;\n}\n.ai-search-chat-range-tab-select-name {\n  font-size: 12px;\n  line-height: 12px;\n  font-weight: 400;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n}\n.ai-search-chat-range-tab-select-name-with-desc {\n  font-weight: 600;\n}\n.ai-search-chat-range-tab-select-desc {\n  margin-top: 2px;\n  font-size: 12px;\n  font-weight: 400;\n  line-height: 16px;\n  color: var(--text-medium, rgba(0, 0, 0, 0.48));\n}\n");
	T = "ai-search-chat-range-tab", D$1 = function(e) {
		var n, i, r, o = e.selectId, g = e.className, x = e.spaces, v = e.disabled, w = e.initWikiId, E = e.onClick, y = o$12("isEmbedded"), _ = function(e) {
			return e === l$12.Topic && !(null != x && x.length);
		};
		return import_react$18.createElement("div", { className: "".concat(T, "-wrapper") }, import_react$18.createElement("div", { className: "".concat(T, "-title") }, i$17("base-on", { range: (n = o, r = E$7(), o$12("isEmbedded") && n === l$12.Topic ? i$17("searchBox.currentWiki") : null === (i = r.find((function(e) {
			return e.id === n;
		}))) || void 0 === i ? void 0 : i.name) })), import_react$18.createElement(Dropdown_default, {
			dropContent: import_react$18.createElement(Menu_default, {
				selectedIds: [o, o === l$12.Topic && w ? "".concat(l$12.Topic, "_").concat(w) : ""].filter(Boolean),
				onClick: function(e) {
					var n = e;
					if (n !== o && e.startsWith("".concat(l$12.Topic, "_"))) {
						var i = t$9(e.split("_"), 2), r = i[0], c = i[1], s = x.find((function(e) {
							return e.wikiId === c;
						}));
						if (s) return void (null == E || E(r, null == s ? void 0 : s.wikiId));
						n = r;
					}
					localStorage.setItem(C$7, n), E?.(n);
				},
				className: "".concat(T, "-select"),
				style: {
					minWidth: 200,
					borderRadius: "8px",
					border: "1px solid var(--border-medium, rgba(0, 0, 0, 0.08))"
				}
			}, import_react$18.createElement("div", { className: "".concat(T, "-menu-name") }, i$17("switch-search-range")), E$7().map((function(e) {
				return e.id === l$12.Topic && x.length > 0 && w && y ? F$2(F$2({}, e), {}, {
					id: "".concat(e.id, "_").concat(w),
					name: i$17("searchBox.currentWiki"),
					rightIcon: ""
				}) : e;
			})).map((function(e) {
				return e.rightIcon && e.id !== l$12.Topic || _(e.id) ? import_react$18.createElement(Menu_default.Item, {
					id: e.id,
					key: e.id,
					className: "".concat(T, "-select-right-icon-wrapper"),
					disabled: _(e.id)
				}, import_react$18.createElement("div", { className: "right-icon-container" }, import_react$18.createElement("div", null, import_react$18.createElement("div", { className: (0, import_classnames$6.default)("".concat(T, "-select-name")) }, e.name)), import_react$18.createElement(Tooltip_default, {
					placement: "right",
					title: e.popContent,
					containerOffsetX: 16
				}, import_react$18.createElement("div", { className: "select-right-icon" }, e.rightIcon && import_react$18.createElement(e.rightIcon, null))))) : !ua.isMobile && e.id === l$12.Topic && x.length > 0 ? import_react$18.createElement(Menu_default.SubMenu, {
					id: e.id,
					key: e.id,
					title: e.name,
					className: "space-menu-item",
					popupClassName: "space-menu-item-space-list"
				}, import_react$18.createElement(I$1, { list: x })) : import_react$18.createElement(Menu_default.Item, {
					id: e.id,
					key: e.id,
					disabled: _(e.id)
				}, import_react$18.createElement("div", null, import_react$18.createElement("div", { className: (0, import_classnames$6.default)("".concat(T, "-select-name")) }, e.name)));
			}))),
			disabled: v
		}, import_react$18.createElement("button", { className: "".concat(T, "-label ").concat(g) }, import_react$18.createElement(j, { className: "".concat(T, "-label-arrow") }), import_react$18.createElement("div", { className: "".concat(T, "-label-text") }, i$17("switch-search-range")))));
	}, M$1 = "ai-component-pc-search-box-select", z = function(n) {
		var s = n.disabled, u = n.spaces, g = void 0 === u ? [] : u, x = n.envSpaceId, b = n.isEmbedded, v = n.rangeId, w = n.spaceId, E = n.onChange, y = n.hasCurrentDocRangeType, _ = n.hasCurrentFolderRangeType, C = function(e) {
			return !(e !== l$12.Topic || null != g && g.length || b || x);
		}, k = (0, import_react$18.useCallback)((function(e) {
			return e === l$12.Topic && x && b;
		}), [x, b]), O = function(e, t) {
			return k(e) ? i$17("当前空间") : t;
		}, N = (0, import_react$18.useMemo)((function() {
			var t, n, a, i = null === (t = window) || void 0 === t || null === (t = t.basicClientVars) || void 0 === t ? void 0 : t.docInfo, r = "application/vnd.tdocs-apps.wiki-space" === (null == i ? void 0 : i.mimeType) && "folder" === (null == i || null === (n = i.padInfo) || void 0 === n ? void 0 : n.padType) && (null == i || null === (a = i.padInfo) || void 0 === a ? void 0 : a.padId), c = E$7(y, _);
			if (r) {
				var o = [
					l$12.CURRENT_DOC,
					l$12.CURRENT_FOLDER,
					l$12.Topic,
					l$12.TDocs,
					l$12.PART_DOCS,
					l$12.Default
				];
				return e$5(c).sort((function(e, t) {
					return o.indexOf(e.id) - o.indexOf(t.id);
				}));
			}
			return c;
		}), [y, _]), S = import_react$18.createElement(Menu_default, {
			selectedIds: [v, "".concat(v, "_").concat(w)].filter(Boolean),
			onClick: function(e) {
				var n = e, a = "";
				if (n !== v) if (e.startsWith("".concat(l$12.Topic, "_"))) {
					var r = t$9(e.split("_"), 2), c = r[0], o = r[1], s = g.find((function(e) {
						return e.wikiId === o;
					}));
					(k(c) || s) && (n = c, a = o);
				} else a = "";
				E?.(n, a), localStorage.setItem(C$7, n);
			},
			className: "".concat(M$1, "-select"),
			style: {
				minWidth: 200,
				borderRadius: "8px",
				border: "1px solid var(--border-medium, rgba(0, 0, 0, 0.08))"
			}
		}, N.map((function(e) {
			return e.id === l$12.Topic && g.length > 0 && !k(e.id) ? import_react$18.createElement(Menu_default.SubMenu, {
				id: e.id,
				key: e.id,
				title: e.name,
				className: "space-menu-item",
				popupClassName: "space-menu-item-space-list"
			}, import_react$18.createElement(I$1, { list: g })) : e.rightIcon && e.id === l$12.TDocs || C(e.id) ? import_react$18.createElement(Menu_default.Item, {
				id: k(e.id) ? "".concat(e.id, "_").concat(x) : e.id,
				key: e.id,
				className: "".concat(M$1, "-select-right-icon-wrapper"),
				disabled: C(e.id)
			}, import_react$18.createElement("div", { className: "right-icon-container" }, import_react$18.createElement("div", null, import_react$18.createElement("div", { className: (0, import_classnames$6.default)("".concat(M$1, "-select-name")) }, O(e.id, e.name))), import_react$18.createElement(Tooltip_default, {
				placement: "right",
				title: C(e.id) ? e.disabledPopContent : e.popContent,
				containerOffsetX: 16
			}, import_react$18.createElement("div", { className: "select-right-icon" }, e.rightIcon ? import_react$18.createElement(e.rightIcon, null) : null)))) : import_react$18.createElement(Menu_default.Item, {
				id: k(e.id) ? "".concat(e.id, "_").concat(x) : e.id,
				key: e.id
			}, import_react$18.createElement("div", null, import_react$18.createElement("div", { className: (0, import_classnames$6.default)("".concat(M$1, "-select-name")) }, O(e.id, e.name))));
		}))), L = (0, import_react$18.useMemo)((function() {
			var e, t;
			return v && k(v) ? i$17("当前空间") : (e = v || "", null === (t = N.find((function(t) {
				return t.id === e;
			}))) || void 0 === t ? void 0 : t.name);
		}), [
			v,
			k,
			N
		]);
		return import_react$18.createElement(w$8, {
			customMenu: S,
			respectLabel: !0,
			disabled: s,
			item: {
				key: "range",
				label: L || "",
				options: []
			}
		});
	};
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/dist/esm/chunks/bottombar_new_sheet-ddaa75a8.js
function a$9() {
	return a$9 = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var l in n) ({}).hasOwnProperty.call(n, l) && (e[l] = n[l]);
		}
		return e;
	}, a$9.apply(null, arguments);
}
var import_react$16, t$3, n$4, l$5, r$4, i$5;
var init_bottombar_new_sheet_ddaa75a8 = __esmMin((() => {
	import_react$16 = /* @__PURE__ */ __toESM(require_react());
	i$5 = function(i) {
		return import_react$16.createElement("svg", a$9({
			width: "24px",
			height: "24px",
			viewBox: "0 0 24 24",
			xmlns: "http://www.w3.org/2000/svg",
			xmlnsXlink: "http://www.w3.org/1999/xlink"
		}, i), t$3 || (t$3 = import_react$16.createElement("title", null, "bottombar_new_sheet")), n$4 || (n$4 = import_react$16.createElement("desc", null, "Created with Sketch.")), l$5 || (l$5 = import_react$16.createElement("defs", null, import_react$16.createElement("path", {
			d: "M13,5 L13,11 L19,11 L19,13 L13,13 L13,19 L11,19 L11,13 L5,13 L5,11 L11,11 L11,5 L13,5 Z",
			id: "path-1"
		}))), r$4 || (r$4 = import_react$16.createElement("g", {
			id: "bottombar_new_sheet",
			stroke: "none",
			strokeWidth: 1,
			fill: "none",
			fillRule: "evenodd"
		}, import_react$16.createElement("g", null, import_react$16.createElement("rect", {
			id: "\\u77E9\\u5F62",
			stroke: "#979797",
			fill: "#D8D8D8",
			opacity: 0,
			x: 0,
			y: 0,
			width: 24,
			height: 24
		}), import_react$16.createElement("mask", {
			id: "mask-2",
			fill: "white"
		}, import_react$16.createElement("use", { xlinkHref: "#path-1" })), import_react$16.createElement("use", {
			id: "Combined-Shape",
			fill: "#464D5A",
			xlinkHref: "#path-1"
		})))));
	};
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/dist/esm/search-box/index.js
function Z$1(e) {
	return Z$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
		return typeof e;
	} : function(e) {
		return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, Z$1(e);
}
function W() {
	return W = Object.assign ? Object.assign.bind() : function(e) {
		for (var n = 1; n < arguments.length; n++) {
			var t = arguments[n];
			for (var o in t) ({}).hasOwnProperty.call(t, o) && (e[o] = t[o]);
		}
		return e;
	}, W.apply(null, arguments);
}
function X(e, n, t) {
	return (n = function(e) {
		var n = function(e, n) {
			if ("object" != Z$1(e) || !e) return e;
			var t = e[Symbol.toPrimitive];
			if (void 0 !== t) {
				var o = t.call(e, n || "default");
				if ("object" != Z$1(o)) return o;
				throw new TypeError("@@toPrimitive must return a primitive value.");
			}
			return ("string" === n ? String : Number)(e);
		}(e, "string");
		return "symbol" == Z$1(n) ? n : n + "";
	}(n)) in e ? Object.defineProperty(e, n, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[n] = t, e;
}
function q(e, n) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		n && (o = o.filter((function(n) {
			return Object.getOwnPropertyDescriptor(e, n).enumerable;
		}))), t.push.apply(t, o);
	}
	return t;
}
function Q(n) {
	for (var t = 1; t < arguments.length; t++) {
		var o = null != arguments[t] ? arguments[t] : {};
		t % 2 ? q(Object(o), !0).forEach((function(t) {
			a$19(n, t, o[t]);
		})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(o)) : q(Object(o)).forEach((function(e) {
			Object.defineProperty(n, e, Object.getOwnPropertyDescriptor(o, e));
		}));
	}
	return n;
}
var import_react$14, import_react$15, import_classnames$5, R$1, U, G, H$1, K, J, $, Y, ee;
var init_search_box = __esmMin((() => {
	init_index_c23defda();
	init_slicedToArray_e715395f();
	import_react$14 = /* @__PURE__ */ __toESM(require_react());
	import_react$15 = /* @__PURE__ */ __toESM(require_react());
	init_model_selector();
	init_range_selector();
	init_index_8ec9b46d();
	init_esm$6();
	init_esm$3();
	init_index_bc35b061();
	init_send_disable_24_b418eed8();
	init_bottombar_new_sheet_ddaa75a8();
	import_classnames$5 = /* @__PURE__ */ __toESM(require_classnames());
	init_style_inject_es_3984fa0f();
	init_index_4a868389();
	init_esm$1();
	init_esm$4();
	init_esm$5();
	e$11(".ai-component-pc-search-box-components-input {\n  font-size: 14px;\n  line-height: 24px;\n  border: none;\n  padding: 0;\n  resize: none;\n  margin: 0;\n  outline: none;\n  cursor: text;\n  user-modify: read-write-plaintext-only;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  position: relative;\n}\n.ai-component-pc-search-box-components-input:empty::after {\n  content: attr(placeholder);\n  color: var(--text-strong, rgba(0, 0, 0, 0.64));\n}\n");
	R$1 = function(e) {
		var t, l = t$9((0, import_react$15.useState)(null !== (t = e.inputValue) && void 0 !== t ? t : ""), 2), s = l[0], p = l[1], u = t$9((0, import_react$15.useState)(!1), 2), m = u[0], f = u[1], h = (0, import_react$15.useRef)(null);
		return (0, import_react$15.useEffect)((function() {
			var n;
			h.current && e.inputValue !== s && (h.current.innerText = e.inputValue || ""), p(null !== (n = e.inputValue) && void 0 !== n ? n : "");
		}), [e.inputValue, h]), (0, import_react$15.useEffect)((function() {
			var n;
			e.focus && (null === (n = h.current) || void 0 === n || n.focus());
		}), [e.focus, h]), import_react$15.createElement("div", {
			className: "".concat("ai-component-pc-search-box-components-input", " ").concat(e.className),
			onInput: function() {
				var n, t, o, r = null !== (n = null === (t = h.current) || void 0 === t ? void 0 : t.textContent) && void 0 !== n ? n : "";
				p(r), null === (o = e.onChange) || void 0 === o || o.call(e, r), !r && h.current && (h.current.innerHTML = "");
			},
			ref: h,
			contentEditable: !e.disabled && "plaintext-only",
			placeholder: e.placeholder,
			onKeyDown: function(n) {
				var t;
				m || "Enter" !== n.key || n.shiftKey || (n.preventDefault(), null === (t = e.onEnter) || void 0 === t || t.call(e, s));
			},
			onFocus: e.onFocus,
			onBlur: e.onBlur,
			onCompositionStart: function() {
				return f(!0);
			},
			onCompositionEnd: function() {
				return f(!1);
			}
		});
	};
	e$11(".ai-component-pc-search-box-search-frame-wrapper {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  border-radius: 12px;\n  border: 1px solid var(--border-medium, rgba(0, 0, 0, 0.08));\n  background-color: var(--bg-lv2-default, #fff);\n  box-sizing: border-box;\n  position: relative;\n}\n.ai-component-pc-search-box-search-frame-wrapper::after {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: var(--bg-lv1-default, #FFF);\n  background-size: 400% 400%;\n  border-radius: 11px;\n}\n.ai-component-pc-search-box-search-frame-focus::before {\n  content: '';\n  position: absolute;\n  top: -1px;\n  left: -1px;\n  right: -1px;\n  bottom: -1px;\n  background: linear-gradient(341deg, #45A1FF, transparent 16%, transparent 100%);\n  background-size: 100%;\n  background-origin: border-box;\n  background-clip: padding-box, border-box;\n  border-radius: 12px;\n  z-index: 0;\n}\n.ai-component-pc-search-box-search-frame-content {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  padding: 12px;\n  box-sizing: border-box;\n  z-index: 1;\n}\n.ai-component-pc-search-box-search-frame-content-input {\n  flex: 1;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  font-size: 14px;\n  line-height: 24px;\n  border: none;\n  padding: 0;\n  resize: none;\n  margin: 0;\n  outline: none;\n  cursor: text;\n  user-modify: read-write-plaintext-only;\n}\n.ai-component-pc-search-box-search-frame-content-input:empty::after {\n  content: attr(placeholder);\n  color: var(--text-medium, rgba(0, 0, 0, 0.48));\n}\n.ai-component-pc-search-box-search-frame-content-footer {\n  display: flex;\n  justify-content: space-between;\n}\n.ai-component-pc-search-box-search-frame-content-footer-left {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n.ai-component-pc-search-box-search-frame-content-footer-right {\n  display: flex;\n  align-items: center;\n  gap: 25px;\n}\n");
	U = "ai-component-pc-search-box-search-frame", G = function(t) {
		var g = t.placeholder, b = t.focus, E = t.title, F = t.enableAttachments, w = t.className, k = t.inputValue, A = t.initRange, B = t.initWikiId, z$6 = t.isEmbedded, L = void 0 !== z$6 && z$6, P = t.onSend, I = t.source, M = t$9((0, import_react$15.useState)(b), 2), G = M[0], H = M[1], Z = t$9((0, import_react$15.useState)(null != k ? k : ""), 2), W = Z[0], X = Z[1], $ = t$9((0, import_react$15.useState)(_$5()), 2), q = $[0], Q = $[1], ee = t$9((0, import_react$15.useState)(A || l$12.TDocs), 2), ne = ee[0], te = ee[1], re = t$9((0, import_react$15.useState)(""), 2), ae = re[0], ie = re[1], ce = p$10(!(A === l$12.Topic && L && B)).spaces, se = Me$1({
			maxSize: 50,
			useEmbedding: !0,
			initialFiles: [],
			onlineFileSizeLimit: 1e3,
			onRemoveTaskFileCb: (0, import_react$15.useCallback)((function(e) {
				var n;
				(null == e || null === (n = e.getTask()) || void 0 === n || null === (n = n.file) || void 0 === n ? void 0 : n.type) === L$5.WIKI && ie("");
			}), [ie])
		}), pe = se.fileTasks, de = se.selectOnlineDoc, ue = se.fileTaskManager, me = (0, import_react$15.useRef)(null);
		(0, import_react$15.useEffect)((function() {
			var e, n = ce.find((function(e) {
				return e.wikiId === ae;
			}));
			ae && n && !L && (null == ue || null === (e = ue.replaceFileTask) || void 0 === e || e.call(ue, new Ee$2({
				id: ae,
				name: n.title,
				type: L$5.WIKI,
				topic_id: ae
			}, ue, F$5.UPLOAD_SUCCESS)));
		}), [ae]);
		var fe = function() {
			if (!ge() && ue) {
				var e = N$7[q], n = ue.getFileData();
				localStorage.setItem(D$8, JSON.stringify(n));
				var t = {
					model: e,
					range: ne,
					title: W
				};
				ae && (t.wikiId = ae), "space" === I && _$7.spaceAISearch(null == t ? void 0 : t.range, t.title), P({ searchParams: t });
			}
		}, he = function() {
			H(!0);
		};
		e$14(me, (function() {
			H(!1);
		}));
		var ge = function() {
			if (!W) return !0;
			var e = (null == ue ? void 0 : ue.getFileData()) || [];
			return ne === l$12.PART_DOCS && !e.length || ne === l$12.Topic && !ae;
		};
		return import_react$15.createElement("div", {
			className: (0, import_classnames$5.default)("".concat(U, "-wrapper"), a$19({}, "".concat(U, "-focus"), !!G), w),
			onClick: he,
			ref: me
		}, E && import_react$15.createElement("div", null, E), import_react$15.createElement("div", { className: "".concat(U, "-content") }, null != pe && pe.length && ue ? import_react$15.createElement("div", { className: "docs-ai-input__file-list" }, import_react$15.createElement(l, {
			position: "aidesktop",
			fileTasks: pe,
			fileTaskManager: ue
		})) : null, import_react$15.createElement(R$1, {
			className: "".concat(U, "-content-input"),
			placeholder: g,
			onEnter: fe,
			onChange: function(e) {
				return X(e);
			},
			focus: G
		}), import_react$15.createElement("div", { className: "".concat(U, "-content-footer") }, import_react$15.createElement("div", { className: "".concat(U, "-content-footer-left") }, import_react$15.createElement(z, {
			rangeId: ne,
			spaceId: ae,
			spaces: ce,
			envSpaceId: B,
			isEmbedded: L,
			onChange: function(e, n) {
				he(), ie(n || ""), te(e), e === l$12.PART_DOCS ? de(!0) : e !== l$12.Topic && ue?.clearFileTask();
			}
		}), import_react$15.createElement(p$1, { onModelChange: function(e) {
			Q(e);
		} })), import_react$15.createElement("div", { className: "".concat(U, "-content-footer-right") }, F && import_react$15.createElement(i$5, null), ge() ? import_react$15.createElement(c$11, { onClick: fe }) : import_react$15.createElement(n$9, { onClick: fe })))));
	};
	e$11(".ai-component-pc-search-box-append-search-wrapper {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  min-height: 96px;\n  padding: 12px 16px;\n  border-radius: 20px;\n  border: 1px solid var(--border-strong, rgba(0, 0, 0, 0.12));\n  color: var(--text-medium, rgba(0, 0, 0, 0.48));\n  position: relative;\n}\n.ai-component-pc-search-box-append-search-wrapper::after {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: var(--bg-lv1-default, #FFF);\n  background-size: 400% 400%;\n  border-radius: 19px;\n}\n.ai-component-pc-search-box-append-search-content {\n  flex-direction: column;\n  gap: 12px;\n  z-index: 1;\n}\n.ai-component-pc-search-box-append-search-focus::before {\n  content: '';\n  position: absolute;\n  top: -1px;\n  left: -1px;\n  right: -1px;\n  bottom: -1px;\n  background: linear-gradient(341deg, #45A1FF, transparent 16%, transparent 100%);\n  background-size: 100%;\n  background-origin: border-box;\n  background-clip: padding-box, border-box;\n  border-radius: 20px;\n  z-index: 0;\n}\n.ai-component-pc-search-box-append-search-input {\n  width: 100%;\n  z-index: 1;\n}\n.ai-component-pc-search-box-append-search-button {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  z-index: 1;\n}\n.ai-component-pc-search-box-append-search-button-left {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.ai-component-pc-search-box-append-search-stop {\n  width: 32px;\n  height: 32px;\n  cursor: pointer;\n  z-index: 1;\n}\n.ai-component-pc-search-box-append-search-send {\n  width: 32px;\n  height: 32px;\n  z-index: 1;\n  border-radius: 50%;\n  cursor: pointer;\n  display: block;\n  background-image: url(\"data:image/svg+xml,%3Csvg width%3D%2232%22 height%3D%2232%22 viewBox%3D%220 0 32 32%22 fill%3D%22none%22 xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ccircle cx%3D%2216%22 cy%3D%2216%22 r%3D%2216%22 fill%3D%22url(%23paint0_radial_1780_16652)%22 style%3D%22%22%2F%3E%3Cpath fill-rule%3D%22evenodd%22 clip-rule%3D%22evenodd%22 d%3D%22M23.2071 16.2071C23.5976 15.8166 23.5976 15.1834 23.2071 14.7929L17.7071 9.29289C17.3166 8.90237 16.6834 8.90237 16.2929 9.29289C15.9024 9.68342 15.9024 10.3166 16.2929 10.7071L20.0858 14.5L9.5 14.5C8.94771 14.5 8.5 14.9477 8.5 15.5C8.5 16.0523 8.94772 16.5 9.5 16.5L20.0858 16.5L16.2929 20.2929C15.9024 20.6834 15.9024 21.3166 16.2929 21.7071C16.6834 22.0976 17.3166 22.0976 17.7071 21.7071L23.2071 16.2071Z%22 fill%3D%22white%22 style%3D%22fill%3Awhite%3Bfill-opacity%3A1%3B%22%2F%3E%3Cdefs%3E%3CradialGradient id%3D%22paint0_radial_1780_16652%22 cx%3D%220%22 cy%3D%220%22 r%3D%221%22 gradientUnits%3D%22userSpaceOnUse%22 gradientTransform%3D%22translate(7 -6) rotate(66.3295) scale(39.8529 27.2225)%22%3E%3Cstop offset%3D%220.327165%22 stop-color%3D%22%232C91FF%22 style%3D%22stop-color%3A%232C91FF%3Bstop-color%3Acolor(display-p3 0.1725 0.5686 1.0000)%3Bstop-opacity%3A1%3B%22%2F%3E%3Cstop offset%3D%221%22 stop-color%3D%22%232175FF%22 style%3D%22stop-color%3A%232175FF%3Bstop-color%3Acolor(display-p3 0.1294 0.4588 1.0000)%3Bstop-opacity%3A1%3B%22%2F%3E%3C%2FradialGradient%3E%3C%2Fdefs%3E%3C%2Fsvg%3E\");\n  background-size: 100% 100%;\n}\n.ai-component-pc-search-box-append-search-send:hover {\n  background-image: url(\"data:image/svg+xml,%3Csvg width%3D%2232%22 height%3D%2232%22 viewBox%3D%220 0 32 32%22 fill%3D%22none%22 xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ccircle cx%3D%2216%22 cy%3D%2216%22 r%3D%2216%22 fill%3D%22url(%23paint0_radial_1780_16659)%22 style%3D%22%22%2F%3E%3Ccircle cx%3D%2216%22 cy%3D%2216%22 r%3D%2216%22 fill%3D%22black%22 fill-opacity%3D%220.08%22 style%3D%22fill%3Ablack%3Bfill-opacity%3A0.08%3B%22%2F%3E%3Cpath fill-rule%3D%22evenodd%22 clip-rule%3D%22evenodd%22 d%3D%22M23.2071 16.2071C23.5976 15.8166 23.5976 15.1834 23.2071 14.7929L17.7071 9.29289C17.3166 8.90237 16.6834 8.90237 16.2929 9.29289C15.9024 9.68342 15.9024 10.3166 16.2929 10.7071L20.0858 14.5L9.5 14.5C8.94771 14.5 8.5 14.9477 8.5 15.5C8.5 16.0523 8.94772 16.5 9.5 16.5L20.0858 16.5L16.2929 20.2929C15.9024 20.6834 15.9024 21.3166 16.2929 21.7071C16.6834 22.0976 17.3166 22.0976 17.7071 21.7071L23.2071 16.2071Z%22 fill%3D%22white%22 style%3D%22fill%3Awhite%3Bfill-opacity%3A1%3B%22%2F%3E%3Cdefs%3E%3CradialGradient id%3D%22paint0_radial_1780_16659%22 cx%3D%220%22 cy%3D%220%22 r%3D%221%22 gradientUnits%3D%22userSpaceOnUse%22 gradientTransform%3D%22translate(7 -6) rotate(66.3295) scale(39.8529 27.2225)%22%3E%3Cstop offset%3D%220.327165%22 stop-color%3D%22%232C91FF%22 style%3D%22stop-color%3A%232C91FF%3Bstop-color%3Acolor(display-p3 0.1725 0.5686 1.0000)%3Bstop-opacity%3A1%3B%22%2F%3E%3Cstop offset%3D%221%22 stop-color%3D%22%232175FF%22 style%3D%22stop-color%3A%232175FF%3Bstop-color%3Acolor(display-p3 0.1294 0.4588 1.0000)%3Bstop-opacity%3A1%3B%22%2F%3E%3C%2FradialGradient%3E%3C%2Fdefs%3E%3C%2Fsvg%3E\");\n}\n.ai-component-pc-search-box-append-search-send.disable {\n  background-image: url(\"data:image/svg+xml,%3Csvg width%3D%2232%22 height%3D%2232%22 viewBox%3D%220 0 32 32%22 fill%3D%22none%22 xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg opacity%3D%220.4%22%3E%3Ccircle cx%3D%2216%22 cy%3D%2216%22 r%3D%2216%22 fill%3D%22url(%23paint0_radial_1780_16679)%22 style%3D%22%22%2F%3E%3Cpath fill-rule%3D%22evenodd%22 clip-rule%3D%22evenodd%22 d%3D%22M23.2071 16.2071C23.5976 15.8166 23.5976 15.1834 23.2071 14.7929L17.7071 9.29289C17.3166 8.90237 16.6834 8.90237 16.2929 9.29289C15.9024 9.68342 15.9024 10.3166 16.2929 10.7071L20.0858 14.5L9.5 14.5C8.94771 14.5 8.5 14.9477 8.5 15.5C8.5 16.0523 8.94772 16.5 9.5 16.5L20.0858 16.5L16.2929 20.2929C15.9024 20.6834 15.9024 21.3166 16.2929 21.7071C16.6834 22.0976 17.3166 22.0976 17.7071 21.7071L23.2071 16.2071Z%22 fill%3D%22white%22 style%3D%22fill%3Awhite%3Bfill-opacity%3A1%3B%22%2F%3E%3C%2Fg%3E%3Cdefs%3E%3CradialGradient id%3D%22paint0_radial_1780_16679%22 cx%3D%220%22 cy%3D%220%22 r%3D%221%22 gradientUnits%3D%22userSpaceOnUse%22 gradientTransform%3D%22translate(7 -6) rotate(66.3295) scale(39.8529 27.2225)%22%3E%3Cstop offset%3D%220.327165%22 stop-color%3D%22%232C91FF%22 style%3D%22stop-color%3A%232C91FF%3Bstop-color%3Acolor(display-p3 0.1725 0.5686 1.0000)%3Bstop-opacity%3A1%3B%22%2F%3E%3Cstop offset%3D%221%22 stop-color%3D%22%232175FF%22 style%3D%22stop-color%3A%232175FF%3Bstop-color%3Acolor(display-p3 0.1294 0.4588 1.0000)%3Bstop-opacity%3A1%3B%22%2F%3E%3C%2FradialGradient%3E%3C%2Fdefs%3E%3C%2Fsvg%3E\");\n}\n.ai-component-pc-search-box-append-search-send.stop {\n  background-image: url(\"data:image/svg+xml,%3Csvg width%3D%2232%22 height%3D%2232%22 viewBox%3D%220 0 32 32%22 fill%3D%22none%22 xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ccircle cx%3D%2216%22 cy%3D%2216%22 r%3D%2216%22 fill%3D%22url(%23paint0_radial_1099_129880)%22 style%3D%22%22%2F%3E%3Cpath d%3D%22M10 12C10 10.8954 10.8954 10 12 10H20C21.1046 10 22 10.8954 22 12V20C22 21.1046 21.1046 22 20 22H12C10.8954 22 10 21.1046 10 20V12Z%22 fill%3D%22white%22 style%3D%22fill%3Awhite%3Bfill-opacity%3A1%3B%22%2F%3E%3Cdefs%3E%3CradialGradient id%3D%22paint0_radial_1099_129880%22 cx%3D%220%22 cy%3D%220%22 r%3D%221%22 gradientUnits%3D%22userSpaceOnUse%22 gradientTransform%3D%22translate(7 -6) rotate(66.3295) scale(39.8529 27.2225)%22%3E%3Cstop offset%3D%220.327165%22 stop-color%3D%22%232C91FF%22 style%3D%22stop-color%3A%232C91FF%3Bstop-color%3Acolor(display-p3 0.1725 0.5686 1.0000)%3Bstop-opacity%3A1%3B%22%2F%3E%3Cstop offset%3D%221%22 stop-color%3D%22%232175FF%22 style%3D%22stop-color%3A%232175FF%3Bstop-color%3Acolor(display-p3 0.1294 0.4588 1.0000)%3Bstop-opacity%3A1%3B%22%2F%3E%3C%2FradialGradient%3E%3C%2Fdefs%3E%3C%2Fsvg%3E\");\n}\n.ai-component-pc-search-box-append-search-select {\n  background: inherit;\n  white-space: nowrap;\n  border-radius: 20px;\n  z-index: 1;\n}\n.ai-component-pc-search-box-append-search-file-list {\n  position: relative;\n  z-index: 1;\n}\n");
	H$1 = "ai-component-pc-search-box-append-search", K = function(t) {
		var a = t.isGenerating, i = t.fileTasks, c = t.fileTaskManager, d = t.range, u = t.wikiId, m = t.spaces, f = void 0 === m ? [] : m, h = t.onWikiChange, g = t.selectOnlineDoc, b = t.onStop, x = t.onSend, y = t.onModelChange, D = t.onRangeChange, F = t$9((0, import_react$15.useState)(!1), 2), w = F[0], k = F[1], B = t$9((0, import_react$15.useState)(""), 2), S = B[0], _ = B[1], O = function() {
			a ? b?.() : j() || (x?.(S, c.getFileData()), _(""));
		}, j = function() {
			if (!S) return !0;
			var e = (null == c ? void 0 : c.getFileData()) || [];
			return !(![l$12.PART_DOCS].includes(d) || e.length) || l$12.Topic === d && !u;
		};
		return import_react$15.createElement("div", { className: (0, import_classnames$5.default)("".concat(H$1, "-wrapper ").concat(H$1, "-content"), a$19(a$19(a$19({}, "".concat(H$1, "-focus"), !!w), "".concat(H$1, "-blank"), !S), "".concat(H$1, "-disable"), a)) }, null != i && i.length ? import_react$15.createElement("div", { className: "".concat(H$1, "-file-list") }, import_react$15.createElement(l, {
			position: "aidesktop",
			fileTasks: i,
			fileTaskManager: c
		})) : null, import_react$15.createElement(R$1, {
			className: "".concat(H$1, "-input"),
			onChange: function(e) {
				return _(e);
			},
			placeholder: i$17(a ? "searchBox.aiCreating" : "searchBox.append"),
			onFocus: function() {
				return k(!0);
			},
			onBlur: function() {
				return k(!1);
			},
			onEnter: O,
			disabled: a,
			inputValue: S
		}), import_react$15.createElement("div", { className: "".concat(H$1, "-button") }, import_react$15.createElement("div", { className: "".concat(H$1, "-button-left") }, import_react$15.createElement(z, {
			disabled: a,
			rangeId: d,
			spaceId: u,
			envSpaceId: o$12("wikiId"),
			spaces: f,
			isEmbedded: !!o$12("isEmbedded"),
			onChange: function(e, n) {
				D?.(e), h?.(n || ""), e === l$12.PART_DOCS ? g(!0) : c.clearFileTask();
			}
		}), import_react$15.createElement(p$1, { onModelChange: y })), import_react$15.createElement(Tooltip_default, {
			title: i$17(a ? "searchBox.stop" : "searchBox.send"),
			disabled: !S && !a
		}, import_react$15.createElement("div", {
			onClick: O,
			className: (0, import_classnames$5.default)("".concat(H$1, "-send"), a$19(a$19({}, "stop", !!a), "disable", j()))
		}))));
	};
	J = function(e) {
		return import_react$14.createElement("svg", W({
			width: 24,
			height: 24,
			viewBox: "0 0 24 24",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg"
		}, e), import_react$14.createElement("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M11.7447 4.74507C11.4201 4.69713 11.0879 4.67229 10.75 4.67229C7.02208 4.67229 4 7.69437 4 11.4223C4 15.1502 7.02208 18.1723 10.75 18.1723C12.0061 18.1723 13.182 17.8292 14.1893 17.2316L16.5792 19.6527C16.8702 19.9475 17.3451 19.9506 17.6399 19.6596C17.9347 19.3686 17.9377 18.8937 17.6467 18.5989L15.396 16.3189C16.3442 15.419 17.0312 14.2465 17.3317 12.927H15.7812C15.1343 15.0932 13.1265 16.6723 10.75 16.6723C7.85051 16.6723 5.5 14.3218 5.5 11.4223C5.5 8.57632 7.76453 6.25926 10.59 6.17469L11.7447 4.74507Z",
			fill: "#454D5A",
			style: X(X({ fill: "#454D5A" }, "fill", "color(display-p3 0.2706 0.3020 0.3529)"), "fillOpacity", 1)
		}), import_react$14.createElement("path", {
			d: "M15.5192 3.19775C15.5713 2.93409 15.9434 2.93409 15.9954 3.19775V3.19775C16.3799 5.14527 17.8827 6.66759 19.8052 7.0571V7.0571C20.0655 7.10983 20.0655 7.48678 19.8052 7.53952V7.53952C17.8827 7.92902 16.3799 9.45134 15.9954 11.3989V11.3989C15.9434 11.6625 15.5713 11.6625 15.5192 11.3989V11.3989C15.1347 9.45134 13.632 7.92902 11.7095 7.53952V7.53952C11.4492 7.48678 11.4492 7.10983 11.7095 7.0571V7.0571C13.632 6.66759 15.1347 5.14528 15.5192 3.19775V3.19775Z",
			fill: "#454D5A",
			style: X(X({ fill: "#454D5A" }, "fill", "color(display-p3 0.2706 0.3020 0.3529)"), "fillOpacity", 1)
		}));
	}, $ = "ai-component-pc-seach-box-desktop-search";
	e$11(".ai-component-pc-seach-box-desktop-search-wrapper {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  padding: 8px;\n  border: 1px solid var(--border-strong, rgba(0, 0, 0, 0.12));\n  border-radius: 8px;\n  box-shadow: var(--shadow-lv4, 0 5px 12px 4px rgba(0, 0, 0, 0.08), 0 24px 48px 2px rgba(0, 0, 0, 0.08));\n  backdrop-filter: blur(24px);\n  background-color: var(--bg-lv3-default, #fff);\n}\n.ai-component-pc-seach-box-desktop-search-loading {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.ai-component-pc-seach-box-desktop-search-input {\n  min-height: 100px;\n}\n.ai-component-pc-seach-box-desktop-search-history {\n  padding: 0 8px;\n}\n.ai-component-pc-seach-box-desktop-search-history-title {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  height: 28px;\n  font-size: 12px;\n  color: var(--text-medium, rgba(0, 0, 0, 0.48));\n}\n.ai-component-pc-seach-box-desktop-search-history-title-left {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  flex: 1;\n}\n.ai-component-pc-seach-box-desktop-search-history-title-right {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.ai-component-pc-seach-box-desktop-search-history-title-right > button {\n  border: none;\n  background: none;\n  padding: 0 8px;\n  font-size: 12px;\n  line-height: 28px;\n  color: var(--text-medium, rgba(0, 0, 0, 0.48));\n  cursor: pointer;\n}\n.ai-component-pc-seach-box-desktop-search-history-title-right > button:active {\n  background: var(--bg-lv1-medium, #f3f5f7);\n}\n.ai-component-pc-seach-box-desktop-search-history-title-right > button:hover {\n  background: var(--bg-lv1-weak, #f9fafb);\n}\n.ai-component-pc-seach-box-desktop-search-history-title-line {\n  width: 1px;\n  height: 12px;\n  background-color: var(--border-weak, rgba(0, 0, 0, 0.04));\n}\n.ai-component-pc-seach-box-desktop-search-history-item {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  height: 32px;\n  padding-right: 4px;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  font-size: 14px;\n  cursor: pointer;\n}\n.ai-component-pc-seach-box-desktop-search-history-item > svg {\n  width: 16px;\n  height: 16px;\n}\n.ai-component-pc-seach-box-desktop-search-history-item > svg path {\n  fill: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n}\n.ai-component-pc-seach-box-desktop-search-history-item > span {\n  flex: 1;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.desktop-search-dropdown-content .desktop-scrollbars-view {\n  contain: none;\n}\n");
	ee = function(e) {
		var a = t$9((0, import_react$15.useState)([]), 2), c = a[0], l = a[1], p = t$9((0, import_react$15.useState)(!1), 2), d = p[0], u = p[1], m = S$8.isSupportSpace(), f = u$11({
			limit: 10,
			offset: 0
		}), h = f.groups, x = void 0 === h ? [] : h, y = f.isFetching, D = a$22().deleteGroups;
		(0, import_react$15.useEffect)((function() {
			x.length > 0 && l(x.map((function(e) {
				return {
					id: e.id,
					title: e.title
				};
			})));
		}), [x]);
		return import_react$15.createElement("div", { className: "".concat($, "-wrapper") }, import_react$15.createElement(G, {
			onSend: function(n) {
				var t, o, r, a, i = n.searchParams, c = Q(Q({}, i), {}, {
					from: A$5.DESKTOP,
					position: t$12.AI_SEARCH_BOX
				});
				(localStorage.setItem("tdocs-ai_title_type", null !== (t = c.title) && void 0 !== t ? t : ""), ua.isElectronTencentDocsClient) && (c.title = null !== (r = null === (a = c.title) || void 0 === a ? void 0 : a.slice(0, 100)) && void 0 !== r ? r : "");
				_$7.desktopAISearch(null == i ? void 0 : i.range, i.title);
				var l = new URLSearchParams(c);
				null === (o = e.onSend) || void 0 === o || o.call(e), openUrl({ url: "".concat(f$10, "/search?").concat(l.toString()) });
			},
			focus: !0,
			className: "".concat($, "-input"),
			inputValue: e.inputValue,
			placeholder: i$17(m ? "searchBox.placeholder-space" : "searchBox.placeholder"),
			initRange: l$12.TDocs
		}), y ? import_react$15.createElement("div", { className: "".concat($, "-loading") }, import_react$15.createElement(Loading_default, {
			style: {
				width: 16,
				height: 16
			},
			visible: !0
		})) : c.length > 0 && import_react$15.createElement("div", { className: "".concat($, "-history") }, import_react$15.createElement("div", { className: "".concat($, "-history-title") }, import_react$15.createElement("span", { className: "".concat($, "-history-title-left") }, " ", i$17("searchBox.history"), " "), import_react$15.createElement("span", { className: "".concat($, "-history-title-right") }, c.length > 3 && import_react$15.createElement(import_react$15.Fragment, null, import_react$15.createElement("button", { onClick: function() {
			return u(!d);
		} }, i$17(d ? "searchBox.hideHistory" : "searchBox.showMore")), import_react$15.createElement("span", { className: "".concat($, "-history-title-line") })), import_react$15.createElement("button", { onClick: function() {
			D(), l([]);
		} }, i$17("searchBox.clearHistory")))), import_react$15.createElement("div", null, c.slice(0, d ? 10 : 3).map((function(e) {
			var n = e.id, t = e.title;
			return import_react$15.createElement("div", {
				className: "".concat($, "-history-item"),
				key: n,
				onClick: function() {
					return function(e) {
						var n = {
							from: A$5.DESKTOP,
							position: t$12.AI_SEARCH_BOX
						}, t = new URLSearchParams(n);
						openUrl({ url: "".concat("https://docs.qq.com/ai", "/search/").concat(e, "?").concat(t.toString()) });
					}(n);
				}
			}, import_react$15.createElement(J, { viewBox: "0 0 24 24" }), import_react$15.createElement("span", null, t));
		})))));
	};
	(function(e) {
		e.Button = "button", e.Select = "select";
	})(Y || (Y = {}));
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/dist/esm/pipeline-button/index.js
function l$4(n) {
	return l$4 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(n) {
		return typeof n;
	} : function(n) {
		return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
	}, l$4(n);
}
function c$3() {
	return c$3 = Object.assign ? Object.assign.bind() : function(n) {
		for (var t = 1; t < arguments.length; t++) {
			var e = arguments[t];
			for (var i in e) ({}).hasOwnProperty.call(e, i) && (n[i] = e[i]);
		}
		return n;
	}, c$3.apply(null, arguments);
}
function a$7(n, t, e) {
	return (t = function(n) {
		var t = function(n, t) {
			if ("object" != l$4(n) || !n) return n;
			var e = n[Symbol.toPrimitive];
			if (void 0 !== e) {
				var i = e.call(n, t || "default");
				if ("object" != l$4(i)) return i;
				throw new TypeError("@@toPrimitive must return a primitive value.");
			}
			return ("string" === t ? String : Number)(n);
		}(n, "string");
		return "symbol" == l$4(t) ? t : t + "";
	}(t)) in n ? Object.defineProperty(n, t, {
		value: e,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : n[t] = e, n;
}
function u$4(n) {
	return u$4 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(n) {
		return typeof n;
	} : function(n) {
		return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
	}, u$4(n);
}
function f$3() {
	return f$3 = Object.assign ? Object.assign.bind() : function(n) {
		for (var t = 1; t < arguments.length; t++) {
			var e = arguments[t];
			for (var i in e) ({}).hasOwnProperty.call(e, i) && (n[i] = e[i]);
		}
		return n;
	}, f$3.apply(null, arguments);
}
function m$4(n, t, e) {
	return (t = function(n) {
		var t = function(n, t) {
			if ("object" != u$4(n) || !n) return n;
			var e = n[Symbol.toPrimitive];
			if (void 0 !== e) {
				var i = e.call(n, t || "default");
				if ("object" != u$4(i)) return i;
				throw new TypeError("@@toPrimitive must return a primitive value.");
			}
			return ("string" === t ? String : Number)(n);
		}(n, "string");
		return "symbol" == u$4(t) ? t : t + "";
	}(t)) in n ? Object.defineProperty(n, t, {
		value: e,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : n[t] = e, n;
}
var import_react$12, import_react$13, import_classnames$4, p$4, s, C$1, b$1, d$3, y;
var init_pipeline_button = __esmMin((() => {
	init_toConsumableArray_d8de034d();
	import_react$12 = /* @__PURE__ */ __toESM(require_react());
	import_react$13 = /* @__PURE__ */ __toESM(require_react());
	init_index_4a868389();
	import_classnames$4 = /* @__PURE__ */ __toESM(require_classnames());
	init_style_inject_es_3984fa0f();
	p$4 = function(n) {
		return import_react$12.createElement("svg", c$3({
			width: 24,
			height: 24,
			viewBox: "0 0 24 24",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg"
		}, n), import_react$12.createElement("path", {
			d: "M19.4246 4.57599C20.8329 5.98427 20.3192 8.92901 18.3854 11.9999C20.3198 15.0712 20.8331 18.0168 19.4246 19.4252C18.0162 20.8336 15.0712 20.3196 12 18.3853C8.9288 20.3196 5.98378 20.8336 4.57538 19.4252C3.16694 18.0168 3.68024 15.0712 5.61463 11.9999C3.68075 8.92901 3.1671 5.98427 4.57538 4.57599C5.98369 3.16768 8.92902 3.68058 12 5.61455C15.071 3.68058 18.0163 3.16768 19.4246 4.57599ZM10.6493 17.4462C9.91023 16.8844 9.17471 16.2464 8.46447 15.5361C7.75398 14.8257 7.11564 14.09 6.55376 13.3506C6.17526 14.0118 5.87657 14.6518 5.66366 15.2516C5.0083 17.0986 5.30524 18.0338 5.63604 18.3646C5.96684 18.6954 6.90205 18.9923 8.74897 18.3369C9.34879 18.1241 9.98819 17.8246 10.6493 17.4462ZM14.4749 9.52574C13.6629 8.71372 12.8259 8.00986 12 7.42099C11.1741 8.00986 10.3371 8.71372 9.52513 9.52574C8.71337 10.3375 8.00983 11.1743 7.42107 11.9999C8.00996 12.8259 8.71307 13.6634 9.52513 14.4755C10.3369 15.2873 11.1743 15.9901 12 16.5788C12.8257 15.9901 13.6631 15.2873 14.4749 14.4755C15.2869 13.6634 15.99 12.8259 16.5789 11.9999C15.9902 11.1743 15.2866 10.3375 14.4749 9.52574ZM10.6493 6.55368C9.9884 6.1754 9.34861 5.87709 8.74897 5.66427C6.90205 5.00891 5.96684 5.30585 5.63604 5.63665C5.30524 5.96745 5.0083 6.90266 5.66366 8.74958C5.87645 9.34915 6.17554 9.9884 6.55376 10.6492C7.11548 9.91018 7.75426 9.17528 8.46447 8.46508C9.17492 7.75462 9.91 7.11554 10.6493 6.55368ZM17.4462 13.3506C16.8844 14.09 16.246 14.8257 15.5355 15.5361C14.8253 16.2464 14.0898 16.8844 13.3507 17.4462C14.0118 17.8246 14.6512 18.1241 15.251 18.3369C17.0979 18.9923 18.0332 18.6954 18.364 18.3646C18.6948 18.0338 18.9917 17.0986 18.3363 15.2516C18.1234 14.6518 17.8247 14.0118 17.4462 13.3506ZM13.4142 10.5864C14.1953 11.3674 14.1953 12.6338 13.4142 13.4148C12.6332 14.1959 11.3668 14.1959 10.5858 13.4148C9.80495 12.6338 9.80481 11.3674 10.5858 10.5864C11.3668 9.80542 12.6331 9.80556 13.4142 10.5864ZM18.364 5.63665C18.0332 5.30585 17.0979 5.00891 15.251 5.66427C14.6514 5.87709 14.0116 6.1754 13.3507 6.55368C14.09 7.11554 14.8251 7.75462 15.5355 8.46508C16.2457 9.17528 16.8845 9.91018 17.4462 10.6492C17.8245 9.9884 18.1235 9.34915 18.3363 8.74958C18.9917 6.90266 18.6948 5.96745 18.364 5.63665Z",
			fill: "#454D5A",
			style: a$7(a$7({ fill: "#454D5A" }, "fill", "color(display-p3 0.2706 0.3020 0.3529)"), "fillOpacity", 1)
		}));
	};
	C$1 = function(n) {
		return import_react$12.createElement("svg", f$3({
			width: 24,
			height: 24,
			viewBox: "0 0 24 24",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg"
		}, n), import_react$12.createElement("path", {
			d: "M12.0303 3.00195C16.9869 3.01827 21 7.04149 21 12.002C21 16.9725 16.9706 21.002 12 21.002C7.02944 21.002 3 16.9725 3 12.002C3 7.04181 7.01256 3.0188 11.9688 3.00195C11.9792 3.00177 11.9896 3.00098 12 3.00098C12.0101 3.00098 12.0202 3.00178 12.0303 3.00195ZM9.51562 12.751C9.5952 14.7625 9.98931 16.5123 10.542 17.7559C10.853 18.4556 11.1852 18.9288 11.4775 19.207C11.762 19.4777 11.9358 19.501 12 19.501C12.0642 19.501 12.238 19.4777 12.5225 19.207C12.8148 18.9288 13.147 18.4556 13.458 17.7559C14.0107 16.5123 14.4048 14.7625 14.4844 12.751H9.51562ZM4.53809 12.751C4.83047 15.6993 6.82974 18.1436 9.53418 19.085C8.68286 17.582 8.10884 15.3198 8.01465 12.751H4.53809ZM15.9854 12.751C15.8911 15.3201 15.3163 17.582 14.4648 19.085C17.1697 18.1438 19.1695 15.6996 19.4619 12.751H15.9854ZM14.4668 4.91895C15.3175 6.42187 15.8912 8.68322 15.9854 11.251H19.4619C19.1689 8.30387 17.1702 5.86036 14.4668 4.91895ZM11.9883 4.50195C11.9161 4.50506 11.7462 4.53934 11.4775 4.79492C11.1852 5.07311 10.853 5.54632 10.542 6.24609C9.98931 7.48963 9.5952 9.23941 9.51562 11.251H14.4844C14.4048 9.23941 14.0107 7.48963 13.458 6.24609C13.147 5.54632 12.8148 5.07311 12.5225 4.79492C12.2526 4.53818 12.0823 4.50479 12.0107 4.50195H11.9883ZM9.53223 4.91895C6.82926 5.86058 4.83109 8.30418 4.53809 11.251H8.01465C8.10879 8.68346 8.68162 6.42187 9.53223 4.91895Z",
			fill: "#454D5A",
			style: m$4(m$4({ fill: "#454D5A" }, "fill", "color(display-p3 0.2706 0.3020 0.3529)"), "fillOpacity", 1)
		}));
	};
	e$11(".ai-component-pc-pipeline-button {\n  display: flex;\n  gap: 8px;\n}\n.ai-component-pc-pipeline-button .ai-component-pc-pipeline-button-item {\n  display: flex;\n  height: 32px;\n  padding: 0 12px;\n  box-sizing: border-box;\n  justify-content: center;\n  align-items: center;\n  gap: 2px;\n  border-radius: 20px;\n  border: 1px solid var(--border-medium, rgba(0, 0, 0, 0.08));\n  cursor: pointer;\n}\n.ai-component-pc-pipeline-button .ai-component-pc-pipeline-button-item.checked {\n  border: 1px solid var(--tsp-fill-accent-strong, rgba(30, 111, 255, 0.08));\n  background: var(--feedback-accent, rgba(0, 115, 255, 0.08));\n}\n.ai-component-pc-pipeline-button .ai-component-pc-pipeline-button-item svg {\n  width: 20px;\n  height: 20px;\n}\n.ai-component-pc-pipeline-button .ai-component-pc-pipeline-button-item svg path {\n  fill: var(--text-ultrastrong, rgba(0, 0, 0, 0.08)) !important;\n}\n.ai-component-pc-pipeline-button .ai-component-pc-pipeline-button-item span {\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  text-align: center;\n  font-family: \"PingFang SC\";\n  font-size: 12px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 16px;\n}\n"), function(n) {
		n.THINKING = "thinking", n.NETWORK = "network";
	}(s || (s = {}));
	b$1 = "ai-component-pc-pipeline-button", d$3 = [{
		label: i$17("pipeline-button.thinking"),
		id: s.THINKING,
		icon: import_react$13.createElement(p$4, null)
	}, {
		label: i$17("pipeline-button.network"),
		id: s.NETWORK,
		icon: import_react$13.createElement(C$1, null)
	}], y = function(t) {
		var i = t.className, r = t.onClick, l = t.selected, c = void 0 === l ? [] : l, a = function(t, e) {
			r?.(e ? [].concat(e$5(c), [t]) : c.filter((function(n) {
				return n !== t;
			})));
		};
		return import_react$13.createElement("div", { className: (0, import_classnames$4.default)("".concat(b$1), i) }, d$3.map((function(n) {
			return import_react$13.createElement("div", {
				className: "".concat(b$1, "-item ").concat(c.includes(n.id) && "checked"),
				key: n.id,
				onClick: function() {
					a(n.id, !c.includes(n.id));
				}
			}, n.icon, import_react$13.createElement("span", null, n.label));
		})));
	};
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/dist/esm/chunks/index-05e873fa.js
function H(e) {
	return H = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
		return typeof e;
	} : function(e) {
		return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, H(e);
}
function V() {
	return V = Object.assign ? Object.assign.bind() : function(e) {
		for (var n = 1; n < arguments.length; n++) {
			var o = arguments[n];
			for (var r in o) ({}).hasOwnProperty.call(o, r) && (e[r] = o[r]);
		}
		return e;
	}, V.apply(null, arguments);
}
function M(e, n, o) {
	return (n = function(e) {
		var n = function(e, n) {
			if ("object" != H(e) || !e) return e;
			var o = e[Symbol.toPrimitive];
			if (void 0 !== o) {
				var r = o.call(e, n || "default");
				if ("object" != H(r)) return r;
				throw new TypeError("@@toPrimitive must return a primitive value.");
			}
			return ("string" === n ? String : Number)(e);
		}(e, "string");
		return "symbol" == H(n) ? n : n + "";
	}(n)) in e ? Object.defineProperty(e, n, {
		value: o,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[n] = o, e;
}
function A$1(e) {
	return A$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
		return typeof e;
	} : function(e) {
		return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, A$1(e);
}
function N() {
	return N = Object.assign ? Object.assign.bind() : function(e) {
		for (var n = 1; n < arguments.length; n++) {
			var o = arguments[n];
			for (var r in o) ({}).hasOwnProperty.call(o, r) && (e[r] = o[r]);
		}
		return e;
	}, N.apply(null, arguments);
}
function Z(e, n, o) {
	return (n = function(e) {
		var n = function(e, n) {
			if ("object" != A$1(e) || !e) return e;
			var o = e[Symbol.toPrimitive];
			if (void 0 !== o) {
				var r = o.call(e, n || "default");
				if ("object" != A$1(r)) return r;
				throw new TypeError("@@toPrimitive must return a primitive value.");
			}
			return ("string" === n ? String : Number)(e);
		}(e, "string");
		return "symbol" == A$1(n) ? n : n + "";
	}(n)) in e ? Object.defineProperty(e, n, {
		value: o,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[n] = o, e;
}
var import_react$10, import_react$11, E$2, L$1, S$3, _$1, R, D;
var init_index_05e873fa = __esmMin((() => {
	init_index_c23defda();
	init_esm$7();
	init_index_bc35b061();
	init_esm$1();
	import_react$10 = /* @__PURE__ */ __toESM(require_react());
	import_react$11 = /* @__PURE__ */ __toESM(require_react());
	init_index_4a868389();
	init_style_inject_es_3984fa0f();
	init_slicedToArray_e715395f();
	init_esm$3();
	init_extends_559f37d0();
	E$2 = "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M4 5H5.25V17.75H20V19H4V5ZM8.25 12V16H7V12H8.25ZM11.25 16V10H10V16H11.25ZM14.25 16H13V8H14.25V16ZM17.25 16V6H16V16H17.25Z' fill='%23464D5A' style='fill:%23464D5A%3bfill:color(display-p3 0.2745 0.3020 0.3529)%3bfill-opacity:1%3b'/%3e%3c/svg%3e";
	e$11(".ai-markdown-excel-chart-img-exchange-tooltip {\n  display: flex;\n  gap: 8px;\n  flex-direction: column;\n  padding: 8px;\n  width: 108px;\n  box-sizing: border-box;\n}\n.ai-markdown-excel-chart-img-exchange-tooltip-list {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n}\n.ai-markdown-excel-chart-img-exchange-tooltip-list-item {\n  height: 24px;\n  width: 24px;\n  border-radius: 2px;\n}\n.ai-markdown-excel-chart-img-exchange-tooltip-list-item:hover {\n  background: var(--feedback-hover, rgba(51, 77, 102, 0.06));\n}\n");
	L$1 = function(e) {
		var n = e.onSelect, o = [
			[
				{
					name: i$17("chart-type.column"),
					type: q$2.ClusteredColumn,
					icon: import_react$11.createElement("img", { src: E$2 })
				},
				{
					name: i$17("chart-type.line"),
					type: q$2.Line,
					icon: import_react$11.createElement("img", { src: "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M4 6H5.3V18H20V19.3H4V6ZM18.3837 7.49328L13.4482 11.332L10.9414 8.82517L7.375 11.4999L6.625 10.4999L11.0586 7.1747L13.5518 9.66786L17.6163 6.50659L18.3837 7.49328ZM14.0101 16.3217L18.4118 12.4703L17.5887 11.5295L13.9903 14.6781L11.1565 12.3166L6.84863 13.3936L7.1518 14.6062L10.8439 13.6832L14.0101 16.3217Z' fill='%23454D5A'/%3e%3c/svg%3e" })
				},
				{
					name: i$17("chart-type.clustered-bar"),
					type: q$2.ClusteredBar,
					icon: import_react$11.createElement("img", { src: "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M5.25 5H4V19H5.25V5ZM18 14.25L7 14.25V13L18 13V14.25ZM20 17.25L7 17.25V16L20 16V17.25ZM12 8.25L7 8.25V7L12 7V8.25ZM7 11.25L14 11.25V10L7 10V11.25Z' fill='%23464D5A' style='fill:%23464D5A%3bfill:color(display-p3 0.2745 0.3020 0.3529)%3bfill-opacity:1%3b'/%3e%3c/svg%3e" })
				}
			],
			[
				{
					name: i$17("chart-type.area"),
					type: q$2.Area,
					icon: import_react$11.createElement("img", { src: "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M7 6L14 10L17 6L20 8V19H4V9L7 6ZM14.3379 11.6328L17.2905 7.69599L18.75 8.66898V10.8664L14.899 14.7174L9.09541 11.332L5.25 12.2934V9.51777L7.20878 7.55899L14.3379 11.6328ZM5.25 13.5818V17.75H18.75V12.6341L15.1015 16.2827L8.90502 12.6681L5.25 13.5818Z' fill='%23454D5A'/%3e%3c/svg%3e" })
				},
				{
					name: i$17("chart-type.scatter"),
					type: q$2.Scatter,
					icon: import_react$11.createElement("img", { src: "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M5.3 6H4V19.3H20V18H5.3V6ZM8.5 10C9.32843 10 10 9.32843 10 8.5C10 7.67157 9.32843 7 8.5 7C7.67157 7 7 7.67157 7 8.5C7 9.32843 7.67157 10 8.5 10ZM14 12.5C14 13.3284 13.3284 14 12.5 14C11.6716 14 11 13.3284 11 12.5C11 11.6716 11.6716 11 12.5 11C13.3284 11 14 11.6716 14 12.5ZM8.5 17C9.32843 17 10 16.3284 10 15.5C10 14.6716 9.32843 14 8.5 14C7.67157 14 7 14.6716 7 15.5C7 16.3284 7.67157 17 8.5 17ZM19 9.5C19 10.3284 18.3284 11 17.5 11C16.6716 11 16 10.3284 16 9.5C16 8.67157 16.6716 8 17.5 8C18.3284 8 19 8.67157 19 9.5ZM16.5 16C17.3284 16 18 15.3284 18 14.5C18 13.6716 17.3284 13 16.5 13C15.6716 13 15 13.6716 15 14.5C15 15.3284 15.6716 16 16.5 16Z' fill='%23454D5A'/%3e%3c/svg%3e" })
				},
				{
					name: i$17("chart-type.pie"),
					type: q$2.Pie,
					icon: import_react$11.createElement("img", { src: "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M18.2191 12.625C17.9056 15.7833 15.2408 18.25 12 18.25C8.54822 18.25 5.75 15.4518 5.75 12C5.75 10.0557 6.63777 8.31884 8.03006 7.17255L11.665 12.625H18.2191ZM18.2191 11.375H12.334L9.06948 6.47821C9.94352 6.01338 10.941 5.75 12 5.75C15.2408 5.75 17.9056 8.21668 18.2191 11.375ZM19.5 12C19.5 16.1421 16.1421 19.5 12 19.5C7.85786 19.5 4.5 16.1421 4.5 12C4.5 7.85786 7.85786 4.5 12 4.5C16.1421 4.5 19.5 7.85786 19.5 12Z' fill='%23454D5A'/%3e%3c/svg%3e" })
				}
			],
			[{
				name: i$17("chart-type.doughnut"),
				type: q$2.Doughnut,
				icon: import_react$11.createElement("img", { src: "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M18.25 12C18.25 12.9793 18.0248 13.9059 17.6233 14.731L15.0119 13.2233C15.1654 12.8457 15.25 12.4327 15.25 12C15.25 10.4278 14.1337 9.11637 12.6504 8.81509V5.78343C15.7965 6.10873 18.25 8.76785 18.25 12ZM11.4004 8.8052C9.8919 9.08655 8.75 10.4099 8.75 12C8.75 13.7949 10.2051 15.25 12 15.25C12.9115 15.25 13.7353 14.8748 14.3255 14.2704L16.9663 15.7951C15.8241 17.2875 14.0245 18.25 12 18.25C8.54822 18.25 5.75 15.4518 5.75 12C5.75 8.75048 8.2299 6.08017 11.4004 5.77839V8.8052ZM19.5 12C19.5 16.1421 16.1421 19.5 12 19.5C7.85786 19.5 4.5 16.1421 4.5 12C4.5 7.85786 7.85786 4.5 12 4.5C16.1421 4.5 19.5 7.85786 19.5 12ZM14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z' fill='%23454D5A'/%3e%3c/svg%3e" })
			}]
		];
		return import_react$11.createElement("div", { className: "ai-markdown-excel-chart-img-exchange-tooltip" }, o.map((function(e) {
			return import_react$11.createElement("div", { className: "ai-markdown-excel-chart-img-exchange-tooltip-list" }, e.map((function(e) {
				return import_react$11.createElement(Tooltip_default, {
					title: e.name,
					placement: "bottom",
					overlayHoverable: !1,
					containerOffsetY: -4
				}, import_react$11.createElement("div", {
					key: e.type,
					className: "ai-markdown-excel-chart-img-exchange-tooltip-list-item",
					onClick: function() {
						return n(e.type);
					}
				}, e.icon));
			})));
		})));
	};
	S$3 = function(e) {
		return import_react$10.createElement("svg", V({
			width: 24,
			height: 24,
			viewBox: "0 0 24 24",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg"
		}, e), import_react$10.createElement("path", {
			d: "M19.1025 8.00488C19.6067 8.05621 20 8.48232 20 9V19L19.9951 19.1025C19.9472 19.573 19.573 19.9472 19.1025 19.9951L19 20H5L4.89746 19.9951C4.42703 19.9472 4.05278 19.573 4.00488 19.1025L4 19V9C4 8.48232 4.39333 8.05621 4.89746 8.00488L5 8H19L19.1025 8.00488ZM5.5 18.5H18.5V9.5H5.5V18.5ZM11.7764 10.9473C11.8685 10.763 12.1315 10.763 12.2236 10.9473L13.1299 12.7588C13.154 12.807 13.193 12.846 13.2412 12.8701L15.0527 13.7764C15.237 13.8685 15.237 14.1315 15.0527 14.2236L13.2412 15.1289C13.1929 15.1531 13.1541 15.1929 13.1299 15.2412L12.2236 17.0527C12.1315 17.237 11.8685 17.237 11.7764 17.0527L10.8711 15.2412C10.8469 15.1928 10.8072 15.1531 10.7588 15.1289L8.94727 14.2236C8.76301 14.1315 8.76303 13.8685 8.94727 13.7764L10.7588 12.8701C10.8071 12.8459 10.8469 12.8071 10.8711 12.7588L11.7764 10.9473ZM17.0576 4.00879C17.3612 4.04917 17.6323 4.22741 17.7891 4.49609L19.25 7H17.5137L16.6387 5.5H7.36133L6.48633 7H4.75L6.21094 4.49609C6.36774 4.22741 6.63882 4.04917 6.94238 4.00879L7.07422 4H16.9258L17.0576 4.00879Z",
			fill: "#454D5A",
			style: M(M({ fill: "#454D5A" }, "fill", "color(display-p3 0.2706 0.3020 0.3529)"), "fillOpacity", 1)
		}));
	};
	_$1 = function(e) {
		return import_react$10.createElement("svg", N({
			width: 24,
			height: 24,
			viewBox: "0 0 24 24",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg"
		}, e), import_react$10.createElement("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M5 4.5H18C18.2761 4.5 18.5 4.72386 18.5 5V19C18.5 19.2761 18.2761 19.5 18 19.5H5C4.72386 19.5 4.5 19.2761 4.5 19V5C4.5 4.72386 4.72386 4.5 5 4.5ZM3 5C3 3.89543 3.89543 3 5 3H18C19.1046 3 20 3.89543 20 5V19C20 20.1046 19.1046 21 18 21H5C3.89543 21 3 20.1046 3 19V5ZM7 12.751C7 13.1652 7.33579 13.501 7.75 13.501H15.2491C15.6633 13.501 15.9991 13.1652 15.9991 12.751C15.9991 12.3368 15.6633 12.001 15.2491 12.001H7.75C7.33579 12.001 7 12.3368 7 12.751ZM7 16.0024C7 15.5882 7.33579 15.2524 7.75 15.2524H15.2491C15.6633 15.2524 15.9991 15.5882 15.9991 16.0024C15.9991 16.4167 15.6633 16.7524 15.2491 16.7524H7.75C7.33579 16.7524 7 16.4167 7 16.0024Z",
			fill: "#454D5A",
			style: Z(Z({ fill: "#454D5A" }, "fill", "color(display-p3 0.2706 0.3020 0.3529)"), "fillOpacity", 1)
		}));
	};
	e$11(".ai-component-pc-reference-item {\n  display: inline-block;\n  width: 16px;\n  height: 16px;\n  border-radius: 50%;\n  text-align: center;\n  line-height: 16px;\n  background: var(--tsp-fill-weak, rgba(51, 77, 102, 0.06));\n  color: var(--text-666999, #666);\n  cursor: pointer;\n  font-size: 12px;\n  font-size: 10px;\n  font-weight: 500;\n  margin: 0 2px;\n  position: relative;\n  top: -2px;\n  transition: all 0.2s;\n}\n.ai-component-pc-reference-item:hover {\n  background-color: var(--feedback-active, rgba(6, 15, 26, 0.1));\n}\n.ai-component-pc-reference-popover {\n  display: flex;\n  width: 208px;\n  flex-direction: column;\n  align-items: flex-start;\n}\n.ai-component-pc-reference-popover-top {\n  display: flex;\n  gap: 4px;\n  align-items: center;\n  align-self: stretch;\n  margin-bottom: 4px;\n}\n.ai-component-pc-reference-popover-top img {\n  width: 20px;\n  height: 20px;\n}\n.ai-component-pc-reference-popover-title {\n  font-size: 14px;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  font-feature-settings: 'fina' on, 'init' on;\n  font-family: 'PingFang SC';\n  font-style: normal;\n  font-weight: 500;\n  line-height: 1.6;\n  flex: 1;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.ai-component-pc-reference-popover-save {\n  display: flex;\n  padding: 3px 8px 3px 6px;\n  justify-content: center;\n  align-items: center;\n  gap: 2px;\n  color: var(--text-strong, rgba(0, 0, 0, 0.64));\n  /* UI文字/附文_大 */\n  font-family: 'PingFang SC';\n  font-size: 12px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 16px;\n  cursor: pointer;\n}\n.ai-component-pc-reference-popover-save img {\n  filter: var(--icon-invert);\n}\n.ai-component-pc-reference-popover-content,\n.ai-component-pc-reference-popover-footer {\n  color: var(--text-strong, rgba(0, 0, 0, 0.64));\n  font-family: 'PingFang SC';\n  font-size: 12px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 1.6;\n}\n.ai-component-pc-reference-popover-content {\n  height: 36px;\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 2;\n  /* 显示两行 */\n  overflow: hidden;\n  text-overflow: ellipsis;\n  word-break: break-word;\n}\n.ai-component-pc-reference-popover-footer {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  align-self: stretch;\n  margin-top: 12px;\n}\n.ai-component-pc-reference-popover-footer-left {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  cursor: pointer;\n}\n.ai-component-pc-reference-popover-footer-left img {\n  width: 16px;\n  height: 16px;\n}\n.ai-component-pc-reference-popover-footer-right {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  align-self: stretch;\n  cursor: pointer;\n}\n.ai-component-pc-reference-popover-footer-right svg {\n  width: 16px;\n  height: 16px;\n  margin-left: 2px;\n}\n.ai-component-pc-reference-popover-footer-right svg path {\n  fill: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n}\n");
	R = a$19(a$19(a$19(a$19({}, s$6.LINK, i$17("referenceSources.link")), s$6.WECHAT, i$17("referenceSources.wechat")), s$6.DOCS, i$17("referenceSources.docs")), s$6.WENKU, i$17("referenceSources.wenku"));
	e$11(".ai-component-pc-reference-item {\n  display: inline-block;\n  width: 16px;\n  height: 16px;\n  border-radius: 50%;\n  text-align: center;\n  line-height: 16px;\n  background: var(--tsp-fill-weak, rgba(51, 77, 102, 0.06));\n  color: var(--text-666999, #666);\n  cursor: pointer;\n  font-size: 12px;\n  font-size: 10px;\n  font-weight: 500;\n  margin: 0 2px;\n  position: relative;\n  top: -2px;\n  transition: all 0.2s;\n}\n.ai-component-pc-reference-item:hover {\n  background-color: var(--feedback-active, rgba(6, 15, 26, 0.1));\n}\n.ai-component-pc-reference-popover {\n  display: flex;\n  width: 208px;\n  flex-direction: column;\n  align-items: flex-start;\n}\n.ai-component-pc-reference-popover-content {\n  color: var(--text-strong, rgba(0, 0, 0, 0.64));\n  font-family: 'PingFang SC';\n  font-size: 12px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 1.6;\n  height: 36px;\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 2;\n  /* 显示两行 */\n  overflow: hidden;\n  text-overflow: ellipsis;\n  word-break: break-word;\n}\n");
	e$11(".ai-table-preview {\n  width: calc(100vw - 96px);\n  height: calc(100vh - 40px);\n  max-width: 1080px;\n  min-width: 830px;\n  max-height: 680px;\n  min-height: 560px;\n  padding: 20px 0 0 0;\n  box-sizing: border-box;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n}\n.ai-table-preview.dui-modal .dui-modal-close {\n  top: 12px;\n}\n.ai-table-preview-title {\n  padding: 0 20px;\n}\n.ai-table-preview-container {\n  padding: 45px 97px;\n  border-top: 1px solid var(--border-medium, rgba(0, 0, 0, 0.08));\n  border-bottom: 1px solid var(--border-medium, rgba(0, 0, 0, 0.08));\n  height: calc(100% - 90px);\n  width: calc(100% - 194px);\n  box-sizing: content-box;\n  position: relative;\n}\n.ai-table-preview-content {\n  position: absolute;\n  height: calc(100% - 90px);\n  width: calc(100% - 194px);\n  display: flex;\n  justify-content: flex-start;\n  align-items: flex-start;\n  overflow: auto;\n}\n.ai-table-preview-content .ai-markdown-card {\n  margin: auto;\n}\n.ai-table-preview-content .markdown-card {\n  transition: transform 0.3s ease;\n}\n.ai-table-preview-content::-webkit-scrollbar {\n  display: none;\n}\n.ai-table-preview-footer {\n  height: 72px;\n  width: 100%;\n  display: flex;\n  padding: 0 24px;\n  justify-content: flex-end;\n  align-items: center;\n  box-sizing: border-box;\n  gap: 16px;\n}\n.ai-table-preview-footer button {\n  width: 92px;\n  height: 36px;\n  font-size: 14px;\n  font-weight: 600;\n}\n.ai-table-preview-copy-table.ai-table-preview-content {\n  position: absolute;\n  top: -10000px;\n  left: -10000px;\n}\n.ai-table-preview-copy-table.ai-table-preview-content .ai-markdown-card th {\n  background: none;\n}\n.ai-table-preview .dui-modal-content {\n  flex: 1;\n}\n");
	e$11("@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.ai-component-pc-markdown-renderer .ai-component-common-markdown-card {\n  word-break: break-word;\n  white-space: wrap;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  font-size: 16px;\n  line-height: 1.75;\n  font-weight: 400;\n}\n.ai-component-pc-markdown-renderer .ai-component-common-markdown-card-dot p,\n.ai-component-pc-markdown-renderer .ai-component-common-markdown-card-dot li,\n.ai-component-pc-markdown-renderer .ai-component-common-markdown-card-dot h1,\n.ai-component-pc-markdown-renderer .ai-component-common-markdown-card-dot h2,\n.ai-component-pc-markdown-renderer .ai-component-common-markdown-card-dot h3,\n.ai-component-pc-markdown-renderer .ai-component-common-markdown-card-dot h4,\n.ai-component-pc-markdown-renderer .ai-component-common-markdown-card-dot h5 {\n  animation: fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.ai-component-pc-markdown-renderer .ai-component-common-markdown-card > :first-child {\n  margin-top: 0;\n}\n.ai-component-pc-markdown-renderer .ai-component-common-markdown-card > :last-child {\n  margin-bottom: 0;\n}\n.ai-component-pc-markdown-renderer .ai-component-common-markdown-card h1 {\n  font-size: 22px;\n  line-height: 1.6;\n  margin: 16px 0;\n}\n.ai-component-pc-markdown-renderer .ai-component-common-markdown-card h2 {\n  font-size: 20px;\n  line-height: 1.6;\n  margin: 12px 0;\n}\n.ai-component-pc-markdown-renderer .ai-component-common-markdown-card h3 {\n  font-size: 18px;\n  line-height: 1.6;\n  margin: 8px 0;\n}\n.ai-component-pc-markdown-renderer .ai-component-common-markdown-card h4,\n.ai-component-pc-markdown-renderer .ai-component-common-markdown-card h5,\n.ai-component-pc-markdown-renderer .ai-component-common-markdown-card h6 {\n  font-size: 16px;\n  line-height: 1.75;\n  margin: 8px 0;\n}\n.ai-component-pc-markdown-renderer .ai-component-common-markdown-card p {\n  font-size: 16px;\n  line-height: 1.75;\n  margin: 8px 0;\n}\n.ai-component-pc-markdown-renderer .ai-component-common-markdown-card ol {\n  padding-left: 24px;\n  margin-block-start: 0;\n  margin-block-end: 0;\n}\n.ai-component-pc-markdown-renderer .ai-component-common-markdown-card ol > li {\n  margin: 8px 0;\n  margin-left: 8px;\n}\n.ai-component-pc-markdown-renderer .ai-component-common-markdown-card ol > li::marker {\n  font-weight: bold;\n}\n.ai-component-pc-markdown-renderer .ai-component-common-markdown-card ul {\n  list-style-position: outside;\n  padding-left: 24px;\n  margin-block-start: 0;\n  margin-block-end: 0;\n}\n.ai-component-pc-markdown-renderer .ai-component-common-markdown-card ul > li {\n  margin: 8px 0;\n  margin-left: 8px;\n  list-style-type: disc;\n}\n.ai-component-pc-markdown-renderer .ai-component-common-markdown-card hr {\n  margin: 20px 0;\n  height: 1px;\n  border: 0;\n  background: var(--border-strong, rgba(0, 0, 0, 0.12));\n}\n.ai-component-pc-markdown-renderer .ai-component-common-markdown-card pre {\n  margin: 12px 0;\n}\n.ai-component-pc-markdown-renderer .ai-component-common-markdown-card table {\n  min-width: 100%;\n  border-collapse: collapse;\n  border-spacing: 0;\n  border: 1px solid var(--border-strong, rgba(0, 0, 0, 0.12));\n  border-radius: 20px;\n  margin: 8px 0;\n  box-sizing: border-box;\n}\n.ai-component-pc-markdown-renderer .ai-component-common-markdown-card table tr td:not(:last-child),\n.ai-component-pc-markdown-renderer .ai-component-common-markdown-card table tr th:not(:last-child) {\n  border-right: 1px solid var(--border-strong, rgba(0, 0, 0, 0.12));\n  border-bottom: 1px solid var(--border-strong, rgba(0, 0, 0, 0.12));\n}\n.ai-component-pc-markdown-renderer .ai-component-common-markdown-card table tr td:last-child,\n.ai-component-pc-markdown-renderer .ai-component-common-markdown-card table tr th:last-child {\n  border-bottom: 1px solid var(--border-strong, rgba(0, 0, 0, 0.12));\n}\n.ai-component-pc-markdown-renderer .ai-component-common-markdown-card table tr:first-child th:first-child {\n  border-top-left-radius: 20px;\n}\n.ai-component-pc-markdown-renderer .ai-component-common-markdown-card table tr:first-child th:last-child {\n  border-top-right-radius: 20px;\n}\n.ai-component-pc-markdown-renderer .ai-component-common-markdown-card table tr:last-child td:first-child {\n  border-bottom-left-radius: 20px;\n}\n.ai-component-pc-markdown-renderer .ai-component-common-markdown-card table tr:last-child td:last-child {\n  border-bottom-right-radius: 20px;\n}\n.ai-component-pc-markdown-renderer .ai-component-common-markdown-card table tr:last-child td {\n  border-bottom: unset;\n}\n.ai-component-pc-markdown-renderer .ai-component-common-markdown-card th {\n  background: var(--bg-lv2-weak, #f3f5f7);\n  white-space: nowrap;\n}\n.ai-component-pc-markdown-renderer .ai-component-common-markdown-card th,\n.ai-component-pc-markdown-renderer .ai-component-common-markdown-card td {\n  padding: 10px;\n}\n.ai-component-pc-markdown-renderer .ai-component-common-markdown-card tr {\n  transition: background 0.3s ease;\n}\n.ai-component-pc-markdown-renderer .ai-component-common-markdown-card .markdown-excel-chart img,\n.ai-component-pc-markdown-renderer .ai-component-common-markdown-card > h1 > img,\n.ai-component-pc-markdown-renderer .ai-component-common-markdown-card > h2 > img,\n.ai-component-pc-markdown-renderer .ai-component-common-markdown-card > h3 > img,\n.ai-component-pc-markdown-renderer .ai-component-common-markdown-card > h4 > img,\n.ai-component-pc-markdown-renderer .ai-component-common-markdown-card > h5 > img,\n.ai-component-pc-markdown-renderer .ai-component-common-markdown-card > h6 > img,\n.ai-component-pc-markdown-renderer .ai-component-common-markdown-card > p > img {\n  width: 100%;\n  border-radius: 4px;\n}\n.ai-component-pc-markdown-renderer .ai-component-common-markdown-card strong {\n  font-weight: bold;\n}\n.__DARK__ .ai-component-pc-markdown-renderer .ai-component-common-markdown-card th {\n  background: #0a0805;\n  white-space: nowrap;\n}\n.__DARK__ .ai-component-pc-markdown-renderer .ai-component-common-markdown-card th,\n.__DARK__ .ai-component-pc-markdown-renderer .ai-component-common-markdown-card td {\n  border: 1px solid #efefef;\n  padding: 10px;\n}\n.__DARK__ .ai-component-pc-markdown-renderer .ai-component-common-markdown-card tr:nth-child(even) {\n  background: #0a0805;\n}\n");
	D = De$1({
		inlineComponents: a$19(a$19(a$19({}, X$2.MARKDOWN_SEARCH_REF, (function(e) {
			var r = e.text, t = e.references, a = e.handlers, c = r.split(","), l = S$8.isSupportSpace(), m = function(e, n) {
				var o;
				n.target.closest(".ai-component-pc-reference-popover-save") || null == a || null === (o = a.onReferenceOpen) || void 0 === o || o.call(a, e);
			}, d = G$2((null == t ? void 0 : t.items) || []).referencesWithSource, s = (null == t ? void 0 : t.citations) || [], f = (0, import_react$11.useCallback)((function(e, n) {
				var r = T$3(e.url, e.ext), t = r.icon, c = r.docTypeLabel, m = "";
				try {
					if (e.publishTime) m = new Intl.DateTimeFormat("zh-CN", {
						year: "numeric",
						month: "2-digit",
						day: "2-digit"
					}).format(/* @__PURE__ */ new Date(1e3 * Number(e.publishTime))).replace(/\//g, "-");
				} catch (e) {}
				var p = (null == e ? void 0 : e.abstract) || (null == n ? void 0 : n.content);
				return import_react$11.createElement(import_react$11.Fragment, null, p && import_react$11.createElement("div", { className: "ai-component-pc-reference-popover-content" }, p), (null == a ? void 0 : a.onReferenceOpen) && import_react$11.createElement("div", { className: "ai-component-pc-reference-popover-footer" }, import_react$11.createElement("div", {
					className: "ai-component-pc-reference-popover-footer-left",
					onClick: function() {
						var n;
						null == a || null === (n = a.onReferenceOpen) || void 0 === n || n.call(a, e);
					}
				}, [s$6.LINK, s$6.WECHAT].includes(e.source) ? import_react$11.createElement("img", {
					src: e.icon,
					alt: ""
				}) : import_react$11.createElement("img", {
					src: t,
					alt: ""
				}), import_react$11.createElement("span", null, [s$6.LINK, s$6.WECHAT].includes(e.source) ? R[e.source] : c)), (e.isSavable || l && e.source === s$6.DOCS) && null != a && a.onReferenceSave ? import_react$11.createElement("span", {
					className: "ai-component-pc-reference-popover-footer-right",
					onClick: function() {
						(function(e) {
							var n;
							null == a || null === (n = a.onReferenceSave) || void 0 === n || n.call(a, e, !0);
						})(e);
					}
				}, l ? import_react$11.createElement(S$3, { viewBox: "0 0 24 24" }) : import_react$11.createElement(_$1, { viewBox: "0 0 24 24" }), import_react$11.createElement("span", null, i$17(l ? "universalSearchActions.saveToSpace" : "universalSearchActions.saveAsDocument"))) : import_react$11.createElement("div", { className: "ai-component-pc-reference-popover-footer-right" }, m)));
			}), []);
			return import_react$11.createElement(import_react$11.Fragment, null, c.map((function(e) {
				var o = t$9(e.split("-"), 2), r = o[0], t = o[1], i = d[parseInt(r, 10) - 1];
				if (!i) return null;
				var c = s[parseInt(t, 10) - 1];
				return import_react$11.createElement(Tooltip_default, {
					onVisibleChange: function(e) {
						var n;
						e && i.isSavable && (null == a || null === (n = a.onReferenceSaveShow) || void 0 === n || n.call(a));
					},
					key: e,
					title: import_react$11.createElement("div", { className: "ai-component-pc-reference-popover" }, import_react$11.createElement("div", {
						className: "ai-component-pc-reference-popover-top",
						onClick: function(e) {
							return m(i, e);
						}
					}, import_react$11.createElement("span", { className: "ai-component-pc-reference-popover-title" }, i.title)), f(i, c)),
					overlayStyle: { padding: "12px 16px" },
					placement: "bottom",
					alignment: "start"
				}, import_react$11.createElement("div", {
					className: "ai-component-pc-reference-item",
					onClick: function(e) {
						return m(i, e);
					}
				}, import_react$11.createElement("span", null, r)));
			})));
		})), X$2.MARKDOWN_SEARCH_REF_TEXT, (function(e) {
			var n = e.text, o = e.handlers, r = e.originalText, t = n.split(","), a = function() {
				var e;
				null == o || null === (e = o.onReferenceTextOpen) || void 0 === e || e.call(o, r);
			};
			return import_react$11.createElement(import_react$11.Fragment, null, t.map((function(e) {
				return import_react$11.createElement(Tooltip_default, {
					key: e,
					title: import_react$11.createElement("div", { className: "ai-component-pc-reference-popover" }, import_react$11.createElement("div", { className: "ai-component-pc-reference-popover-content" }, r)),
					overlayStyle: { padding: "12px 16px" },
					placement: "bottom",
					alignment: "start"
				}, import_react$11.createElement("div", {
					className: "ai-component-pc-reference-item",
					onClick: a
				}, import_react$11.createElement("span", null, e)));
			})));
		})), X$2.MARKDOWN_SEARCH_REF_CITATIOIN, (function() {
			return null;
		})),
		blockComponents: a$19(a$19({}, j$4.MARKDOWN_LINK_CARD, (function() {
			return null;
		})), j$4.MARKDOWN_EXCEL_CHART_IMAGE_EXCHANGER, (function(e) {
			var n = e.handleChangeType, o = e.onExpandExcelChartImage;
			return import_react$11.createElement(import_react$11.Fragment, null, import_react$11.createElement("div", { className: "ai-markdown-excel-chart-img-exchange ai-markdown-excel-chart-img-action" }, import_react$11.createElement(Tooltip_default, {
				title: import_react$11.createElement(L$1, { onSelect: n }),
				alignment: "end",
				placement: "bottom",
				containerOffsetY: -8,
				overlayStyle: { padding: "0" }
			}, import_react$11.createElement("img", { src: E$2 }))), import_react$11.createElement("img", {
				src: "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M9.80889 13.3089L10.6916 14.1916L7.134 17.752L9.99163 17.7512V19H5V14.0049H6.24791L6.247 16.873L9.80889 13.3089ZM14.1911 10.6911L13.3084 9.80841L16.867 6.248L14.0084 6.24878V5H19V9.99512H17.7521L17.753 7.127L14.1911 10.6911Z' fill='%23454D5A'/%3e%3c/svg%3e",
				className: "ai-markdown-excel-chart-img-expand ai-markdown-excel-chart-img-action",
				onClick: o
			}));
		})),
		tableComponents: a$19({}, Q$1.MARKDOWN_TABLE_PREVIEW, (function(e) {
			var n = e.tableProps, o = e.visible, t = e.onHide, a = e.onConfirm, i = e.btnText, c = e.title, l = e.insertAble, m = (0, import_react$11.createRef)(), p = (0, import_react$11.createRef)(), w = t$9((0, import_react$11.useState)(1), 2), b = w[0], y = w[1];
			return (0, import_react$11.useEffect)((function() {
				if (o) {
					var e = function() {
						var e = m.current, n = p.current;
						if (e && n) {
							var o = e.offsetWidth, r = n.offsetWidth, t = e.offsetHeight, a = n.offsetHeight, i = Math.min(r / o, a / t);
							if (i < 1) return;
							y(i);
						}
					};
					e();
					var n = new ResizeObserver((function() {
						e();
					}));
					return p.current && n.observe(p.current), function() {
						n.disconnect();
					};
				}
			}), [
				p,
				m,
				o
			]), o ? import_react$11.createElement(Modal_default, {
				className: "ai-table-preview",
				title: import_react$11.createElement("div", { className: "ai-table-preview-title" }, c),
				visible: o,
				onCancel: t,
				footer: null,
				style: { padding: "24px 24px 0" }
			}, import_react$11.createElement("div", { className: "ai-table-preview-container" }, import_react$11.createElement("div", {
				ref: p,
				className: "ai-table-preview-content"
			}, import_react$11.createElement("div", {
				style: { transform: "scale(".concat(b, ")") },
				className: "ai-markdown-card"
			}, import_react$11.createElement("table", n)))), import_react$11.createElement("div", { className: "ai-table-preview-footer" }, import_react$11.createElement(a$23, {
				text: i$17("markdown.table.preview.footer-copy"),
				onClick: function() {
					var e, n;
					if (m.current) {
						var o = document.createRange();
						o.selectNode(m.current), null === (e = window.getSelection()) || void 0 === e || e.removeAllRanges(), null === (n = window.getSelection()) || void 0 === n || n.addRange(o), document.execCommand("copy"), Snackbar_default.show({
							message: i$17("message.copy-success"),
							type: "success"
						});
					}
				}
			}), l && import_react$11.createElement(a$23, {
				text: i || "",
				type: "primary",
				onClick: a
			})), import_react$11.createElement("div", { className: "ai-table-preview-copy-table ai-table-preview-content" }, import_react$11.createElement("div", { className: "ai-markdown-card" }, import_react$11.createElement("table", n$10({ ref: m }, n))))) : null;
		})),
		snackbar: Snackbar_default
	}, "ai-component-pc-markdown-renderer");
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/dist/esm/auth-card/index.js
function m$3(t, n) {
	var e = Object.keys(t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(t);
		n && (a = a.filter((function(n) {
			return Object.getOwnPropertyDescriptor(t, n).enumerable;
		}))), e.push.apply(e, a);
	}
	return e;
}
function p$3(n) {
	for (var e = 1; e < arguments.length; e++) {
		var a = null != arguments[e] ? arguments[e] : {};
		e % 2 ? m$3(Object(a), !0).forEach((function(e) {
			a$19(n, e, a[e]);
		})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(a)) : m$3(Object(a)).forEach((function(t) {
			Object.defineProperty(n, t, Object.getOwnPropertyDescriptor(a, t));
		}));
	}
	return n;
}
var import_react$9, import_classnames$3, h$1, u$2, g$1, f;
var init_auth_card = __esmMin((() => {
	init_index_c23defda();
	init_slicedToArray_e715395f();
	import_react$9 = /* @__PURE__ */ __toESM(require_react());
	init_index_4a868389();
	init_esm$3();
	init_esm$4();
	init_esm$1();
	import_classnames$3 = /* @__PURE__ */ __toESM(require_classnames());
	init_style_inject_es_3984fa0f();
	e$11(".ai-component-pc-auth-card {\n  display: flex;\n  padding: 24px 32px;\n  flex-direction: column;\n  border-radius: 16px;\n  border: 1px solid var(--border-strong, rgba(0, 0, 0, 0.12));\n  box-sizing: border-box;\n}\n.ai-component-pc-auth-card-title-main {\n  display: flex;\n  align-items: center;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  font-family: \"PingFang SC\";\n  font-size: 20px;\n  font-style: normal;\n  font-weight: 600;\n  line-height: 28px;\n}\n.ai-component-pc-auth-card-title-main img {\n  width: 28px;\n  height: 28px;\n  margin-right: 4px;\n}\n.ai-component-pc-auth-card-title-desc {\n  margin-top: 8px;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  font-family: \"PingFang SC\";\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 26px;\n}\n.ai-component-pc-auth-card-divider {\n  height: 1px;\n  background-color: var(--border-strong, rgba(0, 0, 0, 0.24));\n  margin: 20px 0;\n}\n.ai-component-pc-auth-card-content-checkbox {\n  margin-right: 8px;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  font-family: \"PingFang SC\";\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 600;\n  line-height: 20px;\n}\n.ai-component-pc-auth-card-content-checkbox .dui-checkbox-icon {\n  top: 3px;\n}\n.ai-component-pc-auth-card-content-checkbox .dui-checkbox-label {\n  line-height: 24px;\n}\n.ai-component-pc-auth-card-content-desc {\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  font-family: \"PingFang SC\";\n  font-size: 12px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 16px;\n  margin-left: 24px;\n  margin-bottom: 16px;\n}\n.ai-component-pc-auth-card-content-wrapper {\n  max-height: 190px;\n  overflow-y: auto;\n  display: flex;\n  flex-direction: column;\n  row-gap: 12px;\n  margin-top: 20px;\n}\n.ai-component-pc-auth-card-content-scope-desc {\n  margin-left: 24px;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  font-size: 12px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 16px;\n}\n.ai-component-pc-auth-card-content-list {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  margin-left: 24px;\n}\n.ai-component-pc-auth-card-content-list-item {\n  user-select: none;\n  cursor: pointer;\n  height: 20px;\n  display: flex;\n  align-items: center;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  font-family: \"PingFang SC\";\n  font-size: 12px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 16px;\n}\n.ai-component-pc-auth-card-content-list-item img {\n  width: 16px;\n  height: 16px;\n  margin-right: 4px;\n}\n.ai-component-pc-auth-card-content-list-item-not-checked {\n  opacity: 0.5 !important;\n}\n.ai-component-pc-auth-card-footer {\n  margin-bottom: 16px;\n}\n.ai-component-pc-auth-card-footer .dui-button {\n  font-family: \"PingFang SC\";\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 600;\n  line-height: 20px;\n}\n.ai-component-pc-auth-card-agree {\n  color: var(--text-strong, rgba(0, 0, 0, 0.64));\n  font-family: \"PingFang SC\";\n  font-size: 12px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 18px;\n}\n.ai-component-pc-auth-card-agree > div {\n  display: inline-block;\n}\n.ai-component-pc-auth-card-agree .dui-checkbox-icon {\n  top: 0;\n}\n.ai-component-pc-auth-card-agree * {\n  font-size: 12px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 16px;\n}\n.ai-component-pc-auth-card-agree-link {\n  font-family: \"PingFang SC\";\n  color: var(--text-strong, rgba(0, 0, 0, 0.64));\n  font-weight: 600;\n  cursor: pointer;\n  text-decoration: underline;\n  padding: 0 4px;\n}\n");
	h$1 = "ai-component-pc", u$2 = [
		{
			id: "smartsheet",
			label: i$17("authCard.list-item.smartsheet")
		},
		{
			id: "smartCanvas",
			label: i$17("authCard.list-item.smartCanvas")
		},
		{
			id: "sheet",
			label: i$17("authCard.list-item.sheet")
		},
		{
			id: "slide",
			label: i$17("authCard.list-item.slide")
		},
		{
			id: "doc",
			label: i$17("authCard.list-item.doc")
		},
		{
			id: "form",
			label: i$17("authCard.list-item.form")
		},
		{
			id: "mindMap",
			label: i$17("authCard.list-item.mindMap")
		},
		{
			id: "pdf",
			label: i$17("authCard.list-item.pdf")
		},
		{
			id: "voiceNotes",
			label: i$17("authCard.list-item.voiceNotes")
		}
	], g$1 = [
		{
			id: "local-doc",
			label: i$17("authCard.list-item.local-doc")
		},
		{
			id: "local-sheet",
			label: i$17("authCard.list-item.local-sheet")
		},
		{
			id: "local-slide",
			label: i$17("authCard.list-item.local-slide")
		},
		{
			id: "local-pdf",
			label: i$17("authCard.list-item.local-pdf")
		}
	], f = function(s) {
		var m = s.onAgree, x = t$9((0, import_react$9.useState)(!1), 2), b = x[0], v = x[1], C = t$9((0, import_react$9.useState)({
			doc: !0,
			sheet: !0,
			slide: !0,
			smartCanvas: !0,
			mindMap: !0,
			pdf: !0,
			form: !0,
			smartSheet: !0
		}), 2), w = C[0], k = C[1], E = Object.values(w).every(Boolean), j = function(t) {
			openUrl({ url: t });
		};
		return import_react$9.createElement("div", { className: "".concat(h$1, "-auth-card") }, import_react$9.createElement("div", { className: "".concat(h$1, "-auth-card-title") }, import_react$9.createElement("div", { className: "".concat(h$1, "-auth-card-title-main") }, import_react$9.createElement("span", null, i$17("authCard.title"))), import_react$9.createElement("div", { className: "".concat(h$1, "-auth-card-title-desc") }, i$17("authCard.title-desc"), " ", h$6() ? "" : i$17("authCard.content-title-desc"))), import_react$9.createElement("div", { className: "".concat(h$1, "-auth-card-divider") }), import_react$9.createElement("div", { className: "".concat(h$1, "-auth-card-content") }, import_react$9.createElement(Checkbox_default, {
			shape: "circle",
			className: "".concat(h$1, "-auth-card-content-checkbox"),
			iconStyle: {
				width: 18,
				height: 18
			},
			checked: E,
			onChange: function(t) {
				k(t ? {
					doc: !0,
					sheet: !0,
					slide: !0,
					smartCanvas: !0,
					mindMap: !0,
					pdf: !0,
					form: !0,
					smartSheet: !0
				} : {
					doc: !1,
					sheet: !1,
					slide: !1,
					smartCanvas: !1,
					mindMap: !1,
					pdf: !1,
					form: !0,
					smartSheet: !0
				});
			}
		}, h$6() ? i$17("authCard.content-title-local") : i$17("authCard.content-title")), import_react$9.createElement("div", { className: "".concat(h$1, "-auth-card-content-wrapper") }, import_react$9.createElement("div", { className: "".concat(h$1, "-auth-card-content-list") }, (h$6() ? g$1 : u$2).map((function(n, a) {
			return import_react$9.createElement("div", {
				className: (0, import_classnames$3.default)("".concat(h$1, "-auth-card-content-list-item"), a$19({}, "".concat(h$1, "-auth-card-content-list-item-not-checked"), !w[n.id])),
				key: a,
				onClick: function() {
					e = n.id, k(p$3(p$3({}, w), {}, a$19({}, e, !w[e])));
					return;
					var e;
				}
			}, import_react$9.createElement("img", { src: "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M20.0304 7.53039L10.5001 17.0607L4.96973 11.5304L6.03039 10.4697L10.5001 14.9394L18.9697 6.46973L20.0304 7.53039Z' fill='%23454D5A'/%3e%3c/svg%3e" }), n.label);
		}))), import_react$9.createElement("div", { className: "".concat(h$1, "-auth-card-content-scope-desc") }, i$17("authCard.scope-desc")))), import_react$9.createElement("div", { className: "".concat(h$1, "-auth-card-divider") }), import_react$9.createElement("div", { className: "".concat(h$1, "-auth-card-footer") }, import_react$9.createElement(Button_default, {
			type: "primary",
			style: {
				width: 200,
				borderRadius: 12
			},
			onClick: function() {
				E && b && m?.();
			},
			disabled: !E || !b
		}, i$17("authCard.agree-button"))), import_react$9.createElement("div", { className: "".concat(h$1, "-auth-card-agree") }, import_react$9.createElement(Checkbox_default, {
			shape: "circle",
			checked: b,
			onChange: function(t) {
				v(t);
			}
		}, i$17("authCard.agree-desc")), import_react$9.createElement("span", {
			className: "".concat(h$1, "-auth-card-agree-link"),
			onMouseDown: function() {
				return j("https://docs.qq.com/doc/DZHVMdVRPS0lQeWRD?pub=1&dver=2.1.0");
			}
		}, i$17("authCard.serviceAgreement")), import_react$9.createElement("span", null, i$17("authCard.and")), import_react$9.createElement("span", {
			className: "".concat(h$1, "-auth-card-agree-link"),
			onMouseDown: function() {
				return j("https://docs.qq.com/doc/p/30cb57a3280b16bd48fb49001022ada97479339a");
			}
		}, i$17("authCard.privacyAgreement"))));
	};
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/dist/esm/feedback/index.js
var import_react$8, u$1, l$1;
var init_feedback = __esmMin((() => {
	init_index_e54e83c4();
	import_react$8 = /* @__PURE__ */ __toESM(require_react());
	init_index_4a868389();
	init_esm$6();
	init_esm$7();
	init_esm$1();
	u$1 = function(i) {
		var u = i.inputId, l = i.outputId, m = i.category, d = i.close, p = i.callback, f = u$12(), k = f.feedback, b = f.evaluateList, v = f.setFeedback, x = f.setEvaluateList, g = u$13().feedbackRequest, h = function() {
			var a = e$8(f$8.mark((function e() {
				return f$8.wrap((function(e) {
					for (;;) switch (e.prev = e.next) {
						case 0: return e.next = 2, g({
							evaluate: b,
							inputId: u,
							outputId: l,
							category: m,
							additionalComments: k
						});
						case 2: p(), d();
						case 4:
						case "end": return e.stop();
					}
				}), e);
			})));
			return function() {
				return a.apply(this, arguments);
			};
		}();
		return import_react$8.createElement(import_react$8.Fragment, null, import_react$8.createElement(d$7, {
			setFeedback: v,
			setEvaluateList: x,
			feedback: k,
			evaluateList: b
		}), import_react$8.createElement("div", { className: "ai-pc-feedback-footer" }, import_react$8.createElement(Button_default, {
			disabled: !(k || b.length > 1),
			className: "ai-pc-feedback-footer-button",
			onClick: h
		}, i$17("feedback.button-text.submit"))));
	}, l$1 = function(e, t, c, o, r) {
		var s = Modal_default.confirm({
			cancelText: null,
			title: i$17("feedback.group-title.feedback-title"),
			style: {
				width: 500,
				padding: "17px 24px 24px"
			},
			className: "ai-pc-feedback-modal",
			maskClosable: !0,
			content: import_react$8.createElement(u$1, {
				inputId: e,
				outputId: t,
				category: c,
				actionType: r,
				close: function() {
					return s();
				},
				callback: o
			})
		}).close;
	};
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/dist/esm/chunks/application-vnd.tdocs-apps.slide-0224ba95.js
function o$3() {
	return o$3 = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var r = arguments[t];
			for (var l in r) ({}).hasOwnProperty.call(r, l) && (e[l] = r[l]);
		}
		return e;
	}, o$3.apply(null, arguments);
}
function h() {
	return h = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var r = arguments[t];
			for (var l in r) ({}).hasOwnProperty.call(r, l) && (e[l] = r[l]);
		}
		return e;
	}, h.apply(null, arguments);
}
function F$1() {
	return F$1 = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var r = arguments[t];
			for (var l in r) ({}).hasOwnProperty.call(r, l) && (e[l] = r[l]);
		}
		return e;
	}, F$1.apply(null, arguments);
}
var import_react$7, t$2, r$2, l$3, i$3, a$4, n$3, c$2, d$1, f$2, s$2, p$2, u, m$2, _, x, g, E$1, C, y$1, B, v, w, S$2;
var init_application_vnd_tdocs_apps_slide_0224ba95 = __esmMin((() => {
	import_react$7 = /* @__PURE__ */ __toESM(require_react());
	m$2 = function(n) {
		return import_react$7.createElement("svg", o$3({
			width: 24,
			height: 24,
			viewBox: "0 0 24 24",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg"
		}, n), t$2 || (t$2 = import_react$7.createElement("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M6.6875 8.3875C6.6875 7.79379 7.16267 7.3125 7.74882 7.3125H19.6887C20.2748 7.3125 20.75 7.79379 20.75 8.3875V19.675C20.75 20.2687 20.2748 20.75 19.6887 20.75H7.74882C7.16267 20.75 6.6875 20.2687 6.6875 19.675V8.3875Z",
			fill: "url(#paint0_linear_2519_51698)"
		})), r$2 || (r$2 = import_react$7.createElement("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M4.8125 3.25C4.12214 3.25 3.5625 3.80964 3.5625 4.5V19.5C3.5625 20.1904 4.12214 20.75 4.8125 20.75H18.5625H19.6562H19.8125V20.7389C19.7615 20.7462 19.7093 20.75 19.6562 20.75C19.0522 20.75 18.5625 20.2603 18.5625 19.6562C18.5625 19.6032 18.5663 19.551 18.5736 19.5H18.5625V4.5C18.5625 3.80964 18.0029 3.25 17.3125 3.25H4.8125Z",
			fill: "url(#paint1_linear_2519_51698)"
		})), l$3 || (l$3 = import_react$7.createElement("g", { filter: "url(#filter0_d_2519_51698)" }, import_react$7.createElement("rect", {
			x: 6.6875,
			y: 15.9062,
			width: 8.74998,
			height: 1.71875,
			fill: "#B3D9FF"
		}))), i$3 || (i$3 = import_react$7.createElement("g", { filter: "url(#filter1_d_2519_51698)" }, import_react$7.createElement("rect", {
			x: 6.68762,
			y: 12.9375,
			width: 8.74998,
			height: 1.71875,
			fill: "#D3F3FF"
		}))), a$4 || (a$4 = import_react$7.createElement("defs", null, import_react$7.createElement("filter", {
			id: "filter0_d_2519_51698",
			x: 6.42083,
			y: 15.3729,
			width: 10.35,
			height: 3.31875,
			filterUnits: "userSpaceOnUse",
			colorInterpolationFilters: "sRGB"
		}, import_react$7.createElement("feFlood", {
			floodOpacity: 0,
			result: "BackgroundImageFix"
		}), import_react$7.createElement("feColorMatrix", {
			in: "SourceAlpha",
			type: "matrix",
			values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
			result: "hardAlpha"
		}), import_react$7.createElement("feOffset", {
			dx: .533333,
			dy: .266667
		}), import_react$7.createElement("feGaussianBlur", { stdDeviation: .4 }), import_react$7.createElement("feColorMatrix", {
			type: "matrix",
			values: "0 0 0 0 0.0901961 0 0 0 0 0.360784 0 0 0 0 0.921569 0 0 0 0.8 0"
		}), import_react$7.createElement("feBlend", {
			mode: "normal",
			in2: "BackgroundImageFix",
			result: "effect1_dropShadow_2519_51698"
		}), import_react$7.createElement("feBlend", {
			mode: "normal",
			in: "SourceGraphic",
			in2: "effect1_dropShadow_2519_51698",
			result: "shape"
		})), import_react$7.createElement("filter", {
			id: "filter1_d_2519_51698",
			x: 6.42096,
			y: 12.4042,
			width: 10.35,
			height: 3.31875,
			filterUnits: "userSpaceOnUse",
			colorInterpolationFilters: "sRGB"
		}, import_react$7.createElement("feFlood", {
			floodOpacity: 0,
			result: "BackgroundImageFix"
		}), import_react$7.createElement("feColorMatrix", {
			in: "SourceAlpha",
			type: "matrix",
			values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
			result: "hardAlpha"
		}), import_react$7.createElement("feOffset", {
			dx: .533333,
			dy: .266667
		}), import_react$7.createElement("feGaussianBlur", { stdDeviation: .4 }), import_react$7.createElement("feColorMatrix", {
			type: "matrix",
			values: "0 0 0 0 0.0901961 0 0 0 0 0.360784 0 0 0 0 0.921569 0 0 0 0.8 0"
		}), import_react$7.createElement("feBlend", {
			mode: "normal",
			in2: "BackgroundImageFix",
			result: "effect1_dropShadow_2519_51698"
		}), import_react$7.createElement("feBlend", {
			mode: "normal",
			in: "SourceGraphic",
			in2: "effect1_dropShadow_2519_51698",
			result: "shape"
		})), import_react$7.createElement("linearGradient", {
			id: "paint0_linear_2519_51698",
			x1: 20.75,
			y1: 10.214,
			x2: 18.4467,
			y2: 10.214,
			gradientUnits: "userSpaceOnUse"
		}, import_react$7.createElement("stop", { stopColor: "#1E6FFF" }), import_react$7.createElement("stop", {
			offset: 1,
			stopColor: "#144DEB"
		})), import_react$7.createElement("linearGradient", {
			id: "paint1_linear_2519_51698",
			x1: 19.1464,
			y1: -2.44868,
			x2: 1.21081,
			y2: 19.2317,
			gradientUnits: "userSpaceOnUse"
		}, import_react$7.createElement("stop", { stopColor: "#34A4FF" }), import_react$7.createElement("stop", {
			offset: .999235,
			stopColor: "#1E6FFF"
		})))));
	}, _ = "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M6.6875 8.3875C6.6875 7.79379 7.16267 7.3125 7.74882 7.3125H19.6887C20.2748 7.3125 20.75 7.79379 20.75 8.3875V19.675C20.75 20.2687 20.2748 20.75 19.6887 20.75H7.74882C7.16267 20.75 6.6875 20.2687 6.6875 19.675V8.3875Z' fill='url(%23paint0_linear_2519_51698)'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M4.8125 3.25C4.12214 3.25 3.5625 3.80964 3.5625 4.5V19.5C3.5625 20.1904 4.12214 20.75 4.8125 20.75H18.5625H19.6562H19.8125V20.7389C19.7615 20.7462 19.7093 20.75 19.6562 20.75C19.0522 20.75 18.5625 20.2603 18.5625 19.6562C18.5625 19.6032 18.5663 19.551 18.5736 19.5H18.5625V4.5C18.5625 3.80964 18.0029 3.25 17.3125 3.25H4.8125Z' fill='url(%23paint1_linear_2519_51698)'/%3e%3cg filter='url(%23filter0_d_2519_51698)'%3e%3crect x='6.6875' y='15.9062' width='8.74998' height='1.71875' fill='%23B3D9FF'/%3e%3c/g%3e%3cg filter='url(%23filter1_d_2519_51698)'%3e%3crect x='6.68762' y='12.9375' width='8.74998' height='1.71875' fill='%23D3F3FF'/%3e%3c/g%3e%3cdefs%3e%3cfilter id='filter0_d_2519_51698' x='6.42083' y='15.3729' width='10.35' height='3.31875' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3e%3cfeFlood flood-opacity='0' result='BackgroundImageFix'/%3e%3cfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3e%3cfeOffset dx='0.533333' dy='0.266667'/%3e%3cfeGaussianBlur stdDeviation='0.4'/%3e%3cfeColorMatrix type='matrix' values='0 0 0 0 0.0901961 0 0 0 0 0.360784 0 0 0 0 0.921569 0 0 0 0.8 0'/%3e%3cfeBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_2519_51698'/%3e%3cfeBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_2519_51698' result='shape'/%3e%3c/filter%3e%3cfilter id='filter1_d_2519_51698' x='6.42096' y='12.4042' width='10.35' height='3.31875' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3e%3cfeFlood flood-opacity='0' result='BackgroundImageFix'/%3e%3cfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3e%3cfeOffset dx='0.533333' dy='0.266667'/%3e%3cfeGaussianBlur stdDeviation='0.4'/%3e%3cfeColorMatrix type='matrix' values='0 0 0 0 0.0901961 0 0 0 0 0.360784 0 0 0 0 0.921569 0 0 0 0.8 0'/%3e%3cfeBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_2519_51698'/%3e%3cfeBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_2519_51698' result='shape'/%3e%3c/filter%3e%3clinearGradient id='paint0_linear_2519_51698' x1='20.75' y1='10.214' x2='18.4467' y2='10.214' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='%231E6FFF'/%3e%3cstop offset='1' stop-color='%23144DEB'/%3e%3c/linearGradient%3e%3clinearGradient id='paint1_linear_2519_51698' x1='19.1464' y1='-2.44868' x2='1.21081' y2='19.2317' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='%2334A4FF'/%3e%3cstop offset='0.999235' stop-color='%231E6FFF'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e";
	B = function(t) {
		return import_react$7.createElement("svg", h({
			width: 24,
			height: 24,
			viewBox: "0 0 24 24",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg"
		}, t), n$3 || (n$3 = import_react$7.createElement("g", { filter: "url(#filter0_i_2519_51653)" }, import_react$7.createElement("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M6.6875 8.3875C6.6875 7.79379 7.16267 7.3125 7.74882 7.3125H19.6887C20.2748 7.3125 20.75 7.79379 20.75 8.3875V19.675C20.75 20.2687 20.2748 20.75 19.6887 20.75H7.74882C7.16267 20.75 6.6875 20.2687 6.6875 19.675V8.3875Z",
			fill: "url(#paint0_linear_2519_51653)"
		}))), c$2 || (c$2 = import_react$7.createElement("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M4.8125 3.25C4.12214 3.25 3.5625 3.80964 3.5625 4.5V19.5C3.5625 20.1904 4.12214 20.75 4.8125 20.75H18.5625H19.6562H19.8125V20.7389C19.7615 20.7462 19.7093 20.75 19.6562 20.75C19.0522 20.75 18.5625 20.2603 18.5625 19.6562C18.5625 19.6032 18.5663 19.551 18.5736 19.5H18.5625V4.5C18.5625 3.80964 18.0029 3.25 17.3125 3.25H4.8125Z",
			fill: "url(#paint1_linear_2519_51653)"
		})), d$1 || (d$1 = import_react$7.createElement("g", { filter: "url(#filter1_d_2519_51653)" }, import_react$7.createElement("path", {
			d: "M14.3438 10.5936V11.8556H11.3367C10.1814 11.8556 9.2449 12.7597 9.2449 13.8749C9.2449 14.9768 10.1593 15.8726 11.2956 15.8937L11.3367 15.8941H14.3438V17.1561H11.3367C9.45939 17.1561 7.9375 15.6871 7.9375 13.8749C7.9375 12.0808 9.4291 10.623 11.2805 10.5941L11.3367 10.5936H14.3438Z",
			fill: "#E5D7FF"
		}))), f$2 || (f$2 = import_react$7.createElement("g", { filter: "url(#filter2_d_2519_51653)" }, import_react$7.createElement("rect", {
			x: 6.6875,
			y: 12.1561,
			width: 3.4375,
			height: 3.4375,
			rx: 1.71875,
			fill: "white"
		}))), s$2 || (s$2 = import_react$7.createElement("g", { filter: "url(#filter3_d_2519_51653)" }, import_react$7.createElement("ellipse", {
			cx: 14.3438,
			cy: 11.2186,
			rx: 1.09375,
			ry: 1.09375,
			fill: "white"
		}))), p$2 || (p$2 = import_react$7.createElement("g", { filter: "url(#filter4_d_2519_51653)" }, import_react$7.createElement("circle", {
			cx: 14.3438,
			cy: 16.5311,
			r: 1.09375,
			fill: "white"
		}))), u || (u = import_react$7.createElement("defs", null, import_react$7.createElement("filter", {
			id: "filter0_i_2519_51653",
			x: 6.6875,
			y: 7.3125,
			width: 14.7292,
			height: 13.4375,
			filterUnits: "userSpaceOnUse",
			colorInterpolationFilters: "sRGB"
		}, import_react$7.createElement("feFlood", {
			floodOpacity: 0,
			result: "BackgroundImageFix"
		}), import_react$7.createElement("feBlend", {
			mode: "normal",
			in: "SourceGraphic",
			in2: "BackgroundImageFix",
			result: "shape"
		}), import_react$7.createElement("feColorMatrix", {
			in: "SourceAlpha",
			type: "matrix",
			values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
			result: "hardAlpha"
		}), import_react$7.createElement("feOffset", { dx: .666667 }), import_react$7.createElement("feGaussianBlur", { stdDeviation: .333333 }), import_react$7.createElement("feComposite", {
			in2: "hardAlpha",
			operator: "arithmetic",
			k2: -1,
			k3: 1
		}), import_react$7.createElement("feColorMatrix", {
			type: "matrix",
			values: "0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.24 0"
		}), import_react$7.createElement("feBlend", {
			mode: "normal",
			in2: "shape",
			result: "effect1_innerShadow_2519_51653"
		})), import_react$7.createElement("filter", {
			id: "filter1_d_2519_51653",
			x: 7.71528,
			y: 10.1492,
			width: 7.73958,
			height: 7.89583,
			filterUnits: "userSpaceOnUse",
			colorInterpolationFilters: "sRGB"
		}, import_react$7.createElement("feFlood", {
			floodOpacity: 0,
			result: "BackgroundImageFix"
		}), import_react$7.createElement("feColorMatrix", {
			in: "SourceAlpha",
			type: "matrix",
			values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
			result: "hardAlpha"
		}), import_react$7.createElement("feOffset", {
			dx: .444444,
			dy: .222222
		}), import_react$7.createElement("feGaussianBlur", { stdDeviation: .333333 }), import_react$7.createElement("feColorMatrix", {
			type: "matrix",
			values: "0 0 0 0 0.537255 0 0 0 0 0.329412 0 0 0 0 0.729412 0 0 0 0.68 0"
		}), import_react$7.createElement("feBlend", {
			mode: "normal",
			in2: "BackgroundImageFix",
			result: "effect1_dropShadow_2519_51653"
		}), import_react$7.createElement("feBlend", {
			mode: "normal",
			in: "SourceGraphic",
			in2: "effect1_dropShadow_2519_51653",
			result: "shape"
		})), import_react$7.createElement("filter", {
			id: "filter2_d_2519_51653",
			x: 6.6875,
			y: 12.1561,
			width: 4.77083,
			height: 4.77083,
			filterUnits: "userSpaceOnUse",
			colorInterpolationFilters: "sRGB"
		}, import_react$7.createElement("feFlood", {
			floodOpacity: 0,
			result: "BackgroundImageFix"
		}), import_react$7.createElement("feColorMatrix", {
			in: "SourceAlpha",
			type: "matrix",
			values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
			result: "hardAlpha"
		}), import_react$7.createElement("feOffset", {
			dx: .666667,
			dy: .666667
		}), import_react$7.createElement("feGaussianBlur", { stdDeviation: .333333 }), import_react$7.createElement("feColorMatrix", {
			type: "matrix",
			values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12276 0"
		}), import_react$7.createElement("feBlend", {
			mode: "normal",
			in2: "BackgroundImageFix",
			result: "effect1_dropShadow_2519_51653"
		}), import_react$7.createElement("feBlend", {
			mode: "normal",
			in: "SourceGraphic",
			in2: "effect1_dropShadow_2519_51653",
			result: "shape"
		})), import_react$7.createElement("filter", {
			id: "filter3_d_2519_51653",
			x: 13.0278,
			y: 9.68043,
			width: 3.52083,
			height: 3.52083,
			filterUnits: "userSpaceOnUse",
			colorInterpolationFilters: "sRGB"
		}, import_react$7.createElement("feFlood", {
			floodOpacity: 0,
			result: "BackgroundImageFix"
		}), import_react$7.createElement("feColorMatrix", {
			in: "SourceAlpha",
			type: "matrix",
			values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
			result: "hardAlpha"
		}), import_react$7.createElement("feOffset", {
			dx: .444444,
			dy: .222222
		}), import_react$7.createElement("feGaussianBlur", { stdDeviation: .333333 }), import_react$7.createElement("feColorMatrix", {
			type: "matrix",
			values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12276 0"
		}), import_react$7.createElement("feBlend", {
			mode: "normal",
			in2: "BackgroundImageFix",
			result: "effect1_dropShadow_2519_51653"
		}), import_react$7.createElement("feBlend", {
			mode: "normal",
			in: "SourceGraphic",
			in2: "effect1_dropShadow_2519_51653",
			result: "shape"
		})), import_react$7.createElement("filter", {
			id: "filter4_d_2519_51653",
			x: 13.0278,
			y: 14.9929,
			width: 3.52083,
			height: 3.52083,
			filterUnits: "userSpaceOnUse",
			colorInterpolationFilters: "sRGB"
		}, import_react$7.createElement("feFlood", {
			floodOpacity: 0,
			result: "BackgroundImageFix"
		}), import_react$7.createElement("feColorMatrix", {
			in: "SourceAlpha",
			type: "matrix",
			values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
			result: "hardAlpha"
		}), import_react$7.createElement("feOffset", {
			dx: .444444,
			dy: .222222
		}), import_react$7.createElement("feGaussianBlur", { stdDeviation: .333333 }), import_react$7.createElement("feColorMatrix", {
			type: "matrix",
			values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12276 0"
		}), import_react$7.createElement("feBlend", {
			mode: "normal",
			in2: "BackgroundImageFix",
			result: "effect1_dropShadow_2519_51653"
		}), import_react$7.createElement("feBlend", {
			mode: "normal",
			in: "SourceGraphic",
			in2: "effect1_dropShadow_2519_51653",
			result: "shape"
		})), import_react$7.createElement("linearGradient", {
			id: "paint0_linear_2519_51653",
			x1: 20.75,
			y1: 12.6624,
			x2: 17.8851,
			y2: 12.6624,
			gradientUnits: "userSpaceOnUse"
		}, import_react$7.createElement("stop", {
			offset: 628278e-9,
			stopColor: "#A55BF5"
		}), import_react$7.createElement("stop", {
			offset: 1,
			stopColor: "#833FDF"
		})), import_react$7.createElement("linearGradient", {
			id: "paint1_linear_2519_51653",
			x1: 7.11465,
			y1: -.348246,
			x2: -.460364,
			y2: 16.7565,
			gradientUnits: "userSpaceOnUse"
		}, import_react$7.createElement("stop", { stopColor: "#C87FFA" }), import_react$7.createElement("stop", {
			offset: 1,
			stopColor: "#A55BF5"
		})))));
	}, v = "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cg filter='url(%23filter0_i_2519_51653)'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M6.6875 8.3875C6.6875 7.79379 7.16267 7.3125 7.74882 7.3125H19.6887C20.2748 7.3125 20.75 7.79379 20.75 8.3875V19.675C20.75 20.2687 20.2748 20.75 19.6887 20.75H7.74882C7.16267 20.75 6.6875 20.2687 6.6875 19.675V8.3875Z' fill='url(%23paint0_linear_2519_51653)'/%3e%3c/g%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M4.8125 3.25C4.12214 3.25 3.5625 3.80964 3.5625 4.5V19.5C3.5625 20.1904 4.12214 20.75 4.8125 20.75H18.5625H19.6562H19.8125V20.7389C19.7615 20.7462 19.7093 20.75 19.6562 20.75C19.0522 20.75 18.5625 20.2603 18.5625 19.6562C18.5625 19.6032 18.5663 19.551 18.5736 19.5H18.5625V4.5C18.5625 3.80964 18.0029 3.25 17.3125 3.25H4.8125Z' fill='url(%23paint1_linear_2519_51653)'/%3e%3cg filter='url(%23filter1_d_2519_51653)'%3e%3cpath d='M14.3438 10.5936V11.8556H11.3367C10.1814 11.8556 9.2449 12.7597 9.2449 13.8749C9.2449 14.9768 10.1593 15.8726 11.2956 15.8937L11.3367 15.8941H14.3438V17.1561H11.3367C9.45939 17.1561 7.9375 15.6871 7.9375 13.8749C7.9375 12.0808 9.4291 10.623 11.2805 10.5941L11.3367 10.5936H14.3438Z' fill='%23E5D7FF'/%3e%3c/g%3e%3cg filter='url(%23filter2_d_2519_51653)'%3e%3crect x='6.6875' y='12.1561' width='3.4375' height='3.4375' rx='1.71875' fill='white'/%3e%3c/g%3e%3cg filter='url(%23filter3_d_2519_51653)'%3e%3cellipse cx='14.3438' cy='11.2186' rx='1.09375' ry='1.09375' fill='white'/%3e%3c/g%3e%3cg filter='url(%23filter4_d_2519_51653)'%3e%3ccircle cx='14.3438' cy='16.5311' r='1.09375' fill='white'/%3e%3c/g%3e%3cdefs%3e%3cfilter id='filter0_i_2519_51653' x='6.6875' y='7.3125' width='14.7292' height='13.4375' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3e%3cfeFlood flood-opacity='0' result='BackgroundImageFix'/%3e%3cfeBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape'/%3e%3cfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3e%3cfeOffset dx='0.666667'/%3e%3cfeGaussianBlur stdDeviation='0.333333'/%3e%3cfeComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1'/%3e%3cfeColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.24 0'/%3e%3cfeBlend mode='normal' in2='shape' result='effect1_innerShadow_2519_51653'/%3e%3c/filter%3e%3cfilter id='filter1_d_2519_51653' x='7.71528' y='10.1492' width='7.73958' height='7.89583' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3e%3cfeFlood flood-opacity='0' result='BackgroundImageFix'/%3e%3cfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3e%3cfeOffset dx='0.444444' dy='0.222222'/%3e%3cfeGaussianBlur stdDeviation='0.333333'/%3e%3cfeColorMatrix type='matrix' values='0 0 0 0 0.537255 0 0 0 0 0.329412 0 0 0 0 0.729412 0 0 0 0.68 0'/%3e%3cfeBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_2519_51653'/%3e%3cfeBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_2519_51653' result='shape'/%3e%3c/filter%3e%3cfilter id='filter2_d_2519_51653' x='6.6875' y='12.1561' width='4.77083' height='4.77083' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3e%3cfeFlood flood-opacity='0' result='BackgroundImageFix'/%3e%3cfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3e%3cfeOffset dx='0.666667' dy='0.666667'/%3e%3cfeGaussianBlur stdDeviation='0.333333'/%3e%3cfeColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12276 0'/%3e%3cfeBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_2519_51653'/%3e%3cfeBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_2519_51653' result='shape'/%3e%3c/filter%3e%3cfilter id='filter3_d_2519_51653' x='13.0278' y='9.68043' width='3.52083' height='3.52083' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3e%3cfeFlood flood-opacity='0' result='BackgroundImageFix'/%3e%3cfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3e%3cfeOffset dx='0.444444' dy='0.222222'/%3e%3cfeGaussianBlur stdDeviation='0.333333'/%3e%3cfeColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12276 0'/%3e%3cfeBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_2519_51653'/%3e%3cfeBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_2519_51653' result='shape'/%3e%3c/filter%3e%3cfilter id='filter4_d_2519_51653' x='13.0278' y='14.9929' width='3.52083' height='3.52083' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3e%3cfeFlood flood-opacity='0' result='BackgroundImageFix'/%3e%3cfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3e%3cfeOffset dx='0.444444' dy='0.222222'/%3e%3cfeGaussianBlur stdDeviation='0.333333'/%3e%3cfeColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12276 0'/%3e%3cfeBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_2519_51653'/%3e%3cfeBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_2519_51653' result='shape'/%3e%3c/filter%3e%3clinearGradient id='paint0_linear_2519_51653' x1='20.75' y1='12.6624' x2='17.8851' y2='12.6624' gradientUnits='userSpaceOnUse'%3e%3cstop offset='0.000628278' stop-color='%23A55BF5'/%3e%3cstop offset='1' stop-color='%23833FDF'/%3e%3c/linearGradient%3e%3clinearGradient id='paint1_linear_2519_51653' x1='7.11465' y1='-0.348246' x2='-0.460364' y2='16.7565' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='%23C87FFA'/%3e%3cstop offset='1' stop-color='%23A55BF5'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e";
	w = function(t) {
		return import_react$7.createElement("svg", F$1({
			width: 24,
			height: 24,
			viewBox: "0 0 24 24",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg"
		}, t), x || (x = import_react$7.createElement("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M6.6875 8.3875C6.6875 7.79379 7.16267 7.3125 7.74882 7.3125H19.6887C20.2748 7.3125 20.75 7.79379 20.75 8.3875V19.675C20.75 20.2687 20.2748 20.75 19.6887 20.75H7.74882C7.16267 20.75 6.6875 20.2687 6.6875 19.675V8.3875Z",
			fill: "url(#paint0_linear_2519_51673)"
		})), g || (g = import_react$7.createElement("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M4.8125 3.25C4.12214 3.25 3.5625 3.80964 3.5625 4.5V19.5C3.5625 20.1904 4.12214 20.75 4.8125 20.75H18.5625H19.6562H19.8125V20.7389C19.7615 20.7462 19.7093 20.75 19.6562 20.75C19.0522 20.75 18.5625 20.2603 18.5625 19.6562C18.5625 19.6032 18.5663 19.551 18.5736 19.5H18.5625V4.5C18.5625 3.80964 18.0029 3.25 17.3125 3.25H4.8125Z",
			fill: "url(#paint1_linear_2519_51673)"
		})), E$1 || (E$1 = import_react$7.createElement("g", { filter: "url(#filter0_d_2519_51673)" }, import_react$7.createElement("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M15.4402 13.8892C15.4402 13.8845 15.4402 13.8797 15.4402 13.8749C15.4402 13.8702 15.4402 13.8654 15.4402 13.8606V13.8892ZM15.4375 14.0312C15.3552 16.3751 13.4286 18.2499 11.0639 18.2499C8.64687 18.2499 6.6875 16.2912 6.6875 13.8749C6.6875 11.511 8.56295 9.58497 10.9075 9.50269V14.0312H15.4375Z",
			fill: "#FFD7BF"
		}))), C || (C = import_react$7.createElement("g", { filter: "url(#filter1_d_2519_51673)" }, import_react$7.createElement("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M15.3708 13.0938C15.048 11.3038 13.636 9.89225 11.8455 9.56958V13.0938H15.3708Z",
			fill: "white"
		}))), y$1 || (y$1 = import_react$7.createElement("defs", null, import_react$7.createElement("filter", {
			id: "filter0_d_2519_51673",
			x: 6.42083,
			y: 8.96935,
			width: 10.3527,
			height: 10.3473,
			filterUnits: "userSpaceOnUse",
			colorInterpolationFilters: "sRGB"
		}, import_react$7.createElement("feFlood", {
			floodOpacity: 0,
			result: "BackgroundImageFix"
		}), import_react$7.createElement("feColorMatrix", {
			in: "SourceAlpha",
			type: "matrix",
			values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
			result: "hardAlpha"
		}), import_react$7.createElement("feOffset", {
			dx: .533333,
			dy: .266667
		}), import_react$7.createElement("feGaussianBlur", { stdDeviation: .4 }), import_react$7.createElement("feColorMatrix", {
			type: "matrix",
			values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
		}), import_react$7.createElement("feBlend", {
			mode: "normal",
			in2: "BackgroundImageFix",
			result: "effect1_dropShadow_2519_51673"
		}), import_react$7.createElement("feBlend", {
			mode: "normal",
			in: "SourceGraphic",
			in2: "effect1_dropShadow_2519_51673",
			result: "shape"
		})), import_react$7.createElement("filter", {
			id: "filter1_d_2519_51673",
			x: 11.5788,
			y: 9.03625,
			width: 5.12527,
			height: 5.12417,
			filterUnits: "userSpaceOnUse",
			colorInterpolationFilters: "sRGB"
		}, import_react$7.createElement("feFlood", {
			floodOpacity: 0,
			result: "BackgroundImageFix"
		}), import_react$7.createElement("feColorMatrix", {
			in: "SourceAlpha",
			type: "matrix",
			values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
			result: "hardAlpha"
		}), import_react$7.createElement("feOffset", {
			dx: .533333,
			dy: .266667
		}), import_react$7.createElement("feGaussianBlur", { stdDeviation: .4 }), import_react$7.createElement("feColorMatrix", {
			type: "matrix",
			values: "0 0 0 0 0.457456 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0"
		}), import_react$7.createElement("feBlend", {
			mode: "normal",
			in2: "BackgroundImageFix",
			result: "effect1_dropShadow_2519_51673"
		}), import_react$7.createElement("feBlend", {
			mode: "normal",
			in: "SourceGraphic",
			in2: "effect1_dropShadow_2519_51673",
			result: "shape"
		})), import_react$7.createElement("linearGradient", {
			id: "paint0_linear_2519_51673",
			x1: 20.75,
			y1: 11.4806,
			x2: 18.3746,
			y2: 11.4806,
			gradientUnits: "userSpaceOnUse"
		}, import_react$7.createElement("stop", { stopColor: "#EB4825" }), import_react$7.createElement("stop", {
			offset: 1,
			stopColor: "#EB3319"
		})), import_react$7.createElement("linearGradient", {
			id: "paint1_linear_2519_51673",
			x1: 4.89364,
			y1: -1.47234,
			x2: -4.96774,
			y2: 17.0364,
			gradientUnits: "userSpaceOnUse"
		}, import_react$7.createElement("stop", { stopColor: "#FF8246" }), import_react$7.createElement("stop", {
			offset: 1,
			stopColor: "#FF5E2F"
		})))));
	}, S$2 = "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M6.6875 8.3875C6.6875 7.79379 7.16267 7.3125 7.74882 7.3125H19.6887C20.2748 7.3125 20.75 7.79379 20.75 8.3875V19.675C20.75 20.2687 20.2748 20.75 19.6887 20.75H7.74882C7.16267 20.75 6.6875 20.2687 6.6875 19.675V8.3875Z' fill='url(%23paint0_linear_2519_51673)'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M4.8125 3.25C4.12214 3.25 3.5625 3.80964 3.5625 4.5V19.5C3.5625 20.1904 4.12214 20.75 4.8125 20.75H18.5625H19.6562H19.8125V20.7389C19.7615 20.7462 19.7093 20.75 19.6562 20.75C19.0522 20.75 18.5625 20.2603 18.5625 19.6562C18.5625 19.6032 18.5663 19.551 18.5736 19.5H18.5625V4.5C18.5625 3.80964 18.0029 3.25 17.3125 3.25H4.8125Z' fill='url(%23paint1_linear_2519_51673)'/%3e%3cg filter='url(%23filter0_d_2519_51673)'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M15.4402 13.8892C15.4402 13.8845 15.4402 13.8797 15.4402 13.8749C15.4402 13.8702 15.4402 13.8654 15.4402 13.8606V13.8892ZM15.4375 14.0312C15.3552 16.3751 13.4286 18.2499 11.0639 18.2499C8.64687 18.2499 6.6875 16.2912 6.6875 13.8749C6.6875 11.511 8.56295 9.58497 10.9075 9.50269V14.0312H15.4375Z' fill='%23FFD7BF'/%3e%3c/g%3e%3cg filter='url(%23filter1_d_2519_51673)'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M15.3708 13.0938C15.048 11.3038 13.636 9.89225 11.8455 9.56958V13.0938H15.3708Z' fill='white'/%3e%3c/g%3e%3cdefs%3e%3cfilter id='filter0_d_2519_51673' x='6.42083' y='8.96935' width='10.3527' height='10.3473' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3e%3cfeFlood flood-opacity='0' result='BackgroundImageFix'/%3e%3cfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3e%3cfeOffset dx='0.533333' dy='0.266667'/%3e%3cfeGaussianBlur stdDeviation='0.4'/%3e%3cfeColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0'/%3e%3cfeBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_2519_51673'/%3e%3cfeBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_2519_51673' result='shape'/%3e%3c/filter%3e%3cfilter id='filter1_d_2519_51673' x='11.5788' y='9.03625' width='5.12527' height='5.12417' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3e%3cfeFlood flood-opacity='0' result='BackgroundImageFix'/%3e%3cfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3e%3cfeOffset dx='0.533333' dy='0.266667'/%3e%3cfeGaussianBlur stdDeviation='0.4'/%3e%3cfeColorMatrix type='matrix' values='0 0 0 0 0.457456 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0'/%3e%3cfeBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_2519_51673'/%3e%3cfeBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_2519_51673' result='shape'/%3e%3c/filter%3e%3clinearGradient id='paint0_linear_2519_51673' x1='20.75' y1='11.4806' x2='18.3746' y2='11.4806' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='%23EB4825'/%3e%3cstop offset='1' stop-color='%23EB3319'/%3e%3c/linearGradient%3e%3clinearGradient id='paint1_linear_2519_51673' x1='4.89364' y1='-1.47234' x2='-4.96774' y2='17.0364' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='%23FF8246'/%3e%3cstop offset='1' stop-color='%23FF5E2F'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/dist/esm/message/index.js
function Te$1(e, n) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		n && (r = r.filter((function(n) {
			return Object.getOwnPropertyDescriptor(e, n).enumerable;
		}))), t.push.apply(t, r);
	}
	return t;
}
function He(e) {
	for (var n = 1; n < arguments.length; n++) {
		var t = null != arguments[n] ? arguments[n] : {};
		n % 2 ? Te$1(Object(t), !0).forEach((function(n) {
			a$19(e, n, t[n]);
		})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : Te$1(Object(t)).forEach((function(n) {
			Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(t, n));
		}));
	}
	return e;
}
function je$1(e) {
	return je$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
		return typeof e;
	} : function(e) {
		return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, je$1(e);
}
function Pe$1() {
	return Pe$1 = Object.assign ? Object.assign.bind() : function(e) {
		for (var n = 1; n < arguments.length; n++) {
			var t = arguments[n];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (e[r] = t[r]);
		}
		return e;
	}, Pe$1.apply(null, arguments);
}
function Le(e, n, t) {
	return (n = function(e) {
		var n = function(e, n) {
			if ("object" != je$1(e) || !e) return e;
			var t = e[Symbol.toPrimitive];
			if (void 0 !== t) {
				var r = t.call(e, n || "default");
				if ("object" != je$1(r)) return r;
				throw new TypeError("@@toPrimitive must return a primitive value.");
			}
			return ("string" === n ? String : Number)(e);
		}(e, "string");
		return "symbol" == je$1(n) ? n : n + "";
	}(n)) in e ? Object.defineProperty(e, n, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[n] = t, e;
}
function Ve(e, n) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		n && (r = r.filter((function(n) {
			return Object.getOwnPropertyDescriptor(e, n).enumerable;
		}))), t.push.apply(t, r);
	}
	return t;
}
function Be(e) {
	for (var n = 1; n < arguments.length; n++) {
		var t = null != arguments[n] ? arguments[n] : {};
		n % 2 ? Ve(Object(t), !0).forEach((function(n) {
			a$19(e, n, t[n]);
		})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : Ve(Object(t)).forEach((function(n) {
			Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(t, n));
		}));
	}
	return e;
}
function Ge(e, n) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		n && (r = r.filter((function(n) {
			return Object.getOwnPropertyDescriptor(e, n).enumerable;
		}))), t.push.apply(t, r);
	}
	return t;
}
function Ue(e) {
	for (var n = 1; n < arguments.length; n++) {
		var t = null != arguments[n] ? arguments[n] : {};
		n % 2 ? Ge(Object(t), !0).forEach((function(n) {
			a$19(e, n, t[n]);
		})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : Ge(Object(t)).forEach((function(n) {
			Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(t, n));
		}));
	}
	return e;
}
function $e() {
	return $e = Object.assign ? Object.assign.bind() : function(e) {
		for (var n = 1; n < arguments.length; n++) {
			var t = arguments[n];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (e[r] = t[r]);
		}
		return e;
	}, $e.apply(null, arguments);
}
function Ye(e) {
	return Ye = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
		return typeof e;
	} : function(e) {
		return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, Ye(e);
}
function en() {
	return en = Object.assign ? Object.assign.bind() : function(e) {
		for (var n = 1; n < arguments.length; n++) {
			var t = arguments[n];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (e[r] = t[r]);
		}
		return e;
	}, en.apply(null, arguments);
}
function nn(e, n, t) {
	return (n = function(e) {
		var n = function(e, n) {
			if ("object" != Ye(e) || !e) return e;
			var t = e[Symbol.toPrimitive];
			if (void 0 !== t) {
				var r = t.call(e, n || "default");
				if ("object" != Ye(r)) return r;
				throw new TypeError("@@toPrimitive must return a primitive value.");
			}
			return ("string" === n ? String : Number)(e);
		}(e, "string");
		return "symbol" == Ye(n) ? n : n + "";
	}(n)) in e ? Object.defineProperty(e, n, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[n] = t, e;
}
function rn(e) {
	return rn = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
		return typeof e;
	} : function(e) {
		return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, rn(e);
}
function on() {
	return on = Object.assign ? Object.assign.bind() : function(e) {
		for (var n = 1; n < arguments.length; n++) {
			var t = arguments[n];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (e[r] = t[r]);
		}
		return e;
	}, on.apply(null, arguments);
}
function an(e, n, t) {
	return (n = function(e) {
		var n = function(e, n) {
			if ("object" != rn(e) || !e) return e;
			var t = e[Symbol.toPrimitive];
			if (void 0 !== t) {
				var r = t.call(e, n || "default");
				if ("object" != rn(r)) return r;
				throw new TypeError("@@toPrimitive must return a primitive value.");
			}
			return ("string" === n ? String : Number)(e);
		}(e, "string");
		return "symbol" == rn(n) ? n : n + "";
	}(n)) in e ? Object.defineProperty(e, n, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[n] = t, e;
}
function cn(e) {
	return cn = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
		return typeof e;
	} : function(e) {
		return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, cn(e);
}
function sn() {
	return sn = Object.assign ? Object.assign.bind() : function(e) {
		for (var n = 1; n < arguments.length; n++) {
			var t = arguments[n];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (e[r] = t[r]);
		}
		return e;
	}, sn.apply(null, arguments);
}
function un(e, n, t) {
	return (n = function(e) {
		var n = function(e, n) {
			if ("object" != cn(e) || !e) return e;
			var t = e[Symbol.toPrimitive];
			if (void 0 !== t) {
				var r = t.call(e, n || "default");
				if ("object" != cn(r)) return r;
				throw new TypeError("@@toPrimitive must return a primitive value.");
			}
			return ("string" === n ? String : Number)(e);
		}(e, "string");
		return "symbol" == cn(n) ? n : n + "";
	}(n)) in e ? Object.defineProperty(e, n, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[n] = t, e;
}
function dn(e) {
	return dn = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
		return typeof e;
	} : function(e) {
		return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, dn(e);
}
function mn() {
	return mn = Object.assign ? Object.assign.bind() : function(e) {
		for (var n = 1; n < arguments.length; n++) {
			var t = arguments[n];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (e[r] = t[r]);
		}
		return e;
	}, mn.apply(null, arguments);
}
function fn(e, n, t) {
	return (n = function(e) {
		var n = function(e, n) {
			if ("object" != dn(e) || !e) return e;
			var t = e[Symbol.toPrimitive];
			if (void 0 !== t) {
				var r = t.call(e, n || "default");
				if ("object" != dn(r)) return r;
				throw new TypeError("@@toPrimitive must return a primitive value.");
			}
			return ("string" === n ? String : Number)(e);
		}(e, "string");
		return "symbol" == dn(n) ? n : n + "";
	}(n)) in e ? Object.defineProperty(e, n, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[n] = t, e;
}
function gn(e) {
	return gn = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
		return typeof e;
	} : function(e) {
		return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, gn(e);
}
function hn() {
	return hn = Object.assign ? Object.assign.bind() : function(e) {
		for (var n = 1; n < arguments.length; n++) {
			var t = arguments[n];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (e[r] = t[r]);
		}
		return e;
	}, hn.apply(null, arguments);
}
function bn(e, n, t) {
	return (n = function(e) {
		var n = function(e, n) {
			if ("object" != gn(e) || !e) return e;
			var t = e[Symbol.toPrimitive];
			if (void 0 !== t) {
				var r = t.call(e, n || "default");
				if ("object" != gn(r)) return r;
				throw new TypeError("@@toPrimitive must return a primitive value.");
			}
			return ("string" === n ? String : Number)(e);
		}(e, "string");
		return "symbol" == gn(n) ? n : n + "";
	}(n)) in e ? Object.defineProperty(e, n, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[n] = t, e;
}
function yn(e) {
	return yn = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
		return typeof e;
	} : function(e) {
		return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, yn(e);
}
function xn() {
	return xn = Object.assign ? Object.assign.bind() : function(e) {
		for (var n = 1; n < arguments.length; n++) {
			var t = arguments[n];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (e[r] = t[r]);
		}
		return e;
	}, xn.apply(null, arguments);
}
function En(e, n, t) {
	return (n = function(e) {
		var n = function(e, n) {
			if ("object" != yn(e) || !e) return e;
			var t = e[Symbol.toPrimitive];
			if (void 0 !== t) {
				var r = t.call(e, n || "default");
				if ("object" != yn(r)) return r;
				throw new TypeError("@@toPrimitive must return a primitive value.");
			}
			return ("string" === n ? String : Number)(e);
		}(e, "string");
		return "symbol" == yn(n) ? n : n + "";
	}(n)) in e ? Object.defineProperty(e, n, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[n] = t, e;
}
function Sn(e) {
	return Sn = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
		return typeof e;
	} : function(e) {
		return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, Sn(e);
}
function _n() {
	return _n = Object.assign ? Object.assign.bind() : function(e) {
		for (var n = 1; n < arguments.length; n++) {
			var t = arguments[n];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (e[r] = t[r]);
		}
		return e;
	}, _n.apply(null, arguments);
}
function On(e, n, t) {
	return (n = function(e) {
		var n = function(e, n) {
			if ("object" != Sn(e) || !e) return e;
			var t = e[Symbol.toPrimitive];
			if (void 0 !== t) {
				var r = t.call(e, n || "default");
				if ("object" != Sn(r)) return r;
				throw new TypeError("@@toPrimitive must return a primitive value.");
			}
			return ("string" === n ? String : Number)(e);
		}(e, "string");
		return "symbol" == Sn(n) ? n : n + "";
	}(n)) in e ? Object.defineProperty(e, n, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[n] = t, e;
}
function Rn(e, n) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		n && (r = r.filter((function(n) {
			return Object.getOwnPropertyDescriptor(e, n).enumerable;
		}))), t.push.apply(t, r);
	}
	return t;
}
function In(e) {
	for (var n = 1; n < arguments.length; n++) {
		var t = null != arguments[n] ? arguments[n] : {};
		n % 2 ? Rn(Object(t), !0).forEach((function(n) {
			a$19(e, n, t[n]);
		})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : Rn(Object(t)).forEach((function(n) {
			Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(t, n));
		}));
	}
	return e;
}
function Ln(e, n) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		n && (r = r.filter((function(n) {
			return Object.getOwnPropertyDescriptor(e, n).enumerable;
		}))), t.push.apply(t, r);
	}
	return t;
}
function Fn(e) {
	for (var n = 1; n < arguments.length; n++) {
		var t = null != arguments[n] ? arguments[n] : {};
		n % 2 ? Ln(Object(t), !0).forEach((function(n) {
			a$19(e, n, t[n]);
		})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : Ln(Object(t)).forEach((function(n) {
			Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(t, n));
		}));
	}
	return e;
}
function Zn() {
	return Zn = Object.assign ? Object.assign.bind() : function(e) {
		for (var n = 1; n < arguments.length; n++) {
			var t = arguments[n];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (e[r] = t[r]);
		}
		return e;
	}, Zn.apply(null, arguments);
}
function qn() {
	return qn = Object.assign ? Object.assign.bind() : function(e) {
		for (var n = 1; n < arguments.length; n++) {
			var t = arguments[n];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (e[r] = t[r]);
		}
		return e;
	}, qn.apply(null, arguments);
}
function Kn() {
	return Kn = Object.assign ? Object.assign.bind() : function(e) {
		for (var n = 1; n < arguments.length; n++) {
			var t = arguments[n];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (e[r] = t[r]);
		}
		return e;
	}, Kn.apply(null, arguments);
}
function Qn(e) {
	return Qn = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
		return typeof e;
	} : function(e) {
		return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, Qn(e);
}
function $n() {
	return $n = Object.assign ? Object.assign.bind() : function(e) {
		for (var n = 1; n < arguments.length; n++) {
			var t = arguments[n];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (e[r] = t[r]);
		}
		return e;
	}, $n.apply(null, arguments);
}
function Xn(e, n, t) {
	return (n = function(e) {
		var n = function(e, n) {
			if ("object" != Qn(e) || !e) return e;
			var t = e[Symbol.toPrimitive];
			if (void 0 !== t) {
				var r = t.call(e, n || "default");
				if ("object" != Qn(r)) return r;
				throw new TypeError("@@toPrimitive must return a primitive value.");
			}
			return ("string" === n ? String : Number)(e);
		}(e, "string");
		return "symbol" == Qn(n) ? n : n + "";
	}(n)) in e ? Object.defineProperty(e, n, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[n] = t, e;
}
function nt() {
	return nt = Object.assign ? Object.assign.bind() : function(e) {
		for (var n = 1; n < arguments.length; n++) {
			var t = arguments[n];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (e[r] = t[r]);
		}
		return e;
	}, nt.apply(null, arguments);
}
var import_react$5, import_react$6, import_classnames$2, ye, xe, Ee$1, we$1, Se$1, _e$1, Oe$1, Me, ke$1, Re, Ie$1, Ae, Fe$1, De, Ne$1, Ze, qe, ze, We, Ke, Je, Qe, Xe, tn, ln, pn, vn, Cn, wn, Mn, kn, Tn, Hn, An, jn, Pn, Dn, Nn, Vn, Bn, Gn, Un, zn, Wn, Jn, Yn, et, tt, rt, it, ot, at;
var init_message = __esmMin((() => {
	init_extends_559f37d0();
	import_react$5 = /* @__PURE__ */ __toESM(require_react());
	import_react$6 = /* @__PURE__ */ __toESM(require_react());
	init_index_05e873fa();
	init_slicedToArray_e715395f();
	init_index_4a868389();
	init_esm$3();
	init_esm$7();
	init_index_bc35b061();
	import_classnames$2 = /* @__PURE__ */ __toESM(require_classnames());
	init_style_inject_es_3984fa0f();
	init_esm$1();
	init_lodash();
	init_auth_card();
	init_index_e54e83c4();
	init_index_17c96894();
	init_index_c23defda();
	init_esm$4();
	init_index_b1d71213();
	init_file_item_1e7b17c1();
	init_index_84e98abf();
	init_esm$6();
	init_esm$8();
	init_feedback();
	init_application_vnd_tdocs_apps_slide_0224ba95();
	init_esm$5();
	init_dist();
	require_react_dom();
	e$11(".ai-component-common-collapse-card-content .ai-component-pc-search-reference-wrapper-content {\n  margin-top: 8px;\n}\n.ai-component-pc-search-reference-wrapper {\n  position: relative;\n  min-width: 231px;\n}\n.ai-component-pc-search-reference-wrapper-content {\n  border-left: 2px solid var(--border-weak, rgba(0, 0, 0, 0.04));\n  padding-left: 4px;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.ai-component-pc-search-reference-wrapper .ai-search-icon {\n  width: 16px;\n  height: 16px;\n  margin: 0 2px;\n}\n.ai-component-pc-search-reference-wrapper .ai-search-icon.hide {\n  display: none;\n}\n.ai-component-pc-search-reference-wrapper .ai-search-item {\n  height: 30px;\n  padding: 0 8px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  color: var(--text-link, #175ceb);\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 16px;\n  overflow: hidden;\n  border-radius: 8px;\n}\n.ai-component-pc-search-reference-wrapper .ai-search-item__hover {\n  background-color: var(--feedback-hover, rgba(51, 77, 102, 0.06));\n}\n.ai-component-pc-search-reference-wrapper .ai-search-item .ai-search-item__left {\n  display: flex;\n  align-items: center;\n  flex: 1;\n  gap: 4px;\n  user-select: none;\n  overflow: hidden;\n}\n.ai-component-pc-search-reference-wrapper .ai-search-item .ai-search-item__left .ai-search-item_icon {\n  width: 20px;\n  height: 20px;\n}\n.ai-component-pc-search-reference-wrapper .ai-search-item .ai-search-item__left > span {\n  flex: 1;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n}\n.ai-component-pc-search-reference-wrapper .ai-search-item .ai-search-item__right {\n  user-select: none;\n  cursor: pointer;\n  height: 24px;\n  min-width: 95px;\n  padding: 0 6px 0 4px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 4px;\n  background-color: var(--feedback-hover, rgba(51, 77, 102, 0.06));\n  color: var(--text-strong, rgba(0, 0, 0, 0.64));\n}\n.ai-component-pc-search-reference-wrapper .ai-search-item .ai-search-item__right svg {\n  width: 20px;\n  height: 20px;\n}\n.ai-component-pc-search-reference-wrapper .ai-search-item .ai-search-item__right svg path {\n  fill: var(--text-strong, rgba(0, 0, 0, 0.64));\n}\n.ai-component-pc-search-reference-wrapper .ai-search-item .ai-search-item__right:hover {\n  background-color: var(--feedback-active, rgba(6, 15, 26, 0.1));\n}\n");
	ye = function(e) {
		var n = e.references, a = e.className, l = e.titleTips, c = e.saveText, s = e.referenceProcesses, d = e.onReferenceOpen, g = e.onReferenceSave, h = e.onReferenceSaveShow, b = e.onReferenceExpandChange, y = t$9((0, import_react$6.useState)(-1), 2), x = y[0], E = y[1], w = (0, import_react$6.useMemo)((function() {
			return G$2(n);
		}), [n]).referencesWithSource, S = S$8.isSupportSpace();
		return (0, import_react$6.useEffect)((function() {
			var e = w[x];
			null != e && e.isSavable && h?.();
		}), [
			x,
			w,
			h
		]), import_react$6.createElement(l$15, { case: void 0 }, import_react$6.createElement(l$15.Case, { case: Boolean((null == s ? void 0 : s.message) && (null == s ? void 0 : s.step) !== d$6.CITING) }, import_react$6.createElement(m$10, {
			visible: !0,
			tips: null == s ? void 0 : s.message
		})), import_react$6.createElement(l$15.Case, { case: !n.length }, null), import_react$6.createElement(l$15.Default, null, import_react$6.createElement("div", { className: (0, import_classnames$2.default)("ai-component-pc-search-reference-wrapper", a) }, import_react$6.createElement(m$11, {
			title: i$17("reference.reference-count", { count: n.length }),
			handleMouseLeave: function() {
				return E(-1);
			},
			expand: !1,
			fullContent: !0,
			tips: l,
			onExpandChange: b
		}, import_react$6.createElement("div", { className: "ai-component-pc-search-reference-wrapper-content" }, w.map((function(e, n) {
			return import_react$6.createElement("li", {
				className: (0, import_classnames$2.default)("ai-search-item", { "ai-search-item__hover": x === n }),
				key: e.title + n,
				onClick: function(n) {
					n.stopPropagation(), n.preventDefault(), d?.(e);
				},
				onMouseEnter: function() {
					return E(n);
				}
			}, import_react$6.createElement("span", { className: "ai-search-item__left" }, import_react$6.createElement("img", {
				src: e.icon || "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20width='24px'%20height='24px'%20viewBox='0%200%2024%2024'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3ctitle%3elist_24_link_blue%3c/title%3e%3cg%20id='页面-1'%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%3e%3cg%20id='资源_链接多态切换'%20transform='translate(-17.000000,%20-176.000000)'%3e%3cg%20id='编组'%20transform='translate(17.000000,%20128.000000)'%3e%3cg%20transform='translate(0.000000,%2048.000000)'%3e%3crect%20id='矩形'%20x='0'%20y='0'%20width='24'%20height='24'%20rx='2'%3e%3c/rect%3e%3cpath%20d='M6.28556158,12%20C6.54856135,12.2629998%206.54856135,12.6894066%206.28556158,12.9524064%20L5.33315518,13.9048128%20L5.33315518,13.9048128%20C4.01815635,15.2198116%204.01815635,17.351846%205.33315518,18.6668448%20C6.59555405,19.9292437%208.61093287,19.9797397%209.93357014,18.8183327%20L10.0951872,18.6668448%20L12.9524064,15.8096256%20C14.2674052,14.4946268%2014.2674052,12.3625924%2012.9524064,11.0475936%20C12.7895162,10.8847034%2012.6140894,10.7419906%2012.4292319,10.6194552%20L13.3949063,9.6527821%20C13.5726629,9.7860541%2013.7431481,9.93352246%2013.9048128,10.0951872%20C15.7458112,11.9361856%2015.7458112,14.9210337%2013.9048128,16.762032%20L11.0475936,19.6192512%20C9.20659523,21.4602496%206.22174714,21.4602496%204.38074877,19.6192512%20C2.53975041,17.7782529%202.53975041,14.7934048%204.38074877,12.9524064%20L5.33315518,12%20C5.59615494,11.7370002%206.02256181,11.7370002%206.28556158,12%20Z%20M12.9524064,4.38074877%20C14.7934048,2.53975041%2017.7782529,2.53975041%2019.6192512,4.38074877%20C21.4602496,6.22174714%2021.4602496,9.20659523%2019.6192512,11.0475936%20L18.6668448,12%20C18.4038451,12.2629998%2017.9774382,12.2629998%2017.7144384,12%20C17.4514387,11.7370002%2017.4514387,11.3105934%2017.7144384,11.0475936%20L18.6668448,10.0951872%20L18.6668448,10.0951872%20C19.9818437,8.78018836%2019.9818437,6.64815401%2018.6668448,5.33315518%20C17.4044459,4.0707563%2015.3890671,4.02026034%2014.0664299,5.18166731%20L13.9048128,5.33315518%20L11.0475936,8.19037439%20C9.73259477,9.50537322%209.73259477,11.6374076%2011.0475936,12.9524064%20C11.2108231,13.1156359%2011.3866416,13.2586039%2011.5719236,13.3813104%20L10.6061821,14.3480337%20C10.428033,14.2145478%2010.2571819,14.0668075%2010.0951872,13.9048128%20C8.25418883,12.0638144%208.25418883,9.07896635%2010.0951872,7.23796798%20L12.9524064,4.38074877%20Z'%20id='形状'%20fill='%231E6FFF'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/svg%3e",
				className: (0, import_classnames$2.default)("ai-search-item_icon", { "ai-search-item_icon__link": e.source === s$6.LINK }),
				alt: ""
			}), import_react$6.createElement("span", null, "".concat(e.title))), x === n && g && (e.isSavable || S && e.source === s$6.DOCS) ? import_react$6.createElement("span", {
				className: "ai-search-item__right",
				onClick: function(n) {
					n.stopPropagation(), n.preventDefault(), g?.(e);
				}
			}, S ? import_react$6.createElement(S$3, { viewBox: "0 0 24 24" }) : import_react$6.createElement(_$1, { viewBox: "0 0 24 24" }), null != c ? c : i$17(S ? "reference.saveToSpace" : "reference.saveAsDoc")) : null);
		})))))));
	};
	e$11(".ai-component-pc-suggestions-hr {\n  width: 100%;\n  margin: 0;\n  border: 0;\n  height: 1px;\n  background: var(--border-strong, rgba(0, 0, 0, 0.12));\n  margin-top: 20px;\n}\n.ai-component-pc-suggestions {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  color: var(--text-medium, rgba(0, 0, 0, 0.48));\n  font-size: 12px;\n  line-height: 20px;\n}\n.ai-component-pc-suggestions .ai-suggestion-item {\n  width: fit-content;\n  max-width: 100%;\n  box-sizing: border-box;\n  padding: 8px 12px;\n  line-height: 20px;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  border-radius: 20px;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  background-color: var(--feedback-hover, rgba(51, 77, 102, 0.06));\n  cursor: pointer;\n  user-select: none;\n}\n.ai-component-pc-suggestions .ai-suggestion-item:hover {\n  background-color: var(--feedback-active, rgba(29, 79, 106, 0.08));\n}\n");
	xe = function(e) {
		var n = e.questions, r = e.noTitle, i = void 0 !== r && r;
		if (0 === n.length) return null;
		return import_react$6.createElement(import_react$6.Fragment, null, import_react$6.createElement("div", { className: "ai-component-pc-suggestions" }, i ? null : import_react$6.createElement("div", null, i$17("message.recommend-questions-tips")), n.map((function(e, n) {
			return function(e, n) {
				return import_react$6.createElement("div", {
					className: "ai-suggestion-item",
					key: n,
					onClick: function() {
						var n;
						return null === (n = e.onClick) || void 0 === n ? void 0 : n.call(e, e.text);
					}
				}, e.text);
			}(e, n);
		}))));
	}, Ee$1 = (0, import_react$6.createContext)(""), we$1 = function(e) {
		var n = e.message.error, r = (void 0 === n ? {} : n).message, i = void 0 === r ? i$17("errorMessage.commonError") : r;
		return import_react$6.createElement("div", null, i);
	}, Se$1 = function(e) {
		var n = e.props, a = e.message, c = t$9((0, import_react$6.useState)(v$6.getInstance().isSVIP()), 2), s = c[0], u = c[1], p = function() {
			var e = e$8(f$8.mark((function e() {
				var n;
				return f$8.wrap((function(e) {
					for (;;) switch (e.prev = e.next) {
						case 0: return e.next = 2, v$6.getInstance().checkIsSVIP();
						case 2: n = e.sent, u(n);
						case 4:
						case "end": return e.stop();
					}
				}), e);
			})));
			return function() {
				return e.apply(this, arguments);
			};
		}();
		(0, import_react$6.useEffect)((function() {
			v$7.aiSearchResultPageShow(), v$7.aiSearchNoResultByMine(), p();
		}), []);
		var d = function() {
			var e;
			v$7.aiTryWebWhenNoResultByMine(), null == n || null === (e = n.onGotoGlobalWebSearch) || void 0 === e || e.call(n, a);
		}, v = (0, import_react$6.useMemo)((function() {
			return [{
				text: i$17("errorMessage.searchNotFoundUniversalRecommend"),
				onClick: d
			}];
		}), [s]), b = (0, import_react$6.useMemo)((function() {
			return i$17("errorMessage.searchNotFoundVip");
		}), [s]);
		return import_react$6.createElement(import_react$6.Fragment, null, import_react$6.createElement("div", null, b), import_react$6.createElement(xe, {
			questions: v,
			noTitle: !0
		}));
	}, _e$1 = function() {
		return import_react$6.createElement("div", null, i$17("errorMessage.sensitiveError"));
	}, Oe$1 = function(e) {
		var n = e.props;
		return (0, import_react$6.useEffect)((function() {
			var e;
			null == n || null === (e = n.onStorageOverflow) || void 0 === e || e.call(n);
		}), []), null;
	}, Me = function(e) {
		var n = e.props;
		return (0, import_react$6.useEffect)((function() {
			var e;
			null == n || null === (e = n.onUseLimit) || void 0 === e || e.call(n);
		}), []), null;
	}, ke$1 = function(e) {
		var n, r, i, o = e.message, a = e.errorMessageProps;
		return import_react$6.createElement(l$15, { case: null === (n = o.error) || void 0 === n ? void 0 : n.code }, import_react$6.createElement(l$15.Case, { case: _$8.NOT_FOUND }, import_react$6.createElement(Se$1, {
			props: null == a ? void 0 : a[_$8.NOT_FOUND],
			message: o
		})), import_react$6.createElement(l$15.Case, { case: _$8.SENSITIVE_BLOCK }, import_react$6.createElement(_e$1, null)), import_react$6.createElement(l$15.Case, { case: _$8.USER_STORAGE_OVERFLOW }, import_react$6.createElement(Oe$1, { props: null == a ? void 0 : a[_$8.USER_STORAGE_OVERFLOW] })), import_react$6.createElement(l$15.Case, { case: _$8.AI_USE_LIMIT }, import_react$6.createElement(Me, { props: null == a ? void 0 : a[_$8.AI_USE_LIMIT] })), import_react$6.createElement(l$15.Case, { case: E$8.NoAuth }, import_react$6.createElement(f, { onAgree: null == o || null === (r = o.errorUtils) || void 0 === r ? void 0 : r.onStart })), import_react$6.createElement(l$15.Case, { case: E$8.NoImport }, import_react$6.createElement(E, { onStartAISearch: null == o || null === (i = o.errorUtils) || void 0 === i ? void 0 : i.onStart })), import_react$6.createElement(l$15.Default, null, import_react$6.createElement(we$1, { message: o })));
	};
	e$11(".ai-component-pc-files-message-title {\n  font-size: 14px;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  font-weight: 400;\n  margin-bottom: 10px;\n}\n.ai-component-pc-files-message-list {\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n}\n.ai-component-pc-files-message-item {\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n}\n.ai-component-pc-files-message-item img {\n  width: 20px;\n  height: 20px;\n  margin-right: 5px;\n}\n.ai-component-pc-files-message-item-name {\n  font-size: 14px;\n  font-weight: 400;\n  color: var(--text-link, #0060fd);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.ai-component-pc-files-message-bottom {\n  height: 1px;\n  width: 100%;\n  background: var(--border-weak, rgba(0, 0, 0, 0.04));\n}\n");
	Re = function(e) {
		var n = e.files, r = e.title;
		if (null == n || !n.length) return null;
		return import_react$6.createElement(import_react$6.Fragment, null, import_react$6.createElement("div", { className: "ai-component-pc-files-message" }, import_react$6.createElement("div", { className: "ai-component-pc-files-message-title" }, r || i$17("files-message.title")), import_react$6.createElement("div", { className: "ai-component-pc-files-message-list" }, n.map((function(e) {
			return import_react$6.createElement("div", {
				key: e.id,
				className: "ai-component-pc-files-message-item",
				onClick: function() {
					return function(e) {
						if (e.url) {
							var n = {};
							e.type === L$5.SLIDE ? n = {
								AIGenerate: "1",
								no_promotion: "1",
								expand_type: "1"
							} : (n = e.needExpand ? { AIGenerate: "1" } : { no_promotion: "1" }, e.type === L$5.RESUME && (n = He(He({}, n), {}, {
								aid_position: eE.RESUME,
								show_layout: !0,
								from_page: window.location.href.indexOf("docs.qq.com/ai") > -1 ? tE.ASSISTANT : tE.AI_OTHER
							})));
							var t = e.url;
							openUrl({ url: i$18(t, n) });
						}
					}(e);
				}
			}, import_react$6.createElement("img", {
				src: e.iconUrl,
				alt: e.name
			}), import_react$6.createElement("div", { className: "ai-component-pc-files-message-item-name" }, e.name));
		})))), import_react$6.createElement("div", { className: "ai-component-mobile-files-message-bottom" }));
	};
	e$11(".ai-component-pc-uploader-box {\n  border-radius: 12px;\n  border: 1px solid var(--border-strong, rgba(0, 0, 0, 0.12));\n  padding: 8px;\n  min-height: 26px;\n  display: flex;\n  flex-direction: column;\n}\n.ai-component-pc-uploader-box-footer-buttons {\n  display: flex;\n  justify-content: flex-end;\n  width: 100%;\n}\n");
	Ie$1 = "ai-component-pc-uploader-box", Ae = function(e) {
		var n = e.initialFiles, i = e.menuItem, o = void 0 === i ? [
			A.Online,
			A.Local,
			A.Url
		] : i, a = e.onChange, s = t$9((0, import_react$6.useState)([]), 2), u = s[0], p = s[1], f = t$9((0, import_react$6.useState)(null), 2), v = f[0], g = f[1], h = (0, import_react$6.useCallback)((function(e) {
			g(e);
		}), [g]), b = v && (null == u ? void 0 : u.length) && u.length > 0;
		return import_react$6.createElement("div", { className: Ie$1 }, import_react$6.createElement(a$21, null, v ? null == u ? void 0 : u.slice().reverse().map((function(e) {
			return import_react$6.createElement(I$5, {
				key: e.getTask().id,
				fileTask: e,
				fileTaskManager: v
			});
		})) : null), import_react$6.createElement("div", {
			className: "".concat(Ie$1, "-footer-buttons"),
			style: { marginTop: b ? "6px" : "0px" }
		}, import_react$6.createElement(S, {
			initialFiles: n,
			onChange: function(e) {
				p(e), a(e);
			},
			onGetFileTaskManager: h,
			menuItem: o
		})));
	};
	Fe$1 = function(e) {
		return import_react$5.createElement("svg", Pe$1({
			width: 24,
			height: 24,
			viewBox: "0 0 24 24",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg"
		}, e), import_react$5.createElement("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M16 3L20 7V20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V4C4 3.44772 4.44772 3 5 3H16ZM18.5 8H16.4C15.6268 8 15 7.3732 15 6.6V4.5H5.5V19.5H18.5V8ZM13.8295 10H10.304L8.89844 18H10.4806L10.9441 15.3719H12.8092L12.9324 15.3712C13.5739 15.3629 13.9661 15.2854 14.3289 15.0349C14.7771 14.7326 15.0153 14.2233 15.1945 13.2711L15.4041 12.1514C15.4881 11.6856 15.526 11.3497 15.526 11.0885C15.526 10.2784 15.0454 10 13.8295 10ZM11.6555 11.3016L13.2982 11.302L13.4412 11.3055C13.8118 11.3211 13.8951 11.3881 13.8951 11.5839C13.8951 11.6376 13.8916 11.6838 13.8757 11.7927L13.8099 12.2078L13.711 12.7937L13.6771 12.9836C13.5069 13.8847 13.3177 14.0716 12.6441 14.0716H11.1747L11.6555 11.3016Z",
			fill: "#454D5A",
			style: Le(Le({ fill: "#454D5A" }, "fill", "color(display-p3 0.2706 0.3020 0.3529)"), "fillOpacity", 1)
		}));
	};
	e$11(".ai-component-pc-message-card {\n  display: flex;\n  padding: 16px;\n  flex-direction: column;\n  gap: 16px;\n  border-radius: 20px;\n  border: 1px solid var(--border-strong, rgba(0, 0, 0, 0.12));\n  background-color: var(--bg-lv1-default, #fff);\n}\n.ai-component-pc-message-card-disabled {\n  pointer-events: none;\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.ai-component-pc-message-card-item > span[contenteditable] {\n  border-radius: 12px;\n  width: 100%;\n  box-sizing: border-box;\n  min-height: 44px;\n  padding: 11px 12px;\n  border: 1px solid var(--border-strong, rgba(0, 0, 0, 0.12));\n}\n.ai-component-pc-message-card-item > span[contenteditable]:empty::before {\n  content: attr(placeholder);\n}\n.ai-component-pc-message-card-item-title {\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  font-size: 16px;\n  font-weight: 600;\n  line-height: 26px;\n  margin-bottom: 8px;\n}\n.ai-component-pc-message-card-button {\n  display: flex;\n  height: 32px;\n  padding: 0px 12px;\n  justify-content: center;\n  align-items: center;\n  gap: 2px;\n  border-radius: 20px;\n  background: var(--tsp-fill-medium, rgba(29, 79, 106, 0.08));\n}\n.ai-component-pc-message-card-button-icon {\n  width: 20px;\n  height: 20px;\n}\n.ai-component-pc-message-card-requirement {\n  display: flex;\n  gap: 8px;\n}\n");
	De = "ai-component-pc-message-card", Ne$1 = function(e) {
		var n = e.children, r = e.className, i = e.disabled, o = void 0 !== i && i;
		return import_react$6.createElement("div", { className: (0, import_classnames$2.default)("".concat(De), a$19({}, "".concat(De, "-disabled"), o), r) }, n);
	};
	Ne$1.Item = function(e) {
		var n = e.title, r = e.children;
		return import_react$6.createElement("div", { className: "".concat(De, "-item") }, import_react$6.createElement("div", { className: "".concat(De, "-item-title") }, n), r);
	};
	Ze = function(e) {
		var n, i, o, a, l = e.message, c = e.initialFiles, s = void 0 === c ? [] : c, u = e.isHistoryMessage, p = void 0 !== u && u, d = e.onClick, v = e.onEditFunctionCall, h = t$9((0, import_react$6.useState)({ title: (null === (n = s[0]) || void 0 === n ? void 0 : n.name) || "" }), 2), b = h[0], C = h[1];
		return import_react$6.createElement(import_react$6.Fragment, null, import_react$6.createElement(Ne$1, { disabled: p }, import_react$6.createElement(Ne$1.Item, { title: i$17("slide.theme-card.title") }, import_react$6.createElement(D$6, {
			value: (null === (i = s[0]) || void 0 === i ? void 0 : i.name) || "",
			minRows: 1,
			bordered: !0,
			placeholder: i$17("slide.theme-card.placeholder", { content: function(e) {
				switch (e) {
					case "mind": return i$17("slide.theme-card.mind");
					case "flowchart": return i$17("slide.theme-card.flowchart");
					default: return i$17("slide.theme-card.document");
				}
			}(null == l || null === (o = l.functionCall) || void 0 === o || null === (o = o.parameter) || void 0 === o ? void 0 : o.category) }),
			onChange: function(e) {
				C(Be(Be({}, b), {}, { title: e })), v?.({
					title: b.title,
					files: b.files
				});
			}
		})), import_react$6.createElement(Ne$1.Item, { title: i$17("slide.theme-card.attachment-upload") }, import_react$6.createElement(Ae, {
			menuItem: [
				A.Online,
				A.Local,
				A.Url
			],
			initialFiles: s,
			onChange: function(e) {
				var n = (null == e ? void 0 : e.map((function(e) {
					return e.getTask().file;
				})).filter(Boolean)) || [];
				C(Be(Be({}, b), {}, { files: n })), v?.({
					title: b.title,
					files: n
				});
			}
		}))), import_react$6.createElement("div", null, import_react$6.createElement(Button_default, {
			className: "ai-component-pc-message-card-button",
			disabled: !b.title || p,
			onClick: function() {
				var e, n = function() {
					var e, n, t = (null === (e = b.files) || void 0 === e ? void 0 : e.filter((function(e) {
						return e.type !== L$5.LINK;
					}))) || [], r = (null === (n = b.files) || void 0 === n ? void 0 : n.filter((function(e) {
						return e.type === L$5.LINK;
					})).map((function(e) {
						return e.url;
					}))) || [];
					if (t.length || r.length) return {
						files: t,
						urls: r
					};
				}();
				d?.(Be({
					action: {
						type: E$9.GENERATION_DOCUMENT_CONTENT,
						generationDocumentContent: {
							category: null == l || null === (e = l.functionCall) || void 0 === e || null === (e = e.parameter) || void 0 === e ? void 0 : e.category,
							content: b.title
						}
					},
					displayInHistory: !0
				}, n && { resource: n }));
			},
			icon: import_react$6.createElement(Fe$1, {
				className: "ai-component-pc-message-card-button-icon",
				viewBox: "0 0 24 24"
			})
		}, function(e) {
			switch (e) {
				case "mind": return i$17("slide.theme-card.continue-generate-mind");
				case "flowchart": return i$17("slide.theme-card.continue-generate-flowchart");
				default: return i$17("slide.theme-card.continue-generate-document");
			}
		}(null == l || null === (a = l.functionCall) || void 0 === a || null === (a = a.parameter) || void 0 === a ? void 0 : a.category))));
	};
	qe = function(e) {
		var n, i, o = e.initialFiles, a = void 0 === o ? [] : o, l = e.isHistoryMessage, c = void 0 !== l && l, s = e.onClick, u = e.onEditFunctionCall, d = t$9((0, import_react$6.useState)({ title: (null === (n = a[0]) || void 0 === n ? void 0 : n.name) || "" }), 2), v = d[0], g = d[1];
		return import_react$6.createElement(import_react$6.Fragment, null, import_react$6.createElement(Ne$1, { disabled: c }, import_react$6.createElement(Ne$1.Item, { title: i$17("slide.theme-card.title") }, import_react$6.createElement(D$6, {
			value: (null === (i = a[0]) || void 0 === i ? void 0 : i.name) || "",
			minRows: 1,
			bordered: !0,
			placeholder: i$17("slide.theme-card.placeholder", { content: i$17("slide.theme-card.ppt") }),
			onChange: function(e) {
				g(Ue(Ue({}, v), {}, { title: e })), u?.({
					title: v.title,
					files: v.files
				});
			}
		})), import_react$6.createElement(Ne$1.Item, { title: i$17("slide.theme-card.attachment-upload") }, import_react$6.createElement(Ae, {
			initialFiles: a,
			onChange: function(e) {
				var n = (null == e ? void 0 : e.map((function(e) {
					return e.getTask().file;
				})).filter(Boolean)) || [];
				g(Ue(Ue({}, v), {}, { files: n })), u?.({
					title: v.title,
					files: n
				});
			}
		})), import_react$6.createElement(Ne$1.Item, { title: i$17("slide.theme-card.requirement") }, import_react$6.createElement(D$2, {
			horizontalScrollable: !0,
			onChange: function(e) {
				g(Ue(Ue({}, v), e));
			}
		}))), import_react$6.createElement("div", null, import_react$6.createElement(Button_default, {
			className: "ai-component-pc-message-card-button",
			disabled: !v.title || c,
			onClick: function() {
				var e, n, t, r = function() {
					var e, n, t = (null === (e = v.files) || void 0 === e ? void 0 : e.filter((function(e) {
						return e.type !== L$5.LINK;
					}))) || [], r = (null === (n = v.files) || void 0 === n ? void 0 : n.filter((function(e) {
						return e.type === L$5.LINK;
					})).map((function(e) {
						return e.url;
					}))) || [];
					if (t.length || r.length) return {
						files: t,
						urls: r
					};
				}();
				localStorage.setItem("pptEnableImageGeneration", "".concat(!!v.imageGeneration)), s?.(Ue({
					action: {
						type: E$9.GEN_OUTLINE,
						genOutline: {
							input: v.title,
							category: "slide",
							genre: "slide_outline",
							topic: v.title,
							slidePageType: null !== (e = null == v ? void 0 : v[I.pageNum]) && void 0 !== e ? e : 0,
							frontendState: {
								theme: v.title,
								templateTags: [null == v ? void 0 : v[I.templateColor], null == v ? void 0 : v[I.templateStyle]].filter(Boolean),
								enableImageGeneration: null === (n = null == v ? void 0 : v[I.imageGeneration]) || void 0 === n || n,
								input: v.title,
								attachments: v.files || [],
								pageNum: null !== (t = null == v ? void 0 : v[I.pageNum]) && void 0 !== t ? t : 0,
								createFileStatus: "none"
							}
						}
					},
					displayInHistory: !0
				}, r && { resource: r }));
			},
			icon: import_react$6.createElement(Fe$1, {
				className: "ai-component-pc-message-card-button-icon",
				viewBox: "0 0 24 24"
			})
		}, i$17("slide.theme-card.continue-generate-slide"))));
	}, ze = "ai-component-pc-external-tips-btn-card", We = function(e) {
		var n = e.tips, r = e.onClick, i = e.btnText;
		return import_react$6.createElement("div", { className: "".concat(ze) }, n ? import_react$6.createElement("div", { className: "".concat(ze, "-tips") }, n) : null, import_react$6.createElement("div", {
			className: "".concat(ze, "-btn"),
			onClick: r
		}, i));
	};
	e$11(".ai-component-pc-external-tips-btn-card {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  align-items: flex-start;\n}\n.ai-component-pc-external-tips-btn-card-tips {\n  color: var(--text-medium, rgba(0, 0, 0, 0.48));\n  font-size: 14px;\n  font-weight: 400;\n  line-height: 22px;\n}\n.ai-component-pc-external-tips-btn-card-btn {\n  border-radius: 20px;\n  border: 1px solid var(--border-color, rgba(0, 0, 0, 0.12));\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 32px;\n  padding: 0px 12px;\n  font-size: 14px;\n  font-weight: 600;\n  line-height: 20px;\n  cursor: pointer;\n}\n.ai-component-pc-external-tips-btn-card-btn:hover {\n  background-color: var(--feedback-hover, rgba(51, 77, 102, 0.06));\n}\n");
	Qe = function(e) {
		var n, r, i, o, a, l, c, s, u, p, d, m, v, g, h = e.message, b = e.functionCallProps, C = e.isHistoryMessage, y = e.onEditFunctionCall;
		return h.functionCall ? import_react$6.createElement(l$15, { case: void 0 }, import_react$6.createElement(l$15.Case, { case: "createDocuments" === h.functionCall.name && "slide" === (null === (n = h.functionCall.parameter) || void 0 === n ? void 0 : n.category) }, import_react$6.createElement(qe, {
			initialFiles: (null == h || null === (r = h.functionCall) || void 0 === r || null === (r = r.parameter) || void 0 === r ? void 0 : r.files) || [],
			isHistoryMessage: C,
			onClick: function(e) {
				var n, t;
				return null == b || null === (n = b.slide) || void 0 === n || null === (t = n.createSlide) || void 0 === t ? void 0 : t.call(n, e);
			},
			onEditFunctionCall: y
		})), import_react$6.createElement(l$15.Case, { case: "createDocuments" === h.functionCall.name && [
			"mind",
			"flowchart",
			"doc",
			"smartcanvas"
		].includes((null === (i = h.functionCall.parameter) || void 0 === i ? void 0 : i.category) || "") }, import_react$6.createElement(Ze, {
			initialFiles: (null == h || null === (o = h.functionCall) || void 0 === o || null === (o = o.parameter) || void 0 === o ? void 0 : o.files) || [],
			isHistoryMessage: C,
			message: h,
			onClick: function(e) {
				var n, t;
				return null == b || null === (n = b.slide) || void 0 === n || null === (t = n.createMind) || void 0 === t ? void 0 : t.call(n, e);
			},
			onEditFunctionCall: y
		})), import_react$6.createElement(l$15.Case, { case: "changeThemeColor" === h.functionCall.name }, import_react$6.createElement(We, {
			tips: null == b || null === (a = b.slide) || void 0 === a || null === (l = a.changeThemeColorTips) || void 0 === l ? void 0 : l.call(a),
			btnText: i$17("slide.external-interaction-card.change-theme-color-btn-text"),
			onClick: function() {
				var e, n;
				null == b || null === (e = b.slide) || void 0 === e || null === (n = e.changeThemeColor) || void 0 === n || n.call(e);
			}
		})), import_react$6.createElement(l$15.Case, { case: "changeTemplate" === h.functionCall.name }, import_react$6.createElement(We, {
			tips: null == b || null === (c = b.slide) || void 0 === c || null === (s = c.changeTemplateTips) || void 0 === s ? void 0 : s.call(c),
			btnText: i$17("slide.external-interaction-card.change-template-btn-text"),
			onClick: function() {
				var e, n;
				null == b || null === (e = b.slide) || void 0 === e || null === (n = e.changeTemplate) || void 0 === n || n.call(e);
			}
		})), import_react$6.createElement(l$15.Case, { case: "changeFont" === h.functionCall.name }, import_react$6.createElement(We, {
			tips: null == b || null === (u = b.slide) || void 0 === u || null === (p = u.changeFontSizeTips) || void 0 === p ? void 0 : p.call(u),
			btnText: i$17("slide.external-interaction-card.change-font-size-btn-text"),
			onClick: function() {
				var e, n;
				null == b || null === (e = b.slide) || void 0 === e || null === (n = e.changeFontSize) || void 0 === n || n.call(e);
			}
		})), import_react$6.createElement(l$15.Case, { case: "xxx" === h.functionCall.name }, import_react$6.createElement(We, {
			tips: null == b || null === (d = b.slide) || void 0 === d || null === (m = d.checkLayoutTips) || void 0 === m ? void 0 : m.call(d),
			btnText: i$17("slide.external-interaction-card.check-layout-btn-text"),
			onClick: function() {
				var e, n;
				null == b || null === (e = b.slide) || void 0 === e || null === (n = e.checkLayout) || void 0 === n || n.call(e);
			}
		})), import_react$6.createElement(l$15.Case, { case: "xxx" === h.functionCall.name }, import_react$6.createElement(We, {
			tips: null == b || null === (v = b.slide) || void 0 === v || null === (g = v.correctTextTips) || void 0 === g ? void 0 : g.call(v),
			btnText: i$17("slide.external-interaction-card.correct-text-btn-text"),
			onClick: function() {
				var e, n;
				null == b || null === (e = b.slide) || void 0 === e || null === (n = e.correctText) || void 0 === n || n.call(e);
			}
		})), import_react$6.createElement(l$15.Case, { case: "createDocuments" === h.functionCall.name }, i$17("function-call.default"))) : null;
	};
	Xe = function(e) {
		return import_react$5.createElement("svg", $e({
			width: "24px",
			height: "24px",
			viewBox: "0 0 24 24",
			xmlns: "http://www.w3.org/2000/svg",
			xmlnsXlink: "http://www.w3.org/1999/xlink"
		}, e), Ke || (Ke = import_react$5.createElement("title", null, "longpress_add_row_list")), Je || (Je = import_react$5.createElement("g", {
			id: "Mobile",
			stroke: "none",
			strokeWidth: 1,
			fill: "none",
			fillRule: "evenodd"
		}, import_react$5.createElement("g", {
			id: "Mobile/\\u957F\\u6309\\u83DC\\u5355/\\u63D2\\u5165\\u884C\\u5217",
			fill: "#FFFFFF",
			fillRule: "nonzero"
		}, import_react$5.createElement("path", {
			d: "M20,18 L20,19.5 L4,19.5 L4,18 L20,18 Z M19,9 C19.5522847,9 20,9.44771525 20,10 L20,14 C20,14.5522847 19.5522847,15 19,15 L11,15 C10.4477153,15 10,14.5522847 10,14 L10,10 C10,9.44771525 10.4477153,9 11,9 L19,9 Z M4.22938443,9 C4.28304582,9 4.33500894,9.01774606 4.37623276,9.05015057 L7.91745815,11.8337752 C8.01478067,11.9102768 8.02792991,12.0467138 7.94682782,12.1385157 L7.91745815,12.1662193 L4.37623276,14.949844 C4.27891025,15.0263456 4.13426853,15.0139422 4.05316643,14.9221403 C4.01881324,14.8832549 4,14.8342394 4,14.783622 L4,9.21637261 C4,9.09687332 4.10269891,9 4.22938443,9 Z M18.5,10.5 L11.5,10.5 L11.5,13.5 L18.5,13.5 L18.5,10.5 Z M20,4.5 L20,6 L4,6 L4,4.5 L20,4.5 Z",
			id: "\\u5F62\\u72B6\\u7ED3\\u5408"
		})))));
	};
	tn = function(e) {
		return import_react$5.createElement("svg", en({
			width: 24,
			height: 24,
			viewBox: "0 0 24 24",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg"
		}, e), import_react$5.createElement("path", {
			d: "M20 7V20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V4C4 3.44772 4.44772 3 5 3H16L20 7ZM5.5 19.5H18.5V8H16.4004C15.6272 8 15 7.37281 15 6.59961V4.5H5.5V19.5ZM10.75 11.5H9V16.5H10.75V18H7.5V10H10.75V11.5ZM16.5 18H13.25V16.5H15V11.5H13.25V10H16.5V18Z",
			fill: "#454D5A",
			style: nn(nn({ fill: "#454D5A" }, "fill", "color(display-p3 0.2706 0.3020 0.3529)"), "fillOpacity", 1)
		}));
	};
	ln = function(e) {
		return import_react$5.createElement("svg", on({
			width: 24,
			height: 24,
			viewBox: "0 0 24 24",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg"
		}, e), import_react$5.createElement("path", {
			d: "M20 7V20L19.9951 20.1025C19.9472 20.573 19.573 20.9472 19.1025 20.9951L19 21H5L4.89746 20.9951C4.42703 20.9472 4.05278 20.573 4.00488 20.1025L4 20V4C4 3.48232 4.39333 3.05621 4.89746 3.00488L5 3H16L20 7ZM5.5 19.5H18.5V8H16.4004C15.6272 8 15 7.37281 15 6.59961V4.5H5.5V19.5ZM16.0908 10.5908L14.4844 12.166L13.5674 11.25H10.5C10.0858 11.25 9.75 11.5858 9.75 12C9.75 12.4142 10.0858 12.75 10.5 12.75H13.625C14.7986 12.75 15.75 13.7014 15.75 14.875C15.75 16.048 14.8001 16.9999 13.626 17H10.2666V17.4834H8.0166V15.2334H10.2666V15.5H13.626C13.9705 15.4999 14.25 15.2207 14.25 14.875C14.25 14.5298 13.9702 14.25 13.625 14.25H10.5C9.25736 14.25 8.25 13.2426 8.25 12C8.25 10.7574 9.25736 9.75 10.5 9.75H13.7344L14.5 9L16.0908 10.5908Z",
			fill: "#454D5A",
			style: an(an({ fill: "#454D5A" }, "fill", "color(display-p3 0.2706 0.3020 0.3529)"), "fillOpacity", 1)
		}));
	};
	pn = function(e) {
		return import_react$5.createElement("svg", sn({
			width: 24,
			height: 24,
			viewBox: "0 0 24 24",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg"
		}, e), import_react$5.createElement("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M16 3L20 7V20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V4C4 3.44772 4.44772 3 5 3H16ZM18.5 8H16.4C15.6268 8 15 7.3732 15 6.6V4.5H5.5V19.5H18.5V8ZM11.5354 15.2426L15.7782 10.9999L17.1924 12.4141L12.9496 16.6569L12.9497 16.657L11.5355 18.0712L8 14.5356L9.41421 13.1214L11.5354 15.2426Z",
			fill: "#454D5A",
			style: un(un({ fill: "#454D5A" }, "fill", "color(display-p3 0.2706 0.3020 0.3529)"), "fillOpacity", 1)
		}));
	};
	vn = function(e) {
		return import_react$5.createElement("svg", mn({
			width: 24,
			height: 24,
			viewBox: "0 0 24 24",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg"
		}, e), import_react$5.createElement("path", {
			d: "M20 7V20L19.9951 20.1025C19.9472 20.573 19.573 20.9472 19.1025 20.9951L19 21H5L4.89746 20.9951C4.42703 20.9472 4.05278 20.573 4.00488 20.1025L4 20V4C4 3.48232 4.39333 3.05621 4.89746 3.00488L5 3H16L20 7ZM5.5 19.5H18.5V8H16.4004C15.6272 8 15 7.37281 15 6.59961V4.5H5.5V19.5ZM15.25 10C15.9404 10 16.5 10.5596 16.5 11.25C16.5 11.9404 15.9404 12.5 15.25 12.5C14.8415 12.5 14.4801 12.3031 14.252 12H11.25C10.5967 12 10.0272 12.3581 9.72656 12.8887C9.89815 13.1326 10 13.4291 10 13.75C10 14.0706 9.89787 14.3666 9.72656 14.6104C10.0271 15.1413 10.5964 15.5 11.25 15.5H14.252C14.4801 15.1969 14.8415 15 15.25 15C15.9404 15 16.5 15.5596 16.5 16.25C16.5 16.9404 15.9404 17.5 15.25 17.5C14.8415 17.5 14.4801 17.3031 14.252 17H11.25C9.9932 17 8.904 16.2861 8.36328 15.2422C7.599 15.1731 7 14.5323 7 13.75C7 12.9677 7.59896 12.3259 8.36328 12.2568C8.90414 11.2133 9.99351 10.5 11.25 10.5H14.252C14.4801 10.1969 14.8415 10 15.25 10Z",
			fill: "#454D5A",
			style: fn(fn({ fill: "#454D5A" }, "fill", "color(display-p3 0.2706 0.3020 0.3529)"), "fillOpacity", 1)
		}));
	};
	Cn = function(e) {
		return import_react$5.createElement("svg", hn({
			width: 24,
			height: 24,
			viewBox: "0 0 24 24",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg"
		}, e), import_react$5.createElement("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M20 4C20 3.44772 19.5523 3 19 3H4.99986C4.44758 3 3.99986 3.44772 4 4V20C4 20.5523 4.44772 21 5 21H19C19.5523 21 20 20.5523 20 20V4ZM5.5 19.5V4.499H18.5V19.5H5.5ZM11.6819 11.3052C11.7888 11.1201 12.056 11.1201 12.1629 11.3052L13.9563 14.4091C14.07 14.6059 14.0523 14.8522 13.9116 15.0308L12.1406 17.2786C12.0294 17.4198 11.8154 17.4198 11.7042 17.2786L9.93321 15.0308C9.7925 14.8522 9.77481 14.6059 9.88855 14.4091L11.6819 11.3052ZM11.9225 10.3333C12.843 10.3333 13.5892 9.58714 13.5892 8.66667C13.5892 7.74619 12.843 7 11.9225 7C11.0021 7 10.2559 7.74619 10.2559 8.66667C10.2559 9.58714 11.0021 10.3333 11.9225 10.3333Z",
			fill: "#454D5A",
			style: bn(bn({ fill: "#454D5A" }, "fill", "color(display-p3 0.2706 0.3020 0.3529)"), "fillOpacity", 1)
		}));
	};
	wn = function(e) {
		return import_react$5.createElement("svg", xn({
			width: 24,
			height: 24,
			viewBox: "0 0 24 24",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg"
		}, e), import_react$5.createElement("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M16 3L20 7V20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V4C4 3.44772 4.44772 3 5 3H16ZM18.5 8H16.4C15.6268 8 15 7.3732 15 6.6V4.5H5.5V19.5H18.5V8ZM11.3254 10H9.4751L11.1232 13.7776L8 18H9.97906L11.8374 15.4075L12.9779 18H14.8501L13.0872 13.9998L16 10H14.0559L12.372 12.3764L11.3254 10Z",
			fill: "#454D5A",
			style: En(En({ fill: "#454D5A" }, "fill", "color(display-p3 0.2706 0.3020 0.3529)"), "fillOpacity", 1)
		}));
	};
	Mn = function(e) {
		return import_react$5.createElement("svg", _n({
			width: 24,
			height: 24,
			viewBox: "0 0 24 24",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg"
		}, e), import_react$5.createElement("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M16 3L20 7V20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V4C4 3.44772 4.44772 3 5 3H16ZM18.5 8H16.4C15.6268 8 15 7.3732 15 6.6V4.5H5.5V19.5H18.5V8ZM9.25067 10H7.66992L7.76503 18H9.58669L12.0235 12.5115L12.3455 18H14.1654L17.3569 10H15.9163L13.6994 15.7398L13.4092 10H11.7455L9.23091 15.735L9.25067 10Z",
			fill: "#454D5A",
			style: On(On({ fill: "#454D5A" }, "fill", "color(display-p3 0.2706 0.3020 0.3529)"), "fillOpacity", 1)
		}));
	};
	e$11(".ai-component-pc-message-buttons {\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n}\n.ai-component-pc-message-buttons-button {\n  display: flex;\n  height: 32px;\n  padding: 0px 12px;\n  justify-content: center;\n  align-items: center;\n  gap: 2px;\n  border-radius: 20px;\n  background: var(--tsp-fill-medium, rgba(29, 79, 106, 0.08));\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  border: 0;\n  font-family: 'PingFang SC';\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 20px;\n}\n.ai-component-pc-message-buttons-button .dui-button-container {\n  gap: 2px;\n}\n.ai-component-pc-message-buttons-button .dui-button-container svg {\n  width: 20px;\n  height: 20px;\n}\n.ai-component-pc-message-buttons-button .dui-button-container svg path {\n  fill: var(--text-ultrastrong, rgba(0, 0, 0, 0.88)) !important;\n}\n.ai-component-pc-message-buttons-button-icon {\n  width: 20px;\n  height: 20px;\n}\n.ai-component-pc-message-buttons-divider {\n  margin: 20px 0 0px;\n  height: 1px;\n  background-color: rgba(0, 0, 0, 0.24);\n}\n");
	Tn = function(e, n) {
		var t;
		return (a$19(a$19(a$19(a$19(a$19(a$19(a$19(a$19(a$19(a$19(t = {}, o$8.CREATE_SLIDE, i$17("message-buttons.create-slide")), o$8.CREATE_MINDMAP, i$17("message-buttons.create-mindmap")), o$8.CREATE_FLOW_CHART, i$17("message-buttons.create-flow-chart")), o$8.CREATE_FORM, i$17("message-buttons.create-form")), o$8.CREATE_SHEET, i$17("message-buttons.create-sheet")), o$8.CREATE_RESUME, i$17("message-buttons.create-resume")), o$8.CREATE_SMART_CANVAS, i$17(n ? "message-buttons.outline-create-all-document" : "message-buttons.create-smart-canvas")), o$8.CREATE_DOC, i$17(n ? "message-buttons.outline-create-all-document" : "message-buttons.create-document")), o$8.APPEND_REMARK, i$17("message-buttons.append-remark")), o$8.INSERT_CONTENT, i$17("message-buttons.insert-content")), a$19(t, o$8.MIND_INSERT_TO_FILE, i$17("message-buttons.insert-content")))[e] || "";
	}, Hn = function(e) {
		var n = e.message, r = e.isHistoryMessage, i = e.handleCreateSlide, o = e.handleCreateMindMap, a = e.handleCreateFlowChart, l = e.handleCreateForm, c = e.handleCreateSheet, s = e.handleCreateResume, u = e.handleCreateSmartCanvas, p = e.handleCreateDoc, d = e.handleDefaultClick;
		if (!("buttons" in n)) return null;
		var m = n.buttons, f = void 0 === m ? [] : m, v = n.description;
		if (null == f || !f.length) return null;
		var g = function() {
			return !r && (null == v ? void 0 : v.editable);
		};
		return import_react$6.createElement("div", { className: "ai-component-pc-message-buttons" }, f.map((function(e) {
			return Tn(e.type, g()) ? import_react$6.createElement(Button_default, {
				className: "ai-component-pc-message-buttons-button",
				key: e.type,
				icon: (n = e.type, a$19(a$19(a$19(a$19(a$19(a$19(a$19(a$19(a$19(a$19({}, o$8.CREATE_SLIDE, import_react$6.createElement(Fe$1, { viewBox: "0 0 24 24" })), o$8.CREATE_MINDMAP, import_react$6.createElement(vn, { viewBox: "0 0 24 24" })), o$8.CREATE_FLOW_CHART, import_react$6.createElement(ln, { viewBox: "0 0 24 24" })), o$8.CREATE_FORM, import_react$6.createElement(pn, { viewBox: "0 0 24 24" })), o$8.CREATE_SHEET, import_react$6.createElement(wn, { viewBox: "0 0 24 24" })), o$8.CREATE_RESUME, import_react$6.createElement(Cn, { viewBox: "0 0 24 24" })), o$8.CREATE_SMART_CANVAS, import_react$6.createElement(tn, { viewBox: "0 0 24 24" })), o$8.CREATE_DOC, import_react$6.createElement(Mn, { viewBox: "0 0 24 24" })), o$8.INSERT_CONTENT, import_react$6.createElement(Xe, { viewBox: "0 0 24 24" })), o$8.MIND_INSERT_TO_FILE, import_react$6.createElement(Xe, { viewBox: "0 0 24 24" }))[n] || import_react$6.createElement(pn, { viewBox: "0 0 24 24" })),
				onClick: function() {
					return function(e) {
						switch (e.type) {
							case o$8.CREATE_SLIDE:
								i?.();
								break;
							case o$8.CREATE_MINDMAP:
								o?.();
								break;
							case o$8.CREATE_FLOW_CHART:
								a?.();
								break;
							case o$8.CREATE_FORM:
								l?.();
								break;
							case o$8.CREATE_SHEET:
								c?.();
								break;
							case o$8.CREATE_RESUME:
								s?.();
								break;
							case o$8.CREATE_SMART_CANVAS:
								u?.();
								break;
							case o$8.CREATE_DOC:
								p?.();
								break;
							default: d?.(e);
						}
					}(e);
				}
			}, Tn(e.type, g())) : null;
			var n;
		})));
	};
	(function(e) {
		e.MIND = "https://docs.qq.com/mind/viewer/", e.FLOWCHART = "https://docs.qq.com/flowchart/viewer/";
	})(kn || (kn = {}));
	An = function(e) {
		var n, i = e.message, a = e.markdownText, l = e.onPushMessage, u = (0, import_react$6.useRef)(null), d = t$9((0, import_react$6.useState)(void 0), 2), v = d[0], g = d[1], h = (0, import_react$6.useContext)(Ee$1), b = null !== (n = i.description) && void 0 !== n && n.isMindOutline ? kn.MIND : kn.FLOWCHART, C = i.messageStatus === M$4.FINISH, y = function() {
			if (l) return function(e) {
				l?.(In(In({}, e), {}, { displayInHistory: !0 }));
			};
		}, x = !!("buttons" in i);
		(0, import_react$6.useEffect)((function() {
			if (x) {
				var e = function(e) {
					var n = e.data;
					if ("SEND_DATA" === (null == n ? void 0 : n.command)) {
						var t, r;
						if ("0" !== (null == n || null === (t = n.params) || void 0 === t ? void 0 : t.code)) {
							var o, a = null !== (o = i.description) && void 0 !== o && o.isMindOutline ? i$17("category-name.mindMap") : i$17("category-name.flowChart");
							Snackbar_default.show({
								message: i$17("toast.create-file-failed", { type: a }),
								type: "error"
							});
							return;
						}
						g(null == n || null === (r = n.params) || void 0 === r ? void 0 : r.data);
					}
				};
				return window.addEventListener("message", e), function() {
					return window.removeEventListener("message", e);
				};
			}
		}), [x]);
		var w, S;
		return import_react$6.createElement(import_react$6.Fragment, null, i.messageStatus === M$4.IN_PROGRESS || i.messageStatus === M$4.FINISH ? import_react$6.createElement(T$4, {
			type: b,
			value: (S = a, null !== (w = i.description) && void 0 !== w && w.isMindOutline && (S = ae(S)), S),
			done: C,
			origin: "https://docs.qq.com",
			ref: u,
			callback: function() {
				var e, n, t, r = null === (e = u.current) || void 0 === e || null === (n = e.getIframe) || void 0 === n ? void 0 : n.call(e);
				null == r || null === (t = r.contentWindow) || void 0 === t || t.postMessage({ command: "GET_DATA" }, "https://docs.qq.com");
			}
		}) : null, import_react$6.createElement(Hn, {
			message: i,
			handleCreateMindMap: function() {
				C$8.createMindMap({
					originChartData: v,
					text: a,
					conversationId: h,
					parentMessageId: i.parentMessageId || "",
					onCb: y()
				});
			},
			handleCreateFlowChart: function() {
				C$8.createFlowChart({
					originChartData: v,
					text: a,
					conversationId: h,
					parentMessageId: i.parentMessageId || "",
					onCb: y()
				});
			},
			handleDefaultClick: function(e) {
				return null == l ? void 0 : l(In(In({}, e), {}, { isButtonMessage: !0 }));
			}
		}));
	}, jn = new Map([
		[R$3.SOURCE_DOC, "doc"],
		[R$3.SOURCE_PDF, "pdf"],
		[R$3.SOURCE_MIND, "mind"],
		[R$3.SOURCE_SMARTCANVAS, "smartcanvas"]
	]), Pn = function(e) {
		var n, r = e.source, i = e.visible, o = e.query, a = e.handleVisibleChange, l = e.onConfirm, s = (0, import_react$6.useRef)(null);
		return o$13(i, {
			container: s.current,
			onConfirm: l,
			showNavigation: !0,
			useOutlinePreview: !0,
			showImageGeneration: !l$13(),
			aid: (n = getAidForReport({
				feature: "template-ai",
				position: "chatpage",
				apprec1: "slide"
			}), r && jn.get(r) && (n = getAidForReport({
				position: "aisidebar",
				feature: "template",
				apprec1: "preview!".concat(jn.get(r)),
				apprec2: "aislide",
				apprec4: "slide"
			})), n),
			aidOptions: {
				position: "aidesktop",
				feature: "space",
				apprec1: "uploadppt"
			},
			query: o,
			handleVisibleChange: a
		}), import_react$6.createElement("div", { ref: s });
	};
	Dn = Pn$1({
		Snackbar: Snackbar_default,
		Tooltip: Tooltip_default,
		Modal: Modal_default
	}), Nn = function(e) {
		var n, a, l = e.source, u = e.message, p = e.markdownText, d = e.onEditOutline, f = e.isHistoryMessage, v = e.hideCreateButton, g = e.showTextSeparator, h = e.onPushMessage, b = e.onActiveChange, y = t$9((0, import_react$6.useState)(!1), 2), x = y[0], E = y[1], w = (0, import_react$6.useContext)(Ee$1), _ = (0, import_react$6.useRef)(null), O = (0, import_react$6.useRef)(), M = (0, import_react$6.useMemo)((function() {
			var e;
			return (null === (e = p.match(/^#(?!#)\s*(.+?)(?:\s*#*)?$/m)) || void 0 === e || null === (e = e[1]) || void 0 === e ? void 0 : e.trim()) || "";
		}), [p]), k = function() {
			if (h) return function(e) {
				E(!1), h?.(Fn(Fn({}, e), {}, { displayInHistory: !0 }));
			};
		}, T = (0, import_react$6.useMemo)((function() {
			var e;
			return null !== (e = u.description) && void 0 !== e && e.isDocOutline ? q$4.DOC : q$4.PPT;
		}), [u]), H = u.messageStatus === M$4.ERROR ? "" : (null == u || null === (n = u.content) || void 0 === n ? void 0 : n.text) || "", R = (0, import_react$6.useMemo)((function() {
			return u.messageStatus === M$4.IN_PROGRESS;
		}), [u.messageStatus]), I = function() {
			var e = e$8(f$8.mark((function e() {
				var n, t, r;
				return f$8.wrap((function(e) {
					for (;;) switch (e.prev = e.next) {
						case 0:
							if (O.current) {
								e.next = 7;
								break;
							}
							return e.next = 3, O$3.getSlideOutlineExtension();
						case 3: O.current = e.sent, O.current.updateOption({
							id: null == u ? void 0 : u.id,
							content: p
						}), r = (null == u || null === (n = u.description) || void 0 === n ? void 0 : n.slidePageCount) && (null == u || null === (t = u.description) || void 0 === t ? void 0 : t.slidePageCount) <= 5 && (null == u ? void 0 : u.description.slidePageCount) > 0 || !1, O.current.show({
							id: null == u ? void 0 : u.id,
							container: _.current,
							showCover: !r,
							showToc: !r,
							loading: R,
							showFooter: !r,
							onChange: d,
							onActiveChange: b
						});
						case 7:
						case "end": return e.stop();
					}
				}), e);
			})));
			return function() {
				return e.apply(this, arguments);
			};
		}();
		return (0, import_react$6.useEffect)((function() {
			O.current && O.current.updateOption({
				id: null == u ? void 0 : u.id,
				content: p
			});
		}), [p]), (0, import_react$6.useEffect)((function() {
			var e;
			null === (e = O.current) || void 0 === e || e.updateOption({
				id: null == u ? void 0 : u.id,
				loading: R
			});
		}), [R]), (0, import_react$6.useEffect)((function() {
			T === q$4.PPT && H && _.current && I();
		}), [e, T]), H ? import_react$6.createElement(import_react$6.Fragment, null, T === q$4.PPT ? import_react$6.createElement("div", { ref: _ }) : import_react$6.createElement(Dn, {
			value: p,
			readonly: u.messageStatus === M$4.IN_PROGRESS || f,
			onChange: function(e) {
				d?.(e.text);
			},
			config: { writingInfo: { templateID: (null === (a = u.description) || void 0 === a ? void 0 : a.genre) || "" } },
			type: T,
			showTextSeparator: g
		}), !v && import_react$6.createElement(Hn, {
			isHistoryMessage: f,
			message: u,
			handleCreateSlide: function() {
				E(!0);
			},
			handleCreateSmartCanvas: function() {
				C$8.createSmartCanvas({
					text: p,
					messageId: u.id,
					parentMessageId: u.parentMessageId || "",
					conversationId: w,
					onError: function() {
						E(!1);
					},
					onSuccess: function() {
						E(!1);
					},
					onCb: k()
				});
			},
			handleCreateDoc: function() {
				C$8.createDoc({
					text: p,
					messageId: u.id,
					parentMessageId: u.parentMessageId || "",
					conversationId: w,
					onError: function() {
						E(!1);
					},
					onSuccess: function() {
						E(!1);
					},
					onCb: k()
				});
			},
			handleDefaultClick: function(e) {
				return null == h ? void 0 : h(Fn(Fn({}, e), {}, { isButtonMessage: !0 }));
			}
		}), import_react$6.createElement(Pn, {
			source: l,
			query: M,
			visible: x,
			handleVisibleChange: function(e) {
				E(e);
			},
			onConfirm: function(e, n) {
				C$8.createSlide({
					templateInfo: e,
					enableImageGeneration: n,
					text: p,
					messageId: u.id,
					parentMessageId: u.parentMessageId || "",
					conversationId: w,
					onError: function() {
						E(!1);
					},
					onSuccess: function() {
						E(!1);
					},
					onCb: k()
				});
			}
		})) : null;
	}, Vn = m$12({
		loadingElement: import_react$6.createElement(Loading_default, {
			visible: !0,
			style: {
				width: 14,
				height: 14
			}
		}),
		markdownComponent: D
	});
	e$11(".ai-component-pc-message-wrapper {\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n  color: var(--text-strong, rgba(0, 0, 0, 0.88));\n}\n");
	Un = function(e) {
		return import_react$5.createElement("svg", Zn({
			width: 24,
			height: 24,
			viewBox: "0 0 24 24",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg"
		}, e), Bn || (Bn = import_react$5.createElement("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M2.59944 12.4256C2.1088 14.2655 3.49562 16.0704 5.39968 16.0704H8.94947C8.72718 16.5708 8.55369 17.0755 8.42899 17.5704C7.77372 20.1709 8.46534 22.5001 10.5 22.5001C12.5836 22.5001 13.037 21.2221 13.5346 19.8195C13.7365 19.2503 13.9457 18.6607 14.2741 18.1275C15.4348 16.2433 16.5462 16.0701 18.5 16.0703C20.1568 16.0702 21.5 14.7271 21.5 13.0703V6.65015C21.5 4.99329 20.1569 3.65015 18.5 3.65015H7.22132C5.85769 3.65015 4.66605 4.56815 4.31977 5.88707C3.70448 8.23057 2.7997 11.6746 2.59944 12.4256ZM20 13.0703C20 13.8986 19.3284 14.5703 18.4999 14.5703C18.3362 14.5703 18.169 14.5653 18 14.5594V5.15015H18.5C19.3284 5.15015 20 5.82172 20 6.65015V13.0703ZM16.5 5.15015V14.5866C16.3227 14.612 16.1487 14.6499 15.9798 14.7053C14.0562 15.3363 12.8537 17.2757 12.2047 19.0829C12.1726 19.1723 12.1415 19.2626 12.1105 19.3528C11.8254 20.1815 11.5437 21.0001 10.5 21.0001C10.0207 21.0001 9.85026 20.5602 9.76233 20.1468C9.41369 18.5077 10.1805 16.876 10.8852 15.3765C11.0136 15.1032 11.14 14.8342 11.2572 14.5704H5.39968C4.48112 14.5704 3.8121 13.6997 4.04879 12.8121C4.25003 12.0575 5.15591 8.6092 5.77059 6.26799C5.94353 5.60931 6.53851 5.15015 7.22132 5.15015H16.5Z",
			fill: "#454D5A"
		})));
	};
	Wn = function(e) {
		return import_react$5.createElement("svg", qn({
			width: 24,
			height: 24,
			viewBox: "0 0 24 24",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg"
		}, e), Gn || (Gn = import_react$5.createElement("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M16.5 3.65015H7.22132C5.85769 3.65015 4.66605 4.56815 4.31977 5.88707C3.70448 8.23057 2.7997 11.6746 2.59944 12.4256C2.1088 14.2655 3.49562 16.0704 5.39968 16.0704H8.94947C8.72718 16.5708 8.55369 17.0755 8.42899 17.5704C7.77372 20.1709 8.46534 22.5001 10.5 22.5001C12.5836 22.5001 13.037 21.2221 13.5346 19.8195C13.7365 19.2503 13.9457 18.6607 14.2741 18.1275C14.9698 16.9982 15.6477 16.4835 16.5 16.2524V3.65015ZM18 16.0754C18.1605 16.0716 18.327 16.0703 18.5 16.0703C20.1568 16.0702 21.5 14.7271 21.5 13.0703V6.65015C21.5 4.99329 20.1569 3.65015 18.5 3.65015H18V16.0754Z",
			fill: "#454D5A"
		})));
	};
	Jn = function(e) {
		return import_react$5.createElement("svg", Kn({
			width: 24,
			height: 24,
			viewBox: "0 0 24 24",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg"
		}, e), zn || (zn = import_react$5.createElement("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M18 4.5H10C9.17157 4.5 8.5 5.17157 8.5 6V7H14C15.6569 7 17 8.34315 17 10V15.5H18C18.8284 15.5 19.5 14.8284 19.5 14V6C19.5 5.17157 18.8284 4.5 18 4.5ZM17 17V18C17 19.6569 15.6569 21 14 21H6C4.34315 21 3 19.6569 3 18V10C3 8.34315 4.34315 7 6 7H7V6C7 4.34315 8.34315 3 10 3H18C19.6569 3 21 4.34315 21 6V14C21 15.6569 19.6569 17 18 17H17ZM4.5 10C4.5 9.17157 5.17157 8.5 6 8.5H14C14.8284 8.5 15.5 9.17157 15.5 10V18C15.5 18.8284 14.8284 19.5 14 19.5H6C5.17157 19.5 4.5 18.8284 4.5 18V10Z",
			fill: "#454D5A"
		})));
	};
	et = function(e) {
		return import_react$5.createElement("svg", $n({
			width: 24,
			height: 24,
			viewBox: "0 0 24 24",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg"
		}, e), import_react$5.createElement("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M14.6051 5.02647C12.9915 4.56849 11.269 4.68416 9.73113 5.35378C8.43759 5.91702 7.34197 6.84287 6.57185 8.01145L7.78945 8.72169C8.35021 9.04879 8.30841 9.87238 7.71741 10.141L4.6594 11.531C4.15563 11.76 3.5771 11.4206 3.53112 10.8692L3.25298 7.53318C3.19919 6.88801 3.89408 6.44948 4.4533 6.77568L5.27457 7.25473C6.2061 5.81195 7.54586 4.66927 9.1323 3.9785C10.9883 3.17033 13.0672 3.03073 15.0146 3.58347C16.9621 4.13621 18.6576 5.3471 19.8123 7.00982C20.9671 8.67253 21.5095 10.6842 21.3473 12.702C21.1852 14.7199 20.3283 16.6191 18.9228 18.076C17.5173 19.5329 15.6502 20.4574 13.6394 20.692C11.6287 20.9266 9.59886 20.4568 7.89573 19.3625C6.19261 18.2683 4.92158 16.6173 4.29923 14.691L5.72659 14.2299C6.24225 15.8259 7.29538 17.1939 8.70655 18.1005C10.1177 19.0072 11.7996 19.3965 13.4656 19.2021C15.1316 19.0078 16.6787 18.2417 17.8433 17.0346C19.0078 15.8274 19.7178 14.2538 19.8522 12.5819C19.9866 10.9099 19.5371 9.24312 18.5803 7.86544C17.6235 6.48777 16.2186 5.48446 14.6051 5.02647Z",
			fill: "#454D5A",
			style: Xn(Xn({ fill: "#454D5A" }, "fill", "color(display-p3 0.2706 0.3020 0.3529)"), "fillOpacity", 1)
		}));
	};
	tt = function(e) {
		return import_react$5.createElement("svg", nt({
			width: 24,
			height: 24,
			viewBox: "0 0 24 24",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg"
		}, e), Yn || (Yn = import_react$5.createElement("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M8.28454 16.9356C10.3143 15.8771 12.344 15.5464 12.344 15.5464V18.2957C12.344 19.6436 13.9835 20.3075 14.9213 19.3394L20.9779 13.0874C22.1049 11.924 22.1049 10.076 20.9779 8.91264L14.9213 2.66057C13.9835 1.69246 12.344 2.35637 12.344 3.70425V7.35085C12.344 7.35085 8.28454 7.35085 4.73253 10.3731C1.81907 13.4117 1.79686 16.9674 2.16266 19.1436C2.33338 20.1593 3.50665 20.4598 4.30039 19.8035C5.50398 18.8083 7.13739 17.5338 8.28454 16.9356ZM13.844 3.70422L19.9005 9.9563C20.464 10.538 20.464 11.462 19.9005 12.0437L13.844 18.2957L13.844 13.7821C13.844 13.7821 9.99993 14 7.59095 15.6056L7.42774 15.7143C5.1619 17.2244 4.72736 17.514 3.57749 18.4557C3.33652 16.5308 3.53814 13.7861 5.81526 11.4112C7.38918 9.76959 10.0818 9.03406 12.294 8.85564C12.6427 8.82751 12.997 8.83021 13.3498 8.8329C13.5151 8.83416 13.6801 8.83542 13.844 8.8335V3.70422Z",
			fill: "#454D5A"
		})));
	};
	e$11(".ai-component-pc-universal-search-actions {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  font-size: 12px;\n}\n.ai-component-pc-universal-search-actions__dropdown {\n  width: 200px;\n  border-radius: 4px;\n  background: var(--bg-lv4-default, #fff);\n  box-shadow: 0px 0px 0px 1px var(--border-weak, rgba(0, 0, 0, 0.04)), 0px 4px 6px 2px var(--border-weak, rgba(0, 0, 0, 0.04)), 0px 6px 32px 2px rgba(0, 0, 0, 0.16);\n  backdrop-filter: blur(8px);\n  padding: 8px 0;\n}\n.ai-component-pc-universal-search-actions__dropdown-title {\n  color: var(--text-medium, rgba(0, 0, 0, 0.48));\n  font-family: 'PingFang SC';\n  font-size: 12px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 16px;\n  padding: 0px 16px 0 19px;\n  height: 30px;\n  display: flex;\n  align-items: center;\n}\n.ai-component-pc-universal-search-actions__dropdown-menu-item {\n  padding: 0px 16px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  height: 30px;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  font-family: 'PingFang SC';\n  font-size: 12px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 16px;\n}\n.ai-component-pc-universal-search-actions__dropdown-menu-item img {\n  margin-right: 8px;\n}\n.ai-component-pc-universal-search-actions__dropdown-menu-item:hover {\n  background-color: var(--feedback-hover, rgba(51, 77, 102, 0.06));\n}\n.ai-component-pc-universal-search-actions__button {\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 4px;\n  background: var(--accent-default, #1e6fff);\n  color: var(--text-white, #fff);\n  font-family: 'PingFang SC';\n  font-size: 12px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 16px;\n  min-width: 116px;\n  padding: 5px 6px;\n  user-select: none;\n}\n.ai-component-pc-universal-search-actions__button .button-menu-doc {\n  margin-right: 4px;\n}\n.ai-component-pc-universal-search-actions__button .button-menu-doc path {\n  fill: var(--fill-white, #fff);\n}\n.ai-component-pc-universal-search-actions__button .button-menu-arrow-container {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n}\n.ai-component-pc-universal-search-actions__button .button-menu-arrow {\n  width: 16px;\n  height: 16px;\n  margin-left: 4px;\n}\n.ai-component-pc-universal-search-actions__button .button-menu-arrow path {\n  fill: #fff !important;\n}\n.ai-component-pc-universal-search-actions__button .button-menu-arrow.button-menu-arrow-active {\n  transform: rotate(180deg);\n}\n.ai-component-pc-universal-search-actions__left {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  color: var(--text-strong, rgba(0, 0, 0, 0.64));\n}\n.ai-component-pc-universal-search-actions__left .button-item {\n  display: flex;\n  align-items: center;\n  gap: 2px;\n  border-radius: 20px;\n  cursor: pointer;\n  padding: 4px 8px;\n  user-select: none;\n}\n.ai-component-pc-universal-search-actions__left .button-item svg {\n  width: 20px;\n  height: 20px;\n  flex: none;\n}\n.ai-component-pc-universal-search-actions__left .button-item svg path {\n  fill: var(--text-strong, rgba(0, 0, 0, 0.64)) !important;\n}\n.ai-component-pc-universal-search-actions__left .button-item:hover {\n  background-color: var(--feedback-hover, rgba(51, 77, 102, 0.06));\n}\n.ai-component-pc-universal-search-actions__left .button-item .create-doc-svg path,\n.ai-component-pc-universal-search-actions__left .button-item .restore-icon-svg path {\n  fill: var(--text-strong, rgba(0, 0, 0, 0.64)) !important;\n}\n.ai-component-pc-universal-search-actions__left img {\n  width: 22px;\n  height: 22px;\n}\n");
	rt = [
		{
			icon: _,
			label: i$17("universalSearchActions.doc"),
			type: o$8.CREATE_DOC
		},
		{
			icon: "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M6.6875 8.3875C6.6875 7.79379 7.16267 7.3125 7.74882 7.3125H19.6887C20.2748 7.3125 20.75 7.79379 20.75 8.3875V19.675C20.75 20.2687 20.2748 20.75 19.6887 20.75H7.74882C7.16267 20.75 6.6875 20.2687 6.6875 19.675V8.3875Z' fill='url(%23paint0_linear_2519_51687)'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M4.8125 3.25C4.12214 3.25 3.5625 3.80964 3.5625 4.5V19.5C3.5625 20.1904 4.12214 20.75 4.8125 20.75H18.5625H19.6562H19.8125V20.7389C19.7615 20.7462 19.7093 20.75 19.6562 20.75C19.0522 20.75 18.5625 20.2603 18.5625 19.6562C18.5625 19.6032 18.5663 19.551 18.5736 19.5H18.5625V4.5C18.5625 3.80964 18.0029 3.25 17.3125 3.25H4.8125Z' fill='url(%23paint1_linear_2519_51687)'/%3e%3cg filter='url(%23filter0_d_2519_51687)'%3e%3crect x='11.6875' y='15.9062' width='4.375' height='1.71875' fill='%23A3F0D4'/%3e%3c/g%3e%3cg filter='url(%23filter1_d_2519_51687)'%3e%3crect x='6.0625' y='15.9062' width='4.375' height='1.71875' fill='%23A3F0D4'/%3e%3c/g%3e%3cg filter='url(%23filter2_d_2519_51687)'%3e%3crect x='11.6875' y='12.9375' width='4.375' height='1.71875' fill='%23E0FBF1'/%3e%3c/g%3e%3cg filter='url(%23filter3_d_2519_51687)'%3e%3crect x='6.0625' y='12.9375' width='4.375' height='1.71875' fill='%23E0FBF1'/%3e%3c/g%3e%3cdefs%3e%3cfilter id='filter0_d_2519_51687' x='11.4208' y='15.3729' width='5.975' height='3.31875' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3e%3cfeFlood flood-opacity='0' result='BackgroundImageFix'/%3e%3cfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3e%3cfeOffset dx='0.533333' dy='0.266667'/%3e%3cfeGaussianBlur stdDeviation='0.4'/%3e%3cfeColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0'/%3e%3cfeBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_2519_51687'/%3e%3cfeBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_2519_51687' result='shape'/%3e%3c/filter%3e%3cfilter id='filter1_d_2519_51687' x='5.79583' y='15.3729' width='5.975' height='3.31875' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3e%3cfeFlood flood-opacity='0' result='BackgroundImageFix'/%3e%3cfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3e%3cfeOffset dx='0.533333' dy='0.266667'/%3e%3cfeGaussianBlur stdDeviation='0.4'/%3e%3cfeColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0'/%3e%3cfeBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_2519_51687'/%3e%3cfeBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_2519_51687' result='shape'/%3e%3c/filter%3e%3cfilter id='filter2_d_2519_51687' x='11.4208' y='12.4042' width='5.975' height='3.31875' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3e%3cfeFlood flood-opacity='0' result='BackgroundImageFix'/%3e%3cfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3e%3cfeOffset dx='0.533333' dy='0.266667'/%3e%3cfeGaussianBlur stdDeviation='0.4'/%3e%3cfeColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0'/%3e%3cfeBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_2519_51687'/%3e%3cfeBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_2519_51687' result='shape'/%3e%3c/filter%3e%3cfilter id='filter3_d_2519_51687' x='5.79583' y='12.4042' width='5.975' height='3.31875' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3e%3cfeFlood flood-opacity='0' result='BackgroundImageFix'/%3e%3cfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3e%3cfeOffset dx='0.533333' dy='0.266667'/%3e%3cfeGaussianBlur stdDeviation='0.4'/%3e%3cfeColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0'/%3e%3cfeBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_2519_51687'/%3e%3cfeBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_2519_51687' result='shape'/%3e%3c/filter%3e%3clinearGradient id='paint0_linear_2519_51687' x1='20.75' y1='11.8888' x2='17.5231' y2='11.8888' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='%23008F4B'/%3e%3cstop offset='1' stop-color='%2300833C'/%3e%3c/linearGradient%3e%3clinearGradient id='paint1_linear_2519_51687' x1='8.57043' y1='-3.27294' x2='-4.6893' y2='12.6985' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='%2300D689'/%3e%3cstop offset='1' stop-color='%2300AA5B'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e",
			label: i$17("universalSearchActions.sheet"),
			type: o$8.CREATE_SHEET
		},
		{
			icon: S$2,
			label: i$17("universalSearchActions.slide"),
			type: o$8.CREATE_SLIDE
		},
		{
			icon: "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M6.6875 8.3875C6.6875 7.79379 7.16267 7.3125 7.74882 7.3125H19.6887C20.2748 7.3125 20.75 7.79379 20.75 8.3875V19.675C20.75 20.2687 20.2748 20.75 19.6887 20.75H7.74882C7.16267 20.75 6.6875 20.2687 6.6875 19.675V8.3875Z' fill='url(%23paint0_linear_2572_52172)'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M4.8125 3.25C4.12214 3.25 3.5625 3.80964 3.5625 4.5V19.5C3.5625 20.1904 4.12214 20.75 4.8125 20.75H18.5625H19.6562H19.8125V20.7389C19.7615 20.7462 19.7093 20.75 19.6562 20.75C19.0522 20.75 18.5625 20.2603 18.5625 19.6562C18.5625 19.6032 18.5663 19.551 18.5736 19.5H18.5625V4.5C18.5625 3.80964 18.0029 3.25 17.3125 3.25H4.8125Z' fill='url(%23paint1_linear_2572_52172)'/%3e%3cg filter='url(%23filter0_d_2572_52172)'%3e%3cpath d='M6.6875 9.8125H8.25V17.9375H6.6875V9.8125Z' fill='%23ECFCFF'/%3e%3cpath d='M8.25 9.8125H9.8125V11.3691H8.25V9.8125Z' fill='%23ECFCFF'/%3e%3cpath d='M8.25 16.3809H9.8125V17.9375L8.25 17.9375V16.3809Z' fill='%23ECFCFF'/%3e%3c/g%3e%3cg filter='url(%23filter1_d_2572_52172)'%3e%3cpath d='M15.4375 9.8125H13.875V17.9375H15.4375V9.8125Z' fill='%23CAEFFB'/%3e%3cpath d='M13.875 9.8125H12.3125V11.3691H13.875V9.8125Z' fill='%23CAEFFB'/%3e%3cpath d='M13.875 16.3809H12.3125V17.9375L13.875 17.9375V16.3809Z' fill='%23CAEFFB'/%3e%3c/g%3e%3cdefs%3e%3cfilter id='filter0_d_2572_52172' x='5.83417' y='8.10583' width='8.245' height='13.245' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3e%3cfeFlood flood-opacity='0' result='BackgroundImageFix'/%3e%3cfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3e%3cfeOffset dx='1.70667' dy='0.853333'/%3e%3cfeGaussianBlur stdDeviation='1.28'/%3e%3cfeColorMatrix type='matrix' values='0 0 0 0 0.0901961 0 0 0 0 0.622274 0 0 0 0 0.921569 0 0 0 0.8 0'/%3e%3cfeBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_2572_52172'/%3e%3cfeBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_2572_52172' result='shape'/%3e%3c/filter%3e%3cfilter id='filter1_d_2572_52172' x='11.4592' y='8.10583' width='8.245' height='13.245' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3e%3cfeFlood flood-opacity='0' result='BackgroundImageFix'/%3e%3cfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3e%3cfeOffset dx='1.70667' dy='0.853333'/%3e%3cfeGaussianBlur stdDeviation='1.28'/%3e%3cfeColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0'/%3e%3cfeBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_2572_52172'/%3e%3cfeBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_2572_52172' result='shape'/%3e%3c/filter%3e%3clinearGradient id='paint0_linear_2572_52172' x1='9.5467' y1='7.3125' x2='9.5467' y2='21.1605' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='%232DA5EB'/%3e%3cstop offset='1' stop-color='%232198EB'/%3e%3c/linearGradient%3e%3clinearGradient id='paint1_linear_2572_52172' x1='11.1878' y1='-5.5' x2='-6.3416' y2='11.7784' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='%234DD1FF'/%3e%3cstop offset='1' stop-color='%233CBFFF'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e",
			label: i$17("universalSearchActions.smartCanvas"),
			type: o$8.CREATE_SMART_CANVAS
		},
		{
			icon: v,
			label: i$17("universalSearchActions.mindMap"),
			type: o$8.CREATE_MINDMAP
		}
	], it = function(n) {
		var i = n.onMainCreateButtonClick, o = n.onRewrite, a = n.onCopy, l = n.onShare, c = n.message, s = n.shouldHideRewrite, u = void 0 !== s && s, d = n.shouldHideSave, v = n.shouldHideFeedback, g = n.shouldHideCopy, h = n.shouldHideShare, b = n.createButtonText, y = t$9((0, import_react$6.useState)(!1), 2), x = y[0], E = y[1];
		return c && [M$4.FINISH, M$4.STOP].includes(c.messageStatus) ? import_react$6.createElement("div", { className: "ai-component-pc-universal-search-actions" }, import_react$6.createElement("div", { className: "ai-component-pc-universal-search-actions__left" }, !g && import_react$6.createElement(Tooltip_default, n$10({ title: i$17("universalSearchActions.tooltip.copyLink") }, ua.isMobile ? { visible: !1 } : {}), import_react$6.createElement("span", {
			className: "button-item",
			onClick: function() {
				return null == a ? void 0 : a(c);
			}
		}, import_react$6.createElement(Jn, { viewBox: "0 0 24 24" }))), !u && import_react$6.createElement(Tooltip_default, n$10({ title: i$17("universalSearchActions.tooltip.restore") }, ua.isMobile ? { visible: !1 } : {}), import_react$6.createElement("span", {
			className: "button-item",
			onClick: function() {
				return null == o ? void 0 : o(c);
			}
		}, import_react$6.createElement(et, { viewBox: "0 0 24 24" }))), !v && import_react$6.createElement(Tooltip_default, n$10({ title: i$17("universalSearchActions.tooltip.unlike") }, ua.isMobile ? { visible: !1 } : {}), import_react$6.createElement("span", {
			className: "button-item",
			onClick: function() {
				return x ? E(!1) : l$1(c.id, c.parentMessageId, A$6(R$3.SOURCE_DESKTOP), (function() {
					E(!x), Snackbar_default.show({
						message: i$17("universalSearchActions.feedback.unlike-toast"),
						type: "success",
						duration: 2e3
					});
				}));
			}
		}, x ? import_react$6.createElement(Wn, { viewBox: "0 0 24 24" }) : import_react$6.createElement(Un, { viewBox: "0 0 24 24" }))), !h && import_react$6.createElement(Tooltip_default, n$10({ title: i$17("universalSearchActions.tooltip.share") }, ua.isMobile ? { visible: !1 } : {}), import_react$6.createElement("span", {
			className: "button-item",
			onClick: function() {
				return null == l ? void 0 : l(c);
			}
		}, import_react$6.createElement(tt, { viewBox: "0 0 24 24" }), import_react$6.createElement("span", null, i$17("universalSearchActions.share")))), d ? null : import_react$6.createElement("span", {
			className: "button-item",
			onClick: function(e) {
				var n = e.target;
				null != n && n.closest(".button-menu-arrow-container") || (e.stopPropagation(), e.preventDefault(), i?.(c));
			}
		}, import_react$6.createElement(_$1, { viewBox: "0 0 24 24" }), import_react$6.createElement("span", null, b || i$17("universalSearchActions.saveAsDocument"))))) : null;
	}, ot = function(e) {
		var n = e.message, r = e.conversationId, i = e.onCb, o = n.buttons, a = void 0 === o ? [] : o, l = n.description;
		return null == a || !a.length || null != l && l.editable || a.some((function(e) {
			return [
				o$8.CREATE_SLIDE,
				o$8.CREATE_MINDMAP,
				o$8.CREATE_FLOW_CHART
			].includes(e.type);
		})) ? null : import_react$6.createElement(Hn, {
			message: n,
			handleCreateForm: function() {
				var e, t, o, a = null !== (e = null == n || null === (t = n.buttons) || void 0 === t || null === (t = t.find((function(e) {
					return e.type === o$8.CREATE_FORM;
				}))) || void 0 === t || null === (t = t.createFrom) || void 0 === t ? void 0 : t.formJson) && void 0 !== e ? e : "";
				C$8.createForm({
					text: null == n || null === (o = n.content) || void 0 === o ? void 0 : o.text,
					formJson: a,
					conversationId: r,
					parentMessageId: n.parentMessageId || "",
					onCb: i || void 0
				});
			},
			handleCreateSheet: function() {
				var e;
				C$8.createSheet({
					text: null == n || null === (e = n.content) || void 0 === e ? void 0 : e.text,
					conversationId: r,
					parentMessageId: n.parentMessageId || "",
					onCb: i || void 0
				});
			},
			handleCreateResume: function() {
				var e, t, o = null !== (e = null == n || null === (t = n.buttons) || void 0 === t || null === (t = t.find((function(e) {
					return e.type === o$8.CREATE_RESUME;
				}))) || void 0 === t || null === (t = t.createResume) || void 0 === t ? void 0 : t.resumeJson) && void 0 !== e ? e : "";
				C$8.createResume({
					resumeJson: o,
					conversationId: r,
					parentMessageId: n.parentMessageId || "",
					onCb: i || void 0
				});
			},
			handleCreateDoc: function() {
				var e;
				C$8.createDoc({
					text: null == n || null === (e = n.content) || void 0 === e ? void 0 : e.text,
					conversationId: r,
					parentMessageId: n.parentMessageId || "",
					onCb: i || void 0
				});
			},
			handleCreateSmartCanvas: function() {
				var e;
				C$8.createSmartCanvas({
					text: null == n || null === (e = n.content) || void 0 === e ? void 0 : e.text,
					messageId: "",
					conversationId: r,
					parentMessageId: n.parentMessageId || "",
					onCb: i || void 0
				});
			},
			handleDefaultClick: function(e) {
				i && i(e, !0);
			}
		});
	}, at = function(n) {
		var r, a, l, c, s, u, p, m, v, g, h, b = n.conversationId, C = n.isHistoryMessage, y = n.source, x = n.message, E = n.action, w = n.button, S = n.buttonHandlerProps, _ = n.recommendQuestionProps, O = n.referenceProps, T = n.isSelectionMode, H = n.errorMessageProps, R = n.editProps, I = n.outlineProps, A = n.functionCallProps, j = n.onPushMessage, P = (null == x || null === (r = x.extraContent) || void 0 === r || null === (r = r.modelThinking) || void 0 === r ? void 0 : r.thinkingContent) || "", F = null == x || null === (a = x.extraContent) || void 0 === a || null === (a = a.modelThinking) || void 0 === a ? void 0 : a.thinkingDuration, D$9 = (null == x || null === (l = x.content) || void 0 === l ? void 0 : l.text) || "", N = (null === (c = x.references) || void 0 === c ? void 0 : c.items) || [], V = (null === (s = x.references) || void 0 === s ? void 0 : s.processes) || void 0, B = (0, import_react$6.useMemo)((function() {
			return {
				onReferenceSaveShow: O.onReferenceSaveShow,
				onReferenceExpandChange: O.onReferenceExpandChange,
				onReferenceOpen: O.onReferenceOpen,
				onReferenceSave: O.onReferenceSave,
				onReferenceTextOpen: O.onReferenceTextOpen,
				onInsertExcelChart: null == S ? void 0 : S.onInsertExcelChart,
				onExpandExcelChartImage: O.onExpandExcelChartImage,
				getResultBySingleFormula: O.getResultBySingleFormula,
				onInsertTable: O.onInsertTable
			};
		}), [O, S]);
		(0, import_react$6.useEffect)((function() {
			var e;
			null !== (e = x.description) && void 0 !== e && e.notSupportThinking && (Snackbar_default.show({
				message: i$17("toast.bot-deepseek-thinking-not-support"),
				type: "info",
				duration: 2e3
			}), delete x.description.notSupportThinking);
		}), [null === (u = x.description) || void 0 === u ? void 0 : u.notSupportThinking]);
		var Z = (0, import_react$6.useMemo)((function() {
			return (x.suggestedReplies || []).map((function(e) {
				return {
					text: e,
					onClick: function() {
						var n;
						null == _ || null === (n = _.onClickRecommendQuestion) || void 0 === n || n.call(_, e);
					}
				};
			}));
		}), [x.suggestedReplies, _]);
		return import_react$6.createElement(Ee$1.Provider, { value: b }, import_react$6.createElement("div", { className: "ai-component-pc-message-wrapper" }, import_react$6.createElement(n$13, { condition: x.messageStatus !== M$4.ERROR }, import_react$6.createElement(n$13.Success, null, import_react$6.createElement(l$15, { case: void 0 }, import_react$6.createElement(l$15.Case, { case: Boolean(null === (p = x.content) || void 0 === p ? void 0 : p.files) }, import_react$6.createElement(Re, {
			title: null == x ? void 0 : x.filesContentTitle,
			files: null === (m = x.content) || void 0 === m || null === (m = m.files) || void 0 === m ? void 0 : m.items
		})), import_react$6.createElement(l$15.Case, { case: !isEmpty(x.functionCall) }, import_react$6.createElement(Qe, {
			message: x,
			isHistoryMessage: C,
			functionCallProps: A,
			onEditFunctionCall: null == R ? void 0 : R.onEditFunctionCall
		})), import_react$6.createElement(l$15.Default, null, import_react$6.createElement(ye, n$10({
			referenceProcesses: V,
			references: N
		}, O)), import_react$6.createElement(m$10, { message: x }), import_react$6.createElement(Vn, {
			isFinished: !0,
			thinkingMd: P,
			thinkingDuration: F,
			message: x,
			dot: x.messageStatus === M$4.IN_THINKING,
			handlers: B
		}, import_react$6.createElement(l$15, { case: void 0 }, import_react$6.createElement(l$15.Case, { case: Boolean((null === (v = x.description) || void 0 === v ? void 0 : v.editable) && D$9) }, import_react$6.createElement(Nn, {
			source: y,
			message: x,
			markdownText: D$9,
			onEditOutline: null == R ? void 0 : R.onEditOutline,
			isHistoryMessage: C,
			hideCreateButton: null == I ? void 0 : I.hideCreateButton,
			showTextSeparator: null == I ? void 0 : I.showTextSeparator,
			onActiveChange: null == I ? void 0 : I.onActiveChange,
			onPushMessage: j
		})), import_react$6.createElement(l$15.Case, { case: Boolean(((null === (g = x.description) || void 0 === g ? void 0 : g.isMindOutline) || (null === (h = x.description) || void 0 === h ? void 0 : h.isFlowchartOutline)) && D$9) }, import_react$6.createElement(An, {
			message: x,
			markdownText: D$9,
			onPushMessage: j
		})), import_react$6.createElement(l$15.Default, null, import_react$6.createElement(D, {
			md: D$9,
			message: x,
			isFinished: x.messageStatus === M$4.FINISH,
			handlers: B,
			dot: x.messageStatus === M$4.IN_PROGRESS
		})))), E && ![
			M$4.START,
			M$4.IN_THINKING,
			M$4.IN_PROGRESS
		].includes(x.messageStatus) ? import_react$6.createElement(import_react$6.Fragment, null, w || null, E) : null, T || C ? null : import_react$6.createElement(import_react$6.Fragment, null, Z.length > 0 && import_react$6.createElement(Divider_default, { style: {
			margin: "0",
			borderBottom: "1px solid var(--border-weak, rgba(0, 0, 0, 0.04))"
		} }), import_react$6.createElement(xe, { questions: Z }))))), import_react$6.createElement(n$13.Fail, null, import_react$6.createElement(ke$1, {
			message: x,
			errorMessageProps: H
		})))));
	};
}));
var init_markdown_render = __esmMin((() => {
	init_index_05e873fa();
	require_react();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/dist/esm/locales/index.js
var init_locales = __esmMin((() => {
	init_index_c23defda();
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/dist/esm/guide-and-feedback-dropdown/index.js
function a$2(e, t) {
	var i = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t && (n = n.filter((function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		}))), i.push.apply(i, n);
	}
	return i;
}
function f$1(t) {
	for (var i = 1; i < arguments.length; i++) {
		var n = null != arguments[i] ? arguments[i] : {};
		i % 2 ? a$2(Object(n), !0).forEach((function(i) {
			a$19(t, i, n[i]);
		})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : a$2(Object(n)).forEach((function(e) {
			Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
		}));
	}
	return t;
}
var import_react$3, p;
var init_guide_and_feedback_dropdown = __esmMin((() => {
	init_index_c23defda();
	import_react$3 = /* @__PURE__ */ __toESM(require_react());
	init_index_4a868389();
	init_esm$3();
	init_esm$7();
	init_esm$1();
	p = function(e) {
		var a = e.onGuidanceClick, p = e.iconType, m = void 0 === p ? "more" : p, s = e.style, g = e.preList, u = e.tooltipTitle, b = e.alignment, h = void 0 === b ? "left" : b;
		return import_react$3.createElement(Dropdown_default, {
			containerStyle: f$1({
				display: "flex",
				alignItems: "center",
				justifyContent: "center"
			}, s),
			alignment: h,
			dropContent: import_react$3.createElement(Menu_default, {
				style: { width: 148 },
				onClick: function(e) {
					if ("guidance" === e) a({ url: m$7 });
					else if ("feedback" === e) a$20();
					else {
						var t, i = null == g ? void 0 : g.find((function(t) {
							return t.id === e;
						}));
						if (i) null === (t = i.onClick) || void 0 === t || t.call(i);
					}
				}
			}, null == g ? void 0 : g.map((function(e) {
				return import_react$3.createElement(Menu_default.Item, {
					key: e.id,
					id: e.id,
					style: { padding: "9px 16px" }
				}, e.name);
			})), import_react$3.createElement(Menu_default.Item, {
				id: "guidance",
				style: { padding: "9px 16px" }
			}, i$17("guide-and-feedback-dropdown.guidance")), import_react$3.createElement(Menu_default.Item, {
				id: "feedback",
				style: { padding: "9px 16px" }
			}, i$17("guide-and-feedback-dropdown.feedback")))
		}, import_react$3.createElement(Tooltip_default, {
			title: u || i$17("guide-and-feedback-dropdown.title"),
			hideOnClick: !0
		}, import_react$3.createElement(m$9, {
			src: "more" === m ? "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8'%3f%3e%3csvg width='24px' height='24px' viewBox='0 0 24 24' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e %3ctitle%3etoolbar_font_more%3c/title%3e %3cg id='toolbar_font_more' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3e %3crect id='Rectangle' fill='black' opacity='0' x='0' y='0' width='24' height='24'%3e%3c/rect%3e %3crect id='%e7%9f%a9%e5%bd%a2' fill='%23464D5A' x='5.3' y='11' width='2.3' height='2.3' rx='0.5'%3e%3c/rect%3e %3crect id='%e7%9f%a9%e5%bd%a2%e5%a4%87%e4%bb%bd' fill='%23464D5A' x='11' y='11' width='2.3' height='2.3' rx='0.5'%3e%3c/rect%3e %3crect id='%e7%9f%a9%e5%bd%a2%e5%a4%87%e4%bb%bd-2' fill='%23464D5A' x='16.7' y='11' width='2.3' height='2.3' rx='0.5'%3e%3c/rect%3e %3c/g%3e%3c/svg%3e" : "data:image/svg+xml,%3csvg width='25' height='24' viewBox='0 0 25 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M5.479 6.125H20.479V7.375H5.479V6.125ZM5.479 11.375H20.479V12.625H5.479V11.375ZM20.479 16.625H5.479V17.875H20.479V16.625Z' fill='%23454D5A' style='fill:%23454D5A%3bfill:color(display-p3 0.2706 0.3020 0.3529)%3bfill-opacity:1%3b'/%3e%3c/svg%3e",
			hoverable: !0
		})));
	};
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/dist/esm/desktop/index.js
function ue(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		t && (a = a.filter((function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		}))), n.push.apply(n, a);
	}
	return n;
}
function fe(t) {
	for (var n = 1; n < arguments.length; n++) {
		var a = null != arguments[n] ? arguments[n] : {};
		n % 2 ? ue(Object(a), !0).forEach((function(n) {
			a$19(t, n, a[n]);
		})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(a)) : ue(Object(a)).forEach((function(e) {
			Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(a, e));
		}));
	}
	return t;
}
function he(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		t && (a = a.filter((function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		}))), n.push.apply(n, a);
	}
	return n;
}
function ge(t) {
	for (var n = 1; n < arguments.length; n++) {
		var a = null != arguments[n] ? arguments[n] : {};
		n % 2 ? he(Object(a), !0).forEach((function(n) {
			a$19(t, n, a[n]);
		})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(a)) : he(Object(a)).forEach((function(e) {
			Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(a, e));
		}));
	}
	return t;
}
function Ee(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		t && (a = a.filter((function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		}))), n.push.apply(n, a);
	}
	return n;
}
function Pe(t) {
	for (var n = 1; n < arguments.length; n++) {
		var a = null != arguments[n] ? arguments[n] : {};
		n % 2 ? Ee(Object(a), !0).forEach((function(n) {
			a$19(t, n, a[n]);
		})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(a)) : Ee(Object(a)).forEach((function(e) {
			Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(a, e));
		}));
	}
	return t;
}
var import_react$2, import_classnames$1, me, de, ve, be, xe$1, ye$1, we, _e, ke, Oe, Se, je, Ie, Te, Ne, Ce, Fe;
var init_desktop = __esmMin((() => {
	init_index_c23defda();
	init_slicedToArray_e715395f();
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
	init_esm$6();
	init_esm$1();
	import_classnames$1 = /* @__PURE__ */ __toESM(require_classnames());
	init_index_4a868389();
	init_application_vnd_tdocs_apps_slide_0224ba95();
	init_index_e54e83c4();
	init_index_b1d71213();
	init_index_6f8739a7();
	init_esm$3();
	init_index_bc35b061();
	init_esm$4();
	init_lodash();
	init_style_inject_es_3984fa0f();
	init_toConsumableArray_d8de034d();
	init_esm$9();
	init_index_a7047c5d();
	init_index_ae78ab8c();
	init_bottombar_new_sheet_ddaa75a8();
	init_dist();
	require_react_dom();
	init_purify_es();
	me = [
		{
			id: "ppt",
			name: i$17("category-name.ppt"),
			Svg: w
		},
		{
			id: "doc",
			name: i$17("category-name.doc"),
			Svg: m$2
		},
		{
			id: "mind",
			name: i$17("category-name.mindMap"),
			Svg: B
		}
	], de = "ai-component-pc-create-tab";
	e$11(".ai-component-pc-create-tab-doc {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n}\n.ai-component-pc-create-tab-doc-input-box {\n  flex-shrink: 0;\n  min-height: 20%;\n  max-height: 50%;\n  margin-bottom: 12px;\n}\n.ai-component-pc-create-tab-doc-list {\n  position: relative;\n  overflow-y: auto;\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px;\n  padding-bottom: 12px;\n  box-sizing: border-box;\n  -ms-overflow-style: none;\n  scrollbar-width: none;\n}\n.ai-component-pc-create-tab-doc-list::-webkit-scrollbar {\n  display: none;\n}\n.ai-component-pc-create-tab-doc-list-item {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  box-sizing: border-box;\n  flex: 0 0 calc(50% - 6px);\n  padding: 12px 16px;\n  min-height: 68px;\n  max-height: 86px;\n  border-radius: 12px;\n  border: 1px solid var(--border-medium, rgba(0, 0, 0, 0.08));\n  cursor: pointer;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.ai-component-pc-create-tab-doc-list-item-title {\n  max-height: 36px;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  font-size: 14px;\n  font-weight: 600;\n  line-height: 20px;\n  white-space: normal;\n}\n.ai-component-pc-create-tab-doc-list-item-description {\n  overflow: hidden;\n  color: var(--text-medium, rgba(0, 0, 0, 0.48));\n  text-overflow: ellipsis;\n  font-size: 12px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 16px;\n}\n");
	ve = "".concat(de, "-doc"), be = function(e) {
		var r = e.onEditEnd, c = (0, import_react$2.useRef)(null), s = t$9((0, import_react$2.useState)({}), 2), m = s[0], u = s[1], v = t$9((0, import_react$2.useState)([]), 2), b = v[0], g = v[1], x = b.length > 0;
		(0, import_react$2.useEffect)((function() {
			var e, t;
			!x || null !== (e = m.input) && void 0 !== e && e.trim() || null === (t = c.current) || void 0 === t || t.setContent({ value: i$17("desktop.create-tab.doc.based-on-attachment") });
		}), [x]);
		var y = debounce(e$8(f$8.mark((function e() {
			var t, n, a, o;
			return f$8.wrap((function(e) {
				for (;;) switch (e.prev = e.next) {
					case 0: return e.prev = 0, n = null === (t = c.current) || void 0 === t ? void 0 : t.getFiles(), a = JSON.stringify(fe(fe({}, m), {}, { attachments: n })), tdw({
						opername: "global",
						module: "ai_request",
						action: "service_call",
						ver5: "ai_writing",
						ver6: "document_creation",
						ver7: a,
						ver8: "aiwritingtab",
						ver10: "".concat((null == n ? void 0 : n.length) || 0, ",").concat(uniq(null == n ? void 0 : n.map((function(e) {
							return e.type;
						}))))
					}), localStorage.setItem(R$4, a), e.next = 7, C$8.createEmptyDoc(m.input);
					case 7:
						(o = e.sent).data.result.doc_url ? (r$16.setFileData(b$7, o.data.result.doc_url, fe(fe({}, m), {}, { attachments: n })), r?.(), openUrl({ url: "".concat(o.data.result.doc_url, "?").concat(b$4.AIModalWrite, "=1") })) : Snackbar_default.show({
							message: i$17("errorMessage.create-doc-failed"),
							type: "error"
						}), e.next = 15;
						break;
					case 11: e.prev = 11, e.t0 = e.catch(0), console.error(e.t0), Snackbar_default.show({
						message: i$17("errorMessage.create-doc-failed"),
						type: "error"
					});
					case 15:
					case "end": return e.stop();
				}
			}), e, null, [[0, 11]]);
		}))), 300);
		return import_react$2.createElement("div", { className: ve }, import_react$2.createElement(F, {
			className: "".concat(ve, "-input-box"),
			buttonSize: "small",
			onChange: function(e) {
				u(e);
			},
			onFileTaskChange: g,
			uploaderMenuItems: [
				A.Local,
				A.Online,
				A.Url
			],
			iconUploaderType: "text",
			onSend: y,
			placeholder: i$17("desktop.create-tab.doc.placeholder"),
			ref: c,
			onConfirmUploaderItem: function(e) {
				tdw({
					opername: "doc_ai",
					module: "aicreate_tab",
					action: "upload_click",
					ver5: "doc",
					ver6: e
				});
			}
		}), import_react$2.createElement("div", { className: "".concat(ve, "-list") }, t$13.map((function(e) {
			return import_react$2.createElement("div", {
				key: e.id,
				className: "".concat(ve, "-list-item"),
				onClick: function() {
					return function(e) {
						var t;
						null === (t = c.current) || void 0 === t || t.setContent({
							value: e.input,
							valueOptions: e.config
						}), tdw({
							opername: "doc_ai",
							module: "aicreate_tab",
							action: "template_click",
							ver5: "doc",
							ver6: e.input
						});
					}(e);
				}
			}, import_react$2.createElement("div", { className: "".concat(ve, "-list-item-title") }, e.name), import_react$2.createElement("div", { className: "".concat(ve, "-list-item-description") }, e.description));
		}))));
	};
	e$11(".ai-component-pc-create-tab-mind {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n}\n.ai-component-pc-create-tab-mind-input-box {\n  flex-shrink: 0;\n  min-height: 20%;\n  max-height: 50%;\n  margin-bottom: 12px;\n}\n.ai-component-pc-create-tab-mind-list {\n  position: relative;\n  overflow-y: auto;\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px;\n  padding-bottom: 12px;\n  box-sizing: border-box;\n  -ms-overflow-style: none;\n  scrollbar-width: none;\n}\n.ai-component-pc-create-tab-mind-list::-webkit-scrollbar {\n  display: none;\n}\n.ai-component-pc-create-tab-mind-list-item {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  box-sizing: border-box;\n  flex: 0 0 calc(50% - 6px);\n  padding: 12px 16px;\n  min-height: 68px;\n  max-height: 86px;\n  border-radius: 12px;\n  border: 1px solid var(--border-medium, rgba(0, 0, 0, 0.08));\n  cursor: pointer;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.ai-component-pc-create-tab-mind-list-item-title {\n  max-height: 36px;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  font-size: 14px;\n  font-weight: 600;\n  line-height: 20px;\n  white-space: normal;\n}\n.ai-component-pc-create-tab-mind-list-item-description {\n  overflow: hidden;\n  color: var(--text-medium, rgba(0, 0, 0, 0.48));\n  text-overflow: ellipsis;\n  font-size: 12px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 16px;\n}\n");
	ye$1 = "".concat(de, "-mind"), we = function(e) {
		var r = e.onEditEnd, c = (0, import_react$2.useRef)(null), s = t$9((0, import_react$2.useState)({}), 2), m = s[0], u = s[1], v = t$9((0, import_react$2.useState)([]), 2), b = v[0], g = v[1], x = b.length > 0;
		(0, import_react$2.useEffect)((function() {
			var e, t;
			!x || null !== (e = m.input) && void 0 !== e && e.trim() || null === (t = c.current) || void 0 === t || t.setContent({ value: i$17("desktop.create-tab.mind.based-on-attachment") });
		}), [x]);
		var y = debounce(e$8(f$8.mark((function e() {
			var t, n, a, o;
			return f$8.wrap((function(e) {
				for (;;) switch (e.prev = e.next) {
					case 0: return e.prev = 0, n = null === (t = c.current) || void 0 === t ? void 0 : t.getFiles(), a = JSON.stringify(ge(ge({}, m), {}, { attachments: n })), tdw({
						opername: "global",
						module: "ai_request",
						action: "service_call",
						ver5: "ai_writing",
						ver6: "mind_map_creation",
						ver7: a,
						ver8: "aiwritingtab",
						ver10: "".concat((null == n ? void 0 : n.length) || 0, ",").concat(uniq(null == n ? void 0 : n.map((function(e) {
							return e.type;
						}))))
					}), localStorage.setItem(v$8, a), e.next = 7, C$8.createEmptyMind(m.input);
					case 7:
						(o = e.sent).data.result.doc_url ? (r$16.setFileData(y$6, o.data.result.doc_url, ge(ge({}, m), {}, { attachments: n })), r?.(), openUrl({ url: "".concat(o.data.result.doc_url, "?").concat(b$4.AIModalWrite, "=1") })) : Snackbar_default.show({
							message: i$17("errorMessage.create-doc-failed"),
							type: "error"
						}), e.next = 15;
						break;
					case 11: e.prev = 11, e.t0 = e.catch(0), console.error(e.t0), Snackbar_default.show({
						message: i$17("errorMessage.create-doc-failed"),
						type: "error"
					});
					case 15:
					case "end": return e.stop();
				}
			}), e, null, [[0, 11]]);
		}))), 300);
		return import_react$2.createElement("div", { className: ye$1 }, import_react$2.createElement(F, {
			className: "".concat(ye$1, "-input-box"),
			buttonSize: "small",
			onSend: y,
			onChange: function(e) {
				u(e);
			},
			onFileTaskChange: g,
			uploaderMenuItems: [
				A.Local,
				A.Online,
				A.Url,
				A.Image
			],
			placeholder: i$17("desktop.create-tab.mind.placeholder"),
			iconUploaderType: "text",
			ref: c,
			onConfirmUploaderItem: function(e) {
				tdw({
					opername: "doc_ai",
					module: "aicreate_tab",
					action: "upload_click",
					ver5: "mind",
					ver6: e
				});
			}
		}), import_react$2.createElement("div", { className: "".concat(ye$1, "-list") }, e$13.map((function(e) {
			return import_react$2.createElement("div", {
				key: e.id,
				className: "".concat(ye$1, "-list-item"),
				onClick: function() {
					return function(e) {
						var t;
						null === (t = c.current) || void 0 === t || t.setContent({
							value: e.input,
							valueOptions: e.config
						}), tdw({
							opername: "doc_ai",
							module: "aicreate_tab",
							action: "template_click",
							ver5: "mind",
							ver6: e.input
						});
					}(e);
				}
			}, import_react$2.createElement("div", { className: "".concat(ye$1, "-list-item-title") }, e.name), import_react$2.createElement("div", { className: "".concat(ye$1, "-list-item-description") }, e.description));
		}))));
	}, _e = {
		id: "themeTab",
		name: i$17("desktop.create-tab.slide.tab-header.theme")
	}, ke = {
		id: "templateTab",
		name: i$17("desktop.create-tab.slide.tab-header.template")
	}, Oe = [_e, ke];
	(function(e) {
		e[e.NOVIP = 2] = "NOVIP", e[e.VIP = 4] = "VIP", e[e.SVIP = 8] = "SVIP", e[e.SVIP_PLUS = 16] = "SVIP_PLUS";
	})(xe$1 || (xe$1 = {}));
	e$11(".ai-component-pc-create-tab-ppt {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n}\n.ai-component-pc-create-tab-ppt .input_uploader_hide {\n  display: none !important;\n}\n.ai-component-pc-create-tab-ppt-input-box {\n  flex-shrink: 0;\n  min-height: 20%;\n  max-height: 50%;\n  margin-bottom: 12px;\n}\n.ai-component-pc-create-tab-ppt-list {\n  position: relative;\n  overflow-y: auto;\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px;\n  padding-bottom: 12px;\n  box-sizing: border-box;\n  -ms-overflow-style: none;\n  scrollbar-width: none;\n}\n.ai-component-pc-create-tab-ppt-list::-webkit-scrollbar {\n  display: none;\n}\n.ai-component-pc-create-tab-ppt-list-item {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  box-sizing: border-box;\n  flex: 0 0 calc(50% - 6px);\n  padding: 12px 16px;\n  min-height: 68px;\n  max-height: 86px;\n  border-radius: 12px;\n  border: 1px solid var(--border-medium, rgba(0, 0, 0, 0.08));\n  cursor: pointer;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.ai-component-pc-create-tab-ppt-list-item-title {\n  max-height: 36px;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  font-size: 14px;\n  font-weight: 600;\n  line-height: 20px;\n  white-space: normal;\n}\n.ai-component-pc-create-tab-ppt-list-item-description {\n  overflow: hidden;\n  color: var(--text-medium, rgba(0, 0, 0, 0.48));\n  text-overflow: ellipsis;\n  font-size: 12px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 16px;\n}\n.ai-component-pc-create-tab-ppt-config {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n  margin-bottom: 12px;\n}\n.ai-component-pc-create-tab-ppt-template-selector {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px;\n  height: 100%;\n  overflow-y: auto;\n  padding-bottom: 12px;\n  box-sizing: border-box;\n  -ms-overflow-style: none;\n  scrollbar-width: none;\n}\n.ai-component-pc-create-tab-ppt-template-selector::-webkit-scrollbar {\n  display: none;\n}\n.ai-component-pc-create-tab-ppt-template-selector-item {\n  border-radius: 8px;\n  width: 140px;\n  height: 80px;\n  cursor: pointer;\n  flex: 1 0 calc(50% - 6px);\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  box-sizing: border-box;\n  overflow: hidden;\n}\n.ai-component-pc-create-tab-ppt-template-selector-item > .dui-tooltip {\n  width: 100%;\n  height: 100%;\n}\n.ai-component-pc-create-tab-ppt-template-selector-item > .dui-tooltip div {\n  width: 100%;\n  height: 100%;\n}\n.ai-component-pc-create-tab-ppt-template-selector-item img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.ai-component-pc-create-tab-ppt-template-selector-item-upload {\n  border: 1px solid rgba(0, 0, 0, 0.12);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 4px;\n  color: var(--text-medium, rgba(0, 0, 0, 0.48));\n  font-size: 12px;\n  font-weight: 600;\n  line-height: 16px;\n}\n.ai-component-pc-create-tab-ppt-template-selector-item-upload svg path {\n  fill: var(--icon-medium, #81868f);\n}\n");
	Se = {
		name: "slide_attachment_template_prefix",
		type: N$4.TEXT_LABEL,
		defaultValue: " 以"
	}, je = {
		name: "slide_attachment_template_affix",
		type: N$4.TEXT_LABEL,
		defaultValue: "为模板"
	}, Ie = a$19(a$19(a$19(a$19({}, xe$1.NOVIP, [l$16.Free]), xe$1.VIP, [l$16.Free, l$16.FreeForVIP]), xe$1.SVIP, [
		l$16.Free,
		l$16.FreeForVIP,
		l$16.FreeForSuperVIP
	]), xe$1.SVIP_PLUS, [
		l$16.Free,
		l$16.FreeForVIP,
		l$16.FreeForSuperVIP
	]), Te = "".concat(de, "-ppt"), Ne = function(l) {
		var m = l.onEditEnd, x = t$9((0, import_react$2.useState)(_e.id), 2), y = x[0], S = x[1], T = t$9((0, import_react$2.useState)([]), 2), N = T[0], C = T[1], F$6 = (0, import_react$2.useRef)(null), W = t$9((0, import_react$2.useState)({ imageGeneration: !0 }), 2), Q = W[0], me = W[1], fe = t$9((0, import_react$2.useState)(null), 2), ve = fe[0], be = fe[1], ge = t$9((0, import_react$2.useState)(), 2), ye = ge[0], we = ge[1], Ee = N.length > 0, Ne = (0, import_react$2.useMemo)((function() {
			var e, t = N.map((function(e) {
				return e.getTask();
			})).filter((function(e) {
				var t;
				return (null === (t = e.file) || void 0 === t ? void 0 : t.type) === L$5.SLIDE;
			})).map((function(e) {
				var t, n, a;
				return {
					id: (null === (t = e.file) || void 0 === t ? void 0 : t.id) || "",
					label: null === (n = e.file) || void 0 === n ? void 0 : n.name,
					value: null === (a = e.file) || void 0 === a ? void 0 : a.id
				};
			}));
			return {
				name: "slide_attachment_template_options",
				type: N$4.OPTION_INPUT,
				defaultValue: "",
				value: null === (e = t[0]) || void 0 === e ? void 0 : e.value,
				options: t
			};
		}), [N]), Ce = function(e) {
			return null != e && e.includes("{{.slide_attachment_template") ? e : "".concat(e || "", "{{.slide_attachment_template_prefix}}{{.slide_attachment_template_options}}{{.slide_attachment_template_affix}}");
		}, Fe = function() {
			var e;
			return null != ve && null !== (e = ve.value) && void 0 !== e && e.includes("{{.slide_attachment_template") ? ve.value.replace("{{.slide_attachment_template_prefix}}{{.slide_attachment_template_options}}{{.slide_attachment_template_affix}}", "") : (null == ve ? void 0 : ve.value) || "";
		}, De = function(e) {
			return (null == e ? void 0 : e.find((function(e) {
				return "slide_attachment_template_options" === e.name;
			}))) ? null == e ? void 0 : e.map((function(e) {
				if ("slide_attachment_template_options" === e.name) {
					var t = Ne.options.find((function(t) {
						return t.value === (null == e ? void 0 : e.value);
					}));
					return Pe(Pe({}, e), {}, {
						options: Ne.options,
						value: (null == t ? void 0 : t.value) || Ne.options[0].value
					});
				}
				return e;
			})) : [].concat(e$5(null != e ? e : []), [
				Se,
				Ne,
				je
			]);
		}, Ve = function() {
			var e, t;
			return null != ve && null !== (e = ve.valueOptions) && void 0 !== e && e.find((function(e) {
				return "slide_attachment_template_options" === e.name;
			})) ? null == ve || null === (t = ve.valueOptions) || void 0 === t ? void 0 : t.filter((function(e) {
				return "slide_attachment_template_options" !== e.name;
			})) : (null == ve ? void 0 : ve.valueOptions) || [];
		};
		(0, import_react$2.useEffect)((function() {
			v$6.getInstance().getSlideTemplateSelectorVipType().then((function(e) {
				we(e || xe$1.NOVIP);
			})).catch((function(e) {
				console.error(e), we(xe$1.NOVIP);
			}));
		}), []), (0, import_react$2.useEffect)((function() {
			if (null == N || !N.some((function(e) {
				var t;
				return (null === (t = e.getTask()) || void 0 === t ? void 0 : t.status) !== m$6.EMBEDDING_SUCCESS;
			}))) if (null != N && N.length) {
				if (null != N && N.every((function(e) {
					var t;
					return (null === (t = e.getTask().file) || void 0 === t ? void 0 : t.type) !== L$5.SLIDE;
				}))) {
					var e, t, n;
					if (null === (e = Q.input) || void 0 === e || !e.trim()) return void (null === (n = F$6.current) || void 0 === n || n.setContent({ value: i$17("desktop.create-tab.slide.based-on-attachment") }));
					null === (t = F$6.current) || void 0 === t || t.setContent({
						value: Fe(),
						valueOptions: Ve()
					});
				}
				var a;
				if (null != N && N.some((function(e) {
					var t;
					return (null === (t = e.getTask().file) || void 0 === t ? void 0 : t.type) === L$5.SLIDE;
				}))) null === (a = F$6.current) || void 0 === a || a.setContent({
					value: Ce(null == ve ? void 0 : ve.value),
					valueOptions: De(null == ve ? void 0 : ve.valueOptions)
				});
			} else {
				var o;
				null === (o = F$6.current) || void 0 === o || o.setContent({
					value: Fe(),
					valueOptions: Ve()
				});
			}
		}), [N, Ne]), (0, import_react$2.useEffect)((function() {
			Ee && isUndefined(Q[I.generationMode]) && me((function(t) {
				return Pe(Pe({}, t), {}, a$19({}, I.generationMode, k.FAITHFUL));
			}));
		}), [Ee, Q]);
		var ze = t$9(useAsyncFn(e$8(f$8.mark((function e() {
			var t;
			return f$8.wrap((function(e) {
				for (;;) switch (e.prev = e.next) {
					case 0:
						if (ye) {
							e.next = 2;
							break;
						}
						return e.abrupt("return", []);
					case 2: return t = Ie[ye], e.abrupt("return", y$7.getRecommendTemplate({
						query: "",
						limit: 31,
						requirementTypes: t
					}));
					case 4:
					case "end": return e.stop();
				}
			}), e);
		}))), [ye]), 2), Me = ze[0], Le = ze[1];
		useDebounce(Le, 200, [ye]);
		var qe = (0, import_react$2.useMemo)((function() {
			var e = Me.error, t = Me.value;
			return e || null == t || !t.length ? [] : null == t ? void 0 : t.map((function(e) {
				var t, n, a = JSON.parse((null == e ? void 0 : e.meta_of_each_type) || (null == e ? void 0 : e.metaOfEachType));
				return {
					id: e.id,
					name: e.name,
					isCustom: !1,
					images: {
						cover: null !== (t = null == a ? void 0 : a.images.pc_thumb_2x.url) && void 0 !== t ? t : null == a ? void 0 : a.images.mobile_thumb_2x.url,
						preview: null !== (n = null == a ? void 0 : a.images.pc_preview.url) && void 0 !== n ? n : null == a ? void 0 : a.images.pc_thumb_2x.url
					},
					requirements: 4,
					tags: []
				};
			}));
		}), [Me]), Ae = function(t, n) {
			var a = [];
			n === I.generationMode && t === k.FAITHFUL && (Q[I.pageNum] && a.push(I.pageNum), Q[I.writingStyle] && a.push(I.writingStyle)), me((function(o) {
				return omit(Pe(Pe({}, o), {}, a$19({}, n, t)), a);
			}));
		}, Ge = function() {
			var e = e$8(f$8.mark((function e(t) {
				var n, a, o, i, r, l, d, u;
				return f$8.wrap((function(e) {
					for (;;) switch (e.prev = e.next) {
						case 0: return n = Loading_default.show({ tip: "加载中..." }), e.prev = 1, i = "", r = !1, l = Ie[ye || l$16.Free] || [l$16.Free], e.next = 7, y$7.getRecommendTemplate({
							query: t[0].name,
							limit: 18,
							requirementTypes: l
						});
						case 7: return d = e.sent, i = null == d || null === (a = d[0]) || void 0 === a ? void 0 : a.id, e.next = 11, s$11.createEmptyPPT(null === (o = t[0]) || void 0 === o ? void 0 : o.name);
						case 11:
							(u = e.sent) && (r$16.setFileData("tdocs-ai-slide-generate-template-data", u, {
								files: t,
								templateId: i,
								isCustom: r
							}), m?.(), openUrl({ url: "".concat(u, "?AIGenerate=1") })), e.next = 18;
							break;
						case 15: e.prev = 15, e.t0 = e.catch(1), console.log("获取模版接口失败", e.t0);
						case 18: return e.prev = 18, n.close(), e.finish(18);
						case 21:
						case "end": return e.stop();
					}
				}), e, null, [[
					1,
					15,
					18,
					21
				]]);
			})));
			return function(t) {
				return e.apply(this, arguments);
			};
		}(), Be = (0, import_react$2.useMemo)((function() {
			return a$19(a$19(Ee ? a$19({}, I.templateStyle, Pe(Pe({}, M$3), {}, { value: Q.templateStyle })) : {}, I.writingStyle, Pe(Pe({}, I$3), {}, { value: Q.writingStyle })), I.imageGeneration, Pe(Pe({}, N$3), {}, { value: Q.imageGeneration }));
		}), [Ee, Q]), Re = import_react$2.createElement("div", { className: "".concat(de, "-header") }, Oe.map((function(e) {
			return import_react$2.createElement("div", {
				key: e.id,
				className: (0, import_classnames$1.default)("".concat(de, "-header-item"), { active: y === e.id }),
				onClick: function() {
					e.id === ke.id && tdw({
						opername: "doc_ai",
						module: "aicreate_tab",
						action: "slide_template_click"
					}), S(e.id);
				}
			}, import_react$2.createElement("span", null, e.name));
		}))), Je = (0, import_react$2.useMemo)((function() {
			return Ee ? [
				O$1,
				j$1,
				D$3
			].map((function(e) {
				return {
					config: e,
					item: {
						key: e.key,
						label: e.label,
						options: e.options
					}
				};
			})) : [
				j$1,
				D$3,
				M$3
			].map((function(e) {
				return {
					config: e,
					item: {
						key: e.key,
						label: e.label,
						options: e.options
					}
				};
			}));
		}), [Ee]);
		return import_react$2.createElement(Tabs_default, {
			contentStyle: { marginTop: 10 },
			activeId: y,
			onChange: S,
			style: { width: "100%" },
			tabBar: Re
		}, import_react$2.createElement(Tabs_default.TabPane, {
			id: _e.id,
			forceRender: !0
		}, import_react$2.createElement("div", { className: "".concat(Te) }, import_react$2.createElement(F, {
			maxFileCount: 1,
			className: "".concat(Te, "-input-box"),
			buttonSize: "small",
			onChange: function(e) {
				me(Pe(Pe({}, Q), e));
			},
			onFileTaskChange: function(e) {
				e.length || me((function(e) {
					return omit(Pe({}, e), [I.generationMode]);
				})), C(e);
			},
			uploaderMenuItems: [
				A.Online,
				A.Local,
				A.Text,
				A.BeautifyPPT
			],
			iconUploaderType: "text",
			onSend: function() {
				var e, t, n, a, o = null === (e = F$6.current) || void 0 === e ? void 0 : e.getFiles(), i = null === (t = F$6.current) || void 0 === t ? void 0 : t.getCurrentSelectOption(), r = "";
				i && (r = (null == o || null === (a = o.find((function(e) {
					return e.id === i.id;
				}))) || void 0 === a ? void 0 : a.url) || "");
				var l = JSON.stringify(Pe(Pe({}, Q), {}, {
					attachments: o,
					docUrl: r
				}));
				if (tdw({
					opername: "global",
					module: "ai_request",
					action: "service_call",
					ver5: "ai_writing",
					ver6: "ppt_create",
					ver7: l,
					ver8: "aiwritingtab",
					ver10: "".concat((null == o ? void 0 : o.length) || 0, ",").concat(uniq(null == o ? void 0 : o.map((function(e) {
						return e.type;
					})))),
					ver11: Object.keys(Q).join(",")
				}), null === (n = F$6.current) || void 0 === n ? void 0 : n.isUploadAllSuccess()) if (Q.genMode === k.FAITHFUL && null != o && o.length) Ge(o);
				else {
					var c = n$12(), p = i$18("https://docs.qq.com/ai/slide?createOutline=1", { slideid: c });
					r$16.setFileData(g$7, c, JSON.parse(l)), localStorage.setItem(m$8, l), m?.(), openUrl({ url: p });
				}
				else Snackbar_default.show({
					message: i$17("ux-atom.uploader-box.send-failed-due-to-attachment"),
					type: "error"
				});
			},
			placeholder: i$17("desktop.create-tab.slide.placeholder"),
			ref: F$6,
			uploaderClassName: (0, import_classnames$1.default)({ input_uploader_hide: N.length }),
			onTemplateValueChange: function(e) {
				be(e);
			},
			onConfirmUploaderItem: function(e) {
				tdw({
					opername: "doc_ai",
					module: "aicreate_tab",
					action: "upload_click",
					ver5: "PPT",
					ver6: e
				});
			}
		}), import_react$2.createElement("div", { className: "".concat(Te, "-config") }, Je.map((function(e) {
			var t = e.config, a = e.item;
			return import_react$2.createElement(w$8, {
				buttonSize: "small",
				onChange: Ae,
				key: t.key,
				item: a,
				value: Q[t.key],
				disabled: t.key === I.pageNum && Ee && Q[I.generationMode] === k.FAITHFUL,
				showToggle: !1,
				respectLabel: !0,
				checkable: !0
			});
		})), import_react$2.createElement(w$8, {
			buttonSize: "small",
			item: {
				key: "more",
				label: i$17("desktop.create-tab.slide.more"),
				options: []
			},
			showToggle: !1,
			customMenu: import_react$2.createElement(H$2, {
				configs: Be,
				onConfigChange: Ae,
				imageGeneration: Q.imageGeneration,
				generationMode: Q[I.generationMode]
			})
		})), import_react$2.createElement("div", { className: "".concat(Te, "-list") }, t$14.map((function(e) {
			return import_react$2.createElement("div", {
				key: e.id,
				className: "".concat(Te, "-list-item"),
				onClick: function() {
					return function(e) {
						var t, n;
						Ee && N.some((function(e) {
							var t;
							return (null === (t = e.getTask().file) || void 0 === t ? void 0 : t.type) === L$5.SLIDE;
						})) ? null === (t = F$6.current) || void 0 === t || t.setContent({
							value: Ce(e.input),
							valueOptions: De(e.config)
						}) : null === (n = F$6.current) || void 0 === n || n.setContent({
							value: e.input,
							valueOptions: e.config
						}), tdw({
							opername: "doc_ai",
							module: "aicreate_tab",
							action: "template_click",
							ver5: "PPT",
							ver6: e.input
						});
					}(e);
				}
			}, import_react$2.createElement("div", { className: "".concat(Te, "-list-item-title") }, e.name), import_react$2.createElement("div", { className: "".concat(Te, "-list-item-description") }, e.description));
		}))))), import_react$2.createElement(Tabs_default.TabPane, {
			id: ke.id,
			forceRender: !0
		}, import_react$2.createElement("div", {
			className: "".concat(Te, "-template-selector"),
			onWheel: function(e) {
				e.stopPropagation();
			}
		}, import_react$2.createElement("div", {
			className: (0, import_classnames$1.default)("".concat(Te, "-template-selector-item"), a$19({}, "".concat(Te, "-template-selector-item-upload"), !0)),
			onClick: function() {
				tdw({
					opername: "doc_ai",
					module: "aicreate_tab",
					action: "slide_template_upload"
				}), m?.(), openUrl({ url: "https://docs.qq.com/ai/slide?customUpload=1" });
			}
		}, import_react$2.createElement(i$5, {
			viewBox: "0 0 24 24",
			width: 20,
			height: 20
		}), import_react$2.createElement("span", null, i$17("desktop.create-tab.slide.upload"))), qe.map((function(e) {
			return import_react$2.createElement("div", {
				key: e.id,
				onClick: function() {
					return function(e) {
						tdw({
							opername: "doc_ai",
							module: "aicreate_tab",
							action: "slide_template_select",
							ver6: e.name
						}), localStorage.setItem(u$10, JSON.stringify(e)), m?.(), openUrl({ url: "https://docs.qq.com/ai/slide?slideTemplateInfo=1" });
					}(e);
				},
				className: "".concat(Te, "-template-selector-item")
			}, import_react$2.createElement(Tooltip_default, {
				key: e.id,
				title: e.name
			}, import_react$2.createElement("img", {
				src: e.images.cover,
				alt: e.name
			})));
		})))));
	};
	e$11(".ai-component-pc-create-tab {\n  position: relative;\n  height: 100%;\n  overflow: hidden;\n}\n.ai-component-pc-create-tab .dui-tabs {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  overflow: hidden;\n}\n.ai-component-pc-create-tab .dui-tabs .dui-tabs-bar-container {\n  overflow: unset;\n}\n.ai-component-pc-create-tab .dui-tabs .dui-tabs-content {\n  flex: 1;\n  overflow: hidden;\n}\n.ai-component-pc-create-tab .dui-tabs .dui-tabpane {\n  height: 100%;\n}\n.ai-component-pc-create-tab-header {\n  display: flex;\n  flex-direction: row;\n  overflow-x: auto;\n  gap: 8px;\n  -ms-overflow-style: none;\n  scrollbar-width: none;\n}\n.ai-component-pc-create-tab-header::-webkit-scrollbar {\n  display: none;\n}\n.ai-component-pc-create-tab-header-item {\n  padding: 0 12px;\n  border-radius: 8px;\n  cursor: pointer;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  user-select: none;\n  flex-shrink: 0;\n}\n.ai-component-pc-create-tab-header-item span {\n  white-space: nowrap;\n  color: var(--text-ultrastrong, rgba(0, 0, 0, 0.88));\n  font-family: 'PingFang SC';\n  font-size: 12px;\n  line-height: 16px;\n}\n.ai-component-pc-create-tab-header-item:hover {\n  background: var(--feedback-hover, rgba(0, 0, 0, 0.04));\n}\n.ai-component-pc-create-tab-header-item.active {\n  font-weight: 600;\n  background: var(--tsp-fill-medium, rgba(29, 79, 106, 0.08));\n}\n.ai-component-pc-create-tab .ai-component-pc-model-selector .ai-component-pc-dropdown-button-label {\n  max-width: 100px !important;\n  display: inline-block;\n  word-break: keep-all;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n");
	Ce = Tabs_default.TabPane, Fe = function(a) {
		var i, l = t$9((0, import_react$2.useState)(null === (i = me[0]) || void 0 === i ? void 0 : i.id), 2), c = l[0], p = l[1], d = t$9((0, import_react$2.useState)(!1), 2), f = d[0], v = d[1];
		e$15([
			"ai-component-pc-create-tab",
			"ai-component-pc-menu",
			"ai-component-pc-icon-uploader-modal",
			"ai-component-pc-dropdown-button-menu",
			"ai-pc-docs-component-drive-selector",
			"create-create-panel-pc",
			"ai-component-pc-add-link-modal"
		], (function(e) {
			var t, n;
			(v(e), e) ? null == a || null === (t = a.onEditStart) || void 0 === t || t.call(a) : null == a || null === (n = a.onEditEnd) || void 0 === n || n.call(a);
		}));
		var h = import_react$2.createElement("div", { className: "".concat(de, "-header") }, me.map((function(e) {
			return import_react$2.createElement("div", {
				key: e.id,
				className: (0, import_classnames$1.default)("".concat(de, "-header-item"), { active: c === e.id }),
				onClick: function() {
					return p(e.id);
				}
			}, import_react$2.createElement(e.Svg, null), import_react$2.createElement("span", null, e.name));
		})));
		return import_react$2.createElement("div", { className: (0, import_classnames$1.default)("".concat(de), a$19({}, "".concat(de, "-active"), f)) }, import_react$2.createElement(Tabs_default, {
			contentStyle: { marginTop: 10 },
			activeId: c,
			style: { width: "100%" },
			tabBar: h
		}, import_react$2.createElement(Ce, {
			id: "ppt",
			forceRender: !0
		}, import_react$2.createElement(Ne, a)), import_react$2.createElement(Ce, {
			id: "doc",
			forceRender: !0
		}, import_react$2.createElement(be, a)), import_react$2.createElement(Ce, {
			id: "mind",
			forceRender: !0
		}, import_react$2.createElement(we, a))));
	};
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/dist/esm/ai-content-notice/index.js
var import_react$1, import_classnames, c, a;
var init_ai_content_notice = __esmMin((() => {
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_index_4a868389();
	import_classnames = /* @__PURE__ */ __toESM(require_classnames());
	init_style_inject_es_3984fa0f();
	e$11(".ai-component-pc-content-notice {\n  position: absolute;\n  bottom: 12px;\n  left: 50%;\n  transform: translateX(-50%);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.ai-component-pc-content-notice__text {\n  color: var(--text-weak, rgba(0, 0, 0, 0.24));\n  font-family: \"PingFang SC\";\n  font-size: 12px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 16px;\n  white-space: nowrap;\n}\n");
	c = "ai-component-pc", a = function(o) {
		var a = o.className;
		return import_react$1.createElement("div", { className: (0, import_classnames.default)("".concat(c, "-content-notice"), a) }, import_react$1.createElement("div", { className: "".concat(c, "-content-notice__text") }, i$17("ai-content-notice")));
	};
}));
//#endregion
//#region ../../node_modules/@tencent/ai-component-pc/dist/esm/ai-auth-modal/index.js
function m$1(t) {
	var l = "ai-auth-modal-container", c = document.querySelector(".".concat(l));
	c || ((c = document.createElement("div")).className = l, document.body.appendChild(c));
	import_react_dom.render(import_react.createElement(d, {
		visible: !0,
		scene: null == t ? void 0 : t.scene,
		title: null == t ? void 0 : t.title,
		content: null == t ? void 0 : t.content,
		desc: null == t ? void 0 : t.desc,
		onClose: function() {
			var n;
			null == t || null === (n = t.onClose) || void 0 === n || n.call(t), (0, import_react_dom.unmountComponentAtNode)(c);
		},
		onConsent: function() {
			var n;
			null == t || null === (n = t.onConsent) || void 0 === n || n.call(t), (0, import_react_dom.unmountComponentAtNode)(c);
		}
	}), c);
}
var import_react, import_react_dom, d;
var init_ai_auth_modal = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
	init_esm$7();
	init_esm$1();
	init_style_inject_es_3984fa0f();
	e$11("");
	d = x$4({
		Modal: Modal_default,
		Button: Button_default,
		Checkbox: Checkbox_default,
		Divider: Divider_default
	});
}));
//#endregion
__esmMin((() => {
	init_ux_atom();
	init_slide();
	init_search_import_card();
	init_search_box();
	init_range_selector();
	init_pipeline_button();
	init_model_selector();
	init_message();
	init_markdown_render();
	init_locales();
	init_guide_and_feedback_dropdown();
	init_feedback();
	init_desktop();
	init_auth_card();
	init_ai_content_notice();
	init_ai_auth_modal();
}))();
export { a as AIContentNotice, Fe as AICreateTab, m as AISearchImportMiniCard, E as AISearchImportModelCard, d as AiAuthModal, K as AppendSearch, f as AuthCard, ot as CreateDocumentButtons, rt as DOC_LIST, ee as DesktopSearch, Y as EOptionType, l as FileList, k as GenerationMode, p as GuideAndFeedbackDropdown, S as IconUploader, i as LOCALES_NS, D as MarkdownRender, at as Message, p$1 as ModelSelector, Dn as Outline, I as PPTConfig, y as PipelineButton, s as PipelineType, z as RangeSelector, D$1 as RangeTab, ye as References, D$2 as RequirementSelector, G as SearchFrame, I$1 as SpaceList, xe as Suggestions, S$1 as TemplateInput, it as UniversalSearchActions, A as UploaderMenuItem, F as UploaderTemplateInputBox, Vn as WithThinking, I$2 as addLink, m$1 as showAiAuthModal, l$1 as showFeedbackModal, L as templateColorTags };
