import { n as __esmMin } from "./chunk-BRZcfu7K.js";
//#region ../../node_modules/jotai/esm/vanilla.mjs
function atom(read, write) {
	const key = `atom${++keyCount}`;
	const config = { toString() {
		return key;
	} };
	if (typeof read === "function") config.read = read;
	else {
		config.init = read;
		config.read = defaultRead;
		config.write = defaultWrite;
	}
	if (write) config.write = write;
	return config;
}
function defaultRead(get) {
	return get(this);
}
function defaultWrite(get, set, arg) {
	return set(this, typeof arg === "function" ? arg(get(this)) : arg);
}
var keyCount, isSelfAtom, hasInitialValue, isActuallyWritableAtom, cancelablePromiseMap, isPendingPromise, cancelPromise, patchPromiseForCancelability, isPromiseLike, isAtomStateInitialized, returnAtomValue, addPendingPromiseToDependency, addDependency, createBatch, addBatchFunc, registerBatchAtom, addBatchAtomDependent, getBatchAtomDependents, flushBatch, buildStore, createStore, defaultStore, getDefaultStore;
var init_vanilla = __esmMin((() => {
	keyCount = 0;
	isSelfAtom = (atom, a) => atom.unstable_is ? atom.unstable_is(a) : a === atom;
	hasInitialValue = (atom) => "init" in atom;
	isActuallyWritableAtom = (atom) => !!atom.write;
	cancelablePromiseMap = /* @__PURE__ */ new WeakMap();
	isPendingPromise = (value) => {
		var _a;
		return isPromiseLike(value) && !((_a = cancelablePromiseMap.get(value)) == null ? void 0 : _a[1]);
	};
	cancelPromise = (promise, nextValue) => {
		const promiseState = cancelablePromiseMap.get(promise);
		if (promiseState) {
			promiseState[1] = true;
			promiseState[0].forEach((fn) => fn(nextValue));
		}
	};
	patchPromiseForCancelability = (promise) => {
		if (cancelablePromiseMap.has(promise)) return;
		const promiseState = [/* @__PURE__ */ new Set(), false];
		cancelablePromiseMap.set(promise, promiseState);
		const settle = () => {
			promiseState[1] = true;
		};
		promise.then(settle, settle);
		promise.onCancel = (fn) => {
			promiseState[0].add(fn);
		};
	};
	isPromiseLike = (x) => typeof (x == null ? void 0 : x.then) === "function";
	isAtomStateInitialized = (atomState) => "v" in atomState || "e" in atomState;
	returnAtomValue = (atomState) => {
		if ("e" in atomState) throw atomState.e;
		return atomState.v;
	};
	addPendingPromiseToDependency = (atom, promise, dependencyAtomState) => {
		if (!dependencyAtomState.p.has(atom)) {
			dependencyAtomState.p.add(atom);
			promise.then(() => {
				dependencyAtomState.p.delete(atom);
			}, () => {
				dependencyAtomState.p.delete(atom);
			});
		}
	};
	addDependency = (batch, atom, atomState, a, aState) => {
		var _a;
		atomState.d.set(a, aState.n);
		if (isPendingPromise(atomState.v)) addPendingPromiseToDependency(atom, atomState.v, aState);
		(_a = aState.m) == null || _a.t.add(atom);
		if (batch) addBatchAtomDependent(batch, a, atom);
	};
	createBatch = () => ({
		D: /* @__PURE__ */ new Map(),
		H: /* @__PURE__ */ new Set(),
		M: /* @__PURE__ */ new Set(),
		L: /* @__PURE__ */ new Set()
	});
	addBatchFunc = (batch, priority, fn) => {
		batch[priority].add(fn);
	};
	registerBatchAtom = (batch, atom, atomState) => {
		if (!batch.D.has(atom)) {
			batch.D.set(atom, /* @__PURE__ */ new Set());
			addBatchFunc(batch, "M", () => {
				var _a;
				(_a = atomState.m) == null || _a.l.forEach((listener) => addBatchFunc(batch, "M", listener));
			});
		}
	};
	addBatchAtomDependent = (batch, atom, dependent) => {
		const dependents = batch.D.get(atom);
		if (dependents) dependents.add(dependent);
	};
	getBatchAtomDependents = (batch, atom) => batch.D.get(atom);
	flushBatch = (batch) => {
		let error;
		let hasError = false;
		const call = (fn) => {
			try {
				fn();
			} catch (e) {
				if (!hasError) {
					error = e;
					hasError = true;
				}
			}
		};
		while (batch.H.size || batch.M.size || batch.L.size) {
			batch.D.clear();
			batch.H.forEach(call);
			batch.H.clear();
			batch.M.forEach(call);
			batch.M.clear();
			batch.L.forEach(call);
			batch.L.clear();
		}
		if (hasError) throw error;
	};
	buildStore = (...[getAtomState, atomRead, atomWrite, atomOnMount]) => {
		const setAtomStateValueOrPromise = (atom, atomState, valueOrPromise) => {
			const hasPrevValue = "v" in atomState;
			const prevValue = atomState.v;
			const pendingPromise = isPendingPromise(atomState.v) ? atomState.v : null;
			if (isPromiseLike(valueOrPromise)) {
				patchPromiseForCancelability(valueOrPromise);
				for (const a of atomState.d.keys()) addPendingPromiseToDependency(atom, valueOrPromise, getAtomState(a));
				atomState.v = valueOrPromise;
			} else atomState.v = valueOrPromise;
			delete atomState.e;
			delete atomState.x;
			if (!hasPrevValue || !Object.is(prevValue, atomState.v)) {
				++atomState.n;
				if (pendingPromise) cancelPromise(pendingPromise, valueOrPromise);
			}
		};
		const readAtomState = (batch, atom) => {
			var _a;
			const atomState = getAtomState(atom);
			if (isAtomStateInitialized(atomState)) {
				if (atomState.m && !atomState.x) return atomState;
				if (Array.from(atomState.d).every(([a, n]) => readAtomState(batch, a).n === n)) return atomState;
			}
			atomState.d.clear();
			let isSync = true;
			const getter = (a) => {
				if (isSelfAtom(atom, a)) {
					const aState2 = getAtomState(a);
					if (!isAtomStateInitialized(aState2)) if (hasInitialValue(a)) setAtomStateValueOrPromise(a, aState2, a.init);
					else throw new Error("no atom init");
					return returnAtomValue(aState2);
				}
				const aState = readAtomState(batch, a);
				try {
					return returnAtomValue(aState);
				} finally {
					if (isSync) addDependency(batch, atom, atomState, a, aState);
					else {
						const batch2 = createBatch();
						addDependency(batch2, atom, atomState, a, aState);
						mountDependencies(batch2, atom, atomState);
						flushBatch(batch2);
					}
				}
			};
			let controller;
			let setSelf;
			const options = {
				get signal() {
					if (!controller) controller = new AbortController();
					return controller.signal;
				},
				get setSelf() {
					if (!setSelf && isActuallyWritableAtom(atom)) setSelf = (...args) => {
						if (!isSync) return writeAtom(atom, ...args);
					};
					return setSelf;
				}
			};
			try {
				const valueOrPromise = atomRead(atom, getter, options);
				setAtomStateValueOrPromise(atom, atomState, valueOrPromise);
				if (isPromiseLike(valueOrPromise)) {
					(_a = valueOrPromise.onCancel) == null || _a.call(valueOrPromise, () => controller == null ? void 0 : controller.abort());
					const complete = () => {
						if (atomState.m) {
							const batch2 = createBatch();
							mountDependencies(batch2, atom, atomState);
							flushBatch(batch2);
						}
					};
					valueOrPromise.then(complete, complete);
				}
				return atomState;
			} catch (error) {
				delete atomState.v;
				atomState.e = error;
				delete atomState.x;
				++atomState.n;
				return atomState;
			} finally {
				isSync = false;
			}
		};
		const readAtom = (atom) => returnAtomValue(readAtomState(void 0, atom));
		const getMountedOrBatchDependents = (batch, atom, atomState) => {
			var _a, _b;
			const dependents = /* @__PURE__ */ new Map();
			for (const a of ((_a = atomState.m) == null ? void 0 : _a.t) || []) {
				const aState = getAtomState(a);
				if (aState.m) dependents.set(a, aState);
			}
			for (const atomWithPendingPromise of atomState.p) dependents.set(atomWithPendingPromise, getAtomState(atomWithPendingPromise));
			(_b = getBatchAtomDependents(batch, atom)) == null || _b.forEach((dependent) => {
				dependents.set(dependent, getAtomState(dependent));
			});
			return dependents;
		};
		const recomputeDependents = (batch, atom, atomState) => {
			const topSortedReversed = [];
			const visiting = /* @__PURE__ */ new Set();
			const visited = /* @__PURE__ */ new Set();
			const stack = [[atom, atomState]];
			while (stack.length > 0) {
				const [a, aState] = stack[stack.length - 1];
				if (visited.has(a)) {
					stack.pop();
					continue;
				}
				if (visiting.has(a)) {
					topSortedReversed.push([
						a,
						aState,
						aState.n
					]);
					visited.add(a);
					aState.x = true;
					stack.pop();
					continue;
				}
				visiting.add(a);
				for (const [d, s] of getMountedOrBatchDependents(batch, a, aState)) if (a !== d && !visiting.has(d)) stack.push([d, s]);
			}
			addBatchFunc(batch, "H", () => {
				const changedAtoms = /* @__PURE__ */ new Set([atom]);
				for (let i = topSortedReversed.length - 1; i >= 0; --i) {
					const [a, aState, prevEpochNumber] = topSortedReversed[i];
					let hasChangedDeps = false;
					for (const dep of aState.d.keys()) if (dep !== a && changedAtoms.has(dep)) {
						hasChangedDeps = true;
						break;
					}
					if (hasChangedDeps) {
						readAtomState(batch, a);
						mountDependencies(batch, a, aState);
						if (prevEpochNumber !== aState.n) {
							registerBatchAtom(batch, a, aState);
							changedAtoms.add(a);
						}
					}
					delete aState.x;
				}
			});
		};
		const writeAtomState = (batch, atom, ...args) => {
			let isSync = true;
			const getter = (a) => returnAtomValue(readAtomState(batch, a));
			const setter = (a, ...args2) => {
				const aState = getAtomState(a);
				try {
					if (isSelfAtom(atom, a)) {
						if (!hasInitialValue(a)) throw new Error("atom not writable");
						const prevEpochNumber = aState.n;
						const v = args2[0];
						setAtomStateValueOrPromise(a, aState, v);
						mountDependencies(batch, a, aState);
						if (prevEpochNumber !== aState.n) {
							registerBatchAtom(batch, a, aState);
							recomputeDependents(batch, a, aState);
						}
						return;
					} else return writeAtomState(batch, a, ...args2);
				} finally {
					if (!isSync) flushBatch(batch);
				}
			};
			try {
				return atomWrite(atom, getter, setter, ...args);
			} finally {
				isSync = false;
			}
		};
		const writeAtom = (atom, ...args) => {
			const batch = createBatch();
			try {
				return writeAtomState(batch, atom, ...args);
			} finally {
				flushBatch(batch);
			}
		};
		const mountDependencies = (batch, atom, atomState) => {
			if (atomState.m && !isPendingPromise(atomState.v)) {
				for (const a of atomState.d.keys()) if (!atomState.m.d.has(a)) {
					mountAtom(batch, a, getAtomState(a)).t.add(atom);
					atomState.m.d.add(a);
				}
				for (const a of atomState.m.d || []) if (!atomState.d.has(a)) {
					atomState.m.d.delete(a);
					unmountAtom(batch, a, getAtomState(a))?.t.delete(atom);
				}
			}
		};
		const mountAtom = (batch, atom, atomState) => {
			if (!atomState.m) {
				readAtomState(batch, atom);
				for (const a of atomState.d.keys()) mountAtom(batch, a, getAtomState(a)).t.add(atom);
				atomState.m = {
					l: /* @__PURE__ */ new Set(),
					d: new Set(atomState.d.keys()),
					t: /* @__PURE__ */ new Set()
				};
				if (isActuallyWritableAtom(atom)) {
					const mounted = atomState.m;
					let setAtom;
					const createInvocationContext = (batch2, fn) => {
						let isSync = true;
						setAtom = (...args) => {
							try {
								return writeAtomState(batch2, atom, ...args);
							} finally {
								if (!isSync) flushBatch(batch2);
							}
						};
						try {
							return fn();
						} finally {
							isSync = false;
						}
					};
					addBatchFunc(batch, "L", () => {
						const onUnmount = createInvocationContext(batch, () => atomOnMount(atom, (...args) => setAtom(...args)));
						if (onUnmount) mounted.u = (batch2) => createInvocationContext(batch2, onUnmount);
					});
				}
			}
			return atomState.m;
		};
		const unmountAtom = (batch, atom, atomState) => {
			if (atomState.m && !atomState.m.l.size && !Array.from(atomState.m.t).some((a) => {
				var _a;
				return (_a = getAtomState(a).m) == null ? void 0 : _a.d.has(atom);
			})) {
				const onUnmount = atomState.m.u;
				if (onUnmount) addBatchFunc(batch, "L", () => onUnmount(batch));
				delete atomState.m;
				for (const a of atomState.d.keys()) unmountAtom(batch, a, getAtomState(a))?.t.delete(atom);
				return;
			}
			return atomState.m;
		};
		const subscribeAtom = (atom, listener) => {
			const batch = createBatch();
			const atomState = getAtomState(atom);
			const listeners = mountAtom(batch, atom, atomState).l;
			listeners.add(listener);
			flushBatch(batch);
			return () => {
				listeners.delete(listener);
				const batch2 = createBatch();
				unmountAtom(batch2, atom, atomState);
				flushBatch(batch2);
			};
		};
		const unstable_derive = (fn) => buildStore(...fn(getAtomState, atomRead, atomWrite, atomOnMount));
		return {
			get: readAtom,
			set: writeAtom,
			sub: subscribeAtom,
			unstable_derive
		};
	};
	createStore = () => {
		const atomStateMap = /* @__PURE__ */ new WeakMap();
		const getAtomState = (atom) => {
			let atomState = atomStateMap.get(atom);
			if (!atomState) {
				atomState = {
					d: /* @__PURE__ */ new Map(),
					p: /* @__PURE__ */ new Set(),
					n: 0
				};
				atomStateMap.set(atom, atomState);
			}
			return atomState;
		};
		return buildStore(getAtomState, (atom, ...params) => atom.read(...params), (atom, ...params) => atom.write(...params), (atom, ...params) => {
			var _a;
			return (_a = atom.onMount) == null ? void 0 : _a.call(atom, ...params);
		});
	};
	getDefaultStore = () => {
		if (!defaultStore) defaultStore = createStore();
		return defaultStore;
	};
}));
//#endregion
export { init_vanilla as i, createStore as n, getDefaultStore as r, atom as t };
