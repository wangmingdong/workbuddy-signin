import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_react_dom } from "./react-dom-IYSM6kDg.js";
//#region ../../packages/agent-ui/node_modules/@remix-run/router/dist/router.js
/**
* @remix-run/router v1.23.2
*
* Copyright (c) Remix Software Inc.
*
* This source code is licensed under the MIT license found in the
* LICENSE.md file in the root directory of this source tree.
*
* @license MIT
*/
function _extends$1() {
	_extends$1 = Object.assign ? Object.assign.bind() : function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
		}
		return target;
	};
	return _extends$1.apply(this, arguments);
}
/**
* Memory history stores the current location in memory. It is designed for use
* in stateful non-browser environments like tests and React Native.
*/
function createMemoryHistory(options) {
	if (options === void 0) options = {};
	let { initialEntries = ["/"], initialIndex, v5Compat = false } = options;
	let entries;
	entries = initialEntries.map((entry, index) => createMemoryLocation(entry, typeof entry === "string" ? null : entry.state, index === 0 ? "default" : void 0));
	let index = clampIndex(initialIndex == null ? entries.length - 1 : initialIndex);
	let action = Action.Pop;
	let listener = null;
	function clampIndex(n) {
		return Math.min(Math.max(n, 0), entries.length - 1);
	}
	function getCurrentLocation() {
		return entries[index];
	}
	function createMemoryLocation(to, state, key) {
		if (state === void 0) state = null;
		let location = createLocation(entries ? getCurrentLocation().pathname : "/", to, state, key);
		warning(location.pathname.charAt(0) === "/", "relative pathnames are not supported in memory history: " + JSON.stringify(to));
		return location;
	}
	function createHref(to) {
		return typeof to === "string" ? to : createPath(to);
	}
	return {
		get index() {
			return index;
		},
		get action() {
			return action;
		},
		get location() {
			return getCurrentLocation();
		},
		createHref,
		createURL(to) {
			return new URL(createHref(to), "http://localhost");
		},
		encodeLocation(to) {
			let path = typeof to === "string" ? parsePath(to) : to;
			return {
				pathname: path.pathname || "",
				search: path.search || "",
				hash: path.hash || ""
			};
		},
		push(to, state) {
			action = Action.Push;
			let nextLocation = createMemoryLocation(to, state);
			index += 1;
			entries.splice(index, entries.length, nextLocation);
			if (v5Compat && listener) listener({
				action,
				location: nextLocation,
				delta: 1
			});
		},
		replace(to, state) {
			action = Action.Replace;
			let nextLocation = createMemoryLocation(to, state);
			entries[index] = nextLocation;
			if (v5Compat && listener) listener({
				action,
				location: nextLocation,
				delta: 0
			});
		},
		go(delta) {
			action = Action.Pop;
			let nextIndex = clampIndex(index + delta);
			let nextLocation = entries[nextIndex];
			index = nextIndex;
			if (listener) listener({
				action,
				location: nextLocation,
				delta
			});
		},
		listen(fn) {
			listener = fn;
			return () => {
				listener = null;
			};
		}
	};
}
/**
* Browser history stores the location in regular URLs. This is the standard for
* most web apps, but it requires some configuration on the server to ensure you
* serve the same app at multiple URLs.
*
* @see https://github.com/remix-run/history/tree/main/docs/api-reference.md#createbrowserhistory
*/
function createBrowserHistory(options) {
	if (options === void 0) options = {};
	function createBrowserLocation(window, globalHistory) {
		let { pathname, search, hash } = window.location;
		return createLocation("", {
			pathname,
			search,
			hash
		}, globalHistory.state && globalHistory.state.usr || null, globalHistory.state && globalHistory.state.key || "default");
	}
	function createBrowserHref(window, to) {
		return typeof to === "string" ? to : createPath(to);
	}
	return getUrlBasedHistory(createBrowserLocation, createBrowserHref, null, options);
}
/**
* Hash history stores the location in window.location.hash. This makes it ideal
* for situations where you don't want to send the location to the server for
* some reason, either because you do cannot configure it or the URL space is
* reserved for something else.
*
* @see https://github.com/remix-run/history/tree/main/docs/api-reference.md#createhashhistory
*/
function createHashHistory(options) {
	if (options === void 0) options = {};
	function createHashLocation(window, globalHistory) {
		let { pathname = "/", search = "", hash = "" } = parsePath(window.location.hash.substr(1));
		if (!pathname.startsWith("/") && !pathname.startsWith(".")) pathname = "/" + pathname;
		return createLocation("", {
			pathname,
			search,
			hash
		}, globalHistory.state && globalHistory.state.usr || null, globalHistory.state && globalHistory.state.key || "default");
	}
	function createHashHref(window, to) {
		let base = window.document.querySelector("base");
		let href = "";
		if (base && base.getAttribute("href")) {
			let url = window.location.href;
			let hashIndex = url.indexOf("#");
			href = hashIndex === -1 ? url : url.slice(0, hashIndex);
		}
		return href + "#" + (typeof to === "string" ? to : createPath(to));
	}
	function validateHashLocation(location, to) {
		warning(location.pathname.charAt(0) === "/", "relative pathnames are not supported in hash history.push(" + JSON.stringify(to) + ")");
	}
	return getUrlBasedHistory(createHashLocation, createHashHref, validateHashLocation, options);
}
function invariant(value, message) {
	if (value === false || value === null || typeof value === "undefined") throw new Error(message);
}
function warning(cond, message) {
	if (!cond) {
		if (typeof console !== "undefined") console.warn(message);
		try {
			throw new Error(message);
		} catch (e) {}
	}
}
function createKey() {
	return Math.random().toString(36).substr(2, 8);
}
/**
* For browser-based histories, we combine the state and key into an object
*/
function getHistoryState(location, index) {
	return {
		usr: location.state,
		key: location.key,
		idx: index
	};
}
/**
* Creates a Location object with a unique key from the given Path
*/
function createLocation(current, to, state, key) {
	if (state === void 0) state = null;
	return _extends$1({
		pathname: typeof current === "string" ? current : current.pathname,
		search: "",
		hash: ""
	}, typeof to === "string" ? parsePath(to) : to, {
		state,
		key: to && to.key || key || createKey()
	});
}
/**
* Creates a string URL path from the given pathname, search, and hash components.
*/
function createPath(_ref) {
	let { pathname = "/", search = "", hash = "" } = _ref;
	if (search && search !== "?") pathname += search.charAt(0) === "?" ? search : "?" + search;
	if (hash && hash !== "#") pathname += hash.charAt(0) === "#" ? hash : "#" + hash;
	return pathname;
}
/**
* Parses a string URL path into its separate pathname, search, and hash components.
*/
function parsePath(path) {
	let parsedPath = {};
	if (path) {
		let hashIndex = path.indexOf("#");
		if (hashIndex >= 0) {
			parsedPath.hash = path.substr(hashIndex);
			path = path.substr(0, hashIndex);
		}
		let searchIndex = path.indexOf("?");
		if (searchIndex >= 0) {
			parsedPath.search = path.substr(searchIndex);
			path = path.substr(0, searchIndex);
		}
		if (path) parsedPath.pathname = path;
	}
	return parsedPath;
}
function getUrlBasedHistory(getLocation, createHref, validateLocation, options) {
	if (options === void 0) options = {};
	let { window = document.defaultView, v5Compat = false } = options;
	let globalHistory = window.history;
	let action = Action.Pop;
	let listener = null;
	let index = getIndex();
	if (index == null) {
		index = 0;
		globalHistory.replaceState(_extends$1({}, globalHistory.state, { idx: index }), "");
	}
	function getIndex() {
		return (globalHistory.state || { idx: null }).idx;
	}
	function handlePop() {
		action = Action.Pop;
		let nextIndex = getIndex();
		let delta = nextIndex == null ? null : nextIndex - index;
		index = nextIndex;
		if (listener) listener({
			action,
			location: history.location,
			delta
		});
	}
	function push(to, state) {
		action = Action.Push;
		let location = createLocation(history.location, to, state);
		if (validateLocation) validateLocation(location, to);
		index = getIndex() + 1;
		let historyState = getHistoryState(location, index);
		let url = history.createHref(location);
		try {
			globalHistory.pushState(historyState, "", url);
		} catch (error) {
			if (error instanceof DOMException && error.name === "DataCloneError") throw error;
			window.location.assign(url);
		}
		if (v5Compat && listener) listener({
			action,
			location: history.location,
			delta: 1
		});
	}
	function replace(to, state) {
		action = Action.Replace;
		let location = createLocation(history.location, to, state);
		if (validateLocation) validateLocation(location, to);
		index = getIndex();
		let historyState = getHistoryState(location, index);
		let url = history.createHref(location);
		globalHistory.replaceState(historyState, "", url);
		if (v5Compat && listener) listener({
			action,
			location: history.location,
			delta: 0
		});
	}
	function createURL(to) {
		let base = window.location.origin !== "null" ? window.location.origin : window.location.href;
		let href = typeof to === "string" ? to : createPath(to);
		href = href.replace(/ $/, "%20");
		invariant(base, "No window.location.(origin|href) available to create URL for href: " + href);
		return new URL(href, base);
	}
	let history = {
		get action() {
			return action;
		},
		get location() {
			return getLocation(window, globalHistory);
		},
		listen(fn) {
			if (listener) throw new Error("A history only accepts one active listener");
			window.addEventListener(PopStateEventType, handlePop);
			listener = fn;
			return () => {
				window.removeEventListener(PopStateEventType, handlePop);
				listener = null;
			};
		},
		createHref(to) {
			return createHref(window, to);
		},
		createURL,
		encodeLocation(to) {
			let url = createURL(to);
			return {
				pathname: url.pathname,
				search: url.search,
				hash: url.hash
			};
		},
		push,
		replace,
		go(n) {
			return globalHistory.go(n);
		}
	};
	return history;
}
/**
* Matches the given routes to a location and returns the match data.
*
* @see https://reactrouter.com/v6/utils/match-routes
*/
function matchRoutes(routes, locationArg, basename) {
	if (basename === void 0) basename = "/";
	return matchRoutesImpl(routes, locationArg, basename, false);
}
function matchRoutesImpl(routes, locationArg, basename, allowPartial) {
	let pathname = stripBasename((typeof locationArg === "string" ? parsePath(locationArg) : locationArg).pathname || "/", basename);
	if (pathname == null) return null;
	let branches = flattenRoutes(routes);
	rankRouteBranches(branches);
	let matches = null;
	for (let i = 0; matches == null && i < branches.length; ++i) {
		let decoded = decodePath(pathname);
		matches = matchRouteBranch(branches[i], decoded, allowPartial);
	}
	return matches;
}
function flattenRoutes(routes, branches, parentsMeta, parentPath) {
	if (branches === void 0) branches = [];
	if (parentsMeta === void 0) parentsMeta = [];
	if (parentPath === void 0) parentPath = "";
	let flattenRoute = (route, index, relativePath) => {
		let meta = {
			relativePath: relativePath === void 0 ? route.path || "" : relativePath,
			caseSensitive: route.caseSensitive === true,
			childrenIndex: index,
			route
		};
		if (meta.relativePath.startsWith("/")) {
			invariant(meta.relativePath.startsWith(parentPath), "Absolute route path \"" + meta.relativePath + "\" nested under path " + ("\"" + parentPath + "\" is not valid. An absolute child route path ") + "must start with the combined path of all its parent routes.");
			meta.relativePath = meta.relativePath.slice(parentPath.length);
		}
		let path = joinPaths([parentPath, meta.relativePath]);
		let routesMeta = parentsMeta.concat(meta);
		if (route.children && route.children.length > 0) {
			invariant(route.index !== true, "Index routes must not have child routes. Please remove " + ("all child routes from route path \"" + path + "\"."));
			flattenRoutes(route.children, branches, routesMeta, path);
		}
		if (route.path == null && !route.index) return;
		branches.push({
			path,
			score: computeScore(path, route.index),
			routesMeta
		});
	};
	routes.forEach((route, index) => {
		var _route$path;
		if (route.path === "" || !((_route$path = route.path) != null && _route$path.includes("?"))) flattenRoute(route, index);
		else for (let exploded of explodeOptionalSegments(route.path)) flattenRoute(route, index, exploded);
	});
	return branches;
}
/**
* Computes all combinations of optional path segments for a given path,
* excluding combinations that are ambiguous and of lower priority.
*
* For example, `/one/:two?/three/:four?/:five?` explodes to:
* - `/one/three`
* - `/one/:two/three`
* - `/one/three/:four`
* - `/one/three/:five`
* - `/one/:two/three/:four`
* - `/one/:two/three/:five`
* - `/one/three/:four/:five`
* - `/one/:two/three/:four/:five`
*/
function explodeOptionalSegments(path) {
	let segments = path.split("/");
	if (segments.length === 0) return [];
	let [first, ...rest] = segments;
	let isOptional = first.endsWith("?");
	let required = first.replace(/\?$/, "");
	if (rest.length === 0) return isOptional ? [required, ""] : [required];
	let restExploded = explodeOptionalSegments(rest.join("/"));
	let result = [];
	result.push(...restExploded.map((subpath) => subpath === "" ? required : [required, subpath].join("/")));
	if (isOptional) result.push(...restExploded);
	return result.map((exploded) => path.startsWith("/") && exploded === "" ? "/" : exploded);
}
function rankRouteBranches(branches) {
	branches.sort((a, b) => a.score !== b.score ? b.score - a.score : compareIndexes(a.routesMeta.map((meta) => meta.childrenIndex), b.routesMeta.map((meta) => meta.childrenIndex)));
}
function computeScore(path, index) {
	let segments = path.split("/");
	let initialScore = segments.length;
	if (segments.some(isSplat)) initialScore += splatPenalty;
	if (index) initialScore += indexRouteValue;
	return segments.filter((s) => !isSplat(s)).reduce((score, segment) => score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue), initialScore);
}
function compareIndexes(a, b) {
	return a.length === b.length && a.slice(0, -1).every((n, i) => n === b[i]) ? a[a.length - 1] - b[b.length - 1] : 0;
}
function matchRouteBranch(branch, pathname, allowPartial) {
	if (allowPartial === void 0) allowPartial = false;
	let { routesMeta } = branch;
	let matchedParams = {};
	let matchedPathname = "/";
	let matches = [];
	for (let i = 0; i < routesMeta.length; ++i) {
		let meta = routesMeta[i];
		let end = i === routesMeta.length - 1;
		let remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/";
		let match = matchPath({
			path: meta.relativePath,
			caseSensitive: meta.caseSensitive,
			end
		}, remainingPathname);
		let route = meta.route;
		if (!match && end && allowPartial && !routesMeta[routesMeta.length - 1].route.index) match = matchPath({
			path: meta.relativePath,
			caseSensitive: meta.caseSensitive,
			end: false
		}, remainingPathname);
		if (!match) return null;
		Object.assign(matchedParams, match.params);
		matches.push({
			params: matchedParams,
			pathname: joinPaths([matchedPathname, match.pathname]),
			pathnameBase: normalizePathname(joinPaths([matchedPathname, match.pathnameBase])),
			route
		});
		if (match.pathnameBase !== "/") matchedPathname = joinPaths([matchedPathname, match.pathnameBase]);
	}
	return matches;
}
/**
* Performs pattern matching on a URL pathname and returns information about
* the match.
*
* @see https://reactrouter.com/v6/utils/match-path
*/
function matchPath(pattern, pathname) {
	if (typeof pattern === "string") pattern = {
		path: pattern,
		caseSensitive: false,
		end: true
	};
	let [matcher, compiledParams] = compilePath(pattern.path, pattern.caseSensitive, pattern.end);
	let match = pathname.match(matcher);
	if (!match) return null;
	let matchedPathname = match[0];
	let pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
	let captureGroups = match.slice(1);
	return {
		params: compiledParams.reduce((memo, _ref, index) => {
			let { paramName, isOptional } = _ref;
			if (paramName === "*") {
				let splatValue = captureGroups[index] || "";
				pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
			}
			const value = captureGroups[index];
			if (isOptional && !value) memo[paramName] = void 0;
			else memo[paramName] = (value || "").replace(/%2F/g, "/");
			return memo;
		}, {}),
		pathname: matchedPathname,
		pathnameBase,
		pattern
	};
}
function compilePath(path, caseSensitive, end) {
	if (caseSensitive === void 0) caseSensitive = false;
	if (end === void 0) end = true;
	warning(path === "*" || !path.endsWith("*") || path.endsWith("/*"), "Route path \"" + path + "\" will be treated as if it were " + ("\"" + path.replace(/\*$/, "/*") + "\" because the `*` character must ") + "always follow a `/` in the pattern. To get rid of this warning, " + ("please change the route path to \"" + path.replace(/\*$/, "/*") + "\"."));
	let params = [];
	let regexpSource = "^" + path.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (_, paramName, isOptional) => {
		params.push({
			paramName,
			isOptional: isOptional != null
		});
		return isOptional ? "/?([^\\/]+)?" : "/([^\\/]+)";
	});
	if (path.endsWith("*")) {
		params.push({ paramName: "*" });
		regexpSource += path === "*" || path === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$";
	} else if (end) regexpSource += "\\/*$";
	else if (path !== "" && path !== "/") regexpSource += "(?:(?=\\/|$))";
	return [new RegExp(regexpSource, caseSensitive ? void 0 : "i"), params];
}
function decodePath(value) {
	try {
		return value.split("/").map((v) => decodeURIComponent(v).replace(/\//g, "%2F")).join("/");
	} catch (error) {
		warning(false, "The URL path \"" + value + "\" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent " + ("encoding (" + error + ")."));
		return value;
	}
}
/**
* @private
*/
function stripBasename(pathname, basename) {
	if (basename === "/") return pathname;
	if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) return null;
	let startIndex = basename.endsWith("/") ? basename.length - 1 : basename.length;
	let nextChar = pathname.charAt(startIndex);
	if (nextChar && nextChar !== "/") return null;
	return pathname.slice(startIndex) || "/";
}
/**
* Returns a resolved path object relative to the given pathname.
*
* @see https://reactrouter.com/v6/utils/resolve-path
*/
function resolvePath(to, fromPathname) {
	if (fromPathname === void 0) fromPathname = "/";
	let { pathname: toPathname, search = "", hash = "" } = typeof to === "string" ? parsePath(to) : to;
	let pathname;
	if (toPathname) if (isAbsoluteUrl(toPathname)) pathname = toPathname;
	else {
		if (toPathname.includes("//")) {
			let oldPathname = toPathname;
			toPathname = toPathname.replace(/\/\/+/g, "/");
			warning(false, "Pathnames cannot have embedded double slashes - normalizing " + (oldPathname + " -> " + toPathname));
		}
		if (toPathname.startsWith("/")) pathname = resolvePathname(toPathname.substring(1), "/");
		else pathname = resolvePathname(toPathname, fromPathname);
	}
	else pathname = fromPathname;
	return {
		pathname,
		search: normalizeSearch(search),
		hash: normalizeHash(hash)
	};
}
function resolvePathname(relativePath, fromPathname) {
	let segments = fromPathname.replace(/\/+$/, "").split("/");
	relativePath.split("/").forEach((segment) => {
		if (segment === "..") {
			if (segments.length > 1) segments.pop();
		} else if (segment !== ".") segments.push(segment);
	});
	return segments.length > 1 ? segments.join("/") : "/";
}
function getInvalidPathError(char, field, dest, path) {
	return "Cannot include a '" + char + "' character in a manually specified " + ("`to." + field + "` field [" + JSON.stringify(path) + "].  Please separate it out to the ") + ("`to." + dest + "` field. Alternatively you may provide the full path as ") + "a string in <Link to=\"...\"> and the router will parse it for you.";
}
/**
* @private
*
* When processing relative navigation we want to ignore ancestor routes that
* do not contribute to the path, such that index/pathless layout routes don't
* interfere.
*
* For example, when moving a route element into an index route and/or a
* pathless layout route, relative link behavior contained within should stay
* the same.  Both of the following examples should link back to the root:
*
*   <Route path="/">
*     <Route path="accounts" element={<Link to=".."}>
*   </Route>
*
*   <Route path="/">
*     <Route path="accounts">
*       <Route element={<AccountsLayout />}>       // <-- Does not contribute
*         <Route index element={<Link to=".."} />  // <-- Does not contribute
*       </Route
*     </Route>
*   </Route>
*/
function getPathContributingMatches(matches) {
	return matches.filter((match, index) => index === 0 || match.route.path && match.route.path.length > 0);
}
function getResolveToMatches(matches, v7_relativeSplatPath) {
	let pathMatches = getPathContributingMatches(matches);
	if (v7_relativeSplatPath) return pathMatches.map((match, idx) => idx === pathMatches.length - 1 ? match.pathname : match.pathnameBase);
	return pathMatches.map((match) => match.pathnameBase);
}
/**
* @private
*/
function resolveTo(toArg, routePathnames, locationPathname, isPathRelative) {
	if (isPathRelative === void 0) isPathRelative = false;
	let to;
	if (typeof toArg === "string") to = parsePath(toArg);
	else {
		to = _extends$1({}, toArg);
		invariant(!to.pathname || !to.pathname.includes("?"), getInvalidPathError("?", "pathname", "search", to));
		invariant(!to.pathname || !to.pathname.includes("#"), getInvalidPathError("#", "pathname", "hash", to));
		invariant(!to.search || !to.search.includes("#"), getInvalidPathError("#", "search", "hash", to));
	}
	let isEmptyPath = toArg === "" || to.pathname === "";
	let toPathname = isEmptyPath ? "/" : to.pathname;
	let from;
	if (toPathname == null) from = locationPathname;
	else {
		let routePathnameIndex = routePathnames.length - 1;
		if (!isPathRelative && toPathname.startsWith("..")) {
			let toSegments = toPathname.split("/");
			while (toSegments[0] === "..") {
				toSegments.shift();
				routePathnameIndex -= 1;
			}
			to.pathname = toSegments.join("/");
		}
		from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
	}
	let path = resolvePath(to, from);
	let hasExplicitTrailingSlash = toPathname && toPathname !== "/" && toPathname.endsWith("/");
	let hasCurrentTrailingSlash = (isEmptyPath || toPathname === ".") && locationPathname.endsWith("/");
	if (!path.pathname.endsWith("/") && (hasExplicitTrailingSlash || hasCurrentTrailingSlash)) path.pathname += "/";
	return path;
}
/**
* Check if the given error is an ErrorResponse generated from a 4xx/5xx
* Response thrown from an action/loader
*/
function isRouteErrorResponse(error) {
	return error != null && typeof error.status === "number" && typeof error.statusText === "string" && typeof error.internal === "boolean" && "data" in error;
}
var Action, PopStateEventType, ResultType, paramRe, dynamicSegmentValue, indexRouteValue, emptySegmentValue, staticSegmentValue, splatPenalty, isSplat, ABSOLUTE_URL_REGEX$1, isAbsoluteUrl, joinPaths, normalizePathname, normalizeSearch, normalizeHash, validMutationMethodsArr, validRequestMethodsArr;
var init_router = __esmMin((() => {
	(function(Action) {
		/**
		* A POP indicates a change to an arbitrary index in the history stack, such
		* as a back or forward navigation. It does not describe the direction of the
		* navigation, only that the current index changed.
		*
		* Note: This is the default action for newly created history objects.
		*/
		Action["Pop"] = "POP";
		/**
		* A PUSH indicates a new entry being added to the history stack, such as when
		* a link is clicked and a new page loads. When this happens, all subsequent
		* entries in the stack are lost.
		*/
		Action["Push"] = "PUSH";
		/**
		* A REPLACE indicates the entry at the current index in the history stack
		* being replaced by a new one.
		*/
		Action["Replace"] = "REPLACE";
	})(Action || (Action = {}));
	PopStateEventType = "popstate";
	(function(ResultType) {
		ResultType["data"] = "data";
		ResultType["deferred"] = "deferred";
		ResultType["redirect"] = "redirect";
		ResultType["error"] = "error";
	})(ResultType || (ResultType = {}));
	paramRe = /^:[\w-]+$/;
	dynamicSegmentValue = 3;
	indexRouteValue = 2;
	emptySegmentValue = 1;
	staticSegmentValue = 10;
	splatPenalty = -2;
	isSplat = (s) => s === "*";
	ABSOLUTE_URL_REGEX$1 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
	isAbsoluteUrl = (url) => ABSOLUTE_URL_REGEX$1.test(url);
	joinPaths = (paths) => paths.join("/").replace(/\/\/+/g, "/");
	normalizePathname = (pathname) => pathname.replace(/\/+$/, "").replace(/^\/*/, "/");
	normalizeSearch = (search) => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search;
	normalizeHash = (hash) => !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash;
	validMutationMethodsArr = [
		"post",
		"put",
		"patch",
		"delete"
	];
	new Set(validMutationMethodsArr);
	validRequestMethodsArr = ["get", ...validMutationMethodsArr];
	new Set(validRequestMethodsArr);
}));
//#endregion
//#region ../../packages/agent-ui/node_modules/react-router/dist/index.js
function _extends() {
	_extends = Object.assign ? Object.assign.bind() : function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
		}
		return target;
	};
	return _extends.apply(this, arguments);
}
/**
* Returns true if this component is a descendant of a `<Router>`.
*
* @see https://reactrouter.com/v6/hooks/use-in-router-context
*/
function useInRouterContext() {
	return import_react$1.useContext(LocationContext) != null;
}
/**
* Returns the current location object, which represents the current URL in web
* browsers.
*
* Note: If you're using this it may mean you're doing some of your own
* "routing" in your app, and we'd like to know what your use case is. We may
* be able to provide something higher-level to better suit your needs.
*
* @see https://reactrouter.com/v6/hooks/use-location
*/
function useLocation() {
	!useInRouterContext() && invariant(false);
	return import_react$1.useContext(LocationContext).location;
}
/**
* Returns a PathMatch object if the given pattern matches the current URL.
* This is useful for components that need to know "active" state, e.g.
* `<NavLink>`.
*
* @see https://reactrouter.com/v6/hooks/use-match
*/
function useMatch(pattern) {
	!useInRouterContext() && invariant(false);
	let { pathname } = useLocation();
	return import_react$1.useMemo(() => matchPath(pattern, decodePath(pathname)), [pathname, pattern]);
}
function useIsomorphicLayoutEffect(cb) {
	if (!import_react$1.useContext(NavigationContext).static) import_react$1.useLayoutEffect(cb);
}
/**
* Returns an imperative method for changing the location. Used by `<Link>`s, but
* may also be used by other elements to change the location.
*
* @see https://reactrouter.com/v6/hooks/use-navigate
*/
function useNavigate() {
	let { isDataRoute } = import_react$1.useContext(RouteContext);
	return isDataRoute ? useNavigateStable() : useNavigateUnstable();
}
function useNavigateUnstable() {
	!useInRouterContext() && invariant(false);
	let dataRouterContext = import_react$1.useContext(DataRouterContext);
	let { basename, future, navigator } = import_react$1.useContext(NavigationContext);
	let { matches } = import_react$1.useContext(RouteContext);
	let { pathname: locationPathname } = useLocation();
	let routePathnamesJson = JSON.stringify(getResolveToMatches(matches, future.v7_relativeSplatPath));
	let activeRef = import_react$1.useRef(false);
	useIsomorphicLayoutEffect(() => {
		activeRef.current = true;
	});
	return import_react$1.useCallback(function(to, options) {
		if (options === void 0) options = {};
		if (!activeRef.current) return;
		if (typeof to === "number") {
			navigator.go(to);
			return;
		}
		let path = resolveTo(to, JSON.parse(routePathnamesJson), locationPathname, options.relative === "path");
		if (dataRouterContext == null && basename !== "/") path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
		(!!options.replace ? navigator.replace : navigator.push)(path, options.state, options);
	}, [
		basename,
		navigator,
		routePathnamesJson,
		locationPathname,
		dataRouterContext
	]);
}
/**
* Returns the context (if provided) for the child route at this level of the route
* hierarchy.
* @see https://reactrouter.com/v6/hooks/use-outlet-context
*/
function useOutletContext() {
	return import_react$1.useContext(OutletContext);
}
/**
* Returns the element for the child route at this level of the route
* hierarchy. Used internally by `<Outlet>` to render child routes.
*
* @see https://reactrouter.com/v6/hooks/use-outlet
*/
function useOutlet(context) {
	let outlet = import_react$1.useContext(RouteContext).outlet;
	if (outlet) return /* @__PURE__ */ import_react$1.createElement(OutletContext.Provider, { value: context }, outlet);
	return outlet;
}
/**
* Returns an object of key/value pairs of the dynamic params from the current
* URL that were matched by the route path.
*
* @see https://reactrouter.com/v6/hooks/use-params
*/
function useParams() {
	let { matches } = import_react$1.useContext(RouteContext);
	let routeMatch = matches[matches.length - 1];
	return routeMatch ? routeMatch.params : {};
}
/**
* Returns the element of the route that matched the current location, prepared
* with the correct context to render the remainder of the route tree. Route
* elements in the tree must render an `<Outlet>` to render their child route's
* element.
*
* @see https://reactrouter.com/v6/hooks/use-routes
*/
function useRoutes(routes, locationArg) {
	return useRoutesImpl(routes, locationArg);
}
function useRoutesImpl(routes, locationArg, dataRouterState, future) {
	!useInRouterContext() && invariant(false);
	let { navigator } = import_react$1.useContext(NavigationContext);
	let { matches: parentMatches } = import_react$1.useContext(RouteContext);
	let routeMatch = parentMatches[parentMatches.length - 1];
	let parentParams = routeMatch ? routeMatch.params : {};
	routeMatch && routeMatch.pathname;
	let parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/";
	routeMatch && routeMatch.route;
	let locationFromContext = useLocation();
	let location;
	if (locationArg) {
		var _parsedLocationArg$pa;
		let parsedLocationArg = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
		!(parentPathnameBase === "/" || ((_parsedLocationArg$pa = parsedLocationArg.pathname) == null ? void 0 : _parsedLocationArg$pa.startsWith(parentPathnameBase))) && invariant(false);
		location = parsedLocationArg;
	} else location = locationFromContext;
	let pathname = location.pathname || "/";
	let remainingPathname = pathname;
	if (parentPathnameBase !== "/") {
		let parentSegments = parentPathnameBase.replace(/^\//, "").split("/");
		remainingPathname = "/" + pathname.replace(/^\//, "").split("/").slice(parentSegments.length).join("/");
	}
	let matches = matchRoutes(routes, { pathname: remainingPathname });
	let renderedMatches = _renderMatches(matches && matches.map((match) => Object.assign({}, match, {
		params: Object.assign({}, parentParams, match.params),
		pathname: joinPaths([parentPathnameBase, navigator.encodeLocation ? navigator.encodeLocation(match.pathname).pathname : match.pathname]),
		pathnameBase: match.pathnameBase === "/" ? parentPathnameBase : joinPaths([parentPathnameBase, navigator.encodeLocation ? navigator.encodeLocation(match.pathnameBase).pathname : match.pathnameBase])
	})), parentMatches, dataRouterState, future);
	if (locationArg && renderedMatches) return /* @__PURE__ */ import_react$1.createElement(LocationContext.Provider, { value: {
		location: _extends({
			pathname: "/",
			search: "",
			hash: "",
			state: null,
			key: "default"
		}, location),
		navigationType: Action.Pop
	} }, renderedMatches);
	return renderedMatches;
}
function DefaultErrorComponent() {
	let error = useRouteError();
	let message = isRouteErrorResponse(error) ? error.status + " " + error.statusText : error instanceof Error ? error.message : JSON.stringify(error);
	let stack = error instanceof Error ? error.stack : null;
	return /* @__PURE__ */ import_react$1.createElement(import_react$1.Fragment, null, /* @__PURE__ */ import_react$1.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ import_react$1.createElement("h3", { style: { fontStyle: "italic" } }, message), stack ? /* @__PURE__ */ import_react$1.createElement("pre", { style: {
		padding: "0.5rem",
		backgroundColor: "rgba(200,200,200, 0.5)"
	} }, stack) : null, null);
}
function RenderedRoute(_ref) {
	let { routeContext, match, children } = _ref;
	let dataRouterContext = import_react$1.useContext(DataRouterContext);
	if (dataRouterContext && dataRouterContext.static && dataRouterContext.staticContext && (match.route.errorElement || match.route.ErrorBoundary)) dataRouterContext.staticContext._deepestRenderedBoundaryId = match.route.id;
	return /* @__PURE__ */ import_react$1.createElement(RouteContext.Provider, { value: routeContext }, children);
}
function _renderMatches(matches, parentMatches, dataRouterState, future) {
	var _dataRouterState;
	if (parentMatches === void 0) parentMatches = [];
	if (dataRouterState === void 0) dataRouterState = null;
	if (future === void 0) future = null;
	if (matches == null) {
		var _future;
		if (!dataRouterState) return null;
		if (dataRouterState.errors) matches = dataRouterState.matches;
		else if ((_future = future) != null && _future.v7_partialHydration && parentMatches.length === 0 && !dataRouterState.initialized && dataRouterState.matches.length > 0) matches = dataRouterState.matches;
		else return null;
	}
	let renderedMatches = matches;
	let errors = (_dataRouterState = dataRouterState) == null ? void 0 : _dataRouterState.errors;
	if (errors != null) {
		let errorIndex = renderedMatches.findIndex((m) => m.route.id && (errors == null ? void 0 : errors[m.route.id]) !== void 0);
		!(errorIndex >= 0) && invariant(false);
		renderedMatches = renderedMatches.slice(0, Math.min(renderedMatches.length, errorIndex + 1));
	}
	let renderFallback = false;
	let fallbackIndex = -1;
	if (dataRouterState && future && future.v7_partialHydration) for (let i = 0; i < renderedMatches.length; i++) {
		let match = renderedMatches[i];
		if (match.route.HydrateFallback || match.route.hydrateFallbackElement) fallbackIndex = i;
		if (match.route.id) {
			let { loaderData, errors } = dataRouterState;
			let needsToRunLoader = match.route.loader && loaderData[match.route.id] === void 0 && (!errors || errors[match.route.id] === void 0);
			if (match.route.lazy || needsToRunLoader) {
				renderFallback = true;
				if (fallbackIndex >= 0) renderedMatches = renderedMatches.slice(0, fallbackIndex + 1);
				else renderedMatches = [renderedMatches[0]];
				break;
			}
		}
	}
	return renderedMatches.reduceRight((outlet, match, index) => {
		let error;
		let shouldRenderHydrateFallback = false;
		let errorElement = null;
		let hydrateFallbackElement = null;
		if (dataRouterState) {
			error = errors && match.route.id ? errors[match.route.id] : void 0;
			errorElement = match.route.errorElement || defaultErrorElement;
			if (renderFallback) {
				if (fallbackIndex < 0 && index === 0) {
					warningOnce("route-fallback", false, "No `HydrateFallback` element provided to render during initial hydration");
					shouldRenderHydrateFallback = true;
					hydrateFallbackElement = null;
				} else if (fallbackIndex === index) {
					shouldRenderHydrateFallback = true;
					hydrateFallbackElement = match.route.hydrateFallbackElement || null;
				}
			}
		}
		let matches = parentMatches.concat(renderedMatches.slice(0, index + 1));
		let getChildren = () => {
			let children;
			if (error) children = errorElement;
			else if (shouldRenderHydrateFallback) children = hydrateFallbackElement;
			else if (match.route.Component) children = /* @__PURE__ */ import_react$1.createElement(match.route.Component, null);
			else if (match.route.element) children = match.route.element;
			else children = outlet;
			return /* @__PURE__ */ import_react$1.createElement(RenderedRoute, {
				match,
				routeContext: {
					outlet,
					matches,
					isDataRoute: dataRouterState != null
				},
				children
			});
		};
		return dataRouterState && (match.route.ErrorBoundary || match.route.errorElement || index === 0) ? /* @__PURE__ */ import_react$1.createElement(RenderErrorBoundary, {
			location: dataRouterState.location,
			revalidation: dataRouterState.revalidation,
			component: errorElement,
			error,
			children: getChildren(),
			routeContext: {
				outlet: null,
				matches,
				isDataRoute: true
			}
		}) : getChildren();
	}, null);
}
function useDataRouterContext(hookName) {
	let ctx = import_react$1.useContext(DataRouterContext);
	!ctx && invariant(false);
	return ctx;
}
function useDataRouterState(hookName) {
	let state = import_react$1.useContext(DataRouterStateContext);
	!state && invariant(false);
	return state;
}
function useRouteContext(hookName) {
	let route = import_react$1.useContext(RouteContext);
	!route && invariant(false);
	return route;
}
function useCurrentRouteId(hookName) {
	let route = useRouteContext(hookName);
	let thisRoute = route.matches[route.matches.length - 1];
	!thisRoute.route.id && invariant(false);
	return thisRoute.route.id;
}
/**
* Returns the nearest ancestor Route error, which could be a loader/action
* error or a render error.  This is intended to be called from your
* ErrorBoundary/errorElement to display a proper error message.
*/
function useRouteError() {
	var _state$errors;
	let error = import_react$1.useContext(RouteErrorContext);
	let state = useDataRouterState(DataRouterStateHook$1.UseRouteError);
	let routeId = useCurrentRouteId(DataRouterStateHook$1.UseRouteError);
	if (error !== void 0) return error;
	return (_state$errors = state.errors) == null ? void 0 : _state$errors[routeId];
}
/**
* Stable version of useNavigate that is used when we are in the context of
* a RouterProvider.
*/
function useNavigateStable() {
	let { router } = useDataRouterContext(DataRouterHook$1.UseNavigateStable);
	let id = useCurrentRouteId(DataRouterStateHook$1.UseNavigateStable);
	let activeRef = import_react$1.useRef(false);
	useIsomorphicLayoutEffect(() => {
		activeRef.current = true;
	});
	return import_react$1.useCallback(function(to, options) {
		if (options === void 0) options = {};
		if (!activeRef.current) return;
		if (typeof to === "number") router.navigate(to);
		else router.navigate(to, _extends({ fromRouteId: id }, options));
	}, [router, id]);
}
function warningOnce(key, cond, message) {
	if (!cond && !alreadyWarned$1[key]) alreadyWarned$1[key] = true;
}
function warnOnce(key, message) {}
function logV6DeprecationWarnings(renderFuture, routerFuture) {
	if ((renderFuture == null ? void 0 : renderFuture.v7_startTransition) === void 0) logDeprecation("v7_startTransition", "React Router will begin wrapping state updates in `React.startTransition` in v7", "https://reactrouter.com/v6/upgrading/future#v7_starttransition");
	if ((renderFuture == null ? void 0 : renderFuture.v7_relativeSplatPath) === void 0 && (!routerFuture || routerFuture.v7_relativeSplatPath === void 0)) logDeprecation("v7_relativeSplatPath", "Relative route resolution within Splat routes is changing in v7", "https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath");
	if (routerFuture) {
		if (routerFuture.v7_fetcherPersist === void 0) logDeprecation("v7_fetcherPersist", "The persistence behavior of fetchers is changing in v7", "https://reactrouter.com/v6/upgrading/future#v7_fetcherpersist");
		if (routerFuture.v7_normalizeFormMethod === void 0) logDeprecation("v7_normalizeFormMethod", "Casing of `formMethod` fields is being normalized to uppercase in v7", "https://reactrouter.com/v6/upgrading/future#v7_normalizeformmethod");
		if (routerFuture.v7_partialHydration === void 0) logDeprecation("v7_partialHydration", "`RouterProvider` hydration behavior is changing in v7", "https://reactrouter.com/v6/upgrading/future#v7_partialhydration");
		if (routerFuture.v7_skipActionErrorRevalidation === void 0) logDeprecation("v7_skipActionErrorRevalidation", "The revalidation behavior after 4xx/5xx `action` responses is changing in v7", "https://reactrouter.com/v6/upgrading/future#v7_skipactionerrorrevalidation");
	}
}
/**
* A `<Router>` that stores all entries in memory.
*
* @see https://reactrouter.com/v6/router-components/memory-router
*/
function MemoryRouter(_ref3) {
	let { basename, children, initialEntries, initialIndex, future } = _ref3;
	let historyRef = import_react$1.useRef();
	if (historyRef.current == null) historyRef.current = createMemoryHistory({
		initialEntries,
		initialIndex,
		v5Compat: true
	});
	let history = historyRef.current;
	let [state, setStateImpl] = import_react$1.useState({
		action: history.action,
		location: history.location
	});
	let { v7_startTransition } = future || {};
	let setState = import_react$1.useCallback((newState) => {
		v7_startTransition && startTransitionImpl$1 ? startTransitionImpl$1(() => setStateImpl(newState)) : setStateImpl(newState);
	}, [setStateImpl, v7_startTransition]);
	import_react$1.useLayoutEffect(() => history.listen(setState), [history, setState]);
	import_react$1.useEffect(() => logV6DeprecationWarnings(future), [future]);
	return /* @__PURE__ */ import_react$1.createElement(Router, {
		basename,
		children,
		location: state.location,
		navigationType: state.action,
		navigator: history,
		future
	});
}
/**
* Changes the current location.
*
* Note: This API is mostly useful in React.Component subclasses that are not
* able to use hooks. In functional components, we recommend you use the
* `useNavigate` hook instead.
*
* @see https://reactrouter.com/v6/components/navigate
*/
function Navigate(_ref4) {
	let { to, replace, state, relative } = _ref4;
	!useInRouterContext() && invariant(false);
	let { future, static: isStatic } = import_react$1.useContext(NavigationContext);
	let { matches } = import_react$1.useContext(RouteContext);
	let { pathname: locationPathname } = useLocation();
	let navigate = useNavigate();
	let path = resolveTo(to, getResolveToMatches(matches, future.v7_relativeSplatPath), locationPathname, relative === "path");
	let jsonPath = JSON.stringify(path);
	import_react$1.useEffect(() => navigate(JSON.parse(jsonPath), {
		replace,
		state,
		relative
	}), [
		navigate,
		jsonPath,
		relative,
		replace,
		state
	]);
	return null;
}
/**
* Renders the child route's element, if there is one.
*
* @see https://reactrouter.com/v6/components/outlet
*/
function Outlet(props) {
	return useOutlet(props.context);
}
/**
* Declares an element that should be rendered at a certain URL path.
*
* @see https://reactrouter.com/v6/components/route
*/
function Route(_props) {
	invariant(false);
}
/**
* Provides location context for the rest of the app.
*
* Note: You usually won't render a `<Router>` directly. Instead, you'll render a
* router that is more specific to your environment such as a `<BrowserRouter>`
* in web browsers or a `<StaticRouter>` for server rendering.
*
* @see https://reactrouter.com/v6/router-components/router
*/
function Router(_ref5) {
	let { basename: basenameProp = "/", children = null, location: locationProp, navigationType = Action.Pop, navigator, static: staticProp = false, future } = _ref5;
	useInRouterContext() && invariant(false);
	let basename = basenameProp.replace(/^\/*/, "/");
	let navigationContext = import_react$1.useMemo(() => ({
		basename,
		navigator,
		static: staticProp,
		future: _extends({ v7_relativeSplatPath: false }, future)
	}), [
		basename,
		future,
		navigator,
		staticProp
	]);
	if (typeof locationProp === "string") locationProp = parsePath(locationProp);
	let { pathname = "/", search = "", hash = "", state = null, key = "default" } = locationProp;
	let locationContext = import_react$1.useMemo(() => {
		let trailingPathname = stripBasename(pathname, basename);
		if (trailingPathname == null) return null;
		return {
			location: {
				pathname: trailingPathname,
				search,
				hash,
				state,
				key
			},
			navigationType
		};
	}, [
		basename,
		pathname,
		search,
		hash,
		state,
		key,
		navigationType
	]);
	if (locationContext == null) return null;
	return /* @__PURE__ */ import_react$1.createElement(NavigationContext.Provider, { value: navigationContext }, /* @__PURE__ */ import_react$1.createElement(LocationContext.Provider, {
		children,
		value: locationContext
	}));
}
/**
* A container for a nested tree of `<Route>` elements that renders the branch
* that best matches the current location.
*
* @see https://reactrouter.com/v6/components/routes
*/
function Routes(_ref6) {
	let { children, location } = _ref6;
	return useRoutes(createRoutesFromChildren(children), location);
}
/**
* Creates a route config from a React "children" object, which is usually
* either a `<Route>` element or an array of them. Used internally by
* `<Routes>` to create a route config from its children.
*
* @see https://reactrouter.com/v6/utils/create-routes-from-children
*/
function createRoutesFromChildren(children, parentPath) {
	if (parentPath === void 0) parentPath = [];
	let routes = [];
	import_react$1.Children.forEach(children, (element, index) => {
		if (!/* @__PURE__ */ import_react$1.isValidElement(element)) return;
		let treePath = [...parentPath, index];
		if (element.type === import_react$1.Fragment) {
			routes.push.apply(routes, createRoutesFromChildren(element.props.children, treePath));
			return;
		}
		!(element.type === Route) && invariant(false);
		!(!element.props.index || !element.props.children) && invariant(false);
		let route = {
			id: element.props.id || treePath.join("-"),
			caseSensitive: element.props.caseSensitive,
			element: element.props.element,
			Component: element.props.Component,
			index: element.props.index,
			path: element.props.path,
			loader: element.props.loader,
			action: element.props.action,
			errorElement: element.props.errorElement,
			ErrorBoundary: element.props.ErrorBoundary,
			hasErrorBoundary: element.props.ErrorBoundary != null || element.props.errorElement != null,
			shouldRevalidate: element.props.shouldRevalidate,
			handle: element.props.handle,
			lazy: element.props.lazy
		};
		if (element.props.children) route.children = createRoutesFromChildren(element.props.children, treePath);
		routes.push(route);
	});
	return routes;
}
var import_react$1, DataRouterContext, DataRouterStateContext, NavigationContext, LocationContext, RouteContext, RouteErrorContext, OutletContext, defaultErrorElement, RenderErrorBoundary, DataRouterHook$1, DataRouterStateHook$1, alreadyWarned$1, logDeprecation, startTransitionImpl$1, AwaitRenderStatus;
var init_dist$1 = __esmMin((() => {
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_router();
	DataRouterContext = /* @__PURE__ */ import_react$1.createContext(null);
	DataRouterStateContext = /* @__PURE__ */ import_react$1.createContext(null);
	NavigationContext = /* @__PURE__ */ import_react$1.createContext(null);
	LocationContext = /* @__PURE__ */ import_react$1.createContext(null);
	RouteContext = /* @__PURE__ */ import_react$1.createContext({
		outlet: null,
		matches: [],
		isDataRoute: false
	});
	RouteErrorContext = /* @__PURE__ */ import_react$1.createContext(null);
	OutletContext = /* @__PURE__ */ import_react$1.createContext(null);
	defaultErrorElement = /* @__PURE__ */ import_react$1.createElement(DefaultErrorComponent, null);
	RenderErrorBoundary = class extends import_react$1.Component {
		constructor(props) {
			super(props);
			this.state = {
				location: props.location,
				revalidation: props.revalidation,
				error: props.error
			};
		}
		static getDerivedStateFromError(error) {
			return { error };
		}
		static getDerivedStateFromProps(props, state) {
			if (state.location !== props.location || state.revalidation !== "idle" && props.revalidation === "idle") return {
				error: props.error,
				location: props.location,
				revalidation: props.revalidation
			};
			return {
				error: props.error !== void 0 ? props.error : state.error,
				location: state.location,
				revalidation: props.revalidation || state.revalidation
			};
		}
		componentDidCatch(error, errorInfo) {
			console.error("React Router caught the following error during render", error, errorInfo);
		}
		render() {
			return this.state.error !== void 0 ? /* @__PURE__ */ import_react$1.createElement(RouteContext.Provider, { value: this.props.routeContext }, /* @__PURE__ */ import_react$1.createElement(RouteErrorContext.Provider, {
				value: this.state.error,
				children: this.props.component
			})) : this.props.children;
		}
	};
	DataRouterHook$1 = /* @__PURE__ */ function(DataRouterHook) {
		DataRouterHook["UseBlocker"] = "useBlocker";
		DataRouterHook["UseRevalidator"] = "useRevalidator";
		DataRouterHook["UseNavigateStable"] = "useNavigate";
		return DataRouterHook;
	}(DataRouterHook$1 || {});
	DataRouterStateHook$1 = /* @__PURE__ */ function(DataRouterStateHook) {
		DataRouterStateHook["UseBlocker"] = "useBlocker";
		DataRouterStateHook["UseLoaderData"] = "useLoaderData";
		DataRouterStateHook["UseActionData"] = "useActionData";
		DataRouterStateHook["UseRouteError"] = "useRouteError";
		DataRouterStateHook["UseNavigation"] = "useNavigation";
		DataRouterStateHook["UseRouteLoaderData"] = "useRouteLoaderData";
		DataRouterStateHook["UseMatches"] = "useMatches";
		DataRouterStateHook["UseRevalidator"] = "useRevalidator";
		DataRouterStateHook["UseNavigateStable"] = "useNavigate";
		DataRouterStateHook["UseRouteId"] = "useRouteId";
		return DataRouterStateHook;
	}(DataRouterStateHook$1 || {});
	alreadyWarned$1 = {};
	logDeprecation = (flag, msg, link) => warnOnce(flag, "⚠️ React Router Future Flag Warning: " + msg + ". " + ("You can use the `" + flag + "` future flag to opt-in early. ") + ("For more information, see " + link + "."));
	startTransitionImpl$1 = import_react$1.startTransition;
	AwaitRenderStatus = /* @__PURE__ */ function(AwaitRenderStatus) {
		AwaitRenderStatus[AwaitRenderStatus["pending"] = 0] = "pending";
		AwaitRenderStatus[AwaitRenderStatus["success"] = 1] = "success";
		AwaitRenderStatus[AwaitRenderStatus["error"] = 2] = "error";
		return AwaitRenderStatus;
	}(AwaitRenderStatus || {});
	new Promise(() => {});
	import_react$1.Component;
}));
//#endregion
//#region ../../packages/agent-ui/node_modules/react-router-dom/dist/index.js
/**
* Creates a URLSearchParams object using the given initializer.
*
* This is identical to `new URLSearchParams(init)` except it also
* supports arrays as values in the object form of the initializer
* instead of just strings. This is convenient when you need multiple
* values for a given key, but don't want to use an array initializer.
*
* For example, instead of:
*
*   let searchParams = new URLSearchParams([
*     ['sort', 'name'],
*     ['sort', 'price']
*   ]);
*
* you can do:
*
*   let searchParams = createSearchParams({
*     sort: ['name', 'price']
*   });
*/
function createSearchParams(init) {
	if (init === void 0) init = "";
	return new URLSearchParams(typeof init === "string" || Array.isArray(init) || init instanceof URLSearchParams ? init : Object.keys(init).reduce((memo, key) => {
		let value = init[key];
		return memo.concat(Array.isArray(value) ? value.map((v) => [key, v]) : [[key, value]]);
	}, []));
}
function getSearchParamsForLocation(locationSearch, defaultSearchParams) {
	let searchParams = createSearchParams(locationSearch);
	if (defaultSearchParams) defaultSearchParams.forEach((_, key) => {
		if (!searchParams.has(key)) defaultSearchParams.getAll(key).forEach((value) => {
			searchParams.append(key, value);
		});
	});
	return searchParams;
}
/**
* A `<Router>` for use in web browsers. Provides the cleanest URLs.
*/
function BrowserRouter(_ref4) {
	let { basename, children, future, window } = _ref4;
	let historyRef = import_react.useRef();
	if (historyRef.current == null) historyRef.current = createBrowserHistory({
		window,
		v5Compat: true
	});
	let history = historyRef.current;
	let [state, setStateImpl] = import_react.useState({
		action: history.action,
		location: history.location
	});
	let { v7_startTransition } = future || {};
	let setState = import_react.useCallback((newState) => {
		v7_startTransition && startTransitionImpl ? startTransitionImpl(() => setStateImpl(newState)) : setStateImpl(newState);
	}, [setStateImpl, v7_startTransition]);
	import_react.useLayoutEffect(() => history.listen(setState), [history, setState]);
	import_react.useEffect(() => logV6DeprecationWarnings(future), [future]);
	return /* @__PURE__ */ import_react.createElement(Router, {
		basename,
		children,
		location: state.location,
		navigationType: state.action,
		navigator: history,
		future
	});
}
/**
* A `<Router>` for use in web browsers. Stores the location in the hash
* portion of the URL so it is not sent to the server.
*/
function HashRouter(_ref5) {
	let { basename, children, future, window } = _ref5;
	let historyRef = import_react.useRef();
	if (historyRef.current == null) historyRef.current = createHashHistory({
		window,
		v5Compat: true
	});
	let history = historyRef.current;
	let [state, setStateImpl] = import_react.useState({
		action: history.action,
		location: history.location
	});
	let { v7_startTransition } = future || {};
	let setState = import_react.useCallback((newState) => {
		v7_startTransition && startTransitionImpl ? startTransitionImpl(() => setStateImpl(newState)) : setStateImpl(newState);
	}, [setStateImpl, v7_startTransition]);
	import_react.useLayoutEffect(() => history.listen(setState), [history, setState]);
	import_react.useEffect(() => logV6DeprecationWarnings(future), [future]);
	return /* @__PURE__ */ import_react.createElement(Router, {
		basename,
		children,
		location: state.location,
		navigationType: state.action,
		navigator: history,
		future
	});
}
/**
* A convenient wrapper for reading and writing search parameters via the
* URLSearchParams interface.
*/
function useSearchParams(defaultInit) {
	let defaultSearchParamsRef = import_react.useRef(createSearchParams(defaultInit));
	let hasSetSearchParamsRef = import_react.useRef(false);
	let location = useLocation();
	let searchParams = import_react.useMemo(() => getSearchParamsForLocation(location.search, hasSetSearchParamsRef.current ? null : defaultSearchParamsRef.current), [location.search]);
	let navigate = useNavigate();
	return [searchParams, import_react.useCallback((nextInit, navigateOptions) => {
		const newSearchParams = createSearchParams(typeof nextInit === "function" ? nextInit(searchParams) : nextInit);
		hasSetSearchParamsRef.current = true;
		navigate("?" + newSearchParams, navigateOptions);
	}, [navigate, searchParams])];
}
var import_react, import_react_dom, REACT_ROUTER_VERSION, startTransitionImpl, DataRouterHook, DataRouterStateHook;
var init_dist = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
	init_dist$1();
	init_router();
	REACT_ROUTER_VERSION = "6";
	try {
		window.__reactRouterVersion = REACT_ROUTER_VERSION;
	} catch (e) {}
	startTransitionImpl = import_react.startTransition;
	import_react_dom.flushSync;
	import_react.useId;
	typeof window !== "undefined" && typeof window.document !== "undefined" && window.document.createElement;
	(function(DataRouterHook) {
		DataRouterHook["UseScrollRestoration"] = "useScrollRestoration";
		DataRouterHook["UseSubmit"] = "useSubmit";
		DataRouterHook["UseSubmitFetcher"] = "useSubmitFetcher";
		DataRouterHook["UseFetcher"] = "useFetcher";
		DataRouterHook["useViewTransitionState"] = "useViewTransitionState";
	})(DataRouterHook || (DataRouterHook = {}));
	(function(DataRouterStateHook) {
		DataRouterStateHook["UseFetcher"] = "useFetcher";
		DataRouterStateHook["UseFetchers"] = "useFetchers";
		DataRouterStateHook["UseScrollRestoration"] = "useScrollRestoration";
	})(DataRouterStateHook || (DataRouterStateHook = {}));
}));
//#endregion
export { MemoryRouter as a, Route as c, useMatch as d, useNavigate as f, matchPath as g, useRoutes as h, useSearchParams as i, Routes as l, useParams as m, HashRouter as n, Navigate as o, useOutletContext as p, init_dist as r, Outlet as s, BrowserRouter as t, useLocation as u };
