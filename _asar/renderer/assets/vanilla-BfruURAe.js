import { n as __esmMin } from "./chunk-BRZcfu7K.js";
//#region ../../node_modules/zustand/esm/vanilla.mjs
var createStoreImpl, createStore;
var init_vanilla = __esmMin((() => {
	createStoreImpl = (createState) => {
		let state;
		const listeners = /* @__PURE__ */ new Set();
		const setState = (partial, replace) => {
			const nextState = typeof partial === "function" ? partial(state) : partial;
			if (!Object.is(nextState, state)) {
				const previousState = state;
				state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
				listeners.forEach((listener) => listener(state, previousState));
			}
		};
		const getState = () => state;
		const getInitialState = () => initialState;
		const subscribe = (listener) => {
			listeners.add(listener);
			return () => listeners.delete(listener);
		};
		const destroy = () => {
			listeners.clear();
		};
		const api = {
			setState,
			getState,
			getInitialState,
			subscribe,
			destroy
		};
		const initialState = state = createState(setState, getState, api);
		return api;
	};
	createStore = (createState) => createState ? createStoreImpl(createState) : createStoreImpl;
}));
//#endregion
export { init_vanilla as n, createStore as t };
