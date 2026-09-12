const require_chunk = require("./chunk.js");
const require_adm_zip$1 = require("./adm-zip.js");
let node_fs = require("node:fs");
node_fs = require_chunk.__toESM(node_fs);
let node_path = require("node:path");
node_path = require_chunk.__toESM(node_path);
let node_os = require("node:os");
node_os = require_chunk.__toESM(node_os);
let node_worker_threads = require("node:worker_threads");
//#region src/main/features/logs/log-dir-filter.ts
var import_adm_zip = /* @__PURE__ */ require_chunk.__toESM(require_adm_zip$1.require_adm_zip());
/**
* Pure helpers for filtering log directories by date prefix.
*
* Used by package-log-worker.ts to decide which subdirectories to include
* when staging logs for archival. Kept as a standalone module so unit tests
* can exercise the rules without spinning up a worker thread.
*/
/** electron-log style: 2026-04-21 */
var DATE_DIR_RE = /^\d{4}-\d{2}-\d{2}$/;
/** Electron app.getPath('logs') default style: 20260421T103456 */
var TS_DIR_RE = /^(\d{8})T\d{6}$/;
/**
* Extract the ISO-like date component (YYYY-MM-DD) from a directory name,
* or return null if the name is not date-shaped.
*/
function extractDatePart(name) {
	if (DATE_DIR_RE.test(name)) return name;
	const match = TS_DIR_RE.exec(name);
	if (match) {
		const raw = match[1];
		return raw.slice(0, 4) + "-" + raw.slice(4, 6) + "-" + raw.slice(6, 8);
	}
	return null;
}
/** Format a Date as YYYY-MM-DD in the caller's local timezone. */
function formatLocalDate(d) {
	return [
		d.getFullYear(),
		String(d.getMonth() + 1).padStart(2, "0"),
		String(d.getDate()).padStart(2, "0")
	].join("-");
}
/**
* Decide whether a date-shaped directory should be included in the archive.
*
* - Non-date-shaped names return false (callers should handle plain files
*   and non-date directories with separate logic).
* - When todayOnly is true, only directories matching todayStr are kept.
* - Otherwise, directories newer than or equal to cutoff are kept.
*/
function shouldIncludeDateDir(name, cutoff, todayOnly, todayStr) {
	const datePart = extractDatePart(name);
	if (datePart === null) return false;
	if (todayOnly) return datePart === todayStr;
	const dirDate = /* @__PURE__ */ new Date(datePart + "T00:00:00");
	return !isNaN(dirDate.getTime()) && dirDate >= cutoff;
}
//#endregion
//#region src/main/features/logs/mac-native-crash-reports.ts
var MAX_CANDIDATES = 200;
var MAX_READ_BYTES = 100 * 1024 * 1024;
function matchesCurrentProduct(content, options) {
	const separator = content.indexOf(10);
	if (separator < 0) return false;
	try {
		const header = JSON.parse(content.subarray(0, separator).toString("utf8"));
		const report = JSON.parse(content.subarray(separator + 1).toString("utf8"));
		if (String(header?.bug_type) !== "309" || typeof report?.captureTime !== "string") return false;
		const captureTime = new Date(report.captureTime);
		if (Number.isNaN(captureTime.getTime()) || !isInTimeWindow(captureTime, options)) return false;
		const bundleInfo = report.bundleInfo;
		const bundles = [
			header.bundleID,
			report.bundleID,
			bundleInfo?.CFBundleIdentifier
		].filter((value) => value !== void 0 && value !== null && value !== "");
		if (bundles.length > 0) return Boolean(options.bundleIdentifier && bundles.every((value) => value === options.bundleIdentifier));
		return Boolean(options.executablePath && [header.procPath, report.procPath].some((value) => value === options.executablePath));
	} catch {
		return false;
	}
}
function isInTimeWindow(mtime, options) {
	return options.todayOnly ? formatLocalDate(mtime) === options.todayStr : mtime >= options.cutoff;
}
/**
* Stage matching macOS DiagnosticReports for the log archive. Every failure is
* best effort: an unreadable or malformed report never blocks normal log packaging.
*/
async function stageMacNativeCrashReports(options) {
	const maxFiles = options.maxFiles ?? 10;
	const maxFileBytes = options.maxFileBytes ?? 10 * 1024 * 1024;
	const maxTotalBytes = options.maxTotalBytes ?? 50 * 1024 * 1024;
	const candidates = [];
	try {
		const entries = await node_fs.promises.readdir(options.sourceDir, { withFileTypes: true });
		for (const entry of entries) {
			if (!entry.isFile() || node_path.extname(entry.name) !== ".ips") continue;
			try {
				const stat = await node_fs.promises.lstat(node_path.join(options.sourceDir, entry.name));
				if (stat.isFile() && stat.size > 0 && stat.size <= maxFileBytes && isInTimeWindow(stat.mtime, options)) candidates.push({
					name: entry.name,
					mtimeMs: stat.mtimeMs
				});
			} catch {}
		}
	} catch {
		return [];
	}
	candidates.sort((left, right) => right.mtimeMs - left.mtimeMs);
	const staged = [];
	let totalBytes = 0;
	let readBytes = 0;
	for (const candidate of candidates.slice(0, MAX_CANDIDATES)) {
		if (staged.length >= maxFiles) break;
		try {
			const sourcePath = node_path.join(options.sourceDir, candidate.name);
			const handle = await node_fs.promises.open(sourcePath, node_fs.constants.O_RDONLY | node_fs.constants.O_NOFOLLOW);
			try {
				const stat = await handle.stat();
				if (!stat.isFile() || stat.size <= 0 || stat.size > maxFileBytes || totalBytes + stat.size > maxTotalBytes || readBytes + stat.size > MAX_READ_BYTES || !isInTimeWindow(stat.mtime, options)) continue;
				const content = await handle.readFile();
				readBytes += content.length;
				if (content.length <= 0 || content.length > maxFileBytes || totalBytes + content.length > maxTotalBytes || readBytes > MAX_READ_BYTES) continue;
				if (!matchesCurrentProduct(content, options)) continue;
				await node_fs.promises.mkdir(options.destinationDir, { recursive: true });
				await node_fs.promises.writeFile(node_path.join(options.destinationDir, candidate.name), content);
				staged.push(candidate.name);
				totalBytes += content.length;
			} finally {
				await handle.close();
			}
		} catch {}
	}
	return staged;
}
//#endregion
//#region src/main/features/logs/package-log-worker.ts
/**
* Worker thread for log archive packaging.
*
* Performs the CPU-intensive staging (file copy + date filtering) and zip
* compression in a background thread so the Electron main process stays
* responsive while the archive is being created.
*
* Communication:
*   parentPort receives: { logsDir, extraLogDirs, maxAgeDays, todayOnly }
*   parentPort posts:    { ok: true, zipPath } | { ok: false, error }
*/
async function isValidDirectory(dirPath) {
	try {
		return (await node_fs.promises.stat(dirPath)).isDirectory();
	} catch {
		return false;
	}
}
async function stageLogDir(sourceDir, destDir, cutoff, todayOnly, todayStr) {
	await node_fs.promises.mkdir(destDir, { recursive: true });
	let entries;
	try {
		entries = await node_fs.promises.readdir(sourceDir, { withFileTypes: true });
	} catch {
		return;
	}
	for (const entry of entries) {
		const srcPath = node_path.join(sourceDir, entry.name);
		const dstPath = node_path.join(destDir, entry.name);
		if (entry.isDirectory() && extractDatePart(entry.name) !== null) {
			if (shouldIncludeDateDir(entry.name, cutoff, todayOnly, todayStr)) await node_fs.promises.cp(srcPath, dstPath, { recursive: true });
		} else await node_fs.promises.cp(srcPath, dstPath, { recursive: true });
	}
}
function buildZipPaths(logsDir, archivePrefix) {
	const parentDir = node_path.dirname(logsDir);
	const now = /* @__PURE__ */ new Date();
	const archiveName = `${archivePrefix}-${[
		now.getFullYear(),
		String(now.getMonth() + 1).padStart(2, "0"),
		String(now.getDate()).padStart(2, "0"),
		"-",
		String(now.getHours()).padStart(2, "0"),
		String(now.getMinutes()).padStart(2, "0"),
		String(now.getSeconds()).padStart(2, "0")
	].join("")}`;
	return {
		zipPath: node_path.join(parentDir, `${archiveName}.zip`),
		tmpZipPath: node_path.join(parentDir, `${archiveName}.zip.tmp`),
		stagingDir: node_path.join(parentDir, `${archiveName}.staging`)
	};
}
async function run(input) {
	const { logsDir, extraLogDirs, maxAgeDays, todayOnly = false, archivePrefix = "workbuddy-desktop", darwinBundleIdentifier, executablePath } = input;
	if (!logsDir || !await isValidDirectory(logsDir)) throw new Error(`Logs directory is invalid: ${logsDir}`);
	const now = /* @__PURE__ */ new Date();
	const cutoff = new Date(now);
	cutoff.setDate(cutoff.getDate() - maxAgeDays);
	cutoff.setHours(0, 0, 0, 0);
	const todayStr = formatLocalDate(now);
	const { zipPath, tmpZipPath, stagingDir } = buildZipPaths(logsDir, archivePrefix);
	const stagedLogsDir = node_path.join(stagingDir, node_path.basename(logsDir));
	try {
		await node_fs.promises.rm(stagingDir, {
			recursive: true,
			force: true
		});
		await node_fs.promises.mkdir(stagingDir, { recursive: true });
		await stageLogDir(logsDir, stagedLogsDir, cutoff, todayOnly, todayStr);
		const resolvedPrimary = node_path.resolve(logsDir);
		if (extraLogDirs) for (const extraDir of extraLogDirs) {
			if (!extraDir || node_path.resolve(extraDir) === resolvedPrimary) continue;
			if (!await isValidDirectory(extraDir)) continue;
			const extraBaseName = node_path.basename(extraDir);
			let targetName = extraBaseName;
			if (extraBaseName === node_path.basename(logsDir)) targetName = `${node_path.basename(node_path.dirname(extraDir))}-${extraBaseName}`;
			await stageLogDir(extraDir, node_path.join(stagingDir, targetName), cutoff, todayOnly, todayStr);
		}
		if (process.platform === "darwin" && (darwinBundleIdentifier || executablePath)) await stageMacNativeCrashReports({
			sourceDir: node_path.join(node_os.homedir(), "Library", "Logs", "DiagnosticReports"),
			destinationDir: node_path.join(stagingDir, "native-crash-reports"),
			bundleIdentifier: darwinBundleIdentifier,
			executablePath,
			cutoff,
			todayOnly,
			todayStr
		});
		const zip = new import_adm_zip.default();
		const stagedEntries = await node_fs.promises.readdir(stagingDir);
		for (const entry of stagedEntries) {
			const fullPath = node_path.join(stagingDir, entry);
			if (await isValidDirectory(fullPath)) zip.addLocalFolder(fullPath, entry);
		}
		zip.writeZip(tmpZipPath);
		try {
			await node_fs.promises.unlink(zipPath);
		} catch {}
		await node_fs.promises.rename(tmpZipPath, zipPath);
		return zipPath;
	} catch (error) {
		try {
			await node_fs.promises.unlink(tmpZipPath);
		} catch {}
		throw error;
	} finally {
		try {
			await node_fs.promises.rm(stagingDir, {
				recursive: true,
				force: true
			});
		} catch {}
	}
}
run(node_worker_threads.workerData).then((zipPath) => node_worker_threads.parentPort?.postMessage({
	ok: true,
	zipPath
})).catch((error) => node_worker_threads.parentPort?.postMessage({
	ok: false,
	error: error instanceof Error ? error.message : String(error)
}));
//#endregion
