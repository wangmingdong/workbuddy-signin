const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./acp-BO6mT7xd.js","./chunk-BRZcfu7K.js","./e2b-filesystem-CXgdVL_7.js"])))=>i.map(i=>d[i]);
import { n as __esmMin, r as __exportAll } from "./chunk-BRZcfu7K.js";
import { n as init_preload_helper, t as __vitePreload } from "./preload-helper-E3UYCQGP.js";
import { n as process$1, t as init_dist } from "./dist-CSHw4oQX.js";
import { n as init_dist$1, t as Buffer } from "./dist-DNjXzICC.js";
//#region ../../packages/agent-provider/node_modules/zod/v3/helpers/util.js
var util, objectUtil, ZodParsedType, getParsedType;
var init_util = __esmMin((() => {
	(function(util) {
		util.assertEqual = (_) => {};
		function assertIs(_arg) {}
		util.assertIs = assertIs;
		function assertNever(_x) {
			throw new Error();
		}
		util.assertNever = assertNever;
		util.arrayToEnum = (items) => {
			const obj = {};
			for (const item of items) obj[item] = item;
			return obj;
		};
		util.getValidEnumValues = (obj) => {
			const validKeys = util.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
			const filtered = {};
			for (const k of validKeys) filtered[k] = obj[k];
			return util.objectValues(filtered);
		};
		util.objectValues = (obj) => {
			return util.objectKeys(obj).map(function(e) {
				return obj[e];
			});
		};
		util.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
			const keys = [];
			for (const key in object) if (Object.prototype.hasOwnProperty.call(object, key)) keys.push(key);
			return keys;
		};
		util.find = (arr, checker) => {
			for (const item of arr) if (checker(item)) return item;
		};
		util.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && Number.isFinite(val) && Math.floor(val) === val;
		function joinValues(array, separator = " | ") {
			return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
		}
		util.joinValues = joinValues;
		util.jsonStringifyReplacer = (_, value) => {
			if (typeof value === "bigint") return value.toString();
			return value;
		};
	})(util || (util = {}));
	(function(objectUtil) {
		objectUtil.mergeShapes = (first, second) => {
			return {
				...first,
				...second
			};
		};
	})(objectUtil || (objectUtil = {}));
	ZodParsedType = util.arrayToEnum([
		"string",
		"nan",
		"number",
		"integer",
		"float",
		"boolean",
		"date",
		"bigint",
		"symbol",
		"function",
		"undefined",
		"null",
		"array",
		"object",
		"unknown",
		"promise",
		"void",
		"never",
		"map",
		"set"
	]);
	getParsedType = (data) => {
		switch (typeof data) {
			case "undefined": return ZodParsedType.undefined;
			case "string": return ZodParsedType.string;
			case "number": return Number.isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
			case "boolean": return ZodParsedType.boolean;
			case "function": return ZodParsedType.function;
			case "bigint": return ZodParsedType.bigint;
			case "symbol": return ZodParsedType.symbol;
			case "object":
				if (Array.isArray(data)) return ZodParsedType.array;
				if (data === null) return ZodParsedType.null;
				if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") return ZodParsedType.promise;
				if (typeof Map !== "undefined" && data instanceof Map) return ZodParsedType.map;
				if (typeof Set !== "undefined" && data instanceof Set) return ZodParsedType.set;
				if (typeof Date !== "undefined" && data instanceof Date) return ZodParsedType.date;
				return ZodParsedType.object;
			default: return ZodParsedType.unknown;
		}
	};
}));
//#endregion
//#region ../../packages/agent-provider/node_modules/zod/v3/ZodError.js
var ZodIssueCode, ZodError;
var init_ZodError = __esmMin((() => {
	init_util();
	ZodIssueCode = util.arrayToEnum([
		"invalid_type",
		"invalid_literal",
		"custom",
		"invalid_union",
		"invalid_union_discriminator",
		"invalid_enum_value",
		"unrecognized_keys",
		"invalid_arguments",
		"invalid_return_type",
		"invalid_date",
		"invalid_string",
		"too_small",
		"too_big",
		"invalid_intersection_types",
		"not_multiple_of",
		"not_finite"
	]);
	ZodError = class ZodError extends Error {
		get errors() {
			return this.issues;
		}
		constructor(issues) {
			super();
			this.issues = [];
			this.addIssue = (sub) => {
				this.issues = [...this.issues, sub];
			};
			this.addIssues = (subs = []) => {
				this.issues = [...this.issues, ...subs];
			};
			const actualProto = new.target.prototype;
			if (Object.setPrototypeOf) Object.setPrototypeOf(this, actualProto);
			else this.__proto__ = actualProto;
			this.name = "ZodError";
			this.issues = issues;
		}
		format(_mapper) {
			const mapper = _mapper || function(issue) {
				return issue.message;
			};
			const fieldErrors = { _errors: [] };
			const processError = (error) => {
				for (const issue of error.issues) if (issue.code === "invalid_union") issue.unionErrors.map(processError);
				else if (issue.code === "invalid_return_type") processError(issue.returnTypeError);
				else if (issue.code === "invalid_arguments") processError(issue.argumentsError);
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
			processError(this);
			return fieldErrors;
		}
		static assert(value) {
			if (!(value instanceof ZodError)) throw new Error(`Not a ZodError: ${value}`);
		}
		toString() {
			return this.message;
		}
		get message() {
			return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
		}
		get isEmpty() {
			return this.issues.length === 0;
		}
		flatten(mapper = (issue) => issue.message) {
			const fieldErrors = {};
			const formErrors = [];
			for (const sub of this.issues) if (sub.path.length > 0) {
				const firstEl = sub.path[0];
				fieldErrors[firstEl] = fieldErrors[firstEl] || [];
				fieldErrors[firstEl].push(mapper(sub));
			} else formErrors.push(mapper(sub));
			return {
				formErrors,
				fieldErrors
			};
		}
		get formErrors() {
			return this.flatten();
		}
	};
	ZodError.create = (issues) => {
		return new ZodError(issues);
	};
}));
//#endregion
//#region ../../packages/agent-provider/node_modules/zod/v3/locales/en.js
var errorMap;
var init_en = __esmMin((() => {
	init_ZodError();
	init_util();
	errorMap = (issue, _ctx) => {
		let message;
		switch (issue.code) {
			case ZodIssueCode.invalid_type:
				if (issue.received === ZodParsedType.undefined) message = "Required";
				else message = `Expected ${issue.expected}, received ${issue.received}`;
				break;
			case ZodIssueCode.invalid_literal:
				message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
				break;
			case ZodIssueCode.unrecognized_keys:
				message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
				break;
			case ZodIssueCode.invalid_union:
				message = `Invalid input`;
				break;
			case ZodIssueCode.invalid_union_discriminator:
				message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
				break;
			case ZodIssueCode.invalid_enum_value:
				message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
				break;
			case ZodIssueCode.invalid_arguments:
				message = `Invalid function arguments`;
				break;
			case ZodIssueCode.invalid_return_type:
				message = `Invalid function return type`;
				break;
			case ZodIssueCode.invalid_date:
				message = `Invalid date`;
				break;
			case ZodIssueCode.invalid_string:
				if (typeof issue.validation === "object") if ("includes" in issue.validation) {
					message = `Invalid input: must include "${issue.validation.includes}"`;
					if (typeof issue.validation.position === "number") message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
				} else if ("startsWith" in issue.validation) message = `Invalid input: must start with "${issue.validation.startsWith}"`;
				else if ("endsWith" in issue.validation) message = `Invalid input: must end with "${issue.validation.endsWith}"`;
				else util.assertNever(issue.validation);
				else if (issue.validation !== "regex") message = `Invalid ${issue.validation}`;
				else message = "Invalid";
				break;
			case ZodIssueCode.too_small:
				if (issue.type === "array") message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
				else if (issue.type === "string") message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
				else if (issue.type === "number") message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
				else if (issue.type === "bigint") message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
				else if (issue.type === "date") message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
				else message = "Invalid input";
				break;
			case ZodIssueCode.too_big:
				if (issue.type === "array") message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
				else if (issue.type === "string") message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
				else if (issue.type === "number") message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
				else if (issue.type === "bigint") message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
				else if (issue.type === "date") message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
				else message = "Invalid input";
				break;
			case ZodIssueCode.custom:
				message = `Invalid input`;
				break;
			case ZodIssueCode.invalid_intersection_types:
				message = `Intersection results could not be merged`;
				break;
			case ZodIssueCode.not_multiple_of:
				message = `Number must be a multiple of ${issue.multipleOf}`;
				break;
			case ZodIssueCode.not_finite:
				message = "Number must be finite";
				break;
			default:
				message = _ctx.defaultError;
				util.assertNever(issue);
		}
		return { message };
	};
}));
//#endregion
//#region ../../packages/agent-provider/node_modules/zod/v3/errors.js
function getErrorMap() {
	return overrideErrorMap;
}
var overrideErrorMap;
var init_errors$1 = __esmMin((() => {
	init_en();
	overrideErrorMap = errorMap;
}));
//#endregion
//#region ../../packages/agent-provider/node_modules/zod/v3/helpers/parseUtil.js
function addIssueToContext(ctx, issueData) {
	const overrideMap = getErrorMap();
	const issue = makeIssue({
		issueData,
		data: ctx.data,
		path: ctx.path,
		errorMaps: [
			ctx.common.contextualErrorMap,
			ctx.schemaErrorMap,
			overrideMap,
			overrideMap === errorMap ? void 0 : errorMap
		].filter((x) => !!x)
	});
	ctx.common.issues.push(issue);
}
var makeIssue, ParseStatus, INVALID, DIRTY, OK, isAborted, isDirty, isValid, isAsync;
var init_parseUtil = __esmMin((() => {
	init_errors$1();
	init_en();
	makeIssue = (params) => {
		const { data, path, errorMaps, issueData } = params;
		const fullPath = [...path, ...issueData.path || []];
		const fullIssue = {
			...issueData,
			path: fullPath
		};
		if (issueData.message !== void 0) return {
			...issueData,
			path: fullPath,
			message: issueData.message
		};
		let errorMessage = "";
		const maps = errorMaps.filter((m) => !!m).slice().reverse();
		for (const map of maps) errorMessage = map(fullIssue, {
			data,
			defaultError: errorMessage
		}).message;
		return {
			...issueData,
			path: fullPath,
			message: errorMessage
		};
	};
	ParseStatus = class ParseStatus {
		constructor() {
			this.value = "valid";
		}
		dirty() {
			if (this.value === "valid") this.value = "dirty";
		}
		abort() {
			if (this.value !== "aborted") this.value = "aborted";
		}
		static mergeArray(status, results) {
			const arrayValue = [];
			for (const s of results) {
				if (s.status === "aborted") return INVALID;
				if (s.status === "dirty") status.dirty();
				arrayValue.push(s.value);
			}
			return {
				status: status.value,
				value: arrayValue
			};
		}
		static async mergeObjectAsync(status, pairs) {
			const syncPairs = [];
			for (const pair of pairs) {
				const key = await pair.key;
				const value = await pair.value;
				syncPairs.push({
					key,
					value
				});
			}
			return ParseStatus.mergeObjectSync(status, syncPairs);
		}
		static mergeObjectSync(status, pairs) {
			const finalObject = {};
			for (const pair of pairs) {
				const { key, value } = pair;
				if (key.status === "aborted") return INVALID;
				if (value.status === "aborted") return INVALID;
				if (key.status === "dirty") status.dirty();
				if (value.status === "dirty") status.dirty();
				if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) finalObject[key.value] = value.value;
			}
			return {
				status: status.value,
				value: finalObject
			};
		}
	};
	INVALID = Object.freeze({ status: "aborted" });
	DIRTY = (value) => ({
		status: "dirty",
		value
	});
	OK = (value) => ({
		status: "valid",
		value
	});
	isAborted = (x) => x.status === "aborted";
	isDirty = (x) => x.status === "dirty";
	isValid = (x) => x.status === "valid";
	isAsync = (x) => typeof Promise !== "undefined" && x instanceof Promise;
}));
//#endregion
//#region ../../packages/agent-provider/node_modules/zod/v3/helpers/typeAliases.js
var init_typeAliases = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-provider/node_modules/zod/v3/helpers/errorUtil.js
var errorUtil;
var init_errorUtil = __esmMin((() => {
	(function(errorUtil) {
		errorUtil.errToObj = (message) => typeof message === "string" ? { message } : message || {};
		errorUtil.toString = (message) => typeof message === "string" ? message : message?.message;
	})(errorUtil || (errorUtil = {}));
}));
//#endregion
//#region ../../packages/agent-provider/node_modules/zod/v3/types.js
function processCreateParams(params) {
	if (!params) return {};
	const { errorMap, invalid_type_error, required_error, description } = params;
	if (errorMap && (invalid_type_error || required_error)) throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
	if (errorMap) return {
		errorMap,
		description
	};
	const customMap = (iss, ctx) => {
		const { message } = params;
		if (iss.code === "invalid_enum_value") return { message: message ?? ctx.defaultError };
		if (typeof ctx.data === "undefined") return { message: message ?? required_error ?? ctx.defaultError };
		if (iss.code !== "invalid_type") return { message: ctx.defaultError };
		return { message: message ?? invalid_type_error ?? ctx.defaultError };
	};
	return {
		errorMap: customMap,
		description
	};
}
function timeRegexSource(args) {
	let secondsRegexSource = `[0-5]\\d`;
	if (args.precision) secondsRegexSource = `${secondsRegexSource}\\.\\d{${args.precision}}`;
	else if (args.precision == null) secondsRegexSource = `${secondsRegexSource}(\\.\\d+)?`;
	const secondsQuantifier = args.precision ? "+" : "?";
	return `([01]\\d|2[0-3]):[0-5]\\d(:${secondsRegexSource})${secondsQuantifier}`;
}
function timeRegex(args) {
	return new RegExp(`^${timeRegexSource(args)}$`);
}
function datetimeRegex(args) {
	let regex = `${dateRegexSource}T${timeRegexSource(args)}`;
	const opts = [];
	opts.push(args.local ? `Z?` : `Z`);
	if (args.offset) opts.push(`([+-]\\d{2}:?\\d{2})`);
	regex = `${regex}(${opts.join("|")})`;
	return new RegExp(`^${regex}$`);
}
function isValidIP(ip, version) {
	if ((version === "v4" || !version) && ipv4Regex.test(ip)) return true;
	if ((version === "v6" || !version) && ipv6Regex.test(ip)) return true;
	return false;
}
function isValidJWT(jwt, alg) {
	if (!jwtRegex.test(jwt)) return false;
	try {
		const [header] = jwt.split(".");
		if (!header) return false;
		const base64 = header.replace(/-/g, "+").replace(/_/g, "/").padEnd(header.length + (4 - header.length % 4) % 4, "=");
		const decoded = JSON.parse(atob(base64));
		if (typeof decoded !== "object" || decoded === null) return false;
		if ("typ" in decoded && decoded?.typ !== "JWT") return false;
		if (!decoded.alg) return false;
		if (alg && decoded.alg !== alg) return false;
		return true;
	} catch {
		return false;
	}
}
function isValidCidr(ip, version) {
	if ((version === "v4" || !version) && ipv4CidrRegex.test(ip)) return true;
	if ((version === "v6" || !version) && ipv6CidrRegex.test(ip)) return true;
	return false;
}
function floatSafeRemainder(val, step) {
	const valDecCount = (val.toString().split(".")[1] || "").length;
	const stepDecCount = (step.toString().split(".")[1] || "").length;
	const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
	return Number.parseInt(val.toFixed(decCount).replace(".", "")) % Number.parseInt(step.toFixed(decCount).replace(".", "")) / 10 ** decCount;
}
function deepPartialify(schema) {
	if (schema instanceof ZodObject) {
		const newShape = {};
		for (const key in schema.shape) {
			const fieldSchema = schema.shape[key];
			newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
		}
		return new ZodObject({
			...schema._def,
			shape: () => newShape
		});
	} else if (schema instanceof ZodArray) return new ZodArray({
		...schema._def,
		type: deepPartialify(schema.element)
	});
	else if (schema instanceof ZodOptional) return ZodOptional.create(deepPartialify(schema.unwrap()));
	else if (schema instanceof ZodNullable) return ZodNullable.create(deepPartialify(schema.unwrap()));
	else if (schema instanceof ZodTuple) return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
	else return schema;
}
function mergeValues(a, b) {
	const aType = getParsedType(a);
	const bType = getParsedType(b);
	if (a === b) return {
		valid: true,
		data: a
	};
	else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
		const bKeys = util.objectKeys(b);
		const sharedKeys = util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
		const newObj = {
			...a,
			...b
		};
		for (const key of sharedKeys) {
			const sharedValue = mergeValues(a[key], b[key]);
			if (!sharedValue.valid) return { valid: false };
			newObj[key] = sharedValue.data;
		}
		return {
			valid: true,
			data: newObj
		};
	} else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
		if (a.length !== b.length) return { valid: false };
		const newArray = [];
		for (let index = 0; index < a.length; index++) {
			const itemA = a[index];
			const itemB = b[index];
			const sharedValue = mergeValues(itemA, itemB);
			if (!sharedValue.valid) return { valid: false };
			newArray.push(sharedValue.data);
		}
		return {
			valid: true,
			data: newArray
		};
	} else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b) return {
		valid: true,
		data: a
	};
	else return { valid: false };
}
function createZodEnum(values, params) {
	return new ZodEnum({
		values,
		typeName: ZodFirstPartyTypeKind.ZodEnum,
		...processCreateParams(params)
	});
}
var ParseInputLazyPath, handleResult, ZodType, cuidRegex, cuid2Regex, ulidRegex, uuidRegex, nanoidRegex, jwtRegex, durationRegex, emailRegex, _emojiRegex, emojiRegex, ipv4Regex, ipv4CidrRegex, ipv6Regex, ipv6CidrRegex, base64Regex, base64urlRegex, dateRegexSource, dateRegex, ZodString, ZodNumber, ZodBigInt, ZodBoolean, ZodDate, ZodSymbol, ZodUndefined, ZodNull, ZodAny, ZodUnknown, ZodNever, ZodVoid, ZodArray, ZodObject, ZodUnion, getDiscriminator, ZodDiscriminatedUnion, ZodIntersection, ZodTuple, ZodRecord, ZodMap, ZodSet, ZodFunction, ZodLazy, ZodLiteral, ZodEnum, ZodNativeEnum, ZodPromise, ZodEffects, ZodOptional, ZodNullable, ZodDefault, ZodCatch, ZodNaN, ZodBranded, ZodPipeline, ZodReadonly, ZodFirstPartyTypeKind, stringType, numberType, booleanType, unknownType, arrayType, objectType, unionType, recordType, literalType, enumType;
var init_types$6 = __esmMin((() => {
	init_ZodError();
	init_errors$1();
	init_errorUtil();
	init_parseUtil();
	init_util();
	ParseInputLazyPath = class {
		constructor(parent, value, path, key) {
			this._cachedPath = [];
			this.parent = parent;
			this.data = value;
			this._path = path;
			this._key = key;
		}
		get path() {
			if (!this._cachedPath.length) if (Array.isArray(this._key)) this._cachedPath.push(...this._path, ...this._key);
			else this._cachedPath.push(...this._path, this._key);
			return this._cachedPath;
		}
	};
	handleResult = (ctx, result) => {
		if (isValid(result)) return {
			success: true,
			data: result.value
		};
		else {
			if (!ctx.common.issues.length) throw new Error("Validation failed but no issues detected.");
			return {
				success: false,
				get error() {
					if (this._error) return this._error;
					this._error = new ZodError(ctx.common.issues);
					return this._error;
				}
			};
		}
	};
	ZodType = class {
		get description() {
			return this._def.description;
		}
		_getType(input) {
			return getParsedType(input.data);
		}
		_getOrReturnCtx(input, ctx) {
			return ctx || {
				common: input.parent.common,
				data: input.data,
				parsedType: getParsedType(input.data),
				schemaErrorMap: this._def.errorMap,
				path: input.path,
				parent: input.parent
			};
		}
		_processInputParams(input) {
			return {
				status: new ParseStatus(),
				ctx: {
					common: input.parent.common,
					data: input.data,
					parsedType: getParsedType(input.data),
					schemaErrorMap: this._def.errorMap,
					path: input.path,
					parent: input.parent
				}
			};
		}
		_parseSync(input) {
			const result = this._parse(input);
			if (isAsync(result)) throw new Error("Synchronous parse encountered promise.");
			return result;
		}
		_parseAsync(input) {
			const result = this._parse(input);
			return Promise.resolve(result);
		}
		parse(data, params) {
			const result = this.safeParse(data, params);
			if (result.success) return result.data;
			throw result.error;
		}
		safeParse(data, params) {
			const ctx = {
				common: {
					issues: [],
					async: params?.async ?? false,
					contextualErrorMap: params?.errorMap
				},
				path: params?.path || [],
				schemaErrorMap: this._def.errorMap,
				parent: null,
				data,
				parsedType: getParsedType(data)
			};
			return handleResult(ctx, this._parseSync({
				data,
				path: ctx.path,
				parent: ctx
			}));
		}
		"~validate"(data) {
			const ctx = {
				common: {
					issues: [],
					async: !!this["~standard"].async
				},
				path: [],
				schemaErrorMap: this._def.errorMap,
				parent: null,
				data,
				parsedType: getParsedType(data)
			};
			if (!this["~standard"].async) try {
				const result = this._parseSync({
					data,
					path: [],
					parent: ctx
				});
				return isValid(result) ? { value: result.value } : { issues: ctx.common.issues };
			} catch (err) {
				if (err?.message?.toLowerCase()?.includes("encountered")) this["~standard"].async = true;
				ctx.common = {
					issues: [],
					async: true
				};
			}
			return this._parseAsync({
				data,
				path: [],
				parent: ctx
			}).then((result) => isValid(result) ? { value: result.value } : { issues: ctx.common.issues });
		}
		async parseAsync(data, params) {
			const result = await this.safeParseAsync(data, params);
			if (result.success) return result.data;
			throw result.error;
		}
		async safeParseAsync(data, params) {
			const ctx = {
				common: {
					issues: [],
					contextualErrorMap: params?.errorMap,
					async: true
				},
				path: params?.path || [],
				schemaErrorMap: this._def.errorMap,
				parent: null,
				data,
				parsedType: getParsedType(data)
			};
			const maybeAsyncResult = this._parse({
				data,
				path: ctx.path,
				parent: ctx
			});
			return handleResult(ctx, await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult)));
		}
		refine(check, message) {
			const getIssueProperties = (val) => {
				if (typeof message === "string" || typeof message === "undefined") return { message };
				else if (typeof message === "function") return message(val);
				else return message;
			};
			return this._refinement((val, ctx) => {
				const result = check(val);
				const setError = () => ctx.addIssue({
					code: ZodIssueCode.custom,
					...getIssueProperties(val)
				});
				if (typeof Promise !== "undefined" && result instanceof Promise) return result.then((data) => {
					if (!data) {
						setError();
						return false;
					} else return true;
				});
				if (!result) {
					setError();
					return false;
				} else return true;
			});
		}
		refinement(check, refinementData) {
			return this._refinement((val, ctx) => {
				if (!check(val)) {
					ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
					return false;
				} else return true;
			});
		}
		_refinement(refinement) {
			return new ZodEffects({
				schema: this,
				typeName: ZodFirstPartyTypeKind.ZodEffects,
				effect: {
					type: "refinement",
					refinement
				}
			});
		}
		superRefine(refinement) {
			return this._refinement(refinement);
		}
		constructor(def) {
			/** Alias of safeParseAsync */
			this.spa = this.safeParseAsync;
			this._def = def;
			this.parse = this.parse.bind(this);
			this.safeParse = this.safeParse.bind(this);
			this.parseAsync = this.parseAsync.bind(this);
			this.safeParseAsync = this.safeParseAsync.bind(this);
			this.spa = this.spa.bind(this);
			this.refine = this.refine.bind(this);
			this.refinement = this.refinement.bind(this);
			this.superRefine = this.superRefine.bind(this);
			this.optional = this.optional.bind(this);
			this.nullable = this.nullable.bind(this);
			this.nullish = this.nullish.bind(this);
			this.array = this.array.bind(this);
			this.promise = this.promise.bind(this);
			this.or = this.or.bind(this);
			this.and = this.and.bind(this);
			this.transform = this.transform.bind(this);
			this.brand = this.brand.bind(this);
			this.default = this.default.bind(this);
			this.catch = this.catch.bind(this);
			this.describe = this.describe.bind(this);
			this.pipe = this.pipe.bind(this);
			this.readonly = this.readonly.bind(this);
			this.isNullable = this.isNullable.bind(this);
			this.isOptional = this.isOptional.bind(this);
			this["~standard"] = {
				version: 1,
				vendor: "zod",
				validate: (data) => this["~validate"](data)
			};
		}
		optional() {
			return ZodOptional.create(this, this._def);
		}
		nullable() {
			return ZodNullable.create(this, this._def);
		}
		nullish() {
			return this.nullable().optional();
		}
		array() {
			return ZodArray.create(this);
		}
		promise() {
			return ZodPromise.create(this, this._def);
		}
		or(option) {
			return ZodUnion.create([this, option], this._def);
		}
		and(incoming) {
			return ZodIntersection.create(this, incoming, this._def);
		}
		transform(transform) {
			return new ZodEffects({
				...processCreateParams(this._def),
				schema: this,
				typeName: ZodFirstPartyTypeKind.ZodEffects,
				effect: {
					type: "transform",
					transform
				}
			});
		}
		default(def) {
			const defaultValueFunc = typeof def === "function" ? def : () => def;
			return new ZodDefault({
				...processCreateParams(this._def),
				innerType: this,
				defaultValue: defaultValueFunc,
				typeName: ZodFirstPartyTypeKind.ZodDefault
			});
		}
		brand() {
			return new ZodBranded({
				typeName: ZodFirstPartyTypeKind.ZodBranded,
				type: this,
				...processCreateParams(this._def)
			});
		}
		catch(def) {
			const catchValueFunc = typeof def === "function" ? def : () => def;
			return new ZodCatch({
				...processCreateParams(this._def),
				innerType: this,
				catchValue: catchValueFunc,
				typeName: ZodFirstPartyTypeKind.ZodCatch
			});
		}
		describe(description) {
			const This = this.constructor;
			return new This({
				...this._def,
				description
			});
		}
		pipe(target) {
			return ZodPipeline.create(this, target);
		}
		readonly() {
			return ZodReadonly.create(this);
		}
		isOptional() {
			return this.safeParse(void 0).success;
		}
		isNullable() {
			return this.safeParse(null).success;
		}
	};
	cuidRegex = /^c[^\s-]{8,}$/i;
	cuid2Regex = /^[0-9a-z]+$/;
	ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
	uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
	nanoidRegex = /^[a-z0-9_-]{21}$/i;
	jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
	durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
	emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
	_emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
	ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
	ipv4CidrRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/;
	ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
	ipv6CidrRegex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
	base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
	base64urlRegex = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/;
	dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
	dateRegex = new RegExp(`^${dateRegexSource}$`);
	ZodString = class ZodString extends ZodType {
		_parse(input) {
			if (this._def.coerce) input.data = String(input.data);
			if (this._getType(input) !== ZodParsedType.string) {
				const ctx = this._getOrReturnCtx(input);
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_type,
					expected: ZodParsedType.string,
					received: ctx.parsedType
				});
				return INVALID;
			}
			const status = new ParseStatus();
			let ctx = void 0;
			for (const check of this._def.checks) if (check.kind === "min") {
				if (input.data.length < check.value) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						code: ZodIssueCode.too_small,
						minimum: check.value,
						type: "string",
						inclusive: true,
						exact: false,
						message: check.message
					});
					status.dirty();
				}
			} else if (check.kind === "max") {
				if (input.data.length > check.value) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						code: ZodIssueCode.too_big,
						maximum: check.value,
						type: "string",
						inclusive: true,
						exact: false,
						message: check.message
					});
					status.dirty();
				}
			} else if (check.kind === "length") {
				const tooBig = input.data.length > check.value;
				const tooSmall = input.data.length < check.value;
				if (tooBig || tooSmall) {
					ctx = this._getOrReturnCtx(input, ctx);
					if (tooBig) addIssueToContext(ctx, {
						code: ZodIssueCode.too_big,
						maximum: check.value,
						type: "string",
						inclusive: true,
						exact: true,
						message: check.message
					});
					else if (tooSmall) addIssueToContext(ctx, {
						code: ZodIssueCode.too_small,
						minimum: check.value,
						type: "string",
						inclusive: true,
						exact: true,
						message: check.message
					});
					status.dirty();
				}
			} else if (check.kind === "email") {
				if (!emailRegex.test(input.data)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						validation: "email",
						code: ZodIssueCode.invalid_string,
						message: check.message
					});
					status.dirty();
				}
			} else if (check.kind === "emoji") {
				if (!emojiRegex) emojiRegex = new RegExp(_emojiRegex, "u");
				if (!emojiRegex.test(input.data)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						validation: "emoji",
						code: ZodIssueCode.invalid_string,
						message: check.message
					});
					status.dirty();
				}
			} else if (check.kind === "uuid") {
				if (!uuidRegex.test(input.data)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						validation: "uuid",
						code: ZodIssueCode.invalid_string,
						message: check.message
					});
					status.dirty();
				}
			} else if (check.kind === "nanoid") {
				if (!nanoidRegex.test(input.data)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						validation: "nanoid",
						code: ZodIssueCode.invalid_string,
						message: check.message
					});
					status.dirty();
				}
			} else if (check.kind === "cuid") {
				if (!cuidRegex.test(input.data)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						validation: "cuid",
						code: ZodIssueCode.invalid_string,
						message: check.message
					});
					status.dirty();
				}
			} else if (check.kind === "cuid2") {
				if (!cuid2Regex.test(input.data)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						validation: "cuid2",
						code: ZodIssueCode.invalid_string,
						message: check.message
					});
					status.dirty();
				}
			} else if (check.kind === "ulid") {
				if (!ulidRegex.test(input.data)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						validation: "ulid",
						code: ZodIssueCode.invalid_string,
						message: check.message
					});
					status.dirty();
				}
			} else if (check.kind === "url") try {
				new URL(input.data);
			} catch {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					validation: "url",
					code: ZodIssueCode.invalid_string,
					message: check.message
				});
				status.dirty();
			}
			else if (check.kind === "regex") {
				check.regex.lastIndex = 0;
				if (!check.regex.test(input.data)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						validation: "regex",
						code: ZodIssueCode.invalid_string,
						message: check.message
					});
					status.dirty();
				}
			} else if (check.kind === "trim") input.data = input.data.trim();
			else if (check.kind === "includes") {
				if (!input.data.includes(check.value, check.position)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_string,
						validation: {
							includes: check.value,
							position: check.position
						},
						message: check.message
					});
					status.dirty();
				}
			} else if (check.kind === "toLowerCase") input.data = input.data.toLowerCase();
			else if (check.kind === "toUpperCase") input.data = input.data.toUpperCase();
			else if (check.kind === "startsWith") {
				if (!input.data.startsWith(check.value)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_string,
						validation: { startsWith: check.value },
						message: check.message
					});
					status.dirty();
				}
			} else if (check.kind === "endsWith") {
				if (!input.data.endsWith(check.value)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_string,
						validation: { endsWith: check.value },
						message: check.message
					});
					status.dirty();
				}
			} else if (check.kind === "datetime") {
				if (!datetimeRegex(check).test(input.data)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_string,
						validation: "datetime",
						message: check.message
					});
					status.dirty();
				}
			} else if (check.kind === "date") {
				if (!dateRegex.test(input.data)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_string,
						validation: "date",
						message: check.message
					});
					status.dirty();
				}
			} else if (check.kind === "time") {
				if (!timeRegex(check).test(input.data)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_string,
						validation: "time",
						message: check.message
					});
					status.dirty();
				}
			} else if (check.kind === "duration") {
				if (!durationRegex.test(input.data)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						validation: "duration",
						code: ZodIssueCode.invalid_string,
						message: check.message
					});
					status.dirty();
				}
			} else if (check.kind === "ip") {
				if (!isValidIP(input.data, check.version)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						validation: "ip",
						code: ZodIssueCode.invalid_string,
						message: check.message
					});
					status.dirty();
				}
			} else if (check.kind === "jwt") {
				if (!isValidJWT(input.data, check.alg)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						validation: "jwt",
						code: ZodIssueCode.invalid_string,
						message: check.message
					});
					status.dirty();
				}
			} else if (check.kind === "cidr") {
				if (!isValidCidr(input.data, check.version)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						validation: "cidr",
						code: ZodIssueCode.invalid_string,
						message: check.message
					});
					status.dirty();
				}
			} else if (check.kind === "base64") {
				if (!base64Regex.test(input.data)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						validation: "base64",
						code: ZodIssueCode.invalid_string,
						message: check.message
					});
					status.dirty();
				}
			} else if (check.kind === "base64url") {
				if (!base64urlRegex.test(input.data)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						validation: "base64url",
						code: ZodIssueCode.invalid_string,
						message: check.message
					});
					status.dirty();
				}
			} else util.assertNever(check);
			return {
				status: status.value,
				value: input.data
			};
		}
		_regex(regex, validation, message) {
			return this.refinement((data) => regex.test(data), {
				validation,
				code: ZodIssueCode.invalid_string,
				...errorUtil.errToObj(message)
			});
		}
		_addCheck(check) {
			return new ZodString({
				...this._def,
				checks: [...this._def.checks, check]
			});
		}
		email(message) {
			return this._addCheck({
				kind: "email",
				...errorUtil.errToObj(message)
			});
		}
		url(message) {
			return this._addCheck({
				kind: "url",
				...errorUtil.errToObj(message)
			});
		}
		emoji(message) {
			return this._addCheck({
				kind: "emoji",
				...errorUtil.errToObj(message)
			});
		}
		uuid(message) {
			return this._addCheck({
				kind: "uuid",
				...errorUtil.errToObj(message)
			});
		}
		nanoid(message) {
			return this._addCheck({
				kind: "nanoid",
				...errorUtil.errToObj(message)
			});
		}
		cuid(message) {
			return this._addCheck({
				kind: "cuid",
				...errorUtil.errToObj(message)
			});
		}
		cuid2(message) {
			return this._addCheck({
				kind: "cuid2",
				...errorUtil.errToObj(message)
			});
		}
		ulid(message) {
			return this._addCheck({
				kind: "ulid",
				...errorUtil.errToObj(message)
			});
		}
		base64(message) {
			return this._addCheck({
				kind: "base64",
				...errorUtil.errToObj(message)
			});
		}
		base64url(message) {
			return this._addCheck({
				kind: "base64url",
				...errorUtil.errToObj(message)
			});
		}
		jwt(options) {
			return this._addCheck({
				kind: "jwt",
				...errorUtil.errToObj(options)
			});
		}
		ip(options) {
			return this._addCheck({
				kind: "ip",
				...errorUtil.errToObj(options)
			});
		}
		cidr(options) {
			return this._addCheck({
				kind: "cidr",
				...errorUtil.errToObj(options)
			});
		}
		datetime(options) {
			if (typeof options === "string") return this._addCheck({
				kind: "datetime",
				precision: null,
				offset: false,
				local: false,
				message: options
			});
			return this._addCheck({
				kind: "datetime",
				precision: typeof options?.precision === "undefined" ? null : options?.precision,
				offset: options?.offset ?? false,
				local: options?.local ?? false,
				...errorUtil.errToObj(options?.message)
			});
		}
		date(message) {
			return this._addCheck({
				kind: "date",
				message
			});
		}
		time(options) {
			if (typeof options === "string") return this._addCheck({
				kind: "time",
				precision: null,
				message: options
			});
			return this._addCheck({
				kind: "time",
				precision: typeof options?.precision === "undefined" ? null : options?.precision,
				...errorUtil.errToObj(options?.message)
			});
		}
		duration(message) {
			return this._addCheck({
				kind: "duration",
				...errorUtil.errToObj(message)
			});
		}
		regex(regex, message) {
			return this._addCheck({
				kind: "regex",
				regex,
				...errorUtil.errToObj(message)
			});
		}
		includes(value, options) {
			return this._addCheck({
				kind: "includes",
				value,
				position: options?.position,
				...errorUtil.errToObj(options?.message)
			});
		}
		startsWith(value, message) {
			return this._addCheck({
				kind: "startsWith",
				value,
				...errorUtil.errToObj(message)
			});
		}
		endsWith(value, message) {
			return this._addCheck({
				kind: "endsWith",
				value,
				...errorUtil.errToObj(message)
			});
		}
		min(minLength, message) {
			return this._addCheck({
				kind: "min",
				value: minLength,
				...errorUtil.errToObj(message)
			});
		}
		max(maxLength, message) {
			return this._addCheck({
				kind: "max",
				value: maxLength,
				...errorUtil.errToObj(message)
			});
		}
		length(len, message) {
			return this._addCheck({
				kind: "length",
				value: len,
				...errorUtil.errToObj(message)
			});
		}
		/**
		* Equivalent to `.min(1)`
		*/
		nonempty(message) {
			return this.min(1, errorUtil.errToObj(message));
		}
		trim() {
			return new ZodString({
				...this._def,
				checks: [...this._def.checks, { kind: "trim" }]
			});
		}
		toLowerCase() {
			return new ZodString({
				...this._def,
				checks: [...this._def.checks, { kind: "toLowerCase" }]
			});
		}
		toUpperCase() {
			return new ZodString({
				...this._def,
				checks: [...this._def.checks, { kind: "toUpperCase" }]
			});
		}
		get isDatetime() {
			return !!this._def.checks.find((ch) => ch.kind === "datetime");
		}
		get isDate() {
			return !!this._def.checks.find((ch) => ch.kind === "date");
		}
		get isTime() {
			return !!this._def.checks.find((ch) => ch.kind === "time");
		}
		get isDuration() {
			return !!this._def.checks.find((ch) => ch.kind === "duration");
		}
		get isEmail() {
			return !!this._def.checks.find((ch) => ch.kind === "email");
		}
		get isURL() {
			return !!this._def.checks.find((ch) => ch.kind === "url");
		}
		get isEmoji() {
			return !!this._def.checks.find((ch) => ch.kind === "emoji");
		}
		get isUUID() {
			return !!this._def.checks.find((ch) => ch.kind === "uuid");
		}
		get isNANOID() {
			return !!this._def.checks.find((ch) => ch.kind === "nanoid");
		}
		get isCUID() {
			return !!this._def.checks.find((ch) => ch.kind === "cuid");
		}
		get isCUID2() {
			return !!this._def.checks.find((ch) => ch.kind === "cuid2");
		}
		get isULID() {
			return !!this._def.checks.find((ch) => ch.kind === "ulid");
		}
		get isIP() {
			return !!this._def.checks.find((ch) => ch.kind === "ip");
		}
		get isCIDR() {
			return !!this._def.checks.find((ch) => ch.kind === "cidr");
		}
		get isBase64() {
			return !!this._def.checks.find((ch) => ch.kind === "base64");
		}
		get isBase64url() {
			return !!this._def.checks.find((ch) => ch.kind === "base64url");
		}
		get minLength() {
			let min = null;
			for (const ch of this._def.checks) if (ch.kind === "min") {
				if (min === null || ch.value > min) min = ch.value;
			}
			return min;
		}
		get maxLength() {
			let max = null;
			for (const ch of this._def.checks) if (ch.kind === "max") {
				if (max === null || ch.value < max) max = ch.value;
			}
			return max;
		}
	};
	ZodString.create = (params) => {
		return new ZodString({
			checks: [],
			typeName: ZodFirstPartyTypeKind.ZodString,
			coerce: params?.coerce ?? false,
			...processCreateParams(params)
		});
	};
	ZodNumber = class ZodNumber extends ZodType {
		constructor() {
			super(...arguments);
			this.min = this.gte;
			this.max = this.lte;
			this.step = this.multipleOf;
		}
		_parse(input) {
			if (this._def.coerce) input.data = Number(input.data);
			if (this._getType(input) !== ZodParsedType.number) {
				const ctx = this._getOrReturnCtx(input);
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_type,
					expected: ZodParsedType.number,
					received: ctx.parsedType
				});
				return INVALID;
			}
			let ctx = void 0;
			const status = new ParseStatus();
			for (const check of this._def.checks) if (check.kind === "int") {
				if (!util.isInteger(input.data)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_type,
						expected: "integer",
						received: "float",
						message: check.message
					});
					status.dirty();
				}
			} else if (check.kind === "min") {
				if (check.inclusive ? input.data < check.value : input.data <= check.value) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						code: ZodIssueCode.too_small,
						minimum: check.value,
						type: "number",
						inclusive: check.inclusive,
						exact: false,
						message: check.message
					});
					status.dirty();
				}
			} else if (check.kind === "max") {
				if (check.inclusive ? input.data > check.value : input.data >= check.value) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						code: ZodIssueCode.too_big,
						maximum: check.value,
						type: "number",
						inclusive: check.inclusive,
						exact: false,
						message: check.message
					});
					status.dirty();
				}
			} else if (check.kind === "multipleOf") {
				if (floatSafeRemainder(input.data, check.value) !== 0) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						code: ZodIssueCode.not_multiple_of,
						multipleOf: check.value,
						message: check.message
					});
					status.dirty();
				}
			} else if (check.kind === "finite") {
				if (!Number.isFinite(input.data)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						code: ZodIssueCode.not_finite,
						message: check.message
					});
					status.dirty();
				}
			} else util.assertNever(check);
			return {
				status: status.value,
				value: input.data
			};
		}
		gte(value, message) {
			return this.setLimit("min", value, true, errorUtil.toString(message));
		}
		gt(value, message) {
			return this.setLimit("min", value, false, errorUtil.toString(message));
		}
		lte(value, message) {
			return this.setLimit("max", value, true, errorUtil.toString(message));
		}
		lt(value, message) {
			return this.setLimit("max", value, false, errorUtil.toString(message));
		}
		setLimit(kind, value, inclusive, message) {
			return new ZodNumber({
				...this._def,
				checks: [...this._def.checks, {
					kind,
					value,
					inclusive,
					message: errorUtil.toString(message)
				}]
			});
		}
		_addCheck(check) {
			return new ZodNumber({
				...this._def,
				checks: [...this._def.checks, check]
			});
		}
		int(message) {
			return this._addCheck({
				kind: "int",
				message: errorUtil.toString(message)
			});
		}
		positive(message) {
			return this._addCheck({
				kind: "min",
				value: 0,
				inclusive: false,
				message: errorUtil.toString(message)
			});
		}
		negative(message) {
			return this._addCheck({
				kind: "max",
				value: 0,
				inclusive: false,
				message: errorUtil.toString(message)
			});
		}
		nonpositive(message) {
			return this._addCheck({
				kind: "max",
				value: 0,
				inclusive: true,
				message: errorUtil.toString(message)
			});
		}
		nonnegative(message) {
			return this._addCheck({
				kind: "min",
				value: 0,
				inclusive: true,
				message: errorUtil.toString(message)
			});
		}
		multipleOf(value, message) {
			return this._addCheck({
				kind: "multipleOf",
				value,
				message: errorUtil.toString(message)
			});
		}
		finite(message) {
			return this._addCheck({
				kind: "finite",
				message: errorUtil.toString(message)
			});
		}
		safe(message) {
			return this._addCheck({
				kind: "min",
				inclusive: true,
				value: Number.MIN_SAFE_INTEGER,
				message: errorUtil.toString(message)
			})._addCheck({
				kind: "max",
				inclusive: true,
				value: Number.MAX_SAFE_INTEGER,
				message: errorUtil.toString(message)
			});
		}
		get minValue() {
			let min = null;
			for (const ch of this._def.checks) if (ch.kind === "min") {
				if (min === null || ch.value > min) min = ch.value;
			}
			return min;
		}
		get maxValue() {
			let max = null;
			for (const ch of this._def.checks) if (ch.kind === "max") {
				if (max === null || ch.value < max) max = ch.value;
			}
			return max;
		}
		get isInt() {
			return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
		}
		get isFinite() {
			let max = null;
			let min = null;
			for (const ch of this._def.checks) if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") return true;
			else if (ch.kind === "min") {
				if (min === null || ch.value > min) min = ch.value;
			} else if (ch.kind === "max") {
				if (max === null || ch.value < max) max = ch.value;
			}
			return Number.isFinite(min) && Number.isFinite(max);
		}
	};
	ZodNumber.create = (params) => {
		return new ZodNumber({
			checks: [],
			typeName: ZodFirstPartyTypeKind.ZodNumber,
			coerce: params?.coerce || false,
			...processCreateParams(params)
		});
	};
	ZodBigInt = class ZodBigInt extends ZodType {
		constructor() {
			super(...arguments);
			this.min = this.gte;
			this.max = this.lte;
		}
		_parse(input) {
			if (this._def.coerce) try {
				input.data = BigInt(input.data);
			} catch {
				return this._getInvalidInput(input);
			}
			if (this._getType(input) !== ZodParsedType.bigint) return this._getInvalidInput(input);
			let ctx = void 0;
			const status = new ParseStatus();
			for (const check of this._def.checks) if (check.kind === "min") {
				if (check.inclusive ? input.data < check.value : input.data <= check.value) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						code: ZodIssueCode.too_small,
						type: "bigint",
						minimum: check.value,
						inclusive: check.inclusive,
						message: check.message
					});
					status.dirty();
				}
			} else if (check.kind === "max") {
				if (check.inclusive ? input.data > check.value : input.data >= check.value) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						code: ZodIssueCode.too_big,
						type: "bigint",
						maximum: check.value,
						inclusive: check.inclusive,
						message: check.message
					});
					status.dirty();
				}
			} else if (check.kind === "multipleOf") {
				if (input.data % check.value !== BigInt(0)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						code: ZodIssueCode.not_multiple_of,
						multipleOf: check.value,
						message: check.message
					});
					status.dirty();
				}
			} else util.assertNever(check);
			return {
				status: status.value,
				value: input.data
			};
		}
		_getInvalidInput(input) {
			const ctx = this._getOrReturnCtx(input);
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.bigint,
				received: ctx.parsedType
			});
			return INVALID;
		}
		gte(value, message) {
			return this.setLimit("min", value, true, errorUtil.toString(message));
		}
		gt(value, message) {
			return this.setLimit("min", value, false, errorUtil.toString(message));
		}
		lte(value, message) {
			return this.setLimit("max", value, true, errorUtil.toString(message));
		}
		lt(value, message) {
			return this.setLimit("max", value, false, errorUtil.toString(message));
		}
		setLimit(kind, value, inclusive, message) {
			return new ZodBigInt({
				...this._def,
				checks: [...this._def.checks, {
					kind,
					value,
					inclusive,
					message: errorUtil.toString(message)
				}]
			});
		}
		_addCheck(check) {
			return new ZodBigInt({
				...this._def,
				checks: [...this._def.checks, check]
			});
		}
		positive(message) {
			return this._addCheck({
				kind: "min",
				value: BigInt(0),
				inclusive: false,
				message: errorUtil.toString(message)
			});
		}
		negative(message) {
			return this._addCheck({
				kind: "max",
				value: BigInt(0),
				inclusive: false,
				message: errorUtil.toString(message)
			});
		}
		nonpositive(message) {
			return this._addCheck({
				kind: "max",
				value: BigInt(0),
				inclusive: true,
				message: errorUtil.toString(message)
			});
		}
		nonnegative(message) {
			return this._addCheck({
				kind: "min",
				value: BigInt(0),
				inclusive: true,
				message: errorUtil.toString(message)
			});
		}
		multipleOf(value, message) {
			return this._addCheck({
				kind: "multipleOf",
				value,
				message: errorUtil.toString(message)
			});
		}
		get minValue() {
			let min = null;
			for (const ch of this._def.checks) if (ch.kind === "min") {
				if (min === null || ch.value > min) min = ch.value;
			}
			return min;
		}
		get maxValue() {
			let max = null;
			for (const ch of this._def.checks) if (ch.kind === "max") {
				if (max === null || ch.value < max) max = ch.value;
			}
			return max;
		}
	};
	ZodBigInt.create = (params) => {
		return new ZodBigInt({
			checks: [],
			typeName: ZodFirstPartyTypeKind.ZodBigInt,
			coerce: params?.coerce ?? false,
			...processCreateParams(params)
		});
	};
	ZodBoolean = class extends ZodType {
		_parse(input) {
			if (this._def.coerce) input.data = Boolean(input.data);
			if (this._getType(input) !== ZodParsedType.boolean) {
				const ctx = this._getOrReturnCtx(input);
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_type,
					expected: ZodParsedType.boolean,
					received: ctx.parsedType
				});
				return INVALID;
			}
			return OK(input.data);
		}
	};
	ZodBoolean.create = (params) => {
		return new ZodBoolean({
			typeName: ZodFirstPartyTypeKind.ZodBoolean,
			coerce: params?.coerce || false,
			...processCreateParams(params)
		});
	};
	ZodDate = class ZodDate extends ZodType {
		_parse(input) {
			if (this._def.coerce) input.data = new Date(input.data);
			if (this._getType(input) !== ZodParsedType.date) {
				const ctx = this._getOrReturnCtx(input);
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_type,
					expected: ZodParsedType.date,
					received: ctx.parsedType
				});
				return INVALID;
			}
			if (Number.isNaN(input.data.getTime())) {
				addIssueToContext(this._getOrReturnCtx(input), { code: ZodIssueCode.invalid_date });
				return INVALID;
			}
			const status = new ParseStatus();
			let ctx = void 0;
			for (const check of this._def.checks) if (check.kind === "min") {
				if (input.data.getTime() < check.value) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						code: ZodIssueCode.too_small,
						message: check.message,
						inclusive: true,
						exact: false,
						minimum: check.value,
						type: "date"
					});
					status.dirty();
				}
			} else if (check.kind === "max") {
				if (input.data.getTime() > check.value) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						code: ZodIssueCode.too_big,
						message: check.message,
						inclusive: true,
						exact: false,
						maximum: check.value,
						type: "date"
					});
					status.dirty();
				}
			} else util.assertNever(check);
			return {
				status: status.value,
				value: new Date(input.data.getTime())
			};
		}
		_addCheck(check) {
			return new ZodDate({
				...this._def,
				checks: [...this._def.checks, check]
			});
		}
		min(minDate, message) {
			return this._addCheck({
				kind: "min",
				value: minDate.getTime(),
				message: errorUtil.toString(message)
			});
		}
		max(maxDate, message) {
			return this._addCheck({
				kind: "max",
				value: maxDate.getTime(),
				message: errorUtil.toString(message)
			});
		}
		get minDate() {
			let min = null;
			for (const ch of this._def.checks) if (ch.kind === "min") {
				if (min === null || ch.value > min) min = ch.value;
			}
			return min != null ? new Date(min) : null;
		}
		get maxDate() {
			let max = null;
			for (const ch of this._def.checks) if (ch.kind === "max") {
				if (max === null || ch.value < max) max = ch.value;
			}
			return max != null ? new Date(max) : null;
		}
	};
	ZodDate.create = (params) => {
		return new ZodDate({
			checks: [],
			coerce: params?.coerce || false,
			typeName: ZodFirstPartyTypeKind.ZodDate,
			...processCreateParams(params)
		});
	};
	ZodSymbol = class extends ZodType {
		_parse(input) {
			if (this._getType(input) !== ZodParsedType.symbol) {
				const ctx = this._getOrReturnCtx(input);
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_type,
					expected: ZodParsedType.symbol,
					received: ctx.parsedType
				});
				return INVALID;
			}
			return OK(input.data);
		}
	};
	ZodSymbol.create = (params) => {
		return new ZodSymbol({
			typeName: ZodFirstPartyTypeKind.ZodSymbol,
			...processCreateParams(params)
		});
	};
	ZodUndefined = class extends ZodType {
		_parse(input) {
			if (this._getType(input) !== ZodParsedType.undefined) {
				const ctx = this._getOrReturnCtx(input);
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_type,
					expected: ZodParsedType.undefined,
					received: ctx.parsedType
				});
				return INVALID;
			}
			return OK(input.data);
		}
	};
	ZodUndefined.create = (params) => {
		return new ZodUndefined({
			typeName: ZodFirstPartyTypeKind.ZodUndefined,
			...processCreateParams(params)
		});
	};
	ZodNull = class extends ZodType {
		_parse(input) {
			if (this._getType(input) !== ZodParsedType.null) {
				const ctx = this._getOrReturnCtx(input);
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_type,
					expected: ZodParsedType.null,
					received: ctx.parsedType
				});
				return INVALID;
			}
			return OK(input.data);
		}
	};
	ZodNull.create = (params) => {
		return new ZodNull({
			typeName: ZodFirstPartyTypeKind.ZodNull,
			...processCreateParams(params)
		});
	};
	ZodAny = class extends ZodType {
		constructor() {
			super(...arguments);
			this._any = true;
		}
		_parse(input) {
			return OK(input.data);
		}
	};
	ZodAny.create = (params) => {
		return new ZodAny({
			typeName: ZodFirstPartyTypeKind.ZodAny,
			...processCreateParams(params)
		});
	};
	ZodUnknown = class extends ZodType {
		constructor() {
			super(...arguments);
			this._unknown = true;
		}
		_parse(input) {
			return OK(input.data);
		}
	};
	ZodUnknown.create = (params) => {
		return new ZodUnknown({
			typeName: ZodFirstPartyTypeKind.ZodUnknown,
			...processCreateParams(params)
		});
	};
	ZodNever = class extends ZodType {
		_parse(input) {
			const ctx = this._getOrReturnCtx(input);
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.never,
				received: ctx.parsedType
			});
			return INVALID;
		}
	};
	ZodNever.create = (params) => {
		return new ZodNever({
			typeName: ZodFirstPartyTypeKind.ZodNever,
			...processCreateParams(params)
		});
	};
	ZodVoid = class extends ZodType {
		_parse(input) {
			if (this._getType(input) !== ZodParsedType.undefined) {
				const ctx = this._getOrReturnCtx(input);
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_type,
					expected: ZodParsedType.void,
					received: ctx.parsedType
				});
				return INVALID;
			}
			return OK(input.data);
		}
	};
	ZodVoid.create = (params) => {
		return new ZodVoid({
			typeName: ZodFirstPartyTypeKind.ZodVoid,
			...processCreateParams(params)
		});
	};
	ZodArray = class ZodArray extends ZodType {
		_parse(input) {
			const { ctx, status } = this._processInputParams(input);
			const def = this._def;
			if (ctx.parsedType !== ZodParsedType.array) {
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_type,
					expected: ZodParsedType.array,
					received: ctx.parsedType
				});
				return INVALID;
			}
			if (def.exactLength !== null) {
				const tooBig = ctx.data.length > def.exactLength.value;
				const tooSmall = ctx.data.length < def.exactLength.value;
				if (tooBig || tooSmall) {
					addIssueToContext(ctx, {
						code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
						minimum: tooSmall ? def.exactLength.value : void 0,
						maximum: tooBig ? def.exactLength.value : void 0,
						type: "array",
						inclusive: true,
						exact: true,
						message: def.exactLength.message
					});
					status.dirty();
				}
			}
			if (def.minLength !== null) {
				if (ctx.data.length < def.minLength.value) {
					addIssueToContext(ctx, {
						code: ZodIssueCode.too_small,
						minimum: def.minLength.value,
						type: "array",
						inclusive: true,
						exact: false,
						message: def.minLength.message
					});
					status.dirty();
				}
			}
			if (def.maxLength !== null) {
				if (ctx.data.length > def.maxLength.value) {
					addIssueToContext(ctx, {
						code: ZodIssueCode.too_big,
						maximum: def.maxLength.value,
						type: "array",
						inclusive: true,
						exact: false,
						message: def.maxLength.message
					});
					status.dirty();
				}
			}
			if (ctx.common.async) return Promise.all([...ctx.data].map((item, i) => {
				return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
			})).then((result) => {
				return ParseStatus.mergeArray(status, result);
			});
			const result = [...ctx.data].map((item, i) => {
				return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
			});
			return ParseStatus.mergeArray(status, result);
		}
		get element() {
			return this._def.type;
		}
		min(minLength, message) {
			return new ZodArray({
				...this._def,
				minLength: {
					value: minLength,
					message: errorUtil.toString(message)
				}
			});
		}
		max(maxLength, message) {
			return new ZodArray({
				...this._def,
				maxLength: {
					value: maxLength,
					message: errorUtil.toString(message)
				}
			});
		}
		length(len, message) {
			return new ZodArray({
				...this._def,
				exactLength: {
					value: len,
					message: errorUtil.toString(message)
				}
			});
		}
		nonempty(message) {
			return this.min(1, message);
		}
	};
	ZodArray.create = (schema, params) => {
		return new ZodArray({
			type: schema,
			minLength: null,
			maxLength: null,
			exactLength: null,
			typeName: ZodFirstPartyTypeKind.ZodArray,
			...processCreateParams(params)
		});
	};
	ZodObject = class ZodObject extends ZodType {
		constructor() {
			super(...arguments);
			this._cached = null;
			/**
			* @deprecated In most cases, this is no longer needed - unknown properties are now silently stripped.
			* If you want to pass through unknown properties, use `.passthrough()` instead.
			*/
			this.nonstrict = this.passthrough;
			/**
			* @deprecated Use `.extend` instead
			*  */
			this.augment = this.extend;
		}
		_getCached() {
			if (this._cached !== null) return this._cached;
			const shape = this._def.shape();
			this._cached = {
				shape,
				keys: util.objectKeys(shape)
			};
			return this._cached;
		}
		_parse(input) {
			if (this._getType(input) !== ZodParsedType.object) {
				const ctx = this._getOrReturnCtx(input);
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_type,
					expected: ZodParsedType.object,
					received: ctx.parsedType
				});
				return INVALID;
			}
			const { status, ctx } = this._processInputParams(input);
			const { shape, keys: shapeKeys } = this._getCached();
			const extraKeys = [];
			if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
				for (const key in ctx.data) if (!shapeKeys.includes(key)) extraKeys.push(key);
			}
			const pairs = [];
			for (const key of shapeKeys) {
				const keyValidator = shape[key];
				const value = ctx.data[key];
				pairs.push({
					key: {
						status: "valid",
						value: key
					},
					value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
					alwaysSet: key in ctx.data
				});
			}
			if (this._def.catchall instanceof ZodNever) {
				const unknownKeys = this._def.unknownKeys;
				if (unknownKeys === "passthrough") for (const key of extraKeys) pairs.push({
					key: {
						status: "valid",
						value: key
					},
					value: {
						status: "valid",
						value: ctx.data[key]
					}
				});
				else if (unknownKeys === "strict") {
					if (extraKeys.length > 0) {
						addIssueToContext(ctx, {
							code: ZodIssueCode.unrecognized_keys,
							keys: extraKeys
						});
						status.dirty();
					}
				} else if (unknownKeys === "strip") {} else throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
			} else {
				const catchall = this._def.catchall;
				for (const key of extraKeys) {
					const value = ctx.data[key];
					pairs.push({
						key: {
							status: "valid",
							value: key
						},
						value: catchall._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
						alwaysSet: key in ctx.data
					});
				}
			}
			if (ctx.common.async) return Promise.resolve().then(async () => {
				const syncPairs = [];
				for (const pair of pairs) {
					const key = await pair.key;
					const value = await pair.value;
					syncPairs.push({
						key,
						value,
						alwaysSet: pair.alwaysSet
					});
				}
				return syncPairs;
			}).then((syncPairs) => {
				return ParseStatus.mergeObjectSync(status, syncPairs);
			});
			else return ParseStatus.mergeObjectSync(status, pairs);
		}
		get shape() {
			return this._def.shape();
		}
		strict(message) {
			errorUtil.errToObj;
			return new ZodObject({
				...this._def,
				unknownKeys: "strict",
				...message !== void 0 ? { errorMap: (issue, ctx) => {
					const defaultError = this._def.errorMap?.(issue, ctx).message ?? ctx.defaultError;
					if (issue.code === "unrecognized_keys") return { message: errorUtil.errToObj(message).message ?? defaultError };
					return { message: defaultError };
				} } : {}
			});
		}
		strip() {
			return new ZodObject({
				...this._def,
				unknownKeys: "strip"
			});
		}
		passthrough() {
			return new ZodObject({
				...this._def,
				unknownKeys: "passthrough"
			});
		}
		extend(augmentation) {
			return new ZodObject({
				...this._def,
				shape: () => ({
					...this._def.shape(),
					...augmentation
				})
			});
		}
		/**
		* Prior to zod@1.0.12 there was a bug in the
		* inferred type of merged objects. Please
		* upgrade if you are experiencing issues.
		*/
		merge(merging) {
			return new ZodObject({
				unknownKeys: merging._def.unknownKeys,
				catchall: merging._def.catchall,
				shape: () => ({
					...this._def.shape(),
					...merging._def.shape()
				}),
				typeName: ZodFirstPartyTypeKind.ZodObject
			});
		}
		setKey(key, schema) {
			return this.augment({ [key]: schema });
		}
		catchall(index) {
			return new ZodObject({
				...this._def,
				catchall: index
			});
		}
		pick(mask) {
			const shape = {};
			for (const key of util.objectKeys(mask)) if (mask[key] && this.shape[key]) shape[key] = this.shape[key];
			return new ZodObject({
				...this._def,
				shape: () => shape
			});
		}
		omit(mask) {
			const shape = {};
			for (const key of util.objectKeys(this.shape)) if (!mask[key]) shape[key] = this.shape[key];
			return new ZodObject({
				...this._def,
				shape: () => shape
			});
		}
		/**
		* @deprecated
		*/
		deepPartial() {
			return deepPartialify(this);
		}
		partial(mask) {
			const newShape = {};
			for (const key of util.objectKeys(this.shape)) {
				const fieldSchema = this.shape[key];
				if (mask && !mask[key]) newShape[key] = fieldSchema;
				else newShape[key] = fieldSchema.optional();
			}
			return new ZodObject({
				...this._def,
				shape: () => newShape
			});
		}
		required(mask) {
			const newShape = {};
			for (const key of util.objectKeys(this.shape)) if (mask && !mask[key]) newShape[key] = this.shape[key];
			else {
				let newField = this.shape[key];
				while (newField instanceof ZodOptional) newField = newField._def.innerType;
				newShape[key] = newField;
			}
			return new ZodObject({
				...this._def,
				shape: () => newShape
			});
		}
		keyof() {
			return createZodEnum(util.objectKeys(this.shape));
		}
	};
	ZodObject.create = (shape, params) => {
		return new ZodObject({
			shape: () => shape,
			unknownKeys: "strip",
			catchall: ZodNever.create(),
			typeName: ZodFirstPartyTypeKind.ZodObject,
			...processCreateParams(params)
		});
	};
	ZodObject.strictCreate = (shape, params) => {
		return new ZodObject({
			shape: () => shape,
			unknownKeys: "strict",
			catchall: ZodNever.create(),
			typeName: ZodFirstPartyTypeKind.ZodObject,
			...processCreateParams(params)
		});
	};
	ZodObject.lazycreate = (shape, params) => {
		return new ZodObject({
			shape,
			unknownKeys: "strip",
			catchall: ZodNever.create(),
			typeName: ZodFirstPartyTypeKind.ZodObject,
			...processCreateParams(params)
		});
	};
	ZodUnion = class extends ZodType {
		_parse(input) {
			const { ctx } = this._processInputParams(input);
			const options = this._def.options;
			function handleResults(results) {
				for (const result of results) if (result.result.status === "valid") return result.result;
				for (const result of results) if (result.result.status === "dirty") {
					ctx.common.issues.push(...result.ctx.common.issues);
					return result.result;
				}
				const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_union,
					unionErrors
				});
				return INVALID;
			}
			if (ctx.common.async) return Promise.all(options.map(async (option) => {
				const childCtx = {
					...ctx,
					common: {
						...ctx.common,
						issues: []
					},
					parent: null
				};
				return {
					result: await option._parseAsync({
						data: ctx.data,
						path: ctx.path,
						parent: childCtx
					}),
					ctx: childCtx
				};
			})).then(handleResults);
			else {
				let dirty = void 0;
				const issues = [];
				for (const option of options) {
					const childCtx = {
						...ctx,
						common: {
							...ctx.common,
							issues: []
						},
						parent: null
					};
					const result = option._parseSync({
						data: ctx.data,
						path: ctx.path,
						parent: childCtx
					});
					if (result.status === "valid") return result;
					else if (result.status === "dirty" && !dirty) dirty = {
						result,
						ctx: childCtx
					};
					if (childCtx.common.issues.length) issues.push(childCtx.common.issues);
				}
				if (dirty) {
					ctx.common.issues.push(...dirty.ctx.common.issues);
					return dirty.result;
				}
				const unionErrors = issues.map((issues) => new ZodError(issues));
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_union,
					unionErrors
				});
				return INVALID;
			}
		}
		get options() {
			return this._def.options;
		}
	};
	ZodUnion.create = (types, params) => {
		return new ZodUnion({
			options: types,
			typeName: ZodFirstPartyTypeKind.ZodUnion,
			...processCreateParams(params)
		});
	};
	getDiscriminator = (type) => {
		if (type instanceof ZodLazy) return getDiscriminator(type.schema);
		else if (type instanceof ZodEffects) return getDiscriminator(type.innerType());
		else if (type instanceof ZodLiteral) return [type.value];
		else if (type instanceof ZodEnum) return type.options;
		else if (type instanceof ZodNativeEnum) return util.objectValues(type.enum);
		else if (type instanceof ZodDefault) return getDiscriminator(type._def.innerType);
		else if (type instanceof ZodUndefined) return [void 0];
		else if (type instanceof ZodNull) return [null];
		else if (type instanceof ZodOptional) return [void 0, ...getDiscriminator(type.unwrap())];
		else if (type instanceof ZodNullable) return [null, ...getDiscriminator(type.unwrap())];
		else if (type instanceof ZodBranded) return getDiscriminator(type.unwrap());
		else if (type instanceof ZodReadonly) return getDiscriminator(type.unwrap());
		else if (type instanceof ZodCatch) return getDiscriminator(type._def.innerType);
		else return [];
	};
	ZodDiscriminatedUnion = class ZodDiscriminatedUnion extends ZodType {
		_parse(input) {
			const { ctx } = this._processInputParams(input);
			if (ctx.parsedType !== ZodParsedType.object) {
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_type,
					expected: ZodParsedType.object,
					received: ctx.parsedType
				});
				return INVALID;
			}
			const discriminator = this.discriminator;
			const discriminatorValue = ctx.data[discriminator];
			const option = this.optionsMap.get(discriminatorValue);
			if (!option) {
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_union_discriminator,
					options: Array.from(this.optionsMap.keys()),
					path: [discriminator]
				});
				return INVALID;
			}
			if (ctx.common.async) return option._parseAsync({
				data: ctx.data,
				path: ctx.path,
				parent: ctx
			});
			else return option._parseSync({
				data: ctx.data,
				path: ctx.path,
				parent: ctx
			});
		}
		get discriminator() {
			return this._def.discriminator;
		}
		get options() {
			return this._def.options;
		}
		get optionsMap() {
			return this._def.optionsMap;
		}
		/**
		* The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
		* However, it only allows a union of objects, all of which need to share a discriminator property. This property must
		* have a different value for each object in the union.
		* @param discriminator the name of the discriminator property
		* @param types an array of object schemas
		* @param params
		*/
		static create(discriminator, options, params) {
			const optionsMap = /* @__PURE__ */ new Map();
			for (const type of options) {
				const discriminatorValues = getDiscriminator(type.shape[discriminator]);
				if (!discriminatorValues.length) throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
				for (const value of discriminatorValues) {
					if (optionsMap.has(value)) throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
					optionsMap.set(value, type);
				}
			}
			return new ZodDiscriminatedUnion({
				typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
				discriminator,
				options,
				optionsMap,
				...processCreateParams(params)
			});
		}
	};
	ZodIntersection = class extends ZodType {
		_parse(input) {
			const { status, ctx } = this._processInputParams(input);
			const handleParsed = (parsedLeft, parsedRight) => {
				if (isAborted(parsedLeft) || isAborted(parsedRight)) return INVALID;
				const merged = mergeValues(parsedLeft.value, parsedRight.value);
				if (!merged.valid) {
					addIssueToContext(ctx, { code: ZodIssueCode.invalid_intersection_types });
					return INVALID;
				}
				if (isDirty(parsedLeft) || isDirty(parsedRight)) status.dirty();
				return {
					status: status.value,
					value: merged.data
				};
			};
			if (ctx.common.async) return Promise.all([this._def.left._parseAsync({
				data: ctx.data,
				path: ctx.path,
				parent: ctx
			}), this._def.right._parseAsync({
				data: ctx.data,
				path: ctx.path,
				parent: ctx
			})]).then(([left, right]) => handleParsed(left, right));
			else return handleParsed(this._def.left._parseSync({
				data: ctx.data,
				path: ctx.path,
				parent: ctx
			}), this._def.right._parseSync({
				data: ctx.data,
				path: ctx.path,
				parent: ctx
			}));
		}
	};
	ZodIntersection.create = (left, right, params) => {
		return new ZodIntersection({
			left,
			right,
			typeName: ZodFirstPartyTypeKind.ZodIntersection,
			...processCreateParams(params)
		});
	};
	ZodTuple = class ZodTuple extends ZodType {
		_parse(input) {
			const { status, ctx } = this._processInputParams(input);
			if (ctx.parsedType !== ZodParsedType.array) {
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_type,
					expected: ZodParsedType.array,
					received: ctx.parsedType
				});
				return INVALID;
			}
			if (ctx.data.length < this._def.items.length) {
				addIssueToContext(ctx, {
					code: ZodIssueCode.too_small,
					minimum: this._def.items.length,
					inclusive: true,
					exact: false,
					type: "array"
				});
				return INVALID;
			}
			if (!this._def.rest && ctx.data.length > this._def.items.length) {
				addIssueToContext(ctx, {
					code: ZodIssueCode.too_big,
					maximum: this._def.items.length,
					inclusive: true,
					exact: false,
					type: "array"
				});
				status.dirty();
			}
			const items = [...ctx.data].map((item, itemIndex) => {
				const schema = this._def.items[itemIndex] || this._def.rest;
				if (!schema) return null;
				return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
			}).filter((x) => !!x);
			if (ctx.common.async) return Promise.all(items).then((results) => {
				return ParseStatus.mergeArray(status, results);
			});
			else return ParseStatus.mergeArray(status, items);
		}
		get items() {
			return this._def.items;
		}
		rest(rest) {
			return new ZodTuple({
				...this._def,
				rest
			});
		}
	};
	ZodTuple.create = (schemas, params) => {
		if (!Array.isArray(schemas)) throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
		return new ZodTuple({
			items: schemas,
			typeName: ZodFirstPartyTypeKind.ZodTuple,
			rest: null,
			...processCreateParams(params)
		});
	};
	ZodRecord = class ZodRecord extends ZodType {
		get keySchema() {
			return this._def.keyType;
		}
		get valueSchema() {
			return this._def.valueType;
		}
		_parse(input) {
			const { status, ctx } = this._processInputParams(input);
			if (ctx.parsedType !== ZodParsedType.object) {
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_type,
					expected: ZodParsedType.object,
					received: ctx.parsedType
				});
				return INVALID;
			}
			const pairs = [];
			const keyType = this._def.keyType;
			const valueType = this._def.valueType;
			for (const key in ctx.data) pairs.push({
				key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
				value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key)),
				alwaysSet: key in ctx.data
			});
			if (ctx.common.async) return ParseStatus.mergeObjectAsync(status, pairs);
			else return ParseStatus.mergeObjectSync(status, pairs);
		}
		get element() {
			return this._def.valueType;
		}
		static create(first, second, third) {
			if (second instanceof ZodType) return new ZodRecord({
				keyType: first,
				valueType: second,
				typeName: ZodFirstPartyTypeKind.ZodRecord,
				...processCreateParams(third)
			});
			return new ZodRecord({
				keyType: ZodString.create(),
				valueType: first,
				typeName: ZodFirstPartyTypeKind.ZodRecord,
				...processCreateParams(second)
			});
		}
	};
	ZodMap = class extends ZodType {
		get keySchema() {
			return this._def.keyType;
		}
		get valueSchema() {
			return this._def.valueType;
		}
		_parse(input) {
			const { status, ctx } = this._processInputParams(input);
			if (ctx.parsedType !== ZodParsedType.map) {
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_type,
					expected: ZodParsedType.map,
					received: ctx.parsedType
				});
				return INVALID;
			}
			const keyType = this._def.keyType;
			const valueType = this._def.valueType;
			const pairs = [...ctx.data.entries()].map(([key, value], index) => {
				return {
					key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
					value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
				};
			});
			if (ctx.common.async) {
				const finalMap = /* @__PURE__ */ new Map();
				return Promise.resolve().then(async () => {
					for (const pair of pairs) {
						const key = await pair.key;
						const value = await pair.value;
						if (key.status === "aborted" || value.status === "aborted") return INVALID;
						if (key.status === "dirty" || value.status === "dirty") status.dirty();
						finalMap.set(key.value, value.value);
					}
					return {
						status: status.value,
						value: finalMap
					};
				});
			} else {
				const finalMap = /* @__PURE__ */ new Map();
				for (const pair of pairs) {
					const key = pair.key;
					const value = pair.value;
					if (key.status === "aborted" || value.status === "aborted") return INVALID;
					if (key.status === "dirty" || value.status === "dirty") status.dirty();
					finalMap.set(key.value, value.value);
				}
				return {
					status: status.value,
					value: finalMap
				};
			}
		}
	};
	ZodMap.create = (keyType, valueType, params) => {
		return new ZodMap({
			valueType,
			keyType,
			typeName: ZodFirstPartyTypeKind.ZodMap,
			...processCreateParams(params)
		});
	};
	ZodSet = class ZodSet extends ZodType {
		_parse(input) {
			const { status, ctx } = this._processInputParams(input);
			if (ctx.parsedType !== ZodParsedType.set) {
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_type,
					expected: ZodParsedType.set,
					received: ctx.parsedType
				});
				return INVALID;
			}
			const def = this._def;
			if (def.minSize !== null) {
				if (ctx.data.size < def.minSize.value) {
					addIssueToContext(ctx, {
						code: ZodIssueCode.too_small,
						minimum: def.minSize.value,
						type: "set",
						inclusive: true,
						exact: false,
						message: def.minSize.message
					});
					status.dirty();
				}
			}
			if (def.maxSize !== null) {
				if (ctx.data.size > def.maxSize.value) {
					addIssueToContext(ctx, {
						code: ZodIssueCode.too_big,
						maximum: def.maxSize.value,
						type: "set",
						inclusive: true,
						exact: false,
						message: def.maxSize.message
					});
					status.dirty();
				}
			}
			const valueType = this._def.valueType;
			function finalizeSet(elements) {
				const parsedSet = /* @__PURE__ */ new Set();
				for (const element of elements) {
					if (element.status === "aborted") return INVALID;
					if (element.status === "dirty") status.dirty();
					parsedSet.add(element.value);
				}
				return {
					status: status.value,
					value: parsedSet
				};
			}
			const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
			if (ctx.common.async) return Promise.all(elements).then((elements) => finalizeSet(elements));
			else return finalizeSet(elements);
		}
		min(minSize, message) {
			return new ZodSet({
				...this._def,
				minSize: {
					value: minSize,
					message: errorUtil.toString(message)
				}
			});
		}
		max(maxSize, message) {
			return new ZodSet({
				...this._def,
				maxSize: {
					value: maxSize,
					message: errorUtil.toString(message)
				}
			});
		}
		size(size, message) {
			return this.min(size, message).max(size, message);
		}
		nonempty(message) {
			return this.min(1, message);
		}
	};
	ZodSet.create = (valueType, params) => {
		return new ZodSet({
			valueType,
			minSize: null,
			maxSize: null,
			typeName: ZodFirstPartyTypeKind.ZodSet,
			...processCreateParams(params)
		});
	};
	ZodFunction = class ZodFunction extends ZodType {
		constructor() {
			super(...arguments);
			this.validate = this.implement;
		}
		_parse(input) {
			const { ctx } = this._processInputParams(input);
			if (ctx.parsedType !== ZodParsedType.function) {
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_type,
					expected: ZodParsedType.function,
					received: ctx.parsedType
				});
				return INVALID;
			}
			function makeArgsIssue(args, error) {
				return makeIssue({
					data: args,
					path: ctx.path,
					errorMaps: [
						ctx.common.contextualErrorMap,
						ctx.schemaErrorMap,
						getErrorMap(),
						errorMap
					].filter((x) => !!x),
					issueData: {
						code: ZodIssueCode.invalid_arguments,
						argumentsError: error
					}
				});
			}
			function makeReturnsIssue(returns, error) {
				return makeIssue({
					data: returns,
					path: ctx.path,
					errorMaps: [
						ctx.common.contextualErrorMap,
						ctx.schemaErrorMap,
						getErrorMap(),
						errorMap
					].filter((x) => !!x),
					issueData: {
						code: ZodIssueCode.invalid_return_type,
						returnTypeError: error
					}
				});
			}
			const params = { errorMap: ctx.common.contextualErrorMap };
			const fn = ctx.data;
			if (this._def.returns instanceof ZodPromise) {
				const me = this;
				return OK(async function(...args) {
					const error = new ZodError([]);
					const parsedArgs = await me._def.args.parseAsync(args, params).catch((e) => {
						error.addIssue(makeArgsIssue(args, e));
						throw error;
					});
					const result = await Reflect.apply(fn, this, parsedArgs);
					return await me._def.returns._def.type.parseAsync(result, params).catch((e) => {
						error.addIssue(makeReturnsIssue(result, e));
						throw error;
					});
				});
			} else {
				const me = this;
				return OK(function(...args) {
					const parsedArgs = me._def.args.safeParse(args, params);
					if (!parsedArgs.success) throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
					const result = Reflect.apply(fn, this, parsedArgs.data);
					const parsedReturns = me._def.returns.safeParse(result, params);
					if (!parsedReturns.success) throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
					return parsedReturns.data;
				});
			}
		}
		parameters() {
			return this._def.args;
		}
		returnType() {
			return this._def.returns;
		}
		args(...items) {
			return new ZodFunction({
				...this._def,
				args: ZodTuple.create(items).rest(ZodUnknown.create())
			});
		}
		returns(returnType) {
			return new ZodFunction({
				...this._def,
				returns: returnType
			});
		}
		implement(func) {
			return this.parse(func);
		}
		strictImplement(func) {
			return this.parse(func);
		}
		static create(args, returns, params) {
			return new ZodFunction({
				args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
				returns: returns || ZodUnknown.create(),
				typeName: ZodFirstPartyTypeKind.ZodFunction,
				...processCreateParams(params)
			});
		}
	};
	ZodLazy = class extends ZodType {
		get schema() {
			return this._def.getter();
		}
		_parse(input) {
			const { ctx } = this._processInputParams(input);
			return this._def.getter()._parse({
				data: ctx.data,
				path: ctx.path,
				parent: ctx
			});
		}
	};
	ZodLazy.create = (getter, params) => {
		return new ZodLazy({
			getter,
			typeName: ZodFirstPartyTypeKind.ZodLazy,
			...processCreateParams(params)
		});
	};
	ZodLiteral = class extends ZodType {
		_parse(input) {
			if (input.data !== this._def.value) {
				const ctx = this._getOrReturnCtx(input);
				addIssueToContext(ctx, {
					received: ctx.data,
					code: ZodIssueCode.invalid_literal,
					expected: this._def.value
				});
				return INVALID;
			}
			return {
				status: "valid",
				value: input.data
			};
		}
		get value() {
			return this._def.value;
		}
	};
	ZodLiteral.create = (value, params) => {
		return new ZodLiteral({
			value,
			typeName: ZodFirstPartyTypeKind.ZodLiteral,
			...processCreateParams(params)
		});
	};
	ZodEnum = class ZodEnum extends ZodType {
		_parse(input) {
			if (typeof input.data !== "string") {
				const ctx = this._getOrReturnCtx(input);
				const expectedValues = this._def.values;
				addIssueToContext(ctx, {
					expected: util.joinValues(expectedValues),
					received: ctx.parsedType,
					code: ZodIssueCode.invalid_type
				});
				return INVALID;
			}
			if (!this._cache) this._cache = new Set(this._def.values);
			if (!this._cache.has(input.data)) {
				const ctx = this._getOrReturnCtx(input);
				const expectedValues = this._def.values;
				addIssueToContext(ctx, {
					received: ctx.data,
					code: ZodIssueCode.invalid_enum_value,
					options: expectedValues
				});
				return INVALID;
			}
			return OK(input.data);
		}
		get options() {
			return this._def.values;
		}
		get enum() {
			const enumValues = {};
			for (const val of this._def.values) enumValues[val] = val;
			return enumValues;
		}
		get Values() {
			const enumValues = {};
			for (const val of this._def.values) enumValues[val] = val;
			return enumValues;
		}
		get Enum() {
			const enumValues = {};
			for (const val of this._def.values) enumValues[val] = val;
			return enumValues;
		}
		extract(values, newDef = this._def) {
			return ZodEnum.create(values, {
				...this._def,
				...newDef
			});
		}
		exclude(values, newDef = this._def) {
			return ZodEnum.create(this.options.filter((opt) => !values.includes(opt)), {
				...this._def,
				...newDef
			});
		}
	};
	ZodEnum.create = createZodEnum;
	ZodNativeEnum = class extends ZodType {
		_parse(input) {
			const nativeEnumValues = util.getValidEnumValues(this._def.values);
			const ctx = this._getOrReturnCtx(input);
			if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
				const expectedValues = util.objectValues(nativeEnumValues);
				addIssueToContext(ctx, {
					expected: util.joinValues(expectedValues),
					received: ctx.parsedType,
					code: ZodIssueCode.invalid_type
				});
				return INVALID;
			}
			if (!this._cache) this._cache = new Set(util.getValidEnumValues(this._def.values));
			if (!this._cache.has(input.data)) {
				const expectedValues = util.objectValues(nativeEnumValues);
				addIssueToContext(ctx, {
					received: ctx.data,
					code: ZodIssueCode.invalid_enum_value,
					options: expectedValues
				});
				return INVALID;
			}
			return OK(input.data);
		}
		get enum() {
			return this._def.values;
		}
	};
	ZodNativeEnum.create = (values, params) => {
		return new ZodNativeEnum({
			values,
			typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
			...processCreateParams(params)
		});
	};
	ZodPromise = class extends ZodType {
		unwrap() {
			return this._def.type;
		}
		_parse(input) {
			const { ctx } = this._processInputParams(input);
			if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_type,
					expected: ZodParsedType.promise,
					received: ctx.parsedType
				});
				return INVALID;
			}
			return OK((ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data)).then((data) => {
				return this._def.type.parseAsync(data, {
					path: ctx.path,
					errorMap: ctx.common.contextualErrorMap
				});
			}));
		}
	};
	ZodPromise.create = (schema, params) => {
		return new ZodPromise({
			type: schema,
			typeName: ZodFirstPartyTypeKind.ZodPromise,
			...processCreateParams(params)
		});
	};
	ZodEffects = class extends ZodType {
		innerType() {
			return this._def.schema;
		}
		sourceType() {
			return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
		}
		_parse(input) {
			const { status, ctx } = this._processInputParams(input);
			const effect = this._def.effect || null;
			const checkCtx = {
				addIssue: (arg) => {
					addIssueToContext(ctx, arg);
					if (arg.fatal) status.abort();
					else status.dirty();
				},
				get path() {
					return ctx.path;
				}
			};
			checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
			if (effect.type === "preprocess") {
				const processed = effect.transform(ctx.data, checkCtx);
				if (ctx.common.async) return Promise.resolve(processed).then(async (processed) => {
					if (status.value === "aborted") return INVALID;
					const result = await this._def.schema._parseAsync({
						data: processed,
						path: ctx.path,
						parent: ctx
					});
					if (result.status === "aborted") return INVALID;
					if (result.status === "dirty") return DIRTY(result.value);
					if (status.value === "dirty") return DIRTY(result.value);
					return result;
				});
				else {
					if (status.value === "aborted") return INVALID;
					const result = this._def.schema._parseSync({
						data: processed,
						path: ctx.path,
						parent: ctx
					});
					if (result.status === "aborted") return INVALID;
					if (result.status === "dirty") return DIRTY(result.value);
					if (status.value === "dirty") return DIRTY(result.value);
					return result;
				}
			}
			if (effect.type === "refinement") {
				const executeRefinement = (acc) => {
					const result = effect.refinement(acc, checkCtx);
					if (ctx.common.async) return Promise.resolve(result);
					if (result instanceof Promise) throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
					return acc;
				};
				if (ctx.common.async === false) {
					const inner = this._def.schema._parseSync({
						data: ctx.data,
						path: ctx.path,
						parent: ctx
					});
					if (inner.status === "aborted") return INVALID;
					if (inner.status === "dirty") status.dirty();
					executeRefinement(inner.value);
					return {
						status: status.value,
						value: inner.value
					};
				} else return this._def.schema._parseAsync({
					data: ctx.data,
					path: ctx.path,
					parent: ctx
				}).then((inner) => {
					if (inner.status === "aborted") return INVALID;
					if (inner.status === "dirty") status.dirty();
					return executeRefinement(inner.value).then(() => {
						return {
							status: status.value,
							value: inner.value
						};
					});
				});
			}
			if (effect.type === "transform") if (ctx.common.async === false) {
				const base = this._def.schema._parseSync({
					data: ctx.data,
					path: ctx.path,
					parent: ctx
				});
				if (!isValid(base)) return INVALID;
				const result = effect.transform(base.value, checkCtx);
				if (result instanceof Promise) throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
				return {
					status: status.value,
					value: result
				};
			} else return this._def.schema._parseAsync({
				data: ctx.data,
				path: ctx.path,
				parent: ctx
			}).then((base) => {
				if (!isValid(base)) return INVALID;
				return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({
					status: status.value,
					value: result
				}));
			});
			util.assertNever(effect);
		}
	};
	ZodEffects.create = (schema, effect, params) => {
		return new ZodEffects({
			schema,
			typeName: ZodFirstPartyTypeKind.ZodEffects,
			effect,
			...processCreateParams(params)
		});
	};
	ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
		return new ZodEffects({
			schema,
			effect: {
				type: "preprocess",
				transform: preprocess
			},
			typeName: ZodFirstPartyTypeKind.ZodEffects,
			...processCreateParams(params)
		});
	};
	ZodOptional = class extends ZodType {
		_parse(input) {
			if (this._getType(input) === ZodParsedType.undefined) return OK(void 0);
			return this._def.innerType._parse(input);
		}
		unwrap() {
			return this._def.innerType;
		}
	};
	ZodOptional.create = (type, params) => {
		return new ZodOptional({
			innerType: type,
			typeName: ZodFirstPartyTypeKind.ZodOptional,
			...processCreateParams(params)
		});
	};
	ZodNullable = class extends ZodType {
		_parse(input) {
			if (this._getType(input) === ZodParsedType.null) return OK(null);
			return this._def.innerType._parse(input);
		}
		unwrap() {
			return this._def.innerType;
		}
	};
	ZodNullable.create = (type, params) => {
		return new ZodNullable({
			innerType: type,
			typeName: ZodFirstPartyTypeKind.ZodNullable,
			...processCreateParams(params)
		});
	};
	ZodDefault = class extends ZodType {
		_parse(input) {
			const { ctx } = this._processInputParams(input);
			let data = ctx.data;
			if (ctx.parsedType === ZodParsedType.undefined) data = this._def.defaultValue();
			return this._def.innerType._parse({
				data,
				path: ctx.path,
				parent: ctx
			});
		}
		removeDefault() {
			return this._def.innerType;
		}
	};
	ZodDefault.create = (type, params) => {
		return new ZodDefault({
			innerType: type,
			typeName: ZodFirstPartyTypeKind.ZodDefault,
			defaultValue: typeof params.default === "function" ? params.default : () => params.default,
			...processCreateParams(params)
		});
	};
	ZodCatch = class extends ZodType {
		_parse(input) {
			const { ctx } = this._processInputParams(input);
			const newCtx = {
				...ctx,
				common: {
					...ctx.common,
					issues: []
				}
			};
			const result = this._def.innerType._parse({
				data: newCtx.data,
				path: newCtx.path,
				parent: { ...newCtx }
			});
			if (isAsync(result)) return result.then((result) => {
				return {
					status: "valid",
					value: result.status === "valid" ? result.value : this._def.catchValue({
						get error() {
							return new ZodError(newCtx.common.issues);
						},
						input: newCtx.data
					})
				};
			});
			else return {
				status: "valid",
				value: result.status === "valid" ? result.value : this._def.catchValue({
					get error() {
						return new ZodError(newCtx.common.issues);
					},
					input: newCtx.data
				})
			};
		}
		removeCatch() {
			return this._def.innerType;
		}
	};
	ZodCatch.create = (type, params) => {
		return new ZodCatch({
			innerType: type,
			typeName: ZodFirstPartyTypeKind.ZodCatch,
			catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
			...processCreateParams(params)
		});
	};
	ZodNaN = class extends ZodType {
		_parse(input) {
			if (this._getType(input) !== ZodParsedType.nan) {
				const ctx = this._getOrReturnCtx(input);
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_type,
					expected: ZodParsedType.nan,
					received: ctx.parsedType
				});
				return INVALID;
			}
			return {
				status: "valid",
				value: input.data
			};
		}
	};
	ZodNaN.create = (params) => {
		return new ZodNaN({
			typeName: ZodFirstPartyTypeKind.ZodNaN,
			...processCreateParams(params)
		});
	};
	ZodBranded = class extends ZodType {
		_parse(input) {
			const { ctx } = this._processInputParams(input);
			const data = ctx.data;
			return this._def.type._parse({
				data,
				path: ctx.path,
				parent: ctx
			});
		}
		unwrap() {
			return this._def.type;
		}
	};
	ZodPipeline = class ZodPipeline extends ZodType {
		_parse(input) {
			const { status, ctx } = this._processInputParams(input);
			if (ctx.common.async) {
				const handleAsync = async () => {
					const inResult = await this._def.in._parseAsync({
						data: ctx.data,
						path: ctx.path,
						parent: ctx
					});
					if (inResult.status === "aborted") return INVALID;
					if (inResult.status === "dirty") {
						status.dirty();
						return DIRTY(inResult.value);
					} else return this._def.out._parseAsync({
						data: inResult.value,
						path: ctx.path,
						parent: ctx
					});
				};
				return handleAsync();
			} else {
				const inResult = this._def.in._parseSync({
					data: ctx.data,
					path: ctx.path,
					parent: ctx
				});
				if (inResult.status === "aborted") return INVALID;
				if (inResult.status === "dirty") {
					status.dirty();
					return {
						status: "dirty",
						value: inResult.value
					};
				} else return this._def.out._parseSync({
					data: inResult.value,
					path: ctx.path,
					parent: ctx
				});
			}
		}
		static create(a, b) {
			return new ZodPipeline({
				in: a,
				out: b,
				typeName: ZodFirstPartyTypeKind.ZodPipeline
			});
		}
	};
	ZodReadonly = class extends ZodType {
		_parse(input) {
			const result = this._def.innerType._parse(input);
			const freeze = (data) => {
				if (isValid(data)) data.value = Object.freeze(data.value);
				return data;
			};
			return isAsync(result) ? result.then((data) => freeze(data)) : freeze(result);
		}
		unwrap() {
			return this._def.innerType;
		}
	};
	ZodReadonly.create = (type, params) => {
		return new ZodReadonly({
			innerType: type,
			typeName: ZodFirstPartyTypeKind.ZodReadonly,
			...processCreateParams(params)
		});
	};
	ZodObject.lazycreate;
	(function(ZodFirstPartyTypeKind) {
		ZodFirstPartyTypeKind["ZodString"] = "ZodString";
		ZodFirstPartyTypeKind["ZodNumber"] = "ZodNumber";
		ZodFirstPartyTypeKind["ZodNaN"] = "ZodNaN";
		ZodFirstPartyTypeKind["ZodBigInt"] = "ZodBigInt";
		ZodFirstPartyTypeKind["ZodBoolean"] = "ZodBoolean";
		ZodFirstPartyTypeKind["ZodDate"] = "ZodDate";
		ZodFirstPartyTypeKind["ZodSymbol"] = "ZodSymbol";
		ZodFirstPartyTypeKind["ZodUndefined"] = "ZodUndefined";
		ZodFirstPartyTypeKind["ZodNull"] = "ZodNull";
		ZodFirstPartyTypeKind["ZodAny"] = "ZodAny";
		ZodFirstPartyTypeKind["ZodUnknown"] = "ZodUnknown";
		ZodFirstPartyTypeKind["ZodNever"] = "ZodNever";
		ZodFirstPartyTypeKind["ZodVoid"] = "ZodVoid";
		ZodFirstPartyTypeKind["ZodArray"] = "ZodArray";
		ZodFirstPartyTypeKind["ZodObject"] = "ZodObject";
		ZodFirstPartyTypeKind["ZodUnion"] = "ZodUnion";
		ZodFirstPartyTypeKind["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
		ZodFirstPartyTypeKind["ZodIntersection"] = "ZodIntersection";
		ZodFirstPartyTypeKind["ZodTuple"] = "ZodTuple";
		ZodFirstPartyTypeKind["ZodRecord"] = "ZodRecord";
		ZodFirstPartyTypeKind["ZodMap"] = "ZodMap";
		ZodFirstPartyTypeKind["ZodSet"] = "ZodSet";
		ZodFirstPartyTypeKind["ZodFunction"] = "ZodFunction";
		ZodFirstPartyTypeKind["ZodLazy"] = "ZodLazy";
		ZodFirstPartyTypeKind["ZodLiteral"] = "ZodLiteral";
		ZodFirstPartyTypeKind["ZodEnum"] = "ZodEnum";
		ZodFirstPartyTypeKind["ZodEffects"] = "ZodEffects";
		ZodFirstPartyTypeKind["ZodNativeEnum"] = "ZodNativeEnum";
		ZodFirstPartyTypeKind["ZodOptional"] = "ZodOptional";
		ZodFirstPartyTypeKind["ZodNullable"] = "ZodNullable";
		ZodFirstPartyTypeKind["ZodDefault"] = "ZodDefault";
		ZodFirstPartyTypeKind["ZodCatch"] = "ZodCatch";
		ZodFirstPartyTypeKind["ZodPromise"] = "ZodPromise";
		ZodFirstPartyTypeKind["ZodBranded"] = "ZodBranded";
		ZodFirstPartyTypeKind["ZodPipeline"] = "ZodPipeline";
		ZodFirstPartyTypeKind["ZodReadonly"] = "ZodReadonly";
	})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
	stringType = ZodString.create;
	numberType = ZodNumber.create;
	ZodNaN.create;
	ZodBigInt.create;
	booleanType = ZodBoolean.create;
	ZodDate.create;
	ZodSymbol.create;
	ZodUndefined.create;
	ZodNull.create;
	ZodAny.create;
	unknownType = ZodUnknown.create;
	ZodNever.create;
	ZodVoid.create;
	arrayType = ZodArray.create;
	objectType = ZodObject.create;
	ZodObject.strictCreate;
	unionType = ZodUnion.create;
	ZodDiscriminatedUnion.create;
	ZodIntersection.create;
	ZodTuple.create;
	recordType = ZodRecord.create;
	ZodMap.create;
	ZodSet.create;
	ZodFunction.create;
	ZodLazy.create;
	literalType = ZodLiteral.create;
	enumType = ZodEnum.create;
	ZodNativeEnum.create;
	ZodPromise.create;
	ZodEffects.create;
	ZodOptional.create;
	ZodNullable.create;
	ZodEffects.createWithPreprocess;
	ZodPipeline.create;
}));
//#endregion
//#region ../../packages/agent-provider/node_modules/zod/v3/external.js
var init_external = __esmMin((() => {
	init_errors$1();
	init_parseUtil();
	init_typeAliases();
	init_util();
	init_types$6();
	init_ZodError();
}));
//#endregion
//#region ../../packages/agent-provider/node_modules/zod/index.js
var init_zod = __esmMin((() => {
	init_external();
	init_external();
}));
//#endregion
//#region ../../packages/agent-provider/src/common/_legacy/tool-schemas.ts
/**
* 验证工具输入
* @param toolName 工具名称
* @param input 输入数据
* @returns 验证结果
*/
function validateToolInput(toolName, input) {
	const result = ToolInputSchemas[toolName].safeParse(input);
	if (result.success) return {
		success: true,
		data: result.data
	};
	return {
		success: false,
		error: result.error
	};
}
/**
* 验证工具输出
* @param toolName 工具名称
* @param output 输出数据
* @returns 验证结果
*/
function validateToolOutput(toolName, output) {
	const result = ToolOutputSchemas[toolName].safeParse(output);
	if (result.success) return {
		success: true,
		data: result.data
	};
	return {
		success: false,
		error: result.error
	};
}
var ToolInputSchemas, ToolOutputSchemas;
var init_tool_schemas = __esmMin((() => {
	init_zod();
	ToolInputSchemas = {
		list_dir: objectType({
			target_directory: stringType().describe("要列出内容的目录路径"),
			ignore_globs: stringType().optional().describe("可选的 glob 模式数组，用于忽略特定文件")
		}),
		search_file: objectType({
			target_directory: stringType().describe("搜索的目录绝对路径"),
			pattern: stringType().describe("文件模式（如 \"*.js\"），支持通配符"),
			recursive: booleanType().describe("是否递归搜索子目录"),
			caseSensitive: booleanType().describe("是否区分大小写")
		}),
		read_file: objectType({
			filePath: stringType().describe("要读取的文件的绝对路径"),
			offset: numberType().optional().describe("开始读取的行号"),
			limit: numberType().optional().describe("要读取的行数")
		}),
		read_lints: objectType({ paths: stringType().optional().describe("要读取 lint 错误的文件或目录路径") }),
		rag_search: objectType({
			queryString: stringType().describe("用户的实际问题或搜索查询"),
			knowledgeBaseNames: stringType().describe("知识库名称，多个用逗号分隔")
		}),
		mcp_get_tool_description: objectType({ toolRequests: stringType().describe("JSON 字符串，二维数组格式：[[\"server1\", \"tool1\"], [\"server2\", \"tool2\"]]") }),
		mcp_call_tool: objectType({
			serverName: stringType().describe("MCP 服务器名称"),
			toolName: stringType().describe("要调用的工具名称"),
			arguments: stringType().describe("目标 MCP 工具的参数，JSON 格式字符串"),
			maxOutputLength: numberType().optional().describe("控制工具输出的最大长度，默认 200000")
		}),
		fetch_mcp_resource: objectType({
			server: stringType().describe("MCP 服务器标识符"),
			uri: stringType().describe("要读取的资源 URI"),
			arguments: recordType(unknownType()).optional().describe("资源模板的参数"),
			downloadPath: stringType().optional().describe("可选的绝对路径，用于保存资源到磁盘")
		}),
		update_memory: objectType({
			action: enumType([
				"create",
				"update",
				"delete"
			]).optional().describe("执行的操作"),
			existing_knowledge_id: stringType().optional().describe("更新或删除时必需，现有记忆的 ID"),
			knowledge_to_store: stringType().optional().describe("要存储的特定记忆"),
			title: stringType().optional().describe("记忆的标题")
		}),
		search_content: objectType({
			pattern: stringType().describe("要搜索的关键字或正则表达式模式"),
			directory: stringType().describe("要搜索的目录的绝对路径"),
			fileTypes: stringType().optional().describe("可选的逗号分隔文件扩展名"),
			contextBefore: numberType().optional().describe("每个匹配前显示的行数"),
			contextAfter: numberType().optional().describe("每个匹配后显示的行数"),
			contextAround: numberType().optional().describe("每个匹配前后显示的行数"),
			outputMode: stringType().optional().describe("输出模式：content、files_with_matches 或 count"),
			caseSensitive: booleanType().optional().describe("是否区分大小写")
		}),
		write_to_file: objectType({
			filePath: stringType().describe("目标文件的绝对路径"),
			content: stringType().describe("要写入的内容")
		}),
		replace_in_file: objectType({
			filePath: stringType().describe("要修改的文件的绝对路径"),
			old_str: stringType().describe("要替换的文本"),
			new_str: stringType().describe("替换后的文本")
		}),
		delete_file: objectType({
			target_file: stringType().describe("要删除的文件的绝对路径"),
			explanation: stringType().optional().describe("为什么使用此工具的一句话解释")
		}),
		execute_command: objectType({
			command: stringType().describe("要执行的 CLI 命令"),
			requires_approval: booleanType().describe("命令是否需要用户批准")
		}),
		preview_url: objectType({ url: stringType().describe("要打开的完整、有效的 HTTP/HTTPS URL") }),
		ask_followup_question: objectType({ questions: arrayType(objectType({
			question: stringType(),
			header: stringType().max(12),
			options: arrayType(objectType({
				label: stringType().max(50),
				description: stringType()
			})).min(2).max(4),
			multiSelect: booleanType().optional()
		})).min(1).max(4) }),
		invoke_integration: objectType({}).passthrough(),
		call_integration: objectType({}).passthrough(),
		search_integration_tool: objectType({}).passthrough(),
		supabase_get_logs: objectType({}).passthrough(),
		supabase_execute_sql: objectType({}).passthrough(),
		supabase_apply_migration: objectType({}).passthrough(),
		supabase_list_migration: objectType({}).passthrough(),
		supabase_list_tables: objectType({}).passthrough(),
		cloud_studio_fetch_log: objectType({}).passthrough(),
		cloud_studio_execute_command: objectType({}).passthrough(),
		cloud_studio_deploy_sandbox: objectType({}).passthrough(),
		web_fetch: objectType({
			url: stringType().describe("要获取内容的 URL"),
			fetchInfo: stringType().describe("用户想要获取的信息描述")
		}),
		use_skill: objectType({ command: stringType().describe("技能名称（不含参数），如 \"pdf\" 或 \"xlsx\"") }),
		web_search: objectType({
			explanation: stringType().describe("为什么使用此工具的一句话解释"),
			query: stringType().describe("搜索关键词"),
			max_results: numberType().optional().describe("最大返回数量"),
			language: stringType().optional().describe("语言代码，例如 zh-CN")
		}),
		task: objectType({
			subagent_name: stringType().describe("要调用的子代理名称"),
			description: stringType().describe("任务的简短描述（3-5 个词）"),
			prompt: stringType().describe("子代理要执行的任务"),
			subagent_path: stringType().optional().describe("子代理定义文件的路径")
		}),
		codebase_search: objectType({
			query: stringType().describe("关于你想理解的内容的完整问题"),
			path: stringType().describe("限制搜索范围的目录路径前缀"),
			limit: numberType().max(100).optional().describe("返回的最大结果数，默认 10")
		}),
		lsp: objectType({}).passthrough(),
		spec_create: objectType({
			name: stringType().describe("Plan 名称，用作稳定标识符/文件名"),
			overview: stringType().describe("用一两句话精确概括本次 plan 的主要内容"),
			relative_history: stringType().describe("准备阶段的上下文，包含用户需求、代码位置、额外上下文等")
		}),
		spec_update: objectType({ status: enumType([
			"prepare",
			"ready",
			"building",
			"finished"
		]).optional().describe("Plan 状态") })
	};
	ToolOutputSchemas = {
		list_dir: objectType({
			type: literalType("list_files_result"),
			files: arrayType(objectType({
				filePath: stringType(),
				size: stringType(),
				modifyTime: stringType()
			})),
			root: stringType(),
			listing: stringType().optional()
		}),
		search_file: objectType({
			type: literalType("search_file_result"),
			path: stringType(),
			pattern: stringType(),
			recursive: booleanType().optional(),
			caseSensitive: booleanType().optional(),
			results: arrayType(objectType({
				filePath: stringType(),
				size: stringType(),
				modifyTime: stringType()
			}))
		}),
		read_file: objectType({
			type: literalType("read_file_result"),
			path: stringType(),
			content: stringType(),
			totalLineCount: numberType(),
			hasMore: booleanType(),
			diagnostic: stringType().optional(),
			hint: stringType().optional(),
			image: objectType({
				data: stringType(),
				mimeType: stringType()
			}).optional()
		}),
		read_lints: objectType({
			type: literalType("read_lints_result"),
			diagnostics: arrayType(stringType()),
			totalCount: numberType().optional(),
			hint: stringType().optional(),
			isTruncated: booleanType().optional()
		}),
		rag_search: objectType({
			type: literalType("knowledge_base_result"),
			selectedKnowledgeBases: stringType(),
			queryInput: stringType()
		}),
		mcp_get_tool_description: objectType({}).passthrough(),
		mcp_call_tool: objectType({
			type: literalType("mcp_call_tool_result"),
			serverName: stringType(),
			toolName: stringType(),
			data: arrayType(unionType([
				objectType({
					type: literalType("text"),
					text: stringType()
				}),
				objectType({
					type: literalType("image"),
					data: stringType(),
					mimeType: stringType()
				}),
				objectType({
					type: literalType("resource"),
					resource: objectType({
						uri: stringType(),
						mimeType: stringType().optional(),
						text: stringType().optional(),
						blob: stringType().optional()
					})
				})
			])),
			isError: booleanType().optional(),
			error: unknownType().optional(),
			hint: stringType().optional()
		}),
		fetch_mcp_resource: objectType({
			type: literalType("fetch_mcp_resource_result"),
			server: stringType(),
			uri: stringType(),
			content: stringType(),
			downloadPath: stringType().optional()
		}),
		update_memory: objectType({
			type: literalType("update_memory_result"),
			success: booleanType(),
			message: stringType(),
			action: enumType([
				"create",
				"update",
				"delete"
			]),
			knowledge_id: stringType().optional()
		}),
		search_content: objectType({
			type: literalType("search_content_result"),
			path: stringType(),
			pattern: stringType(),
			glob: stringType(),
			matches: arrayType(objectType({
				filePath: stringType(),
				content: stringType(),
				startLine: numberType(),
				endLine: numberType(),
				size: stringType(),
				modifyTime: stringType()
			})),
			totalCount: numberType(),
			hasMore: booleanType(),
			offset: numberType(),
			headLimit: numberType(),
			contextBefore: numberType(),
			contextAfter: numberType(),
			contextAround: numberType().optional(),
			outputMode: stringType(),
			caseSensitive: booleanType(),
			hint: stringType().optional()
		}),
		write_to_file: objectType({
			type: literalType("write_to_file_result"),
			path: stringType(),
			addLineCount: numberType(),
			removedLines: numberType(),
			addedChars: numberType().optional(),
			removedChars: numberType().optional(),
			bytesWritten: numberType(),
			isNewFile: booleanType(),
			oldContent: stringType().optional(),
			diagnostic: stringType().optional()
		}),
		replace_in_file: objectType({
			type: literalType("replace_in_file_result"),
			path: stringType(),
			addLineCount: numberType().optional(),
			removedLines: numberType().optional(),
			addedChars: numberType().optional(),
			removedChars: numberType().optional(),
			matchCount: numberType().optional(),
			hint: stringType().optional(),
			diagnosticChange: objectType({
				added: stringType(),
				removed: stringType(),
				unchanged: stringType()
			}).optional()
		}),
		delete_file: objectType({
			type: literalType("delete_file_result"),
			path: stringType(),
			recursive: booleanType(),
			hint: stringType().optional()
		}),
		execute_command: objectType({
			type: literalType("execute_command_result"),
			stdout: stringType(),
			stderr: stringType(),
			exitCode: numberType(),
			hint: stringType().optional(),
			serviceInfo: objectType({
				isWatchCommand: booleanType(),
				isServiceOutput: booleanType(),
				serviceReady: booleanType(),
				message: stringType()
			}).optional(),
			use_standalone_terminal: booleanType().optional()
		}),
		preview_url: objectType({
			type: literalType("preview_tool_result"),
			url: stringType(),
			message: stringType()
		}),
		ask_followup_question: objectType({
			type: literalType("multi_question_result"),
			questions: arrayType(objectType({
				id: stringType(),
				question: stringType(),
				options: arrayType(stringType()),
				multiSelect: booleanType().optional(),
				title: stringType().optional()
			})),
			answers: recordType(unionType([stringType(), arrayType(stringType())])),
			message: stringType()
		}),
		invoke_integration: objectType({
			type: literalType("invoke_integration_tool_result"),
			recommend: objectType({
				id: stringType(),
				type: stringType(),
				status: enumType(["connected", "disconnected"])
			}),
			message: stringType()
		}),
		call_integration: objectType({
			type: literalType("call_integration_tool_result"),
			integrationId: stringType(),
			toolName: stringType(),
			data: objectType({
				type: literalType("text"),
				text: stringType()
			}),
			isError: booleanType().optional(),
			error: unknownType().optional()
		}),
		search_integration_tool: objectType({
			type: literalType("search_integration_tool_result"),
			data: arrayType(objectType({
				integrationId: stringType(),
				integrationName: stringType(),
				toolName: stringType(),
				description: stringType(),
				inputSchema: recordType(unknownType())
			})),
			hint: stringType().optional()
		}),
		supabase_get_logs: objectType({
			type: enumType([
				"supabase_get_logs_result",
				"supabase_execute_sql_result",
				"supabase_apply_migration_result",
				"supabase_list_migration_result",
				"supabase_list_tables_result"
			]),
			message: stringType()
		}),
		supabase_execute_sql: objectType({
			type: enumType([
				"supabase_get_logs_result",
				"supabase_execute_sql_result",
				"supabase_apply_migration_result",
				"supabase_list_migration_result",
				"supabase_list_tables_result"
			]),
			message: stringType()
		}),
		supabase_apply_migration: objectType({
			type: enumType([
				"supabase_get_logs_result",
				"supabase_execute_sql_result",
				"supabase_apply_migration_result",
				"supabase_list_migration_result",
				"supabase_list_tables_result"
			]),
			message: stringType()
		}),
		supabase_list_migration: objectType({
			type: enumType([
				"supabase_get_logs_result",
				"supabase_execute_sql_result",
				"supabase_apply_migration_result",
				"supabase_list_migration_result",
				"supabase_list_tables_result"
			]),
			message: stringType()
		}),
		supabase_list_tables: objectType({
			type: enumType([
				"supabase_get_logs_result",
				"supabase_execute_sql_result",
				"supabase_apply_migration_result",
				"supabase_list_migration_result",
				"supabase_list_tables_result"
			]),
			message: stringType()
		}),
		cloud_studio_fetch_log: objectType({
			type: literalType("cloud_studio_fetch_log_result"),
			success: booleanType(),
			logs: recordType(stringType())
		}),
		cloud_studio_execute_command: objectType({
			type: literalType("cloud_studio_execute_command_result"),
			success: booleanType(),
			message: stringType()
		}),
		cloud_studio_deploy_sandbox: objectType({
			type: literalType("cloud_studio_integration_result"),
			previewUrl: stringType().optional(),
			steps: arrayType(objectType({
				status: enumType([
					"idle",
					"success",
					"running",
					"error"
				]),
				name: enumType([
					"createSandbox",
					"uploadProject",
					"installDependencies",
					"startService",
					"preview"
				]),
				error: objectType({
					code: numberType().optional(),
					message: stringType().optional()
				}).optional()
			}))
		}),
		web_fetch: objectType({
			type: literalType("web_fetch_tool_result"),
			message: stringType(),
			data: stringType(),
			loading: stringType().optional(),
			title: stringType().optional(),
			favicon: stringType().optional()
		}),
		use_skill: objectType({
			type: literalType("use_skill_tool_result"),
			commandMessage: stringType(),
			message: stringType()
		}),
		web_search: objectType({
			type: literalType("web_search_tool_result"),
			query: stringType().optional(),
			searchType: literalType("text2text").optional(),
			provider: stringType().optional(),
			results: arrayType(objectType({
				title: stringType(),
				url: stringType(),
				snippet: stringType().optional(),
				site: stringType().optional(),
				highlights: arrayType(stringType()).optional(),
				content: stringType().optional(),
				favicon: stringType().optional()
			})),
			images: arrayType(objectType({
				url: stringType(),
				description: stringType().optional(),
				sourceUrl: stringType().optional(),
				width: numberType().optional(),
				height: numberType().optional(),
				title: stringType().optional(),
				siteName: stringType().optional()
			})),
			totalResults: numberType().optional(),
			responseTimeMs: numberType().optional(),
			searchInput: stringType().optional()
		}),
		task: objectType({
			type: literalType("task_tool_result"),
			toolInfo: arrayType(objectType({
				name: stringType(),
				info: stringType(),
				needApprove: booleanType().optional(),
				toolCallId: stringType().optional(),
				executeStatus: enumType([
					"ing",
					"completed",
					"cancel",
					"fail"
				]).optional()
			})).optional(),
			startCallTool: booleanType().optional(),
			finalResult: stringType().optional(),
			toolCallBrief: stringType().optional()
		}),
		codebase_search: objectType({
			type: literalType("codebase_search_result"),
			query: stringType(),
			path: stringType(),
			content: stringType()
		}),
		lsp: objectType({
			type: literalType("lsp_tool_result"),
			operation: stringType(),
			result: stringType(),
			resultCount: numberType().optional(),
			fileCount: numberType().optional(),
			character: numberType().optional()
		}),
		spec_create: objectType({
			type: literalType("plan_create_tool_result"),
			message: stringType(),
			data: stringType()
		}),
		spec_update: objectType({
			type: literalType("plan_update_tool_result"),
			status: enumType([
				"prepare",
				"ready",
				"building",
				"finished"
			]),
			data: stringType(),
			reminder: stringType()
		})
	};
}));
//#endregion
//#region ../../packages/agent-provider/src/common/_legacy/MockAgentProvider.ts
var mockInitializeResponse, mockNewSessionResponse, mockSessionHistories, MockAgentProvider;
var init_MockAgentProvider = __esmMin((() => {
	init_tool_schemas();
	mockInitializeResponse = {
		protocolVersion: 1,
		agentCapabilities: {
			loadSession: true,
			promptCapabilities: {
				image: true,
				audio: false,
				embeddedContext: true
			},
			mcpCapabilities: {
				http: true,
				sse: true
			}
		}
	};
	mockNewSessionResponse = (sessionId) => ({ sessionId });
	mockSessionHistories = /* @__PURE__ */ new Map();
	mockSessionHistories.set("1", [
		{
			type: "user",
			content: "帮我开发一个五子棋游戏，需要包含以下功能：\n1. 双人对战模式\n2. 悔棋功能\n3. 计时器",
			timestamp: Date.now() - 18e5 - 6e4
		},
		{
			type: "assistant",
			content: "好的，我来帮你开发一个五子棋游戏。我会创建以下文件结构：\n\n- `index.html` - 主页面\n- `game.js` - 游戏逻辑\n- `style.css` - 样式文件\n\n让我开始创建这些文件...",
			timestamp: Date.now() - 18e5 - 5e4
		},
		{
			type: "assistant",
			content: "我已经完成了所有文件的创建和修改。游戏支持双人对战、悔棋和计时功能。你可以直接在浏览器中打开 index.html 开始游戏。",
			timestamp: Date.now() - 18e5
		}
	]);
	mockSessionHistories.set("2", [
		{
			type: "user",
			content: "登录页面的样式有问题，按钮颜色不对齐，帮我修复一下",
			timestamp: Date.now() - 72e5 - 12e4
		},
		{
			type: "assistant",
			content: "我来检查登录页面的样式。让我先看看相关的 CSS 文件...",
			timestamp: Date.now() - 72e5 - 1e5
		},
		{
			type: "assistant",
			content: "样式问题已修复，请查看效果。主要修改了按钮的 flex 布局和颜色变量。",
			timestamp: Date.now() - 72e5
		}
	]);
	mockSessionHistories.set("3", [
		{
			type: "user",
			content: "API 接口响应太慢了，需要添加缓存和错误重试机制",
			timestamp: Date.now() - 144e5 - 18e4
		},
		{
			type: "assistant",
			content: "好的，我来优化 API 接口。我会实现：\n1. Redis 缓存层\n2. 指数退避重试策略\n3. 请求去重",
			timestamp: Date.now() - 144e5 - 15e4
		},
		{
			type: "assistant",
			content: "已添加缓存和错误重试机制。性能提升了约 60%。",
			timestamp: Date.now() - 144e5
		}
	]);
	mockSessionHistories.set("4", [
		{
			type: "user",
			content: "帮我为核心模块添加单元测试，覆盖率要达到 80% 以上",
			timestamp: Date.now() - 864e5 - 3e5
		},
		{
			type: "assistant",
			content: "好的，我会使用 Jest 来编写单元测试。让我先看看核心模块的代码结构...",
			timestamp: Date.now() - 864e5 - 25e4
		},
		{
			type: "assistant",
			content: "测试覆盖率已达到 85%，超过了目标。主要测试了：\n- 用户认证逻辑\n- 数据验证\n- 错误处理",
			timestamp: Date.now() - 864e5
		}
	]);
	MockAgentProvider = class {
		constructor(config = {}) {
			this.sessionUpdateCallbacks = /* @__PURE__ */ new Set();
			this.permissionRequestResolvers = /* @__PURE__ */ new Map();
			this.errorCallbacks = /* @__PURE__ */ new Set();
			this.activeConnections = /* @__PURE__ */ new Map();
			this.pendingPermissionResolvers = /* @__PURE__ */ new Map();
			this.initializedSessions = /* @__PURE__ */ new Map();
			this.currentSessionUpdates = /* @__PURE__ */ new Map();
			console.log("[MockAgentProvider] Initialized");
			this.initializeMockSessions();
		}
		setSessionMode(params) {
			throw new Error("Method not implemented.");
		}
		setSessionModel(params) {
			throw new Error("Method not implemented.");
		}
		extMethod(method, params) {
			throw new Error("Method not implemented.");
		}
		extNotification(method, params) {
			throw new Error("Method not implemented.");
		}
		/**
		* 初始化默认的 Mock session 数据
		*/
		initializeMockSessions() {
			const mockSessions = [
				{
					sessionId: "1",
					cwd: "/Users/example/Project",
					mcpServers: [],
					createdAt: Date.now() - 36e5
				},
				{
					sessionId: "2",
					cwd: "/Users/example/Project",
					mcpServers: [],
					createdAt: Date.now() - 72e5
				},
				{
					sessionId: "3",
					cwd: "/Users/example/Project",
					mcpServers: [],
					createdAt: Date.now() - 864e5
				}
			];
			mockSessions.forEach((session) => {
				this.initializedSessions.set(session.sessionId, {
					cwd: session.cwd,
					mcpServers: session.mcpServers,
					createdAt: session.createdAt
				});
			});
			console.log("[MockAgentProvider] Initialized mock sessions:", mockSessions.length);
		}
		/**
		* 从 PromptRequest 中提取文本内容
		* Provider 自己决定如何处理 ContentBlock 数组
		*/
		extractTextFromRequest(request) {
			if (request.prompt && Array.isArray(request.prompt)) return request.prompt.filter((block) => block.type === "text").map((block) => "text" in block ? block.text : "").join("\n");
			return "";
		}
		/**
		* 发送消息 - 直接使用 Mock 数据
		* 接收 PromptRequest,由 Provider 决定如何处理
		*/
		async sendMessage(request) {
			const content = this.extractTextFromRequest(request);
			const sessionId = request.sessionId;
			console.log("[MockAgentProvider] Sending mock message:", {
				sessionId,
				content
			});
			try {
				await this.sendMockMessage(sessionId, content);
			} catch (error) {
				console.error("[MockAgentProvider] Send message failed:", error);
				this.emitEvent({
					type: "error",
					sessionId,
					timestamp: Date.now(),
					data: { error: error instanceof Error ? error.message : "Unknown error" }
				});
				throw error;
			}
		}
		/**
		* 使用 Mock 数据模拟流式响应
		*/
		async sendMockMessage(sessionId, content) {
			console.log("[MockAgentProvider] Using mock data for:", content);
			this.currentSessionUpdates.set(sessionId, []);
			this.emitEvent({
				type: "connected",
				sessionId,
				timestamp: Date.now()
			});
			await this.delay(300);
			const messageId1 = `m-text-${Date.now()}`;
			const textReply = `我收到了你发送的「${content}」信息,这是符合 ACP 协议的 mock 数据。\n\n下面演示不同类型的 ContentBlock:\n\n`;
			await this.streamMockTextContent(sessionId, messageId1, textReply);
			await this.delay(500);
			const messageId2 = `m-resource-${Date.now()}`;
			await this.sendMockEmbeddedResource(sessionId, messageId2);
			await this.delay(500);
			const messageId3 = `m-link-${Date.now()}`;
			await this.sendMockResourceLink(sessionId, messageId3);
			await this.delay(500);
			const toolMessageId = `m-tool-${Date.now()}`;
			await this.sendMockEditContentToolCallFlow(sessionId, toolMessageId);
			await this.delay(500);
			const diffToolMessageId = `m-tool-d-${Date.now()}`;
			await this.sendMockEditDiffToolCallFlow(sessionId, diffToolMessageId);
			await this.delay(500);
			const readToolMessageId = `m-tool-r-${Date.now()}`;
			await this.sendMockReadContentToolCallFlow(sessionId, readToolMessageId);
			await this.delay(300);
			const searchContentMessageId = `m-tool-sc-${Date.now()}`;
			await this.sendMockSearchContentToolCallFlow(sessionId, searchContentMessageId);
			await this.delay(500);
			const searchFileMessageId = `m-tool-sf-${Date.now()}`;
			await this.sendMockSearchFileToolCallFlow(sessionId, searchFileMessageId);
			await this.delay(500);
			const listFilesMessageId = `m-tool-lf-${Date.now()}`;
			await this.sendMockListFilesToolCallFlow(sessionId, listFilesMessageId);
			await this.delay(500);
			const askFollowupMessageId = `m-tool-afq-${Date.now()}`;
			await this.sendMockAskFollowupQuestionToolCallFlow(sessionId, askFollowupMessageId);
			await this.delay(500);
			const deleteFileMessageId = `m-tool-df-${Date.now()}`;
			await this.sendMockDeleteFileToolCallFlow(sessionId, deleteFileMessageId);
			await this.delay(300);
			const executeCommandMessageId = `m-tool-ec-${Date.now()}`;
			await this.sendMockExecuteCommandToolCallFlow(sessionId, executeCommandMessageId);
			await this.delay(300);
			const executeCommandApprovalMessageId = `m-tool-ec-approval-${Date.now()}`;
			await this.sendMockExecuteCommandWithApprovalToolCallFlow(sessionId, executeCommandApprovalMessageId);
			await this.delay(300);
			const writeFileApprovalMessageId = `m-tool-wtf-approval-${Date.now()}`;
			await this.sendMockWriteFileWithApprovalToolCallFlow(sessionId, writeFileApprovalMessageId);
			await this.delay(300);
			const previewUrlMessageId = `m-tool-pu-${Date.now()}`;
			await this.sendMockPreviewUrlToolCallFlow(sessionId, previewUrlMessageId);
			await this.delay(300);
			const listCodeDefMessageId = `m-tool-lcd-${Date.now()}`;
			await this.sendMockListCodeDefinitionNamesToolCallFlow(sessionId, listCodeDefMessageId);
			await this.delay(300);
			const webFetchMessageId = `m-tool-wf-${Date.now()}`;
			await this.sendMockWebFetchToolCallFlow(sessionId, webFetchMessageId);
			await this.delay(300);
			const readLintsMessageId = `m-tool-rl-${Date.now()}`;
			await this.sendMockReadLintsToolCallFlow(sessionId, readLintsMessageId);
			await this.delay(300);
			const webSearchMessageId = `m-tool-ws-${Date.now()}`;
			await this.sendMockWebSearchToolCallFlow(sessionId, webSearchMessageId);
			await this.delay(300);
			this.emitEvent({
				type: "done",
				sessionId,
				timestamp: Date.now()
			});
		}
		/**
		* 流式发送 Mock 文本消息内容 (符合 ACP 协议的 agent_message_chunk)
		*/
		async streamMockTextContent(sessionId, messageId, content) {
			const chunkSize = 10;
			for (let i = 0; i < content.length; i += chunkSize) {
				const chunk = content.substring(i, i + chunkSize);
				console.log(`Text Chunk: "${chunk}" | messageId: ${messageId} | sessionId: ${sessionId}`);
				this.emitEvent({
					type: "session_update",
					sessionId,
					messageId,
					timestamp: Date.now(),
					notification: {
						sessionId,
						update: {
							sessionUpdate: "agent_message_chunk",
							content: {
								type: "text",
								text: chunk
							}
						}
					}
				});
				await this.delay(50);
			}
		}
		/**
		* 延迟函数
		*/
		delay(ms) {
			return new Promise((resolve) => setTimeout(resolve, ms));
		}
		/**
		* 取消消息 (Mock 模式下直接完成)
		* @deprecated 使用 cancel 代替
		*/
		async cancelMessage(sessionId) {
			console.log("[MockAgentProvider] Message cancelled:", sessionId);
			this.emitEvent({
				type: "done",
				sessionId,
				timestamp: Date.now()
			});
		}
		/**
		* ACP 协议: prompt - 发送用户消息
		*
		* Mock 实现: 复用 sendMessage
		*/
		async prompt(request) {
			console.log("[MockAgentProvider] prompt called:", request);
			await this.sendMessage(request);
			return { stopReason: "end_turn" };
		}
		/**
		* ACP 协议: cancel - 取消消息
		*
		* Mock 实现: 复用 cancelMessage
		*/
		async cancel(params) {
			console.log("[MockAgentProvider] cancel called:", params);
			return this.cancelMessage(params.sessionId);
		}
		/**
		* 监听会话更新事件（ACP 协议原生）
		*/
		onSessionUpdate(callback) {
			this.sessionUpdateCallbacks.add(callback);
			return () => {
				this.sessionUpdateCallbacks.delete(callback);
			};
		}
		/**
		* 监听权限请求事件（ACP 协议原生）
		*/
		onRequestPermission(callback) {
			this.permissionRequestResolvers.set("__global__", callback);
			return () => {
				this.permissionRequestResolvers.delete("__global__");
			};
		}
		/**
		* 监听错误事件（扩展事件，非 ACP 标准协议）
		*/
		onError(callback) {
			this.errorCallbacks.add(callback);
			return () => {
				this.errorCallbacks.delete(callback);
			};
		}
		/**
		* 触发会话更新事件（内部辅助方法）
		*/
		emitSessionUpdate(params) {
			console.log("[MockAgentProvider] Emitting session update:", params, "to", this.sessionUpdateCallbacks.size, "callbacks");
			this.sessionUpdateCallbacks.forEach((callback) => {
				try {
					callback(params);
				} catch (error) {
					console.error("[MockAgentProvider] Session update callback error:", error);
				}
			});
		}
		/**
		* 触发错误事件（内部辅助方法）
		*/
		emitError(error, sessionId) {
			console.log("[MockAgentProvider] Emitting error:", error, "for session:", sessionId);
			this.errorCallbacks.forEach((callback) => {
				try {
					callback(error, sessionId);
				} catch (err) {
					console.error("[MockAgentProvider] Error callback error:", err);
				}
			});
		}
		/**
		* 向后兼容的 emitEvent 方法
		* 将旧的事件格式桥接到新的 ACP 原生事件
		*/
		emitEvent(event) {
			if (event.type === "error") {
				const error = event.data?.error ? new Error(event.data.error) : /* @__PURE__ */ new Error("Unknown error");
				this.emitError(error, event.sessionId);
			} else if (event.type === "session_update" && event.notification) {
				const params = {
					notification: event.notification,
					messageId: event.messageId
				};
				this.emitSessionUpdate(params);
			} else if (event.type === "connected" || event.type === "done") console.log("[MockAgentProvider] Ignoring deprecated event type:", event.type);
			else console.warn("[MockAgentProvider] Unknown event type:", event.type);
		}
		/**
		* ACP 协议: initialize - 初始化连接
		*
		* Mock 实现: 返回预设的初始化响应
		*/
		async initialize(request) {
			console.log("[MockAgentProvider] initialize", request);
			await this.delay(100);
			return mockInitializeResponse;
		}
		/**
		* ACP 协议: authenticate - 身份验证
		*
		* Mock 实现: 直接返回成功
		*/
		async authenticate(request) {
			console.log("[MockAgentProvider] authenticate", request);
		}
		/**
		* ACP 协议: newSession - 创建新会话
		*
		* Mock 实现: 生成唯一的 sessionId 并存储会话信息
		*/
		async newSession(request) {
			console.log("[MockAgentProvider] session/new", request);
			await this.delay(100);
			const sessionId = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
			this.initializedSessions.set(sessionId, {
				cwd: request.cwd,
				mcpServers: request.mcpServers || [],
				createdAt: Date.now()
			});
			console.log("[MockAgentProvider] Created session:", sessionId, "with config:", {
				cwd: request.cwd,
				mcpServers: request.mcpServers
			});
			return mockNewSessionResponse(sessionId);
		}
		/**
		* ACP 协议: session/load - 加载已有会话
		*
		* Mock 实现: 流式回放会话历史（完整的事件回放）
		*/
		async loadSession(request) {
			console.log("[MockAgentProvider] session/load", request);
			const { sessionId, cwd, mcpServers } = request;
			this.initializedSessions.set(sessionId, {
				cwd,
				mcpServers: mcpServers || [],
				createdAt: Date.now()
			});
			const history = mockSessionHistories.get(sessionId);
			if (history && history.length > 0) {
				console.log("[MockAgentProvider] Loading session from mockSessionHistories:", sessionId, "with", history.length, "entries");
				for (let i = 0; i < history.length; i++) {
					const message = history[i];
					if (message.type === "assistant" && message.content && message.content.startsWith("[")) try {
						const events = JSON.parse(message.content);
						console.log("[MockAgentProvider] Replaying events from history:", {
							index: i,
							eventCount: events.length
						});
						for (const event of events) {
							await this.delay(20);
							this.emitEvent(event);
						}
					} catch (error) {
						console.error("[MockAgentProvider] Failed to parse events from history:", error);
					}
					else {
						const messageId = `load-${sessionId}-${i}-${Date.now()}`;
						const sessionUpdateType = message.type === "user" ? "user_message_chunk" : "agent_message_chunk";
						await this.delay(50);
						this.emitEvent({
							type: "session_update",
							sessionId,
							messageId,
							timestamp: message.timestamp,
							notification: {
								sessionId,
								update: {
									sessionUpdate: sessionUpdateType,
									content: {
										type: "text",
										text: message.content
									}
								}
							}
						});
					}
				}
				console.log("[MockAgentProvider] Session loaded from mockSessionHistories:", sessionId);
				return {};
			}
			console.log("[MockAgentProvider] No history found for session:", sessionId);
			return {};
		}
		/**
		* ACP 协议: session/request_permission - 请求用户权限
		*
		* Agent 调用此方法来请求用户批准工具调用。
		* 此方法会：
		* 1. 发送 request_permission 事件给 UI
		* 2. 阻塞等待用户响应
		* 3. 返回用户的决策结果
		*
		* @param sessionId ACP 会话 ID
		* @param toolCallId 工具调用 ID
		* @param toolCall 工具调用信息
		* @param options 可用的权限选项
		* @returns 用户的决策结果
		*/
		async requestPermission(sessionId, toolCallId, toolCall, options) {
			console.log("[MockAgentProvider] requestPermission called:", {
				sessionId,
				toolCallId,
				toolCall,
				options
			});
			this.emitEvent({
				type: "request_permission",
				sessionId,
				messageId: `permission-${toolCallId}`,
				timestamp: Date.now(),
				data: {
					sessionId,
					toolCall,
					options
				}
			});
			const permissionOutcome = await new Promise((resolve) => {
				this.pendingPermissionResolvers.set(toolCallId, resolve);
				setTimeout(() => {
					if (this.pendingPermissionResolvers.has(toolCallId)) {
						this.pendingPermissionResolvers.delete(toolCallId);
						console.log("[MockAgentProvider] Permission request timed out:", toolCallId);
						resolve({
							outcome: "cancelled",
							optionId: "reject-once",
							timedOut: true
						});
					}
				}, 6e4);
			});
			console.log("[MockAgentProvider] Permission outcome:", permissionOutcome);
			return permissionOutcome;
		}
		/**
		* 直接释放权限请求的 await（更直接的方法）
		*
		* 这个方法直接从 pendingPermissionResolvers 中获取 resolver 并调用，
		* 不需要经过 respondToPermissionRequest 的中转。
		*
		* @param toolCallId 工具调用 ID
		* @param outcome 用户的决策结果
		*/
		releasePermissionRequest(toolCallId, outcome) {
			console.log("[MockAgentProvider] releasePermissionRequest called:", {
				toolCallId,
				outcome
			});
			const resolver = this.pendingPermissionResolvers.get(toolCallId);
			if (resolver) {
				resolver({
					...outcome,
					timedOut: false
				});
				this.pendingPermissionResolvers.delete(toolCallId);
				console.log("[MockAgentProvider] Permission request released:", toolCallId);
			} else console.warn("[MockAgentProvider] No pending permission request found for:", toolCallId);
		}
		/**
		* 响应用户的权限决策（兼容旧接口）
		*
		* 这个方法内部调用 releasePermissionRequest。
		* 保留这个方法是为了向后兼容和符合 ACP 协议的命名规范。
		*
		* @param sessionId ACP 会话 ID（未使用，保留以符合接口）
		* @param payload 权限响应数据
		*/
		async respondToPermissionRequest(sessionId, payload) {
			console.log("[MockAgentProvider] respondToPermissionRequest called:", payload);
			this.releasePermissionRequest(payload.toolCallId, payload.outcome);
		}
		/**
		* 销毁 Provider
		*/
		destroy() {
			this.activeConnections.clear();
			this.pendingPermissionResolvers.clear();
			this.permissionRequestResolvers.clear();
			this.initializedSessions.clear();
			this.sessionUpdateCallbacks.clear();
			this.errorCallbacks.clear();
			this.currentSessionUpdates.clear();
			console.log("[MockAgentProvider] Destroyed");
		}
		/**
		* 获取所有已初始化的会话列表（扩展方法，非 ACP 标准协议）
		* 返回 sessionId 及其配置信息和标题
		*/
		getAllSessions() {
			const mockTitles = {
				"1": "开发五子棋游戏",
				"2": "修复登录页面样式",
				"3": "API 接口优化"
			};
			const sessions = Array.from(this.initializedSessions.entries()).map(([sessionId, config]) => ({
				sessionId,
				title: mockTitles[sessionId] || `Session ${sessionId}`,
				...config
			}));
			console.log("[MockAgentProvider] Getting all sessions:", sessions.length);
			return sessions;
		}
		/**
		* 发送嵌入资源消息 (符合 ACP 协议)
		*/
		async sendMockEmbeddedResource(sessionId, messageId) {
			console.log(`📎 Sending embedded resource: ${messageId}`);
			this.emitEvent({
				type: "session_update",
				sessionId,
				messageId: `${messageId}-intro`,
				timestamp: Date.now(),
				notification: {
					sessionId,
					update: {
						sessionUpdate: "agent_message_chunk",
						content: {
							type: "text",
							text: "这是一个嵌入的 Python 文件示例:\n\n"
						}
					}
				}
			});
			await this.delay(200);
			this.emitEvent({
				type: "session_update",
				sessionId,
				messageId: `${messageId}-resource`,
				timestamp: Date.now(),
				notification: {
					sessionId,
					update: {
						sessionUpdate: "agent_message_chunk",
						content: {
							type: "resource",
							resource: {
								uri: "file:///mock/example.py",
								mimeType: "text/x-python",
								text: "def hello_world():\n    print(\"Hello, World!\")\n    return \"success\"\n\nif __name__ == \"__main__\":\n    hello_world()"
							}
						}
					}
				}
			});
			await this.delay(200);
			this.emitEvent({
				type: "session_update",
				sessionId,
				messageId: `${messageId}-conclusion`,
				timestamp: Date.now(),
				notification: {
					sessionId,
					update: {
						sessionUpdate: "agent_message_chunk",
						content: {
							type: "text",
							text: "\n\n以上是直接嵌入的文件内容，无需额外请求即可显示。"
						}
					}
				}
			});
			await this.delay(100);
		}
		/**
		* 发送资源链接消息 (符合 ACP 协议)
		*/
		async sendMockResourceLink(sessionId, messageId) {
			console.log(`🔗 Sending resource link: ${messageId}`);
			this.emitEvent({
				type: "session_update",
				sessionId,
				messageId: `${messageId}-intro`,
				timestamp: Date.now(),
				notification: {
					sessionId,
					update: {
						sessionUpdate: "agent_message_chunk",
						content: {
							type: "text",
							text: "这是一个指向外部文档的资源链接:\n\n"
						}
					}
				}
			});
			await this.delay(200);
			this.emitEvent({
				type: "session_update",
				sessionId,
				messageId: `${messageId}-link`,
				timestamp: Date.now(),
				notification: {
					sessionId,
					update: {
						sessionUpdate: "agent_message_chunk",
						content: {
							type: "resource_link",
							uri: "https://agentclientprotocol.com/protocol/content",
							name: "ACP Content Protocol",
							mimeType: "text/html",
							description: "Agent Client Protocol - Content specification",
							size: 256e3
						}
					}
				}
			});
			await this.delay(200);
			this.emitEvent({
				type: "session_update",
				sessionId,
				messageId: `${messageId}-conclusion`,
				timestamp: Date.now(),
				notification: {
					sessionId,
					update: {
						sessionUpdate: "agent_message_chunk",
						content: {
							type: "text",
							text: "\n\n点击上面的链接可以访问完整的协议文档。"
						}
					}
				}
			});
			await this.delay(100);
		}
		/**
		* 发送完整的工具调用流程 (符合 ACP 协议)
		*/
		async sendMockEditDiffToolCallFlow(sessionId, messageId) {
			console.log(`🔧 Starting tool call flow: ${messageId}`);
			const toolCallId = `tool-${Date.now()}`;
			this.emitEvent({
				type: "session_update",
				sessionId,
				messageId,
				timestamp: Date.now(),
				notification: {
					sessionId,
					update: {
						sessionUpdate: "tool_call",
						toolCallId,
						title: "Write File",
						kind: "edit",
						status: "pending",
						locations: [{
							path: "example.py",
							line: 0
						}]
					}
				}
			});
			await this.delay(100);
			const content = "def hello_world():\n    print(\"Hello from ACP tool call!\")\n    return \"success\"\n\nif __name__ == \"__main__\":\n    hello_world()";
			const chunkSize = 10;
			for (let i = 0; i < 124; i += chunkSize) {
				const chunk = content.substring(i, i + chunkSize);
				console.log(`🐸 tool call Chunk: "${chunk}" | messageId: ${messageId} | sessionId: ${sessionId}`);
				this.emitEvent({
					type: "session_update",
					sessionId,
					messageId,
					timestamp: Date.now(),
					notification: {
						sessionId,
						update: {
							sessionUpdate: "tool_call_update",
							toolCallId,
							status: "in_progress",
							content: [{
								type: "diff",
								path: "example.py",
								oldText: "",
								newText: chunk
							}],
							locations: [{
								path: "example.py",
								line: 0
							}]
						}
					}
				});
				await this.delay(50);
			}
			await this.delay(1200);
			this.emitEvent({
				type: "session_update",
				sessionId,
				messageId,
				timestamp: Date.now(),
				notification: {
					sessionId,
					update: {
						sessionUpdate: "tool_call_update",
						toolCallId,
						status: "completed",
						content: [{
							type: "diff",
							path: "example.py",
							oldText: "def 213",
							newText: "def hello_world():\n    print(\"Hello from ACP tool call!\")\n    return \"success\"\n\nif __name__ == \"__main__\":\n    hello_world()"
						}],
						locations: [{
							path: "example.py",
							line: 0
						}]
					}
				}
			});
			await this.delay(300);
			this.emitEvent({
				type: "session_update",
				sessionId,
				messageId: `${messageId}-summary`,
				timestamp: Date.now(),
				notification: {
					sessionId,
					update: {
						sessionUpdate: "agent_message_chunk",
						content: {
							type: "text",
							text: "✅ 工具调用完成！我成功创建了一个名为 `example.py` 的文件。\n\nACP 协议工具调用流程：\n1. `tool_call` (pending) - 创建工具调用\n2. `tool_call_update` (in_progress) - 开始执行\n3. `tool_call_update` (completed) - 执行完成\n\n这就是完整的工具调用生命周期！"
						}
					}
				}
			});
			await this.delay(100);
			this.emitEvent({
				type: "session_update",
				sessionId,
				messageId: `${messageId}-summary`,
				timestamp: Date.now(),
				notification: {
					sessionId,
					update: {
						sessionUpdate: "agent_message_chunk",
						content: {
							type: "text",
							text: "✅ 工具调用完成！我成功创建了一个名为 `example.py` 的文件。\n\n工具调用流程包括：\n1. 发送工具调用请求 (tool_call)\n2. 返回执行结果 (tool_call_update)\n\n这就是 ACP 协议中完整的工具调用生命周期。"
						}
					}
				}
			});
			await this.delay(100);
		}
		async sendMockEditContentToolCallFlow(sessionId, messageId) {
			console.log(`🔧 Starting tool call flow: ${messageId}`);
			const toolCallId = `tool-${Date.now()}`;
			this.emitEvent({
				type: "session_update",
				sessionId,
				messageId,
				timestamp: Date.now(),
				notification: {
					sessionId,
					_meta: { "codebuddy.ai": { toolName: "write_to_file" } },
					update: {
						sessionUpdate: "tool_call",
						toolCallId,
						title: "Write File",
						kind: "edit",
						status: "pending",
						locations: [{
							path: "example-edit-content.py",
							line: 0
						}]
					}
				}
			});
			await this.delay(100);
			const content = "def hello_world():\n    print(\"Hello from ACP tool call!\")\n    return \"success\"\n\nif __name__ == \"__main__\":\n    hello_world()";
			const chunkSize = 10;
			let accumulatedInput = "";
			for (let i = 0; i < 124; i += chunkSize) {
				const chunk = content.substring(i, i + chunkSize);
				accumulatedInput += chunk;
				console.log(`🐸 tool call Chunk: "${chunk}" | messageId: ${messageId} | sessionId: ${sessionId}`);
				this.emitEvent({
					type: "session_update",
					sessionId,
					messageId,
					timestamp: Date.now(),
					notification: {
						sessionId,
						_meta: { "codebuddy.ai": { toolName: "write_to_file" } },
						update: {
							sessionUpdate: "tool_call_update",
							toolCallId,
							status: "in_progress",
							content: [{
								type: "content",
								content: {
									type: "text",
									text: accumulatedInput
								}
							}],
							rawInput: {
								"filePath": "example-edit-content.py",
								"content": accumulatedInput
							},
							locations: [{
								path: "example-edit-content.py",
								line: 0
							}]
						}
					}
				});
				await this.delay(50);
			}
			await this.delay(1200);
			this.emitEvent({
				type: "session_update",
				sessionId,
				messageId,
				timestamp: Date.now(),
				notification: {
					sessionId,
					_meta: { "codebuddy.ai": { toolName: "write_to_file" } },
					update: {
						sessionUpdate: "tool_call_update",
						toolCallId,
						status: "completed",
						content: [{
							type: "content",
							content: {
								type: "text",
								text: content
							}
						}],
						rawOutput: {
							"type": "write_to_file_result",
							"path": "example-edit-content.py",
							"addLineCount": 10,
							"removedLines": 20
						},
						locations: [{
							path: "example-edit-content.py",
							line: 0
						}]
					}
				}
			});
			await this.delay(300);
			this.emitEvent({
				type: "session_update",
				sessionId,
				messageId: `${messageId}-summary`,
				timestamp: Date.now(),
				notification: {
					sessionId,
					_meta: { "codebuddy.ai": { toolName: "write_to_file" } },
					update: {
						sessionUpdate: "agent_message_chunk",
						content: {
							type: "text",
							text: "✅ 工具调用完成！我成功创建了一个名为 `example.py` 的文件。\n\nACP 协议工具调用流程：\n1. `tool_call` (pending) - 创建工具调用\n2. `tool_call_update` (in_progress) - 开始执行\n3. `tool_call_update` (completed) - 执行完成\n\n这就是完整的工具调用生命周期！"
						}
					},
					rawInput: {
						"filePath": "example-edit-content.py",
						"content": accumulatedInput
					}
				}
			});
			await this.delay(100);
			this.emitEvent({
				type: "session_update",
				sessionId,
				messageId: `${messageId}-summary`,
				timestamp: Date.now(),
				notification: {
					sessionId,
					update: {
						sessionUpdate: "agent_message_chunk",
						content: {
							type: "text",
							text: "✅ 工具调用完成！我成功创建了一个名为 `example.py` 的文件。\n\n工具调用流程包括：\n1. 发送工具调用请求 (tool_call)\n2. 返回执行结果 (tool_call_update)\n\n这就是 ACP 协议中完整的工具调用生命周期。"
						}
					}
				}
			});
			await this.delay(100);
		}
		/**
		* 发送完整的工具调用流程 - kind 为 read (符合 ACP 协议)
		*
		* 模拟 read_file 工具调用流程，流式发送 rawInput 和 rawOutput
		*/
		async sendMockReadContentToolCallFlow(sessionId, messageId) {
			console.log(`📖 Starting read tool call flow: ${messageId}`);
			const filePath = "/Users/liumingyuan/Project/caseTest/subagent/test.js";
			const toolCallId = `tool-${Date.now()}`;
			this.emitEvent({
				type: "session_update",
				sessionId,
				messageId,
				timestamp: Date.now(),
				notification: {
					sessionId,
					_meta: { "codebuddy.ai": { toolName: "read_file" } },
					update: {
						sessionUpdate: "tool_call",
						toolCallId,
						title: "Read File",
						status: "pending",
						locations: [{
							path: filePath,
							line: 0
						}]
					}
				}
			});
			console.log("[MockAgentProvider] tool_call (pending) sent");
			await this.delay(100);
			const filePathChunks = [
				"/Users/liumingyuan/",
				"Project/caseTest",
				"/subagent/",
				"test.js"
			];
			let accumulatedInput = "";
			for (const chunk of filePathChunks) {
				accumulatedInput += chunk;
				try {
					this.emitEvent({
						type: "session_update",
						sessionId,
						messageId,
						timestamp: Date.now(),
						notification: {
							sessionId,
							_meta: { "codebuddy.ai": { toolName: "read_file" } },
							update: {
								sessionUpdate: "tool_call_update",
								toolCallId,
								status: "in_progress",
								rawInput: { filePath: accumulatedInput }
							}
						}
					});
					await this.delay(100);
					console.log("[MockAgentProvider] tool_call_update with rawInput:", chunk);
				} catch {}
			}
			const fileContent = `/**
 * Test file for subagent functionality
 */

function helloWorld() {
    console.log('Hello from test.js!');
    return 'success';
}

class TestClass {
    constructor(name) {
        this.name = name;
    }

    greet() {
        return \`Hello, \${this.name}!\`;
    }
}

// Export functions
module.exports = {
    helloWorld,
    TestClass
};
`;
			const totalLineCount = 26;
			const chunkSize = 20;
			let accumulatedContent = "";
			for (let i = 0; i < fileContent.length; i += chunkSize) {
				const chunk = fileContent.substring(i, i + chunkSize);
				accumulatedContent += chunk;
				const progress = Math.round((i + chunkSize) / fileContent.length * 100);
				const isLastChunk = i + chunkSize >= fileContent.length;
				const rawOutput = {
					type: "read_file_result",
					path: filePath,
					content: accumulatedContent,
					totalLineCount,
					hasMore: !isLastChunk,
					hint: `Reading file... ${Math.min(progress, 100)}% complete`
				};
				const outputValidation = validateToolOutput("read_file", rawOutput);
				this.emitEvent({
					type: "session_update",
					sessionId,
					messageId,
					timestamp: Date.now(),
					notification: {
						sessionId,
						_meta: { "codebuddy.ai": { toolName: "read_file" } },
						update: {
							sessionUpdate: "tool_call_update",
							toolCallId,
							status: "in_progress",
							content: [{
								type: "content",
								content: {
									type: "text",
									text: accumulatedContent
								}
							}],
							locations: [{
								path: filePath,
								line: 0
							}],
							rawOutput: outputValidation.success ? outputValidation.data : rawOutput
						}
					}
				});
				console.log(`📖 Read chunk ${i / chunkSize + 1}: progress ${progress}%`);
				await this.delay(30);
			}
			const finalOutputValidation = validateToolOutput("read_file", {
				type: "read_file_result",
				path: filePath,
				content: fileContent,
				totalLineCount,
				hasMore: false
			});
			if (!finalOutputValidation.success) throw new Error(`Invalid rawOutput: ${JSON.stringify(finalOutputValidation.error.errors)}`);
			this.emitEvent({
				type: "session_update",
				sessionId,
				messageId,
				timestamp: Date.now(),
				notification: {
					sessionId,
					update: {
						sessionUpdate: "tool_call_update",
						toolCallId,
						status: "completed",
						content: [{
							type: "content",
							content: {
								type: "text",
								text: fileContent
							}
						}],
						locations: [{
							path: filePath,
							line: 0
						}],
						rawOutput: finalOutputValidation.data
					}
				}
			});
			console.log("[MockAgentProvider] tool_call_update (completed) sent");
		}
		/**
		* 发送 search_content 工具调用流程 (符合 ACP 协议)
		*
		* 用于模拟在文件内容中搜索特定文本的工具调用
		* 支持显示匹配的文件路径、行号和上下文内容
		*/
		async sendMockSearchContentToolCallFlow(sessionId, messageId) {
			console.log(`🔍 Starting search_content tool call flow: ${messageId}`);
			const pattern = "一行工具";
			const directory = "/Users/liumingyuan/Project/caseTest/subagent";
			const toolCallId = `tool-sc-${Date.now()}`;
			this.emitEvent({
				type: "session_update",
				sessionId,
				messageId,
				timestamp: Date.now(),
				notification: {
					sessionId,
					_meta: { "codebuddy.ai": { toolName: "search_content" } },
					update: {
						sessionUpdate: "tool_call",
						toolCallId,
						title: "Search Content",
						kind: "search",
						status: "pending",
						locations: [{
							path: directory,
							line: 0
						}],
						rawInput: {
							pattern,
							path: directory
						}
					}
				}
			});
			await this.delay(100);
			this.emitEvent({
				type: "session_update",
				sessionId,
				messageId,
				timestamp: Date.now(),
				notification: {
					sessionId,
					update: {
						sessionUpdate: "tool_call_update",
						toolCallId,
						status: "in_progress",
						content: [{
							type: "content",
							content: {
								type: "text",
								text: `Searching for "${pattern}" in ${directory}...`
							}
						}],
						locations: [{
							path: directory,
							line: 0
						}]
					}
				}
			});
			await this.delay(500);
			this.emitEvent({
				type: "session_update",
				sessionId,
				messageId,
				timestamp: Date.now(),
				notification: {
					sessionId,
					update: {
						sessionUpdate: "tool_call_update",
						toolCallId,
						status: "completed",
						content: [{
							type: "content",
							content: {
								type: "text",
								text: "Found 1 matching result\n\nconvert_to_oneline.py\n    56|        print(\"文件内容转一行工具\")\n"
							}
						}],
						locations: [{
							path: directory,
							line: 0
						}],
						rawOutput: {
							pattern,
							path: directory,
							matches: [{
								filePath: "convert_to_oneline.py",
								fileName: "convert_to_oneline.py",
								content: "        print(\"文件内容转一行工具\")",
								startLine: 56,
								endLine: 56
							}],
							totalCount: 1,
							hasMore: false
						}
					}
				}
			});
			await this.delay(300);
			this.emitEvent({
				type: "session_update",
				sessionId,
				messageId: `${messageId}-summary`,
				timestamp: Date.now(),
				notification: {
					sessionId,
					update: {
						sessionUpdate: "agent_message_chunk",
						content: {
							type: "text",
							text: `✅ 内容搜索完成！在 \`${directory}\` 目录中找到 1 个匹配结果。\n\n**搜索结果：**\n- \`convert_to_oneline.py\` 第 56 行: \`print("文件内容转一行工具")\`\n\n**工具调用流程：**\n1. \`tool_call\` (pending) - 创建搜索工具调用\n2. \`tool_call_update\` (in_progress) - 执行搜索\n3. \`tool_call_update\` (completed) - 返回匹配结果`
						}
					}
				}
			});
			await this.delay(100);
		}
		/**
		* 发送 search_file 工具调用流程 (符合 ACP 协议)
		*
		* 用于模拟按文件名模式搜索文件的工具调用
		* 支持递归搜索和文件大小显示
		*/
		async sendMockSearchFileToolCallFlow(sessionId, messageId) {
			console.log(`🔍 Starting search_file tool call flow: ${messageId}`);
			const pattern = "*.py";
			const directory = "/Users/liumingyuan/Project/caseTest/subagent";
			const toolCallId = `tool-sf-${Date.now()}`;
			this.emitEvent({
				type: "session_update",
				sessionId,
				messageId,
				timestamp: Date.now(),
				notification: {
					sessionId,
					_meta: { "codebuddy.ai": { toolName: "search_file" } },
					update: {
						sessionUpdate: "tool_call",
						toolCallId,
						title: "Search File",
						kind: "search",
						status: "pending",
						locations: [{
							path: directory,
							line: 0
						}],
						rawInput: {
							target_directory: directory,
							pattern,
							recursive: true,
							caseSensitive: false
						}
					}
				}
			});
			await this.delay(100);
			this.emitEvent({
				type: "session_update",
				sessionId,
				messageId,
				timestamp: Date.now(),
				notification: {
					sessionId,
					update: {
						sessionUpdate: "tool_call_update",
						toolCallId,
						status: "in_progress",
						content: [{
							type: "content",
							content: {
								type: "text",
								text: `Searching for files matching "${pattern}" in ${directory}...`
							}
						}],
						locations: [{
							path: directory,
							line: 0
						}]
					}
				}
			});
			await this.delay(500);
			this.emitEvent({
				type: "session_update",
				sessionId,
				messageId,
				timestamp: Date.now(),
				notification: {
					sessionId,
					update: {
						sessionUpdate: "tool_call_update",
						toolCallId,
						status: "completed",
						content: [{
							type: "content",
							content: {
								type: "text",
								text: "Found 5 files\n\nbubble_sort.py (10.38 KB)\nconvert_to_oneline.py (2.2 KB)\ntls12_examples.py (4.58 KB)\n.codebuddy/skills/analyzing-financial-statements/calculate_ratios.py (12.22 KB)\n.codebuddy/skills/analyzing-financial-statements/interpret_ratios.py (15.83 KB)\n"
							}
						}],
						locations: [{
							path: directory,
							line: 0
						}],
						rawOutput: {
							path: directory,
							pattern,
							recursive: true,
							caseSensitive: false,
							results: [
								{
									filePath: "bubble_sort.py",
									size: "10.38 KB"
								},
								{
									filePath: "convert_to_oneline.py",
									size: "2.2 KB"
								},
								{
									filePath: "tls12_examples.py",
									size: "4.58 KB"
								},
								{
									filePath: ".codebuddy/skills/analyzing-financial-statements/calculate_ratios.py",
									size: "12.22 KB"
								},
								{
									filePath: ".codebuddy/skills/analyzing-financial-statements/interpret_ratios.py",
									size: "15.83 KB"
								}
							]
						}
					}
				}
			});
			await this.delay(300);
			this.emitEvent({
				type: "session_update",
				sessionId,
				messageId: `${messageId}-summary`,
				timestamp: Date.now(),
				notification: {
					sessionId,
					update: {
						sessionUpdate: "agent_message_chunk",
						content: {
							type: "text",
							text: `✅ 文件搜索完成！在 \`${directory}\` 目录中找到 5 个匹配的 Python 文件。\n\n**搜索结果：**\n- \`bubble_sort.py\` (10.38 KB)\n- \`convert_to_oneline.py\` (2.2 KB)\n- \`tls12_examples.py\` (4.58 KB)\n- \`.codebuddy/skills/analyzing-financial-statements/calculate_ratios.py\` (12.22 KB)\n- \`.codebuddy/skills/analyzing-financial-statements/interpret_ratios.py\` (15.83 KB)\n\n**工具调用流程：**\n1. \`tool_call\` (pending) - 创建搜索工具调用\n2. \`tool_call_update\` (in_progress) - 执行搜索\n3. \`tool_call_update\` (completed) - 返回搜索结果`
						}
					}
				}
			});
			await this.delay(100);
		}
		/**
		* 发送删除文件工具调用流程 (符合 ACP 协议)
		*
		* 用于模拟删除文件的工具调用
		* 支持显示删除操作的进度和结果
		*/
		async sendMockDeleteFileToolCallFlow(sessionId, messageId) {
			console.log(`🗑️ Starting delete_file tool call flow: ${messageId}`);
			const targetFile = "/Users/liumingyuan/Project/caseTest/subagent/temp_file.txt";
			const toolCallId = `tool-df-${Date.now()}`;
			this.emitEvent({
				type: "session_update",
				sessionId,
				messageId,
				timestamp: Date.now(),
				notification: {
					sessionId,
					_meta: { "codebuddy.ai": { toolName: "delete_file" } },
					update: {
						sessionUpdate: "tool_call",
						toolCallId,
						title: "Delete File",
						status: "pending",
						locations: [{
							path: targetFile,
							line: 0
						}]
					}
				}
			});
			console.log("[MockAgentProvider] delete_file tool_call (pending) sent");
			await this.delay(200);
			const filePathChunks = [
				"/Users/liumingyuan/",
				"Project/caseTest",
				"/subagent/",
				"temp_file.txt"
			];
			let accumulatedInput = "";
			for (const chunk of filePathChunks) {
				accumulatedInput += chunk;
				this.emitEvent({
					type: "session_update",
					sessionId,
					messageId,
					timestamp: Date.now(),
					notification: {
						sessionId,
						_meta: { "codebuddy.ai": { toolName: "delete_file" } },
						update: {
							sessionUpdate: "tool_call_update",
							toolCallId,
							status: "in_progress",
							rawInput: {
								target_file: accumulatedInput,
								explanation: "Deleting temporary test file"
							}
						}
					}
				});
				await this.delay(100);
				console.log("[MockAgentProvider] delete_file tool_call_update with rawInput:", chunk);
			}
			await this.delay(300);
			for (const step of [
				{
					progress: 25,
					message: "Checking file permissions..."
				},
				{
					progress: 50,
					message: "Validating file path..."
				},
				{
					progress: 75,
					message: "Removing file..."
				},
				{
					progress: 100,
					message: "File deleted successfully"
				}
			]) {
				const rawOutput = {
					type: "delete_file_result",
					path: targetFile,
					recursive: false,
					hint: step.message
				};
				const outputValidation = validateToolOutput("delete_file", rawOutput);
				this.emitEvent({
					type: "session_update",
					sessionId,
					messageId,
					timestamp: Date.now(),
					notification: {
						sessionId,
						_meta: { "codebuddy.ai": { toolName: "delete_file" } },
						update: {
							sessionUpdate: "tool_call_update",
							toolCallId,
							status: step.progress === 100 ? "deleted" : "in_progress",
							content: [{
								type: "content",
								content: {
									type: "text",
									text: `🗑️ ${step.message} (${step.progress}%)`
								}
							}],
							locations: [{
								path: targetFile,
								line: 0
							}],
							rawOutput: outputValidation.success ? outputValidation.data : rawOutput
						}
					}
				});
				console.log(`🗑️ Delete progress: ${step.progress}% - ${step.message}`);
				await this.delay(200);
			}
			const finalOutputValidation = validateToolOutput("delete_file", {
				type: "delete_file_result",
				path: targetFile,
				recursive: false,
				hint: "File successfully deleted from filesystem"
			});
			if (!finalOutputValidation.success) throw new Error(`Invalid delete_file rawOutput: ${JSON.stringify(finalOutputValidation.error.errors)}`);
			this.emitEvent({
				type: "session_update",
				sessionId,
				messageId,
				timestamp: Date.now(),
				notification: {
					sessionId,
					update: {
						sessionUpdate: "tool_call_update",
						toolCallId,
						status: "completed",
						content: [{
							type: "content",
							content: {
								type: "text",
								text: `✅ 文件删除完成！\n\n**删除的文件：** \`${targetFile}\`\n\n**操作详情：**\n- 文件路径验证 ✓\n- 权限检查 ✓\n- 文件删除 ✓\n\n文件已从文件系统中成功移除。`
							}
						}],
						locations: [{
							path: targetFile,
							line: 0
						}],
						rawOutput: finalOutputValidation.data
					}
				}
			});
			console.log("[MockAgentProvider] delete_file tool_call_update (completed) sent");
			this.emitEvent({
				type: "session_update",
				sessionId,
				messageId: `${messageId}-summary`,
				timestamp: Date.now(),
				notification: {
					sessionId,
					update: {
						sessionUpdate: "agent_message_chunk",
						content: {
							type: "text",
							text: "🗑️ **删除文件工具调用演示完成**\n\n**工具调用流程：**\n1. `tool_call` (pending) - 创建删除文件工具调用\n2. `tool_call_update` (in_progress) - 流式发送参数和执行删除操作\n3. `tool_call_update` (completed) - 返回删除结果\n\n**rawInput 包含：**\n- `target_file`: 要删除的文件路径\n- `explanation`: 删除原因说明\n\n**rawOutput 包含：**\n- `type`: 'delete_file_result'\n- `path`: 被删除的文件路径\n- `recursive`: 是否递归删除\n- `hint`: 操作提示信息"
						}
					}
				}
			});
			await this.delay(100);
		}
		/**
		* 发送 ask_followup_question 工具调用流程 (符合 ACP 协议)
		*
		* 用于模拟向用户提问并获取回答的工具调用
		* 数据结构与 genie-ide 保持一致：question (单个问题字符串) + options (选项数组)
		*/
		async sendMockAskFollowupQuestionToolCallFlow(sessionId, messageId) {
			console.log(`❓ Starting ask_followup_question tool call flow: ${messageId}`);
			const toolCallId = `tool-afq-${Date.now()}`;
			const question = "你希望创建什么类型的项目？";
			const options = [
				"Web 应用（前端 + 后端）",
				"命令行工具（CLI）",
				"移动应用（React Native / Flutter）",
				"桌面应用（Electron）",
				"后端服务（API / 微服务）"
			];
			this.emitEvent({
				type: "session_update",
				sessionId,
				messageId,
				timestamp: Date.now(),
				notification: {
					sessionId,
					_meta: { "codebuddy.ai": { toolName: "ask_followup_question" } },
					update: {
						sessionUpdate: "tool_call",
						toolCallId,
						title: "Ask Followup Question",
						kind: "other",
						status: "pending",
						rawInput: {
							question,
							options: JSON.stringify(options)
						}
					}
				}
			});
			await this.delay(100);
			this.emitEvent({
				type: "session_update",
				sessionId,
				messageId,
				timestamp: Date.now(),
				notification: {
					sessionId,
					_meta: { "codebuddy.ai": { toolName: "ask_followup_question" } },
					update: {
						sessionUpdate: "tool_call_update",
						toolCallId,
						status: "in_progress",
						rawInput: {
							question,
							options: JSON.stringify(options)
						}
					}
				}
			});
			console.log("[MockAgentProvider] ask_followup_question tool displayed, waiting for user interaction...");
		}
		/**
		* 发送 list_dir 工具调用流程 (符合 ACP 协议)
		*
		* 用于模拟列出目录中的文件
		* 数据结构符合 tool-schemas.ts 中的 ListDirInput 和 ListFilesResult
		*/
		async sendMockListFilesToolCallFlow(sessionId, messageId) {
			console.log(`📁 Starting list_dir tool call flow: ${messageId}`);
			const target_directory = "/Users/test/project/src";
			const toolCallId = `tool-ld-${Date.now()}`;
			const mockFiles = [
				{
					filePath: `${target_directory}/index.ts`,
					size: "2.5 KB",
					modifyTime: "2024-01-15 10:30:00"
				},
				{
					filePath: `${target_directory}/App.tsx`,
					size: "8.2 KB",
					modifyTime: "2024-01-15 09:45:00"
				},
				{
					filePath: `${target_directory}/utils.ts`,
					size: "1.8 KB",
					modifyTime: "2024-01-14 16:20:00"
				},
				{
					filePath: `${target_directory}/components/`,
					size: "-",
					modifyTime: "2024-01-15 11:00:00"
				},
				{
					filePath: `${target_directory}/hooks/`,
					size: "-",
					modifyTime: "2024-01-14 14:30:00"
				},
				{
					filePath: `${target_directory}/styles/`,
					size: "-",
					modifyTime: "2024-01-13 09:00:00"
				},
				{
					filePath: `${target_directory}/types.d.ts`,
					size: "3.1 KB",
					modifyTime: "2024-01-12 18:45:00"
				},
				{
					filePath: `${target_directory}/constants.ts`,
					size: "0.9 KB",
					modifyTime: "2024-01-10 12:00:00"
				}
			];
			const listing = mockFiles.map((f) => {
				const name = f.filePath.split("/").pop() || "";
				return f.filePath.endsWith("/") ? `📁 ${name}` : `📄 ${name} (${f.size})`;
			}).join("\n");
			this.emitEvent({
				type: "session_update",
				sessionId,
				messageId,
				timestamp: Date.now(),
				notification: {
					sessionId,
					_meta: { "codebuddy.ai": { toolName: "list_dir" } },
					update: {
						sessionUpdate: "tool_call",
						toolCallId,
						title: "List Directory",
						kind: "search",
						status: "pending",
						locations: [{
							path: target_directory,
							line: 0
						}],
						rawInput: { target_directory }
					}
				}
			});
			await this.delay(100);
			this.emitEvent({
				type: "session_update",
				sessionId,
				messageId,
				timestamp: Date.now(),
				notification: {
					sessionId,
					_meta: { "codebuddy.ai": { toolName: "list_dir" } },
					update: {
						sessionUpdate: "tool_call_update",
						toolCallId,
						status: "in_progress",
						content: [{
							type: "content",
							content: {
								type: "text",
								text: `Listing directory ${target_directory}...`
							}
						}],
						locations: [{
							path: target_directory,
							line: 0
						}]
					}
				}
			});
			await this.delay(300);
			this.emitEvent({
				type: "session_update",
				sessionId,
				messageId,
				timestamp: Date.now(),
				notification: {
					sessionId,
					_meta: { "codebuddy.ai": { toolName: "list_dir" } },
					update: {
						sessionUpdate: "tool_call_update",
						toolCallId,
						status: "completed",
						content: [{
							type: "content",
							content: {
								type: "text",
								text: `Listed ${mockFiles.length} items in ${target_directory}`
							}
						}],
						locations: [{
							path: target_directory,
							line: 0
						}],
						rawOutput: {
							type: "list_files_result",
							files: mockFiles,
							root: target_directory,
							listing
						}
					}
				}
			});
			console.log("[MockAgentProvider] list_dir tool call completed");
		}
		/**
		* 发送 preview_url 工具调用流程 (符合 ACP 协议)
		*
		* 用于测试 unknown-tool-renderer 的显示效果
		* preview_url 是一个未知工具，会使用 UnknownToolRenderer 渲染
		*/
		async sendMockPreviewUrlToolCallFlow(sessionId, messageId) {
			console.log(`🌐 Starting preview_url tool call flow: ${messageId}`);
			const toolCallId = `tool-pu-${Date.now()}`;
			const url = "https://example.com/preview";
			this.emitEvent({
				type: "session_update",
				sessionId,
				messageId,
				timestamp: Date.now(),
				notification: {
					sessionId,
					_meta: { "codebuddy.ai": { toolName: "preview_url" } },
					update: {
						sessionUpdate: "tool_call",
						toolCallId,
						title: "Preview URL",
						kind: "other",
						status: "pending",
						rawInput: { url }
					}
				}
			});
			await this.delay(200);
			this.emitEvent({
				type: "session_update",
				sessionId,
				messageId,
				timestamp: Date.now(),
				notification: {
					sessionId,
					_meta: { "codebuddy.ai": { toolName: "preview_url" } },
					update: {
						sessionUpdate: "tool_call_update",
						toolCallId,
						status: "in_progress",
						content: [{
							type: "content",
							content: {
								type: "text",
								text: `Loading preview for ${url}...`
							}
						}]
					}
				}
			});
			await this.delay(800);
			this.emitEvent({
				type: "session_update",
				sessionId,
				messageId,
				timestamp: Date.now(),
				notification: {
					sessionId,
					_meta: { "codebuddy.ai": { toolName: "preview_url" } },
					update: {
						sessionUpdate: "tool_call_update",
						toolCallId,
						status: "completed",
						content: [{
							type: "content",
							content: {
								type: "text",
								text: `Preview loaded successfully for ${url}`
							}
						}],
						rawOutput: {
							url,
							title: "Example Domain",
							screenshot: "base64-encoded-screenshot-data...",
							status: 200
						}
					}
				}
			});
			console.log("[MockAgentProvider] preview_url tool call completed");
		}
		/**
		* 发送 list_code_definition_names 工具调用流程 (符合 ACP 协议)
		*
		* 用于测试 unknown-tool-renderer 的显示效果
		* list_code_definition_names 是一个未知工具，会使用 UnknownToolRenderer 渲染
		*/
		async sendMockListCodeDefinitionNamesToolCallFlow(sessionId, messageId) {
			console.log(`📝 Starting list_code_definition_names tool call flow: ${messageId}`);
			const toolCallId = `tool-lcd-${Date.now()}`;
			const filePath = "/Users/test/project/src/utils.ts";
			this.emitEvent({
				type: "session_update",
				sessionId,
				messageId,
				timestamp: Date.now(),
				notification: {
					sessionId,
					_meta: { "codebuddy.ai": { toolName: "list_code_definition_names" } },
					update: {
						sessionUpdate: "tool_call",
						toolCallId,
						title: "List Code Definitions",
						kind: "other",
						status: "pending",
						rawInput: { filePath }
					}
				}
			});
			await this.delay(200);
			this.emitEvent({
				type: "session_update",
				sessionId,
				messageId,
				timestamp: Date.now(),
				notification: {
					sessionId,
					_meta: { "codebuddy.ai": { toolName: "list_code_definition_names" } },
					update: {
						sessionUpdate: "tool_call_update",
						toolCallId,
						status: "in_progress",
						content: [{
							type: "content",
							content: {
								type: "text",
								text: `Analyzing code definitions in ${filePath}...`
							}
						}]
					}
				}
			});
			await this.delay(600);
			this.emitEvent({
				type: "session_update",
				sessionId,
				messageId,
				timestamp: Date.now(),
				notification: {
					sessionId,
					_meta: { "codebuddy.ai": { toolName: "list_code_definition_names" } },
					update: {
						sessionUpdate: "tool_call_update",
						toolCallId,
						status: "completed",
						content: [{
							type: "content",
							content: {
								type: "text",
								text: `Found 5 code definitions in ${filePath}`
							}
						}],
						rawOutput: {
							filePath,
							definitions: [
								{
									name: "formatDate",
									type: "function",
									line: 5
								},
								{
									name: "parseJSON",
									type: "function",
									line: 15
								},
								{
									name: "debounce",
									type: "function",
									line: 28
								},
								{
									name: "Config",
									type: "interface",
									line: 42
								},
								{
									name: "DEFAULT_OPTIONS",
									type: "const",
									line: 55
								}
							]
						}
					}
				}
			});
			console.log("[MockAgentProvider] list_code_definition_names tool call completed");
		}
		/**
		* 发送 web_fetch 工具调用流程 (符合 ACP 协议)
		*
		* 用于模拟从 URL 获取网页内容的工具调用
		*/
		async sendMockWebFetchToolCallFlow(sessionId, messageId) {
			console.log(`🌐 Starting web_fetch tool call flow: ${messageId}`);
			const toolCallId = `tool-wf-${Date.now()}`;
			const targetUrl = "https://github.com/anthropics/claude-code";
			this.emitEvent({
				type: "session_update",
				sessionId,
				messageId,
				timestamp: Date.now(),
				notification: {
					sessionId,
					_meta: { "codebuddy.ai": { toolName: "web_fetch" } },
					update: {
						sessionUpdate: "tool_call",
						toolCallId,
						title: "Web Fetch",
						kind: "other",
						status: "pending",
						rawInput: {
							url: targetUrl,
							fetchInfo: "Fetching page content..."
						}
					}
				}
			});
			await this.delay(200);
			const urlChunks = [
				"https://github.com/",
				"anthropics/",
				"claude-code"
			];
			let accumulatedUrl = "";
			for (const chunk of urlChunks) {
				accumulatedUrl += chunk;
				this.emitEvent({
					type: "session_update",
					sessionId,
					messageId,
					timestamp: Date.now(),
					notification: {
						sessionId,
						_meta: { "codebuddy.ai": { toolName: "web_fetch" } },
						update: {
							sessionUpdate: "tool_call_update",
							toolCallId,
							status: "in_progress",
							rawInput: {
								url: accumulatedUrl,
								fetchInfo: "Fetching page content..."
							}
						}
					}
				});
				await this.delay(100);
				console.log("[MockAgentProvider] web_fetch tool_call_update with rawInput:", chunk);
			}
			await this.delay(500);
			for (const step of [
				{ loading: "Connecting to server..." },
				{ loading: "Downloading content..." },
				{ loading: "Parsing HTML..." }
			]) {
				this.emitEvent({
					type: "session_update",
					sessionId,
					messageId,
					timestamp: Date.now(),
					notification: {
						sessionId,
						_meta: { "codebuddy.ai": { toolName: "web_fetch" } },
						update: {
							sessionUpdate: "tool_call_update",
							toolCallId,
							status: "in_progress",
							rawInput: {
								url: targetUrl,
								fetchInfo: step.loading
							},
							rawOutput: { loading: step.loading }
						}
					}
				});
				console.log(`🌐 Fetch progress: ${step.loading}`);
				await this.delay(300);
			}
			this.emitEvent({
				type: "session_update",
				sessionId,
				messageId,
				timestamp: Date.now(),
				notification: {
					sessionId,
					_meta: { "codebuddy.ai": { toolName: "web_fetch" } },
					update: {
						sessionUpdate: "tool_call_update",
						toolCallId,
						status: "completed",
						rawInput: {
							url: targetUrl,
							fetchInfo: "Fetch web page content"
						},
						rawOutput: {
							title: "Claude Code - GitHub",
							favicon: "https://github.githubassets.com/favicons/favicon.svg",
							data: `# Claude Code

Claude Code is an agentic coding tool that lives in your terminal, understands your codebase, and helps you code faster through natural conversation.

## Features

- **Agentic coding**: Claude Code can read, write, and edit files, run commands, and more.
- **Context-aware**: Claude Code understands your entire codebase and can answer questions about it.
- **Natural conversation**: Just describe what you want to do in plain English.

## Installation

\`\`\`bash
npm install -g @anthropic-ai/claude-code
\`\`\`

## Usage

\`\`\`bash
claude-code
\`\`\`

Start a conversation with Claude Code and let it help you with your coding tasks!`
						}
					}
				}
			});
			console.log("[MockAgentProvider] web_fetch tool_call_update (completed) sent");
			this.emitEvent({
				type: "session_update",
				sessionId,
				messageId: `${messageId}-summary`,
				timestamp: Date.now(),
				notification: {
					sessionId,
					update: {
						sessionUpdate: "agent_message_chunk",
						content: {
							type: "text",
							text: "🌐 **Web Fetch 工具调用演示完成**\n\n**工具调用流程：**\n1. `tool_call` (pending) - 创建 web_fetch 工具调用\n2. `tool_call_update` (in_progress) - 流式发送 URL 和获取进度\n3. `tool_call_update` (completed) - 返回网页内容\n\n**rawInput 包含：**\n- `url`: 目标 URL\n- `fetchInfo`: 获取说明\n\n**rawOutput 包含：**\n- `title`: 网页标题\n- `favicon`: 网站图标\n- `data`: 网页内容（Markdown 格式）"
						}
					}
				}
			});
			await this.delay(100);
		}
		/**
		* 发送 web_search 工具调用流程 (符合 ACP 协议)
		*
		* 用于模拟网络搜索的工具调用
		* 数据结构符合 tool-schemas.ts 中的 web_search 定义
		*/
		async sendMockWebSearchToolCallFlow(sessionId, messageId) {
			console.log(`🔍 Starting web_search tool call flow: ${messageId}`);
			const toolCallId = `tool-ws-${Date.now()}`;
			const searchTerm = "TypeScript 5.0 new features";
			const explanation = "Searching for the latest TypeScript 5.0 features to provide accurate and up-to-date information.";
			this.emitEvent({
				type: "session_update",
				sessionId,
				messageId,
				timestamp: Date.now(),
				notification: {
					sessionId,
					_meta: { "codebuddy.ai": { toolName: "web_search" } },
					update: {
						sessionUpdate: "tool_call",
						toolCallId,
						title: "Web Search",
						kind: "search",
						status: "pending",
						rawInput: {
							searchTerm,
							explanation
						}
					}
				}
			});
			await this.delay(200);
			this.emitEvent({
				type: "session_update",
				sessionId,
				messageId,
				timestamp: Date.now(),
				notification: {
					sessionId,
					_meta: { "codebuddy.ai": { toolName: "web_search" } },
					update: {
						sessionUpdate: "tool_call_update",
						toolCallId,
						status: "in_progress",
						content: [{
							type: "content",
							content: {
								type: "text",
								text: `🔍 Searching the web for "${searchTerm}"...`
							}
						}],
						rawInput: {
							searchTerm,
							explanation
						}
					}
				}
			});
			await this.delay(800);
			const searchResults = [
				{
					title: "Announcing TypeScript 5.0 - TypeScript Blog",
					url: "https://devblogs.microsoft.com/typescript/announcing-typescript-5-0/",
					snippet: "TypeScript 5.0 brings many new features, including decorators, const type parameters, and improvements to enums. This release also includes significant performance improvements...",
					publishedDate: "2023-03-16"
				},
				{
					title: "TypeScript 5.0: What's New - LogRocket Blog",
					url: "https://blog.logrocket.com/whats-new-typescript-5-0/",
					snippet: "TypeScript 5.0 introduces several exciting features: ECMAScript decorators, const type parameters, multiple config extends, all enums are union enums, and more...",
					publishedDate: "2023-04-10"
				},
				{
					title: "TypeScript 5.0 Release Notes - GitHub",
					url: "https://github.com/microsoft/TypeScript/releases/tag/v5.0.0",
					snippet: "Official release notes for TypeScript 5.0. Key highlights include: Decorators, const Type Parameters, Supporting Multiple Configuration Files in extends...",
					publishedDate: "2023-03-16"
				},
				{
					title: "A Complete Guide to TypeScript 5.0 Features - Medium",
					url: "https://medium.com/typescript-5-features-guide",
					snippet: "Explore all the new features in TypeScript 5.0: decorators with metadata, const type parameters for better type inference, improved module resolution...",
					publishedDate: "2023-05-22"
				},
				{
					title: "TypeScript 5.0 Performance Improvements",
					url: "https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html",
					snippet: "TypeScript 5.0 includes significant performance improvements: faster type checking, reduced memory usage, and improved build times. Package size reduced by 50%...",
					publishedDate: "2023-03-16"
				}
			];
			this.emitEvent({
				type: "session_update",
				sessionId,
				messageId,
				timestamp: Date.now(),
				notification: {
					sessionId,
					_meta: { "codebuddy.ai": { toolName: "web_search" } },
					update: {
						sessionUpdate: "tool_call_update",
						toolCallId,
						status: "completed",
						content: [{
							type: "content",
							content: {
								type: "text",
								text: `Found ${searchResults.length} results for "${searchTerm}"`
							}
						}],
						rawInput: {
							searchTerm,
							explanation
						},
						rawOutput: {
							query: searchTerm,
							totalResults: searchResults.length,
							results: searchResults,
							searchEngine: "web",
							timestamp: (/* @__PURE__ */ new Date()).toISOString()
						}
					}
				}
			});
			await this.delay(300);
			this.emitEvent({
				type: "session_update",
				sessionId,
				messageId: `${messageId}-summary`,
				timestamp: Date.now(),
				notification: {
					sessionId,
					update: {
						sessionUpdate: "agent_message_chunk",
						content: {
							type: "text",
							text: `🔍 **Web 搜索完成**\n\n**搜索词：** \`${searchTerm}\`\n\n**搜索结果：** 找到 ${searchResults.length} 个相关结果\n\n**主要发现：**\n1. **TypeScript 5.0 新特性** - 包括装饰器、const 类型参数、枚举改进等\n2. **性能提升** - 类型检查更快，内存使用减少，包大小减少 50%\n3. **配置增强** - 支持多配置文件继承\n\n**工具调用流程：**\n1. \`tool_call\` (pending) - 创建搜索工具调用\n2. \`tool_call_update\` (in_progress) - 执行网络搜索\n3. \`tool_call_update\` (completed) - 返回搜索结果\n\n**rawInput 包含：**\n- \`searchTerm\`: 搜索关键词\n- \`explanation\`: 搜索原因说明\n\n**rawOutput 包含：**\n- \`query\`: 搜索查询\n- \`totalResults\`: 结果总数\n- \`results\`: 搜索结果数组（包含 title、url、snippet、publishedDate）`
						}
					}
				}
			});
			console.log("[MockAgentProvider] web_search tool call completed");
		}
		/**
		* 发送 read_lints 工具调用流程 (符合 ACP 协议)
		*
		* 数据结构 (来自 tool-schemas.ts):
		* - Input: ReadLintsInput = { paths?: string }
		* - Output: ReadLintsResult = {
		*     type: 'read_lints_result';
		*     diagnostics: string[];
		*     totalCount?: number;
		*     hint?: string;
		*     isTruncated?: boolean;
		*   }
		*/
		async sendMockReadLintsToolCallFlow(sessionId, messageId) {
			console.log(`🔍 Starting read_lints tool call flow: ${messageId}`);
			const toolCallId = `tool-rl-${Date.now()}`;
			const targetPath = "/Users/test/project/src/components/Button.tsx";
			this.emitEvent({
				type: "session_update",
				sessionId,
				messageId,
				timestamp: Date.now(),
				notification: {
					sessionId,
					_meta: { "codebuddy.ai": { toolName: "read_lints" } },
					update: {
						sessionUpdate: "tool_call",
						toolCallId,
						title: "Read Lints",
						kind: "read",
						status: "pending",
						rawInput: { paths: targetPath }
					}
				}
			});
			await this.delay(200);
			this.emitEvent({
				type: "session_update",
				sessionId,
				messageId,
				timestamp: Date.now(),
				notification: {
					sessionId,
					_meta: { "codebuddy.ai": { toolName: "read_lints" } },
					update: {
						sessionUpdate: "tool_call_update",
						toolCallId,
						status: "in_progress",
						rawInput: { paths: targetPath }
					}
				}
			});
			await this.delay(300);
			this.emitEvent({
				type: "session_update",
				sessionId,
				messageId,
				timestamp: Date.now(),
				notification: {
					sessionId,
					_meta: { "codebuddy.ai": { toolName: "read_lints" } },
					update: {
						sessionUpdate: "tool_call_update",
						toolCallId,
						status: "completed",
						rawInput: { paths: targetPath },
						rawOutput: {
							type: "read_lints_result",
							diagnostics: [`Button.tsx - ERROR (3 issues)
[ERROR] Line 15, Column 8: 'useState' is defined but never used. Consider removing this import.
[ERROR] Line 23, Column 12: Type 'string' is not assignable to type 'number'. Expected a numeric value.
[ERROR] Line 45, Column 4: Missing return statement in function that is expected to return 'ReactNode'.`],
							totalCount: 3,
							hint: "Found 3 lint errors in Button.tsx",
							isTruncated: false
						}
					}
				}
			});
			console.log("[MockAgentProvider] read_lints tool call completed");
		}
		/**
		* 发送 execute_command 工具调用流程 (符合 ACP 协议)
		*
		* 数据结构 (来自 tool-schemas.ts):
		* - Input: ExecuteCommandInput = { command: string; requires_approval: boolean; }
		* - Output: ExecuteCommandResult = {
		*     type: 'execute_command_result';
		*     stdout: string;
		*     stderr: string;
		*     exitCode: number;
		*     hint?: string;
		*     serviceInfo?: { isWatchCommand, isServiceOutput, serviceReady, message };
		*     use_standalone_terminal?: boolean;
		*   }
		*/
		async sendMockExecuteCommandToolCallFlow(sessionId, messageId) {
			console.log(`💻 Starting execute_command tool call flow: ${messageId}`);
			const toolCallId = `tool-ec-${Date.now()}`;
			this.emitEvent({
				type: "session_update",
				sessionId,
				messageId,
				timestamp: Date.now(),
				notification: {
					sessionId,
					_meta: { "codebuddy.ai": { toolName: "execute_command" } },
					update: {
						sessionUpdate: "tool_call",
						toolCallId,
						title: "Execute Command",
						kind: "execute",
						status: "pending",
						rawInput: {
							command: "npm run build",
							requires_approval: false
						}
					}
				}
			});
			await this.delay(200);
			this.emitEvent({
				type: "session_update",
				sessionId,
				messageId,
				timestamp: Date.now(),
				notification: {
					sessionId,
					_meta: { "codebuddy.ai": { toolName: "execute_command" } },
					update: {
						sessionUpdate: "tool_call_update",
						toolCallId,
						status: "in_progress",
						content: [{
							type: "content",
							content: {
								type: "text",
								text: "> npm run build\n\nRunning build script..."
							}
						}]
					}
				}
			});
			await this.delay(1e3);
			this.emitEvent({
				type: "session_update",
				sessionId,
				messageId,
				timestamp: Date.now(),
				notification: {
					sessionId,
					_meta: { "codebuddy.ai": { toolName: "execute_command" } },
					update: {
						sessionUpdate: "tool_call_update",
						toolCallId,
						status: "completed",
						content: [{
							type: "content",
							content: {
								type: "text",
								text: "> npm run build\n\n> genie@1.0.0 build\n> tsc -b\n\nBuild completed successfully."
							}
						}],
						rawOutput: {
							type: "execute_command_result",
							stdout: "> genie@1.0.0 build\n> tsc -b\n\nBuild completed successfully.",
							stderr: "",
							exitCode: 0,
							hint: "Build completed in 2.5s"
						}
					}
				}
			});
			console.log("[MockAgentProvider] execute_command tool call completed");
		}
		/**
		* 发送 execute_command 工具调用流程（需要权限确认）(符合 ACP 协议)
		*
		* 这个方法模拟需要用户确认才能执行的命令
		* 用于测试权限确认菜单 (Run/Skip/Reject)
		*
		* 数据结构 (来自 tool-schemas.ts):
		* - Input: ExecuteCommandInput = { command: string; requires_approval: boolean; }
		*
		* 权限请求通过 rawInput.permissionRequest 字段传递：
		* - permissionRequest.options: 可选的权限选项数组
		*/
		async sendMockExecuteCommandWithApprovalToolCallFlow(sessionId, messageId) {
			console.log(`💻 Starting execute_command (with approval) tool call flow: ${messageId}`);
			const toolCallId = `tool-ec-approval-${Date.now()}`;
			const command = "rm -rf node_modules && npm install";
			const permissionRequest = { options: [
				{
					optionId: "allow-once",
					name: "运行",
					kind: "allow_once"
				},
				{
					optionId: "skip-once",
					name: "跳过",
					kind: "skip_once"
				},
				{
					optionId: "reject-once",
					name: "拒绝",
					kind: "reject_once"
				}
			] };
			this.emitEvent({
				type: "session_update",
				sessionId,
				messageId,
				timestamp: Date.now(),
				notification: {
					sessionId,
					_meta: { "codebuddy.ai": { toolName: "execute_command" } },
					update: {
						sessionUpdate: "tool_call",
						toolCallId,
						title: "Execute Command",
						kind: "execute",
						status: "pending",
						rawInput: {
							command,
							requires_approval: true,
							permissionRequest
						}
					}
				}
			});
			await this.delay(200);
			this.emitEvent({
				type: "session_update",
				sessionId,
				messageId,
				timestamp: Date.now(),
				notification: {
					sessionId,
					_meta: { "codebuddy.ai": { toolName: "execute_command" } },
					update: {
						sessionUpdate: "tool_call_update",
						toolCallId,
						status: "pending",
						content: [{
							type: "content",
							content: {
								type: "text",
								text: `$ ${command}\n\nWaiting for approval...`
							}
						}],
						rawInput: {
							command,
							requires_approval: true,
							permissionRequest
						}
					}
				}
			});
			console.log("[MockAgentProvider] execute_command (with approval) tool call waiting for user approval");
		}
		/**
		* 发送 write_to_file 工具调用流程（需要权限确认）(符合 ACP 协议)
		*
		* 这个方法模拟需要用户确认才能执行的文件写入
		* 用于测试权限确认菜单 (允许/跳过/拒绝)
		*
		* 权限请求通过 rawInput.permissionRequest 字段传递：
		* - permissionRequest.options: 可选的权限选项数组
		*/
		async sendMockWriteFileWithApprovalToolCallFlow(sessionId, messageId) {
			console.log(`📝 Starting write_to_file (with approval) tool call flow: ${messageId}`);
			const toolCallId = `tool-wtf-approval-${Date.now()}`;
			const filePath = "/Users/test/project/src/config.ts";
			const content = `export const config = {
    apiUrl: 'https://api.example.com',
    debug: true,
    timeout: 5000,
};`;
			const permissionRequest = { options: [
				{
					optionId: "allow-once",
					name: "允许",
					kind: "allow_once"
				},
				{
					optionId: "skip-once",
					name: "跳过",
					kind: "skip_once"
				},
				{
					optionId: "reject-once",
					name: "拒绝",
					kind: "reject_once"
				}
			] };
			this.emitEvent({
				type: "session_update",
				sessionId,
				messageId,
				timestamp: Date.now(),
				notification: {
					sessionId,
					_meta: { "codebuddy.ai": { toolName: "write_to_file" } },
					update: {
						sessionUpdate: "tool_call",
						toolCallId,
						title: "Write File",
						kind: "edit",
						status: "pending",
						locations: [{
							path: filePath,
							line: 0
						}],
						rawInput: {
							filePath,
							content,
							permissionRequest
						}
					}
				}
			});
			await this.delay(200);
			this.emitEvent({
				type: "session_update",
				sessionId,
				messageId,
				timestamp: Date.now(),
				notification: {
					sessionId,
					_meta: { "codebuddy.ai": { toolName: "write_to_file" } },
					update: {
						sessionUpdate: "tool_call_update",
						toolCallId,
						status: "pending",
						content: [{
							type: "content",
							content: {
								type: "text",
								text: content
							}
						}],
						locations: [{
							path: filePath,
							line: 0
						}],
						rawInput: {
							filePath,
							content,
							permissionRequest
						}
					}
				}
			});
			console.log("[MockAgentProvider] write_to_file (with approval) tool call waiting for user approval");
		}
	};
}));
//#endregion
//#region ../../packages/agent-provider/src/common/_legacy/json-rpc.ts
var JsonRpcErrorCode, RequestTimeoutError, JsonRpcEncoder$1, RequestIdGenerator$1;
var init_json_rpc$1 = __esmMin((() => {
	JsonRpcErrorCode = /* @__PURE__ */ function(JsonRpcErrorCode) {
		JsonRpcErrorCode[JsonRpcErrorCode["ParseError"] = -32700] = "ParseError";
		JsonRpcErrorCode[JsonRpcErrorCode["InvalidRequest"] = -32600] = "InvalidRequest";
		JsonRpcErrorCode[JsonRpcErrorCode["MethodNotFound"] = -32601] = "MethodNotFound";
		JsonRpcErrorCode[JsonRpcErrorCode["InvalidParams"] = -32602] = "InvalidParams";
		JsonRpcErrorCode[JsonRpcErrorCode["InternalError"] = -32603] = "InternalError";
		return JsonRpcErrorCode;
	}({});
	RequestTimeoutError = class extends Error {
		constructor(method, timeoutMs) {
			super(`JSON-RPC request timeout: ${method} (${timeoutMs}ms)`);
			this.name = "RequestTimeoutError";
			this.method = method;
			this.timeoutMs = timeoutMs;
		}
	};
	JsonRpcEncoder$1 = class {
		/**
		* 编码请求消息
		* @param id 请求 ID
		* @param method 方法名
		* @param params 参数 (可选)
		* @returns AcpRpcEnvelope 包装的 JSON-RPC 请求
		*/
		static encodeRequest(id, method, params) {
			return {
				type: "acp-rpc",
				payload: {
					jsonrpc: "2.0",
					id,
					method,
					params
				}
			};
		}
		/**
		* 编码通知消息 (无响应)
		* @param method 方法名
		* @param params 参数 (可选)
		* @returns AcpRpcEnvelope 包装的 JSON-RPC 通知
		*/
		static encodeNotification(method, params) {
			return {
				type: "acp-rpc",
				payload: {
					jsonrpc: "2.0",
					method,
					params
				}
			};
		}
		/**
		* 编码成功响应
		* @param id 对应请求的 ID
		* @param result 结果数据
		* @returns AcpRpcEnvelope 包装的 JSON-RPC 响应
		*/
		static encodeSuccessResponse(id, result) {
			return {
				type: "acp-rpc",
				payload: {
					jsonrpc: "2.0",
					id,
					result
				}
			};
		}
		/**
		* 编码错误响应
		* @param id 对应请求的 ID
		* @param error 错误信息
		* @returns AcpRpcEnvelope 包装的 JSON-RPC 错误响应
		*/
		static encodeErrorResponse(id, error) {
			return {
				type: "acp-rpc",
				payload: {
					jsonrpc: "2.0",
					id,
					error
				}
			};
		}
		/**
		* 解码 ACP RPC 消息
		* @param envelope AcpRpcEnvelope
		* @returns 解码后的 JSON-RPC 消息
		* @throws 如果消息格式无效
		*/
		static decode(envelope) {
			if (!this.isAcpRpcMessage(envelope)) throw new Error("Invalid ACP RPC message format");
			const payload = envelope.payload;
			if (typeof payload !== "object" || payload === null) throw new Error("Invalid JSON-RPC payload");
			if (payload.jsonrpc !== "2.0") throw new Error("Invalid JSON-RPC version (must be \"2.0\")");
			const hasId = "id" in payload;
			const hasMethod = typeof payload.method === "string";
			if (!hasId && !hasMethod) throw new Error("Invalid JSON-RPC message (must have id or method)");
			return payload;
		}
		/**
		* 检查是否为 ACP RPC 消息
		* @param message 待检查的消息
		* @returns 是否为有效的 AcpRpcEnvelope
		*/
		static isAcpRpcMessage(message) {
			return typeof message === "object" && message !== null && "type" in message && message.type === "acp-rpc" && "payload" in message;
		}
		/**
		* 检查是否为 JSON-RPC 请求 (有 id 字段)
		* @param message JSON-RPC 消息
		* @returns 是否为请求消息
		*/
		static isRequest(message) {
			return "id" in message && "method" in message;
		}
		/**
		* 检查是否为 JSON-RPC 响应 (有 id 字段，有 result 或 error)
		* @param message JSON-RPC 消息
		* @returns 是否为响应消息
		*/
		static isResponse(message) {
			return "id" in message && ("result" in message || "error" in message);
		}
		/**
		* 检查是否为 JSON-RPC 通知 (无 id 字段)
		* @param message JSON-RPC 消息
		* @returns 是否为通知消息
		*/
		static isNotification(message) {
			return !("id" in message) && "method" in message;
		}
	};
	RequestIdGenerator$1 = class {
		constructor() {
			this.counter = 0;
		}
		/**
		* 生成下一个请求 ID
		* @returns 请求 ID 字符串
		*/
		generate() {
			return `acp_${++this.counter}`;
		}
		/**
		* 重置计数器
		*/
		reset() {
			this.counter = 0;
		}
	};
}));
//#endregion
//#region ../../packages/agent-provider/src/common/_legacy/acp-client-protocol.ts
/**
* 检查是否为保留 sessionId
* @param sessionId 会话 ID
* @returns 是否为保留 sessionId
*/
function isReservedSessionId$1(sessionId) {
	return Object.values(SPECIAL_SESSION_IDS$1).includes(sessionId);
}
var SPECIAL_SESSION_IDS$1;
var init_acp_client_protocol = __esmMin((() => {
	SPECIAL_SESSION_IDS$1 = {
		GLOBAL: "__global__",
		NEW: "__new__"
	};
}));
//#endregion
//#region ../../packages/agent-client-protocol/src/common/types.ts
var ExtensionMethod, KNOWN_EXTENSIONS;
var init_types$5 = __esmMin((() => {
	ExtensionMethod = {
		ARTIFACT: "_codebuddy.ai/artifact",
		QUESTION: "_codebuddy.ai/question",
		CHECKPOINT: "_codebuddy.ai/checkpoint",
		COMMAND: "_codebuddy.ai/command",
		AUTH_URL: "_codebuddy.ai/authUrl",
		FILE_HISTORY_SNAPSHOT: "_codebuddy.ai/file_history_snapshot",
		DELEGATE_TOOL: "_codebuddy.ai/delegateTool",
		DELEGATE_TOOLS_CHANGED: "_codebuddy.ai/delegateToolsChanged",
		UI_CONTROL: "_codebuddy.ai/uiControl"
	};
	KNOWN_EXTENSIONS = [
		ExtensionMethod.ARTIFACT,
		ExtensionMethod.QUESTION,
		ExtensionMethod.CHECKPOINT,
		ExtensionMethod.COMMAND,
		ExtensionMethod.AUTH_URL,
		ExtensionMethod.FILE_HISTORY_SNAPSHOT,
		ExtensionMethod.DELEGATE_TOOL,
		ExtensionMethod.DELEGATE_TOOLS_CHANGED
	];
}));
//#endregion
//#region ../../packages/agent-client-protocol/src/common/prompt-context-xml.ts
/**
* 把若干 Teams 专属子块 XML 片段包进 `<team-project-context>` 容器。
* 入参可为字符串数组或单个字符串；全部为空时返回空串（不产出空容器）。
*/
function wrapTeamProjectContext(inner) {
	const parts = (Array.isArray(inner) ? inner : [inner]).map((p) => (p ?? "").trim()).filter((p) => p.length > 0);
	if (parts.length === 0) return "";
	return `<${TEAM_PROJECT_CONTEXT_TAG}>\n${parts.join("\n")}\n</${TEAM_PROJECT_CONTEXT_TAG}>`;
}
/**
* 生成 `<project-file-rules>` 完整块（Teams 上下文策略 §3.3）。
*
* 结构：两文件系统说明 → `<tdrive-root />`（内嵌） → MANDATORY WORKFLOW。
* 由项目 SP `<file_handling_rules>` 第 5 条 + 沙箱说明段下沉而来。
*
* @param tdriveRootXml 完整的 `<tdrive-root id dir_name scope="project" />` 单行 XML；
*                     缺省时也仍产出 file-rules（头部说明 + workflow），但不含根目录锚点。
*/
function formatProjectFileRulesXml(tdriveRootXml) {
	const root = (tdriveRootXml ?? "").trim();
	return `<project-file-rules>\n${root ? `${PROJECT_FILE_RULES_HEADER}\n\n${root}\n\n${PROJECT_FILE_RULES_MANDATORY_WORKFLOW}` : `${PROJECT_FILE_RULES_HEADER}\n\n${PROJECT_FILE_RULES_MANDATORY_WORKFLOW}`}\n</project-file-rules>`;
}
function escapeXmlAttribute(value) {
	return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function wrapHiddenContextXml(xml, role = USER_CONTEXT_ROLE) {
	const content = xml.trim();
	if (!content) return "";
	return `<system-reminder data-role="${escapeXmlAttribute(role)}">\n${content}\n</system-reminder>`;
}
function stripSystemReminderXml(text) {
	return text.replace(SYSTEM_REMINDER_BLOCK_RE, "");
}
function stripUserQueryXml(text) {
	return text.replace(USER_QUERY_RE, "$1");
}
function stripPromptContextXml(text) {
	return stripUserQueryXml(stripSystemReminderXml(text)).trim();
}
var SYSTEM_REMINDER_BLOCK_RE, USER_QUERY_RE, USER_CONTEXT_ROLE, ADDITIONAL_DATA_ROLE, TEAM_PROJECT_CONTEXT_TAG, TEAM_PROJECT_CONTEXT_IDENTITY, PROJECT_TOOL_ROUTING_XML, PROJECT_FILE_RULES_HEADER, PROJECT_FILE_RULES_MANDATORY_WORKFLOW;
var init_prompt_context_xml = __esmMin((() => {
	SYSTEM_REMINDER_BLOCK_RE = /<system-reminder\b[^>]*>[\s\S]*?<\/system-reminder>\s*/g;
	USER_QUERY_RE = /<user_query>([\s\S]*?)<\/user_query>/g;
	USER_CONTEXT_ROLE = "user-context";
	ADDITIONAL_DATA_ROLE = "additional-data";
	TEAM_PROJECT_CONTEXT_TAG = "team-project-context";
	TEAM_PROJECT_CONTEXT_IDENTITY = "You are working within a project. The project may have shared files/assets, members, todos/tasks, and messages.";
	PROJECT_TOOL_ROUTING_XML = [
		"<project-tool-routing>",
		"Select tools by the user's actual intent:",
		"- Project shared files: use `tdrive.*` and search project files only when the user asks to access/list/search/read/write project assets, project drive, or shared project files. Do not search project files just to gather background for a report, plan, or task.",
		"- Project members: use `project_members` to resolve members.",
		"- Todos/tasks: use `todo_create` / `todo_list` / `todo_update` as needed.",
		"- Project messages: use `project_message_*` to list, view, add, reply, edit, or delete.",
		"</project-tool-routing>"
	].join("\n");
	PROJECT_FILE_RULES_HEADER = [
		"There are two file systems (sandbox is the default):",
		"- Sandbox filesystem: for local/uploads/artifacts files.",
		"- Project Drive/assets (tdrive): a shared project file system (root below)."
	].join("\n");
	PROJECT_FILE_RULES_MANDATORY_WORKFLOW = [
		"PROJECT DRIVE / ASSETS (tdrive) — MANDATORY WORKFLOW:",
		"- Any mutating operation on Project Drive (create, upload, modify, move, rename, delete, overwrite) MUST be confirmed with the user before execution.",
		"- For Drive file edits, follow this mandatory review-before-upload workflow:",
		"  1. Download the latest Drive file immediately before editing to avoid overwriting others' changes, then make changes locally.",
		"  2. Show the user what changed, ask for explicit confirmation, then STOP.",
		"  3. Resume the Project Drive mutation only after the user clearly approves the reviewed local version.",
		"- Never upload the locally modified file back to Project Drive directly after editing. MUST show the changes to the user and get explicit confirmation first."
	].join("\n");
}));
//#endregion
//#region ../../packages/agent-client-protocol/src/common/prompt-codec.ts
function getAcpResourceLinkDisplayName(uri, name) {
	if (uri.startsWith(COMMAND_URI_PREFIX)) {
		const commandName = name || uri.slice(10);
		return commandName.startsWith("/") ? commandName : `/${commandName}`;
	}
	if (name) return name;
	return uri.replace(/\/+$/, "").split("/").pop() || uri;
}
function decodeInputTextToAcpContentBlocks(text, providerData, options = {}) {
	const hintedResourceLink = getAcpResourceLinkProviderData(providerData);
	if (hintedResourceLink && shouldDecodeProviderDataHint(text, hintedResourceLink)) return [createAcpResourceLinkBlock(hintedResourceLink.uri, hintedResourceLink.name, hintedResourceLink)];
	const visibleText = stripPromptContextXmlIfNeeded(text);
	if (!visibleText) return [];
	const blocks = [];
	let cursor = 0;
	while (cursor < visibleText.length) {
		const token = findNextInlineToken(visibleText, cursor, options);
		if (!token) break;
		if (token.start > cursor) blocks.push(createTextBlock(visibleText.slice(cursor, token.start)));
		const tdocSelectionEnhanced = maybeEnhanceTDocSelectionBlockWithHint(maybeEnhanceTencentDocsBlockWithHint(maybeEnhanceLexiangBlockWithHint(token.block, hintedResourceLink), hintedResourceLink), hintedResourceLink, text);
		if (!tdocSelectionEnhanced) {
			blocks.push(createTextBlock(visibleText.slice(token.start, token.end)));
			cursor = token.end;
			continue;
		}
		blocks.push(maybeEnhanceAgentMailBlockWithHint(tdocSelectionEnhanced, hintedResourceLink));
		cursor = token.end;
	}
	if (cursor < visibleText.length) blocks.push(createTextBlock(visibleText.slice(cursor)));
	return mergeAdjacentTextBlocks(blocks);
}
/**
* 当 `parseTypedBadge` 把 `@xxx:"<title>"` 解析成 fallback resource_link 时，
* 借助同类型 providerData hint 回填真实 URI 和业务元信息。
*/
function maybeEnhanceResourceLinkBlockWithHint(block, providerHint, uriPrefix) {
	if (!providerHint) return block;
	if (block.type !== "resource_link") return block;
	const blockUri = block?.uri;
	const blockName = block?.name;
	if (typeof blockUri !== "string" || !blockUri.startsWith(uriPrefix)) return block;
	if (!providerHint.uri.startsWith(uriPrefix)) return block;
	if (providerHint.name !== blockName) return block;
	return createAcpResourceLinkBlock(providerHint.uri, providerHint.name, providerHint);
}
function maybeEnhanceLexiangBlockWithHint(block, providerHint) {
	return maybeEnhanceResourceLinkBlockWithHint(block, providerHint, LEXIANG_URI_PREFIX);
}
function maybeEnhanceTencentDocsBlockWithHint(block, providerHint) {
	return maybeEnhanceResourceLinkBlockWithHint(block, providerHint, TDOC_URI_PREFIX);
}
/**
* 将最新 TDoc selection 文本协议还原成可点击 chip。
*
* 最新结构要求 `<user_query>` 中一定是带 label 的
* `@tdoc-selection#<timestamp>:"<label>"`，真实 rangeId / fileId 等字段从
* 同轮 hidden `<selection_payload>` list 里按 timestamp 绑定取得。
*/
function maybeEnhanceTDocSelectionBlockWithHint(block, providerHint, promptContextText) {
	if (block.type !== "resource_link") return block;
	const blockUri = block?.uri;
	const blockName = block?.name;
	if (typeof blockUri !== "string" || !blockUri.startsWith(TDOC_SELECTION_URI_PREFIX)) return block;
	if (typeof blockName !== "string") return block;
	const selectionRef = decodeURIComponentSafe(blockUri.slice(17));
	if (!isTDocSelectionTimestampRef(selectionRef)) return block;
	const contextHint = promptContextText ? extractTDocSelectionProviderHintFromPromptContext(promptContextText, {
		name: blockName,
		selectionRef
	}) : void 0;
	if (contextHint) return createAcpResourceLinkBlock(contextHint.uri, contextHint.name, contextHint);
	const hintRef = readTDocSelectionTimestampRefFromHint(providerHint);
	if (!hintRef || hintRef !== selectionRef) return;
	const enhanced = maybeEnhanceResourceLinkBlockWithHint(block, providerHint, TDOC_SELECTION_URI_PREFIX);
	return enhanced === block ? void 0 : enhanced;
}
function maybeEnhanceAgentMailBlockWithHint(block, providerHint) {
	return maybeEnhanceResourceLinkBlockWithHint(block, providerHint, AGENTMAIL_URI_PREFIX);
}
function decodePersistedUserContentToAcpContentBlocks(content, options = {}) {
	const convertPersistedImageBlock = options.convertPersistedImageBlock || defaultConvertPersistedImageBlock;
	const legacyTencentDocsHints = collectLegacyTencentDocsProviderHintsFromPersistedContent(content);
	const hasInlineImageReferences = content.some((block) => block?.type === "input_text" && typeof block.text === "string" && INLINE_IMAGE_BADGE_RE.test(stripPromptContextXmlIfNeeded(block.text)));
	const imageEntries = content.map((block) => ({ converted: convertPersistedImageBlock(block) })).filter((entry) => Boolean(entry.converted));
	const consumedImageOrdinals = /* @__PURE__ */ new Set();
	const blocks = [];
	for (const block of content) {
		if (!block || typeof block !== "object") continue;
		if (block.type === "image") {
			const normalized = normalizePersistedImageBlockToAcp(block);
			if (normalized) blocks.push(normalized);
			continue;
		}
		if (block.type === "text" || block.type === "audio" || block.type === "resource" || block.type === "resource_link") {
			blocks.push(block);
			continue;
		}
		if (block.type === "input_text") {
			const text = block.text || "";
			const decoded = decodeInputTextToAcpContentBlocks(text, mergeTDocSelectionProviderDataFromPromptContext(text, mergeLegacyTencentDocsProviderDataFromReferences(text, block.providerData, legacyTencentDocsHints)), { resolveImageOrdinal: hasInlineImageReferences ? (ordinal, label) => {
				const entry = imageEntries[ordinal - 1];
				if (!entry?.converted) return;
				consumedImageOrdinals.add(ordinal - 1);
				return applyInlineImageLabel(entry.converted, label);
			} : void 0 });
			if (decoded?.length) blocks.push(...decoded);
			continue;
		}
		if (!hasInlineImageReferences) {
			const imageBlock = convertPersistedImageBlock(block);
			if (imageBlock) blocks.push(imageBlock);
		}
	}
	if (hasInlineImageReferences) imageEntries.forEach((entry, index) => {
		if (!consumedImageOrdinals.has(index)) blocks.push(entry.converted);
	});
	if (blocks.length === 0) return [];
	return mergeAdjacentTextBlocks(blocks);
}
/**
* Legacy replay fallback for messages persisted before Tencent Docs badges became
* self-describing (`@tdoc#fileId:"title"`). Treat the prompt `<references>` block
* only as a best-effort migration source for old `@tdoc:"title"` badges; new
* messages must not depend on this hidden context to remain openable.
*/
function collectLegacyTencentDocsProviderHintsFromPersistedContent(content) {
	if (!Array.isArray(content)) return;
	if (!content.some((block) => (block?.type === "input_text" || block?.type === "text") && typeof block.text === "string" && block.text.includes("@tdoc:"))) return;
	const hints = /* @__PURE__ */ new Map();
	for (const block of content) {
		if (!block || typeof block !== "object") continue;
		if (block.type !== "input_text" && block.type !== "text") continue;
		if (typeof block.text !== "string" || !block.text.includes("<references")) continue;
		const docTagRe = /<doc\b([^>]*)\/?>/gi;
		let match;
		while ((match = docTagRe.exec(block.text)) !== null) {
			const attrs = readXmlTagAttributes(match[1]);
			const fileId = readString(attrs.id) ?? readString(attrs.file_id);
			const title = readString(attrs.title) ?? readString(attrs.name) ?? fileId;
			if (!fileId || !title || hints.has(title)) continue;
			const url = readString(attrs.url);
			const docType = readString(attrs.doc_type) ?? readString(attrs.fileType);
			const ext = readString(attrs.ext) ?? readString(attrs.fileExt);
			const owner = readString(attrs.owner) ?? readString(attrs.ownerName);
			hints.set(title, {
				uri: `${TDOC_URI_PREFIX}${fileId}`,
				name: title,
				fileId,
				...url ? {
					fileUrl: url,
					url
				} : {},
				...docType ? { fileType: docType } : {},
				...ext ? { fileExt: ext } : {},
				...owner ? { ownerName: owner } : {},
				title
			});
		}
	}
	return hints.size > 0 ? hints : void 0;
}
function mergeLegacyTencentDocsProviderDataFromReferences(text, providerData, hints) {
	if (!hints || !text.includes("@tdoc:")) return providerData;
	if (getAcpResourceLinkProviderData(providerData)?.uri.startsWith(TDOC_URI_PREFIX)) return providerData;
	const displayName = extractLegacyTencentDocsDisplayNameFromPromptText(text);
	if (!displayName) return providerData;
	const hint = hints.get(displayName);
	if (!hint) return providerData;
	return {
		...providerData || {},
		[ACP_RESOURCE_LINK_PROVIDER_DATA_KEY]: hint
	};
}
function extractLegacyTencentDocsDisplayNameFromPromptText(text) {
	const visibleText = stripPromptContextXmlIfNeeded(text);
	const start = visibleText.indexOf("@tdoc:");
	if (start < 0) return;
	return parseInlineBadgeValue(visibleText, start + 6)?.value;
}
function getAcpResourceLinkProviderData(providerData) {
	const candidate = providerData?.[ACP_RESOURCE_LINK_PROVIDER_DATA_KEY];
	if (!candidate || typeof candidate !== "object") return;
	const { uri, name } = candidate;
	if (typeof uri !== "string" || typeof name !== "string") return;
	return {
		...candidate,
		uri,
		name
	};
}
function isRecord(value) {
	return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
function mergeTDocSelectionProviderDataFromPromptContext(text, providerData) {
	const contextHint = extractTDocSelectionProviderHintFromPromptContext(text);
	if (!contextHint) return providerData;
	const existingHint = getAcpResourceLinkProviderData(providerData);
	if (existingHint && !existingHint.uri.startsWith(TDOC_SELECTION_URI_PREFIX)) return providerData;
	const contextRangeId = readString(contextHint.rangeId);
	const mergedHint = existingHint ? {
		...existingHint,
		...contextHint,
		uri: contextRangeId ? contextHint.uri : existingHint.uri,
		name: existingHint.name || contextHint.name
	} : contextHint;
	return {
		...providerData || {},
		[ACP_RESOURCE_LINK_PROVIDER_DATA_KEY]: mergedHint
	};
}
/**
* WorkBuddy runtime 会把用户 prompt 压平成 persisted `<user_query>` 文本；
* 此时 `@tdoc-selection#<timestamp>:"可见 label"` 同时保留绑定 ref 和展示文案。
*
* 选区真实身份、hover / 打开所需的机器字段由同条 hidden prompt context
* (`<selection_payload>` + `<active_document>`) 承载，所以这里只为
* tdoc-selection 回填 hint，不复用或耦合 Lexiang、selection:// quote 等其它业务。
*/
function extractTDocSelectionProviderHintFromPromptContext(text, expectedBadge) {
	if (!text.includes("@tdoc-selection#")) return;
	const badge = expectedBadge ?? extractTDocSelectionBadgeFromPromptText(text);
	const selectionRef = badge?.selectionRef;
	if (!badge || !selectionRef) return;
	const activeDocumentAttrs = readFirstXmlTagAttributes(text, "active_document");
	const docAttrs = readFirstXmlTagAttributes(text, "doc");
	const selectionPayload = readSelectionPayload(text, selectionRef);
	const payloadRecord = isRecord(selectionPayload) ? selectionPayload : void 0;
	if (!payloadRecord) return;
	const payloadRangeId = readString(payloadRecord?.rangeId) ?? readString(payloadRecord?.selectionId);
	const displayName = (badge.name && badge.name !== selectionRef ? badge.name : void 0) ?? readFormattedSelectionDisplayText(payloadRecord?.text) ?? readFormattedSelectionDisplayText(payloadRecord?.description) ?? payloadRangeId ?? selectionRef;
	const fileId = readString(payloadRecord?.fileId) ?? readString(activeDocumentAttrs?.file_id) ?? readString(docAttrs?.id);
	const filePath = readString(activeDocumentAttrs?.path);
	const documentResourceUri = filePath ?? (fileId ? `${TDOC_URI_PREFIX}${fileId}` : void 0);
	const fileType = readString(activeDocumentAttrs?.fileType) ?? readString(activeDocumentAttrs?.file_type) ?? readString(docAttrs?.doc_type);
	return {
		uri: `${TDOC_SELECTION_URI_PREFIX}${encodeURIComponent(payloadRangeId || selectionRef)}`,
		name: displayName,
		selectionRef,
		...documentResourceUri ? { documentResourceUri } : {},
		...filePath ? { filePath } : {},
		...fileType ? { fileType } : {},
		...fileId ? { fileId } : {},
		...payloadRangeId ? { rangeId: payloadRangeId } : {},
		selectionPayload: payloadRecord
	};
}
/** 只识别最新的带 label 结构；短 ref 不再兼容，避免和 payload list 失去显式展示绑定。 */
function extractTDocSelectionBadgeFromPromptText(text) {
	const visibleText = stripPromptContextXmlIfNeeded(text);
	const start = visibleText.indexOf("@tdoc-selection#");
	if (start < 0) return;
	let cursor = start + 16;
	const refStart = cursor;
	while (cursor < visibleText.length && /[0-9]/.test(visibleText[cursor])) cursor += 1;
	if (refStart === cursor) return;
	const selectionRef = decodeURIComponentSafe(visibleText.slice(refStart, cursor));
	if (!isTDocSelectionTimestampRef(selectionRef)) return;
	if (visibleText[cursor] !== ":") return;
	const parsed = parseInlineBadgeValue(visibleText, cursor + 1);
	return parsed ? {
		name: parsed.value,
		selectionRef
	} : void 0;
}
/** 从 `<selection_payload>` JSON list 中按 timestamp 精确取出当前 badge 对应的选区。 */
function readSelectionPayload(text, selectionRef) {
	const match = text.match(/<selection_payload\b[^>]*>\s*([\s\S]*?)\s*<\/selection_payload>/i);
	if (!match) return;
	let payloads;
	try {
		const parsed = JSON.parse(unescapeXmlText(match[1]));
		if (!Array.isArray(parsed)) return;
		payloads = parsed;
	} catch {
		return;
	}
	return payloads.find((payload) => isRecord(payload) && readTDocSelectionTimestampRef(payload.timestamp) === selectionRef);
}
function readFirstXmlTagAttributes(text, tagName) {
	const match = text.match(new RegExp(`<${tagName}\\b([^>]*)>`, "i"));
	if (!match) return;
	const attrs = readXmlTagAttributes(match[1]);
	return Object.keys(attrs).length > 0 ? attrs : void 0;
}
function readXmlTagAttributes(attrText) {
	const attrs = {};
	attrText.replace(/([\w:-]+)="([^"]*)"/g, (_match, key, value) => {
		attrs[key] = unescapeXmlAttribute(value);
		return "";
	});
	return attrs;
}
function readString(value) {
	return typeof value === "string" && value.trim() ? value.trim() : void 0;
}
/**
* 文档选区文本（selectionPayload.text / description）：空格 / \\n 也是合法内容，
* 只要求 string 且 length > 0，不做 trim（#65074）。
*/
function readPresentSelectionText(value) {
	return typeof value === "string" && value.length > 0 ? value : void 0;
}
/**
* 多行选区压成单行展示：
* - 含 \\n 时折叠为 ⏎（纯换行也显示 ⏎）
* - 纯空格原样保留，不 trim 成空、也不换成 ⏎
* agent-ui chip / prompt-codec badge 共用此实现，避免两处规则漂移。
*/
function formatDocumentSelectionContextText(text) {
	if (text.length === 0) return "";
	if (!text.includes("\n")) return text.trim().length === 0 ? text : text.trim();
	return text.replace(/\s*\n+\s*/g, " ⏎ ").trim();
}
function readFormattedSelectionDisplayText(value) {
	const present = readPresentSelectionText(value);
	return present !== void 0 ? formatDocumentSelectionContextText(present) : void 0;
}
function readTDocSelectionTimestampRef(value) {
	if (typeof value === "number" && Number.isSafeInteger(value) && value >= 0) return String(value);
	const text = readString(value);
	return text && isTDocSelectionTimestampRef(text) ? text : void 0;
}
function isTDocSelectionTimestampRef(value) {
	return /^[0-9]+$/.test(value);
}
/** 发送侧优先从 selectionPayload.timestamp 取 ref，保证 badge 与 prompt payload 同源。 */
function readTDocSelectionTimestampRefFromHint(hint) {
	if (!hint) return;
	return readTDocSelectionTimestampRef((isRecord(hint.selectionPayload) ? hint.selectionPayload : void 0)?.timestamp) ?? readTDocSelectionTimestampRef(hint.timestamp) ?? readTDocSelectionTimestampRef(hint.selectionRef);
}
/** 最新 user_query 结构：timestamp ref 负责绑定，displayName 只负责用户可见展示。 */
function formatTDocSelectionBadge(displayName, selectionRef) {
	return `${formatTDocSelectionRefBadge(selectionRef)}:${encodeInlineBadgeValue(displayName)}`;
}
function formatTDocSelectionRefBadge(selectionRef) {
	return `@tdoc-selection#${encodeURIComponent(selectionRef)}`;
}
function createAcpResourceLinkBlock(uri, name, providerHint) {
	const displayName = getAcpResourceLinkDisplayName(uri, name);
	const meta = {
		displayAsPhrase: true,
		displayText: displayName
	};
	if (uri.startsWith(COMMAND_URI_PREFIX)) {
		const commandName = displayName.startsWith("/") ? displayName.slice(1) : displayName;
		meta.mentionType = "command";
		meta.type = "command";
		meta.commandName = commandName;
	} else if (uri.startsWith(FILE_URI_PREFIX)) {
		const isFolder = uri.endsWith("/");
		const decodedPath = decodeFileUriPath(uri) || displayName;
		meta.mentionType = isFolder ? "folder" : "file";
		meta.type = meta.mentionType;
		meta.icon = isFolder ? "folder" : "file";
		meta.fileName = displayName;
		meta.relativePath = decodedPath;
		meta.filePath = decodedPath;
	} else if (uri.startsWith(SCENE_URI_PREFIX)) {
		const sceneId = uri.slice(8);
		meta.mentionType = "scene";
		meta.type = "scene";
		meta.sceneId = sceneId;
	} else if (uri.startsWith(SKILL_URI_PREFIX)) {
		meta.mentionType = "skill";
		meta.type = "skill";
	} else if (uri.startsWith(TDOC_URI_PREFIX)) {
		meta.mentionType = "tencent-doc";
		meta.type = "tencent-doc";
		meta.fileId = uri.slice(7);
		const hint = providerHint;
		const fileUrl = readString(hint?.fileUrl) ?? readString(hint?.rawUrl) ?? readString(hint?.url);
		if (fileUrl) meta.fileUrl = fileUrl;
		if (typeof hint?.fileType === "string" && hint.fileType) meta.fileType = hint.fileType;
		if (typeof hint?.fileExt === "string" && hint.fileExt) meta.fileExt = hint.fileExt;
		if (typeof hint?.fileSize === "number") meta.fileSize = hint.fileSize;
		if (typeof hint?.ownerName === "string" && hint.ownerName) meta.ownerName = hint.ownerName;
		if (typeof hint?.title === "string" && hint.title) meta.title = hint.title;
	} else if (uri.startsWith(IMA_URI_PREFIX)) {
		const uriParts = uri.slice(6).split("/").filter(Boolean).map(decodeURIComponentSafe);
		const kbId = uriParts.length >= 2 ? uriParts[0] : void 0;
		const fileId = uriParts.length >= 2 ? uriParts[1] : uriParts[0];
		meta.mentionType = "ima";
		meta.type = "ima";
		meta.source = "ima";
		if (fileId) meta["ima.fileId"] = fileId;
		if (kbId) meta["ima.kbId"] = kbId;
	} else if (uri.startsWith(LEXIANG_URI_PREFIX)) {
		meta.mentionType = "tencent-lexiang";
		meta.type = "tencent-lexiang";
		const parsedLexiang = parseLexiangUri(uri);
		const isFolder = providerHint?.isFolder ?? parsedLexiang?.entityType === "folder";
		if (parsedLexiang?.entityType) meta.entityType = parsedLexiang.entityType;
		meta.entityId = parsedLexiang?.entityId ?? uri.slice(10);
		if (parsedLexiang?.kbId) meta.kbId = parsedLexiang.kbId;
		if (parsedLexiang?.teamId) meta.teamId = parsedLexiang.teamId;
		if (typeof providerHint?.iconUrl === "string" && providerHint.iconUrl) meta.icon = {
			url: providerHint.iconUrl,
			alt: displayName
		};
		else if (isFolder) meta.icon = "folder";
		if (typeof providerHint?.extension === "string" && providerHint.extension) meta.extension = providerHint.extension;
		if (typeof providerHint?.kind === "string" && providerHint.kind) meta.kind = providerHint.kind;
	} else if (uri.startsWith(NETDRIVE_URI_PREFIX)) {
		const filePath = uri.slice(11);
		meta.mentionType = filePath.endsWith("/") ? "folder" : "file";
		meta.type = meta.mentionType;
		meta.source = "personal";
		meta.filePath = filePath;
		meta.fileName = displayName;
	} else if (uri.startsWith(SELECTION_URI_PREFIX)) {
		meta.mentionType = "selection";
		meta.selectionQuote = true;
		meta.displayAsPhrase = true;
		meta.displayAsContext = false;
		meta.displayText = name;
		if (providerHint) {
			const hint = providerHint;
			if (typeof hint.selectedText === "string" && hint.selectedText) meta.selectedText = hint.selectedText;
			if (typeof hint.title === "string" && hint.title) meta.title = hint.title;
		}
	} else if (uri.startsWith(TDOC_SELECTION_URI_PREFIX)) {
		meta.mentionType = TDOC_SELECTION_MENTION_TYPE;
		meta.type = "document-selection";
		meta.displayAsContext = false;
		meta.icon = "file";
		meta.rangeId = decodeURIComponentSafe(uri.slice(17));
		if (providerHint) {
			const hint = providerHint;
			if (typeof hint.documentResourceUri === "string" && hint.documentResourceUri) meta.documentResourceUri = hint.documentResourceUri;
			if (typeof hint.filePath === "string" && hint.filePath) meta.filePath = hint.filePath;
			if (typeof hint.fileType === "string" && hint.fileType) meta.fileType = hint.fileType;
			if (typeof hint.fileId === "string" && hint.fileId) meta.fileId = hint.fileId;
			if (typeof hint.rangeId === "string" && hint.rangeId) meta.rangeId = hint.rangeId;
			if (typeof hint.selectionRef === "string" && hint.selectionRef) meta.selectionRef = hint.selectionRef;
			if (typeof hint.sourceApi === "string" && hint.sourceApi) meta.sourceApi = hint.sourceApi;
			if (isRecord(hint.selectionPayload)) meta.selectionPayload = hint.selectionPayload;
		}
	} else if (uri.startsWith(AGENTMAIL_URI_PREFIX)) {
		const messageId = uri.slice(12);
		const hint = providerHint;
		meta.mentionType = "agent-mail";
		meta.type = "agent-mail";
		meta.icon = "agent-mail";
		meta.agentMail = true;
		meta.id = typeof hint?.message_id === "string" ? hint.message_id : messageId;
		meta.message_id = meta.id;
		meta.title = typeof hint?.subject === "string" ? hint.subject : displayName;
		meta.displayText = meta.title;
		if (typeof hint?.sender === "string" && hint.sender) meta.sender = hint.sender;
		if (typeof hint?.from === "object" && hint.from) meta.from = hint.from;
		if (typeof hint?.created_at === "string" && hint.created_at) meta.created_at = hint.created_at;
		if (typeof hint?.snippet === "string") meta.snippet = hint.snippet;
	} else if (uri.startsWith(EXPERT_URI_PREFIX)) {
		meta.mentionType = "expert";
		meta.type = "expert";
		meta.expertId = uri.slice(9);
	} else if (uri.startsWith(ARTICLE_URI_PREFIX)) {
		meta.mentionType = "article";
		meta.type = "article";
		meta.url = uri.slice(10);
	}
	return {
		type: "resource_link",
		uri,
		name: displayName,
		_meta: meta
	};
}
function createTextBlock(text) {
	return {
		type: "text",
		text
	};
}
function decodeFileUriPath(uri) {
	if (!uri.startsWith(FILE_URI_PREFIX)) return;
	return decodeURIComponentSafe(uri.slice(7));
}
function decodeURIComponentSafe(value) {
	try {
		return decodeURIComponent(value);
	} catch {
		return value;
	}
}
function encodeInlineBadgeValue(value) {
	if (isBareInlineBadgeValue(value)) return value;
	return `"${value.replace(/\\/g, "\\\\").replace(/"/g, "\\\"")}"`;
}
function isBareInlineBadgeValue(value) {
	return value.length > 0 && !value.includes("\"") && !value.includes("\\") && Array.from(value).every((char) => BARE_BADGE_CHAR_RE.test(char));
}
function shouldDecodeProviderDataHint(text, hintedResourceLink) {
	const trimmed = text.trim();
	if (!trimmed) return false;
	if (hintedResourceLink.uri.startsWith(TDOC_SELECTION_URI_PREFIX)) {
		const selectionRef = readTDocSelectionTimestampRefFromHint(hintedResourceLink);
		return selectionRef ? trimmed === formatTDocSelectionBadge(hintedResourceLink.name, selectionRef) : false;
	}
	if (trimmed === hintedResourceLink.name) return true;
	if (trimmed === hintedResourceLink.name.replace(/^\//, "")) return true;
	const name = hintedResourceLink.name;
	if (trimmed === `@"${name}"` || trimmed === `@${name}`) return true;
	if (hintedResourceLink.uri.startsWith(SELECTION_URI_PREFIX)) return true;
	if (hintedResourceLink.uri.startsWith(HTTPS_URI_PREFIX) || hintedResourceLink.uri.startsWith(HTTP_URI_PREFIX)) return trimmed.includes(hintedResourceLink.uri);
	return trimmed.includes("<command-message>");
}
function stripPromptContextXmlIfNeeded(text) {
	if (text.includes("<system-reminder") || text.includes("<user_query>")) return stripPromptContextXml(text);
	return text;
}
function findNextInlineToken(text, start, options) {
	for (let index = start; index < text.length; index += 1) {
		const char = text[index];
		if (char === "@") {
			const badge = parseReferenceBadge(text, index, options);
			if (badge) return badge;
		}
		if (char === "/") {
			const slash = parseSlashToken(text, index);
			if (slash) return slash;
		}
	}
}
function parseReferenceBadge(text, start, options) {
	if (!isReferenceBadgeBoundary(text, start)) return;
	const typed = parseTypedBadge(text, start, options);
	if (typed) return typed;
	if (startsWithExplicitTypedBadgePrefix(text, start)) return;
	const parsedPath = parseInlineBadgeValue(text, start + 1);
	if (!parsedPath) return;
	const uri = `${FILE_URI_PREFIX}${parsedPath.value}`;
	const displayName = parsedPath.value.startsWith("/") ? getLastPathSegment(parsedPath.value) || parsedPath.value : parsedPath.value;
	return {
		start,
		end: parsedPath.end,
		block: createAcpResourceLinkBlock(uri, displayName)
	};
}
function startsWithExplicitTypedBadgePrefix(text, start) {
	return text.startsWith("@scene:", start) || text.startsWith("@scene#", start) || text.startsWith("@skill:", start) || text.startsWith("@tdoc-selection#", start) || text.startsWith("@tdoc:", start) || text.startsWith("@tdoc#", start) || text.startsWith("@ima:", start) || text.startsWith("@lexiang:", start) || text.startsWith("@selection:", start) || text.startsWith("@agentmail:", start) || text.startsWith("@expert:", start) || text.startsWith("@article:", start) || text.startsWith("@share-html:", start) || text.startsWith("@image#", start);
}
/**
* 解析 selection-quote 需要的数据
*/
function parseSelectionQuoteReminder(text, start) {
	let cursor = start;
	while (cursor < text.length && (text[cursor] === " " || text[cursor] === "\n" || text[cursor] === "	")) cursor += 1;
	const TAG_OPEN_PREFIX = "<selection_quote";
	const TAG_CLOSE = "</selection_quote>";
	if (!text.startsWith(TAG_OPEN_PREFIX, cursor)) return;
	const openTagEnd = text.indexOf(">", cursor + 16);
	if (openTagEnd === -1) return;
	const contentEnd = text.indexOf(TAG_CLOSE, openTagEnd + 1);
	if (contentEnd === -1) return;
	const attrText = text.slice(cursor + 16, openTagEnd);
	const inner = text.slice(openTagEnd + 1, contentEnd);
	let endCursor = contentEnd + 18;
	while (endCursor < text.length && (text[endCursor] === " " || text[endCursor] === "\n" || text[endCursor] === "	")) endCursor += 1;
	const sourceMatch = attrText.match(/\bsource="([^"]*)"/);
	return {
		end: endCursor,
		...sourceMatch ? { sourceFile: unescapeXmlAttribute(sourceMatch[1]) } : {},
		selectedText: inner
	};
}
/**
* 反转义 XML 文本节点中的实体。
*
* 覆盖 XML 五个预定义实体（`&quot; &apos; &lt; &gt; &amp;`）以及数字字符引用
* （十进制 `&#dd;` / 十六进制 `&#xhh;`），做到名副其实地处理 XML 文本实体——
* `readSelectionPayload` 解析 `<selection_payload>` 里的 JSON 时，即便异构/历史渲染带入
* `&apos;` / `&#39;` / `&#x2F;` 之类实体也能正确还原，而不仅限于服务端当前会转义的
* `" < > &` 四个字符。
*
* 采用单次 `replace` 扫描：正则引擎从上一处命中的**末尾**继续，不会回头重扫替换结果，
* 因此天然避免"先解 `&amp;` 得到裸 `&`、再被后续实体二次解码"的问题。例如异构生产端
* 写出的 `&#38;amp;`（本意是字面五字符 `&amp;`）会被解成 `&` + `amp;` = `&amp;`，
* 而不是被二次解码成单个 `&`。
*/
function unescapeXmlText(value) {
	return value.replace(XML_ENTITY_RE, (match, named, hex, dec) => {
		if (named) return XML_NAMED_ENTITY_MAP[named];
		if (hex !== void 0) return decodeXmlCharRef(match, Number.parseInt(hex, 16));
		return decodeXmlCharRef(match, Number.parseInt(dec, 10));
	});
}
/**
* 数字字符引用超出合法码点范围时原样保留，避免解出非法/半个字符污染 payload。
* 显式拒绝：非整数 / 越界（<0 或 >0x10FFFF）/ 代理区码点（0xD800–0xDFFF，
* `String.fromCodePoint` 会产出孤立代理字符，破坏字符串完整性）。全部提前 reject 后，
* `String.fromCodePoint` 不会再抛 RangeError，无需 try/catch 吞掉其它意外异常。
*/
function decodeXmlCharRef(original, code) {
	if (!Number.isInteger(code) || code < 0 || code > 1114111 || code >= 55296 && code <= 57343) return original;
	return String.fromCodePoint(code);
}
function unescapeXmlAttribute(value) {
	return unescapeXmlText(value);
}
function parseTypedBadge(text, start, options) {
	const parsedSceneBadge = parseSceneBadge(text, start);
	if (parsedSceneBadge) return parsedSceneBadge;
	for (const kind of TYPED_BADGE_KINDS) {
		if (kind === "scene") continue;
		if (!text.startsWith(`@${kind}`, start)) continue;
		if (kind === "article") {
			const colon = start + 8;
			if (text[colon] !== ":") return;
			const parsedUrl = parseBareUrlBadgeValue(text, colon + 1);
			if (!parsedUrl) return;
			return {
				start,
				end: parsedUrl.end,
				block: createAcpResourceLinkBlock(`${ARTICLE_URI_PREFIX}${parsedUrl.value}`, parsedUrl.value)
			};
		}
		if (kind === "share-html") {
			const colon = start + 11;
			if (text[colon] !== ":") return;
			const parsedUrl = parseShareHtmlBadgeValue(text, colon + 1);
			if (!parsedUrl) return;
			return {
				start,
				end: parsedUrl.end,
				block: createAcpResourceLinkBlock(parsedUrl.value, getShareHtmlChipDisplayName(parsedUrl.value))
			};
		}
		let cursor = start + kind.length + 1;
		let ordinal;
		let tdocFileId;
		let tdocSelectionRef;
		if (kind === "image") {
			if (text[cursor] !== "#") return;
			cursor += 1;
			const ordinalStart = cursor;
			while (cursor < text.length && /[0-9]/.test(text[cursor])) cursor += 1;
			if (ordinalStart === cursor) return;
			ordinal = Number.parseInt(text.slice(ordinalStart, cursor), 10);
		} else if (kind === "tdoc" && text[cursor] === "#") {
			cursor += 1;
			const fileIdStart = cursor;
			while (cursor < text.length && text[cursor] !== ":") cursor += 1;
			if (fileIdStart === cursor) return;
			tdocFileId = decodeURIComponentSafe(text.slice(fileIdStart, cursor));
		} else if (kind === "tdoc-selection") {
			if (text[cursor] === "#") {
				cursor += 1;
				const selectionRefStart = cursor;
				while (cursor < text.length && /[0-9]/.test(text[cursor])) cursor += 1;
				if (selectionRefStart === cursor) return;
				tdocSelectionRef = decodeURIComponentSafe(text.slice(selectionRefStart, cursor));
				if (!isTDocSelectionTimestampRef(tdocSelectionRef)) return;
			}
		}
		if (text[cursor] !== ":") return;
		const parsedValue = parseInlineBadgeValue(text, cursor + 1);
		if (!parsedValue) return;
		if (kind === "skill") return {
			start,
			end: parsedValue.end,
			block: createAcpResourceLinkBlock(`${SKILL_URI_PREFIX}${parsedValue.value}`, parsedValue.value)
		};
		if (kind === "expert") return {
			start,
			end: parsedValue.end,
			block: createAcpResourceLinkBlock(`${EXPERT_URI_PREFIX}${parsedValue.value}`, parsedValue.value)
		};
		if (kind === "tdoc") {
			const fileId = tdocFileId || parsedValue.value;
			return {
				start,
				end: parsedValue.end,
				block: createAcpResourceLinkBlock(`${TDOC_URI_PREFIX}${fileId}`, parsedValue.value)
			};
		}
		if (kind === "tdoc-selection") {
			if (!tdocSelectionRef) return {
				start,
				end: parsedValue.end,
				block: createTextBlock(parsedValue.value)
			};
			return {
				start,
				end: parsedValue.end,
				block: createAcpResourceLinkBlock(`${TDOC_SELECTION_URI_PREFIX}${encodeURIComponent(tdocSelectionRef)}`, parsedValue.value)
			};
		}
		if (kind === "ima") return {
			start,
			end: parsedValue.end,
			block: createAcpResourceLinkBlock(`${IMA_URI_PREFIX}${parsedValue.value}`, parsedValue.value)
		};
		if (kind === "lexiang") return {
			start,
			end: parsedValue.end,
			block: createAcpResourceLinkBlock(`${LEXIANG_URI_PREFIX}${parsedValue.value}`, parsedValue.value)
		};
		if (kind === "netdrive") return {
			start,
			end: parsedValue.end,
			block: createAcpResourceLinkBlock(`${NETDRIVE_URI_PREFIX}${parsedValue.value}`, parsedValue.value)
		};
		if (kind === "agentmail") return {
			start,
			end: parsedValue.end,
			block: createAcpResourceLinkBlock(`${AGENTMAIL_URI_PREFIX}${parsedValue.value}`, parsedValue.value)
		};
		if (kind === "selection") {
			const tail = parseSelectionQuoteReminder(text, parsedValue.end);
			const sourceFile = tail?.sourceFile;
			const restoredUri = sourceFile ? `${SELECTION_URI_PREFIX}${sourceFile}` : `${SELECTION_URI_PREFIX}${parsedValue.value}`;
			const providerHint = tail ? {
				uri: restoredUri,
				name: parsedValue.value,
				...tail.selectedText ? { selectedText: tail.selectedText } : {},
				...sourceFile ? { title: sourceFile } : {}
			} : void 0;
			const block = createAcpResourceLinkBlock(restoredUri, parsedValue.value, providerHint);
			return {
				start,
				end: tail ? tail.end : parsedValue.end,
				block
			};
		}
		if (!ordinal || !options.resolveImageOrdinal) return;
		const imageBlock = options.resolveImageOrdinal(ordinal, parsedValue.value);
		if (!imageBlock) return;
		return {
			start,
			end: parsedValue.end,
			block: imageBlock
		};
	}
}
function parseLexiangUri(uri) {
	if (!uri.startsWith(LEXIANG_URI_PREFIX)) return;
	const rest = uri.slice(10);
	const queryIndex = rest.indexOf("?");
	if (queryIndex < 0) return { entityId: rest };
	const entityId = rest.slice(0, queryIndex);
	const query = rest.slice(queryIndex + 1);
	const result = { entityId };
	for (const pair of query.split("&")) {
		if (!pair) continue;
		const eqIndex = pair.indexOf("=");
		const rawKey = eqIndex < 0 ? pair : pair.slice(0, eqIndex);
		const rawValue = eqIndex < 0 ? "" : pair.slice(eqIndex + 1);
		if (!rawKey) continue;
		let key = rawKey;
		let value = rawValue;
		try {
			key = decodeURIComponent(rawKey);
		} catch {}
		try {
			value = decodeURIComponent(rawValue);
		} catch {}
		if (key === "type" && value) result.entityType = value;
		else if (key === "kbId" && value) result.kbId = value;
		else if (key === "teamId" && value) result.teamId = value;
	}
	return result;
}
function parseSceneBadge(text, start) {
	if (!text.startsWith("@scene", start)) return;
	let cursor = start + 6;
	let sceneId;
	if (text[cursor] === "#") {
		cursor += 1;
		const sceneIdStart = cursor;
		while (cursor < text.length && BARE_BADGE_CHAR_RE.test(text[cursor])) cursor += 1;
		if (sceneIdStart === cursor) return;
		sceneId = text.slice(sceneIdStart, cursor);
	}
	if (text[cursor] !== ":") return;
	const parsedValue = parseInlineBadgeValue(text, cursor + 1);
	if (!parsedValue) return;
	const resolvedSceneId = sceneId || parsedValue.value;
	return {
		start,
		end: parsedValue.end,
		block: createAcpResourceLinkBlock(`${SCENE_URI_PREFIX}${resolvedSceneId}`, parsedValue.value)
	};
}
/**
* 解析裸 URL badge 的值（article / share-html 共用）。
*
* `@article:<url>` / `@share-html:<url>` 的值是裸 URL（如 https://mp.weixin.qq.com/s/xxx?a=b），
* 含 `:` `?` `=` `&` `//` 等字符，不在 BARE_BADGE_CHAR_RE 内，因此单独取值：
* 从 start 读到下一个空白 / 换行 / '@' / 全角（CJK）字符为止（与小程序 deserializationMessage 对齐：
* 终止于空格或 '@'；这里额外把全角字符视作正文边界，避免把中文正文吞进 URL）。
*/
function parseBareUrlBadgeValue(text, start, options = {}) {
	const stopAtCjk = options.stopAtCjk ?? true;
	let cursor = start;
	while (cursor < text.length) {
		const char = text[cursor];
		if (char === " " || char === "	" || char === "\n" || char === "\r" || char === "@") break;
		if (stopAtCjk && char.charCodeAt(0) > 11903) break;
		cursor += 1;
	}
	if (cursor === start) return;
	return {
		end: cursor,
		value: text.slice(start, cursor)
	};
}
/**
* 解析 @share-html 的裸 URL 值，锚定到 ".html" 结尾。
*
* 分享链接固定以 ".html" 结尾（如 .../0/武汉大学怎么样？.html），其后可能**直接紧贴**
* 正文（中文或英文，未必有空格）。只靠空白 / CJK 边界取值会出两种坏情况：
*   - 在中文文件名处腰斩 → URL「解析为半个」（chip 只到 .../0/）；
*   - .html 后紧贴中文正文且无空格 → 把正文吞进 URL。
* 因此：先按空白 / 换行 / '@' 边界取整段（不在 CJK 处截断），再锚定到**最后一个**
* ".html"，URL 到此结束；其后若紧跟 query(?...) / hash(#...) 则一并保留（ASCII，遇
* 空白 / CJK / '@' 即停）。无 ".html" 时回退为空白边界整段，保证不丢信息。
*/
function parseShareHtmlBadgeValue(text, start) {
	const raw = parseBareUrlBadgeValue(text, start, { stopAtCjk: false });
	if (!raw) return;
	const candidate = raw.value;
	const htmlIdx = candidate.toLowerCase().lastIndexOf(".html");
	if (htmlIdx < 0) return raw;
	let endInCandidate = htmlIdx + 5;
	if (candidate[endInCandidate] === "?" || candidate[endInCandidate] === "#") {
		let c = endInCandidate + 1;
		while (c < candidate.length) {
			const ch = candidate[c];
			if (ch === " " || ch === "	" || ch === "\n" || ch === "\r" || ch === "@" || ch.charCodeAt(0) > 11903) break;
			c += 1;
		}
		endInCandidate = c;
	}
	return {
		end: start + endInCandidate,
		value: candidate.slice(0, endInCandidate)
	};
}
/**
* 计算 share-html chip 的显示名：取 URL 路径最后一段（去掉 query / hash 后），
* 并尽量 decode 一次百分号编码。例：
*   https://host/page/xxx/0/武汉大学怎么样？.html  -> 武汉大学怎么样？.html
*   https://host/a/b/report.html?id=1&k=v        -> report.html
* 取不到有效末段时回退为完整 URL，保证不丢信息。
*/
function getShareHtmlChipDisplayName(url) {
	let path = url;
	const hashIndex = path.indexOf("#");
	if (hashIndex >= 0) path = path.slice(0, hashIndex);
	const queryIndex = path.indexOf("?");
	if (queryIndex >= 0) path = path.slice(0, queryIndex);
	const lastSegment = path.replace(/\/+$/, "").split("/").pop();
	if (!lastSegment) return url;
	return decodeURIComponentSafe(lastSegment);
}
function parseInlineBadgeValue(text, start) {
	if (text[start] === "\"") {
		let cursor = start + 1;
		let value = "";
		while (cursor < text.length) {
			const char = text[cursor];
			if (char === "\\") {
				const nextChar = text[cursor + 1];
				if (nextChar === "\"" || nextChar === "\\") {
					value += nextChar;
					cursor += 2;
					continue;
				}
			}
			if (char === "\"") return {
				end: cursor + 1,
				value
			};
			value += char;
			cursor += 1;
		}
		return;
	}
	let cursor = start;
	while (cursor < text.length && BARE_BADGE_CHAR_RE.test(text[cursor])) cursor += 1;
	if (cursor === start) return;
	return {
		end: cursor,
		value: text.slice(start, cursor)
	};
}
function parseSlashToken(text, start) {
	if (!isSlashTokenBoundary(text, start)) return;
	const identStart = start + 1;
	if (!SLASH_IDENT_START_RE.test(text[identStart] || "")) return;
	let cursor = identStart;
	while (cursor < text.length && SLASH_IDENT_CHAR_RE.test(text[cursor])) cursor += 1;
	if (text[cursor] === "/") return;
	const nextChar = text[cursor];
	if (nextChar && !isSlashTokenBoundaryEnd(nextChar)) return;
	const slashName = text.slice(identStart, cursor);
	return {
		start,
		end: cursor,
		block: createAcpResourceLinkBlock(`${COMMAND_URI_PREFIX}${slashName}`, `/${slashName}`)
	};
}
function isReferenceBadgeBoundary(text, index) {
	if (index === 0) return true;
	const prevChar = text[index - 1];
	return !BARE_BADGE_CHAR_RE.test(prevChar);
}
function isSlashTokenBoundary(text, index) {
	const prevMeaningfulChar = getPreviousMeaningfulChar(text, index);
	if (!prevMeaningfulChar) return true;
	if (prevMeaningfulChar === "<") return false;
	if (prevMeaningfulChar === ":" || prevMeaningfulChar === "/") return false;
	return !WORDISH_CHAR_RE.test(prevMeaningfulChar);
}
function isSlashTokenBoundaryEnd(char) {
	return /\s/u.test(char) || /[.,!?;:，。！？；：)\]}"']/.test(char);
}
function getPreviousMeaningfulChar(text, index) {
	for (let cursor = index - 1; cursor >= 0; cursor -= 1) {
		const char = text[cursor];
		if (char === " " || char === "	") continue;
		return char;
	}
}
function mergeAdjacentTextBlocks(blocks) {
	const merged = [];
	for (const block of blocks) {
		if (block.type === "text" && typeof block.text === "string" && block.text.length === 0) continue;
		const previous = merged[merged.length - 1];
		if (previous?.type === "text" && block.type === "text") {
			previous.text += block.text;
			continue;
		}
		merged.push(block);
	}
	return merged;
}
function applyInlineImageLabel(block, label) {
	const nextBlock = {
		...block,
		_meta: {
			...block._meta || {},
			displayAsPhrase: true
		}
	};
	if (!nextBlock._meta.filename) nextBlock._meta.filename = label;
	if (!nextBlock.uri) nextBlock.uri = label;
	return nextBlock;
}
function getLastPathSegment(pathOrUri) {
	if (!pathOrUri) return;
	return pathOrUri.replace(/\/+$/, "").split("/").pop() || void 0;
}
function defaultConvertPersistedImageBlock(block) {
	if (block.type === "image_blob_ref" && block.blob_path && block.mime) return {
		type: "image",
		mimeType: block.mime,
		data: block.blob_path,
		uri: block.original_filename || getLastPathSegment(block.blob_path) || block.blob_path,
		_meta: {
			blobPath: block.blob_path,
			displayAsPhrase: true,
			filename: block.original_filename || getLastPathSegment(block.blob_path) || block.blob_path
		}
	};
	if (block.type !== "input_image" || !block.image) return;
	const imageBlock = {
		type: "image",
		_meta: { displayAsPhrase: true }
	};
	if (block.original_filename) {
		imageBlock._meta.filename = block.original_filename;
		imageBlock.uri = block.original_filename;
	}
	if (typeof block.image === "string") {
		const parsed = parseDataUri(block.image);
		if (!parsed) return;
		imageBlock.mimeType = parsed.mimeType;
		imageBlock.data = parsed.data;
		return imageBlock;
	}
	if (typeof block.image === "object" && block.image) {
		if (block.image.type === "image_blob_ref" && block.image.blob_path) {
			imageBlock.mimeType = block.image.mime;
			imageBlock.data = block.image.blob_path;
			imageBlock.uri = block.image.original_filename || getLastPathSegment(block.image.blob_path) || block.image.blob_path;
			imageBlock._meta.blobPath = block.image.blob_path;
			if (!imageBlock._meta.filename && block.image.original_filename) imageBlock._meta.filename = block.image.original_filename;
			return imageBlock;
		}
		if (typeof block.image.data === "string") {
			imageBlock.mimeType = block.image.mediaType || "image/png";
			imageBlock.data = block.image.data;
			return imageBlock;
		}
	}
}
function parseDataUri(dataUri) {
	const match = dataUri.match(/^data:([^;]+);base64,(.+)$/);
	if (!match) return;
	return {
		mimeType: match[1],
		data: match[2]
	};
}
/**
* Normalize an image block (of `type: 'image'`) into ACP ImageContent shape.
*
* Handles two persisted forms:
* 1. ACP shape: `{ type: 'image', mimeType, data|uri, ... }` → passthrough.
* 2. Anthropic SDK shape: `{ type: 'image', source: { type: 'base64', media_type, data } | { type: 'url', url } }`
*    → lift `source.media_type/data/url` to top-level `mimeType/data/uri`.
*
* The second shape appears in CLI-persisted user messages when the user pastes
* an image directly (SDK ImageContentBlock written into JSONL). On session
* reload the raw SDK block would reach the frontend unchanged, which has no
* `data`/`mimeType` and therefore renders as a JSON.stringify fallback.
*/
function normalizePersistedImageBlockToAcp(block) {
	if (typeof block.mimeType === "string" && (typeof block.data === "string" || typeof block.uri === "string")) return block;
	const source = block.source;
	if (source && typeof source === "object") {
		if (source.type === "base64" && typeof source.data === "string") {
			const normalized = {
				type: "image",
				mimeType: typeof source.media_type === "string" ? source.media_type : "image/png",
				data: source.data
			};
			if (typeof block.uri === "string") normalized.uri = block.uri;
			if (block._meta && typeof block._meta === "object") normalized._meta = block._meta;
			return normalized;
		}
		if (source.type === "url" && typeof source.url === "string") {
			const normalized = {
				type: "image",
				mimeType: typeof source.media_type === "string" ? source.media_type : "image/png",
				uri: source.url
			};
			if (block._meta && typeof block._meta === "object") normalized._meta = block._meta;
			return normalized;
		}
	}
}
/**
* Strip inline badge markup from a plain text string, returning only the human-readable values.
*
* Examples:
*  - `@ima:"知识库名"` → `知识库名`
*  - `@skill:mySkill` → `mySkill`
*  - `@scene:demo` → `demo`
*  - `@tdoc#fileId:"文档标题"` / `@tdoc:"文档标题"` → `文档标题`
*  - `@tdoc-selection#timestamp:"选区"` → `选区`
*  - `@lexiang:"乐享文档标题"` → `乐享文档标题`
*  - `@image#1:label` → `label`
*  - `@/path/to/file` → `/path/to/file`
*  - `Hello @ima:"KB" world` → `Hello KB world`
*/
function stripInlineBadgesFromText(text) {
	if (!text) return text;
	let result = "";
	let cursor = 0;
	while (cursor < text.length) {
		if (text[cursor] !== "@") {
			result += text[cursor];
			cursor += 1;
			continue;
		}
		if (!isReferenceBadgeBoundary(text, cursor)) {
			result += text[cursor];
			cursor += 1;
			continue;
		}
		const typedResult = tryStripTypedBadge(text, cursor);
		if (typedResult) {
			result += typedResult.value;
			cursor = typedResult.end;
			continue;
		}
		if (!startsWithExplicitTypedBadgePrefix(text, cursor)) {
			const parsedPath = parseInlineBadgeValue(text, cursor + 1);
			if (parsedPath) {
				result += parsedPath.value;
				cursor = parsedPath.end;
				continue;
			}
		}
		result += text[cursor];
		cursor += 1;
	}
	return result;
}
function tryStripTypedBadge(text, start) {
	if (text.startsWith("@scene", start)) {
		let cursor = start + 6;
		if (text[cursor] === "#") {
			cursor += 1;
			while (cursor < text.length && BARE_BADGE_CHAR_RE.test(text[cursor])) cursor += 1;
		}
		if (text[cursor] !== ":") return;
		const parsed = parseInlineBadgeValue(text, cursor + 1);
		if (!parsed) return;
		return {
			end: parsed.end,
			value: parsed.value
		};
	}
	if (text.startsWith("@image#", start)) {
		let cursor = start + 7;
		while (cursor < text.length && /[0-9]/.test(text[cursor])) cursor += 1;
		if (text[cursor] !== ":") return;
		const parsed = parseInlineBadgeValue(text, cursor + 1);
		if (!parsed) return;
		return {
			end: parsed.end,
			value: parsed.value
		};
	}
	if (text.startsWith("@article:", start)) {
		const parsed = parseBareUrlBadgeValue(text, start + 9);
		if (!parsed) return;
		return {
			end: parsed.end,
			value: parsed.value
		};
	}
	if (text.startsWith("@share-html:", start)) {
		const parsed = parseShareHtmlBadgeValue(text, start + 12);
		if (!parsed) return;
		return {
			end: parsed.end,
			value: parsed.value
		};
	}
	const hashBadgePrefix = text.startsWith("@tdoc-selection#", start) ? "@tdoc-selection#" : text.startsWith("@tdoc#", start) ? "@tdoc#" : void 0;
	if (hashBadgePrefix) {
		let cursor = start + hashBadgePrefix.length;
		if (hashBadgePrefix === "@tdoc-selection#") while (cursor < text.length && /[0-9]/.test(text[cursor])) cursor += 1;
		else while (cursor < text.length && text[cursor] !== ":") cursor += 1;
		if (text[cursor] !== ":") return;
		if (hashBadgePrefix === "@tdoc-selection#") {
			if (!isTDocSelectionTimestampRef(decodeURIComponentSafe(text.slice(start + hashBadgePrefix.length, cursor)))) return;
		}
		const parsed = parseInlineBadgeValue(text, cursor + 1);
		if (!parsed) return;
		return {
			end: parsed.end,
			value: parsed.value
		};
	}
	for (const kind of [
		"skill",
		"tdoc",
		"tdoc-selection",
		"ima",
		"lexiang",
		"agentmail",
		"expert"
	]) {
		const prefix = `@${kind}:`;
		if (text.startsWith(prefix, start)) {
			const parsed = parseInlineBadgeValue(text, start + prefix.length);
			if (!parsed) return;
			return {
				end: parsed.end,
				value: parsed.value
			};
		}
	}
}
var ACP_RESOURCE_LINK_PROVIDER_DATA_KEY, COMMAND_URI_PREFIX, FILE_URI_PREFIX, SCENE_URI_PREFIX, SKILL_URI_PREFIX, TDOC_URI_PREFIX, IMA_URI_PREFIX, LEXIANG_URI_PREFIX, NETDRIVE_URI_PREFIX, SELECTION_URI_PREFIX, TDOC_SELECTION_URI_PREFIX, TDOC_SELECTION_MENTION_TYPE, AGENTMAIL_URI_PREFIX, EXPERT_URI_PREFIX, ARTICLE_URI_PREFIX, HTTP_URI_PREFIX, HTTPS_URI_PREFIX, TYPED_BADGE_KINDS, BARE_BADGE_CHAR_RE, WORDISH_CHAR_RE, SLASH_IDENT_START_RE, SLASH_IDENT_CHAR_RE, INLINE_IMAGE_BADGE_RE, XML_NAMED_ENTITY_MAP, XML_ENTITY_RE;
var init_prompt_codec = __esmMin((() => {
	init_prompt_context_xml();
	ACP_RESOURCE_LINK_PROVIDER_DATA_KEY = "acpResourceLink";
	COMMAND_URI_PREFIX = "command://";
	FILE_URI_PREFIX = "file://";
	SCENE_URI_PREFIX = "scene://";
	SKILL_URI_PREFIX = "skill://";
	TDOC_URI_PREFIX = "tdoc://";
	IMA_URI_PREFIX = "ima://";
	LEXIANG_URI_PREFIX = "lexiang://";
	NETDRIVE_URI_PREFIX = "netdrive://";
	SELECTION_URI_PREFIX = "selection://";
	TDOC_SELECTION_URI_PREFIX = "tdoc-selection://";
	TDOC_SELECTION_MENTION_TYPE = "tencentDocsSelection";
	AGENTMAIL_URI_PREFIX = "agentmail://";
	EXPERT_URI_PREFIX = "expert://";
	ARTICLE_URI_PREFIX = "article://";
	HTTP_URI_PREFIX = "http://";
	HTTPS_URI_PREFIX = "https://";
	TYPED_BADGE_KINDS = new Set([
		"scene",
		"image",
		"skill",
		"tdoc-selection",
		"tdoc",
		"ima",
		"lexiang",
		"netdrive",
		"selection",
		"expert",
		"article",
		"share-html",
		"agentmail"
	]);
	BARE_BADGE_CHAR_RE = /[A-Za-z0-9_./-]/;
	WORDISH_CHAR_RE = /[\p{L}\p{N}_-]/u;
	SLASH_IDENT_START_RE = /[A-Za-z0-9_]/;
	SLASH_IDENT_CHAR_RE = /[A-Za-z0-9_:-]/;
	INLINE_IMAGE_BADGE_RE = /@image#\d+:/;
	XML_NAMED_ENTITY_MAP = {
		quot: "\"",
		apos: "'",
		lt: "<",
		gt: ">",
		amp: "&"
	};
	XML_ENTITY_RE = /&(?:(quot|apos|lt|gt|amp)|#x([0-9a-fA-F]+)|#(\d+));/g;
}));
//#endregion
//#region ../../packages/agent-client-protocol/src/common/sdk.ts
async function loadAcpSdk() {
	return __vitePreload(() => import("./acp-BO6mT7xd.js"), __vite__mapDeps([0,1]), import.meta.url);
}
var ACP_METHOD_SESSION_SET_MODEL;
var init_sdk = __esmMin((() => {
	init_preload_helper();
	ACP_METHOD_SESSION_SET_MODEL = "session/set_model";
}));
//#endregion
//#region ../../packages/agent-client-protocol/src/common/transport/streamable-http.ts
function parseSSELine(line, currentEvent) {
	if (line === "") {
		if (currentEvent.data) return {
			event: {
				type: currentEvent.type || "message",
				data: currentEvent.data,
				id: currentEvent.id
			},
			reset: true,
			isComment: false
		};
		return {
			reset: true,
			isComment: false
		};
	}
	if (line.startsWith(":")) return {
		reset: false,
		isComment: true
	};
	const colonIndex = line.indexOf(":");
	if (colonIndex === -1) return {
		reset: false,
		isComment: false
	};
	const field = line.slice(0, colonIndex);
	let value = line.slice(colonIndex + 1);
	if (value.startsWith(" ")) value = value.slice(1);
	switch (field) {
		case "event":
			if (currentEvent.type && currentEvent.type !== value) currentEvent.data = void 0;
			currentEvent.type = value;
			break;
		case "data":
			currentEvent.data = (currentEvent.data || "") + value;
			break;
		case "id":
			currentEvent.id = value;
			break;
	}
	return {
		reset: false,
		isComment: false
	};
}
function streamableHttp(options) {
	const { endpoint, authToken, headers: customHeaders = {}, reconnect = {}, signal: externalSignal, fetch: customFetch = globalThis.fetch, onConnect, onDisconnect, onError, heartbeatTimeout = 6e4, connectionTimeout = 3e4, postTimeout = 3e4, backpressure = {} } = options;
	const { enabled: reconnectEnabled = true, initialDelay = 1e3, maxDelay = 3e4, maxRetries = Infinity, jitter: jitterEnabled = true } = reconnect;
	const { highWaterMark = 100, lowWaterMark = 50, pauseTimeout = 5e3 } = backpressure;
	let connectionId;
	let lastEventId;
	let reconnectAttempts = 0;
	let closed = false;
	let isClosing = false;
	let connectionReady;
	let resolveConnection;
	let rejectConnection;
	let connectionVersion = 0;
	connectionReady = new Promise((resolve, reject) => {
		resolveConnection = resolve;
		rejectConnection = reject;
	});
	const abortController = new AbortController();
	function isAborted() {
		return abortController.signal.aborted || (externalSignal?.aborted ?? false);
	}
	function getSignal() {
		const anyFn = AbortSignal.any;
		if (externalSignal && typeof anyFn === "function") return anyFn([externalSignal, abortController.signal]);
		return abortController.signal;
	}
	const combinedSignal = getSignal();
	const messageQueue = [];
	const messageResolvers = [];
	let streamError = null;
	let isPaused = false;
	let resumeReading = null;
	const backgroundSSEProcessors = /* @__PURE__ */ new Set();
	let activeSSEReader = null;
	let lastActivity = Date.now();
	let heartbeatCheckTimer;
	function enqueueMessage(message) {
		if (messageResolvers.length > 0) {
			messageResolvers.shift()(message);
			return true;
		} else {
			messageQueue.push(message);
			if (messageQueue.length >= highWaterMark) {
				isPaused = true;
				return false;
			}
			return true;
		}
	}
	function dequeueMessage() {
		if (closed) return Promise.resolve(null);
		if (streamError) return Promise.reject(streamError);
		if (messageQueue.length > 0) {
			const message = messageQueue.shift();
			if (isPaused && messageQueue.length <= lowWaterMark) {
				isPaused = false;
				const resume = resumeReading;
				if (resume) queueMicrotask(() => resume());
			}
			return Promise.resolve(message);
		}
		return new Promise((resolve) => {
			messageResolvers.push(resolve);
		});
	}
	function updateLastActivity() {
		lastActivity = Date.now();
	}
	function startHeartbeatCheck(triggerReconnect) {
		if (heartbeatTimeout <= 0) return;
		heartbeatCheckTimer = setInterval(() => {
			if (Date.now() - lastActivity > heartbeatTimeout) {
				console.warn("[StreamableHTTP] Heartbeat timeout, triggering reconnect");
				triggerReconnect();
			}
		}, 1e4);
	}
	function stopHeartbeatCheck() {
		if (heartbeatCheckTimer) {
			clearInterval(heartbeatCheckTimer);
			heartbeatCheckTimer = void 0;
		}
	}
	/**
	* Calculate reconnect delay with optional jitter
	*/
	function calculateDelay(attempt) {
		const baseDelay = Math.min(initialDelay * Math.pow(2, attempt - 1), maxDelay);
		if (!jitterEnabled) return baseDelay;
		const jitterFactor = .25 * (Math.random() * 2 - 1);
		return Math.round(baseDelay * (1 + jitterFactor));
	}
	function closeWithError(error) {
		streamError = error;
		closed = true;
		stopHeartbeatCheck();
		if (resumeReading) {
			resumeReading();
			resumeReading = null;
		}
		rejectConnection(error);
		onError?.(error);
		while (messageResolvers.length > 0) messageResolvers.shift()(null);
	}
	function closeNormally() {
		closed = true;
		stopHeartbeatCheck();
		if (resumeReading) {
			resumeReading();
			resumeReading = null;
		}
		backgroundSSEProcessors.clear();
		while (messageResolvers.length > 0) messageResolvers.shift()(null);
	}
	function cancelActiveReaderThenAbort() {
		if (activeSSEReader) {
			const reader = activeSSEReader;
			activeSSEReader = null;
			reader.cancel().catch(() => {}).finally(() => {
				abortController.abort();
			});
			return;
		}
		abortController.abort();
	}
	async function sendDelete() {
		if (!connectionId || isClosing) return;
		isClosing = true;
		const currentConnectionId = connectionId;
		try {
			const headers = buildHeaders();
			headers["Acp-Connection-Id"] = currentConnectionId;
			await customFetch(endpoint, {
				method: "DELETE",
				headers,
				signal: AbortSignal.timeout(5e3)
			});
		} catch {} finally {
			if (currentConnectionId) onDisconnect?.(currentConnectionId);
			isClosing = false;
		}
	}
	function buildHeaders() {
		const headers = { ...customHeaders };
		if (authToken) headers["Authorization"] = `Bearer ${authToken}`;
		return headers;
	}
	async function processSSEStream(reader) {
		const decoder = new TextDecoder();
		let buffer = "";
		let currentEvent = {};
		try {
			while (true) {
				if (isPaused) {
					await new Promise((resolve) => {
						let resolved = false;
						const timeoutId = setTimeout(() => {
							if (!resolved) {
								resolved = true;
								console.warn("[StreamableHTTP] Backpressure pause timeout, forcing resume");
								resolve();
							}
						}, pauseTimeout);
						resumeReading = () => {
							if (!resolved) {
								resolved = true;
								clearTimeout(timeoutId);
								resolve();
							}
						};
					});
					resumeReading = null;
				}
				const { value, done } = await reader.read();
				if (done) break;
				buffer += decoder.decode(value, { stream: true });
				const lines = buffer.split("\n");
				buffer = lines.pop() || "";
				for (const line of lines) {
					const { event, reset, isComment } = parseSSELine(line, currentEvent);
					if (isComment) {
						updateLastActivity();
						continue;
					}
					if (event) {
						updateLastActivity();
						if (event.id) lastEventId = event.id;
						if (event.type !== "message") continue;
						try {
							const message = JSON.parse(event.data);
							if (message && typeof message === "object" && "jsonrpc" in message) enqueueMessage(message);
						} catch {
							console.error("[StreamableHTTP] Failed to parse SSE data:", event.data);
						}
					}
					if (reset) currentEvent = {};
				}
			}
		} finally {
			reader.releaseLock();
		}
	}
	/**
	* Process SSE stream in background without blocking the caller.
	* This prevents deadlock when POST responses return SSE streams.
	*/
	function processSSEStreamBackground(reader) {
		const promise = processSSEStream(reader).catch((error) => {
			console.error("[StreamableHTTP] Background SSE processing error:", error);
			onError?.(error instanceof Error ? error : new Error(String(error)));
		}).finally(() => {
			backgroundSSEProcessors.delete(promise);
		});
		backgroundSSEProcessors.add(promise);
	}
	async function startSSEConnection() {
		let currentReader = null;
		const triggerReconnect = () => {
			if (currentReader) currentReader.cancel().catch(() => {});
		};
		while (!closed && !isAborted()) try {
			const headers = buildHeaders();
			headers["Accept"] = "text/event-stream";
			if (lastEventId) headers["Last-Event-ID"] = lastEventId;
			if (connectionId) headers["Acp-Connection-Id"] = connectionId;
			const connectTimeoutMs = connectionTimeout > 0 ? connectionTimeout : 3e4;
			const connectController = new AbortController();
			const connectTimer = setTimeout(() => connectController.abort(), connectTimeoutMs);
			if (externalSignal) externalSignal.addEventListener("abort", () => connectController.abort(), { once: true });
			abortController.signal.addEventListener("abort", () => connectController.abort(), { once: true });
			let response;
			try {
				response = await customFetch(endpoint, {
					method: "GET",
					headers,
					signal: connectController.signal
				});
			} finally {
				clearTimeout(connectTimer);
			}
			if (!response.ok) throw new Error(`HTTP ${response.status}`);
			const newConnectionId = response.headers.get("Acp-Connection-Id");
			if (!newConnectionId) throw new Error("Server did not return Acp-Connection-Id header");
			const previousConnectionId = connectionId;
			connectionVersion++;
			connectionId = newConnectionId;
			resolveConnection();
			if (previousConnectionId && previousConnectionId !== newConnectionId) onDisconnect?.(previousConnectionId);
			onConnect?.(newConnectionId);
			reconnectAttempts = 0;
			updateLastActivity();
			startHeartbeatCheck(triggerReconnect);
			const reader = response.body?.getReader();
			if (reader) {
				currentReader = reader;
				activeSSEReader = reader;
				await processSSEStream(reader);
				currentReader = null;
				activeSSEReader = null;
			}
			stopHeartbeatCheck();
			const endedConnectionId = connectionId;
			connectionId = void 0;
			if (endedConnectionId) onDisconnect?.(endedConnectionId);
			if (!reconnectEnabled || closed) break;
			connectionReady = new Promise((resolve, reject) => {
				resolveConnection = resolve;
				rejectConnection = reject;
			});
			const reconnectDelay = calculateDelay(1);
			await new Promise((resolve) => setTimeout(resolve, reconnectDelay));
		} catch (error) {
			stopHeartbeatCheck();
			currentReader = null;
			activeSSEReader = null;
			if (isAborted() || closed) break;
			reconnectAttempts++;
			if (reconnectAttempts > maxRetries) {
				closeWithError(/* @__PURE__ */ new Error(`SSE reconnect failed after ${maxRetries} attempts`));
				break;
			}
			const delay = calculateDelay(reconnectAttempts);
			console.warn(`[StreamableHTTP] SSE error, retrying in ${delay}ms (attempt ${reconnectAttempts}):`, error);
			await new Promise((resolve) => setTimeout(resolve, delay));
		}
	}
	async function sendMessage(message) {
		if (closed) throw new Error("Connection is closed");
		const maxWaitAttempts = 5;
		let currentConnectionId;
		for (let attempt = 0; attempt < maxWaitAttempts; attempt++) {
			const versionBeforeWait = connectionVersion;
			await connectionReady;
			if (versionBeforeWait !== connectionVersion && versionBeforeWait > 0) await connectionReady;
			currentConnectionId = connectionId;
			if (currentConnectionId) break;
			if (attempt < maxWaitAttempts - 1) await new Promise((resolve) => setTimeout(resolve, 100));
		}
		if (!currentConnectionId) throw new Error("No connection ID available after multiple attempts");
		const headers = buildHeaders();
		headers["Content-Type"] = "application/json";
		headers["Accept"] = "application/json, text/event-stream";
		headers["Acp-Connection-Id"] = currentConnectionId;
		const postController = new AbortController();
		let timeoutId;
		const postSignal = postTimeout > 0 ? postController.signal : combinedSignal;
		if (postTimeout > 0) {
			timeoutId = setTimeout(() => postController.abort(), postTimeout);
			if (externalSignal) externalSignal.addEventListener("abort", () => postController.abort(), { once: true });
			abortController.signal.addEventListener("abort", () => postController.abort(), { once: true });
		}
		try {
			const response = await customFetch(endpoint, {
				method: "POST",
				headers,
				body: JSON.stringify(message),
				signal: postSignal
			});
			if (!response.ok) {
				const errorText = await response.text().catch(() => "Unknown error");
				throw new Error(`HTTP ${response.status}: ${errorText}`);
			}
			const contentType = response.headers.get("Content-Type") || "";
			if (contentType.includes("text/event-stream")) {
				const reader = response.body?.getReader();
				if (reader) processSSEStreamBackground(reader);
			} else if (contentType.includes("application/json")) {
				const data = await response.json();
				if (data && typeof data === "object" && "jsonrpc" in data) enqueueMessage(data);
			}
		} finally {
			if (timeoutId) clearTimeout(timeoutId);
		}
	}
	startSSEConnection().catch((error) => {
		console.error("[StreamableHTTP] SSE connection error:", error);
	});
	const readable = new ReadableStream({
		async pull(controller) {
			const message = await dequeueMessage();
			if (message === null) controller.close();
			else controller.enqueue(message);
		},
		cancel() {
			closeNormally();
			cancelActiveReaderThenAbort();
		}
	});
	const writable = new WritableStream({
		async write(message) {
			await sendMessage(message);
		},
		close() {
			closeNormally();
			cancelActiveReaderThenAbort();
		},
		abort(reason) {
			closeWithError(reason instanceof Error ? reason : new Error(String(reason)));
			cancelActiveReaderThenAbort();
		}
	});
	async function close() {
		if (closed) return;
		await sendDelete();
		closeNormally();
		if (activeSSEReader) {
			try {
				await activeSSEReader.cancel();
			} catch {}
			activeSSEReader = null;
		}
		abortController.abort();
	}
	return {
		readable,
		writable,
		get connectionId() {
			return connectionId;
		},
		get ready() {
			return connectionReady;
		},
		close
	};
}
var init_streamable_http = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-client-protocol/src/common/transport/connectrpc-http.ts
var init_connectrpc_http = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-client-protocol/src/common/client/artifacts.ts
var ArtifactManager;
var init_artifacts = __esmMin((() => {
	ArtifactManager = class {
		constructor(config) {
			this.artifacts = /* @__PURE__ */ new Map();
			this.eventCallbacks = /* @__PURE__ */ new Set();
			this.logger = config.logger;
		}
		/**
		* Register a callback for artifact events
		*/
		onArtifactEvent(callback) {
			this.eventCallbacks.add(callback);
			return () => {
				this.eventCallbacks.delete(callback);
			};
		}
		/**
		* Handle an artifact notification from the agent
		*/
		handleNotification(notification) {
			const { event } = notification;
			if (event === "deleted") {
				const { artifact } = notification;
				const existing = this.artifacts.get(artifact.uri);
				this.logger?.debug(`Artifact deleted: ${artifact.uri}`);
				this.artifacts.delete(artifact.uri);
				if (existing) this.notifyCallbacks(existing, event);
			} else {
				const { artifact } = notification;
				this.logger?.debug(`Artifact ${event}: ${artifact.uri} (${artifact.type})`);
				this.artifacts.set(artifact.uri, artifact);
				this.notifyCallbacks(artifact, event);
			}
		}
		notifyCallbacks(artifact, event) {
			for (const callback of this.eventCallbacks) try {
				callback(artifact, event);
			} catch (err) {
				this.logger?.error("Error in artifact event callback:", err);
			}
		}
		/**
		* Get an artifact by URI (used internally for deleted event handling)
		*/
		get(uri) {
			return this.artifacts.get(uri);
		}
		/**
		* Clear all artifacts
		*/
		clear() {
			this.artifacts.clear();
			this.logger?.debug("Cleared all artifacts");
		}
	};
})), DEFAULT_PERMISSION_TIMEOUT, DEFAULT_QUESTION_TIMEOUT, CLOUD_CLIENT_CAPABILITIES;
var init_constants = __esmMin((() => {
	init_types$5();
	DEFAULT_PERMISSION_TIMEOUT = 3e5;
	DEFAULT_QUESTION_TIMEOUT = 3e5;
	CLOUD_CLIENT_CAPABILITIES = { fs: {
		readTextFile: false,
		writeTextFile: false
	} };
}));
//#endregion
//#region ../../packages/agent-client-protocol/src/common/client/errors.ts
var ACPClientError, ConnectionError, InitializationError, SessionError, TimeoutError, InvalidStateError;
var init_errors = __esmMin((() => {
	ACPClientError = class extends Error {
		constructor(message, code, cause) {
			super(message);
			this.name = "ACPClientError";
			this.code = code;
			this.cause = cause;
			if (Error.captureStackTrace) Error.captureStackTrace(this, this.constructor);
		}
	};
	ConnectionError = class extends ACPClientError {
		constructor(message, cause) {
			super(message, "CONNECTION_ERROR", cause);
			this.name = "ConnectionError";
		}
	};
	InitializationError = class extends ACPClientError {
		constructor(message, cause) {
			super(message, "INITIALIZATION_ERROR", cause);
			this.name = "InitializationError";
		}
	};
	SessionError = class extends ACPClientError {
		constructor(message, sessionId, agentIdOrCause, cause) {
			if (agentIdOrCause instanceof Error) {
				super(message, "SESSION_ERROR", agentIdOrCause);
				this.agentId = void 0;
			} else {
				super(message, "SESSION_ERROR", cause);
				this.agentId = agentIdOrCause;
			}
			this.name = "SessionError";
			this.sessionId = sessionId;
		}
	};
	TimeoutError = class extends ACPClientError {
		constructor(operation, timeoutMs) {
			super(`Operation '${operation}' timed out after ${timeoutMs}ms`, "TIMEOUT_ERROR");
			this.name = "TimeoutError";
			this.operation = operation;
			this.timeoutMs = timeoutMs;
		}
	};
	InvalidStateError = class extends ACPClientError {
		constructor(operation, currentState, expectedStates) {
			super(`Cannot perform '${operation}' in state '${currentState}'. Expected: ${expectedStates.join(" or ")}`, "INVALID_STATE_ERROR");
			this.name = "InvalidStateError";
			this.currentState = currentState;
			this.expectedStates = expectedStates;
		}
	};
}));
//#endregion
//#region ../../packages/agent-client-protocol/src/common/client/events.ts
var EventEmitter;
var init_events = __esmMin((() => {
	EventEmitter = class {
		constructor() {
			this.listeners = /* @__PURE__ */ new Map();
			this.onceListeners = /* @__PURE__ */ new Map();
		}
		/**
		* Add an event listener
		*/
		on(event, listener) {
			if (!this.listeners.has(event)) this.listeners.set(event, /* @__PURE__ */ new Set());
			this.listeners.get(event).add(listener);
			return this;
		}
		/**
		* Remove an event listener
		*/
		off(event, listener) {
			const eventListeners = this.listeners.get(event);
			if (eventListeners) eventListeners.delete(listener);
			const onceEventListeners = this.onceListeners.get(event);
			if (onceEventListeners) onceEventListeners.delete(listener);
			return this;
		}
		/**
		* Add a one-time event listener
		*/
		once(event, listener) {
			if (!this.onceListeners.has(event)) this.onceListeners.set(event, /* @__PURE__ */ new Set());
			this.onceListeners.get(event).add(listener);
			return this;
		}
		/**
		* Emit an event to all registered listeners
		* Returns true if any listeners were invoked
		*/
		emit(event, data) {
			const regularListeners = this.listeners.get(event);
			const onceEventListeners = this.onceListeners.get(event);
			let hasListeners = false;
			if (regularListeners && regularListeners.size > 0) {
				hasListeners = true;
				for (const listener of regularListeners) try {
					const result = listener(data);
					if (result instanceof Promise) result.catch((err) => {
						console.error(`Error in async event listener for '${String(event)}':`, err);
					});
				} catch (err) {
					console.error(`Error in event listener for '${String(event)}':`, err);
				}
			}
			if (onceEventListeners && onceEventListeners.size > 0) {
				hasListeners = true;
				const listenersToCall = Array.from(onceEventListeners);
				this.onceListeners.delete(event);
				for (const listener of listenersToCall) try {
					const result = listener(data);
					if (result instanceof Promise) result.catch((err) => {
						console.error(`Error in async once event listener for '${String(event)}':`, err);
					});
				} catch (err) {
					console.error(`Error in once event listener for '${String(event)}':`, err);
				}
			}
			return hasListeners;
		}
		/**
		* Remove all listeners for an event, or all listeners if no event specified
		*/
		removeAllListeners(event) {
			if (event !== void 0) {
				this.listeners.delete(event);
				this.onceListeners.delete(event);
			} else {
				this.listeners.clear();
				this.onceListeners.clear();
			}
			return this;
		}
		/**
		* Get the number of listeners for an event
		*/
		listenerCount(event) {
			return (this.listeners.get(event)?.size ?? 0) + (this.onceListeners.get(event)?.size ?? 0);
		}
		/**
		* Get all event names that have listeners
		*/
		eventNames() {
			const names = /* @__PURE__ */ new Set();
			for (const event of this.listeners.keys()) names.add(event);
			for (const event of this.onceListeners.keys()) names.add(event);
			return Array.from(names);
		}
	};
}));
//#endregion
//#region ../../packages/agent-client-protocol/src/common/client/extensions.ts
var ExtensionManager;
var init_extensions = __esmMin((() => {
	init_constants();
	ExtensionManager = class {
		constructor(config = {}) {
			this.handlers = /* @__PURE__ */ new Map();
			this.config = config;
		}
		/**
		* Register a handler for a specific extension method
		*/
		registerHandler(method, handler) {
			this.handlers.set(method, handler);
			return () => {
				this.handlers.delete(method);
			};
		}
		/**
		* Set a fallback handler for unknown extensions
		*/
		setFallbackHandler(handler) {
			this.fallbackHandler = handler;
		}
		/**
		* Handle an extension notification
		*/
		async handleNotification(method, params) {
			this.config.logger?.debug(`Extension notification: ${method}`);
			const handler = this.handlers.get(method);
			if (handler) {
				await handler(method, params);
				return;
			}
			if (this.fallbackHandler) {
				await this.fallbackHandler(method, params);
				return;
			}
			if (!this.isKnownExtension(method)) this.config.logger?.warn(`Unknown extension notification: ${method}`);
		}
		/**
		* Check if a method is a known extension
		*/
		isKnownExtension(method) {
			return KNOWN_EXTENSIONS.includes(method);
		}
		/**
		* Check if method is the artifact extension
		*/
		isArtifactExtension(method) {
			return method === ExtensionMethod.ARTIFACT;
		}
		/**
		* Clear all handlers
		*/
		clear() {
			this.handlers.clear();
			this.fallbackHandler = void 0;
		}
	};
}));
//#endregion
//#region ../../packages/agent-client-protocol/src/common/client/permissions.ts
var PermissionManager;
var init_permissions = __esmMin((() => {
	init_constants();
	init_errors();
	PermissionManager = class {
		constructor(config = {}) {
			this.pending = /* @__PURE__ */ new Map();
			this.callbacks = {};
			this.config = {
				timeout: DEFAULT_PERMISSION_TIMEOUT,
				autoRejectOnTimeout: true,
				autoApprove: false,
				...config
			};
		}
		/**
		* Set event callbacks
		*/
		setCallbacks(callbacks) {
			this.callbacks = callbacks;
		}
		/**
		* Handle a permission request from the agent
		*/
		async handleRequest(params) {
			const requestId = params.toolCall.toolCallId;
			this.config.logger?.debug(`Permission request received: ${requestId}`);
			if (this.config.autoApprove) {
				const firstOption = params.options[0];
				this.config.logger?.debug(`Auto-approving permission: ${requestId}`);
				return { outcome: {
					outcome: "selected",
					optionId: firstOption?.optionId ?? "approve"
				} };
			}
			if (this.config.handler) return this.config.handler(params);
			return new Promise((resolve, reject) => {
				const pending = {
					params,
					resolve,
					reject,
					createdAt: Date.now()
				};
				if (this.config.timeout && this.config.timeout > 0) pending.timeoutId = setTimeout(() => {
					this.handleTimeout(requestId);
				}, this.config.timeout);
				this.pending.set(requestId, pending);
				this.callbacks.onRequest?.(requestId, params);
			});
		}
		/**
		* Handle timeout for a permission request
		*/
		handleTimeout(requestId) {
			const pending = this.pending.get(requestId);
			if (!pending) return;
			this.config.logger?.warn(`Permission request timed out: ${requestId}`);
			this.callbacks.onTimeout?.(requestId);
			if (this.config.autoRejectOnTimeout) pending.resolve({ outcome: { outcome: "cancelled" } });
			else pending.reject(new TimeoutError("permission", this.config.timeout ?? 3e5));
			this.pending.delete(requestId);
		}
		/**
		* Resolve a permission request with a selected option
		* Returns true if the permission was found and resolved
		*/
		resolve(requestId, optionId) {
			const pending = this.pending.get(requestId);
			if (!pending) {
				this.config.logger?.warn(`Permission request not found: ${requestId}`);
				return false;
			}
			if (pending.timeoutId) clearTimeout(pending.timeoutId);
			this.config.logger?.debug(`Permission resolved: ${requestId} -> ${optionId}`);
			pending.resolve({ outcome: {
				outcome: "selected",
				optionId
			} });
			this.pending.delete(requestId);
			this.callbacks.onResolved?.(requestId, optionId);
			return true;
		}
		/**
		* Reject (cancel) a permission request
		* Returns true if the permission was found and rejected
		*/
		reject(requestId, reason) {
			const pending = this.pending.get(requestId);
			if (!pending) {
				this.config.logger?.warn(`Permission request not found: ${requestId}`);
				return false;
			}
			if (pending.timeoutId) clearTimeout(pending.timeoutId);
			this.config.logger?.debug(`Permission rejected: ${requestId}${reason ? ` - ${reason}` : ""}`);
			pending.resolve({ outcome: { outcome: "cancelled" } });
			this.pending.delete(requestId);
			this.callbacks.onRejected?.(requestId, reason);
			return true;
		}
		/**
		* Get all pending permissions
		*/
		getPending() {
			const result = /* @__PURE__ */ new Map();
			for (const [id, pending] of this.pending) result.set(id, {
				params: pending.params,
				createdAt: pending.createdAt
			});
			return result;
		}
		/**
		* Get a specific pending permission
		*/
		getPendingById(requestId) {
			const pending = this.pending.get(requestId);
			if (!pending) return;
			return {
				params: pending.params,
				createdAt: pending.createdAt
			};
		}
		/**
		* Check if there are any pending permissions
		*/
		hasPending() {
			return this.pending.size > 0;
		}
		/**
		* Get the count of pending permissions
		*/
		get pendingCount() {
			return this.pending.size;
		}
		/**
		* Clear all pending permissions (reject all)
		*/
		clear() {
			for (const [requestId, pending] of this.pending) {
				if (pending.timeoutId) clearTimeout(pending.timeoutId);
				pending.resolve({ outcome: { outcome: "cancelled" } });
				this.callbacks.onRejected?.(requestId, "cleared");
			}
			this.pending.clear();
			this.config.logger?.debug("Cleared all pending permissions");
		}
		/**
		* Update configuration
		*/
		updateConfig(config) {
			this.config = {
				...this.config,
				...config
			};
		}
	};
}));
//#endregion
//#region ../../packages/agent-client-protocol/src/common/client/questions.ts
var QuestionManager;
var init_questions = __esmMin((() => {
	init_constants();
	init_errors();
	QuestionManager = class {
		constructor(config = {}) {
			this.pending = /* @__PURE__ */ new Map();
			this.callbacks = {};
			this.config = {
				timeout: DEFAULT_QUESTION_TIMEOUT,
				autoCancelOnTimeout: true,
				...config
			};
		}
		/**
		* Set event callbacks
		*/
		setCallbacks(callbacks) {
			this.callbacks = callbacks;
		}
		/**
		* Handle a question request from the agent
		* Called when receiving _codebuddy.ai/question extMethod
		*/
		async handleRequest(request) {
			const toolCallId = request.toolCallId;
			this.config.logger?.debug(`Question request received: ${toolCallId}`);
			return new Promise((resolve, reject) => {
				const pending = {
					request,
					resolve,
					reject,
					createdAt: Date.now()
				};
				const timeout = request.timeout ?? this.config.timeout;
				if (timeout && timeout > 0) pending.timeoutId = setTimeout(() => {
					this.handleTimeout(toolCallId);
				}, timeout);
				this.pending.set(toolCallId, pending);
				this.callbacks.onRequest?.(toolCallId, request);
			});
		}
		/**
		* Handle timeout for a question request
		*/
		handleTimeout(toolCallId) {
			const pending = this.pending.get(toolCallId);
			if (!pending) return;
			this.config.logger?.warn(`Question request timed out: ${toolCallId}`);
			this.callbacks.onTimeout?.(toolCallId);
			if (this.config.autoCancelOnTimeout) pending.resolve({
				outcome: "cancelled",
				reason: "timeout"
			});
			else pending.reject(new TimeoutError("question", this.config.timeout ?? 3e5));
			this.pending.delete(toolCallId);
		}
		/**
		* Answer a question request with user's selections
		* Returns true if the request was found and answered
		*/
		answer(toolCallId, answers) {
			const pending = this.pending.get(toolCallId);
			if (!pending) {
				this.config.logger?.warn(`Question request not found: ${toolCallId}`);
				return false;
			}
			if (pending.timeoutId) clearTimeout(pending.timeoutId);
			this.config.logger?.debug(`Question answered: ${toolCallId}`);
			pending.resolve({
				outcome: "submitted",
				answers
			});
			this.pending.delete(toolCallId);
			this.callbacks.onAnswered?.(toolCallId, answers);
			return true;
		}
		/**
		* Cancel a question request
		* Returns true if the request was found and cancelled
		*/
		cancel(toolCallId, reason) {
			const pending = this.pending.get(toolCallId);
			if (!pending) {
				this.config.logger?.warn(`Question request not found: ${toolCallId}`);
				return false;
			}
			if (pending.timeoutId) clearTimeout(pending.timeoutId);
			this.config.logger?.debug(`Question cancelled: ${toolCallId}${reason ? ` - ${reason}` : ""}`);
			pending.resolve({
				outcome: "cancelled",
				reason
			});
			this.pending.delete(toolCallId);
			this.callbacks.onCancelled?.(toolCallId, reason);
			return true;
		}
		/**
		* Get all pending question requests
		*/
		getPending() {
			const result = /* @__PURE__ */ new Map();
			for (const [id, pending] of this.pending) result.set(id, {
				request: pending.request,
				createdAt: pending.createdAt
			});
			return result;
		}
		/**
		* Get a specific pending question request
		*/
		getPendingById(toolCallId) {
			const pending = this.pending.get(toolCallId);
			if (!pending) return;
			return {
				request: pending.request,
				createdAt: pending.createdAt
			};
		}
		/**
		* Check if there are any pending question requests
		*/
		hasPending() {
			return this.pending.size > 0;
		}
		/**
		* Get the count of pending question requests
		*/
		get pendingCount() {
			return this.pending.size;
		}
		/**
		* Clear all pending question requests (cancel all)
		*/
		clear() {
			for (const [toolCallId, pending] of this.pending) {
				if (pending.timeoutId) clearTimeout(pending.timeoutId);
				pending.resolve({
					outcome: "cancelled",
					reason: "cleared"
				});
				this.callbacks.onCancelled?.(toolCallId, "cleared");
			}
			this.pending.clear();
			this.config.logger?.debug("Cleared all pending question requests");
		}
		/**
		* Update configuration
		*/
		updateConfig(config) {
			this.config = {
				...this.config,
				...config
			};
		}
	};
}));
//#endregion
//#region ../../packages/agent-client-protocol/src/common/client/client.ts
/**
* Check if an error is a retryable network-level error.
* Only network failures (TypeError from fetch) are retried, NOT HTTP errors (4xx/5xx).
*/
function isRetryableNetworkError(error) {
	if (error instanceof TypeError) return true;
	if (error instanceof Error) {
		const msg = error.message.toLowerCase();
		return msg.includes("failed to fetch") || msg.includes("fetch failed") || msg.includes("network request failed") || msg.includes("econnreset") || msg.includes("econnrefused") || msg.includes("socket hang up");
	}
	return false;
}
var StreamableHttpClient;
var init_client$3 = __esmMin((() => {
	init_sdk();
	init_streamable_http();
	init_artifacts();
	init_constants();
	init_errors();
	init_events();
	init_extensions();
	init_permissions();
	init_questions();
	StreamableHttpClient = class {
		constructor(options) {
			this.state = "disconnected";
			this.emitter = new EventEmitter();
			this.options = options;
			this.artifactManager = new ArtifactManager({ logger: options.logger });
			this.permissionManager = new PermissionManager({
				timeout: options.permissionTimeout,
				autoRejectOnTimeout: options.permissionAutoRejectOnTimeout ?? true,
				autoApprove: options.autoApprove,
				handler: options.requestPermissionHandler,
				logger: options.logger
			});
			this.permissionManager.setCallbacks({
				onRequest: (requestId, params) => {
					this.emitter.emit("permissionRequest", {
						requestId,
						params
					});
				},
				onResolved: (requestId, optionId) => {
					this.emitter.emit("permissionResolved", {
						requestId,
						optionId
					});
				},
				onRejected: (requestId, reason) => {
					this.emitter.emit("permissionRejected", {
						requestId,
						reason
					});
				},
				onTimeout: (requestId) => {
					this.emitter.emit("permissionTimeout", { requestId });
				}
			});
			this.questionManager = new QuestionManager({
				timeout: options.questionTimeout,
				autoCancelOnTimeout: options.questionAutoCancelOnTimeout ?? true,
				logger: options.logger
			});
			this.questionManager.setCallbacks({
				onRequest: (toolCallId, request) => {
					this.emitter.emit("questionRequest", {
						toolCallId,
						request
					});
					options.onQuestionRequest?.(toolCallId, request);
				},
				onAnswered: (toolCallId, answers) => {
					this.emitter.emit("questionAnswered", {
						toolCallId,
						answers
					});
				},
				onCancelled: (toolCallId, reason) => {
					this.emitter.emit("questionCancelled", {
						toolCallId,
						reason
					});
				},
				onTimeout: (toolCallId) => {
					this.emitter.emit("questionTimeout", { toolCallId });
				}
			});
			this.extensionManager = new ExtensionManager({ logger: options.logger });
		}
		/**
		* Get current client state
		*/
		get currentState() {
			return this.state;
		}
		/**
		* Check if client is initialized
		*/
		get isInitialized() {
			return this.state === "initialized";
		}
		/**
		* Check if client is connected (but maybe not initialized)
		*/
		get isConnected() {
			return this.state === "connected" || this.state === "initialized";
		}
		/**
		* Get agent capabilities from initialization response
		*/
		get agentCapabilities() {
			return this.initializeResponse?.agentCapabilities;
		}
		/**
		* Get full initialization response
		*/
		get initializeResult() {
			return this.initializeResponse;
		}
		/**
		* Get current transport connection ID
		*/
		get connectionId() {
			return this.transport?.connectionId;
		}
		setState(newState) {
			const previous = this.state;
			this.state = newState;
			this.options.logger?.debug(`State change: ${previous} -> ${newState}`);
			this.emitter.emit("stateChange", {
				previous,
				current: newState
			});
			switch (newState) {
				case "connecting":
					this.emitter.emit("connecting", void 0);
					break;
				case "connected":
					this.emitter.emit("connected", void 0);
					break;
				case "disconnected":
					this.emitter.emit("disconnected", void 0);
					break;
				case "error": break;
			}
		}
		/**
		* Connect and initialize the client
		*/
		async connect() {
			if (this.state !== "disconnected") await this.disconnect();
			if (this.state === "initialized") return this.initializeResponse;
			if (this.state === "connecting") throw new ConnectionError("Connection already in progress");
			this.setState("connecting");
			try {
				this.transport = streamableHttp({
					endpoint: this.options.endpoint,
					authToken: this.options.authToken,
					headers: this.options.headers,
					reconnect: this.options.reconnect,
					fetch: this.options.fetch,
					heartbeatTimeout: this.options.heartbeatTimeout,
					postTimeout: this.options.postTimeout,
					connectionTimeout: this.options.connectionTimeout,
					onConnect: (connectionId) => {
						this.options.logger?.debug(`Transport connected: ${connectionId}`);
					},
					onDisconnect: (connectionId) => {
						this.options.logger?.debug(`Transport disconnected: ${connectionId}`);
					},
					onError: (error) => {
						this.options.logger?.error("Transport error:", error);
						this.emitter.emit("error", error);
					}
				});
				const { ClientSideConnection } = await loadAcpSdk();
				this.connection = new ClientSideConnection(() => this.createClientHandler(), this.transport);
				this.setState("connected");
				const timeout = this.options.initializeTimeout ?? 3e4;
				const mergedCapabilities = {
					...this.options.clientCapabilities,
					...CLOUD_CLIENT_CAPABILITIES,
					_meta: {
						...this.options.clientCapabilities?._meta,
						...CLOUD_CLIENT_CAPABILITIES._meta
					}
				};
				const initPromise = this.connection.initialize({
					protocolVersion: 1,
					clientCapabilities: mergedCapabilities
				});
				const timeoutPromise = new Promise((_, reject) => {
					setTimeout(() => {
						reject(new InitializationError(`Initialize timed out after ${timeout}ms`));
					}, timeout);
				});
				const initializeResponse = await Promise.race([initPromise, timeoutPromise]);
				this.initializeResponse = initializeResponse;
				this.setState("initialized");
				this.options.logger?.info("Client initialized successfully");
				return initializeResponse;
			} catch (err) {
				this.setState("error");
				const error = err instanceof Error ? err : new Error(String(err));
				this.emitter.emit("error", error);
				if (err instanceof InitializationError || err instanceof ConnectionError) throw err;
				throw new ConnectionError(`Failed to connect: ${error.message || "unknown cause"}`, error);
			}
		}
		/**
		* Disconnect the client gracefully
		* Sends DELETE request to server before closing local resources
		*/
		async disconnect() {
			if (this.state === "disconnected") return;
			this.options.logger?.info("Disconnecting client");
			if (this.transport) {
				try {
					await this.transport.close();
				} catch (err) {
					this.options.logger?.warn("Error closing transport:", err);
				}
				this.transport = void 0;
			}
			this.permissionManager.clear();
			this.questionManager.clear();
			this.artifactManager.clear();
			this.initializeResponse = void 0;
			this.setState("disconnected");
		}
		/**
		* Create the client handler for the connection
		*/
		createClientHandler() {
			return {
				sessionUpdate: async (params) => {
					await this.handleSessionUpdate(params);
				},
				requestPermission: async (params) => this.handleRequestPermission(params),
				extNotification: async (method, params) => {
					await this.handleExtNotification(method, params);
				},
				extMethod: async (method, params) => this.handleExtMethod(method, params)
			};
		}
		/**
		* Create a new session
		*
		* Retries on transient network errors (e.g., proxy connection reset)
		* since session/new is idempotent and safe to retry.
		*
		* A timeout (`options.sessionTimeout`, default 30 s) guards against the
		* SSE response never arriving — the POST returns 202 immediately and the
		* sessionId comes back via GET SSE, which can hang indefinitely.
		* On timeout a `SessionError` is thrown.
		*/
		async createSession(cwd) {
			this.ensureInitialized("createSession");
			const maxRetries = 2;
			const timeout = this.options.sessionTimeout ?? 3e4;
			let lastError;
			for (let attempt = 0; attempt <= maxRetries; attempt++) try {
				const sessionPromise = this.connection.newSession({
					cwd,
					mcpServers: []
				});
				let response;
				if (timeout > 0) {
					const timeoutPromise = new Promise((_, reject) => {
						setTimeout(() => {
							reject(new SessionError(`session/new timed out after ${timeout}ms`));
						}, timeout);
					});
					response = await Promise.race([sessionPromise, timeoutPromise]);
				} else response = await sessionPromise;
				this.options.logger?.info(`Session created: ${response.sessionId}`);
				return response;
			} catch (err) {
				lastError = err instanceof Error ? err : new Error(String(err));
				if (attempt < maxRetries && isRetryableNetworkError(err)) {
					const delay = 500 * Math.pow(2, attempt);
					this.options.logger?.warn(`session/new network error, retrying in ${delay}ms (attempt ${attempt + 1}/${maxRetries}): ${lastError.message}`);
					await new Promise((resolve) => setTimeout(resolve, delay));
					continue;
				}
				throw new SessionError(`Failed to create session: ${lastError.message}`, void 0, lastError);
			}
			throw new SessionError(`Failed to create session: ${lastError?.message}`, void 0, lastError);
		}
		/**
		* Load an existing session
		* Requires agent to support loadSession capability
		*/
		async loadSession(sessionId, cwd) {
			this.ensureInitialized("loadSession");
			if (!this.agentCapabilities?.loadSession) throw new SessionError("Agent does not support session loading", sessionId);
			try {
				const response = await this.connection.loadSession({
					sessionId,
					cwd,
					mcpServers: []
				});
				this.options.logger?.info(`Session loaded: ${sessionId}`);
				return response;
			} catch (err) {
				throw new SessionError(`Failed to load session: ${err instanceof Error ? err.message : String(err)}`, sessionId, err instanceof Error ? err : void 0);
			}
		}
		/**
		* Set the session mode
		*
		* Guarded by a timeout (`options.setModeTimeout`, default 15 s). This call
		* runs on the hot sendPrompt path before every prompt; without a timeout a
		* briefly unresponsive sandbox would make this Promise hang forever and
		* silently freeze the UI (issue #60808). On timeout a `TimeoutError` is
		* thrown so the caller can surface an error and keep the pending message.
		*/
		async setSessionMode(params) {
			this.ensureInitialized("setSessionMode");
			this.options.logger?.debug(`Setting session mode: ${params.sessionId} -> ${params.modeId}`);
			return this.withRequestTimeout("setSessionMode", this.connection.setSessionMode(params));
		}
		/**
		* Set the session model
		* @experimental This API is unstable and may change
		*
		* SDK 0.25 移除了 typed 的 unstable_setSessionModel；session/set_model 是
		* 本仓库保留的扩展方言，经 extMethod 原样发送（agent 侧在 extMethod 回退
		* 分发里处理）。
		*
		* Guarded by the same `setModeTimeout` as `setSessionMode` (issue #60808).
		*/
		async setSessionModel(params) {
			this.ensureInitialized("setSessionModel");
			this.options.logger?.debug(`Setting session model: ${params.sessionId} -> ${params.modelId}`);
			return await this.withRequestTimeout("setSessionModel", this.connection.extMethod(ACP_METHOD_SESSION_SET_MODEL, params));
		}
		/**
		* Send a prompt to the agent
		*/
		async prompt(sessionId, prompt, options) {
			this.ensureInitialized("prompt");
			this.options.logger?.debug(`Sending prompt to session: ${sessionId}`);
			return this.connection.prompt({
				sessionId,
				prompt,
				_meta: options?.planMode ? {
					planMode: true,
					...options._meta
				} : options?._meta
			});
		}
		/**
		* Cancel ongoing operations for a session
		*/
		async cancel(sessionId) {
			this.ensureInitialized("cancel");
			this.options.logger?.debug(`Cancelling session: ${sessionId}`);
			await this.connection.cancel({ sessionId });
		}
		/**
		* Resolve a pending permission request
		*/
		resolvePermission(requestId, optionId) {
			return this.permissionManager.resolve(requestId, optionId);
		}
		/**
		* Reject a pending permission request
		*/
		rejectPermission(requestId, reason) {
			return this.permissionManager.reject(requestId, reason);
		}
		/**
		* Get all pending permissions
		*/
		getPendingPermissions() {
			return this.permissionManager.getPending();
		}
		/**
		* Check if there are pending permissions
		*/
		hasPendingPermissions() {
			return this.permissionManager.hasPending();
		}
		/**
		* Answer a pending question request with user's selections
		*/
		answerQuestion(toolCallId, answers) {
			return this.questionManager.answer(toolCallId, answers);
		}
		/**
		* Cancel a pending question request
		*/
		cancelQuestion(toolCallId, reason) {
			return this.questionManager.cancel(toolCallId, reason);
		}
		/**
		* Get all pending question requests
		*/
		getPendingQuestions() {
			return this.questionManager.getPending();
		}
		/**
		* Check if there are pending question requests
		*/
		hasPendingQuestions() {
			return this.questionManager.hasPending();
		}
		/**
		* Send an extension method request
		*/
		async extMethod(method, params) {
			this.ensureInitialized("extMethod");
			return this.connection.extMethod(method, params);
		}
		/**
		* Send an extension notification
		*/
		async extNotification(method, params) {
			this.ensureInitialized("extNotification");
			return this.connection.extNotification(method, params);
		}
		on(event, listener) {
			this.emitter.on(event, listener);
			return this;
		}
		off(event, listener) {
			this.emitter.off(event, listener);
			return this;
		}
		once(event, listener) {
			this.emitter.once(event, listener);
			return this;
		}
		emit(event, data) {
			return this.emitter.emit(event, data);
		}
		removeAllListeners(event) {
			this.emitter.removeAllListeners(event);
			return this;
		}
		async handleSessionUpdate(params) {
			await this.options.onSessionUpdate?.(params);
			this.emitter.emit("sessionUpdate", params);
		}
		async handleRequestPermission(params) {
			return this.permissionManager.handleRequest(params);
		}
		async handleExtNotification(method, params) {
			await this.options.onExtNotification?.(method, params);
			if (method === ExtensionMethod.ARTIFACT) {
				const notification = params;
				if (notification.event === "deleted") {
					const existing = this.artifactManager.get(notification.artifact.uri);
					this.artifactManager.handleNotification(notification);
					if (existing) {
						await this.options.onArtifact?.(existing, "deleted");
						this.emitter.emit("artifactDeleted", existing);
					}
					return;
				}
				const { artifact, event } = notification;
				this.artifactManager.handleNotification(notification);
				const storedArtifact = this.artifactManager.get(artifact.uri) || artifact;
				await this.options.onArtifact?.(storedArtifact, event);
				if (event === "created") {
					this.emitter.emit("artifactCreated", storedArtifact);
					if (storedArtifact.type === "plan") await this.options.onPlanReady?.(storedArtifact);
				} else this.emitter.emit("artifactUpdated", storedArtifact);
				return;
			}
			if (method === ExtensionMethod.CHECKPOINT) {
				const notification = params;
				if (notification.event === "created") this.emitter.emit("checkpointCreated", notification.checkpoint);
				else if (notification.event === "updated") this.emitter.emit("checkpointUpdated", notification.checkpoint);
				return;
			}
			await this.extensionManager.handleNotification(method, params);
		}
		async handleExtMethod(method, params) {
			if (method === ExtensionMethod.QUESTION) {
				const response = await this.questionManager.handleRequest(params);
				if (response.outcome === "submitted" && response.answers) return { outcome: {
					outcome: "submitted",
					data: { answers: response.answers }
				} };
				else return { outcome: {
					outcome: "cancelled",
					reason: response.reason
				} };
			}
			this.options.logger?.warn(`Unknown extension method: ${method}`);
			return { outcome: {
				outcome: "cancelled",
				reason: "unknown method"
			} };
		}
		ensureInitialized(operation) {
			if (this.state !== "initialized") throw new InvalidStateError(operation, this.state, ["initialized"]);
		}
		/**
		* Race a request Promise against the `setModeTimeout` guard.
		*
		* Used for `session/set_mode` / `session/set_model`, which sit on the hot
		* sendPrompt path. A timeout of <= 0 disables the guard. On timeout a
		* `TimeoutError` is thrown (issue #60808).
		*/
		async withRequestTimeout(operation, request) {
			const timeout = this.options.setModeTimeout ?? 15e3;
			if (!(timeout > 0)) return request;
			let timer;
			const timeoutPromise = new Promise((_, reject) => {
				timer = setTimeout(() => {
					this.options.logger?.warn(`${operation} timed out after ${timeout}ms`);
					reject(new TimeoutError(operation, timeout));
				}, timeout);
			});
			try {
				return await Promise.race([request, timeoutPromise]);
			} finally {
				if (timer) clearTimeout(timer);
			}
		}
	};
}));
//#endregion
//#region ../../packages/agent-client-protocol/src/common/client/index.ts
var init_client$2 = __esmMin((() => {
	init_client$3();
	init_constants();
	init_errors();
	init_events();
	init_artifacts();
	init_permissions();
	init_questions();
	init_extensions();
}));
//#endregion
//#region ../../packages/agent-client-protocol/src/common/index.ts
var init_common$1 = __esmMin((() => {
	init_types$5();
	init_prompt_codec();
	init_prompt_context_xml();
	init_sdk();
	init_streamable_http();
	init_connectrpc_http();
	init_client$2();
	init_events();
}));
//#endregion
//#region ../../packages/agent-provider/src/common/providers/cloud-agent-provider/cloud-connection.ts
var CloudAgentConnection;
var init_cloud_connection = __esmMin((() => {
	init_common$1();
	CloudAgentConnection = class {
		constructor(agentId, config, cwd = "/workspace") {
			this.listeners = /* @__PURE__ */ new Map();
			this.onceListeners = /* @__PURE__ */ new Map();
			this._isStreaming = false;
			this.transport = "cloud";
			this.agentId = agentId;
			this.activeSessionId = agentId;
			this.cwd = cwd;
			this.client = new StreamableHttpClient({
				endpoint: config.endpoint,
				authToken: config.authToken,
				headers: config.headers,
				reconnect: config.reconnect,
				initializeTimeout: config.initializeTimeout,
				setModeTimeout: config.setModeTimeout,
				permissionTimeout: config.permissionTimeout,
				permissionAutoRejectOnTimeout: config.permissionAutoRejectOnTimeout,
				autoApprove: config.autoApprove,
				logger: config.logger,
				fetch: config.fetch,
				clientCapabilities: config.clientCapabilities,
				onSessionUpdate: (update) => {
					if (!this._isStreaming && this.isOwnSessionNotification(update)) this.emit("sessionUpdate", update);
				},
				onArtifact: () => {},
				onExtNotification: (method, params) => {
					this.emit("extNotification", {
						method,
						params
					});
					if (method === ExtensionMethod.ARTIFACT) {
						this.handleArtifactNotification(params);
						return;
					}
					if (method === ExtensionMethod.CHECKPOINT) {
						this.handleCheckpointNotification(params);
						return;
					}
					if (method === ExtensionMethod.COMMAND) {
						const commandData = {
							action: params.action,
							params: params.params
						};
						this.attachSessionScope(commandData, params.sessionId);
						this.emit("command", commandData);
					}
				}
			});
			this.setupEventForwarding();
		}
		/**
		* Check whether a notification belongs to this connection's active session.
		*
		* Cloud Agent 一个 runtime/connection 下可以创建多个 ACP session（每次“新建对话”一个 session）。
		* 因此不能只用 agentId/默认 sessionId 过滤，否则新 session 的更新会被丢弃，或 prompt 继续写入旧 session。
		*/
		isOwnSessionNotification(notification) {
			return notification.sessionId === this.activeSessionId;
		}
		/**
		* 将 ACP artifact 通知转换为 AgentConnection 事件，并在 adapter 层补齐 session scope。
		*/
		handleArtifactNotification(notification) {
			const scopedArtifact = { ...notification.artifact };
			this.attachSessionScope(scopedArtifact, notification.sessionId);
			if (notification.event === "created") this.emit("artifactCreated", scopedArtifact);
			else if (notification.event === "updated") this.emit("artifactUpdated", scopedArtifact);
			else this.emit("artifactDeleted", scopedArtifact);
		}
		/**
		* 将 ACP checkpoint 通知转换为 AgentConnection 事件，并在 adapter 层补齐 session scope。
		*/
		handleCheckpointNotification(notification) {
			const scopedCheckpoint = { ...notification.checkpoint };
			this.attachSessionScope(scopedCheckpoint, notification.sessionId);
			if (notification.event === "created") this.emit("checkpointCreated", scopedCheckpoint);
			else this.emit("checkpointUpdated", scopedCheckpoint);
		}
		/**
		* `__sessionId` 是 agent-provider 内部过滤标记，不属于 ACP 协议对象。
		*/
		attachSessionScope(target, sessionId) {
			if (!target || !sessionId) return;
			target.__sessionId = sessionId;
		}
		setupEventForwarding() {
			this.client.on("connecting", () => {
				this.emit("connecting", void 0);
			});
			this.client.on("connected", () => {
				this.emit("connected", void 0);
			});
			this.client.on("disconnected", () => {
				this.emit("disconnected", void 0);
			});
			this.client.on("error", (error) => {
				this.emit("error", error);
			});
			this.client.on("stateChange", (change) => {
				this.emit("stateChange", change);
			});
			this.client.on("permissionRequest", (data) => {
				this.emit("permissionRequest", data);
			});
			this.client.on("permissionResolved", (data) => {
				this.emit("permissionResolved", data);
			});
			this.client.on("permissionRejected", (data) => {
				this.emit("permissionRejected", data);
			});
			this.client.on("permissionTimeout", (data) => {
				this.emit("permissionTimeout", data);
			});
			this.client.on("questionRequest", (data) => {
				this.emit("questionRequest", data);
			});
			this.client.on("questionAnswered", (data) => {
				this.emit("questionAnswered", data);
			});
			this.client.on("questionCancelled", (data) => {
				this.emit("questionCancelled", data);
			});
			this.client.on("questionTimeout", (data) => {
				this.emit("questionTimeout", data);
			});
		}
		on(event, listener) {
			if (!this.listeners.has(event)) this.listeners.set(event, /* @__PURE__ */ new Set());
			this.listeners.get(event).add(listener);
			return this;
		}
		off(event, listener) {
			const eventListeners = this.listeners.get(event);
			if (eventListeners) eventListeners.delete(listener);
			const onceEventListeners = this.onceListeners.get(event);
			if (onceEventListeners) onceEventListeners.delete(listener);
			return this;
		}
		once(event, listener) {
			if (!this.onceListeners.has(event)) this.onceListeners.set(event, /* @__PURE__ */ new Set());
			this.onceListeners.get(event).add(listener);
			return this;
		}
		emit(event, data) {
			const regularListeners = this.listeners.get(event);
			const onceEventListeners = this.onceListeners.get(event);
			let hasListeners = false;
			if (regularListeners && regularListeners.size > 0) {
				hasListeners = true;
				for (const listener of regularListeners) try {
					const result = listener(data);
					if (result instanceof Promise) result.catch((err) => {
						console.error(`Error in async event listener for '${String(event)}':`, err);
					});
				} catch (err) {
					console.error(`Error in event listener for '${String(event)}':`, err);
				}
			}
			if (onceEventListeners && onceEventListeners.size > 0) {
				hasListeners = true;
				const listenersToCall = Array.from(onceEventListeners);
				this.onceListeners.delete(event);
				for (const listener of listenersToCall) try {
					const result = listener(data);
					if (result instanceof Promise) result.catch((err) => {
						console.error(`Error in async once event listener for '${String(event)}':`, err);
					});
				} catch (err) {
					console.error(`Error in once event listener for '${String(event)}':`, err);
				}
			}
			return hasListeners;
		}
		removeAllListeners(event) {
			if (event !== void 0) {
				this.listeners.delete(event);
				this.onceListeners.delete(event);
			} else {
				this.listeners.clear();
				this.onceListeners.clear();
			}
			return this;
		}
		get state() {
			return this.client.currentState;
		}
		get isInitialized() {
			return this.client.isInitialized;
		}
		get capabilities() {
			return this.client.agentCapabilities;
		}
		get initializeResult() {
			return this.client.initializeResult;
		}
		async connect() {
			return this.client.connect();
		}
		async disconnect() {
			await this.client.disconnect();
		}
		async createSession(params) {
			const loadedSession = await this.client.createSession(params.cwd || this.cwd);
			this.activeSessionId = loadedSession.sessionId;
			return loadedSession;
		}
		async loadSession(params) {
			if (!params.sessionId) throw new Error("sessionId is required for loadSession");
			this.activeSessionId = params.sessionId;
			return this.client.loadSession(params.sessionId, params.cwd || this.cwd);
		}
		async setSessionMode(sessionId, modeId) {
			return this.client.setSessionMode({
				sessionId,
				modeId
			});
		}
		async setSessionModel(sessionId, modelId) {
			return this.client.setSessionModel({
				sessionId,
				modelId
			});
		}
		/** Set a session-level config option via ACP session/set_config_option. */
		async setSessionConfigOption(sessionId, configId, value) {
			await this.client.extMethod("session/set_config_option", {
				sessionId,
				configId,
				value
			});
		}
		async prompt(sessionId, params) {
			const blocks = typeof params.content === "string" ? [{
				type: "text",
				text: params.content
			}] : params.content;
			return this.client.prompt(sessionId, blocks, {
				planMode: params.planMode,
				_meta: params._meta
			});
		}
		async *promptStream(sessionId, params) {
			this._isStreaming = true;
			const updates = [];
			let resolveUpdate = null;
			let done = false;
			const listener = (update) => {
				if (!this.isOwnSessionNotification(update)) return;
				if (resolveUpdate) {
					resolveUpdate(update);
					resolveUpdate = null;
				} else updates.push(update);
			};
			this.client.on("sessionUpdate", listener);
			try {
				const promptPromise = this.prompt(sessionId, params);
				while (!done) {
					const update = updates.shift();
					if (update) yield update;
					else {
						const nextUpdate = await new Promise((resolve) => {
							resolveUpdate = resolve;
							promptPromise.then(() => {
								if (resolveUpdate === resolve) {
									resolveUpdate = null;
									resolve(null);
								}
							}).catch(() => {
								if (resolveUpdate === resolve) {
									resolveUpdate = null;
									resolve(null);
								}
							});
						});
						if (nextUpdate === null) done = true;
						else yield nextUpdate;
					}
				}
			} finally {
				this._isStreaming = false;
				this.client.off("sessionUpdate", listener);
			}
		}
		async cancel(sessionId) {
			return this.client.cancel(sessionId);
		}
		resolvePermission(requestId, optionId) {
			return this.client.resolvePermission(requestId, optionId);
		}
		rejectPermission(requestId, reason) {
			return this.client.rejectPermission(requestId, reason);
		}
		getPendingPermissions() {
			return this.client.getPendingPermissions();
		}
		hasPendingPermissions() {
			return this.client.hasPendingPermissions();
		}
		answerQuestion(toolCallId, answers) {
			return this.client.answerQuestion(toolCallId, answers);
		}
		cancelQuestion(toolCallId, reason) {
			return this.client.cancelQuestion(toolCallId, reason);
		}
		getPendingQuestions() {
			return this.client.getPendingQuestions();
		}
		hasPendingQuestions() {
			return this.client.hasPendingQuestions();
		}
		async toolCallback(sessionId, toolCallId, toolName, action) {
			return {
				success: false,
				error: "toolCallback not supported for cloud connections"
			};
		}
		/**
		* Set session connection information
		* Called by CloudAgentProvider.connect() after fetching session data from backend.
		*/
		setSessionConnectionInfo(info) {
			this._sessionConnectionInfo = info;
		}
		/**
		* Get session connection information
		* Contains sandboxId, link, token, etc.
		*/
		get sessionConnectionInfo() {
			return this._sessionConnectionInfo;
		}
		async reportTelemetry(eventName, payload) {
			try {
				await this.client.extMethod("reportTelemetry", {
					eventName,
					payload
				});
			} catch (error) {
				console.warn("[CloudAgentConnection] reportTelemetry failed:", error);
			}
		}
		/**
		* 调用 CLI 端 session/rollback ext method 执行原子回退。
		* 通过 StreamableHttpClient.extMethod 转发到远端 ACP agent。
		* @see issue #50495 / docs/plans/2026-06-20-resend-edit-unified-plan.md Phase 2
		*/
		async rollback(request) {
			try {
				return await this.client.extMethod("_codebuddy.ai/session/rollback", request);
			} catch (err) {
				console.error("[CloudAgentConnection] rollback failed:", err);
				return {
					applied: false,
					error: String(err)
				};
			}
		}
		async extMethod(method, params) {
			return this.client.extMethod(method, params);
		}
	};
}));
//#endregion
//#region ../../packages/agent-provider/node_modules/axios/lib/helpers/bind.js
function bind(fn, thisArg) {
	return function wrap() {
		return fn.apply(thisArg, arguments);
	};
}
var init_bind = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-provider/node_modules/axios/lib/utils.js
/**
* Determine if a value is a Buffer
*
* @param {*} val The value to test
*
* @returns {boolean} True if value is a Buffer, otherwise false
*/
function isBuffer(val) {
	return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
}
/**
* Determine if a value is a view on an ArrayBuffer
*
* @param {*} val The value to test
*
* @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
*/
function isArrayBufferView(val) {
	let result;
	if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) result = ArrayBuffer.isView(val);
	else result = val && val.buffer && isArrayBuffer(val.buffer);
	return result;
}
/**
* Iterate over an Array or an Object invoking a function for each item.
*
* If `obj` is an Array callback will be called passing
* the value, index, and complete array for each item.
*
* If 'obj' is an Object callback will be called passing
* the value, key, and complete object for each property.
*
* @param {Object|Array} obj The object to iterate
* @param {Function} fn The callback to invoke for each item
*
* @param {Boolean} [allOwnKeys = false]
* @returns {any}
*/
function forEach(obj, fn, { allOwnKeys = false } = {}) {
	if (obj === null || typeof obj === "undefined") return;
	let i;
	let l;
	if (typeof obj !== "object") obj = [obj];
	if (isArray(obj)) for (i = 0, l = obj.length; i < l; i++) fn.call(null, obj[i], i, obj);
	else {
		const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
		const len = keys.length;
		let key;
		for (i = 0; i < len; i++) {
			key = keys[i];
			fn.call(null, obj[key], key, obj);
		}
	}
}
function findKey(obj, key) {
	key = key.toLowerCase();
	const keys = Object.keys(obj);
	let i = keys.length;
	let _key;
	while (i-- > 0) {
		_key = keys[i];
		if (key === _key.toLowerCase()) return _key;
	}
	return null;
}
/**
* Accepts varargs expecting each argument to be an object, then
* immutably merges the properties of each object and returns result.
*
* When multiple objects contain the same key the later object in
* the arguments list will take precedence.
*
* Example:
*
* ```js
* var result = merge({foo: 123}, {foo: 456});
* console.log(result.foo); // outputs 456
* ```
*
* @param {Object} obj1 Object to merge
*
* @returns {Object} Result of all merge properties
*/
function merge() {
	const { caseless } = isContextDefined(this) && this || {};
	const result = {};
	const assignValue = (val, key) => {
		const targetKey = caseless && findKey(result, key) || key;
		if (isPlainObject(result[targetKey]) && isPlainObject(val)) result[targetKey] = merge(result[targetKey], val);
		else if (isPlainObject(val)) result[targetKey] = merge({}, val);
		else if (isArray(val)) result[targetKey] = val.slice();
		else result[targetKey] = val;
	};
	for (let i = 0, l = arguments.length; i < l; i++) arguments[i] && forEach(arguments[i], assignValue);
	return result;
}
/**
* If the thing is a FormData object, return true, otherwise return false.
*
* @param {unknown} thing - The thing to check.
*
* @returns {boolean}
*/
function isSpecCompliantForm(thing) {
	return !!(thing && isFunction(thing.append) && thing[toStringTag] === "FormData" && thing[iterator]);
}
var toString, getPrototypeOf, iterator, toStringTag, kindOf, kindOfTest, typeOfTest, isArray, isUndefined, isArrayBuffer, isString, isFunction, isNumber, isObject, isBoolean, isPlainObject, isDate, isFile, isBlob, isFileList, isStream, isFormData, isURLSearchParams, isReadableStream, isRequest, isResponse, isHeaders, trim, _global, isContextDefined, extend, stripBOM, inherits, toFlatObject, endsWith, toArray, isTypedArray, forEachEntry, matchAll, isHTMLForm, toCamelCase, hasOwnProperty, isRegExp, reduceDescriptors, freezeMethods, toObjectSet, noop, toFiniteNumber, toJSONObject, isAsyncFn, isThenable, _setImmediate, asap, isIterable, utils_default;
var init_utils$2 = __esmMin((() => {
	init_dist();
	init_bind();
	({toString} = Object.prototype);
	({getPrototypeOf} = Object);
	({iterator, toStringTag} = Symbol);
	kindOf = ((cache) => (thing) => {
		const str = toString.call(thing);
		return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
	})(Object.create(null));
	kindOfTest = (type) => {
		type = type.toLowerCase();
		return (thing) => kindOf(thing) === type;
	};
	typeOfTest = (type) => (thing) => typeof thing === type;
	({isArray} = Array);
	isUndefined = typeOfTest("undefined");
	isArrayBuffer = kindOfTest("ArrayBuffer");
	isString = typeOfTest("string");
	isFunction = typeOfTest("function");
	isNumber = typeOfTest("number");
	isObject = (thing) => thing !== null && typeof thing === "object";
	isBoolean = (thing) => thing === true || thing === false;
	isPlainObject = (val) => {
		if (kindOf(val) !== "object") return false;
		const prototype = getPrototypeOf(val);
		return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(toStringTag in val) && !(iterator in val);
	};
	isDate = kindOfTest("Date");
	isFile = kindOfTest("File");
	isBlob = kindOfTest("Blob");
	isFileList = kindOfTest("FileList");
	isStream = (val) => isObject(val) && isFunction(val.pipe);
	isFormData = (thing) => {
		let kind;
		return thing && (typeof FormData === "function" && thing instanceof FormData || isFunction(thing.append) && ((kind = kindOf(thing)) === "formdata" || kind === "object" && isFunction(thing.toString) && thing.toString() === "[object FormData]"));
	};
	isURLSearchParams = kindOfTest("URLSearchParams");
	[isReadableStream, isRequest, isResponse, isHeaders] = [
		"ReadableStream",
		"Request",
		"Response",
		"Headers"
	].map(kindOfTest);
	trim = (str) => str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
	_global = (() => {
		if (typeof globalThis !== "undefined") return globalThis;
		return typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : globalThis;
	})();
	isContextDefined = (context) => !isUndefined(context) && context !== _global;
	extend = (a, b, thisArg, { allOwnKeys } = {}) => {
		forEach(b, (val, key) => {
			if (thisArg && isFunction(val)) a[key] = bind(val, thisArg);
			else a[key] = val;
		}, { allOwnKeys });
		return a;
	};
	stripBOM = (content) => {
		if (content.charCodeAt(0) === 65279) content = content.slice(1);
		return content;
	};
	inherits = (constructor, superConstructor, props, descriptors) => {
		constructor.prototype = Object.create(superConstructor.prototype, descriptors);
		constructor.prototype.constructor = constructor;
		Object.defineProperty(constructor, "super", { value: superConstructor.prototype });
		props && Object.assign(constructor.prototype, props);
	};
	toFlatObject = (sourceObj, destObj, filter, propFilter) => {
		let props;
		let i;
		let prop;
		const merged = {};
		destObj = destObj || {};
		if (sourceObj == null) return destObj;
		do {
			props = Object.getOwnPropertyNames(sourceObj);
			i = props.length;
			while (i-- > 0) {
				prop = props[i];
				if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
					destObj[prop] = sourceObj[prop];
					merged[prop] = true;
				}
			}
			sourceObj = filter !== false && getPrototypeOf(sourceObj);
		} while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);
		return destObj;
	};
	endsWith = (str, searchString, position) => {
		str = String(str);
		if (position === void 0 || position > str.length) position = str.length;
		position -= searchString.length;
		const lastIndex = str.indexOf(searchString, position);
		return lastIndex !== -1 && lastIndex === position;
	};
	toArray = (thing) => {
		if (!thing) return null;
		if (isArray(thing)) return thing;
		let i = thing.length;
		if (!isNumber(i)) return null;
		const arr = new Array(i);
		while (i-- > 0) arr[i] = thing[i];
		return arr;
	};
	isTypedArray = ((TypedArray) => {
		return (thing) => {
			return TypedArray && thing instanceof TypedArray;
		};
	})(typeof Uint8Array !== "undefined" && getPrototypeOf(Uint8Array));
	forEachEntry = (obj, fn) => {
		const _iterator = (obj && obj[iterator]).call(obj);
		let result;
		while ((result = _iterator.next()) && !result.done) {
			const pair = result.value;
			fn.call(obj, pair[0], pair[1]);
		}
	};
	matchAll = (regExp, str) => {
		let matches;
		const arr = [];
		while ((matches = regExp.exec(str)) !== null) arr.push(matches);
		return arr;
	};
	isHTMLForm = kindOfTest("HTMLFormElement");
	toCamelCase = (str) => {
		return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function replacer(m, p1, p2) {
			return p1.toUpperCase() + p2;
		});
	};
	hasOwnProperty = (({ hasOwnProperty }) => (obj, prop) => hasOwnProperty.call(obj, prop))(Object.prototype);
	isRegExp = kindOfTest("RegExp");
	reduceDescriptors = (obj, reducer) => {
		const descriptors = Object.getOwnPropertyDescriptors(obj);
		const reducedDescriptors = {};
		forEach(descriptors, (descriptor, name) => {
			let ret;
			if ((ret = reducer(descriptor, name, obj)) !== false) reducedDescriptors[name] = ret || descriptor;
		});
		Object.defineProperties(obj, reducedDescriptors);
	};
	freezeMethods = (obj) => {
		reduceDescriptors(obj, (descriptor, name) => {
			if (isFunction(obj) && [
				"arguments",
				"caller",
				"callee"
			].indexOf(name) !== -1) return false;
			const value = obj[name];
			if (!isFunction(value)) return;
			descriptor.enumerable = false;
			if ("writable" in descriptor) {
				descriptor.writable = false;
				return;
			}
			if (!descriptor.set) descriptor.set = () => {
				throw Error("Can not rewrite read-only method '" + name + "'");
			};
		});
	};
	toObjectSet = (arrayOrString, delimiter) => {
		const obj = {};
		const define = (arr) => {
			arr.forEach((value) => {
				obj[value] = true;
			});
		};
		isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
		return obj;
	};
	noop = () => {};
	toFiniteNumber = (value, defaultValue) => {
		return value != null && Number.isFinite(value = +value) ? value : defaultValue;
	};
	toJSONObject = (obj) => {
		const stack = new Array(10);
		const visit = (source, i) => {
			if (isObject(source)) {
				if (stack.indexOf(source) >= 0) return;
				if (!("toJSON" in source)) {
					stack[i] = source;
					const target = isArray(source) ? [] : {};
					forEach(source, (value, key) => {
						const reducedValue = visit(value, i + 1);
						!isUndefined(reducedValue) && (target[key] = reducedValue);
					});
					stack[i] = void 0;
					return target;
				}
			}
			return source;
		};
		return visit(obj, 0);
	};
	isAsyncFn = kindOfTest("AsyncFunction");
	isThenable = (thing) => thing && (isObject(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch);
	_setImmediate = ((setImmediateSupported, postMessageSupported) => {
		if (setImmediateSupported) return setImmediate;
		return postMessageSupported ? ((token, callbacks) => {
			_global.addEventListener("message", ({ source, data }) => {
				if (source === _global && data === token) callbacks.length && callbacks.shift()();
			}, false);
			return (cb) => {
				callbacks.push(cb);
				_global.postMessage(token, "*");
			};
		})(`axios@${Math.random()}`, []) : (cb) => setTimeout(cb);
	})(typeof setImmediate === "function", isFunction(_global.postMessage));
	asap = typeof queueMicrotask !== "undefined" ? queueMicrotask.bind(_global) : typeof process$1 !== "undefined" && process$1.nextTick || _setImmediate;
	isIterable = (thing) => thing != null && isFunction(thing[iterator]);
	utils_default = {
		isArray,
		isArrayBuffer,
		isBuffer,
		isFormData,
		isArrayBufferView,
		isString,
		isNumber,
		isBoolean,
		isObject,
		isPlainObject,
		isReadableStream,
		isRequest,
		isResponse,
		isHeaders,
		isUndefined,
		isDate,
		isFile,
		isBlob,
		isRegExp,
		isFunction,
		isStream,
		isURLSearchParams,
		isTypedArray,
		isFileList,
		forEach,
		merge,
		extend,
		trim,
		stripBOM,
		inherits,
		toFlatObject,
		kindOf,
		kindOfTest,
		endsWith,
		toArray,
		forEachEntry,
		matchAll,
		isHTMLForm,
		hasOwnProperty,
		hasOwnProp: hasOwnProperty,
		reduceDescriptors,
		freezeMethods,
		toObjectSet,
		toCamelCase,
		noop,
		toFiniteNumber,
		findKey,
		global: _global,
		isContextDefined,
		isSpecCompliantForm,
		toJSONObject,
		isAsyncFn,
		isThenable,
		setImmediate: _setImmediate,
		asap,
		isIterable
	};
}));
//#endregion
//#region ../../packages/agent-provider/node_modules/axios/lib/core/AxiosError.js
/**
* Create an Error with the specified message, config, error code, request and response.
*
* @param {string} message The error message.
* @param {string} [code] The error code (for example, 'ECONNABORTED').
* @param {Object} [config] The config.
* @param {Object} [request] The request.
* @param {Object} [response] The response.
*
* @returns {Error} The created error.
*/
function AxiosError$1(message, code, config, request, response) {
	Error.call(this);
	if (Error.captureStackTrace) Error.captureStackTrace(this, this.constructor);
	else this.stack = (/* @__PURE__ */ new Error()).stack;
	this.message = message;
	this.name = "AxiosError";
	code && (this.code = code);
	config && (this.config = config);
	request && (this.request = request);
	if (response) {
		this.response = response;
		this.status = response.status ? response.status : null;
	}
}
var prototype$1, descriptors;
var init_AxiosError = __esmMin((() => {
	init_utils$2();
	utils_default.inherits(AxiosError$1, Error, { toJSON: function toJSON() {
		return {
			message: this.message,
			name: this.name,
			description: this.description,
			number: this.number,
			fileName: this.fileName,
			lineNumber: this.lineNumber,
			columnNumber: this.columnNumber,
			stack: this.stack,
			config: utils_default.toJSONObject(this.config),
			code: this.code,
			status: this.status
		};
	} });
	prototype$1 = AxiosError$1.prototype;
	descriptors = {};
	[
		"ERR_BAD_OPTION_VALUE",
		"ERR_BAD_OPTION",
		"ECONNABORTED",
		"ETIMEDOUT",
		"ERR_NETWORK",
		"ERR_FR_TOO_MANY_REDIRECTS",
		"ERR_DEPRECATED",
		"ERR_BAD_RESPONSE",
		"ERR_BAD_REQUEST",
		"ERR_CANCELED",
		"ERR_NOT_SUPPORT",
		"ERR_INVALID_URL"
	].forEach((code) => {
		descriptors[code] = { value: code };
	});
	Object.defineProperties(AxiosError$1, descriptors);
	Object.defineProperty(prototype$1, "isAxiosError", { value: true });
	AxiosError$1.from = (error, code, config, request, response, customProps) => {
		const axiosError = Object.create(prototype$1);
		utils_default.toFlatObject(error, axiosError, function filter(obj) {
			return obj !== Error.prototype;
		}, (prop) => {
			return prop !== "isAxiosError";
		});
		AxiosError$1.call(axiosError, error.message, code, config, request, response);
		axiosError.cause = error;
		axiosError.name = error.name;
		customProps && Object.assign(axiosError, customProps);
		return axiosError;
	};
}));
//#endregion
//#region ../../packages/agent-provider/node_modules/axios/lib/helpers/null.js
var init_null = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-provider/node_modules/axios/lib/helpers/toFormData.js
/**
* Determines if the given thing is a array or js object.
*
* @param {string} thing - The object or array to be visited.
*
* @returns {boolean}
*/
function isVisitable(thing) {
	return utils_default.isPlainObject(thing) || utils_default.isArray(thing);
}
/**
* It removes the brackets from the end of a string
*
* @param {string} key - The key of the parameter.
*
* @returns {string} the key without the brackets.
*/
function removeBrackets(key) {
	return utils_default.endsWith(key, "[]") ? key.slice(0, -2) : key;
}
/**
* It takes a path, a key, and a boolean, and returns a string
*
* @param {string} path - The path to the current key.
* @param {string} key - The key of the current object being iterated over.
* @param {string} dots - If true, the key will be rendered with dots instead of brackets.
*
* @returns {string} The path to the current key.
*/
function renderKey(path, key, dots) {
	if (!path) return key;
	return path.concat(key).map(function each(token, i) {
		token = removeBrackets(token);
		return !dots && i ? "[" + token + "]" : token;
	}).join(dots ? "." : "");
}
/**
* If the array is an array and none of its elements are visitable, then it's a flat array.
*
* @param {Array<any>} arr - The array to check
*
* @returns {boolean}
*/
function isFlatArray(arr) {
	return utils_default.isArray(arr) && !arr.some(isVisitable);
}
/**
* Convert a data object to FormData
*
* @param {Object} obj
* @param {?Object} [formData]
* @param {?Object} [options]
* @param {Function} [options.visitor]
* @param {Boolean} [options.metaTokens = true]
* @param {Boolean} [options.dots = false]
* @param {?Boolean} [options.indexes = false]
*
* @returns {Object}
**/
/**
* It converts an object into a FormData object
*
* @param {Object<any, any>} obj - The object to convert to form data.
* @param {string} formData - The FormData object to append to.
* @param {Object<string, any>} options
*
* @returns
*/
function toFormData$1(obj, formData, options) {
	if (!utils_default.isObject(obj)) throw new TypeError("target must be an object");
	formData = formData || new FormData();
	options = utils_default.toFlatObject(options, {
		metaTokens: true,
		dots: false,
		indexes: false
	}, false, function defined(option, source) {
		return !utils_default.isUndefined(source[option]);
	});
	const metaTokens = options.metaTokens;
	const visitor = options.visitor || defaultVisitor;
	const dots = options.dots;
	const indexes = options.indexes;
	const useBlob = (options.Blob || typeof Blob !== "undefined" && Blob) && utils_default.isSpecCompliantForm(formData);
	if (!utils_default.isFunction(visitor)) throw new TypeError("visitor must be a function");
	function convertValue(value) {
		if (value === null) return "";
		if (utils_default.isDate(value)) return value.toISOString();
		if (utils_default.isBoolean(value)) return value.toString();
		if (!useBlob && utils_default.isBlob(value)) throw new AxiosError$1("Blob is not supported. Use a Buffer instead.");
		if (utils_default.isArrayBuffer(value) || utils_default.isTypedArray(value)) return useBlob && typeof Blob === "function" ? new Blob([value]) : Buffer.from(value);
		return value;
	}
	/**
	* Default visitor.
	*
	* @param {*} value
	* @param {String|Number} key
	* @param {Array<String|Number>} path
	* @this {FormData}
	*
	* @returns {boolean} return true to visit the each prop of the value recursively
	*/
	function defaultVisitor(value, key, path) {
		let arr = value;
		if (value && !path && typeof value === "object") {
			if (utils_default.endsWith(key, "{}")) {
				key = metaTokens ? key : key.slice(0, -2);
				value = JSON.stringify(value);
			} else if (utils_default.isArray(value) && isFlatArray(value) || (utils_default.isFileList(value) || utils_default.endsWith(key, "[]")) && (arr = utils_default.toArray(value))) {
				key = removeBrackets(key);
				arr.forEach(function each(el, index) {
					!(utils_default.isUndefined(el) || el === null) && formData.append(indexes === true ? renderKey([key], index, dots) : indexes === null ? key : key + "[]", convertValue(el));
				});
				return false;
			}
		}
		if (isVisitable(value)) return true;
		formData.append(renderKey(path, key, dots), convertValue(value));
		return false;
	}
	const stack = [];
	const exposedHelpers = Object.assign(predicates, {
		defaultVisitor,
		convertValue,
		isVisitable
	});
	function build(value, path) {
		if (utils_default.isUndefined(value)) return;
		if (stack.indexOf(value) !== -1) throw Error("Circular reference detected in " + path.join("."));
		stack.push(value);
		utils_default.forEach(value, function each(el, key) {
			if ((!(utils_default.isUndefined(el) || el === null) && visitor.call(formData, el, utils_default.isString(key) ? key.trim() : key, path, exposedHelpers)) === true) build(el, path ? path.concat(key) : [key]);
		});
		stack.pop();
	}
	if (!utils_default.isObject(obj)) throw new TypeError("data must be an object");
	build(obj);
	return formData;
}
var predicates;
var init_toFormData = __esmMin((() => {
	init_dist$1();
	init_utils$2();
	init_AxiosError();
	init_null();
	predicates = utils_default.toFlatObject(utils_default, {}, null, function filter(prop) {
		return /^is[A-Z]/.test(prop);
	});
}));
//#endregion
//#region ../../packages/agent-provider/node_modules/axios/lib/helpers/AxiosURLSearchParams.js
/**
* It encodes a string by replacing all characters that are not in the unreserved set with
* their percent-encoded equivalents
*
* @param {string} str - The string to encode.
*
* @returns {string} The encoded string.
*/
function encode$1(str) {
	const charMap = {
		"!": "%21",
		"'": "%27",
		"(": "%28",
		")": "%29",
		"~": "%7E",
		"%20": "+",
		"%00": "\0"
	};
	return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
		return charMap[match];
	});
}
/**
* It takes a params object and converts it to a FormData object
*
* @param {Object<string, any>} params - The parameters to be converted to a FormData object.
* @param {Object<string, any>} options - The options object passed to the Axios constructor.
*
* @returns {void}
*/
function AxiosURLSearchParams(params, options) {
	this._pairs = [];
	params && toFormData$1(params, this, options);
}
var prototype;
var init_AxiosURLSearchParams = __esmMin((() => {
	init_toFormData();
	prototype = AxiosURLSearchParams.prototype;
	prototype.append = function append(name, value) {
		this._pairs.push([name, value]);
	};
	prototype.toString = function toString(encoder) {
		const _encode = encoder ? function(value) {
			return encoder.call(this, value, encode$1);
		} : encode$1;
		return this._pairs.map(function each(pair) {
			return _encode(pair[0]) + "=" + _encode(pair[1]);
		}, "").join("&");
	};
}));
//#endregion
//#region ../../packages/agent-provider/node_modules/axios/lib/helpers/buildURL.js
/**
* It replaces all instances of the characters `:`, `$`, `,`, `+`, `[`, and `]` with their
* URI encoded counterparts
*
* @param {string} val The value to be encoded.
*
* @returns {string} The encoded value.
*/
function encode(val) {
	return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
/**
* Build a URL by appending params to the end
*
* @param {string} url The base of the url (e.g., http://www.google.com)
* @param {object} [params] The params to be appended
* @param {?(object|Function)} options
*
* @returns {string} The formatted url
*/
function buildURL(url, params, options) {
	if (!params) return url;
	const _encode = options && options.encode || encode;
	if (utils_default.isFunction(options)) options = { serialize: options };
	const serializeFn = options && options.serialize;
	let serializedParams;
	if (serializeFn) serializedParams = serializeFn(params, options);
	else serializedParams = utils_default.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams(params, options).toString(_encode);
	if (serializedParams) {
		const hashmarkIndex = url.indexOf("#");
		if (hashmarkIndex !== -1) url = url.slice(0, hashmarkIndex);
		url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
	}
	return url;
}
var init_buildURL = __esmMin((() => {
	init_utils$2();
	init_AxiosURLSearchParams();
}));
//#endregion
//#region ../../packages/agent-provider/node_modules/axios/lib/core/InterceptorManager.js
var InterceptorManager;
var init_InterceptorManager = __esmMin((() => {
	init_utils$2();
	InterceptorManager = class {
		constructor() {
			this.handlers = [];
		}
		/**
		* Add a new interceptor to the stack
		*
		* @param {Function} fulfilled The function to handle `then` for a `Promise`
		* @param {Function} rejected The function to handle `reject` for a `Promise`
		*
		* @return {Number} An ID used to remove interceptor later
		*/
		use(fulfilled, rejected, options) {
			this.handlers.push({
				fulfilled,
				rejected,
				synchronous: options ? options.synchronous : false,
				runWhen: options ? options.runWhen : null
			});
			return this.handlers.length - 1;
		}
		/**
		* Remove an interceptor from the stack
		*
		* @param {Number} id The ID that was returned by `use`
		*
		* @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
		*/
		eject(id) {
			if (this.handlers[id]) this.handlers[id] = null;
		}
		/**
		* Clear all interceptors from the stack
		*
		* @returns {void}
		*/
		clear() {
			if (this.handlers) this.handlers = [];
		}
		/**
		* Iterate over all the registered interceptors
		*
		* This method is particularly useful for skipping over any
		* interceptors that may have become `null` calling `eject`.
		*
		* @param {Function} fn The function to call for each interceptor
		*
		* @returns {void}
		*/
		forEach(fn) {
			utils_default.forEach(this.handlers, function forEachHandler(h) {
				if (h !== null) fn(h);
			});
		}
	};
}));
//#endregion
//#region ../../packages/agent-provider/node_modules/axios/lib/defaults/transitional.js
var transitional_default;
var init_transitional = __esmMin((() => {
	transitional_default = {
		silentJSONParsing: true,
		forcedJSONParsing: true,
		clarifyTimeoutError: false
	};
}));
//#endregion
//#region ../../packages/agent-provider/node_modules/axios/lib/platform/browser/classes/URLSearchParams.js
var URLSearchParams_default;
var init_URLSearchParams = __esmMin((() => {
	init_AxiosURLSearchParams();
	URLSearchParams_default = typeof URLSearchParams !== "undefined" ? URLSearchParams : AxiosURLSearchParams;
}));
//#endregion
//#region ../../packages/agent-provider/node_modules/axios/lib/platform/browser/classes/FormData.js
var FormData_default;
var init_FormData = __esmMin((() => {
	FormData_default = typeof FormData !== "undefined" ? FormData : null;
}));
//#endregion
//#region ../../packages/agent-provider/node_modules/axios/lib/platform/browser/classes/Blob.js
var Blob_default;
var init_Blob = __esmMin((() => {
	Blob_default = typeof Blob !== "undefined" ? Blob : null;
}));
//#endregion
//#region ../../packages/agent-provider/node_modules/axios/lib/platform/browser/index.js
var browser_default;
var init_browser = __esmMin((() => {
	init_URLSearchParams();
	init_FormData();
	init_Blob();
	browser_default = {
		isBrowser: true,
		classes: {
			URLSearchParams: URLSearchParams_default,
			FormData: FormData_default,
			Blob: Blob_default
		},
		protocols: [
			"http",
			"https",
			"file",
			"blob",
			"url",
			"data"
		]
	};
}));
//#endregion
//#region ../../packages/agent-provider/node_modules/axios/lib/platform/common/utils.js
var utils_exports = /* @__PURE__ */ __exportAll({
	hasBrowserEnv: () => hasBrowserEnv,
	hasStandardBrowserEnv: () => hasStandardBrowserEnv,
	hasStandardBrowserWebWorkerEnv: () => hasStandardBrowserWebWorkerEnv,
	navigator: () => _navigator,
	origin: () => origin
});
var hasBrowserEnv, _navigator, hasStandardBrowserEnv, hasStandardBrowserWebWorkerEnv, origin;
var init_utils$1 = __esmMin((() => {
	hasBrowserEnv = typeof window !== "undefined" && typeof document !== "undefined";
	_navigator = typeof navigator === "object" && navigator || void 0;
	hasStandardBrowserEnv = hasBrowserEnv && (!_navigator || [
		"ReactNative",
		"NativeScript",
		"NS"
	].indexOf(_navigator.product) < 0);
	hasStandardBrowserWebWorkerEnv = typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope && typeof self.importScripts === "function";
	origin = hasBrowserEnv && window.location.href || "http://localhost";
}));
//#endregion
//#region ../../packages/agent-provider/node_modules/axios/lib/platform/index.js
var platform_default;
var init_platform = __esmMin((() => {
	init_browser();
	init_utils$1();
	platform_default = {
		...utils_exports,
		...browser_default
	};
}));
//#endregion
//#region ../../packages/agent-provider/node_modules/axios/lib/helpers/toURLEncodedForm.js
function toURLEncodedForm(data, options) {
	return toFormData$1(data, new platform_default.classes.URLSearchParams(), Object.assign({ visitor: function(value, key, path, helpers) {
		if (platform_default.isNode && utils_default.isBuffer(value)) {
			this.append(key, value.toString("base64"));
			return false;
		}
		return helpers.defaultVisitor.apply(this, arguments);
	} }, options));
}
var init_toURLEncodedForm = __esmMin((() => {
	init_utils$2();
	init_toFormData();
	init_platform();
}));
//#endregion
//#region ../../packages/agent-provider/node_modules/axios/lib/helpers/formDataToJSON.js
/**
* It takes a string like `foo[x][y][z]` and returns an array like `['foo', 'x', 'y', 'z']
*
* @param {string} name - The name of the property to get.
*
* @returns An array of strings.
*/
function parsePropPath(name) {
	return utils_default.matchAll(/\w+|\[(\w*)]/g, name).map((match) => {
		return match[0] === "[]" ? "" : match[1] || match[0];
	});
}
/**
* Convert an array to an object.
*
* @param {Array<any>} arr - The array to convert to an object.
*
* @returns An object with the same keys and values as the array.
*/
function arrayToObject(arr) {
	const obj = {};
	const keys = Object.keys(arr);
	let i;
	const len = keys.length;
	let key;
	for (i = 0; i < len; i++) {
		key = keys[i];
		obj[key] = arr[key];
	}
	return obj;
}
/**
* It takes a FormData object and returns a JavaScript object
*
* @param {string} formData The FormData object to convert to JSON.
*
* @returns {Object<string, any> | null} The converted object.
*/
function formDataToJSON(formData) {
	function buildPath(path, value, target, index) {
		let name = path[index++];
		if (name === "__proto__") return true;
		const isNumericKey = Number.isFinite(+name);
		const isLast = index >= path.length;
		name = !name && utils_default.isArray(target) ? target.length : name;
		if (isLast) {
			if (utils_default.hasOwnProp(target, name)) target[name] = [target[name], value];
			else target[name] = value;
			return !isNumericKey;
		}
		if (!target[name] || !utils_default.isObject(target[name])) target[name] = [];
		if (buildPath(path, value, target[name], index) && utils_default.isArray(target[name])) target[name] = arrayToObject(target[name]);
		return !isNumericKey;
	}
	if (utils_default.isFormData(formData) && utils_default.isFunction(formData.entries)) {
		const obj = {};
		utils_default.forEachEntry(formData, (name, value) => {
			buildPath(parsePropPath(name), value, obj, 0);
		});
		return obj;
	}
	return null;
}
var init_formDataToJSON = __esmMin((() => {
	init_utils$2();
}));
//#endregion
//#region ../../packages/agent-provider/node_modules/axios/lib/defaults/index.js
/**
* It takes a string, tries to parse it, and if it fails, it returns the stringified version
* of the input
*
* @param {any} rawValue - The value to be stringified.
* @param {Function} parser - A function that parses a string into a JavaScript object.
* @param {Function} encoder - A function that takes a value and returns a string.
*
* @returns {string} A stringified version of the rawValue.
*/
function stringifySafely(rawValue, parser, encoder) {
	if (utils_default.isString(rawValue)) try {
		(parser || JSON.parse)(rawValue);
		return utils_default.trim(rawValue);
	} catch (e) {
		if (e.name !== "SyntaxError") throw e;
	}
	return (encoder || JSON.stringify)(rawValue);
}
var defaults;
var init_defaults = __esmMin((() => {
	init_utils$2();
	init_AxiosError();
	init_transitional();
	init_toFormData();
	init_toURLEncodedForm();
	init_platform();
	init_formDataToJSON();
	defaults = {
		transitional: transitional_default,
		adapter: [
			"xhr",
			"http",
			"fetch"
		],
		transformRequest: [function transformRequest(data, headers) {
			const contentType = headers.getContentType() || "";
			const hasJSONContentType = contentType.indexOf("application/json") > -1;
			const isObjectPayload = utils_default.isObject(data);
			if (isObjectPayload && utils_default.isHTMLForm(data)) data = new FormData(data);
			if (utils_default.isFormData(data)) return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
			if (utils_default.isArrayBuffer(data) || utils_default.isBuffer(data) || utils_default.isStream(data) || utils_default.isFile(data) || utils_default.isBlob(data) || utils_default.isReadableStream(data)) return data;
			if (utils_default.isArrayBufferView(data)) return data.buffer;
			if (utils_default.isURLSearchParams(data)) {
				headers.setContentType("application/x-www-form-urlencoded;charset=utf-8", false);
				return data.toString();
			}
			let isFileList;
			if (isObjectPayload) {
				if (contentType.indexOf("application/x-www-form-urlencoded") > -1) return toURLEncodedForm(data, this.formSerializer).toString();
				if ((isFileList = utils_default.isFileList(data)) || contentType.indexOf("multipart/form-data") > -1) {
					const _FormData = this.env && this.env.FormData;
					return toFormData$1(isFileList ? { "files[]": data } : data, _FormData && new _FormData(), this.formSerializer);
				}
			}
			if (isObjectPayload || hasJSONContentType) {
				headers.setContentType("application/json", false);
				return stringifySafely(data);
			}
			return data;
		}],
		transformResponse: [function transformResponse(data) {
			const transitional = this.transitional || defaults.transitional;
			const forcedJSONParsing = transitional && transitional.forcedJSONParsing;
			const JSONRequested = this.responseType === "json";
			if (utils_default.isResponse(data) || utils_default.isReadableStream(data)) return data;
			if (data && utils_default.isString(data) && (forcedJSONParsing && !this.responseType || JSONRequested)) {
				const strictJSONParsing = !(transitional && transitional.silentJSONParsing) && JSONRequested;
				try {
					return JSON.parse(data);
				} catch (e) {
					if (strictJSONParsing) {
						if (e.name === "SyntaxError") throw AxiosError$1.from(e, AxiosError$1.ERR_BAD_RESPONSE, this, null, this.response);
						throw e;
					}
				}
			}
			return data;
		}],
		timeout: 0,
		xsrfCookieName: "XSRF-TOKEN",
		xsrfHeaderName: "X-XSRF-TOKEN",
		maxContentLength: -1,
		maxBodyLength: -1,
		env: {
			FormData: platform_default.classes.FormData,
			Blob: platform_default.classes.Blob
		},
		validateStatus: function validateStatus(status) {
			return status >= 200 && status < 300;
		},
		headers: { common: {
			"Accept": "application/json, text/plain, */*",
			"Content-Type": void 0
		} }
	};
	utils_default.forEach([
		"delete",
		"get",
		"head",
		"post",
		"put",
		"patch"
	], (method) => {
		defaults.headers[method] = {};
	});
}));
//#endregion
//#region ../../packages/agent-provider/node_modules/axios/lib/helpers/parseHeaders.js
var ignoreDuplicateOf, parseHeaders_default;
var init_parseHeaders = __esmMin((() => {
	init_utils$2();
	ignoreDuplicateOf = utils_default.toObjectSet([
		"age",
		"authorization",
		"content-length",
		"content-type",
		"etag",
		"expires",
		"from",
		"host",
		"if-modified-since",
		"if-unmodified-since",
		"last-modified",
		"location",
		"max-forwards",
		"proxy-authorization",
		"referer",
		"retry-after",
		"user-agent"
	]);
	parseHeaders_default = (rawHeaders) => {
		const parsed = {};
		let key;
		let val;
		let i;
		rawHeaders && rawHeaders.split("\n").forEach(function parser(line) {
			i = line.indexOf(":");
			key = line.substring(0, i).trim().toLowerCase();
			val = line.substring(i + 1).trim();
			if (!key || parsed[key] && ignoreDuplicateOf[key]) return;
			if (key === "set-cookie") if (parsed[key]) parsed[key].push(val);
			else parsed[key] = [val];
			else parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
		});
		return parsed;
	};
}));
//#endregion
//#region ../../packages/agent-provider/node_modules/axios/lib/core/AxiosHeaders.js
function normalizeHeader(header) {
	return header && String(header).trim().toLowerCase();
}
function normalizeValue(value) {
	if (value === false || value == null) return value;
	return utils_default.isArray(value) ? value.map(normalizeValue) : String(value);
}
function parseTokens(str) {
	const tokens = Object.create(null);
	const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
	let match;
	while (match = tokensRE.exec(str)) tokens[match[1]] = match[2];
	return tokens;
}
function matchHeaderValue(context, value, header, filter, isHeaderNameFilter) {
	if (utils_default.isFunction(filter)) return filter.call(this, value, header);
	if (isHeaderNameFilter) value = header;
	if (!utils_default.isString(value)) return;
	if (utils_default.isString(filter)) return value.indexOf(filter) !== -1;
	if (utils_default.isRegExp(filter)) return filter.test(value);
}
function formatHeader(header) {
	return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
		return char.toUpperCase() + str;
	});
}
function buildAccessors(obj, header) {
	const accessorName = utils_default.toCamelCase(" " + header);
	[
		"get",
		"set",
		"has"
	].forEach((methodName) => {
		Object.defineProperty(obj, methodName + accessorName, {
			value: function(arg1, arg2, arg3) {
				return this[methodName].call(this, header, arg1, arg2, arg3);
			},
			configurable: true
		});
	});
}
var $internals, isValidHeaderName, AxiosHeaders$1;
var init_AxiosHeaders = __esmMin((() => {
	init_utils$2();
	init_parseHeaders();
	$internals = Symbol("internals");
	isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
	AxiosHeaders$1 = class {
		constructor(headers) {
			headers && this.set(headers);
		}
		set(header, valueOrRewrite, rewrite) {
			const self = this;
			function setHeader(_value, _header, _rewrite) {
				const lHeader = normalizeHeader(_header);
				if (!lHeader) throw new Error("header name must be a non-empty string");
				const key = utils_default.findKey(self, lHeader);
				if (!key || self[key] === void 0 || _rewrite === true || _rewrite === void 0 && self[key] !== false) self[key || _header] = normalizeValue(_value);
			}
			const setHeaders = (headers, _rewrite) => utils_default.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));
			if (utils_default.isPlainObject(header) || header instanceof this.constructor) setHeaders(header, valueOrRewrite);
			else if (utils_default.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) setHeaders(parseHeaders_default(header), valueOrRewrite);
			else if (utils_default.isObject(header) && utils_default.isIterable(header)) {
				let obj = {}, dest, key;
				for (const entry of header) {
					if (!utils_default.isArray(entry)) throw TypeError("Object iterator must return a key-value pair");
					obj[key = entry[0]] = (dest = obj[key]) ? utils_default.isArray(dest) ? [...dest, entry[1]] : [dest, entry[1]] : entry[1];
				}
				setHeaders(obj, valueOrRewrite);
			} else header != null && setHeader(valueOrRewrite, header, rewrite);
			return this;
		}
		get(header, parser) {
			header = normalizeHeader(header);
			if (header) {
				const key = utils_default.findKey(this, header);
				if (key) {
					const value = this[key];
					if (!parser) return value;
					if (parser === true) return parseTokens(value);
					if (utils_default.isFunction(parser)) return parser.call(this, value, key);
					if (utils_default.isRegExp(parser)) return parser.exec(value);
					throw new TypeError("parser must be boolean|regexp|function");
				}
			}
		}
		has(header, matcher) {
			header = normalizeHeader(header);
			if (header) {
				const key = utils_default.findKey(this, header);
				return !!(key && this[key] !== void 0 && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
			}
			return false;
		}
		delete(header, matcher) {
			const self = this;
			let deleted = false;
			function deleteHeader(_header) {
				_header = normalizeHeader(_header);
				if (_header) {
					const key = utils_default.findKey(self, _header);
					if (key && (!matcher || matchHeaderValue(self, self[key], key, matcher))) {
						delete self[key];
						deleted = true;
					}
				}
			}
			if (utils_default.isArray(header)) header.forEach(deleteHeader);
			else deleteHeader(header);
			return deleted;
		}
		clear(matcher) {
			const keys = Object.keys(this);
			let i = keys.length;
			let deleted = false;
			while (i--) {
				const key = keys[i];
				if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
					delete this[key];
					deleted = true;
				}
			}
			return deleted;
		}
		normalize(format) {
			const self = this;
			const headers = {};
			utils_default.forEach(this, (value, header) => {
				const key = utils_default.findKey(headers, header);
				if (key) {
					self[key] = normalizeValue(value);
					delete self[header];
					return;
				}
				const normalized = format ? formatHeader(header) : String(header).trim();
				if (normalized !== header) delete self[header];
				self[normalized] = normalizeValue(value);
				headers[normalized] = true;
			});
			return this;
		}
		concat(...targets) {
			return this.constructor.concat(this, ...targets);
		}
		toJSON(asStrings) {
			const obj = Object.create(null);
			utils_default.forEach(this, (value, header) => {
				value != null && value !== false && (obj[header] = asStrings && utils_default.isArray(value) ? value.join(", ") : value);
			});
			return obj;
		}
		[Symbol.iterator]() {
			return Object.entries(this.toJSON())[Symbol.iterator]();
		}
		toString() {
			return Object.entries(this.toJSON()).map(([header, value]) => header + ": " + value).join("\n");
		}
		getSetCookie() {
			return this.get("set-cookie") || [];
		}
		get [Symbol.toStringTag]() {
			return "AxiosHeaders";
		}
		static from(thing) {
			return thing instanceof this ? thing : new this(thing);
		}
		static concat(first, ...targets) {
			const computed = new this(first);
			targets.forEach((target) => computed.set(target));
			return computed;
		}
		static accessor(header) {
			const accessors = (this[$internals] = this[$internals] = { accessors: {} }).accessors;
			const prototype = this.prototype;
			function defineAccessor(_header) {
				const lHeader = normalizeHeader(_header);
				if (!accessors[lHeader]) {
					buildAccessors(prototype, _header);
					accessors[lHeader] = true;
				}
			}
			utils_default.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
			return this;
		}
	};
	AxiosHeaders$1.accessor([
		"Content-Type",
		"Content-Length",
		"Accept",
		"Accept-Encoding",
		"User-Agent",
		"Authorization"
	]);
	utils_default.reduceDescriptors(AxiosHeaders$1.prototype, ({ value }, key) => {
		let mapped = key[0].toUpperCase() + key.slice(1);
		return {
			get: () => value,
			set(headerValue) {
				this[mapped] = headerValue;
			}
		};
	});
	utils_default.freezeMethods(AxiosHeaders$1);
}));
//#endregion
//#region ../../packages/agent-provider/node_modules/axios/lib/core/transformData.js
/**
* Transform the data for a request or a response
*
* @param {Array|Function} fns A single function or Array of functions
* @param {?Object} response The response object
*
* @returns {*} The resulting transformed data
*/
function transformData(fns, response) {
	const config = this || defaults;
	const context = response || config;
	const headers = AxiosHeaders$1.from(context.headers);
	let data = context.data;
	utils_default.forEach(fns, function transform(fn) {
		data = fn.call(config, data, headers.normalize(), response ? response.status : void 0);
	});
	headers.normalize();
	return data;
}
var init_transformData = __esmMin((() => {
	init_utils$2();
	init_defaults();
	init_AxiosHeaders();
}));
//#endregion
//#region ../../packages/agent-provider/node_modules/axios/lib/cancel/isCancel.js
function isCancel$1(value) {
	return !!(value && value.__CANCEL__);
}
var init_isCancel = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-provider/node_modules/axios/lib/cancel/CanceledError.js
/**
* A `CanceledError` is an object that is thrown when an operation is canceled.
*
* @param {string=} message The message.
* @param {Object=} config The config.
* @param {Object=} request The request.
*
* @returns {CanceledError} The created error.
*/
function CanceledError$1(message, config, request) {
	AxiosError$1.call(this, message == null ? "canceled" : message, AxiosError$1.ERR_CANCELED, config, request);
	this.name = "CanceledError";
}
var init_CanceledError = __esmMin((() => {
	init_AxiosError();
	init_utils$2();
	utils_default.inherits(CanceledError$1, AxiosError$1, { __CANCEL__: true });
}));
//#endregion
//#region ../../packages/agent-provider/node_modules/axios/lib/core/settle.js
/**
* Resolve or reject a Promise based on response status.
*
* @param {Function} resolve A function that resolves the promise.
* @param {Function} reject A function that rejects the promise.
* @param {object} response The response.
*
* @returns {object} The response.
*/
function settle(resolve, reject, response) {
	const validateStatus = response.config.validateStatus;
	if (!response.status || !validateStatus || validateStatus(response.status)) resolve(response);
	else reject(new AxiosError$1("Request failed with status code " + response.status, [AxiosError$1.ERR_BAD_REQUEST, AxiosError$1.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4], response.config, response.request, response));
}
var init_settle = __esmMin((() => {
	init_AxiosError();
}));
//#endregion
//#region ../../packages/agent-provider/node_modules/axios/lib/helpers/parseProtocol.js
function parseProtocol(url) {
	const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
	return match && match[1] || "";
}
var init_parseProtocol = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-provider/node_modules/axios/lib/helpers/speedometer.js
/**
* Calculate data maxRate
* @param {Number} [samplesCount= 10]
* @param {Number} [min= 1000]
* @returns {Function}
*/
function speedometer(samplesCount, min) {
	samplesCount = samplesCount || 10;
	const bytes = new Array(samplesCount);
	const timestamps = new Array(samplesCount);
	let head = 0;
	let tail = 0;
	let firstSampleTS;
	min = min !== void 0 ? min : 1e3;
	return function push(chunkLength) {
		const now = Date.now();
		const startedAt = timestamps[tail];
		if (!firstSampleTS) firstSampleTS = now;
		bytes[head] = chunkLength;
		timestamps[head] = now;
		let i = tail;
		let bytesCount = 0;
		while (i !== head) {
			bytesCount += bytes[i++];
			i = i % samplesCount;
		}
		head = (head + 1) % samplesCount;
		if (head === tail) tail = (tail + 1) % samplesCount;
		if (now - firstSampleTS < min) return;
		const passed = startedAt && now - startedAt;
		return passed ? Math.round(bytesCount * 1e3 / passed) : void 0;
	};
}
var init_speedometer = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-provider/node_modules/axios/lib/helpers/throttle.js
/**
* Throttle decorator
* @param {Function} fn
* @param {Number} freq
* @return {Function}
*/
function throttle(fn, freq) {
	let timestamp = 0;
	let threshold = 1e3 / freq;
	let lastArgs;
	let timer;
	const invoke = (args, now = Date.now()) => {
		timestamp = now;
		lastArgs = null;
		if (timer) {
			clearTimeout(timer);
			timer = null;
		}
		fn.apply(null, args);
	};
	const throttled = (...args) => {
		const now = Date.now();
		const passed = now - timestamp;
		if (passed >= threshold) invoke(args, now);
		else {
			lastArgs = args;
			if (!timer) timer = setTimeout(() => {
				timer = null;
				invoke(lastArgs);
			}, threshold - passed);
		}
	};
	const flush = () => lastArgs && invoke(lastArgs);
	return [throttled, flush];
}
var init_throttle = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-provider/node_modules/axios/lib/helpers/progressEventReducer.js
var progressEventReducer, progressEventDecorator, asyncDecorator;
var init_progressEventReducer = __esmMin((() => {
	init_speedometer();
	init_throttle();
	init_utils$2();
	progressEventReducer = (listener, isDownloadStream, freq = 3) => {
		let bytesNotified = 0;
		const _speedometer = speedometer(50, 250);
		return throttle((e) => {
			const loaded = e.loaded;
			const total = e.lengthComputable ? e.total : void 0;
			const progressBytes = loaded - bytesNotified;
			const rate = _speedometer(progressBytes);
			const inRange = loaded <= total;
			bytesNotified = loaded;
			listener({
				loaded,
				total,
				progress: total ? loaded / total : void 0,
				bytes: progressBytes,
				rate: rate ? rate : void 0,
				estimated: rate && total && inRange ? (total - loaded) / rate : void 0,
				event: e,
				lengthComputable: total != null,
				[isDownloadStream ? "download" : "upload"]: true
			});
		}, freq);
	};
	progressEventDecorator = (total, throttled) => {
		const lengthComputable = total != null;
		return [(loaded) => throttled[0]({
			lengthComputable,
			total,
			loaded
		}), throttled[1]];
	};
	asyncDecorator = (fn) => (...args) => utils_default.asap(() => fn(...args));
}));
//#endregion
//#region ../../packages/agent-provider/node_modules/axios/lib/helpers/isURLSameOrigin.js
var isURLSameOrigin_default;
var init_isURLSameOrigin = __esmMin((() => {
	init_platform();
	isURLSameOrigin_default = platform_default.hasStandardBrowserEnv ? ((origin, isMSIE) => (url) => {
		url = new URL(url, platform_default.origin);
		return origin.protocol === url.protocol && origin.host === url.host && (isMSIE || origin.port === url.port);
	})(new URL(platform_default.origin), platform_default.navigator && /(msie|trident)/i.test(platform_default.navigator.userAgent)) : () => true;
}));
//#endregion
//#region ../../packages/agent-provider/node_modules/axios/lib/helpers/cookies.js
var cookies_default;
var init_cookies = __esmMin((() => {
	init_utils$2();
	init_platform();
	cookies_default = platform_default.hasStandardBrowserEnv ? {
		write(name, value, expires, path, domain, secure) {
			const cookie = [name + "=" + encodeURIComponent(value)];
			utils_default.isNumber(expires) && cookie.push("expires=" + new Date(expires).toGMTString());
			utils_default.isString(path) && cookie.push("path=" + path);
			utils_default.isString(domain) && cookie.push("domain=" + domain);
			secure === true && cookie.push("secure");
			document.cookie = cookie.join("; ");
		},
		read(name) {
			const match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
			return match ? decodeURIComponent(match[3]) : null;
		},
		remove(name) {
			this.write(name, "", Date.now() - 864e5);
		}
	} : {
		write() {},
		read() {
			return null;
		},
		remove() {}
	};
}));
//#endregion
//#region ../../packages/agent-provider/node_modules/axios/lib/helpers/isAbsoluteURL.js
/**
* Determines whether the specified URL is absolute
*
* @param {string} url The URL to test
*
* @returns {boolean} True if the specified URL is absolute, otherwise false
*/
function isAbsoluteURL(url) {
	return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}
var init_isAbsoluteURL = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-provider/node_modules/axios/lib/helpers/combineURLs.js
/**
* Creates a new URL by combining the specified URLs
*
* @param {string} baseURL The base URL
* @param {string} relativeURL The relative URL
*
* @returns {string} The combined URL
*/
function combineURLs(baseURL, relativeURL) {
	return relativeURL ? baseURL.replace(/\/?\/$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
}
var init_combineURLs = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-provider/node_modules/axios/lib/core/buildFullPath.js
/**
* Creates a new URL by combining the baseURL with the requestedURL,
* only when the requestedURL is not already an absolute URL.
* If the requestURL is absolute, this function returns the requestedURL untouched.
*
* @param {string} baseURL The base URL
* @param {string} requestedURL Absolute or relative URL to combine
*
* @returns {string} The combined full path
*/
function buildFullPath(baseURL, requestedURL, allowAbsoluteUrls) {
	let isRelativeUrl = !isAbsoluteURL(requestedURL);
	if (baseURL && (isRelativeUrl || allowAbsoluteUrls == false)) return combineURLs(baseURL, requestedURL);
	return requestedURL;
}
var init_buildFullPath = __esmMin((() => {
	init_isAbsoluteURL();
	init_combineURLs();
}));
//#endregion
//#region ../../packages/agent-provider/node_modules/axios/lib/core/mergeConfig.js
/**
* Config-specific merge-function which creates a new config-object
* by merging two configuration objects together.
*
* @param {Object} config1
* @param {Object} config2
*
* @returns {Object} New object resulting from merging config2 to config1
*/
function mergeConfig$1(config1, config2) {
	config2 = config2 || {};
	const config = {};
	function getMergedValue(target, source, prop, caseless) {
		if (utils_default.isPlainObject(target) && utils_default.isPlainObject(source)) return utils_default.merge.call({ caseless }, target, source);
		else if (utils_default.isPlainObject(source)) return utils_default.merge({}, source);
		else if (utils_default.isArray(source)) return source.slice();
		return source;
	}
	function mergeDeepProperties(a, b, prop, caseless) {
		if (!utils_default.isUndefined(b)) return getMergedValue(a, b, prop, caseless);
		else if (!utils_default.isUndefined(a)) return getMergedValue(void 0, a, prop, caseless);
	}
	function valueFromConfig2(a, b) {
		if (!utils_default.isUndefined(b)) return getMergedValue(void 0, b);
	}
	function defaultToConfig2(a, b) {
		if (!utils_default.isUndefined(b)) return getMergedValue(void 0, b);
		else if (!utils_default.isUndefined(a)) return getMergedValue(void 0, a);
	}
	function mergeDirectKeys(a, b, prop) {
		if (prop in config2) return getMergedValue(a, b);
		else if (prop in config1) return getMergedValue(void 0, a);
	}
	const mergeMap = {
		url: valueFromConfig2,
		method: valueFromConfig2,
		data: valueFromConfig2,
		baseURL: defaultToConfig2,
		transformRequest: defaultToConfig2,
		transformResponse: defaultToConfig2,
		paramsSerializer: defaultToConfig2,
		timeout: defaultToConfig2,
		timeoutMessage: defaultToConfig2,
		withCredentials: defaultToConfig2,
		withXSRFToken: defaultToConfig2,
		adapter: defaultToConfig2,
		responseType: defaultToConfig2,
		xsrfCookieName: defaultToConfig2,
		xsrfHeaderName: defaultToConfig2,
		onUploadProgress: defaultToConfig2,
		onDownloadProgress: defaultToConfig2,
		decompress: defaultToConfig2,
		maxContentLength: defaultToConfig2,
		maxBodyLength: defaultToConfig2,
		beforeRedirect: defaultToConfig2,
		transport: defaultToConfig2,
		httpAgent: defaultToConfig2,
		httpsAgent: defaultToConfig2,
		cancelToken: defaultToConfig2,
		socketPath: defaultToConfig2,
		responseEncoding: defaultToConfig2,
		validateStatus: mergeDirectKeys,
		headers: (a, b, prop) => mergeDeepProperties(headersToObject(a), headersToObject(b), prop, true)
	};
	utils_default.forEach(Object.keys(Object.assign({}, config1, config2)), function computeConfigValue(prop) {
		const merge = mergeMap[prop] || mergeDeepProperties;
		const configValue = merge(config1[prop], config2[prop], prop);
		utils_default.isUndefined(configValue) && merge !== mergeDirectKeys || (config[prop] = configValue);
	});
	return config;
}
var headersToObject;
var init_mergeConfig = __esmMin((() => {
	init_utils$2();
	init_AxiosHeaders();
	headersToObject = (thing) => thing instanceof AxiosHeaders$1 ? { ...thing } : thing;
}));
//#endregion
//#region ../../packages/agent-provider/node_modules/axios/lib/helpers/resolveConfig.js
var resolveConfig_default;
var init_resolveConfig = __esmMin((() => {
	init_platform();
	init_utils$2();
	init_isURLSameOrigin();
	init_cookies();
	init_buildFullPath();
	init_mergeConfig();
	init_AxiosHeaders();
	init_buildURL();
	resolveConfig_default = (config) => {
		const newConfig = mergeConfig$1({}, config);
		let { data, withXSRFToken, xsrfHeaderName, xsrfCookieName, headers, auth } = newConfig;
		newConfig.headers = headers = AxiosHeaders$1.from(headers);
		newConfig.url = buildURL(buildFullPath(newConfig.baseURL, newConfig.url, newConfig.allowAbsoluteUrls), config.params, config.paramsSerializer);
		if (auth) headers.set("Authorization", "Basic " + btoa((auth.username || "") + ":" + (auth.password ? unescape(encodeURIComponent(auth.password)) : "")));
		let contentType;
		if (utils_default.isFormData(data)) {
			if (platform_default.hasStandardBrowserEnv || platform_default.hasStandardBrowserWebWorkerEnv) headers.setContentType(void 0);
			else if ((contentType = headers.getContentType()) !== false) {
				const [type, ...tokens] = contentType ? contentType.split(";").map((token) => token.trim()).filter(Boolean) : [];
				headers.setContentType([type || "multipart/form-data", ...tokens].join("; "));
			}
		}
		if (platform_default.hasStandardBrowserEnv) {
			withXSRFToken && utils_default.isFunction(withXSRFToken) && (withXSRFToken = withXSRFToken(newConfig));
			if (withXSRFToken || withXSRFToken !== false && isURLSameOrigin_default(newConfig.url)) {
				const xsrfValue = xsrfHeaderName && xsrfCookieName && cookies_default.read(xsrfCookieName);
				if (xsrfValue) headers.set(xsrfHeaderName, xsrfValue);
			}
		}
		return newConfig;
	};
}));
//#endregion
//#region ../../packages/agent-provider/node_modules/axios/lib/adapters/xhr.js
var isXHRAdapterSupported, xhr_default;
var init_xhr = __esmMin((() => {
	init_utils$2();
	init_settle();
	init_transitional();
	init_AxiosError();
	init_CanceledError();
	init_parseProtocol();
	init_platform();
	init_AxiosHeaders();
	init_progressEventReducer();
	init_resolveConfig();
	isXHRAdapterSupported = typeof XMLHttpRequest !== "undefined";
	xhr_default = isXHRAdapterSupported && function(config) {
		return new Promise(function dispatchXhrRequest(resolve, reject) {
			const _config = resolveConfig_default(config);
			let requestData = _config.data;
			const requestHeaders = AxiosHeaders$1.from(_config.headers).normalize();
			let { responseType, onUploadProgress, onDownloadProgress } = _config;
			let onCanceled;
			let uploadThrottled, downloadThrottled;
			let flushUpload, flushDownload;
			function done() {
				flushUpload && flushUpload();
				flushDownload && flushDownload();
				_config.cancelToken && _config.cancelToken.unsubscribe(onCanceled);
				_config.signal && _config.signal.removeEventListener("abort", onCanceled);
			}
			let request = new XMLHttpRequest();
			request.open(_config.method.toUpperCase(), _config.url, true);
			request.timeout = _config.timeout;
			function onloadend() {
				if (!request) return;
				const responseHeaders = AxiosHeaders$1.from("getAllResponseHeaders" in request && request.getAllResponseHeaders());
				settle(function _resolve(value) {
					resolve(value);
					done();
				}, function _reject(err) {
					reject(err);
					done();
				}, {
					data: !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response,
					status: request.status,
					statusText: request.statusText,
					headers: responseHeaders,
					config,
					request
				});
				request = null;
			}
			if ("onloadend" in request) request.onloadend = onloadend;
			else request.onreadystatechange = function handleLoad() {
				if (!request || request.readyState !== 4) return;
				if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) return;
				setTimeout(onloadend);
			};
			request.onabort = function handleAbort() {
				if (!request) return;
				reject(new AxiosError$1("Request aborted", AxiosError$1.ECONNABORTED, config, request));
				request = null;
			};
			request.onerror = function handleError() {
				reject(new AxiosError$1("Network Error", AxiosError$1.ERR_NETWORK, config, request));
				request = null;
			};
			request.ontimeout = function handleTimeout() {
				let timeoutErrorMessage = _config.timeout ? "timeout of " + _config.timeout + "ms exceeded" : "timeout exceeded";
				const transitional = _config.transitional || transitional_default;
				if (_config.timeoutErrorMessage) timeoutErrorMessage = _config.timeoutErrorMessage;
				reject(new AxiosError$1(timeoutErrorMessage, transitional.clarifyTimeoutError ? AxiosError$1.ETIMEDOUT : AxiosError$1.ECONNABORTED, config, request));
				request = null;
			};
			requestData === void 0 && requestHeaders.setContentType(null);
			if ("setRequestHeader" in request) utils_default.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
				request.setRequestHeader(key, val);
			});
			if (!utils_default.isUndefined(_config.withCredentials)) request.withCredentials = !!_config.withCredentials;
			if (responseType && responseType !== "json") request.responseType = _config.responseType;
			if (onDownloadProgress) {
				[downloadThrottled, flushDownload] = progressEventReducer(onDownloadProgress, true);
				request.addEventListener("progress", downloadThrottled);
			}
			if (onUploadProgress && request.upload) {
				[uploadThrottled, flushUpload] = progressEventReducer(onUploadProgress);
				request.upload.addEventListener("progress", uploadThrottled);
				request.upload.addEventListener("loadend", flushUpload);
			}
			if (_config.cancelToken || _config.signal) {
				onCanceled = (cancel) => {
					if (!request) return;
					reject(!cancel || cancel.type ? new CanceledError$1(null, config, request) : cancel);
					request.abort();
					request = null;
				};
				_config.cancelToken && _config.cancelToken.subscribe(onCanceled);
				if (_config.signal) _config.signal.aborted ? onCanceled() : _config.signal.addEventListener("abort", onCanceled);
			}
			const protocol = parseProtocol(_config.url);
			if (protocol && platform_default.protocols.indexOf(protocol) === -1) {
				reject(new AxiosError$1("Unsupported protocol " + protocol + ":", AxiosError$1.ERR_BAD_REQUEST, config));
				return;
			}
			request.send(requestData || null);
		});
	};
}));
//#endregion
//#region ../../packages/agent-provider/node_modules/axios/lib/helpers/composeSignals.js
var composeSignals;
var init_composeSignals = __esmMin((() => {
	init_CanceledError();
	init_AxiosError();
	init_utils$2();
	composeSignals = (signals, timeout) => {
		const { length } = signals = signals ? signals.filter(Boolean) : [];
		if (timeout || length) {
			let controller = new AbortController();
			let aborted;
			const onabort = function(reason) {
				if (!aborted) {
					aborted = true;
					unsubscribe();
					const err = reason instanceof Error ? reason : this.reason;
					controller.abort(err instanceof AxiosError$1 ? err : new CanceledError$1(err instanceof Error ? err.message : err));
				}
			};
			let timer = timeout && setTimeout(() => {
				timer = null;
				onabort(new AxiosError$1(`timeout ${timeout} of ms exceeded`, AxiosError$1.ETIMEDOUT));
			}, timeout);
			const unsubscribe = () => {
				if (signals) {
					timer && clearTimeout(timer);
					timer = null;
					signals.forEach((signal) => {
						signal.unsubscribe ? signal.unsubscribe(onabort) : signal.removeEventListener("abort", onabort);
					});
					signals = null;
				}
			};
			signals.forEach((signal) => signal.addEventListener("abort", onabort));
			const { signal } = controller;
			signal.unsubscribe = () => utils_default.asap(unsubscribe);
			return signal;
		}
	};
}));
//#endregion
//#region ../../packages/agent-provider/node_modules/axios/lib/helpers/trackStream.js
var streamChunk, readBytes, readStream, trackStream;
var init_trackStream = __esmMin((() => {
	streamChunk = function* (chunk, chunkSize) {
		let len = chunk.byteLength;
		if (!chunkSize || len < chunkSize) {
			yield chunk;
			return;
		}
		let pos = 0;
		let end;
		while (pos < len) {
			end = pos + chunkSize;
			yield chunk.slice(pos, end);
			pos = end;
		}
	};
	readBytes = async function* (iterable, chunkSize) {
		for await (const chunk of readStream(iterable)) yield* streamChunk(chunk, chunkSize);
	};
	readStream = async function* (stream) {
		if (stream[Symbol.asyncIterator]) {
			yield* stream;
			return;
		}
		const reader = stream.getReader();
		try {
			for (;;) {
				const { done, value } = await reader.read();
				if (done) break;
				yield value;
			}
		} finally {
			await reader.cancel();
		}
	};
	trackStream = (stream, chunkSize, onProgress, onFinish) => {
		const iterator = readBytes(stream, chunkSize);
		let bytes = 0;
		let done;
		let _onFinish = (e) => {
			if (!done) {
				done = true;
				onFinish && onFinish(e);
			}
		};
		return new ReadableStream({
			async pull(controller) {
				try {
					const { done, value } = await iterator.next();
					if (done) {
						_onFinish();
						controller.close();
						return;
					}
					let len = value.byteLength;
					if (onProgress) onProgress(bytes += len);
					controller.enqueue(new Uint8Array(value));
				} catch (err) {
					_onFinish(err);
					throw err;
				}
			},
			cancel(reason) {
				_onFinish(reason);
				return iterator.return();
			}
		}, { highWaterMark: 2 });
	};
}));
//#endregion
//#region ../../packages/agent-provider/node_modules/axios/lib/adapters/fetch.js
var isFetchSupported, isReadableStreamSupported, encodeText, test, supportsRequestStream, DEFAULT_CHUNK_SIZE, supportsResponseStream, resolvers, getBodyLength, resolveBodyLength, fetch_default;
var init_fetch = __esmMin((() => {
	init_platform();
	init_utils$2();
	init_AxiosError();
	init_composeSignals();
	init_trackStream();
	init_AxiosHeaders();
	init_progressEventReducer();
	init_resolveConfig();
	init_settle();
	isFetchSupported = typeof fetch === "function" && typeof Request === "function" && typeof Response === "function";
	isReadableStreamSupported = isFetchSupported && typeof ReadableStream === "function";
	encodeText = isFetchSupported && (typeof TextEncoder === "function" ? ((encoder) => (str) => encoder.encode(str))(new TextEncoder()) : async (str) => new Uint8Array(await new Response(str).arrayBuffer()));
	test = (fn, ...args) => {
		try {
			return !!fn(...args);
		} catch (e) {
			return false;
		}
	};
	supportsRequestStream = isReadableStreamSupported && test(() => {
		let duplexAccessed = false;
		const hasContentType = new Request(platform_default.origin, {
			body: new ReadableStream(),
			method: "POST",
			get duplex() {
				duplexAccessed = true;
				return "half";
			}
		}).headers.has("Content-Type");
		return duplexAccessed && !hasContentType;
	});
	DEFAULT_CHUNK_SIZE = 64 * 1024;
	supportsResponseStream = isReadableStreamSupported && test(() => utils_default.isReadableStream(new Response("").body));
	resolvers = { stream: supportsResponseStream && ((res) => res.body) };
	isFetchSupported && ((res) => {
		[
			"text",
			"arrayBuffer",
			"blob",
			"formData",
			"stream"
		].forEach((type) => {
			!resolvers[type] && (resolvers[type] = utils_default.isFunction(res[type]) ? (res) => res[type]() : (_, config) => {
				throw new AxiosError$1(`Response type '${type}' is not supported`, AxiosError$1.ERR_NOT_SUPPORT, config);
			});
		});
	})(new Response());
	getBodyLength = async (body) => {
		if (body == null) return 0;
		if (utils_default.isBlob(body)) return body.size;
		if (utils_default.isSpecCompliantForm(body)) return (await new Request(platform_default.origin, {
			method: "POST",
			body
		}).arrayBuffer()).byteLength;
		if (utils_default.isArrayBufferView(body) || utils_default.isArrayBuffer(body)) return body.byteLength;
		if (utils_default.isURLSearchParams(body)) body = body + "";
		if (utils_default.isString(body)) return (await encodeText(body)).byteLength;
	};
	resolveBodyLength = async (headers, body) => {
		const length = utils_default.toFiniteNumber(headers.getContentLength());
		return length == null ? getBodyLength(body) : length;
	};
	fetch_default = isFetchSupported && (async (config) => {
		let { url, method, data, signal, cancelToken, timeout, onDownloadProgress, onUploadProgress, responseType, headers, withCredentials = "same-origin", fetchOptions } = resolveConfig_default(config);
		responseType = responseType ? (responseType + "").toLowerCase() : "text";
		let composedSignal = composeSignals([signal, cancelToken && cancelToken.toAbortSignal()], timeout);
		let request;
		const unsubscribe = composedSignal && composedSignal.unsubscribe && (() => {
			composedSignal.unsubscribe();
		});
		let requestContentLength;
		try {
			if (onUploadProgress && supportsRequestStream && method !== "get" && method !== "head" && (requestContentLength = await resolveBodyLength(headers, data)) !== 0) {
				let _request = new Request(url, {
					method: "POST",
					body: data,
					duplex: "half"
				});
				let contentTypeHeader;
				if (utils_default.isFormData(data) && (contentTypeHeader = _request.headers.get("content-type"))) headers.setContentType(contentTypeHeader);
				if (_request.body) {
					const [onProgress, flush] = progressEventDecorator(requestContentLength, progressEventReducer(asyncDecorator(onUploadProgress)));
					data = trackStream(_request.body, DEFAULT_CHUNK_SIZE, onProgress, flush);
				}
			}
			if (!utils_default.isString(withCredentials)) withCredentials = withCredentials ? "include" : "omit";
			const isCredentialsSupported = "credentials" in Request.prototype;
			request = new Request(url, {
				...fetchOptions,
				signal: composedSignal,
				method: method.toUpperCase(),
				headers: headers.normalize().toJSON(),
				body: data,
				duplex: "half",
				credentials: isCredentialsSupported ? withCredentials : void 0
			});
			let response = await fetch(request, fetchOptions);
			const isStreamResponse = supportsResponseStream && (responseType === "stream" || responseType === "response");
			if (supportsResponseStream && (onDownloadProgress || isStreamResponse && unsubscribe)) {
				const options = {};
				[
					"status",
					"statusText",
					"headers"
				].forEach((prop) => {
					options[prop] = response[prop];
				});
				const responseContentLength = utils_default.toFiniteNumber(response.headers.get("content-length"));
				const [onProgress, flush] = onDownloadProgress && progressEventDecorator(responseContentLength, progressEventReducer(asyncDecorator(onDownloadProgress), true)) || [];
				response = new Response(trackStream(response.body, DEFAULT_CHUNK_SIZE, onProgress, () => {
					flush && flush();
					unsubscribe && unsubscribe();
				}), options);
			}
			responseType = responseType || "text";
			let responseData = await resolvers[utils_default.findKey(resolvers, responseType) || "text"](response, config);
			!isStreamResponse && unsubscribe && unsubscribe();
			return await new Promise((resolve, reject) => {
				settle(resolve, reject, {
					data: responseData,
					headers: AxiosHeaders$1.from(response.headers),
					status: response.status,
					statusText: response.statusText,
					config,
					request
				});
			});
		} catch (err) {
			unsubscribe && unsubscribe();
			if (err && err.name === "TypeError" && /Load failed|fetch/i.test(err.message)) throw Object.assign(new AxiosError$1("Network Error", AxiosError$1.ERR_NETWORK, config, request), { cause: err.cause || err });
			throw AxiosError$1.from(err, err && err.code, config, request);
		}
	});
}));
//#endregion
//#region ../../packages/agent-provider/node_modules/axios/lib/adapters/adapters.js
var knownAdapters, renderReason, isResolvedHandle, adapters_default;
var init_adapters = __esmMin((() => {
	init_utils$2();
	init_null();
	init_xhr();
	init_fetch();
	init_AxiosError();
	knownAdapters = {
		http: null,
		xhr: xhr_default,
		fetch: fetch_default
	};
	utils_default.forEach(knownAdapters, (fn, value) => {
		if (fn) {
			try {
				Object.defineProperty(fn, "name", { value });
			} catch (e) {}
			Object.defineProperty(fn, "adapterName", { value });
		}
	});
	renderReason = (reason) => `- ${reason}`;
	isResolvedHandle = (adapter) => utils_default.isFunction(adapter) || adapter === null || adapter === false;
	adapters_default = {
		getAdapter: (adapters) => {
			adapters = utils_default.isArray(adapters) ? adapters : [adapters];
			const { length } = adapters;
			let nameOrAdapter;
			let adapter;
			const rejectedReasons = {};
			for (let i = 0; i < length; i++) {
				nameOrAdapter = adapters[i];
				let id;
				adapter = nameOrAdapter;
				if (!isResolvedHandle(nameOrAdapter)) {
					adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];
					if (adapter === void 0) throw new AxiosError$1(`Unknown adapter '${id}'`);
				}
				if (adapter) break;
				rejectedReasons[id || "#" + i] = adapter;
			}
			if (!adapter) {
				const reasons = Object.entries(rejectedReasons).map(([id, state]) => `adapter ${id} ` + (state === false ? "is not supported by the environment" : "is not available in the build"));
				throw new AxiosError$1(`There is no suitable adapter to dispatch the request ` + (length ? reasons.length > 1 ? "since :\n" + reasons.map(renderReason).join("\n") : " " + renderReason(reasons[0]) : "as no adapter specified"), "ERR_NOT_SUPPORT");
			}
			return adapter;
		},
		adapters: knownAdapters
	};
}));
//#endregion
//#region ../../packages/agent-provider/node_modules/axios/lib/core/dispatchRequest.js
/**
* Throws a `CanceledError` if cancellation has been requested.
*
* @param {Object} config The config that is to be used for the request
*
* @returns {void}
*/
function throwIfCancellationRequested(config) {
	if (config.cancelToken) config.cancelToken.throwIfRequested();
	if (config.signal && config.signal.aborted) throw new CanceledError$1(null, config);
}
/**
* Dispatch a request to the server using the configured adapter.
*
* @param {object} config The config that is to be used for the request
*
* @returns {Promise} The Promise to be fulfilled
*/
function dispatchRequest(config) {
	throwIfCancellationRequested(config);
	config.headers = AxiosHeaders$1.from(config.headers);
	config.data = transformData.call(config, config.transformRequest);
	if ([
		"post",
		"put",
		"patch"
	].indexOf(config.method) !== -1) config.headers.setContentType("application/x-www-form-urlencoded", false);
	return adapters_default.getAdapter(config.adapter || defaults.adapter)(config).then(function onAdapterResolution(response) {
		throwIfCancellationRequested(config);
		response.data = transformData.call(config, config.transformResponse, response);
		response.headers = AxiosHeaders$1.from(response.headers);
		return response;
	}, function onAdapterRejection(reason) {
		if (!isCancel$1(reason)) {
			throwIfCancellationRequested(config);
			if (reason && reason.response) {
				reason.response.data = transformData.call(config, config.transformResponse, reason.response);
				reason.response.headers = AxiosHeaders$1.from(reason.response.headers);
			}
		}
		return Promise.reject(reason);
	});
}
var init_dispatchRequest = __esmMin((() => {
	init_transformData();
	init_isCancel();
	init_defaults();
	init_CanceledError();
	init_AxiosHeaders();
	init_adapters();
}));
//#endregion
//#region ../../packages/agent-provider/node_modules/axios/lib/env/data.js
var VERSION$1;
var init_data = __esmMin((() => {
	VERSION$1 = "1.10.0";
}));
//#endregion
//#region ../../packages/agent-provider/node_modules/axios/lib/helpers/validator.js
/**
* Assert object's properties type
*
* @param {object} options
* @param {object} schema
* @param {boolean?} allowUnknown
*
* @returns {object}
*/
function assertOptions(options, schema, allowUnknown) {
	if (typeof options !== "object") throw new AxiosError$1("options must be an object", AxiosError$1.ERR_BAD_OPTION_VALUE);
	const keys = Object.keys(options);
	let i = keys.length;
	while (i-- > 0) {
		const opt = keys[i];
		const validator = schema[opt];
		if (validator) {
			const value = options[opt];
			const result = value === void 0 || validator(value, opt, options);
			if (result !== true) throw new AxiosError$1("option " + opt + " must be " + result, AxiosError$1.ERR_BAD_OPTION_VALUE);
			continue;
		}
		if (allowUnknown !== true) throw new AxiosError$1("Unknown option " + opt, AxiosError$1.ERR_BAD_OPTION);
	}
}
var validators$1, deprecatedWarnings, validator_default;
var init_validator = __esmMin((() => {
	init_data();
	init_AxiosError();
	validators$1 = {};
	[
		"object",
		"boolean",
		"number",
		"function",
		"string",
		"symbol"
	].forEach((type, i) => {
		validators$1[type] = function validator(thing) {
			return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
		};
	});
	deprecatedWarnings = {};
	/**
	* Transitional option validator
	*
	* @param {function|boolean?} validator - set to false if the transitional option has been removed
	* @param {string?} version - deprecated version / removed since version
	* @param {string?} message - some message with additional info
	*
	* @returns {function}
	*/
	validators$1.transitional = function transitional(validator, version, message) {
		function formatMessage(opt, desc) {
			return "[Axios v" + VERSION$1 + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
		}
		return (value, opt, opts) => {
			if (validator === false) throw new AxiosError$1(formatMessage(opt, " has been removed" + (version ? " in " + version : "")), AxiosError$1.ERR_DEPRECATED);
			if (version && !deprecatedWarnings[opt]) {
				deprecatedWarnings[opt] = true;
				console.warn(formatMessage(opt, " has been deprecated since v" + version + " and will be removed in the near future"));
			}
			return validator ? validator(value, opt, opts) : true;
		};
	};
	validators$1.spelling = function spelling(correctSpelling) {
		return (value, opt) => {
			console.warn(`${opt} is likely a misspelling of ${correctSpelling}`);
			return true;
		};
	};
	validator_default = {
		assertOptions,
		validators: validators$1
	};
}));
//#endregion
//#region ../../packages/agent-provider/node_modules/axios/lib/core/Axios.js
var validators, Axios$1;
var init_Axios = __esmMin((() => {
	init_utils$2();
	init_buildURL();
	init_InterceptorManager();
	init_dispatchRequest();
	init_mergeConfig();
	init_buildFullPath();
	init_validator();
	init_AxiosHeaders();
	validators = validator_default.validators;
	Axios$1 = class {
		constructor(instanceConfig) {
			this.defaults = instanceConfig || {};
			this.interceptors = {
				request: new InterceptorManager(),
				response: new InterceptorManager()
			};
		}
		/**
		* Dispatch a request
		*
		* @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
		* @param {?Object} config
		*
		* @returns {Promise} The Promise to be fulfilled
		*/
		async request(configOrUrl, config) {
			try {
				return await this._request(configOrUrl, config);
			} catch (err) {
				if (err instanceof Error) {
					let dummy = {};
					Error.captureStackTrace ? Error.captureStackTrace(dummy) : dummy = /* @__PURE__ */ new Error();
					const stack = dummy.stack ? dummy.stack.replace(/^.+\n/, "") : "";
					try {
						if (!err.stack) err.stack = stack;
						else if (stack && !String(err.stack).endsWith(stack.replace(/^.+\n.+\n/, ""))) err.stack += "\n" + stack;
					} catch (e) {}
				}
				throw err;
			}
		}
		_request(configOrUrl, config) {
			if (typeof configOrUrl === "string") {
				config = config || {};
				config.url = configOrUrl;
			} else config = configOrUrl || {};
			config = mergeConfig$1(this.defaults, config);
			const { transitional, paramsSerializer, headers } = config;
			if (transitional !== void 0) validator_default.assertOptions(transitional, {
				silentJSONParsing: validators.transitional(validators.boolean),
				forcedJSONParsing: validators.transitional(validators.boolean),
				clarifyTimeoutError: validators.transitional(validators.boolean)
			}, false);
			if (paramsSerializer != null) if (utils_default.isFunction(paramsSerializer)) config.paramsSerializer = { serialize: paramsSerializer };
			else validator_default.assertOptions(paramsSerializer, {
				encode: validators.function,
				serialize: validators.function
			}, true);
			if (config.allowAbsoluteUrls !== void 0) {} else if (this.defaults.allowAbsoluteUrls !== void 0) config.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls;
			else config.allowAbsoluteUrls = true;
			validator_default.assertOptions(config, {
				baseUrl: validators.spelling("baseURL"),
				withXsrfToken: validators.spelling("withXSRFToken")
			}, true);
			config.method = (config.method || this.defaults.method || "get").toLowerCase();
			let contextHeaders = headers && utils_default.merge(headers.common, headers[config.method]);
			headers && utils_default.forEach([
				"delete",
				"get",
				"head",
				"post",
				"put",
				"patch",
				"common"
			], (method) => {
				delete headers[method];
			});
			config.headers = AxiosHeaders$1.concat(contextHeaders, headers);
			const requestInterceptorChain = [];
			let synchronousRequestInterceptors = true;
			this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
				if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) return;
				synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
				requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
			});
			const responseInterceptorChain = [];
			this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
				responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
			});
			let promise;
			let i = 0;
			let len;
			if (!synchronousRequestInterceptors) {
				const chain = [dispatchRequest.bind(this), void 0];
				chain.unshift.apply(chain, requestInterceptorChain);
				chain.push.apply(chain, responseInterceptorChain);
				len = chain.length;
				promise = Promise.resolve(config);
				while (i < len) promise = promise.then(chain[i++], chain[i++]);
				return promise;
			}
			len = requestInterceptorChain.length;
			let newConfig = config;
			i = 0;
			while (i < len) {
				const onFulfilled = requestInterceptorChain[i++];
				const onRejected = requestInterceptorChain[i++];
				try {
					newConfig = onFulfilled(newConfig);
				} catch (error) {
					onRejected.call(this, error);
					break;
				}
			}
			try {
				promise = dispatchRequest.call(this, newConfig);
			} catch (error) {
				return Promise.reject(error);
			}
			i = 0;
			len = responseInterceptorChain.length;
			while (i < len) promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
			return promise;
		}
		getUri(config) {
			config = mergeConfig$1(this.defaults, config);
			return buildURL(buildFullPath(config.baseURL, config.url, config.allowAbsoluteUrls), config.params, config.paramsSerializer);
		}
	};
	utils_default.forEach([
		"delete",
		"get",
		"head",
		"options"
	], function forEachMethodNoData(method) {
		Axios$1.prototype[method] = function(url, config) {
			return this.request(mergeConfig$1(config || {}, {
				method,
				url,
				data: (config || {}).data
			}));
		};
	});
	utils_default.forEach([
		"post",
		"put",
		"patch"
	], function forEachMethodWithData(method) {
		function generateHTTPMethod(isForm) {
			return function httpMethod(url, data, config) {
				return this.request(mergeConfig$1(config || {}, {
					method,
					headers: isForm ? { "Content-Type": "multipart/form-data" } : {},
					url,
					data
				}));
			};
		}
		Axios$1.prototype[method] = generateHTTPMethod();
		Axios$1.prototype[method + "Form"] = generateHTTPMethod(true);
	});
}));
//#endregion
//#region ../../packages/agent-provider/node_modules/axios/lib/cancel/CancelToken.js
var CancelToken$1;
var init_CancelToken = __esmMin((() => {
	init_CanceledError();
	CancelToken$1 = class CancelToken$1 {
		constructor(executor) {
			if (typeof executor !== "function") throw new TypeError("executor must be a function.");
			let resolvePromise;
			this.promise = new Promise(function promiseExecutor(resolve) {
				resolvePromise = resolve;
			});
			const token = this;
			this.promise.then((cancel) => {
				if (!token._listeners) return;
				let i = token._listeners.length;
				while (i-- > 0) token._listeners[i](cancel);
				token._listeners = null;
			});
			this.promise.then = (onfulfilled) => {
				let _resolve;
				const promise = new Promise((resolve) => {
					token.subscribe(resolve);
					_resolve = resolve;
				}).then(onfulfilled);
				promise.cancel = function reject() {
					token.unsubscribe(_resolve);
				};
				return promise;
			};
			executor(function cancel(message, config, request) {
				if (token.reason) return;
				token.reason = new CanceledError$1(message, config, request);
				resolvePromise(token.reason);
			});
		}
		/**
		* Throws a `CanceledError` if cancellation has been requested.
		*/
		throwIfRequested() {
			if (this.reason) throw this.reason;
		}
		/**
		* Subscribe to the cancel signal
		*/
		subscribe(listener) {
			if (this.reason) {
				listener(this.reason);
				return;
			}
			if (this._listeners) this._listeners.push(listener);
			else this._listeners = [listener];
		}
		/**
		* Unsubscribe from the cancel signal
		*/
		unsubscribe(listener) {
			if (!this._listeners) return;
			const index = this._listeners.indexOf(listener);
			if (index !== -1) this._listeners.splice(index, 1);
		}
		toAbortSignal() {
			const controller = new AbortController();
			const abort = (err) => {
				controller.abort(err);
			};
			this.subscribe(abort);
			controller.signal.unsubscribe = () => this.unsubscribe(abort);
			return controller.signal;
		}
		/**
		* Returns an object that contains a new `CancelToken` and a function that, when called,
		* cancels the `CancelToken`.
		*/
		static source() {
			let cancel;
			return {
				token: new CancelToken$1(function executor(c) {
					cancel = c;
				}),
				cancel
			};
		}
	};
}));
//#endregion
//#region ../../packages/agent-provider/node_modules/axios/lib/helpers/spread.js
/**
* Syntactic sugar for invoking a function and expanding an array for arguments.
*
* Common use case would be to use `Function.prototype.apply`.
*
*  ```js
*  function f(x, y, z) {}
*  var args = [1, 2, 3];
*  f.apply(null, args);
*  ```
*
* With `spread` this example can be re-written.
*
*  ```js
*  spread(function(x, y, z) {})([1, 2, 3]);
*  ```
*
* @param {Function} callback
*
* @returns {Function}
*/
function spread$1(callback) {
	return function wrap(arr) {
		return callback.apply(null, arr);
	};
}
var init_spread = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-provider/node_modules/axios/lib/helpers/isAxiosError.js
/**
* Determines whether the payload is an error thrown by Axios
*
* @param {*} payload The value to test
*
* @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
*/
function isAxiosError$1(payload) {
	return utils_default.isObject(payload) && payload.isAxiosError === true;
}
var init_isAxiosError = __esmMin((() => {
	init_utils$2();
}));
//#endregion
//#region ../../packages/agent-provider/node_modules/axios/lib/helpers/HttpStatusCode.js
var HttpStatusCode$1;
var init_HttpStatusCode = __esmMin((() => {
	HttpStatusCode$1 = {
		Continue: 100,
		SwitchingProtocols: 101,
		Processing: 102,
		EarlyHints: 103,
		Ok: 200,
		Created: 201,
		Accepted: 202,
		NonAuthoritativeInformation: 203,
		NoContent: 204,
		ResetContent: 205,
		PartialContent: 206,
		MultiStatus: 207,
		AlreadyReported: 208,
		ImUsed: 226,
		MultipleChoices: 300,
		MovedPermanently: 301,
		Found: 302,
		SeeOther: 303,
		NotModified: 304,
		UseProxy: 305,
		Unused: 306,
		TemporaryRedirect: 307,
		PermanentRedirect: 308,
		BadRequest: 400,
		Unauthorized: 401,
		PaymentRequired: 402,
		Forbidden: 403,
		NotFound: 404,
		MethodNotAllowed: 405,
		NotAcceptable: 406,
		ProxyAuthenticationRequired: 407,
		RequestTimeout: 408,
		Conflict: 409,
		Gone: 410,
		LengthRequired: 411,
		PreconditionFailed: 412,
		PayloadTooLarge: 413,
		UriTooLong: 414,
		UnsupportedMediaType: 415,
		RangeNotSatisfiable: 416,
		ExpectationFailed: 417,
		ImATeapot: 418,
		MisdirectedRequest: 421,
		UnprocessableEntity: 422,
		Locked: 423,
		FailedDependency: 424,
		TooEarly: 425,
		UpgradeRequired: 426,
		PreconditionRequired: 428,
		TooManyRequests: 429,
		RequestHeaderFieldsTooLarge: 431,
		UnavailableForLegalReasons: 451,
		InternalServerError: 500,
		NotImplemented: 501,
		BadGateway: 502,
		ServiceUnavailable: 503,
		GatewayTimeout: 504,
		HttpVersionNotSupported: 505,
		VariantAlsoNegotiates: 506,
		InsufficientStorage: 507,
		LoopDetected: 508,
		NotExtended: 510,
		NetworkAuthenticationRequired: 511
	};
	Object.entries(HttpStatusCode$1).forEach(([key, value]) => {
		HttpStatusCode$1[value] = key;
	});
}));
//#endregion
//#region ../../packages/agent-provider/node_modules/axios/lib/axios.js
/**
* Create an instance of Axios
*
* @param {Object} defaultConfig The default config for the instance
*
* @returns {Axios} A new instance of Axios
*/
function createInstance(defaultConfig) {
	const context = new Axios$1(defaultConfig);
	const instance = bind(Axios$1.prototype.request, context);
	utils_default.extend(instance, Axios$1.prototype, context, { allOwnKeys: true });
	utils_default.extend(instance, context, null, { allOwnKeys: true });
	instance.create = function create(instanceConfig) {
		return createInstance(mergeConfig$1(defaultConfig, instanceConfig));
	};
	return instance;
}
var axios;
var init_axios$1 = __esmMin((() => {
	init_utils$2();
	init_bind();
	init_Axios();
	init_mergeConfig();
	init_defaults();
	init_formDataToJSON();
	init_CanceledError();
	init_CancelToken();
	init_isCancel();
	init_data();
	init_toFormData();
	init_AxiosError();
	init_spread();
	init_isAxiosError();
	init_AxiosHeaders();
	init_adapters();
	init_HttpStatusCode();
	axios = createInstance(defaults);
	axios.Axios = Axios$1;
	axios.CanceledError = CanceledError$1;
	axios.CancelToken = CancelToken$1;
	axios.isCancel = isCancel$1;
	axios.VERSION = VERSION$1;
	axios.toFormData = toFormData$1;
	axios.AxiosError = AxiosError$1;
	axios.Cancel = axios.CanceledError;
	axios.all = function all(promises) {
		return Promise.all(promises);
	};
	axios.spread = spread$1;
	axios.isAxiosError = isAxiosError$1;
	axios.mergeConfig = mergeConfig$1;
	axios.AxiosHeaders = AxiosHeaders$1;
	axios.formToJSON = (thing) => formDataToJSON(utils_default.isHTMLForm(thing) ? new FormData(thing) : thing);
	axios.getAdapter = adapters_default.getAdapter;
	axios.HttpStatusCode = HttpStatusCode$1;
	axios.default = axios;
}));
//#endregion
//#region ../../packages/agent-provider/node_modules/axios/index.js
var Axios, AxiosError, CanceledError, isCancel, CancelToken, VERSION, all, Cancel, isAxiosError, spread, toFormData, AxiosHeaders, HttpStatusCode, formToJSON, getAdapter, mergeConfig;
var init_axios = __esmMin((() => {
	init_axios$1();
	({Axios, AxiosError, CanceledError, isCancel, CancelToken, VERSION, all, Cancel, isAxiosError, spread, toFormData, AxiosHeaders, HttpStatusCode, formToJSON, getAdapter, mergeConfig} = axios);
}));
//#endregion
//#region ../../packages/agent-provider/src/http/http-service.ts
var HttpService;
var init_http_service = __esmMin((() => {
	init_axios();
	HttpService = class HttpService {
		static {
			this.instance = null;
		}
		/**
		* 私有构造函数（单例模式）
		*/
		constructor(config = {}) {
			this.unauthorizedCallbacks = /* @__PURE__ */ new Set();
			this.isRefreshing = false;
			this.refreshSubscribers = [];
			this.inflightGetRequests = /* @__PURE__ */ new Map();
			this.keyContributors = [];
			this.config = config;
			this.axiosInstance = axios.create({
				baseURL: config.baseURL?.replace(/\/$/, "") || "",
				timeout: config.timeout || 6e4,
				withCredentials: config.withCredentials !== false,
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json",
					...config.headers
				}
			});
			this.registerDefaultRequestInterceptor();
			this.registerDefaultResponseInterceptor();
		}
		/**
		* 获取单例实例（延迟初始化）
		*/
		static getInstance() {
			if (!HttpService.instance) HttpService.instance = new HttpService();
			return HttpService.instance;
		}
		/**
		* 重置单例实例（主要用于测试）
		*/
		static resetInstance() {
			if (HttpService.instance) {
				HttpService.instance.inflightGetRequests.clear();
				HttpService.instance.keyContributors = [];
			}
			HttpService.instance = null;
		}
		/**
		* 注册默认请求拦截器（添加 Authorization header）
		*/
		registerDefaultRequestInterceptor() {
			this.axiosInstance.interceptors.request.use((requestConfig) => {
				if (this.config.authToken) {
					requestConfig.headers = requestConfig.headers || {};
					requestConfig.headers["Authorization"] = `Bearer ${this.config.authToken}`;
				}
				return requestConfig;
			}, (error) => Promise.reject(error));
		}
		/**
		* 注册默认响应拦截器（处理 401，支持自动重试）
		*/
		registerDefaultResponseInterceptor() {
			this.axiosInstance.interceptors.response.use((response) => response, async (error) => {
				const originalRequest = error.config;
				if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
					if (originalRequest.url?.includes("/console/accounts")) {
						console.warn("[HttpService] Unauthorized 401 on refresh endpoint, not retrying");
						return Promise.reject(error);
					}
					console.warn("[HttpService] Unauthorized 401, attempting token refresh and retry");
					originalRequest._retry = true;
					if (this.isRefreshing) return new Promise((resolve, reject) => {
						this.refreshSubscribers.push((success) => {
							if (success) this.axiosInstance.request(originalRequest).then(resolve).catch(reject);
							else reject(error);
						});
					});
					this.isRefreshing = true;
					try {
						await this.triggerUnauthorizedCallbacks();
						this.onRefreshSuccess();
						return this.axiosInstance.request(originalRequest);
					} catch (refreshError) {
						this.onRefreshFailure();
						return Promise.reject(error);
					} finally {
						this.isRefreshing = false;
					}
				}
				return Promise.reject(this.extractBizError(error));
			});
		}
		/**
		* 从 AxiosError 中提取后端业务错误信息
		*
		* 后端统一返回 `{ code, msg, data }` 格式的 body。
		* 当 HTTP 状态码非 2xx 时，优先使用 body 中的 msg/message，
		* 避免展示 axios 默认的 "Request failed with status code XXX"。
		*
		* 同时把 envelope 的 `code` / `data` 透传到 Error 实例上，让上层业务（如
		* `tryParseProjectQuotaError`）可以按错误码做精确分支处理（如 quota 弹窗/权限提示），
		* 而不是被 axios 默认错误掩盖。
		*/
		extractBizError(error) {
			const responseData = error.response?.data;
			if (responseData && typeof responseData === "object") {
				const data = responseData;
				const bizMsg = data.msg ?? data.message;
				if (typeof bizMsg === "string" && bizMsg) {
					const bizError = new Error(bizMsg);
					bizError.code = data.code;
					bizError.data = data.data;
					bizError.requestId = data.requestId;
					bizError.httpStatus = error.response?.status;
					return bizError;
				}
			}
			return error;
		}
		/**
		* token 刷新成功，通知所有等待的请求
		*/
		onRefreshSuccess() {
			this.refreshSubscribers.forEach((callback) => callback(true));
			this.refreshSubscribers = [];
		}
		/**
		* token 刷新失败，通知所有等待的请求
		*/
		onRefreshFailure() {
			this.refreshSubscribers.forEach((callback) => callback(false));
			this.refreshSubscribers = [];
		}
		/**
		* 注册请求拦截器
		* @param onFulfilled 请求成功拦截器
		* @param onRejected 请求失败拦截器
		* @returns 拦截器 ID（用于移除）
		*
		* @example
		* ```typescript
		* const id = httpService.registerRequestInterceptor((config) => {
		*     config.headers['X-Custom-Header'] = 'value';
		*     return config;
		* });
		*
		* // 移除拦截器
		* httpService.ejectRequestInterceptor(id);
		* ```
		*/
		registerRequestInterceptor(onFulfilled, onRejected) {
			return this.axiosInstance.interceptors.request.use(onFulfilled, onRejected);
		}
		/**
		* 注册响应拦截器
		* @param onFulfilled 响应成功拦截器
		* @param onRejected 响应失败拦截器
		* @returns 拦截器 ID（用于移除）
		*
		* @example
		* ```typescript
		* const id = httpService.registerResponseInterceptor((response) => {
		*     console.log('Response:', response.data);
		*     return response;
		* });
		*
		* // 移除拦截器
		* httpService.ejectResponseInterceptor(id);
		* ```
		*/
		registerResponseInterceptor(onFulfilled, onRejected) {
			return this.axiosInstance.interceptors.response.use(onFulfilled, onRejected);
		}
		/**
		* 移除请求拦截器
		* @param id 拦截器 ID
		*/
		ejectRequestInterceptor(id) {
			this.axiosInstance.interceptors.request.eject(id);
		}
		/**
		* 移除响应拦截器
		* @param id 拦截器 ID
		*/
		ejectResponseInterceptor(id) {
			this.axiosInstance.interceptors.response.eject(id);
		}
		/**
		* 注册 401 未授权回调
		* @param callback 回调函数
		*
		* @example
		* ```typescript
		* httpService.onUnauthorized(() => {
		*     console.log('User logged out');
		*     window.location.href = '/login';
		* });
		* ```
		*/
		onUnauthorized(callback) {
			this.unauthorizedCallbacks.add(callback);
		}
		/**
		* 移除 401 未授权回调
		* @param callback 回调函数
		*/
		offUnauthorized(callback) {
			this.unauthorizedCallbacks.delete(callback);
		}
		/**
		* 触发所有 401 回调并等待完成
		* @returns Promise，等待所有回调完成
		* @throws 如果任何回调失败，则抛出错误
		*/
		async triggerUnauthorizedCallbacks() {
			const callbacks = Array.from(this.unauthorizedCallbacks);
			const failedResults = (await Promise.allSettled(callbacks.map((callback) => callback()))).filter((r) => r.status === "rejected");
			if (failedResults.length > 0) {
				const errors = failedResults.map((r) => r.reason);
				console.error("[HttpService] Some unauthorized callbacks failed:", errors);
				throw errors[0];
			}
		}
		/**
		* 更新 authToken
		* @param token 新的 token
		*/
		setAuthToken(token) {
			this.config.authToken = token;
		}
		/**
		* 更新 baseURL
		* @param baseURL 新的 baseURL
		*/
		setBaseURL(baseURL) {
			this.config.baseURL = baseURL;
			this.axiosInstance.defaults.baseURL = baseURL.replace(/\/$/, "");
		}
		/**
		* 获取当前 baseURL
		* @returns 当前 baseURL，未设置时返回空字符串
		*/
		getBaseURL() {
			return this.config.baseURL || "";
		}
		/**
		* GET 请求（带 in-flight 去重）
		*
		* 同一 cacheKey 的并发 GET 请求会复用同一个 Promise（消除多组件挂载、effect 抖动等场景的重复请求）。
		* 请求完成立即从 in-flight 表中清理，不缓存历史结果。
		*
		* cacheKey 由 method + url + 排序后 query + authToken + 注册的 keyContributor（如 accountId）组成，
		* 任何参与响应内容的动态状态变化都会让 key 不同，自然不复用。
		*
		* @param url 请求路径
		* @param config axios 配置
		* @returns 响应数据
		*/
		async get(url, config) {
			const cacheKey = this.buildGetCacheKey(url, config);
			const existing = this.inflightGetRequests.get(cacheKey);
			if (existing) return existing;
			const promise = this.axiosInstance.get(url, config).then((response) => response.data).finally(() => {
				this.inflightGetRequests.delete(cacheKey);
			});
			this.inflightGetRequests.set(cacheKey, promise);
			return promise;
		}
		/**
		* 注册 cache key 贡献者
		*
		* 用于把"会影响请求响应但 HttpService 自身不感知的动态状态"纳入 dedupe key。
		* 典型场景：accountService 通过 request interceptor 注入 X-User-Id / X-Enterprise-Id，
		* 切账号期间响应内容会变，必须让 key 一并变化以避免错误复用。
		*
		* 返回反注册函数，调用后从贡献者列表中移除。
		*
		* @example
		* ```ts
		* httpService.registerKeyContributor(() => {
		*     const a = accountService.getAccount();
		*     return `uid=${a?.uid ?? ''}&ent=${a?.enterpriseId ?? ''}`;
		* });
		* ```
		*/
		registerKeyContributor(fn) {
			this.keyContributors.push(fn);
			return () => {
				const idx = this.keyContributors.indexOf(fn);
				if (idx >= 0) this.keyContributors.splice(idx, 1);
			};
		}
		/**
		* 构造 GET 请求的 dedupe cache key
		*
		* 包含：method + url + 排序后的 query string + authToken + 所有 keyContributor 输出。
		* 排序是为了让 `{ a: 1, b: 2 }` 和 `{ b: 2, a: 1 }` 视为同 key。
		*/
		buildGetCacheKey(url, config) {
			const params = config?.params;
			return `GET|${url}|${params && typeof params === "object" ? Object.keys(params).sort().map((k) => `${k}=${JSON.stringify(params[k])}`).join("&") : ""}|${this.config.authToken ?? ""}|${this.keyContributors.map((fn) => {
				try {
					return fn();
				} catch {
					return "";
				}
			}).join("|")}`;
		}
		/**
		* POST 请求
		* @param url 请求路径
		* @param data 请求体
		* @param config axios 配置
		* @returns 响应数据
		*/
		async post(url, data, config) {
			return (await this.axiosInstance.post(url, data, config)).data;
		}
		/**
		* PATCH 请求
		* @param url 请求路径
		* @param data 请求体
		* @param config axios 配置
		* @returns 响应数据
		*/
		async patch(url, data, config) {
			return (await this.axiosInstance.patch(url, data, config)).data;
		}
		/**
		* DELETE 请求
		* @param url 请求路径
		* @param config axios 配置
		* @returns 响应数据
		*/
		async delete(url, config) {
			return (await this.axiosInstance.delete(url, config)).data;
		}
		/**
		* PUT 请求
		* @param url 请求路径
		* @param data 请求体
		* @param config axios 配置
		* @returns 响应数据
		*/
		async put(url, data, config) {
			return (await this.axiosInstance.put(url, data, config)).data;
		}
		/**
		* 通用请求方法
		* @param config axios 请求配置
		* @returns 原始 AxiosResponse
		*/
		async request(config) {
			return this.axiosInstance.request(config);
		}
		/**
		* 获取原始 axios 实例（用于高级场景）
		*/
		getAxiosInstance() {
			return this.axiosInstance;
		}
	};
}));
//#endregion
//#region ../../packages/agent-provider/src/http/types.ts
var init_types$4 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-provider/src/http/index.ts
var httpService;
var init_http = __esmMin((() => {
	init_http_service();
	init_http_service();
	init_types$4();
	httpService = new Proxy({}, { get(target, prop) {
		return HttpService.getInstance()[prop];
	} });
}));
//#endregion
//#region ../../packages/agent-provider/src/account/account-service.ts
var AccountService, accountService;
var init_account_service = __esmMin((() => {
	init_http();
	AccountService = class {
		constructor() {
			this.account = null;
			this.listeners = /* @__PURE__ */ new Set();
			this.initialized = false;
			this.initPromise = null;
			this.initResolve = null;
			this.requestInterceptorId = null;
			this.keyContributorUnregister = null;
			this.crossTabBroadcaster = null;
			this.initPromise = new Promise((resolve) => {
				this.initResolve = resolve;
			});
			this.registerHttpInterceptor();
			this.registerHttpKeyContributor();
		}
		/**
		* 注册 HTTP 请求拦截器
		* 自动注入账号相关的 headers (X-User-Id, X-Enterprise-Id, X-Tenant-Id)
		*/
		registerHttpInterceptor() {
			try {
				this.requestInterceptorId = httpService.registerRequestInterceptor((config) => {
					const account = this.getAccount();
					if (account?.uid) {
						config.headers = config.headers || {};
						config.headers["X-User-Id"] = account.uid;
					}
					if (account?.enterpriseId) {
						config.headers = config.headers || {};
						config.headers["X-Enterprise-Id"] = account.enterpriseId;
						config.headers["X-Tenant-Id"] = account.enterpriseId;
					}
					return config;
				});
				console.log("[AccountService] HTTP interceptor registered");
			} catch (error) {
				console.warn("[AccountService] Failed to register HTTP interceptor, will retry on first request:", error);
			}
		}
		/**
		* 注册 HTTP cache key 贡献者
		*
		* httpService 的 GET 请求 dedupe 默认按 url + query + token 区分；
		* 但 accountService 通过 interceptor 注入的 X-User-Id / X-Enterprise-Id
		* 是 dedupe 不感知的"动态 header"。把账号信息纳入 key，确保切账号时
		* 不会错误复用旧账号的响应。
		*/
		registerHttpKeyContributor() {
			try {
				this.keyContributorUnregister = httpService.registerKeyContributor(() => {
					const a = this.account;
					return `uid=${a?.uid ?? ""}&ent=${a?.enterpriseId ?? ""}`;
				});
			} catch (error) {
				console.warn("[AccountService] Failed to register HTTP key contributor:", error);
			}
		}
		/**
		* 获取当前账号
		* @returns 当前账号，未登录或未加载时返回 null
		*/
		getAccount() {
			return this.account;
		}
		/**
		* 设置账号
		* @param account 账号信息，登出时传 null
		* @param forceNotify 强制通知订阅者（用于 uid 不变但 usage/套餐等字段变化的场景，如购买后刷新）
		*/
		setAccount(account, forceNotify = false) {
			const prev = this.account;
			const wasInitialized = this.initialized;
			this.account = account;
			if (!this.initialized) {
				this.initialized = true;
				this.initResolve?.(account);
			}
			if (!wasInitialized || prev?.uid !== account?.uid || forceNotify) {
				this.notifyListeners();
				if (account && this.crossTabBroadcaster && !forceNotify) this.crossTabBroadcaster.broadcastLogin();
			}
		}
		/**
		* 清除账号（登出）
		* 先广播登出消息，再清除本地账号
		*/
		clearAccount() {
			if (this.crossTabBroadcaster) this.crossTabBroadcaster.broadcastLogout();
			this.setAccount(null);
		}
		/**
		* 静默清除账号（不广播）
		* 用于收到其他标签页 logout 消息时，避免循环广播
		*/
		clearAccountSilently() {
			this.setAccount(null);
		}
		/**
		* 设置跨标签页认证同步广播器
		* 应在应用初始化时由上层（如 agent-ui）调用
		*/
		setCrossTabBroadcaster(broadcaster) {
			this.crossTabBroadcaster = broadcaster;
		}
		/**
		* 订阅账号变化
		* @param callback 变化时的回调函数
		* @returns 取消订阅函数
		*/
		subscribe(callback) {
			this.listeners.add(callback);
			return () => {
				this.listeners.delete(callback);
			};
		}
		/**
		* 等待首次账号加载完成
		* @returns Promise<Account | null>
		*/
		waitForInit() {
			if (this.initialized) return Promise.resolve(this.account);
			return this.initPromise;
		}
		/**
		* 是否已初始化
		*/
		isInitialized() {
			return this.initialized;
		}
		/**
		* 是否已登录
		*/
		isLoggedIn() {
			return this.account !== null;
		}
		/**
		* 通知所有订阅者
		*/
		notifyListeners() {
			this.listeners.forEach((callback) => {
				try {
					callback(this.account);
				} catch (error) {
					console.error("[AccountService] Listener error:", error);
				}
			});
		}
		/**
		* 重置服务状态（仅用于测试）
		*/
		_reset() {
			this.account = null;
			this.listeners.clear();
			this.initialized = false;
			this.initPromise = new Promise((resolve) => {
				this.initResolve = resolve;
			});
			if (this.requestInterceptorId !== null) try {
				httpService.ejectRequestInterceptor(this.requestInterceptorId);
				this.requestInterceptorId = null;
			} catch (error) {
				console.warn("[AccountService] Failed to eject interceptor during reset:", error);
			}
			if (this.keyContributorUnregister) try {
				this.keyContributorUnregister();
				this.keyContributorUnregister = null;
			} catch (error) {
				console.warn("[AccountService] Failed to unregister key contributor during reset:", error);
			}
		}
	};
	accountService = new AccountService();
	/**
	* 暴露给全局，供 Agent Manager 直接调用 setAccount 刷新 Widget 状态
	* 这是为了解决 IDE 环境中 IPC 事件无法直接触发 Widget 账号刷新的问题
	*/
	if (typeof window !== "undefined") window.__genieAccountService = accountService;
}));
//#endregion
//#region ../../packages/agent-provider/src/account/index.ts
var init_account = __esmMin((() => {
	init_account_service();
}));
//#endregion
//#region ../../packages/agent-provider/src/common/constants/conversation-origin.ts
/**
* 给会话列表查询 options 注入 WebAgents 的来源过滤（agents + workbuddy-mp）。
*
* 单一出处：所有 WebAgents 列表读取路径（首屏 / 搜索 / 翻页 / 刷新 / 轮询 / 全量 / 归档）
* 都应通过本函数注入 `conversationOrigin`，避免裸字符串散落与遗漏。Local 模式忽略该参数。
*
* @example
*   adapter.listConversations(withWebAgentsListOrigin({ userId, page, size }))
*/
function withWebAgentsListOrigin(options) {
	return {
		...options,
		conversationOrigin: WEBAGENTS_LIST_CONVERSATION_ORIGIN
	};
}
var AGENTS_ORIGIN, WORKBUDDY_MP_ORIGIN, WORKBUDDY_APP_ORIGIN, ENTERPRISE_CLOUDAGENTS_ORIGIN, WEBAGENTS_LIST_ORIGINS, WEBAGENTS_LIST_CONVERSATION_ORIGIN;
var init_conversation_origin = __esmMin((() => {
	AGENTS_ORIGIN = "agents";
	WORKBUDDY_MP_ORIGIN = "workbuddy-mp";
	WORKBUDDY_APP_ORIGIN = "workbuddy-app";
	ENTERPRISE_CLOUDAGENTS_ORIGIN = "enterprise-cloudagents";
	WEBAGENTS_LIST_ORIGINS = [
		AGENTS_ORIGIN,
		WORKBUDDY_MP_ORIGIN,
		WORKBUDDY_APP_ORIGIN
	];
	WEBAGENTS_LIST_CONVERSATION_ORIGIN = WEBAGENTS_LIST_ORIGINS.join(",");
}));
//#endregion
//#region ../../packages/agent-provider/src/common/utils/lru-cache.ts
var LRUCache;
var init_lru_cache = __esmMin((() => {
	LRUCache = class {
		/**
		* 创建 LRU 缓存实例
		* @param capacity - 缓存容量上限
		*/
		constructor(capacity) {
			if (capacity <= 0) throw new Error("Cache capacity must be greater than 0");
			this.capacity = capacity;
			this.cache = /* @__PURE__ */ new Map();
		}
		/**
		* 获取缓存值
		* @param key - 键
		* @returns 值，如果不存在返回 undefined
		*/
		get(key) {
			if (!this.cache.has(key)) return;
			const value = this.cache.get(key);
			this.cache.delete(key);
			this.cache.set(key, value);
			return value;
		}
		/**
		* 设置缓存值
		* @param key - 键
		* @param value - 值
		*/
		set(key, value) {
			if (this.cache.has(key)) this.cache.delete(key);
			else if (this.cache.size >= this.capacity) {
				const firstKey = this.cache.keys().next().value;
				this.cache.delete(firstKey);
			}
			this.cache.set(key, value);
		}
		/**
		* 检查 key 是否存在
		* @param key - 键
		* @returns 是否存在
		*/
		has(key) {
			return this.cache.has(key);
		}
		/**
		* 删除指定 key
		* @param key - 键
		* @returns 是否删除成功
		*/
		delete(key) {
			return this.cache.delete(key);
		}
		/**
		* 清空缓存
		*/
		clear() {
			this.cache.clear();
		}
		/**
		* 获取当前缓存大小
		* @returns 当前缓存的元素数量
		*/
		get size() {
			return this.cache.size;
		}
		/**
		* 获取缓存容量
		* @returns 缓存容量上限
		*/
		get maxSize() {
			return this.capacity;
		}
		/**
		* 获取所有 key
		* @returns key 数组
		*/
		keys() {
			return Array.from(this.cache.keys());
		}
		/**
		* 获取所有 value
		* @returns value 数组
		*/
		values() {
			return Array.from(this.cache.values());
		}
		/**
		* 遍历缓存
		* @param callback - 回调函数
		*/
		forEach(callback) {
			this.cache.forEach((value, key) => callback(value, key));
		}
	};
}));
//#endregion
//#region ../../packages/agent-provider/src/common/utils/concurrency.ts
/**
* 并发执行任务，返回包含成功/失败状态的结果
*
* @param tasks - 任务函数数组
* @param concurrency - 最大并发数，默认 5
* @returns 所有任务的结果数组，包含状态信息
*
* @example
* ```typescript
* const results = await runWithConcurrencySettled(tasks, 3);
* const successes = results.filter(r => r.status === 'fulfilled');
* const failures = results.filter(r => r.status === 'rejected');
* ```
*/
async function runWithConcurrencySettled(tasks, concurrency = 5) {
	if (tasks.length === 0) return [];
	const limit = Math.max(1, concurrency);
	const results = new Array(tasks.length);
	let currentIndex = 0;
	async function runNext() {
		while (currentIndex < tasks.length) {
			const index = currentIndex++;
			const task = tasks[index];
			try {
				results[index] = {
					status: "fulfilled",
					value: await task()
				};
			} catch (reason) {
				results[index] = {
					status: "rejected",
					reason
				};
			}
		}
	}
	const workers = Array(Math.min(limit, tasks.length)).fill(null).map(() => runNext());
	await Promise.all(workers);
	return results;
}
var init_concurrency = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-provider/src/common/utils/index.ts
var init_utils = __esmMin((() => {
	init_concurrency();
}));
//#endregion
//#region ../../packages/agent-provider/src/common/providers/cloud-agent-provider/cos-upload-service.ts
var CosUploadService;
var init_cos_upload_service = __esmMin((() => {
	init_http();
	init_utils();
	CosUploadService = class {
		constructor(options = {}) {
			this.logger = options.logger;
			this.uploadConcurrency = options.uploadConcurrency ?? 3;
			this.presignedUrlProvider = options.presignedUrlProvider;
		}
		/**
		* 生成唯一的 objectKey
		*
		* 格式: uploads/{timestamp}-{randomId}-{encodedFilename}
		*/
		generateObjectKey(filename) {
			return `uploads/${Date.now()}-${Math.random().toString(36).substring(2, 10)}-${encodeURIComponent(filename)}`;
		}
		/**
		* 批量获取预签名 URL
		*
		* 优先使用 presignedUrlProvider（Desktop 走 IPC），否则走 httpService.post（Web）。
		*/
		async getPresignedUrls(objectKeys) {
			if (this.presignedUrlProvider) {
				this.logger?.info("[CosUploadService] Using presignedUrlProvider (IPC path)");
				const result = await this.presignedUrlProvider(objectKeys);
				this.logger?.info(`[CosUploadService] presignedUrlProvider result: ${JSON.stringify(result)}`);
				return result;
			}
			const apiResponse = await httpService.post("/console/as/support/presigned_url", { object_keys: objectKeys });
			if (!apiResponse.data) throw new Error("No data in presigned URL response");
			return apiResponse.data;
		}
		/**
		* 上传单个文件到 COS
		*
		* @param file - 要上传的文件
		* @param abortSignal - 可选的 AbortSignal，用于取消上传
		* @returns 上传结果，包含访问 URL 或错误信息
		*/
		async uploadFile(file, abortSignal) {
			const filename = file.name;
			this.logger?.info(`[CosUploadService] Uploading file: ${filename}`);
			try {
				if (abortSignal?.aborted) return {
					success: false,
					error: "Upload cancelled",
					aborted: true
				};
				const objectKey = this.generateObjectKey(filename);
				this.logger?.debug(`[CosUploadService] Generated objectKey: ${objectKey}`);
				const presignedItem = (await this.getPresignedUrls([objectKey])).items[0];
				if (!presignedItem) throw new Error("No presigned URL item returned");
				if (abortSignal?.aborted) return {
					success: false,
					error: "Upload cancelled",
					aborted: true
				};
				this.logger?.info(`[CosUploadService] PUT upload_url: ${presignedItem.upload_url}`);
				this.logger?.info(`[CosUploadService] Content-Type: ${file.type || "application/octet-stream"}, size: ${file.size}`);
				const uploadResponse = await fetch(presignedItem.upload_url, {
					method: "PUT",
					body: file,
					headers: { "Content-Type": file.type || "application/octet-stream" },
					signal: abortSignal
				});
				if (!uploadResponse.ok) {
					const errorText = await uploadResponse.text().catch(() => uploadResponse.statusText);
					this.logger?.error(`[CosUploadService] COS PUT failed: ${uploadResponse.status} ${errorText}`);
					this.logger?.error(`[CosUploadService] Response headers: ${JSON.stringify(Object.fromEntries(uploadResponse.headers.entries()))}`);
					throw new Error(`COS upload failed: ${uploadResponse.status} ${errorText}`);
				}
				this.logger?.debug("[CosUploadService] File uploaded to COS");
				this.logger?.info(`[CosUploadService] Upload success: ${filename}`);
				return {
					success: true,
					url: presignedItem.download_url,
					objectKey
				};
			} catch (error) {
				if (error instanceof Error && error.name === "AbortError") return {
					success: false,
					error: "Upload cancelled",
					aborted: true
				};
				const errorMessage = error instanceof Error ? error.message : "Unknown error";
				this.logger?.error(`[CosUploadService] Upload failed: ${filename}`, error);
				return {
					success: false,
					error: errorMessage
				};
			}
		}
		/**
		* 批量上传文件到 COS
		*
		* 使用并发控制，限制同时上传的文件数量
		*
		* @param files - 要上传的文件数组
		* @param abortSignal - 可选的 AbortSignal，用于取消上传
		* @returns 所有文件的上传结果
		*/
		async uploadFiles(files, abortSignal) {
			if (files.length === 0) return {
				success: true,
				urls: [],
				results: []
			};
			if (abortSignal?.aborted) return {
				success: false,
				error: "Upload cancelled",
				aborted: true,
				results: files.map(() => ({
					success: false,
					error: "Upload cancelled",
					aborted: true
				}))
			};
			this.logger?.info(`[CosUploadService] Uploading ${files.length} file(s) with concurrency ${this.uploadConcurrency}`);
			try {
				const fileInfos = files.map((file) => ({
					file,
					objectKey: this.generateObjectKey(file.name)
				}));
				const objectKeys = fileInfos.map((info) => info.objectKey);
				const presignedResponse = await this.getPresignedUrls(objectKeys);
				this.logger?.debug(`[CosUploadService] Got ${presignedResponse.items.length} presigned URLs`);
				if (presignedResponse.items.length !== fileInfos.length) throw new Error(`Expected ${fileInfos.length} presigned URLs, got ${presignedResponse.items.length}`);
				const results = (await runWithConcurrencySettled(fileInfos.map(({ file }, index) => async () => {
					if (abortSignal?.aborted) return {
						success: false,
						error: "Upload cancelled",
						aborted: true,
						objectKey: fileInfos[index].objectKey
					};
					const presignedItem = presignedResponse.items[index];
					if (!presignedItem) return {
						success: false,
						error: `No presigned URL for ${file.name}`,
						objectKey: fileInfos[index].objectKey
					};
					try {
						const uploadResponse = await fetch(presignedItem.upload_url, {
							method: "PUT",
							body: file,
							headers: { "Content-Type": file.type || "application/octet-stream" },
							signal: abortSignal
						});
						if (!uploadResponse.ok) {
							const errorText = await uploadResponse.text().catch(() => uploadResponse.statusText);
							return {
								success: false,
								error: `COS upload failed: ${uploadResponse.status} ${errorText}`,
								objectKey: presignedItem.object_key
							};
						}
						this.logger?.debug(`[CosUploadService] Uploaded: ${file.name}`);
						return {
							success: true,
							url: presignedItem.download_url,
							objectKey: presignedItem.object_key
						};
					} catch (error) {
						if (error instanceof Error && error.name === "AbortError") return {
							success: false,
							error: "Upload cancelled",
							aborted: true,
							objectKey: presignedItem.object_key
						};
						return {
							success: false,
							error: error instanceof Error ? error.message : "Unknown error",
							objectKey: presignedItem.object_key
						};
					}
				}), this.uploadConcurrency)).map((result, index) => {
					if (result.status === "fulfilled") return result.value;
					return {
						success: false,
						error: result.reason instanceof Error ? result.reason.message : "Unknown error",
						objectKey: fileInfos[index].objectKey
					};
				});
				const urls = results.filter((r) => r.success && r.url).map((r) => r.url);
				const failedResults = results.filter((r) => !r.success);
				if (failedResults.length > 0) {
					const failedErrors = failedResults.map((r) => r.error).join("; ");
					return {
						success: false,
						error: `${failedResults.length} file(s) failed: ${failedErrors}`,
						expireSeconds: presignedResponse.expire,
						results
					};
				}
				this.logger?.info(`[CosUploadService] All ${files.length} file(s) uploaded successfully`);
				return {
					success: true,
					urls,
					expireSeconds: presignedResponse.expire,
					results
				};
			} catch (error) {
				const errorMessage = error instanceof Error ? error.message : "Unknown error";
				this.logger?.error("[CosUploadService] Batch upload failed", error);
				return {
					success: false,
					error: errorMessage,
					results: files.map(() => ({
						success: false,
						error: errorMessage
					}))
				};
			}
		}
	};
}));
//#endregion
//#region ../../packages/agent-provider/src/common/providers/cloud-agent-provider/cloud-provider.ts
function resolveTelemetryTimezone(logger) {
	try {
		return Intl.DateTimeFormat().resolvedOptions().timeZone || void 0;
	} catch (error) {
		logger?.warn("[CloudAgentProvider] failed to resolve telemetry timezone:", error);
		return;
	}
}
function isProbablyIp(value) {
	if (value.length === 0 || value.length > 45) return false;
	if (/^(?:\d{1,3}\.){3}\d{1,3}$/.test(value)) return true;
	return /^[0-9a-fA-F:.]+$/.test(value) && value.includes(":");
}
async function resolveCloudClientIp(logger) {
	if (cloudClientIp) return cloudClientIp;
	if (!cloudClientIpPromise) cloudClientIpPromise = fetchCloudClientIp(logger).then((ip) => {
		if (ip) cloudClientIp = ip;
		return ip;
	}).finally(() => {
		cloudClientIpPromise = void 0;
	});
	return cloudClientIpPromise;
}
async function fetchCloudClientIp(logger) {
	if (typeof fetch !== "function") {
		logger?.debug("[CloudAgentProvider] skip resolving telemetry client IP: fetch is unavailable");
		return;
	}
	const controller = typeof AbortController === "function" ? new AbortController() : void 0;
	let timer;
	try {
		return await Promise.race([fetchCloudClientIpOnce(controller?.signal, logger), new Promise((resolve) => {
			timer = setTimeout(() => {
				controller?.abort();
				logger?.warn(`[CloudAgentProvider] telemetry client IP resolution timed out after ${CLIENT_IP_FETCH_TIMEOUT_MS}ms`);
				resolve(void 0);
			}, CLIENT_IP_FETCH_TIMEOUT_MS);
		})]);
	} catch (error) {
		logger?.warn("[CloudAgentProvider] failed to resolve client IP for telemetry:", error);
		return;
	} finally {
		if (timer) clearTimeout(timer);
	}
}
async function fetchCloudClientIpOnce(signal, logger) {
	const response = await fetch(CLOUD_CLIENT_IP_ECHO_URL, {
		method: "GET",
		credentials: "omit",
		cache: "no-store",
		signal
	});
	if (!response.ok) {
		logger?.debug(`[CloudAgentProvider] telemetry client IP endpoint returned ${response.status}`);
		return;
	}
	const body = await response.text();
	if (body.length > MAX_CLIENT_IP_RESPONSE_CHARS) {
		logger?.debug("[CloudAgentProvider] telemetry client IP response is too large");
		return;
	}
	const parsed = JSON.parse(body);
	const ip = typeof parsed.ip === "string" ? parsed.ip.trim() : "";
	if (!isProbablyIp(ip)) {
		logger?.debug("[CloudAgentProvider] telemetry client IP response does not contain a valid IP");
		return;
	}
	return ip;
}
/**
* Normalize a path by resolving `.` and `..` segments
* This is a simplified version that works in browser environment
*/
function normalizePath(path) {
	const segments = path.split("/");
	const result = [];
	for (const segment of segments) if (segment === "..") {
		if (result.length > 0 && result[result.length - 1] !== "") result.pop();
	} else if (segment !== "." && segment !== "") result.push(segment);
	return (path.startsWith("/") ? "/" : "") + result.join("/");
}
/**
* Resolve agent:/// URI to filesystem path
*
* 只处理 agent:// 协议的 URI，raw path 直接透传不做任何处理
*
* Supported formats:
* - `agent:///workspace/{path}` → `/workspace/{path}`
* - `agent:///plans/{path}` → `/root/.codebuddy/plans/{path}`
* - `agent:///{path}` → `/{path}`
* - Raw paths (e.g. `/foo/bar`) → 直接透传，不处理
*
* Security: Path traversal attacks are prevented by normalizing paths
* and verifying they stay within expected boundaries.
*/
function resolveAgentUri(input) {
	if (!input.startsWith("agent://")) return input;
	const path = input.slice(8);
	if (!path.startsWith("/")) return input;
	const normalizedPath = normalizePath(path);
	if (normalizedPath.startsWith("/plans/") || normalizedPath === "/plans") {
		const finalPath = normalizePath("/root/.codebuddy" + normalizedPath);
		if (!finalPath.startsWith("/root/.codebuddy/plans")) throw new Error(`Invalid path: path traversal detected in ${input}`);
		return finalPath;
	}
	return normalizedPath;
}
/**
* Create a FilesResource wrapper that resolves agent:/// URIs
*/
function createAgentFilesystem(fs) {
	return {
		read: (path, opts) => fs.read(resolveAgentUri(path), opts),
		write: (pathOrFiles, dataOrOpts, opts) => {
			if (Array.isArray(pathOrFiles)) {
				const resolved = pathOrFiles.map((f) => ({
					...f,
					path: resolveAgentUri(f.path)
				}));
				return fs.write(resolved, dataOrOpts);
			}
			return fs.write(resolveAgentUri(pathOrFiles), dataOrOpts, opts);
		},
		list: (path, opts) => fs.list(resolveAgentUri(path), opts),
		exists: (path, opts) => fs.exists(resolveAgentUri(path), opts),
		makeDir: (path, opts) => fs.makeDir(resolveAgentUri(path), opts),
		remove: (path, opts) => fs.remove(resolveAgentUri(path), opts),
		rename: (oldPath, newPath, opts) => fs.rename(resolveAgentUri(oldPath), resolveAgentUri(newPath), opts),
		getInfo: (path, opts) => fs.getInfo(resolveAgentUri(path), opts),
		watchDir: (path, onEvent, opts) => fs.watchDir(resolveAgentUri(path), onEvent, opts)
	};
}
var CLOUD_CLIENT_IP_ECHO_URL, CLIENT_IP_FETCH_TIMEOUT_MS, MAX_CLIENT_IP_RESPONSE_CHARS, cloudClientIp, cloudClientIpPromise, CloudAgentProvider;
var init_cloud_provider = __esmMin((() => {
	init_axios();
	init_account();
	init_http();
	init_conversation_origin();
	init_lru_cache();
	init_cloud_connection();
	init_cos_upload_service();
	init_preload_helper();
	CLOUD_CLIENT_IP_ECHO_URL = "https://api.ipify.org?format=json";
	CLIENT_IP_FETCH_TIMEOUT_MS = 3e3;
	MAX_CLIENT_IP_RESPONSE_CHARS = 1024;
	CloudAgentProvider = class CloudAgentProvider {
		constructor(options) {
			this.requestInterceptorId = null;
			this.filesystemCache = /* @__PURE__ */ new Map();
			this.connectionCache = /* @__PURE__ */ new Map();
			this.eventListeners = /* @__PURE__ */ new Map();
			this.productConfigCache = null;
			this.options = options;
			this.logger = options.logger;
			this.marketplaceCache = new LRUCache(200);
			this.pluginCache = new LRUCache(2e3);
			if (options.endpoint) httpService.setBaseURL(options.endpoint);
			if (options.authToken) httpService.setAuthToken(options.authToken);
			if (options.headers && Object.keys(options.headers).length > 0) this.requestInterceptorId = httpService.registerRequestInterceptor((config) => {
				config.headers = config.headers || {};
				Object.entries(options.headers).forEach(([key, value]) => {
					config.headers[key] = value;
				});
				return config;
			});
			this.cosUploadService = new CosUploadService({ logger: this.logger });
		}
		/**
		* Dispose the provider and clean up resources
		*/
		dispose() {
			this.filesystemCache.clear();
			this.connectionCache.clear();
			if (this.requestInterceptorId !== null) httpService.ejectRequestInterceptor(this.requestInterceptorId);
		}
		/**
		* Get the filesystem provider (returns self)
		*/
		get filesystem() {
			return this;
		}
		/**
		* Get filesystem resource for an agent
		*
		* Creates or returns cached filesystem instance for the agent's sandbox.
		* The filesystem supports both `agent:///` URIs and raw paths.
		*
		* @param agentId - Agent ID to get filesystem for
		* @returns FilesResource instance for the agent's sandbox (with URI support)
		*
		* @example
		* ```typescript
		* const fs = await provider.getFilesystem(agentId);
		*
		* // Use agent:/// URIs
		* const content = await fs.read('agent:///files/src/app.ts');
		* await fs.write('agent:///artifacts/output.txt', 'Hello');
		*
		* // Raw paths still work (backward compatible)
		* const content2 = await fs.read('/src/app.ts');
		* ```
		*/
		async getFilesystem(agentId) {
			const cached = this.filesystemCache.get(agentId);
			if (cached) return cached;
			const info = await this.getSandboxInfo(agentId);
			let e2bFilesystem;
			if (this.options.filesystemFactory) e2bFilesystem = await this.options.filesystemFactory(info);
			else {
				const { E2BFilesystem } = await __vitePreload(async () => {
					const { E2BFilesystem } = await import("./e2b-filesystem-CXgdVL_7.js");
					return { E2BFilesystem };
				}, __vite__mapDeps([2,1]), import.meta.url);
				e2bFilesystem = await E2BFilesystem.connect(info);
			}
			if (e2bFilesystem.setReconnectFn) e2bFilesystem.setReconnectFn(async () => {
				this.logger?.debug(`Reconnecting E2B sandbox for agent: ${agentId}`);
				const newInfo = await this.getSandboxInfo(agentId);
				this.logger?.debug(`E2B sandbox reconnected for agent: ${agentId}`);
				return newInfo;
			});
			const filesystem = createAgentFilesystem(e2bFilesystem);
			this.filesystemCache.set(agentId, filesystem);
			this.logger?.debug(`Created filesystem for agent: ${agentId}`);
			return filesystem;
		}
		/**
		* Get sandbox information from backend
		*
		* Uses GET {endpoint}/console/as/conversations/{agentId}/session
		* to retrieve sandbox information. Extracts sandboxId from the session response
		* and constructs the apiUrl for E2B proxy.
		*
		* @param agentId - Agent ID
		* @returns E2B Sandbox connection information with sandboxId and apiUrl
		*/
		async getSandboxInfo(agentId) {
			const apiResponse = await httpService.get(`/console/as/conversations/${agentId}/session`);
			if (!apiResponse.data) throw new Error("No data in API response");
			const apiUrl = (apiResponse.data.e2bDataEndpoint || apiResponse.data.e2bEndpoint.replace("/v2", "/console")).replace(/^http:\/\//, "https://");
			const currentEnterpriseId = localStorage.getItem("currentEnterpriseId");
			return {
				sandboxId: apiResponse.data.sandboxId,
				apiUrl,
				accessToken: apiResponse.data.token,
				domain: apiResponse.data.clusterDomainSuffix,
				headers: { ...currentEnterpriseId && { "X-Enterprise-Id": currentEnterpriseId } }
			};
		}
		/**
		* Get agent state by ID
		*/
		async get(agentId) {
			try {
				const apiResponse = await httpService.get(`/console/as/conversations/${agentId}`);
				if (!apiResponse.data) throw new Error("No data in API response");
				return this.toAgentState(apiResponse.data);
			} catch (error) {
				if (error.response?.status === 404) return;
				this.logger?.error(`Failed to get agent ${agentId}:`, error);
				throw error;
			}
		}
		/**
		* Batch get agents by IDs (#51874).
		* Uses POST /console/as/conversations/batch-get to fetch multiple conversations in one request.
		* IDs that are not found / deleted / no-access are reported as missingIds (silent discard by backend).
		*/
		async batchGet(ids) {
			const uniqueIds = Array.from(new Set(ids.filter(Boolean)));
			if (uniqueIds.length === 0) return {
				agents: [],
				missingIds: []
			};
			const apiResponse = await httpService.post("/console/as/conversations/batch-get", { ids: uniqueIds });
			if (!apiResponse.data) throw new Error("No data in batch-get API response");
			const agents = apiResponse.data.conversations.map((c) => this.toAgentState(c));
			const returnedIds = new Set(agents.map((a) => a.id));
			return {
				agents,
				missingIds: uniqueIds.filter((id) => !returnedIds.has(id))
			};
		}
		/**
		* List all agent states with pagination information
		*
		* @param options - Optional query parameters for filtering, sorting, and pagination
		* @returns Object containing agents array and pagination info
		*/
		async list(options) {
			try {
				const params = {
					page: 1,
					size: 30,
					sort: {
						order: "desc",
						orderBy: "status"
					},
					conversationOrigin: AGENTS_ORIGIN,
					...options && {
						...options.dayRange !== void 0 && { dayRange: options.dayRange },
						...options.page !== void 0 && { page: options.page },
						...options.size !== void 0 && { size: options.size },
						...options.sort !== void 0 && { sort: options.sort },
						...options.filters !== void 0 && { filters: options.filters },
						...options.title !== void 0 && { title: options.title },
						...options.conversationOrigin !== void 0 && { conversationOrigin: options.conversationOrigin }
					}
				};
				const url = this.buildGetUrl("/console/as/conversations/", params);
				const apiResponse = await httpService.get(url);
				if (!apiResponse.data) throw new Error("No data in API response");
				return {
					agents: apiResponse.data.conversations.map((a) => this.toAgentState(a)),
					pagination: apiResponse.data.pagination
				};
			} catch (error) {
				this.logger?.error("Failed to list agents:", error);
				throw error;
			}
		}
		/**
		* Create a new conversation
		* POST {endpoint}/console/as/conversations
		* @param params - Session params containing cwd and optional configuration
		*/
		async create(params) {
			try {
				const { options = {} } = params;
				const codebuddyMeta = options._meta?.["codebuddy.ai"];
				const tagsObj = options.tags || codebuddyMeta?.tags;
				const tagsArray = tagsObj ? Object.entries(tagsObj).map(([key, value]) => `${key}:${value}`) : void 0;
				const conversationOrigin = typeof options._meta?.["conversationOrigin"] === "string" ? options._meta["conversationOrigin"] : void 0;
				const createPayload = {
					prompt: (options.prompt || "").slice(0, 100),
					model: options.model || "deepseek-r1",
					...tagsArray && tagsArray.length > 0 ? { tags: tagsArray } : {},
					...options.projectId ? { project_id: options.projectId } : {},
					...conversationOrigin ? { conversationOrigin } : {},
					plugins: [{
						name: "weixinpay",
						marketplace: "codebuddy-builtin"
					}]
				};
				console.log("[CloudAgentProvider] Creating conversation with payload:", createPayload);
				const apiResponse = await httpService.post("/console/as/conversations/", createPayload);
				if (!apiResponse.data) throw new Error("No data in API response");
				this.logger?.info(`Created conversation: ${apiResponse.data.id}`);
				return apiResponse.data.id;
			} catch (error) {
				this.logger?.error("Failed to create conversation:", error);
				throw error;
			}
		}
		/**
		* Connect to an agent and return the connection
		*
		* This method:
		* 1. Fetches the agent configuration from the backend
		* 2. Checks if an existing connection can be reused (based on endpoint link)
		* 3. Creates a CloudAgentConnection to the agent's endpoint if not cached
		* 4. Saves session connection info to the connection
		* 5. Connects and initializes the connection
		* 6. Returns the connected CloudAgentConnection
		*
		* Connection caching:
		* - Connections are cached by endpoint link to enable reuse
		* - CloudAgentConnection is responsible for handling connection health checks
		*   and token expiration internally
		*/
		async connect(agentId) {
			let sessionApiResponse;
			try {
				sessionApiResponse = await httpService.get(`/console/as/conversations/${agentId}/session`);
				if (!sessionApiResponse.data) throw new Error("No data in API response");
			} catch (error) {
				if (error.response?.status === 404) throw new Error(`Agent not found: ${agentId}`);
				throw new Error(`Failed to get agent for connection: ${error.message}`);
			}
			const sessionData = sessionApiResponse.data;
			const endpoint = sessionData.link.replace(/^http:\/\//, "https://");
			const cwd = sessionApiResponse.data.cwd || "/workspace";
			let agentName;
			let agentCreatedAt;
			let agentStatus;
			try {
				const agentApiResponse = await httpService.get(`/console/as/conversations/${agentId}`);
				if (agentApiResponse.data) {
					agentName = agentApiResponse.data.name;
					agentCreatedAt = agentApiResponse.data.createdAt ? new Date(agentApiResponse.data.createdAt) : void 0;
					agentStatus = agentApiResponse.data.sessionStatus || agentApiResponse.data.status;
				}
			} catch (error) {
				this.logger?.debug(`Failed to fetch conversation details for ${agentId}:`, error);
			}
			const existingConnection = this.connectionCache.get(endpoint);
			if (existingConnection) {
				this.connectionCache.delete(endpoint);
				existingConnection.removeAllListeners();
				existingConnection.disconnect().catch((err) => {
					this.logger?.debug("Failed to disconnect old connection:", err);
				});
			}
			const clientCapabilities = {
				...this.options.clientCapabilities,
				_meta: {
					...this.options.clientCapabilities?._meta,
					"codebuddy.ai": {
						...this.options.clientCapabilities?._meta?.["codebuddy.ai"],
						cwd
					}
				}
			};
			const connection = new CloudAgentConnection(sessionData.sessionId || agentId, {
				endpoint,
				authToken: sessionData.token,
				logger: this.logger,
				clientCapabilities
			}, cwd);
			connection.setSessionConnectionInfo({
				sessionId: sessionData.sessionId,
				agentId: sessionData.id,
				link: sessionData.link,
				token: sessionData.token,
				sandboxId: sessionData.sandboxId,
				expireAt: sessionData.expireAt,
				cwd
			});
			try {
				await connection.connect();
			} catch (error) {
				this.logger?.error(`Failed to connect to agent ${agentId}:`, error);
				throw error;
			}
			this.connectionCache.set(endpoint, connection);
			connection.once("disconnected", () => {
				this.connectionCache.delete(endpoint);
				this.logger?.debug(`Connection removed from cache: ${endpoint}`);
			});
			this.logger?.info(`Connected to agent: ${agentId}`);
			this.emitEvent("sessionCreated", {
				id: agentId,
				agentId,
				name: agentName,
				status: agentStatus,
				cwd,
				createdAt: agentCreatedAt
			});
			return connection;
		}
		/**
		* Delete a conversation by ID
		* POST {endpoint}/console/as/conversations/{agentId}/delete
		*/
		async delete(agentId) {
			try {
				const requestBody = { id: agentId };
				await httpService.post(`/console/as/conversations/${agentId}/delete`, requestBody);
				return true;
			} catch (error) {
				if (error.response?.status === 404) return false;
				this.logger?.error(`Failed to delete conversation ${agentId}:`, error);
				throw error;
			}
		}
		/**
		* Archive a conversation by ID
		* POST {endpoint}/console/as/conversations/{agentId}/archive
		*
		* @param agentId - Conversation ID to archive
		* @returns ArchiveConversationResponse containing the archived conversation ID
		*
		* @example
		* ```typescript
		* const result = await provider.archive('agent-123');
		* console.log('Archived conversation:', result.id);
		* ```
		*/
		async archive(agentId) {
			try {
				const apiResponse = await httpService.post(`/console/as/conversations/${agentId}/archive`);
				if (!apiResponse.data) {
					this.logger?.info(`Archived conversation: ${agentId}`);
					return { id: agentId };
				}
				this.logger?.info(`Archived conversation: ${apiResponse.data.id}`);
				return apiResponse.data;
			} catch (error) {
				this.logger?.error(`Failed to archive conversation ${agentId}:`, error);
				throw error;
			}
		}
		/**
		* Rename a conversation by ID
		* POST {endpoint}/console/as/conversations/{agentId}
		*
		* @param agentId - Conversation ID to rename
		* @param title - New title for the conversation
		* @returns PatchConversationResponse containing the renamed conversation ID
		*
		* @example
		* ```typescript
		* const result = await provider.rename('agent-123', 'New Title');
		* console.log('Renamed conversation:', result.id);
		* ```
		*/
		async rename(agentId, title) {
			try {
				const body = { title };
				const apiResponse = await httpService.post(`/console/as/conversations/${agentId}`, body);
				if (!apiResponse.data) {
					this.logger?.info(`Renamed conversation: ${agentId} to "${title}"`);
					return { id: agentId };
				}
				this.logger?.info(`Renamed conversation: ${apiResponse.data.id} to "${title}"`);
				return apiResponse.data;
			} catch (error) {
				this.logger?.error(`Failed to rename conversation ${agentId}:`, error);
				throw error;
			}
		}
		/**
		* Update conversation status by ID
		* POST {endpoint}/console/as/conversations/{agentId}
		*
		* @param agentId - Conversation ID to update
		* @param status - New status for the conversation
		* @returns PatchConversationResponse containing the updated conversation ID
		*
		* @example
		* ```typescript
		* const result = await provider.updateStatus('agent-123', 'completed');
		* console.log('Updated conversation status:', result.id);
		* ```
		*/
		async updateStatus(agentId, status) {
			try {
				const body = { status };
				const apiResponse = await httpService.post(`/console/as/conversations/${agentId}`, body);
				if (!apiResponse.data) {
					this.logger?.info(`Updated conversation status: ${agentId} to "${status}"`);
					return { id: agentId };
				}
				this.logger?.info(`Updated conversation status: ${apiResponse.data.id} to "${status}"`);
				return apiResponse.data;
			} catch (error) {
				this.logger?.error(`Failed to update conversation status ${agentId}:`, error);
				throw error;
			}
		}
		/**
		* Get available models from product configuration
		*
		* GET {endpoint}/console/enterprises/{personal|enterpriseId}/models?repos[]={repo}
		*
		* This method fetches the models from /console/enterprises API
		* and extracts the models array from the response.
		*
		* @param repo - Optional repository URL for context-specific config
		* @returns Array of ModelInfo with full model details
		*/
		async getModels(repo) {
			try {
				const account = accountService.getAccount();
				if (!account) {
					this.logger?.warn("[CloudAgentProvider] No account info available, cannot get models");
					return [];
				}
				let url = `/console/enterprises/${account.enterpriseId || "personal"}/models`;
				if (repo) url += `?repos[]=${encodeURIComponent(repo)}`;
				const headers = {
					"Accept": "application/json, text/plain, */*",
					"X-Requested-With": "XMLHttpRequest",
					"X-Request-ID": this.generateRequestId()
				};
				this.logger?.debug(`[CloudAgentProvider] GET ${url}`);
				const apiResponse = await httpService.get(url, { headers });
				if (!apiResponse.data) {
					this.logger?.warn("[CloudAgentProvider] No data in config response, returning empty models");
					return [];
				}
				this.productConfigCache = apiResponse.data;
				const productConfig = apiResponse.data;
				const allModels = productConfig.models ?? [];
				const cliModelIds = (productConfig.agents ?? []).find((agent) => agent.name === "cli")?.models ?? [];
				const filteredModels = cliModelIds.length > 0 ? allModels.filter((model) => cliModelIds.includes(model.id)) : allModels;
				this.logger?.info(`[CloudAgentProvider] Retrieved ${filteredModels.length} models for cli agent (total: ${allModels.length})`);
				return filteredModels.map((model) => ({
					id: model.id,
					name: model.name ?? model.id,
					description: model.description,
					credits: model.credits,
					configurable: model.configurable,
					configured: model.configured,
					isDefault: model.isDefault,
					supportsImages: model.supportsImages,
					supportsReasoning: model.supportsReasoning,
					onlyReasoning: model.onlyReasoning,
					reasoning: model.reasoning,
					disabledMultimodal: model.disabledMultimodal,
					disabled: model.disabled,
					disabledReason: model.disabledReason,
					disabledAction: model.disabledAction
				}));
			} catch (error) {
				this.logger?.error("[CloudAgentProvider] Failed to get models:", error);
				throw error;
			}
		}
		/**
		* 获取产品部署类型（从缓存）
		* 需要先调用 getModels() 初始化缓存
		*
		* @returns 部署类型：'SaaS' | 'Cloud-Hosted' | 'Self-Hosted'，默认为 'SaaS'
		*/
		getDeploymentType() {
			return this.productConfigCache?.deploymentType ?? "SaaS";
		}
		/**
		* 获取 Credit 购买引导配置（从缓存）
		* 需要先调用 getModels() 初始化缓存
		*
		* @returns Credit 购买引导配置，key 为错误码。如果后端未返回，则使用默认配置
		*/
		getCreditPurchaseActions() {
			return this.productConfigCache?.config?.creditPurchaseActions ?? {
				"14018": {
					labelZh: "获取 Credits",
					labelEn: "Get credits",
					url: "https://www.codebuddy.cn/profile/plan",
					showButton: true
				},
				"6004": {
					labelZh: "升级专业版",
					labelEn: "Upgrade to Pro",
					url: "https://www.codebuddy.cn/profile/plan",
					showButton: true
				},
				"6005": {
					labelZh: "升级专业版",
					labelEn: "Upgrade to Pro",
					url: "https://www.codebuddy.cn/profile/plan",
					showButton: true
				}
			};
		}
		/**
		* 获取产品功能开关（从缓存）
		* 需要先调用 getModels() 初始化缓存
		*
		* @returns 产品功能开关 Record，如果缓存为空则返回 undefined
		*/
		getProductFeatures() {
			return this.productConfigCache?.productFeatures;
		}
		/**
		* Generate a unique request ID
		*/
		generateRequestId() {
			return "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx".replace(/x/g, () => Math.floor(Math.random() * 16).toString(16));
		}
		static {
			this.IMAGE_MIME_TYPES = [
				"image/png",
				"image/jpeg",
				"image/jpg",
				"image/gif",
				"image/webp",
				"image/svg+xml",
				"image/bmp"
			];
		}
		/**
		* Pick files using browser's native file input
		*
		* @param params - File picker parameters
		* @returns Response with selected file paths (filenames in browser)
		*/
		async pickFile(params) {
			return new Promise((resolve) => {
				const input = document.createElement("input");
				input.type = "file";
				input.style.display = "none";
				if (params?.filters && params.filters.length > 0) {
					const acceptTypes = [];
					for (const filter of params.filters) for (const ext of filter.extensions) {
						const mimeType = this.extensionToMimeType(ext);
						acceptTypes.push(mimeType || `.${ext}`);
					}
					input.accept = acceptTypes.join(",");
				} else input.accept = CloudAgentProvider.IMAGE_MIME_TYPES.join(",");
				input.multiple = params?.canSelectMany ?? false;
				input.onchange = () => {
					const files = input.files;
					if (!files || files.length === 0) resolve({
						files: [],
						canceled: true
					});
					else {
						const fileArray = Array.from(files);
						this.logger?.info(`Picked ${fileArray.length} file(s)`);
						resolve({
							files: fileArray,
							canceled: false
						});
					}
					document.body.removeChild(input);
				};
				input.oncancel = () => {
					resolve({
						files: [],
						canceled: true
					});
					document.body.removeChild(input);
				};
				document.body.appendChild(input);
				input.click();
			});
		}
		/**
		* Convert file extension to MIME type
		*/
		extensionToMimeType(ext) {
			return {
				"png": "image/png",
				"jpg": "image/jpeg",
				"jpeg": "image/jpeg",
				"gif": "image/gif",
				"webp": "image/webp",
				"svg": "image/svg+xml",
				"bmp": "image/bmp",
				"ico": "image/x-icon"
			}[ext.toLowerCase().replace(/^\./, "")] || null;
		}
		/**
		* Upload files to cloud storage via COS presigned URL
		*
		* @param params - files array (File objects in browser), optional abortSignal
		* @returns Response with corresponding cloud URLs
		*/
		async uploadFile(params) {
			this.logger?.info(`[CloudAgentProvider] uploadFile called for ${params.files.length} file(s)`);
			const files = params.files.filter((f) => typeof f !== "string");
			if (files.length === 0) return {
				success: false,
				error: "No valid File objects provided"
			};
			const result = await this.cosUploadService.uploadFiles(files, params.abortSignal);
			return {
				success: result.success,
				urls: result.urls,
				expireSeconds: result.expireSeconds,
				error: result.error,
				aborted: result.aborted
			};
		}
		/**
		* Register event listener
		* @param event - Event name
		* @param handler - Event handler function
		*/
		on(event, handler) {
			if (!this.eventListeners.has(event)) this.eventListeners.set(event, /* @__PURE__ */ new Set());
			this.eventListeners.get(event).add(handler);
			return () => {
				this.off(event, handler);
			};
		}
		/**
		* Unregister event listener
		* @param event - Event name
		* @param handler - Event handler function
		*/
		off(event, handler) {
			const listeners = this.eventListeners.get(event);
			if (listeners) listeners.delete(handler);
		}
		/**
		* Emit event to all registered listeners
		* @param event - Event name
		* @param args - Event arguments
		*/
		emitEvent(event, ...args) {
			const listeners = this.eventListeners.get(event);
			if (listeners && listeners.size > 0) {
				this.logger?.debug(`Emitting event: ${event}`, args);
				for (const handler of listeners) try {
					handler(...args);
				} catch (error) {
					this.logger?.error(`Error in event handler for ${event}:`, error);
				}
			}
		}
		/**
		* 获取支持的场景列表
		* API 端点: GET /v2/as/support/scenes (不鉴权)
		* 用于 Welcome 页面的 QuickActions 快捷操作
		*
		* @param locale - 可选，语言环境（如 'zh-CN', 'en-US'），用于获取对应语言的场景数据
		* @returns Promise<SupportScene[]> 支持的场景列表
		*/
		async getSupportScenes(locale) {
			try {
				const url = this.buildGetUrl("/v2/as/support/scenes", locale ? { locale } : void 0);
				const apiResponse = await httpService.get(url);
				if (!apiResponse.data) {
					this.logger?.warn("[CloudAgentProvider] No data in support scenes response");
					return [];
				}
				const scenes = apiResponse.data.scenes || [];
				this.logger?.info(`[CloudAgentProvider] Retrieved ${scenes.length} support scenes${locale ? ` for locale: ${locale}` : ""}`);
				return scenes;
			} catch (error) {
				this.logger?.error("[CloudAgentProvider] Failed to get support scenes:", error);
				return [];
			}
		}
		toAgentState(data) {
			const status = data.sessionStatus || data.status;
			return {
				id: data.id,
				name: data.name,
				description: data.summary,
				type: "cloud",
				status,
				createdAt: data.createdAt ? new Date(data.createdAt) : void 0,
				updatedAt: data.updatedAt ? new Date(data.updatedAt) : void 0,
				capabilities: this.options.clientCapabilities,
				isUserDefinedTitle: data.isUserDefinedTitle,
				conversationOrigin: data.conversationOrigin
			};
		}
		/**
		* Helper: 将 GET 请求的 body 转换为 URL 查询参数
		*/
		buildGetUrl(path, params) {
			if (!params) return path;
			const searchParams = new URLSearchParams();
			for (const [key, value] of Object.entries(params)) if (value !== void 0 && value !== null) {
				const stringValue = typeof value === "object" ? JSON.stringify(value) : String(value);
				searchParams.append(key, stringValue);
			}
			const queryString = searchParams.toString();
			return queryString ? `${path}?${queryString}` : path;
		}
		/**
		* 获取已安装插件列表
		* GET /console/as/user/plugins/installed
		*/
		async getInstalledPlugins(forceRefresh) {
			try {
				const result = ((await httpService.get("/console/as/user/plugins/installed")).data?.plugins || []).map((p) => ({
					name: p.plugin_name,
					marketplaceName: p.marketplace_name,
					status: p.enabled ? "enabled" : "disabled",
					description: p.description,
					version: p.version,
					installScope: p.scope === "local" ? "project" : p.scope,
					installedScopes: [p.scope],
					installId: p.id
				}));
				result.forEach((plugin) => {
					this.pluginCache.set(plugin.name, plugin);
				});
				return result;
			} catch (error) {
				this.logger?.error("[CloudAgentProvider] getInstalledPlugins failed:", error);
				throw error;
			}
		}
		/**
		* 安装插件
		* POST /console/as/user/plugins/install
		*
		* @param pluginNames - 插件名称数组
		* @param marketplaceNameOrId - 市场名称或 ID
		*/
		async installPlugins(pluginNames, marketplaceNameOrId, installScope, marketplaceSource, workspacePath) {
			try {
				const marketplaceId = await this.findMarketplaceId(marketplaceNameOrId);
				if (!marketplaceId) return {
					success: false,
					error: `Marketplace not found: ${marketplaceNameOrId}`
				};
				const failed = (await Promise.allSettled(pluginNames.map((pluginName) => httpService.post("/console/as/user/plugins/install", {
					plugin_name: pluginName,
					marketplace_id: marketplaceId,
					version: "latest"
				})))).filter((r) => r.status === "rejected");
				if (failed.length > 0) {
					const errors = failed.map((r) => r.reason?.message || "Unknown error");
					return {
						success: false,
						error: `安装失败 ${failed.length} 个插件: ${errors.join(", ")}`
					};
				}
				return { success: true };
			} catch (error) {
				return {
					success: false,
					error: this.extractErrorMessage(error)
				};
			}
		}
		/**
		* 卸载插件
		* POST /console/as/user/plugins/installed/:id/uninstall
		*
		* 完整链路：
		* CloudAgentProvider.uninstallPlugin()
		*   -> HTTP POST /console/as/user/plugins/installed/:id/uninstall
		*   -> agentserver: PluginInstallService.Uninstall()
		*   -> 软删除 DB + 异步同步到活跃沙箱
		*
		* @param pluginName - 插件名称
		* @param marketplaceName - 市场名称（用于标识唯一插件）
		* @param scope - 卸载范围 ('user' | 'project' | 'project-local')
		*/
		async uninstallPlugin(pluginName, marketplaceName, scope) {
			try {
				const installId = await this.findPluginInstallId(pluginName);
				if (!installId) return {
					success: false,
					error: `Plugin not found or not installed: ${pluginName}`
				};
				await httpService.post(`/console/as/user/plugins/installed/${installId}/uninstall`);
				return { success: true };
			} catch (error) {
				return {
					success: false,
					error: this.extractErrorMessage(error)
				};
			}
		}
		/**
		* 获取插件市场列表
		* GET /console/as/marketplace/sources
		*/
		async getPluginMarketplaces(forceRefresh) {
			try {
				const result = ((await httpService.get("/console/as/marketplace/sources")).data?.sources || []).map((src) => ({
					id: src.id,
					name: src.name,
					type: this.mapSourceType(src.source_type),
					source: { url: src.url },
					description: src.name,
					isBuiltin: src.is_default
				}));
				result.forEach((m) => {
					const marketplaceInfo = {
						id: m.id,
						name: m.name
					};
					this.marketplaceCache.set(m.name, marketplaceInfo);
					this.marketplaceCache.set(m.id, marketplaceInfo);
				});
				return result;
			} catch (error) {
				this.logger?.error("[CloudAgentProvider] getPluginMarketplaces failed:", error);
				throw error;
			}
		}
		/**
		* 获取市场下的插件列表
		* - 有 searchText: GET /console/as/marketplace/plugins/search (跨所有市场搜索)
		* - 无 searchText: GET /console/as/marketplace/plugins (指定市场)
		*
		* @param marketplaceNameOrId - 市场名称或 ID（优先使用 ID，如果是名称则从缓存查询 ID）
		* @param forceRefresh - 是否强制刷新
		* @param searchText - 搜索关键字（如果提供，则跨所有市场搜索）
		*/
		async getMarketplacePlugins(marketplaceNameOrId, forceRefresh, searchText) {
			try {
				if (searchText) return ((await httpService.get("/console/as/marketplace/plugins/search", { params: {
					q: searchText,
					page: 1,
					page_size: 100
				} })).data?.plugins || []).map((p) => this.mapPluginData(p));
				const sourceId = await this.findMarketplaceId(marketplaceNameOrId);
				if (!sourceId) {
					this.logger?.warn(`[CloudAgentProvider] Marketplace not found: ${marketplaceNameOrId}`);
					return [];
				}
				const params = {
					source_id: sourceId,
					page: 1,
					page_size: 100
				};
				return ((await httpService.get("/console/as/marketplace/plugins", { params })).data?.plugins || []).map((p) => this.mapPluginData(p));
			} catch (error) {
				this.logger?.error("[CloudAgentProvider] getMarketplacePlugins failed:", error);
				throw error;
			}
		}
		/**
		* 获取插件详情
		* GET /console/as/marketplace/plugins/:name/detail
		*
		* @param pluginName - 插件名称
		* @param marketplaceNameOrId - 市场名称或 ID（优先使用 ID，如果是名称则从缓存查询 ID）
		*/
		async getPluginDetail(pluginName, marketplaceNameOrId) {
			try {
				const sourceId = await this.findMarketplaceId(marketplaceNameOrId);
				if (!sourceId) {
					this.logger?.warn(`[CloudAgentProvider] Marketplace not found: ${marketplaceNameOrId}`);
					return null;
				}
				const p = (await httpService.get(`/console/as/marketplace/plugins/${pluginName}/detail`, { params: { source_id: sourceId } })).data?.plugin;
				if (!p) return null;
				const capabilities = p.capabilities ? this.parseCapabilities(p.capabilities) : {};
				const tags = p.tags ? JSON.parse(p.tags) : [];
				return {
					name: p.name,
					marketplaceName: p.marketplace_name,
					description: p.description,
					version: p.version,
					iconUrl: p.icon_url,
					tags,
					installed: p.installed,
					status: p.enabled ? "enabled" : p.installed ? "disabled" : "not-installed",
					readme: p.readme,
					author: p.author,
					homepage: p.homepage,
					repositoryUrl: p.repository_url,
					license: p.license,
					...capabilities
				};
			} catch (error) {
				this.logger?.error("[CloudAgentProvider] getPluginDetail failed:", error);
				throw error;
			}
		}
		/**
		* 添加插件市场
		* POST /console/as/marketplace/sources
		*/
		async addPluginMarketplace(sourceUrl, name) {
			try {
				const body = {
					source_type: sourceUrl.startsWith("http") ? "url" : "github",
					url: sourceUrl,
					name: name || sourceUrl
				};
				const sourceData = (await httpService.post("/console/as/marketplace/sources", body)).data?.source;
				if (!sourceData) throw new Error("Invalid response from server");
				const marketplaceInfo = {
					id: sourceData.id,
					name: sourceData.name
				};
				this.marketplaceCache.set(sourceData.name, marketplaceInfo);
				this.marketplaceCache.set(sourceData.id, marketplaceInfo);
				return {
					success: true,
					marketplace: {
						id: sourceData.id,
						name: sourceData.name,
						type: this.mapSourceType(sourceData.source_type),
						source: { url: sourceData.url },
						isBuiltin: sourceData.is_default
					}
				};
			} catch (error) {
				return {
					success: false,
					error: this.extractErrorMessage(error)
				};
			}
		}
		/**
		* 删除插件市场
		* POST /console/as/marketplace/sources/:id/delete
		*/
		async removePluginMarketplace(marketplaceNameOrId) {
			try {
				const marketplaceId = await this.findMarketplaceId(marketplaceNameOrId);
				if (!marketplaceId) return {
					success: false,
					error: `Marketplace not found: ${marketplaceNameOrId}`
				};
				await httpService.post(`/console/as/marketplace/sources/${marketplaceId}/delete`, {});
				return { success: true };
			} catch (error) {
				return {
					success: false,
					error: this.extractErrorMessage(error)
				};
			}
		}
		/**
		* 刷新插件市场
		* POST /console/as/marketplace/sources/:id/check-updates
		*/
		async refreshPluginMarketplace(marketplaceNameOrId) {
			try {
				const marketplaceId = await this.findMarketplaceId(marketplaceNameOrId);
				if (!marketplaceId) return {
					success: false,
					error: `Marketplace not found: ${marketplaceNameOrId}`
				};
				return {
					success: true,
					plugins: (await httpService.post(`/console/as/marketplace/sources/${marketplaceId}/check-updates`, {})).data?.updated_plugins || []
				};
			} catch (error) {
				return {
					success: false,
					error: this.extractErrorMessage(error)
				};
			}
		}
		/**
		* 批量切换插件启用/禁用状态
		* POST /console/as/user/plugins/installed/:id/toggle
		*/
		async batchTogglePlugins(request) {
			try {
				const results = await Promise.allSettled(request.items.map(async (item) => {
					const installId = await this.findPluginInstallId(item.pluginName);
					if (!installId) throw new Error(`Plugin not found or not installed: ${item.pluginName}`);
					const enabled = item.operation === "enable";
					await httpService.post(`/console/as/user/plugins/installed/${installId}/toggle`, { enabled });
					return item;
				}));
				const succeededPlugins = [];
				const failedPlugins = [];
				results.forEach((r, i) => {
					const item = request.items[i];
					if (r.status === "fulfilled") succeededPlugins.push(item);
					else failedPlugins.push({
						...item,
						error: r.reason?.message || "Unknown error"
					});
				});
				return {
					success: failedPlugins.length === 0,
					succeededPlugins,
					failedPlugins
				};
			} catch (error) {
				return {
					success: false,
					succeededPlugins: [],
					failedPlugins: request.items.map((item) => ({
						...item,
						error: this.extractErrorMessage(error)
					}))
				};
			}
		}
		/**
		* 将后端插件数据映射为前端格式
		*/
		mapPluginData(p) {
			const capabilities = p.capabilities ? this.parseCapabilities(p.capabilities) : {};
			let tags = [];
			if (p.tags) {
				if (Array.isArray(p.tags)) tags = p.tags;
				else if (typeof p.tags === "string") try {
					const parsed = JSON.parse(p.tags);
					tags = Array.isArray(parsed) ? parsed : [parsed];
				} catch {
					tags = p.tags.split(",").map((t) => t.trim()).filter((t) => t);
				}
			}
			return {
				name: p.name,
				marketplaceName: p.marketplace_name,
				description: p.description,
				version: p.version,
				iconUrl: p.icon_url,
				tags,
				installed: p.installed,
				status: p.enabled ? "enabled" : p.installed ? "disabled" : "not-installed",
				installedScopes: p.installed ? [p.installed_scope] : [],
				...capabilities
			};
		}
		/**
		* 从缓存中查找插件的 install_id
		* 如果缓存未命中，则调用 API 获取并缓存
		*
		* @param pluginName - 插件名称
		* @returns install_id 或 null
		*/
		async findPluginInstallId(pluginName) {
			const cached = this.pluginCache.get(pluginName);
			if (cached) return cached.installId;
			await this.getInstalledPlugins();
			return this.pluginCache.get(pluginName)?.installId || null;
		}
		/**
		* 从缓存中查找 marketplace ID
		* 如果缓存未命中，则调用 API 获取并缓存
		*/
		async findMarketplaceId(nameOrId) {
			const cached = this.marketplaceCache.get(nameOrId);
			if (cached) return cached.id;
			await this.getPluginMarketplaces();
			return this.marketplaceCache.get(nameOrId)?.id || null;
		}
		/**
		* 提取 API 错误信息
		* 从 AxiosError 中提取详细的错误信息，包括 HTTP 状态码、错误码和错误消息
		*/
		extractErrorMessage(error) {
			if (error instanceof AxiosError) {
				const status = error.response?.status;
				const apiResponse = error.response?.data;
				const parts = [];
				if (status) parts.push(`HTTP ${status}`);
				if (apiResponse?.code) parts.push(`Code ${apiResponse.code}`);
				if (apiResponse?.msg) parts.push(apiResponse.msg);
				else if (error.message) parts.push(error.message);
				const errorMessage = parts.join(" - ");
				this.logger?.error("[CloudAgentProvider] API Error:", {
					status,
					code: apiResponse?.code,
					msg: apiResponse?.msg,
					requestId: apiResponse?.requestId,
					url: error.config?.url,
					method: error.config?.method
				});
				return errorMessage;
			}
			if (error instanceof Error) return error.message;
			return "Unknown error";
		}
		/**
		* 映射后端 source_type 到前端类型
		*/
		mapSourceType(sourceType) {
			switch (sourceType) {
				case "github": return "github";
				case "official": return "custom";
				default: return "custom";
			}
		}
		/**
		* 解析 capabilities JSON 字符串
		*/
		parseCapabilities(capabilitiesStr) {
			try {
				const cap = JSON.parse(capabilitiesStr);
				return {
					commands: cap.commands,
					skills: cap.skills,
					mcpServers: cap.mcp,
					agents: cap.agents,
					hooks: cap.hooks,
					rules: cap.rules
				};
			} catch {
				return {};
			}
		}
		/**
		* 上报 telemetry 事件（Cloud 模式）
		* 通过 HTTP POST 发送到 /v2/report
		* 注入用户信息和浏览器环境等公共字段
		*/
		async reportTelemetry(eventName, payload) {
			try {
				const account = accountService.getAccount();
				const commonFields = {};
				if (account) {
					commonFields.userId = account.uid;
					commonFields.userNickname = account.nickname;
					if (account.enterpriseId) commonFields.enterpriseId = account.enterpriseId;
					if (account.enterpriseUserName) commonFields.username = account.enterpriseUserName;
				}
				if (typeof navigator !== "undefined") {
					commonFields.userAgent = navigator.userAgent;
					commonFields.os = navigator.platform;
				}
				if (!payload.timezone) {
					const timezone = resolveTelemetryTimezone(this.logger);
					if (timezone) commonFields.timezone = timezone;
				}
				if (this.options.isOversea === true && !payload.clientIp) {
					const clientIp = await resolveCloudClientIp(this.logger);
					if (clientIp) commonFields.clientIp = clientIp;
				}
				const events = [{
					eventCode: eventName,
					timestamp: Date.now(),
					reportDelay: 0,
					...commonFields,
					...payload
				}];
				if (this.options.reportEndpoint) await httpService.post(`${this.options.reportEndpoint}/v2/report`, events);
				else await httpService.post("/v2/report", events);
			} catch (error) {
				this.logger?.warn("reportTelemetry() failed:", error);
			}
		}
	};
}));
//#endregion
//#region ../../packages/agent-provider/src/common/types.ts
var FileType, FilesystemEventType;
var init_types$3 = __esmMin((() => {
	FileType = /* @__PURE__ */ function(FileType) {
		FileType["FILE"] = "file";
		FileType["DIR"] = "dir";
		return FileType;
	}({});
	FilesystemEventType = /* @__PURE__ */ function(FilesystemEventType) {
		FilesystemEventType["CHMOD"] = "chmod";
		FilesystemEventType["CREATE"] = "create";
		FilesystemEventType["REMOVE"] = "remove";
		FilesystemEventType["RENAME"] = "rename";
		FilesystemEventType["WRITE"] = "write";
		return FilesystemEventType;
	}({});
}));
//#endregion
//#region ../../packages/agent-provider/src/common/providers/cloud-agent-provider/cloud-e2b-filesystem.ts
function mapFileType(proto) {
	if (proto === 1 || proto === "FILE_TYPE_FILE") return FileType.FILE;
	if (proto === 2 || proto === "FILE_TYPE_DIR" || proto === "FILE_TYPE_DIRECTORY") return FileType.DIR;
}
function mapTimestamp(ts) {
	if (!ts) return;
	if (typeof ts === "string") return new Date(ts);
	return new Date(Number(ts.seconds) * 1e3 + Math.floor(ts.nanos / 1e6));
}
function mapEntry(e) {
	const type = mapFileType(e.type);
	if (!type) return;
	return {
		name: e.name,
		type,
		path: e.path,
		size: Number(e.size),
		mode: e.mode,
		permissions: e.permissions,
		owner: e.owner,
		group: e.group,
		modifiedTime: mapTimestamp(e.modifiedTime),
		symlinkTarget: e.symlinkTarget
	};
}
var RPC_BASE, DEFAULT_TIMEOUT_MS, CloudE2BFilesystem;
var init_cloud_e2b_filesystem = __esmMin((() => {
	init_types$3();
	RPC_BASE = "/filesystem.Filesystem";
	DEFAULT_TIMEOUT_MS = 3e4;
	CloudE2BFilesystem = class CloudE2BFilesystem {
		constructor(apiUrl, accessToken, customHeaders, timeoutMs) {
			this.apiUrl = apiUrl;
			this.accessToken = accessToken;
			this.customHeaders = customHeaders;
			this.timeoutMs = timeoutMs;
		}
		/**
		* Create a filesystem client from sandbox connection info.
		* No management API call — uses accessToken directly as envd token.
		*/
		static async connect(info) {
			const domain = info.domain || "e2b.dev";
			return new CloudE2BFilesystem(info.apiUrl || `https://49983-${info.sandboxId}.${domain}`, info.accessToken || info.apiKey || "", info.headers || {}, info.requestTimeoutMs || DEFAULT_TIMEOUT_MS);
		}
		/** Set reconnect callback for auto-reconnect on auth failure. */
		setReconnectFn(fn) {
			this.reconnectFn = fn;
		}
		restHeaders() {
			const h = { ...this.customHeaders };
			if (this.accessToken) h["X-Access-Token"] = this.accessToken;
			return h;
		}
		rpcHeaders() {
			return {
				"Content-Type": "application/json",
				"Connect-Protocol-Version": "1",
				...this.restHeaders()
			};
		}
		async handleAuthError(operation) {
			try {
				return await operation();
			} catch (err) {
				if (this.reconnectFn && this.isAuthError(err)) {
					const info = await this.reconnectFn();
					this.updateConnection(info);
					return operation();
				}
				throw err;
			}
		}
		isAuthError(error) {
			if (!error || typeof error !== "object") return false;
			const msg = error.message?.toLowerCase?.() ?? "";
			return msg.includes("401") || msg.includes("403") || msg.includes("unauthorized") || msg.includes("authentication");
		}
		updateConnection(info) {
			const domain = info.domain || "e2b.dev";
			this.apiUrl = info.apiUrl || `https://49983-${info.sandboxId}.${domain}`;
			this.accessToken = info.accessToken || info.apiKey || "";
			this.customHeaders = info.headers || {};
			if (info.requestTimeoutMs) this.timeoutMs = info.requestTimeoutMs;
		}
		async rpc(method, body, timeoutMs) {
			const url = `${this.apiUrl}${RPC_BASE}/${method}`;
			const controller = new AbortController();
			const timer = setTimeout(() => controller.abort(), timeoutMs ?? this.timeoutMs);
			try {
				const resp = await fetch(url, {
					method: "POST",
					headers: this.rpcHeaders(),
					body: JSON.stringify(body),
					signal: controller.signal
				});
				if (!resp.ok) {
					const text = await resp.text().catch(() => "");
					throw new Error(`E2B RPC ${method} failed: ${resp.status} ${text}`);
				}
				return await resp.json();
			} finally {
				clearTimeout(timer);
			}
		}
		async read(path, opts) {
			return this.handleAuthError(async () => {
				const format = opts?.format ?? "text";
				const url = `${this.apiUrl}/files?path=${encodeURIComponent(path)}`;
				const controller = new AbortController();
				const timer = setTimeout(() => controller.abort(), opts?.requestTimeoutMs ?? this.timeoutMs);
				try {
					const resp = await fetch(url, {
						headers: this.restHeaders(),
						signal: controller.signal
					});
					if (!resp.ok) {
						const text = await resp.text().catch(() => "");
						throw new Error(`E2B read failed: ${resp.status} ${text}`);
					}
					switch (format) {
						case "bytes": return new Uint8Array(await resp.arrayBuffer());
						case "blob": return await resp.blob();
						case "stream": return resp.body;
						default: return await resp.text();
					}
				} finally {
					clearTimeout(timer);
				}
			});
		}
		async write(pathOrFiles, dataOrOpts, opts) {
			return this.handleAuthError(async () => {
				if (Array.isArray(pathOrFiles)) {
					const results = [];
					for (const entry of pathOrFiles) {
						const result = await this.writeSingle(entry.path, entry.data, opts);
						results.push(result);
					}
					return results;
				}
				return this.writeSingle(pathOrFiles, dataOrOpts, opts);
			});
		}
		/**
		* 写单个文件。用 multipart/form-data 格式（envd REST 标准写法）。
		*
		* 纯字符串 body 会被浏览器自动加上 `text/plain;charset=UTF-8` Content-Type，
		* envd 的 `/files?path=` POST 接口要求 multipart/form-data，否则返回
		* `500 error parsing multipart form: request Content-Type isn't multipart/form-data`。
		*
		* 实现对齐 `CollabCloudE2BFilesystem.writeSingle`
		* (packages/workbuddy-server/src/project/collab-cloud-e2b-filesystem.ts)，
		* 与项目 tab 走的 fs client 用同一套 multipart 构造逻辑。
		*/
		async writeSingle(path, data, opts) {
			const url = `${this.apiUrl}/files?path=${encodeURIComponent(path)}`;
			if (data instanceof ReadableStream) {
				const controller = new AbortController();
				const timer = setTimeout(() => controller.abort(), opts?.requestTimeoutMs ?? this.timeoutMs);
				try {
					const resp = await fetch(url, {
						method: "POST",
						headers: this.restHeaders(),
						body: data,
						signal: controller.signal
					});
					if (!resp.ok) {
						const text = await resp.text().catch(() => "");
						throw new Error(`E2B write failed: ${resp.status} ${text}`);
					}
					return {
						path,
						type: FileType.FILE
					};
				} finally {
					clearTimeout(timer);
				}
			}
			const encoder = new TextEncoder();
			const boundary = `----CloudE2BBoundary${Date.now()}${Math.random().toString(36).slice(2)}`;
			const fileName = path.split("/").pop() || "file";
			let fileBytes;
			if (typeof data === "string") fileBytes = encoder.encode(data);
			else if (data instanceof ArrayBuffer) fileBytes = new Uint8Array(data);
			else {
				const arrayBuf = await data.arrayBuffer();
				fileBytes = new Uint8Array(arrayBuf);
			}
			const headerStr = `--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="${fileName}"\r\nContent-Type: application/octet-stream\r\n\r\n`;
			const footerStr = `\r\n--${boundary}--\r\n`;
			const parts = [
				encoder.encode(headerStr),
				fileBytes,
				encoder.encode(footerStr)
			];
			const totalLen = parts.reduce((s, p) => s + p.byteLength, 0);
			const body = new Uint8Array(totalLen);
			let offset = 0;
			for (const part of parts) {
				body.set(part, offset);
				offset += part.byteLength;
			}
			const controller = new AbortController();
			const timer = setTimeout(() => controller.abort(), opts?.requestTimeoutMs ?? this.timeoutMs);
			try {
				const resp = await fetch(url, {
					method: "POST",
					headers: {
						...this.restHeaders(),
						"Content-Type": `multipart/form-data; boundary=${boundary}`
					},
					body: body.buffer,
					signal: controller.signal
				});
				if (!resp.ok) {
					const text = await resp.text().catch(() => "");
					throw new Error(`E2B write failed: ${resp.status} ${text}`);
				}
				return {
					path,
					type: FileType.FILE
				};
			} finally {
				clearTimeout(timer);
			}
		}
		async list(path, opts) {
			return this.handleAuthError(async () => {
				const depth = opts?.depth ?? 1;
				const res = await this.rpc("ListDir", {
					path,
					depth
				}, opts?.requestTimeoutMs);
				const entries = [];
				for (const e of res.entries || []) {
					const mapped = mapEntry(e);
					if (mapped) entries.push(mapped);
				}
				return entries;
			});
		}
		async exists(path, opts) {
			try {
				await this.rpc("Stat", { path }, opts?.requestTimeoutMs);
				return true;
			} catch {
				return false;
			}
		}
		async makeDir(path, opts) {
			return this.handleAuthError(async () => {
				await this.rpc("MakeDir", { path }, opts?.requestTimeoutMs);
				return true;
			});
		}
		async remove(path, opts) {
			return this.handleAuthError(async () => {
				await this.rpc("Remove", { path }, opts?.requestTimeoutMs);
			});
		}
		async rename(oldPath, newPath, opts) {
			return this.handleAuthError(async () => {
				const res = await this.rpc("Rename", {
					oldPath,
					newPath
				}, opts?.requestTimeoutMs);
				const entry = res.entry ? mapEntry(res.entry) : void 0;
				if (!entry) throw new Error("Rename returned no entry");
				return entry;
			});
		}
		async getInfo(path, opts) {
			return this.handleAuthError(async () => {
				const res = await this.rpc("Stat", { path }, opts?.requestTimeoutMs);
				const entry = res.entry ? mapEntry(res.entry) : void 0;
				if (!entry) throw new Error("Stat returned no entry");
				return entry;
			});
		}
		async watchDir(path, onEvent, _opts) {
			let stopped = false;
			let lastSnapshot = null;
			const POLL_INTERVAL_MS = 2e3;
			const getMtime = (e) => String(e.modifiedTime ?? e.modifyTime ?? "");
			const poll = async () => {
				{
					const entries = await this.list(path, { depth: 1 });
					lastSnapshot = new Map(entries.map((e) => [e.name, getMtime(e)]));
				}
				while (!stopped) {
					await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
					if (stopped) return;
					let entries;
					try {
						entries = await this.list(path, { depth: 1 });
					} catch (err) {
						console.error("[CloudE2BFilesystem] watchDir poll error:", String(err));
						continue;
					}
					if (stopped) return;
					const current = new Map(entries.map((e) => [e.name, getMtime(e)]));
					const prev = lastSnapshot;
					for (const [name, mtime] of current) {
						const prevMtime = prev.get(name);
						if (!prevMtime) try {
							await onEvent({
								name,
								type: FilesystemEventType.WRITE
							});
						} catch (err) {
							console.error("[CloudE2BFilesystem] watchDir onEvent error:", String(err));
						}
						else if (mtime !== prevMtime) try {
							await onEvent({
								name,
								type: FilesystemEventType.WRITE
							});
						} catch (err) {
							console.error("[CloudE2BFilesystem] watchDir onEvent error:", String(err));
						}
					}
					lastSnapshot = current;
				}
			};
			poll().catch((err) => {
				console.error("[CloudE2BFilesystem] watchDir poll fatal error:", err);
				try {
					_opts?.onExit?.(err instanceof Error ? err : new Error(String(err)));
				} catch (onExitErr) {
					console.error("[CloudE2BFilesystem] watchDir onExit error:", String(onExitErr));
				}
			});
			return { stop: async () => {
				stopped = true;
			} };
		}
	};
}));
//#endregion
//#region ../../packages/agent-provider/src/common/providers/cloud-agent-provider/index.ts
var init_cloud_agent_provider = __esmMin((() => {
	init_cloud_connection();
	init_cloud_provider();
	init_cloud_e2b_filesystem();
	init_cos_upload_service();
}));
//#endregion
//#region ../../packages/agent-provider/src/common/providers/local-agent-provider/acp/json-rpc.ts
var JsonRpcEncoder, RequestIdGenerator;
var init_json_rpc = __esmMin((() => {
	JsonRpcEncoder = class {
		/**
		* 编码请求消息
		* @param id 请求 ID
		* @param method 方法名
		* @param params 参数 (可选)
		* @returns AcpRpcEnvelope 包装的 JSON-RPC 请求
		*/
		static encodeRequest(id, method, params) {
			return {
				type: "acp-rpc",
				payload: {
					jsonrpc: "2.0",
					id,
					method,
					params
				}
			};
		}
		/**
		* 编码通知消息 (无响应)
		* @param method 方法名
		* @param params 参数 (可选)
		* @returns AcpRpcEnvelope 包装的 JSON-RPC 通知
		*/
		static encodeNotification(method, params) {
			return {
				type: "acp-rpc",
				payload: {
					jsonrpc: "2.0",
					method,
					params
				}
			};
		}
		/**
		* 编码成功响应
		* @param id 对应请求的 ID
		* @param result 结果数据
		* @returns AcpRpcEnvelope 包装的 JSON-RPC 响应
		*/
		static encodeSuccessResponse(id, result) {
			return {
				type: "acp-rpc",
				payload: {
					jsonrpc: "2.0",
					id,
					result
				}
			};
		}
		/**
		* 编码错误响应
		* @param id 对应请求的 ID
		* @param error 错误信息
		* @returns AcpRpcEnvelope 包装的 JSON-RPC 错误响应
		*/
		static encodeErrorResponse(id, error) {
			return {
				type: "acp-rpc",
				payload: {
					jsonrpc: "2.0",
					id,
					error
				}
			};
		}
		/**
		* 解码 ACP RPC 消息
		* @param envelope AcpRpcEnvelope
		* @returns 解码后的 JSON-RPC 消息
		* @throws 如果消息格式无效
		*/
		static decode(envelope) {
			if (!this.isAcpRpcMessage(envelope)) throw new Error("Invalid ACP RPC message format");
			const payload = envelope.payload;
			if (typeof payload !== "object" || payload === null) throw new Error("Invalid JSON-RPC payload");
			if (payload.jsonrpc !== "2.0") throw new Error("Invalid JSON-RPC version (must be \"2.0\")");
			const hasId = "id" in payload;
			const hasMethod = typeof payload.method === "string";
			if (!hasId && !hasMethod) throw new Error("Invalid JSON-RPC message (must have id or method)");
			return payload;
		}
		/**
		* 检查是否为 ACP RPC 消息
		* @param message 待检查的消息
		* @returns 是否为有效的 AcpRpcEnvelope
		*/
		static isAcpRpcMessage(message) {
			return typeof message === "object" && message !== null && "type" in message && message.type === "acp-rpc" && "payload" in message;
		}
		/**
		* 检查是否为 JSON-RPC 请求 (有 id 字段)
		* @param message JSON-RPC 消息
		* @returns 是否为请求消息
		*/
		static isRequest(message) {
			return "id" in message && "method" in message;
		}
		/**
		* 检查是否为 JSON-RPC 响应 (有 id 字段，有 result 或 error)
		* @param message JSON-RPC 消息
		* @returns 是否为响应消息
		*/
		static isResponse(message) {
			return "id" in message && ("result" in message || "error" in message);
		}
		/**
		* 检查是否为 JSON-RPC 通知 (无 id 字段)
		* @param message JSON-RPC 消息
		* @returns 是否为通知消息
		*/
		static isNotification(message) {
			return !("id" in message) && "method" in message;
		}
	};
	RequestIdGenerator = class {
		constructor() {
			this.counter = 0;
		}
		/**
		* 生成下一个请求 ID
		* @returns 请求 ID 字符串
		*/
		generate() {
			return `acp_${++this.counter}`;
		}
		/**
		* 重置计数器
		*/
		reset() {
			this.counter = 0;
		}
	};
}));
//#endregion
//#region ../../packages/agent-provider/src/common/providers/local-agent-provider/acp/types.ts
/**
* 检查是否为保留 sessionId
* @param sessionId 会话 ID
* @returns 是否为保留 sessionId
*/
function isReservedSessionId(sessionId) {
	return Object.values(SPECIAL_SESSION_IDS).includes(sessionId) && sessionId !== SPECIAL_SESSION_IDS.BROADCAST;
}
/**
* 检查是否为状态更新消息
* @param notification SessionNotification 对象
* @returns 是否为 state_update 类型
*/
function isStateUpdateNotification(notification) {
	return typeof notification === "object" && notification !== null && notification.sessionUpdate === "state_update" && typeof notification.conversationId === "string" && typeof notification.timestamp === "number";
}
var SPECIAL_SESSION_IDS;
var init_types$2 = __esmMin((() => {
	SPECIAL_SESSION_IDS = {
		GLOBAL: "__global__",
		NEW: "__new__",
		WORKSPACE: "__workspace__",
		BROADCAST: "__broadcast__"
	};
}));
//#endregion
//#region ../../packages/agent-provider/src/common/providers/local-agent-provider/acp/acp-json-rpc-client.ts
var AcpJsonRpcClient;
var init_acp_json_rpc_client = __esmMin((() => {
	init_json_rpc();
	init_types$2();
	AcpJsonRpcClient = class {
		constructor(channel, config = {}) {
			this.requestIdGenerator = new RequestIdGenerator();
			this.pendingRequests = /* @__PURE__ */ new Map();
			this.sessionUpdateCallbacks = /* @__PURE__ */ new Set();
			this.permissionRequestResolvers = /* @__PURE__ */ new Map();
			this.extNotificationCallbacks = /* @__PURE__ */ new Set();
			this.eventHandlers = [];
			this.channel = channel;
			this.debug = true;
			this.setupMessageListener();
			this.log("AcpJsonRpcClient initialized");
		}
		async initialize(request) {
			this.log("initialize called");
			return await this.sendRequest(SPECIAL_SESSION_IDS.GLOBAL, "initialize", request);
		}
		async authenticate(request) {
			this.log("authenticate called");
			await this.sendRequest(SPECIAL_SESSION_IDS.GLOBAL, "authenticate", request);
		}
		async newSession(request) {
			this.log("newSession called");
			return await this.sendRequest(SPECIAL_SESSION_IDS.NEW, "newSession", request);
		}
		async loadSession(request) {
			this.log(`[AcpJsonRpcClient] loadSession called:, ${request.sessionId}`);
			const response = await this.sendRequest(request.sessionId, "loadSession", request);
			this.log(`[AcpJsonRpcClient] loadSession response:, ${response}`);
			return response;
		}
		async prompt(request) {
			this.log("prompt called for session:", request.sessionId);
			return await this.sendRequest(request.sessionId, "prompt", request);
		}
		async cancel(params) {
			this.log("cancel called for session:", params.sessionId);
			const envelope = JsonRpcEncoder.encodeNotification("cancel", params);
			this.send(params.sessionId, envelope);
		}
		async setSessionModel(params) {
			this.log("setSessionModel called for session:", params.sessionId);
			return await this.sendRequest(params.sessionId, "setSessionModel", params);
		}
		async setSessionMode(params) {
			this.log("setSessionMode called for session:", params.sessionId);
			return await this.sendRequest(params.sessionId, "setSessionMode", params);
		}
		async toolCallback(request) {
			this.log("toolCallback called for session:", request.sessionId, "action:", request.action);
			return await this.sendRequest(request.sessionId, "toolCallback", request);
		}
		/**
		* 打开工作区窗口
		* 使用 __workspace__ session ID，由 Main Process 直接处理
		* @param request 打开工作区请求
		* @returns 打开工作区响应
		*/
		async openWorkspace(request) {
			this.log("openWorkspace called", request);
			return await this.sendRequest(SPECIAL_SESSION_IDS.WORKSPACE, "openWorkspace", request);
		}
		/**
		* 发送全局请求
		* 使用 __global__ session ID，会根据 params.cwd 路由到对应窗口
		* cwd 为空时会路由到 Default Window
		* @param method 方法名
		* @param params 请求参数
		* @returns 响应结果
		*/
		async sendBroadcastRequest(method, params) {
			this.log(`sendGlobalRequest called: ${method}`, params);
			return await this.sendRequest(SPECIAL_SESSION_IDS.BROADCAST, method, params);
		}
		/**
		* 获取当前工作区列表
		* 使用 __workspace__ session ID，由 Main Process 直接处理
		* @param request 获取工作区列表请求
		* @returns 获取工作区列表响应
		*/
		async getCurrentWorkspaces(request) {
			this.log("getCurrentWorkspaces called", request);
			return await this.sendRequest(SPECIAL_SESSION_IDS.WORKSPACE, "getCurrentWorkspaces", request ?? {});
		}
		async getConversationMessageQueue(sessionId) {
			this.log("getConversationMessageQueue called for session:", sessionId);
			return await this.sendRequest(sessionId, "getConversationMessageQueue", { sessionId });
		}
		async saveConversationMessageQueue(data) {
			this.log("saveConversationMessageQueue called for session:", data.conversationId);
			await this.sendRequest(data.conversationId, "saveConversationMessageQueue", { data });
		}
		async enqueueConversationMessageQueueItem(sessionId, contentBlocks) {
			this.log("enqueueConversationMessageQueueItem called for session:", sessionId);
			return await this.sendRequest(sessionId, "enqueueConversationMessageQueueItem", {
				sessionId,
				contentBlocks
			});
		}
		async removeConversationMessageQueueItem(sessionId, itemId) {
			this.log("removeConversationMessageQueueItem called for session:", sessionId, itemId);
			return await this.sendRequest(sessionId, "removeConversationMessageQueueItem", {
				sessionId,
				itemId
			});
		}
		async popConversationMessageQueueItemForEdit(sessionId, itemId) {
			this.log("popConversationMessageQueueItemForEdit called for session:", sessionId, itemId);
			return await this.sendRequest(sessionId, "popConversationMessageQueueItemForEdit", {
				sessionId,
				itemId
			});
		}
		async reorderConversationMessageQueueItems(sessionId, orderedIds) {
			this.log("reorderConversationMessageQueueItems called for session:", sessionId);
			return await this.sendRequest(sessionId, "reorderConversationMessageQueueItems", {
				sessionId,
				orderedIds
			});
		}
		async sendConversationMessageQueueItemNow(sessionId, itemId) {
			this.log("sendConversationMessageQueueItemNow called for session:", sessionId, itemId);
			return await this.sendRequest(sessionId, "sendConversationMessageQueueItemNow", {
				sessionId,
				itemId
			});
		}
		async activateConversationMessageQueue(sessionId) {
			this.log("activateConversationMessageQueue called for session:", sessionId);
			return await this.sendRequest(sessionId, "activateConversationMessageQueue", { sessionId });
		}
		async pauseConversationMessageQueue(sessionId, reason) {
			this.log("pauseConversationMessageQueue called for session:", sessionId, reason);
			return await this.sendRequest(sessionId, "pauseConversationMessageQueue", {
				sessionId,
				reason
			});
		}
		async resumeConversationMessageQueue(sessionId) {
			this.log("resumeConversationMessageQueue called for session:", sessionId);
			return await this.sendRequest(sessionId, "resumeConversationMessageQueue", { sessionId });
		}
		async cancelQueueByConversation(conversationId) {
			this.log("cancelQueueByConversation called:", conversationId);
			await this.sendBroadcastRequest("cancelQueueByConversation", { conversationId });
		}
		async getQueueState(conversationId) {
			this.log("getQueueState called:", conversationId);
			return this.sendBroadcastRequest("getQueueState", { conversationId });
		}
		/**
		* 获取已安装插件列表
		* 使用 __broadcast__ session ID，由 Extension Host 处理
		* @param request 获取插件请求
		* @returns 已安装插件列表响应
		*/
		async getInstalledPlugins(request) {
			this.log("getInstalledPlugins called", request);
			return await this.sendRequest(SPECIAL_SESSION_IDS.BROADCAST, "getInstalledPlugins", request ?? {});
		}
		/**
		* 安装插件
		* 使用 __broadcast__ session ID，由 Extension Host 处理
		* @param request 安装插件请求
		* @returns 安装结果
		*/
		async installPlugins(request) {
			this.log("installPlugins called", request);
			return await this.sendRequest(SPECIAL_SESSION_IDS.BROADCAST, "installPlugins", request);
		}
		/**
		* 卸载插件
		* 使用 __broadcast__ session ID，由 Extension Host 处理
		* @param request 卸载插件请求
		* @returns 卸载结果
		*/
		async uninstallPlugin(request) {
			this.log("uninstallPlugin called", request);
			return await this.sendRequest(SPECIAL_SESSION_IDS.BROADCAST, "uninstallPlugin", request);
		}
		/**
		* 更新插件到最新版本
		* 使用 __broadcast__ session ID，由 Extension Host 处理
		* @param request 更新插件请求
		* @returns 更新结果
		*/
		async updatePlugin(request) {
			this.log("updatePlugin called", request);
			return await this.sendRequest(SPECIAL_SESSION_IDS.BROADCAST, "updatePlugin", request);
		}
		/**
		* 批量切换插件状态
		* 使用 __broadcast__ session ID，由 Extension Host 处理
		* @param request 批量切换插件请求
		* @returns 批量操作结果
		*/
		async batchTogglePlugins(request) {
			this.log("batchTogglePlugins called", request);
			return await this.sendRequest(SPECIAL_SESSION_IDS.BROADCAST, "batchTogglePlugins", request);
		}
		/**
		* 获取插件市场列表
		* 使用 __broadcast__ session ID，由 Extension Host 处理
		* @param request 获取市场列表请求
		* @returns 插件市场列表响应
		*/
		async getPluginMarketplaces(request) {
			this.log("getPluginMarketplaces called", request);
			return await this.sendRequest(SPECIAL_SESSION_IDS.BROADCAST, "getPluginMarketplaces", request ?? {});
		}
		/**
		* 获取市场下的插件列表
		* 使用 __broadcast__ session ID，由 Extension Host 处理
		* @param request 获取市场插件请求
		* @returns 市场插件列表响应
		*/
		async getMarketplacePlugins(request) {
			this.log("getMarketplacePlugins called", request);
			return await this.sendRequest(SPECIAL_SESSION_IDS.BROADCAST, "getMarketplacePlugins", request);
		}
		/**
		* 获取插件详情
		* 使用 __broadcast__ session ID，由 Extension Host 处理
		* @param request 获取插件详情请求
		* @returns 插件详情响应
		*/
		async getPluginDetail(request) {
			this.log("getPluginDetail called", request);
			return await this.sendRequest(SPECIAL_SESSION_IDS.BROADCAST, "getPluginDetail", request);
		}
		/**
		* 添加插件市场
		* 使用 __broadcast__ session ID，由 Extension Host 处理
		* @param request 添加市场请求
		* @returns 添加结果
		*/
		async addPluginMarketplace(request) {
			this.log("addPluginMarketplace called", request);
			return await this.sendRequest(SPECIAL_SESSION_IDS.BROADCAST, "addPluginMarketplace", request);
		}
		/**
		* 删除插件市场
		* 使用 __broadcast__ session ID，由 Extension Host 处理
		* @param request 删除市场请求
		* @returns 删除结果
		*/
		async removePluginMarketplace(request) {
			this.log("removePluginMarketplace called", request);
			return await this.sendRequest(SPECIAL_SESSION_IDS.BROADCAST, "removePluginMarketplace", request);
		}
		/**
		* 刷新插件市场
		* 使用 __broadcast__ session ID，由 Extension Host 处理
		* @param request 刷新市场请求
		* @returns 刷新结果
		*/
		async refreshPluginMarketplace(request) {
			this.log("refreshPluginMarketplace called", request);
			return await this.sendRequest(SPECIAL_SESSION_IDS.BROADCAST, "refreshPluginMarketplace", request);
		}
		/**
		* 用新窗口打开文件夹
		* 使用 __broadcast__ session ID，由 Extension Host 处理
		*
		* @param request 打开文件夹请求
		*/
		async openFolderInNewWindow(request) {
			this.log("openFolderInNewWindow called", request);
			await this.sendRequest(SPECIAL_SESSION_IDS.BROADCAST, "openFolderInNewWindow", request);
		}
		/**
		* 获取支持的场景列表（从后端 API）
		* 使用 __broadcast__ session ID，由 Extension Host 处理
		* 用于 Welcome 页面的 QuickActions 快捷操作
		*
		* 调用链：
		* 1. AgentNewAdapter.getTemplates() 调用此方法
		* 2. 通过 ACP 协议发送请求到 Extension Host
		* 3. Extension Host 调用 RestOperations -> GET /v2/as/support/scenes
		* 4. 返回 SupportSceneInfo[] 数据
		*
		* @param request 获取支持场景请求
		* @returns 支持的场景列表响应
		*/
		async getSupportScenes(request) {
			this.log("getSupportScenes called", request);
			return await this.sendRequest(SPECIAL_SESSION_IDS.BROADCAST, "getSupportScenes", request ?? {});
		}
		getAutomationBridge() {
			return globalThis.__codebuddyAutomationBridge;
		}
		requireAutomationBridge() {
			const bridge = this.getAutomationBridge();
			if (!bridge) throw new Error("Automation bridge is unavailable; automation now only supports the Main/Renderer orchestration path");
			return bridge;
		}
		async getAutomationSnapshot() {
			this.log("getAutomationSnapshot called");
			const bridge = this.requireAutomationBridge();
			if (!bridge.getAutomationSnapshot) throw new Error("Automation bridge does not implement getAutomationSnapshot");
			return await bridge.getAutomationSnapshot();
		}
		async updateAutomation(request) {
			this.log("updateAutomation called", request);
			const bridge = this.requireAutomationBridge();
			if (!bridge.updateAutomation) throw new Error("Automation bridge does not implement updateAutomation");
			return await bridge.updateAutomation(request);
		}
		async deleteAutomation(request) {
			this.log("deleteAutomation called", request);
			const bridge = this.requireAutomationBridge();
			if (!bridge.deleteAutomation) throw new Error("Automation bridge does not implement deleteAutomation");
			return await bridge.deleteAutomation(request.id);
		}
		async archiveAutomationInboxItem(request) {
			this.log("archiveAutomationInboxItem called", request);
			const bridge = this.requireAutomationBridge();
			if (!bridge.archiveAutomationInboxItem) throw new Error("Automation bridge does not implement archiveAutomationInboxItem");
			return await bridge.archiveAutomationInboxItem(request.itemId);
		}
		async deleteAutomationInboxItem(request) {
			this.log("deleteAutomationInboxItem called", request);
			const bridge = this.requireAutomationBridge();
			if (!bridge.deleteAutomationInboxItem) throw new Error("Automation bridge does not implement deleteAutomationInboxItem");
			return await bridge.deleteAutomationInboxItem(request.itemId);
		}
		async testAutomation(request) {
			this.log("testAutomation called", request);
			const bridge = this.requireAutomationBridge();
			if (!bridge.testAutomation) throw new Error("Automation bridge does not implement testAutomation");
			return await bridge.testAutomation(request.id);
		}
		onSessionUpdate(callback) {
			this.sessionUpdateCallbacks.add(callback);
			this.log("onSessionUpdate: callback registered");
			return () => {
				this.sessionUpdateCallbacks.delete(callback);
				this.log("onSessionUpdate: callback unregistered");
			};
		}
		onRequestPermission(sessionId, callback) {
			this.permissionRequestResolvers.set(sessionId, callback);
			this.log("onRequestPermission: callback registered");
			return () => {
				this.permissionRequestResolvers.delete(sessionId);
				this.log("onRequestPermission: callback unregistered");
			};
		}
		/**
		* 监听 extNotification 推送
		* 用于接收 artifact 等扩展通知
		*/
		onExtNotification(callback) {
			this.extNotificationCallbacks.add(callback);
			this.log("onExtNotification: callback registered");
			return () => {
				this.extNotificationCallbacks.delete(callback);
				this.log("onExtNotification: callback unregistered");
			};
		}
		destroy() {
			this.log("Destroying AcpJsonRpcClient");
			this.eventHandlers.forEach(({ event, handler }) => {
				this.channel.off(event, handler);
			});
			this.eventHandlers.length = 0;
			this.pendingRequests.forEach(({ reject }) => {
				reject(/* @__PURE__ */ new Error("Client destroyed"));
			});
			this.pendingRequests.clear();
			this.sessionUpdateCallbacks.clear();
			this.permissionRequestResolvers.clear();
		}
		/**
		* 发送 JSON-RPC 请求并等待响应
		* @param sessionId 会话 ID
		* @param method 方法名
		* @param params 参数
		* @returns Promise<T> 响应结果
		*/
		async sendRequest(sessionId, method, params) {
			const id = this.requestIdGenerator.generate();
			const envelope = JsonRpcEncoder.encodeRequest(id, method, {
				sessionId: isReservedSessionId(sessionId) ? void 0 : sessionId,
				...params ?? {}
			});
			return new Promise(async (resolve, reject) => {
				this.pendingRequests.set(id, {
					resolve,
					reject,
					method,
					sessionId
				});
				if (!await this.send(sessionId, envelope)) {
					this.pendingRequests.delete(id);
					reject(/* @__PURE__ */ new Error(`Failed to send ${method} request for session: ${sessionId}`));
				}
				this.log(`Request sent: ${method} (id: ${id}, session: ${sessionId})`);
			});
		}
		/**
		* 发送消息到指定 session
		* @param sessionId 会话 ID
		* @param envelope ACP RPC 消息包装
		* @returns 是否发送成功
		*/
		send(sessionId, envelope) {
			return this.channel.sendNotification(sessionId, envelope);
		}
		/**
		* 设置消息监听器
		* 处理来自 ExtensionHost 的 JSON-RPC 响应和推送
		*/
		setupMessageListener() {
			const responseHandler = (data) => {
				if (!JsonRpcEncoder.isAcpRpcMessage(data)) return;
				try {
					const message = JsonRpcEncoder.decode(data);
					if (JsonRpcEncoder.isResponse(message)) this.handleResponse(message);
					else if (JsonRpcEncoder.isNotification(message)) this.handleNotification(message);
					else if (JsonRpcEncoder.isRequest(message)) this.handleNotification(message);
				} catch (error) {
					this.log("Error handling message:", error);
				}
			};
			this.channel.on("acp-rpc-response", responseHandler);
			this.eventHandlers.push({
				event: "acp-rpc-response",
				handler: responseHandler
			});
			this.channel.on("message", responseHandler);
			this.eventHandlers.push({
				event: "message",
				handler: responseHandler
			});
			this.log("Message listener setup complete");
		}
		/**
		* 处理 JSON-RPC 响应
		*/
		handleResponse(response) {
			const pending = this.pendingRequests.get(response.id);
			if (!pending) {
				this.log(`No pending request found for response id: ${response.id}`);
				return;
			}
			this.pendingRequests.delete(response.id);
			if (response.error) {
				const error = new Error(response.error.message);
				error.code = response.error.code;
				if (response.error.data !== void 0) error.data = response.error.data;
				pending.reject(error);
			} else pending.resolve(response.result);
			this.log(`Response received for request: ${pending.method} (id: ${response.id})`);
		}
		/**
		* 处理 JSON-RPC 推送消息
		*/
		handleNotification(notification) {
			const method = notification.method;
			let params = notification.params;
			if (notification.id) params = {
				...params,
				requestId: notification.id
			};
			this.log(`Notification received: ${method}`);
			switch (method) {
				case "session/update":
				case "sessionUpdate":
					this.handleSessionUpdate(params);
					break;
				case "request/permission":
				case "requestPermission":
					this.handlePermissionRequest(params);
					break;
				case "extNotification":
					this.handleExtNotification(params);
					break;
				default: this.log(`Unknown notification method: ${method}`);
			}
		}
		/**
		* 处理 extNotification 推送
		*/
		handleExtNotification(params) {
			if (!params) {
				this.log("extNotification missing params");
				return;
			}
			const method = params.method;
			const extParams = params.params || {};
			this.log("handleExtNotification:", {
				method,
				extParams
			});
			this.extNotificationCallbacks.forEach((callback) => {
				try {
					callback(method, extParams);
				} catch (error) {
					this.log("extNotification callback error:", error);
				}
			});
		}
		/**
		* 处理会话更新推送
		*
		* 支持 ACP 协议定义的多种 session update 类型：
		* - available_commands_update: 可用命令列表更新
		* - 其他类型: 原样转发给调用方
		*/
		handleSessionUpdate(params) {
			if (!params) {
				this.log("Session update notification missing params");
				return;
			}
			const sessionId = params.sessionId;
			const messageId = params.messageId;
			if (!sessionId) {
				this.log("Invalid session update params:", params);
				return;
			}
			const update = params.update;
			if (update?.sessionUpdate === "available_commands_update") {
				this.log(`Available commands update received for session: ${sessionId}`);
				const rawCommands = update?.availableCommands;
				if (Array.isArray(rawCommands)) {
					const commands = rawCommands.filter((cmd) => cmd !== null && typeof cmd === "object" && typeof cmd.name === "string").map((cmd) => ({
						name: String(cmd.name),
						description: typeof cmd.description === "string" ? cmd.description : "",
						input: cmd.input && typeof cmd.input === "object" ? { hint: typeof cmd.input.hint === "string" ? cmd.input.hint : void 0 } : void 0
					}));
					this.log(`Parsed ${commands.length} available commands`);
				} else this.log("Invalid availableCommands format in available_commands_update");
			}
			const sessionUpdateParams = {
				notification: params,
				...messageId && { messageId }
			};
			if (this.sessionUpdateCallbacks.size === 0) this.log(`handleSessionUpdate: no callbacks registered (expected for sharedAcpClient), type=${update?.sessionUpdate}, sessionId=${sessionId?.substring(0, 8)}`);
			this.sessionUpdateCallbacks.forEach((callback) => {
				try {
					callback(sessionUpdateParams);
				} catch (error) {
					this.log("Session update callback error:", error);
				}
			});
		}
		/**
		* 处理权限请求推送
		*/
		async handlePermissionRequest(params) {
			if (!params) {
				this.log("Permission request notification missing params");
				return;
			}
			const sessionId = params.sessionId;
			const requestId = params.requestId;
			const toolCall = params.toolCall;
			const options = params.options;
			if (!sessionId || !requestId || !toolCall) {
				this.log("Invalid permission request params:", params);
				return;
			}
			const permissionParams = {
				sessionId,
				requestId,
				toolCall,
				options
			};
			const resolver = this.permissionRequestResolvers.get(sessionId);
			if (!resolver) {
				this.log("No permission resolver registered, cancelling...");
				return;
			}
			try {
				const outcome = await resolver(permissionParams);
				this.sendPermissionResponse(sessionId, requestId, outcome);
			} catch (error) {
				this.log("Permission resolver error:", error);
				this.sendPermissionResponse(sessionId, requestId, { outcome: "cancelled" });
			}
		}
		/**
		* 发送权限响应
		*/
		sendPermissionResponse(sessionId, requestId, outcome) {
			const envelope = JsonRpcEncoder.encodeSuccessResponse(requestId, outcome);
			this.send(sessionId, envelope);
			this.log("Permission response sent for request:", requestId);
		}
		/**
		* 调试日志
		*/
		log(...args) {
			if (this.debug) console.log("[AcpJsonRpcClient]", ...args);
		}
	};
}));
//#endregion
//#region ../../packages/agent-provider/src/common/providers/local-agent-provider/acp/index.ts
var init_acp = __esmMin((() => {
	init_json_rpc();
	init_types$2();
	init_acp_json_rpc_client();
}));
//#endregion
//#region ../../packages/agent-provider/src/common/providers/local-agent-provider/local-connection.ts
var LocalAgentConnection;
var init_local_connection = __esmMin((() => {
	init_common$1();
	init_acp();
	LocalAgentConnection = class {
		constructor(agentId, config) {
			this.listeners = /* @__PURE__ */ new Map();
			this.onceListeners = /* @__PURE__ */ new Map();
			this._state = "disconnected";
			this._isInitialized = false;
			this.pendingPermissions = /* @__PURE__ */ new Map();
			this.artifactCache = /* @__PURE__ */ new Map();
			this.transport = "local";
			this.onRequest = void 0;
			this.agentId = agentId;
			this.cwd = agentId;
			this.debug = config.debug ?? false;
			this.permissionTimeout = config.permissionTimeout ?? 3e4;
			this.permissionAutoRejectOnTimeout = config.permissionAutoRejectOnTimeout ?? false;
			this.acpClient = new AcpJsonRpcClient(config.channel, {
				timeoutMs: config.acpConfig?.timeoutMs ?? 3e4,
				debug: this.debug
			});
			this.setupEventForwarding();
			this.log("LocalAgentConnection initialized");
		}
		setupEventForwarding() {
			this.acpClient.onSessionUpdate((params) => {
				this.emit("sessionUpdate", params.notification);
			});
			this.acpClient.onExtNotification((method, params) => {
				console.log("[LocalConnection] Received extNotification:", {
					method,
					paramsKeys: Object.keys(params)
				});
				if (method === "_codebuddy.ai/artifact") {
					const event = params.event;
					const artifact = params.artifact;
					const notificationSessionId = params.sessionId;
					if (artifact?.uri) {
						if (event === "created" || event === "updated") this.artifactCache.set(artifact.uri, artifact);
						else if (event === "deleted") this.artifactCache.delete(artifact.uri);
					}
					if (artifact && notificationSessionId) artifact.__sessionId = notificationSessionId;
					if (event === "created") this.emit("artifactCreated", artifact);
					else if (event === "updated") this.emit("artifactUpdated", artifact);
					else if (event === "deleted") this.emit("artifactDeleted", artifact);
				}
				if (method === "_codebuddy.ai/checkpoint") {
					const event = params.event;
					const checkpoint = params.checkpoint;
					const checkpointSessionId = params.sessionId;
					console.log("[LocalConnection] Emitting checkpoint event:", {
						event,
						checkpointId: checkpoint?.id,
						checkpointSessionId,
						filesCount: checkpoint?.fileChanges?.files?.length ?? 0
					});
					if (checkpoint && checkpointSessionId) checkpoint.__sessionId = checkpointSessionId;
					if (event === "created") this.emit("checkpointCreated", checkpoint);
					else if (event === "updated") this.emit("checkpointUpdated", checkpoint);
				}
				if (method === ExtensionMethod.COMMAND) {
					const action = params.action;
					const commandParams = params.params;
					const commandSessionId = params.sessionId;
					console.log("[LocalConnection] Emitting command event:", {
						action,
						commandSessionId,
						paramsKeys: commandParams ? Object.keys(commandParams) : []
					});
					const commandData = {
						action,
						params: commandParams
					};
					if (commandSessionId) commandData.__sessionId = commandSessionId;
					this.emit("command", commandData);
				}
			});
			this.log("Event forwarding setup complete");
		}
		on(event, listener) {
			if (!this.listeners.has(event)) this.listeners.set(event, /* @__PURE__ */ new Set());
			this.listeners.get(event).add(listener);
			return this;
		}
		off(event, listener) {
			const eventListeners = this.listeners.get(event);
			if (eventListeners) eventListeners.delete(listener);
			const onceEventListeners = this.onceListeners.get(event);
			if (onceEventListeners) onceEventListeners.delete(listener);
			return this;
		}
		once(event, listener) {
			if (!this.onceListeners.has(event)) this.onceListeners.set(event, /* @__PURE__ */ new Set());
			this.onceListeners.get(event).add(listener);
			return this;
		}
		emit(event, data) {
			const regularListeners = this.listeners.get(event);
			const onceEventListeners = this.onceListeners.get(event);
			if (event === "sessionUpdate") {
				const updateType = data?.update?.sessionUpdate;
				const notifSessionId = data?.sessionId;
				if ((regularListeners?.size ?? 0) + (onceEventListeners?.size ?? 0) === 0) console.warn(`[RT-DEBUG][LocalConn] emit sessionUpdate NO LISTENERS: type=${updateType}, sessionId=${notifSessionId?.substring(0, 8)}, cwd=${this.cwd?.substring(this.cwd.length - 20)}`);
			}
			let hasListeners = false;
			if (regularListeners && regularListeners.size > 0) {
				hasListeners = true;
				for (const listener of regularListeners) try {
					const result = listener(data);
					if (result instanceof Promise) result.catch((err) => {
						console.error(`Error in async event listener for '${String(event)}':`, err);
					});
				} catch (err) {
					console.error(`Error in event listener for '${String(event)}':`, err);
				}
			}
			if (onceEventListeners && onceEventListeners.size > 0) {
				hasListeners = true;
				const listenersToCall = Array.from(onceEventListeners);
				this.onceListeners.delete(event);
				for (const listener of listenersToCall) try {
					const result = listener(data);
					if (result instanceof Promise) result.catch((err) => {
						console.error(`Error in async once event listener for '${String(event)}':`, err);
					});
				} catch (err) {
					console.error(`Error in once event listener for '${String(event)}':`, err);
				}
			}
			return hasListeners;
		}
		removeAllListeners(event) {
			if (event !== void 0) {
				this.listeners.delete(event);
				this.onceListeners.delete(event);
			} else {
				this.listeners.clear();
				this.onceListeners.clear();
			}
			return this;
		}
		get state() {
			return this._state;
		}
		get isInitialized() {
			return this._isInitialized;
		}
		get capabilities() {
			return this._capabilities;
		}
		get initializeResult() {
			return this._initializeResult;
		}
		async connect(_clientCapabilities) {
			this.log("Connecting...");
			this._state = "connecting";
			this.emit("connecting", void 0);
			this._isInitialized = true;
			this._initializeResult = { protocolVersion: 1 };
			this.emit("connected", void 0);
			this._state = "initialized";
			return this._initializeResult;
		}
		disconnect() {
			this.log("Disconnecting...");
			this.cleanupPendingPermissionsOnDisconnect();
			this._state = "disconnected";
			this._isInitialized = false;
			this.acpClient.destroy();
			this.emit("disconnected", void 0);
			this.log("Disconnected");
		}
		/**
		* 清理断开连接时所有待处理的权限请求
		* 在连接断开时主动清理所有 pending 权限请求并返回 cancelled
		*/
		cleanupPendingPermissionsOnDisconnect() {
			const count = this.pendingPermissions.size;
			if (count === 0) return;
			for (const [requestId] of this.pendingPermissions) {
				const resolver = this[`_permissionResolver_${requestId}`];
				if (resolver) {
					resolver({ outcome: "cancelled" });
					delete this[`_permissionResolver_${requestId}`];
				}
			}
			this.pendingPermissions.clear();
			this.log(`Cleaned up ${count} pending permission request(s) on disconnect`);
		}
		async createSession(params) {
			this.log("Creating session with cwd:", params.cwd, params._meta);
			const response = await this.acpClient.newSession({
				_meta: params._meta,
				cwd: params.cwd,
				mcpServers: params.mcpServers ?? []
			});
			this.bindPermissionRequest(response.sessionId);
			return response;
		}
		async loadSession(params) {
			if (!params.sessionId) throw new Error("sessionId is required for loadSession");
			this.log(`[LocalAgentConnection] loadSession: ${params.sessionId}`);
			const response = await this.acpClient.loadSession({
				sessionId: params.sessionId,
				cwd: params.cwd,
				mcpServers: params.mcpServers ?? []
			});
			this.log(`[LocalAgentConnection] loadSession response:${response}`);
			this.bindPermissionRequest(params.sessionId);
			return response;
		}
		async bindPermissionRequest(sessionId) {
			if (this.onRequest) this.onRequest();
			this.onRequest = this.acpClient.onRequestPermission(sessionId, async (params) => {
				this.pendingPermissions.set(params.requestId, {
					params,
					createdAt: Date.now()
				});
				const permissionRequest = {
					sessionId: params.sessionId,
					toolCall: params.toolCall,
					options: params.options
				};
				this.emit("permissionRequest", {
					requestId: params.requestId,
					params: permissionRequest
				});
				return new Promise((resolve) => {
					const checkResolution = () => {
						if (!this.pendingPermissions.has(params.requestId)) return;
						const pending = this.pendingPermissions.get(params.requestId);
						if (pending && Date.now() - pending.createdAt > this.permissionTimeout) {
							this.pendingPermissions.delete(params.requestId);
							this.emit("permissionTimeout", { requestId: params.requestId });
							if (this.permissionAutoRejectOnTimeout) resolve({ outcome: "cancelled" });
						}
					};
					this[`_permissionResolver_${params.requestId}`] = resolve;
					setTimeout(checkResolution, this.permissionTimeout);
				});
			});
		}
		async setSessionMode(sessionId, modeId) {
			this.log("Setting session mode:", sessionId, "to", modeId);
			return await this.acpClient.setSessionMode({
				sessionId,
				modeId
			});
		}
		async setSessionModel(sessionId, modelId) {
			this.log("Setting session model:", sessionId, "to", modelId);
			return await this.acpClient.setSessionModel({
				sessionId,
				modelId
			});
		}
		/**
		* 打开工作区窗口
		* 使用 __workspace__ session ID，由 Main Process 直接处理，不转发到 ExtensionHost
		* @param params 打开工作区请求参数
		* @returns 打开工作区响应
		*/
		async openWorkspace(params) {
			this.log("Opening workspace:", params.cwd);
			return await this.acpClient.openWorkspace(params);
		}
		async prompt(sessionId, params) {
			const prompt = typeof params.content === "string" ? [{
				type: "text",
				text: params.content
			}] : params.content;
			this.log("Sending prompt to session:", sessionId);
			return await this.acpClient.prompt({
				sessionId,
				prompt,
				_meta: {
					...params._meta,
					planMode: params.planMode
				}
			});
		}
		async *promptStream(_sessionId, _params) {
			throw new Error("promptStream not implemented for Local connection");
		}
		async cancel(sessionId) {
			this.log("Cancelling session:", sessionId);
			await this.acpClient.cancel({ sessionId });
		}
		getArtifacts() {
			return new Map(this.artifactCache);
		}
		getArtifact(uri) {
			return this.artifactCache.get(uri);
		}
		getArtifactsByType(type) {
			return Array.from(this.artifactCache.values()).filter((artifact) => artifact.type === type);
		}
		async fetchArtifactContent(_artifact) {
			throw new Error("fetchArtifactContent not implemented for Local connection");
		}
		async fetchArtifactContentById(_id) {
			throw new Error("fetchArtifactContentById not implemented for Local connection");
		}
		resolvePermission(requestId, optionId) {
			const resolver = this[`_permissionResolver_${requestId}`];
			if (resolver) {
				this.pendingPermissions.delete(requestId);
				delete this[`_permissionResolver_${requestId}`];
				resolver({
					outcome: "selected",
					optionId
				});
				this.emit("permissionResolved", {
					requestId,
					optionId
				});
				return true;
			}
			return false;
		}
		rejectPermission(requestId, reason) {
			const resolver = this[`_permissionResolver_${requestId}`];
			if (resolver) {
				this.pendingPermissions.delete(requestId);
				delete this[`_permissionResolver_${requestId}`];
				resolver({ outcome: "cancelled" });
				this.emit("permissionRejected", {
					requestId,
					reason
				});
				return true;
			}
			return false;
		}
		getPendingPermissions() {
			const result = /* @__PURE__ */ new Map();
			for (const [requestId, pending] of this.pendingPermissions) result.set(requestId, {
				params: {
					sessionId: pending.params.sessionId,
					toolCall: pending.params.toolCall,
					options: pending.params.options
				},
				createdAt: pending.createdAt
			});
			return result;
		}
		hasPendingPermissions() {
			return this.pendingPermissions.size > 0;
		}
		answerQuestion(_toolCallId, _answers) {
			return false;
		}
		/**
		* 工具回调操作
		* 用于对正在执行的工具进行 approve / skip / cancel 操作
		* @param sessionId 会话 ID
		* @param toolCallId 工具调用 ID
		* @param toolName 工具名称
		* @param action 操作类型 ('approve' | 'skip' | 'cancel')
		* @returns 工具回调响应
		*/
		async toolCallback(sessionId, toolCallId, toolName, action) {
			this.log("toolCallback called for session:", sessionId, "action:", action);
			const request = {
				sessionId,
				toolCallId,
				toolName,
				action
			};
			return await this.acpClient.toolCallback(request);
		}
		cancelQuestion(_toolCallId, _reason) {
			return false;
		}
		getPendingQuestions() {
			return /* @__PURE__ */ new Map();
		}
		hasPendingQuestions() {
			return false;
		}
		async reportTelemetry(eventName, payload) {
			try {
				await this.acpClient.sendRequest(this.agentId, "reportTelemetry", {
					eventName,
					payload
				});
			} catch (error) {
				console.warn("[LocalAgentConnection] reportTelemetry failed:", error);
			}
		}
		/**
		* 调用 CLI 端 session/rollback ext method 执行原子回退。
		* 直接发送 'session/rollback' JSON-RPC 请求到 CLI；CLI 的 ACP SDK
		* 将未知方法名路由到 AcpAgentImpl.extMethod(method, params)。
		* @see issue #50495 / docs/plans/2026-06-20-resend-edit-unified-plan.md Phase 2
		*/
		async rollback(request) {
			this.log("Rollback called for session:", request.sessionId);
			try {
				return await this.acpClient.sendRequest(request.sessionId, "_codebuddy.ai/session/rollback", request);
			} catch (err) {
				console.error("[LocalAgentConnection] rollback failed:", err);
				return {
					applied: false,
					error: String(err)
				};
			}
		}
		async extMethod(_method, _params) {
			throw new Error("extMethod not implemented for Local connection");
		}
		async extNotification(_method, _params) {
			throw new Error("extNotification not implemented for Local connection");
		}
		async readFile(_path) {
			throw new Error("readFile not implemented for Local connection");
		}
		async listDir(_path) {
			throw new Error("listDir not implemented for Local connection");
		}
		async fileExists(_path) {
			throw new Error("fileExists not implemented for Local connection");
		}
		async fileStat(_path) {
			throw new Error("fileStat not implemented for Local connection");
		}
		log(...args) {
			console.log("[LocalAgentConnection]", ...args);
		}
	};
}));
//#endregion
//#region ../../packages/agent-provider/src/common/providers/cloud-agent-provider/api-types.ts
var WORKING_FAMILY_STATUSES, WORKING_QUERY_STATUSES, isWorkingFamilyStatus;
var init_api_types = __esmMin((() => {
	WORKING_FAMILY_STATUSES = [
		"working",
		"planning",
		"running",
		"connecting"
	];
	WORKING_QUERY_STATUSES = ["working", "planning"];
	isWorkingFamilyStatus = (status) => WORKING_FAMILY_STATUSES.includes((status ?? "").trim().toLowerCase());
}));
//#endregion
//#region ../../packages/agent-provider/src/common/providers/local-agent-provider/local-filesystem.ts
var FILESYSTEM_METHODS, watchIdCounter, LocalFilesystem;
var init_local_filesystem = __esmMin((() => {
	FILESYSTEM_METHODS = {
		READ: "fs/read",
		WRITE: "fs/write",
		LIST: "fs/list",
		EXISTS: "fs/exists",
		MAKE_DIR: "fs/makeDir",
		REMOVE: "fs/remove",
		RENAME: "fs/rename",
		GET_INFO: "fs/getInfo",
		WATCH_DIR: "fs/watchDir",
		UNWATCH: "fs/unwatch"
	};
	watchIdCounter = 0;
	LocalFilesystem = class {
		constructor(client, sessionId, options) {
			this.watchCallbacks = /* @__PURE__ */ new Map();
			this.client = client;
			this.sessionId = sessionId;
			this.debug = options?.debug ?? false;
			this.setupEventListener();
		}
		/**
		* 设置 filesystem 事件监听（用于 watchDir）
		*/
		setupEventListener() {
			const dispose = this.client.onExtNotification((method, params) => {
				if (method !== "fs-event") return;
				const data = params;
				if (data?.watchId) {
					const callback = this.watchCallbacks.get(data.watchId);
					if (callback) callback({
						type: data.eventType,
						name: data.name,
						path: data.path
					});
				}
			});
			this.eventCleanup = () => dispose?.();
		}
		/**
		* 发送 filesystem 请求到 ExtensionHost
		*/
		async sendRequest(method, params) {
			console.log(`[LocalFilesystem] sendRequest: ${method}`, params);
			try {
				const result = await this.client.sendRequest(this.sessionId, method, params);
				if (result && typeof result === "object") {
					if ("error" in result && result.error) throw new Error(result.error);
					if ("data" in result) return result.data;
				}
				return result;
			} catch (error) {
				console.error("[LocalFilesystem] error:", error);
				throw error;
			}
		}
		async read(path, opts) {
			const format = opts?.format ?? "text";
			if (format === "text") return this.sendRequest(FILESYSTEM_METHODS.READ, {
				path,
				opts,
				format: "text"
			});
			const base64Data = await this.sendRequest(FILESYSTEM_METHODS.READ, {
				path,
				opts,
				format: "bytes"
			});
			const binaryString = atob(base64Data);
			const bytes = new Uint8Array(binaryString.length);
			for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
			if (format === "bytes") return bytes;
			else if (format === "blob") return new Blob([bytes]);
			else return new ReadableStream({ start(controller) {
				controller.enqueue(bytes);
				controller.close();
			} });
		}
		async write(pathOrFiles, dataOrOpts, opts) {
			console.log("[LocalFilesystem] write() called:", {
				sessionId: this.sessionId,
				isArray: Array.isArray(pathOrFiles),
				pathOrFiles: Array.isArray(pathOrFiles) ? `${pathOrFiles.length} files` : pathOrFiles
			});
			if (Array.isArray(pathOrFiles)) {
				const files = await Promise.all(pathOrFiles.map(async (entry) => ({
					path: entry.path,
					data: await this.convertDataToString(entry.data)
				})));
				return this.sendRequest(FILESYSTEM_METHODS.WRITE, {
					path: "",
					files,
					opts: dataOrOpts
				});
			} else {
				const dataStr = await this.convertDataToString(dataOrOpts);
				return this.sendRequest(FILESYSTEM_METHODS.WRITE, {
					path: pathOrFiles,
					data: dataStr,
					opts
				});
			}
		}
		/**
		* 将数据转换为字符串（用于传输）
		*/
		async convertDataToString(data) {
			if (typeof data === "string") return data;
			else if (data instanceof ArrayBuffer) return this.arrayBufferToBase64(data);
			else if (data instanceof Blob) return this.blobToBase64(data);
			else if (data && typeof data.getReader === "function") {
				const reader = data.getReader();
				const chunks = [];
				let done = false;
				while (!done) {
					const result = await reader.read();
					done = result.done;
					if (result.value) chunks.push(result.value);
				}
				const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
				const combined = new Uint8Array(totalLength);
				let offset = 0;
				for (const chunk of chunks) {
					combined.set(chunk, offset);
					offset += chunk.length;
				}
				return this.arrayBufferToBase64(combined.buffer);
			}
			return String(data);
		}
		/**
		* 列出目录内容
		*/
		async list(path, opts) {
			return this.sendRequest(FILESYSTEM_METHODS.LIST, {
				path,
				opts,
				depth: opts?.depth
			});
		}
		/**
		* 检查路径是否存在
		*/
		async exists(path, opts) {
			return this.sendRequest(FILESYSTEM_METHODS.EXISTS, {
				path,
				opts
			});
		}
		/**
		* 创建目录
		*/
		async makeDir(path, opts) {
			return this.sendRequest(FILESYSTEM_METHODS.MAKE_DIR, {
				path,
				opts
			});
		}
		/**
		* 删除文件或目录
		*/
		async remove(path, opts) {
			await this.sendRequest(FILESYSTEM_METHODS.REMOVE, {
				path,
				opts
			});
		}
		/**
		* 重命名/移动文件或目录
		*/
		async rename(oldPath, newPath, opts) {
			return this.sendRequest(FILESYSTEM_METHODS.RENAME, {
				path: oldPath,
				newPath,
				opts
			});
		}
		/**
		* 获取文件或目录信息
		*/
		async getInfo(path, opts) {
			return this.sendRequest(FILESYSTEM_METHODS.GET_INFO, {
				path,
				opts
			});
		}
		/**
		* 监听目录变化
		*/
		async watchDir(path, onEvent, opts) {
			const watchId = `watch-${++watchIdCounter}-${Date.now()}`;
			this.watchCallbacks.set(watchId, onEvent);
			await this.sendRequest(FILESYSTEM_METHODS.WATCH_DIR, {
				path,
				recursive: opts?.recursive,
				opts: {
					...opts,
					user: watchId
				}
			});
			return { stop: async () => {
				this.watchCallbacks.delete(watchId);
				try {
					await this.sendRequest(FILESYSTEM_METHODS.UNWATCH, {
						path,
						opts: { user: watchId }
					});
				} catch (error) {
					this.log(`Failed to unwatch: ${path}`, error);
				}
				if (opts?.onExit) opts.onExit();
			} };
		}
		/**
		* ArrayBuffer 转 Base64
		*/
		arrayBufferToBase64(buffer) {
			const bytes = new Uint8Array(buffer);
			let binary = "";
			for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
			return btoa(binary);
		}
		/**
		* Blob 转 Base64
		*/
		async blobToBase64(blob) {
			return new Promise((resolve, reject) => {
				const reader = new FileReader();
				reader.onloadend = () => {
					const result = reader.result;
					resolve(result.split(",")[1] || result);
				};
				reader.onerror = reject;
				reader.readAsDataURL(blob);
			});
		}
		/**
		* 日志输出
		*/
		log(...args) {
			if (this.debug) console.log("[LocalFilesystem]", ...args);
		}
		/**
		* 销毁实例，清理资源
		*/
		destroy() {
			this.watchCallbacks.clear();
			if (this.eventCleanup) {
				this.eventCleanup();
				this.eventCleanup = void 0;
			}
		}
	};
}));
//#endregion
//#region ../../packages/agent-provider/src/common/providers/local-agent-provider/local-provider.ts
var LocalAgentProvider;
var init_local_provider = __esmMin((() => {
	init_api_types();
	init_acp();
	init_local_connection();
	init_local_filesystem();
	LocalAgentProvider = class LocalAgentProvider {
		static {
			this.ARCHIVED_SESSIONS_KEY = "genie-archived-session-ids";
		}
		/**
		* 从 localStorage 读取归档 session ID 集合
		*/
		getArchivedSessionIds() {
			try {
				const raw = localStorage.getItem(LocalAgentProvider.ARCHIVED_SESSIONS_KEY);
				return raw ? new Set(JSON.parse(raw)) : /* @__PURE__ */ new Set();
			} catch {
				return /* @__PURE__ */ new Set();
			}
		}
		/**
		* 将归档 session ID 集合保存到 localStorage
		*/
		saveArchivedSessionIds(ids) {
			try {
				localStorage.setItem(LocalAgentProvider.ARCHIVED_SESSIONS_KEY, JSON.stringify([...ids]));
			} catch {}
		}
		constructor(options) {
			this.connections = /* @__PURE__ */ new Map();
			this.sessionCwdMap = /* @__PURE__ */ new Map();
			this.filesystemCache = /* @__PURE__ */ new Map();
			this.samplingRequestCallbacks = /* @__PURE__ */ new Map();
			this.rootsRequestCallbacks = /* @__PURE__ */ new Map();
			this.mcpEventListenersSetup = false;
			if (!options.channel) throw new Error("Channel is required for LocalAgentProvider");
			this.options = options;
			this.channel = options.channel;
			this.sharedAcpClient = new AcpJsonRpcClient(this.channel, {
				timeoutMs: options.acpConfig?.timeoutMs ?? 3e4,
				debug: options.debug ?? false
			});
			this.sharedAcpClient.onExtNotification((method, params) => {
				if (method === "_codebuddy.ai/automation_snapshot") {
					const snapshot = params.snapshot;
					if (snapshot) this.channel.emit("automationSnapshotUpdate", snapshot);
				}
				if (method === "_codebuddy.ai/message_queue_snapshot_changed") this.channel.emit("conversationMessageQueueUpdated", params.snapshot ?? params);
				if (method === "_codebuddy.ai/plugins_changed") this.channel.emit("pluginsChanged", params);
				if (method === "_codebuddy.ai/models_changed") this.channel.emit("modelsChanged", params);
				if (method === "_codebuddy.ai/product_config_changed") this.channel.emit("productConfigChanged", params);
				if (method === "_codebuddy.ai/queue_state_changed") this.channel.emit("queueStateChanged", params);
				if (method === "_codebuddy.ai/identity_changed") {
					console.log("[LocalProvider] Received identity_changed extNotification, emitting identityChanged event:", JSON.stringify(params));
					this.channel.emit("identityChanged", params);
				}
				if (method === "_codebuddy.ai/mcp_servers_changed") this.channel.emit("mcpServersChanged", params);
				if (method === "_codebuddy.ai/authUrl") this.channel.emit("authUrlChanged", params);
			});
		}
		/**
		* 实现 AgentProvider.filesystem 属性
		* 返回 this，因为 LocalAgentProvider 本身实现了 FilesystemProvider 接口
		*/
		get filesystem() {
			return this;
		}
		/**
		* 创建 "Agent"
		*
		* 对于 Local，返回 cwd 作为 agentId
		* 后续 connect(cwd) 和 connection.createSession() 会使用它
		*
		* @param params - 会话创建参数，包含 cwd
		* @returns cwd 作为 "agentId"
		*/
		async create(params) {
			const cwd = params?.cwd;
			if (cwd === void 0) throw new Error("cwd is required for LocalAgentProvider.create()");
			this.log(`create() returning cwd as agentId: ${cwd}`);
			return cwd;
		}
		/**
		* 获取 Session 状态
		*
		* SessionManager.loadSession() 会用 sessionId 调用此方法
		* 需要返回包含 cwd 的状态，以便后续 connect()
		*
		* @param id - 可能是 sessionId 或 cwd
		* @returns Session 状态
		*/
		async get(id) {
			this.log(`get() called with: ${id}`);
			if (id.startsWith("/")) return {
				id,
				type: "local",
				status: "disconnected",
				cwd: id
			};
			const cachedCwd = this.sessionCwdMap.get(id);
			if (cachedCwd) return {
				id,
				type: "local",
				status: "connected",
				cwd: cachedCwd
			};
			try {
				const session = (await this.channel.callMethod("__backend__", {
					type: "backend",
					requestId: `req-${Date.now()}-${Math.random().toString(36).slice(2)}`,
					params: {
						type: "backend:get-session-request",
						params: { sessionId: id }
					}
				}, 5e3)).data?.session;
				if (!session) {
					this.log(`Session not found: ${id}`);
					return;
				}
				if (session.cwd) this.sessionCwdMap.set(id, session.cwd);
				return {
					id: session.sessionId,
					type: "local",
					status: session.status === "active" ? "connected" : "disconnected",
					cwd: session.cwd,
					name: session.name,
					createdAt: session.createdAt ? new Date(session.createdAt) : void 0,
					updatedAt: session.updatedAt ? new Date(session.updatedAt) : session.createdAt ? new Date(session.createdAt) : void 0
				};
			} catch (error) {
				this.log(`Failed to get session ${id}:`, error);
				return;
			}
		}
		/**
		* 列出所有 Sessions
		*
		* @param options - 可选的查询参数（过滤、排序、userId）
		* @returns Session 状态列表和分页信息
		*/
		async list(options) {
			this.log("list() called with options:", options);
			if (!options?.userId) {
				this.log("No userId provided, returning empty list");
				return {
					agents: [],
					pagination: {
						page: 1,
						size: 0,
						total: 0,
						totalPages: 0,
						hasNext: false,
						hasPrev: false
					}
				};
			}
			try {
				const sessions = (await this.channel.callMethod("__backend__", {
					type: "backend",
					requestId: `req-${Date.now()}-${Math.random().toString(36).slice(2)}`,
					params: {
						type: "backend:list-sessions-request",
						params: { userId: options.userId }
					}
				}, 5e3)).data?.sessions ?? [];
				this.log(`Found ${sessions.length} sessions for userId: ${options.userId}`);
				for (const session of sessions) if (session.sessionId && session.cwd) this.sessionCwdMap.set(session.sessionId, session.cwd);
				let result = sessions.map((session) => ({
					id: session.sessionId,
					type: "local",
					status: session.status,
					cwd: session.cwd,
					name: session.name,
					createdAt: session.createdAt ? new Date(session.createdAt) : void 0,
					updatedAt: session.updatedAt ? new Date(session.updatedAt) : session.createdAt ? new Date(session.createdAt) : void 0,
					isPlayground: session.isPlayground,
					isUserDefinedTitle: session.isUserDefinedTitle
				}));
				const archivedIds = this.getArchivedSessionIds();
				const isQueryingArchived = options?.filters?.some((f) => f.field === "status" && f.value.split(",").map((v) => v.trim()).includes("archived"));
				if (isQueryingArchived) result = result.filter((s) => archivedIds.has(s.id)).map((s) => ({
					...s,
					status: "archived"
				}));
				else result = result.filter((s) => !archivedIds.has(s.id));
				if (options) result = this.applyFilters(result, options, isQueryingArchived);
				return {
					agents: result,
					pagination: {
						page: 1,
						size: result.length,
						total: result.length,
						totalPages: 1,
						hasNext: false,
						hasPrev: false
					}
				};
			} catch (error) {
				this.log("Failed to list sessions:", error);
				return {
					agents: [],
					pagination: {
						page: 1,
						size: 0,
						total: 0,
						totalPages: 0,
						hasNext: false,
						hasPrev: false
					}
				};
			}
		}
		/**
		* 应用本地过滤和排序
		*/
		applyFilters(sessions, options, skipStatusArchived = false) {
			let filtered = [...sessions];
			if (options.title) {
				const keyword = options.title.toLowerCase();
				filtered = filtered.filter((s) => s.name?.toLowerCase().includes(keyword));
			}
			if (options.filters?.length) for (const filter of options.filters) {
				if (skipStatusArchived && filter.field === "status" && filter.value.includes("archived")) continue;
				const values = filter.value.split(",").map((v) => v.trim());
				filtered = filtered.filter((s) => {
					const fieldValue = s[filter.field];
					if (filter.field === "sessionStatus") {
						const statusValue = s.status.toLowerCase();
						return values.includes(statusValue) || values.includes(String(fieldValue)) || isWorkingFamilyStatus(statusValue) && values.includes("working");
					}
					return values.includes(String(fieldValue));
				});
			}
			if (options.dayRange !== void 0) {
				const cutoff = /* @__PURE__ */ new Date();
				cutoff.setDate(cutoff.getDate() - (options.dayRange - 1));
				cutoff.setHours(0, 0, 0, 0);
				filtered = filtered.filter((s) => s.createdAt && s.createdAt >= cutoff);
			}
			if (options.sort) {
				const { orderBy, order = "asc" } = options.sort;
				filtered.sort((a, b) => {
					const aVal = a[orderBy];
					const bVal = b[orderBy];
					if (aVal === void 0) return 1;
					if (bVal === void 0) return -1;
					let cmp = 0;
					if (aVal instanceof Date && bVal instanceof Date) cmp = aVal.getTime() - bVal.getTime();
					else if (typeof aVal === "string" && typeof bVal === "string") cmp = aVal.localeCompare(bVal);
					else cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
					return order === "desc" ? -cmp : cmp;
				});
			}
			return filtered;
		}
		/**
		* 连接到工作区
		*
		* @param id - 可能是 cwd（createSession 流程）或 sessionId（loadSession 流程）
		* @returns LocalAgentConnection 实例
		*/
		async connect(id) {
			this.log(`connect() called with: ${id}`);
			let cwd;
			if (id.includes("/")) cwd = id;
			else {
				cwd = this.sessionCwdMap.get(id) || "";
				if (cwd === void 0) cwd = (await this.get(id))?.cwd || "";
				if (cwd === void 0) throw new Error(`Cannot find cwd for session: ${id}`);
			}
			this.log(`Resolved cwd: ${cwd}`);
			const existing = this.connections.get(cwd);
			if (existing?.isInitialized) {
				this.log(`Reusing existing connection for: ${cwd}`);
				return existing;
			}
			this.log(`Opening workspace: ${cwd}`);
			const clientCapabilities = {
				...this.options.clientCapabilities,
				_meta: {
					...this.options.clientCapabilities?._meta,
					"codebuddy.ai": {
						...this.options.clientCapabilities?._meta?.["codebuddy.ai"],
						cwd
					}
				}
			};
			const config = {
				channel: this.channel,
				debug: this.options.debug,
				acpConfig: this.options.acpConfig,
				permissionTimeout: this.options.permissionTimeout,
				permissionAutoRejectOnTimeout: this.options.permissionAutoRejectOnTimeout,
				clientCapabilities
			};
			const connection = new LocalAgentConnection(cwd, config);
			await connection.connect(clientCapabilities);
			this.connections.set(cwd, connection);
			connection.once("disconnected", () => {
				this.connections.delete(cwd);
				this.log(`Connection removed from cache: ${cwd}`);
			});
			this.log(`Connected to workspace: ${cwd}`);
			return connection;
		}
		/**
		* 删除 Session
		*
		* @param sessionId - 会话 ID
		* @returns 是否成功删除
		*/
		async delete(sessionId) {
			this.log(`delete() called with: ${sessionId}`);
			this.sessionCwdMap.delete(sessionId);
			try {
				return (await this.channel.callMethod("__backend__", {
					type: "backend",
					requestId: `req-${Date.now()}-${Math.random().toString(36).slice(2)}`,
					params: {
						type: "backend:delete-session-request",
						params: { sessionId }
					}
				}, 5e3)).data?.success ?? false;
			} catch (error) {
				this.log(`Failed to delete session ${sessionId}:`, error);
				return false;
			}
		}
		/**
		* 归档 Session
		*
		* 纯前端实现：将 sessionId 加入 localStorage 的归档集合，
		* 不删除后端数据，以便后续可恢复。
		*
		* @param sessionId - 会话 ID
		* @returns 包含归档的 session ID 的对象
		*/
		async archive(sessionId) {
			this.log(`archive() called with: ${sessionId}`);
			const archivedIds = this.getArchivedSessionIds();
			archivedIds.add(sessionId);
			this.saveArchivedSessionIds(archivedIds);
			return { id: sessionId };
		}
		/**
		* 更新 Session 状态
		*
		* 纯前端实现：当 status 不为 'archived' 时，将 sessionId 从归档集合中移除（恢复归档）。
		*
		* @param sessionId - 会话 ID
		* @param status - 新状态
		* @returns 包含 session ID 的对象
		*/
		async updateStatus(sessionId, status) {
			this.log(`updateStatus() called with: ${sessionId}, status: ${status}`);
			if (status !== "archived") {
				const archivedIds = this.getArchivedSessionIds();
				archivedIds.delete(sessionId);
				this.saveArchivedSessionIds(archivedIds);
			} else {
				const archivedIds = this.getArchivedSessionIds();
				archivedIds.add(sessionId);
				this.saveArchivedSessionIds(archivedIds);
			}
			return { id: sessionId };
		}
		/**
		* 重命名 Session
		*
		* @param sessionId - 会话 ID
		* @param title - 新标题
		* @returns 包含重命名的 session ID 的对象
		*/
		async rename(sessionId, title) {
			this.log(`rename() called with: ${sessionId}, title: ${title}`);
			try {
				const response = await this.channel.callMethod("__backend__", {
					type: "backend",
					requestId: `req-${Date.now()}-${Math.random().toString(36).slice(2)}`,
					params: {
						type: "backend:rename-session-request",
						params: {
							sessionId,
							title
						}
					}
				}, 5e3);
				if (!response.data?.success) throw new Error(response.data?.error || "Failed to rename session");
				return { id: sessionId };
			} catch (error) {
				this.log(`Failed to rename session ${sessionId}:`, error);
				throw error;
			}
		}
		/**
		* 移动 Session
		* 将 Playground 会话转换为普通会话（从 Playground 移动到 Workspace）
		*
		* @param sessionId - 会话 ID
		* @returns 包含移动的 session ID 的对象
		*/
		async move(sessionId) {
			this.log(`move() called with: ${sessionId}`);
			try {
				const response = await this.channel.callMethod("__backend__", {
					type: "backend",
					requestId: `req-${Date.now()}-${Math.random().toString(36).slice(2)}`,
					params: {
						type: "backend:move-session-request",
						params: { sessionId }
					}
				}, 5e3);
				if (!response.data?.success) throw new Error(response.data?.error || "Failed to move session");
				this.log(`move() succeeded for: ${sessionId}`);
				return { id: sessionId };
			} catch (error) {
				this.log(`Failed to move session ${sessionId}:`, error);
				throw error;
			}
		}
		/**
		* 注册 sessionId → cwd 映射
		*
		* 在 connection.createSession() 成功后调用，记录新创建的 session
		*
		* @param sessionId - 会话 ID
		* @param cwd - 工作区路径
		*/
		registerSession(sessionId, cwd) {
			this.sessionCwdMap.set(sessionId, cwd);
			this.log(`Registered session: ${sessionId} → ${cwd}`);
		}
		/**
		* 获取可用模型列表
		*
		* 通过 ACP JSON-RPC 调用 getModels 方法
		* cwd 为空时会路由到 Default Window
		*
		* @param cwd - 工作目录，可选。为空时使用 Default Window
		* @param mode - 模式过滤，可选
		* @returns 模型列表
		*/
		async getModels(cwd, mode) {
			this.log(`getModels() called with cwd: ${cwd || "(empty)"}, mode: ${mode || "(default)"}`);
			try {
				const response = await this.sharedAcpClient.sendBroadcastRequest("getModels", {
					cwd: cwd || "",
					mode
				});
				if (response?.models) {
					this.log(`getModels() returned ${response.models.length} models`);
					return response.models.map((model) => ({
						...model,
						...model._meta?.["codebuddy.ai"] || {}
					}));
				}
				this.log("getModels() - no models in response");
				return [];
			} catch (error) {
				this.log("getModels() failed:", error);
				return [];
			}
		}
		/**
		* 获取可用模式列表
		*
		* 通过 ACP JSON-RPC 调用 getModes 方法
		* cwd 为空时会路由到 Default Window
		*
		* @param cwd - 工作目录，可选。为空时使用 Default Window
		* @returns 模式列表
		*/
		async getModes(cwd) {
			this.log(`getModes() called with cwd: ${cwd || "(empty)"}`);
			try {
				const response = await this.sharedAcpClient.sendBroadcastRequest("getModes", { cwd: cwd || "" });
				if (response?.modes) {
					this.log(`getModes() returned ${response.modes.length} modes`);
					return response.modes;
				}
				this.log("getModes() - no modes in response");
				return [];
			} catch (error) {
				this.log("getModes() failed:", error);
				return [];
			}
		}
		/**
		* 获取产品配置子集
		*
		* 通过 ACP JSON-RPC 调用 getProductConfiguration 方法
		* 返回 deploymentType、creditPurchaseActions、links 等配置
		*
		* @returns 产品配置子集
		*/
		async getProductConfiguration() {
			this.log("getProductConfiguration() called");
			try {
				const response = await this.sharedAcpClient.sendBroadcastRequest("getProductConfiguration", {});
				this.log("getProductConfiguration() returned:", response);
				return response ?? {};
			} catch (error) {
				this.log("getProductConfiguration() failed:", error);
				return {};
			}
		}
		/**
		* 获取安全检测服务 appKey
		* 从插件 product 配置的 skillSecurityAppKey 字段获取
		*/
		async getSkillSecurityAppKey() {
			try {
				return (await this.getProductConfiguration()).skillSecurityAppKey;
			} catch {
				return;
			}
		}
		/**
		* 获取 Identity 名称
		* 读取 ~/.workbuddy/IDENTITY.md 中的 Name 字段，用于兼容 localStorage 尚未缓存的历史用户
		*/
		async getIdentityName() {
			try {
				return await this.sharedAcpClient.sendBroadcastRequest("getIdentityName", {}) ?? {};
			} catch (error) {
				this.log("getIdentityName() failed:", error);
				return {};
			}
		}
		/**
		* 获取用户信息
		*
		* 通过 ACP JSON-RPC 调用 getUserInfo 方法
		* 返回当前登录用户的 enterpriseId 等信息
		*
		* @returns 用户信息
		*/
		async getUserInfo() {
			this.log("getUserInfo() called");
			try {
				const response = await this.sharedAcpClient.sendBroadcastRequest("getUserInfo", {});
				this.log("getUserInfo() returned:", response);
				return response ?? {};
			} catch (error) {
				this.log("getUserInfo() failed:", error);
				return {};
			}
		}
		/**
		* 打开工作区窗口
		* 这是 LocalAgentProvider 特有的能力，通过 shared ACP client 发送请求，
		* 使用 __workspace__ session ID，由 Main Process 直接处理，不转发到 ExtensionHost
		*
		* @param params 打开工作区请求参数
		* @returns 打开工作区响应
		*/
		async openWorkspace(params) {
			this.log("Opening workspace:", params.cwd);
			return await this.sharedAcpClient.openWorkspace(params);
		}
		/**
		* 选择文件
		* 通过 BackendService 的 __backend__ session 处理
		*
		* @param params 文件选择参数
		* @returns 选择结果
		*/
		async pickFile(params) {
			this.log("Picking file:", params);
			try {
				const response = await this.channel.callMethod("__backend__", {
					type: "backend",
					requestId: `req-${Date.now()}-${Math.random().toString(36).slice(2)}`,
					params: {
						type: "backend:pick-file",
						params
					}
				}, 3e4);
				this.log("pickFile() response:", response.data);
				const data = response.data;
				return {
					files: data.filePaths || [],
					canceled: data.canceled ?? false,
					error: data.error
				};
			} catch (error) {
				this.log("pickFile() failed:", error);
				return {
					files: [],
					canceled: true,
					error: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		/**
		* 选择文件夹
		* 通过 BackendService 的 __backend__ session 处理
		*
		* @param params 文件夹选择参数
		* @returns 选择结果
		*/
		async pickFolder(params) {
			this.log("Picking folder:", params);
			try {
				const response = await this.channel.callMethod("__backend__", {
					type: "backend",
					requestId: `req-${Date.now()}-${Math.random().toString(36).slice(2)}`,
					params: {
						type: "backend:pick-folder",
						params
					}
				}, 3e4);
				this.log("pickFolder() response:", response.data);
				const data = response.data;
				return {
					folderPaths: data?.folderPaths ?? data?.paths ?? [],
					canceled: data?.canceled ?? data?.cancelled ?? true,
					error: data?.error
				};
			} catch (error) {
				this.log("pickFolder() failed:", error);
				return {
					folderPaths: [],
					canceled: true,
					error: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		/**
		* 搜索文件
		* 通过 shared ACP client 发送广播请求到 Extension Host
		* Extension Host 中的 FileSearchService 会处理这个请求
		*
		* @param params 搜索参数
		* @returns 搜索结果
		*/
		async searchFile(params) {
			this.log("Searching files:", params.options);
			try {
				const response = await this.sharedAcpClient.sendBroadcastRequest("getWorkspaceFiles", {
					cwd: params.cwd,
					search: params.options.search,
					resultNum: params.options.resultNum
				});
				this.log("searchFile() response:", response);
				return {
					results: response.results.map((r) => ({
						...r,
						type: r.type
					})),
					error: void 0
				};
			} catch (error) {
				this.log("searchFile() failed:", error);
				return {
					results: [],
					error: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		/**
		* 获取 Subagent 列表
		* 通过 shared ACP client 发送广播请求到 Extension Host
		* Extension Host 中的 SubagentsService 会处理这个请求
		*
		* @param params 查询参数
		* @returns Subagent 列表
		*/
		async getSubagentList(params) {
			this.log("Getting subagent list:", params.options);
			try {
				const response = await this.sharedAcpClient.sendBroadcastRequest("getSubagentList", {
					cwd: params.cwd,
					search: params.options.search,
					resultNum: params.options.resultNum,
					agentMode: params.options.agentMode || "all",
					onlyEnabled: params.options.onlyEnabled
				});
				this.log("getSubagentList() response:", response);
				return {
					results: response.subagents,
					error: void 0
				};
			} catch (error) {
				this.log("getSubagentList() failed:", error);
				return {
					results: [],
					error: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		/**
		* 获取 Skill 列表
		*
		* @param params 查询参数
		* @returns Skill 列表
		*/
		async getSkillList(params) {
			this.log("Getting skill list:", params);
			const useGlobal = params?.global ?? true;
			try {
				if (!useGlobal || params?.cwd) {
					const response = await this.sharedAcpClient.sendBroadcastRequest("getSkillList", {
						cwd: params?.cwd ?? "",
						excludePluginSkills: params?.excludePluginSkills ?? false
					});
					this.log("getSkillList() broadcast response:", response);
					return {
						results: response.skills,
						error: void 0
					};
				}
				const backendResponse = await this.channel.callMethod("__backend__", {
					type: "backend",
					requestId: `req-${Date.now()}-${Math.random().toString(36).slice(2)}`,
					params: {
						type: "backend:get-skill-list",
						params: { skillScanDirs: params?.skillScanDirs }
					}
				}, 3e4);
				this.log("getSkillList() backend response:", backendResponse.data);
				const data = backendResponse.data;
				return {
					results: data?.skills ?? [],
					error: data?.error
				};
			} catch (error) {
				this.log("getSkillList() failed:", error);
				return {
					results: [],
					error: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		/**
		* 导入 Skill 文件夹
		*
		* @param params 导入参数
		* @returns 导入结果
		*/
		async importSkill(params) {
			this.log("Importing skill folder:", params);
			try {
				const appKey = params.appKey ?? await this.getSkillSecurityAppKey();
				const backendResponse = await this.channel.callMethod("__backend__", {
					type: "backend",
					requestId: `req-${Date.now()}-${Math.random().toString(36).slice(2)}`,
					params: {
						type: "backend:import-skill",
						params: {
							cwd: params.cwd,
							source: params.source,
							folderPath: params.folderPath,
							securityCheck: params.securityCheck,
							appKey,
							overwrite: params.overwrite
						}
					}
				}, 3e4);
				this.log("importSkill() backend response:", backendResponse.data);
				const data = backendResponse.data;
				return {
					success: data?.success ?? false,
					error: data?.error,
					skillName: data?.skillName,
					preCheck: data?.preCheck
				};
			} catch (error) {
				this.log("importSkill() failed:", error);
				return {
					success: false,
					error: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		/**
		* 通过路径直接安装 Skill（跳过文件选择弹窗和安全检测）
		* 用于用户确认有风险安装时，使用上一次选择的路径直接安装
		*
		* @param params 安装参数，包含 folderPath
		* @returns 安装结果
		*/
		async installSkillByPath(params) {
			this.log("Installing skill by path:", params);
			try {
				const backendResponse = await this.channel.callMethod("__backend__", {
					type: "backend",
					requestId: `req-${Date.now()}-${Math.random().toString(36).slice(2)}`,
					params: {
						type: "backend:import-skill",
						params: {
							cwd: params.cwd,
							source: params.source,
							folderPath: params.folderPath,
							securityCheck: false
						}
					}
				}, 3e4);
				this.log("installSkillByPath() backend response:", backendResponse.data);
				const data = backendResponse.data;
				return {
					success: data?.success ?? false,
					error: data?.error,
					skillName: data?.skillName
				};
			} catch (error) {
				this.log("installSkillByPath() failed:", error);
				return {
					success: false,
					error: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		/**
		* 查询 Skill 安全扫描结果
		*/
		async querySkillScanResult(params) {
			this.log("querySkillScanResult():", params.md5);
			try {
				const appKey = params.appKey ?? await this.getSkillSecurityAppKey();
				const backendResponse = await this.channel.callMethod("__backend__", {
					type: "backend",
					requestId: `req-${Date.now()}-${Math.random().toString(36).slice(2)}`,
					params: {
						type: "backend:skill-query-scan-result",
						params: {
							md5: params.md5,
							appKey
						}
					}
				}, 3e4);
				this.log("querySkillScanResult() backend response:", backendResponse.data);
				return backendResponse.data ?? null;
			} catch (error) {
				this.log("querySkillScanResult() failed:", error);
				return null;
			}
		}
		/**
		* 从 URL 安装 Skill 包
		* 当 downloadUrl 为 https 链接时，先走 backend 预下载，再执行 importSkill。
		*/
		async installSkillFromUrl(params) {
			this.log("Installing skill from URL/local package:", params);
			const requestedSkillName = params.skillName?.trim();
			if (!requestedSkillName) return {
				success: false,
				errorKey: "invalidSkillId",
				errorMessage: "Missing required skill identifier"
			};
			const downloadInput = params.downloadUrl?.trim();
			if (!downloadInput) return {
				success: false,
				errorKey: "invalidDownloadUrl",
				errorMessage: "Missing skill package path or URL"
			};
			try {
				const preparedResult = await this.prepareSkillPackageFromUrlIfNeeded({
					skillName: requestedSkillName,
					downloadUrl: downloadInput
				});
				if (!preparedResult.success || !preparedResult.downloadedFilePath) return {
					success: false,
					errorKey: preparedResult.errorKey || "installFromUrlFailed",
					errorMessage: preparedResult.errorMessage || "Failed to download skill package",
					warningKey: preparedResult.warningKey,
					warningMessage: preparedResult.warningMessage,
					skillName: preparedResult.skillName || requestedSkillName
				};
				const importResult = await this.importSkill({
					source: "userSettings",
					folderPath: preparedResult.downloadedFilePath,
					overwrite: params.overwrite,
					securityCheck: params.securityCheck ?? true,
					appKey: params.appKey
				});
				if (!importResult.success) {
					const errorKey = this.mapImportErrorToInstallErrorKey(importResult.error);
					return {
						success: false,
						errorKey,
						errorMessage: importResult.error || "Failed to import skill package",
						warningKey: preparedResult.warningKey,
						warningMessage: preparedResult.warningMessage,
						skillName: errorKey === "duplicateSkillName" ? importResult.skillName || preparedResult.skillName || requestedSkillName : void 0,
						preCheck: importResult.preCheck
					};
				}
				const installedSkillName = importResult.skillName || preparedResult.skillName || requestedSkillName;
				const activatedSkillId = this.normalizeSkillId(installedSkillName);
				const installedFilePath = await this.findInstalledSkillFilePathByName(installedSkillName);
				return {
					success: true,
					warningKey: preparedResult.warningKey,
					warningMessage: preparedResult.warningMessage,
					importedSkillIds: [activatedSkillId],
					activatedSkillId,
					skillName: installedSkillName,
					installedFilePath
				};
			} catch (error) {
				this.log("installSkillFromUrl() failed:", error);
				return {
					success: false,
					errorKey: "installFromUrlFailed",
					errorMessage: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		async prepareSkillPackageFromUrlIfNeeded(params) {
			const remoteUrl = params.downloadUrl.trim();
			if (!/^https:\/\//i.test(remoteUrl)) return {
				success: true,
				skillName: params.skillName,
				downloadedFilePath: remoteUrl
			};
			try {
				const data = (await this.channel.callMethod("__backend__", {
					type: "backend",
					requestId: `req-${Date.now()}-${Math.random().toString(36).slice(2)}`,
					params: {
						type: "backend:prepare-skill-package-from-url",
						params: {
							skillName: params.skillName,
							downloadUrl: remoteUrl
						}
					}
				}, 3e4)).data;
				return {
					success: data?.success ?? false,
					errorKey: data?.errorKey,
					errorMessage: data?.errorMessage,
					warningKey: data?.warningKey,
					warningMessage: data?.warningMessage,
					skillName: data?.skillName,
					downloadedFilePath: data?.downloadedFilePath
				};
			} catch (error) {
				this.log("prepareSkillPackageFromUrlIfNeeded() failed:", error);
				return {
					success: false,
					errorKey: "installFromUrlFailed",
					errorMessage: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		normalizeSkillId(skillName) {
			return skillName.toLowerCase().replace(/\s+/g, "-").trim();
		}
		mapImportErrorToInstallErrorKey(error) {
			if (!error) return;
			if (error.includes("already exists")) return "duplicateSkillName";
			if (error.includes("SKILL.md")) return "skillFileMissing";
			if (error.includes("Selected path is not a folder")) return "invalidSkillFolder";
			if (error.includes("security_check_blocked")) return "security_check_blocked";
		}
		async findInstalledSkillFilePathByName(skillName) {
			return (await this.getSkillList({ global: true })).results.find((skill) => skill.name === skillName)?.filePath;
		}
		/**
		* 切换 Skill 启用/禁用状态
		*
		* @param params 切换参数
		* @returns 切换结果
		*/
		async toggleSkill(params) {
			this.log("Toggling skill:", params.filePath, "disable:", params.disable);
			try {
				const response = await this.sharedAcpClient.sendBroadcastRequest("toggleSkill", {
					filePath: params.filePath,
					disable: params.disable
				});
				this.log("toggleSkill() response:", response);
				return {
					success: response?.success ?? false,
					error: response?.error
				};
			} catch (error) {
				this.log("toggleSkill() failed:", error);
				return {
					success: false,
					error: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		/**
		* 删除 Skill
		*
		* @param params 删除参数
		* @returns 删除结果
		*/
		async deleteSkill(params) {
			this.log("Deleting skill:", params.name, "at", params.filePath);
			try {
				const response = await this.sharedAcpClient.sendBroadcastRequest("deleteSkill", {
					filePath: params.filePath,
					name: params.name
				});
				this.log("deleteSkill() response:", response);
				return {
					success: response?.success ?? false,
					error: response?.error
				};
			} catch (error) {
				this.log("deleteSkill() failed:", error);
				return {
					success: false,
					error: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		/**
		* 获取 Skill 内容
		* 通过 shared ACP client 发送广播请求到 Extension Host
		*
		* @param params 包含 filePath 的参数
		* @returns Skill 文件内容
		*/
		async getSkillContent(params) {
			this.log("Getting skill content:", params.filePath);
			try {
				const response = await this.sharedAcpClient.sendBroadcastRequest("getSkillContent", { filePath: params.filePath });
				this.log("getSkillContent() response:", response);
				return {
					content: response?.content ?? "",
					error: response?.error
				};
			} catch (error) {
				this.log("getSkillContent() failed:", error);
				return {
					content: "",
					error: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		/**
		* 获取推荐 Skill 列表（从市场）
		* 通过 shared ACP client 发送广播请求到 Extension Host
		*
		* @returns 推荐 Skill 列表
		*/
		async getMarketplaceSkills() {
			this.log("Getting marketplace skills");
			try {
				const response = await this.sharedAcpClient.sendBroadcastRequest("getMarketplaceSkills", {});
				this.log("getMarketplaceSkills() response:", response);
				return {
					results: response?.skills ?? [],
					tagCategories_zh: response?.tagCategories_zh,
					tagCategories_en: response?.tagCategories_en
				};
			} catch (error) {
				this.log("getMarketplaceSkills() failed:", error);
				return {
					results: [],
					error: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		/**
		* 获取市场 Skill 内容
		* 通过 shared ACP client 发送广播请求到 Extension Host
		*
		* @param params 包含 skillName 的参数
		* @returns Skill 文件内容
		*/
		async getMarketplaceSkillContent(params) {
			this.log("Getting marketplace skill content:", params.skillName);
			try {
				const response = await this.sharedAcpClient.sendBroadcastRequest("getMarketplaceSkillContent", { skillName: params.skillName });
				this.log("getMarketplaceSkillContent() response:", response);
				return {
					content: response?.content ?? "",
					error: response?.error
				};
			} catch (error) {
				this.log("getMarketplaceSkillContent() failed:", error);
				return {
					content: "",
					error: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		/**
		* 安装市场 Skill 到用户目录
		* 通过 shared ACP client 发送广播请求到 Extension Host
		*
		* @param params 包含 skillName 的参数
		* @returns 安装结果
		*/
		async installMarketplaceSkill(params) {
			this.log("Installing marketplace skill:", params.skillName);
			try {
				const response = await this.sharedAcpClient.sendBroadcastRequest("installMarketplaceSkill", { skillName: params.skillName });
				this.log("installMarketplaceSkill() response:", response);
				return {
					success: response?.success ?? false,
					skillName: response?.skillName ?? params.skillName,
					errorMessage: response?.errorMessage
				};
			} catch (error) {
				this.log("installMarketplaceSkill() failed:", error);
				return {
					success: false,
					skillName: params.skillName,
					errorMessage: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		/**
		* 批量切换插件状态
		* 通过 ACP 协议调用 Extension Host 的 PluginService
		*
		* @param request 批量插件操作请求
		* @returns 批量操作结果
		*/
		async batchTogglePlugins(request) {
			this.log("Batch toggling plugins:", request);
			try {
				const result = await this.sharedAcpClient.batchTogglePlugins(request);
				this.log("batchTogglePlugins() response:", result);
				return {
					success: result.success,
					succeededPlugins: result.succeededPlugins,
					failedPlugins: result.failedPlugins.map((item) => ({
						pluginName: item.pluginName,
						marketplaceName: item.marketplaceName,
						scope: item.scope,
						operation: item.operation,
						error: item.error ?? "Unknown error"
					}))
				};
			} catch (error) {
				this.log("batchTogglePlugins() failed:", error);
				return {
					success: false,
					succeededPlugins: [],
					failedPlugins: request.items.map((item) => ({
						...item,
						error: error instanceof Error ? error.message : "Unknown error"
					}))
				};
			}
		}
		/**
		* 获取当前工作区列表
		* 这是 LocalAgentProvider 特有的能力，通过 shared ACP client 发送请求，
		* 使用 __workspace__ session ID，由 Main Process 直接处理
		*
		* @param filter 可选的过滤参数
		* @returns 工作区列表
		*/
		async getCurrentWorkspaces(filter) {
			this.log("Getting current workspaces:", filter);
			try {
				return (await this.sharedAcpClient.getCurrentWorkspaces({ filter })).workspaces ?? [];
			} catch (error) {
				this.log("getCurrentWorkspaces() failed:", error);
				return [];
			}
		}
		async getAutomationSnapshot() {
			this.log("Getting automation snapshot");
			return await this.sharedAcpClient.getAutomationSnapshot();
		}
		async updateAutomation(payload) {
			this.log("Updating automation:", payload?.id || payload?.name || "(new)");
			return await this.sharedAcpClient.updateAutomation(payload);
		}
		async deleteAutomation(id) {
			this.log("Deleting automation:", id);
			return await this.sharedAcpClient.deleteAutomation({ id });
		}
		async archiveAutomationInboxItem(itemId) {
			this.log("Archiving automation inbox item:", itemId);
			return await this.sharedAcpClient.archiveAutomationInboxItem({ itemId });
		}
		async deleteAutomationInboxItem(itemId) {
			this.log("Deleting automation inbox item:", itemId);
			return await this.sharedAcpClient.deleteAutomationInboxItem({ itemId });
		}
		async testAutomation(id) {
			this.log("Testing automation:", id);
			return await this.sharedAcpClient.testAutomation({ id });
		}
		/**
		* 获取已安装插件列表
		* 通过 shared ACP client 发送请求
		*
		* @param forceRefresh 是否强制刷新缓存
		* @returns 已安装插件列表
		*/
		async getInstalledPlugins(forceRefresh) {
			this.log("Getting installed plugins, forceRefresh:", forceRefresh);
			try {
				const result = await this.sharedAcpClient.getInstalledPlugins({ forceRefresh });
				this.log(`Got ${result.plugins?.length ?? 0} installed plugins`);
				return result.plugins ?? [];
			} catch (error) {
				this.log("getInstalledPlugins() failed:", error);
				return [];
			}
		}
		/**
		* 安装插件
		* 通过 shared ACP client 发送请求
		*
		* @param pluginNames 插件名称数组
		* @param marketplaceName 插件市场名称
		* @param installScope 安装范围
		* @param marketplaceSource 市场源地址（当市场不存在时用于自动添加市场）
		* @returns 安装结果
		*/
		async installPlugins(pluginNames, marketplaceName, installScope, marketplaceSource, workspacePath) {
			this.log("Installing plugins:", pluginNames, "from", marketplaceName, marketplaceSource ? `(source: ${marketplaceSource})` : "", workspacePath ? `(workspacePath: ${workspacePath})` : "");
			try {
				return await this.sharedAcpClient.installPlugins({
					pluginNames,
					marketplaceName,
					installScope,
					marketplaceSource,
					workspacePath
				});
			} catch (error) {
				this.log("installPlugins() failed:", error);
				return {
					success: false,
					error: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		/**
		* 卸载插件
		* 通过 shared ACP client 发送请求
		*
		* @param pluginName 插件名称
		* @param marketplaceName 插件市场名称
		* @param scope 卸载范围
		* @returns 卸载结果
		*/
		async uninstallPlugin(pluginName, marketplaceName, scope) {
			this.log("Uninstalling plugin:", pluginName, "from", marketplaceName, "scope:", scope);
			try {
				return await this.sharedAcpClient.uninstallPlugin({
					pluginName,
					marketplaceName,
					scope
				});
			} catch (error) {
				this.log("uninstallPlugin() failed:", error);
				return {
					success: false,
					error: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		/**
		* 更新插件到最新版本
		* 通过 shared ACP client 发送请求
		*
		* @param pluginName 插件名称
		* @param marketplaceName 插件市场名称
		* @returns 更新结果
		*/
		async updatePlugin(pluginName, marketplaceName) {
			this.log("Updating plugin:", pluginName, "from", marketplaceName);
			try {
				return await this.sharedAcpClient.updatePlugin({
					pluginName,
					marketplaceName
				});
			} catch (error) {
				this.log("updatePlugin() failed:", error);
				return {
					success: false,
					error: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		/**
		* 获取插件市场列表
		* 通过 shared ACP client 发送请求
		*
		* @param forceRefresh 是否强制刷新缓存
		* @returns 插件市场列表
		*/
		async getPluginMarketplaces(forceRefresh) {
			this.log("Getting plugin marketplaces, forceRefresh:", forceRefresh);
			try {
				const result = await this.sharedAcpClient.getPluginMarketplaces({ forceRefresh });
				this.log(`Got ${result.marketplaces?.length ?? 0} marketplaces`);
				return result.marketplaces ?? [];
			} catch (error) {
				this.log("getPluginMarketplaces() failed:", error);
				return [];
			}
		}
		/**
		* 获取市场下的插件列表
		* 通过 shared ACP client 发送请求
		*
		* @param marketplaceName 市场名称
		* @param forceRefresh 是否强制刷新缓存
		* @param searchText 搜索关键词
		* @returns 插件列表
		*/
		async getMarketplacePlugins(marketplaceName, forceRefresh, searchText) {
			this.log("Getting marketplace plugins:", marketplaceName, "forceRefresh:", forceRefresh, "searchText:", searchText);
			try {
				const result = await this.sharedAcpClient.getMarketplacePlugins({
					marketplaceName,
					forceRefresh,
					searchText
				});
				this.log(`Got ${result.plugins?.length ?? 0} plugins from marketplace ${marketplaceName}`);
				return result.plugins ?? [];
			} catch (error) {
				this.log("getMarketplacePlugins() failed:", error);
				return [];
			}
		}
		/**
		* 获取插件详情
		* 通过 shared ACP client 发送请求
		*
		* @param pluginName 插件名称
		* @param marketplaceName 市场名称
		* @returns 插件详情
		*/
		async getPluginDetail(pluginName, marketplaceName) {
			this.log("Getting plugin detail:", pluginName, "from", marketplaceName);
			try {
				return (await this.sharedAcpClient.getPluginDetail({
					pluginName,
					marketplaceName
				})).plugin ?? null;
			} catch (error) {
				this.log("getPluginDetail() failed:", error);
				return null;
			}
		}
		/**
		* 添加插件市场
		* 通过 shared ACP client 发送请求
		*
		* @param source 市场源 URL 或 GitHub repo
		* @param name 市场名称（可选）
		* @returns 添加结果
		*/
		async addPluginMarketplace(source, name) {
			this.log("Adding plugin marketplace:", source, name ? `as ${name}` : "");
			try {
				return await this.sharedAcpClient.addPluginMarketplace({
					source,
					name
				});
			} catch (error) {
				this.log("addPluginMarketplace() failed:", error);
				return {
					success: false,
					error: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		/**
		* 删除插件市场
		* 通过 shared ACP client 发送请求
		*
		* @param marketplaceName 市场名称
		* @returns 删除结果
		*/
		async removePluginMarketplace(marketplaceName) {
			this.log("Removing plugin marketplace:", marketplaceName);
			try {
				return await this.sharedAcpClient.removePluginMarketplace({ marketplaceName });
			} catch (error) {
				this.log("removePluginMarketplace() failed:", error);
				return {
					success: false,
					error: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		/**
		* 刷新插件市场
		* 通过 shared ACP client 发送请求
		*
		* @param marketplaceName 市场名称
		* @returns 刷新结果
		*/
		async refreshPluginMarketplace(marketplaceName) {
			this.log("Refreshing plugin marketplace:", marketplaceName);
			try {
				return await this.sharedAcpClient.refreshPluginMarketplace({ marketplaceName });
			} catch (error) {
				this.log("refreshPluginMarketplace() failed:", error);
				return {
					success: false,
					error: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		/**
		* 用新窗口打开文件夹
		* 通过 shared ACP client 发送请求到 Extension Host
		*
		* 调用链：
		* 1. client.sessions.openFolderInNewWindow() 调用此方法
		* 2. LocalAgentProvider -> AcpJsonRpcClient.openFolderInNewWindow()
		* 3. Extension Host -> PluginService.openFolderInNewWindow()
		* 4. VS Code 执行 vscode.openFolder 命令
		*
		* @param folderPath 文件夹路径
		*/
		async openFolderInNewWindow(folderPath) {
			this.log("Opening folder in new window:", folderPath);
			try {
				await this.sharedAcpClient.openFolderInNewWindow({ folderPath });
			} catch (error) {
				this.log("openFolderInNewWindow() failed:", error);
				throw error;
			}
		}
		/**
		* 在系统文件管理器中打开目录
		* 通过 __backend__ 路由到 BackendService → Main Process → shell.openPath
		*
		* @param folderPath 文件夹路径
		*/
		async openFolder(folderPath) {
			this.log("Opening folder in system file manager:", folderPath);
			try {
				const response = await this.channel.callMethod("__backend__", {
					type: "backend",
					requestId: `req-${Date.now()}-${Math.random().toString(36).slice(2)}`,
					params: {
						type: "backend:open-folder",
						params: { folderPath }
					}
				}, 1e4);
				this.log("openFolder() response:", response.data);
				return response.data;
			} catch (error) {
				this.log("openFolder() failed:", error);
				throw error;
			}
		}
		/**
		* 检查路径是否存在
		* 通过 __backend__ 路由到 BackendService → Main Process → fs.existsSync
		*
		* @param path 要检查的路径
		* @returns 路径是否存在
		*/
		async checkPathExists(path) {
			this.log("Checking path exists:", path);
			try {
				const response = await this.channel.callMethod("__backend__", {
					type: "backend",
					requestId: `req-${Date.now()}-${Math.random().toString(36).slice(2)}`,
					params: {
						type: "backend:check-path-exists",
						params: { path }
					}
				}, 1e4);
				this.log("checkPathExists() response:", response.data);
				return response.data;
			} catch (error) {
				this.log("checkPathExists() failed:", error);
				return false;
			}
		}
		/**
		* 获取支持的场景列表（从后端 API）
		* 通过 shared ACP client 发送请求到 Extension Host
		* 用于 Welcome 页面的 QuickActions 快捷操作
		*
		* 调用链：
		* 1. client.sessions.getSupportScenes() 调用此方法
		* 2. LocalAgentProvider -> AcpJsonRpcClient.getSupportScenes()
		* 3. Extension Host 调用 RestOperations -> GET /v2/as/support/scenes
		* 4. 返回 SupportSceneInfo[] 数据
		*
		* @param locale - 可选，语言环境（如 'zh-CN', 'en-US'），用于获取对应语言的场景数据
		* @returns 支持的场景列表
		*/
		async getSupportScenes(locale) {
			this.log("Getting support scenes", locale ? `with locale: ${locale}` : "");
			try {
				const result = await this.sharedAcpClient.getSupportScenes({ locale });
				this.log(`Got ${result.scenes?.length ?? 0} support scenes`);
				return result.scenes ?? [];
			} catch (error) {
				this.log("getSupportScenes() failed:", error);
				return [];
			}
		}
		/**
		* 获取产品配置中的场景列表
		* 通过 BackendService 的 __backend__ session 路由到 Main Process 直接读取本地 scenes.json 文件
		* 无需等待 Extension Host 初始化，页面打开时即可快速加载
		*
		* 调用链：
		* 1. LocalAgentProvider.getProductScenes()
		* 2. channel.callMethod('__backend__', ...) → BackendService.getProductScenes()
		* 3. ipcRenderer.invoke('codebuddy:getProductScenes') → Main Process
		* 4. fs.readFile(~/.codebuddy/plugins/marketplaces/cb_teams_marketplace/scenes.json)
		* 5. 返回 SupportSceneInfo[] 数据
		*
		* @param locale - 可选，语言环境
		* @returns 产品配置中的场景列表
		*/
		async getProductScenes(locale) {
			this.log("Getting product scenes", locale ? `with locale: ${locale}` : "");
			try {
				const scenes = (await this.channel.callMethod("__backend__", {
					type: "backend",
					requestId: `req-${Date.now()}-${Math.random().toString(36).slice(2)}`,
					params: {
						type: "backend:get-product-scenes",
						params: { locale }
					}
				}, 1e4)).data?.scenes ?? [];
				this.log(`Got ${scenes.length} product scenes`);
				return scenes;
			} catch (error) {
				this.log("getProductScenes() failed:", error);
				return [];
			}
		}
		/**
		* 获取会话的可用命令列表
		* 通过 shared ACP client 发送请求到 Extension Host
		* 如果 session.availableCommands 有值则返回缓存值，否则从后端获取
		*
		* 调用链：
		* 1. client.sessions.getAvailableCommands(params) 调用此方法
		* 2. LocalAgentProvider -> AcpJsonRpcClient.sendRequest()
		* 3. Extension Host 返回命令列表
		*
		* @param params - 命令获取参数
		* @returns 可用命令列表
		*/
		async getAvailableCommands(params) {
			this.log("Getting available commands for session:", params?.sessionId ?? "(default)");
			try {
				let result;
				if (params?.sessionId) result = await this.sharedAcpClient.sendRequest(params.sessionId, "getAvailableCommands", params);
				else result = await this.sharedAcpClient.sendBroadcastRequest("getAvailableCommands", params || {});
				this.log(`Got ${result.availableCommands?.length ?? 0} available commands`);
				return result.availableCommands ?? [];
			} catch (error) {
				this.log("getAvailableCommands() failed:", error);
				return [];
			}
		}
		async requestYieldAfterCurrentStep(sessionId) {
			this.log(`requestYieldAfterCurrentStep() called: sessionId=${sessionId}`);
			try {
				const accepted = !!(await this.sharedAcpClient.sendRequest(sessionId, "requestYieldAfterCurrentStep", { sessionId }))?.accepted;
				this.log(`requestYieldAfterCurrentStep() completed: sessionId=${sessionId}, accepted=${accepted}`);
				return accepted;
			} catch (error) {
				this.log("requestYieldAfterCurrentStep() failed:", error);
				return false;
			}
		}
		async getConversationMessageQueue(sessionId) {
			this.log(`getConversationMessageQueue() called: sessionId=${sessionId}`);
			try {
				return await this.sharedAcpClient.getConversationMessageQueue(sessionId);
			} catch (error) {
				this.log("getConversationMessageQueue() failed:", error);
				return;
			}
		}
		async saveConversationMessageQueue(data) {
			this.log(`saveConversationMessageQueue() called: sessionId=${data.conversationId}`);
			try {
				await this.sharedAcpClient.saveConversationMessageQueue(data);
			} catch (error) {
				this.log("saveConversationMessageQueue() failed:", error);
			}
		}
		async enqueueConversationMessageQueueItem(sessionId, contentBlocks) {
			this.log(`enqueueConversationMessageQueueItem() called: sessionId=${sessionId}`);
			return await this.sharedAcpClient.enqueueConversationMessageQueueItem(sessionId, contentBlocks);
		}
		async removeConversationMessageQueueItem(sessionId, itemId) {
			this.log(`removeConversationMessageQueueItem() called: sessionId=${sessionId}, itemId=${itemId}`);
			return await this.sharedAcpClient.removeConversationMessageQueueItem(sessionId, itemId);
		}
		async popConversationMessageQueueItemForEdit(sessionId, itemId) {
			this.log(`popConversationMessageQueueItemForEdit() called: sessionId=${sessionId}, itemId=${itemId}`);
			return await this.sharedAcpClient.popConversationMessageQueueItemForEdit(sessionId, itemId);
		}
		async reorderConversationMessageQueueItems(sessionId, orderedIds) {
			this.log(`reorderConversationMessageQueueItems() called: sessionId=${sessionId}`);
			return await this.sharedAcpClient.reorderConversationMessageQueueItems(sessionId, orderedIds);
		}
		async sendConversationMessageQueueItemNow(sessionId, itemId) {
			this.log(`sendConversationMessageQueueItemNow() called: sessionId=${sessionId}, itemId=${itemId}`);
			return await this.sharedAcpClient.sendConversationMessageQueueItemNow(sessionId, itemId);
		}
		async activateConversationMessageQueue(sessionId) {
			this.log(`activateConversationMessageQueue() called: sessionId=${sessionId}`);
			return await this.sharedAcpClient.activateConversationMessageQueue(sessionId);
		}
		async pauseConversationMessageQueue(sessionId, reason) {
			this.log(`pauseConversationMessageQueue() called: sessionId=${sessionId}, reason=${reason}`);
			return await this.sharedAcpClient.pauseConversationMessageQueue(sessionId, reason);
		}
		async resumeConversationMessageQueue(sessionId) {
			this.log(`resumeConversationMessageQueue() called: sessionId=${sessionId}`);
			return await this.sharedAcpClient.resumeConversationMessageQueue(sessionId);
		}
		async cancelQueueByConversation(conversationId) {
			this.log(`cancelQueueByConversation() called: conversationId=${conversationId}`);
			return await this.sharedAcpClient.cancelQueueByConversation(conversationId);
		}
		async getQueueState(conversationId) {
			this.log(`getQueueState() called: conversationId=${conversationId}`);
			return await this.sharedAcpClient.getQueueState(conversationId);
		}
		/**
		* 上报 telemetry 事件
		* 通过 ACP 链路发送到 IDE 端，由 AcpAgentImpl → EventService 完成上报
		*
		* 注意：使用 GLOBAL session ID 而非 BROADCAST，确保只发给一个窗口处理。
		* Telemetry 上报是幂等操作，只需任意一个 Extension Host 执行即可。
		* 使用 BROADCAST 会导致每个打开的窗口都执行一次上报，造成 N 倍重复数据。
		*/
		async reportTelemetry(eventName, payload) {
			try {
				await this.sharedAcpClient.sendRequest("__global__", "reportTelemetry", {
					eventName,
					payload
				});
			} catch (error) {
				this.log("reportTelemetry() failed:", error);
			}
		}
		/**
		* 设置 MCP 事件监听器
		* 只需要设置一次，用于接收后端推送的确认请求
		*/
		setupMcpEventListeners() {
			if (this.mcpEventListenersSetup) return;
			this.mcpEventListenersSetup = true;
			this.channel.on("mcp-sampling-confirm-request", (data) => {
				this.log("[MCP] Received sampling confirm request:", data);
				const serverName = data?.serverName;
				if (serverName) this.samplingRequestCallbacks.get(serverName)?.forEach((callback) => {
					try {
						callback(data);
					} catch (error) {
						this.log("[MCP] Sampling callback error:", error);
					}
				});
			});
			this.channel.on("mcp-roots-confirm-request", (data) => {
				this.log("[MCP] Received roots confirm request:", data);
				const serverName = data?.serverName;
				if (serverName) this.rootsRequestCallbacks.get(serverName)?.forEach((callback) => {
					try {
						callback(data);
					} catch (error) {
						this.log("[MCP] Roots callback error:", error);
					}
				});
			});
			this.log("[MCP] Event listeners setup completed");
		}
		/**
		* 响应 MCP Sampling 确认请求
		* 将用户的决策发送到后端
		*
		* @param sessionId 会话 ID
		* @param response Sampling 确认响应
		*/
		async respondToSampling(sessionId, response) {
			this.log(`respondToSampling() called: sessionId=${sessionId}, requestId=${response.id}, approved=${response.approved}`);
			try {
				await this.sharedAcpClient.sendRequest(sessionId, "respondToSampling", {
					sessionId,
					...response
				});
				this.log(`respondToSampling() completed for request: ${response.id}`);
			} catch (error) {
				this.log("respondToSampling() failed:", error);
				throw error;
			}
		}
		/**
		* 响应 MCP Roots 确认请求
		* 将用户的决策发送到后端
		*
		* @param sessionId 会话 ID
		* @param response Roots 确认响应
		*/
		async respondToRoots(sessionId, response) {
			this.log(`respondToRoots() called: sessionId=${sessionId}, requestId=${response.id}, approved=${response.approved}`);
			try {
				await this.sharedAcpClient.sendRequest(sessionId, "respondToRoots", {
					sessionId,
					...response
				});
				this.log(`respondToRoots() completed for request: ${response.id}`);
			} catch (error) {
				this.log("respondToRoots() failed:", error);
				throw error;
			}
		}
		/**
		* 订阅 MCP Sampling 确认请求
		* 当 MCP 服务器发起 Sampling 请求时触发回调
		*
		* @param serverName MCP 服务器名称
		* @param callback 请求回调
		* @returns 取消订阅函数
		*/
		subscribeSamplingRequests(serverName, callback) {
			this.log(`subscribeSamplingRequests() called for server: ${serverName}`);
			this.setupMcpEventListeners();
			let callbacks = this.samplingRequestCallbacks.get(serverName);
			if (!callbacks) {
				callbacks = /* @__PURE__ */ new Set();
				this.samplingRequestCallbacks.set(serverName, callbacks);
			}
			callbacks.add(callback);
			return () => {
				this.log(`Unsubscribing sampling requests for server: ${serverName}`);
				const cbs = this.samplingRequestCallbacks.get(serverName);
				cbs?.delete(callback);
				if (cbs?.size === 0) this.samplingRequestCallbacks.delete(serverName);
			};
		}
		/**
		* 订阅 MCP Roots 确认请求
		* 当 MCP 服务器发起 Roots 请求时触发回调
		*
		* @param serverName MCP 服务器名称
		* @param callback 请求回调
		* @returns 取消订阅函数
		*/
		subscribeRootsRequests(serverName, callback) {
			this.log(`subscribeRootsRequests() called for server: ${serverName}`);
			this.setupMcpEventListeners();
			let callbacks = this.rootsRequestCallbacks.get(serverName);
			if (!callbacks) {
				callbacks = /* @__PURE__ */ new Set();
				this.rootsRequestCallbacks.set(serverName, callbacks);
			}
			callbacks.add(callback);
			return () => {
				this.log(`Unsubscribing roots requests for server: ${serverName}`);
				const cbs = this.rootsRequestCallbacks.get(serverName);
				cbs?.delete(callback);
				if (cbs?.size === 0) this.rootsRequestCallbacks.delete(serverName);
			};
		}
		/**
		* 获取灵感卡片列表
		*
		* @param query - 查询参数（分页、分类、日期筛选等）
		* @returns 灵感卡片列表结果
		*/
		async getInspirations(query) {
			this.log("getInspirations() called:", query);
			try {
				const response = await this.channel.callMethod("__backend__", {
					type: "backend",
					requestId: `req-${Date.now()}-${Math.random().toString(36).slice(2)}`,
					params: {
						type: "backend:inspiration-list",
						params: query
					}
				}, 1e4);
				this.log("getInspirations() response:", response.data);
				return response.data;
			} catch (error) {
				this.log("getInspirations() failed:", error);
				return {
					cards: [],
					total: 0
				};
			}
		}
		/**
		* 获取灵感卡片详情
		*
		* @param params - 包含 cardId 的参数
		* @returns 灵感卡片详情
		*/
		async getInspirationDetail(params) {
			this.log("getInspirationDetail() called:", params);
			try {
				const response = await this.channel.callMethod("__backend__", {
					type: "backend",
					requestId: `req-${Date.now()}-${Math.random().toString(36).slice(2)}`,
					params: {
						type: "backend:inspiration-detail",
						params
					}
				}, 5e3);
				this.log("getInspirationDetail() response:", response.data);
				return response.data;
			} catch (error) {
				this.log("getInspirationDetail() failed:", error);
				return;
			}
		}
		/**
		* 标记灵感卡片为已读
		*
		* @param params - 包含 cardId 的参数
		* @returns 操作结果
		*/
		async markInspirationRead(params) {
			this.log("markInspirationRead() called:", params);
			try {
				return (await this.channel.callMethod("__backend__", {
					type: "backend",
					requestId: `req-${Date.now()}-${Math.random().toString(36).slice(2)}`,
					params: {
						type: "backend:inspiration-mark-read",
						params
					}
				}, 5e3)).data;
			} catch (error) {
				this.log("markInspirationRead() failed:", error);
				return { success: false };
			}
		}
		/**
		* 对灵感卡片提交反馈
		*
		* @param feedback - 反馈数据（cardId、feedbackType 等）
		* @returns 操作结果
		*/
		async addInspirationFeedback(feedback) {
			this.log("addInspirationFeedback() called:", feedback);
			try {
				return (await this.channel.callMethod("__backend__", {
					type: "backend",
					requestId: `req-${Date.now()}-${Math.random().toString(36).slice(2)}`,
					params: {
						type: "backend:inspiration-feedback",
						params: feedback
					}
				}, 5e3)).data;
			} catch (error) {
				this.log("addInspirationFeedback() failed:", error);
				return { success: false };
			}
		}
		/**
		* 收藏/取消收藏灵感卡片
		*
		* @param params - 包含 cardId 的参数
		* @returns 操作结果
		*/
		async saveInspiration(params) {
			this.log("saveInspiration() called:", params);
			try {
				return (await this.channel.callMethod("__backend__", {
					type: "backend",
					requestId: `req-${Date.now()}-${Math.random().toString(36).slice(2)}`,
					params: {
						type: "backend:inspiration-save",
						params
					}
				}, 5e3)).data;
			} catch (error) {
				this.log("saveInspiration() failed:", error);
				return { success: false };
			}
		}
		/**
		* 获取灵感功能用户配置
		*
		* @returns 用户配置
		*/
		async getInspirationSettings() {
			this.log("getInspirationSettings() called");
			try {
				const response = await this.channel.callMethod("__backend__", {
					type: "backend",
					requestId: `req-${Date.now()}-${Math.random().toString(36).slice(2)}`,
					params: {
						type: "backend:inspiration-settings-get",
						params: {}
					}
				}, 5e3);
				this.log("getInspirationSettings() response:", response.data);
				return response.data;
			} catch (error) {
				this.log("getInspirationSettings() failed:", error);
				return {};
			}
		}
		/**
		* 保存灵感功能用户配置
		*
		* @param config - 用户配置数据
		* @returns 操作结果
		*/
		async saveInspirationSettings(config) {
			this.log("saveInspirationSettings() called:", config);
			try {
				return (await this.channel.callMethod("__backend__", {
					type: "backend",
					requestId: `req-${Date.now()}-${Math.random().toString(36).slice(2)}`,
					params: {
						type: "backend:inspiration-settings-save",
						params: config
					}
				}, 5e3)).data;
			} catch (error) {
				this.log("saveInspirationSettings() failed:", error);
				return { success: false };
			}
		}
		/**
		* 检查灵感引导是否完成
		*
		* @returns 引导完成状态
		*/
		async checkInspirationOnboarding() {
			this.log("checkInspirationOnboarding() called");
			try {
				return (await this.channel.callMethod("__backend__", {
					type: "backend",
					requestId: `req-${Date.now()}-${Math.random().toString(36).slice(2)}`,
					params: {
						type: "backend:inspiration-onboarding-check",
						params: {}
					}
				}, 5e3)).data;
			} catch (error) {
				this.log("checkInspirationOnboarding() failed:", error);
				return { completed: false };
			}
		}
		/**
		* 完成灵感引导
		*
		* @returns 操作结果
		*/
		async completeInspirationOnboarding() {
			this.log("completeInspirationOnboarding() called");
			try {
				return (await this.channel.callMethod("__backend__", {
					type: "backend",
					requestId: `req-${Date.now()}-${Math.random().toString(36).slice(2)}`,
					params: {
						type: "backend:inspiration-onboarding-complete",
						params: {}
					}
				}, 5e3)).data;
			} catch (error) {
				this.log("completeInspirationOnboarding() failed:", error);
				return { success: false };
			}
		}
		/**
		* 注入 demo 灵感卡片（首次引导完成后调用）
		*
		* @returns 操作结果
		*/
		async injectDemoInspirationCards() {
			this.log("injectDemoInspirationCards() called");
			try {
				return (await this.channel.callMethod("__backend__", {
					type: "backend",
					requestId: `req-${Date.now()}-${Math.random().toString(36).slice(2)}`,
					params: {
						type: "backend:inspiration-inject-demo",
						params: {}
					}
				}, 1e4)).data;
			} catch (error) {
				this.log("injectDemoInspirationCards() failed:", error);
				return { success: false };
			}
		}
		/**
		* 添加灵感策展指令
		*
		* @param params - 策展指令数据
		* @returns 操作结果
		*/
		async addInspirationCuration(params) {
			this.log("addInspirationCuration() called:", params);
			try {
				return (await this.channel.callMethod("__backend__", {
					type: "backend",
					requestId: `req-${Date.now()}-${Math.random().toString(36).slice(2)}`,
					params: {
						type: "backend:inspiration-curation-add",
						params
					}
				}, 5e3)).data;
			} catch (error) {
				this.log("addInspirationCuration() failed:", error);
				return { success: false };
			}
		}
		/**
		* 获取灵感策展指令列表
		*
		* @returns 策展指令列表
		*/
		async listInspirationCurations() {
			this.log("listInspirationCurations() called");
			try {
				const response = await this.channel.callMethod("__backend__", {
					type: "backend",
					requestId: `req-${Date.now()}-${Math.random().toString(36).slice(2)}`,
					params: {
						type: "backend:inspiration-curation-list",
						params: {}
					}
				}, 5e3);
				this.log("listInspirationCurations() response:", response.data);
				return response.data;
			} catch (error) {
				this.log("listInspirationCurations() failed:", error);
				return { directives: [] };
			}
		}
		/**
		* 更新灵感策展指令
		*
		* @param params - 包含 directiveId 和更新字段的参数
		* @returns 操作结果
		*/
		async updateInspirationCuration(params) {
			this.log("updateInspirationCuration() called:", params);
			try {
				return (await this.channel.callMethod("__backend__", {
					type: "backend",
					requestId: `req-${Date.now()}-${Math.random().toString(36).slice(2)}`,
					params: {
						type: "backend:inspiration-curation-update",
						params
					}
				}, 5e3)).data;
			} catch (error) {
				this.log("updateInspirationCuration() failed:", error);
				return { success: false };
			}
		}
		/**
		* 删除灵感策展指令
		*
		* @param params - 包含 directiveId 的参数
		* @returns 操作结果
		*/
		async deleteInspirationCuration(params) {
			this.log("deleteInspirationCuration() called:", params);
			try {
				return (await this.channel.callMethod("__backend__", {
					type: "backend",
					requestId: `req-${Date.now()}-${Math.random().toString(36).slice(2)}`,
					params: {
						type: "backend:inspiration-curation-delete",
						params
					}
				}, 5e3)).data;
			} catch (error) {
				this.log("deleteInspirationCuration() failed:", error);
				return { success: false };
			}
		}
		/**
		* 生成灵感测试数据
		*
		* @returns 生成结果
		*/
		async generateInspirationTestData() {
			this.log("generateInspirationTestData() called");
			try {
				const response = await this.channel.callMethod("__backend__", {
					type: "backend",
					requestId: `req-${Date.now()}-${Math.random().toString(36).slice(2)}`,
					params: {
						type: "backend:inspiration-generate-test-data",
						params: {}
					}
				}, 1e4);
				this.log("generateInspirationTestData() response:", response.data);
				return response.data;
			} catch (error) {
				this.log("generateInspirationTestData() failed:", error);
				return { success: false };
			}
		}
		/**
		* 获取已有连接
		*
		* @param cwd - 工作区路径
		* @returns LocalAgentConnection 实例或 undefined
		*/
		getConnection(cwd) {
			return this.connections.get(cwd);
		}
		/**
		* 检查是否存在连接
		*
		* @param cwd - 工作区路径
		* @returns 是否存在连接
		*/
		hasConnection(cwd) {
			return this.connections.has(cwd);
		}
		/**
		* 断开所有连接
		*/
		disconnectAll() {
			for (const connection of this.connections.values()) connection.disconnect();
			this.connections.clear();
			this.sessionCwdMap.clear();
			for (const fs of this.filesystemCache.values()) fs.destroy();
			this.filesystemCache.clear();
			this.samplingRequestCallbacks.clear();
			this.rootsRequestCallbacks.clear();
		}
		/**
		* 获取 Filesystem 实例
		*
		* 对于 Local 模式，agentId 实际上是 sessionId
		* 通过已有的 MessagePort 通道将 filesystem 请求路由到 ExtensionHost
		*
		* @param agentId - Session ID（对于 Local 模式）
		* @returns FilesResource 实例
		*/
		async getFilesystem(agentId) {
			this.log(`getFilesystem() called with: ${agentId}`);
			const cached = this.filesystemCache.get(agentId);
			if (cached) {
				this.log(`Returning cached filesystem for: ${agentId}`);
				return cached;
			}
			const filesystem = new LocalFilesystem(this.sharedAcpClient, agentId, { debug: this.options.debug });
			this.filesystemCache.set(agentId, filesystem);
			this.log(`Created new filesystem for: ${agentId}`);
			return filesystem;
		}
		/**
		* Register an event listener
		* Forwards to the underlying channel's event system
		*
		* @param event - Event name
		* @param handler - Event handler function
		*/
		on(event, handler) {
			this.channel.on(event, handler);
			this.log(`Registered event listener: ${event}`);
		}
		/**
		* Unregister an event listener
		* Forwards to the underlying channel's event system
		*
		* @param event - Event name
		* @param handler - Event handler function to remove
		*/
		off(event, handler) {
			this.channel.off(event, handler);
			this.log(`Unregistered event listener: ${event}`);
		}
		/**
		* 获取 MCP 服务器列表
		* 通过 shared ACP client 发送广播请求到 Extension Host
		*
		* @returns MCP 服务器列表
		*/
		async getMcpServers() {
			this.log("Getting MCP servers");
			try {
				const result = await this.sharedAcpClient.sendBroadcastRequest("getMcpServers", {});
				this.log(`Got ${result.servers?.length ?? 0} MCP servers`);
				return result.servers ?? [];
			} catch (error) {
				this.log("getMcpServers() failed:", error);
				return [];
			}
		}
		/**
		* 切换 MCP 服务器启用/禁用状态
		* 通过 shared ACP client 发送广播请求到 Extension Host
		*
		* @param serverName 服务器名称
		* @param enabled 是否启用
		*/
		async toggleMcpServer(serverName, enabled) {
			this.log(`Toggling MCP server: ${serverName}, enabled: ${enabled}`);
			try {
				await this.sharedAcpClient.sendBroadcastRequest("toggleMcpServer", {
					serverName,
					enabled
				});
				this.log(`toggleMcpServer() completed for: ${serverName}`);
			} catch (error) {
				this.log("toggleMcpServer() failed:", error);
				throw error;
			}
		}
		/**
		* 重新连接 MCP 服务器
		* 通过 shared ACP client 发送广播请求到 Extension Host
		*
		* @param serverName 服务器名称
		* @param forceHttpCallback 是否强制使用 HTTP 回调（忽略 mcpSchemaUrl 配置）
		*/
		async reconnectMcpServer(serverName, forceHttpCallback) {
			this.log(`Reconnecting MCP server: ${serverName}, forceHttpCallback: ${forceHttpCallback}`);
			try {
				await this.sharedAcpClient.sendBroadcastRequest("reconnectMcpServer", {
					serverName,
					forceHttpCallback
				});
				this.log(`reconnectMcpServer() completed for: ${serverName}`);
			} catch (error) {
				this.log("reconnectMcpServer() failed:", error);
				throw error;
			}
		}
		/**
		* 删除 MCP 服务器配置
		* 通过 shared ACP client 发送广播请求到 Extension Host
		*
		* @param serverName 服务器名称
		*/
		async deleteMcpServer(serverName) {
			this.log(`Deleting MCP server: ${serverName}`);
			try {
				await this.sharedAcpClient.sendBroadcastRequest("deleteMcpServer", { serverName });
				this.log(`deleteMcpServer() completed for: ${serverName}`);
			} catch (error) {
				this.log("deleteMcpServer() failed:", error);
				throw error;
			}
		}
		/**
		* 切换单个 MCP Tool 的启用/禁用状态
		* 通过 shared ACP client 发送广播请求到 Extension Host
		*
		* @param serverName 服务器名称
		* @param toolName 工具名称
		*/
		async toggleToolStatus(serverName, toolName) {
			this.log(`Toggling MCP tool status: ${serverName}/${toolName}`);
			try {
				await this.sharedAcpClient.sendBroadcastRequest("toggleToolStatus", {
					serverName,
					toolName
				});
				this.log(`toggleToolStatus() completed for: ${serverName}/${toolName}`);
			} catch (error) {
				this.log("toggleToolStatus() failed:", error);
				throw error;
			}
		}
		/**
		* 打开 MCP 配置文件
		* 通过 shared ACP client 发送广播请求到 Extension Host
		* Extension Host 调用 VS Code 命令打开配置文件
		*/
		async openMcpConfig() {
			this.log("Opening MCP config");
			try {
				await this.sharedAcpClient.sendBroadcastRequest("openMcpConfig", {});
				this.log("openMcpConfig() completed");
			} catch (error) {
				this.log("openMcpConfig() failed:", error);
				throw error;
			}
		}
		/**
		* 获取 MCP 配置文件内容
		* 通过 shared ACP client 发送广播请求到 Extension Host
		* @returns 配置文件路径和内容
		*/
		async getMcpConfigContent() {
			this.log("Getting MCP config content");
			try {
				const result = await this.sharedAcpClient.sendBroadcastRequest("getMcpConfigContent", {});
				this.log("getMcpConfigContent() completed:", result.filePath);
				return result;
			} catch (error) {
				this.log("getMcpConfigContent() failed:", error);
				throw error;
			}
		}
		/**
		* 保存 MCP 配置文件内容
		* 通过 shared ACP client 发送广播请求到 Extension Host
		* @param content 新的配置内容
		*/
		async saveMcpConfigContent(content) {
			this.log("Saving MCP config content");
			try {
				await this.sharedAcpClient.sendBroadcastRequest("saveMcpConfigContent", { content });
				this.log("saveMcpConfigContent() completed");
			} catch (error) {
				this.log("saveMcpConfigContent() failed:", error);
				throw error;
			}
		}
		/**
		* 读取系统剪贴板文本
		* 通过 shared ACP client 发送广播请求到 Extension Host
		* @returns 剪贴板文本内容
		*/
		async clipboardReadText() {
			this.log("Reading clipboard text");
			try {
				const result = await this.sharedAcpClient.sendBroadcastRequest("clipboardReadText", {});
				this.log("clipboardReadText() completed");
				return result?.text ?? "";
			} catch (error) {
				this.log("clipboardReadText() failed:", error);
				throw error;
			}
		}
		/**
		* 获取 Connector 配置列表
		* 通过 shared ACP client 发送广播请求到 Extension Host
		*
		* @returns Connector 配置列表
		*/
		async getConnectorConfigs() {
			console.log("[LocalProvider:L3] getConnectorConfigs called");
			this.log("Getting Connector configs");
			try {
				console.log("[LocalProvider:L3] calling sharedAcpClient.sendBroadcastRequest(\"getConnectorConfigs\")...");
				const result = await this.sharedAcpClient.sendBroadcastRequest("getConnectorConfigs", {});
				console.log("[LocalProvider:L3] sendBroadcastRequest returned:", JSON.stringify(result).substring(0, 500));
				this.log(`Got ${result.configs?.length ?? 0} Connector configs`);
				return (result.configs ?? []).map((c) => ({
					...c,
					icon: c.icon || c.iconUrl || ""
				}));
			} catch (error) {
				this.log("getConnectorConfigs() failed:", error);
				return [];
			}
		}
		/**
		* 获取 Connector 状态列表
		* 通过 shared ACP client 发送广播请求到 Extension Host
		*
		* @returns Connector 状态映射
		*/
		async getConnectorStates() {
			this.log("Getting Connector states");
			try {
				const result = await this.sharedAcpClient.sendBroadcastRequest("getConnectorStates", {});
				this.log(`Got Connector states for ${Object.keys(result.states ?? {}).length} connectors`);
				return result.states ?? {};
			} catch (error) {
				this.log("getConnectorStates() failed:", error);
				return {};
			}
		}
		/**
		* 连接 Connector
		* 通过 shared ACP client 发送广播请求到 Extension Host
		* 会写入 MCP 配置、连接 MCP Server、并安装关联的 Skills
		*
		* @param configId Connector 配置 ID
		* @returns 操作结果
		*/
		async connectConnector(configId) {
			this.log(`Connecting Connector: ${configId}`);
			try {
				const result = await this.sharedAcpClient.sendBroadcastRequest("connectConnector", { configId });
				this.log("connectConnector() result:", result);
				return {
					success: result?.success ?? false,
					error: result?.error
				};
			} catch (error) {
				this.log("connectConnector() failed:", error);
				return {
					success: false,
					error: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		/**
		* 更新 Connector 的 MCP headers
		* 用于用户手动填写认证 headers（如 API Key/Token）
		*/
		async updateConnectorHeaders(configId, headers) {
			this.log(`Updating Connector headers: ${configId}`);
			try {
				const result = await this.sharedAcpClient.sendBroadcastRequest("updateConnectorHeaders", {
					configId,
					headers
				});
				this.log("updateConnectorHeaders() result:", result);
				return {
					success: result?.success ?? false,
					error: result?.error
				};
			} catch (error) {
				this.log("updateConnectorHeaders() failed:", error);
				return {
					success: false,
					error: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		/**
		* 更新 Connector 的 MCP 环境变量
		* 用于用户手动填写环境变量
		*/
		async updateConnectorEnv(configId, env) {
			this.log(`Updating Connector env: ${configId}`);
			try {
				const result = await this.sharedAcpClient.sendBroadcastRequest("updateConnectorEnv", {
					configId,
					env
				});
				this.log("updateConnectorEnv() result:", result);
				return {
					success: result?.success ?? false,
					error: result?.error
				};
			} catch (error) {
				this.log("updateConnectorEnv() failed:", error);
				return {
					success: false,
					error: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		/**
		* 断开 Connector
		* 通过 shared ACP client 发送广播请求到 Extension Host
		* 会断开 MCP 连接、禁用 MCP 配置、并卸载关联的 Skills
		*
		* @param configId Connector 配置 ID
		* @returns 操作结果
		*/
		async disconnectConnector(configId) {
			this.log(`Disconnecting Connector: ${configId}`);
			try {
				const result = await this.sharedAcpClient.sendBroadcastRequest("disconnectConnector", { configId });
				this.log("disconnectConnector() result:", result);
				return {
					success: result?.success ?? false,
					error: result?.error
				};
			} catch (error) {
				this.log("disconnectConnector() failed:", error);
				return {
					success: false,
					error: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		/**
		* 解绑 Connector（删除 OAuth 授权 + 断开连接）
		* 通过 shared ACP client 发送广播请求到 Extension Host
		*
		* @param configId Connector 配置 ID
		* @returns 操作结果
		*/
		async unbindConnector(configId) {
			this.log(`Unbinding Connector: ${configId}`);
			try {
				const result = await this.sharedAcpClient.sendBroadcastRequest("unbindConnector", { configId });
				this.log("unbindConnector() result:", result);
				return {
					success: result?.success ?? false,
					error: result?.error
				};
			} catch (error) {
				this.log("unbindConnector() failed:", error);
				return {
					success: false,
					error: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		/**
		* 彻底断开 Connector，回到从未连接过的初始状态
		* 通过 shared ACP client 发送广播请求到 Extension Host
		*
		* @param configId Connector 配置 ID
		* @returns 操作结果
		*/
		async resetConnector(configId) {
			this.log(`Resetting Connector: ${configId}`);
			try {
				const result = await this.sharedAcpClient.sendBroadcastRequest("resetConnector", { configId });
				this.log("resetConnector() result:", result);
				return {
					success: result?.success ?? false,
					error: result?.error
				};
			} catch (error) {
				this.log("resetConnector() failed:", error);
				return {
					success: false,
					error: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		/**
		* 检查 Connector 是否有本地 OAuth token
		* 通过 shared ACP client 发送广播请求到 Extension Host
		*
		* @param configId Connector 配置 ID
		* @returns 是否有 OAuth token
		*/
		async hasConnectorOAuthToken(configId) {
			try {
				return (await this.sharedAcpClient.sendBroadcastRequest("hasConnectorOAuthToken", { configId }))?.hasToken ?? false;
			} catch (error) {
				this.log("hasConnectorOAuthToken() failed:", error);
				return false;
			}
		}
		/**
		* 刷新 Connector 配置
		* 通过 shared ACP client 发送广播请求到 Extension Host
		*
		* @param force 是否强制刷新（忽略缓存）
		*/
		async refreshConnectors(force) {
			this.log(`Refreshing Connectors, force: ${force}`);
			try {
				await this.sharedAcpClient.sendBroadcastRequest("refreshConnectors", { force });
				this.log("refreshConnectors() completed");
			} catch (error) {
				this.log("refreshConnectors() failed:", error);
				throw error;
			}
		}
		log(...args) {
			if (this.options.debug) console.log("[LocalAgentProvider]", ...args);
		}
	};
}));
//#endregion
//#region ../../packages/agent-provider/src/common/providers/local-agent-provider/index.ts
var init_local_agent_provider = __esmMin((() => {
	init_local_connection();
	init_local_provider();
	init_local_filesystem();
	init_acp();
}));
//#endregion
//#region ../../packages/agent-provider/src/common/providers/index.ts
var init_providers = __esmMin((() => {
	init_cloud_agent_provider();
	init_local_agent_provider();
}));
//#endregion
//#region ../../packages/agent-provider/src/common/client/session.ts
var ActiveSessionImpl;
var init_session = __esmMin((() => {
	ActiveSessionImpl = class {
		/**
		* Create an ActiveSessionImpl instance
		*
		* @param sessionId - Session ID
		* @param agentId - Agent ID
		* @param connection - Already connected AgentConnection
		* @param options - Additional options
		*/
		constructor(sessionId, agentId, connection, options = {}) {
			this._availableCommands = [];
			this.listeners = /* @__PURE__ */ new Map();
			this.onceListeners = /* @__PURE__ */ new Map();
			this.connectionListeners = [];
			this._id = sessionId;
			this._agentId = agentId;
			this.connection = connection;
			this.logger = options.logger;
			this._getFilesystem = options.getFilesystem;
			this._connectionInfo = options.connectionInfo;
			this.setupConnectionEvents(connection);
			this.agent = this.createAgentOperations();
			this.prompts = this.createPromptsResource();
			this.artifacts = this.createArtifactsResource();
			this.files = this.createFilesResource();
		}
		/**
		* Session ID
		*/
		get id() {
			return this._id;
		}
		/**
		* Agent ID
		*/
		get agentId() {
			return this._agentId;
		}
		/**
		* Actual workspace path (set from newSession response _meta)
		*/
		get cwd() {
			return this._cwd;
		}
		/**
		* Set actual workspace path (called by SessionManager after createSession)
		*/
		setCwd(cwd) {
			this._cwd = cwd;
		}
		/**
		* Agent state (live connection state)
		* Returns LocalAgentState or CloudAgentState based on transport type
		*/
		get agentState() {
			return {
				id: this._agentId,
				status: this.connection.state,
				capabilities: this.connection.capabilities,
				type: this.connection.transport,
				cwd: this.connection.cwd || ""
			};
		}
		/**
		* Get agent capabilities (available after connection)
		*/
		get capabilities() {
			return this.connection.capabilities;
		}
		/**
		* Available session modes
		*/
		get availableModes() {
			return this._availableModes;
		}
		/**
		* Current session mode
		*/
		get currentMode() {
			return this._currentMode;
		}
		/**
		* Available models for this session
		*/
		get availableModels() {
			return this._availableModels;
		}
		/**
		* Current model ID
		*/
		get currentModelId() {
			return this._currentModelId;
		}
		/**
		* Available slash commands
		*
		* When Agent sends available_commands_update, this list is automatically updated.
		* Commands can be accessed directly without waiting for events.
		*/
		get availableCommands() {
			return this._availableCommands;
		}
		/**
		* Set available commands (called when available_commands_update is received)
		*/
		setAvailableCommands(commands) {
			this._availableCommands = commands;
			this.logger?.info(`Session ${this._id}: Available commands updated, count: ${commands.length}`);
		}
		/**
		* Check if the session is active
		*/
		get isActive() {
			return this.connection.isInitialized;
		}
		/**
		* Session connection information (only available for cloud sessions)
		* 会话连接信息，包括sandboxId、link、token等
		*/
		get connectionInfo() {
			return this._connectionInfo;
		}
		/**
		* Set session modes (called after create/load)
		*/
		setModes(availableModes, currentMode) {
			this._availableModes = availableModes;
			this._currentMode = currentMode;
		}
		/**
		* Set available models (called after create/load)
		*/
		setModels(availableModels, currentModelId) {
			this._availableModels = availableModels;
			this._currentModelId = currentModelId;
		}
		createAgentOperations() {
			const self = this;
			return {
				get id() {
					return self._agentId;
				},
				get state() {
					return self.agentState;
				},
				get isConnected() {
					return self.connection.isInitialized;
				},
				get capabilities() {
					return self.connection.capabilities;
				}
			};
		}
		createPromptsResource() {
			return {
				send: async (params) => {
					const response = await this.getConnectionOrThrow().prompt(this._id, params);
					return this.mapPromptResponse(response);
				},
				stream: (params) => {
					return this.getConnectionOrThrow().promptStream(this._id, params);
				},
				cancel: async () => {
					await this.getConnectionOrThrow().cancel(this._id);
				},
				rollback: async (request) => {
					try {
						const connection = this.getConnectionOrThrow();
						if (typeof connection.rollback !== "function") return {
							applied: false,
							error: "rollback not supported by connection"
						};
						return await connection.rollback(request);
					} catch (err) {
						return {
							applied: false,
							error: String(err)
						};
					}
				}
			};
		}
		createArtifactsResource() {
			const notSupported = () => {
				throw new Error("Artifact management is no longer supported through this API");
			};
			return {
				list: async (_params) => {
					notSupported();
					return [];
				},
				retrieve: async (_artifactId) => {
					notSupported();
				},
				content: async (_artifactId) => {
					notSupported();
					return "";
				}
			};
		}
		/**
		* Create files resource with lazy-loaded filesystem
		*
		* The filesystem is lazily loaded on first use to avoid unnecessary
		* connections to the sandbox. The actual filesystem instance is obtained
		* via the getter function provided by SessionManager.
		*/
		createFilesResource() {
			const self = this;
			let filesPromise = null;
			/**
			* Get or create the filesystem instance
			*/
			const getFs = async () => {
				if (!self._getFilesystem) throw new Error("Filesystem not available: provider does not support filesystem operations");
				if (!filesPromise) filesPromise = self._getFilesystem();
				return filesPromise;
			};
			return {
				read: (async (path, opts) => (await getFs()).read(path, opts)),
				write: (async (pathOrFiles, dataOrOpts, opts) => {
					const fs = await getFs();
					if (Array.isArray(pathOrFiles)) return fs.write(pathOrFiles, dataOrOpts);
					return fs.write(pathOrFiles, dataOrOpts, opts);
				}),
				list: async (path, opts) => (await getFs()).list(path, opts),
				exists: async (path, opts) => (await getFs()).exists(path, opts),
				makeDir: async (path, opts) => (await getFs()).makeDir(path, opts),
				remove: async (path, opts) => (await getFs()).remove(path, opts),
				rename: async (oldPath, newPath, opts) => (await getFs()).rename(oldPath, newPath, opts),
				getInfo: async (path, opts) => (await getFs()).getInfo(path, opts),
				watchDir: async (path, onEvent, opts) => (await getFs()).watchDir(path, onEvent, opts)
			};
		}
		/**
		* Resolve a permission request
		*/
		resolvePermission(requestId, optionId) {
			return this.connection.resolvePermission(requestId, optionId);
		}
		/**
		* Reject a permission request
		*/
		rejectPermission(requestId, reason) {
			return this.connection.rejectPermission(requestId, reason);
		}
		/**
		* Answer a question request with user's selections
		*/
		answerQuestion(toolCallId, answers) {
			return this.connection.answerQuestion(toolCallId, answers);
		}
		/**
		* Cancel a question request
		*/
		cancelQuestion(toolCallId, reason) {
			return this.connection.cancelQuestion(toolCallId, reason);
		}
		/**
		* Callback for tool operations (approve / skip / cancel)
		* @param toolCallId Tool call ID
		* @param toolName Tool name
		* @param action Action to perform ('approve' / 'skip' / 'cancel')
		*/
		async toolCallback(toolCallId, toolName, action) {
			return await this.getConnectionOrThrow().toolCallback(this._id, toolCallId, toolName, action);
		}
		/**
		* Set the current session mode
		*
		* @param modeId - The mode ID to switch to (must be in availableModes)
		* @throws Error if modeId is not in availableModes or connection fails
		*
		* @example
		* ```typescript
		* // Switch to 'code' mode
		* await session.setMode('code');
		*
		* // Switch to 'architect' mode
		* await session.setMode('architect');
		* ```
		*/
		async setMode(modeId, skipAvailableChecker) {
			if (this._availableModes && !skipAvailableChecker) {
				if (!this._availableModes.some((m) => m.id === modeId)) {
					const availableIds = this._availableModes.map((m) => m.id).join(", ");
					throw new Error(`Invalid modeId: "${modeId}". Available modes: ${availableIds}`);
				}
			}
			await this.getConnectionOrThrow().setSessionMode(this._id, modeId);
			this._currentMode = modeId;
		}
		/**
		* Set the current session model
		*
		* @param modelId - The model ID to switch to
		* @example
		* ```typescript
		* // Switch to Claude Sonnet 4
		* await session.setSessionModel('claude-sonnet-4-20250514');
		*
		* // Switch to GPT-4o
		* await session.setSessionModel('gpt-4o');
		* ```
		*/
		async setSessionModel(modelId) {
			this._currentModelId = modelId;
			await this.getConnectionOrThrow().setSessionModel(this._id, modelId);
		}
		async setSessionConfigOption(configId, value) {
			const connection = this.getConnectionOrThrow();
			if (typeof connection.setSessionConfigOption !== "function") throw new Error(`setSessionConfigOption is not supported by current connection: sessionId=${this._id}, configId=${configId}`);
			await connection.setSessionConfigOption(this._id, configId, value);
		}
		/**
		* Subscribe to session events
		*/
		on(event, handler) {
			if (!this.listeners.has(event)) this.listeners.set(event, /* @__PURE__ */ new Set());
			this.listeners.get(event).add(handler);
			return this;
		}
		/**
		* Unsubscribe from session events
		*/
		off(event, handler) {
			const eventListeners = this.listeners.get(event);
			if (eventListeners) eventListeners.delete(handler);
			const onceEventListeners = this.onceListeners.get(event);
			if (onceEventListeners) onceEventListeners.delete(handler);
			return this;
		}
		/**
		* Subscribe to a session event once
		*/
		once(event, handler) {
			if (!this.onceListeners.has(event)) this.onceListeners.set(event, /* @__PURE__ */ new Set());
			this.onceListeners.get(event).add(handler);
			return this;
		}
		/**
		* Emit an event to all registered listeners
		*/
		emit(event, data) {
			const regularListeners = this.listeners.get(event);
			const onceEventListeners = this.onceListeners.get(event);
			let hasListeners = false;
			if (regularListeners && regularListeners.size > 0) {
				hasListeners = true;
				for (const listener of regularListeners) try {
					const result = listener(data);
					if (result instanceof Promise) result.catch((err) => {
						console.error(`Error in async event listener for '${String(event)}':`, err);
					});
				} catch (err) {
					console.error(`Error in event listener for '${String(event)}':`, err);
				}
			}
			if (onceEventListeners && onceEventListeners.size > 0) {
				hasListeners = true;
				const listenersToCall = Array.from(onceEventListeners);
				this.onceListeners.delete(event);
				for (const listener of listenersToCall) try {
					const result = listener(data);
					if (result instanceof Promise) result.catch((err) => {
						console.error(`Error in async once event listener for '${String(event)}':`, err);
					});
				} catch (err) {
					console.error(`Error in once event listener for '${String(event)}':`, err);
				}
			}
			return hasListeners;
		}
		/**
		* Remove all listeners for an event
		*/
		removeAllListeners(event) {
			if (event !== void 0) {
				this.listeners.delete(event);
				this.onceListeners.delete(event);
			} else {
				this.listeners.clear();
				this.onceListeners.clear();
			}
		}
		/**
		* Disconnect from the session/agent
		*/
		disconnect() {
			this.removeConnectionListeners();
			this.connection.disconnect();
			this.removeAllListeners();
			this.logger?.info(`Session ${this._id}: Disconnected`);
		}
		/**
		* Detach the session from connection events without disconnecting the connection.
		* This should be called when the session is being replaced but the connection is shared.
		* Unlike disconnect(), this only removes event listeners without closing the connection.
		*/
		detach() {
			this.logger?.info(`Session ${this._id}: Detaching from connection events`);
			this.removeConnectionListeners();
			this.removeAllListeners();
			this.logger?.info(`Session ${this._id}: Detached successfully`);
		}
		/**
		* Symbol.dispose for 'using' keyword support
		* Automatically disconnects and cleans up when session goes out of scope
		*
		* @example
		* ```typescript
		* {
		*     using session = await client.sessions.new({ cwd: '/workspace' });
		*     // ... use session
		* } // session automatically disposed
		* ```
		*/
		[Symbol.dispose]() {
			this.disconnect();
		}
		getConnectionOrThrow() {
			if (!this.connection.isInitialized) throw new Error(`Session ${this._id}: Connection not initialized.`);
			return this.connection;
		}
		/**
		* 在 connection 上注册 listener 并保存引用，便于 disconnect 时移除
		*/
		addConnectionListener(connection, event, listener) {
			connection.on(event, listener);
			this.connectionListeners.push({
				event,
				listener
			});
		}
		/**
		* 从 connection 上移除所有本 session 注册的 listener
		*/
		removeConnectionListeners() {
			for (const { event, listener } of this.connectionListeners) this.connection.off(event, listener);
			this.connectionListeners = [];
		}
		setupConnectionEvents(connection) {
			this.addConnectionListener(connection, "connected", () => {
				this.emit("connected", void 0);
			});
			this.addConnectionListener(connection, "disconnected", () => {
				this.emit("disconnected", void 0);
			});
			this.addConnectionListener(connection, "error", (error) => {
				this.emit("error", error);
			});
			this.addConnectionListener(connection, "sessionUpdate", (update) => {
				const notificationSessionId = update?.sessionId;
				if (notificationSessionId && notificationSessionId !== this._id) {
					console.log(`[RT-DEBUG][AgentMgr:Session] sessionUpdate SKIPPED: notifSessionId mismatch, notif=${notificationSessionId?.substring(0, 8)}, my=${this._id?.substring(0, 8)}`);
					return;
				}
				this.emit("sessionUpdate", update);
			});
			this.addConnectionListener(connection, "artifactCreated", (artifact) => {
				if (!this.shouldForwardArtifact(artifact)) return;
				this.emit("artifactCreated", artifact);
			});
			this.addConnectionListener(connection, "artifactUpdated", (artifact) => {
				if (!this.shouldForwardArtifact(artifact)) return;
				this.emit("artifactUpdated", artifact);
			});
			this.addConnectionListener(connection, "artifactDeleted", (artifact) => {
				if (!this.shouldForwardArtifact(artifact)) return;
				this.emit("artifactDeleted", artifact);
			});
			this.addConnectionListener(connection, "permissionRequest", (request) => {
				this.emit("permissionRequest", request);
			});
			this.addConnectionListener(connection, "questionRequest", (request) => {
				this.emit("questionRequest", request);
			});
			this.addConnectionListener(connection, "questionCancelled", () => {
				this.prompts.cancel();
			});
			this.addConnectionListener(connection, "checkpointCreated", (checkpoint) => {
				const originSessionId = checkpoint.__sessionId;
				if (originSessionId && originSessionId !== this._id) return;
				this.emit("checkpointCreated", checkpoint);
			});
			this.addConnectionListener(connection, "checkpointUpdated", (checkpoint) => {
				const originSessionId = checkpoint.__sessionId;
				if (originSessionId && originSessionId !== this._id) return;
				this.emit("checkpointUpdated", checkpoint);
			});
			this.addConnectionListener(connection, "command", (command) => {
				const originSessionId = command.__sessionId;
				if (originSessionId && originSessionId !== this._id) {
					console.log("[Session] Command not forwarded:", {
						command,
						originSessionId,
						sessionId: this._id
					});
					return;
				}
				this.emit("command", command);
			});
		}
		mapPromptResponse(response) {
			return {
				stopReason: response.stopReason,
				_meta: response._meta ?? void 0
			};
		}
		/**
		* 判断 artifact 是否应该转发给当前 session
		* 所有类型的 artifact 都按 __sessionId 严格隔离
		*/
		shouldForwardArtifact(artifact) {
			const originSessionId = artifact.__sessionId;
			if (!originSessionId || originSessionId !== this._id) return false;
			return true;
		}
	};
}));
//#endregion
//#region ../../packages/agent-provider/src/common/client/session-manager.ts
var SessionManager;
var init_session_manager = __esmMin((() => {
	init_common$1();
	init_session();
	SessionManager = class {
		constructor(options) {
			this.pendingConnections = /* @__PURE__ */ new Map();
			this.provider = options.provider;
			this.logger = options.logger;
		}
		/**
		* List all sessions with pagination info (mapped from agents)
		*
		* Each agent maps to a session. The sessionId is derived from the agent.
		* Cloud: Returns server-side filtered/sorted/paginated results
		* Local: Returns client-side filtered/sorted results (synthetic pagination)
		*
		* @param options - Optional query parameters for filtering, sorting, and pagination
		*/
		async listSessions(options) {
			const result = await this.provider.list(options);
			const sessions = result.agents.map((agent) => ({
				id: agent.id,
				agentId: agent.id,
				name: agent.name,
				status: agent.status,
				createdAt: agent.createdAt,
				updatedAt: agent.updatedAt,
				lastActivityAt: agent.updatedAt,
				cwd: agent.type === "local" ? agent.cwd : void 0,
				isPlayground: agent.isPlayground,
				isUserDefinedTitle: agent.isUserDefinedTitle,
				conversationOrigin: agent.conversationOrigin
			}));
			console.log("[SessionManager] Returning sessions:", {
				count: sessions.length,
				pagination: result.pagination
			});
			return {
				agents: sessions,
				pagination: result.pagination
			};
		}
		/**
		* 按 ID 批量获取会话，用于置顶等窗口外兜底拉取。
		*
		* 优先使用 provider.batchGet（POST /conversations/batch-get，#51874），
		* 若 provider 不支持则 fallback 到逐个 provider.get（限并发 8）。
		*
		* **关键区分**（#50748 误删 localStorage 修复）：
		* - 后端未返回的 id = **确认会话已删除/无权限** → 计入 `missingIds`，
		*   供上层精确清理脏置顶项。
		* - 整体请求失败（网络错误等） = **拉取失败但会话可能仍存在**，
		*   既不计入结果也**不计入 missingIds**，绝不能据此删用户的置顶项。
		*
		* 返回 `{ sessions, missingIds }`：sessions 是成功拉到的；missingIds 仅含「确认删除」的 id。
		*/
		async getSessionsByIds(ids) {
			const uniqueIds = Array.from(new Set(ids.filter(Boolean)));
			if (uniqueIds.length === 0) return {
				sessions: [],
				missingIds: []
			};
			if (this.provider.batchGet) try {
				const { agents, missingIds } = await this.provider.batchGet(uniqueIds);
				return {
					sessions: agents.map((agent) => ({
						id: agent.id,
						agentId: agent.id,
						name: agent.name,
						status: agent.status,
						createdAt: agent.createdAt,
						updatedAt: agent.updatedAt,
						lastActivityAt: agent.updatedAt,
						cwd: agent.type === "local" ? agent.cwd : void 0,
						isPlayground: agent.isPlayground,
						isUserDefinedTitle: agent.isUserDefinedTitle
					})),
					missingIds
				};
			} catch (error) {
				this.logger?.warn("[SessionManager] batchGet failed, falling back to sequential get:", String(error));
			}
			const CONCURRENCY = 8;
			const sessions = [];
			const missingIds = [];
			for (let i = 0; i < uniqueIds.length; i += CONCURRENCY) {
				const batch = uniqueIds.slice(i, i + CONCURRENCY);
				const results = await Promise.all(batch.map(async (id) => {
					try {
						return {
							id,
							agent: await this.provider.get(id),
							failed: false
						};
					} catch (error) {
						this.logger?.warn(`[SessionManager] getSessionsByIds: failed to get ${id}`, String(error));
						return {
							id,
							agent: void 0,
							failed: true
						};
					}
				}));
				for (const { id, agent, failed } of results) if (agent) sessions.push({
					id: agent.id,
					agentId: agent.id,
					name: agent.name,
					status: agent.status,
					createdAt: agent.createdAt,
					updatedAt: agent.updatedAt,
					lastActivityAt: agent.updatedAt,
					cwd: agent.type === "local" ? agent.cwd : void 0,
					isPlayground: agent.isPlayground,
					isUserDefinedTitle: agent.isUserDefinedTitle
				});
				else if (!failed) missingIds.push(id);
			}
			return {
				sessions,
				missingIds
			};
		}
		/**
		* Create a new session
		*
		* Steps:
		* 1. Create new agent (if provider supports it) or use existing
		* 2. Connect to agent
		* 3. Call ACP newSession
		* 4. Register session mapping (for LocalAgentProvider)
		* 5. Return ActiveSession instance
		*/
		async createSession(params) {
			this.logger?.info("Creating new session");
			let agentId;
			if (this.provider.create) {
				agentId = await this.provider.create(params);
				this.logger?.debug(`Created new agent: ${agentId}`);
				if (params.options?.onSessionPrepared) {
					const initialPrompt = params.options?.prompt;
					const initialTitle = initialPrompt?.slice(0, 50) || "";
					params.options.onSessionPrepared({
						id: agentId,
						agentId,
						name: initialTitle + (initialPrompt && initialPrompt.length > 50 ? "..." : ""),
						status: "connecting",
						cwd: params.cwd || "",
						createdAt: /* @__PURE__ */ new Date()
					});
					this.logger?.debug(`Called onSessionPrepared for: ${agentId}`);
				}
			} else throw new Error("Provider does not support creating agents. Use sessions.load() with an existing sessionId.");
			const connection = await this.provider.connect(agentId);
			this.logger?.debug(`Connected to agent: ${agentId}`);
			let response;
			try {
				response = await connection.createSession({
					_meta: params.options?._meta,
					cwd: params.cwd,
					mcpServers: params.options?.mcpServers
				});
			} catch (err) {
				this.pendingConnections.set(agentId, connection);
				this.logger?.debug(`Cached pending connection for agent: ${agentId}`);
				if (err instanceof SessionError) {
					const sessionError = err;
					throw new SessionError(sessionError.message, sessionError.sessionId, agentId, sessionError.cause instanceof Error ? sessionError.cause : void 0);
				}
				const cause = err instanceof Error ? err : new Error(String(err));
				throw new SessionError(`Failed to create session: ${cause.message}`, void 0, agentId, cause);
			}
			return this.buildActiveSession(response, agentId, connection, params);
		}
		/**
		* Retry creating a session after initial session/new request failed.
		*
		* Use this when `sessions.create()` fails at the `session/new` step
		* (after agent creation and connection establishment succeeded).
		* The caller retrieves `agentId` from the thrown `SessionError.agentId`,
		* then calls this method to re-attempt only the `session/new` request
		* while reusing the already-initialized connection (no re-connect).
		*
		* @experimental This API is subject to change
		*
		* @param agentId - Agent ID from the failed SessionError
		* @param params - Original create session params (cwd, mcpServers, etc.)
		* @returns ActiveSession on success
		* @throws SessionError if session/new fails again
		*
		* @example
		* ```typescript
		* try {
		*   const session = await client.sessions.create({ cwd: '/workspace' });
		* } catch (err) {
		*   if (err instanceof SessionError && err.agentId) {
		*     // Retry with custom logic
		*     for (let i = 0; i < 3; i++) {
		*       try {
		*         const session = await client.sessions.retryNewSession(err.agentId, { cwd: '/workspace' });
		*         break; // success
		*       } catch (retryErr) {
		*         await new Promise(r => setTimeout(r, 1000 * (i + 1)));
		*       }
		*     }
		*   }
		* }
		* ```
		*/
		async retryNewSession(agentId, params) {
			this.logger?.info(`Retrying session/new for agent: ${agentId}`);
			const connection = this.pendingConnections.get(agentId);
			if (!connection) throw new SessionError(`No pending connection found for agent: ${agentId}. retryNewSession() can only be called after a failed sessions.create().`, void 0, agentId);
			this.logger?.debug(`Reusing cached connection for agent: ${agentId}`);
			const response = await connection.createSession({
				_meta: params.options?._meta,
				cwd: params.cwd,
				mcpServers: params.options?.mcpServers
			});
			this.pendingConnections.delete(agentId);
			this.logger?.debug(`Cleared pending connection for agent: ${agentId}`);
			return this.buildActiveSession(response, agentId, connection, params);
		}
		/**
		* Build an ActiveSession from a NewSessionResponse.
		* Shared by createSession() and retryNewSession().
		*/
		buildActiveSession(response, agentId, connection, params) {
			if (this.provider.registerSession) {
				this.provider.registerSession(response.sessionId, agentId);
				this.logger?.debug(`Registered session mapping: ${response.sessionId} → ${agentId}`);
			}
			const connectionInfo = connection.sessionConnectionInfo;
			const session = new ActiveSessionImpl(response.sessionId, agentId, connection, {
				logger: this.logger,
				getFilesystem: this.provider.filesystem ? () => this.provider.filesystem.getFilesystem(response.sessionId) : void 0,
				connectionInfo
			});
			session.setModes(response.modes?.availableModes, response.modes?.currentModeId);
			const availableModels = this.extractAvailableModels(response);
			if (availableModels) session.setModels(availableModels, response.models?.currentModelId);
			const responseCwd = response._meta?.["codebuddy.ai"]?.cwd;
			if (responseCwd) session.setCwd(responseCwd);
			this.logger?.info(`Session created: ${response.sessionId}`);
			return session;
		}
		/**
		* Load an existing session
		*
		* Steps:
		* 1. Check cache for existing session
		* 2. Find agent by sessionId (sessionId === agentId in current design)
		* 3. Connect to agent
		* 4. Create ActiveSession instance
		* 5. Execute onSessionCreated callback (if provided) to allow early setup (e.g., event listeners)
		* 6. Call ACP loadSession
		* 7. Return ActiveSession instance (cached)
		*/
		async loadSession(params) {
			this.logger?.info(`Loading session: ${params.sessionId}`);
			const agentId = params.sessionId;
			const agentState = await this.provider.get(agentId);
			if (!agentState) throw new Error(`Session not found: ${params.sessionId}`);
			const connection = await this.provider.connect(agentId);
			this.logger?.debug(`Connected to agent: ${agentId}`);
			const connectionInfo = connection.sessionConnectionInfo;
			const session = new ActiveSessionImpl(params.sessionId, agentId, connection, {
				logger: this.logger,
				getFilesystem: this.provider.filesystem ? () => this.provider.filesystem.getFilesystem(params.sessionId) : void 0,
				connectionInfo
			});
			if (params.onSessionCreated) await params.onSessionCreated(session);
			const response = await connection.loadSession({
				sessionId: params.sessionId,
				cwd: agentState.type === "local" ? agentState.cwd : params.cwd,
				mcpServers: params.mcpServers
			});
			session.setModes(response.modes?.availableModes, response.modes?.currentModeId);
			const loadResponse = response;
			const availableModels = this.extractAvailableModels(loadResponse);
			if (availableModels) session.setModels(availableModels, loadResponse.models?.currentModelId);
			this.logger?.info(`Session loaded: ${params.sessionId}`);
			return session;
		}
		/**
		* 从 ACP response 中提取可用模型列表
		*
		* 优先级:
		* 1. response.models._meta?.['codebuddy.ai']?.availableModels - 包含完整的模型信息（字段名为 'id'）
		* 2. response.models?.availableModels - 只包含基本信息（字段名为 'modelId'）
		* 3. undefined - 都没有时返回 undefined
		*
		* @param response - ACP 响应对象
		* @returns ModelInfo[] | undefined
		*/
		extractAvailableModels(response) {
			const metaModels = (response.models?._meta?.["codebuddy.ai"])?.availableModels;
			if (metaModels && Array.isArray(metaModels) && metaModels.length > 0) return metaModels;
			const availableModels = response.models?.availableModels;
			if (availableModels && Array.isArray(availableModels) && availableModels.length > 0) return availableModels.map((model) => ({
				...model,
				...model._meta?.["codebuddy.ai"] || {}
			}));
		}
	};
}));
//#endregion
//#region ../../packages/agent-provider/src/common/client/client.ts
var AgentClient;
var init_client$1 = __esmMin((() => {
	init_session_manager();
	AgentClient = class {
		constructor(options) {
			this.logger = options.logger;
			this.provider = options.provider;
			this.environmentType = options.environmentType ?? "cloud";
			this.sessionManager = new SessionManager({
				provider: this.provider,
				logger: this.logger
			});
			this.sessions = this.createSessionsResource();
		}
		createSessionsResource() {
			return {
				list: async (options) => this.sessionManager.listSessions(options),
				create: async (params) => this.sessionManager.createSession(params),
				retryNewSession: async (agentId, params) => this.sessionManager.retryNewSession(agentId, params),
				load: async (params) => {
					console.log("[AgentClient] sessions.load called:", params.sessionId);
					return this.sessionManager.loadSession(params);
				},
				getByIds: async (ids) => this.sessionManager.getSessionsByIds(ids),
				archive: async (sessionId) => {
					this.logger?.debug("AgentClient.sessions.archive called", { sessionId });
					try {
						if (this.provider.archive) {
							const result = await this.provider.archive(sessionId);
							this.logger?.info("Session archived successfully", { sessionId });
							return result;
						}
						throw new Error("Provider does not support archive method");
					} catch (error) {
						this.logger?.error("Failed to archive session", error);
						throw error;
					}
				},
				delete: async (sessionId) => {
					this.logger?.debug("AgentClient.sessions.delete called", { sessionId });
					try {
						if (this.provider.delete) {
							const result = await this.provider.delete(sessionId);
							this.logger?.info("Session deleted successfully", { sessionId });
							return result;
						}
						throw new Error("Provider does not support delete method");
					} catch (error) {
						this.logger?.error("Failed to delete session", error);
						throw error;
					}
				},
				rename: async (sessionId, title) => {
					this.logger?.debug("AgentClient.sessions.rename called", {
						sessionId,
						title
					});
					try {
						if (this.provider.rename) {
							const result = await this.provider.rename(sessionId, title);
							this.logger?.info("Session renamed successfully", {
								sessionId,
								title
							});
							return result;
						}
						throw new Error("Provider does not support rename method");
					} catch (error) {
						this.logger?.error("Failed to rename session", error);
						throw error;
					}
				},
				updateStatus: async (sessionId, status) => {
					this.logger?.debug("AgentClient.sessions.updateStatus called", {
						sessionId,
						status
					});
					try {
						if (this.provider.updateStatus) {
							const result = await this.provider.updateStatus(sessionId, status);
							this.logger?.info("Session status updated successfully", {
								sessionId,
								status
							});
							return result;
						}
						throw new Error("Provider does not support updateStatus method");
					} catch (error) {
						this.logger?.error("Failed to update session status", error);
						throw error;
					}
				},
				move: async (sessionId) => {
					this.logger?.debug("AgentClient.sessions.move called", { sessionId });
					try {
						if (this.provider.move) {
							const result = await this.provider.move(sessionId);
							this.logger?.info("Session moved successfully", { sessionId });
							return result;
						}
						throw new Error("Provider does not support move method");
					} catch (error) {
						this.logger?.error("Failed to move session", error);
						throw error;
					}
				},
				initializeWorkspace: async (params) => {
					this.logger?.debug("AgentClient.sessions.initializeWorkspace called", params);
					try {
						if (this.provider.openWorkspace) {
							const result = await this.provider.openWorkspace(params);
							this.logger?.info("Workspace opened successfully", { cwd: params.cwd });
							return result;
						}
						this.logger?.warn("Provider does not support openWorkspace");
						return { success: true };
					} catch (error) {
						this.logger?.error("Failed to initialize workspace", error);
						return {
							success: false,
							error: error instanceof Error ? error.message : "Unknown error"
						};
					}
				},
				requestYieldAfterCurrentStep: async (sessionId) => {
					try {
						if (this.provider?.requestYieldAfterCurrentStep) return await this.provider.requestYieldAfterCurrentStep(sessionId);
						this.logger?.warn("Provider does not support requestYieldAfterCurrentStep");
						return false;
					} catch (error) {
						this.logger?.error("Failed to request yield after current step", error);
						return false;
					}
				},
				getConversationMessageQueue: async (sessionId) => {
					try {
						if (this.provider?.getConversationMessageQueue) return await this.provider.getConversationMessageQueue(sessionId);
						this.logger?.warn("Provider does not support getConversationMessageQueue");
						return;
					} catch (error) {
						this.logger?.warn("Conversation message queue unavailable; using fallback storage", error);
						return;
					}
				},
				saveConversationMessageQueue: async (data) => {
					try {
						if (this.provider?.saveConversationMessageQueue) {
							await this.provider.saveConversationMessageQueue(data);
							return;
						}
						this.logger?.warn("Provider does not support saveConversationMessageQueue");
					} catch (error) {
						this.logger?.error("Failed to save conversation message queue", error);
					}
				},
				enqueueConversationMessageQueueItem: async (sessionId, contentBlocks) => {
					if (!this.provider?.enqueueConversationMessageQueueItem) throw new Error("Provider does not support enqueueConversationMessageQueueItem");
					return this.provider.enqueueConversationMessageQueueItem(sessionId, contentBlocks);
				},
				removeConversationMessageQueueItem: async (sessionId, itemId) => {
					if (!this.provider?.removeConversationMessageQueueItem) throw new Error("Provider does not support removeConversationMessageQueueItem");
					return this.provider.removeConversationMessageQueueItem(sessionId, itemId);
				},
				popConversationMessageQueueItemForEdit: async (sessionId, itemId) => {
					if (!this.provider?.popConversationMessageQueueItemForEdit) throw new Error("Provider does not support popConversationMessageQueueItemForEdit");
					return this.provider.popConversationMessageQueueItemForEdit(sessionId, itemId);
				},
				reorderConversationMessageQueueItems: async (sessionId, orderedIds) => {
					if (!this.provider?.reorderConversationMessageQueueItems) throw new Error("Provider does not support reorderConversationMessageQueueItems");
					return this.provider.reorderConversationMessageQueueItems(sessionId, orderedIds);
				},
				sendConversationMessageQueueItemNow: async (sessionId, itemId) => {
					if (!this.provider?.sendConversationMessageQueueItemNow) throw new Error("Provider does not support sendConversationMessageQueueItemNow");
					return this.provider.sendConversationMessageQueueItemNow(sessionId, itemId);
				},
				activateConversationMessageQueue: async (sessionId) => {
					if (!this.provider?.activateConversationMessageQueue) throw new Error("Provider does not support activateConversationMessageQueue");
					return this.provider.activateConversationMessageQueue(sessionId);
				},
				pauseConversationMessageQueue: async (sessionId, reason) => {
					if (!this.provider?.pauseConversationMessageQueue) throw new Error("Provider does not support pauseConversationMessageQueue");
					return this.provider.pauseConversationMessageQueue(sessionId, reason);
				},
				resumeConversationMessageQueue: async (sessionId) => {
					if (!this.provider?.resumeConversationMessageQueue) throw new Error("Provider does not support resumeConversationMessageQueue");
					return this.provider.resumeConversationMessageQueue(sessionId);
				},
				cancelQueueByConversation: async (conversationId) => {
					if (!this.provider?.cancelQueueByConversation) throw new Error("Provider does not support cancelQueueByConversation");
					return this.provider.cancelQueueByConversation(conversationId);
				},
				getQueueState: async (conversationId) => {
					if (!this.provider?.getQueueState) return null;
					return this.provider.getQueueState(conversationId);
				},
				getCurrentWorkspaces: async (filter) => {
					this.logger?.debug("AgentClient.sessions.getCurrentWorkspaces called", filter);
					try {
						if ("getCurrentWorkspaces" in this.provider && typeof this.provider.getCurrentWorkspaces === "function") {
							const result = await this.provider.getCurrentWorkspaces(filter);
							this.logger?.info("Current workspaces retrieved", { count: result.length });
							return result;
						}
						this.logger?.warn("Provider does not support getCurrentWorkspaces");
						return [];
					} catch (error) {
						this.logger?.error("Failed to get current workspaces", error);
						return [];
					}
				},
				getAutomationSnapshot: async () => {
					try {
						if (this.provider?.getAutomationSnapshot) return await this.provider.getAutomationSnapshot();
						this.logger?.warn("Provider does not support getAutomationSnapshot");
					} catch (error) {
						this.logger?.error("Failed to get automation snapshot", error);
					}
					return {
						automations: [],
						inbox: [],
						runtimeState: {},
						updatedAt: Date.now()
					};
				},
				updateAutomation: async (payload) => {
					try {
						if (this.provider?.updateAutomation) return await this.provider.updateAutomation(payload);
						this.logger?.warn("Provider does not support updateAutomation");
					} catch (error) {
						this.logger?.error("Failed to update automation", error);
						return {
							success: false,
							message: error instanceof Error ? error.message : "Unknown error"
						};
					}
					return {
						success: false,
						message: "Provider does not support updateAutomation"
					};
				},
				deleteAutomation: async (id) => {
					try {
						if (this.provider?.deleteAutomation) return await this.provider.deleteAutomation(id);
						this.logger?.warn("Provider does not support deleteAutomation");
					} catch (error) {
						this.logger?.error("Failed to delete automation", error);
						return {
							success: false,
							message: error instanceof Error ? error.message : "Unknown error"
						};
					}
					return {
						success: false,
						message: "Provider does not support deleteAutomation"
					};
				},
				archiveAutomationInboxItem: async (itemId) => {
					try {
						if (this.provider?.archiveAutomationInboxItem) return await this.provider.archiveAutomationInboxItem(itemId);
						this.logger?.warn("Provider does not support archiveAutomationInboxItem");
					} catch (error) {
						this.logger?.error("Failed to archive automation inbox item", error);
						return {
							success: false,
							message: error instanceof Error ? error.message : "Unknown error"
						};
					}
					return {
						success: false,
						message: "Provider does not support archiveAutomationInboxItem"
					};
				},
				deleteAutomationInboxItem: async (itemId) => {
					try {
						if (this.provider?.deleteAutomationInboxItem) return await this.provider.deleteAutomationInboxItem(itemId);
						this.logger?.warn("Provider does not support deleteAutomationInboxItem");
					} catch (error) {
						this.logger?.error("Failed to delete automation inbox item", error);
						return {
							success: false,
							message: error instanceof Error ? error.message : "Unknown error"
						};
					}
					return {
						success: false,
						message: "Provider does not support deleteAutomationInboxItem"
					};
				},
				testAutomation: async (id) => {
					try {
						if (this.provider?.testAutomation) return await this.provider.testAutomation(id);
						this.logger?.warn("Provider does not support testAutomation");
					} catch (error) {
						this.logger?.error("Failed to test automation", error);
						return {
							success: false,
							message: error instanceof Error ? error.message : "Unknown error"
						};
					}
					return {
						success: false,
						message: "Provider does not support testAutomation"
					};
				},
				on: (event, handler) => {
					if (this.provider.on) this.provider.on(event, handler);
					else this.logger?.warn(`Provider does not support event registration: ${String(event)}`);
				},
				off: (event, handler) => {
					if (this.provider.off) this.provider.off(event, handler);
					else this.logger?.warn(`Provider does not support event unregistration: ${String(event)}`);
				},
				openWorkspace: async (params) => {
					try {
						if (this.provider && this.provider.openWorkspace) {
							const result = await this.provider.openWorkspace(params);
							this.logger?.info("Workspace opened successfully", { cwd: params.cwd });
							return result;
						}
						return {
							success: false,
							error: "Provider does not support openWorkspace"
						};
					} catch (error) {
						this.logger?.error("Failed to open workspace", error);
						return {
							success: false,
							error: error instanceof Error ? error.message : "Unknown error"
						};
					}
				},
				pickFile: async (params) => {
					try {
						if (this.provider && this.provider.pickFile) {
							const result = await this.provider.pickFile(params);
							this.logger?.info("File picker completed", {
								fileCount: result.files.length,
								canceled: result.canceled
							});
							return result;
						}
						return {
							files: [],
							canceled: true,
							error: "Provider does not support pickFile"
						};
					} catch (error) {
						this.logger?.error("Failed to pick file", error);
						return {
							files: [],
							canceled: true,
							error: error instanceof Error ? error.message : "Unknown error"
						};
					}
				},
				pickFolder: async (params) => {
					try {
						if (this.provider && this.provider.pickFolder) {
							const result = await this.provider.pickFolder(params);
							this.logger?.info("Folder picker completed", {
								folderPaths: result.folderPaths,
								canceled: result.canceled
							});
							return result;
						}
						return {
							folderPaths: [],
							canceled: true,
							error: "Provider does not support pickFolder"
						};
					} catch (error) {
						this.logger?.error("Failed to pick folder", error);
						return {
							folderPaths: [],
							canceled: true,
							error: error instanceof Error ? error.message : "Unknown error"
						};
					}
				},
				uploadFile: async (params) => {
					try {
						if (this.provider && this.provider.uploadFile) {
							const result = await this.provider.uploadFile(params);
							this.logger?.info("File upload completed", {
								count: params.files.length,
								success: result.success
							});
							return result;
						}
						return {
							success: false,
							error: "Provider does not support uploadFile"
						};
					} catch (error) {
						this.logger?.error("Failed to upload file", error);
						return {
							success: false,
							error: error instanceof Error ? error.message : "Unknown error"
						};
					}
				},
				searchFile: async (params) => {
					try {
						if (this.provider && this.provider.searchFile) {
							const result = await this.provider.searchFile(params);
							this.logger?.info("File search completed", {
								resultCount: result.results.length,
								hasError: !!result.error
							});
							return result;
						}
						return {
							results: [],
							error: "Provider does not support searchFile"
						};
					} catch (error) {
						this.logger?.error("Failed to search file", error);
						return {
							results: [],
							error: error instanceof Error ? error.message : "Unknown error"
						};
					}
				},
				getSubagentList: async (params) => {
					try {
						if (this.provider && this.provider.getSubagentList) {
							const result = await this.provider.getSubagentList(params);
							this.logger?.info("Subagent list retrieved", {
								resultCount: result.results.length,
								hasError: !!result.error
							});
							return result;
						}
						return {
							results: [],
							error: "Provider does not support getSubagentList"
						};
					} catch (error) {
						this.logger?.error("Failed to get subagent list", error);
						return {
							results: [],
							error: error instanceof Error ? error.message : "Unknown error"
						};
					}
				},
				getSkillList: async (params) => {
					try {
						if (this.provider && this.provider.getSkillList) {
							const result = await this.provider.getSkillList(params);
							this.logger?.info("Skill list retrieved", {
								resultCount: result.results.length,
								hasError: !!result.error
							});
							return result;
						}
						return {
							results: [],
							error: "Provider does not support getSkillList"
						};
					} catch (error) {
						this.logger?.error("Failed to get skill list", error);
						return {
							results: [],
							error: error instanceof Error ? error.message : "Unknown error"
						};
					}
				},
				importSkill: async (params) => {
					try {
						if (this.provider && this.provider.importSkill) {
							const result = await this.provider.importSkill(params);
							this.logger?.info("Import skill completed", {
								success: result.success,
								hasError: !!result.error
							});
							return result;
						}
						return {
							success: false,
							error: "Provider does not support importSkill"
						};
					} catch (error) {
						this.logger?.error("Failed to import skill", error);
						return {
							success: false,
							error: error instanceof Error ? error.message : "Unknown error"
						};
					}
				},
				installSkillByPath: async (params) => {
					try {
						if (this.provider && this.provider.installSkillByPath) {
							const result = await this.provider.installSkillByPath(params);
							this.logger?.info("Install skill by path completed", {
								success: result.success,
								hasError: !!result.error
							});
							return result;
						}
						return {
							success: false,
							error: "Provider does not support installSkillByPath"
						};
					} catch (error) {
						this.logger?.error("Failed to install skill by path", error);
						return {
							success: false,
							error: error instanceof Error ? error.message : "Unknown error"
						};
					}
				},
				querySkillScanResult: async (params) => {
					try {
						if (this.provider && this.provider.querySkillScanResult) {
							const result = await this.provider.querySkillScanResult(params);
							this.logger?.info("Query skill scan result completed", { md5: params.md5 });
							return result;
						}
						this.logger?.warn("Provider does not support querySkillScanResult");
						return null;
					} catch (error) {
						this.logger?.error("Failed to query skill scan result", error);
						return null;
					}
				},
				installSkillFromUrl: async (params) => {
					try {
						if (this.provider && this.provider.installSkillFromUrl) {
							const result = await this.provider.installSkillFromUrl(params);
							this.logger?.info("Install skill from url completed", {
								success: result.success,
								errorKey: result.errorKey
							});
							return result;
						}
						return {
							success: false,
							errorKey: "installFromUrlFailed",
							errorMessage: "Provider does not support installSkillFromUrl"
						};
					} catch (error) {
						this.logger?.error("Failed to install skill from url", error);
						return {
							success: false,
							errorKey: "installFromUrlFailed",
							errorMessage: error instanceof Error ? error.message : "Unknown error"
						};
					}
				},
				toggleSkill: async (params) => {
					try {
						if (this.provider && this.provider.toggleSkill) {
							const result = await this.provider.toggleSkill(params);
							this.logger?.info("Toggle skill completed", {
								success: result.success,
								hasError: !!result.error
							});
							return result;
						}
						return {
							success: false,
							error: "Provider does not support toggleSkill"
						};
					} catch (error) {
						this.logger?.error("Failed to toggle skill", error);
						return {
							success: false,
							error: error instanceof Error ? error.message : "Unknown error"
						};
					}
				},
				deleteSkill: async (params) => {
					try {
						if (this.provider && this.provider.deleteSkill) {
							const result = await this.provider.deleteSkill(params);
							this.logger?.info("Delete skill completed", {
								success: result.success,
								hasError: !!result.error
							});
							return result;
						}
						return {
							success: false,
							error: "Provider does not support deleteSkill"
						};
					} catch (error) {
						this.logger?.error("Failed to delete skill", error);
						return {
							success: false,
							error: error instanceof Error ? error.message : "Unknown error"
						};
					}
				},
				getSkillContent: async (params) => {
					try {
						if (this.provider && this.provider.getSkillContent) {
							const result = await this.provider.getSkillContent(params);
							this.logger?.info("Get skill content completed", { hasError: !!result.error });
							return result;
						}
						return {
							content: "",
							error: "Provider does not support getSkillContent"
						};
					} catch (error) {
						this.logger?.error("Failed to get skill content", error);
						return {
							content: "",
							error: error instanceof Error ? error.message : "Unknown error"
						};
					}
				},
				getMarketplaceSkills: async () => {
					try {
						if (this.provider && this.provider.getMarketplaceSkills) {
							const result = await this.provider.getMarketplaceSkills();
							this.logger?.info("Marketplace skills retrieved", {
								resultCount: result.results.length,
								hasError: !!result.error
							});
							return result;
						}
						return {
							results: [],
							error: "Provider does not support getMarketplaceSkills"
						};
					} catch (error) {
						this.logger?.error("Failed to get marketplace skills", error);
						return {
							results: [],
							error: error instanceof Error ? error.message : "Unknown error"
						};
					}
				},
				getMarketplaceSkillContent: async (params) => {
					try {
						if (this.provider && this.provider.getMarketplaceSkillContent) return await this.provider.getMarketplaceSkillContent(params);
						return {
							content: "",
							error: "Provider does not support getMarketplaceSkillContent"
						};
					} catch (error) {
						this.logger?.error("Failed to get marketplace skill content", error);
						return {
							content: "",
							error: error instanceof Error ? error.message : "Unknown error"
						};
					}
				},
				installMarketplaceSkill: async (params) => {
					try {
						if (this.provider && this.provider.installMarketplaceSkill) return await this.provider.installMarketplaceSkill(params);
						return {
							success: false,
							skillName: params.skillName,
							errorMessage: "Provider does not support installMarketplaceSkill"
						};
					} catch (error) {
						this.logger?.error("Failed to install marketplace skill", error);
						return {
							success: false,
							skillName: params.skillName,
							errorMessage: error instanceof Error ? error.message : "Unknown error"
						};
					}
				},
				batchTogglePlugins: async (request) => {
					try {
						if (this.provider && this.provider.batchTogglePlugins) {
							const result = await this.provider.batchTogglePlugins(request);
							this.logger?.info("Batch toggle plugins completed", {
								succeededCount: result.succeededPlugins.length,
								failedCount: result.failedPlugins.length
							});
							return result;
						}
						return {
							success: false,
							succeededPlugins: [],
							failedPlugins: request.items.map((item) => ({
								...item,
								error: "Provider does not support batchTogglePlugins"
							}))
						};
					} catch (error) {
						this.logger?.error("Failed to batch toggle plugins", error);
						return {
							success: false,
							succeededPlugins: [],
							failedPlugins: request.items.map((item) => ({
								...item,
								error: error instanceof Error ? error.message : "Unknown error"
							}))
						};
					}
				},
				getInstalledPlugins: async (forceRefresh) => {
					try {
						if (this.provider && "getInstalledPlugins" in this.provider && typeof this.provider.getInstalledPlugins === "function") {
							const result = await this.provider.getInstalledPlugins(forceRefresh);
							this.logger?.info("Got installed plugins", { count: result?.length ?? 0 });
							return result;
						}
						this.logger?.warn("Provider does not support getInstalledPlugins");
						return [];
					} catch (error) {
						this.logger?.error("Failed to get installed plugins", error);
						return [];
					}
				},
				installPlugins: async (pluginNames, marketplaceName, installScope, marketplaceSource, workspacePath) => {
					try {
						if (this.provider && "installPlugins" in this.provider && typeof this.provider.installPlugins === "function") {
							const result = await this.provider.installPlugins(pluginNames, marketplaceName, installScope, marketplaceSource, workspacePath);
							this.logger?.info("Install plugins", {
								pluginNames,
								marketplaceName,
								success: result.success
							});
							return result;
						}
						this.logger?.warn("Provider does not support installPlugins");
						return {
							success: false,
							error: "Provider does not support installPlugins"
						};
					} catch (error) {
						this.logger?.error("Failed to install plugins", error);
						return {
							success: false,
							error: error instanceof Error ? error.message : "Unknown error"
						};
					}
				},
				uninstallPlugin: async (pluginName, marketplaceName, scope) => {
					try {
						if (this.provider && "uninstallPlugin" in this.provider && typeof this.provider.uninstallPlugin === "function") {
							const result = await this.provider.uninstallPlugin(pluginName, marketplaceName, scope);
							this.logger?.info("Uninstall plugin", {
								pluginName,
								marketplaceName,
								scope,
								success: result.success
							});
							return result;
						}
						this.logger?.warn("Provider does not support uninstallPlugin");
						return {
							success: false,
							error: "Provider does not support uninstallPlugin"
						};
					} catch (error) {
						this.logger?.error("Failed to uninstall plugin", error);
						return {
							success: false,
							error: error instanceof Error ? error.message : "Unknown error"
						};
					}
				},
				updatePlugin: async (pluginName, marketplaceName) => {
					try {
						if (this.provider && "updatePlugin" in this.provider && typeof this.provider.updatePlugin === "function") {
							const result = await this.provider.updatePlugin(pluginName, marketplaceName);
							this.logger?.info("Update plugin", {
								pluginName,
								marketplaceName,
								success: result.success
							});
							return result;
						}
						this.logger?.warn("Provider does not support updatePlugin");
						return {
							success: false,
							error: "Provider does not support updatePlugin"
						};
					} catch (error) {
						this.logger?.error("Failed to update plugin", error);
						return {
							success: false,
							error: error instanceof Error ? error.message : "Unknown error"
						};
					}
				},
				getPluginMarketplaces: async (forceRefresh) => {
					try {
						if (this.provider && "getPluginMarketplaces" in this.provider && typeof this.provider.getPluginMarketplaces === "function") {
							const result = await this.provider.getPluginMarketplaces(forceRefresh);
							this.logger?.info("Got plugin marketplaces", { count: result?.length ?? 0 });
							return result;
						}
						this.logger?.warn("Provider does not support getPluginMarketplaces");
						return [];
					} catch (error) {
						this.logger?.error("Failed to get plugin marketplaces", error);
						return [];
					}
				},
				getMarketplacePlugins: async (marketplaceName, forceRefresh, searchText) => {
					try {
						if (this.provider && "getMarketplacePlugins" in this.provider && typeof this.provider.getMarketplacePlugins === "function") {
							const result = await this.provider.getMarketplacePlugins(marketplaceName, forceRefresh, searchText);
							this.logger?.info("Got marketplace plugins", {
								marketplaceName,
								count: result?.length ?? 0
							});
							return result;
						}
						this.logger?.warn("Provider does not support getMarketplacePlugins");
						return [];
					} catch (error) {
						this.logger?.error("Failed to get marketplace plugins", error);
						return [];
					}
				},
				getPluginDetail: async (pluginName, marketplaceName) => {
					try {
						if (this.provider && "getPluginDetail" in this.provider && typeof this.provider.getPluginDetail === "function") {
							const result = await this.provider.getPluginDetail(pluginName, marketplaceName);
							this.logger?.info("Got plugin detail", {
								pluginName,
								marketplaceName
							});
							return result;
						}
						this.logger?.warn("Provider does not support getPluginDetail");
						return null;
					} catch (error) {
						this.logger?.error("Failed to get plugin detail", error);
						return null;
					}
				},
				addPluginMarketplace: async (source, name) => {
					try {
						if (this.provider && "addPluginMarketplace" in this.provider && typeof this.provider.addPluginMarketplace === "function") {
							const result = await this.provider.addPluginMarketplace(source, name);
							this.logger?.info("Add plugin marketplace", {
								source,
								name,
								success: result.success
							});
							return result;
						}
						this.logger?.warn("Provider does not support addPluginMarketplace");
						return {
							success: false,
							error: "Provider does not support addPluginMarketplace"
						};
					} catch (error) {
						this.logger?.error("Failed to add plugin marketplace", error);
						return {
							success: false,
							error: error instanceof Error ? error.message : "Unknown error"
						};
					}
				},
				removePluginMarketplace: async (marketplaceName) => {
					try {
						if (this.provider && "removePluginMarketplace" in this.provider && typeof this.provider.removePluginMarketplace === "function") {
							const result = await this.provider.removePluginMarketplace(marketplaceName);
							this.logger?.info("Remove plugin marketplace", {
								marketplaceName,
								success: result.success
							});
							return result;
						}
						this.logger?.warn("Provider does not support removePluginMarketplace");
						return {
							success: false,
							error: "Provider does not support removePluginMarketplace"
						};
					} catch (error) {
						this.logger?.error("Failed to remove plugin marketplace", error);
						return {
							success: false,
							error: error instanceof Error ? error.message : "Unknown error"
						};
					}
				},
				refreshPluginMarketplace: async (marketplaceName) => {
					try {
						if (this.provider && "refreshPluginMarketplace" in this.provider && typeof this.provider.refreshPluginMarketplace === "function") {
							const result = await this.provider.refreshPluginMarketplace(marketplaceName);
							this.logger?.info("Refresh plugin marketplace", {
								marketplaceName,
								success: result.success
							});
							return result;
						}
						this.logger?.warn("Provider does not support refreshPluginMarketplace");
						return {
							success: false,
							error: "Provider does not support refreshPluginMarketplace"
						};
					} catch (error) {
						this.logger?.error("Failed to refresh plugin marketplace", error);
						return {
							success: false,
							error: error instanceof Error ? error.message : "Unknown error"
						};
					}
				},
				openFolderInNewWindow: async (folderPath) => {
					try {
						if (this.provider && "openFolderInNewWindow" in this.provider && typeof this.provider.openFolderInNewWindow === "function") {
							await this.provider.openFolderInNewWindow(folderPath);
							this.logger?.info("Opened folder in new window", { folderPath });
						} else {
							this.logger?.warn("Provider does not support openFolderInNewWindow");
							throw new Error("Provider does not support openFolderInNewWindow");
						}
					} catch (error) {
						this.logger?.error("Failed to open folder in new window", error);
						throw error;
					}
				},
				openFolder: async (folderPath) => {
					try {
						if (this.provider && "openFolder" in this.provider && typeof this.provider.openFolder === "function") {
							const result = await this.provider.openFolder(folderPath);
							this.logger?.info("Opened folder in system file manager", { folderPath });
							return result;
						} else {
							this.logger?.warn("Provider does not support openFolder");
							throw new Error("Provider does not support openFolder");
						}
					} catch (error) {
						this.logger?.error("Failed to open folder", error);
						throw error;
					}
				},
				checkPathExists: async (path) => {
					try {
						if (this.provider && "checkPathExists" in this.provider && typeof this.provider.checkPathExists === "function") {
							const result = await this.provider.checkPathExists(path);
							this.logger?.info("Checked path exists", {
								path,
								exists: result
							});
							return result;
						} else {
							this.logger?.warn("Provider does not support checkPathExists");
							return true;
						}
					} catch (error) {
						this.logger?.error("Failed to check path exists", error);
						return true;
					}
				},
				checkPathsExist: async (paths) => {
					const provider = this.provider;
					if (provider && typeof provider.checkPathsExist === "function") try {
						return await provider.checkPathsExist(paths);
					} catch (error) {
						this.logger?.error("Failed to batch check paths", error);
					}
					const entries = await Promise.all(paths.map(async (path) => [path, await this.sessions.checkPathExists(path)]));
					return Object.fromEntries(entries);
				},
				getSupportScenes: async (locale) => {
					try {
						if (this.provider && "getSupportScenes" in this.provider && typeof this.provider.getSupportScenes === "function") return await this.provider.getSupportScenes(locale);
						this.logger?.warn("Provider does not support getSupportScenes");
						return [];
					} catch (error) {
						this.logger?.error("Failed to get support scenes", error);
						return [];
					}
				},
				getProductScenes: async (locale) => {
					try {
						if (this.provider?.getProductScenes) {
							const result = await this.provider.getProductScenes(locale);
							this.logger?.info("Got product scenes", { count: result?.length ?? 0 });
							return result;
						}
						this.logger?.warn("Provider does not support getProductScenes");
						return [];
					} catch (error) {
						this.logger?.error("Failed to get product scenes", error);
						return [];
					}
				},
				getAvailableCommands: async (params) => {
					try {
						if (this.provider && "getAvailableCommands" in this.provider && typeof this.provider.getAvailableCommands === "function") {
							const result = await this.provider.getAvailableCommands(params);
							this.logger?.info("Got available commands from provider", {
								sessionId: params?.sessionId ?? "(default)",
								count: result?.length ?? 0
							});
							return result;
						}
						this.logger?.warn("Provider does not support getAvailableCommands", { params });
						return [];
					} catch (error) {
						this.logger?.error("Failed to get available commands", error);
						return [];
					}
				},
				reportTelemetry: async (eventName, payload) => {
					try {
						if (this.provider?.reportTelemetry) await this.provider.reportTelemetry(eventName, payload);
						else this.logger?.warn("Provider does not support reportTelemetry");
					} catch (error) {
						this.logger?.error("Failed to report telemetry", error);
					}
				},
				getProductConfiguration: async () => {
					try {
						if (this.provider?.getProductConfiguration) return await this.provider.getProductConfiguration();
						this.logger?.warn("Provider does not support getProductConfiguration");
						return {};
					} catch (error) {
						this.logger?.error("Failed to get product configuration", error);
						return {};
					}
				},
				getUserInfo: async () => {
					this.logger?.info("[AgentClient.sessions] getUserInfo() called");
					try {
						if (this.provider?.getUserInfo) {
							const result = await this.provider.getUserInfo();
							this.logger?.info("[AgentClient.sessions] getUserInfo() result:", JSON.stringify(result));
							return result;
						}
						this.logger?.warn("Provider does not support getUserInfo");
						return {};
					} catch (error) {
						this.logger?.error("Failed to get user info", error);
						return {};
					}
				},
				respondToSampling: async (sessionId, response) => {
					try {
						if (this.provider?.respondToSampling) {
							await this.provider.respondToSampling(sessionId, response);
							this.logger?.info("Responded to sampling request", {
								sessionId,
								requestId: response.id,
								approved: response.approved
							});
						} else this.logger?.warn("Provider does not support respondToSampling");
					} catch (error) {
						this.logger?.error("Failed to respond to sampling request", error);
						throw error;
					}
				},
				respondToRoots: async (sessionId, response) => {
					try {
						if (this.provider?.respondToRoots) {
							await this.provider.respondToRoots(sessionId, response);
							this.logger?.info("Responded to roots request", {
								sessionId,
								requestId: response.id,
								approved: response.approved
							});
						} else this.logger?.warn("Provider does not support respondToRoots");
					} catch (error) {
						this.logger?.error("Failed to respond to roots request", error);
						throw error;
					}
				},
				subscribeSamplingRequests: (serverName, callback) => {
					if (this.provider?.subscribeSamplingRequests) {
						this.logger?.info("Subscribing to sampling requests", { serverName });
						return this.provider.subscribeSamplingRequests(serverName, callback);
					}
					this.logger?.warn("Provider does not support subscribeSamplingRequests");
					return () => {};
				},
				subscribeRootsRequests: (serverName, callback) => {
					if (this.provider?.subscribeRootsRequests) {
						this.logger?.info("Subscribing to roots requests", { serverName });
						return this.provider.subscribeRootsRequests(serverName, callback);
					}
					this.logger?.warn("Provider does not support subscribeRootsRequests");
					return () => {};
				},
				getMcpServers: async () => {
					if (this.provider?.getMcpServers) {
						this.logger?.info("Getting MCP servers list");
						return this.provider.getMcpServers();
					}
					this.logger?.warn("Provider does not support getMcpServers");
					return [];
				},
				toggleMcpServer: async (serverName, enabled) => {
					if (this.provider?.toggleMcpServer) {
						this.logger?.info("Toggling MCP server", {
							serverName,
							enabled
						});
						await this.provider.toggleMcpServer(serverName, enabled);
					} else {
						this.logger?.warn("Provider does not support toggleMcpServer");
						throw new Error("toggleMcpServer not supported by provider");
					}
				},
				reconnectMcpServer: async (serverName, forceHttpCallback) => {
					if (this.provider?.reconnectMcpServer) {
						this.logger?.info("Reconnecting MCP server", {
							serverName,
							forceHttpCallback
						});
						await this.provider.reconnectMcpServer(serverName, forceHttpCallback);
					} else {
						this.logger?.warn("Provider does not support reconnectMcpServer");
						throw new Error("reconnectMcpServer not supported by provider");
					}
				},
				deleteMcpServer: async (serverName) => {
					if (this.provider?.deleteMcpServer) {
						this.logger?.info("Deleting MCP server", { serverName });
						await this.provider.deleteMcpServer(serverName);
					} else {
						this.logger?.warn("Provider does not support deleteMcpServer");
						throw new Error("deleteMcpServer not supported by provider");
					}
				},
				toggleToolStatus: async (serverName, toolName) => {
					if (this.provider?.toggleToolStatus) {
						this.logger?.info("Toggling MCP tool status", {
							serverName,
							toolName
						});
						await this.provider.toggleToolStatus(serverName, toolName);
					} else {
						this.logger?.warn("Provider does not support toggleToolStatus");
						throw new Error("toggleToolStatus not supported by provider");
					}
				},
				openMcpConfig: async () => {
					if (this.provider?.openMcpConfig) {
						this.logger?.info("Opening MCP config");
						await this.provider.openMcpConfig();
					} else {
						this.logger?.warn("Provider does not support openMcpConfig");
						throw new Error("openMcpConfig not supported by provider");
					}
				},
				getMcpConfigContent: async () => {
					if (this.provider?.getMcpConfigContent) {
						this.logger?.info("Getting MCP config content");
						return await this.provider.getMcpConfigContent();
					} else {
						this.logger?.warn("Provider does not support getMcpConfigContent");
						throw new Error("getMcpConfigContent not supported by provider");
					}
				},
				saveMcpConfigContent: async (content) => {
					if (this.provider?.saveMcpConfigContent) {
						this.logger?.info("Saving MCP config content");
						await this.provider.saveMcpConfigContent(content);
					} else {
						this.logger?.warn("Provider does not support saveMcpConfigContent");
						throw new Error("saveMcpConfigContent not supported by provider");
					}
				},
				clipboardReadText: async () => {
					if (this.provider?.clipboardReadText) {
						this.logger?.info("Reading clipboard text");
						return await this.provider.clipboardReadText();
					} else {
						this.logger?.warn("Provider does not support clipboardReadText");
						throw new Error("clipboardReadText not supported by provider");
					}
				},
				getConnectorConfigs: async () => {
					console.log("[AgentClient:L2] getConnectorConfigs called");
					console.log("[AgentClient:L2] provider exists:", !!this.provider);
					console.log("[AgentClient:L2] provider.getConnectorConfigs exists:", !!this.provider?.getConnectorConfigs);
					if (this.provider?.getConnectorConfigs) {
						this.logger?.info("Getting connector configs");
						try {
							console.log("[AgentClient:L2] calling provider.getConnectorConfigs()...");
							const configs = await this.provider.getConnectorConfigs();
							console.log("[AgentClient:L2] provider.getConnectorConfigs() returned", configs?.length ?? 0, "configs");
							return configs;
						} catch (error) {
							console.error("[AgentClient:L2] provider.getConnectorConfigs() threw error:", error);
							throw error;
						}
					}
					console.warn("[AgentClient:L2] Provider does not support getConnectorConfigs");
					this.logger?.warn("Provider does not support getConnectorConfigs");
					return [];
				},
				getConnectorStates: async () => {
					console.log("[AgentClient:L2] getConnectorStates called");
					console.log("[AgentClient:L2] provider.getConnectorStates exists:", !!this.provider?.getConnectorStates);
					if (this.provider?.getConnectorStates) {
						this.logger?.info("Getting connector states");
						try {
							console.log("[AgentClient:L2] calling provider.getConnectorStates()...");
							const states = await this.provider.getConnectorStates();
							console.log("[AgentClient:L2] provider.getConnectorStates() returned", Object.keys(states ?? {}).length, "states");
							return states;
						} catch (error) {
							console.error("[AgentClient:L2] provider.getConnectorStates() threw error:", error);
							throw error;
						}
					}
					this.logger?.warn("Provider does not support getConnectorStates");
					return {};
				},
				connectConnector: async (configId) => {
					if (this.provider?.connectConnector) {
						this.logger?.info("Connecting connector", { configId });
						return await this.provider.connectConnector(configId);
					}
					this.logger?.warn("Provider does not support connectConnector");
					return {
						success: false,
						error: "connectConnector not supported by provider"
					};
				},
				disconnectConnector: async (configId) => {
					if (this.provider?.disconnectConnector) {
						this.logger?.info("Disconnecting connector", { configId });
						return await this.provider.disconnectConnector(configId);
					}
					this.logger?.warn("Provider does not support disconnectConnector");
					return {
						success: false,
						error: "disconnectConnector not supported by provider"
					};
				},
				resetConnector: async (configId) => {
					if (this.provider?.resetConnector) {
						this.logger?.info("Resetting connector", { configId });
						return await this.provider.resetConnector(configId);
					}
					this.logger?.warn("Provider does not support resetConnector");
					return {
						success: false,
						error: "resetConnector not supported by provider"
					};
				},
				models: this.createModelsResource()
			};
		}
		createModelsResource() {
			return { list: async (repo) => {
				if (this.provider.getModels) return this.provider.getModels(repo);
				throw new Error("Provider does not support getModels method");
			} };
		}
		/**
		* Dispose the client
		*
		* Note: Active sessions are not automatically disposed.
		* The caller is responsible for disconnecting sessions they created.
		*/
		dispose() {
			this.logger?.info("AgentClient disposed");
		}
	};
}));
//#endregion
//#region ../../packages/agent-provider/src/common/_legacy/mock-agent-client.ts
var MockHelpers, delay, MockAgentConnection, MockAgentProviderAdapter, MockAgentClient;
var init_mock_agent_client = __esmMin((() => {
	init_client$1();
	init_types$3();
	init_MockAgentProvider();
	MockHelpers = {
		text(sessionId, text, messageId) {
			return {
				sessionId,
				_meta: messageId ? { "codebuddy.ai": { messageId } } : void 0,
				update: {
					sessionUpdate: "agent_message_chunk",
					content: {
						type: "text",
						text
					}
				}
			};
		},
		toolCall(sessionId, toolCallId, title, toolName) {
			return {
				sessionId,
				_meta: toolName ? { "codebuddy.ai": { toolName } } : void 0,
				update: {
					sessionUpdate: "tool_call",
					toolCallId,
					title,
					status: "pending"
				}
			};
		},
		toolCallUpdate(sessionId, toolCallId, status, content) {
			return {
				sessionId,
				update: {
					sessionUpdate: "tool_call_update",
					toolCallId,
					status,
					content: [{
						type: "content",
						content: {
							type: "text",
							text: content
						}
					}]
				}
			};
		},
		textResponse(text, chunkSize = 20) {
			return async function* (sessionId) {
				for (let i = 0; i < text.length; i += chunkSize) {
					yield MockHelpers.text(sessionId, text.substring(i, i + chunkSize));
					await delay(30);
				}
			};
		},
		toolCallResponse(toolName, title, result) {
			return async function* (sessionId) {
				const toolCallId = `tool-${Date.now()}`;
				yield MockHelpers.toolCall(sessionId, toolCallId, title, toolName);
				await delay(50);
				yield MockHelpers.toolCallUpdate(sessionId, toolCallId, "completed", result);
			};
		},
		sequence(...generators) {
			return async function* (sessionId, params) {
				for (const gen of generators) yield* gen(sessionId, params);
			};
		},
		checkpoint(files, additions = 10, deletions = 5) {
			return {
				id: `checkpoint-${Date.now()}`,
				createdAt: Date.now(),
				fileChanges: {
					files: files.map((uri) => ({
						uri,
						changeType: "modified",
						additions: Math.floor(additions / files.length),
						deletions: Math.floor(deletions / files.length)
					})),
					totalAdditions: additions,
					totalDeletions: deletions
				}
			};
		}
	};
	delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
	MockAgentConnection = class {
		constructor(agentId, capabilities = {}, responseGenerator, _responseDelay = 0) {
			this.transport = "cloud";
			this._state = "disconnected";
			this._isInitialized = false;
			this.listeners = /* @__PURE__ */ new Map();
			this.artifactStorage = /* @__PURE__ */ new Map();
			this.pendingPermissions = /* @__PURE__ */ new Map();
			this.permissionResults = /* @__PURE__ */ new Map();
			this.pendingQuestions = /* @__PURE__ */ new Map();
			this.agentId = agentId;
			this._capabilities = capabilities;
			this.responseGenerator = responseGenerator;
		}
		get state() {
			return this._state;
		}
		get isInitialized() {
			return this._isInitialized;
		}
		get capabilities() {
			return this._isInitialized ? this._capabilities : void 0;
		}
		get initializeResult() {
			return this._initializeResult;
		}
		on(event, listener) {
			if (!this.listeners.has(event)) this.listeners.set(event, /* @__PURE__ */ new Set());
			this.listeners.get(event).add(listener);
			return this;
		}
		off(event, listener) {
			this.listeners.get(event)?.delete(listener);
			return this;
		}
		once(event, listener) {
			const wrapper = (data) => {
				this.off(event, wrapper);
				listener(data);
			};
			return this.on(event, wrapper);
		}
		emit(event, data) {
			const ls = this.listeners.get(event);
			if (!ls?.size) return false;
			ls.forEach((l) => {
				try {
					l(data);
				} catch (e) {
					console.error(e);
				}
			});
			return true;
		}
		removeAllListeners(event) {
			if (event) this.listeners.delete(event);
			else this.listeners.clear();
			return this;
		}
		async connect() {
			if (this._isInitialized) return this._initializeResult;
			this._state = "connecting";
			await delay(50);
			this._state = "initialized";
			this._isInitialized = true;
			this._initializeResult = {
				protocolVersion: 1,
				agentInfo: {
					name: "Mock Agent",
					version: "1.0.0"
				},
				agentCapabilities: this._capabilities
			};
			this.emit("connected", void 0);
			return this._initializeResult;
		}
		disconnect() {
			if (this._isInitialized) {
				this._isInitialized = false;
				this._state = "disconnected";
				this.emit("disconnected", void 0);
			}
		}
		async createSession(_params) {
			return {
				sessionId: `mock-session-${Date.now()}`,
				modes: {
					availableModes: [{
						id: "chat",
						name: "Chat"
					}],
					currentModeId: "chat"
				}
			};
		}
		async loadSession(params) {
			if (!params.sessionId) throw new Error("sessionId is required");
			return { modes: {
				availableModes: [{
					id: "chat",
					name: "Chat"
				}],
				currentModeId: "chat"
			} };
		}
		async setSessionMode(_sessionId, _modeId) {
			return {};
		}
		async setSessionModel(_sessionId, _modelId) {
			return {};
		}
		async prompt(sessionId, params) {
			for await (const _ of this.promptStream(sessionId, params));
			return {
				stopReason: "end_turn",
				_meta: void 0
			};
		}
		async *promptStream(sessionId, params) {
			const generator = this.responseGenerator ?? MockHelpers.textResponse("This is a mock response.");
			for await (const notification of this.generateMockMessages(sessionId, params)) {
				this.emit("sessionUpdate", notification);
				yield notification;
			}
			for await (const notification of generator(sessionId, params)) {
				this.emit("sessionUpdate", notification);
				yield notification;
			}
		}
		setResponseGenerator(generator) {
			this.responseGenerator = generator;
		}
		async cancel(_sessionId) {}
		getArtifacts() {
			return new Map(this.artifactStorage);
		}
		getArtifact(id) {
			return this.artifactStorage.get(id);
		}
		getArtifactsByType(type) {
			return [...this.artifactStorage.values()].filter((a) => a.type === type);
		}
		async fetchArtifactContent(_artifact) {
			return "Mock content";
		}
		async fetchArtifactContentById(id) {
			if (!this.artifactStorage.has(id)) throw new Error("Not found");
			return "Mock content";
		}
		resolvePermission(requestId, optionId) {
			const existed = this.pendingPermissions.delete(requestId);
			if (existed) if (optionId === "approve") this.permissionResults.set(requestId, "approved");
			else this.permissionResults.set(requestId, "rejected");
			return existed;
		}
		rejectPermission(requestId, _reason) {
			const existed = this.pendingPermissions.delete(requestId);
			if (existed) this.permissionResults.set(requestId, "rejected");
			return existed;
		}
		getPendingPermissions() {
			return new Map(this.pendingPermissions);
		}
		hasPendingPermissions() {
			return this.pendingPermissions.size > 0;
		}
		answerQuestion(toolCallId, _answers) {
			return this.pendingQuestions.delete(toolCallId);
		}
		cancelQuestion(toolCallId, _reason) {
			return this.pendingQuestions.delete(toolCallId);
		}
		getPendingQuestions() {
			return new Map(this.pendingQuestions);
		}
		hasPendingQuestions() {
			return this.pendingQuestions.size > 0;
		}
		async toolCallback(_sessionId, _toolCallId, _toolName, _action) {
			return { success: true };
		}
		async extMethod(_method, _params) {
			return { success: true };
		}
		async extNotification(_method, _params) {}
		async artifactNotification(_params) {}
		async readFile(path) {
			return `Mock content for: ${path}`;
		}
		async listDir(path) {
			return [{
				name: "file.ts",
				path: `${path}/file.ts`,
				type: FileType.FILE,
				size: 0,
				mode: 420,
				permissions: "rw-r--r--",
				owner: "user",
				group: "user"
			}];
		}
		async fileExists(_path) {
			return true;
		}
		async fileStat(path) {
			return {
				name: path.split("/").pop() ?? "file",
				type: FileType.FILE,
				path,
				size: 1024,
				mode: 420,
				permissions: "rw-r--r--",
				owner: "user",
				group: "user"
			};
		}
		emitCheckpointCreated(checkpoint) {
			this.emit("checkpointCreated", checkpoint);
		}
		emitCheckpointUpdated(checkpoint) {
			this.emit("checkpointUpdated", checkpoint);
		}
		delay(ms) {
			return new Promise((resolve) => setTimeout(resolve, ms));
		}
		emitNotification(notification) {
			this.emit("sessionUpdate", notification);
		}
		/**
		* Generate mock messages for testing
		* Useful for testing UI components with streaming responses
		*/
		async *generateMockMessages(sessionId, params) {
			const textReply = `我收到了你发送的「${typeof params.content === "string" ? params.content : params.content.map((block) => {
				if (block.type === "text") return block.text;
				return `[${block.type}]`;
			}).join("\n")}」信息,这是符合 ACP 协议的 mock 数据。\n\n下面演示不同类型的 ContentBlock:\n\n`;
			yield* this._streamMockTextContent(sessionId, textReply);
			await this.delay(500);
			yield* this._sendMockEmbeddedResource(sessionId);
			await this.delay(500);
			yield* this._sendMockResourceLink(sessionId);
			await this.delay(500);
			yield* this._sendMockEditContentToolCallFlow(sessionId);
			await this.delay(500);
			yield* this.sendMockEditDiffToolCallFlow(sessionId);
			await this.delay(500);
			yield* this.sendMockReadContentToolCallFlow(sessionId);
			await this.delay(500);
			yield* this.sendMockSearchContentToolCallFlow(sessionId);
			await this.delay(500);
			yield* this.sendMockSearchFileToolCallFlow(sessionId);
			await this.delay(500);
			yield* this.sendMockWebSearchToolCallFlow(sessionId);
			await this.delay(500);
			yield* this.sendMockTodoWriteToolCallFlow(sessionId);
			yield* this.sendMockPlanCreateToolCallFlow(sessionId);
			await this.delay(500);
			yield* this.sendMockPlanUpdateToolCallFlow(sessionId);
		}
		async *_streamMockTextContent(sessionId, content) {
			const messageId = `m-${Date.now()}`;
			const chunkSize = 10;
			let accumulatedInput = "";
			for (let i = 0; i < content.length; i += chunkSize) {
				const chunk = content.substring(i, i + chunkSize);
				accumulatedInput += chunk;
				const notification = {
					sessionId,
					_meta: { "codebuddy.ai": { messageId } },
					update: {
						sessionUpdate: "agent_message_chunk",
						content: {
							type: "text",
							text: accumulatedInput
						}
					}
				};
				this.emitNotification(notification);
				yield notification;
				await this.delay(50);
			}
		}
		async *_sendMockEmbeddedResource(sessionId) {
			const introNotification = {
				sessionId,
				_meta: { "codebuddy.ai": { messageId: `m-${Date.now()}` } },
				update: {
					sessionUpdate: "agent_message_chunk",
					content: {
						type: "text",
						text: "这是一个嵌入的 Python 文件示例:\n\n"
					}
				}
			};
			this.emitNotification(introNotification);
			yield introNotification;
			await this.delay(200);
			const resourceNotification = {
				sessionId,
				_meta: { "codebuddy.ai": { messageId: `m-${Date.now()}` } },
				update: {
					sessionUpdate: "agent_message_chunk",
					content: {
						type: "resource",
						resource: {
							uri: "file:///mock/example.py",
							mimeType: "text/x-python",
							text: "def hello_world():\n    print(\"Hello, World!\")\n    return \"success\"\n\nif __name__ == \"__main__\":\n    hello_world()"
						}
					}
				}
			};
			this.emitNotification(resourceNotification);
			yield resourceNotification;
			await this.delay(200);
			const closingNotification = {
				sessionId,
				_meta: { "codebuddy.ai": { messageId: `m-${Date.now()}` } },
				update: {
					sessionUpdate: "agent_message_chunk",
					content: {
						type: "text",
						text: "\n\n以上是直接嵌入的文件内容，无需额外请求即可显示。"
					}
				}
			};
			this.emitNotification(closingNotification);
			yield closingNotification;
			await this.delay(100);
		}
		async *_sendMockResourceLink(sessionId) {
			const introNotification = {
				sessionId,
				_meta: { "codebuddy.ai": { messageId: `m-${Date.now()}` } },
				update: {
					sessionUpdate: "agent_message_chunk",
					content: {
						type: "text",
						text: "这是一个指向外部文档的资源链接:\n\n"
					}
				}
			};
			this.emitNotification(introNotification);
			yield introNotification;
			await this.delay(200);
			const linkNotification = {
				sessionId,
				_meta: { "codebuddy.ai": { messageId: `m-${Date.now()}` } },
				update: {
					sessionUpdate: "agent_message_chunk",
					content: {
						type: "resource_link",
						uri: "https://agentclientprotocol.com/protocol/content",
						name: "ACP Content Protocol",
						mimeType: "text/html",
						description: "Agent Client Protocol - Content specification",
						size: 256e3
					}
				}
			};
			this.emitNotification(linkNotification);
			yield linkNotification;
			await this.delay(200);
			const closingNotification = {
				sessionId,
				_meta: { "codebuddy.ai": { messageId: `m-${Date.now()}` } },
				update: {
					sessionUpdate: "agent_message_chunk",
					content: {
						type: "text",
						text: "\n\n点击上面的链接可以访问完整的协议文档。"
					}
				}
			};
			this.emitNotification(closingNotification);
			yield closingNotification;
			await this.delay(100);
		}
		async *_sendMockEditContentToolCallFlow(sessionId) {
			const toolCallId = `tool-${Date.now()}`;
			const messageId = `m-${Date.now()}`;
			const pendingNotification = {
				sessionId,
				_meta: { "codebuddy.ai": {
					toolName: "write_to_file",
					messageId
				} },
				update: {
					sessionUpdate: "tool_call",
					toolCallId,
					title: "Write File",
					kind: "edit",
					status: "pending",
					locations: [{
						path: "example-edit-content.py",
						line: 0
					}]
				}
			};
			this.emitNotification(pendingNotification);
			yield pendingNotification;
			await this.delay(100);
			const content = "def hello_world():\n    print(\"Hello from ACP tool call!\")\n    return \"success\"\n\nif __name__ == \"__main__\":\n    hello_world()";
			const chunkSize = 10;
			let accumulatedInput = "";
			for (let i = 0; i < 124; i += chunkSize) {
				const chunk = content.substring(i, i + chunkSize);
				accumulatedInput += chunk;
				const progressNotification = {
					sessionId,
					_meta: { "codebuddy.ai": {
						toolName: "write_to_file",
						messageId
					} },
					update: {
						sessionUpdate: "tool_call_update",
						toolCallId,
						status: "in_progress",
						content: [{
							type: "content",
							content: {
								type: "text",
								text: accumulatedInput
							}
						}],
						rawInput: {
							filePath: "example-edit-content.py",
							content: accumulatedInput
						},
						locations: [{
							path: "example-edit-content.py",
							line: 0
						}]
					}
				};
				this.emitNotification(progressNotification);
				yield progressNotification;
				await this.delay(50);
			}
			await this.delay(500);
			const completedNotification = {
				sessionId,
				_meta: { "codebuddy.ai": {
					toolName: "write_to_file",
					messageId
				} },
				update: {
					sessionUpdate: "tool_call_update",
					toolCallId,
					status: "completed",
					content: [{
						type: "content",
						content: {
							type: "text",
							text: content
						}
					}],
					rawOutput: {
						type: "write_to_file_result",
						path: "example-edit-content.py",
						addLineCount: 10,
						removedLines: 20
					},
					locations: [{
						path: "example-edit-content.py",
						line: 0
					}]
				}
			};
			this.emitNotification(completedNotification);
			yield completedNotification;
			const messageId2 = `m-${Date.now()}`;
			await this.delay(300);
			const summaryNotification = {
				sessionId,
				_meta: { "codebuddy.ai": {
					toolName: "write_to_file",
					messageId: messageId2
				} },
				update: {
					sessionUpdate: "agent_message_chunk",
					content: {
						type: "text",
						text: "✅ 工具调用完成！我成功创建了一个名为 `example.py` 的文件。\n\nACP 协议工具调用流程：\n1. `tool_call` (pending) - 创建工具调用\n2. `tool_call_update` (in_progress) - 开始执行\n3. `tool_call_update` (completed) - 执行完成\n\n这就是完整的工具调用生命周期！"
					}
				}
			};
			this.emitNotification(summaryNotification);
			yield summaryNotification;
			await this.delay(100);
		}
		/**
		* 发送使用 diff 类型的编辑工具调用流程 (符合 ACP 协议)
		*
		* 与 _sendMockEditContentToolCallFlow 的区别：
		* - 使用 type: 'diff' 而不是 type: 'content'
		* - diff 格式专门用于显示文件差异：{ type: 'diff', path, oldText, newText }
		* - 更适合展示文件的前后对比
		* - 触发 permissionRequest 等待用户交互
		*/
		async *sendMockEditDiffToolCallFlow(sessionId) {
			const toolCallId = `tool-diff-${Date.now()}`;
			const messageId = `m-${Date.now()}`;
			const permissionRequestId = `perm-${Date.now()}`;
			const pendingNotification = {
				sessionId,
				_meta: { "codebuddy.ai": {
					toolName: "replace_in_file",
					messageId
				} },
				update: {
					sessionUpdate: "tool_call",
					toolCallId,
					title: "Edit File with Diff",
					kind: "edit",
					status: "pending",
					locations: [{
						path: "example-diff.py",
						line: 0
					}]
				}
			};
			this.emitNotification(pendingNotification);
			yield pendingNotification;
			await this.delay(100);
			const permissionRequestData = {
				requestId: permissionRequestId,
				params: {
					sessionId,
					options: [{
						optionId: "approve",
						name: "允许修改",
						kind: "allow_once"
					}, {
						optionId: "reject",
						name: "拒绝",
						kind: "reject_once"
					}],
					toolCall: {
						toolCallId,
						title: "Edit File with Diff",
						rawInput: {
							name: "replace_in_file",
							arguments: {
								filePath: "example-diff.py",
								oldStr: "def hello_world():\n    print(\"Old code\")\n    return \"old\"",
								newStr: "def hello_world():\n    print(\"Hello from ACP diff!\")\n    return \"success\""
							}
						}
					}
				}
			};
			this.pendingPermissions.set(permissionRequestId, {
				params: {
					sessionId,
					options: [{
						optionId: "approve",
						name: "允许修改",
						kind: "allow_once"
					}, {
						optionId: "reject",
						name: "拒绝",
						kind: "reject_once"
					}],
					toolCall: {
						toolCallId,
						title: "Edit File with Diff",
						rawInput: {
							name: "replace_in_file",
							arguments: {
								filePath: "example-diff.py",
								oldStr: "def hello_world():\n    print(\"Old code\")\n    return \"old\"",
								newStr: "def hello_world():\n    print(\"Hello from ACP diff!\")\n    return \"success\""
							}
						}
					}
				},
				createdAt: Date.now()
			});
			this.emit("permissionRequest", permissionRequestData);
			const timeoutMs = 6e4;
			const checkIntervalMs = 100;
			const startTime = Date.now();
			let approved = false;
			while (Date.now() - startTime < timeoutMs) {
				const result = this.permissionResults.get(permissionRequestId);
				if (result === "approved") {
					approved = true;
					break;
				} else if (result === "rejected") {
					approved = false;
					break;
				}
				await this.delay(checkIntervalMs);
			}
			this.pendingPermissions.delete(permissionRequestId);
			this.permissionResults.delete(permissionRequestId);
			if (!approved) {
				const rejectedNotification = {
					sessionId,
					_meta: { "codebuddy.ai": {
						toolName: "replace_in_file",
						messageId
					} },
					update: {
						sessionUpdate: "tool_call_update",
						toolCallId,
						status: "completed",
						content: [],
						rawOutput: {
							type: "error",
							message: "用户拒绝了操作请求或操作超时"
						}
					}
				};
				this.emitNotification(rejectedNotification);
				yield rejectedNotification;
				return;
			}
			const content = "def hello_world():\n    print(\"Hello from ACP diff!\")\n    return \"success\"\n\nif __name__ == \"__main__\":\n    hello_world()";
			const chunkSize = 10;
			let accumulatedText = "";
			for (let i = 0; i < 119; i += chunkSize) {
				const chunk = content.substring(i, i + chunkSize);
				accumulatedText += chunk;
				const progressNotification = {
					sessionId,
					_meta: { "codebuddy.ai": {
						toolName: "replace_in_file",
						messageId
					} },
					update: {
						sessionUpdate: "tool_call_update",
						toolCallId,
						status: "in_progress",
						content: [{
							type: "diff",
							path: "example-diff.py",
							oldText: "",
							newText: accumulatedText
						}],
						locations: [{
							path: "example-diff.py",
							line: 0
						}],
						rawInput: {
							filePath: "example-diff.py",
							new_str: "123",
							old_str: "def hello_world():\n    print(\"Hello from ACP diff!\")\n    return \"success\""
						}
					}
				};
				this.emitNotification(progressNotification);
				yield progressNotification;
				await this.delay(50);
			}
			await this.delay(500);
			const completedNotification = {
				sessionId,
				_meta: { "codebuddy.ai": {
					toolName: "replace_in_file",
					messageId
				} },
				update: {
					sessionUpdate: "tool_call_update",
					toolCallId,
					status: "completed",
					content: [{
						type: "diff",
						path: "example-diff.py",
						oldText: "# Old file content\nprint(\"Old code\")",
						newText: content
					}],
					locations: [{
						path: "example-diff.py",
						line: 0
					}],
					rawInput: {
						filePath: "example-diff.py",
						new_str: "123",
						old_str: "def hello_world():\n    print(\"Hello from ACP diff!\")\n    return \"success\""
					},
					rawOutput: {
						type: "write_to_file_result",
						path: "example-diff.py",
						addLineCount: 7,
						removedLines: 2
					}
				}
			};
			this.emitNotification(completedNotification);
			yield completedNotification;
			await this.delay(100);
		}
		async *sendMockReadContentToolCallFlow(sessionId) {
			const filePath = "/Users/liumingyuan/Project/caseTest/subagent/test.js";
			const toolCallId = `tool-${Date.now()}`;
			const messageId = `m-${Date.now()}`;
			const pendingNotification = {
				sessionId,
				_meta: { "codebuddy.ai": {
					toolName: "read_file",
					messageId
				} },
				update: {
					sessionUpdate: "tool_call",
					toolCallId,
					title: "Read File",
					status: "pending",
					locations: [{
						path: filePath,
						line: 0
					}]
				}
			};
			this.emitNotification(pendingNotification);
			yield pendingNotification;
			await this.delay(100);
			const fileContent = `/**
 * Test file for subagent functionality
 */

function helloWorld() {
    console.log('Hello from test.js!');
    return 'success';
}

class TestClass {
    constructor(name) {
        this.name = name;
    }

    greet() {
        return \`Hello, \${this.name}!\`;
    }
}

module.exports = {
    helloWorld,
    TestClass
};
`;
			const chunkSize = 20;
			let accumulatedContent = "";
			for (let i = 0; i < fileContent.length; i += chunkSize) {
				const chunk = fileContent.substring(i, i + chunkSize);
				accumulatedContent += chunk;
				const progressNotification = {
					sessionId,
					_meta: { "codebuddy.ai": {
						toolName: "read_file",
						messageId
					} },
					update: {
						sessionUpdate: "tool_call_update",
						toolCallId,
						status: "in_progress",
						content: [{
							type: "content",
							content: {
								type: "text",
								text: accumulatedContent
							}
						}],
						locations: [{
							path: filePath,
							line: 0
						}]
					}
				};
				this.emitNotification(progressNotification);
				yield progressNotification;
				await this.delay(30);
			}
			const completedNotification = {
				sessionId,
				_meta: { "codebuddy.ai": {
					toolName: "read_file",
					messageId
				} },
				update: {
					sessionUpdate: "tool_call_update",
					toolCallId,
					status: "completed",
					content: [{
						type: "content",
						content: {
							type: "text",
							text: fileContent
						}
					}],
					locations: [{
						path: filePath,
						line: 0
					}]
				}
			};
			this.emitNotification(completedNotification);
			yield completedNotification;
		}
		/**
		* 发送 search_content 工具调用流程 (符合 ACP 协议)
		*
		* 用于模拟在文件内容中搜索文本的工具调用（类似 grep）
		*/
		async *sendMockSearchContentToolCallFlow(sessionId) {
			const pattern = "一行工具";
			const directory = "/Users/liumingyuan/Project/caseTest/subagent";
			const messageId = `m-${Date.now()}`;
			const toolCallId = `tool-sc-${Date.now()}`;
			const pendingNotification = {
				sessionId,
				_meta: { "codebuddy.ai": {
					toolName: "search_content",
					messageId
				} },
				update: {
					sessionUpdate: "tool_call",
					toolCallId,
					title: "Search Content",
					kind: "search",
					status: "pending",
					locations: [{
						path: directory,
						line: 0
					}],
					rawInput: {
						pattern,
						path: directory
					}
				}
			};
			this.emitNotification(pendingNotification);
			yield pendingNotification;
			await this.delay(100);
			const progressNotification = {
				sessionId,
				update: {
					sessionUpdate: "tool_call_update",
					toolCallId,
					status: "in_progress",
					content: [{
						type: "content",
						content: {
							type: "text",
							text: `Searching for "${pattern}" in ${directory}...`
						}
					}],
					locations: [{
						path: directory,
						line: 0
					}]
				}
			};
			this.emitNotification(progressNotification);
			yield progressNotification;
			await this.delay(500);
			const completedNotification = {
				sessionId,
				_meta: { "codebuddy.ai": {
					toolName: "search_content",
					messageId
				} },
				update: {
					sessionUpdate: "tool_call_update",
					toolCallId,
					status: "completed",
					content: [{
						type: "content",
						content: {
							type: "text",
							text: "Found 1 matching result\n\nconvert_to_oneline.py\n    56|        print(\"文件内容转一行工具\")\n"
						}
					}],
					locations: [{
						path: directory,
						line: 0
					}],
					rawOutput: {
						pattern,
						path: directory,
						matches: [{
							filePath: "convert_to_oneline.py",
							fileName: "convert_to_oneline.py",
							content: "        print(\"文件内容转一行工具\")",
							startLine: 56,
							endLine: 56
						}],
						totalCount: 1,
						hasMore: false
					}
				}
			};
			this.emitNotification(completedNotification);
			yield completedNotification;
			await this.delay(300);
			const summaryNotification = {
				sessionId,
				update: {
					sessionUpdate: "agent_message_chunk",
					content: {
						type: "text",
						text: `✅ 内容搜索完成！在 \`${directory}\` 目录中找到 1 个匹配结果。\n\n**搜索结果：**\n- \`convert_to_oneline.py\` 第 56 行: \`print("文件内容转一行工具")\`\n\n**工具调用流程：**\n1. \`tool_call\` (pending) - 创建搜索工具调用\n2. \`tool_call_update\` (in_progress) - 执行搜索\n3. \`tool_call_update\` (completed) - 返回匹配结果`
					}
				}
			};
			this.emitNotification(summaryNotification);
			yield summaryNotification;
			await this.delay(100);
		}
		/**
		* 发送 search_file 工具调用流程 (符合 ACP 协议)
		*
		* 用于模拟按文件名模式搜索文件的工具调用（类似 find）
		*/
		async *sendMockSearchFileToolCallFlow(sessionId) {
			const pattern = "*.py";
			const directory = "/Users/liumingyuan/Project/caseTest/subagent";
			const messageId = `m-${Date.now()}`;
			const toolCallId = `tool-sf-${Date.now()}`;
			const pendingNotification = {
				sessionId,
				_meta: { "codebuddy.ai": {
					toolName: "search_file",
					messageId
				} },
				update: {
					sessionUpdate: "tool_call",
					toolCallId,
					title: "Search File",
					kind: "search",
					status: "pending",
					locations: [{
						path: directory,
						line: 0
					}],
					rawInput: {
						target_directory: directory,
						pattern,
						recursive: true,
						caseSensitive: false
					}
				}
			};
			this.emitNotification(pendingNotification);
			yield pendingNotification;
			await this.delay(100);
			const progressNotification = {
				sessionId,
				update: {
					sessionUpdate: "tool_call_update",
					toolCallId,
					status: "in_progress",
					content: [{
						type: "content",
						content: {
							type: "text",
							text: `Searching for files matching "${pattern}" in ${directory}...`
						}
					}],
					locations: [{
						path: directory,
						line: 0
					}]
				}
			};
			this.emitNotification(progressNotification);
			yield progressNotification;
			await this.delay(500);
			const completedNotification = {
				sessionId,
				_meta: { "codebuddy.ai": {
					toolName: "search_file",
					messageId
				} },
				update: {
					sessionUpdate: "tool_call_update",
					toolCallId,
					status: "completed",
					content: [{
						type: "content",
						content: {
							type: "text",
							text: "Found 5 files\n\nbubble_sort.py (10.38 KB)\nconvert_to_oneline.py (2.2 KB)\ntls12_examples.py (4.58 KB)\n.codebuddy/skills/analyzing-financial-statements/calculate_ratios.py (12.22 KB)\n.codebuddy/skills/analyzing-financial-statements/interpret_ratios.py (15.83 KB)\n"
						}
					}],
					locations: [{
						path: directory,
						line: 0
					}],
					rawOutput: {
						path: directory,
						pattern,
						recursive: true,
						caseSensitive: false,
						results: [
							{
								filePath: "bubble_sort.py",
								size: "10.38 KB"
							},
							{
								filePath: "convert_to_oneline.py",
								size: "2.2 KB"
							},
							{
								filePath: "tls12_examples.py",
								size: "4.58 KB"
							},
							{
								filePath: ".codebuddy/skills/analyzing-financial-statements/calculate_ratios.py",
								size: "12.22 KB"
							},
							{
								filePath: ".codebuddy/skills/analyzing-financial-statements/interpret_ratios.py",
								size: "15.83 KB"
							}
						]
					}
				}
			};
			this.emitNotification(completedNotification);
			yield completedNotification;
			await this.delay(300);
			const summaryNotification = {
				sessionId,
				update: {
					sessionUpdate: "agent_message_chunk",
					content: {
						type: "text",
						text: `✅ 文件搜索完成！在 \`${directory}\` 目录中找到 5 个匹配的 Python 文件。\n\n**搜索结果：**\n- \`bubble_sort.py\` (10.38 KB)\n- \`convert_to_oneline.py\` (2.2 KB)\n- \`tls12_examples.py\` (4.58 KB)\n- \`.codebuddy/skills/analyzing-financial-statements/calculate_ratios.py\` (12.22 KB)\n- \`.codebuddy/skills/analyzing-financial-statements/interpret_ratios.py\` (15.83 KB)\n\n**工具调用流程：**\n1. \`tool_call\` (pending) - 创建搜索工具调用\n2. \`tool_call_update\` (in_progress) - 执行搜索\n3. \`tool_call_update\` (completed) - 返回搜索结果`
					}
				}
			};
			this.emitNotification(summaryNotification);
			yield summaryNotification;
			await this.delay(100);
		}
		/**
		* 发送 web_search 工具调用流程 (符合 ACP 协议)
		*
		* 用于模拟网络搜索的工具调用
		*/
		async *sendMockWebSearchToolCallFlow(sessionId) {
			const searchTerm = "site:github.com Chalarangelo 30-seconds-of-code repository";
			const explanation = "用户要求查看GitHub上的30-seconds-of-code仓库信息";
			const messageId = `m-${Date.now()}`;
			const toolCallId = `tool-ws-${Date.now()}`;
			const pendingNotification = {
				sessionId,
				_meta: { "codebuddy.ai": {
					toolName: "web_search",
					messageId
				} },
				update: {
					sessionUpdate: "tool_call",
					toolCallId,
					title: "Web Search",
					kind: "search",
					status: "pending",
					locations: [{
						path: "web",
						line: 0
					}],
					rawInput: {
						explanation,
						searchTerm
					}
				}
			};
			this.emitNotification(pendingNotification);
			yield pendingNotification;
			await this.delay(100);
			const progressNotification = {
				sessionId,
				update: {
					sessionUpdate: "tool_call_update",
					toolCallId,
					status: "in_progress",
					content: [{
						type: "content",
						content: {
							type: "text",
							text: `Searching for "${searchTerm}"...`
						}
					}],
					locations: [{
						path: "web",
						line: 0
					}]
				}
			};
			this.emitNotification(progressNotification);
			yield progressNotification;
			await this.delay(500);
			const completedNotification = {
				sessionId,
				_meta: { "codebuddy.ai": {
					toolName: "web_search",
					messageId
				} },
				update: {
					sessionUpdate: "tool_call_update",
					toolCallId,
					status: "completed",
					content: [{
						type: "content",
						content: {
							type: "text",
							text: "Found 5 search results for \"site:github.com Chalarangelo 30-seconds-of-code repository\":\n\n1. 30-seconds-of-code JavaScript 数组篇 - CSDN博客\n   https://blog.csdn.net/weixin_43550660/article/details/105696505\n   原文:https://github.com/Chalarangelo/30-seconds-of-code 作者:Chalarangelo 翻译:http://caibaojian.com/30-seconds-of-code.html\n\n2. 精心收集的48个JavaScript代码片段,仅需30秒就可理解 - 久依 - 博客园\n   https://www.cnblogs.com/jiuyi/p/8623005.html\n   源文链接 :https://github.com/Chalarangelo/30-seconds-of-code#anagrams-of-string-with-duplicates\n\n3. 30-seconds-code——string - 前端周分享 - SegmentFault 思否\n   https://segmentfault.com/a/1190000012563148\n   英文文章来源于: https://github.com/Chalarangelo/30-seconds-of-code/blob/master/README.md\n\n4. 2018 年 1月 5 日 随笔档案 - 终极用户 - 博客园\n   https://www.cnblogs.com/shenzikun1314/archive/2018/01/05.html\n   https://github.com/Chalarangelo/30-seconds-of-code#anagrams-of-string-with-duplicates\n\n5. 30-seconds-code——Object - 前端周分享 - SegmentFault 思否\n   https://segmentfault.com/a/1190000012644112\n   英文文章来源于: https://github.com/Chalarangelo/30-seconds-of-code/blob/master/README.md"
						}
					}],
					locations: [{
						path: "web",
						line: 0
					}],
					rawOutput: {
						type: "web_search_tool_result",
						data: [
							{
								passage: "原文:https://github.com/Chalarangelo/30-seconds-of-code 作者:Chalarangelo 翻译:http://caibaojian.com/30-seconds-of-code.html 译者:蔡宝坚 收集有用的 Javascript 片段, 你可以在30秒或更少的时间里理解｡ arrMax:返回数组中得最大值 将Math.max()与扩展运算符 ",
								uri: "https://blog.csdn.net/weixin_43550660/article/details/105696505",
								site: "",
								title: "30-seconds-of-code JavaScript 数组篇 持续更新_30code of javascript-CSDN博客"
							},
							{
								passage: "源文链接 :https://github.com/Chalarangelo/30-seconds-of-code#anagrams-of-string-with-duplicates 该项目来自于 Github 用户 Chalarangelo,目前已在 Github 上获得了 5000 多Star,精心收集了多达 48 个有用的 JavaScript 代码片段,该用户的代码可以让程序员在 30 秒甚至更少的时间内理解这些经常用到的基础算法,来看看这些 JavaScript 代码都传达出了什么吧! [str, str[1] + str[0]] : [str];",
								uri: "https://www.cnblogs.com/jiuyi/p/8623005.html",
								site: "博客园",
								title: "精心收集的48个JavaScript代码片段,仅需30秒就可理解 - 久依 - 博客园"
							},
							{
								passage: "英文文章来源于: https://github.com/Chalarangelo/30-seconds-of-code/blob/master/README.md anagrams 计算一个字符串中字符的所有排序情况. 使用递归. 遍历字符串中的每个字符, 计算剩余字符串的所有顺序. 用 Array.map() 区合并该字符和剩余字符串的每种顺序, 然后用 Array.reduce() 将该字符串的所有顺序合并到一个数组中. 当字符串的 length 等于 2 或者 1 时,是两个基例. const anagrams = str => { if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str]; return str.split('').reduce((acc, letter, i) => acc.concat(anagrams(str.slice(0, i) + str.slice(i + 1)).map(val => letter + val)anagrams('abc') -> [...",
								uri: "https://segmentfault.com/a/1190000012563148?sort=newest",
								site: "",
								title: "javascript - 30-seconds-code——string - 前端周分享 - SegmentFault 思否"
							},
							{
								passage: "https://github.com/Chalarangelo/30-seconds-of-code#anagrams-of-string-with-duplicates 该项目来自于 Github 用户 Chalarangelo,目前已在 Gith阅读全文阅读(282) 评论(0) 推荐(0) 摘要: 微信公众号支付只要符合以下规则是可以自动关注的 1. 刷卡支付默认有推荐关注2. 公众号支付和扫码支付需要5元以上才有推荐关注3. APP支付默认没有,需要申请配置,需要有一定用户规模才可以申请4. 已经关注的不展示推荐栏5. 服务号未设置头像的在IOS不展示推荐关注栏6. 用户取消过关注的默认不勾阅读全文阅读(8851) 评论(1) 推荐(1)",
								uri: "https://www.cnblogs.com/shenzikun1314/archive/2018/01/05.html",
								site: "博客园",
								title: "2018 年 1月 5 日 随笔档案 - 终极用户 - 博客园"
							},
							{
								passage: "英文文章来源于: https://github.com/Chalarangelo/30-seconds-of-code/blob/master/README.md cleanObj 删除JSON对象中除指定键值的属性. 用递归的方法 用 Object.keys() 方法遍历JSON对象然后删除不是 include 在给定数组中的属性. 如果你传入 childIndicator ,它将对该键所对应的JSON对象进行深度遍历. const cleanObj = (obj, keysToKeep = [], childIndicator) => { Object.keys(obj).forEach(key => { if (key === childIndicator) { cleanObj(obj[key], keysToKeep, childIndicator); } else if (!",
								uri: "https://segmentfault.com/a/1190000012644112?utm_source=sf-similar-article",
								site: "",
								title: "javascript - 30-seconds-code——Object - 前端周分享 - SegmentFault 思否"
							}
						],
						searchInput: `Search for "${searchTerm}"`
					}
				}
			};
			this.emitNotification(completedNotification);
			yield completedNotification;
			await this.delay(300);
			const summaryNotification = {
				sessionId,
				update: {
					sessionUpdate: "agent_message_chunk",
					content: {
						type: "text",
						text: "✅ 网络搜索完成！搜索到 5 个与 \"site:github.com Chalarangelo 30-seconds-of-code repository\" 相关的结果。\n\n**搜索结果：**\n1. **30-seconds-of-code JavaScript 数组篇** - CSDN博客\n2. **精心收集的48个JavaScript代码片段** - 博客园\n3. **30-seconds-code——string** - SegmentFault 思否\n4. **2018 年 1月 5 日 随笔档案** - 博客园\n5. **30-seconds-code——Object** - SegmentFault 思否\n\n**工具调用流程：**\n1. `tool_call` (pending) - 创建网络搜索工具调用\n2. `tool_call_update` (in_progress) - 执行搜索\n3. `tool_call_update` (completed) - 返回搜索结果"
					}
				}
			};
			this.emitNotification(summaryNotification);
			yield summaryNotification;
			await this.delay(100);
		}
		/**
		* 发送 todo_write 工具调用流程 (符合 ACP 协议)
		*
		* 用于模拟创建和更新 Todo 列表的工具调用
		*/
		async *sendMockTodoWriteToolCallFlow(sessionId) {
			const toolCallId = `tool-tw-${Date.now()}`;
			const messageId = `m-tw-${Date.now()}`;
			const merge = false;
			const todos = [
				{
					id: "1",
					status: "pending",
					content: "分析项目需求和架构设计"
				},
				{
					id: "2",
					status: "pending",
					content: "实现用户认证模块"
				},
				{
					id: "3",
					status: "pending",
					content: "搭建数据库模型"
				},
				{
					id: "4",
					status: "pending",
					content: "开发 REST API 接口"
				},
				{
					id: "5",
					status: "pending",
					content: "前端界面设计和实现"
				},
				{
					id: "6",
					status: "pending",
					content: "单元测试和集成测试"
				},
				{
					id: "7",
					status: "pending",
					content: "性能优化和代码审查"
				}
			];
			const pendingNotification = {
				sessionId,
				_meta: { "codebuddy.ai": {
					toolName: "todo_write",
					messageId
				} },
				update: {
					sessionUpdate: "tool_call",
					toolCallId,
					title: "Create Todo List",
					status: "pending",
					rawInput: {
						merge,
						todos: JSON.stringify(todos)
					}
				}
			};
			this.emitNotification(pendingNotification);
			yield pendingNotification;
			await this.delay(200);
			const progressNotification = {
				sessionId,
				_meta: { "codebuddy.ai": {
					toolName: "todo_write",
					messageId
				} },
				update: {
					sessionUpdate: "tool_call_update",
					toolCallId,
					status: "in_progress",
					content: [{
						type: "content",
						content: {
							type: "text",
							text: `📋 正在创建 Todo 列表，共 ${todos.length} 项任务...`
						}
					}],
					rawInput: {
						merge,
						todos: JSON.stringify(todos)
					}
				}
			};
			this.emitNotification(progressNotification);
			yield progressNotification;
			await this.delay(300);
			const todoSummary = todos.map((todo) => `- [${todo.status === "completed" ? "x" : " "}] ${todo.content}`).join("\n");
			const responseData = JSON.stringify({
				totalTodos: todos.length,
				pendingTodos: todos.filter((t) => t.status === "pending").length,
				inProgressTodos: todos.filter((t) => t.status === "in_progress").length,
				completedTodos: todos.filter((t) => t.status === "completed").length,
				todos
			}, null, 2);
			const completedNotification = {
				sessionId,
				_meta: { "codebuddy.ai": {
					toolName: "todo_write",
					messageId
				} },
				update: {
					sessionUpdate: "tool_call_update",
					toolCallId,
					status: "completed",
					content: [{
						type: "content",
						content: {
							type: "text",
							text: `✅ Todo 列表创建成功！\n\n${todoSummary}`
						}
					}],
					rawInput: {
						merge,
						todos: JSON.stringify(todos)
					},
					rawOutput: {
						type: "plan_update_tool_result",
						status: "ready",
						data: responseData,
						reminder: "Todo 列表已创建，可以开始执行任务。当任务状态更新时，请调用 todo_write 工具进行更新。"
					}
				}
			};
			this.emitNotification(completedNotification);
			yield completedNotification;
			await this.delay(300);
			const summaryNotification = {
				sessionId,
				update: {
					sessionUpdate: "agent_message_chunk",
					content: {
						type: "text",
						text: `📋 **Todo List 创建完成**\n\n**任务统计：**\n- 总任务数：${todos.length}\n- 进行中：${todos.filter((t) => t.status === "in_progress").length}\n- 待处理：${todos.filter((t) => t.status === "pending").length}\n- 已完成：${todos.filter((t) => t.status === "completed").length}\n\n**任务清单：**\n${todoSummary}\n\n**工具调用流程：**\n1. \`tool_call\` (pending) - 创建 todo_write 工具调用\n2. \`tool_call_update\` (in_progress) - 处理中\n3. \`tool_call_update\` (completed) - 返回创建结果\n\n**rawInput 包含：**\n- \`merge\`: 是否合并到已有的 todo 列表（false 表示新建）\n- \`todos\`: JSON 字符串格式的 todo 数组\n\n**rawOutput 包含：**\n- \`type\`: 'plan_update_tool_result'\n- \`status\`: 'ready'（表示列表已准备好）\n- \`data\`: 包含任务统计和详细信息的 JSON\n- \`reminder\`: 后续操作提示`
					}
				}
			};
			this.emitNotification(summaryNotification);
			yield summaryNotification;
			await this.delay(100);
		}
		/**
		* 发送 plan_create 工具调用流程 (符合 ACP 协议)
		*
		* 用于模拟创建计划的工具调用
		*/
		async *sendMockPlanCreateToolCallFlow(sessionId) {
			const toolCallId = `tool-pc-${Date.now()}`;
			const messageId = `m-pc-${Date.now()}`;
			const planId = `plan-${Date.now()}`;
			const planData = {
				id: planId,
				name: "项目开发计划",
				overview: "这是一个完整的项目开发计划，包括需求分析、设计、开发、测试和部署阶段。",
				todolist: [
					{
						id: "todo-1",
						content: "收集并整理项目需求",
						status: "pending",
						dependencies: []
					},
					{
						id: "todo-2",
						content: "进行可行性分析和技术评估",
						status: "pending",
						dependencies: ["todo-1"]
					},
					{
						id: "todo-3",
						content: "设计系统架构和数据库模型",
						status: "pending",
						dependencies: ["todo-2"]
					},
					{
						id: "todo-4",
						content: "实现后端 API 接口",
						status: "pending",
						dependencies: ["todo-3"]
					},
					{
						id: "todo-5",
						content: "开发前端界面组件",
						status: "pending",
						dependencies: ["todo-3"]
					},
					{
						id: "todo-6",
						content: "前后端集成测试",
						status: "pending",
						dependencies: ["todo-4", "todo-5"]
					},
					{
						id: "todo-7",
						content: "性能优化和代码审查",
						status: "pending",
						dependencies: ["todo-6"]
					},
					{
						id: "todo-8",
						content: "生产环境部署",
						status: "pending",
						dependencies: ["todo-7"]
					}
				]
			};
			const pendingNotification = {
				sessionId,
				_meta: { "codebuddy.ai": {
					toolName: "plan_create",
					messageId
				} },
				update: {
					sessionUpdate: "tool_call",
					toolCallId,
					title: "Create Plan",
					status: "pending",
					rawInput: {
						name: planData.name,
						overview: planData.overview
					}
				}
			};
			this.emitNotification(pendingNotification);
			yield pendingNotification;
			await this.delay(200);
			const progressNotification = {
				sessionId,
				_meta: { "codebuddy.ai": {
					toolName: "plan_create",
					messageId
				} },
				update: {
					sessionUpdate: "tool_call_update",
					toolCallId,
					status: "in_progress",
					content: [{
						type: "content",
						content: {
							type: "text",
							text: `📋 正在创建计划"${planData.name}"...`
						}
					}]
				}
			};
			this.emitNotification(progressNotification);
			yield progressNotification;
			await this.delay(300);
			const responseData = JSON.stringify(planData, null, 2);
			const completedNotification = {
				sessionId,
				_meta: { "codebuddy.ai": {
					toolName: "plan_create",
					messageId
				} },
				update: {
					sessionUpdate: "tool_call_update",
					toolCallId,
					status: "completed",
					content: [{
						type: "content",
						content: {
							type: "text",
							text: `✅ 计划"${planData.name}"创建成功！\n\n共包含 ${planData.todolist.length} 项任务。`
						}
					}],
					rawOutput: {
						type: "plan_create_tool_result",
						status: "ready",
						data: responseData,
						reminder: "计划已创建，可以开始执行任务。使用 plan_update 工具更新计划状态。"
					}
				}
			};
			this.emitNotification(completedNotification);
			yield completedNotification;
			await this.delay(300);
			const todoList = planData.todolist.slice(0, 3).map((todo) => `- [ ] ${todo.content}`).join("\n");
			const summaryNotification = {
				sessionId,
				update: {
					sessionUpdate: "agent_message_chunk",
					content: {
						type: "text",
						text: `🎯 **计划创建完成**\n\n**计划详情：**\n- ID: ${planId}\n- 名称: ${planData.name}\n\n**关键任务（前3项）：**\n${todoList}\n\n**工具调用流程：**\n1. \`tool_call\` (pending) - 创建 plan_create 工具调用\n2. \`tool_call_update\` (in_progress) - 处理中\n3. \`tool_call_update\` (completed) - 返回创建结果\n\n**rawOutput 包含：**\n- \`type\`: 'plan_create_tool_result'\n- \`status\`: 'ready'（表示计划已准备好执行）\n- \`data\`: 包含完整计划信息的 JSON\n- \`reminder\`: 后续操作提示`
					}
				}
			};
			this.emitNotification(summaryNotification);
			yield summaryNotification;
			await this.delay(100);
		}
		/**
		* 发送 plan_update 工具调用流程 (符合 ACP 协议)
		*
		* 用于模拟更新计划状态的工具调用
		*/
		async *sendMockPlanUpdateToolCallFlow(sessionId) {
			const toolCallId = `tool-pu-${Date.now()}`;
			const messageId = `m-pu-${Date.now()}`;
			const planId = `plan-${Date.now() - 1e3}`;
			const updateData = {
				id: planId,
				name: "项目开发计划",
				overview: "这是一个完整的项目开发计划，包括需求分析、设计、开发、测试和部署阶段。",
				todolist: [
					{
						id: "todo-1",
						content: "收集并整理项目需求",
						status: "pending",
						dependencies: []
					},
					{
						id: "todo-2",
						content: "进行可行性分析和技术评估",
						status: "pending",
						dependencies: ["todo-1"]
					},
					{
						id: "todo-3",
						content: "设计系统架构和数据库模型",
						status: "pending",
						dependencies: ["todo-2"]
					},
					{
						id: "todo-4",
						content: "实现后端 API 接口",
						status: "pending",
						dependencies: ["todo-3"]
					},
					{
						id: "todo-5",
						content: "开发前端界面组件",
						status: "pending",
						dependencies: ["todo-3"]
					},
					{
						id: "todo-6",
						content: "前后端集成测试",
						status: "pending",
						dependencies: ["todo-4", "todo-5"]
					},
					{
						id: "todo-7",
						content: "性能优化和代码审查",
						status: "pending",
						dependencies: ["todo-6"]
					},
					{
						id: "todo-8",
						content: "生产环境部署",
						status: "pending",
						dependencies: ["todo-7"]
					}
				]
			};
			const updateStatus = "building";
			const pendingNotification = {
				sessionId,
				_meta: { "codebuddy.ai": {
					toolName: "plan_update",
					messageId
				} },
				update: {
					sessionUpdate: "tool_call",
					toolCallId,
					title: "Update Plan",
					status: "pending",
					rawInput: {
						planId,
						status: updateStatus
					}
				}
			};
			this.emitNotification(pendingNotification);
			yield pendingNotification;
			await this.delay(200);
			const progressNotification = {
				sessionId,
				_meta: { "codebuddy.ai": {
					toolName: "plan_update",
					messageId
				} },
				update: {
					sessionUpdate: "tool_call_update",
					toolCallId,
					status: "in_progress",
					content: [{
						type: "content",
						content: {
							type: "text",
							text: `⏳ 正在更新计划"${updateData.name}"的状态为"${updateStatus}"...`
						}
					}]
				}
			};
			this.emitNotification(progressNotification);
			yield progressNotification;
			await this.delay(300);
			const responseData = JSON.stringify(updateData, null, 2);
			const completedNotification = {
				sessionId,
				_meta: { "codebuddy.ai": {
					toolName: "plan_update",
					messageId
				} },
				update: {
					sessionUpdate: "tool_call_update",
					toolCallId,
					status: "completed",
					content: [{
						type: "content",
						content: {
							type: "text",
							text: `✅ 计划状态已更新为"${updateStatus}"！`
						}
					}],
					rawOutput: {
						type: "plan_update_tool_result",
						status: updateStatus,
						data: responseData,
						reminder: "计划状态已更新，可以继续执行下一步任务。"
					}
				}
			};
			this.emitNotification(completedNotification);
			yield completedNotification;
			await this.delay(300);
			const summaryNotification = {
				sessionId,
				update: {
					sessionUpdate: "agent_message_chunk",
					content: {
						type: "text",
						text: `🔄 **计划更新完成**\n\n**更新信息：**\n- 计划 ID: ${planId}\n- 计划名称: ${updateData.name}\n- 新状态: ${updateStatus}\n\n**状态流转：**\n1. ready → **${updateStatus}** (执行中)\n2. ${updateStatus} → completed (已完成)\n\n**工具调用流程：**\n1. \`tool_call\` (pending) - 创建 plan_update 工具调用\n2. \`tool_call_update\` (in_progress) - 处理中\n3. \`tool_call_update\` (completed) - 返回更新结果\n\n**rawInput 包含：**\n- \`planId\`: 要更新的计划 ID\n- \`status\`: 新的计划状态\n\n**rawOutput 包含：**\n- \`type\`: 'plan_update_tool_result'\n- \`status\`: '${updateStatus}'（表示更新已完成）\n- \`data\`: 包含更新后的计划信息的 JSON`
					}
				}
			};
			this.emitNotification(summaryNotification);
			yield summaryNotification;
			await this.delay(100);
		}
	};
	MockAgentProviderAdapter = class {
		constructor(mockProvider, agents = [], capabilities = {}, responseGenerator, responseDelay = 0) {
			this.connections = /* @__PURE__ */ new Map();
			this.agentCounter = 0;
			this.mockProvider = mockProvider;
			this.agents = agents.length > 0 ? agents : [{
				id: "mock-agent",
				name: "Mock Agent",
				status: "connected",
				type: "cloud"
			}];
			this.capabilities = capabilities;
			this.responseGenerator = responseGenerator;
			this.responseDelay = responseDelay;
		}
		async create() {
			const agentId = `mock-agent-${++this.agentCounter}-${Date.now()}`;
			this.agents.push({
				id: agentId,
				name: `Mock Agent ${this.agentCounter}`,
				type: "cloud",
				status: "disconnected"
			});
			return agentId;
		}
		async get(agentId) {
			return this.agents.find((a) => a.id === agentId);
		}
		async list(options) {
			return {
				agents: this.agents,
				pagination: {
					page: 1,
					size: this.agents.length,
					total: this.agents.length,
					totalPages: 1,
					hasNext: false,
					hasPrev: false
				}
			};
		}
		async connect(agentId) {
			let connection = this.connections.get(agentId);
			if (!connection) {
				connection = new MockAgentConnection(agentId, this.capabilities, this.responseGenerator, this.responseDelay);
				this.connections.set(agentId, connection);
			}
			await connection.connect();
			const agent = this.agents.find((a) => a.id === agentId);
			if (agent) agent.status = "connected";
			return connection;
		}
		async delete(agentId) {
			const existed = this.connections.has(agentId);
			this.connections.delete(agentId);
			const agentIndex = this.agents.findIndex((a) => a.id === agentId);
			if (agentIndex >= 0) this.agents.splice(agentIndex, 1);
			return existed || agentIndex >= 0;
		}
		addAgent(state) {
			this.agents.push(state);
		}
		getConnection(agentId) {
			return this.connections.get(agentId);
		}
		getMockProvider() {
			return this.mockProvider;
		}
		setResponseGenerator(generator) {
			this.responseGenerator = generator;
			for (const connection of this.connections.values()) connection.setResponseGenerator(generator);
		}
	};
	MockAgentClient = class extends AgentClient {
		constructor(options = {}) {
			const adapter = new MockAgentProviderAdapter(new MockAgentProvider(), options.agents, options.capabilities ?? {}, options.responseGenerator, options.responseDelay ?? 0);
			super({
				provider: adapter,
				logger: options.logger
			});
			this._mockProviderAdapter = adapter;
		}
		getMockProvider() {
			return this._mockProviderAdapter.getMockProvider();
		}
		addAgent(state) {
			this._mockProviderAdapter.addAgent(state);
		}
		getConnection(agentId) {
			return this._mockProviderAdapter.getConnection(agentId);
		}
		setResponseGenerator(generator) {
			this._mockProviderAdapter.setResponseGenerator(generator);
		}
	};
}));
//#endregion
//#region ../../packages/agent-provider/src/common/client/types.ts
/**
* 类型守卫：判断是否为 LocalAgentState
*/
function isLocalAgentState(state) {
	return state.type === "local";
}
/**
* 类型守卫：判断是否为 CloudAgentState
*/
function isCloudAgentState(state) {
	return state.type === "cloud";
}
var init_types$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-provider/src/common/client/index.ts
var init_client = __esmMin((() => {
	init_client$1();
	init_session();
	init_session_manager();
	init_mock_agent_client();
	init_types$1();
}));
//#endregion
//#region ../../packages/agent-provider/src/backend/types.ts
/**
* 从 BuiltinMarketSkill 中提取 skill_id。
*
* 后端字段命名尚未最终确认（可能 `id` 或 `skill_id`），本 helper 兜底到 `name`
* 以保证前端调用链不断裂。后端确认字段后，可简化为直接取 `skill.id`。
*/
function getBuiltinMarketSkillId(skill) {
	return skill.id ?? skill.skill_id ?? skill.name;
}
var CommodityCode, AccountStatus, WxaQrcodeSceneTypes;
var init_types = __esmMin((() => {
	CommodityCode = /* @__PURE__ */ function(CommodityCode) {
		CommodityCode["free"] = "TCACA_code_001_PqouKr6QWV";
		CommodityCode["proMon"] = "TCACA_code_002_AkiJS3ZHF5";
		CommodityCode["proMonPlus"] = "TCACA_code_005_maRGyrHhw1";
		CommodityCode["gift"] = "TCACA_code_006_DbXS0lrypC";
		CommodityCode["activity"] = "TCACA_code_007_nzdH5h4Nl0";
		CommodityCode["proYear"] = "TCACA_code_003_FAnt7lcmRT";
		CommodityCode["freeMon"] = "TCACA_code_008_cfWoLwvjU4";
		CommodityCode["extra"] = "TCACA_code_009_0XmEQc2xOf";
		CommodityCode["youth"] = "TCACA_code_023_4xbGhMrE6q";
		CommodityCode["advanced"] = "TCACA_code_026_BaESVICNoi";
		CommodityCode["flagship"] = "TCACA_code_027_0FCGVA6vSa";
		CommodityCode["bonus28"] = "TCACA_code_028_NtpWi0jzXs";
		CommodityCode["bonus29"] = "TCACA_code_029_6wCGEWquYy";
		CommodityCode["bonus30"] = "TCACA_code_030_BjSt89qTvr";
		CommodityCode["extra38"] = "TCACA_code_038_OhvqZtiPKr";
		return CommodityCode;
	}({});
	AccountStatus = /* @__PURE__ */ function(AccountStatus) {
		/** 有效 */
		AccountStatus[AccountStatus["valid"] = 0] = "valid";
		/** 已退款 */
		AccountStatus[AccountStatus["refund"] = 1] = "refund";
		/** 已过期 */
		AccountStatus[AccountStatus["expired"] = 2] = "expired";
		/** 已用完 */
		AccountStatus[AccountStatus["usedUp"] = 3] = "usedUp";
		return AccountStatus;
	}({});
	WxaQrcodeSceneTypes = /* @__PURE__ */ function(WxaQrcodeSceneTypes) {
		WxaQrcodeSceneTypes["SHARE_CONTENT"] = "share-content";
		WxaQrcodeSceneTypes["SHARE_TRANSIT"] = "share-transit";
		return WxaQrcodeSceneTypes;
	}({});
}));
//#endregion
//#region ../../packages/agent-provider/src/backend/service/oauth-repository-types.ts
var init_oauth_repository_types = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-provider/src/backend/service/oauth-repository-service.ts
var OAuthRepositoryService, oauthRepositoryService;
var init_oauth_repository_service = __esmMin((() => {
	init_http();
	OAuthRepositoryService = class {
		/**
		* 获取仓库分支列表
		* API 端点: GET /console/as/connector/oauth/{name}/branches
		*
		* @param connector 连接器名称 ('github' | 'gongfeng' | 'cnb')
		* @param params 平台特定的查询参数
		* @param page 页码，从1开始，0表示不分页获取全部
		* @param perPage 每页数量，最大100
		* @returns Promise<OauthBranch[]> 分支列表
		*
		* @example
		* ```typescript
		* // GitHub
		* const branches = await service.getBranches('github', {
		*     owner: 'CodeBuddy-Official-Account',
		*     repo: 'CodeBuddyIDE'
		* });
		*
		* // Gongfeng
		* const branches = await service.getBranches('gongfeng', {
		*     project_id: '1611499'
		* });
		*
		* // CNB
		* const branches = await service.getBranches('cnb', {
		*     repo: 'genie/genie-ide'
		* });
		* ```
		*/
		async getBranches(connector, params, page = 0, perPage = 100) {
			try {
				const url = `/console/as/connector/oauth/${connector}/branches?${this.buildBranchQueryParams(connector, params, page, perPage).toString()}`;
				console.log(`[OAuthRepositoryService] GET ${url}`);
				const apiResponse = await httpService.get(url);
				if (!apiResponse.data) {
					console.warn(`[OAuthRepositoryService] No data in branches response for ${connector}`);
					return [];
				}
				const branches = apiResponse.data.branches || [];
				console.log(`[OAuthRepositoryService] Retrieved ${branches.length} branches from ${connector}`);
				return branches;
			} catch (error) {
				console.error(`[OAuthRepositoryService] Failed to get branches from ${connector}:`, error);
				throw error;
			}
		}
		/**
		* 获取仓库列表
		* API 端点: GET /console/as/connector/oauth/{name}/repos
		*
		* Note: 由于工蜂原生支持的 Search 能力会匹配 path/name/description 部分，
		* 且不支持定制，不满足产品要求（只按 name 匹配），因此前端拉取全量数据后做筛选。
		*
		* @param connector 连接器名称 ('github' | 'gongfeng' | 'cnb')
		* @param page 页码，从1开始，0表示不分页获取全部
		*             - GitHub 只支持全量数据，必须传 0
		*             - 工蜂和 CNB 依据前端逻辑而定
		* @param perPage 每页数量，最大100
		* @returns Promise<ListReposResponse> 仓库列表响应
		*
		* @example
		* ```typescript
		* // GitHub - 必须传 page=0 获取全量数据
		* const response = await service.getRepositories('github', 0, 100);
		* // response.github_repos 是 map: installation_id => repo[]
		*
		* // Gongfeng
		* const response = await service.getRepositories('gongfeng', 0, 100);
		* // response.gongfeng_repos 是数组
		*
		* // CNB
		* const response = await service.getRepositories('cnb', 0, 100);
		* // response.cnb_repos 是数组
		* ```
		*/
		async getRepositories(connector, page = 0, perPage = 100) {
			try {
				const queryParams = new URLSearchParams();
				queryParams.append("page", String(page));
				queryParams.append("per_page", String(Math.min(perPage, 100)));
				const url = `/console/as/connector/oauth/${connector}/repos?${queryParams.toString()}`;
				console.log(`[OAuthRepositoryService] GET ${url}`);
				const apiResponse = await httpService.get(url);
				if (!apiResponse.data) {
					console.warn(`[OAuthRepositoryService] No data in repos response for ${connector}`);
					return {};
				}
				const response = apiResponse.data;
				this.logRepositoryCounts(response);
				return response;
			} catch (error) {
				console.error(`[OAuthRepositoryService] Failed to get repos from ${connector}:`, error);
				throw error;
			}
		}
		/**
		* 构建分支查询参数
		*/
		buildBranchQueryParams(connector, params, page, perPage) {
			const queryParams = new URLSearchParams();
			queryParams.append("page", String(page));
			queryParams.append("per_page", String(Math.min(perPage, 100)));
			if (connector === "github") {
				const githubParams = params;
				if (!githubParams.owner || !githubParams.repo) throw new Error("GitHub requires owner and repo parameters");
				queryParams.append("owner", githubParams.owner);
				queryParams.append("repo", githubParams.repo);
			} else if (connector === "gongfeng") {
				const gongfengParams = params;
				if (!gongfengParams.project_id) throw new Error("Gongfeng requires project_id parameter");
				queryParams.append("project_id", gongfengParams.project_id);
			} else if (connector === "cnb") {
				const cnbParams = params;
				if (!cnbParams.repo) throw new Error("CNB requires repo parameter");
				queryParams.append("repo", cnbParams.repo);
			} else throw new Error(`Unknown connector: ${connector}`);
			return queryParams;
		}
		/**
		* 记录仓库数量日志
		*/
		logRepositoryCounts(response) {
			if (response.github_repos) {
				const totalCount = Object.values(response.github_repos).reduce((sum, repos) => sum + repos.length, 0);
				console.log(`[OAuthRepositoryService] Retrieved ${totalCount} GitHub repos across ${Object.keys(response.github_repos).length} installations`);
			}
			if (response.gongfeng_repos) console.log(`[OAuthRepositoryService] Retrieved ${response.gongfeng_repos.length} Gongfeng repos`);
			if (response.cnb_repos) console.log(`[OAuthRepositoryService] Retrieved ${response.cnb_repos.length} CNB repos`);
		}
	};
	oauthRepositoryService = new OAuthRepositoryService();
}));
//#endregion
//#region ../../packages/agent-provider/src/backend/service/index.ts
var init_service = __esmMin((() => {
	init_oauth_repository_types();
	init_oauth_repository_service();
}));
//#endregion
//#region ../../packages/agent-provider/src/backend/backend-provider.ts
/**
* 创建 BackendProvider 实例
*/
function createBackendProvider(config) {
	return new BackendProvider(config);
}
var getFullUrl, getSelectAccountUrl, SELECTED_ACCOUNT_KEY, CommodityCodeText, getPackageName, DEFAULT_PROJECT_INVITATION_ROLE, DEFAULT_PROJECT_INVITATION_STATUS, normalizeProjectInvitationRole, normalizeProjectInvitationStatus, normalizeOptionalProjectInvitationStatus, getBackendErrorPayload, normalizeProjectInvitationDetail, normalizeAcceptProjectInvitationResult, BackendProvider;
var init_backend_provider = __esmMin((() => {
	init_account();
	init_http();
	init_service();
	init_types();
	getFullUrl = (path) => `${window.location.origin}${path}`;
	getSelectAccountUrl = () => `${window.location.origin}/login/select`;
	SELECTED_ACCOUNT_KEY = "CODEBUDDY_IDE_SELECTED_ACCOUNT_ID";
	CommodityCodeText = {
		[CommodityCode.free]: "plan.codebuddyFreePlan",
		[CommodityCode.proMon]: "plan.codebuddyProPlanMonthly",
		[CommodityCode.proMonPlus]: "plan.codebuddyProPlanMonthly",
		[CommodityCode.gift]: "plan.codebuddyProPlanTrial",
		[CommodityCode.activity]: "plan.codebuddyGrowthPlan",
		[CommodityCode.proYear]: "plan.codebuddyProPlanYearly",
		[CommodityCode.freeMon]: "plan.codebuddyProPlanDaily",
		[CommodityCode.extra]: "plan.codebuddyCreditPackage",
		[CommodityCode.youth]: "plan.codebuddyYouthPlan",
		[CommodityCode.advanced]: "plan.codebuddyAdvancedPlan",
		[CommodityCode.flagship]: "plan.codebuddyFlagshipPlan",
		[CommodityCode.bonus28]: "plan.codebuddyBonus28Plan",
		[CommodityCode.bonus29]: "plan.codebuddyBonus29Plan",
		[CommodityCode.bonus30]: "plan.codebuddyBonus30Plan",
		[CommodityCode.extra38]: "plan.codebuddyCreditPackage"
	};
	getPackageName = (packageCode) => CommodityCodeText[packageCode] || "";
	DEFAULT_PROJECT_INVITATION_ROLE = "viewer";
	DEFAULT_PROJECT_INVITATION_STATUS = "pending";
	normalizeProjectInvitationRole = (role) => {
		if (role === "admin" || role === "editor" || role === "viewer") return role;
		return DEFAULT_PROJECT_INVITATION_ROLE;
	};
	normalizeProjectInvitationStatus = (status) => {
		if (typeof status === "string" && status.trim()) return status;
		return DEFAULT_PROJECT_INVITATION_STATUS;
	};
	normalizeOptionalProjectInvitationStatus = (status) => {
		if (typeof status === "string" && status.trim()) return normalizeProjectInvitationStatus(status);
	};
	getBackendErrorPayload = (error) => ({
		error: error?.response?.data?.msg || error?.response?.data?.message || error?.message || "Request failed",
		statusCode: error?.response?.status,
		errorCode: error?.response?.data?.code ? String(error.response.data.code) : void 0
	});
	normalizeProjectInvitationDetail = (data) => {
		const project = data?.project || {};
		const inviter = data?.inviter || {};
		return {
			inviteId: data?.inviteId || data?.invite_id || "",
			project: {
				projectId: project?.projectId || project?.project_id || "",
				name: project?.name || "",
				memberCount: Number(project?.memberCount ?? project?.member_count ?? 0),
				description: project?.description
			},
			role: normalizeProjectInvitationRole(data?.role),
			inviter: {
				userId: inviter?.userId || inviter?.user_id || "",
				name: inviter?.name || inviter?.nickname || inviter?.userName || "",
				email: inviter?.email,
				avatar: inviter?.avatar || inviter?.avatarUrl || inviter?.avatar_url
			},
			status: normalizeProjectInvitationStatus(data?.status),
			expiresAt: data?.expiresAt || data?.expires_at
		};
	};
	normalizeAcceptProjectInvitationResult = (data) => ({
		result: typeof data?.result === "string" ? data.result : typeof data?.joinStatus === "string" ? data.joinStatus : typeof data?.outcome === "string" ? data.outcome : void 0,
		projectId: data?.projectId || data?.project_id || "",
		role: normalizeProjectInvitationRole(data?.role),
		memberCount: data?.memberCount ?? data?.member_count,
		status: normalizeOptionalProjectInvitationStatus(data?.status ?? data?.nextState)
	});
	BackendProvider = class BackendProvider {
		constructor(config) {
			this.inflightGetAccount = null;
			httpService.setBaseURL(config.baseUrl);
			if (config.authToken) httpService.setAuthToken(config.authToken);
			this.smhHost = config.smhHost || BackendProvider.DEFAULT_SMH_HOST;
			httpService.onUnauthorized(() => this.handleUnauthorized());
		}
		/**
		* 处理 401 未授权错误
		* 先尝试刷新 token，失败后再执行登出流程
		*
		* @throws 如果 token 刷新失败，抛出错误通知 HttpService 不要重试
		*/
		async handleUnauthorized() {
			console.log("[BackendProvider] User unauthorized (401), attempting token refresh first");
			try {
				if (await this.refreshToken()) {
					console.log("[BackendProvider] Token refresh successful after 401, user still logged in");
					return;
				}
				throw new Error("Token refresh returned null");
			} catch (error) {
				console.error("[BackendProvider] Token refresh failed after 401:", error);
				console.log("[BackendProvider] Token refresh failed, triggering logout");
				this.logout().catch((logoutError) => {
					console.error("[BackendProvider] Logout failed in 401 handler:", logoutError);
				});
				throw error;
			}
		}
		/**
		* 获取当前账号信息
		* API 端点: GET /console/accounts (返回账号列表)
		*
		* 逻辑：
		* 1. 从 localStorage 读取 CODEBUDDY_IDE_SELECTED_ACCOUNT_ID
		* 2. 根据 CODEBUDDY_IDE_SELECTED_ACCOUNT_ID 找到对应账号
		*    - personal 类型: 用 uid 匹配
		*    - 其他类型: 用 enterpriseId 匹配
		* 3. 如果没有选中的账号，跳转到账号选择页面
		* 4. 获取套餐信息并合并到账号中
		* 5. 同步到 accountService
		*
		* 业务级 in-flight：N 个 caller 并发调用时共享同一个 Promise，
		* 避免 enrichAccountWithUsage 内部的 POST /billing/... 被重复触发。
		* 详见 inflightGetAccount 字段说明。
		*/
		async getAccount() {
			if (this.inflightGetAccount) return this.inflightGetAccount;
			this.inflightGetAccount = this._doGetAccount().finally(() => {
				this.inflightGetAccount = null;
			});
			return this.inflightGetAccount;
		}
		async _doGetAccount() {
			try {
				const accounts = (await httpService.get("/console/accounts")).data?.accounts || [];
				if (!accounts || accounts.length === 0) {
					accountService.setAccount(null);
					return null;
				}
				const selectedAccountId = localStorage.getItem(SELECTED_ACCOUNT_KEY);
				let selectedAccount;
				if (selectedAccountId) {
					selectedAccount = accounts.find((account) => {
						if (account.type === "personal") return account.uid === selectedAccountId;
						return account.enterpriseId === selectedAccountId;
					});
					if (selectedAccount) {
						const account = await this.enrichAccountWithUsage(selectedAccount);
						accountService.setAccount(account);
						return account;
					}
				}
				if (accounts.length === 1) {
					selectedAccount = accounts[0];
					const accountId = selectedAccount.type === "personal" ? selectedAccount.uid : selectedAccount.enterpriseId;
					if (accountId) localStorage.setItem(SELECTED_ACCOUNT_KEY, accountId);
					const account = await this.enrichAccountWithUsage(selectedAccount);
					console.log("account (auto-selected)", account);
					accountService.setAccount(account);
					return account;
				}
				const redirectUrl = encodeURIComponent(window.location.href);
				window.location.href = `${getSelectAccountUrl()}?platform=agents&state=0&redirect_uri=${redirectUrl}`;
				accountService.setAccount(null);
				return null;
			} catch (error) {
				console.error("[BackendProvider] getAccount failed:", error);
				accountService.setAccount(null);
				return null;
			}
		}
		/**
		* 获取用户连接器列表
		* API 端点: GET /console/as/connector/user/
		*/
		async getUserConnector() {
			const result = await httpService.get("/console/as/connector/user/");
			if (result.code === 0) {
				const { connectors } = result.data;
				return { connectors: connectors.map((connector) => ({
					...connector,
					connectStatus: connector.connect_status,
					activeStatus: connector.active_status,
					displayName: connector.display_name,
					oauthClientId: connector.oauth_client_id,
					oauthRedirectUrl: connector.oauth_redirect_url,
					oauthAppName: connector.oauth_app_name
				})) };
			}
			throw result;
		}
		/**
		* 修改用户连接器连接状态
		* API 端点: PATCH /console/as/connector/user/:name/connect_status
		*/
		async modifyUserConnectorConnectStatus(request) {
			const body = {
				name: request.name,
				connect_status: request.connectStatus
			};
			if (request.activeStatus !== void 0) body.active_status = request.activeStatus;
			if (request.repos !== void 0) body.repos = request.repos;
			const result = await httpService.patch(`/console/as/connector/user/${request.name}/connect_status`, body);
			if (result.code === 0) return;
			throw result;
		}
		/**
		* 修改用户连接器仓库
		* API 端点: PATCH /console/as/connector/user/:name/repo/
		*/
		async modifyUserConnectorRepo(request) {
			const body = { name: request.name };
			if (request.repo !== void 0) body.repo = request.repo;
			const result = await httpService.patch(`/console/as/connector/user/${request.name}/repo`, body);
			if (result.code === 0) return;
			throw result;
		}
		/**
		* 修改用户连接器激活状态
		* API 端点: PATCH /console/as/connector/user/:name/active_status
		*/
		async modifyUserConnectorActiveStatus(request) {
			const body = {
				name: request.name,
				active_status: request.activeStatus
			};
			const result = await httpService.patch(`/console/as/connector/user/${request.name}/active_status`, body);
			if (result.code === 0) return;
			throw result;
		}
		/**
		* 删除用户连接器
		* API 端点: DELETE /console/as/connector/user/:name/
		*/
		async deleteUserConnector(name) {
			const result = await httpService.delete(`/console/as/connector/user/${name}/`);
			if (result.code === 0) return;
			throw result;
		}
		/**
		* 添加任务
		* API 端点: POST /console/as/connector/task/
		*/
		async addConnectorTask(request) {
			const body = { task_id: request.taskId };
			if (request.connectors !== void 0) body.connectors = request.connectors.map((c) => ({
				name: c.name,
				repos: c.repos,
				active_status: c.activeStatus
			}));
			const result = await httpService.post("/console/as/connector/task/", body);
			if (result.code === 0) return { taskId: result.data?.task_id || request.taskId };
			throw result;
		}
		/**
		* 获取任务连接器列表
		* API 端点: GET /console/as/connector/task/:taskid
		*/
		async getTaskConnector(taskId) {
			const result = await httpService.get(`/console/as/connector/task/${taskId}`);
			if (result.code === 0) {
				const { connectors } = result.data;
				return { connectors: (connectors || []).map((connector) => ({
					...connector,
					activeStatus: connector.active_status,
					connectStatus: connector.connect_status,
					displayName: connector.display_name,
					oauthClientId: connector.oauth_client_id,
					oauthRedirectUrl: connector.oauth_redirect_url,
					oauthAppName: connector.oauth_app_name
				})) };
			}
			throw result;
		}
		/**
		* 修改任务连接器激活状态
		* API 端点: PATCH /console/as/connector/task/:taskid/active_status
		*/
		async modifyTaskConnectorActiveStatus(request) {
			const body = {
				task_id: request.taskId,
				name: request.name,
				active_status: request.activeStatus
			};
			const result = await httpService.patch(`/console/as/connector/task/${request.taskId}/active_status`, body);
			if (result.code === 0) return { taskId: result.data?.task_id || request.taskId };
			throw result;
		}
		/**
		* 修改任务连接器仓库
		* API 端点: PATCH /console/as/connector/task/:taskid/repo
		*/
		async modifyTaskConnectorRepo(request) {
			const body = {
				task_id: request.taskId,
				name: request.name,
				repo: request.repo
			};
			const result = await httpService.patch(`/console/as/connector/task/${request.taskId}/repo`, body);
			if (result.code === 0) return { taskId: result.data?.task_id || request.taskId };
			throw result;
		}
		/**
		* 根据账号类型获取用量信息并合并到账号中
		* - 企业用户：调用 getEnterpriseUsage 获取月度限额
		* - 个人用户：调用 getCurrentPlan 获取套餐信息
		*/
		async enrichAccountWithUsage(selectedAccount) {
			const isEnterpriseUser = !!(selectedAccount.enterpriseId && selectedAccount.enterpriseId !== "");
			try {
				if (isEnterpriseUser) {
					const enterpriseUsage = await this.getEnterpriseUsage(selectedAccount.enterpriseId);
					const editionType = this.getEditionDisplayType(selectedAccount.type, false);
					if (enterpriseUsage) {
						const usageLeft = (enterpriseUsage.limitNum - enterpriseUsage.credit).toString();
						const usageTotal = enterpriseUsage.limitNum.toString();
						return {
							...selectedAccount,
							editionType,
							usageLeft,
							usageTotal,
							refreshAt: enterpriseUsage.cycleResetTime ? new Date(enterpriseUsage.cycleResetTime).getTime() : void 0
						};
					}
					return {
						...selectedAccount,
						editionType
					};
				} else {
					const plan = await this.getCurrentPlan();
					const editionType = this.getEditionDisplayType(selectedAccount.type, plan.isPro, plan.isYouth, plan.isAdvanced, plan.isFlagship);
					return {
						...selectedAccount,
						...plan,
						editionType
					};
				}
			} catch (error) {
				console.error("[BackendProvider] enrichAccountWithUsage failed:", error);
				return { ...selectedAccount };
			}
		}
		/**
		* 获取当前套餐信息
		* 从计量计费接口获取用户的套餐信息
		* API: POST /billing/meter/get-user-resource
		*/
		async getCurrentPlan() {
			const defaultPlan = {
				isPro: false,
				expireAt: 0,
				renewFlag: 0,
				PackageCode: void 0,
				name: ""
			};
			try {
				const now = /* @__PURE__ */ new Date();
				const formatDate = (d) => {
					const pad = (n) => n.toString().padStart(2, "0");
					return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
				};
				const body = {
					PageNumber: 1,
					PageSize: 100,
					ProductCode: "p_tcaca",
					Status: [AccountStatus.valid, AccountStatus.usedUp],
					PackageStartTimeRangeBegin: "2024-12-01 21:25:00",
					PackageStartTimeRangeEnd: formatDate(now)
				};
				const resources = (await httpService.post("/billing/meter/get-user-resource", body))?.data?.Response?.Data?.Accounts || [];
				if (!resources || resources.length === 0) return defaultPlan;
				const parseTime = (time) => {
					if (!time) return 0;
					if (typeof time === "string" && /^\d+$/.test(time)) return new Date(Number(time)).getTime();
					return new Date(time).getTime();
				};
				const dailyCredits = [CommodityCode.free];
				const onlyRefreshCodes = [
					CommodityCode.proMon,
					CommodityCode.proMonPlus,
					CommodityCode.proYear,
					CommodityCode.freeMon,
					CommodityCode.youth,
					CommodityCode.advanced,
					CommodityCode.flagship,
					CommodityCode.bonus28
				];
				const onlyExpireCodes = [
					CommodityCode.activity,
					CommodityCode.extra,
					CommodityCode.extra38,
					CommodityCode.bonus29,
					CommodityCode.bonus30
				];
				const planResources = resources.map((r) => {
					const isDaily = dailyCredits.includes(r.PackageCode);
					const endTime = isDaily ? r.CycleEndTime : r.DeductionEndTime;
					const refreshAt = parseTime(r.CycleEndTime) + 1e3;
					const startAt = parseTime(r.DeductionStartTime) || parseTime(r.CycleStartTime) || void 0;
					const showExpireAt = !onlyRefreshCodes.includes(r.PackageCode);
					const showRefreshAt = !onlyExpireCodes.includes(r.PackageCode);
					return {
						id: r.ResourceId,
						name: isDaily ? "plan.addonCredits" : getPackageName(r.PackageCode),
						packageCode: r.PackageCode,
						isDaily,
						total: Number(r.CycleCapacitySizePrecise) || 0,
						used: Math.max(0, Number(r.CycleCapacitySizePrecise) - Number(r.CycleCapacityRemainPrecise)) || 0,
						left: Number(r.CycleCapacityRemainPrecise) || 0,
						startAt,
						expireAt: parseTime(endTime),
						refreshAt: isDaily ? void 0 : refreshAt,
						showExpireAt,
						showRefreshAt
					};
				}).sort((a, b) => {
					const getPriority = (code) => {
						if ([
							CommodityCode.proMon,
							CommodityCode.proMonPlus,
							CommodityCode.proYear,
							CommodityCode.freeMon,
							CommodityCode.youth,
							CommodityCode.advanced,
							CommodityCode.flagship
						].includes(code)) return 1;
						if ([CommodityCode.bonus28].includes(code)) return 2;
						if ([CommodityCode.extra, CommodityCode.extra38].includes(code)) return 3;
						if ([
							CommodityCode.activity,
							CommodityCode.bonus29,
							CommodityCode.bonus30
						].includes(code)) return 4;
						if ([CommodityCode.gift].includes(code)) return 5;
						if ([CommodityCode.free].includes(code)) return 6;
						return 7;
					};
					const priorityDiff = getPriority(a.packageCode) - getPriority(b.packageCode);
					if (priorityDiff !== 0) return priorityDiff;
					return (a.expireAt ?? Infinity) - (b.expireAt ?? Infinity);
				});
				const proPlan = resources.find((r) => r.PackageCode === CommodityCode.proYear || r.PackageCode === CommodityCode.proMon || r.PackageCode === CommodityCode.proMonPlus);
				const youthPlan = resources.find((r) => r.PackageCode === CommodityCode.youth);
				const advancedPlan = resources.find((r) => r.PackageCode === CommodityCode.advanced);
				const flagshipPlan = resources.find((r) => r.PackageCode === CommodityCode.flagship);
				const trialPlan = resources.find((r) => r.PackageCode === CommodityCode.gift || r.PackageCode === CommodityCode.freeMon);
				const activePlan = flagshipPlan || advancedPlan || youthPlan || proPlan || trialPlan;
				const totalUsageLeft = planResources.reduce((sum, r) => sum + r.left, 0);
				const totalUsageTotal = planResources.reduce((sum, r) => sum + r.total, 0);
				const totalUsageUsed = planResources.reduce((sum, r) => sum + r.used, 0);
				if (activePlan) return {
					isPro: !!proPlan,
					isYouth: !!youthPlan,
					isAdvanced: !!advancedPlan,
					isFlagship: !!flagshipPlan,
					isTria: trialPlan ? [AccountStatus.valid, AccountStatus.usedUp].includes(trialPlan.Status) : false,
					expireAt: parseTime(activePlan.DeductionEndTime || activePlan.ExpiredTime || activePlan.CycleEndTime),
					refreshAt: parseTime(activePlan.CycleEndTime),
					renewFlag: Number(activePlan.AutoRenewFlag) === 1 ? 1 : 0,
					PackageCode: activePlan.PackageCode,
					name: getPackageName(activePlan.PackageCode),
					usageTotal: String(totalUsageTotal),
					usageUsed: String(totalUsageUsed),
					usageLeft: String(totalUsageLeft),
					resources: planResources
				};
				return {
					...defaultPlan,
					usageTotal: String(totalUsageTotal),
					usageUsed: String(totalUsageUsed),
					usageLeft: String(totalUsageLeft),
					resources: planResources
				};
			} catch (error) {
				console.error("[BackendProvider] getCurrentPlan error:", error);
				return defaultPlan;
			}
		}
		/**
		* 通过回调code，换token
		* @param request
		* @returns
		*/
		async saveOauthToken(request) {
			const body = { authorization_code: request.authorizationCode };
			const result = await httpService.post(`/console/as/connector/oauth/${request.name}/connect`, body);
			if (result.code === 0) return;
			throw result;
		}
		/**
		* 获取OAuth连接器的仓库列表
		*/
		async getRepoList(request) {
			const result = await httpService.get(`/console/as/connector/oauth/${request.name}/repos`);
			if (result.code === 0) return result.data;
			throw result;
		}
		/**
		* 撤销OAuth连接器的所有连接
		*/
		async revokeAll(request) {
			const installationIds = request?.installationIds ?? [];
			const body = { name: request.name };
			if (installationIds) body.installation_ids = installationIds;
			const result = await httpService.post(`/console/as/connector/oauth/${request.name}/revokeall`, body);
			if (result.code === 0) return;
			throw result;
		}
		/**
		* 获取 OAuth 用户信息
		* API 端点: GET /console/as/connector/oauth/:name/oauthuser
		*/
		async getOauthUser(request) {
			const result = await httpService.get(`/console/as/connector/oauth/${request.name}/oauthuser`);
			if (result.code === 0) {
				const data = result.data || {};
				return { user: {
					avatarUrl: data.user?.avatar_url || "",
					name: data.user?.name || ""
				} };
			}
			throw result;
		}
		/**
		* 获取文件信息
		* API 端点: GET /console/as/connector/oauth/:name/file
		*/
		async getFile(request) {
			const body = { url: request.url };
			const result = await httpService.post(`/console/as/connector/oauth/${request.name}/file`, body);
			if (result.code === 0) {
				const figmaFileInfo = (result.data || {}).figma_file_info;
				return { figmaFileInfo: figmaFileInfo ? {
					name: figmaFileInfo.name || "",
					role: figmaFileInfo.role || "",
					lastModified: figmaFileInfo.last_modified || "",
					editorType: figmaFileInfo.editor_type || "",
					thumbnailUrl: figmaFileInfo.thumbnail_url || "",
					version: figmaFileInfo.version || "",
					mainFileKey: figmaFileInfo.main_file_key || ""
				} : null };
			}
			throw result;
		}
		/**
		* 根据账号类型和订阅状态计算版本展示类型
		*/
		getEditionDisplayType(type, isPro, isYouth = false, isAdvanced = false, isFlagship = false) {
			if (type === "personal") {
				if (isFlagship) return "flagship";
				if (isAdvanced) return "advanced";
				if (isYouth) return "youth";
				return isPro ? "pro" : "free";
			}
			if (type === "ultimate") return "ultimate";
			if (type === "exclusive") return "exclusive";
			return "free";
		}
		/**
		* 触发登录流程
		* Web 环境: 跳转到登录页面
		*/
		async login() {
			const redirectUrl = encodeURIComponent(window.location.href);
			window.location.href = `${getFullUrl("/login")}?platform=agents&state=0&redirect_uri=${redirectUrl}`;
		}
		/**
		* 登出账号
		*
		* 策略：
		* - IOA 企业：用 iframe 走 SSO/SAML SLO 登出链路（涉及跨域重定向），通过轮询 iframe URL 变化检测完成
		* - 非 IOA 企业：直接用 httpService 请求 /console/logout，速度快
		*/
		async logout() {
			const account = accountService.getAccount();
			if (account?.enterpriseId && ["esoikz80kd8g", "etahzsqej0n4"].includes(account.enterpriseId)) await this.logoutViaIframe();
			else await this.logoutViaHttp();
			localStorage.removeItem(SELECTED_ACCOUNT_KEY);
			accountService.clearAccount();
		}
		/**
		* IOA 企业登出：通过 iframe 走 SSO/SAML SLO 登出链路
		* 轮询 iframe URL 变化检测完成，兜底超时 5 秒
		*/
		async logoutViaIframe() {
			const logoutUrl = `${httpService.getAxiosInstance().defaults.baseURL}/console/logout`;
			try {
				await new Promise((resolve) => {
					const iframe = document.createElement("iframe");
					iframe.style.cssText = "position:fixed;top:-9999px;left:-9999px;width:1px;height:1px;border:none;";
					iframe.src = logoutUrl;
					let pollTimer;
					let settled = false;
					const done = () => {
						if (settled) return;
						settled = true;
						clearInterval(pollTimer);
						clearTimeout(timeout);
						if (iframe.parentNode) iframe.parentNode.removeChild(iframe);
						resolve();
					};
					let wasRedirecting = false;
					pollTimer = setInterval(() => {
						try {
							const href = iframe.contentWindow?.location?.href;
							if (wasRedirecting && href) done();
						} catch {
							wasRedirecting = true;
						}
					}, 100);
					const timeout = setTimeout(done, 5e3);
					iframe.onerror = done;
					document.body.appendChild(iframe);
				});
			} catch (error) {
				console.error("[BackendProvider] logout via iframe failed:", error);
			}
		}
		/**
		* 非 IOA 企业登出：直接 HTTP 请求 /console/logout
		*/
		async logoutViaHttp() {
			try {
				await httpService.get("/console/logout");
			} catch (error) {
				console.error("[BackendProvider] logout via http failed:", error);
			}
		}
		/**
		* 批量切换插件状态
		* Web 环境不支持此功能
		*/
		async batchTogglePlugins(request) {
			console.warn("[BackendProvider] batchTogglePlugins is not supported in web environment");
			return {
				success: false,
				succeededPlugins: [],
				failedPlugins: request.items.map((item) => ({
					...item,
					error: "Plugin batch toggle is not supported in web environment"
				}))
			};
		}
		/**
		* 获取企业用户用量信息
		* API: POST /billing/meter/get-enterprise-user-usage
		*/
		async getEnterpriseUsage(enterpriseId) {
			try {
				const result = await httpService.post("/billing/meter/get-enterprise-user-usage", {}, { headers: { "X-Enterprise-Id": enterpriseId } });
				const usageData = result?.data?.data || result?.data || result;
				if (usageData && typeof usageData.limitNum === "number") return usageData;
				return null;
			} catch (error) {
				console.error("[BackendProvider] getEnterpriseUsage error:", error);
				return null;
			}
		}
		/**
		* 刷新 Token
		* 通过调用 getAccount 刷新 cookie，适用于 Cloud 场景下页面切换回来时刷新登录态
		* @returns Promise<Account | null> 刷新后的账号信息
		*/
		async refreshToken() {
			console.log("[BackendProvider] Refreshing token...");
			try {
				const account = await this.getAccount();
				console.log("[BackendProvider] Token refreshed, account:", account?.uid);
				return account;
			} catch (error) {
				console.error("[BackendProvider] refreshToken failed:", error);
				return null;
			}
		}
		/**
		* 获取仓库分支列表
		* API 端点: GET /console/as/connector/oauth/{name}/branches
		*
		* @param connector 连接器名称 ('github' | 'gongfeng' | 'cnb')
		* @param params 平台特定的查询参数
		* @param page 页码，从1开始，0表示不分页获取全部
		* @param perPage 每页数量，最大100
		* @returns Promise<OauthBranch[]> 分支列表
		*/
		async getBranches(connector, params, page = 0, perPage = 100) {
			return oauthRepositoryService.getBranches(connector, params, page, perPage);
		}
		/**
		* 获取仓库列表
		* API 端点: GET /console/as/connector/oauth/{name}/repos
		*
		* Note: 由于工蜂原生支持的 Search 能力会匹配 path/name/description 部分，
		* 且不支持定制，不满足产品要求（只按 name 匹配），因此前端拉取全量数据后做筛选。
		*
		* @param connector 连接器名称 ('github' | 'gongfeng' | 'cnb')
		* @param page 页码，从1开始，0表示不分页获取全部
		*             - GitHub 只支持全量数据，必须传 0
		*             - 工蜂和 CNB 依据前端逻辑而定
		* @param perPage 每页数量，最大100
		* @returns Promise<ListReposResponse> 仓库列表响应
		*/
		async getRepositories(connector, page = 0, perPage = 100) {
			return oauthRepositoryService.getRepositories(connector, page, perPage);
		}
		/**
		* 保存待发送的输入内容到后端
		* API 端点: POST /api/v1/code-id
		*/
		async savePendingInput(code) {
			try {
				const result = await httpService.post("/api/v1/code-id", { code });
				return result?.codeId || result?.data?.codeId || null;
			} catch (e) {
				console.warn("[BackendProvider] savePendingInput failed:", e);
				return null;
			}
		}
		/**
		* 从后端加载待发送的输入内容
		* API 端点: GET /api/v1/code?id=xxx
		*/
		async loadPendingInput(codeId) {
			try {
				const result = await httpService.get(`/api/v1/code?id=${encodeURIComponent(codeId)}`);
				return result?.code || result?.data?.code || null;
			} catch (e) {
				console.warn("[BackendProvider] loadPendingInput failed:", e);
				return null;
			}
		}
		/**
		* 获取每日签到状态
		* API 端点: POST /billing/meter/checkin-status
		*/
		async getCheckinStatus() {
			try {
				const result = await httpService.post("/billing/meter/checkin-status", {});
				if (result?.code === 0 && result?.data) return result.data;
				return null;
			} catch (error) {
				console.error("[BackendProvider] getCheckinStatus failed:", error);
				return null;
			}
		}
		/**
		* 执行每日签到
		* API 端点: POST /billing/meter/daily-checkin
		*/
		async claimDailyCheckin() {
			const result = await httpService.post("/billing/meter/daily-checkin", {});
			if (result?.code === 0 && result?.data) return result.data;
			return {
				code: result?.code ?? -1,
				msg: result?.msg || "Checkin failed",
				requestId: result?.requestId
			};
		}
		/**
		* 上传分享文件到服务端获取分享链接
		* API 端点: POST /v2/as/netdisk/upload
		*
		* 参数与 authApiClient.ts 中 uploadShareFile 保持对齐：
		* - filePath: 文件路径（必填）
		* - fileName: 文件名（可选，不提供时从 filePath 中提取）
		* - createShare: 是否创建分享链接（可选，默认 true）
		*
		* Web 环境特有参数：
		* - file: 上传的文件 Blob（Web 环境必填）
		*
		* @param params 上传参数
		* @returns Promise<ShareFileUploadResult> 上传结果
		*/
		async uploadShareFile(params) {
			try {
				const { file, filePath, fileName, remotePath, createShare = true, shareMetadata } = params;
				const actualFileName = fileName || filePath.split("/").pop() || "unknown";
				const formData = new FormData();
				formData.append("file", file, actualFileName);
				formData.append("filePath", remotePath || filePath);
				if (fileName) formData.append("fileName", fileName);
				if (createShare) formData.append("createShare", "true");
				if (shareMetadata) try {
					formData.append("shareMetadata", JSON.stringify(shareMetadata));
				} catch (err) {
					console.warn("[BackendProvider] uploadShareFile shareMetadata stringify failed:", err);
				}
				return await httpService.post("/v2/as/netdisk/upload", formData, { headers: { "Content-Type": "multipart/form-data" } });
			} catch (error) {
				const errorMessage = error instanceof Error ? error.message : "Unknown error";
				console.error("[BackendProvider] uploadShareFile failed:", params.filePath, error);
				return {
					success: false,
					error: errorMessage
				};
			}
		}
		/**
		* 生成微信小程序码（artifact / conversation 分享场景）
		*
		* 与 {@link generateMiniProgramQRCode} 共用同一后端 endpoint
		* （POST /v2/as/p/wxaqrcode/qrcode），区别在于本方法是分享 dialog 走的双参便捷入口，
		* 返回的 typed 响应里 `dataUrl` 字段保留为空（仅 Desktop RPC 主进程会回填）。
		*
		* @param bizType    业务类型：artifact（产物分享）/ conversation（会话分享）
		* @param shareCode  分享码
		* @param shareUrl   分享链接
		* @param shareTitle 分享标题
		* @param shareCover 分享封面图 URL
		*/
		async generateWxMPQRCode(bizType, shareCode, shareUrl, shareTitle, shareCover) {
			return this.generateMiniProgramQRCode({
				sceneType: WxaQrcodeSceneTypes.SHARE_TRANSIT,
				bizType,
				shareCode,
				shareUrl,
				shareTitle,
				shareCover
			});
		}
		/**
		* 获取分享列表
		* API 端点: GET /v2/as/netdisk/shares
		*
		* @param params 分页参数
		* @returns Promise<ShareListResult> 分享列表结果
		*/
		async getShareList(params) {
			const page = params?.page ?? 1;
			const pageSize = params?.pageSize ?? 20;
			try {
				const result = await httpService.get(`/v2/as/netdisk/shares?page=${page}&pageSize=${pageSize}`);
				if (result?.code === 0 && result?.data) return {
					success: result.data.success ?? true,
					records: result.data.records || [],
					total: result.data.total || 0,
					page: result.data.page || page,
					pageSize: result.data.pageSize || pageSize
				};
				return {
					success: false,
					records: [],
					total: 0,
					page,
					pageSize,
					error: result?.msg || "Unknown error"
				};
			} catch (error) {
				console.error("[BackendProvider] getShareList failed:", error);
				return {
					success: false,
					records: [],
					total: 0,
					page,
					pageSize,
					error: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		/**
		* 获取专家排行榜数据
		* API 端点: GET /console/expert/ranking
		* 完全对齐 getCheckinStatus 的调用方式
		*
		* @param options.limit 期望返回的专家条数。服务端默认仅返回 100 条，
		*                      超过该阈值时后面的专家卡片会缺失 `useCount` 导致热度不展示。
		*/
		async getExpertRanking(options) {
			try {
				const query = {};
				if (options?.limit && Number.isFinite(options.limit) && options.limit > 0) query.limit = Math.floor(options.limit);
				const result = await httpService.get("/console/expert/ranking", Object.keys(query).length > 0 ? { params: query } : void 0);
				if (result?.code === 0 && result?.data) {
					const normalizedItems = Array.isArray(result.data.items) ? result.data.items : Array.isArray(result.data.experts) ? result.data.experts : [];
					return {
						items: normalizedItems,
						total: result.data.total ?? normalizedItems.length,
						updateTime: result.data.updateTime ?? Date.now()
					};
				}
				return null;
			} catch (error) {
				console.error("[BackendProvider] getExpertRanking failed:", error);
				return null;
			}
		}
		/**
		* 获取对话分享详情
		* API 端点: GET /v2/as/p/tasks/share/:code
		*
		* @param code 分享码
		* @returns Promise<TaskShareDetailResponse | TaskShareDetailError> 对话分享详情或错误信息
		*/
		async getTaskShareDetail(code) {
			try {
				const result = await httpService.get(`/v2/as/p/tasks/share/${encodeURIComponent(code)}`);
				if (result?.code && typeof result.code === "number" && result.code !== 0) return {
					data: null,
					error: result.message || "Unknown error"
				};
				return {
					data: result.data,
					error: null
				};
			} catch (error) {
				console.error("[BackendProvider] getTaskShareDetail failed:", error);
				if (error?.response?.status) return {
					data: null,
					error: error.response.data?.message || error.message || "Request failed"
				};
				return {
					data: null,
					error: error instanceof Error ? error.message : "Network error"
				};
			}
		}
		/**
		* 验证并获取对话分享内容
		* API 端点: POST /v2/as/p/tasks/share/:code/verify
		*
		* @param request 验证请求参数，包含分享码和可选的提取码
		* @returns Promise<TaskShareVerifyResponse | TaskShareVerifyError> 验证结果或错误信息
		*/
		async verifyTaskShare(request) {
			try {
				const body = {};
				if (request.extractionCode) body.extractionCode = request.extractionCode;
				const result = await httpService.post(`/v2/as/p/tasks/share/${encodeURIComponent(request.code)}/verify`, body);
				if (result?.code && typeof result.code === "number" && result.code !== 0) return {
					data: null,
					error: result.message || "Unknown error"
				};
				return {
					data: result.data,
					error: null
				};
			} catch (error) {
				console.error("[BackendProvider] verifyTaskShare failed:", error);
				if (error?.response?.status) return {
					data: null,
					error: error.response.data?.message || error.message || "Request failed"
				};
				return {
					data: null,
					error: error instanceof Error ? error.message : "Network error"
				};
			}
		}
		/**
		* 生成微信小程序码
		* API 端点: POST /v2/as/p/wxaqrcode/qrcode（免鉴权）
		*
		* 同一组 (sceneType, bizType, shareCode) 在 24h 内复用同一个 scene 与 cos_url。
		* 当前仅供分享落地页（task / artifact）使用，由于落地页对未登录访客可见，
		* 因此走 `/p/` 免鉴权路径，避免触发登录拦截。
		*
		* @param request 生成请求参数
		* @returns Promise<WxaQrcodeResponse | WxaQrcodeError> 小程序码数据或错误信息
		*/
		async generateMiniProgramQRCode(request) {
			try {
				const result = await httpService.post("/v2/as/p/wxaqrcode/qrcode", {
					scene_type: request.sceneType,
					params: {
						biz_type: request.bizType,
						share_code: request.shareCode,
						share_url: request.shareUrl,
						share_title: request.shareTitle,
						share_cover: request.shareCover
					}
				});
				if (result?.code && typeof result.code === "number" && result.code !== 0) return {
					data: null,
					error: result.message || "Unknown error"
				};
				const raw = result?.data ?? result;
				if (!raw?.cos_url) return {
					data: null,
					error: "Empty wxa qrcode response"
				};
				return {
					data: {
						scene: raw.scene,
						sceneType: raw.scene_type,
						params: raw.params,
						cosUrl: raw.cos_url,
						cached: !!raw.cached
					},
					error: null
				};
			} catch (error) {
				console.error("[BackendProvider] generateMiniProgramQRCode failed:", error);
				if (error?.response?.status) return {
					data: null,
					error: error.response.data?.message || error.message || "Request failed"
				};
				return {
					data: null,
					error: error instanceof Error ? error.message : "Network error"
				};
			}
		}
		/**
		* 获取用户成长体系数据
		* API 端点: GET /activity/growth/buddy/info
		* 完全对齐 getExpertRanking 的调用方式
		*/
		async getGrowthBuddy() {
			try {
				const result = await httpService.get("/activity/growth/buddy/info");
				if (result?.code === 0 && result?.data) return result.data;
				return null;
			} catch (error) {
				console.error("[BackendProvider] getGrowthBuddy failed:", error);
				return null;
			}
		}
		/**
		* 获取分享详情
		* API 端点: GET /netdisk/share/:code
		*
		* @param code 分享码
		* @returns Promise<ShareDetailResponse | ShareDetailError> 分享详情或错误信息
		*/
		async getShareDetail(code) {
			try {
				const result = await httpService.get(`/v2/as/p/netdisk/share/${encodeURIComponent(code)}`);
				if (result?.code && typeof result.code === "number" && result.code !== 0) return {
					data: null,
					error: result.message || "Unknown error"
				};
				return {
					data: result.data,
					error: null
				};
			} catch (error) {
				console.error("[BackendProvider] getShareDetail failed:", error);
				if (error?.response?.status) return {
					data: null,
					error: error.response.data?.message || error.message || "Request failed"
				};
				return {
					data: null,
					error: error instanceof Error ? error.message : "Network error"
				};
			}
		}
		/**
		* 获取项目邀请详情
		* API 端点: GET /console/as/invitations/project/:token
		*
		* @param token 邀请 token
		* @returns Promise<ProjectInvitationDetailResponse | ProjectInvitationDetailError> 项目邀请详情或错误信息
		*/
		async getProjectInvitationDetail(token) {
			try {
				const result = await httpService.get(`/console/as/invitations/project/${encodeURIComponent(token)}`);
				if (result?.code && typeof result.code === "number" && result.code !== 0) return {
					data: null,
					error: result.msg || result.message || "Unknown error",
					errorCode: String(result.code)
				};
				return {
					data: normalizeProjectInvitationDetail(result?.data || {}),
					error: null
				};
			} catch (error) {
				console.error("[BackendProvider] getProjectInvitationDetail failed:", error);
				return {
					data: null,
					...getBackendErrorPayload(error)
				};
			}
		}
		/**
		* 接受项目邀请
		* API 端点: POST /console/as/invitations/project/:token/accept
		*
		* @param token 邀请 token
		* @returns Promise<AcceptProjectInvitationResponse | AcceptProjectInvitationError> 接受项目邀请结果或错误信息
		*/
		async acceptProjectInvitation(token) {
			try {
				const result = await httpService.post(`/console/as/invitations/project/${encodeURIComponent(token)}/accept`, {});
				if (result?.code && typeof result.code === "number" && result.code !== 0) return {
					data: null,
					error: result.msg || result.message || "Unknown error",
					errorCode: String(result.code)
				};
				return {
					data: normalizeAcceptProjectInvitationResult(result?.data || {}),
					error: null
				};
			} catch (error) {
				console.error("[BackendProvider] acceptProjectInvitation failed:", error);
				return {
					data: null,
					...getBackendErrorPayload(error)
				};
			}
		}
		/**
		* 通过分享链接创建 Cloud Agent 实例（幂等）
		* API 端点: POST /console/as/cloudagent/share/:agentBusinessId/create
		*/
		async createInstanceFromShare(agentBusinessId) {
			try {
				const result = await httpService.post(`/console/as/cloudagent/share/${encodeURIComponent(agentBusinessId)}/create`, {});
				if (result?.code && result.code !== 0) return { error: result.msg || `Error code: ${result.code}` };
				const data = result?.data;
				if (!data?.instance) return { error: "Invalid response: missing instance" };
				return data;
			} catch (err) {
				console.error("[BackendProvider] createInstanceFromShare error:", err);
				const respData = err?.response?.data;
				return { error: respData?.msg || respData?.message || err?.message || "Unknown error" };
			}
		}
		static {
			this.DEFAULT_SMH_HOST = "https://smh26tqjmz2qlj4i.api.tencentsmh.cn";
		}
		/**
		* 验证分享
		* API 端点: POST SMH_HOST/api/v1/share/verify/{ShareCode}
		*
		* @param request 验证分享请求参数
		* @returns Promise<VerifyShareResponse | VerifyShareError> 验证结果或错误信息
		*/
		async verifyShare(request) {
			try {
				const { shareCode, extractionCode, libraryId, accessToken } = request;
				const body = {};
				if (extractionCode) body.extractionCode = extractionCode;
				if (libraryId) body.libraryId = libraryId;
				if (accessToken) body.access_token = accessToken;
				const response = await fetch(`${this.smhHost}/api/v1/share/verify/${encodeURIComponent(shareCode)}`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(body)
				});
				if (!response.ok) {
					const errorData = await response.json().catch(() => ({}));
					return { error: errorData.message || errorData.error || `Request failed with status ${response.status}` };
				}
				const result = await response.json();
				return {
					accessToken: result.accessToken,
					expireTime: result.expireTime
				};
			} catch (error) {
				console.error("[BackendProvider] verifyShare failed:", error);
				return { error: error instanceof Error ? error.message : "Network error" };
			}
		}
		static {
			this.SKILLHUB_BASE_URL = "https://lightmake.site";
		}
		static {
			this.SKILLHUB_FETCH_TIMEOUT = 1e4;
		}
		async skillHubFetch(url, init) {
			const controller = new AbortController();
			const timer = setTimeout(() => controller.abort(), BackendProvider.SKILLHUB_FETCH_TIMEOUT);
			try {
				return await fetch(url, {
					...init,
					signal: controller.signal
				});
			} finally {
				clearTimeout(timer);
			}
		}
		async getSkillHubList(params = {}) {
			const qs = new URLSearchParams();
			if (params.page) qs.set("page", String(params.page));
			if (params.pageSize) qs.set("pageSize", String(params.pageSize));
			if (params.sortBy) qs.set("sortBy", params.sortBy);
			if (params.order) qs.set("order", params.order);
			if (params.keyword) qs.set("keyword", params.keyword);
			if (params.category) qs.set("category", params.category);
			const res = await this.skillHubFetch(`${BackendProvider.SKILLHUB_BASE_URL}/api/skills?${qs.toString()}`);
			if (!res.ok) throw new Error(`SkillHub list: ${res.status}`);
			return res.json();
		}
		async getSkillHubCategories() {
			const res = await this.skillHubFetch(`${BackendProvider.SKILLHUB_BASE_URL}/api/v1/categories`);
			if (!res.ok) throw new Error(`SkillHub categories: ${res.status}`);
			return res.json();
		}
		async getSkillHubSearch(q, limit = 20) {
			const qs = new URLSearchParams({
				q,
				limit: String(limit)
			});
			const res = await this.skillHubFetch(`${BackendProvider.SKILLHUB_BASE_URL}/api/v1/search?${qs.toString()}`);
			if (!res.ok) throw new Error(`SkillHub search: ${res.status}`);
			return res.json();
		}
		async getSkillHubDetail(slug) {
			const res = await this.skillHubFetch(`${BackendProvider.SKILLHUB_BASE_URL}/api/v1/skills/${encodeURIComponent(slug)}`);
			if (!res.ok) throw new Error(`SkillHub detail: ${res.status}`);
			return res.json();
		}
		async getSkillHubExists(slugs) {
			const res = await this.skillHubFetch(`${BackendProvider.SKILLHUB_BASE_URL}/api/v1/skills/exists`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ slugs })
			});
			if (!res.ok) throw new Error(`SkillHub exists: ${res.status}`);
			return res.json();
		}
		async reportSkillHubStats(slug, inc) {
			try {
				await this.skillHubFetch(`${BackendProvider.SKILLHUB_BASE_URL}/api/v1/skills/${encodeURIComponent(slug)}/stats/inc`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(inc)
				});
			} catch {}
		}
		async installSkillHubSkill(_slug, _version, _name, _iconUrl, _labels) {
			return {
				success: false,
				skillName: _slug,
				errorMessage: "SkillHub install requires IDE mode (no IPC channel available)"
			};
		}
		async getSkillHubInstalledMetas() {
			return [];
		}
		async getKnotList() {
			return {
				code: 0,
				message: "success",
				data: {
					total: 0,
					skills: []
				}
			};
		}
		async getKnotByIds() {
			return {
				code: 0,
				message: "success",
				data: []
			};
		}
		async getKnotCategories() {
			return {
				items: [],
				count: 0
			};
		}
		async getKnotTags() {
			return {
				code: 0,
				message: "success",
				data: []
			};
		}
		async getKnotSearch() {
			return { results: [] };
		}
		async getKnotDetail(slug) {
			return {
				skill: {
					slug,
					category: "",
					displayName: slug,
					summary: "",
					summary_zh: "",
					tags: {},
					stats: {
						downloads: 0,
						stars: 0,
						installs: 0,
						versions: 0,
						comments: 0
					},
					createdAt: 0,
					updatedAt: 0
				},
				latestVersion: {
					version: "latest",
					createdAt: 0,
					changelog: ""
				},
				owner: {
					handle: "",
					displayName: "",
					image: null
				}
			};
		}
		async getKnotExists(slugs) {
			const exists = {};
			for (const s of slugs) exists[s] = false;
			return {
				exists,
				count: 0
			};
		}
		async reportKnotStats() {}
		async installKnotSkill(id) {
			return {
				success: false,
				skillName: String(id),
				errorMessage: "Knot install requires IDE mode"
			};
		}
		async getKnotInstalledMetas() {
			return [];
		}
		async getBuiltinMarketList() {
			return {
				code: 0,
				msg: "success",
				data: {
					total_count: 0,
					skills: []
				}
			};
		}
		async getBuiltinMarketByIds() {
			return {
				code: 0,
				msg: "success",
				data: {
					total_count: 0,
					skills: []
				}
			};
		}
		async getBuiltinMarketDownloadUrl(skillId, version) {
			return {
				code: 0,
				msg: "success",
				data: {
					download_url: "",
					expires_at: 0,
					filename: "",
					skill_id: skillId,
					version: version ?? ""
				}
			};
		}
		async getBuiltinMarketCategories(type = "skill") {
			return {
				code: 0,
				msg: "success",
				data: {
					type,
					total: 0,
					items: []
				}
			};
		}
		async installBuiltinMarketSkill(params) {
			return {
				success: false,
				skillName: params.skillName || params.name || params.skillId,
				errorMessage: "BuiltinMarket install requires IDE mode"
			};
		}
		async getBuiltinMarketInstalledMetas() {
			return [];
		}
		/**
		* Cloud 链路无法访问本地文件系统，老安装回填在 Cloud 环境下不适用。
		* 返回 0 作为 no-op。
		*/
		async backfillBuiltinMarketSkillId(_params) {
			return 0;
		}
		/**
		* Cloud 链路无法访问本地文件系统，老安装 iconSource 回填在 Cloud 环境下不适用。
		* 返回 0 作为 no-op。
		*/
		async backfillBuiltinMarketIconSource(_params) {
			return 0;
		}
		/**
		* Cloud 链路无法访问本地文件系统，目录迁移在 Cloud 环境下不适用。
		* 返回全 0 计数（alreadyDone=false 表示从未跑过，但调用方应当根据 migrated/skipped/failed 都为 0 推断 no-op）。
		*/
		async migrateBuiltinMarketDirsToSkillId() {
			return {
				migrated: 0,
				skipped: 0,
				failed: 0,
				alreadyDone: false
			};
		}
		/**
		* 获取大使状态
		* API 端点: GET /console/activity/ambassador/status
		*/
		async getAmbassadorStatus() {
			try {
				const result = await httpService.get("/console/activity/ambassador/status");
				if (result?.code === 0 && result?.data) return result.data;
				return null;
			} catch (error) {
				console.error("[BackendProvider] getAmbassadorStatus failed:", error);
				return null;
			}
		}
		/**
		* 语音转文字 (ASR)
		* Cloud 环境通过 HTTP 直接调用 /agenttool/v1/asr 接口
		*/
		async speechToText(params) {
			try {
				const audioBuffer = Uint8Array.from(atob(params.audio), (c) => c.charCodeAt(0));
				const fileBlob = new Blob([audioBuffer], { type: params.mimeType });
				const formData = new FormData();
				formData.append("audio", fileBlob, params.fileName);
				const result = await httpService.post("/agenttool/v1/asr", formData, { timeout: 3e4 });
				if (result?.code && result.code !== 0) return {
					success: false,
					error: result.msg || "ASR recognition failed",
					errorCode: result.code
				};
				return {
					success: true,
					text: result?.text || ""
				};
			} catch (error) {
				console.error("[BackendProvider] speechToText failed:", error);
				return {
					success: false,
					error: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
	};
}));
//#endregion
//#region ../../packages/agent-provider/src/backend/ipc-backend-provider.ts
/**
* 生成唯一请求 ID
*/
function generateRequestId() {
	return `req-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
/**
* 对请求/响应参数进行脱敏处理，生成安全的日志摘要
* @param obj 原始对象
* @param depth 当前递归深度
* @returns 脱敏后的摘要对象
*/
function sanitizeForLog(obj, depth = 0) {
	if (depth > 3) return "[nested]";
	if (obj === null || obj === void 0) return obj;
	if (typeof obj === "string") {
		if (obj.length > 100) return `[string:${obj.length}chars]`;
		return obj;
	}
	if (typeof obj === "number" || typeof obj === "boolean") return obj;
	if (Array.isArray(obj)) {
		if (obj.length > 5) return `[array:${obj.length}items]`;
		return obj.map((item) => sanitizeForLog(item, depth + 1));
	}
	if (typeof obj === "object") {
		const result = {};
		for (const [key, value] of Object.entries(obj)) {
			const lowerKey = key.toLowerCase();
			if (SENSITIVE_FIELDS.has(lowerKey)) if (typeof value === "string") result[key] = `[redacted:${value.length}chars]`;
			else if (Array.isArray(value)) result[key] = `[redacted:array:${value.length}items]`;
			else if (value && typeof value === "object") result[key] = "[redacted:object]";
			else result[key] = "[redacted]";
			else result[key] = sanitizeForLog(value, depth + 1);
		}
		return result;
	}
	return "[unknown]";
}
/**
* 创建 IPCBackendProvider 实例
*/
function createIPCBackendProvider(config) {
	return new IPCBackendProvider(config);
}
var USER_FEEDBACK_TIMEOUT_MS, BACKEND_REQUEST_TYPES, SENSITIVE_FIELDS, IPCBackendProvider;
var init_ipc_backend_provider = __esmMin((() => {
	init_account();
	USER_FEEDBACK_TIMEOUT_MS = 12e4;
	BACKEND_REQUEST_TYPES = {
		LOGIN: "backend:login",
		GET_LOGIN_URL: "backend:get-login-url",
		LOGOUT: "backend:logout",
		GET_ACCOUNT: "backend:get-account",
		GET_USER_CONNECTOR: "backend:get-user-connector",
		MODIFY_USER_CONNECTOR_CONNECT_STATUS: "backend:modify-user-connector-connect-status",
		MODIFY_USER_CONNECTOR_REPO: "backend:modify-user-connector-repo",
		MODIFY_USER_CONNECTOR_ACTIVE_STATUS: "backend:modify-user-connector-active-status",
		DELETE_USER_CONNECTOR: "backend:delete-user-connector",
		ADD_CONNECTOR_TASK: "backend:add-connector-task",
		GET_TASK_CONNECTOR: "backend:get-task-connector",
		MODIFY_TASK_CONNECTOR_ACTIVE_STATUS: "backend:modify-task-connector-active-status",
		MODIFY_TASK_CONNECTOR_REPO: "backend:modify-task-connector-repo",
		GET_OAUTH_USER: "backend:get-oauth-user",
		SAVE_OAUTH_TOKEN: "backend:save-oauth-token",
		GET_REPO_LIST: "backend:get-repo-list",
		REVOKE_ALL: "backend:revoke-all",
		GET_FILE: "backend:get-file",
		RELOAD_WINDOW: "backend:reload-window",
		SAVE_LOCALE: "backend:save-locale",
		SAVE_POWER_BLOCKER: "backend:save-power-blocker",
		GET_POWER_SAVE_BLOCKER_STATE: "backend:get-power-save-blocker-state",
		GET_MEMORY_PROFILE: "backend:get-memory-profile",
		SAVE_MEMORY_SETTINGS: "backend:save-memory-settings",
		SUBMIT_MEMORY_SUGGESTION: "backend:submit-memory-suggestion",
		IMPORT_MEMORY_CONTENT: "backend:import-memory-content",
		CHECK_MEMORY_UPDATING: "backend:check-memory-updating",
		CLEAR_MEMORY: "backend:clear-memory",
		CLOSE_AGENT_MANAGER: "backend:close-agent-manager",
		OPEN_EXTERNAL: "backend:open-external",
		OPEN_LOCAL_FILE: "backend:open-local-file",
		GET_LOCAL_CUSTOM_MODELS: "backend:get-local-custom-models",
		SAVE_LOCAL_CUSTOM_MODEL: "backend:save-local-custom-model",
		DELETE_LOCAL_CUSTOM_MODEL: "backend:delete-local-custom-model",
		BATCH_TOGGLE_PLUGINS: "backend:batch-toggle-plugins",
		GET_SUPPORT_SCENES: "backend:get-support-scenes",
		GET_ACCOUNT_USAGE: "backend:get-account-usage",
		GET_CHECKIN_STATUS: "backend:get-checkin-status",
		CLAIM_DAILY_CHECKIN: "backend:claim-daily-checkin",
		UPLOAD_SHARE_FILE: "backend:upload-share-file",
		CREATE_SHARE_LINK: "backend:create-share-link",
		GET_SHARE_LIST: "backend:get-share-list",
		DOWNLOAD_SHARE_FILE: "backend:download-share-file",
		SET_SHARE_ENABLED: "backend:set-share-enabled",
		PREPARE_SHARE_TASK: "backend:prepare-share-task",
		UPLOAD_SHARE_TASK_FILE: "backend:upload-share-task-file",
		CONFIRM_SHARE_TASK: "backend:confirm-share-task",
		CANCEL_SHARE_TASK: "backend:cancel-share-task",
		DELETE_TASK_SHARE: "backend:delete-task-share",
		GET_TASK_SHARE_LIST: "backend:get-task-share-list",
		GET_ACTIVITY_BANNER: "backend:get-activity-banner",
		GET_AMBASSADOR_STATUS: "backend:get-ambassador-status",
		GET_EXPERT_RANKING: "backend:get-expert-ranking",
		GET_GROWTH_BUDDY: "backend:get-growth-buddy",
		SKILLHUB_LIST: "backend:skillhub-list",
		SKILLHUB_CATEGORIES: "backend:skillhub-categories",
		SKILLHUB_SEARCH: "backend:skillhub-search",
		SKILLHUB_DETAIL: "backend:skillhub-detail",
		SKILLHUB_DOWNLOAD_URL: "backend:skillhub-download-url",
		SKILLHUB_EXISTS: "backend:skillhub-exists",
		SKILLHUB_REPORT_STATS: "backend:skillhub-report-stats",
		KNOT_LIST: "backend:knot-list",
		KNOT_GET_BY_IDS: "backend:knot-get-by-ids",
		KNOT_CATEGORIES: "backend:knot-categories",
		KNOT_TAGS: "backend:knot-tags",
		KNOT_SEARCH: "backend:knot-search",
		KNOT_DETAIL: "backend:knot-detail",
		KNOT_EXISTS: "backend:knot-exists",
		KNOT_REPORT_STATS: "backend:knot-report-stats",
		KNOT_INSTALL: "backend:knot-install",
		KNOT_INSTALLED_METAS: "backend:knot-installed-metas",
		BUILTIN_MARKET_LIST: "backend:builtin-market-list",
		BUILTIN_MARKET_GET_BY_IDS: "backend:builtin-market-get-by-ids",
		BUILTIN_MARKET_DOWNLOAD_URL: "backend:builtin-market-download-url",
		BUILTIN_MARKET_CATEGORIES: "backend:builtin-market-categories",
		BUILTIN_MARKET_INSTALL: "backend:builtin-market-install",
		BUILTIN_MARKET_INSTALLED_METAS: "backend:builtin-market-installed-metas",
		BUILTIN_MARKET_BACKFILL_SKILL_ID: "backend:builtin-market-backfill-skill-id",
		BUILTIN_MARKET_BACKFILL_ICON_SOURCE: "backend:builtin-market-backfill-icon-source",
		BUILTIN_MARKET_MIGRATE_DIRS_TO_SKILL_ID: "backend:builtin-market-migrate-dirs-to-skill-id",
		SUBMIT_USER_FEEDBACK: "backend:submit-user-feedback",
		OPEN_YUANBAO: "backend:open-yuanbao"
	};
	SENSITIVE_FIELDS = new Set([
		"memoryblock",
		"currentmemory",
		"suggestion",
		"content",
		"query",
		"foryou_prompt",
		"current_memory",
		"memory",
		"prompt",
		"text",
		"password",
		"token",
		"secret",
		"apikey",
		"api_key"
	]);
	IPCBackendProvider = class {
		constructor(config) {
			this.channel = config.channel;
			this.debug = config.debug ?? false;
			this.timeoutMs = config.timeoutMs ?? 3e4;
			this.log("Initialized with IWidgetChannel");
			this.setupSessionChangeListener();
		}
		/**
		* 设置会话变化监听器
		* 监听来自 Extension Host (BackendBridgeService) 推送的 auth:session-changed 事件
		* 并更新本地 accountService
		*/
		setupSessionChangeListener() {
			this.log("Setting up session change listener");
			this.channel.on("auth:session-changed", (data) => {
				this.log("Received auth:session-changed event from Extension Host:", data);
				const account = data?.account || null;
				accountService.setAccount(account);
				this.log("Updated accountService with new session", {
					hasAccount: !!account,
					accountNickname: account?.nickname
				});
			});
			this.log("Session change listener setup complete");
		}
		/**
		* 发送统一格式的后端请求
		* @param requestType 请求类型
		* @param params 请求参数
		* @returns 响应数据
		*/
		async sendBackendRequest(requestType, params, timeoutOverride) {
			const message = {
				type: "backend",
				requestId: generateRequestId(),
				params: {
					type: requestType,
					params
				}
			};
			this.log("Sending backend request:", {
				type: requestType,
				requestId: message.requestId,
				params: sanitizeForLog(params)
			});
			const response = await this.channel.callMethod("__backend__", message, timeoutOverride ?? this.timeoutMs);
			this.log("Received response:", {
				requestId: message.requestId,
				data: sanitizeForLog(response)
			});
			if (response?.error) throw new Error(response.error);
			return response?.data !== void 0 ? response.data : response;
		}
		/**
		* 获取当前账号信息（旧 VSCode Extension Host / cloud-agent-sdk legacy 链路）。
		*
		* 注意：**workbuddy-desktop 不走这个类**，desktop renderer 用的是
		* `packages/workbuddy-app/src/provider/workbuddy-backend-provider.ts::WorkbuddyBackendProvider`。
		* account enrich（补 editionType）逻辑放在那边，见 issue #58600。
		*/
		async getAccount() {
			this.log("Getting account via IPC");
			const startTime = performance.now();
			try {
				const account = await this.sendBackendRequest(BACKEND_REQUEST_TYPES.GET_ACCOUNT);
				this.log(`getAccount IPC completed in ${(performance.now() - startTime).toFixed(0)}ms`);
				accountService.setAccount(account);
				return account;
			} catch (error) {
				this.log(`getAccount IPC failed after ${(performance.now() - startTime).toFixed(0)}ms:`, error);
				accountService.setAccount(null);
				return null;
			}
		}
		/**
		* 获取用户连接器列表
		* IDE 环境: 通过 IPC 获取用户连接器列表
		*/
		async getUserConnector() {
			this.log("Getting user connector via IPC");
			try {
				return await this.sendBackendRequest(BACKEND_REQUEST_TYPES.GET_USER_CONNECTOR);
			} catch (error) {
				this.log("Get user connector failed:", error);
				throw error;
			}
		}
		/**
		* 修改用户连接器连接状态
		* IDE 环境: 通过 IPC 修改用户连接器连接状态
		*/
		async modifyUserConnectorConnectStatus(request) {
			this.log("Modifying user connector connect status via IPC:", request);
			try {
				await this.sendBackendRequest(BACKEND_REQUEST_TYPES.MODIFY_USER_CONNECTOR_CONNECT_STATUS, request);
			} catch (error) {
				this.log("Modify user connector connect status failed:", error);
				throw error;
			}
		}
		/**
		* 修改用户连接器仓库
		* IDE 环境: 通过 IPC 修改用户连接器仓库
		*/
		async modifyUserConnectorRepo(request) {
			this.log("Modifying user connector repo via IPC:", request);
			try {
				await this.sendBackendRequest(BACKEND_REQUEST_TYPES.MODIFY_USER_CONNECTOR_REPO, request);
			} catch (error) {
				this.log("Modify user connector repo failed:", error);
				throw error;
			}
		}
		/**
		* 修改用户连接器激活状态
		* IDE 环境: 通过 IPC 修改用户连接器激活状态
		*/
		async modifyUserConnectorActiveStatus(request) {
			this.log("Modifying user connector active status via IPC:", request);
			try {
				await this.sendBackendRequest(BACKEND_REQUEST_TYPES.MODIFY_USER_CONNECTOR_ACTIVE_STATUS, request);
			} catch (error) {
				this.log("Modify user connector active status failed:", error);
				throw error;
			}
		}
		/**
		* 删除用户连接器
		* IDE 环境: 通过 IPC 删除用户连接器
		*/
		async deleteUserConnector(name) {
			this.log("Deleting user connector via IPC:", name);
			try {
				await this.sendBackendRequest(BACKEND_REQUEST_TYPES.DELETE_USER_CONNECTOR, { name });
			} catch (error) {
				this.log("Delete user connector failed:", error);
				throw error;
			}
		}
		/**
		* 添加任务
		* IDE 环境: 通过 IPC 添加任务
		*/
		async addConnectorTask(request) {
			this.log("Adding connector task via IPC:", request);
			try {
				return await this.sendBackendRequest(BACKEND_REQUEST_TYPES.ADD_CONNECTOR_TASK, request);
			} catch (error) {
				this.log("Add task failed:", error);
				throw error;
			}
		}
		/**
		* 获取任务连接器列表
		* IDE 环境: 通过 IPC 获取任务连接器列表
		*/
		async getTaskConnector(taskId) {
			this.log("Getting task connector via IPC:", taskId);
			try {
				return await this.sendBackendRequest(BACKEND_REQUEST_TYPES.GET_TASK_CONNECTOR, { taskId });
			} catch (error) {
				this.log("Get task connector failed:", error);
				throw error;
			}
		}
		/**
		* 修改任务连接器激活状态
		* IDE 环境: 通过 IPC 修改任务连接器激活状态
		*/
		async modifyTaskConnectorActiveStatus(request) {
			this.log("Modifying task connector active status via IPC:", request);
			try {
				return await this.sendBackendRequest(BACKEND_REQUEST_TYPES.MODIFY_TASK_CONNECTOR_ACTIVE_STATUS, request);
			} catch (error) {
				this.log("Modify task connector active status failed:", error);
				throw error;
			}
		}
		/**
		* 修改任务连接器仓库
		* IDE 环境: 通过 IPC 修改任务连接器仓库
		*/
		async modifyTaskConnectorRepo(request) {
			this.log("Modifying task connector repo via IPC:", request);
			try {
				return await this.sendBackendRequest(BACKEND_REQUEST_TYPES.MODIFY_TASK_CONNECTOR_REPO, request);
			} catch (error) {
				this.log("Modify task connector repo failed:", error);
				throw error;
			}
		}
		/**
		* 获取 OAuth 用户信息
		* IDE 环境: 通过 IPC 获取 OAuth 用户信息
		*/
		async getOauthUser(request) {
			this.log("Getting OAuth user via IPC:", request);
			try {
				return await this.sendBackendRequest(BACKEND_REQUEST_TYPES.GET_OAUTH_USER, request);
			} catch (error) {
				this.log("Get OAuth user failed:", error);
				throw error;
			}
		}
		/**
		* 通过回调code，换token
		* IDE 环境: 通过 IPC 保存 OAuth Token
		*/
		async saveOauthToken(request) {
			this.log("Saving OAuth token via IPC:", request);
			try {
				await this.sendBackendRequest(BACKEND_REQUEST_TYPES.SAVE_OAUTH_TOKEN, request);
			} catch (error) {
				this.log("Save OAuth token failed:", error);
				throw error;
			}
		}
		/**
		* 获取OAuth连接器的仓库列表
		* IDE 环境: 通过 IPC 获取仓库列表
		*/
		async getRepoList(request) {
			this.log("Getting repo list via IPC:", request);
			try {
				return await this.sendBackendRequest(BACKEND_REQUEST_TYPES.GET_REPO_LIST, request);
			} catch (error) {
				this.log("Get repo list failed:", error);
				throw error;
			}
		}
		/**
		* 撤销OAuth连接器的所有连接
		* IDE 环境: 通过 IPC 撤销所有连接
		*/
		async revokeAll(request) {
			this.log("Revoking all connections via IPC:", request);
			try {
				await this.sendBackendRequest(BACKEND_REQUEST_TYPES.REVOKE_ALL, request);
			} catch (error) {
				this.log("Revoke all connections failed:", error);
				throw error;
			}
		}
		/**
		* 获取文件信息
		* IDE 环境: 通过 IPC 获取文件信息
		*/
		async getFile(request) {
			this.log("Getting file via IPC:", request);
			try {
				return await this.sendBackendRequest(BACKEND_REQUEST_TYPES.GET_FILE, request);
			} catch (error) {
				this.log("Get file failed:", error);
				throw error;
			}
		}
		/**
		* 触发登录流程
		* IDE 环境: 通过 IPC 通知 IDE 打开登录流程
		*/
		async login(params) {
			this.log("Triggering login via IPC");
			try {
				await this.sendBackendRequest(BACKEND_REQUEST_TYPES.LOGIN, params);
			} catch (error) {
				this.log("Login request failed:", error);
				throw error;
			}
		}
		/**
		* 获取当前登录 URL（登录流程中轮询使用）
		*/
		async getLoginUrl() {
			try {
				return (await this.sendBackendRequest(BACKEND_REQUEST_TYPES.GET_LOGIN_URL))?.url ?? null;
			} catch (error) {
				this.log("getLoginUrl request failed:", error);
				return null;
			}
		}
		/**
		* 登出账号
		* IDE 环境: 通过 IPC 通知 IDE 登出
		*/
		async logout() {
			this.log("Triggering logout via IPC");
			try {
				await this.sendBackendRequest(BACKEND_REQUEST_TYPES.LOGOUT);
				accountService.clearAccount();
			} catch (error) {
				this.log("Logout request failed:", error);
				throw error;
			}
		}
		/**
		* 重新加载窗口
		* IDE 环境: 通过 IPC 通知 IDE 重新加载窗口（用于应用语言设置等）
		* @param params 可选参数，如 locale
		*/
		async reloadWindow(params) {
			this.log("Triggering reload window via IPC", params);
			try {
				await this.sendBackendRequest(BACKEND_REQUEST_TYPES.RELOAD_WINDOW, params);
			} catch (error) {
				this.log("Reload window request failed:", error);
				throw error;
			}
		}
		/**
		* Save locale to argv.json without restarting the app.
		* The change takes effect on next manual restart.
		* @param params locale to save
		*/
		async saveLocale(params) {
			this.log("Saving locale to argv.json via IPC", params);
			try {
				await this.sendBackendRequest(BACKEND_REQUEST_TYPES.SAVE_LOCALE, params);
			} catch (error) {
				this.log("Save locale request failed:", error);
				throw error;
			}
		}
		/**
		* 设置防休眠状态
		* IDE 环境: 通过 IPC 通知主进程启用/禁用 powerSaveBlocker
		*/
		async savePowerBlocker(params) {
			this.log("Saving power blocker setting via IPC", params);
			try {
				await this.sendBackendRequest(BACKEND_REQUEST_TYPES.SAVE_POWER_BLOCKER, params);
			} catch (error) {
				this.log("Save power blocker setting failed:", error);
				throw error;
			}
		}
		/**
		* 锁屏远程：读取当前 PowerManager 状态，UI 据此渲染开关与活跃指示。
		*/
		async getPowerSaveBlockerState() {
			this.log("Reading power save blocker state via IPC");
			try {
				return await this.sendBackendRequest(BACKEND_REQUEST_TYPES.GET_POWER_SAVE_BLOCKER_STATE);
			} catch (error) {
				this.log("Get power save blocker state failed:", error);
				return {
					isEnabled: false,
					isActive: false
				};
			}
		}
		/**
		* 获取用户级记忆概要
		*/
		async getMemoryProfile() {
			this.log("Getting memory profile via IPC");
			return this.sendBackendRequest(BACKEND_REQUEST_TYPES.GET_MEMORY_PROFILE);
		}
		/**
		* 保存记忆设置开关
		*/
		async saveMemorySettings(params) {
			this.log("Saving memory settings via IPC", params);
			return this.sendBackendRequest(BACKEND_REQUEST_TYPES.SAVE_MEMORY_SETTINGS, params);
		}
		/**
		* 提交记忆修改建议
		*/
		async submitMemorySuggestion(params) {
			this.log("Submitting memory suggestion via IPC");
			return this.sendBackendRequest(BACKEND_REQUEST_TYPES.SUBMIT_MEMORY_SUGGESTION, params, 2e5);
		}
		/**
		* 导入记忆内容
		*/
		async importMemoryContent(params) {
			this.log("Importing memory content via IPC");
			return this.sendBackendRequest(BACKEND_REQUEST_TYPES.IMPORT_MEMORY_CONTENT, params, 2e5);
		}
		/**
		* 检查记忆是否有正在进行的更新（Phase6 M5）
		*/
		async checkMemoryUpdating() {
			this.log("Checking memory updating status via IPC");
			return this.sendBackendRequest(BACKEND_REQUEST_TYPES.CHECK_MEMORY_UPDATING);
		}
		/**
		* 清空用户记忆（Phase11 M7）
		*/
		async clearMemory() {
			this.log("Clearing memory via IPC");
			return this.sendBackendRequest(BACKEND_REQUEST_TYPES.CLEAR_MEMORY, void 0, 6e4);
		}
		/**
		* 关闭 Agent Manager 面板
		* IDE 环境: 通过 IPC 通知 IDE 关闭 Agent Manager（用于返回 IDE）
		*/
		async closeAgentManager() {
			this.log("Triggering close agent manager via IPC");
			try {
				await this.sendBackendRequest(BACKEND_REQUEST_TYPES.CLOSE_AGENT_MANAGER);
			} catch (error) {
				this.log("Close agent manager request failed:", error);
				throw error;
			}
		}
		/**
		* 在外部浏览器中打开链接
		* IDE 环境: 通过 IPC 通知 IDE 使用 vscode.env.openExternal 打开 URL
		* @param url 要打开的 URL
		*/
		async openExternal(url) {
			this.log("Opening external URL via IPC:", url);
			try {
				await this.sendBackendRequest(BACKEND_REQUEST_TYPES.OPEN_EXTERNAL, { url });
			} catch (error) {
				this.log("Open external request failed:", error);
				throw error;
			}
		}
		/**
		* 打开本地文件
		* IDE 环境: 通过 IPC 通知 IDE 打开本地配置文件
		* @param filePath 要打开的文件路径
		*/
		async openLocalFile(filePath) {
			this.log("Opening local file via IPC:", filePath);
			try {
				if (!await this.sendBackendRequest(BACKEND_REQUEST_TYPES.OPEN_LOCAL_FILE, { filePath })) throw new Error(`Failed to open local file: ${filePath}`);
			} catch (error) {
				this.log("Open local file request failed:", error);
				throw error;
			}
		}
		/**
		* 唤起元宝 App
		* 通过 IPC 通知后端判断元宝是否安装：
		* - 已安装：通过 open -a 拉起元宝 App
		* - 未安装：跳转元宝下载页面
		*/
		async openYuanbao() {
			try {
				await this.sendBackendRequest(BACKEND_REQUEST_TYPES.OPEN_YUANBAO, {});
			} catch (error) {
				this.log("Open Yuanbao request failed:", error);
				throw error;
			}
		}
		/**
		* 获取用户级本地自定义模型
		*/
		async getLocalCustomModels() {
			this.log("Getting local custom models via IPC");
			return this.sendBackendRequest(BACKEND_REQUEST_TYPES.GET_LOCAL_CUSTOM_MODELS);
		}
		/**
		* 保存用户级本地自定义模型
		*/
		async saveLocalCustomModel(request) {
			this.log("Saving local custom model via IPC:", request);
			return this.sendBackendRequest(BACKEND_REQUEST_TYPES.SAVE_LOCAL_CUSTOM_MODEL, request);
		}
		/**
		* 删除用户级本地自定义模型
		*/
		async deleteLocalCustomModel(id) {
			this.log("Deleting local custom model via IPC:", id);
			return this.sendBackendRequest(BACKEND_REQUEST_TYPES.DELETE_LOCAL_CUSTOM_MODEL, { id });
		}
		/**
		* 批量切换插件状态
		* IDE 环境: 通过 IPC 调用 Extension Host 的 PluginService
		*/
		async batchTogglePlugins(request) {
			this.log("Batch toggling plugins via IPC:", request);
			try {
				return await this.sendBackendRequest(BACKEND_REQUEST_TYPES.BATCH_TOGGLE_PLUGINS, request);
			} catch (error) {
				this.log("Batch toggle plugins failed:", error);
				throw error;
			}
		}
		/**
		* 获取支持的场景列表
		* IDE 环境: 通过 IPC 调用后端 API
		* 用于 Welcome 页面的 QuickActions 快捷操作
		*
		* 调用链：
		* 1. agent-ui: IPCBackendProvider.getSupportScenes()
		* 2. Extension Host: BackendBridgeService.handleGetSupportScenes()
		* 3. Backend API: GET /v2/as/support/scenes
		* 4. 返回 SupportScene[] 数据给 agent-ui
		*/
		async getSupportScenes() {
			this.log("Getting support scenes via IPC");
			try {
				return (await this.sendBackendRequest(BACKEND_REQUEST_TYPES.GET_SUPPORT_SCENES, {}))?.scenes || [];
			} catch (error) {
				this.log("Get support scenes failed:", error);
				return [];
			}
		}
		/**
		* 获取账号用量信息（积分/Credits）
		* IDE 环境: 通过 IPC 实时获取用量信息，每次打开菜单时调用
		*
		* 调用链：
		* 1. agent-ui: IPCBackendProvider.getAccountUsage()
		* 2. Agent Manager renderer: BackendService.getAccountUsage()
		* 3. Main Process: codebuddy:getAccountUsage IPC handler
		* 4. 返回 { usageLeft, usageTotal, editionType, refreshAt } 等字段
		*/
		async getAccountUsage() {
			this.log("Getting account usage via IPC");
			try {
				return await this.sendBackendRequest(BACKEND_REQUEST_TYPES.GET_ACCOUNT_USAGE);
			} catch (error) {
				this.log("Get account usage failed:", error);
				return null;
			}
		}
		/**
		* 获取每日签到状态
		* IDE 环境: 通过 IPC 获取签到状态
		*/
		async getCheckinStatus() {
			this.log("Getting checkin status via IPC");
			try {
				return await this.sendBackendRequest(BACKEND_REQUEST_TYPES.GET_CHECKIN_STATUS);
			} catch (error) {
				this.log("Get checkin status failed:", error);
				return null;
			}
		}
		/**
		* 执行每日签到
		* IDE 环境: 通过 IPC 执行签到
		*/
		async claimDailyCheckin() {
			this.log("Claiming daily checkin via IPC");
			try {
				return await this.sendBackendRequest(BACKEND_REQUEST_TYPES.CLAIM_DAILY_CHECKIN);
			} catch (error) {
				this.log("Claim daily checkin failed:", error);
				throw error;
			}
		}
		/**
		* 上传分享文件到服务端获取分享链接
		* IDE 环境: 通过 IPC 将文件路径转发给 Electron 主进程
		*
		* 优化：直接传递文件路径，由主进程通过 fs 读取文件二进制流，
		* 避免 Blob → base64 编码的 33% 体积膨胀和 IPC 大数据传输开销
		*
		* 参数与 authApiClient.ts 中 uploadShareFile 保持对齐：
		* - filePath: 文件路径（必填）
		* - fileName: 文件名（可选）
		* - createShare: 是否创建分享链接（可选，默认 true）
		*
		* @param params 上传参数
		* @returns Promise<ShareFileUploadResult> 上传结果
		*/
		async uploadShareFile(params) {
			this.log("Uploading share file via IPC:", params.fileName || params.filePath);
			try {
				return await this.sendBackendRequest(BACKEND_REQUEST_TYPES.UPLOAD_SHARE_FILE, {
					filePath: params.filePath,
					fileName: params.fileName,
					remotePath: params.remotePath,
					createShare: params.createShare,
					shareMetadata: params.shareMetadata
				});
			} catch (error) {
				this.log("Upload share file failed:", error);
				throw error;
			}
		}
		/**
		* 创建分享链接
		* IDE 环境: 通过 IPC 将请求转发给 Electron 主进程
		*
		* 参数与 authApiClient.ts 中 createShareLink 保持对齐：
		* - name: 分享名称（必填）
		* - filePaths: 要分享的文件路径列表（必填）
		* - config: 分享配置（可选）
		*
		* @param params 创建分享参数
		* @returns Promise<CreateShareLinkResult> 创建分享链接结果
		*/
		async createShareLink(params) {
			this.log("Creating share link via IPC:", params.name);
			try {
				return await this.sendBackendRequest(BACKEND_REQUEST_TYPES.CREATE_SHARE_LINK, {
					name: params.name,
					filePaths: params.filePaths,
					fileType: params.fileType,
					config: params.config,
					metadata: params.metadata
				});
			} catch (error) {
				this.log("Create share link failed:", error);
				throw error;
			}
		}
		/**
		* 获取分享列表
		* IDE 环境: 通过 IPC 获取分享列表
		*
		* @param params 分页参数
		* @returns Promise<ShareListResult> 分享列表结果
		*/
		async getShareList(params) {
			this.log("Getting share list via IPC:", params);
			try {
				return await this.sendBackendRequest(BACKEND_REQUEST_TYPES.GET_SHARE_LIST, params);
			} catch (error) {
				this.log("Get share list failed:", error);
				return {
					success: false,
					records: [],
					total: 0,
					page: params?.page ?? 1,
					pageSize: params?.pageSize ?? 20,
					error: error instanceof Error ? error.message : "Get share list failed"
				};
			}
		}
		/**
		* 获取分享文件下载链接并触发下载
		* IDE 环境: 通过 IPC 获取下载链接并触发 Electron 下载
		*
		* @param code 分享码
		* @returns Promise<ShareFileDownloadResult> 下载结果
		*/
		async downloadShareFile(code) {
			this.log("Downloading share file via IPC:", code);
			try {
				return await this.sendBackendRequest(BACKEND_REQUEST_TYPES.DOWNLOAD_SHARE_FILE, { code });
			} catch (error) {
				this.log("Download share file failed:", error);
				return {
					success: false,
					error: error instanceof Error ? error.message : "Download share file failed"
				};
			}
		}
		/**
		* 启用/禁用分享
		* IDE 环境: 通过 IPC 设置分享启用/禁用状态
		*
		* @param code 分享码
		* @param enabled true 启用，false 禁用
		* @returns Promise<ShareEnableResult> 结果
		*/
		async setShareEnabled(code, enabled) {
			this.log("Setting share enabled via IPC:", code, enabled);
			try {
				return await this.sendBackendRequest(BACKEND_REQUEST_TYPES.SET_SHARE_ENABLED, {
					code,
					enabled
				});
			} catch (error) {
				this.log("Set share enabled failed:", error);
				return {
					success: false,
					error: error instanceof Error ? error.message : "Set share enabled failed"
				};
			}
		}
		/**
		* 预创建对话分享（草稿态）
		* IDE 环境: 通过 IPC 调用主进程预创建分享
		*
		* @param params 预创建参数（可选）。
		*   - name: 分享名称
		*   - source: 分享来源 'local' | 'cloud'，默认 'local'
		*   - sourceId: 来源标识（如会话/任务 ID），与 source 联合用于同任务去重
		* @returns Promise<TaskSharePrepareResult> 预创建结果
		*/
		async prepareShareTask(params) {
			this.log("Preparing share task via IPC:", params?.name);
			try {
				return await this.sendBackendRequest(BACKEND_REQUEST_TYPES.PREPARE_SHARE_TASK, params);
			} catch (error) {
				this.log("Prepare share task failed:", error);
				return {
					success: false,
					error: error instanceof Error ? error.message : "Prepare share task failed"
				};
			}
		}
		/**
		* 上传对话分享制品文件
		* IDE 环境: 通过 IPC 调用主进程上传文件
		*
		* @param params 上传参数
		* @returns Promise<TaskShareUploadResult> 上传结果
		*/
		async uploadShareTaskFile(params) {
			this.log("Uploading share task file via IPC:", params.fileName || params.filePath);
			try {
				return await this.sendBackendRequest(BACKEND_REQUEST_TYPES.UPLOAD_SHARE_TASK_FILE, params, 12e4);
			} catch (error) {
				this.log("Upload share task file failed:", error);
				return {
					success: false,
					error: error instanceof Error ? error.message : "Upload share task file failed"
				};
			}
		}
		/**
		* 确认对话分享
		* IDE 环境: 通过 IPC 调用主进程确认分享
		*
		* @param params 确认参数
		* @returns Promise<TaskShareConfirmResult> 确认结果
		*/
		async confirmShareTask(params) {
			this.log("Confirming share task via IPC:", params.prepareId);
			try {
				return await this.sendBackendRequest(BACKEND_REQUEST_TYPES.CONFIRM_SHARE_TASK, params);
			} catch (error) {
				this.log("Confirm share task failed:", error);
				return {
					success: false,
					error: error instanceof Error ? error.message : "Confirm share task failed"
				};
			}
		}
		/**
		* 取消对话分享
		* IDE 环境: 通过 IPC 调用主进程取消分享
		*
		* @param params 取消参数
		* @returns Promise<TaskShareCancelResult> 取消结果
		*/
		async cancelShareTask(params) {
			this.log("Cancelling share task via IPC:", params.prepareId);
			try {
				return await this.sendBackendRequest(BACKEND_REQUEST_TYPES.CANCEL_SHARE_TASK, params);
			} catch (error) {
				this.log("Cancel share task failed:", error);
				return {
					success: false,
					error: error instanceof Error ? error.message : "Cancel share task failed"
				};
			}
		}
		/**
		* 删除对话分享
		* IDE 环境: 通过 IPC 调用主进程删除分享
		*
		* @param code 分享码
		* @returns Promise<TaskShareDeleteResult> 删除结果
		*/
		async deleteTaskShare(code) {
			this.log("Deleting task share via IPC:", code);
			try {
				return await this.sendBackendRequest(BACKEND_REQUEST_TYPES.DELETE_TASK_SHARE, { code });
			} catch (error) {
				this.log("Delete task share failed:", error);
				return {
					success: false,
					error: error instanceof Error ? error.message : "Delete task share failed"
				};
			}
		}
		/**
		* 获取对话分享列表
		* IDE 环境: 通过 IPC 获取对话分享列表
		*
		* @param params 分页参数
		* @returns Promise<TaskShareListResult> 对话分享列表结果
		*/
		async getTaskShareList(params) {
			this.log("Getting task share list via IPC:", params);
			try {
				return await this.sendBackendRequest(BACKEND_REQUEST_TYPES.GET_TASK_SHARE_LIST, params);
			} catch (error) {
				this.log("Get task share list failed:", error);
				return {
					success: false,
					records: [],
					total: 0,
					page: params?.page ?? 1,
					pageSize: params?.pageSize ?? 20,
					error: error instanceof Error ? error.message : "Get task share list failed"
				};
			}
		}
		/**
		* 获取大使状态
		* IDE 环境: 通过 IPC 获取大使状态
		*/
		async getAmbassadorStatus() {
			try {
				return await this.sendBackendRequest(BACKEND_REQUEST_TYPES.GET_AMBASSADOR_STATUS);
			} catch (error) {
				this.log("Get ambassador status failed:", error);
				return null;
			}
		}
		/**
		* 获取活动 Banner
		* IDE 环境: 通过 IPC 获取活动 Banner
		*/
		async getActivityBanner() {
			this.log("Getting activity banner via IPC");
			try {
				return await this.sendBackendRequest(BACKEND_REQUEST_TYPES.GET_ACTIVITY_BANNER);
			} catch (error) {
				this.log("Get activity banner failed:", error);
				return null;
			}
		}
		/**
		* 获取专家排行榜数据
		* IDE 环境: 通过 IPC 获取排行榜数据
		*
		* @param options.limit 期望返回的专家条数（服务端默认仅返回 100 条）
		*/
		async getExpertRanking(options) {
			this.log("Getting expert ranking via IPC");
			try {
				return await this.sendBackendRequest(BACKEND_REQUEST_TYPES.GET_EXPERT_RANKING, options);
			} catch (error) {
				this.log("Get expert ranking failed:", error);
				return null;
			}
		}
		/**
		* 获取用户成长体系数据
		* IDE 环境: 通过 IPC 获取成长数据
		*/
		async getGrowthBuddy() {
			this.log("Getting growth buddy via IPC");
			try {
				return await this.sendBackendRequest(BACKEND_REQUEST_TYPES.GET_GROWTH_BUDDY);
			} catch (error) {
				this.log("Get growth buddy failed:", error);
				return null;
			}
		}
		/**
		* 获取 SkillHub 技能列表
		* IDE 环境: 通过 IPC 获取技能列表
		*/
		async getSkillHubList(params) {
			this.log("Getting SkillHub list via IPC", params);
			try {
				return await this.sendBackendRequest(BACKEND_REQUEST_TYPES.SKILLHUB_LIST, params);
			} catch (error) {
				this.log("Get SkillHub list failed:", error);
				throw error;
			}
		}
		/**
		* 获取 SkillHub 分类列表
		* IDE 环境: 通过 IPC 获取分类列表
		*/
		async getSkillHubCategories() {
			this.log("Getting SkillHub categories via IPC");
			try {
				return await this.sendBackendRequest(BACKEND_REQUEST_TYPES.SKILLHUB_CATEGORIES);
			} catch (error) {
				this.log("Get SkillHub categories failed:", error);
				throw error;
			}
		}
		/**
		* 搜索 SkillHub 技能
		* IDE 环境: 通过 IPC 搜索技能
		*/
		async getSkillHubSearch(q, limit = 20) {
			this.log("Searching SkillHub via IPC", {
				q,
				limit
			});
			try {
				return await this.sendBackendRequest(BACKEND_REQUEST_TYPES.SKILLHUB_SEARCH, {
					q,
					limit
				});
			} catch (error) {
				this.log("SkillHub search failed:", error);
				throw error;
			}
		}
		/**
		* 获取 SkillHub 技能详情
		* IDE 环境: 通过 IPC 获取技能详情
		*/
		async getSkillHubDetail(slug) {
			this.log("Getting SkillHub detail via IPC", { slug });
			try {
				return await this.sendBackendRequest(BACKEND_REQUEST_TYPES.SKILLHUB_DETAIL, { slug });
			} catch (error) {
				this.log("Get SkillHub detail failed:", error);
				throw error;
			}
		}
		/**
		* 批量检查 SkillHub 技能是否存在
		* IDE 环境: 通过 IPC 检查技能是否存在
		*/
		async getSkillHubExists(slugs) {
			this.log("Checking SkillHub exists via IPC", { slugs });
			try {
				return await this.sendBackendRequest(BACKEND_REQUEST_TYPES.SKILLHUB_EXISTS, { slugs });
			} catch (error) {
				this.log("SkillHub exists check failed:", error);
				throw error;
			}
		}
		/**
		* 上报 SkillHub 技能统计
		* IDE 环境: 通过 IPC 上报统计
		*/
		async reportSkillHubStats(slug, inc) {
			this.log("Reporting SkillHub stats via IPC", {
				slug,
				inc
			});
			try {
				await this.sendBackendRequest(BACKEND_REQUEST_TYPES.SKILLHUB_REPORT_STATS, {
					slug,
					inc
				});
			} catch (error) {
				this.log("Report SkillHub stats failed:", error);
			}
		}
		/**
		* 安装 SkillHub 技能
		* IDE 环境: 通过 IPC 安装技能（下载 zip → 解压到本地）
		*/
		async installSkillHubSkill(slug, version, name, iconUrl, labels) {
			this.log("Installing SkillHub skill via IPC", {
				slug,
				version,
				name,
				iconUrl
			});
			try {
				return await this.sendBackendRequest("backend:skillhub-install", {
					slug,
					version,
					name,
					iconUrl,
					labels
				});
			} catch (error) {
				this.log("Install SkillHub skill failed:", error);
				throw error;
			}
		}
		/**
		* 获取本地已安装的 SkillHub 技能元信息
		* IDE 环境: 通过 IPC 获取元信息
		*/
		async getSkillHubInstalledMetas() {
			this.log("Getting SkillHub installed metas via IPC");
			try {
				return await this.sendBackendRequest("backend:skillhub-installed-metas");
			} catch (error) {
				this.log("Get SkillHub installed metas failed:", error);
				return [];
			}
		}
		async getKnotList(params) {
			try {
				return await this.sendBackendRequest(BACKEND_REQUEST_TYPES.KNOT_LIST, params);
			} catch (error) {
				this.log("Get Knot list failed:", error);
				return {
					code: -1,
					message: String(error),
					data: {
						total: 0,
						skills: []
					}
				};
			}
		}
		async getKnotByIds(ids) {
			try {
				return await this.sendBackendRequest(BACKEND_REQUEST_TYPES.KNOT_GET_BY_IDS, { ids });
			} catch (error) {
				this.log("Get Knot by ids failed:", error);
				return {
					code: -1,
					message: String(error),
					data: []
				};
			}
		}
		async getKnotCategories() {
			try {
				return await this.sendBackendRequest(BACKEND_REQUEST_TYPES.KNOT_CATEGORIES);
			} catch (error) {
				this.log("Get Knot categories failed:", error);
				return {
					items: [],
					count: 0
				};
			}
		}
		async getKnotTags() {
			try {
				return await this.sendBackendRequest(BACKEND_REQUEST_TYPES.KNOT_TAGS);
			} catch (error) {
				this.log("Get Knot tags failed:", error);
				return {
					code: -1,
					message: String(error),
					data: []
				};
			}
		}
		async getKnotSearch(q, limit = 20) {
			try {
				return await this.sendBackendRequest(BACKEND_REQUEST_TYPES.KNOT_SEARCH, {
					q,
					limit
				});
			} catch (error) {
				this.log("Knot search failed:", error);
				return { results: [] };
			}
		}
		async getKnotDetail(slug) {
			return this.sendBackendRequest(BACKEND_REQUEST_TYPES.KNOT_DETAIL, { slug });
		}
		async getKnotExists(slugs) {
			try {
				return await this.sendBackendRequest(BACKEND_REQUEST_TYPES.KNOT_EXISTS, { slugs });
			} catch (error) {
				this.log("Knot exists failed:", error);
				const exists = {};
				for (const s of slugs) exists[s] = false;
				return {
					exists,
					count: 0
				};
			}
		}
		async reportKnotStats(slug, inc) {
			try {
				await this.sendBackendRequest(BACKEND_REQUEST_TYPES.KNOT_REPORT_STATS, {
					slug,
					inc
				});
			} catch (error) {
				this.log("Report Knot stats failed:", error);
			}
		}
		async installKnotSkill(id, version, name, skillName, slug) {
			try {
				return await this.sendBackendRequest(BACKEND_REQUEST_TYPES.KNOT_INSTALL, {
					id,
					version,
					name,
					skillName,
					slug
				});
			} catch (error) {
				this.log("Install Knot skill failed:", error);
				return {
					success: false,
					skillName: name || String(id),
					errorMessage: String(error)
				};
			}
		}
		async getKnotInstalledMetas() {
			try {
				return await this.sendBackendRequest(BACKEND_REQUEST_TYPES.KNOT_INSTALLED_METAS);
			} catch (error) {
				this.log("Get Knot installed metas failed:", error);
				return [];
			}
		}
		async getBuiltinMarketList(params) {
			try {
				return await this.sendBackendRequest(BACKEND_REQUEST_TYPES.BUILTIN_MARKET_LIST, params);
			} catch (error) {
				this.log("Get BuiltinMarket list failed:", error);
				return {
					code: -1,
					msg: String(error),
					data: {
						total_count: 0,
						skills: []
					}
				};
			}
		}
		async getBuiltinMarketByIds(skillIds) {
			try {
				return await this.sendBackendRequest(BACKEND_REQUEST_TYPES.BUILTIN_MARKET_GET_BY_IDS, { skillIds });
			} catch (error) {
				this.log("Get BuiltinMarket by ids failed:", error);
				return {
					code: -1,
					msg: String(error),
					data: {
						total_count: 0,
						skills: []
					}
				};
			}
		}
		async getBuiltinMarketDownloadUrl(skillId, version) {
			try {
				return await this.sendBackendRequest(BACKEND_REQUEST_TYPES.BUILTIN_MARKET_DOWNLOAD_URL, {
					skillId,
					version
				});
			} catch (error) {
				this.log("Get BuiltinMarket download URL failed:", error);
				return {
					code: -1,
					msg: String(error),
					data: {
						download_url: "",
						expires_at: 0,
						filename: "",
						skill_id: skillId,
						version: version ?? ""
					}
				};
			}
		}
		async getBuiltinMarketCategories(type = "skill") {
			try {
				return await this.sendBackendRequest(BACKEND_REQUEST_TYPES.BUILTIN_MARKET_CATEGORIES, { type });
			} catch (error) {
				this.log("Get BuiltinMarket categories failed:", error);
				return {
					code: -1,
					msg: String(error),
					data: {
						type,
						total: 0,
						items: []
					}
				};
			}
		}
		async installBuiltinMarketSkill(params) {
			try {
				return await this.sendBackendRequest(BACKEND_REQUEST_TYPES.BUILTIN_MARKET_INSTALL, params);
			} catch (error) {
				this.log("Install BuiltinMarket skill failed:", error);
				return {
					success: false,
					skillName: params.skillName || params.name || params.skillId,
					errorMessage: String(error)
				};
			}
		}
		async getBuiltinMarketInstalledMetas() {
			try {
				return await this.sendBackendRequest(BACKEND_REQUEST_TYPES.BUILTIN_MARKET_INSTALLED_METAS);
			} catch (error) {
				this.log("Get BuiltinMarket installed metas failed:", error);
				return [];
			}
		}
		async backfillBuiltinMarketSkillId(params) {
			try {
				const result = await this.sendBackendRequest(BACKEND_REQUEST_TYPES.BUILTIN_MARKET_BACKFILL_SKILL_ID, params);
				return typeof result === "number" ? result : 0;
			} catch (error) {
				this.log("Backfill BuiltinMarket skillId failed:", error);
				return 0;
			}
		}
		async backfillBuiltinMarketIconSource(params) {
			try {
				const result = await this.sendBackendRequest(BACKEND_REQUEST_TYPES.BUILTIN_MARKET_BACKFILL_ICON_SOURCE, params);
				return typeof result === "number" ? result : 0;
			} catch (error) {
				this.log("Backfill BuiltinMarket iconSource failed:", error);
				return 0;
			}
		}
		async migrateBuiltinMarketDirsToSkillId() {
			const empty = {
				migrated: 0,
				skipped: 0,
				failed: 0,
				alreadyDone: false
			};
			try {
				const result = await this.sendBackendRequest(BACKEND_REQUEST_TYPES.BUILTIN_MARKET_MIGRATE_DIRS_TO_SKILL_ID);
				if (result && typeof result === "object") {
					const r = result;
					return {
						migrated: Number(r.migrated) || 0,
						skipped: Number(r.skipped) || 0,
						failed: Number(r.failed) || 0,
						alreadyDone: !!r.alreadyDone
					};
				}
				return empty;
			} catch (error) {
				this.log("Migrate BuiltinMarket dirs to skillId failed:", error);
				return empty;
			}
		}
		/**
		* 提交用户意见反馈
		* IDE 环境: 通过 IPC 将反馈数据发送到 Extension Host
		*
		* 调用链：
		* 1. agent-ui: FeedbackModal -> submitFeedback() -> adapter.submitUserFeedback()
		* 2. adapter: backendProvider.submitUserFeedback()
		* 3. IPCBackendProvider: sendBackendRequest('backend:submit-user-feedback', params)
		* 4. Extension Host: BackendBridgeService -> POST /v2/feedback
		*/
		async submitUserFeedback(params) {
			this.log("Submitting user feedback via IPC");
			try {
				return await this.sendBackendRequest(BACKEND_REQUEST_TYPES.SUBMIT_USER_FEEDBACK, params, USER_FEEDBACK_TIMEOUT_MS);
			} catch (error) {
				this.log("Submit user feedback failed:", error);
				return {
					success: false,
					error: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		/**
		* 语音转文字
		* IDE 环境: 通过 IPC 将音频数据发送到 Extension Host
		*
		* 调用链：
		* 1. agent-ui: useVoiceButton -> adapter.speechToText()
		* 2. adapter: backendProvider.speechToText()
		* 3. IPCBackendProvider: sendBackendRequest('backend:speech-to-text', params)
		* 4. Extension Host: BackendBridgeService -> POST /agenttool/v1/asr
		*/
		async speechToText(params) {
			this.log("Submitting speech-to-text via IPC");
			try {
				return await this.sendBackendRequest("backend:speech-to-text", params);
			} catch (error) {
				this.log("Speech-to-text failed:", error);
				return {
					success: false,
					error: error instanceof Error ? error.message : "Unknown error"
				};
			}
		}
		/**
		* 调试日志
		*/
		log(...args) {
			if (this.debug) console.log("[IPCBackendProvider]", ...args);
		}
	};
}));
//#endregion
//#region ../../packages/agent-provider/src/backend/index.ts
var init_backend = __esmMin((() => {
	init_types();
	init_service();
	init_backend_provider();
	init_ipc_backend_provider();
}));
//#endregion
//#region ../../packages/agent-provider/src/common/index.ts
var common_exports = /* @__PURE__ */ __exportAll({
	AGENTS_ORIGIN: () => AGENTS_ORIGIN,
	AccountStatus: () => AccountStatus,
	ActiveSessionImpl: () => ActiveSessionImpl,
	AgentClient: () => AgentClient,
	BackendProvider: () => BackendProvider,
	CloudAgentConnection: () => CloudAgentConnection,
	CloudAgentProvider: () => CloudAgentProvider,
	CloudE2BFilesystem: () => CloudE2BFilesystem,
	CommodityCode: () => CommodityCode,
	CosUploadService: () => CosUploadService,
	ENTERPRISE_CLOUDAGENTS_ORIGIN: () => ENTERPRISE_CLOUDAGENTS_ORIGIN,
	FileType: () => FileType,
	FilesystemEventType: () => FilesystemEventType,
	HttpService: () => HttpService,
	IPCBackendProvider: () => IPCBackendProvider,
	JsonRpcEncoder: () => JsonRpcEncoder$1,
	JsonRpcErrorCode: () => JsonRpcErrorCode,
	LocalAgentConnection: () => LocalAgentConnection,
	LocalAgentProvider: () => LocalAgentProvider,
	MockAgentClient: () => MockAgentClient,
	MockAgentConnection: () => MockAgentConnection,
	MockAgentProvider: () => MockAgentProvider,
	OAuthRepositoryService: () => OAuthRepositoryService,
	RequestIdGenerator: () => RequestIdGenerator$1,
	RequestTimeoutError: () => RequestTimeoutError,
	SELECTED_ACCOUNT_KEY: () => SELECTED_ACCOUNT_KEY,
	SPECIAL_SESSION_IDS: () => SPECIAL_SESSION_IDS$1,
	SessionManager: () => SessionManager,
	ToolInputSchemas: () => ToolInputSchemas,
	ToolOutputSchemas: () => ToolOutputSchemas,
	WEBAGENTS_LIST_CONVERSATION_ORIGIN: () => WEBAGENTS_LIST_CONVERSATION_ORIGIN,
	WEBAGENTS_LIST_ORIGINS: () => WEBAGENTS_LIST_ORIGINS,
	WORKBUDDY_APP_ORIGIN: () => WORKBUDDY_APP_ORIGIN,
	WORKBUDDY_MP_ORIGIN: () => WORKBUDDY_MP_ORIGIN,
	WORKING_FAMILY_STATUSES: () => WORKING_FAMILY_STATUSES,
	WORKING_QUERY_STATUSES: () => WORKING_QUERY_STATUSES,
	WxaQrcodeSceneTypes: () => WxaQrcodeSceneTypes,
	accountService: () => accountService,
	createBackendProvider: () => createBackendProvider,
	createIPCBackendProvider: () => createIPCBackendProvider,
	getBuiltinMarketSkillId: () => getBuiltinMarketSkillId,
	getFullUrl: () => getFullUrl,
	httpService: () => httpService,
	isCloudAgentState: () => isCloudAgentState,
	isLocalAgentState: () => isLocalAgentState,
	isReservedSessionId: () => isReservedSessionId$1,
	isStateUpdateNotification: () => isStateUpdateNotification,
	isWorkingFamilyStatus: () => isWorkingFamilyStatus,
	mockInitializeResponse: () => mockInitializeResponse,
	mockNewSessionResponse: () => mockNewSessionResponse,
	oauthRepositoryService: () => oauthRepositoryService,
	validateToolInput: () => validateToolInput,
	validateToolOutput: () => validateToolOutput,
	withWebAgentsListOrigin: () => withWebAgentsListOrigin
});
var init_common = __esmMin((() => {
	init_MockAgentProvider();
	init_json_rpc$1();
	init_acp_client_protocol();
	init_providers();
	init_types$3();
	init_client();
	init_tool_schemas();
	init_backend();
	init_http();
	init_account();
	init_api_types();
	init_cos_upload_service();
	init_conversation_origin();
}));
//#endregion
export { formatProjectFileRulesXml as $, FilesystemEventType as A, accountService as B, WORKING_FAMILY_STATUSES as C, isStateUpdateNotification as D, LocalAgentConnection as E, WEBAGENTS_LIST_CONVERSATION_ORIGIN as F, decodeInputTextToAcpContentBlocks as G, HttpService as H, WEBAGENTS_LIST_ORIGINS as I, stripInlineBadgesFromText as J, decodePersistedUserContentToAcpContentBlocks as K, WORKBUDDY_APP_ORIGIN as L, CosUploadService as M, AGENTS_ORIGIN as N, CloudE2BFilesystem as O, ENTERPRISE_CLOUDAGENTS_ORIGIN as P, USER_CONTEXT_ROLE as Q, WORKBUDDY_MP_ORIGIN as R, LocalAgentProvider as S, isWorkingFamilyStatus as T, CloudAgentConnection as U, httpService as V, init_common$1 as W, PROJECT_TOOL_ROUTING_XML as X, ADDITIONAL_DATA_ROLE as Y, TEAM_PROJECT_CONTEXT_IDENTITY as Z, MockAgentClient as _, BackendProvider as a, isReservedSessionId$1 as at, SessionManager as b, getFullUrl as c, RequestIdGenerator$1 as ct, AccountStatus as d, mockInitializeResponse as dt, stripPromptContextXml as et, CommodityCode as f, mockNewSessionResponse as ft, isLocalAgentState as g, validateToolOutput as gt, isCloudAgentState as h, validateToolInput as ht, createIPCBackendProvider as i, SPECIAL_SESSION_IDS$1 as it, CloudAgentProvider as j, FileType as k, OAuthRepositoryService as l, RequestTimeoutError as lt, getBuiltinMarketSkillId as m, ToolOutputSchemas as mt, init_common as n, wrapTeamProjectContext as nt, SELECTED_ACCOUNT_KEY as o, JsonRpcEncoder$1 as ot, WxaQrcodeSceneTypes as p, ToolInputSchemas as pt, formatDocumentSelectionContextText as q, IPCBackendProvider as r, ExtensionMethod as rt, createBackendProvider as s, JsonRpcErrorCode as st, common_exports as t, wrapHiddenContextXml as tt, oauthRepositoryService as u, MockAgentProvider as ut, MockAgentConnection as v, WORKING_QUERY_STATUSES as w, ActiveSessionImpl as x, AgentClient as y, withWebAgentsListOrigin as z };
