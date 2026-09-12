import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { Ao as usePoi, Do as init_poi_types, Eo as useGeocodeValidate, Fo as AddressCascader, Mo as init_poi_service_context, No as usePoiMapService, Oo as PoiServiceError, Po as init_AddressCascader, So as toToolLocation, To as init_use_geocode_validate, bo as ipResultToFormValue, ko as init_use_poi, wo as buildConfirmedData, xo as poiFlowReducer, yo as init_use_poi_flow_internal } from "./agent-mail-CiuzbR2o.js";
import { ni as ConfirmDialog, t as init_src } from "./src-DRGoWjIu.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { H as Modal, X as Loading, ct as Button, st as init_Button, t as init_foundation, tt as Input } from "./foundation-QOglV606.js";
import { r as useTranslation, t as init_useI18n } from "./useI18n-DDytAo7_.js";
import { A as init_city_tree, j as loadCityTree } from "./message-converter-CCG28Swi.js";
//#region ../../packages/agent-ui/src/modules/poi/dialog/poi-dialog-cards.scss
var init_poi_dialog_cards = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/poi/dialog/McpPoiConsentCard.tsx
function McpPoiConsentCard({ mcpServerName, onAllow, onDeny }) {
	const t = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
		className: "poi-dialog-card poi-auth-card",
		role: "group",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
				className: "poi-dialog-card__title",
				children: t("poi.mcp.consent.title", { mcpServerName: mcpServerName.startsWith("custom-mcp:") ? mcpServerName.slice(11) : mcpServerName })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
				className: "poi-dialog-card__desc",
				children: t("poi.mcp.consent.description")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
				className: "poi-dialog-card__options",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("button", {
					type: "button",
					className: "poi-address-picker-card__option",
					onClick: onAllow,
					children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("span", {
						className: "poi-address-picker-card__index",
						children: "1"
					}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("span", {
						className: "poi-address-picker-card__option-main",
						children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("span", {
							className: "poi-address-picker-card__option-name",
							children: t("poi.mcp.consent.allow")
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("button", {
					type: "button",
					className: "poi-address-picker-card__option",
					onClick: onDeny,
					children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("span", {
						className: "poi-address-picker-card__index",
						children: "2"
					}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("span", {
						className: "poi-address-picker-card__option-main",
						children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("span", {
							className: "poi-address-picker-card__option-name",
							children: t("poi.mcp.consent.deny")
						})
					})]
				})]
			})
		]
	});
}
var import_jsx_runtime$5;
var init_McpPoiConsentCard = __esmMin((() => {
	init_poi_dialog_cards();
	require_react();
	init_useI18n();
	import_jsx_runtime$5 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/poi/dialog/PoiAddressPickerCard.tsx
function locationLabel(loc) {
	const contactParts = [loc.contact_name, loc.contact_phone].filter(Boolean);
	return {
		name: loc.location_name ?? loc.manual_location_detail ?? loc.location_address ?? "",
		address: loc.location_address ?? "",
		contact: contactParts.join(" ")
	};
}
/** 稳定列表 key：多条地址改造后优先用 entry.id（条目唯一标识），回落坐标/地址。 */
function locationKey(loc, index) {
	if (loc.id) return loc.id;
	if (loc.location_lat !== void 0 && loc.location_lng !== void 0) return `${loc.location_lat},${loc.location_lng},${loc.location_updated_at ?? ""}`;
	return loc.location_address ?? loc.location_name ?? `loc-${index}`;
}
function PoiAddressPickerCard({ savedLocations, onSelectSaved, onAddNew, onCancel }) {
	const t = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
		className: "poi-dialog-card poi-address-picker-card",
		role: "group",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
				className: "poi-dialog-card__title",
				children: t("poi.dialog.addressPicker.title")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
				className: "poi-dialog-card__options",
				children: [savedLocations.map((loc, index) => {
					const { name, address, contact } = locationLabel(loc);
					return /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("button", {
						type: "button",
						className: "poi-address-picker-card__option",
						onClick: () => onSelectSaved(loc),
						children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
							className: "poi-address-picker-card__index",
							children: index + 1
						}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("span", {
							className: "poi-address-picker-card__option-main",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
									className: "poi-address-picker-card__option-name",
									children: name
								}),
								address && /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
									className: "poi-address-picker-card__option-address",
									children: address
								}),
								contact && /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
									className: "poi-address-picker-card__option-contact",
									children: contact
								})
							]
						})]
					}, locationKey(loc, index));
				}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("button", {
					type: "button",
					className: "poi-address-picker-card__option",
					onClick: onAddNew,
					children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
						className: "poi-address-picker-card__index",
						children: savedLocations.length + 1
					}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
						className: "poi-address-picker-card__option-main",
						children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
							className: "poi-address-picker-card__option-name",
							children: t("poi.dialog.addressPicker.addNew")
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
				className: "poi-dialog-card__actions",
				children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(Button, {
					variant: "secondary",
					size: "medium",
					onClick: onCancel,
					children: t("common.cancel")
				})
			})
		]
	});
}
var import_jsx_runtime$4;
var init_PoiAddressPickerCard = __esmMin((() => {
	init_poi_dialog_cards();
	require_react();
	init_foundation();
	init_useI18n();
	import_jsx_runtime$4 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/poi/dialog/PoiAuthCard.tsx
function PoiAuthCard({ onAllow, onDeny, title, description }) {
	const t = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
		className: "poi-dialog-card poi-auth-card",
		role: "group",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
				className: "poi-dialog-card__title",
				children: title ?? t("poi.dialog.auth.title")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
				className: "poi-dialog-card__desc",
				children: description ?? t("poi.dialog.auth.description")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
				className: "poi-dialog-card__options",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("button", {
					type: "button",
					className: "poi-address-picker-card__option",
					onClick: onAllow,
					children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
						className: "poi-address-picker-card__index",
						children: "1"
					}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
						className: "poi-address-picker-card__option-main",
						children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
							className: "poi-address-picker-card__option-name",
							children: t("poi.dialog.auth.allow")
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("button", {
					type: "button",
					className: "poi-address-picker-card__option",
					onClick: onDeny,
					children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
						className: "poi-address-picker-card__index",
						children: "2"
					}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
						className: "poi-address-picker-card__option-main",
						children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
							className: "poi-address-picker-card__option-name",
							children: t("poi.dialog.auth.deny")
						})
					})]
				})]
			})
		]
	});
}
var import_jsx_runtime$3;
var init_PoiAuthCard = __esmMin((() => {
	init_poi_dialog_cards();
	require_react();
	init_useI18n();
	import_jsx_runtime$3 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/poi/dialog/PoiLocateErrorDialog.tsx
function PoiLocateErrorDialog({ open, onOpenChange, onRetry, onCancel, kind = "normal" }) {
	const t = useTranslation();
	const isConfig = kind === "config";
	const title = isConfig ? t("poi.dialog.error.configTitle") : t("poi.dialog.error.title");
	const description = isConfig ? t("poi.dialog.error.configDescription") : t("poi.dialog.error.description");
	return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Modal, {
		open,
		onOpenChange,
		title,
		size: "small",
		footer: isConfig ? /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Button, {
			variant: "grey",
			size: "medium",
			onClick: onCancel,
			children: t("poi.dialog.error.cancel")
		}) : /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(import_jsx_runtime$2.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Button, {
			variant: "grey",
			size: "medium",
			onClick: onCancel,
			children: t("poi.dialog.error.cancel")
		}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Button, {
			variant: "primary",
			size: "medium",
			onClick: onRetry,
			children: t("poi.dialog.error.retry")
		})] }),
		children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
			className: "poi-locate-error-dialog",
			children: description
		})
	});
}
var import_jsx_runtime$2;
var init_PoiLocateErrorDialog = __esmMin((() => {
	require_react();
	init_foundation();
	init_Button();
	init_useI18n();
	import_jsx_runtime$2 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/poi/dialog/PoiLocationFormCard.tsx
/** 比较地区与详细地址是否相对初值发生改动（联系人/电话不影响 source 判定） */
function isLocationDirty(form, initial) {
	if (!initial) return true;
	return !(form.region.length === initial.region.length && form.region.every((v, i) => v === initial.region[i])) || form.detailAddress.trim() !== initial.detailAddress.trim();
}
/** 中国大陆手机号格式校验（1 开头 + 第二位 3-9 + 共 11 位） */
function isValidPhone(phone) {
	return /^1[3-9]\d{9}$/.test(phone.trim());
}
function PoiLocationFormCard({ title, description, initialValue, sourceTag = "manual", service, loadCityTreeOverride, currentAuthStatus = "not_granted", onSave, onCancel }) {
	const t = useTranslation();
	const resolvedService = usePoiMapService(service);
	const { options, optionsLoading, error, clearError, validateAndBuild } = useGeocodeValidate(loadCityTreeOverride);
	const [form, setForm] = (0, import_react$2.useState)((0, import_react$2.useRef)(initialValue ?? EMPTY_FORM).current);
	const [submitting, setSubmitting] = (0, import_react$2.useState)(false);
	const [pendingResult, setPendingResult] = (0, import_react$2.useState)(null);
	(0, import_react$2.useEffect)(() => {
		clearError();
	}, [clearError]);
	const updateField = (key, value) => {
		setForm((prev) => ({
			...prev,
			[key]: value
		}));
		if (error) clearError();
	};
	const regionEmpty = form.region.length === 0;
	const detailEmpty = form.detailAddress.trim().length === 0;
	const contactNameEmpty = form.contactName.trim().length === 0;
	const contactPhoneEmpty = form.contactPhone.trim().length === 0;
	const phoneInvalid = !contactPhoneEmpty && !isValidPhone(form.contactPhone);
	const okDisabled = regionEmpty || detailEmpty || contactNameEmpty || contactPhoneEmpty || phoneInvalid || optionsLoading || submitting;
	const resolvedTitle = (0, import_react$2.useMemo)(() => {
		if (title) return title;
		return sourceTag === "geolocation" ? t("poi.dialog.form.titleAuto") : t("poi.dialog.form.titleManual");
	}, [
		title,
		sourceTag,
		t
	]);
	const resolvedDesc = (0, import_react$2.useMemo)(() => {
		if (description) return description;
		return sourceTag === "geolocation" ? t("poi.dialog.form.descriptionAuto") : t("poi.dialog.form.descriptionManual");
	}, [
		description,
		sourceTag,
		t
	]);
	const handleSubmit = async () => {
		if (okDisabled) return;
		setSubmitting(true);
		try {
			const result = await validateAndBuild(form, resolvedService, currentAuthStatus);
			if (!result) return;
			setPendingResult(result);
		} finally {
			setSubmitting(false);
		}
	};
	const handleConfirmGeocode = () => {
		if (!pendingResult) return;
		const data = buildConfirmedData(pendingResult);
		const source = sourceTag === "geolocation" && !isLocationDirty(form, initialValue) ? "geolocation" : sourceTag;
		setPendingResult(null);
		onSave({
			...data,
			location_source: source
		});
	};
	const handleRejectGeocode = () => {
		setPendingResult(null);
	};
	const bannerStatus = error === "configError" || error === "tempFailed" ? error : null;
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(import_jsx_runtime$1.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
		className: "poi-dialog-card poi-location-form-card",
		role: "group",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
				className: "poi-location-form-card__header",
				children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
					className: "poi-dialog-card__title",
					children: resolvedTitle
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
				className: "poi-dialog-card__desc",
				children: resolvedDesc
			}),
			bannerStatus && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
				className: "poi-location-form-card__banner",
				role: "alert",
				children: bannerStatus === "configError" ? t("poi.geocode.configError") : t("poi.geocode.tempFailed")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
				className: "poi-location-form-card__rows",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "poi-location-form-card__row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
							className: "poi-location-form-card__row-label",
							children: t("settings.locationModal.region")
						}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
							className: "poi-location-form-card__row-value",
							children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AddressCascader, {
								options,
								value: form.region,
								onChange: (value) => updateField("region", value),
								placeholder: t("settings.locationModal.regionPlaceholder"),
								fullWidth: true,
								disabled: optionsLoading,
								portalRoot: "body"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "poi-location-form-card__row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
							className: "poi-location-form-card__row-label",
							children: t("settings.locationModal.detail")
						}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
							className: "poi-location-form-card__row-value",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Input, {
								value: form.detailAddress,
								onChange: (e) => updateField("detailAddress", e.target.value),
								placeholder: t("settings.locationModal.detailPlaceholder"),
								status: error === "unrecognized" ? "error" : void 0
							}), error === "unrecognized" && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
								className: "poi-location-form-card__error",
								children: t("poi.geocode.unrecognized")
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "poi-location-form-card__row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
							className: "poi-location-form-card__row-label",
							children: t("settings.locationModal.contactName")
						}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
							className: "poi-location-form-card__row-value",
							children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Input, {
								value: form.contactName,
								onChange: (e) => updateField("contactName", e.target.value),
								placeholder: t("settings.locationModal.contactNamePlaceholder")
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "poi-location-form-card__row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
							className: "poi-location-form-card__row-label",
							children: t("settings.locationModal.contactPhone")
						}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
							className: "poi-location-form-card__row-value",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Input, {
								value: form.contactPhone,
								onChange: (e) => updateField("contactPhone", e.target.value),
								placeholder: t("settings.locationModal.contactPhonePlaceholder"),
								status: phoneInvalid ? "error" : void 0
							}), phoneInvalid && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
								className: "poi-location-form-card__error",
								children: t("poi.form.phoneInvalid")
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
				className: "poi-dialog-card__actions",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Button, {
					variant: "secondary",
					size: "medium",
					onClick: onCancel,
					disabled: submitting,
					children: t("settings.locationModal.cancel")
				}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Button, {
					variant: "primary",
					size: "medium",
					onClick: handleSubmit,
					disabled: okDisabled,
					loading: submitting,
					children: t("settings.locationModal.save")
				})]
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ConfirmDialog, {
		visible: pendingResult !== null,
		title: t("poi.geocode.confirmTitle"),
		content: t("poi.geocode.confirmContent", { address: [
			pendingResult?.geocodeResult.addressComponents?.province,
			pendingResult?.geocodeResult.addressComponents?.city,
			pendingResult?.geocodeResult.addressComponents?.district,
			pendingResult?.geocodeResult.title
		].filter(Boolean).join(" ") }),
		confirmText: t("poi.geocode.confirmOk"),
		cancelText: t("poi.geocode.confirmCancel"),
		onConfirm: handleConfirmGeocode,
		onClose: handleRejectGeocode
	})] });
}
var import_react$2, import_jsx_runtime$1, EMPTY_FORM;
var init_PoiLocationFormCard = __esmMin((() => {
	init_poi_dialog_cards();
	init_src();
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
	init_foundation();
	init_Button();
	init_useI18n();
	init_AddressCascader();
	init_use_geocode_validate();
	init_poi_service_context();
	import_jsx_runtime$1 = require_jsx_runtime();
	EMPTY_FORM = {
		region: [],
		detailAddress: "",
		contactName: "",
		contactPhone: ""
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/poi/dialog/use-poi-flow.ts
function usePoiFlowCore(poi, options) {
	const service = usePoiMapService(options?.service);
	const [state, dispatch] = (0, import_react$1.useReducer)(poiFlowReducer, { kind: "idle" });
	const loadTree = options?.loadCityTreeOverride ?? loadCityTree;
	const loadTreeRef = (0, import_react$1.useRef)(loadTree);
	loadTreeRef.current = loadTree;
	const onCompleteRef = (0, import_react$1.useRef)(options?.onComplete);
	onCompleteRef.current = options?.onComplete;
	const locationRef = (0, import_react$1.useRef)(poi.location);
	locationRef.current = poi.location;
	const entriesRef = (0, import_react$1.useRef)(poi.entries);
	entriesRef.current = poi.entries;
	const emitComplete = (0, import_react$1.useCallback)((result) => {
		onCompleteRef.current?.(result);
	}, []);
	const completeCancelled = (0, import_react$1.useCallback)((failureReason) => {
		dispatch({
			type: "DONE",
			result: { status: "cancelled" }
		});
		emitComplete(failureReason ? {
			status: "cancelled",
			failureReason
		} : { status: "cancelled" });
	}, [emitComplete]);
	const showSavedEntriesIfAvailable = (0, import_react$1.useCallback)(() => {
		if (entriesRef.current.length === 0) return false;
		dispatch({ type: "ASK_USE_SAVED" });
		return true;
	}, []);
	const doLocate = (0, import_react$1.useCallback)(async (attempt) => {
		dispatch({
			type: "LOCATING",
			attempt
		});
		let ip;
		try {
			ip = await service.ipLocate();
		} catch (err) {
			if (err instanceof PoiServiceError && err.kind === "config") {
				dispatch({
					type: "LOCATE_ERROR",
					errorKind: "config"
				});
				return;
			}
			if (attempt >= MAX_LOCATE_ATTEMPTS) {
				dispatch({
					type: "TO_FORM",
					source: "manual_after_geolocation_failed"
				});
				return;
			}
			dispatch({
				type: "LOCATE_ERROR",
				errorKind: "normal"
			});
			return;
		}
		let tree;
		try {
			tree = await loadTreeRef.current();
		} catch {
			tree = [];
		}
		dispatch({
			type: "LOCATE_OK",
			initialValue: ipResultToFormValue(tree, ip)
		});
	}, [service]);
	const start = (0, import_react$1.useCallback)(() => {
		if (locationRef.current.location_auth_status !== "granted") {
			dispatch({ type: "ASK_AUTH" });
			return;
		}
		if (entriesRef.current.length > 0) {
			dispatch({ type: "ASK_USE_SAVED" });
			return;
		}
		doLocate(1).catch(() => {});
	}, [doLocate]);
	const allow = (0, import_react$1.useCallback)(() => {
		poi.setAuthStatus("granted");
		if (showSavedEntriesIfAvailable()) return;
		doLocate(1).catch(() => {});
	}, [
		poi.setAuthStatus,
		showSavedEntriesIfAvailable,
		doLocate
	]);
	const deny = (0, import_react$1.useCallback)(() => {
		if (showSavedEntriesIfAvailable()) return;
		dispatch({
			type: "TO_FORM",
			source: "manual"
		});
	}, [showSavedEntriesIfAvailable]);
	const useSaved = (0, import_react$1.useCallback)((loc) => {
		const result = toToolLocation(loc);
		dispatch({
			type: "DONE",
			result: {
				status: "success",
				location: loc
			}
		});
		emitComplete(result);
	}, [emitComplete]);
	const addNew = (0, import_react$1.useCallback)(() => {
		if (locationRef.current.location_auth_status === "granted") {
			doLocate(1).catch(() => {});
			return;
		}
		dispatch({
			type: "TO_FORM",
			source: "manual"
		});
	}, [doLocate]);
	const cancelAddressPicker = (0, import_react$1.useCallback)(() => {
		completeCancelled();
	}, [completeCancelled]);
	const retry = (0, import_react$1.useCallback)(() => {
		doLocate(state.kind === "error_dialog" ? 2 : 1).catch(() => {});
	}, [state, doLocate]);
	const cancelError = (0, import_react$1.useCallback)(() => {
		if (state.kind === "error_dialog" && state.errorKind === "config") {
			dispatch({
				type: "DONE",
				result: { status: "failed" }
			});
			emitComplete({
				status: "failed",
				failureReason: "config_error"
			});
			return;
		}
		if (showSavedEntriesIfAvailable()) return;
		completeCancelled("locate_failed");
	}, [
		state,
		showSavedEntriesIfAvailable,
		completeCancelled,
		emitComplete
	]);
	const submitForm = (0, import_react$1.useCallback)((data) => {
		const { id: _ignored, ...rest } = data;
		const id = poi.addEntry(rest);
		dispatch({
			type: "DONE",
			result: {
				status: "success",
				location: {
					...data,
					id
				}
			}
		});
		emitComplete(toToolLocation(data));
	}, [poi.addEntry, emitComplete]);
	const cancelForm = (0, import_react$1.useCallback)(() => {
		if (showSavedEntriesIfAvailable()) return;
		completeCancelled("manual_skipped");
	}, [showSavedEntriesIfAvailable, completeCancelled]);
	const dismiss = (0, import_react$1.useCallback)(() => {
		switch (state.kind) {
			case "ask_use_saved":
				cancelAddressPicker();
				return;
			case "form":
				cancelForm();
				return;
			case "error_dialog":
				cancelError();
				return;
			case "ip_locating":
				if (showSavedEntriesIfAvailable()) return;
				completeCancelled();
				return;
			case "ask_auth":
				completeCancelled();
				return;
			default: return;
		}
	}, [
		state.kind,
		cancelAddressPicker,
		cancelForm,
		cancelError,
		showSavedEntriesIfAvailable,
		completeCancelled
	]);
	return {
		state,
		currentAuthStatus: poi.location.location_auth_status,
		start,
		allow,
		deny,
		useSaved,
		addNew,
		cancelAddressPicker,
		retry,
		cancelError,
		submitForm,
		cancelForm,
		dismiss
	};
}
function usePoiFlowWithPoi(poi, options) {
	return usePoiFlowCore(poi, options);
}
function usePoiFlow(options) {
	return usePoiFlowCore(usePoi(options?.storageOverride), options);
}
var import_react$1, MAX_LOCATE_ATTEMPTS;
var init_use_poi_flow = __esmMin((() => {
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_city_tree();
	init_poi_service_context();
	init_poi_types();
	init_use_poi();
	init_use_poi_flow_internal();
	MAX_LOCATE_ATTEMPTS = 2;
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/poi/dialog/PoiDialogFlow.tsx
/**
* PoiToolLocation → PoiPickResult.location 摘要映射。
*
* PoiToolLocation 无 regionPath 字段，故由 province/city/district 拼接；缺省回落
* address / name，保证 LLM 至少拿到可读的行政区划串。
*/
function toLocationSummary(loc) {
	const regionParts = [
		loc.province,
		loc.city,
		loc.district
	].filter((part) => typeof part === "string" && part.length > 0);
	return {
		regionPath: regionParts.length > 0 ? regionParts.join(" / ") : loc.address || loc.name,
		detailAddress: loc.address || void 0,
		lat: loc.lat,
		lng: loc.lng
	};
}
function toPickResult(result) {
	if (result.status === "success" && result.location) return {
		status: "completed",
		location: toLocationSummary(result.location)
	};
	if (result.status === "failed" && result.failureReason === "config_error") return {
		status: "cancelled",
		reason: "config_error"
	};
	return {
		status: "cancelled",
		reason: "user_cancelled"
	};
}
function PoiDialogFlow({ request, onComplete, onCancel, service, storageOverride, loadCityTreeOverride, onRegisterDismiss }) {
	const t = useTranslation();
	const poi = usePoi(storageOverride);
	const flow = usePoiFlowWithPoi(poi, {
		service,
		loadCityTreeOverride,
		onComplete: (result) => {
			const mapped = toPickResult(result);
			if (mapped.status === "completed") onComplete(mapped);
			else onCancel(mapped.reason);
		}
	});
	const { state, start } = flow;
	const [readyToStart, setReadyToStart] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		onRegisterDismiss?.(flow.dismiss);
		return () => {
			onRegisterDismiss?.(void 0);
		};
	}, [flow.dismiss, onRegisterDismiss]);
	(0, import_react.useEffect)(() => {
		let disposed = false;
		const init = async () => {
			try {
				await poi.refreshBook();
			} finally {
				if (!disposed) setReadyToStart(true);
			}
		};
		init().catch(() => void 0);
		return () => {
			disposed = true;
		};
	}, [poi.refreshBook]);
	(0, import_react.useEffect)(() => {
		if (!readyToStart) return;
		start();
	}, [readyToStart, start]);
	const savedLocations = poi.entries.filter((e) => e.location_name || e.location_address || e.manual_location_detail);
	const didSkipEmptySaved = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (state.kind === "ask_use_saved" && savedLocations.length === 0 && !didSkipEmptySaved.current) {
			didSkipEmptySaved.current = true;
			flow.addNew();
		}
	}, [
		state.kind,
		savedLocations.length,
		flow.addNew
	]);
	if (!readyToStart) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "poi-dialog-flow",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "poi-dialog-flow__locating",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loading, {
				size: "medium",
				tip: t("poi.dialog.loading")
			})
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "poi-dialog-flow",
		children: [
			state.kind === "ask_auth" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PoiAuthCard, {
				onAllow: flow.allow,
				onDeny: flow.deny,
				description: request.reason || void 0
			}),
			state.kind === "ask_use_saved" && savedLocations.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PoiAddressPickerCard, {
				savedLocations,
				onSelectSaved: flow.useSaved,
				onAddNew: flow.addNew,
				onCancel: flow.cancelAddressPicker
			}),
			state.kind === "ip_locating" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "poi-dialog-flow__locating",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loading, {
					size: "medium",
					tip: state.attempt > 1 ? t("poi.dialog.locatingRetry") : t("poi.dialog.locating")
				})
			}),
			state.kind === "error_dialog" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PoiLocateErrorDialog, {
				open: true,
				onOpenChange: () => void 0,
				onRetry: flow.retry,
				onCancel: flow.cancelError,
				kind: state.errorKind
			}),
			state.kind === "form" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PoiLocationFormCard, {
				service,
				loadCityTreeOverride,
				initialValue: state.initialValue,
				sourceTag: state.source === "geolocation" ? "geolocation" : state.source === "manual_after_geolocation_failed" ? "manual_after_geolocation_failed" : "manual",
				currentAuthStatus: flow.currentAuthStatus,
				onSave: flow.submitForm,
				onCancel: flow.cancelForm
			})
		]
	});
}
var import_react, import_jsx_runtime;
var init_PoiDialogFlow = __esmMin((() => {
	init_poi_dialog_cards();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_foundation();
	init_useI18n();
	init_use_poi();
	init_PoiAddressPickerCard();
	init_PoiAuthCard();
	init_PoiLocateErrorDialog();
	init_PoiLocationFormCard();
	init_use_poi_flow();
	import_jsx_runtime = require_jsx_runtime();
}));
//#endregion
export { PoiLocationFormCard as a, init_PoiLocateErrorDialog as c, PoiAddressPickerCard as d, init_PoiAddressPickerCard as f, usePoiFlow as i, PoiAuthCard as l, init_McpPoiConsentCard as m, init_PoiDialogFlow as n, init_PoiLocationFormCard as o, McpPoiConsentCard as p, init_use_poi_flow as r, PoiLocateErrorDialog as s, PoiDialogFlow as t, init_PoiAuthCard as u };
