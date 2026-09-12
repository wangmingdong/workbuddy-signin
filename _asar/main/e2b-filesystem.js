const require_chunk = require("./chunk.js");
let node_fs = require("node:fs");
node_fs = require_chunk.__toESM(node_fs, 1);
let node_path = require("node:path");
node_path = require_chunk.__toESM(node_path, 1);
let node_os = require("node:os");
node_os = require_chunk.__toESM(node_os, 1);
let node_crypto = require("node:crypto");
node_crypto = require_chunk.__toESM(node_crypto, 1);
let node_process = require("node:process");
node_process = require_chunk.__toESM(node_process, 1);
let node_tty = require("node:tty");
node_tty = require_chunk.__toESM(node_tty, 1);
//#region ../../node_modules/openapi-fetch/dist/index.mjs
var PATH_PARAM_RE = /\{[^{}]+\}/g;
var supportsRequestInitExt = () => {
	return typeof process === "object" && Number.parseInt(process?.versions?.node?.substring(0, 2)) >= 18 && process.versions.undici;
};
function randomID() {
	return Math.random().toString(36).slice(2, 11);
}
function createClient$1(clientOptions) {
	let { baseUrl = "", Request: CustomRequest = globalThis.Request, fetch: baseFetch = globalThis.fetch, querySerializer: globalQuerySerializer, bodySerializer: globalBodySerializer, headers: baseHeaders, requestInitExt = void 0, ...baseOptions } = { ...clientOptions };
	requestInitExt = supportsRequestInitExt() ? requestInitExt : void 0;
	baseUrl = removeTrailingSlash(baseUrl);
	const middlewares = [];
	async function coreFetch(schemaPath, fetchOptions) {
		const { baseUrl: localBaseUrl, fetch = baseFetch, Request = CustomRequest, headers, params = {}, parseAs = "json", querySerializer: requestQuerySerializer, bodySerializer = globalBodySerializer ?? defaultBodySerializer, body, ...init } = fetchOptions || {};
		let finalBaseUrl = baseUrl;
		if (localBaseUrl) finalBaseUrl = removeTrailingSlash(localBaseUrl) ?? baseUrl;
		let querySerializer = typeof globalQuerySerializer === "function" ? globalQuerySerializer : createQuerySerializer(globalQuerySerializer);
		if (requestQuerySerializer) querySerializer = typeof requestQuerySerializer === "function" ? requestQuerySerializer : createQuerySerializer({
			...typeof globalQuerySerializer === "object" ? globalQuerySerializer : {},
			...requestQuerySerializer
		});
		const serializedBody = body === void 0 ? void 0 : bodySerializer(body, mergeHeaders(baseHeaders, headers, params.header));
		const finalHeaders = mergeHeaders(serializedBody === void 0 || serializedBody instanceof FormData ? {} : { "Content-Type": "application/json" }, baseHeaders, headers, params.header);
		const requestInit = {
			redirect: "follow",
			...baseOptions,
			...init,
			body: serializedBody,
			headers: finalHeaders
		};
		let id;
		let options;
		let request = new Request(createFinalURL(schemaPath, {
			baseUrl: finalBaseUrl,
			params,
			querySerializer
		}), requestInit);
		let response;
		for (const key in init) if (!(key in request)) request[key] = init[key];
		if (middlewares.length) {
			id = randomID();
			options = Object.freeze({
				baseUrl: finalBaseUrl,
				fetch,
				parseAs,
				querySerializer,
				bodySerializer
			});
			for (const m of middlewares) if (m && typeof m === "object" && typeof m.onRequest === "function") {
				const result = await m.onRequest({
					request,
					schemaPath,
					params,
					options,
					id
				});
				if (result) if (result instanceof Request) request = result;
				else if (result instanceof Response) {
					response = result;
					break;
				} else throw new Error("onRequest: must return new Request() or Response() when modifying the request");
			}
		}
		if (!response) {
			try {
				response = await fetch(request, requestInitExt);
			} catch (error2) {
				let errorAfterMiddleware = error2;
				if (middlewares.length) for (let i = middlewares.length - 1; i >= 0; i--) {
					const m = middlewares[i];
					if (m && typeof m === "object" && typeof m.onError === "function") {
						const result = await m.onError({
							request,
							error: errorAfterMiddleware,
							schemaPath,
							params,
							options,
							id
						});
						if (result) {
							if (result instanceof Response) {
								errorAfterMiddleware = void 0;
								response = result;
								break;
							}
							if (result instanceof Error) {
								errorAfterMiddleware = result;
								continue;
							}
							throw new Error("onError: must return new Response() or instance of Error");
						}
					}
				}
				if (errorAfterMiddleware) throw errorAfterMiddleware;
			}
			if (middlewares.length) for (let i = middlewares.length - 1; i >= 0; i--) {
				const m = middlewares[i];
				if (m && typeof m === "object" && typeof m.onResponse === "function") {
					const result = await m.onResponse({
						request,
						response,
						schemaPath,
						params,
						options,
						id
					});
					if (result) {
						if (!(result instanceof Response)) throw new Error("onResponse: must return new Response() when modifying the response");
						response = result;
					}
				}
			}
		}
		if (response.status === 204 || request.method === "HEAD" || response.headers.get("Content-Length") === "0") return response.ok ? {
			data: void 0,
			response
		} : {
			error: void 0,
			response
		};
		if (response.ok) {
			if (parseAs === "stream") return {
				data: response.body,
				response
			};
			return {
				data: await response[parseAs](),
				response
			};
		}
		let error = await response.text();
		try {
			error = JSON.parse(error);
		} catch {}
		return {
			error,
			response
		};
	}
	return {
		request(method, url, init) {
			return coreFetch(url, {
				...init,
				method: method.toUpperCase()
			});
		},
		GET(url, init) {
			return coreFetch(url, {
				...init,
				method: "GET"
			});
		},
		PUT(url, init) {
			return coreFetch(url, {
				...init,
				method: "PUT"
			});
		},
		POST(url, init) {
			return coreFetch(url, {
				...init,
				method: "POST"
			});
		},
		DELETE(url, init) {
			return coreFetch(url, {
				...init,
				method: "DELETE"
			});
		},
		OPTIONS(url, init) {
			return coreFetch(url, {
				...init,
				method: "OPTIONS"
			});
		},
		HEAD(url, init) {
			return coreFetch(url, {
				...init,
				method: "HEAD"
			});
		},
		PATCH(url, init) {
			return coreFetch(url, {
				...init,
				method: "PATCH"
			});
		},
		TRACE(url, init) {
			return coreFetch(url, {
				...init,
				method: "TRACE"
			});
		},
		use(...middleware) {
			for (const m of middleware) {
				if (!m) continue;
				if (typeof m !== "object" || !("onRequest" in m || "onResponse" in m || "onError" in m)) throw new Error("Middleware must be an object with one of `onRequest()`, `onResponse() or `onError()`");
				middlewares.push(m);
			}
		},
		eject(...middleware) {
			for (const m of middleware) {
				const i = middlewares.indexOf(m);
				if (i !== -1) middlewares.splice(i, 1);
			}
		}
	};
}
function serializePrimitiveParam(name, value, options) {
	if (value === void 0 || value === null) return "";
	if (typeof value === "object") throw new Error("Deeply-nested arrays/objects aren’t supported. Provide your own `querySerializer()` to handle these.");
	return `${name}=${options?.allowReserved === true ? value : encodeURIComponent(value)}`;
}
function serializeObjectParam(name, value, options) {
	if (!value || typeof value !== "object") return "";
	const values = [];
	const joiner = {
		simple: ",",
		label: ".",
		matrix: ";"
	}[options.style] || "&";
	if (options.style !== "deepObject" && options.explode === false) {
		for (const k in value) values.push(k, options.allowReserved === true ? value[k] : encodeURIComponent(value[k]));
		const final2 = values.join(",");
		switch (options.style) {
			case "form": return `${name}=${final2}`;
			case "label": return `.${final2}`;
			case "matrix": return `;${name}=${final2}`;
			default: return final2;
		}
	}
	for (const k in value) {
		const finalName = options.style === "deepObject" ? `${name}[${k}]` : k;
		values.push(serializePrimitiveParam(finalName, value[k], options));
	}
	const final = values.join(joiner);
	return options.style === "label" || options.style === "matrix" ? `${joiner}${final}` : final;
}
function serializeArrayParam(name, value, options) {
	if (!Array.isArray(value)) return "";
	if (options.explode === false) {
		const joiner2 = {
			form: ",",
			spaceDelimited: "%20",
			pipeDelimited: "|"
		}[options.style] || ",";
		const final = (options.allowReserved === true ? value : value.map((v) => encodeURIComponent(v))).join(joiner2);
		switch (options.style) {
			case "simple": return final;
			case "label": return `.${final}`;
			case "matrix": return `;${name}=${final}`;
			default: return `${name}=${final}`;
		}
	}
	const joiner = {
		simple: ",",
		label: ".",
		matrix: ";"
	}[options.style] || "&";
	const values = [];
	for (const v of value) if (options.style === "simple" || options.style === "label") values.push(options.allowReserved === true ? v : encodeURIComponent(v));
	else values.push(serializePrimitiveParam(name, v, options));
	return options.style === "label" || options.style === "matrix" ? `${joiner}${values.join(joiner)}` : values.join(joiner);
}
function createQuerySerializer(options) {
	return function querySerializer(queryParams) {
		const search = [];
		if (queryParams && typeof queryParams === "object") for (const name in queryParams) {
			const value = queryParams[name];
			if (value === void 0 || value === null) continue;
			if (Array.isArray(value)) {
				if (value.length === 0) continue;
				search.push(serializeArrayParam(name, value, {
					style: "form",
					explode: true,
					...options?.array,
					allowReserved: options?.allowReserved || false
				}));
				continue;
			}
			if (typeof value === "object") {
				search.push(serializeObjectParam(name, value, {
					style: "deepObject",
					explode: true,
					...options?.object,
					allowReserved: options?.allowReserved || false
				}));
				continue;
			}
			search.push(serializePrimitiveParam(name, value, options));
		}
		return search.join("&");
	};
}
function defaultPathSerializer(pathname, pathParams) {
	let nextURL = pathname;
	for (const match of pathname.match(PATH_PARAM_RE) ?? []) {
		let name = match.substring(1, match.length - 1);
		let explode = false;
		let style = "simple";
		if (name.endsWith("*")) {
			explode = true;
			name = name.substring(0, name.length - 1);
		}
		if (name.startsWith(".")) {
			style = "label";
			name = name.substring(1);
		} else if (name.startsWith(";")) {
			style = "matrix";
			name = name.substring(1);
		}
		if (!pathParams || pathParams[name] === void 0 || pathParams[name] === null) continue;
		const value = pathParams[name];
		if (Array.isArray(value)) {
			nextURL = nextURL.replace(match, serializeArrayParam(name, value, {
				style,
				explode
			}));
			continue;
		}
		if (typeof value === "object") {
			nextURL = nextURL.replace(match, serializeObjectParam(name, value, {
				style,
				explode
			}));
			continue;
		}
		if (style === "matrix") {
			nextURL = nextURL.replace(match, `;${serializePrimitiveParam(name, value)}`);
			continue;
		}
		nextURL = nextURL.replace(match, style === "label" ? `.${encodeURIComponent(value)}` : encodeURIComponent(value));
	}
	return nextURL;
}
function defaultBodySerializer(body, headers) {
	if (body instanceof FormData) return body;
	if (headers) {
		if ((headers.get instanceof Function ? headers.get("Content-Type") ?? headers.get("content-type") : headers["Content-Type"] ?? headers["content-type"]) === "application/x-www-form-urlencoded") return new URLSearchParams(body).toString();
	}
	return JSON.stringify(body);
}
function createFinalURL(pathname, options) {
	let finalURL = `${options.baseUrl}${pathname}`;
	if (options.params?.path) finalURL = defaultPathSerializer(finalURL, options.params.path);
	let search = options.querySerializer(options.params.query ?? {});
	if (search.startsWith("?")) search = search.substring(1);
	if (search) finalURL += `?${search}`;
	return finalURL;
}
function mergeHeaders(...allHeaders) {
	const finalHeaders = new Headers();
	for (const h of allHeaders) {
		if (!h || typeof h !== "object") continue;
		const iterator = h instanceof Headers ? h.entries() : Object.entries(h);
		for (const [k, v] of iterator) if (v === null) finalHeaders.delete(k);
		else if (Array.isArray(v)) for (const v2 of v) finalHeaders.append(k, v2);
		else if (v !== void 0) finalHeaders.set(k, v);
	}
	return finalHeaders;
}
function removeTrailingSlash(url) {
	if (url.endsWith("/")) return url.substring(0, url.length - 1);
	return url;
}
//#endregion
//#region ../../node_modules/platform/platform.js
var require_platform = /* @__PURE__ */ require_chunk.__commonJSMin(((exports, module) => {
	(function() {
		"use strict";
		/** Used to determine if values are of the language type `Object`. */
		var objectTypes = {
			"function": true,
			"object": true
		};
		/** Used as a reference to the global object. */
		var root = objectTypes[typeof window] && window || this;
		/** Detect free variable `exports`. */
		var freeExports = objectTypes[typeof exports] && exports;
		/** Detect free variable `module`. */
		var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;
		/** Detect free variable `global` from Node.js or Browserified code and use it as `root`. */
		var freeGlobal = freeExports && freeModule && typeof global == "object" && global;
		if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal)) root = freeGlobal;
		/**
		* Used as the maximum length of an array-like object.
		* See the [ES6 spec](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength)
		* for more details.
		*/
		var maxSafeInteger = Math.pow(2, 53) - 1;
		/** Regular expression to detect Opera. */
		var reOpera = /\bOpera/;
		/** Used for native method references. */
		var objectProto = Object.prototype;
		/** Used to check for own properties of an object. */
		var hasOwnProperty = objectProto.hasOwnProperty;
		/** Used to resolve the internal `[[Class]]` of values. */
		var toString = objectProto.toString;
		/**
		* Capitalizes a string value.
		*
		* @private
		* @param {string} string The string to capitalize.
		* @returns {string} The capitalized string.
		*/
		function capitalize(string) {
			string = String(string);
			return string.charAt(0).toUpperCase() + string.slice(1);
		}
		/**
		* A utility function to clean up the OS name.
		*
		* @private
		* @param {string} os The OS name to clean up.
		* @param {string} [pattern] A `RegExp` pattern matching the OS name.
		* @param {string} [label] A label for the OS.
		*/
		function cleanupOS(os, pattern, label) {
			var data = {
				"10.0": "10",
				"6.4": "10 Technical Preview",
				"6.3": "8.1",
				"6.2": "8",
				"6.1": "Server 2008 R2 / 7",
				"6.0": "Server 2008 / Vista",
				"5.2": "Server 2003 / XP 64-bit",
				"5.1": "XP",
				"5.01": "2000 SP1",
				"5.0": "2000",
				"4.0": "NT",
				"4.90": "ME"
			};
			if (pattern && label && /^Win/i.test(os) && !/^Windows Phone /i.test(os) && (data = data[/[\d.]+$/.exec(os)])) os = "Windows " + data;
			os = String(os);
			if (pattern && label) os = os.replace(RegExp(pattern, "i"), label);
			os = format(os.replace(/ ce$/i, " CE").replace(/\bhpw/i, "web").replace(/\bMacintosh\b/, "Mac OS").replace(/_PowerPC\b/i, " OS").replace(/\b(OS X) [^ \d]+/i, "$1").replace(/\bMac (OS X)\b/, "$1").replace(/\/(\d)/, " $1").replace(/_/g, ".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "").replace(/\bx86\.64\b/gi, "x86_64").replace(/\b(Windows Phone) OS\b/, "$1").replace(/\b(Chrome OS \w+) [\d.]+\b/, "$1").split(" on ")[0]);
			return os;
		}
		/**
		* An iteration utility for arrays and objects.
		*
		* @private
		* @param {Array|Object} object The object to iterate over.
		* @param {Function} callback The function called per iteration.
		*/
		function each(object, callback) {
			var index = -1, length = object ? object.length : 0;
			if (typeof length == "number" && length > -1 && length <= maxSafeInteger) while (++index < length) callback(object[index], index, object);
			else forOwn(object, callback);
		}
		/**
		* Trim and conditionally capitalize string values.
		*
		* @private
		* @param {string} string The string to format.
		* @returns {string} The formatted string.
		*/
		function format(string) {
			string = trim(string);
			return /^(?:webOS|i(?:OS|P))/.test(string) ? string : capitalize(string);
		}
		/**
		* Iterates over an object's own properties, executing the `callback` for each.
		*
		* @private
		* @param {Object} object The object to iterate over.
		* @param {Function} callback The function executed per own property.
		*/
		function forOwn(object, callback) {
			for (var key in object) if (hasOwnProperty.call(object, key)) callback(object[key], key, object);
		}
		/**
		* Gets the internal `[[Class]]` of a value.
		*
		* @private
		* @param {*} value The value.
		* @returns {string} The `[[Class]]`.
		*/
		function getClassOf(value) {
			return value == null ? capitalize(value) : toString.call(value).slice(8, -1);
		}
		/**
		* Host objects can return type values that are different from their actual
		* data type. The objects we are concerned with usually return non-primitive
		* types of "object", "function", or "unknown".
		*
		* @private
		* @param {*} object The owner of the property.
		* @param {string} property The property to check.
		* @returns {boolean} Returns `true` if the property value is a non-primitive, else `false`.
		*/
		function isHostType(object, property) {
			var type = object != null ? typeof object[property] : "number";
			return !/^(?:boolean|number|string|undefined)$/.test(type) && (type == "object" ? !!object[property] : true);
		}
		/**
		* Prepares a string for use in a `RegExp` by making hyphens and spaces optional.
		*
		* @private
		* @param {string} string The string to qualify.
		* @returns {string} The qualified string.
		*/
		function qualify(string) {
			return String(string).replace(/([ -])(?!$)/g, "$1?");
		}
		/**
		* A bare-bones `Array#reduce` like utility function.
		*
		* @private
		* @param {Array} array The array to iterate over.
		* @param {Function} callback The function called per iteration.
		* @returns {*} The accumulated result.
		*/
		function reduce(array, callback) {
			var accumulator = null;
			each(array, function(value, index) {
				accumulator = callback(accumulator, value, index, array);
			});
			return accumulator;
		}
		/**
		* Removes leading and trailing whitespace from a string.
		*
		* @private
		* @param {string} string The string to trim.
		* @returns {string} The trimmed string.
		*/
		function trim(string) {
			return String(string).replace(/^ +| +$/g, "");
		}
		/**
		* Creates a new platform object.
		*
		* @memberOf platform
		* @param {Object|string} [ua=navigator.userAgent] The user agent string or
		*  context object.
		* @returns {Object} A platform object.
		*/
		function parse(ua) {
			/** The environment context object. */
			var context = root;
			/** Used to flag when a custom context is provided. */
			var isCustomContext = ua && typeof ua == "object" && getClassOf(ua) != "String";
			if (isCustomContext) {
				context = ua;
				ua = null;
			}
			/** Browser navigator object. */
			var nav = context.navigator || {};
			/** Browser user agent string. */
			var userAgent = nav.userAgent || "";
			ua || (ua = userAgent);
			/** Used to detect if browser is like Chrome. */
			var likeChrome = isCustomContext ? !!nav.likeChrome : /\bChrome\b/.test(ua) && !/internal|\n/i.test(toString.toString());
			/** Internal `[[Class]]` value shortcuts. */
			var objectClass = "Object", airRuntimeClass = isCustomContext ? objectClass : "ScriptBridgingProxyObject", enviroClass = isCustomContext ? objectClass : "Environment", javaClass = isCustomContext && context.java ? "JavaPackage" : getClassOf(context.java), phantomClass = isCustomContext ? objectClass : "RuntimeObject";
			/** Detect Java environments. */
			var java = /\bJava/.test(javaClass) && context.java;
			/** Detect Rhino. */
			var rhino = java && getClassOf(context.environment) == enviroClass;
			/** A character to represent alpha. */
			var alpha = java ? "a" : "α";
			/** A character to represent beta. */
			var beta = java ? "b" : "β";
			/** Browser document object. */
			var doc = context.document || {};
			/**
			* Detect Opera browser (Presto-based).
			* http://www.howtocreate.co.uk/operaStuff/operaObject.html
			* http://dev.opera.com/articles/view/opera-mini-web-content-authoring-guidelines/#operamini
			*/
			var opera = context.operamini || context.opera;
			/** Opera `[[Class]]`. */
			var operaClass = reOpera.test(operaClass = isCustomContext && opera ? opera["[[Class]]"] : getClassOf(opera)) ? operaClass : opera = null;
			/** Temporary variable used over the script's lifetime. */
			var data;
			/** The CPU architecture. */
			var arch = ua;
			/** Platform description array. */
			var description = [];
			/** Platform alpha/beta indicator. */
			var prerelease = null;
			/** A flag to indicate that environment features should be used to resolve the platform. */
			var useFeatures = ua == userAgent;
			/** The browser/environment version. */
			var version = useFeatures && opera && typeof opera.version == "function" && opera.version();
			/** A flag to indicate if the OS ends with "/ Version" */
			var isSpecialCasedOS;
			var layout = getLayout([
				{
					"label": "EdgeHTML",
					"pattern": "Edge"
				},
				"Trident",
				{
					"label": "WebKit",
					"pattern": "AppleWebKit"
				},
				"iCab",
				"Presto",
				"NetFront",
				"Tasman",
				"KHTML",
				"Gecko"
			]);
			var name = getName([
				"Adobe AIR",
				"Arora",
				"Avant Browser",
				"Breach",
				"Camino",
				"Electron",
				"Epiphany",
				"Fennec",
				"Flock",
				"Galeon",
				"GreenBrowser",
				"iCab",
				"Iceweasel",
				"K-Meleon",
				"Konqueror",
				"Lunascape",
				"Maxthon",
				{
					"label": "Microsoft Edge",
					"pattern": "(?:Edge|Edg|EdgA|EdgiOS)"
				},
				"Midori",
				"Nook Browser",
				"PaleMoon",
				"PhantomJS",
				"Raven",
				"Rekonq",
				"RockMelt",
				{
					"label": "Samsung Internet",
					"pattern": "SamsungBrowser"
				},
				"SeaMonkey",
				{
					"label": "Silk",
					"pattern": "(?:Cloud9|Silk-Accelerated)"
				},
				"Sleipnir",
				"SlimBrowser",
				{
					"label": "SRWare Iron",
					"pattern": "Iron"
				},
				"Sunrise",
				"Swiftfox",
				"Vivaldi",
				"Waterfox",
				"WebPositive",
				{
					"label": "Yandex Browser",
					"pattern": "YaBrowser"
				},
				{
					"label": "UC Browser",
					"pattern": "UCBrowser"
				},
				"Opera Mini",
				{
					"label": "Opera Mini",
					"pattern": "OPiOS"
				},
				"Opera",
				{
					"label": "Opera",
					"pattern": "OPR"
				},
				"Chromium",
				"Chrome",
				{
					"label": "Chrome",
					"pattern": "(?:HeadlessChrome)"
				},
				{
					"label": "Chrome Mobile",
					"pattern": "(?:CriOS|CrMo)"
				},
				{
					"label": "Firefox",
					"pattern": "(?:Firefox|Minefield)"
				},
				{
					"label": "Firefox for iOS",
					"pattern": "FxiOS"
				},
				{
					"label": "IE",
					"pattern": "IEMobile"
				},
				{
					"label": "IE",
					"pattern": "MSIE"
				},
				"Safari"
			]);
			var product = getProduct([
				{
					"label": "BlackBerry",
					"pattern": "BB10"
				},
				"BlackBerry",
				{
					"label": "Galaxy S",
					"pattern": "GT-I9000"
				},
				{
					"label": "Galaxy S2",
					"pattern": "GT-I9100"
				},
				{
					"label": "Galaxy S3",
					"pattern": "GT-I9300"
				},
				{
					"label": "Galaxy S4",
					"pattern": "GT-I9500"
				},
				{
					"label": "Galaxy S5",
					"pattern": "SM-G900"
				},
				{
					"label": "Galaxy S6",
					"pattern": "SM-G920"
				},
				{
					"label": "Galaxy S6 Edge",
					"pattern": "SM-G925"
				},
				{
					"label": "Galaxy S7",
					"pattern": "SM-G930"
				},
				{
					"label": "Galaxy S7 Edge",
					"pattern": "SM-G935"
				},
				"Google TV",
				"Lumia",
				"iPad",
				"iPod",
				"iPhone",
				"Kindle",
				{
					"label": "Kindle Fire",
					"pattern": "(?:Cloud9|Silk-Accelerated)"
				},
				"Nexus",
				"Nook",
				"PlayBook",
				"PlayStation Vita",
				"PlayStation",
				"TouchPad",
				"Transformer",
				{
					"label": "Wii U",
					"pattern": "WiiU"
				},
				"Wii",
				"Xbox One",
				{
					"label": "Xbox 360",
					"pattern": "Xbox"
				},
				"Xoom"
			]);
			var manufacturer = getManufacturer({
				"Apple": {
					"iPad": 1,
					"iPhone": 1,
					"iPod": 1
				},
				"Alcatel": {},
				"Archos": {},
				"Amazon": {
					"Kindle": 1,
					"Kindle Fire": 1
				},
				"Asus": { "Transformer": 1 },
				"Barnes & Noble": { "Nook": 1 },
				"BlackBerry": { "PlayBook": 1 },
				"Google": {
					"Google TV": 1,
					"Nexus": 1
				},
				"HP": { "TouchPad": 1 },
				"HTC": {},
				"Huawei": {},
				"Lenovo": {},
				"LG": {},
				"Microsoft": {
					"Xbox": 1,
					"Xbox One": 1
				},
				"Motorola": { "Xoom": 1 },
				"Nintendo": {
					"Wii U": 1,
					"Wii": 1
				},
				"Nokia": { "Lumia": 1 },
				"Oppo": {},
				"Samsung": {
					"Galaxy S": 1,
					"Galaxy S2": 1,
					"Galaxy S3": 1,
					"Galaxy S4": 1
				},
				"Sony": {
					"PlayStation": 1,
					"PlayStation Vita": 1
				},
				"Xiaomi": {
					"Mi": 1,
					"Redmi": 1
				}
			});
			var os = getOS([
				"Windows Phone",
				"KaiOS",
				"Android",
				"CentOS",
				{
					"label": "Chrome OS",
					"pattern": "CrOS"
				},
				"Debian",
				{
					"label": "DragonFly BSD",
					"pattern": "DragonFly"
				},
				"Fedora",
				"FreeBSD",
				"Gentoo",
				"Haiku",
				"Kubuntu",
				"Linux Mint",
				"OpenBSD",
				"Red Hat",
				"SuSE",
				"Ubuntu",
				"Xubuntu",
				"Cygwin",
				"Symbian OS",
				"hpwOS",
				"webOS ",
				"webOS",
				"Tablet OS",
				"Tizen",
				"Linux",
				"Mac OS X",
				"Macintosh",
				"Mac",
				"Windows 98;",
				"Windows "
			]);
			/**
			* Picks the layout engine from an array of guesses.
			*
			* @private
			* @param {Array} guesses An array of guesses.
			* @returns {null|string} The detected layout engine.
			*/
			function getLayout(guesses) {
				return reduce(guesses, function(result, guess) {
					return result || RegExp("\\b" + (guess.pattern || qualify(guess)) + "\\b", "i").exec(ua) && (guess.label || guess);
				});
			}
			/**
			* Picks the manufacturer from an array of guesses.
			*
			* @private
			* @param {Array} guesses An object of guesses.
			* @returns {null|string} The detected manufacturer.
			*/
			function getManufacturer(guesses) {
				return reduce(guesses, function(result, value, key) {
					return result || (value[product] || value[/^[a-z]+(?: +[a-z]+\b)*/i.exec(product)] || RegExp("\\b" + qualify(key) + "(?:\\b|\\w*\\d)", "i").exec(ua)) && key;
				});
			}
			/**
			* Picks the browser name from an array of guesses.
			*
			* @private
			* @param {Array} guesses An array of guesses.
			* @returns {null|string} The detected browser name.
			*/
			function getName(guesses) {
				return reduce(guesses, function(result, guess) {
					return result || RegExp("\\b" + (guess.pattern || qualify(guess)) + "\\b", "i").exec(ua) && (guess.label || guess);
				});
			}
			/**
			* Picks the OS name from an array of guesses.
			*
			* @private
			* @param {Array} guesses An array of guesses.
			* @returns {null|string} The detected OS name.
			*/
			function getOS(guesses) {
				return reduce(guesses, function(result, guess) {
					var pattern = guess.pattern || qualify(guess);
					if (!result && (result = RegExp("\\b" + pattern + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(ua))) result = cleanupOS(result, pattern, guess.label || guess);
					return result;
				});
			}
			/**
			* Picks the product name from an array of guesses.
			*
			* @private
			* @param {Array} guesses An array of guesses.
			* @returns {null|string} The detected product name.
			*/
			function getProduct(guesses) {
				return reduce(guesses, function(result, guess) {
					var pattern = guess.pattern || qualify(guess);
					if (!result && (result = RegExp("\\b" + pattern + " *\\d+[.\\w_]*", "i").exec(ua) || RegExp("\\b" + pattern + " *\\w+-[\\w]*", "i").exec(ua) || RegExp("\\b" + pattern + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec(ua))) {
						if ((result = String(guess.label && !RegExp(pattern, "i").test(guess.label) ? guess.label : result).split("/"))[1] && !/[\d.]+/.test(result[0])) result[0] += " " + result[1];
						guess = guess.label || guess;
						result = format(result[0].replace(RegExp(pattern, "i"), guess).replace(RegExp("; *(?:" + guess + "[_-])?", "i"), " ").replace(RegExp("(" + guess + ")[-_.]?(\\w)", "i"), "$1 $2"));
					}
					return result;
				});
			}
			/**
			* Resolves the version using an array of UA patterns.
			*
			* @private
			* @param {Array} patterns An array of UA patterns.
			* @returns {null|string} The detected version.
			*/
			function getVersion(patterns) {
				return reduce(patterns, function(result, pattern) {
					return result || (RegExp(pattern + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i").exec(ua) || 0)[1] || null;
				});
			}
			/**
			* Returns `platform.description` when the platform object is coerced to a string.
			*
			* @name toString
			* @memberOf platform
			* @returns {string} Returns `platform.description` if available, else an empty string.
			*/
			function toStringPlatform() {
				return this.description || "";
			}
			layout && (layout = [layout]);
			if (/\bAndroid\b/.test(os) && !product && (data = /\bAndroid[^;]*;(.*?)(?:Build|\) AppleWebKit)\b/i.exec(ua))) product = trim(data[1]).replace(/^[a-z]{2}-[a-z]{2};\s*/i, "") || null;
			if (manufacturer && !product) product = getProduct([manufacturer]);
			else if (manufacturer && product) product = product.replace(RegExp("^(" + qualify(manufacturer) + ")[-_.\\s]", "i"), manufacturer + " ").replace(RegExp("^(" + qualify(manufacturer) + ")[-_.]?(\\w)", "i"), manufacturer + " $2");
			if (data = /\bGoogle TV\b/.exec(product)) product = data[0];
			if (/\bSimulator\b/i.test(ua)) product = (product ? product + " " : "") + "Simulator";
			if (name == "Opera Mini" && /\bOPiOS\b/.test(ua)) description.push("running in Turbo/Uncompressed mode");
			if (name == "IE" && /\blike iPhone OS\b/.test(ua)) {
				data = parse(ua.replace(/like iPhone OS/, ""));
				manufacturer = data.manufacturer;
				product = data.product;
			} else if (/^iP/.test(product)) {
				name || (name = "Safari");
				os = "iOS" + ((data = / OS ([\d_]+)/i.exec(ua)) ? " " + data[1].replace(/_/g, ".") : "");
			} else if (name == "Konqueror" && /^Linux\b/i.test(os)) os = "Kubuntu";
			else if (manufacturer && manufacturer != "Google" && (/Chrome/.test(name) && !/\bMobile Safari\b/i.test(ua) || /\bVita\b/.test(product)) || /\bAndroid\b/.test(os) && /^Chrome/.test(name) && /\bVersion\//i.test(ua)) {
				name = "Android Browser";
				os = /\bAndroid\b/.test(os) ? os : "Android";
			} else if (name == "Silk") {
				if (!/\bMobi/i.test(ua)) {
					os = "Android";
					description.unshift("desktop mode");
				}
				if (/Accelerated *= *true/i.test(ua)) description.unshift("accelerated");
			} else if (name == "UC Browser" && /\bUCWEB\b/.test(ua)) description.push("speed mode");
			else if (name == "PaleMoon" && (data = /\bFirefox\/([\d.]+)\b/.exec(ua))) description.push("identifying as Firefox " + data[1]);
			else if (name == "Firefox" && (data = /\b(Mobile|Tablet|TV)\b/i.exec(ua))) {
				os || (os = "Firefox OS");
				product || (product = data[1]);
			} else if (!name || (data = !/\bMinefield\b/i.test(ua) && /\b(?:Firefox|Safari)\b/.exec(name))) {
				if (name && !product && /[\/,]|^[^(]+?\)/.test(ua.slice(ua.indexOf(data + "/") + 8))) name = null;
				if ((data = product || manufacturer || os) && (product || manufacturer || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(os))) name = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(os) ? os : data) + " Browser";
			} else if (name == "Electron" && (data = (/\bChrome\/([\d.]+)\b/.exec(ua) || 0)[1])) description.push("Chromium " + data);
			if (!version) version = getVersion([
				"(?:Cloud9|CriOS|CrMo|Edge|Edg|EdgA|EdgiOS|FxiOS|HeadlessChrome|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$)|UCBrowser|YaBrowser)",
				"Version",
				qualify(name),
				"(?:Firefox|Minefield|NetFront)"
			]);
			if (data = layout == "iCab" && parseFloat(version) > 3 && "WebKit" || /\bOpera\b/.test(name) && (/\bOPR\b/.test(ua) ? "Blink" : "Presto") || /\b(?:Midori|Nook|Safari)\b/i.test(ua) && !/^(?:Trident|EdgeHTML)$/.test(layout) && "WebKit" || !layout && /\bMSIE\b/i.test(ua) && (os == "Mac OS" ? "Tasman" : "Trident") || layout == "WebKit" && /\bPlayStation\b(?! Vita\b)/i.test(name) && "NetFront") layout = [data];
			if (name == "IE" && (data = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(ua) || 0)[1])) {
				name += " Mobile";
				os = "Windows Phone " + (/\+$/.test(data) ? data : data + ".x");
				description.unshift("desktop mode");
			} else if (/\bWPDesktop\b/i.test(ua)) {
				name = "IE Mobile";
				os = "Windows Phone 8.x";
				description.unshift("desktop mode");
				version || (version = (/\brv:([\d.]+)/.exec(ua) || 0)[1]);
			} else if (name != "IE" && layout == "Trident" && (data = /\brv:([\d.]+)/.exec(ua))) {
				if (name) description.push("identifying as " + name + (version ? " " + version : ""));
				name = "IE";
				version = data[1];
			}
			if (useFeatures) {
				if (isHostType(context, "global")) {
					if (java) {
						data = java.lang.System;
						arch = data.getProperty("os.arch");
						os = os || data.getProperty("os.name") + " " + data.getProperty("os.version");
					}
					if (rhino) {
						try {
							version = context.require("ringo/engine").version.join(".");
							name = "RingoJS";
						} catch (e) {
							if ((data = context.system) && data.global.system == context.system) {
								name = "Narwhal";
								os || (os = data[0].os || null);
							}
						}
						if (!name) name = "Rhino";
					} else if (typeof context.process == "object" && !context.process.browser && (data = context.process)) {
						if (typeof data.versions == "object") {
							if (typeof data.versions.electron == "string") {
								description.push("Node " + data.versions.node);
								name = "Electron";
								version = data.versions.electron;
							} else if (typeof data.versions.nw == "string") {
								description.push("Chromium " + version, "Node " + data.versions.node);
								name = "NW.js";
								version = data.versions.nw;
							}
						}
						if (!name) {
							name = "Node.js";
							arch = data.arch;
							os = data.platform;
							version = /[\d.]+/.exec(data.version);
							version = version ? version[0] : null;
						}
					}
				} else if (getClassOf(data = context.runtime) == airRuntimeClass) {
					name = "Adobe AIR";
					os = data.flash.system.Capabilities.os;
				} else if (getClassOf(data = context.phantom) == phantomClass) {
					name = "PhantomJS";
					version = (data = data.version || null) && data.major + "." + data.minor + "." + data.patch;
				} else if (typeof doc.documentMode == "number" && (data = /\bTrident\/(\d+)/i.exec(ua))) {
					version = [version, doc.documentMode];
					if ((data = +data[1] + 4) != version[1]) {
						description.push("IE " + version[1] + " mode");
						layout && (layout[1] = "");
						version[1] = data;
					}
					version = name == "IE" ? String(version[1].toFixed(1)) : version[0];
				} else if (typeof doc.documentMode == "number" && /^(?:Chrome|Firefox)\b/.test(name)) {
					description.push("masking as " + name + " " + version);
					name = "IE";
					version = "11.0";
					layout = ["Trident"];
					os = "Windows";
				}
				os = os && format(os);
			}
			if (version && (data = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(version) || /(?:alpha|beta)(?: ?\d)?/i.exec(ua + ";" + (useFeatures && nav.appMinorVersion)) || /\bMinefield\b/i.test(ua) && "a")) {
				prerelease = /b/i.test(data) ? "beta" : "alpha";
				version = version.replace(RegExp(data + "\\+?$"), "") + (prerelease == "beta" ? beta : alpha) + (/\d+\+?/.exec(data) || "");
			}
			if (name == "Fennec" || name == "Firefox" && /\b(?:Android|Firefox OS|KaiOS)\b/.test(os)) name = "Firefox Mobile";
			else if (name == "Maxthon" && version) version = version.replace(/\.[\d.]+/, ".x");
			else if (/\bXbox\b/i.test(product)) {
				if (product == "Xbox 360") os = null;
				if (product == "Xbox 360" && /\bIEMobile\b/.test(ua)) description.unshift("mobile mode");
			} else if ((/^(?:Chrome|IE|Opera)$/.test(name) || name && !product && !/Browser|Mobi/.test(name)) && (os == "Windows CE" || /Mobi/i.test(ua))) name += " Mobile";
			else if (name == "IE" && useFeatures) try {
				if (context.external === null) description.unshift("platform preview");
			} catch (e) {
				description.unshift("embedded");
			}
			else if ((/\bBlackBerry\b/.test(product) || /\bBB10\b/.test(ua)) && (data = (RegExp(product.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(ua) || 0)[1] || version)) {
				data = [data, /BB10/.test(ua)];
				os = (data[1] ? (product = null, manufacturer = "BlackBerry") : "Device Software") + " " + data[0];
				version = null;
			} else if (this != forOwn && product != "Wii" && (useFeatures && opera || /Opera/.test(name) && /\b(?:MSIE|Firefox)\b/i.test(ua) || name == "Firefox" && /\bOS X (?:\d+\.){2,}/.test(os) || name == "IE" && (os && !/^Win/.test(os) && version > 5.5 || /\bWindows XP\b/.test(os) && version > 8 || version == 8 && !/\bTrident\b/.test(ua))) && !reOpera.test(data = parse.call(forOwn, ua.replace(reOpera, "") + ";")) && data.name) {
				data = "ing as " + data.name + ((data = data.version) ? " " + data : "");
				if (reOpera.test(name)) {
					if (/\bIE\b/.test(data) && os == "Mac OS") os = null;
					data = "identify" + data;
				} else {
					data = "mask" + data;
					if (operaClass) name = format(operaClass.replace(/([a-z])([A-Z])/g, "$1 $2"));
					else name = "Opera";
					if (/\bIE\b/.test(data)) os = null;
					if (!useFeatures) version = null;
				}
				layout = ["Presto"];
				description.push(data);
			}
			if (data = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(ua) || 0)[1]) {
				data = [parseFloat(data.replace(/\.(\d)$/, ".0$1")), data];
				if (name == "Safari" && data[1].slice(-1) == "+") {
					name = "WebKit Nightly";
					prerelease = "alpha";
					version = data[1].slice(0, -1);
				} else if (version == data[1] || version == (data[2] = (/\bSafari\/([\d.]+\+?)/i.exec(ua) || 0)[1])) version = null;
				data[1] = (/\b(?:Headless)?Chrome\/([\d.]+)/i.exec(ua) || 0)[1];
				if (data[0] == 537.36 && data[2] == 537.36 && parseFloat(data[1]) >= 28 && layout == "WebKit") layout = ["Blink"];
				if (!useFeatures || !likeChrome && !data[1]) {
					layout && (layout[1] = "like Safari");
					data = (data = data[0], data < 400 ? 1 : data < 500 ? 2 : data < 526 ? 3 : data < 533 ? 4 : data < 534 ? "4+" : data < 535 ? 5 : data < 537 ? 6 : data < 538 ? 7 : data < 601 ? 8 : data < 602 ? 9 : data < 604 ? 10 : data < 606 ? 11 : data < 608 ? 12 : "12");
				} else {
					layout && (layout[1] = "like Chrome");
					data = data[1] || (data = data[0], data < 530 ? 1 : data < 532 ? 2 : data < 532.05 ? 3 : data < 533 ? 4 : data < 534.03 ? 5 : data < 534.07 ? 6 : data < 534.1 ? 7 : data < 534.13 ? 8 : data < 534.16 ? 9 : data < 534.24 ? 10 : data < 534.3 ? 11 : data < 535.01 ? 12 : data < 535.02 ? "13+" : data < 535.07 ? 15 : data < 535.11 ? 16 : data < 535.19 ? 17 : data < 536.05 ? 18 : data < 536.1 ? 19 : data < 537.01 ? 20 : data < 537.11 ? "21+" : data < 537.13 ? 23 : data < 537.18 ? 24 : data < 537.24 ? 25 : data < 537.36 ? 26 : layout != "Blink" ? "27" : "28");
				}
				layout && (layout[1] += " " + (data += typeof data == "number" ? ".x" : /[.+]/.test(data) ? "" : "+"));
				if (name == "Safari" && (!version || parseInt(version) > 45)) version = data;
				else if (name == "Chrome" && /\bHeadlessChrome/i.test(ua)) description.unshift("headless");
			}
			if (name == "Opera" && (data = /\bzbov|zvav$/.exec(os))) {
				name += " ";
				description.unshift("desktop mode");
				if (data == "zvav") {
					name += "Mini";
					version = null;
				} else name += "Mobile";
				os = os.replace(RegExp(" *" + data + "$"), "");
			} else if (name == "Safari" && /\bChrome\b/.exec(layout && layout[1])) {
				description.unshift("desktop mode");
				name = "Chrome Mobile";
				version = null;
				if (/\bOS X\b/.test(os)) {
					manufacturer = "Apple";
					os = "iOS 4.3+";
				} else os = null;
			} else if (/\bSRWare Iron\b/.test(name) && !version) version = getVersion("Chrome");
			if (version && version.indexOf(data = /[\d.]+$/.exec(os)) == 0 && ua.indexOf("/" + data + "-") > -1) os = trim(os.replace(data, ""));
			if (os && os.indexOf(name) != -1 && !RegExp(name + " OS").test(os)) os = os.replace(RegExp(" *" + qualify(name) + " *"), "");
			if (layout && !/\b(?:Avant|Nook)\b/.test(name) && (/Browser|Lunascape|Maxthon/.test(name) || name != "Safari" && /^iOS/.test(os) && /\bSafari\b/.test(layout[1]) || /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|SRWare Iron|Vivaldi|Web)/.test(name) && layout[1])) (data = layout[layout.length - 1]) && description.push(data);
			if (description.length) description = ["(" + description.join("; ") + ")"];
			if (manufacturer && product && product.indexOf(manufacturer) < 0) description.push("on " + manufacturer);
			if (product) description.push((/^on /.test(description[description.length - 1]) ? "" : "on ") + product);
			if (os) {
				data = / ([\d.+]+)$/.exec(os);
				isSpecialCasedOS = data && os.charAt(os.length - data[0].length - 1) == "/";
				os = {
					"architecture": 32,
					"family": data && !isSpecialCasedOS ? os.replace(data[0], "") : os,
					"version": data ? data[1] : null,
					"toString": function() {
						var version = this.version;
						return this.family + (version && !isSpecialCasedOS ? " " + version : "") + (this.architecture == 64 ? " 64-bit" : "");
					}
				};
			}
			if ((data = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(arch)) && !/\bi686\b/i.test(arch)) {
				if (os) {
					os.architecture = 64;
					os.family = os.family.replace(RegExp(" *" + data), "");
				}
				if (name && (/\bWOW64\b/i.test(ua) || useFeatures && /\w(?:86|32)$/.test(nav.cpuClass || nav.platform) && !/\bWin64; x64\b/i.test(ua))) description.unshift("32-bit");
			} else if (os && /^OS X/.test(os.family) && name == "Chrome" && parseFloat(version) >= 39) os.architecture = 64;
			ua || (ua = null);
			/**
			* The platform object.
			*
			* @name platform
			* @type Object
			*/
			var platform = {};
			/**
			* The platform description.
			*
			* @memberOf platform
			* @type string|null
			*/
			platform.description = ua;
			/**
			* The name of the browser's layout engine.
			*
			* The list of common layout engines include:
			* "Blink", "EdgeHTML", "Gecko", "Trident" and "WebKit"
			*
			* @memberOf platform
			* @type string|null
			*/
			platform.layout = layout && layout[0];
			/**
			* The name of the product's manufacturer.
			*
			* The list of manufacturers include:
			* "Apple", "Archos", "Amazon", "Asus", "Barnes & Noble", "BlackBerry",
			* "Google", "HP", "HTC", "LG", "Microsoft", "Motorola", "Nintendo",
			* "Nokia", "Samsung" and "Sony"
			*
			* @memberOf platform
			* @type string|null
			*/
			platform.manufacturer = manufacturer;
			/**
			* The name of the browser/environment.
			*
			* The list of common browser names include:
			* "Chrome", "Electron", "Firefox", "Firefox for iOS", "IE",
			* "Microsoft Edge", "PhantomJS", "Safari", "SeaMonkey", "Silk",
			* "Opera Mini" and "Opera"
			*
			* Mobile versions of some browsers have "Mobile" appended to their name:
			* eg. "Chrome Mobile", "Firefox Mobile", "IE Mobile" and "Opera Mobile"
			*
			* @memberOf platform
			* @type string|null
			*/
			platform.name = name;
			/**
			* The alpha/beta release indicator.
			*
			* @memberOf platform
			* @type string|null
			*/
			platform.prerelease = prerelease;
			/**
			* The name of the product hosting the browser.
			*
			* The list of common products include:
			*
			* "BlackBerry", "Galaxy S4", "Lumia", "iPad", "iPod", "iPhone", "Kindle",
			* "Kindle Fire", "Nexus", "Nook", "PlayBook", "TouchPad" and "Transformer"
			*
			* @memberOf platform
			* @type string|null
			*/
			platform.product = product;
			/**
			* The browser's user agent string.
			*
			* @memberOf platform
			* @type string|null
			*/
			platform.ua = ua;
			/**
			* The browser/environment version.
			*
			* @memberOf platform
			* @type string|null
			*/
			platform.version = name && version;
			/**
			* The name of the operating system.
			*
			* @memberOf platform
			* @type Object
			*/
			platform.os = os || {
				"architecture": null,
				"family": null,
				"version": null,
				"toString": function() {
					return "null";
				}
			};
			platform.parse = parse;
			platform.toString = toStringPlatform;
			if (platform.version) description.unshift(version);
			if (platform.name) description.unshift(name);
			if (os && name && !(os == String(os).split(" ")[0] && (os == name.split(" ")[0] || product))) description.push(product ? "(" + os + ")" : "on " + os);
			if (description.length) platform.description = description.join(" ");
			return platform;
		}
		var platform = parse();
		if (typeof define == "function" && typeof define.amd == "object" && define.amd) {
			root.platform = platform;
			define(function() {
				return platform;
			});
		} else if (freeExports && freeModule) forOwn(platform, function(value, key) {
			freeExports[key] = value;
		});
		else root.platform = platform;
	}).call(exports);
}));
//#endregion
//#region ../../node_modules/@connectrpc/connect/dist/esm/code.js
/**
* Connect represents categories of errors as codes, and each code maps to a
* specific HTTP status code. The codes and their semantics were chosen to
* match gRPC. Only the codes below are valid — there are no user-defined
* codes.
*
* See the specification at https://connectrpc.com/docs/protocol#error-codes
* for details.
*/
var Code;
(function(Code) {
	/**
	* Canceled, usually be the user
	*/
	Code[Code["Canceled"] = 1] = "Canceled";
	/**
	* Unknown error
	*/
	Code[Code["Unknown"] = 2] = "Unknown";
	/**
	* Argument invalid regardless of system state
	*/
	Code[Code["InvalidArgument"] = 3] = "InvalidArgument";
	/**
	* Operation expired, may or may not have completed.
	*/
	Code[Code["DeadlineExceeded"] = 4] = "DeadlineExceeded";
	/**
	* Entity not found.
	*/
	Code[Code["NotFound"] = 5] = "NotFound";
	/**
	* Entity already exists.
	*/
	Code[Code["AlreadyExists"] = 6] = "AlreadyExists";
	/**
	* Operation not authorized.
	*/
	Code[Code["PermissionDenied"] = 7] = "PermissionDenied";
	/**
	* Quota exhausted.
	*/
	Code[Code["ResourceExhausted"] = 8] = "ResourceExhausted";
	/**
	* Argument invalid in current system state.
	*/
	Code[Code["FailedPrecondition"] = 9] = "FailedPrecondition";
	/**
	* Operation aborted.
	*/
	Code[Code["Aborted"] = 10] = "Aborted";
	/**
	* Out of bounds, use instead of FailedPrecondition.
	*/
	Code[Code["OutOfRange"] = 11] = "OutOfRange";
	/**
	* Operation not implemented or disabled.
	*/
	Code[Code["Unimplemented"] = 12] = "Unimplemented";
	/**
	* Internal error, reserved for "serious errors".
	*/
	Code[Code["Internal"] = 13] = "Internal";
	/**
	* Unavailable, client should back off and retry.
	*/
	Code[Code["Unavailable"] = 14] = "Unavailable";
	/**
	* Unrecoverable data loss or corruption.
	*/
	Code[Code["DataLoss"] = 15] = "DataLoss";
	/**
	* Request isn't authenticated.
	*/
	Code[Code["Unauthenticated"] = 16] = "Unauthenticated";
})(Code || (Code = {}));
//#endregion
//#region ../../node_modules/@connectrpc/connect/node_modules/@bufbuild/protobuf/dist/esm/is-message.js
/**
* Determine whether the given `arg` is a message.
* If `desc` is set, determine whether `arg` is this specific message.
*/
function isMessage$2(arg, schema) {
	if (!(arg !== null && typeof arg == "object" && "$typeName" in arg && typeof arg.$typeName == "string")) return false;
	if (schema === void 0) return true;
	return schema.typeName === arg.$typeName;
}
//#endregion
//#region ../../node_modules/@connectrpc/connect/node_modules/@bufbuild/protobuf/dist/esm/descriptors.js
/**
* Scalar value types. This is a subset of field types declared by protobuf
* enum google.protobuf.FieldDescriptorProto.Type The types GROUP and MESSAGE
* are omitted, but the numerical values are identical.
*/
var ScalarType$2;
(function(ScalarType) {
	ScalarType[ScalarType["DOUBLE"] = 1] = "DOUBLE";
	ScalarType[ScalarType["FLOAT"] = 2] = "FLOAT";
	ScalarType[ScalarType["INT64"] = 3] = "INT64";
	ScalarType[ScalarType["UINT64"] = 4] = "UINT64";
	ScalarType[ScalarType["INT32"] = 5] = "INT32";
	ScalarType[ScalarType["FIXED64"] = 6] = "FIXED64";
	ScalarType[ScalarType["FIXED32"] = 7] = "FIXED32";
	ScalarType[ScalarType["BOOL"] = 8] = "BOOL";
	ScalarType[ScalarType["STRING"] = 9] = "STRING";
	ScalarType[ScalarType["BYTES"] = 12] = "BYTES";
	ScalarType[ScalarType["UINT32"] = 13] = "UINT32";
	ScalarType[ScalarType["SFIXED32"] = 15] = "SFIXED32";
	ScalarType[ScalarType["SFIXED64"] = 16] = "SFIXED64";
	ScalarType[ScalarType["SINT32"] = 17] = "SINT32";
	ScalarType[ScalarType["SINT64"] = 18] = "SINT64";
})(ScalarType$2 || (ScalarType$2 = {}));
//#endregion
//#region ../../node_modules/@connectrpc/connect/node_modules/@bufbuild/protobuf/dist/esm/wire/varint.js
/**
* Read a 64 bit varint as two JS numbers.
*
* Returns tuple:
* [0]: low bits
* [1]: high bits
*
* Copyright 2008 Google Inc.  All rights reserved.
*
* See https://github.com/protocolbuffers/protobuf/blob/8a71927d74a4ce34efe2d8769fda198f52d20d12/js/experimental/runtime/kernel/buffer_decoder.js#L175
*/
function varint64read$2() {
	let lowBits = 0;
	let highBits = 0;
	for (let shift = 0; shift < 28; shift += 7) {
		let b = this.buf[this.pos++];
		lowBits |= (b & 127) << shift;
		if ((b & 128) == 0) {
			this.assertBounds();
			return [lowBits, highBits];
		}
	}
	let middleByte = this.buf[this.pos++];
	lowBits |= (middleByte & 15) << 28;
	highBits = (middleByte & 112) >> 4;
	if ((middleByte & 128) == 0) {
		this.assertBounds();
		return [lowBits, highBits];
	}
	for (let shift = 3; shift <= 31; shift += 7) {
		let b = this.buf[this.pos++];
		highBits |= (b & 127) << shift;
		if ((b & 128) == 0) {
			this.assertBounds();
			return [lowBits, highBits];
		}
	}
	throw new Error("invalid varint");
}
/**
* Write a 64 bit varint, given as two JS numbers, to the given bytes array.
*
* Copyright 2008 Google Inc.  All rights reserved.
*
* See https://github.com/protocolbuffers/protobuf/blob/8a71927d74a4ce34efe2d8769fda198f52d20d12/js/experimental/runtime/kernel/writer.js#L344
*/
function varint64write$1(lo, hi, bytes) {
	for (let i = 0; i < 28; i = i + 7) {
		const shift = lo >>> i;
		const hasNext = !(shift >>> 7 == 0 && hi == 0);
		const byte = (hasNext ? shift | 128 : shift) & 255;
		bytes.push(byte);
		if (!hasNext) return;
	}
	const splitBits = lo >>> 28 & 15 | (hi & 7) << 4;
	const hasMoreBits = !(hi >> 3 == 0);
	bytes.push((hasMoreBits ? splitBits | 128 : splitBits) & 255);
	if (!hasMoreBits) return;
	for (let i = 3; i < 31; i = i + 7) {
		const shift = hi >>> i;
		const hasNext = !(shift >>> 7 == 0);
		const byte = (hasNext ? shift | 128 : shift) & 255;
		bytes.push(byte);
		if (!hasNext) return;
	}
	bytes.push(hi >>> 31 & 1);
}
var TWO_PWR_32_DBL$2 = 4294967296;
/**
* Parse decimal string of 64 bit integer value as two JS numbers.
*
* Copyright 2008 Google Inc.  All rights reserved.
*
* See https://github.com/protocolbuffers/protobuf-javascript/blob/a428c58273abad07c66071d9753bc4d1289de426/experimental/runtime/int64.js#L10
*/
function int64FromString$2(dec) {
	const minus = dec[0] === "-";
	if (minus) dec = dec.slice(1);
	const base = 1e6;
	let lowBits = 0;
	let highBits = 0;
	function add1e6digit(begin, end) {
		const digit1e6 = Number(dec.slice(begin, end));
		highBits *= base;
		lowBits = lowBits * base + digit1e6;
		if (lowBits >= TWO_PWR_32_DBL$2) {
			highBits = highBits + (lowBits / TWO_PWR_32_DBL$2 | 0);
			lowBits = lowBits % TWO_PWR_32_DBL$2;
		}
	}
	add1e6digit(-24, -18);
	add1e6digit(-18, -12);
	add1e6digit(-12, -6);
	add1e6digit(-6);
	return minus ? negate$2(lowBits, highBits) : newBits$2(lowBits, highBits);
}
/**
* Losslessly converts a 64-bit signed integer in 32:32 split representation
* into a decimal string.
*
* Copyright 2008 Google Inc.  All rights reserved.
*
* See https://github.com/protocolbuffers/protobuf-javascript/blob/a428c58273abad07c66071d9753bc4d1289de426/experimental/runtime/int64.js#L10
*/
function int64ToString$2(lo, hi) {
	let bits = newBits$2(lo, hi);
	const negative = bits.hi & 2147483648;
	if (negative) bits = negate$2(bits.lo, bits.hi);
	const result = uInt64ToString$2(bits.lo, bits.hi);
	return negative ? "-" + result : result;
}
/**
* Losslessly converts a 64-bit unsigned integer in 32:32 split representation
* into a decimal string.
*
* Copyright 2008 Google Inc.  All rights reserved.
*
* See https://github.com/protocolbuffers/protobuf-javascript/blob/a428c58273abad07c66071d9753bc4d1289de426/experimental/runtime/int64.js#L10
*/
function uInt64ToString$2(lo, hi) {
	({lo, hi} = toUnsigned$2(lo, hi));
	if (hi <= 2097151) return String(TWO_PWR_32_DBL$2 * hi + lo);
	const low = lo & 16777215;
	const mid = (lo >>> 24 | hi << 8) & 16777215;
	const high = hi >> 16 & 65535;
	let digitA = low + mid * 6777216 + high * 6710656;
	let digitB = mid + high * 8147497;
	let digitC = high * 2;
	const base = 1e7;
	if (digitA >= base) {
		digitB += Math.floor(digitA / base);
		digitA %= base;
	}
	if (digitB >= base) {
		digitC += Math.floor(digitB / base);
		digitB %= base;
	}
	return digitC.toString() + decimalFrom1e7WithLeadingZeros$2(digitB) + decimalFrom1e7WithLeadingZeros$2(digitA);
}
function toUnsigned$2(lo, hi) {
	return {
		lo: lo >>> 0,
		hi: hi >>> 0
	};
}
function newBits$2(lo, hi) {
	return {
		lo: lo | 0,
		hi: hi | 0
	};
}
/**
* Returns two's compliment negation of input.
* @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Signed_32-bit_integers
*/
function negate$2(lowBits, highBits) {
	highBits = ~highBits;
	if (lowBits) lowBits = ~lowBits + 1;
	else highBits += 1;
	return newBits$2(lowBits, highBits);
}
/**
* Returns decimal representation of digit1e7 with leading zeros.
*/
var decimalFrom1e7WithLeadingZeros$2 = (digit1e7) => {
	const partial = String(digit1e7);
	return "0000000".slice(partial.length) + partial;
};
/**
* Write a 32 bit varint, signed or unsigned. Same as `varint64write(0, value, bytes)`
*
* Copyright 2008 Google Inc.  All rights reserved.
*
* See https://github.com/protocolbuffers/protobuf/blob/1b18833f4f2a2f681f4e4a25cdf3b0a43115ec26/js/binary/encoder.js#L144
*/
function varint32write$2(value, bytes) {
	if (value >= 0) {
		while (value > 127) {
			bytes.push(value & 127 | 128);
			value = value >>> 7;
		}
		bytes.push(value);
	} else {
		for (let i = 0; i < 9; i++) {
			bytes.push(value & 127 | 128);
			value = value >> 7;
		}
		bytes.push(1);
	}
}
/**
* Read an unsigned 32 bit varint.
*
* See https://github.com/protocolbuffers/protobuf/blob/8a71927d74a4ce34efe2d8769fda198f52d20d12/js/experimental/runtime/kernel/buffer_decoder.js#L220
*/
function varint32read$2() {
	let b = this.buf[this.pos++];
	let result = b & 127;
	if ((b & 128) == 0) {
		this.assertBounds();
		return result;
	}
	b = this.buf[this.pos++];
	result |= (b & 127) << 7;
	if ((b & 128) == 0) {
		this.assertBounds();
		return result;
	}
	b = this.buf[this.pos++];
	result |= (b & 127) << 14;
	if ((b & 128) == 0) {
		this.assertBounds();
		return result;
	}
	b = this.buf[this.pos++];
	result |= (b & 127) << 21;
	if ((b & 128) == 0) {
		this.assertBounds();
		return result;
	}
	b = this.buf[this.pos++];
	result |= (b & 15) << 28;
	for (let readBytes = 5; (b & 128) !== 0 && readBytes < 10; readBytes++) b = this.buf[this.pos++];
	if ((b & 128) != 0) throw new Error("invalid varint");
	this.assertBounds();
	return result >>> 0;
}
//#endregion
//#region ../../node_modules/@connectrpc/connect/node_modules/@bufbuild/protobuf/dist/esm/proto-int64.js
/**
* Int64Support for the current environment.
*/
var protoInt64$2 = /* @__PURE__ */ makeInt64Support$2();
function makeInt64Support$2() {
	const dv = /* @__PURE__ */ new DataView(/* @__PURE__ */ new ArrayBuffer(8));
	if (typeof BigInt === "function" && typeof dv.getBigInt64 === "function" && typeof dv.getBigUint64 === "function" && typeof dv.setBigInt64 === "function" && typeof dv.setBigUint64 === "function" && (!!globalThis.Deno || typeof process != "object" || typeof process.env != "object" || process.env.BUF_BIGINT_DISABLE !== "1")) {
		const MIN = BigInt("-9223372036854775808");
		const MAX = BigInt("9223372036854775807");
		const UMIN = BigInt("0");
		const UMAX = BigInt("18446744073709551615");
		return {
			zero: BigInt(0),
			supported: true,
			parse(value) {
				const bi = typeof value == "bigint" ? value : BigInt(value);
				if (bi > MAX || bi < MIN) throw new Error(`invalid int64: ${value}`);
				return bi;
			},
			uParse(value) {
				const bi = typeof value == "bigint" ? value : BigInt(value);
				if (bi > UMAX || bi < UMIN) throw new Error(`invalid uint64: ${value}`);
				return bi;
			},
			enc(value) {
				dv.setBigInt64(0, this.parse(value), true);
				return {
					lo: dv.getInt32(0, true),
					hi: dv.getInt32(4, true)
				};
			},
			uEnc(value) {
				dv.setBigInt64(0, this.uParse(value), true);
				return {
					lo: dv.getInt32(0, true),
					hi: dv.getInt32(4, true)
				};
			},
			dec(lo, hi) {
				dv.setInt32(0, lo, true);
				dv.setInt32(4, hi, true);
				return dv.getBigInt64(0, true);
			},
			uDec(lo, hi) {
				dv.setInt32(0, lo, true);
				dv.setInt32(4, hi, true);
				return dv.getBigUint64(0, true);
			}
		};
	}
	return {
		zero: "0",
		supported: false,
		parse(value) {
			if (typeof value != "string") value = value.toString();
			assertInt64String$2(value);
			return value;
		},
		uParse(value) {
			if (typeof value != "string") value = value.toString();
			assertUInt64String$2(value);
			return value;
		},
		enc(value) {
			if (typeof value != "string") value = value.toString();
			assertInt64String$2(value);
			return int64FromString$2(value);
		},
		uEnc(value) {
			if (typeof value != "string") value = value.toString();
			assertUInt64String$2(value);
			return int64FromString$2(value);
		},
		dec(lo, hi) {
			return int64ToString$2(lo, hi);
		},
		uDec(lo, hi) {
			return uInt64ToString$2(lo, hi);
		}
	};
}
function assertInt64String$2(value) {
	if (!/^-?[0-9]+$/.test(value)) throw new Error("invalid int64: " + value);
}
function assertUInt64String$2(value) {
	if (!/^[0-9]+$/.test(value)) throw new Error("invalid uint64: " + value);
}
//#endregion
//#region ../../node_modules/@connectrpc/connect/node_modules/@bufbuild/protobuf/dist/esm/reflect/scalar.js
/**
* Returns the zero value for the given scalar type.
*/
function scalarZeroValue$2(type, longAsString) {
	switch (type) {
		case ScalarType$2.STRING: return "";
		case ScalarType$2.BOOL: return false;
		case ScalarType$2.DOUBLE:
		case ScalarType$2.FLOAT: return 0;
		case ScalarType$2.INT64:
		case ScalarType$2.UINT64:
		case ScalarType$2.SFIXED64:
		case ScalarType$2.FIXED64:
		case ScalarType$2.SINT64: return longAsString ? "0" : protoInt64$2.zero;
		case ScalarType$2.BYTES: return new Uint8Array(0);
		default: return 0;
	}
}
/**
* Returns true for a zero-value. For example, an integer has the zero-value `0`,
* a boolean is `false`, a string is `""`, and bytes is an empty Uint8Array.
*
* In proto3, zero-values are not written to the wire, unless the field is
* optional or repeated.
*/
function isScalarZeroValue$2(type, value) {
	switch (type) {
		case ScalarType$2.BOOL: return value === false;
		case ScalarType$2.STRING: return value === "";
		case ScalarType$2.BYTES: return value instanceof Uint8Array && !value.byteLength;
		default: return value == 0;
	}
}
//#endregion
//#region ../../node_modules/@connectrpc/connect/node_modules/@bufbuild/protobuf/dist/esm/reflect/unsafe.js
var IMPLICIT$9 = 2;
var unsafeLocal$2 = Symbol.for("reflect unsafe local");
/**
* Return the selected field of a oneof group.
*
* @private
*/
function unsafeOneofCase$2(target, oneof) {
	const c = target[oneof.localName].case;
	if (c === void 0) return c;
	return oneof.fields.find((f) => f.localName === c);
}
/**
* Returns true if the field is set.
*
* @private
*/
function unsafeIsSet$2(target, field) {
	const name = field.localName;
	if (field.oneof) return target[field.oneof.localName].case === name;
	if (field.presence != IMPLICIT$9) return target[name] !== void 0 && Object.prototype.hasOwnProperty.call(target, name);
	switch (field.fieldKind) {
		case "list": return target[name].length > 0;
		case "map": return Object.keys(target[name]).length > 0;
		case "scalar": return !isScalarZeroValue$2(field.scalar, target[name]);
		case "enum": return target[name] !== field.enum.values[0].number;
	}
	throw new Error("message field with implicit presence");
}
/**
* Returns true if the field is set, but only for singular fields with explicit
* presence (proto2).
*
* @private
*/
function unsafeIsSetExplicit$2(target, localName) {
	return Object.prototype.hasOwnProperty.call(target, localName) && target[localName] !== void 0;
}
/**
* Return a field value, respecting oneof groups.
*
* @private
*/
function unsafeGet$2(target, field) {
	if (field.oneof) {
		const oneof = target[field.oneof.localName];
		if (oneof.case === field.localName) return oneof.value;
		return;
	}
	return target[field.localName];
}
/**
* Set a field value, respecting oneof groups.
*
* @private
*/
function unsafeSet$2(target, field, value) {
	if (field.oneof) target[field.oneof.localName] = {
		case: field.localName,
		value
	};
	else target[field.localName] = value;
}
/**
* Resets the field, so that unsafeIsSet() will return false.
*
* @private
*/
function unsafeClear$2(target, field) {
	const name = field.localName;
	if (field.oneof) {
		const oneofLocalName = field.oneof.localName;
		if (target[oneofLocalName].case === name) target[oneofLocalName] = { case: void 0 };
	} else if (field.presence != IMPLICIT$9) delete target[name];
	else switch (field.fieldKind) {
		case "map":
			target[name] = {};
			break;
		case "list":
			target[name] = [];
			break;
		case "enum":
			target[name] = field.enum.values[0].number;
			break;
		case "scalar":
			target[name] = scalarZeroValue$2(field.scalar, field.longAsString);
			break;
	}
}
//#endregion
//#region ../../node_modules/@connectrpc/connect/node_modules/@bufbuild/protobuf/dist/esm/reflect/guard.js
function isObject$2(arg) {
	return arg !== null && typeof arg == "object" && !Array.isArray(arg);
}
function isReflectList$2(arg, field) {
	var _a, _b, _c, _d;
	if (isObject$2(arg) && unsafeLocal$2 in arg && "add" in arg && "field" in arg && typeof arg.field == "function") {
		if (field !== void 0) {
			const a = field;
			const b = arg.field();
			return a.listKind == b.listKind && a.scalar === b.scalar && ((_a = a.message) === null || _a === void 0 ? void 0 : _a.typeName) === ((_b = b.message) === null || _b === void 0 ? void 0 : _b.typeName) && ((_c = a.enum) === null || _c === void 0 ? void 0 : _c.typeName) === ((_d = b.enum) === null || _d === void 0 ? void 0 : _d.typeName);
		}
		return true;
	}
	return false;
}
function isReflectMap$2(arg, field) {
	var _a, _b, _c, _d;
	if (isObject$2(arg) && unsafeLocal$2 in arg && "has" in arg && "field" in arg && typeof arg.field == "function") {
		if (field !== void 0) {
			const a = field, b = arg.field();
			return a.mapKey === b.mapKey && a.mapKind == b.mapKind && a.scalar === b.scalar && ((_a = a.message) === null || _a === void 0 ? void 0 : _a.typeName) === ((_b = b.message) === null || _b === void 0 ? void 0 : _b.typeName) && ((_c = a.enum) === null || _c === void 0 ? void 0 : _c.typeName) === ((_d = b.enum) === null || _d === void 0 ? void 0 : _d.typeName);
		}
		return true;
	}
	return false;
}
function isReflectMessage$2(arg, messageDesc) {
	return isObject$2(arg) && unsafeLocal$2 in arg && "desc" in arg && isObject$2(arg.desc) && arg.desc.kind === "message" && (messageDesc === void 0 || arg.desc.typeName == messageDesc.typeName);
}
//#endregion
//#region ../../node_modules/@connectrpc/connect/node_modules/@bufbuild/protobuf/dist/esm/wkt/wrappers.js
function isWrapper$2(arg) {
	return isWrapperTypeName$2(arg.$typeName);
}
function isWrapperDesc$2(messageDesc) {
	const f = messageDesc.fields[0];
	return isWrapperTypeName$2(messageDesc.typeName) && f !== void 0 && f.fieldKind == "scalar" && f.name == "value" && f.number == 1;
}
function isWrapperTypeName$2(name) {
	return name.startsWith("google.protobuf.") && [
		"DoubleValue",
		"FloatValue",
		"Int64Value",
		"UInt64Value",
		"Int32Value",
		"UInt32Value",
		"BoolValue",
		"StringValue",
		"BytesValue"
	].includes(name.substring(16));
}
//#endregion
//#region ../../node_modules/@connectrpc/connect/node_modules/@bufbuild/protobuf/dist/esm/create.js
var EDITION_PROTO3$5 = 999;
var EDITION_PROTO2$5 = 998;
var IMPLICIT$8 = 2;
/**
* Create a new message instance.
*
* The second argument is an optional initializer object, where all fields are
* optional.
*/
function create$2(schema, init) {
	if (isMessage$2(init, schema)) return init;
	const message = createZeroMessage$2(schema);
	if (init !== void 0) initMessage$2(schema, message, init);
	return message;
}
/**
* Sets field values from a MessageInitShape on a zero message.
*/
function initMessage$2(messageDesc, message, init) {
	for (const member of messageDesc.members) {
		let value = init[member.localName];
		if (value == null) continue;
		let field;
		if (member.kind == "oneof") {
			const oneofField = unsafeOneofCase$2(init, member);
			if (!oneofField) continue;
			field = oneofField;
			value = unsafeGet$2(init, oneofField);
		} else field = member;
		switch (field.fieldKind) {
			case "message":
				value = toMessage$2(field, value);
				break;
			case "scalar":
				value = initScalar$2(field, value);
				break;
			case "list":
				value = initList$2(field, value);
				break;
			case "map":
				value = initMap$2(field, value);
				break;
		}
		unsafeSet$2(message, field, value);
	}
	return message;
}
function initScalar$2(field, value) {
	if (field.scalar == ScalarType$2.BYTES) return toU8Arr$2(value);
	return value;
}
function initMap$2(field, value) {
	if (isObject$2(value)) {
		if (field.scalar == ScalarType$2.BYTES) return convertObjectValues$2(value, toU8Arr$2);
		if (field.mapKind == "message") return convertObjectValues$2(value, (val) => toMessage$2(field, val));
	}
	return value;
}
function initList$2(field, value) {
	if (Array.isArray(value)) {
		if (field.scalar == ScalarType$2.BYTES) return value.map(toU8Arr$2);
		if (field.listKind == "message") return value.map((item) => toMessage$2(field, item));
	}
	return value;
}
function toMessage$2(field, value) {
	if (field.fieldKind == "message" && !field.oneof && isWrapperDesc$2(field.message)) return initScalar$2(field.message.fields[0], value);
	if (isObject$2(value)) {
		if (field.message.typeName == "google.protobuf.Struct" && field.parent.typeName !== "google.protobuf.Value") return value;
		if (!isMessage$2(value, field.message)) return create$2(field.message, value);
	}
	return value;
}
function toU8Arr$2(value) {
	return Array.isArray(value) ? new Uint8Array(value) : value;
}
function convertObjectValues$2(obj, fn) {
	const ret = {};
	for (const entry of Object.entries(obj)) ret[entry[0]] = fn(entry[1]);
	return ret;
}
var tokenZeroMessageField$2 = Symbol();
var messagePrototypes$2 = /* @__PURE__ */ new WeakMap();
/**
* Create a zero message.
*/
function createZeroMessage$2(desc) {
	let msg;
	if (!needsPrototypeChain$2(desc)) {
		msg = { $typeName: desc.typeName };
		for (const member of desc.members) if (member.kind == "oneof" || member.presence == IMPLICIT$8) msg[member.localName] = createZeroField$2(member);
	} else {
		const cached = messagePrototypes$2.get(desc);
		let prototype;
		let members;
		if (cached) ({prototype, members} = cached);
		else {
			prototype = {};
			members = /* @__PURE__ */ new Set();
			for (const member of desc.members) {
				if (member.kind == "oneof") continue;
				if (member.fieldKind != "scalar" && member.fieldKind != "enum") continue;
				if (member.presence == IMPLICIT$8) continue;
				members.add(member);
				prototype[member.localName] = createZeroField$2(member);
			}
			messagePrototypes$2.set(desc, {
				prototype,
				members
			});
		}
		msg = Object.create(prototype);
		msg.$typeName = desc.typeName;
		for (const member of desc.members) {
			if (members.has(member)) continue;
			if (member.kind == "field") {
				if (member.fieldKind == "message") continue;
				if (member.fieldKind == "scalar" || member.fieldKind == "enum") {
					if (member.presence != IMPLICIT$8) continue;
				}
			}
			msg[member.localName] = createZeroField$2(member);
		}
	}
	return msg;
}
/**
* Do we need the prototype chain to track field presence?
*/
function needsPrototypeChain$2(desc) {
	switch (desc.file.edition) {
		case EDITION_PROTO3$5: return false;
		case EDITION_PROTO2$5: return true;
		default: return desc.fields.some((f) => f.presence != IMPLICIT$8 && f.fieldKind != "message" && !f.oneof);
	}
}
/**
* Returns a zero value for oneof groups, and for every field kind except
* messages. Scalar and enum fields can have default values.
*/
function createZeroField$2(field) {
	if (field.kind == "oneof") return { case: void 0 };
	if (field.fieldKind == "list") return [];
	if (field.fieldKind == "map") return {};
	if (field.fieldKind == "message") return tokenZeroMessageField$2;
	const defaultValue = field.getDefaultValue();
	if (defaultValue !== void 0) return field.fieldKind == "scalar" && field.longAsString ? defaultValue.toString() : defaultValue;
	return field.fieldKind == "scalar" ? scalarZeroValue$2(field.scalar, field.longAsString) : field.enum.values[0].number;
}
//#endregion
//#region ../../node_modules/@connectrpc/connect/node_modules/@bufbuild/protobuf/dist/esm/reflect/error.js
var errorNames$1 = [
	"FieldValueInvalidError",
	"FieldListRangeError",
	"ForeignFieldError"
];
var FieldError$2 = class extends Error {
	constructor(fieldOrOneof, message, name = "FieldValueInvalidError") {
		super(message);
		this.name = name;
		this.field = () => fieldOrOneof;
	}
};
function isFieldError$1(arg) {
	return arg instanceof Error && errorNames$1.includes(arg.name) && "field" in arg && typeof arg.field == "function";
}
//#endregion
//#region ../../node_modules/@connectrpc/connect/node_modules/@bufbuild/protobuf/dist/esm/wire/text-encoding.js
var symbol$2 = Symbol.for("@bufbuild/protobuf/text-encoding");
function getTextEncoding$2() {
	if (globalThis[symbol$2] == void 0) {
		const te = new globalThis.TextEncoder();
		const td = new globalThis.TextDecoder();
		globalThis[symbol$2] = {
			encodeUtf8(text) {
				return te.encode(text);
			},
			decodeUtf8(bytes) {
				return td.decode(bytes);
			},
			checkUtf8(text) {
				try {
					return true;
				} catch (_) {
					return false;
				}
			}
		};
	}
	return globalThis[symbol$2];
}
//#endregion
//#region ../../node_modules/@connectrpc/connect/node_modules/@bufbuild/protobuf/dist/esm/wire/binary-encoding.js
/**
* Protobuf binary format wire types.
*
* A wire type provides just enough information to find the length of the
* following value.
*
* See https://developers.google.com/protocol-buffers/docs/encoding#structure
*/
var WireType$2;
(function(WireType) {
	/**
	* Used for int32, int64, uint32, uint64, sint32, sint64, bool, enum
	*/
	WireType[WireType["Varint"] = 0] = "Varint";
	/**
	* Used for fixed64, sfixed64, double.
	* Always 8 bytes with little-endian byte order.
	*/
	WireType[WireType["Bit64"] = 1] = "Bit64";
	/**
	* Used for string, bytes, embedded messages, packed repeated fields
	*
	* Only repeated numeric types (types which use the varint, 32-bit,
	* or 64-bit wire types) can be packed. In proto3, such fields are
	* packed by default.
	*/
	WireType[WireType["LengthDelimited"] = 2] = "LengthDelimited";
	/**
	* Start of a tag-delimited aggregate, such as a proto2 group, or a message
	* in editions with message_encoding = DELIMITED.
	*/
	WireType[WireType["StartGroup"] = 3] = "StartGroup";
	/**
	* End of a tag-delimited aggregate.
	*/
	WireType[WireType["EndGroup"] = 4] = "EndGroup";
	/**
	* Used for fixed32, sfixed32, float.
	* Always 4 bytes with little-endian byte order.
	*/
	WireType[WireType["Bit32"] = 5] = "Bit32";
})(WireType$2 || (WireType$2 = {}));
var BinaryWriter$1 = class {
	constructor(encodeUtf8 = getTextEncoding$2().encodeUtf8) {
		this.encodeUtf8 = encodeUtf8;
		/**
		* Previous fork states.
		*/
		this.stack = [];
		this.chunks = [];
		this.buf = [];
	}
	/**
	* Return all bytes written and reset this writer.
	*/
	finish() {
		if (this.buf.length) {
			this.chunks.push(new Uint8Array(this.buf));
			this.buf = [];
		}
		let len = 0;
		for (let i = 0; i < this.chunks.length; i++) len += this.chunks[i].length;
		let bytes = new Uint8Array(len);
		let offset = 0;
		for (let i = 0; i < this.chunks.length; i++) {
			bytes.set(this.chunks[i], offset);
			offset += this.chunks[i].length;
		}
		this.chunks = [];
		return bytes;
	}
	/**
	* Start a new fork for length-delimited data like a message
	* or a packed repeated field.
	*
	* Must be joined later with `join()`.
	*/
	fork() {
		this.stack.push({
			chunks: this.chunks,
			buf: this.buf
		});
		this.chunks = [];
		this.buf = [];
		return this;
	}
	/**
	* Join the last fork. Write its length and bytes, then
	* return to the previous state.
	*/
	join() {
		let chunk = this.finish();
		let prev = this.stack.pop();
		if (!prev) throw new Error("invalid state, fork stack empty");
		this.chunks = prev.chunks;
		this.buf = prev.buf;
		this.uint32(chunk.byteLength);
		return this.raw(chunk);
	}
	/**
	* Writes a tag (field number and wire type).
	*
	* Equivalent to `uint32( (fieldNo << 3 | type) >>> 0 )`.
	*
	* Generated code should compute the tag ahead of time and call `uint32()`.
	*/
	tag(fieldNo, type) {
		return this.uint32((fieldNo << 3 | type) >>> 0);
	}
	/**
	* Write a chunk of raw bytes.
	*/
	raw(chunk) {
		if (this.buf.length) {
			this.chunks.push(new Uint8Array(this.buf));
			this.buf = [];
		}
		this.chunks.push(chunk);
		return this;
	}
	/**
	* Write a `uint32` value, an unsigned 32 bit varint.
	*/
	uint32(value) {
		assertUInt32$1(value);
		while (value > 127) {
			this.buf.push(value & 127 | 128);
			value = value >>> 7;
		}
		this.buf.push(value);
		return this;
	}
	/**
	* Write a `int32` value, a signed 32 bit varint.
	*/
	int32(value) {
		assertInt32$1(value);
		varint32write$2(value, this.buf);
		return this;
	}
	/**
	* Write a `bool` value, a variant.
	*/
	bool(value) {
		this.buf.push(value ? 1 : 0);
		return this;
	}
	/**
	* Write a `bytes` value, length-delimited arbitrary data.
	*/
	bytes(value) {
		this.uint32(value.byteLength);
		return this.raw(value);
	}
	/**
	* Write a `string` value, length-delimited data converted to UTF-8 text.
	*/
	string(value) {
		let chunk = this.encodeUtf8(value);
		this.uint32(chunk.byteLength);
		return this.raw(chunk);
	}
	/**
	* Write a `float` value, 32-bit floating point number.
	*/
	float(value) {
		assertFloat32$1(value);
		let chunk = new Uint8Array(4);
		new DataView(chunk.buffer).setFloat32(0, value, true);
		return this.raw(chunk);
	}
	/**
	* Write a `double` value, a 64-bit floating point number.
	*/
	double(value) {
		let chunk = new Uint8Array(8);
		new DataView(chunk.buffer).setFloat64(0, value, true);
		return this.raw(chunk);
	}
	/**
	* Write a `fixed32` value, an unsigned, fixed-length 32-bit integer.
	*/
	fixed32(value) {
		assertUInt32$1(value);
		let chunk = new Uint8Array(4);
		new DataView(chunk.buffer).setUint32(0, value, true);
		return this.raw(chunk);
	}
	/**
	* Write a `sfixed32` value, a signed, fixed-length 32-bit integer.
	*/
	sfixed32(value) {
		assertInt32$1(value);
		let chunk = new Uint8Array(4);
		new DataView(chunk.buffer).setInt32(0, value, true);
		return this.raw(chunk);
	}
	/**
	* Write a `sint32` value, a signed, zigzag-encoded 32-bit varint.
	*/
	sint32(value) {
		assertInt32$1(value);
		value = (value << 1 ^ value >> 31) >>> 0;
		varint32write$2(value, this.buf);
		return this;
	}
	/**
	* Write a `fixed64` value, a signed, fixed-length 64-bit integer.
	*/
	sfixed64(value) {
		let chunk = new Uint8Array(8), view = new DataView(chunk.buffer), tc = protoInt64$2.enc(value);
		view.setInt32(0, tc.lo, true);
		view.setInt32(4, tc.hi, true);
		return this.raw(chunk);
	}
	/**
	* Write a `fixed64` value, an unsigned, fixed-length 64 bit integer.
	*/
	fixed64(value) {
		let chunk = new Uint8Array(8), view = new DataView(chunk.buffer), tc = protoInt64$2.uEnc(value);
		view.setInt32(0, tc.lo, true);
		view.setInt32(4, tc.hi, true);
		return this.raw(chunk);
	}
	/**
	* Write a `int64` value, a signed 64-bit varint.
	*/
	int64(value) {
		let tc = protoInt64$2.enc(value);
		varint64write$1(tc.lo, tc.hi, this.buf);
		return this;
	}
	/**
	* Write a `sint64` value, a signed, zig-zag-encoded 64-bit varint.
	*/
	sint64(value) {
		const tc = protoInt64$2.enc(value), sign = tc.hi >> 31;
		varint64write$1(tc.lo << 1 ^ sign, (tc.hi << 1 | tc.lo >>> 31) ^ sign, this.buf);
		return this;
	}
	/**
	* Write a `uint64` value, an unsigned 64-bit varint.
	*/
	uint64(value) {
		const tc = protoInt64$2.uEnc(value);
		varint64write$1(tc.lo, tc.hi, this.buf);
		return this;
	}
};
var BinaryReader$2 = class {
	constructor(buf, decodeUtf8 = getTextEncoding$2().decodeUtf8) {
		this.decodeUtf8 = decodeUtf8;
		this.varint64 = varint64read$2;
		/**
		* Read a `uint32` field, an unsigned 32 bit varint.
		*/
		this.uint32 = varint32read$2;
		this.buf = buf;
		this.len = buf.length;
		this.pos = 0;
		this.view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
	}
	/**
	* Reads a tag - field number and wire type.
	*/
	tag() {
		let tag = this.uint32(), fieldNo = tag >>> 3, wireType = tag & 7;
		if (fieldNo <= 0 || wireType < 0 || wireType > 5) throw new Error("illegal tag: field no " + fieldNo + " wire type " + wireType);
		return [fieldNo, wireType];
	}
	/**
	* Skip one element and return the skipped data.
	*
	* When skipping StartGroup, provide the tags field number to check for
	* matching field number in the EndGroup tag.
	*/
	skip(wireType, fieldNo) {
		let start = this.pos;
		switch (wireType) {
			case WireType$2.Varint:
				while (this.buf[this.pos++] & 128);
				break;
			case WireType$2.Bit64: this.pos += 4;
			case WireType$2.Bit32:
				this.pos += 4;
				break;
			case WireType$2.LengthDelimited:
				let len = this.uint32();
				this.pos += len;
				break;
			case WireType$2.StartGroup:
				for (;;) {
					const [fn, wt] = this.tag();
					if (wt === WireType$2.EndGroup) {
						if (fieldNo !== void 0 && fn !== fieldNo) throw new Error("invalid end group tag");
						break;
					}
					this.skip(wt, fn);
				}
				break;
			default: throw new Error("cant skip wire type " + wireType);
		}
		this.assertBounds();
		return this.buf.subarray(start, this.pos);
	}
	/**
	* Throws error if position in byte array is out of range.
	*/
	assertBounds() {
		if (this.pos > this.len) throw new RangeError("premature EOF");
	}
	/**
	* Read a `int32` field, a signed 32 bit varint.
	*/
	int32() {
		return this.uint32() | 0;
	}
	/**
	* Read a `sint32` field, a signed, zigzag-encoded 32-bit varint.
	*/
	sint32() {
		let zze = this.uint32();
		return zze >>> 1 ^ -(zze & 1);
	}
	/**
	* Read a `int64` field, a signed 64-bit varint.
	*/
	int64() {
		return protoInt64$2.dec(...this.varint64());
	}
	/**
	* Read a `uint64` field, an unsigned 64-bit varint.
	*/
	uint64() {
		return protoInt64$2.uDec(...this.varint64());
	}
	/**
	* Read a `sint64` field, a signed, zig-zag-encoded 64-bit varint.
	*/
	sint64() {
		let [lo, hi] = this.varint64();
		let s = -(lo & 1);
		lo = (lo >>> 1 | (hi & 1) << 31) ^ s;
		hi = hi >>> 1 ^ s;
		return protoInt64$2.dec(lo, hi);
	}
	/**
	* Read a `bool` field, a variant.
	*/
	bool() {
		let [lo, hi] = this.varint64();
		return lo !== 0 || hi !== 0;
	}
	/**
	* Read a `fixed32` field, an unsigned, fixed-length 32-bit integer.
	*/
	fixed32() {
		return this.view.getUint32((this.pos += 4) - 4, true);
	}
	/**
	* Read a `sfixed32` field, a signed, fixed-length 32-bit integer.
	*/
	sfixed32() {
		return this.view.getInt32((this.pos += 4) - 4, true);
	}
	/**
	* Read a `fixed64` field, an unsigned, fixed-length 64 bit integer.
	*/
	fixed64() {
		return protoInt64$2.uDec(this.sfixed32(), this.sfixed32());
	}
	/**
	* Read a `fixed64` field, a signed, fixed-length 64-bit integer.
	*/
	sfixed64() {
		return protoInt64$2.dec(this.sfixed32(), this.sfixed32());
	}
	/**
	* Read a `float` field, 32-bit floating point number.
	*/
	float() {
		return this.view.getFloat32((this.pos += 4) - 4, true);
	}
	/**
	* Read a `double` field, a 64-bit floating point number.
	*/
	double() {
		return this.view.getFloat64((this.pos += 8) - 8, true);
	}
	/**
	* Read a `bytes` field, length-delimited arbitrary data.
	*/
	bytes() {
		let len = this.uint32(), start = this.pos;
		this.pos += len;
		this.assertBounds();
		return this.buf.subarray(start, start + len);
	}
	/**
	* Read a `string` field, length-delimited data converted to UTF-8 text.
	*/
	string() {
		return this.decodeUtf8(this.bytes());
	}
};
/**
* Assert a valid signed protobuf 32-bit integer as a number or string.
*/
function assertInt32$1(arg) {
	if (typeof arg == "string") arg = Number(arg);
	else if (typeof arg != "number") throw new Error("invalid int32: " + typeof arg);
	if (!Number.isInteger(arg) || arg > 2147483647 || arg < -2147483648) throw new Error("invalid int32: " + arg);
}
/**
* Assert a valid unsigned protobuf 32-bit integer as a number or string.
*/
function assertUInt32$1(arg) {
	if (typeof arg == "string") arg = Number(arg);
	else if (typeof arg != "number") throw new Error("invalid uint32: " + typeof arg);
	if (!Number.isInteger(arg) || arg > 4294967295 || arg < 0) throw new Error("invalid uint32: " + arg);
}
/**
* Assert a valid protobuf float value as a number or string.
*/
function assertFloat32$1(arg) {
	if (typeof arg == "string") {
		const o = arg;
		arg = Number(arg);
		if (Number.isNaN(arg) && o !== "NaN") throw new Error("invalid float32: " + o);
	} else if (typeof arg != "number") throw new Error("invalid float32: " + typeof arg);
	if (Number.isFinite(arg) && (arg > 34028234663852886e22 || arg < -34028234663852886e22)) throw new Error("invalid float32: " + arg);
}
//#endregion
//#region ../../node_modules/@connectrpc/connect/node_modules/@bufbuild/protobuf/dist/esm/reflect/reflect-check.js
/**
* Check whether the given field value is valid for the reflect API.
*/
function checkField$2(field, value) {
	const check = field.fieldKind == "list" ? isReflectList$2(value, field) : field.fieldKind == "map" ? isReflectMap$2(value, field) : checkSingular$2(field, value);
	if (check === true) return;
	let reason;
	switch (field.fieldKind) {
		case "list":
			reason = `expected ${formatReflectList$2(field)}, got ${formatVal$2(value)}`;
			break;
		case "map":
			reason = `expected ${formatReflectMap$2(field)}, got ${formatVal$2(value)}`;
			break;
		default: reason = reasonSingular$2(field, value, check);
	}
	return new FieldError$2(field, reason);
}
/**
* Check whether the given list item is valid for the reflect API.
*/
function checkListItem$2(field, index, value) {
	const check = checkSingular$2(field, value);
	if (check !== true) return new FieldError$2(field, `list item #${index + 1}: ${reasonSingular$2(field, value, check)}`);
}
/**
* Check whether the given map key and value are valid for the reflect API.
*/
function checkMapEntry$2(field, key, value) {
	const checkKey = checkScalarValue$2(key, field.mapKey);
	if (checkKey !== true) return new FieldError$2(field, `invalid map key: ${reasonSingular$2({ scalar: field.mapKey }, key, checkKey)}`);
	const checkVal = checkSingular$2(field, value);
	if (checkVal !== true) return new FieldError$2(field, `map entry ${formatVal$2(key)}: ${reasonSingular$2(field, value, checkVal)}`);
}
function checkSingular$2(field, value) {
	if (field.scalar !== void 0) return checkScalarValue$2(value, field.scalar);
	if (field.enum !== void 0) {
		if (field.enum.open) return Number.isInteger(value);
		return field.enum.values.some((v) => v.number === value);
	}
	return isReflectMessage$2(value, field.message);
}
function checkScalarValue$2(value, scalar) {
	switch (scalar) {
		case ScalarType$2.DOUBLE: return typeof value == "number";
		case ScalarType$2.FLOAT:
			if (typeof value != "number") return false;
			if (Number.isNaN(value) || !Number.isFinite(value)) return true;
			if (value > 34028234663852886e22 || value < -34028234663852886e22) return `${value.toFixed()} out of range`;
			return true;
		case ScalarType$2.INT32:
		case ScalarType$2.SFIXED32:
		case ScalarType$2.SINT32:
			if (typeof value !== "number" || !Number.isInteger(value)) return false;
			if (value > 2147483647 || value < -2147483648) return `${value.toFixed()} out of range`;
			return true;
		case ScalarType$2.FIXED32:
		case ScalarType$2.UINT32:
			if (typeof value !== "number" || !Number.isInteger(value)) return false;
			if (value > 4294967295 || value < 0) return `${value.toFixed()} out of range`;
			return true;
		case ScalarType$2.BOOL: return typeof value == "boolean";
		case ScalarType$2.STRING:
			if (typeof value != "string") return false;
			return getTextEncoding$2().checkUtf8(value) || "invalid UTF8";
		case ScalarType$2.BYTES: return value instanceof Uint8Array;
		case ScalarType$2.INT64:
		case ScalarType$2.SFIXED64:
		case ScalarType$2.SINT64:
			if (typeof value == "bigint" || typeof value == "number" || typeof value == "string" && value.length > 0) try {
				protoInt64$2.parse(value);
				return true;
			} catch (_) {
				return `${value} out of range`;
			}
			return false;
		case ScalarType$2.FIXED64:
		case ScalarType$2.UINT64:
			if (typeof value == "bigint" || typeof value == "number" || typeof value == "string" && value.length > 0) try {
				protoInt64$2.uParse(value);
				return true;
			} catch (_) {
				return `${value} out of range`;
			}
			return false;
	}
}
function reasonSingular$2(field, val, details) {
	details = typeof details == "string" ? `: ${details}` : `, got ${formatVal$2(val)}`;
	if (field.scalar !== void 0) return `expected ${scalarTypeDescription$2(field.scalar)}` + details;
	if (field.enum !== void 0) return `expected ${field.enum.toString()}` + details;
	return `expected ${formatReflectMessage$2(field.message)}` + details;
}
function formatVal$2(val) {
	switch (typeof val) {
		case "object":
			if (val === null) return "null";
			if (val instanceof Uint8Array) return `Uint8Array(${val.length})`;
			if (Array.isArray(val)) return `Array(${val.length})`;
			if (isReflectList$2(val)) return formatReflectList$2(val.field());
			if (isReflectMap$2(val)) return formatReflectMap$2(val.field());
			if (isReflectMessage$2(val)) return formatReflectMessage$2(val.desc);
			if (isMessage$2(val)) return `message ${val.$typeName}`;
			return "object";
		case "string": return val.length > 30 ? "string" : `"${val.split("\"").join("\\\"")}"`;
		case "boolean": return String(val);
		case "number": return String(val);
		case "bigint": return String(val) + "n";
		default: return typeof val;
	}
}
function formatReflectMessage$2(desc) {
	return `ReflectMessage (${desc.typeName})`;
}
function formatReflectList$2(field) {
	switch (field.listKind) {
		case "message": return `ReflectList (${field.message.toString()})`;
		case "enum": return `ReflectList (${field.enum.toString()})`;
		case "scalar": return `ReflectList (${ScalarType$2[field.scalar]})`;
	}
}
function formatReflectMap$2(field) {
	switch (field.mapKind) {
		case "message": return `ReflectMap (${ScalarType$2[field.mapKey]}, ${field.message.toString()})`;
		case "enum": return `ReflectMap (${ScalarType$2[field.mapKey]}, ${field.enum.toString()})`;
		case "scalar": return `ReflectMap (${ScalarType$2[field.mapKey]}, ${ScalarType$2[field.scalar]})`;
	}
}
function scalarTypeDescription$2(scalar) {
	switch (scalar) {
		case ScalarType$2.STRING: return "string";
		case ScalarType$2.BOOL: return "boolean";
		case ScalarType$2.INT64:
		case ScalarType$2.SINT64:
		case ScalarType$2.SFIXED64: return "bigint (int64)";
		case ScalarType$2.UINT64:
		case ScalarType$2.FIXED64: return "bigint (uint64)";
		case ScalarType$2.BYTES: return "Uint8Array";
		case ScalarType$2.DOUBLE: return "number (float64)";
		case ScalarType$2.FLOAT: return "number (float32)";
		case ScalarType$2.FIXED32:
		case ScalarType$2.UINT32: return "number (uint32)";
		case ScalarType$2.INT32:
		case ScalarType$2.SFIXED32:
		case ScalarType$2.SINT32: return "number (int32)";
	}
}
//#endregion
//#region ../../node_modules/@connectrpc/connect/node_modules/@bufbuild/protobuf/dist/esm/reflect/reflect.js
/**
* Create a ReflectMessage.
*/
function reflect$2(messageDesc, message, check = true) {
	return new ReflectMessageImpl$2(messageDesc, message, check);
}
var ReflectMessageImpl$2 = class {
	get sortedFields() {
		var _a;
		return (_a = this._sortedFields) !== null && _a !== void 0 ? _a : this._sortedFields = this.desc.fields.concat().sort((a, b) => a.number - b.number);
	}
	constructor(messageDesc, message, check = true) {
		this.lists = /* @__PURE__ */ new Map();
		this.maps = /* @__PURE__ */ new Map();
		this.check = check;
		this.desc = messageDesc;
		this.message = this[unsafeLocal$2] = message !== null && message !== void 0 ? message : create$2(messageDesc);
		this.fields = messageDesc.fields;
		this.oneofs = messageDesc.oneofs;
		this.members = messageDesc.members;
	}
	findNumber(number) {
		if (!this._fieldsByNumber) this._fieldsByNumber = new Map(this.desc.fields.map((f) => [f.number, f]));
		return this._fieldsByNumber.get(number);
	}
	oneofCase(oneof) {
		assertOwn$2(this.message, oneof);
		return unsafeOneofCase$2(this.message, oneof);
	}
	isSet(field) {
		assertOwn$2(this.message, field);
		return unsafeIsSet$2(this.message, field);
	}
	clear(field) {
		assertOwn$2(this.message, field);
		unsafeClear$2(this.message, field);
	}
	get(field) {
		assertOwn$2(this.message, field);
		const value = unsafeGet$2(this.message, field);
		switch (field.fieldKind) {
			case "list":
				let list = this.lists.get(field);
				if (!list || list[unsafeLocal$2] !== value) this.lists.set(field, list = new ReflectListImpl$2(field, value, this.check));
				return list;
			case "map":
				let map = this.maps.get(field);
				if (!map || map[unsafeLocal$2] !== value) this.maps.set(field, map = new ReflectMapImpl$2(field, value, this.check));
				return map;
			case "message": return messageToReflect$2(field, value, this.check);
			case "scalar": return value === void 0 ? scalarZeroValue$2(field.scalar, false) : longToReflect$2(field, value);
			case "enum": return value !== null && value !== void 0 ? value : field.enum.values[0].number;
		}
	}
	set(field, value) {
		assertOwn$2(this.message, field);
		if (this.check) {
			const err = checkField$2(field, value);
			if (err) throw err;
		}
		let local;
		if (field.fieldKind == "message") local = messageToLocal$2(field, value);
		else if (isReflectMap$2(value) || isReflectList$2(value)) local = value[unsafeLocal$2];
		else local = longToLocal$2(field, value);
		unsafeSet$2(this.message, field, local);
	}
	getUnknown() {
		return this.message.$unknown;
	}
	setUnknown(value) {
		this.message.$unknown = value;
	}
};
function assertOwn$2(owner, member) {
	if (member.parent.typeName !== owner.$typeName) throw new FieldError$2(member, `cannot use ${member.toString()} with message ${owner.$typeName}`, "ForeignFieldError");
}
var ReflectListImpl$2 = class {
	field() {
		return this._field;
	}
	get size() {
		return this._arr.length;
	}
	constructor(field, unsafeInput, check) {
		this._field = field;
		this._arr = this[unsafeLocal$2] = unsafeInput;
		this.check = check;
	}
	get(index) {
		const item = this._arr[index];
		return item === void 0 ? void 0 : listItemToReflect$2(this._field, item, this.check);
	}
	set(index, item) {
		if (index < 0 || index >= this._arr.length) throw new FieldError$2(this._field, `list item #${index + 1}: out of range`);
		if (this.check) {
			const err = checkListItem$2(this._field, index, item);
			if (err) throw err;
		}
		this._arr[index] = listItemToLocal$2(this._field, item);
	}
	add(item) {
		if (this.check) {
			const err = checkListItem$2(this._field, this._arr.length, item);
			if (err) throw err;
		}
		this._arr.push(listItemToLocal$2(this._field, item));
	}
	clear() {
		this._arr.splice(0, this._arr.length);
	}
	[Symbol.iterator]() {
		return this.values();
	}
	keys() {
		return this._arr.keys();
	}
	*values() {
		for (const item of this._arr) yield listItemToReflect$2(this._field, item, this.check);
	}
	*entries() {
		for (let i = 0; i < this._arr.length; i++) yield [i, listItemToReflect$2(this._field, this._arr[i], this.check)];
	}
};
var ReflectMapImpl$2 = class {
	constructor(field, unsafeInput, check = true) {
		this.obj = this[unsafeLocal$2] = unsafeInput !== null && unsafeInput !== void 0 ? unsafeInput : {};
		this.check = check;
		this._field = field;
	}
	field() {
		return this._field;
	}
	set(key, value) {
		if (this.check) {
			const err = checkMapEntry$2(this._field, key, value);
			if (err) throw err;
		}
		this.obj[mapKeyToLocal$2(key)] = mapValueToLocal$2(this._field, value);
		return this;
	}
	delete(key) {
		const k = mapKeyToLocal$2(key);
		const has = Object.prototype.hasOwnProperty.call(this.obj, k);
		if (has) delete this.obj[k];
		return has;
	}
	clear() {
		for (const key of Object.keys(this.obj)) delete this.obj[key];
	}
	get(key) {
		let val = this.obj[mapKeyToLocal$2(key)];
		if (val !== void 0) val = mapValueToReflect$2(this._field, val, this.check);
		return val;
	}
	has(key) {
		return Object.prototype.hasOwnProperty.call(this.obj, mapKeyToLocal$2(key));
	}
	*keys() {
		for (const objKey of Object.keys(this.obj)) yield mapKeyToReflect$2(objKey, this._field.mapKey);
	}
	*entries() {
		for (const objEntry of Object.entries(this.obj)) yield [mapKeyToReflect$2(objEntry[0], this._field.mapKey), mapValueToReflect$2(this._field, objEntry[1], this.check)];
	}
	[Symbol.iterator]() {
		return this.entries();
	}
	get size() {
		return Object.keys(this.obj).length;
	}
	*values() {
		for (const val of Object.values(this.obj)) yield mapValueToReflect$2(this._field, val, this.check);
	}
	forEach(callbackfn, thisArg) {
		for (const mapEntry of this.entries()) callbackfn.call(thisArg, mapEntry[1], mapEntry[0], this);
	}
};
function messageToLocal$2(field, value) {
	if (!isReflectMessage$2(value)) return value;
	if (isWrapper$2(value.message) && !field.oneof && field.fieldKind == "message") return value.message.value;
	if (value.desc.typeName == "google.protobuf.Struct" && field.parent.typeName != "google.protobuf.Value") return wktStructToLocal$2(value.message);
	return value.message;
}
function messageToReflect$2(field, value, check) {
	if (value !== void 0) {
		if (isWrapperDesc$2(field.message) && !field.oneof && field.fieldKind == "message") value = {
			$typeName: field.message.typeName,
			value: longToReflect$2(field.message.fields[0], value)
		};
		else if (field.message.typeName == "google.protobuf.Struct" && field.parent.typeName != "google.protobuf.Value" && isObject$2(value)) value = wktStructToReflect$2(value);
	}
	return new ReflectMessageImpl$2(field.message, value, check);
}
function listItemToLocal$2(field, value) {
	if (field.listKind == "message") return messageToLocal$2(field, value);
	return longToLocal$2(field, value);
}
function listItemToReflect$2(field, value, check) {
	if (field.listKind == "message") return messageToReflect$2(field, value, check);
	return longToReflect$2(field, value);
}
function mapValueToLocal$2(field, value) {
	if (field.mapKind == "message") return messageToLocal$2(field, value);
	return longToLocal$2(field, value);
}
function mapValueToReflect$2(field, value, check) {
	if (field.mapKind == "message") return messageToReflect$2(field, value, check);
	return value;
}
function mapKeyToLocal$2(key) {
	return typeof key == "string" || typeof key == "number" ? key : String(key);
}
/**
* Converts a map key (any scalar value except float, double, or bytes) from its
* representation in a message (string or number, the only possible object key
* types) to the closest possible type in ECMAScript.
*/
function mapKeyToReflect$2(key, type) {
	switch (type) {
		case ScalarType$2.STRING: return key;
		case ScalarType$2.INT32:
		case ScalarType$2.FIXED32:
		case ScalarType$2.UINT32:
		case ScalarType$2.SFIXED32:
		case ScalarType$2.SINT32: {
			const n = Number.parseInt(key);
			if (Number.isFinite(n)) return n;
			break;
		}
		case ScalarType$2.BOOL:
			switch (key) {
				case "true": return true;
				case "false": return false;
			}
			break;
		case ScalarType$2.UINT64:
		case ScalarType$2.FIXED64:
			try {
				return protoInt64$2.uParse(key);
			} catch (_a) {}
			break;
		default:
			try {
				return protoInt64$2.parse(key);
			} catch (_b) {}
			break;
	}
	return key;
}
function longToReflect$2(field, value) {
	switch (field.scalar) {
		case ScalarType$2.INT64:
		case ScalarType$2.SFIXED64:
		case ScalarType$2.SINT64:
			if ("longAsString" in field && field.longAsString && typeof value == "string") value = protoInt64$2.parse(value);
			break;
		case ScalarType$2.FIXED64:
		case ScalarType$2.UINT64:
			if ("longAsString" in field && field.longAsString && typeof value == "string") value = protoInt64$2.uParse(value);
			break;
	}
	return value;
}
function longToLocal$2(field, value) {
	switch (field.scalar) {
		case ScalarType$2.INT64:
		case ScalarType$2.SFIXED64:
		case ScalarType$2.SINT64:
			if ("longAsString" in field && field.longAsString) value = String(value);
			else if (typeof value == "string" || typeof value == "number") value = protoInt64$2.parse(value);
			break;
		case ScalarType$2.FIXED64:
		case ScalarType$2.UINT64:
			if ("longAsString" in field && field.longAsString) value = String(value);
			else if (typeof value == "string" || typeof value == "number") value = protoInt64$2.uParse(value);
			break;
	}
	return value;
}
function wktStructToReflect$2(json) {
	const struct = {
		$typeName: "google.protobuf.Struct",
		fields: {}
	};
	if (isObject$2(json)) for (const [k, v] of Object.entries(json)) struct.fields[k] = wktValueToReflect$2(v);
	return struct;
}
function wktStructToLocal$2(val) {
	const json = {};
	for (const [k, v] of Object.entries(val.fields)) json[k] = wktValueToLocal$2(v);
	return json;
}
function wktValueToLocal$2(val) {
	switch (val.kind.case) {
		case "structValue": return wktStructToLocal$2(val.kind.value);
		case "listValue": return val.kind.value.values.map(wktValueToLocal$2);
		case "nullValue":
		case void 0: return null;
		default: return val.kind.value;
	}
}
function wktValueToReflect$2(json) {
	const value = {
		$typeName: "google.protobuf.Value",
		kind: { case: void 0 }
	};
	switch (typeof json) {
		case "number":
			value.kind = {
				case: "numberValue",
				value: json
			};
			break;
		case "string":
			value.kind = {
				case: "stringValue",
				value: json
			};
			break;
		case "boolean":
			value.kind = {
				case: "boolValue",
				value: json
			};
			break;
		case "object":
			if (json === null) value.kind = {
				case: "nullValue",
				value: 0
			};
			else if (Array.isArray(json)) {
				const listValue = {
					$typeName: "google.protobuf.ListValue",
					values: []
				};
				if (Array.isArray(json)) for (const e of json) listValue.values.push(wktValueToReflect$2(e));
				value.kind = {
					case: "listValue",
					value: listValue
				};
			} else value.kind = {
				case: "structValue",
				value: wktStructToReflect$2(json)
			};
			break;
	}
	return value;
}
//#endregion
//#region ../../node_modules/@connectrpc/connect/node_modules/@bufbuild/protobuf/dist/esm/wire/base64-encoding.js
/**
* Decodes a base64 string to a byte array.
*
* - ignores white-space, including line breaks and tabs
* - allows inner padding (can decode concatenated base64 strings)
* - does not require padding
* - understands base64url encoding:
*   "-" instead of "+",
*   "_" instead of "/",
*   no padding
*/
function base64Decode$2(base64Str) {
	const table = getDecodeTable$2();
	let es = base64Str.length * 3 / 4;
	if (base64Str[base64Str.length - 2] == "=") es -= 2;
	else if (base64Str[base64Str.length - 1] == "=") es -= 1;
	let bytes = new Uint8Array(es), bytePos = 0, groupPos = 0, b, p = 0;
	for (let i = 0; i < base64Str.length; i++) {
		b = table[base64Str.charCodeAt(i)];
		if (b === void 0) switch (base64Str[i]) {
			case "=": groupPos = 0;
			case "\n":
			case "\r":
			case "	":
			case " ": continue;
			default: throw Error("invalid base64 string");
		}
		switch (groupPos) {
			case 0:
				p = b;
				groupPos = 1;
				break;
			case 1:
				bytes[bytePos++] = p << 2 | (b & 48) >> 4;
				p = b;
				groupPos = 2;
				break;
			case 2:
				bytes[bytePos++] = (p & 15) << 4 | (b & 60) >> 2;
				p = b;
				groupPos = 3;
				break;
			case 3:
				bytes[bytePos++] = (p & 3) << 6 | b;
				groupPos = 0;
				break;
		}
	}
	if (groupPos == 1) throw Error("invalid base64 string");
	return bytes.subarray(0, bytePos);
}
/**
* Encode a byte array to a base64 string.
*
* By default, this function uses the standard base64 encoding with padding.
*
* To encode without padding, use encoding = "std_raw".
*
* To encode with the URL encoding, use encoding = "url", which replaces the
* characters +/ by their URL-safe counterparts -_, and omits padding.
*/
function base64Encode(bytes, encoding = "std") {
	const table = getEncodeTable$2(encoding);
	const pad = encoding == "std";
	let base64 = "", groupPos = 0, b, p = 0;
	for (let i = 0; i < bytes.length; i++) {
		b = bytes[i];
		switch (groupPos) {
			case 0:
				base64 += table[b >> 2];
				p = (b & 3) << 4;
				groupPos = 1;
				break;
			case 1:
				base64 += table[p | b >> 4];
				p = (b & 15) << 2;
				groupPos = 2;
				break;
			case 2:
				base64 += table[p | b >> 6];
				base64 += table[b & 63];
				groupPos = 0;
				break;
		}
	}
	if (groupPos) {
		base64 += table[p];
		if (pad) {
			base64 += "=";
			if (groupPos == 1) base64 += "=";
		}
	}
	return base64;
}
var encodeTableStd$2;
var encodeTableUrl$2;
var decodeTable$2;
function getEncodeTable$2(encoding) {
	if (!encodeTableStd$2) {
		encodeTableStd$2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
		encodeTableUrl$2 = encodeTableStd$2.slice(0, -2).concat("-", "_");
	}
	return encoding == "url" ? encodeTableUrl$2 : encodeTableStd$2;
}
function getDecodeTable$2() {
	if (!decodeTable$2) {
		decodeTable$2 = [];
		const encodeTable = getEncodeTable$2("std");
		for (let i = 0; i < encodeTable.length; i++) decodeTable$2[encodeTable[i].charCodeAt(0)] = i;
		decodeTable$2["-".charCodeAt(0)] = encodeTable.indexOf("+");
		decodeTable$2["_".charCodeAt(0)] = encodeTable.indexOf("/");
	}
	return decodeTable$2;
}
//#endregion
//#region ../../node_modules/@connectrpc/connect/node_modules/@bufbuild/protobuf/dist/esm/reflect/names.js
/**
* Converts snake_case to protoCamelCase according to the convention
* used by protoc to convert a field name to a JSON name.
*/
function protoCamelCase$2(snakeCase) {
	let capNext = false;
	const b = [];
	for (let i = 0; i < snakeCase.length; i++) {
		let c = snakeCase.charAt(i);
		switch (c) {
			case "_":
				capNext = true;
				break;
			case "0":
			case "1":
			case "2":
			case "3":
			case "4":
			case "5":
			case "6":
			case "7":
			case "8":
			case "9":
				b.push(c);
				capNext = false;
				break;
			default:
				if (capNext) {
					capNext = false;
					c = c.toUpperCase();
				}
				b.push(c);
				break;
		}
	}
	return b.join("");
}
/**
* Names that cannot be used for object properties because they are reserved
* by built-in JavaScript properties.
*/
var reservedObjectProperties$2 = new Set([
	"constructor",
	"toString",
	"toJSON",
	"valueOf"
]);
/**
* Escapes names that are reserved for ECMAScript built-in object properties.
*
* Also see safeIdentifier() from @bufbuild/protoplugin.
*/
function safeObjectProperty$2(name) {
	return reservedObjectProperties$2.has(name) ? name + "$" : name;
}
//#endregion
//#region ../../node_modules/@connectrpc/connect/node_modules/@bufbuild/protobuf/dist/esm/codegenv2/restore-json-names.js
/**
* @private
*/
function restoreJsonNames$2(message) {
	for (const f of message.field) if (!unsafeIsSetExplicit$2(f, "jsonName")) f.jsonName = protoCamelCase$2(f.name);
	message.nestedType.forEach(restoreJsonNames$2);
}
//#endregion
//#region ../../node_modules/@connectrpc/connect/node_modules/@bufbuild/protobuf/dist/esm/wire/text-format.js
/**
* Parse an enum value from the Protobuf text format.
*
* @private
*/
function parseTextFormatEnumValue$2(descEnum, value) {
	const enumValue = descEnum.values.find((v) => v.name === value);
	if (!enumValue) throw new Error(`cannot parse ${descEnum} default value: ${value}`);
	return enumValue.number;
}
/**
* Parse a scalar value from the Protobuf text format.
*
* @private
*/
function parseTextFormatScalarValue$2(type, value) {
	switch (type) {
		case ScalarType$2.STRING: return value;
		case ScalarType$2.BYTES: {
			const u = unescapeBytesDefaultValue$2(value);
			if (u === false) throw new Error(`cannot parse ${ScalarType$2[type]} default value: ${value}`);
			return u;
		}
		case ScalarType$2.INT64:
		case ScalarType$2.SFIXED64:
		case ScalarType$2.SINT64: return protoInt64$2.parse(value);
		case ScalarType$2.UINT64:
		case ScalarType$2.FIXED64: return protoInt64$2.uParse(value);
		case ScalarType$2.DOUBLE:
		case ScalarType$2.FLOAT: switch (value) {
			case "inf": return Number.POSITIVE_INFINITY;
			case "-inf": return Number.NEGATIVE_INFINITY;
			case "nan": return NaN;
			default: return parseFloat(value);
		}
		case ScalarType$2.BOOL: return value === "true";
		case ScalarType$2.INT32:
		case ScalarType$2.UINT32:
		case ScalarType$2.SINT32:
		case ScalarType$2.FIXED32:
		case ScalarType$2.SFIXED32: return parseInt(value, 10);
	}
}
/**
* Parses a text-encoded default value (proto2) of a BYTES field.
*/
function unescapeBytesDefaultValue$2(str) {
	const b = [];
	const input = {
		tail: str,
		c: "",
		next() {
			if (this.tail.length == 0) return false;
			this.c = this.tail[0];
			this.tail = this.tail.substring(1);
			return true;
		},
		take(n) {
			if (this.tail.length >= n) {
				const r = this.tail.substring(0, n);
				this.tail = this.tail.substring(n);
				return r;
			}
			return false;
		}
	};
	while (input.next()) switch (input.c) {
		case "\\":
			if (input.next()) switch (input.c) {
				case "\\":
					b.push(input.c.charCodeAt(0));
					break;
				case "b":
					b.push(8);
					break;
				case "f":
					b.push(12);
					break;
				case "n":
					b.push(10);
					break;
				case "r":
					b.push(13);
					break;
				case "t":
					b.push(9);
					break;
				case "v":
					b.push(11);
					break;
				case "0":
				case "1":
				case "2":
				case "3":
				case "4":
				case "5":
				case "6":
				case "7": {
					const s = input.c;
					const t = input.take(2);
					if (t === false) return false;
					const n = parseInt(s + t, 8);
					if (Number.isNaN(n)) return false;
					b.push(n);
					break;
				}
				case "x": {
					const s = input.c;
					const t = input.take(2);
					if (t === false) return false;
					const n = parseInt(s + t, 16);
					if (Number.isNaN(n)) return false;
					b.push(n);
					break;
				}
				case "u": {
					const s = input.c;
					const t = input.take(4);
					if (t === false) return false;
					const n = parseInt(s + t, 16);
					if (Number.isNaN(n)) return false;
					const chunk = new Uint8Array(4);
					new DataView(chunk.buffer).setInt32(0, n, true);
					b.push(chunk[0], chunk[1], chunk[2], chunk[3]);
					break;
				}
				case "U": {
					const s = input.c;
					const t = input.take(8);
					if (t === false) return false;
					const tc = protoInt64$2.uEnc(s + t);
					const chunk = new Uint8Array(8);
					const view = new DataView(chunk.buffer);
					view.setInt32(0, tc.lo, true);
					view.setInt32(4, tc.hi, true);
					b.push(chunk[0], chunk[1], chunk[2], chunk[3], chunk[4], chunk[5], chunk[6], chunk[7]);
					break;
				}
			}
			break;
		default: b.push(input.c.charCodeAt(0));
	}
	return new Uint8Array(b);
}
//#endregion
//#region ../../node_modules/@connectrpc/connect/node_modules/@bufbuild/protobuf/dist/esm/reflect/nested-types.js
/**
* Iterate over all types - enumerations, extensions, services, messages -
* and enumerations, extensions and messages nested in messages.
*/
function* nestedTypes$2(desc) {
	switch (desc.kind) {
		case "file":
			for (const message of desc.messages) {
				yield message;
				yield* nestedTypes$2(message);
			}
			yield* desc.enums;
			yield* desc.services;
			yield* desc.extensions;
			break;
		case "message":
			for (const message of desc.nestedMessages) {
				yield message;
				yield* nestedTypes$2(message);
			}
			yield* desc.nestedEnums;
			yield* desc.nestedExtensions;
			break;
	}
}
//#endregion
//#region ../../node_modules/@connectrpc/connect/node_modules/@bufbuild/protobuf/dist/esm/registry.js
function createFileRegistry$2(...args) {
	const registry = createBaseRegistry$2();
	if (!args.length) return registry;
	if ("$typeName" in args[0] && args[0].$typeName == "google.protobuf.FileDescriptorSet") {
		for (const file of args[0].file) addFile$2(file, registry);
		return registry;
	}
	if ("$typeName" in args[0]) {
		const input = args[0];
		const resolve = args[1];
		const seen = /* @__PURE__ */ new Set();
		function recurseDeps(file) {
			const deps = [];
			for (const protoFileName of file.dependency) {
				if (registry.getFile(protoFileName) != void 0) continue;
				if (seen.has(protoFileName)) continue;
				const dep = resolve(protoFileName);
				if (!dep) throw new Error(`Unable to resolve ${protoFileName}, imported by ${file.name}`);
				if ("kind" in dep) registry.addFile(dep, false, true);
				else {
					seen.add(dep.name);
					deps.push(dep);
				}
			}
			return deps.concat(...deps.map(recurseDeps));
		}
		for (const file of [input, ...recurseDeps(input)].reverse()) addFile$2(file, registry);
	} else for (const fileReg of args) for (const file of fileReg.files) registry.addFile(file);
	return registry;
}
/**
* @private
*/
function createBaseRegistry$2() {
	const types = /* @__PURE__ */ new Map();
	const extendees = /* @__PURE__ */ new Map();
	const files = /* @__PURE__ */ new Map();
	return {
		kind: "registry",
		types,
		extendees,
		[Symbol.iterator]() {
			return types.values();
		},
		get files() {
			return files.values();
		},
		addFile(file, skipTypes, withDeps) {
			files.set(file.proto.name, file);
			if (!skipTypes) for (const type of nestedTypes$2(file)) this.add(type);
			if (withDeps) for (const f of file.dependencies) this.addFile(f, skipTypes, withDeps);
		},
		add(desc) {
			if (desc.kind == "extension") {
				let numberToExt = extendees.get(desc.extendee.typeName);
				if (!numberToExt) extendees.set(desc.extendee.typeName, numberToExt = /* @__PURE__ */ new Map());
				numberToExt.set(desc.number, desc);
			}
			types.set(desc.typeName, desc);
		},
		get(typeName) {
			return types.get(typeName);
		},
		getFile(fileName) {
			return files.get(fileName);
		},
		getMessage(typeName) {
			const t = types.get(typeName);
			return (t === null || t === void 0 ? void 0 : t.kind) == "message" ? t : void 0;
		},
		getEnum(typeName) {
			const t = types.get(typeName);
			return (t === null || t === void 0 ? void 0 : t.kind) == "enum" ? t : void 0;
		},
		getExtension(typeName) {
			const t = types.get(typeName);
			return (t === null || t === void 0 ? void 0 : t.kind) == "extension" ? t : void 0;
		},
		getExtensionFor(extendee, no) {
			var _a;
			return (_a = extendees.get(extendee.typeName)) === null || _a === void 0 ? void 0 : _a.get(no);
		},
		getService(typeName) {
			const t = types.get(typeName);
			return (t === null || t === void 0 ? void 0 : t.kind) == "service" ? t : void 0;
		}
	};
}
var EDITION_PROTO2$4 = 998;
var EDITION_PROTO3$4 = 999;
var TYPE_STRING$2 = 9;
var TYPE_GROUP$2 = 10;
var TYPE_MESSAGE$2 = 11;
var TYPE_BYTES$2 = 12;
var TYPE_ENUM$2 = 14;
var LABEL_REPEATED$2 = 3;
var LABEL_REQUIRED$2 = 2;
var JS_STRING$2 = 1;
var IDEMPOTENCY_UNKNOWN$2 = 0;
var EXPLICIT$2 = 1;
var IMPLICIT$7 = 2;
var LEGACY_REQUIRED$5 = 3;
var PACKED$2 = 1;
var DELIMITED$2 = 2;
var OPEN$2 = 1;
var featureDefaults$2 = {
	998: {
		fieldPresence: 1,
		enumType: 2,
		repeatedFieldEncoding: 2,
		utf8Validation: 3,
		messageEncoding: 1,
		jsonFormat: 2,
		enforceNamingStyle: 2,
		defaultSymbolVisibility: 1
	},
	999: {
		fieldPresence: 2,
		enumType: 1,
		repeatedFieldEncoding: 1,
		utf8Validation: 2,
		messageEncoding: 1,
		jsonFormat: 1,
		enforceNamingStyle: 2,
		defaultSymbolVisibility: 1
	},
	1e3: {
		fieldPresence: 1,
		enumType: 1,
		repeatedFieldEncoding: 1,
		utf8Validation: 2,
		messageEncoding: 1,
		jsonFormat: 1,
		enforceNamingStyle: 2,
		defaultSymbolVisibility: 1
	},
	1001: {
		fieldPresence: 1,
		enumType: 1,
		repeatedFieldEncoding: 1,
		utf8Validation: 2,
		messageEncoding: 1,
		jsonFormat: 1,
		enforceNamingStyle: 1,
		defaultSymbolVisibility: 2
	}
};
/**
* Create a descriptor for a file, add it to the registry.
*/
function addFile$2(proto, reg) {
	var _a, _b;
	const file = {
		kind: "file",
		proto,
		deprecated: (_b = (_a = proto.options) === null || _a === void 0 ? void 0 : _a.deprecated) !== null && _b !== void 0 ? _b : false,
		edition: getFileEdition$2(proto),
		name: proto.name.replace(/\.proto$/, ""),
		dependencies: findFileDependencies$2(proto, reg),
		enums: [],
		messages: [],
		extensions: [],
		services: [],
		toString() {
			return `file ${proto.name}`;
		}
	};
	const mapEntriesStore = /* @__PURE__ */ new Map();
	const mapEntries = {
		get(typeName) {
			return mapEntriesStore.get(typeName);
		},
		add(desc) {
			var _a;
			assert$2(((_a = desc.proto.options) === null || _a === void 0 ? void 0 : _a.mapEntry) === true);
			mapEntriesStore.set(desc.typeName, desc);
		}
	};
	for (const enumProto of proto.enumType) addEnum$2(enumProto, file, void 0, reg);
	for (const messageProto of proto.messageType) addMessage$2(messageProto, file, void 0, reg, mapEntries);
	for (const serviceProto of proto.service) addService$2(serviceProto, file, reg);
	addExtensions$2(file, reg);
	for (const mapEntry of mapEntriesStore.values()) addFields$2(mapEntry, reg, mapEntries);
	for (const message of file.messages) {
		addFields$2(message, reg, mapEntries);
		addExtensions$2(message, reg);
	}
	reg.addFile(file, true);
}
/**
* Create descriptors for extensions, and add them to the message / file,
* and to our cart.
* Recurses into nested types.
*/
function addExtensions$2(desc, reg) {
	switch (desc.kind) {
		case "file":
			for (const proto of desc.proto.extension) {
				const ext = newField$2(proto, desc, reg);
				desc.extensions.push(ext);
				reg.add(ext);
			}
			break;
		case "message":
			for (const proto of desc.proto.extension) {
				const ext = newField$2(proto, desc, reg);
				desc.nestedExtensions.push(ext);
				reg.add(ext);
			}
			for (const message of desc.nestedMessages) addExtensions$2(message, reg);
			break;
	}
}
/**
* Create descriptors for fields and oneof groups, and add them to the message.
* Recurses into nested types.
*/
function addFields$2(message, reg, mapEntries) {
	const allOneofs = message.proto.oneofDecl.map((proto) => newOneof$2(proto, message));
	const oneofsSeen = /* @__PURE__ */ new Set();
	for (const proto of message.proto.field) {
		const oneof = findOneof$2(proto, allOneofs);
		const field = newField$2(proto, message, reg, oneof, mapEntries);
		message.fields.push(field);
		message.field[field.localName] = field;
		if (oneof === void 0) message.members.push(field);
		else {
			oneof.fields.push(field);
			if (!oneofsSeen.has(oneof)) {
				oneofsSeen.add(oneof);
				message.members.push(oneof);
			}
		}
	}
	for (const oneof of allOneofs.filter((o) => oneofsSeen.has(o))) message.oneofs.push(oneof);
	for (const child of message.nestedMessages) addFields$2(child, reg, mapEntries);
}
/**
* Create a descriptor for an enumeration, and add it our cart and to the
* parent type, if any.
*/
function addEnum$2(proto, file, parent, reg) {
	var _a, _b, _c, _d, _e;
	const sharedPrefix = findEnumSharedPrefix$2(proto.name, proto.value);
	const desc = {
		kind: "enum",
		proto,
		deprecated: (_b = (_a = proto.options) === null || _a === void 0 ? void 0 : _a.deprecated) !== null && _b !== void 0 ? _b : false,
		file,
		parent,
		open: true,
		name: proto.name,
		typeName: makeTypeName$2(proto, parent, file),
		value: {},
		values: [],
		sharedPrefix,
		toString() {
			return `enum ${this.typeName}`;
		}
	};
	desc.open = isEnumOpen$2(desc);
	reg.add(desc);
	for (const p of proto.value) {
		const name = p.name;
		desc.values.push(desc.value[p.number] = {
			kind: "enum_value",
			proto: p,
			deprecated: (_d = (_c = p.options) === null || _c === void 0 ? void 0 : _c.deprecated) !== null && _d !== void 0 ? _d : false,
			parent: desc,
			name,
			localName: safeObjectProperty$2(sharedPrefix == void 0 ? name : name.substring(sharedPrefix.length)),
			number: p.number,
			toString() {
				return `enum value ${desc.typeName}.${name}`;
			}
		});
	}
	((_e = parent === null || parent === void 0 ? void 0 : parent.nestedEnums) !== null && _e !== void 0 ? _e : file.enums).push(desc);
}
/**
* Create a descriptor for a message, including nested types, and add it to our
* cart. Note that this does not create descriptors fields.
*/
function addMessage$2(proto, file, parent, reg, mapEntries) {
	var _a, _b, _c, _d;
	const desc = {
		kind: "message",
		proto,
		deprecated: (_b = (_a = proto.options) === null || _a === void 0 ? void 0 : _a.deprecated) !== null && _b !== void 0 ? _b : false,
		file,
		parent,
		name: proto.name,
		typeName: makeTypeName$2(proto, parent, file),
		fields: [],
		field: {},
		oneofs: [],
		members: [],
		nestedEnums: [],
		nestedMessages: [],
		nestedExtensions: [],
		toString() {
			return `message ${this.typeName}`;
		}
	};
	if (((_c = proto.options) === null || _c === void 0 ? void 0 : _c.mapEntry) === true) mapEntries.add(desc);
	else {
		((_d = parent === null || parent === void 0 ? void 0 : parent.nestedMessages) !== null && _d !== void 0 ? _d : file.messages).push(desc);
		reg.add(desc);
	}
	for (const enumProto of proto.enumType) addEnum$2(enumProto, file, desc, reg);
	for (const messageProto of proto.nestedType) addMessage$2(messageProto, file, desc, reg, mapEntries);
}
/**
* Create a descriptor for a service, including methods, and add it to our
* cart.
*/
function addService$2(proto, file, reg) {
	var _a, _b;
	const desc = {
		kind: "service",
		proto,
		deprecated: (_b = (_a = proto.options) === null || _a === void 0 ? void 0 : _a.deprecated) !== null && _b !== void 0 ? _b : false,
		file,
		name: proto.name,
		typeName: makeTypeName$2(proto, void 0, file),
		methods: [],
		method: {},
		toString() {
			return `service ${this.typeName}`;
		}
	};
	file.services.push(desc);
	reg.add(desc);
	for (const methodProto of proto.method) {
		const method = newMethod$2(methodProto, desc, reg);
		desc.methods.push(method);
		desc.method[method.localName] = method;
	}
}
/**
* Create a descriptor for a method.
*/
function newMethod$2(proto, parent, reg) {
	var _a, _b, _c, _d;
	let methodKind;
	if (proto.clientStreaming && proto.serverStreaming) methodKind = "bidi_streaming";
	else if (proto.clientStreaming) methodKind = "client_streaming";
	else if (proto.serverStreaming) methodKind = "server_streaming";
	else methodKind = "unary";
	const input = reg.getMessage(trimLeadingDot$2(proto.inputType));
	const output = reg.getMessage(trimLeadingDot$2(proto.outputType));
	assert$2(input, `invalid MethodDescriptorProto: input_type ${proto.inputType} not found`);
	assert$2(output, `invalid MethodDescriptorProto: output_type ${proto.inputType} not found`);
	const name = proto.name;
	return {
		kind: "rpc",
		proto,
		deprecated: (_b = (_a = proto.options) === null || _a === void 0 ? void 0 : _a.deprecated) !== null && _b !== void 0 ? _b : false,
		parent,
		name,
		localName: safeObjectProperty$2(name.length ? safeObjectProperty$2(name[0].toLowerCase() + name.substring(1)) : name),
		methodKind,
		input,
		output,
		idempotency: (_d = (_c = proto.options) === null || _c === void 0 ? void 0 : _c.idempotencyLevel) !== null && _d !== void 0 ? _d : IDEMPOTENCY_UNKNOWN$2,
		toString() {
			return `rpc ${parent.typeName}.${name}`;
		}
	};
}
/**
* Create a descriptor for a oneof group.
*/
function newOneof$2(proto, parent) {
	return {
		kind: "oneof",
		proto,
		deprecated: false,
		parent,
		fields: [],
		name: proto.name,
		localName: safeObjectProperty$2(protoCamelCase$2(proto.name)),
		toString() {
			return `oneof ${parent.typeName}.${this.name}`;
		}
	};
}
function newField$2(proto, parentOrFile, reg, oneof, mapEntries) {
	var _a, _b, _c;
	const isExtension = mapEntries === void 0;
	const field = {
		kind: "field",
		proto,
		deprecated: (_b = (_a = proto.options) === null || _a === void 0 ? void 0 : _a.deprecated) !== null && _b !== void 0 ? _b : false,
		name: proto.name,
		number: proto.number,
		scalar: void 0,
		message: void 0,
		enum: void 0,
		presence: getFieldPresence$2(proto, oneof, isExtension, parentOrFile),
		listKind: void 0,
		mapKind: void 0,
		mapKey: void 0,
		delimitedEncoding: void 0,
		packed: void 0,
		longAsString: false,
		getDefaultValue: void 0
	};
	if (isExtension) {
		const file = parentOrFile.kind == "file" ? parentOrFile : parentOrFile.file;
		const parent = parentOrFile.kind == "file" ? void 0 : parentOrFile;
		const typeName = makeTypeName$2(proto, parent, file);
		field.kind = "extension";
		field.file = file;
		field.parent = parent;
		field.oneof = void 0;
		field.typeName = typeName;
		field.jsonName = `[${typeName}]`;
		field.toString = () => `extension ${typeName}`;
		const extendee = reg.getMessage(trimLeadingDot$2(proto.extendee));
		assert$2(extendee, `invalid FieldDescriptorProto: extendee ${proto.extendee} not found`);
		field.extendee = extendee;
	} else {
		const parent = parentOrFile;
		assert$2(parent.kind == "message");
		field.parent = parent;
		field.oneof = oneof;
		field.localName = oneof ? protoCamelCase$2(proto.name) : safeObjectProperty$2(protoCamelCase$2(proto.name));
		field.jsonName = proto.jsonName;
		field.toString = () => `field ${parent.typeName}.${proto.name}`;
	}
	const label = proto.label;
	const type = proto.type;
	const jstype = (_c = proto.options) === null || _c === void 0 ? void 0 : _c.jstype;
	if (label === LABEL_REPEATED$2) {
		const mapEntry = type == TYPE_MESSAGE$2 ? mapEntries === null || mapEntries === void 0 ? void 0 : mapEntries.get(trimLeadingDot$2(proto.typeName)) : void 0;
		if (mapEntry) {
			field.fieldKind = "map";
			const { key, value } = findMapEntryFields$2(mapEntry);
			field.mapKey = key.scalar;
			field.mapKind = value.fieldKind;
			field.message = value.message;
			field.delimitedEncoding = false;
			field.enum = value.enum;
			field.scalar = value.scalar;
			return field;
		}
		field.fieldKind = "list";
		switch (type) {
			case TYPE_MESSAGE$2:
			case TYPE_GROUP$2:
				field.listKind = "message";
				field.message = reg.getMessage(trimLeadingDot$2(proto.typeName));
				assert$2(field.message);
				field.delimitedEncoding = isDelimitedEncoding$2(proto, parentOrFile);
				break;
			case TYPE_ENUM$2:
				field.listKind = "enum";
				field.enum = reg.getEnum(trimLeadingDot$2(proto.typeName));
				assert$2(field.enum);
				break;
			default:
				field.listKind = "scalar";
				field.scalar = type;
				field.longAsString = jstype == JS_STRING$2;
				break;
		}
		field.packed = isPackedField$2(proto, parentOrFile);
		return field;
	}
	switch (type) {
		case TYPE_MESSAGE$2:
		case TYPE_GROUP$2:
			field.fieldKind = "message";
			field.message = reg.getMessage(trimLeadingDot$2(proto.typeName));
			assert$2(field.message, `invalid FieldDescriptorProto: type_name ${proto.typeName} not found`);
			field.delimitedEncoding = isDelimitedEncoding$2(proto, parentOrFile);
			field.getDefaultValue = () => void 0;
			break;
		case TYPE_ENUM$2: {
			const enumeration = reg.getEnum(trimLeadingDot$2(proto.typeName));
			assert$2(enumeration !== void 0, `invalid FieldDescriptorProto: type_name ${proto.typeName} not found`);
			field.fieldKind = "enum";
			field.enum = reg.getEnum(trimLeadingDot$2(proto.typeName));
			field.getDefaultValue = () => {
				return unsafeIsSetExplicit$2(proto, "defaultValue") ? parseTextFormatEnumValue$2(enumeration, proto.defaultValue) : void 0;
			};
			break;
		}
		default:
			field.fieldKind = "scalar";
			field.scalar = type;
			field.longAsString = jstype == JS_STRING$2;
			field.getDefaultValue = () => {
				return unsafeIsSetExplicit$2(proto, "defaultValue") ? parseTextFormatScalarValue$2(type, proto.defaultValue) : void 0;
			};
			break;
	}
	return field;
}
/**
* Parse the "syntax" and "edition" fields, returning one of the supported
* editions.
*/
function getFileEdition$2(proto) {
	switch (proto.syntax) {
		case "":
		case "proto2": return EDITION_PROTO2$4;
		case "proto3": return EDITION_PROTO3$4;
		case "editions":
			if (proto.edition in featureDefaults$2) return proto.edition;
			throw new Error(`${proto.name}: unsupported edition`);
		default: throw new Error(`${proto.name}: unsupported syntax "${proto.syntax}"`);
	}
}
/**
* Resolve dependencies of FileDescriptorProto to DescFile.
*/
function findFileDependencies$2(proto, reg) {
	return proto.dependency.map((wantName) => {
		const dep = reg.getFile(wantName);
		if (!dep) throw new Error(`Cannot find ${wantName}, imported by ${proto.name}`);
		return dep;
	});
}
/**
* Finds a prefix shared by enum values, for example `my_enum_` for
* `enum MyEnum {MY_ENUM_A=0; MY_ENUM_B=1;}`.
*/
function findEnumSharedPrefix$2(enumName, values) {
	const prefix = camelToSnakeCase$2(enumName) + "_";
	for (const value of values) {
		if (!value.name.toLowerCase().startsWith(prefix)) return;
		const shortName = value.name.substring(prefix.length);
		if (shortName.length == 0) return;
		if (/^\d/.test(shortName)) return;
	}
	return prefix;
}
/**
* Converts lowerCamelCase or UpperCamelCase into lower_snake_case.
* This is used to find shared prefixes in an enum.
*/
function camelToSnakeCase$2(camel) {
	return (camel.substring(0, 1) + camel.substring(1).replace(/[A-Z]/g, (c) => "_" + c)).toLowerCase();
}
/**
* Create a fully qualified name for a protobuf type or extension field.
*
* The fully qualified name for messages, enumerations, and services is
* constructed by concatenating the package name (if present), parent
* message names (for nested types), and the type name. We omit the leading
* dot added by protobuf compilers. Examples:
* - mypackage.MyMessage
* - mypackage.MyMessage.NestedMessage
*
* The fully qualified name for extension fields is constructed by
* concatenating the package name (if present), parent message names (for
* extensions declared within a message), and the field name. Examples:
* - mypackage.extfield
* - mypackage.MyMessage.extfield
*/
function makeTypeName$2(proto, parent, file) {
	let typeName;
	if (parent) typeName = `${parent.typeName}.${proto.name}`;
	else if (file.proto.package.length > 0) typeName = `${file.proto.package}.${proto.name}`;
	else typeName = `${proto.name}`;
	return typeName;
}
/**
* Remove the leading dot from a fully qualified type name.
*/
function trimLeadingDot$2(typeName) {
	return typeName.startsWith(".") ? typeName.substring(1) : typeName;
}
/**
* Did the user put the field in a oneof group?
* Synthetic oneofs for proto3 optionals are ignored.
*/
function findOneof$2(proto, allOneofs) {
	if (!unsafeIsSetExplicit$2(proto, "oneofIndex")) return;
	if (proto.proto3Optional) return;
	const oneof = allOneofs[proto.oneofIndex];
	assert$2(oneof, `invalid FieldDescriptorProto: oneof #${proto.oneofIndex} for field #${proto.number} not found`);
	return oneof;
}
/**
* Presence of the field.
* See https://protobuf.dev/programming-guides/field_presence/
*/
function getFieldPresence$2(proto, oneof, isExtension, parent) {
	if (proto.label == LABEL_REQUIRED$2) return LEGACY_REQUIRED$5;
	if (proto.label == LABEL_REPEATED$2) return IMPLICIT$7;
	if (!!oneof || proto.proto3Optional) return EXPLICIT$2;
	if (isExtension) return EXPLICIT$2;
	const resolved = resolveFeature$2("fieldPresence", {
		proto,
		parent
	});
	if (resolved == IMPLICIT$7 && (proto.type == TYPE_MESSAGE$2 || proto.type == TYPE_GROUP$2)) return EXPLICIT$2;
	return resolved;
}
/**
* Pack this repeated field?
*/
function isPackedField$2(proto, parent) {
	if (proto.label != LABEL_REPEATED$2) return false;
	switch (proto.type) {
		case TYPE_STRING$2:
		case TYPE_BYTES$2:
		case TYPE_GROUP$2:
		case TYPE_MESSAGE$2: return false;
	}
	const o = proto.options;
	if (o && unsafeIsSetExplicit$2(o, "packed")) return o.packed;
	return PACKED$2 == resolveFeature$2("repeatedFieldEncoding", {
		proto,
		parent
	});
}
/**
* Find the key and value fields of a synthetic map entry message.
*/
function findMapEntryFields$2(mapEntry) {
	const key = mapEntry.fields.find((f) => f.number === 1);
	const value = mapEntry.fields.find((f) => f.number === 2);
	assert$2(key && key.fieldKind == "scalar" && key.scalar != ScalarType$2.BYTES && key.scalar != ScalarType$2.FLOAT && key.scalar != ScalarType$2.DOUBLE && value && value.fieldKind != "list" && value.fieldKind != "map");
	return {
		key,
		value
	};
}
/**
* Enumerations can be open or closed.
* See https://protobuf.dev/programming-guides/enum/
*/
function isEnumOpen$2(desc) {
	var _a;
	return OPEN$2 == resolveFeature$2("enumType", {
		proto: desc.proto,
		parent: (_a = desc.parent) !== null && _a !== void 0 ? _a : desc.file
	});
}
/**
* Encode the message delimited (a.k.a. proto2 group encoding), or
* length-prefixed?
*/
function isDelimitedEncoding$2(proto, parent) {
	if (proto.type == TYPE_GROUP$2) return true;
	return DELIMITED$2 == resolveFeature$2("messageEncoding", {
		proto,
		parent
	});
}
function resolveFeature$2(name, ref) {
	var _a, _b;
	const featureSet = (_a = ref.proto.options) === null || _a === void 0 ? void 0 : _a.features;
	if (featureSet) {
		const val = featureSet[name];
		if (val != 0) return val;
	}
	if ("kind" in ref) {
		if (ref.kind == "message") return resolveFeature$2(name, (_b = ref.parent) !== null && _b !== void 0 ? _b : ref.file);
		const editionDefaults = featureDefaults$2[ref.edition];
		if (!editionDefaults) throw new Error(`feature default for edition ${ref.edition} not found`);
		return editionDefaults[name];
	}
	return resolveFeature$2(name, ref.parent);
}
/**
* Assert that condition is truthy or throw error (with message)
*/
function assert$2(condition, msg) {
	if (!condition) throw new Error(msg);
}
//#endregion
//#region ../../node_modules/@connectrpc/connect/node_modules/@bufbuild/protobuf/dist/esm/codegenv2/boot.js
/**
* Hydrate a file descriptor for google/protobuf/descriptor.proto from a plain
* object.
*
* See createFileDescriptorProtoBoot() for details.
*
* @private
*/
function boot$2(boot) {
	const root = bootFileDescriptorProto$2(boot);
	root.messageType.forEach(restoreJsonNames$2);
	return createFileRegistry$2(root, () => void 0).getFile(root.name);
}
/**
* Creates the message google.protobuf.FileDescriptorProto from an object literal.
*
* See createFileDescriptorProtoBoot() for details.
*
* @private
*/
function bootFileDescriptorProto$2(init) {
	return Object.assign(Object.create({
		syntax: "",
		edition: 0
	}), Object.assign(Object.assign({
		$typeName: "google.protobuf.FileDescriptorProto",
		dependency: [],
		publicDependency: [],
		weakDependency: [],
		optionDependency: [],
		service: [],
		extension: []
	}, init), {
		messageType: init.messageType.map(bootDescriptorProto$2),
		enumType: init.enumType.map(bootEnumDescriptorProto$2)
	}));
}
function bootDescriptorProto$2(init) {
	var _a, _b, _c, _d, _e, _f, _g, _h;
	return Object.assign(Object.create({ visibility: 0 }), {
		$typeName: "google.protobuf.DescriptorProto",
		name: init.name,
		field: (_b = (_a = init.field) === null || _a === void 0 ? void 0 : _a.map(bootFieldDescriptorProto$2)) !== null && _b !== void 0 ? _b : [],
		extension: [],
		nestedType: (_d = (_c = init.nestedType) === null || _c === void 0 ? void 0 : _c.map(bootDescriptorProto$2)) !== null && _d !== void 0 ? _d : [],
		enumType: (_f = (_e = init.enumType) === null || _e === void 0 ? void 0 : _e.map(bootEnumDescriptorProto$2)) !== null && _f !== void 0 ? _f : [],
		extensionRange: (_h = (_g = init.extensionRange) === null || _g === void 0 ? void 0 : _g.map((e) => Object.assign({ $typeName: "google.protobuf.DescriptorProto.ExtensionRange" }, e))) !== null && _h !== void 0 ? _h : [],
		oneofDecl: [],
		reservedRange: [],
		reservedName: []
	});
}
function bootFieldDescriptorProto$2(init) {
	return Object.assign(Object.create({
		label: 1,
		typeName: "",
		extendee: "",
		defaultValue: "",
		oneofIndex: 0,
		jsonName: "",
		proto3Optional: false
	}), Object.assign(Object.assign({ $typeName: "google.protobuf.FieldDescriptorProto" }, init), { options: init.options ? bootFieldOptions$2(init.options) : void 0 }));
}
function bootFieldOptions$2(init) {
	var _a, _b, _c;
	return Object.assign(Object.create({
		ctype: 0,
		packed: false,
		jstype: 0,
		lazy: false,
		unverifiedLazy: false,
		deprecated: false,
		weak: false,
		debugRedact: false,
		retention: 0
	}), Object.assign(Object.assign({ $typeName: "google.protobuf.FieldOptions" }, init), {
		targets: (_a = init.targets) !== null && _a !== void 0 ? _a : [],
		editionDefaults: (_c = (_b = init.editionDefaults) === null || _b === void 0 ? void 0 : _b.map((e) => Object.assign({ $typeName: "google.protobuf.FieldOptions.EditionDefault" }, e))) !== null && _c !== void 0 ? _c : [],
		uninterpretedOption: []
	}));
}
function bootEnumDescriptorProto$2(init) {
	return Object.assign(Object.create({ visibility: 0 }), {
		$typeName: "google.protobuf.EnumDescriptorProto",
		name: init.name,
		reservedName: [],
		reservedRange: [],
		value: init.value.map((e) => Object.assign({ $typeName: "google.protobuf.EnumValueDescriptorProto" }, e))
	});
}
//#endregion
//#region ../../node_modules/@connectrpc/connect/node_modules/@bufbuild/protobuf/dist/esm/codegenv2/message.js
/**
* Hydrate a message descriptor.
*
* @private
*/
function messageDesc$2(file, path, ...paths) {
	return paths.reduce((acc, cur) => acc.nestedMessages[cur], file.messages[path]);
}
/**
* Describes the message google.protobuf.FileDescriptorProto.
* Use `create(FileDescriptorProtoSchema)` to create a new message.
*/
var FileDescriptorProtoSchema$2 = /* @__PURE__ */ messageDesc$2(/* @__PURE__ */ boot$2({
	"name": "google/protobuf/descriptor.proto",
	"package": "google.protobuf",
	"messageType": [
		{
			"name": "FileDescriptorSet",
			"field": [{
				"name": "file",
				"number": 1,
				"type": 11,
				"label": 3,
				"typeName": ".google.protobuf.FileDescriptorProto"
			}],
			"extensionRange": [{
				"start": 536e6,
				"end": 536000001
			}]
		},
		{
			"name": "FileDescriptorProto",
			"field": [
				{
					"name": "name",
					"number": 1,
					"type": 9,
					"label": 1
				},
				{
					"name": "package",
					"number": 2,
					"type": 9,
					"label": 1
				},
				{
					"name": "dependency",
					"number": 3,
					"type": 9,
					"label": 3
				},
				{
					"name": "public_dependency",
					"number": 10,
					"type": 5,
					"label": 3
				},
				{
					"name": "weak_dependency",
					"number": 11,
					"type": 5,
					"label": 3
				},
				{
					"name": "option_dependency",
					"number": 15,
					"type": 9,
					"label": 3
				},
				{
					"name": "message_type",
					"number": 4,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.DescriptorProto"
				},
				{
					"name": "enum_type",
					"number": 5,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.EnumDescriptorProto"
				},
				{
					"name": "service",
					"number": 6,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.ServiceDescriptorProto"
				},
				{
					"name": "extension",
					"number": 7,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.FieldDescriptorProto"
				},
				{
					"name": "options",
					"number": 8,
					"type": 11,
					"label": 1,
					"typeName": ".google.protobuf.FileOptions"
				},
				{
					"name": "source_code_info",
					"number": 9,
					"type": 11,
					"label": 1,
					"typeName": ".google.protobuf.SourceCodeInfo"
				},
				{
					"name": "syntax",
					"number": 12,
					"type": 9,
					"label": 1
				},
				{
					"name": "edition",
					"number": 14,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.Edition"
				}
			]
		},
		{
			"name": "DescriptorProto",
			"field": [
				{
					"name": "name",
					"number": 1,
					"type": 9,
					"label": 1
				},
				{
					"name": "field",
					"number": 2,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.FieldDescriptorProto"
				},
				{
					"name": "extension",
					"number": 6,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.FieldDescriptorProto"
				},
				{
					"name": "nested_type",
					"number": 3,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.DescriptorProto"
				},
				{
					"name": "enum_type",
					"number": 4,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.EnumDescriptorProto"
				},
				{
					"name": "extension_range",
					"number": 5,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.DescriptorProto.ExtensionRange"
				},
				{
					"name": "oneof_decl",
					"number": 8,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.OneofDescriptorProto"
				},
				{
					"name": "options",
					"number": 7,
					"type": 11,
					"label": 1,
					"typeName": ".google.protobuf.MessageOptions"
				},
				{
					"name": "reserved_range",
					"number": 9,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.DescriptorProto.ReservedRange"
				},
				{
					"name": "reserved_name",
					"number": 10,
					"type": 9,
					"label": 3
				},
				{
					"name": "visibility",
					"number": 11,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.SymbolVisibility"
				}
			],
			"nestedType": [{
				"name": "ExtensionRange",
				"field": [
					{
						"name": "start",
						"number": 1,
						"type": 5,
						"label": 1
					},
					{
						"name": "end",
						"number": 2,
						"type": 5,
						"label": 1
					},
					{
						"name": "options",
						"number": 3,
						"type": 11,
						"label": 1,
						"typeName": ".google.protobuf.ExtensionRangeOptions"
					}
				]
			}, {
				"name": "ReservedRange",
				"field": [{
					"name": "start",
					"number": 1,
					"type": 5,
					"label": 1
				}, {
					"name": "end",
					"number": 2,
					"type": 5,
					"label": 1
				}]
			}]
		},
		{
			"name": "ExtensionRangeOptions",
			"field": [
				{
					"name": "uninterpreted_option",
					"number": 999,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.UninterpretedOption"
				},
				{
					"name": "declaration",
					"number": 2,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.ExtensionRangeOptions.Declaration",
					"options": { "retention": 2 }
				},
				{
					"name": "features",
					"number": 50,
					"type": 11,
					"label": 1,
					"typeName": ".google.protobuf.FeatureSet"
				},
				{
					"name": "verification",
					"number": 3,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.ExtensionRangeOptions.VerificationState",
					"defaultValue": "UNVERIFIED",
					"options": { "retention": 2 }
				}
			],
			"nestedType": [{
				"name": "Declaration",
				"field": [
					{
						"name": "number",
						"number": 1,
						"type": 5,
						"label": 1
					},
					{
						"name": "full_name",
						"number": 2,
						"type": 9,
						"label": 1
					},
					{
						"name": "type",
						"number": 3,
						"type": 9,
						"label": 1
					},
					{
						"name": "reserved",
						"number": 5,
						"type": 8,
						"label": 1
					},
					{
						"name": "repeated",
						"number": 6,
						"type": 8,
						"label": 1
					}
				]
			}],
			"enumType": [{
				"name": "VerificationState",
				"value": [{
					"name": "DECLARATION",
					"number": 0
				}, {
					"name": "UNVERIFIED",
					"number": 1
				}]
			}],
			"extensionRange": [{
				"start": 1e3,
				"end": 536870912
			}]
		},
		{
			"name": "FieldDescriptorProto",
			"field": [
				{
					"name": "name",
					"number": 1,
					"type": 9,
					"label": 1
				},
				{
					"name": "number",
					"number": 3,
					"type": 5,
					"label": 1
				},
				{
					"name": "label",
					"number": 4,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.FieldDescriptorProto.Label"
				},
				{
					"name": "type",
					"number": 5,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.FieldDescriptorProto.Type"
				},
				{
					"name": "type_name",
					"number": 6,
					"type": 9,
					"label": 1
				},
				{
					"name": "extendee",
					"number": 2,
					"type": 9,
					"label": 1
				},
				{
					"name": "default_value",
					"number": 7,
					"type": 9,
					"label": 1
				},
				{
					"name": "oneof_index",
					"number": 9,
					"type": 5,
					"label": 1
				},
				{
					"name": "json_name",
					"number": 10,
					"type": 9,
					"label": 1
				},
				{
					"name": "options",
					"number": 8,
					"type": 11,
					"label": 1,
					"typeName": ".google.protobuf.FieldOptions"
				},
				{
					"name": "proto3_optional",
					"number": 17,
					"type": 8,
					"label": 1
				}
			],
			"enumType": [{
				"name": "Type",
				"value": [
					{
						"name": "TYPE_DOUBLE",
						"number": 1
					},
					{
						"name": "TYPE_FLOAT",
						"number": 2
					},
					{
						"name": "TYPE_INT64",
						"number": 3
					},
					{
						"name": "TYPE_UINT64",
						"number": 4
					},
					{
						"name": "TYPE_INT32",
						"number": 5
					},
					{
						"name": "TYPE_FIXED64",
						"number": 6
					},
					{
						"name": "TYPE_FIXED32",
						"number": 7
					},
					{
						"name": "TYPE_BOOL",
						"number": 8
					},
					{
						"name": "TYPE_STRING",
						"number": 9
					},
					{
						"name": "TYPE_GROUP",
						"number": 10
					},
					{
						"name": "TYPE_MESSAGE",
						"number": 11
					},
					{
						"name": "TYPE_BYTES",
						"number": 12
					},
					{
						"name": "TYPE_UINT32",
						"number": 13
					},
					{
						"name": "TYPE_ENUM",
						"number": 14
					},
					{
						"name": "TYPE_SFIXED32",
						"number": 15
					},
					{
						"name": "TYPE_SFIXED64",
						"number": 16
					},
					{
						"name": "TYPE_SINT32",
						"number": 17
					},
					{
						"name": "TYPE_SINT64",
						"number": 18
					}
				]
			}, {
				"name": "Label",
				"value": [
					{
						"name": "LABEL_OPTIONAL",
						"number": 1
					},
					{
						"name": "LABEL_REPEATED",
						"number": 3
					},
					{
						"name": "LABEL_REQUIRED",
						"number": 2
					}
				]
			}]
		},
		{
			"name": "OneofDescriptorProto",
			"field": [{
				"name": "name",
				"number": 1,
				"type": 9,
				"label": 1
			}, {
				"name": "options",
				"number": 2,
				"type": 11,
				"label": 1,
				"typeName": ".google.protobuf.OneofOptions"
			}]
		},
		{
			"name": "EnumDescriptorProto",
			"field": [
				{
					"name": "name",
					"number": 1,
					"type": 9,
					"label": 1
				},
				{
					"name": "value",
					"number": 2,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.EnumValueDescriptorProto"
				},
				{
					"name": "options",
					"number": 3,
					"type": 11,
					"label": 1,
					"typeName": ".google.protobuf.EnumOptions"
				},
				{
					"name": "reserved_range",
					"number": 4,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.EnumDescriptorProto.EnumReservedRange"
				},
				{
					"name": "reserved_name",
					"number": 5,
					"type": 9,
					"label": 3
				},
				{
					"name": "visibility",
					"number": 6,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.SymbolVisibility"
				}
			],
			"nestedType": [{
				"name": "EnumReservedRange",
				"field": [{
					"name": "start",
					"number": 1,
					"type": 5,
					"label": 1
				}, {
					"name": "end",
					"number": 2,
					"type": 5,
					"label": 1
				}]
			}]
		},
		{
			"name": "EnumValueDescriptorProto",
			"field": [
				{
					"name": "name",
					"number": 1,
					"type": 9,
					"label": 1
				},
				{
					"name": "number",
					"number": 2,
					"type": 5,
					"label": 1
				},
				{
					"name": "options",
					"number": 3,
					"type": 11,
					"label": 1,
					"typeName": ".google.protobuf.EnumValueOptions"
				}
			]
		},
		{
			"name": "ServiceDescriptorProto",
			"field": [
				{
					"name": "name",
					"number": 1,
					"type": 9,
					"label": 1
				},
				{
					"name": "method",
					"number": 2,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.MethodDescriptorProto"
				},
				{
					"name": "options",
					"number": 3,
					"type": 11,
					"label": 1,
					"typeName": ".google.protobuf.ServiceOptions"
				}
			]
		},
		{
			"name": "MethodDescriptorProto",
			"field": [
				{
					"name": "name",
					"number": 1,
					"type": 9,
					"label": 1
				},
				{
					"name": "input_type",
					"number": 2,
					"type": 9,
					"label": 1
				},
				{
					"name": "output_type",
					"number": 3,
					"type": 9,
					"label": 1
				},
				{
					"name": "options",
					"number": 4,
					"type": 11,
					"label": 1,
					"typeName": ".google.protobuf.MethodOptions"
				},
				{
					"name": "client_streaming",
					"number": 5,
					"type": 8,
					"label": 1,
					"defaultValue": "false"
				},
				{
					"name": "server_streaming",
					"number": 6,
					"type": 8,
					"label": 1,
					"defaultValue": "false"
				}
			]
		},
		{
			"name": "FileOptions",
			"field": [
				{
					"name": "java_package",
					"number": 1,
					"type": 9,
					"label": 1
				},
				{
					"name": "java_outer_classname",
					"number": 8,
					"type": 9,
					"label": 1
				},
				{
					"name": "java_multiple_files",
					"number": 10,
					"type": 8,
					"label": 1,
					"defaultValue": "false"
				},
				{
					"name": "java_generate_equals_and_hash",
					"number": 20,
					"type": 8,
					"label": 1,
					"options": { "deprecated": true }
				},
				{
					"name": "java_string_check_utf8",
					"number": 27,
					"type": 8,
					"label": 1,
					"defaultValue": "false"
				},
				{
					"name": "optimize_for",
					"number": 9,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.FileOptions.OptimizeMode",
					"defaultValue": "SPEED"
				},
				{
					"name": "go_package",
					"number": 11,
					"type": 9,
					"label": 1
				},
				{
					"name": "cc_generic_services",
					"number": 16,
					"type": 8,
					"label": 1,
					"defaultValue": "false"
				},
				{
					"name": "java_generic_services",
					"number": 17,
					"type": 8,
					"label": 1,
					"defaultValue": "false"
				},
				{
					"name": "py_generic_services",
					"number": 18,
					"type": 8,
					"label": 1,
					"defaultValue": "false"
				},
				{
					"name": "deprecated",
					"number": 23,
					"type": 8,
					"label": 1,
					"defaultValue": "false"
				},
				{
					"name": "cc_enable_arenas",
					"number": 31,
					"type": 8,
					"label": 1,
					"defaultValue": "true"
				},
				{
					"name": "objc_class_prefix",
					"number": 36,
					"type": 9,
					"label": 1
				},
				{
					"name": "csharp_namespace",
					"number": 37,
					"type": 9,
					"label": 1
				},
				{
					"name": "swift_prefix",
					"number": 39,
					"type": 9,
					"label": 1
				},
				{
					"name": "php_class_prefix",
					"number": 40,
					"type": 9,
					"label": 1
				},
				{
					"name": "php_namespace",
					"number": 41,
					"type": 9,
					"label": 1
				},
				{
					"name": "php_metadata_namespace",
					"number": 44,
					"type": 9,
					"label": 1
				},
				{
					"name": "ruby_package",
					"number": 45,
					"type": 9,
					"label": 1
				},
				{
					"name": "features",
					"number": 50,
					"type": 11,
					"label": 1,
					"typeName": ".google.protobuf.FeatureSet"
				},
				{
					"name": "uninterpreted_option",
					"number": 999,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.UninterpretedOption"
				}
			],
			"enumType": [{
				"name": "OptimizeMode",
				"value": [
					{
						"name": "SPEED",
						"number": 1
					},
					{
						"name": "CODE_SIZE",
						"number": 2
					},
					{
						"name": "LITE_RUNTIME",
						"number": 3
					}
				]
			}],
			"extensionRange": [{
				"start": 1e3,
				"end": 536870912
			}]
		},
		{
			"name": "MessageOptions",
			"field": [
				{
					"name": "message_set_wire_format",
					"number": 1,
					"type": 8,
					"label": 1,
					"defaultValue": "false"
				},
				{
					"name": "no_standard_descriptor_accessor",
					"number": 2,
					"type": 8,
					"label": 1,
					"defaultValue": "false"
				},
				{
					"name": "deprecated",
					"number": 3,
					"type": 8,
					"label": 1,
					"defaultValue": "false"
				},
				{
					"name": "map_entry",
					"number": 7,
					"type": 8,
					"label": 1
				},
				{
					"name": "deprecated_legacy_json_field_conflicts",
					"number": 11,
					"type": 8,
					"label": 1,
					"options": { "deprecated": true }
				},
				{
					"name": "features",
					"number": 12,
					"type": 11,
					"label": 1,
					"typeName": ".google.protobuf.FeatureSet"
				},
				{
					"name": "uninterpreted_option",
					"number": 999,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.UninterpretedOption"
				}
			],
			"extensionRange": [{
				"start": 1e3,
				"end": 536870912
			}]
		},
		{
			"name": "FieldOptions",
			"field": [
				{
					"name": "ctype",
					"number": 1,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.FieldOptions.CType",
					"defaultValue": "STRING"
				},
				{
					"name": "packed",
					"number": 2,
					"type": 8,
					"label": 1
				},
				{
					"name": "jstype",
					"number": 6,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.FieldOptions.JSType",
					"defaultValue": "JS_NORMAL"
				},
				{
					"name": "lazy",
					"number": 5,
					"type": 8,
					"label": 1,
					"defaultValue": "false"
				},
				{
					"name": "unverified_lazy",
					"number": 15,
					"type": 8,
					"label": 1,
					"defaultValue": "false"
				},
				{
					"name": "deprecated",
					"number": 3,
					"type": 8,
					"label": 1,
					"defaultValue": "false"
				},
				{
					"name": "weak",
					"number": 10,
					"type": 8,
					"label": 1,
					"defaultValue": "false",
					"options": { "deprecated": true }
				},
				{
					"name": "debug_redact",
					"number": 16,
					"type": 8,
					"label": 1,
					"defaultValue": "false"
				},
				{
					"name": "retention",
					"number": 17,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.FieldOptions.OptionRetention"
				},
				{
					"name": "targets",
					"number": 19,
					"type": 14,
					"label": 3,
					"typeName": ".google.protobuf.FieldOptions.OptionTargetType"
				},
				{
					"name": "edition_defaults",
					"number": 20,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.FieldOptions.EditionDefault"
				},
				{
					"name": "features",
					"number": 21,
					"type": 11,
					"label": 1,
					"typeName": ".google.protobuf.FeatureSet"
				},
				{
					"name": "feature_support",
					"number": 22,
					"type": 11,
					"label": 1,
					"typeName": ".google.protobuf.FieldOptions.FeatureSupport"
				},
				{
					"name": "uninterpreted_option",
					"number": 999,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.UninterpretedOption"
				}
			],
			"nestedType": [{
				"name": "EditionDefault",
				"field": [{
					"name": "edition",
					"number": 3,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.Edition"
				}, {
					"name": "value",
					"number": 2,
					"type": 9,
					"label": 1
				}]
			}, {
				"name": "FeatureSupport",
				"field": [
					{
						"name": "edition_introduced",
						"number": 1,
						"type": 14,
						"label": 1,
						"typeName": ".google.protobuf.Edition"
					},
					{
						"name": "edition_deprecated",
						"number": 2,
						"type": 14,
						"label": 1,
						"typeName": ".google.protobuf.Edition"
					},
					{
						"name": "deprecation_warning",
						"number": 3,
						"type": 9,
						"label": 1
					},
					{
						"name": "edition_removed",
						"number": 4,
						"type": 14,
						"label": 1,
						"typeName": ".google.protobuf.Edition"
					}
				]
			}],
			"enumType": [
				{
					"name": "CType",
					"value": [
						{
							"name": "STRING",
							"number": 0
						},
						{
							"name": "CORD",
							"number": 1
						},
						{
							"name": "STRING_PIECE",
							"number": 2
						}
					]
				},
				{
					"name": "JSType",
					"value": [
						{
							"name": "JS_NORMAL",
							"number": 0
						},
						{
							"name": "JS_STRING",
							"number": 1
						},
						{
							"name": "JS_NUMBER",
							"number": 2
						}
					]
				},
				{
					"name": "OptionRetention",
					"value": [
						{
							"name": "RETENTION_UNKNOWN",
							"number": 0
						},
						{
							"name": "RETENTION_RUNTIME",
							"number": 1
						},
						{
							"name": "RETENTION_SOURCE",
							"number": 2
						}
					]
				},
				{
					"name": "OptionTargetType",
					"value": [
						{
							"name": "TARGET_TYPE_UNKNOWN",
							"number": 0
						},
						{
							"name": "TARGET_TYPE_FILE",
							"number": 1
						},
						{
							"name": "TARGET_TYPE_EXTENSION_RANGE",
							"number": 2
						},
						{
							"name": "TARGET_TYPE_MESSAGE",
							"number": 3
						},
						{
							"name": "TARGET_TYPE_FIELD",
							"number": 4
						},
						{
							"name": "TARGET_TYPE_ONEOF",
							"number": 5
						},
						{
							"name": "TARGET_TYPE_ENUM",
							"number": 6
						},
						{
							"name": "TARGET_TYPE_ENUM_ENTRY",
							"number": 7
						},
						{
							"name": "TARGET_TYPE_SERVICE",
							"number": 8
						},
						{
							"name": "TARGET_TYPE_METHOD",
							"number": 9
						}
					]
				}
			],
			"extensionRange": [{
				"start": 1e3,
				"end": 536870912
			}]
		},
		{
			"name": "OneofOptions",
			"field": [{
				"name": "features",
				"number": 1,
				"type": 11,
				"label": 1,
				"typeName": ".google.protobuf.FeatureSet"
			}, {
				"name": "uninterpreted_option",
				"number": 999,
				"type": 11,
				"label": 3,
				"typeName": ".google.protobuf.UninterpretedOption"
			}],
			"extensionRange": [{
				"start": 1e3,
				"end": 536870912
			}]
		},
		{
			"name": "EnumOptions",
			"field": [
				{
					"name": "allow_alias",
					"number": 2,
					"type": 8,
					"label": 1
				},
				{
					"name": "deprecated",
					"number": 3,
					"type": 8,
					"label": 1,
					"defaultValue": "false"
				},
				{
					"name": "deprecated_legacy_json_field_conflicts",
					"number": 6,
					"type": 8,
					"label": 1,
					"options": { "deprecated": true }
				},
				{
					"name": "features",
					"number": 7,
					"type": 11,
					"label": 1,
					"typeName": ".google.protobuf.FeatureSet"
				},
				{
					"name": "uninterpreted_option",
					"number": 999,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.UninterpretedOption"
				}
			],
			"extensionRange": [{
				"start": 1e3,
				"end": 536870912
			}]
		},
		{
			"name": "EnumValueOptions",
			"field": [
				{
					"name": "deprecated",
					"number": 1,
					"type": 8,
					"label": 1,
					"defaultValue": "false"
				},
				{
					"name": "features",
					"number": 2,
					"type": 11,
					"label": 1,
					"typeName": ".google.protobuf.FeatureSet"
				},
				{
					"name": "debug_redact",
					"number": 3,
					"type": 8,
					"label": 1,
					"defaultValue": "false"
				},
				{
					"name": "feature_support",
					"number": 4,
					"type": 11,
					"label": 1,
					"typeName": ".google.protobuf.FieldOptions.FeatureSupport"
				},
				{
					"name": "uninterpreted_option",
					"number": 999,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.UninterpretedOption"
				}
			],
			"extensionRange": [{
				"start": 1e3,
				"end": 536870912
			}]
		},
		{
			"name": "ServiceOptions",
			"field": [
				{
					"name": "features",
					"number": 34,
					"type": 11,
					"label": 1,
					"typeName": ".google.protobuf.FeatureSet"
				},
				{
					"name": "deprecated",
					"number": 33,
					"type": 8,
					"label": 1,
					"defaultValue": "false"
				},
				{
					"name": "uninterpreted_option",
					"number": 999,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.UninterpretedOption"
				}
			],
			"extensionRange": [{
				"start": 1e3,
				"end": 536870912
			}]
		},
		{
			"name": "MethodOptions",
			"field": [
				{
					"name": "deprecated",
					"number": 33,
					"type": 8,
					"label": 1,
					"defaultValue": "false"
				},
				{
					"name": "idempotency_level",
					"number": 34,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.MethodOptions.IdempotencyLevel",
					"defaultValue": "IDEMPOTENCY_UNKNOWN"
				},
				{
					"name": "features",
					"number": 35,
					"type": 11,
					"label": 1,
					"typeName": ".google.protobuf.FeatureSet"
				},
				{
					"name": "uninterpreted_option",
					"number": 999,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.UninterpretedOption"
				}
			],
			"enumType": [{
				"name": "IdempotencyLevel",
				"value": [
					{
						"name": "IDEMPOTENCY_UNKNOWN",
						"number": 0
					},
					{
						"name": "NO_SIDE_EFFECTS",
						"number": 1
					},
					{
						"name": "IDEMPOTENT",
						"number": 2
					}
				]
			}],
			"extensionRange": [{
				"start": 1e3,
				"end": 536870912
			}]
		},
		{
			"name": "UninterpretedOption",
			"field": [
				{
					"name": "name",
					"number": 2,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.UninterpretedOption.NamePart"
				},
				{
					"name": "identifier_value",
					"number": 3,
					"type": 9,
					"label": 1
				},
				{
					"name": "positive_int_value",
					"number": 4,
					"type": 4,
					"label": 1
				},
				{
					"name": "negative_int_value",
					"number": 5,
					"type": 3,
					"label": 1
				},
				{
					"name": "double_value",
					"number": 6,
					"type": 1,
					"label": 1
				},
				{
					"name": "string_value",
					"number": 7,
					"type": 12,
					"label": 1
				},
				{
					"name": "aggregate_value",
					"number": 8,
					"type": 9,
					"label": 1
				}
			],
			"nestedType": [{
				"name": "NamePart",
				"field": [{
					"name": "name_part",
					"number": 1,
					"type": 9,
					"label": 2
				}, {
					"name": "is_extension",
					"number": 2,
					"type": 8,
					"label": 2
				}]
			}]
		},
		{
			"name": "FeatureSet",
			"field": [
				{
					"name": "field_presence",
					"number": 1,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.FeatureSet.FieldPresence",
					"options": {
						"retention": 1,
						"targets": [4, 1],
						"editionDefaults": [
							{
								"value": "EXPLICIT",
								"edition": 900
							},
							{
								"value": "IMPLICIT",
								"edition": 999
							},
							{
								"value": "EXPLICIT",
								"edition": 1e3
							}
						]
					}
				},
				{
					"name": "enum_type",
					"number": 2,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.FeatureSet.EnumType",
					"options": {
						"retention": 1,
						"targets": [6, 1],
						"editionDefaults": [{
							"value": "CLOSED",
							"edition": 900
						}, {
							"value": "OPEN",
							"edition": 999
						}]
					}
				},
				{
					"name": "repeated_field_encoding",
					"number": 3,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.FeatureSet.RepeatedFieldEncoding",
					"options": {
						"retention": 1,
						"targets": [4, 1],
						"editionDefaults": [{
							"value": "EXPANDED",
							"edition": 900
						}, {
							"value": "PACKED",
							"edition": 999
						}]
					}
				},
				{
					"name": "utf8_validation",
					"number": 4,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.FeatureSet.Utf8Validation",
					"options": {
						"retention": 1,
						"targets": [4, 1],
						"editionDefaults": [{
							"value": "NONE",
							"edition": 900
						}, {
							"value": "VERIFY",
							"edition": 999
						}]
					}
				},
				{
					"name": "message_encoding",
					"number": 5,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.FeatureSet.MessageEncoding",
					"options": {
						"retention": 1,
						"targets": [4, 1],
						"editionDefaults": [{
							"value": "LENGTH_PREFIXED",
							"edition": 900
						}]
					}
				},
				{
					"name": "json_format",
					"number": 6,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.FeatureSet.JsonFormat",
					"options": {
						"retention": 1,
						"targets": [
							3,
							6,
							1
						],
						"editionDefaults": [{
							"value": "LEGACY_BEST_EFFORT",
							"edition": 900
						}, {
							"value": "ALLOW",
							"edition": 999
						}]
					}
				},
				{
					"name": "enforce_naming_style",
					"number": 7,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.FeatureSet.EnforceNamingStyle",
					"options": {
						"retention": 2,
						"targets": [
							1,
							2,
							3,
							4,
							5,
							6,
							7,
							8,
							9
						],
						"editionDefaults": [{
							"value": "STYLE_LEGACY",
							"edition": 900
						}, {
							"value": "STYLE2024",
							"edition": 1001
						}]
					}
				},
				{
					"name": "default_symbol_visibility",
					"number": 8,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.FeatureSet.VisibilityFeature.DefaultSymbolVisibility",
					"options": {
						"retention": 2,
						"targets": [1],
						"editionDefaults": [{
							"value": "EXPORT_ALL",
							"edition": 900
						}, {
							"value": "EXPORT_TOP_LEVEL",
							"edition": 1001
						}]
					}
				}
			],
			"nestedType": [{
				"name": "VisibilityFeature",
				"enumType": [{
					"name": "DefaultSymbolVisibility",
					"value": [
						{
							"name": "DEFAULT_SYMBOL_VISIBILITY_UNKNOWN",
							"number": 0
						},
						{
							"name": "EXPORT_ALL",
							"number": 1
						},
						{
							"name": "EXPORT_TOP_LEVEL",
							"number": 2
						},
						{
							"name": "LOCAL_ALL",
							"number": 3
						},
						{
							"name": "STRICT",
							"number": 4
						}
					]
				}]
			}],
			"enumType": [
				{
					"name": "FieldPresence",
					"value": [
						{
							"name": "FIELD_PRESENCE_UNKNOWN",
							"number": 0
						},
						{
							"name": "EXPLICIT",
							"number": 1
						},
						{
							"name": "IMPLICIT",
							"number": 2
						},
						{
							"name": "LEGACY_REQUIRED",
							"number": 3
						}
					]
				},
				{
					"name": "EnumType",
					"value": [
						{
							"name": "ENUM_TYPE_UNKNOWN",
							"number": 0
						},
						{
							"name": "OPEN",
							"number": 1
						},
						{
							"name": "CLOSED",
							"number": 2
						}
					]
				},
				{
					"name": "RepeatedFieldEncoding",
					"value": [
						{
							"name": "REPEATED_FIELD_ENCODING_UNKNOWN",
							"number": 0
						},
						{
							"name": "PACKED",
							"number": 1
						},
						{
							"name": "EXPANDED",
							"number": 2
						}
					]
				},
				{
					"name": "Utf8Validation",
					"value": [
						{
							"name": "UTF8_VALIDATION_UNKNOWN",
							"number": 0
						},
						{
							"name": "VERIFY",
							"number": 2
						},
						{
							"name": "NONE",
							"number": 3
						}
					]
				},
				{
					"name": "MessageEncoding",
					"value": [
						{
							"name": "MESSAGE_ENCODING_UNKNOWN",
							"number": 0
						},
						{
							"name": "LENGTH_PREFIXED",
							"number": 1
						},
						{
							"name": "DELIMITED",
							"number": 2
						}
					]
				},
				{
					"name": "JsonFormat",
					"value": [
						{
							"name": "JSON_FORMAT_UNKNOWN",
							"number": 0
						},
						{
							"name": "ALLOW",
							"number": 1
						},
						{
							"name": "LEGACY_BEST_EFFORT",
							"number": 2
						}
					]
				},
				{
					"name": "EnforceNamingStyle",
					"value": [
						{
							"name": "ENFORCE_NAMING_STYLE_UNKNOWN",
							"number": 0
						},
						{
							"name": "STYLE2024",
							"number": 1
						},
						{
							"name": "STYLE_LEGACY",
							"number": 2
						}
					]
				}
			],
			"extensionRange": [
				{
					"start": 1e3,
					"end": 9995
				},
				{
					"start": 9995,
					"end": 1e4
				},
				{
					"start": 1e4,
					"end": 10001
				}
			]
		},
		{
			"name": "FeatureSetDefaults",
			"field": [
				{
					"name": "defaults",
					"number": 1,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.FeatureSetDefaults.FeatureSetEditionDefault"
				},
				{
					"name": "minimum_edition",
					"number": 4,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.Edition"
				},
				{
					"name": "maximum_edition",
					"number": 5,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.Edition"
				}
			],
			"nestedType": [{
				"name": "FeatureSetEditionDefault",
				"field": [
					{
						"name": "edition",
						"number": 3,
						"type": 14,
						"label": 1,
						"typeName": ".google.protobuf.Edition"
					},
					{
						"name": "overridable_features",
						"number": 4,
						"type": 11,
						"label": 1,
						"typeName": ".google.protobuf.FeatureSet"
					},
					{
						"name": "fixed_features",
						"number": 5,
						"type": 11,
						"label": 1,
						"typeName": ".google.protobuf.FeatureSet"
					}
				]
			}]
		},
		{
			"name": "SourceCodeInfo",
			"field": [{
				"name": "location",
				"number": 1,
				"type": 11,
				"label": 3,
				"typeName": ".google.protobuf.SourceCodeInfo.Location"
			}],
			"nestedType": [{
				"name": "Location",
				"field": [
					{
						"name": "path",
						"number": 1,
						"type": 5,
						"label": 3,
						"options": { "packed": true }
					},
					{
						"name": "span",
						"number": 2,
						"type": 5,
						"label": 3,
						"options": { "packed": true }
					},
					{
						"name": "leading_comments",
						"number": 3,
						"type": 9,
						"label": 1
					},
					{
						"name": "trailing_comments",
						"number": 4,
						"type": 9,
						"label": 1
					},
					{
						"name": "leading_detached_comments",
						"number": 6,
						"type": 9,
						"label": 3
					}
				]
			}],
			"extensionRange": [{
				"start": 536e6,
				"end": 536000001
			}]
		},
		{
			"name": "GeneratedCodeInfo",
			"field": [{
				"name": "annotation",
				"number": 1,
				"type": 11,
				"label": 3,
				"typeName": ".google.protobuf.GeneratedCodeInfo.Annotation"
			}],
			"nestedType": [{
				"name": "Annotation",
				"field": [
					{
						"name": "path",
						"number": 1,
						"type": 5,
						"label": 3,
						"options": { "packed": true }
					},
					{
						"name": "source_file",
						"number": 2,
						"type": 9,
						"label": 1
					},
					{
						"name": "begin",
						"number": 3,
						"type": 5,
						"label": 1
					},
					{
						"name": "end",
						"number": 4,
						"type": 5,
						"label": 1
					},
					{
						"name": "semantic",
						"number": 5,
						"type": 14,
						"label": 1,
						"typeName": ".google.protobuf.GeneratedCodeInfo.Annotation.Semantic"
					}
				],
				"enumType": [{
					"name": "Semantic",
					"value": [
						{
							"name": "NONE",
							"number": 0
						},
						{
							"name": "SET",
							"number": 1
						},
						{
							"name": "ALIAS",
							"number": 2
						}
					]
				}]
			}]
		}
	],
	"enumType": [{
		"name": "Edition",
		"value": [
			{
				"name": "EDITION_UNKNOWN",
				"number": 0
			},
			{
				"name": "EDITION_LEGACY",
				"number": 900
			},
			{
				"name": "EDITION_PROTO2",
				"number": 998
			},
			{
				"name": "EDITION_PROTO3",
				"number": 999
			},
			{
				"name": "EDITION_2023",
				"number": 1e3
			},
			{
				"name": "EDITION_2024",
				"number": 1001
			},
			{
				"name": "EDITION_1_TEST_ONLY",
				"number": 1
			},
			{
				"name": "EDITION_2_TEST_ONLY",
				"number": 2
			},
			{
				"name": "EDITION_99997_TEST_ONLY",
				"number": 99997
			},
			{
				"name": "EDITION_99998_TEST_ONLY",
				"number": 99998
			},
			{
				"name": "EDITION_99999_TEST_ONLY",
				"number": 99999
			},
			{
				"name": "EDITION_MAX",
				"number": 2147483647
			}
		]
	}, {
		"name": "SymbolVisibility",
		"value": [
			{
				"name": "VISIBILITY_UNSET",
				"number": 0
			},
			{
				"name": "VISIBILITY_LOCAL",
				"number": 1
			},
			{
				"name": "VISIBILITY_EXPORT",
				"number": 2
			}
		]
	}]
}), 1);
/**
* The verification state of the extension range.
*
* @generated from enum google.protobuf.ExtensionRangeOptions.VerificationState
*/
var ExtensionRangeOptions_VerificationState$2;
(function(ExtensionRangeOptions_VerificationState) {
	/**
	* All the extensions of the range must be declared.
	*
	* @generated from enum value: DECLARATION = 0;
	*/
	ExtensionRangeOptions_VerificationState[ExtensionRangeOptions_VerificationState["DECLARATION"] = 0] = "DECLARATION";
	/**
	* @generated from enum value: UNVERIFIED = 1;
	*/
	ExtensionRangeOptions_VerificationState[ExtensionRangeOptions_VerificationState["UNVERIFIED"] = 1] = "UNVERIFIED";
})(ExtensionRangeOptions_VerificationState$2 || (ExtensionRangeOptions_VerificationState$2 = {}));
/**
* @generated from enum google.protobuf.FieldDescriptorProto.Type
*/
var FieldDescriptorProto_Type$2;
(function(FieldDescriptorProto_Type) {
	/**
	* 0 is reserved for errors.
	* Order is weird for historical reasons.
	*
	* @generated from enum value: TYPE_DOUBLE = 1;
	*/
	FieldDescriptorProto_Type[FieldDescriptorProto_Type["DOUBLE"] = 1] = "DOUBLE";
	/**
	* @generated from enum value: TYPE_FLOAT = 2;
	*/
	FieldDescriptorProto_Type[FieldDescriptorProto_Type["FLOAT"] = 2] = "FLOAT";
	/**
	* Not ZigZag encoded.  Negative numbers take 10 bytes.  Use TYPE_SINT64 if
	* negative values are likely.
	*
	* @generated from enum value: TYPE_INT64 = 3;
	*/
	FieldDescriptorProto_Type[FieldDescriptorProto_Type["INT64"] = 3] = "INT64";
	/**
	* @generated from enum value: TYPE_UINT64 = 4;
	*/
	FieldDescriptorProto_Type[FieldDescriptorProto_Type["UINT64"] = 4] = "UINT64";
	/**
	* Not ZigZag encoded.  Negative numbers take 10 bytes.  Use TYPE_SINT32 if
	* negative values are likely.
	*
	* @generated from enum value: TYPE_INT32 = 5;
	*/
	FieldDescriptorProto_Type[FieldDescriptorProto_Type["INT32"] = 5] = "INT32";
	/**
	* @generated from enum value: TYPE_FIXED64 = 6;
	*/
	FieldDescriptorProto_Type[FieldDescriptorProto_Type["FIXED64"] = 6] = "FIXED64";
	/**
	* @generated from enum value: TYPE_FIXED32 = 7;
	*/
	FieldDescriptorProto_Type[FieldDescriptorProto_Type["FIXED32"] = 7] = "FIXED32";
	/**
	* @generated from enum value: TYPE_BOOL = 8;
	*/
	FieldDescriptorProto_Type[FieldDescriptorProto_Type["BOOL"] = 8] = "BOOL";
	/**
	* @generated from enum value: TYPE_STRING = 9;
	*/
	FieldDescriptorProto_Type[FieldDescriptorProto_Type["STRING"] = 9] = "STRING";
	/**
	* Tag-delimited aggregate.
	* Group type is deprecated and not supported after google.protobuf. However, Proto3
	* implementations should still be able to parse the group wire format and
	* treat group fields as unknown fields.  In Editions, the group wire format
	* can be enabled via the `message_encoding` feature.
	*
	* @generated from enum value: TYPE_GROUP = 10;
	*/
	FieldDescriptorProto_Type[FieldDescriptorProto_Type["GROUP"] = 10] = "GROUP";
	/**
	* Length-delimited aggregate.
	*
	* @generated from enum value: TYPE_MESSAGE = 11;
	*/
	FieldDescriptorProto_Type[FieldDescriptorProto_Type["MESSAGE"] = 11] = "MESSAGE";
	/**
	* New in version 2.
	*
	* @generated from enum value: TYPE_BYTES = 12;
	*/
	FieldDescriptorProto_Type[FieldDescriptorProto_Type["BYTES"] = 12] = "BYTES";
	/**
	* @generated from enum value: TYPE_UINT32 = 13;
	*/
	FieldDescriptorProto_Type[FieldDescriptorProto_Type["UINT32"] = 13] = "UINT32";
	/**
	* @generated from enum value: TYPE_ENUM = 14;
	*/
	FieldDescriptorProto_Type[FieldDescriptorProto_Type["ENUM"] = 14] = "ENUM";
	/**
	* @generated from enum value: TYPE_SFIXED32 = 15;
	*/
	FieldDescriptorProto_Type[FieldDescriptorProto_Type["SFIXED32"] = 15] = "SFIXED32";
	/**
	* @generated from enum value: TYPE_SFIXED64 = 16;
	*/
	FieldDescriptorProto_Type[FieldDescriptorProto_Type["SFIXED64"] = 16] = "SFIXED64";
	/**
	* Uses ZigZag encoding.
	*
	* @generated from enum value: TYPE_SINT32 = 17;
	*/
	FieldDescriptorProto_Type[FieldDescriptorProto_Type["SINT32"] = 17] = "SINT32";
	/**
	* Uses ZigZag encoding.
	*
	* @generated from enum value: TYPE_SINT64 = 18;
	*/
	FieldDescriptorProto_Type[FieldDescriptorProto_Type["SINT64"] = 18] = "SINT64";
})(FieldDescriptorProto_Type$2 || (FieldDescriptorProto_Type$2 = {}));
/**
* @generated from enum google.protobuf.FieldDescriptorProto.Label
*/
var FieldDescriptorProto_Label$2;
(function(FieldDescriptorProto_Label) {
	/**
	* 0 is reserved for errors
	*
	* @generated from enum value: LABEL_OPTIONAL = 1;
	*/
	FieldDescriptorProto_Label[FieldDescriptorProto_Label["OPTIONAL"] = 1] = "OPTIONAL";
	/**
	* @generated from enum value: LABEL_REPEATED = 3;
	*/
	FieldDescriptorProto_Label[FieldDescriptorProto_Label["REPEATED"] = 3] = "REPEATED";
	/**
	* The required label is only allowed in google.protobuf.  In proto3 and Editions
	* it's explicitly prohibited.  In Editions, the `field_presence` feature
	* can be used to get this behavior.
	*
	* @generated from enum value: LABEL_REQUIRED = 2;
	*/
	FieldDescriptorProto_Label[FieldDescriptorProto_Label["REQUIRED"] = 2] = "REQUIRED";
})(FieldDescriptorProto_Label$2 || (FieldDescriptorProto_Label$2 = {}));
/**
* Generated classes can be optimized for speed or code size.
*
* @generated from enum google.protobuf.FileOptions.OptimizeMode
*/
var FileOptions_OptimizeMode$2;
(function(FileOptions_OptimizeMode) {
	/**
	* Generate complete code for parsing, serialization,
	*
	* @generated from enum value: SPEED = 1;
	*/
	FileOptions_OptimizeMode[FileOptions_OptimizeMode["SPEED"] = 1] = "SPEED";
	/**
	* etc.
	*
	* Use ReflectionOps to implement these methods.
	*
	* @generated from enum value: CODE_SIZE = 2;
	*/
	FileOptions_OptimizeMode[FileOptions_OptimizeMode["CODE_SIZE"] = 2] = "CODE_SIZE";
	/**
	* Generate code using MessageLite and the lite runtime.
	*
	* @generated from enum value: LITE_RUNTIME = 3;
	*/
	FileOptions_OptimizeMode[FileOptions_OptimizeMode["LITE_RUNTIME"] = 3] = "LITE_RUNTIME";
})(FileOptions_OptimizeMode$2 || (FileOptions_OptimizeMode$2 = {}));
/**
* @generated from enum google.protobuf.FieldOptions.CType
*/
var FieldOptions_CType$2;
(function(FieldOptions_CType) {
	/**
	* Default mode.
	*
	* @generated from enum value: STRING = 0;
	*/
	FieldOptions_CType[FieldOptions_CType["STRING"] = 0] = "STRING";
	/**
	* The option [ctype=CORD] may be applied to a non-repeated field of type
	* "bytes". It indicates that in C++, the data should be stored in a Cord
	* instead of a string.  For very large strings, this may reduce memory
	* fragmentation. It may also allow better performance when parsing from a
	* Cord, or when parsing with aliasing enabled, as the parsed Cord may then
	* alias the original buffer.
	*
	* @generated from enum value: CORD = 1;
	*/
	FieldOptions_CType[FieldOptions_CType["CORD"] = 1] = "CORD";
	/**
	* @generated from enum value: STRING_PIECE = 2;
	*/
	FieldOptions_CType[FieldOptions_CType["STRING_PIECE"] = 2] = "STRING_PIECE";
})(FieldOptions_CType$2 || (FieldOptions_CType$2 = {}));
/**
* @generated from enum google.protobuf.FieldOptions.JSType
*/
var FieldOptions_JSType$2;
(function(FieldOptions_JSType) {
	/**
	* Use the default type.
	*
	* @generated from enum value: JS_NORMAL = 0;
	*/
	FieldOptions_JSType[FieldOptions_JSType["JS_NORMAL"] = 0] = "JS_NORMAL";
	/**
	* Use JavaScript strings.
	*
	* @generated from enum value: JS_STRING = 1;
	*/
	FieldOptions_JSType[FieldOptions_JSType["JS_STRING"] = 1] = "JS_STRING";
	/**
	* Use JavaScript numbers.
	*
	* @generated from enum value: JS_NUMBER = 2;
	*/
	FieldOptions_JSType[FieldOptions_JSType["JS_NUMBER"] = 2] = "JS_NUMBER";
})(FieldOptions_JSType$2 || (FieldOptions_JSType$2 = {}));
/**
* If set to RETENTION_SOURCE, the option will be omitted from the binary.
*
* @generated from enum google.protobuf.FieldOptions.OptionRetention
*/
var FieldOptions_OptionRetention$2;
(function(FieldOptions_OptionRetention) {
	/**
	* @generated from enum value: RETENTION_UNKNOWN = 0;
	*/
	FieldOptions_OptionRetention[FieldOptions_OptionRetention["RETENTION_UNKNOWN"] = 0] = "RETENTION_UNKNOWN";
	/**
	* @generated from enum value: RETENTION_RUNTIME = 1;
	*/
	FieldOptions_OptionRetention[FieldOptions_OptionRetention["RETENTION_RUNTIME"] = 1] = "RETENTION_RUNTIME";
	/**
	* @generated from enum value: RETENTION_SOURCE = 2;
	*/
	FieldOptions_OptionRetention[FieldOptions_OptionRetention["RETENTION_SOURCE"] = 2] = "RETENTION_SOURCE";
})(FieldOptions_OptionRetention$2 || (FieldOptions_OptionRetention$2 = {}));
/**
* This indicates the types of entities that the field may apply to when used
* as an option. If it is unset, then the field may be freely used as an
* option on any kind of entity.
*
* @generated from enum google.protobuf.FieldOptions.OptionTargetType
*/
var FieldOptions_OptionTargetType$2;
(function(FieldOptions_OptionTargetType) {
	/**
	* @generated from enum value: TARGET_TYPE_UNKNOWN = 0;
	*/
	FieldOptions_OptionTargetType[FieldOptions_OptionTargetType["TARGET_TYPE_UNKNOWN"] = 0] = "TARGET_TYPE_UNKNOWN";
	/**
	* @generated from enum value: TARGET_TYPE_FILE = 1;
	*/
	FieldOptions_OptionTargetType[FieldOptions_OptionTargetType["TARGET_TYPE_FILE"] = 1] = "TARGET_TYPE_FILE";
	/**
	* @generated from enum value: TARGET_TYPE_EXTENSION_RANGE = 2;
	*/
	FieldOptions_OptionTargetType[FieldOptions_OptionTargetType["TARGET_TYPE_EXTENSION_RANGE"] = 2] = "TARGET_TYPE_EXTENSION_RANGE";
	/**
	* @generated from enum value: TARGET_TYPE_MESSAGE = 3;
	*/
	FieldOptions_OptionTargetType[FieldOptions_OptionTargetType["TARGET_TYPE_MESSAGE"] = 3] = "TARGET_TYPE_MESSAGE";
	/**
	* @generated from enum value: TARGET_TYPE_FIELD = 4;
	*/
	FieldOptions_OptionTargetType[FieldOptions_OptionTargetType["TARGET_TYPE_FIELD"] = 4] = "TARGET_TYPE_FIELD";
	/**
	* @generated from enum value: TARGET_TYPE_ONEOF = 5;
	*/
	FieldOptions_OptionTargetType[FieldOptions_OptionTargetType["TARGET_TYPE_ONEOF"] = 5] = "TARGET_TYPE_ONEOF";
	/**
	* @generated from enum value: TARGET_TYPE_ENUM = 6;
	*/
	FieldOptions_OptionTargetType[FieldOptions_OptionTargetType["TARGET_TYPE_ENUM"] = 6] = "TARGET_TYPE_ENUM";
	/**
	* @generated from enum value: TARGET_TYPE_ENUM_ENTRY = 7;
	*/
	FieldOptions_OptionTargetType[FieldOptions_OptionTargetType["TARGET_TYPE_ENUM_ENTRY"] = 7] = "TARGET_TYPE_ENUM_ENTRY";
	/**
	* @generated from enum value: TARGET_TYPE_SERVICE = 8;
	*/
	FieldOptions_OptionTargetType[FieldOptions_OptionTargetType["TARGET_TYPE_SERVICE"] = 8] = "TARGET_TYPE_SERVICE";
	/**
	* @generated from enum value: TARGET_TYPE_METHOD = 9;
	*/
	FieldOptions_OptionTargetType[FieldOptions_OptionTargetType["TARGET_TYPE_METHOD"] = 9] = "TARGET_TYPE_METHOD";
})(FieldOptions_OptionTargetType$2 || (FieldOptions_OptionTargetType$2 = {}));
/**
* Is this method side-effect-free (or safe in HTTP parlance), or idempotent,
* or neither? HTTP based RPC implementation may choose GET verb for safe
* methods, and PUT verb for idempotent methods instead of the default POST.
*
* @generated from enum google.protobuf.MethodOptions.IdempotencyLevel
*/
var MethodOptions_IdempotencyLevel$2;
(function(MethodOptions_IdempotencyLevel) {
	/**
	* @generated from enum value: IDEMPOTENCY_UNKNOWN = 0;
	*/
	MethodOptions_IdempotencyLevel[MethodOptions_IdempotencyLevel["IDEMPOTENCY_UNKNOWN"] = 0] = "IDEMPOTENCY_UNKNOWN";
	/**
	* implies idempotent
	*
	* @generated from enum value: NO_SIDE_EFFECTS = 1;
	*/
	MethodOptions_IdempotencyLevel[MethodOptions_IdempotencyLevel["NO_SIDE_EFFECTS"] = 1] = "NO_SIDE_EFFECTS";
	/**
	* idempotent, but may have side effects
	*
	* @generated from enum value: IDEMPOTENT = 2;
	*/
	MethodOptions_IdempotencyLevel[MethodOptions_IdempotencyLevel["IDEMPOTENT"] = 2] = "IDEMPOTENT";
})(MethodOptions_IdempotencyLevel$2 || (MethodOptions_IdempotencyLevel$2 = {}));
/**
* @generated from enum google.protobuf.FeatureSet.VisibilityFeature.DefaultSymbolVisibility
*/
var FeatureSet_VisibilityFeature_DefaultSymbolVisibility$2;
(function(FeatureSet_VisibilityFeature_DefaultSymbolVisibility) {
	/**
	* @generated from enum value: DEFAULT_SYMBOL_VISIBILITY_UNKNOWN = 0;
	*/
	FeatureSet_VisibilityFeature_DefaultSymbolVisibility[FeatureSet_VisibilityFeature_DefaultSymbolVisibility["DEFAULT_SYMBOL_VISIBILITY_UNKNOWN"] = 0] = "DEFAULT_SYMBOL_VISIBILITY_UNKNOWN";
	/**
	* Default pre-EDITION_2024, all UNSET visibility are export.
	*
	* @generated from enum value: EXPORT_ALL = 1;
	*/
	FeatureSet_VisibilityFeature_DefaultSymbolVisibility[FeatureSet_VisibilityFeature_DefaultSymbolVisibility["EXPORT_ALL"] = 1] = "EXPORT_ALL";
	/**
	* All top-level symbols default to export, nested default to local.
	*
	* @generated from enum value: EXPORT_TOP_LEVEL = 2;
	*/
	FeatureSet_VisibilityFeature_DefaultSymbolVisibility[FeatureSet_VisibilityFeature_DefaultSymbolVisibility["EXPORT_TOP_LEVEL"] = 2] = "EXPORT_TOP_LEVEL";
	/**
	* All symbols default to local.
	*
	* @generated from enum value: LOCAL_ALL = 3;
	*/
	FeatureSet_VisibilityFeature_DefaultSymbolVisibility[FeatureSet_VisibilityFeature_DefaultSymbolVisibility["LOCAL_ALL"] = 3] = "LOCAL_ALL";
	/**
	* All symbols local by default. Nested types cannot be exported.
	* With special case caveat for message { enum {} reserved 1 to max; }
	* This is the recommended setting for new protos.
	*
	* @generated from enum value: STRICT = 4;
	*/
	FeatureSet_VisibilityFeature_DefaultSymbolVisibility[FeatureSet_VisibilityFeature_DefaultSymbolVisibility["STRICT"] = 4] = "STRICT";
})(FeatureSet_VisibilityFeature_DefaultSymbolVisibility$2 || (FeatureSet_VisibilityFeature_DefaultSymbolVisibility$2 = {}));
/**
* @generated from enum google.protobuf.FeatureSet.FieldPresence
*/
var FeatureSet_FieldPresence$2;
(function(FeatureSet_FieldPresence) {
	/**
	* @generated from enum value: FIELD_PRESENCE_UNKNOWN = 0;
	*/
	FeatureSet_FieldPresence[FeatureSet_FieldPresence["FIELD_PRESENCE_UNKNOWN"] = 0] = "FIELD_PRESENCE_UNKNOWN";
	/**
	* @generated from enum value: EXPLICIT = 1;
	*/
	FeatureSet_FieldPresence[FeatureSet_FieldPresence["EXPLICIT"] = 1] = "EXPLICIT";
	/**
	* @generated from enum value: IMPLICIT = 2;
	*/
	FeatureSet_FieldPresence[FeatureSet_FieldPresence["IMPLICIT"] = 2] = "IMPLICIT";
	/**
	* @generated from enum value: LEGACY_REQUIRED = 3;
	*/
	FeatureSet_FieldPresence[FeatureSet_FieldPresence["LEGACY_REQUIRED"] = 3] = "LEGACY_REQUIRED";
})(FeatureSet_FieldPresence$2 || (FeatureSet_FieldPresence$2 = {}));
/**
* @generated from enum google.protobuf.FeatureSet.EnumType
*/
var FeatureSet_EnumType$2;
(function(FeatureSet_EnumType) {
	/**
	* @generated from enum value: ENUM_TYPE_UNKNOWN = 0;
	*/
	FeatureSet_EnumType[FeatureSet_EnumType["ENUM_TYPE_UNKNOWN"] = 0] = "ENUM_TYPE_UNKNOWN";
	/**
	* @generated from enum value: OPEN = 1;
	*/
	FeatureSet_EnumType[FeatureSet_EnumType["OPEN"] = 1] = "OPEN";
	/**
	* @generated from enum value: CLOSED = 2;
	*/
	FeatureSet_EnumType[FeatureSet_EnumType["CLOSED"] = 2] = "CLOSED";
})(FeatureSet_EnumType$2 || (FeatureSet_EnumType$2 = {}));
/**
* @generated from enum google.protobuf.FeatureSet.RepeatedFieldEncoding
*/
var FeatureSet_RepeatedFieldEncoding$2;
(function(FeatureSet_RepeatedFieldEncoding) {
	/**
	* @generated from enum value: REPEATED_FIELD_ENCODING_UNKNOWN = 0;
	*/
	FeatureSet_RepeatedFieldEncoding[FeatureSet_RepeatedFieldEncoding["REPEATED_FIELD_ENCODING_UNKNOWN"] = 0] = "REPEATED_FIELD_ENCODING_UNKNOWN";
	/**
	* @generated from enum value: PACKED = 1;
	*/
	FeatureSet_RepeatedFieldEncoding[FeatureSet_RepeatedFieldEncoding["PACKED"] = 1] = "PACKED";
	/**
	* @generated from enum value: EXPANDED = 2;
	*/
	FeatureSet_RepeatedFieldEncoding[FeatureSet_RepeatedFieldEncoding["EXPANDED"] = 2] = "EXPANDED";
})(FeatureSet_RepeatedFieldEncoding$2 || (FeatureSet_RepeatedFieldEncoding$2 = {}));
/**
* @generated from enum google.protobuf.FeatureSet.Utf8Validation
*/
var FeatureSet_Utf8Validation$2;
(function(FeatureSet_Utf8Validation) {
	/**
	* @generated from enum value: UTF8_VALIDATION_UNKNOWN = 0;
	*/
	FeatureSet_Utf8Validation[FeatureSet_Utf8Validation["UTF8_VALIDATION_UNKNOWN"] = 0] = "UTF8_VALIDATION_UNKNOWN";
	/**
	* @generated from enum value: VERIFY = 2;
	*/
	FeatureSet_Utf8Validation[FeatureSet_Utf8Validation["VERIFY"] = 2] = "VERIFY";
	/**
	* @generated from enum value: NONE = 3;
	*/
	FeatureSet_Utf8Validation[FeatureSet_Utf8Validation["NONE"] = 3] = "NONE";
})(FeatureSet_Utf8Validation$2 || (FeatureSet_Utf8Validation$2 = {}));
/**
* @generated from enum google.protobuf.FeatureSet.MessageEncoding
*/
var FeatureSet_MessageEncoding$2;
(function(FeatureSet_MessageEncoding) {
	/**
	* @generated from enum value: MESSAGE_ENCODING_UNKNOWN = 0;
	*/
	FeatureSet_MessageEncoding[FeatureSet_MessageEncoding["MESSAGE_ENCODING_UNKNOWN"] = 0] = "MESSAGE_ENCODING_UNKNOWN";
	/**
	* @generated from enum value: LENGTH_PREFIXED = 1;
	*/
	FeatureSet_MessageEncoding[FeatureSet_MessageEncoding["LENGTH_PREFIXED"] = 1] = "LENGTH_PREFIXED";
	/**
	* @generated from enum value: DELIMITED = 2;
	*/
	FeatureSet_MessageEncoding[FeatureSet_MessageEncoding["DELIMITED"] = 2] = "DELIMITED";
})(FeatureSet_MessageEncoding$2 || (FeatureSet_MessageEncoding$2 = {}));
/**
* @generated from enum google.protobuf.FeatureSet.JsonFormat
*/
var FeatureSet_JsonFormat$2;
(function(FeatureSet_JsonFormat) {
	/**
	* @generated from enum value: JSON_FORMAT_UNKNOWN = 0;
	*/
	FeatureSet_JsonFormat[FeatureSet_JsonFormat["JSON_FORMAT_UNKNOWN"] = 0] = "JSON_FORMAT_UNKNOWN";
	/**
	* @generated from enum value: ALLOW = 1;
	*/
	FeatureSet_JsonFormat[FeatureSet_JsonFormat["ALLOW"] = 1] = "ALLOW";
	/**
	* @generated from enum value: LEGACY_BEST_EFFORT = 2;
	*/
	FeatureSet_JsonFormat[FeatureSet_JsonFormat["LEGACY_BEST_EFFORT"] = 2] = "LEGACY_BEST_EFFORT";
})(FeatureSet_JsonFormat$2 || (FeatureSet_JsonFormat$2 = {}));
/**
* @generated from enum google.protobuf.FeatureSet.EnforceNamingStyle
*/
var FeatureSet_EnforceNamingStyle$2;
(function(FeatureSet_EnforceNamingStyle) {
	/**
	* @generated from enum value: ENFORCE_NAMING_STYLE_UNKNOWN = 0;
	*/
	FeatureSet_EnforceNamingStyle[FeatureSet_EnforceNamingStyle["ENFORCE_NAMING_STYLE_UNKNOWN"] = 0] = "ENFORCE_NAMING_STYLE_UNKNOWN";
	/**
	* @generated from enum value: STYLE2024 = 1;
	*/
	FeatureSet_EnforceNamingStyle[FeatureSet_EnforceNamingStyle["STYLE2024"] = 1] = "STYLE2024";
	/**
	* @generated from enum value: STYLE_LEGACY = 2;
	*/
	FeatureSet_EnforceNamingStyle[FeatureSet_EnforceNamingStyle["STYLE_LEGACY"] = 2] = "STYLE_LEGACY";
})(FeatureSet_EnforceNamingStyle$2 || (FeatureSet_EnforceNamingStyle$2 = {}));
/**
* Represents the identified object's effect on the element in the original
* .proto file.
*
* @generated from enum google.protobuf.GeneratedCodeInfo.Annotation.Semantic
*/
var GeneratedCodeInfo_Annotation_Semantic$2;
(function(GeneratedCodeInfo_Annotation_Semantic) {
	/**
	* There is no effect or the effect is indescribable.
	*
	* @generated from enum value: NONE = 0;
	*/
	GeneratedCodeInfo_Annotation_Semantic[GeneratedCodeInfo_Annotation_Semantic["NONE"] = 0] = "NONE";
	/**
	* The element is set or otherwise mutated.
	*
	* @generated from enum value: SET = 1;
	*/
	GeneratedCodeInfo_Annotation_Semantic[GeneratedCodeInfo_Annotation_Semantic["SET"] = 1] = "SET";
	/**
	* An alias to the element is returned.
	*
	* @generated from enum value: ALIAS = 2;
	*/
	GeneratedCodeInfo_Annotation_Semantic[GeneratedCodeInfo_Annotation_Semantic["ALIAS"] = 2] = "ALIAS";
})(GeneratedCodeInfo_Annotation_Semantic$2 || (GeneratedCodeInfo_Annotation_Semantic$2 = {}));
/**
* The full set of known editions.
*
* @generated from enum google.protobuf.Edition
*/
var Edition$2;
(function(Edition) {
	/**
	* A placeholder for an unknown edition value.
	*
	* @generated from enum value: EDITION_UNKNOWN = 0;
	*/
	Edition[Edition["EDITION_UNKNOWN"] = 0] = "EDITION_UNKNOWN";
	/**
	* A placeholder edition for specifying default behaviors *before* a feature
	* was first introduced.  This is effectively an "infinite past".
	*
	* @generated from enum value: EDITION_LEGACY = 900;
	*/
	Edition[Edition["EDITION_LEGACY"] = 900] = "EDITION_LEGACY";
	/**
	* Legacy syntax "editions".  These pre-date editions, but behave much like
	* distinct editions.  These can't be used to specify the edition of proto
	* files, but feature definitions must supply proto2/proto3 defaults for
	* backwards compatibility.
	*
	* @generated from enum value: EDITION_PROTO2 = 998;
	*/
	Edition[Edition["EDITION_PROTO2"] = 998] = "EDITION_PROTO2";
	/**
	* @generated from enum value: EDITION_PROTO3 = 999;
	*/
	Edition[Edition["EDITION_PROTO3"] = 999] = "EDITION_PROTO3";
	/**
	* Editions that have been released.  The specific values are arbitrary and
	* should not be depended on, but they will always be time-ordered for easy
	* comparison.
	*
	* @generated from enum value: EDITION_2023 = 1000;
	*/
	Edition[Edition["EDITION_2023"] = 1e3] = "EDITION_2023";
	/**
	* @generated from enum value: EDITION_2024 = 1001;
	*/
	Edition[Edition["EDITION_2024"] = 1001] = "EDITION_2024";
	/**
	* Placeholder editions for testing feature resolution.  These should not be
	* used or relied on outside of tests.
	*
	* @generated from enum value: EDITION_1_TEST_ONLY = 1;
	*/
	Edition[Edition["EDITION_1_TEST_ONLY"] = 1] = "EDITION_1_TEST_ONLY";
	/**
	* @generated from enum value: EDITION_2_TEST_ONLY = 2;
	*/
	Edition[Edition["EDITION_2_TEST_ONLY"] = 2] = "EDITION_2_TEST_ONLY";
	/**
	* @generated from enum value: EDITION_99997_TEST_ONLY = 99997;
	*/
	Edition[Edition["EDITION_99997_TEST_ONLY"] = 99997] = "EDITION_99997_TEST_ONLY";
	/**
	* @generated from enum value: EDITION_99998_TEST_ONLY = 99998;
	*/
	Edition[Edition["EDITION_99998_TEST_ONLY"] = 99998] = "EDITION_99998_TEST_ONLY";
	/**
	* @generated from enum value: EDITION_99999_TEST_ONLY = 99999;
	*/
	Edition[Edition["EDITION_99999_TEST_ONLY"] = 99999] = "EDITION_99999_TEST_ONLY";
	/**
	* Placeholder for specifying unbounded edition support.  This should only
	* ever be used by plugins that can expect to never require any changes to
	* support a new edition.
	*
	* @generated from enum value: EDITION_MAX = 2147483647;
	*/
	Edition[Edition["EDITION_MAX"] = 2147483647] = "EDITION_MAX";
})(Edition$2 || (Edition$2 = {}));
/**
* Describes the 'visibility' of a symbol with respect to the proto import
* system. Symbols can only be imported when the visibility rules do not prevent
* it (ex: local symbols cannot be imported).  Visibility modifiers can only set
* on `message` and `enum` as they are the only types available to be referenced
* from other files.
*
* @generated from enum google.protobuf.SymbolVisibility
*/
var SymbolVisibility$2;
(function(SymbolVisibility) {
	/**
	* @generated from enum value: VISIBILITY_UNSET = 0;
	*/
	SymbolVisibility[SymbolVisibility["VISIBILITY_UNSET"] = 0] = "VISIBILITY_UNSET";
	/**
	* @generated from enum value: VISIBILITY_LOCAL = 1;
	*/
	SymbolVisibility[SymbolVisibility["VISIBILITY_LOCAL"] = 1] = "VISIBILITY_LOCAL";
	/**
	* @generated from enum value: VISIBILITY_EXPORT = 2;
	*/
	SymbolVisibility[SymbolVisibility["VISIBILITY_EXPORT"] = 2] = "VISIBILITY_EXPORT";
})(SymbolVisibility$2 || (SymbolVisibility$2 = {}));
//#endregion
//#region ../../node_modules/@connectrpc/connect/node_modules/@bufbuild/protobuf/dist/esm/from-binary.js
var readDefaults$2 = { readUnknownFields: true };
function makeReadOptions$4(options) {
	return options ? Object.assign(Object.assign({}, readDefaults$2), options) : readDefaults$2;
}
/**
* Parse serialized binary data.
*/
function fromBinary$2(schema, bytes, options) {
	const msg = reflect$2(schema, void 0, false);
	readMessage$4(msg, new BinaryReader$2(bytes), makeReadOptions$4(options), false, bytes.byteLength);
	return msg.message;
}
/**
* If `delimited` is false, read the length given in `lengthOrDelimitedFieldNo`.
*
* If `delimited` is true, read until an EndGroup tag. `lengthOrDelimitedFieldNo`
* is the expected field number.
*
* @private
*/
function readMessage$4(message, reader, options, delimited, lengthOrDelimitedFieldNo) {
	var _a;
	const end = delimited ? reader.len : reader.pos + lengthOrDelimitedFieldNo;
	let fieldNo;
	let wireType;
	const unknownFields = (_a = message.getUnknown()) !== null && _a !== void 0 ? _a : [];
	while (reader.pos < end) {
		[fieldNo, wireType] = reader.tag();
		if (delimited && wireType == WireType$2.EndGroup) break;
		const field = message.findNumber(fieldNo);
		if (!field) {
			const data = reader.skip(wireType, fieldNo);
			if (options.readUnknownFields) unknownFields.push({
				no: fieldNo,
				wireType,
				data
			});
			continue;
		}
		readField$4(message, reader, field, wireType, options);
	}
	if (delimited) {
		if (wireType != WireType$2.EndGroup || fieldNo !== lengthOrDelimitedFieldNo) throw new Error("invalid end group tag");
	}
	if (unknownFields.length > 0) message.setUnknown(unknownFields);
}
/**
* @private
*/
function readField$4(message, reader, field, wireType, options) {
	var _a;
	switch (field.fieldKind) {
		case "scalar":
			message.set(field, readScalar$2(reader, field.scalar));
			break;
		case "enum":
			const val = readScalar$2(reader, ScalarType$2.INT32);
			if (field.enum.open) message.set(field, val);
			else if (field.enum.values.some((v) => v.number === val)) message.set(field, val);
			else if (options.readUnknownFields) {
				const bytes = [];
				varint32write$2(val, bytes);
				const unknownFields = (_a = message.getUnknown()) !== null && _a !== void 0 ? _a : [];
				unknownFields.push({
					no: field.number,
					wireType,
					data: new Uint8Array(bytes)
				});
				message.setUnknown(unknownFields);
			}
			break;
		case "message":
			message.set(field, readMessageField$4(reader, options, field, message.get(field)));
			break;
		case "list":
			readListField$4(reader, wireType, message.get(field), options);
			break;
		case "map":
			readMapEntry$2(reader, message.get(field), options);
			break;
	}
}
function readMapEntry$2(reader, map, options) {
	const field = map.field();
	let key;
	let val;
	const len = reader.uint32();
	const end = reader.pos + len;
	while (reader.pos < end) {
		const [fieldNo] = reader.tag();
		switch (fieldNo) {
			case 1:
				key = readScalar$2(reader, field.mapKey);
				break;
			case 2:
				switch (field.mapKind) {
					case "scalar":
						val = readScalar$2(reader, field.scalar);
						break;
					case "enum":
						val = reader.int32();
						break;
					case "message":
						val = readMessageField$4(reader, options, field);
						break;
				}
				break;
		}
	}
	if (key === void 0) key = scalarZeroValue$2(field.mapKey, false);
	if (val === void 0) switch (field.mapKind) {
		case "scalar":
			val = scalarZeroValue$2(field.scalar, false);
			break;
		case "enum":
			val = field.enum.values[0].number;
			break;
		case "message":
			val = reflect$2(field.message, void 0, false);
			break;
	}
	map.set(key, val);
}
function readListField$4(reader, wireType, list, options) {
	var _a;
	const field = list.field();
	if (field.listKind === "message") {
		list.add(readMessageField$4(reader, options, field));
		return;
	}
	const scalarType = (_a = field.scalar) !== null && _a !== void 0 ? _a : ScalarType$2.INT32;
	if (!(wireType == WireType$2.LengthDelimited && scalarType != ScalarType$2.STRING && scalarType != ScalarType$2.BYTES)) {
		list.add(readScalar$2(reader, scalarType));
		return;
	}
	const e = reader.uint32() + reader.pos;
	while (reader.pos < e) list.add(readScalar$2(reader, scalarType));
}
function readMessageField$4(reader, options, field, mergeMessage) {
	const delimited = field.delimitedEncoding;
	const message = mergeMessage !== null && mergeMessage !== void 0 ? mergeMessage : reflect$2(field.message, void 0, false);
	readMessage$4(message, reader, options, delimited, delimited ? field.number : reader.uint32());
	return message;
}
function readScalar$2(reader, type) {
	switch (type) {
		case ScalarType$2.STRING: return reader.string();
		case ScalarType$2.BOOL: return reader.bool();
		case ScalarType$2.DOUBLE: return reader.double();
		case ScalarType$2.FLOAT: return reader.float();
		case ScalarType$2.INT32: return reader.int32();
		case ScalarType$2.INT64: return reader.int64();
		case ScalarType$2.UINT64: return reader.uint64();
		case ScalarType$2.FIXED64: return reader.fixed64();
		case ScalarType$2.BYTES: return reader.bytes();
		case ScalarType$2.FIXED32: return reader.fixed32();
		case ScalarType$2.SFIXED32: return reader.sfixed32();
		case ScalarType$2.SFIXED64: return reader.sfixed64();
		case ScalarType$2.SINT64: return reader.sint64();
		case ScalarType$2.UINT32: return reader.uint32();
		case ScalarType$2.SINT32: return reader.sint32();
	}
}
//#endregion
//#region ../../node_modules/@connectrpc/connect/node_modules/@bufbuild/protobuf/dist/esm/codegenv2/file.js
/**
* Hydrate a file descriptor.
*
* @private
*/
function fileDesc$2(b64, imports) {
	var _a;
	const root = fromBinary$2(FileDescriptorProtoSchema$2, base64Decode$2(b64));
	root.messageType.forEach(restoreJsonNames$2);
	root.dependency = (_a = imports === null || imports === void 0 ? void 0 : imports.map((f) => f.proto.name)) !== null && _a !== void 0 ? _a : [];
	return createFileRegistry$2(root, (protoFileName) => imports === null || imports === void 0 ? void 0 : imports.find((f) => f.proto.name === protoFileName)).getFile(root.name);
}
/**
* Describes the message google.protobuf.Any.
* Use `create(AnySchema)` to create a new message.
*/
var AnySchema$1 = /* @__PURE__ */ messageDesc$2(/* @__PURE__ */ fileDesc$2("Chlnb29nbGUvcHJvdG9idWYvYW55LnByb3RvEg9nb29nbGUucHJvdG9idWYiJgoDQW55EhAKCHR5cGVfdXJsGAEgASgJEg0KBXZhbHVlGAIgASgMQnYKE2NvbS5nb29nbGUucHJvdG9idWZCCEFueVByb3RvUAFaLGdvb2dsZS5nb2xhbmcub3JnL3Byb3RvYnVmL3R5cGVzL2tub3duL2FueXBiogIDR1BCqgIeR29vZ2xlLlByb3RvYnVmLldlbGxLbm93blR5cGVzYgZwcm90bzM"), 0);
//#endregion
//#region ../../node_modules/@connectrpc/connect/node_modules/@bufbuild/protobuf/dist/esm/to-binary.js
var LEGACY_REQUIRED$4 = 3;
var writeDefaults$1 = { writeUnknownFields: true };
function makeWriteOptions$2(options) {
	return options ? Object.assign(Object.assign({}, writeDefaults$1), options) : writeDefaults$1;
}
function toBinary$1(schema, message, options) {
	return writeFields$1(new BinaryWriter$1(), makeWriteOptions$2(options), reflect$2(schema, message)).finish();
}
function writeFields$1(writer, opts, msg) {
	var _a;
	for (const f of msg.sortedFields) {
		if (!msg.isSet(f)) {
			if (f.presence == LEGACY_REQUIRED$4) throw new Error(`cannot encode ${f} to binary: required field not set`);
			continue;
		}
		writeField$1(writer, opts, msg, f);
	}
	if (opts.writeUnknownFields) for (const { no, wireType, data } of (_a = msg.getUnknown()) !== null && _a !== void 0 ? _a : []) writer.tag(no, wireType).raw(data);
	return writer;
}
/**
* @private
*/
function writeField$1(writer, opts, msg, field) {
	var _a;
	switch (field.fieldKind) {
		case "scalar":
		case "enum":
			writeScalar$1(writer, msg.desc.typeName, field.name, (_a = field.scalar) !== null && _a !== void 0 ? _a : ScalarType$2.INT32, field.number, msg.get(field));
			break;
		case "list":
			writeListField$1(writer, opts, field, msg.get(field));
			break;
		case "message":
			writeMessageField$1(writer, opts, field, msg.get(field));
			break;
		case "map":
			for (const [key, val] of msg.get(field)) writeMapEntry$1(writer, opts, field, key, val);
			break;
	}
}
function writeScalar$1(writer, msgName, fieldName, scalarType, fieldNo, value) {
	writeScalarValue$1(writer.tag(fieldNo, writeTypeOfScalar$1(scalarType)), msgName, fieldName, scalarType, value);
}
function writeMessageField$1(writer, opts, field, message) {
	if (field.delimitedEncoding) writeFields$1(writer.tag(field.number, WireType$2.StartGroup), opts, message).tag(field.number, WireType$2.EndGroup);
	else writeFields$1(writer.tag(field.number, WireType$2.LengthDelimited).fork(), opts, message).join();
}
function writeListField$1(writer, opts, field, list) {
	var _a;
	if (field.listKind == "message") {
		for (const item of list) writeMessageField$1(writer, opts, field, item);
		return;
	}
	const scalarType = (_a = field.scalar) !== null && _a !== void 0 ? _a : ScalarType$2.INT32;
	if (field.packed) {
		if (!list.size) return;
		writer.tag(field.number, WireType$2.LengthDelimited).fork();
		for (const item of list) writeScalarValue$1(writer, field.parent.typeName, field.name, scalarType, item);
		writer.join();
		return;
	}
	for (const item of list) writeScalar$1(writer, field.parent.typeName, field.name, scalarType, field.number, item);
}
function writeMapEntry$1(writer, opts, field, key, value) {
	var _a;
	writer.tag(field.number, WireType$2.LengthDelimited).fork();
	writeScalar$1(writer, field.parent.typeName, field.name, field.mapKey, 1, key);
	switch (field.mapKind) {
		case "scalar":
		case "enum":
			writeScalar$1(writer, field.parent.typeName, field.name, (_a = field.scalar) !== null && _a !== void 0 ? _a : ScalarType$2.INT32, 2, value);
			break;
		case "message":
			writeFields$1(writer.tag(2, WireType$2.LengthDelimited).fork(), opts, value).join();
			break;
	}
	writer.join();
}
function writeScalarValue$1(writer, msgName, fieldName, type, value) {
	try {
		switch (type) {
			case ScalarType$2.STRING:
				writer.string(value);
				break;
			case ScalarType$2.BOOL:
				writer.bool(value);
				break;
			case ScalarType$2.DOUBLE:
				writer.double(value);
				break;
			case ScalarType$2.FLOAT:
				writer.float(value);
				break;
			case ScalarType$2.INT32:
				writer.int32(value);
				break;
			case ScalarType$2.INT64:
				writer.int64(value);
				break;
			case ScalarType$2.UINT64:
				writer.uint64(value);
				break;
			case ScalarType$2.FIXED64:
				writer.fixed64(value);
				break;
			case ScalarType$2.BYTES:
				writer.bytes(value);
				break;
			case ScalarType$2.FIXED32:
				writer.fixed32(value);
				break;
			case ScalarType$2.SFIXED32:
				writer.sfixed32(value);
				break;
			case ScalarType$2.SFIXED64:
				writer.sfixed64(value);
				break;
			case ScalarType$2.SINT64:
				writer.sint64(value);
				break;
			case ScalarType$2.UINT32:
				writer.uint32(value);
				break;
			case ScalarType$2.SINT32:
				writer.sint32(value);
				break;
		}
	} catch (e) {
		if (e instanceof Error) throw new Error(`cannot encode field ${msgName}.${fieldName} to binary: ${e.message}`);
		throw e;
	}
}
function writeTypeOfScalar$1(type) {
	switch (type) {
		case ScalarType$2.BYTES:
		case ScalarType$2.STRING: return WireType$2.LengthDelimited;
		case ScalarType$2.DOUBLE:
		case ScalarType$2.FIXED64:
		case ScalarType$2.SFIXED64: return WireType$2.Bit64;
		case ScalarType$2.FIXED32:
		case ScalarType$2.SFIXED32:
		case ScalarType$2.FLOAT: return WireType$2.Bit32;
		default: return WireType$2.Varint;
	}
}
//#endregion
//#region ../../node_modules/@connectrpc/connect/node_modules/@bufbuild/protobuf/dist/esm/wkt/any.js
function anyPack$1(schema, message, into) {
	let ret = false;
	if (!into) {
		into = create$2(AnySchema$1);
		ret = true;
	}
	into.value = toBinary$1(schema, message);
	into.typeUrl = typeNameToUrl$1(message.$typeName);
	return ret ? into : void 0;
}
function anyIs(any, descOrTypeName) {
	if (any.typeUrl === "") return false;
	return (typeof descOrTypeName == "string" ? descOrTypeName : descOrTypeName.typeName) === typeUrlToName(any.typeUrl);
}
function anyUnpack(any, registryOrMessageDesc) {
	if (any.typeUrl === "") return;
	const desc = registryOrMessageDesc.kind == "message" ? registryOrMessageDesc : registryOrMessageDesc.getMessage(typeUrlToName(any.typeUrl));
	if (!desc || !anyIs(any, desc)) return;
	return fromBinary$2(desc, any.value);
}
function typeNameToUrl$1(name) {
	return `type.googleapis.com/${name}`;
}
function typeUrlToName(url) {
	const slash = url.lastIndexOf("/");
	const name = slash >= 0 ? url.substring(slash + 1) : url;
	if (!name.length) throw new Error(`invalid type url: ${url}`);
	return name;
}
//#endregion
//#region ../../node_modules/@connectrpc/connect/node_modules/@bufbuild/protobuf/dist/esm/wkt/gen/google/protobuf/struct_pb.js
/**
* Describes the file google/protobuf/struct.proto.
*/
var file_google_protobuf_struct$1 = /* @__PURE__ */ fileDesc$2("Chxnb29nbGUvcHJvdG9idWYvc3RydWN0LnByb3RvEg9nb29nbGUucHJvdG9idWYihAEKBlN0cnVjdBIzCgZmaWVsZHMYASADKAsyIy5nb29nbGUucHJvdG9idWYuU3RydWN0LkZpZWxkc0VudHJ5GkUKC0ZpZWxkc0VudHJ5EgsKA2tleRgBIAEoCRIlCgV2YWx1ZRgCIAEoCzIWLmdvb2dsZS5wcm90b2J1Zi5WYWx1ZToCOAEi6gEKBVZhbHVlEjAKCm51bGxfdmFsdWUYASABKA4yGi5nb29nbGUucHJvdG9idWYuTnVsbFZhbHVlSAASFgoMbnVtYmVyX3ZhbHVlGAIgASgBSAASFgoMc3RyaW5nX3ZhbHVlGAMgASgJSAASFAoKYm9vbF92YWx1ZRgEIAEoCEgAEi8KDHN0cnVjdF92YWx1ZRgFIAEoCzIXLmdvb2dsZS5wcm90b2J1Zi5TdHJ1Y3RIABIwCgpsaXN0X3ZhbHVlGAYgASgLMhouZ29vZ2xlLnByb3RvYnVmLkxpc3RWYWx1ZUgAQgYKBGtpbmQiMwoJTGlzdFZhbHVlEiYKBnZhbHVlcxgBIAMoCzIWLmdvb2dsZS5wcm90b2J1Zi5WYWx1ZSobCglOdWxsVmFsdWUSDgoKTlVMTF9WQUxVRRAAQn8KE2NvbS5nb29nbGUucHJvdG9idWZCC1N0cnVjdFByb3RvUAFaL2dvb2dsZS5nb2xhbmcub3JnL3Byb3RvYnVmL3R5cGVzL2tub3duL3N0cnVjdHBi+AEBogIDR1BCqgIeR29vZ2xlLlByb3RvYnVmLldlbGxLbm93blR5cGVzYgZwcm90bzM");
/**
* Describes the message google.protobuf.Struct.
* Use `create(StructSchema)` to create a new message.
*/
var StructSchema$1 = /* @__PURE__ */ messageDesc$2(file_google_protobuf_struct$1, 0);
/**
* Describes the message google.protobuf.Value.
* Use `create(ValueSchema)` to create a new message.
*/
var ValueSchema$1 = /* @__PURE__ */ messageDesc$2(file_google_protobuf_struct$1, 1);
/**
* Describes the message google.protobuf.ListValue.
* Use `create(ListValueSchema)` to create a new message.
*/
var ListValueSchema$1 = /* @__PURE__ */ messageDesc$2(file_google_protobuf_struct$1, 2);
/**
* `NullValue` is a singleton enumeration to represent the null value for the
* `Value` type union.
*
* The JSON representation for `NullValue` is JSON `null`.
*
* @generated from enum google.protobuf.NullValue
*/
var NullValue$1;
(function(NullValue) {
	/**
	* Null value.
	*
	* @generated from enum value: NULL_VALUE = 0;
	*/
	NullValue[NullValue["NULL_VALUE"] = 0] = "NULL_VALUE";
})(NullValue$1 || (NullValue$1 = {}));
//#endregion
//#region ../../node_modules/@connectrpc/connect/node_modules/@bufbuild/protobuf/dist/esm/extensions.js
/**
* Retrieve an extension value from a message.
*
* The function never returns undefined. Use hasExtension() to check whether an
* extension is set. If the extension is not set, this function returns the
* default value (if one was specified in the protobuf source), or the zero value
* (for example `0` for numeric types, `[]` for repeated extension fields, and
* an empty message instance for message fields).
*
* Extensions are stored as unknown fields on a message. To mutate an extension
* value, make sure to store the new value with setExtension() after mutating.
*
* If the extension does not extend the given message, an error is raised.
*/
function getExtension(message, extension) {
	assertExtendee$1(extension, message);
	const ufs = filterUnknownFields(message.$unknown, extension);
	const [container, field, get] = createExtensionContainer$1(extension);
	for (const uf of ufs) readField$4(container, new BinaryReader$2(uf.data), field, uf.wireType, { readUnknownFields: true });
	return get();
}
/**
* Set an extension value on a message. If the message already has a value for
* this extension, the value is replaced.
*
* If the extension does not extend the given message, an error is raised.
*/
function setExtension$1(message, extension, value) {
	var _a;
	assertExtendee$1(extension, message);
	const ufs = ((_a = message.$unknown) !== null && _a !== void 0 ? _a : []).filter((uf) => uf.no !== extension.number);
	const [container, field] = createExtensionContainer$1(extension, value);
	const writer = new BinaryWriter$1();
	writeField$1(writer, { writeUnknownFields: true }, container, field);
	const reader = new BinaryReader$2(writer.finish());
	while (reader.pos < reader.len) {
		const [no, wireType] = reader.tag();
		const data = reader.skip(wireType, no);
		ufs.push({
			no,
			wireType,
			data
		});
	}
	message.$unknown = ufs;
}
function filterUnknownFields(unknownFields, extension) {
	if (unknownFields === void 0) return [];
	if (extension.fieldKind === "enum" || extension.fieldKind === "scalar") {
		for (let i = unknownFields.length - 1; i >= 0; --i) if (unknownFields[i].no == extension.number) return [unknownFields[i]];
		return [];
	}
	return unknownFields.filter((uf) => uf.no === extension.number);
}
/**
* @private
*/
function createExtensionContainer$1(extension, value) {
	const localName = extension.typeName;
	const field = Object.assign(Object.assign({}, extension), {
		kind: "field",
		parent: extension.extendee,
		localName
	});
	const desc = Object.assign(Object.assign({}, extension.extendee), {
		fields: [field],
		members: [field],
		oneofs: []
	});
	const container = create$2(desc, value !== void 0 ? { [localName]: value } : void 0);
	return [
		reflect$2(desc, container),
		field,
		() => {
			const value = container[localName];
			if (value === void 0) {
				const desc = extension.message;
				if (isWrapperDesc$2(desc)) return scalarZeroValue$2(desc.fields[0].scalar, desc.fields[0].longAsString);
				return create$2(desc);
			}
			return value;
		}
	];
}
function assertExtendee$1(extension, message) {
	if (extension.extendee.typeName != message.$typeName) throw new Error(`extension ${extension.typeName} can only be applied to message ${extension.extendee.typeName}`);
}
//#endregion
//#region ../../node_modules/@connectrpc/connect/node_modules/@bufbuild/protobuf/dist/esm/to-json.js
var LEGACY_REQUIRED$3 = 3;
var IMPLICIT$6 = 2;
var jsonWriteDefaults = {
	alwaysEmitImplicit: false,
	enumAsInteger: false,
	useProtoFieldName: false
};
function makeWriteOptions$1(options) {
	return options ? Object.assign(Object.assign({}, jsonWriteDefaults), options) : jsonWriteDefaults;
}
/**
* Serialize the message to a JSON value, a JavaScript value that can be
* passed to JSON.stringify().
*/
function toJson(schema, message, options) {
	return reflectToJson(reflect$2(schema, message), makeWriteOptions$1(options));
}
/**
* Serialize the message to a JSON string.
*/
function toJsonString(schema, message, options) {
	var _a;
	const jsonValue = toJson(schema, message, options);
	return JSON.stringify(jsonValue, null, (_a = options === null || options === void 0 ? void 0 : options.prettySpaces) !== null && _a !== void 0 ? _a : 0);
}
function reflectToJson(msg, opts) {
	var _a;
	const wktJson = tryWktToJson(msg, opts);
	if (wktJson !== void 0) return wktJson;
	const json = {};
	for (const f of msg.sortedFields) {
		if (!msg.isSet(f)) {
			if (f.presence == LEGACY_REQUIRED$3) throw new Error(`cannot encode ${f} to JSON: required field not set`);
			if (!opts.alwaysEmitImplicit || f.presence !== IMPLICIT$6) continue;
		}
		const jsonValue = fieldToJson(f, msg.get(f), opts);
		if (jsonValue !== void 0) json[jsonName(f, opts)] = jsonValue;
	}
	if (opts.registry) {
		const tagSeen = /* @__PURE__ */ new Set();
		for (const { no } of (_a = msg.getUnknown()) !== null && _a !== void 0 ? _a : []) if (!tagSeen.has(no)) {
			tagSeen.add(no);
			const extension = opts.registry.getExtensionFor(msg.desc, no);
			if (!extension) continue;
			const [container, field] = createExtensionContainer$1(extension, getExtension(msg.message, extension));
			const jsonValue = fieldToJson(field, container.get(field), opts);
			if (jsonValue !== void 0) json[extension.jsonName] = jsonValue;
		}
	}
	return json;
}
function fieldToJson(f, val, opts) {
	switch (f.fieldKind) {
		case "scalar": return scalarToJson(f, val);
		case "message": return reflectToJson(val, opts);
		case "enum": return enumToJsonInternal(f.enum, val, opts.enumAsInteger);
		case "list": return listToJson(val, opts);
		case "map": return mapToJson(val, opts);
	}
}
function mapToJson(map, opts) {
	const f = map.field();
	const jsonObj = {};
	switch (f.mapKind) {
		case "scalar":
			for (const [entryKey, entryValue] of map) jsonObj[entryKey] = scalarToJson(f, entryValue);
			break;
		case "message":
			for (const [entryKey, entryValue] of map) jsonObj[entryKey] = reflectToJson(entryValue, opts);
			break;
		case "enum":
			for (const [entryKey, entryValue] of map) jsonObj[entryKey] = enumToJsonInternal(f.enum, entryValue, opts.enumAsInteger);
			break;
	}
	return opts.alwaysEmitImplicit || map.size > 0 ? jsonObj : void 0;
}
function listToJson(list, opts) {
	const f = list.field();
	const jsonArr = [];
	switch (f.listKind) {
		case "scalar":
			for (const item of list) jsonArr.push(scalarToJson(f, item));
			break;
		case "enum":
			for (const item of list) jsonArr.push(enumToJsonInternal(f.enum, item, opts.enumAsInteger));
			break;
		case "message":
			for (const item of list) jsonArr.push(reflectToJson(item, opts));
			break;
	}
	return opts.alwaysEmitImplicit || jsonArr.length > 0 ? jsonArr : void 0;
}
function enumToJsonInternal(desc, value, enumAsInteger) {
	var _a;
	if (typeof value != "number") throw new Error(`cannot encode ${desc} to JSON: expected number, got ${formatVal$2(value)}`);
	if (desc.typeName == "google.protobuf.NullValue") return null;
	if (enumAsInteger) return value;
	const val = desc.value[value];
	return (_a = val === null || val === void 0 ? void 0 : val.name) !== null && _a !== void 0 ? _a : value;
}
function scalarToJson(field, value) {
	var _a, _b, _c, _d, _e, _f;
	switch (field.scalar) {
		case ScalarType$2.INT32:
		case ScalarType$2.SFIXED32:
		case ScalarType$2.SINT32:
		case ScalarType$2.FIXED32:
		case ScalarType$2.UINT32:
			if (typeof value != "number") throw new Error(`cannot encode ${field} to JSON: ${(_a = checkField$2(field, value)) === null || _a === void 0 ? void 0 : _a.message}`);
			return value;
		case ScalarType$2.FLOAT:
		case ScalarType$2.DOUBLE:
			if (typeof value != "number") throw new Error(`cannot encode ${field} to JSON: ${(_b = checkField$2(field, value)) === null || _b === void 0 ? void 0 : _b.message}`);
			if (Number.isNaN(value)) return "NaN";
			if (value === Number.POSITIVE_INFINITY) return "Infinity";
			if (value === Number.NEGATIVE_INFINITY) return "-Infinity";
			return value;
		case ScalarType$2.STRING:
			if (typeof value != "string") throw new Error(`cannot encode ${field} to JSON: ${(_c = checkField$2(field, value)) === null || _c === void 0 ? void 0 : _c.message}`);
			return value;
		case ScalarType$2.BOOL:
			if (typeof value != "boolean") throw new Error(`cannot encode ${field} to JSON: ${(_d = checkField$2(field, value)) === null || _d === void 0 ? void 0 : _d.message}`);
			return value;
		case ScalarType$2.UINT64:
		case ScalarType$2.FIXED64:
		case ScalarType$2.INT64:
		case ScalarType$2.SFIXED64:
		case ScalarType$2.SINT64:
			if (typeof value != "bigint" && typeof value != "string") throw new Error(`cannot encode ${field} to JSON: ${(_e = checkField$2(field, value)) === null || _e === void 0 ? void 0 : _e.message}`);
			return value.toString();
		case ScalarType$2.BYTES:
			if (value instanceof Uint8Array) return base64Encode(value);
			throw new Error(`cannot encode ${field} to JSON: ${(_f = checkField$2(field, value)) === null || _f === void 0 ? void 0 : _f.message}`);
	}
}
function jsonName(f, opts) {
	return opts.useProtoFieldName ? f.name : f.jsonName;
}
function tryWktToJson(msg, opts) {
	if (!msg.desc.typeName.startsWith("google.protobuf.")) return;
	switch (msg.desc.typeName) {
		case "google.protobuf.Any": return anyToJson(msg.message, opts);
		case "google.protobuf.Timestamp": return timestampToJson(msg.message);
		case "google.protobuf.Duration": return durationToJson(msg.message);
		case "google.protobuf.FieldMask": return fieldMaskToJson(msg.message);
		case "google.protobuf.Struct": return structToJson(msg.message);
		case "google.protobuf.Value": return valueToJson(msg.message);
		case "google.protobuf.ListValue": return listValueToJson(msg.message);
		default:
			if (isWrapperDesc$2(msg.desc)) {
				const valueField = msg.desc.fields[0];
				return scalarToJson(valueField, msg.get(valueField));
			}
			return;
	}
}
function anyToJson(val, opts) {
	if (val.typeUrl === "") return {};
	const { registry } = opts;
	let message;
	let desc;
	if (registry) {
		message = anyUnpack(val, registry);
		if (message) desc = registry.getMessage(message.$typeName);
	}
	if (!desc || !message) throw new Error(`cannot encode message ${val.$typeName} to JSON: "${val.typeUrl}" is not in the type registry`);
	let json = reflectToJson(reflect$2(desc, message), opts);
	if (desc.typeName.startsWith("google.protobuf.") || json === null || Array.isArray(json) || typeof json !== "object") json = { value: json };
	json["@type"] = val.typeUrl;
	return json;
}
function durationToJson(val) {
	if (Number(val.seconds) > 315576e6 || Number(val.seconds) < -315576e6) throw new Error(`cannot encode message ${val.$typeName} to JSON: value out of range`);
	let text = val.seconds.toString();
	if (val.nanos !== 0) {
		let nanosStr = Math.abs(val.nanos).toString();
		nanosStr = "0".repeat(9 - nanosStr.length) + nanosStr;
		if (nanosStr.substring(3) === "000000") nanosStr = nanosStr.substring(0, 3);
		else if (nanosStr.substring(6) === "000") nanosStr = nanosStr.substring(0, 6);
		text += "." + nanosStr;
		if (val.nanos < 0 && Number(val.seconds) == 0) text = "-" + text;
	}
	return text + "s";
}
function fieldMaskToJson(val) {
	return val.paths.map((p) => {
		if (p.match(/_[0-9]?_/g) || p.match(/[A-Z]/g)) throw new Error(`cannot encode message ${val.$typeName} to JSON: lowerCamelCase of path name "` + p + "\" is irreversible");
		return protoCamelCase$2(p);
	}).join(",");
}
function structToJson(val) {
	const json = {};
	for (const [k, v] of Object.entries(val.fields)) json[k] = valueToJson(v);
	return json;
}
function valueToJson(val) {
	switch (val.kind.case) {
		case "nullValue": return null;
		case "numberValue":
			if (!Number.isFinite(val.kind.value)) throw new Error(`${val.$typeName} cannot be NaN or Infinity`);
			return val.kind.value;
		case "boolValue": return val.kind.value;
		case "stringValue": return val.kind.value;
		case "structValue": return structToJson(val.kind.value);
		case "listValue": return listValueToJson(val.kind.value);
		default: throw new Error(`${val.$typeName} must have a value`);
	}
}
function listValueToJson(val) {
	return val.values.map(valueToJson);
}
function timestampToJson(val) {
	const ms = Number(val.seconds) * 1e3;
	if (ms < Date.parse("0001-01-01T00:00:00Z") || ms > Date.parse("9999-12-31T23:59:59Z")) throw new Error(`cannot encode message ${val.$typeName} to JSON: must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive`);
	if (val.nanos < 0) throw new Error(`cannot encode message ${val.$typeName} to JSON: nanos must not be negative`);
	let z = "Z";
	if (val.nanos > 0) {
		const nanosStr = (val.nanos + 1e9).toString().substring(1);
		if (nanosStr.substring(3) === "000000") z = "." + nanosStr.substring(0, 3) + "Z";
		else if (nanosStr.substring(6) === "000") z = "." + nanosStr.substring(0, 6) + "Z";
		else z = "." + nanosStr + "Z";
	}
	return new Date(ms).toISOString().replace(".000Z", z);
}
//#endregion
//#region ../../node_modules/@connectrpc/connect/node_modules/@bufbuild/protobuf/dist/esm/from-json.js
var jsonReadDefaults$1 = { ignoreUnknownFields: false };
function makeReadOptions$3(options) {
	return options ? Object.assign(Object.assign({}, jsonReadDefaults$1), options) : jsonReadDefaults$1;
}
/**
* Parse a message from a JSON string.
*/
function fromJsonString(schema, json, options) {
	return fromJson$1(schema, parseJsonString(json, schema.typeName), options);
}
/**
* Parse a message from a JSON value.
*/
function fromJson$1(schema, json, options) {
	const msg = reflect$2(schema);
	try {
		readMessage$3(msg, json, makeReadOptions$3(options));
	} catch (e) {
		if (isFieldError$1(e)) throw new Error(`cannot decode ${e.field()} from JSON: ${e.message}`, { cause: e });
		throw e;
	}
	return msg.message;
}
function readMessage$3(msg, json, opts) {
	var _a;
	if (tryWktFromJson$1(msg, json, opts)) return;
	if (json == null || Array.isArray(json) || typeof json != "object") throw new Error(`cannot decode ${msg.desc} from JSON: ${formatVal$2(json)}`);
	const oneofSeen = /* @__PURE__ */ new Map();
	const jsonNames = /* @__PURE__ */ new Map();
	for (const field of msg.desc.fields) jsonNames.set(field.name, field).set(field.jsonName, field);
	for (const [jsonKey, jsonValue] of Object.entries(json)) {
		const field = jsonNames.get(jsonKey);
		if (field) {
			if (field.oneof) {
				if (jsonValue === null && field.fieldKind == "scalar") continue;
				const seen = oneofSeen.get(field.oneof);
				if (seen !== void 0) throw new FieldError$2(field.oneof, `oneof set multiple times by ${seen.name} and ${field.name}`);
				oneofSeen.set(field.oneof, field);
			}
			readField$3(msg, field, jsonValue, opts);
		} else {
			let extension = void 0;
			if (jsonKey.startsWith("[") && jsonKey.endsWith("]") && (extension = (_a = opts.registry) === null || _a === void 0 ? void 0 : _a.getExtension(jsonKey.substring(1, jsonKey.length - 1))) && extension.extendee.typeName === msg.desc.typeName) {
				const [container, field, get] = createExtensionContainer$1(extension);
				readField$3(container, field, jsonValue, opts);
				setExtension$1(msg.message, extension, get());
			}
			if (!extension && !opts.ignoreUnknownFields) throw new Error(`cannot decode ${msg.desc} from JSON: key "${jsonKey}" is unknown`);
		}
	}
}
function readField$3(msg, field, json, opts) {
	switch (field.fieldKind) {
		case "scalar":
			readScalarField$1(msg, field, json);
			break;
		case "enum":
			readEnumField$1(msg, field, json, opts);
			break;
		case "message":
			readMessageField$3(msg, field, json, opts);
			break;
		case "list":
			readListField$3(msg.get(field), json, opts);
			break;
		case "map":
			readMapField$1(msg.get(field), json, opts);
			break;
	}
}
function readMapField$1(map, json, opts) {
	if (json === null) return;
	const field = map.field();
	if (typeof json != "object" || Array.isArray(json)) throw new FieldError$2(field, "expected object, got " + formatVal$2(json));
	for (const [jsonMapKey, jsonMapValue] of Object.entries(json)) {
		if (jsonMapValue === null) throw new FieldError$2(field, "map value must not be null");
		let value;
		switch (field.mapKind) {
			case "message":
				const msgValue = reflect$2(field.message);
				readMessage$3(msgValue, jsonMapValue, opts);
				value = msgValue;
				break;
			case "enum":
				value = readEnum$1(field.enum, jsonMapValue, opts.ignoreUnknownFields, true);
				if (value === tokenIgnoredUnknownEnum$1) return;
				break;
			case "scalar":
				value = scalarFromJson$1(field, jsonMapValue, true);
				break;
		}
		const key = mapKeyFromJson$1(field.mapKey, jsonMapKey);
		map.set(key, value);
	}
}
function readListField$3(list, json, opts) {
	if (json === null) return;
	const field = list.field();
	if (!Array.isArray(json)) throw new FieldError$2(field, "expected Array, got " + formatVal$2(json));
	for (const jsonItem of json) {
		if (jsonItem === null) throw new FieldError$2(field, "list item must not be null");
		switch (field.listKind) {
			case "message":
				const msgValue = reflect$2(field.message);
				readMessage$3(msgValue, jsonItem, opts);
				list.add(msgValue);
				break;
			case "enum":
				const enumValue = readEnum$1(field.enum, jsonItem, opts.ignoreUnknownFields, true);
				if (enumValue !== tokenIgnoredUnknownEnum$1) list.add(enumValue);
				break;
			case "scalar":
				list.add(scalarFromJson$1(field, jsonItem, true));
				break;
		}
	}
}
function readMessageField$3(msg, field, json, opts) {
	if (json === null && field.message.typeName != "google.protobuf.Value") {
		msg.clear(field);
		return;
	}
	const msgValue = msg.isSet(field) ? msg.get(field) : reflect$2(field.message);
	readMessage$3(msgValue, json, opts);
	msg.set(field, msgValue);
}
function readEnumField$1(msg, field, json, opts) {
	const enumValue = readEnum$1(field.enum, json, opts.ignoreUnknownFields, false);
	if (enumValue === tokenNull$1) msg.clear(field);
	else if (enumValue !== tokenIgnoredUnknownEnum$1) msg.set(field, enumValue);
}
function readScalarField$1(msg, field, json) {
	const scalarValue = scalarFromJson$1(field, json, false);
	if (scalarValue === tokenNull$1) msg.clear(field);
	else msg.set(field, scalarValue);
}
var tokenIgnoredUnknownEnum$1 = Symbol();
function readEnum$1(desc, json, ignoreUnknownFields, nullAsZeroValue) {
	if (json === null) {
		if (desc.typeName == "google.protobuf.NullValue") return 0;
		return nullAsZeroValue ? desc.values[0].number : tokenNull$1;
	}
	switch (typeof json) {
		case "number":
			if (Number.isInteger(json)) return json;
			break;
		case "string":
			const value = desc.values.find((ev) => ev.name === json);
			if (value !== void 0) return value.number;
			if (ignoreUnknownFields) return tokenIgnoredUnknownEnum$1;
			break;
	}
	throw new Error(`cannot decode ${desc} from JSON: ${formatVal$2(json)}`);
}
var tokenNull$1 = Symbol();
function scalarFromJson$1(field, json, nullAsZeroValue) {
	if (json === null) {
		if (nullAsZeroValue) return scalarZeroValue$2(field.scalar, false);
		return tokenNull$1;
	}
	switch (field.scalar) {
		case ScalarType$2.DOUBLE:
		case ScalarType$2.FLOAT:
			if (json === "NaN") return NaN;
			if (json === "Infinity") return Number.POSITIVE_INFINITY;
			if (json === "-Infinity") return Number.NEGATIVE_INFINITY;
			if (typeof json == "number") {
				if (Number.isNaN(json)) throw new FieldError$2(field, "unexpected NaN number");
				if (!Number.isFinite(json)) throw new FieldError$2(field, "unexpected infinite number");
				break;
			}
			if (typeof json == "string") {
				if (json === "") break;
				if (json.trim().length !== json.length) break;
				const float = Number(json);
				if (!Number.isFinite(float)) break;
				return float;
			}
			break;
		case ScalarType$2.INT32:
		case ScalarType$2.FIXED32:
		case ScalarType$2.SFIXED32:
		case ScalarType$2.SINT32:
		case ScalarType$2.UINT32: return int32FromJson$1(json);
		case ScalarType$2.BYTES:
			if (typeof json == "string") {
				if (json === "") return new Uint8Array(0);
				try {
					return base64Decode$2(json);
				} catch (e) {
					throw new FieldError$2(field, e instanceof Error ? e.message : String(e));
				}
			}
			break;
	}
	return json;
}
/**
* Try to parse a JSON value to a map key for the reflect API.
*
* Returns the input if the JSON value cannot be converted.
*/
function mapKeyFromJson$1(type, json) {
	switch (type) {
		case ScalarType$2.BOOL:
			switch (json) {
				case "true": return true;
				case "false": return false;
			}
			return json;
		case ScalarType$2.INT32:
		case ScalarType$2.FIXED32:
		case ScalarType$2.UINT32:
		case ScalarType$2.SFIXED32:
		case ScalarType$2.SINT32: return int32FromJson$1(json);
		default: return json;
	}
}
/**
* Try to parse a JSON value to a 32-bit integer for the reflect API.
*
* Returns the input if the JSON value cannot be converted.
*/
function int32FromJson$1(json) {
	if (typeof json == "string") {
		if (json === "") return json;
		if (json.trim().length !== json.length) return json;
		const num = Number(json);
		if (Number.isNaN(num)) return json;
		return num;
	}
	return json;
}
function parseJsonString(jsonString, typeName) {
	try {
		return JSON.parse(jsonString);
	} catch (e) {
		const message = e instanceof Error ? e.message : String(e);
		throw new Error(`cannot decode message ${typeName} from JSON: ${message}`, { cause: e });
	}
}
function tryWktFromJson$1(msg, jsonValue, opts) {
	if (!msg.desc.typeName.startsWith("google.protobuf.")) return false;
	switch (msg.desc.typeName) {
		case "google.protobuf.Any":
			anyFromJson$1(msg.message, jsonValue, opts);
			return true;
		case "google.protobuf.Timestamp":
			timestampFromJson$1(msg.message, jsonValue);
			return true;
		case "google.protobuf.Duration":
			durationFromJson$1(msg.message, jsonValue);
			return true;
		case "google.protobuf.FieldMask":
			fieldMaskFromJson$1(msg.message, jsonValue);
			return true;
		case "google.protobuf.Struct":
			structFromJson$1(msg.message, jsonValue);
			return true;
		case "google.protobuf.Value":
			valueFromJson$1(msg.message, jsonValue);
			return true;
		case "google.protobuf.ListValue":
			listValueFromJson$1(msg.message, jsonValue);
			return true;
		default:
			if (isWrapperDesc$2(msg.desc)) {
				const valueField = msg.desc.fields[0];
				if (jsonValue === null) msg.clear(valueField);
				else msg.set(valueField, scalarFromJson$1(valueField, jsonValue, true));
				return true;
			}
			return false;
	}
}
function anyFromJson$1(any, json, opts) {
	var _a;
	if (json === null || Array.isArray(json) || typeof json != "object") throw new Error(`cannot decode message ${any.$typeName} from JSON: expected object but got ${formatVal$2(json)}`);
	if (Object.keys(json).length == 0) return;
	const typeUrl = json["@type"];
	if (typeof typeUrl != "string" || typeUrl == "") throw new Error(`cannot decode message ${any.$typeName} from JSON: "@type" is empty`);
	const typeName = typeUrl.includes("/") ? typeUrl.substring(typeUrl.lastIndexOf("/") + 1) : typeUrl;
	if (!typeName.length) throw new Error(`cannot decode message ${any.$typeName} from JSON: "@type" is invalid`);
	const desc = (_a = opts.registry) === null || _a === void 0 ? void 0 : _a.getMessage(typeName);
	if (!desc) throw new Error(`cannot decode message ${any.$typeName} from JSON: ${typeUrl} is not in the type registry`);
	const msg = reflect$2(desc);
	if (typeName.startsWith("google.protobuf.") && Object.prototype.hasOwnProperty.call(json, "value")) {
		const value = json.value;
		readMessage$3(msg, value, opts);
	} else {
		const copy = Object.assign({}, json);
		delete copy["@type"];
		readMessage$3(msg, copy, opts);
	}
	anyPack$1(msg.desc, msg.message, any);
}
function timestampFromJson$1(timestamp, json) {
	if (typeof json !== "string") throw new Error(`cannot decode message ${timestamp.$typeName} from JSON: ${formatVal$2(json)}`);
	const matches = json.match(/^([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2}):([0-9]{2})(?:\.([0-9]{1,9}))?(?:Z|([+-][0-9][0-9]:[0-9][0-9]))$/);
	if (!matches) throw new Error(`cannot decode message ${timestamp.$typeName} from JSON: invalid RFC 3339 string`);
	const ms = Date.parse(matches[1] + "-" + matches[2] + "-" + matches[3] + "T" + matches[4] + ":" + matches[5] + ":" + matches[6] + (matches[8] ? matches[8] : "Z"));
	if (Number.isNaN(ms)) throw new Error(`cannot decode message ${timestamp.$typeName} from JSON: invalid RFC 3339 string`);
	if (ms < Date.parse("0001-01-01T00:00:00Z") || ms > Date.parse("9999-12-31T23:59:59Z")) throw new Error(`cannot decode message ${timestamp.$typeName} from JSON: must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive`);
	timestamp.seconds = protoInt64$2.parse(ms / 1e3);
	timestamp.nanos = 0;
	if (matches[7]) timestamp.nanos = parseInt("1" + matches[7] + "0".repeat(9 - matches[7].length)) - 1e9;
}
function durationFromJson$1(duration, json) {
	if (typeof json !== "string") throw new Error(`cannot decode message ${duration.$typeName} from JSON: ${formatVal$2(json)}`);
	const match = json.match(/^(-?[0-9]+)(?:\.([0-9]+))?s/);
	if (match === null) throw new Error(`cannot decode message ${duration.$typeName} from JSON: ${formatVal$2(json)}`);
	const longSeconds = Number(match[1]);
	if (longSeconds > 315576e6 || longSeconds < -315576e6) throw new Error(`cannot decode message ${duration.$typeName} from JSON: ${formatVal$2(json)}`);
	duration.seconds = protoInt64$2.parse(longSeconds);
	if (typeof match[2] !== "string") return;
	const nanosStr = match[2] + "0".repeat(9 - match[2].length);
	duration.nanos = parseInt(nanosStr);
	if (longSeconds < 0 || Object.is(longSeconds, -0)) duration.nanos = -duration.nanos;
}
function fieldMaskFromJson$1(fieldMask, json) {
	if (typeof json !== "string") throw new Error(`cannot decode message ${fieldMask.$typeName} from JSON: ${formatVal$2(json)}`);
	if (json === "") return;
	function camelToSnake(str) {
		if (str.includes("_")) throw new Error(`cannot decode message ${fieldMask.$typeName} from JSON: path names must be lowerCamelCase`);
		const sc = str.replace(/[A-Z]/g, (letter) => "_" + letter.toLowerCase());
		return sc[0] === "_" ? sc.substring(1) : sc;
	}
	fieldMask.paths = json.split(",").map(camelToSnake);
}
function structFromJson$1(struct, json) {
	if (typeof json != "object" || json == null || Array.isArray(json)) throw new Error(`cannot decode message ${struct.$typeName} from JSON ${formatVal$2(json)}`);
	for (const [k, v] of Object.entries(json)) {
		const parsedV = create$2(ValueSchema$1);
		valueFromJson$1(parsedV, v);
		struct.fields[k] = parsedV;
	}
}
function valueFromJson$1(value, json) {
	switch (typeof json) {
		case "number":
			value.kind = {
				case: "numberValue",
				value: json
			};
			break;
		case "string":
			value.kind = {
				case: "stringValue",
				value: json
			};
			break;
		case "boolean":
			value.kind = {
				case: "boolValue",
				value: json
			};
			break;
		case "object":
			if (json === null) value.kind = {
				case: "nullValue",
				value: NullValue$1.NULL_VALUE
			};
			else if (Array.isArray(json)) {
				const listValue = create$2(ListValueSchema$1);
				listValueFromJson$1(listValue, json);
				value.kind = {
					case: "listValue",
					value: listValue
				};
			} else {
				const struct = create$2(StructSchema$1);
				structFromJson$1(struct, json);
				value.kind = {
					case: "structValue",
					value: struct
				};
			}
			break;
		default: throw new Error(`cannot decode message ${value.$typeName} from JSON ${formatVal$2(json)}`);
	}
	return value;
}
function listValueFromJson$1(listValue, json) {
	if (!Array.isArray(json)) throw new Error(`cannot decode message ${listValue.$typeName} from JSON ${formatVal$2(json)}`);
	for (const e of json) {
		const value = create$2(ValueSchema$1);
		valueFromJson$1(value, e);
		listValue.values.push(value);
	}
}
//#endregion
//#region ../../node_modules/@connectrpc/connect/dist/esm/protocol-connect/code-string.js
/**
* codeToString returns the string representation of a Code.
*
* @private Internal code, does not follow semantic versioning.
*/
function codeToString(value) {
	const name = Code[value];
	if (typeof name != "string") return value.toString();
	return name[0].toLowerCase() + name.substring(1).replace(/[A-Z]/g, (c) => "_" + c.toLowerCase());
}
var stringToCode;
/**
* codeFromString parses the string representation of a Code in snake_case.
* For example, the string "permission_denied" parses into Code.PermissionDenied.
*
* If the given string cannot be parsed, the function returns undefined.
*
* @private Internal code, does not follow semantic versioning.
*/
function codeFromString(value) {
	if (!stringToCode) {
		stringToCode = {};
		for (const value of Object.values(Code)) {
			if (typeof value == "string") continue;
			stringToCode[codeToString(value)] = value;
		}
	}
	return stringToCode[value];
}
//#endregion
//#region ../../node_modules/@connectrpc/connect/dist/esm/connect-error.js
/**
* ConnectError captures four pieces of information: a Code, an error
* message, an optional cause of the error, and an optional collection of
* arbitrary Protobuf messages called  "details".
*
* Because developer tools typically show just the error message, we prefix
* it with the status code, so that the most important information is always
* visible immediately.
*
* Error details are wrapped with google.protobuf.Any on the wire, so that
* a server or middleware can attach arbitrary data to an error. Use the
* method findDetails() to retrieve the details.
*/
var ConnectError = class ConnectError extends Error {
	/**
	* Create a new ConnectError.
	* If no code is provided, code "unknown" is used.
	* Outgoing details are only relevant for the server side - a service may
	* raise an error with details, and it is up to the protocol implementation
	* to encode and send the details along with error.
	*/
	constructor(message, code = Code.Unknown, metadata, outgoingDetails, cause) {
		super(createMessage(message, code));
		this.name = "ConnectError";
		Object.setPrototypeOf(this, new.target.prototype);
		this.rawMessage = message;
		this.code = code;
		this.metadata = new Headers(metadata !== null && metadata !== void 0 ? metadata : {});
		this.details = outgoingDetails !== null && outgoingDetails !== void 0 ? outgoingDetails : [];
		this.cause = cause;
	}
	/**
	* Convert any value - typically a caught error into a ConnectError,
	* following these rules:
	* - If the value is already a ConnectError, return it as is.
	* - If the value is an AbortError from the fetch API, return the message
	*   of the AbortError with code Canceled.
	* - For other Errors, return the error message with code Unknown by default.
	* - For other values, return the values String representation as a message,
	*   with the code Unknown by default.
	* The original value will be used for the "cause" property for the new
	* ConnectError.
	*/
	static from(reason, code = Code.Unknown) {
		if (reason instanceof ConnectError) return reason;
		if (reason instanceof Error) {
			if (reason.name == "AbortError") return new ConnectError(reason.message, Code.Canceled);
			return new ConnectError(reason.message, code, void 0, void 0, reason);
		}
		return new ConnectError(String(reason), code, void 0, void 0, reason);
	}
	static [Symbol.hasInstance](v) {
		if (!(v instanceof Error)) return false;
		if (Object.getPrototypeOf(v) === ConnectError.prototype) return true;
		return v.name === "ConnectError" && "code" in v && typeof v.code === "number" && "metadata" in v && "details" in v && Array.isArray(v.details) && "rawMessage" in v && typeof v.rawMessage == "string" && "cause" in v;
	}
	findDetails(typeOrRegistry) {
		const registry = typeOrRegistry.kind === "message" ? { getMessage: (typeName) => typeName === typeOrRegistry.typeName ? typeOrRegistry : void 0 } : typeOrRegistry;
		const details = [];
		for (const data of this.details) {
			if ("desc" in data) {
				if (registry.getMessage(data.desc.typeName)) details.push(create$2(data.desc, data.value));
				continue;
			}
			const desc = registry.getMessage(data.type);
			if (desc) try {
				details.push(fromBinary$2(desc, data.value));
			} catch (_) {}
		}
		return details;
	}
};
/**
* Create an error message, prefixing the given code.
*/
function createMessage(message, code) {
	return message.length ? `[${codeToString(code)}] ${message}` : `[${codeToString(code)}]`;
}
//#endregion
//#region ../../node_modules/@connectrpc/connect/dist/esm/http-headers.js
/**
* Merge two or more Headers objects by appending all fields from
* all inputs to a new Headers object.
*/
function appendHeaders(...headers) {
	const h = new Headers();
	for (const e of headers) e.forEach((value, key) => {
		h.append(key, value);
	});
	return h;
}
//#endregion
//#region ../../node_modules/@connectrpc/connect/dist/esm/any-client.js
/**
* Create any client for the given service.
*
* The given createMethod function is called for each method definition
* of the service. The function it returns is added to the client object
* as a method.
*/
function makeAnyClient(service, createMethod) {
	const client = {};
	for (const desc of service.methods) {
		const method = createMethod(desc);
		if (method != null) client[desc.localName] = method;
	}
	return client;
}
//#endregion
//#region ../../node_modules/@connectrpc/connect/dist/esm/protocol/envelope.js
/**
* Create a WHATWG ReadableStream of enveloped messages from a ReadableStream
* of bytes.
*
* Ideally, this would simply be a TransformStream, but ReadableStream.pipeThrough
* does not have the necessary availability at this time.
*
* @private Internal code, does not follow semantic versioning.
*/
function createEnvelopeReadableStream(stream) {
	let reader;
	let buffer = new Uint8Array(0);
	function append(chunk) {
		const n = new Uint8Array(buffer.length + chunk.length);
		n.set(buffer);
		n.set(chunk, buffer.length);
		buffer = n;
	}
	return new ReadableStream({
		start() {
			reader = stream.getReader();
		},
		async pull(controller) {
			let header = void 0;
			for (;;) {
				if (header === void 0 && buffer.byteLength >= 5) {
					let length = 0;
					for (let i = 1; i < 5; i++) length = (length << 8) + buffer[i];
					header = {
						flags: buffer[0],
						length
					};
				}
				if (header !== void 0 && buffer.byteLength >= header.length + 5) break;
				const result = await reader.read();
				if (result.done) break;
				append(result.value);
			}
			if (header === void 0) {
				if (buffer.byteLength == 0) {
					controller.close();
					return;
				}
				controller.error(new ConnectError("premature end of stream", Code.DataLoss));
				return;
			}
			const data = buffer.subarray(5, 5 + header.length);
			buffer = buffer.subarray(5 + header.length);
			controller.enqueue({
				flags: header.flags,
				data
			});
		}
	});
}
/**
* Encode a single enveloped message.
*
* @private Internal code, does not follow semantic versioning.
*/
function encodeEnvelope(flags, data) {
	const bytes = new Uint8Array(data.length + 5);
	bytes.set(data, 5);
	const v = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
	v.setUint8(0, flags);
	v.setUint32(1, data.length);
	return bytes;
}
//#endregion
//#region ../../node_modules/@connectrpc/connect/dist/esm/protocol/async-iterable.js
var __asyncValues$1 = function(o) {
	if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
	var m = o[Symbol.asyncIterator], i;
	return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
		return this;
	}, i);
	function verb(n) {
		i[n] = o[n] && function(v) {
			return new Promise(function(resolve, reject) {
				v = o[n](v), settle(resolve, reject, v.done, v.value);
			});
		};
	}
	function settle(resolve, reject, d, v) {
		Promise.resolve(v).then(function(v) {
			resolve({
				value: v,
				done: d
			});
		}, reject);
	}
};
var __await$3 = function(v) {
	return this instanceof __await$3 ? (this.v = v, this) : new __await$3(v);
};
var __asyncGenerator$3 = function(thisArg, _arguments, generator) {
	if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
	var g = generator.apply(thisArg, _arguments || []), i, q = [];
	return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function() {
		return this;
	}, i;
	function awaitReturn(f) {
		return function(v) {
			return Promise.resolve(v).then(f, reject);
		};
	}
	function verb(n, f) {
		if (g[n]) {
			i[n] = function(v) {
				return new Promise(function(a, b) {
					q.push([
						n,
						v,
						a,
						b
					]) > 1 || resume(n, v);
				});
			};
			if (f) i[n] = f(i[n]);
		}
	}
	function resume(n, v) {
		try {
			step(g[n](v));
		} catch (e) {
			settle(q[0][3], e);
		}
	}
	function step(r) {
		r.value instanceof __await$3 ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
	}
	function fulfill(value) {
		resume("next", value);
	}
	function reject(value) {
		resume("throw", value);
	}
	function settle(f, v) {
		if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
	}
};
var __asyncDelegator$1 = function(o) {
	var i, p;
	return i = {}, verb("next"), verb("throw", function(e) {
		throw e;
	}), verb("return"), i[Symbol.iterator] = function() {
		return this;
	}, i;
	function verb(n, f) {
		i[n] = o[n] ? function(v) {
			return (p = !p) ? {
				value: __await$3(o[n](v)),
				done: false
			} : f ? f(v) : v;
		} : f;
	}
};
/**
* Create an asynchronous iterable from an array.
*
* @private Internal code, does not follow semantic versioning.
*/
function createAsyncIterable(items) {
	return __asyncGenerator$3(this, arguments, function* createAsyncIterable_1() {
		yield __await$3(yield* __asyncDelegator$1(__asyncValues$1(items)));
	});
}
//#endregion
//#region ../../node_modules/@connectrpc/connect/dist/esm/promise-client.js
var __asyncValues = function(o) {
	if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
	var m = o[Symbol.asyncIterator], i;
	return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
		return this;
	}, i);
	function verb(n) {
		i[n] = o[n] && function(v) {
			return new Promise(function(resolve, reject) {
				v = o[n](v), settle(resolve, reject, v.done, v.value);
			});
		};
	}
	function settle(resolve, reject, d, v) {
		Promise.resolve(v).then(function(v) {
			resolve({
				value: v,
				done: d
			});
		}, reject);
	}
};
var __await$2 = function(v) {
	return this instanceof __await$2 ? (this.v = v, this) : new __await$2(v);
};
var __asyncDelegator = function(o) {
	var i, p;
	return i = {}, verb("next"), verb("throw", function(e) {
		throw e;
	}), verb("return"), i[Symbol.iterator] = function() {
		return this;
	}, i;
	function verb(n, f) {
		i[n] = o[n] ? function(v) {
			return (p = !p) ? {
				value: __await$2(o[n](v)),
				done: false
			} : f ? f(v) : v;
		} : f;
	}
};
var __asyncGenerator$2 = function(thisArg, _arguments, generator) {
	if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
	var g = generator.apply(thisArg, _arguments || []), i, q = [];
	return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function() {
		return this;
	}, i;
	function awaitReturn(f) {
		return function(v) {
			return Promise.resolve(v).then(f, reject);
		};
	}
	function verb(n, f) {
		if (g[n]) {
			i[n] = function(v) {
				return new Promise(function(a, b) {
					q.push([
						n,
						v,
						a,
						b
					]) > 1 || resume(n, v);
				});
			};
			if (f) i[n] = f(i[n]);
		}
	}
	function resume(n, v) {
		try {
			step(g[n](v));
		} catch (e) {
			settle(q[0][3], e);
		}
	}
	function step(r) {
		r.value instanceof __await$2 ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
	}
	function fulfill(value) {
		resume("next", value);
	}
	function reject(value) {
		resume("throw", value);
	}
	function settle(f, v) {
		if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
	}
};
/**
* Create a Client for the given service, invoking RPCs through the
* given transport.
*/
function createClient(service, transport) {
	return makeAnyClient(service, (method) => {
		switch (method.methodKind) {
			case "unary": return createUnaryFn(transport, method);
			case "server_streaming": return createServerStreamingFn(transport, method);
			case "client_streaming": return createClientStreamingFn(transport, method);
			case "bidi_streaming": return createBiDiStreamingFn(transport, method);
			default: return null;
		}
	});
}
function createUnaryFn(transport, method) {
	return async function(input, options) {
		var _a, _b;
		const response = await transport.unary(method, options === null || options === void 0 ? void 0 : options.signal, options === null || options === void 0 ? void 0 : options.timeoutMs, options === null || options === void 0 ? void 0 : options.headers, input, options === null || options === void 0 ? void 0 : options.contextValues);
		(_a = options === null || options === void 0 ? void 0 : options.onHeader) === null || _a === void 0 || _a.call(options, response.header);
		(_b = options === null || options === void 0 ? void 0 : options.onTrailer) === null || _b === void 0 || _b.call(options, response.trailer);
		return response.message;
	};
}
function createServerStreamingFn(transport, method) {
	return function(input, options) {
		return handleStreamResponse(transport.stream(method, options === null || options === void 0 ? void 0 : options.signal, options === null || options === void 0 ? void 0 : options.timeoutMs, options === null || options === void 0 ? void 0 : options.headers, createAsyncIterable([input]), options === null || options === void 0 ? void 0 : options.contextValues), options);
	};
}
function createClientStreamingFn(transport, method) {
	return async function(request, options) {
		var _a, e_1, _b, _c;
		var _d, _e;
		const response = await transport.stream(method, options === null || options === void 0 ? void 0 : options.signal, options === null || options === void 0 ? void 0 : options.timeoutMs, options === null || options === void 0 ? void 0 : options.headers, request, options === null || options === void 0 ? void 0 : options.contextValues);
		(_d = options === null || options === void 0 ? void 0 : options.onHeader) === null || _d === void 0 || _d.call(options, response.header);
		let singleMessage;
		let count = 0;
		try {
			for (var _f = true, _g = __asyncValues(response.message), _h; _h = await _g.next(), _a = _h.done, !_a; _f = true) {
				_c = _h.value;
				_f = false;
				singleMessage = _c;
				count++;
			}
		} catch (e_1_1) {
			e_1 = { error: e_1_1 };
		} finally {
			try {
				if (!_f && !_a && (_b = _g.return)) await _b.call(_g);
			} finally {
				if (e_1) throw e_1.error;
			}
		}
		if (!singleMessage) throw new ConnectError("protocol error: missing response message", Code.Unimplemented);
		if (count > 1) throw new ConnectError("protocol error: received extra messages for client streaming method", Code.Unimplemented);
		(_e = options === null || options === void 0 ? void 0 : options.onTrailer) === null || _e === void 0 || _e.call(options, response.trailer);
		return singleMessage;
	};
}
function createBiDiStreamingFn(transport, method) {
	return function(request, options) {
		return handleStreamResponse(transport.stream(method, options === null || options === void 0 ? void 0 : options.signal, options === null || options === void 0 ? void 0 : options.timeoutMs, options === null || options === void 0 ? void 0 : options.headers, request, options === null || options === void 0 ? void 0 : options.contextValues), options);
	};
}
function handleStreamResponse(stream, options) {
	const it = (function() {
		return __asyncGenerator$2(this, arguments, function* () {
			var _a, _b;
			const response = yield __await$2(stream);
			(_a = options === null || options === void 0 ? void 0 : options.onHeader) === null || _a === void 0 || _a.call(options, response.header);
			yield __await$2(yield* __asyncDelegator(__asyncValues(response.message)));
			(_b = options === null || options === void 0 ? void 0 : options.onTrailer) === null || _b === void 0 || _b.call(options, response.trailer);
		});
	})()[Symbol.asyncIterator]();
	return { [Symbol.asyncIterator]: () => ({ next: () => it.next() }) };
}
//#endregion
//#region ../../node_modules/@connectrpc/connect/dist/esm/protocol/signals.js
/**
* Create an AbortController that is automatically aborted if one of the given
* signals is aborted.
*
* For convenience, the linked AbortSignals can be undefined.
*
* If the controller or any of the signals is aborted, all event listeners are
* removed.
*
* @private Internal code, does not follow semantic versioning.
*/
function createLinkedAbortController(...signals) {
	const controller = new AbortController();
	const sa = signals.filter((s) => s !== void 0).concat(controller.signal);
	for (const signal of sa) {
		if (signal.aborted) {
			onAbort.apply(signal);
			break;
		}
		signal.addEventListener("abort", onAbort);
	}
	function onAbort() {
		if (!controller.signal.aborted) controller.abort(getAbortSignalReason(this));
		for (const signal of sa) signal.removeEventListener("abort", onAbort);
	}
	return controller;
}
/**
* Create a deadline signal. The returned object contains an AbortSignal, but
* also a cleanup function to stop the timer, which must be called once the
* calling code is no longer interested in the signal.
*
* Ideally, we would simply use AbortSignal.timeout(), but it is not widely
* available yet.
*
* @private Internal code, does not follow semantic versioning.
*/
function createDeadlineSignal(timeoutMs) {
	const controller = new AbortController();
	const listener = () => {
		controller.abort(new ConnectError("the operation timed out", Code.DeadlineExceeded));
	};
	let timeoutId;
	if (timeoutMs !== void 0) if (timeoutMs <= 0) listener();
	else timeoutId = setTimeout(listener, timeoutMs);
	return {
		signal: controller.signal,
		cleanup: () => clearTimeout(timeoutId)
	};
}
/**
* Returns the reason why an AbortSignal was aborted. Returns undefined if the
* signal has not been aborted.
*
* The property AbortSignal.reason is not widely available. This function
* returns an AbortError if the signal is aborted, but reason is undefined.
*
* @private Internal code, does not follow semantic versioning.
*/
function getAbortSignalReason(signal) {
	if (!signal.aborted) return;
	if (signal.reason !== void 0) return signal.reason;
	const e = /* @__PURE__ */ new Error("This operation was aborted");
	e.name = "AbortError";
	return e;
}
//#endregion
//#region ../../node_modules/@connectrpc/connect/dist/esm/context-values.js
/**
* createContextValues creates a new ContextValues.
*/
function createContextValues() {
	return {
		get(key) {
			return key.id in this ? this[key.id] : key.defaultValue;
		},
		set(key, value) {
			this[key.id] = value;
			return this;
		},
		delete(key) {
			delete this[key.id];
			return this;
		}
	};
}
//#endregion
//#region ../../node_modules/@connectrpc/connect/dist/esm/protocol/create-method-url.js
/**
* Create a URL for the given RPC. This simply adds the qualified
* service name, a slash, and the method name to the path of the given
* baseUrl.
*
* For example, the baseUri https://example.com and method "Say" from
* the service example.ElizaService results in:
* https://example.com/example.ElizaService/Say
*
* This format is used by the protocols Connect, gRPC and Twirp.
*
* Note that this function also accepts a protocol-relative baseUrl.
* If given an empty string or "/" as a baseUrl, it returns just the
* path.
*/
function createMethodUrl(baseUrl, method) {
	return baseUrl.toString().replace(/\/?$/, `/${method.parent.typeName}/${method.name}`);
}
//#endregion
//#region ../../node_modules/@connectrpc/connect/dist/esm/protocol/normalize.js
/**
*  Takes a partial protobuf messages of the
*  specified message type as input, and returns full instances.
*/
function normalize(desc, message) {
	return create$2(desc, message);
}
/**
* Takes an AsyncIterable of partial protobuf messages of the
* specified message type as input, and yields full instances.
*/
function normalizeIterable(desc, input) {
	function transform(result) {
		if (result.done === true) return result;
		return {
			done: result.done,
			value: normalize(desc, result.value)
		};
	}
	return { [Symbol.asyncIterator]() {
		const it = input[Symbol.asyncIterator]();
		const res = { next: () => it.next().then(transform) };
		if (it.throw !== void 0) res.throw = (e) => it.throw(e).then(transform);
		if (it.return !== void 0) res.return = (v) => it.return(v).then(transform);
		return res;
	} };
}
//#endregion
//#region ../../node_modules/@connectrpc/connect/dist/esm/interceptor.js
/**
* applyInterceptors takes the given UnaryFn or ServerStreamingFn, and wraps
* it with each of the given interceptors, returning a new UnaryFn or
* ServerStreamingFn.
*/
function applyInterceptors(next, interceptors) {
	var _a;
	return (_a = interceptors === null || interceptors === void 0 ? void 0 : interceptors.concat().reverse().reduce((n, i) => i(n), next)) !== null && _a !== void 0 ? _a : next;
}
//#endregion
//#region ../../node_modules/@connectrpc/connect/dist/esm/protocol/serialization.js
/**
* Sets default JSON serialization options for connect-es.
*
* With standard protobuf JSON serialization, unknown JSON fields are
* rejected by default. In connect-es, unknown JSON fields are ignored
* by default.
*/
function getJsonOptions(options) {
	var _a;
	const o = Object.assign({}, options);
	(_a = o.ignoreUnknownFields) !== null && _a !== void 0 || (o.ignoreUnknownFields = true);
	return o;
}
/**
* Returns functions to normalize and serialize the input message
* of an RPC, and to parse the output message of an RPC.
*
* @private Internal code, does not follow semantic versioning.
*/
function createClientMethodSerializers(method, useBinaryFormat, jsonOptions, binaryOptions) {
	const input = useBinaryFormat ? createBinarySerialization(method.input, binaryOptions) : createJsonSerialization(method.input, jsonOptions);
	return {
		parse: (useBinaryFormat ? createBinarySerialization(method.output, binaryOptions) : createJsonSerialization(method.output, jsonOptions)).parse,
		serialize: input.serialize
	};
}
/**
* Creates a Serialization object for serializing the given protobuf message
* with the protobuf binary format.
*/
function createBinarySerialization(desc, options) {
	return {
		parse(data) {
			try {
				return fromBinary$2(desc, data, options);
			} catch (e) {
				throw new ConnectError(`parse binary: ${e instanceof Error ? e.message : String(e)}`, Code.Internal);
			}
		},
		serialize(data) {
			try {
				return toBinary$1(desc, data, options);
			} catch (e) {
				throw new ConnectError(`serialize binary: ${e instanceof Error ? e.message : String(e)}`, Code.Internal);
			}
		}
	};
}
/**
* Creates a Serialization object for serializing the given protobuf message
* with the protobuf canonical JSON encoding.
*
* By default, unknown fields are ignored.
*/
function createJsonSerialization(desc, options) {
	var _a, _b;
	const textEncoder = (_a = options === null || options === void 0 ? void 0 : options.textEncoder) !== null && _a !== void 0 ? _a : new TextEncoder();
	const textDecoder = (_b = options === null || options === void 0 ? void 0 : options.textDecoder) !== null && _b !== void 0 ? _b : new TextDecoder();
	const o = getJsonOptions(options);
	return {
		parse(data) {
			try {
				return fromJsonString(desc, textDecoder.decode(data), o);
			} catch (e) {
				throw ConnectError.from(e, Code.InvalidArgument);
			}
		},
		serialize(data) {
			try {
				const json = toJsonString(desc, data, o);
				return textEncoder.encode(json);
			} catch (e) {
				throw ConnectError.from(e, Code.Internal);
			}
		}
	};
}
//#endregion
//#region ../../node_modules/@connectrpc/connect/dist/esm/protocol-connect/content-type.js
/**
* Regular Expression that matches any valid Connect Content-Type header value.
*
* @private Internal code, does not follow semantic versioning.
*/
var contentTypeRegExp = /^application\/(connect\+)?(?:(json)(?:; ?charset=utf-?8)?|(proto))$/i;
var contentTypeUnaryProto = "application/proto";
var contentTypeUnaryJson = "application/json";
var contentTypeStreamProto = "application/connect+proto";
var contentTypeStreamJson = "application/connect+json";
/**
* Parse a Connect Content-Type header.
*
* @private Internal code, does not follow semantic versioning.
*/
function parseContentType(contentType) {
	const match = contentType === null || contentType === void 0 ? void 0 : contentType.match(contentTypeRegExp);
	if (!match) return;
	return {
		stream: !!match[1],
		binary: !!match[3]
	};
}
/**
* Parse a Connect error from a JSON value.
* Will return a ConnectError, and throw the provided fallback if parsing failed.
*
* @private Internal code, does not follow semantic versioning.
*/
function errorFromJson(jsonValue, metadata, fallback) {
	var _a;
	if (metadata) new Headers(metadata).forEach((value, key) => fallback.metadata.append(key, value));
	if (typeof jsonValue !== "object" || jsonValue == null || Array.isArray(jsonValue)) throw fallback;
	let code = fallback.code;
	if ("code" in jsonValue && typeof jsonValue.code === "string") code = (_a = codeFromString(jsonValue.code)) !== null && _a !== void 0 ? _a : code;
	const message = jsonValue.message;
	if (message != null && typeof message !== "string") throw fallback;
	const error = new ConnectError(message !== null && message !== void 0 ? message : "", code, metadata);
	if ("details" in jsonValue && Array.isArray(jsonValue.details)) for (const detail of jsonValue.details) {
		if (detail === null || typeof detail != "object" || Array.isArray(detail) || typeof detail.type != "string" || typeof detail.value != "string") throw fallback;
		try {
			error.details.push({
				type: detail.type,
				value: base64Decode$2(detail.value),
				debug: detail.debug
			});
		} catch (e) {
			throw fallback;
		}
	}
	return error;
}
//#endregion
//#region ../../node_modules/@connectrpc/connect/dist/esm/protocol-connect/end-stream.js
/**
* Parse an EndStreamResponse of the Connect protocol.
* Throws a ConnectError on malformed input.
*
* @private Internal code, does not follow semantic versioning.
*/
function endStreamFromJson(data) {
	const parseErr = new ConnectError("invalid end stream", Code.Unknown);
	let jsonValue;
	try {
		jsonValue = JSON.parse(typeof data == "string" ? data : new TextDecoder().decode(data));
	} catch (e) {
		throw parseErr;
	}
	if (typeof jsonValue != "object" || jsonValue == null || Array.isArray(jsonValue)) throw parseErr;
	const metadata = new Headers();
	if ("metadata" in jsonValue) {
		if (typeof jsonValue.metadata != "object" || jsonValue.metadata == null || Array.isArray(jsonValue.metadata)) throw parseErr;
		for (const [key, values] of Object.entries(jsonValue.metadata)) {
			if (!Array.isArray(values) || values.some((value) => typeof value != "string")) throw parseErr;
			for (const value of values) metadata.append(key, value);
		}
	}
	return {
		metadata,
		error: "error" in jsonValue && jsonValue.error != null ? errorFromJson(jsonValue.error, metadata, parseErr) : void 0
	};
}
//#endregion
//#region ../../node_modules/@connectrpc/connect/dist/esm/protocol-connect/headers.js
/**
* @private Internal code, does not follow semantic versioning.
*/
var headerContentType = "Content-Type";
var headerUnaryContentLength = "Content-Length";
var headerUnaryEncoding = "Content-Encoding";
var headerUnaryAcceptEncoding = "Accept-Encoding";
var headerTimeout = "Connect-Timeout-Ms";
var headerProtocolVersion = "Connect-Protocol-Version";
var headerUserAgent = "User-Agent";
//#endregion
//#region ../../node_modules/@connectrpc/connect/dist/esm/protocol-connect/http-status.js
/**
* Determine the Connect error code for the given HTTP status code.
* See https://connectrpc.com/docs/protocol/#http-to-error-code
*
* @private Internal code, does not follow semantic versioning.
*/
function codeFromHttpStatus(httpStatus) {
	switch (httpStatus) {
		case 400: return Code.Internal;
		case 401: return Code.Unauthenticated;
		case 403: return Code.PermissionDenied;
		case 404: return Code.Unimplemented;
		case 429: return Code.Unavailable;
		case 502: return Code.Unavailable;
		case 503: return Code.Unavailable;
		case 504: return Code.Unavailable;
		default: return Code.Unknown;
	}
}
//#endregion
//#region ../../node_modules/@connectrpc/connect/dist/esm/protocol-connect/trailer-mux.js
/**
* In unary RPCs, Connect transports trailing metadata as response header
* fields, prefixed with "trailer-".
*
* This function demuxes headers and trailers into two separate Headers
* objects.
*
* @private Internal code, does not follow semantic versioning.
*/
function trailerDemux(header) {
	const h = new Headers(), t = new Headers();
	header.forEach((value, key) => {
		if (key.toLowerCase().startsWith("trailer-")) t.append(key.substring(8), value);
		else h.append(key, value);
	});
	return [h, t];
}
//#endregion
//#region ../../node_modules/@connectrpc/connect/dist/esm/protocol-connect/request-header.js
/**
* Creates headers for a Connect request.
*
* @private Internal code, does not follow semantic versioning.
*/
function requestHeader(methodKind, useBinaryFormat, timeoutMs, userProvidedHeaders, setUserAgent) {
	const result = new Headers(userProvidedHeaders !== null && userProvidedHeaders !== void 0 ? userProvidedHeaders : {});
	if (timeoutMs !== void 0) result.set(headerTimeout, `${timeoutMs}`);
	result.set(headerContentType, methodKind == "unary" ? useBinaryFormat ? contentTypeUnaryProto : contentTypeUnaryJson : useBinaryFormat ? contentTypeStreamProto : contentTypeStreamJson);
	result.set(headerProtocolVersion, "1");
	if (!result.has("User-Agent") && setUserAgent) result.set(headerUserAgent, "connect-es/2.0.0-rc.3");
	return result;
}
//#endregion
//#region ../../node_modules/@connectrpc/connect/dist/esm/protocol-connect/validate-response.js
/**
* Validates response status and header for the Connect protocol.
* Throws a ConnectError if the header indicates an error, or if
* the content type is unexpected, with the following exception:
* For unary RPCs with an HTTP error status, this returns an error
* derived from the HTTP status instead of throwing it, giving an
* implementation a chance to parse a Connect error from the wire.
*
* @private Internal code, does not follow semantic versioning.
*/
function validateResponse(methodKind, useBinaryFormat, status, headers) {
	const mimeType = headers.get(headerContentType);
	const parsedType = parseContentType(mimeType);
	if (status !== 200) {
		const errorFromStatus = new ConnectError(`HTTP ${status}`, codeFromHttpStatus(status), headers);
		if (methodKind == "unary" && parsedType && !parsedType.binary) return {
			isUnaryError: true,
			unaryError: errorFromStatus
		};
		throw errorFromStatus;
	}
	const allowedContentType = {
		binary: useBinaryFormat,
		stream: methodKind !== "unary"
	};
	if ((parsedType === null || parsedType === void 0 ? void 0 : parsedType.binary) !== allowedContentType.binary || parsedType.stream !== allowedContentType.stream) throw new ConnectError(`unsupported content type ${mimeType}`, parsedType === void 0 ? Code.Unknown : Code.Internal, headers);
	return { isUnaryError: false };
}
//#endregion
//#region ../../node_modules/@connectrpc/connect/dist/esm/protocol-connect/get-request.js
var contentTypePrefix = "application/";
function encodeMessageForUrl(message, useBase64) {
	if (useBase64) return base64Encode(message, "url");
	else return encodeURIComponent(new TextDecoder().decode(message));
}
/**
* @private Internal code, does not follow semantic versioning.
*/
function transformConnectPostToGetRequest(request, message, useBase64) {
	let query = `?connect=v1`;
	const contentType = request.header.get(headerContentType);
	if ((contentType === null || contentType === void 0 ? void 0 : contentType.indexOf(contentTypePrefix)) === 0) query += "&encoding=" + encodeURIComponent(contentType.slice(12));
	const compression = request.header.get(headerUnaryEncoding);
	if (compression !== null && compression !== "identity") {
		query += "&compression=" + encodeURIComponent(compression);
		useBase64 = true;
	}
	if (useBase64) query += "&base64=1";
	query += "&message=" + encodeMessageForUrl(message, useBase64);
	const url = request.url + query;
	const header = new Headers(request.header);
	[
		headerProtocolVersion,
		headerContentType,
		headerUnaryContentLength,
		headerUnaryEncoding,
		headerUnaryAcceptEncoding
	].forEach((h) => header.delete(h));
	return Object.assign(Object.assign({}, request), {
		requestMethod: "GET",
		url,
		header
	});
}
//#endregion
//#region ../../node_modules/@connectrpc/connect/dist/esm/protocol/run-call.js
/**
* Runs a unary method with the given interceptors. Note that this function
* is only used when implementing a Transport.
*/
function runUnaryCall(opt) {
	const next = applyInterceptors(opt.next, opt.interceptors);
	const [signal, abort, done] = setupSignal(opt);
	return next(Object.assign(Object.assign({}, opt.req), {
		message: normalize(opt.req.method.input, opt.req.message),
		signal
	})).then((res) => {
		done();
		return res;
	}, abort);
}
/**
* Runs a server-streaming method with the given interceptors. Note that this
* function is only used when implementing a Transport.
*/
function runStreamingCall(opt) {
	const next = applyInterceptors(opt.next, opt.interceptors);
	const [signal, abort, done] = setupSignal(opt);
	const req = Object.assign(Object.assign({}, opt.req), {
		message: normalizeIterable(opt.req.method.input, opt.req.message),
		signal
	});
	let doneCalled = false;
	signal.addEventListener("abort", function() {
		var _a, _b;
		const it = opt.req.message[Symbol.asyncIterator]();
		if (!doneCalled) (_a = it.throw) === null || _a === void 0 || _a.call(it, this.reason).catch(() => {});
		(_b = it.return) === null || _b === void 0 || _b.call(it).catch(() => {});
	});
	return next(req).then((res) => {
		return Object.assign(Object.assign({}, res), { message: { [Symbol.asyncIterator]() {
			const it = res.message[Symbol.asyncIterator]();
			return { next() {
				return it.next().then((r) => {
					if (r.done == true) {
						doneCalled = true;
						done();
					}
					return r;
				}, abort);
			} };
		} } });
	}, abort);
}
/**
* Create an AbortSignal for Transport implementations. The signal is available
* in UnaryRequest and StreamingRequest, and is triggered when the call is
* aborted (via a timeout or explicit cancellation), errored (e.g. when reading
* an error from the server from the wire), or finished successfully.
*
* Transport implementations can pass the signal to HTTP clients to ensure that
* there are no unused connections leak.
*
* Returns a tuple:
* [0]: The signal, which is also aborted if the optional deadline is reached.
* [1]: Function to call if the Transport encountered an error.
* [2]: Function to call if the Transport finished without an error.
*/
function setupSignal(opt) {
	const { signal, cleanup } = createDeadlineSignal(opt.timeoutMs);
	const controller = createLinkedAbortController(opt.signal, signal);
	return [
		controller.signal,
		function abort(reason) {
			const e = ConnectError.from(signal.aborted ? getAbortSignalReason(signal) : reason);
			controller.abort(e);
			cleanup();
			return Promise.reject(e);
		},
		function done() {
			cleanup();
			controller.abort();
		}
	];
}
//#endregion
//#region ../../node_modules/compare-versions/lib/esm/utils.js
var semver = /^[v^~<>=]*?(\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+))?(?:-([\da-z\-]+(?:\.[\da-z\-]+)*))?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?)?)?$/i;
var validateAndParse = (version) => {
	if (typeof version !== "string") throw new TypeError("Invalid argument expected string");
	const match = version.match(semver);
	if (!match) throw new Error(`Invalid argument not valid semver ('${version}' received)`);
	match.shift();
	return match;
};
var isWildcard = (s) => s === "*" || s === "x" || s === "X";
var tryParse = (v) => {
	const n = parseInt(v, 10);
	return isNaN(n) ? v : n;
};
var forceType = (a, b) => typeof a !== typeof b ? [String(a), String(b)] : [a, b];
var compareStrings = (a, b) => {
	if (isWildcard(a) || isWildcard(b)) return 0;
	const [ap, bp] = forceType(tryParse(a), tryParse(b));
	if (ap > bp) return 1;
	if (ap < bp) return -1;
	return 0;
};
var compareSegments = (a, b) => {
	for (let i = 0; i < Math.max(a.length, b.length); i++) {
		const r = compareStrings(a[i] || "0", b[i] || "0");
		if (r !== 0) return r;
	}
	return 0;
};
//#endregion
//#region ../../node_modules/compare-versions/lib/esm/compareVersions.js
/**
* Compare [semver](https://semver.org/) version strings to find greater, equal or lesser.
* This library supports the full semver specification, including comparing versions with different number of digits like `1.0.0`, `1.0`, `1`, and pre-release versions like `1.0.0-alpha`.
* @param v1 - First version to compare
* @param v2 - Second version to compare
* @returns Numeric value compatible with the [Array.sort(fn) interface](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Parameters).
*/
var compareVersions = (v1, v2) => {
	const n1 = validateAndParse(v1);
	const n2 = validateAndParse(v2);
	const p1 = n1.pop();
	const p2 = n2.pop();
	const r = compareSegments(n1, n2);
	if (r !== 0) return r;
	if (p1 && p2) return compareSegments(p1.split("."), p2.split("."));
	else if (p1 || p2) return p1 ? -1 : 1;
	return 0;
};
//#endregion
//#region ../../packages/agent-provider/node_modules/@bufbuild/protobuf/dist/esm/reflect/names.js
/**
* Converts snake_case to protoCamelCase according to the convention
* used by protoc to convert a field name to a JSON name.
*/
function protoCamelCase$1(snakeCase) {
	let capNext = false;
	const b = [];
	for (let i = 0; i < snakeCase.length; i++) {
		let c = snakeCase.charAt(i);
		switch (c) {
			case "_":
				capNext = true;
				break;
			case "0":
			case "1":
			case "2":
			case "3":
			case "4":
			case "5":
			case "6":
			case "7":
			case "8":
			case "9":
				b.push(c);
				capNext = false;
				break;
			default:
				if (capNext) {
					capNext = false;
					c = c.toUpperCase();
				}
				b.push(c);
				break;
		}
	}
	return b.join("");
}
/**
* Names that cannot be used for object properties because they are reserved
* by built-in JavaScript properties.
*/
var reservedObjectProperties$1 = new Set([
	"constructor",
	"toString",
	"toJSON",
	"valueOf"
]);
/**
* Escapes names that are reserved for ECMAScript built-in object properties.
*
* Also see safeIdentifier() from @bufbuild/protoplugin.
*/
function safeObjectProperty$1(name) {
	return reservedObjectProperties$1.has(name) ? name + "$" : name;
}
//#endregion
//#region ../../packages/agent-provider/node_modules/@bufbuild/protobuf/dist/esm/wire/varint.js
/**
* Read a 64 bit varint as two JS numbers.
*
* Returns tuple:
* [0]: low bits
* [1]: high bits
*
* Copyright 2008 Google Inc.  All rights reserved.
*
* See https://github.com/protocolbuffers/protobuf/blob/8a71927d74a4ce34efe2d8769fda198f52d20d12/js/experimental/runtime/kernel/buffer_decoder.js#L175
*/
function varint64read$1() {
	let lowBits = 0;
	let highBits = 0;
	for (let shift = 0; shift < 28; shift += 7) {
		let b = this.buf[this.pos++];
		lowBits |= (b & 127) << shift;
		if ((b & 128) == 0) {
			this.assertBounds();
			return [lowBits, highBits];
		}
	}
	let middleByte = this.buf[this.pos++];
	lowBits |= (middleByte & 15) << 28;
	highBits = (middleByte & 112) >> 4;
	if ((middleByte & 128) == 0) {
		this.assertBounds();
		return [lowBits, highBits];
	}
	for (let shift = 3; shift <= 31; shift += 7) {
		let b = this.buf[this.pos++];
		highBits |= (b & 127) << shift;
		if ((b & 128) == 0) {
			this.assertBounds();
			return [lowBits, highBits];
		}
	}
	throw new Error("invalid varint");
}
var TWO_PWR_32_DBL$1 = 4294967296;
/**
* Parse decimal string of 64 bit integer value as two JS numbers.
*
* Copyright 2008 Google Inc.  All rights reserved.
*
* See https://github.com/protocolbuffers/protobuf-javascript/blob/a428c58273abad07c66071d9753bc4d1289de426/experimental/runtime/int64.js#L10
*/
function int64FromString$1(dec) {
	const minus = dec[0] === "-";
	if (minus) dec = dec.slice(1);
	const base = 1e6;
	let lowBits = 0;
	let highBits = 0;
	function add1e6digit(begin, end) {
		const digit1e6 = Number(dec.slice(begin, end));
		highBits *= base;
		lowBits = lowBits * base + digit1e6;
		if (lowBits >= TWO_PWR_32_DBL$1) {
			highBits = highBits + (lowBits / TWO_PWR_32_DBL$1 | 0);
			lowBits = lowBits % TWO_PWR_32_DBL$1;
		}
	}
	add1e6digit(-24, -18);
	add1e6digit(-18, -12);
	add1e6digit(-12, -6);
	add1e6digit(-6);
	return minus ? negate$1(lowBits, highBits) : newBits$1(lowBits, highBits);
}
/**
* Losslessly converts a 64-bit signed integer in 32:32 split representation
* into a decimal string.
*
* Copyright 2008 Google Inc.  All rights reserved.
*
* See https://github.com/protocolbuffers/protobuf-javascript/blob/a428c58273abad07c66071d9753bc4d1289de426/experimental/runtime/int64.js#L10
*/
function int64ToString$1(lo, hi) {
	let bits = newBits$1(lo, hi);
	const negative = bits.hi & 2147483648;
	if (negative) bits = negate$1(bits.lo, bits.hi);
	const result = uInt64ToString$1(bits.lo, bits.hi);
	return negative ? "-" + result : result;
}
/**
* Losslessly converts a 64-bit unsigned integer in 32:32 split representation
* into a decimal string.
*
* Copyright 2008 Google Inc.  All rights reserved.
*
* See https://github.com/protocolbuffers/protobuf-javascript/blob/a428c58273abad07c66071d9753bc4d1289de426/experimental/runtime/int64.js#L10
*/
function uInt64ToString$1(lo, hi) {
	({lo, hi} = toUnsigned$1(lo, hi));
	if (hi <= 2097151) return String(TWO_PWR_32_DBL$1 * hi + lo);
	const low = lo & 16777215;
	const mid = (lo >>> 24 | hi << 8) & 16777215;
	const high = hi >> 16 & 65535;
	let digitA = low + mid * 6777216 + high * 6710656;
	let digitB = mid + high * 8147497;
	let digitC = high * 2;
	const base = 1e7;
	if (digitA >= base) {
		digitB += Math.floor(digitA / base);
		digitA %= base;
	}
	if (digitB >= base) {
		digitC += Math.floor(digitB / base);
		digitB %= base;
	}
	return digitC.toString() + decimalFrom1e7WithLeadingZeros$1(digitB) + decimalFrom1e7WithLeadingZeros$1(digitA);
}
function toUnsigned$1(lo, hi) {
	return {
		lo: lo >>> 0,
		hi: hi >>> 0
	};
}
function newBits$1(lo, hi) {
	return {
		lo: lo | 0,
		hi: hi | 0
	};
}
/**
* Returns two's compliment negation of input.
* @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Signed_32-bit_integers
*/
function negate$1(lowBits, highBits) {
	highBits = ~highBits;
	if (lowBits) lowBits = ~lowBits + 1;
	else highBits += 1;
	return newBits$1(lowBits, highBits);
}
/**
* Returns decimal representation of digit1e7 with leading zeros.
*/
var decimalFrom1e7WithLeadingZeros$1 = (digit1e7) => {
	const partial = String(digit1e7);
	return "0000000".slice(partial.length) + partial;
};
/**
* Write a 32 bit varint, signed or unsigned. Same as `varint64write(0, value, bytes)`
*
* Copyright 2008 Google Inc.  All rights reserved.
*
* See https://github.com/protocolbuffers/protobuf/blob/1b18833f4f2a2f681f4e4a25cdf3b0a43115ec26/js/binary/encoder.js#L144
*/
function varint32write$1(value, bytes) {
	if (value >= 0) {
		while (value > 127) {
			bytes.push(value & 127 | 128);
			value = value >>> 7;
		}
		bytes.push(value);
	} else {
		for (let i = 0; i < 9; i++) {
			bytes.push(value & 127 | 128);
			value = value >> 7;
		}
		bytes.push(1);
	}
}
/**
* Read an unsigned 32 bit varint.
*
* See https://github.com/protocolbuffers/protobuf/blob/8a71927d74a4ce34efe2d8769fda198f52d20d12/js/experimental/runtime/kernel/buffer_decoder.js#L220
*/
function varint32read$1() {
	let b = this.buf[this.pos++];
	let result = b & 127;
	if ((b & 128) == 0) {
		this.assertBounds();
		return result;
	}
	b = this.buf[this.pos++];
	result |= (b & 127) << 7;
	if ((b & 128) == 0) {
		this.assertBounds();
		return result;
	}
	b = this.buf[this.pos++];
	result |= (b & 127) << 14;
	if ((b & 128) == 0) {
		this.assertBounds();
		return result;
	}
	b = this.buf[this.pos++];
	result |= (b & 127) << 21;
	if ((b & 128) == 0) {
		this.assertBounds();
		return result;
	}
	b = this.buf[this.pos++];
	result |= (b & 15) << 28;
	for (let readBytes = 5; (b & 128) !== 0 && readBytes < 10; readBytes++) b = this.buf[this.pos++];
	if ((b & 128) != 0) throw new Error("invalid varint");
	this.assertBounds();
	return result >>> 0;
}
//#endregion
//#region ../../packages/agent-provider/node_modules/@bufbuild/protobuf/dist/esm/proto-int64.js
/**
* Int64Support for the current environment.
*/
var protoInt64$1 = /* @__PURE__ */ makeInt64Support$1();
function makeInt64Support$1() {
	const dv = /* @__PURE__ */ new DataView(/* @__PURE__ */ new ArrayBuffer(8));
	if (typeof BigInt === "function" && typeof dv.getBigInt64 === "function" && typeof dv.getBigUint64 === "function" && typeof dv.setBigInt64 === "function" && typeof dv.setBigUint64 === "function" && (!!globalThis.Deno || typeof process != "object" || typeof process.env != "object" || process.env.BUF_BIGINT_DISABLE !== "1")) {
		const MIN = BigInt("-9223372036854775808");
		const MAX = BigInt("9223372036854775807");
		const UMIN = BigInt("0");
		const UMAX = BigInt("18446744073709551615");
		return {
			zero: BigInt(0),
			supported: true,
			parse(value) {
				const bi = typeof value == "bigint" ? value : BigInt(value);
				if (bi > MAX || bi < MIN) throw new Error(`invalid int64: ${value}`);
				return bi;
			},
			uParse(value) {
				const bi = typeof value == "bigint" ? value : BigInt(value);
				if (bi > UMAX || bi < UMIN) throw new Error(`invalid uint64: ${value}`);
				return bi;
			},
			enc(value) {
				dv.setBigInt64(0, this.parse(value), true);
				return {
					lo: dv.getInt32(0, true),
					hi: dv.getInt32(4, true)
				};
			},
			uEnc(value) {
				dv.setBigInt64(0, this.uParse(value), true);
				return {
					lo: dv.getInt32(0, true),
					hi: dv.getInt32(4, true)
				};
			},
			dec(lo, hi) {
				dv.setInt32(0, lo, true);
				dv.setInt32(4, hi, true);
				return dv.getBigInt64(0, true);
			},
			uDec(lo, hi) {
				dv.setInt32(0, lo, true);
				dv.setInt32(4, hi, true);
				return dv.getBigUint64(0, true);
			}
		};
	}
	return {
		zero: "0",
		supported: false,
		parse(value) {
			if (typeof value != "string") value = value.toString();
			assertInt64String$1(value);
			return value;
		},
		uParse(value) {
			if (typeof value != "string") value = value.toString();
			assertUInt64String$1(value);
			return value;
		},
		enc(value) {
			if (typeof value != "string") value = value.toString();
			assertInt64String$1(value);
			return int64FromString$1(value);
		},
		uEnc(value) {
			if (typeof value != "string") value = value.toString();
			assertUInt64String$1(value);
			return int64FromString$1(value);
		},
		dec(lo, hi) {
			return int64ToString$1(lo, hi);
		},
		uDec(lo, hi) {
			return uInt64ToString$1(lo, hi);
		}
	};
}
function assertInt64String$1(value) {
	if (!/^-?[0-9]+$/.test(value)) throw new Error("invalid int64: " + value);
}
function assertUInt64String$1(value) {
	if (!/^[0-9]+$/.test(value)) throw new Error("invalid uint64: " + value);
}
//#endregion
//#region ../../packages/agent-provider/node_modules/@bufbuild/protobuf/dist/esm/descriptors.js
/**
* Scalar value types. This is a subset of field types declared by protobuf
* enum google.protobuf.FieldDescriptorProto.Type The types GROUP and MESSAGE
* are omitted, but the numerical values are identical.
*/
var ScalarType$1;
(function(ScalarType) {
	ScalarType[ScalarType["DOUBLE"] = 1] = "DOUBLE";
	ScalarType[ScalarType["FLOAT"] = 2] = "FLOAT";
	ScalarType[ScalarType["INT64"] = 3] = "INT64";
	ScalarType[ScalarType["UINT64"] = 4] = "UINT64";
	ScalarType[ScalarType["INT32"] = 5] = "INT32";
	ScalarType[ScalarType["FIXED64"] = 6] = "FIXED64";
	ScalarType[ScalarType["FIXED32"] = 7] = "FIXED32";
	ScalarType[ScalarType["BOOL"] = 8] = "BOOL";
	ScalarType[ScalarType["STRING"] = 9] = "STRING";
	ScalarType[ScalarType["BYTES"] = 12] = "BYTES";
	ScalarType[ScalarType["UINT32"] = 13] = "UINT32";
	ScalarType[ScalarType["SFIXED32"] = 15] = "SFIXED32";
	ScalarType[ScalarType["SFIXED64"] = 16] = "SFIXED64";
	ScalarType[ScalarType["SINT32"] = 17] = "SINT32";
	ScalarType[ScalarType["SINT64"] = 18] = "SINT64";
})(ScalarType$1 || (ScalarType$1 = {}));
//#endregion
//#region ../../packages/agent-provider/node_modules/@bufbuild/protobuf/dist/esm/reflect/scalar.js
/**
* Returns the zero value for the given scalar type.
*/
function scalarZeroValue$1(type, longAsString) {
	switch (type) {
		case ScalarType$1.STRING: return "";
		case ScalarType$1.BOOL: return false;
		case ScalarType$1.DOUBLE:
		case ScalarType$1.FLOAT: return 0;
		case ScalarType$1.INT64:
		case ScalarType$1.UINT64:
		case ScalarType$1.SFIXED64:
		case ScalarType$1.FIXED64:
		case ScalarType$1.SINT64: return longAsString ? "0" : protoInt64$1.zero;
		case ScalarType$1.BYTES: return new Uint8Array(0);
		default: return 0;
	}
}
/**
* Returns true for a zero-value. For example, an integer has the zero-value `0`,
* a boolean is `false`, a string is `""`, and bytes is an empty Uint8Array.
*
* In proto3, zero-values are not written to the wire, unless the field is
* optional or repeated.
*/
function isScalarZeroValue$1(type, value) {
	switch (type) {
		case ScalarType$1.BOOL: return value === false;
		case ScalarType$1.STRING: return value === "";
		case ScalarType$1.BYTES: return value instanceof Uint8Array && !value.byteLength;
		default: return value == 0;
	}
}
//#endregion
//#region ../../packages/agent-provider/node_modules/@bufbuild/protobuf/dist/esm/reflect/unsafe.js
var IMPLICIT$5 = 2;
var unsafeLocal$1 = Symbol.for("reflect unsafe local");
/**
* Return the selected field of a oneof group.
*
* @private
*/
function unsafeOneofCase$1(target, oneof) {
	const c = target[oneof.localName].case;
	if (c === void 0) return c;
	return oneof.fields.find((f) => f.localName === c);
}
/**
* Returns true if the field is set.
*
* @private
*/
function unsafeIsSet$1(target, field) {
	const name = field.localName;
	if (field.oneof) return target[field.oneof.localName].case === name;
	if (field.presence != IMPLICIT$5) return target[name] !== void 0 && Object.prototype.hasOwnProperty.call(target, name);
	switch (field.fieldKind) {
		case "list": return target[name].length > 0;
		case "map": return Object.keys(target[name]).length > 0;
		case "scalar": return !isScalarZeroValue$1(field.scalar, target[name]);
		case "enum": return target[name] !== field.enum.values[0].number;
	}
	throw new Error("message field with implicit presence");
}
/**
* Returns true if the field is set, but only for singular fields with explicit
* presence (proto2).
*
* @private
*/
function unsafeIsSetExplicit$1(target, localName) {
	return Object.prototype.hasOwnProperty.call(target, localName) && target[localName] !== void 0;
}
/**
* Return a field value, respecting oneof groups.
*
* @private
*/
function unsafeGet$1(target, field) {
	if (field.oneof) {
		const oneof = target[field.oneof.localName];
		if (oneof.case === field.localName) return oneof.value;
		return;
	}
	return target[field.localName];
}
/**
* Set a field value, respecting oneof groups.
*
* @private
*/
function unsafeSet$1(target, field, value) {
	if (field.oneof) target[field.oneof.localName] = {
		case: field.localName,
		value
	};
	else target[field.localName] = value;
}
/**
* Resets the field, so that unsafeIsSet() will return false.
*
* @private
*/
function unsafeClear$1(target, field) {
	const name = field.localName;
	if (field.oneof) {
		const oneofLocalName = field.oneof.localName;
		if (target[oneofLocalName].case === name) target[oneofLocalName] = { case: void 0 };
	} else if (field.presence != IMPLICIT$5) delete target[name];
	else switch (field.fieldKind) {
		case "map":
			target[name] = {};
			break;
		case "list":
			target[name] = [];
			break;
		case "enum":
			target[name] = field.enum.values[0].number;
			break;
		case "scalar":
			target[name] = scalarZeroValue$1(field.scalar, field.longAsString);
			break;
	}
}
//#endregion
//#region ../../packages/agent-provider/node_modules/@bufbuild/protobuf/dist/esm/codegenv2/restore-json-names.js
/**
* @private
*/
function restoreJsonNames$1(message) {
	for (const f of message.field) if (!unsafeIsSetExplicit$1(f, "jsonName")) f.jsonName = protoCamelCase$1(f.name);
	message.nestedType.forEach(restoreJsonNames$1);
}
//#endregion
//#region ../../packages/agent-provider/node_modules/@bufbuild/protobuf/dist/esm/wire/text-format.js
/**
* Parse an enum value from the Protobuf text format.
*
* @private
*/
function parseTextFormatEnumValue$1(descEnum, value) {
	const enumValue = descEnum.values.find((v) => v.name === value);
	if (!enumValue) throw new Error(`cannot parse ${descEnum} default value: ${value}`);
	return enumValue.number;
}
/**
* Parse a scalar value from the Protobuf text format.
*
* @private
*/
function parseTextFormatScalarValue$1(type, value) {
	switch (type) {
		case ScalarType$1.STRING: return value;
		case ScalarType$1.BYTES: {
			const u = unescapeBytesDefaultValue$1(value);
			if (u === false) throw new Error(`cannot parse ${ScalarType$1[type]} default value: ${value}`);
			return u;
		}
		case ScalarType$1.INT64:
		case ScalarType$1.SFIXED64:
		case ScalarType$1.SINT64: return protoInt64$1.parse(value);
		case ScalarType$1.UINT64:
		case ScalarType$1.FIXED64: return protoInt64$1.uParse(value);
		case ScalarType$1.DOUBLE:
		case ScalarType$1.FLOAT: switch (value) {
			case "inf": return Number.POSITIVE_INFINITY;
			case "-inf": return Number.NEGATIVE_INFINITY;
			case "nan": return NaN;
			default: return parseFloat(value);
		}
		case ScalarType$1.BOOL: return value === "true";
		case ScalarType$1.INT32:
		case ScalarType$1.UINT32:
		case ScalarType$1.SINT32:
		case ScalarType$1.FIXED32:
		case ScalarType$1.SFIXED32: return parseInt(value, 10);
	}
}
/**
* Parses a text-encoded default value (proto2) of a BYTES field.
*/
function unescapeBytesDefaultValue$1(str) {
	const b = [];
	const input = {
		tail: str,
		c: "",
		next() {
			if (this.tail.length == 0) return false;
			this.c = this.tail[0];
			this.tail = this.tail.substring(1);
			return true;
		},
		take(n) {
			if (this.tail.length >= n) {
				const r = this.tail.substring(0, n);
				this.tail = this.tail.substring(n);
				return r;
			}
			return false;
		}
	};
	while (input.next()) switch (input.c) {
		case "\\":
			if (input.next()) switch (input.c) {
				case "\\":
					b.push(input.c.charCodeAt(0));
					break;
				case "b":
					b.push(8);
					break;
				case "f":
					b.push(12);
					break;
				case "n":
					b.push(10);
					break;
				case "r":
					b.push(13);
					break;
				case "t":
					b.push(9);
					break;
				case "v":
					b.push(11);
					break;
				case "0":
				case "1":
				case "2":
				case "3":
				case "4":
				case "5":
				case "6":
				case "7": {
					const s = input.c;
					const t = input.take(2);
					if (t === false) return false;
					const n = parseInt(s + t, 8);
					if (Number.isNaN(n)) return false;
					b.push(n);
					break;
				}
				case "x": {
					const s = input.c;
					const t = input.take(2);
					if (t === false) return false;
					const n = parseInt(s + t, 16);
					if (Number.isNaN(n)) return false;
					b.push(n);
					break;
				}
				case "u": {
					const s = input.c;
					const t = input.take(4);
					if (t === false) return false;
					const n = parseInt(s + t, 16);
					if (Number.isNaN(n)) return false;
					const chunk = new Uint8Array(4);
					new DataView(chunk.buffer).setInt32(0, n, true);
					b.push(chunk[0], chunk[1], chunk[2], chunk[3]);
					break;
				}
				case "U": {
					const s = input.c;
					const t = input.take(8);
					if (t === false) return false;
					const tc = protoInt64$1.uEnc(s + t);
					const chunk = new Uint8Array(8);
					const view = new DataView(chunk.buffer);
					view.setInt32(0, tc.lo, true);
					view.setInt32(4, tc.hi, true);
					b.push(chunk[0], chunk[1], chunk[2], chunk[3], chunk[4], chunk[5], chunk[6], chunk[7]);
					break;
				}
			}
			break;
		default: b.push(input.c.charCodeAt(0));
	}
	return new Uint8Array(b);
}
//#endregion
//#region ../../packages/agent-provider/node_modules/@bufbuild/protobuf/dist/esm/reflect/nested-types.js
/**
* Iterate over all types - enumerations, extensions, services, messages -
* and enumerations, extensions and messages nested in messages.
*/
function* nestedTypes$1(desc) {
	switch (desc.kind) {
		case "file":
			for (const message of desc.messages) {
				yield message;
				yield* nestedTypes$1(message);
			}
			yield* desc.enums;
			yield* desc.services;
			yield* desc.extensions;
			break;
		case "message":
			for (const message of desc.nestedMessages) {
				yield message;
				yield* nestedTypes$1(message);
			}
			yield* desc.nestedEnums;
			yield* desc.nestedExtensions;
			break;
	}
}
//#endregion
//#region ../../packages/agent-provider/node_modules/@bufbuild/protobuf/dist/esm/registry.js
function createFileRegistry$1(...args) {
	const registry = createBaseRegistry$1();
	if (!args.length) return registry;
	if ("$typeName" in args[0] && args[0].$typeName == "google.protobuf.FileDescriptorSet") {
		for (const file of args[0].file) addFile$1(file, registry);
		return registry;
	}
	if ("$typeName" in args[0]) {
		const input = args[0];
		const resolve = args[1];
		const seen = /* @__PURE__ */ new Set();
		function recurseDeps(file) {
			const deps = [];
			for (const protoFileName of file.dependency) {
				if (registry.getFile(protoFileName) != void 0) continue;
				if (seen.has(protoFileName)) continue;
				const dep = resolve(protoFileName);
				if (!dep) throw new Error(`Unable to resolve ${protoFileName}, imported by ${file.name}`);
				if ("kind" in dep) registry.addFile(dep, false, true);
				else {
					seen.add(dep.name);
					deps.push(dep);
				}
			}
			return deps.concat(...deps.map(recurseDeps));
		}
		for (const file of [input, ...recurseDeps(input)].reverse()) addFile$1(file, registry);
	} else for (const fileReg of args) for (const file of fileReg.files) registry.addFile(file);
	return registry;
}
/**
* @private
*/
function createBaseRegistry$1() {
	const types = /* @__PURE__ */ new Map();
	const extendees = /* @__PURE__ */ new Map();
	const files = /* @__PURE__ */ new Map();
	return {
		kind: "registry",
		types,
		extendees,
		[Symbol.iterator]() {
			return types.values();
		},
		get files() {
			return files.values();
		},
		addFile(file, skipTypes, withDeps) {
			files.set(file.proto.name, file);
			if (!skipTypes) for (const type of nestedTypes$1(file)) this.add(type);
			if (withDeps) for (const f of file.dependencies) this.addFile(f, skipTypes, withDeps);
		},
		add(desc) {
			if (desc.kind == "extension") {
				let numberToExt = extendees.get(desc.extendee.typeName);
				if (!numberToExt) extendees.set(desc.extendee.typeName, numberToExt = /* @__PURE__ */ new Map());
				numberToExt.set(desc.number, desc);
			}
			types.set(desc.typeName, desc);
		},
		get(typeName) {
			return types.get(typeName);
		},
		getFile(fileName) {
			return files.get(fileName);
		},
		getMessage(typeName) {
			const t = types.get(typeName);
			return (t === null || t === void 0 ? void 0 : t.kind) == "message" ? t : void 0;
		},
		getEnum(typeName) {
			const t = types.get(typeName);
			return (t === null || t === void 0 ? void 0 : t.kind) == "enum" ? t : void 0;
		},
		getExtension(typeName) {
			const t = types.get(typeName);
			return (t === null || t === void 0 ? void 0 : t.kind) == "extension" ? t : void 0;
		},
		getExtensionFor(extendee, no) {
			var _a;
			return (_a = extendees.get(extendee.typeName)) === null || _a === void 0 ? void 0 : _a.get(no);
		},
		getService(typeName) {
			const t = types.get(typeName);
			return (t === null || t === void 0 ? void 0 : t.kind) == "service" ? t : void 0;
		}
	};
}
var EDITION_PROTO2$3 = 998;
var EDITION_PROTO3$3 = 999;
var TYPE_STRING$1 = 9;
var TYPE_GROUP$1 = 10;
var TYPE_MESSAGE$1 = 11;
var TYPE_BYTES$1 = 12;
var TYPE_ENUM$1 = 14;
var LABEL_REPEATED$1 = 3;
var LABEL_REQUIRED$1 = 2;
var JS_STRING$1 = 1;
var IDEMPOTENCY_UNKNOWN$1 = 0;
var EXPLICIT$1 = 1;
var IMPLICIT$4 = 2;
var LEGACY_REQUIRED$2 = 3;
var PACKED$1 = 1;
var DELIMITED$1 = 2;
var OPEN$1 = 1;
var featureDefaults$1 = {
	998: {
		fieldPresence: 1,
		enumType: 2,
		repeatedFieldEncoding: 2,
		utf8Validation: 3,
		messageEncoding: 1,
		jsonFormat: 2,
		enforceNamingStyle: 2,
		defaultSymbolVisibility: 1
	},
	999: {
		fieldPresence: 2,
		enumType: 1,
		repeatedFieldEncoding: 1,
		utf8Validation: 2,
		messageEncoding: 1,
		jsonFormat: 1,
		enforceNamingStyle: 2,
		defaultSymbolVisibility: 1
	},
	1e3: {
		fieldPresence: 1,
		enumType: 1,
		repeatedFieldEncoding: 1,
		utf8Validation: 2,
		messageEncoding: 1,
		jsonFormat: 1,
		enforceNamingStyle: 2,
		defaultSymbolVisibility: 1
	},
	1001: {
		fieldPresence: 1,
		enumType: 1,
		repeatedFieldEncoding: 1,
		utf8Validation: 2,
		messageEncoding: 1,
		jsonFormat: 1,
		enforceNamingStyle: 1,
		defaultSymbolVisibility: 2
	}
};
/**
* Create a descriptor for a file, add it to the registry.
*/
function addFile$1(proto, reg) {
	var _a, _b;
	const file = {
		kind: "file",
		proto,
		deprecated: (_b = (_a = proto.options) === null || _a === void 0 ? void 0 : _a.deprecated) !== null && _b !== void 0 ? _b : false,
		edition: getFileEdition$1(proto),
		name: proto.name.replace(/\.proto$/, ""),
		dependencies: findFileDependencies$1(proto, reg),
		enums: [],
		messages: [],
		extensions: [],
		services: [],
		toString() {
			return `file ${proto.name}`;
		}
	};
	const mapEntriesStore = /* @__PURE__ */ new Map();
	const mapEntries = {
		get(typeName) {
			return mapEntriesStore.get(typeName);
		},
		add(desc) {
			var _a;
			assert$1(((_a = desc.proto.options) === null || _a === void 0 ? void 0 : _a.mapEntry) === true);
			mapEntriesStore.set(desc.typeName, desc);
		}
	};
	for (const enumProto of proto.enumType) addEnum$1(enumProto, file, void 0, reg);
	for (const messageProto of proto.messageType) addMessage$1(messageProto, file, void 0, reg, mapEntries);
	for (const serviceProto of proto.service) addService$1(serviceProto, file, reg);
	addExtensions$1(file, reg);
	for (const mapEntry of mapEntriesStore.values()) addFields$1(mapEntry, reg, mapEntries);
	for (const message of file.messages) {
		addFields$1(message, reg, mapEntries);
		addExtensions$1(message, reg);
	}
	reg.addFile(file, true);
}
/**
* Create descriptors for extensions, and add them to the message / file,
* and to our cart.
* Recurses into nested types.
*/
function addExtensions$1(desc, reg) {
	switch (desc.kind) {
		case "file":
			for (const proto of desc.proto.extension) {
				const ext = newField$1(proto, desc, reg);
				desc.extensions.push(ext);
				reg.add(ext);
			}
			break;
		case "message":
			for (const proto of desc.proto.extension) {
				const ext = newField$1(proto, desc, reg);
				desc.nestedExtensions.push(ext);
				reg.add(ext);
			}
			for (const message of desc.nestedMessages) addExtensions$1(message, reg);
			break;
	}
}
/**
* Create descriptors for fields and oneof groups, and add them to the message.
* Recurses into nested types.
*/
function addFields$1(message, reg, mapEntries) {
	const allOneofs = message.proto.oneofDecl.map((proto) => newOneof$1(proto, message));
	const oneofsSeen = /* @__PURE__ */ new Set();
	for (const proto of message.proto.field) {
		const oneof = findOneof$1(proto, allOneofs);
		const field = newField$1(proto, message, reg, oneof, mapEntries);
		message.fields.push(field);
		message.field[field.localName] = field;
		if (oneof === void 0) message.members.push(field);
		else {
			oneof.fields.push(field);
			if (!oneofsSeen.has(oneof)) {
				oneofsSeen.add(oneof);
				message.members.push(oneof);
			}
		}
	}
	for (const oneof of allOneofs.filter((o) => oneofsSeen.has(o))) message.oneofs.push(oneof);
	for (const child of message.nestedMessages) addFields$1(child, reg, mapEntries);
}
/**
* Create a descriptor for an enumeration, and add it our cart and to the
* parent type, if any.
*/
function addEnum$1(proto, file, parent, reg) {
	var _a, _b, _c, _d, _e;
	const sharedPrefix = findEnumSharedPrefix$1(proto.name, proto.value);
	const desc = {
		kind: "enum",
		proto,
		deprecated: (_b = (_a = proto.options) === null || _a === void 0 ? void 0 : _a.deprecated) !== null && _b !== void 0 ? _b : false,
		file,
		parent,
		open: true,
		name: proto.name,
		typeName: makeTypeName$1(proto, parent, file),
		value: {},
		values: [],
		sharedPrefix,
		toString() {
			return `enum ${this.typeName}`;
		}
	};
	desc.open = isEnumOpen$1(desc);
	reg.add(desc);
	for (const p of proto.value) {
		const name = p.name;
		desc.values.push(desc.value[p.number] = {
			kind: "enum_value",
			proto: p,
			deprecated: (_d = (_c = p.options) === null || _c === void 0 ? void 0 : _c.deprecated) !== null && _d !== void 0 ? _d : false,
			parent: desc,
			name,
			localName: safeObjectProperty$1(sharedPrefix == void 0 ? name : name.substring(sharedPrefix.length)),
			number: p.number,
			toString() {
				return `enum value ${desc.typeName}.${name}`;
			}
		});
	}
	((_e = parent === null || parent === void 0 ? void 0 : parent.nestedEnums) !== null && _e !== void 0 ? _e : file.enums).push(desc);
}
/**
* Create a descriptor for a message, including nested types, and add it to our
* cart. Note that this does not create descriptors fields.
*/
function addMessage$1(proto, file, parent, reg, mapEntries) {
	var _a, _b, _c, _d;
	const desc = {
		kind: "message",
		proto,
		deprecated: (_b = (_a = proto.options) === null || _a === void 0 ? void 0 : _a.deprecated) !== null && _b !== void 0 ? _b : false,
		file,
		parent,
		name: proto.name,
		typeName: makeTypeName$1(proto, parent, file),
		fields: [],
		field: {},
		oneofs: [],
		members: [],
		nestedEnums: [],
		nestedMessages: [],
		nestedExtensions: [],
		toString() {
			return `message ${this.typeName}`;
		}
	};
	if (((_c = proto.options) === null || _c === void 0 ? void 0 : _c.mapEntry) === true) mapEntries.add(desc);
	else {
		((_d = parent === null || parent === void 0 ? void 0 : parent.nestedMessages) !== null && _d !== void 0 ? _d : file.messages).push(desc);
		reg.add(desc);
	}
	for (const enumProto of proto.enumType) addEnum$1(enumProto, file, desc, reg);
	for (const messageProto of proto.nestedType) addMessage$1(messageProto, file, desc, reg, mapEntries);
}
/**
* Create a descriptor for a service, including methods, and add it to our
* cart.
*/
function addService$1(proto, file, reg) {
	var _a, _b;
	const desc = {
		kind: "service",
		proto,
		deprecated: (_b = (_a = proto.options) === null || _a === void 0 ? void 0 : _a.deprecated) !== null && _b !== void 0 ? _b : false,
		file,
		name: proto.name,
		typeName: makeTypeName$1(proto, void 0, file),
		methods: [],
		method: {},
		toString() {
			return `service ${this.typeName}`;
		}
	};
	file.services.push(desc);
	reg.add(desc);
	for (const methodProto of proto.method) {
		const method = newMethod$1(methodProto, desc, reg);
		desc.methods.push(method);
		desc.method[method.localName] = method;
	}
}
/**
* Create a descriptor for a method.
*/
function newMethod$1(proto, parent, reg) {
	var _a, _b, _c, _d;
	let methodKind;
	if (proto.clientStreaming && proto.serverStreaming) methodKind = "bidi_streaming";
	else if (proto.clientStreaming) methodKind = "client_streaming";
	else if (proto.serverStreaming) methodKind = "server_streaming";
	else methodKind = "unary";
	const input = reg.getMessage(trimLeadingDot$1(proto.inputType));
	const output = reg.getMessage(trimLeadingDot$1(proto.outputType));
	assert$1(input, `invalid MethodDescriptorProto: input_type ${proto.inputType} not found`);
	assert$1(output, `invalid MethodDescriptorProto: output_type ${proto.inputType} not found`);
	const name = proto.name;
	return {
		kind: "rpc",
		proto,
		deprecated: (_b = (_a = proto.options) === null || _a === void 0 ? void 0 : _a.deprecated) !== null && _b !== void 0 ? _b : false,
		parent,
		name,
		localName: safeObjectProperty$1(name.length ? safeObjectProperty$1(name[0].toLowerCase() + name.substring(1)) : name),
		methodKind,
		input,
		output,
		idempotency: (_d = (_c = proto.options) === null || _c === void 0 ? void 0 : _c.idempotencyLevel) !== null && _d !== void 0 ? _d : IDEMPOTENCY_UNKNOWN$1,
		toString() {
			return `rpc ${parent.typeName}.${name}`;
		}
	};
}
/**
* Create a descriptor for a oneof group.
*/
function newOneof$1(proto, parent) {
	return {
		kind: "oneof",
		proto,
		deprecated: false,
		parent,
		fields: [],
		name: proto.name,
		localName: safeObjectProperty$1(protoCamelCase$1(proto.name)),
		toString() {
			return `oneof ${parent.typeName}.${this.name}`;
		}
	};
}
function newField$1(proto, parentOrFile, reg, oneof, mapEntries) {
	var _a, _b, _c;
	const isExtension = mapEntries === void 0;
	const field = {
		kind: "field",
		proto,
		deprecated: (_b = (_a = proto.options) === null || _a === void 0 ? void 0 : _a.deprecated) !== null && _b !== void 0 ? _b : false,
		name: proto.name,
		number: proto.number,
		scalar: void 0,
		message: void 0,
		enum: void 0,
		presence: getFieldPresence$1(proto, oneof, isExtension, parentOrFile),
		listKind: void 0,
		mapKind: void 0,
		mapKey: void 0,
		delimitedEncoding: void 0,
		packed: void 0,
		longAsString: false,
		getDefaultValue: void 0
	};
	if (isExtension) {
		const file = parentOrFile.kind == "file" ? parentOrFile : parentOrFile.file;
		const parent = parentOrFile.kind == "file" ? void 0 : parentOrFile;
		const typeName = makeTypeName$1(proto, parent, file);
		field.kind = "extension";
		field.file = file;
		field.parent = parent;
		field.oneof = void 0;
		field.typeName = typeName;
		field.jsonName = `[${typeName}]`;
		field.toString = () => `extension ${typeName}`;
		const extendee = reg.getMessage(trimLeadingDot$1(proto.extendee));
		assert$1(extendee, `invalid FieldDescriptorProto: extendee ${proto.extendee} not found`);
		field.extendee = extendee;
	} else {
		const parent = parentOrFile;
		assert$1(parent.kind == "message");
		field.parent = parent;
		field.oneof = oneof;
		field.localName = oneof ? protoCamelCase$1(proto.name) : safeObjectProperty$1(protoCamelCase$1(proto.name));
		field.jsonName = proto.jsonName;
		field.toString = () => `field ${parent.typeName}.${proto.name}`;
	}
	const label = proto.label;
	const type = proto.type;
	const jstype = (_c = proto.options) === null || _c === void 0 ? void 0 : _c.jstype;
	if (label === LABEL_REPEATED$1) {
		const mapEntry = type == TYPE_MESSAGE$1 ? mapEntries === null || mapEntries === void 0 ? void 0 : mapEntries.get(trimLeadingDot$1(proto.typeName)) : void 0;
		if (mapEntry) {
			field.fieldKind = "map";
			const { key, value } = findMapEntryFields$1(mapEntry);
			field.mapKey = key.scalar;
			field.mapKind = value.fieldKind;
			field.message = value.message;
			field.delimitedEncoding = false;
			field.enum = value.enum;
			field.scalar = value.scalar;
			return field;
		}
		field.fieldKind = "list";
		switch (type) {
			case TYPE_MESSAGE$1:
			case TYPE_GROUP$1:
				field.listKind = "message";
				field.message = reg.getMessage(trimLeadingDot$1(proto.typeName));
				assert$1(field.message);
				field.delimitedEncoding = isDelimitedEncoding$1(proto, parentOrFile);
				break;
			case TYPE_ENUM$1:
				field.listKind = "enum";
				field.enum = reg.getEnum(trimLeadingDot$1(proto.typeName));
				assert$1(field.enum);
				break;
			default:
				field.listKind = "scalar";
				field.scalar = type;
				field.longAsString = jstype == JS_STRING$1;
				break;
		}
		field.packed = isPackedField$1(proto, parentOrFile);
		return field;
	}
	switch (type) {
		case TYPE_MESSAGE$1:
		case TYPE_GROUP$1:
			field.fieldKind = "message";
			field.message = reg.getMessage(trimLeadingDot$1(proto.typeName));
			assert$1(field.message, `invalid FieldDescriptorProto: type_name ${proto.typeName} not found`);
			field.delimitedEncoding = isDelimitedEncoding$1(proto, parentOrFile);
			field.getDefaultValue = () => void 0;
			break;
		case TYPE_ENUM$1: {
			const enumeration = reg.getEnum(trimLeadingDot$1(proto.typeName));
			assert$1(enumeration !== void 0, `invalid FieldDescriptorProto: type_name ${proto.typeName} not found`);
			field.fieldKind = "enum";
			field.enum = reg.getEnum(trimLeadingDot$1(proto.typeName));
			field.getDefaultValue = () => {
				return unsafeIsSetExplicit$1(proto, "defaultValue") ? parseTextFormatEnumValue$1(enumeration, proto.defaultValue) : void 0;
			};
			break;
		}
		default:
			field.fieldKind = "scalar";
			field.scalar = type;
			field.longAsString = jstype == JS_STRING$1;
			field.getDefaultValue = () => {
				return unsafeIsSetExplicit$1(proto, "defaultValue") ? parseTextFormatScalarValue$1(type, proto.defaultValue) : void 0;
			};
			break;
	}
	return field;
}
/**
* Parse the "syntax" and "edition" fields, returning one of the supported
* editions.
*/
function getFileEdition$1(proto) {
	switch (proto.syntax) {
		case "":
		case "proto2": return EDITION_PROTO2$3;
		case "proto3": return EDITION_PROTO3$3;
		case "editions":
			if (proto.edition in featureDefaults$1) return proto.edition;
			throw new Error(`${proto.name}: unsupported edition`);
		default: throw new Error(`${proto.name}: unsupported syntax "${proto.syntax}"`);
	}
}
/**
* Resolve dependencies of FileDescriptorProto to DescFile.
*/
function findFileDependencies$1(proto, reg) {
	return proto.dependency.map((wantName) => {
		const dep = reg.getFile(wantName);
		if (!dep) throw new Error(`Cannot find ${wantName}, imported by ${proto.name}`);
		return dep;
	});
}
/**
* Finds a prefix shared by enum values, for example `my_enum_` for
* `enum MyEnum {MY_ENUM_A=0; MY_ENUM_B=1;}`.
*/
function findEnumSharedPrefix$1(enumName, values) {
	const prefix = camelToSnakeCase$1(enumName) + "_";
	for (const value of values) {
		if (!value.name.toLowerCase().startsWith(prefix)) return;
		const shortName = value.name.substring(prefix.length);
		if (shortName.length == 0) return;
		if (/^\d/.test(shortName)) return;
	}
	return prefix;
}
/**
* Converts lowerCamelCase or UpperCamelCase into lower_snake_case.
* This is used to find shared prefixes in an enum.
*/
function camelToSnakeCase$1(camel) {
	return (camel.substring(0, 1) + camel.substring(1).replace(/[A-Z]/g, (c) => "_" + c)).toLowerCase();
}
/**
* Create a fully qualified name for a protobuf type or extension field.
*
* The fully qualified name for messages, enumerations, and services is
* constructed by concatenating the package name (if present), parent
* message names (for nested types), and the type name. We omit the leading
* dot added by protobuf compilers. Examples:
* - mypackage.MyMessage
* - mypackage.MyMessage.NestedMessage
*
* The fully qualified name for extension fields is constructed by
* concatenating the package name (if present), parent message names (for
* extensions declared within a message), and the field name. Examples:
* - mypackage.extfield
* - mypackage.MyMessage.extfield
*/
function makeTypeName$1(proto, parent, file) {
	let typeName;
	if (parent) typeName = `${parent.typeName}.${proto.name}`;
	else if (file.proto.package.length > 0) typeName = `${file.proto.package}.${proto.name}`;
	else typeName = `${proto.name}`;
	return typeName;
}
/**
* Remove the leading dot from a fully qualified type name.
*/
function trimLeadingDot$1(typeName) {
	return typeName.startsWith(".") ? typeName.substring(1) : typeName;
}
/**
* Did the user put the field in a oneof group?
* Synthetic oneofs for proto3 optionals are ignored.
*/
function findOneof$1(proto, allOneofs) {
	if (!unsafeIsSetExplicit$1(proto, "oneofIndex")) return;
	if (proto.proto3Optional) return;
	const oneof = allOneofs[proto.oneofIndex];
	assert$1(oneof, `invalid FieldDescriptorProto: oneof #${proto.oneofIndex} for field #${proto.number} not found`);
	return oneof;
}
/**
* Presence of the field.
* See https://protobuf.dev/programming-guides/field_presence/
*/
function getFieldPresence$1(proto, oneof, isExtension, parent) {
	if (proto.label == LABEL_REQUIRED$1) return LEGACY_REQUIRED$2;
	if (proto.label == LABEL_REPEATED$1) return IMPLICIT$4;
	if (!!oneof || proto.proto3Optional) return EXPLICIT$1;
	if (isExtension) return EXPLICIT$1;
	const resolved = resolveFeature$1("fieldPresence", {
		proto,
		parent
	});
	if (resolved == IMPLICIT$4 && (proto.type == TYPE_MESSAGE$1 || proto.type == TYPE_GROUP$1)) return EXPLICIT$1;
	return resolved;
}
/**
* Pack this repeated field?
*/
function isPackedField$1(proto, parent) {
	if (proto.label != LABEL_REPEATED$1) return false;
	switch (proto.type) {
		case TYPE_STRING$1:
		case TYPE_BYTES$1:
		case TYPE_GROUP$1:
		case TYPE_MESSAGE$1: return false;
	}
	const o = proto.options;
	if (o && unsafeIsSetExplicit$1(o, "packed")) return o.packed;
	return PACKED$1 == resolveFeature$1("repeatedFieldEncoding", {
		proto,
		parent
	});
}
/**
* Find the key and value fields of a synthetic map entry message.
*/
function findMapEntryFields$1(mapEntry) {
	const key = mapEntry.fields.find((f) => f.number === 1);
	const value = mapEntry.fields.find((f) => f.number === 2);
	assert$1(key && key.fieldKind == "scalar" && key.scalar != ScalarType$1.BYTES && key.scalar != ScalarType$1.FLOAT && key.scalar != ScalarType$1.DOUBLE && value && value.fieldKind != "list" && value.fieldKind != "map");
	return {
		key,
		value
	};
}
/**
* Enumerations can be open or closed.
* See https://protobuf.dev/programming-guides/enum/
*/
function isEnumOpen$1(desc) {
	var _a;
	return OPEN$1 == resolveFeature$1("enumType", {
		proto: desc.proto,
		parent: (_a = desc.parent) !== null && _a !== void 0 ? _a : desc.file
	});
}
/**
* Encode the message delimited (a.k.a. proto2 group encoding), or
* length-prefixed?
*/
function isDelimitedEncoding$1(proto, parent) {
	if (proto.type == TYPE_GROUP$1) return true;
	return DELIMITED$1 == resolveFeature$1("messageEncoding", {
		proto,
		parent
	});
}
function resolveFeature$1(name, ref) {
	var _a, _b;
	const featureSet = (_a = ref.proto.options) === null || _a === void 0 ? void 0 : _a.features;
	if (featureSet) {
		const val = featureSet[name];
		if (val != 0) return val;
	}
	if ("kind" in ref) {
		if (ref.kind == "message") return resolveFeature$1(name, (_b = ref.parent) !== null && _b !== void 0 ? _b : ref.file);
		const editionDefaults = featureDefaults$1[ref.edition];
		if (!editionDefaults) throw new Error(`feature default for edition ${ref.edition} not found`);
		return editionDefaults[name];
	}
	return resolveFeature$1(name, ref.parent);
}
/**
* Assert that condition is truthy or throw error (with message)
*/
function assert$1(condition, msg) {
	if (!condition) throw new Error(msg);
}
//#endregion
//#region ../../packages/agent-provider/node_modules/@bufbuild/protobuf/dist/esm/codegenv2/boot.js
/**
* Hydrate a file descriptor for google/protobuf/descriptor.proto from a plain
* object.
*
* See createFileDescriptorProtoBoot() for details.
*
* @private
*/
function boot$1(boot) {
	const root = bootFileDescriptorProto$1(boot);
	root.messageType.forEach(restoreJsonNames$1);
	return createFileRegistry$1(root, () => void 0).getFile(root.name);
}
/**
* Creates the message google.protobuf.FileDescriptorProto from an object literal.
*
* See createFileDescriptorProtoBoot() for details.
*
* @private
*/
function bootFileDescriptorProto$1(init) {
	return Object.assign(Object.create({
		syntax: "",
		edition: 0
	}), Object.assign(Object.assign({
		$typeName: "google.protobuf.FileDescriptorProto",
		dependency: [],
		publicDependency: [],
		weakDependency: [],
		optionDependency: [],
		service: [],
		extension: []
	}, init), {
		messageType: init.messageType.map(bootDescriptorProto$1),
		enumType: init.enumType.map(bootEnumDescriptorProto$1)
	}));
}
function bootDescriptorProto$1(init) {
	var _a, _b, _c, _d, _e, _f, _g, _h;
	return Object.assign(Object.create({ visibility: 0 }), {
		$typeName: "google.protobuf.DescriptorProto",
		name: init.name,
		field: (_b = (_a = init.field) === null || _a === void 0 ? void 0 : _a.map(bootFieldDescriptorProto$1)) !== null && _b !== void 0 ? _b : [],
		extension: [],
		nestedType: (_d = (_c = init.nestedType) === null || _c === void 0 ? void 0 : _c.map(bootDescriptorProto$1)) !== null && _d !== void 0 ? _d : [],
		enumType: (_f = (_e = init.enumType) === null || _e === void 0 ? void 0 : _e.map(bootEnumDescriptorProto$1)) !== null && _f !== void 0 ? _f : [],
		extensionRange: (_h = (_g = init.extensionRange) === null || _g === void 0 ? void 0 : _g.map((e) => Object.assign({ $typeName: "google.protobuf.DescriptorProto.ExtensionRange" }, e))) !== null && _h !== void 0 ? _h : [],
		oneofDecl: [],
		reservedRange: [],
		reservedName: []
	});
}
function bootFieldDescriptorProto$1(init) {
	return Object.assign(Object.create({
		label: 1,
		typeName: "",
		extendee: "",
		defaultValue: "",
		oneofIndex: 0,
		jsonName: "",
		proto3Optional: false
	}), Object.assign(Object.assign({ $typeName: "google.protobuf.FieldDescriptorProto" }, init), { options: init.options ? bootFieldOptions$1(init.options) : void 0 }));
}
function bootFieldOptions$1(init) {
	var _a, _b, _c;
	return Object.assign(Object.create({
		ctype: 0,
		packed: false,
		jstype: 0,
		lazy: false,
		unverifiedLazy: false,
		deprecated: false,
		weak: false,
		debugRedact: false,
		retention: 0
	}), Object.assign(Object.assign({ $typeName: "google.protobuf.FieldOptions" }, init), {
		targets: (_a = init.targets) !== null && _a !== void 0 ? _a : [],
		editionDefaults: (_c = (_b = init.editionDefaults) === null || _b === void 0 ? void 0 : _b.map((e) => Object.assign({ $typeName: "google.protobuf.FieldOptions.EditionDefault" }, e))) !== null && _c !== void 0 ? _c : [],
		uninterpretedOption: []
	}));
}
function bootEnumDescriptorProto$1(init) {
	return Object.assign(Object.create({ visibility: 0 }), {
		$typeName: "google.protobuf.EnumDescriptorProto",
		name: init.name,
		reservedName: [],
		reservedRange: [],
		value: init.value.map((e) => Object.assign({ $typeName: "google.protobuf.EnumValueDescriptorProto" }, e))
	});
}
//#endregion
//#region ../../packages/agent-provider/node_modules/@bufbuild/protobuf/dist/esm/wire/base64-encoding.js
/**
* Decodes a base64 string to a byte array.
*
* - ignores white-space, including line breaks and tabs
* - allows inner padding (can decode concatenated base64 strings)
* - does not require padding
* - understands base64url encoding:
*   "-" instead of "+",
*   "_" instead of "/",
*   no padding
*/
function base64Decode$1(base64Str) {
	const table = getDecodeTable$1();
	let es = base64Str.length * 3 / 4;
	if (base64Str[base64Str.length - 2] == "=") es -= 2;
	else if (base64Str[base64Str.length - 1] == "=") es -= 1;
	let bytes = new Uint8Array(es), bytePos = 0, groupPos = 0, b, p = 0;
	for (let i = 0; i < base64Str.length; i++) {
		b = table[base64Str.charCodeAt(i)];
		if (b === void 0) switch (base64Str[i]) {
			case "=": groupPos = 0;
			case "\n":
			case "\r":
			case "	":
			case " ": continue;
			default: throw Error("invalid base64 string");
		}
		switch (groupPos) {
			case 0:
				p = b;
				groupPos = 1;
				break;
			case 1:
				bytes[bytePos++] = p << 2 | (b & 48) >> 4;
				p = b;
				groupPos = 2;
				break;
			case 2:
				bytes[bytePos++] = (p & 15) << 4 | (b & 60) >> 2;
				p = b;
				groupPos = 3;
				break;
			case 3:
				bytes[bytePos++] = (p & 3) << 6 | b;
				groupPos = 0;
				break;
		}
	}
	if (groupPos == 1) throw Error("invalid base64 string");
	return bytes.subarray(0, bytePos);
}
var encodeTableStd$1;
var encodeTableUrl$1;
var decodeTable$1;
function getEncodeTable$1(encoding) {
	if (!encodeTableStd$1) {
		encodeTableStd$1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
		encodeTableUrl$1 = encodeTableStd$1.slice(0, -2).concat("-", "_");
	}
	return encoding == "url" ? encodeTableUrl$1 : encodeTableStd$1;
}
function getDecodeTable$1() {
	if (!decodeTable$1) {
		decodeTable$1 = [];
		const encodeTable = getEncodeTable$1("std");
		for (let i = 0; i < encodeTable.length; i++) decodeTable$1[encodeTable[i].charCodeAt(0)] = i;
		decodeTable$1["-".charCodeAt(0)] = encodeTable.indexOf("+");
		decodeTable$1["_".charCodeAt(0)] = encodeTable.indexOf("/");
	}
	return decodeTable$1;
}
//#endregion
//#region ../../packages/agent-provider/node_modules/@bufbuild/protobuf/dist/esm/is-message.js
/**
* Determine whether the given `arg` is a message.
* If `desc` is set, determine whether `arg` is this specific message.
*/
function isMessage$1(arg, schema) {
	if (!(arg !== null && typeof arg == "object" && "$typeName" in arg && typeof arg.$typeName == "string")) return false;
	if (schema === void 0) return true;
	return schema.typeName === arg.$typeName;
}
//#endregion
//#region ../../packages/agent-provider/node_modules/@bufbuild/protobuf/dist/esm/reflect/error.js
var FieldError$1 = class extends Error {
	constructor(fieldOrOneof, message, name = "FieldValueInvalidError") {
		super(message);
		this.name = name;
		this.field = () => fieldOrOneof;
	}
};
//#endregion
//#region ../../packages/agent-provider/node_modules/@bufbuild/protobuf/dist/esm/reflect/guard.js
function isObject$1(arg) {
	return arg !== null && typeof arg == "object" && !Array.isArray(arg);
}
function isReflectList$1(arg, field) {
	var _a, _b, _c, _d;
	if (isObject$1(arg) && unsafeLocal$1 in arg && "add" in arg && "field" in arg && typeof arg.field == "function") {
		if (field !== void 0) {
			const a = field;
			const b = arg.field();
			return a.listKind == b.listKind && a.scalar === b.scalar && ((_a = a.message) === null || _a === void 0 ? void 0 : _a.typeName) === ((_b = b.message) === null || _b === void 0 ? void 0 : _b.typeName) && ((_c = a.enum) === null || _c === void 0 ? void 0 : _c.typeName) === ((_d = b.enum) === null || _d === void 0 ? void 0 : _d.typeName);
		}
		return true;
	}
	return false;
}
function isReflectMap$1(arg, field) {
	var _a, _b, _c, _d;
	if (isObject$1(arg) && unsafeLocal$1 in arg && "has" in arg && "field" in arg && typeof arg.field == "function") {
		if (field !== void 0) {
			const a = field, b = arg.field();
			return a.mapKey === b.mapKey && a.mapKind == b.mapKind && a.scalar === b.scalar && ((_a = a.message) === null || _a === void 0 ? void 0 : _a.typeName) === ((_b = b.message) === null || _b === void 0 ? void 0 : _b.typeName) && ((_c = a.enum) === null || _c === void 0 ? void 0 : _c.typeName) === ((_d = b.enum) === null || _d === void 0 ? void 0 : _d.typeName);
		}
		return true;
	}
	return false;
}
function isReflectMessage$1(arg, messageDesc) {
	return isObject$1(arg) && unsafeLocal$1 in arg && "desc" in arg && isObject$1(arg.desc) && arg.desc.kind === "message" && (messageDesc === void 0 || arg.desc.typeName == messageDesc.typeName);
}
//#endregion
//#region ../../packages/agent-provider/node_modules/@bufbuild/protobuf/dist/esm/wire/text-encoding.js
var symbol$1 = Symbol.for("@bufbuild/protobuf/text-encoding");
function getTextEncoding$1() {
	if (globalThis[symbol$1] == void 0) {
		const te = new globalThis.TextEncoder();
		const td = new globalThis.TextDecoder();
		globalThis[symbol$1] = {
			encodeUtf8(text) {
				return te.encode(text);
			},
			decodeUtf8(bytes) {
				return td.decode(bytes);
			},
			checkUtf8(text) {
				try {
					return true;
				} catch (_) {
					return false;
				}
			}
		};
	}
	return globalThis[symbol$1];
}
//#endregion
//#region ../../packages/agent-provider/node_modules/@bufbuild/protobuf/dist/esm/wire/binary-encoding.js
/**
* Protobuf binary format wire types.
*
* A wire type provides just enough information to find the length of the
* following value.
*
* See https://developers.google.com/protocol-buffers/docs/encoding#structure
*/
var WireType$1;
(function(WireType) {
	/**
	* Used for int32, int64, uint32, uint64, sint32, sint64, bool, enum
	*/
	WireType[WireType["Varint"] = 0] = "Varint";
	/**
	* Used for fixed64, sfixed64, double.
	* Always 8 bytes with little-endian byte order.
	*/
	WireType[WireType["Bit64"] = 1] = "Bit64";
	/**
	* Used for string, bytes, embedded messages, packed repeated fields
	*
	* Only repeated numeric types (types which use the varint, 32-bit,
	* or 64-bit wire types) can be packed. In proto3, such fields are
	* packed by default.
	*/
	WireType[WireType["LengthDelimited"] = 2] = "LengthDelimited";
	/**
	* Start of a tag-delimited aggregate, such as a proto2 group, or a message
	* in editions with message_encoding = DELIMITED.
	*/
	WireType[WireType["StartGroup"] = 3] = "StartGroup";
	/**
	* End of a tag-delimited aggregate.
	*/
	WireType[WireType["EndGroup"] = 4] = "EndGroup";
	/**
	* Used for fixed32, sfixed32, float.
	* Always 4 bytes with little-endian byte order.
	*/
	WireType[WireType["Bit32"] = 5] = "Bit32";
})(WireType$1 || (WireType$1 = {}));
var BinaryReader$1 = class {
	constructor(buf, decodeUtf8 = getTextEncoding$1().decodeUtf8) {
		this.decodeUtf8 = decodeUtf8;
		this.varint64 = varint64read$1;
		/**
		* Read a `uint32` field, an unsigned 32 bit varint.
		*/
		this.uint32 = varint32read$1;
		this.buf = buf;
		this.len = buf.length;
		this.pos = 0;
		this.view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
	}
	/**
	* Reads a tag - field number and wire type.
	*/
	tag() {
		let tag = this.uint32(), fieldNo = tag >>> 3, wireType = tag & 7;
		if (fieldNo <= 0 || wireType < 0 || wireType > 5) throw new Error("illegal tag: field no " + fieldNo + " wire type " + wireType);
		return [fieldNo, wireType];
	}
	/**
	* Skip one element and return the skipped data.
	*
	* When skipping StartGroup, provide the tags field number to check for
	* matching field number in the EndGroup tag.
	*/
	skip(wireType, fieldNo) {
		let start = this.pos;
		switch (wireType) {
			case WireType$1.Varint:
				while (this.buf[this.pos++] & 128);
				break;
			case WireType$1.Bit64: this.pos += 4;
			case WireType$1.Bit32:
				this.pos += 4;
				break;
			case WireType$1.LengthDelimited:
				let len = this.uint32();
				this.pos += len;
				break;
			case WireType$1.StartGroup:
				for (;;) {
					const [fn, wt] = this.tag();
					if (wt === WireType$1.EndGroup) {
						if (fieldNo !== void 0 && fn !== fieldNo) throw new Error("invalid end group tag");
						break;
					}
					this.skip(wt, fn);
				}
				break;
			default: throw new Error("cant skip wire type " + wireType);
		}
		this.assertBounds();
		return this.buf.subarray(start, this.pos);
	}
	/**
	* Throws error if position in byte array is out of range.
	*/
	assertBounds() {
		if (this.pos > this.len) throw new RangeError("premature EOF");
	}
	/**
	* Read a `int32` field, a signed 32 bit varint.
	*/
	int32() {
		return this.uint32() | 0;
	}
	/**
	* Read a `sint32` field, a signed, zigzag-encoded 32-bit varint.
	*/
	sint32() {
		let zze = this.uint32();
		return zze >>> 1 ^ -(zze & 1);
	}
	/**
	* Read a `int64` field, a signed 64-bit varint.
	*/
	int64() {
		return protoInt64$1.dec(...this.varint64());
	}
	/**
	* Read a `uint64` field, an unsigned 64-bit varint.
	*/
	uint64() {
		return protoInt64$1.uDec(...this.varint64());
	}
	/**
	* Read a `sint64` field, a signed, zig-zag-encoded 64-bit varint.
	*/
	sint64() {
		let [lo, hi] = this.varint64();
		let s = -(lo & 1);
		lo = (lo >>> 1 | (hi & 1) << 31) ^ s;
		hi = hi >>> 1 ^ s;
		return protoInt64$1.dec(lo, hi);
	}
	/**
	* Read a `bool` field, a variant.
	*/
	bool() {
		let [lo, hi] = this.varint64();
		return lo !== 0 || hi !== 0;
	}
	/**
	* Read a `fixed32` field, an unsigned, fixed-length 32-bit integer.
	*/
	fixed32() {
		return this.view.getUint32((this.pos += 4) - 4, true);
	}
	/**
	* Read a `sfixed32` field, a signed, fixed-length 32-bit integer.
	*/
	sfixed32() {
		return this.view.getInt32((this.pos += 4) - 4, true);
	}
	/**
	* Read a `fixed64` field, an unsigned, fixed-length 64 bit integer.
	*/
	fixed64() {
		return protoInt64$1.uDec(this.sfixed32(), this.sfixed32());
	}
	/**
	* Read a `fixed64` field, a signed, fixed-length 64-bit integer.
	*/
	sfixed64() {
		return protoInt64$1.dec(this.sfixed32(), this.sfixed32());
	}
	/**
	* Read a `float` field, 32-bit floating point number.
	*/
	float() {
		return this.view.getFloat32((this.pos += 4) - 4, true);
	}
	/**
	* Read a `double` field, a 64-bit floating point number.
	*/
	double() {
		return this.view.getFloat64((this.pos += 8) - 8, true);
	}
	/**
	* Read a `bytes` field, length-delimited arbitrary data.
	*/
	bytes() {
		let len = this.uint32(), start = this.pos;
		this.pos += len;
		this.assertBounds();
		return this.buf.subarray(start, start + len);
	}
	/**
	* Read a `string` field, length-delimited data converted to UTF-8 text.
	*/
	string() {
		return this.decodeUtf8(this.bytes());
	}
};
//#endregion
//#region ../../packages/agent-provider/node_modules/@bufbuild/protobuf/dist/esm/reflect/reflect-check.js
/**
* Check whether the given field value is valid for the reflect API.
*/
function checkField$1(field, value) {
	const check = field.fieldKind == "list" ? isReflectList$1(value, field) : field.fieldKind == "map" ? isReflectMap$1(value, field) : checkSingular$1(field, value);
	if (check === true) return;
	let reason;
	switch (field.fieldKind) {
		case "list":
			reason = `expected ${formatReflectList$1(field)}, got ${formatVal$1(value)}`;
			break;
		case "map":
			reason = `expected ${formatReflectMap$1(field)}, got ${formatVal$1(value)}`;
			break;
		default: reason = reasonSingular$1(field, value, check);
	}
	return new FieldError$1(field, reason);
}
/**
* Check whether the given list item is valid for the reflect API.
*/
function checkListItem$1(field, index, value) {
	const check = checkSingular$1(field, value);
	if (check !== true) return new FieldError$1(field, `list item #${index + 1}: ${reasonSingular$1(field, value, check)}`);
}
/**
* Check whether the given map key and value are valid for the reflect API.
*/
function checkMapEntry$1(field, key, value) {
	const checkKey = checkScalarValue$1(key, field.mapKey);
	if (checkKey !== true) return new FieldError$1(field, `invalid map key: ${reasonSingular$1({ scalar: field.mapKey }, key, checkKey)}`);
	const checkVal = checkSingular$1(field, value);
	if (checkVal !== true) return new FieldError$1(field, `map entry ${formatVal$1(key)}: ${reasonSingular$1(field, value, checkVal)}`);
}
function checkSingular$1(field, value) {
	if (field.scalar !== void 0) return checkScalarValue$1(value, field.scalar);
	if (field.enum !== void 0) {
		if (field.enum.open) return Number.isInteger(value);
		return field.enum.values.some((v) => v.number === value);
	}
	return isReflectMessage$1(value, field.message);
}
function checkScalarValue$1(value, scalar) {
	switch (scalar) {
		case ScalarType$1.DOUBLE: return typeof value == "number";
		case ScalarType$1.FLOAT:
			if (typeof value != "number") return false;
			if (Number.isNaN(value) || !Number.isFinite(value)) return true;
			if (value > 34028234663852886e22 || value < -34028234663852886e22) return `${value.toFixed()} out of range`;
			return true;
		case ScalarType$1.INT32:
		case ScalarType$1.SFIXED32:
		case ScalarType$1.SINT32:
			if (typeof value !== "number" || !Number.isInteger(value)) return false;
			if (value > 2147483647 || value < -2147483648) return `${value.toFixed()} out of range`;
			return true;
		case ScalarType$1.FIXED32:
		case ScalarType$1.UINT32:
			if (typeof value !== "number" || !Number.isInteger(value)) return false;
			if (value > 4294967295 || value < 0) return `${value.toFixed()} out of range`;
			return true;
		case ScalarType$1.BOOL: return typeof value == "boolean";
		case ScalarType$1.STRING:
			if (typeof value != "string") return false;
			return getTextEncoding$1().checkUtf8(value) || "invalid UTF8";
		case ScalarType$1.BYTES: return value instanceof Uint8Array;
		case ScalarType$1.INT64:
		case ScalarType$1.SFIXED64:
		case ScalarType$1.SINT64:
			if (typeof value == "bigint" || typeof value == "number" || typeof value == "string" && value.length > 0) try {
				protoInt64$1.parse(value);
				return true;
			} catch (_) {
				return `${value} out of range`;
			}
			return false;
		case ScalarType$1.FIXED64:
		case ScalarType$1.UINT64:
			if (typeof value == "bigint" || typeof value == "number" || typeof value == "string" && value.length > 0) try {
				protoInt64$1.uParse(value);
				return true;
			} catch (_) {
				return `${value} out of range`;
			}
			return false;
	}
}
function reasonSingular$1(field, val, details) {
	details = typeof details == "string" ? `: ${details}` : `, got ${formatVal$1(val)}`;
	if (field.scalar !== void 0) return `expected ${scalarTypeDescription$1(field.scalar)}` + details;
	if (field.enum !== void 0) return `expected ${field.enum.toString()}` + details;
	return `expected ${formatReflectMessage$1(field.message)}` + details;
}
function formatVal$1(val) {
	switch (typeof val) {
		case "object":
			if (val === null) return "null";
			if (val instanceof Uint8Array) return `Uint8Array(${val.length})`;
			if (Array.isArray(val)) return `Array(${val.length})`;
			if (isReflectList$1(val)) return formatReflectList$1(val.field());
			if (isReflectMap$1(val)) return formatReflectMap$1(val.field());
			if (isReflectMessage$1(val)) return formatReflectMessage$1(val.desc);
			if (isMessage$1(val)) return `message ${val.$typeName}`;
			return "object";
		case "string": return val.length > 30 ? "string" : `"${val.split("\"").join("\\\"")}"`;
		case "boolean": return String(val);
		case "number": return String(val);
		case "bigint": return String(val) + "n";
		default: return typeof val;
	}
}
function formatReflectMessage$1(desc) {
	return `ReflectMessage (${desc.typeName})`;
}
function formatReflectList$1(field) {
	switch (field.listKind) {
		case "message": return `ReflectList (${field.message.toString()})`;
		case "enum": return `ReflectList (${field.enum.toString()})`;
		case "scalar": return `ReflectList (${ScalarType$1[field.scalar]})`;
	}
}
function formatReflectMap$1(field) {
	switch (field.mapKind) {
		case "message": return `ReflectMap (${ScalarType$1[field.mapKey]}, ${field.message.toString()})`;
		case "enum": return `ReflectMap (${ScalarType$1[field.mapKey]}, ${field.enum.toString()})`;
		case "scalar": return `ReflectMap (${ScalarType$1[field.mapKey]}, ${ScalarType$1[field.scalar]})`;
	}
}
function scalarTypeDescription$1(scalar) {
	switch (scalar) {
		case ScalarType$1.STRING: return "string";
		case ScalarType$1.BOOL: return "boolean";
		case ScalarType$1.INT64:
		case ScalarType$1.SINT64:
		case ScalarType$1.SFIXED64: return "bigint (int64)";
		case ScalarType$1.UINT64:
		case ScalarType$1.FIXED64: return "bigint (uint64)";
		case ScalarType$1.BYTES: return "Uint8Array";
		case ScalarType$1.DOUBLE: return "number (float64)";
		case ScalarType$1.FLOAT: return "number (float32)";
		case ScalarType$1.FIXED32:
		case ScalarType$1.UINT32: return "number (uint32)";
		case ScalarType$1.INT32:
		case ScalarType$1.SFIXED32:
		case ScalarType$1.SINT32: return "number (int32)";
	}
}
//#endregion
//#region ../../packages/agent-provider/node_modules/@bufbuild/protobuf/dist/esm/wkt/wrappers.js
function isWrapper$1(arg) {
	return isWrapperTypeName$1(arg.$typeName);
}
function isWrapperDesc$1(messageDesc) {
	const f = messageDesc.fields[0];
	return isWrapperTypeName$1(messageDesc.typeName) && f !== void 0 && f.fieldKind == "scalar" && f.name == "value" && f.number == 1;
}
function isWrapperTypeName$1(name) {
	return name.startsWith("google.protobuf.") && [
		"DoubleValue",
		"FloatValue",
		"Int64Value",
		"UInt64Value",
		"Int32Value",
		"UInt32Value",
		"BoolValue",
		"StringValue",
		"BytesValue"
	].includes(name.substring(16));
}
//#endregion
//#region ../../packages/agent-provider/node_modules/@bufbuild/protobuf/dist/esm/create.js
var EDITION_PROTO3$2 = 999;
var EDITION_PROTO2$2 = 998;
var IMPLICIT$3 = 2;
/**
* Create a new message instance.
*
* The second argument is an optional initializer object, where all fields are
* optional.
*/
function create$1(schema, init) {
	if (isMessage$1(init, schema)) return init;
	const message = createZeroMessage$1(schema);
	if (init !== void 0) initMessage$1(schema, message, init);
	return message;
}
/**
* Sets field values from a MessageInitShape on a zero message.
*/
function initMessage$1(messageDesc, message, init) {
	for (const member of messageDesc.members) {
		let value = init[member.localName];
		if (value == null) continue;
		let field;
		if (member.kind == "oneof") {
			const oneofField = unsafeOneofCase$1(init, member);
			if (!oneofField) continue;
			field = oneofField;
			value = unsafeGet$1(init, oneofField);
		} else field = member;
		switch (field.fieldKind) {
			case "message":
				value = toMessage$1(field, value);
				break;
			case "scalar":
				value = initScalar$1(field, value);
				break;
			case "list":
				value = initList$1(field, value);
				break;
			case "map":
				value = initMap$1(field, value);
				break;
		}
		unsafeSet$1(message, field, value);
	}
	return message;
}
function initScalar$1(field, value) {
	if (field.scalar == ScalarType$1.BYTES) return toU8Arr$1(value);
	return value;
}
function initMap$1(field, value) {
	if (isObject$1(value)) {
		if (field.scalar == ScalarType$1.BYTES) return convertObjectValues$1(value, toU8Arr$1);
		if (field.mapKind == "message") return convertObjectValues$1(value, (val) => toMessage$1(field, val));
	}
	return value;
}
function initList$1(field, value) {
	if (Array.isArray(value)) {
		if (field.scalar == ScalarType$1.BYTES) return value.map(toU8Arr$1);
		if (field.listKind == "message") return value.map((item) => toMessage$1(field, item));
	}
	return value;
}
function toMessage$1(field, value) {
	if (field.fieldKind == "message" && !field.oneof && isWrapperDesc$1(field.message)) return initScalar$1(field.message.fields[0], value);
	if (isObject$1(value)) {
		if (field.message.typeName == "google.protobuf.Struct" && field.parent.typeName !== "google.protobuf.Value") return value;
		if (!isMessage$1(value, field.message)) return create$1(field.message, value);
	}
	return value;
}
function toU8Arr$1(value) {
	return Array.isArray(value) ? new Uint8Array(value) : value;
}
function convertObjectValues$1(obj, fn) {
	const ret = {};
	for (const entry of Object.entries(obj)) ret[entry[0]] = fn(entry[1]);
	return ret;
}
var tokenZeroMessageField$1 = Symbol();
var messagePrototypes$1 = /* @__PURE__ */ new WeakMap();
/**
* Create a zero message.
*/
function createZeroMessage$1(desc) {
	let msg;
	if (!needsPrototypeChain$1(desc)) {
		msg = { $typeName: desc.typeName };
		for (const member of desc.members) if (member.kind == "oneof" || member.presence == IMPLICIT$3) msg[member.localName] = createZeroField$1(member);
	} else {
		const cached = messagePrototypes$1.get(desc);
		let prototype;
		let members;
		if (cached) ({prototype, members} = cached);
		else {
			prototype = {};
			members = /* @__PURE__ */ new Set();
			for (const member of desc.members) {
				if (member.kind == "oneof") continue;
				if (member.fieldKind != "scalar" && member.fieldKind != "enum") continue;
				if (member.presence == IMPLICIT$3) continue;
				members.add(member);
				prototype[member.localName] = createZeroField$1(member);
			}
			messagePrototypes$1.set(desc, {
				prototype,
				members
			});
		}
		msg = Object.create(prototype);
		msg.$typeName = desc.typeName;
		for (const member of desc.members) {
			if (members.has(member)) continue;
			if (member.kind == "field") {
				if (member.fieldKind == "message") continue;
				if (member.fieldKind == "scalar" || member.fieldKind == "enum") {
					if (member.presence != IMPLICIT$3) continue;
				}
			}
			msg[member.localName] = createZeroField$1(member);
		}
	}
	return msg;
}
/**
* Do we need the prototype chain to track field presence?
*/
function needsPrototypeChain$1(desc) {
	switch (desc.file.edition) {
		case EDITION_PROTO3$2: return false;
		case EDITION_PROTO2$2: return true;
		default: return desc.fields.some((f) => f.presence != IMPLICIT$3 && f.fieldKind != "message" && !f.oneof);
	}
}
/**
* Returns a zero value for oneof groups, and for every field kind except
* messages. Scalar and enum fields can have default values.
*/
function createZeroField$1(field) {
	if (field.kind == "oneof") return { case: void 0 };
	if (field.fieldKind == "list") return [];
	if (field.fieldKind == "map") return {};
	if (field.fieldKind == "message") return tokenZeroMessageField$1;
	const defaultValue = field.getDefaultValue();
	if (defaultValue !== void 0) return field.fieldKind == "scalar" && field.longAsString ? defaultValue.toString() : defaultValue;
	return field.fieldKind == "scalar" ? scalarZeroValue$1(field.scalar, field.longAsString) : field.enum.values[0].number;
}
//#endregion
//#region ../../packages/agent-provider/node_modules/@bufbuild/protobuf/dist/esm/reflect/reflect.js
/**
* Create a ReflectMessage.
*/
function reflect$1(messageDesc, message, check = true) {
	return new ReflectMessageImpl$1(messageDesc, message, check);
}
var ReflectMessageImpl$1 = class {
	get sortedFields() {
		var _a;
		return (_a = this._sortedFields) !== null && _a !== void 0 ? _a : this._sortedFields = this.desc.fields.concat().sort((a, b) => a.number - b.number);
	}
	constructor(messageDesc, message, check = true) {
		this.lists = /* @__PURE__ */ new Map();
		this.maps = /* @__PURE__ */ new Map();
		this.check = check;
		this.desc = messageDesc;
		this.message = this[unsafeLocal$1] = message !== null && message !== void 0 ? message : create$1(messageDesc);
		this.fields = messageDesc.fields;
		this.oneofs = messageDesc.oneofs;
		this.members = messageDesc.members;
	}
	findNumber(number) {
		if (!this._fieldsByNumber) this._fieldsByNumber = new Map(this.desc.fields.map((f) => [f.number, f]));
		return this._fieldsByNumber.get(number);
	}
	oneofCase(oneof) {
		assertOwn$1(this.message, oneof);
		return unsafeOneofCase$1(this.message, oneof);
	}
	isSet(field) {
		assertOwn$1(this.message, field);
		return unsafeIsSet$1(this.message, field);
	}
	clear(field) {
		assertOwn$1(this.message, field);
		unsafeClear$1(this.message, field);
	}
	get(field) {
		assertOwn$1(this.message, field);
		const value = unsafeGet$1(this.message, field);
		switch (field.fieldKind) {
			case "list":
				let list = this.lists.get(field);
				if (!list || list[unsafeLocal$1] !== value) this.lists.set(field, list = new ReflectListImpl$1(field, value, this.check));
				return list;
			case "map":
				let map = this.maps.get(field);
				if (!map || map[unsafeLocal$1] !== value) this.maps.set(field, map = new ReflectMapImpl$1(field, value, this.check));
				return map;
			case "message": return messageToReflect$1(field, value, this.check);
			case "scalar": return value === void 0 ? scalarZeroValue$1(field.scalar, false) : longToReflect$1(field, value);
			case "enum": return value !== null && value !== void 0 ? value : field.enum.values[0].number;
		}
	}
	set(field, value) {
		assertOwn$1(this.message, field);
		if (this.check) {
			const err = checkField$1(field, value);
			if (err) throw err;
		}
		let local;
		if (field.fieldKind == "message") local = messageToLocal$1(field, value);
		else if (isReflectMap$1(value) || isReflectList$1(value)) local = value[unsafeLocal$1];
		else local = longToLocal$1(field, value);
		unsafeSet$1(this.message, field, local);
	}
	getUnknown() {
		return this.message.$unknown;
	}
	setUnknown(value) {
		this.message.$unknown = value;
	}
};
function assertOwn$1(owner, member) {
	if (member.parent.typeName !== owner.$typeName) throw new FieldError$1(member, `cannot use ${member.toString()} with message ${owner.$typeName}`, "ForeignFieldError");
}
var ReflectListImpl$1 = class {
	field() {
		return this._field;
	}
	get size() {
		return this._arr.length;
	}
	constructor(field, unsafeInput, check) {
		this._field = field;
		this._arr = this[unsafeLocal$1] = unsafeInput;
		this.check = check;
	}
	get(index) {
		const item = this._arr[index];
		return item === void 0 ? void 0 : listItemToReflect$1(this._field, item, this.check);
	}
	set(index, item) {
		if (index < 0 || index >= this._arr.length) throw new FieldError$1(this._field, `list item #${index + 1}: out of range`);
		if (this.check) {
			const err = checkListItem$1(this._field, index, item);
			if (err) throw err;
		}
		this._arr[index] = listItemToLocal$1(this._field, item);
	}
	add(item) {
		if (this.check) {
			const err = checkListItem$1(this._field, this._arr.length, item);
			if (err) throw err;
		}
		this._arr.push(listItemToLocal$1(this._field, item));
	}
	clear() {
		this._arr.splice(0, this._arr.length);
	}
	[Symbol.iterator]() {
		return this.values();
	}
	keys() {
		return this._arr.keys();
	}
	*values() {
		for (const item of this._arr) yield listItemToReflect$1(this._field, item, this.check);
	}
	*entries() {
		for (let i = 0; i < this._arr.length; i++) yield [i, listItemToReflect$1(this._field, this._arr[i], this.check)];
	}
};
var ReflectMapImpl$1 = class {
	constructor(field, unsafeInput, check = true) {
		this.obj = this[unsafeLocal$1] = unsafeInput !== null && unsafeInput !== void 0 ? unsafeInput : {};
		this.check = check;
		this._field = field;
	}
	field() {
		return this._field;
	}
	set(key, value) {
		if (this.check) {
			const err = checkMapEntry$1(this._field, key, value);
			if (err) throw err;
		}
		this.obj[mapKeyToLocal$1(key)] = mapValueToLocal$1(this._field, value);
		return this;
	}
	delete(key) {
		const k = mapKeyToLocal$1(key);
		const has = Object.prototype.hasOwnProperty.call(this.obj, k);
		if (has) delete this.obj[k];
		return has;
	}
	clear() {
		for (const key of Object.keys(this.obj)) delete this.obj[key];
	}
	get(key) {
		let val = this.obj[mapKeyToLocal$1(key)];
		if (val !== void 0) val = mapValueToReflect$1(this._field, val, this.check);
		return val;
	}
	has(key) {
		return Object.prototype.hasOwnProperty.call(this.obj, mapKeyToLocal$1(key));
	}
	*keys() {
		for (const objKey of Object.keys(this.obj)) yield mapKeyToReflect$1(objKey, this._field.mapKey);
	}
	*entries() {
		for (const objEntry of Object.entries(this.obj)) yield [mapKeyToReflect$1(objEntry[0], this._field.mapKey), mapValueToReflect$1(this._field, objEntry[1], this.check)];
	}
	[Symbol.iterator]() {
		return this.entries();
	}
	get size() {
		return Object.keys(this.obj).length;
	}
	*values() {
		for (const val of Object.values(this.obj)) yield mapValueToReflect$1(this._field, val, this.check);
	}
	forEach(callbackfn, thisArg) {
		for (const mapEntry of this.entries()) callbackfn.call(thisArg, mapEntry[1], mapEntry[0], this);
	}
};
function messageToLocal$1(field, value) {
	if (!isReflectMessage$1(value)) return value;
	if (isWrapper$1(value.message) && !field.oneof && field.fieldKind == "message") return value.message.value;
	if (value.desc.typeName == "google.protobuf.Struct" && field.parent.typeName != "google.protobuf.Value") return wktStructToLocal$1(value.message);
	return value.message;
}
function messageToReflect$1(field, value, check) {
	if (value !== void 0) {
		if (isWrapperDesc$1(field.message) && !field.oneof && field.fieldKind == "message") value = {
			$typeName: field.message.typeName,
			value: longToReflect$1(field.message.fields[0], value)
		};
		else if (field.message.typeName == "google.protobuf.Struct" && field.parent.typeName != "google.protobuf.Value" && isObject$1(value)) value = wktStructToReflect$1(value);
	}
	return new ReflectMessageImpl$1(field.message, value, check);
}
function listItemToLocal$1(field, value) {
	if (field.listKind == "message") return messageToLocal$1(field, value);
	return longToLocal$1(field, value);
}
function listItemToReflect$1(field, value, check) {
	if (field.listKind == "message") return messageToReflect$1(field, value, check);
	return longToReflect$1(field, value);
}
function mapValueToLocal$1(field, value) {
	if (field.mapKind == "message") return messageToLocal$1(field, value);
	return longToLocal$1(field, value);
}
function mapValueToReflect$1(field, value, check) {
	if (field.mapKind == "message") return messageToReflect$1(field, value, check);
	return value;
}
function mapKeyToLocal$1(key) {
	return typeof key == "string" || typeof key == "number" ? key : String(key);
}
/**
* Converts a map key (any scalar value except float, double, or bytes) from its
* representation in a message (string or number, the only possible object key
* types) to the closest possible type in ECMAScript.
*/
function mapKeyToReflect$1(key, type) {
	switch (type) {
		case ScalarType$1.STRING: return key;
		case ScalarType$1.INT32:
		case ScalarType$1.FIXED32:
		case ScalarType$1.UINT32:
		case ScalarType$1.SFIXED32:
		case ScalarType$1.SINT32: {
			const n = Number.parseInt(key);
			if (Number.isFinite(n)) return n;
			break;
		}
		case ScalarType$1.BOOL:
			switch (key) {
				case "true": return true;
				case "false": return false;
			}
			break;
		case ScalarType$1.UINT64:
		case ScalarType$1.FIXED64:
			try {
				return protoInt64$1.uParse(key);
			} catch (_a) {}
			break;
		default:
			try {
				return protoInt64$1.parse(key);
			} catch (_b) {}
			break;
	}
	return key;
}
function longToReflect$1(field, value) {
	switch (field.scalar) {
		case ScalarType$1.INT64:
		case ScalarType$1.SFIXED64:
		case ScalarType$1.SINT64:
			if ("longAsString" in field && field.longAsString && typeof value == "string") value = protoInt64$1.parse(value);
			break;
		case ScalarType$1.FIXED64:
		case ScalarType$1.UINT64:
			if ("longAsString" in field && field.longAsString && typeof value == "string") value = protoInt64$1.uParse(value);
			break;
	}
	return value;
}
function longToLocal$1(field, value) {
	switch (field.scalar) {
		case ScalarType$1.INT64:
		case ScalarType$1.SFIXED64:
		case ScalarType$1.SINT64:
			if ("longAsString" in field && field.longAsString) value = String(value);
			else if (typeof value == "string" || typeof value == "number") value = protoInt64$1.parse(value);
			break;
		case ScalarType$1.FIXED64:
		case ScalarType$1.UINT64:
			if ("longAsString" in field && field.longAsString) value = String(value);
			else if (typeof value == "string" || typeof value == "number") value = protoInt64$1.uParse(value);
			break;
	}
	return value;
}
function wktStructToReflect$1(json) {
	const struct = {
		$typeName: "google.protobuf.Struct",
		fields: {}
	};
	if (isObject$1(json)) for (const [k, v] of Object.entries(json)) struct.fields[k] = wktValueToReflect$1(v);
	return struct;
}
function wktStructToLocal$1(val) {
	const json = {};
	for (const [k, v] of Object.entries(val.fields)) json[k] = wktValueToLocal$1(v);
	return json;
}
function wktValueToLocal$1(val) {
	switch (val.kind.case) {
		case "structValue": return wktStructToLocal$1(val.kind.value);
		case "listValue": return val.kind.value.values.map(wktValueToLocal$1);
		case "nullValue":
		case void 0: return null;
		default: return val.kind.value;
	}
}
function wktValueToReflect$1(json) {
	const value = {
		$typeName: "google.protobuf.Value",
		kind: { case: void 0 }
	};
	switch (typeof json) {
		case "number":
			value.kind = {
				case: "numberValue",
				value: json
			};
			break;
		case "string":
			value.kind = {
				case: "stringValue",
				value: json
			};
			break;
		case "boolean":
			value.kind = {
				case: "boolValue",
				value: json
			};
			break;
		case "object":
			if (json === null) value.kind = {
				case: "nullValue",
				value: 0
			};
			else if (Array.isArray(json)) {
				const listValue = {
					$typeName: "google.protobuf.ListValue",
					values: []
				};
				if (Array.isArray(json)) for (const e of json) listValue.values.push(wktValueToReflect$1(e));
				value.kind = {
					case: "listValue",
					value: listValue
				};
			} else value.kind = {
				case: "structValue",
				value: wktStructToReflect$1(json)
			};
			break;
	}
	return value;
}
//#endregion
//#region ../../packages/agent-provider/node_modules/@bufbuild/protobuf/dist/esm/codegenv2/message.js
/**
* Hydrate a message descriptor.
*
* @private
*/
function messageDesc$1(file, path, ...paths) {
	return paths.reduce((acc, cur) => acc.nestedMessages[cur], file.messages[path]);
}
/**
* Describes the message google.protobuf.FileDescriptorProto.
* Use `create(FileDescriptorProtoSchema)` to create a new message.
*/
var FileDescriptorProtoSchema$1 = /* @__PURE__ */ messageDesc$1(/* @__PURE__ */ boot$1({
	"name": "google/protobuf/descriptor.proto",
	"package": "google.protobuf",
	"messageType": [
		{
			"name": "FileDescriptorSet",
			"field": [{
				"name": "file",
				"number": 1,
				"type": 11,
				"label": 3,
				"typeName": ".google.protobuf.FileDescriptorProto"
			}],
			"extensionRange": [{
				"start": 536e6,
				"end": 536000001
			}]
		},
		{
			"name": "FileDescriptorProto",
			"field": [
				{
					"name": "name",
					"number": 1,
					"type": 9,
					"label": 1
				},
				{
					"name": "package",
					"number": 2,
					"type": 9,
					"label": 1
				},
				{
					"name": "dependency",
					"number": 3,
					"type": 9,
					"label": 3
				},
				{
					"name": "public_dependency",
					"number": 10,
					"type": 5,
					"label": 3
				},
				{
					"name": "weak_dependency",
					"number": 11,
					"type": 5,
					"label": 3
				},
				{
					"name": "option_dependency",
					"number": 15,
					"type": 9,
					"label": 3
				},
				{
					"name": "message_type",
					"number": 4,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.DescriptorProto"
				},
				{
					"name": "enum_type",
					"number": 5,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.EnumDescriptorProto"
				},
				{
					"name": "service",
					"number": 6,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.ServiceDescriptorProto"
				},
				{
					"name": "extension",
					"number": 7,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.FieldDescriptorProto"
				},
				{
					"name": "options",
					"number": 8,
					"type": 11,
					"label": 1,
					"typeName": ".google.protobuf.FileOptions"
				},
				{
					"name": "source_code_info",
					"number": 9,
					"type": 11,
					"label": 1,
					"typeName": ".google.protobuf.SourceCodeInfo"
				},
				{
					"name": "syntax",
					"number": 12,
					"type": 9,
					"label": 1
				},
				{
					"name": "edition",
					"number": 14,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.Edition"
				}
			]
		},
		{
			"name": "DescriptorProto",
			"field": [
				{
					"name": "name",
					"number": 1,
					"type": 9,
					"label": 1
				},
				{
					"name": "field",
					"number": 2,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.FieldDescriptorProto"
				},
				{
					"name": "extension",
					"number": 6,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.FieldDescriptorProto"
				},
				{
					"name": "nested_type",
					"number": 3,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.DescriptorProto"
				},
				{
					"name": "enum_type",
					"number": 4,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.EnumDescriptorProto"
				},
				{
					"name": "extension_range",
					"number": 5,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.DescriptorProto.ExtensionRange"
				},
				{
					"name": "oneof_decl",
					"number": 8,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.OneofDescriptorProto"
				},
				{
					"name": "options",
					"number": 7,
					"type": 11,
					"label": 1,
					"typeName": ".google.protobuf.MessageOptions"
				},
				{
					"name": "reserved_range",
					"number": 9,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.DescriptorProto.ReservedRange"
				},
				{
					"name": "reserved_name",
					"number": 10,
					"type": 9,
					"label": 3
				},
				{
					"name": "visibility",
					"number": 11,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.SymbolVisibility"
				}
			],
			"nestedType": [{
				"name": "ExtensionRange",
				"field": [
					{
						"name": "start",
						"number": 1,
						"type": 5,
						"label": 1
					},
					{
						"name": "end",
						"number": 2,
						"type": 5,
						"label": 1
					},
					{
						"name": "options",
						"number": 3,
						"type": 11,
						"label": 1,
						"typeName": ".google.protobuf.ExtensionRangeOptions"
					}
				]
			}, {
				"name": "ReservedRange",
				"field": [{
					"name": "start",
					"number": 1,
					"type": 5,
					"label": 1
				}, {
					"name": "end",
					"number": 2,
					"type": 5,
					"label": 1
				}]
			}]
		},
		{
			"name": "ExtensionRangeOptions",
			"field": [
				{
					"name": "uninterpreted_option",
					"number": 999,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.UninterpretedOption"
				},
				{
					"name": "declaration",
					"number": 2,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.ExtensionRangeOptions.Declaration",
					"options": { "retention": 2 }
				},
				{
					"name": "features",
					"number": 50,
					"type": 11,
					"label": 1,
					"typeName": ".google.protobuf.FeatureSet"
				},
				{
					"name": "verification",
					"number": 3,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.ExtensionRangeOptions.VerificationState",
					"defaultValue": "UNVERIFIED",
					"options": { "retention": 2 }
				}
			],
			"nestedType": [{
				"name": "Declaration",
				"field": [
					{
						"name": "number",
						"number": 1,
						"type": 5,
						"label": 1
					},
					{
						"name": "full_name",
						"number": 2,
						"type": 9,
						"label": 1
					},
					{
						"name": "type",
						"number": 3,
						"type": 9,
						"label": 1
					},
					{
						"name": "reserved",
						"number": 5,
						"type": 8,
						"label": 1
					},
					{
						"name": "repeated",
						"number": 6,
						"type": 8,
						"label": 1
					}
				]
			}],
			"enumType": [{
				"name": "VerificationState",
				"value": [{
					"name": "DECLARATION",
					"number": 0
				}, {
					"name": "UNVERIFIED",
					"number": 1
				}]
			}],
			"extensionRange": [{
				"start": 1e3,
				"end": 536870912
			}]
		},
		{
			"name": "FieldDescriptorProto",
			"field": [
				{
					"name": "name",
					"number": 1,
					"type": 9,
					"label": 1
				},
				{
					"name": "number",
					"number": 3,
					"type": 5,
					"label": 1
				},
				{
					"name": "label",
					"number": 4,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.FieldDescriptorProto.Label"
				},
				{
					"name": "type",
					"number": 5,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.FieldDescriptorProto.Type"
				},
				{
					"name": "type_name",
					"number": 6,
					"type": 9,
					"label": 1
				},
				{
					"name": "extendee",
					"number": 2,
					"type": 9,
					"label": 1
				},
				{
					"name": "default_value",
					"number": 7,
					"type": 9,
					"label": 1
				},
				{
					"name": "oneof_index",
					"number": 9,
					"type": 5,
					"label": 1
				},
				{
					"name": "json_name",
					"number": 10,
					"type": 9,
					"label": 1
				},
				{
					"name": "options",
					"number": 8,
					"type": 11,
					"label": 1,
					"typeName": ".google.protobuf.FieldOptions"
				},
				{
					"name": "proto3_optional",
					"number": 17,
					"type": 8,
					"label": 1
				}
			],
			"enumType": [{
				"name": "Type",
				"value": [
					{
						"name": "TYPE_DOUBLE",
						"number": 1
					},
					{
						"name": "TYPE_FLOAT",
						"number": 2
					},
					{
						"name": "TYPE_INT64",
						"number": 3
					},
					{
						"name": "TYPE_UINT64",
						"number": 4
					},
					{
						"name": "TYPE_INT32",
						"number": 5
					},
					{
						"name": "TYPE_FIXED64",
						"number": 6
					},
					{
						"name": "TYPE_FIXED32",
						"number": 7
					},
					{
						"name": "TYPE_BOOL",
						"number": 8
					},
					{
						"name": "TYPE_STRING",
						"number": 9
					},
					{
						"name": "TYPE_GROUP",
						"number": 10
					},
					{
						"name": "TYPE_MESSAGE",
						"number": 11
					},
					{
						"name": "TYPE_BYTES",
						"number": 12
					},
					{
						"name": "TYPE_UINT32",
						"number": 13
					},
					{
						"name": "TYPE_ENUM",
						"number": 14
					},
					{
						"name": "TYPE_SFIXED32",
						"number": 15
					},
					{
						"name": "TYPE_SFIXED64",
						"number": 16
					},
					{
						"name": "TYPE_SINT32",
						"number": 17
					},
					{
						"name": "TYPE_SINT64",
						"number": 18
					}
				]
			}, {
				"name": "Label",
				"value": [
					{
						"name": "LABEL_OPTIONAL",
						"number": 1
					},
					{
						"name": "LABEL_REPEATED",
						"number": 3
					},
					{
						"name": "LABEL_REQUIRED",
						"number": 2
					}
				]
			}]
		},
		{
			"name": "OneofDescriptorProto",
			"field": [{
				"name": "name",
				"number": 1,
				"type": 9,
				"label": 1
			}, {
				"name": "options",
				"number": 2,
				"type": 11,
				"label": 1,
				"typeName": ".google.protobuf.OneofOptions"
			}]
		},
		{
			"name": "EnumDescriptorProto",
			"field": [
				{
					"name": "name",
					"number": 1,
					"type": 9,
					"label": 1
				},
				{
					"name": "value",
					"number": 2,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.EnumValueDescriptorProto"
				},
				{
					"name": "options",
					"number": 3,
					"type": 11,
					"label": 1,
					"typeName": ".google.protobuf.EnumOptions"
				},
				{
					"name": "reserved_range",
					"number": 4,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.EnumDescriptorProto.EnumReservedRange"
				},
				{
					"name": "reserved_name",
					"number": 5,
					"type": 9,
					"label": 3
				},
				{
					"name": "visibility",
					"number": 6,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.SymbolVisibility"
				}
			],
			"nestedType": [{
				"name": "EnumReservedRange",
				"field": [{
					"name": "start",
					"number": 1,
					"type": 5,
					"label": 1
				}, {
					"name": "end",
					"number": 2,
					"type": 5,
					"label": 1
				}]
			}]
		},
		{
			"name": "EnumValueDescriptorProto",
			"field": [
				{
					"name": "name",
					"number": 1,
					"type": 9,
					"label": 1
				},
				{
					"name": "number",
					"number": 2,
					"type": 5,
					"label": 1
				},
				{
					"name": "options",
					"number": 3,
					"type": 11,
					"label": 1,
					"typeName": ".google.protobuf.EnumValueOptions"
				}
			]
		},
		{
			"name": "ServiceDescriptorProto",
			"field": [
				{
					"name": "name",
					"number": 1,
					"type": 9,
					"label": 1
				},
				{
					"name": "method",
					"number": 2,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.MethodDescriptorProto"
				},
				{
					"name": "options",
					"number": 3,
					"type": 11,
					"label": 1,
					"typeName": ".google.protobuf.ServiceOptions"
				}
			]
		},
		{
			"name": "MethodDescriptorProto",
			"field": [
				{
					"name": "name",
					"number": 1,
					"type": 9,
					"label": 1
				},
				{
					"name": "input_type",
					"number": 2,
					"type": 9,
					"label": 1
				},
				{
					"name": "output_type",
					"number": 3,
					"type": 9,
					"label": 1
				},
				{
					"name": "options",
					"number": 4,
					"type": 11,
					"label": 1,
					"typeName": ".google.protobuf.MethodOptions"
				},
				{
					"name": "client_streaming",
					"number": 5,
					"type": 8,
					"label": 1,
					"defaultValue": "false"
				},
				{
					"name": "server_streaming",
					"number": 6,
					"type": 8,
					"label": 1,
					"defaultValue": "false"
				}
			]
		},
		{
			"name": "FileOptions",
			"field": [
				{
					"name": "java_package",
					"number": 1,
					"type": 9,
					"label": 1
				},
				{
					"name": "java_outer_classname",
					"number": 8,
					"type": 9,
					"label": 1
				},
				{
					"name": "java_multiple_files",
					"number": 10,
					"type": 8,
					"label": 1,
					"defaultValue": "false"
				},
				{
					"name": "java_generate_equals_and_hash",
					"number": 20,
					"type": 8,
					"label": 1,
					"options": { "deprecated": true }
				},
				{
					"name": "java_string_check_utf8",
					"number": 27,
					"type": 8,
					"label": 1,
					"defaultValue": "false"
				},
				{
					"name": "optimize_for",
					"number": 9,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.FileOptions.OptimizeMode",
					"defaultValue": "SPEED"
				},
				{
					"name": "go_package",
					"number": 11,
					"type": 9,
					"label": 1
				},
				{
					"name": "cc_generic_services",
					"number": 16,
					"type": 8,
					"label": 1,
					"defaultValue": "false"
				},
				{
					"name": "java_generic_services",
					"number": 17,
					"type": 8,
					"label": 1,
					"defaultValue": "false"
				},
				{
					"name": "py_generic_services",
					"number": 18,
					"type": 8,
					"label": 1,
					"defaultValue": "false"
				},
				{
					"name": "deprecated",
					"number": 23,
					"type": 8,
					"label": 1,
					"defaultValue": "false"
				},
				{
					"name": "cc_enable_arenas",
					"number": 31,
					"type": 8,
					"label": 1,
					"defaultValue": "true"
				},
				{
					"name": "objc_class_prefix",
					"number": 36,
					"type": 9,
					"label": 1
				},
				{
					"name": "csharp_namespace",
					"number": 37,
					"type": 9,
					"label": 1
				},
				{
					"name": "swift_prefix",
					"number": 39,
					"type": 9,
					"label": 1
				},
				{
					"name": "php_class_prefix",
					"number": 40,
					"type": 9,
					"label": 1
				},
				{
					"name": "php_namespace",
					"number": 41,
					"type": 9,
					"label": 1
				},
				{
					"name": "php_metadata_namespace",
					"number": 44,
					"type": 9,
					"label": 1
				},
				{
					"name": "ruby_package",
					"number": 45,
					"type": 9,
					"label": 1
				},
				{
					"name": "features",
					"number": 50,
					"type": 11,
					"label": 1,
					"typeName": ".google.protobuf.FeatureSet"
				},
				{
					"name": "uninterpreted_option",
					"number": 999,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.UninterpretedOption"
				}
			],
			"enumType": [{
				"name": "OptimizeMode",
				"value": [
					{
						"name": "SPEED",
						"number": 1
					},
					{
						"name": "CODE_SIZE",
						"number": 2
					},
					{
						"name": "LITE_RUNTIME",
						"number": 3
					}
				]
			}],
			"extensionRange": [{
				"start": 1e3,
				"end": 536870912
			}]
		},
		{
			"name": "MessageOptions",
			"field": [
				{
					"name": "message_set_wire_format",
					"number": 1,
					"type": 8,
					"label": 1,
					"defaultValue": "false"
				},
				{
					"name": "no_standard_descriptor_accessor",
					"number": 2,
					"type": 8,
					"label": 1,
					"defaultValue": "false"
				},
				{
					"name": "deprecated",
					"number": 3,
					"type": 8,
					"label": 1,
					"defaultValue": "false"
				},
				{
					"name": "map_entry",
					"number": 7,
					"type": 8,
					"label": 1
				},
				{
					"name": "deprecated_legacy_json_field_conflicts",
					"number": 11,
					"type": 8,
					"label": 1,
					"options": { "deprecated": true }
				},
				{
					"name": "features",
					"number": 12,
					"type": 11,
					"label": 1,
					"typeName": ".google.protobuf.FeatureSet"
				},
				{
					"name": "uninterpreted_option",
					"number": 999,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.UninterpretedOption"
				}
			],
			"extensionRange": [{
				"start": 1e3,
				"end": 536870912
			}]
		},
		{
			"name": "FieldOptions",
			"field": [
				{
					"name": "ctype",
					"number": 1,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.FieldOptions.CType",
					"defaultValue": "STRING"
				},
				{
					"name": "packed",
					"number": 2,
					"type": 8,
					"label": 1
				},
				{
					"name": "jstype",
					"number": 6,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.FieldOptions.JSType",
					"defaultValue": "JS_NORMAL"
				},
				{
					"name": "lazy",
					"number": 5,
					"type": 8,
					"label": 1,
					"defaultValue": "false"
				},
				{
					"name": "unverified_lazy",
					"number": 15,
					"type": 8,
					"label": 1,
					"defaultValue": "false"
				},
				{
					"name": "deprecated",
					"number": 3,
					"type": 8,
					"label": 1,
					"defaultValue": "false"
				},
				{
					"name": "weak",
					"number": 10,
					"type": 8,
					"label": 1,
					"defaultValue": "false",
					"options": { "deprecated": true }
				},
				{
					"name": "debug_redact",
					"number": 16,
					"type": 8,
					"label": 1,
					"defaultValue": "false"
				},
				{
					"name": "retention",
					"number": 17,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.FieldOptions.OptionRetention"
				},
				{
					"name": "targets",
					"number": 19,
					"type": 14,
					"label": 3,
					"typeName": ".google.protobuf.FieldOptions.OptionTargetType"
				},
				{
					"name": "edition_defaults",
					"number": 20,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.FieldOptions.EditionDefault"
				},
				{
					"name": "features",
					"number": 21,
					"type": 11,
					"label": 1,
					"typeName": ".google.protobuf.FeatureSet"
				},
				{
					"name": "feature_support",
					"number": 22,
					"type": 11,
					"label": 1,
					"typeName": ".google.protobuf.FieldOptions.FeatureSupport"
				},
				{
					"name": "uninterpreted_option",
					"number": 999,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.UninterpretedOption"
				}
			],
			"nestedType": [{
				"name": "EditionDefault",
				"field": [{
					"name": "edition",
					"number": 3,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.Edition"
				}, {
					"name": "value",
					"number": 2,
					"type": 9,
					"label": 1
				}]
			}, {
				"name": "FeatureSupport",
				"field": [
					{
						"name": "edition_introduced",
						"number": 1,
						"type": 14,
						"label": 1,
						"typeName": ".google.protobuf.Edition"
					},
					{
						"name": "edition_deprecated",
						"number": 2,
						"type": 14,
						"label": 1,
						"typeName": ".google.protobuf.Edition"
					},
					{
						"name": "deprecation_warning",
						"number": 3,
						"type": 9,
						"label": 1
					},
					{
						"name": "edition_removed",
						"number": 4,
						"type": 14,
						"label": 1,
						"typeName": ".google.protobuf.Edition"
					}
				]
			}],
			"enumType": [
				{
					"name": "CType",
					"value": [
						{
							"name": "STRING",
							"number": 0
						},
						{
							"name": "CORD",
							"number": 1
						},
						{
							"name": "STRING_PIECE",
							"number": 2
						}
					]
				},
				{
					"name": "JSType",
					"value": [
						{
							"name": "JS_NORMAL",
							"number": 0
						},
						{
							"name": "JS_STRING",
							"number": 1
						},
						{
							"name": "JS_NUMBER",
							"number": 2
						}
					]
				},
				{
					"name": "OptionRetention",
					"value": [
						{
							"name": "RETENTION_UNKNOWN",
							"number": 0
						},
						{
							"name": "RETENTION_RUNTIME",
							"number": 1
						},
						{
							"name": "RETENTION_SOURCE",
							"number": 2
						}
					]
				},
				{
					"name": "OptionTargetType",
					"value": [
						{
							"name": "TARGET_TYPE_UNKNOWN",
							"number": 0
						},
						{
							"name": "TARGET_TYPE_FILE",
							"number": 1
						},
						{
							"name": "TARGET_TYPE_EXTENSION_RANGE",
							"number": 2
						},
						{
							"name": "TARGET_TYPE_MESSAGE",
							"number": 3
						},
						{
							"name": "TARGET_TYPE_FIELD",
							"number": 4
						},
						{
							"name": "TARGET_TYPE_ONEOF",
							"number": 5
						},
						{
							"name": "TARGET_TYPE_ENUM",
							"number": 6
						},
						{
							"name": "TARGET_TYPE_ENUM_ENTRY",
							"number": 7
						},
						{
							"name": "TARGET_TYPE_SERVICE",
							"number": 8
						},
						{
							"name": "TARGET_TYPE_METHOD",
							"number": 9
						}
					]
				}
			],
			"extensionRange": [{
				"start": 1e3,
				"end": 536870912
			}]
		},
		{
			"name": "OneofOptions",
			"field": [{
				"name": "features",
				"number": 1,
				"type": 11,
				"label": 1,
				"typeName": ".google.protobuf.FeatureSet"
			}, {
				"name": "uninterpreted_option",
				"number": 999,
				"type": 11,
				"label": 3,
				"typeName": ".google.protobuf.UninterpretedOption"
			}],
			"extensionRange": [{
				"start": 1e3,
				"end": 536870912
			}]
		},
		{
			"name": "EnumOptions",
			"field": [
				{
					"name": "allow_alias",
					"number": 2,
					"type": 8,
					"label": 1
				},
				{
					"name": "deprecated",
					"number": 3,
					"type": 8,
					"label": 1,
					"defaultValue": "false"
				},
				{
					"name": "deprecated_legacy_json_field_conflicts",
					"number": 6,
					"type": 8,
					"label": 1,
					"options": { "deprecated": true }
				},
				{
					"name": "features",
					"number": 7,
					"type": 11,
					"label": 1,
					"typeName": ".google.protobuf.FeatureSet"
				},
				{
					"name": "uninterpreted_option",
					"number": 999,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.UninterpretedOption"
				}
			],
			"extensionRange": [{
				"start": 1e3,
				"end": 536870912
			}]
		},
		{
			"name": "EnumValueOptions",
			"field": [
				{
					"name": "deprecated",
					"number": 1,
					"type": 8,
					"label": 1,
					"defaultValue": "false"
				},
				{
					"name": "features",
					"number": 2,
					"type": 11,
					"label": 1,
					"typeName": ".google.protobuf.FeatureSet"
				},
				{
					"name": "debug_redact",
					"number": 3,
					"type": 8,
					"label": 1,
					"defaultValue": "false"
				},
				{
					"name": "feature_support",
					"number": 4,
					"type": 11,
					"label": 1,
					"typeName": ".google.protobuf.FieldOptions.FeatureSupport"
				},
				{
					"name": "uninterpreted_option",
					"number": 999,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.UninterpretedOption"
				}
			],
			"extensionRange": [{
				"start": 1e3,
				"end": 536870912
			}]
		},
		{
			"name": "ServiceOptions",
			"field": [
				{
					"name": "features",
					"number": 34,
					"type": 11,
					"label": 1,
					"typeName": ".google.protobuf.FeatureSet"
				},
				{
					"name": "deprecated",
					"number": 33,
					"type": 8,
					"label": 1,
					"defaultValue": "false"
				},
				{
					"name": "uninterpreted_option",
					"number": 999,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.UninterpretedOption"
				}
			],
			"extensionRange": [{
				"start": 1e3,
				"end": 536870912
			}]
		},
		{
			"name": "MethodOptions",
			"field": [
				{
					"name": "deprecated",
					"number": 33,
					"type": 8,
					"label": 1,
					"defaultValue": "false"
				},
				{
					"name": "idempotency_level",
					"number": 34,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.MethodOptions.IdempotencyLevel",
					"defaultValue": "IDEMPOTENCY_UNKNOWN"
				},
				{
					"name": "features",
					"number": 35,
					"type": 11,
					"label": 1,
					"typeName": ".google.protobuf.FeatureSet"
				},
				{
					"name": "uninterpreted_option",
					"number": 999,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.UninterpretedOption"
				}
			],
			"enumType": [{
				"name": "IdempotencyLevel",
				"value": [
					{
						"name": "IDEMPOTENCY_UNKNOWN",
						"number": 0
					},
					{
						"name": "NO_SIDE_EFFECTS",
						"number": 1
					},
					{
						"name": "IDEMPOTENT",
						"number": 2
					}
				]
			}],
			"extensionRange": [{
				"start": 1e3,
				"end": 536870912
			}]
		},
		{
			"name": "UninterpretedOption",
			"field": [
				{
					"name": "name",
					"number": 2,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.UninterpretedOption.NamePart"
				},
				{
					"name": "identifier_value",
					"number": 3,
					"type": 9,
					"label": 1
				},
				{
					"name": "positive_int_value",
					"number": 4,
					"type": 4,
					"label": 1
				},
				{
					"name": "negative_int_value",
					"number": 5,
					"type": 3,
					"label": 1
				},
				{
					"name": "double_value",
					"number": 6,
					"type": 1,
					"label": 1
				},
				{
					"name": "string_value",
					"number": 7,
					"type": 12,
					"label": 1
				},
				{
					"name": "aggregate_value",
					"number": 8,
					"type": 9,
					"label": 1
				}
			],
			"nestedType": [{
				"name": "NamePart",
				"field": [{
					"name": "name_part",
					"number": 1,
					"type": 9,
					"label": 2
				}, {
					"name": "is_extension",
					"number": 2,
					"type": 8,
					"label": 2
				}]
			}]
		},
		{
			"name": "FeatureSet",
			"field": [
				{
					"name": "field_presence",
					"number": 1,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.FeatureSet.FieldPresence",
					"options": {
						"retention": 1,
						"targets": [4, 1],
						"editionDefaults": [
							{
								"value": "EXPLICIT",
								"edition": 900
							},
							{
								"value": "IMPLICIT",
								"edition": 999
							},
							{
								"value": "EXPLICIT",
								"edition": 1e3
							}
						]
					}
				},
				{
					"name": "enum_type",
					"number": 2,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.FeatureSet.EnumType",
					"options": {
						"retention": 1,
						"targets": [6, 1],
						"editionDefaults": [{
							"value": "CLOSED",
							"edition": 900
						}, {
							"value": "OPEN",
							"edition": 999
						}]
					}
				},
				{
					"name": "repeated_field_encoding",
					"number": 3,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.FeatureSet.RepeatedFieldEncoding",
					"options": {
						"retention": 1,
						"targets": [4, 1],
						"editionDefaults": [{
							"value": "EXPANDED",
							"edition": 900
						}, {
							"value": "PACKED",
							"edition": 999
						}]
					}
				},
				{
					"name": "utf8_validation",
					"number": 4,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.FeatureSet.Utf8Validation",
					"options": {
						"retention": 1,
						"targets": [4, 1],
						"editionDefaults": [{
							"value": "NONE",
							"edition": 900
						}, {
							"value": "VERIFY",
							"edition": 999
						}]
					}
				},
				{
					"name": "message_encoding",
					"number": 5,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.FeatureSet.MessageEncoding",
					"options": {
						"retention": 1,
						"targets": [4, 1],
						"editionDefaults": [{
							"value": "LENGTH_PREFIXED",
							"edition": 900
						}]
					}
				},
				{
					"name": "json_format",
					"number": 6,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.FeatureSet.JsonFormat",
					"options": {
						"retention": 1,
						"targets": [
							3,
							6,
							1
						],
						"editionDefaults": [{
							"value": "LEGACY_BEST_EFFORT",
							"edition": 900
						}, {
							"value": "ALLOW",
							"edition": 999
						}]
					}
				},
				{
					"name": "enforce_naming_style",
					"number": 7,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.FeatureSet.EnforceNamingStyle",
					"options": {
						"retention": 2,
						"targets": [
							1,
							2,
							3,
							4,
							5,
							6,
							7,
							8,
							9
						],
						"editionDefaults": [{
							"value": "STYLE_LEGACY",
							"edition": 900
						}, {
							"value": "STYLE2024",
							"edition": 1001
						}]
					}
				},
				{
					"name": "default_symbol_visibility",
					"number": 8,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.FeatureSet.VisibilityFeature.DefaultSymbolVisibility",
					"options": {
						"retention": 2,
						"targets": [1],
						"editionDefaults": [{
							"value": "EXPORT_ALL",
							"edition": 900
						}, {
							"value": "EXPORT_TOP_LEVEL",
							"edition": 1001
						}]
					}
				}
			],
			"nestedType": [{
				"name": "VisibilityFeature",
				"enumType": [{
					"name": "DefaultSymbolVisibility",
					"value": [
						{
							"name": "DEFAULT_SYMBOL_VISIBILITY_UNKNOWN",
							"number": 0
						},
						{
							"name": "EXPORT_ALL",
							"number": 1
						},
						{
							"name": "EXPORT_TOP_LEVEL",
							"number": 2
						},
						{
							"name": "LOCAL_ALL",
							"number": 3
						},
						{
							"name": "STRICT",
							"number": 4
						}
					]
				}]
			}],
			"enumType": [
				{
					"name": "FieldPresence",
					"value": [
						{
							"name": "FIELD_PRESENCE_UNKNOWN",
							"number": 0
						},
						{
							"name": "EXPLICIT",
							"number": 1
						},
						{
							"name": "IMPLICIT",
							"number": 2
						},
						{
							"name": "LEGACY_REQUIRED",
							"number": 3
						}
					]
				},
				{
					"name": "EnumType",
					"value": [
						{
							"name": "ENUM_TYPE_UNKNOWN",
							"number": 0
						},
						{
							"name": "OPEN",
							"number": 1
						},
						{
							"name": "CLOSED",
							"number": 2
						}
					]
				},
				{
					"name": "RepeatedFieldEncoding",
					"value": [
						{
							"name": "REPEATED_FIELD_ENCODING_UNKNOWN",
							"number": 0
						},
						{
							"name": "PACKED",
							"number": 1
						},
						{
							"name": "EXPANDED",
							"number": 2
						}
					]
				},
				{
					"name": "Utf8Validation",
					"value": [
						{
							"name": "UTF8_VALIDATION_UNKNOWN",
							"number": 0
						},
						{
							"name": "VERIFY",
							"number": 2
						},
						{
							"name": "NONE",
							"number": 3
						}
					]
				},
				{
					"name": "MessageEncoding",
					"value": [
						{
							"name": "MESSAGE_ENCODING_UNKNOWN",
							"number": 0
						},
						{
							"name": "LENGTH_PREFIXED",
							"number": 1
						},
						{
							"name": "DELIMITED",
							"number": 2
						}
					]
				},
				{
					"name": "JsonFormat",
					"value": [
						{
							"name": "JSON_FORMAT_UNKNOWN",
							"number": 0
						},
						{
							"name": "ALLOW",
							"number": 1
						},
						{
							"name": "LEGACY_BEST_EFFORT",
							"number": 2
						}
					]
				},
				{
					"name": "EnforceNamingStyle",
					"value": [
						{
							"name": "ENFORCE_NAMING_STYLE_UNKNOWN",
							"number": 0
						},
						{
							"name": "STYLE2024",
							"number": 1
						},
						{
							"name": "STYLE_LEGACY",
							"number": 2
						}
					]
				}
			],
			"extensionRange": [
				{
					"start": 1e3,
					"end": 9995
				},
				{
					"start": 9995,
					"end": 1e4
				},
				{
					"start": 1e4,
					"end": 10001
				}
			]
		},
		{
			"name": "FeatureSetDefaults",
			"field": [
				{
					"name": "defaults",
					"number": 1,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.FeatureSetDefaults.FeatureSetEditionDefault"
				},
				{
					"name": "minimum_edition",
					"number": 4,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.Edition"
				},
				{
					"name": "maximum_edition",
					"number": 5,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.Edition"
				}
			],
			"nestedType": [{
				"name": "FeatureSetEditionDefault",
				"field": [
					{
						"name": "edition",
						"number": 3,
						"type": 14,
						"label": 1,
						"typeName": ".google.protobuf.Edition"
					},
					{
						"name": "overridable_features",
						"number": 4,
						"type": 11,
						"label": 1,
						"typeName": ".google.protobuf.FeatureSet"
					},
					{
						"name": "fixed_features",
						"number": 5,
						"type": 11,
						"label": 1,
						"typeName": ".google.protobuf.FeatureSet"
					}
				]
			}]
		},
		{
			"name": "SourceCodeInfo",
			"field": [{
				"name": "location",
				"number": 1,
				"type": 11,
				"label": 3,
				"typeName": ".google.protobuf.SourceCodeInfo.Location"
			}],
			"nestedType": [{
				"name": "Location",
				"field": [
					{
						"name": "path",
						"number": 1,
						"type": 5,
						"label": 3,
						"options": { "packed": true }
					},
					{
						"name": "span",
						"number": 2,
						"type": 5,
						"label": 3,
						"options": { "packed": true }
					},
					{
						"name": "leading_comments",
						"number": 3,
						"type": 9,
						"label": 1
					},
					{
						"name": "trailing_comments",
						"number": 4,
						"type": 9,
						"label": 1
					},
					{
						"name": "leading_detached_comments",
						"number": 6,
						"type": 9,
						"label": 3
					}
				]
			}],
			"extensionRange": [{
				"start": 536e6,
				"end": 536000001
			}]
		},
		{
			"name": "GeneratedCodeInfo",
			"field": [{
				"name": "annotation",
				"number": 1,
				"type": 11,
				"label": 3,
				"typeName": ".google.protobuf.GeneratedCodeInfo.Annotation"
			}],
			"nestedType": [{
				"name": "Annotation",
				"field": [
					{
						"name": "path",
						"number": 1,
						"type": 5,
						"label": 3,
						"options": { "packed": true }
					},
					{
						"name": "source_file",
						"number": 2,
						"type": 9,
						"label": 1
					},
					{
						"name": "begin",
						"number": 3,
						"type": 5,
						"label": 1
					},
					{
						"name": "end",
						"number": 4,
						"type": 5,
						"label": 1
					},
					{
						"name": "semantic",
						"number": 5,
						"type": 14,
						"label": 1,
						"typeName": ".google.protobuf.GeneratedCodeInfo.Annotation.Semantic"
					}
				],
				"enumType": [{
					"name": "Semantic",
					"value": [
						{
							"name": "NONE",
							"number": 0
						},
						{
							"name": "SET",
							"number": 1
						},
						{
							"name": "ALIAS",
							"number": 2
						}
					]
				}]
			}]
		}
	],
	"enumType": [{
		"name": "Edition",
		"value": [
			{
				"name": "EDITION_UNKNOWN",
				"number": 0
			},
			{
				"name": "EDITION_LEGACY",
				"number": 900
			},
			{
				"name": "EDITION_PROTO2",
				"number": 998
			},
			{
				"name": "EDITION_PROTO3",
				"number": 999
			},
			{
				"name": "EDITION_2023",
				"number": 1e3
			},
			{
				"name": "EDITION_2024",
				"number": 1001
			},
			{
				"name": "EDITION_1_TEST_ONLY",
				"number": 1
			},
			{
				"name": "EDITION_2_TEST_ONLY",
				"number": 2
			},
			{
				"name": "EDITION_99997_TEST_ONLY",
				"number": 99997
			},
			{
				"name": "EDITION_99998_TEST_ONLY",
				"number": 99998
			},
			{
				"name": "EDITION_99999_TEST_ONLY",
				"number": 99999
			},
			{
				"name": "EDITION_MAX",
				"number": 2147483647
			}
		]
	}, {
		"name": "SymbolVisibility",
		"value": [
			{
				"name": "VISIBILITY_UNSET",
				"number": 0
			},
			{
				"name": "VISIBILITY_LOCAL",
				"number": 1
			},
			{
				"name": "VISIBILITY_EXPORT",
				"number": 2
			}
		]
	}]
}), 1);
/**
* The verification state of the extension range.
*
* @generated from enum google.protobuf.ExtensionRangeOptions.VerificationState
*/
var ExtensionRangeOptions_VerificationState$1;
(function(ExtensionRangeOptions_VerificationState) {
	/**
	* All the extensions of the range must be declared.
	*
	* @generated from enum value: DECLARATION = 0;
	*/
	ExtensionRangeOptions_VerificationState[ExtensionRangeOptions_VerificationState["DECLARATION"] = 0] = "DECLARATION";
	/**
	* @generated from enum value: UNVERIFIED = 1;
	*/
	ExtensionRangeOptions_VerificationState[ExtensionRangeOptions_VerificationState["UNVERIFIED"] = 1] = "UNVERIFIED";
})(ExtensionRangeOptions_VerificationState$1 || (ExtensionRangeOptions_VerificationState$1 = {}));
/**
* @generated from enum google.protobuf.FieldDescriptorProto.Type
*/
var FieldDescriptorProto_Type$1;
(function(FieldDescriptorProto_Type) {
	/**
	* 0 is reserved for errors.
	* Order is weird for historical reasons.
	*
	* @generated from enum value: TYPE_DOUBLE = 1;
	*/
	FieldDescriptorProto_Type[FieldDescriptorProto_Type["DOUBLE"] = 1] = "DOUBLE";
	/**
	* @generated from enum value: TYPE_FLOAT = 2;
	*/
	FieldDescriptorProto_Type[FieldDescriptorProto_Type["FLOAT"] = 2] = "FLOAT";
	/**
	* Not ZigZag encoded.  Negative numbers take 10 bytes.  Use TYPE_SINT64 if
	* negative values are likely.
	*
	* @generated from enum value: TYPE_INT64 = 3;
	*/
	FieldDescriptorProto_Type[FieldDescriptorProto_Type["INT64"] = 3] = "INT64";
	/**
	* @generated from enum value: TYPE_UINT64 = 4;
	*/
	FieldDescriptorProto_Type[FieldDescriptorProto_Type["UINT64"] = 4] = "UINT64";
	/**
	* Not ZigZag encoded.  Negative numbers take 10 bytes.  Use TYPE_SINT32 if
	* negative values are likely.
	*
	* @generated from enum value: TYPE_INT32 = 5;
	*/
	FieldDescriptorProto_Type[FieldDescriptorProto_Type["INT32"] = 5] = "INT32";
	/**
	* @generated from enum value: TYPE_FIXED64 = 6;
	*/
	FieldDescriptorProto_Type[FieldDescriptorProto_Type["FIXED64"] = 6] = "FIXED64";
	/**
	* @generated from enum value: TYPE_FIXED32 = 7;
	*/
	FieldDescriptorProto_Type[FieldDescriptorProto_Type["FIXED32"] = 7] = "FIXED32";
	/**
	* @generated from enum value: TYPE_BOOL = 8;
	*/
	FieldDescriptorProto_Type[FieldDescriptorProto_Type["BOOL"] = 8] = "BOOL";
	/**
	* @generated from enum value: TYPE_STRING = 9;
	*/
	FieldDescriptorProto_Type[FieldDescriptorProto_Type["STRING"] = 9] = "STRING";
	/**
	* Tag-delimited aggregate.
	* Group type is deprecated and not supported after google.protobuf. However, Proto3
	* implementations should still be able to parse the group wire format and
	* treat group fields as unknown fields.  In Editions, the group wire format
	* can be enabled via the `message_encoding` feature.
	*
	* @generated from enum value: TYPE_GROUP = 10;
	*/
	FieldDescriptorProto_Type[FieldDescriptorProto_Type["GROUP"] = 10] = "GROUP";
	/**
	* Length-delimited aggregate.
	*
	* @generated from enum value: TYPE_MESSAGE = 11;
	*/
	FieldDescriptorProto_Type[FieldDescriptorProto_Type["MESSAGE"] = 11] = "MESSAGE";
	/**
	* New in version 2.
	*
	* @generated from enum value: TYPE_BYTES = 12;
	*/
	FieldDescriptorProto_Type[FieldDescriptorProto_Type["BYTES"] = 12] = "BYTES";
	/**
	* @generated from enum value: TYPE_UINT32 = 13;
	*/
	FieldDescriptorProto_Type[FieldDescriptorProto_Type["UINT32"] = 13] = "UINT32";
	/**
	* @generated from enum value: TYPE_ENUM = 14;
	*/
	FieldDescriptorProto_Type[FieldDescriptorProto_Type["ENUM"] = 14] = "ENUM";
	/**
	* @generated from enum value: TYPE_SFIXED32 = 15;
	*/
	FieldDescriptorProto_Type[FieldDescriptorProto_Type["SFIXED32"] = 15] = "SFIXED32";
	/**
	* @generated from enum value: TYPE_SFIXED64 = 16;
	*/
	FieldDescriptorProto_Type[FieldDescriptorProto_Type["SFIXED64"] = 16] = "SFIXED64";
	/**
	* Uses ZigZag encoding.
	*
	* @generated from enum value: TYPE_SINT32 = 17;
	*/
	FieldDescriptorProto_Type[FieldDescriptorProto_Type["SINT32"] = 17] = "SINT32";
	/**
	* Uses ZigZag encoding.
	*
	* @generated from enum value: TYPE_SINT64 = 18;
	*/
	FieldDescriptorProto_Type[FieldDescriptorProto_Type["SINT64"] = 18] = "SINT64";
})(FieldDescriptorProto_Type$1 || (FieldDescriptorProto_Type$1 = {}));
/**
* @generated from enum google.protobuf.FieldDescriptorProto.Label
*/
var FieldDescriptorProto_Label$1;
(function(FieldDescriptorProto_Label) {
	/**
	* 0 is reserved for errors
	*
	* @generated from enum value: LABEL_OPTIONAL = 1;
	*/
	FieldDescriptorProto_Label[FieldDescriptorProto_Label["OPTIONAL"] = 1] = "OPTIONAL";
	/**
	* @generated from enum value: LABEL_REPEATED = 3;
	*/
	FieldDescriptorProto_Label[FieldDescriptorProto_Label["REPEATED"] = 3] = "REPEATED";
	/**
	* The required label is only allowed in google.protobuf.  In proto3 and Editions
	* it's explicitly prohibited.  In Editions, the `field_presence` feature
	* can be used to get this behavior.
	*
	* @generated from enum value: LABEL_REQUIRED = 2;
	*/
	FieldDescriptorProto_Label[FieldDescriptorProto_Label["REQUIRED"] = 2] = "REQUIRED";
})(FieldDescriptorProto_Label$1 || (FieldDescriptorProto_Label$1 = {}));
/**
* Generated classes can be optimized for speed or code size.
*
* @generated from enum google.protobuf.FileOptions.OptimizeMode
*/
var FileOptions_OptimizeMode$1;
(function(FileOptions_OptimizeMode) {
	/**
	* Generate complete code for parsing, serialization,
	*
	* @generated from enum value: SPEED = 1;
	*/
	FileOptions_OptimizeMode[FileOptions_OptimizeMode["SPEED"] = 1] = "SPEED";
	/**
	* etc.
	*
	* Use ReflectionOps to implement these methods.
	*
	* @generated from enum value: CODE_SIZE = 2;
	*/
	FileOptions_OptimizeMode[FileOptions_OptimizeMode["CODE_SIZE"] = 2] = "CODE_SIZE";
	/**
	* Generate code using MessageLite and the lite runtime.
	*
	* @generated from enum value: LITE_RUNTIME = 3;
	*/
	FileOptions_OptimizeMode[FileOptions_OptimizeMode["LITE_RUNTIME"] = 3] = "LITE_RUNTIME";
})(FileOptions_OptimizeMode$1 || (FileOptions_OptimizeMode$1 = {}));
/**
* @generated from enum google.protobuf.FieldOptions.CType
*/
var FieldOptions_CType$1;
(function(FieldOptions_CType) {
	/**
	* Default mode.
	*
	* @generated from enum value: STRING = 0;
	*/
	FieldOptions_CType[FieldOptions_CType["STRING"] = 0] = "STRING";
	/**
	* The option [ctype=CORD] may be applied to a non-repeated field of type
	* "bytes". It indicates that in C++, the data should be stored in a Cord
	* instead of a string.  For very large strings, this may reduce memory
	* fragmentation. It may also allow better performance when parsing from a
	* Cord, or when parsing with aliasing enabled, as the parsed Cord may then
	* alias the original buffer.
	*
	* @generated from enum value: CORD = 1;
	*/
	FieldOptions_CType[FieldOptions_CType["CORD"] = 1] = "CORD";
	/**
	* @generated from enum value: STRING_PIECE = 2;
	*/
	FieldOptions_CType[FieldOptions_CType["STRING_PIECE"] = 2] = "STRING_PIECE";
})(FieldOptions_CType$1 || (FieldOptions_CType$1 = {}));
/**
* @generated from enum google.protobuf.FieldOptions.JSType
*/
var FieldOptions_JSType$1;
(function(FieldOptions_JSType) {
	/**
	* Use the default type.
	*
	* @generated from enum value: JS_NORMAL = 0;
	*/
	FieldOptions_JSType[FieldOptions_JSType["JS_NORMAL"] = 0] = "JS_NORMAL";
	/**
	* Use JavaScript strings.
	*
	* @generated from enum value: JS_STRING = 1;
	*/
	FieldOptions_JSType[FieldOptions_JSType["JS_STRING"] = 1] = "JS_STRING";
	/**
	* Use JavaScript numbers.
	*
	* @generated from enum value: JS_NUMBER = 2;
	*/
	FieldOptions_JSType[FieldOptions_JSType["JS_NUMBER"] = 2] = "JS_NUMBER";
})(FieldOptions_JSType$1 || (FieldOptions_JSType$1 = {}));
/**
* If set to RETENTION_SOURCE, the option will be omitted from the binary.
*
* @generated from enum google.protobuf.FieldOptions.OptionRetention
*/
var FieldOptions_OptionRetention$1;
(function(FieldOptions_OptionRetention) {
	/**
	* @generated from enum value: RETENTION_UNKNOWN = 0;
	*/
	FieldOptions_OptionRetention[FieldOptions_OptionRetention["RETENTION_UNKNOWN"] = 0] = "RETENTION_UNKNOWN";
	/**
	* @generated from enum value: RETENTION_RUNTIME = 1;
	*/
	FieldOptions_OptionRetention[FieldOptions_OptionRetention["RETENTION_RUNTIME"] = 1] = "RETENTION_RUNTIME";
	/**
	* @generated from enum value: RETENTION_SOURCE = 2;
	*/
	FieldOptions_OptionRetention[FieldOptions_OptionRetention["RETENTION_SOURCE"] = 2] = "RETENTION_SOURCE";
})(FieldOptions_OptionRetention$1 || (FieldOptions_OptionRetention$1 = {}));
/**
* This indicates the types of entities that the field may apply to when used
* as an option. If it is unset, then the field may be freely used as an
* option on any kind of entity.
*
* @generated from enum google.protobuf.FieldOptions.OptionTargetType
*/
var FieldOptions_OptionTargetType$1;
(function(FieldOptions_OptionTargetType) {
	/**
	* @generated from enum value: TARGET_TYPE_UNKNOWN = 0;
	*/
	FieldOptions_OptionTargetType[FieldOptions_OptionTargetType["TARGET_TYPE_UNKNOWN"] = 0] = "TARGET_TYPE_UNKNOWN";
	/**
	* @generated from enum value: TARGET_TYPE_FILE = 1;
	*/
	FieldOptions_OptionTargetType[FieldOptions_OptionTargetType["TARGET_TYPE_FILE"] = 1] = "TARGET_TYPE_FILE";
	/**
	* @generated from enum value: TARGET_TYPE_EXTENSION_RANGE = 2;
	*/
	FieldOptions_OptionTargetType[FieldOptions_OptionTargetType["TARGET_TYPE_EXTENSION_RANGE"] = 2] = "TARGET_TYPE_EXTENSION_RANGE";
	/**
	* @generated from enum value: TARGET_TYPE_MESSAGE = 3;
	*/
	FieldOptions_OptionTargetType[FieldOptions_OptionTargetType["TARGET_TYPE_MESSAGE"] = 3] = "TARGET_TYPE_MESSAGE";
	/**
	* @generated from enum value: TARGET_TYPE_FIELD = 4;
	*/
	FieldOptions_OptionTargetType[FieldOptions_OptionTargetType["TARGET_TYPE_FIELD"] = 4] = "TARGET_TYPE_FIELD";
	/**
	* @generated from enum value: TARGET_TYPE_ONEOF = 5;
	*/
	FieldOptions_OptionTargetType[FieldOptions_OptionTargetType["TARGET_TYPE_ONEOF"] = 5] = "TARGET_TYPE_ONEOF";
	/**
	* @generated from enum value: TARGET_TYPE_ENUM = 6;
	*/
	FieldOptions_OptionTargetType[FieldOptions_OptionTargetType["TARGET_TYPE_ENUM"] = 6] = "TARGET_TYPE_ENUM";
	/**
	* @generated from enum value: TARGET_TYPE_ENUM_ENTRY = 7;
	*/
	FieldOptions_OptionTargetType[FieldOptions_OptionTargetType["TARGET_TYPE_ENUM_ENTRY"] = 7] = "TARGET_TYPE_ENUM_ENTRY";
	/**
	* @generated from enum value: TARGET_TYPE_SERVICE = 8;
	*/
	FieldOptions_OptionTargetType[FieldOptions_OptionTargetType["TARGET_TYPE_SERVICE"] = 8] = "TARGET_TYPE_SERVICE";
	/**
	* @generated from enum value: TARGET_TYPE_METHOD = 9;
	*/
	FieldOptions_OptionTargetType[FieldOptions_OptionTargetType["TARGET_TYPE_METHOD"] = 9] = "TARGET_TYPE_METHOD";
})(FieldOptions_OptionTargetType$1 || (FieldOptions_OptionTargetType$1 = {}));
/**
* Is this method side-effect-free (or safe in HTTP parlance), or idempotent,
* or neither? HTTP based RPC implementation may choose GET verb for safe
* methods, and PUT verb for idempotent methods instead of the default POST.
*
* @generated from enum google.protobuf.MethodOptions.IdempotencyLevel
*/
var MethodOptions_IdempotencyLevel$1;
(function(MethodOptions_IdempotencyLevel) {
	/**
	* @generated from enum value: IDEMPOTENCY_UNKNOWN = 0;
	*/
	MethodOptions_IdempotencyLevel[MethodOptions_IdempotencyLevel["IDEMPOTENCY_UNKNOWN"] = 0] = "IDEMPOTENCY_UNKNOWN";
	/**
	* implies idempotent
	*
	* @generated from enum value: NO_SIDE_EFFECTS = 1;
	*/
	MethodOptions_IdempotencyLevel[MethodOptions_IdempotencyLevel["NO_SIDE_EFFECTS"] = 1] = "NO_SIDE_EFFECTS";
	/**
	* idempotent, but may have side effects
	*
	* @generated from enum value: IDEMPOTENT = 2;
	*/
	MethodOptions_IdempotencyLevel[MethodOptions_IdempotencyLevel["IDEMPOTENT"] = 2] = "IDEMPOTENT";
})(MethodOptions_IdempotencyLevel$1 || (MethodOptions_IdempotencyLevel$1 = {}));
/**
* @generated from enum google.protobuf.FeatureSet.VisibilityFeature.DefaultSymbolVisibility
*/
var FeatureSet_VisibilityFeature_DefaultSymbolVisibility$1;
(function(FeatureSet_VisibilityFeature_DefaultSymbolVisibility) {
	/**
	* @generated from enum value: DEFAULT_SYMBOL_VISIBILITY_UNKNOWN = 0;
	*/
	FeatureSet_VisibilityFeature_DefaultSymbolVisibility[FeatureSet_VisibilityFeature_DefaultSymbolVisibility["DEFAULT_SYMBOL_VISIBILITY_UNKNOWN"] = 0] = "DEFAULT_SYMBOL_VISIBILITY_UNKNOWN";
	/**
	* Default pre-EDITION_2024, all UNSET visibility are export.
	*
	* @generated from enum value: EXPORT_ALL = 1;
	*/
	FeatureSet_VisibilityFeature_DefaultSymbolVisibility[FeatureSet_VisibilityFeature_DefaultSymbolVisibility["EXPORT_ALL"] = 1] = "EXPORT_ALL";
	/**
	* All top-level symbols default to export, nested default to local.
	*
	* @generated from enum value: EXPORT_TOP_LEVEL = 2;
	*/
	FeatureSet_VisibilityFeature_DefaultSymbolVisibility[FeatureSet_VisibilityFeature_DefaultSymbolVisibility["EXPORT_TOP_LEVEL"] = 2] = "EXPORT_TOP_LEVEL";
	/**
	* All symbols default to local.
	*
	* @generated from enum value: LOCAL_ALL = 3;
	*/
	FeatureSet_VisibilityFeature_DefaultSymbolVisibility[FeatureSet_VisibilityFeature_DefaultSymbolVisibility["LOCAL_ALL"] = 3] = "LOCAL_ALL";
	/**
	* All symbols local by default. Nested types cannot be exported.
	* With special case caveat for message { enum {} reserved 1 to max; }
	* This is the recommended setting for new protos.
	*
	* @generated from enum value: STRICT = 4;
	*/
	FeatureSet_VisibilityFeature_DefaultSymbolVisibility[FeatureSet_VisibilityFeature_DefaultSymbolVisibility["STRICT"] = 4] = "STRICT";
})(FeatureSet_VisibilityFeature_DefaultSymbolVisibility$1 || (FeatureSet_VisibilityFeature_DefaultSymbolVisibility$1 = {}));
/**
* @generated from enum google.protobuf.FeatureSet.FieldPresence
*/
var FeatureSet_FieldPresence$1;
(function(FeatureSet_FieldPresence) {
	/**
	* @generated from enum value: FIELD_PRESENCE_UNKNOWN = 0;
	*/
	FeatureSet_FieldPresence[FeatureSet_FieldPresence["FIELD_PRESENCE_UNKNOWN"] = 0] = "FIELD_PRESENCE_UNKNOWN";
	/**
	* @generated from enum value: EXPLICIT = 1;
	*/
	FeatureSet_FieldPresence[FeatureSet_FieldPresence["EXPLICIT"] = 1] = "EXPLICIT";
	/**
	* @generated from enum value: IMPLICIT = 2;
	*/
	FeatureSet_FieldPresence[FeatureSet_FieldPresence["IMPLICIT"] = 2] = "IMPLICIT";
	/**
	* @generated from enum value: LEGACY_REQUIRED = 3;
	*/
	FeatureSet_FieldPresence[FeatureSet_FieldPresence["LEGACY_REQUIRED"] = 3] = "LEGACY_REQUIRED";
})(FeatureSet_FieldPresence$1 || (FeatureSet_FieldPresence$1 = {}));
/**
* @generated from enum google.protobuf.FeatureSet.EnumType
*/
var FeatureSet_EnumType$1;
(function(FeatureSet_EnumType) {
	/**
	* @generated from enum value: ENUM_TYPE_UNKNOWN = 0;
	*/
	FeatureSet_EnumType[FeatureSet_EnumType["ENUM_TYPE_UNKNOWN"] = 0] = "ENUM_TYPE_UNKNOWN";
	/**
	* @generated from enum value: OPEN = 1;
	*/
	FeatureSet_EnumType[FeatureSet_EnumType["OPEN"] = 1] = "OPEN";
	/**
	* @generated from enum value: CLOSED = 2;
	*/
	FeatureSet_EnumType[FeatureSet_EnumType["CLOSED"] = 2] = "CLOSED";
})(FeatureSet_EnumType$1 || (FeatureSet_EnumType$1 = {}));
/**
* @generated from enum google.protobuf.FeatureSet.RepeatedFieldEncoding
*/
var FeatureSet_RepeatedFieldEncoding$1;
(function(FeatureSet_RepeatedFieldEncoding) {
	/**
	* @generated from enum value: REPEATED_FIELD_ENCODING_UNKNOWN = 0;
	*/
	FeatureSet_RepeatedFieldEncoding[FeatureSet_RepeatedFieldEncoding["REPEATED_FIELD_ENCODING_UNKNOWN"] = 0] = "REPEATED_FIELD_ENCODING_UNKNOWN";
	/**
	* @generated from enum value: PACKED = 1;
	*/
	FeatureSet_RepeatedFieldEncoding[FeatureSet_RepeatedFieldEncoding["PACKED"] = 1] = "PACKED";
	/**
	* @generated from enum value: EXPANDED = 2;
	*/
	FeatureSet_RepeatedFieldEncoding[FeatureSet_RepeatedFieldEncoding["EXPANDED"] = 2] = "EXPANDED";
})(FeatureSet_RepeatedFieldEncoding$1 || (FeatureSet_RepeatedFieldEncoding$1 = {}));
/**
* @generated from enum google.protobuf.FeatureSet.Utf8Validation
*/
var FeatureSet_Utf8Validation$1;
(function(FeatureSet_Utf8Validation) {
	/**
	* @generated from enum value: UTF8_VALIDATION_UNKNOWN = 0;
	*/
	FeatureSet_Utf8Validation[FeatureSet_Utf8Validation["UTF8_VALIDATION_UNKNOWN"] = 0] = "UTF8_VALIDATION_UNKNOWN";
	/**
	* @generated from enum value: VERIFY = 2;
	*/
	FeatureSet_Utf8Validation[FeatureSet_Utf8Validation["VERIFY"] = 2] = "VERIFY";
	/**
	* @generated from enum value: NONE = 3;
	*/
	FeatureSet_Utf8Validation[FeatureSet_Utf8Validation["NONE"] = 3] = "NONE";
})(FeatureSet_Utf8Validation$1 || (FeatureSet_Utf8Validation$1 = {}));
/**
* @generated from enum google.protobuf.FeatureSet.MessageEncoding
*/
var FeatureSet_MessageEncoding$1;
(function(FeatureSet_MessageEncoding) {
	/**
	* @generated from enum value: MESSAGE_ENCODING_UNKNOWN = 0;
	*/
	FeatureSet_MessageEncoding[FeatureSet_MessageEncoding["MESSAGE_ENCODING_UNKNOWN"] = 0] = "MESSAGE_ENCODING_UNKNOWN";
	/**
	* @generated from enum value: LENGTH_PREFIXED = 1;
	*/
	FeatureSet_MessageEncoding[FeatureSet_MessageEncoding["LENGTH_PREFIXED"] = 1] = "LENGTH_PREFIXED";
	/**
	* @generated from enum value: DELIMITED = 2;
	*/
	FeatureSet_MessageEncoding[FeatureSet_MessageEncoding["DELIMITED"] = 2] = "DELIMITED";
})(FeatureSet_MessageEncoding$1 || (FeatureSet_MessageEncoding$1 = {}));
/**
* @generated from enum google.protobuf.FeatureSet.JsonFormat
*/
var FeatureSet_JsonFormat$1;
(function(FeatureSet_JsonFormat) {
	/**
	* @generated from enum value: JSON_FORMAT_UNKNOWN = 0;
	*/
	FeatureSet_JsonFormat[FeatureSet_JsonFormat["JSON_FORMAT_UNKNOWN"] = 0] = "JSON_FORMAT_UNKNOWN";
	/**
	* @generated from enum value: ALLOW = 1;
	*/
	FeatureSet_JsonFormat[FeatureSet_JsonFormat["ALLOW"] = 1] = "ALLOW";
	/**
	* @generated from enum value: LEGACY_BEST_EFFORT = 2;
	*/
	FeatureSet_JsonFormat[FeatureSet_JsonFormat["LEGACY_BEST_EFFORT"] = 2] = "LEGACY_BEST_EFFORT";
})(FeatureSet_JsonFormat$1 || (FeatureSet_JsonFormat$1 = {}));
/**
* @generated from enum google.protobuf.FeatureSet.EnforceNamingStyle
*/
var FeatureSet_EnforceNamingStyle$1;
(function(FeatureSet_EnforceNamingStyle) {
	/**
	* @generated from enum value: ENFORCE_NAMING_STYLE_UNKNOWN = 0;
	*/
	FeatureSet_EnforceNamingStyle[FeatureSet_EnforceNamingStyle["ENFORCE_NAMING_STYLE_UNKNOWN"] = 0] = "ENFORCE_NAMING_STYLE_UNKNOWN";
	/**
	* @generated from enum value: STYLE2024 = 1;
	*/
	FeatureSet_EnforceNamingStyle[FeatureSet_EnforceNamingStyle["STYLE2024"] = 1] = "STYLE2024";
	/**
	* @generated from enum value: STYLE_LEGACY = 2;
	*/
	FeatureSet_EnforceNamingStyle[FeatureSet_EnforceNamingStyle["STYLE_LEGACY"] = 2] = "STYLE_LEGACY";
})(FeatureSet_EnforceNamingStyle$1 || (FeatureSet_EnforceNamingStyle$1 = {}));
/**
* Represents the identified object's effect on the element in the original
* .proto file.
*
* @generated from enum google.protobuf.GeneratedCodeInfo.Annotation.Semantic
*/
var GeneratedCodeInfo_Annotation_Semantic$1;
(function(GeneratedCodeInfo_Annotation_Semantic) {
	/**
	* There is no effect or the effect is indescribable.
	*
	* @generated from enum value: NONE = 0;
	*/
	GeneratedCodeInfo_Annotation_Semantic[GeneratedCodeInfo_Annotation_Semantic["NONE"] = 0] = "NONE";
	/**
	* The element is set or otherwise mutated.
	*
	* @generated from enum value: SET = 1;
	*/
	GeneratedCodeInfo_Annotation_Semantic[GeneratedCodeInfo_Annotation_Semantic["SET"] = 1] = "SET";
	/**
	* An alias to the element is returned.
	*
	* @generated from enum value: ALIAS = 2;
	*/
	GeneratedCodeInfo_Annotation_Semantic[GeneratedCodeInfo_Annotation_Semantic["ALIAS"] = 2] = "ALIAS";
})(GeneratedCodeInfo_Annotation_Semantic$1 || (GeneratedCodeInfo_Annotation_Semantic$1 = {}));
/**
* The full set of known editions.
*
* @generated from enum google.protobuf.Edition
*/
var Edition$1;
(function(Edition) {
	/**
	* A placeholder for an unknown edition value.
	*
	* @generated from enum value: EDITION_UNKNOWN = 0;
	*/
	Edition[Edition["EDITION_UNKNOWN"] = 0] = "EDITION_UNKNOWN";
	/**
	* A placeholder edition for specifying default behaviors *before* a feature
	* was first introduced.  This is effectively an "infinite past".
	*
	* @generated from enum value: EDITION_LEGACY = 900;
	*/
	Edition[Edition["EDITION_LEGACY"] = 900] = "EDITION_LEGACY";
	/**
	* Legacy syntax "editions".  These pre-date editions, but behave much like
	* distinct editions.  These can't be used to specify the edition of proto
	* files, but feature definitions must supply proto2/proto3 defaults for
	* backwards compatibility.
	*
	* @generated from enum value: EDITION_PROTO2 = 998;
	*/
	Edition[Edition["EDITION_PROTO2"] = 998] = "EDITION_PROTO2";
	/**
	* @generated from enum value: EDITION_PROTO3 = 999;
	*/
	Edition[Edition["EDITION_PROTO3"] = 999] = "EDITION_PROTO3";
	/**
	* Editions that have been released.  The specific values are arbitrary and
	* should not be depended on, but they will always be time-ordered for easy
	* comparison.
	*
	* @generated from enum value: EDITION_2023 = 1000;
	*/
	Edition[Edition["EDITION_2023"] = 1e3] = "EDITION_2023";
	/**
	* @generated from enum value: EDITION_2024 = 1001;
	*/
	Edition[Edition["EDITION_2024"] = 1001] = "EDITION_2024";
	/**
	* Placeholder editions for testing feature resolution.  These should not be
	* used or relied on outside of tests.
	*
	* @generated from enum value: EDITION_1_TEST_ONLY = 1;
	*/
	Edition[Edition["EDITION_1_TEST_ONLY"] = 1] = "EDITION_1_TEST_ONLY";
	/**
	* @generated from enum value: EDITION_2_TEST_ONLY = 2;
	*/
	Edition[Edition["EDITION_2_TEST_ONLY"] = 2] = "EDITION_2_TEST_ONLY";
	/**
	* @generated from enum value: EDITION_99997_TEST_ONLY = 99997;
	*/
	Edition[Edition["EDITION_99997_TEST_ONLY"] = 99997] = "EDITION_99997_TEST_ONLY";
	/**
	* @generated from enum value: EDITION_99998_TEST_ONLY = 99998;
	*/
	Edition[Edition["EDITION_99998_TEST_ONLY"] = 99998] = "EDITION_99998_TEST_ONLY";
	/**
	* @generated from enum value: EDITION_99999_TEST_ONLY = 99999;
	*/
	Edition[Edition["EDITION_99999_TEST_ONLY"] = 99999] = "EDITION_99999_TEST_ONLY";
	/**
	* Placeholder for specifying unbounded edition support.  This should only
	* ever be used by plugins that can expect to never require any changes to
	* support a new edition.
	*
	* @generated from enum value: EDITION_MAX = 2147483647;
	*/
	Edition[Edition["EDITION_MAX"] = 2147483647] = "EDITION_MAX";
})(Edition$1 || (Edition$1 = {}));
/**
* Describes the 'visibility' of a symbol with respect to the proto import
* system. Symbols can only be imported when the visibility rules do not prevent
* it (ex: local symbols cannot be imported).  Visibility modifiers can only set
* on `message` and `enum` as they are the only types available to be referenced
* from other files.
*
* @generated from enum google.protobuf.SymbolVisibility
*/
var SymbolVisibility$1;
(function(SymbolVisibility) {
	/**
	* @generated from enum value: VISIBILITY_UNSET = 0;
	*/
	SymbolVisibility[SymbolVisibility["VISIBILITY_UNSET"] = 0] = "VISIBILITY_UNSET";
	/**
	* @generated from enum value: VISIBILITY_LOCAL = 1;
	*/
	SymbolVisibility[SymbolVisibility["VISIBILITY_LOCAL"] = 1] = "VISIBILITY_LOCAL";
	/**
	* @generated from enum value: VISIBILITY_EXPORT = 2;
	*/
	SymbolVisibility[SymbolVisibility["VISIBILITY_EXPORT"] = 2] = "VISIBILITY_EXPORT";
})(SymbolVisibility$1 || (SymbolVisibility$1 = {}));
//#endregion
//#region ../../packages/agent-provider/node_modules/@bufbuild/protobuf/dist/esm/from-binary.js
var readDefaults$1 = { readUnknownFields: true };
function makeReadOptions$2(options) {
	return options ? Object.assign(Object.assign({}, readDefaults$1), options) : readDefaults$1;
}
/**
* Parse serialized binary data.
*/
function fromBinary$1(schema, bytes, options) {
	const msg = reflect$1(schema, void 0, false);
	readMessage$2(msg, new BinaryReader$1(bytes), makeReadOptions$2(options), false, bytes.byteLength);
	return msg.message;
}
/**
* If `delimited` is false, read the length given in `lengthOrDelimitedFieldNo`.
*
* If `delimited` is true, read until an EndGroup tag. `lengthOrDelimitedFieldNo`
* is the expected field number.
*
* @private
*/
function readMessage$2(message, reader, options, delimited, lengthOrDelimitedFieldNo) {
	var _a;
	const end = delimited ? reader.len : reader.pos + lengthOrDelimitedFieldNo;
	let fieldNo;
	let wireType;
	const unknownFields = (_a = message.getUnknown()) !== null && _a !== void 0 ? _a : [];
	while (reader.pos < end) {
		[fieldNo, wireType] = reader.tag();
		if (delimited && wireType == WireType$1.EndGroup) break;
		const field = message.findNumber(fieldNo);
		if (!field) {
			const data = reader.skip(wireType, fieldNo);
			if (options.readUnknownFields) unknownFields.push({
				no: fieldNo,
				wireType,
				data
			});
			continue;
		}
		readField$2(message, reader, field, wireType, options);
	}
	if (delimited) {
		if (wireType != WireType$1.EndGroup || fieldNo !== lengthOrDelimitedFieldNo) throw new Error("invalid end group tag");
	}
	if (unknownFields.length > 0) message.setUnknown(unknownFields);
}
/**
* @private
*/
function readField$2(message, reader, field, wireType, options) {
	var _a;
	switch (field.fieldKind) {
		case "scalar":
			message.set(field, readScalar$1(reader, field.scalar));
			break;
		case "enum":
			const val = readScalar$1(reader, ScalarType$1.INT32);
			if (field.enum.open) message.set(field, val);
			else if (field.enum.values.some((v) => v.number === val)) message.set(field, val);
			else if (options.readUnknownFields) {
				const bytes = [];
				varint32write$1(val, bytes);
				const unknownFields = (_a = message.getUnknown()) !== null && _a !== void 0 ? _a : [];
				unknownFields.push({
					no: field.number,
					wireType,
					data: new Uint8Array(bytes)
				});
				message.setUnknown(unknownFields);
			}
			break;
		case "message":
			message.set(field, readMessageField$2(reader, options, field, message.get(field)));
			break;
		case "list":
			readListField$2(reader, wireType, message.get(field), options);
			break;
		case "map":
			readMapEntry$1(reader, message.get(field), options);
			break;
	}
}
function readMapEntry$1(reader, map, options) {
	const field = map.field();
	let key;
	let val;
	const len = reader.uint32();
	const end = reader.pos + len;
	while (reader.pos < end) {
		const [fieldNo] = reader.tag();
		switch (fieldNo) {
			case 1:
				key = readScalar$1(reader, field.mapKey);
				break;
			case 2:
				switch (field.mapKind) {
					case "scalar":
						val = readScalar$1(reader, field.scalar);
						break;
					case "enum":
						val = reader.int32();
						break;
					case "message":
						val = readMessageField$2(reader, options, field);
						break;
				}
				break;
		}
	}
	if (key === void 0) key = scalarZeroValue$1(field.mapKey, false);
	if (val === void 0) switch (field.mapKind) {
		case "scalar":
			val = scalarZeroValue$1(field.scalar, false);
			break;
		case "enum":
			val = field.enum.values[0].number;
			break;
		case "message":
			val = reflect$1(field.message, void 0, false);
			break;
	}
	map.set(key, val);
}
function readListField$2(reader, wireType, list, options) {
	var _a;
	const field = list.field();
	if (field.listKind === "message") {
		list.add(readMessageField$2(reader, options, field));
		return;
	}
	const scalarType = (_a = field.scalar) !== null && _a !== void 0 ? _a : ScalarType$1.INT32;
	if (!(wireType == WireType$1.LengthDelimited && scalarType != ScalarType$1.STRING && scalarType != ScalarType$1.BYTES)) {
		list.add(readScalar$1(reader, scalarType));
		return;
	}
	const e = reader.uint32() + reader.pos;
	while (reader.pos < e) list.add(readScalar$1(reader, scalarType));
}
function readMessageField$2(reader, options, field, mergeMessage) {
	const delimited = field.delimitedEncoding;
	const message = mergeMessage !== null && mergeMessage !== void 0 ? mergeMessage : reflect$1(field.message, void 0, false);
	readMessage$2(message, reader, options, delimited, delimited ? field.number : reader.uint32());
	return message;
}
function readScalar$1(reader, type) {
	switch (type) {
		case ScalarType$1.STRING: return reader.string();
		case ScalarType$1.BOOL: return reader.bool();
		case ScalarType$1.DOUBLE: return reader.double();
		case ScalarType$1.FLOAT: return reader.float();
		case ScalarType$1.INT32: return reader.int32();
		case ScalarType$1.INT64: return reader.int64();
		case ScalarType$1.UINT64: return reader.uint64();
		case ScalarType$1.FIXED64: return reader.fixed64();
		case ScalarType$1.BYTES: return reader.bytes();
		case ScalarType$1.FIXED32: return reader.fixed32();
		case ScalarType$1.SFIXED32: return reader.sfixed32();
		case ScalarType$1.SFIXED64: return reader.sfixed64();
		case ScalarType$1.SINT64: return reader.sint64();
		case ScalarType$1.UINT32: return reader.uint32();
		case ScalarType$1.SINT32: return reader.sint32();
	}
}
//#endregion
//#region ../../packages/agent-provider/node_modules/@bufbuild/protobuf/dist/esm/codegenv2/file.js
/**
* Hydrate a file descriptor.
*
* @private
*/
function fileDesc$1(b64, imports) {
	var _a;
	const root = fromBinary$1(FileDescriptorProtoSchema$1, base64Decode$1(b64));
	root.messageType.forEach(restoreJsonNames$1);
	root.dependency = (_a = imports === null || imports === void 0 ? void 0 : imports.map((f) => f.proto.name)) !== null && _a !== void 0 ? _a : [];
	return createFileRegistry$1(root, (protoFileName) => imports === null || imports === void 0 ? void 0 : imports.find((f) => f.proto.name === protoFileName)).getFile(root.name);
}
//#endregion
//#region ../../packages/agent-provider/node_modules/@bufbuild/protobuf/dist/esm/codegenv2/service.js
/**
* Hydrate a service descriptor.
*
* @private
*/
function serviceDesc(file, path, ...paths) {
	if (paths.length > 0) throw new Error();
	return file.services[path];
}
//#endregion
//#region ../../packages/agent-provider/node_modules/@bufbuild/protobuf/dist/esm/wkt/gen/google/protobuf/timestamp_pb.js
/**
* Describes the file google/protobuf/timestamp.proto.
*/
var file_google_protobuf_timestamp = /* @__PURE__ */ fileDesc$1("Ch9nb29nbGUvcHJvdG9idWYvdGltZXN0YW1wLnByb3RvEg9nb29nbGUucHJvdG9idWYiKwoJVGltZXN0YW1wEg8KB3NlY29uZHMYASABKAMSDQoFbmFub3MYAiABKAVChQEKE2NvbS5nb29nbGUucHJvdG9idWZCDlRpbWVzdGFtcFByb3RvUAFaMmdvb2dsZS5nb2xhbmcub3JnL3Byb3RvYnVmL3R5cGVzL2tub3duL3RpbWVzdGFtcHBi+AEBogIDR1BCqgIeR29vZ2xlLlByb3RvYnVmLldlbGxLbm93blR5cGVzYgZwcm90bzM");
//#endregion
//#region ../../node_modules/@connectrpc/connect-web/node_modules/@bufbuild/protobuf/dist/esm/is-message.js
/**
* Determine whether the given `arg` is a message.
* If `desc` is set, determine whether `arg` is this specific message.
*/
function isMessage(arg, schema) {
	if (!(arg !== null && typeof arg == "object" && "$typeName" in arg && typeof arg.$typeName == "string")) return false;
	if (schema === void 0) return true;
	return schema.typeName === arg.$typeName;
}
//#endregion
//#region ../../node_modules/@connectrpc/connect-web/node_modules/@bufbuild/protobuf/dist/esm/descriptors.js
/**
* Scalar value types. This is a subset of field types declared by protobuf
* enum google.protobuf.FieldDescriptorProto.Type The types GROUP and MESSAGE
* are omitted, but the numerical values are identical.
*/
var ScalarType;
(function(ScalarType) {
	ScalarType[ScalarType["DOUBLE"] = 1] = "DOUBLE";
	ScalarType[ScalarType["FLOAT"] = 2] = "FLOAT";
	ScalarType[ScalarType["INT64"] = 3] = "INT64";
	ScalarType[ScalarType["UINT64"] = 4] = "UINT64";
	ScalarType[ScalarType["INT32"] = 5] = "INT32";
	ScalarType[ScalarType["FIXED64"] = 6] = "FIXED64";
	ScalarType[ScalarType["FIXED32"] = 7] = "FIXED32";
	ScalarType[ScalarType["BOOL"] = 8] = "BOOL";
	ScalarType[ScalarType["STRING"] = 9] = "STRING";
	ScalarType[ScalarType["BYTES"] = 12] = "BYTES";
	ScalarType[ScalarType["UINT32"] = 13] = "UINT32";
	ScalarType[ScalarType["SFIXED32"] = 15] = "SFIXED32";
	ScalarType[ScalarType["SFIXED64"] = 16] = "SFIXED64";
	ScalarType[ScalarType["SINT32"] = 17] = "SINT32";
	ScalarType[ScalarType["SINT64"] = 18] = "SINT64";
})(ScalarType || (ScalarType = {}));
//#endregion
//#region ../../node_modules/@connectrpc/connect-web/node_modules/@bufbuild/protobuf/dist/esm/wire/varint.js
/**
* Read a 64 bit varint as two JS numbers.
*
* Returns tuple:
* [0]: low bits
* [1]: high bits
*
* Copyright 2008 Google Inc.  All rights reserved.
*
* See https://github.com/protocolbuffers/protobuf/blob/8a71927d74a4ce34efe2d8769fda198f52d20d12/js/experimental/runtime/kernel/buffer_decoder.js#L175
*/
function varint64read() {
	let lowBits = 0;
	let highBits = 0;
	for (let shift = 0; shift < 28; shift += 7) {
		let b = this.buf[this.pos++];
		lowBits |= (b & 127) << shift;
		if ((b & 128) == 0) {
			this.assertBounds();
			return [lowBits, highBits];
		}
	}
	let middleByte = this.buf[this.pos++];
	lowBits |= (middleByte & 15) << 28;
	highBits = (middleByte & 112) >> 4;
	if ((middleByte & 128) == 0) {
		this.assertBounds();
		return [lowBits, highBits];
	}
	for (let shift = 3; shift <= 31; shift += 7) {
		let b = this.buf[this.pos++];
		highBits |= (b & 127) << shift;
		if ((b & 128) == 0) {
			this.assertBounds();
			return [lowBits, highBits];
		}
	}
	throw new Error("invalid varint");
}
/**
* Write a 64 bit varint, given as two JS numbers, to the given bytes array.
*
* Copyright 2008 Google Inc.  All rights reserved.
*
* See https://github.com/protocolbuffers/protobuf/blob/8a71927d74a4ce34efe2d8769fda198f52d20d12/js/experimental/runtime/kernel/writer.js#L344
*/
function varint64write(lo, hi, bytes) {
	for (let i = 0; i < 28; i = i + 7) {
		const shift = lo >>> i;
		const hasNext = !(shift >>> 7 == 0 && hi == 0);
		const byte = (hasNext ? shift | 128 : shift) & 255;
		bytes.push(byte);
		if (!hasNext) return;
	}
	const splitBits = lo >>> 28 & 15 | (hi & 7) << 4;
	const hasMoreBits = !(hi >> 3 == 0);
	bytes.push((hasMoreBits ? splitBits | 128 : splitBits) & 255);
	if (!hasMoreBits) return;
	for (let i = 3; i < 31; i = i + 7) {
		const shift = hi >>> i;
		const hasNext = !(shift >>> 7 == 0);
		const byte = (hasNext ? shift | 128 : shift) & 255;
		bytes.push(byte);
		if (!hasNext) return;
	}
	bytes.push(hi >>> 31 & 1);
}
var TWO_PWR_32_DBL = 4294967296;
/**
* Parse decimal string of 64 bit integer value as two JS numbers.
*
* Copyright 2008 Google Inc.  All rights reserved.
*
* See https://github.com/protocolbuffers/protobuf-javascript/blob/a428c58273abad07c66071d9753bc4d1289de426/experimental/runtime/int64.js#L10
*/
function int64FromString(dec) {
	const minus = dec[0] === "-";
	if (minus) dec = dec.slice(1);
	const base = 1e6;
	let lowBits = 0;
	let highBits = 0;
	function add1e6digit(begin, end) {
		const digit1e6 = Number(dec.slice(begin, end));
		highBits *= base;
		lowBits = lowBits * base + digit1e6;
		if (lowBits >= TWO_PWR_32_DBL) {
			highBits = highBits + (lowBits / TWO_PWR_32_DBL | 0);
			lowBits = lowBits % TWO_PWR_32_DBL;
		}
	}
	add1e6digit(-24, -18);
	add1e6digit(-18, -12);
	add1e6digit(-12, -6);
	add1e6digit(-6);
	return minus ? negate(lowBits, highBits) : newBits(lowBits, highBits);
}
/**
* Losslessly converts a 64-bit signed integer in 32:32 split representation
* into a decimal string.
*
* Copyright 2008 Google Inc.  All rights reserved.
*
* See https://github.com/protocolbuffers/protobuf-javascript/blob/a428c58273abad07c66071d9753bc4d1289de426/experimental/runtime/int64.js#L10
*/
function int64ToString(lo, hi) {
	let bits = newBits(lo, hi);
	const negative = bits.hi & 2147483648;
	if (negative) bits = negate(bits.lo, bits.hi);
	const result = uInt64ToString(bits.lo, bits.hi);
	return negative ? "-" + result : result;
}
/**
* Losslessly converts a 64-bit unsigned integer in 32:32 split representation
* into a decimal string.
*
* Copyright 2008 Google Inc.  All rights reserved.
*
* See https://github.com/protocolbuffers/protobuf-javascript/blob/a428c58273abad07c66071d9753bc4d1289de426/experimental/runtime/int64.js#L10
*/
function uInt64ToString(lo, hi) {
	({lo, hi} = toUnsigned(lo, hi));
	if (hi <= 2097151) return String(TWO_PWR_32_DBL * hi + lo);
	const low = lo & 16777215;
	const mid = (lo >>> 24 | hi << 8) & 16777215;
	const high = hi >> 16 & 65535;
	let digitA = low + mid * 6777216 + high * 6710656;
	let digitB = mid + high * 8147497;
	let digitC = high * 2;
	const base = 1e7;
	if (digitA >= base) {
		digitB += Math.floor(digitA / base);
		digitA %= base;
	}
	if (digitB >= base) {
		digitC += Math.floor(digitB / base);
		digitB %= base;
	}
	return digitC.toString() + decimalFrom1e7WithLeadingZeros(digitB) + decimalFrom1e7WithLeadingZeros(digitA);
}
function toUnsigned(lo, hi) {
	return {
		lo: lo >>> 0,
		hi: hi >>> 0
	};
}
function newBits(lo, hi) {
	return {
		lo: lo | 0,
		hi: hi | 0
	};
}
/**
* Returns two's compliment negation of input.
* @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Signed_32-bit_integers
*/
function negate(lowBits, highBits) {
	highBits = ~highBits;
	if (lowBits) lowBits = ~lowBits + 1;
	else highBits += 1;
	return newBits(lowBits, highBits);
}
/**
* Returns decimal representation of digit1e7 with leading zeros.
*/
var decimalFrom1e7WithLeadingZeros = (digit1e7) => {
	const partial = String(digit1e7);
	return "0000000".slice(partial.length) + partial;
};
/**
* Write a 32 bit varint, signed or unsigned. Same as `varint64write(0, value, bytes)`
*
* Copyright 2008 Google Inc.  All rights reserved.
*
* See https://github.com/protocolbuffers/protobuf/blob/1b18833f4f2a2f681f4e4a25cdf3b0a43115ec26/js/binary/encoder.js#L144
*/
function varint32write(value, bytes) {
	if (value >= 0) {
		while (value > 127) {
			bytes.push(value & 127 | 128);
			value = value >>> 7;
		}
		bytes.push(value);
	} else {
		for (let i = 0; i < 9; i++) {
			bytes.push(value & 127 | 128);
			value = value >> 7;
		}
		bytes.push(1);
	}
}
/**
* Read an unsigned 32 bit varint.
*
* See https://github.com/protocolbuffers/protobuf/blob/8a71927d74a4ce34efe2d8769fda198f52d20d12/js/experimental/runtime/kernel/buffer_decoder.js#L220
*/
function varint32read() {
	let b = this.buf[this.pos++];
	let result = b & 127;
	if ((b & 128) == 0) {
		this.assertBounds();
		return result;
	}
	b = this.buf[this.pos++];
	result |= (b & 127) << 7;
	if ((b & 128) == 0) {
		this.assertBounds();
		return result;
	}
	b = this.buf[this.pos++];
	result |= (b & 127) << 14;
	if ((b & 128) == 0) {
		this.assertBounds();
		return result;
	}
	b = this.buf[this.pos++];
	result |= (b & 127) << 21;
	if ((b & 128) == 0) {
		this.assertBounds();
		return result;
	}
	b = this.buf[this.pos++];
	result |= (b & 15) << 28;
	for (let readBytes = 5; (b & 128) !== 0 && readBytes < 10; readBytes++) b = this.buf[this.pos++];
	if ((b & 128) != 0) throw new Error("invalid varint");
	this.assertBounds();
	return result >>> 0;
}
//#endregion
//#region ../../node_modules/@connectrpc/connect-web/node_modules/@bufbuild/protobuf/dist/esm/proto-int64.js
/**
* Int64Support for the current environment.
*/
var protoInt64 = /* @__PURE__ */ makeInt64Support();
function makeInt64Support() {
	const dv = /* @__PURE__ */ new DataView(/* @__PURE__ */ new ArrayBuffer(8));
	if (typeof BigInt === "function" && typeof dv.getBigInt64 === "function" && typeof dv.getBigUint64 === "function" && typeof dv.setBigInt64 === "function" && typeof dv.setBigUint64 === "function" && (!!globalThis.Deno || typeof process != "object" || typeof process.env != "object" || process.env.BUF_BIGINT_DISABLE !== "1")) {
		const MIN = BigInt("-9223372036854775808");
		const MAX = BigInt("9223372036854775807");
		const UMIN = BigInt("0");
		const UMAX = BigInt("18446744073709551615");
		return {
			zero: BigInt(0),
			supported: true,
			parse(value) {
				const bi = typeof value == "bigint" ? value : BigInt(value);
				if (bi > MAX || bi < MIN) throw new Error(`invalid int64: ${value}`);
				return bi;
			},
			uParse(value) {
				const bi = typeof value == "bigint" ? value : BigInt(value);
				if (bi > UMAX || bi < UMIN) throw new Error(`invalid uint64: ${value}`);
				return bi;
			},
			enc(value) {
				dv.setBigInt64(0, this.parse(value), true);
				return {
					lo: dv.getInt32(0, true),
					hi: dv.getInt32(4, true)
				};
			},
			uEnc(value) {
				dv.setBigInt64(0, this.uParse(value), true);
				return {
					lo: dv.getInt32(0, true),
					hi: dv.getInt32(4, true)
				};
			},
			dec(lo, hi) {
				dv.setInt32(0, lo, true);
				dv.setInt32(4, hi, true);
				return dv.getBigInt64(0, true);
			},
			uDec(lo, hi) {
				dv.setInt32(0, lo, true);
				dv.setInt32(4, hi, true);
				return dv.getBigUint64(0, true);
			}
		};
	}
	return {
		zero: "0",
		supported: false,
		parse(value) {
			if (typeof value != "string") value = value.toString();
			assertInt64String(value);
			return value;
		},
		uParse(value) {
			if (typeof value != "string") value = value.toString();
			assertUInt64String(value);
			return value;
		},
		enc(value) {
			if (typeof value != "string") value = value.toString();
			assertInt64String(value);
			return int64FromString(value);
		},
		uEnc(value) {
			if (typeof value != "string") value = value.toString();
			assertUInt64String(value);
			return int64FromString(value);
		},
		dec(lo, hi) {
			return int64ToString(lo, hi);
		},
		uDec(lo, hi) {
			return uInt64ToString(lo, hi);
		}
	};
}
function assertInt64String(value) {
	if (!/^-?[0-9]+$/.test(value)) throw new Error("invalid int64: " + value);
}
function assertUInt64String(value) {
	if (!/^[0-9]+$/.test(value)) throw new Error("invalid uint64: " + value);
}
//#endregion
//#region ../../node_modules/@connectrpc/connect-web/node_modules/@bufbuild/protobuf/dist/esm/reflect/scalar.js
/**
* Returns the zero value for the given scalar type.
*/
function scalarZeroValue(type, longAsString) {
	switch (type) {
		case ScalarType.STRING: return "";
		case ScalarType.BOOL: return false;
		case ScalarType.DOUBLE:
		case ScalarType.FLOAT: return 0;
		case ScalarType.INT64:
		case ScalarType.UINT64:
		case ScalarType.SFIXED64:
		case ScalarType.FIXED64:
		case ScalarType.SINT64: return longAsString ? "0" : protoInt64.zero;
		case ScalarType.BYTES: return new Uint8Array(0);
		default: return 0;
	}
}
/**
* Returns true for a zero-value. For example, an integer has the zero-value `0`,
* a boolean is `false`, a string is `""`, and bytes is an empty Uint8Array.
*
* In proto3, zero-values are not written to the wire, unless the field is
* optional or repeated.
*/
function isScalarZeroValue(type, value) {
	switch (type) {
		case ScalarType.BOOL: return value === false;
		case ScalarType.STRING: return value === "";
		case ScalarType.BYTES: return value instanceof Uint8Array && !value.byteLength;
		default: return value == 0;
	}
}
//#endregion
//#region ../../node_modules/@connectrpc/connect-web/node_modules/@bufbuild/protobuf/dist/esm/reflect/unsafe.js
var IMPLICIT$2 = 2;
var unsafeLocal = Symbol.for("reflect unsafe local");
/**
* Return the selected field of a oneof group.
*
* @private
*/
function unsafeOneofCase(target, oneof) {
	const c = target[oneof.localName].case;
	if (c === void 0) return c;
	return oneof.fields.find((f) => f.localName === c);
}
/**
* Returns true if the field is set.
*
* @private
*/
function unsafeIsSet(target, field) {
	const name = field.localName;
	if (field.oneof) return target[field.oneof.localName].case === name;
	if (field.presence != IMPLICIT$2) return target[name] !== void 0 && Object.prototype.hasOwnProperty.call(target, name);
	switch (field.fieldKind) {
		case "list": return target[name].length > 0;
		case "map": return Object.keys(target[name]).length > 0;
		case "scalar": return !isScalarZeroValue(field.scalar, target[name]);
		case "enum": return target[name] !== field.enum.values[0].number;
	}
	throw new Error("message field with implicit presence");
}
/**
* Returns true if the field is set, but only for singular fields with explicit
* presence (proto2).
*
* @private
*/
function unsafeIsSetExplicit(target, localName) {
	return Object.prototype.hasOwnProperty.call(target, localName) && target[localName] !== void 0;
}
/**
* Return a field value, respecting oneof groups.
*
* @private
*/
function unsafeGet(target, field) {
	if (field.oneof) {
		const oneof = target[field.oneof.localName];
		if (oneof.case === field.localName) return oneof.value;
		return;
	}
	return target[field.localName];
}
/**
* Set a field value, respecting oneof groups.
*
* @private
*/
function unsafeSet(target, field, value) {
	if (field.oneof) target[field.oneof.localName] = {
		case: field.localName,
		value
	};
	else target[field.localName] = value;
}
/**
* Resets the field, so that unsafeIsSet() will return false.
*
* @private
*/
function unsafeClear(target, field) {
	const name = field.localName;
	if (field.oneof) {
		const oneofLocalName = field.oneof.localName;
		if (target[oneofLocalName].case === name) target[oneofLocalName] = { case: void 0 };
	} else if (field.presence != IMPLICIT$2) delete target[name];
	else switch (field.fieldKind) {
		case "map":
			target[name] = {};
			break;
		case "list":
			target[name] = [];
			break;
		case "enum":
			target[name] = field.enum.values[0].number;
			break;
		case "scalar":
			target[name] = scalarZeroValue(field.scalar, field.longAsString);
			break;
	}
}
//#endregion
//#region ../../node_modules/@connectrpc/connect-web/node_modules/@bufbuild/protobuf/dist/esm/reflect/guard.js
function isObject(arg) {
	return arg !== null && typeof arg == "object" && !Array.isArray(arg);
}
function isReflectList(arg, field) {
	var _a, _b, _c, _d;
	if (isObject(arg) && unsafeLocal in arg && "add" in arg && "field" in arg && typeof arg.field == "function") {
		if (field !== void 0) {
			const a = field;
			const b = arg.field();
			return a.listKind == b.listKind && a.scalar === b.scalar && ((_a = a.message) === null || _a === void 0 ? void 0 : _a.typeName) === ((_b = b.message) === null || _b === void 0 ? void 0 : _b.typeName) && ((_c = a.enum) === null || _c === void 0 ? void 0 : _c.typeName) === ((_d = b.enum) === null || _d === void 0 ? void 0 : _d.typeName);
		}
		return true;
	}
	return false;
}
function isReflectMap(arg, field) {
	var _a, _b, _c, _d;
	if (isObject(arg) && unsafeLocal in arg && "has" in arg && "field" in arg && typeof arg.field == "function") {
		if (field !== void 0) {
			const a = field, b = arg.field();
			return a.mapKey === b.mapKey && a.mapKind == b.mapKind && a.scalar === b.scalar && ((_a = a.message) === null || _a === void 0 ? void 0 : _a.typeName) === ((_b = b.message) === null || _b === void 0 ? void 0 : _b.typeName) && ((_c = a.enum) === null || _c === void 0 ? void 0 : _c.typeName) === ((_d = b.enum) === null || _d === void 0 ? void 0 : _d.typeName);
		}
		return true;
	}
	return false;
}
function isReflectMessage(arg, messageDesc) {
	return isObject(arg) && unsafeLocal in arg && "desc" in arg && isObject(arg.desc) && arg.desc.kind === "message" && (messageDesc === void 0 || arg.desc.typeName == messageDesc.typeName);
}
//#endregion
//#region ../../node_modules/@connectrpc/connect-web/node_modules/@bufbuild/protobuf/dist/esm/wkt/wrappers.js
function isWrapper(arg) {
	return isWrapperTypeName(arg.$typeName);
}
function isWrapperDesc(messageDesc) {
	const f = messageDesc.fields[0];
	return isWrapperTypeName(messageDesc.typeName) && f !== void 0 && f.fieldKind == "scalar" && f.name == "value" && f.number == 1;
}
function isWrapperTypeName(name) {
	return name.startsWith("google.protobuf.") && [
		"DoubleValue",
		"FloatValue",
		"Int64Value",
		"UInt64Value",
		"Int32Value",
		"UInt32Value",
		"BoolValue",
		"StringValue",
		"BytesValue"
	].includes(name.substring(16));
}
//#endregion
//#region ../../node_modules/@connectrpc/connect-web/node_modules/@bufbuild/protobuf/dist/esm/create.js
var EDITION_PROTO3$1 = 999;
var EDITION_PROTO2$1 = 998;
var IMPLICIT$1 = 2;
/**
* Create a new message instance.
*
* The second argument is an optional initializer object, where all fields are
* optional.
*/
function create(schema, init) {
	if (isMessage(init, schema)) return init;
	const message = createZeroMessage(schema);
	if (init !== void 0) initMessage(schema, message, init);
	return message;
}
/**
* Sets field values from a MessageInitShape on a zero message.
*/
function initMessage(messageDesc, message, init) {
	for (const member of messageDesc.members) {
		let value = init[member.localName];
		if (value == null) continue;
		let field;
		if (member.kind == "oneof") {
			const oneofField = unsafeOneofCase(init, member);
			if (!oneofField) continue;
			field = oneofField;
			value = unsafeGet(init, oneofField);
		} else field = member;
		switch (field.fieldKind) {
			case "message":
				value = toMessage(field, value);
				break;
			case "scalar":
				value = initScalar(field, value);
				break;
			case "list":
				value = initList(field, value);
				break;
			case "map":
				value = initMap(field, value);
				break;
		}
		unsafeSet(message, field, value);
	}
	return message;
}
function initScalar(field, value) {
	if (field.scalar == ScalarType.BYTES) return toU8Arr(value);
	return value;
}
function initMap(field, value) {
	if (isObject(value)) {
		if (field.scalar == ScalarType.BYTES) return convertObjectValues(value, toU8Arr);
		if (field.mapKind == "message") return convertObjectValues(value, (val) => toMessage(field, val));
	}
	return value;
}
function initList(field, value) {
	if (Array.isArray(value)) {
		if (field.scalar == ScalarType.BYTES) return value.map(toU8Arr);
		if (field.listKind == "message") return value.map((item) => toMessage(field, item));
	}
	return value;
}
function toMessage(field, value) {
	if (field.fieldKind == "message" && !field.oneof && isWrapperDesc(field.message)) return initScalar(field.message.fields[0], value);
	if (isObject(value)) {
		if (field.message.typeName == "google.protobuf.Struct" && field.parent.typeName !== "google.protobuf.Value") return value;
		if (!isMessage(value, field.message)) return create(field.message, value);
	}
	return value;
}
function toU8Arr(value) {
	return Array.isArray(value) ? new Uint8Array(value) : value;
}
function convertObjectValues(obj, fn) {
	const ret = {};
	for (const entry of Object.entries(obj)) ret[entry[0]] = fn(entry[1]);
	return ret;
}
var tokenZeroMessageField = Symbol();
var messagePrototypes = /* @__PURE__ */ new WeakMap();
/**
* Create a zero message.
*/
function createZeroMessage(desc) {
	let msg;
	if (!needsPrototypeChain(desc)) {
		msg = { $typeName: desc.typeName };
		for (const member of desc.members) if (member.kind == "oneof" || member.presence == IMPLICIT$1) msg[member.localName] = createZeroField(member);
	} else {
		const cached = messagePrototypes.get(desc);
		let prototype;
		let members;
		if (cached) ({prototype, members} = cached);
		else {
			prototype = {};
			members = /* @__PURE__ */ new Set();
			for (const member of desc.members) {
				if (member.kind == "oneof") continue;
				if (member.fieldKind != "scalar" && member.fieldKind != "enum") continue;
				if (member.presence == IMPLICIT$1) continue;
				members.add(member);
				prototype[member.localName] = createZeroField(member);
			}
			messagePrototypes.set(desc, {
				prototype,
				members
			});
		}
		msg = Object.create(prototype);
		msg.$typeName = desc.typeName;
		for (const member of desc.members) {
			if (members.has(member)) continue;
			if (member.kind == "field") {
				if (member.fieldKind == "message") continue;
				if (member.fieldKind == "scalar" || member.fieldKind == "enum") {
					if (member.presence != IMPLICIT$1) continue;
				}
			}
			msg[member.localName] = createZeroField(member);
		}
	}
	return msg;
}
/**
* Do we need the prototype chain to track field presence?
*/
function needsPrototypeChain(desc) {
	switch (desc.file.edition) {
		case EDITION_PROTO3$1: return false;
		case EDITION_PROTO2$1: return true;
		default: return desc.fields.some((f) => f.presence != IMPLICIT$1 && f.fieldKind != "message" && !f.oneof);
	}
}
/**
* Returns a zero value for oneof groups, and for every field kind except
* messages. Scalar and enum fields can have default values.
*/
function createZeroField(field) {
	if (field.kind == "oneof") return { case: void 0 };
	if (field.fieldKind == "list") return [];
	if (field.fieldKind == "map") return {};
	if (field.fieldKind == "message") return tokenZeroMessageField;
	const defaultValue = field.getDefaultValue();
	if (defaultValue !== void 0) return field.fieldKind == "scalar" && field.longAsString ? defaultValue.toString() : defaultValue;
	return field.fieldKind == "scalar" ? scalarZeroValue(field.scalar, field.longAsString) : field.enum.values[0].number;
}
//#endregion
//#region ../../node_modules/@connectrpc/connect-web/node_modules/@bufbuild/protobuf/dist/esm/reflect/error.js
var errorNames = [
	"FieldValueInvalidError",
	"FieldListRangeError",
	"ForeignFieldError"
];
var FieldError = class extends Error {
	constructor(fieldOrOneof, message, name = "FieldValueInvalidError") {
		super(message);
		this.name = name;
		this.field = () => fieldOrOneof;
	}
};
function isFieldError(arg) {
	return arg instanceof Error && errorNames.includes(arg.name) && "field" in arg && typeof arg.field == "function";
}
//#endregion
//#region ../../node_modules/@connectrpc/connect-web/node_modules/@bufbuild/protobuf/dist/esm/wire/text-encoding.js
var symbol = Symbol.for("@bufbuild/protobuf/text-encoding");
function getTextEncoding() {
	if (globalThis[symbol] == void 0) {
		const te = new globalThis.TextEncoder();
		const td = new globalThis.TextDecoder();
		globalThis[symbol] = {
			encodeUtf8(text) {
				return te.encode(text);
			},
			decodeUtf8(bytes) {
				return td.decode(bytes);
			},
			checkUtf8(text) {
				try {
					return true;
				} catch (_) {
					return false;
				}
			}
		};
	}
	return globalThis[symbol];
}
//#endregion
//#region ../../node_modules/@connectrpc/connect-web/node_modules/@bufbuild/protobuf/dist/esm/wire/binary-encoding.js
/**
* Protobuf binary format wire types.
*
* A wire type provides just enough information to find the length of the
* following value.
*
* See https://developers.google.com/protocol-buffers/docs/encoding#structure
*/
var WireType;
(function(WireType) {
	/**
	* Used for int32, int64, uint32, uint64, sint32, sint64, bool, enum
	*/
	WireType[WireType["Varint"] = 0] = "Varint";
	/**
	* Used for fixed64, sfixed64, double.
	* Always 8 bytes with little-endian byte order.
	*/
	WireType[WireType["Bit64"] = 1] = "Bit64";
	/**
	* Used for string, bytes, embedded messages, packed repeated fields
	*
	* Only repeated numeric types (types which use the varint, 32-bit,
	* or 64-bit wire types) can be packed. In proto3, such fields are
	* packed by default.
	*/
	WireType[WireType["LengthDelimited"] = 2] = "LengthDelimited";
	/**
	* Start of a tag-delimited aggregate, such as a proto2 group, or a message
	* in editions with message_encoding = DELIMITED.
	*/
	WireType[WireType["StartGroup"] = 3] = "StartGroup";
	/**
	* End of a tag-delimited aggregate.
	*/
	WireType[WireType["EndGroup"] = 4] = "EndGroup";
	/**
	* Used for fixed32, sfixed32, float.
	* Always 4 bytes with little-endian byte order.
	*/
	WireType[WireType["Bit32"] = 5] = "Bit32";
})(WireType || (WireType = {}));
var BinaryWriter = class {
	constructor(encodeUtf8 = getTextEncoding().encodeUtf8) {
		this.encodeUtf8 = encodeUtf8;
		/**
		* Previous fork states.
		*/
		this.stack = [];
		this.chunks = [];
		this.buf = [];
	}
	/**
	* Return all bytes written and reset this writer.
	*/
	finish() {
		if (this.buf.length) {
			this.chunks.push(new Uint8Array(this.buf));
			this.buf = [];
		}
		let len = 0;
		for (let i = 0; i < this.chunks.length; i++) len += this.chunks[i].length;
		let bytes = new Uint8Array(len);
		let offset = 0;
		for (let i = 0; i < this.chunks.length; i++) {
			bytes.set(this.chunks[i], offset);
			offset += this.chunks[i].length;
		}
		this.chunks = [];
		return bytes;
	}
	/**
	* Start a new fork for length-delimited data like a message
	* or a packed repeated field.
	*
	* Must be joined later with `join()`.
	*/
	fork() {
		this.stack.push({
			chunks: this.chunks,
			buf: this.buf
		});
		this.chunks = [];
		this.buf = [];
		return this;
	}
	/**
	* Join the last fork. Write its length and bytes, then
	* return to the previous state.
	*/
	join() {
		let chunk = this.finish();
		let prev = this.stack.pop();
		if (!prev) throw new Error("invalid state, fork stack empty");
		this.chunks = prev.chunks;
		this.buf = prev.buf;
		this.uint32(chunk.byteLength);
		return this.raw(chunk);
	}
	/**
	* Writes a tag (field number and wire type).
	*
	* Equivalent to `uint32( (fieldNo << 3 | type) >>> 0 )`.
	*
	* Generated code should compute the tag ahead of time and call `uint32()`.
	*/
	tag(fieldNo, type) {
		return this.uint32((fieldNo << 3 | type) >>> 0);
	}
	/**
	* Write a chunk of raw bytes.
	*/
	raw(chunk) {
		if (this.buf.length) {
			this.chunks.push(new Uint8Array(this.buf));
			this.buf = [];
		}
		this.chunks.push(chunk);
		return this;
	}
	/**
	* Write a `uint32` value, an unsigned 32 bit varint.
	*/
	uint32(value) {
		assertUInt32(value);
		while (value > 127) {
			this.buf.push(value & 127 | 128);
			value = value >>> 7;
		}
		this.buf.push(value);
		return this;
	}
	/**
	* Write a `int32` value, a signed 32 bit varint.
	*/
	int32(value) {
		assertInt32(value);
		varint32write(value, this.buf);
		return this;
	}
	/**
	* Write a `bool` value, a variant.
	*/
	bool(value) {
		this.buf.push(value ? 1 : 0);
		return this;
	}
	/**
	* Write a `bytes` value, length-delimited arbitrary data.
	*/
	bytes(value) {
		this.uint32(value.byteLength);
		return this.raw(value);
	}
	/**
	* Write a `string` value, length-delimited data converted to UTF-8 text.
	*/
	string(value) {
		let chunk = this.encodeUtf8(value);
		this.uint32(chunk.byteLength);
		return this.raw(chunk);
	}
	/**
	* Write a `float` value, 32-bit floating point number.
	*/
	float(value) {
		assertFloat32(value);
		let chunk = new Uint8Array(4);
		new DataView(chunk.buffer).setFloat32(0, value, true);
		return this.raw(chunk);
	}
	/**
	* Write a `double` value, a 64-bit floating point number.
	*/
	double(value) {
		let chunk = new Uint8Array(8);
		new DataView(chunk.buffer).setFloat64(0, value, true);
		return this.raw(chunk);
	}
	/**
	* Write a `fixed32` value, an unsigned, fixed-length 32-bit integer.
	*/
	fixed32(value) {
		assertUInt32(value);
		let chunk = new Uint8Array(4);
		new DataView(chunk.buffer).setUint32(0, value, true);
		return this.raw(chunk);
	}
	/**
	* Write a `sfixed32` value, a signed, fixed-length 32-bit integer.
	*/
	sfixed32(value) {
		assertInt32(value);
		let chunk = new Uint8Array(4);
		new DataView(chunk.buffer).setInt32(0, value, true);
		return this.raw(chunk);
	}
	/**
	* Write a `sint32` value, a signed, zigzag-encoded 32-bit varint.
	*/
	sint32(value) {
		assertInt32(value);
		value = (value << 1 ^ value >> 31) >>> 0;
		varint32write(value, this.buf);
		return this;
	}
	/**
	* Write a `fixed64` value, a signed, fixed-length 64-bit integer.
	*/
	sfixed64(value) {
		let chunk = new Uint8Array(8), view = new DataView(chunk.buffer), tc = protoInt64.enc(value);
		view.setInt32(0, tc.lo, true);
		view.setInt32(4, tc.hi, true);
		return this.raw(chunk);
	}
	/**
	* Write a `fixed64` value, an unsigned, fixed-length 64 bit integer.
	*/
	fixed64(value) {
		let chunk = new Uint8Array(8), view = new DataView(chunk.buffer), tc = protoInt64.uEnc(value);
		view.setInt32(0, tc.lo, true);
		view.setInt32(4, tc.hi, true);
		return this.raw(chunk);
	}
	/**
	* Write a `int64` value, a signed 64-bit varint.
	*/
	int64(value) {
		let tc = protoInt64.enc(value);
		varint64write(tc.lo, tc.hi, this.buf);
		return this;
	}
	/**
	* Write a `sint64` value, a signed, zig-zag-encoded 64-bit varint.
	*/
	sint64(value) {
		const tc = protoInt64.enc(value), sign = tc.hi >> 31;
		varint64write(tc.lo << 1 ^ sign, (tc.hi << 1 | tc.lo >>> 31) ^ sign, this.buf);
		return this;
	}
	/**
	* Write a `uint64` value, an unsigned 64-bit varint.
	*/
	uint64(value) {
		const tc = protoInt64.uEnc(value);
		varint64write(tc.lo, tc.hi, this.buf);
		return this;
	}
};
var BinaryReader = class {
	constructor(buf, decodeUtf8 = getTextEncoding().decodeUtf8) {
		this.decodeUtf8 = decodeUtf8;
		this.varint64 = varint64read;
		/**
		* Read a `uint32` field, an unsigned 32 bit varint.
		*/
		this.uint32 = varint32read;
		this.buf = buf;
		this.len = buf.length;
		this.pos = 0;
		this.view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
	}
	/**
	* Reads a tag - field number and wire type.
	*/
	tag() {
		let tag = this.uint32(), fieldNo = tag >>> 3, wireType = tag & 7;
		if (fieldNo <= 0 || wireType < 0 || wireType > 5) throw new Error("illegal tag: field no " + fieldNo + " wire type " + wireType);
		return [fieldNo, wireType];
	}
	/**
	* Skip one element and return the skipped data.
	*
	* When skipping StartGroup, provide the tags field number to check for
	* matching field number in the EndGroup tag.
	*/
	skip(wireType, fieldNo) {
		let start = this.pos;
		switch (wireType) {
			case WireType.Varint:
				while (this.buf[this.pos++] & 128);
				break;
			case WireType.Bit64: this.pos += 4;
			case WireType.Bit32:
				this.pos += 4;
				break;
			case WireType.LengthDelimited:
				let len = this.uint32();
				this.pos += len;
				break;
			case WireType.StartGroup:
				for (;;) {
					const [fn, wt] = this.tag();
					if (wt === WireType.EndGroup) {
						if (fieldNo !== void 0 && fn !== fieldNo) throw new Error("invalid end group tag");
						break;
					}
					this.skip(wt, fn);
				}
				break;
			default: throw new Error("cant skip wire type " + wireType);
		}
		this.assertBounds();
		return this.buf.subarray(start, this.pos);
	}
	/**
	* Throws error if position in byte array is out of range.
	*/
	assertBounds() {
		if (this.pos > this.len) throw new RangeError("premature EOF");
	}
	/**
	* Read a `int32` field, a signed 32 bit varint.
	*/
	int32() {
		return this.uint32() | 0;
	}
	/**
	* Read a `sint32` field, a signed, zigzag-encoded 32-bit varint.
	*/
	sint32() {
		let zze = this.uint32();
		return zze >>> 1 ^ -(zze & 1);
	}
	/**
	* Read a `int64` field, a signed 64-bit varint.
	*/
	int64() {
		return protoInt64.dec(...this.varint64());
	}
	/**
	* Read a `uint64` field, an unsigned 64-bit varint.
	*/
	uint64() {
		return protoInt64.uDec(...this.varint64());
	}
	/**
	* Read a `sint64` field, a signed, zig-zag-encoded 64-bit varint.
	*/
	sint64() {
		let [lo, hi] = this.varint64();
		let s = -(lo & 1);
		lo = (lo >>> 1 | (hi & 1) << 31) ^ s;
		hi = hi >>> 1 ^ s;
		return protoInt64.dec(lo, hi);
	}
	/**
	* Read a `bool` field, a variant.
	*/
	bool() {
		let [lo, hi] = this.varint64();
		return lo !== 0 || hi !== 0;
	}
	/**
	* Read a `fixed32` field, an unsigned, fixed-length 32-bit integer.
	*/
	fixed32() {
		return this.view.getUint32((this.pos += 4) - 4, true);
	}
	/**
	* Read a `sfixed32` field, a signed, fixed-length 32-bit integer.
	*/
	sfixed32() {
		return this.view.getInt32((this.pos += 4) - 4, true);
	}
	/**
	* Read a `fixed64` field, an unsigned, fixed-length 64 bit integer.
	*/
	fixed64() {
		return protoInt64.uDec(this.sfixed32(), this.sfixed32());
	}
	/**
	* Read a `fixed64` field, a signed, fixed-length 64-bit integer.
	*/
	sfixed64() {
		return protoInt64.dec(this.sfixed32(), this.sfixed32());
	}
	/**
	* Read a `float` field, 32-bit floating point number.
	*/
	float() {
		return this.view.getFloat32((this.pos += 4) - 4, true);
	}
	/**
	* Read a `double` field, a 64-bit floating point number.
	*/
	double() {
		return this.view.getFloat64((this.pos += 8) - 8, true);
	}
	/**
	* Read a `bytes` field, length-delimited arbitrary data.
	*/
	bytes() {
		let len = this.uint32(), start = this.pos;
		this.pos += len;
		this.assertBounds();
		return this.buf.subarray(start, start + len);
	}
	/**
	* Read a `string` field, length-delimited data converted to UTF-8 text.
	*/
	string() {
		return this.decodeUtf8(this.bytes());
	}
};
/**
* Assert a valid signed protobuf 32-bit integer as a number or string.
*/
function assertInt32(arg) {
	if (typeof arg == "string") arg = Number(arg);
	else if (typeof arg != "number") throw new Error("invalid int32: " + typeof arg);
	if (!Number.isInteger(arg) || arg > 2147483647 || arg < -2147483648) throw new Error("invalid int32: " + arg);
}
/**
* Assert a valid unsigned protobuf 32-bit integer as a number or string.
*/
function assertUInt32(arg) {
	if (typeof arg == "string") arg = Number(arg);
	else if (typeof arg != "number") throw new Error("invalid uint32: " + typeof arg);
	if (!Number.isInteger(arg) || arg > 4294967295 || arg < 0) throw new Error("invalid uint32: " + arg);
}
/**
* Assert a valid protobuf float value as a number or string.
*/
function assertFloat32(arg) {
	if (typeof arg == "string") {
		const o = arg;
		arg = Number(arg);
		if (Number.isNaN(arg) && o !== "NaN") throw new Error("invalid float32: " + o);
	} else if (typeof arg != "number") throw new Error("invalid float32: " + typeof arg);
	if (Number.isFinite(arg) && (arg > 34028234663852886e22 || arg < -34028234663852886e22)) throw new Error("invalid float32: " + arg);
}
//#endregion
//#region ../../node_modules/@connectrpc/connect-web/node_modules/@bufbuild/protobuf/dist/esm/reflect/reflect-check.js
/**
* Check whether the given field value is valid for the reflect API.
*/
function checkField(field, value) {
	const check = field.fieldKind == "list" ? isReflectList(value, field) : field.fieldKind == "map" ? isReflectMap(value, field) : checkSingular(field, value);
	if (check === true) return;
	let reason;
	switch (field.fieldKind) {
		case "list":
			reason = `expected ${formatReflectList(field)}, got ${formatVal(value)}`;
			break;
		case "map":
			reason = `expected ${formatReflectMap(field)}, got ${formatVal(value)}`;
			break;
		default: reason = reasonSingular(field, value, check);
	}
	return new FieldError(field, reason);
}
/**
* Check whether the given list item is valid for the reflect API.
*/
function checkListItem(field, index, value) {
	const check = checkSingular(field, value);
	if (check !== true) return new FieldError(field, `list item #${index + 1}: ${reasonSingular(field, value, check)}`);
}
/**
* Check whether the given map key and value are valid for the reflect API.
*/
function checkMapEntry(field, key, value) {
	const checkKey = checkScalarValue(key, field.mapKey);
	if (checkKey !== true) return new FieldError(field, `invalid map key: ${reasonSingular({ scalar: field.mapKey }, key, checkKey)}`);
	const checkVal = checkSingular(field, value);
	if (checkVal !== true) return new FieldError(field, `map entry ${formatVal(key)}: ${reasonSingular(field, value, checkVal)}`);
}
function checkSingular(field, value) {
	if (field.scalar !== void 0) return checkScalarValue(value, field.scalar);
	if (field.enum !== void 0) {
		if (field.enum.open) return Number.isInteger(value);
		return field.enum.values.some((v) => v.number === value);
	}
	return isReflectMessage(value, field.message);
}
function checkScalarValue(value, scalar) {
	switch (scalar) {
		case ScalarType.DOUBLE: return typeof value == "number";
		case ScalarType.FLOAT:
			if (typeof value != "number") return false;
			if (Number.isNaN(value) || !Number.isFinite(value)) return true;
			if (value > 34028234663852886e22 || value < -34028234663852886e22) return `${value.toFixed()} out of range`;
			return true;
		case ScalarType.INT32:
		case ScalarType.SFIXED32:
		case ScalarType.SINT32:
			if (typeof value !== "number" || !Number.isInteger(value)) return false;
			if (value > 2147483647 || value < -2147483648) return `${value.toFixed()} out of range`;
			return true;
		case ScalarType.FIXED32:
		case ScalarType.UINT32:
			if (typeof value !== "number" || !Number.isInteger(value)) return false;
			if (value > 4294967295 || value < 0) return `${value.toFixed()} out of range`;
			return true;
		case ScalarType.BOOL: return typeof value == "boolean";
		case ScalarType.STRING:
			if (typeof value != "string") return false;
			return getTextEncoding().checkUtf8(value) || "invalid UTF8";
		case ScalarType.BYTES: return value instanceof Uint8Array;
		case ScalarType.INT64:
		case ScalarType.SFIXED64:
		case ScalarType.SINT64:
			if (typeof value == "bigint" || typeof value == "number" || typeof value == "string" && value.length > 0) try {
				protoInt64.parse(value);
				return true;
			} catch (_) {
				return `${value} out of range`;
			}
			return false;
		case ScalarType.FIXED64:
		case ScalarType.UINT64:
			if (typeof value == "bigint" || typeof value == "number" || typeof value == "string" && value.length > 0) try {
				protoInt64.uParse(value);
				return true;
			} catch (_) {
				return `${value} out of range`;
			}
			return false;
	}
}
function reasonSingular(field, val, details) {
	details = typeof details == "string" ? `: ${details}` : `, got ${formatVal(val)}`;
	if (field.scalar !== void 0) return `expected ${scalarTypeDescription(field.scalar)}` + details;
	if (field.enum !== void 0) return `expected ${field.enum.toString()}` + details;
	return `expected ${formatReflectMessage(field.message)}` + details;
}
function formatVal(val) {
	switch (typeof val) {
		case "object":
			if (val === null) return "null";
			if (val instanceof Uint8Array) return `Uint8Array(${val.length})`;
			if (Array.isArray(val)) return `Array(${val.length})`;
			if (isReflectList(val)) return formatReflectList(val.field());
			if (isReflectMap(val)) return formatReflectMap(val.field());
			if (isReflectMessage(val)) return formatReflectMessage(val.desc);
			if (isMessage(val)) return `message ${val.$typeName}`;
			return "object";
		case "string": return val.length > 30 ? "string" : `"${val.split("\"").join("\\\"")}"`;
		case "boolean": return String(val);
		case "number": return String(val);
		case "bigint": return String(val) + "n";
		default: return typeof val;
	}
}
function formatReflectMessage(desc) {
	return `ReflectMessage (${desc.typeName})`;
}
function formatReflectList(field) {
	switch (field.listKind) {
		case "message": return `ReflectList (${field.message.toString()})`;
		case "enum": return `ReflectList (${field.enum.toString()})`;
		case "scalar": return `ReflectList (${ScalarType[field.scalar]})`;
	}
}
function formatReflectMap(field) {
	switch (field.mapKind) {
		case "message": return `ReflectMap (${ScalarType[field.mapKey]}, ${field.message.toString()})`;
		case "enum": return `ReflectMap (${ScalarType[field.mapKey]}, ${field.enum.toString()})`;
		case "scalar": return `ReflectMap (${ScalarType[field.mapKey]}, ${ScalarType[field.scalar]})`;
	}
}
function scalarTypeDescription(scalar) {
	switch (scalar) {
		case ScalarType.STRING: return "string";
		case ScalarType.BOOL: return "boolean";
		case ScalarType.INT64:
		case ScalarType.SINT64:
		case ScalarType.SFIXED64: return "bigint (int64)";
		case ScalarType.UINT64:
		case ScalarType.FIXED64: return "bigint (uint64)";
		case ScalarType.BYTES: return "Uint8Array";
		case ScalarType.DOUBLE: return "number (float64)";
		case ScalarType.FLOAT: return "number (float32)";
		case ScalarType.FIXED32:
		case ScalarType.UINT32: return "number (uint32)";
		case ScalarType.INT32:
		case ScalarType.SFIXED32:
		case ScalarType.SINT32: return "number (int32)";
	}
}
//#endregion
//#region ../../node_modules/@connectrpc/connect-web/node_modules/@bufbuild/protobuf/dist/esm/reflect/reflect.js
/**
* Create a ReflectMessage.
*/
function reflect(messageDesc, message, check = true) {
	return new ReflectMessageImpl(messageDesc, message, check);
}
var ReflectMessageImpl = class {
	get sortedFields() {
		var _a;
		return (_a = this._sortedFields) !== null && _a !== void 0 ? _a : this._sortedFields = this.desc.fields.concat().sort((a, b) => a.number - b.number);
	}
	constructor(messageDesc, message, check = true) {
		this.lists = /* @__PURE__ */ new Map();
		this.maps = /* @__PURE__ */ new Map();
		this.check = check;
		this.desc = messageDesc;
		this.message = this[unsafeLocal] = message !== null && message !== void 0 ? message : create(messageDesc);
		this.fields = messageDesc.fields;
		this.oneofs = messageDesc.oneofs;
		this.members = messageDesc.members;
	}
	findNumber(number) {
		if (!this._fieldsByNumber) this._fieldsByNumber = new Map(this.desc.fields.map((f) => [f.number, f]));
		return this._fieldsByNumber.get(number);
	}
	oneofCase(oneof) {
		assertOwn(this.message, oneof);
		return unsafeOneofCase(this.message, oneof);
	}
	isSet(field) {
		assertOwn(this.message, field);
		return unsafeIsSet(this.message, field);
	}
	clear(field) {
		assertOwn(this.message, field);
		unsafeClear(this.message, field);
	}
	get(field) {
		assertOwn(this.message, field);
		const value = unsafeGet(this.message, field);
		switch (field.fieldKind) {
			case "list":
				let list = this.lists.get(field);
				if (!list || list[unsafeLocal] !== value) this.lists.set(field, list = new ReflectListImpl(field, value, this.check));
				return list;
			case "map":
				let map = this.maps.get(field);
				if (!map || map[unsafeLocal] !== value) this.maps.set(field, map = new ReflectMapImpl(field, value, this.check));
				return map;
			case "message": return messageToReflect(field, value, this.check);
			case "scalar": return value === void 0 ? scalarZeroValue(field.scalar, false) : longToReflect(field, value);
			case "enum": return value !== null && value !== void 0 ? value : field.enum.values[0].number;
		}
	}
	set(field, value) {
		assertOwn(this.message, field);
		if (this.check) {
			const err = checkField(field, value);
			if (err) throw err;
		}
		let local;
		if (field.fieldKind == "message") local = messageToLocal(field, value);
		else if (isReflectMap(value) || isReflectList(value)) local = value[unsafeLocal];
		else local = longToLocal(field, value);
		unsafeSet(this.message, field, local);
	}
	getUnknown() {
		return this.message.$unknown;
	}
	setUnknown(value) {
		this.message.$unknown = value;
	}
};
function assertOwn(owner, member) {
	if (member.parent.typeName !== owner.$typeName) throw new FieldError(member, `cannot use ${member.toString()} with message ${owner.$typeName}`, "ForeignFieldError");
}
var ReflectListImpl = class {
	field() {
		return this._field;
	}
	get size() {
		return this._arr.length;
	}
	constructor(field, unsafeInput, check) {
		this._field = field;
		this._arr = this[unsafeLocal] = unsafeInput;
		this.check = check;
	}
	get(index) {
		const item = this._arr[index];
		return item === void 0 ? void 0 : listItemToReflect(this._field, item, this.check);
	}
	set(index, item) {
		if (index < 0 || index >= this._arr.length) throw new FieldError(this._field, `list item #${index + 1}: out of range`);
		if (this.check) {
			const err = checkListItem(this._field, index, item);
			if (err) throw err;
		}
		this._arr[index] = listItemToLocal(this._field, item);
	}
	add(item) {
		if (this.check) {
			const err = checkListItem(this._field, this._arr.length, item);
			if (err) throw err;
		}
		this._arr.push(listItemToLocal(this._field, item));
	}
	clear() {
		this._arr.splice(0, this._arr.length);
	}
	[Symbol.iterator]() {
		return this.values();
	}
	keys() {
		return this._arr.keys();
	}
	*values() {
		for (const item of this._arr) yield listItemToReflect(this._field, item, this.check);
	}
	*entries() {
		for (let i = 0; i < this._arr.length; i++) yield [i, listItemToReflect(this._field, this._arr[i], this.check)];
	}
};
var ReflectMapImpl = class {
	constructor(field, unsafeInput, check = true) {
		this.obj = this[unsafeLocal] = unsafeInput !== null && unsafeInput !== void 0 ? unsafeInput : {};
		this.check = check;
		this._field = field;
	}
	field() {
		return this._field;
	}
	set(key, value) {
		if (this.check) {
			const err = checkMapEntry(this._field, key, value);
			if (err) throw err;
		}
		this.obj[mapKeyToLocal(key)] = mapValueToLocal(this._field, value);
		return this;
	}
	delete(key) {
		const k = mapKeyToLocal(key);
		const has = Object.prototype.hasOwnProperty.call(this.obj, k);
		if (has) delete this.obj[k];
		return has;
	}
	clear() {
		for (const key of Object.keys(this.obj)) delete this.obj[key];
	}
	get(key) {
		let val = this.obj[mapKeyToLocal(key)];
		if (val !== void 0) val = mapValueToReflect(this._field, val, this.check);
		return val;
	}
	has(key) {
		return Object.prototype.hasOwnProperty.call(this.obj, mapKeyToLocal(key));
	}
	*keys() {
		for (const objKey of Object.keys(this.obj)) yield mapKeyToReflect(objKey, this._field.mapKey);
	}
	*entries() {
		for (const objEntry of Object.entries(this.obj)) yield [mapKeyToReflect(objEntry[0], this._field.mapKey), mapValueToReflect(this._field, objEntry[1], this.check)];
	}
	[Symbol.iterator]() {
		return this.entries();
	}
	get size() {
		return Object.keys(this.obj).length;
	}
	*values() {
		for (const val of Object.values(this.obj)) yield mapValueToReflect(this._field, val, this.check);
	}
	forEach(callbackfn, thisArg) {
		for (const mapEntry of this.entries()) callbackfn.call(thisArg, mapEntry[1], mapEntry[0], this);
	}
};
function messageToLocal(field, value) {
	if (!isReflectMessage(value)) return value;
	if (isWrapper(value.message) && !field.oneof && field.fieldKind == "message") return value.message.value;
	if (value.desc.typeName == "google.protobuf.Struct" && field.parent.typeName != "google.protobuf.Value") return wktStructToLocal(value.message);
	return value.message;
}
function messageToReflect(field, value, check) {
	if (value !== void 0) {
		if (isWrapperDesc(field.message) && !field.oneof && field.fieldKind == "message") value = {
			$typeName: field.message.typeName,
			value: longToReflect(field.message.fields[0], value)
		};
		else if (field.message.typeName == "google.protobuf.Struct" && field.parent.typeName != "google.protobuf.Value" && isObject(value)) value = wktStructToReflect(value);
	}
	return new ReflectMessageImpl(field.message, value, check);
}
function listItemToLocal(field, value) {
	if (field.listKind == "message") return messageToLocal(field, value);
	return longToLocal(field, value);
}
function listItemToReflect(field, value, check) {
	if (field.listKind == "message") return messageToReflect(field, value, check);
	return longToReflect(field, value);
}
function mapValueToLocal(field, value) {
	if (field.mapKind == "message") return messageToLocal(field, value);
	return longToLocal(field, value);
}
function mapValueToReflect(field, value, check) {
	if (field.mapKind == "message") return messageToReflect(field, value, check);
	return value;
}
function mapKeyToLocal(key) {
	return typeof key == "string" || typeof key == "number" ? key : String(key);
}
/**
* Converts a map key (any scalar value except float, double, or bytes) from its
* representation in a message (string or number, the only possible object key
* types) to the closest possible type in ECMAScript.
*/
function mapKeyToReflect(key, type) {
	switch (type) {
		case ScalarType.STRING: return key;
		case ScalarType.INT32:
		case ScalarType.FIXED32:
		case ScalarType.UINT32:
		case ScalarType.SFIXED32:
		case ScalarType.SINT32: {
			const n = Number.parseInt(key);
			if (Number.isFinite(n)) return n;
			break;
		}
		case ScalarType.BOOL:
			switch (key) {
				case "true": return true;
				case "false": return false;
			}
			break;
		case ScalarType.UINT64:
		case ScalarType.FIXED64:
			try {
				return protoInt64.uParse(key);
			} catch (_a) {}
			break;
		default:
			try {
				return protoInt64.parse(key);
			} catch (_b) {}
			break;
	}
	return key;
}
function longToReflect(field, value) {
	switch (field.scalar) {
		case ScalarType.INT64:
		case ScalarType.SFIXED64:
		case ScalarType.SINT64:
			if ("longAsString" in field && field.longAsString && typeof value == "string") value = protoInt64.parse(value);
			break;
		case ScalarType.FIXED64:
		case ScalarType.UINT64:
			if ("longAsString" in field && field.longAsString && typeof value == "string") value = protoInt64.uParse(value);
			break;
	}
	return value;
}
function longToLocal(field, value) {
	switch (field.scalar) {
		case ScalarType.INT64:
		case ScalarType.SFIXED64:
		case ScalarType.SINT64:
			if ("longAsString" in field && field.longAsString) value = String(value);
			else if (typeof value == "string" || typeof value == "number") value = protoInt64.parse(value);
			break;
		case ScalarType.FIXED64:
		case ScalarType.UINT64:
			if ("longAsString" in field && field.longAsString) value = String(value);
			else if (typeof value == "string" || typeof value == "number") value = protoInt64.uParse(value);
			break;
	}
	return value;
}
function wktStructToReflect(json) {
	const struct = {
		$typeName: "google.protobuf.Struct",
		fields: {}
	};
	if (isObject(json)) for (const [k, v] of Object.entries(json)) struct.fields[k] = wktValueToReflect(v);
	return struct;
}
function wktStructToLocal(val) {
	const json = {};
	for (const [k, v] of Object.entries(val.fields)) json[k] = wktValueToLocal(v);
	return json;
}
function wktValueToLocal(val) {
	switch (val.kind.case) {
		case "structValue": return wktStructToLocal(val.kind.value);
		case "listValue": return val.kind.value.values.map(wktValueToLocal);
		case "nullValue":
		case void 0: return null;
		default: return val.kind.value;
	}
}
function wktValueToReflect(json) {
	const value = {
		$typeName: "google.protobuf.Value",
		kind: { case: void 0 }
	};
	switch (typeof json) {
		case "number":
			value.kind = {
				case: "numberValue",
				value: json
			};
			break;
		case "string":
			value.kind = {
				case: "stringValue",
				value: json
			};
			break;
		case "boolean":
			value.kind = {
				case: "boolValue",
				value: json
			};
			break;
		case "object":
			if (json === null) value.kind = {
				case: "nullValue",
				value: 0
			};
			else if (Array.isArray(json)) {
				const listValue = {
					$typeName: "google.protobuf.ListValue",
					values: []
				};
				if (Array.isArray(json)) for (const e of json) listValue.values.push(wktValueToReflect(e));
				value.kind = {
					case: "listValue",
					value: listValue
				};
			} else value.kind = {
				case: "structValue",
				value: wktStructToReflect(json)
			};
			break;
	}
	return value;
}
//#endregion
//#region ../../node_modules/@connectrpc/connect-web/node_modules/@bufbuild/protobuf/dist/esm/wire/base64-encoding.js
/**
* Decodes a base64 string to a byte array.
*
* - ignores white-space, including line breaks and tabs
* - allows inner padding (can decode concatenated base64 strings)
* - does not require padding
* - understands base64url encoding:
*   "-" instead of "+",
*   "_" instead of "/",
*   no padding
*/
function base64Decode(base64Str) {
	const table = getDecodeTable();
	let es = base64Str.length * 3 / 4;
	if (base64Str[base64Str.length - 2] == "=") es -= 2;
	else if (base64Str[base64Str.length - 1] == "=") es -= 1;
	let bytes = new Uint8Array(es), bytePos = 0, groupPos = 0, b, p = 0;
	for (let i = 0; i < base64Str.length; i++) {
		b = table[base64Str.charCodeAt(i)];
		if (b === void 0) switch (base64Str[i]) {
			case "=": groupPos = 0;
			case "\n":
			case "\r":
			case "	":
			case " ": continue;
			default: throw Error("invalid base64 string");
		}
		switch (groupPos) {
			case 0:
				p = b;
				groupPos = 1;
				break;
			case 1:
				bytes[bytePos++] = p << 2 | (b & 48) >> 4;
				p = b;
				groupPos = 2;
				break;
			case 2:
				bytes[bytePos++] = (p & 15) << 4 | (b & 60) >> 2;
				p = b;
				groupPos = 3;
				break;
			case 3:
				bytes[bytePos++] = (p & 3) << 6 | b;
				groupPos = 0;
				break;
		}
	}
	if (groupPos == 1) throw Error("invalid base64 string");
	return bytes.subarray(0, bytePos);
}
var encodeTableStd;
var encodeTableUrl;
var decodeTable;
function getEncodeTable(encoding) {
	if (!encodeTableStd) {
		encodeTableStd = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
		encodeTableUrl = encodeTableStd.slice(0, -2).concat("-", "_");
	}
	return encoding == "url" ? encodeTableUrl : encodeTableStd;
}
function getDecodeTable() {
	if (!decodeTable) {
		decodeTable = [];
		const encodeTable = getEncodeTable("std");
		for (let i = 0; i < encodeTable.length; i++) decodeTable[encodeTable[i].charCodeAt(0)] = i;
		decodeTable["-".charCodeAt(0)] = encodeTable.indexOf("+");
		decodeTable["_".charCodeAt(0)] = encodeTable.indexOf("/");
	}
	return decodeTable;
}
//#endregion
//#region ../../node_modules/@connectrpc/connect-web/node_modules/@bufbuild/protobuf/dist/esm/reflect/names.js
/**
* Converts snake_case to protoCamelCase according to the convention
* used by protoc to convert a field name to a JSON name.
*/
function protoCamelCase(snakeCase) {
	let capNext = false;
	const b = [];
	for (let i = 0; i < snakeCase.length; i++) {
		let c = snakeCase.charAt(i);
		switch (c) {
			case "_":
				capNext = true;
				break;
			case "0":
			case "1":
			case "2":
			case "3":
			case "4":
			case "5":
			case "6":
			case "7":
			case "8":
			case "9":
				b.push(c);
				capNext = false;
				break;
			default:
				if (capNext) {
					capNext = false;
					c = c.toUpperCase();
				}
				b.push(c);
				break;
		}
	}
	return b.join("");
}
/**
* Names that cannot be used for object properties because they are reserved
* by built-in JavaScript properties.
*/
var reservedObjectProperties = new Set([
	"constructor",
	"toString",
	"toJSON",
	"valueOf"
]);
/**
* Escapes names that are reserved for ECMAScript built-in object properties.
*
* Also see safeIdentifier() from @bufbuild/protoplugin.
*/
function safeObjectProperty(name) {
	return reservedObjectProperties.has(name) ? name + "$" : name;
}
//#endregion
//#region ../../node_modules/@connectrpc/connect-web/node_modules/@bufbuild/protobuf/dist/esm/codegenv2/restore-json-names.js
/**
* @private
*/
function restoreJsonNames(message) {
	for (const f of message.field) if (!unsafeIsSetExplicit(f, "jsonName")) f.jsonName = protoCamelCase(f.name);
	message.nestedType.forEach(restoreJsonNames);
}
//#endregion
//#region ../../node_modules/@connectrpc/connect-web/node_modules/@bufbuild/protobuf/dist/esm/wire/text-format.js
/**
* Parse an enum value from the Protobuf text format.
*
* @private
*/
function parseTextFormatEnumValue(descEnum, value) {
	const enumValue = descEnum.values.find((v) => v.name === value);
	if (!enumValue) throw new Error(`cannot parse ${descEnum} default value: ${value}`);
	return enumValue.number;
}
/**
* Parse a scalar value from the Protobuf text format.
*
* @private
*/
function parseTextFormatScalarValue(type, value) {
	switch (type) {
		case ScalarType.STRING: return value;
		case ScalarType.BYTES: {
			const u = unescapeBytesDefaultValue(value);
			if (u === false) throw new Error(`cannot parse ${ScalarType[type]} default value: ${value}`);
			return u;
		}
		case ScalarType.INT64:
		case ScalarType.SFIXED64:
		case ScalarType.SINT64: return protoInt64.parse(value);
		case ScalarType.UINT64:
		case ScalarType.FIXED64: return protoInt64.uParse(value);
		case ScalarType.DOUBLE:
		case ScalarType.FLOAT: switch (value) {
			case "inf": return Number.POSITIVE_INFINITY;
			case "-inf": return Number.NEGATIVE_INFINITY;
			case "nan": return NaN;
			default: return parseFloat(value);
		}
		case ScalarType.BOOL: return value === "true";
		case ScalarType.INT32:
		case ScalarType.UINT32:
		case ScalarType.SINT32:
		case ScalarType.FIXED32:
		case ScalarType.SFIXED32: return parseInt(value, 10);
	}
}
/**
* Parses a text-encoded default value (proto2) of a BYTES field.
*/
function unescapeBytesDefaultValue(str) {
	const b = [];
	const input = {
		tail: str,
		c: "",
		next() {
			if (this.tail.length == 0) return false;
			this.c = this.tail[0];
			this.tail = this.tail.substring(1);
			return true;
		},
		take(n) {
			if (this.tail.length >= n) {
				const r = this.tail.substring(0, n);
				this.tail = this.tail.substring(n);
				return r;
			}
			return false;
		}
	};
	while (input.next()) switch (input.c) {
		case "\\":
			if (input.next()) switch (input.c) {
				case "\\":
					b.push(input.c.charCodeAt(0));
					break;
				case "b":
					b.push(8);
					break;
				case "f":
					b.push(12);
					break;
				case "n":
					b.push(10);
					break;
				case "r":
					b.push(13);
					break;
				case "t":
					b.push(9);
					break;
				case "v":
					b.push(11);
					break;
				case "0":
				case "1":
				case "2":
				case "3":
				case "4":
				case "5":
				case "6":
				case "7": {
					const s = input.c;
					const t = input.take(2);
					if (t === false) return false;
					const n = parseInt(s + t, 8);
					if (Number.isNaN(n)) return false;
					b.push(n);
					break;
				}
				case "x": {
					const s = input.c;
					const t = input.take(2);
					if (t === false) return false;
					const n = parseInt(s + t, 16);
					if (Number.isNaN(n)) return false;
					b.push(n);
					break;
				}
				case "u": {
					const s = input.c;
					const t = input.take(4);
					if (t === false) return false;
					const n = parseInt(s + t, 16);
					if (Number.isNaN(n)) return false;
					const chunk = new Uint8Array(4);
					new DataView(chunk.buffer).setInt32(0, n, true);
					b.push(chunk[0], chunk[1], chunk[2], chunk[3]);
					break;
				}
				case "U": {
					const s = input.c;
					const t = input.take(8);
					if (t === false) return false;
					const tc = protoInt64.uEnc(s + t);
					const chunk = new Uint8Array(8);
					const view = new DataView(chunk.buffer);
					view.setInt32(0, tc.lo, true);
					view.setInt32(4, tc.hi, true);
					b.push(chunk[0], chunk[1], chunk[2], chunk[3], chunk[4], chunk[5], chunk[6], chunk[7]);
					break;
				}
			}
			break;
		default: b.push(input.c.charCodeAt(0));
	}
	return new Uint8Array(b);
}
//#endregion
//#region ../../node_modules/@connectrpc/connect-web/node_modules/@bufbuild/protobuf/dist/esm/reflect/nested-types.js
/**
* Iterate over all types - enumerations, extensions, services, messages -
* and enumerations, extensions and messages nested in messages.
*/
function* nestedTypes(desc) {
	switch (desc.kind) {
		case "file":
			for (const message of desc.messages) {
				yield message;
				yield* nestedTypes(message);
			}
			yield* desc.enums;
			yield* desc.services;
			yield* desc.extensions;
			break;
		case "message":
			for (const message of desc.nestedMessages) {
				yield message;
				yield* nestedTypes(message);
			}
			yield* desc.nestedEnums;
			yield* desc.nestedExtensions;
			break;
	}
}
//#endregion
//#region ../../node_modules/@connectrpc/connect-web/node_modules/@bufbuild/protobuf/dist/esm/registry.js
function createFileRegistry(...args) {
	const registry = createBaseRegistry();
	if (!args.length) return registry;
	if ("$typeName" in args[0] && args[0].$typeName == "google.protobuf.FileDescriptorSet") {
		for (const file of args[0].file) addFile(file, registry);
		return registry;
	}
	if ("$typeName" in args[0]) {
		const input = args[0];
		const resolve = args[1];
		const seen = /* @__PURE__ */ new Set();
		function recurseDeps(file) {
			const deps = [];
			for (const protoFileName of file.dependency) {
				if (registry.getFile(protoFileName) != void 0) continue;
				if (seen.has(protoFileName)) continue;
				const dep = resolve(protoFileName);
				if (!dep) throw new Error(`Unable to resolve ${protoFileName}, imported by ${file.name}`);
				if ("kind" in dep) registry.addFile(dep, false, true);
				else {
					seen.add(dep.name);
					deps.push(dep);
				}
			}
			return deps.concat(...deps.map(recurseDeps));
		}
		for (const file of [input, ...recurseDeps(input)].reverse()) addFile(file, registry);
	} else for (const fileReg of args) for (const file of fileReg.files) registry.addFile(file);
	return registry;
}
/**
* @private
*/
function createBaseRegistry() {
	const types = /* @__PURE__ */ new Map();
	const extendees = /* @__PURE__ */ new Map();
	const files = /* @__PURE__ */ new Map();
	return {
		kind: "registry",
		types,
		extendees,
		[Symbol.iterator]() {
			return types.values();
		},
		get files() {
			return files.values();
		},
		addFile(file, skipTypes, withDeps) {
			files.set(file.proto.name, file);
			if (!skipTypes) for (const type of nestedTypes(file)) this.add(type);
			if (withDeps) for (const f of file.dependencies) this.addFile(f, skipTypes, withDeps);
		},
		add(desc) {
			if (desc.kind == "extension") {
				let numberToExt = extendees.get(desc.extendee.typeName);
				if (!numberToExt) extendees.set(desc.extendee.typeName, numberToExt = /* @__PURE__ */ new Map());
				numberToExt.set(desc.number, desc);
			}
			types.set(desc.typeName, desc);
		},
		get(typeName) {
			return types.get(typeName);
		},
		getFile(fileName) {
			return files.get(fileName);
		},
		getMessage(typeName) {
			const t = types.get(typeName);
			return (t === null || t === void 0 ? void 0 : t.kind) == "message" ? t : void 0;
		},
		getEnum(typeName) {
			const t = types.get(typeName);
			return (t === null || t === void 0 ? void 0 : t.kind) == "enum" ? t : void 0;
		},
		getExtension(typeName) {
			const t = types.get(typeName);
			return (t === null || t === void 0 ? void 0 : t.kind) == "extension" ? t : void 0;
		},
		getExtensionFor(extendee, no) {
			var _a;
			return (_a = extendees.get(extendee.typeName)) === null || _a === void 0 ? void 0 : _a.get(no);
		},
		getService(typeName) {
			const t = types.get(typeName);
			return (t === null || t === void 0 ? void 0 : t.kind) == "service" ? t : void 0;
		}
	};
}
var EDITION_PROTO2 = 998;
var EDITION_PROTO3 = 999;
var TYPE_STRING = 9;
var TYPE_GROUP = 10;
var TYPE_MESSAGE = 11;
var TYPE_BYTES = 12;
var TYPE_ENUM = 14;
var LABEL_REPEATED = 3;
var LABEL_REQUIRED = 2;
var JS_STRING = 1;
var IDEMPOTENCY_UNKNOWN = 0;
var EXPLICIT = 1;
var IMPLICIT = 2;
var LEGACY_REQUIRED$1 = 3;
var PACKED = 1;
var DELIMITED = 2;
var OPEN = 1;
var featureDefaults = {
	998: {
		fieldPresence: 1,
		enumType: 2,
		repeatedFieldEncoding: 2,
		utf8Validation: 3,
		messageEncoding: 1,
		jsonFormat: 2,
		enforceNamingStyle: 2,
		defaultSymbolVisibility: 1
	},
	999: {
		fieldPresence: 2,
		enumType: 1,
		repeatedFieldEncoding: 1,
		utf8Validation: 2,
		messageEncoding: 1,
		jsonFormat: 1,
		enforceNamingStyle: 2,
		defaultSymbolVisibility: 1
	},
	1e3: {
		fieldPresence: 1,
		enumType: 1,
		repeatedFieldEncoding: 1,
		utf8Validation: 2,
		messageEncoding: 1,
		jsonFormat: 1,
		enforceNamingStyle: 2,
		defaultSymbolVisibility: 1
	},
	1001: {
		fieldPresence: 1,
		enumType: 1,
		repeatedFieldEncoding: 1,
		utf8Validation: 2,
		messageEncoding: 1,
		jsonFormat: 1,
		enforceNamingStyle: 1,
		defaultSymbolVisibility: 2
	}
};
/**
* Create a descriptor for a file, add it to the registry.
*/
function addFile(proto, reg) {
	var _a, _b;
	const file = {
		kind: "file",
		proto,
		deprecated: (_b = (_a = proto.options) === null || _a === void 0 ? void 0 : _a.deprecated) !== null && _b !== void 0 ? _b : false,
		edition: getFileEdition(proto),
		name: proto.name.replace(/\.proto$/, ""),
		dependencies: findFileDependencies(proto, reg),
		enums: [],
		messages: [],
		extensions: [],
		services: [],
		toString() {
			return `file ${proto.name}`;
		}
	};
	const mapEntriesStore = /* @__PURE__ */ new Map();
	const mapEntries = {
		get(typeName) {
			return mapEntriesStore.get(typeName);
		},
		add(desc) {
			var _a;
			assert(((_a = desc.proto.options) === null || _a === void 0 ? void 0 : _a.mapEntry) === true);
			mapEntriesStore.set(desc.typeName, desc);
		}
	};
	for (const enumProto of proto.enumType) addEnum(enumProto, file, void 0, reg);
	for (const messageProto of proto.messageType) addMessage(messageProto, file, void 0, reg, mapEntries);
	for (const serviceProto of proto.service) addService(serviceProto, file, reg);
	addExtensions(file, reg);
	for (const mapEntry of mapEntriesStore.values()) addFields(mapEntry, reg, mapEntries);
	for (const message of file.messages) {
		addFields(message, reg, mapEntries);
		addExtensions(message, reg);
	}
	reg.addFile(file, true);
}
/**
* Create descriptors for extensions, and add them to the message / file,
* and to our cart.
* Recurses into nested types.
*/
function addExtensions(desc, reg) {
	switch (desc.kind) {
		case "file":
			for (const proto of desc.proto.extension) {
				const ext = newField(proto, desc, reg);
				desc.extensions.push(ext);
				reg.add(ext);
			}
			break;
		case "message":
			for (const proto of desc.proto.extension) {
				const ext = newField(proto, desc, reg);
				desc.nestedExtensions.push(ext);
				reg.add(ext);
			}
			for (const message of desc.nestedMessages) addExtensions(message, reg);
			break;
	}
}
/**
* Create descriptors for fields and oneof groups, and add them to the message.
* Recurses into nested types.
*/
function addFields(message, reg, mapEntries) {
	const allOneofs = message.proto.oneofDecl.map((proto) => newOneof(proto, message));
	const oneofsSeen = /* @__PURE__ */ new Set();
	for (const proto of message.proto.field) {
		const oneof = findOneof(proto, allOneofs);
		const field = newField(proto, message, reg, oneof, mapEntries);
		message.fields.push(field);
		message.field[field.localName] = field;
		if (oneof === void 0) message.members.push(field);
		else {
			oneof.fields.push(field);
			if (!oneofsSeen.has(oneof)) {
				oneofsSeen.add(oneof);
				message.members.push(oneof);
			}
		}
	}
	for (const oneof of allOneofs.filter((o) => oneofsSeen.has(o))) message.oneofs.push(oneof);
	for (const child of message.nestedMessages) addFields(child, reg, mapEntries);
}
/**
* Create a descriptor for an enumeration, and add it our cart and to the
* parent type, if any.
*/
function addEnum(proto, file, parent, reg) {
	var _a, _b, _c, _d, _e;
	const sharedPrefix = findEnumSharedPrefix(proto.name, proto.value);
	const desc = {
		kind: "enum",
		proto,
		deprecated: (_b = (_a = proto.options) === null || _a === void 0 ? void 0 : _a.deprecated) !== null && _b !== void 0 ? _b : false,
		file,
		parent,
		open: true,
		name: proto.name,
		typeName: makeTypeName(proto, parent, file),
		value: {},
		values: [],
		sharedPrefix,
		toString() {
			return `enum ${this.typeName}`;
		}
	};
	desc.open = isEnumOpen(desc);
	reg.add(desc);
	for (const p of proto.value) {
		const name = p.name;
		desc.values.push(desc.value[p.number] = {
			kind: "enum_value",
			proto: p,
			deprecated: (_d = (_c = p.options) === null || _c === void 0 ? void 0 : _c.deprecated) !== null && _d !== void 0 ? _d : false,
			parent: desc,
			name,
			localName: safeObjectProperty(sharedPrefix == void 0 ? name : name.substring(sharedPrefix.length)),
			number: p.number,
			toString() {
				return `enum value ${desc.typeName}.${name}`;
			}
		});
	}
	((_e = parent === null || parent === void 0 ? void 0 : parent.nestedEnums) !== null && _e !== void 0 ? _e : file.enums).push(desc);
}
/**
* Create a descriptor for a message, including nested types, and add it to our
* cart. Note that this does not create descriptors fields.
*/
function addMessage(proto, file, parent, reg, mapEntries) {
	var _a, _b, _c, _d;
	const desc = {
		kind: "message",
		proto,
		deprecated: (_b = (_a = proto.options) === null || _a === void 0 ? void 0 : _a.deprecated) !== null && _b !== void 0 ? _b : false,
		file,
		parent,
		name: proto.name,
		typeName: makeTypeName(proto, parent, file),
		fields: [],
		field: {},
		oneofs: [],
		members: [],
		nestedEnums: [],
		nestedMessages: [],
		nestedExtensions: [],
		toString() {
			return `message ${this.typeName}`;
		}
	};
	if (((_c = proto.options) === null || _c === void 0 ? void 0 : _c.mapEntry) === true) mapEntries.add(desc);
	else {
		((_d = parent === null || parent === void 0 ? void 0 : parent.nestedMessages) !== null && _d !== void 0 ? _d : file.messages).push(desc);
		reg.add(desc);
	}
	for (const enumProto of proto.enumType) addEnum(enumProto, file, desc, reg);
	for (const messageProto of proto.nestedType) addMessage(messageProto, file, desc, reg, mapEntries);
}
/**
* Create a descriptor for a service, including methods, and add it to our
* cart.
*/
function addService(proto, file, reg) {
	var _a, _b;
	const desc = {
		kind: "service",
		proto,
		deprecated: (_b = (_a = proto.options) === null || _a === void 0 ? void 0 : _a.deprecated) !== null && _b !== void 0 ? _b : false,
		file,
		name: proto.name,
		typeName: makeTypeName(proto, void 0, file),
		methods: [],
		method: {},
		toString() {
			return `service ${this.typeName}`;
		}
	};
	file.services.push(desc);
	reg.add(desc);
	for (const methodProto of proto.method) {
		const method = newMethod(methodProto, desc, reg);
		desc.methods.push(method);
		desc.method[method.localName] = method;
	}
}
/**
* Create a descriptor for a method.
*/
function newMethod(proto, parent, reg) {
	var _a, _b, _c, _d;
	let methodKind;
	if (proto.clientStreaming && proto.serverStreaming) methodKind = "bidi_streaming";
	else if (proto.clientStreaming) methodKind = "client_streaming";
	else if (proto.serverStreaming) methodKind = "server_streaming";
	else methodKind = "unary";
	const input = reg.getMessage(trimLeadingDot(proto.inputType));
	const output = reg.getMessage(trimLeadingDot(proto.outputType));
	assert(input, `invalid MethodDescriptorProto: input_type ${proto.inputType} not found`);
	assert(output, `invalid MethodDescriptorProto: output_type ${proto.inputType} not found`);
	const name = proto.name;
	return {
		kind: "rpc",
		proto,
		deprecated: (_b = (_a = proto.options) === null || _a === void 0 ? void 0 : _a.deprecated) !== null && _b !== void 0 ? _b : false,
		parent,
		name,
		localName: safeObjectProperty(name.length ? safeObjectProperty(name[0].toLowerCase() + name.substring(1)) : name),
		methodKind,
		input,
		output,
		idempotency: (_d = (_c = proto.options) === null || _c === void 0 ? void 0 : _c.idempotencyLevel) !== null && _d !== void 0 ? _d : IDEMPOTENCY_UNKNOWN,
		toString() {
			return `rpc ${parent.typeName}.${name}`;
		}
	};
}
/**
* Create a descriptor for a oneof group.
*/
function newOneof(proto, parent) {
	return {
		kind: "oneof",
		proto,
		deprecated: false,
		parent,
		fields: [],
		name: proto.name,
		localName: safeObjectProperty(protoCamelCase(proto.name)),
		toString() {
			return `oneof ${parent.typeName}.${this.name}`;
		}
	};
}
function newField(proto, parentOrFile, reg, oneof, mapEntries) {
	var _a, _b, _c;
	const isExtension = mapEntries === void 0;
	const field = {
		kind: "field",
		proto,
		deprecated: (_b = (_a = proto.options) === null || _a === void 0 ? void 0 : _a.deprecated) !== null && _b !== void 0 ? _b : false,
		name: proto.name,
		number: proto.number,
		scalar: void 0,
		message: void 0,
		enum: void 0,
		presence: getFieldPresence(proto, oneof, isExtension, parentOrFile),
		listKind: void 0,
		mapKind: void 0,
		mapKey: void 0,
		delimitedEncoding: void 0,
		packed: void 0,
		longAsString: false,
		getDefaultValue: void 0
	};
	if (isExtension) {
		const file = parentOrFile.kind == "file" ? parentOrFile : parentOrFile.file;
		const parent = parentOrFile.kind == "file" ? void 0 : parentOrFile;
		const typeName = makeTypeName(proto, parent, file);
		field.kind = "extension";
		field.file = file;
		field.parent = parent;
		field.oneof = void 0;
		field.typeName = typeName;
		field.jsonName = `[${typeName}]`;
		field.toString = () => `extension ${typeName}`;
		const extendee = reg.getMessage(trimLeadingDot(proto.extendee));
		assert(extendee, `invalid FieldDescriptorProto: extendee ${proto.extendee} not found`);
		field.extendee = extendee;
	} else {
		const parent = parentOrFile;
		assert(parent.kind == "message");
		field.parent = parent;
		field.oneof = oneof;
		field.localName = oneof ? protoCamelCase(proto.name) : safeObjectProperty(protoCamelCase(proto.name));
		field.jsonName = proto.jsonName;
		field.toString = () => `field ${parent.typeName}.${proto.name}`;
	}
	const label = proto.label;
	const type = proto.type;
	const jstype = (_c = proto.options) === null || _c === void 0 ? void 0 : _c.jstype;
	if (label === LABEL_REPEATED) {
		const mapEntry = type == TYPE_MESSAGE ? mapEntries === null || mapEntries === void 0 ? void 0 : mapEntries.get(trimLeadingDot(proto.typeName)) : void 0;
		if (mapEntry) {
			field.fieldKind = "map";
			const { key, value } = findMapEntryFields(mapEntry);
			field.mapKey = key.scalar;
			field.mapKind = value.fieldKind;
			field.message = value.message;
			field.delimitedEncoding = false;
			field.enum = value.enum;
			field.scalar = value.scalar;
			return field;
		}
		field.fieldKind = "list";
		switch (type) {
			case TYPE_MESSAGE:
			case TYPE_GROUP:
				field.listKind = "message";
				field.message = reg.getMessage(trimLeadingDot(proto.typeName));
				assert(field.message);
				field.delimitedEncoding = isDelimitedEncoding(proto, parentOrFile);
				break;
			case TYPE_ENUM:
				field.listKind = "enum";
				field.enum = reg.getEnum(trimLeadingDot(proto.typeName));
				assert(field.enum);
				break;
			default:
				field.listKind = "scalar";
				field.scalar = type;
				field.longAsString = jstype == JS_STRING;
				break;
		}
		field.packed = isPackedField(proto, parentOrFile);
		return field;
	}
	switch (type) {
		case TYPE_MESSAGE:
		case TYPE_GROUP:
			field.fieldKind = "message";
			field.message = reg.getMessage(trimLeadingDot(proto.typeName));
			assert(field.message, `invalid FieldDescriptorProto: type_name ${proto.typeName} not found`);
			field.delimitedEncoding = isDelimitedEncoding(proto, parentOrFile);
			field.getDefaultValue = () => void 0;
			break;
		case TYPE_ENUM: {
			const enumeration = reg.getEnum(trimLeadingDot(proto.typeName));
			assert(enumeration !== void 0, `invalid FieldDescriptorProto: type_name ${proto.typeName} not found`);
			field.fieldKind = "enum";
			field.enum = reg.getEnum(trimLeadingDot(proto.typeName));
			field.getDefaultValue = () => {
				return unsafeIsSetExplicit(proto, "defaultValue") ? parseTextFormatEnumValue(enumeration, proto.defaultValue) : void 0;
			};
			break;
		}
		default:
			field.fieldKind = "scalar";
			field.scalar = type;
			field.longAsString = jstype == JS_STRING;
			field.getDefaultValue = () => {
				return unsafeIsSetExplicit(proto, "defaultValue") ? parseTextFormatScalarValue(type, proto.defaultValue) : void 0;
			};
			break;
	}
	return field;
}
/**
* Parse the "syntax" and "edition" fields, returning one of the supported
* editions.
*/
function getFileEdition(proto) {
	switch (proto.syntax) {
		case "":
		case "proto2": return EDITION_PROTO2;
		case "proto3": return EDITION_PROTO3;
		case "editions":
			if (proto.edition in featureDefaults) return proto.edition;
			throw new Error(`${proto.name}: unsupported edition`);
		default: throw new Error(`${proto.name}: unsupported syntax "${proto.syntax}"`);
	}
}
/**
* Resolve dependencies of FileDescriptorProto to DescFile.
*/
function findFileDependencies(proto, reg) {
	return proto.dependency.map((wantName) => {
		const dep = reg.getFile(wantName);
		if (!dep) throw new Error(`Cannot find ${wantName}, imported by ${proto.name}`);
		return dep;
	});
}
/**
* Finds a prefix shared by enum values, for example `my_enum_` for
* `enum MyEnum {MY_ENUM_A=0; MY_ENUM_B=1;}`.
*/
function findEnumSharedPrefix(enumName, values) {
	const prefix = camelToSnakeCase(enumName) + "_";
	for (const value of values) {
		if (!value.name.toLowerCase().startsWith(prefix)) return;
		const shortName = value.name.substring(prefix.length);
		if (shortName.length == 0) return;
		if (/^\d/.test(shortName)) return;
	}
	return prefix;
}
/**
* Converts lowerCamelCase or UpperCamelCase into lower_snake_case.
* This is used to find shared prefixes in an enum.
*/
function camelToSnakeCase(camel) {
	return (camel.substring(0, 1) + camel.substring(1).replace(/[A-Z]/g, (c) => "_" + c)).toLowerCase();
}
/**
* Create a fully qualified name for a protobuf type or extension field.
*
* The fully qualified name for messages, enumerations, and services is
* constructed by concatenating the package name (if present), parent
* message names (for nested types), and the type name. We omit the leading
* dot added by protobuf compilers. Examples:
* - mypackage.MyMessage
* - mypackage.MyMessage.NestedMessage
*
* The fully qualified name for extension fields is constructed by
* concatenating the package name (if present), parent message names (for
* extensions declared within a message), and the field name. Examples:
* - mypackage.extfield
* - mypackage.MyMessage.extfield
*/
function makeTypeName(proto, parent, file) {
	let typeName;
	if (parent) typeName = `${parent.typeName}.${proto.name}`;
	else if (file.proto.package.length > 0) typeName = `${file.proto.package}.${proto.name}`;
	else typeName = `${proto.name}`;
	return typeName;
}
/**
* Remove the leading dot from a fully qualified type name.
*/
function trimLeadingDot(typeName) {
	return typeName.startsWith(".") ? typeName.substring(1) : typeName;
}
/**
* Did the user put the field in a oneof group?
* Synthetic oneofs for proto3 optionals are ignored.
*/
function findOneof(proto, allOneofs) {
	if (!unsafeIsSetExplicit(proto, "oneofIndex")) return;
	if (proto.proto3Optional) return;
	const oneof = allOneofs[proto.oneofIndex];
	assert(oneof, `invalid FieldDescriptorProto: oneof #${proto.oneofIndex} for field #${proto.number} not found`);
	return oneof;
}
/**
* Presence of the field.
* See https://protobuf.dev/programming-guides/field_presence/
*/
function getFieldPresence(proto, oneof, isExtension, parent) {
	if (proto.label == LABEL_REQUIRED) return LEGACY_REQUIRED$1;
	if (proto.label == LABEL_REPEATED) return IMPLICIT;
	if (!!oneof || proto.proto3Optional) return EXPLICIT;
	if (isExtension) return EXPLICIT;
	const resolved = resolveFeature("fieldPresence", {
		proto,
		parent
	});
	if (resolved == IMPLICIT && (proto.type == TYPE_MESSAGE || proto.type == TYPE_GROUP)) return EXPLICIT;
	return resolved;
}
/**
* Pack this repeated field?
*/
function isPackedField(proto, parent) {
	if (proto.label != LABEL_REPEATED) return false;
	switch (proto.type) {
		case TYPE_STRING:
		case TYPE_BYTES:
		case TYPE_GROUP:
		case TYPE_MESSAGE: return false;
	}
	const o = proto.options;
	if (o && unsafeIsSetExplicit(o, "packed")) return o.packed;
	return PACKED == resolveFeature("repeatedFieldEncoding", {
		proto,
		parent
	});
}
/**
* Find the key and value fields of a synthetic map entry message.
*/
function findMapEntryFields(mapEntry) {
	const key = mapEntry.fields.find((f) => f.number === 1);
	const value = mapEntry.fields.find((f) => f.number === 2);
	assert(key && key.fieldKind == "scalar" && key.scalar != ScalarType.BYTES && key.scalar != ScalarType.FLOAT && key.scalar != ScalarType.DOUBLE && value && value.fieldKind != "list" && value.fieldKind != "map");
	return {
		key,
		value
	};
}
/**
* Enumerations can be open or closed.
* See https://protobuf.dev/programming-guides/enum/
*/
function isEnumOpen(desc) {
	var _a;
	return OPEN == resolveFeature("enumType", {
		proto: desc.proto,
		parent: (_a = desc.parent) !== null && _a !== void 0 ? _a : desc.file
	});
}
/**
* Encode the message delimited (a.k.a. proto2 group encoding), or
* length-prefixed?
*/
function isDelimitedEncoding(proto, parent) {
	if (proto.type == TYPE_GROUP) return true;
	return DELIMITED == resolveFeature("messageEncoding", {
		proto,
		parent
	});
}
function resolveFeature(name, ref) {
	var _a, _b;
	const featureSet = (_a = ref.proto.options) === null || _a === void 0 ? void 0 : _a.features;
	if (featureSet) {
		const val = featureSet[name];
		if (val != 0) return val;
	}
	if ("kind" in ref) {
		if (ref.kind == "message") return resolveFeature(name, (_b = ref.parent) !== null && _b !== void 0 ? _b : ref.file);
		const editionDefaults = featureDefaults[ref.edition];
		if (!editionDefaults) throw new Error(`feature default for edition ${ref.edition} not found`);
		return editionDefaults[name];
	}
	return resolveFeature(name, ref.parent);
}
/**
* Assert that condition is truthy or throw error (with message)
*/
function assert(condition, msg) {
	if (!condition) throw new Error(msg);
}
//#endregion
//#region ../../node_modules/@connectrpc/connect-web/node_modules/@bufbuild/protobuf/dist/esm/codegenv2/boot.js
/**
* Hydrate a file descriptor for google/protobuf/descriptor.proto from a plain
* object.
*
* See createFileDescriptorProtoBoot() for details.
*
* @private
*/
function boot(boot) {
	const root = bootFileDescriptorProto(boot);
	root.messageType.forEach(restoreJsonNames);
	return createFileRegistry(root, () => void 0).getFile(root.name);
}
/**
* Creates the message google.protobuf.FileDescriptorProto from an object literal.
*
* See createFileDescriptorProtoBoot() for details.
*
* @private
*/
function bootFileDescriptorProto(init) {
	return Object.assign(Object.create({
		syntax: "",
		edition: 0
	}), Object.assign(Object.assign({
		$typeName: "google.protobuf.FileDescriptorProto",
		dependency: [],
		publicDependency: [],
		weakDependency: [],
		optionDependency: [],
		service: [],
		extension: []
	}, init), {
		messageType: init.messageType.map(bootDescriptorProto),
		enumType: init.enumType.map(bootEnumDescriptorProto)
	}));
}
function bootDescriptorProto(init) {
	var _a, _b, _c, _d, _e, _f, _g, _h;
	return Object.assign(Object.create({ visibility: 0 }), {
		$typeName: "google.protobuf.DescriptorProto",
		name: init.name,
		field: (_b = (_a = init.field) === null || _a === void 0 ? void 0 : _a.map(bootFieldDescriptorProto)) !== null && _b !== void 0 ? _b : [],
		extension: [],
		nestedType: (_d = (_c = init.nestedType) === null || _c === void 0 ? void 0 : _c.map(bootDescriptorProto)) !== null && _d !== void 0 ? _d : [],
		enumType: (_f = (_e = init.enumType) === null || _e === void 0 ? void 0 : _e.map(bootEnumDescriptorProto)) !== null && _f !== void 0 ? _f : [],
		extensionRange: (_h = (_g = init.extensionRange) === null || _g === void 0 ? void 0 : _g.map((e) => Object.assign({ $typeName: "google.protobuf.DescriptorProto.ExtensionRange" }, e))) !== null && _h !== void 0 ? _h : [],
		oneofDecl: [],
		reservedRange: [],
		reservedName: []
	});
}
function bootFieldDescriptorProto(init) {
	return Object.assign(Object.create({
		label: 1,
		typeName: "",
		extendee: "",
		defaultValue: "",
		oneofIndex: 0,
		jsonName: "",
		proto3Optional: false
	}), Object.assign(Object.assign({ $typeName: "google.protobuf.FieldDescriptorProto" }, init), { options: init.options ? bootFieldOptions(init.options) : void 0 }));
}
function bootFieldOptions(init) {
	var _a, _b, _c;
	return Object.assign(Object.create({
		ctype: 0,
		packed: false,
		jstype: 0,
		lazy: false,
		unverifiedLazy: false,
		deprecated: false,
		weak: false,
		debugRedact: false,
		retention: 0
	}), Object.assign(Object.assign({ $typeName: "google.protobuf.FieldOptions" }, init), {
		targets: (_a = init.targets) !== null && _a !== void 0 ? _a : [],
		editionDefaults: (_c = (_b = init.editionDefaults) === null || _b === void 0 ? void 0 : _b.map((e) => Object.assign({ $typeName: "google.protobuf.FieldOptions.EditionDefault" }, e))) !== null && _c !== void 0 ? _c : [],
		uninterpretedOption: []
	}));
}
function bootEnumDescriptorProto(init) {
	return Object.assign(Object.create({ visibility: 0 }), {
		$typeName: "google.protobuf.EnumDescriptorProto",
		name: init.name,
		reservedName: [],
		reservedRange: [],
		value: init.value.map((e) => Object.assign({ $typeName: "google.protobuf.EnumValueDescriptorProto" }, e))
	});
}
//#endregion
//#region ../../node_modules/@connectrpc/connect-web/node_modules/@bufbuild/protobuf/dist/esm/codegenv2/message.js
/**
* Hydrate a message descriptor.
*
* @private
*/
function messageDesc(file, path, ...paths) {
	return paths.reduce((acc, cur) => acc.nestedMessages[cur], file.messages[path]);
}
/**
* Describes the message google.protobuf.FileDescriptorProto.
* Use `create(FileDescriptorProtoSchema)` to create a new message.
*/
var FileDescriptorProtoSchema = /* @__PURE__ */ messageDesc(/* @__PURE__ */ boot({
	"name": "google/protobuf/descriptor.proto",
	"package": "google.protobuf",
	"messageType": [
		{
			"name": "FileDescriptorSet",
			"field": [{
				"name": "file",
				"number": 1,
				"type": 11,
				"label": 3,
				"typeName": ".google.protobuf.FileDescriptorProto"
			}],
			"extensionRange": [{
				"start": 536e6,
				"end": 536000001
			}]
		},
		{
			"name": "FileDescriptorProto",
			"field": [
				{
					"name": "name",
					"number": 1,
					"type": 9,
					"label": 1
				},
				{
					"name": "package",
					"number": 2,
					"type": 9,
					"label": 1
				},
				{
					"name": "dependency",
					"number": 3,
					"type": 9,
					"label": 3
				},
				{
					"name": "public_dependency",
					"number": 10,
					"type": 5,
					"label": 3
				},
				{
					"name": "weak_dependency",
					"number": 11,
					"type": 5,
					"label": 3
				},
				{
					"name": "option_dependency",
					"number": 15,
					"type": 9,
					"label": 3
				},
				{
					"name": "message_type",
					"number": 4,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.DescriptorProto"
				},
				{
					"name": "enum_type",
					"number": 5,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.EnumDescriptorProto"
				},
				{
					"name": "service",
					"number": 6,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.ServiceDescriptorProto"
				},
				{
					"name": "extension",
					"number": 7,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.FieldDescriptorProto"
				},
				{
					"name": "options",
					"number": 8,
					"type": 11,
					"label": 1,
					"typeName": ".google.protobuf.FileOptions"
				},
				{
					"name": "source_code_info",
					"number": 9,
					"type": 11,
					"label": 1,
					"typeName": ".google.protobuf.SourceCodeInfo"
				},
				{
					"name": "syntax",
					"number": 12,
					"type": 9,
					"label": 1
				},
				{
					"name": "edition",
					"number": 14,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.Edition"
				}
			]
		},
		{
			"name": "DescriptorProto",
			"field": [
				{
					"name": "name",
					"number": 1,
					"type": 9,
					"label": 1
				},
				{
					"name": "field",
					"number": 2,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.FieldDescriptorProto"
				},
				{
					"name": "extension",
					"number": 6,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.FieldDescriptorProto"
				},
				{
					"name": "nested_type",
					"number": 3,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.DescriptorProto"
				},
				{
					"name": "enum_type",
					"number": 4,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.EnumDescriptorProto"
				},
				{
					"name": "extension_range",
					"number": 5,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.DescriptorProto.ExtensionRange"
				},
				{
					"name": "oneof_decl",
					"number": 8,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.OneofDescriptorProto"
				},
				{
					"name": "options",
					"number": 7,
					"type": 11,
					"label": 1,
					"typeName": ".google.protobuf.MessageOptions"
				},
				{
					"name": "reserved_range",
					"number": 9,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.DescriptorProto.ReservedRange"
				},
				{
					"name": "reserved_name",
					"number": 10,
					"type": 9,
					"label": 3
				},
				{
					"name": "visibility",
					"number": 11,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.SymbolVisibility"
				}
			],
			"nestedType": [{
				"name": "ExtensionRange",
				"field": [
					{
						"name": "start",
						"number": 1,
						"type": 5,
						"label": 1
					},
					{
						"name": "end",
						"number": 2,
						"type": 5,
						"label": 1
					},
					{
						"name": "options",
						"number": 3,
						"type": 11,
						"label": 1,
						"typeName": ".google.protobuf.ExtensionRangeOptions"
					}
				]
			}, {
				"name": "ReservedRange",
				"field": [{
					"name": "start",
					"number": 1,
					"type": 5,
					"label": 1
				}, {
					"name": "end",
					"number": 2,
					"type": 5,
					"label": 1
				}]
			}]
		},
		{
			"name": "ExtensionRangeOptions",
			"field": [
				{
					"name": "uninterpreted_option",
					"number": 999,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.UninterpretedOption"
				},
				{
					"name": "declaration",
					"number": 2,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.ExtensionRangeOptions.Declaration",
					"options": { "retention": 2 }
				},
				{
					"name": "features",
					"number": 50,
					"type": 11,
					"label": 1,
					"typeName": ".google.protobuf.FeatureSet"
				},
				{
					"name": "verification",
					"number": 3,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.ExtensionRangeOptions.VerificationState",
					"defaultValue": "UNVERIFIED",
					"options": { "retention": 2 }
				}
			],
			"nestedType": [{
				"name": "Declaration",
				"field": [
					{
						"name": "number",
						"number": 1,
						"type": 5,
						"label": 1
					},
					{
						"name": "full_name",
						"number": 2,
						"type": 9,
						"label": 1
					},
					{
						"name": "type",
						"number": 3,
						"type": 9,
						"label": 1
					},
					{
						"name": "reserved",
						"number": 5,
						"type": 8,
						"label": 1
					},
					{
						"name": "repeated",
						"number": 6,
						"type": 8,
						"label": 1
					}
				]
			}],
			"enumType": [{
				"name": "VerificationState",
				"value": [{
					"name": "DECLARATION",
					"number": 0
				}, {
					"name": "UNVERIFIED",
					"number": 1
				}]
			}],
			"extensionRange": [{
				"start": 1e3,
				"end": 536870912
			}]
		},
		{
			"name": "FieldDescriptorProto",
			"field": [
				{
					"name": "name",
					"number": 1,
					"type": 9,
					"label": 1
				},
				{
					"name": "number",
					"number": 3,
					"type": 5,
					"label": 1
				},
				{
					"name": "label",
					"number": 4,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.FieldDescriptorProto.Label"
				},
				{
					"name": "type",
					"number": 5,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.FieldDescriptorProto.Type"
				},
				{
					"name": "type_name",
					"number": 6,
					"type": 9,
					"label": 1
				},
				{
					"name": "extendee",
					"number": 2,
					"type": 9,
					"label": 1
				},
				{
					"name": "default_value",
					"number": 7,
					"type": 9,
					"label": 1
				},
				{
					"name": "oneof_index",
					"number": 9,
					"type": 5,
					"label": 1
				},
				{
					"name": "json_name",
					"number": 10,
					"type": 9,
					"label": 1
				},
				{
					"name": "options",
					"number": 8,
					"type": 11,
					"label": 1,
					"typeName": ".google.protobuf.FieldOptions"
				},
				{
					"name": "proto3_optional",
					"number": 17,
					"type": 8,
					"label": 1
				}
			],
			"enumType": [{
				"name": "Type",
				"value": [
					{
						"name": "TYPE_DOUBLE",
						"number": 1
					},
					{
						"name": "TYPE_FLOAT",
						"number": 2
					},
					{
						"name": "TYPE_INT64",
						"number": 3
					},
					{
						"name": "TYPE_UINT64",
						"number": 4
					},
					{
						"name": "TYPE_INT32",
						"number": 5
					},
					{
						"name": "TYPE_FIXED64",
						"number": 6
					},
					{
						"name": "TYPE_FIXED32",
						"number": 7
					},
					{
						"name": "TYPE_BOOL",
						"number": 8
					},
					{
						"name": "TYPE_STRING",
						"number": 9
					},
					{
						"name": "TYPE_GROUP",
						"number": 10
					},
					{
						"name": "TYPE_MESSAGE",
						"number": 11
					},
					{
						"name": "TYPE_BYTES",
						"number": 12
					},
					{
						"name": "TYPE_UINT32",
						"number": 13
					},
					{
						"name": "TYPE_ENUM",
						"number": 14
					},
					{
						"name": "TYPE_SFIXED32",
						"number": 15
					},
					{
						"name": "TYPE_SFIXED64",
						"number": 16
					},
					{
						"name": "TYPE_SINT32",
						"number": 17
					},
					{
						"name": "TYPE_SINT64",
						"number": 18
					}
				]
			}, {
				"name": "Label",
				"value": [
					{
						"name": "LABEL_OPTIONAL",
						"number": 1
					},
					{
						"name": "LABEL_REPEATED",
						"number": 3
					},
					{
						"name": "LABEL_REQUIRED",
						"number": 2
					}
				]
			}]
		},
		{
			"name": "OneofDescriptorProto",
			"field": [{
				"name": "name",
				"number": 1,
				"type": 9,
				"label": 1
			}, {
				"name": "options",
				"number": 2,
				"type": 11,
				"label": 1,
				"typeName": ".google.protobuf.OneofOptions"
			}]
		},
		{
			"name": "EnumDescriptorProto",
			"field": [
				{
					"name": "name",
					"number": 1,
					"type": 9,
					"label": 1
				},
				{
					"name": "value",
					"number": 2,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.EnumValueDescriptorProto"
				},
				{
					"name": "options",
					"number": 3,
					"type": 11,
					"label": 1,
					"typeName": ".google.protobuf.EnumOptions"
				},
				{
					"name": "reserved_range",
					"number": 4,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.EnumDescriptorProto.EnumReservedRange"
				},
				{
					"name": "reserved_name",
					"number": 5,
					"type": 9,
					"label": 3
				},
				{
					"name": "visibility",
					"number": 6,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.SymbolVisibility"
				}
			],
			"nestedType": [{
				"name": "EnumReservedRange",
				"field": [{
					"name": "start",
					"number": 1,
					"type": 5,
					"label": 1
				}, {
					"name": "end",
					"number": 2,
					"type": 5,
					"label": 1
				}]
			}]
		},
		{
			"name": "EnumValueDescriptorProto",
			"field": [
				{
					"name": "name",
					"number": 1,
					"type": 9,
					"label": 1
				},
				{
					"name": "number",
					"number": 2,
					"type": 5,
					"label": 1
				},
				{
					"name": "options",
					"number": 3,
					"type": 11,
					"label": 1,
					"typeName": ".google.protobuf.EnumValueOptions"
				}
			]
		},
		{
			"name": "ServiceDescriptorProto",
			"field": [
				{
					"name": "name",
					"number": 1,
					"type": 9,
					"label": 1
				},
				{
					"name": "method",
					"number": 2,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.MethodDescriptorProto"
				},
				{
					"name": "options",
					"number": 3,
					"type": 11,
					"label": 1,
					"typeName": ".google.protobuf.ServiceOptions"
				}
			]
		},
		{
			"name": "MethodDescriptorProto",
			"field": [
				{
					"name": "name",
					"number": 1,
					"type": 9,
					"label": 1
				},
				{
					"name": "input_type",
					"number": 2,
					"type": 9,
					"label": 1
				},
				{
					"name": "output_type",
					"number": 3,
					"type": 9,
					"label": 1
				},
				{
					"name": "options",
					"number": 4,
					"type": 11,
					"label": 1,
					"typeName": ".google.protobuf.MethodOptions"
				},
				{
					"name": "client_streaming",
					"number": 5,
					"type": 8,
					"label": 1,
					"defaultValue": "false"
				},
				{
					"name": "server_streaming",
					"number": 6,
					"type": 8,
					"label": 1,
					"defaultValue": "false"
				}
			]
		},
		{
			"name": "FileOptions",
			"field": [
				{
					"name": "java_package",
					"number": 1,
					"type": 9,
					"label": 1
				},
				{
					"name": "java_outer_classname",
					"number": 8,
					"type": 9,
					"label": 1
				},
				{
					"name": "java_multiple_files",
					"number": 10,
					"type": 8,
					"label": 1,
					"defaultValue": "false"
				},
				{
					"name": "java_generate_equals_and_hash",
					"number": 20,
					"type": 8,
					"label": 1,
					"options": { "deprecated": true }
				},
				{
					"name": "java_string_check_utf8",
					"number": 27,
					"type": 8,
					"label": 1,
					"defaultValue": "false"
				},
				{
					"name": "optimize_for",
					"number": 9,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.FileOptions.OptimizeMode",
					"defaultValue": "SPEED"
				},
				{
					"name": "go_package",
					"number": 11,
					"type": 9,
					"label": 1
				},
				{
					"name": "cc_generic_services",
					"number": 16,
					"type": 8,
					"label": 1,
					"defaultValue": "false"
				},
				{
					"name": "java_generic_services",
					"number": 17,
					"type": 8,
					"label": 1,
					"defaultValue": "false"
				},
				{
					"name": "py_generic_services",
					"number": 18,
					"type": 8,
					"label": 1,
					"defaultValue": "false"
				},
				{
					"name": "deprecated",
					"number": 23,
					"type": 8,
					"label": 1,
					"defaultValue": "false"
				},
				{
					"name": "cc_enable_arenas",
					"number": 31,
					"type": 8,
					"label": 1,
					"defaultValue": "true"
				},
				{
					"name": "objc_class_prefix",
					"number": 36,
					"type": 9,
					"label": 1
				},
				{
					"name": "csharp_namespace",
					"number": 37,
					"type": 9,
					"label": 1
				},
				{
					"name": "swift_prefix",
					"number": 39,
					"type": 9,
					"label": 1
				},
				{
					"name": "php_class_prefix",
					"number": 40,
					"type": 9,
					"label": 1
				},
				{
					"name": "php_namespace",
					"number": 41,
					"type": 9,
					"label": 1
				},
				{
					"name": "php_metadata_namespace",
					"number": 44,
					"type": 9,
					"label": 1
				},
				{
					"name": "ruby_package",
					"number": 45,
					"type": 9,
					"label": 1
				},
				{
					"name": "features",
					"number": 50,
					"type": 11,
					"label": 1,
					"typeName": ".google.protobuf.FeatureSet"
				},
				{
					"name": "uninterpreted_option",
					"number": 999,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.UninterpretedOption"
				}
			],
			"enumType": [{
				"name": "OptimizeMode",
				"value": [
					{
						"name": "SPEED",
						"number": 1
					},
					{
						"name": "CODE_SIZE",
						"number": 2
					},
					{
						"name": "LITE_RUNTIME",
						"number": 3
					}
				]
			}],
			"extensionRange": [{
				"start": 1e3,
				"end": 536870912
			}]
		},
		{
			"name": "MessageOptions",
			"field": [
				{
					"name": "message_set_wire_format",
					"number": 1,
					"type": 8,
					"label": 1,
					"defaultValue": "false"
				},
				{
					"name": "no_standard_descriptor_accessor",
					"number": 2,
					"type": 8,
					"label": 1,
					"defaultValue": "false"
				},
				{
					"name": "deprecated",
					"number": 3,
					"type": 8,
					"label": 1,
					"defaultValue": "false"
				},
				{
					"name": "map_entry",
					"number": 7,
					"type": 8,
					"label": 1
				},
				{
					"name": "deprecated_legacy_json_field_conflicts",
					"number": 11,
					"type": 8,
					"label": 1,
					"options": { "deprecated": true }
				},
				{
					"name": "features",
					"number": 12,
					"type": 11,
					"label": 1,
					"typeName": ".google.protobuf.FeatureSet"
				},
				{
					"name": "uninterpreted_option",
					"number": 999,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.UninterpretedOption"
				}
			],
			"extensionRange": [{
				"start": 1e3,
				"end": 536870912
			}]
		},
		{
			"name": "FieldOptions",
			"field": [
				{
					"name": "ctype",
					"number": 1,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.FieldOptions.CType",
					"defaultValue": "STRING"
				},
				{
					"name": "packed",
					"number": 2,
					"type": 8,
					"label": 1
				},
				{
					"name": "jstype",
					"number": 6,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.FieldOptions.JSType",
					"defaultValue": "JS_NORMAL"
				},
				{
					"name": "lazy",
					"number": 5,
					"type": 8,
					"label": 1,
					"defaultValue": "false"
				},
				{
					"name": "unverified_lazy",
					"number": 15,
					"type": 8,
					"label": 1,
					"defaultValue": "false"
				},
				{
					"name": "deprecated",
					"number": 3,
					"type": 8,
					"label": 1,
					"defaultValue": "false"
				},
				{
					"name": "weak",
					"number": 10,
					"type": 8,
					"label": 1,
					"defaultValue": "false",
					"options": { "deprecated": true }
				},
				{
					"name": "debug_redact",
					"number": 16,
					"type": 8,
					"label": 1,
					"defaultValue": "false"
				},
				{
					"name": "retention",
					"number": 17,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.FieldOptions.OptionRetention"
				},
				{
					"name": "targets",
					"number": 19,
					"type": 14,
					"label": 3,
					"typeName": ".google.protobuf.FieldOptions.OptionTargetType"
				},
				{
					"name": "edition_defaults",
					"number": 20,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.FieldOptions.EditionDefault"
				},
				{
					"name": "features",
					"number": 21,
					"type": 11,
					"label": 1,
					"typeName": ".google.protobuf.FeatureSet"
				},
				{
					"name": "feature_support",
					"number": 22,
					"type": 11,
					"label": 1,
					"typeName": ".google.protobuf.FieldOptions.FeatureSupport"
				},
				{
					"name": "uninterpreted_option",
					"number": 999,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.UninterpretedOption"
				}
			],
			"nestedType": [{
				"name": "EditionDefault",
				"field": [{
					"name": "edition",
					"number": 3,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.Edition"
				}, {
					"name": "value",
					"number": 2,
					"type": 9,
					"label": 1
				}]
			}, {
				"name": "FeatureSupport",
				"field": [
					{
						"name": "edition_introduced",
						"number": 1,
						"type": 14,
						"label": 1,
						"typeName": ".google.protobuf.Edition"
					},
					{
						"name": "edition_deprecated",
						"number": 2,
						"type": 14,
						"label": 1,
						"typeName": ".google.protobuf.Edition"
					},
					{
						"name": "deprecation_warning",
						"number": 3,
						"type": 9,
						"label": 1
					},
					{
						"name": "edition_removed",
						"number": 4,
						"type": 14,
						"label": 1,
						"typeName": ".google.protobuf.Edition"
					}
				]
			}],
			"enumType": [
				{
					"name": "CType",
					"value": [
						{
							"name": "STRING",
							"number": 0
						},
						{
							"name": "CORD",
							"number": 1
						},
						{
							"name": "STRING_PIECE",
							"number": 2
						}
					]
				},
				{
					"name": "JSType",
					"value": [
						{
							"name": "JS_NORMAL",
							"number": 0
						},
						{
							"name": "JS_STRING",
							"number": 1
						},
						{
							"name": "JS_NUMBER",
							"number": 2
						}
					]
				},
				{
					"name": "OptionRetention",
					"value": [
						{
							"name": "RETENTION_UNKNOWN",
							"number": 0
						},
						{
							"name": "RETENTION_RUNTIME",
							"number": 1
						},
						{
							"name": "RETENTION_SOURCE",
							"number": 2
						}
					]
				},
				{
					"name": "OptionTargetType",
					"value": [
						{
							"name": "TARGET_TYPE_UNKNOWN",
							"number": 0
						},
						{
							"name": "TARGET_TYPE_FILE",
							"number": 1
						},
						{
							"name": "TARGET_TYPE_EXTENSION_RANGE",
							"number": 2
						},
						{
							"name": "TARGET_TYPE_MESSAGE",
							"number": 3
						},
						{
							"name": "TARGET_TYPE_FIELD",
							"number": 4
						},
						{
							"name": "TARGET_TYPE_ONEOF",
							"number": 5
						},
						{
							"name": "TARGET_TYPE_ENUM",
							"number": 6
						},
						{
							"name": "TARGET_TYPE_ENUM_ENTRY",
							"number": 7
						},
						{
							"name": "TARGET_TYPE_SERVICE",
							"number": 8
						},
						{
							"name": "TARGET_TYPE_METHOD",
							"number": 9
						}
					]
				}
			],
			"extensionRange": [{
				"start": 1e3,
				"end": 536870912
			}]
		},
		{
			"name": "OneofOptions",
			"field": [{
				"name": "features",
				"number": 1,
				"type": 11,
				"label": 1,
				"typeName": ".google.protobuf.FeatureSet"
			}, {
				"name": "uninterpreted_option",
				"number": 999,
				"type": 11,
				"label": 3,
				"typeName": ".google.protobuf.UninterpretedOption"
			}],
			"extensionRange": [{
				"start": 1e3,
				"end": 536870912
			}]
		},
		{
			"name": "EnumOptions",
			"field": [
				{
					"name": "allow_alias",
					"number": 2,
					"type": 8,
					"label": 1
				},
				{
					"name": "deprecated",
					"number": 3,
					"type": 8,
					"label": 1,
					"defaultValue": "false"
				},
				{
					"name": "deprecated_legacy_json_field_conflicts",
					"number": 6,
					"type": 8,
					"label": 1,
					"options": { "deprecated": true }
				},
				{
					"name": "features",
					"number": 7,
					"type": 11,
					"label": 1,
					"typeName": ".google.protobuf.FeatureSet"
				},
				{
					"name": "uninterpreted_option",
					"number": 999,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.UninterpretedOption"
				}
			],
			"extensionRange": [{
				"start": 1e3,
				"end": 536870912
			}]
		},
		{
			"name": "EnumValueOptions",
			"field": [
				{
					"name": "deprecated",
					"number": 1,
					"type": 8,
					"label": 1,
					"defaultValue": "false"
				},
				{
					"name": "features",
					"number": 2,
					"type": 11,
					"label": 1,
					"typeName": ".google.protobuf.FeatureSet"
				},
				{
					"name": "debug_redact",
					"number": 3,
					"type": 8,
					"label": 1,
					"defaultValue": "false"
				},
				{
					"name": "feature_support",
					"number": 4,
					"type": 11,
					"label": 1,
					"typeName": ".google.protobuf.FieldOptions.FeatureSupport"
				},
				{
					"name": "uninterpreted_option",
					"number": 999,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.UninterpretedOption"
				}
			],
			"extensionRange": [{
				"start": 1e3,
				"end": 536870912
			}]
		},
		{
			"name": "ServiceOptions",
			"field": [
				{
					"name": "features",
					"number": 34,
					"type": 11,
					"label": 1,
					"typeName": ".google.protobuf.FeatureSet"
				},
				{
					"name": "deprecated",
					"number": 33,
					"type": 8,
					"label": 1,
					"defaultValue": "false"
				},
				{
					"name": "uninterpreted_option",
					"number": 999,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.UninterpretedOption"
				}
			],
			"extensionRange": [{
				"start": 1e3,
				"end": 536870912
			}]
		},
		{
			"name": "MethodOptions",
			"field": [
				{
					"name": "deprecated",
					"number": 33,
					"type": 8,
					"label": 1,
					"defaultValue": "false"
				},
				{
					"name": "idempotency_level",
					"number": 34,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.MethodOptions.IdempotencyLevel",
					"defaultValue": "IDEMPOTENCY_UNKNOWN"
				},
				{
					"name": "features",
					"number": 35,
					"type": 11,
					"label": 1,
					"typeName": ".google.protobuf.FeatureSet"
				},
				{
					"name": "uninterpreted_option",
					"number": 999,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.UninterpretedOption"
				}
			],
			"enumType": [{
				"name": "IdempotencyLevel",
				"value": [
					{
						"name": "IDEMPOTENCY_UNKNOWN",
						"number": 0
					},
					{
						"name": "NO_SIDE_EFFECTS",
						"number": 1
					},
					{
						"name": "IDEMPOTENT",
						"number": 2
					}
				]
			}],
			"extensionRange": [{
				"start": 1e3,
				"end": 536870912
			}]
		},
		{
			"name": "UninterpretedOption",
			"field": [
				{
					"name": "name",
					"number": 2,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.UninterpretedOption.NamePart"
				},
				{
					"name": "identifier_value",
					"number": 3,
					"type": 9,
					"label": 1
				},
				{
					"name": "positive_int_value",
					"number": 4,
					"type": 4,
					"label": 1
				},
				{
					"name": "negative_int_value",
					"number": 5,
					"type": 3,
					"label": 1
				},
				{
					"name": "double_value",
					"number": 6,
					"type": 1,
					"label": 1
				},
				{
					"name": "string_value",
					"number": 7,
					"type": 12,
					"label": 1
				},
				{
					"name": "aggregate_value",
					"number": 8,
					"type": 9,
					"label": 1
				}
			],
			"nestedType": [{
				"name": "NamePart",
				"field": [{
					"name": "name_part",
					"number": 1,
					"type": 9,
					"label": 2
				}, {
					"name": "is_extension",
					"number": 2,
					"type": 8,
					"label": 2
				}]
			}]
		},
		{
			"name": "FeatureSet",
			"field": [
				{
					"name": "field_presence",
					"number": 1,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.FeatureSet.FieldPresence",
					"options": {
						"retention": 1,
						"targets": [4, 1],
						"editionDefaults": [
							{
								"value": "EXPLICIT",
								"edition": 900
							},
							{
								"value": "IMPLICIT",
								"edition": 999
							},
							{
								"value": "EXPLICIT",
								"edition": 1e3
							}
						]
					}
				},
				{
					"name": "enum_type",
					"number": 2,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.FeatureSet.EnumType",
					"options": {
						"retention": 1,
						"targets": [6, 1],
						"editionDefaults": [{
							"value": "CLOSED",
							"edition": 900
						}, {
							"value": "OPEN",
							"edition": 999
						}]
					}
				},
				{
					"name": "repeated_field_encoding",
					"number": 3,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.FeatureSet.RepeatedFieldEncoding",
					"options": {
						"retention": 1,
						"targets": [4, 1],
						"editionDefaults": [{
							"value": "EXPANDED",
							"edition": 900
						}, {
							"value": "PACKED",
							"edition": 999
						}]
					}
				},
				{
					"name": "utf8_validation",
					"number": 4,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.FeatureSet.Utf8Validation",
					"options": {
						"retention": 1,
						"targets": [4, 1],
						"editionDefaults": [{
							"value": "NONE",
							"edition": 900
						}, {
							"value": "VERIFY",
							"edition": 999
						}]
					}
				},
				{
					"name": "message_encoding",
					"number": 5,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.FeatureSet.MessageEncoding",
					"options": {
						"retention": 1,
						"targets": [4, 1],
						"editionDefaults": [{
							"value": "LENGTH_PREFIXED",
							"edition": 900
						}]
					}
				},
				{
					"name": "json_format",
					"number": 6,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.FeatureSet.JsonFormat",
					"options": {
						"retention": 1,
						"targets": [
							3,
							6,
							1
						],
						"editionDefaults": [{
							"value": "LEGACY_BEST_EFFORT",
							"edition": 900
						}, {
							"value": "ALLOW",
							"edition": 999
						}]
					}
				},
				{
					"name": "enforce_naming_style",
					"number": 7,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.FeatureSet.EnforceNamingStyle",
					"options": {
						"retention": 2,
						"targets": [
							1,
							2,
							3,
							4,
							5,
							6,
							7,
							8,
							9
						],
						"editionDefaults": [{
							"value": "STYLE_LEGACY",
							"edition": 900
						}, {
							"value": "STYLE2024",
							"edition": 1001
						}]
					}
				},
				{
					"name": "default_symbol_visibility",
					"number": 8,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.FeatureSet.VisibilityFeature.DefaultSymbolVisibility",
					"options": {
						"retention": 2,
						"targets": [1],
						"editionDefaults": [{
							"value": "EXPORT_ALL",
							"edition": 900
						}, {
							"value": "EXPORT_TOP_LEVEL",
							"edition": 1001
						}]
					}
				}
			],
			"nestedType": [{
				"name": "VisibilityFeature",
				"enumType": [{
					"name": "DefaultSymbolVisibility",
					"value": [
						{
							"name": "DEFAULT_SYMBOL_VISIBILITY_UNKNOWN",
							"number": 0
						},
						{
							"name": "EXPORT_ALL",
							"number": 1
						},
						{
							"name": "EXPORT_TOP_LEVEL",
							"number": 2
						},
						{
							"name": "LOCAL_ALL",
							"number": 3
						},
						{
							"name": "STRICT",
							"number": 4
						}
					]
				}]
			}],
			"enumType": [
				{
					"name": "FieldPresence",
					"value": [
						{
							"name": "FIELD_PRESENCE_UNKNOWN",
							"number": 0
						},
						{
							"name": "EXPLICIT",
							"number": 1
						},
						{
							"name": "IMPLICIT",
							"number": 2
						},
						{
							"name": "LEGACY_REQUIRED",
							"number": 3
						}
					]
				},
				{
					"name": "EnumType",
					"value": [
						{
							"name": "ENUM_TYPE_UNKNOWN",
							"number": 0
						},
						{
							"name": "OPEN",
							"number": 1
						},
						{
							"name": "CLOSED",
							"number": 2
						}
					]
				},
				{
					"name": "RepeatedFieldEncoding",
					"value": [
						{
							"name": "REPEATED_FIELD_ENCODING_UNKNOWN",
							"number": 0
						},
						{
							"name": "PACKED",
							"number": 1
						},
						{
							"name": "EXPANDED",
							"number": 2
						}
					]
				},
				{
					"name": "Utf8Validation",
					"value": [
						{
							"name": "UTF8_VALIDATION_UNKNOWN",
							"number": 0
						},
						{
							"name": "VERIFY",
							"number": 2
						},
						{
							"name": "NONE",
							"number": 3
						}
					]
				},
				{
					"name": "MessageEncoding",
					"value": [
						{
							"name": "MESSAGE_ENCODING_UNKNOWN",
							"number": 0
						},
						{
							"name": "LENGTH_PREFIXED",
							"number": 1
						},
						{
							"name": "DELIMITED",
							"number": 2
						}
					]
				},
				{
					"name": "JsonFormat",
					"value": [
						{
							"name": "JSON_FORMAT_UNKNOWN",
							"number": 0
						},
						{
							"name": "ALLOW",
							"number": 1
						},
						{
							"name": "LEGACY_BEST_EFFORT",
							"number": 2
						}
					]
				},
				{
					"name": "EnforceNamingStyle",
					"value": [
						{
							"name": "ENFORCE_NAMING_STYLE_UNKNOWN",
							"number": 0
						},
						{
							"name": "STYLE2024",
							"number": 1
						},
						{
							"name": "STYLE_LEGACY",
							"number": 2
						}
					]
				}
			],
			"extensionRange": [
				{
					"start": 1e3,
					"end": 9995
				},
				{
					"start": 9995,
					"end": 1e4
				},
				{
					"start": 1e4,
					"end": 10001
				}
			]
		},
		{
			"name": "FeatureSetDefaults",
			"field": [
				{
					"name": "defaults",
					"number": 1,
					"type": 11,
					"label": 3,
					"typeName": ".google.protobuf.FeatureSetDefaults.FeatureSetEditionDefault"
				},
				{
					"name": "minimum_edition",
					"number": 4,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.Edition"
				},
				{
					"name": "maximum_edition",
					"number": 5,
					"type": 14,
					"label": 1,
					"typeName": ".google.protobuf.Edition"
				}
			],
			"nestedType": [{
				"name": "FeatureSetEditionDefault",
				"field": [
					{
						"name": "edition",
						"number": 3,
						"type": 14,
						"label": 1,
						"typeName": ".google.protobuf.Edition"
					},
					{
						"name": "overridable_features",
						"number": 4,
						"type": 11,
						"label": 1,
						"typeName": ".google.protobuf.FeatureSet"
					},
					{
						"name": "fixed_features",
						"number": 5,
						"type": 11,
						"label": 1,
						"typeName": ".google.protobuf.FeatureSet"
					}
				]
			}]
		},
		{
			"name": "SourceCodeInfo",
			"field": [{
				"name": "location",
				"number": 1,
				"type": 11,
				"label": 3,
				"typeName": ".google.protobuf.SourceCodeInfo.Location"
			}],
			"nestedType": [{
				"name": "Location",
				"field": [
					{
						"name": "path",
						"number": 1,
						"type": 5,
						"label": 3,
						"options": { "packed": true }
					},
					{
						"name": "span",
						"number": 2,
						"type": 5,
						"label": 3,
						"options": { "packed": true }
					},
					{
						"name": "leading_comments",
						"number": 3,
						"type": 9,
						"label": 1
					},
					{
						"name": "trailing_comments",
						"number": 4,
						"type": 9,
						"label": 1
					},
					{
						"name": "leading_detached_comments",
						"number": 6,
						"type": 9,
						"label": 3
					}
				]
			}],
			"extensionRange": [{
				"start": 536e6,
				"end": 536000001
			}]
		},
		{
			"name": "GeneratedCodeInfo",
			"field": [{
				"name": "annotation",
				"number": 1,
				"type": 11,
				"label": 3,
				"typeName": ".google.protobuf.GeneratedCodeInfo.Annotation"
			}],
			"nestedType": [{
				"name": "Annotation",
				"field": [
					{
						"name": "path",
						"number": 1,
						"type": 5,
						"label": 3,
						"options": { "packed": true }
					},
					{
						"name": "source_file",
						"number": 2,
						"type": 9,
						"label": 1
					},
					{
						"name": "begin",
						"number": 3,
						"type": 5,
						"label": 1
					},
					{
						"name": "end",
						"number": 4,
						"type": 5,
						"label": 1
					},
					{
						"name": "semantic",
						"number": 5,
						"type": 14,
						"label": 1,
						"typeName": ".google.protobuf.GeneratedCodeInfo.Annotation.Semantic"
					}
				],
				"enumType": [{
					"name": "Semantic",
					"value": [
						{
							"name": "NONE",
							"number": 0
						},
						{
							"name": "SET",
							"number": 1
						},
						{
							"name": "ALIAS",
							"number": 2
						}
					]
				}]
			}]
		}
	],
	"enumType": [{
		"name": "Edition",
		"value": [
			{
				"name": "EDITION_UNKNOWN",
				"number": 0
			},
			{
				"name": "EDITION_LEGACY",
				"number": 900
			},
			{
				"name": "EDITION_PROTO2",
				"number": 998
			},
			{
				"name": "EDITION_PROTO3",
				"number": 999
			},
			{
				"name": "EDITION_2023",
				"number": 1e3
			},
			{
				"name": "EDITION_2024",
				"number": 1001
			},
			{
				"name": "EDITION_1_TEST_ONLY",
				"number": 1
			},
			{
				"name": "EDITION_2_TEST_ONLY",
				"number": 2
			},
			{
				"name": "EDITION_99997_TEST_ONLY",
				"number": 99997
			},
			{
				"name": "EDITION_99998_TEST_ONLY",
				"number": 99998
			},
			{
				"name": "EDITION_99999_TEST_ONLY",
				"number": 99999
			},
			{
				"name": "EDITION_MAX",
				"number": 2147483647
			}
		]
	}, {
		"name": "SymbolVisibility",
		"value": [
			{
				"name": "VISIBILITY_UNSET",
				"number": 0
			},
			{
				"name": "VISIBILITY_LOCAL",
				"number": 1
			},
			{
				"name": "VISIBILITY_EXPORT",
				"number": 2
			}
		]
	}]
}), 1);
/**
* The verification state of the extension range.
*
* @generated from enum google.protobuf.ExtensionRangeOptions.VerificationState
*/
var ExtensionRangeOptions_VerificationState;
(function(ExtensionRangeOptions_VerificationState) {
	/**
	* All the extensions of the range must be declared.
	*
	* @generated from enum value: DECLARATION = 0;
	*/
	ExtensionRangeOptions_VerificationState[ExtensionRangeOptions_VerificationState["DECLARATION"] = 0] = "DECLARATION";
	/**
	* @generated from enum value: UNVERIFIED = 1;
	*/
	ExtensionRangeOptions_VerificationState[ExtensionRangeOptions_VerificationState["UNVERIFIED"] = 1] = "UNVERIFIED";
})(ExtensionRangeOptions_VerificationState || (ExtensionRangeOptions_VerificationState = {}));
/**
* @generated from enum google.protobuf.FieldDescriptorProto.Type
*/
var FieldDescriptorProto_Type;
(function(FieldDescriptorProto_Type) {
	/**
	* 0 is reserved for errors.
	* Order is weird for historical reasons.
	*
	* @generated from enum value: TYPE_DOUBLE = 1;
	*/
	FieldDescriptorProto_Type[FieldDescriptorProto_Type["DOUBLE"] = 1] = "DOUBLE";
	/**
	* @generated from enum value: TYPE_FLOAT = 2;
	*/
	FieldDescriptorProto_Type[FieldDescriptorProto_Type["FLOAT"] = 2] = "FLOAT";
	/**
	* Not ZigZag encoded.  Negative numbers take 10 bytes.  Use TYPE_SINT64 if
	* negative values are likely.
	*
	* @generated from enum value: TYPE_INT64 = 3;
	*/
	FieldDescriptorProto_Type[FieldDescriptorProto_Type["INT64"] = 3] = "INT64";
	/**
	* @generated from enum value: TYPE_UINT64 = 4;
	*/
	FieldDescriptorProto_Type[FieldDescriptorProto_Type["UINT64"] = 4] = "UINT64";
	/**
	* Not ZigZag encoded.  Negative numbers take 10 bytes.  Use TYPE_SINT32 if
	* negative values are likely.
	*
	* @generated from enum value: TYPE_INT32 = 5;
	*/
	FieldDescriptorProto_Type[FieldDescriptorProto_Type["INT32"] = 5] = "INT32";
	/**
	* @generated from enum value: TYPE_FIXED64 = 6;
	*/
	FieldDescriptorProto_Type[FieldDescriptorProto_Type["FIXED64"] = 6] = "FIXED64";
	/**
	* @generated from enum value: TYPE_FIXED32 = 7;
	*/
	FieldDescriptorProto_Type[FieldDescriptorProto_Type["FIXED32"] = 7] = "FIXED32";
	/**
	* @generated from enum value: TYPE_BOOL = 8;
	*/
	FieldDescriptorProto_Type[FieldDescriptorProto_Type["BOOL"] = 8] = "BOOL";
	/**
	* @generated from enum value: TYPE_STRING = 9;
	*/
	FieldDescriptorProto_Type[FieldDescriptorProto_Type["STRING"] = 9] = "STRING";
	/**
	* Tag-delimited aggregate.
	* Group type is deprecated and not supported after google.protobuf. However, Proto3
	* implementations should still be able to parse the group wire format and
	* treat group fields as unknown fields.  In Editions, the group wire format
	* can be enabled via the `message_encoding` feature.
	*
	* @generated from enum value: TYPE_GROUP = 10;
	*/
	FieldDescriptorProto_Type[FieldDescriptorProto_Type["GROUP"] = 10] = "GROUP";
	/**
	* Length-delimited aggregate.
	*
	* @generated from enum value: TYPE_MESSAGE = 11;
	*/
	FieldDescriptorProto_Type[FieldDescriptorProto_Type["MESSAGE"] = 11] = "MESSAGE";
	/**
	* New in version 2.
	*
	* @generated from enum value: TYPE_BYTES = 12;
	*/
	FieldDescriptorProto_Type[FieldDescriptorProto_Type["BYTES"] = 12] = "BYTES";
	/**
	* @generated from enum value: TYPE_UINT32 = 13;
	*/
	FieldDescriptorProto_Type[FieldDescriptorProto_Type["UINT32"] = 13] = "UINT32";
	/**
	* @generated from enum value: TYPE_ENUM = 14;
	*/
	FieldDescriptorProto_Type[FieldDescriptorProto_Type["ENUM"] = 14] = "ENUM";
	/**
	* @generated from enum value: TYPE_SFIXED32 = 15;
	*/
	FieldDescriptorProto_Type[FieldDescriptorProto_Type["SFIXED32"] = 15] = "SFIXED32";
	/**
	* @generated from enum value: TYPE_SFIXED64 = 16;
	*/
	FieldDescriptorProto_Type[FieldDescriptorProto_Type["SFIXED64"] = 16] = "SFIXED64";
	/**
	* Uses ZigZag encoding.
	*
	* @generated from enum value: TYPE_SINT32 = 17;
	*/
	FieldDescriptorProto_Type[FieldDescriptorProto_Type["SINT32"] = 17] = "SINT32";
	/**
	* Uses ZigZag encoding.
	*
	* @generated from enum value: TYPE_SINT64 = 18;
	*/
	FieldDescriptorProto_Type[FieldDescriptorProto_Type["SINT64"] = 18] = "SINT64";
})(FieldDescriptorProto_Type || (FieldDescriptorProto_Type = {}));
/**
* @generated from enum google.protobuf.FieldDescriptorProto.Label
*/
var FieldDescriptorProto_Label;
(function(FieldDescriptorProto_Label) {
	/**
	* 0 is reserved for errors
	*
	* @generated from enum value: LABEL_OPTIONAL = 1;
	*/
	FieldDescriptorProto_Label[FieldDescriptorProto_Label["OPTIONAL"] = 1] = "OPTIONAL";
	/**
	* @generated from enum value: LABEL_REPEATED = 3;
	*/
	FieldDescriptorProto_Label[FieldDescriptorProto_Label["REPEATED"] = 3] = "REPEATED";
	/**
	* The required label is only allowed in google.protobuf.  In proto3 and Editions
	* it's explicitly prohibited.  In Editions, the `field_presence` feature
	* can be used to get this behavior.
	*
	* @generated from enum value: LABEL_REQUIRED = 2;
	*/
	FieldDescriptorProto_Label[FieldDescriptorProto_Label["REQUIRED"] = 2] = "REQUIRED";
})(FieldDescriptorProto_Label || (FieldDescriptorProto_Label = {}));
/**
* Generated classes can be optimized for speed or code size.
*
* @generated from enum google.protobuf.FileOptions.OptimizeMode
*/
var FileOptions_OptimizeMode;
(function(FileOptions_OptimizeMode) {
	/**
	* Generate complete code for parsing, serialization,
	*
	* @generated from enum value: SPEED = 1;
	*/
	FileOptions_OptimizeMode[FileOptions_OptimizeMode["SPEED"] = 1] = "SPEED";
	/**
	* etc.
	*
	* Use ReflectionOps to implement these methods.
	*
	* @generated from enum value: CODE_SIZE = 2;
	*/
	FileOptions_OptimizeMode[FileOptions_OptimizeMode["CODE_SIZE"] = 2] = "CODE_SIZE";
	/**
	* Generate code using MessageLite and the lite runtime.
	*
	* @generated from enum value: LITE_RUNTIME = 3;
	*/
	FileOptions_OptimizeMode[FileOptions_OptimizeMode["LITE_RUNTIME"] = 3] = "LITE_RUNTIME";
})(FileOptions_OptimizeMode || (FileOptions_OptimizeMode = {}));
/**
* @generated from enum google.protobuf.FieldOptions.CType
*/
var FieldOptions_CType;
(function(FieldOptions_CType) {
	/**
	* Default mode.
	*
	* @generated from enum value: STRING = 0;
	*/
	FieldOptions_CType[FieldOptions_CType["STRING"] = 0] = "STRING";
	/**
	* The option [ctype=CORD] may be applied to a non-repeated field of type
	* "bytes". It indicates that in C++, the data should be stored in a Cord
	* instead of a string.  For very large strings, this may reduce memory
	* fragmentation. It may also allow better performance when parsing from a
	* Cord, or when parsing with aliasing enabled, as the parsed Cord may then
	* alias the original buffer.
	*
	* @generated from enum value: CORD = 1;
	*/
	FieldOptions_CType[FieldOptions_CType["CORD"] = 1] = "CORD";
	/**
	* @generated from enum value: STRING_PIECE = 2;
	*/
	FieldOptions_CType[FieldOptions_CType["STRING_PIECE"] = 2] = "STRING_PIECE";
})(FieldOptions_CType || (FieldOptions_CType = {}));
/**
* @generated from enum google.protobuf.FieldOptions.JSType
*/
var FieldOptions_JSType;
(function(FieldOptions_JSType) {
	/**
	* Use the default type.
	*
	* @generated from enum value: JS_NORMAL = 0;
	*/
	FieldOptions_JSType[FieldOptions_JSType["JS_NORMAL"] = 0] = "JS_NORMAL";
	/**
	* Use JavaScript strings.
	*
	* @generated from enum value: JS_STRING = 1;
	*/
	FieldOptions_JSType[FieldOptions_JSType["JS_STRING"] = 1] = "JS_STRING";
	/**
	* Use JavaScript numbers.
	*
	* @generated from enum value: JS_NUMBER = 2;
	*/
	FieldOptions_JSType[FieldOptions_JSType["JS_NUMBER"] = 2] = "JS_NUMBER";
})(FieldOptions_JSType || (FieldOptions_JSType = {}));
/**
* If set to RETENTION_SOURCE, the option will be omitted from the binary.
*
* @generated from enum google.protobuf.FieldOptions.OptionRetention
*/
var FieldOptions_OptionRetention;
(function(FieldOptions_OptionRetention) {
	/**
	* @generated from enum value: RETENTION_UNKNOWN = 0;
	*/
	FieldOptions_OptionRetention[FieldOptions_OptionRetention["RETENTION_UNKNOWN"] = 0] = "RETENTION_UNKNOWN";
	/**
	* @generated from enum value: RETENTION_RUNTIME = 1;
	*/
	FieldOptions_OptionRetention[FieldOptions_OptionRetention["RETENTION_RUNTIME"] = 1] = "RETENTION_RUNTIME";
	/**
	* @generated from enum value: RETENTION_SOURCE = 2;
	*/
	FieldOptions_OptionRetention[FieldOptions_OptionRetention["RETENTION_SOURCE"] = 2] = "RETENTION_SOURCE";
})(FieldOptions_OptionRetention || (FieldOptions_OptionRetention = {}));
/**
* This indicates the types of entities that the field may apply to when used
* as an option. If it is unset, then the field may be freely used as an
* option on any kind of entity.
*
* @generated from enum google.protobuf.FieldOptions.OptionTargetType
*/
var FieldOptions_OptionTargetType;
(function(FieldOptions_OptionTargetType) {
	/**
	* @generated from enum value: TARGET_TYPE_UNKNOWN = 0;
	*/
	FieldOptions_OptionTargetType[FieldOptions_OptionTargetType["TARGET_TYPE_UNKNOWN"] = 0] = "TARGET_TYPE_UNKNOWN";
	/**
	* @generated from enum value: TARGET_TYPE_FILE = 1;
	*/
	FieldOptions_OptionTargetType[FieldOptions_OptionTargetType["TARGET_TYPE_FILE"] = 1] = "TARGET_TYPE_FILE";
	/**
	* @generated from enum value: TARGET_TYPE_EXTENSION_RANGE = 2;
	*/
	FieldOptions_OptionTargetType[FieldOptions_OptionTargetType["TARGET_TYPE_EXTENSION_RANGE"] = 2] = "TARGET_TYPE_EXTENSION_RANGE";
	/**
	* @generated from enum value: TARGET_TYPE_MESSAGE = 3;
	*/
	FieldOptions_OptionTargetType[FieldOptions_OptionTargetType["TARGET_TYPE_MESSAGE"] = 3] = "TARGET_TYPE_MESSAGE";
	/**
	* @generated from enum value: TARGET_TYPE_FIELD = 4;
	*/
	FieldOptions_OptionTargetType[FieldOptions_OptionTargetType["TARGET_TYPE_FIELD"] = 4] = "TARGET_TYPE_FIELD";
	/**
	* @generated from enum value: TARGET_TYPE_ONEOF = 5;
	*/
	FieldOptions_OptionTargetType[FieldOptions_OptionTargetType["TARGET_TYPE_ONEOF"] = 5] = "TARGET_TYPE_ONEOF";
	/**
	* @generated from enum value: TARGET_TYPE_ENUM = 6;
	*/
	FieldOptions_OptionTargetType[FieldOptions_OptionTargetType["TARGET_TYPE_ENUM"] = 6] = "TARGET_TYPE_ENUM";
	/**
	* @generated from enum value: TARGET_TYPE_ENUM_ENTRY = 7;
	*/
	FieldOptions_OptionTargetType[FieldOptions_OptionTargetType["TARGET_TYPE_ENUM_ENTRY"] = 7] = "TARGET_TYPE_ENUM_ENTRY";
	/**
	* @generated from enum value: TARGET_TYPE_SERVICE = 8;
	*/
	FieldOptions_OptionTargetType[FieldOptions_OptionTargetType["TARGET_TYPE_SERVICE"] = 8] = "TARGET_TYPE_SERVICE";
	/**
	* @generated from enum value: TARGET_TYPE_METHOD = 9;
	*/
	FieldOptions_OptionTargetType[FieldOptions_OptionTargetType["TARGET_TYPE_METHOD"] = 9] = "TARGET_TYPE_METHOD";
})(FieldOptions_OptionTargetType || (FieldOptions_OptionTargetType = {}));
/**
* Is this method side-effect-free (or safe in HTTP parlance), or idempotent,
* or neither? HTTP based RPC implementation may choose GET verb for safe
* methods, and PUT verb for idempotent methods instead of the default POST.
*
* @generated from enum google.protobuf.MethodOptions.IdempotencyLevel
*/
var MethodOptions_IdempotencyLevel;
(function(MethodOptions_IdempotencyLevel) {
	/**
	* @generated from enum value: IDEMPOTENCY_UNKNOWN = 0;
	*/
	MethodOptions_IdempotencyLevel[MethodOptions_IdempotencyLevel["IDEMPOTENCY_UNKNOWN"] = 0] = "IDEMPOTENCY_UNKNOWN";
	/**
	* implies idempotent
	*
	* @generated from enum value: NO_SIDE_EFFECTS = 1;
	*/
	MethodOptions_IdempotencyLevel[MethodOptions_IdempotencyLevel["NO_SIDE_EFFECTS"] = 1] = "NO_SIDE_EFFECTS";
	/**
	* idempotent, but may have side effects
	*
	* @generated from enum value: IDEMPOTENT = 2;
	*/
	MethodOptions_IdempotencyLevel[MethodOptions_IdempotencyLevel["IDEMPOTENT"] = 2] = "IDEMPOTENT";
})(MethodOptions_IdempotencyLevel || (MethodOptions_IdempotencyLevel = {}));
/**
* @generated from enum google.protobuf.FeatureSet.VisibilityFeature.DefaultSymbolVisibility
*/
var FeatureSet_VisibilityFeature_DefaultSymbolVisibility;
(function(FeatureSet_VisibilityFeature_DefaultSymbolVisibility) {
	/**
	* @generated from enum value: DEFAULT_SYMBOL_VISIBILITY_UNKNOWN = 0;
	*/
	FeatureSet_VisibilityFeature_DefaultSymbolVisibility[FeatureSet_VisibilityFeature_DefaultSymbolVisibility["DEFAULT_SYMBOL_VISIBILITY_UNKNOWN"] = 0] = "DEFAULT_SYMBOL_VISIBILITY_UNKNOWN";
	/**
	* Default pre-EDITION_2024, all UNSET visibility are export.
	*
	* @generated from enum value: EXPORT_ALL = 1;
	*/
	FeatureSet_VisibilityFeature_DefaultSymbolVisibility[FeatureSet_VisibilityFeature_DefaultSymbolVisibility["EXPORT_ALL"] = 1] = "EXPORT_ALL";
	/**
	* All top-level symbols default to export, nested default to local.
	*
	* @generated from enum value: EXPORT_TOP_LEVEL = 2;
	*/
	FeatureSet_VisibilityFeature_DefaultSymbolVisibility[FeatureSet_VisibilityFeature_DefaultSymbolVisibility["EXPORT_TOP_LEVEL"] = 2] = "EXPORT_TOP_LEVEL";
	/**
	* All symbols default to local.
	*
	* @generated from enum value: LOCAL_ALL = 3;
	*/
	FeatureSet_VisibilityFeature_DefaultSymbolVisibility[FeatureSet_VisibilityFeature_DefaultSymbolVisibility["LOCAL_ALL"] = 3] = "LOCAL_ALL";
	/**
	* All symbols local by default. Nested types cannot be exported.
	* With special case caveat for message { enum {} reserved 1 to max; }
	* This is the recommended setting for new protos.
	*
	* @generated from enum value: STRICT = 4;
	*/
	FeatureSet_VisibilityFeature_DefaultSymbolVisibility[FeatureSet_VisibilityFeature_DefaultSymbolVisibility["STRICT"] = 4] = "STRICT";
})(FeatureSet_VisibilityFeature_DefaultSymbolVisibility || (FeatureSet_VisibilityFeature_DefaultSymbolVisibility = {}));
/**
* @generated from enum google.protobuf.FeatureSet.FieldPresence
*/
var FeatureSet_FieldPresence;
(function(FeatureSet_FieldPresence) {
	/**
	* @generated from enum value: FIELD_PRESENCE_UNKNOWN = 0;
	*/
	FeatureSet_FieldPresence[FeatureSet_FieldPresence["FIELD_PRESENCE_UNKNOWN"] = 0] = "FIELD_PRESENCE_UNKNOWN";
	/**
	* @generated from enum value: EXPLICIT = 1;
	*/
	FeatureSet_FieldPresence[FeatureSet_FieldPresence["EXPLICIT"] = 1] = "EXPLICIT";
	/**
	* @generated from enum value: IMPLICIT = 2;
	*/
	FeatureSet_FieldPresence[FeatureSet_FieldPresence["IMPLICIT"] = 2] = "IMPLICIT";
	/**
	* @generated from enum value: LEGACY_REQUIRED = 3;
	*/
	FeatureSet_FieldPresence[FeatureSet_FieldPresence["LEGACY_REQUIRED"] = 3] = "LEGACY_REQUIRED";
})(FeatureSet_FieldPresence || (FeatureSet_FieldPresence = {}));
/**
* @generated from enum google.protobuf.FeatureSet.EnumType
*/
var FeatureSet_EnumType;
(function(FeatureSet_EnumType) {
	/**
	* @generated from enum value: ENUM_TYPE_UNKNOWN = 0;
	*/
	FeatureSet_EnumType[FeatureSet_EnumType["ENUM_TYPE_UNKNOWN"] = 0] = "ENUM_TYPE_UNKNOWN";
	/**
	* @generated from enum value: OPEN = 1;
	*/
	FeatureSet_EnumType[FeatureSet_EnumType["OPEN"] = 1] = "OPEN";
	/**
	* @generated from enum value: CLOSED = 2;
	*/
	FeatureSet_EnumType[FeatureSet_EnumType["CLOSED"] = 2] = "CLOSED";
})(FeatureSet_EnumType || (FeatureSet_EnumType = {}));
/**
* @generated from enum google.protobuf.FeatureSet.RepeatedFieldEncoding
*/
var FeatureSet_RepeatedFieldEncoding;
(function(FeatureSet_RepeatedFieldEncoding) {
	/**
	* @generated from enum value: REPEATED_FIELD_ENCODING_UNKNOWN = 0;
	*/
	FeatureSet_RepeatedFieldEncoding[FeatureSet_RepeatedFieldEncoding["REPEATED_FIELD_ENCODING_UNKNOWN"] = 0] = "REPEATED_FIELD_ENCODING_UNKNOWN";
	/**
	* @generated from enum value: PACKED = 1;
	*/
	FeatureSet_RepeatedFieldEncoding[FeatureSet_RepeatedFieldEncoding["PACKED"] = 1] = "PACKED";
	/**
	* @generated from enum value: EXPANDED = 2;
	*/
	FeatureSet_RepeatedFieldEncoding[FeatureSet_RepeatedFieldEncoding["EXPANDED"] = 2] = "EXPANDED";
})(FeatureSet_RepeatedFieldEncoding || (FeatureSet_RepeatedFieldEncoding = {}));
/**
* @generated from enum google.protobuf.FeatureSet.Utf8Validation
*/
var FeatureSet_Utf8Validation;
(function(FeatureSet_Utf8Validation) {
	/**
	* @generated from enum value: UTF8_VALIDATION_UNKNOWN = 0;
	*/
	FeatureSet_Utf8Validation[FeatureSet_Utf8Validation["UTF8_VALIDATION_UNKNOWN"] = 0] = "UTF8_VALIDATION_UNKNOWN";
	/**
	* @generated from enum value: VERIFY = 2;
	*/
	FeatureSet_Utf8Validation[FeatureSet_Utf8Validation["VERIFY"] = 2] = "VERIFY";
	/**
	* @generated from enum value: NONE = 3;
	*/
	FeatureSet_Utf8Validation[FeatureSet_Utf8Validation["NONE"] = 3] = "NONE";
})(FeatureSet_Utf8Validation || (FeatureSet_Utf8Validation = {}));
/**
* @generated from enum google.protobuf.FeatureSet.MessageEncoding
*/
var FeatureSet_MessageEncoding;
(function(FeatureSet_MessageEncoding) {
	/**
	* @generated from enum value: MESSAGE_ENCODING_UNKNOWN = 0;
	*/
	FeatureSet_MessageEncoding[FeatureSet_MessageEncoding["MESSAGE_ENCODING_UNKNOWN"] = 0] = "MESSAGE_ENCODING_UNKNOWN";
	/**
	* @generated from enum value: LENGTH_PREFIXED = 1;
	*/
	FeatureSet_MessageEncoding[FeatureSet_MessageEncoding["LENGTH_PREFIXED"] = 1] = "LENGTH_PREFIXED";
	/**
	* @generated from enum value: DELIMITED = 2;
	*/
	FeatureSet_MessageEncoding[FeatureSet_MessageEncoding["DELIMITED"] = 2] = "DELIMITED";
})(FeatureSet_MessageEncoding || (FeatureSet_MessageEncoding = {}));
/**
* @generated from enum google.protobuf.FeatureSet.JsonFormat
*/
var FeatureSet_JsonFormat;
(function(FeatureSet_JsonFormat) {
	/**
	* @generated from enum value: JSON_FORMAT_UNKNOWN = 0;
	*/
	FeatureSet_JsonFormat[FeatureSet_JsonFormat["JSON_FORMAT_UNKNOWN"] = 0] = "JSON_FORMAT_UNKNOWN";
	/**
	* @generated from enum value: ALLOW = 1;
	*/
	FeatureSet_JsonFormat[FeatureSet_JsonFormat["ALLOW"] = 1] = "ALLOW";
	/**
	* @generated from enum value: LEGACY_BEST_EFFORT = 2;
	*/
	FeatureSet_JsonFormat[FeatureSet_JsonFormat["LEGACY_BEST_EFFORT"] = 2] = "LEGACY_BEST_EFFORT";
})(FeatureSet_JsonFormat || (FeatureSet_JsonFormat = {}));
/**
* @generated from enum google.protobuf.FeatureSet.EnforceNamingStyle
*/
var FeatureSet_EnforceNamingStyle;
(function(FeatureSet_EnforceNamingStyle) {
	/**
	* @generated from enum value: ENFORCE_NAMING_STYLE_UNKNOWN = 0;
	*/
	FeatureSet_EnforceNamingStyle[FeatureSet_EnforceNamingStyle["ENFORCE_NAMING_STYLE_UNKNOWN"] = 0] = "ENFORCE_NAMING_STYLE_UNKNOWN";
	/**
	* @generated from enum value: STYLE2024 = 1;
	*/
	FeatureSet_EnforceNamingStyle[FeatureSet_EnforceNamingStyle["STYLE2024"] = 1] = "STYLE2024";
	/**
	* @generated from enum value: STYLE_LEGACY = 2;
	*/
	FeatureSet_EnforceNamingStyle[FeatureSet_EnforceNamingStyle["STYLE_LEGACY"] = 2] = "STYLE_LEGACY";
})(FeatureSet_EnforceNamingStyle || (FeatureSet_EnforceNamingStyle = {}));
/**
* Represents the identified object's effect on the element in the original
* .proto file.
*
* @generated from enum google.protobuf.GeneratedCodeInfo.Annotation.Semantic
*/
var GeneratedCodeInfo_Annotation_Semantic;
(function(GeneratedCodeInfo_Annotation_Semantic) {
	/**
	* There is no effect or the effect is indescribable.
	*
	* @generated from enum value: NONE = 0;
	*/
	GeneratedCodeInfo_Annotation_Semantic[GeneratedCodeInfo_Annotation_Semantic["NONE"] = 0] = "NONE";
	/**
	* The element is set or otherwise mutated.
	*
	* @generated from enum value: SET = 1;
	*/
	GeneratedCodeInfo_Annotation_Semantic[GeneratedCodeInfo_Annotation_Semantic["SET"] = 1] = "SET";
	/**
	* An alias to the element is returned.
	*
	* @generated from enum value: ALIAS = 2;
	*/
	GeneratedCodeInfo_Annotation_Semantic[GeneratedCodeInfo_Annotation_Semantic["ALIAS"] = 2] = "ALIAS";
})(GeneratedCodeInfo_Annotation_Semantic || (GeneratedCodeInfo_Annotation_Semantic = {}));
/**
* The full set of known editions.
*
* @generated from enum google.protobuf.Edition
*/
var Edition;
(function(Edition) {
	/**
	* A placeholder for an unknown edition value.
	*
	* @generated from enum value: EDITION_UNKNOWN = 0;
	*/
	Edition[Edition["EDITION_UNKNOWN"] = 0] = "EDITION_UNKNOWN";
	/**
	* A placeholder edition for specifying default behaviors *before* a feature
	* was first introduced.  This is effectively an "infinite past".
	*
	* @generated from enum value: EDITION_LEGACY = 900;
	*/
	Edition[Edition["EDITION_LEGACY"] = 900] = "EDITION_LEGACY";
	/**
	* Legacy syntax "editions".  These pre-date editions, but behave much like
	* distinct editions.  These can't be used to specify the edition of proto
	* files, but feature definitions must supply proto2/proto3 defaults for
	* backwards compatibility.
	*
	* @generated from enum value: EDITION_PROTO2 = 998;
	*/
	Edition[Edition["EDITION_PROTO2"] = 998] = "EDITION_PROTO2";
	/**
	* @generated from enum value: EDITION_PROTO3 = 999;
	*/
	Edition[Edition["EDITION_PROTO3"] = 999] = "EDITION_PROTO3";
	/**
	* Editions that have been released.  The specific values are arbitrary and
	* should not be depended on, but they will always be time-ordered for easy
	* comparison.
	*
	* @generated from enum value: EDITION_2023 = 1000;
	*/
	Edition[Edition["EDITION_2023"] = 1e3] = "EDITION_2023";
	/**
	* @generated from enum value: EDITION_2024 = 1001;
	*/
	Edition[Edition["EDITION_2024"] = 1001] = "EDITION_2024";
	/**
	* Placeholder editions for testing feature resolution.  These should not be
	* used or relied on outside of tests.
	*
	* @generated from enum value: EDITION_1_TEST_ONLY = 1;
	*/
	Edition[Edition["EDITION_1_TEST_ONLY"] = 1] = "EDITION_1_TEST_ONLY";
	/**
	* @generated from enum value: EDITION_2_TEST_ONLY = 2;
	*/
	Edition[Edition["EDITION_2_TEST_ONLY"] = 2] = "EDITION_2_TEST_ONLY";
	/**
	* @generated from enum value: EDITION_99997_TEST_ONLY = 99997;
	*/
	Edition[Edition["EDITION_99997_TEST_ONLY"] = 99997] = "EDITION_99997_TEST_ONLY";
	/**
	* @generated from enum value: EDITION_99998_TEST_ONLY = 99998;
	*/
	Edition[Edition["EDITION_99998_TEST_ONLY"] = 99998] = "EDITION_99998_TEST_ONLY";
	/**
	* @generated from enum value: EDITION_99999_TEST_ONLY = 99999;
	*/
	Edition[Edition["EDITION_99999_TEST_ONLY"] = 99999] = "EDITION_99999_TEST_ONLY";
	/**
	* Placeholder for specifying unbounded edition support.  This should only
	* ever be used by plugins that can expect to never require any changes to
	* support a new edition.
	*
	* @generated from enum value: EDITION_MAX = 2147483647;
	*/
	Edition[Edition["EDITION_MAX"] = 2147483647] = "EDITION_MAX";
})(Edition || (Edition = {}));
/**
* Describes the 'visibility' of a symbol with respect to the proto import
* system. Symbols can only be imported when the visibility rules do not prevent
* it (ex: local symbols cannot be imported).  Visibility modifiers can only set
* on `message` and `enum` as they are the only types available to be referenced
* from other files.
*
* @generated from enum google.protobuf.SymbolVisibility
*/
var SymbolVisibility;
(function(SymbolVisibility) {
	/**
	* @generated from enum value: VISIBILITY_UNSET = 0;
	*/
	SymbolVisibility[SymbolVisibility["VISIBILITY_UNSET"] = 0] = "VISIBILITY_UNSET";
	/**
	* @generated from enum value: VISIBILITY_LOCAL = 1;
	*/
	SymbolVisibility[SymbolVisibility["VISIBILITY_LOCAL"] = 1] = "VISIBILITY_LOCAL";
	/**
	* @generated from enum value: VISIBILITY_EXPORT = 2;
	*/
	SymbolVisibility[SymbolVisibility["VISIBILITY_EXPORT"] = 2] = "VISIBILITY_EXPORT";
})(SymbolVisibility || (SymbolVisibility = {}));
//#endregion
//#region ../../node_modules/@connectrpc/connect-web/node_modules/@bufbuild/protobuf/dist/esm/from-binary.js
var readDefaults = { readUnknownFields: true };
function makeReadOptions$1(options) {
	return options ? Object.assign(Object.assign({}, readDefaults), options) : readDefaults;
}
/**
* Parse serialized binary data.
*/
function fromBinary(schema, bytes, options) {
	const msg = reflect(schema, void 0, false);
	readMessage$1(msg, new BinaryReader(bytes), makeReadOptions$1(options), false, bytes.byteLength);
	return msg.message;
}
/**
* If `delimited` is false, read the length given in `lengthOrDelimitedFieldNo`.
*
* If `delimited` is true, read until an EndGroup tag. `lengthOrDelimitedFieldNo`
* is the expected field number.
*
* @private
*/
function readMessage$1(message, reader, options, delimited, lengthOrDelimitedFieldNo) {
	var _a;
	const end = delimited ? reader.len : reader.pos + lengthOrDelimitedFieldNo;
	let fieldNo;
	let wireType;
	const unknownFields = (_a = message.getUnknown()) !== null && _a !== void 0 ? _a : [];
	while (reader.pos < end) {
		[fieldNo, wireType] = reader.tag();
		if (delimited && wireType == WireType.EndGroup) break;
		const field = message.findNumber(fieldNo);
		if (!field) {
			const data = reader.skip(wireType, fieldNo);
			if (options.readUnknownFields) unknownFields.push({
				no: fieldNo,
				wireType,
				data
			});
			continue;
		}
		readField$1(message, reader, field, wireType, options);
	}
	if (delimited) {
		if (wireType != WireType.EndGroup || fieldNo !== lengthOrDelimitedFieldNo) throw new Error("invalid end group tag");
	}
	if (unknownFields.length > 0) message.setUnknown(unknownFields);
}
/**
* @private
*/
function readField$1(message, reader, field, wireType, options) {
	var _a;
	switch (field.fieldKind) {
		case "scalar":
			message.set(field, readScalar(reader, field.scalar));
			break;
		case "enum":
			const val = readScalar(reader, ScalarType.INT32);
			if (field.enum.open) message.set(field, val);
			else if (field.enum.values.some((v) => v.number === val)) message.set(field, val);
			else if (options.readUnknownFields) {
				const bytes = [];
				varint32write(val, bytes);
				const unknownFields = (_a = message.getUnknown()) !== null && _a !== void 0 ? _a : [];
				unknownFields.push({
					no: field.number,
					wireType,
					data: new Uint8Array(bytes)
				});
				message.setUnknown(unknownFields);
			}
			break;
		case "message":
			message.set(field, readMessageField$1(reader, options, field, message.get(field)));
			break;
		case "list":
			readListField$1(reader, wireType, message.get(field), options);
			break;
		case "map":
			readMapEntry(reader, message.get(field), options);
			break;
	}
}
function readMapEntry(reader, map, options) {
	const field = map.field();
	let key;
	let val;
	const len = reader.uint32();
	const end = reader.pos + len;
	while (reader.pos < end) {
		const [fieldNo] = reader.tag();
		switch (fieldNo) {
			case 1:
				key = readScalar(reader, field.mapKey);
				break;
			case 2:
				switch (field.mapKind) {
					case "scalar":
						val = readScalar(reader, field.scalar);
						break;
					case "enum":
						val = reader.int32();
						break;
					case "message":
						val = readMessageField$1(reader, options, field);
						break;
				}
				break;
		}
	}
	if (key === void 0) key = scalarZeroValue(field.mapKey, false);
	if (val === void 0) switch (field.mapKind) {
		case "scalar":
			val = scalarZeroValue(field.scalar, false);
			break;
		case "enum":
			val = field.enum.values[0].number;
			break;
		case "message":
			val = reflect(field.message, void 0, false);
			break;
	}
	map.set(key, val);
}
function readListField$1(reader, wireType, list, options) {
	var _a;
	const field = list.field();
	if (field.listKind === "message") {
		list.add(readMessageField$1(reader, options, field));
		return;
	}
	const scalarType = (_a = field.scalar) !== null && _a !== void 0 ? _a : ScalarType.INT32;
	if (!(wireType == WireType.LengthDelimited && scalarType != ScalarType.STRING && scalarType != ScalarType.BYTES)) {
		list.add(readScalar(reader, scalarType));
		return;
	}
	const e = reader.uint32() + reader.pos;
	while (reader.pos < e) list.add(readScalar(reader, scalarType));
}
function readMessageField$1(reader, options, field, mergeMessage) {
	const delimited = field.delimitedEncoding;
	const message = mergeMessage !== null && mergeMessage !== void 0 ? mergeMessage : reflect(field.message, void 0, false);
	readMessage$1(message, reader, options, delimited, delimited ? field.number : reader.uint32());
	return message;
}
function readScalar(reader, type) {
	switch (type) {
		case ScalarType.STRING: return reader.string();
		case ScalarType.BOOL: return reader.bool();
		case ScalarType.DOUBLE: return reader.double();
		case ScalarType.FLOAT: return reader.float();
		case ScalarType.INT32: return reader.int32();
		case ScalarType.INT64: return reader.int64();
		case ScalarType.UINT64: return reader.uint64();
		case ScalarType.FIXED64: return reader.fixed64();
		case ScalarType.BYTES: return reader.bytes();
		case ScalarType.FIXED32: return reader.fixed32();
		case ScalarType.SFIXED32: return reader.sfixed32();
		case ScalarType.SFIXED64: return reader.sfixed64();
		case ScalarType.SINT64: return reader.sint64();
		case ScalarType.UINT32: return reader.uint32();
		case ScalarType.SINT32: return reader.sint32();
	}
}
//#endregion
//#region ../../node_modules/@connectrpc/connect-web/node_modules/@bufbuild/protobuf/dist/esm/codegenv2/file.js
/**
* Hydrate a file descriptor.
*
* @private
*/
function fileDesc(b64, imports) {
	var _a;
	const root = fromBinary(FileDescriptorProtoSchema, base64Decode(b64));
	root.messageType.forEach(restoreJsonNames);
	root.dependency = (_a = imports === null || imports === void 0 ? void 0 : imports.map((f) => f.proto.name)) !== null && _a !== void 0 ? _a : [];
	return createFileRegistry(root, (protoFileName) => imports === null || imports === void 0 ? void 0 : imports.find((f) => f.proto.name === protoFileName)).getFile(root.name);
}
/**
* Describes the message google.protobuf.Any.
* Use `create(AnySchema)` to create a new message.
*/
var AnySchema = /* @__PURE__ */ messageDesc(/* @__PURE__ */ fileDesc("Chlnb29nbGUvcHJvdG9idWYvYW55LnByb3RvEg9nb29nbGUucHJvdG9idWYiJgoDQW55EhAKCHR5cGVfdXJsGAEgASgJEg0KBXZhbHVlGAIgASgMQnYKE2NvbS5nb29nbGUucHJvdG9idWZCCEFueVByb3RvUAFaLGdvb2dsZS5nb2xhbmcub3JnL3Byb3RvYnVmL3R5cGVzL2tub3duL2FueXBiogIDR1BCqgIeR29vZ2xlLlByb3RvYnVmLldlbGxLbm93blR5cGVzYgZwcm90bzM"), 0);
//#endregion
//#region ../../node_modules/@connectrpc/connect-web/node_modules/@bufbuild/protobuf/dist/esm/to-binary.js
var LEGACY_REQUIRED = 3;
var writeDefaults = { writeUnknownFields: true };
function makeWriteOptions(options) {
	return options ? Object.assign(Object.assign({}, writeDefaults), options) : writeDefaults;
}
function toBinary(schema, message, options) {
	return writeFields(new BinaryWriter(), makeWriteOptions(options), reflect(schema, message)).finish();
}
function writeFields(writer, opts, msg) {
	var _a;
	for (const f of msg.sortedFields) {
		if (!msg.isSet(f)) {
			if (f.presence == LEGACY_REQUIRED) throw new Error(`cannot encode ${f} to binary: required field not set`);
			continue;
		}
		writeField(writer, opts, msg, f);
	}
	if (opts.writeUnknownFields) for (const { no, wireType, data } of (_a = msg.getUnknown()) !== null && _a !== void 0 ? _a : []) writer.tag(no, wireType).raw(data);
	return writer;
}
/**
* @private
*/
function writeField(writer, opts, msg, field) {
	var _a;
	switch (field.fieldKind) {
		case "scalar":
		case "enum":
			writeScalar(writer, msg.desc.typeName, field.name, (_a = field.scalar) !== null && _a !== void 0 ? _a : ScalarType.INT32, field.number, msg.get(field));
			break;
		case "list":
			writeListField(writer, opts, field, msg.get(field));
			break;
		case "message":
			writeMessageField(writer, opts, field, msg.get(field));
			break;
		case "map":
			for (const [key, val] of msg.get(field)) writeMapEntry(writer, opts, field, key, val);
			break;
	}
}
function writeScalar(writer, msgName, fieldName, scalarType, fieldNo, value) {
	writeScalarValue(writer.tag(fieldNo, writeTypeOfScalar(scalarType)), msgName, fieldName, scalarType, value);
}
function writeMessageField(writer, opts, field, message) {
	if (field.delimitedEncoding) writeFields(writer.tag(field.number, WireType.StartGroup), opts, message).tag(field.number, WireType.EndGroup);
	else writeFields(writer.tag(field.number, WireType.LengthDelimited).fork(), opts, message).join();
}
function writeListField(writer, opts, field, list) {
	var _a;
	if (field.listKind == "message") {
		for (const item of list) writeMessageField(writer, opts, field, item);
		return;
	}
	const scalarType = (_a = field.scalar) !== null && _a !== void 0 ? _a : ScalarType.INT32;
	if (field.packed) {
		if (!list.size) return;
		writer.tag(field.number, WireType.LengthDelimited).fork();
		for (const item of list) writeScalarValue(writer, field.parent.typeName, field.name, scalarType, item);
		writer.join();
		return;
	}
	for (const item of list) writeScalar(writer, field.parent.typeName, field.name, scalarType, field.number, item);
}
function writeMapEntry(writer, opts, field, key, value) {
	var _a;
	writer.tag(field.number, WireType.LengthDelimited).fork();
	writeScalar(writer, field.parent.typeName, field.name, field.mapKey, 1, key);
	switch (field.mapKind) {
		case "scalar":
		case "enum":
			writeScalar(writer, field.parent.typeName, field.name, (_a = field.scalar) !== null && _a !== void 0 ? _a : ScalarType.INT32, 2, value);
			break;
		case "message":
			writeFields(writer.tag(2, WireType.LengthDelimited).fork(), opts, value).join();
			break;
	}
	writer.join();
}
function writeScalarValue(writer, msgName, fieldName, type, value) {
	try {
		switch (type) {
			case ScalarType.STRING:
				writer.string(value);
				break;
			case ScalarType.BOOL:
				writer.bool(value);
				break;
			case ScalarType.DOUBLE:
				writer.double(value);
				break;
			case ScalarType.FLOAT:
				writer.float(value);
				break;
			case ScalarType.INT32:
				writer.int32(value);
				break;
			case ScalarType.INT64:
				writer.int64(value);
				break;
			case ScalarType.UINT64:
				writer.uint64(value);
				break;
			case ScalarType.FIXED64:
				writer.fixed64(value);
				break;
			case ScalarType.BYTES:
				writer.bytes(value);
				break;
			case ScalarType.FIXED32:
				writer.fixed32(value);
				break;
			case ScalarType.SFIXED32:
				writer.sfixed32(value);
				break;
			case ScalarType.SFIXED64:
				writer.sfixed64(value);
				break;
			case ScalarType.SINT64:
				writer.sint64(value);
				break;
			case ScalarType.UINT32:
				writer.uint32(value);
				break;
			case ScalarType.SINT32:
				writer.sint32(value);
				break;
		}
	} catch (e) {
		if (e instanceof Error) throw new Error(`cannot encode field ${msgName}.${fieldName} to binary: ${e.message}`);
		throw e;
	}
}
function writeTypeOfScalar(type) {
	switch (type) {
		case ScalarType.BYTES:
		case ScalarType.STRING: return WireType.LengthDelimited;
		case ScalarType.DOUBLE:
		case ScalarType.FIXED64:
		case ScalarType.SFIXED64: return WireType.Bit64;
		case ScalarType.FIXED32:
		case ScalarType.SFIXED32:
		case ScalarType.FLOAT: return WireType.Bit32;
		default: return WireType.Varint;
	}
}
//#endregion
//#region ../../node_modules/@connectrpc/connect-web/node_modules/@bufbuild/protobuf/dist/esm/wkt/any.js
function anyPack(schema, message, into) {
	let ret = false;
	if (!into) {
		into = create(AnySchema);
		ret = true;
	}
	into.value = toBinary(schema, message);
	into.typeUrl = typeNameToUrl(message.$typeName);
	return ret ? into : void 0;
}
function typeNameToUrl(name) {
	return `type.googleapis.com/${name}`;
}
//#endregion
//#region ../../node_modules/@connectrpc/connect-web/node_modules/@bufbuild/protobuf/dist/esm/wkt/gen/google/protobuf/struct_pb.js
/**
* Describes the file google/protobuf/struct.proto.
*/
var file_google_protobuf_struct = /* @__PURE__ */ fileDesc("Chxnb29nbGUvcHJvdG9idWYvc3RydWN0LnByb3RvEg9nb29nbGUucHJvdG9idWYihAEKBlN0cnVjdBIzCgZmaWVsZHMYASADKAsyIy5nb29nbGUucHJvdG9idWYuU3RydWN0LkZpZWxkc0VudHJ5GkUKC0ZpZWxkc0VudHJ5EgsKA2tleRgBIAEoCRIlCgV2YWx1ZRgCIAEoCzIWLmdvb2dsZS5wcm90b2J1Zi5WYWx1ZToCOAEi6gEKBVZhbHVlEjAKCm51bGxfdmFsdWUYASABKA4yGi5nb29nbGUucHJvdG9idWYuTnVsbFZhbHVlSAASFgoMbnVtYmVyX3ZhbHVlGAIgASgBSAASFgoMc3RyaW5nX3ZhbHVlGAMgASgJSAASFAoKYm9vbF92YWx1ZRgEIAEoCEgAEi8KDHN0cnVjdF92YWx1ZRgFIAEoCzIXLmdvb2dsZS5wcm90b2J1Zi5TdHJ1Y3RIABIwCgpsaXN0X3ZhbHVlGAYgASgLMhouZ29vZ2xlLnByb3RvYnVmLkxpc3RWYWx1ZUgAQgYKBGtpbmQiMwoJTGlzdFZhbHVlEiYKBnZhbHVlcxgBIAMoCzIWLmdvb2dsZS5wcm90b2J1Zi5WYWx1ZSobCglOdWxsVmFsdWUSDgoKTlVMTF9WQUxVRRAAQn8KE2NvbS5nb29nbGUucHJvdG9idWZCC1N0cnVjdFByb3RvUAFaL2dvb2dsZS5nb2xhbmcub3JnL3Byb3RvYnVmL3R5cGVzL2tub3duL3N0cnVjdHBi+AEBogIDR1BCqgIeR29vZ2xlLlByb3RvYnVmLldlbGxLbm93blR5cGVzYgZwcm90bzM");
/**
* Describes the message google.protobuf.Struct.
* Use `create(StructSchema)` to create a new message.
*/
var StructSchema = /* @__PURE__ */ messageDesc(file_google_protobuf_struct, 0);
/**
* Describes the message google.protobuf.Value.
* Use `create(ValueSchema)` to create a new message.
*/
var ValueSchema = /* @__PURE__ */ messageDesc(file_google_protobuf_struct, 1);
/**
* Describes the message google.protobuf.ListValue.
* Use `create(ListValueSchema)` to create a new message.
*/
var ListValueSchema = /* @__PURE__ */ messageDesc(file_google_protobuf_struct, 2);
/**
* `NullValue` is a singleton enumeration to represent the null value for the
* `Value` type union.
*
* The JSON representation for `NullValue` is JSON `null`.
*
* @generated from enum google.protobuf.NullValue
*/
var NullValue;
(function(NullValue) {
	/**
	* Null value.
	*
	* @generated from enum value: NULL_VALUE = 0;
	*/
	NullValue[NullValue["NULL_VALUE"] = 0] = "NULL_VALUE";
})(NullValue || (NullValue = {}));
//#endregion
//#region ../../node_modules/@connectrpc/connect-web/node_modules/@bufbuild/protobuf/dist/esm/extensions.js
/**
* Set an extension value on a message. If the message already has a value for
* this extension, the value is replaced.
*
* If the extension does not extend the given message, an error is raised.
*/
function setExtension(message, extension, value) {
	var _a;
	assertExtendee(extension, message);
	const ufs = ((_a = message.$unknown) !== null && _a !== void 0 ? _a : []).filter((uf) => uf.no !== extension.number);
	const [container, field] = createExtensionContainer(extension, value);
	const writer = new BinaryWriter();
	writeField(writer, { writeUnknownFields: true }, container, field);
	const reader = new BinaryReader(writer.finish());
	while (reader.pos < reader.len) {
		const [no, wireType] = reader.tag();
		const data = reader.skip(wireType, no);
		ufs.push({
			no,
			wireType,
			data
		});
	}
	message.$unknown = ufs;
}
/**
* @private
*/
function createExtensionContainer(extension, value) {
	const localName = extension.typeName;
	const field = Object.assign(Object.assign({}, extension), {
		kind: "field",
		parent: extension.extendee,
		localName
	});
	const desc = Object.assign(Object.assign({}, extension.extendee), {
		fields: [field],
		members: [field],
		oneofs: []
	});
	const container = create(desc, value !== void 0 ? { [localName]: value } : void 0);
	return [
		reflect(desc, container),
		field,
		() => {
			const value = container[localName];
			if (value === void 0) {
				const desc = extension.message;
				if (isWrapperDesc(desc)) return scalarZeroValue(desc.fields[0].scalar, desc.fields[0].longAsString);
				return create(desc);
			}
			return value;
		}
	];
}
function assertExtendee(extension, message) {
	if (extension.extendee.typeName != message.$typeName) throw new Error(`extension ${extension.typeName} can only be applied to message ${extension.extendee.typeName}`);
}
//#endregion
//#region ../../node_modules/@connectrpc/connect-web/node_modules/@bufbuild/protobuf/dist/esm/from-json.js
var jsonReadDefaults = { ignoreUnknownFields: false };
function makeReadOptions(options) {
	return options ? Object.assign(Object.assign({}, jsonReadDefaults), options) : jsonReadDefaults;
}
/**
* Parse a message from a JSON value.
*/
function fromJson(schema, json, options) {
	const msg = reflect(schema);
	try {
		readMessage(msg, json, makeReadOptions(options));
	} catch (e) {
		if (isFieldError(e)) throw new Error(`cannot decode ${e.field()} from JSON: ${e.message}`, { cause: e });
		throw e;
	}
	return msg.message;
}
function readMessage(msg, json, opts) {
	var _a;
	if (tryWktFromJson(msg, json, opts)) return;
	if (json == null || Array.isArray(json) || typeof json != "object") throw new Error(`cannot decode ${msg.desc} from JSON: ${formatVal(json)}`);
	const oneofSeen = /* @__PURE__ */ new Map();
	const jsonNames = /* @__PURE__ */ new Map();
	for (const field of msg.desc.fields) jsonNames.set(field.name, field).set(field.jsonName, field);
	for (const [jsonKey, jsonValue] of Object.entries(json)) {
		const field = jsonNames.get(jsonKey);
		if (field) {
			if (field.oneof) {
				if (jsonValue === null && field.fieldKind == "scalar") continue;
				const seen = oneofSeen.get(field.oneof);
				if (seen !== void 0) throw new FieldError(field.oneof, `oneof set multiple times by ${seen.name} and ${field.name}`);
				oneofSeen.set(field.oneof, field);
			}
			readField(msg, field, jsonValue, opts);
		} else {
			let extension = void 0;
			if (jsonKey.startsWith("[") && jsonKey.endsWith("]") && (extension = (_a = opts.registry) === null || _a === void 0 ? void 0 : _a.getExtension(jsonKey.substring(1, jsonKey.length - 1))) && extension.extendee.typeName === msg.desc.typeName) {
				const [container, field, get] = createExtensionContainer(extension);
				readField(container, field, jsonValue, opts);
				setExtension(msg.message, extension, get());
			}
			if (!extension && !opts.ignoreUnknownFields) throw new Error(`cannot decode ${msg.desc} from JSON: key "${jsonKey}" is unknown`);
		}
	}
}
function readField(msg, field, json, opts) {
	switch (field.fieldKind) {
		case "scalar":
			readScalarField(msg, field, json);
			break;
		case "enum":
			readEnumField(msg, field, json, opts);
			break;
		case "message":
			readMessageField(msg, field, json, opts);
			break;
		case "list":
			readListField(msg.get(field), json, opts);
			break;
		case "map":
			readMapField(msg.get(field), json, opts);
			break;
	}
}
function readMapField(map, json, opts) {
	if (json === null) return;
	const field = map.field();
	if (typeof json != "object" || Array.isArray(json)) throw new FieldError(field, "expected object, got " + formatVal(json));
	for (const [jsonMapKey, jsonMapValue] of Object.entries(json)) {
		if (jsonMapValue === null) throw new FieldError(field, "map value must not be null");
		let value;
		switch (field.mapKind) {
			case "message":
				const msgValue = reflect(field.message);
				readMessage(msgValue, jsonMapValue, opts);
				value = msgValue;
				break;
			case "enum":
				value = readEnum(field.enum, jsonMapValue, opts.ignoreUnknownFields, true);
				if (value === tokenIgnoredUnknownEnum) return;
				break;
			case "scalar":
				value = scalarFromJson(field, jsonMapValue, true);
				break;
		}
		const key = mapKeyFromJson(field.mapKey, jsonMapKey);
		map.set(key, value);
	}
}
function readListField(list, json, opts) {
	if (json === null) return;
	const field = list.field();
	if (!Array.isArray(json)) throw new FieldError(field, "expected Array, got " + formatVal(json));
	for (const jsonItem of json) {
		if (jsonItem === null) throw new FieldError(field, "list item must not be null");
		switch (field.listKind) {
			case "message":
				const msgValue = reflect(field.message);
				readMessage(msgValue, jsonItem, opts);
				list.add(msgValue);
				break;
			case "enum":
				const enumValue = readEnum(field.enum, jsonItem, opts.ignoreUnknownFields, true);
				if (enumValue !== tokenIgnoredUnknownEnum) list.add(enumValue);
				break;
			case "scalar":
				list.add(scalarFromJson(field, jsonItem, true));
				break;
		}
	}
}
function readMessageField(msg, field, json, opts) {
	if (json === null && field.message.typeName != "google.protobuf.Value") {
		msg.clear(field);
		return;
	}
	const msgValue = msg.isSet(field) ? msg.get(field) : reflect(field.message);
	readMessage(msgValue, json, opts);
	msg.set(field, msgValue);
}
function readEnumField(msg, field, json, opts) {
	const enumValue = readEnum(field.enum, json, opts.ignoreUnknownFields, false);
	if (enumValue === tokenNull) msg.clear(field);
	else if (enumValue !== tokenIgnoredUnknownEnum) msg.set(field, enumValue);
}
function readScalarField(msg, field, json) {
	const scalarValue = scalarFromJson(field, json, false);
	if (scalarValue === tokenNull) msg.clear(field);
	else msg.set(field, scalarValue);
}
var tokenIgnoredUnknownEnum = Symbol();
function readEnum(desc, json, ignoreUnknownFields, nullAsZeroValue) {
	if (json === null) {
		if (desc.typeName == "google.protobuf.NullValue") return 0;
		return nullAsZeroValue ? desc.values[0].number : tokenNull;
	}
	switch (typeof json) {
		case "number":
			if (Number.isInteger(json)) return json;
			break;
		case "string":
			const value = desc.values.find((ev) => ev.name === json);
			if (value !== void 0) return value.number;
			if (ignoreUnknownFields) return tokenIgnoredUnknownEnum;
			break;
	}
	throw new Error(`cannot decode ${desc} from JSON: ${formatVal(json)}`);
}
var tokenNull = Symbol();
function scalarFromJson(field, json, nullAsZeroValue) {
	if (json === null) {
		if (nullAsZeroValue) return scalarZeroValue(field.scalar, false);
		return tokenNull;
	}
	switch (field.scalar) {
		case ScalarType.DOUBLE:
		case ScalarType.FLOAT:
			if (json === "NaN") return NaN;
			if (json === "Infinity") return Number.POSITIVE_INFINITY;
			if (json === "-Infinity") return Number.NEGATIVE_INFINITY;
			if (typeof json == "number") {
				if (Number.isNaN(json)) throw new FieldError(field, "unexpected NaN number");
				if (!Number.isFinite(json)) throw new FieldError(field, "unexpected infinite number");
				break;
			}
			if (typeof json == "string") {
				if (json === "") break;
				if (json.trim().length !== json.length) break;
				const float = Number(json);
				if (!Number.isFinite(float)) break;
				return float;
			}
			break;
		case ScalarType.INT32:
		case ScalarType.FIXED32:
		case ScalarType.SFIXED32:
		case ScalarType.SINT32:
		case ScalarType.UINT32: return int32FromJson(json);
		case ScalarType.BYTES:
			if (typeof json == "string") {
				if (json === "") return new Uint8Array(0);
				try {
					return base64Decode(json);
				} catch (e) {
					throw new FieldError(field, e instanceof Error ? e.message : String(e));
				}
			}
			break;
	}
	return json;
}
/**
* Try to parse a JSON value to a map key for the reflect API.
*
* Returns the input if the JSON value cannot be converted.
*/
function mapKeyFromJson(type, json) {
	switch (type) {
		case ScalarType.BOOL:
			switch (json) {
				case "true": return true;
				case "false": return false;
			}
			return json;
		case ScalarType.INT32:
		case ScalarType.FIXED32:
		case ScalarType.UINT32:
		case ScalarType.SFIXED32:
		case ScalarType.SINT32: return int32FromJson(json);
		default: return json;
	}
}
/**
* Try to parse a JSON value to a 32-bit integer for the reflect API.
*
* Returns the input if the JSON value cannot be converted.
*/
function int32FromJson(json) {
	if (typeof json == "string") {
		if (json === "") return json;
		if (json.trim().length !== json.length) return json;
		const num = Number(json);
		if (Number.isNaN(num)) return json;
		return num;
	}
	return json;
}
function tryWktFromJson(msg, jsonValue, opts) {
	if (!msg.desc.typeName.startsWith("google.protobuf.")) return false;
	switch (msg.desc.typeName) {
		case "google.protobuf.Any":
			anyFromJson(msg.message, jsonValue, opts);
			return true;
		case "google.protobuf.Timestamp":
			timestampFromJson(msg.message, jsonValue);
			return true;
		case "google.protobuf.Duration":
			durationFromJson(msg.message, jsonValue);
			return true;
		case "google.protobuf.FieldMask":
			fieldMaskFromJson(msg.message, jsonValue);
			return true;
		case "google.protobuf.Struct":
			structFromJson(msg.message, jsonValue);
			return true;
		case "google.protobuf.Value":
			valueFromJson(msg.message, jsonValue);
			return true;
		case "google.protobuf.ListValue":
			listValueFromJson(msg.message, jsonValue);
			return true;
		default:
			if (isWrapperDesc(msg.desc)) {
				const valueField = msg.desc.fields[0];
				if (jsonValue === null) msg.clear(valueField);
				else msg.set(valueField, scalarFromJson(valueField, jsonValue, true));
				return true;
			}
			return false;
	}
}
function anyFromJson(any, json, opts) {
	var _a;
	if (json === null || Array.isArray(json) || typeof json != "object") throw new Error(`cannot decode message ${any.$typeName} from JSON: expected object but got ${formatVal(json)}`);
	if (Object.keys(json).length == 0) return;
	const typeUrl = json["@type"];
	if (typeof typeUrl != "string" || typeUrl == "") throw new Error(`cannot decode message ${any.$typeName} from JSON: "@type" is empty`);
	const typeName = typeUrl.includes("/") ? typeUrl.substring(typeUrl.lastIndexOf("/") + 1) : typeUrl;
	if (!typeName.length) throw new Error(`cannot decode message ${any.$typeName} from JSON: "@type" is invalid`);
	const desc = (_a = opts.registry) === null || _a === void 0 ? void 0 : _a.getMessage(typeName);
	if (!desc) throw new Error(`cannot decode message ${any.$typeName} from JSON: ${typeUrl} is not in the type registry`);
	const msg = reflect(desc);
	if (typeName.startsWith("google.protobuf.") && Object.prototype.hasOwnProperty.call(json, "value")) {
		const value = json.value;
		readMessage(msg, value, opts);
	} else {
		const copy = Object.assign({}, json);
		delete copy["@type"];
		readMessage(msg, copy, opts);
	}
	anyPack(msg.desc, msg.message, any);
}
function timestampFromJson(timestamp, json) {
	if (typeof json !== "string") throw new Error(`cannot decode message ${timestamp.$typeName} from JSON: ${formatVal(json)}`);
	const matches = json.match(/^([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2}):([0-9]{2})(?:\.([0-9]{1,9}))?(?:Z|([+-][0-9][0-9]:[0-9][0-9]))$/);
	if (!matches) throw new Error(`cannot decode message ${timestamp.$typeName} from JSON: invalid RFC 3339 string`);
	const ms = Date.parse(matches[1] + "-" + matches[2] + "-" + matches[3] + "T" + matches[4] + ":" + matches[5] + ":" + matches[6] + (matches[8] ? matches[8] : "Z"));
	if (Number.isNaN(ms)) throw new Error(`cannot decode message ${timestamp.$typeName} from JSON: invalid RFC 3339 string`);
	if (ms < Date.parse("0001-01-01T00:00:00Z") || ms > Date.parse("9999-12-31T23:59:59Z")) throw new Error(`cannot decode message ${timestamp.$typeName} from JSON: must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive`);
	timestamp.seconds = protoInt64.parse(ms / 1e3);
	timestamp.nanos = 0;
	if (matches[7]) timestamp.nanos = parseInt("1" + matches[7] + "0".repeat(9 - matches[7].length)) - 1e9;
}
function durationFromJson(duration, json) {
	if (typeof json !== "string") throw new Error(`cannot decode message ${duration.$typeName} from JSON: ${formatVal(json)}`);
	const match = json.match(/^(-?[0-9]+)(?:\.([0-9]+))?s/);
	if (match === null) throw new Error(`cannot decode message ${duration.$typeName} from JSON: ${formatVal(json)}`);
	const longSeconds = Number(match[1]);
	if (longSeconds > 315576e6 || longSeconds < -315576e6) throw new Error(`cannot decode message ${duration.$typeName} from JSON: ${formatVal(json)}`);
	duration.seconds = protoInt64.parse(longSeconds);
	if (typeof match[2] !== "string") return;
	const nanosStr = match[2] + "0".repeat(9 - match[2].length);
	duration.nanos = parseInt(nanosStr);
	if (longSeconds < 0 || Object.is(longSeconds, -0)) duration.nanos = -duration.nanos;
}
function fieldMaskFromJson(fieldMask, json) {
	if (typeof json !== "string") throw new Error(`cannot decode message ${fieldMask.$typeName} from JSON: ${formatVal(json)}`);
	if (json === "") return;
	function camelToSnake(str) {
		if (str.includes("_")) throw new Error(`cannot decode message ${fieldMask.$typeName} from JSON: path names must be lowerCamelCase`);
		const sc = str.replace(/[A-Z]/g, (letter) => "_" + letter.toLowerCase());
		return sc[0] === "_" ? sc.substring(1) : sc;
	}
	fieldMask.paths = json.split(",").map(camelToSnake);
}
function structFromJson(struct, json) {
	if (typeof json != "object" || json == null || Array.isArray(json)) throw new Error(`cannot decode message ${struct.$typeName} from JSON ${formatVal(json)}`);
	for (const [k, v] of Object.entries(json)) {
		const parsedV = create(ValueSchema);
		valueFromJson(parsedV, v);
		struct.fields[k] = parsedV;
	}
}
function valueFromJson(value, json) {
	switch (typeof json) {
		case "number":
			value.kind = {
				case: "numberValue",
				value: json
			};
			break;
		case "string":
			value.kind = {
				case: "stringValue",
				value: json
			};
			break;
		case "boolean":
			value.kind = {
				case: "boolValue",
				value: json
			};
			break;
		case "object":
			if (json === null) value.kind = {
				case: "nullValue",
				value: NullValue.NULL_VALUE
			};
			else if (Array.isArray(json)) {
				const listValue = create(ListValueSchema);
				listValueFromJson(listValue, json);
				value.kind = {
					case: "listValue",
					value: listValue
				};
			} else {
				const struct = create(StructSchema);
				structFromJson(struct, json);
				value.kind = {
					case: "structValue",
					value: struct
				};
			}
			break;
		default: throw new Error(`cannot decode message ${value.$typeName} from JSON ${formatVal(json)}`);
	}
	return value;
}
function listValueFromJson(listValue, json) {
	if (!Array.isArray(json)) throw new Error(`cannot decode message ${listValue.$typeName} from JSON ${formatVal(json)}`);
	for (const e of json) {
		const value = create(ValueSchema);
		valueFromJson(value, e);
		listValue.values.push(value);
	}
}
//#endregion
//#region ../../node_modules/@connectrpc/connect-web/dist/esm/assert-fetch-api.js
/**
* Asserts that the fetch API is available.
*/
function assertFetchApi() {
	try {
		new Headers();
	} catch (_) {
		throw new Error("connect-web requires the fetch API. Are you running on an old version of Node.js? Node.js is not supported in Connect for Web - please stay tuned for Connect for Node.");
	}
}
//#endregion
//#region ../../node_modules/@connectrpc/connect-web/dist/esm/connect-transport.js
var __await$1 = function(v) {
	return this instanceof __await$1 ? (this.v = v, this) : new __await$1(v);
};
var __asyncGenerator$1 = function(thisArg, _arguments, generator) {
	if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
	var g = generator.apply(thisArg, _arguments || []), i, q = [];
	return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function() {
		return this;
	}, i;
	function awaitReturn(f) {
		return function(v) {
			return Promise.resolve(v).then(f, reject);
		};
	}
	function verb(n, f) {
		if (g[n]) {
			i[n] = function(v) {
				return new Promise(function(a, b) {
					q.push([
						n,
						v,
						a,
						b
					]) > 1 || resume(n, v);
				});
			};
			if (f) i[n] = f(i[n]);
		}
	}
	function resume(n, v) {
		try {
			step(g[n](v));
		} catch (e) {
			settle(q[0][3], e);
		}
	}
	function step(r) {
		r.value instanceof __await$1 ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
	}
	function fulfill(value) {
		resume("next", value);
	}
	function reject(value) {
		resume("throw", value);
	}
	function settle(f, v) {
		if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
	}
};
var fetchOptions = { redirect: "error" };
/**
* Create a Transport for the Connect protocol, which makes unary and
* server-streaming methods available to web browsers. It uses the fetch
* API to make HTTP requests.
*/
function createConnectTransport(options) {
	var _a;
	assertFetchApi();
	const useBinaryFormat = (_a = options.useBinaryFormat) !== null && _a !== void 0 ? _a : false;
	return {
		async unary(method, signal, timeoutMs, header, message, contextValues) {
			const { serialize, parse } = createClientMethodSerializers(method, useBinaryFormat, options.jsonOptions, options.binaryOptions);
			timeoutMs = timeoutMs === void 0 ? options.defaultTimeoutMs : timeoutMs <= 0 ? void 0 : timeoutMs;
			return await runUnaryCall({
				interceptors: options.interceptors,
				signal,
				timeoutMs,
				req: {
					stream: false,
					service: method.parent,
					method,
					requestMethod: "POST",
					url: createMethodUrl(options.baseUrl, method),
					header: requestHeader(method.methodKind, useBinaryFormat, timeoutMs, header, false),
					contextValues: contextValues !== null && contextValues !== void 0 ? contextValues : createContextValues(),
					message
				},
				next: async (req) => {
					var _a;
					const useGet = options.useHttpGet === true && method.idempotency === MethodOptions_IdempotencyLevel.NO_SIDE_EFFECTS;
					let body = null;
					if (useGet) req = transformConnectPostToGetRequest(req, serialize(req.message), useBinaryFormat);
					else body = serialize(req.message);
					const response = await ((_a = options.fetch) !== null && _a !== void 0 ? _a : globalThis.fetch)(req.url, Object.assign(Object.assign({}, fetchOptions), {
						method: req.requestMethod,
						headers: req.header,
						signal: req.signal,
						body
					}));
					const { isUnaryError, unaryError } = validateResponse(method.methodKind, useBinaryFormat, response.status, response.headers);
					if (isUnaryError) throw errorFromJson(await response.json(), appendHeaders(...trailerDemux(response.headers)), unaryError);
					const [demuxedHeader, demuxedTrailer] = trailerDemux(response.headers);
					return {
						stream: false,
						service: method.parent,
						method,
						header: demuxedHeader,
						message: useBinaryFormat ? parse(new Uint8Array(await response.arrayBuffer())) : fromJson(method.output, await response.json(), getJsonOptions(options.jsonOptions)),
						trailer: demuxedTrailer
					};
				}
			});
		},
		async stream(method, signal, timeoutMs, header, input, contextValues) {
			const { serialize, parse } = createClientMethodSerializers(method, useBinaryFormat, options.jsonOptions, options.binaryOptions);
			function parseResponseBody(body, trailerTarget, header, signal) {
				return __asyncGenerator$1(this, arguments, function* parseResponseBody_1() {
					const reader = createEnvelopeReadableStream(body).getReader();
					let endStreamReceived = false;
					for (;;) {
						const result = yield __await$1(reader.read());
						if (result.done) break;
						const { flags, data } = result.value;
						if ((flags & 1) === 1) throw new ConnectError(`protocol error: received unsupported compressed output`, Code.Internal);
						if ((flags & 2) === 2) {
							endStreamReceived = true;
							const endStream = endStreamFromJson(data);
							if (endStream.error) {
								const error = endStream.error;
								header.forEach((value, key) => {
									error.metadata.append(key, value);
								});
								throw error;
							}
							endStream.metadata.forEach((value, key) => trailerTarget.set(key, value));
							continue;
						}
						yield yield __await$1(parse(data));
					}
					if ("throwIfAborted" in signal) signal.throwIfAborted();
					if (!endStreamReceived) throw "missing EndStreamResponse";
				});
			}
			async function createRequestBody(input) {
				if (method.methodKind != "server_streaming") throw "The fetch API does not support streaming request bodies";
				const r = await input[Symbol.asyncIterator]().next();
				if (r.done == true) throw "missing request message";
				return encodeEnvelope(0, serialize(r.value));
			}
			timeoutMs = timeoutMs === void 0 ? options.defaultTimeoutMs : timeoutMs <= 0 ? void 0 : timeoutMs;
			return await runStreamingCall({
				interceptors: options.interceptors,
				timeoutMs,
				signal,
				req: {
					stream: true,
					service: method.parent,
					method,
					requestMethod: "POST",
					url: createMethodUrl(options.baseUrl, method),
					header: requestHeader(method.methodKind, useBinaryFormat, timeoutMs, header, false),
					contextValues: contextValues !== null && contextValues !== void 0 ? contextValues : createContextValues(),
					message: input
				},
				next: async (req) => {
					var _a;
					const fRes = await ((_a = options.fetch) !== null && _a !== void 0 ? _a : globalThis.fetch)(req.url, Object.assign(Object.assign({}, fetchOptions), {
						method: req.requestMethod,
						headers: req.header,
						signal: req.signal,
						body: await createRequestBody(req.message)
					}));
					validateResponse(method.methodKind, useBinaryFormat, fRes.status, fRes.headers);
					if (fRes.body === null) throw "missing response body";
					const trailer = new Headers();
					return Object.assign(Object.assign({}, req), {
						header: fRes.headers,
						trailer,
						message: parseResponseBody(fRes.body, trailer, fRes.headers, req.signal)
					});
				}
			});
		}
	};
}
//#endregion
//#region ../../packages/agent-provider/node_modules/chalk/source/vendor/ansi-styles/index.js
var import_platform = /* @__PURE__ */ require_chunk.__toESM(require_platform(), 1);
var ANSI_BACKGROUND_OFFSET = 10;
var wrapAnsi16 = (offset = 0) => (code) => `\u001B[${code + offset}m`;
var wrapAnsi256 = (offset = 0) => (code) => `\u001B[${38 + offset};5;${code}m`;
var wrapAnsi16m = (offset = 0) => (red, green, blue) => `\u001B[${38 + offset};2;${red};${green};${blue}m`;
var styles$1 = {
	modifier: {
		reset: [0, 0],
		bold: [1, 22],
		dim: [2, 22],
		italic: [3, 23],
		underline: [4, 24],
		overline: [53, 55],
		inverse: [7, 27],
		hidden: [8, 28],
		strikethrough: [9, 29]
	},
	color: {
		black: [30, 39],
		red: [31, 39],
		green: [32, 39],
		yellow: [33, 39],
		blue: [34, 39],
		magenta: [35, 39],
		cyan: [36, 39],
		white: [37, 39],
		blackBright: [90, 39],
		gray: [90, 39],
		grey: [90, 39],
		redBright: [91, 39],
		greenBright: [92, 39],
		yellowBright: [93, 39],
		blueBright: [94, 39],
		magentaBright: [95, 39],
		cyanBright: [96, 39],
		whiteBright: [97, 39]
	},
	bgColor: {
		bgBlack: [40, 49],
		bgRed: [41, 49],
		bgGreen: [42, 49],
		bgYellow: [43, 49],
		bgBlue: [44, 49],
		bgMagenta: [45, 49],
		bgCyan: [46, 49],
		bgWhite: [47, 49],
		bgBlackBright: [100, 49],
		bgGray: [100, 49],
		bgGrey: [100, 49],
		bgRedBright: [101, 49],
		bgGreenBright: [102, 49],
		bgYellowBright: [103, 49],
		bgBlueBright: [104, 49],
		bgMagentaBright: [105, 49],
		bgCyanBright: [106, 49],
		bgWhiteBright: [107, 49]
	}
};
Object.keys(styles$1.modifier);
var foregroundColorNames = Object.keys(styles$1.color);
var backgroundColorNames = Object.keys(styles$1.bgColor);
[...foregroundColorNames, ...backgroundColorNames];
function assembleStyles() {
	const codes = /* @__PURE__ */ new Map();
	for (const [groupName, group] of Object.entries(styles$1)) {
		for (const [styleName, style] of Object.entries(group)) {
			styles$1[styleName] = {
				open: `\u001B[${style[0]}m`,
				close: `\u001B[${style[1]}m`
			};
			group[styleName] = styles$1[styleName];
			codes.set(style[0], style[1]);
		}
		Object.defineProperty(styles$1, groupName, {
			value: group,
			enumerable: false
		});
	}
	Object.defineProperty(styles$1, "codes", {
		value: codes,
		enumerable: false
	});
	styles$1.color.close = "\x1B[39m";
	styles$1.bgColor.close = "\x1B[49m";
	styles$1.color.ansi = wrapAnsi16();
	styles$1.color.ansi256 = wrapAnsi256();
	styles$1.color.ansi16m = wrapAnsi16m();
	styles$1.bgColor.ansi = wrapAnsi16(ANSI_BACKGROUND_OFFSET);
	styles$1.bgColor.ansi256 = wrapAnsi256(ANSI_BACKGROUND_OFFSET);
	styles$1.bgColor.ansi16m = wrapAnsi16m(ANSI_BACKGROUND_OFFSET);
	Object.defineProperties(styles$1, {
		rgbToAnsi256: {
			value(red, green, blue) {
				if (red === green && green === blue) {
					if (red < 8) return 16;
					if (red > 248) return 231;
					return Math.round((red - 8) / 247 * 24) + 232;
				}
				return 16 + 36 * Math.round(red / 255 * 5) + 6 * Math.round(green / 255 * 5) + Math.round(blue / 255 * 5);
			},
			enumerable: false
		},
		hexToRgb: {
			value(hex) {
				const matches = /[a-f\d]{6}|[a-f\d]{3}/i.exec(hex.toString(16));
				if (!matches) return [
					0,
					0,
					0
				];
				let [colorString] = matches;
				if (colorString.length === 3) colorString = [...colorString].map((character) => character + character).join("");
				const integer = Number.parseInt(colorString, 16);
				return [
					integer >> 16 & 255,
					integer >> 8 & 255,
					integer & 255
				];
			},
			enumerable: false
		},
		hexToAnsi256: {
			value: (hex) => styles$1.rgbToAnsi256(...styles$1.hexToRgb(hex)),
			enumerable: false
		},
		ansi256ToAnsi: {
			value(code) {
				if (code < 8) return 30 + code;
				if (code < 16) return 90 + (code - 8);
				let red;
				let green;
				let blue;
				if (code >= 232) {
					red = ((code - 232) * 10 + 8) / 255;
					green = red;
					blue = red;
				} else {
					code -= 16;
					const remainder = code % 36;
					red = Math.floor(code / 36) / 5;
					green = Math.floor(remainder / 6) / 5;
					blue = remainder % 6 / 5;
				}
				const value = Math.max(red, green, blue) * 2;
				if (value === 0) return 30;
				let result = 30 + (Math.round(blue) << 2 | Math.round(green) << 1 | Math.round(red));
				if (value === 2) result += 60;
				return result;
			},
			enumerable: false
		},
		rgbToAnsi: {
			value: (red, green, blue) => styles$1.ansi256ToAnsi(styles$1.rgbToAnsi256(red, green, blue)),
			enumerable: false
		},
		hexToAnsi: {
			value: (hex) => styles$1.ansi256ToAnsi(styles$1.hexToAnsi256(hex)),
			enumerable: false
		}
	});
	return styles$1;
}
var ansiStyles = assembleStyles();
//#endregion
//#region ../../packages/agent-provider/node_modules/chalk/source/vendor/supports-color/index.js
function hasFlag(flag, argv = globalThis.Deno ? globalThis.Deno.args : node_process.default.argv) {
	const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
	const position = argv.indexOf(prefix + flag);
	const terminatorPosition = argv.indexOf("--");
	return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
}
var { env } = node_process.default;
var flagForceColor;
if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) flagForceColor = 0;
else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) flagForceColor = 1;
function envForceColor() {
	if ("FORCE_COLOR" in env) {
		if (env.FORCE_COLOR === "true") return 1;
		if (env.FORCE_COLOR === "false") return 0;
		return env.FORCE_COLOR.length === 0 ? 1 : Math.min(Number.parseInt(env.FORCE_COLOR, 10), 3);
	}
}
function translateLevel(level) {
	if (level === 0) return false;
	return {
		level,
		hasBasic: true,
		has256: level >= 2,
		has16m: level >= 3
	};
}
function _supportsColor(haveStream, { streamIsTTY, sniffFlags = true } = {}) {
	const noFlagForceColor = envForceColor();
	if (noFlagForceColor !== void 0) flagForceColor = noFlagForceColor;
	const forceColor = sniffFlags ? flagForceColor : noFlagForceColor;
	if (forceColor === 0) return 0;
	if (sniffFlags) {
		if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) return 3;
		if (hasFlag("color=256")) return 2;
	}
	if ("TF_BUILD" in env && "AGENT_NAME" in env) return 1;
	if (haveStream && !streamIsTTY && forceColor === void 0) return 0;
	const min = forceColor || 0;
	if (env.TERM === "dumb") return min;
	if (node_process.default.platform === "win32") {
		const osRelease = node_os.default.release().split(".");
		if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) return Number(osRelease[2]) >= 14931 ? 3 : 2;
		return 1;
	}
	if ("CI" in env) {
		if ([
			"GITHUB_ACTIONS",
			"GITEA_ACTIONS",
			"CIRCLECI"
		].some((key) => key in env)) return 3;
		if ([
			"TRAVIS",
			"APPVEYOR",
			"GITLAB_CI",
			"BUILDKITE",
			"DRONE"
		].some((sign) => sign in env) || env.CI_NAME === "codeship") return 1;
		return min;
	}
	if ("TEAMCITY_VERSION" in env) return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
	if (env.COLORTERM === "truecolor") return 3;
	if (env.TERM === "xterm-kitty") return 3;
	if ("TERM_PROGRAM" in env) {
		const version = Number.parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
		switch (env.TERM_PROGRAM) {
			case "iTerm.app": return version >= 3 ? 3 : 2;
			case "Apple_Terminal": return 2;
		}
	}
	if (/-256(color)?$/i.test(env.TERM)) return 2;
	if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) return 1;
	if ("COLORTERM" in env) return 1;
	return min;
}
function createSupportsColor(stream, options = {}) {
	return translateLevel(_supportsColor(stream, {
		streamIsTTY: stream && stream.isTTY,
		...options
	}));
}
var supportsColor = {
	stdout: createSupportsColor({ isTTY: node_tty.default.isatty(1) }),
	stderr: createSupportsColor({ isTTY: node_tty.default.isatty(2) })
};
//#endregion
//#region ../../packages/agent-provider/node_modules/chalk/source/utilities.js
function stringReplaceAll(string, substring, replacer) {
	let index = string.indexOf(substring);
	if (index === -1) return string;
	const substringLength = substring.length;
	let endIndex = 0;
	let returnValue = "";
	do {
		returnValue += string.slice(endIndex, index) + substring + replacer;
		endIndex = index + substringLength;
		index = string.indexOf(substring, endIndex);
	} while (index !== -1);
	returnValue += string.slice(endIndex);
	return returnValue;
}
function stringEncaseCRLFWithFirstIndex(string, prefix, postfix, index) {
	let endIndex = 0;
	let returnValue = "";
	do {
		const gotCR = string[index - 1] === "\r";
		returnValue += string.slice(endIndex, gotCR ? index - 1 : index) + prefix + (gotCR ? "\r\n" : "\n") + postfix;
		endIndex = index + 1;
		index = string.indexOf("\n", endIndex);
	} while (index !== -1);
	returnValue += string.slice(endIndex);
	return returnValue;
}
//#endregion
//#region ../../packages/agent-provider/node_modules/chalk/source/index.js
var { stdout: stdoutColor, stderr: stderrColor } = supportsColor;
var GENERATOR = Symbol("GENERATOR");
var STYLER = Symbol("STYLER");
var IS_EMPTY = Symbol("IS_EMPTY");
var levelMapping = [
	"ansi",
	"ansi",
	"ansi256",
	"ansi16m"
];
var styles = Object.create(null);
var applyOptions = (object, options = {}) => {
	if (options.level && !(Number.isInteger(options.level) && options.level >= 0 && options.level <= 3)) throw new Error("The `level` option should be an integer from 0 to 3");
	const colorLevel = stdoutColor ? stdoutColor.level : 0;
	object.level = options.level === void 0 ? colorLevel : options.level;
};
var chalkFactory = (options) => {
	const chalk = (...strings) => strings.join(" ");
	applyOptions(chalk, options);
	Object.setPrototypeOf(chalk, createChalk.prototype);
	return chalk;
};
function createChalk(options) {
	return chalkFactory(options);
}
Object.setPrototypeOf(createChalk.prototype, Function.prototype);
for (const [styleName, style] of Object.entries(ansiStyles)) styles[styleName] = { get() {
	const builder = createBuilder(this, createStyler(style.open, style.close, this[STYLER]), this[IS_EMPTY]);
	Object.defineProperty(this, styleName, { value: builder });
	return builder;
} };
styles.visible = { get() {
	const builder = createBuilder(this, this[STYLER], true);
	Object.defineProperty(this, "visible", { value: builder });
	return builder;
} };
var getModelAnsi = (model, level, type, ...arguments_) => {
	if (model === "rgb") {
		if (level === "ansi16m") return ansiStyles[type].ansi16m(...arguments_);
		if (level === "ansi256") return ansiStyles[type].ansi256(ansiStyles.rgbToAnsi256(...arguments_));
		return ansiStyles[type].ansi(ansiStyles.rgbToAnsi(...arguments_));
	}
	if (model === "hex") return getModelAnsi("rgb", level, type, ...ansiStyles.hexToRgb(...arguments_));
	return ansiStyles[type][model](...arguments_);
};
for (const model of [
	"rgb",
	"hex",
	"ansi256"
]) {
	styles[model] = { get() {
		const { level } = this;
		return function(...arguments_) {
			const styler = createStyler(getModelAnsi(model, levelMapping[level], "color", ...arguments_), ansiStyles.color.close, this[STYLER]);
			return createBuilder(this, styler, this[IS_EMPTY]);
		};
	} };
	const bgModel = "bg" + model[0].toUpperCase() + model.slice(1);
	styles[bgModel] = { get() {
		const { level } = this;
		return function(...arguments_) {
			const styler = createStyler(getModelAnsi(model, levelMapping[level], "bgColor", ...arguments_), ansiStyles.bgColor.close, this[STYLER]);
			return createBuilder(this, styler, this[IS_EMPTY]);
		};
	} };
}
var proto = Object.defineProperties(() => {}, {
	...styles,
	level: {
		enumerable: true,
		get() {
			return this[GENERATOR].level;
		},
		set(level) {
			this[GENERATOR].level = level;
		}
	}
});
var createStyler = (open, close, parent) => {
	let openAll;
	let closeAll;
	if (parent === void 0) {
		openAll = open;
		closeAll = close;
	} else {
		openAll = parent.openAll + open;
		closeAll = close + parent.closeAll;
	}
	return {
		open,
		close,
		openAll,
		closeAll,
		parent
	};
};
var createBuilder = (self, _styler, _isEmpty) => {
	const builder = (...arguments_) => applyStyle(builder, arguments_.length === 1 ? "" + arguments_[0] : arguments_.join(" "));
	Object.setPrototypeOf(builder, proto);
	builder[GENERATOR] = self;
	builder[STYLER] = _styler;
	builder[IS_EMPTY] = _isEmpty;
	return builder;
};
var applyStyle = (self, string) => {
	if (self.level <= 0 || !string) return self[IS_EMPTY] ? "" : string;
	let styler = self[STYLER];
	if (styler === void 0) return string;
	const { openAll, closeAll } = styler;
	if (string.includes("\x1B")) while (styler !== void 0) {
		string = stringReplaceAll(string, styler.close, styler.open);
		styler = styler.parent;
	}
	const lfIndex = string.indexOf("\n");
	if (lfIndex !== -1) string = stringEncaseCRLFWithFirstIndex(string, closeAll, openAll, lfIndex);
	return openAll + string + closeAll;
};
Object.defineProperties(createChalk.prototype, styles);
var chalk = createChalk();
createChalk({ level: stderrColor ? stderrColor.level : 0 });
//#endregion
//#region ../../node_modules/dockerfile-ast/lib/argument.js
var require_argument = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Argument = void 0;
	var Argument = class {
		constructor(value, range) {
			this.value = value;
			this.range = range;
		}
		toString() {
			return this.value;
		}
		getRange() {
			return this.range;
		}
		getValue() {
			return this.value;
		}
		isAfter(position) {
			if (this.range.end.line < position.line) return false;
			return this.range.start.line > position.line ? true : this.range.start.character > position.character;
		}
		isBefore(position) {
			if (this.range.start.line < position.line) return true;
			return this.range.end.line > position.line ? false : this.range.end.character < position.character;
		}
	};
	exports.Argument = Argument;
}));
//#endregion
//#region ../../node_modules/dockerfile-ast/lib/jsonArgument.js
var require_jsonArgument = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.JSONArgument = void 0;
	var argument_1 = require_argument();
	var JSONArgument = class extends argument_1.Argument {
		constructor(value, range, jsonRange) {
			super(value, range);
			this.jsonRange = jsonRange;
		}
		getJSONRange() {
			return this.jsonRange;
		}
		getJSONValue() {
			let value = super.getValue();
			value = value.substring(1, value.length - 1);
			return value;
		}
	};
	exports.JSONArgument = JSONArgument;
}));
//#endregion
//#region ../../node_modules/vscode-languageserver-types/lib/umd/main.js
var require_main$1 = /* @__PURE__ */ require_chunk.__commonJSMin(((exports, module) => {
	(function(factory) {
		if (typeof module === "object" && typeof module.exports === "object") {
			var v = factory(require, exports);
			if (v !== void 0) module.exports = v;
		} else if (typeof define === "function" && define.amd) define(["require", "exports"], factory);
	})(function(require, exports$1) {
		"use strict";
		Object.defineProperty(exports$1, "__esModule", { value: true });
		exports$1.TextDocument = exports$1.EOL = exports$1.WorkspaceFolder = exports$1.InlineCompletionContext = exports$1.SelectedCompletionInfo = exports$1.InlineCompletionTriggerKind = exports$1.InlineCompletionList = exports$1.InlineCompletionItem = exports$1.StringValue = exports$1.InlayHint = exports$1.InlayHintLabelPart = exports$1.InlayHintKind = exports$1.InlineValueContext = exports$1.InlineValueEvaluatableExpression = exports$1.InlineValueVariableLookup = exports$1.InlineValueText = exports$1.SemanticTokens = exports$1.SemanticTokenModifiers = exports$1.SemanticTokenTypes = exports$1.SelectionRange = exports$1.DocumentLink = exports$1.FormattingOptions = exports$1.CodeLens = exports$1.CodeAction = exports$1.CodeActionContext = exports$1.CodeActionTriggerKind = exports$1.CodeActionKind = exports$1.DocumentSymbol = exports$1.WorkspaceSymbol = exports$1.SymbolInformation = exports$1.SymbolTag = exports$1.SymbolKind = exports$1.DocumentHighlight = exports$1.DocumentHighlightKind = exports$1.SignatureInformation = exports$1.ParameterInformation = exports$1.Hover = exports$1.MarkedString = exports$1.CompletionList = exports$1.CompletionItem = exports$1.CompletionItemLabelDetails = exports$1.InsertTextMode = exports$1.InsertReplaceEdit = exports$1.CompletionItemTag = exports$1.InsertTextFormat = exports$1.CompletionItemKind = exports$1.MarkupContent = exports$1.MarkupKind = exports$1.TextDocumentItem = exports$1.OptionalVersionedTextDocumentIdentifier = exports$1.VersionedTextDocumentIdentifier = exports$1.TextDocumentIdentifier = exports$1.WorkspaceChange = exports$1.WorkspaceEdit = exports$1.DeleteFile = exports$1.RenameFile = exports$1.CreateFile = exports$1.TextDocumentEdit = exports$1.AnnotatedTextEdit = exports$1.ChangeAnnotationIdentifier = exports$1.ChangeAnnotation = exports$1.TextEdit = exports$1.Command = exports$1.Diagnostic = exports$1.CodeDescription = exports$1.DiagnosticTag = exports$1.DiagnosticSeverity = exports$1.DiagnosticRelatedInformation = exports$1.FoldingRange = exports$1.FoldingRangeKind = exports$1.ColorPresentation = exports$1.ColorInformation = exports$1.Color = exports$1.LocationLink = exports$1.Location = exports$1.Range = exports$1.Position = exports$1.uinteger = exports$1.integer = exports$1.URI = exports$1.DocumentUri = void 0;
		var DocumentUri;
		(function(DocumentUri) {
			function is(value) {
				return typeof value === "string";
			}
			DocumentUri.is = is;
		})(DocumentUri || (exports$1.DocumentUri = DocumentUri = {}));
		var URI;
		(function(URI) {
			function is(value) {
				return typeof value === "string";
			}
			URI.is = is;
		})(URI || (exports$1.URI = URI = {}));
		var integer;
		(function(integer) {
			integer.MIN_VALUE = -2147483648;
			integer.MAX_VALUE = 2147483647;
			function is(value) {
				return typeof value === "number" && integer.MIN_VALUE <= value && value <= integer.MAX_VALUE;
			}
			integer.is = is;
		})(integer || (exports$1.integer = integer = {}));
		var uinteger;
		(function(uinteger) {
			uinteger.MIN_VALUE = 0;
			uinteger.MAX_VALUE = 2147483647;
			function is(value) {
				return typeof value === "number" && uinteger.MIN_VALUE <= value && value <= uinteger.MAX_VALUE;
			}
			uinteger.is = is;
		})(uinteger || (exports$1.uinteger = uinteger = {}));
		/**
		* The Position namespace provides helper functions to work with
		* {@link Position} literals.
		*/
		var Position;
		(function(Position) {
			/**
			* Creates a new Position literal from the given line and character.
			* @param line The position's line.
			* @param character The position's character.
			*/
			function create(line, character) {
				if (line === Number.MAX_VALUE) line = uinteger.MAX_VALUE;
				if (character === Number.MAX_VALUE) character = uinteger.MAX_VALUE;
				return {
					line,
					character
				};
			}
			Position.create = create;
			/**
			* Checks whether the given literal conforms to the {@link Position} interface.
			*/
			function is(value) {
				var candidate = value;
				return Is.objectLiteral(candidate) && Is.uinteger(candidate.line) && Is.uinteger(candidate.character);
			}
			Position.is = is;
		})(Position || (exports$1.Position = Position = {}));
		/**
		* The Range namespace provides helper functions to work with
		* {@link Range} literals.
		*/
		var Range;
		(function(Range) {
			function create(one, two, three, four) {
				if (Is.uinteger(one) && Is.uinteger(two) && Is.uinteger(three) && Is.uinteger(four)) return {
					start: Position.create(one, two),
					end: Position.create(three, four)
				};
				else if (Position.is(one) && Position.is(two)) return {
					start: one,
					end: two
				};
				else throw new Error("Range#create called with invalid arguments[".concat(one, ", ").concat(two, ", ").concat(three, ", ").concat(four, "]"));
			}
			Range.create = create;
			/**
			* Checks whether the given literal conforms to the {@link Range} interface.
			*/
			function is(value) {
				var candidate = value;
				return Is.objectLiteral(candidate) && Position.is(candidate.start) && Position.is(candidate.end);
			}
			Range.is = is;
		})(Range || (exports$1.Range = Range = {}));
		/**
		* The Location namespace provides helper functions to work with
		* {@link Location} literals.
		*/
		var Location;
		(function(Location) {
			/**
			* Creates a Location literal.
			* @param uri The location's uri.
			* @param range The location's range.
			*/
			function create(uri, range) {
				return {
					uri,
					range
				};
			}
			Location.create = create;
			/**
			* Checks whether the given literal conforms to the {@link Location} interface.
			*/
			function is(value) {
				var candidate = value;
				return Is.objectLiteral(candidate) && Range.is(candidate.range) && (Is.string(candidate.uri) || Is.undefined(candidate.uri));
			}
			Location.is = is;
		})(Location || (exports$1.Location = Location = {}));
		/**
		* The LocationLink namespace provides helper functions to work with
		* {@link LocationLink} literals.
		*/
		var LocationLink;
		(function(LocationLink) {
			/**
			* Creates a LocationLink literal.
			* @param targetUri The definition's uri.
			* @param targetRange The full range of the definition.
			* @param targetSelectionRange The span of the symbol definition at the target.
			* @param originSelectionRange The span of the symbol being defined in the originating source file.
			*/
			function create(targetUri, targetRange, targetSelectionRange, originSelectionRange) {
				return {
					targetUri,
					targetRange,
					targetSelectionRange,
					originSelectionRange
				};
			}
			LocationLink.create = create;
			/**
			* Checks whether the given literal conforms to the {@link LocationLink} interface.
			*/
			function is(value) {
				var candidate = value;
				return Is.objectLiteral(candidate) && Range.is(candidate.targetRange) && Is.string(candidate.targetUri) && Range.is(candidate.targetSelectionRange) && (Range.is(candidate.originSelectionRange) || Is.undefined(candidate.originSelectionRange));
			}
			LocationLink.is = is;
		})(LocationLink || (exports$1.LocationLink = LocationLink = {}));
		/**
		* The Color namespace provides helper functions to work with
		* {@link Color} literals.
		*/
		var Color;
		(function(Color) {
			/**
			* Creates a new Color literal.
			*/
			function create(red, green, blue, alpha) {
				return {
					red,
					green,
					blue,
					alpha
				};
			}
			Color.create = create;
			/**
			* Checks whether the given literal conforms to the {@link Color} interface.
			*/
			function is(value) {
				var candidate = value;
				return Is.objectLiteral(candidate) && Is.numberRange(candidate.red, 0, 1) && Is.numberRange(candidate.green, 0, 1) && Is.numberRange(candidate.blue, 0, 1) && Is.numberRange(candidate.alpha, 0, 1);
			}
			Color.is = is;
		})(Color || (exports$1.Color = Color = {}));
		/**
		* The ColorInformation namespace provides helper functions to work with
		* {@link ColorInformation} literals.
		*/
		var ColorInformation;
		(function(ColorInformation) {
			/**
			* Creates a new ColorInformation literal.
			*/
			function create(range, color) {
				return {
					range,
					color
				};
			}
			ColorInformation.create = create;
			/**
			* Checks whether the given literal conforms to the {@link ColorInformation} interface.
			*/
			function is(value) {
				var candidate = value;
				return Is.objectLiteral(candidate) && Range.is(candidate.range) && Color.is(candidate.color);
			}
			ColorInformation.is = is;
		})(ColorInformation || (exports$1.ColorInformation = ColorInformation = {}));
		/**
		* The Color namespace provides helper functions to work with
		* {@link ColorPresentation} literals.
		*/
		var ColorPresentation;
		(function(ColorPresentation) {
			/**
			* Creates a new ColorInformation literal.
			*/
			function create(label, textEdit, additionalTextEdits) {
				return {
					label,
					textEdit,
					additionalTextEdits
				};
			}
			ColorPresentation.create = create;
			/**
			* Checks whether the given literal conforms to the {@link ColorInformation} interface.
			*/
			function is(value) {
				var candidate = value;
				return Is.objectLiteral(candidate) && Is.string(candidate.label) && (Is.undefined(candidate.textEdit) || TextEdit.is(candidate)) && (Is.undefined(candidate.additionalTextEdits) || Is.typedArray(candidate.additionalTextEdits, TextEdit.is));
			}
			ColorPresentation.is = is;
		})(ColorPresentation || (exports$1.ColorPresentation = ColorPresentation = {}));
		/**
		* A set of predefined range kinds.
		*/
		var FoldingRangeKind;
		(function(FoldingRangeKind) {
			/**
			* Folding range for a comment
			*/
			FoldingRangeKind.Comment = "comment";
			/**
			* Folding range for an import or include
			*/
			FoldingRangeKind.Imports = "imports";
			/**
			* Folding range for a region (e.g. `#region`)
			*/
			FoldingRangeKind.Region = "region";
		})(FoldingRangeKind || (exports$1.FoldingRangeKind = FoldingRangeKind = {}));
		/**
		* The folding range namespace provides helper functions to work with
		* {@link FoldingRange} literals.
		*/
		var FoldingRange;
		(function(FoldingRange) {
			/**
			* Creates a new FoldingRange literal.
			*/
			function create(startLine, endLine, startCharacter, endCharacter, kind, collapsedText) {
				var result = {
					startLine,
					endLine
				};
				if (Is.defined(startCharacter)) result.startCharacter = startCharacter;
				if (Is.defined(endCharacter)) result.endCharacter = endCharacter;
				if (Is.defined(kind)) result.kind = kind;
				if (Is.defined(collapsedText)) result.collapsedText = collapsedText;
				return result;
			}
			FoldingRange.create = create;
			/**
			* Checks whether the given literal conforms to the {@link FoldingRange} interface.
			*/
			function is(value) {
				var candidate = value;
				return Is.objectLiteral(candidate) && Is.uinteger(candidate.startLine) && Is.uinteger(candidate.startLine) && (Is.undefined(candidate.startCharacter) || Is.uinteger(candidate.startCharacter)) && (Is.undefined(candidate.endCharacter) || Is.uinteger(candidate.endCharacter)) && (Is.undefined(candidate.kind) || Is.string(candidate.kind));
			}
			FoldingRange.is = is;
		})(FoldingRange || (exports$1.FoldingRange = FoldingRange = {}));
		/**
		* The DiagnosticRelatedInformation namespace provides helper functions to work with
		* {@link DiagnosticRelatedInformation} literals.
		*/
		var DiagnosticRelatedInformation;
		(function(DiagnosticRelatedInformation) {
			/**
			* Creates a new DiagnosticRelatedInformation literal.
			*/
			function create(location, message) {
				return {
					location,
					message
				};
			}
			DiagnosticRelatedInformation.create = create;
			/**
			* Checks whether the given literal conforms to the {@link DiagnosticRelatedInformation} interface.
			*/
			function is(value) {
				var candidate = value;
				return Is.defined(candidate) && Location.is(candidate.location) && Is.string(candidate.message);
			}
			DiagnosticRelatedInformation.is = is;
		})(DiagnosticRelatedInformation || (exports$1.DiagnosticRelatedInformation = DiagnosticRelatedInformation = {}));
		/**
		* The diagnostic's severity.
		*/
		var DiagnosticSeverity;
		(function(DiagnosticSeverity) {
			/**
			* Reports an error.
			*/
			DiagnosticSeverity.Error = 1;
			/**
			* Reports a warning.
			*/
			DiagnosticSeverity.Warning = 2;
			/**
			* Reports an information.
			*/
			DiagnosticSeverity.Information = 3;
			/**
			* Reports a hint.
			*/
			DiagnosticSeverity.Hint = 4;
		})(DiagnosticSeverity || (exports$1.DiagnosticSeverity = DiagnosticSeverity = {}));
		/**
		* The diagnostic tags.
		*
		* @since 3.15.0
		*/
		var DiagnosticTag;
		(function(DiagnosticTag) {
			/**
			* Unused or unnecessary code.
			*
			* Clients are allowed to render diagnostics with this tag faded out instead of having
			* an error squiggle.
			*/
			DiagnosticTag.Unnecessary = 1;
			/**
			* Deprecated or obsolete code.
			*
			* Clients are allowed to rendered diagnostics with this tag strike through.
			*/
			DiagnosticTag.Deprecated = 2;
		})(DiagnosticTag || (exports$1.DiagnosticTag = DiagnosticTag = {}));
		/**
		* The CodeDescription namespace provides functions to deal with descriptions for diagnostic codes.
		*
		* @since 3.16.0
		*/
		var CodeDescription;
		(function(CodeDescription) {
			function is(value) {
				var candidate = value;
				return Is.objectLiteral(candidate) && Is.string(candidate.href);
			}
			CodeDescription.is = is;
		})(CodeDescription || (exports$1.CodeDescription = CodeDescription = {}));
		/**
		* The Diagnostic namespace provides helper functions to work with
		* {@link Diagnostic} literals.
		*/
		var Diagnostic;
		(function(Diagnostic) {
			/**
			* Creates a new Diagnostic literal.
			*/
			function create(range, message, severity, code, source, relatedInformation) {
				var result = {
					range,
					message
				};
				if (Is.defined(severity)) result.severity = severity;
				if (Is.defined(code)) result.code = code;
				if (Is.defined(source)) result.source = source;
				if (Is.defined(relatedInformation)) result.relatedInformation = relatedInformation;
				return result;
			}
			Diagnostic.create = create;
			/**
			* Checks whether the given literal conforms to the {@link Diagnostic} interface.
			*/
			function is(value) {
				var _a;
				var candidate = value;
				return Is.defined(candidate) && Range.is(candidate.range) && Is.string(candidate.message) && (Is.number(candidate.severity) || Is.undefined(candidate.severity)) && (Is.integer(candidate.code) || Is.string(candidate.code) || Is.undefined(candidate.code)) && (Is.undefined(candidate.codeDescription) || Is.string((_a = candidate.codeDescription) === null || _a === void 0 ? void 0 : _a.href)) && (Is.string(candidate.source) || Is.undefined(candidate.source)) && (Is.undefined(candidate.relatedInformation) || Is.typedArray(candidate.relatedInformation, DiagnosticRelatedInformation.is));
			}
			Diagnostic.is = is;
		})(Diagnostic || (exports$1.Diagnostic = Diagnostic = {}));
		/**
		* The Command namespace provides helper functions to work with
		* {@link Command} literals.
		*/
		var Command;
		(function(Command) {
			/**
			* Creates a new Command literal.
			*/
			function create(title, command) {
				var args = [];
				for (var _i = 2; _i < arguments.length; _i++) args[_i - 2] = arguments[_i];
				var result = {
					title,
					command
				};
				if (Is.defined(args) && args.length > 0) result.arguments = args;
				return result;
			}
			Command.create = create;
			/**
			* Checks whether the given literal conforms to the {@link Command} interface.
			*/
			function is(value) {
				var candidate = value;
				return Is.defined(candidate) && Is.string(candidate.title) && Is.string(candidate.command);
			}
			Command.is = is;
		})(Command || (exports$1.Command = Command = {}));
		/**
		* The TextEdit namespace provides helper function to create replace,
		* insert and delete edits more easily.
		*/
		var TextEdit;
		(function(TextEdit) {
			/**
			* Creates a replace text edit.
			* @param range The range of text to be replaced.
			* @param newText The new text.
			*/
			function replace(range, newText) {
				return {
					range,
					newText
				};
			}
			TextEdit.replace = replace;
			/**
			* Creates an insert text edit.
			* @param position The position to insert the text at.
			* @param newText The text to be inserted.
			*/
			function insert(position, newText) {
				return {
					range: {
						start: position,
						end: position
					},
					newText
				};
			}
			TextEdit.insert = insert;
			/**
			* Creates a delete text edit.
			* @param range The range of text to be deleted.
			*/
			function del(range) {
				return {
					range,
					newText: ""
				};
			}
			TextEdit.del = del;
			function is(value) {
				var candidate = value;
				return Is.objectLiteral(candidate) && Is.string(candidate.newText) && Range.is(candidate.range);
			}
			TextEdit.is = is;
		})(TextEdit || (exports$1.TextEdit = TextEdit = {}));
		var ChangeAnnotation;
		(function(ChangeAnnotation) {
			function create(label, needsConfirmation, description) {
				var result = { label };
				if (needsConfirmation !== void 0) result.needsConfirmation = needsConfirmation;
				if (description !== void 0) result.description = description;
				return result;
			}
			ChangeAnnotation.create = create;
			function is(value) {
				var candidate = value;
				return Is.objectLiteral(candidate) && Is.string(candidate.label) && (Is.boolean(candidate.needsConfirmation) || candidate.needsConfirmation === void 0) && (Is.string(candidate.description) || candidate.description === void 0);
			}
			ChangeAnnotation.is = is;
		})(ChangeAnnotation || (exports$1.ChangeAnnotation = ChangeAnnotation = {}));
		var ChangeAnnotationIdentifier;
		(function(ChangeAnnotationIdentifier) {
			function is(value) {
				var candidate = value;
				return Is.string(candidate);
			}
			ChangeAnnotationIdentifier.is = is;
		})(ChangeAnnotationIdentifier || (exports$1.ChangeAnnotationIdentifier = ChangeAnnotationIdentifier = {}));
		var AnnotatedTextEdit;
		(function(AnnotatedTextEdit) {
			/**
			* Creates an annotated replace text edit.
			*
			* @param range The range of text to be replaced.
			* @param newText The new text.
			* @param annotation The annotation.
			*/
			function replace(range, newText, annotation) {
				return {
					range,
					newText,
					annotationId: annotation
				};
			}
			AnnotatedTextEdit.replace = replace;
			/**
			* Creates an annotated insert text edit.
			*
			* @param position The position to insert the text at.
			* @param newText The text to be inserted.
			* @param annotation The annotation.
			*/
			function insert(position, newText, annotation) {
				return {
					range: {
						start: position,
						end: position
					},
					newText,
					annotationId: annotation
				};
			}
			AnnotatedTextEdit.insert = insert;
			/**
			* Creates an annotated delete text edit.
			*
			* @param range The range of text to be deleted.
			* @param annotation The annotation.
			*/
			function del(range, annotation) {
				return {
					range,
					newText: "",
					annotationId: annotation
				};
			}
			AnnotatedTextEdit.del = del;
			function is(value) {
				var candidate = value;
				return TextEdit.is(candidate) && (ChangeAnnotation.is(candidate.annotationId) || ChangeAnnotationIdentifier.is(candidate.annotationId));
			}
			AnnotatedTextEdit.is = is;
		})(AnnotatedTextEdit || (exports$1.AnnotatedTextEdit = AnnotatedTextEdit = {}));
		/**
		* The TextDocumentEdit namespace provides helper function to create
		* an edit that manipulates a text document.
		*/
		var TextDocumentEdit;
		(function(TextDocumentEdit) {
			/**
			* Creates a new `TextDocumentEdit`
			*/
			function create(textDocument, edits) {
				return {
					textDocument,
					edits
				};
			}
			TextDocumentEdit.create = create;
			function is(value) {
				var candidate = value;
				return Is.defined(candidate) && OptionalVersionedTextDocumentIdentifier.is(candidate.textDocument) && Array.isArray(candidate.edits);
			}
			TextDocumentEdit.is = is;
		})(TextDocumentEdit || (exports$1.TextDocumentEdit = TextDocumentEdit = {}));
		var CreateFile;
		(function(CreateFile) {
			function create(uri, options, annotation) {
				var result = {
					kind: "create",
					uri
				};
				if (options !== void 0 && (options.overwrite !== void 0 || options.ignoreIfExists !== void 0)) result.options = options;
				if (annotation !== void 0) result.annotationId = annotation;
				return result;
			}
			CreateFile.create = create;
			function is(value) {
				var candidate = value;
				return candidate && candidate.kind === "create" && Is.string(candidate.uri) && (candidate.options === void 0 || (candidate.options.overwrite === void 0 || Is.boolean(candidate.options.overwrite)) && (candidate.options.ignoreIfExists === void 0 || Is.boolean(candidate.options.ignoreIfExists))) && (candidate.annotationId === void 0 || ChangeAnnotationIdentifier.is(candidate.annotationId));
			}
			CreateFile.is = is;
		})(CreateFile || (exports$1.CreateFile = CreateFile = {}));
		var RenameFile;
		(function(RenameFile) {
			function create(oldUri, newUri, options, annotation) {
				var result = {
					kind: "rename",
					oldUri,
					newUri
				};
				if (options !== void 0 && (options.overwrite !== void 0 || options.ignoreIfExists !== void 0)) result.options = options;
				if (annotation !== void 0) result.annotationId = annotation;
				return result;
			}
			RenameFile.create = create;
			function is(value) {
				var candidate = value;
				return candidate && candidate.kind === "rename" && Is.string(candidate.oldUri) && Is.string(candidate.newUri) && (candidate.options === void 0 || (candidate.options.overwrite === void 0 || Is.boolean(candidate.options.overwrite)) && (candidate.options.ignoreIfExists === void 0 || Is.boolean(candidate.options.ignoreIfExists))) && (candidate.annotationId === void 0 || ChangeAnnotationIdentifier.is(candidate.annotationId));
			}
			RenameFile.is = is;
		})(RenameFile || (exports$1.RenameFile = RenameFile = {}));
		var DeleteFile;
		(function(DeleteFile) {
			function create(uri, options, annotation) {
				var result = {
					kind: "delete",
					uri
				};
				if (options !== void 0 && (options.recursive !== void 0 || options.ignoreIfNotExists !== void 0)) result.options = options;
				if (annotation !== void 0) result.annotationId = annotation;
				return result;
			}
			DeleteFile.create = create;
			function is(value) {
				var candidate = value;
				return candidate && candidate.kind === "delete" && Is.string(candidate.uri) && (candidate.options === void 0 || (candidate.options.recursive === void 0 || Is.boolean(candidate.options.recursive)) && (candidate.options.ignoreIfNotExists === void 0 || Is.boolean(candidate.options.ignoreIfNotExists))) && (candidate.annotationId === void 0 || ChangeAnnotationIdentifier.is(candidate.annotationId));
			}
			DeleteFile.is = is;
		})(DeleteFile || (exports$1.DeleteFile = DeleteFile = {}));
		var WorkspaceEdit;
		(function(WorkspaceEdit) {
			function is(value) {
				var candidate = value;
				return candidate && (candidate.changes !== void 0 || candidate.documentChanges !== void 0) && (candidate.documentChanges === void 0 || candidate.documentChanges.every(function(change) {
					if (Is.string(change.kind)) return CreateFile.is(change) || RenameFile.is(change) || DeleteFile.is(change);
					else return TextDocumentEdit.is(change);
				}));
			}
			WorkspaceEdit.is = is;
		})(WorkspaceEdit || (exports$1.WorkspaceEdit = WorkspaceEdit = {}));
		var TextEditChangeImpl = function() {
			function TextEditChangeImpl(edits, changeAnnotations) {
				this.edits = edits;
				this.changeAnnotations = changeAnnotations;
			}
			TextEditChangeImpl.prototype.insert = function(position, newText, annotation) {
				var edit;
				var id;
				if (annotation === void 0) edit = TextEdit.insert(position, newText);
				else if (ChangeAnnotationIdentifier.is(annotation)) {
					id = annotation;
					edit = AnnotatedTextEdit.insert(position, newText, annotation);
				} else {
					this.assertChangeAnnotations(this.changeAnnotations);
					id = this.changeAnnotations.manage(annotation);
					edit = AnnotatedTextEdit.insert(position, newText, id);
				}
				this.edits.push(edit);
				if (id !== void 0) return id;
			};
			TextEditChangeImpl.prototype.replace = function(range, newText, annotation) {
				var edit;
				var id;
				if (annotation === void 0) edit = TextEdit.replace(range, newText);
				else if (ChangeAnnotationIdentifier.is(annotation)) {
					id = annotation;
					edit = AnnotatedTextEdit.replace(range, newText, annotation);
				} else {
					this.assertChangeAnnotations(this.changeAnnotations);
					id = this.changeAnnotations.manage(annotation);
					edit = AnnotatedTextEdit.replace(range, newText, id);
				}
				this.edits.push(edit);
				if (id !== void 0) return id;
			};
			TextEditChangeImpl.prototype.delete = function(range, annotation) {
				var edit;
				var id;
				if (annotation === void 0) edit = TextEdit.del(range);
				else if (ChangeAnnotationIdentifier.is(annotation)) {
					id = annotation;
					edit = AnnotatedTextEdit.del(range, annotation);
				} else {
					this.assertChangeAnnotations(this.changeAnnotations);
					id = this.changeAnnotations.manage(annotation);
					edit = AnnotatedTextEdit.del(range, id);
				}
				this.edits.push(edit);
				if (id !== void 0) return id;
			};
			TextEditChangeImpl.prototype.add = function(edit) {
				this.edits.push(edit);
			};
			TextEditChangeImpl.prototype.all = function() {
				return this.edits;
			};
			TextEditChangeImpl.prototype.clear = function() {
				this.edits.splice(0, this.edits.length);
			};
			TextEditChangeImpl.prototype.assertChangeAnnotations = function(value) {
				if (value === void 0) throw new Error("Text edit change is not configured to manage change annotations.");
			};
			return TextEditChangeImpl;
		}();
		/**
		* A helper class
		*/
		var ChangeAnnotations = function() {
			function ChangeAnnotations(annotations) {
				this._annotations = annotations === void 0 ? Object.create(null) : annotations;
				this._counter = 0;
				this._size = 0;
			}
			ChangeAnnotations.prototype.all = function() {
				return this._annotations;
			};
			Object.defineProperty(ChangeAnnotations.prototype, "size", {
				get: function() {
					return this._size;
				},
				enumerable: false,
				configurable: true
			});
			ChangeAnnotations.prototype.manage = function(idOrAnnotation, annotation) {
				var id;
				if (ChangeAnnotationIdentifier.is(idOrAnnotation)) id = idOrAnnotation;
				else {
					id = this.nextId();
					annotation = idOrAnnotation;
				}
				if (this._annotations[id] !== void 0) throw new Error("Id ".concat(id, " is already in use."));
				if (annotation === void 0) throw new Error("No annotation provided for id ".concat(id));
				this._annotations[id] = annotation;
				this._size++;
				return id;
			};
			ChangeAnnotations.prototype.nextId = function() {
				this._counter++;
				return this._counter.toString();
			};
			return ChangeAnnotations;
		}();
		exports$1.WorkspaceChange = function() {
			function WorkspaceChange(workspaceEdit) {
				var _this = this;
				this._textEditChanges = Object.create(null);
				if (workspaceEdit !== void 0) {
					this._workspaceEdit = workspaceEdit;
					if (workspaceEdit.documentChanges) {
						this._changeAnnotations = new ChangeAnnotations(workspaceEdit.changeAnnotations);
						workspaceEdit.changeAnnotations = this._changeAnnotations.all();
						workspaceEdit.documentChanges.forEach(function(change) {
							if (TextDocumentEdit.is(change)) {
								var textEditChange = new TextEditChangeImpl(change.edits, _this._changeAnnotations);
								_this._textEditChanges[change.textDocument.uri] = textEditChange;
							}
						});
					} else if (workspaceEdit.changes) Object.keys(workspaceEdit.changes).forEach(function(key) {
						var textEditChange = new TextEditChangeImpl(workspaceEdit.changes[key]);
						_this._textEditChanges[key] = textEditChange;
					});
				} else this._workspaceEdit = {};
			}
			Object.defineProperty(WorkspaceChange.prototype, "edit", {
				get: function() {
					this.initDocumentChanges();
					if (this._changeAnnotations !== void 0) if (this._changeAnnotations.size === 0) this._workspaceEdit.changeAnnotations = void 0;
					else this._workspaceEdit.changeAnnotations = this._changeAnnotations.all();
					return this._workspaceEdit;
				},
				enumerable: false,
				configurable: true
			});
			WorkspaceChange.prototype.getTextEditChange = function(key) {
				if (OptionalVersionedTextDocumentIdentifier.is(key)) {
					this.initDocumentChanges();
					if (this._workspaceEdit.documentChanges === void 0) throw new Error("Workspace edit is not configured for document changes.");
					var textDocument = {
						uri: key.uri,
						version: key.version
					};
					var result = this._textEditChanges[textDocument.uri];
					if (!result) {
						var edits = [];
						var textDocumentEdit = {
							textDocument,
							edits
						};
						this._workspaceEdit.documentChanges.push(textDocumentEdit);
						result = new TextEditChangeImpl(edits, this._changeAnnotations);
						this._textEditChanges[textDocument.uri] = result;
					}
					return result;
				} else {
					this.initChanges();
					if (this._workspaceEdit.changes === void 0) throw new Error("Workspace edit is not configured for normal text edit changes.");
					var result = this._textEditChanges[key];
					if (!result) {
						var edits = [];
						this._workspaceEdit.changes[key] = edits;
						result = new TextEditChangeImpl(edits);
						this._textEditChanges[key] = result;
					}
					return result;
				}
			};
			WorkspaceChange.prototype.initDocumentChanges = function() {
				if (this._workspaceEdit.documentChanges === void 0 && this._workspaceEdit.changes === void 0) {
					this._changeAnnotations = new ChangeAnnotations();
					this._workspaceEdit.documentChanges = [];
					this._workspaceEdit.changeAnnotations = this._changeAnnotations.all();
				}
			};
			WorkspaceChange.prototype.initChanges = function() {
				if (this._workspaceEdit.documentChanges === void 0 && this._workspaceEdit.changes === void 0) this._workspaceEdit.changes = Object.create(null);
			};
			WorkspaceChange.prototype.createFile = function(uri, optionsOrAnnotation, options) {
				this.initDocumentChanges();
				if (this._workspaceEdit.documentChanges === void 0) throw new Error("Workspace edit is not configured for document changes.");
				var annotation;
				if (ChangeAnnotation.is(optionsOrAnnotation) || ChangeAnnotationIdentifier.is(optionsOrAnnotation)) annotation = optionsOrAnnotation;
				else options = optionsOrAnnotation;
				var operation;
				var id;
				if (annotation === void 0) operation = CreateFile.create(uri, options);
				else {
					id = ChangeAnnotationIdentifier.is(annotation) ? annotation : this._changeAnnotations.manage(annotation);
					operation = CreateFile.create(uri, options, id);
				}
				this._workspaceEdit.documentChanges.push(operation);
				if (id !== void 0) return id;
			};
			WorkspaceChange.prototype.renameFile = function(oldUri, newUri, optionsOrAnnotation, options) {
				this.initDocumentChanges();
				if (this._workspaceEdit.documentChanges === void 0) throw new Error("Workspace edit is not configured for document changes.");
				var annotation;
				if (ChangeAnnotation.is(optionsOrAnnotation) || ChangeAnnotationIdentifier.is(optionsOrAnnotation)) annotation = optionsOrAnnotation;
				else options = optionsOrAnnotation;
				var operation;
				var id;
				if (annotation === void 0) operation = RenameFile.create(oldUri, newUri, options);
				else {
					id = ChangeAnnotationIdentifier.is(annotation) ? annotation : this._changeAnnotations.manage(annotation);
					operation = RenameFile.create(oldUri, newUri, options, id);
				}
				this._workspaceEdit.documentChanges.push(operation);
				if (id !== void 0) return id;
			};
			WorkspaceChange.prototype.deleteFile = function(uri, optionsOrAnnotation, options) {
				this.initDocumentChanges();
				if (this._workspaceEdit.documentChanges === void 0) throw new Error("Workspace edit is not configured for document changes.");
				var annotation;
				if (ChangeAnnotation.is(optionsOrAnnotation) || ChangeAnnotationIdentifier.is(optionsOrAnnotation)) annotation = optionsOrAnnotation;
				else options = optionsOrAnnotation;
				var operation;
				var id;
				if (annotation === void 0) operation = DeleteFile.create(uri, options);
				else {
					id = ChangeAnnotationIdentifier.is(annotation) ? annotation : this._changeAnnotations.manage(annotation);
					operation = DeleteFile.create(uri, options, id);
				}
				this._workspaceEdit.documentChanges.push(operation);
				if (id !== void 0) return id;
			};
			return WorkspaceChange;
		}();
		/**
		* The TextDocumentIdentifier namespace provides helper functions to work with
		* {@link TextDocumentIdentifier} literals.
		*/
		var TextDocumentIdentifier;
		(function(TextDocumentIdentifier) {
			/**
			* Creates a new TextDocumentIdentifier literal.
			* @param uri The document's uri.
			*/
			function create(uri) {
				return { uri };
			}
			TextDocumentIdentifier.create = create;
			/**
			* Checks whether the given literal conforms to the {@link TextDocumentIdentifier} interface.
			*/
			function is(value) {
				var candidate = value;
				return Is.defined(candidate) && Is.string(candidate.uri);
			}
			TextDocumentIdentifier.is = is;
		})(TextDocumentIdentifier || (exports$1.TextDocumentIdentifier = TextDocumentIdentifier = {}));
		/**
		* The VersionedTextDocumentIdentifier namespace provides helper functions to work with
		* {@link VersionedTextDocumentIdentifier} literals.
		*/
		var VersionedTextDocumentIdentifier;
		(function(VersionedTextDocumentIdentifier) {
			/**
			* Creates a new VersionedTextDocumentIdentifier literal.
			* @param uri The document's uri.
			* @param version The document's version.
			*/
			function create(uri, version) {
				return {
					uri,
					version
				};
			}
			VersionedTextDocumentIdentifier.create = create;
			/**
			* Checks whether the given literal conforms to the {@link VersionedTextDocumentIdentifier} interface.
			*/
			function is(value) {
				var candidate = value;
				return Is.defined(candidate) && Is.string(candidate.uri) && Is.integer(candidate.version);
			}
			VersionedTextDocumentIdentifier.is = is;
		})(VersionedTextDocumentIdentifier || (exports$1.VersionedTextDocumentIdentifier = VersionedTextDocumentIdentifier = {}));
		/**
		* The OptionalVersionedTextDocumentIdentifier namespace provides helper functions to work with
		* {@link OptionalVersionedTextDocumentIdentifier} literals.
		*/
		var OptionalVersionedTextDocumentIdentifier;
		(function(OptionalVersionedTextDocumentIdentifier) {
			/**
			* Creates a new OptionalVersionedTextDocumentIdentifier literal.
			* @param uri The document's uri.
			* @param version The document's version.
			*/
			function create(uri, version) {
				return {
					uri,
					version
				};
			}
			OptionalVersionedTextDocumentIdentifier.create = create;
			/**
			* Checks whether the given literal conforms to the {@link OptionalVersionedTextDocumentIdentifier} interface.
			*/
			function is(value) {
				var candidate = value;
				return Is.defined(candidate) && Is.string(candidate.uri) && (candidate.version === null || Is.integer(candidate.version));
			}
			OptionalVersionedTextDocumentIdentifier.is = is;
		})(OptionalVersionedTextDocumentIdentifier || (exports$1.OptionalVersionedTextDocumentIdentifier = OptionalVersionedTextDocumentIdentifier = {}));
		/**
		* The TextDocumentItem namespace provides helper functions to work with
		* {@link TextDocumentItem} literals.
		*/
		var TextDocumentItem;
		(function(TextDocumentItem) {
			/**
			* Creates a new TextDocumentItem literal.
			* @param uri The document's uri.
			* @param languageId The document's language identifier.
			* @param version The document's version number.
			* @param text The document's text.
			*/
			function create(uri, languageId, version, text) {
				return {
					uri,
					languageId,
					version,
					text
				};
			}
			TextDocumentItem.create = create;
			/**
			* Checks whether the given literal conforms to the {@link TextDocumentItem} interface.
			*/
			function is(value) {
				var candidate = value;
				return Is.defined(candidate) && Is.string(candidate.uri) && Is.string(candidate.languageId) && Is.integer(candidate.version) && Is.string(candidate.text);
			}
			TextDocumentItem.is = is;
		})(TextDocumentItem || (exports$1.TextDocumentItem = TextDocumentItem = {}));
		/**
		* Describes the content type that a client supports in various
		* result literals like `Hover`, `ParameterInfo` or `CompletionItem`.
		*
		* Please note that `MarkupKinds` must not start with a `$`. This kinds
		* are reserved for internal usage.
		*/
		var MarkupKind;
		(function(MarkupKind) {
			/**
			* Plain text is supported as a content format
			*/
			MarkupKind.PlainText = "plaintext";
			/**
			* Markdown is supported as a content format
			*/
			MarkupKind.Markdown = "markdown";
			/**
			* Checks whether the given value is a value of the {@link MarkupKind} type.
			*/
			function is(value) {
				var candidate = value;
				return candidate === MarkupKind.PlainText || candidate === MarkupKind.Markdown;
			}
			MarkupKind.is = is;
		})(MarkupKind || (exports$1.MarkupKind = MarkupKind = {}));
		var MarkupContent;
		(function(MarkupContent) {
			/**
			* Checks whether the given value conforms to the {@link MarkupContent} interface.
			*/
			function is(value) {
				var candidate = value;
				return Is.objectLiteral(value) && MarkupKind.is(candidate.kind) && Is.string(candidate.value);
			}
			MarkupContent.is = is;
		})(MarkupContent || (exports$1.MarkupContent = MarkupContent = {}));
		/**
		* The kind of a completion entry.
		*/
		var CompletionItemKind;
		(function(CompletionItemKind) {
			CompletionItemKind.Text = 1;
			CompletionItemKind.Method = 2;
			CompletionItemKind.Function = 3;
			CompletionItemKind.Constructor = 4;
			CompletionItemKind.Field = 5;
			CompletionItemKind.Variable = 6;
			CompletionItemKind.Class = 7;
			CompletionItemKind.Interface = 8;
			CompletionItemKind.Module = 9;
			CompletionItemKind.Property = 10;
			CompletionItemKind.Unit = 11;
			CompletionItemKind.Value = 12;
			CompletionItemKind.Enum = 13;
			CompletionItemKind.Keyword = 14;
			CompletionItemKind.Snippet = 15;
			CompletionItemKind.Color = 16;
			CompletionItemKind.File = 17;
			CompletionItemKind.Reference = 18;
			CompletionItemKind.Folder = 19;
			CompletionItemKind.EnumMember = 20;
			CompletionItemKind.Constant = 21;
			CompletionItemKind.Struct = 22;
			CompletionItemKind.Event = 23;
			CompletionItemKind.Operator = 24;
			CompletionItemKind.TypeParameter = 25;
		})(CompletionItemKind || (exports$1.CompletionItemKind = CompletionItemKind = {}));
		/**
		* Defines whether the insert text in a completion item should be interpreted as
		* plain text or a snippet.
		*/
		var InsertTextFormat;
		(function(InsertTextFormat) {
			/**
			* The primary text to be inserted is treated as a plain string.
			*/
			InsertTextFormat.PlainText = 1;
			/**
			* The primary text to be inserted is treated as a snippet.
			*
			* A snippet can define tab stops and placeholders with `$1`, `$2`
			* and `${3:foo}`. `$0` defines the final tab stop, it defaults to
			* the end of the snippet. Placeholders with equal identifiers are linked,
			* that is typing in one will update others too.
			*
			* See also: https://microsoft.github.io/language-server-protocol/specifications/specification-current/#snippet_syntax
			*/
			InsertTextFormat.Snippet = 2;
		})(InsertTextFormat || (exports$1.InsertTextFormat = InsertTextFormat = {}));
		/**
		* Completion item tags are extra annotations that tweak the rendering of a completion
		* item.
		*
		* @since 3.15.0
		*/
		var CompletionItemTag;
		(function(CompletionItemTag) {
			/**
			* Render a completion as obsolete, usually using a strike-out.
			*/
			CompletionItemTag.Deprecated = 1;
		})(CompletionItemTag || (exports$1.CompletionItemTag = CompletionItemTag = {}));
		/**
		* The InsertReplaceEdit namespace provides functions to deal with insert / replace edits.
		*
		* @since 3.16.0
		*/
		var InsertReplaceEdit;
		(function(InsertReplaceEdit) {
			/**
			* Creates a new insert / replace edit
			*/
			function create(newText, insert, replace) {
				return {
					newText,
					insert,
					replace
				};
			}
			InsertReplaceEdit.create = create;
			/**
			* Checks whether the given literal conforms to the {@link InsertReplaceEdit} interface.
			*/
			function is(value) {
				var candidate = value;
				return candidate && Is.string(candidate.newText) && Range.is(candidate.insert) && Range.is(candidate.replace);
			}
			InsertReplaceEdit.is = is;
		})(InsertReplaceEdit || (exports$1.InsertReplaceEdit = InsertReplaceEdit = {}));
		/**
		* How whitespace and indentation is handled during completion
		* item insertion.
		*
		* @since 3.16.0
		*/
		var InsertTextMode;
		(function(InsertTextMode) {
			/**
			* The insertion or replace strings is taken as it is. If the
			* value is multi line the lines below the cursor will be
			* inserted using the indentation defined in the string value.
			* The client will not apply any kind of adjustments to the
			* string.
			*/
			InsertTextMode.asIs = 1;
			/**
			* The editor adjusts leading whitespace of new lines so that
			* they match the indentation up to the cursor of the line for
			* which the item is accepted.
			*
			* Consider a line like this: <2tabs><cursor><3tabs>foo. Accepting a
			* multi line completion item is indented using 2 tabs and all
			* following lines inserted will be indented using 2 tabs as well.
			*/
			InsertTextMode.adjustIndentation = 2;
		})(InsertTextMode || (exports$1.InsertTextMode = InsertTextMode = {}));
		var CompletionItemLabelDetails;
		(function(CompletionItemLabelDetails) {
			function is(value) {
				var candidate = value;
				return candidate && (Is.string(candidate.detail) || candidate.detail === void 0) && (Is.string(candidate.description) || candidate.description === void 0);
			}
			CompletionItemLabelDetails.is = is;
		})(CompletionItemLabelDetails || (exports$1.CompletionItemLabelDetails = CompletionItemLabelDetails = {}));
		/**
		* The CompletionItem namespace provides functions to deal with
		* completion items.
		*/
		var CompletionItem;
		(function(CompletionItem) {
			/**
			* Create a completion item and seed it with a label.
			* @param label The completion item's label
			*/
			function create(label) {
				return { label };
			}
			CompletionItem.create = create;
		})(CompletionItem || (exports$1.CompletionItem = CompletionItem = {}));
		/**
		* The CompletionList namespace provides functions to deal with
		* completion lists.
		*/
		var CompletionList;
		(function(CompletionList) {
			/**
			* Creates a new completion list.
			*
			* @param items The completion items.
			* @param isIncomplete The list is not complete.
			*/
			function create(items, isIncomplete) {
				return {
					items: items ? items : [],
					isIncomplete: !!isIncomplete
				};
			}
			CompletionList.create = create;
		})(CompletionList || (exports$1.CompletionList = CompletionList = {}));
		var MarkedString;
		(function(MarkedString) {
			/**
			* Creates a marked string from plain text.
			*
			* @param plainText The plain text.
			*/
			function fromPlainText(plainText) {
				return plainText.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&");
			}
			MarkedString.fromPlainText = fromPlainText;
			/**
			* Checks whether the given value conforms to the {@link MarkedString} type.
			*/
			function is(value) {
				var candidate = value;
				return Is.string(candidate) || Is.objectLiteral(candidate) && Is.string(candidate.language) && Is.string(candidate.value);
			}
			MarkedString.is = is;
		})(MarkedString || (exports$1.MarkedString = MarkedString = {}));
		var Hover;
		(function(Hover) {
			/**
			* Checks whether the given value conforms to the {@link Hover} interface.
			*/
			function is(value) {
				var candidate = value;
				return !!candidate && Is.objectLiteral(candidate) && (MarkupContent.is(candidate.contents) || MarkedString.is(candidate.contents) || Is.typedArray(candidate.contents, MarkedString.is)) && (value.range === void 0 || Range.is(value.range));
			}
			Hover.is = is;
		})(Hover || (exports$1.Hover = Hover = {}));
		/**
		* The ParameterInformation namespace provides helper functions to work with
		* {@link ParameterInformation} literals.
		*/
		var ParameterInformation;
		(function(ParameterInformation) {
			/**
			* Creates a new parameter information literal.
			*
			* @param label A label string.
			* @param documentation A doc string.
			*/
			function create(label, documentation) {
				return documentation ? {
					label,
					documentation
				} : { label };
			}
			ParameterInformation.create = create;
		})(ParameterInformation || (exports$1.ParameterInformation = ParameterInformation = {}));
		/**
		* The SignatureInformation namespace provides helper functions to work with
		* {@link SignatureInformation} literals.
		*/
		var SignatureInformation;
		(function(SignatureInformation) {
			function create(label, documentation) {
				var parameters = [];
				for (var _i = 2; _i < arguments.length; _i++) parameters[_i - 2] = arguments[_i];
				var result = { label };
				if (Is.defined(documentation)) result.documentation = documentation;
				if (Is.defined(parameters)) result.parameters = parameters;
				else result.parameters = [];
				return result;
			}
			SignatureInformation.create = create;
		})(SignatureInformation || (exports$1.SignatureInformation = SignatureInformation = {}));
		/**
		* A document highlight kind.
		*/
		var DocumentHighlightKind;
		(function(DocumentHighlightKind) {
			/**
			* A textual occurrence.
			*/
			DocumentHighlightKind.Text = 1;
			/**
			* Read-access of a symbol, like reading a variable.
			*/
			DocumentHighlightKind.Read = 2;
			/**
			* Write-access of a symbol, like writing to a variable.
			*/
			DocumentHighlightKind.Write = 3;
		})(DocumentHighlightKind || (exports$1.DocumentHighlightKind = DocumentHighlightKind = {}));
		/**
		* DocumentHighlight namespace to provide helper functions to work with
		* {@link DocumentHighlight} literals.
		*/
		var DocumentHighlight;
		(function(DocumentHighlight) {
			/**
			* Create a DocumentHighlight object.
			* @param range The range the highlight applies to.
			* @param kind The highlight kind
			*/
			function create(range, kind) {
				var result = { range };
				if (Is.number(kind)) result.kind = kind;
				return result;
			}
			DocumentHighlight.create = create;
		})(DocumentHighlight || (exports$1.DocumentHighlight = DocumentHighlight = {}));
		/**
		* A symbol kind.
		*/
		var SymbolKind;
		(function(SymbolKind) {
			SymbolKind.File = 1;
			SymbolKind.Module = 2;
			SymbolKind.Namespace = 3;
			SymbolKind.Package = 4;
			SymbolKind.Class = 5;
			SymbolKind.Method = 6;
			SymbolKind.Property = 7;
			SymbolKind.Field = 8;
			SymbolKind.Constructor = 9;
			SymbolKind.Enum = 10;
			SymbolKind.Interface = 11;
			SymbolKind.Function = 12;
			SymbolKind.Variable = 13;
			SymbolKind.Constant = 14;
			SymbolKind.String = 15;
			SymbolKind.Number = 16;
			SymbolKind.Boolean = 17;
			SymbolKind.Array = 18;
			SymbolKind.Object = 19;
			SymbolKind.Key = 20;
			SymbolKind.Null = 21;
			SymbolKind.EnumMember = 22;
			SymbolKind.Struct = 23;
			SymbolKind.Event = 24;
			SymbolKind.Operator = 25;
			SymbolKind.TypeParameter = 26;
		})(SymbolKind || (exports$1.SymbolKind = SymbolKind = {}));
		/**
		* Symbol tags are extra annotations that tweak the rendering of a symbol.
		*
		* @since 3.16
		*/
		var SymbolTag;
		(function(SymbolTag) {
			/**
			* Render a symbol as obsolete, usually using a strike-out.
			*/
			SymbolTag.Deprecated = 1;
		})(SymbolTag || (exports$1.SymbolTag = SymbolTag = {}));
		var SymbolInformation;
		(function(SymbolInformation) {
			/**
			* Creates a new symbol information literal.
			*
			* @param name The name of the symbol.
			* @param kind The kind of the symbol.
			* @param range The range of the location of the symbol.
			* @param uri The resource of the location of symbol.
			* @param containerName The name of the symbol containing the symbol.
			*/
			function create(name, kind, range, uri, containerName) {
				var result = {
					name,
					kind,
					location: {
						uri,
						range
					}
				};
				if (containerName) result.containerName = containerName;
				return result;
			}
			SymbolInformation.create = create;
		})(SymbolInformation || (exports$1.SymbolInformation = SymbolInformation = {}));
		var WorkspaceSymbol;
		(function(WorkspaceSymbol) {
			/**
			* Create a new workspace symbol.
			*
			* @param name The name of the symbol.
			* @param kind The kind of the symbol.
			* @param uri The resource of the location of the symbol.
			* @param range An options range of the location.
			* @returns A WorkspaceSymbol.
			*/
			function create(name, kind, uri, range) {
				return range !== void 0 ? {
					name,
					kind,
					location: {
						uri,
						range
					}
				} : {
					name,
					kind,
					location: { uri }
				};
			}
			WorkspaceSymbol.create = create;
		})(WorkspaceSymbol || (exports$1.WorkspaceSymbol = WorkspaceSymbol = {}));
		var DocumentSymbol;
		(function(DocumentSymbol) {
			/**
			* Creates a new symbol information literal.
			*
			* @param name The name of the symbol.
			* @param detail The detail of the symbol.
			* @param kind The kind of the symbol.
			* @param range The range of the symbol.
			* @param selectionRange The selectionRange of the symbol.
			* @param children Children of the symbol.
			*/
			function create(name, detail, kind, range, selectionRange, children) {
				var result = {
					name,
					detail,
					kind,
					range,
					selectionRange
				};
				if (children !== void 0) result.children = children;
				return result;
			}
			DocumentSymbol.create = create;
			/**
			* Checks whether the given literal conforms to the {@link DocumentSymbol} interface.
			*/
			function is(value) {
				var candidate = value;
				return candidate && Is.string(candidate.name) && Is.number(candidate.kind) && Range.is(candidate.range) && Range.is(candidate.selectionRange) && (candidate.detail === void 0 || Is.string(candidate.detail)) && (candidate.deprecated === void 0 || Is.boolean(candidate.deprecated)) && (candidate.children === void 0 || Array.isArray(candidate.children)) && (candidate.tags === void 0 || Array.isArray(candidate.tags));
			}
			DocumentSymbol.is = is;
		})(DocumentSymbol || (exports$1.DocumentSymbol = DocumentSymbol = {}));
		/**
		* A set of predefined code action kinds
		*/
		var CodeActionKind;
		(function(CodeActionKind) {
			/**
			* Empty kind.
			*/
			CodeActionKind.Empty = "";
			/**
			* Base kind for quickfix actions: 'quickfix'
			*/
			CodeActionKind.QuickFix = "quickfix";
			/**
			* Base kind for refactoring actions: 'refactor'
			*/
			CodeActionKind.Refactor = "refactor";
			/**
			* Base kind for refactoring extraction actions: 'refactor.extract'
			*
			* Example extract actions:
			*
			* - Extract method
			* - Extract function
			* - Extract variable
			* - Extract interface from class
			* - ...
			*/
			CodeActionKind.RefactorExtract = "refactor.extract";
			/**
			* Base kind for refactoring inline actions: 'refactor.inline'
			*
			* Example inline actions:
			*
			* - Inline function
			* - Inline variable
			* - Inline constant
			* - ...
			*/
			CodeActionKind.RefactorInline = "refactor.inline";
			/**
			* Base kind for refactoring rewrite actions: 'refactor.rewrite'
			*
			* Example rewrite actions:
			*
			* - Convert JavaScript function to class
			* - Add or remove parameter
			* - Encapsulate field
			* - Make method static
			* - Move method to base class
			* - ...
			*/
			CodeActionKind.RefactorRewrite = "refactor.rewrite";
			/**
			* Base kind for source actions: `source`
			*
			* Source code actions apply to the entire file.
			*/
			CodeActionKind.Source = "source";
			/**
			* Base kind for an organize imports source action: `source.organizeImports`
			*/
			CodeActionKind.SourceOrganizeImports = "source.organizeImports";
			/**
			* Base kind for auto-fix source actions: `source.fixAll`.
			*
			* Fix all actions automatically fix errors that have a clear fix that do not require user input.
			* They should not suppress errors or perform unsafe fixes such as generating new types or classes.
			*
			* @since 3.15.0
			*/
			CodeActionKind.SourceFixAll = "source.fixAll";
		})(CodeActionKind || (exports$1.CodeActionKind = CodeActionKind = {}));
		/**
		* The reason why code actions were requested.
		*
		* @since 3.17.0
		*/
		var CodeActionTriggerKind;
		(function(CodeActionTriggerKind) {
			/**
			* Code actions were explicitly requested by the user or by an extension.
			*/
			CodeActionTriggerKind.Invoked = 1;
			/**
			* Code actions were requested automatically.
			*
			* This typically happens when current selection in a file changes, but can
			* also be triggered when file content changes.
			*/
			CodeActionTriggerKind.Automatic = 2;
		})(CodeActionTriggerKind || (exports$1.CodeActionTriggerKind = CodeActionTriggerKind = {}));
		/**
		* The CodeActionContext namespace provides helper functions to work with
		* {@link CodeActionContext} literals.
		*/
		var CodeActionContext;
		(function(CodeActionContext) {
			/**
			* Creates a new CodeActionContext literal.
			*/
			function create(diagnostics, only, triggerKind) {
				var result = { diagnostics };
				if (only !== void 0 && only !== null) result.only = only;
				if (triggerKind !== void 0 && triggerKind !== null) result.triggerKind = triggerKind;
				return result;
			}
			CodeActionContext.create = create;
			/**
			* Checks whether the given literal conforms to the {@link CodeActionContext} interface.
			*/
			function is(value) {
				var candidate = value;
				return Is.defined(candidate) && Is.typedArray(candidate.diagnostics, Diagnostic.is) && (candidate.only === void 0 || Is.typedArray(candidate.only, Is.string)) && (candidate.triggerKind === void 0 || candidate.triggerKind === CodeActionTriggerKind.Invoked || candidate.triggerKind === CodeActionTriggerKind.Automatic);
			}
			CodeActionContext.is = is;
		})(CodeActionContext || (exports$1.CodeActionContext = CodeActionContext = {}));
		var CodeAction;
		(function(CodeAction) {
			function create(title, kindOrCommandOrEdit, kind) {
				var result = { title };
				var checkKind = true;
				if (typeof kindOrCommandOrEdit === "string") {
					checkKind = false;
					result.kind = kindOrCommandOrEdit;
				} else if (Command.is(kindOrCommandOrEdit)) result.command = kindOrCommandOrEdit;
				else result.edit = kindOrCommandOrEdit;
				if (checkKind && kind !== void 0) result.kind = kind;
				return result;
			}
			CodeAction.create = create;
			function is(value) {
				var candidate = value;
				return candidate && Is.string(candidate.title) && (candidate.diagnostics === void 0 || Is.typedArray(candidate.diagnostics, Diagnostic.is)) && (candidate.kind === void 0 || Is.string(candidate.kind)) && (candidate.edit !== void 0 || candidate.command !== void 0) && (candidate.command === void 0 || Command.is(candidate.command)) && (candidate.isPreferred === void 0 || Is.boolean(candidate.isPreferred)) && (candidate.edit === void 0 || WorkspaceEdit.is(candidate.edit));
			}
			CodeAction.is = is;
		})(CodeAction || (exports$1.CodeAction = CodeAction = {}));
		/**
		* The CodeLens namespace provides helper functions to work with
		* {@link CodeLens} literals.
		*/
		var CodeLens;
		(function(CodeLens) {
			/**
			* Creates a new CodeLens literal.
			*/
			function create(range, data) {
				var result = { range };
				if (Is.defined(data)) result.data = data;
				return result;
			}
			CodeLens.create = create;
			/**
			* Checks whether the given literal conforms to the {@link CodeLens} interface.
			*/
			function is(value) {
				var candidate = value;
				return Is.defined(candidate) && Range.is(candidate.range) && (Is.undefined(candidate.command) || Command.is(candidate.command));
			}
			CodeLens.is = is;
		})(CodeLens || (exports$1.CodeLens = CodeLens = {}));
		/**
		* The FormattingOptions namespace provides helper functions to work with
		* {@link FormattingOptions} literals.
		*/
		var FormattingOptions;
		(function(FormattingOptions) {
			/**
			* Creates a new FormattingOptions literal.
			*/
			function create(tabSize, insertSpaces) {
				return {
					tabSize,
					insertSpaces
				};
			}
			FormattingOptions.create = create;
			/**
			* Checks whether the given literal conforms to the {@link FormattingOptions} interface.
			*/
			function is(value) {
				var candidate = value;
				return Is.defined(candidate) && Is.uinteger(candidate.tabSize) && Is.boolean(candidate.insertSpaces);
			}
			FormattingOptions.is = is;
		})(FormattingOptions || (exports$1.FormattingOptions = FormattingOptions = {}));
		/**
		* The DocumentLink namespace provides helper functions to work with
		* {@link DocumentLink} literals.
		*/
		var DocumentLink;
		(function(DocumentLink) {
			/**
			* Creates a new DocumentLink literal.
			*/
			function create(range, target, data) {
				return {
					range,
					target,
					data
				};
			}
			DocumentLink.create = create;
			/**
			* Checks whether the given literal conforms to the {@link DocumentLink} interface.
			*/
			function is(value) {
				var candidate = value;
				return Is.defined(candidate) && Range.is(candidate.range) && (Is.undefined(candidate.target) || Is.string(candidate.target));
			}
			DocumentLink.is = is;
		})(DocumentLink || (exports$1.DocumentLink = DocumentLink = {}));
		/**
		* The SelectionRange namespace provides helper function to work with
		* SelectionRange literals.
		*/
		var SelectionRange;
		(function(SelectionRange) {
			/**
			* Creates a new SelectionRange
			* @param range the range.
			* @param parent an optional parent.
			*/
			function create(range, parent) {
				return {
					range,
					parent
				};
			}
			SelectionRange.create = create;
			function is(value) {
				var candidate = value;
				return Is.objectLiteral(candidate) && Range.is(candidate.range) && (candidate.parent === void 0 || SelectionRange.is(candidate.parent));
			}
			SelectionRange.is = is;
		})(SelectionRange || (exports$1.SelectionRange = SelectionRange = {}));
		/**
		* A set of predefined token types. This set is not fixed
		* an clients can specify additional token types via the
		* corresponding client capabilities.
		*
		* @since 3.16.0
		*/
		var SemanticTokenTypes;
		(function(SemanticTokenTypes) {
			SemanticTokenTypes["namespace"] = "namespace";
			/**
			* Represents a generic type. Acts as a fallback for types which can't be mapped to
			* a specific type like class or enum.
			*/
			SemanticTokenTypes["type"] = "type";
			SemanticTokenTypes["class"] = "class";
			SemanticTokenTypes["enum"] = "enum";
			SemanticTokenTypes["interface"] = "interface";
			SemanticTokenTypes["struct"] = "struct";
			SemanticTokenTypes["typeParameter"] = "typeParameter";
			SemanticTokenTypes["parameter"] = "parameter";
			SemanticTokenTypes["variable"] = "variable";
			SemanticTokenTypes["property"] = "property";
			SemanticTokenTypes["enumMember"] = "enumMember";
			SemanticTokenTypes["event"] = "event";
			SemanticTokenTypes["function"] = "function";
			SemanticTokenTypes["method"] = "method";
			SemanticTokenTypes["macro"] = "macro";
			SemanticTokenTypes["keyword"] = "keyword";
			SemanticTokenTypes["modifier"] = "modifier";
			SemanticTokenTypes["comment"] = "comment";
			SemanticTokenTypes["string"] = "string";
			SemanticTokenTypes["number"] = "number";
			SemanticTokenTypes["regexp"] = "regexp";
			SemanticTokenTypes["operator"] = "operator";
			/**
			* @since 3.17.0
			*/
			SemanticTokenTypes["decorator"] = "decorator";
		})(SemanticTokenTypes || (exports$1.SemanticTokenTypes = SemanticTokenTypes = {}));
		/**
		* A set of predefined token modifiers. This set is not fixed
		* an clients can specify additional token types via the
		* corresponding client capabilities.
		*
		* @since 3.16.0
		*/
		var SemanticTokenModifiers;
		(function(SemanticTokenModifiers) {
			SemanticTokenModifiers["declaration"] = "declaration";
			SemanticTokenModifiers["definition"] = "definition";
			SemanticTokenModifiers["readonly"] = "readonly";
			SemanticTokenModifiers["static"] = "static";
			SemanticTokenModifiers["deprecated"] = "deprecated";
			SemanticTokenModifiers["abstract"] = "abstract";
			SemanticTokenModifiers["async"] = "async";
			SemanticTokenModifiers["modification"] = "modification";
			SemanticTokenModifiers["documentation"] = "documentation";
			SemanticTokenModifiers["defaultLibrary"] = "defaultLibrary";
		})(SemanticTokenModifiers || (exports$1.SemanticTokenModifiers = SemanticTokenModifiers = {}));
		/**
		* @since 3.16.0
		*/
		var SemanticTokens;
		(function(SemanticTokens) {
			function is(value) {
				var candidate = value;
				return Is.objectLiteral(candidate) && (candidate.resultId === void 0 || typeof candidate.resultId === "string") && Array.isArray(candidate.data) && (candidate.data.length === 0 || typeof candidate.data[0] === "number");
			}
			SemanticTokens.is = is;
		})(SemanticTokens || (exports$1.SemanticTokens = SemanticTokens = {}));
		/**
		* The InlineValueText namespace provides functions to deal with InlineValueTexts.
		*
		* @since 3.17.0
		*/
		var InlineValueText;
		(function(InlineValueText) {
			/**
			* Creates a new InlineValueText literal.
			*/
			function create(range, text) {
				return {
					range,
					text
				};
			}
			InlineValueText.create = create;
			function is(value) {
				var candidate = value;
				return candidate !== void 0 && candidate !== null && Range.is(candidate.range) && Is.string(candidate.text);
			}
			InlineValueText.is = is;
		})(InlineValueText || (exports$1.InlineValueText = InlineValueText = {}));
		/**
		* The InlineValueVariableLookup namespace provides functions to deal with InlineValueVariableLookups.
		*
		* @since 3.17.0
		*/
		var InlineValueVariableLookup;
		(function(InlineValueVariableLookup) {
			/**
			* Creates a new InlineValueText literal.
			*/
			function create(range, variableName, caseSensitiveLookup) {
				return {
					range,
					variableName,
					caseSensitiveLookup
				};
			}
			InlineValueVariableLookup.create = create;
			function is(value) {
				var candidate = value;
				return candidate !== void 0 && candidate !== null && Range.is(candidate.range) && Is.boolean(candidate.caseSensitiveLookup) && (Is.string(candidate.variableName) || candidate.variableName === void 0);
			}
			InlineValueVariableLookup.is = is;
		})(InlineValueVariableLookup || (exports$1.InlineValueVariableLookup = InlineValueVariableLookup = {}));
		/**
		* The InlineValueEvaluatableExpression namespace provides functions to deal with InlineValueEvaluatableExpression.
		*
		* @since 3.17.0
		*/
		var InlineValueEvaluatableExpression;
		(function(InlineValueEvaluatableExpression) {
			/**
			* Creates a new InlineValueEvaluatableExpression literal.
			*/
			function create(range, expression) {
				return {
					range,
					expression
				};
			}
			InlineValueEvaluatableExpression.create = create;
			function is(value) {
				var candidate = value;
				return candidate !== void 0 && candidate !== null && Range.is(candidate.range) && (Is.string(candidate.expression) || candidate.expression === void 0);
			}
			InlineValueEvaluatableExpression.is = is;
		})(InlineValueEvaluatableExpression || (exports$1.InlineValueEvaluatableExpression = InlineValueEvaluatableExpression = {}));
		/**
		* The InlineValueContext namespace provides helper functions to work with
		* {@link InlineValueContext} literals.
		*
		* @since 3.17.0
		*/
		var InlineValueContext;
		(function(InlineValueContext) {
			/**
			* Creates a new InlineValueContext literal.
			*/
			function create(frameId, stoppedLocation) {
				return {
					frameId,
					stoppedLocation
				};
			}
			InlineValueContext.create = create;
			/**
			* Checks whether the given literal conforms to the {@link InlineValueContext} interface.
			*/
			function is(value) {
				var candidate = value;
				return Is.defined(candidate) && Range.is(value.stoppedLocation);
			}
			InlineValueContext.is = is;
		})(InlineValueContext || (exports$1.InlineValueContext = InlineValueContext = {}));
		/**
		* Inlay hint kinds.
		*
		* @since 3.17.0
		*/
		var InlayHintKind;
		(function(InlayHintKind) {
			/**
			* An inlay hint that for a type annotation.
			*/
			InlayHintKind.Type = 1;
			/**
			* An inlay hint that is for a parameter.
			*/
			InlayHintKind.Parameter = 2;
			function is(value) {
				return value === 1 || value === 2;
			}
			InlayHintKind.is = is;
		})(InlayHintKind || (exports$1.InlayHintKind = InlayHintKind = {}));
		var InlayHintLabelPart;
		(function(InlayHintLabelPart) {
			function create(value) {
				return { value };
			}
			InlayHintLabelPart.create = create;
			function is(value) {
				var candidate = value;
				return Is.objectLiteral(candidate) && (candidate.tooltip === void 0 || Is.string(candidate.tooltip) || MarkupContent.is(candidate.tooltip)) && (candidate.location === void 0 || Location.is(candidate.location)) && (candidate.command === void 0 || Command.is(candidate.command));
			}
			InlayHintLabelPart.is = is;
		})(InlayHintLabelPart || (exports$1.InlayHintLabelPart = InlayHintLabelPart = {}));
		var InlayHint;
		(function(InlayHint) {
			function create(position, label, kind) {
				var result = {
					position,
					label
				};
				if (kind !== void 0) result.kind = kind;
				return result;
			}
			InlayHint.create = create;
			function is(value) {
				var candidate = value;
				return Is.objectLiteral(candidate) && Position.is(candidate.position) && (Is.string(candidate.label) || Is.typedArray(candidate.label, InlayHintLabelPart.is)) && (candidate.kind === void 0 || InlayHintKind.is(candidate.kind)) && candidate.textEdits === void 0 || Is.typedArray(candidate.textEdits, TextEdit.is) && (candidate.tooltip === void 0 || Is.string(candidate.tooltip) || MarkupContent.is(candidate.tooltip)) && (candidate.paddingLeft === void 0 || Is.boolean(candidate.paddingLeft)) && (candidate.paddingRight === void 0 || Is.boolean(candidate.paddingRight));
			}
			InlayHint.is = is;
		})(InlayHint || (exports$1.InlayHint = InlayHint = {}));
		var StringValue;
		(function(StringValue) {
			function createSnippet(value) {
				return {
					kind: "snippet",
					value
				};
			}
			StringValue.createSnippet = createSnippet;
		})(StringValue || (exports$1.StringValue = StringValue = {}));
		var InlineCompletionItem;
		(function(InlineCompletionItem) {
			function create(insertText, filterText, range, command) {
				return {
					insertText,
					filterText,
					range,
					command
				};
			}
			InlineCompletionItem.create = create;
		})(InlineCompletionItem || (exports$1.InlineCompletionItem = InlineCompletionItem = {}));
		var InlineCompletionList;
		(function(InlineCompletionList) {
			function create(items) {
				return { items };
			}
			InlineCompletionList.create = create;
		})(InlineCompletionList || (exports$1.InlineCompletionList = InlineCompletionList = {}));
		/**
		* Describes how an {@link InlineCompletionItemProvider inline completion provider} was triggered.
		*
		* @since 3.18.0
		* @proposed
		*/
		var InlineCompletionTriggerKind;
		(function(InlineCompletionTriggerKind) {
			/**
			* Completion was triggered explicitly by a user gesture.
			*/
			InlineCompletionTriggerKind.Invoked = 0;
			/**
			* Completion was triggered automatically while editing.
			*/
			InlineCompletionTriggerKind.Automatic = 1;
		})(InlineCompletionTriggerKind || (exports$1.InlineCompletionTriggerKind = InlineCompletionTriggerKind = {}));
		var SelectedCompletionInfo;
		(function(SelectedCompletionInfo) {
			function create(range, text) {
				return {
					range,
					text
				};
			}
			SelectedCompletionInfo.create = create;
		})(SelectedCompletionInfo || (exports$1.SelectedCompletionInfo = SelectedCompletionInfo = {}));
		var InlineCompletionContext;
		(function(InlineCompletionContext) {
			function create(triggerKind, selectedCompletionInfo) {
				return {
					triggerKind,
					selectedCompletionInfo
				};
			}
			InlineCompletionContext.create = create;
		})(InlineCompletionContext || (exports$1.InlineCompletionContext = InlineCompletionContext = {}));
		var WorkspaceFolder;
		(function(WorkspaceFolder) {
			function is(value) {
				var candidate = value;
				return Is.objectLiteral(candidate) && URI.is(candidate.uri) && Is.string(candidate.name);
			}
			WorkspaceFolder.is = is;
		})(WorkspaceFolder || (exports$1.WorkspaceFolder = WorkspaceFolder = {}));
		exports$1.EOL = [
			"\n",
			"\r\n",
			"\r"
		];
		/**
		* @deprecated Use the text document from the new vscode-languageserver-textdocument package.
		*/
		var TextDocument;
		(function(TextDocument) {
			/**
			* Creates a new ITextDocument literal from the given uri and content.
			* @param uri The document's uri.
			* @param languageId The document's language Id.
			* @param version The document's version.
			* @param content The document's content.
			*/
			function create(uri, languageId, version, content) {
				return new FullTextDocument(uri, languageId, version, content);
			}
			TextDocument.create = create;
			/**
			* Checks whether the given literal conforms to the {@link ITextDocument} interface.
			*/
			function is(value) {
				var candidate = value;
				return Is.defined(candidate) && Is.string(candidate.uri) && (Is.undefined(candidate.languageId) || Is.string(candidate.languageId)) && Is.uinteger(candidate.lineCount) && Is.func(candidate.getText) && Is.func(candidate.positionAt) && Is.func(candidate.offsetAt) ? true : false;
			}
			TextDocument.is = is;
			function applyEdits(document, edits) {
				var text = document.getText();
				var sortedEdits = mergeSort(edits, function(a, b) {
					var diff = a.range.start.line - b.range.start.line;
					if (diff === 0) return a.range.start.character - b.range.start.character;
					return diff;
				});
				var lastModifiedOffset = text.length;
				for (var i = sortedEdits.length - 1; i >= 0; i--) {
					var e = sortedEdits[i];
					var startOffset = document.offsetAt(e.range.start);
					var endOffset = document.offsetAt(e.range.end);
					if (endOffset <= lastModifiedOffset) text = text.substring(0, startOffset) + e.newText + text.substring(endOffset, text.length);
					else throw new Error("Overlapping edit");
					lastModifiedOffset = startOffset;
				}
				return text;
			}
			TextDocument.applyEdits = applyEdits;
			function mergeSort(data, compare) {
				if (data.length <= 1) return data;
				var p = data.length / 2 | 0;
				var left = data.slice(0, p);
				var right = data.slice(p);
				mergeSort(left, compare);
				mergeSort(right, compare);
				var leftIdx = 0;
				var rightIdx = 0;
				var i = 0;
				while (leftIdx < left.length && rightIdx < right.length) if (compare(left[leftIdx], right[rightIdx]) <= 0) data[i++] = left[leftIdx++];
				else data[i++] = right[rightIdx++];
				while (leftIdx < left.length) data[i++] = left[leftIdx++];
				while (rightIdx < right.length) data[i++] = right[rightIdx++];
				return data;
			}
		})(TextDocument || (exports$1.TextDocument = TextDocument = {}));
		/**
		* @deprecated Use the text document from the new vscode-languageserver-textdocument package.
		*/
		var FullTextDocument = function() {
			function FullTextDocument(uri, languageId, version, content) {
				this._uri = uri;
				this._languageId = languageId;
				this._version = version;
				this._content = content;
				this._lineOffsets = void 0;
			}
			Object.defineProperty(FullTextDocument.prototype, "uri", {
				get: function() {
					return this._uri;
				},
				enumerable: false,
				configurable: true
			});
			Object.defineProperty(FullTextDocument.prototype, "languageId", {
				get: function() {
					return this._languageId;
				},
				enumerable: false,
				configurable: true
			});
			Object.defineProperty(FullTextDocument.prototype, "version", {
				get: function() {
					return this._version;
				},
				enumerable: false,
				configurable: true
			});
			FullTextDocument.prototype.getText = function(range) {
				if (range) {
					var start = this.offsetAt(range.start);
					var end = this.offsetAt(range.end);
					return this._content.substring(start, end);
				}
				return this._content;
			};
			FullTextDocument.prototype.update = function(event, version) {
				this._content = event.text;
				this._version = version;
				this._lineOffsets = void 0;
			};
			FullTextDocument.prototype.getLineOffsets = function() {
				if (this._lineOffsets === void 0) {
					var lineOffsets = [];
					var text = this._content;
					var isLineStart = true;
					for (var i = 0; i < text.length; i++) {
						if (isLineStart) {
							lineOffsets.push(i);
							isLineStart = false;
						}
						var ch = text.charAt(i);
						isLineStart = ch === "\r" || ch === "\n";
						if (ch === "\r" && i + 1 < text.length && text.charAt(i + 1) === "\n") i++;
					}
					if (isLineStart && text.length > 0) lineOffsets.push(text.length);
					this._lineOffsets = lineOffsets;
				}
				return this._lineOffsets;
			};
			FullTextDocument.prototype.positionAt = function(offset) {
				offset = Math.max(Math.min(offset, this._content.length), 0);
				var lineOffsets = this.getLineOffsets();
				var low = 0, high = lineOffsets.length;
				if (high === 0) return Position.create(0, offset);
				while (low < high) {
					var mid = Math.floor((low + high) / 2);
					if (lineOffsets[mid] > offset) high = mid;
					else low = mid + 1;
				}
				var line = low - 1;
				return Position.create(line, offset - lineOffsets[line]);
			};
			FullTextDocument.prototype.offsetAt = function(position) {
				var lineOffsets = this.getLineOffsets();
				if (position.line >= lineOffsets.length) return this._content.length;
				else if (position.line < 0) return 0;
				var lineOffset = lineOffsets[position.line];
				var nextLineOffset = position.line + 1 < lineOffsets.length ? lineOffsets[position.line + 1] : this._content.length;
				return Math.max(Math.min(lineOffset + position.character, nextLineOffset), lineOffset);
			};
			Object.defineProperty(FullTextDocument.prototype, "lineCount", {
				get: function() {
					return this.getLineOffsets().length;
				},
				enumerable: false,
				configurable: true
			});
			return FullTextDocument;
		}();
		var Is;
		(function(Is) {
			var toString = Object.prototype.toString;
			function defined(value) {
				return typeof value !== "undefined";
			}
			Is.defined = defined;
			function undefined(value) {
				return typeof value === "undefined";
			}
			Is.undefined = undefined;
			function boolean(value) {
				return value === true || value === false;
			}
			Is.boolean = boolean;
			function string(value) {
				return toString.call(value) === "[object String]";
			}
			Is.string = string;
			function number(value) {
				return toString.call(value) === "[object Number]";
			}
			Is.number = number;
			function numberRange(value, min, max) {
				return toString.call(value) === "[object Number]" && min <= value && value <= max;
			}
			Is.numberRange = numberRange;
			function integer(value) {
				return toString.call(value) === "[object Number]" && -2147483648 <= value && value <= 2147483647;
			}
			Is.integer = integer;
			function uinteger(value) {
				return toString.call(value) === "[object Number]" && 0 <= value && value <= 2147483647;
			}
			Is.uinteger = uinteger;
			function func(value) {
				return toString.call(value) === "[object Function]";
			}
			Is.func = func;
			function objectLiteral(value) {
				return value !== null && typeof value === "object";
			}
			Is.objectLiteral = objectLiteral;
			function typedArray(value, check) {
				return Array.isArray(value) && value.every(check);
			}
			Is.typedArray = typedArray;
		})(Is || (Is = {}));
	});
}));
//#endregion
//#region ../../node_modules/dockerfile-ast/lib/line.js
var require_line = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Line = void 0;
	var Line = class {
		constructor(document, range) {
			this.document = document;
			this.range = range;
		}
		getRange() {
			return this.range;
		}
		getTextContent() {
			return this.document.getText().substring(this.document.offsetAt(this.range.start), this.document.offsetAt(this.range.end));
		}
		isAfter(line) {
			return this.range.start.line > line.range.start.line;
		}
		isBefore(line) {
			return this.range.start.line < line;
		}
	};
	exports.Line = Line;
}));
//#endregion
//#region ../../node_modules/dockerfile-ast/lib/util.js
var require_util = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Util = void 0;
	exports.Util = class Util {
		static isUTF8BOM(char) {
			const uintArray = Uint8Array.from(Buffer.from(char, "UTF-8"));
			return uintArray[0] === 239 && uintArray[1] == 187 && uintArray[2] == 191;
		}
		static isWhitespace(char) {
			return char === " " || char === "	" || Util.isNewline(char);
		}
		static isNewline(char) {
			return char === "\r" || char === "\n";
		}
		static findLeadingNonWhitespace(content, escapeChar) {
			whitespaceCheck: for (let i = 0; i < content.length; i++) switch (content.charAt(i)) {
				case " ":
				case "	": continue;
				case escapeChar:
					escapeCheck: for (let j = i + 1; j < content.length; j++) switch (content.charAt(j)) {
						case " ":
						case "	": continue;
						case "\r":
							i = j + 1;
							continue whitespaceCheck;
						case "\n":
							i = j;
							continue whitespaceCheck;
						default: break escapeCheck;
					}
					return -1;
				default: return i;
			}
			return -1;
		}
		/**
		* Determines if the given position is contained within the given range.
		*
		* @param position the position to check
		* @param range the range to see if the position is inside of
		*/
		static isInsideRange(position, range) {
			if (range.start.line === range.end.line) return range.start.line === position.line && range.start.character <= position.character && position.character <= range.end.character;
			else if (range.start.line === position.line) return range.start.character <= position.character;
			else if (range.end.line === position.line) return position.character <= range.end.character;
			return range.start.line < position.line && position.line < range.end.line;
		}
		static parseHeredocName(value) {
			value = value.substring(2);
			if (value.charAt(0) === "-") value = value.substring(1);
			if (value.charAt(0) === "\"") {
				if (value.charAt(value.length - 1) !== "\"") return null;
				value = value.substring(1, value.length - 1);
			}
			if (value.charAt(0) === "'") {
				if (value.charAt(value.length - 1) !== "'") return null;
				value = value.substring(1, value.length - 1);
			}
			if (value.charAt(0) === "<") return null;
			return value;
		}
	};
}));
//#endregion
//#region ../../node_modules/dockerfile-ast/lib/comment.js
var require_comment = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Comment = void 0;
	var vscode_languageserver_types_1 = require_main$1();
	var line_1 = require_line();
	var util_1 = require_util();
	var Comment = class extends line_1.Line {
		constructor(document, range) {
			super(document, range);
		}
		toString() {
			const content = this.getContent();
			if (content) return "# " + content;
			return "#";
		}
		/**
		* Returns the content of this comment. This excludes leading and
		* trailing whitespace as well as the # symbol. If the comment only
		* consists of whitespace, the empty string will be returned.
		*/
		getContent() {
			let range = this.getContentRange();
			if (range === null) return "";
			return this.document.getText().substring(this.document.offsetAt(range.start), this.document.offsetAt(range.end));
		}
		/**
		* Returns a range that includes the content of the comment
		* excluding any leading and trailing whitespace as well as the #
		* symbol. May return null if the comment only consists of whitespace
		* characters.
		*/
		getContentRange() {
			let range = this.getRange();
			const startOffset = this.document.offsetAt(range.start);
			let raw = this.document.getText().substring(startOffset, this.document.offsetAt(range.end));
			let start = -1;
			let end = -1;
			for (let i = 1; i < raw.length; i++) if (!util_1.Util.isWhitespace(raw.charAt(i))) {
				start = i;
				break;
			}
			if (start === -1) return null;
			for (let i = raw.length - 1; i >= 1; i--) if (!util_1.Util.isWhitespace(raw.charAt(i))) {
				end = i + 1;
				break;
			}
			return vscode_languageserver_types_1.Range.create(this.document.positionAt(startOffset + start), this.document.positionAt(startOffset + end));
		}
	};
	exports.Comment = Comment;
}));
//#endregion
//#region ../../node_modules/vscode-languageserver-textdocument/lib/esm/main.js
var main_exports = /* @__PURE__ */ require_chunk.__exportAll({ TextDocument: () => TextDocument });
function mergeSort(data, compare) {
	if (data.length <= 1) return data;
	const p = data.length / 2 | 0;
	const left = data.slice(0, p);
	const right = data.slice(p);
	mergeSort(left, compare);
	mergeSort(right, compare);
	let leftIdx = 0;
	let rightIdx = 0;
	let i = 0;
	while (leftIdx < left.length && rightIdx < right.length) if (compare(left[leftIdx], right[rightIdx]) <= 0) data[i++] = left[leftIdx++];
	else data[i++] = right[rightIdx++];
	while (leftIdx < left.length) data[i++] = left[leftIdx++];
	while (rightIdx < right.length) data[i++] = right[rightIdx++];
	return data;
}
function computeLineOffsets(text, isAtLineStart, textOffset = 0) {
	const result = isAtLineStart ? [textOffset] : [];
	for (let i = 0; i < text.length; i++) {
		const ch = text.charCodeAt(i);
		if (isEOL(ch)) {
			if (ch === 13 && i + 1 < text.length && text.charCodeAt(i + 1) === 10) i++;
			result.push(textOffset + i + 1);
		}
	}
	return result;
}
function isEOL(char) {
	return char === 13 || char === 10;
}
function getWellformedRange(range) {
	const start = range.start;
	const end = range.end;
	if (start.line > end.line || start.line === end.line && start.character > end.character) return {
		start: end,
		end: start
	};
	return range;
}
function getWellformedEdit(textEdit) {
	const range = getWellformedRange(textEdit.range);
	if (range !== textEdit.range) return {
		newText: textEdit.newText,
		range
	};
	return textEdit;
}
var FullTextDocument, TextDocument;
var init_main = require_chunk.__esmMin((() => {
	FullTextDocument = class FullTextDocument {
		constructor(uri, languageId, version, content) {
			this._uri = uri;
			this._languageId = languageId;
			this._version = version;
			this._content = content;
			this._lineOffsets = void 0;
		}
		get uri() {
			return this._uri;
		}
		get languageId() {
			return this._languageId;
		}
		get version() {
			return this._version;
		}
		getText(range) {
			if (range) {
				const start = this.offsetAt(range.start);
				const end = this.offsetAt(range.end);
				return this._content.substring(start, end);
			}
			return this._content;
		}
		update(changes, version) {
			for (const change of changes) if (FullTextDocument.isIncremental(change)) {
				const range = getWellformedRange(change.range);
				const startOffset = this.offsetAt(range.start);
				const endOffset = this.offsetAt(range.end);
				this._content = this._content.substring(0, startOffset) + change.text + this._content.substring(endOffset, this._content.length);
				const startLine = Math.max(range.start.line, 0);
				const endLine = Math.max(range.end.line, 0);
				let lineOffsets = this._lineOffsets;
				const addedLineOffsets = computeLineOffsets(change.text, false, startOffset);
				if (endLine - startLine === addedLineOffsets.length) for (let i = 0, len = addedLineOffsets.length; i < len; i++) lineOffsets[i + startLine + 1] = addedLineOffsets[i];
				else if (addedLineOffsets.length < 1e4) lineOffsets.splice(startLine + 1, endLine - startLine, ...addedLineOffsets);
				else this._lineOffsets = lineOffsets = lineOffsets.slice(0, startLine + 1).concat(addedLineOffsets, lineOffsets.slice(endLine + 1));
				const diff = change.text.length - (endOffset - startOffset);
				if (diff !== 0) for (let i = startLine + 1 + addedLineOffsets.length, len = lineOffsets.length; i < len; i++) lineOffsets[i] = lineOffsets[i] + diff;
			} else if (FullTextDocument.isFull(change)) {
				this._content = change.text;
				this._lineOffsets = void 0;
			} else throw new Error("Unknown change event received");
			this._version = version;
		}
		getLineOffsets() {
			if (this._lineOffsets === void 0) this._lineOffsets = computeLineOffsets(this._content, true);
			return this._lineOffsets;
		}
		positionAt(offset) {
			offset = Math.max(Math.min(offset, this._content.length), 0);
			const lineOffsets = this.getLineOffsets();
			let low = 0, high = lineOffsets.length;
			if (high === 0) return {
				line: 0,
				character: offset
			};
			while (low < high) {
				const mid = Math.floor((low + high) / 2);
				if (lineOffsets[mid] > offset) high = mid;
				else low = mid + 1;
			}
			const line = low - 1;
			offset = this.ensureBeforeEOL(offset, lineOffsets[line]);
			return {
				line,
				character: offset - lineOffsets[line]
			};
		}
		offsetAt(position) {
			const lineOffsets = this.getLineOffsets();
			if (position.line >= lineOffsets.length) return this._content.length;
			else if (position.line < 0) return 0;
			const lineOffset = lineOffsets[position.line];
			if (position.character <= 0) return lineOffset;
			const nextLineOffset = position.line + 1 < lineOffsets.length ? lineOffsets[position.line + 1] : this._content.length;
			const offset = Math.min(lineOffset + position.character, nextLineOffset);
			return this.ensureBeforeEOL(offset, lineOffset);
		}
		ensureBeforeEOL(offset, lineOffset) {
			while (offset > lineOffset && isEOL(this._content.charCodeAt(offset - 1))) offset--;
			return offset;
		}
		get lineCount() {
			return this.getLineOffsets().length;
		}
		static isIncremental(event) {
			const candidate = event;
			return candidate !== void 0 && candidate !== null && typeof candidate.text === "string" && candidate.range !== void 0 && (candidate.rangeLength === void 0 || typeof candidate.rangeLength === "number");
		}
		static isFull(event) {
			const candidate = event;
			return candidate !== void 0 && candidate !== null && typeof candidate.text === "string" && candidate.range === void 0 && candidate.rangeLength === void 0;
		}
	};
	(function(TextDocument) {
		/**
		* Creates a new text document.
		*
		* @param uri The document's uri.
		* @param languageId  The document's language Id.
		* @param version The document's initial version number.
		* @param content The document's content.
		*/
		function create(uri, languageId, version, content) {
			return new FullTextDocument(uri, languageId, version, content);
		}
		TextDocument.create = create;
		/**
		* Updates a TextDocument by modifying its content.
		*
		* @param document the document to update. Only documents created by TextDocument.create are valid inputs.
		* @param changes the changes to apply to the document.
		* @param version the changes version for the document.
		* @returns The updated TextDocument. Note: That's the same document instance passed in as first parameter.
		*
		*/
		function update(document, changes, version) {
			if (document instanceof FullTextDocument) {
				document.update(changes, version);
				return document;
			} else throw new Error("TextDocument.update: document must be created by TextDocument.create");
		}
		TextDocument.update = update;
		function applyEdits(document, edits) {
			const text = document.getText();
			const sortedEdits = mergeSort(edits.map(getWellformedEdit), (a, b) => {
				const diff = a.range.start.line - b.range.start.line;
				if (diff === 0) return a.range.start.character - b.range.start.character;
				return diff;
			});
			let lastModifiedOffset = 0;
			const spans = [];
			for (const e of sortedEdits) {
				const startOffset = document.offsetAt(e.range.start);
				if (startOffset < lastModifiedOffset) throw new Error("Overlapping edit");
				else if (startOffset > lastModifiedOffset) spans.push(text.substring(lastModifiedOffset, startOffset));
				if (e.newText.length) spans.push(e.newText);
				lastModifiedOffset = document.offsetAt(e.range.end);
			}
			spans.push(text.substr(lastModifiedOffset));
			return spans.join("");
		}
		TextDocument.applyEdits = applyEdits;
	})(TextDocument || (TextDocument = {}));
}));
//#endregion
//#region ../../node_modules/dockerfile-ast/lib/parserDirective.js
var require_parserDirective = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ParserDirective = void 0;
	var main_1 = require_main();
	var line_1 = require_line();
	var ParserDirective = class extends line_1.Line {
		constructor(document, range, nameRange, valueRange) {
			super(document, range);
			this.nameRange = nameRange;
			this.valueRange = valueRange;
		}
		toString() {
			return "# " + this.getName() + "=" + this.getValue();
		}
		getNameRange() {
			return this.nameRange;
		}
		getValueRange() {
			return this.valueRange;
		}
		getName() {
			return this.document.getText().substring(this.document.offsetAt(this.nameRange.start), this.document.offsetAt(this.nameRange.end));
		}
		getValue() {
			return this.document.getText().substring(this.document.offsetAt(this.valueRange.start), this.document.offsetAt(this.valueRange.end));
		}
		getDirective() {
			const directive = main_1.Directive[this.getName().toLowerCase()];
			return directive === void 0 ? null : directive;
		}
	};
	exports.ParserDirective = ParserDirective;
}));
//#endregion
//#region ../../node_modules/dockerfile-ast/lib/heredoc.js
var require_heredoc = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Heredoc = void 0;
	/**
	* Heredoc represents a here-document that has been embedded in a
	* Dockerfile.
	*
	* This API is experimental and subject to change.
	*/
	var Heredoc = class {
		constructor(startRange, name, nameRange, contentRange, endRange) {
			this.startRange = startRange;
			this.name = name;
			this.nameRange = nameRange;
			this.contentRange = contentRange;
			this.endRange = endRange;
		}
		/**
		* Returns the name of the here-document.
		*
		* This API is experimental and subject to change.
		*/
		getName() {
			return this.name;
		}
		/**
		* Returns the range of the start operator and the name. If the
		* here-document is initialized with <<EOT then the start range would
		* encompass all five characters.
		*
		* This API is experimental and subject to change.
		*/
		getStartRange() {
			return this.startRange;
		}
		/**
		* Returns the range of this here-document's name that is declared at
		* the beginning of the here-document with the operator. If the
		* here-document is initialized with <<EOT then the name range would
		* encompass the latter three "EOT" characters.
		*
		* This API is experimental and subject to change.
		*/
		getNameRange() {
			return this.nameRange;
		}
		/**
		* Returns the range of the content of this here-document. This may
		* be null if the here-document has no content because:
		* - the start range is the only thing that was declared
		* - the end range was declared immediately and there is no content
		*
		* This API is experimental and subject to change.
		*/
		getContentRange() {
			return this.contentRange;
		}
		/**
		* Returns the range of the here-document's name on a line that
		* represents the end of the here-document.
		*
		* This API is experimental and subject to change.
		*/
		getDelimiterRange() {
			return this.endRange;
		}
	};
	exports.Heredoc = Heredoc;
}));
//#endregion
//#region ../../node_modules/dockerfile-ast/lib/variable.js
var require_variable = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Variable = void 0;
	var Variable = class {
		constructor(name, nameRange, range, modifier, modifierRange, substitutionParameter, substitutionRange, defined, buildVariable, stringValue) {
			this.name = name;
			this.nameRange = nameRange;
			this.range = range;
			this.modifier = modifier;
			this.modifierRange = modifierRange;
			this.substitutionParameter = substitutionParameter;
			this.substitutionRange = substitutionRange;
			this.defined = defined;
			this.buildVariable = buildVariable;
			this.stringValue = stringValue;
		}
		toString() {
			return this.stringValue;
		}
		getName() {
			return this.name;
		}
		getNameRange() {
			return this.nameRange;
		}
		/**
		* Returns the range of the entire variable. This includes the symbols for
		* the declaration of the variable such as the $, {, and } symbols.
		*
		* @return the range in the document that this variable encompasses in its
		*         entirety
		*/
		getRange() {
			return this.range;
		}
		/**
		* Returns the modifier character that has been set for
		* specifying how this variable should be expanded and resolved.
		* If this variable is ${variable:+value} then the modifier
		* character is '+'. Will be the empty string if the variable is
		* declared as ${variable:}. Otherwise, will be null if this
		* variable will not use variable substitution at all (such as
		* ${variable} or $variable).
		*
		* @return this variable's modifier character, or the empty
		*         string if it does not have one, or null if this
		*         variable will not use variable substitution
		*/
		getModifier() {
			return this.modifier;
		}
		getModifierRange() {
			return this.modifierRange;
		}
		/**
		* Returns the parameter that will be used for substitution if
		* this variable uses modifiers to define how its value should be
		* resolved. If this variable is ${variable:+value} then the
		* substitution value will be 'value'. Will be the empty string
		* if the variable is declared as ${variable:+} or some other
		* variant where the only thing that follows the modifier
		* character (excluding considerations of escape characters and
		* so on) is the variable's closing bracket. May be null if this
		* variable does not have a modifier character defined (such as
		* ${variable} or $variable).
		*
		* @return this variable's substitution parameter, or the empty
		*         string if it does not have one, or null if there is
		*         not one defined
		*/
		getSubstitutionParameter() {
			return this.substitutionParameter;
		}
		getSubstitutionRange() {
			return this.substitutionRange;
		}
		/**
		* Returns whether this variable has been defined or not.
		*
		* @return true if this variable has been defined, false otherwise
		*/
		isDefined() {
			return this.defined;
		}
		isBuildVariable() {
			return this.buildVariable === true;
		}
		isEnvironmentVariable() {
			return this.buildVariable === false;
		}
	};
	exports.Variable = Variable;
}));
//#endregion
//#region ../../node_modules/dockerfile-ast/lib/instruction.js
var require_instruction = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Instruction = void 0;
	var vscode_languageserver_types_1 = require_main$1();
	var util_1 = require_util();
	var line_1 = require_line();
	var argument_1 = require_argument();
	var heredoc_1 = require_heredoc();
	var variable_1 = require_variable();
	var main_1 = require_main();
	var Instruction = class extends line_1.Line {
		constructor(document, range, dockerfile, escapeChar, instruction, instructionRange) {
			super(document, range);
			this.dockerfile = dockerfile;
			this.escapeChar = escapeChar;
			this.instruction = instruction;
			this.instructionRange = instructionRange;
		}
		toString() {
			let value = this.getKeyword();
			for (let arg of this.getRawArguments()) {
				value += " ";
				value += arg.getValue();
			}
			return value;
		}
		getRangeContent(range) {
			if (range === null) return null;
			return this.document.getText().substring(this.document.offsetAt(range.start), this.document.offsetAt(range.end));
		}
		getInstructionRange() {
			return this.instructionRange;
		}
		getInstruction() {
			return this.instruction;
		}
		getKeyword() {
			return this.getInstruction().toUpperCase();
		}
		getArgumentsRange() {
			let args = this.getArguments();
			if (args.length === 0) return null;
			return vscode_languageserver_types_1.Range.create(args[0].getRange().start, args[args.length - 1].getRange().end);
		}
		getArgumentsRanges() {
			let args = this.getArguments();
			if (args.length === 0) return [];
			if (args[0].getRange().start.line === args[args.length - 1].getRange().end.line) return [vscode_languageserver_types_1.Range.create(args[0].getRange().start, args[args.length - 1].getRange().end)];
			let ranges = [];
			let end = -1;
			let startPosition = args[0].getRange().start;
			let range = this.getInstructionRange();
			let extra = this.document.offsetAt(startPosition) - this.document.offsetAt(range.start);
			let fullArgs = this.getTextContent().substring(extra, this.document.offsetAt(args[args.length - 1].getRange().end) - this.document.offsetAt(range.start));
			let offset = this.document.offsetAt(range.start) + extra;
			let comment = false;
			for (let i = 0; i < fullArgs.length; i++) {
				let char = fullArgs.charAt(i);
				if (char === this.escapeChar) {
					let next = fullArgs.charAt(i + 1);
					if (next === " " || next === "	") whitespaceCheck: for (let j = i + 2; j < fullArgs.length; j++) switch (fullArgs.charAt(j)) {
						case " ":
						case "	": continue;
						case "\r": j++;
						case "\n":
							if (startPosition !== null) ranges.push(vscode_languageserver_types_1.Range.create(startPosition, this.document.positionAt(offset + end + 1)));
							startPosition = null;
							comment = false;
							i = j;
							break whitespaceCheck;
						default: break whitespaceCheck;
					}
					else if (next === "\r") {
						if (startPosition !== null) {
							ranges.push(vscode_languageserver_types_1.Range.create(startPosition, this.document.positionAt(offset + end + 1)));
							startPosition = null;
						}
						comment = false;
						i += 2;
					} else if (next === "\n") {
						if (startPosition !== null) ranges.push(vscode_languageserver_types_1.Range.create(startPosition, this.document.positionAt(offset + end + 1)));
						startPosition = null;
						comment = false;
						i++;
					} else i++;
				} else if (util_1.Util.isNewline(char)) {
					if (comment) {
						startPosition = null;
						comment = false;
					}
				} else if (!comment) {
					if (startPosition === null) {
						if (char === "#") {
							comment = true;
							continue;
						}
						let position = this.document.positionAt(offset + i);
						if (position.character !== 0) startPosition = vscode_languageserver_types_1.Position.create(position.line, 0);
					}
					end = i;
				}
			}
			if (startPosition === null) ranges.push(vscode_languageserver_types_1.Range.create(this.document.positionAt(offset + end), this.document.positionAt(offset + end + 1)));
			else ranges.push(vscode_languageserver_types_1.Range.create(startPosition, this.document.positionAt(offset + end + 1)));
			return ranges;
		}
		getRawArgumentsContent() {
			let args = this.getArguments();
			if (args.length === 0) return null;
			return this.getRangeContent(vscode_languageserver_types_1.Range.create(args[0].getRange().start, args[args.length - 1].getRange().end));
		}
		getArgumentsContent() {
			if (this.getArguments().length === 0) return null;
			let content = "";
			let ranges = this.getArgumentsRanges();
			let documentText = this.document.getText();
			for (let range of ranges) content += documentText.substring(this.document.offsetAt(range.start), this.document.offsetAt(range.end));
			return content;
		}
		getArguments() {
			return this.getRawArguments();
		}
		getRawArguments() {
			let args = [];
			let range = this.getInstructionRange();
			let extra = this.document.offsetAt(range.end) - this.document.offsetAt(range.start);
			let fullArgs = this.getTextContent().substring(extra);
			let offset = this.document.offsetAt(range.start) + extra;
			let start = false;
			let comment = false;
			let found = -1;
			let escapedWhitespaceDetected = false;
			let escaping = false;
			let escapeMarker = -1;
			let escapedArg = "";
			for (let i = 0; i < fullArgs.length; i++) {
				let char = fullArgs.charAt(i);
				if (util_1.Util.isWhitespace(char)) {
					if (escaping) {
						escapedWhitespaceDetected = true;
						if (util_1.Util.isNewline(char)) {
							escapedWhitespaceDetected = false;
							if (comment) {
								comment = false;
								start = true;
							}
						}
						continue;
					} else if (found !== -1) {
						if (escapeMarker === -1) args.push(new argument_1.Argument(escapedArg, vscode_languageserver_types_1.Range.create(this.document.positionAt(offset + found), this.document.positionAt(offset + i))));
						else args.push(new argument_1.Argument(escapedArg, vscode_languageserver_types_1.Range.create(this.document.positionAt(offset + found), this.document.positionAt(offset + escapeMarker))));
						escapeMarker = -1;
						escapedArg = "";
						found = -1;
					}
				} else if (char === this.escapeChar) {
					let next = fullArgs.charAt(i + 1);
					if (next === " " || next === "	") whitespaceCheck: for (let j = i + 2; j < fullArgs.length; j++) switch (fullArgs.charAt(j)) {
						case " ":
						case "	": continue;
						case "\r": j++;
						case "\n":
							comment = false;
							escaping = true;
							start = true;
							if (found !== -1) escapeMarker = i;
							i = j;
							break whitespaceCheck;
						default:
							escapeMarker = i;
							if (found === -1) i = j - 1;
							break whitespaceCheck;
					}
					else if (next === "\r") {
						comment = false;
						escaping = true;
						start = true;
						if (found !== -1 && escapeMarker === -1) escapeMarker = i;
						i += 2;
					} else if (next === "\n") {
						comment = false;
						escaping = true;
						start = true;
						if (found !== -1 && escapeMarker === -1) escapeMarker = i;
						i++;
					} else {
						if (escapedWhitespaceDetected && escapeMarker !== -1) {
							args.push(new argument_1.Argument(escapedArg, vscode_languageserver_types_1.Range.create(this.document.positionAt(offset + found), this.document.positionAt(offset + escapeMarker))));
							escapedArg = "";
							found = -1;
						}
						escapeMarker = -1;
						escapedWhitespaceDetected = false;
						escaping = false;
						if (next === "$") escapedArg = escapedArg + char + next;
						else if (next === "") break;
						else escapedArg = escapedArg + next;
						if (found === -1) found = i;
						i++;
					}
				} else if (!comment) {
					if (start && char === "#") comment = true;
					else {
						if (escapedWhitespaceDetected && escapeMarker !== -1) {
							args.push(new argument_1.Argument(escapedArg, vscode_languageserver_types_1.Range.create(this.document.positionAt(offset + found), this.document.positionAt(offset + escapeMarker))));
							escapedArg = "";
							found = -1;
						}
						escapedWhitespaceDetected = false;
						escaping = false;
						escapeMarker = -1;
						escapedArg = escapedArg + char;
						if (found === -1) found = i;
					}
					start = false;
				}
			}
			if (found !== -1) if (escapeMarker === -1) args.push(new argument_1.Argument(escapedArg, vscode_languageserver_types_1.Range.create(this.document.positionAt(offset + found), this.document.positionAt(offset + fullArgs.length))));
			else args.push(new argument_1.Argument(escapedArg, vscode_languageserver_types_1.Range.create(this.document.positionAt(offset + found), this.document.positionAt(offset + escapeMarker))));
			return args;
		}
		getExpandedArguments() {
			let args = this.getArguments();
			for (let i = 0; i < args.length; i++) {
				const argRange = args[i].getRange();
				let offset = this.document.offsetAt(argRange.start);
				const variables = this.parseVariables(offset, args[i].getValue());
				const swaps = [];
				let requiresExpansion = false;
				for (let variable of variables) {
					const value = this.dockerfile.resolveVariable(variable.getName(), variable.getNameRange().start.line);
					swaps.push(value);
					requiresExpansion = requiresExpansion || value !== void 0;
				}
				if (requiresExpansion) {
					let expanded = "";
					for (let j = 0; j < swaps.length; j++) {
						const variableRange = variables[j].getRange();
						const start = this.document.offsetAt(variableRange.start);
						const end = this.document.offsetAt(variableRange.end);
						if (swaps[j]) {
							expanded += this.document.getText().substring(offset, start);
							expanded += swaps[j];
							offset = end;
						} else {
							expanded += this.document.getText().substring(offset, end);
							offset = end;
						}
					}
					const argEnd = this.document.offsetAt(argRange.end);
					if (argEnd !== offset) expanded += this.document.getText().substring(offset, argEnd);
					args[i] = new argument_1.Argument(expanded, argRange);
				}
			}
			return args;
		}
		getVariables() {
			const variables = [];
			const args = this.getRawArguments();
			for (const arg of args) {
				let range = arg.getRange();
				let rawValue = this.document.getText().substring(this.document.offsetAt(range.start), this.document.offsetAt(range.end));
				const parsedVariables = this.parseVariables(this.document.offsetAt(arg.getRange().start), rawValue);
				for (const parsedVariable of parsedVariables) variables.push(parsedVariable);
			}
			return variables;
		}
		parseVariables(offset, arg) {
			let variables = [];
			variableLoop: for (let i = 0; i < arg.length; i++) switch (arg.charAt(i)) {
				case this.escapeChar:
					if (arg.charAt(i + 1) === "$") i++;
					break;
				case "$":
					if (arg.charAt(i + 1) === "{") {
						let escapedString = "${";
						let escapedName = "";
						let nameEnd = -1;
						let escapedSubstitutionParameter = "";
						let substitutionStart = -1;
						let substitutionEnd = -1;
						let modifierRead = -1;
						nameLoop: for (let j = i + 2; j < arg.length; j++) {
							let char = arg.charAt(j);
							switch (char) {
								case this.escapeChar:
									for (let k = j + 1; k < arg.length; k++) switch (arg.charAt(k)) {
										case " ":
										case "	":
										case "\r": continue;
										case "\n":
											j = k;
											continue nameLoop;
									}
									break;
								case "}":
									escapedString += "}";
									let modifier = null;
									let modifierRange = null;
									let substitutionParameter = modifierRead !== -1 ? escapedSubstitutionParameter : null;
									let substitutionRange = null;
									if (nameEnd === -1) nameEnd = j;
									else if (nameEnd + 1 === j) {
										modifier = "";
										modifierRange = vscode_languageserver_types_1.Range.create(this.document.positionAt(offset + nameEnd + 1), this.document.positionAt(offset + nameEnd + 1));
									} else {
										if (substitutionStart === -1) {
											substitutionStart = modifierRead + 1;
											substitutionEnd = modifierRead + 1;
										} else substitutionEnd = substitutionEnd + 1;
										modifier = arg.substring(modifierRead, modifierRead + 1);
										modifierRange = vscode_languageserver_types_1.Range.create(this.document.positionAt(offset + modifierRead), this.document.positionAt(offset + modifierRead + 1));
										substitutionRange = vscode_languageserver_types_1.Range.create(this.document.positionAt(offset + substitutionStart), this.document.positionAt(offset + substitutionEnd));
									}
									let start = this.document.positionAt(offset + i);
									variables.push(new variable_1.Variable(escapedName, vscode_languageserver_types_1.Range.create(this.document.positionAt(offset + i + 2), this.document.positionAt(offset + nameEnd)), vscode_languageserver_types_1.Range.create(start, this.document.positionAt(offset + j + 1)), modifier, modifierRange, substitutionParameter, substitutionRange, this.dockerfile.resolveVariable(escapedName, start.line) !== void 0, this.isBuildVariable(escapedName, start.line), escapedString));
									i = j;
									continue variableLoop;
								case ":":
									if (nameEnd === -1) nameEnd = j;
									else if (modifierRead !== -1) {
										if (substitutionStart === -1) {
											substitutionStart = j;
											substitutionEnd = j;
										} else substitutionEnd = j;
										escapedSubstitutionParameter += ":";
									} else modifierRead = j;
									escapedString += ":";
									break;
								case "\n":
								case "\r":
								case " ":
								case "	": break;
								default:
									if (nameEnd === -1) escapedName += char;
									else if (modifierRead !== -1) {
										if (substitutionStart === -1) {
											substitutionStart = j;
											substitutionEnd = j;
										} else substitutionEnd = j;
										escapedSubstitutionParameter += char;
									} else modifierRead = j;
									escapedString += char;
									break;
							}
						}
						break variableLoop;
					} else if (util_1.Util.isWhitespace(arg.charAt(i + 1)) || i === arg.length - 1) continue;
					else {
						let escapedName = "";
						nameLoop: for (let j = i + 1; j < arg.length; j++) {
							let char = arg.charAt(j);
							switch (char) {
								case "\r":
								case "\n":
								case " ":
								case "	": continue;
								case "$":
								case "'":
								case "\"":
									let varStart = this.document.positionAt(offset + i);
									variables.push(new variable_1.Variable(escapedName, vscode_languageserver_types_1.Range.create(this.document.positionAt(offset + i + 1), this.document.positionAt(offset + j)), vscode_languageserver_types_1.Range.create(varStart, this.document.positionAt(offset + j)), null, null, null, null, this.dockerfile.resolveVariable(escapedName, varStart.line) !== void 0, this.isBuildVariable(escapedName, varStart.line), "$" + escapedName));
									i = j - 1;
									continue variableLoop;
								case this.escapeChar:
									for (let k = j + 1; k < arg.length; k++) switch (arg.charAt(k)) {
										case " ":
										case "	":
										case "\r": continue;
										case "\n":
											j = k;
											continue nameLoop;
									}
									let start = this.document.positionAt(offset + i);
									variables.push(new variable_1.Variable(escapedName, vscode_languageserver_types_1.Range.create(this.document.positionAt(offset + i + 1), this.document.positionAt(offset + j)), vscode_languageserver_types_1.Range.create(start, this.document.positionAt(offset + j)), null, null, null, null, this.dockerfile.resolveVariable(escapedName, start.line) !== void 0, this.isBuildVariable(escapedName, start.line), "$" + escapedName));
									break variableLoop;
							}
							if (char.match(/^[a-z0-9_]+$/i) === null) {
								let varStart = this.document.positionAt(offset + i);
								variables.push(new variable_1.Variable(escapedName, vscode_languageserver_types_1.Range.create(this.document.positionAt(offset + i + 1), this.document.positionAt(offset + j)), vscode_languageserver_types_1.Range.create(varStart, this.document.positionAt(offset + j)), null, null, null, null, this.dockerfile.resolveVariable(escapedName, varStart.line) !== void 0, this.isBuildVariable(escapedName, varStart.line), "$" + escapedName));
								i = j - 1;
								continue variableLoop;
							}
							escapedName += char;
						}
						let start = this.document.positionAt(offset + i);
						variables.push(new variable_1.Variable(escapedName, vscode_languageserver_types_1.Range.create(this.document.positionAt(offset + i + 1), this.document.positionAt(offset + arg.length)), vscode_languageserver_types_1.Range.create(start, this.document.positionAt(offset + arg.length)), null, null, null, null, this.dockerfile.resolveVariable(escapedName, start.line) !== void 0, this.isBuildVariable(escapedName, start.line), "$" + escapedName));
					}
					break variableLoop;
			}
			return variables;
		}
		isBuildVariable(variable, line) {
			if (this.getKeyword() === main_1.Keyword.FROM) {
				for (const initialArg of this.dockerfile.getInitialARGs()) {
					const property = initialArg.getProperty();
					if (property && variable === property.getName()) return true;
				}
				return;
			}
			let image = this.dockerfile.getContainingImage(vscode_languageserver_types_1.Position.create(line, 0));
			let envs = image.getENVs();
			for (let i = envs.length - 1; i >= 0; i--) if (envs[i].isBefore(line)) {
				for (let property of envs[i].getProperties()) if (property.getName() === variable) return false;
			}
			let args = image.getARGs();
			for (let i = args.length - 1; i >= 0; i--) if (args[i].isBefore(line)) {
				let property = args[i].getProperty();
				if (property && property.getName() === variable) return true;
			}
		}
		createSingleLineHeredocs(args) {
			const heredocs = [];
			for (const arg of args) {
				const value = arg.getValue();
				if (value.startsWith("<<") && util_1.Util.parseHeredocName(value) !== null) {
					const startRange = arg.getRange();
					const nameRange = this.getNameRange(startRange);
					const name = this.getName(nameRange);
					heredocs.push(new heredoc_1.Heredoc(startRange, name, nameRange, null, null));
				}
			}
			return heredocs;
		}
		getName(nameRange) {
			const content = this.document.getText(nameRange);
			let escaping = false;
			let name = "";
			nameLoop: for (let i = 0; i < content.length; i++) {
				const ch = content.charAt(i);
				switch (ch) {
					case this.escapeChar:
						escaping = true;
						for (let j = i + 1; j < content.length; j++) switch (content.charAt(j)) {
							case " ":
							case "	": break;
							case "\r":
								i = j + 1;
								continue nameLoop;
							case "\n":
								i = j;
								continue nameLoop;
							default:
								name += content.charAt(j);
								i = j;
								continue nameLoop;
						}
						break;
					case "#": if (escaping) for (let j = i + 1; j < content.length; j++) switch (content.charAt(j)) {
						case "\n":
							i = j;
							continue nameLoop;
					}
					case " ":
					case "	":
					case "\r":
					case "\n": if (escaping) break;
					default:
						name += ch;
						break;
				}
			}
			return name;
		}
		getNameRange(startRange) {
			const content = this.document.getText(startRange);
			let endFound = false;
			let searchHyphen = false;
			let start = -1;
			let end = -1;
			let escaping = false;
			let quote = null;
			contentLoop: for (let i = 0; i < content.length; i++) {
				const ch = content.charAt(i);
				switch (ch) {
					case "\"":
					case "'":
						if (quote === ch) break contentLoop;
						quote = ch;
						continue;
					case this.escapeChar:
						for (let j = i + 1; j < content.length; j++) switch (content.charAt(j)) {
							case "\n":
								escaping = true;
								j = i;
								continue contentLoop;
						}
						break;
					case " ":
					case "	":
					case "\r":
					case "\n": break;
					case "<":
						if (endFound) searchHyphen = true;
						else endFound = true;
						break;
					case "-": if (searchHyphen) {
						searchHyphen = false;
						break;
					}
					case "#": if (escaping) for (let j = i + 1; j < content.length; j++) switch (content.charAt(j)) {
						case "\n":
							i = j;
							continue contentLoop;
					}
					default:
						if (start === -1) start = i;
						if (quote !== null) {
							end = i + 1;
							break;
						}
						break contentLoop;
				}
			}
			if (start === -1) return vscode_languageserver_types_1.Range.create(startRange.end, startRange.end);
			const nameStart = this.document.positionAt(this.document.offsetAt(startRange.start) + start);
			const nameEnd = quote !== null ? this.document.positionAt(this.document.offsetAt(startRange.start) + end) : startRange.end;
			return vscode_languageserver_types_1.Range.create(nameStart, nameEnd);
		}
		getHeredocs() {
			const args = this.getArguments();
			if (args.length === 0) return [];
			const heredocs = [];
			const range = this.getRange();
			if (range.start.line === range.end.line) return this.createSingleLineHeredocs(args);
			const heredocDefinitions = [];
			let heredocsProcessed = false;
			let escaping = false;
			let contentStart = -1;
			let contentEnd = -1;
			let lineStart = -1;
			let currentHeredoc = 0;
			const startOffset = this.document.offsetAt(args[0].getRange().start);
			const content = this.getRangeContent(vscode_languageserver_types_1.Range.create(args[0].getRange().start, this.getRange().end));
			contentLoop: for (let i = 0; i < content.length; i++) switch (content.charAt(i)) {
				case this.escapeChar:
					escaping = true;
					for (let j = i + 1; j < content.length; j++) switch (content.charAt(j)) {
						case " ":
						case "	": break;
						case "\r": j++;
						case "\n":
							i = j;
							continue contentLoop;
						default:
							i = j;
							continue contentLoop;
					}
					break;
				case "\r": break;
				case "\n":
					if (escaping) break;
					if (heredocsProcessed) {
						if (contentStart === -1) contentStart = i;
						contentEnd = i;
						const arg = heredocDefinitions[currentHeredoc];
						const startRange = arg.getRange();
						const nameRange = this.getNameRange(startRange);
						const name = this.getName(nameRange);
						const delimiterRange = this.getDelimiterRange(arg, name, vscode_languageserver_types_1.Range.create(this.document.positionAt(startOffset + lineStart), this.document.positionAt(startOffset + i)));
						if (delimiterRange !== null) {
							const contentRange = vscode_languageserver_types_1.Range.create(this.document.positionAt(startOffset + contentStart), this.document.positionAt(startOffset + lineStart - 1));
							heredocs.push(new heredoc_1.Heredoc(startRange, name, nameRange, contentRange, delimiterRange));
							contentStart = -1;
							currentHeredoc++;
						}
						lineStart = -1;
					} else {
						const offsetLimit = startOffset + i;
						for (const arg of args) if (this.document.offsetAt(arg.getRange().start) < offsetLimit) {
							if (arg.getValue().startsWith("<<")) heredocDefinitions.push(arg);
						} else break;
						heredocsProcessed = true;
						lineStart = -1;
						continue contentLoop;
					}
					break;
				case " ":
				case "	": if (escaping) break;
				case "#": if (escaping) for (let j = i + 1; j < content.length; j++) switch (content.charAt(j)) {
					case "\n":
						i = j;
						continue contentLoop;
				}
				default:
					if (escaping) escaping = false;
					if (heredocsProcessed) {
						if (contentStart === -1) contentStart = i;
						if (lineStart === -1) lineStart = i;
					}
					break;
			}
			if (heredocsProcessed) {
				const arg = heredocDefinitions[currentHeredoc];
				const startRange = arg.getRange();
				const nameRange = this.getNameRange(startRange);
				const name = this.getName(nameRange);
				let contentRange = null;
				const delimiterRange = this.getDelimiterRange(arg, name, vscode_languageserver_types_1.Range.create(this.document.positionAt(startOffset + lineStart), range.end));
				if (delimiterRange === null) contentRange = vscode_languageserver_types_1.Range.create(this.document.positionAt(startOffset + contentStart), range.end);
				else if (contentEnd !== -1) contentRange = vscode_languageserver_types_1.Range.create(this.document.positionAt(startOffset + contentStart), this.document.positionAt(startOffset + contentEnd));
				heredocs.push(new heredoc_1.Heredoc(startRange, name, nameRange, contentRange, delimiterRange));
				currentHeredoc++;
				for (let i = currentHeredoc; i < heredocDefinitions.length; i++) {
					const startRange = heredocDefinitions[currentHeredoc].getRange();
					const nameRange = this.getNameRange(startRange);
					const name = this.getName(nameRange);
					heredocs.push(new heredoc_1.Heredoc(startRange, name, nameRange, null, null));
					currentHeredoc++;
				}
			} else return this.createSingleLineHeredocs(args);
			return heredocs;
		}
		getDelimiterRange(startArg, name, candidateRange) {
			const text = this.document.getText(candidateRange);
			if (startArg.getValue().startsWith("<<-")) {
				let index = 0;
				while (text.charAt(index) === "	") index++;
				if (text.substring(index) === name) return vscode_languageserver_types_1.Range.create(vscode_languageserver_types_1.Position.create(candidateRange.start.line, index), candidateRange.end);
				return null;
			}
			return text === name ? candidateRange : null;
		}
	};
	exports.Instruction = Instruction;
}));
//#endregion
//#region ../../node_modules/dockerfile-ast/lib/flagOption.js
var require_flagOption = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.FlagOption = void 0;
	var FlagOption = class {
		constructor(range, name, nameRange, value, valueRange) {
			this.range = range;
			this.name = name;
			this.nameRange = nameRange;
			this.value = value;
			this.valueRange = valueRange;
		}
		toString() {
			if (this.valueRange !== null) return this.name + "=" + this.value;
			return this.name;
		}
		getRange() {
			return this.range;
		}
		getName() {
			return this.name;
		}
		getNameRange() {
			return this.nameRange;
		}
		getValue() {
			return this.value;
		}
		getValueRange() {
			return this.valueRange;
		}
	};
	exports.FlagOption = FlagOption;
}));
//#endregion
//#region ../../node_modules/dockerfile-ast/lib/flag.js
var require_flag = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Flag = void 0;
	var vscode_languageserver_types_1 = require_main$1();
	var flagOption_1 = require_flagOption();
	var Flag = class {
		constructor(document, range, name, nameRange, value, valueRange) {
			this.options = [];
			this.range = range;
			this.name = name;
			this.nameRange = nameRange;
			this.value = value;
			this.valueRange = valueRange;
			if (this.value !== null) {
				let offset = document.offsetAt(valueRange.start);
				let nameStart = -1;
				let valueStart = -1;
				let hasOptions = false;
				for (let i = 0; i < value.length; i++) switch (value.charAt(i)) {
					case "=":
						hasOptions = true;
						if (valueStart === -1) {
							valueStart = i + 1;
							break;
						}
						break;
					case ",":
						this.options.push(this.createFlagOption(document, value, offset, nameStart, valueStart, i));
						nameStart = -1;
						valueStart = -1;
						break;
					default:
						if (nameStart === -1) nameStart = i;
						break;
				}
				if (hasOptions && nameStart !== -1) this.options.push(this.createFlagOption(document, value, offset, nameStart, valueStart, value.length));
			}
		}
		createFlagOption(document, content, documentOffset, nameStart, valueStart, valueEnd) {
			const optionRange = vscode_languageserver_types_1.Range.create(document.positionAt(documentOffset + nameStart), document.positionAt(documentOffset + valueEnd));
			if (valueStart === -1) return new flagOption_1.FlagOption(optionRange, content.substring(nameStart, valueEnd), optionRange, null, null);
			return new flagOption_1.FlagOption(optionRange, content.substring(nameStart, valueStart - 1), vscode_languageserver_types_1.Range.create(document.positionAt(documentOffset + nameStart), document.positionAt(documentOffset + valueStart - 1)), content.substring(valueStart, valueEnd), vscode_languageserver_types_1.Range.create(document.positionAt(documentOffset + valueStart), document.positionAt(documentOffset + valueEnd)));
		}
		toString() {
			if (this.valueRange) return "--" + this.name + "=" + this.value;
			return "--" + this.name;
		}
		/**
		* Returns the range that encompasses this entire flag. This includes the
		* -- prefix in the beginning to the last character of the flag's value (if
		* it has been defined).
		*
		* @return the entire range of this flag
		*/
		getRange() {
			return this.range;
		}
		/**
		* Returns the name of this flag. The name does not include the -- prefix.
		* Thus, for HEALTHCHECK's --interval flag, interval is the flag's name and
		* not --interval.
		*
		* @return this flag's name
		*/
		getName() {
			return this.name;
		}
		/**
		* Returns the range that encompasses the flag's name
		*
		* @return the range containing the flag's name
		*/
		getNameRange() {
			return this.nameRange;
		}
		/**
		* Returns the value that has been set to this flag. May be null if the
		* flag is invalid and has no value set like a --start-period. If the flag
		* is instead a --start-period= with an equals sign then the flag's value
		* is the empty string.
		*
		* @return this flag's value if it has been defined, null otherwise
		*/
		getValue() {
			return this.value;
		}
		/**
		* Returns the range that encompasses this flag's value. If no value has
		* been set then null will be returned.
		*
		* @return the range containing this flag's value, or null if the flag
		*         has no value defined
		*/
		getValueRange() {
			return this.valueRange;
		}
		getOption(name) {
			for (const option of this.options) if (option.getName() === name) return option;
			return null;
		}
		getOptions() {
			return this.options;
		}
		hasOptions() {
			return this.options.length > 0;
		}
	};
	exports.Flag = Flag;
}));
//#endregion
//#region ../../node_modules/dockerfile-ast/lib/modifiableInstruction.js
var require_modifiableInstruction = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ModifiableInstruction = void 0;
	var vscode_languageserver_types_1 = require_main$1();
	var flag_1 = require_flag();
	var instruction_1 = require_instruction();
	var ModifiableInstruction = class extends instruction_1.Instruction {
		constructor(document, range, dockerfile, escapeChar, instruction, instructionRange) {
			super(document, range, dockerfile, escapeChar, instruction, instructionRange);
		}
		getFlags() {
			if (!this.flags) {
				this.flags = [];
				for (let arg of this.getArguments()) {
					let value = arg.getValue();
					if (this.stopSearchingForFlags(value)) return this.flags;
					else if (value.indexOf("--") === 0) {
						let range = arg.getRange();
						let rawValue = this.document.getText().substring(this.document.offsetAt(range.start), this.document.offsetAt(range.end));
						let nameIndex = value.indexOf("=");
						let index = rawValue.indexOf("=");
						let firstMatch = false;
						let secondMatch = false;
						let startIndex = -1;
						nameSearchLoop: for (let i = 0; i < rawValue.length; i++) switch (rawValue.charAt(i)) {
							case "\\":
							case " ":
							case "	":
							case "\r":
							case "\n": break;
							case "-":
								if (secondMatch) {
									startIndex = i;
									break nameSearchLoop;
								} else if (firstMatch) secondMatch = true;
								else firstMatch = true;
								break;
							default:
								startIndex = i;
								break nameSearchLoop;
						}
						let nameStart = this.document.positionAt(this.document.offsetAt(range.start) + startIndex);
						if (index === -1) this.flags.push(new flag_1.Flag(this.document, range, value.substring(2), vscode_languageserver_types_1.Range.create(nameStart, range.end), null, null));
						else if (index === value.length - 1) {
							let nameEnd = this.document.positionAt(this.document.offsetAt(range.start) + index);
							this.flags.push(new flag_1.Flag(this.document, range, value.substring(2, index), vscode_languageserver_types_1.Range.create(nameStart, nameEnd), "", vscode_languageserver_types_1.Range.create(range.end, range.end)));
						} else {
							let nameEnd = this.document.positionAt(this.document.offsetAt(range.start) + index);
							this.flags.push(new flag_1.Flag(this.document, range, value.substring(2, nameIndex), vscode_languageserver_types_1.Range.create(nameStart, nameEnd), value.substring(nameIndex + 1), vscode_languageserver_types_1.Range.create(this.document.positionAt(this.document.offsetAt(range.start) + index + 1), range.end)));
						}
					}
				}
			}
			return this.flags;
		}
		getArguments() {
			const args = super.getArguments();
			const flags = this.getFlags();
			if (flags.length === 0) return args;
			for (let i = 0; i < flags.length; i++) args.shift();
			return args;
		}
	};
	exports.ModifiableInstruction = ModifiableInstruction;
}));
//#endregion
//#region ../../node_modules/dockerfile-ast/lib/jsonInstruction.js
var require_jsonInstruction = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.JSONInstruction = void 0;
	var vscode_languageserver_types_1 = require_main$1();
	var argument_1 = require_argument();
	var jsonArgument_1 = require_jsonArgument();
	var modifiableInstruction_1 = require_modifiableInstruction();
	var JSONInstruction = class extends modifiableInstruction_1.ModifiableInstruction {
		constructor(document, range, dockerfile, escapeChar, instruction, instructionRange) {
			super(document, range, dockerfile, escapeChar, instruction, instructionRange);
			this.openingBracket = null;
			this.closingBracket = null;
			this.jsonStrings = [];
			const argsContent = this.getRawArgumentsContent();
			if (argsContent === null) return;
			const args = this.getArguments();
			if (args.length === 1 && args[0].getValue() === "[]") {
				let argRange = args[0].getRange();
				this.openingBracket = new argument_1.Argument("[", vscode_languageserver_types_1.Range.create(argRange.start.line, argRange.start.character, argRange.start.line, argRange.start.character + 1));
				this.closingBracket = new argument_1.Argument("]", vscode_languageserver_types_1.Range.create(argRange.start.line, argRange.start.character + 1, argRange.end.line, argRange.end.character));
				return;
			} else if (args.length === 2 && args[0].getValue() === "[" && args[1].getValue() === "]") {
				this.openingBracket = args[0];
				this.closingBracket = args[1];
				return;
			}
			const argsOffset = document.offsetAt(this.getArgumentsRange().start);
			let start = -1;
			let last = "";
			let quoted = false;
			let escapedArg = "";
			argsCheck: for (let i = 0; i < argsContent.length; i++) {
				let char = argsContent.charAt(i);
				switch (char) {
					case "[":
						if (last === "") {
							this.openingBracket = new argument_1.Argument("[", vscode_languageserver_types_1.Range.create(document.positionAt(argsOffset + i), document.positionAt(argsOffset + i + 1)));
							last = "[";
						} else if (quoted) escapedArg = escapedArg + char;
						else break argsCheck;
						break;
					case "\"":
						if (last === "[" || last === ",") {
							start = i;
							quoted = true;
							last = "\"";
							escapedArg = escapedArg + char;
							continue;
						} else if (last === "\"") if (quoted) {
							escapedArg = escapedArg + char;
							quoted = false;
							this.jsonStrings.push(new jsonArgument_1.JSONArgument(escapedArg, vscode_languageserver_types_1.Range.create(document.positionAt(argsOffset + start), document.positionAt(argsOffset + i + 1)), vscode_languageserver_types_1.Range.create(document.positionAt(argsOffset + start + 1), document.positionAt(argsOffset + i))));
							escapedArg = "";
						} else break argsCheck;
						else break argsCheck;
						break;
					case ",":
						if (quoted) escapedArg = escapedArg + char;
						else if (last === "\"") last = ",";
						else break argsCheck;
						break;
					case "]":
						if (quoted) escapedArg = escapedArg + char;
						else if (last !== "") {
							this.closingBracket = new argument_1.Argument("]", vscode_languageserver_types_1.Range.create(document.positionAt(argsOffset + i), document.positionAt(argsOffset + i + 1)));
							break argsCheck;
						}
						break;
					case " ":
					case "	": break;
					case "\\":
						if (quoted) switch (argsContent.charAt(i + 1)) {
							case "\"":
							case "\\":
								escapedArg = escapedArg + argsContent.charAt(i + 1);
								i++;
								continue;
							case " ":
							case "	":
								escapeCheck: for (let j = i + 2; j < argsContent.length; j++) switch (argsContent.charAt(j)) {
									case "\r": j++;
									case "\n":
										i = j;
										continue argsCheck;
									case " ":
									case "	": break;
									default: break escapeCheck;
								}
								break;
							case "\r": i++;
							default:
								i++;
								continue;
						}
						else escapeCheck: for (let j = i + 1; j < argsContent.length; j++) switch (argsContent.charAt(j)) {
							case "\r": j++;
							case "\n":
								i = j;
								continue argsCheck;
							case " ":
							case "	": break;
							default: break escapeCheck;
						}
						break argsCheck;
					default:
						if (!quoted) break argsCheck;
						escapedArg = escapedArg + char;
						break;
				}
			}
		}
		stopSearchingForFlags(_value) {
			return true;
		}
		getOpeningBracket() {
			return this.openingBracket;
		}
		getJSONStrings() {
			return this.jsonStrings;
		}
		getClosingBracket() {
			return this.closingBracket;
		}
	};
	exports.JSONInstruction = JSONInstruction;
}));
//#endregion
//#region ../../node_modules/dockerfile-ast/lib/instructions/add.js
var require_add = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Add = void 0;
	var jsonInstruction_1 = require_jsonInstruction();
	var Add = class extends jsonInstruction_1.JSONInstruction {
		constructor(document, range, dockerfile, escapeChar, instruction, instructionRange) {
			super(document, range, dockerfile, escapeChar, instruction, instructionRange);
		}
		stopSearchingForFlags(argument) {
			return argument.indexOf("--") === -1;
		}
	};
	exports.Add = Add;
}));
//#endregion
//#region ../../node_modules/dockerfile-ast/lib/property.js
var require_property = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Property = void 0;
	var vscode_languageserver_types_1 = require_main$1();
	var util_1 = require_util();
	exports.Property = class Property {
		constructor(document, escapeChar, arg, arg2) {
			this.assignmentOperatorRange = null;
			this.assignmentOperator = null;
			this.valueRange = null;
			this.value = null;
			this.document = document;
			this.escapeChar = escapeChar;
			this.nameRange = Property.getNameRange(document, arg);
			let value = document.getText().substring(document.offsetAt(this.nameRange.start), document.offsetAt(this.nameRange.end));
			this.name = Property.getValue(value, escapeChar);
			if (arg2) {
				this.valueRange = arg2.getRange();
				value = document.getText().substring(document.offsetAt(this.valueRange.start), document.offsetAt(this.valueRange.end));
				this.value = Property.getValue(value, escapeChar);
				this.range = vscode_languageserver_types_1.Range.create(this.nameRange.start, this.valueRange.end);
			} else {
				let argRange = arg.getRange();
				if (this.nameRange.start.line === argRange.start.line && this.nameRange.start.character === argRange.start.character && this.nameRange.end.line === argRange.end.line && this.nameRange.end.character === argRange.end.character) {} else {
					this.valueRange = Property.getValueRange(document, arg);
					value = document.getText().substring(document.offsetAt(this.valueRange.start), document.offsetAt(this.valueRange.end));
					this.value = Property.getValue(value, escapeChar);
					this.assignmentOperatorRange = vscode_languageserver_types_1.Range.create(this.nameRange.end, this.valueRange.start);
					this.assignmentOperator = "=";
				}
				this.range = argRange;
			}
		}
		getRange() {
			return this.range;
		}
		getName() {
			return this.name;
		}
		getNameRange() {
			return this.nameRange;
		}
		getValue() {
			return this.value;
		}
		getValueRange() {
			return this.valueRange;
		}
		/**
		* Retrieves the operator used for delimiting between the name and
		* value of this property. This will either be the "=" character
		* or null if a character was not used or if this property has no
		* value defined.
		*/
		getAssignmentOperator() {
			return this.assignmentOperator;
		}
		getAssignmentOperatorRange() {
			return this.assignmentOperatorRange;
		}
		/**
		* Returns the value of this property including any enclosing
		* single or double quotes and relevant escape characters.
		* Escaped newlines and its associated contiguous whitespace
		* characters however will not be returned as they are deemed to
		* be uninteresting to clients trying to return a Dockerfile.
		*
		* @return the unescaped value of this property or null if this
		*         property has no associated value
		*/
		getUnescapedValue() {
			if (this.valueRange === null) return null;
			let escaped = false;
			let rawValue = "";
			let value = this.document.getText().substring(this.document.offsetAt(this.valueRange.start), this.document.offsetAt(this.valueRange.end));
			rawLoop: for (let i = 0; i < value.length; i++) {
				let char = value.charAt(i);
				switch (char) {
					case this.escapeChar:
						for (let j = i + 1; j < value.length; j++) switch (value.charAt(j)) {
							case "\r": j++;
							case "\n":
								escaped = true;
								i = j;
								continue rawLoop;
							case " ":
							case "	": break;
							default:
								rawValue = rawValue + char;
								continue rawLoop;
						}
						rawValue = rawValue + char;
						break;
					case "\r":
					case "\n": break;
					case " ":
					case "	":
						if (!escaped) rawValue = rawValue + char;
						break;
					case "#":
						if (escaped) for (let j = i + 1; j < value.length; j++) switch (value.charAt(j)) {
							case "\r": j++;
							case "\n":
								i = j;
								continue rawLoop;
						}
						else rawValue = rawValue + char;
						break;
					default:
						rawValue = rawValue + char;
						escaped = false;
						break;
				}
			}
			return rawValue;
		}
		static getNameRange(document, arg) {
			let value = arg.getValue();
			let index = value.indexOf("=");
			if (index !== -1) {
				let initial = value.charAt(0);
				let before = value.charAt(index - 1);
				if (initial === "\"" && before === "\"" || initial === "'" && before === "'" || initial !== "\"" && initial !== "'") return vscode_languageserver_types_1.Range.create(arg.getRange().start, document.positionAt(document.offsetAt(arg.getRange().start) + index));
			}
			return arg.getRange();
		}
		static getValueRange(document, arg) {
			return vscode_languageserver_types_1.Range.create(document.positionAt(document.offsetAt(arg.getRange().start) + arg.getValue().indexOf("=") + 1), document.positionAt(document.offsetAt(arg.getRange().end)));
		}
		/**
		* Returns the actual value of this key-value pair. The value will
		* have its escape characters removed if applicable. If the value
		* spans multiple lines and there are comments nested within the
		* lines, they too will be removed.
		*
		* @return the value that this key-value pair will actually be, may
		*         be null if no value is defined, may be the empty string
		*         if the value only consists of whitespace
		*/
		static getValue(value, escapeChar) {
			let escaped = false;
			const skip = util_1.Util.findLeadingNonWhitespace(value, escapeChar);
			if (skip !== 0 && value.charAt(skip) === "#") escaped = true;
			value = value.substring(skip);
			let first = value.charAt(0);
			let last = value.charAt(value.length - 1);
			let literal = first === "'" || first === "\"";
			let inSingle = first === "'" && last === "'";
			let inDouble = false;
			if (first === "\"") {
				for (let i = 1; i < value.length; i++) if (value.charAt(i) === escapeChar) i++;
				else if (value.charAt(i) === "\"" && i === value.length - 1) inDouble = true;
			}
			if (inSingle || inDouble) value = value.substring(1, value.length - 1);
			let commentCheck = -1;
			let escapedValue = "";
			parseValue: for (let i = 0; i < value.length; i++) {
				let char = value.charAt(i);
				switch (char) {
					case escapeChar:
						if (i + 1 === value.length) {
							escapedValue = escapedValue + escapeChar;
							break parseValue;
						}
						char = value.charAt(i + 1);
						if (char === " " || char === "	") whitespaceCheck: for (let j = i + 2; j < value.length; j++) {
							let char2 = value.charAt(j);
							switch (char2) {
								case " ":
								case "	": break;
								case "\r": j++;
								case "\n":
									escaped = true;
									i = j;
									continue parseValue;
								default:
									if (!inDouble && !inSingle && !literal) {
										if (char2 === escapeChar) {
											escapedValue = escapedValue + char;
											i = i + 1;
										} else {
											escapedValue = escapedValue + char + char2;
											i = j;
										}
										continue parseValue;
									}
									break whitespaceCheck;
							}
						}
						if (inDouble) {
							if (char === "\r") {
								escaped = true;
								i = i + 2;
							} else if (char === "\n") {
								escaped = true;
								i++;
							} else if (char !== "\"") {
								if (char === escapeChar) i++;
								escapedValue = escapedValue + escapeChar;
							}
							continue parseValue;
						} else if (inSingle || literal) {
							if (char === "\r") {
								escaped = true;
								i = i + 2;
							} else if (char === "\n") {
								escaped = true;
								i++;
							} else escapedValue = escapedValue + escapeChar;
							continue parseValue;
						} else if (char === escapeChar) {
							escapedValue = escapedValue + escapeChar;
							i++;
						} else if (char === "\r") {
							escaped = true;
							i = i + 2;
						} else if (char === "\n") {
							escaped = true;
							i++;
						} else {
							escapedValue = escapedValue + char;
							i++;
						}
						break;
					case " ":
					case "	":
						if (escaped && commentCheck === -1) commentCheck = i;
						escapedValue = escapedValue + char;
						break;
					case "\r": i++;
					case "\n":
						if (escaped && commentCheck !== -1) {
							escapedValue = escapedValue.substring(0, escapedValue.length - (i - commentCheck - 1));
							commentCheck = -1;
						}
						break;
					case "#": if (escaped) {
						if (commentCheck !== -1) {
							escapedValue = escapedValue.substring(0, escapedValue.length - (i - commentCheck));
							commentCheck = -1;
						}
						newlineCheck: for (let j = i + 1; j < value.length; j++) switch (value.charAt(j)) {
							case "\r": j++;
							case "\n":
								i = j;
								break newlineCheck;
						}
						continue parseValue;
					}
					default:
						if (escaped) {
							escaped = false;
							commentCheck = -1;
						}
						escapedValue = escapedValue + char;
						break;
				}
			}
			return escapedValue;
		}
	};
}));
//#endregion
//#region ../../node_modules/dockerfile-ast/lib/propertyInstruction.js
var require_propertyInstruction = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.PropertyInstruction = void 0;
	var vscode_languageserver_types_1 = require_main$1();
	var instruction_1 = require_instruction();
	var property_1 = require_property();
	var argument_1 = require_argument();
	var util_1 = require_util();
	var PropertyInstruction = class extends instruction_1.Instruction {
		constructor(document, range, dockerfile, escapeChar, instruction, instructionRange) {
			super(document, range, dockerfile, escapeChar, instruction, instructionRange);
			this.properties = void 0;
		}
		getProperties() {
			if (this.properties === void 0) {
				let args = this.getPropertyArguments();
				if (args.length === 0) this.properties = [];
				else if (args.length === 1) this.properties = [new property_1.Property(this.document, this.escapeChar, args[0])];
				else if (args.length === 2) if (args[0].getValue().indexOf("=") === -1) this.properties = [new property_1.Property(this.document, this.escapeChar, args[0], args[1])];
				else this.properties = [new property_1.Property(this.document, this.escapeChar, args[0]), new property_1.Property(this.document, this.escapeChar, args[1])];
				else if (args[0].getValue().indexOf("=") === -1) {
					let text = this.document.getText();
					let start = args[1].getRange().start;
					let end = args[args.length - 1].getRange().end;
					text = text.substring(this.document.offsetAt(start), this.document.offsetAt(end));
					this.properties = [new property_1.Property(this.document, this.escapeChar, args[0], new argument_1.Argument(text, vscode_languageserver_types_1.Range.create(args[1].getRange().start, args[args.length - 1].getRange().end)))];
				} else {
					this.properties = [];
					for (let i = 0; i < args.length; i++) this.properties.push(new property_1.Property(this.document, this.escapeChar, args[i]));
				}
			}
			return this.properties;
		}
		/**
		* Goes from the back of the string and returns the first
		* non-whitespace character that is found. If an escape character
		* is found with newline characters, the escape character will
		* not be considered a non-whitespace character and its index in
		* the string will not be returned.
		*
		* @param content the string to search through
		* @return the index in the string for the first non-whitespace
		*         character when searching from the end of the string
		*/
		findTrailingNonWhitespace(content) {
			let index = content.length;
			whitespaceCheck: for (let i = content.length - 1; i >= 0; i--) switch (content.charAt(i)) {
				case " ":
				case "	": continue;
				case "\n": if (content.charAt(i - 1) === "\r") i = i - 1;
				case "\r":
					newlineCheck: for (let j = i - 1; j >= 0; j--) switch (content.charAt(j)) {
						case " ":
						case "	":
						case "\r":
						case "\n":
						case this.escapeChar: continue;
						default:
							index = j;
							break newlineCheck;
					}
					break whitespaceCheck;
				default:
					index = i;
					break whitespaceCheck;
			}
			return index;
		}
		getPropertyArguments() {
			const args = [];
			let range = this.getInstructionRange();
			let instructionNameEndOffset = this.document.offsetAt(range.end);
			let extra = instructionNameEndOffset - this.document.offsetAt(range.start);
			let content = this.getTextContent();
			let fullArgs = content.substring(extra);
			let start = util_1.Util.findLeadingNonWhitespace(fullArgs, this.escapeChar);
			if (start === -1) return [];
			const startPosition = this.document.positionAt(instructionNameEndOffset + start);
			let escaped = range.start.line !== startPosition.line;
			let endingEscape = false;
			let mark = -1;
			let end = this.findTrailingNonWhitespace(fullArgs);
			content = fullArgs.substring(start, end + 1);
			let argStart = escaped ? -1 : 0;
			let spaced = false;
			argumentLoop: for (let i = 0; i < content.length; i++) {
				let char = content.charAt(i);
				switch (char) {
					case this.escapeChar:
						if (i + 1 === content.length) {
							endingEscape = true;
							break argumentLoop;
						}
						if (!escaped) mark = i;
						switch (content.charAt(i + 1)) {
							case " ":
							case "	":
								if (!util_1.Util.isWhitespace(content.charAt(i + 2))) {
									i = i + 1;
									continue argumentLoop;
								}
								whitespaceCheck: for (let j = i + 2; j < content.length; j++) switch (content.charAt(j)) {
									case "\r": j++;
									case "\n":
										escaped = true;
										i = j;
										continue argumentLoop;
									case " ":
									case "	": break;
									default:
										args.push(new argument_1.Argument(content.substring(argStart, i), vscode_languageserver_types_1.Range.create(this.document.positionAt(instructionNameEndOffset + start + argStart), this.document.positionAt(instructionNameEndOffset + start + i + 2))));
										argStart = j;
										break whitespaceCheck;
								}
								i = argStart - 1;
								continue argumentLoop;
							case "\r": i++;
							case "\n":
								escaped = true;
								i = i + 1;
								continue argumentLoop;
							case this.escapeChar:
								if (argStart === -1) argStart = i;
								i = i + 1;
								continue argumentLoop;
							default:
								if (argStart === -1) argStart = i;
								continue argumentLoop;
						}
					case "'":
					case "\"":
						if (spaced) {
							this.createSpacedArgument(argStart, args, content, mark, instructionNameEndOffset, start);
							argStart = i;
							spaced = false;
						}
						if (argStart === -1) argStart = i;
						for (let j = i + 1; j < content.length; j++) switch (content.charAt(j)) {
							case char:
								if (content.charAt(j + 1) !== " " && content.charAt(j + 1) !== "") {
									i = j;
									continue argumentLoop;
								}
								args.push(new argument_1.Argument(content.substring(argStart, j + 1), vscode_languageserver_types_1.Range.create(this.document.positionAt(instructionNameEndOffset + start + argStart), this.document.positionAt(instructionNameEndOffset + start + j + 1))));
								i = j;
								argStart = -1;
								continue argumentLoop;
							case this.escapeChar:
								j++;
								break;
						}
						break argumentLoop;
					case " ":
					case "	":
						if (escaped) {
							if (argStart !== -1) spaced = true;
						} else if (argStart !== -1) {
							args.push(new argument_1.Argument(content.substring(argStart, i), vscode_languageserver_types_1.Range.create(this.document.positionAt(instructionNameEndOffset + start + argStart), this.document.positionAt(instructionNameEndOffset + start + i))));
							argStart = -1;
						}
						break;
					case "\r": i++;
					case "\n":
						spaced = false;
						break;
					case "#":
						if (escaped) {
							for (let j = i + 1; j < content.length; j++) switch (content.charAt(j)) {
								case "\r": j++;
								case "\n":
									i = j;
									spaced = false;
									continue argumentLoop;
							}
							if (argStart !== -1) {
								let value = content.substring(argStart, mark);
								args.push(new argument_1.Argument(value, vscode_languageserver_types_1.Range.create(this.document.positionAt(instructionNameEndOffset + start + argStart), this.document.positionAt(instructionNameEndOffset + start + mark))));
								argStart = -1;
							}
							break argumentLoop;
						} else if (argStart === -1) argStart = i;
						break;
					default:
						if (spaced) {
							this.createSpacedArgument(argStart, args, content, mark, instructionNameEndOffset, start);
							argStart = i;
							spaced = false;
						}
						escaped = false;
						if (argStart === -1) argStart = i;
						if (char === "$" && content.charAt(i + 1) === "{") {
							let singleQuotes = false;
							let doubleQuotes = false;
							let escaped = false;
							for (let j = i + 1; j < content.length; j++) switch (content.charAt(j)) {
								case this.escapeChar:
									escaped = true;
									break;
								case "\r":
								case "\n": break;
								case "'":
									singleQuotes = !singleQuotes;
									escaped = false;
									break;
								case "\"":
									doubleQuotes = !doubleQuotes;
									escaped = false;
									break;
								case " ":
								case "	":
									if (escaped || singleQuotes || doubleQuotes) break;
									i = j - 1;
									continue argumentLoop;
								case "}":
									i = j;
									continue argumentLoop;
								default:
									escaped = false;
									break;
							}
							break argumentLoop;
						}
						break;
				}
			}
			if (argStart !== -1 && argStart !== content.length) {
				let end = endingEscape ? content.length - 1 : content.length;
				let value = content.substring(argStart, end);
				args.push(new argument_1.Argument(value, vscode_languageserver_types_1.Range.create(this.document.positionAt(instructionNameEndOffset + start + argStart), this.document.positionAt(instructionNameEndOffset + start + end))));
			}
			return args;
		}
		createSpacedArgument(argStart, args, content, mark, instructionNameEndOffset, start) {
			if (argStart !== -1) args.push(new argument_1.Argument(content.substring(argStart, mark), vscode_languageserver_types_1.Range.create(this.document.positionAt(instructionNameEndOffset + start + argStart), this.document.positionAt(instructionNameEndOffset + start + mark))));
		}
	};
	exports.PropertyInstruction = PropertyInstruction;
}));
//#endregion
//#region ../../node_modules/dockerfile-ast/lib/instructions/arg.js
var require_arg = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Arg = void 0;
	var property_1 = require_property();
	var propertyInstruction_1 = require_propertyInstruction();
	var Arg = class extends propertyInstruction_1.PropertyInstruction {
		constructor(document, range, dockerfile, escapeChar, instruction, instructionRange) {
			super(document, range, dockerfile, escapeChar, instruction, instructionRange);
			this.property = null;
			const args = this.getPropertyArguments();
			if (args.length === 1) this.property = new property_1.Property(this.document, this.escapeChar, args[0]);
			else this.property = null;
		}
		/**
		* Returns the variable defined by this ARG. This may be null if
		* this ARG instruction is malformed and has no variable
		* declaration.
		*/
		getProperty() {
			return this.property;
		}
	};
	exports.Arg = Arg;
}));
//#endregion
//#region ../../node_modules/dockerfile-ast/lib/instructions/cmd.js
var require_cmd = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Cmd = void 0;
	var jsonInstruction_1 = require_jsonInstruction();
	var Cmd = class extends jsonInstruction_1.JSONInstruction {
		constructor(document, range, dockerfile, escapeChar, instruction, instructionRange) {
			super(document, range, dockerfile, escapeChar, instruction, instructionRange);
		}
	};
	exports.Cmd = Cmd;
}));
//#endregion
//#region ../../node_modules/dockerfile-ast/lib/instructions/copy.js
var require_copy = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Copy = void 0;
	var jsonInstruction_1 = require_jsonInstruction();
	var Copy = class extends jsonInstruction_1.JSONInstruction {
		constructor(document, range, dockerfile, escapeChar, instruction, instructionRange) {
			super(document, range, dockerfile, escapeChar, instruction, instructionRange);
		}
		stopSearchingForFlags(argument) {
			return argument.indexOf("--") === -1;
		}
		getFromFlag() {
			let flags = super.getFlags();
			return flags.length === 1 && flags[0].getName() === "from" ? flags[0] : null;
		}
		/**
		* Returns there here-documents that are defined in this RUN
		* instruction.
		*
		* This API is experimental and subject to change.
		*/
		getHeredocs() {
			return super.getHeredocs();
		}
	};
	exports.Copy = Copy;
}));
//#endregion
//#region ../../node_modules/dockerfile-ast/lib/instructions/env.js
var require_env = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Env = void 0;
	var propertyInstruction_1 = require_propertyInstruction();
	var Env = class extends propertyInstruction_1.PropertyInstruction {
		constructor(document, range, dockerfile, escapeChar, instruction, instructionRange) {
			super(document, range, dockerfile, escapeChar, instruction, instructionRange);
		}
		getProperties() {
			return super.getProperties();
		}
	};
	exports.Env = Env;
}));
//#endregion
//#region ../../node_modules/dockerfile-ast/lib/instructions/entrypoint.js
var require_entrypoint = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Entrypoint = void 0;
	var jsonInstruction_1 = require_jsonInstruction();
	var Entrypoint = class extends jsonInstruction_1.JSONInstruction {
		constructor(document, range, dockerfile, escapeChar, instruction, instructionRange) {
			super(document, range, dockerfile, escapeChar, instruction, instructionRange);
		}
	};
	exports.Entrypoint = Entrypoint;
}));
//#endregion
//#region ../../node_modules/dockerfile-ast/lib/instructions/from.js
var require_from = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.From = void 0;
	var vscode_languageserver_types_1 = require_main$1();
	var modifiableInstruction_1 = require_modifiableInstruction();
	var From = class extends modifiableInstruction_1.ModifiableInstruction {
		constructor(document, range, dockerfile, escapeChar, instruction, instructionRange) {
			super(document, range, dockerfile, escapeChar, instruction, instructionRange);
		}
		stopSearchingForFlags(argument) {
			return argument.indexOf("--") === -1;
		}
		getImage() {
			const args = this.getArguments();
			return args.length > 0 ? args[0].getValue() : null;
		}
		/**
		* Returns the name of the image that will be used as the base image.
		*
		* @return the base image's name, or null if unspecified
		*/
		getImageName() {
			const imageName = this.getRangeContent(this.getImageNameRange());
			if (imageName === null) return null;
			let commented = false;
			let escaped = false;
			let name = "";
			for (let i = 0; i < imageName.length; i++) {
				const ch = imageName.charAt(i);
				switch (ch) {
					case this.escapeChar:
						escaped = true;
						break;
					case "\r": continue;
					case "\n":
						commented = false;
						break;
					case " ":
					case "	": break;
					case "#":
						if (escaped) commented = true;
						else {
							name = name + ch;
							escaped = false;
						}
						break;
					default:
						if (!commented) {
							name = name + ch;
							escaped = false;
						}
						break;
				}
			}
			return name;
		}
		/**
		* Returns the range that covers the name of the image used by
		* this instruction.
		*
		* @return the range of the name of this instruction's argument,
		*         or null if no image has been specified
		*/
		getImageNameRange() {
			let range = this.getImageRange();
			if (range) {
				let registryRange = this.getRegistryRange();
				if (registryRange) range.start = this.document.positionAt(this.document.offsetAt(registryRange.end) + 1);
				let tagRange = this.getImageTagRange();
				let digestRange = this.getImageDigestRange();
				if (tagRange === null) {
					if (digestRange !== null) range.end = this.document.positionAt(this.document.offsetAt(digestRange.start) - 1);
				} else range.end = this.document.positionAt(this.document.offsetAt(tagRange.start) - 1);
				return range;
			}
			return null;
		}
		/**
		* Returns the range that covers the image argument of this
		* instruction. This includes the tag or digest of the image if
		* it has been specified by the instruction.
		*
		* @return the range of the image argument, or null if no image
		*         has been specified
		*/
		getImageRange() {
			let args = this.getArguments();
			return args.length !== 0 ? args[0].getRange() : null;
		}
		getImageTag() {
			return this.getRangeContent(this.getImageTagRange());
		}
		/**
		* Returns the range in the document that the tag of the base
		* image encompasses.
		*
		* @return the base image's tag's range in the document, or null
		*         if no tag has been specified
		*/
		getImageTagRange() {
			const range = this.getImageRange();
			if (range) {
				const rangeStartOffset = this.document.offsetAt(range.start);
				const content = this.getRangeContent(range);
				const atIndex = this.indexOf(rangeStartOffset, content, "@");
				const slashIndex = content.indexOf("/");
				if (atIndex === -1) {
					const colonIndex = this.lastIndexOf(rangeStartOffset, content, ":");
					if (colonIndex > slashIndex) return vscode_languageserver_types_1.Range.create(this.document.positionAt(rangeStartOffset + colonIndex + 1), range.end);
				}
				const subcontent = content.substring(0, atIndex);
				const subcolonIndex = subcontent.indexOf(":");
				if (subcolonIndex === -1) return null;
				if (slashIndex === -1) return vscode_languageserver_types_1.Range.create(this.document.positionAt(rangeStartOffset + subcolonIndex + 1), this.document.positionAt(rangeStartOffset + atIndex));
				if (subcolonIndex < slashIndex) return null;
				return vscode_languageserver_types_1.Range.create(this.document.positionAt(rangeStartOffset + subcolonIndex + 1), this.document.positionAt(rangeStartOffset + subcontent.length));
			}
			return null;
		}
		getImageDigest() {
			return this.getRangeContent(this.getImageDigestRange());
		}
		/**
		* Returns the range in the document that the digest of the base
		* image encompasses.
		*
		* @return the base image's digest's range in the document, or null
		*         if no digest has been specified
		*/
		getImageDigestRange() {
			let range = this.getImageRange();
			if (range) {
				let content = this.getRangeContent(range);
				let index = this.lastIndexOf(this.document.offsetAt(range.start), content, "@");
				if (index !== -1) return vscode_languageserver_types_1.Range.create(range.start.line, range.start.character + index + 1, range.end.line, range.end.character);
			}
			return null;
		}
		indexOf(documentOffset, content, searchString) {
			let index = content.indexOf(searchString);
			const variables = this.getVariables();
			for (let i = 0; i < variables.length; i++) {
				const position = documentOffset + index;
				const variableRange = variables[i].getRange();
				if (this.document.offsetAt(variableRange.start) < position && position < this.document.offsetAt(variableRange.end)) {
					const offset = this.document.offsetAt(variableRange.end) - documentOffset;
					const subIndex = content.substring(offset).indexOf(searchString);
					if (subIndex === -1) return -1;
					index = subIndex + offset;
					i = -1;
					continue;
				}
			}
			return index;
		}
		lastIndexOf(documentOffset, content, searchString) {
			let index = content.lastIndexOf(searchString);
			const variables = this.getVariables();
			for (let i = 0; i < variables.length; i++) {
				const position = documentOffset + index;
				const variableRange = variables[i].getRange();
				if (this.document.offsetAt(variableRange.start) < position && position < this.document.offsetAt(variableRange.end)) {
					index = content.substring(0, index).lastIndexOf(searchString);
					if (index === -1) return -1;
					i = -1;
					continue;
				}
			}
			return index;
		}
		getRegistry() {
			return this.getRangeContent(this.getRegistryRange());
		}
		getRegistryRange() {
			const range = this.getImageRange();
			if (range) {
				const tagRange = this.getImageTagRange();
				const digestRange = this.getImageDigestRange();
				if (tagRange === null) {
					if (digestRange !== null) range.end = this.document.positionAt(this.document.offsetAt(digestRange.start) - 1);
				} else range.end = this.document.positionAt(this.document.offsetAt(tagRange.start) - 1);
				const content = this.getRangeContent(range);
				const rangeStart = this.document.offsetAt(range.start);
				const startingSlashIndex = this.indexOf(rangeStart, content, "/");
				if (startingSlashIndex === -1) return null;
				const portIndex = this.indexOf(rangeStart, content, ":");
				const dotIndex = this.indexOf(rangeStart, content, ".");
				if (portIndex !== -1 || dotIndex !== -1) return vscode_languageserver_types_1.Range.create(range.start, this.document.positionAt(rangeStart + startingSlashIndex));
				if (content.substring(0, startingSlashIndex) === "localhost") return vscode_languageserver_types_1.Range.create(range.start, this.document.positionAt(rangeStart + startingSlashIndex));
			}
			return null;
		}
		getBuildStage() {
			let range = this.getBuildStageRange();
			return range === null ? null : this.getRangeContent(range);
		}
		getBuildStageRange() {
			let args = this.getArguments();
			if (args.length > 2 && args[1].getValue().toUpperCase() === "AS") return args[2].getRange();
			return null;
		}
		getPlatformFlag() {
			let flags = super.getFlags();
			return flags.length === 1 && flags[0].getName() === "platform" ? flags[0] : null;
		}
	};
	exports.From = From;
}));
//#endregion
//#region ../../node_modules/dockerfile-ast/lib/instructions/healthcheck.js
var require_healthcheck = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Healthcheck = void 0;
	var modifiableInstruction_1 = require_modifiableInstruction();
	var Healthcheck = class extends modifiableInstruction_1.ModifiableInstruction {
		constructor(document, range, dockerfile, escapeChar, instruction, instructionRange) {
			super(document, range, dockerfile, escapeChar, instruction, instructionRange);
		}
		stopSearchingForFlags(argument) {
			argument = argument.toUpperCase();
			return argument === "CMD" || argument === "NONE";
		}
		getSubcommand() {
			let args = this.getArguments();
			return args.length !== 0 ? args[0] : null;
		}
	};
	exports.Healthcheck = Healthcheck;
}));
//#endregion
//#region ../../node_modules/dockerfile-ast/lib/instructions/label.js
var require_label = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Label = void 0;
	var propertyInstruction_1 = require_propertyInstruction();
	var util_1 = require_util();
	var Label = class extends propertyInstruction_1.PropertyInstruction {
		constructor(document, range, dockerfile, escapeChar, instruction, instructionRange) {
			super(document, range, dockerfile, escapeChar, instruction, instructionRange);
		}
		getVariables() {
			const variables = super.getVariables();
			const properties = this.getProperties();
			for (const property of properties) {
				const value = property.getUnescapedValue();
				if (value !== null && value.length > 2 && value.charAt(0) === "'" && value.charAt(value.length - 1) === "'") {
					const range = property.getValueRange();
					for (let i = 0; i < variables.length; i++) if (util_1.Util.isInsideRange(variables[i].getRange().start, range)) {
						variables.splice(i, 1);
						i--;
					}
				}
			}
			return variables;
		}
		getProperties() {
			return super.getProperties();
		}
	};
	exports.Label = Label;
}));
//#endregion
//#region ../../node_modules/dockerfile-ast/lib/instructions/onbuild.js
var require_onbuild = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Onbuild = void 0;
	var vscode_languageserver_types_1 = require_main$1();
	var parser_1 = require_parser();
	var instruction_1 = require_instruction();
	var Onbuild = class extends instruction_1.Instruction {
		constructor(document, range, dockerfile, escapeChar, instruction, instructionRange) {
			super(document, range, dockerfile, escapeChar, instruction, instructionRange);
		}
		getTrigger() {
			let trigger = this.getTriggerWord();
			return trigger === null ? null : trigger.toUpperCase();
		}
		getTriggerWord() {
			return this.getRangeContent(this.getTriggerRange());
		}
		getTriggerRange() {
			let args = this.getArguments();
			return args.length > 0 ? args[0].getRange() : null;
		}
		getTriggerInstruction() {
			let triggerRange = this.getTriggerRange();
			if (triggerRange === null) return null;
			let args = this.getArguments();
			return parser_1.Parser.createInstruction(this.document, this.dockerfile, this.escapeChar, vscode_languageserver_types_1.Range.create(args[0].getRange().start, this.getRange().end), this.getTriggerWord(), triggerRange);
		}
	};
	exports.Onbuild = Onbuild;
}));
//#endregion
//#region ../../node_modules/dockerfile-ast/lib/instructions/run.js
var require_run = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Run = void 0;
	var jsonInstruction_1 = require_jsonInstruction();
	var Run = class extends jsonInstruction_1.JSONInstruction {
		constructor(document, range, dockerfile, escapeChar, instruction, instructionRange) {
			super(document, range, dockerfile, escapeChar, instruction, instructionRange);
		}
		stopSearchingForFlags(argument) {
			return argument.indexOf("--") === -1;
		}
		/**
		* Returns there here-documents that are defined in this RUN
		* instruction.
		*
		* This API is experimental and subject to change.
		*/
		getHeredocs() {
			return super.getHeredocs();
		}
	};
	exports.Run = Run;
}));
//#endregion
//#region ../../node_modules/dockerfile-ast/lib/instructions/shell.js
var require_shell = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Shell = void 0;
	var jsonInstruction_1 = require_jsonInstruction();
	var Shell = class extends jsonInstruction_1.JSONInstruction {
		constructor(document, range, dockerfile, escapeChar, instruction, instructionRange) {
			super(document, range, dockerfile, escapeChar, instruction, instructionRange);
		}
	};
	exports.Shell = Shell;
}));
//#endregion
//#region ../../node_modules/dockerfile-ast/lib/instructions/stopsignal.js
var require_stopsignal = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Stopsignal = void 0;
	var instruction_1 = require_instruction();
	var Stopsignal = class extends instruction_1.Instruction {
		constructor(document, range, dockerfile, escapeChar, instruction, instructionRange) {
			super(document, range, dockerfile, escapeChar, instruction, instructionRange);
		}
	};
	exports.Stopsignal = Stopsignal;
}));
//#endregion
//#region ../../node_modules/dockerfile-ast/lib/instructions/workdir.js
var require_workdir = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Workdir = void 0;
	var instruction_1 = require_instruction();
	var Workdir = class extends instruction_1.Instruction {
		constructor(document, range, dockerfile, escapeChar, instruction, instructionRange) {
			super(document, range, dockerfile, escapeChar, instruction, instructionRange);
		}
		/**
		* Returns the path that has been defined. Note that this path may
		* be absolute or relative depending on what was written in the
		* instruction.
		*
		* @return the working directory's path, or null if this
		*         instruction has no arguments
		*/
		getPath() {
			return this.getArgumentsContent();
		}
		/**
		* Returns the absolute path that this instruction resolves to. The
		* function will inspect prior WORKDIR instructions in the current
		* image or another build stage in the Dockerfile to try to
		* determine this.
		*
		* @return the absolute path of the working directory, or null if
		*         this instruction has no arguments, or undefined if it
		*         cannot be determined because only relative paths could be
		*         found
		*/
		getAbsolutePath() {
			const path = this.getPath();
			if (path === null || path.startsWith("/")) return path;
			const startLine = this.getRange().start.line;
			const hierarchy = this.dockerfile.getStageHierarchy(startLine);
			for (let i = hierarchy.length - 1; i >= 0; i--) {
				const workdirs = hierarchy[i].getWORKDIRs();
				for (let j = workdirs.length - 1; j >= 0; j--) if (workdirs[j].getRange().start.line < startLine) {
					const parent = workdirs[j].getAbsolutePath();
					if (parent === void 0 || parent === null) return;
					return parent.endsWith("/") ? parent + path : parent + "/" + path;
				}
			}
		}
	};
	exports.Workdir = Workdir;
}));
//#endregion
//#region ../../node_modules/dockerfile-ast/lib/instructions/user.js
var require_user = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.User = void 0;
	var instruction_1 = require_instruction();
	var User = class extends instruction_1.Instruction {
		constructor(document, range, dockerfile, escapeChar, instruction, instructionRange) {
			super(document, range, dockerfile, escapeChar, instruction, instructionRange);
		}
	};
	exports.User = User;
}));
//#endregion
//#region ../../node_modules/dockerfile-ast/lib/instructions/volume.js
var require_volume = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Volume = void 0;
	var jsonInstruction_1 = require_jsonInstruction();
	var Volume = class extends jsonInstruction_1.JSONInstruction {
		constructor(document, range, dockerfile, escapeChar, instruction, instructionRange) {
			super(document, range, dockerfile, escapeChar, instruction, instructionRange);
		}
	};
	exports.Volume = Volume;
}));
//#endregion
//#region ../../node_modules/dockerfile-ast/lib/imageTemplate.js
var require_imageTemplate = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ImageTemplate = void 0;
	var vscode_languageserver_types_1 = require_main$1();
	var arg_1 = require_arg();
	var cmd_1 = require_cmd();
	var copy_1 = require_copy();
	var env_1 = require_env();
	var entrypoint_1 = require_entrypoint();
	var from_1 = require_from();
	var healthcheck_1 = require_healthcheck();
	var onbuild_1 = require_onbuild();
	var util_1 = require_util();
	var workdir_1 = require_workdir();
	var ImageTemplate = class {
		constructor() {
			this.comments = [];
			this.instructions = [];
		}
		addComment(comment) {
			this.comments.push(comment);
		}
		getComments() {
			return this.comments;
		}
		addInstruction(instruction) {
			this.instructions.push(instruction);
		}
		getInstructions() {
			return this.instructions;
		}
		getInstructionAt(line) {
			for (let instruction of this.instructions) if (util_1.Util.isInsideRange(vscode_languageserver_types_1.Position.create(line, 0), instruction.getRange())) return instruction;
			return null;
		}
		/**
		* Gets all the ARG instructions that are defined in this image.
		*/
		getARGs() {
			let args = [];
			for (let instruction of this.instructions) if (instruction instanceof arg_1.Arg) args.push(instruction);
			return args;
		}
		/**
		* Gets all the CMD instructions that are defined in this image.
		*/
		getCMDs() {
			let cmds = [];
			for (let instruction of this.instructions) if (instruction instanceof cmd_1.Cmd) cmds.push(instruction);
			return cmds;
		}
		/**
		* Gets all the COPY instructions that are defined in this image.
		*/
		getCOPYs() {
			let copies = [];
			for (let instruction of this.instructions) if (instruction instanceof copy_1.Copy) copies.push(instruction);
			return copies;
		}
		/**
		* Gets all the ENTRYPOINT instructions that are defined in this image.
		*/
		getENTRYPOINTs() {
			let froms = [];
			for (let instruction of this.instructions) if (instruction instanceof entrypoint_1.Entrypoint) froms.push(instruction);
			return froms;
		}
		/**
		* Gets all the ENV instructions that are defined in this image.
		*/
		getENVs() {
			let args = [];
			for (let instruction of this.instructions) if (instruction instanceof env_1.Env) args.push(instruction);
			return args;
		}
		getFROM() {
			for (const instruction of this.instructions) if (instruction instanceof from_1.From) return instruction;
			return null;
		}
		/**
		* Gets all the FROM instructions that are defined in this image.
		*/
		getFROMs() {
			let froms = [];
			for (let instruction of this.instructions) if (instruction instanceof from_1.From) froms.push(instruction);
			return froms;
		}
		/**
		* Gets all the HEALTHCHECK instructions that are defined in this image.
		*/
		getHEALTHCHECKs() {
			let froms = [];
			for (let instruction of this.instructions) if (instruction instanceof healthcheck_1.Healthcheck) froms.push(instruction);
			return froms;
		}
		getWORKDIRs() {
			const workdirs = [];
			for (const instruction of this.instructions) if (instruction instanceof workdir_1.Workdir) workdirs.push(instruction);
			return workdirs;
		}
		getOnbuildTriggers() {
			let triggers = [];
			for (let instruction of this.instructions) if (instruction instanceof onbuild_1.Onbuild) {
				let trigger = instruction.getTriggerInstruction();
				if (trigger) triggers.push(trigger);
			}
			return triggers;
		}
		getAvailableVariables(currentLine) {
			const variables = [];
			for (const arg of this.getARGs()) if (arg.isBefore(currentLine)) {
				const property = arg.getProperty();
				if (property) {
					const variable = property.getName();
					if (variables.indexOf(variable) === -1) variables.push(variable);
				}
			}
			for (const env of this.getENVs()) if (env.isBefore(currentLine)) for (const property of env.getProperties()) {
				const variable = property.getName();
				if (variables.indexOf(variable) === -1) variables.push(variable);
			}
			return variables;
		}
		/**
		* Resolves a variable with the given name at the specified line
		* to its value. If null is returned, then the variable has been
		* defined but no value was given. If undefined is returned, then
		* a variable with the given name has not been defined yet as of
		* the given line.
		*
		* @param variable the name of the variable to resolve
		* @param line the line number that the variable is on, zero-based
		* @return the value of the variable as defined by an ARG or ENV
		*         instruction, or null if no value has been specified, or
		*         undefined if a variable with the given name has not
		*         been defined
		*/
		resolveVariable(variable, line) {
			let envs = this.getENVs();
			for (let i = envs.length - 1; i >= 0; i--) if (envs[i].isBefore(line)) {
				for (let property of envs[i].getProperties()) if (property.getName() === variable) return property.getValue();
			}
			let args = this.getARGs();
			for (let i = args.length - 1; i >= 0; i--) if (args[i].isBefore(line)) {
				let property = args[i].getProperty();
				if (property && property.getName() === variable) return property.getValue();
			}
		}
		getRange() {
			const instructions = this.getInstructions();
			if (instructions.length === 0) return vscode_languageserver_types_1.Range.create(0, 0, 0, 0);
			const instructionStart = instructions[0].getRange().start;
			const instructionEnd = instructions[instructions.length - 1].getRange().end;
			return vscode_languageserver_types_1.Range.create(instructionStart, instructionEnd);
		}
		contains(position) {
			const range = this.getRange();
			if (range === null) return false;
			return util_1.Util.isInsideRange(position, range);
		}
	};
	exports.ImageTemplate = ImageTemplate;
}));
//#endregion
//#region ../../node_modules/dockerfile-ast/lib/dockerfile.js
var require_dockerfile = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Dockerfile = void 0;
	var vscode_languageserver_types_1 = require_main$1();
	var ast = require_main();
	var imageTemplate_1 = require_imageTemplate();
	var from_1 = require_from();
	var util_1 = require_util();
	var main_1 = require_main();
	var Dockerfile = class extends imageTemplate_1.ImageTemplate {
		constructor(document) {
			super();
			this.initialInstructions = new imageTemplate_1.ImageTemplate();
			this.buildStages = [];
			this.directives = [];
			/**
			* Whether a FROM instruction has been added to this Dockerfile or not.
			*/
			this.foundFrom = false;
			this.document = document;
		}
		getEscapeCharacter() {
			for (const directive of this.directives) if (directive.getDirective() === ast.Directive.escape) {
				const value = directive.getValue();
				if (value === "\\" || value === "`") return value;
			}
			return "\\";
		}
		getInitialARGs() {
			return this.initialInstructions.getARGs();
		}
		getContainingImage(position) {
			let range = vscode_languageserver_types_1.Range.create(vscode_languageserver_types_1.Position.create(0, 0), this.document.positionAt(this.document.getText().length));
			if (!util_1.Util.isInsideRange(position, range)) return null;
			if (this.initialInstructions.getComments().length > 0 || this.initialInstructions.getInstructions().length > 0) {
				if (util_1.Util.isInsideRange(position, this.initialInstructions.getRange())) return this.initialInstructions;
			}
			for (const buildStage of this.buildStages) if (util_1.Util.isInsideRange(position, buildStage.getRange())) return buildStage;
			return this;
		}
		addInstruction(instruction) {
			if (instruction.getKeyword() === main_1.Keyword.FROM) {
				this.currentBuildStage = new imageTemplate_1.ImageTemplate();
				this.buildStages.push(this.currentBuildStage);
				this.foundFrom = true;
			} else if (!this.foundFrom) this.initialInstructions.addInstruction(instruction);
			if (this.foundFrom) this.currentBuildStage.addInstruction(instruction);
			super.addInstruction(instruction);
		}
		setDirectives(directives) {
			this.directives = directives;
		}
		getDirective() {
			return this.directives.length === 0 ? null : this.directives[0];
		}
		getDirectives() {
			return this.directives;
		}
		resolveVariable(variable, line) {
			for (let from of this.getFROMs()) {
				let range = from.getRange();
				if (range.start.line <= line && line <= range.end.line) {
					let initialARGs = new imageTemplate_1.ImageTemplate();
					for (let instruction of this.initialInstructions.getARGs()) initialARGs.addInstruction(instruction);
					return initialARGs.resolveVariable(variable, line);
				}
			}
			let image = this.getContainingImage(vscode_languageserver_types_1.Position.create(line, 0));
			if (image === null) return;
			let resolvedVariable = image.resolveVariable(variable, line);
			if (resolvedVariable === null) {
				let initialARGs = new imageTemplate_1.ImageTemplate();
				for (let instruction of this.initialInstructions.getARGs()) initialARGs.addInstruction(instruction);
				return initialARGs.resolveVariable(variable, line);
			}
			return resolvedVariable;
		}
		getAvailableVariables(currentLine) {
			if (this.getInstructionAt(currentLine) instanceof from_1.From) {
				let variables = [];
				for (let arg of this.getInitialARGs()) {
					let property = arg.getProperty();
					if (property) variables.push(property.getName());
				}
				return variables;
			}
			let image = this.getContainingImage(vscode_languageserver_types_1.Position.create(currentLine, 0));
			return image ? image.getAvailableVariables(currentLine) : [];
		}
		getParentStage(image) {
			const templateFrom = image.getFROM();
			const imageName = templateFrom === null ? null : templateFrom.getImageName();
			if (imageName === null) return null;
			for (const from of this.getFROMs()) if (from.getBuildStage() === imageName) {
				const range = from.getRange();
				if (range.start.line === templateFrom.getRange().start.line) return null;
				return this.getContainingImage(range.start);
			}
			return null;
		}
		getStageHierarchy(line) {
			const image = this.getContainingImage(vscode_languageserver_types_1.Position.create(line, 0));
			if (image === null) return [];
			const stages = [image];
			let stage = this.getParentStage(image);
			while (stage !== null) {
				stages.splice(0, 0, stage);
				stage = this.getParentStage(stage);
			}
			return stages;
		}
		getAvailableWorkingDirectories(line) {
			const availableDirectories = /* @__PURE__ */ new Set();
			for (const image of this.getStageHierarchy(line)) for (const workdir of image.getWORKDIRs()) if (workdir.getRange().end.line < line) {
				let directory = workdir.getAbsolutePath();
				if (directory !== void 0 && directory !== null) {
					if (!directory.endsWith("/")) directory += "/";
					availableDirectories.add(directory);
				}
			}
			return Array.from(availableDirectories);
		}
		/**
		* Internally reorganize the comments in the Dockerfile and allocate
		* them to the relevant build stages that they belong to.
		*/
		organizeComments() {
			const comments = this.getComments();
			for (let i = 0; i < comments.length; i++) if (util_1.Util.isInsideRange(comments[i].getRange().end, this.initialInstructions.getRange())) this.initialInstructions.addComment(comments[i]);
			else for (const buildStage of this.buildStages) if (util_1.Util.isInsideRange(comments[i].getRange().start, buildStage.getRange())) buildStage.addComment(comments[i]);
		}
		getRange() {
			const comments = this.getComments();
			const instructions = this.getInstructions();
			let range = null;
			if (comments.length === 0) {
				if (instructions.length > 0) range = vscode_languageserver_types_1.Range.create(instructions[0].getRange().start, instructions[instructions.length - 1].getRange().end);
			} else if (instructions.length === 0) range = vscode_languageserver_types_1.Range.create(comments[0].getRange().start, comments[comments.length - 1].getRange().end);
			else {
				const commentStart = comments[0].getRange().start;
				const commentEnd = comments[comments.length - 1].getRange().end;
				const instructionStart = instructions[0].getRange().start;
				const instructionEnd = instructions[instructions.length - 1].getRange().end;
				if (commentStart.line < instructionStart.line) {
					if (commentEnd.line < instructionEnd.line) range = vscode_languageserver_types_1.Range.create(commentStart, instructionEnd);
					range = vscode_languageserver_types_1.Range.create(commentStart, commentEnd);
				} else if (commentEnd.line < instructionEnd.line) range = vscode_languageserver_types_1.Range.create(instructionStart, instructionEnd);
				else range = vscode_languageserver_types_1.Range.create(instructionStart, commentEnd);
			}
			if (range === null) {
				if (this.directives.length === 0) return null;
				return this.directives[0].getRange();
			} else if (this.directives.length === 0) return range;
			return vscode_languageserver_types_1.Range.create(this.directives[0].getRange().start, range.end);
		}
	};
	exports.Dockerfile = Dockerfile;
}));
//#endregion
//#region ../../node_modules/dockerfile-ast/lib/parser.js
var require_parser = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Parser = void 0;
	var vscode_languageserver_textdocument_1 = (init_main(), require_chunk.__toCommonJS(main_exports));
	var vscode_languageserver_types_1 = require_main$1();
	var comment_1 = require_comment();
	var parserDirective_1 = require_parserDirective();
	var instruction_1 = require_instruction();
	var add_1 = require_add();
	var arg_1 = require_arg();
	var cmd_1 = require_cmd();
	var copy_1 = require_copy();
	var env_1 = require_env();
	var entrypoint_1 = require_entrypoint();
	var from_1 = require_from();
	var healthcheck_1 = require_healthcheck();
	var label_1 = require_label();
	var onbuild_1 = require_onbuild();
	var run_1 = require_run();
	var shell_1 = require_shell();
	var stopsignal_1 = require_stopsignal();
	var workdir_1 = require_workdir();
	var user_1 = require_user();
	var volume_1 = require_volume();
	var dockerfile_1 = require_dockerfile();
	var util_1 = require_util();
	var main_1 = require_main();
	exports.Parser = class Parser {
		constructor() {
			this.escapeChar = null;
		}
		static createInstruction(document, dockerfile, escapeChar, lineRange, instruction, instructionRange) {
			switch (instruction.toUpperCase()) {
				case "ADD": return new add_1.Add(document, lineRange, dockerfile, escapeChar, instruction, instructionRange);
				case "ARG": return new arg_1.Arg(document, lineRange, dockerfile, escapeChar, instruction, instructionRange);
				case "CMD": return new cmd_1.Cmd(document, lineRange, dockerfile, escapeChar, instruction, instructionRange);
				case "COPY": return new copy_1.Copy(document, lineRange, dockerfile, escapeChar, instruction, instructionRange);
				case "ENTRYPOINT": return new entrypoint_1.Entrypoint(document, lineRange, dockerfile, escapeChar, instruction, instructionRange);
				case "ENV": return new env_1.Env(document, lineRange, dockerfile, escapeChar, instruction, instructionRange);
				case "FROM": return new from_1.From(document, lineRange, dockerfile, escapeChar, instruction, instructionRange);
				case "HEALTHCHECK": return new healthcheck_1.Healthcheck(document, lineRange, dockerfile, escapeChar, instruction, instructionRange);
				case "LABEL": return new label_1.Label(document, lineRange, dockerfile, escapeChar, instruction, instructionRange);
				case "ONBUILD": return new onbuild_1.Onbuild(document, lineRange, dockerfile, escapeChar, instruction, instructionRange);
				case "RUN": return new run_1.Run(document, lineRange, dockerfile, escapeChar, instruction, instructionRange);
				case "SHELL": return new shell_1.Shell(document, lineRange, dockerfile, escapeChar, instruction, instructionRange);
				case "STOPSIGNAL": return new stopsignal_1.Stopsignal(document, lineRange, dockerfile, escapeChar, instruction, instructionRange);
				case "WORKDIR": return new workdir_1.Workdir(document, lineRange, dockerfile, escapeChar, instruction, instructionRange);
				case "USER": return new user_1.User(document, lineRange, dockerfile, escapeChar, instruction, instructionRange);
				case "VOLUME": return new volume_1.Volume(document, lineRange, dockerfile, escapeChar, instruction, instructionRange);
			}
			return new instruction_1.Instruction(document, lineRange, dockerfile, escapeChar, instruction, instructionRange);
		}
		getParserDirectives(document, buffer) {
			const directives = [];
			this.escapeChar = "";
			const offset = util_1.Util.isUTF8BOM(buffer.substring(0, 1)) ? 1 : 0;
			directiveCheck: for (let i = offset; i < buffer.length; i++) switch (buffer.charAt(i)) {
				case " ":
				case "	": break;
				case "\r":
				case "\n": break directiveCheck;
				case "#":
					let directiveStart = -1;
					let directiveEnd = -1;
					for (let j = i + 1; j < buffer.length; j++) {
						let char = buffer.charAt(j);
						switch (char) {
							case " ":
							case "	":
								if (directiveStart !== -1 && directiveEnd === -1) directiveEnd = j;
								break;
							case "\r":
							case "\n": break directiveCheck;
							case "=":
								let valueStart = -1;
								let valueEnd = -1;
								if (directiveEnd === -1) directiveEnd = j;
								let lineEnd = buffer.length;
								directiveValue: for (let k = j + 1; k < buffer.length; k++) {
									char = buffer.charAt(k);
									switch (char) {
										case "\r":
										case "\n":
											if (valueStart !== -1 && valueEnd === -1) valueEnd = k;
											lineEnd = k;
											break directiveValue;
										case "	":
										case " ":
											if (valueStart !== -1 && valueEnd === -1) valueEnd = k;
											continue;
										default:
											if (valueStart === -1) valueStart = k;
											break;
									}
								}
								if (directiveStart === -1) break directiveCheck;
								if (valueStart === -1) {
									valueStart = j + 1;
									valueEnd = lineEnd;
								} else if (valueEnd === -1) valueEnd = buffer.length;
								const lineRange = vscode_languageserver_types_1.Range.create(document.positionAt(i), document.positionAt(lineEnd));
								const nameRange = vscode_languageserver_types_1.Range.create(document.positionAt(directiveStart), document.positionAt(directiveEnd));
								const valueRange = vscode_languageserver_types_1.Range.create(document.positionAt(valueStart), document.positionAt(valueEnd));
								directives.push(new parserDirective_1.ParserDirective(document, lineRange, nameRange, valueRange));
								directiveStart = -1;
								if (buffer.charAt(valueEnd) === "\r") i = valueEnd + 1;
								else i = valueEnd;
								continue directiveCheck;
							default:
								if (directiveStart === -1) directiveStart = j;
								break;
						}
					}
					break;
				default: break directiveCheck;
			}
			return directives;
		}
		parse(buffer) {
			this.document = vscode_languageserver_textdocument_1.TextDocument.create("", "", 0, buffer);
			this.buffer = buffer;
			let dockerfile = new dockerfile_1.Dockerfile(this.document);
			let directives = this.getParserDirectives(this.document, this.buffer);
			let offset = 0;
			this.escapeChar = "\\";
			if (directives.length > 0) {
				dockerfile.setDirectives(directives);
				this.escapeChar = dockerfile.getEscapeCharacter();
				offset = this.document.offsetAt(vscode_languageserver_types_1.Position.create(directives.length, 0));
			} else if (util_1.Util.isUTF8BOM(buffer.substring(0, 1))) offset = 1;
			for (let i = offset; i < this.buffer.length; i++) {
				const char = this.buffer.charAt(i);
				switch (char) {
					case " ":
					case "	":
					case "\r":
					case "\n": break;
					case "#":
						i = this.processComment(dockerfile, i);
						break;
					default:
						i = this.processInstruction(dockerfile, char, i);
						break;
				}
			}
			dockerfile.organizeComments();
			return dockerfile;
		}
		processInstruction(dockerfile, char, start) {
			let instruction = char;
			let instructionEnd = -1;
			let escapedInstruction = false;
			instructionCheck: for (let i = start + 1; i < this.buffer.length; i++) {
				char = this.buffer.charAt(i);
				switch (char) {
					case this.escapeChar:
						escapedInstruction = true;
						char = this.buffer.charAt(i + 1);
						if (char === "\r" || char === "\n") {
							if (instructionEnd === -1) instructionEnd = i;
							i++;
						} else if (char === " " || char === "	") {
							for (let j = i + 2; j < this.buffer.length; j++) switch (this.buffer.charAt(j)) {
								case " ":
								case "	": break;
								case "\r":
								case "\n":
									i = j;
									continue instructionCheck;
								default:
									instructionEnd = i + 1;
									instruction = instruction + this.escapeChar;
									i = j - 2;
									continue instructionCheck;
							}
							instructionEnd = i + 1;
							instruction = instruction + this.escapeChar;
							break instructionCheck;
						} else {
							instructionEnd = i + 1;
							instruction = instruction + this.escapeChar;
							escapedInstruction = false;
						}
						break;
					case " ":
					case "	":
						if (escapedInstruction) {
							escapeCheck: for (let j = i + 1; j < this.buffer.length; j++) switch (this.buffer.charAt(j)) {
								case " ":
								case "	": break;
								case "\r":
								case "\n":
									i = j;
									continue instructionCheck;
								default: break escapeCheck;
							}
							escapedInstruction = false;
						}
						if (instructionEnd === -1) instructionEnd = i;
						i = this.processArguments(dockerfile, instruction, instructionEnd, start, i);
						dockerfile.addInstruction(this.createInstruction(dockerfile, instruction, start, instructionEnd, i));
						return i;
					case "\r":
					case "\n":
						if (escapedInstruction) continue;
						if (instructionEnd === -1) instructionEnd = i;
						dockerfile.addInstruction(this.createInstruction(dockerfile, instruction, start, i, i));
						return i;
					case "#": if (escapedInstruction) continue;
					default:
						instructionEnd = i + 1;
						instruction = instruction + char;
						escapedInstruction = false;
						break;
				}
			}
			if (instructionEnd === -1) instructionEnd = this.buffer.length;
			dockerfile.addInstruction(this.createInstruction(dockerfile, instruction, start, instructionEnd, this.buffer.length));
			return this.buffer.length;
		}
		processHeredocs(instruction, offset) {
			let keyword = instruction.getKeyword();
			if (keyword === main_1.Keyword.ONBUILD) {
				instruction = instruction.getTriggerInstruction();
				if (instruction === null) return offset;
				keyword = instruction.getKeyword();
			}
			if (keyword !== main_1.Keyword.ADD && keyword !== main_1.Keyword.COPY && keyword !== main_1.Keyword.RUN) return offset;
			const heredocs = [];
			let tabbed = false;
			for (const arg of instruction.getArguments()) {
				const value = arg.getValue();
				if (value.startsWith("<<") && value.length > 2) {
					if (value.startsWith("<<-")) tabbed = true;
					const name = util_1.Util.parseHeredocName(value);
					if (name !== null) heredocs.push(name);
				}
			}
			if (heredocs.length > 0) for (const heredoc of heredocs) offset = this.parseHeredoc(heredoc, offset, tabbed);
			return offset;
		}
		processArguments(dockerfile, instruction, instructionEnd, start, offset) {
			let escaped = false;
			argumentsCheck: for (let i = offset + 1; i < this.buffer.length; i++) switch (this.buffer.charAt(i)) {
				case "\r":
				case "\n":
					if (escaped) continue;
					return this.processHeredocs(this.createInstruction(dockerfile, instruction, start, instructionEnd, i), i);
				case this.escapeChar:
					const next = this.buffer.charAt(i + 1);
					if (next === "\n" || next === "\r") {
						escaped = true;
						i++;
					} else if (next === " " || next === "	") {
						for (let j = i + 2; j < this.buffer.length; j++) switch (this.buffer.charAt(j)) {
							case " ":
							case "	": break;
							case "\r":
							case "\n": escaped = true;
							default:
								i = j;
								continue argumentsCheck;
						}
						return this.buffer.length;
					}
					continue;
				case "#":
					if (escaped) {
						i = this.processComment(dockerfile, i);
						continue argumentsCheck;
					}
					break;
				case " ":
				case "	": break;
				default:
					if (escaped) escaped = false;
					break;
			}
			return this.buffer.length;
		}
		processComment(dockerfile, start) {
			let end = this.buffer.length;
			commentLoop: for (let i = start + 1; i < this.buffer.length; i++) switch (this.buffer.charAt(i)) {
				case "\r":
				case "\n":
					end = i;
					break commentLoop;
			}
			const range = vscode_languageserver_types_1.Range.create(this.document.positionAt(start), this.document.positionAt(end));
			dockerfile.addComment(new comment_1.Comment(this.document, range));
			return end;
		}
		parseHeredoc(heredocName, offset, tabbed) {
			let startWord = -1;
			let lineStart = true;
			for (let i = offset; i < this.buffer.length; i++) switch (this.buffer.charAt(i)) {
				case " ":
					lineStart = false;
					break;
				case "	":
					if (!tabbed) lineStart = false;
					break;
				case "\r":
				case "\n":
					if (startWord !== -1 && heredocName === this.buffer.substring(startWord, i)) return i;
					startWord = -1;
					lineStart = true;
					break;
				default:
					if (lineStart) {
						startWord = i;
						lineStart = false;
					}
					break;
			}
			return this.buffer.length;
		}
		createInstruction(dockerfile, instruction, start, instructionEnd, end) {
			const startPosition = this.document.positionAt(start);
			const instructionRange = vscode_languageserver_types_1.Range.create(startPosition, this.document.positionAt(instructionEnd));
			const lineRange = vscode_languageserver_types_1.Range.create(startPosition, this.document.positionAt(end));
			return Parser.createInstruction(this.document, dockerfile, this.escapeChar, lineRange, instruction, instructionRange);
		}
	};
}));
//#endregion
//#region ../../node_modules/dockerfile-ast/lib/main.js
var require_main = /* @__PURE__ */ require_chunk.__commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.DockerfileParser = exports.DefaultVariables = exports.Directive = exports.Keyword = exports.Workdir = exports.Volume = exports.User = exports.Stopsignal = exports.Shell = exports.Run = exports.PropertyInstruction = exports.Onbuild = exports.ModifiableInstruction = exports.Label = exports.JSONInstruction = exports.Heredoc = exports.Healthcheck = exports.From = exports.Env = exports.Entrypoint = exports.Copy = exports.Cmd = exports.Arg = exports.Add = exports.Variable = exports.Property = exports.ParserDirective = exports.Line = exports.Instruction = exports.Flag = exports.Comment = exports.JSONArgument = exports.Argument = void 0;
	var argument_1 = require_argument();
	Object.defineProperty(exports, "Argument", {
		enumerable: true,
		get: function() {
			return argument_1.Argument;
		}
	});
	var jsonArgument_1 = require_jsonArgument();
	Object.defineProperty(exports, "JSONArgument", {
		enumerable: true,
		get: function() {
			return jsonArgument_1.JSONArgument;
		}
	});
	var comment_1 = require_comment();
	Object.defineProperty(exports, "Comment", {
		enumerable: true,
		get: function() {
			return comment_1.Comment;
		}
	});
	var parser_1 = require_parser();
	var flag_1 = require_flag();
	Object.defineProperty(exports, "Flag", {
		enumerable: true,
		get: function() {
			return flag_1.Flag;
		}
	});
	var instruction_1 = require_instruction();
	Object.defineProperty(exports, "Instruction", {
		enumerable: true,
		get: function() {
			return instruction_1.Instruction;
		}
	});
	var line_1 = require_line();
	Object.defineProperty(exports, "Line", {
		enumerable: true,
		get: function() {
			return line_1.Line;
		}
	});
	var parserDirective_1 = require_parserDirective();
	Object.defineProperty(exports, "ParserDirective", {
		enumerable: true,
		get: function() {
			return parserDirective_1.ParserDirective;
		}
	});
	var property_1 = require_property();
	Object.defineProperty(exports, "Property", {
		enumerable: true,
		get: function() {
			return property_1.Property;
		}
	});
	var variable_1 = require_variable();
	Object.defineProperty(exports, "Variable", {
		enumerable: true,
		get: function() {
			return variable_1.Variable;
		}
	});
	var add_1 = require_add();
	Object.defineProperty(exports, "Add", {
		enumerable: true,
		get: function() {
			return add_1.Add;
		}
	});
	var arg_1 = require_arg();
	Object.defineProperty(exports, "Arg", {
		enumerable: true,
		get: function() {
			return arg_1.Arg;
		}
	});
	var cmd_1 = require_cmd();
	Object.defineProperty(exports, "Cmd", {
		enumerable: true,
		get: function() {
			return cmd_1.Cmd;
		}
	});
	var copy_1 = require_copy();
	Object.defineProperty(exports, "Copy", {
		enumerable: true,
		get: function() {
			return copy_1.Copy;
		}
	});
	var entrypoint_1 = require_entrypoint();
	Object.defineProperty(exports, "Entrypoint", {
		enumerable: true,
		get: function() {
			return entrypoint_1.Entrypoint;
		}
	});
	var env_1 = require_env();
	Object.defineProperty(exports, "Env", {
		enumerable: true,
		get: function() {
			return env_1.Env;
		}
	});
	var from_1 = require_from();
	Object.defineProperty(exports, "From", {
		enumerable: true,
		get: function() {
			return from_1.From;
		}
	});
	var healthcheck_1 = require_healthcheck();
	Object.defineProperty(exports, "Healthcheck", {
		enumerable: true,
		get: function() {
			return healthcheck_1.Healthcheck;
		}
	});
	var heredoc_1 = require_heredoc();
	Object.defineProperty(exports, "Heredoc", {
		enumerable: true,
		get: function() {
			return heredoc_1.Heredoc;
		}
	});
	var jsonInstruction_1 = require_jsonInstruction();
	Object.defineProperty(exports, "JSONInstruction", {
		enumerable: true,
		get: function() {
			return jsonInstruction_1.JSONInstruction;
		}
	});
	var label_1 = require_label();
	Object.defineProperty(exports, "Label", {
		enumerable: true,
		get: function() {
			return label_1.Label;
		}
	});
	var modifiableInstruction_1 = require_modifiableInstruction();
	Object.defineProperty(exports, "ModifiableInstruction", {
		enumerable: true,
		get: function() {
			return modifiableInstruction_1.ModifiableInstruction;
		}
	});
	var onbuild_1 = require_onbuild();
	Object.defineProperty(exports, "Onbuild", {
		enumerable: true,
		get: function() {
			return onbuild_1.Onbuild;
		}
	});
	var propertyInstruction_1 = require_propertyInstruction();
	Object.defineProperty(exports, "PropertyInstruction", {
		enumerable: true,
		get: function() {
			return propertyInstruction_1.PropertyInstruction;
		}
	});
	var run_1 = require_run();
	Object.defineProperty(exports, "Run", {
		enumerable: true,
		get: function() {
			return run_1.Run;
		}
	});
	var shell_1 = require_shell();
	Object.defineProperty(exports, "Shell", {
		enumerable: true,
		get: function() {
			return shell_1.Shell;
		}
	});
	var stopsignal_1 = require_stopsignal();
	Object.defineProperty(exports, "Stopsignal", {
		enumerable: true,
		get: function() {
			return stopsignal_1.Stopsignal;
		}
	});
	var user_1 = require_user();
	Object.defineProperty(exports, "User", {
		enumerable: true,
		get: function() {
			return user_1.User;
		}
	});
	var volume_1 = require_volume();
	Object.defineProperty(exports, "Volume", {
		enumerable: true,
		get: function() {
			return volume_1.Volume;
		}
	});
	var workdir_1 = require_workdir();
	Object.defineProperty(exports, "Workdir", {
		enumerable: true,
		get: function() {
			return workdir_1.Workdir;
		}
	});
	var Keyword;
	(function(Keyword) {
		Keyword["ADD"] = "ADD";
		Keyword["ARG"] = "ARG";
		Keyword["CMD"] = "CMD";
		Keyword["COPY"] = "COPY";
		Keyword["ENTRYPOINT"] = "ENTRYPOINT";
		Keyword["ENV"] = "ENV";
		Keyword["EXPOSE"] = "EXPOSE";
		Keyword["FROM"] = "FROM";
		Keyword["HEALTHCHECK"] = "HEALTHCHECK";
		Keyword["LABEL"] = "LABEL";
		Keyword["MAINTAINER"] = "MAINTAINER";
		Keyword["ONBUILD"] = "ONBUILD";
		Keyword["RUN"] = "RUN";
		Keyword["SHELL"] = "SHELL";
		Keyword["STOPSIGNAL"] = "STOPSIGNAL";
		Keyword["USER"] = "USER";
		Keyword["VOLUME"] = "VOLUME";
		Keyword["WORKDIR"] = "WORKDIR";
	})(Keyword || (exports.Keyword = Keyword = {}));
	var Directive;
	(function(Directive) {
		Directive["escape"] = "escape";
		Directive["syntax"] = "syntax";
	})(Directive || (exports.Directive = Directive = {}));
	exports.DefaultVariables = [
		"ALL_PROXY",
		"all_proxy",
		"FTP_PROXY",
		"ftp_proxy",
		"HTTP_PROXY",
		"http_proxy",
		"HTTPS_PROXY",
		"https_proxy",
		"NO_PROXY",
		"no_proxy"
	];
	var DockerfileParser;
	(function(DockerfileParser) {
		function parse(content) {
			return new parser_1.Parser().parse(content);
		}
		DockerfileParser.parse = parse;
	})(DockerfileParser || (exports.DockerfileParser = DockerfileParser = {}));
}));
//#endregion
//#region ../../packages/agent-provider/node_modules/e2b/dist/index.mjs
var import_main = require_main();
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __knownSymbol = (name, symbol) => (symbol = Symbol[name]) ? symbol : Symbol.for("Symbol." + name);
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {
	enumerable: true,
	configurable: true,
	writable: true,
	value
}) : obj[key] = value;
var __spreadValues = (a, b) => {
	for (var prop in b || (b = {})) if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
	if (__getOwnPropSymbols) {
		for (var prop of __getOwnPropSymbols(b)) if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
	}
	return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, { get: (a, b) => (typeof require !== "undefined" ? require : a)[b] }) : x)(function(x) {
	if (typeof require !== "undefined") return require.apply(this, arguments);
	throw Error("Dynamic require of \"" + x + "\" is not supported");
});
var __await = function(promise, isYieldStar) {
	this[0] = promise;
	this[1] = isYieldStar;
};
var __asyncGenerator = (__this, __arguments, generator) => {
	var resume = (k, v, yes, no) => {
		try {
			var x = generator[k](v), isAwait = (v = x.value) instanceof __await, done = x.done;
			Promise.resolve(isAwait ? v[0] : v).then((y) => isAwait ? resume(k === "return" ? k : "next", v[1] ? {
				done: y.done,
				value: y.value
			} : y, yes, no) : yes({
				value: y,
				done
			})).catch((e) => resume("throw", e, yes, no));
		} catch (e) {
			no(e);
		}
	}, method = (k) => it[k] = (x) => new Promise((yes, no) => resume(k, x, yes, no)), it = {};
	return generator = generator.apply(__this, __arguments), it[__knownSymbol("asyncIterator")] = () => it, method("next"), method("throw"), method("return"), it;
};
var __forAwait = (obj, it, method) => (it = obj[__knownSymbol("asyncIterator")]) ? it.call(obj) : (obj = obj[__knownSymbol("iterator")](), it = {}, method = (key, fn) => (fn = obj[key]) && (it[key] = (arg) => new Promise((yes, no, done) => (arg = fn.call(obj, arg), done = arg.done, Promise.resolve(arg.value).then((value) => yes({
	value,
	done
}), no)))), method("next"), method("return"), it);
var version = "2.10.2";
function getRuntime() {
	var _a3, _b, _c;
	if (globalThis.Bun) return {
		runtime: "bun",
		version: globalThis.Bun.version
	};
	if (globalThis.Deno) return {
		runtime: "deno",
		version: globalThis.Deno.version.deno
	};
	if (((_b = (_a3 = globalThis.process) == null ? void 0 : _a3.release) == null ? void 0 : _b.name) === "node") return {
		runtime: "node",
		version: import_platform.default.version || "unknown"
	};
	if (typeof EdgeRuntime === "string") return {
		runtime: "vercel-edge",
		version: "unknown"
	};
	if (((_c = globalThis.navigator) == null ? void 0 : _c.userAgent) === "Cloudflare-Workers") return {
		runtime: "cloudflare-worker",
		version: "unknown"
	};
	if (typeof window !== "undefined") return {
		runtime: "browser",
		version: import_platform.default.version || "unknown"
	};
	return {
		runtime: "unknown",
		version: "unknown"
	};
}
var { runtime, version: runtimeVersion } = getRuntime();
async function sha256(data) {
	if (typeof crypto !== "undefined") {
		const dataBuffer = new TextEncoder().encode(data);
		const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer);
		const hashArray = new Uint8Array(hashBuffer);
		return btoa(String.fromCharCode(...hashArray));
	}
	const { createHash } = __require("node:crypto");
	return createHash("sha256").update(data, "utf8").digest().toString("base64");
}
function timeoutToSeconds(timeout) {
	return Math.ceil(timeout / 1e3);
}
function dynamicRequire(module) {
	if (runtime === "browser") throw new Error("Browser runtime is not supported for require");
	return __require(module);
}
async function dynamicImport(module) {
	if (runtime === "browser") throw new Error("Browser runtime is not supported for dynamic import");
	return await import(module);
}
function ansiRegex({ onlyFirst = false } = {}) {
	return new RegExp(`(?:\\u001B\\][\\s\\S]*?(?:\\u0007|\\u001B\\u005C|\\u009C))|[\\u001B\\u009B][[\\]()#;?]*(?:\\d{1,4}(?:[;:]\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]`, onlyFirst ? void 0 : "g");
}
function stripAnsi(text) {
	return text.replace(ansiRegex(), "");
}
var _a;
var defaultHeaders = {
	browser: typeof window !== "undefined" && import_platform.default.name || "unknown",
	lang: "js",
	lang_version: runtimeVersion,
	package_version: version,
	publisher: "e2b",
	sdk_runtime: runtime,
	system: ((_a = import_platform.default.os) == null ? void 0 : _a.family) || "unknown"
};
function getEnvVar(name) {
	if (runtime === "deno") return Deno.env.get(name);
	if (typeof process === "undefined") return "";
	return process.env[name];
}
function formatSandboxTimeoutError(message) {
	return new TimeoutError(`${message}: This error is likely due to sandbox timeout. You can modify the sandbox timeout by passing 'timeoutMs' when starting the sandbox or calling '.setTimeout' on the sandbox with the desired timeout.`);
}
var SandboxError = class extends Error {
	constructor(message, stackTrace) {
		super(message);
		this.name = "SandboxError";
		if (stackTrace) this.stack = stackTrace;
	}
};
var TimeoutError = class extends SandboxError {
	constructor(message, stackTrace) {
		super(message, stackTrace);
		this.name = "TimeoutError";
	}
};
var InvalidArgumentError = class extends SandboxError {
	constructor(message, stackTrace) {
		super(message, stackTrace);
		this.name = "InvalidArgumentError";
	}
};
var NotEnoughSpaceError = class extends SandboxError {
	constructor(message, stackTrace) {
		super(message, stackTrace);
		this.name = "NotEnoughSpaceError";
	}
};
var NotFoundError = class extends SandboxError {
	constructor(message, stackTrace) {
		super(message, stackTrace);
		this.name = "NotFoundError";
	}
};
var AuthenticationError = class extends Error {
	constructor(message) {
		super(message);
		this.name = "AuthenticationError";
	}
};
var TemplateError = class extends SandboxError {
	constructor(message, stackTrace) {
		super(message, stackTrace);
		this.name = "TemplateError";
	}
};
var RateLimitError = class extends SandboxError {
	constructor(message) {
		super(message);
		this.name = "RateLimitError";
	}
};
var BuildError = class extends Error {
	constructor(message, stackTrace) {
		super(message);
		this.name = "BuildError";
		if (stackTrace) this.stack = stackTrace;
	}
};
var FileUploadError = class extends BuildError {
	constructor(message, stackTrace) {
		super(message, stackTrace);
		this.name = "FileUploadError";
	}
};
function formatLog(log) {
	return JSON.parse(JSON.stringify(log));
}
function createRpcLogger(logger) {
	function logEach(stream) {
		return __asyncGenerator(this, null, function* () {
			var _a3;
			try {
				for (var iter = __forAwait(stream), more, temp, error; more = !(temp = yield new __await(iter.next())).done; more = false) {
					const m = temp.value;
					(_a3 = logger.debug) == null || _a3.call(logger, "Response stream:", formatLog(m));
					yield m;
				}
			} catch (temp) {
				error = [temp];
			} finally {
				try {
					more && (temp = iter.return) && (yield new __await(temp.call(iter)));
				} finally {
					if (error) throw error[0];
				}
			}
		});
	}
	return (next) => async (req) => {
		var _a3, _b;
		(_a3 = logger.info) == null || _a3.call(logger, `Request: POST ${req.url}`);
		const res = await next(req);
		if (res.stream) return __spreadProps(__spreadValues({}, res), { message: logEach(res.message) });
		else (_b = logger.info) == null || _b.call(logger, "Response:", formatLog(res.message));
		return res;
	};
}
function createApiLogger(logger) {
	return {
		async onRequest({ request }) {
			var _a3;
			(_a3 = logger.info) == null || _a3.call(logger, `Request ${request.method} ${request.url}`);
			return request;
		},
		async onResponse({ response }) {
			var _a3, _b;
			if (response.status >= 400) (_a3 = logger.error) == null || _a3.call(logger, "Response:", response.status, response.statusText);
			else (_b = logger.info) == null || _b.call(logger, "Response:", response.status, response.statusText);
			return response;
		}
	};
}
function handleApiError(response, errorClass = SandboxError, stackTrace) {
	var _a3, _b, _c, _d, _e, _f;
	if (!response.error) return;
	if (response.response.status === 401) {
		const message2 = "Unauthorized, please check your credentials.";
		const content = (_b = (_a3 = response.error) == null ? void 0 : _a3.message) != null ? _b : response.error;
		if (content) return new AuthenticationError(`${message2} - ${content}`);
		return new AuthenticationError(message2);
	}
	if (response.response.status === 429) {
		const message2 = "Rate limit exceeded, please try again later";
		const content = (_d = (_c = response.error) == null ? void 0 : _c.message) != null ? _d : response.error;
		if (content) return new RateLimitError(`${message2} - ${content}`);
		return new RateLimitError(message2);
	}
	const message = (_f = (_e = response.error) == null ? void 0 : _e.message) != null ? _f : response.error;
	return new errorClass(`${response.response.status}: ${message}`, stackTrace);
}
var ApiClient = class {
	constructor(config, opts = {
		requireAccessToken: false,
		requireApiKey: false
	}) {
		if ((opts == null ? void 0 : opts.requireApiKey) && !config.apiKey) throw new AuthenticationError("API key is required, please visit the Team tab at https://e2b.dev/dashboard to get your API key. You can either set the environment variable `E2B_API_KEY` or you can pass it directly to the sandbox like Sandbox.create({ apiKey: 'e2b_...' })");
		if ((opts == null ? void 0 : opts.requireAccessToken) && !config.accessToken) throw new AuthenticationError("Access token is required, please visit the Personal tab at https://e2b.dev/dashboard to get your access token. You can set the environment variable `E2B_ACCESS_TOKEN` or pass the `accessToken` in options.");
		this.api = createClient$1({
			baseUrl: config.apiUrl,
			headers: __spreadValues(__spreadValues(__spreadValues(__spreadValues({}, defaultHeaders), config.apiKey && { "X-API-KEY": config.apiKey }), config.accessToken && { Authorization: `Bearer ${config.accessToken}` }), config.headers),
			querySerializer: { array: {
				style: "form",
				explode: false
			} }
		});
		if (config.logger) this.api.use(createApiLogger(config.logger));
	}
};
var REQUEST_TIMEOUT_MS = 6e4;
var DEFAULT_SANDBOX_TIMEOUT_MS = 3e5;
var KEEPALIVE_PING_INTERVAL_SEC = 50;
var KEEPALIVE_PING_HEADER = "Keepalive-Ping-Interval";
var _ConnectionConfig = class _ConnectionConfig {
	constructor(opts) {
		var _a3;
		this.apiKey = (opts == null ? void 0 : opts.apiKey) || _ConnectionConfig.apiKey;
		this.debug = (opts == null ? void 0 : opts.debug) || _ConnectionConfig.debug;
		this.domain = (opts == null ? void 0 : opts.domain) || _ConnectionConfig.domain;
		this.accessToken = (opts == null ? void 0 : opts.accessToken) || _ConnectionConfig.accessToken;
		this.requestTimeoutMs = (_a3 = opts == null ? void 0 : opts.requestTimeoutMs) != null ? _a3 : REQUEST_TIMEOUT_MS;
		this.logger = opts == null ? void 0 : opts.logger;
		this.headers = (opts == null ? void 0 : opts.headers) || {};
		this.apiUrl = (opts == null ? void 0 : opts.apiUrl) || _ConnectionConfig.apiUrl || (this.debug ? "http://localhost:3000" : `https://api.${this.domain}`);
		this.sandboxUrl = (opts == null ? void 0 : opts.sandboxUrl) || _ConnectionConfig.sandboxUrl;
	}
	static get domain() {
		return getEnvVar("E2B_DOMAIN") || "e2b.app";
	}
	static get apiUrl() {
		return getEnvVar("E2B_API_URL");
	}
	static get sandboxUrl() {
		return getEnvVar("E2B_SANDBOX_URL");
	}
	static get debug() {
		return (getEnvVar("E2B_DEBUG") || "false").toLowerCase() === "true";
	}
	static get apiKey() {
		return getEnvVar("E2B_API_KEY");
	}
	static get accessToken() {
		return getEnvVar("E2B_ACCESS_TOKEN");
	}
	getSignal(requestTimeoutMs) {
		const timeout = requestTimeoutMs != null ? requestTimeoutMs : this.requestTimeoutMs;
		return timeout ? AbortSignal.timeout(timeout) : void 0;
	}
	getSandboxUrl(sandboxId, opts) {
		if (this.sandboxUrl) return this.sandboxUrl;
		return `${this.debug ? "http" : "https"}://${this.getHost(sandboxId, opts.envdPort, opts.sandboxDomain)}`;
	}
	getHost(sandboxId, port, sandboxDomain) {
		if (this.debug) return `localhost:${port}`;
		return `${port}-${sandboxId}.${sandboxDomain != null ? sandboxDomain : this.domain}`;
	}
};
_ConnectionConfig.envdPort = 49983;
var ConnectionConfig = _ConnectionConfig;
var defaultUsername = "user";
async function getSignature({ path: path2, operation, user, expirationInSeconds, envdAccessToken }) {
	if (!envdAccessToken) throw new Error("Access token is not set and signature cannot be generated!");
	const signatureExpiration = expirationInSeconds ? Math.floor(Date.now() / 1e3) + expirationInSeconds : null;
	let signatureRaw;
	if (user == void 0) user = "";
	if (signatureExpiration === null) signatureRaw = `${path2}:${operation}:${user}:${envdAccessToken}`;
	else signatureRaw = `${path2}:${operation}:${user}:${envdAccessToken}:${signatureExpiration.toString()}`;
	return {
		signature: "v1_" + (await sha256(signatureRaw)).replace(/=+$/, ""),
		expiration: signatureExpiration
	};
}
async function handleEnvdApiError(res) {
	var _a3;
	if (!res.error) return;
	const message = typeof res.error == "string" ? res.error : ((_a3 = res.error) == null ? void 0 : _a3.message) || await res.response.text();
	switch (res.response.status) {
		case 400: return new InvalidArgumentError(message);
		case 401: return new AuthenticationError(message);
		case 404: return new NotFoundError(message);
		case 429: return new SandboxError(`${res.response.status}: ${message}: The requests are being rate limited.`);
		case 502: return formatSandboxTimeoutError(message);
		case 507: return new NotEnoughSpaceError(message);
		default: return new SandboxError(`${res.response.status}: ${message}`);
	}
}
async function handleProcessStartEvent(events) {
	var _a3;
	let startEvent;
	try {
		startEvent = (await events[Symbol.asyncIterator]().next()).value;
	} catch (err) {
		if (err instanceof ConnectError) {
			if (err.code === Code.Unavailable) throw new NotFoundError("Sandbox is probably not running anymore");
		}
		throw err;
	}
	if (((_a3 = startEvent.event) == null ? void 0 : _a3.event.case) !== "start") throw new Error("Expected start event");
	return startEvent.event.event.value.pid;
}
async function handleWatchDirStartEvent(events) {
	var _a3;
	let startEvent;
	try {
		startEvent = (await events[Symbol.asyncIterator]().next()).value;
	} catch (err) {
		if (err instanceof ConnectError) {
			if (err.code === Code.Unavailable) throw new NotFoundError("Sandbox is probably not running anymore");
		}
		throw err;
	}
	if (((_a3 = startEvent.event) == null ? void 0 : _a3.case) !== "start") throw new Error("Expected start event");
	return startEvent.event.value;
}
var EnvdApiClient = class {
	constructor(config, metadata) {
		this.api = createClient$1({
			baseUrl: config.apiUrl,
			fetch: config == null ? void 0 : config.fetch,
			headers: config == null ? void 0 : config.headers
		});
		this.version = metadata.version;
		if (config.logger) this.api.use(createApiLogger(config.logger));
	}
};
var ENVD_VERSION_RECURSIVE_WATCH = "0.1.4";
var ENVD_DEBUG_FALLBACK = "99.99.99";
var ENVD_COMMANDS_STDIN = "0.3.0";
var ENVD_DEFAULT_USER = "0.4.0";
function handleRpcError(err) {
	if (err instanceof ConnectError) switch (err.code) {
		case Code.InvalidArgument: return new InvalidArgumentError(err.message);
		case Code.Unauthenticated: return new AuthenticationError(err.message);
		case Code.NotFound: return new NotFoundError(err.message);
		case Code.Unavailable: return formatSandboxTimeoutError(err.message);
		case Code.Canceled: return new TimeoutError(`${err.message}: This error is likely due to exceeding 'requestTimeoutMs'. You can pass the request timeout value as an option when making the request.`);
		case Code.DeadlineExceeded: return new TimeoutError(`${err.message}: This error is likely due to exceeding 'timeoutMs' \u2014 the total time a long running request (like command execution or directory watch) can be active. It can be modified by passing 'timeoutMs' when making the request. Use '0' to disable the timeout.`);
		default: return new SandboxError(`${err.code}: ${err.message}`);
	}
	return err;
}
function encode64(value) {
	switch (runtime) {
		case "deno": return btoa(value);
		case "node": return Buffer.from(value).toString("base64");
		case "bun": return Buffer.from(value).toString("base64");
		default: return btoa(value);
	}
}
function authenticationHeader(envdVersion, username) {
	if (username == void 0 && compareVersions(envdVersion, ENVD_DEFAULT_USER) < 0) username = defaultUsername;
	if (!username) return {};
	return { Authorization: `Basic ${encode64(`${username}:`)}` };
}
var Filesystem = /* @__PURE__ */ serviceDesc(/* @__PURE__ */ fileDesc$1("ChtmaWxlc3lzdGVtL2ZpbGVzeXN0ZW0ucHJvdG8SCmZpbGVzeXN0ZW0iMgoLTW92ZVJlcXVlc3QSDgoGc291cmNlGAEgASgJEhMKC2Rlc3RpbmF0aW9uGAIgASgJIjQKDE1vdmVSZXNwb25zZRIkCgVlbnRyeRgBIAEoCzIVLmZpbGVzeXN0ZW0uRW50cnlJbmZvIh4KDk1ha2VEaXJSZXF1ZXN0EgwKBHBhdGgYASABKAkiNwoPTWFrZURpclJlc3BvbnNlEiQKBWVudHJ5GAEgASgLMhUuZmlsZXN5c3RlbS5FbnRyeUluZm8iHQoNUmVtb3ZlUmVxdWVzdBIMCgRwYXRoGAEgASgJIhAKDlJlbW92ZVJlc3BvbnNlIhsKC1N0YXRSZXF1ZXN0EgwKBHBhdGgYASABKAkiNAoMU3RhdFJlc3BvbnNlEiQKBWVudHJ5GAEgASgLMhUuZmlsZXN5c3RlbS5FbnRyeUluZm8i/QEKCUVudHJ5SW5mbxIMCgRuYW1lGAEgASgJEiIKBHR5cGUYAiABKA4yFC5maWxlc3lzdGVtLkZpbGVUeXBlEgwKBHBhdGgYAyABKAkSDAoEc2l6ZRgEIAEoAxIMCgRtb2RlGAUgASgNEhMKC3Blcm1pc3Npb25zGAYgASgJEg0KBW93bmVyGAcgASgJEg0KBWdyb3VwGAggASgJEjEKDW1vZGlmaWVkX3RpbWUYCSABKAsyGi5nb29nbGUucHJvdG9idWYuVGltZXN0YW1wEhsKDnN5bWxpbmtfdGFyZ2V0GAogASgJSACIAQFCEQoPX3N5bWxpbmtfdGFyZ2V0Ii0KDkxpc3REaXJSZXF1ZXN0EgwKBHBhdGgYASABKAkSDQoFZGVwdGgYAiABKA0iOQoPTGlzdERpclJlc3BvbnNlEiYKB2VudHJpZXMYASADKAsyFS5maWxlc3lzdGVtLkVudHJ5SW5mbyIyCg9XYXRjaERpclJlcXVlc3QSDAoEcGF0aBgBIAEoCRIRCglyZWN1cnNpdmUYAiABKAgiRAoPRmlsZXN5c3RlbUV2ZW50EgwKBG5hbWUYASABKAkSIwoEdHlwZRgCIAEoDjIVLmZpbGVzeXN0ZW0uRXZlbnRUeXBlIuABChBXYXRjaERpclJlc3BvbnNlEjgKBXN0YXJ0GAEgASgLMicuZmlsZXN5c3RlbS5XYXRjaERpclJlc3BvbnNlLlN0YXJ0RXZlbnRIABIxCgpmaWxlc3lzdGVtGAIgASgLMhsuZmlsZXN5c3RlbS5GaWxlc3lzdGVtRXZlbnRIABI7CglrZWVwYWxpdmUYAyABKAsyJi5maWxlc3lzdGVtLldhdGNoRGlyUmVzcG9uc2UuS2VlcEFsaXZlSAAaDAoKU3RhcnRFdmVudBoLCglLZWVwQWxpdmVCBwoFZXZlbnQiNwoUQ3JlYXRlV2F0Y2hlclJlcXVlc3QSDAoEcGF0aBgBIAEoCRIRCglyZWN1cnNpdmUYAiABKAgiKwoVQ3JlYXRlV2F0Y2hlclJlc3BvbnNlEhIKCndhdGNoZXJfaWQYASABKAkiLQoXR2V0V2F0Y2hlckV2ZW50c1JlcXVlc3QSEgoKd2F0Y2hlcl9pZBgBIAEoCSJHChhHZXRXYXRjaGVyRXZlbnRzUmVzcG9uc2USKwoGZXZlbnRzGAEgAygLMhsuZmlsZXN5c3RlbS5GaWxlc3lzdGVtRXZlbnQiKgoUUmVtb3ZlV2F0Y2hlclJlcXVlc3QSEgoKd2F0Y2hlcl9pZBgBIAEoCSIXChVSZW1vdmVXYXRjaGVyUmVzcG9uc2UqUgoIRmlsZVR5cGUSGQoVRklMRV9UWVBFX1VOU1BFQ0lGSUVEEAASEgoORklMRV9UWVBFX0ZJTEUQARIXChNGSUxFX1RZUEVfRElSRUNUT1JZEAIqmAEKCUV2ZW50VHlwZRIaChZFVkVOVF9UWVBFX1VOU1BFQ0lGSUVEEAASFQoRRVZFTlRfVFlQRV9DUkVBVEUQARIUChBFVkVOVF9UWVBFX1dSSVRFEAISFQoRRVZFTlRfVFlQRV9SRU1PVkUQAxIVChFFVkVOVF9UWVBFX1JFTkFNRRAEEhQKEEVWRU5UX1RZUEVfQ0hNT0QQBTKfBQoKRmlsZXN5c3RlbRI5CgRTdGF0EhcuZmlsZXN5c3RlbS5TdGF0UmVxdWVzdBoYLmZpbGVzeXN0ZW0uU3RhdFJlc3BvbnNlEkIKB01ha2VEaXISGi5maWxlc3lzdGVtLk1ha2VEaXJSZXF1ZXN0GhsuZmlsZXN5c3RlbS5NYWtlRGlyUmVzcG9uc2USOQoETW92ZRIXLmZpbGVzeXN0ZW0uTW92ZVJlcXVlc3QaGC5maWxlc3lzdGVtLk1vdmVSZXNwb25zZRJCCgdMaXN0RGlyEhouZmlsZXN5c3RlbS5MaXN0RGlyUmVxdWVzdBobLmZpbGVzeXN0ZW0uTGlzdERpclJlc3BvbnNlEj8KBlJlbW92ZRIZLmZpbGVzeXN0ZW0uUmVtb3ZlUmVxdWVzdBoaLmZpbGVzeXN0ZW0uUmVtb3ZlUmVzcG9uc2USRwoIV2F0Y2hEaXISGy5maWxlc3lzdGVtLldhdGNoRGlyUmVxdWVzdBocLmZpbGVzeXN0ZW0uV2F0Y2hEaXJSZXNwb25zZTABElQKDUNyZWF0ZVdhdGNoZXISIC5maWxlc3lzdGVtLkNyZWF0ZVdhdGNoZXJSZXF1ZXN0GiEuZmlsZXN5c3RlbS5DcmVhdGVXYXRjaGVyUmVzcG9uc2USXQoQR2V0V2F0Y2hlckV2ZW50cxIjLmZpbGVzeXN0ZW0uR2V0V2F0Y2hlckV2ZW50c1JlcXVlc3QaJC5maWxlc3lzdGVtLkdldFdhdGNoZXJFdmVudHNSZXNwb25zZRJUCg1SZW1vdmVXYXRjaGVyEiAuZmlsZXN5c3RlbS5SZW1vdmVXYXRjaGVyUmVxdWVzdBohLmZpbGVzeXN0ZW0uUmVtb3ZlV2F0Y2hlclJlc3BvbnNlQmkKDmNvbS5maWxlc3lzdGVtQg9GaWxlc3lzdGVtUHJvdG9QAaICA0ZYWKoCCkZpbGVzeXN0ZW3KAgpGaWxlc3lzdGVt4gIWRmlsZXN5c3RlbVxHUEJNZXRhZGF0YeoCCkZpbGVzeXN0ZW1iBnByb3RvMw", [file_google_protobuf_timestamp]), 0);
function mapEventType(type) {
	switch (type) {
		case 5: return "chmod";
		case 1: return "create";
		case 3: return "remove";
		case 4: return "rename";
		case 2: return "write";
	}
}
var WatchHandle = class {
	constructor(handleStop, events, onEvent, onExit) {
		this.handleStop = handleStop;
		this.events = events;
		this.onEvent = onEvent;
		this.onExit = onExit;
		this.handleEvents();
	}
	/**
	* Stop watching the directory.
	*/
	async stop() {
		this.handleStop();
	}
	iterateEvents() {
		return __asyncGenerator(this, null, function* () {
			try {
				try {
					for (var iter = __forAwait(this.events), more, temp, error; more = !(temp = yield new __await(iter.next())).done; more = false) {
						const event = temp.value;
						switch (event.event.case) {
							case "filesystem":
								yield event.event;
								break;
						}
					}
				} catch (temp) {
					error = [temp];
				} finally {
					try {
						more && (temp = iter.return) && (yield new __await(temp.call(iter)));
					} finally {
						if (error) throw error[0];
					}
				}
			} catch (err) {
				throw handleRpcError(err);
			}
		});
	}
	async handleEvents() {
		var _a3, _b, _c;
		try {
			try {
				for (var iter = __forAwait(this.iterateEvents()), more, temp, error; more = !(temp = await iter.next()).done; more = false) {
					const event = temp.value;
					const eventType = mapEventType(event.value.type);
					if (eventType === void 0) continue;
					(_a3 = this.onEvent) == null || _a3.call(this, {
						name: event.value.name,
						type: eventType
					});
				}
			} catch (temp) {
				error = [temp];
			} finally {
				try {
					more && (temp = iter.return) && await temp.call(iter);
				} finally {
					if (error) throw error[0];
				}
			}
			(_b = this.onExit) == null || _b.call(this);
		} catch (err) {
			(_c = this.onExit) == null || _c.call(this, err);
		}
	}
};
function mapFileType(fileType) {
	switch (fileType) {
		case 2: return "dir";
		case 1: return "file";
	}
}
function mapModifiedTime(modifiedTime) {
	if (!modifiedTime) return void 0;
	return new Date(Number(modifiedTime.seconds) * 1e3 + Math.floor(modifiedTime.nanos / 1e6));
}
var Filesystem2 = class {
	constructor(transport, envdApi, connectionConfig) {
		this.envdApi = envdApi;
		this.connectionConfig = connectionConfig;
		this.defaultWatchTimeout = 6e4;
		this.defaultWatchRecursive = false;
		this.rpc = createClient(Filesystem, transport);
	}
	async read(path2, opts) {
		var _a3;
		const format = (_a3 = opts == null ? void 0 : opts.format) != null ? _a3 : "text";
		let user = opts == null ? void 0 : opts.user;
		if (user == void 0 && compareVersions(this.envdApi.version, ENVD_DEFAULT_USER) < 0) user = defaultUsername;
		const res = await this.envdApi.api.GET("/files", {
			params: { query: {
				path: path2,
				username: user
			} },
			parseAs: format === "bytes" ? "arrayBuffer" : format,
			signal: this.connectionConfig.getSignal(opts == null ? void 0 : opts.requestTimeoutMs)
		});
		const err = await handleEnvdApiError(res);
		if (err) throw err;
		if (format === "bytes") return new Uint8Array(res.data);
		if (res.response.headers.get("content-length") === "0") return "";
		return res.data;
	}
	async write(pathOrFiles, dataOrOpts, opts) {
		if (typeof pathOrFiles !== "string" && !Array.isArray(pathOrFiles)) throw new Error("Path or files are required");
		if (typeof pathOrFiles === "string" && Array.isArray(dataOrOpts)) throw new Error("Cannot specify both path and array of files. You have to specify either path and data for a single file or an array for multiple files.");
		const { path: path2, writeOpts, writeFiles } = typeof pathOrFiles === "string" ? {
			path: pathOrFiles,
			writeOpts: opts,
			writeFiles: [{ data: dataOrOpts }]
		} : {
			path: void 0,
			writeOpts: dataOrOpts,
			writeFiles: pathOrFiles
		};
		if (writeFiles.length === 0) return [];
		const blobs = await Promise.all(writeFiles.map((f) => new Response(f.data).blob()));
		let user = writeOpts == null ? void 0 : writeOpts.user;
		if (user == void 0 && compareVersions(this.envdApi.version, ENVD_DEFAULT_USER) < 0) user = defaultUsername;
		const res = await this.envdApi.api.POST("/files", {
			params: { query: {
				path: path2,
				username: user
			} },
			bodySerializer() {
				return blobs.reduce((fd, blob, i) => {
					fd.append("file", blob, writeFiles[i].path);
					return fd;
				}, new FormData());
			},
			signal: this.connectionConfig.getSignal(opts == null ? void 0 : opts.requestTimeoutMs),
			body: {}
		});
		const err = await handleEnvdApiError(res);
		if (err) throw err;
		const files = res.data;
		if (!files) throw new Error("Expected to receive information about written file");
		return files.length === 1 && path2 ? files[0] : files;
	}
	/**
	* List entries in a directory.
	*
	* @param path path to the directory.
	* @param opts connection options.
	*
	* @returns list of entries in the sandbox filesystem directory.
	*/
	async list(path2, opts) {
		var _a3;
		if (typeof (opts == null ? void 0 : opts.depth) === "number" && opts.depth < 1) throw new InvalidArgumentError("depth should be at least one");
		try {
			const res = await this.rpc.listDir({
				path: path2,
				depth: (_a3 = opts == null ? void 0 : opts.depth) != null ? _a3 : 1
			}, {
				headers: authenticationHeader(this.envdApi.version, opts == null ? void 0 : opts.user),
				signal: this.connectionConfig.getSignal(opts == null ? void 0 : opts.requestTimeoutMs)
			});
			const entries = [];
			for (const e of res.entries) {
				const type = mapFileType(e.type);
				if (type) entries.push({
					name: e.name,
					type,
					path: e.path,
					size: Number(e.size),
					mode: e.mode,
					permissions: e.permissions,
					owner: e.owner,
					group: e.group,
					modifiedTime: mapModifiedTime(e.modifiedTime),
					symlinkTarget: e.symlinkTarget
				});
			}
			return entries;
		} catch (err) {
			throw handleRpcError(err);
		}
	}
	/**
	* Create a new directory and all directories along the way if needed on the specified path.
	*
	* @param path path to a new directory. For example '/dirA/dirB' when creating 'dirB'.
	* @param opts connection options.
	*
	* @returns `true` if the directory was created, `false` if it already exists.
	*/
	async makeDir(path2, opts) {
		try {
			await this.rpc.makeDir({ path: path2 }, {
				headers: authenticationHeader(this.envdApi.version, opts == null ? void 0 : opts.user),
				signal: this.connectionConfig.getSignal(opts == null ? void 0 : opts.requestTimeoutMs)
			});
			return true;
		} catch (err) {
			if (err instanceof ConnectError) {
				if (err.code === Code.AlreadyExists) return false;
			}
			throw handleRpcError(err);
		}
	}
	/**
	* Rename a file or directory.
	*
	* @param oldPath path to the file or directory to rename.
	* @param newPath new path for the file or directory.
	* @param opts connection options.
	*
	* @returns information about renamed file or directory.
	*/
	async rename(oldPath, newPath, opts) {
		try {
			const entry = (await this.rpc.move({
				source: oldPath,
				destination: newPath
			}, {
				headers: authenticationHeader(this.envdApi.version, opts == null ? void 0 : opts.user),
				signal: this.connectionConfig.getSignal(opts == null ? void 0 : opts.requestTimeoutMs)
			})).entry;
			if (!entry) throw new Error("Expected to receive information about moved object");
			return {
				name: entry.name,
				type: mapFileType(entry.type),
				path: entry.path,
				size: Number(entry.size),
				mode: entry.mode,
				permissions: entry.permissions,
				owner: entry.owner,
				group: entry.group,
				modifiedTime: mapModifiedTime(entry.modifiedTime),
				symlinkTarget: entry.symlinkTarget
			};
		} catch (err) {
			throw handleRpcError(err);
		}
	}
	/**
	* Remove a file or directory.
	*
	* @param path path to a file or directory.
	* @param opts connection options.
	*/
	async remove(path2, opts) {
		try {
			await this.rpc.remove({ path: path2 }, {
				headers: authenticationHeader(this.envdApi.version, opts == null ? void 0 : opts.user),
				signal: this.connectionConfig.getSignal(opts == null ? void 0 : opts.requestTimeoutMs)
			});
		} catch (err) {
			throw handleRpcError(err);
		}
	}
	/**
	* Check if a file or a directory exists.
	*
	* @param path path to a file or a directory
	* @param opts connection options.
	*
	* @returns `true` if the file or directory exists, `false` otherwise
	*/
	async exists(path2, opts) {
		try {
			await this.rpc.stat({ path: path2 }, {
				headers: authenticationHeader(this.envdApi.version, opts == null ? void 0 : opts.user),
				signal: this.connectionConfig.getSignal(opts == null ? void 0 : opts.requestTimeoutMs)
			});
			return true;
		} catch (err) {
			if (err instanceof ConnectError) {
				if (err.code === Code.NotFound) return false;
			}
			throw handleRpcError(err);
		}
	}
	/**
	* Get information about a file or directory.
	*
	* @param path path to a file or directory.
	* @param opts connection options.
	*
	* @returns information about the file or directory like name, type, and path.
	*/
	async getInfo(path2, opts) {
		try {
			const res = await this.rpc.stat({ path: path2 }, {
				headers: authenticationHeader(this.envdApi.version, opts == null ? void 0 : opts.user),
				signal: this.connectionConfig.getSignal(opts == null ? void 0 : opts.requestTimeoutMs)
			});
			if (!res.entry) throw new Error("Expected to receive information about the file or directory");
			return {
				name: res.entry.name,
				type: mapFileType(res.entry.type),
				path: res.entry.path,
				size: Number(res.entry.size),
				mode: res.entry.mode,
				permissions: res.entry.permissions,
				owner: res.entry.owner,
				group: res.entry.group,
				modifiedTime: mapModifiedTime(res.entry.modifiedTime),
				symlinkTarget: res.entry.symlinkTarget
			};
		} catch (err) {
			throw handleRpcError(err);
		}
	}
	/**
	* Start watching a directory for filesystem events.
	*
	* @param path path to directory to watch.
	* @param onEvent callback to call when an event in the directory occurs.
	* @param opts connection options.
	*
	* @returns `WatchHandle` object for stopping watching directory.
	*/
	async watchDir(path2, onEvent, opts) {
		var _a3, _b, _c;
		if ((opts == null ? void 0 : opts.recursive) && this.envdApi.version && compareVersions(this.envdApi.version, ENVD_VERSION_RECURSIVE_WATCH) < 0) throw new TemplateError("You need to update the template to use recursive watching. You can do this by running `e2b template build` in the directory with the template.");
		const requestTimeoutMs = (_a3 = opts == null ? void 0 : opts.requestTimeoutMs) != null ? _a3 : this.connectionConfig.requestTimeoutMs;
		const controller = new AbortController();
		const reqTimeout = requestTimeoutMs ? setTimeout(() => {
			controller.abort();
		}, requestTimeoutMs) : void 0;
		const events = this.rpc.watchDir({
			path: path2,
			recursive: (_b = opts == null ? void 0 : opts.recursive) != null ? _b : this.defaultWatchRecursive
		}, {
			headers: __spreadProps(__spreadValues({}, authenticationHeader(this.envdApi.version, opts == null ? void 0 : opts.user)), { [KEEPALIVE_PING_HEADER]: KEEPALIVE_PING_INTERVAL_SEC.toString() }),
			signal: controller.signal,
			timeoutMs: (_c = opts == null ? void 0 : opts.timeoutMs) != null ? _c : this.defaultWatchTimeout
		});
		try {
			await handleWatchDirStartEvent(events);
			clearTimeout(reqTimeout);
			return new WatchHandle(() => controller.abort(), events, onEvent, opts == null ? void 0 : opts.onExit);
		} catch (err) {
			throw handleRpcError(err);
		}
	}
};
var CommandExitError = class extends SandboxError {
	constructor(result) {
		super(result.error);
		this.result = result;
		this.name = "CommandExitError";
	}
	/**
	* Command execution exit code.
	* `0` if the command finished successfully.
	*/
	get exitCode() {
		return this.result.exitCode;
	}
	/**
	* Error message from command execution.
	*/
	get error() {
		return this.result.error;
	}
	/**
	* Command execution stdout output.
	*/
	get stdout() {
		return this.result.stdout;
	}
	/**
	* Command execution stderr output.
	*/
	get stderr() {
		return this.result.stderr;
	}
};
var CommandHandle = class {
	/**
	* @hidden
	* @internal
	* @access protected
	*/
	constructor(pid, handleDisconnect, handleKill, events, onStdout, onStderr, onPty) {
		this.pid = pid;
		this.handleDisconnect = handleDisconnect;
		this.handleKill = handleKill;
		this.events = events;
		this.onStdout = onStdout;
		this.onStderr = onStderr;
		this.onPty = onPty;
		this._stdout = "";
		this._stderr = "";
		this._wait = this.handleEvents();
	}
	/**
	* Command execution exit code.
	* `0` if the command finished successfully.
	*
	* It is `undefined` if the command is still running.
	*/
	get exitCode() {
		var _a3;
		return (_a3 = this.result) == null ? void 0 : _a3.exitCode;
	}
	/**
	* Error message from command execution.
	*/
	get error() {
		var _a3;
		return (_a3 = this.result) == null ? void 0 : _a3.error;
	}
	/**
	* Command execution stderr output.
	*/
	get stderr() {
		return this._stderr;
	}
	/**
	* Command execution stdout output.
	*/
	get stdout() {
		return this._stdout;
	}
	/**
	* Wait for the command to finish and return the result.
	* If the command exits with a non-zero exit code, it throws a `CommandExitError`.
	*
	* @returns `CommandResult` result of command execution.
	*/
	async wait() {
		await this._wait;
		if (this.iterationError) throw this.iterationError;
		if (!this.result) throw new SandboxError("Process exited without a result");
		if (this.result.exitCode !== 0) throw new CommandExitError(this.result);
		return this.result;
	}
	/**
	* Disconnect from the command.
	*
	* The command is not killed, but SDK stops receiving events from the command.
	* You can reconnect to the command using {@link Commands.connect}.
	*/
	async disconnect() {
		this.handleDisconnect();
	}
	/**
	* Kill the command.
	* It uses `SIGKILL` signal to kill the command.
	*
	* @returns `true` if the command was killed successfully, `false` if the command was not found.
	*/
	async kill() {
		return await this.handleKill();
	}
	iterateEvents() {
		return __asyncGenerator(this, null, function* () {
			var _a3;
			try {
				for (var iter = __forAwait(this.events), more, temp, error; more = !(temp = yield new __await(iter.next())).done; more = false) {
					const event = temp.value;
					const e = (_a3 = event == null ? void 0 : event.event) == null ? void 0 : _a3.event;
					let out;
					switch (e == null ? void 0 : e.case) {
						case "data":
							switch (e.value.output.case) {
								case "stdout":
									out = new TextDecoder().decode(e.value.output.value);
									this._stdout += out;
									yield [
										out,
										null,
										null
									];
									break;
								case "stderr":
									out = new TextDecoder().decode(e.value.output.value);
									this._stderr += out;
									yield [
										null,
										out,
										null
									];
									break;
								case "pty":
									yield [
										null,
										null,
										e.value.output.value
									];
									break;
							}
							break;
						case "end":
							this.result = {
								exitCode: e.value.exitCode,
								error: e.value.error,
								stdout: this.stdout,
								stderr: this.stderr
							};
							break;
					}
				}
			} catch (temp) {
				error = [temp];
			} finally {
				try {
					more && (temp = iter.return) && (yield new __await(temp.call(iter)));
				} finally {
					if (error) throw error[0];
				}
			}
		});
	}
	async handleEvents() {
		var _a3, _b, _c;
		try {
			try {
				for (var iter = __forAwait(this.iterateEvents()), more, temp, error; more = !(temp = await iter.next()).done; more = false) {
					const [stdout, stderr, pty] = temp.value;
					if (stdout !== null) (_a3 = this.onStdout) == null || _a3.call(this, stdout);
					else if (stderr !== null) (_b = this.onStderr) == null || _b.call(this, stderr);
					else if (pty) (_c = this.onPty) == null || _c.call(this, pty);
				}
			} catch (temp) {
				error = [temp];
			} finally {
				try {
					more && (temp = iter.return) && await temp.call(iter);
				} finally {
					if (error) throw error[0];
				}
			}
		} catch (e) {
			this.iterationError = handleRpcError(e);
		}
	}
};
var Process = /* @__PURE__ */ serviceDesc(/* @__PURE__ */ fileDesc$1("ChVwcm9jZXNzL3Byb2Nlc3MucHJvdG8SB3Byb2Nlc3MiSgoDUFRZEh8KBHNpemUYASABKAsyES5wcm9jZXNzLlBUWS5TaXplGiIKBFNpemUSDAoEY29scxgBIAEoDRIMCgRyb3dzGAIgASgNIqEBCg1Qcm9jZXNzQ29uZmlnEgsKA2NtZBgBIAEoCRIMCgRhcmdzGAIgAygJEi4KBGVudnMYAyADKAsyIC5wcm9jZXNzLlByb2Nlc3NDb25maWcuRW52c0VudHJ5EhAKA2N3ZBgEIAEoCUgAiAEBGisKCUVudnNFbnRyeRILCgNrZXkYASABKAkSDQoFdmFsdWUYAiABKAk6AjgBQgYKBF9jd2QiDQoLTGlzdFJlcXVlc3QiXAoLUHJvY2Vzc0luZm8SJgoGY29uZmlnGAEgASgLMhYucHJvY2Vzcy5Qcm9jZXNzQ29uZmlnEgsKA3BpZBgCIAEoDRIQCgN0YWcYAyABKAlIAIgBAUIGCgRfdGFnIjcKDExpc3RSZXNwb25zZRInCglwcm9jZXNzZXMYASADKAsyFC5wcm9jZXNzLlByb2Nlc3NJbmZvIpcBCgxTdGFydFJlcXVlc3QSJwoHcHJvY2VzcxgBIAEoCzIWLnByb2Nlc3MuUHJvY2Vzc0NvbmZpZxIeCgNwdHkYAiABKAsyDC5wcm9jZXNzLlBUWUgAiAEBEhAKA3RhZxgDIAEoCUgBiAEBEhIKBXN0ZGluGAQgASgISAKIAQFCBgoEX3B0eUIGCgRfdGFnQggKBl9zdGRpbiJiCg1VcGRhdGVSZXF1ZXN0EikKB3Byb2Nlc3MYASABKAsyGC5wcm9jZXNzLlByb2Nlc3NTZWxlY3RvchIeCgNwdHkYAiABKAsyDC5wcm9jZXNzLlBUWUgAiAEBQgYKBF9wdHkiEAoOVXBkYXRlUmVzcG9uc2UirwMKDFByb2Nlc3NFdmVudBIxCgVzdGFydBgBIAEoCzIgLnByb2Nlc3MuUHJvY2Vzc0V2ZW50LlN0YXJ0RXZlbnRIABIvCgRkYXRhGAIgASgLMh8ucHJvY2Vzcy5Qcm9jZXNzRXZlbnQuRGF0YUV2ZW50SAASLQoDZW5kGAMgASgLMh4ucHJvY2Vzcy5Qcm9jZXNzRXZlbnQuRW5kRXZlbnRIABI0CglrZWVwYWxpdmUYBCABKAsyHy5wcm9jZXNzLlByb2Nlc3NFdmVudC5LZWVwQWxpdmVIABoZCgpTdGFydEV2ZW50EgsKA3BpZBgBIAEoDRpICglEYXRhRXZlbnQSEAoGc3Rkb3V0GAEgASgMSAASEAoGc3RkZXJyGAIgASgMSAASDQoDcHR5GAMgASgMSABCCAoGb3V0cHV0GlsKCEVuZEV2ZW50EhEKCWV4aXRfY29kZRgBIAEoERIOCgZleGl0ZWQYAiABKAgSDgoGc3RhdHVzGAMgASgJEhIKBWVycm9yGAQgASgJSACIAQFCCAoGX2Vycm9yGgsKCUtlZXBBbGl2ZUIHCgVldmVudCI1Cg1TdGFydFJlc3BvbnNlEiQKBWV2ZW50GAEgASgLMhUucHJvY2Vzcy5Qcm9jZXNzRXZlbnQiNwoPQ29ubmVjdFJlc3BvbnNlEiQKBWV2ZW50GAEgASgLMhUucHJvY2Vzcy5Qcm9jZXNzRXZlbnQiYwoQU2VuZElucHV0UmVxdWVzdBIpCgdwcm9jZXNzGAEgASgLMhgucHJvY2Vzcy5Qcm9jZXNzU2VsZWN0b3ISJAoFaW5wdXQYAiABKAsyFS5wcm9jZXNzLlByb2Nlc3NJbnB1dCITChFTZW5kSW5wdXRSZXNwb25zZSI3CgxQcm9jZXNzSW5wdXQSDwoFc3RkaW4YASABKAxIABINCgNwdHkYAiABKAxIAEIHCgVpbnB1dCLCAgoSU3RyZWFtSW5wdXRSZXF1ZXN0EjcKBXN0YXJ0GAEgASgLMiYucHJvY2Vzcy5TdHJlYW1JbnB1dFJlcXVlc3QuU3RhcnRFdmVudEgAEjUKBGRhdGEYAiABKAsyJS5wcm9jZXNzLlN0cmVhbUlucHV0UmVxdWVzdC5EYXRhRXZlbnRIABI6CglrZWVwYWxpdmUYAyABKAsyJS5wcm9jZXNzLlN0cmVhbUlucHV0UmVxdWVzdC5LZWVwQWxpdmVIABo3CgpTdGFydEV2ZW50EikKB3Byb2Nlc3MYASABKAsyGC5wcm9jZXNzLlByb2Nlc3NTZWxlY3RvchoxCglEYXRhRXZlbnQSJAoFaW5wdXQYAiABKAsyFS5wcm9jZXNzLlByb2Nlc3NJbnB1dBoLCglLZWVwQWxpdmVCBwoFZXZlbnQiFQoTU3RyZWFtSW5wdXRSZXNwb25zZSJfChFTZW5kU2lnbmFsUmVxdWVzdBIpCgdwcm9jZXNzGAEgASgLMhgucHJvY2Vzcy5Qcm9jZXNzU2VsZWN0b3ISHwoGc2lnbmFsGAIgASgOMg8ucHJvY2Vzcy5TaWduYWwiFAoSU2VuZFNpZ25hbFJlc3BvbnNlIjsKDkNvbm5lY3RSZXF1ZXN0EikKB3Byb2Nlc3MYASABKAsyGC5wcm9jZXNzLlByb2Nlc3NTZWxlY3RvciI7Cg9Qcm9jZXNzU2VsZWN0b3ISDQoDcGlkGAEgASgNSAASDQoDdGFnGAIgASgJSABCCgoIc2VsZWN0b3IqSAoGU2lnbmFsEhYKElNJR05BTF9VTlNQRUNJRklFRBAAEhIKDlNJR05BTF9TSUdURVJNEA8SEgoOU0lHTkFMX1NJR0tJTEwQCTLKAwoHUHJvY2VzcxIzCgRMaXN0EhQucHJvY2Vzcy5MaXN0UmVxdWVzdBoVLnByb2Nlc3MuTGlzdFJlc3BvbnNlEj4KB0Nvbm5lY3QSFy5wcm9jZXNzLkNvbm5lY3RSZXF1ZXN0GhgucHJvY2Vzcy5Db25uZWN0UmVzcG9uc2UwARI4CgVTdGFydBIVLnByb2Nlc3MuU3RhcnRSZXF1ZXN0GhYucHJvY2Vzcy5TdGFydFJlc3BvbnNlMAESOQoGVXBkYXRlEhYucHJvY2Vzcy5VcGRhdGVSZXF1ZXN0GhcucHJvY2Vzcy5VcGRhdGVSZXNwb25zZRJKCgtTdHJlYW1JbnB1dBIbLnByb2Nlc3MuU3RyZWFtSW5wdXRSZXF1ZXN0GhwucHJvY2Vzcy5TdHJlYW1JbnB1dFJlc3BvbnNlKAESQgoJU2VuZElucHV0EhkucHJvY2Vzcy5TZW5kSW5wdXRSZXF1ZXN0GhoucHJvY2Vzcy5TZW5kSW5wdXRSZXNwb25zZRJFCgpTZW5kU2lnbmFsEhoucHJvY2Vzcy5TZW5kU2lnbmFsUmVxdWVzdBobLnByb2Nlc3MuU2VuZFNpZ25hbFJlc3BvbnNlQlcKC2NvbS5wcm9jZXNzQgxQcm9jZXNzUHJvdG9QAaICA1BYWKoCB1Byb2Nlc3PKAgdQcm9jZXNz4gITUHJvY2Vzc1xHUEJNZXRhZGF0YeoCB1Byb2Nlc3NiBnByb3RvMw"), 0);
var Pty = class {
	constructor(transport, connectionConfig, metadata) {
		this.transport = transport;
		this.connectionConfig = connectionConfig;
		this.defaultPtyConnectionTimeout = 6e4;
		this.rpc = createClient(Process, this.transport);
		this.envdVersion = metadata.version;
	}
	/**
	* Create a new PTY (pseudo-terminal).
	*
	* @param opts options for creating the PTY.
	*
	* @returns handle to interact with the PTY.
	*/
	async create(opts) {
		var _a3, _b, _c, _d, _e, _f;
		const requestTimeoutMs = (_a3 = opts == null ? void 0 : opts.requestTimeoutMs) != null ? _a3 : this.connectionConfig.requestTimeoutMs;
		const envs = (_b = opts == null ? void 0 : opts.envs) != null ? _b : {};
		envs.TERM = (_c = envs.TERM) != null ? _c : "xterm-256color";
		envs.LANG = (_d = envs.LANG) != null ? _d : "C.UTF-8";
		envs.LC_ALL = (_e = envs.LC_ALL) != null ? _e : "C.UTF-8";
		const controller = new AbortController();
		const reqTimeout = setTimeout(() => {
			controller.abort();
		}, requestTimeoutMs);
		const events = this.rpc.start({
			process: {
				cmd: "/bin/bash",
				args: ["-i", "-l"],
				envs,
				cwd: opts == null ? void 0 : opts.cwd
			},
			pty: { size: {
				cols: opts.cols,
				rows: opts.rows
			} }
		}, {
			headers: __spreadProps(__spreadValues({}, authenticationHeader(this.envdVersion, opts == null ? void 0 : opts.user)), { [KEEPALIVE_PING_HEADER]: KEEPALIVE_PING_INTERVAL_SEC.toString() }),
			signal: controller.signal,
			timeoutMs: (_f = opts == null ? void 0 : opts.timeoutMs) != null ? _f : this.defaultPtyConnectionTimeout
		});
		try {
			const pid = await handleProcessStartEvent(events);
			clearTimeout(reqTimeout);
			return new CommandHandle(pid, () => controller.abort(), () => this.kill(pid), events, void 0, void 0, opts.onData);
		} catch (err) {
			throw handleRpcError(err);
		}
	}
	/**
	* Connect to a running PTY.
	*
	* @param pid process ID of the PTY to connect to. You can get the list of running PTYs using {@link Commands.list}.
	* @param opts connection options.
	*
	* @returns handle to interact with the PTY.
	*/
	async connect(pid, opts) {
		var _a3, _b;
		const requestTimeoutMs = (_a3 = opts == null ? void 0 : opts.requestTimeoutMs) != null ? _a3 : this.connectionConfig.requestTimeoutMs;
		const controller = new AbortController();
		const reqTimeout = requestTimeoutMs ? setTimeout(() => {
			controller.abort();
		}, requestTimeoutMs) : void 0;
		const events = this.rpc.connect({ process: { selector: {
			case: "pid",
			value: pid
		} } }, {
			signal: controller.signal,
			headers: { [KEEPALIVE_PING_HEADER]: KEEPALIVE_PING_INTERVAL_SEC.toString() },
			timeoutMs: (_b = opts == null ? void 0 : opts.timeoutMs) != null ? _b : this.defaultPtyConnectionTimeout
		});
		try {
			const pid2 = await handleProcessStartEvent(events);
			clearTimeout(reqTimeout);
			return new CommandHandle(pid2, () => controller.abort(), () => this.kill(pid2), events, void 0, void 0, opts == null ? void 0 : opts.onData);
		} catch (err) {
			throw handleRpcError(err);
		}
	}
	/**
	* Send input to a PTY.
	*
	* @param pid process ID of the PTY.
	* @param data input data to send to the PTY.
	* @param opts connection options.
	*/
	async sendInput(pid, data, opts) {
		try {
			await this.rpc.sendInput({
				input: { input: {
					case: "pty",
					value: data
				} },
				process: { selector: {
					case: "pid",
					value: pid
				} }
			}, { signal: this.connectionConfig.getSignal(opts == null ? void 0 : opts.requestTimeoutMs) });
		} catch (err) {
			throw handleRpcError(err);
		}
	}
	/**
	* Resize PTY.
	* Call this when the terminal window is resized and the number of columns and rows has changed.
	*
	* @param pid process ID of the PTY.
	* @param size new size of the PTY.
	* @param opts connection options.
	*/
	async resize(pid, size, opts) {
		try {
			await this.rpc.update({
				process: { selector: {
					case: "pid",
					value: pid
				} },
				pty: { size }
			}, { signal: this.connectionConfig.getSignal(opts == null ? void 0 : opts.requestTimeoutMs) });
		} catch (err) {
			throw handleRpcError(err);
		}
	}
	/**
	* Kill a running PTY specified by process ID.
	* It uses `SIGKILL` signal to kill the PTY.
	*
	* @param pid process ID of the PTY.
	* @param opts connection options.
	*
	* @returns `true` if the PTY was killed, `false` if the PTY was not found.
	*/
	async kill(pid, opts) {
		try {
			await this.rpc.sendSignal({
				process: { selector: {
					case: "pid",
					value: pid
				} },
				signal: 9
			}, { signal: this.connectionConfig.getSignal(opts == null ? void 0 : opts.requestTimeoutMs) });
			return true;
		} catch (err) {
			if (err instanceof ConnectError) {
				if (err.code === Code.NotFound) return false;
			}
			throw handleRpcError(err);
		}
	}
};
var Commands = class {
	constructor(transport, connectionConfig, metadata) {
		this.connectionConfig = connectionConfig;
		this.defaultProcessConnectionTimeout = 6e4;
		this.rpc = createClient(Process, transport);
		this.envdVersion = metadata.version;
	}
	/**
	* List all running commands and PTY sessions.
	*
	* @param opts connection options.
	*
	* @returns list of running commands and PTY sessions.
	*/
	async list(opts) {
		try {
			return (await this.rpc.list({}, { signal: this.connectionConfig.getSignal(opts == null ? void 0 : opts.requestTimeoutMs) })).processes.map((p) => __spreadValues(__spreadProps(__spreadValues({ pid: p.pid }, p.tag && { tag: p.tag }), {
				args: p.config.args,
				envs: p.config.envs,
				cmd: p.config.cmd
			}), p.config.cwd && { cwd: p.config.cwd }));
		} catch (err) {
			throw handleRpcError(err);
		}
	}
	/**
	* Send data to command stdin.
	*
	* @param pid process ID of the command. You can get the list of running commands using {@link Commands.list}.
	* @param data data to send to the command.
	* @param opts connection options.
	*/
	async sendStdin(pid, data, opts) {
		try {
			await this.rpc.sendInput({
				process: { selector: {
					case: "pid",
					value: pid
				} },
				input: { input: {
					case: "stdin",
					value: new TextEncoder().encode(data)
				} }
			}, { signal: this.connectionConfig.getSignal(opts == null ? void 0 : opts.requestTimeoutMs) });
		} catch (err) {
			throw handleRpcError(err);
		}
	}
	/**
	* Kill a running command specified by its process ID.
	* It uses `SIGKILL` signal to kill the command.
	*
	* @param pid process ID of the command. You can get the list of running commands using {@link Commands.list}.
	* @param opts connection options.
	*
	* @returns `true` if the command was killed, `false` if the command was not found.
	*/
	async kill(pid, opts) {
		try {
			await this.rpc.sendSignal({
				process: { selector: {
					case: "pid",
					value: pid
				} },
				signal: 9
			}, { signal: this.connectionConfig.getSignal(opts == null ? void 0 : opts.requestTimeoutMs) });
			return true;
		} catch (err) {
			if (err instanceof ConnectError) {
				if (err.code === Code.NotFound) return false;
			}
			throw handleRpcError(err);
		}
	}
	/**
	* Connect to a running command.
	* You can use {@link CommandHandle.wait} to wait for the command to finish and get execution results.
	*
	* @param pid process ID of the command to connect to. You can get the list of running commands using {@link Commands.list}.
	* @param opts connection options.
	*
	* @returns `CommandHandle` handle to interact with the running command.
	*/
	async connect(pid, opts) {
		var _a3, _b;
		const requestTimeoutMs = (_a3 = opts == null ? void 0 : opts.requestTimeoutMs) != null ? _a3 : this.connectionConfig.requestTimeoutMs;
		const controller = new AbortController();
		const reqTimeout = requestTimeoutMs ? setTimeout(() => {
			controller.abort();
		}, requestTimeoutMs) : void 0;
		const events = this.rpc.connect({ process: { selector: {
			case: "pid",
			value: pid
		} } }, {
			signal: controller.signal,
			headers: { [KEEPALIVE_PING_HEADER]: KEEPALIVE_PING_INTERVAL_SEC.toString() },
			timeoutMs: (_b = opts == null ? void 0 : opts.timeoutMs) != null ? _b : this.defaultProcessConnectionTimeout
		});
		try {
			const pid2 = await handleProcessStartEvent(events);
			clearTimeout(reqTimeout);
			return new CommandHandle(pid2, () => controller.abort(), () => this.kill(pid2), events, opts == null ? void 0 : opts.onStdout, opts == null ? void 0 : opts.onStderr, void 0);
		} catch (err) {
			throw handleRpcError(err);
		}
	}
	async run(cmd, opts) {
		const proc = await this.start(cmd, opts);
		return (opts == null ? void 0 : opts.background) ? proc : proc.wait();
	}
	async start(cmd, opts) {
		var _a3, _b;
		const requestTimeoutMs = (_a3 = opts == null ? void 0 : opts.requestTimeoutMs) != null ? _a3 : this.connectionConfig.requestTimeoutMs;
		const controller = new AbortController();
		const reqTimeout = requestTimeoutMs ? setTimeout(() => {
			controller.abort();
		}, requestTimeoutMs) : void 0;
		if ((opts == null ? void 0 : opts.stdin) === false && compareVersions(this.envdVersion, ENVD_COMMANDS_STDIN) < 0) throw new SandboxError(`Sandbox envd version ${this.envdVersion} can't specify stdin, it's always turned on. Please rebuild your template if you need this feature.`);
		const events = this.rpc.start({
			process: {
				cmd: "/bin/bash",
				cwd: opts == null ? void 0 : opts.cwd,
				envs: opts == null ? void 0 : opts.envs,
				args: [
					"-l",
					"-c",
					cmd
				]
			},
			stdin: (opts == null ? void 0 : opts.stdin) || false
		}, {
			headers: __spreadProps(__spreadValues({}, authenticationHeader(this.envdVersion, opts == null ? void 0 : opts.user)), { [KEEPALIVE_PING_HEADER]: KEEPALIVE_PING_INTERVAL_SEC.toString() }),
			signal: controller.signal,
			timeoutMs: (_b = opts == null ? void 0 : opts.timeoutMs) != null ? _b : this.defaultProcessConnectionTimeout
		});
		try {
			const pid = await handleProcessStartEvent(events);
			clearTimeout(reqTimeout);
			return new CommandHandle(pid, () => controller.abort(), () => this.kill(pid), events, opts == null ? void 0 : opts.onStdout, opts == null ? void 0 : opts.onStderr, void 0);
		} catch (err) {
			throw handleRpcError(err);
		}
	}
};
var SandboxApi = class {
	constructor() {}
	/**
	* Kill the sandbox specified by sandbox ID.
	*
	* @param sandboxId sandbox ID.
	* @param opts connection options.
	*
	* @returns `true` if the sandbox was found and killed, `false` otherwise.
	*/
	static async kill(sandboxId, opts) {
		var _a3;
		const config = new ConnectionConfig(opts);
		const res = await new ApiClient(config).api.DELETE("/sandboxes/{sandboxID}", {
			params: { path: { sandboxID: sandboxId } },
			signal: config.getSignal(opts == null ? void 0 : opts.requestTimeoutMs)
		});
		if (((_a3 = res.error) == null ? void 0 : _a3.code) === 404) return false;
		const err = handleApiError(res);
		if (err) throw err;
		return true;
	}
	/**
	* Get sandbox information like sandbox ID, template, metadata, started at/end at date.
	*
	* @param sandboxId sandbox ID.
	* @param opts connection options.
	*
	* @returns sandbox information.
	*/
	static async getInfo(sandboxId, opts) {
		const fullInfo = await this.getFullInfo(sandboxId, opts);
		delete fullInfo.envdAccessToken;
		delete fullInfo.sandboxDomain;
		return fullInfo;
	}
	/**
	* Get the metrics of the sandbox.
	*
	* @param sandboxId sandbox ID.
	* @param opts sandbox metrics options.
	*
	* @returns  List of sandbox metrics containing CPU, memory and disk usage information.
	*/
	static async getMetrics(sandboxId, opts) {
		var _a3, _b;
		const config = new ConnectionConfig(opts);
		const client = new ApiClient(config);
		const start = (opts == null ? void 0 : opts.start) ? Math.round(opts.start.getTime() / 1e3) : void 0;
		const end = (opts == null ? void 0 : opts.end) ? Math.round(opts.end.getTime() / 1e3) : void 0;
		const res = await client.api.GET("/sandboxes/{sandboxID}/metrics", {
			params: { path: {
				sandboxID: sandboxId,
				start,
				end
			} },
			signal: config.getSignal(opts == null ? void 0 : opts.requestTimeoutMs)
		});
		const err = handleApiError(res);
		if (err) throw err;
		return (_b = (_a3 = res.data) == null ? void 0 : _a3.map((metric) => ({
			timestamp: new Date(metric.timestamp),
			cpuUsedPct: metric.cpuUsedPct,
			cpuCount: metric.cpuCount,
			memUsed: metric.memUsed,
			memTotal: metric.memTotal,
			diskUsed: metric.diskUsed,
			diskTotal: metric.diskTotal
		}))) != null ? _b : [];
	}
	/**
	* Set the timeout of the specified sandbox.
	* After the timeout expires the sandbox will be automatically killed.
	*
	* This method can extend or reduce the sandbox timeout set when creating the sandbox or from the last call to {@link Sandbox.setTimeout}.
	*
	* Maximum time a sandbox can be kept alive is 24 hours (86_400_000 milliseconds) for Pro users and 1 hour (3_600_000 milliseconds) for Hobby users.
	*
	* @param sandboxId sandbox ID.
	* @param timeoutMs timeout in **milliseconds**.
	* @param opts connection options.
	*/
	static async setTimeout(sandboxId, timeoutMs, opts) {
		var _a3;
		const config = new ConnectionConfig(opts);
		const res = await new ApiClient(config).api.POST("/sandboxes/{sandboxID}/timeout", {
			params: { path: { sandboxID: sandboxId } },
			body: { timeout: timeoutToSeconds(timeoutMs) },
			signal: config.getSignal(opts == null ? void 0 : opts.requestTimeoutMs)
		});
		if (((_a3 = res.error) == null ? void 0 : _a3.code) === 404) throw new NotFoundError(`Sandbox ${sandboxId} not found`);
		const err = handleApiError(res);
		if (err) throw err;
	}
	static async getFullInfo(sandboxId, opts) {
		var _a3, _b;
		const config = new ConnectionConfig(opts);
		const res = await new ApiClient(config).api.GET("/sandboxes/{sandboxID}", {
			params: { path: { sandboxID: sandboxId } },
			signal: config.getSignal(opts == null ? void 0 : opts.requestTimeoutMs)
		});
		if (((_a3 = res.error) == null ? void 0 : _a3.code) === 404) throw new NotFoundError(`Sandbox ${sandboxId} not found`);
		const err = handleApiError(res);
		if (err) throw err;
		if (!res.data) throw new Error("Sandbox not found");
		return __spreadProps(__spreadValues({
			sandboxId: res.data.sandboxID,
			templateId: res.data.templateID
		}, res.data.alias && { name: res.data.alias }), {
			metadata: (_b = res.data.metadata) != null ? _b : {},
			envdVersion: res.data.envdVersion,
			envdAccessToken: res.data.envdAccessToken,
			startedAt: new Date(res.data.startedAt),
			endAt: new Date(res.data.endAt),
			state: res.data.state,
			cpuCount: res.data.cpuCount,
			memoryMB: res.data.memoryMB,
			sandboxDomain: res.data.domain || void 0
		});
	}
	/**
	* Pause the sandbox specified by sandbox ID.
	*
	* @param sandboxId sandbox ID.
	* @param opts connection options.
	*
	* @returns `true` if the sandbox got paused, `false` if the sandbox was already paused.
	*/
	static async betaPause(sandboxId, opts) {
		var _a3, _b;
		const config = new ConnectionConfig(opts);
		const res = await new ApiClient(config).api.POST("/sandboxes/{sandboxID}/pause", {
			params: { path: { sandboxID: sandboxId } },
			signal: config.getSignal(opts == null ? void 0 : opts.requestTimeoutMs)
		});
		if (((_a3 = res.error) == null ? void 0 : _a3.code) === 404) throw new NotFoundError(`Sandbox ${sandboxId} not found`);
		if (((_b = res.error) == null ? void 0 : _b.code) === 409) return false;
		const err = handleApiError(res);
		if (err) throw err;
		return true;
	}
	static async createSandbox(template, timeoutMs, opts) {
		var _a3, _b, _c;
		const config = new ConnectionConfig(opts);
		const res = await new ApiClient(config).api.POST("/sandboxes", {
			body: {
				autoPause: (_a3 = opts == null ? void 0 : opts.autoPause) != null ? _a3 : false,
				templateID: template,
				metadata: opts == null ? void 0 : opts.metadata,
				mcp: opts == null ? void 0 : opts.mcp,
				envVars: opts == null ? void 0 : opts.envs,
				timeout: timeoutToSeconds(timeoutMs),
				secure: (_b = opts == null ? void 0 : opts.secure) != null ? _b : true,
				allow_internet_access: (_c = opts == null ? void 0 : opts.allowInternetAccess) != null ? _c : true,
				network: opts == null ? void 0 : opts.network
			},
			signal: config.getSignal(opts == null ? void 0 : opts.requestTimeoutMs)
		});
		const err = handleApiError(res);
		if (err) throw err;
		if (compareVersions(res.data.envdVersion, "0.1.0") < 0) {
			await this.kill(res.data.sandboxID, opts);
			throw new TemplateError("You need to update the template to use the new SDK. You can do this by running `e2b template build` in the directory with the template.");
		}
		return {
			sandboxId: res.data.sandboxID,
			sandboxDomain: res.data.domain || void 0,
			envdVersion: res.data.envdVersion,
			envdAccessToken: res.data.envdAccessToken,
			trafficAccessToken: res.data.trafficAccessToken || void 0
		};
	}
	static async connectSandbox(sandboxId, opts) {
		var _a3, _b;
		const timeoutMs = (_a3 = opts == null ? void 0 : opts.timeoutMs) != null ? _a3 : DEFAULT_SANDBOX_TIMEOUT_MS;
		const config = new ConnectionConfig(opts);
		const res = await new ApiClient(config).api.POST("/sandboxes/{sandboxID}/connect", {
			params: { path: { sandboxID: sandboxId } },
			body: { timeout: timeoutToSeconds(timeoutMs) },
			signal: config.getSignal(opts == null ? void 0 : opts.requestTimeoutMs)
		});
		if (((_b = res.error) == null ? void 0 : _b.code) === 404) throw new NotFoundError(`Paused sandbox ${sandboxId} not found`);
		const err = handleApiError(res);
		if (err) throw err;
		return {
			sandboxId: res.data.sandboxID,
			sandboxDomain: res.data.domain || void 0,
			envdVersion: res.data.envdVersion,
			envdAccessToken: res.data.envdAccessToken,
			trafficAccessToken: res.data.trafficAccessToken || void 0
		};
	}
};
var SandboxPaginator = class {
	constructor(opts) {
		this.config = new ConnectionConfig(opts);
		this.client = new ApiClient(this.config);
		this._hasNext = true;
		this._nextToken = opts == null ? void 0 : opts.nextToken;
		this.query = opts == null ? void 0 : opts.query;
		this.limit = opts == null ? void 0 : opts.limit;
	}
	/**
	* Returns True if there are more items to fetch.
	*/
	get hasNext() {
		return this._hasNext;
	}
	/**
	* Returns the next token to use for pagination.
	*/
	get nextToken() {
		return this._nextToken;
	}
	/**
	* Get the next page of sandboxes.
	*
	* @throws Error if there are no more items to fetch. Call this method only if `hasNext` is `true`.
	*
	* @returns List of sandboxes
	*/
	async nextItems() {
		var _a3, _b, _c;
		if (!this.hasNext) throw new Error("No more items to fetch");
		let metadata = void 0;
		if ((_a3 = this.query) == null ? void 0 : _a3.metadata) {
			const encodedPairs = Object.fromEntries(Object.entries(this.query.metadata).map(([key, value]) => [encodeURIComponent(key), encodeURIComponent(value)]));
			metadata = new URLSearchParams(encodedPairs).toString();
		}
		const res = await this.client.api.GET("/v2/sandboxes", {
			params: { query: {
				metadata,
				state: (_b = this.query) == null ? void 0 : _b.state,
				limit: this.limit,
				nextToken: this.nextToken
			} },
			signal: this.config.getSignal()
		});
		const err = handleApiError(res);
		if (err) throw err;
		this._nextToken = res.response.headers.get("x-next-token") || void 0;
		this._hasNext = !!this._nextToken;
		return ((_c = res.data) != null ? _c : []).map((sandbox) => {
			var _a4;
			return __spreadProps(__spreadValues({
				sandboxId: sandbox.sandboxID,
				templateId: sandbox.templateID
			}, sandbox.alias && { name: sandbox.alias }), {
				metadata: (_a4 = sandbox.metadata) != null ? _a4 : {},
				startedAt: new Date(sandbox.startedAt),
				endAt: new Date(sandbox.endAt),
				state: sandbox.state,
				cpuCount: sandbox.cpuCount,
				memoryMB: sandbox.memoryMB,
				envdVersion: sandbox.envdVersion
			});
		});
	}
};
var Sandbox = class extends SandboxApi {
	/**
	* Use {@link Sandbox.create} to create a new Sandbox instead.
	*
	* @hidden
	* @hide
	* @internal
	* @access protected
	*/
	constructor(opts) {
		var _a3;
		super();
		this.envdPort = 49983;
		this.mcpPort = 50005;
		this.connectionConfig = new ConnectionConfig(opts);
		this.sandboxId = opts.sandboxId;
		this.sandboxDomain = (_a3 = opts.sandboxDomain) != null ? _a3 : this.connectionConfig.domain;
		this.envdAccessToken = opts.envdAccessToken;
		this.trafficAccessToken = opts.trafficAccessToken;
		this.envdApiUrl = this.connectionConfig.getSandboxUrl(this.sandboxId, {
			sandboxDomain: this.sandboxDomain,
			envdPort: this.envdPort
		});
		const sandboxHeaders = {
			"E2b-Sandbox-Id": this.sandboxId,
			"E2b-Sandbox-Port": this.envdPort.toString()
		};
		const rpcTransport = createConnectTransport({
			baseUrl: this.envdApiUrl,
			useBinaryFormat: false,
			interceptors: (opts == null ? void 0 : opts.logger) ? [createRpcLogger(opts.logger)] : void 0,
			fetch: (url, options) => {
				const headers = new Headers(this.connectionConfig.headers);
				new Headers(options == null ? void 0 : options.headers).forEach((value, key) => headers.append(key, value));
				new Headers(sandboxHeaders).forEach((value, key) => headers.append(key, value));
				if (this.envdAccessToken) headers.append("X-Access-Token", this.envdAccessToken);
				options = __spreadProps(__spreadValues({}, options != null ? options : {}), {
					headers,
					redirect: "follow"
				});
				return fetch(url, options);
			}
		});
		this.envdApi = new EnvdApiClient({
			apiUrl: this.envdApiUrl,
			logger: opts == null ? void 0 : opts.logger,
			accessToken: this.envdAccessToken,
			headers: this.envdAccessToken ? { "X-Access-Token": this.envdAccessToken } : {}
		}, { version: opts.envdVersion });
		this.files = new Filesystem2(rpcTransport, this.envdApi, this.connectionConfig);
		this.commands = new Commands(rpcTransport, this.connectionConfig, { version: opts.envdVersion });
		this.pty = new Pty(rpcTransport, this.connectionConfig, { version: opts.envdVersion });
	}
	/**
	* List all sandboxes.
	*
	* @param opts connection options.
	*
	* @returns paginator for listing sandboxes.
	*/
	static list(opts) {
		return new SandboxPaginator(opts);
	}
	static async create(templateOrOpts, opts) {
		var _a3, _b;
		const { template, sandboxOpts } = typeof templateOrOpts === "string" ? {
			template: templateOrOpts,
			sandboxOpts: opts
		} : {
			template: (templateOrOpts == null ? void 0 : templateOrOpts.mcp) ? this.defaultMcpTemplate : this.defaultTemplate,
			sandboxOpts: templateOrOpts
		};
		const config = new ConnectionConfig(sandboxOpts);
		if (config.debug) return new this(__spreadValues({
			sandboxId: "debug_sandbox_id",
			envdVersion: ENVD_DEBUG_FALLBACK
		}, config));
		const sandboxInfo = await SandboxApi.createSandbox(template, (_a3 = sandboxOpts == null ? void 0 : sandboxOpts.timeoutMs) != null ? _a3 : this.defaultSandboxTimeoutMs, sandboxOpts);
		const sandbox = new this(__spreadValues(__spreadValues({}, sandboxInfo), config));
		if (sandboxOpts == null ? void 0 : sandboxOpts.mcp) {
			sandbox.mcpToken = crypto.randomUUID();
			const res = await sandbox.commands.run(`mcp-gateway --config '${JSON.stringify(sandboxOpts == null ? void 0 : sandboxOpts.mcp)}'`, {
				user: "root",
				envs: { GATEWAY_ACCESS_TOKEN: (_b = sandbox.mcpToken) != null ? _b : "" }
			});
			if (res.exitCode !== 0) throw new Error(`Failed to start MCP gateway: ${res.stderr}`);
		}
		return sandbox;
	}
	static async betaCreate(templateOrOpts, opts) {
		var _a3, _b;
		const { template, sandboxOpts } = typeof templateOrOpts === "string" ? {
			template: templateOrOpts,
			sandboxOpts: opts
		} : {
			template: (templateOrOpts == null ? void 0 : templateOrOpts.mcp) ? this.defaultMcpTemplate : this.defaultTemplate,
			sandboxOpts: templateOrOpts
		};
		const config = new ConnectionConfig(sandboxOpts);
		if (config.debug) return new this(__spreadValues({
			sandboxId: "debug_sandbox_id",
			envdVersion: ENVD_DEBUG_FALLBACK
		}, config));
		const sandboxInfo = await SandboxApi.createSandbox(template, (_a3 = sandboxOpts == null ? void 0 : sandboxOpts.timeoutMs) != null ? _a3 : this.defaultSandboxTimeoutMs, sandboxOpts);
		const sandbox = new this(__spreadValues(__spreadValues({}, sandboxInfo), config));
		if (sandboxOpts == null ? void 0 : sandboxOpts.mcp) {
			sandbox.mcpToken = crypto.randomUUID();
			const res = await sandbox.commands.run(`mcp-gateway --config '${JSON.stringify(sandboxOpts == null ? void 0 : sandboxOpts.mcp)}'`, {
				user: "root",
				envs: { GATEWAY_ACCESS_TOKEN: (_b = sandbox.mcpToken) != null ? _b : "" }
			});
			if (res.exitCode !== 0) throw new Error(`Failed to start MCP gateway: ${res.stderr}`);
		}
		return sandbox;
	}
	/**
	* Connect to a sandbox. If the sandbox is paused, it will be automatically resumed.
	* Sandbox must be either running or be paused.
	*
	* With sandbox ID you can connect to the same sandbox from different places or environments (serverless functions, etc).
	*
	* @param sandboxId sandbox ID.
	* @param opts connection options.
	*
	* @returns A running sandbox instance
	*
	* @example
	* ```ts
	* const sandbox = await Sandbox.create()
	* const sandboxId = sandbox.sandboxId
	*
	* // Connect to the same sandbox.
	* const sameSandbox = await Sandbox.connect(sandboxId)
	* ```
	*/
	static async connect(sandboxId, opts) {
		const sandbox = await SandboxApi.connectSandbox(sandboxId, opts);
		const config = new ConnectionConfig(opts);
		return new this(__spreadValues({
			sandboxId,
			sandboxDomain: sandbox.sandboxDomain,
			envdAccessToken: sandbox.envdAccessToken,
			trafficAccessToken: sandbox.trafficAccessToken,
			envdVersion: sandbox.envdVersion
		}, config));
	}
	/**
	* Connect to a sandbox. If the sandbox is paused, it will be automatically resumed.
	* Sandbox must be either running or be paused.
	*
	* With sandbox ID you can connect to the same sandbox from different places or environments (serverless functions, etc).
	*
	* @param opts connection options.
	*
	* @returns A running sandbox instance
	*
	* @example
	* ```ts
	* const sandbox = await Sandbox.create()
	* await sandbox.betaPause()
	*
	* // Connect to the same sandbox.
	* const sameSandbox = await sandbox.connect()
	* ```
	*/
	async connect(opts) {
		await SandboxApi.connectSandbox(this.sandboxId, opts);
		return this;
	}
	/**
	* Get the host address for the specified sandbox port.
	* You can then use this address to connect to the sandbox port from outside the sandbox via HTTP or WebSocket.
	*
	* @param port number of the port in the sandbox.
	*
	* @returns host address of the sandbox port.
	*
	* @example
	* ```ts
	* const sandbox = await Sandbox.create()
	* // Start an HTTP server
	* await sandbox.commands.exec('python3 -m http.server 3000')
	* // Get the hostname of the HTTP server
	* const serverURL = sandbox.getHost(3000)
	* ```
	*/
	getHost(port) {
		return this.connectionConfig.getHost(this.sandboxId, port, this.sandboxDomain);
	}
	/**
	* Check if the sandbox is running.
	*
	* @returns `true` if the sandbox is running, `false` otherwise.
	*
	* @example
	* ```ts
	* const sandbox = await Sandbox.create()
	* await sandbox.isRunning() // Returns true
	*
	* await sandbox.kill()
	* await sandbox.isRunning() // Returns false
	* ```
	*/
	async isRunning(opts) {
		const signal = this.connectionConfig.getSignal(opts == null ? void 0 : opts.requestTimeoutMs);
		const res = await this.envdApi.api.GET("/health", { signal });
		if (res.response.status == 502) return false;
		const err = await handleEnvdApiError(res);
		if (err) throw err;
		return true;
	}
	/**
	* Set the timeout of the sandbox.
	*
	* This method can extend or reduce the sandbox timeout set when creating the sandbox or from the last call to `.setTimeout`.
	* Maximum time a sandbox can be kept alive is 24 hours (86_400_000 milliseconds) for Pro users and 1 hour (3_600_000 milliseconds) for Hobby users.
	*
	* @param timeoutMs timeout in **milliseconds**.
	* @param opts connection options.
	*/
	async setTimeout(timeoutMs, opts) {
		if (this.connectionConfig.debug) return;
		await SandboxApi.setTimeout(this.sandboxId, timeoutMs, __spreadValues(__spreadValues({}, this.connectionConfig), opts));
	}
	/**
	* Kill the sandbox.
	*
	* @param opts connection options.
	*/
	async kill(opts) {
		if (this.connectionConfig.debug) return;
		await SandboxApi.kill(this.sandboxId, __spreadValues(__spreadValues({}, this.connectionConfig), opts));
	}
	/**
	* @beta This feature is in beta and may change in the future.
	*
	* Pause a sandbox by its ID.
	*
	* @param opts connection options.
	*
	* @returns sandbox ID that can be used to resume the sandbox.
	*/
	async betaPause(opts) {
		return await SandboxApi.betaPause(this.sandboxId, opts);
	}
	/**
	*
	* Get the MCP URL for the sandbox.
	*
	* @returns MCP URL for the sandbox.
	*/
	getMcpUrl() {
		return `https://${this.getHost(this.mcpPort)}/mcp`;
	}
	/**
	* Get the MCP token for the sandbox.
	*
	* @returns MCP token for the sandbox, or undefined if MCP is not enabled.
	*/
	async getMcpToken() {
		if (!this.mcpToken) this.mcpToken = await this.files.read("/etc/mcp-gateway/.token", { user: "root" });
		return this.mcpToken;
	}
	/**
	* Get the URL to upload a file to the sandbox.
	*
	* You have to send a POST request to this URL with the file as multipart/form-data.
	*
	* @param path path to the file in the sandbox.
	*
	* @param opts download url options.
	*
	* @returns URL for uploading file.
	*/
	async uploadUrl(path2, opts) {
		opts = opts != null ? opts : {};
		const useSignature = !!this.envdAccessToken;
		if (!useSignature && opts.useSignatureExpiration != void 0) throw new Error("Signature expiration can be used only when sandbox is created as secured.");
		let username = opts.user;
		if (username == void 0 && compareVersions(this.envdApi.version, ENVD_DEFAULT_USER) < 0) username = defaultUsername;
		const filePath = path2 != null ? path2 : "";
		const fileUrl = this.fileUrl(filePath, username);
		if (useSignature) {
			const url = new URL(fileUrl);
			const sig = await getSignature({
				path: filePath,
				operation: "write",
				user: username,
				expirationInSeconds: opts.useSignatureExpiration,
				envdAccessToken: this.envdAccessToken
			});
			url.searchParams.set("signature", sig.signature);
			if (sig.expiration) url.searchParams.set("signature_expiration", sig.expiration.toString());
			return url.toString();
		}
		return fileUrl;
	}
	/**
	* Get the URL to download a file from the sandbox.
	*
	* @param path path to the file in the sandbox.
	*
	* @param opts download url options.
	*
	* @returns URL for downloading file.
	*/
	async downloadUrl(path2, opts) {
		opts = opts != null ? opts : {};
		const useSignature = !!this.envdAccessToken;
		if (!useSignature && opts.useSignatureExpiration != void 0) throw new Error("Signature expiration can be used only when sandbox is created as secured.");
		let username = opts.user;
		if (username == void 0 && compareVersions(this.envdApi.version, ENVD_DEFAULT_USER) < 0) username = defaultUsername;
		const fileUrl = this.fileUrl(path2, username);
		if (useSignature) {
			const url = new URL(fileUrl);
			const sig = await getSignature({
				path: path2,
				operation: "read",
				user: username,
				expirationInSeconds: opts.useSignatureExpiration,
				envdAccessToken: this.envdAccessToken
			});
			url.searchParams.set("signature", sig.signature);
			if (sig.expiration) url.searchParams.set("signature_expiration", sig.expiration.toString());
			return url.toString();
		}
		return fileUrl;
	}
	/**
	* Get sandbox information like sandbox ID, template, metadata, started at/end at date.
	*
	* @param opts connection options.
	*
	* @returns information about the sandbox
	*/
	async getInfo(opts) {
		return await SandboxApi.getInfo(this.sandboxId, __spreadValues(__spreadValues({}, this.connectionConfig), opts));
	}
	/**
	* Get the metrics of the sandbox.
	*
	* @param opts connection options.
	*
	* @returns  List of sandbox metrics containing CPU, memory and disk usage information.
	*/
	async getMetrics(opts) {
		var _a3, _b;
		if (this.envdApi.version) {
			if (compareVersions(this.envdApi.version, "0.1.5") < 0) throw new SandboxError("You need to update the template to use the new SDK. You can do this by running `e2b template build` in the directory with the template.");
			if (compareVersions(this.envdApi.version, "0.2.4") < 0) (_b = (_a3 = this.connectionConfig.logger) == null ? void 0 : _a3.warn) == null || _b.call(_a3, "Disk metrics are not supported in this version of the sandbox, please rebuild the template to get disk metrics.");
		}
		return await SandboxApi.getMetrics(this.sandboxId, __spreadValues(__spreadValues({}, this.connectionConfig), opts));
	}
	fileUrl(path2, username) {
		const url = new URL("/files", this.envdApiUrl);
		if (username) url.searchParams.set("username", username);
		if (path2) url.searchParams.set("path", path2);
		return url.toString();
	}
};
Sandbox.defaultTemplate = "base";
Sandbox.defaultMcpTemplate = "mcp-gateway";
Sandbox.defaultSandboxTimeoutMs = DEFAULT_SANDBOX_TIMEOUT_MS;
var LogEntry = class {
	constructor(timestamp, level, message) {
		this.timestamp = timestamp;
		this.level = level;
		this.message = message;
	}
	toString() {
		return `[${this.timestamp.toISOString()}] [${this.level}] ${stripAnsi(this.message)}`;
	}
};
var LogEntryStart = class extends LogEntry {
	constructor(timestamp, message) {
		super(timestamp, "debug", message);
	}
};
var LogEntryEnd = class extends LogEntry {
	constructor(timestamp, message) {
		super(timestamp, "debug", message);
	}
};
chalk.red("ERROR"), chalk.hex("#FF4400")("WARN "), chalk.hex("#FF8800")("INFO "), chalk.gray("DEBUG");
var FINALIZE_STEP_NAME = "finalize";
var BASE_STEP_NAME = "base";
var STACK_TRACE_DEPTH = 3;
var RESOLVE_SYMLINKS = false;
function readDockerignore(contextPath) {
	const dockerignorePath = node_path.default.join(contextPath, ".dockerignore");
	if (!node_fs.default.existsSync(dockerignorePath)) return [];
	return node_fs.default.readFileSync(dockerignorePath, "utf-8").split("\n").map((line) => line.trim()).filter((line) => line && !line.startsWith("#"));
}
function normalizePath(path2) {
	return path2.replace(/\\/g, "/");
}
async function getAllFilesInPath(src, contextPath, ignorePatterns, includeDirectories = true) {
	const { glob } = await dynamicImport("glob");
	const files = /* @__PURE__ */ new Map();
	const globFiles = await glob(src, {
		ignore: ignorePatterns,
		withFileTypes: true,
		cwd: contextPath
	});
	for (const file of globFiles) if (file.isDirectory()) {
		if (includeDirectories) files.set(file.fullpath(), file);
		(await glob(normalizePath(node_path.default.join(file.relative() || ".", "**/*")), {
			ignore: ignorePatterns,
			withFileTypes: true,
			cwd: contextPath
		})).forEach((f) => files.set(f.fullpath(), f));
	} else files.set(file.fullpath(), file);
	return Array.from(files.values()).sort();
}
async function calculateFilesHash(src, dest, contextPath, ignorePatterns, resolveSymlinks, stackTrace) {
	const srcPath = node_path.default.join(contextPath, src);
	const hash = node_crypto.default.createHash("sha256");
	const content = `COPY ${src} ${dest}`;
	hash.update(content);
	const files = await getAllFilesInPath(src, contextPath, ignorePatterns, true);
	if (files.length === 0) {
		const error = /* @__PURE__ */ new Error(`No files found in ${srcPath}`);
		if (stackTrace) error.stack = stackTrace;
		throw error;
	}
	const hashStats = (stats) => {
		hash.update(stats.mode.toString());
		hash.update(stats.size.toString());
	};
	for (const file of files) {
		const relativePath = file.relativePosix();
		hash.update(relativePath);
		if (file.isSymbolicLink()) {
			const stats2 = node_fs.default.statSync(file.fullpath(), { throwIfNoEntry: false });
			if (!(resolveSymlinks && ((stats2 == null ? void 0 : stats2.isFile()) || (stats2 == null ? void 0 : stats2.isDirectory())))) {
				hashStats(node_fs.default.lstatSync(file.fullpath()));
				const content2 = node_fs.default.readlinkSync(file.fullpath());
				hash.update(content2);
				continue;
			}
		}
		const stats = node_fs.default.statSync(file.fullpath());
		hashStats(stats);
		if (stats.isFile()) {
			const content2 = node_fs.default.readFileSync(file.fullpath());
			hash.update(new Uint8Array(content2));
		}
	}
	return hash.digest("hex");
}
function getCallerFrame(depth) {
	const stackTrace = (/* @__PURE__ */ new Error()).stack;
	if (!stackTrace) return;
	const lines = stackTrace.split("\n").slice(1);
	if (lines.length < depth + 1) return;
	return lines.slice(depth).join("\n");
}
function callsites(depth) {
	const _originalPrepareStackTrace = Error.prepareStackTrace;
	try {
		let result = [];
		Error.prepareStackTrace = (_, callSites) => {
			const callSitesWithoutCurrent = callSites.slice(depth);
			result = callSitesWithoutCurrent;
			return callSitesWithoutCurrent;
		};
		(/* @__PURE__ */ new Error()).stack;
		return result;
	} finally {
		Error.prepareStackTrace = _originalPrepareStackTrace;
	}
}
function getCallerDirectory(depth) {
	const callSites = callsites(depth + 1);
	if (callSites.length === 0) return;
	let fileName = callSites[0].getFileName();
	if (!fileName) return;
	if (fileName.startsWith("file:")) {
		const { fileURLToPath } = dynamicRequire("node:url");
		fileName = fileURLToPath(fileName);
	}
	return node_path.default.dirname(fileName);
}
function padOctal(mode) {
	return mode.toString(8).padStart(4, "0");
}
async function tarFileStream(fileName, fileContextPath, ignorePatterns, resolveSymlinks) {
	const { create } = await dynamicImport("tar");
	const filePaths = (await getAllFilesInPath(fileName, fileContextPath, ignorePatterns, true)).map((file) => file.relativePosix());
	return create({
		gzip: true,
		cwd: fileContextPath,
		follow: resolveSymlinks,
		noDirRecurse: true
	}, filePaths);
}
async function tarFileStreamUpload(fileName, fileContextPath, ignorePatterns, resolveSymlinks) {
	const sizeCalculationStream = await tarFileStream(fileName, fileContextPath, ignorePatterns, resolveSymlinks);
	let contentLength = 0;
	try {
		for (var iter = __forAwait(sizeCalculationStream), more, temp, error; more = !(temp = await iter.next()).done; more = false) {
			const chunk = temp.value;
			contentLength += chunk.length;
		}
	} catch (temp) {
		error = [temp];
	} finally {
		try {
			more && (temp = iter.return) && await temp.call(iter);
		} finally {
			if (error) throw error[0];
		}
	}
	return {
		contentLength,
		uploadStream: await tarFileStream(fileName, fileContextPath, ignorePatterns, resolveSymlinks)
	};
}
function getBuildStepIndex(step, stackTracesLength) {
	if (step === BASE_STEP_NAME) return 0;
	if (step === FINALIZE_STEP_NAME) return stackTracesLength - 1;
	return Number(step);
}
function readGCPServiceAccountJSON(contextPath, pathOrContent) {
	if (typeof pathOrContent === "string") return node_fs.default.readFileSync(node_path.default.join(contextPath, pathOrContent), "utf-8");
	return JSON.stringify(pathOrContent);
}
async function requestBuild(client, { alias, cpuCount, memoryMB }) {
	const requestBuildRes = await client.api.POST("/v3/templates", { body: {
		alias,
		cpuCount,
		memoryMB
	} });
	const error = handleApiError(requestBuildRes, BuildError);
	if (error) throw error;
	if (!requestBuildRes.data) throw new BuildError("Failed to request build");
	return requestBuildRes.data;
}
async function getFileUploadLink(client, { templateID, filesHash }, stackTrace) {
	const fileUploadLinkRes = await client.api.GET("/templates/{templateID}/files/{hash}", { params: { path: {
		templateID,
		hash: filesHash
	} } });
	const error = handleApiError(fileUploadLinkRes, FileUploadError, stackTrace);
	if (error) throw error;
	if (!fileUploadLinkRes.data) throw new FileUploadError("Failed to get file upload link", stackTrace);
	return fileUploadLinkRes.data;
}
async function uploadFile(options, stackTrace) {
	const { fileName, url, fileContextPath, ignorePatterns, resolveSymlinks } = options;
	try {
		const { contentLength, uploadStream } = await tarFileStreamUpload(fileName, fileContextPath, ignorePatterns, resolveSymlinks);
		const res = await fetch(url, {
			method: "PUT",
			body: uploadStream,
			headers: { "Content-Length": contentLength.toString() },
			duplex: "half"
		});
		if (!res.ok) throw new FileUploadError(`Failed to upload file: ${res.statusText}`, stackTrace);
	} catch (error) {
		if (error instanceof FileUploadError) throw error;
		throw new FileUploadError(`Failed to upload file: ${error}`, stackTrace);
	}
}
async function triggerBuild(client, { templateID, buildID, template }) {
	const error = handleApiError(await client.api.POST("/v2/templates/{templateID}/builds/{buildID}", {
		params: { path: {
			templateID,
			buildID
		} },
		body: template
	}), BuildError);
	if (error) throw error;
}
async function getBuildStatus(client, { templateID, buildID, logsOffset }) {
	const buildStatusRes = await client.api.GET("/templates/{templateID}/builds/{buildID}/status", { params: {
		path: {
			templateID,
			buildID
		},
		query: { logsOffset }
	} });
	const error = handleApiError(buildStatusRes, BuildError);
	if (error) throw error;
	if (!buildStatusRes.data) throw new BuildError("Failed to get build status");
	return buildStatusRes.data;
}
async function checkAliasExists(client, { alias }) {
	const aliasRes = await client.api.GET("/templates/aliases/{alias}", { params: { path: { alias } } });
	if (aliasRes.response.status === 404) return false;
	if (aliasRes.response.status === 403) return true;
	const error = handleApiError(aliasRes, TemplateError);
	if (error) throw error;
	return aliasRes.data !== void 0;
}
async function waitForBuildFinish(client, { templateID, buildID, onBuildLogs, logsRefreshFrequency, stackTraces }) {
	var _a3, _b, _c;
	let logsOffset = 0;
	let status = "building";
	while (status === "building" || status === "waiting") {
		const buildStatus = await getBuildStatus(client, {
			templateID,
			buildID,
			logsOffset
		});
		logsOffset += buildStatus.logEntries.length;
		buildStatus.logEntries.forEach((logEntry) => onBuildLogs == null ? void 0 : onBuildLogs(new LogEntry(new Date(logEntry.timestamp), logEntry.level, stripAnsi(logEntry.message))));
		status = buildStatus.status;
		switch (status) {
			case "ready": return;
			case "waiting": break;
			case "error": {
				let stackError;
				if (((_a3 = buildStatus.reason) == null ? void 0 : _a3.step) !== void 0) stackError = stackTraces[getBuildStepIndex(buildStatus.reason.step, stackTraces.length)];
				throw new BuildError((_c = (_b = buildStatus == null ? void 0 : buildStatus.reason) == null ? void 0 : _b.message) != null ? _c : "Unknown error", stackError);
			}
		}
		await new Promise((resolve) => setTimeout(resolve, logsRefreshFrequency));
	}
	throw new BuildError("Unknown build error occurred.");
}
var ReadyCmd = class {
	constructor(cmd) {
		this.cmd = cmd;
	}
	getCmd() {
		return this.cmd;
	}
};
function waitForFile(filename) {
	return new ReadyCmd(`[ -f ${filename} ]`);
}
function waitForTimeout(timeout) {
	return new ReadyCmd(`sleep ${Math.max(1, Math.floor(timeout / 1e3))}`);
}
function parseDockerfile(dockerfileContentOrPath, templateBuilder) {
	let dockerfileContent;
	try {
		if (node_fs.default.existsSync(dockerfileContentOrPath) && node_fs.default.statSync(dockerfileContentOrPath).isFile()) dockerfileContent = node_fs.default.readFileSync(dockerfileContentOrPath, "utf-8");
		else dockerfileContent = dockerfileContentOrPath;
	} catch (e) {
		dockerfileContent = dockerfileContentOrPath;
	}
	const instructions = import_main.DockerfileParser.parse(dockerfileContent).getInstructions();
	const fromInstructions = instructions.filter((instruction) => instruction.getKeyword() === "FROM");
	if (fromInstructions.length > 1) throw new Error("Multi-stage Dockerfiles are not supported");
	if (fromInstructions.length === 0) throw new Error("Dockerfile must contain a FROM instruction");
	const argumentsData = fromInstructions[0].getArguments();
	let baseImage = "e2bdev/base";
	let userChanged = false;
	let workdirChanged = false;
	if (argumentsData && argumentsData.length > 0) baseImage = argumentsData[0].getValue();
	templateBuilder.setUser("root");
	templateBuilder.setWorkdir("/");
	for (const instruction of instructions) {
		const keyword = instruction.getKeyword();
		switch (keyword) {
			case "FROM": break;
			case "RUN":
				handleRunInstruction(instruction, templateBuilder);
				break;
			case "COPY":
			case "ADD":
				handleCopyInstruction(instruction, templateBuilder);
				break;
			case "WORKDIR":
				handleWorkdirInstruction(instruction, templateBuilder);
				workdirChanged = true;
				break;
			case "USER":
				handleUserInstruction(instruction, templateBuilder);
				userChanged = true;
				break;
			case "ENV":
			case "ARG":
				handleEnvInstruction(instruction, templateBuilder);
				break;
			case "EXPOSE": break;
			case "VOLUME": break;
			case "CMD":
			case "ENTRYPOINT":
				handleCmdEntrypointInstruction(instruction, templateBuilder);
				break;
			default:
				console.warn(`Unsupported instruction: ${keyword}`);
				break;
		}
	}
	if (!userChanged) templateBuilder.setUser("user");
	if (!workdirChanged) templateBuilder.setWorkdir("/home/user");
	return { baseImage };
}
function handleRunInstruction(instruction, templateBuilder) {
	const argumentsData = instruction.getArguments();
	if (argumentsData && argumentsData.length > 0) {
		const command = argumentsData.map((arg) => arg.getValue()).join(" ");
		templateBuilder.runCmd(command);
	}
}
function handleCopyInstruction(instruction, templateBuilder) {
	var _a3;
	const argumentsData = instruction.getArguments();
	if (argumentsData && argumentsData.length >= 2) {
		const src = argumentsData[0].getValue();
		const dest = argumentsData[argumentsData.length - 1].getValue();
		let user;
		const chownFlag = instruction.getFlags().find((flag) => flag.getName() === "chown");
		if (chownFlag) user = (_a3 = chownFlag.getValue()) != null ? _a3 : void 0;
		templateBuilder.copy(src, dest, { user });
	}
}
function handleWorkdirInstruction(instruction, templateBuilder) {
	const argumentsData = instruction.getArguments();
	if (argumentsData && argumentsData.length > 0) {
		const workdir = argumentsData[0].getValue();
		templateBuilder.setWorkdir(workdir);
	}
}
function handleUserInstruction(instruction, templateBuilder) {
	const argumentsData = instruction.getArguments();
	if (argumentsData && argumentsData.length > 0) {
		const user = argumentsData[0].getValue();
		templateBuilder.setUser(user);
	}
}
function handleEnvInstruction(instruction, templateBuilder) {
	const argumentsData = instruction.getArguments();
	const keyword = instruction.getKeyword();
	if (argumentsData && argumentsData.length >= 1) {
		const envVars = {};
		if (argumentsData.length === 2) {
			const firstArg = argumentsData[0].getValue();
			const secondArg = argumentsData[1].getValue();
			if (firstArg.includes("=") && secondArg.includes("=")) for (const arg of argumentsData) {
				const envString = arg.getValue();
				const equalIndex = envString.indexOf("=");
				if (equalIndex > 0) {
					const key = envString.substring(0, equalIndex);
					envVars[key] = envString.substring(equalIndex + 1);
				}
			}
			else envVars[firstArg] = secondArg;
		} else if (argumentsData.length === 1) {
			const envString = argumentsData[0].getValue();
			const equalIndex = envString.indexOf("=");
			if (equalIndex > 0) {
				const key = envString.substring(0, equalIndex);
				envVars[key] = envString.substring(equalIndex + 1);
			} else if (keyword === "ARG" && envString.trim()) {
				const key = envString.trim();
				envVars[key] = "";
			}
		} else for (const arg of argumentsData) {
			const envString = arg.getValue();
			const equalIndex = envString.indexOf("=");
			if (equalIndex > 0) {
				const key = envString.substring(0, equalIndex);
				envVars[key] = envString.substring(equalIndex + 1);
			} else if (keyword === "ARG") {
				const key = envString;
				envVars[key] = "";
			}
		}
		if (Object.keys(envVars).length > 0) templateBuilder.setEnvs(envVars);
	}
}
function handleCmdEntrypointInstruction(instruction, templateBuilder) {
	const argumentsData = instruction.getArguments();
	if (argumentsData && argumentsData.length > 0) {
		let command = argumentsData.map((arg) => arg.getValue()).join(" ");
		try {
			const parsedCommand = JSON.parse(command);
			if (Array.isArray(parsedCommand)) command = parsedCommand.join(" ");
		} catch (e) {}
		templateBuilder.setStartCmd(command, waitForTimeout(2e4));
	}
}
var _a2;
var TemplateBase = class {
	constructor(options) {
		this.defaultBaseImage = "e2bdev/base";
		this.baseImage = this.defaultBaseImage;
		this.baseTemplate = void 0;
		this.registryConfig = void 0;
		this.startCmd = void 0;
		this.readyCmd = void 0;
		this.force = false;
		this.forceNextLayer = false;
		this.instructions = [];
		this.fileContextPath = runtime === "browser" ? "." : (_a2 = getCallerDirectory(STACK_TRACE_DEPTH)) != null ? _a2 : ".";
		this.fileIgnorePatterns = [];
		this.logsRefreshFrequency = 200;
		this.stackTraces = [];
		this.stackTracesEnabled = true;
		this.stackTracesOverride = void 0;
		var _a3, _b;
		this.fileContextPath = (_a3 = options == null ? void 0 : options.fileContextPath) != null ? _a3 : this.fileContextPath;
		this.fileIgnorePatterns = (_b = options == null ? void 0 : options.fileIgnorePatterns) != null ? _b : this.fileIgnorePatterns;
	}
	/**
	* Convert a template to JSON representation.
	*
	* @param template The template to convert
	* @param computeHashes Whether to compute file hashes for cache invalidation
	* @returns JSON string representation of the template
	*/
	static toJSON(template, computeHashes = true) {
		return template.toJSON(computeHashes);
	}
	/**
	* Convert a template to Dockerfile format.
	* Note: Templates based on other E2B templates cannot be converted to Dockerfile.
	*
	* @param template The template to convert
	* @returns Dockerfile string representation
	* @throws Error if the template is based on another E2B template
	*/
	static toDockerfile(template) {
		return template.toDockerfile();
	}
	/**
	* Build and deploy a template to E2B infrastructure.
	*
	* @param template The template to build
	* @param options Build configuration options
	*
	* @example
	* ```ts
	* const template = Template().fromPythonImage('3')
	* await Template.build(template, {
	*   alias: 'my-python-env',
	*   cpuCount: 2,
	*   memoryMB: 1024
	* })
	* ```
	*/
	static async build(template, options) {
		var _a3, _b, _c;
		try {
			(_a3 = options.onBuildLogs) == null || _a3.call(options, new LogEntryStart(/* @__PURE__ */ new Date(), "Build started"));
			const baseTemplate = template;
			const client = new ApiClient(new ConnectionConfig(options));
			const data = await baseTemplate.build(client, options);
			(_b = options.onBuildLogs) == null || _b.call(options, new LogEntry(/* @__PURE__ */ new Date(), "info", "Waiting for logs..."));
			await waitForBuildFinish(client, {
				templateID: data.templateId,
				buildID: data.buildId,
				onBuildLogs: options.onBuildLogs,
				logsRefreshFrequency: baseTemplate.logsRefreshFrequency,
				stackTraces: baseTemplate.stackTraces
			});
			return data;
		} finally {
			(_c = options.onBuildLogs) == null || _c.call(options, new LogEntryEnd(/* @__PURE__ */ new Date(), "Build finished"));
		}
	}
	/**
	* Build and deploy a template to E2B infrastructure.
	*
	* @param template The template to build
	* @param options Build configuration options
	*
	* @example
	* ```ts
	* const template = Template().fromPythonImage('3')
	* const data = await Template.buildInBackground(template, {
	*   alias: 'my-python-env',
	*   cpuCount: 2,
	*   memoryMB: 1024
	* })
	* ```
	*/
	static async buildInBackground(template, options) {
		const client = new ApiClient(new ConnectionConfig(options));
		return await template.build(client, options);
	}
	/**
	* Get the status of a build.
	*
	* @param data Build identifiers
	* @param options Authentication options
	*
	* @example
	* ```ts
	* const status = await Template.getBuildStatus(data, { logsOffset: 0 })
	* ```
	*/
	static async getBuildStatus(data, options) {
		return await getBuildStatus(new ApiClient(new ConnectionConfig(options)), {
			templateID: data.templateId,
			buildID: data.buildId,
			logsOffset: options == null ? void 0 : options.logsOffset
		});
	}
	/**
	* Check if a template with the given alias exists.
	*
	* @param alias Template alias to check
	* @param options Authentication options
	* @returns True if the alias exists, false otherwise
	*
	* @example
	* ```ts
	* const exists = await Template.aliasExists('my-python-env')
	* if (exists) {
	*   console.log('Template exists!')
	* }
	* ```
	*/
	static async aliasExists(alias, options) {
		return checkAliasExists(new ApiClient(new ConnectionConfig(options)), { alias });
	}
	fromDebianImage(variant = "stable") {
		return this.fromImage(`debian:${variant}`);
	}
	fromUbuntuImage(variant = "latest") {
		return this.fromImage(`ubuntu:${variant}`);
	}
	fromPythonImage(version2 = "3") {
		return this.fromImage(`python:${version2}`);
	}
	fromNodeImage(variant = "lts") {
		return this.fromImage(`node:${variant}`);
	}
	fromBunImage(variant = "latest") {
		return this.fromImage(`oven/bun:${variant}`);
	}
	fromBaseImage() {
		return this.fromImage(this.defaultBaseImage);
	}
	fromImage(baseImage, credentials) {
		this.baseImage = baseImage;
		this.baseTemplate = void 0;
		if (credentials) this.registryConfig = {
			type: "registry",
			username: credentials.username,
			password: credentials.password
		};
		if (this.forceNextLayer) this.force = true;
		this.collectStackTrace();
		return this;
	}
	fromTemplate(template) {
		this.baseTemplate = template;
		this.baseImage = void 0;
		if (this.forceNextLayer) this.force = true;
		this.collectStackTrace();
		return this;
	}
	fromDockerfile(dockerfileContentOrPath) {
		const { baseImage } = this.runInStackTraceOverrideContext(() => parseDockerfile(dockerfileContentOrPath, this), getCallerFrame(STACK_TRACE_DEPTH - 1));
		this.baseImage = baseImage;
		this.baseTemplate = void 0;
		if (this.forceNextLayer) this.force = true;
		this.collectStackTrace();
		return this;
	}
	fromAWSRegistry(image, credentials) {
		this.baseImage = image;
		this.baseTemplate = void 0;
		this.registryConfig = {
			type: "aws",
			awsAccessKeyId: credentials.accessKeyId,
			awsSecretAccessKey: credentials.secretAccessKey,
			awsRegion: credentials.region
		};
		if (this.forceNextLayer) this.force = true;
		this.collectStackTrace();
		return this;
	}
	fromGCPRegistry(image, credentials) {
		this.baseImage = image;
		this.baseTemplate = void 0;
		this.registryConfig = {
			type: "gcp",
			serviceAccountJson: readGCPServiceAccountJSON(this.fileContextPath.toString(), credentials.serviceAccountJSON)
		};
		if (this.forceNextLayer) this.force = true;
		this.collectStackTrace();
		return this;
	}
	copy(src, dest, options) {
		var _a3;
		if (runtime === "browser") throw new Error("Browser runtime is not supported for copy");
		const srcs = Array.isArray(src) ? src : [src];
		for (const src2 of srcs) {
			const args = [
				src2.toString(),
				dest.toString(),
				(_a3 = options == null ? void 0 : options.user) != null ? _a3 : "",
				(options == null ? void 0 : options.mode) ? padOctal(options.mode) : ""
			];
			this.instructions.push({
				type: "COPY",
				args,
				force: (options == null ? void 0 : options.forceUpload) || this.forceNextLayer,
				forceUpload: options == null ? void 0 : options.forceUpload,
				resolveSymlinks: options == null ? void 0 : options.resolveSymlinks
			});
		}
		this.collectStackTrace();
		return this;
	}
	copyItems(items) {
		if (runtime === "browser") throw new Error("Browser runtime is not supported for copyItems");
		this.runInNewStackTraceContext(() => {
			for (const item of items) this.copy(item.src, item.dest, {
				forceUpload: item.forceUpload,
				user: item.user,
				mode: item.mode,
				resolveSymlinks: item.resolveSymlinks
			});
		});
		return this;
	}
	remove(path2, options) {
		const paths2 = Array.isArray(path2) ? path2 : [path2];
		const args = ["rm"];
		if (options == null ? void 0 : options.recursive) args.push("-r");
		if (options == null ? void 0 : options.force) args.push("-f");
		args.push(...paths2.map((p) => p.toString()));
		return this.runInNewStackTraceContext(() => this.runCmd(args.join(" "), { user: options == null ? void 0 : options.user }));
	}
	rename(src, dest, options) {
		const args = [
			"mv",
			src.toString(),
			dest.toString()
		];
		if (options == null ? void 0 : options.force) args.push("-f");
		return this.runInNewStackTraceContext(() => this.runCmd(args.join(" "), { user: options == null ? void 0 : options.user }));
	}
	makeDir(path2, options) {
		const paths2 = Array.isArray(path2) ? path2 : [path2];
		const args = ["mkdir", "-p"];
		if (options == null ? void 0 : options.mode) args.push(`-m ${padOctal(options.mode)}`);
		args.push(...paths2.map((p) => p.toString()));
		return this.runInNewStackTraceContext(() => this.runCmd(args.join(" "), { user: options == null ? void 0 : options.user }));
	}
	makeSymlink(src, dest, options) {
		const args = ["ln", "-s"];
		if (options == null ? void 0 : options.force) args.push("-f");
		args.push(src.toString(), dest.toString());
		return this.runInNewStackTraceContext(() => this.runCmd(args.join(" "), { user: options == null ? void 0 : options.user }));
	}
	runCmd(commandOrCommands, options) {
		const args = [(Array.isArray(commandOrCommands) ? commandOrCommands : [commandOrCommands]).join(" && ")];
		if (options == null ? void 0 : options.user) args.push(options.user);
		this.instructions.push({
			type: "RUN",
			args,
			force: this.forceNextLayer
		});
		this.collectStackTrace();
		return this;
	}
	setWorkdir(workdir) {
		this.instructions.push({
			type: "WORKDIR",
			args: [workdir.toString()],
			force: this.forceNextLayer
		});
		this.collectStackTrace();
		return this;
	}
	setUser(user) {
		this.instructions.push({
			type: "USER",
			args: [user],
			force: this.forceNextLayer
		});
		this.collectStackTrace();
		return this;
	}
	pipInstall(packages, options) {
		var _a3;
		const g = (_a3 = options == null ? void 0 : options.g) != null ? _a3 : true;
		const args = ["pip", "install"];
		const packageList = packages ? Array.isArray(packages) ? packages : [packages] : void 0;
		if (g === false) args.push("--user");
		if (packageList) args.push(...packageList);
		else args.push(".");
		return this.runInNewStackTraceContext(() => this.runCmd(args.join(" "), { user: g ? "root" : void 0 }));
	}
	npmInstall(packages, options) {
		const args = ["npm", "install"];
		const packageList = packages ? Array.isArray(packages) ? packages : [packages] : void 0;
		if (options == null ? void 0 : options.g) args.push("-g");
		if (options == null ? void 0 : options.dev) args.push("--save-dev");
		if (packageList) args.push(...packageList);
		return this.runInNewStackTraceContext(() => this.runCmd(args.join(" "), { user: (options == null ? void 0 : options.g) ? "root" : void 0 }));
	}
	bunInstall(packages, options) {
		const args = ["bun", "install"];
		const packageList = packages ? Array.isArray(packages) ? packages : [packages] : void 0;
		if (options == null ? void 0 : options.g) args.push("-g");
		if (options == null ? void 0 : options.dev) args.push("--dev");
		if (packageList) args.push(...packageList);
		return this.runInNewStackTraceContext(() => this.runCmd(args.join(" "), { user: (options == null ? void 0 : options.g) ? "root" : void 0 }));
	}
	aptInstall(packages, options) {
		const packageList = Array.isArray(packages) ? packages : [packages];
		return this.runInNewStackTraceContext(() => this.runCmd(["apt-get update", `DEBIAN_FRONTEND=noninteractive DEBCONF_NOWARNINGS=yes apt-get install -y ${(options == null ? void 0 : options.noInstallRecommends) ? "--no-install-recommends " : ""}${packageList.join(" ")}`], { user: "root" }));
	}
	addMcpServer(servers) {
		if (this.baseTemplate !== "mcp-gateway") throw new BuildError("MCP servers can only be added to mcp-gateway template", getCallerFrame(STACK_TRACE_DEPTH - 1));
		const serverList = Array.isArray(servers) ? servers : [servers];
		return this.runInNewStackTraceContext(() => this.runCmd(`mcp-gateway pull ${serverList.join(" ")}`, { user: "root" }));
	}
	gitClone(url, path2, options) {
		const args = [
			"git",
			"clone",
			url
		];
		if (options == null ? void 0 : options.branch) {
			args.push(`--branch ${options.branch}`);
			args.push("--single-branch");
		}
		if (options == null ? void 0 : options.depth) args.push(`--depth ${options.depth}`);
		if (path2) args.push(path2.toString());
		return this.runInNewStackTraceContext(() => this.runCmd(args.join(" "), { user: options == null ? void 0 : options.user }));
	}
	setStartCmd(startCommand, readyCommand) {
		this.startCmd = startCommand;
		if (readyCommand instanceof ReadyCmd) this.readyCmd = readyCommand.getCmd();
		else this.readyCmd = readyCommand;
		this.collectStackTrace();
		return this;
	}
	setReadyCmd(readyCommand) {
		if (readyCommand instanceof ReadyCmd) this.readyCmd = readyCommand.getCmd();
		else this.readyCmd = readyCommand;
		this.collectStackTrace();
		return this;
	}
	setEnvs(envs) {
		if (Object.keys(envs).length === 0) return this;
		this.instructions.push({
			type: "ENV",
			args: Object.entries(envs).flatMap(([key, value]) => [key, value]),
			force: this.forceNextLayer
		});
		this.collectStackTrace();
		return this;
	}
	skipCache() {
		this.forceNextLayer = true;
		return this;
	}
	betaDevContainerPrebuild(devcontainerDirectory) {
		if (this.baseTemplate !== "devcontainer") throw new BuildError("Devcontainers can only used in the devcontainer template", getCallerFrame(STACK_TRACE_DEPTH - 1));
		return this.runInNewStackTraceContext(() => {
			return this.runCmd(`devcontainer build --workspace-folder ${devcontainerDirectory}`, { user: "root" });
		});
	}
	betaSetDevContainerStart(devcontainerDirectory) {
		if (this.baseTemplate !== "devcontainer") throw new BuildError("Devcontainers can only used in the devcontainer template", getCallerFrame(STACK_TRACE_DEPTH - 1));
		return this.runInNewStackTraceContext(() => {
			return this.setStartCmd(`sudo devcontainer up --workspace-folder ${devcontainerDirectory} && sudo /prepare-exec.sh ${devcontainerDirectory} | sudo tee /devcontainer.sh > /dev/null && sudo chmod +x /devcontainer.sh && sudo touch /devcontainer.up`, waitForFile("/devcontainer.up"));
		});
	}
	/**
	* Collect the current stack trace for debugging purposes.
	*
	* @param stackTracesDepth Depth to traverse in the call stack
	* @returns this for method chaining
	*/
	collectStackTrace(stackTracesDepth = STACK_TRACE_DEPTH) {
		if (!this.stackTracesEnabled) return this;
		if (this.stackTracesOverride) {
			this.stackTraces.push(this.stackTracesOverride);
			return this;
		}
		this.stackTraces.push(getCallerFrame(stackTracesDepth));
		return this;
	}
	/**
	* Temporarily disable stack trace collection.
	*
	* @returns this for method chaining
	*/
	disableStackTrace() {
		this.stackTracesEnabled = false;
		return this;
	}
	/**
	* Re-enable stack trace collection.
	*
	* @returns this for method chaining
	*/
	enableStackTrace() {
		this.stackTracesEnabled = true;
		return this;
	}
	/**
	* Execute a function in a clean stack trace context.
	*
	* @param fn Function to execute
	* @returns The result of the function
	*/
	runInNewStackTraceContext(fn) {
		this.disableStackTrace();
		const result = fn();
		this.enableStackTrace();
		this.collectStackTrace(STACK_TRACE_DEPTH + 1);
		return result;
	}
	runInStackTraceOverrideContext(fn, stackTraceOverride) {
		this.stackTracesOverride = stackTraceOverride;
		const result = fn();
		this.stackTracesOverride = void 0;
		return result;
	}
	/**
	* Convert the template to JSON representation.
	*
	* @param computeHashes Whether to compute file hashes for COPY instructions
	* @returns JSON string representation of the template
	*/
	async toJSON(computeHashes) {
		let instructions = this.instructions;
		if (computeHashes) instructions = await this.instructionsWithHashes();
		return JSON.stringify(this.serialize(instructions), void 0, 2);
	}
	/**
	* Convert the template to Dockerfile format.
	*
	* Note: Only templates based on Docker images can be converted to Dockerfile.
	* Templates based on other E2B templates cannot be converted because they
	* may use features not available in standard Dockerfiles.
	*
	* @returns Dockerfile string representation
	* @throws Error if template is based on another E2B template or has no base image
	*/
	toDockerfile() {
		if (this.baseTemplate !== void 0) throw new Error("Cannot convert template built from another template to Dockerfile. Templates based on other templates can only be built using the E2B API.");
		if (this.baseImage === void 0) throw new Error("No base image specified for template");
		let dockerfile = `FROM ${this.baseImage}
`;
		for (const instruction of this.instructions) {
			if (instruction.type === "RUN") {
				dockerfile += `RUN ${instruction.args[0]}
`;
				continue;
			}
			if (instruction.type === "COPY") {
				dockerfile += `COPY ${instruction.args[0]} ${instruction.args[1]}
`;
				continue;
			}
			if (instruction.type === "ENV") {
				const values = [];
				for (let i = 0; i < instruction.args.length; i += 2) values.push(`${instruction.args[i]}=${instruction.args[i + 1]}`);
				dockerfile += `ENV ${values.join(" ")}
`;
				continue;
			}
			dockerfile += `${instruction.type} ${instruction.args.join(" ")}
`;
		}
		if (this.startCmd) dockerfile += `ENTRYPOINT ${this.startCmd}
`;
		return dockerfile;
	}
	/**
	* Internal implementation of the template build process.
	*
	* @param client API client for communicating with E2B backend
	* @param options Build configuration options
	* @throws BuildError if the build fails
	*/
	async build(client, options) {
		var _a3, _b, _c, _d, _e, _f;
		if (options.skipCache) this.force = true;
		(_a3 = options.onBuildLogs) == null || _a3.call(options, new LogEntry(/* @__PURE__ */ new Date(), "info", `Requesting build for template: ${options.alias}`));
		const { templateID, buildID } = await requestBuild(client, {
			alias: options.alias,
			cpuCount: (_b = options.cpuCount) != null ? _b : 2,
			memoryMB: (_c = options.memoryMB) != null ? _c : 1024
		});
		(_d = options.onBuildLogs) == null || _d.call(options, new LogEntry(/* @__PURE__ */ new Date(), "info", `Template created with ID: ${templateID}, Build ID: ${buildID}`));
		const instructionsWithHashes = await this.instructionsWithHashes();
		const uploadPromises = instructionsWithHashes.map(async (instruction, index) => {
			var _a4, _b2, _c2, _d2;
			if (instruction.type !== "COPY") return;
			const src = instruction.args.length > 0 ? instruction.args[0] : null;
			const filesHash = (_a4 = instruction.filesHash) != null ? _a4 : null;
			if (src === null || filesHash === null) throw new Error("Source path and files hash are required");
			const forceUpload = instruction.forceUpload;
			let stackTrace = void 0;
			if (index + 1 >= 0 && index + 1 < this.stackTraces.length) stackTrace = this.stackTraces[index + 1];
			const { present, url } = await getFileUploadLink(client, {
				templateID,
				filesHash
			}, stackTrace);
			if (forceUpload && url != null || present === false && url != null) {
				await uploadFile({
					fileName: src,
					fileContextPath: this.fileContextPath.toString(),
					url,
					ignorePatterns: [...this.fileIgnorePatterns, ...readDockerignore(this.fileContextPath.toString())],
					resolveSymlinks: (_b2 = instruction.resolveSymlinks) != null ? _b2 : RESOLVE_SYMLINKS
				}, stackTrace);
				(_c2 = options.onBuildLogs) == null || _c2.call(options, new LogEntry(/* @__PURE__ */ new Date(), "info", `Uploaded '${src}'`));
			} else (_d2 = options.onBuildLogs) == null || _d2.call(options, new LogEntry(/* @__PURE__ */ new Date(), "info", `Skipping upload of '${src}', already cached`));
		});
		await Promise.all(uploadPromises);
		(_e = options.onBuildLogs) == null || _e.call(options, new LogEntry(/* @__PURE__ */ new Date(), "info", "All file uploads completed"));
		(_f = options.onBuildLogs) == null || _f.call(options, new LogEntry(/* @__PURE__ */ new Date(), "info", "Starting building..."));
		await triggerBuild(client, {
			templateID,
			buildID,
			template: this.serialize(instructionsWithHashes)
		});
		return {
			alias: options.alias,
			templateId: templateID,
			buildId: buildID
		};
	}
	/**
	* Add file hashes to COPY instructions for cache invalidation.
	*
	* @returns Copy of instructions array with filesHash added to COPY instructions
	*/
	async instructionsWithHashes() {
		return Promise.all(this.instructions.map(async (instruction, index) => {
			var _a3;
			if (instruction.type !== "COPY") return instruction;
			const src = instruction.args.length > 0 ? instruction.args[0] : null;
			const dest = instruction.args.length > 1 ? instruction.args[1] : null;
			if (src === null || dest === null) throw new Error("Source path and destination path are required");
			let stackTrace = void 0;
			if (index + 1 >= 0 && index + 1 < this.stackTraces.length) stackTrace = this.stackTraces[index + 1];
			return __spreadProps(__spreadValues({}, instruction), { filesHash: await calculateFilesHash(src, dest, this.fileContextPath.toString(), [...this.fileIgnorePatterns, ...runtime === "browser" ? [] : readDockerignore(this.fileContextPath.toString())], (_a3 = instruction.resolveSymlinks) != null ? _a3 : RESOLVE_SYMLINKS, stackTrace) });
		}));
	}
	/**
	* Serialize the template to the API request format.
	*
	* @param steps Array of build instructions with file hashes
	* @returns Template data formatted for the API
	*/
	serialize(steps) {
		const templateData = {
			startCmd: this.startCmd,
			readyCmd: this.readyCmd,
			steps,
			force: this.force
		};
		if (this.baseImage !== void 0) templateData.fromImage = this.baseImage;
		if (this.baseTemplate !== void 0) templateData.fromTemplate = this.baseTemplate;
		if (this.registryConfig !== void 0) templateData.fromImageRegistry = this.registryConfig;
		return templateData;
	}
};
function Template(options) {
	return new TemplateBase(options);
}
Template.build = TemplateBase.build;
Template.buildInBackground = TemplateBase.buildInBackground;
Template.getBuildStatus = TemplateBase.getBuildStatus;
Template.aliasExists = TemplateBase.aliasExists;
Template.toJSON = TemplateBase.toJSON;
Template.toDockerfile = TemplateBase.toDockerfile;
//#endregion
//#region ../../packages/agent-provider/src/common/providers/cloud-agent-provider/e2b-filesystem.ts
/**
* E2B Filesystem Implementation
*
* Provides FilesResource implementation using E2B Sandbox SDK.
* Supports optional auto-reconnect on auth failure (401/403).
*
* @see https://e2b.dev/docs/filesystem/read-write
* @see https://e2b.dev/docs/filesystem/watch
*/
/**
* E2B Filesystem
*
* Wraps E2B Sandbox SDK's filesystem operations to implement FilesResource.
* When `reconnectFn` is provided, automatically reconnects on auth errors.
*
* @example
* ```typescript
* // Basic usage (no auto-reconnect)
* const fs = await E2BFilesystem.connect({ sandboxId: '...' });
*
* // With auto-reconnect on token expiry
* const fs = await E2BFilesystem.connect({ sandboxId: '...' });
* fs.setReconnectFn(async () => fetchFreshConnectionInfo());
* ```
*/
var E2BFilesystem = class E2BFilesystem {
	static {
		this.MIN_RECONNECT_INTERVAL_MS = 10 * 1e3;
	}
	constructor(sandbox) {
		this.isReconnecting = false;
		this.reconnectSubscribers = [];
		this.lastReconnectAt = 0;
		this.sandbox = sandbox;
	}
	/**
	* Connect to an E2B Sandbox and create filesystem instance
	*/
	static async connect(info) {
		return new E2BFilesystem(await Sandbox.connect(info.sandboxId, {
			domain: info.domain,
			apiUrl: info.apiUrl,
			requestTimeoutMs: info.requestTimeoutMs,
			debug: info.debug,
			headers: info.headers
		}));
	}
	/**
	* Set reconnect callback. When set, auth errors trigger automatic reconnect + retry.
	*/
	setReconnectFn(fn) {
		this.reconnectFn = fn;
	}
	/**
	* Get the underlying E2B Sandbox instance
	*/
	getSandbox() {
		return this.sandbox;
	}
	isAuthError(error) {
		if (!error || typeof error !== "object") return false;
		const err = error;
		if (err.status === 401 || err.status === 403) return true;
		if (err.statusCode === 401 || err.statusCode === 403) return true;
		if (err.response && typeof err.response === "object") {
			const resp = err.response;
			if (resp.status === 401 || resp.status === 403) return true;
		}
		if (typeof err.message === "string") {
			const msg = err.message.toLowerCase();
			if (msg.includes("unauthorized") || msg.includes("token expired") || msg.includes("authentication")) return true;
		}
		return false;
	}
	canAttemptReconnect() {
		return Date.now() - this.lastReconnectAt >= E2BFilesystem.MIN_RECONNECT_INTERVAL_MS;
	}
	/**
	* Reconnect with fresh credentials.
	* Only one reconnect in-flight at a time; concurrent callers share the result.
	*/
	async reconnect() {
		if (this.isReconnecting) return new Promise((resolve, reject) => {
			this.reconnectSubscribers.push((success) => {
				if (success) resolve();
				else reject(/* @__PURE__ */ new Error("E2B sandbox reconnect failed"));
			});
		});
		this.isReconnecting = true;
		this.lastReconnectAt = Date.now();
		try {
			const info = await this.reconnectFn();
			this.sandbox = await Sandbox.connect(info.sandboxId, {
				domain: info.domain,
				apiUrl: info.apiUrl,
				requestTimeoutMs: info.requestTimeoutMs,
				debug: info.debug,
				headers: info.headers
			});
			this.reconnectSubscribers.forEach((cb) => cb(true));
			this.reconnectSubscribers = [];
		} catch (error) {
			this.reconnectSubscribers.forEach((cb) => cb(false));
			this.reconnectSubscribers = [];
			throw error;
		} finally {
			this.isReconnecting = false;
		}
	}
	/**
	* Execute an operation. If reconnectFn is set and an auth error occurs,
	* reconnect and retry once.
	*/
	async exec(operation) {
		try {
			return await operation(this.sandbox.files);
		} catch (error) {
			if (this.reconnectFn && this.isAuthError(error) && this.canAttemptReconnect()) {
				await this.reconnect();
				return operation(this.sandbox.files);
			}
			throw error;
		}
	}
	read(path, opts) {
		return this.exec((f) => f.read(path, opts));
	}
	write(pathOrFiles, dataOrOpts, opts) {
		return this.exec((f) => {
			if (Array.isArray(pathOrFiles)) return f.write(pathOrFiles, dataOrOpts);
			return f.write(pathOrFiles, dataOrOpts, opts);
		});
	}
	async list(path, opts) {
		return this.exec((f) => f.list(path, opts));
	}
	async exists(path, opts) {
		return this.exec((f) => f.exists(path, opts));
	}
	async makeDir(path, opts) {
		return this.exec((f) => f.makeDir(path, opts));
	}
	async remove(path, opts) {
		return this.exec((f) => f.remove(path, opts));
	}
	async rename(oldPath, newPath, opts) {
		return this.exec((f) => f.rename(oldPath, newPath, opts));
	}
	async getInfo(path, opts) {
		return this.exec((f) => f.getInfo(path, opts));
	}
	async watchDir(path, onEvent, opts) {
		return this.exec((f) => f.watchDir(path, onEvent, opts));
	}
};
//#endregion
exports.E2BFilesystem = E2BFilesystem;
