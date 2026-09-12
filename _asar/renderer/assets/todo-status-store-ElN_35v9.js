import { n as __esmMin } from "./chunk-BRZcfu7K.js";
//#region ../../packages/agent-ui/src/adapters/todo-status-store.ts
/**
* 获取或创建会话条目
*/
function getOrCreateEntry(sessionId) {
	let entry = sessionTodoMap.get(sessionId);
	if (!entry) {
		entry = {
			statusMap: /* @__PURE__ */ new Map(),
			taskDataList: [],
			derivedPlanStatus: void 0,
			isTalking: false,
			subscribers: /* @__PURE__ */ new Set(),
			taskDataSubscribers: /* @__PURE__ */ new Set(),
			planStatusSubscribers: /* @__PURE__ */ new Set()
		};
		sessionTodoMap.set(sessionId, entry);
	}
	return entry;
}
/**
* 通知 statusMap 订阅者
*/
function notifySubscribers(entry) {
	entry.subscribers.forEach((cb) => {
		try {
			cb(entry.statusMap);
		} catch (e) {
			console.error("[TodoStatusStore] Subscriber error:", e);
		}
	});
}
/**
* 通知 taskDataList 订阅者
*/
function notifyTaskDataSubscribers(entry) {
	entry.taskDataSubscribers.forEach((cb) => {
		try {
			cb(entry.taskDataList);
		} catch (e) {
			console.error("[TodoStatusStore] TaskData subscriber error:", e);
		}
	});
}
/**
* 通知 planStatus 订阅者
*/
function notifyPlanStatusSubscribers(entry) {
	entry.planStatusSubscribers.forEach((cb) => {
		try {
			cb(entry.derivedPlanStatus);
		} catch (e) {
			console.error("[TodoStatusStore] PlanStatus subscriber error:", e);
		}
	});
}
/**
* 根据 statusMap 推导 plan status
* 参考后端 todo-write.ts 的逻辑：所有 todo completed → plan finished
*
* 推导规则：
* - 无 todo 数据 → undefined（不推导）
* - 所有 todo 都是 completed → 'finished'
* - 对话进行中（isTalking）且存在 in_progress → 'building'
* - 对话未进行（!isTalking，含历史回显和对话终止）且存在 in_progress → 'ready'
* - 其他情况 → undefined（不覆盖已有的 plan status）
*/
function derivePlanStatus(statusMap, isTalking) {
	if (statusMap.size === 0) return;
	const statuses = Array.from(statusMap.values());
	if (statuses.every((s) => s === "completed")) return "finished";
	if (statuses.some((s) => s === "in_progress")) {
		if (isTalking) return "building";
		return "ready";
	}
}
/**
* 更新推导的 plan status，如果有变化则通知订阅者
*/
function updateDerivedPlanStatus(entry) {
	const newStatus = derivePlanStatus(entry.statusMap, entry.isTalking);
	if (newStatus !== entry.derivedPlanStatus) {
		entry.derivedPlanStatus = newStatus;
		notifyPlanStatusSubscribers(entry);
	}
}
var STATUS_WEIGHT, sessionTodoMap, todoStatusStore;
var init_todo_status_store = __esmMin((() => {
	STATUS_WEIGHT = {
		"pending": 1,
		"in_progress": 10,
		"completed": 20,
		"cancelled": 21
	};
	sessionTodoMap = /* @__PURE__ */ new Map();
	todoStatusStore = {
		reportTodos(sessionId, todos) {
			const entry = getOrCreateEntry(sessionId);
			let hasChanges = false;
			for (const todo of todos) {
				const todoId = String(todo.id);
				if (!todoId) continue;
				const currentStatus = entry.statusMap.get(todoId);
				const currentWeight = currentStatus ? STATUS_WEIGHT[currentStatus] ?? 0 : 0;
				if ((STATUS_WEIGHT[todo.status] ?? 0) > currentWeight) {
					entry.statusMap.set(todoId, todo.status);
					hasChanges = true;
				}
			}
			if (hasChanges) {
				notifySubscribers(entry);
				updateDerivedPlanStatus(entry);
			}
			return hasChanges;
		},
		reportTaskData(sessionId, tasks) {
			const entry = getOrCreateEntry(sessionId);
			entry.taskDataList = tasks;
			notifyTaskDataSubscribers(entry);
			this.reportTodos(sessionId, tasks.map((task) => ({
				id: task.id,
				status: task.status
			})));
		},
		getStatusMap(sessionId) {
			return sessionTodoMap.get(sessionId)?.statusMap ?? /* @__PURE__ */ new Map();
		},
		getTaskDataList(sessionId) {
			return sessionTodoMap.get(sessionId)?.taskDataList ?? [];
		},
		getDerivedPlanStatus(sessionId) {
			return sessionTodoMap.get(sessionId)?.derivedPlanStatus;
		},
		notifyChatStopped(sessionId) {
			const entry = sessionTodoMap.get(sessionId);
			if (!entry || !entry.isTalking) return;
			entry.isTalking = false;
			updateDerivedPlanStatus(entry);
		},
		notifyChatStarted(sessionId) {
			const entry = sessionTodoMap.get(sessionId);
			if (!entry || entry.isTalking) return;
			entry.isTalking = true;
			updateDerivedPlanStatus(entry);
		},
		subscribe(sessionId, callback) {
			const entry = getOrCreateEntry(sessionId);
			entry.subscribers.add(callback);
			callback(entry.statusMap);
			return () => {
				entry.subscribers.delete(callback);
			};
		},
		subscribeTaskData(sessionId, callback) {
			const entry = getOrCreateEntry(sessionId);
			entry.taskDataSubscribers.add(callback);
			callback(entry.taskDataList);
			return () => {
				entry.taskDataSubscribers.delete(callback);
			};
		},
		subscribePlanStatus(sessionId, callback) {
			const entry = getOrCreateEntry(sessionId);
			entry.planStatusSubscribers.add(callback);
			callback(entry.derivedPlanStatus);
			return () => {
				entry.planStatusSubscribers.delete(callback);
			};
		},
		cleanup(sessionId) {
			const entry = sessionTodoMap.get(sessionId);
			if (entry) {
				entry.subscribers.clear();
				entry.taskDataSubscribers.clear();
				entry.planStatusSubscribers.clear();
				sessionTodoMap.delete(sessionId);
			}
		},
		reset(sessionId) {
			const entry = sessionTodoMap.get(sessionId);
			if (entry) {
				entry.statusMap.clear();
				entry.taskDataList = [];
				entry.derivedPlanStatus = void 0;
				entry.isTalking = false;
				notifySubscribers(entry);
				notifyTaskDataSubscribers(entry);
				notifyPlanStatusSubscribers(entry);
			}
		}
	};
}));
//#endregion
export { todoStatusStore as n, init_todo_status_store as t };
