import { n as __esmMin } from "./chunk-BRZcfu7K.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
//#region ../../packages/agent-ui/src/assets/message-center/project.svg
var project_default;
var init_project = __esmMin((() => {
	project_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'%20?%3e%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='12'%20height='12'%3e%3cclipPath%20id='clip_0'%3e%3cpath%20d='M3.8037%20-2.1962L14.196%203.8038L8.196%2014.1961L-2.1963%208.1961L3.8037%20-2.1962Z'%20clip-rule='evenodd'/%3e%3c/clipPath%3e%3cg%20clip-path='url(%23clip_0)'%3e%3cpath%20fill='%23000'%20fill-opacity='0.7'%20transform='matrix(0.866025%200.5%20-0.5%200.866025%204.21184%20-1.83053)'%20d='M6.71%200.5162Q6.1938%200%205.4638%200Q4.7337%200%204.2175%200.5162Q3.7013%201.0324%203.7013%201.7625Q3.7013%202.4926%204.2175%203.0088Q4.7337%203.525%205.4638%203.525Q6.1938%203.525%206.71%203.0088Q6.9155%202.8033%207.0391%202.5641Q7.7581%202.9013%208.2859%203.5332Q8.9953%204.3826%209.1164%205.4789L10.011%205.3801Q9.8601%204.014%208.9766%202.9562Q8.2474%202.0833%207.2238%201.662Q7.1903%200.9965%206.71%200.5162ZM4.8539%201.1526Q5.1065%200.9%205.4638%200.9Q5.821%200.9%206.0736%201.1526Q6.3263%201.4052%206.3263%201.7625Q6.3263%202.1198%206.0736%202.3724Q5.821%202.625%205.4638%202.625Q5.1065%202.625%204.8539%202.3724Q4.6013%202.1198%204.6013%201.7625Q4.6013%201.4052%204.8539%201.1526ZM2.3476%206.2475Q2.0684%206.1727%201.8006%206.1847Q1.7888%206.037%201.7888%205.8874Q1.7888%205.0128%202.1789%204.2378Q2.5565%203.4875%203.2242%202.9734L2.6752%202.2602Q1.8448%202.8995%201.3749%203.8332Q0.8888%204.7991%200.8888%205.8874Q0.8888%206.1839%200.9261%206.4748Q0.365%206.8366%200.189%207.4937Q0%208.1989%200.365%208.8312Q0.7301%209.4634%201.4352%209.6524Q2.1404%209.8413%202.7726%209.4763Q3.4049%209.1113%203.5938%208.4061Q3.7828%207.7009%203.4178%207.0687Q3.0527%206.4364%202.3476%206.2475ZM8.5799%206.2475Q7.8747%206.4365%207.5097%207.0687Q7.1446%207.701%207.3336%208.4061Q7.4088%208.6868%207.5542%208.9135Q6.6338%209.5624%205.4638%209.5624Q4.7049%209.5624%204.0141%209.2656L3.6587%2010.0924Q4.5197%2010.4624%205.4638%2010.4624Q7.0334%2010.4624%208.2424%209.5241Q8.8357%209.8283%209.4922%209.6524Q10.1974%209.4635%2010.5624%208.8312Q10.9274%208.199%2010.7385%207.4938Q10.5495%206.7886%209.9173%206.4236Q9.285%206.0586%208.5799%206.2475ZM2.6383%207.5187Q2.4597%207.2093%202.1146%207.1168Q1.7695%207.0243%201.4601%207.203Q1.1507%207.3816%201.0583%207.7267Q0.9658%208.0718%201.1444%208.3812Q1.3231%208.6906%201.6682%208.783Q2.0132%208.8755%202.3226%208.6969Q2.632%208.5182%202.7245%208.1732Q2.817%207.8281%202.6383%207.5187ZM8.2029%208.1732Q8.1104%207.8281%208.2891%207.5187Q8.4677%207.2093%208.8128%207.1169Q9.1579%207.0244%209.4673%207.203Q9.7767%207.3817%209.8691%207.7267Q9.9616%208.0718%209.783%208.3812Q9.6043%208.6906%209.2593%208.7831Q8.9142%208.8755%208.6048%208.6969Q8.2954%208.5183%208.2029%208.1732Z'%20fill-rule='evenodd'/%3e%3c/g%3e%3c/svg%3e";
}));
var init_task = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/message-cards/project-task-source-chip.tsx
/** 从 ext 中按候选 key 顺序取首个非空字符串 */
function getExtText(ext, keys) {
	for (const key of keys) {
		const value = ext[key];
		if (typeof value === "string" && value.trim()) return value.trim();
	}
	return "";
}
var import_jsx_runtime, ProjectTaskSourceChip;
var init_project_task_source_chip = __esmMin((() => {
	require_react();
	init_project();
	init_task();
	import_jsx_runtime = require_jsx_runtime();
	ProjectTaskSourceChip = ({ message, isTask, fallbackProjectName = "项目", fallbackTaskName = "任务" }) => {
		const ext = message.ext || {};
		const projectName = getExtText(ext, ["project_name", "projectName"]) || fallbackProjectName;
		const taskName = getExtText(ext, [
			"task_name",
			"taskName",
			"conversation_title",
			"conversationTitle"
		]) || fallbackTaskName;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				marginTop: 4,
				display: "flex",
				minWidth: 0
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "notification-project-chip",
				style: {
					display: "inline-flex",
					alignItems: "center",
					gap: 4,
					flexWrap: "nowrap",
					minWidth: 0
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						className: "teams-invite-body-icon",
						src: project_default,
						width: 14,
						height: 14,
						alt: "",
						style: { flexShrink: 0 }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: {
							whiteSpace: "nowrap",
							overflow: "hidden",
							textOverflow: "ellipsis",
							minWidth: 0
						},
						children: projectName
					}),
					isTask && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: {
								margin: "0 2px",
								color: "var(--nc-text-quaternary)",
								fontSize: "11px",
								userSelect: "none",
								flexShrink: 0
							},
							children: "/"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							className: "teams-invite-body-icon",
							src: "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'%20?%3e%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='12'%20height='12'%3e%3cpath%20fill='%23000'%20fill-opacity='0.7'%20transform='matrix(1%200%200%201%200.5625%200.749991)'%20d='M11.3737%205.0491Q11.3737%207.358%209.6218%208.9848Q7.8856%2010.597%205.4375%2010.597Q5.2038%2010.597%204.9719%2010.5802L4.9719%2010.5802Q3.9286%2010.5047%203.799%2010.5277Q3.7599%2010.5347%203.7477%2010.5375Q3.7354%2010.5403%203.6971%2010.5511Q3.5704%2010.5869%203.0128%2010.9088L2.8943%2010.9772Q2.5535%2011.174%202.3596%2011.1751Q1.9317%2011.1775%201.7198%2010.8056Q1.6238%2010.6372%201.6237%2010.2437Q1.6238%209.7473%201.6068%209.654Q1.572%209.4616%201.4705%209.2945Q1.4212%209.2135%200.8634%208.5841L0.8634%208.5841Q-0.4988%207.0474%20-0.4987%205.0491Q-0.4987%202.7402%201.2532%201.1134Q2.9894%20-0.4988%205.4375%20-0.4987Q7.8856%20-0.4988%209.6218%201.1134Q11.3738%202.7402%2011.3737%205.0491ZM10.3763%205.0491Q10.3763%203.1752%208.943%201.8443Q7.4939%200.4988%205.4375%200.4987Q3.3811%200.4987%201.932%201.8443Q0.4988%203.1752%200.4987%205.0491Q0.4987%206.6689%201.6099%207.9225L1.6099%207.9225Q2.2272%208.6189%202.323%208.7767Q2.5205%209.1017%202.5883%209.476Q2.6133%209.6138%202.6194%209.9847Q3.1996%209.6551%203.4261%209.5912Q3.4881%209.5737%203.5245%209.5653Q3.5608%209.557%203.6243%209.5457Q3.8765%209.5008%205.0439%209.5853L5.0439%209.5853Q5.2398%209.5995%205.4375%209.5995Q7.4939%209.5995%208.943%208.2539Q10.3763%206.923%2010.3763%205.0491ZM5.9362%204.3763L5.9362%202.625L4.9388%202.625L4.9388%204.3763L3.1875%204.3763L3.1875%205.3737L4.9388%205.3737L4.9388%207.125L5.9362%207.125L5.9362%205.3737L7.6875%205.3737L7.6875%204.3763L5.9362%204.3763Z'%20fill-rule='evenodd'/%3e%3c/svg%3e",
							width: 14,
							height: 14,
							alt: "",
							style: { flexShrink: 0 }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: {
								whiteSpace: "nowrap",
								overflow: "hidden",
								textOverflow: "ellipsis",
								minWidth: 0
							},
							children: taskName
						})
					] })
				]
			})
		});
	};
}));
//#endregion
export { getExtText as n, init_project_task_source_chip as r, ProjectTaskSourceChip as t };
