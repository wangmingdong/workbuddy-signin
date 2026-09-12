import { n as __esmMin, r as __exportAll } from "./chunk-BRZcfu7K.js";
//#region ../../packages/agent-ui/src/modules/collab/task-chat/utils/message-linked-list.ts
var message_linked_list_exports = /* @__PURE__ */ __exportAll({
	MessageLinkedList: () => MessageLinkedList,
	isTurnTerminated: () => isTurnTerminated
});
/**
* 判定一个 turn 是否「已终止」——history replay 末轮判断 / sessionTerminated 都用它。
*
* 终止条件取并集，三者中任意一项命中即视为终止：
* - `completedBeforeEndTurn`：endTurn 之前收到过 completed/failed（正常完成 / 失败）
* - `endTurnReceived`：收到过 session_end_turn（最权威的 turn 边界）
* - `fromCliResume`：CLI --resume 回放的 history（proxy 不补 endTurn/completed，
*   但 history 本身就是已落库完整态）—— issue #49259
*
* 抽出函数的好处：
* 1. 调用方一行 `isTurnTerminated(state)` 表意，不用每次复述三个字段
* 2. 未来再加新的"等价终态"信号（例如 #N 引入的 xxx）只改一处
* 3. 与 process-notification-loop.ts 中"刚到的事件是否让 turn 立即结束"的语义区分开
*    （那里看的是"事件流推进过程中"，这里看的是"循环结束、最后一个 turn 状态"）
*/
function isTurnTerminated(state) {
	if (!state) return false;
	return state.completedBeforeEndTurn || state.endTurnReceived || state.fromCliResume;
}
var MessageLinkedList;
var init_message_linked_list = __esmMin((() => {
	MessageLinkedList = class MessageLinkedList {
		constructor() {
			this.head = {
				next: null,
				kind: "system",
				time: 0
			};
			this.tail = this.head;
			this.lastUserNode = null;
			this._size = 0;
		}
		get size() {
			return this._size;
		}
		/** 在横向链表尾部追加 user message */
		appendUser(message) {
			const node = {
				next: null,
				kind: "user",
				time: new Date(message.timestamp).getTime(),
				message,
				assistant: null,
				turnState: {
					completedBeforeEndTurn: false,
					failedBeforeEndTurn: false,
					endTurnReceived: false,
					onTurnCompletedFired: false,
					hasAssistantContent: false,
					interruptedByUser: false,
					fromCliResume: false
				}
			};
			this.tail.next = node;
			this.tail = node;
			this.lastUserNode = node;
			this._size++;
		}
		/** 获取最后一个 UserNode 的 turn 状态（issue #44596） */
		getTurnState() {
			return this.lastUserNode?.turnState ?? null;
		}
		/** 更新最后一个 UserNode 的 turn 状态 */
		updateTurnState(patch) {
			if (this.lastUserNode) Object.assign(this.lastUserNode.turnState, patch);
		}
		/** 在横向链表尾部追加 system message */
		appendSystem(message) {
			const node = {
				next: null,
				kind: "system",
				time: new Date(message.timestamp).getTime(),
				message
			};
			this.tail.next = node;
			this.tail = node;
			this._size++;
		}
		/**
		* 按 id 就地更新已有 user 节点的 message（保留该节点的 turnState / assistant / 节点引用）。
		* 找不到匹配 id 的 UserNode 则 no-op。
		*
		* 用途（#67862 residual）：user echo 认领乐观 opt 占位后，把幸存 opt 的 timestamp 归一到
		* 服务端时钟——opt 原本用客户端时钟(new Date())，echo 用沙箱时钟，二者跨时钟；归一后
		* 后续对同一条消息的重复 drain 走 content+窗口兜底时两侧同为服务端时钟，消除跨时钟误判。
		* 节点对象本身不替换，故 lastUserNode / turnState / 已挂 assistant 均不受影响。
		*/
		updateUser(message) {
			let curr = this.head.next;
			while (curr) {
				if (curr.kind === "user" && curr.message.id === message.id) {
					const node = curr;
					node.message = message;
					node.time = new Date(message.timestamp).getTime();
					return;
				}
				curr = curr.next;
			}
		}
		/** 按 id 更新已有 system 节点，不存在则追加（compact divider 流式 → 完成态复用同 id） */
		upsertSystem(message) {
			let curr = this.head.next;
			while (curr) {
				if (curr.kind === "system" && curr.message.id === message.id) {
					curr.message = message;
					curr.time = new Date(message.timestamp).getTime();
					return;
				}
				curr = curr.next;
			}
			this.appendSystem(message);
		}
		/**
		* 按时间将 system message 插入到正确位置。
		* 规则：插到第一个 time > sysTime 的 UserNode 前面。
		* 如果不存在这样的 UserNode，追加到尾部。
		*/
		insertSystemByTime(message) {
			const sysTime = new Date(message.timestamp).getTime();
			const node = {
				next: null,
				kind: "system",
				time: sysTime,
				message
			};
			let prev = this.head;
			let curr = this.head.next;
			while (curr) {
				if (curr.kind === "user" && curr.time > sysTime) {
					node.next = curr;
					prev.next = node;
					this._size++;
					return;
				}
				prev = curr;
				curr = curr.next;
			}
			this.tail.next = node;
			this.tail = node;
			this._size++;
		}
		/** 挂 assistant 到最后一个 UserNode 的纵向指针上 */
		setAssistant(message) {
			if (this.lastUserNode) this.lastUserNode.assistant = message;
		}
		/** 更新 assistant（streaming 时内容不断变化） */
		updateAssistant(message) {
			if (this.lastUserNode) this.lastUserNode.assistant = message;
		}
		/** 获取最后一个 UserNode 的 assistant（用于判断是否已有回复） */
		getLastAssistant() {
			return this.lastUserNode?.assistant ?? null;
		}
		/** 获取最后一个 UserNode */
		getLastUserNode() {
			return this.lastUserNode;
		}
		/**
		* 遍历横向链表，生成 CollabMessage[]。
		* 遇到 UserNode 时先输出 user message，再输出其 assistant（如果有）。
		* 遇到 SystemNode 时直接输出。
		*/
		toArray() {
			const result = [];
			let curr = this.head.next;
			while (curr) {
				if (curr.kind === "user") {
					const userNode = curr;
					result.push(userNode.message);
					if (userNode.assistant) result.push(userNode.assistant);
				} else result.push(curr.message);
				curr = curr.next;
			}
			return result;
		}
		/** 获取最后一条 assistant message 的 id（用于 streamingMessageId） */
		getLastAssistantId() {
			return this.lastUserNode?.assistant?.id;
		}
		/**
		* 从已排序的 CollabMessage[] 批量构建链表（replay history 后调用）。
		* messages 中的顺序已经是正确的时间顺序（user/assistant/system 交替）。
		*/
		static fromMessages(messages) {
			const list = new MessageLinkedList();
			for (const msg of messages) switch (msg.type) {
				case "member":
					list.appendUser(msg);
					break;
				case "assistant":
					list.setAssistant(msg);
					break;
				case "system":
					list.appendSystem(msg);
					break;
			}
			return list;
		}
		/**
		* 批量插入 timeline entries（已按时间正序）。
		* 每条 entry 按时间插到正确位置。
		*/
		insertTimelineEntries(systemMessages) {
			for (const msg of systemMessages) this.insertSystemByTime(msg);
		}
		/** 清空链表 */
		clear() {
			this.head.next = null;
			this.tail = this.head;
			this.lastUserNode = null;
			this._size = 0;
		}
	};
}));
//#endregion
export { message_linked_list_exports as i, init_message_linked_list as n, isTurnTerminated as r, MessageLinkedList as t };
