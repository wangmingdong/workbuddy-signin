const require_chunk = require("./chunk.js");
const require_adm_zip$1 = require("./adm-zip.js");
let node_fs = require("node:fs");
node_fs = require_chunk.__toESM(node_fs);
let node_path = require("node:path");
node_path = require_chunk.__toESM(node_path);
let node_crypto = require("node:crypto");
node_crypto = require_chunk.__toESM(node_crypto);
//#region ../../packages/workbuddy-server/src/wechat-chat-history/zip-parser.ts
/**
* `聊天记录.zip` → metadata + truncated transcript parser.
*
* Parses the WeChat share ZIP layout:
*
* ```
* 聊天记录_<timestamp>.zip
* ├── *.txt                                     # UTF-8 plain text
* └── 聊天记录媒体文件/                           # or other known media dirs
*     ├── 微信图片_*.jpg
*     ├── 微信视频_*.mp4
*     ├── 聊天记录_*.zip                          # nested share
*     └── ...
* ```
*
* Behavior:
* - Uses the first `.txt` entry as the chat-record transcript; tolerates
*   known media-dir names from Chinese and English WeChat exports.
* - Reads the txt as UTF-8 (strips a leading BOM if present).
* - Counts messages by matching Chinese `YYYY年M月D日 H:M(:S)?` or English
*   `YYYY-M-D H:M(:S)?` date-stamp lines — robust to nested `[聊天记录]`
*   blocks because each forwarded message still carries its own date-stamp
*   line. Pattern uses `\d{1,2}` for the month/day/hour/minute fields so both
*   `06月04日 16:21` and `6月4日 9:00` work.
* - First-sender / first-message-at: walks the first 100 non-empty lines and
*   reports the first sender ⟶ date pair. `[聊天记录]` block markers are
*   skipped.
* - Truncates the inlined transcript at `maxChatHistoryChars` characters,
*   preferring a paragraph break (`\n\n`) or a date-stamp line start within
*   the 500 characters before the cap. Appends
*   `\n\n[truncated; full transcript at: <zipPath>]`.
*
* The parser extracts safe ZIP entries to a WorkBuddy-managed temp directory so
* media files and the full transcript remain available to the model when needed.
* The parser never throws — invalid input maps to `{ valid: false, reason }`.
*/
var import_adm_zip = /* @__PURE__ */ require_chunk.__toESM(require_adm_zip$1.require_adm_zip());
/**
* Media directories observed in real WeChat exports. Chinese and English names
* both ship in the wild across WeChat clients.
*/
var MEDIA_DIR_CANDIDATES = [
	"聊天记录媒体文件/",
	"聊天记录内的图片、视频和文件/",
	"Images, videos, and files in chat history/"
];
var DATE_STAMP_PATTERN = [String.raw`(?:\d{4}年\d{1,2}月\d{1,2}日|\d{4}-\d{1,2}-\d{1,2})`, String.raw`\s+\d{1,2}:\d{1,2}(?::\d{1,2})?`].join("");
/** Per-line regex matching a `YYYY年M月D日 H:M(:S)?` or `YYYY-M-D H:M(:S)?` stamp. */
var DATE_LINE_RE = new RegExp(String.raw`^\s*${DATE_STAMP_PATTERN}\s*$`);
/** Multiline version used to count message occurrences across the whole txt. */
var DATE_LINE_GLOBAL_RE = new RegExp(String.raw`^\s*${DATE_STAMP_PATTERN}\s*$`, "gm");
var TRUNCATION_SUFFIX_PREFIX = "\n\n[truncated; full transcript at: ";
var TRUNCATION_SUFFIX_SUFFIX = "]";
var DEFAULT_MAX_CHAT_HISTORY_CHARS = 6e4;
var MAX_HEADER_SCAN_LINES = 100;
var TRUNCATION_LOOKBACK_CHARS = 500;
var MIME_BY_EXT = {
	jpg: "image/jpeg",
	jpeg: "image/jpeg",
	png: "image/png",
	gif: "image/gif",
	webp: "image/webp",
	heic: "image/heic",
	mp4: "video/mp4",
	mov: "video/quicktime",
	m4a: "audio/mp4",
	mp3: "audio/mpeg",
	pdf: "application/pdf",
	zip: "application/zip",
	doc: "application/msword",
	docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
	xls: "application/vnd.ms-excel",
	xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
	ppt: "application/vnd.ms-powerpoint",
	pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
	txt: "text/plain",
	csv: "text/csv"
};
function guessMime(name) {
	const dot = name.lastIndexOf(".");
	if (dot < 0 || dot === name.length - 1) return;
	return MIME_BY_EXT[name.slice(dot + 1).toLowerCase()];
}
function basename(zipEntryName) {
	const idx = zipEntryName.lastIndexOf("/");
	return idx < 0 ? zipEntryName : zipEntryName.slice(idx + 1);
}
function isMediaEntry(entryName) {
	return MEDIA_DIR_CANDIDATES.some((prefix) => entryName.startsWith(prefix));
}
function isTxtEntryName(entryName) {
	return basename(entryName).toLowerCase().endsWith(".txt");
}
function findTranscriptEntry(entries) {
	return entries.find((entry) => !entry.isDirectory && isTxtEntryName(entry.entryName));
}
function countMessages(text) {
	return text.match(DATE_LINE_GLOBAL_RE)?.length ?? 0;
}
/**
* Extract the first sender / first message timestamp from the txt by walking
* the first ~100 non-empty lines and finding the first `<name>` ⟶ `<date>` pair.
*
* `[聊天记录]` block markers (which may appear before the first sender on
* nested shares) are skipped.
*/
function readFirstMessageHeader(text) {
	const lines = text.split(/\r?\n/);
	const upper = Math.min(lines.length, MAX_HEADER_SCAN_LINES);
	for (let i = 0; i < upper; i++) {
		const candidate = lines[i].trim();
		if (!candidate) continue;
		if (candidate === "[聊天记录]") continue;
		if (DATE_LINE_RE.test(candidate)) continue;
		const lookaheadUpper = Math.min(lines.length, i + 10);
		for (let j = i + 1; j < lookaheadUpper; j++) {
			const next = lines[j].trim();
			if (!next) continue;
			if (DATE_LINE_RE.test(next)) return {
				firstSenderName: candidate,
				firstMessageAt: next
			};
			break;
		}
	}
	return {};
}
/**
* Choose a safe truncation point within `[ideal - 500, ideal]` characters.
*
* Preference order:
*  1. Position just after a paragraph break (`\n\n`)
*  2. Position just before a date-stamp line start
*  3. The cap itself (hard cut)
*/
function findTruncationCut(text, ideal) {
	const lo = Math.max(0, ideal - TRUNCATION_LOOKBACK_CHARS);
	const window = text.slice(lo, ideal);
	const paraIdx = window.lastIndexOf("\n\n");
	if (paraIdx >= 0) return lo + paraIdx + 2;
	const lineStarts = [];
	{
		lineStarts.push(0);
		let pos = 0;
		while (pos < window.length) {
			const nl = window.indexOf("\n", pos);
			if (nl < 0) break;
			lineStarts.push(nl + 1);
			pos = nl + 1;
		}
	}
	for (let i = lineStarts.length - 1; i >= 0; i--) {
		const lineStart = lineStarts[i];
		const nextNl = window.indexOf("\n", lineStart);
		const line = window.slice(lineStart, nextNl < 0 ? void 0 : nextNl);
		if (DATE_LINE_RE.test(line.trim())) return lo + lineStart;
	}
	return ideal;
}
function truncateChatHistory(raw, maxChars, zipPath) {
	if (raw.length <= maxChars) return {
		text: raw,
		truncated: false
	};
	const cut = findTruncationCut(raw, maxChars);
	return {
		text: `${raw.slice(0, cut).replace(/\s+$/u, "")}${`${TRUNCATION_SUFFIX_PREFIX}${zipPath}${TRUNCATION_SUFFIX_SUFFIX}`}`,
		truncated: true
	};
}
function getFileSize(filePath) {
	try {
		return node_fs.statSync(filePath).size;
	} catch {
		return 0;
	}
}
function createExtractionDir(filePath, extractionRootDir) {
	const rand = node_crypto.randomBytes(4).toString("hex");
	const rootDir = extractionRootDir || node_path.dirname(filePath);
	return node_path.join(rootDir, `wechat-chat-history-${Date.now()}-${rand}`);
}
/**
* Resolve a ZIP entry into the extraction root without allowing path escape.
* ZIP names may be attacker-controlled, so reject absolute paths, traversal
* markers, Windows separators, and null bytes before resolving. The final
* relative-path check is defense-in-depth after `path.resolve()`.
*/
function resolveZipEntryTarget(rootDir, entryName) {
	const parts = entryName.split("/").filter(Boolean);
	if (parts.length === 0 || node_path.isAbsolute(entryName)) return;
	if (parts.some((part) => part === "." || part === ".." || part.includes("\\") || part.includes("\0"))) return;
	const target = node_path.resolve(rootDir, ...parts);
	const relative = node_path.relative(rootDir, target);
	if (!relative || relative.startsWith("..") || node_path.isAbsolute(relative)) return;
	return target;
}
function extractZipEntries(entries, rootDir) {
	node_fs.mkdirSync(rootDir, { recursive: true });
	for (const entry of entries) {
		const target = resolveZipEntryTarget(rootDir, entry.entryName);
		if (!target) throw new Error(`Unsafe ZIP entry path: ${entry.entryName}`);
		if (entry.isDirectory) {
			node_fs.mkdirSync(target, { recursive: true });
			continue;
		}
		node_fs.mkdirSync(node_path.dirname(target), { recursive: true });
		node_fs.writeFileSync(target, entry.getData(), { mode: 384 });
	}
}
function getExtractedEntryPath(rootDir, entryName) {
	return resolveZipEntryTarget(rootDir, entryName);
}
function buildInvalid(filePath, reason) {
	return {
		valid: false,
		fileName: basename(filePath),
		fileSize: getFileSize(filePath),
		metadata: {
			messageCount: 0,
			mediaFiles: []
		},
		reason
	};
}
/**
* Parse the WeChat share ZIP at `filePath` and return metadata + truncated txt.
* Never throws — ZIP-level errors map to `valid: false`.
*/
function parseChatRecordZip(input) {
	const { filePath, extractionRootDir } = input;
	const maxChars = input.maxChatHistoryChars ?? 6e4;
	let zip;
	try {
		zip = new import_adm_zip.default(filePath);
	} catch {
		return buildInvalid(filePath, "corrupted");
	}
	let entries;
	try {
		entries = zip.getEntries();
	} catch {
		return buildInvalid(filePath, "corrupted");
	}
	const txtEntry = findTranscriptEntry(entries);
	if (!txtEntry) return buildInvalid(filePath, "not-wechat-zip");
	let txtBuffer;
	try {
		txtBuffer = txtEntry.getData();
	} catch {
		return buildInvalid(filePath, "corrupted");
	}
	let txt = txtBuffer.toString("utf-8");
	if (txt.charCodeAt(0) === 65279) txt = txt.slice(1);
	const extractedDirPath = createExtractionDir(filePath, extractionRootDir);
	try {
		extractZipEntries(entries, extractedDirPath);
	} catch {
		try {
			node_fs.rmSync(extractedDirPath, {
				force: true,
				recursive: true
			});
		} catch {}
		return buildInvalid(filePath, "corrupted");
	}
	const mediaFiles = entries.filter((e) => !e.isDirectory && isMediaEntry(e.entryName)).flatMap((e) => {
		const mediaPath = getExtractedEntryPath(extractedDirPath, e.entryName);
		if (!mediaPath) return [];
		const name = basename(e.entryName);
		return [{
			name,
			size: e.header.size,
			mime: guessMime(name),
			path: mediaPath
		}];
	});
	const messageCount = countMessages(txt);
	const { firstSenderName, firstMessageAt } = readFirstMessageHeader(txt);
	const metadata = {
		messageCount,
		firstSenderName,
		firstMessageAt,
		mediaFiles
	};
	const transcriptFileName = basename(txtEntry.entryName) || "chat-history.txt";
	const transcriptPath = getExtractedEntryPath(extractedDirPath, txtEntry.entryName) ?? node_path.join(extractedDirPath, transcriptFileName);
	const { text: chatHistoryText, truncated } = truncateChatHistory(txt, maxChars, transcriptPath);
	return {
		valid: true,
		fileName: basename(filePath),
		fileSize: getFileSize(filePath),
		metadata,
		extractedDirPath,
		chatHistoryText,
		truncated
	};
}
//#endregion
//#region ../../packages/workbuddy-server/src/wechat-chat-history/service.ts
function createWorkbuddyWechatChatHistoryService(deps = {}) {
	return { async parseZipMetadata(params) {
		try {
			const result = parseChatRecordZip({
				filePath: params.filePath,
				maxChatHistoryChars: params.maxChatHistoryChars,
				extractionRootDir: params.extractionRootDir
			});
			if (!result.valid) deps.logger?.info?.("[WechatChatHistory] parseZipMetadata rejected", {
				filePath: params.filePath,
				reason: result.reason
			});
			else deps.logger?.info?.("[WechatChatHistory] parseZipMetadata ok", {
				filePath: params.filePath,
				messageCount: result.metadata?.messageCount,
				mediaCount: result.metadata?.mediaFiles.length,
				extractedDirPath: result.extractedDirPath,
				truncated: result.truncated
			});
			return result;
		} catch (error) {
			deps.logger?.error?.("[WechatChatHistory] parseZipMetadata threw unexpectedly", error);
			return {
				valid: false,
				fileName: params.filePath.split("/").pop() ?? params.filePath,
				fileSize: 0,
				metadata: {
					messageCount: 0,
					mediaFiles: []
				},
				reason: "corrupted"
			};
		}
	} };
}
//#endregion
Object.defineProperty(exports, "DEFAULT_MAX_CHAT_HISTORY_CHARS", {
	enumerable: true,
	get: function() {
		return DEFAULT_MAX_CHAT_HISTORY_CHARS;
	}
});
Object.defineProperty(exports, "createWorkbuddyWechatChatHistoryService", {
	enumerable: true,
	get: function() {
		return createWorkbuddyWechatChatHistoryService;
	}
});
