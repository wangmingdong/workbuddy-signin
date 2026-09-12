import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { i as useModuleHost, n as init_module_host_context } from "./module-host-context-CI9spvhq.js";
//#region ../../packages/agent-ui/src/modules/common/module-registry.ts
function createModuleRegistry() {
	const modules = /* @__PURE__ */ new Map();
	const listeners = /* @__PURE__ */ new Set();
	const pickerListeners = /* @__PURE__ */ new Set();
	function emit(event) {
		listeners.forEach((fn) => fn(event));
	}
	return {
		register(definition) {
			if (modules.has(definition.id)) {
				console.warn(`[ModuleRegistry] Module "${definition.id}" already registered, skipping`);
				return;
			}
			modules.set(definition.id, {
				definition,
				active: true
			});
			emit({
				type: "module:registered",
				moduleId: definition.id
			});
			console.log(`[ModuleRegistry] Registered: ${definition.id}`);
		},
		registerAll(definitions) {
			definitions.forEach((def) => this.register(def));
		},
		unregister(moduleId) {
			if (modules.delete(moduleId)) emit({
				type: "module:unregistered",
				moduleId
			});
		},
		get(moduleId) {
			return modules.get(moduleId);
		},
		getAll() {
			return Array.from(modules.values());
		},
		getContributions(type) {
			const result = [];
			for (const [id, instance] of modules) {
				if (!instance.active) continue;
				if (instance.definition.enabled && !instance.definition.enabled()) continue;
				const items = instance.definition.contributions[type];
				if (items) for (const item of items) result.push({
					moduleId: id,
					contribution: item
				});
				if (type === "messageCards") {
					const legacy = instance.definition.contributions.messageActions;
					if (legacy) for (const item of legacy) result.push({
						moduleId: id,
						contribution: item
					});
				}
			}
			result.sort((a, b) => (a.contribution.order ?? 100) - (b.contribution.order ?? 100));
			return result;
		},
		invokePicker(pickerId, options = {}) {
			return new Promise((resolve) => {
				const request = {
					pickerId,
					options,
					resolve
				};
				if (pickerListeners.size === 0) {
					console.warn(`[ModuleRegistry] No PickerHost mounted, cannot invoke picker "${pickerId}"`);
					resolve(null);
					return;
				}
				pickerListeners.forEach((listener) => listener(request));
			});
		},
		onPickerRequest(listener) {
			pickerListeners.add(listener);
			return () => pickerListeners.delete(listener);
		},
		subscribe(listener) {
			listeners.add(listener);
			return () => listeners.delete(listener);
		}
	};
}
var init_module_registry = __esmMin((() => {}));
var init_module_slot = __esmMin((() => {
	require_react();
	init_module_host_context();
	require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/common/picker-host.tsx
var import_react, import_jsx_runtime, PickerHost;
var init_picker_host = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_module_host_context();
	import_jsx_runtime = require_jsx_runtime();
	PickerHost = () => {
		const { registry } = useModuleHost();
		const [activePicker, setActivePicker] = (0, import_react.useState)(null);
		(0, import_react.useEffect)(() => {
			return registry.onPickerRequest((request) => {
				const match = registry.getContributions("pickers").find((p) => p.contribution.id === request.pickerId);
				if (!match) {
					console.warn(`[PickerHost] Picker "${request.pickerId}" not found in registry`);
					request.resolve(null);
					return;
				}
				console.log(`[PickerHost] invoking picker "${request.pickerId}", options:`, request.options);
				setActivePicker({
					request,
					Component: match.contribution.component
				});
			});
		}, [registry]);
		const handleSelect = (0, import_react.useCallback)((result) => {
			if (activePicker) {
				activePicker.request.resolve(result);
				setActivePicker(null);
			}
		}, [activePicker]);
		const handleClose = (0, import_react.useCallback)(() => {
			if (activePicker) {
				activePicker.request.resolve(null);
				setActivePicker(null);
			}
		}, [activePicker]);
		if (!activePicker) return null;
		const { Component, request } = activePicker;
		const { options } = request;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
			fallback: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, {
				visible: true,
				onSelect: handleSelect,
				onClose: handleClose,
				...options
			})
		});
	};
	PickerHost.displayName = "PickerHost";
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/common/index.ts
var init_common = __esmMin((() => {
	init_module_registry();
	init_module_host_context();
	init_module_slot();
	init_picker_host();
}));
//#endregion
export { init_module_registry as a, createModuleRegistry as i, PickerHost as n, init_picker_host as r, init_common as t };
