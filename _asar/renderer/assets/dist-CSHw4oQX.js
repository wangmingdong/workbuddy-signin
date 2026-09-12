import { n as __esmMin } from "./chunk-BRZcfu7K.js";
//#region ../../node_modules/vite-plugin-node-polyfills/shims/process/dist/index.js
function getDefaultExportFromCjs(x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function defaultSetTimout() {
	throw new Error("setTimeout has not been defined");
}
function defaultClearTimeout() {
	throw new Error("clearTimeout has not been defined");
}
function runTimeout(fun) {
	if (cachedSetTimeout === setTimeout) return setTimeout(fun, 0);
	if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
		cachedSetTimeout = setTimeout;
		return setTimeout(fun, 0);
	}
	try {
		return cachedSetTimeout(fun, 0);
	} catch (e) {
		try {
			return cachedSetTimeout.call(null, fun, 0);
		} catch (e) {
			return cachedSetTimeout.call(this, fun, 0);
		}
	}
}
function runClearTimeout(marker) {
	if (cachedClearTimeout === clearTimeout) return clearTimeout(marker);
	if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
		cachedClearTimeout = clearTimeout;
		return clearTimeout(marker);
	}
	try {
		return cachedClearTimeout(marker);
	} catch (e) {
		try {
			return cachedClearTimeout.call(null, marker);
		} catch (e) {
			return cachedClearTimeout.call(this, marker);
		}
	}
}
function cleanUpNextTick() {
	if (!draining || !currentQueue) return;
	draining = false;
	if (currentQueue.length) queue = currentQueue.concat(queue);
	else queueIndex = -1;
	if (queue.length) drainQueue();
}
function drainQueue() {
	if (draining) return;
	var timeout = runTimeout(cleanUpNextTick);
	draining = true;
	var len = queue.length;
	while (len) {
		currentQueue = queue;
		queue = [];
		while (++queueIndex < len) if (currentQueue) currentQueue[queueIndex].run();
		queueIndex = -1;
		len = queue.length;
	}
	currentQueue = null;
	draining = false;
	runClearTimeout(timeout);
}
function Item(fun, array) {
	this.fun = fun;
	this.array = array;
}
function noop() {}
var browser, process, cachedSetTimeout, cachedClearTimeout, queue, draining, currentQueue, queueIndex, browserExports, process$1;
var init_dist = __esmMin((() => {
	browser = { exports: {} };
	process = browser.exports = {};
	(function() {
		try {
			if (typeof setTimeout === "function") cachedSetTimeout = setTimeout;
			else cachedSetTimeout = defaultSetTimout;
		} catch (e) {
			cachedSetTimeout = defaultSetTimout;
		}
		try {
			if (typeof clearTimeout === "function") cachedClearTimeout = clearTimeout;
			else cachedClearTimeout = defaultClearTimeout;
		} catch (e) {
			cachedClearTimeout = defaultClearTimeout;
		}
	})();
	queue = [];
	draining = false;
	queueIndex = -1;
	process.nextTick = function(fun) {
		var args = new Array(arguments.length - 1);
		if (arguments.length > 1) for (var i = 1; i < arguments.length; i++) args[i - 1] = arguments[i];
		queue.push(new Item(fun, args));
		if (queue.length === 1 && !draining) runTimeout(drainQueue);
	};
	Item.prototype.run = function() {
		this.fun.apply(null, this.array);
	};
	process.title = "browser";
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = "";
	process.versions = {};
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;
	process.listeners = function(name) {
		return [];
	};
	process.binding = function(name) {
		throw new Error("process.binding is not supported");
	};
	process.cwd = function() {
		return "/";
	};
	process.chdir = function(dir) {
		throw new Error("process.chdir is not supported");
	};
	process.umask = function() {
		return 0;
	};
	browserExports = browser.exports;
	process$1 = /* @__PURE__ */ getDefaultExportFromCjs(browserExports);
}));
//#endregion
export { process$1 as n, init_dist as t };
