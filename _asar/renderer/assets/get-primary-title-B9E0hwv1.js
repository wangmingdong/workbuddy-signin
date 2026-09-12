import { n as __esmMin } from "./chunk-BRZcfu7K.js";
import { $l as init_es, Ad as SpecialDay, Dd as getSpecialDayCalendar, Od as getSpecialDayValidRange, wd as i18n } from "./execution-result-erkS5q1j.js";
//#region ../../node_modules/@tencent/xtable-view/es/plugins/work-day/index.js
function getDayDiff(dateTimeFrom, dateTimeTo) {
	var deltaTime = dateTimeTo - dateTimeFrom + OneDay;
	return Math.ceil(deltaTime / OneDay);
}
function toInt(timeStamp) {
	return new Date(timeStamp).setHours(0, 0, 0, 0);
}
function binarySearch(source, key, low = 0, height = source.length - 1) {
	if (low > height) return low;
	if (low === height) {
		if (key > source[low]) return low + 1;
		return low;
	}
	var mid = Math.floor((low + height) / 2);
	if (source[mid] === key) return mid;
	if (source[mid] > key) return binarySearch(source, key, low, mid - 1);
	return binarySearch(source, key, mid + 1, height);
}
var OneDay, WorkDayServiceClass, WorkDayService;
var init_work_day = __esmMin((() => {
	init_es();
	OneDay = 1440 * 60 * 1e3;
	WorkDayServiceClass = /* @__PURE__ */ function() {
		"use strict";
		function WorkDayServiceClass() {
			this.specialDayCalendar = getSpecialDayCalendar();
			this.specialDayMap = /* @__PURE__ */ new Map();
			this.holidayCache = {
				start: null,
				end: -Infinity,
				days: []
			};
			this.weekendCache = {
				start: null,
				end: -Infinity,
				days: []
			};
			/**
			* @description 判断时间戳对应的日期是否为周末
			* @param {number} timestamp
			* @returns {boolean}
			*/ this.isTimestampWeekend = (timestamp) => {
				var farmattedTimeStamp = toInt(timestamp);
				var dayInWeek = new Date(farmattedTimeStamp).getDay();
				return [0, 6].includes(dayInWeek);
			};
			/**
			* @description 判断时间戳对应的日期是否为假期（非周末）
			* @param {number} timestamp
			* @returns {boolean}
			*/ this.isTimestampHoliday = (timestamp) => {
				return !!this.getTimestampSpecialDays(timestamp).filter((day) => day.type === SpecialDay.WORK_HOLIDAY).length;
			};
		}
		var _proto = WorkDayServiceClass.prototype;
		/**
		* @description 判断时间戳对应的日期是否为工作日，考虑法定节假日
		* @param {number} timestamp
		* @returns {boolean}
		*/ _proto.isTimestampWorkDay = function isTimestampWorkDay(timestamp) {
			var isWeekend = this.isTimestampWeekend(timestamp);
			var specialDays = this.getTimestampSpecialDays(timestamp);
			var isWorkDay;
			if (isWeekend) isWorkDay = specialDays.some((day) => day.type === SpecialDay.ALTERNATE_WORKDAY);
			else isWorkDay = specialDays.every((day) => day.type !== SpecialDay.WORK_HOLIDAY);
			return isWorkDay;
		};
		/**
		* @description 获取时间戳对应的特殊日期信息
		* @param {number} timestamp
		* @returns {CalendarSpecialDay[]}
		*/ _proto.getTimestampSpecialDays = function getTimestampSpecialDays(timestamp) {
			var validRange = getSpecialDayValidRange();
			if (timestamp < validRange[0] || timestamp > validRange[1]) return [];
			var farmattedTimeStamp = toInt(timestamp);
			var specialDays = this.specialDayMap.get(farmattedTimeStamp);
			if (specialDays) return specialDays;
			specialDays = this.specialDayCalendar.filter((day) => day.timestamp === farmattedTimeStamp);
			this.specialDayMap.set(farmattedTimeStamp, specialDays);
			return specialDays;
		};
		/**
		* @description 获取时间戳对应的假期
		* @param {number} timestamp
		* @returns {CalendarSpecialDay | null}
		*/ _proto.getTimestampHoliday = function getTimestampHoliday(timestamp) {
			var _a;
			return (_a = this.getTimestampSpecialDays(timestamp).find((day) => day.type === SpecialDay.WORK_HOLIDAY)) !== null && _a !== void 0 ? _a : null;
		};
		/**
		* @description 获取时间戳对应的节日
		* @param {number} timestamp
		* @returns {CalendarSpecialDay | null}
		*/ _proto.getTimestampFestival = function getTimestampFestival(timestamp) {
			var _a;
			return (_a = this.getTimestampSpecialDays(timestamp).find((day) => day.festivalName)) !== null && _a !== void 0 ? _a : null;
		};
		/**
		* @description 获取工作日天数
		* @param {number} start
		* @param {number} end
		* @param {{
		*       isCalcHoliday: boolean;
		*       hasStatutoryHoliday: boolean;
		*     }} options
		* @returns {(number | null)}
		* @memberof WorkDayServiceClass
		*/ _proto.getWorkDayCount = function getWorkDayCount(start, end, options) {
			var startTimeStamp = toInt(start);
			var endTimeStamp = toInt(end);
			if (startTimeStamp > endTimeStamp) return 0;
			var diffDay = getDayDiff(startTimeStamp, endTimeStamp);
			if (options.isCalcHoliday) return diffDay;
			var total = this.getTotalDay(startTimeStamp, endTimeStamp);
			var nonWorkDayCount;
			if (options.hasStatutoryHoliday) nonWorkDayCount = this.calculateHoliday(startTimeStamp, endTimeStamp);
			else nonWorkDayCount = this.calculateWeekend(startTimeStamp, endTimeStamp);
			if (nonWorkDayCount === null) return null;
			return total - nonWorkDayCount;
		};
		_proto.getTotalDay = function getTotalDay(start, end) {
			var startTimeStamp = toInt(start);
			var endTimeStamp = toInt(end);
			return Math.round((endTimeStamp - startTimeStamp) / OneDay) + 1;
		};
		_proto.calculateWeekend = function calculateWeekend(start, end) {
			return this.calculateDay(start, end, this.weekendCache, this.isTimestampWeekend);
		};
		_proto.calculateHoliday = function calculateHoliday(start, end) {
			return this.calculateDay(start, end, this.holidayCache, (timestamp) => !this.isTimestampWorkDay(timestamp));
		};
		_proto.calculateDay = function calculateDay(start, end, cache, helper) {
			if (cache.start === null) {
				cache.start = start;
				cache.end = start;
				if (helper(start)) cache.days.push(start);
			}
			var cacheStart = cache.start;
			if (start < cacheStart) {
				for (var timestamp = cacheStart - OneDay; timestamp >= start; timestamp -= OneDay) if (helper(timestamp)) cache.days.unshift(timestamp);
				cache.start = start;
			}
			var cacheEnd = cache.end;
			if (end > cacheEnd) {
				for (var timestamp1 = cacheEnd + OneDay; timestamp1 <= end; timestamp1 += OneDay) if (helper(timestamp1)) cache.days.push(timestamp1);
				cache.end = end;
			}
			var { days } = cache;
			var startIndex = binarySearch(days, start);
			var endIndex = binarySearch(days, end);
			if (days[endIndex] === end) endIndex += 1;
			return days.slice(startIndex, endIndex).length;
		};
		return WorkDayServiceClass;
	}();
	WorkDayService = new WorkDayServiceClass();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/shared/utils/get-primary-title.js
/**
* 获取记录在标题列的主标题
* @param recordId
* @param helper
* @returns
*/ function getRecordPrimaryTitle(recordId, helper) {
	var primaryFieldId = helper.getPrimaryFieldId();
	var primaryCell = helper.getCell(primaryFieldId, recordId);
	return (primaryCell === null || primaryCell === void 0 ? void 0 : primaryCell.data.map((cellData) => cellData.text).join(" ").replace(/\n/g, " ")) || `${i18n.t("未命名记录")}`;
}
var init_get_primary_title = __esmMin((() => {
	init_es();
}));
//#endregion
export { init_work_day as i, init_get_primary_title as n, WorkDayService as r, getRecordPrimaryTitle as t };
