require("./chunk.js");
const require_cdp_profiler = require("./cdp-profiler.js");
exports.startProfiling = require_cdp_profiler.startProfiling;
exports.stopProfilingAndAnalyze = require_cdp_profiler.stopProfilingAndAnalyze;
exports.stopProfilingOnly = require_cdp_profiler.stopProfilingOnly;
