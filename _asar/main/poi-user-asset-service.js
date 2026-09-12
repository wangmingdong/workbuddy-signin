require("./chunk.js");
//#region ../../packages/workbuddy-server/src/poi/poi-user-asset-service.ts
var MAP_PREFIX = "/v2/user-asset/map";
var ADDRESS_PREFIX = "/v2/user-asset/address";
function isPublicIpResponse(payload) {
	return typeof payload === "object" && payload !== null && "ip" in payload && typeof payload.ip === "string" && payload.ip.trim().length > 0;
}
function classifyError(code) {
	if (code === 17451) return "config";
	return "unknown";
}
function makePoiError(kind, message) {
	return {
		kind,
		message
	};
}
function isNetworkError(err) {
	if (!err || typeof err !== "object") return false;
	const e = err;
	if (e.code === "ECONNREFUSED" || e.code === "ENOTFOUND" || e.code === "ERR_NETWORK") return true;
	if (typeof e.message === "string" && /network|timeout|abort/i.test(e.message)) return true;
	return false;
}
function mapIpLocation(raw) {
	const addrParts = [
		raw.ad_info.province,
		raw.ad_info.city,
		raw.ad_info.district
	].filter(Boolean);
	return {
		lat: raw.location.lat,
		lng: raw.location.lng,
		province: raw.ad_info.province,
		city: raw.ad_info.city,
		district: raw.ad_info.district,
		address: addrParts.join("") || void 0
	};
}
function mapGeocoder(raw) {
	return {
		lat: raw.location.lat,
		lng: raw.location.lng,
		level: raw.level,
		reliability: raw.reliability,
		title: raw.title,
		addressComponents: raw.address_components ? {
			province: raw.address_components.province,
			city: raw.address_components.city,
			district: raw.address_components.district,
			street: raw.address_components.street
		} : void 0
	};
}
function mapSuggestion(raw) {
	return {
		id: raw.id || `${raw.location.lat}_${raw.location.lng}`,
		title: raw.title,
		address: raw.address,
		lat: raw.location.lat,
		lng: raw.location.lng
	};
}
function mapAddressToEntry(raw) {
	const locationName = raw.detail || [raw.district, raw.city].filter(Boolean).join(" ") || void 0;
	return {
		id: raw.address_id,
		contact_name: raw.recipient || void 0,
		contact_phone: raw.phone || void 0,
		province: raw.province || void 0,
		city: raw.city || void 0,
		district: raw.district || void 0,
		detail: raw.detail || void 0,
		location_name: locationName,
		location_lat: raw.latitude || void 0,
		location_lng: raw.longitude || void 0,
		is_default: raw.is_default === 1 || raw.is_default === true,
		poi_id: raw.poi_id || void 0
	};
}
function mapEntryToCreateBody(entry) {
	return {
		recipient: entry.contact_name || "",
		phone: entry.contact_phone || "",
		province: entry.province || "",
		city: entry.city || "",
		district: entry.district || "",
		detail: entry.detail || "",
		longitude: entry.location_lng || 0,
		latitude: entry.location_lat || 0,
		poi_id: entry.poi_id || "",
		is_default: entry.is_default ?? false,
		tag: "other"
	};
}
function mapEntryToUpdateBody(id, entry) {
	return {
		address_id: id,
		...mapEntryToCreateBody(entry)
	};
}
var PoiUserAssetService = class {
	http;
	constructor(deps) {
		this.http = deps.context.http;
	}
	async fetchPublicIp() {
		try {
			const response = await fetch("https://api64.ipify.org?format=json", { signal: AbortSignal.timeout(3e3) });
			if (!response.ok) throw new Error(`ipify 请求失败（HTTP ${response.status}）`);
			const payload = await response.json();
			if (!isPublicIpResponse(payload)) throw new Error("ipify 返回结果缺少 ip 字段");
			return payload.ip.trim();
		} catch (err) {
			throw err instanceof Error ? err : new Error(String(err));
		}
	}
	async ipLocate() {
		let publicIp;
		try {
			publicIp = await this.fetchPublicIp();
		} catch (err) {
			return makePoiError("network", `无法获取本机公网 IP：${err instanceof Error ? err.message : String(err)}`);
		}
		try {
			const res = await this.http.get(`${MAP_PREFIX}/ip-location?ip=${encodeURIComponent(publicIp)}`);
			if (res.code !== 0) return makePoiError(classifyError(res.code), res.msg || `ip-location failed (code=${res.code})`);
			if (!res.data?.result) return makePoiError("unknown", "ip-location: empty result");
			return mapIpLocation(res.data.result);
		} catch (err) {
			if (isNetworkError(err)) return makePoiError("network", err instanceof Error ? err.message : "network error");
			return makePoiError("unknown", err instanceof Error ? err.message : "unknown error");
		}
	}
	async geocode(address) {
		if (!address.trim()) return makePoiError("config", "地址为空，无法发起解析");
		try {
			const res = await this.http.get(`${MAP_PREFIX}/geocoder?address=${encodeURIComponent(address)}`);
			if (res.code !== 0) return makePoiError(classifyError(res.code), res.msg || `geocoder failed (code=${res.code})`);
			if (!res.data?.result) return makePoiError("unknown", "geocoder: empty result");
			return mapGeocoder(res.data.result);
		} catch (err) {
			if (isNetworkError(err)) return makePoiError("network", err instanceof Error ? err.message : "network error");
			return makePoiError("unknown", err instanceof Error ? err.message : "unknown error");
		}
	}
	async suggestion(keyword) {
		if (!keyword.trim()) return [];
		try {
			const res = await this.http.get(`${MAP_PREFIX}/suggestion?keyword=${encodeURIComponent(keyword)}&page_size=10`);
			if (res.code !== 0) return makePoiError(classifyError(res.code), res.msg || `suggestion failed (code=${res.code})`);
			if (!res.data?.data) return [];
			return res.data.data.filter((item) => item.type !== 3 && item.type !== 4).map(mapSuggestion);
		} catch (err) {
			if (isNetworkError(err)) return makePoiError("network", err instanceof Error ? err.message : "network error");
			return makePoiError("unknown", err instanceof Error ? err.message : "unknown error");
		}
	}
	async getAddressList() {
		try {
			const res = await this.http.get(`${ADDRESS_PREFIX}/get-list`);
			if (res.code !== 0) return makePoiError(classifyError(res.code), res.msg || `get-list failed (code=${res.code})`);
			if (!res.data) return {
				total: 0,
				items: []
			};
			return {
				total: res.data.total,
				items: res.data.items.map(mapAddressToEntry)
			};
		} catch (err) {
			if (isNetworkError(err)) return makePoiError("network", err instanceof Error ? err.message : "network error");
			return makePoiError("unknown", err instanceof Error ? err.message : "unknown error");
		}
	}
	async createAddress(entry) {
		try {
			const res = await this.http.post(`${ADDRESS_PREFIX}/create`, mapEntryToCreateBody(entry));
			if (res.code !== 0) return makePoiError(classifyError(res.code), res.msg || `create failed (code=${res.code})`);
			return { addressId: res.data?.address_id || "" };
		} catch (err) {
			if (isNetworkError(err)) return makePoiError("network", err instanceof Error ? err.message : "network error");
			return makePoiError("unknown", err instanceof Error ? err.message : "unknown error");
		}
	}
	async updateAddress(id, entry) {
		try {
			const res = await this.http.post(`${ADDRESS_PREFIX}/update`, mapEntryToUpdateBody(id, entry));
			if (res.code !== 0) return makePoiError(classifyError(res.code), res.msg || `update failed (code=${res.code})`);
			return { success: true };
		} catch (err) {
			if (isNetworkError(err)) return makePoiError("network", err instanceof Error ? err.message : "network error");
			return makePoiError("unknown", err instanceof Error ? err.message : "unknown error");
		}
	}
	async deleteAddress(id) {
		try {
			const res = await this.http.post(`${ADDRESS_PREFIX}/delete`, { address_id: id });
			if (res.code !== 0) return makePoiError(classifyError(res.code), res.msg || `delete failed (code=${res.code})`);
			return { success: true };
		} catch (err) {
			if (isNetworkError(err)) return makePoiError("network", err instanceof Error ? err.message : "network error");
			return makePoiError("unknown", err instanceof Error ? err.message : "unknown error");
		}
	}
	async setDefaultAddress(id) {
		try {
			const res = await this.http.post(`${ADDRESS_PREFIX}/set-default`, { address_id: id });
			if (res.code !== 0) return makePoiError(classifyError(res.code), res.msg || `set-default failed (code=${res.code})`);
			return { success: true };
		} catch (err) {
			if (isNetworkError(err)) return makePoiError("network", err instanceof Error ? err.message : "network error");
			return makePoiError("unknown", err instanceof Error ? err.message : "unknown error");
		}
	}
};
//#endregion
exports.PoiUserAssetService = PoiUserAssetService;
