import { n as __esmMin } from "./chunk-BRZcfu7K.js";
//#region ../../packages/agent-ui/src/utils/route-path-tracker.ts
/** 由 ShellRouteController 在 location.pathname 变化时调用 */
function setCurrentRoutePath(path) {
	_currentRoutePath = path;
}
/** 供非 React 代码读取当前路由路径（如 /task/xxx、/experts 等） */
function getCurrentRoutePath() {
	return _currentRoutePath;
}
var _currentRoutePath;
var init_route_path_tracker = __esmMin((() => {
	_currentRoutePath = "/";
}));
//#endregion
export { init_route_path_tracker as n, setCurrentRoutePath as r, getCurrentRoutePath as t };
