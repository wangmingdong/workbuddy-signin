import { n as __esmMin } from "./chunk-BRZcfu7K.js";
import { $i as MutationId, $l as init_es, Md as FeatureAppConfigKey, Nd as featureAppConfigService, Qc as formulaDataSource, Tl as PermissionExplanation, V as MutationSerializer, Xc as CoreAppConfigKey, Xu as domainConfig, i as coreInstantiationService, nd as HostAppType, os as MutationOperationType, qc as coreAppConfigService, rd as hostApp, vl as ISmartSheetCore } from "./execution-result-erkS5q1j.js";
import { t as init_es$1 } from "./es-BQsslXL1.js";
//#region ../../packages/agent-ui/src/modules/smart-sheet/collab/bidirectional-follow.ts
/**
* 对一批 server 变更与本地未确认队列做双向 follow。
*
* @param core         提供 followMutationsMatrix 的 core
* @param serverMatrix server 变更（已反序列化的 Mutation[][]）
* @param localQueue   本地未确认队列（顺序：提交中在前、等待在后）
* @param newRev       追平后的最新版本（写回份 baseRev 用）
*/
function followBidirectional(core, serverMatrix, localQueue, newRev) {
	if (localQueue.length === 0) return {
		applied: serverMatrix.flat(),
		rewrittenQueue: []
	};
	let serverAcc = serverMatrix;
	const rewrittenQueue = [];
	for (const local of localQueue) {
		const localMatrix = deserializeMatrixString(local.changeset);
		const serverBefore = serverAcc;
		const rewritten = core.followMutationsMatrix(serverBefore, localMatrix, false);
		serverAcc = core.followMutationsMatrix(localMatrix, serverBefore, true);
		rewrittenQueue.push({
			subId: local.subId,
			changeset: serializeMatrix(rewritten),
			baseRev: newRev
		});
	}
	return {
		applied: serverAcc.flat(),
		rewrittenQueue
	};
}
/** 反序列化本地 changeset（serializeMutationsMatrix 的 JSON 串）为 Mutation[][]。 */
function deserializeMatrixString(changeset) {
	try {
		return MutationSerializer.deserializeMutationsMatrix(JSON.parse(changeset));
	} catch {
		return [];
	}
}
/** 序列化 Mutation[][] 为 JSON 串。 */
function serializeMatrix(matrix) {
	return JSON.stringify(MutationSerializer.serializeMutationsMatrix(matrix));
}
/** 反序列化「按 rev 分组的序列化 mutation 列表」为 Mutation[]（供 catchup 逐 rev 用）。 */
function deserializeSerializedMutations(serialized) {
	return serialized.filter(Boolean).map((m) => MutationSerializer.deserializeMutation(m));
}
var init_bidirectional_follow = __esmMin((() => {
	init_es$1();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/smart-sheet/collab/catchup-task.ts
var LoadingDeferError, CatchupTask;
var init_catchup_task = __esmMin((() => {
	init_bidirectional_follow();
	LoadingDeferError = class extends Error {
		constructor() {
			super("SMARTSHEET_CATCHUP_LOADING_DEFER");
			this.name = "LoadingDeferError";
		}
	};
	CatchupTask = class CatchupTask {
		constructor(range, options) {
			this.from = range.from;
			this.to = range.to;
			this.projectId = options.projectId;
			this.source = options.source;
			this.deps = options.deps;
		}
		/** 供 TaskQueue 去重与重试计数。 */
		taskIdentify() {
			return `Catchup_${this.source}_${this.from}_${this.to ?? "latest"}`;
		}
		/**
		* 执行追平。失败 throw（由队列 reset 重试）；「加载中」抛 LoadingDeferError（暂缓、不计入上限）。
		*/
		async run() {
			const { deps, projectId } = this;
			const currentRev = deps.getCurrentRev(projectId);
			if (this.to !== void 0 && this.to <= currentRev) return;
			if (this.from <= currentRev) this.from = currentRev + 1;
			if (deps.hasLoadingInProgress()) throw new LoadingDeferError();
			const res = await deps.getChanges(projectId, this.from, this.to);
			if (!res.success) throw new Error(`补拉变更失败: ${res.error ?? "未知错误"}`);
			const changes = (res.changes ?? []).filter((c) => c.newRev >= this.from && c.newRev > currentRev).sort((a, b) => a.newRev - b.newRev);
			let preRev = currentRev;
			for (const change of changes) {
				if (change.newRev !== preRev + 1) throw new Error(`补拉版本断层: newRev=${change.newRev}, 期望=${preRev + 1}`);
				const serverMatrix = [deserializeSerializedMutations(change.serializedMutations)];
				const localQueue = deps.getLocalQueue();
				const { applied, rewrittenQueue } = followBidirectional(deps.followCore, serverMatrix, localQueue, change.newRev);
				deps.applyFollowedMutations(applied);
				if (rewrittenQueue.length > 0) deps.rewriteLocalQueue(rewrittenQueue);
				preRev = change.newRev;
			}
			if (typeof res.baseCalcRev === "number") deps.onBaseCalcRev(projectId, {
				baseCalcRev: res.baseCalcRev,
				docRev: res.docRev
			});
			if (preRev > currentRev) deps.setCurrentRev(projectId, preRev);
		}
		/** 异常终止后返回等价新任务。 */
		reset() {
			return new CatchupTask({
				from: this.from,
				to: this.to
			}, {
				projectId: this.projectId,
				source: this.source,
				deps: this.deps
			});
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/smart-sheet/collab/local-change-queue.ts
var LocalChangeQueue;
var init_local_change_queue = __esmMin((() => {
	LocalChangeQueue = class {
		constructor() {
			this.commiting = [];
			this.waiting = [];
		}
		/** onRequestCommit 产出入等待段。 */
		enqueueWaiting(change) {
			this.waiting.push(change);
		}
		/**
		* 开始提交：waiting → commiting（按对象标识移动）。
		*
		* 当前唯一调用路径是 `CommitCoordinator.commitOne`——它只对刚 peek 出的
		* waiting 队首元素调用本方法，因此正常路径下必然命中 waiting；命中不到即为契约违反
		* （典型：外部误传了非 waiting 段引用），会掩盖真正的 bug，故直接抛错让调用方暴露。
		*/
		moveToCommiting(change) {
			const idx = this.waiting.indexOf(change);
			if (idx < 0) throw new Error("LocalChangeQueue.moveToCommiting: change 不在 waiting 段（调用契约违反）");
			this.waiting.splice(idx, 1);
			if (!this.commiting.includes(change)) this.commiting.push(change);
		}
		/** 提交被 ack：从 commiting 出队。 */
		ackCommiting(change) {
			const idx = this.commiting.indexOf(change);
			if (idx >= 0) this.commiting.splice(idx, 1);
		}
		/** 提交中队列（只读）。 */
		getCommitingQueue() {
			return this.commiting;
		}
		/** 等待队列（只读）。 */
		getWaitingQueue() {
			return this.waiting;
		}
		/** follow 遍历顺序：提交中在前、等待在后。 */
		getAllOrdered() {
			return [...this.commiting, ...this.waiting];
		}
		/**
		* 双向 follow 写回份重写队列。
		*
		* `rewritten` 与 {@link getAllOrdered} 一一对应（同序）；原地更新已有对象的 changeset/baseRev，
		* 保留对象标识，不改变分段与顺序。
		*/
		rewrite(rewritten) {
			const all = [...this.commiting, ...this.waiting];
			for (let i = 0; i < all.length && i < rewritten.length; i++) {
				all[i].changeset = rewritten[i].changeset;
				all[i].baseRev = rewritten[i].baseRev;
			}
		}
		/** 队列是否为空（为空时上层退化为单向应用）。 */
		isEmpty() {
			return this.commiting.length === 0 && this.waiting.length === 0;
		}
		/**
		* 清空整个队列（commiting + waiting），返回被清掉的 LocalChange 快照。
		*
		* 用途：reload 语义——"作废本地未确认改动、接受服务端最新态"。此前 reset
		* 只清 CatchupTask / 版本，本地未提交/提交中的 changeset 却仍留在队列里，
		* reload 完成后一次 submit 会把基于旧 rev、旧 core 数据结构算出来的 mutation
		* 塞回新 core 上尝试提交，导致数据错乱或版本对不上失败。
		*
		* 返回被清掉的条目供调用方打印日志（便于用户在协同冲突后回忆丢失了什么），
		* 调用方仅读快照、不再改写。
		*/
		clear() {
			const dropped = [...this.commiting, ...this.waiting];
			this.commiting = [];
			this.waiting = [];
			return dropped;
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/smart-sheet/collab/task-queue.ts
var DEFAULT_MAX_RETRIES, TaskQueueResetError, DEFAULT_LOADING_DEFER_RETRY_MS, noop, TaskQueue;
var init_task_queue = __esmMin((() => {
	init_catchup_task();
	DEFAULT_MAX_RETRIES = 5;
	TaskQueueResetError = class extends Error {
		constructor() {
			super("task-queue-reset");
			this.name = "TaskQueueResetError";
		}
	};
	DEFAULT_LOADING_DEFER_RETRY_MS = 500;
	noop = () => {};
	TaskQueue = class {
		constructor(options) {
			this.list = [];
			this.running = false;
			this.blocked = false;
			this.retryCount = /* @__PURE__ */ new Map();
			this.deferTimer = null;
			this.maxRetries = options.maxRetries ?? DEFAULT_MAX_RETRIES;
			this.onEscalate = options.onEscalate;
			this.loadingDeferRetryMs = options.loadingDeferRetryMs ?? DEFAULT_LOADING_DEFER_RETRY_MS;
		}
		/** 队列是否已因超限被阻塞。 */
		isBlocked() {
			return this.blocked;
		}
		/** 当前队列长度（含未执行）。 */
		get length() {
			return this.list.length;
		}
		/**
		* 解除阻塞并清空重试计数与队列（reload/刷新后调用）。
		*
		* 关键：pending entries 必须显式 reject，否则等在 {@link enqueue} 返回 Promise 上的调用方
		* （典型：CommitCoordinator.commitOne 在有落后区间时 `await taskQueue.enqueue(...)`）
		* 会永久挂起——commitOne 卡住则 `chain` 永远不 settle，后续所有 `submit` 全部堆积，
		* 提交能力静默死掉。清空前先逐个 reject，唤醒等待方。
		*/
		reset() {
			this.blocked = false;
			this.retryCount.clear();
			if (this.deferTimer) {
				clearTimeout(this.deferTimer);
				this.deferTimer = null;
			}
			const pending = this.list.splice(0, this.list.length);
			for (const entry of pending) entry.reject(new TaskQueueResetError());
		}
		/**
		* 入队并等待任务最终结果。
		* @returns 任务成功 resolve；超重试上限升级则 reject。
		*/
		enqueue(task) {
			if (this.blocked) return Promise.reject(/* @__PURE__ */ new Error("追平队列已阻塞（超重试上限），请刷新后重试"));
			return new Promise((resolve, reject) => {
				this.list.push({
					task,
					resolve,
					reject
				});
				this.drain().catch(() => {});
			});
		}
		/**
		* 即发即弃入队（change-source 轮询触发）。
		* @param toHead true 则插入队头（断层前置补拉用）
		*/
		push(task, toHead = false) {
			if (this.blocked) return;
			const entry = {
				task,
				resolve: noop,
				reject: noop
			};
			if (toHead) this.list.unshift(entry);
			else this.list.push(entry);
			this.drain().catch(() => {});
		}
		/**
		* 安排一次短延时自唤醒 drain（用于加载中暂缓后的兜底触发）。
		*
		* 幂等：已有 pending 定时器时不重复安排；reset 时会清空。定时器 fire 时若队列已空
		* / 已阻塞 / 已由其它路径 drain 走则 no-op。
		*/
		scheduleDeferredDrain() {
			if (this.deferTimer || this.blocked) return;
			this.deferTimer = setTimeout(() => {
				this.deferTimer = null;
				if (this.blocked || this.list.length === 0) return;
				this.drain().catch(() => {});
			}, this.loadingDeferRetryMs);
		}
		/** 串行消费队列，直到清空或被阻塞。 */
		async drain() {
			if (this.running) return;
			this.running = true;
			try {
				while (this.list.length > 0 && !this.blocked) {
					const entry = this.list.shift();
					try {
						await entry.task.run();
						entry.resolve();
					} catch (error) {
						if (error instanceof LoadingDeferError) {
							entry.task = entry.task.reset();
							this.list.push(entry);
							this.scheduleDeferredDrain();
							break;
						}
						const id = entry.task.taskIdentify();
						const next = (this.retryCount.get(id) ?? 0) + 1;
						this.retryCount.set(id, next);
						const err = error instanceof Error ? error : new Error(String(error));
						if (next >= this.maxRetries) {
							this.blocked = true;
							this.onEscalate(err);
							entry.reject(err);
							break;
						}
						entry.task = entry.task.reset();
						this.list.unshift(entry);
					}
				}
			} finally {
				this.running = false;
			}
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/smart-sheet/collab/commit-coordinator.ts
/**
* 生成 changeset 的可读预览（超长则截断，保留原总长信息）。
*
* 内部工具函数，避免各触发点重复写截断逻辑。返回值总是可安全打进
* `console.error/warn` 的字符串（无换行/无控制字符注入风险，因为 changeset
* 本身就是 JSON.stringify 后的产物）。
*/
function previewChangeset(changeset, previewLen) {
	if (changeset.length <= previewLen) return changeset;
	return `${changeset.slice(0, previewLen)}...[TRUNCATED, total ${changeset.length} chars]`;
}
var CHANGESET_PREVIEW_LEN_RESET, CHANGESET_PREVIEW_LEN_COMMIT_ERROR, CommitCoordinator;
var init_commit_coordinator = __esmMin((() => {
	init_catchup_task();
	init_local_change_queue();
	init_task_queue();
	CHANGESET_PREVIEW_LEN_RESET = 1e3;
	CHANGESET_PREVIEW_LEN_COMMIT_ERROR = 4e3;
	CommitCoordinator = class {
		constructor(options) {
			this.queue = new LocalChangeQueue();
			this.chain = Promise.resolve();
			this.host = null;
			this.blocked = false;
			this.reloading = false;
			this.errorCallbacks = [];
			this.projectId = options.projectId;
			this.facade = options.facade;
			this.vm = options.versionManager;
			this.taskQueue = new TaskQueue({
				maxRetries: options.maxRetries,
				onEscalate: (error) => {
					console.error(`[CommitCoordinator] escalate: catchup task exceeded retry limit for project ${this.projectId}:`, error.message, error);
					this.fail(error.message);
				}
			});
		}
		/** core ready 后注入宿主能力。 */
		attachHost(host) {
			this.host = host;
		}
		/** core 热重建前解绑宿主（保留队列/错误回调）。 */
		detachHost() {
			this.host = null;
		}
		/**
		* 注册提交/追平错误回调（失败/超限时告警，供 UI 提示刷新 + 阻塞）。
		*
		* 返回 unsubscribe 函数——UI 层在组件挂载时注册、卸载 effect cleanup 里调用
		* 以摘除回调，避免回调常驻 service 生命周期。早期无 unsubscribe 时曾出现
		* "退出详情页仍弹页面数据过期提示"的问题（回调挂在 service 上继续被短轮询
		* 追平失败触发）。
		*
		* 注意：返回的 unsubscribe 只按引用移除该 callback，不影响其它已注册回调。
		* 幂等——同一回调重复 unsubscribe 只在第一次生效。
		*/
		onCommitError(callback) {
			this.errorCallbacks.push(callback);
			let removed = false;
			return () => {
				if (removed) return;
				removed = true;
				const idx = this.errorCallbacks.indexOf(callback);
				if (idx >= 0) this.errorCallbacks.splice(idx, 1);
			};
		}
		/**
		* 销毁 coordinator：清空错误回调 + 阻塞 + 队列 + 版本状态。
		*
		* 与 {@link reset} 的区别：
		* - `reset` 用于 reload 期间"恢复到可继续工作"的状态——保留 errorCallbacks
		*   （UI 层订阅在 board 生命周期上，不该被 reload 清掉）。
		* - `dispose` 用于**服务实例销毁**（切项目 / 退详情页 disposeSmartsheetService）——
		*   一并清空 errorCallbacks 避免僵尸引用（回调闭包持有 message toast / service
		*   引用等，长时间不清会阻碍 GC，且再次挂载相同 service 时会重复触发旧闭包）。
		*
		* 幂等：重复调用 no-op。
		*/
		dispose() {
			this.errorCallbacks.length = 0;
			this.reset();
			this.host = null;
		}
		/** 是否已阻塞。 */
		isBlocked() {
			return this.blocked;
		}
		/**
		* 提交入口：把新 changeset 入等待队列，并串行触发处理。
		*/
		submit(items) {
			if (items.length === 0) return;
			const baseRev = this.vm.getCurrentRev(this.projectId);
			for (const item of items) this.queue.enqueueWaiting({
				subId: item.subId,
				changeset: item.changeset,
				baseRev
			});
			this.chain = this.chain.then(() => this.processWaiting()).catch(() => {});
		}
		/** 变更来源（轮询/推送）触发追平：入同一串行队列（不阻塞、即发即弃）。 */
		triggerCatchup(hint = {}) {
			if (this.blocked || this.reloading || !this.host) return;
			const from = hint.fromRev ?? this.vm.getCurrentRev(this.projectId) + 1;
			this.taskQueue.push(new CatchupTask({
				from,
				to: hint.toRev
			}, {
				projectId: this.projectId,
				source: "change-source",
				deps: this.buildDeps()
			}));
		}
		/**
		* 主动补拉并**等待**追平完成（与 {@link triggerCatchup} 走同一 CatchupTask/串行队列，
		* 差别只是用 `enqueue` 返回 Promise 而非 `push` 即发即弃）。
		*
		* 使用场景：某些"刚落库需要立刻在本地表可见"的路径（如云端 handoff 后立即绑附件），
		* 无法等短轮询周期。core/host 未就绪或已阻塞时直接 resolve（与 triggerCatchup 语义一致）。
		*/
		async awaitCatchup(hint = {}) {
			if (this.blocked || this.reloading || !this.host) return;
			const from = hint.fromRev ?? this.vm.getCurrentRev(this.projectId) + 1;
			try {
				await this.taskQueue.enqueue(new CatchupTask({
					from,
					to: hint.toRev
				}, {
					projectId: this.projectId,
					source: "change-source",
					deps: this.buildDeps()
				}));
			} catch (err) {
				if (err instanceof TaskQueueResetError) return;
				throw err;
			}
		}
		/**
		* reload/刷新：解除阻塞、清本地未确认队列 + CatchupTask 队列 + 版本状态。
		*
		* 清 `LocalChangeQueue` 的动机：reload 语义就是"作废本地未确认改动、以服务端
		* 最新态为准"。此前 reset 只清 CatchupTask 队列与版本，本地未提交/提交中的
		* changeset 却仍留在 `LocalChangeQueue` 里——reload 完成后一次 submit 会把基于
		* 旧 rev、旧 core 数据结构算出来的 mutation 塞回新 core 尝试提交，导致数据错乱
		* 或版本对不上失败。
		*
		* 被清的条目会打印到 `console.warn`（含 subId / baseRev / changeset 长度 +
		* 前 {@link CHANGESET_PREVIEW_LEN_RESET} 字符预览），便于协同冲突后排查用户
		* 丢失了什么改动、必要时手动复原。若需复原全量数据，请**在触发 reload 前先
		* breakpoint**——运行时日志只做尽力而为的排查线索，不保证信息完整。
		*/
		reset() {
			this.blocked = false;
			this.chain = Promise.resolve();
			this.taskQueue.reset();
			const dropped = this.queue.clear();
			if (dropped.length > 0) console.warn(`[CommitCoordinator] reset dropped ${dropped.length} local change(s) for project ${this.projectId}:`, dropped.map((c) => ({
				subId: c.subId,
				baseRev: c.baseRev,
				changesetLen: c.changeset.length,
				changesetPreview: previewChangeset(c.changeset, CHANGESET_PREVIEW_LEN_RESET)
			})));
			this.vm.reset(this.projectId);
		}
		/**
		* 进入 reload/热重建窗口：挂起变更来源触发的追平（见 {@link reloading} 字段说明与 #65622）。
		* 由宿主 core 在 doReload 开始时调用，须与 {@link endReload} 成对（core 侧用 try/finally 保证）。
		*/
		beginReload() {
			this.reloading = true;
		}
		/** 退出 reload/热重建窗口：恢复变更来源触发的追平。 */
		endReload() {
			this.reloading = false;
		}
		/** 顺序处理等待队列（加载中暂缓：保留队列、等下次触发）。 */
		async processWaiting() {
			if (this.blocked) return;
			if (this.host?.hasLoadingInProgress()) return;
			while (this.queue.getWaitingQueue().length > 0 && !this.blocked) {
				const change = this.queue.getWaitingQueue()[0];
				if (!await this.commitOne(change)) break;
			}
		}
		/** 提交单个 changeset 并处理追平。 */
		async commitOne(change) {
			const { projectId } = this;
			const currentRev = this.vm.getCurrentRev(projectId);
			this.queue.moveToCommiting(change);
			let result;
			try {
				result = await this.facade.smartsheetCommitChanges(projectId, change.subId, change.changeset, currentRev);
			} catch (err) {
				console.error(`[CommitCoordinator] commit failed (HTTP throw) for project ${projectId}:`, {
					subId: change.subId,
					baseRev: change.baseRev,
					currentRev,
					changesetLen: change.changeset.length,
					changesetPreview: previewChangeset(change.changeset, CHANGESET_PREVIEW_LEN_COMMIT_ERROR)
				}, err);
				this.fail(err instanceof Error ? err.message : String(err));
				return false;
			}
			if (!result.success) {
				console.error(`[CommitCoordinator] commit rejected by server for project ${projectId}:`, {
					subId: change.subId,
					baseRev: change.baseRev,
					currentRev,
					changesetLen: change.changeset.length,
					changesetPreview: previewChangeset(change.changeset, CHANGESET_PREVIEW_LEN_COMMIT_ERROR),
					serverError: result.error
				});
				this.fail(result.error ?? "提交失败");
				return false;
			}
			const newRev = result.rev;
			if (typeof newRev !== "number") {
				this.queue.ackCommiting(change);
				return true;
			}
			if (newRev <= currentRev) {
				this.queue.ackCommiting(change);
				return true;
			}
			if (newRev === currentRev + 1) {
				this.queue.ackCommiting(change);
				this.vm.setCurrentRev(projectId, newRev);
				return true;
			}
			try {
				await this.taskQueue.enqueue(new CatchupTask({
					from: currentRev + 1,
					to: newRev - 1
				}, {
					projectId,
					source: "commit-accept",
					deps: this.buildDeps()
				}));
			} catch (err) {
				if (err instanceof TaskQueueResetError) return false;
				console.error(`[CommitCoordinator] commit-accept catchup failed for project ${projectId}:`, {
					subId: change.subId,
					baseRev: change.baseRev,
					currentRev,
					newRev,
					catchupRange: {
						from: currentRev + 1,
						to: newRev - 1
					},
					changesetLen: change.changeset.length,
					changesetPreview: previewChangeset(change.changeset, CHANGESET_PREVIEW_LEN_COMMIT_ERROR)
				}, err);
				this.fail(err instanceof Error ? err.message : String(err));
				return false;
			}
			this.queue.ackCommiting(change);
			this.vm.setCurrentRev(projectId, newRev);
			return true;
		}
		/** 构造 CatchupTask 依赖（引用当前 host，追平时 host 必已就绪）。 */
		buildDeps() {
			const { vm, queue } = this;
			return {
				getChanges: (pid, from, to) => this.facade.smartsheetGetChanges(pid, from, to),
				getCurrentRev: (pid) => vm.getCurrentRev(pid),
				setCurrentRev: (pid, rev) => vm.setCurrentRev(pid, rev),
				onBaseCalcRev: (pid, event) => vm.onBaseCalcRev(pid, event),
				followCore: { followMutationsMatrix: (a, b, isAAfterB) => this.requireHost().followMutationsMatrix(a, b, isAAfterB) },
				applyFollowedMutations: (mutations) => this.requireHost().applyFollowedMutations(mutations),
				getLocalQueue: () => queue.getAllOrdered(),
				rewriteLocalQueue: (rewritten) => queue.rewrite(rewritten),
				hasLoadingInProgress: () => this.requireHost().hasLoadingInProgress()
			};
		}
		requireHost() {
			if (!this.host) throw new Error("协同追平失败：core 尚未就绪");
			return this.host;
		}
		/**
		* 进入失败态：阻塞后续 + 告警（UI 提示刷新 + 阻塞编辑与提交）。
		*
		* 每个上游触发点（HTTP throw / 后端拒收 / 追平升级 / commit-accept 补拉失败）
		* **自身已经打过详细 error 日志**（含 subId/baseRev/changeset 预览等复现数据），
		* 这里只补一条汇总，作为"进入失败态"的统一时间戳，便于按时间序对齐上游详细日志、
		* 也能在未来新增触发点忘记打日志时作为兜底。
		*/
		fail(reason) {
			this.blocked = true;
			console.error(`[CommitCoordinator] entered failed state for project ${this.projectId}, reason:`, reason, `pendingCallbacks=${this.errorCallbacks.length}, localQueueSize=${this.queue.getAllOrdered().length}`);
			const error = new Error(reason);
			for (const cb of this.errorCallbacks) try {
				cb(error, []);
			} catch (cbErr) {
				console.error("[CommitCoordinator] errorCallback threw during fail():", cbErr);
			}
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/smart-sheet/collab/smartsheet-collab.ts
var SmartsheetCollab;
var init_smartsheet_collab = __esmMin((() => {
	init_commit_coordinator();
	SmartsheetCollab = class {
		constructor(options) {
			this.changeSource = null;
			this.changeSub = null;
			this.coordinator = new CommitCoordinator({
				projectId: options.projectId,
				facade: options.facade,
				versionManager: options.versionManager,
				maxRetries: options.maxRetries
			});
		}
		/** core ready 后注入宿主能力。 */
		attachHost(host) {
			this.coordinator.attachHost(host);
		}
		/** core 热重建前解绑宿主（保留队列/错误回调）。 */
		detachHost() {
			this.coordinator.detachHost();
		}
		/** 提交本地 changeset（由 CommitHandler 在 onRequestCommit 后调用）。 */
		submit(items) {
			this.coordinator.submit(items);
		}
		/**
		* 主动补拉并等待追平完成（走同一串行队列 + CatchupTask 管线）。
		*
		* 供上层业务在"刚落库需要立刻在本地表可见"的场景中调用（无法等 30s 短轮询周期）。
		*/
		awaitCatchup(hint) {
			return this.coordinator.awaitCatchup(hint);
		}
		/**
		* 注册提交/追平错误回调（失败/超限时告警）。
		*
		* 返回 unsubscribe 函数：UI 层组件卸载时应调用它摘除回调，避免回调常驻在
		* 长生命周期的 service 上——见 CommitCoordinator.onCommitError 注释。
		*/
		onCommitError(callback) {
			return this.coordinator.onCommitError(callback);
		}
		/** 是否已阻塞（超限/失败）。 */
		isBlocked() {
			return this.coordinator.isBlocked();
		}
		/**
		* 装配变更来源：订阅其「有新变更」事件 → 触发追平（共用同一串行队列）。
		* 切换来源只需换入不同 {@link IChangeSource} 实现，下游追平/ follow/应用管线不变。
		*/
		startChangeSource(source) {
			this.stopChangeSource();
			this.changeSource = source;
			this.changeSub = source.onChangesAvailable((hint) => this.coordinator.triggerCatchup(hint));
			source.start();
		}
		/** 停止并解绑变更来源。 */
		stopChangeSource() {
			this.changeSub?.dispose();
			this.changeSub = null;
			this.changeSource?.stop();
			this.changeSource = null;
		}
		/** 页面可见性/网络态变化（退避）。 */
		setActive(active) {
			this.changeSource?.setActive(active);
		}
		/** reload/刷新：解除阻塞、清队列与版本状态（变更来源生命周期由调用方管理）。 */
		reset() {
			this.coordinator.reset();
		}
		/**
		* 进入 reload/热重建窗口：挂起短轮询等变更来源触发的追平，避免重建过渡态下版本错位误报。
		* 与 {@link endReload} 成对，由宿主 core 在 doReload 首尾调用。见 #65622。
		*/
		beginReload() {
			this.coordinator.beginReload();
		}
		/** 退出 reload/热重建窗口：恢复变更来源触发的追平。 */
		endReload() {
			this.coordinator.endReload();
		}
		/**
		* 释放：停止变更来源 + 销毁 coordinator（清空 errorCallbacks / 阻塞态 / 队列 /
		* 版本状态 / 解绑宿主）。
		*
		* 由 `SmartsheetService.dispose` → `SmartsheetProject.dispose` 级联触发。
		* 与仅解绑 host 的旧行为相比，`coordinator.dispose` 会同时清空 errorCallbacks，
		* 避免退详情页 dispose service 后回调仍挂在 coordinator 上被误触发。
		*/
		dispose() {
			this.stopChangeSource();
			this.coordinator.dispose();
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/smart-sheet/collab/version-manager.ts
var VersionManager;
var init_version_manager = __esmMin((() => {
	VersionManager = class {
		constructor() {
			this.revMap = /* @__PURE__ */ new Map();
			this.revInitialized = /* @__PURE__ */ new Set();
			this.baseCalcMap = /* @__PURE__ */ new Map();
		}
		/** 获取指定 projectId 的当前 rev（未初始化回落 0）。 */
		getCurrentRev(projectId) {
			return this.revMap.get(projectId) ?? 0;
		}
		/** 推进版本：仅当 newRev 大于当前版本时写入（单调不减）。 */
		setCurrentRev(projectId, newRev) {
			if (typeof newRev !== "number") return;
			if (newRev > this.getCurrentRev(projectId)) this.revMap.set(projectId, newRev);
		}
		/**
		* 由首个加载子表的首片确立项目 rev。
		*
		* 仅在尚未确立过时写入；已确立则忽略——保证 rev 只由「首个加载子表的首片」这一唯一来源确定。
		*/
		initRevFromHead(projectId, rev) {
			if (this.revInitialized.has(projectId)) return;
			this.revInitialized.add(projectId);
			this.revMap.set(projectId, rev);
		}
		/** 项目 rev 是否已确立。 */
		isInitialized(projectId) {
			return this.revInitialized.has(projectId);
		}
		/**
		* 重置指定项目的版本状态（reload/刷新用）：使下一次首片重新拉取最新版本并重新确立。
		*/
		reset(projectId) {
			this.revInitialized.delete(projectId);
			this.revMap.delete(projectId);
			this.baseCalcMap.delete(projectId);
		}
		/** 写入补拉响应携带的 baseCalcRev / docRev。 */
		onBaseCalcRev(projectId, event) {
			this.baseCalcMap.set(projectId, {
				baseCalcRev: event.baseCalcRev,
				docRev: event.docRev
			});
		}
		/** 获取 baseCalcRev / docRev（未写入时为 undefined）。 */
		getBaseCalcRev(projectId) {
			return this.baseCalcMap.get(projectId);
		}
		/** 已确立 → 返回当前 rev；未确立 → undefined（走 need_latest 拉最新）。 */
		getAnchorRev(projectId) {
			return this.isInitialized(projectId) ? this.getCurrentRev(projectId) : void 0;
		}
		/** data-center 首片上报 rev（首源为准）。 */
		reportHeadRev(projectId, rev) {
			this.initRevFromHead(projectId, rev);
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/smart-sheet/collab/change-source/long-poll-source.ts
var LongPollSource;
var init_long_poll_source = __esmMin((() => {
	init_change_source();
	LongPollSource = class {
		constructor(deps) {
			this.emitter = new Emitter();
			this.active = true;
			this.started = false;
			this.abort = { aborted: false };
			this.deps = deps;
		}
		start() {
			if (this.started) return;
			this.started = true;
			this.abort = { aborted: false };
			this.loop().catch(() => {});
		}
		stop() {
			this.started = false;
			this.abort.aborted = true;
		}
		onChangesAvailable(listener) {
			return this.emitter.subscribe(listener);
		}
		setActive(active) {
			this.active = active;
		}
		/** 长轮询主循环：hold-request 返回有变更即 fire，随后续期。 */
		async loop() {
			while (this.started && !this.abort.aborted) {
				if (!this.active || !this.deps.poll) return;
				try {
					const hint = await this.deps.poll(this.abort);
					if (!this.started || this.abort.aborted) return;
					if (hint) this.emitter.fire(hint);
				} catch {
					return;
				}
			}
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/smart-sheet/collab/change-source/push-source.ts
var PushSource;
var init_push_source = __esmMin((() => {
	init_change_source();
	PushSource = class {
		constructor(_deps) {
			this.emitter = new Emitter();
			this.active = true;
			this.started = false;
		}
		start() {
			this.started = true;
		}
		stop() {
			this.started = false;
		}
		onChangesAvailable(listener) {
			return this.emitter.subscribe(listener);
		}
		setActive(active) {
			this.active = active;
		}
		/** 宿主收到推送后灌入（骨架入口；未来由真实推送通道内部调用）。 */
		notify(hint) {
			if (this.started && this.active) this.emitter.fire(hint);
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/smart-sheet/collab/change-source/short-poll-source.ts
var DEFAULT_INTERVAL_MS, ShortPollSource;
var init_short_poll_source = __esmMin((() => {
	init_change_source();
	DEFAULT_INTERVAL_MS = 3e4;
	ShortPollSource = class {
		constructor(deps) {
			this.emitter = new Emitter();
			this.cancelTimer = null;
			this.active = true;
			this.started = false;
			this.deps = deps;
			this.intervalMs = deps.intervalMs ?? DEFAULT_INTERVAL_MS;
		}
		start() {
			if (this.started) return;
			this.started = true;
			this.schedule();
		}
		stop() {
			this.started = false;
			this.cancelTimer?.();
			this.cancelTimer = null;
		}
		onChangesAvailable(listener) {
			return this.emitter.subscribe(listener);
		}
		setActive(active) {
			this.active = active;
		}
		/** 周期调度：到点且 active 才 fire，然后重排下一周期。 */
		schedule() {
			this.cancelTimer = this.deps.scheduleTimer(() => {
				if (!this.started) return;
				if (this.active) this.emitter.fire({});
				this.schedule();
			}, this.intervalMs);
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/smart-sheet/collab/change-source/change-source.ts
/**
* 变更来源工厂：按 mode 装配对应实现。切换只改此处入参与注入，下游不感知。
*/
function createChangeSource(mode, deps) {
	switch (mode) {
		case "long-poll": return new LongPollSource(deps);
		case "push": return new PushSource(deps);
		default: return new ShortPollSource(deps);
	}
}
var Emitter;
var init_change_source = __esmMin((() => {
	init_long_poll_source();
	init_push_source();
	init_short_poll_source();
	Emitter = class {
		constructor() {
			this.listeners = /* @__PURE__ */ new Set();
		}
		subscribe(listener) {
			this.listeners.add(listener);
			return { dispose: () => this.listeners.delete(listener) };
		}
		fire(value) {
			for (const listener of [...this.listeners]) try {
				listener(value);
			} catch {}
		}
		dispose() {
			this.listeners.clear();
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/smart-sheet/collab/index.ts
var init_collab = __esmMin((() => {
	init_smartsheet_collab();
	init_version_manager();
	init_local_change_queue();
	init_commit_coordinator();
	init_bidirectional_follow();
	init_catchup_task();
	init_task_queue();
	init_change_source();
	init_short_poll_source();
	init_long_poll_source();
	init_push_source();
}));
//#endregion
//#region ../../node_modules/@tencent/undo-redo-stack/lib/index.esm.js
function n(o, t) {
	if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
	function n() {
		this.constructor = o;
	}
	e(o, t), o.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n());
}
function i(o) {
	var t = "function" == typeof Symbol && Symbol.iterator, e = t && o[t], n = 0;
	if (e) return e.call(o);
	if (o && "number" == typeof o.length) return { next: function() {
		return o && n >= o.length && (o = void 0), {
			value: o && o[n++],
			done: !o
		};
	} };
	throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function a(o, t) {
	var e = "function" == typeof Symbol && o[Symbol.iterator];
	if (!e) return o;
	var n, r, i = e.call(o), a = [];
	try {
		for (; (void 0 === t || t-- > 0) && !(n = i.next()).done;) a.push(n.value);
	} catch (o) {
		r = { error: o };
	} finally {
		try {
			n && !n.done && (e = i.return) && e.call(i);
		} finally {
			if (r) throw r.error;
		}
	}
	return a;
}
function d(o, t, e) {
	if (e || 2 === arguments.length) for (var n, r = 0, i = t.length; r < i; r++) !n && r in t || (n || (n = Array.prototype.slice.call(t, 0, r)), n[r] = t[r]);
	return o.concat(n || t);
}
var o, t, e, r, c, u, s, l, p;
var init_index_esm = __esmMin((() => {
	o = function() {
		function o(o) {
			this.redoCommand = o.redoCommand, this.undoCommand = o.undoCommand, this.executeCommand = o.executeCommand;
		}
		return o.prototype.reverse = function() {
			var t = this.undoCommand;
			return new o({
				undoCommand: this.redoCommand,
				redoCommand: t,
				executeCommand: this.executeCommand
			});
		}, o.prototype.execute = function() {
			this.executeCommand(this.undoCommand);
		}, o;
	}(), t = function() {
		function o() {
			this.undoStack = [], this.redoStack = [], this.maxStackSize = Infinity;
		}
		return o.prototype.canUndo = function() {
			return !!this.undoStack.length;
		}, o.prototype.canRedo = function() {
			return !!this.redoStack.length;
		}, o.prototype.undo = function() {
			if (!this.canUndo()) return [];
			var o = this.undoStack.shift();
			o.execute();
			var t = o.reverse();
			return this.redoStack.unshift(t), [o];
		}, o.prototype.redo = function() {
			if (!this.canRedo()) return [];
			var o = this.redoStack.shift();
			o.execute();
			var t = o.reverse();
			return this.undoStack.unshift(t), [o];
		}, o.prototype.push = function(o) {
			this.clearRedoStack(), this.undoStack.unshift(o), this.undoStack.length > this.maxStackSize && this.undoStack.pop();
		}, o.prototype.setMaxStackSize = function(o) {
			o <= 0 || (this.maxStackSize = o);
		}, o.prototype.destroy = function() {
			this.clearUndoStack(), this.clearRedoStack();
		}, o.prototype.clearUndoStack = function() {
			this.undoStack.length = 0;
		}, o.prototype.clearRedoStack = function() {
			this.redoStack.length = 0;
		}, o;
	}(), e = function(o, t) {
		return (e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(o, t) {
			o.__proto__ = t;
		} || function(o, t) {
			for (var e in t) Object.prototype.hasOwnProperty.call(t, e) && (o[e] = t[e]);
		})(o, t);
	};
	r = function() {
		return (r = Object.assign || function(o) {
			for (var t, e = 1, n = arguments.length; e < n; e++) for (var r in t = arguments[e]) Object.prototype.hasOwnProperty.call(t, r) && (o[r] = t[r]);
			return o;
		}).apply(this, arguments);
	};
	u = function(o) {
		function t(t) {
			var e, n, r = o.call(this, t) || this;
			return r.canUndoRedo = null !== (e = t.canUndoRedo) && void 0 !== e && e, r.isSameOperationWithPreviousItem = null !== (n = t.isSameOperationWithPreviousItem) && void 0 !== n && n, r;
		}
		return n(t, o), t.prototype.reverse = function() {
			var o = this.undoCommand;
			return new t({
				undoCommand: this.redoCommand,
				redoCommand: o,
				executeCommand: this.executeCommand,
				canUndoRedo: this.canUndoRedo,
				isSameOperationWithPreviousItem: !1
			});
		}, t.prototype.setIsSameOperationWithPreviousItem = function(o) {
			this.isSameOperationWithPreviousItem = o;
		}, t.prototype.execute = function(o) {
			void 0 === o && (o = !1);
			var t = this.executeCommand(this.undoCommand, o, this.redoCommand);
			o && (this.redoCommand = t);
		}, t;
	}(o), s = function(o) {
		function t() {
			var t = o.call(this) || this;
			return t.maxCanUndoSize = Infinity, t.canUndoSize = 0, t;
		}
		return n(t, o), t.prototype.undo = function(o) {
			return void 0 === o && (o = {
				needUnshiftStack: function() {
					return !0;
				},
				beforeUndo: function() {
					return {
						isContinue: !0,
						canUndoRedo: !0
					};
				}
			}), this.undoSameOperationItem(r(r({}, o), { isSameOperationWithFollowingItem: !1 }));
		}, t.prototype.redo = function(o) {
			return void 0 === o && (o = {
				needUnshiftStack: function() {
					return !0;
				},
				beforeRedo: function() {
					return {
						isContinue: !0,
						canUndoRedo: !0
					};
				}
			}), this.redoSameOperationItem(r(r({}, o), { isSameOperationWithFollowingItem: !1 }));
		}, t.prototype.undoSameOperationItem = function(o) {
			var t, e, n = o.needUnshiftStack, r = o.beforeUndo, i = o.isSameOperationWithFollowingItem, c = this.getTopLocalItemIndex(this.undoStack);
			if (c < 0) return null === (t = globalThis.log) || void 0 === t || t.info("undo stack is empty"), i && (null === (e = globalThis.log) || void 0 === e || e.info("can not found previous item")), [];
			var u = this.undoStack[c], s = c >= 1;
			s && (u = this.transform(u, {
				stack: this.undoStack,
				collaboratePointer: c - 1
			}));
			var l = r(u), p = l.isContinue, h = l.canUndoRedo;
			if (!p) return h || (u.canUndoRedo = h, c === this.undoStack.length - 1 && this.clearUndoStack()), [];
			this.undoStack.splice(c, 1), this.canUndoSize -= 1, c === this.undoStack.length && this.clearUndoStack(), u.execute(s);
			var m = n(u);
			if (m) {
				var f = u.reverse();
				i && f.setIsSameOperationWithPreviousItem(!0), this.redoStack.unshift(f);
			}
			return u.isSameOperationWithPreviousItem ? d([u], a(this.undoSameOperationItem({
				needUnshiftStack: function() {
					return m;
				},
				beforeUndo: function() {
					return {
						isContinue: !0,
						canUndoRedo: !0
					};
				},
				isSameOperationWithFollowingItem: !0
			}))) : [u];
		}, t.prototype.redoSameOperationItem = function(o) {
			var t, e, n = o.needUnshiftStack, r = o.beforeRedo, i = o.isSameOperationWithFollowingItem, c = this.getTopLocalItemIndex(this.redoStack);
			if (c < 0) return null === (t = globalThis.log) || void 0 === t || t.info("redo stack is empty"), i && (null === (e = globalThis.log) || void 0 === e || e.info("can not found previous item")), [];
			var u = this.redoStack[c], s = c >= 1;
			s && (u = this.transform(u, {
				stack: this.redoStack,
				collaboratePointer: c - 1
			}));
			var l = r(u), p = l.isContinue, h = l.canUndoRedo;
			if (!p) return h || (u.canUndoRedo = h, c === this.redoStack.length - 1 && this.clearRedoStack()), [];
			this.redoStack.splice(c, 1), this.canUndoSize += 1, c === this.redoStack.length && this.clearRedoStack(), u.execute(s);
			var m = n(u);
			if (m) {
				var f = u.reverse();
				i && f.setIsSameOperationWithPreviousItem(!0), this.undoStack.unshift(f);
			}
			return u.isSameOperationWithPreviousItem ? d([u], a(this.redoSameOperationItem({
				needUnshiftStack: function() {
					return m;
				},
				beforeRedo: function() {
					return {
						isContinue: !0,
						canUndoRedo: !0
					};
				},
				isSameOperationWithFollowingItem: !0
			}))) : [u];
		}, t.prototype.push = function(o) {
			if (o) if (o.canUndoRedo) {
				if (this.clearRedoStack(), this.undoStack.unshift(o), this.canUndoSize += 1, this.canUndoSize <= this.maxCanUndoSize) return;
				for (var t = this.undoStack.length - 1, e = 0;; t--) {
					if (this.undoStack[t].canUndoRedo && 2 === (e += 1)) {
						this.canUndoSize -= 1;
						break;
					}
					this.undoStack.pop();
				}
			} else this.undoStack.length > 0 && this.undoStack.unshift(r(r({}, o), {
				redoCommand: r(r({}, o.redoCommand), { mutations: d([], a(o.redoCommand.mutations)) }),
				undoCommand: r(r({}, o.undoCommand), { mutations: d([], a(o.undoCommand.mutations)) })
			})), this.redoStack.length > 0 && this.redoStack.unshift(r(r({}, o), {
				redoCommand: r(r({}, o.redoCommand), { mutations: d([], a(o.redoCommand.mutations)) }),
				undoCommand: r(r({}, o.undoCommand), { mutations: d([], a(o.undoCommand.mutations)) })
			}));
		}, t.prototype.setMaxCanUndoSize = function(o) {
			o <= 0 || (this.maxCanUndoSize = o);
		}, t.prototype.destroy = function() {
			o.prototype.destroy.call(this), this.canUndoSize = 0;
		}, t.prototype.getUndoTopLocalItem = function() {
			var o, t = this.getTopLocalItemIndex(this.undoStack);
			if (!(t < 0)) return this.undoStack[t];
			null === (o = globalThis.log) || void 0 === o || o.info("undo stack is empty");
		}, t.prototype.getTopLocalItemIndex = function(o) {
			for (var t = 0; t < o.length; t++) if (o[t].canUndoRedo) return t;
			return -1;
		}, t.prototype.transform = function(o, t) {
			for (var e = t.stack, n = t.collaboratePointer; n >= 0;) {
				var r = e[n];
				if (this.canIgnoreFollow(o, r)) n -= 1;
				else {
					var i = this.follow(o.undoCommand, r.redoCommand, !0, {
						itemA: r,
						itemB: o
					}), a = this.follow(r.redoCommand, o.undoCommand, !1, {
						itemA: r,
						itemB: o
					});
					o.undoCommand = i, r.redoCommand = a, n -= 1;
				}
			}
			return o;
		}, t;
	}(t);
	(function(o) {
		o[o.Default = 0] = "Default", o[o.Temporary = 1] = "Temporary", o[o.LocalPersist = 2] = "LocalPersist";
	})(c || (c = {}));
	l = function(o) {
		function t(t) {
			var e, n = o.call(this, t) || this;
			return n.docType = t.docType, n.operationKey = t.operationKey || "", n.operationMode = null !== (e = t.operationMode) && void 0 !== e ? e : c.Default, n;
		}
		return n(t, o), t.prototype.reverse = function() {
			var o = this.undoCommand;
			return new t({
				undoCommand: this.redoCommand,
				redoCommand: o,
				executeCommand: this.executeCommand,
				canUndoRedo: this.canUndoRedo,
				docType: this.docType,
				operationKey: this.operationKey,
				operationMode: this.operationMode
			});
		}, t;
	}(u), p = function(o) {
		function t() {
			var t = null !== o && o.apply(this, arguments) || this;
			return t.docTypeDependencyMap = /* @__PURE__ */ new Map(), t.onUndoRedoStackChangeFunctionMap = [], t;
		}
		return n(t, o), t.prototype.undo = function(t) {
			var e = this, n = o.prototype.undo.call(this, {
				needUnshiftStack: function(o) {
					return o.operationMode !== c.Temporary && !!o.redoCommand.mutations.length;
				},
				beforeUndo: function(o) {
					var t, n, r = e.getDocTypeDependency(o.docType);
					return null !== (n = null === (t = null == r ? void 0 : r.beforeUndo) || void 0 === t ? void 0 : t.call(r, o)) && void 0 !== n ? n : {
						isContinue: !0,
						canUndoRedo: !0
					};
				}
			});
			return 0 === n.length || (n.forEach((function(o) {
				var n, i = t ? r({}, t) : {};
				o.operationMode !== c.LocalPersist && o.operationMode !== c.Temporary || (i.ignoreCommit = !0);
				var a = e.getDocTypeDependency(o.docType);
				null === (n = null == a ? void 0 : a.afterUndo) || void 0 === n || n.call(a, o, i);
			})), this.onUndoRedoStackChangeFunctionMap.forEach((function(o) {
				return null == o ? void 0 : o();
			}))), n;
		}, t.prototype.redo = function(t) {
			var e = this, n = o.prototype.redo.call(this, {
				needUnshiftStack: function(o) {
					return o.operationMode !== c.Temporary && !!o.redoCommand.mutations.length;
				},
				beforeRedo: function(o) {
					var t, n, r = e.getDocTypeDependency(o.docType);
					return null !== (n = null === (t = null == r ? void 0 : r.beforeRedo) || void 0 === t ? void 0 : t.call(r, o)) && void 0 !== n ? n : {
						isContinue: !0,
						canUndoRedo: !0
					};
				}
			});
			return 0 === n.length || (n.forEach((function(o) {
				var n, i = t ? r({}, t) : {};
				o.operationMode !== c.LocalPersist && o.operationMode !== c.Temporary || (i.ignoreCommit = !0);
				var a = e.getDocTypeDependency(o.docType);
				null === (n = null == a ? void 0 : a.afterRedo) || void 0 === n || n.call(a, o, i);
			})), this.onUndoRedoStackChangeFunctionMap.forEach((function(o) {
				return null == o ? void 0 : o();
			}))), n;
		}, t.prototype.undoAllAfterOperationKey = function(o, t) {
			var e, n, r = this.getLocalItemWithOperationKeyIndex(this.undoStack, o);
			if (-1 === r) return [];
			for (var c = [];;) {
				var u = this.undo(t);
				if (0 === u.length) break;
				c.push.apply(c, d([], a(u)));
				try {
					for (var s = (e = void 0, i(u)), l = s.next(); !l.done; l = s.next()) if (l.value.operationKey === o) break;
				} catch (o) {
					e = { error: o };
				} finally {
					try {
						l && !l.done && (n = s.return) && n.call(s);
					} finally {
						if (e) throw e.error;
					}
				}
				if ((r -= u.length) <= 0) break;
			}
			return c;
		}, t.prototype.undoTemporary = function(o) {
			var t, e = this.getLocalItemWithOperationKeyIndex(this.undoStack, o);
			if (-1 === e) return [];
			if (this.undoStack[e].operationMode !== c.Temporary) return [];
			var n = this.undoStack.splice(e, 1)[0], r = e >= 0;
			r && (n = this.transform(n, {
				stack: this.undoStack,
				collaboratePointer: e - 1
			})), n.execute(r);
			var i = this.getDocTypeDependency(n.docType);
			return null === (t = null == i ? void 0 : i.afterUndo) || void 0 === t || t.call(i, n, { ignoreCommit: !0 }), this.onUndoRedoStackChangeFunctionMap.forEach((function(o) {
				return null == o ? void 0 : o();
			})), [n];
		}, t.prototype.push = function(t) {
			o.prototype.push.call(this, t), this.onUndoRedoStackChangeFunctionMap.forEach((function(o) {
				return null == o ? void 0 : o();
			}));
		}, t.prototype.registerDocTypeDepency = function(o, t) {
			var e, n = t.executeCommand, r = t.followCommand, i = t.onUndoRedoStackChange;
			n && r || null === (e = globalThis.log) || void 0 === e || e.error("品类在 UndoRedoStack 注册相关依赖参数缺失"), this.getDocTypeDependency(o) || (this.docTypeDependencyMap.set(o, t), i && this.onUndoRedoStackChangeFunctionMap.push(i));
		}, t.prototype.createItem = function(o) {
			var t, e = o.docType, n = this.getDocTypeDependency(e);
			if (n) {
				var i = n.executeCommand;
				return new l(r(r({}, o), { executeCommand: i }));
			}
			null === (t = globalThis.log) || void 0 === t || t.error("mutation 对应的品类未在 UndoRedoStack 正确注册相关依赖，请确认在此之前使用 registerDocTypeDepency 注册品类");
		}, t.prototype.canIgnoreFollow = function(o, t) {
			return o.docType !== t.docType;
		}, t.prototype.follow = function(o, t, e, n) {
			var r = this.getDocTypeDependency(n.itemA.docType);
			return r || console.error("对应的品类未在 UndoRedoStack 正确注册冲突处理方法，请确认在此之前使用 registerDocType 注册品类"), (0, r.followCommand)(o, t, e);
		}, t.prototype.getDocTypeDependency = function(o) {
			return this.docTypeDependencyMap.get(o);
		}, t.prototype.getLocalItemWithOperationKeyIndex = function(o, t) {
			for (var e = 0; e < o.length; e++) {
				var n = o[e];
				if (n.canUndoRedo && n.operationKey === t) return e;
			}
			return -1;
		}, t;
	}(s);
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/smart-sheet/core/smartsheet-commit-handler.ts
var SmartsheetCommitHandler;
var init_smartsheet_commit_handler = __esmMin((() => {
	init_es$1();
	SmartsheetCommitHandler = class {
		constructor(options) {
			this.commitDisposable = null;
			this.collab = options.collab;
		}
		/** 注册 onRequestCommit 监听：产出 changeset 交协同层提交。 */
		attach(core) {
			this.commitDisposable = core.requestApi.onRequestCommit((mutations) => {
				const changesets = this.groupMutationsByTableId(mutations).filter((group) => group.mutations.length > 0).map((group) => ({
					subId: group.tableId,
					changeset: JSON.stringify(MutationSerializer.serializeMutationsMatrix([group.mutations]))
				}));
				this.collab.submit(changesets);
			});
		}
		/**
		* 仅解绑当前 core 的 onRequestCommit 监听（用于 core 热重建）。
		* 协同层的队列/错误回调跨重建保留，由 SmartsheetCollab 管理。
		*/
		detach() {
			if (this.commitDisposable) {
				this.commitDisposable.dispose();
				this.commitDisposable = null;
			}
		}
		/** 释放监听。 */
		dispose() {
			this.detach();
		}
		/** 按 tableId 分组 mutations（保持原序，相邻同 tableId 合并） */
		groupMutationsByTableId(mutations) {
			return mutations.reduce((groups, mutation) => {
				const { tableId } = mutation;
				const lastIndex = groups.length - 1;
				if (groups[lastIndex]?.tableId !== tableId) groups.push({
					tableId,
					mutations: [mutation]
				});
				else groups[lastIndex].mutations.push(mutation);
				return groups;
			}, []);
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/smart-sheet/core/types.ts
var SmartsheetCoreState;
var init_types = __esmMin((() => {
	SmartsheetCoreState = /* @__PURE__ */ function(SmartsheetCoreState) {
		SmartsheetCoreState["UNINITIALIZED"] = "UNINITIALIZED";
		SmartsheetCoreState["INITIALIZING"] = "INITIALIZING";
		SmartsheetCoreState["READY"] = "READY";
		SmartsheetCoreState["ERROR"] = "ERROR";
		return SmartsheetCoreState;
	}({});
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/smart-sheet/core/smartsheet-core.ts
var SmartsheetCore;
var init_smartsheet_core = __esmMin((() => {
	init_index_esm();
	init_es();
	init_es$1();
	init_smartsheet_commit_handler();
	init_types();
	SmartsheetCore = class {
		constructor(options) {
			this.core = null;
			this.state = SmartsheetCoreState.UNINITIALIZED;
			this.tableMap = /* @__PURE__ */ new Map();
			this.loadedTables = /* @__PURE__ */ new Set();
			this.firstChunkReceived = /* @__PURE__ */ new Set();
			this.loadingTables = /* @__PURE__ */ new Map();
			this.firstChunkResolvers = /* @__PURE__ */ new Map();
			this.chunkSubscriptions = [];
			this.reloadPromise = null;
			this.projectId = options.projectId;
			this.userInfo = options.userInfo;
			this.dataCenter = options.dataCenter;
			this.collab = options.collab;
			this.resolveUserInfos = options.resolveUserInfos;
			this.resolveSourceInfo = options.resolveSourceInfo;
			this.commitHandler = new SmartsheetCommitHandler({ collab: this.collab });
			this.ready = this.init();
		}
		/** 当前生命周期状态 */
		get currentState() {
			return this.state;
		}
		/** behaviorApi 只读属性（透传 core.behaviorApi） */
		get behaviorApi() {
			this.assertReady("behaviorApi");
			return this.core.behaviorApi;
		}
		/**
		* 数据 model 变更事件（xtable-core 内部所有变更源统一出口）。
		*
		* 语义：mutation 应用到 model 之后 fire —— 覆盖：
		* 1) 本地业务 mutation（业务方法链路）；
		* 2) undo / redo 反向 mutation 的应用；
		* 3) 公式重算（`fromFormula=true`）；
		* 4) 我们自己在 `emitRecordsChanged` 触发的本地重绘事件；
		*
		* 与 `onRequestCommit` 的区别：后者只在需要 commit 上行时 fire，覆盖面窄且
		* 不含 `emitModelChangeEvent`；xtable-view 渲染层就是通过监听本事件驱动增量重绘，
		* service 层订阅它做「本地缓存 + UI 通知」，与渲染路径同源。
		*
		* 事件参数（`IModelChangedEvent`）：
		* - `mutations`：触发变更的 mutation 列表
		* - `affectedTables`：受影响的子表 id 集合（可用于按 tableId 过滤）
		* - `recordIdsChanged`：受影响的 recordId
		* - `fromFormula`：是否由公式重算触发
		* - `resourceChanged`：是否为资源级变更（列 / 视图配置）
		*/
		get onDidChangeModel() {
			this.assertReady("onDidChangeModel");
			return this.core.behaviorApi.onDidChangeModel;
		}
		/**
		* 通知 xtable-view 对指定子表的若干 record 做增量重绘（不产生 mutation / 不提交）。
		*
		* 用于「本地直接改 model」后的重绘补偿：setPartialRecordsMeta / updateRecordsModifiedTime
		* 这类 Table model API 只标脏、不 emit 变更事件，视图不会自动重绘（表现为需切走再切回、
		* 或点开详情再关闭才刷新）。这里对齐 smart-sheet AcceptCommitHelper.emitAndReset，
		* 显式 emitModelChangeEvent 唤起视图重绘。
		*/
		emitRecordsChanged(tableId, recordIds) {
			this.assertReady("emitRecordsChanged");
			this.core.mutationApi.emitModelChangeEvent([], new Set([tableId]), recordIds);
		}
		/** temporaryService — 用于获取筛选/分组的原始配置（对比临时态变更） */
		get temporaryService() {
			this.assertReady("temporaryService");
			return this.core.temporaryService;
		}
		/** 当前用户信息 */
		get currentUserInfo() {
			return this.userInfo;
		}
		/**
		* 回灌用户信息到 xtable userService —— 让渲染层（分组头 / USER_C 单元格）拿到最新
		* userId → 用户名映射。
		*
		* 背景：xtable 的 `getUserInfo` 未命中 userMap 时返回 undefined 并走「2s 节流」的异步
		* 拉取，首帧只能先显示 userId。因此需要把已知的成员用户名主动灌进 userMap
		* （`updateUserMapByInfos` 直接覆盖 + 重绘，无节流）。
		*
		* 幂等 & 低开销：内部按现有 userMap 做 diff，只回灌「缺失或用户名变化」的项——
		* 用户名不频繁变，已缓存且一致的项跳过，不产生无谓重绘；仅新增成员 / 改名会触发重绘。
		* 因此可安全地在「进项目成员到位」「打开处理人下拉」等时机重复调用。
		*
		* @param infos 最新的 userId → { name, avatarUrl } 映射（通常来自 listMembers）
		* @returns 是否有实际变化（有新增/改名项被写入 userMap）。调用方可据此决定是否重算 layout——
		*          分组头 groupValue 在 layout 构建时固化，updateUserMapByInfos 只重画 record 单元格，
		*          需重建 layout 才能刷新分组头（见 board 的成员同步 effect）。
		*/
		syncUserInfos(infos) {
			this.assertReady("syncUserInfos");
			if (infos.length === 0) return false;
			const { userService } = this.core;
			const cached = new Map(userService.getUserInfoList().map((u) => [u.id, u.name]));
			const changed = infos.filter((info) => info.name && info.name !== info.id && cached.get(info.id) !== info.name);
			if (changed.length > 0) {
				userService.updateUserMapByInfos(changed);
				return true;
			}
			return false;
		}
		/** 获取所有已发现的子表元信息列表 */
		getTableList() {
			const list = [];
			for (const [title, blockId] of this.tableMap.entries()) list.push({
				blockId,
				title,
				type: "",
				isVisible: true
			});
			return list;
		}
		/**
		* 通过子表标题名获取 Table 实例（大小写不敏感）。
		* 若初始化尚未完成会自动等待。
		*/
		async getTableByName(name) {
			await this.ready;
			const blockId = this.tableMap.get(name.toLowerCase());
			if (!blockId) throw new Error(`getTableByName: 未找到名为 "${name}" 的子表`);
			return this.getTableWithLoad(blockId);
		}
		/**
		* 通过 blockId 直接获取 Table 实例。
		* 若初始化尚未完成会自动等待。
		*/
		async getTableByBlockId(blockId) {
			await this.ready;
			return this.getTableWithLoad(blockId);
		}
		/** 检查指定名称的子表是否存在 */
		hasTable(name) {
			return this.tableMap.has(name.toLowerCase());
		}
		/**
		* 通过子表标题名获取 blockId（大小写不敏感）。
		* 不触发数据加载，仅查 tableMap 映射。
		* 若初始化尚未完成会自动等待。
		*/
		async getTableBlockIdByName(name) {
			await this.ready;
			return this.tableMap.get(name.toLowerCase());
		}
		/**
		* 确保指定子表的至少首个 chunk 已加载到本地。
		*
		* 用于渲染场景：xtable-view 只需首个 chunk 即可开始渲染，
		* 无需等待所有 chunk 加载完毕。剩余 chunk 在后台继续加载。
		*
		* 对齐 smartsheet 仓库 `waitUntilTableIsLoaded({ onlyTableMeta: true })`：
		* - 已完整加载 / 首 chunk 已应用 / 表 meta（列+视图配置）已就绪 → 直接返回
		* - 否则启动（或复用）后台加载，等待首个 `onChunkApplied` 事件
		*
		* 首 chunk 信号由 `subscribeChunkEvents` 监听 chunkManager 事件统一给出。
		*/
		async ensureTableFirstChunkLoaded(blockId) {
			await this.ready;
			const table = this.core.base.getTableByTableId(blockId);
			if (this.loadedTables.has(blockId) || this.firstChunkReceived.has(blockId) || table?.isPropertyInited()) return;
			if (!this.loadingTables.has(blockId)) this.startBackgroundLoad(blockId);
			await this.waitForFirstChunk(blockId);
		}
		/**
		* 渲染专用：按子表名取 Table 实例，只等首片 / meta，不触发全量加载。
		*
		* 与 `getTableByName` 的区别：后者走 `getTableWithLoad` 会 `await` 全量
		* `loadTableData`；本方法对齐 smartsheet 渲染路径，首片到达即返回 table，
		* 视图先挂载，剩余分片由后台加载并经 model 变化自动增量重绘。
		*/
		async getTableForRender(name) {
			await this.ready;
			const blockId = this.tableMap.get(name.toLowerCase());
			if (!blockId) throw new Error(`getTableForRender: 未找到名为 "${name}" 的子表`);
			return this.getTableForRenderByBlockId(blockId);
		}
		/**
		* 渲染专用：按 blockId 取 Table 实例，只等首片 / meta 就绪即返回，不触发全量加载。
		*
		* 与 `getTableByBlockId` 的区别：后者走 `getTableWithLoad` 会 `await` 全量
		* `loadTableData`，必须等所有分片（head + body）拉完才 resolve，会拖慢首屏；
		* 本方法对齐 smartsheet 渲染路径，首片到达即返回 table，剩余分片由后台加载
		* 并经 model 变化自动增量重绘。
		*
		* 用于 context 预热等需要"读 table 元信息但不阻塞首屏"的场景：
		* viewGroup / field / view 元信息随首片应用后即可读，无需等 body 分片。
		*/
		async getTableForRenderByBlockId(blockId) {
			await this.ready;
			await this.ensureTableFirstChunkLoaded(blockId);
			return this.core.base.getTableByTableId(blockId);
		}
		/**
		* 同步读取已加载到内存的子表（不触发懒加载）。
		*
		* 替代 sync-table-helpers.ts / view-snapshot.ts 中的 unsafe cast
		* `(core as unknown as { core }).core.base.getTableByTableId()`。
		* 表未加载时返回 undefined，调用方据此走降级逻辑。
		*/
		getLoadedTableByBlockId(blockId) {
			return this.core?.base.getTableByTableId(blockId);
		}
		/**
		* 注册提交错误回调（透传给协同层）。
		*
		* 返回 unsubscribe 函数——UI 层组件卸载时调用以摘除回调，避免回调常驻在
		* service 生命周期上。见 ISmartsheetCollab.onCommitError 注释。
		*/
		onCommitError(callback) {
			return this.collab.onCommitError(callback);
		}
		/**
		* 是否处于协同失败阻塞态（超重试上限 / 提交冲突未恢复）。
		*
		* UI 层用它判断"当前 core 是否需要触发 reload 补救"——典型场景：用户短暂离开
		* plan tab（比如切到任务 tab），期间短轮询追平超上限进入 blocked 态；切回
		* plan tab 时 board mount effect 据此静默触发一次 reload 补数据。
		*/
		isBlocked() {
			return this.collab.isBlocked();
		}
		/** 获取底层 DataCenter 实例 */
		getDataCenter() {
			return this.dataCenter;
		}
		/**
		* 是否存在「正在加载中」（已开始但未完成）的子表。
		*
		* 用于「加载中禁提交」判定：数据只加载了一部分的子表无法正确应用补拉变更，
		* 因此只要有任一子表处于加载中就不允许提交（完全未加载或已加载完成则允许）。
		*/
		hasLoadingInProgress() {
			for (const blockId of this.loadingTables.keys()) if (!this.loadedTables.has(blockId)) return true;
			return false;
		}
		/** 指定子表是否已完整加载到本地。 */
		isTableLoaded(blockId) {
			return this.loadedTables.has(blockId);
		}
		/** 已完整加载的子表 blockId 列表。 */
		getLoadedTableIds() {
			return [...this.loadedTables];
		}
		/**
		* 对两个 mutations 矩阵做冲突处理（透传 xtable-core follow 能力）。
		*
		* @param isAAfterB A 是否在 B 之后执行；返回冲突处理后的 A。
		*/
		followMutationsMatrix(a, b, isAAfterB) {
			this.assertReady("followMutationsMatrix");
			return this.core.mutationApi.followMutationsMatrix(a, b, isAAfterB);
		}
		/**
		* 应用「已冲突处理」的 mutations 到本地 model。
		*
		* 仅应用属于「已加载完成」子表的 mutation；未加载子表的部分丢弃——数据不全无法
		* 正确应用（对应补拉变更跨子表、而本地未加载全部子表的场景）。
		*/
		applyFollowedMutations(mutations) {
			this.assertReady("applyFollowedMutations");
			const toApply = mutations.filter((m) => this.loadedTables.has(m.tableId));
			if (toApply.length === 0) return;
			this.core.mutationApi.applyMutations(toApply);
		}
		/**
		* 预加载指定子表的完整数据。
		*
		* ⚠️ 仅保留作兼容入口，**不要**用于"删除前补齐关联表"这类场景：
		* 它走 xtable-core 内置 `base.preloadLocalTable(tableId)`，内部依赖
		* `tableLoaderHelper.fetchTableData` 走腾讯文档默认 collab dataSource，
		* 而我们的数据加载完全靠 `dataCenter.fetchSheetData` + `chunkManager.applyChunkMutations`
		* 自己喂数据，没给 xtable-core 配 dataSource。这条 fetch 在我们环境里
		* 要么直接失败要么挂起。
		*
		* 需要"确保某个子表已加载到本地"请改用 `ensureTableLoaded`。
		*/
		async preloadLocalTable(tableId) {
			this.assertReady("preloadLocalTable");
			const result = await this.core.base.preloadLocalTable(tableId);
			if (result) this.loadedTables.add(tableId);
			return result;
		}
		/**
		* 确保指定子表的数据已加载到本地（走我们自己的 dataCenter 通道）。
		*
		* 用于 `deleteRecord` 等需要 `checkLinkTableLoaded` 通过的场景：xtable-core
		* deleteRecord.check 会校验关联列指向的子表是否 `isInited()`，未加载就直接返回
		* `ErrorCode.TABLE_LOADING`。本方法走 `loadTableData` → `dataCenter.fetchSheetData`，
		* 真实地通过 MCP JSON-RPC 拉数据并喂给 xtable-core。
		*
		* 已加载的子表会命中 `loadedTables` 缓存直接 resolve，重复调用无副作用。
		*/
		async ensureTableLoaded(blockId) {
			await this.ready;
			if (this.loadedTables.has(blockId)) return;
			await this.loadTableData(blockId);
		}
		/**
		* 重新拉取并**覆盖** core 层数据：丢弃当前 xtable-core 实例与全部已加载子表
		* 状态，重建一个全新的 core（等价首次初始化）；之后对子表的访问会经
		* dataCenter 重新拉取最新数据。
		*
		* 用途：多人协作场景下，首屏分片预加载后他人新增/修改了待办，用户切回计划
		* tab 时需要拿到最新数据。core 的 `loadedTables` / `firstChunkReceived` 强缓存
		* 会短路一切后续加载，因此用整体重建来保证拿到最新全量数据。
		*
		* ⚠️ 重建后旧的 ISmartSheetCore 引用全部失效——xtable-view 渲染器**必须**在
		* reload 完成后重新挂载视图（见 ProjectPlanSmartsheetBoard 非首屏重载逻辑）。
		*
		* 并发去重：reload 进行中再次调用复用同一 Promise。
		*/
		reload() {
			if (this.reloadPromise) return this.reloadPromise;
			this.reloadPromise = this.doReload().finally(() => {
				this.reloadPromise = null;
			});
			return this.reloadPromise;
		}
		/** 实际执行重建：解绑旧 core → 清空加载状态 → 重新初始化（重建新 core） */
		async doReload() {
			await this.ready;
			this.collab.beginReload();
			try {
				for (const sub of this.chunkSubscriptions) sub.dispose();
				this.chunkSubscriptions = [];
				this.commitHandler.detach();
				this.collab.detachHost();
				this.collab.reset();
				this.loadedTables.clear();
				this.firstChunkReceived.clear();
				this.loadingTables.clear();
				for (const waiters of this.firstChunkResolvers.values()) for (const w of waiters) w.resolve();
				this.firstChunkResolvers.clear();
				this.tableMap.clear();
				await this.init();
			} finally {
				this.collab.endReload();
			}
		}
		/** 销毁实例，释放资源 */
		dispose() {
			this.commitHandler.dispose();
			this.collab.detachHost();
			for (const sub of this.chunkSubscriptions) sub.dispose();
			this.chunkSubscriptions = [];
			this.core = null;
			this.state = SmartsheetCoreState.UNINITIALIZED;
			this.tableMap.clear();
			this.loadedTables.clear();
			this.firstChunkReceived.clear();
			this.loadingTables.clear();
			for (const waiters of this.firstChunkResolvers.values()) for (const w of waiters) w.resolve();
			this.firstChunkResolvers.clear();
		}
		/** 内部初始化流程 */
		async init() {
			this.state = SmartsheetCoreState.INITIALIZING;
			console.log("[SmartsheetCore] init start", { projectId: this.projectId });
			try {
				const core = this.createCore({
					userInfo: this.userInfo,
					projectId: this.projectId
				});
				this.core = core;
				this.subscribeChunkEvents(core);
				const blockList = await this.dataCenter.listTables(this.projectId);
				this.applyBlockList(core, blockList);
				for (const block of blockList) this.tableMap.set(block.title.toLowerCase(), block.blockId);
				await core.requestApi.loadRequestMap();
				this.commitHandler.attach(core);
				this.collab.attachHost(this);
				core.undoRedoService.registerUndoRedoStack(new p());
				this.state = SmartsheetCoreState.READY;
				console.log("[SmartsheetCore] init done (READY)");
			} catch (err) {
				this.state = SmartsheetCoreState.ERROR;
				console.error("[SmartsheetCore] init error:", err);
				throw err;
			}
		}
		/**
		* 订阅 xtable-core chunkManager 的分片应用事件。
		*
		* 对齐 smartsheet 仓库：mutation 真正应用到 model 后才会 fire onChunkApplied，
		* 以此作为「首片就绪」的准确信号；onAllChunkApplied 表示该表全部分片应用完成。
		*/
		subscribeChunkEvents(core) {
			const onChunk = core.chunkManager.onChunkApplied((tableId) => {
				this.notifyFirstChunkReceived(tableId);
			});
			const onAllChunk = core.chunkManager.onAllChunkApplied((tableId) => {
				this.loadedTables.add(tableId);
				this.notifyFirstChunkReceived(tableId);
			});
			this.chunkSubscriptions.push(onChunk, onAllChunk);
		}
		/** 确保已初始化 */
		assertReady(methodName) {
			if (this.state !== SmartsheetCoreState.READY) throw new Error(`SmartsheetCore.${methodName}: 尚未初始化完成（当前状态: ${this.state}）`);
		}
		/** 创建并配置 xtable-core 实例 */
		createCore(params) {
			const { userInfo: currentUserInfo, projectId } = params;
			formulaDataSource.dispose();
			coreInstantiationService.dispose();
			hostApp.setType(HostAppType.SMART_SHEET);
			const spreadConfig = this.buildSpreadConfig({
				userInfo: currentUserInfo,
				projectId
			});
			domainConfig.setSpreadConfig(spreadConfig);
			domainConfig.init({
				isWeCom: () => false,
				isToc: () => true,
				getBlockDisplayTitle: () => "",
				fetchSheetData: () => Promise.reject(/* @__PURE__ */ new Error("SmartsheetCore: xtable 内置 fetchSheetData 不应被调用，数据加载走 dataCenter"))
			}, {
				getIsWb: () => true,
				getWbSourceInfo: (source) => this.resolveSourceInfo?.(source) ?? { displayName: source }
			});
			featureAppConfigService.mergeConfig({ [FeatureAppConfigKey.TEMPORARY_MUTATION_SERVER_STORAGE]: false });
			coreAppConfigService.mergeConfig({
				[CoreAppConfigKey.MAXIMUM_RECORD_LIMIT]: 1e5,
				[CoreAppConfigKey.MAXIMUM_CELL_LIMIT]: 15e6
			});
			const core = coreInstantiationService.invokeFunction((accessor) => accessor.get(ISmartSheetCore));
			core.permissionService.setBasePermissionService({
				getIsInited: () => true,
				onPermissionStatusChanged: () => ({ dispose: () => {} }),
				getPermissionStatus: () => true,
				getPermissionExplanation: () => PermissionExplanation.ALLOW,
				dispose: () => {}
			});
			core.userService.setCurrentUserInfo(currentUserInfo);
			if (this.resolveUserInfos) core.userService.initUserInfoFetcher({ getUserInfosByUserIds: async (userIds) => {
				return (await this.resolveUserInfos(userIds)).filter((u) => u.name && u.name !== u.id).map((u) => ({ ...u }));
			} });
			return core;
		}
		/**
		* 构建 SpreadConfig — xtable 内部读取文档级配置的通道。
		*
		* 参照 smartsheet-lite-sdk initDomainConfig，只填 workbuddy 需要的字段：
		* - padId / globalPadId ← projectId
		* - uid / userInfo      ← currentUserInfo
		* 其余字段保持默认空值，避免 xtable 内部 undefined 报错。
		*/
		buildSpreadConfig(params) {
			const { userInfo, projectId } = params;
			const configData = {
				canExportDoc: void 0,
				canEditTab: void 0,
				canCopyDoc: void 0,
				canCopyOut: void 0,
				canEdit: void 0,
				rev: void 0,
				isLogin: true,
				creatorId: "",
				corpId: "",
				padId: projectId,
				padTitle: "",
				title: "",
				userName: userInfo.name,
				uid: userInfo.id,
				originalUrl: "",
				globalPadId: projectId,
				userPic: userInfo.avatarUrl,
				userLoginCorpName: "",
				viewId: "",
				userInfo: { uid: userInfo.id },
				padType: "smartsheet",
				corpName: "",
				tinyid: "",
				ownerId: "",
				sid: "",
				privilegeAttribute: {
					can_edit: 1,
					can_read: 1
				},
				isOwner: true,
				isAdmin: true,
				watermark: "",
				creatorCorpId: "",
				dver: void 0,
				isHistory: void 0,
				domainId: ""
			};
			return {
				getConfig: (name) => configData[name],
				setConfig: () => {},
				reloadConfig: () => {}
			};
		}
		/** 将子表元信息注入 core（仅结构，不含数据） */
		applyBlockList(core, blockList) {
			core.base.resetBlocks();
			for (let index = 0; index < blockList.length; index++) {
				const { blockId, title, type } = blockList[index];
				const InsertBlockMutation = core.mutationApi.getMutationMap()[MutationId.INSERT_BLOCK_MUTATION];
				core.mutationApi.applyMutations([new InsertBlockMutation({
					operationType: MutationOperationType.REPLAY,
					tableId: blockId,
					delta: {
						index,
						title,
						type
					}
				})]);
			}
		}
		/** 获取 Table 实例，若未加载数据则先加载 */
		async getTableWithLoad(blockId) {
			const core = this.core;
			if (!this.loadedTables.has(blockId)) await this.loadTableData(blockId);
			return core.base.getTableByTableId(blockId);
		}
		/** 加载指定子表的全部数据（去重：同一 blockId 并发调用复用同一 Promise） */
		async loadTableData(blockId) {
			if (this.loadedTables.has(blockId)) return;
			const inflight = this.loadingTables.get(blockId);
			if (inflight) return inflight;
			const promise = this.doLoadTableData(blockId).finally(() => {
				this.loadingTables.delete(blockId);
			});
			this.loadingTables.set(blockId, promise);
			return promise;
		}
		/** 实际执行子表数据加载 */
		async doLoadTableData(blockId) {
			const core = this.core;
			await this.dataCenter.fetchSheetData(this.projectId, blockId, (chunk) => {
				const flatMutations = this.decodeMutations(chunk.mutations);
				if (flatMutations.length === 0) return;
				core.chunkManager.applyChunkMutations(blockId, flatMutations, {
					start: chunk.startRow,
					end: chunk.endRow,
					isFinished: chunk.isFinished
				});
			});
			this.loadedTables.add(blockId);
			this.notifyFirstChunkReceived(blockId);
			core.base.getTableByTableId(blockId)?.stopLoading();
		}
		/**
		* 在后台启动子表数据加载（不 await 完成）。
		*
		* 关键：加载失败必须调 `notifyFirstChunkFailed` 唤醒 waiter 用 reject 冒到上游。
		* 此前"忽略 catch → 只 finally 清 loadingTables"会让 waitForFirstChunk 永远
		* 挂起，外层 handle.mount 也永远 pending，board 转圈永不失败——只在 devtools
		* console 里看到 `Uncaught (in promise) AxiosError` 但用户界面上无任何反馈。
		*/
		startBackgroundLoad(blockId) {
			if (this.loadedTables.has(blockId) || this.loadingTables.has(blockId)) return;
			const promise = this.doLoadTableData(blockId).catch((err) => {
				console.error(`[SmartsheetCore] background load failed for block ${blockId}:`, err);
				const error = err instanceof Error ? err : new Error(String(err));
				this.notifyFirstChunkFailed(blockId, error);
				throw error;
			}).finally(() => {
				this.loadingTables.delete(blockId);
			});
			promise.catch(() => {});
			this.loadingTables.set(blockId, promise);
		}
		/**
		* 等待指定子表的首 chunk 信号。
		*
		* 三种落地路径：
		* - 首 chunk 应用成功 → `notifyFirstChunkReceived` 调 resolve；
		* - 后台加载抛错（网络失败等）→ `notifyFirstChunkFailed` 调 reject（这条链是本
		*   Promise 唯一的错误出口；不加 reject 时外层 `handle.mount` 永远 pending）；
		* - dispose / reload 中止 → 走 resolve，等待方 no-op 返回（不算错误）。
		*/
		waitForFirstChunk(blockId) {
			if (this.firstChunkReceived.has(blockId)) return Promise.resolve();
			return new Promise((resolve, reject) => {
				let waiters = this.firstChunkResolvers.get(blockId);
				if (!waiters) {
					waiters = /* @__PURE__ */ new Set();
					this.firstChunkResolvers.set(blockId, waiters);
				}
				waiters.add({
					resolve,
					reject
				});
			});
		}
		/** 通知指定子表的首 chunk 已接收，唤醒所有等待方 */
		notifyFirstChunkReceived(blockId) {
			if (this.firstChunkReceived.has(blockId)) return;
			this.firstChunkReceived.add(blockId);
			const waiters = this.firstChunkResolvers.get(blockId);
			if (waiters) {
				this.firstChunkResolvers.delete(blockId);
				for (const w of waiters) w.resolve();
			}
		}
		/**
		* 通知指定子表的首 chunk 加载**失败**，reject 所有等待方。
		*
		* 触发路径：`startBackgroundLoad` 里 `doLoadTableData` 抛错（sheet/get 全部失败、
		* 网络断、后端 5xx 且重试耗尽等）。此前后台加载错误只 unhandled 到 promise 链、
		* 不通知 waiter，导致 `waitForFirstChunk` 永远挂起、外层 `handle.mount` 永远
		* pending，board 转圈永不失败。修复：让错误沿 waiter chain 冒到调用方。
		*/
		notifyFirstChunkFailed(blockId, err) {
			const waiters = this.firstChunkResolvers.get(blockId);
			if (waiters) {
				this.firstChunkResolvers.delete(blockId);
				for (const w of waiters) w.reject(err);
			}
		}
		/** 解码 mutations 字符串（兼容 JSON / base64+JSON 两种格式） */
		decodeMutations(mutations) {
			let parsedMutations;
			try {
				parsedMutations = JSON.parse(mutations);
			} catch {
				const binaryString = atob(mutations);
				const bytes = new Uint8Array(binaryString.length);
				for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
				const decoded = new TextDecoder().decode(bytes);
				parsedMutations = JSON.parse(decoded);
			}
			return parsedMutations.flat().filter(Boolean);
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/smart-sheet/core/smartsheet-data-center.ts
var HEAD_CHUNK_LEN, BODY_CHUNK_LEN, SmartsheetDataCenter;
var init_smartsheet_data_center = __esmMin((() => {
	HEAD_CHUNK_LEN = 61;
	BODY_CHUNK_LEN = 5e3;
	SmartsheetDataCenter = class {
		constructor(facade, revAnchor) {
			this.fetchInflight = /* @__PURE__ */ new Map();
			this.headInitLocks = /* @__PURE__ */ new Map();
			this.facade = facade;
			this.revAnchor = revAnchor;
		}
		/** 获取文档的所有子表列表。 */
		async listTables(projectId) {
			return this.facade.smartsheetListTables(projectId);
		}
		/**
		* 分片获取指定子表的全部数据。
		*
		* 去重策略：相同 projectId + sheetId 正在请求时，直接复用进行中的 promise，
		* 避免重复拉取同一张表的数据。
		*/
		fetchSheetData(projectId, sheetId, onChunk) {
			const key = `${projectId}:${sheetId}`;
			const inflight = this.fetchInflight.get(key);
			if (inflight) return inflight;
			const task = this.doFetchSheetData(projectId, sheetId, onChunk).finally(() => {
				this.fetchInflight.delete(key);
			});
			this.fetchInflight.set(key, task);
			return task;
		}
		/**
		* 实际执行分片拉取的内部方法（renderer 驱动的拉模型）。
		*
		* 流程：
		* 1. 先拉首片（{@link HEAD_CHUNK_LEN} 行），立即 onChunk → 首屏秒出；
		*    - 已确立 pad 版本 → 锚定该版本拉取；未确立 → 拉最新并由本片经 RevAnchor 确立版本。
		* 2. 再按 {@link BODY_CHUNK_LEN} 行逐片拉取剩余数据，全部锚定到已确立的 pad 版本
		*    （SEND_AFTER_CALLBACK 背压：apply 完成才请求下一片，主/渲染内存恒定）。
		*/
		async doFetchSheetData(projectId, sheetId, onChunk) {
			const { firstChunk, maxRow, rev: headRev } = await this.acquireHead(projectId, sheetId);
			if (firstChunk) await onChunk(firstChunk);
			for (let start = HEAD_CHUNK_LEN; start <= maxRow; start += BODY_CHUNK_LEN) {
				const end = Math.min(start + BODY_CHUNK_LEN - 1, maxRow);
				await onChunk(await this.facade.smartsheetFetchSheetChunk(projectId, sheetId, start, end, headRev));
			}
		}
		/**
		* 拉取本表 head 并（在需要时）确立项目 rev。
		*
		* 策略：
		* - rev 已确立：直接以锚定 rev 拉 head，无锁开销；
		* - rev 未确立：抢占 headInitLock。抢到者以 `need_latest=true` 拉 latest → 上报 rev；
		*   等锁的后到者拿到确立的 rev 后再以 `need_latest=false` 拉本表 head。
		*
		* 返回值 `rev` 为本次 head 请求真实携带/接收到的 pad rev，供 body chunks 严格锚定，
		* 确保同一 subtable 的 head / body 来自同一快照。
		*/
		async acquireHead(projectId, sheetId) {
			if (this.revAnchor.isInitialized(projectId)) {
				const anchorRev = this.revAnchor.getAnchorRev(projectId);
				return this.facade.smartsheetFetchSheetHead(projectId, sheetId, HEAD_CHUNK_LEN, anchorRev);
			}
			const existingLock = this.headInitLocks.get(projectId);
			if (existingLock) {
				await existingLock;
				const anchorRev = this.revAnchor.getAnchorRev(projectId);
				return this.facade.smartsheetFetchSheetHead(projectId, sheetId, HEAD_CHUNK_LEN, anchorRev);
			}
			let releaseLock;
			let rejectLock;
			const lock = new Promise((resolve, reject) => {
				releaseLock = resolve;
				rejectLock = reject;
			});
			lock.catch(() => {});
			this.headInitLocks.set(projectId, lock);
			try {
				const result = await this.facade.smartsheetFetchSheetHead(projectId, sheetId, HEAD_CHUNK_LEN, void 0);
				this.revAnchor.reportHeadRev(projectId, result.rev);
				if (result.firstChunk && result.rev <= 0) console.warn("[SmartsheetDataCenter] 首片未返回有效 rev（契约要求非空），后续提交可能异常", {
					projectId,
					sheetId
				});
				releaseLock();
				return result;
			} catch (err) {
				rejectLock(err);
				throw err;
			} finally {
				if (this.headInitLocks.get(projectId) === lock) this.headInitLocks.delete(projectId);
			}
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/smart-sheet/core/smartsheet-defaults.ts
/**
* 用默认配置创建 SmartsheetDataCenter 实例（仅负责加载分片）。
*
* @param facade    从 `useHost().facades.project` 提取的 smartsheet 方法集合
* @param revAnchor rev 锚定（由 collab 的 VersionManager 实现，须与 collab 共用同一实例）
*/
function createDefaultSmartsheetDataCenter(facade, revAnchor) {
	return new SmartsheetDataCenter(facade, revAnchor);
}
var init_smartsheet_defaults = __esmMin((() => {
	init_smartsheet_data_center();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/smart-sheet/core/smartsheet-project.ts
var instanceCache, SmartsheetProject;
var init_smartsheet_project = __esmMin((() => {
	init_collab();
	init_version_manager();
	init_smartsheet_core();
	init_smartsheet_defaults();
	instanceCache = /* @__PURE__ */ new Map();
	SmartsheetProject = class SmartsheetProject {
		constructor(deps) {
			if (!deps.userInfo) throw new Error("SmartsheetProject: userInfo 为必传参数，请确保调用方传入有效的用户信息");
			this.projectId = deps.projectId;
			const versionManager = new VersionManager();
			const dataCenter = deps.options?.dataCenter ?? createDefaultSmartsheetDataCenter(deps.facade, versionManager);
			this.collab = new SmartsheetCollab({
				projectId: deps.projectId,
				facade: deps.facade,
				versionManager
			});
			this.core = new SmartsheetCore({
				projectId: deps.projectId,
				userInfo: deps.userInfo,
				dataCenter,
				collab: this.collab,
				resolveUserInfos: deps.options?.resolveUserInfos,
				resolveSourceInfo: deps.options?.resolveSourceInfo
			});
		}
		/** 获取协同层（供 UI 装配变更来源 / 注入页面可见性）。 */
		getCollab() {
			return this.collab;
		}
		/**
		* 按 projectId 拿到实例；同一 projectId 全局共享。
		*/
		static forProject(facade, projectId, userInfo, options) {
			const cached = instanceCache.get(projectId);
			if (cached) return cached;
			const instance = new SmartsheetProject({
				facade,
				projectId,
				userInfo,
				options
			});
			instanceCache.set(projectId, instance);
			return instance;
		}
		/** 等待初始化完成 */
		get ready() {
			return this.core.ready;
		}
		/** 获取底层 SmartsheetCore */
		getCore() {
			return this.core;
		}
		/** 获取 todos 主表的原生 ITableInternal（旧 issues 表已重命名为 todos） */
		async getTodosTable() {
			await this.core.ready;
			return this.core.getTableByName("todos");
		}
		/** 获取任意子表（按名称）的原生 ITableInternal */
		async getTable(name) {
			await this.core.ready;
			return this.core.getTableByName(name);
		}
		/**
		* 渲染专用：按名称取子表，只等首片 / meta 就绪即返回，不触发全量加载。
		* 视图先挂载，剩余分片由后台加载并经 model 变化自动增量重绘。
		*/
		async getTableForRender(name) {
			return this.core.getTableForRender(name);
		}
		/**
		* 渲染专用：按 blockId 取子表，只等首片 / meta 就绪即返回，不触发全量加载。
		*
		* 与 `getTableForRender(name)` 等价，只是入参由 name 改为 blockId——
		* 供已持有 blockId 的调用方（如 SmartsheetContext）直接使用，避免再做一次
		* name → blockId 反查。
		*/
		async getTableForRenderByBlockId(blockId) {
			return this.core.getTableForRenderByBlockId(blockId);
		}
		/** 通过子表名称获取 blockId（不触发数据加载） */
		async getTableBlockIdByName(name) {
			return this.core.getTableBlockIdByName(name);
		}
		/**
		* 确保指定子表的至少首个 chunk 已加载。
		* 适用于渲染场景：无需等待全部 chunk，首 chunk 即可渲染。
		*/
		async ensureTableFirstChunkLoaded(blockId) {
			return this.core.ensureTableFirstChunkLoaded(blockId);
		}
		/**
		* 销毁当前实例：dispose 底层 SmartsheetCore 并把自身从模块级缓存中移除。
		*
		* 注意：xtable-core 的 `coreInstantiationService` 是包级全局单例，同一时间
		* 只能服务一个 SmartsheetCore；切换 project 时**必须** dispose 旧实例
		* （否则旧 service 缓存命中后会引用一个已被新 project 重置过的 ISmartSheetCore，
		* 表现为「切回旧项目报 'todos 子表未找到'」）。
		*/
		dispose() {
			this.core.dispose();
			this.collab.dispose();
			if (instanceCache.get(this.projectId) === this) instanceCache.delete(this.projectId);
		}
		/**
		* 销毁指定 projectId 的实例（测试 / 热重载用）。
		* 不传 projectId 则清空所有缓存。
		*/
		static dispose(projectId) {
			if (projectId === void 0) {
				for (const instance of instanceCache.values()) {
					instance.core.dispose();
					instance.collab.dispose();
				}
				instanceCache.clear();
				return;
			}
			const instance = instanceCache.get(projectId);
			if (instance) {
				instance.core.dispose();
				instance.collab.dispose();
				instanceCache.delete(projectId);
			}
		}
	};
}));
//#endregion
export { createChangeSource as a, init_collab as i, init_smartsheet_project as n, init_smartsheet_core as r, SmartsheetProject as t };
