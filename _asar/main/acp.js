require("./chunk.js");
//#region ../../node_modules/zod/dist/esm/v4/core/core.js
function $constructor(name, initializer, params) {
	function init(inst, def) {
		var _a;
		Object.defineProperty(inst, "_zod", {
			value: inst._zod ?? {},
			enumerable: false
		});
		(_a = inst._zod).traits ?? (_a.traits = /* @__PURE__ */ new Set());
		inst._zod.traits.add(name);
		initializer(inst, def);
		for (const k in _.prototype) if (!(k in inst)) Object.defineProperty(inst, k, { value: _.prototype[k].bind(inst) });
		inst._zod.constr = _;
		inst._zod.def = def;
	}
	const Parent = params?.Parent ?? Object;
	class Definition extends Parent {}
	Object.defineProperty(Definition, "name", { value: name });
	function _(def) {
		var _a;
		const inst = params?.Parent ? new Definition() : this;
		init(inst, def);
		(_a = inst._zod).deferred ?? (_a.deferred = []);
		for (const fn of inst._zod.deferred) fn();
		return inst;
	}
	Object.defineProperty(_, "init", { value: init });
	Object.defineProperty(_, Symbol.hasInstance, { value: (inst) => {
		if (params?.Parent && inst instanceof params.Parent) return true;
		return inst?._zod?.traits?.has(name);
	} });
	Object.defineProperty(_, "name", { value: name });
	return _;
}
var $ZodAsyncError = class extends Error {
	constructor() {
		super(`Encountered Promise during synchronous parse. Use .parseAsync() instead.`);
	}
};
var globalConfig = {};
function config(newConfig) {
	if (newConfig) Object.assign(globalConfig, newConfig);
	return globalConfig;
}
//#endregion
//#region ../../node_modules/zod/dist/esm/v4/core/util.js
function getEnumValues(entries) {
	const numericValues = Object.values(entries).filter((v) => typeof v === "number");
	return Object.entries(entries).filter(([k, _]) => numericValues.indexOf(+k) === -1).map(([_, v]) => v);
}
function jsonStringifyReplacer(_, value) {
	if (typeof value === "bigint") return value.toString();
	return value;
}
function cached(getter) {
	return { get value() {
		{
			const value = getter();
			Object.defineProperty(this, "value", { value });
			return value;
		}
		throw new Error("cached value already set");
	} };
}
function nullish(input) {
	return input === null || input === void 0;
}
function cleanRegex(source) {
	const start = source.startsWith("^") ? 1 : 0;
	const end = source.endsWith("$") ? source.length - 1 : source.length;
	return source.slice(start, end);
}
function floatSafeRemainder(val, step) {
	const valDecCount = (val.toString().split(".")[1] || "").length;
	const stepDecCount = (step.toString().split(".")[1] || "").length;
	const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
	return Number.parseInt(val.toFixed(decCount).replace(".", "")) % Number.parseInt(step.toFixed(decCount).replace(".", "")) / 10 ** decCount;
}
function defineLazy(object, key, getter) {
	Object.defineProperty(object, key, {
		get() {
			{
				const value = getter();
				object[key] = value;
				return value;
			}
			throw new Error("cached value already set");
		},
		set(v) {
			Object.defineProperty(object, key, { value: v });
		},
		configurable: true
	});
}
function assignProp(target, prop, value) {
	Object.defineProperty(target, prop, {
		value,
		writable: true,
		enumerable: true,
		configurable: true
	});
}
function randomString(length = 10) {
	const chars = "abcdefghijklmnopqrstuvwxyz";
	let str = "";
	for (let i = 0; i < length; i++) str += chars[Math.floor(Math.random() * 26)];
	return str;
}
function esc(str) {
	return JSON.stringify(str);
}
var captureStackTrace = Error.captureStackTrace ? Error.captureStackTrace : (..._args) => {};
function isObject(data) {
	return typeof data === "object" && data !== null && !Array.isArray(data);
}
var allowsEval = cached(() => {
	if (typeof navigator !== "undefined" && navigator?.userAgent?.includes("Cloudflare")) return false;
	try {
		new Function("");
		return true;
	} catch (_) {
		return false;
	}
});
function isPlainObject(o) {
	if (isObject(o) === false) return false;
	const ctor = o.constructor;
	if (ctor === void 0) return true;
	const prot = ctor.prototype;
	if (isObject(prot) === false) return false;
	if (Object.prototype.hasOwnProperty.call(prot, "isPrototypeOf") === false) return false;
	return true;
}
var propertyKeyTypes = new Set([
	"string",
	"number",
	"symbol"
]);
function escapeRegex(str) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function clone(inst, def, params) {
	const cl = new inst._zod.constr(def ?? inst._zod.def);
	if (!def || params?.parent) cl._zod.parent = inst;
	return cl;
}
function normalizeParams(_params) {
	const params = _params;
	if (!params) return {};
	if (typeof params === "string") return { error: () => params };
	if (params?.message !== void 0) {
		if (params?.error !== void 0) throw new Error("Cannot specify both `message` and `error` params");
		params.error = params.message;
	}
	delete params.message;
	if (typeof params.error === "string") return {
		...params,
		error: () => params.error
	};
	return params;
}
function optionalKeys(shape) {
	return Object.keys(shape).filter((k) => {
		return shape[k]._zod.optin === "optional" && shape[k]._zod.optout === "optional";
	});
}
var NUMBER_FORMAT_RANGES = {
	safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
	int32: [-2147483648, 2147483647],
	uint32: [0, 4294967295],
	float32: [-34028234663852886e22, 34028234663852886e22],
	float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
};
function pick(schema, mask) {
	const newShape = {};
	const currDef = schema._zod.def;
	for (const key in mask) {
		if (!(key in currDef.shape)) throw new Error(`Unrecognized key: "${key}"`);
		if (!mask[key]) continue;
		newShape[key] = currDef.shape[key];
	}
	return clone(schema, {
		...schema._zod.def,
		shape: newShape,
		checks: []
	});
}
function omit(schema, mask) {
	const newShape = { ...schema._zod.def.shape };
	const currDef = schema._zod.def;
	for (const key in mask) {
		if (!(key in currDef.shape)) throw new Error(`Unrecognized key: "${key}"`);
		if (!mask[key]) continue;
		delete newShape[key];
	}
	return clone(schema, {
		...schema._zod.def,
		shape: newShape,
		checks: []
	});
}
function extend(schema, shape) {
	return clone(schema, {
		...schema._zod.def,
		get shape() {
			const _shape = {
				...schema._zod.def.shape,
				...shape
			};
			assignProp(this, "shape", _shape);
			return _shape;
		},
		checks: []
	});
}
function merge(a, b) {
	return clone(a, {
		...a._zod.def,
		get shape() {
			const _shape = {
				...a._zod.def.shape,
				...b._zod.def.shape
			};
			assignProp(this, "shape", _shape);
			return _shape;
		},
		catchall: b._zod.def.catchall,
		checks: []
	});
}
function partial(Class, schema, mask) {
	const oldShape = schema._zod.def.shape;
	const shape = { ...oldShape };
	if (mask) for (const key in mask) {
		if (!(key in oldShape)) throw new Error(`Unrecognized key: "${key}"`);
		if (!mask[key]) continue;
		shape[key] = Class ? new Class({
			type: "optional",
			innerType: oldShape[key]
		}) : oldShape[key];
	}
	else for (const key in oldShape) shape[key] = Class ? new Class({
		type: "optional",
		innerType: oldShape[key]
	}) : oldShape[key];
	return clone(schema, {
		...schema._zod.def,
		shape,
		checks: []
	});
}
function required(Class, schema, mask) {
	const oldShape = schema._zod.def.shape;
	const shape = { ...oldShape };
	if (mask) for (const key in mask) {
		if (!(key in shape)) throw new Error(`Unrecognized key: "${key}"`);
		if (!mask[key]) continue;
		shape[key] = new Class({
			type: "nonoptional",
			innerType: oldShape[key]
		});
	}
	else for (const key in oldShape) shape[key] = new Class({
		type: "nonoptional",
		innerType: oldShape[key]
	});
	return clone(schema, {
		...schema._zod.def,
		shape,
		checks: []
	});
}
function aborted(x, startIndex = 0) {
	for (let i = startIndex; i < x.issues.length; i++) if (x.issues[i].continue !== true) return true;
	return false;
}
function prefixIssues(path, issues) {
	return issues.map((iss) => {
		var _a;
		(_a = iss).path ?? (_a.path = []);
		iss.path.unshift(path);
		return iss;
	});
}
function unwrapMessage(message) {
	return typeof message === "string" ? message : message?.message;
}
function finalizeIssue(iss, ctx, config) {
	const full = {
		...iss,
		path: iss.path ?? []
	};
	if (!iss.message) full.message = unwrapMessage(iss.inst?._zod.def?.error?.(iss)) ?? unwrapMessage(ctx?.error?.(iss)) ?? unwrapMessage(config.customError?.(iss)) ?? unwrapMessage(config.localeError?.(iss)) ?? "Invalid input";
	delete full.inst;
	delete full.continue;
	if (!ctx?.reportInput) delete full.input;
	return full;
}
function getLengthableOrigin(input) {
	if (Array.isArray(input)) return "array";
	if (typeof input === "string") return "string";
	return "unknown";
}
function issue(...args) {
	const [iss, input, inst] = args;
	if (typeof iss === "string") return {
		message: iss,
		code: "custom",
		input,
		inst
	};
	return { ...iss };
}
//#endregion
//#region ../../node_modules/zod/dist/esm/v4/core/errors.js
var initializer$1 = (inst, def) => {
	inst.name = "$ZodError";
	Object.defineProperty(inst, "_zod", {
		value: inst._zod,
		enumerable: false
	});
	Object.defineProperty(inst, "issues", {
		value: def,
		enumerable: false
	});
	Object.defineProperty(inst, "message", {
		get() {
			return JSON.stringify(def, jsonStringifyReplacer, 2);
		},
		enumerable: true
	});
};
var $ZodError = $constructor("$ZodError", initializer$1);
var $ZodRealError = $constructor("$ZodError", initializer$1, { Parent: Error });
function flattenError(error, mapper = (issue) => issue.message) {
	const fieldErrors = {};
	const formErrors = [];
	for (const sub of error.issues) if (sub.path.length > 0) {
		fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
		fieldErrors[sub.path[0]].push(mapper(sub));
	} else formErrors.push(mapper(sub));
	return {
		formErrors,
		fieldErrors
	};
}
function formatError(error, _mapper) {
	const mapper = _mapper || function(issue) {
		return issue.message;
	};
	const fieldErrors = { _errors: [] };
	const processError = (error) => {
		for (const issue of error.issues) if (issue.code === "invalid_union" && issue.errors.length) issue.errors.map((issues) => processError({ issues }));
		else if (issue.code === "invalid_key") processError({ issues: issue.issues });
		else if (issue.code === "invalid_element") processError({ issues: issue.issues });
		else if (issue.path.length === 0) fieldErrors._errors.push(mapper(issue));
		else {
			let curr = fieldErrors;
			let i = 0;
			while (i < issue.path.length) {
				const el = issue.path[i];
				if (!(i === issue.path.length - 1)) curr[el] = curr[el] || { _errors: [] };
				else {
					curr[el] = curr[el] || { _errors: [] };
					curr[el]._errors.push(mapper(issue));
				}
				curr = curr[el];
				i++;
			}
		}
	};
	processError(error);
	return fieldErrors;
}
//#endregion
//#region ../../node_modules/zod/dist/esm/v4/core/parse.js
var _parse = (_Err) => (schema, value, _ctx, _params) => {
	const ctx = _ctx ? Object.assign(_ctx, { async: false }) : { async: false };
	const result = schema._zod.run({
		value,
		issues: []
	}, ctx);
	if (result instanceof Promise) throw new $ZodAsyncError();
	if (result.issues.length) {
		const e = new (_params?.Err ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
		captureStackTrace(e, _params?.callee);
		throw e;
	}
	return result.value;
};
var _parseAsync = (_Err) => async (schema, value, _ctx, params) => {
	const ctx = _ctx ? Object.assign(_ctx, { async: true }) : { async: true };
	let result = schema._zod.run({
		value,
		issues: []
	}, ctx);
	if (result instanceof Promise) result = await result;
	if (result.issues.length) {
		const e = new (params?.Err ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
		captureStackTrace(e, params?.callee);
		throw e;
	}
	return result.value;
};
var _safeParse = (_Err) => (schema, value, _ctx) => {
	const ctx = _ctx ? {
		..._ctx,
		async: false
	} : { async: false };
	const result = schema._zod.run({
		value,
		issues: []
	}, ctx);
	if (result instanceof Promise) throw new $ZodAsyncError();
	return result.issues.length ? {
		success: false,
		error: new (_Err ?? $ZodError)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
	} : {
		success: true,
		data: result.value
	};
};
var safeParse$1 = /* @__PURE__ */ _safeParse($ZodRealError);
var _safeParseAsync = (_Err) => async (schema, value, _ctx) => {
	const ctx = _ctx ? Object.assign(_ctx, { async: true }) : { async: true };
	let result = schema._zod.run({
		value,
		issues: []
	}, ctx);
	if (result instanceof Promise) result = await result;
	return result.issues.length ? {
		success: false,
		error: new _Err(result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
	} : {
		success: true,
		data: result.value
	};
};
var safeParseAsync$1 = /* @__PURE__ */ _safeParseAsync($ZodRealError);
//#endregion
//#region ../../node_modules/zod/dist/esm/v4/core/regexes.js
var cuid = /^[cC][^\s-]{8,}$/;
var cuid2 = /^[0-9a-z]+$/;
var ulid = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/;
var xid = /^[0-9a-vA-V]{20}$/;
var ksuid = /^[A-Za-z0-9]{27}$/;
var nanoid = /^[a-zA-Z0-9_-]{21}$/;
/** ISO 8601-1 duration regex. Does not support the 8601-2 extensions like negative durations or fractional/negative components. */
var duration$1 = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;
/** A regex for any UUID-like identifier: 8-4-4-4-12 hex pattern */
var guid = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/;
/** Returns a regex for validating an RFC 4122 UUID.
*
* @param version Optionally specify a version 1-8. If no version is specified, all versions are supported. */
var uuid = (version) => {
	if (!version) return /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$/;
	return new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${version}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`);
};
/** Practical email validation */
var email = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;
var _emoji$1 = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
function emoji() {
	return new RegExp(_emoji$1, "u");
}
var ipv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
var ipv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})$/;
var cidrv4 = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/;
var cidrv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
var base64 = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/;
var base64url = /^[A-Za-z0-9_-]*$/;
var hostname = /^([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+$/;
var e164 = /^\+(?:[0-9]){6,14}[0-9]$/;
var dateSource = `(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))`;
var date$1 = /* @__PURE__ */ new RegExp(`^${dateSource}$`);
function timeSource(args) {
	const hhmm = `(?:[01]\\d|2[0-3]):[0-5]\\d`;
	return typeof args.precision === "number" ? args.precision === -1 ? `${hhmm}` : args.precision === 0 ? `${hhmm}:[0-5]\\d` : `${hhmm}:[0-5]\\d\\.\\d{${args.precision}}` : `${hhmm}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function time$1(args) {
	return new RegExp(`^${timeSource(args)}$`);
}
function datetime$1(args) {
	const time = timeSource({ precision: args.precision });
	const opts = ["Z"];
	if (args.local) opts.push("");
	if (args.offset) opts.push(`([+-]\\d{2}:\\d{2})`);
	const timeRegex = `${time}(?:${opts.join("|")})`;
	return new RegExp(`^${dateSource}T(?:${timeRegex})$`);
}
var string$1 = (params) => {
	const regex = params ? `[\\s\\S]{${params?.minimum ?? 0},${params?.maximum ?? ""}}` : `[\\s\\S]*`;
	return new RegExp(`^${regex}$`);
};
var integer = /^\d+$/;
var number$1 = /^-?\d+(?:\.\d+)?/i;
var boolean$1 = /true|false/i;
var lowercase = /^[^A-Z]*$/;
var uppercase = /^[^a-z]*$/;
//#endregion
//#region ../../node_modules/zod/dist/esm/v4/core/checks.js
var $ZodCheck = /* @__PURE__ */ $constructor("$ZodCheck", (inst, def) => {
	var _a;
	inst._zod ?? (inst._zod = {});
	inst._zod.def = def;
	(_a = inst._zod).onattach ?? (_a.onattach = []);
});
var numericOriginMap = {
	number: "number",
	bigint: "bigint",
	object: "date"
};
var $ZodCheckLessThan = /* @__PURE__ */ $constructor("$ZodCheckLessThan", (inst, def) => {
	$ZodCheck.init(inst, def);
	const origin = numericOriginMap[typeof def.value];
	inst._zod.onattach.push((inst) => {
		const bag = inst._zod.bag;
		const curr = (def.inclusive ? bag.maximum : bag.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
		if (def.value < curr) if (def.inclusive) bag.maximum = def.value;
		else bag.exclusiveMaximum = def.value;
	});
	inst._zod.check = (payload) => {
		if (def.inclusive ? payload.value <= def.value : payload.value < def.value) return;
		payload.issues.push({
			origin,
			code: "too_big",
			maximum: def.value,
			input: payload.value,
			inclusive: def.inclusive,
			inst,
			continue: !def.abort
		});
	};
});
var $ZodCheckGreaterThan = /* @__PURE__ */ $constructor("$ZodCheckGreaterThan", (inst, def) => {
	$ZodCheck.init(inst, def);
	const origin = numericOriginMap[typeof def.value];
	inst._zod.onattach.push((inst) => {
		const bag = inst._zod.bag;
		const curr = (def.inclusive ? bag.minimum : bag.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
		if (def.value > curr) if (def.inclusive) bag.minimum = def.value;
		else bag.exclusiveMinimum = def.value;
	});
	inst._zod.check = (payload) => {
		if (def.inclusive ? payload.value >= def.value : payload.value > def.value) return;
		payload.issues.push({
			origin,
			code: "too_small",
			minimum: def.value,
			input: payload.value,
			inclusive: def.inclusive,
			inst,
			continue: !def.abort
		});
	};
});
var $ZodCheckMultipleOf = /* @__PURE__ */ $constructor("$ZodCheckMultipleOf", (inst, def) => {
	$ZodCheck.init(inst, def);
	inst._zod.onattach.push((inst) => {
		var _a;
		(_a = inst._zod.bag).multipleOf ?? (_a.multipleOf = def.value);
	});
	inst._zod.check = (payload) => {
		if (typeof payload.value !== typeof def.value) throw new Error("Cannot mix number and bigint in multiple_of check.");
		if (typeof payload.value === "bigint" ? payload.value % def.value === BigInt(0) : floatSafeRemainder(payload.value, def.value) === 0) return;
		payload.issues.push({
			origin: typeof payload.value,
			code: "not_multiple_of",
			divisor: def.value,
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
var $ZodCheckNumberFormat = /* @__PURE__ */ $constructor("$ZodCheckNumberFormat", (inst, def) => {
	$ZodCheck.init(inst, def);
	def.format = def.format || "float64";
	const isInt = def.format?.includes("int");
	const origin = isInt ? "int" : "number";
	const [minimum, maximum] = NUMBER_FORMAT_RANGES[def.format];
	inst._zod.onattach.push((inst) => {
		const bag = inst._zod.bag;
		bag.format = def.format;
		bag.minimum = minimum;
		bag.maximum = maximum;
		if (isInt) bag.pattern = integer;
	});
	inst._zod.check = (payload) => {
		const input = payload.value;
		if (isInt) {
			if (!Number.isInteger(input)) {
				payload.issues.push({
					expected: origin,
					format: def.format,
					code: "invalid_type",
					input,
					inst
				});
				return;
			}
			if (!Number.isSafeInteger(input)) {
				if (input > 0) payload.issues.push({
					input,
					code: "too_big",
					maximum: Number.MAX_SAFE_INTEGER,
					note: "Integers must be within the safe integer range.",
					inst,
					origin,
					continue: !def.abort
				});
				else payload.issues.push({
					input,
					code: "too_small",
					minimum: Number.MIN_SAFE_INTEGER,
					note: "Integers must be within the safe integer range.",
					inst,
					origin,
					continue: !def.abort
				});
				return;
			}
		}
		if (input < minimum) payload.issues.push({
			origin: "number",
			input,
			code: "too_small",
			minimum,
			inclusive: true,
			inst,
			continue: !def.abort
		});
		if (input > maximum) payload.issues.push({
			origin: "number",
			input,
			code: "too_big",
			maximum,
			inst
		});
	};
});
var $ZodCheckMaxLength = /* @__PURE__ */ $constructor("$ZodCheckMaxLength", (inst, def) => {
	$ZodCheck.init(inst, def);
	inst._zod.when = (payload) => {
		const val = payload.value;
		return !nullish(val) && val.length !== void 0;
	};
	inst._zod.onattach.push((inst) => {
		const curr = inst._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
		if (def.maximum < curr) inst._zod.bag.maximum = def.maximum;
	});
	inst._zod.check = (payload) => {
		const input = payload.value;
		if (input.length <= def.maximum) return;
		const origin = getLengthableOrigin(input);
		payload.issues.push({
			origin,
			code: "too_big",
			maximum: def.maximum,
			inclusive: true,
			input,
			inst,
			continue: !def.abort
		});
	};
});
var $ZodCheckMinLength = /* @__PURE__ */ $constructor("$ZodCheckMinLength", (inst, def) => {
	$ZodCheck.init(inst, def);
	inst._zod.when = (payload) => {
		const val = payload.value;
		return !nullish(val) && val.length !== void 0;
	};
	inst._zod.onattach.push((inst) => {
		const curr = inst._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
		if (def.minimum > curr) inst._zod.bag.minimum = def.minimum;
	});
	inst._zod.check = (payload) => {
		const input = payload.value;
		if (input.length >= def.minimum) return;
		const origin = getLengthableOrigin(input);
		payload.issues.push({
			origin,
			code: "too_small",
			minimum: def.minimum,
			inclusive: true,
			input,
			inst,
			continue: !def.abort
		});
	};
});
var $ZodCheckLengthEquals = /* @__PURE__ */ $constructor("$ZodCheckLengthEquals", (inst, def) => {
	$ZodCheck.init(inst, def);
	inst._zod.when = (payload) => {
		const val = payload.value;
		return !nullish(val) && val.length !== void 0;
	};
	inst._zod.onattach.push((inst) => {
		const bag = inst._zod.bag;
		bag.minimum = def.length;
		bag.maximum = def.length;
		bag.length = def.length;
	});
	inst._zod.check = (payload) => {
		const input = payload.value;
		const length = input.length;
		if (length === def.length) return;
		const origin = getLengthableOrigin(input);
		const tooBig = length > def.length;
		payload.issues.push({
			origin,
			...tooBig ? {
				code: "too_big",
				maximum: def.length
			} : {
				code: "too_small",
				minimum: def.length
			},
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
var $ZodCheckStringFormat = /* @__PURE__ */ $constructor("$ZodCheckStringFormat", (inst, def) => {
	var _a;
	$ZodCheck.init(inst, def);
	inst._zod.onattach.push((inst) => {
		const bag = inst._zod.bag;
		bag.format = def.format;
		if (def.pattern) {
			bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
			bag.patterns.add(def.pattern);
		}
	});
	(_a = inst._zod).check ?? (_a.check = (payload) => {
		if (!def.pattern) throw new Error("Not implemented.");
		def.pattern.lastIndex = 0;
		if (def.pattern.test(payload.value)) return;
		payload.issues.push({
			origin: "string",
			code: "invalid_format",
			format: def.format,
			input: payload.value,
			...def.pattern ? { pattern: def.pattern.toString() } : {},
			inst,
			continue: !def.abort
		});
	});
});
var $ZodCheckRegex = /* @__PURE__ */ $constructor("$ZodCheckRegex", (inst, def) => {
	$ZodCheckStringFormat.init(inst, def);
	inst._zod.check = (payload) => {
		def.pattern.lastIndex = 0;
		if (def.pattern.test(payload.value)) return;
		payload.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "regex",
			input: payload.value,
			pattern: def.pattern.toString(),
			inst,
			continue: !def.abort
		});
	};
});
var $ZodCheckLowerCase = /* @__PURE__ */ $constructor("$ZodCheckLowerCase", (inst, def) => {
	def.pattern ?? (def.pattern = lowercase);
	$ZodCheckStringFormat.init(inst, def);
});
var $ZodCheckUpperCase = /* @__PURE__ */ $constructor("$ZodCheckUpperCase", (inst, def) => {
	def.pattern ?? (def.pattern = uppercase);
	$ZodCheckStringFormat.init(inst, def);
});
var $ZodCheckIncludes = /* @__PURE__ */ $constructor("$ZodCheckIncludes", (inst, def) => {
	$ZodCheck.init(inst, def);
	const escapedRegex = escapeRegex(def.includes);
	const pattern = new RegExp(typeof def.position === "number" ? `^.{${def.position}}${escapedRegex}` : escapedRegex);
	def.pattern = pattern;
	inst._zod.onattach.push((inst) => {
		const bag = inst._zod.bag;
		bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
		bag.patterns.add(pattern);
	});
	inst._zod.check = (payload) => {
		if (payload.value.includes(def.includes, def.position)) return;
		payload.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "includes",
			includes: def.includes,
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
var $ZodCheckStartsWith = /* @__PURE__ */ $constructor("$ZodCheckStartsWith", (inst, def) => {
	$ZodCheck.init(inst, def);
	const pattern = new RegExp(`^${escapeRegex(def.prefix)}.*`);
	def.pattern ?? (def.pattern = pattern);
	inst._zod.onattach.push((inst) => {
		const bag = inst._zod.bag;
		bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
		bag.patterns.add(pattern);
	});
	inst._zod.check = (payload) => {
		if (payload.value.startsWith(def.prefix)) return;
		payload.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "starts_with",
			prefix: def.prefix,
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
var $ZodCheckEndsWith = /* @__PURE__ */ $constructor("$ZodCheckEndsWith", (inst, def) => {
	$ZodCheck.init(inst, def);
	const pattern = new RegExp(`.*${escapeRegex(def.suffix)}$`);
	def.pattern ?? (def.pattern = pattern);
	inst._zod.onattach.push((inst) => {
		const bag = inst._zod.bag;
		bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
		bag.patterns.add(pattern);
	});
	inst._zod.check = (payload) => {
		if (payload.value.endsWith(def.suffix)) return;
		payload.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "ends_with",
			suffix: def.suffix,
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
var $ZodCheckOverwrite = /* @__PURE__ */ $constructor("$ZodCheckOverwrite", (inst, def) => {
	$ZodCheck.init(inst, def);
	inst._zod.check = (payload) => {
		payload.value = def.tx(payload.value);
	};
});
//#endregion
//#region ../../node_modules/zod/dist/esm/v4/core/doc.js
var Doc = class {
	constructor(args = []) {
		this.content = [];
		this.indent = 0;
		if (this) this.args = args;
	}
	indented(fn) {
		this.indent += 1;
		fn(this);
		this.indent -= 1;
	}
	write(arg) {
		if (typeof arg === "function") {
			arg(this, { execution: "sync" });
			arg(this, { execution: "async" });
			return;
		}
		const lines = arg.split("\n").filter((x) => x);
		const minIndent = Math.min(...lines.map((x) => x.length - x.trimStart().length));
		const dedented = lines.map((x) => x.slice(minIndent)).map((x) => " ".repeat(this.indent * 2) + x);
		for (const line of dedented) this.content.push(line);
	}
	compile() {
		const F = Function;
		const args = this?.args;
		const lines = [...(this?.content ?? [``]).map((x) => `  ${x}`)];
		return new F(...args, lines.join("\n"));
	}
};
//#endregion
//#region ../../node_modules/zod/dist/esm/v4/core/versions.js
var version = {
	major: 4,
	minor: 0,
	patch: 0
};
//#endregion
//#region ../../node_modules/zod/dist/esm/v4/core/schemas.js
var $ZodType = /* @__PURE__ */ $constructor("$ZodType", (inst, def) => {
	var _a;
	inst ?? (inst = {});
	defineLazy(inst._zod, "id", () => def.type + "_" + randomString(10));
	inst._zod.def = def;
	inst._zod.bag = inst._zod.bag || {};
	inst._zod.version = version;
	const checks = [...inst._zod.def.checks ?? []];
	if (inst._zod.traits.has("$ZodCheck")) checks.unshift(inst);
	for (const ch of checks) for (const fn of ch._zod.onattach) fn(inst);
	if (checks.length === 0) {
		(_a = inst._zod).deferred ?? (_a.deferred = []);
		inst._zod.deferred?.push(() => {
			inst._zod.run = inst._zod.parse;
		});
	} else {
		const runChecks = (payload, checks, ctx) => {
			let isAborted = aborted(payload);
			let asyncResult;
			for (const ch of checks) {
				if (ch._zod.when) {
					if (!ch._zod.when(payload)) continue;
				} else if (isAborted) continue;
				const currLen = payload.issues.length;
				const _ = ch._zod.check(payload);
				if (_ instanceof Promise && ctx?.async === false) throw new $ZodAsyncError();
				if (asyncResult || _ instanceof Promise) asyncResult = (asyncResult ?? Promise.resolve()).then(async () => {
					await _;
					if (payload.issues.length === currLen) return;
					if (!isAborted) isAborted = aborted(payload, currLen);
				});
				else {
					if (payload.issues.length === currLen) continue;
					if (!isAborted) isAborted = aborted(payload, currLen);
				}
			}
			if (asyncResult) return asyncResult.then(() => {
				return payload;
			});
			return payload;
		};
		inst._zod.run = (payload, ctx) => {
			const result = inst._zod.parse(payload, ctx);
			if (result instanceof Promise) {
				if (ctx.async === false) throw new $ZodAsyncError();
				return result.then((result) => runChecks(result, checks, ctx));
			}
			return runChecks(result, checks, ctx);
		};
	}
	inst["~standard"] = {
		validate: (value) => {
			try {
				const r = safeParse$1(inst, value);
				return r.success ? { value: r.data } : { issues: r.error?.issues };
			} catch (_) {
				return safeParseAsync$1(inst, value).then((r) => r.success ? { value: r.data } : { issues: r.error?.issues });
			}
		},
		vendor: "zod",
		version: 1
	};
});
var $ZodString = /* @__PURE__ */ $constructor("$ZodString", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.pattern = [...inst?._zod.bag?.patterns ?? []].pop() ?? string$1(inst._zod.bag);
	inst._zod.parse = (payload, _) => {
		if (def.coerce) try {
			payload.value = String(payload.value);
		} catch (_) {}
		if (typeof payload.value === "string") return payload;
		payload.issues.push({
			expected: "string",
			code: "invalid_type",
			input: payload.value,
			inst
		});
		return payload;
	};
});
var $ZodStringFormat = /* @__PURE__ */ $constructor("$ZodStringFormat", (inst, def) => {
	$ZodCheckStringFormat.init(inst, def);
	$ZodString.init(inst, def);
});
var $ZodGUID = /* @__PURE__ */ $constructor("$ZodGUID", (inst, def) => {
	def.pattern ?? (def.pattern = guid);
	$ZodStringFormat.init(inst, def);
});
var $ZodUUID = /* @__PURE__ */ $constructor("$ZodUUID", (inst, def) => {
	if (def.version) {
		const v = {
			v1: 1,
			v2: 2,
			v3: 3,
			v4: 4,
			v5: 5,
			v6: 6,
			v7: 7,
			v8: 8
		}[def.version];
		if (v === void 0) throw new Error(`Invalid UUID version: "${def.version}"`);
		def.pattern ?? (def.pattern = uuid(v));
	} else def.pattern ?? (def.pattern = uuid());
	$ZodStringFormat.init(inst, def);
});
var $ZodEmail = /* @__PURE__ */ $constructor("$ZodEmail", (inst, def) => {
	def.pattern ?? (def.pattern = email);
	$ZodStringFormat.init(inst, def);
});
var $ZodURL = /* @__PURE__ */ $constructor("$ZodURL", (inst, def) => {
	$ZodStringFormat.init(inst, def);
	inst._zod.check = (payload) => {
		try {
			const url = new URL(payload.value);
			if (def.hostname) {
				def.hostname.lastIndex = 0;
				if (!def.hostname.test(url.hostname)) payload.issues.push({
					code: "invalid_format",
					format: "url",
					note: "Invalid hostname",
					pattern: hostname.source,
					input: payload.value,
					inst,
					continue: !def.abort
				});
			}
			if (def.protocol) {
				def.protocol.lastIndex = 0;
				if (!def.protocol.test(url.protocol.endsWith(":") ? url.protocol.slice(0, -1) : url.protocol)) payload.issues.push({
					code: "invalid_format",
					format: "url",
					note: "Invalid protocol",
					pattern: def.protocol.source,
					input: payload.value,
					inst,
					continue: !def.abort
				});
			}
			return;
		} catch (_) {
			payload.issues.push({
				code: "invalid_format",
				format: "url",
				input: payload.value,
				inst,
				continue: !def.abort
			});
		}
	};
});
var $ZodEmoji = /* @__PURE__ */ $constructor("$ZodEmoji", (inst, def) => {
	def.pattern ?? (def.pattern = emoji());
	$ZodStringFormat.init(inst, def);
});
var $ZodNanoID = /* @__PURE__ */ $constructor("$ZodNanoID", (inst, def) => {
	def.pattern ?? (def.pattern = nanoid);
	$ZodStringFormat.init(inst, def);
});
var $ZodCUID = /* @__PURE__ */ $constructor("$ZodCUID", (inst, def) => {
	def.pattern ?? (def.pattern = cuid);
	$ZodStringFormat.init(inst, def);
});
var $ZodCUID2 = /* @__PURE__ */ $constructor("$ZodCUID2", (inst, def) => {
	def.pattern ?? (def.pattern = cuid2);
	$ZodStringFormat.init(inst, def);
});
var $ZodULID = /* @__PURE__ */ $constructor("$ZodULID", (inst, def) => {
	def.pattern ?? (def.pattern = ulid);
	$ZodStringFormat.init(inst, def);
});
var $ZodXID = /* @__PURE__ */ $constructor("$ZodXID", (inst, def) => {
	def.pattern ?? (def.pattern = xid);
	$ZodStringFormat.init(inst, def);
});
var $ZodKSUID = /* @__PURE__ */ $constructor("$ZodKSUID", (inst, def) => {
	def.pattern ?? (def.pattern = ksuid);
	$ZodStringFormat.init(inst, def);
});
var $ZodISODateTime = /* @__PURE__ */ $constructor("$ZodISODateTime", (inst, def) => {
	def.pattern ?? (def.pattern = datetime$1(def));
	$ZodStringFormat.init(inst, def);
	inst._zod.check;
});
var $ZodISODate = /* @__PURE__ */ $constructor("$ZodISODate", (inst, def) => {
	def.pattern ?? (def.pattern = date$1);
	$ZodStringFormat.init(inst, def);
});
var $ZodISOTime = /* @__PURE__ */ $constructor("$ZodISOTime", (inst, def) => {
	def.pattern ?? (def.pattern = time$1(def));
	$ZodStringFormat.init(inst, def);
	inst._zod.check;
});
var $ZodISODuration = /* @__PURE__ */ $constructor("$ZodISODuration", (inst, def) => {
	def.pattern ?? (def.pattern = duration$1);
	$ZodStringFormat.init(inst, def);
});
var $ZodIPv4 = /* @__PURE__ */ $constructor("$ZodIPv4", (inst, def) => {
	def.pattern ?? (def.pattern = ipv4);
	$ZodStringFormat.init(inst, def);
	inst._zod.onattach.push((inst) => {
		const bag = inst._zod.bag;
		bag.format = `ipv4`;
	});
});
var $ZodIPv6 = /* @__PURE__ */ $constructor("$ZodIPv6", (inst, def) => {
	def.pattern ?? (def.pattern = ipv6);
	$ZodStringFormat.init(inst, def);
	inst._zod.onattach.push((inst) => {
		const bag = inst._zod.bag;
		bag.format = `ipv6`;
	});
	inst._zod.check = (payload) => {
		try {
			new URL(`http://[${payload.value}]`);
		} catch {
			payload.issues.push({
				code: "invalid_format",
				format: "ipv6",
				input: payload.value,
				inst,
				continue: !def.abort
			});
		}
	};
});
var $ZodCIDRv4 = /* @__PURE__ */ $constructor("$ZodCIDRv4", (inst, def) => {
	def.pattern ?? (def.pattern = cidrv4);
	$ZodStringFormat.init(inst, def);
});
var $ZodCIDRv6 = /* @__PURE__ */ $constructor("$ZodCIDRv6", (inst, def) => {
	def.pattern ?? (def.pattern = cidrv6);
	$ZodStringFormat.init(inst, def);
	inst._zod.check = (payload) => {
		const [address, prefix] = payload.value.split("/");
		try {
			if (!prefix) throw new Error();
			const prefixNum = Number(prefix);
			if (`${prefixNum}` !== prefix) throw new Error();
			if (prefixNum < 0 || prefixNum > 128) throw new Error();
			new URL(`http://[${address}]`);
		} catch {
			payload.issues.push({
				code: "invalid_format",
				format: "cidrv6",
				input: payload.value,
				inst,
				continue: !def.abort
			});
		}
	};
});
function isValidBase64(data) {
	if (data === "") return true;
	if (data.length % 4 !== 0) return false;
	try {
		atob(data);
		return true;
	} catch {
		return false;
	}
}
var $ZodBase64 = /* @__PURE__ */ $constructor("$ZodBase64", (inst, def) => {
	def.pattern ?? (def.pattern = base64);
	$ZodStringFormat.init(inst, def);
	inst._zod.onattach.push((inst) => {
		inst._zod.bag.contentEncoding = "base64";
	});
	inst._zod.check = (payload) => {
		if (isValidBase64(payload.value)) return;
		payload.issues.push({
			code: "invalid_format",
			format: "base64",
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
function isValidBase64URL(data) {
	if (!base64url.test(data)) return false;
	const base64 = data.replace(/[-_]/g, (c) => c === "-" ? "+" : "/");
	return isValidBase64(base64.padEnd(Math.ceil(base64.length / 4) * 4, "="));
}
var $ZodBase64URL = /* @__PURE__ */ $constructor("$ZodBase64URL", (inst, def) => {
	def.pattern ?? (def.pattern = base64url);
	$ZodStringFormat.init(inst, def);
	inst._zod.onattach.push((inst) => {
		inst._zod.bag.contentEncoding = "base64url";
	});
	inst._zod.check = (payload) => {
		if (isValidBase64URL(payload.value)) return;
		payload.issues.push({
			code: "invalid_format",
			format: "base64url",
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
var $ZodE164 = /* @__PURE__ */ $constructor("$ZodE164", (inst, def) => {
	def.pattern ?? (def.pattern = e164);
	$ZodStringFormat.init(inst, def);
});
function isValidJWT(token, algorithm = null) {
	try {
		const tokensParts = token.split(".");
		if (tokensParts.length !== 3) return false;
		const [header] = tokensParts;
		const parsedHeader = JSON.parse(atob(header));
		if ("typ" in parsedHeader && parsedHeader?.typ !== "JWT") return false;
		if (!parsedHeader.alg) return false;
		if (algorithm && (!("alg" in parsedHeader) || parsedHeader.alg !== algorithm)) return false;
		return true;
	} catch {
		return false;
	}
}
var $ZodJWT = /* @__PURE__ */ $constructor("$ZodJWT", (inst, def) => {
	$ZodStringFormat.init(inst, def);
	inst._zod.check = (payload) => {
		if (isValidJWT(payload.value, def.alg)) return;
		payload.issues.push({
			code: "invalid_format",
			format: "jwt",
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
var $ZodNumber = /* @__PURE__ */ $constructor("$ZodNumber", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.pattern = inst._zod.bag.pattern ?? number$1;
	inst._zod.parse = (payload, _ctx) => {
		if (def.coerce) try {
			payload.value = Number(payload.value);
		} catch (_) {}
		const input = payload.value;
		if (typeof input === "number" && !Number.isNaN(input) && Number.isFinite(input)) return payload;
		const received = typeof input === "number" ? Number.isNaN(input) ? "NaN" : !Number.isFinite(input) ? "Infinity" : void 0 : void 0;
		payload.issues.push({
			expected: "number",
			code: "invalid_type",
			input,
			inst,
			...received ? { received } : {}
		});
		return payload;
	};
});
var $ZodNumberFormat = /* @__PURE__ */ $constructor("$ZodNumber", (inst, def) => {
	$ZodCheckNumberFormat.init(inst, def);
	$ZodNumber.init(inst, def);
});
var $ZodBoolean = /* @__PURE__ */ $constructor("$ZodBoolean", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.pattern = boolean$1;
	inst._zod.parse = (payload, _ctx) => {
		if (def.coerce) try {
			payload.value = Boolean(payload.value);
		} catch (_) {}
		const input = payload.value;
		if (typeof input === "boolean") return payload;
		payload.issues.push({
			expected: "boolean",
			code: "invalid_type",
			input,
			inst
		});
		return payload;
	};
});
var $ZodUnknown = /* @__PURE__ */ $constructor("$ZodUnknown", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload) => payload;
});
var $ZodNever = /* @__PURE__ */ $constructor("$ZodNever", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload, _ctx) => {
		payload.issues.push({
			expected: "never",
			code: "invalid_type",
			input: payload.value,
			inst
		});
		return payload;
	};
});
function handleArrayResult(result, final, index) {
	if (result.issues.length) final.issues.push(...prefixIssues(index, result.issues));
	final.value[index] = result.value;
}
var $ZodArray = /* @__PURE__ */ $constructor("$ZodArray", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload, ctx) => {
		const input = payload.value;
		if (!Array.isArray(input)) {
			payload.issues.push({
				expected: "array",
				code: "invalid_type",
				input,
				inst
			});
			return payload;
		}
		payload.value = Array(input.length);
		const proms = [];
		for (let i = 0; i < input.length; i++) {
			const item = input[i];
			const result = def.element._zod.run({
				value: item,
				issues: []
			}, ctx);
			if (result instanceof Promise) proms.push(result.then((result) => handleArrayResult(result, payload, i)));
			else handleArrayResult(result, payload, i);
		}
		if (proms.length) return Promise.all(proms).then(() => payload);
		return payload;
	};
});
function handleObjectResult(result, final, key) {
	if (result.issues.length) final.issues.push(...prefixIssues(key, result.issues));
	final.value[key] = result.value;
}
function handleOptionalObjectResult(result, final, key, input) {
	if (result.issues.length) if (input[key] === void 0) if (key in input) final.value[key] = void 0;
	else final.value[key] = result.value;
	else final.issues.push(...prefixIssues(key, result.issues));
	else if (result.value === void 0) {
		if (key in input) final.value[key] = void 0;
	} else final.value[key] = result.value;
}
var $ZodObject = /* @__PURE__ */ $constructor("$ZodObject", (inst, def) => {
	$ZodType.init(inst, def);
	const _normalized = cached(() => {
		const keys = Object.keys(def.shape);
		for (const k of keys) if (!(def.shape[k] instanceof $ZodType)) throw new Error(`Invalid element at key "${k}": expected a Zod schema`);
		const okeys = optionalKeys(def.shape);
		return {
			shape: def.shape,
			keys,
			keySet: new Set(keys),
			numKeys: keys.length,
			optionalKeys: new Set(okeys)
		};
	});
	defineLazy(inst._zod, "propValues", () => {
		const shape = def.shape;
		const propValues = {};
		for (const key in shape) {
			const field = shape[key]._zod;
			if (field.values) {
				propValues[key] ?? (propValues[key] = /* @__PURE__ */ new Set());
				for (const v of field.values) propValues[key].add(v);
			}
		}
		return propValues;
	});
	const generateFastpass = (shape) => {
		const doc = new Doc([
			"shape",
			"payload",
			"ctx"
		]);
		const { keys, optionalKeys } = _normalized.value;
		const parseStr = (key) => {
			const k = esc(key);
			return `shape[${k}]._zod.run({ value: input[${k}], issues: [] }, ctx)`;
		};
		doc.write(`const input = payload.value;`);
		const ids = Object.create(null);
		for (const key of keys) ids[key] = randomString(15);
		doc.write(`const newResult = {}`);
		for (const key of keys) if (optionalKeys.has(key)) {
			const id = ids[key];
			doc.write(`const ${id} = ${parseStr(key)};`);
			const k = esc(key);
			doc.write(`
        if (${id}.issues.length) {
          if (input[${k}] === undefined) {
            if (${k} in input) {
              newResult[${k}] = undefined;
            }
          } else {
            payload.issues = payload.issues.concat(
              ${id}.issues.map((iss) => ({
                ...iss,
                path: iss.path ? [${k}, ...iss.path] : [${k}],
              }))
            );
          }
        } else if (${id}.value === undefined) {
          if (${k} in input) newResult[${k}] = undefined;
        } else {
          newResult[${k}] = ${id}.value;
        }
        `);
		} else {
			const id = ids[key];
			doc.write(`const ${id} = ${parseStr(key)};`);
			doc.write(`
          if (${id}.issues.length) payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${esc(key)}, ...iss.path] : [${esc(key)}]
          })));`);
			doc.write(`newResult[${esc(key)}] = ${id}.value`);
		}
		doc.write(`payload.value = newResult;`);
		doc.write(`return payload;`);
		const fn = doc.compile();
		return (payload, ctx) => fn(shape, payload, ctx);
	};
	let fastpass;
	const isObject$1 = isObject;
	const jit = !globalConfig.jitless;
	const fastEnabled = jit && allowsEval.value;
	const { catchall } = def;
	let value;
	inst._zod.parse = (payload, ctx) => {
		value ?? (value = _normalized.value);
		const input = payload.value;
		if (!isObject$1(input)) {
			payload.issues.push({
				expected: "object",
				code: "invalid_type",
				input,
				inst
			});
			return payload;
		}
		const proms = [];
		if (jit && fastEnabled && ctx?.async === false && ctx.jitless !== true) {
			if (!fastpass) fastpass = generateFastpass(def.shape);
			payload = fastpass(payload, ctx);
		} else {
			payload.value = {};
			const shape = value.shape;
			for (const key of value.keys) {
				const el = shape[key];
				const r = el._zod.run({
					value: input[key],
					issues: []
				}, ctx);
				const isOptional = el._zod.optin === "optional" && el._zod.optout === "optional";
				if (r instanceof Promise) proms.push(r.then((r) => isOptional ? handleOptionalObjectResult(r, payload, key, input) : handleObjectResult(r, payload, key)));
				else if (isOptional) handleOptionalObjectResult(r, payload, key, input);
				else handleObjectResult(r, payload, key);
			}
		}
		if (!catchall) return proms.length ? Promise.all(proms).then(() => payload) : payload;
		const unrecognized = [];
		const keySet = value.keySet;
		const _catchall = catchall._zod;
		const t = _catchall.def.type;
		for (const key of Object.keys(input)) {
			if (keySet.has(key)) continue;
			if (t === "never") {
				unrecognized.push(key);
				continue;
			}
			const r = _catchall.run({
				value: input[key],
				issues: []
			}, ctx);
			if (r instanceof Promise) proms.push(r.then((r) => handleObjectResult(r, payload, key)));
			else handleObjectResult(r, payload, key);
		}
		if (unrecognized.length) payload.issues.push({
			code: "unrecognized_keys",
			keys: unrecognized,
			input,
			inst
		});
		if (!proms.length) return payload;
		return Promise.all(proms).then(() => {
			return payload;
		});
	};
});
function handleUnionResults(results, final, inst, ctx) {
	for (const result of results) if (result.issues.length === 0) {
		final.value = result.value;
		return final;
	}
	final.issues.push({
		code: "invalid_union",
		input: final.value,
		inst,
		errors: results.map((result) => result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
	});
	return final;
}
var $ZodUnion = /* @__PURE__ */ $constructor("$ZodUnion", (inst, def) => {
	$ZodType.init(inst, def);
	defineLazy(inst._zod, "values", () => {
		if (def.options.every((o) => o._zod.values)) return new Set(def.options.flatMap((option) => Array.from(option._zod.values)));
	});
	defineLazy(inst._zod, "pattern", () => {
		if (def.options.every((o) => o._zod.pattern)) {
			const patterns = def.options.map((o) => o._zod.pattern);
			return new RegExp(`^(${patterns.map((p) => cleanRegex(p.source)).join("|")})$`);
		}
	});
	inst._zod.parse = (payload, ctx) => {
		let async = false;
		const results = [];
		for (const option of def.options) {
			const result = option._zod.run({
				value: payload.value,
				issues: []
			}, ctx);
			if (result instanceof Promise) {
				results.push(result);
				async = true;
			} else {
				if (result.issues.length === 0) return result;
				results.push(result);
			}
		}
		if (!async) return handleUnionResults(results, payload, inst, ctx);
		return Promise.all(results).then((results) => {
			return handleUnionResults(results, payload, inst, ctx);
		});
	};
});
var $ZodIntersection = /* @__PURE__ */ $constructor("$ZodIntersection", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload, ctx) => {
		const { value: input } = payload;
		const left = def.left._zod.run({
			value: input,
			issues: []
		}, ctx);
		const right = def.right._zod.run({
			value: input,
			issues: []
		}, ctx);
		if (left instanceof Promise || right instanceof Promise) return Promise.all([left, right]).then(([left, right]) => {
			return handleIntersectionResults(payload, left, right);
		});
		return handleIntersectionResults(payload, left, right);
	};
});
function mergeValues(a, b) {
	if (a === b) return {
		valid: true,
		data: a
	};
	if (a instanceof Date && b instanceof Date && +a === +b) return {
		valid: true,
		data: a
	};
	if (isPlainObject(a) && isPlainObject(b)) {
		const bKeys = Object.keys(b);
		const sharedKeys = Object.keys(a).filter((key) => bKeys.indexOf(key) !== -1);
		const newObj = {
			...a,
			...b
		};
		for (const key of sharedKeys) {
			const sharedValue = mergeValues(a[key], b[key]);
			if (!sharedValue.valid) return {
				valid: false,
				mergeErrorPath: [key, ...sharedValue.mergeErrorPath]
			};
			newObj[key] = sharedValue.data;
		}
		return {
			valid: true,
			data: newObj
		};
	}
	if (Array.isArray(a) && Array.isArray(b)) {
		if (a.length !== b.length) return {
			valid: false,
			mergeErrorPath: []
		};
		const newArray = [];
		for (let index = 0; index < a.length; index++) {
			const itemA = a[index];
			const itemB = b[index];
			const sharedValue = mergeValues(itemA, itemB);
			if (!sharedValue.valid) return {
				valid: false,
				mergeErrorPath: [index, ...sharedValue.mergeErrorPath]
			};
			newArray.push(sharedValue.data);
		}
		return {
			valid: true,
			data: newArray
		};
	}
	return {
		valid: false,
		mergeErrorPath: []
	};
}
function handleIntersectionResults(result, left, right) {
	if (left.issues.length) result.issues.push(...left.issues);
	if (right.issues.length) result.issues.push(...right.issues);
	if (aborted(result)) return result;
	const merged = mergeValues(left.value, right.value);
	if (!merged.valid) throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(merged.mergeErrorPath)}`);
	result.value = merged.data;
	return result;
}
var $ZodRecord = /* @__PURE__ */ $constructor("$ZodRecord", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload, ctx) => {
		const input = payload.value;
		if (!isPlainObject(input)) {
			payload.issues.push({
				expected: "record",
				code: "invalid_type",
				input,
				inst
			});
			return payload;
		}
		const proms = [];
		if (def.keyType._zod.values) {
			const values = def.keyType._zod.values;
			payload.value = {};
			for (const key of values) if (typeof key === "string" || typeof key === "number" || typeof key === "symbol") {
				const result = def.valueType._zod.run({
					value: input[key],
					issues: []
				}, ctx);
				if (result instanceof Promise) proms.push(result.then((result) => {
					if (result.issues.length) payload.issues.push(...prefixIssues(key, result.issues));
					payload.value[key] = result.value;
				}));
				else {
					if (result.issues.length) payload.issues.push(...prefixIssues(key, result.issues));
					payload.value[key] = result.value;
				}
			}
			let unrecognized;
			for (const key in input) if (!values.has(key)) {
				unrecognized = unrecognized ?? [];
				unrecognized.push(key);
			}
			if (unrecognized && unrecognized.length > 0) payload.issues.push({
				code: "unrecognized_keys",
				input,
				inst,
				keys: unrecognized
			});
		} else {
			payload.value = {};
			for (const key of Reflect.ownKeys(input)) {
				if (key === "__proto__") continue;
				const keyResult = def.keyType._zod.run({
					value: key,
					issues: []
				}, ctx);
				if (keyResult instanceof Promise) throw new Error("Async schemas not supported in object keys currently");
				if (keyResult.issues.length) {
					payload.issues.push({
						origin: "record",
						code: "invalid_key",
						issues: keyResult.issues.map((iss) => finalizeIssue(iss, ctx, config())),
						input: key,
						path: [key],
						inst
					});
					payload.value[keyResult.value] = keyResult.value;
					continue;
				}
				const result = def.valueType._zod.run({
					value: input[key],
					issues: []
				}, ctx);
				if (result instanceof Promise) proms.push(result.then((result) => {
					if (result.issues.length) payload.issues.push(...prefixIssues(key, result.issues));
					payload.value[keyResult.value] = result.value;
				}));
				else {
					if (result.issues.length) payload.issues.push(...prefixIssues(key, result.issues));
					payload.value[keyResult.value] = result.value;
				}
			}
		}
		if (proms.length) return Promise.all(proms).then(() => payload);
		return payload;
	};
});
var $ZodEnum = /* @__PURE__ */ $constructor("$ZodEnum", (inst, def) => {
	$ZodType.init(inst, def);
	const values = getEnumValues(def.entries);
	inst._zod.values = new Set(values);
	inst._zod.pattern = new RegExp(`^(${values.filter((k) => propertyKeyTypes.has(typeof k)).map((o) => typeof o === "string" ? escapeRegex(o) : o.toString()).join("|")})$`);
	inst._zod.parse = (payload, _ctx) => {
		const input = payload.value;
		if (inst._zod.values.has(input)) return payload;
		payload.issues.push({
			code: "invalid_value",
			values,
			input,
			inst
		});
		return payload;
	};
});
var $ZodLiteral = /* @__PURE__ */ $constructor("$ZodLiteral", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.values = new Set(def.values);
	inst._zod.pattern = new RegExp(`^(${def.values.map((o) => typeof o === "string" ? escapeRegex(o) : o ? o.toString() : String(o)).join("|")})$`);
	inst._zod.parse = (payload, _ctx) => {
		const input = payload.value;
		if (inst._zod.values.has(input)) return payload;
		payload.issues.push({
			code: "invalid_value",
			values: def.values,
			input,
			inst
		});
		return payload;
	};
});
var $ZodTransform = /* @__PURE__ */ $constructor("$ZodTransform", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload, _ctx) => {
		const _out = def.transform(payload.value, payload);
		if (_ctx.async) return (_out instanceof Promise ? _out : Promise.resolve(_out)).then((output) => {
			payload.value = output;
			return payload;
		});
		if (_out instanceof Promise) throw new $ZodAsyncError();
		payload.value = _out;
		return payload;
	};
});
var $ZodOptional = /* @__PURE__ */ $constructor("$ZodOptional", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.optin = "optional";
	inst._zod.optout = "optional";
	defineLazy(inst._zod, "values", () => {
		return def.innerType._zod.values ? new Set([...def.innerType._zod.values, void 0]) : void 0;
	});
	defineLazy(inst._zod, "pattern", () => {
		const pattern = def.innerType._zod.pattern;
		return pattern ? new RegExp(`^(${cleanRegex(pattern.source)})?$`) : void 0;
	});
	inst._zod.parse = (payload, ctx) => {
		if (payload.value === void 0) return payload;
		return def.innerType._zod.run(payload, ctx);
	};
});
var $ZodNullable = /* @__PURE__ */ $constructor("$ZodNullable", (inst, def) => {
	$ZodType.init(inst, def);
	defineLazy(inst._zod, "optin", () => def.innerType._zod.optin);
	defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
	defineLazy(inst._zod, "pattern", () => {
		const pattern = def.innerType._zod.pattern;
		return pattern ? new RegExp(`^(${cleanRegex(pattern.source)}|null)$`) : void 0;
	});
	defineLazy(inst._zod, "values", () => {
		return def.innerType._zod.values ? new Set([...def.innerType._zod.values, null]) : void 0;
	});
	inst._zod.parse = (payload, ctx) => {
		if (payload.value === null) return payload;
		return def.innerType._zod.run(payload, ctx);
	};
});
var $ZodDefault = /* @__PURE__ */ $constructor("$ZodDefault", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.optin = "optional";
	defineLazy(inst._zod, "values", () => def.innerType._zod.values);
	inst._zod.parse = (payload, ctx) => {
		if (payload.value === void 0) {
			payload.value = def.defaultValue;
			/**
			* $ZodDefault always returns the default value immediately.
			* It doesn't pass the default value into the validator ("prefault"). There's no reason to pass the default value through validation. The validity of the default is enforced by TypeScript statically. Otherwise, it's the responsibility of the user to ensure the default is valid. In the case of pipes with divergent in/out types, you can specify the default on the `in` schema of your ZodPipe to set a "prefault" for the pipe.   */
			return payload;
		}
		const result = def.innerType._zod.run(payload, ctx);
		if (result instanceof Promise) return result.then((result) => handleDefaultResult(result, def));
		return handleDefaultResult(result, def);
	};
});
function handleDefaultResult(payload, def) {
	if (payload.value === void 0) payload.value = def.defaultValue;
	return payload;
}
var $ZodPrefault = /* @__PURE__ */ $constructor("$ZodPrefault", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.optin = "optional";
	defineLazy(inst._zod, "values", () => def.innerType._zod.values);
	inst._zod.parse = (payload, ctx) => {
		if (payload.value === void 0) payload.value = def.defaultValue;
		return def.innerType._zod.run(payload, ctx);
	};
});
var $ZodNonOptional = /* @__PURE__ */ $constructor("$ZodNonOptional", (inst, def) => {
	$ZodType.init(inst, def);
	defineLazy(inst._zod, "values", () => {
		const v = def.innerType._zod.values;
		return v ? new Set([...v].filter((x) => x !== void 0)) : void 0;
	});
	inst._zod.parse = (payload, ctx) => {
		const result = def.innerType._zod.run(payload, ctx);
		if (result instanceof Promise) return result.then((result) => handleNonOptionalResult(result, inst));
		return handleNonOptionalResult(result, inst);
	};
});
function handleNonOptionalResult(payload, inst) {
	if (!payload.issues.length && payload.value === void 0) payload.issues.push({
		code: "invalid_type",
		expected: "nonoptional",
		input: payload.value,
		inst
	});
	return payload;
}
var $ZodCatch = /* @__PURE__ */ $constructor("$ZodCatch", (inst, def) => {
	$ZodType.init(inst, def);
	defineLazy(inst._zod, "optin", () => def.innerType._zod.optin);
	defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
	defineLazy(inst._zod, "values", () => def.innerType._zod.values);
	inst._zod.parse = (payload, ctx) => {
		const result = def.innerType._zod.run(payload, ctx);
		if (result instanceof Promise) return result.then((result) => {
			payload.value = result.value;
			if (result.issues.length) {
				payload.value = def.catchValue({
					...payload,
					error: { issues: result.issues.map((iss) => finalizeIssue(iss, ctx, config())) },
					input: payload.value
				});
				payload.issues = [];
			}
			return payload;
		});
		payload.value = result.value;
		if (result.issues.length) {
			payload.value = def.catchValue({
				...payload,
				error: { issues: result.issues.map((iss) => finalizeIssue(iss, ctx, config())) },
				input: payload.value
			});
			payload.issues = [];
		}
		return payload;
	};
});
var $ZodPipe = /* @__PURE__ */ $constructor("$ZodPipe", (inst, def) => {
	$ZodType.init(inst, def);
	defineLazy(inst._zod, "values", () => def.in._zod.values);
	defineLazy(inst._zod, "optin", () => def.in._zod.optin);
	defineLazy(inst._zod, "optout", () => def.out._zod.optout);
	inst._zod.parse = (payload, ctx) => {
		const left = def.in._zod.run(payload, ctx);
		if (left instanceof Promise) return left.then((left) => handlePipeResult(left, def, ctx));
		return handlePipeResult(left, def, ctx);
	};
});
function handlePipeResult(left, def, ctx) {
	if (aborted(left)) return left;
	return def.out._zod.run({
		value: left.value,
		issues: left.issues
	}, ctx);
}
var $ZodReadonly = /* @__PURE__ */ $constructor("$ZodReadonly", (inst, def) => {
	$ZodType.init(inst, def);
	defineLazy(inst._zod, "propValues", () => def.innerType._zod.propValues);
	defineLazy(inst._zod, "optin", () => def.innerType._zod.optin);
	defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
	inst._zod.parse = (payload, ctx) => {
		const result = def.innerType._zod.run(payload, ctx);
		if (result instanceof Promise) return result.then(handleReadonlyResult);
		return handleReadonlyResult(result);
	};
});
function handleReadonlyResult(payload) {
	payload.value = Object.freeze(payload.value);
	return payload;
}
var $ZodCustom = /* @__PURE__ */ $constructor("$ZodCustom", (inst, def) => {
	$ZodCheck.init(inst, def);
	$ZodType.init(inst, def);
	inst._zod.parse = (payload, _) => {
		return payload;
	};
	inst._zod.check = (payload) => {
		const input = payload.value;
		const r = def.fn(input);
		if (r instanceof Promise) return r.then((r) => handleRefineResult(r, payload, input, inst));
		handleRefineResult(r, payload, input, inst);
	};
});
function handleRefineResult(result, payload, input, inst) {
	if (!result) {
		const _iss = {
			code: "custom",
			input,
			inst,
			path: [...inst._zod.def.path ?? []],
			continue: !inst._zod.def.abort
		};
		if (inst._zod.def.params) _iss.params = inst._zod.def.params;
		payload.issues.push(issue(_iss));
	}
}
//#endregion
//#region ../../node_modules/zod/dist/esm/v4/core/registries.js
var $ZodRegistry = class {
	constructor() {
		this._map = /* @__PURE__ */ new WeakMap();
		this._idmap = /* @__PURE__ */ new Map();
	}
	add(schema, ..._meta) {
		const meta = _meta[0];
		this._map.set(schema, meta);
		if (meta && typeof meta === "object" && "id" in meta) {
			if (this._idmap.has(meta.id)) throw new Error(`ID ${meta.id} already exists in the registry`);
			this._idmap.set(meta.id, schema);
		}
		return this;
	}
	remove(schema) {
		this._map.delete(schema);
		return this;
	}
	get(schema) {
		const p = schema._zod.parent;
		if (p) {
			const pm = { ...this.get(p) ?? {} };
			delete pm.id;
			return {
				...pm,
				...this._map.get(schema)
			};
		}
		return this._map.get(schema);
	}
	has(schema) {
		return this._map.has(schema);
	}
};
function registry() {
	return new $ZodRegistry();
}
var globalRegistry = /* @__PURE__ */ registry();
//#endregion
//#region ../../node_modules/zod/dist/esm/v4/core/api.js
function _string(Class, params) {
	return new Class({
		type: "string",
		...normalizeParams(params)
	});
}
function _email(Class, params) {
	return new Class({
		type: "string",
		format: "email",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
function _guid(Class, params) {
	return new Class({
		type: "string",
		format: "guid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
function _uuid(Class, params) {
	return new Class({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
function _uuidv4(Class, params) {
	return new Class({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: false,
		version: "v4",
		...normalizeParams(params)
	});
}
function _uuidv6(Class, params) {
	return new Class({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: false,
		version: "v6",
		...normalizeParams(params)
	});
}
function _uuidv7(Class, params) {
	return new Class({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: false,
		version: "v7",
		...normalizeParams(params)
	});
}
function _url(Class, params) {
	return new Class({
		type: "string",
		format: "url",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
function _emoji(Class, params) {
	return new Class({
		type: "string",
		format: "emoji",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
function _nanoid(Class, params) {
	return new Class({
		type: "string",
		format: "nanoid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
function _cuid(Class, params) {
	return new Class({
		type: "string",
		format: "cuid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
function _cuid2(Class, params) {
	return new Class({
		type: "string",
		format: "cuid2",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
function _ulid(Class, params) {
	return new Class({
		type: "string",
		format: "ulid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
function _xid(Class, params) {
	return new Class({
		type: "string",
		format: "xid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
function _ksuid(Class, params) {
	return new Class({
		type: "string",
		format: "ksuid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
function _ipv4(Class, params) {
	return new Class({
		type: "string",
		format: "ipv4",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
function _ipv6(Class, params) {
	return new Class({
		type: "string",
		format: "ipv6",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
function _cidrv4(Class, params) {
	return new Class({
		type: "string",
		format: "cidrv4",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
function _cidrv6(Class, params) {
	return new Class({
		type: "string",
		format: "cidrv6",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
function _base64(Class, params) {
	return new Class({
		type: "string",
		format: "base64",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
function _base64url(Class, params) {
	return new Class({
		type: "string",
		format: "base64url",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
function _e164(Class, params) {
	return new Class({
		type: "string",
		format: "e164",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
function _jwt(Class, params) {
	return new Class({
		type: "string",
		format: "jwt",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
function _isoDateTime(Class, params) {
	return new Class({
		type: "string",
		format: "datetime",
		check: "string_format",
		offset: false,
		local: false,
		precision: null,
		...normalizeParams(params)
	});
}
function _isoDate(Class, params) {
	return new Class({
		type: "string",
		format: "date",
		check: "string_format",
		...normalizeParams(params)
	});
}
function _isoTime(Class, params) {
	return new Class({
		type: "string",
		format: "time",
		check: "string_format",
		precision: null,
		...normalizeParams(params)
	});
}
function _isoDuration(Class, params) {
	return new Class({
		type: "string",
		format: "duration",
		check: "string_format",
		...normalizeParams(params)
	});
}
function _number(Class, params) {
	return new Class({
		type: "number",
		checks: [],
		...normalizeParams(params)
	});
}
function _int(Class, params) {
	return new Class({
		type: "number",
		check: "number_format",
		abort: false,
		format: "safeint",
		...normalizeParams(params)
	});
}
function _boolean(Class, params) {
	return new Class({
		type: "boolean",
		...normalizeParams(params)
	});
}
function _unknown(Class) {
	return new Class({ type: "unknown" });
}
function _never(Class, params) {
	return new Class({
		type: "never",
		...normalizeParams(params)
	});
}
function _lt(value, params) {
	return new $ZodCheckLessThan({
		check: "less_than",
		...normalizeParams(params),
		value,
		inclusive: false
	});
}
function _lte(value, params) {
	return new $ZodCheckLessThan({
		check: "less_than",
		...normalizeParams(params),
		value,
		inclusive: true
	});
}
function _gt(value, params) {
	return new $ZodCheckGreaterThan({
		check: "greater_than",
		...normalizeParams(params),
		value,
		inclusive: false
	});
}
function _gte(value, params) {
	return new $ZodCheckGreaterThan({
		check: "greater_than",
		...normalizeParams(params),
		value,
		inclusive: true
	});
}
function _multipleOf(value, params) {
	return new $ZodCheckMultipleOf({
		check: "multiple_of",
		...normalizeParams(params),
		value
	});
}
function _maxLength(maximum, params) {
	return new $ZodCheckMaxLength({
		check: "max_length",
		...normalizeParams(params),
		maximum
	});
}
function _minLength(minimum, params) {
	return new $ZodCheckMinLength({
		check: "min_length",
		...normalizeParams(params),
		minimum
	});
}
function _length(length, params) {
	return new $ZodCheckLengthEquals({
		check: "length_equals",
		...normalizeParams(params),
		length
	});
}
function _regex(pattern, params) {
	return new $ZodCheckRegex({
		check: "string_format",
		format: "regex",
		...normalizeParams(params),
		pattern
	});
}
function _lowercase(params) {
	return new $ZodCheckLowerCase({
		check: "string_format",
		format: "lowercase",
		...normalizeParams(params)
	});
}
function _uppercase(params) {
	return new $ZodCheckUpperCase({
		check: "string_format",
		format: "uppercase",
		...normalizeParams(params)
	});
}
function _includes(includes, params) {
	return new $ZodCheckIncludes({
		check: "string_format",
		format: "includes",
		...normalizeParams(params),
		includes
	});
}
function _startsWith(prefix, params) {
	return new $ZodCheckStartsWith({
		check: "string_format",
		format: "starts_with",
		...normalizeParams(params),
		prefix
	});
}
function _endsWith(suffix, params) {
	return new $ZodCheckEndsWith({
		check: "string_format",
		format: "ends_with",
		...normalizeParams(params),
		suffix
	});
}
function _overwrite(tx) {
	return new $ZodCheckOverwrite({
		check: "overwrite",
		tx
	});
}
function _normalize(form) {
	return _overwrite((input) => input.normalize(form));
}
function _trim() {
	return _overwrite((input) => input.trim());
}
function _toLowerCase() {
	return _overwrite((input) => input.toLowerCase());
}
function _toUpperCase() {
	return _overwrite((input) => input.toUpperCase());
}
function _array(Class, element, params) {
	return new Class({
		type: "array",
		element,
		...normalizeParams(params)
	});
}
function _refine(Class, fn, _params) {
	return new Class({
		type: "custom",
		check: "custom",
		fn,
		...normalizeParams(_params)
	});
}
//#endregion
//#region ../../node_modules/zod/dist/esm/v4/classic/iso.js
var ZodISODateTime = /* @__PURE__ */ $constructor("ZodISODateTime", (inst, def) => {
	$ZodISODateTime.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function datetime(params) {
	return _isoDateTime(ZodISODateTime, params);
}
var ZodISODate = /* @__PURE__ */ $constructor("ZodISODate", (inst, def) => {
	$ZodISODate.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function date(params) {
	return _isoDate(ZodISODate, params);
}
var ZodISOTime = /* @__PURE__ */ $constructor("ZodISOTime", (inst, def) => {
	$ZodISOTime.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function time(params) {
	return _isoTime(ZodISOTime, params);
}
var ZodISODuration = /* @__PURE__ */ $constructor("ZodISODuration", (inst, def) => {
	$ZodISODuration.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function duration(params) {
	return _isoDuration(ZodISODuration, params);
}
//#endregion
//#region ../../node_modules/zod/dist/esm/v4/classic/errors.js
var initializer = (inst, issues) => {
	$ZodError.init(inst, issues);
	inst.name = "ZodError";
	Object.defineProperties(inst, {
		format: { value: (mapper) => formatError(inst, mapper) },
		flatten: { value: (mapper) => flattenError(inst, mapper) },
		addIssue: { value: (issue) => inst.issues.push(issue) },
		addIssues: { value: (issues) => inst.issues.push(...issues) },
		isEmpty: { get() {
			return inst.issues.length === 0;
		} }
	});
};
var ZodError = $constructor("ZodError", initializer);
var ZodRealError = $constructor("ZodError", initializer, { Parent: Error });
//#endregion
//#region ../../node_modules/zod/dist/esm/v4/classic/parse.js
var parse = /* @__PURE__ */ _parse(ZodRealError);
var parseAsync = /* @__PURE__ */ _parseAsync(ZodRealError);
var safeParse = /* @__PURE__ */ _safeParse(ZodRealError);
var safeParseAsync = /* @__PURE__ */ _safeParseAsync(ZodRealError);
//#endregion
//#region ../../node_modules/zod/dist/esm/v4/classic/schemas.js
var ZodType = /* @__PURE__ */ $constructor("ZodType", (inst, def) => {
	$ZodType.init(inst, def);
	inst.def = def;
	Object.defineProperty(inst, "_def", { value: def });
	inst.check = (...checks) => {
		return inst.clone({
			...def,
			checks: [...def.checks ?? [], ...checks.map((ch) => typeof ch === "function" ? { _zod: {
				check: ch,
				def: { check: "custom" },
				onattach: []
			} } : ch)]
		});
	};
	inst.clone = (def, params) => clone(inst, def, params);
	inst.brand = () => inst;
	inst.register = ((reg, meta) => {
		reg.add(inst, meta);
		return inst;
	});
	inst.parse = (data, params) => parse(inst, data, params, { callee: inst.parse });
	inst.safeParse = (data, params) => safeParse(inst, data, params);
	inst.parseAsync = async (data, params) => parseAsync(inst, data, params, { callee: inst.parseAsync });
	inst.safeParseAsync = async (data, params) => safeParseAsync(inst, data, params);
	inst.spa = inst.safeParseAsync;
	inst.refine = (check, params) => inst.check(refine(check, params));
	inst.superRefine = (refinement) => inst.check(superRefine(refinement));
	inst.overwrite = (fn) => inst.check(_overwrite(fn));
	inst.optional = () => optional(inst);
	inst.nullable = () => nullable(inst);
	inst.nullish = () => optional(nullable(inst));
	inst.nonoptional = (params) => nonoptional(inst, params);
	inst.array = () => array(inst);
	inst.or = (arg) => union([inst, arg]);
	inst.and = (arg) => intersection(inst, arg);
	inst.transform = (tx) => pipe(inst, transform(tx));
	inst.default = (def) => _default(inst, def);
	inst.prefault = (def) => prefault(inst, def);
	inst.catch = (params) => _catch(inst, params);
	inst.pipe = (target) => pipe(inst, target);
	inst.readonly = () => readonly(inst);
	inst.describe = (description) => {
		const cl = inst.clone();
		globalRegistry.add(cl, { description });
		return cl;
	};
	Object.defineProperty(inst, "description", {
		get() {
			return globalRegistry.get(inst)?.description;
		},
		configurable: true
	});
	inst.meta = (...args) => {
		if (args.length === 0) return globalRegistry.get(inst);
		const cl = inst.clone();
		globalRegistry.add(cl, args[0]);
		return cl;
	};
	inst.isOptional = () => inst.safeParse(void 0).success;
	inst.isNullable = () => inst.safeParse(null).success;
	return inst;
});
/** @internal */
var _ZodString = /* @__PURE__ */ $constructor("_ZodString", (inst, def) => {
	$ZodString.init(inst, def);
	ZodType.init(inst, def);
	const bag = inst._zod.bag;
	inst.format = bag.format ?? null;
	inst.minLength = bag.minimum ?? null;
	inst.maxLength = bag.maximum ?? null;
	inst.regex = (...args) => inst.check(_regex(...args));
	inst.includes = (...args) => inst.check(_includes(...args));
	inst.startsWith = (...args) => inst.check(_startsWith(...args));
	inst.endsWith = (...args) => inst.check(_endsWith(...args));
	inst.min = (...args) => inst.check(_minLength(...args));
	inst.max = (...args) => inst.check(_maxLength(...args));
	inst.length = (...args) => inst.check(_length(...args));
	inst.nonempty = (...args) => inst.check(_minLength(1, ...args));
	inst.lowercase = (params) => inst.check(_lowercase(params));
	inst.uppercase = (params) => inst.check(_uppercase(params));
	inst.trim = () => inst.check(_trim());
	inst.normalize = (...args) => inst.check(_normalize(...args));
	inst.toLowerCase = () => inst.check(_toLowerCase());
	inst.toUpperCase = () => inst.check(_toUpperCase());
});
var ZodString = /* @__PURE__ */ $constructor("ZodString", (inst, def) => {
	$ZodString.init(inst, def);
	_ZodString.init(inst, def);
	inst.email = (params) => inst.check(_email(ZodEmail, params));
	inst.url = (params) => inst.check(_url(ZodURL, params));
	inst.jwt = (params) => inst.check(_jwt(ZodJWT, params));
	inst.emoji = (params) => inst.check(_emoji(ZodEmoji, params));
	inst.guid = (params) => inst.check(_guid(ZodGUID, params));
	inst.uuid = (params) => inst.check(_uuid(ZodUUID, params));
	inst.uuidv4 = (params) => inst.check(_uuidv4(ZodUUID, params));
	inst.uuidv6 = (params) => inst.check(_uuidv6(ZodUUID, params));
	inst.uuidv7 = (params) => inst.check(_uuidv7(ZodUUID, params));
	inst.nanoid = (params) => inst.check(_nanoid(ZodNanoID, params));
	inst.guid = (params) => inst.check(_guid(ZodGUID, params));
	inst.cuid = (params) => inst.check(_cuid(ZodCUID, params));
	inst.cuid2 = (params) => inst.check(_cuid2(ZodCUID2, params));
	inst.ulid = (params) => inst.check(_ulid(ZodULID, params));
	inst.base64 = (params) => inst.check(_base64(ZodBase64, params));
	inst.base64url = (params) => inst.check(_base64url(ZodBase64URL, params));
	inst.xid = (params) => inst.check(_xid(ZodXID, params));
	inst.ksuid = (params) => inst.check(_ksuid(ZodKSUID, params));
	inst.ipv4 = (params) => inst.check(_ipv4(ZodIPv4, params));
	inst.ipv6 = (params) => inst.check(_ipv6(ZodIPv6, params));
	inst.cidrv4 = (params) => inst.check(_cidrv4(ZodCIDRv4, params));
	inst.cidrv6 = (params) => inst.check(_cidrv6(ZodCIDRv6, params));
	inst.e164 = (params) => inst.check(_e164(ZodE164, params));
	inst.datetime = (params) => inst.check(datetime(params));
	inst.date = (params) => inst.check(date(params));
	inst.time = (params) => inst.check(time(params));
	inst.duration = (params) => inst.check(duration(params));
});
function string(params) {
	return _string(ZodString, params);
}
var ZodStringFormat = /* @__PURE__ */ $constructor("ZodStringFormat", (inst, def) => {
	$ZodStringFormat.init(inst, def);
	_ZodString.init(inst, def);
});
var ZodEmail = /* @__PURE__ */ $constructor("ZodEmail", (inst, def) => {
	$ZodEmail.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodGUID = /* @__PURE__ */ $constructor("ZodGUID", (inst, def) => {
	$ZodGUID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodUUID = /* @__PURE__ */ $constructor("ZodUUID", (inst, def) => {
	$ZodUUID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodURL = /* @__PURE__ */ $constructor("ZodURL", (inst, def) => {
	$ZodURL.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodEmoji = /* @__PURE__ */ $constructor("ZodEmoji", (inst, def) => {
	$ZodEmoji.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodNanoID = /* @__PURE__ */ $constructor("ZodNanoID", (inst, def) => {
	$ZodNanoID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodCUID = /* @__PURE__ */ $constructor("ZodCUID", (inst, def) => {
	$ZodCUID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodCUID2 = /* @__PURE__ */ $constructor("ZodCUID2", (inst, def) => {
	$ZodCUID2.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodULID = /* @__PURE__ */ $constructor("ZodULID", (inst, def) => {
	$ZodULID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodXID = /* @__PURE__ */ $constructor("ZodXID", (inst, def) => {
	$ZodXID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodKSUID = /* @__PURE__ */ $constructor("ZodKSUID", (inst, def) => {
	$ZodKSUID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodIPv4 = /* @__PURE__ */ $constructor("ZodIPv4", (inst, def) => {
	$ZodIPv4.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodIPv6 = /* @__PURE__ */ $constructor("ZodIPv6", (inst, def) => {
	$ZodIPv6.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodCIDRv4 = /* @__PURE__ */ $constructor("ZodCIDRv4", (inst, def) => {
	$ZodCIDRv4.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodCIDRv6 = /* @__PURE__ */ $constructor("ZodCIDRv6", (inst, def) => {
	$ZodCIDRv6.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodBase64 = /* @__PURE__ */ $constructor("ZodBase64", (inst, def) => {
	$ZodBase64.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodBase64URL = /* @__PURE__ */ $constructor("ZodBase64URL", (inst, def) => {
	$ZodBase64URL.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodE164 = /* @__PURE__ */ $constructor("ZodE164", (inst, def) => {
	$ZodE164.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodJWT = /* @__PURE__ */ $constructor("ZodJWT", (inst, def) => {
	$ZodJWT.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodNumber = /* @__PURE__ */ $constructor("ZodNumber", (inst, def) => {
	$ZodNumber.init(inst, def);
	ZodType.init(inst, def);
	inst.gt = (value, params) => inst.check(_gt(value, params));
	inst.gte = (value, params) => inst.check(_gte(value, params));
	inst.min = (value, params) => inst.check(_gte(value, params));
	inst.lt = (value, params) => inst.check(_lt(value, params));
	inst.lte = (value, params) => inst.check(_lte(value, params));
	inst.max = (value, params) => inst.check(_lte(value, params));
	inst.int = (params) => inst.check(int(params));
	inst.safe = (params) => inst.check(int(params));
	inst.positive = (params) => inst.check(_gt(0, params));
	inst.nonnegative = (params) => inst.check(_gte(0, params));
	inst.negative = (params) => inst.check(_lt(0, params));
	inst.nonpositive = (params) => inst.check(_lte(0, params));
	inst.multipleOf = (value, params) => inst.check(_multipleOf(value, params));
	inst.step = (value, params) => inst.check(_multipleOf(value, params));
	inst.finite = () => inst;
	const bag = inst._zod.bag;
	inst.minValue = Math.max(bag.minimum ?? Number.NEGATIVE_INFINITY, bag.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null;
	inst.maxValue = Math.min(bag.maximum ?? Number.POSITIVE_INFINITY, bag.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null;
	inst.isInt = (bag.format ?? "").includes("int") || Number.isSafeInteger(bag.multipleOf ?? .5);
	inst.isFinite = true;
	inst.format = bag.format ?? null;
});
function number(params) {
	return _number(ZodNumber, params);
}
var ZodNumberFormat = /* @__PURE__ */ $constructor("ZodNumberFormat", (inst, def) => {
	$ZodNumberFormat.init(inst, def);
	ZodNumber.init(inst, def);
});
function int(params) {
	return _int(ZodNumberFormat, params);
}
var ZodBoolean = /* @__PURE__ */ $constructor("ZodBoolean", (inst, def) => {
	$ZodBoolean.init(inst, def);
	ZodType.init(inst, def);
});
function boolean(params) {
	return _boolean(ZodBoolean, params);
}
var ZodUnknown = /* @__PURE__ */ $constructor("ZodUnknown", (inst, def) => {
	$ZodUnknown.init(inst, def);
	ZodType.init(inst, def);
});
function unknown() {
	return _unknown(ZodUnknown);
}
var ZodNever = /* @__PURE__ */ $constructor("ZodNever", (inst, def) => {
	$ZodNever.init(inst, def);
	ZodType.init(inst, def);
});
function never(params) {
	return _never(ZodNever, params);
}
var ZodArray = /* @__PURE__ */ $constructor("ZodArray", (inst, def) => {
	$ZodArray.init(inst, def);
	ZodType.init(inst, def);
	inst.element = def.element;
	inst.min = (minLength, params) => inst.check(_minLength(minLength, params));
	inst.nonempty = (params) => inst.check(_minLength(1, params));
	inst.max = (maxLength, params) => inst.check(_maxLength(maxLength, params));
	inst.length = (len, params) => inst.check(_length(len, params));
	inst.unwrap = () => inst.element;
});
function array(element, params) {
	return _array(ZodArray, element, params);
}
var ZodObject = /* @__PURE__ */ $constructor("ZodObject", (inst, def) => {
	$ZodObject.init(inst, def);
	ZodType.init(inst, def);
	defineLazy(inst, "shape", () => def.shape);
	inst.keyof = () => _enum(Object.keys(inst._zod.def.shape));
	inst.catchall = (catchall) => inst.clone({
		...inst._zod.def,
		catchall
	});
	inst.passthrough = () => inst.clone({
		...inst._zod.def,
		catchall: unknown()
	});
	inst.loose = () => inst.clone({
		...inst._zod.def,
		catchall: unknown()
	});
	inst.strict = () => inst.clone({
		...inst._zod.def,
		catchall: never()
	});
	inst.strip = () => inst.clone({
		...inst._zod.def,
		catchall: void 0
	});
	inst.extend = (incoming) => {
		return extend(inst, incoming);
	};
	inst.merge = (other) => merge(inst, other);
	inst.pick = (mask) => pick(inst, mask);
	inst.omit = (mask) => omit(inst, mask);
	inst.partial = (...args) => partial(ZodOptional, inst, args[0]);
	inst.required = (...args) => required(ZodNonOptional, inst, args[0]);
});
function object(shape, params) {
	return new ZodObject({
		type: "object",
		get shape() {
			assignProp(this, "shape", { ...shape });
			return this.shape;
		},
		...normalizeParams(params)
	});
}
var ZodUnion = /* @__PURE__ */ $constructor("ZodUnion", (inst, def) => {
	$ZodUnion.init(inst, def);
	ZodType.init(inst, def);
	inst.options = def.options;
});
function union(options, params) {
	return new ZodUnion({
		type: "union",
		options,
		...normalizeParams(params)
	});
}
var ZodIntersection = /* @__PURE__ */ $constructor("ZodIntersection", (inst, def) => {
	$ZodIntersection.init(inst, def);
	ZodType.init(inst, def);
});
function intersection(left, right) {
	return new ZodIntersection({
		type: "intersection",
		left,
		right
	});
}
var ZodRecord = /* @__PURE__ */ $constructor("ZodRecord", (inst, def) => {
	$ZodRecord.init(inst, def);
	ZodType.init(inst, def);
	inst.keyType = def.keyType;
	inst.valueType = def.valueType;
});
function record(keyType, valueType, params) {
	return new ZodRecord({
		type: "record",
		keyType,
		valueType,
		...normalizeParams(params)
	});
}
var ZodEnum = /* @__PURE__ */ $constructor("ZodEnum", (inst, def) => {
	$ZodEnum.init(inst, def);
	ZodType.init(inst, def);
	inst.enum = def.entries;
	inst.options = Object.values(def.entries);
	const keys = new Set(Object.keys(def.entries));
	inst.extract = (values, params) => {
		const newEntries = {};
		for (const value of values) if (keys.has(value)) newEntries[value] = def.entries[value];
		else throw new Error(`Key ${value} not found in enum`);
		return new ZodEnum({
			...def,
			checks: [],
			...normalizeParams(params),
			entries: newEntries
		});
	};
	inst.exclude = (values, params) => {
		const newEntries = { ...def.entries };
		for (const value of values) if (keys.has(value)) delete newEntries[value];
		else throw new Error(`Key ${value} not found in enum`);
		return new ZodEnum({
			...def,
			checks: [],
			...normalizeParams(params),
			entries: newEntries
		});
	};
});
function _enum(values, params) {
	return new ZodEnum({
		type: "enum",
		entries: Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values,
		...normalizeParams(params)
	});
}
var ZodLiteral = /* @__PURE__ */ $constructor("ZodLiteral", (inst, def) => {
	$ZodLiteral.init(inst, def);
	ZodType.init(inst, def);
	inst.values = new Set(def.values);
	Object.defineProperty(inst, "value", { get() {
		if (def.values.length > 1) throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
		return def.values[0];
	} });
});
function literal(value, params) {
	return new ZodLiteral({
		type: "literal",
		values: Array.isArray(value) ? value : [value],
		...normalizeParams(params)
	});
}
var ZodTransform = /* @__PURE__ */ $constructor("ZodTransform", (inst, def) => {
	$ZodTransform.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.parse = (payload, _ctx) => {
		payload.addIssue = (issue$1) => {
			if (typeof issue$1 === "string") payload.issues.push(issue(issue$1, payload.value, def));
			else {
				const _issue = issue$1;
				if (_issue.fatal) _issue.continue = false;
				_issue.code ?? (_issue.code = "custom");
				_issue.input ?? (_issue.input = payload.value);
				_issue.inst ?? (_issue.inst = inst);
				_issue.continue ?? (_issue.continue = true);
				payload.issues.push(issue(_issue));
			}
		};
		const output = def.transform(payload.value, payload);
		if (output instanceof Promise) return output.then((output) => {
			payload.value = output;
			return payload;
		});
		payload.value = output;
		return payload;
	};
});
function transform(fn) {
	return new ZodTransform({
		type: "transform",
		transform: fn
	});
}
var ZodOptional = /* @__PURE__ */ $constructor("ZodOptional", (inst, def) => {
	$ZodOptional.init(inst, def);
	ZodType.init(inst, def);
	inst.unwrap = () => inst._zod.def.innerType;
});
function optional(innerType) {
	return new ZodOptional({
		type: "optional",
		innerType
	});
}
var ZodNullable = /* @__PURE__ */ $constructor("ZodNullable", (inst, def) => {
	$ZodNullable.init(inst, def);
	ZodType.init(inst, def);
	inst.unwrap = () => inst._zod.def.innerType;
});
function nullable(innerType) {
	return new ZodNullable({
		type: "nullable",
		innerType
	});
}
var ZodDefault = /* @__PURE__ */ $constructor("ZodDefault", (inst, def) => {
	$ZodDefault.init(inst, def);
	ZodType.init(inst, def);
	inst.unwrap = () => inst._zod.def.innerType;
	inst.removeDefault = inst.unwrap;
});
function _default(innerType, defaultValue) {
	return new ZodDefault({
		type: "default",
		innerType,
		get defaultValue() {
			return typeof defaultValue === "function" ? defaultValue() : defaultValue;
		}
	});
}
var ZodPrefault = /* @__PURE__ */ $constructor("ZodPrefault", (inst, def) => {
	$ZodPrefault.init(inst, def);
	ZodType.init(inst, def);
	inst.unwrap = () => inst._zod.def.innerType;
});
function prefault(innerType, defaultValue) {
	return new ZodPrefault({
		type: "prefault",
		innerType,
		get defaultValue() {
			return typeof defaultValue === "function" ? defaultValue() : defaultValue;
		}
	});
}
var ZodNonOptional = /* @__PURE__ */ $constructor("ZodNonOptional", (inst, def) => {
	$ZodNonOptional.init(inst, def);
	ZodType.init(inst, def);
	inst.unwrap = () => inst._zod.def.innerType;
});
function nonoptional(innerType, params) {
	return new ZodNonOptional({
		type: "nonoptional",
		innerType,
		...normalizeParams(params)
	});
}
var ZodCatch = /* @__PURE__ */ $constructor("ZodCatch", (inst, def) => {
	$ZodCatch.init(inst, def);
	ZodType.init(inst, def);
	inst.unwrap = () => inst._zod.def.innerType;
	inst.removeCatch = inst.unwrap;
});
function _catch(innerType, catchValue) {
	return new ZodCatch({
		type: "catch",
		innerType,
		catchValue: typeof catchValue === "function" ? catchValue : () => catchValue
	});
}
var ZodPipe = /* @__PURE__ */ $constructor("ZodPipe", (inst, def) => {
	$ZodPipe.init(inst, def);
	ZodType.init(inst, def);
	inst.in = def.in;
	inst.out = def.out;
});
function pipe(in_, out) {
	return new ZodPipe({
		type: "pipe",
		in: in_,
		out
	});
}
var ZodReadonly = /* @__PURE__ */ $constructor("ZodReadonly", (inst, def) => {
	$ZodReadonly.init(inst, def);
	ZodType.init(inst, def);
});
function readonly(innerType) {
	return new ZodReadonly({
		type: "readonly",
		innerType
	});
}
var ZodCustom = /* @__PURE__ */ $constructor("ZodCustom", (inst, def) => {
	$ZodCustom.init(inst, def);
	ZodType.init(inst, def);
});
function check(fn, params) {
	const ch = new $ZodCheck({
		check: "custom",
		...normalizeParams(params)
	});
	ch._zod.check = fn;
	return ch;
}
function refine(fn, _params = {}) {
	return _refine(ZodCustom, fn, _params);
}
function superRefine(fn, params) {
	const ch = check((payload) => {
		payload.addIssue = (issue$2) => {
			if (typeof issue$2 === "string") payload.issues.push(issue(issue$2, payload.value, ch._zod.def));
			else {
				const _issue = issue$2;
				if (_issue.fatal) _issue.continue = false;
				_issue.code ?? (_issue.code = "custom");
				_issue.input ?? (_issue.input = payload.value);
				_issue.inst ?? (_issue.inst = ch);
				_issue.continue ?? (_issue.continue = !ch._zod.def.abort);
				payload.issues.push(issue(_issue));
			}
		};
		return fn(payload.value, payload);
	}, params);
	return ch;
}
/** A special constant with type `never` */
var NEVER = Object.freeze({ status: "aborted" });
//#endregion
//#region ../../node_modules/@agentclientprotocol/sdk/dist/schema/index.js
var AGENT_METHODS = {
	authenticate: "authenticate",
	document_did_change: "document/didChange",
	document_did_close: "document/didClose",
	document_did_focus: "document/didFocus",
	document_did_open: "document/didOpen",
	document_did_save: "document/didSave",
	initialize: "initialize",
	logout: "logout",
	mcp_message: "mcp/message",
	nes_accept: "nes/accept",
	nes_close: "nes/close",
	nes_reject: "nes/reject",
	nes_start: "nes/start",
	nes_suggest: "nes/suggest",
	providers_disable: "providers/disable",
	providers_list: "providers/list",
	providers_set: "providers/set",
	session_cancel: "session/cancel",
	session_close: "session/close",
	session_delete: "session/delete",
	session_fork: "session/fork",
	session_list: "session/list",
	session_load: "session/load",
	session_new: "session/new",
	session_prompt: "session/prompt",
	session_resume: "session/resume",
	session_set_config_option: "session/set_config_option",
	session_set_mode: "session/set_mode"
};
var CLIENT_METHODS = {
	elicitation_complete: "elicitation/complete",
	elicitation_create: "elicitation/create",
	fs_read_text_file: "fs/read_text_file",
	fs_write_text_file: "fs/write_text_file",
	mcp_connect: "mcp/connect",
	mcp_disconnect: "mcp/disconnect",
	mcp_message: "mcp/message",
	session_request_permission: "session/request_permission",
	session_update: "session/update",
	terminal_create: "terminal/create",
	terminal_kill: "terminal/kill",
	terminal_output: "terminal/output",
	terminal_release: "terminal/release",
	terminal_wait_for_exit: "terminal/wait_for_exit"
};
var PROTOCOL_VERSION = 1;
//#endregion
//#region ../../node_modules/@agentclientprotocol/sdk/dist/schema-deserialize.js
var skippedItem = Symbol("skippedItem");
function defaultOnError(schema, fallback) {
	return schema.catch(fallback);
}
function requiredDefaultOnError(schema, fallback) {
	const schemaWithCatch = schema.catch(fallback);
	return unknown().transform((value, context) => {
		if (value !== void 0) return schemaWithCatch.parse(value);
		context.addIssue({
			code: "custom",
			message: "Required value is missing"
		});
		return NEVER;
	});
}
function vecSkipError(itemSchema) {
	return array(itemSchema.catch(skippedItem)).transform((items) => items.filter((item) => item !== skippedItem));
}
//#endregion
//#region ../../node_modules/@agentclientprotocol/sdk/dist/schema/zod.gen.js
/**
* **UNSTABLE**
*
* This capability is not part of the spec yet, and may be removed or changed at any point.
*
* Authentication capabilities supported by the client.
*
* Advertised during initialization to inform the agent which authentication
* method types the client can handle. This governs opt-in types that require
* additional client-side support.
*
* @experimental
*/
var zAuthCapabilities = object({
	_meta: record(string(), unknown()).nullish(),
	terminal: boolean().optional().default(false)
});
/**
* **UNSTABLE**
*
* This capability is not part of the spec yet, and may be removed or changed at any point.
*
* Describes a single environment variable for an [`AuthMethodEnvVar`] authentication method.
*
* @experimental
*/
var zAuthEnvVar = object({
	_meta: record(string(), unknown()).nullish(),
	label: string().nullish(),
	name: string(),
	optional: boolean().optional().default(false),
	secret: boolean().optional().default(true)
});
/**
* Agent handles authentication itself.
*
* This is the default authentication method type.
*/
var zAuthMethodAgent = object({
	_meta: record(string(), unknown()).nullish(),
	description: string().nullish(),
	id: string(),
	name: string()
});
/**
* **UNSTABLE**
*
* This capability is not part of the spec yet, and may be removed or changed at any point.
*
* Environment variable authentication method.
*
* The user provides credentials that the client passes to the agent as environment variables.
*
* @experimental
*/
var zAuthMethodEnvVar = object({
	_meta: record(string(), unknown()).nullish(),
	description: string().nullish(),
	id: string(),
	link: string().nullish(),
	name: string(),
	vars: array(zAuthEnvVar)
});
/**
* **UNSTABLE**
*
* This capability is not part of the spec yet, and may be removed or changed at any point.
*
* Terminal-based authentication method.
*
* The client runs an interactive terminal for the user to authenticate via a TUI.
*
* @experimental
*/
var zAuthMethodTerminal = object({
	_meta: record(string(), unknown()).nullish(),
	args: array(string()).optional(),
	description: string().nullish(),
	env: record(string(), string()).optional(),
	id: string(),
	name: string()
});
/**
* Describes an available authentication method.
*
* The `type` field acts as the discriminator in the serialized JSON form.
* When no `type` is present, the method is treated as `agent`.
*/
var zAuthMethod = union([
	zAuthMethodEnvVar.and(object({ type: literal("env_var") })),
	zAuthMethodTerminal.and(object({ type: literal("terminal") })),
	zAuthMethodAgent
]);
/**
* Request parameters for the authenticate method.
*
* Specifies which authentication method to use.
*/
var zAuthenticateRequest = object({
	_meta: record(string(), unknown()).nullish(),
	methodId: string()
});
/**
* Response to the `authenticate` method.
*/
var zAuthenticateResponse = object({ _meta: record(string(), unknown()).nullish() });
/**
* Binary resource contents.
*/
var zBlobResourceContents = object({
	_meta: record(string(), unknown()).nullish(),
	blob: string(),
	mimeType: string().nullish(),
	uri: string()
});
/**
* Schema for boolean properties in an elicitation form.
*/
var zBooleanPropertySchema = object({
	default: boolean().nullish(),
	description: string().nullish(),
	title: string().nullish()
});
/**
* Response from closing an NES session.
*/
var zCloseNesResponse = object({ _meta: record(string(), unknown()).nullish() });
/**
* Response from closing a session.
*/
var zCloseSessionResponse = object({ _meta: record(string(), unknown()).nullish() });
/**
* Cost information for a session.
*/
var zCost = object({
	amount: number(),
	currency: string()
});
/**
* Response containing the ID of the created terminal.
*/
var zCreateTerminalResponse = object({
	_meta: record(string(), unknown()).nullish(),
	terminalId: string()
});
/**
* Response from deleting a session.
*/
var zDeleteSessionResponse = object({ _meta: record(string(), unknown()).nullish() });
/**
* A diff representing file modifications.
*
* Shows changes to files in a format suitable for display in the client UI.
*
* See protocol docs: [Content](https://agentclientprotocol.com/protocol/tool-calls#content)
*/
var zDiff = object({
	_meta: record(string(), unknown()).nullish(),
	newText: string(),
	oldText: string().nullish(),
	path: string()
});
/**
* **UNSTABLE**
*
* This capability is not part of the spec yet, and may be removed or changed at any point.
*
* Request parameters for `providers/disable`.
*
* @experimental
*/
var zDisableProviderRequest = object({
	_meta: record(string(), unknown()).nullish(),
	id: string()
});
/**
* **UNSTABLE**
*
* This capability is not part of the spec yet, and may be removed or changed at any point.
*
* Response to `providers/disable`.
*
* @experimental
*/
var zDisableProviderResponse = object({ _meta: record(string(), unknown()).nullish() });
/**
* **UNSTABLE**
*
* This capability is not part of the spec yet, and may be removed or changed at any point.
*
* Response to `mcp/disconnect`.
*
* @experimental
*/
var zDisconnectMcpResponse = object({ _meta: record(string(), unknown()).nullish() });
var zElicitationContentValue = union([
	string(),
	number(),
	number(),
	boolean(),
	array(string())
]);
/**
* **UNSTABLE**
*
* This capability is not part of the spec yet, and may be removed or changed at any point.
*
* Response from the client to an elicitation request.
*
* @experimental
*/
var zCreateElicitationResponse = intersection(union([
	object({ content: record(string(), zElicitationContentValue).nullish() }).and(object({ action: literal("accept") })),
	object({ action: literal("decline") }),
	object({ action: literal("cancel") })
]), object({ _meta: record(string(), unknown()).nullish() }));
/**
* **UNSTABLE**
*
* This capability is not part of the spec yet, and may be removed or changed at any point.
*
* Form-based elicitation capabilities.
*
* @experimental
*/
var zElicitationFormCapabilities = object({ _meta: record(string(), unknown()).nullish() });
/**
* **UNSTABLE**
*
* This capability is not part of the spec yet, and may be removed or changed at any point.
*
* Unique identifier for an elicitation.
*
* @experimental
*/
var zElicitationId = string();
/**
* **UNSTABLE**
*
* This capability is not part of the spec yet, and may be removed or changed at any point.
*
* Notification sent by the agent when a URL-based elicitation is complete.
*
* @experimental
*/
var zCompleteElicitationNotification = object({
	_meta: record(string(), unknown()).nullish(),
	elicitationId: zElicitationId
});
/**
* Object schema type.
*/
var zElicitationSchemaType = literal("object");
/**
* String schema type.
*/
var zElicitationStringType = literal("string");
/**
* **UNSTABLE**
*
* This capability is not part of the spec yet, and may be removed or changed at any point.
*
* URL-based elicitation capabilities.
*
* @experimental
*/
var zElicitationUrlCapabilities = object({ _meta: record(string(), unknown()).nullish() });
/**
* **UNSTABLE**
*
* This capability is not part of the spec yet, and may be removed or changed at any point.
*
* Elicitation capabilities supported by the client.
*
* @experimental
*/
var zElicitationCapabilities = object({
	_meta: record(string(), unknown()).nullish(),
	form: defaultOnError(zElicitationFormCapabilities.nullish(), () => void 0),
	url: defaultOnError(zElicitationUrlCapabilities.nullish(), () => void 0)
});
/**
* A titled enum option with a const value and human-readable title.
*/
var zEnumOption = object({
	const: string(),
	title: string()
});
/**
* An environment variable to set when launching an MCP server.
*/
var zEnvVariable = object({
	_meta: record(string(), unknown()).nullish(),
	name: string(),
	value: string()
});
/**
* JSON-RPC error object.
*
* Represents an error that occurred during method execution, following the
* JSON-RPC 2.0 error object specification with optional additional data.
*
* See protocol docs: [JSON-RPC Error Object](https://www.jsonrpc.org/specification#error_object)
*/
var zError = object({
	code: union([
		literal(-32700),
		literal(-32600),
		literal(-32601),
		literal(-32602),
		literal(-32603),
		literal(-32800),
		literal(-32e3),
		literal(-32002),
		literal(-32042),
		number().int().min(-2147483648, { message: "Invalid value: Expected int32 to be >= -2147483648" }).max(2147483647, { message: "Invalid value: Expected int32 to be <= 2147483647" })
	]),
	data: unknown().optional(),
	message: string()
});
/**
* Allows the Agent to send an arbitrary notification that is not part of the ACP spec.
* Extension notifications provide a way to send one-way messages for custom functionality
* while maintaining protocol compatibility.
*
* See protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)
*/
var zExtNotification = unknown();
/**
* Allows for sending an arbitrary request that is not part of the ACP spec.
* Extension methods provide a way to add custom functionality while maintaining
* protocol compatibility.
*
* See protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)
*/
var zExtRequest = unknown();
/**
* Allows for sending an arbitrary response to an [`ExtRequest`] that is not part of the ACP spec.
* Extension methods provide a way to add custom functionality while maintaining
* protocol compatibility.
*
* See protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)
*/
var zExtResponse = unknown();
/**
* File system capabilities that a client may support.
*
* See protocol docs: [FileSystem](https://agentclientprotocol.com/protocol/initialization#filesystem)
*/
var zFileSystemCapabilities = object({
	_meta: record(string(), unknown()).nullish(),
	readTextFile: boolean().optional().default(false),
	writeTextFile: boolean().optional().default(false)
});
/**
* An HTTP header to set when making requests to the MCP server.
*/
var zHttpHeader = object({
	_meta: record(string(), unknown()).nullish(),
	name: string(),
	value: string()
});
/**
* Metadata about the implementation of the client or agent.
* Describes the name and version of an MCP implementation, with an optional
* title for UI representation.
*/
var zImplementation = object({
	_meta: record(string(), unknown()).nullish(),
	name: string(),
	title: string().nullish(),
	version: string()
});
/**
* Schema for integer properties in an elicitation form.
*/
var zIntegerPropertySchema = object({
	default: number().nullish(),
	description: string().nullish(),
	maximum: number().nullish(),
	minimum: number().nullish(),
	title: string().nullish()
});
/**
* Response to `terminal/kill` method
*/
var zKillTerminalResponse = object({ _meta: record(string(), unknown()).nullish() });
/**
* **UNSTABLE**
*
* This capability is not part of the spec yet, and may be removed or changed at any point.
*
* Request parameters for `providers/list`.
*
* @experimental
*/
var zListProvidersRequest = object({ _meta: record(string(), unknown()).nullish() });
/**
* Request parameters for listing existing sessions.
*
* Only available if the Agent supports the `sessionCapabilities.list` capability.
*/
var zListSessionsRequest = object({
	_meta: record(string(), unknown()).nullish(),
	cursor: string().nullish(),
	cwd: string().nullish()
});
/**
* **UNSTABLE**
*
* This capability is not part of the spec yet, and may be removed or changed at any point.
*
* Well-known API protocol identifiers for LLM providers.
*
* Agents and clients MUST handle unknown protocol identifiers gracefully.
*
* Protocol names beginning with `_` are free for custom use, like other ACP extension methods.
* Protocol names that do not begin with `_` are reserved for the ACP spec.
*
* @experimental
*/
var zLlmProtocol = union([
	literal("anthropic"),
	literal("openai"),
	literal("azure"),
	literal("vertex"),
	literal("bedrock"),
	string()
]);
/**
* Logout capabilities supported by the agent.
*
* By supplying `{}` it means that the agent supports the logout method.
*/
var zLogoutCapabilities = object({ _meta: record(string(), unknown()).nullish() });
/**
* Authentication-related capabilities supported by the agent.
*/
var zAgentAuthCapabilities = object({
	_meta: record(string(), unknown()).nullish(),
	logout: defaultOnError(zLogoutCapabilities.nullish(), () => void 0)
});
/**
* Request parameters for the logout method.
*
* Terminates the current authenticated session.
*/
var zLogoutRequest = object({ _meta: record(string(), unknown()).nullish() });
/**
* Response to the `logout` method.
*/
var zLogoutResponse = object({ _meta: record(string(), unknown()).nullish() });
/**
* MCP capabilities supported by the agent
*/
var zMcpCapabilities = object({
	_meta: record(string(), unknown()).nullish(),
	acp: boolean().optional().default(false),
	http: boolean().optional().default(false),
	sse: boolean().optional().default(false)
});
/**
* **UNSTABLE**
*
* This capability is not part of the spec yet, and may be removed or changed at any point.
*
* A unique identifier for an active MCP-over-ACP connection.
*
* @experimental
*/
var zMcpConnectionId = string();
/**
* **UNSTABLE**
*
* This capability is not part of the spec yet, and may be removed or changed at any point.
*
* Response to `mcp/connect`.
*
* @experimental
*/
var zConnectMcpResponse = object({
	_meta: record(string(), unknown()).nullish(),
	connectionId: zMcpConnectionId
});
/**
* **UNSTABLE**
*
* This capability is not part of the spec yet, and may be removed or changed at any point.
*
* Request parameters for `mcp/disconnect`.
*
* @experimental
*/
var zDisconnectMcpRequest = object({
	_meta: record(string(), unknown()).nullish(),
	connectionId: zMcpConnectionId
});
/**
* **UNSTABLE**
*
* This capability is not part of the spec yet, and may be removed or changed at any point.
*
* Unique identifier for an MCP server using the ACP transport.
*
* The value is opaque and generated by the ACP component providing the MCP server. It is
* used by `mcp/connect` to route connection requests back to the component that declared the
* server.
*
* @experimental
*/
var zMcpServerAcpId = string();
/**
* **UNSTABLE**
*
* This capability is not part of the spec yet, and may be removed or changed at any point.
*
* Request parameters for `mcp/connect`.
*
* @experimental
*/
var zConnectMcpRequest = object({
	_meta: record(string(), unknown()).nullish(),
	acpId: zMcpServerAcpId
});
/**
* **UNSTABLE**
*
* This capability is not part of the spec yet, and may be removed or changed at any point.
*
* ACP transport configuration for MCP.
*
* The MCP server is provided by an ACP component and communicates over the ACP channel
* using `mcp/connect`, `mcp/message`, and `mcp/disconnect`.
*
* @experimental
*/
var zMcpServerAcp = object({
	_meta: record(string(), unknown()).nullish(),
	id: zMcpServerAcpId,
	name: string()
});
/**
* HTTP transport configuration for MCP.
*/
var zMcpServerHttp = object({
	_meta: record(string(), unknown()).nullish(),
	headers: array(zHttpHeader),
	name: string(),
	url: string()
});
/**
* SSE transport configuration for MCP.
*/
var zMcpServerSse = object({
	_meta: record(string(), unknown()).nullish(),
	headers: array(zHttpHeader),
	name: string(),
	url: string()
});
/**
* Stdio transport configuration for MCP.
*/
var zMcpServerStdio = object({
	_meta: record(string(), unknown()).nullish(),
	args: array(string()),
	command: string(),
	env: array(zEnvVariable),
	name: string()
});
/**
* Configuration for connecting to an MCP (Model Context Protocol) server.
*
* MCP servers provide tools and context that the agent can use when
* processing prompts.
*
* See protocol docs: [MCP Servers](https://agentclientprotocol.com/protocol/session-setup#mcp-servers)
*/
var zMcpServer = union([
	zMcpServerHttp.and(object({ type: literal("http") })),
	zMcpServerSse.and(object({ type: literal("sse") })),
	zMcpServerAcp.and(object({ type: literal("acp") })),
	zMcpServerStdio
]);
/**
* Unique identifier for a message within a session.
*/
var zMessageId = string();
/**
* **UNSTABLE**
*
* This capability is not part of the spec yet, and may be removed or changed at any point.
*
* Notification parameters for `mcp/message`.
*
* This is used when the wrapped MCP message is a notification and the outer JSON-RPC
* envelope has no `id`.
*
* @experimental
*/
var zMessageMcpNotification = object({
	_meta: record(string(), unknown()).nullish(),
	connectionId: zMcpConnectionId,
	method: string(),
	params: record(string(), unknown()).nullish()
});
/**
* **UNSTABLE**
*
* This capability is not part of the spec yet, and may be removed or changed at any point.
*
* Request parameters for `mcp/message`.
*
* @experimental
*/
var zMessageMcpRequest = object({
	_meta: record(string(), unknown()).nullish(),
	connectionId: zMcpConnectionId,
	method: string(),
	params: record(string(), unknown()).nullish()
});
/**
* **UNSTABLE**
*
* This capability is not part of the spec yet, and may be removed or changed at any point.
*
* Response to `mcp/message`.
*
* This is the inner MCP response result payload. Any JSON value is valid.
*
* @experimental
*/
var zMessageMcpResponse = unknown();
/**
* Severity of a diagnostic.
*/
var zNesDiagnosticSeverity = union([
	literal("error"),
	literal("warning"),
	literal("information"),
	literal("hint")
]);
/**
* Capabilities for diagnostics context.
*/
var zNesDiagnosticsCapabilities = object({ _meta: record(string(), unknown()).nullish() });
/**
* Marker for `document/didClose` capability support.
*/
var zNesDocumentDidCloseCapabilities = object({ _meta: record(string(), unknown()).nullish() });
/**
* Marker for `document/didFocus` capability support.
*/
var zNesDocumentDidFocusCapabilities = object({ _meta: record(string(), unknown()).nullish() });
/**
* Marker for `document/didOpen` capability support.
*/
var zNesDocumentDidOpenCapabilities = object({ _meta: record(string(), unknown()).nullish() });
/**
* Marker for `document/didSave` capability support.
*/
var zNesDocumentDidSaveCapabilities = object({ _meta: record(string(), unknown()).nullish() });
/**
* Capabilities for edit history context.
*/
var zNesEditHistoryCapabilities = object({
	_meta: record(string(), unknown()).nullish(),
	maxCount: number().int().gte(0).max(4294967295, { message: "Invalid value: Expected uint32 to be <= 4294967295" }).nullish()
});
/**
* An entry in the edit history.
*/
var zNesEditHistoryEntry = object({
	diff: string(),
	uri: string()
});
/**
* A code excerpt from a file.
*/
var zNesExcerpt = object({
	endLine: number().int().gte(0).max(4294967295, { message: "Invalid value: Expected uint32 to be <= 4294967295" }),
	startLine: number().int().gte(0).max(4294967295, { message: "Invalid value: Expected uint32 to be <= 4294967295" }),
	text: string()
});
/**
* Marker for jump suggestion support.
*/
var zNesJumpCapabilities = object({ _meta: record(string(), unknown()).nullish() });
/**
* Capabilities for open files context.
*/
var zNesOpenFilesCapabilities = object({ _meta: record(string(), unknown()).nullish() });
/**
* A recently accessed file.
*/
var zNesRecentFile = object({
	languageId: string(),
	text: string(),
	uri: string()
});
/**
* Capabilities for recent files context.
*/
var zNesRecentFilesCapabilities = object({
	_meta: record(string(), unknown()).nullish(),
	maxCount: number().int().gte(0).max(4294967295, { message: "Invalid value: Expected uint32 to be <= 4294967295" }).nullish()
});
/**
* The reason a suggestion was rejected.
*/
var zNesRejectReason = union([
	literal("rejected"),
	literal("ignored"),
	literal("replaced"),
	literal("cancelled")
]);
/**
* A related code snippet from a file.
*/
var zNesRelatedSnippet = object({
	excerpts: array(zNesExcerpt),
	uri: string()
});
/**
* Capabilities for related snippets context.
*/
var zNesRelatedSnippetsCapabilities = object({ _meta: record(string(), unknown()).nullish() });
/**
* Marker for rename suggestion support.
*/
var zNesRenameCapabilities = object({ _meta: record(string(), unknown()).nullish() });
/**
* Repository metadata for an NES session.
*/
var zNesRepository = object({
	name: string(),
	owner: string(),
	remoteUrl: string()
});
/**
* Marker for search and replace suggestion support.
*/
var zNesSearchAndReplaceCapabilities = object({ _meta: record(string(), unknown()).nullish() });
/**
* NES capabilities advertised by the client during initialization.
*/
var zClientNesCapabilities = object({
	_meta: record(string(), unknown()).nullish(),
	jump: defaultOnError(zNesJumpCapabilities.nullish(), () => void 0),
	rename: defaultOnError(zNesRenameCapabilities.nullish(), () => void 0),
	searchAndReplace: defaultOnError(zNesSearchAndReplaceCapabilities.nullish(), () => void 0)
});
/**
* A search-and-replace suggestion.
*/
var zNesSearchAndReplaceSuggestion = object({
	id: string(),
	isRegex: boolean().nullish(),
	replace: string(),
	search: string(),
	uri: string()
});
/**
* What triggered the suggestion request.
*/
var zNesTriggerKind = union([
	literal("automatic"),
	literal("diagnostic"),
	literal("manual")
]);
/**
* Capabilities for user actions context.
*/
var zNesUserActionsCapabilities = object({
	_meta: record(string(), unknown()).nullish(),
	maxCount: number().int().gte(0).max(4294967295, { message: "Invalid value: Expected uint32 to be <= 4294967295" }).nullish()
});
/**
* Context capabilities the agent wants attached to each suggestion request.
*/
var zNesContextCapabilities = object({
	_meta: record(string(), unknown()).nullish(),
	diagnostics: defaultOnError(zNesDiagnosticsCapabilities.nullish(), () => void 0),
	editHistory: defaultOnError(zNesEditHistoryCapabilities.nullish(), () => void 0),
	openFiles: defaultOnError(zNesOpenFilesCapabilities.nullish(), () => void 0),
	recentFiles: defaultOnError(zNesRecentFilesCapabilities.nullish(), () => void 0),
	relatedSnippets: defaultOnError(zNesRelatedSnippetsCapabilities.nullish(), () => void 0),
	userActions: defaultOnError(zNesUserActionsCapabilities.nullish(), () => void 0)
});
/**
* Request parameters for creating a new session.
*
* See protocol docs: [Creating a Session](https://agentclientprotocol.com/protocol/session-setup#creating-a-session)
*/
var zNewSessionRequest = object({
	_meta: record(string(), unknown()).nullish(),
	additionalDirectories: array(string()).optional(),
	cwd: string(),
	mcpServers: array(zMcpServer)
});
/**
* Schema for number (floating-point) properties in an elicitation form.
*/
var zNumberPropertySchema = object({
	default: number().nullish(),
	description: string().nullish(),
	maximum: number().nullish(),
	minimum: number().nullish(),
	title: string().nullish()
});
/**
* Unique identifier for a permission option.
*/
var zPermissionOptionId = string();
/**
* The type of permission option being presented to the user.
*
* Helps clients choose appropriate icons and UI treatment.
*/
var zPermissionOptionKind = union([
	literal("allow_once"),
	literal("allow_always"),
	literal("reject_once"),
	literal("reject_always")
]);
/**
* An option presented to the user when requesting permission.
*/
var zPermissionOption = object({
	_meta: record(string(), unknown()).nullish(),
	kind: zPermissionOptionKind,
	name: string(),
	optionId: zPermissionOptionId
});
/**
* **UNSTABLE**
*
* This capability is not part of the spec yet, and may be removed or changed at any point.
*
* Capabilities for receiving `plan_update` and `plan_removed` session updates.
*
* @experimental
*/
var zPlanCapabilities = object({ _meta: record(string(), unknown()).nullish() });
/**
* Priority levels for plan entries.
*
* Used to indicate the relative importance or urgency of different
* tasks in the execution plan.
* See protocol docs: [Plan Entries](https://agentclientprotocol.com/protocol/agent-plan#plan-entries)
*/
var zPlanEntryPriority = union([
	literal("high"),
	literal("medium"),
	literal("low")
]);
/**
* Status of a plan entry in the execution flow.
*
* Tracks the lifecycle of each task from planning through completion.
* See protocol docs: [Plan Entries](https://agentclientprotocol.com/protocol/agent-plan#plan-entries)
*/
var zPlanEntryStatus = union([
	literal("pending"),
	literal("in_progress"),
	literal("completed")
]);
/**
* A single entry in the execution plan.
*
* Represents a task or goal that the assistant intends to accomplish
* as part of fulfilling the user's request.
* See protocol docs: [Plan Entries](https://agentclientprotocol.com/protocol/agent-plan#plan-entries)
*/
var zPlanEntry = object({
	_meta: record(string(), unknown()).nullish(),
	content: string(),
	priority: zPlanEntryPriority,
	status: zPlanEntryStatus
});
/**
* An execution plan for accomplishing complex tasks.
*
* Plans consist of multiple entries representing individual tasks or goals.
* Agents report plans to clients to provide visibility into their execution strategy.
* Plans can evolve during execution as the agent discovers new requirements or completes tasks.
*
* See protocol docs: [Agent Plan](https://agentclientprotocol.com/protocol/agent-plan)
*/
var zPlan = object({
	_meta: record(string(), unknown()).nullish(),
	entries: requiredDefaultOnError(vecSkipError(zPlanEntry), () => [])
});
/**
* **UNSTABLE**
*
* This capability is not part of the spec yet, and may be removed or changed at any point.
*
* Unique identifier for a plan within a session.
*
* @experimental
*/
var zPlanId = string();
/**
* **UNSTABLE**
*
* This capability is not part of the spec yet, and may be removed or changed at any point.
*
* A plan represented by a file URI.
*
* @experimental
*/
var zPlanFile = object({
	_meta: record(string(), unknown()).nullish(),
	id: zPlanId,
	uri: string()
});
/**
* **UNSTABLE**
*
* This capability is not part of the spec yet, and may be removed or changed at any point.
*
* A plan represented as structured entries.
*
* @experimental
*/
var zPlanItems = object({
	_meta: record(string(), unknown()).nullish(),
	entries: requiredDefaultOnError(vecSkipError(zPlanEntry), () => []),
	id: zPlanId
});
/**
* **UNSTABLE**
*
* This capability is not part of the spec yet, and may be removed or changed at any point.
*
* A plan represented as raw markdown content.
*
* @experimental
*/
var zPlanMarkdown = object({
	_meta: record(string(), unknown()).nullish(),
	content: string(),
	id: zPlanId
});
/**
* **UNSTABLE**
*
* This capability is not part of the spec yet, and may be removed or changed at any point.
*
* Removal notice for a plan identified by ID.
*
* @experimental
*/
var zPlanRemoved = object({
	_meta: record(string(), unknown()).nullish(),
	id: zPlanId
});
/**
* **UNSTABLE**
*
* This capability is not part of the spec yet, and may be removed or changed at any point.
*
* Updated content for a plan.
*
* @experimental
*/
var zPlanUpdateContent = union([
	zPlanItems.and(object({ type: literal("items") })),
	zPlanFile.and(object({ type: literal("file") })),
	zPlanMarkdown.and(object({ type: literal("markdown") }))
]);
/**
* **UNSTABLE**
*
* This capability is not part of the spec yet, and may be removed or changed at any point.
*
* A content update for a plan identified by ID.
*
* @experimental
*/
var zPlanUpdate = object({
	_meta: record(string(), unknown()).nullish(),
	plan: zPlanUpdateContent
});
/**
* A zero-based position in a text document.
*
* The meaning of `character` depends on the negotiated position encoding.
*/
var zPosition = object({
	character: number().int().gte(0).max(4294967295, { message: "Invalid value: Expected uint32 to be <= 4294967295" }),
	line: number().int().gte(0).max(4294967295, { message: "Invalid value: Expected uint32 to be <= 4294967295" })
});
/**
* A jump-to-location suggestion.
*/
var zNesJumpSuggestion = object({
	id: string(),
	position: zPosition,
	uri: string()
});
/**
* A rename symbol suggestion.
*/
var zNesRenameSuggestion = object({
	id: string(),
	newName: string(),
	position: zPosition,
	uri: string()
});
/**
* A user action (typing, cursor movement, etc.).
*/
var zNesUserAction = object({
	action: string(),
	position: zPosition,
	timestampMs: number(),
	uri: string()
});
/**
* The encoding used for character offsets in positions.
*
* Follows the same conventions as LSP 3.17. The default is UTF-16.
*/
var zPositionEncodingKind = union([
	literal("utf-16"),
	literal("utf-32"),
	literal("utf-8")
]);
/**
* Capabilities supported by the client.
*
* Advertised during initialization to inform the agent about
* available features and methods.
*
* See protocol docs: [Client Capabilities](https://agentclientprotocol.com/protocol/initialization#client-capabilities)
*/
var zClientCapabilities = object({
	_meta: record(string(), unknown()).nullish(),
	auth: zAuthCapabilities.optional().default({ terminal: false }),
	elicitation: defaultOnError(zElicitationCapabilities.nullish(), () => void 0),
	fs: zFileSystemCapabilities.optional().default({
		readTextFile: false,
		writeTextFile: false
	}),
	nes: defaultOnError(zClientNesCapabilities.nullish(), () => void 0),
	plan: defaultOnError(zPlanCapabilities.nullish(), () => void 0),
	positionEncodings: defaultOnError(vecSkipError(zPositionEncodingKind).optional(), () => []),
	terminal: boolean().optional().default(false)
});
/**
* Prompt capabilities supported by the agent in `session/prompt` requests.
*
* Baseline agent functionality requires support for [`ContentBlock::Text`]
* and [`ContentBlock::ResourceLink`] in prompt requests.
*
* Other variants must be explicitly opted in to.
* Capabilities for different types of content in prompt requests.
*
* Indicates which content types beyond the baseline (text and resource links)
* the agent can process.
*
* See protocol docs: [Prompt Capabilities](https://agentclientprotocol.com/protocol/initialization#prompt-capabilities)
*/
var zPromptCapabilities = object({
	_meta: record(string(), unknown()).nullish(),
	audio: boolean().optional().default(false),
	embeddedContext: boolean().optional().default(false),
	image: boolean().optional().default(false)
});
/**
* Protocol version identifier.
*
* This version is only bumped for breaking changes.
* Non-breaking changes should be introduced via capabilities.
*/
var zProtocolVersion = number().int().gte(0).lte(65535);
/**
* Request parameters for the initialize method.
*
* Sent by the client to establish connection and negotiate capabilities.
*
* See protocol docs: [Initialization](https://agentclientprotocol.com/protocol/initialization)
*/
var zInitializeRequest = object({
	_meta: record(string(), unknown()).nullish(),
	clientCapabilities: zClientCapabilities.optional().default({
		auth: { terminal: false },
		fs: {
			readTextFile: false,
			writeTextFile: false
		},
		terminal: false
	}),
	clientInfo: defaultOnError(zImplementation.nullish(), () => void 0),
	protocolVersion: zProtocolVersion
});
/**
* **UNSTABLE**
*
* This capability is not part of the spec yet, and may be removed or changed at any point.
*
* Current effective non-secret routing configuration for a provider.
*
* @experimental
*/
var zProviderCurrentConfig = object({
	apiType: zLlmProtocol,
	baseUrl: string()
});
/**
* **UNSTABLE**
*
* This capability is not part of the spec yet, and may be removed or changed at any point.
*
* Information about a configurable LLM provider.
*
* @experimental
*/
var zProviderInfo = object({
	_meta: record(string(), unknown()).nullish(),
	current: zProviderCurrentConfig.nullish(),
	id: string(),
	required: boolean(),
	supported: requiredDefaultOnError(vecSkipError(zLlmProtocol), () => [])
});
/**
* **UNSTABLE**
*
* This capability is not part of the spec yet, and may be removed or changed at any point.
*
* Response to `providers/list`.
*
* @experimental
*/
var zListProvidersResponse = object({
	_meta: record(string(), unknown()).nullish(),
	providers: requiredDefaultOnError(vecSkipError(zProviderInfo), () => [])
});
/**
* **UNSTABLE**
*
* This capability is not part of the spec yet, and may be removed or changed at any point.
*
* Provider configuration capabilities supported by the agent.
*
* By supplying `{}` it means that the agent supports provider configuration methods.
*
* @experimental
*/
var zProvidersCapabilities = object({ _meta: record(string(), unknown()).nullish() });
/**
* A range in a text document, expressed as start and end positions.
*/
var zRange = object({
	end: zPosition,
	start: zPosition
});
/**
* A diagnostic (error, warning, etc.).
*/
var zNesDiagnostic = object({
	message: string(),
	range: zRange,
	severity: zNesDiagnosticSeverity,
	uri: string()
});
/**
* An open file in the editor.
*/
var zNesOpenFile = object({
	languageId: string(),
	lastFocusedMs: defaultOnError(number().nullish(), () => void 0),
	uri: string(),
	visibleRange: defaultOnError(zRange.nullish(), () => void 0)
});
/**
* Context attached to a suggestion request.
*/
var zNesSuggestContext = object({
	_meta: record(string(), unknown()).nullish(),
	diagnostics: defaultOnError(vecSkipError(zNesDiagnostic).nullish(), () => void 0),
	editHistory: defaultOnError(vecSkipError(zNesEditHistoryEntry).nullish(), () => void 0),
	openFiles: defaultOnError(vecSkipError(zNesOpenFile).nullish(), () => void 0),
	recentFiles: defaultOnError(vecSkipError(zNesRecentFile).nullish(), () => void 0),
	relatedSnippets: defaultOnError(vecSkipError(zNesRelatedSnippet).nullish(), () => void 0),
	userActions: defaultOnError(vecSkipError(zNesUserAction).nullish(), () => void 0)
});
/**
* A text edit within a suggestion.
*/
var zNesTextEdit = object({
	newText: string(),
	range: zRange
});
/**
* A suggestion returned by the agent.
*/
var zNesSuggestion = union([
	object({
		cursorPosition: defaultOnError(zPosition.nullish(), () => void 0),
		edits: array(zNesTextEdit),
		id: string(),
		uri: string()
	}).and(object({ kind: literal("edit") })),
	zNesJumpSuggestion.and(object({ kind: literal("jump") })),
	zNesRenameSuggestion.and(object({ kind: literal("rename") })),
	zNesSearchAndReplaceSuggestion.and(object({ kind: literal("searchAndReplace") }))
]);
/**
* Response containing the contents of a text file.
*/
var zReadTextFileResponse = object({
	_meta: record(string(), unknown()).nullish(),
	content: string()
});
/**
* Response to terminal/release method
*/
var zReleaseTerminalResponse = object({ _meta: record(string(), unknown()).nullish() });
/**
* JSON RPC Request Id
*
* An identifier established by the Client that MUST contain a String, Number, or NULL value if included. If it is not included it is assumed to be a notification. The value SHOULD normally not be Null \[1\] and Numbers SHOULD NOT contain fractional parts \[2\]
*
* The Server MUST reply with the same value in the Response object if included. This member is used to correlate the context between the two objects.
*
* \[1\] The use of Null as a value for the id member in a Request object is discouraged, because this specification uses a value of Null for Responses with an unknown id. Also, because JSON-RPC 1.0 uses an id value of Null for Notifications this could cause confusion in handling.
*
* \[2\] Fractional parts may be problematic, since many decimal fractions cannot be represented exactly as binary fractions.
*/
var zRequestId = union([number(), string()]).nullable();
object({
	_meta: record(string(), unknown()).nullish(),
	requestId: zRequestId
});
/**
* **UNSTABLE**
*
* This capability is not part of the spec yet, and may be removed or changed at any point.
*
* Request-scoped elicitation, tied to a specific JSON-RPC request outside of a session
* (e.g., during auth/configuration phases before any session is started).
*
* @experimental
*/
var zElicitationRequestScope = object({ requestId: zRequestId });
/**
* The sender or recipient of messages and data in a conversation.
*/
var zRole = _enum(["assistant", "user"]);
/**
* Optional annotations for the client. The client can use annotations to inform how objects are used or displayed
*/
var zAnnotations = object({
	_meta: record(string(), unknown()).nullish(),
	audience: defaultOnError(vecSkipError(zRole).nullish(), () => void 0),
	lastModified: string().nullish(),
	priority: number().nullish()
});
/**
* Audio provided to or from an LLM.
*/
var zAudioContent = object({
	_meta: record(string(), unknown()).nullish(),
	annotations: defaultOnError(zAnnotations.nullish(), () => void 0),
	data: string(),
	mimeType: string()
});
/**
* An image provided to or from an LLM.
*/
var zImageContent = object({
	_meta: record(string(), unknown()).nullish(),
	annotations: defaultOnError(zAnnotations.nullish(), () => void 0),
	data: string(),
	mimeType: string(),
	uri: string().nullish()
});
/**
* A resource that the server is capable of reading, included in a prompt or tool call result.
*/
var zResourceLink = object({
	_meta: record(string(), unknown()).nullish(),
	annotations: defaultOnError(zAnnotations.nullish(), () => void 0),
	description: string().nullish(),
	mimeType: string().nullish(),
	name: string(),
	size: number().nullish(),
	title: string().nullish(),
	uri: string()
});
/**
* The user selected one of the provided options.
*/
var zSelectedPermissionOutcome = object({
	_meta: record(string(), unknown()).nullish(),
	optionId: zPermissionOptionId
});
/**
* The outcome of a permission request.
*/
var zRequestPermissionOutcome = union([object({ outcome: literal("cancelled") }), zSelectedPermissionOutcome.and(object({ outcome: literal("selected") }))]);
/**
* Response to a permission request.
*/
var zRequestPermissionResponse = object({
	_meta: record(string(), unknown()).nullish(),
	outcome: zRequestPermissionOutcome
});
/**
* Capabilities for additional session directories support.
*
* By supplying `{}` it means that the agent supports the `additionalDirectories`
* field on supported session lifecycle requests. Agents that also support
* `session/list` may return `SessionInfo.additionalDirectories` to report the
* complete ordered additional-root list associated with a listed session.
*/
var zSessionAdditionalDirectoriesCapabilities = object({ _meta: record(string(), unknown()).nullish() });
/**
* Capabilities for the `session/close` method.
*
* By supplying `{}` it means that the agent supports closing of sessions.
*/
var zSessionCloseCapabilities = object({ _meta: record(string(), unknown()).nullish() });
/**
* **UNSTABLE**
*
* This capability is not part of the spec yet, and may be removed or changed at any point.
*
* A boolean on/off toggle session configuration option payload.
*
* @experimental
*/
var zSessionConfigBoolean = object({ currentValue: boolean() });
/**
* Unique identifier for a session configuration option value group.
*/
var zSessionConfigGroupId = string();
/**
* Unique identifier for a session configuration option.
*/
var zSessionConfigId = string();
/**
* Semantic category for a session configuration option.
*
* This is intended to help Clients distinguish broadly common selectors (e.g. model selector vs
* session mode selector vs thought/reasoning level) for UX purposes (keyboard shortcuts, icons,
* placement). It MUST NOT be required for correctness. Clients MUST handle missing or unknown
* categories gracefully.
*
* Category names beginning with `_` are free for custom use, like other ACP extension methods.
* Category names that do not begin with `_` are reserved for the ACP spec.
*/
var zSessionConfigOptionCategory = union([
	literal("mode"),
	literal("model"),
	literal("thought_level"),
	string()
]);
/**
* Unique identifier for a session configuration option value.
*/
var zSessionConfigValueId = string();
/**
* A possible value for a session configuration option.
*/
var zSessionConfigSelectOption = object({
	_meta: record(string(), unknown()).nullish(),
	description: string().nullish(),
	name: string(),
	value: zSessionConfigValueId
});
/**
* A group of possible values for a session configuration option.
*/
var zSessionConfigSelectGroup = object({
	_meta: record(string(), unknown()).nullish(),
	group: zSessionConfigGroupId,
	name: string(),
	options: array(zSessionConfigSelectOption)
});
/**
* A session configuration option selector and its current state.
*/
var zSessionConfigOption = intersection(union([object({
	currentValue: zSessionConfigValueId,
	options: union([array(zSessionConfigSelectOption), array(zSessionConfigSelectGroup)])
}).and(object({ type: literal("select") })), zSessionConfigBoolean.and(object({ type: literal("boolean") }))]), object({
	_meta: record(string(), unknown()).nullish(),
	category: defaultOnError(zSessionConfigOptionCategory.nullish(), () => void 0),
	description: string().nullish(),
	id: zSessionConfigId,
	name: string()
}));
/**
* Session configuration options have been updated.
*/
var zConfigOptionUpdate = object({
	_meta: record(string(), unknown()).nullish(),
	configOptions: requiredDefaultOnError(vecSkipError(zSessionConfigOption), () => [])
});
/**
* Capabilities for the `session/delete` method.
*
* Supplying `{}` means the agent supports deleting sessions from `session/list`.
*/
var zSessionDeleteCapabilities = object({ _meta: record(string(), unknown()).nullish() });
/**
* **UNSTABLE**
*
* This capability is not part of the spec yet, and may be removed or changed at any point.
*
* Capabilities for the `session/fork` method.
*
* By supplying `{}` it means that the agent supports forking of sessions.
*
* @experimental
*/
var zSessionForkCapabilities = object({ _meta: record(string(), unknown()).nullish() });
/**
* A unique identifier for a conversation session between a client and agent.
*
* Sessions maintain their own context, conversation history, and state,
* allowing multiple independent interactions with the same agent.
*
* See protocol docs: [Session ID](https://agentclientprotocol.com/protocol/session-setup#session-id)
*/
var zSessionId = string();
/**
* Notification sent when a suggestion is accepted.
*/
var zAcceptNesNotification = object({
	_meta: record(string(), unknown()).nullish(),
	id: string(),
	sessionId: zSessionId
});
/**
* Notification to cancel ongoing operations for a session.
*
* See protocol docs: [Cancellation](https://agentclientprotocol.com/protocol/prompt-turn#cancellation)
*/
var zCancelNotification = object({
	_meta: record(string(), unknown()).nullish(),
	sessionId: zSessionId
});
/**
* Request to close an NES session.
*
* The agent **must** cancel any ongoing work related to the NES session
* and then free up any resources associated with the session.
*/
var zCloseNesRequest = object({
	_meta: record(string(), unknown()).nullish(),
	sessionId: zSessionId
});
/**
* Request parameters for closing an active session.
*
* If supported, the agent **must** cancel any ongoing work related to the session
* (treat it as if `session/cancel` was called) and then free up any resources
* associated with the session.
*
* Only available if the Agent supports the `sessionCapabilities.close` capability.
*/
var zCloseSessionRequest = object({
	_meta: record(string(), unknown()).nullish(),
	sessionId: zSessionId
});
/**
* Request to create a new terminal and execute a command.
*/
var zCreateTerminalRequest = object({
	_meta: record(string(), unknown()).nullish(),
	args: array(string()).optional(),
	command: string(),
	cwd: string().nullish(),
	env: array(zEnvVariable).optional(),
	outputByteLimit: number().nullish(),
	sessionId: zSessionId
});
/**
* Request parameters for deleting an existing session from `session/list`.
*
* Only available if the Agent supports the `sessionCapabilities.delete` capability.
*/
var zDeleteSessionRequest = object({
	_meta: record(string(), unknown()).nullish(),
	sessionId: zSessionId
});
/**
* Notification sent when a file is closed.
*/
var zDidCloseDocumentNotification = object({
	_meta: record(string(), unknown()).nullish(),
	sessionId: zSessionId,
	uri: string()
});
/**
* Notification sent when a file becomes the active editor tab.
*/
var zDidFocusDocumentNotification = object({
	_meta: record(string(), unknown()).nullish(),
	position: zPosition,
	sessionId: zSessionId,
	uri: string(),
	version: number(),
	visibleRange: zRange
});
/**
* Notification sent when a file is opened in the editor.
*/
var zDidOpenDocumentNotification = object({
	_meta: record(string(), unknown()).nullish(),
	languageId: string(),
	sessionId: zSessionId,
	text: string(),
	uri: string(),
	version: number()
});
/**
* Notification sent when a file is saved.
*/
var zDidSaveDocumentNotification = object({
	_meta: record(string(), unknown()).nullish(),
	sessionId: zSessionId,
	uri: string()
});
/**
* **UNSTABLE**
*
* This capability is not part of the spec yet, and may be removed or changed at any point.
*
* Request parameters for forking an existing session.
*
* Creates a new session based on the context of an existing one, allowing
* operations like generating summaries without affecting the original session's history.
*
* Only available if the Agent supports the `session.fork` capability.
*
* @experimental
*/
var zForkSessionRequest = object({
	_meta: record(string(), unknown()).nullish(),
	additionalDirectories: array(string()).optional(),
	cwd: string(),
	mcpServers: array(zMcpServer).optional(),
	sessionId: zSessionId
});
/**
* Request to kill a terminal without releasing it.
*/
var zKillTerminalRequest = object({
	_meta: record(string(), unknown()).nullish(),
	sessionId: zSessionId,
	terminalId: string()
});
/**
* Request parameters for loading an existing session.
*
* Only available if the Agent supports the `loadSession` capability.
*
* See protocol docs: [Loading Sessions](https://agentclientprotocol.com/protocol/session-setup#loading-sessions)
*/
var zLoadSessionRequest = object({
	_meta: record(string(), unknown()).nullish(),
	additionalDirectories: array(string()).optional(),
	cwd: string(),
	mcpServers: array(zMcpServer),
	sessionId: zSessionId
});
/**
* Request to read content from a text file.
*
* Only available if the client supports the `fs.readTextFile` capability.
*/
var zReadTextFileRequest = object({
	_meta: record(string(), unknown()).nullish(),
	limit: number().int().gte(0).max(4294967295, { message: "Invalid value: Expected uint32 to be <= 4294967295" }).nullish(),
	line: number().int().gte(0).max(4294967295, { message: "Invalid value: Expected uint32 to be <= 4294967295" }).nullish(),
	path: string(),
	sessionId: zSessionId
});
/**
* Notification sent when a suggestion is rejected.
*/
var zRejectNesNotification = object({
	_meta: record(string(), unknown()).nullish(),
	id: string(),
	reason: defaultOnError(zNesRejectReason.nullish(), () => void 0),
	sessionId: zSessionId
});
/**
* Request to release a terminal and free its resources.
*/
var zReleaseTerminalRequest = object({
	_meta: record(string(), unknown()).nullish(),
	sessionId: zSessionId,
	terminalId: string()
});
/**
* Request parameters for resuming an existing session.
*
* Resumes an existing session without returning previous messages (unlike `session/load`).
* This is useful for agents that can resume sessions but don't implement full session loading.
*
* Only available if the Agent supports the `sessionCapabilities.resume` capability.
*/
var zResumeSessionRequest = object({
	_meta: record(string(), unknown()).nullish(),
	additionalDirectories: array(string()).optional(),
	cwd: string(),
	mcpServers: array(zMcpServer).optional(),
	sessionId: zSessionId
});
/**
* Information about a session returned by session/list
*/
var zSessionInfo = object({
	_meta: record(string(), unknown()).nullish(),
	additionalDirectories: array(string()).optional(),
	cwd: string(),
	sessionId: zSessionId,
	title: defaultOnError(string().nullish(), () => void 0),
	updatedAt: defaultOnError(string().nullish(), () => void 0)
});
/**
* Response from listing sessions.
*/
var zListSessionsResponse = object({
	_meta: record(string(), unknown()).nullish(),
	nextCursor: string().nullish(),
	sessions: requiredDefaultOnError(vecSkipError(zSessionInfo), () => [])
});
/**
* Update to session metadata. All fields are optional to support partial updates.
*
* Agents send this notification to update session information like title or custom metadata.
* This allows clients to display dynamic session names and track session state changes.
*/
var zSessionInfoUpdate = object({
	_meta: record(string(), unknown()).nullish(),
	title: string().nullish(),
	updatedAt: string().nullish()
});
/**
* Capabilities for the `session/list` method.
*
* By supplying `{}` it means that the agent supports listing of sessions.
*/
var zSessionListCapabilities = object({ _meta: record(string(), unknown()).nullish() });
/**
* Unique identifier for a Session Mode.
*/
var zSessionModeId = string();
/**
* The current mode of the session has changed
*
* See protocol docs: [Session Modes](https://agentclientprotocol.com/protocol/session-modes)
*/
var zCurrentModeUpdate = object({
	_meta: record(string(), unknown()).nullish(),
	currentModeId: zSessionModeId
});
/**
* A mode the agent can operate in.
*
* See protocol docs: [Session Modes](https://agentclientprotocol.com/protocol/session-modes)
*/
var zSessionMode = object({
	_meta: record(string(), unknown()).nullish(),
	description: string().nullish(),
	id: zSessionModeId,
	name: string()
});
/**
* The set of modes and the one currently active.
*/
var zSessionModeState = object({
	_meta: record(string(), unknown()).nullish(),
	availableModes: requiredDefaultOnError(vecSkipError(zSessionMode), () => []),
	currentModeId: zSessionModeId
});
/**
* **UNSTABLE**
*
* This capability is not part of the spec yet, and may be removed or changed at any point.
*
* Response from forking an existing session.
*
* @experimental
*/
var zForkSessionResponse = object({
	_meta: record(string(), unknown()).nullish(),
	configOptions: defaultOnError(vecSkipError(zSessionConfigOption).nullish(), () => void 0),
	modes: defaultOnError(zSessionModeState.nullish(), () => void 0),
	sessionId: zSessionId
});
/**
* Response from loading an existing session.
*/
var zLoadSessionResponse = object({
	_meta: record(string(), unknown()).nullish(),
	configOptions: defaultOnError(vecSkipError(zSessionConfigOption).nullish(), () => void 0),
	modes: defaultOnError(zSessionModeState.nullish(), () => void 0)
});
/**
* Response from creating a new session.
*
* See protocol docs: [Creating a Session](https://agentclientprotocol.com/protocol/session-setup#creating-a-session)
*/
var zNewSessionResponse = object({
	_meta: record(string(), unknown()).nullish(),
	configOptions: defaultOnError(vecSkipError(zSessionConfigOption).nullish(), () => void 0),
	modes: defaultOnError(zSessionModeState.nullish(), () => void 0),
	sessionId: zSessionId
});
/**
* Response from resuming an existing session.
*/
var zResumeSessionResponse = object({
	_meta: record(string(), unknown()).nullish(),
	configOptions: defaultOnError(vecSkipError(zSessionConfigOption).nullish(), () => void 0),
	modes: defaultOnError(zSessionModeState.nullish(), () => void 0)
});
/**
* Capabilities for the `session/resume` method.
*
* By supplying `{}` it means that the agent supports resuming of sessions.
*/
var zSessionResumeCapabilities = object({ _meta: record(string(), unknown()).nullish() });
/**
* Session capabilities supported by the agent.
*
* As a baseline, all Agents **MUST** support `session/new`, `session/prompt`, `session/cancel`, and `session/update`.
*
* Optionally, they **MAY** support other session methods and notifications by specifying additional capabilities.
*
* Note: `session/load` is still handled by the top-level `load_session` capability. This will be unified in future versions of the protocol.
*
* See protocol docs: [Session Capabilities](https://agentclientprotocol.com/protocol/initialization#session-capabilities)
*/
var zSessionCapabilities = object({
	_meta: record(string(), unknown()).nullish(),
	additionalDirectories: defaultOnError(zSessionAdditionalDirectoriesCapabilities.nullish(), () => void 0),
	close: defaultOnError(zSessionCloseCapabilities.nullish(), () => void 0),
	delete: defaultOnError(zSessionDeleteCapabilities.nullish(), () => void 0),
	fork: defaultOnError(zSessionForkCapabilities.nullish(), () => void 0),
	list: defaultOnError(zSessionListCapabilities.nullish(), () => void 0),
	resume: defaultOnError(zSessionResumeCapabilities.nullish(), () => void 0)
});
/**
* **UNSTABLE**
*
* This capability is not part of the spec yet, and may be removed or changed at any point.
*
* Request parameters for `providers/set`.
*
* Replaces the full configuration for one provider id.
*
* @experimental
*/
var zSetProviderRequest = object({
	_meta: record(string(), unknown()).nullish(),
	apiType: zLlmProtocol,
	baseUrl: string(),
	headers: record(string(), string()).optional(),
	id: string()
});
/**
* **UNSTABLE**
*
* This capability is not part of the spec yet, and may be removed or changed at any point.
*
* Response to `providers/set`.
*
* @experimental
*/
var zSetProviderResponse = object({ _meta: record(string(), unknown()).nullish() });
/**
* Request parameters for setting a session configuration option.
*/
var zSetSessionConfigOptionRequest = intersection(union([object({
	type: literal("boolean"),
	value: boolean()
}), object({ value: zSessionConfigValueId })]), object({
	_meta: record(string(), unknown()).nullish(),
	configId: zSessionConfigId,
	sessionId: zSessionId
}));
/**
* Response to `session/set_config_option` method.
*/
var zSetSessionConfigOptionResponse = object({
	_meta: record(string(), unknown()).nullish(),
	configOptions: requiredDefaultOnError(vecSkipError(zSessionConfigOption), () => [])
});
/**
* Request parameters for setting a session mode.
*/
var zSetSessionModeRequest = object({
	_meta: record(string(), unknown()).nullish(),
	modeId: zSessionModeId,
	sessionId: zSessionId
});
/**
* Response to `session/set_mode` method.
*/
var zSetSessionModeResponse = object({ _meta: record(string(), unknown()).nullish() });
/**
* Response to `nes/start`.
*/
var zStartNesResponse = object({
	_meta: record(string(), unknown()).nullish(),
	sessionId: zSessionId
});
/**
* Reasons why an agent stops processing a prompt turn.
*
* See protocol docs: [Stop Reasons](https://agentclientprotocol.com/protocol/prompt-turn#stop-reasons)
*/
var zStopReason = union([
	literal("end_turn"),
	literal("max_tokens"),
	literal("max_turn_requests"),
	literal("refusal"),
	literal("cancelled")
]);
/**
* String format types for string properties in elicitation schemas.
*/
var zStringFormat = union([
	literal("email"),
	literal("uri"),
	literal("date"),
	literal("date-time")
]);
/**
* Schema for string properties in an elicitation form.
*
* When `enum` or `oneOf` is set, this represents a single-select enum
* with `"type": "string"`.
*/
var zStringPropertySchema = object({
	default: string().nullish(),
	description: string().nullish(),
	enum: array(string()).nullish(),
	format: zStringFormat.nullish(),
	maxLength: number().int().gte(0).max(4294967295, { message: "Invalid value: Expected uint32 to be <= 4294967295" }).nullish(),
	minLength: number().int().gte(0).max(4294967295, { message: "Invalid value: Expected uint32 to be <= 4294967295" }).nullish(),
	oneOf: array(zEnumOption).nullish(),
	pattern: string().nullish(),
	title: string().nullish()
});
/**
* Request for a code suggestion.
*/
var zSuggestNesRequest = object({
	_meta: record(string(), unknown()).nullish(),
	context: defaultOnError(zNesSuggestContext.nullish(), () => void 0),
	position: zPosition,
	selection: defaultOnError(zRange.nullish(), () => void 0),
	sessionId: zSessionId,
	triggerKind: zNesTriggerKind,
	uri: string(),
	version: number()
});
/**
* Response to `nes/suggest`.
*/
var zSuggestNesResponse = object({
	_meta: record(string(), unknown()).nullish(),
	suggestions: requiredDefaultOnError(vecSkipError(zNesSuggestion), () => [])
});
/**
* Embed a terminal created with `terminal/create` by its id.
*
* The terminal must be added before calling `terminal/release`.
*
* See protocol docs: [Terminal](https://agentclientprotocol.com/protocol/terminals)
*/
var zTerminal = object({
	_meta: record(string(), unknown()).nullish(),
	terminalId: string()
});
/**
* Exit status of a terminal command.
*/
var zTerminalExitStatus = object({
	_meta: record(string(), unknown()).nullish(),
	exitCode: number().int().gte(0).max(4294967295, { message: "Invalid value: Expected uint32 to be <= 4294967295" }).nullish(),
	signal: string().nullish()
});
/**
* Request to get the current output and status of a terminal.
*/
var zTerminalOutputRequest = object({
	_meta: record(string(), unknown()).nullish(),
	sessionId: zSessionId,
	terminalId: string()
});
/**
* Response containing the terminal output and exit status.
*/
var zTerminalOutputResponse = object({
	_meta: record(string(), unknown()).nullish(),
	exitStatus: zTerminalExitStatus.nullish(),
	output: string(),
	truncated: boolean()
});
/**
* Text provided to or from an LLM.
*/
var zTextContent = object({
	_meta: record(string(), unknown()).nullish(),
	annotations: defaultOnError(zAnnotations.nullish(), () => void 0),
	text: string()
});
/**
* A content change event for a document.
*
* When `range` is `None`, `text` is the full content of the document.
* When `range` is `Some`, `text` replaces the given range.
*/
var zTextDocumentContentChangeEvent = object({
	range: zRange.nullish(),
	text: string()
});
/**
* Notification sent when a file is edited.
*/
var zDidChangeDocumentNotification = object({
	_meta: record(string(), unknown()).nullish(),
	contentChanges: array(zTextDocumentContentChangeEvent),
	sessionId: zSessionId,
	uri: string(),
	version: number()
});
object({
	method: string(),
	params: union([
		zCancelNotification,
		zDidOpenDocumentNotification,
		zDidChangeDocumentNotification,
		zDidCloseDocumentNotification,
		zDidSaveDocumentNotification,
		zDidFocusDocumentNotification,
		zAcceptNesNotification,
		zRejectNesNotification,
		zMessageMcpNotification,
		zExtNotification
	]).nullish()
});
/**
* How the agent wants document changes delivered.
*/
var zTextDocumentSyncKind = union([literal("full"), literal("incremental")]);
/**
* Capabilities for `document/didChange` events.
*/
var zNesDocumentDidChangeCapabilities = object({
	_meta: record(string(), unknown()).nullish(),
	syncKind: zTextDocumentSyncKind
});
/**
* Document event capabilities the agent wants to receive.
*/
var zNesDocumentEventCapabilities = object({
	_meta: record(string(), unknown()).nullish(),
	didChange: defaultOnError(zNesDocumentDidChangeCapabilities.nullish(), () => void 0),
	didClose: defaultOnError(zNesDocumentDidCloseCapabilities.nullish(), () => void 0),
	didFocus: defaultOnError(zNesDocumentDidFocusCapabilities.nullish(), () => void 0),
	didOpen: defaultOnError(zNesDocumentDidOpenCapabilities.nullish(), () => void 0),
	didSave: defaultOnError(zNesDocumentDidSaveCapabilities.nullish(), () => void 0)
});
/**
* Event capabilities the agent can consume.
*/
var zNesEventCapabilities = object({
	_meta: record(string(), unknown()).nullish(),
	document: defaultOnError(zNesDocumentEventCapabilities.nullish(), () => void 0)
});
/**
* NES capabilities advertised by the agent during initialization.
*/
var zNesCapabilities = object({
	_meta: record(string(), unknown()).nullish(),
	context: defaultOnError(zNesContextCapabilities.nullish(), () => void 0),
	events: defaultOnError(zNesEventCapabilities.nullish(), () => void 0)
});
/**
* Capabilities supported by the agent.
*
* Advertised during initialization to inform the client about
* available features and content types.
*
* See protocol docs: [Agent Capabilities](https://agentclientprotocol.com/protocol/initialization#agent-capabilities)
*/
var zAgentCapabilities = object({
	_meta: record(string(), unknown()).nullish(),
	auth: zAgentAuthCapabilities.optional().default({}),
	loadSession: boolean().optional().default(false),
	mcpCapabilities: zMcpCapabilities.optional().default({
		acp: false,
		http: false,
		sse: false
	}),
	nes: defaultOnError(zNesCapabilities.nullish(), () => void 0),
	positionEncoding: defaultOnError(zPositionEncodingKind.nullish(), () => void 0),
	promptCapabilities: zPromptCapabilities.optional().default({
		audio: false,
		embeddedContext: false,
		image: false
	}),
	providers: defaultOnError(zProvidersCapabilities.nullish(), () => void 0),
	sessionCapabilities: zSessionCapabilities.optional().default({})
});
/**
* Response to the `initialize` method.
*
* Contains the negotiated protocol version and agent capabilities.
*
* See protocol docs: [Initialization](https://agentclientprotocol.com/protocol/initialization)
*/
var zInitializeResponse = object({
	_meta: record(string(), unknown()).nullish(),
	agentCapabilities: zAgentCapabilities.optional().default({
		auth: {},
		loadSession: false,
		mcpCapabilities: {
			acp: false,
			http: false,
			sse: false
		},
		promptCapabilities: {
			audio: false,
			embeddedContext: false,
			image: false
		},
		sessionCapabilities: {}
	}),
	agentInfo: defaultOnError(zImplementation.nullish(), () => void 0),
	authMethods: defaultOnError(vecSkipError(zAuthMethod).optional().default([]), () => []),
	protocolVersion: zProtocolVersion
});
/**
* Resource content that can be embedded in a message.
*/
var zEmbeddedResourceResource = union([object({
	_meta: record(string(), unknown()).nullish(),
	mimeType: string().nullish(),
	text: string(),
	uri: string()
}), zBlobResourceContents]);
/**
* The contents of a resource, embedded into a prompt or tool call result.
*/
var zEmbeddedResource = object({
	_meta: record(string(), unknown()).nullish(),
	annotations: defaultOnError(zAnnotations.nullish(), () => void 0),
	resource: zEmbeddedResourceResource
});
/**
* Content blocks represent displayable information in the Agent Client Protocol.
*
* They provide a structured way to handle various types of user-facing content—whether
* it's text from language models, images for analysis, or embedded resources for context.
*
* Content blocks appear in:
* - User prompts sent via `session/prompt`
* - Language model output streamed through `session/update` notifications
* - Progress updates and results from tool calls
*
* This structure is compatible with the Model Context Protocol (MCP), enabling
* agents to seamlessly forward content from MCP tool outputs without transformation.
*
* See protocol docs: [Content](https://agentclientprotocol.com/protocol/content)
*/
var zContentBlock = union([
	zTextContent.and(object({ type: literal("text") })),
	zImageContent.and(object({ type: literal("image") })),
	zAudioContent.and(object({ type: literal("audio") })),
	zResourceLink.and(object({ type: literal("resource_link") })),
	zEmbeddedResource.and(object({ type: literal("resource") }))
]);
/**
* Standard content block (text, images, resources).
*/
var zContent = object({
	_meta: record(string(), unknown()).nullish(),
	content: zContentBlock
});
/**
* A streamed item of content
*/
var zContentChunk = object({
	_meta: record(string(), unknown()).nullish(),
	content: zContentBlock,
	messageId: zMessageId.nullish()
});
/**
* Request parameters for sending a user prompt to the agent.
*
* Contains the user's message and any additional context.
*
* See protocol docs: [User Message](https://agentclientprotocol.com/protocol/prompt-turn#1-user-message)
*/
var zPromptRequest = object({
	_meta: record(string(), unknown()).nullish(),
	prompt: array(zContentBlock),
	sessionId: zSessionId
});
/**
* Items definition for titled multi-select enum properties.
*/
var zTitledMultiSelectItems = object({ anyOf: array(zEnumOption) });
/**
* Content produced by a tool call.
*
* Tool calls can produce different types of content including
* standard content blocks (text, images) or file diffs.
*
* See protocol docs: [Content](https://agentclientprotocol.com/protocol/tool-calls#content)
*/
var zToolCallContent = union([
	zContent.and(object({ type: literal("content") })),
	zDiff.and(object({ type: literal("diff") })),
	zTerminal.and(object({ type: literal("terminal") }))
]);
/**
* Unique identifier for a tool call within a session.
*/
var zToolCallId = string();
/**
* **UNSTABLE**
*
* This capability is not part of the spec yet, and may be removed or changed at any point.
*
* Session-scoped elicitation, optionally tied to a specific tool call.
*
* When `tool_call_id` is set, the elicitation is tied to a specific tool call.
* This is useful when an agent receives an elicitation from an MCP server
* during a tool call and needs to redirect it to the user.
*
* @experimental
*/
var zElicitationSessionScope = object({
	sessionId: zSessionId,
	toolCallId: zToolCallId.nullish()
});
/**
* **UNSTABLE**
*
* This capability is not part of the spec yet, and may be removed or changed at any point.
*
* URL-based elicitation mode where the client directs the user to a URL.
*
* @experimental
*/
var zElicitationUrlMode = intersection(union([zElicitationSessionScope, zElicitationRequestScope]), object({
	elicitationId: zElicitationId,
	url: string().url()
}));
/**
* A file location being accessed or modified by a tool.
*
* Enables clients to implement "follow-along" features that track
* which files the agent is working with in real-time.
*
* See protocol docs: [Following the Agent](https://agentclientprotocol.com/protocol/tool-calls#following-the-agent)
*/
var zToolCallLocation = object({
	_meta: record(string(), unknown()).nullish(),
	line: number().int().gte(0).max(4294967295, { message: "Invalid value: Expected uint32 to be <= 4294967295" }).nullish(),
	path: string()
});
/**
* Execution status of a tool call.
*
* Tool calls progress through different statuses during their lifecycle.
*
* See protocol docs: [Status](https://agentclientprotocol.com/protocol/tool-calls#status)
*/
var zToolCallStatus = union([
	literal("pending"),
	literal("in_progress"),
	literal("completed"),
	literal("failed")
]);
/**
* Categories of tools that can be invoked.
*
* Tool kinds help clients choose appropriate icons and optimize how they
* display tool execution progress.
*
* See protocol docs: [Creating](https://agentclientprotocol.com/protocol/tool-calls#creating)
*/
var zToolKind = union([
	literal("read"),
	literal("edit"),
	literal("delete"),
	literal("move"),
	literal("search"),
	literal("execute"),
	literal("think"),
	literal("fetch"),
	literal("switch_mode"),
	literal("other")
]);
/**
* Represents a tool call that the language model has requested.
*
* Tool calls are actions that the agent executes on behalf of the language model,
* such as reading files, executing code, or fetching data from external sources.
*
* See protocol docs: [Tool Calls](https://agentclientprotocol.com/protocol/tool-calls)
*/
var zToolCall = object({
	_meta: record(string(), unknown()).nullish(),
	content: defaultOnError(vecSkipError(zToolCallContent).optional(), () => []),
	kind: zToolKind.optional(),
	locations: defaultOnError(vecSkipError(zToolCallLocation).optional(), () => []),
	rawInput: unknown().optional(),
	rawOutput: unknown().optional(),
	status: zToolCallStatus.optional(),
	title: string(),
	toolCallId: zToolCallId
});
/**
* An update to an existing tool call.
*
* Used to report progress and results as tools execute. All fields except
* the tool call ID are optional - only changed fields need to be included.
*
* See protocol docs: [Updating](https://agentclientprotocol.com/protocol/tool-calls#updating)
*/
var zToolCallUpdate = object({
	_meta: record(string(), unknown()).nullish(),
	content: defaultOnError(vecSkipError(zToolCallContent).nullish(), () => void 0),
	kind: defaultOnError(zToolKind.nullish(), () => void 0),
	locations: defaultOnError(vecSkipError(zToolCallLocation).nullish(), () => void 0),
	rawInput: unknown().optional(),
	rawOutput: unknown().optional(),
	status: defaultOnError(zToolCallStatus.nullish(), () => void 0),
	title: string().nullish(),
	toolCallId: zToolCallId
});
/**
* Request for user permission to execute a tool call.
*
* Sent when the agent needs authorization before performing a sensitive operation.
*
* See protocol docs: [Requesting Permission](https://agentclientprotocol.com/protocol/tool-calls#requesting-permission)
*/
var zRequestPermissionRequest = object({
	_meta: record(string(), unknown()).nullish(),
	options: array(zPermissionOption),
	sessionId: zSessionId,
	toolCall: zToolCallUpdate
});
/**
* unstructured
*
* All text that was typed after the command name is provided as input.
*/
var zAvailableCommandInput = object({
	_meta: record(string(), unknown()).nullish(),
	hint: string()
});
/**
* Information about a command.
*/
var zAvailableCommand = object({
	_meta: record(string(), unknown()).nullish(),
	description: string(),
	input: defaultOnError(zAvailableCommandInput.nullish(), () => void 0),
	name: string()
});
/**
* Available commands are ready or have changed
*/
var zAvailableCommandsUpdate = object({
	_meta: record(string(), unknown()).nullish(),
	availableCommands: requiredDefaultOnError(vecSkipError(zAvailableCommand), () => [])
});
/**
* Items for a multi-select (array) property schema.
*/
var zMultiSelectItems = union([object({
	enum: array(string()),
	type: zElicitationStringType
}), zTitledMultiSelectItems]);
/**
* Schema for multi-select (array) properties in an elicitation form.
*/
var zMultiSelectPropertySchema = object({
	default: array(string()).nullish(),
	description: string().nullish(),
	items: zMultiSelectItems,
	maxItems: number().nullish(),
	minItems: number().nullish(),
	title: string().nullish()
});
/**
* Property schema for elicitation form fields.
*
* Each variant corresponds to a JSON Schema `"type"` value.
* Single-select enums use the `String` variant with `enum` or `oneOf` set.
* Multi-select enums use the `Array` variant.
*/
var zElicitationPropertySchema = union([
	zStringPropertySchema.and(object({ type: literal("string") })),
	zNumberPropertySchema.and(object({ type: literal("number") })),
	zIntegerPropertySchema.and(object({ type: literal("integer") })),
	zBooleanPropertySchema.and(object({ type: literal("boolean") })),
	zMultiSelectPropertySchema.and(object({ type: literal("array") }))
]);
/**
* Type-safe elicitation schema for requesting structured user input.
*
* This represents a JSON Schema object with primitive-typed properties,
* as required by the elicitation specification.
*/
var zElicitationSchema = object({
	description: string().nullish(),
	properties: record(string(), zElicitationPropertySchema).optional().default({}),
	required: array(string()).nullish(),
	title: string().nullish(),
	type: zElicitationSchemaType.optional().default("object")
});
/**
* **UNSTABLE**
*
* This capability is not part of the spec yet, and may be removed or changed at any point.
*
* Request from the agent to elicit structured user input.
*
* The agent sends this to the client to request information from the user,
* either via a form or by directing them to a URL.
* Elicitations are tied to a session (optionally a tool call) or a request.
*
* @experimental
*/
var zCreateElicitationRequest = intersection(union([intersection(union([zElicitationSessionScope, zElicitationRequestScope]), object({ requestedSchema: zElicitationSchema })).and(object({ mode: literal("form") })), zElicitationUrlMode.and(object({ mode: literal("url") }))]), object({
	_meta: record(string(), unknown()).nullish(),
	message: string()
}));
/**
* **UNSTABLE**
*
* This capability is not part of the spec yet, and may be removed or changed at any point.
*
* Token usage information for a prompt turn.
*
* @experimental
*/
var zUsage = object({
	cachedReadTokens: number().nullish(),
	cachedWriteTokens: number().nullish(),
	inputTokens: number(),
	outputTokens: number(),
	thoughtTokens: number().nullish(),
	totalTokens: number()
});
union([object({
	id: zRequestId,
	result: union([
		zInitializeResponse,
		zAuthenticateResponse,
		zListProvidersResponse,
		zSetProviderResponse,
		zDisableProviderResponse,
		zLogoutResponse,
		zNewSessionResponse,
		zLoadSessionResponse,
		zListSessionsResponse,
		zDeleteSessionResponse,
		zForkSessionResponse,
		zResumeSessionResponse,
		zCloseSessionResponse,
		zSetSessionModeResponse,
		zSetSessionConfigOptionResponse,
		object({
			_meta: record(string(), unknown()).nullish(),
			stopReason: zStopReason,
			usage: defaultOnError(zUsage.nullish(), () => void 0)
		}),
		zStartNesResponse,
		zSuggestNesResponse,
		zCloseNesResponse,
		zExtResponse,
		zMessageMcpResponse
	])
}), object({
	error: zError,
	id: zRequestId
})]);
/**
* Context window and cost update for a session.
*/
var zUsageUpdate = object({
	_meta: record(string(), unknown()).nullish(),
	cost: defaultOnError(zCost.nullish(), () => void 0),
	size: number(),
	used: number()
});
/**
* Different types of updates that can be sent during session processing.
*
* These updates provide real-time feedback about the agent's progress.
*
* See protocol docs: [Agent Reports Output](https://agentclientprotocol.com/protocol/prompt-turn#3-agent-reports-output)
*/
var zSessionUpdate = union([
	zContentChunk.and(object({ sessionUpdate: literal("user_message_chunk") })),
	zContentChunk.and(object({ sessionUpdate: literal("agent_message_chunk") })),
	zContentChunk.and(object({ sessionUpdate: literal("agent_thought_chunk") })),
	zToolCall.and(object({ sessionUpdate: literal("tool_call") })),
	zToolCallUpdate.and(object({ sessionUpdate: literal("tool_call_update") })),
	zPlan.and(object({ sessionUpdate: literal("plan") })),
	zPlanUpdate.and(object({ sessionUpdate: literal("plan_update") })),
	zPlanRemoved.and(object({ sessionUpdate: literal("plan_removed") })),
	zAvailableCommandsUpdate.and(object({ sessionUpdate: literal("available_commands_update") })),
	zCurrentModeUpdate.and(object({ sessionUpdate: literal("current_mode_update") })),
	zConfigOptionUpdate.and(object({ sessionUpdate: literal("config_option_update") })),
	zSessionInfoUpdate.and(object({ sessionUpdate: literal("session_info_update") })),
	zUsageUpdate.and(object({ sessionUpdate: literal("usage_update") }))
]);
/**
* Notification containing a session update from the agent.
*
* Used to stream real-time progress and results during prompt processing.
*
* See protocol docs: [Agent Reports Output](https://agentclientprotocol.com/protocol/prompt-turn#3-agent-reports-output)
*/
var zSessionNotification = object({
	_meta: record(string(), unknown()).nullish(),
	sessionId: zSessionId,
	update: zSessionUpdate
});
object({
	method: string(),
	params: union([
		zSessionNotification,
		zCompleteElicitationNotification,
		zMessageMcpNotification,
		zExtNotification
	]).nullish()
});
/**
* Request to wait for a terminal command to exit.
*/
var zWaitForTerminalExitRequest = object({
	_meta: record(string(), unknown()).nullish(),
	sessionId: zSessionId,
	terminalId: string()
});
/**
* Response containing the exit status of a terminal command.
*/
var zWaitForTerminalExitResponse = object({
	_meta: record(string(), unknown()).nullish(),
	exitCode: number().int().gte(0).max(4294967295, { message: "Invalid value: Expected uint32 to be <= 4294967295" }).nullish(),
	signal: string().nullish()
});
/**
* A workspace folder.
*/
var zWorkspaceFolder = object({
	name: string(),
	uri: string()
});
/**
* Request to start an NES session.
*/
var zStartNesRequest = object({
	_meta: record(string(), unknown()).nullish(),
	repository: defaultOnError(zNesRepository.nullish(), () => void 0),
	workspaceFolders: defaultOnError(vecSkipError(zWorkspaceFolder).nullish(), () => void 0),
	workspaceUri: string().nullish()
});
object({
	id: zRequestId,
	method: string(),
	params: union([
		zInitializeRequest,
		zAuthenticateRequest,
		zListProvidersRequest,
		zSetProviderRequest,
		zDisableProviderRequest,
		zLogoutRequest,
		zNewSessionRequest,
		zLoadSessionRequest,
		zListSessionsRequest,
		zDeleteSessionRequest,
		zForkSessionRequest,
		zResumeSessionRequest,
		zCloseSessionRequest,
		zSetSessionModeRequest,
		zSetSessionConfigOptionRequest,
		zPromptRequest,
		zStartNesRequest,
		zSuggestNesRequest,
		zCloseNesRequest,
		zMessageMcpRequest,
		zExtRequest
	]).nullish()
});
/**
* Request to write content to a text file.
*
* Only available if the client supports the `fs.writeTextFile` capability.
*/
var zWriteTextFileRequest = object({
	_meta: record(string(), unknown()).nullish(),
	content: string(),
	path: string(),
	sessionId: zSessionId
});
object({
	id: zRequestId,
	method: string(),
	params: union([
		zWriteTextFileRequest,
		zReadTextFileRequest,
		zRequestPermissionRequest,
		zCreateTerminalRequest,
		zTerminalOutputRequest,
		zReleaseTerminalRequest,
		zWaitForTerminalExitRequest,
		zKillTerminalRequest,
		zCreateElicitationRequest,
		zConnectMcpRequest,
		zMessageMcpRequest,
		zDisconnectMcpRequest,
		zExtRequest
	]).nullish()
});
union([object({
	id: zRequestId,
	result: union([
		object({ _meta: record(string(), unknown()).nullish() }),
		zReadTextFileResponse,
		zRequestPermissionResponse,
		zCreateTerminalResponse,
		zTerminalOutputResponse,
		zReleaseTerminalResponse,
		zWaitForTerminalExitResponse,
		zKillTerminalResponse,
		zCreateElicitationResponse,
		zConnectMcpResponse,
		zDisconnectMcpResponse,
		zExtResponse,
		zMessageMcpResponse
	])
}), object({
	error: zError,
	id: zRequestId
})]);
//#endregion
//#region ../../node_modules/@agentclientprotocol/sdk/dist/stream.js
/**
* Creates an ACP Stream from a pair of newline-delimited JSON streams.
*
* This is the typical way to handle ACP connections over stdio, converting
* between AnyMessage objects and newline-delimited JSON.
*
* @param output - The writable stream to send encoded messages to
* @param input - The readable stream to receive encoded messages from
* @returns A Stream for bidirectional ACP communication
*/
function ndJsonStream(output, input) {
	const textEncoder = new TextEncoder();
	const textDecoder = new TextDecoder();
	return {
		readable: new ReadableStream({ async start(controller) {
			let content = "";
			const reader = input.getReader();
			try {
				while (true) {
					const { value, done } = await reader.read();
					if (done) {
						content += textDecoder.decode();
						break;
					}
					if (!value) continue;
					content += textDecoder.decode(value, { stream: true });
					const lines = content.split("\n");
					content = lines.pop() || "";
					for (const line of lines) {
						const trimmedLine = line.trim();
						if (trimmedLine) try {
							const message = JSON.parse(trimmedLine);
							controller.enqueue(message);
						} catch (err) {
							console.error("Failed to parse JSON message:", trimmedLine, err);
						}
					}
				}
				const trimmedLine = content.trim();
				if (trimmedLine) try {
					const message = JSON.parse(trimmedLine);
					controller.enqueue(message);
				} catch (err) {
					console.error("Failed to parse JSON message:", trimmedLine, err);
				}
			} catch (err) {
				controller.error(err);
				return;
			} finally {
				reader.releaseLock();
			}
			controller.close();
		} }),
		writable: new WritableStream({ async write(message) {
			const content = JSON.stringify(message) + "\n";
			const writer = output.getWriter();
			try {
				await writer.write(textEncoder.encode(content));
			} finally {
				writer.releaseLock();
			}
		} })
	};
}
//#endregion
//#region ../../node_modules/@agentclientprotocol/sdk/dist/acp.js
function emptyObjectResponse(response) {
	return response ?? {};
}
function rejectedPromise(error) {
	const promise = Promise.reject(error);
	promise.catch(() => {});
	return promise;
}
/**
* An agent-side connection to a client.
*
* This class provides the agent's view of an ACP connection, allowing
* agents to communicate with clients. It implements the {@link Client} interface
* to provide methods for requesting permissions, accessing the file system,
* and sending session updates.
*
* See protocol docs: [Agent](https://agentclientprotocol.com/protocol/overview#agent)
*/
var AgentSideConnection = class {
	connection;
	/**
	* Creates a new agent-side connection to a client.
	*
	* This establishes the communication channel from the agent's perspective
	* following the ACP specification.
	*
	* @param toAgent - A function that creates an Agent handler to process incoming client requests
	* @param stream - The bidirectional message stream for communication. Typically created using
	*                 {@link ndJsonStream} for stdio-based connections.
	*
	* See protocol docs: [Communication Model](https://agentclientprotocol.com/protocol/overview#communication-model)
	*/
	constructor(toAgent, stream) {
		const agent = toAgent(this);
		const requestHandler = async (method, params) => {
			switch (method) {
				case AGENT_METHODS.initialize: {
					const validatedParams = zInitializeRequest.parse(params);
					return agent.initialize(validatedParams);
				}
				case AGENT_METHODS.session_new: {
					const validatedParams = zNewSessionRequest.parse(params);
					return agent.newSession(validatedParams);
				}
				case AGENT_METHODS.session_load: {
					if (!agent.loadSession) throw RequestError.methodNotFound(method);
					const validatedParams = zLoadSessionRequest.parse(params);
					return agent.loadSession(validatedParams);
				}
				case AGENT_METHODS.session_list: {
					if (!agent.listSessions) throw RequestError.methodNotFound(method);
					const validatedParams = zListSessionsRequest.parse(params);
					return agent.listSessions(validatedParams);
				}
				case AGENT_METHODS.session_delete: {
					if (!agent.deleteSession) throw RequestError.methodNotFound(method);
					const validatedParams = zDeleteSessionRequest.parse(params);
					return await agent.deleteSession(validatedParams) ?? {};
				}
				case AGENT_METHODS.session_fork: {
					if (!agent.unstable_forkSession) throw RequestError.methodNotFound(method);
					const validatedParams = zForkSessionRequest.parse(params);
					return agent.unstable_forkSession(validatedParams);
				}
				case AGENT_METHODS.session_resume: {
					if (!agent.resumeSession) throw RequestError.methodNotFound(method);
					const validatedParams = zResumeSessionRequest.parse(params);
					return agent.resumeSession(validatedParams);
				}
				case AGENT_METHODS.session_close: {
					if (!agent.closeSession) throw RequestError.methodNotFound(method);
					const validatedParams = zCloseSessionRequest.parse(params);
					return await agent.closeSession(validatedParams) ?? {};
				}
				case AGENT_METHODS.session_set_mode: {
					if (!agent.setSessionMode) throw RequestError.methodNotFound(method);
					const validatedParams = zSetSessionModeRequest.parse(params);
					return await agent.setSessionMode(validatedParams) ?? {};
				}
				case AGENT_METHODS.authenticate: {
					const validatedParams = zAuthenticateRequest.parse(params);
					return await agent.authenticate(validatedParams) ?? {};
				}
				case AGENT_METHODS.providers_list: {
					if (!agent.unstable_listProviders) throw RequestError.methodNotFound(method);
					const validatedParams = zListProvidersRequest.parse(params);
					return agent.unstable_listProviders(validatedParams);
				}
				case AGENT_METHODS.providers_set: {
					if (!agent.unstable_setProvider) throw RequestError.methodNotFound(method);
					const validatedParams = zSetProviderRequest.parse(params);
					return await agent.unstable_setProvider(validatedParams) ?? {};
				}
				case AGENT_METHODS.providers_disable: {
					if (!agent.unstable_disableProvider) throw RequestError.methodNotFound(method);
					const validatedParams = zDisableProviderRequest.parse(params);
					return await agent.unstable_disableProvider(validatedParams) ?? {};
				}
				case AGENT_METHODS.logout: {
					if (!agent.logout) throw RequestError.methodNotFound(method);
					const validatedParams = zLogoutRequest.parse(params);
					return await agent.logout(validatedParams) ?? {};
				}
				case AGENT_METHODS.session_prompt: {
					const validatedParams = zPromptRequest.parse(params);
					return agent.prompt(validatedParams);
				}
				case AGENT_METHODS.session_set_config_option: {
					if (!agent.setSessionConfigOption) throw RequestError.methodNotFound(method);
					const validatedParams = zSetSessionConfigOptionRequest.parse(params);
					return agent.setSessionConfigOption(validatedParams);
				}
				case AGENT_METHODS.nes_start: {
					if (!agent.unstable_startNes) throw RequestError.methodNotFound(method);
					const validatedParams = zStartNesRequest.parse(params);
					return agent.unstable_startNes(validatedParams);
				}
				case AGENT_METHODS.nes_suggest: {
					if (!agent.unstable_suggestNes) throw RequestError.methodNotFound(method);
					const validatedParams = zSuggestNesRequest.parse(params);
					return agent.unstable_suggestNes(validatedParams);
				}
				case AGENT_METHODS.nes_close: {
					if (!agent.unstable_closeNes) throw RequestError.methodNotFound(method);
					const validatedParams = zCloseNesRequest.parse(params);
					return await agent.unstable_closeNes(validatedParams) ?? {};
				}
				default:
					if (agent.extMethod) return agent.extMethod(method, params);
					throw RequestError.methodNotFound(method);
			}
		};
		const notificationHandler = async (method, params) => {
			switch (method) {
				case AGENT_METHODS.session_cancel: {
					const validatedParams = zCancelNotification.parse(params);
					return agent.cancel(validatedParams);
				}
				case AGENT_METHODS.document_did_open: {
					if (!agent.unstable_didOpenDocument) return;
					const validatedParams = zDidOpenDocumentNotification.parse(params);
					return agent.unstable_didOpenDocument(validatedParams);
				}
				case AGENT_METHODS.document_did_change: {
					if (!agent.unstable_didChangeDocument) return;
					const validatedParams = zDidChangeDocumentNotification.parse(params);
					return agent.unstable_didChangeDocument(validatedParams);
				}
				case AGENT_METHODS.document_did_close: {
					if (!agent.unstable_didCloseDocument) return;
					const validatedParams = zDidCloseDocumentNotification.parse(params);
					return agent.unstable_didCloseDocument(validatedParams);
				}
				case AGENT_METHODS.document_did_save: {
					if (!agent.unstable_didSaveDocument) return;
					const validatedParams = zDidSaveDocumentNotification.parse(params);
					return agent.unstable_didSaveDocument(validatedParams);
				}
				case AGENT_METHODS.document_did_focus: {
					if (!agent.unstable_didFocusDocument) return;
					const validatedParams = zDidFocusDocumentNotification.parse(params);
					return agent.unstable_didFocusDocument(validatedParams);
				}
				case AGENT_METHODS.nes_accept: {
					if (!agent.unstable_acceptNes) return;
					const validatedParams = zAcceptNesNotification.parse(params);
					return agent.unstable_acceptNes(validatedParams);
				}
				case AGENT_METHODS.nes_reject: {
					if (!agent.unstable_rejectNes) return;
					const validatedParams = zRejectNesNotification.parse(params);
					return agent.unstable_rejectNes(validatedParams);
				}
				default:
					if (agent.extNotification) return agent.extNotification(method, params);
					throw RequestError.methodNotFound(method);
			}
		};
		this.connection = new Connection(requestHandler, notificationHandler, stream);
	}
	/**
	* Handles session update notifications from the agent.
	*
	* This is a notification endpoint (no response expected) that sends
	* real-time updates about session progress, including message chunks,
	* tool calls, and execution plans.
	*
	* Note: Clients SHOULD continue accepting tool call updates even after
	* sending a `session/cancel` notification, as the agent may send final
	* updates before responding with the cancelled stop reason.
	*
	* See protocol docs: [Agent Reports Output](https://agentclientprotocol.com/protocol/prompt-turn#3-agent-reports-output)
	*/
	sessionUpdate(params) {
		return this.connection.sendNotification(CLIENT_METHODS.session_update, params);
	}
	/**
	* Requests permission from the user for a tool call operation.
	*
	* Called by the agent when it needs user authorization before executing
	* a potentially sensitive operation. The client should present the options
	* to the user and return their decision.
	*
	* If the client cancels the prompt turn via `session/cancel`, it MUST
	* respond to this request with `RequestPermissionOutcome::Cancelled`.
	*
	* See protocol docs: [Requesting Permission](https://agentclientprotocol.com/protocol/tool-calls#requesting-permission)
	*/
	requestPermission(params) {
		return this.connection.sendRequest(CLIENT_METHODS.session_request_permission, params);
	}
	/**
	* Reads content from a text file in the client's file system.
	*
	* Only available if the client advertises the `fs.readTextFile` capability.
	* Allows the agent to access file contents within the client's environment.
	*
	* See protocol docs: [Client](https://agentclientprotocol.com/protocol/overview#client)
	*/
	readTextFile(params) {
		return this.connection.sendRequest(CLIENT_METHODS.fs_read_text_file, params);
	}
	/**
	* Writes content to a text file in the client's file system.
	*
	* Only available if the client advertises the `fs.writeTextFile` capability.
	* Allows the agent to create or modify files within the client's environment.
	*
	* See protocol docs: [Client](https://agentclientprotocol.com/protocol/overview#client)
	*/
	writeTextFile(params) {
		return this.connection.sendRequest(CLIENT_METHODS.fs_write_text_file, params, emptyObjectResponse);
	}
	/**
	* Executes a command in a new terminal.
	*
	* Returns a `TerminalHandle` that can be used to get output, wait for exit,
	* kill the command, or release the terminal.
	*
	* The terminal can also be embedded in tool calls by using its ID in
	* `ToolCallContent` with type "terminal".
	*
	* @param params - The terminal creation parameters
	* @returns A handle to control and monitor the terminal
	*/
	createTerminal(params) {
		return this.connection.sendRequest(CLIENT_METHODS.terminal_create, params, (response) => new TerminalHandle(response.terminalId, params.sessionId, this.connection));
	}
	/**
	* **UNSTABLE**
	*
	* This capability is not part of the spec yet, and may be removed or changed at any point.
	*
	* Creates an elicitation to request input from the user.
	*
	* @experimental
	*/
	unstable_createElicitation(params) {
		return this.connection.sendRequest(CLIENT_METHODS.elicitation_create, params);
	}
	/**
	* **UNSTABLE**
	*
	* This capability is not part of the spec yet, and may be removed or changed at any point.
	*
	* Notifies the client that a URL-based elicitation is complete.
	*
	* @experimental
	*/
	unstable_completeElicitation(params) {
		return this.connection.sendNotification(CLIENT_METHODS.elicitation_complete, params);
	}
	/**
	* Extension method
	*
	* Allows the Agent to send an arbitrary request that is not part of the ACP spec.
	*/
	extMethod(method, params) {
		return this.connection.sendRequest(method, params);
	}
	/**
	* Extension notification
	*
	* Allows the Agent to send an arbitrary notification that is not part of the ACP spec.
	*/
	extNotification(method, params) {
		return this.connection.sendNotification(method, params);
	}
	/**
	* AbortSignal that aborts when the connection closes.
	*
	* This signal can be used to:
	* - Listen for connection closure: `connection.signal.addEventListener('abort', () => {...})`
	* - Check connection status synchronously: `if (connection.signal.aborted) {...}`
	* - Pass to other APIs (fetch, setTimeout) for automatic cancellation
	*
	* The connection closes when the underlying stream ends, either normally or due to an error.
	*
	* @example
	* ```typescript
	* const connection = new AgentSideConnection(agent, stream);
	*
	* // Listen for closure
	* connection.signal.addEventListener('abort', () => {
	*   console.log('Connection closed - performing cleanup');
	* });
	*
	* // Check status
	* if (connection.signal.aborted) {
	*   console.log('Connection is already closed');
	* }
	*
	* // Pass to other APIs
	* fetch(url, { signal: connection.signal });
	* ```
	*/
	get signal() {
		return this.connection.signal;
	}
	/**
	* Promise that resolves when the connection closes.
	*
	* The connection closes when the underlying stream ends, either normally or due to an error.
	* Once closed, the connection cannot send or receive any more messages.
	*
	* This is useful for async/await style cleanup:
	*
	* @example
	* ```typescript
	* const connection = new AgentSideConnection(agent, stream);
	* await connection.closed;
	* console.log('Connection closed - performing cleanup');
	* ```
	*/
	get closed() {
		return this.connection.closed;
	}
};
/**
* Handle for controlling and monitoring a terminal created via `createTerminal`.
*
* Provides methods to:
* - Get current output without waiting
* - Wait for command completion
* - Kill the running command
* - Release terminal resources
*
* **Important:** Always call `release()` when done with the terminal to free resources.

* The terminal supports async disposal via `Symbol.asyncDispose` for automatic cleanup.

* You can use `await using` to ensure the terminal is automatically released when it
* goes out of scope.
*/
var TerminalHandle = class {
	id;
	sessionId;
	connection;
	constructor(id, sessionId, conn) {
		this.id = id;
		this.sessionId = sessionId;
		this.connection = conn;
	}
	/**
	* Gets the current terminal output without waiting for the command to exit.
	*/
	currentOutput() {
		return this.connection.sendRequest(CLIENT_METHODS.terminal_output, {
			sessionId: this.sessionId,
			terminalId: this.id
		});
	}
	/**
	* Waits for the terminal command to complete and returns its exit status.
	*/
	waitForExit() {
		return this.connection.sendRequest(CLIENT_METHODS.terminal_wait_for_exit, {
			sessionId: this.sessionId,
			terminalId: this.id
		});
	}
	/**
	* Kills the terminal command without releasing the terminal.
	*
	* The terminal remains valid after killing, allowing you to:
	* - Get the final output with `currentOutput()`
	* - Check the exit status
	* - Release the terminal when done
	*
	* Useful for implementing timeouts or cancellation.
	*/
	kill() {
		return this.connection.sendRequest(CLIENT_METHODS.terminal_kill, {
			sessionId: this.sessionId,
			terminalId: this.id
		}, emptyObjectResponse);
	}
	/**
	* Releases the terminal and frees all associated resources.
	*
	* If the command is still running, it will be killed.
	* After release, the terminal ID becomes invalid and cannot be used
	* with other terminal methods.
	*
	* Tool calls that already reference this terminal will continue to
	* display its output.
	*
	* **Important:** Always call this method when done with the terminal.
	*/
	release() {
		return this.connection.sendRequest(CLIENT_METHODS.terminal_release, {
			sessionId: this.sessionId,
			terminalId: this.id
		}, emptyObjectResponse);
	}
	async [Symbol.asyncDispose]() {
		await this.release();
	}
};
/**
* A client-side connection to an agent.
*
* This class provides the client's view of an ACP connection, allowing
* clients (such as code editors) to communicate with agents. It implements
* the {@link Agent} interface to provide methods for initializing sessions, sending
* prompts, and managing the agent lifecycle.
*
* See protocol docs: [Client](https://agentclientprotocol.com/protocol/overview#client)
*/
var ClientSideConnection = class {
	connection;
	/**
	* Creates a new client-side connection to an agent.
	*
	* This establishes the communication channel between a client and agent
	* following the ACP specification.
	*
	* @param toClient - A function that creates a Client handler to process incoming agent requests
	* @param stream - The bidirectional message stream for communication. Typically created using
	*                 {@link ndJsonStream} for stdio-based connections.
	*
	* See protocol docs: [Communication Model](https://agentclientprotocol.com/protocol/overview#communication-model)
	*/
	constructor(toClient, stream) {
		const client = toClient(this);
		const requestHandler = async (method, params) => {
			switch (method) {
				case CLIENT_METHODS.fs_write_text_file: {
					const validatedParams = zWriteTextFileRequest.parse(params);
					return await client.writeTextFile?.(validatedParams) ?? {};
				}
				case CLIENT_METHODS.fs_read_text_file: {
					const validatedParams = zReadTextFileRequest.parse(params);
					return client.readTextFile?.(validatedParams);
				}
				case CLIENT_METHODS.session_request_permission: {
					const validatedParams = zRequestPermissionRequest.parse(params);
					return client.requestPermission(validatedParams);
				}
				case CLIENT_METHODS.terminal_create: {
					const validatedParams = zCreateTerminalRequest.parse(params);
					return client.createTerminal?.(validatedParams);
				}
				case CLIENT_METHODS.terminal_output: {
					const validatedParams = zTerminalOutputRequest.parse(params);
					return client.terminalOutput?.(validatedParams);
				}
				case CLIENT_METHODS.terminal_release: {
					const validatedParams = zReleaseTerminalRequest.parse(params);
					return await client.releaseTerminal?.(validatedParams) ?? {};
				}
				case CLIENT_METHODS.terminal_wait_for_exit: {
					const validatedParams = zWaitForTerminalExitRequest.parse(params);
					return client.waitForTerminalExit?.(validatedParams);
				}
				case CLIENT_METHODS.terminal_kill: {
					const validatedParams = zKillTerminalRequest.parse(params);
					return await client.killTerminal?.(validatedParams) ?? {};
				}
				case CLIENT_METHODS.elicitation_create: {
					if (!client.unstable_createElicitation) throw RequestError.methodNotFound(method);
					const validatedParams = zCreateElicitationRequest.parse(params);
					return client.unstable_createElicitation(validatedParams);
				}
				default:
					if (client.extMethod) return client.extMethod(method, params);
					throw RequestError.methodNotFound(method);
			}
		};
		const notificationHandler = async (method, params) => {
			switch (method) {
				case CLIENT_METHODS.session_update: {
					const validatedParams = zSessionNotification.parse(params);
					return client.sessionUpdate(validatedParams);
				}
				case CLIENT_METHODS.elicitation_complete: {
					if (!client.unstable_completeElicitation) return;
					const validatedParams = zCompleteElicitationNotification.parse(params);
					return client.unstable_completeElicitation(validatedParams);
				}
				default:
					if (client.extNotification) return client.extNotification(method, params);
					throw RequestError.methodNotFound(method);
			}
		};
		this.connection = new Connection(requestHandler, notificationHandler, stream);
	}
	/**
	* Establishes the connection with a client and negotiates protocol capabilities.
	*
	* This method is called once at the beginning of the connection to:
	* - Negotiate the protocol version to use
	* - Exchange capability information between client and agent
	* - Determine available authentication methods
	*
	* The agent should respond with its supported protocol version and capabilities.
	*
	* See protocol docs: [Initialization](https://agentclientprotocol.com/protocol/initialization)
	*/
	initialize(params) {
		return this.connection.sendRequest(AGENT_METHODS.initialize, params);
	}
	/**
	* Creates a new conversation session with the agent.
	*
	* Sessions represent independent conversation contexts with their own history and state.
	*
	* The agent should:
	* - Create a new session context
	* - Connect to any specified MCP servers
	* - Return a unique session ID for future requests
	*
	* The request may include `additionalDirectories` to expand the session's filesystem
	* scope beyond `cwd` without changing the base for relative paths.
	*
	* May return an `auth_required` error if the agent requires authentication.
	*
	* See protocol docs: [Session Setup](https://agentclientprotocol.com/protocol/session-setup)
	*/
	newSession(params) {
		return this.connection.sendRequest(AGENT_METHODS.session_new, params);
	}
	/**
	* Loads an existing session to resume a previous conversation.
	*
	* This method is only available if the agent advertises the `loadSession` capability.
	*
	* The agent should:
	* - Restore the session context and conversation history
	* - Connect to the specified MCP servers
	* - Stream the entire conversation history back to the client via notifications
	*
	* The request may include `additionalDirectories` to set the complete list of
	* additional workspace roots for the loaded session.
	*
	* See protocol docs: [Loading Sessions](https://agentclientprotocol.com/protocol/session-setup#loading-sessions)
	*/
	loadSession(params) {
		return this.connection.sendRequest(AGENT_METHODS.session_load, params, emptyObjectResponse);
	}
	/**
	* **UNSTABLE**
	*
	* This capability is not part of the spec yet, and may be removed or changed at any point.
	*
	* Forks an existing session to create a new independent session.
	*
	* Creates a new session based on the context of an existing one, allowing
	* operations like generating summaries without affecting the original session's history.
	*
	* The request may include `additionalDirectories` to set the complete list of
	* additional workspace roots for the forked session.
	*
	* This method is only available if the agent advertises the `session.fork` capability.
	*
	* @experimental
	*/
	unstable_forkSession(params) {
		return this.connection.sendRequest(AGENT_METHODS.session_fork, params);
	}
	/**
	* Lists existing sessions from the agent.
	*
	* This method is only available if the agent advertises the `listSessions` capability.
	*
	* Returns a list of sessions with metadata like session ID, working directory,
	* title, and last update time. Supports filtering by working directory,
	* `additionalDirectories`, and cursor-based pagination.
	*/
	listSessions(params) {
		return this.connection.sendRequest(AGENT_METHODS.session_list, params);
	}
	/**
	* Deletes an existing session returned by `session/list`.
	*
	* This method is only available if the agent advertises the `sessionCapabilities.delete` capability.
	*/
	deleteSession(params) {
		return this.connection.sendRequest(AGENT_METHODS.session_delete, params, emptyObjectResponse);
	}
	/**
	* Resumes an existing session without returning previous messages.
	*
	* This method is only available if the agent advertises the `session.resume` capability.
	*
	* The agent should resume the session context, allowing the conversation to continue
	* without replaying the message history (unlike `session/load`).
	*
	* The request may include `additionalDirectories` to set the complete list of
	* additional workspace roots for the resumed session.
	*/
	resumeSession(params) {
		return this.connection.sendRequest(AGENT_METHODS.session_resume, params);
	}
	/**
	* Closes an active session and frees up any resources associated with it.
	*
	* This method is only available if the agent advertises the `session.close` capability.
	*
	* The agent must cancel any ongoing work (as if `session/cancel` was called)
	* and then free up any resources associated with the session.
	*/
	closeSession(params) {
		return this.connection.sendRequest(AGENT_METHODS.session_close, params);
	}
	/**
	* Sets the operational mode for a session.
	*
	* Allows switching between different agent modes (e.g., "ask", "architect", "code")
	* that affect system prompts, tool availability, and permission behaviors.
	*
	* The mode must be one of the modes advertised in `availableModes` during session
	* creation or loading. Agents may also change modes autonomously and notify the
	* client via `current_mode_update` notifications.
	*
	* This method can be called at any time during a session, whether the Agent is
	* idle or actively generating a turn.
	*
	* See protocol docs: [Session Modes](https://agentclientprotocol.com/protocol/session-modes)
	*/
	setSessionMode(params) {
		return this.connection.sendRequest(AGENT_METHODS.session_set_mode, params, emptyObjectResponse);
	}
	/**
	* Set a configuration option for a given session.
	*
	* The response contains the full set of configuration options and their current values,
	* as changing one option may affect the available values or state of other options.
	*/
	setSessionConfigOption(params) {
		return this.connection.sendRequest(AGENT_METHODS.session_set_config_option, params);
	}
	/**
	* Authenticates the client using the specified authentication method.
	*
	* Called when the agent requires authentication before allowing session creation.
	* The client provides the authentication method ID that was advertised during initialization.
	*
	* After successful authentication, the client can proceed to create sessions with
	* `newSession` without receiving an `auth_required` error.
	*
	* See protocol docs: [Initialization](https://agentclientprotocol.com/protocol/initialization)
	*/
	authenticate(params) {
		return this.connection.sendRequest(AGENT_METHODS.authenticate, params, emptyObjectResponse);
	}
	/**
	* **UNSTABLE**
	*
	* This capability is not part of the spec yet, and may be removed or changed at any point.
	*
	* Lists providers that can be configured by the client.
	*
	* This method is only available if the agent advertises the `providers` capability.
	*
	* @experimental
	*/
	unstable_listProviders(params) {
		return this.connection.sendRequest(AGENT_METHODS.providers_list, params);
	}
	/**
	* **UNSTABLE**
	*
	* This capability is not part of the spec yet, and may be removed or changed at any point.
	*
	* Replaces the configuration for a provider.
	*
	* This method is only available if the agent advertises the `providers` capability.
	*
	* @experimental
	*/
	unstable_setProvider(params) {
		return this.connection.sendRequest(AGENT_METHODS.providers_set, params, emptyObjectResponse);
	}
	/**
	* **UNSTABLE**
	*
	* This capability is not part of the spec yet, and may be removed or changed at any point.
	*
	* Disables a provider.
	*
	* This method is only available if the agent advertises the `providers` capability.
	*
	* @experimental
	*/
	unstable_disableProvider(params) {
		return this.connection.sendRequest(AGENT_METHODS.providers_disable, params, emptyObjectResponse);
	}
	/**
	* Logout of the current authentication method.
	*/
	logout(params) {
		return this.connection.sendRequest(AGENT_METHODS.logout, params, emptyObjectResponse);
	}
	/**
	* Processes a user prompt within a session.
	*
	* This method handles the whole lifecycle of a prompt:
	* - Receives user messages with optional context (files, images, etc.)
	* - Processes the prompt using language models
	* - Reports language model content and tool calls to the Clients
	* - Requests permission to run tools
	* - Executes any requested tool calls
	* - Returns when the turn is complete with a stop reason
	*
	* See protocol docs: [Prompt Turn](https://agentclientprotocol.com/protocol/prompt-turn)
	*/
	prompt(params) {
		return this.connection.sendRequest(AGENT_METHODS.session_prompt, params);
	}
	/**
	* Cancels ongoing operations for a session.
	*
	* This is a notification sent by the client to cancel an ongoing prompt turn.
	*
	* Upon receiving this notification, the Agent SHOULD:
	* - Stop all language model requests as soon as possible
	* - Abort all tool call invocations in progress
	* - Send any pending `session/update` notifications
	* - Respond to the original `session/prompt` request with `StopReason::Cancelled`
	*
	* See protocol docs: [Cancellation](https://agentclientprotocol.com/protocol/prompt-turn#cancellation)
	*/
	cancel(params) {
		return this.connection.sendNotification(AGENT_METHODS.session_cancel, params);
	}
	/**
	* **UNSTABLE**: This capability is not part of the spec yet, and may be removed or changed at any point.
	*
	* Starts a NES (Next Edit Suggestions) session.
	*
	* @experimental
	*/
	unstable_startNes(params) {
		return this.connection.sendRequest(AGENT_METHODS.nes_start, params);
	}
	/**
	* **UNSTABLE**: This capability is not part of the spec yet, and may be removed or changed at any point.
	*
	* Sends a NES suggestion request.
	*
	* @experimental
	*/
	unstable_suggestNes(params) {
		return this.connection.sendRequest(AGENT_METHODS.nes_suggest, params);
	}
	/**
	* **UNSTABLE**: This capability is not part of the spec yet, and may be removed or changed at any point.
	*
	* Closes a NES session.
	*
	* @experimental
	*/
	unstable_closeNes(params) {
		return this.connection.sendRequest(AGENT_METHODS.nes_close, params, emptyObjectResponse);
	}
	/**
	* **UNSTABLE**: This capability is not part of the spec yet, and may be removed or changed at any point.
	*
	* Notifies the agent that a document was opened.
	*
	* @experimental
	*/
	unstable_didOpenDocument(params) {
		return this.connection.sendNotification(AGENT_METHODS.document_did_open, params);
	}
	/**
	* **UNSTABLE**: This capability is not part of the spec yet, and may be removed or changed at any point.
	*
	* Notifies the agent that a document was changed.
	*
	* @experimental
	*/
	unstable_didChangeDocument(params) {
		return this.connection.sendNotification(AGENT_METHODS.document_did_change, params);
	}
	/**
	* **UNSTABLE**: This capability is not part of the spec yet, and may be removed or changed at any point.
	*
	* Notifies the agent that a document was closed.
	*
	* @experimental
	*/
	unstable_didCloseDocument(params) {
		return this.connection.sendNotification(AGENT_METHODS.document_did_close, params);
	}
	/**
	* **UNSTABLE**: This capability is not part of the spec yet, and may be removed or changed at any point.
	*
	* Notifies the agent that a document was saved.
	*
	* @experimental
	*/
	unstable_didSaveDocument(params) {
		return this.connection.sendNotification(AGENT_METHODS.document_did_save, params);
	}
	/**
	* **UNSTABLE**: This capability is not part of the spec yet, and may be removed or changed at any point.
	*
	* Notifies the agent that a document received focus.
	*
	* @experimental
	*/
	unstable_didFocusDocument(params) {
		return this.connection.sendNotification(AGENT_METHODS.document_did_focus, params);
	}
	/**
	* **UNSTABLE**: This capability is not part of the spec yet, and may be removed or changed at any point.
	*
	* Notifies the agent that a NES suggestion was accepted.
	*
	* @experimental
	*/
	unstable_acceptNes(params) {
		return this.connection.sendNotification(AGENT_METHODS.nes_accept, params);
	}
	/**
	* **UNSTABLE**: This capability is not part of the spec yet, and may be removed or changed at any point.
	*
	* Notifies the agent that a NES suggestion was rejected.
	*
	* @experimental
	*/
	unstable_rejectNes(params) {
		return this.connection.sendNotification(AGENT_METHODS.nes_reject, params);
	}
	/**
	* Extension method
	*
	* Allows the Client to send an arbitrary request that is not part of the ACP spec.
	*/
	extMethod(method, params) {
		return this.connection.sendRequest(method, params);
	}
	/**
	* Extension notification
	*
	* Allows the Client to send an arbitrary notification that is not part of the ACP spec.
	*/
	extNotification(method, params) {
		return this.connection.sendNotification(method, params);
	}
	/**
	* AbortSignal that aborts when the connection closes.
	*
	* This signal can be used to:
	* - Listen for connection closure: `connection.signal.addEventListener('abort', () => {...})`
	* - Check connection status synchronously: `if (connection.signal.aborted) {...}`
	* - Pass to other APIs (fetch, setTimeout) for automatic cancellation
	*
	* The connection closes when the underlying stream ends, either normally or due to an error.
	*
	* @example
	* ```typescript
	* const connection = new ClientSideConnection(client, stream);
	*
	* // Listen for closure
	* connection.signal.addEventListener('abort', () => {
	*   console.log('Connection closed - performing cleanup');
	* });
	*
	* // Check status
	* if (connection.signal.aborted) {
	*   console.log('Connection is already closed');
	* }
	*
	* // Pass to other APIs
	* fetch(url, { signal: connection.signal });
	* ```
	*/
	get signal() {
		return this.connection.signal;
	}
	/**
	* Promise that resolves when the connection closes.
	*
	* The connection closes when the underlying stream ends, either normally or due to an error.
	* Once closed, the connection cannot send or receive any more messages.
	*
	* This is useful for async/await style cleanup:
	*
	* @example
	* ```typescript
	* const connection = new ClientSideConnection(client, stream);
	* await connection.closed;
	* console.log('Connection closed - performing cleanup');
	* ```
	*/
	get closed() {
		return this.connection.closed;
	}
};
var Connection = class {
	pendingResponses = /* @__PURE__ */ new Map();
	nextRequestId = 0;
	requestHandler;
	notificationHandler;
	stream;
	writeQueue = Promise.resolve();
	abortController = new AbortController();
	closedPromise;
	constructor(requestHandler, notificationHandler, stream) {
		this.requestHandler = requestHandler;
		this.notificationHandler = notificationHandler;
		this.stream = stream;
		this.closedPromise = new Promise((resolve) => {
			this.abortController.signal.addEventListener("abort", () => resolve());
		});
		this.receive();
	}
	/**
	* AbortSignal that aborts when the connection closes.
	*
	* This signal can be used to:
	* - Listen for connection closure via event listeners
	* - Check connection status synchronously with `signal.aborted`
	* - Pass to other APIs (fetch, setTimeout) for automatic cancellation
	*/
	get signal() {
		return this.abortController.signal;
	}
	/**
	* Promise that resolves when the connection closes.
	*
	* The connection closes when the underlying stream ends, either normally
	* or due to an error. Once closed, the connection cannot send or receive
	* any more messages.
	*
	* @example
	* ```typescript
	* const connection = new ClientSideConnection(client, stream);
	* await connection.closed;
	* console.log('Connection closed - performing cleanup');
	* ```
	*/
	get closed() {
		return this.closedPromise;
	}
	async receive() {
		let closeError = void 0;
		try {
			const reader = this.stream.readable.getReader();
			try {
				while (!this.abortController.signal.aborted) {
					const { value: message, done } = await reader.read();
					if (done) break;
					if (!message) continue;
					try {
						this.processMessage(message);
					} catch (err) {
						console.error("Unexpected error during message processing:", message, err);
						if ("id" in message && message.id !== void 0) this.sendMessage({
							jsonrpc: "2.0",
							id: message.id,
							error: {
								code: -32700,
								message: "Parse error"
							}
						});
					}
				}
			} finally {
				reader.releaseLock();
			}
		} catch (error) {
			closeError = error;
		} finally {
			this.close(closeError);
		}
	}
	close(error) {
		if (this.abortController.signal.aborted) return;
		const closeError = error ?? /* @__PURE__ */ new Error("ACP connection closed");
		for (const pendingResponse of this.pendingResponses.values()) pendingResponse.reject(closeError);
		this.pendingResponses.clear();
		this.abortController.abort(closeError);
	}
	async processMessage(message) {
		if ("method" in message && "id" in message) {
			const response = await this.tryCallRequestHandler(message.method, message.params);
			if ("error" in response) console.error("Error handling request", message, response.error);
			await this.sendMessage({
				jsonrpc: "2.0",
				id: message.id,
				...response
			});
		} else if ("method" in message) {
			const response = await this.tryCallNotificationHandler(message.method, message.params);
			if ("error" in response) console.error("Error handling notification", message, response.error);
		} else if ("id" in message) this.handleResponse(message);
		else console.error("Invalid message", { message });
	}
	async tryCallRequestHandler(method, params) {
		try {
			return { result: await this.requestHandler(method, params) ?? null };
		} catch (error) {
			if (error instanceof RequestError) return error.toResult();
			if (error instanceof ZodError) return RequestError.invalidParams(error.format()).toResult();
			let details;
			if (error instanceof Error) details = error.message;
			else if (typeof error === "object" && error != null && "message" in error && typeof error.message === "string") details = error.message;
			try {
				return RequestError.internalError(details ? JSON.parse(details) : {}).toResult();
			} catch {
				return RequestError.internalError({ details }).toResult();
			}
		}
	}
	async tryCallNotificationHandler(method, params) {
		try {
			await this.notificationHandler(method, params);
			return { result: null };
		} catch (error) {
			if (error instanceof RequestError) return error.toResult();
			if (error instanceof ZodError) return RequestError.invalidParams(error.format()).toResult();
			let details;
			if (error instanceof Error) details = error.message;
			else if (typeof error === "object" && error != null && "message" in error && typeof error.message === "string") details = error.message;
			try {
				return RequestError.internalError(details ? JSON.parse(details) : {}).toResult();
			} catch {
				return RequestError.internalError({ details }).toResult();
			}
		}
	}
	handleResponse(response) {
		const pendingResponse = this.pendingResponses.get(response.id);
		if (pendingResponse) {
			if ("result" in response) pendingResponse.resolve(response.result);
			else if ("error" in response) {
				const { code, message, data } = response.error;
				pendingResponse.reject(new RequestError(code, message, data));
			}
			this.pendingResponses.delete(response.id);
		} else console.error("Got response to unknown request", response.id);
	}
	sendRequest(method, params, mapResponse) {
		if (this.abortController.signal.aborted) return rejectedPromise(this.closedReason());
		const id = this.nextRequestId++;
		const responsePromise = new Promise((resolve, reject) => {
			this.pendingResponses.set(id, {
				resolve: (response) => {
					try {
						resolve(mapResponse ? mapResponse(response) : response);
					} catch (error) {
						reject(error);
					}
				},
				reject
			});
		});
		responsePromise.catch(() => {});
		this.sendMessage({
			jsonrpc: "2.0",
			id,
			method,
			params
		});
		return responsePromise;
	}
	sendNotification(method, params) {
		if (this.abortController.signal.aborted) return rejectedPromise(this.closedReason());
		return this.sendMessage({
			jsonrpc: "2.0",
			method,
			params
		});
	}
	closedReason() {
		return this.abortController.signal.reason ?? /* @__PURE__ */ new Error("ACP connection closed");
	}
	async sendMessage(message) {
		this.writeQueue = this.writeQueue.then(async () => {
			const writer = this.stream.writable.getWriter();
			try {
				await writer.write(message);
			} finally {
				writer.releaseLock();
			}
		}).catch((error) => {
			this.close(error);
		});
		return this.writeQueue;
	}
};
/**
* JSON-RPC error object.
*
* Represents an error that occurred during method execution, following the
* JSON-RPC 2.0 error object specification with optional additional data.
*
* See protocol docs: [JSON-RPC Error Object](https://www.jsonrpc.org/specification#error_object)
*/
var RequestError = class RequestError extends Error {
	code;
	data;
	constructor(code, message, data) {
		super(message);
		this.code = code;
		this.name = "RequestError";
		this.data = data;
	}
	/**
	* Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text.
	*/
	static parseError(data, additionalMessage) {
		return new RequestError(-32700, `Parse error${additionalMessage ? `: ${additionalMessage}` : ""}`, data);
	}
	/**
	* The JSON sent is not a valid Request object.
	*/
	static invalidRequest(data, additionalMessage) {
		return new RequestError(-32600, `Invalid request${additionalMessage ? `: ${additionalMessage}` : ""}`, data);
	}
	/**
	* The method does not exist / is not available.
	*/
	static methodNotFound(method) {
		return new RequestError(-32601, `"Method not found": ${method}`, { method });
	}
	/**
	* Invalid method parameter(s).
	*/
	static invalidParams(data, additionalMessage) {
		return new RequestError(-32602, `Invalid params${additionalMessage ? `: ${additionalMessage}` : ""}`, data);
	}
	/**
	* Internal JSON-RPC error.
	*/
	static internalError(data, additionalMessage) {
		return new RequestError(-32603, `Internal error${additionalMessage ? `: ${additionalMessage}` : ""}`, data);
	}
	/**
	* Authentication required.
	*/
	static authRequired(data, additionalMessage) {
		return new RequestError(-32e3, `Authentication required${additionalMessage ? `: ${additionalMessage}` : ""}`, data);
	}
	/**
	* Resource, such as a file, was not found
	*/
	static resourceNotFound(uri) {
		return new RequestError(-32002, `Resource not found${uri ? `: ${uri}` : ""}`, uri && { uri });
	}
	toResult() {
		return { error: {
			code: this.code,
			message: this.message,
			data: this.data
		} };
	}
	toErrorResponse() {
		return {
			code: this.code,
			message: this.message,
			data: this.data
		};
	}
};
//#endregion
exports.AGENT_METHODS = AGENT_METHODS;
exports.AgentSideConnection = AgentSideConnection;
exports.CLIENT_METHODS = CLIENT_METHODS;
exports.ClientSideConnection = ClientSideConnection;
exports.PROTOCOL_VERSION = PROTOCOL_VERSION;
exports.RequestError = RequestError;
exports.TerminalHandle = TerminalHandle;
exports.ndJsonStream = ndJsonStream;
