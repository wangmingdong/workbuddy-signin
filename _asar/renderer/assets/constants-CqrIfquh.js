import { n as __esmMin } from "./chunk-BRZcfu7K.js";
//#region ../../packages/agent-ui/src/modules/collab/constants.ts
var PROJECT_INSTRUCTION_MAX_LENGTH, PROJECT_INSTRUCTION_MAX_INPUT_LENGTH, getProjectInstructionLength, clampProjectInstruction, getTitleLength, isTitleOverMaxLength, clampTitle;
var init_constants = __esmMin((() => {
	PROJECT_INSTRUCTION_MAX_LENGTH = 1e4;
	PROJECT_INSTRUCTION_MAX_INPUT_LENGTH = PROJECT_INSTRUCTION_MAX_LENGTH * 2;
	getProjectInstructionLength = (value) => Array.from(value).length;
	clampProjectInstruction = (value) => {
		const chars = Array.from(value);
		return chars.length > 1e4 ? chars.slice(0, PROJECT_INSTRUCTION_MAX_LENGTH).join("") : value;
	};
	getTitleLength = (value) => Array.from(value).length;
	isTitleOverMaxLength = (value) => getTitleLength(value) > 500;
	clampTitle = (value) => {
		const chars = Array.from(value);
		return chars.length > 500 ? chars.slice(0, 500).join("") : value;
	};
}));
//#endregion
export { getProjectInstructionLength as a, clampTitle as i, PROJECT_INSTRUCTION_MAX_LENGTH as n, init_constants as o, clampProjectInstruction as r, isTitleOverMaxLength as s, PROJECT_INSTRUCTION_MAX_INPUT_LENGTH as t };
