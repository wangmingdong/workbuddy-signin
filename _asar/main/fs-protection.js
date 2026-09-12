//#endregion
//#region src/main/system/fs-protection/index.ts
(/* @__PURE__ */ require("./chunk.js").__commonJSMin((() => {
	if (!globalThis.__wbFsProtectionInstalled) {
		globalThis.__wbFsProtectionInstalled = true;
		const fs = require("fs");
		const path = require("path");
		const os = require("os");
		const url = require("url");
		const _origMkdirSync = fs.mkdirSync.bind(fs);
		const _origStatSync = fs.statSync.bind(fs);
		const _origAppendFileSync = fs.appendFileSync.bind(fs);
		const _origRenameSync = fs.renameSync.bind(fs);
		const _origRmSyncForRotate = fs.rmSync ? fs.rmSync.bind(fs) : null;
		const PLATFORM = process.platform;
		function resolveConfigDir() {
			const envDir = (process.env.WORKBUDDY_CONFIG_DIR || process.env.CODEBUDDY_CONFIG_DIR || "").trim();
			if (envDir) return path.resolve(envDir);
			return path.join(os.homedir(), ".workbuddy");
		}
		function resolveLogDir() {
			const appName = (process.env.WORKBUDDY_APP_NAME || "WorkBuddy").trim() || "WorkBuddy";
			switch (PLATFORM) {
				case "darwin": return path.join(os.homedir(), "Library", "Logs", appName);
				case "win32": return path.join(process.env.LOCALAPPDATA || path.join(os.homedir(), "AppData", "Local"), appName, "logs");
				default: return path.join(os.homedir(), ".config", appName, "logs");
			}
		}
		const MAX_LOG_SIZE = 5 * 1024 * 1024;
		function cmpKey(absPath) {
			return PLATFORM === "win32" ? absPath.toLowerCase() : absPath;
		}
		let _configDir;
		function getConfigDir() {
			if (_configDir === void 0) _configDir = resolveConfigDir();
			return _configDir;
		}
		let _configDirKey;
		function getConfigDirKey() {
			if (_configDirKey === void 0) _configDirKey = cmpKey(getConfigDir());
			return _configDirKey;
		}
		let _protectedPathKeys;
		function getProtectedPathKeys() {
			if (_protectedPathKeys === void 0) {
				const configDir = getConfigDir();
				_protectedPathKeys = [
					configDir,
					path.join(configDir, "workbuddy.db"),
					path.join(configDir, "app"),
					path.join(configDir, "memory"),
					path.join(configDir, "logs")
				].map(cmpKey);
			}
			return _protectedPathKeys;
		}
		let _logDir;
		function getLogDir() {
			if (_logDir === void 0) _logDir = resolveLogDir();
			return _logDir;
		}
		let _logFile;
		function getLogFile() {
			if (_logFile === void 0) {
				const basename = (process.env.WORKBUDDY_FS_PROTECTION_ROLE || "").trim() === "daemon" ? "fs-protection.daemon.log" : "fs-protection.log";
				_logFile = path.join(getLogDir(), basename);
			}
			return _logFile;
		}
		/**
		* 判断 targetKey 是否等于 baseKey，或是 baseKey 的后代路径。
		*/
		function isPathWithinKeys(baseKey, targetKey) {
			if (baseKey === targetKey) return true;
			const rel = path.relative(baseKey, targetKey);
			return rel !== "" && rel !== ".." && !rel.startsWith(`..${path.sep}`) && !path.isAbsolute(rel);
		}
		function isUnderConfigDir(targetKey) {
			return isPathWithinKeys(getConfigDirKey(), targetKey);
		}
		/**
		* 命中哨兵：目标路径与某个哨兵完全相等，或（递归删除时）目标路径是某个哨兵的
		* 祖先目录（删除目标会连带清空哨兵路径）。非哨兵命中（含 workbuddy.db-wal、
		* skills/ 等合法删除，以及 app/session/Cache/xxx 等子项删除）一律返回 false，
		* 由 audit() 静默放行，不写盘——抓元凶靠哨兵，不逐文件审计。
		*/
		function hitsProtectedPath(targetKey, recursive) {
			for (const protectedKey of getProtectedPathKeys()) {
				if (protectedKey === targetKey) return true;
				if (recursive && isPathWithinKeys(targetKey, protectedKey)) return true;
			}
			return false;
		}
		let _logDirEnsured = false;
		function ensureLogDir() {
			if (_logDirEnsured) return;
			try {
				_origMkdirSync(getLogDir(), { recursive: true });
			} catch (_) {}
			_logDirEnsured = true;
		}
		function rotateIfNeeded() {
			const logFile = getLogFile();
			try {
				if (_origStatSync(logFile).size <= MAX_LOG_SIZE) return;
				const oldFile = `${logFile}.old`;
				try {
					if (_origRmSyncForRotate) _origRmSyncForRotate(oldFile, { force: true });
				} catch (_) {}
				_origRenameSync(logFile, oldFile);
			} catch (_) {}
		}
		function writeAudit(entry) {
			try {
				ensureLogDir();
				rotateIfNeeded();
				const line = `${JSON.stringify({
					ts: (/* @__PURE__ */ new Date()).toISOString(),
					pid: process.pid,
					...entry
				})}\n`;
				_origAppendFileSync(getLogFile(), line, "utf8");
			} catch (_) {}
		}
		/**
		* 捕获调用栈，只保留项目代码帧（过滤 Node 内部帧和本 shim 自身），最多 5 帧。
		* 只在命中受保护路径（WARN）时调用，避免正常路径下的性能开销。
		*/
		function captureStack() {
			try {
				return ((/* @__PURE__ */ new Error()).stack || "").split("\n").slice(1).map((line) => line.trim()).filter((line) => line.startsWith("at ") && !line.includes("wb-fs-protection.cjs") && !line.includes("node:internal")).slice(0, 5);
			} catch (_) {
				return [];
			}
		}
		/**
		* 把 fs API 的 filePath 参数转为绝对路径。
		* 处理 URL 对象，避免 String(URL) 产生无效路径绕过审计。
		*/
		function toAbsPath(filePath) {
			if (filePath instanceof URL) return url.fileURLToPath(filePath);
			if (filePath && typeof filePath === "object" && filePath.href && typeof filePath.protocol === "string") return url.fileURLToPath(filePath);
			return path.resolve(String(filePath));
		}
		function audit(api, filePath, options) {
			try {
				const absPath = toAbsPath(filePath);
				const targetKey = cmpKey(absPath);
				if (!isUnderConfigDir(targetKey)) return;
				const recursive = !!(options && options.recursive);
				if (hitsProtectedPath(targetKey, recursive)) {
					writeAudit({
						api,
						target: absPath,
						recursive,
						decision: "WARN",
						stack: captureStack()
					});
					return;
				}
			} catch (_) {}
		}
		const _unlinkSync = fs.unlinkSync.bind(fs);
		fs.unlinkSync = function(filePath, ...rest) {
			audit("unlinkSync", filePath, void 0);
			return _unlinkSync(filePath, ...rest);
		};
		const _rmdirSync = fs.rmdirSync.bind(fs);
		fs.rmdirSync = function(filePath, options, ...rest) {
			audit("rmdirSync", filePath, typeof options === "object" ? options : void 0);
			return _rmdirSync(filePath, options, ...rest);
		};
		if (fs.rmSync) {
			const _rmSync = fs.rmSync.bind(fs);
			fs.rmSync = function(filePath, options, ...rest) {
				audit("rmSync", filePath, typeof options === "object" ? options : void 0);
				return _rmSync(filePath, options, ...rest);
			};
		}
		const _unlink = fs.unlink.bind(fs);
		fs.unlink = function(filePath, ...rest) {
			audit("unlink", filePath, void 0);
			return _unlink(filePath, ...rest);
		};
		const _rmdir = fs.rmdir.bind(fs);
		fs.rmdir = function(filePath, options, ...rest) {
			audit("rmdir", filePath, typeof options === "object" ? options : void 0);
			return _rmdir(filePath, options, ...rest);
		};
		if (fs.rm) {
			const _rm = fs.rm.bind(fs);
			fs.rm = function(filePath, options, ...rest) {
				audit("rm", filePath, typeof options === "object" ? options : void 0);
				return _rm(filePath, options, ...rest);
			};
		}
		if (fs.promises) {
			const _promisesUnlink = fs.promises.unlink.bind(fs.promises);
			fs.promises.unlink = function(filePath, ...rest) {
				audit("promises.unlink", filePath, void 0);
				return _promisesUnlink(filePath, ...rest);
			};
			const _promisesRmdir = fs.promises.rmdir.bind(fs.promises);
			fs.promises.rmdir = function(filePath, options, ...rest) {
				audit("promises.rmdir", filePath, options);
				return _promisesRmdir(filePath, options, ...rest);
			};
			if (fs.promises.rm) {
				const _promisesRm = fs.promises.rm.bind(fs.promises);
				fs.promises.rm = function(filePath, options, ...rest) {
					audit("promises.rm", filePath, options);
					return _promisesRm(filePath, options, ...rest);
				};
			}
		}
	}
})))();
//#endregion
