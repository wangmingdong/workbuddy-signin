import { n as __esmMin } from "./chunk-BRZcfu7K.js";
import { Mn as init_lib, jn as diffLines } from "./src-DRGoWjIu.js";
import { o as writeRendererLog, t as init_http_logger } from "./http-logger-BE9rNaof.js";
import { r as init_chat_types, t as MessageType } from "./chat-types-BMkaZPiE.js";
import { i as resolveAcpMetaTimestamp, r as init_acp_timestamp } from "./message-converter-CCG28Swi.js";
//#region ../../packages/agent-ui/src/adapters/interactive-question-tools.ts
/**
* 判断工具名是否属于交互类问题工具（大小写不敏感）。
*
* 统一封装避免各消费方重复实现 `String(name).toLowerCase()` + `.has()` 样板，
* 并保证语义一致。
*/
function isInteractiveQuestionTool(toolName) {
	if (typeof toolName !== "string") return false;
	return INTERACTIVE_QUESTION_TOOL_NAMES.has(toolName.toLowerCase());
}
var INTERACTIVE_QUESTION_TOOL_NAMES;
var init_interactive_question_tools = __esmMin((() => {
	INTERACTIVE_QUESTION_TOOL_NAMES = new Set([
		"askuserquestion",
		"ask_user_question",
		"askfollowupquestion",
		"ask_followup_question",
		"pick_location"
	]);
}));
//#endregion
//#region ../../packages/agent-ui/src/adapters/utils/acp-result-converter.ts
/**
* 从 ACP notification 中提取工具名称
*/
function extractToolName(notification) {
	const meta = notification._meta;
	if (meta && typeof meta === "object") {
		const codebuddyMeta = meta["codebuddy.ai"];
		if (codebuddyMeta && typeof codebuddyMeta === "object") return codebuddyMeta.toolName;
	}
}
/**
* 根据工具名称和 kind 确定工具类别
*/
function determineToolCategory(toolName, kind) {
	const normalizedName = toolName?.toLowerCase().replace(/-/g, "_") || "";
	if (normalizedName === "task") return "task";
	if (normalizedName === "read" || normalizedName === "read_file" || kind === "read") return "read";
	if (normalizedName === "edit" || normalizedName === "multiedit" || normalizedName === "replace_in_file") return "edit";
	if (normalizedName === "write" || normalizedName === "write_to_file" || kind === "edit") return "write";
	if (normalizedName === "grep" || normalizedName === "search_content") return "search_content";
	if (normalizedName === "web_search" || normalizedName === "websearch") return "web_search";
	if (normalizedName === "glob" || normalizedName === "search_file" || normalizedName === "list_dir" || kind === "search") return "search_file";
	if (normalizedName === "bash" || normalizedName === "bashoutput" || normalizedName === "killshell" || normalizedName === "execute_command" || kind === "execute") return "bash";
	if (normalizedName === "task") return "task";
	if (normalizedName === "askuserquestion" || normalizedName === "ask_user_question") return "askuserquestion";
	return "mcp";
}
/**
* 计算两个文本之间的差异统计信息
* 使用 diffLines 进行逐行比较，精确计算新增和删除的行数
*
* @param originalText 原始文本
* @param modifiedText 修改后的文本
* @returns 差异统计信息
*/
function calculateDiffStats(originalText, modifiedText) {
	const differences = diffLines(originalText, modifiedText, {
		ignoreNewlineAtEof: true,
		ignoreWhitespace: false,
		stripTrailingCr: false
	});
	let addedLines = 0;
	let removedLines = 0;
	let addedChars = 0;
	let removedChars = 0;
	for (const part of differences) if (part.added) if (part.count && part.count > 0) {
		addedLines += part.count;
		addedChars += part.value.length;
	} else {
		const lines = part.value.split(/\r?\n/);
		addedLines += part.value.endsWith("\n") ? lines.length - 1 : lines.length;
		addedChars += part.value.length;
	}
	else if (part.removed) if (part.count && part.count > 0) {
		removedLines += part.count;
		removedChars += part.value.length;
	} else {
		const lines = part.value.split(/\r?\n/);
		removedLines += part.value.endsWith("\n") ? lines.length - 1 : lines.length;
		removedChars += part.value.length;
	}
	return {
		addedLines,
		removedLines,
		addedChars,
		removedChars
	};
}
/**
* 从 ToolCallContent 数组中提取文本内容
*/
function extractTextFromContent(content) {
	if (!content || !Array.isArray(content)) return "";
	const texts = [];
	for (const block of content) if (block.type === "content" && block.content) {
		const innerContent = block.content;
		if (innerContent.type === "text" && "text" in innerContent) texts.push(innerContent.text);
	}
	return texts.join("");
}
/**
* 从 ToolCallContent 数组中提取 diff 信息
*/
function extractDiffFromContent(content) {
	if (!content || !Array.isArray(content)) return null;
	for (const block of content) if (block.type === "diff") return {
		oldText: block.oldText ?? null,
		newText: block.newText,
		path: block.path
	};
	return null;
}
/**
* 将 ACP ToolCall/ToolCallUpdate 转换为 ReadFileResult
*
* @param update - ACP ToolCall 或 ToolCallUpdate
* @param existingResult - 已有的结果（用于累积更新）
* @param fallbackArgs - 回退参数（用于在 rawInput 为空时获取工具参数）
*/
function convertToReadFileResult(update, existingResult, fallbackArgs) {
	const rawInput = update.rawInput;
	const args = rawInput && Object.keys(rawInput).length > 0 ? rawInput : fallbackArgs;
	const rawOutput = update.rawOutput;
	const content = update.content;
	const locations = "locations" in update ? update.locations : void 0;
	const filePath = args?.filePath || args?.file_path || locations?.[0]?.path || existingResult?.path || "unknown";
	let fileContent = existingResult?.content || "";
	if (rawOutput) {
		if (typeof rawOutput === "string") fileContent = rawOutput;
		else if (rawOutput.content && typeof rawOutput.content === "string") fileContent = rawOutput.content;
	}
	if (!fileContent && content) fileContent = extractTextFromContent(content);
	const totalLineCount = rawOutput?.totalLineCount || existingResult?.totalLineCount || fileContent.split("\n").length;
	const hasMore = rawOutput?.hasMore ?? existingResult?.hasMore ?? false;
	return {
		type: "read_file_result",
		path: filePath,
		content: fileContent,
		totalLineCount,
		hasMore,
		diagnostic: rawOutput?.diagnostic || existingResult?.diagnostic,
		hint: rawOutput?.hint || existingResult?.hint
	};
}
/**
* 将 ACP ToolCall/ToolCallUpdate 转换为 WriteToFileResult
*
* @param update - ACP ToolCall 或 ToolCallUpdate
* @param existingResult - 已有的结果（用于累积更新）
* @param fallbackArgs - 回退参数（用于在 rawInput 为空时获取工具参数）
*/
function convertToWriteToFileResult(update, existingResult, fallbackArgs) {
	const rawInput = update.rawInput;
	const args = rawInput && Object.keys(rawInput).length > 0 ? rawInput : fallbackArgs;
	const rawOutput = update.rawOutput;
	const content = update.content;
	const locations = "locations" in update ? update.locations : void 0;
	const filePath = args?.filePath || args?.file_path || locations?.[0]?.path || existingResult?.path || "unknown";
	const diff = extractDiffFromContent(content);
	const newContent = args?.new_str || args?.new_string || args?.content || args?.newContent || diff?.newText || "";
	const oldContent = args?.old_str || args?.old_string || args?.oldContent || diff?.oldText || existingResult?.oldContent || "";
	if (rawOutput?.addLineCount != null && rawOutput?.removedLines != null) return {
		type: "write_to_file_result",
		path: filePath,
		addLineCount: rawOutput.addLineCount,
		removedLines: rawOutput.removedLines,
		addedChars: rawOutput?.addedChars,
		removedChars: rawOutput?.removedChars,
		bytesWritten: rawOutput?.bytesWritten || newContent.length,
		isNewFile: rawOutput?.isNewFile ?? oldContent === null,
		oldContent: oldContent ?? void 0,
		diagnostic: rawOutput?.diagnostic
	};
	const diffStats = calculateDiffStats(oldContent || "", newContent);
	return {
		type: "write_to_file_result",
		path: filePath,
		addLineCount: rawOutput?.addLineCount || diffStats.addedLines,
		removedLines: rawOutput?.removedLines || diffStats.removedLines,
		addedChars: rawOutput?.addedChars,
		removedChars: rawOutput?.removedChars,
		bytesWritten: rawOutput?.bytesWritten || newContent.length,
		isNewFile: rawOutput?.isNewFile ?? oldContent === null,
		oldContent: oldContent ?? void 0,
		diagnostic: rawOutput?.diagnostic
	};
}
/**
* 将 ACP ToolCall/ToolCallUpdate 转换为 ReplaceInFileResult
*
* @param update - ACP ToolCall 或 ToolCallUpdate
* @param existingResult - 已有的结果（用于累积更新）
* @param fallbackArgs - 回退参数（用于在 rawInput 为空时获取工具参数，如流式解析的 args）
*
* 注意：对于 Edit 工具，rawInput 包含 old_string/new_string，这些参数对于 UI 渲染 diff 非常重要。
* 在流式场景下，rawInput 可能为空，此时使用 fallbackArgs（累积的 args）来获取这些参数。
*/
function convertToReplaceInFileResult(update, existingResult, fallbackArgs) {
	const rawInput = update.rawInput;
	const args = rawInput && Object.keys(rawInput).length > 0 ? rawInput : fallbackArgs;
	const rawOutput = update.rawOutput;
	const content = update.content;
	const locations = "locations" in update ? update.locations : void 0;
	const filePath = args?.filePath || args?.file_path || locations?.[0]?.path || existingResult?.path || "unknown";
	const diff = extractDiffFromContent(content);
	const oldStr = args?.old_str || args?.old_string || args?.oldContent || diff?.oldText || "";
	const newStr = args?.new_str || args?.new_string || args?.newContent || diff?.newText || "";
	if (rawOutput?.addLineCount != null && rawOutput?.removedLines != null) return {
		type: "replace_in_file_result",
		path: filePath,
		addLineCount: rawOutput.addLineCount,
		removedLines: rawOutput.removedLines,
		addedChars: rawOutput?.addedChars,
		removedChars: rawOutput?.removedChars,
		matchCount: rawOutput?.matchCount,
		hint: rawOutput?.hint,
		diagnosticChange: rawOutput?.diagnosticChange,
		oldContent: oldStr || void 0,
		newContent: newStr || void 0
	};
	const diffStats = calculateDiffStats(oldStr, newStr);
	return {
		type: "replace_in_file_result",
		path: filePath,
		addLineCount: rawOutput?.addLineCount || diffStats.addedLines,
		removedLines: rawOutput?.removedLines || diffStats.removedLines,
		addedChars: rawOutput?.addedChars,
		removedChars: rawOutput?.removedChars,
		matchCount: rawOutput?.matchCount,
		hint: rawOutput?.hint,
		diagnosticChange: rawOutput?.diagnosticChange,
		oldContent: oldStr || void 0,
		newContent: newStr || void 0
	};
}
/**
* 从 markdown 格式的搜索结果文本中提取结构化数据
*
* ACP WebSearch 返回的 markdown 格式：
* ```
* # Search Results for "query"
*
* ## 1. [title](url)
* snippet text...
*
* **URL:** url
*
* ---
*
* ## 2. [title](url)
* ...
* ```
*/
function parseWebSearchMarkdown(text) {
	const results = [];
	let query = "";
	let provider;
	const queryMatch = text.match(/# Search Results for "([^"]+)"/);
	if (queryMatch) query = queryMatch[1];
	const providerMatch = text.match(/Provider:\s*([^\s•*]+)/i);
	if (providerMatch) provider = providerMatch[1];
	const entries = text.split(/\n## \d+\.\s+/);
	for (const entry of entries) {
		if (!entry.trim() || entry.includes("# Search Results for")) continue;
		const linkMatch = entry.match(/^\[([^\]]+)\]\(([^)]+)\)/);
		if (!linkMatch) continue;
		const title = linkMatch[1];
		const url = linkMatch[2];
		let snippet = "";
		const afterLink = entry.slice(linkMatch[0].length);
		const urlLabelMatch = afterLink.match(/\*\*URL:\*\*\s*([^\n]+)/);
		const dividerIndex = afterLink.indexOf("---");
		let snippetEnd = afterLink.length;
		if (dividerIndex !== -1) snippetEnd = dividerIndex;
		if (urlLabelMatch) {
			const urlLabelIndex = afterLink.indexOf("**URL:**");
			if (urlLabelIndex !== -1 && urlLabelIndex < snippetEnd) snippetEnd = urlLabelIndex;
		}
		snippet = afterLink.slice(0, snippetEnd).trim();
		snippet = snippet.replace(/^\n+/, "");
		results.push({
			title,
			url,
			snippet: snippet || void 0
		});
	}
	return {
		provider,
		query,
		results
	};
}
/**
* 将 ACP ToolCall/ToolCallUpdate 转换为 WebSearchToolResult
*
* @param update - ACP ToolCall 或 ToolCallUpdate
* @param existingResult - 已有的结果（用于累积更新）
* @param fallbackArgs - 回退参数（用于在 rawInput 为空时获取工具参数）
*/
function convertToWebSearchResult(update, existingResult, fallbackArgs) {
	const rawInput = update.rawInput;
	const args = rawInput && Object.keys(rawInput).length > 0 ? rawInput : fallbackArgs;
	const content = update.content;
	const argsQuery = args?.query;
	const existingQuery = existingResult?.query;
	let textContent = "";
	if (content && Array.isArray(content)) {
		for (const block of content) if (block.type === "content" && block.content?.type === "text") textContent += block.content.text || "";
	}
	if (!textContent && update.rawOutput) {
		const rawOutput = update.rawOutput;
		if (Array.isArray(rawOutput)) {
			for (const item of rawOutput) if (typeof item === "object" && item !== null && "text" in item) textContent += item.text || "";
		} else if (typeof rawOutput === "object" && rawOutput !== null) textContent = JSON.stringify(rawOutput, null, 2);
	}
	const parsed = textContent ? parseWebSearchMarkdown(textContent) : {
		query: "",
		results: []
	};
	const query = argsQuery || existingQuery || parsed.query || "";
	const results = parsed.results.length > 0 ? parsed.results : existingResult?.results || [];
	return {
		type: "web_search_tool_result",
		query,
		searchType: "text2text",
		provider: parsed.provider || existingResult?.provider,
		results,
		images: existingResult?.images || [],
		totalResults: results.length || existingResult?.totalResults
	};
}
/**
* 将 ACP ToolCall/ToolCallUpdate 转换为 SearchFileResult
*
* @param update - ACP ToolCall 或 ToolCallUpdate
* @param existingResult - 已有的结果（用于累积更新）
* @param fallbackArgs - 回退参数（用于在 rawInput 为空时获取工具参数）
*/
function convertToSearchFileResult(update, existingResult, fallbackArgs) {
	const rawInput = update.rawInput;
	const args = rawInput && Object.keys(rawInput).length > 0 ? rawInput : fallbackArgs;
	const rawOutput = update.rawOutput;
	const content = update.content;
	const locations = "locations" in update ? update.locations : void 0;
	const path = args?.path || args?.directory || locations?.[0]?.path || existingResult?.path || ".";
	const pattern = args?.pattern || existingResult?.pattern || "*";
	let results = existingResult?.results || [];
	if (rawOutput?.results && Array.isArray(rawOutput.results)) results = rawOutput.results;
	else if (rawOutput?.files && Array.isArray(rawOutput.files)) results = rawOutput.files.map((f) => ({
		filePath: f.filePath || f.path || f,
		size: f.size || "",
		modifyTime: f.modifyTime || ""
	}));
	else if (content) {
		const textContent = extractTextFromContent(content);
		if (textContent) try {
			const parsed = JSON.parse(textContent);
			if (Array.isArray(parsed)) results = parsed.map((item) => ({
				filePath: typeof item === "string" ? item : item.filePath || item.path || String(item),
				size: typeof item === "object" ? item.size || "" : "",
				modifyTime: typeof item === "object" ? item.modifyTime || "" : ""
			}));
		} catch {
			results = textContent.split("\n").filter((l) => l.trim()).map((line) => {
				const match = line.match(/^([\w./-]+)\s*\(([\d.]+\s*\w+)\)?$/);
				if (match) return {
					filePath: match[1],
					size: match[2],
					modifyTime: ""
				};
				return {
					filePath: line.trim(),
					size: "",
					modifyTime: ""
				};
			});
		}
	}
	return {
		type: "search_file_result",
		path,
		pattern,
		recursive: args?.recursive,
		caseSensitive: args?.caseSensitive,
		results
	};
}
/**
* 将 ACP ToolCall/ToolCallUpdate 转换为 SearchContentResult
*
* @param update - ACP ToolCall 或 ToolCallUpdate
* @param existingResult - 已有的结果（用于累积更新）
* @param fallbackArgs - 回退参数（用于在 rawInput 为空时获取工具参数）
*/
function convertToSearchContentResult(update, existingResult, fallbackArgs) {
	const rawInput = update.rawInput;
	const args = rawInput && Object.keys(rawInput).length > 0 ? rawInput : fallbackArgs;
	const rawOutput = update.rawOutput;
	const content = update.content;
	const locations = "locations" in update ? update.locations : void 0;
	const searchPath = args?.path || args?.directory || locations?.[0]?.path || existingResult?.path || ".";
	const pattern = args?.pattern || existingResult?.pattern || "";
	const glob = args?.glob || args?.fileTypes || existingResult?.glob || "*";
	let matches = existingResult?.matches || [];
	if (rawOutput?.matches && Array.isArray(rawOutput.matches)) matches = rawOutput.matches;
	else if (rawOutput?.results && Array.isArray(rawOutput.results)) matches = rawOutput.results;
	else if (content) {
		const textContent = extractTextFromContent(content);
		if (textContent) {
			let parsed = null;
			try {
				const jsonParsed = JSON.parse(textContent);
				if (Array.isArray(jsonParsed)) parsed = jsonParsed;
			} catch {}
			if (parsed) {
				for (const item of parsed) if (typeof item === "string") {
					const matchLine = item.match(/^(.+?):(\d+):(.*)$/);
					if (matchLine) matches.push({
						filePath: matchLine[1],
						content: matchLine[3],
						startLine: parseInt(matchLine[2], 10),
						endLine: parseInt(matchLine[2], 10),
						size: "",
						modifyTime: ""
					});
				} else if (typeof item === "object" && item !== null) matches.push(item);
			} else {
				const lines = textContent.split("\n").filter((l) => l.trim());
				for (const line of lines) {
					const match = line.match(/^([\w./-]+)\s+(\d+)\|\s*(.*)$/);
					if (match) matches.push({
						filePath: match[1],
						content: match[3],
						startLine: parseInt(match[2], 10),
						endLine: parseInt(match[2], 10),
						size: "",
						modifyTime: ""
					});
				}
			}
		}
	}
	const totalCount = rawOutput?.totalCount || existingResult?.totalCount || matches.length;
	const hasMore = rawOutput?.hasMore ?? existingResult?.hasMore ?? false;
	return {
		type: "search_content_result",
		path: searchPath,
		pattern,
		glob,
		matches,
		totalCount,
		hasMore,
		offset: rawOutput?.offset || existingResult?.offset || 0,
		headLimit: rawOutput?.headLimit || rawOutput?.limit || existingResult?.headLimit || 100,
		contextBefore: rawOutput?.contextBefore || existingResult?.contextBefore || 0,
		contextAfter: rawOutput?.contextAfter || existingResult?.contextAfter || 0,
		contextAround: rawOutput?.contextAround || existingResult?.contextAround,
		outputMode: rawOutput?.outputMode || existingResult?.outputMode || "content",
		caseSensitive: rawOutput?.caseSensitive ?? existingResult?.caseSensitive ?? false,
		hint: rawOutput?.hint
	};
}
/**
* 解析格式化的命令执行输出文本
* 格式示例:
* Command: pwd && ls -lah
* Stdout: /workspace
* ...
* Stderr: (empty)
* Exit Code: 0
* Signal: (none)
*/
function parseExecuteCommandText(text) {
	if (!text.includes("Stdout:") && !text.includes("Exit Code:")) return null;
	let stdout = "";
	let stderr = "";
	let exitCode = -1;
	const stdoutMatch = text.match(/Stdout:\s*([\s\S]*?)(?=\n(?:Stderr:|Exit Code:)|$)/);
	if (stdoutMatch) stdout = stdoutMatch[1].trim();
	const stderrMatch = text.match(/Stderr:\s*([\s\S]*?)(?=\nExit Code:|$)/);
	if (stderrMatch) {
		const stderrValue = stderrMatch[1].trim();
		stderr = stderrValue === "(empty)" ? "" : stderrValue;
	}
	const exitCodeMatch = text.match(/Exit Code:\s*(\d+)/);
	if (exitCodeMatch) exitCode = parseInt(exitCodeMatch[1], 10);
	return {
		stdout,
		stderr,
		exitCode
	};
}
/**
* 将 ACP ToolCall/ToolCallUpdate 转换为 ExecuteCommandResult
*
* 注意：只从 rawOutput 中提取数据，不从 content 中累积
* 因为 content 在执行过程中包含的是输入内容，只有 rawOutput 在工具完成时才包含真正的执行结果
*/
function convertToExecuteCommandResult(update, existingResult) {
	const rawOutputValue = update.rawOutput;
	let stdout = existingResult?.stdout || "";
	let stderr = existingResult?.stderr || "";
	let exitCode = existingResult?.exitCode ?? -1;
	let rawOutputObj;
	if (rawOutputValue !== void 0) {
		if (typeof rawOutputValue === "string") {
			const parsed = parseExecuteCommandText(rawOutputValue);
			if (parsed) {
				stdout = parsed.stdout;
				stderr = parsed.stderr;
				exitCode = parsed.exitCode;
			} else stdout = rawOutputValue || stdout;
		} else if (Array.isArray(rawOutputValue)) {
			const texts = [];
			for (const item of rawOutputValue) if (item && typeof item === "object" && item.type === "text" && typeof item.text === "string") texts.push(item.text);
			if (texts.length > 0) {
				const combinedText = texts.join("");
				const parsed = parseExecuteCommandText(combinedText);
				if (parsed) {
					stdout = parsed.stdout;
					stderr = parsed.stderr;
					exitCode = parsed.exitCode;
				} else stdout = combinedText;
			}
		} else if (typeof rawOutputValue === "object" && rawOutputValue !== null) {
			rawOutputObj = rawOutputValue;
			stdout = rawOutputObj.stdout || stdout;
			stderr = rawOutputObj.stderr || stderr;
			exitCode = rawOutputObj.exitCode ?? exitCode;
		}
	}
	if (!stdout && update.content && Array.isArray(update.content)) {
		const parsedFromContent = parseExecuteCommandText(extractTextFromContent(update.content));
		if (parsedFromContent) {
			stdout = parsedFromContent.stdout || stdout;
			stderr = stderr || parsedFromContent.stderr;
			if (exitCode === -1 && parsedFromContent.exitCode !== -1) exitCode = parsedFromContent.exitCode;
		}
	}
	if (update.status === "completed" && exitCode === -1) exitCode = 0;
	else if (update.status === "failed" && exitCode === -1) exitCode = 1;
	return {
		type: "execute_command_result",
		stdout,
		stderr,
		exitCode,
		hint: rawOutputObj?.hint || existingResult?.hint,
		serviceInfo: rawOutputObj?.serviceInfo || existingResult?.serviceInfo,
		use_standalone_terminal: rawOutputObj?.use_standalone_terminal || existingResult?.use_standalone_terminal
	};
}
/**
* 将 ACP ToolCall/ToolCallUpdate 转换为 askuserquestion 的结果。
*
* 历史记录中 rawOutput 的格式为 { type: "text", text: " · q-0 → answer\n · q-1 → answer" }，
* content 中也包含相同文本。
*
* 返回带有 text 字段的结构，使 adapter-next 的 extractResultText 能通过 inner.text 读取。
*/
function convertToAskUserQuestionResult(update) {
	const rawOutput = update.rawOutput;
	const content = update.content;
	if (rawOutput && typeof rawOutput.text === "string") return {
		type: "text",
		text: rawOutput.text
	};
	if (content && Array.isArray(content)) {
		for (const block of content) if (block.type === "content" && block.content) {
			const innerContent = block.content;
			if (innerContent.type === "text" && typeof innerContent.text === "string") return {
				type: "text",
				text: innerContent.text
			};
		}
	}
	return {
		type: "text",
		text: ""
	};
}
/**
* 从 askuserquestion 的 args 和 result 中组装 questionAnswer 结构。
*
* @param args - 工具参数，包含 questions 数组
* @param resultText - 从 convertToAskUserQuestionResult 提取的答案文本
* @returns questionAnswer 结构，或 null（如果 args.questions 不存在）
*/
function buildAskUserQuestionAnswer(args, resultText) {
	const questions = args.questions;
	if (!Array.isArray(questions) || questions.length === 0) return null;
	const answerMap = /* @__PURE__ */ new Map();
	if (resultText) for (const line of resultText.split("\n")) {
		const match = line.match(/^\s*(?:[·•*-]\s*)?(.+?)\s*(?:→|->)\s*(.+)\s*$/);
		if (match) answerMap.set(match[1].trim(), match[2].trim());
	}
	return {
		questions: questions.map((q, index) => {
			const qId = typeof q.id === "string" && q.id ? q.id : `q-${index}`;
			const questionText = typeof q.question === "string" ? q.question : "";
			const answer = answerMap.get(qId) ?? answerMap.get(qId.replace("_", "-")) ?? answerMap.get(qId.replace("-", "_")) ?? answerMap.get(questionText);
			return {
				id: qId,
				question: questionText,
				answers: answer ? [answer] : []
			};
		}),
		title: typeof args.title === "string" ? args.title : void 0
	};
}
function tryExtractContentTextFromJson(text) {
	const trimmed = text.trim();
	if (!trimmed || !trimmed.startsWith("{") && !trimmed.startsWith("[")) return null;
	try {
		const parsed = JSON.parse(trimmed);
		if (Array.isArray(parsed)) {
			const texts = parsed.filter((item) => {
				if (!item || typeof item !== "object") return false;
				const type = item.type;
				return type === "text" || type === "input_text";
			}).map((item) => item.text).filter((value) => typeof value === "string");
			return texts.length > 0 ? texts.join("") : null;
		}
		if (parsed && typeof parsed === "object") {
			const content = parsed.content;
			if (Array.isArray(content)) {
				const texts = [];
				for (const item of content) {
					if (!item || typeof item !== "object") continue;
					const inner = item;
					if (inner.type === "text" && typeof inner.text === "string") texts.push(inner.text);
				}
				return texts.length > 0 ? texts.join("") : null;
			}
		}
	} catch {
		return null;
	}
	return null;
}
function normalizeMcpData(items) {
	const normalized = [];
	let textBuffer = "";
	const flushText = () => {
		if (!textBuffer) return;
		normalized.push({
			type: "text",
			text: textBuffer
		});
		textBuffer = "";
	};
	for (const item of items) {
		if (item.type === "text") {
			const rawText = item.text || "";
			const extracted = tryExtractContentTextFromJson(rawText);
			if (extracted !== null) {
				textBuffer = extracted;
				continue;
			}
			textBuffer += rawText;
			continue;
		}
		flushText();
		normalized.push(item);
	}
	flushText();
	if (normalized.length === 0) normalized.push({
		type: "text",
		text: ""
	});
	return normalized;
}
function attachMcpRawData(result, rawData) {
	Object.defineProperty(result, "rawData", {
		value: rawData,
		enumerable: false,
		configurable: true
	});
	return result;
}
/**
* 将 ACP ToolCall/ToolCallUpdate 转换为 McpCallToolResult
*/
function convertToMcpCallToolResult(update, toolName, existingResult) {
	const rawOutput = update.rawOutput;
	const content = update.content;
	const existingRawData = existingResult?.rawData;
	const rawData = Array.isArray(existingRawData) ? [...existingRawData] : Array.isArray(existingResult?.data) ? [...existingResult.data] : [];
	if (rawOutput && Array.isArray(rawOutput.data)) {
		const nextRawData = rawOutput.data;
		const normalizedData = normalizeMcpData(nextRawData);
		return attachMcpRawData({
			type: "mcp_call_tool_result",
			serverName: existingResult?.serverName || "unknown",
			toolName,
			data: normalizedData,
			isError: rawOutput.isError,
			error: rawOutput.error,
			hint: rawOutput.hint
		}, nextRawData);
	}
	if (content && Array.isArray(content)) {
		for (const block of content) if (block.type === "content" && block.content) {
			const innerContent = block.content;
			if (innerContent.type === "text" && "text" in innerContent) rawData.push({
				type: "text",
				text: innerContent.text
			});
			else if (innerContent.type === "image" && "data" in innerContent) rawData.push({
				type: "image",
				data: innerContent.data,
				mimeType: innerContent.mimeType
			});
		}
	}
	if (rawData.length === 0 && rawOutput && typeof rawOutput === "object") rawData.push({
		type: "text",
		text: JSON.stringify(rawOutput, null, 2)
	});
	const normalizedData = normalizeMcpData(rawData);
	return attachMcpRawData({
		type: "mcp_call_tool_result",
		serverName: existingResult?.serverName || "unknown",
		toolName,
		data: normalizedData,
		isError: update.status === "failed",
		error: update.status === "failed" ? "Tool execution failed" : void 0,
		hint: existingResult?.hint
	}, rawData);
}
/**
* 将 ACP ToolCall/ToolCallUpdate 转换为 TaskToolResult
*
* Task 工具用于启动 subagent 执行复杂任务。结果包含：
* - toolInfo: subagent 执行的工具详情列表
* - finalResult: subagent 的最终输出文本
* - toolCallBrief: 执行摘要
* - startCallTool: 是否开始调用工具
*
* @param update - ACP ToolCall 或 ToolCallUpdate
* @param existingResult - 已有的结果（用于累积更新）
*/
function convertToTaskToolResult(update, existingResult) {
	const rawOutput = update.rawOutput;
	let toolInfo = existingResult?.toolInfo || [];
	let finalResult = existingResult?.finalResult || "";
	let toolCallBrief = existingResult?.toolCallBrief || "";
	let startCallTool = existingResult?.startCallTool;
	if (rawOutput !== void 0) {
		if (Array.isArray(rawOutput)) {
			const texts = [];
			for (const item of rawOutput) if (item && typeof item === "object" && item.type === "text" && typeof item.text === "string") texts.push(item.text);
			if (texts.length > 0) finalResult = texts.join("");
		} else if (typeof rawOutput === "object" && rawOutput !== null) {
			const rawOutputObj = rawOutput;
			if (rawOutputObj.toolInfo && Array.isArray(rawOutputObj.toolInfo)) toolInfo = rawOutputObj.toolInfo;
			if (rawOutputObj.finalResult && typeof rawOutputObj.finalResult === "string") finalResult = rawOutputObj.finalResult;
			if (rawOutputObj.toolCallBrief && typeof rawOutputObj.toolCallBrief === "string") toolCallBrief = rawOutputObj.toolCallBrief;
			if (rawOutputObj.startCallTool !== void 0) startCallTool = rawOutputObj.startCallTool;
		} else if (typeof rawOutput === "string") {
			const trimmed = rawOutput.trim();
			if (trimmed.startsWith("{") || trimmed.startsWith("[")) try {
				const parsed = JSON.parse(trimmed);
				const parsedResult = parsed.result;
				if (parsedResult && typeof parsedResult === "object") {
					const inner = parsedResult;
					if (inner.type === "task_tool_result") {
						if (inner.toolInfo && Array.isArray(inner.toolInfo)) toolInfo = inner.toolInfo;
						if (typeof inner.finalResult === "string") finalResult = inner.finalResult;
						if (typeof inner.toolCallBrief === "string") toolCallBrief = inner.toolCallBrief;
						if (inner.startCallTool !== void 0) startCallTool = inner.startCallTool;
					}
				}
				if (typeof parsed.finalResult === "string") finalResult = parsed.finalResult;
				if (typeof parsed.toolCallBrief === "string") toolCallBrief = parsed.toolCallBrief;
				const parsedCode = parsed.code;
				const parsedMsg = parsed.msg;
				if ((typeof parsedCode === "number" || typeof parsedCode === "string") && typeof parsedMsg === "string") {
					const code = String(parsedCode);
					if (code !== "0") {
						toolCallBrief = `Subagent error (code=${code}${typeof parsed.requestId === "string" ? `, requestId=${parsed.requestId}` : ""}): ${parsedMsg}`;
						finalResult = "";
					}
				}
			} catch {
				finalResult = rawOutput;
			}
			else finalResult = rawOutput;
		}
	}
	return {
		type: "task_tool_result",
		toolInfo,
		finalResult,
		toolCallBrief,
		startCallTool
	};
}
/**
* 将 ACP ToolCall/ToolCallUpdate 转换为 ToolCallResultDetail
*
* @param update - ACP ToolCall 或 ToolCallUpdate
* @param notification - SessionNotification（用于提取 toolName）
* @param existingResult - 已有的结果（用于累积更新）
* @param fallbackArgs - 回退参数（用于在 rawInput 为空时获取工具参数，如流式解析的 args）
* @param fallbackKind - 回退 kind（用于 tool_call_update 时，因为 update 没有 kind）
* @param fallbackToolName - 回退工具名称（用于 tool_call_update 时，因为 notification._meta 可能没有 toolName）
* @returns ToolCallResultDetail 子类型
*/
function convertACPToToolCallResultDetail(update, notification, existingResult, fallbackArgs, fallbackKind, fallbackToolName) {
	const toolName = extractToolName(notification) || fallbackToolName || "";
	switch (determineToolCategory(toolName, "kind" in update ? update.kind : fallbackKind)) {
		case "read": return convertToReadFileResult(update, existingResult, fallbackArgs);
		case "write": return convertToWriteToFileResult(update, existingResult, fallbackArgs);
		case "edit": return convertToReplaceInFileResult(update, existingResult, fallbackArgs);
		case "search_file": return convertToSearchFileResult(update, existingResult, fallbackArgs);
		case "search_content": return convertToSearchContentResult(update, existingResult, fallbackArgs);
		case "bash": return convertToExecuteCommandResult(update, existingResult);
		case "task": return convertToTaskToolResult(update, existingResult);
		case "askuserquestion": return convertToAskUserQuestionResult(update);
		case "web_search": return convertToWebSearchResult(update, existingResult, fallbackArgs);
		default: return convertToMcpCallToolResult(update, toolName || "unknown", existingResult);
	}
}
/**
* 映射 ACP 状态到 ToolCallResult 状态
*/
function mapACPStatusToResultStatus(status) {
	switch (status) {
		case "completed": return "success";
		case "failed": return "error";
		case "cancelled":
		case "canceled": return "cancelled";
		case "in_progress": return "running";
		default: return "idle";
	}
}
var init_acp_result_converter = __esmMin((() => {
	init_lib();
}));
//#endregion
//#region ../../packages/agent-ui/src/adapters/utils/args-normalizer.ts
/**
* 根据工具名称获取规范化配置
*/
function getConfigForTool(toolName) {
	const normalizedToolName = toolName.toLowerCase().replace(/-/g, "_");
	return TOOL_NORMALIZATION_CONFIGS.find((config) => config.toolNames.some((name) => name.toLowerCase().replace(/-/g, "_") === normalizedToolName));
}
function isRecord(value) {
	return !!value && typeof value === "object" && !Array.isArray(value);
}
function splitToStringArray(value) {
	if (Array.isArray(value)) return value.filter((item) => typeof item === "string").map((item) => item.trim()).filter(Boolean);
	if (typeof value === "string") return value.split(/[\n,]/g).map((item) => item.trim()).filter(Boolean);
	return [];
}
function isVisualizerToolName(toolName) {
	if (!toolName) return false;
	return VISUALIZER_TOOL_NAME_SET.has(toolName.toLowerCase().replace(/-/g, "_"));
}
function normalizeVisualizerArgs(args) {
	const nestedArguments = isRecord(args.arguments) ? args.arguments : void 0;
	const merged = nestedArguments ? {
		...args,
		...nestedArguments
	} : { ...args };
	if (typeof merged.widgetCode === "string" && !("widget_code" in merged)) merged.widget_code = merged.widgetCode;
	const normalizedLoadingMessages = splitToStringArray(merged.loading_messages ?? merged.loadingMessages);
	if (normalizedLoadingMessages.length > 0) merged.loading_messages = normalizedLoadingMessages;
	if (typeof merged.modules === "string") {
		const modules = splitToStringArray(merged.modules);
		if (modules.length > 0) merged.modules = modules;
	}
	return merged;
}
/**
* 应用字段映射规则
* 如果找到别名字段且规范化字段不存在，则添加规范化字段
*/
function applyFieldMappings(args, mappings) {
	const result = { ...args };
	for (const mapping of mappings) {
		if (mapping.normalized in result) continue;
		for (const alias of mapping.aliases) if (alias in result) {
			result[mapping.normalized] = result[alias];
			break;
		}
	}
	return result;
}
/**
* 规范化工具参数
*
* @param args - 原始工具参数
* @param toolName - 工具名称（可选，用于应用工具特定的规则）
* @param kind - 工具类型/kind（可选，作为 toolName 的备选）
* @returns 规范化后的参数（包含原有字段 + 规范化字段）
*
* @example
* // Edit 工具
* normalizeToolArgs({ old_string: 'foo', new_string: 'bar' }, 'Edit')
* // => { old_string: 'foo', new_string: 'bar', old_str: 'foo', new_str: 'bar' }
*
* @example
* // Read 工具
* normalizeToolArgs({ file_path: '/path/to/file' }, 'Read')
* // => { file_path: '/path/to/file', filePath: '/path/to/file' }
*/
function normalizeToolArgs(args, toolName, kind) {
	if (!args || typeof args !== "object") return args || {};
	let result = { ...args };
	const effectiveToolName = toolName || kind;
	if (isVisualizerToolName(effectiveToolName)) result = normalizeVisualizerArgs(result);
	result = applyFieldMappings(result, COMMON_FIELD_MAPPINGS);
	if (effectiveToolName) {
		const config = getConfigForTool(effectiveToolName);
		if (config) result = applyFieldMappings(result, config.fieldMappings);
	}
	if (!effectiveToolName) {
		if ("old_string" in args || "new_string" in args) {
			const editConfig = getConfigForTool("edit");
			if (editConfig) result = applyFieldMappings(result, editConfig.fieldMappings);
		}
		if (isRecord(result.arguments) && [
			"widget_code",
			"widgetCode",
			"loading_messages",
			"loadingMessages",
			"modules"
		].some((key) => key in result.arguments)) result = normalizeVisualizerArgs(result);
	}
	return result;
}
var TOOL_NORMALIZATION_CONFIGS, COMMON_FIELD_MAPPINGS, VISUALIZER_TOOL_NAME_SET;
var init_args_normalizer = __esmMin((() => {
	TOOL_NORMALIZATION_CONFIGS = [
		{
			toolNames: [
				"edit",
				"multiedit",
				"replace_in_file",
				"replace-in-file"
			],
			fieldMappings: [
				{
					normalized: "old_str",
					aliases: [
						"old_string",
						"oldString",
						"oldText",
						"old_text"
					]
				},
				{
					normalized: "new_str",
					aliases: [
						"new_string",
						"newString",
						"newText",
						"new_text"
					]
				},
				{
					normalized: "filePath",
					aliases: [
						"file_path",
						"path",
						"file",
						"name"
					]
				}
			]
		},
		{
			toolNames: [
				"write",
				"write_to_file",
				"write-to-file"
			],
			fieldMappings: [{
				normalized: "filePath",
				aliases: [
					"file_path",
					"path",
					"file",
					"name"
				]
			}, {
				normalized: "content",
				aliases: [
					"text",
					"data",
					"body"
				]
			}]
		},
		{
			toolNames: [
				"read",
				"read_file",
				"read-file"
			],
			fieldMappings: [
				{
					normalized: "filePath",
					aliases: [
						"file_path",
						"path",
						"file",
						"name"
					]
				},
				{
					normalized: "offset",
					aliases: [
						"start",
						"startLine",
						"start_line",
						"from"
					]
				},
				{
					normalized: "limit",
					aliases: [
						"end",
						"endLine",
						"end_line",
						"to",
						"lines"
					]
				}
			]
		},
		{
			toolNames: [
				"glob",
				"search_file",
				"search-file",
				"list_dir",
				"list-dir"
			],
			fieldMappings: [{
				normalized: "path",
				aliases: [
					"directory",
					"dir",
					"root",
					"base_path",
					"basePath"
				]
			}, {
				normalized: "pattern",
				aliases: [
					"glob",
					"glob_pattern",
					"globPattern",
					"include"
				]
			}]
		},
		{
			toolNames: [
				"grep",
				"search_content",
				"search-content",
				"ripgrep",
				"rg"
			],
			fieldMappings: [
				{
					normalized: "path",
					aliases: [
						"directory",
						"dir",
						"root",
						"base_path",
						"basePath"
					]
				},
				{
					normalized: "pattern",
					aliases: [
						"regex",
						"query",
						"search",
						"keyword"
					]
				},
				{
					normalized: "glob",
					aliases: [
						"fileTypes",
						"file_types",
						"include",
						"file_pattern"
					]
				}
			]
		},
		{
			toolNames: [
				"bash",
				"execute_command",
				"execute-command",
				"shell",
				"terminal"
			],
			fieldMappings: [
				{
					normalized: "command",
					aliases: [
						"cmd",
						"script",
						"shell_command",
						"shellCommand"
					]
				},
				{
					normalized: "cwd",
					aliases: [
						"workingDirectory",
						"working_directory",
						"dir",
						"path"
					]
				},
				{
					normalized: "timeout",
					aliases: [
						"timeoutMs",
						"timeout_ms",
						"maxTime",
						"max_time"
					]
				}
			]
		},
		{
			toolNames: ["task"],
			fieldMappings: [{
				normalized: "subagent_name",
				aliases: [
					"subagent_type",
					"subagentType",
					"agentType",
					"agent_type"
				]
			}]
		},
		{
			toolNames: [
				"show_widget",
				"visualizer_show_widget",
				"visualizer:show_widget",
				"visualize:show_widget"
			],
			fieldMappings: [
				{
					normalized: "title",
					aliases: ["name", "id"]
				},
				{
					normalized: "widget_code",
					aliases: [
						"widgetCode",
						"html",
						"code",
						"svg"
					]
				},
				{
					normalized: "loading_messages",
					aliases: [
						"loadingMessages",
						"loading_message",
						"loadingMessage"
					]
				}
			]
		},
		{
			toolNames: [
				"read_me",
				"visualizer_read_me",
				"visualizer:read_me",
				"visualize:read_me"
			],
			fieldMappings: [{
				normalized: "modules",
				aliases: [
					"module",
					"moduleNames",
					"readme_modules",
					"readmeModules"
				]
			}]
		}
	];
	COMMON_FIELD_MAPPINGS = [{
		normalized: "filePath",
		aliases: ["file_path"]
	}];
	VISUALIZER_TOOL_NAME_SET = new Set(TOOL_NORMALIZATION_CONFIGS.filter((config) => config.toolNames.some((name) => name.includes("show_widget") || name.includes("read_me"))).flatMap((config) => config.toolNames.map((name) => name.toLowerCase().replace(/-/g, "_"))));
}));
//#endregion
//#region ../../packages/agent-ui/src/adapters/utils/json-stream-parser.ts
var JsonStreamParser;
var init_json_stream_parser = __esmMin((() => {
	JsonStreamParser = class {
		constructor() {
			this.buffer = "";
			this.parsedParams = /* @__PURE__ */ new Map();
			this.completed = false;
		}
		/**
		* 追加 JSON 片段到缓冲区
		* @param delta - JSON 增量字符串
		* @returns 当前解析结果
		*/
		appendDelta(delta) {
			if (this.completed) return this.getCurrentResult();
			this.buffer += delta;
			return this.tryParse();
		}
		/**
		* 设置完整的 JSON（用于收到完整 rawInput 时）
		* @param json - 完整的 JSON 对象或字符串
		*/
		setComplete(json) {
			if (typeof json === "string") {
				this.buffer = json;
				try {
					const parsed = JSON.parse(json);
					this.updateParsedParams(parsed, true);
				} catch {}
			} else {
				this.buffer = JSON.stringify(json);
				this.updateParsedParams(json, true);
			}
			this.completed = true;
		}
		/**
		* 获取当前解析结果
		*/
		getCurrentResult() {
			const parameters = {};
			this.parsedParams.forEach((param, name) => {
				parameters[name] = param.value;
			});
			return {
				complete: this.completed,
				parameters,
				rawBuffer: this.buffer,
				hasError: false
			};
		}
		/**
		* 获取当前缓冲区内容
		*/
		getBuffer() {
			return this.buffer;
		}
		/**
		* 是否已完成解析
		*/
		isCompleted() {
			return this.completed;
		}
		/**
		* 重置解析器状态
		*/
		reset() {
			this.buffer = "";
			this.parsedParams.clear();
			this.completed = false;
		}
		/**
		* 尝试解析当前缓冲区
		*/
		tryParse() {
			const trimmed = this.buffer.trim();
			if (!trimmed || trimmed === "{}") return {
				complete: false,
				parameters: {},
				rawBuffer: this.buffer,
				hasError: false
			};
			try {
				const parsed = JSON.parse(trimmed);
				this.updateParsedParams(parsed, true);
				this.completed = true;
				return this.getCurrentResult();
			} catch {
				const smartResult = this.trySmartParse(trimmed);
				if (smartResult) {
					const { parsed, isComplete } = smartResult;
					if (Object.keys(parsed).length > 0) {
						this.updateParsedParams(parsed, isComplete);
						if (isComplete) {
							this.completed = true;
							return this.getCurrentResult();
						}
					}
				}
				return {
					complete: false,
					parameters: this.getParametersObject(),
					rawBuffer: this.buffer,
					hasError: false
				};
			}
		}
		/**
		* 智能解析不完整的 JSON
		* 参考 stream-parser.ts 的 trySmartParse 实现
		* @returns 解析结果，包含解析出的对象和是否完整
		*/
		trySmartParse(jsonText) {
			let trimmed = jsonText.trim();
			trimmed = this.tryFixMissingPrefix(trimmed);
			if (!trimmed.startsWith("{")) return;
			try {
				const completed = this.tryCompleteJson(trimmed);
				if (completed) return {
					parsed: JSON.parse(completed),
					isComplete: completed === trimmed
				};
			} catch {}
			const extracted = this.extractPartialKeyValues(trimmed);
			if (extracted) return {
				parsed: extracted,
				isComplete: false
			};
		}
		/**
		* 尝试修复缺失的 JSON 前缀
		* 处理流式传输中可能丢失的开头字符
		*/
		tryFixMissingPrefix(text) {
			const trimmed = text.trim();
			if (trimmed.startsWith("{")) return trimmed;
			if (trimmed.startsWith("\"")) return "{" + trimmed;
			if (trimmed.match(/^([a-zA-Z_][a-zA-Z0-9_]*)"\s*:/)) return "{\"" + trimmed;
			const looseKeyMatch = trimmed.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*"?\s*:/);
			if (looseKeyMatch) {
				const key = looseKeyMatch[1];
				const restIndex = looseKeyMatch[0].length;
				const rest = trimmed.substring(restIndex);
				return "{\"" + key + "\":" + rest;
			}
			return trimmed;
		}
		/**
		* 尝试补全不完整的 JSON
		*/
		tryCompleteJson(jsonText) {
			const trimmed = jsonText.trim();
			let braceCount = 0;
			let bracketCount = 0;
			let inString = false;
			let escaped = false;
			for (let i = 0; i < trimmed.length; i++) {
				const char = trimmed[i];
				if (char === "\\" && !escaped) {
					escaped = true;
					continue;
				}
				if (char === "\"" && !escaped) inString = !inString;
				if (!inString) {
					if (char === "{") braceCount++;
					if (char === "}") braceCount--;
					if (char === "[") bracketCount++;
					if (char === "]") bracketCount--;
				}
				escaped = false;
			}
			if (braceCount === 0 && bracketCount === 0 && !inString) return trimmed;
			let result = trimmed;
			if (inString) result += "\"";
			while (bracketCount > 0) {
				result += "]";
				bracketCount--;
			}
			while (braceCount > 0) {
				result += "}";
				braceCount--;
			}
			try {
				JSON.parse(result);
				return result;
			} catch {
				return null;
			}
		}
		/**
		* 从不完整的 JSON 中提取已完成的键值对
		*/
		extractPartialKeyValues(jsonText) {
			const result = {};
			const parts = this.smartSplitJson(jsonText);
			for (const part of parts) {
				const colonIndex = part.indexOf(":");
				if (colonIndex === -1) continue;
				const keyPart = part.substring(0, colonIndex).trim();
				const valuePart = part.substring(colonIndex + 1).trim();
				const cleanKey = keyPart.replace(/^[{"]|"$/g, "").trim();
				if (!cleanKey) continue;
				const parsedValue = this.tryParseValue(valuePart);
				if (parsedValue !== void 0) result[cleanKey] = parsedValue;
			}
			return Object.keys(result).length > 0 ? result : void 0;
		}
		/**
		* 尝试解析值
		*/
		tryParseValue(valueText) {
			const trimmed = valueText.trim();
			if (!trimmed) return;
			try {
				if (trimmed.startsWith("\"") && !trimmed.endsWith("\"")) return this.unescapeJsonString(trimmed.slice(1));
				const cleanValue = trimmed.replace(/[,}]+$/, "");
				if (!cleanValue) return;
				return JSON.parse(cleanValue);
			} catch {
				if (trimmed.startsWith("\"")) return this.unescapeJsonString(trimmed.slice(1).replace(/[,}]+$/, ""));
				const numMatch = trimmed.match(/^(-?\d+(\.\d+)?)/);
				if (numMatch) return parseFloat(numMatch[1]);
				if (trimmed.startsWith("true")) return true;
				if (trimmed.startsWith("false")) return false;
				if (trimmed.startsWith("null")) return null;
				return;
			}
		}
		/**
		* 智能分割 JSON 字符串，正确处理字符串内容中的逗号
		*/
		smartSplitJson(jsonText) {
			const parts = [];
			let currentPart = "";
			let inString = false;
			let escaped = false;
			let braceDepth = 0;
			let bracketDepth = 0;
			for (let i = 0; i < jsonText.length; i++) {
				const char = jsonText[i];
				if (char === "\\" && !escaped) {
					escaped = true;
					currentPart += char;
					continue;
				}
				if (char === "\"" && !escaped) {
					inString = !inString;
					currentPart += char;
					escaped = false;
					continue;
				}
				if (!inString) {
					if (char === "{") braceDepth++;
					else if (char === "}") braceDepth--;
					else if (char === "[") bracketDepth++;
					else if (char === "]") bracketDepth--;
					else if (char === "," && braceDepth === 1 && bracketDepth === 0) {
						parts.push(currentPart.trim());
						currentPart = "";
						escaped = false;
						continue;
					}
				}
				currentPart += char;
				escaped = false;
			}
			if (currentPart.trim()) parts.push(currentPart.trim());
			return parts;
		}
		/**
		* 处理 JSON 字符串中的转义字符
		*/
		unescapeJsonString(str) {
			if (str.endsWith("\\") && !str.endsWith("\\\\")) return str;
			return str.replace(/\\([\\/"'bfnrt])/g, (match, char) => {
				return {
					"\\": "\\",
					"/": "/",
					"\"": "\"",
					"'": "'",
					"b": "\b",
					"f": "\f",
					"n": "\n",
					"r": "\r",
					"t": "	"
				}[char] || match;
			});
		}
		/**
		* 更新已解析的参数
		*/
		updateParsedParams(params, completed) {
			for (const [key, value] of Object.entries(params)) this.parsedParams.set(key, {
				name: key,
				value,
				completed
			});
		}
		/**
		* 获取参数对象
		*/
		getParametersObject() {
			const result = {};
			this.parsedParams.forEach((param, name) => {
				result[name] = param.value;
			});
			return result;
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/adapters/acp-message-accumulator.ts
function isTerminalACPToolStatus(status) {
	return status === "completed" || status === "failed" || status === "cancelled" || status === "canceled";
}
var ACPMessageAccumulator;
var init_acp_message_accumulator = __esmMin((() => {
	init_chat_types();
	init_http_logger();
	init_interactive_question_tools();
	init_acp_result_converter();
	init_acp_timestamp();
	init_args_normalizer();
	init_json_stream_parser();
	ACPMessageAccumulator = class ACPMessageAccumulator {
		static {
			this.PENDING_TOOL_STATUSES = [
				"idle",
				"pending",
				"parsing",
				"stream_executing",
				"full_executing"
			];
		}
		constructor(options) {
			this.states = /* @__PURE__ */ new Map();
			this.logPrefix = options?.logPrefix || "[ACPMessageAccumulator]";
		}
		/**
		* 判断是否为需要累积的更新类型
		*/
		isAccumulatableUpdate(updateType) {
			return [
				"agent_message_chunk",
				"agent_thought_chunk",
				"tool_call",
				"tool_call_update"
			].includes(updateType);
		}
		/**
		* 处理 ACP 更新，返回 ConversionResult
		*
		* @param sessionId - 会话 ID
		* @param notification - ACP SessionNotification
		* @returns ConversionResult - 转换后的结果
		*/
		handleUpdate(sessionId, notification) {
			const update = notification.update;
			const updateType = update.sessionUpdate;
			const state = this.getOrCreateState(sessionId, notification);
			const parentToolUseId = this.extractParentToolUseId(notification);
			switch (update.sessionUpdate) {
				case "agent_message_chunk":
					this.handleTextChunk(state, update, "text", parentToolUseId);
					break;
				case "agent_thought_chunk":
					this.handleTextChunk(state, update, "reasoning", parentToolUseId);
					break;
				case "tool_call":
					this.handleToolCall(state, update, notification);
					break;
				case "tool_call_update":
					this.handleToolCallUpdate(state, update, notification);
					break;
				default: console.warn(`${this.logPrefix} Unhandled update type: ${updateType}`);
			}
			return this.createConversionResult(sessionId, state);
		}
		/**
		* 获取或创建累积状态
		*/
		getOrCreateState(sessionId, notification) {
			let state = this.states.get(sessionId);
			const incomingRequestId = this.extractRequestId(notification);
			const incomingMessageId = this.extractMessageId(notification);
			if (!state || state.pendingReset) {
				const messageId = incomingMessageId || `${sessionId}-response-${Math.random().toString(36).slice(2)}`;
				const requestId = incomingRequestId || messageId;
				if (!state) {
					state = {
						messageId,
						contentBlocks: [],
						createTime: this.extractTimestamp(notification) ?? Date.now(),
						toolCallIdToIndex: /* @__PURE__ */ new Map(),
						lastTextIndex: -1,
						lastReasoningIndex: -1,
						requestId,
						questionRequestToolCallIds: /* @__PURE__ */ new Set(),
						toolCallParsers: /* @__PURE__ */ new Map(),
						toolCallIdToKind: /* @__PURE__ */ new Map(),
						subAgentToolInfo: /* @__PURE__ */ new Map(),
						subAgentToolCallIdToParent: /* @__PURE__ */ new Map(),
						subAgentPermissionCache: /* @__PURE__ */ new Map(),
						parentReasoningIndex: /* @__PURE__ */ new Map()
					};
					this.states.set(sessionId, state);
				} else {
					state.messageId = messageId;
					state.requestId = requestId;
					state.createTime = this.extractTimestamp(notification) ?? Date.now();
					state.pendingReset = false;
				}
			} else {
				const incomingTimestamp = this.extractTimestamp(notification);
				if (incomingTimestamp !== void 0) state.createTime = Math.max(state.createTime, incomingTimestamp);
				if (incomingRequestId && incomingRequestId !== state.requestId) {
					try {
						writeRendererLog("acp-accum", "warn", `[getOrCreateState] REQUEST-ID DRIFT sessionId=${sessionId.slice(0, 8)} msgId=${state.messageId} stateReqId=${state.requestId} incomingReqId=${incomingRequestId} incomingMsgId=${incomingMessageId ?? "n/a"} updateType=${notification.update?.sessionUpdate}`);
					} catch {}
					state.requestId = incomingRequestId;
				}
			}
			if (!state.traceId) state.traceId = this.extractTraceId(notification);
			if (!state.modelId) state.modelId = this.extractModelId(notification);
			if (!state.modelName) state.modelName = this.extractModelName(notification);
			return state;
		}
		/**
		* Advance the active assistant message to the latest source-message time.
		* PromptResponse/session_end use this when the SDK final history item was
		* intentionally deduplicated after its text had already streamed.
		*/
		advanceTimestamp(sessionId, timestamp) {
			const state = this.states.get(sessionId);
			if (!state || !Number.isFinite(timestamp)) return false;
			state.createTime = Math.max(state.createTime, timestamp);
			return true;
		}
		/**
		* Rebuild active accumulator state from a materialized assistant message.
		*
		* This is used when a running session is re-entered after captured history
		* has rebuilt the renderer Store: subsequent live chunks still need the
		* accumulator's block indexes and tool-call mappings to continue from that
		* same message instead of starting from an empty state.
		*/
		hydrateFromAssistantMessage(sessionId, message) {
			if (!message?.id || !Array.isArray(message.content)) return;
			const existing = this.states.get(sessionId);
			if (existing && existing.messageId !== message.id) return;
			const contentBlocks = structuredClone(message.content);
			const state = existing ?? {
				messageId: message.id,
				contentBlocks: [],
				createTime: typeof message.createTime === "number" ? message.createTime : Date.now(),
				toolCallIdToIndex: /* @__PURE__ */ new Map(),
				lastTextIndex: -1,
				lastReasoningIndex: -1,
				requestId: message.requestId || message.id,
				questionRequestToolCallIds: /* @__PURE__ */ new Set(),
				toolCallParsers: /* @__PURE__ */ new Map(),
				toolCallIdToKind: /* @__PURE__ */ new Map(),
				subAgentToolInfo: /* @__PURE__ */ new Map(),
				subAgentToolCallIdToParent: /* @__PURE__ */ new Map(),
				subAgentPermissionCache: /* @__PURE__ */ new Map(),
				parentReasoningIndex: /* @__PURE__ */ new Map(),
				...message.extra?.traceId ? { traceId: message.extra.traceId } : {},
				...message.extra?.modelId ? { modelId: message.extra.modelId } : {},
				...message.extra?.modelName ? { modelName: message.extra.modelName } : {}
			};
			state.messageId = message.id;
			state.requestId = message.requestId || message.id;
			state.createTime = typeof message.createTime === "number" ? message.createTime : state.createTime;
			if (!state.traceId && message.extra?.traceId) state.traceId = message.extra.traceId;
			if (!state.modelId && message.extra?.modelId) state.modelId = message.extra.modelId;
			if (!state.modelName && message.extra?.modelName) state.modelName = message.extra.modelName;
			state.contentBlocks = contentBlocks;
			state.toolCallIdToIndex = /* @__PURE__ */ new Map();
			state.lastTextIndex = -1;
			state.lastReasoningIndex = -1;
			state.parentReasoningIndex = /* @__PURE__ */ new Map();
			for (let index = 0; index < contentBlocks.length; index++) {
				const block = contentBlocks[index];
				if (block?.type === "text") {
					state.lastTextIndex = index;
					continue;
				}
				if (block?.type === "reasoning") {
					state.lastReasoningIndex = index;
					continue;
				}
				if (block?.type === "tool-call" && typeof block.tool?.id === "string") {
					state.toolCallIdToIndex.set(block.tool.id, index);
					if (typeof block.tool?.kind === "string") state.toolCallIdToKind.set(block.tool.id, block.tool.kind);
					if (!state.toolCallParsers.has(block.tool.id)) state.toolCallParsers.set(block.tool.id, new JsonStreamParser());
					state.lastTextIndex = -1;
					state.lastReasoningIndex = -1;
				}
			}
			this.states.set(sessionId, state);
		}
		/**
		* 从通知中提取 messageId
		* 检查两个位置：notification._meta（顶层，replay 路径）和 notification.update._meta（live 路径）
		*/
		extractMessageId(notification) {
			const updateMessageId = notification.update?.messageId;
			if (typeof updateMessageId === "string" && updateMessageId) return updateMessageId;
			const metaSources = [notification._meta, notification.update?._meta];
			for (const meta of metaSources) {
				if (!meta || typeof meta !== "object") continue;
				const codebuddyMeta = meta["codebuddy.ai"];
				if (codebuddyMeta && typeof codebuddyMeta === "object" && codebuddyMeta.messageId) return codebuddyMeta.messageId;
				if (meta["codebuddy.ai/messageId"]) return meta["codebuddy.ai/messageId"];
			}
		}
		extractTimestamp(notification) {
			return resolveAcpMetaTimestamp(notification._meta, notification.update?._meta);
		}
		/**
		* 从通知中提取 requestId
		* 检查两个位置：notification._meta（顶层，replay 路径）和 notification.update._meta（live 路径）
		* injectTrackingMeta 将 requestId 注入到 update._meta['codebuddy.ai/requestId']
		*/
		extractRequestId(notification) {
			const metaSources = [notification._meta, notification.update?._meta];
			for (const meta of metaSources) {
				if (!meta || typeof meta !== "object") continue;
				const cbMeta = meta["codebuddy.ai"];
				if (cbMeta && typeof cbMeta === "object" && cbMeta.requestId) return cbMeta.requestId;
				if (meta["codebuddy.ai/requestId"]) return meta["codebuddy.ai/requestId"];
			}
		}
		/**
		* 从 _meta 中提取 traceId
		* 检查两个位置：notification._meta（顶层）和 notification.update._meta（update 层）
		* injectTrackingMeta 将 traceId 注入到 update._meta['codebuddy.ai/traceId']
		*/
		extractTraceId(notification) {
			const metaSources = [notification._meta, notification.update?._meta];
			for (const meta of metaSources) {
				if (!meta || typeof meta !== "object") continue;
				const cbMeta = meta["codebuddy.ai"];
				if (cbMeta && typeof cbMeta === "object" && cbMeta.traceId) return cbMeta.traceId;
				if (meta["codebuddy.ai/traceId"]) return meta["codebuddy.ai/traceId"];
				if (meta.traceId) return meta.traceId;
			}
		}
		/**
		* 从 _meta 中提取 modelId
		* 与 extractTraceId 相同的查找策略
		*/
		extractModelId(notification) {
			const metaSources = [notification._meta, notification.update?._meta];
			for (const meta of metaSources) {
				if (!meta || typeof meta !== "object") continue;
				const cbMeta = meta["codebuddy.ai"];
				if (cbMeta && typeof cbMeta === "object" && cbMeta.modelId) return cbMeta.modelId;
				if (meta["codebuddy.ai/requestModelId"]) return meta["codebuddy.ai/requestModelId"];
			}
		}
		/**
		* 从 _meta 中提取 modelName（人类可读的模型名称，如 "Claude 3.5 Sonnet"）
		* 与 extractModelId 相同的查找策略。当 _meta 中无该字段时返回 undefined（例如部分历史会话）。
		*/
		extractModelName(notification) {
			const metaSources = [notification._meta, notification.update?._meta];
			for (const meta of metaSources) {
				if (!meta || typeof meta !== "object") continue;
				const cbMeta = meta["codebuddy.ai"];
				if (cbMeta && typeof cbMeta === "object" && cbMeta.modelName) return cbMeta.modelName;
				if (meta["codebuddy.ai/requestModelName"]) return meta["codebuddy.ai/requestModelName"];
			}
		}
		/**
		* 从 _meta 中提取工具名称
		*/
		extractToolName(notification) {
			const meta = notification._meta;
			if (meta && typeof meta === "object") {
				const codebuddyMeta = meta["codebuddy.ai"];
				if (codebuddyMeta && typeof codebuddyMeta === "object") return codebuddyMeta.toolName;
			}
		}
		/**
		* 从通知中提取 parentToolUseId（并行 sub-Agent 的父 Task 工具 ID）
		*
		* #68586: sub-Agent 的 agent_thought_chunk 携带 parentToolCallId 元数据，
		* 但 accumulator 未按 parent 分桶，导致不同 sub-Agent 的 reasoning 文本
		* 被错误追加到同一 contentBlock 造成叠印。
		*/
		extractParentToolUseId(notification) {
			const metaSources = [notification._meta, notification.update?._meta];
			for (const meta of metaSources) {
				if (!meta || typeof meta !== "object") continue;
				const cbMeta = meta["codebuddy.ai"];
				if (cbMeta && typeof cbMeta === "object" && cbMeta.parentToolCallId) return cbMeta.parentToolCallId;
				if (meta["codebuddy.ai/parentToolCallId"]) return meta["codebuddy.ai/parentToolCallId"];
			}
		}
		/**
		* 处理文本/推理 chunk
		*
		* @param parentToolUseId - 并行 sub-Agent 的 parentToolUseId（#68586）。
		*   若 reasoning chunk 属于某个 sub-Agent，则使用该 parent 的独立 lastReasoningIndex，
		*   避免不同 sub-Agent 的 reasoning 文本被追加到同一个 contentBlock 导致叠印。
		*/
		handleTextChunk(state, update, type, parentToolUseId) {
			const text = this.extractText(update);
			const meta = update._meta;
			if (type === "text" && meta?.["codebuddy.ai/contentFilterNotice"] === true) state.contentFilterNotice = true;
			if (!text) return;
			const useParentIndexing = type === "reasoning" && parentToolUseId;
			const indexKey = type === "text" ? "lastTextIndex" : "lastReasoningIndex";
			const globalLastIndex = state[indexKey];
			const parentLastIndex = useParentIndexing ? state.parentReasoningIndex.get(parentToolUseId) ?? -1 : globalLastIndex;
			const lastIndex = useParentIndexing ? parentLastIndex : globalLastIndex;
			if (lastIndex >= 0 && lastIndex === state.contentBlocks.length - 1 && state.contentBlocks[lastIndex]?.type === type) {
				const oldBlock = state.contentBlocks[lastIndex];
				const nextText = text === oldBlock.text ? oldBlock.text : text.length > oldBlock.text.length && text.startsWith(oldBlock.text) ? text : oldBlock.text + text;
				state.contentBlocks[lastIndex] = {
					...oldBlock,
					text: nextText
				};
			} else {
				const newBlock = {
					type,
					text
				};
				state.contentBlocks.push(newBlock);
				const newIndex = state.contentBlocks.length - 1;
				if (useParentIndexing) state.parentReasoningIndex.set(parentToolUseId, newIndex);
				else state[indexKey] = newIndex;
			}
		}
		/**
		* 处理 tool_call
		*/
		handleToolCall(state, update, notification) {
			const toolCallId = this.extractToolCallId(update);
			if (!toolCallId) {
				console.warn(`${this.logPrefix} tool_call without toolCallId`);
				return;
			}
			const toolName = this.mapACPKindToToolName(update, notification);
			if (toolName && toolName.toLowerCase() === "askuserquestion") state.questionRequestToolCallIds.add(toolCallId);
			const incomingSignature = this.getAskUserQuestionSignature({
				name: toolName,
				args: update.rawInput || {}
			});
			if (incomingSignature && this.hasResolvedAskUserQuestionWithSignature(state, incomingSignature)) {
				this.removePendingAskUserQuestionToolsWithSignature(state, incomingSignature);
				state.questionRequestToolCallIds.delete(toolCallId);
				return;
			}
			const existingIndex = state.toolCallIdToIndex.get(toolCallId);
			if (existingIndex !== void 0) {
				const updatedTool = { ...state.contentBlocks[existingIndex].tool };
				const rawInput = update.rawInput;
				if (rawInput && Object.keys(rawInput).length > 0) {
					const parser = state.toolCallParsers.get(toolCallId);
					if (parser) parser.setComplete(rawInput);
				}
				this.mergeToolCallWithConverter(updatedTool, update, notification, state);
				state.contentBlocks[existingIndex] = {
					type: "tool-call",
					tool: updatedTool
				};
			} else {
				const toolCall = this.createToolCallWithConverter(toolCallId, update, notification);
				const kind = update.kind;
				if (kind) state.toolCallIdToKind.set(toolCallId, kind);
				const parser = new JsonStreamParser();
				state.toolCallParsers.set(toolCallId, parser);
				const rawInput = update.rawInput;
				if (rawInput && Object.keys(rawInput).length > 0) parser.setComplete(rawInput);
				if (toolName && toolName.toLowerCase() === "task") {
					const existingSubAgentToolInfo = state.subAgentToolInfo.get(toolCallId);
					if (existingSubAgentToolInfo && existingSubAgentToolInfo.length > 0) {
						const existingResult = toolCall.result;
						const existingTaskToolResult = existingResult?.result;
						const mergedToolInfo = [...existingTaskToolResult?.toolInfo || [], ...existingSubAgentToolInfo];
						toolCall.result = {
							status: existingResult?.status || "running",
							success: existingResult?.success ?? false,
							result: {
								type: "task_tool_result",
								toolInfo: mergedToolInfo,
								finalResult: existingTaskToolResult?.finalResult || "",
								toolCallBrief: existingTaskToolResult?.toolCallBrief || "",
								startCallTool: existingTaskToolResult?.startCallTool ?? true
							}
						};
					}
				}
				const newBlock = {
					type: "tool-call",
					tool: toolCall
				};
				state.contentBlocks.push(newBlock);
				state.toolCallIdToIndex.set(toolCallId, state.contentBlocks.length - 1);
				state.lastTextIndex = -1;
				state.lastReasoningIndex = -1;
			}
		}
		/**
		* 处理 tool_call_update
		*
		* 核心优化：累积 content 中的 JSON 片段，尝试智能解析构造 rawInput
		*/
		handleToolCallUpdate(state, update, notification) {
			const toolCallId = update.toolCallId;
			if (!toolCallId) {
				console.warn(`${this.logPrefix} tool_call_update without toolCallId`);
				return;
			}
			const existingIndex = state.toolCallIdToIndex.get(toolCallId);
			if (existingIndex === void 0) {
				console.warn(`${this.logPrefix} Ignore orphan tool_call_update`, { toolCallId });
				return;
			}
			let parser = state.toolCallParsers.get(toolCallId);
			if (!parser) {
				parser = new JsonStreamParser();
				state.toolCallParsers.set(toolCallId, parser);
			}
			const jsonDelta = this.extractJsonDeltaFromContent(update.content);
			if (jsonDelta && !parser.isCompleted()) {
				const parseResult = parser.appendDelta(jsonDelta);
				if (Object.keys(parseResult.parameters).length > 0) {
					const enhancedUpdate = {
						...update,
						rawInput: parseResult.parameters
					};
					const updatedTool = { ...state.contentBlocks[existingIndex].tool };
					this.mergeToolCallWithConverter(updatedTool, enhancedUpdate, notification, state);
					state.contentBlocks[existingIndex] = {
						type: "tool-call",
						tool: updatedTool
					};
					return;
				}
			}
			const updatedTool = { ...state.contentBlocks[existingIndex].tool };
			this.mergeToolCallWithConverter(updatedTool, update, notification, state);
			state.contentBlocks[existingIndex] = {
				type: "tool-call",
				tool: updatedTool
			};
		}
		/**
		* 从 tool_call_update 的 content 中提取 JSON 增量
		*
		* content 格式：[{"type":"content","content":{"type":"text","text":"..."}}]
		*/
		extractJsonDeltaFromContent(content) {
			if (!content || !Array.isArray(content)) return null;
			const texts = [];
			for (const block of content) if (typeof block === "object" && block !== null) {
				const typedBlock = block;
				if (typedBlock.type === "content" && typedBlock.content?.type === "text" && typedBlock.content?.text) texts.push(typedBlock.content.text);
			}
			return texts.length > 0 ? texts.join("") : null;
		}
		/**
		* 创建工具调用数据（使用 acp-result-converter）
		*
		* 注意：此方法仅在 handleToolCall 中调用，用于处理 tool_call 事件
		* tool_call_update 事件必须有对应的 tool_call 先创建，不应调用此方法
		*/
		createToolCallWithConverter(toolCallId, update, notification) {
			const acpStatus = update.status;
			const status = this.mapACPStatus(acpStatus);
			const toolName = this.mapACPKindToToolName(update, notification);
			const args = normalizeToolArgs(update.rawInput || {}, toolName, update.kind);
			let result = void 0;
			if (update.rawOutput !== void 0 || update.content && update.content.length > 0) {
				const toolCallResultDetail = convertACPToToolCallResultDetail(update, notification, void 0, args, update.kind, toolName);
				result = {
					status: mapACPStatusToResultStatus(acpStatus),
					success: acpStatus === "completed",
					result: toolCallResultDetail
				};
			}
			const toolNameLowerForAsk = typeof toolName === "string" ? toolName.toLowerCase() : "";
			return {
				id: toolCallId,
				name: toolName,
				status: (toolNameLowerForAsk === "askuserquestion" || toolNameLowerForAsk === "ask_user_question") && status === "failed" ? "cancelled" : status,
				args,
				result,
				createTime: this.extractTimestamp(notification) ?? Date.now(),
				ready: isTerminalACPToolStatus(acpStatus)
			};
		}
		isPlainRecord(value) {
			return !!value && typeof value === "object" && !Array.isArray(value);
		}
		mergeToolArgs(currentArgs, incomingArgs) {
			const base = currentArgs ? { ...currentArgs } : {};
			for (const [key, incomingValue] of Object.entries(incomingArgs)) {
				const currentValue = base[key];
				if (this.isPlainRecord(currentValue) && this.isPlainRecord(incomingValue)) {
					base[key] = this.mergeToolArgs(currentValue, incomingValue);
					continue;
				}
				base[key] = incomingValue;
			}
			return base;
		}
		/**
		* 合并工具调用更新（使用 acp-result-converter）
		*/
		mergeToolCallWithConverter(tool, update, notification, state) {
			const acpStatus = update.status ?? void 0;
			let preserveSkippedQuestion = tool.metaData?.questionSkipped === true;
			if (acpStatus !== void 0) {
				const mappedStatus = this.mapACPStatus(acpStatus);
				if (!(tool.status === "pending" && tool.metaData?.["acp_request_permission"]) || mappedStatus === "executed" || mappedStatus === "failed" || mappedStatus === "cancelled" || mappedStatus === "destroyed" || mappedStatus === "stream_executing") {
					const toolNameLower = typeof tool.name === "string" ? tool.name.toLowerCase() : "";
					tool.status = (toolNameLower === "askuserquestion" || toolNameLower === "ask_user_question") && mappedStatus === "failed" ? "cancelled" : mappedStatus;
				}
				tool.ready = isTerminalACPToolStatus(acpStatus);
				if (isTerminalACPToolStatus(acpStatus) && state && tool.name?.toLowerCase() === "task" && tool.id) state.parentReasoningIndex.delete(tool.id);
			}
			const resolvedToolName = extractToolName(notification) || update?._meta?.["codebuddy.ai/toolName"];
			if (resolvedToolName && tool.name === "unknown") tool.name = resolvedToolName;
			const rawInput = update.rawInput;
			if (rawInput && Object.keys(rawInput).length > 0 && rawInput) {
				const normalizedInput = normalizeToolArgs(rawInput, extractToolName(notification) || tool.name, "kind" in update ? update.kind : void 0);
				tool.args = this.mergeToolArgs(tool.args, normalizedInput);
			}
			if (update.rawOutput !== void 0 || update.content && update.content.length > 0) {
				const existingResultDetail = tool.result?.result;
				const toolCallId = "toolCallId" in update ? update.toolCallId : void 0;
				const fallbackKind = toolCallId && state ? state.toolCallIdToKind.get(toolCallId) : void 0;
				const newResultDetail = convertACPToToolCallResultDetail(update, notification, existingResultDetail, tool.args, fallbackKind, tool.name);
				tool.result = {
					status: mapACPStatusToResultStatus(acpStatus),
					success: acpStatus === "completed",
					result: newResultDetail
				};
				const normalizedName = (tool.name || "").toLowerCase().replace(/-/g, "_");
				if (normalizedName === "askuserquestion" || normalizedName === "ask_user_question") {
					if (acpStatus === "completed") {
						const resultText = newResultDetail?.text || "";
						const questionAnswer = buildAskUserQuestionAnswer(tool.args || {}, resultText);
						const hasRealAnswer = questionAnswer?.questions.some((question) => question.answers.length > 0) === true;
						if (preserveSkippedQuestion && !hasRealAnswer) {
							if (!tool.metaData) tool.metaData = {};
							delete tool.metaData.questionAnswer;
							tool.metaData.questionSkipped = true;
						} else if (questionAnswer) {
							if (!tool.metaData) tool.metaData = {};
							tool.metaData.questionAnswer = questionAnswer;
							tool.metaData.questionSkipped = false;
							preserveSkippedQuestion = false;
						}
					}
				}
			}
			if (update.title !== void 0) {
				if (!tool.metaData) tool.metaData = {};
				tool.metaData.title = update.title;
			}
			const extraToolMeta = (notification._meta?.["codebuddy.ai"])?.toolMetaData;
			if (extraToolMeta && Object.keys(extraToolMeta).length > 0) {
				if (!tool.metaData) tool.metaData = {};
				Object.assign(tool.metaData, extraToolMeta);
			}
			if (preserveSkippedQuestion) {
				if (!tool.metaData) tool.metaData = {};
				delete tool.metaData.questionAnswer;
				tool.metaData.questionSkipped = true;
			}
		}
		/**
		* 将 ACP 的 kind 映射为渲染器期望的 canonical tool name
		* 参考 MessageConverter.mapACPKindToToolName
		*/
		mapACPKindToToolName(update, notification) {
			const toolName = this.extractToolName(notification);
			if (toolName) return toolName;
			const updateMeta = update?._meta;
			if (updateMeta) {
				const flatToolName = updateMeta["codebuddy.ai/toolName"];
				if (flatToolName) return flatToolName;
			}
			const kind = update.kind ?? void 0;
			if (!kind || kind === "other") return update.title || kind || "other";
			switch (kind) {
				case "edit": return "write_to_file";
				case "read": return "read_file";
				case "delete": return "delete_file";
				case "move": return "move_file";
				case "execute": return "execute";
				case "fetch": return "fetch";
				case "search": return "search_file";
				default: return kind;
			}
		}
		/**
		* 从 update 中提取文本
		*/
		extractText(update) {
			const content = update.content;
			if (!content) return "";
			const blocks = Array.isArray(content) ? content : [content];
			let text = "";
			for (const block of blocks) if (typeof block === "object" && block !== null) {
				const typedBlock = block;
				if (typedBlock.type === "text" && typedBlock.text) text += typedBlock.text;
			}
			return text;
		}
		/**
		* 从 update 中提取 toolCallId
		*/
		extractToolCallId(update) {
			return update.toolCallId;
		}
		/**
		* 映射 ACP 状态到工具状态
		*/
		mapACPStatus(status) {
			switch (status) {
				case "pending": return "pending";
				case "in_progress": return "stream_executing";
				case "completed": return "executed";
				case "failed": return "failed";
				case "cancelled":
				case "canceled": return "cancelled";
				default: return "pending";
			}
		}
		/**
		* 创建 ConversionResult
		* 每次都创建新的 contentBlocks 数组引用，确保 React 能检测到变化
		*/
		createConversionResult(sessionId, state) {
			const newContentBlocks = state.contentBlocks.slice();
			return {
				message: {
					id: state.messageId,
					requestId: state.requestId || state.messageId,
					conversationId: sessionId,
					messageType: MessageType.ASSISTANT,
					createTime: state.createTime,
					complete: false,
					content: newContentBlocks,
					extra: {
						...state.traceId ? { traceId: state.traceId } : {},
						...state.modelId ? { modelId: state.modelId } : {},
						...state.modelName ? { modelName: state.modelName } : {},
						...state.contentFilterNotice ? { isContentFilterNotice: true } : {}
					}
				},
				isNew: false,
				messageId: state.messageId
			};
		}
		/**
		* 非破坏性地读取当前累积快照
		*
		* 与 flush() 的区别：
		* - flush()  会把 message 标记为 complete=true 并 **删除** session 的累积 state
		* - peek()   返回 complete=false 的快照，**保留** state
		*
		* 使用场景：history replay 阶段需要把"已发生的 chunk"渲染出来，但消息可能并未结束
		* （后续 subscribe stream 还会推 chunk）。此时用 peek 拿快照，state 保留，
		* 后续 chunk 仍能续在同一个 messageId / 同一个 contentBlock 上，不会被切成两条 message。
		*/
		peek(sessionId) {
			const state = this.states.get(sessionId);
			if (!state) return null;
			return this.createConversionResult(sessionId, state);
		}
		/**
		* 完成并清理会话的累积状态
		* 返回最终的 ConversionResult（complete=true）
		*/
		flush(sessionId) {
			const state = this.states.get(sessionId);
			if (!state) return null;
			const message = this.buildCompletedAssistantMessage(sessionId, state);
			this.states.delete(sessionId);
			return {
				message,
				isNew: false,
				messageId: state.messageId
			};
		}
		/**
		* 完成当前 turn 的累积并**原地重置** state 以复用（issue #72430）。
		*
		* 与 `flush()` 的区别：
		* - `flush()` 会 `states.delete(sessionId)` 扔掉整个 state 对象，下一 turn 第一条
		*   assistant chunk 到达时 `getOrCreateState` 走 `!state` 分支重新分配一个 state
		*   （含 6 个 Map + 1 个 Set + contentBlocks 数组）——这在 live 场景下 turn 间隔
		*   较长时开销可忽略，但在 history replay 紧循环里（`processNotificationStream`
		*   一次要跑几十~几百个 turn）会引发大量 short-lived 对象分配 + GC 尖峰。
		* - `flushAndReset()` 产出与 `flush()` 完全相同的 ConversionResult，然后**保留
		*   state 对象本身**，Map 用 `.clear()`（内部哈希表数组复用）、数组用 `length = 0`、
		*   游标归零，最后置 `pendingReset = true`。下一 turn 首帧进入 `getOrCreateState`
		*   时该标记会被识别并把 messageId/requestId/createTime 刷成新 turn 的值，然后
		*   清标记 —— turn 边界"清账"但账本不换。
		*
		* 使用场景：history replay 里 `processNotificationStream` 遍历一大批 notification
		* 时，每个 turn 结束改用此方法替代 `flush + delete + 隐式重建`；live 场景仍走
		* `flush()` 以便 turn 结束后释放长时间不用的 state。
		*/
		flushAndReset(sessionId) {
			const state = this.states.get(sessionId);
			if (!state) return null;
			const message = this.buildCompletedAssistantMessage(sessionId, state);
			const flushedMessageId = state.messageId;
			state.contentBlocks.length = 0;
			state.toolCallIdToIndex.clear();
			state.toolCallParsers.clear();
			state.toolCallIdToKind.clear();
			state.subAgentToolInfo.clear();
			state.subAgentToolCallIdToParent.clear();
			state.subAgentPermissionCache.clear();
			state.questionRequestToolCallIds.clear();
			state.parentReasoningIndex.clear();
			state.lastTextIndex = -1;
			state.lastReasoningIndex = -1;
			state.traceId = void 0;
			state.modelId = void 0;
			state.modelName = void 0;
			state.contentFilterNotice = void 0;
			state.pendingReset = true;
			return {
				message,
				isNew: false,
				messageId: flushedMessageId
			};
		}
		/**
		* 从 state 构造 complete=true 的 AssistantMessage。
		* flush 与 flushAndReset 共用，避免语义漂移。
		*/
		buildCompletedAssistantMessage(sessionId, state) {
			return {
				id: state.messageId,
				requestId: state.requestId || state.messageId,
				conversationId: sessionId,
				messageType: MessageType.ASSISTANT,
				createTime: state.createTime,
				complete: true,
				content: [...state.contentBlocks],
				extra: {
					...state.traceId ? { traceId: state.traceId } : {},
					...state.modelId ? { modelId: state.modelId } : {},
					...state.modelName ? { modelName: state.modelName } : {},
					...state.contentFilterNotice ? { isContentFilterNotice: true } : {}
				}
			};
		}
		/**
		* 检查会话是否有活跃的累积状态
		*/
		hasActiveState(sessionId) {
			return this.states.has(sessionId);
		}
		/**
		* 获取当前累积的 messageId
		*/
		getMessageId(sessionId) {
			return this.states.get(sessionId)?.messageId;
		}
		/**
		* 获取指定 session 的累积状态（用于外部访问 contentBlocks）
		*/
		getState(sessionId) {
			return this.states.get(sessionId);
		}
		/**
		* 清除会话状态（不返回结果）
		*/
		clear(sessionId) {
			this.states.delete(sessionId);
		}
		/**
		* 清除所有状态
		*/
		clearAll() {
			this.states.clear();
		}
		/**
		* 处理 question request（askuserquestion 工具的专用通道）
		*
		* 通过 `_codebuddy.ai/question` 扩展方法接收问题数据，
		* 将其转换为 tool content 并插入到消息流中。
		*
		* @param sessionId - 会话 ID
		* @param toolCallId - 工具调用 ID
		* @param questions - 问题数据
		*/
		handleQuestionRequest(sessionId, toolCallId, questions) {
			const mockNotification = {
				sessionId,
				update: { sessionUpdate: "tool_call" }
			};
			const state = this.getOrCreateState(sessionId, mockNotification);
			state.questionRequestToolCallIds.add(toolCallId);
			const args = { questions: questions.map((q, index) => ({
				id: q.id || `q-${index}`,
				question: q.question,
				header: q.header,
				options: q.options,
				multiSelect: q.multiSelect || false
			})) };
			const incomingSignature = this.getAskUserQuestionSignature({
				name: "askuserquestion",
				args
			});
			if (incomingSignature && this.hasResolvedAskUserQuestionWithSignature(state, incomingSignature)) {
				this.removePendingAskUserQuestionToolsWithSignature(state, incomingSignature);
				this.removePendingAskUserQuestionToolById(state, toolCallId);
				return this.createConversionResult(sessionId, state);
			}
			const existingIndex = state.toolCallIdToIndex.get(toolCallId);
			if (existingIndex !== void 0) {
				const updatedTool = {
					...state.contentBlocks[existingIndex].tool,
					name: "askuserquestion",
					args,
					ready: true
				};
				state.contentBlocks[existingIndex] = {
					type: "tool-call",
					tool: updatedTool
				};
			} else {
				const newBlock = {
					type: "tool-call",
					tool: {
						id: toolCallId,
						name: "askuserquestion",
						status: "stream_executing",
						args,
						result: void 0,
						createTime: Date.now(),
						ready: true
					}
				};
				state.contentBlocks.push(newBlock);
				state.toolCallIdToIndex.set(toolCallId, state.contentBlocks.length - 1);
			}
			return this.createConversionResult(sessionId, state);
		}
		/**
		* 处理 poi_pick question 请求（pick_location 工具阶段七 ACP 路径）。
		*
		* Desktop 主进程 pick_location builtin tool 通过 `_codebuddy.ai/question`
		* extMethod 下发 `inputType: 'poi_pick'` 请求，这里创建 `pick_location`
		* toolCall（args.poiPick = { reason }），供 PoiPickRenderer 渲染对话流卡片。
		*
		* @param sessionId - 会话 ID
		* @param toolCallId - tool call ID
		* @param args - { poiPick: { reason } }
		*/
		handlePoiPickRequest(sessionId, toolCallId, args) {
			const mockNotification = {
				sessionId,
				update: { sessionUpdate: "tool_call" }
			};
			const state = this.getOrCreateState(sessionId, mockNotification);
			const existingIndex = state.toolCallIdToIndex.get(toolCallId);
			if (existingIndex !== void 0) {
				const existingBlock = state.contentBlocks[existingIndex];
				state.contentBlocks[existingIndex] = {
					type: "tool-call",
					tool: {
						...existingBlock.tool,
						name: "pick_location",
						args,
						ready: true
					}
				};
			} else {
				const newBlock = {
					type: "tool-call",
					tool: {
						id: toolCallId,
						name: "pick_location",
						status: "stream_executing",
						args,
						result: void 0,
						createTime: Date.now(),
						ready: true
					}
				};
				state.contentBlocks.push(newBlock);
				state.toolCallIdToIndex.set(toolCallId, state.contentBlocks.length - 1);
			}
			return this.createConversionResult(sessionId, state);
		}
		/**
		* 处理 elicitation/create 请求（微信支付卡片等）
		*
		* agent 在工具挂起期间通过 ACP 原生 elicitation/create 推送请求，
		* 这里合成一个独立的 weixinpay 卡片 toolCall 注入消息流（与
		* handleQuestionRequest 同构）。block id 使用 elicitationId（agent 侧
		* 生成的合成 id，不会与真实 toolCallId 冲突）。
		*
		* @param sessionId - 会话 ID
		* @param elicitationId - elicitation 关联 ID（即合成卡片的 block id）
		* @param payload - 渲染载荷（mode/message/weixinpay 数据）
		*/
		handleElicitationRequest(sessionId, elicitationId, payload) {
			const hadActiveState = this.states.has(sessionId);
			console.debug(`${this.logPrefix}[Weixinpay] handleElicitationRequest`, {
				sessionId,
				elicitationId,
				toolCallId: payload.toolCallId,
				hadActiveState
			});
			const mockNotification = {
				sessionId,
				update: { sessionUpdate: "tool_call" }
			};
			const state = this.getOrCreateState(sessionId, mockNotification);
			const args = {
				elicitationId,
				mode: payload.mode,
				message: payload.message,
				weixinpay: payload.weixinpay,
				toolCallId: payload.toolCallId
			};
			const existingIndex = state.toolCallIdToIndex.get(elicitationId);
			if (existingIndex !== void 0) {
				const existingBlock = state.contentBlocks[existingIndex];
				state.contentBlocks[existingIndex] = {
					type: "tool-call",
					tool: {
						...existingBlock.tool,
						name: "weixinpay",
						args,
						ready: true
					}
				};
			} else {
				const toolCall = {
					id: elicitationId,
					name: "weixinpay",
					status: "stream_executing",
					args,
					result: void 0,
					createTime: Date.now(),
					ready: true
				};
				state.contentBlocks.push({
					type: "tool-call",
					tool: toolCall
				});
				state.toolCallIdToIndex.set(elicitationId, state.contentBlocks.length - 1);
			}
			return this.createConversionResult(sessionId, state);
		}
		/**
		* 更新工具的状态和元数据（用于本地立即更新，如完成/跳过问题）
		*
		* @param sessionId - 会话 ID
		* @param toolCallId - 工具调用 ID
		* @param status - 新的工具状态
		* @param metaDataUpdates - 要更新的元数据
		*/
		updateToolStatus(sessionId, toolCallId, status, metaDataUpdates) {
			const state = this.states.get(sessionId);
			if (!state) {
				console.warn(`${this.logPrefix} updateToolStatus: no state found for session:`, sessionId);
				return null;
			}
			const existingIndex = state.toolCallIdToIndex.get(toolCallId);
			if (existingIndex === void 0) {
				console.warn(`${this.logPrefix} updateToolStatus: tool not found:`, {
					sessionId,
					toolCallId
				});
				return null;
			}
			const existingBlock = state.contentBlocks[existingIndex];
			const currentMetaData = existingBlock.tool.metaData || {};
			const updatedMetaData = metaDataUpdates ? {
				...currentMetaData,
				...metaDataUpdates
			} : currentMetaData;
			const existingToolName = typeof existingBlock.tool.name === "string" ? existingBlock.tool.name.toLowerCase() : "";
			const finalStatus = (existingToolName === "askuserquestion" || existingToolName === "ask_user_question") && status === "failed" ? "cancelled" : status;
			const updatedTool = {
				...existingBlock.tool,
				status: finalStatus,
				metaData: updatedMetaData
			};
			state.contentBlocks[existingIndex] = {
				type: "tool-call",
				tool: updatedTool
			};
			return this.createConversionResult(sessionId, state);
		}
		removeDuplicateAskUserQuestionTools(sessionId, resolvedToolCallId) {
			const state = this.states.get(sessionId);
			if (!state) return null;
			const sourceIndex = state.toolCallIdToIndex.get(resolvedToolCallId);
			if (sourceIndex === void 0) return null;
			const sourceBlock = state.contentBlocks[sourceIndex];
			const sourceSignature = sourceBlock.type === "tool-call" && sourceBlock.tool ? this.getAskUserQuestionSignature(sourceBlock.tool) : void 0;
			if (!sourceSignature) return null;
			if (!this.removePendingAskUserQuestionToolsWithSignature(state, sourceSignature, resolvedToolCallId)) return null;
			return this.createConversionResult(sessionId, state);
		}
		removePendingAskUserQuestionToolsWithSignature(state, signature, preservedToolCallId) {
			const removedToolCallIds = [];
			let removedCount = 0;
			const nextBlocks = state.contentBlocks.filter((block) => {
				const candidate = block;
				const tool = candidate.type === "tool-call" ? candidate.tool : void 0;
				if (!tool || !this.isAskUserQuestionToolName(tool.name)) return true;
				if (!this.isPendingAskUserQuestionStatus(tool.status)) return true;
				if (this.getAskUserQuestionSignature(tool) !== signature) return true;
				const duplicateId = typeof tool.id === "string" ? tool.id : void 0;
				if (duplicateId && duplicateId === preservedToolCallId) return true;
				if (duplicateId) removedToolCallIds.push(duplicateId);
				removedCount += 1;
				return false;
			});
			if (removedCount === 0) return false;
			state.contentBlocks = nextBlocks;
			for (const toolCallId of removedToolCallIds) this.cleanupRemovedToolCall(state, toolCallId);
			this.rebuildContentBlockIndexes(state);
			return true;
		}
		cleanupRemovedToolCall(state, toolCallId) {
			state.questionRequestToolCallIds.delete(toolCallId);
			state.toolCallIdToKind.delete(toolCallId);
			state.toolCallParsers.delete(toolCallId);
			state.subAgentToolInfo.delete(toolCallId);
			state.subAgentToolCallIdToParent.delete(toolCallId);
			state.subAgentPermissionCache.delete(toolCallId);
			state.parentReasoningIndex.delete(toolCallId);
		}
		removePendingAskUserQuestionToolById(state, toolCallId) {
			const index = state.toolCallIdToIndex.get(toolCallId);
			if (index === void 0) return false;
			const block = state.contentBlocks[index];
			const tool = block.type === "tool-call" ? block.tool : void 0;
			if (!tool || !this.isAskUserQuestionToolName(tool.name)) return false;
			if (!this.isPendingAskUserQuestionStatus(tool.status)) return false;
			state.contentBlocks.splice(index, 1);
			this.cleanupRemovedToolCall(state, toolCallId);
			this.rebuildContentBlockIndexes(state);
			return true;
		}
		isAskUserQuestionToolName(name) {
			if (typeof name !== "string") return false;
			return name.replace(/[-_\s]/g, "").toLowerCase() === "askuserquestion";
		}
		isPendingAskUserQuestionStatus(status) {
			return typeof status === "string" && [
				"idle",
				"pending",
				"parsing",
				"stream_executing",
				"full_executing",
				"executing"
			].includes(status);
		}
		hasResolvedAskUserQuestionWithSignature(state, signature) {
			return state.contentBlocks.some((block) => {
				const candidate = block;
				const tool = candidate.type === "tool-call" ? candidate.tool : void 0;
				if (!tool || !this.isAskUserQuestionToolName(tool.name)) return false;
				return this.isResolvedAskUserQuestionTool(tool) && this.getAskUserQuestionSignature(tool) === signature;
			});
		}
		isResolvedAskUserQuestionTool(tool) {
			const metaData = tool.metaData && typeof tool.metaData === "object" ? tool.metaData : void 0;
			return metaData?.questionAnswer !== void 0 || metaData?.questionSkipped !== void 0;
		}
		getAskUserQuestionSignature(tool) {
			if (!this.isAskUserQuestionToolName(tool.name)) return;
			const args = tool.args && typeof tool.args === "object" ? tool.args : void 0;
			const questions = this.parseAskUserQuestionQuestions(args?.questions);
			if (questions.length === 0) return;
			return JSON.stringify(questions.map((question) => ({
				header: question.header,
				question: question.question,
				options: question.options,
				multiSelect: question.multiSelect
			})));
		}
		parseAskUserQuestionQuestions(questionsInput) {
			let questions;
			if (typeof questionsInput === "string") try {
				const parsed = JSON.parse(questionsInput);
				if (!Array.isArray(parsed)) return [];
				questions = parsed;
			} catch {
				return [];
			}
			else if (Array.isArray(questionsInput)) questions = questionsInput;
			else return [];
			return questions.map((question) => {
				const record = question && typeof question === "object" ? question : {};
				const rawOptions = Array.isArray(record.options) ? record.options : [];
				return {
					header: typeof record.header === "string" ? record.header.trim() : "",
					question: typeof record.question === "string" ? record.question.trim() : "",
					options: rawOptions.map((option) => {
						if (typeof option === "string") return option.trim();
						if (option && typeof option === "object") {
							const optionRecord = option;
							return String(optionRecord.label ?? optionRecord.value ?? optionRecord.description ?? "").trim();
						}
						return String(option).trim();
					}).filter(Boolean),
					multiSelect: record.multiSelect === true
				};
			}).filter((question) => question.question || question.options.length > 0);
		}
		rebuildContentBlockIndexes(state) {
			state.toolCallIdToIndex = /* @__PURE__ */ new Map();
			state.lastTextIndex = -1;
			state.lastReasoningIndex = -1;
			state.parentReasoningIndex = /* @__PURE__ */ new Map();
			for (let index = 0; index < state.contentBlocks.length; index++) {
				const block = state.contentBlocks[index];
				if (block.type === "text") {
					state.lastTextIndex = index;
					continue;
				}
				if (block.type === "reasoning") {
					state.lastReasoningIndex = index;
					continue;
				}
				if (block.type === "tool-call" && typeof block.tool?.id === "string") {
					state.toolCallIdToIndex.set(block.tool.id, index);
					if (typeof block.tool.kind === "string") state.toolCallIdToKind.set(block.tool.id, block.tool.kind);
					state.lastTextIndex = -1;
					state.lastReasoningIndex = -1;
				}
			}
		}
		/**
		* 当 prompt turn 以非 end_turn 的 stopReason 结束（如 refusal / cancelled）时调用。
		*
		* 把当前累积状态下所有仍处于"执行中"的 tool_call（pending / parsing /
		* stream_executing / full_executing）强制翻转为 failed，并在 tool.result 中
		* 写入业务失败语义与 stopReason 来源，避免 UI 卡片上"已完成"徽标永久停留。
		*
		* 此方法由 adapter 在 `sendMessage` / `silentSendMessage` 的 PromptResponse
		* await 返回后**唯一入口**调用，调用时该 session 的 tool_call_update 事件
		* 在 ACP 层已全部 resolve，无竞态。
		*
		* @param sessionId 会话 ID
		* @param reason refusal/cancelled 相关信息（stopReason + 可选的服务器错误文案）
		* @returns 是否真的翻转了任何 tool（用于 adapter 决定是否额外触发 flush/emit）
		*/
		markPendingToolsAsFailed(sessionId, reason) {
			const state = this.states.get(sessionId);
			if (!state) return false;
			const pendingStatuses = ACPMessageAccumulator.PENDING_TOOL_STATUSES;
			const whitelist = reason.toolCallIds === void 0 ? void 0 : new Set(reason.toolCallIds);
			let flipped = false;
			for (let idx = 0; idx < state.contentBlocks.length; idx++) {
				const block = state.contentBlocks[idx];
				if (!block || block.type !== "tool-call" || !block.tool) continue;
				const tool = block.tool;
				if (!pendingStatuses.includes(tool.status)) continue;
				if (whitelist && !whitelist.has(tool.id ?? "")) continue;
				if (reason.preserveInteractiveQuestions) {
					const nameLower = typeof tool.name === "string" ? tool.name.toLowerCase() : "";
					if (INTERACTIVE_QUESTION_TOOL_NAMES.has(nameLower)) continue;
				}
				const failureMessage = reason.errorMessage ? `Tool interrupted (${reason.stopReason}): ${reason.errorMessage}` : `Tool interrupted: ${reason.stopReason}`;
				const existingResultDetail = tool.result?.result;
				const mergedResultDetail = {
					...existingResultDetail && typeof existingResultDetail === "object" ? existingResultDetail : {},
					error: failureMessage,
					stopReason: reason.stopReason,
					businessFailed: true
				};
				const requestedStatus = reason.targetStatus ?? "failed";
				const toolNameLower = typeof tool.name === "string" ? tool.name.toLowerCase() : "";
				const finalStatus = (toolNameLower === "askuserquestion" || toolNameLower === "ask_user_question") && requestedStatus === "failed" ? "cancelled" : requestedStatus;
				const updatedTool = {
					...tool,
					status: finalStatus,
					ready: true,
					result: {
						status: "error",
						success: false,
						result: mergedResultDetail
					}
				};
				state.contentBlocks[idx] = {
					type: "tool-call",
					tool: updatedTool
				};
				flipped = true;
				console.debug(`${this.logPrefix} markPendingToolsAsFailed: flipped`, {
					sessionId,
					toolCallId: tool.id,
					toolName: tool.name,
					prevStatus: tool.status,
					stopReason: reason.stopReason
				});
			}
			return flipped;
		}
		/**
		* 返回指定 session 当前所有处于非终态的 toolCallId。
		*
		* 非终态定义复用 `ACPMessageAccumulator.PENDING_TOOL_STATUSES`：
		*   ['idle', 'pending', 'parsing', 'stream_executing', 'full_executing']
		*
		* 用途：供消费方（如 WorkbuddyAgentAdapterNext 的 orphan 兜底）在 end_turn
		* 时判定哪些 toolCall 仍未收尾。本方法不修改任何内部状态。
		*
		* @param sessionId 目标 session
		* @returns 非终态 toolCallId 数组；session 无记录或全部终态时返回空数组
		*/
		listPendingToolCallIds(sessionId) {
			const state = this.states.get(sessionId);
			if (!state) return [];
			const pendingStatuses = ACPMessageAccumulator.PENDING_TOOL_STATUSES;
			const result = [];
			for (const block of state.contentBlocks) {
				const typedBlock = block;
				if (!typedBlock || typedBlock.type !== "tool-call" || !typedBlock.tool) continue;
				const { id, status } = typedBlock.tool;
				if (!id) continue;
				if (pendingStatuses.includes(status)) result.push(id);
			}
			return result;
		}
		/**
		* 处理 sub-agent 的 tool_call，将其转换为 TaskToolDetailInfo 并存储
		*
		* @param sessionId - 会话 ID
		* @param parentToolUseId - 父 Task 工具的 toolCallId
		* @param update - ACP ToolCall
		* @param notification - ACP SessionNotification
		* @returns ConversionResult - 更新后的结果
		*/
		handleSubAgentToolCall(sessionId, parentToolUseId, update, notification) {
			const state = this.states.get(sessionId);
			if (!state) {
				console.warn(`${this.logPrefix} handleSubAgentToolCall: no state found for session:`, sessionId);
				return null;
			}
			const toolCallId = update.toolCallId;
			if (!toolCallId) {
				console.warn(`${this.logPrefix} handleSubAgentToolCall: tool_call without toolCallId`);
				return null;
			}
			const toolName = this.mapACPKindToToolName(update, notification);
			const taskToolInfo = {
				name: toolName,
				info: update.title || toolName,
				toolCallId,
				executeStatus: this.mapACPStatusToExecuteStatus(update.status),
				needApprove: state.subAgentPermissionCache.get(toolCallId)?.pending ?? false
			};
			if (!state.subAgentToolInfo.has(parentToolUseId)) state.subAgentToolInfo.set(parentToolUseId, []);
			const toolInfoList = state.subAgentToolInfo.get(parentToolUseId);
			const existingIndex = toolInfoList.findIndex((info) => info.toolCallId === toolCallId);
			if (existingIndex >= 0) toolInfoList[existingIndex] = taskToolInfo;
			else toolInfoList.push(taskToolInfo);
			state.subAgentToolCallIdToParent.set(toolCallId, parentToolUseId);
			return this.updateTaskToolInfo(sessionId, state, parentToolUseId);
		}
		/**
		* 处理 sub-agent 的 tool_call_update，更新对应的 TaskToolDetailInfo
		*
		* @param sessionId - 会话 ID
		* @param update - ACP ToolCallUpdate
		* @param notification - ACP SessionNotification
		* @returns ConversionResult - 更新后的结果
		*/
		handleSubAgentToolCallUpdate(sessionId, update, notification) {
			const state = this.states.get(sessionId);
			if (!state) {
				console.warn(`${this.logPrefix} handleSubAgentToolCallUpdate: no state found for session:`, sessionId);
				return null;
			}
			const toolCallId = update.toolCallId;
			if (!toolCallId) {
				console.warn(`${this.logPrefix} handleSubAgentToolCallUpdate: tool_call_update without toolCallId`);
				return null;
			}
			const parentToolUseId = state.subAgentToolCallIdToParent.get(toolCallId);
			if (!parentToolUseId) {
				console.warn(`${this.logPrefix} handleSubAgentToolCallUpdate: no parent found for toolCallId:`, toolCallId);
				return null;
			}
			const toolInfoList = state.subAgentToolInfo.get(parentToolUseId);
			if (!toolInfoList) {
				console.warn(`${this.logPrefix} handleSubAgentToolCallUpdate: no toolInfoList found for parent:`, parentToolUseId);
				return null;
			}
			const existingIndex = toolInfoList.findIndex((info) => info.toolCallId === toolCallId);
			if (existingIndex >= 0) {
				const existingInfo = toolInfoList[existingIndex];
				if (update.status !== void 0) existingInfo.executeStatus = this.mapACPStatusToExecuteStatus(update.status);
				if (update.title) existingInfo.info = update.title;
			}
			return this.updateTaskToolInfo(sessionId, state, parentToolUseId);
		}
		/**
		* 更新 Task 工具的 toolInfo
		*
		* @param sessionId - 会话 ID
		* @param state - 累积器状态
		* @param parentToolUseId - Task 工具的 toolCallId
		* @returns ConversionResult - 更新后的结果
		*/
		updateTaskToolInfo(sessionId, state, parentToolUseId) {
			const taskToolIndex = state.toolCallIdToIndex.get(parentToolUseId);
			if (taskToolIndex === void 0) return this.createConversionResult(sessionId, state);
			const existingBlock = state.contentBlocks[taskToolIndex];
			if (!existingBlock || existingBlock.type !== "tool-call") return this.createConversionResult(sessionId, state);
			const subAgentToolInfoList = state.subAgentToolInfo.get(parentToolUseId) || [];
			const existingResult = existingBlock.tool.result;
			const existingTaskToolResult = existingResult?.result;
			const newTaskToolResult = {
				type: "task_tool_result",
				toolInfo: [...subAgentToolInfoList],
				finalResult: existingTaskToolResult?.finalResult || "",
				toolCallBrief: existingTaskToolResult?.toolCallBrief || "",
				startCallTool: existingTaskToolResult?.startCallTool ?? true
			};
			const updatedTool = {
				...existingBlock.tool,
				result: {
					...existingResult || {},
					result: newTaskToolResult
				}
			};
			state.contentBlocks[taskToolIndex] = {
				type: "tool-call",
				tool: updatedTool
			};
			return this.createConversionResult(sessionId, state);
		}
		/**
		* 获取 sub-agent 的 toolInfo 列表（用于在 Task 工具创建时获取已收集的信息）
		*
		* @param sessionId - 会话 ID
		* @param parentToolUseId - Task 工具的 toolCallId
		* @returns TaskToolDetailInfo[] - 已收集的 sub-agent 工具信息
		*/
		/**
		* 设置 sub-agent 工具的权限信息，并更新对应 Task 的 toolInfo
		*
		* 当 permissionRequest 到达时，如果该工具属于某个 subagent，
		* 调用此方法将 permission 信息缓存并更新 needApprove 状态。
		*
		* @param sessionId - 会话 ID
		* @param toolCallId - 需要授权的工具 ID
		* @param requestId - ACP permission request ID
		* @param options - 权限选项列表
		* @returns ConversionResult | null - 更新后的结果（用于触发 UI 刷新）
		*/
		setSubAgentToolPermission(sessionId, toolCallId, requestId, options) {
			const state = this.states.get(sessionId);
			if (!state) {
				console.warn(`${this.logPrefix} setSubAgentToolPermission: no state for session:`, sessionId);
				return null;
			}
			state.subAgentPermissionCache.set(toolCallId, {
				requestId,
				options,
				pending: true
			});
			const parentToolUseId = state.subAgentToolCallIdToParent.get(toolCallId);
			if (!parentToolUseId) {
				console.warn(`${this.logPrefix} setSubAgentToolPermission: no parent found for toolCallId:`, toolCallId);
				return null;
			}
			const toolInfoList = state.subAgentToolInfo.get(parentToolUseId);
			if (toolInfoList) {
				const toolInfo = toolInfoList.find((info) => info.toolCallId === toolCallId);
				if (toolInfo) {
					toolInfo.needApprove = true;
					toolInfo.permissionRequestId = requestId;
					toolInfo.permissionOptions = options;
				}
			}
			return this.updateTaskToolInfo(sessionId, state, parentToolUseId);
		}
		/**
		* 检查某个 toolCallId 是否属于 sub-agent
		*
		* @param sessionId - 会话 ID
		* @param toolCallId - 工具调用 ID
		* @returns 如果属于 sub-agent 返回 parentToolUseId，否则返回 undefined
		*/
		getSubAgentParent(sessionId, toolCallId) {
			const state = this.states.get(sessionId);
			if (!state) return;
			return state.subAgentToolCallIdToParent.get(toolCallId);
		}
		getSubAgentToolInfo(sessionId, parentToolUseId) {
			const state = this.states.get(sessionId);
			if (!state) return [];
			return state.subAgentToolInfo.get(parentToolUseId) || [];
		}
		/**
		* 将 ACP 状态映射为 TaskToolDetailInfo 的 executeStatus
		*/
		mapACPStatusToExecuteStatus(status) {
			switch (status) {
				case "completed": return "completed";
				case "failed": return "fail";
				case "cancelled": return "cancel";
				default: return "ing";
			}
		}
	};
}));
//#endregion
export { isInteractiveQuestionTool as i, init_acp_message_accumulator as n, init_interactive_question_tools as r, ACPMessageAccumulator as t };
