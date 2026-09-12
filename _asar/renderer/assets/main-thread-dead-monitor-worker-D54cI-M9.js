(function (exports) {
  'use strict';

  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }
  function _arrayWithHoles(r) {
    if (Array.isArray(r)) return r;
  }
  function asyncGeneratorStep(n, t, e, r, o, a, c) {
    try {
      var i = n[a](c),
        u = i.value;
    } catch (n) {
      return void e(n);
    }
    i.done ? t(u) : Promise.resolve(u).then(r, o);
  }
  function _asyncToGenerator(n) {
    return function () {
      var t = this,
        e = arguments;
      return new Promise(function (r, o) {
        var a = n.apply(t, e);
        function _next(n) {
          asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
        }
        function _throw(n) {
          asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
        }
        _next(void 0);
      });
    };
  }
  function _classCallCheck(a, n) {
    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
  }
  function _defineProperties(e, r) {
    for (var t = 0; t < r.length; t++) {
      var o = r[t];
      o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
    }
  }
  function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
      writable: !1
    }), e;
  }
  function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
      value: t,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[r] = t, e;
  }
  function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
      var e,
        n,
        i,
        u,
        a = [],
        f = !0,
        o = !1;
      try {
        if (i = (t = t.call(r)).next, 0 === l) {
          if (Object(t) !== t) return;
          f = !1;
        } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
      } catch (r) {
        o = !0, n = r;
      } finally {
        try {
          if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
        } finally {
          if (o) throw n;
        }
      }
      return a;
    }
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread2(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
        _defineProperty(e, r, t[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
      });
    }
    return e;
  }
  function _regeneratorRuntime() {
    _regeneratorRuntime = function () {
      return e;
    };
    var t,
      e = {},
      r = Object.prototype,
      n = r.hasOwnProperty,
      o = Object.defineProperty || function (t, e, r) {
        t[e] = r.value;
      },
      i = "function" == typeof Symbol ? Symbol : {},
      a = i.iterator || "@@iterator",
      c = i.asyncIterator || "@@asyncIterator",
      u = i.toStringTag || "@@toStringTag";
    function define(t, e, r) {
      return Object.defineProperty(t, e, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }), t[e];
    }
    try {
      define({}, "");
    } catch (t) {
      define = function (t, e, r) {
        return t[e] = r;
      };
    }
    function wrap(t, e, r, n) {
      var i = e && e.prototype instanceof Generator ? e : Generator,
        a = Object.create(i.prototype),
        c = new Context(n || []);
      return o(a, "_invoke", {
        value: makeInvokeMethod(t, r, c)
      }), a;
    }
    function tryCatch(t, e, r) {
      try {
        return {
          type: "normal",
          arg: t.call(e, r)
        };
      } catch (t) {
        return {
          type: "throw",
          arg: t
        };
      }
    }
    e.wrap = wrap;
    var h = "suspendedStart",
      l = "suspendedYield",
      f = "executing",
      s = "completed",
      y = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    var p = {};
    define(p, a, function () {
      return this;
    });
    var d = Object.getPrototypeOf,
      v = d && d(d(values([])));
    v && v !== r && n.call(v, a) && (p = v);
    var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
    function defineIteratorMethods(t) {
      ["next", "throw", "return"].forEach(function (e) {
        define(t, e, function (t) {
          return this._invoke(e, t);
        });
      });
    }
    function AsyncIterator(t, e) {
      function invoke(r, o, i, a) {
        var c = tryCatch(t[r], t, o);
        if ("throw" !== c.type) {
          var u = c.arg,
            h = u.value;
          return h && "object" == typeof h && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
            invoke("next", t, i, a);
          }, function (t) {
            invoke("throw", t, i, a);
          }) : e.resolve(h).then(function (t) {
            u.value = t, i(u);
          }, function (t) {
            return invoke("throw", t, i, a);
          });
        }
        a(c.arg);
      }
      var r;
      o(this, "_invoke", {
        value: function (t, n) {
          function callInvokeWithMethodAndArg() {
            return new e(function (e, r) {
              invoke(t, n, e, r);
            });
          }
          return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
        }
      });
    }
    function makeInvokeMethod(e, r, n) {
      var o = h;
      return function (i, a) {
        if (o === f) throw Error("Generator is already running");
        if (o === s) {
          if ("throw" === i) throw a;
          return {
            value: t,
            done: !0
          };
        }
        for (n.method = i, n.arg = a;;) {
          var c = n.delegate;
          if (c) {
            var u = maybeInvokeDelegate(c, n);
            if (u) {
              if (u === y) continue;
              return u;
            }
          }
          if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
            if (o === h) throw o = s, n.arg;
            n.dispatchException(n.arg);
          } else "return" === n.method && n.abrupt("return", n.arg);
          o = f;
          var p = tryCatch(e, r, n);
          if ("normal" === p.type) {
            if (o = n.done ? s : l, p.arg === y) continue;
            return {
              value: p.arg,
              done: n.done
            };
          }
          "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
        }
      };
    }
    function maybeInvokeDelegate(e, r) {
      var n = r.method,
        o = e.iterator[n];
      if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
      var i = tryCatch(o, e.iterator, r.arg);
      if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
      var a = i.arg;
      return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
    }
    function pushTryEntry(t) {
      var e = {
        tryLoc: t[0]
      };
      1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
    }
    function resetTryEntry(t) {
      var e = t.completion || {};
      e.type = "normal", delete e.arg, t.completion = e;
    }
    function Context(t) {
      this.tryEntries = [{
        tryLoc: "root"
      }], t.forEach(pushTryEntry, this), this.reset(!0);
    }
    function values(e) {
      if (e || "" === e) {
        var r = e[a];
        if (r) return r.call(e);
        if ("function" == typeof e.next) return e;
        if (!isNaN(e.length)) {
          var o = -1,
            i = function next() {
              for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
              return next.value = t, next.done = !0, next;
            };
          return i.next = i;
        }
      }
      throw new TypeError(typeof e + " is not iterable");
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
      value: GeneratorFunctionPrototype,
      configurable: !0
    }), o(GeneratorFunctionPrototype, "constructor", {
      value: GeneratorFunction,
      configurable: !0
    }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
      var e = "function" == typeof t && t.constructor;
      return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
    }, e.mark = function (t) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
    }, e.awrap = function (t) {
      return {
        __await: t
      };
    }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
      return this;
    }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
      void 0 === i && (i = Promise);
      var a = new AsyncIterator(wrap(t, r, n, o), i);
      return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
        return t.done ? t.value : a.next();
      });
    }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
      return this;
    }), define(g, "toString", function () {
      return "[object Generator]";
    }), e.keys = function (t) {
      var e = Object(t),
        r = [];
      for (var n in e) r.push(n);
      return r.reverse(), function next() {
        for (; r.length;) {
          var t = r.pop();
          if (t in e) return next.value = t, next.done = !1, next;
        }
        return next.done = !0, next;
      };
    }, e.values = values, Context.prototype = {
      constructor: Context,
      reset: function (e) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
      },
      stop: function () {
        this.done = !0;
        var t = this.tryEntries[0].completion;
        if ("throw" === t.type) throw t.arg;
        return this.rval;
      },
      dispatchException: function (e) {
        if (this.done) throw e;
        var r = this;
        function handle(n, o) {
          return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
        }
        for (var o = this.tryEntries.length - 1; o >= 0; --o) {
          var i = this.tryEntries[o],
            a = i.completion;
          if ("root" === i.tryLoc) return handle("end");
          if (i.tryLoc <= this.prev) {
            var c = n.call(i, "catchLoc"),
              u = n.call(i, "finallyLoc");
            if (c && u) {
              if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
              if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
            } else if (c) {
              if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            } else {
              if (!u) throw Error("try statement without catch or finally");
              if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
            }
          }
        }
      },
      abrupt: function (t, e) {
        for (var r = this.tryEntries.length - 1; r >= 0; --r) {
          var o = this.tryEntries[r];
          if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
            var i = o;
            break;
          }
        }
        i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
        var a = i ? i.completion : {};
        return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
      },
      complete: function (t, e) {
        if ("throw" === t.type) throw t.arg;
        return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
      },
      finish: function (t) {
        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
          var r = this.tryEntries[e];
          if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
        }
      },
      catch: function (t) {
        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
          var r = this.tryEntries[e];
          if (r.tryLoc === t) {
            var n = r.completion;
            if ("throw" === n.type) {
              var o = n.arg;
              resetTryEntry(r);
            }
            return o;
          }
        }
        throw Error("illegal catch attempt");
      },
      delegateYield: function (e, r, n) {
        return this.delegate = {
          iterator: values(e),
          resultName: r,
          nextLoc: n
        }, "next" === this.method && (this.arg = t), y;
      }
    }, e;
  }
  function _slicedToArray(r, e) {
    return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }
  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }
  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
  }

  var _globalThis$3 = function (Object) {
    function get() {
      var _global = this || self;
      delete Object.prototype.__magic__;
      return _global;
    }
    if (typeof globalThis === "object") {
      return globalThis;
    }
    if (this) {
      return get();
    } else {
      Object.defineProperty(Object.prototype, "__magic__", {
        configurable: true,
        get: get
      });
      var _global = __magic__;
      return _global;
    }
  }(Object);
  var reportedTrace = new Set();
  // 简单的全景上报 在worker中使用，直接发请求
  function simpleCubeForWorker(bizId, params, time, cubeKeyMap) {
    var r = new XMLHttpRequest();
    var clientVars = _globalThis$3.clientVars;
    var traceId = clientVars === null || clientVars === void 0 ? void 0 : clientVars.traceId;
    // 这个trace已经上报过，不再上报
    // 前面流程实际已有保证，但是不知道为什么就是会有重复上报，这里统一避免一下
    if (traceId && reportedTrace.has(traceId)) {
      return;
    }
    traceId && reportedTrace.add(traceId);
    r.open('POST', 'https://cube.weixinbridge.com/cube/report/reportbizdata?f=json');
    var wxworkCode = undefined;
    if (clientVars !== null && clientVars !== void 0 && clientVars.wxworkVersion) {
      // 搞个数字版本的，方便上报筛选>某某版本
      var str = clientVars.wxworkVersion.split('.')
      // 每一位固定填充至3位，避免认为4.2.0 > 4.1.15
      .map(function (item) {
        return "00".concat(item).slice(-3);
      }).join('');
      wxworkCode = parseInt(str) || undefined;
    }
    var combineParams = _objectSpread2({
      biz_id: bizId,
      time: Math.round(time / 1000),
      scene: typeof (clientVars === null || clientVars === void 0 ? void 0 : clientVars.hardwareConcurrency) === 'number' && (clientVars === null || clientVars === void 0 ? void 0 : clientVars.hardwareConcurrency) <= 2 ? 'slow' : 'normal',
      category: clientVars === null || clientVars === void 0 ? void 0 : clientVars.padType,
      corpid: clientVars === null || clientVars === void 0 ? void 0 : clientVars.corpId,
      docid: clientVars === null || clientVars === void 0 ? void 0 : clientVars.padId,
      freego_proxy: clientVars === null || clientVars === void 0 ? void 0 : clientVars.freegoProxy,
      userId: clientVars === null || clientVars === void 0 ? void 0 : clientVars.userId,
      user_agent: clientVars === null || clientVars === void 0 ? void 0 : clientVars.userAgent,
      web_version: clientVars === null || clientVars === void 0 ? void 0 : clientVars.webVersion,
      wxwork_version: clientVars === null || clientVars === void 0 ? void 0 : clientVars.wxworkVersion,
      value5: wxworkCode,
      value6: clientVars === null || clientVars === void 0 ? void 0 : clientVars.hardwareConcurrency,
      weblog: typeof wxworkCode === 'number' && wxworkCode >= 4001038 ? 'true' : 'false',
      str6: clientVars === null || clientVars === void 0 ? void 0 : clientVars.traceId
    }, params);
    if (cubeKeyMap) {
      // 各个品类的上报字段不同，用这个map映射一下
      Object.entries(cubeKeyMap).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          originKey = _ref2[0],
          actualKey = _ref2[1];
        if (combineParams[originKey] !== undefined) {
          combineParams[actualKey] = combineParams[originKey];
          delete combineParams[originKey];
        }
      });
    }
    r.send("report_items=".concat(JSON.stringify([combineParams])));
  }

  function getTimeStampNow() {
    if (typeof performance === 'undefined') {
      return Date.now();
    }
    if (performance.timeOrigin && performance.now) {
      return performance.timeOrigin + performance.now();
    }
    return Date.now();
  }

  /**
   * 判断是不是 promise
   *
   * @param obj 要判断的对象
   * @returns {boolean} 判断结果
   */
  function isPromise(obj) {
    return !!obj && (_typeof(obj) === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
  }

  /**
   * 会话消息类型枚举
   */
  var MessageType;

  /**
   * 会话消息
   */
  (function (MessageType) {
    MessageType["REQUEST"] = "REQUEST";
    MessageType["REPLY"] = "REPLY";
  })(MessageType || (MessageType = {}));
  var ActionType;
  /**
   * 用户 ID 类型
   */
  (function (ActionType) {
    ActionType["HeartBeatTestForMainThreadDie"] = "HeartBeatTestForMainThreadDie";
    ActionType["SyncData"] = "SyncData";
    ActionType["WorkerInited"] = "WorkerInited";
    ActionType["WorkerInitError"] = "WorkerInitError";
    ActionType["OperateLog"] = "OperateLog";
    ActionType["UpdateActiveTime"] = "UpdateActiveTime";
  })(ActionType || (ActionType = {}));
  /**
   * 日志级别枚举
   * 定义了不同的日志级别
   */
  var LogLevel;
  (function (LogLevel) {
    LogLevel[LogLevel["DEBUG"] = 1] = "DEBUG";
    LogLevel[LogLevel["INFO"] = 2] = "INFO";
    LogLevel[LogLevel["WARN"] = 3] = "WARN";
    LogLevel[LogLevel["ERROR"] = 4] = "ERROR";
    LogLevel[LogLevel["FATAL"] = 5] = "FATAL";
  })(LogLevel || (LogLevel = {}));
  /**
   * 项目 ID 类型
   */
  /**
   * 上报参数接口
   */

  var _globalThis$2 = function (Object) {
    function get() {
      var _global = this || self;
      delete Object.prototype.__magic__;
      return _global;
    }
    if (typeof globalThis === "object") {
      return globalThis;
    }
    if (this) {
      return get();
    } else {
      Object.defineProperty(Object.prototype, "__magic__", {
        configurable: true,
        get: get
      });
      var _global = __magic__;
      return _global;
    }
  }(Object);
  var Controller = /*#__PURE__*/function () {
    function Controller(
    /**
     * 主线程的话是window，worker线程的话是worker
     */
    worker, logTag) {
      var _this = this,
        _this$worker;
      _classCallCheck(this, Controller);
      this.worker = worker;
      this.logTag = logTag;
      /**
       * 事务处理器 Map
       */
      _defineProperty(this, "actionHandlerMap", {});
      /**
       * 收到会话消息的处理函数
       * @description
       * 发现是请求, 调用通信控制器的事务处理器进行处理, 获取事务结果并响应;
       * 发现是响应，调用会话响应器
       * @param event
       */
      _defineProperty(this, "onmessage", function (event) {
        var message = event.data;

        // 非代码逻辑的异常场景, 回调中的 event.data 为 null, 直接返回
        if (!message) {
          return;
        }
        _this.actionHandler(message);
      });
      (_this$worker = this.worker) === null || _this$worker === void 0 || _this$worker.addEventListener('message', this.onmessage);
    }
    return _createClass(Controller, [{
      key: "terminate",
      value: function terminate() {
        if (this.worker) {
          this.worker.removeEventListener('message', this.onmessage);
          this.worker.onerror = null;
          this.worker.terminate();
          this.worker = null;
        }
        this.actionHandlerMap = {};
      }

      /**
       * 发送 Promise 形式的事务, 在 then 中获取响应
       *
       * @param actionType 事务类型
       * @param payload 负载
       * @memberof BaseController
       */
    }, {
      key: "request",
      value: function request(actionType) {
        var payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var sessionId = this.generateSessionId();
        var message = {
          messageType: MessageType.REQUEST,
          actionType: actionType,
          payload: payload,
          sessionId: sessionId,
          time: getTimeStampNow()
        };
        this.postMessage(message);
      }

      /**
       * 添加事务处理器, 不允许重复添加
       *
       * @param actionType 事务类型
       * @param handler 事务处理器
       */
    }, {
      key: "addActionHandler",
      value: function addActionHandler(actionType, handler) {
        console.log(this.logTag, "%cAdd actionType `".concat(actionType, "`"), 'color: orange');
        if (this.hasActionHandler(actionType)) {
          throw new Error("\u5DF2\u6CE8\u518C\u4E8B\u52A1 `".concat(actionType, "` \u7684\u5904\u7406\u5668, \u4E0D\u80FD\u91CD\u590D\u6CE8\u518C"));
        }
        this.actionHandlerMap[actionType] = handler;
      }

      /**
       * 事务处理器, 提供给通信 Channel 调用
       *
       * @param message 会话消息
       * @returns
       */
    }, {
      key: "actionHandler",
      value: function actionHandler(message) {
        var _this2 = this;
        var actionType = message.actionType,
          payload = message.payload;
        if (this.hasActionHandler(actionType)) {
          // 执行指定的事务处理器, 并返回 Promise 封装的事务结果
          try {
            var actionResult = this.actionHandlerMap[actionType](payload);

            // 对于 Promise 形式的结果, 需要进行 Promise 错误捕获
            if (isPromise(actionResult)) {
              return actionResult["catch"](function (error) {
                // 暴露 Promise 中的异常
                // Promise 会将运行过程中的报错推入下一个 .catch 的微任务
                // 通过 setTimeout 将报错抛到一个宏任务中, 暴露出去
                // 参考: https://stackoverflow.com/questions/30715367/why-can-i-not-throw-inside-a-promise-catch-handler
                setTimeout(function () {
                  _this2.reportActionHandlerError(actionType, error);
                }, 0);
                return Promise.reject(error);
              });
            }

            // 对数据结果, 包装为 Promise
            return Promise.resolve(actionResult);
          } catch (error) {
            this.reportActionHandlerError(actionType, error);

            // 继续抛出给外层
            return Promise.reject(error);
          }
        } else {
          var _globalThis$log;
          console.error(this.logTag, "\u6CA1\u6709\u627E\u5230\u4E8B\u52A1 `".concat(actionType, "` \u7684\u5904\u7406\u5668, \u662F\u5426\u5DF2\u6CE8\u518C."));
          (_globalThis$log = _globalThis$2.log) === null || _globalThis$log === void 0 || _globalThis$log.error(this.logTag, "\u6CA1\u6709\u627E\u5230\u4E8B\u52A1 `".concat(actionType, "` \u7684\u5904\u7406\u5668, \u662F\u5426\u5DF2\u6CE8\u518C."));
        }
      }

      /**
       * 判断是否有指定事务的处理器
       *
       * @protected
       * @param actionType 事务类型
       * @returns {boolean}
       */
    }, {
      key: "hasActionHandler",
      value: function hasActionHandler(actionType) {
        return !!this.actionHandlerMap[actionType];
      }

      /**
       * 上报事务处理器执行报错
       * @description
       * 在各线程 Controller 中 override
       *
       * @param actionType 事务类型
       * @param error 报错信息
       */
    }, {
      key: "reportActionHandlerError",
      value: function reportActionHandlerError(actionType, error) {
        var _globalThis$log2;
        var errorInfo = "Worker action ".concat(actionType, " error");
        console.error(this.logTag, 'controller', errorInfo, error);
        (_globalThis$log2 = _globalThis$2.log) === null || _globalThis$log2 === void 0 || _globalThis$log2.error(this.logTag, 'controller', errorInfo, error);
      }

      /**
       * 生成每次独立会话的 Id
       *
       * @private
       * @returns 会话 Id
       */
    }, {
      key: "generateSessionId",
      value: function generateSessionId() {
        // sessionId 长度为 16 位, 有效位数 14 位
        // 以 `w_` 开头, 避免 nanoid 生成时可能以数字开头, 无法作为 Map 的 key
        var sessionId = "w_".concat(Math.ceil(Math.random() * 1e14));
        return sessionId;
      }

      /**
       * 封装的 Worker 原生 postMessage 接口
       *
       * @param message 会话消息
       */
    }, {
      key: "postMessage",
      value: function postMessage(message) {
        var _this$worker2;
        (_this$worker2 = this.worker) === null || _this$worker2 === void 0 || _this$worker2.postMessage(message);
      }
    }]);
  }();

  var DefaultOperateLogLimit = 40;
  // 默认页面活跃时间超过x不上报，和sheet对齐
  var DefaultPageActiveTimeLimit = 100000;

  var lzString = {exports: {}};

  (function (module) {
  	// Copyright (c) 2013 Pieroxy <pieroxy@pieroxy.net>
  	// This work is free. You can redistribute it and/or modify it
  	// under the terms of the WTFPL, Version 2
  	// For more information see LICENSE.txt or http://www.wtfpl.net/
  	//
  	// For more information, the home page:
  	// http://pieroxy.net/blog/pages/lz-string/testing.html
  	//
  	// LZ-based compression algorithm, version 1.4.4
  	var LZString = (function() {

  	// private property
  	var f = String.fromCharCode;
  	var keyStrBase64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  	var keyStrUriSafe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$";
  	var baseReverseDic = {};

  	function getBaseValue(alphabet, character) {
  	  if (!baseReverseDic[alphabet]) {
  	    baseReverseDic[alphabet] = {};
  	    for (var i=0 ; i<alphabet.length ; i++) {
  	      baseReverseDic[alphabet][alphabet.charAt(i)] = i;
  	    }
  	  }
  	  return baseReverseDic[alphabet][character];
  	}

  	var LZString = {
  	  compressToBase64 : function (input) {
  	    if (input == null) return "";
  	    var res = LZString._compress(input, 6, function(a){return keyStrBase64.charAt(a);});
  	    switch (res.length % 4) { // To produce valid Base64
  	    default: // When could this happen ?
  	    case 0 : return res;
  	    case 1 : return res+"===";
  	    case 2 : return res+"==";
  	    case 3 : return res+"=";
  	    }
  	  },

  	  decompressFromBase64 : function (input) {
  	    if (input == null) return "";
  	    if (input == "") return null;
  	    return LZString._decompress(input.length, 32, function(index) { return getBaseValue(keyStrBase64, input.charAt(index)); });
  	  },

  	  compressToUTF16 : function (input) {
  	    if (input == null) return "";
  	    return LZString._compress(input, 15, function(a){return f(a+32);}) + " ";
  	  },

  	  decompressFromUTF16: function (compressed) {
  	    if (compressed == null) return "";
  	    if (compressed == "") return null;
  	    return LZString._decompress(compressed.length, 16384, function(index) { return compressed.charCodeAt(index) - 32; });
  	  },

  	  //compress into uint8array (UCS-2 big endian format)
  	  compressToUint8Array: function (uncompressed) {
  	    var compressed = LZString.compress(uncompressed);
  	    var buf=new Uint8Array(compressed.length*2); // 2 bytes per character

  	    for (var i=0, TotalLen=compressed.length; i<TotalLen; i++) {
  	      var current_value = compressed.charCodeAt(i);
  	      buf[i*2] = current_value >>> 8;
  	      buf[i*2+1] = current_value % 256;
  	    }
  	    return buf;
  	  },

  	  //decompress from uint8array (UCS-2 big endian format)
  	  decompressFromUint8Array:function (compressed) {
  	    if (compressed===null || compressed===undefined){
  	        return LZString.decompress(compressed);
  	    } else {
  	        var buf=new Array(compressed.length/2); // 2 bytes per character
  	        for (var i=0, TotalLen=buf.length; i<TotalLen; i++) {
  	          buf[i]=compressed[i*2]*256+compressed[i*2+1];
  	        }

  	        var result = [];
  	        buf.forEach(function (c) {
  	          result.push(f(c));
  	        });
  	        return LZString.decompress(result.join(''));

  	    }

  	  },


  	  //compress into a string that is already URI encoded
  	  compressToEncodedURIComponent: function (input) {
  	    if (input == null) return "";
  	    return LZString._compress(input, 6, function(a){return keyStrUriSafe.charAt(a);});
  	  },

  	  //decompress from an output of compressToEncodedURIComponent
  	  decompressFromEncodedURIComponent:function (input) {
  	    if (input == null) return "";
  	    if (input == "") return null;
  	    input = input.replace(/ /g, "+");
  	    return LZString._decompress(input.length, 32, function(index) { return getBaseValue(keyStrUriSafe, input.charAt(index)); });
  	  },

  	  compress: function (uncompressed) {
  	    return LZString._compress(uncompressed, 16, function(a){return f(a);});
  	  },
  	  _compress: function (uncompressed, bitsPerChar, getCharFromInt) {
  	    if (uncompressed == null) return "";
  	    var i, value,
  	        context_dictionary= {},
  	        context_dictionaryToCreate= {},
  	        context_c="",
  	        context_wc="",
  	        context_w="",
  	        context_enlargeIn= 2, // Compensate for the first entry which should not count
  	        context_dictSize= 3,
  	        context_numBits= 2,
  	        context_data=[],
  	        context_data_val=0,
  	        context_data_position=0,
  	        ii;

  	    for (ii = 0; ii < uncompressed.length; ii += 1) {
  	      context_c = uncompressed.charAt(ii);
  	      if (!Object.prototype.hasOwnProperty.call(context_dictionary,context_c)) {
  	        context_dictionary[context_c] = context_dictSize++;
  	        context_dictionaryToCreate[context_c] = true;
  	      }

  	      context_wc = context_w + context_c;
  	      if (Object.prototype.hasOwnProperty.call(context_dictionary,context_wc)) {
  	        context_w = context_wc;
  	      } else {
  	        if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate,context_w)) {
  	          if (context_w.charCodeAt(0)<256) {
  	            for (i=0 ; i<context_numBits ; i++) {
  	              context_data_val = (context_data_val << 1);
  	              if (context_data_position == bitsPerChar-1) {
  	                context_data_position = 0;
  	                context_data.push(getCharFromInt(context_data_val));
  	                context_data_val = 0;
  	              } else {
  	                context_data_position++;
  	              }
  	            }
  	            value = context_w.charCodeAt(0);
  	            for (i=0 ; i<8 ; i++) {
  	              context_data_val = (context_data_val << 1) | (value&1);
  	              if (context_data_position == bitsPerChar-1) {
  	                context_data_position = 0;
  	                context_data.push(getCharFromInt(context_data_val));
  	                context_data_val = 0;
  	              } else {
  	                context_data_position++;
  	              }
  	              value = value >> 1;
  	            }
  	          } else {
  	            value = 1;
  	            for (i=0 ; i<context_numBits ; i++) {
  	              context_data_val = (context_data_val << 1) | value;
  	              if (context_data_position ==bitsPerChar-1) {
  	                context_data_position = 0;
  	                context_data.push(getCharFromInt(context_data_val));
  	                context_data_val = 0;
  	              } else {
  	                context_data_position++;
  	              }
  	              value = 0;
  	            }
  	            value = context_w.charCodeAt(0);
  	            for (i=0 ; i<16 ; i++) {
  	              context_data_val = (context_data_val << 1) | (value&1);
  	              if (context_data_position == bitsPerChar-1) {
  	                context_data_position = 0;
  	                context_data.push(getCharFromInt(context_data_val));
  	                context_data_val = 0;
  	              } else {
  	                context_data_position++;
  	              }
  	              value = value >> 1;
  	            }
  	          }
  	          context_enlargeIn--;
  	          if (context_enlargeIn == 0) {
  	            context_enlargeIn = Math.pow(2, context_numBits);
  	            context_numBits++;
  	          }
  	          delete context_dictionaryToCreate[context_w];
  	        } else {
  	          value = context_dictionary[context_w];
  	          for (i=0 ; i<context_numBits ; i++) {
  	            context_data_val = (context_data_val << 1) | (value&1);
  	            if (context_data_position == bitsPerChar-1) {
  	              context_data_position = 0;
  	              context_data.push(getCharFromInt(context_data_val));
  	              context_data_val = 0;
  	            } else {
  	              context_data_position++;
  	            }
  	            value = value >> 1;
  	          }


  	        }
  	        context_enlargeIn--;
  	        if (context_enlargeIn == 0) {
  	          context_enlargeIn = Math.pow(2, context_numBits);
  	          context_numBits++;
  	        }
  	        // Add wc to the dictionary.
  	        context_dictionary[context_wc] = context_dictSize++;
  	        context_w = String(context_c);
  	      }
  	    }

  	    // Output the code for w.
  	    if (context_w !== "") {
  	      if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate,context_w)) {
  	        if (context_w.charCodeAt(0)<256) {
  	          for (i=0 ; i<context_numBits ; i++) {
  	            context_data_val = (context_data_val << 1);
  	            if (context_data_position == bitsPerChar-1) {
  	              context_data_position = 0;
  	              context_data.push(getCharFromInt(context_data_val));
  	              context_data_val = 0;
  	            } else {
  	              context_data_position++;
  	            }
  	          }
  	          value = context_w.charCodeAt(0);
  	          for (i=0 ; i<8 ; i++) {
  	            context_data_val = (context_data_val << 1) | (value&1);
  	            if (context_data_position == bitsPerChar-1) {
  	              context_data_position = 0;
  	              context_data.push(getCharFromInt(context_data_val));
  	              context_data_val = 0;
  	            } else {
  	              context_data_position++;
  	            }
  	            value = value >> 1;
  	          }
  	        } else {
  	          value = 1;
  	          for (i=0 ; i<context_numBits ; i++) {
  	            context_data_val = (context_data_val << 1) | value;
  	            if (context_data_position == bitsPerChar-1) {
  	              context_data_position = 0;
  	              context_data.push(getCharFromInt(context_data_val));
  	              context_data_val = 0;
  	            } else {
  	              context_data_position++;
  	            }
  	            value = 0;
  	          }
  	          value = context_w.charCodeAt(0);
  	          for (i=0 ; i<16 ; i++) {
  	            context_data_val = (context_data_val << 1) | (value&1);
  	            if (context_data_position == bitsPerChar-1) {
  	              context_data_position = 0;
  	              context_data.push(getCharFromInt(context_data_val));
  	              context_data_val = 0;
  	            } else {
  	              context_data_position++;
  	            }
  	            value = value >> 1;
  	          }
  	        }
  	        context_enlargeIn--;
  	        if (context_enlargeIn == 0) {
  	          context_enlargeIn = Math.pow(2, context_numBits);
  	          context_numBits++;
  	        }
  	        delete context_dictionaryToCreate[context_w];
  	      } else {
  	        value = context_dictionary[context_w];
  	        for (i=0 ; i<context_numBits ; i++) {
  	          context_data_val = (context_data_val << 1) | (value&1);
  	          if (context_data_position == bitsPerChar-1) {
  	            context_data_position = 0;
  	            context_data.push(getCharFromInt(context_data_val));
  	            context_data_val = 0;
  	          } else {
  	            context_data_position++;
  	          }
  	          value = value >> 1;
  	        }


  	      }
  	      context_enlargeIn--;
  	      if (context_enlargeIn == 0) {
  	        context_enlargeIn = Math.pow(2, context_numBits);
  	        context_numBits++;
  	      }
  	    }

  	    // Mark the end of the stream
  	    value = 2;
  	    for (i=0 ; i<context_numBits ; i++) {
  	      context_data_val = (context_data_val << 1) | (value&1);
  	      if (context_data_position == bitsPerChar-1) {
  	        context_data_position = 0;
  	        context_data.push(getCharFromInt(context_data_val));
  	        context_data_val = 0;
  	      } else {
  	        context_data_position++;
  	      }
  	      value = value >> 1;
  	    }

  	    // Flush the last char
  	    while (true) {
  	      context_data_val = (context_data_val << 1);
  	      if (context_data_position == bitsPerChar-1) {
  	        context_data.push(getCharFromInt(context_data_val));
  	        break;
  	      }
  	      else context_data_position++;
  	    }
  	    return context_data.join('');
  	  },

  	  decompress: function (compressed) {
  	    if (compressed == null) return "";
  	    if (compressed == "") return null;
  	    return LZString._decompress(compressed.length, 32768, function(index) { return compressed.charCodeAt(index); });
  	  },

  	  _decompress: function (length, resetValue, getNextValue) {
  	    var dictionary = [],
  	        enlargeIn = 4,
  	        dictSize = 4,
  	        numBits = 3,
  	        entry = "",
  	        result = [],
  	        i,
  	        w,
  	        bits, resb, maxpower, power,
  	        c,
  	        data = {val:getNextValue(0), position:resetValue, index:1};

  	    for (i = 0; i < 3; i += 1) {
  	      dictionary[i] = i;
  	    }

  	    bits = 0;
  	    maxpower = Math.pow(2,2);
  	    power=1;
  	    while (power!=maxpower) {
  	      resb = data.val & data.position;
  	      data.position >>= 1;
  	      if (data.position == 0) {
  	        data.position = resetValue;
  	        data.val = getNextValue(data.index++);
  	      }
  	      bits |= (resb>0 ? 1 : 0) * power;
  	      power <<= 1;
  	    }

  	    switch (bits) {
  	      case 0:
  	          bits = 0;
  	          maxpower = Math.pow(2,8);
  	          power=1;
  	          while (power!=maxpower) {
  	            resb = data.val & data.position;
  	            data.position >>= 1;
  	            if (data.position == 0) {
  	              data.position = resetValue;
  	              data.val = getNextValue(data.index++);
  	            }
  	            bits |= (resb>0 ? 1 : 0) * power;
  	            power <<= 1;
  	          }
  	        c = f(bits);
  	        break;
  	      case 1:
  	          bits = 0;
  	          maxpower = Math.pow(2,16);
  	          power=1;
  	          while (power!=maxpower) {
  	            resb = data.val & data.position;
  	            data.position >>= 1;
  	            if (data.position == 0) {
  	              data.position = resetValue;
  	              data.val = getNextValue(data.index++);
  	            }
  	            bits |= (resb>0 ? 1 : 0) * power;
  	            power <<= 1;
  	          }
  	        c = f(bits);
  	        break;
  	      case 2:
  	        return "";
  	    }
  	    dictionary[3] = c;
  	    w = c;
  	    result.push(c);
  	    while (true) {
  	      if (data.index > length) {
  	        return "";
  	      }

  	      bits = 0;
  	      maxpower = Math.pow(2,numBits);
  	      power=1;
  	      while (power!=maxpower) {
  	        resb = data.val & data.position;
  	        data.position >>= 1;
  	        if (data.position == 0) {
  	          data.position = resetValue;
  	          data.val = getNextValue(data.index++);
  	        }
  	        bits |= (resb>0 ? 1 : 0) * power;
  	        power <<= 1;
  	      }

  	      switch (c = bits) {
  	        case 0:
  	          bits = 0;
  	          maxpower = Math.pow(2,8);
  	          power=1;
  	          while (power!=maxpower) {
  	            resb = data.val & data.position;
  	            data.position >>= 1;
  	            if (data.position == 0) {
  	              data.position = resetValue;
  	              data.val = getNextValue(data.index++);
  	            }
  	            bits |= (resb>0 ? 1 : 0) * power;
  	            power <<= 1;
  	          }

  	          dictionary[dictSize++] = f(bits);
  	          c = dictSize-1;
  	          enlargeIn--;
  	          break;
  	        case 1:
  	          bits = 0;
  	          maxpower = Math.pow(2,16);
  	          power=1;
  	          while (power!=maxpower) {
  	            resb = data.val & data.position;
  	            data.position >>= 1;
  	            if (data.position == 0) {
  	              data.position = resetValue;
  	              data.val = getNextValue(data.index++);
  	            }
  	            bits |= (resb>0 ? 1 : 0) * power;
  	            power <<= 1;
  	          }
  	          dictionary[dictSize++] = f(bits);
  	          c = dictSize-1;
  	          enlargeIn--;
  	          break;
  	        case 2:
  	          return result.join('');
  	      }

  	      if (enlargeIn == 0) {
  	        enlargeIn = Math.pow(2, numBits);
  	        numBits++;
  	      }

  	      if (dictionary[c]) {
  	        entry = dictionary[c];
  	      } else {
  	        if (c === dictSize) {
  	          entry = w + w.charAt(0);
  	        } else {
  	          return null;
  	        }
  	      }
  	      result.push(entry);

  	      // Add w+entry[0] to the dictionary.
  	      dictionary[dictSize++] = w + entry.charAt(0);
  	      enlargeIn--;

  	      w = entry;

  	      if (enlargeIn == 0) {
  	        enlargeIn = Math.pow(2, numBits);
  	        numBits++;
  	      }

  	    }
  	  }
  	};
  	  return LZString;
  	})();

  	if( module != null ) {
  	  module.exports = LZString;
  	}
  } (lzString));

  var _globalThis$1 = function (Object) {
    function get() {
      var _global = this || self;
      delete Object.prototype.__magic__;
      return _global;
    }
    if (typeof globalThis === "object") {
      return globalThis;
    }
    if (this) {
      return get();
    } else {
      Object.defineProperty(Object.prototype, "__magic__", {
        configurable: true,
        get: get
      });
      var _global = __magic__;
      return _global;
    }
  }(Object);
  var TAG$1 = '[main-thread-dead-monitor][weblog]';
  var MAX_LOG_ENTRIES_PER_REQUEST = 500; // 每次请求发500个日志

  var getIndexedDBRSupport = function getIndexedDBRSupport() {
    try {
      return !!(_globalThis$1.indexedDB && _globalThis$1.IDBTransaction && _globalThis$1.IDBKeyRange);
    } catch (e) {
      return false;
    }
  };
  function isWithinTheTime(ts, startTs, endTs) {
    return ts >= startTs && ts <= endTs;
  }
  var dbLogToLog = function dbLogToLog() {
    var cursorValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var log = {};
    var data = cursorValue.data,
      ts = cursorValue._t,
      sessionId = cursorValue._s,
      namespace = cursorValue._n;
    try {
      var dataStr = lzString.exports.decompressFromEncodedURIComponent(data);
      log = dataStr && JSON.parse(dataStr);
    } catch (e) {}
    log.ts = ts;
    log.sessionId = sessionId;
    log.type = namespace;
    return log;
  };

  /**
   * 新版本 SDK 兼容老版本数据的辅助函数
   * @param {any} item - 日志对象
   * @returns {boolean} 是否为老版本日志对象
   */
  function isOldLog(item) {
    return item && Array.isArray(item.data);
  }

  /**
   * 兼容不同版本的日志数据
   * @param {ILog[]} logs - 日志数组
   * @returns {ILog[]} 返回兼容后的日志数组
   */
  function getCompatibleLogs(logs) {
    return logs.map(function (item) {
      if (isOldLog(item)) {
        var data = item.data || [];
        data.unshift(item.msg);
        item.msg = JSON.stringify(data);
      }
      return {
        ts: item.ts,
        sessionId: item.sessionId,
        level: item.level,
        msg: String(item.msg),
        type: item.type
      };
    });
  }
  function getUUID() {
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0;
      var v = c === 'x' ? r : r & 0x3 | 0x8;
      return v.toString(16);
    });
  }

  /**
   * 附加项目 ID 查询参数到 URL
   * @private
   * @param {string} url - 基础 URL
   * @param {PID} [pid] - 项目 ID
   * @returns {string} 返回附加了项目 ID 查询参数的 URL
   */
  var appendPidQueryParam = function appendPidQueryParam(url, pid) {
    return "".concat(url, "?pid=").concat(pid !== null && pid !== void 0 ? pid : '');
  };
  function hasOwnProperty(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }

  // 请求接口前缀
  var CGI_PATH = 'https://at.idqqimg.com/api/v1/open/';
  // 上报日志接口
  var REPORT_CGI = "".concat(CGI_PATH, "log");
  var CHECK_CAN_REPORT_CGI = "".concat(CGI_PATH, "report");
  var makeParam = function makeParam(paramObj) {
    var paramArray = [];
    for (var key in paramObj) {
      if (hasOwnProperty(paramObj, key)) {
        paramArray.push("".concat(key, "=").concat(encodeURIComponent(paramObj[key])));
      }
    }
    return paramArray.join('&');
  };
  function makeHeaders(xhr, headers) {
    var ajaxType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';
    if (!xhr.setRequestHeader) {
      return;
    }
    if (ajaxType === 'GET' || ajaxType === 'POST') {
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    }
    headers = headers || {};
    for (var key in headers) {
      if (hasOwnProperty(headers, key)) {
        xhr.setRequestHeader(key, headers[key]);
      }
    }
  }
  var makeXhrFields = function makeXhrFields(xhr) {
    var xhrFields = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      withCredentials: false
    };
    xhr.withCredentials = !!xhrFields.withCredentials;
  };
  function sendReq(options, callbacks) {
    var xhr = new XMLHttpRequest();
    if (!xhr) {
      throw new Error('XMLHttp is not defined');
    }
    var timeout = options.timeout,
      _options$dataType = options.dataType,
      dataType = _options$dataType === void 0 ? 'json' : _options$dataType;
    // 设置timeout
    // ie10不支持
    try {
      if (timeout) {
        xhr.timeout = timeout;
      }
    } catch (error) {
      console.error(TAG$1, 'sendReq error', error);
    }
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var _callbacks$success;
          var data = xhr.responseText;
          if (dataType === 'json') {
            data = JSON.parse(xhr.responseText);
          }
          callbacks === null || callbacks === void 0 || (_callbacks$success = callbacks.success) === null || _callbacks$success === void 0 || _callbacks$success.call(callbacks, data);
        } else {
          var _callbacks$error;
          callbacks === null || callbacks === void 0 || (_callbacks$error = callbacks.error) === null || _callbacks$error === void 0 || _callbacks$error.call(callbacks, {
            errCode: xhr.status
          });
        }
      }
    };
    xhr.onerror = function () {
      var _callbacks$error2;
      callbacks === null || callbacks === void 0 || (_callbacks$error2 = callbacks.error) === null || _callbacks$error2 === void 0 || _callbacks$error2.call(callbacks, {
        errCode: -1
      });
    };
    xhr.ontimeout = function () {
      var _callbacks$error3;
      callbacks === null || callbacks === void 0 || (_callbacks$error3 = callbacks.error) === null || _callbacks$error3 === void 0 || _callbacks$error3.call(callbacks, {
        errCode: -2
      });
    };
    return xhr;
  }
  function ajaxPost(options) {
    return new Promise(function (resolve, reject) {
      var url = options.url;
      var paramString = '';
      var xhr = sendReq(options, {
        success: function success(data) {
          resolve(data);
        },
        error: function error(err) {
          reject(err);
        }
      });
      if (!xhr) {
        return;
      }
      xhr.open('POST', url, true);
      if (options.contentType === 'json') {
        paramString = JSON.stringify(options.param);
        xhr.setRequestHeader('Content-Type', 'application/json');
      } else {
        paramString = makeParam(options.param || {});
        makeXhrFields(xhr, options.xhrFields);
        makeHeaders(xhr, options.headers || {}, 'POST');
      }
      xhr.send(paramString);
    });
  }
  var createDb = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var _globalThis$clientVar;
      var webLogConfig, dbName;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (getIndexedDBRSupport()) {
              _context.next = 2;
              break;
            }
            return _context.abrupt("return");
          case 2:
            webLogConfig = (_globalThis$clientVar = _globalThis$1.clientVars) === null || _globalThis$clientVar === void 0 ? void 0 : _globalThis$clientVar.webLogConfig;
            if (webLogConfig) {
              _context.next = 6;
              break;
            }
            console.error(TAG$1, 'createdb but no webLogConfig', _globalThis$1.clientVars);
            return _context.abrupt("return");
          case 6:
            dbName = webLogConfig.dbName;
            _context.next = 9;
            return new Promise(function (resolve, reject) {
              var request = _globalThis$1.indexedDB.open(dbName);
              request.onerror = function (event) {
                console.error(TAG$1, 'db request error', event);
                reject('db request error');
              };
              // This event is triggered when the upgradeneeded should be triggered because of a version change
              // but the database is still in use (that is, not closed) somewhere, even after the versionchange event was sent.
              request.onblocked = function () {
                console.error(TAG$1, 'db request block');
                reject('db request block');
              };
              request.onsuccess = function (event) {
                var db = event.target.result;
                console.info(TAG$1, 'db request success');
                db.onclose = function (event) {
                  return console.info(TAG$1, 'db close', event);
                };
                db.onabort = function (event) {
                  return console.error(TAG$1, 'db abort', event);
                };
                db.onerror = function (event) {
                  return console.error(TAG$1, 'db error', event);
                };
                resolve(db);
              };
            });
          case 9:
            return _context.abrupt("return", _context.sent);
          case 10:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function createDb() {
      return _ref.apply(this, arguments);
    };
  }();
  var queryLogByTs = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(startTs, endTs) {
      var db, result;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return createDb();
          case 2:
            db = _context2.sent;
            if (db) {
              _context2.next = 5;
              break;
            }
            return _context2.abrupt("return");
          case 5:
            _context2.prev = 5;
            _context2.next = 8;
            return new Promise(function (resolve, reject) {
              var transaction = db.transaction(['logs'], 'readonly');
              transaction.onerror = function () {
                return reject(new Error('Transaction error'));
              };
              transaction.onabort = function () {
                return reject(new Error('Transaction abort'));
              };
              var objectStore = transaction.objectStore('logs');
              var logs = [];
              var cursor = objectStore.openCursor();
              cursor.onerror = function () {
                return reject(new Error('Cursor error'));
              };
              cursor.onsuccess = function (event) {
                var cursor = event.target.result;
                if (cursor) {
                  // 不存在值或不在查询时间范围中的日志，则跳过
                  if (!cursor.value || !isWithinTheTime(cursor.value._t, startTs, endTs)) {
                    return cursor["continue"]();
                  }
                  // 收集查询到的日志
                  logs.push(dbLogToLog(cursor.value));
                  cursor["continue"]();
                } else {
                  // 结合 cacheLogSet 返回查询的日志结果
                  resolve(logs);
                }
              };
            });
          case 8:
            result = _context2.sent;
            return _context2.abrupt("return", result);
          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](5);
            console.error("".concat(TAG$1, " queryLogByTs error:"), _context2.t0);
            throw _context2.t0;
          case 16:
            _context2.prev = 16;
            db.close();
            return _context2.finish(16);
          case 19:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[5, 12, 16, 19]]);
    }));
    return function queryLogByTs(_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }();
  var executeSendLogBatch = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(logs, pid, uid, params) {
      var fragmentId, searchType, reserve2, isUserReport, field, data;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            fragmentId = params.fragmentId, searchType = params.searchType, reserve2 = params.reserve2, isUserReport = params.isUserReport;
            field = logs.length ? ['ts', 'sessionId', 'level', 'msg', 'reserve1'] : [];
            data = {
              uid: uid,
              pid: pid,
              field: field,
              from: searchType,
              reserve2: reserve2,
              isUserReport: isUserReport,
              // 片段的最后一条记录带上 fragmentId 表示该片段上报完成
              fragmentId: logs.length < MAX_LOG_ENTRIES_PER_REQUEST ? fragmentId : 0,
              log: logs.map(function (_ref4) {
                var ts = _ref4.ts,
                  sessionId = _ref4.sessionId,
                  level = _ref4.level,
                  msg = _ref4.msg,
                  type = _ref4.type;
                return [ts, sessionId, level, msg, type];
              })
            };
            return _context3.abrupt("return", ajaxPost({
              url: appendPidQueryParam(REPORT_CGI, data.pid),
              param: {
                lz: lzString.exports.compressToEncodedURIComponent(JSON.stringify(data))
              }
            })["catch"](function (err) {
              console.error(TAG$1, 'executeSendLogBatch error', data, err);
              return {
                code: 'TRANSPORT_ERROR',
                message: err.message,
                originalError: err
              };
            }));
          case 4:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    return function executeSendLogBatch(_x3, _x4, _x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }();
  var _executeSendLogBatchWithRetry = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(logs, pid, uid, params) {
      var retries,
        delay,
        result,
        _args4 = arguments;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            retries = _args4.length > 4 && _args4[4] !== undefined ? _args4[4] : 3;
            delay = _args4.length > 5 && _args4[5] !== undefined ? _args4[5] : 1000;
            _context4.prev = 2;
            _context4.next = 5;
            return executeSendLogBatch(logs, pid, uid, params);
          case 5:
            result = _context4.sent;
            return _context4.abrupt("return", result);
          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](2);
            if (!(retries > 0)) {
              _context4.next = 15;
              break;
            }
            _context4.next = 14;
            return new Promise(function (res) {
              return setTimeout(res, delay);
            });
          case 14:
            return _context4.abrupt("return", _executeSendLogBatchWithRetry(logs, pid, uid, params, retries - 1, delay * 2));
          case 15:
            throw _context4.t0;
          case 16:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[2, 9]]);
    }));
    return function executeSendLogBatchWithRetry(_x7, _x8, _x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }();

  /**
   * 分批处理日志
   * @private
   * @param {ILog[]} logs - 日志数组
   * @returns {ILog[][]} 返回分批处理后的日志数组
   */
  var batchLogs = function batchLogs(logs) {
    var result = [];
    for (var i = 0; i < logs.length; i += MAX_LOG_ENTRIES_PER_REQUEST) {
      result.push(logs.slice(i, i + MAX_LOG_ENTRIES_PER_REQUEST));
    }
    return result;
  };

  /**
   * 发送日志批次
   * @private
   * @param {ILog[]} logs - 日志数组
   * @param {PID | undefined} pid - 项目 ID
   * @param {IReportParams} params - 上报参数
   * @returns {Promise<unknown>} 返回上报结果的 Promise
   */
  var sendLogBatch = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(logs, pid, uid, params) {
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            return _context5.abrupt("return", new Promise(function (resolve, reject) {
              _executeSendLogBatchWithRetry(logs, pid, uid, params).then(resolve)["catch"](reject);
            }));
          case 1:
          case "end":
            return _context5.stop();
        }
      }, _callee5);
    }));
    return function sendLogBatch(_x11, _x12, _x13, _x14) {
      return _ref6.apply(this, arguments);
    };
  }();
  var sendLogs = /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(logs, pid, uid, params) {
      var batchedLogs, promises;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            batchedLogs = batchLogs(getCompatibleLogs(logs || []));
            promises = batchedLogs.map(function (batch) {
              return sendLogBatch(batch, pid, uid, params);
            });
            console.info(TAG$1, 'sendLogs', batchedLogs.length, params.reserve2);
            return _context6.abrupt("return", Promise.all(promises));
          case 4:
          case "end":
            return _context6.stop();
        }
      }, _callee6);
    }));
    return function sendLogs(_x15, _x16, _x17, _x18) {
      return _ref7.apply(this, arguments);
    };
  }();

  /**
   * 创建上报请求
   * @private
   * @param {string} key - 键值
   * @param {PID} pid - 项目 ID
   * @param {ICanReportParams} params - 判断是否可以上报的参数
   * @returns {Promise<boolean>} 返回是否可以上报的 Promise
   */
  var createReportRequest = function createReportRequest(_ref8) {
    var key = _ref8.key,
      uid = _ref8.uid,
      pid = _ref8.pid,
      reportId = _ref8.reportId,
      docId = _ref8.docId,
      release = _ref8.release,
      sessionId = _ref8.sessionId,
      webLogVersion = _ref8.webLogVersion;
    return ajaxPost({
      url: CHECK_CAN_REPORT_CGI,
      param: {
        key: key,
        type: 'log',
        uid: uid,
        pid: pid,
        reportId: reportId,
        docId: docId,
        release: release,
        value: JSON.stringify({
          options: {
            query: {
              sessionId: sessionId
            },
            reportId: reportId,
            sessionId: sessionId,
            release: release,
            docId: docId,
            reportPid: pid
          },
          uid: uid,
          pid: pid,
          v: webLogVersion
        })
      }
    }).then(function (data) {
      return !!data.result;
    })["catch"](function () {
      return false;
    });
  };
  var reportLog = /*#__PURE__*/function () {
    var _ref9 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(reportKey, startTime, endTime) {
      var _globalThis$clientVar2, _yield$queryLogByTs, _globalThis$clientVar3, _globalThis$clientVar4, _globalThis$clientVar5;
      var webLogConfig, logs, reportId, canReport;
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            webLogConfig = (_globalThis$clientVar2 = _globalThis$1.clientVars) === null || _globalThis$clientVar2 === void 0 ? void 0 : _globalThis$clientVar2.webLogConfig;
            if (!(!webLogConfig || !webLogConfig.sessionId)) {
              _context7.next = 4;
              break;
            }
            console.error(TAG$1, 'report log but no webLogConfig', webLogConfig);
            return _context7.abrupt("return");
          case 4:
            _context7.next = 6;
            return queryLogByTs(startTime, endTime);
          case 6:
            _context7.t1 = _yield$queryLogByTs = _context7.sent;
            _context7.t0 = _context7.t1 === null;
            if (_context7.t0) {
              _context7.next = 10;
              break;
            }
            _context7.t0 = _yield$queryLogByTs === void 0;
          case 10:
            if (!_context7.t0) {
              _context7.next = 14;
              break;
            }
            _context7.t2 = void 0;
            _context7.next = 15;
            break;
          case 14:
            _context7.t2 = _yield$queryLogByTs.filter(function (log) {
              return log.sessionId === webLogConfig.sessionId;
            });
          case 15:
            logs = _context7.t2;
            if (logs) {
              _context7.next = 19;
              break;
            }
            console.error(TAG$1, 'report log but no logs');
            return _context7.abrupt("return");
          case 19:
            reportId = getUUID();
            _context7.next = 22;
            return createReportRequest({
              key: reportKey,
              reportId: reportId,
              pid: webLogConfig.pid,
              uid: webLogConfig.uid,
              docId: (_globalThis$clientVar3 = _globalThis$1.clientVars) === null || _globalThis$clientVar3 === void 0 ? void 0 : _globalThis$clientVar3.padId,
              release: (_globalThis$clientVar4 = _globalThis$1.clientVars) === null || _globalThis$clientVar4 === void 0 ? void 0 : _globalThis$clientVar4.webVersion,
              sessionId: webLogConfig.sessionId,
              webLogVersion: webLogConfig.webLogVersion
            });
          case 22:
            canReport = _context7.sent;
            if (canReport) {
              _context7.next = 26;
              break;
            }
            console.error(TAG$1, 'can not report', {
              reportId: reportId,
              sessionId: webLogConfig.sessionId
            });
            return _context7.abrupt("return");
          case 26:
            _context7.next = 28;
            return sendLogs(logs, webLogConfig.pid, webLogConfig.uid, {
              reserve2: reportId,
              isUserReport: false
            });
          case 28:
            console.info(TAG$1, 'report log ends', {
              reportId: reportId,
              sessionId: (_globalThis$clientVar5 = _globalThis$1.clientVars) === null || _globalThis$clientVar5 === void 0 || (_globalThis$clientVar5 = _globalThis$clientVar5.webLogConfig) === null || _globalThis$clientVar5 === void 0 ? void 0 : _globalThis$clientVar5.sessionId
            });
            return _context7.abrupt("return", reportId);
          case 30:
          case "end":
            return _context7.stop();
        }
      }, _callee7);
    }));
    return function reportLog(_x19, _x20, _x21) {
      return _ref9.apply(this, arguments);
    };
  }();

  var _globalThis = function (Object) {
    function get() {
      var _global = this || self;
      delete Object.prototype.__magic__;
      return _global;
    }
    if (typeof globalThis === "object") {
      return globalThis;
    }
    if (this) {
      return get();
    } else {
      Object.defineProperty(Object.prototype, "__magic__", {
        configurable: true,
        get: get
      });
      var _global = __magic__;
      return _global;
    }
  }(Object);
  var TAG = '[main-thread-dead-monitor][worker-thread]';
  var defaultWebLogKey = 'main_thread_dead';
  var DeadMonitorWorkerThread = /*#__PURE__*/function () {
    function DeadMonitorWorkerThread() {
      _classCallCheck(this, DeadMonitorWorkerThread);
      _defineProperty(this, "operateStack", []);
      _defineProperty(this, "operateLogLimit", DefaultOperateLogLimit);
      _defineProperty(this, "needReportWeblog", false);
      _defineProperty(this, "webLogKey", defaultWebLogKey);
      _defineProperty(this, "pageActiveTimeLimit", DefaultPageActiveTimeLimit);
      _defineProperty(this, "cubeKeyMap", void 0);
      _defineProperty(this, "checkTimeoutHandle", void 0);
      _defineProperty(this, "isStop", true);
      _defineProperty(this, "controller", void 0);
      _defineProperty(this, "lastActiveTime", Date.now());
      _defineProperty(this, "lastHeartBeatTime", 0);
      this.controller = new Controller(
      // @ts-ignore
      self, TAG);
      this.init();
      // 通知主线程已经初始化完毕
      this.controller.request(ActionType.WorkerInited);
    }

    /**
     * 开始心跳检查
     */
    return _createClass(DeadMonitorWorkerThread, [{
      key: "init",
      value: function init() {
        var _this = this;
        this.controller.addActionHandler(ActionType.SyncData, function (_ref) {
          var clientVars = _ref.clientVars,
            url = _ref.url,
            config = _ref.config;
          if (config && _this.isStop) {
            var _config$deadTimeout = config.deadTimeout,
              deadTimeout = _config$deadTimeout === void 0 ? 60000 : _config$deadTimeout,
              cubeBizId = config.cubeBizId,
              _config$operateLogLim = config.operateLogLimit,
              operateLogLimit = _config$operateLogLim === void 0 ? DefaultOperateLogLimit : _config$operateLogLim,
              _config$pageActiveTim = config.pageActiveTimeLimit,
              pageActiveTimeLimit = _config$pageActiveTim === void 0 ? DefaultPageActiveTimeLimit : _config$pageActiveTim,
              _config$needReportWeb = config.needReportWeblog,
              needReportWeblog = _config$needReportWeb === void 0 ? false : _config$needReportWeb,
              _config$webLogKey = config.webLogKey,
              webLogKey = _config$webLogKey === void 0 ? defaultWebLogKey : _config$webLogKey,
              cubeKeyMap = config.cubeKeyMap;
            _this.operateLogLimit = operateLogLimit;
            _this.needReportWeblog = needReportWeblog;
            _this.webLogKey = webLogKey;
            _this.pageActiveTimeLimit = pageActiveTimeLimit;
            _this.cubeKeyMap = cubeKeyMap;
            _this.isStop = false;
            var actualCheckHealthTimer;
            var dealWithHeartBeat = function dealWithHeartBeat() {
              _this.lastHeartBeatTime = Date.now();
              actualCheckHealthTimer && clearTimeout(actualCheckHealthTimer);
              actualCheckHealthTimer = undefined;
              if (_this.isStop) {
                return;
              }
              _this.checkTimeoutHandle && clearTimeout(_this.checkTimeoutHandle);
              _this.checkTimeoutHandle = setTimeout(function () {
                _this.checkTimeoutHandle && clearTimeout(_this.checkTimeoutHandle);

                // 这里触发完了之后，延迟一点上报，如果中间过程又有心跳来了，取消这次上报
                // 这里的场景是，每5秒一次心跳，30秒没心跳上报卡死，但是低电量等场景浏览器会把settimeout精度统一节流，导致心跳和卡死的都在30秒或者一分钟同时执行
                // 这时心跳和卡死上报可能一前一后触发，这里通过这个机制保证一下
                var reportTime = Date.now();
                actualCheckHealthTimer && clearTimeout(actualCheckHealthTimer);
                actualCheckHealthTimer = setTimeout(function () {
                  // 页面很久不活跃了，不认为卡顿，可能是页面冻结之类的
                  if (Date.now() - _this.lastActiveTime >= _this.pageActiveTimeLimit) {
                    return;
                  }
                  _this.checkHealth(cubeBizId, reportTime);
                }, 5000);
              }, deadTimeout);
            };
            _this.controller.addActionHandler(ActionType.HeartBeatTestForMainThreadDie, dealWithHeartBeat);
            // 主动触发一次，开启卡死监控
            dealWithHeartBeat();
          }
          if (clientVars) {
            _globalThis.clientVars = clientVars;
          }
          if (url && _globalThis.clientVars) {
            _globalThis.clientVars.href = url;
          }
        });
        this.controller.addActionHandler(ActionType.OperateLog, function (logItem) {
          if (_this.operateStack.length > _this.operateLogLimit) {
            _this.operateStack.shift();
          }
          _this.operateStack.push(logItem);
        });
        this.controller.addActionHandler(ActionType.UpdateActiveTime, function (activeTime) {
          _this.lastActiveTime = activeTime;
        });
      }

      /**
       * 停止心跳检查
       */
    }, {
      key: "stop",
      value: function stop() {
        this.isStop = true;
        this.checkTimeoutHandle && clearTimeout(this.checkTimeoutHandle);
      }
    }, {
      key: "reportLog",
      value: function () {
        var _reportLog2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          var hour, validHours, result;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                if (this.lastHeartBeatTime) {
                  _context.next = 3;
                  break;
                }
                console.error(TAG, 'report log but no lastHeartBeatTime');
                return _context.abrupt("return");
              case 3:
                hour = new Date().getHours(); // 避免非工作时间的误报把日志上报限额占满了
                validHours = [[9, 12], [14, 18]];
                if (validHours.some(function (range) {
                  return hour >= range[0] && hour < range[1];
                })) {
                  _context.next = 8;
                  break;
                }
                console.info(TAG, 'report log but not in valid ranges', validHours);
                return _context.abrupt("return");
              case 8:
                _context.prev = 8;
                _context.next = 11;
                return reportLog(this.webLogKey, this.lastHeartBeatTime - 1 * 60000,
                // 上次心跳前1分钟开始
                Date.now() + 5000);
              case 11:
                result = _context.sent;
                return _context.abrupt("return", result);
              case 15:
                _context.prev = 15;
                _context.t0 = _context["catch"](8);
                console.error(TAG, 'reportLog error', _context.t0);
              case 18:
              case "end":
                return _context.stop();
            }
          }, _callee, this, [[8, 15]]);
        }));
        function reportLog$1() {
          return _reportLog2.apply(this, arguments);
        }
        return reportLog$1;
      }()
      /**
       * 检查 worker 健康
       */
    }, {
      key: "checkHealth",
      value: (function () {
        var _checkHealth = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(cubeBizId, reportTime) {
          var _globalThis$clientVar, _globalThis$clientVar2, _globalThis$clientVar3;
          var logId, mid;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                this.stop();
                logId = undefined;
                if (!this.needReportWeblog) {
                  _context2.next = 6;
                  break;
                }
                _context2.next = 5;
                return Promise.race([this.reportLog(),
                // 防止超时
                new Promise(function (resolve) {
                  return setTimeout(function () {
                    return resolve;
                  }, 60000);
                })]);
              case 5:
                logId = _context2.sent;
              case 6:
                mid = Math.ceil(this.operateLogLimit / 2);
                simpleCubeForWorker(cubeBizId, {
                  module: 'webworker',
                  opername: 'main-thread-dead',
                  // 这个不encode不知道为什么cube会报错
                  str1: (_globalThis$clientVar = _globalThis.clientVars) !== null && _globalThis$clientVar !== void 0 && _globalThis$clientVar.href ? encodeURIComponent(_globalThis.clientVars.href) : '',
                  str2: JSON.stringify(this.operateStack.slice(0, mid)),
                  str3: JSON.stringify(this.operateStack.slice(mid)),
                  str4: (_globalThis$clientVar2 = _globalThis.clientVars) !== null && _globalThis$clientVar2 !== void 0 && (_globalThis$clientVar2 = _globalThis$clientVar2.webLogConfig) !== null && _globalThis$clientVar2 !== void 0 && _globalThis$clientVar2.sessionId && logId ? "".concat((_globalThis$clientVar3 = _globalThis.clientVars) === null || _globalThis$clientVar3 === void 0 || (_globalThis$clientVar3 = _globalThis$clientVar3.webLogConfig) === null || _globalThis$clientVar3 === void 0 ? void 0 : _globalThis$clientVar3.sessionId, "_").concat(logId) : undefined,
                  value1: reportTime
                }, reportTime, this.cubeKeyMap);
              case 8:
              case "end":
                return _context2.stop();
            }
          }, _callee2, this);
        }));
        function checkHealth(_x, _x2) {
          return _checkHealth.apply(this, arguments);
        }
        return checkHealth;
      }())
    }], [{
      key: "getInstance",
      value: function getInstance() {
        if (!this.instance) {
          this.instance = new DeadMonitorWorkerThread();
        }
        return this.instance;
      }
    }]);
  }();
  _defineProperty(DeadMonitorWorkerThread, "instance", void 0);
  _globalThis.deadMonitorWorkerThreadInstance = DeadMonitorWorkerThread.getInstance();

  exports.DeadMonitorWorkerThread = DeadMonitorWorkerThread;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({});
