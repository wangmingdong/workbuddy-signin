import { n as __esmMin, r as __exportAll } from "./chunk-BRZcfu7K.js";
//#region ../../node_modules/rxjs/node_modules/tslib/tslib.es6.js
function __extends(d, b) {
	extendStatics(d, b);
	function __() {
		this.constructor = d;
	}
	d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var extendStatics;
var init_tslib_es6 = __esmMin((() => {
	extendStatics = function(d, b) {
		extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
			d.__proto__ = b;
		} || function(d, b) {
			for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
		};
		return extendStatics(d, b);
	};
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/util/isFunction.js
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function isFunction(x) {
	return typeof x === "function";
}
var init_isFunction = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/config.js
var _enable_super_gross_mode_that_will_cause_bad_things, config;
var init_config = __esmMin((() => {
	_enable_super_gross_mode_that_will_cause_bad_things = false;
	config = {
		Promise: void 0,
		set useDeprecatedSynchronousErrorHandling(value) {
			if (value) "" + (/* @__PURE__ */ new Error()).stack;
			else if (_enable_super_gross_mode_that_will_cause_bad_things) {}
			_enable_super_gross_mode_that_will_cause_bad_things = value;
		},
		get useDeprecatedSynchronousErrorHandling() {
			return _enable_super_gross_mode_that_will_cause_bad_things;
		}
	};
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/util/hostReportError.js
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function hostReportError(err) {
	setTimeout(function() {
		throw err;
	}, 0);
}
var init_hostReportError = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/Observer.js
var empty$1;
var init_Observer = __esmMin((() => {
	init_config();
	init_hostReportError();
	empty$1 = {
		closed: true,
		next: function(value) {},
		error: function(err) {
			if (config.useDeprecatedSynchronousErrorHandling) throw err;
			else hostReportError(err);
		},
		complete: function() {}
	};
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/util/isArray.js
var isArray;
var init_isArray = __esmMin((() => {
	isArray = /* @__PURE__ */ (function() {
		return Array.isArray || (function(x) {
			return x && typeof x.length === "number";
		});
	})();
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/util/isObject.js
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function isObject(x) {
	return x !== null && typeof x === "object";
}
var init_isObject = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/util/UnsubscriptionError.js
var UnsubscriptionErrorImpl, UnsubscriptionError;
var init_UnsubscriptionError = __esmMin((() => {
	UnsubscriptionErrorImpl = /* @__PURE__ */ (function() {
		function UnsubscriptionErrorImpl(errors) {
			Error.call(this);
			this.message = errors ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function(err, i) {
				return i + 1 + ") " + err.toString();
			}).join("\n  ") : "";
			this.name = "UnsubscriptionError";
			this.errors = errors;
			return this;
		}
		UnsubscriptionErrorImpl.prototype = /* @__PURE__ */ Object.create(Error.prototype);
		return UnsubscriptionErrorImpl;
	})();
	UnsubscriptionError = UnsubscriptionErrorImpl;
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/Subscription.js
function flattenUnsubscriptionErrors(errors) {
	return errors.reduce(function(errs, err) {
		return errs.concat(err instanceof UnsubscriptionError ? err.errors : err);
	}, []);
}
var Subscription;
var init_Subscription = __esmMin((() => {
	init_isArray();
	init_isObject();
	init_isFunction();
	init_UnsubscriptionError();
	Subscription = /* @__PURE__ */ function() {
		function Subscription(unsubscribe) {
			this.closed = false;
			this._parentOrParents = null;
			this._subscriptions = null;
			if (unsubscribe) {
				this._ctorUnsubscribe = true;
				this._unsubscribe = unsubscribe;
			}
		}
		Subscription.prototype.unsubscribe = function() {
			var errors;
			if (this.closed) return;
			var _a = this, _parentOrParents = _a._parentOrParents, _ctorUnsubscribe = _a._ctorUnsubscribe, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
			this.closed = true;
			this._parentOrParents = null;
			this._subscriptions = null;
			if (_parentOrParents instanceof Subscription) _parentOrParents.remove(this);
			else if (_parentOrParents !== null) for (var index = 0; index < _parentOrParents.length; ++index) _parentOrParents[index].remove(this);
			if (isFunction(_unsubscribe)) {
				if (_ctorUnsubscribe) this._unsubscribe = void 0;
				try {
					_unsubscribe.call(this);
				} catch (e) {
					errors = e instanceof UnsubscriptionError ? flattenUnsubscriptionErrors(e.errors) : [e];
				}
			}
			if (isArray(_subscriptions)) {
				var index = -1;
				var len = _subscriptions.length;
				while (++index < len) {
					var sub = _subscriptions[index];
					if (isObject(sub)) try {
						sub.unsubscribe();
					} catch (e) {
						errors = errors || [];
						if (e instanceof UnsubscriptionError) errors = errors.concat(flattenUnsubscriptionErrors(e.errors));
						else errors.push(e);
					}
				}
			}
			if (errors) throw new UnsubscriptionError(errors);
		};
		Subscription.prototype.add = function(teardown) {
			var subscription = teardown;
			if (!teardown) return Subscription.EMPTY;
			switch (typeof teardown) {
				case "function": subscription = new Subscription(teardown);
				case "object":
					if (subscription === this || subscription.closed || typeof subscription.unsubscribe !== "function") return subscription;
					else if (this.closed) {
						subscription.unsubscribe();
						return subscription;
					} else if (!(subscription instanceof Subscription)) {
						var tmp = subscription;
						subscription = new Subscription();
						subscription._subscriptions = [tmp];
					}
					break;
				default: throw new Error("unrecognized teardown " + teardown + " added to Subscription.");
			}
			var _parentOrParents = subscription._parentOrParents;
			if (_parentOrParents === null) subscription._parentOrParents = this;
			else if (_parentOrParents instanceof Subscription) {
				if (_parentOrParents === this) return subscription;
				subscription._parentOrParents = [_parentOrParents, this];
			} else if (_parentOrParents.indexOf(this) === -1) _parentOrParents.push(this);
			else return subscription;
			var subscriptions = this._subscriptions;
			if (subscriptions === null) this._subscriptions = [subscription];
			else subscriptions.push(subscription);
			return subscription;
		};
		Subscription.prototype.remove = function(subscription) {
			var subscriptions = this._subscriptions;
			if (subscriptions) {
				var subscriptionIndex = subscriptions.indexOf(subscription);
				if (subscriptionIndex !== -1) subscriptions.splice(subscriptionIndex, 1);
			}
		};
		Subscription.EMPTY = function(empty) {
			empty.closed = true;
			return empty;
		}(new Subscription());
		return Subscription;
	}();
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/symbol/rxSubscriber.js
var rxSubscriber;
var init_rxSubscriber = __esmMin((() => {
	rxSubscriber = /* @__PURE__ */ (function() {
		return typeof Symbol === "function" ? /* @__PURE__ */ Symbol("rxSubscriber") : "@@rxSubscriber_" + /* @__PURE__ */ Math.random();
	})();
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/Subscriber.js
var Subscriber, SafeSubscriber;
var init_Subscriber = __esmMin((() => {
	init_tslib_es6();
	init_isFunction();
	init_Observer();
	init_Subscription();
	init_rxSubscriber();
	init_config();
	init_hostReportError();
	Subscriber = /* @__PURE__ */ function(_super) {
		__extends(Subscriber, _super);
		function Subscriber(destinationOrNext, error, complete) {
			var _this = _super.call(this) || this;
			_this.syncErrorValue = null;
			_this.syncErrorThrown = false;
			_this.syncErrorThrowable = false;
			_this.isStopped = false;
			switch (arguments.length) {
				case 0:
					_this.destination = empty$1;
					break;
				case 1:
					if (!destinationOrNext) {
						_this.destination = empty$1;
						break;
					}
					if (typeof destinationOrNext === "object") {
						if (destinationOrNext instanceof Subscriber) {
							_this.syncErrorThrowable = destinationOrNext.syncErrorThrowable;
							_this.destination = destinationOrNext;
							destinationOrNext.add(_this);
						} else {
							_this.syncErrorThrowable = true;
							_this.destination = new SafeSubscriber(_this, destinationOrNext);
						}
						break;
					}
				default:
					_this.syncErrorThrowable = true;
					_this.destination = new SafeSubscriber(_this, destinationOrNext, error, complete);
					break;
			}
			return _this;
		}
		Subscriber.prototype[rxSubscriber] = function() {
			return this;
		};
		Subscriber.create = function(next, error, complete) {
			var subscriber = new Subscriber(next, error, complete);
			subscriber.syncErrorThrowable = false;
			return subscriber;
		};
		Subscriber.prototype.next = function(value) {
			if (!this.isStopped) this._next(value);
		};
		Subscriber.prototype.error = function(err) {
			if (!this.isStopped) {
				this.isStopped = true;
				this._error(err);
			}
		};
		Subscriber.prototype.complete = function() {
			if (!this.isStopped) {
				this.isStopped = true;
				this._complete();
			}
		};
		Subscriber.prototype.unsubscribe = function() {
			if (this.closed) return;
			this.isStopped = true;
			_super.prototype.unsubscribe.call(this);
		};
		Subscriber.prototype._next = function(value) {
			this.destination.next(value);
		};
		Subscriber.prototype._error = function(err) {
			this.destination.error(err);
			this.unsubscribe();
		};
		Subscriber.prototype._complete = function() {
			this.destination.complete();
			this.unsubscribe();
		};
		Subscriber.prototype._unsubscribeAndRecycle = function() {
			var _parentOrParents = this._parentOrParents;
			this._parentOrParents = null;
			this.unsubscribe();
			this.closed = false;
			this.isStopped = false;
			this._parentOrParents = _parentOrParents;
			return this;
		};
		return Subscriber;
	}(Subscription);
	SafeSubscriber = /* @__PURE__ */ function(_super) {
		__extends(SafeSubscriber, _super);
		function SafeSubscriber(_parentSubscriber, observerOrNext, error, complete) {
			var _this = _super.call(this) || this;
			_this._parentSubscriber = _parentSubscriber;
			var next;
			var context = _this;
			if (isFunction(observerOrNext)) next = observerOrNext;
			else if (observerOrNext) {
				next = observerOrNext.next;
				error = observerOrNext.error;
				complete = observerOrNext.complete;
				if (observerOrNext !== empty$1) {
					context = Object.create(observerOrNext);
					if (isFunction(context.unsubscribe)) _this.add(context.unsubscribe.bind(context));
					context.unsubscribe = _this.unsubscribe.bind(_this);
				}
			}
			_this._context = context;
			_this._next = next;
			_this._error = error;
			_this._complete = complete;
			return _this;
		}
		SafeSubscriber.prototype.next = function(value) {
			if (!this.isStopped && this._next) {
				var _parentSubscriber = this._parentSubscriber;
				if (!config.useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) this.__tryOrUnsub(this._next, value);
				else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) this.unsubscribe();
			}
		};
		SafeSubscriber.prototype.error = function(err) {
			if (!this.isStopped) {
				var _parentSubscriber = this._parentSubscriber;
				var useDeprecatedSynchronousErrorHandling = config.useDeprecatedSynchronousErrorHandling;
				if (this._error) if (!useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
					this.__tryOrUnsub(this._error, err);
					this.unsubscribe();
				} else {
					this.__tryOrSetError(_parentSubscriber, this._error, err);
					this.unsubscribe();
				}
				else if (!_parentSubscriber.syncErrorThrowable) {
					this.unsubscribe();
					if (useDeprecatedSynchronousErrorHandling) throw err;
					hostReportError(err);
				} else {
					if (useDeprecatedSynchronousErrorHandling) {
						_parentSubscriber.syncErrorValue = err;
						_parentSubscriber.syncErrorThrown = true;
					} else hostReportError(err);
					this.unsubscribe();
				}
			}
		};
		SafeSubscriber.prototype.complete = function() {
			var _this = this;
			if (!this.isStopped) {
				var _parentSubscriber = this._parentSubscriber;
				if (this._complete) {
					var wrappedComplete = function() {
						return _this._complete.call(_this._context);
					};
					if (!config.useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
						this.__tryOrUnsub(wrappedComplete);
						this.unsubscribe();
					} else {
						this.__tryOrSetError(_parentSubscriber, wrappedComplete);
						this.unsubscribe();
					}
				} else this.unsubscribe();
			}
		};
		SafeSubscriber.prototype.__tryOrUnsub = function(fn, value) {
			try {
				fn.call(this._context, value);
			} catch (err) {
				this.unsubscribe();
				if (config.useDeprecatedSynchronousErrorHandling) throw err;
				else hostReportError(err);
			}
		};
		SafeSubscriber.prototype.__tryOrSetError = function(parent, fn, value) {
			if (!config.useDeprecatedSynchronousErrorHandling) throw new Error("bad call");
			try {
				fn.call(this._context, value);
			} catch (err) {
				if (config.useDeprecatedSynchronousErrorHandling) {
					parent.syncErrorValue = err;
					parent.syncErrorThrown = true;
					return true;
				} else {
					hostReportError(err);
					return true;
				}
			}
			return false;
		};
		SafeSubscriber.prototype._unsubscribe = function() {
			var _parentSubscriber = this._parentSubscriber;
			this._context = null;
			this._parentSubscriber = null;
			_parentSubscriber.unsubscribe();
		};
		return SafeSubscriber;
	}(Subscriber);
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/util/canReportError.js
function canReportError(observer) {
	while (observer) {
		var _a = observer, closed_1 = _a.closed, destination = _a.destination, isStopped = _a.isStopped;
		if (closed_1 || isStopped) return false;
		else if (destination && destination instanceof Subscriber) observer = destination;
		else observer = null;
	}
	return true;
}
var init_canReportError = __esmMin((() => {
	init_Subscriber();
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/util/toSubscriber.js
function toSubscriber(nextOrObserver, error, complete) {
	if (nextOrObserver) {
		if (nextOrObserver instanceof Subscriber) return nextOrObserver;
		if (nextOrObserver[rxSubscriber]) return nextOrObserver[rxSubscriber]();
	}
	if (!nextOrObserver && !error && !complete) return new Subscriber(empty$1);
	return new Subscriber(nextOrObserver, error, complete);
}
var init_toSubscriber = __esmMin((() => {
	init_Subscriber();
	init_rxSubscriber();
	init_Observer();
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/symbol/observable.js
var observable;
var init_observable = __esmMin((() => {
	observable = /* @__PURE__ */ (function() {
		return typeof Symbol === "function" && Symbol.observable || "@@observable";
	})();
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/util/identity.js
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function identity(x) {
	return x;
}
var init_identity = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/util/pipe.js
function pipe() {
	var fns = [];
	for (var _i = 0; _i < arguments.length; _i++) fns[_i] = arguments[_i];
	return pipeFromArray(fns);
}
function pipeFromArray(fns) {
	if (fns.length === 0) return identity;
	if (fns.length === 1) return fns[0];
	return function piped(input) {
		return fns.reduce(function(prev, fn) {
			return fn(prev);
		}, input);
	};
}
var init_pipe = __esmMin((() => {
	init_identity();
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/Observable.js
function getPromiseCtor(promiseCtor) {
	if (!promiseCtor) promiseCtor = config.Promise || Promise;
	if (!promiseCtor) throw new Error("no Promise impl found");
	return promiseCtor;
}
var Observable;
var init_Observable = __esmMin((() => {
	init_canReportError();
	init_toSubscriber();
	init_observable();
	init_pipe();
	init_config();
	Observable = /* @__PURE__ */ function() {
		function Observable(subscribe) {
			this._isScalar = false;
			if (subscribe) this._subscribe = subscribe;
		}
		Observable.prototype.lift = function(operator) {
			var observable = new Observable();
			observable.source = this;
			observable.operator = operator;
			return observable;
		};
		Observable.prototype.subscribe = function(observerOrNext, error, complete) {
			var operator = this.operator;
			var sink = toSubscriber(observerOrNext, error, complete);
			if (operator) sink.add(operator.call(sink, this.source));
			else sink.add(this.source || config.useDeprecatedSynchronousErrorHandling && !sink.syncErrorThrowable ? this._subscribe(sink) : this._trySubscribe(sink));
			if (config.useDeprecatedSynchronousErrorHandling) {
				if (sink.syncErrorThrowable) {
					sink.syncErrorThrowable = false;
					if (sink.syncErrorThrown) throw sink.syncErrorValue;
				}
			}
			return sink;
		};
		Observable.prototype._trySubscribe = function(sink) {
			try {
				return this._subscribe(sink);
			} catch (err) {
				if (config.useDeprecatedSynchronousErrorHandling) {
					sink.syncErrorThrown = true;
					sink.syncErrorValue = err;
				}
				if (canReportError(sink)) sink.error(err);
				else console.warn(err);
			}
		};
		Observable.prototype.forEach = function(next, promiseCtor) {
			var _this = this;
			promiseCtor = getPromiseCtor(promiseCtor);
			return new promiseCtor(function(resolve, reject) {
				var subscription = _this.subscribe(function(value) {
					try {
						next(value);
					} catch (err) {
						reject(err);
						if (subscription) subscription.unsubscribe();
					}
				}, reject, resolve);
			});
		};
		Observable.prototype._subscribe = function(subscriber) {
			var source = this.source;
			return source && source.subscribe(subscriber);
		};
		Observable.prototype[observable] = function() {
			return this;
		};
		Observable.prototype.pipe = function() {
			var operations = [];
			for (var _i = 0; _i < arguments.length; _i++) operations[_i] = arguments[_i];
			if (operations.length === 0) return this;
			return pipeFromArray(operations)(this);
		};
		Observable.prototype.toPromise = function(promiseCtor) {
			var _this = this;
			promiseCtor = getPromiseCtor(promiseCtor);
			return new promiseCtor(function(resolve, reject) {
				var value;
				_this.subscribe(function(x) {
					return value = x;
				}, function(err) {
					return reject(err);
				}, function() {
					return resolve(value);
				});
			});
		};
		Observable.create = function(subscribe) {
			return new Observable(subscribe);
		};
		return Observable;
	}();
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/util/ObjectUnsubscribedError.js
var ObjectUnsubscribedErrorImpl, ObjectUnsubscribedError;
var init_ObjectUnsubscribedError = __esmMin((() => {
	ObjectUnsubscribedErrorImpl = /* @__PURE__ */ (function() {
		function ObjectUnsubscribedErrorImpl() {
			Error.call(this);
			this.message = "object unsubscribed";
			this.name = "ObjectUnsubscribedError";
			return this;
		}
		ObjectUnsubscribedErrorImpl.prototype = /* @__PURE__ */ Object.create(Error.prototype);
		return ObjectUnsubscribedErrorImpl;
	})();
	ObjectUnsubscribedError = ObjectUnsubscribedErrorImpl;
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/SubjectSubscription.js
var SubjectSubscription;
var init_SubjectSubscription = __esmMin((() => {
	init_tslib_es6();
	init_Subscription();
	SubjectSubscription = /* @__PURE__ */ function(_super) {
		__extends(SubjectSubscription, _super);
		function SubjectSubscription(subject, subscriber) {
			var _this = _super.call(this) || this;
			_this.subject = subject;
			_this.subscriber = subscriber;
			_this.closed = false;
			return _this;
		}
		SubjectSubscription.prototype.unsubscribe = function() {
			if (this.closed) return;
			this.closed = true;
			var subject = this.subject;
			var observers = subject.observers;
			this.subject = null;
			if (!observers || observers.length === 0 || subject.isStopped || subject.closed) return;
			var subscriberIndex = observers.indexOf(this.subscriber);
			if (subscriberIndex !== -1) observers.splice(subscriberIndex, 1);
		};
		return SubjectSubscription;
	}(Subscription);
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/Subject.js
var SubjectSubscriber, Subject, AnonymousSubject;
var init_Subject = __esmMin((() => {
	init_tslib_es6();
	init_Observable();
	init_Subscriber();
	init_Subscription();
	init_ObjectUnsubscribedError();
	init_SubjectSubscription();
	init_rxSubscriber();
	SubjectSubscriber = /* @__PURE__ */ function(_super) {
		__extends(SubjectSubscriber, _super);
		function SubjectSubscriber(destination) {
			var _this = _super.call(this, destination) || this;
			_this.destination = destination;
			return _this;
		}
		return SubjectSubscriber;
	}(Subscriber);
	Subject = /* @__PURE__ */ function(_super) {
		__extends(Subject, _super);
		function Subject() {
			var _this = _super.call(this) || this;
			_this.observers = [];
			_this.closed = false;
			_this.isStopped = false;
			_this.hasError = false;
			_this.thrownError = null;
			return _this;
		}
		Subject.prototype[rxSubscriber] = function() {
			return new SubjectSubscriber(this);
		};
		Subject.prototype.lift = function(operator) {
			var subject = new AnonymousSubject(this, this);
			subject.operator = operator;
			return subject;
		};
		Subject.prototype.next = function(value) {
			if (this.closed) throw new ObjectUnsubscribedError();
			if (!this.isStopped) {
				var observers = this.observers;
				var len = observers.length;
				var copy = observers.slice();
				for (var i = 0; i < len; i++) copy[i].next(value);
			}
		};
		Subject.prototype.error = function(err) {
			if (this.closed) throw new ObjectUnsubscribedError();
			this.hasError = true;
			this.thrownError = err;
			this.isStopped = true;
			var observers = this.observers;
			var len = observers.length;
			var copy = observers.slice();
			for (var i = 0; i < len; i++) copy[i].error(err);
			this.observers.length = 0;
		};
		Subject.prototype.complete = function() {
			if (this.closed) throw new ObjectUnsubscribedError();
			this.isStopped = true;
			var observers = this.observers;
			var len = observers.length;
			var copy = observers.slice();
			for (var i = 0; i < len; i++) copy[i].complete();
			this.observers.length = 0;
		};
		Subject.prototype.unsubscribe = function() {
			this.isStopped = true;
			this.closed = true;
			this.observers = null;
		};
		Subject.prototype._trySubscribe = function(subscriber) {
			if (this.closed) throw new ObjectUnsubscribedError();
			else return _super.prototype._trySubscribe.call(this, subscriber);
		};
		Subject.prototype._subscribe = function(subscriber) {
			if (this.closed) throw new ObjectUnsubscribedError();
			else if (this.hasError) {
				subscriber.error(this.thrownError);
				return Subscription.EMPTY;
			} else if (this.isStopped) {
				subscriber.complete();
				return Subscription.EMPTY;
			} else {
				this.observers.push(subscriber);
				return new SubjectSubscription(this, subscriber);
			}
		};
		Subject.prototype.asObservable = function() {
			var observable = new Observable();
			observable.source = this;
			return observable;
		};
		Subject.create = function(destination, source) {
			return new AnonymousSubject(destination, source);
		};
		return Subject;
	}(Observable);
	AnonymousSubject = /* @__PURE__ */ function(_super) {
		__extends(AnonymousSubject, _super);
		function AnonymousSubject(destination, source) {
			var _this = _super.call(this) || this;
			_this.destination = destination;
			_this.source = source;
			return _this;
		}
		AnonymousSubject.prototype.next = function(value) {
			var destination = this.destination;
			if (destination && destination.next) destination.next(value);
		};
		AnonymousSubject.prototype.error = function(err) {
			var destination = this.destination;
			if (destination && destination.error) this.destination.error(err);
		};
		AnonymousSubject.prototype.complete = function() {
			var destination = this.destination;
			if (destination && destination.complete) this.destination.complete();
		};
		AnonymousSubject.prototype._subscribe = function(subscriber) {
			if (this.source) return this.source.subscribe(subscriber);
			else return Subscription.EMPTY;
		};
		return AnonymousSubject;
	}(Subject);
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/operators/refCount.js
function refCount() {
	return function refCountOperatorFunction(source) {
		return source.lift(new RefCountOperator(source));
	};
}
var RefCountOperator, RefCountSubscriber;
var init_refCount = __esmMin((() => {
	init_tslib_es6();
	init_Subscriber();
	RefCountOperator = /* @__PURE__ */ function() {
		function RefCountOperator(connectable) {
			this.connectable = connectable;
		}
		RefCountOperator.prototype.call = function(subscriber, source) {
			var connectable = this.connectable;
			connectable._refCount++;
			var refCounter = new RefCountSubscriber(subscriber, connectable);
			var subscription = source.subscribe(refCounter);
			if (!refCounter.closed) refCounter.connection = connectable.connect();
			return subscription;
		};
		return RefCountOperator;
	}();
	RefCountSubscriber = /* @__PURE__ */ function(_super) {
		__extends(RefCountSubscriber, _super);
		function RefCountSubscriber(destination, connectable) {
			var _this = _super.call(this, destination) || this;
			_this.connectable = connectable;
			return _this;
		}
		RefCountSubscriber.prototype._unsubscribe = function() {
			var connectable = this.connectable;
			if (!connectable) {
				this.connection = null;
				return;
			}
			this.connectable = null;
			var refCount = connectable._refCount;
			if (refCount <= 0) {
				this.connection = null;
				return;
			}
			connectable._refCount = refCount - 1;
			if (refCount > 1) {
				this.connection = null;
				return;
			}
			var connection = this.connection;
			var sharedConnection = connectable._connection;
			this.connection = null;
			if (sharedConnection && (!connection || sharedConnection === connection)) sharedConnection.unsubscribe();
		};
		return RefCountSubscriber;
	}(Subscriber);
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/observable/ConnectableObservable.js
var ConnectableObservable, ConnectableSubscriber;
var init_ConnectableObservable = __esmMin((() => {
	init_tslib_es6();
	init_Subject();
	init_Observable();
	init_Subscription();
	init_refCount();
	ConnectableObservable = /* @__PURE__ */ function(_super) {
		__extends(ConnectableObservable, _super);
		function ConnectableObservable(source, subjectFactory) {
			var _this = _super.call(this) || this;
			_this.source = source;
			_this.subjectFactory = subjectFactory;
			_this._refCount = 0;
			_this._isComplete = false;
			return _this;
		}
		ConnectableObservable.prototype._subscribe = function(subscriber) {
			return this.getSubject().subscribe(subscriber);
		};
		ConnectableObservable.prototype.getSubject = function() {
			var subject = this._subject;
			if (!subject || subject.isStopped) this._subject = this.subjectFactory();
			return this._subject;
		};
		ConnectableObservable.prototype.connect = function() {
			var connection = this._connection;
			if (!connection) {
				this._isComplete = false;
				connection = this._connection = new Subscription();
				connection.add(this.source.subscribe(new ConnectableSubscriber(this.getSubject(), this)));
				if (connection.closed) {
					this._connection = null;
					connection = Subscription.EMPTY;
				}
			}
			return connection;
		};
		ConnectableObservable.prototype.refCount = function() {
			return refCount()(this);
		};
		return ConnectableObservable;
	}(Observable);
	ConnectableSubscriber = /* @__PURE__ */ function(_super) {
		__extends(ConnectableSubscriber, _super);
		function ConnectableSubscriber(destination, connectable) {
			var _this = _super.call(this, destination) || this;
			_this.connectable = connectable;
			return _this;
		}
		ConnectableSubscriber.prototype._error = function(err) {
			this._unsubscribe();
			_super.prototype._error.call(this, err);
		};
		ConnectableSubscriber.prototype._complete = function() {
			this.connectable._isComplete = true;
			this._unsubscribe();
			_super.prototype._complete.call(this);
		};
		ConnectableSubscriber.prototype._unsubscribe = function() {
			var connectable = this.connectable;
			if (connectable) {
				this.connectable = null;
				var connection = connectable._connection;
				connectable._refCount = 0;
				connectable._subject = null;
				connectable._connection = null;
				if (connection) connection.unsubscribe();
			}
		};
		return ConnectableSubscriber;
	}(SubjectSubscriber);
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/operators/groupBy.js
var GroupedObservable, InnerRefCountSubscription;
var init_groupBy = __esmMin((() => {
	init_tslib_es6();
	init_Subscription();
	init_Observable();
	GroupedObservable = /* @__PURE__ */ function(_super) {
		__extends(GroupedObservable, _super);
		function GroupedObservable(key, groupSubject, refCountSubscription) {
			var _this = _super.call(this) || this;
			_this.key = key;
			_this.groupSubject = groupSubject;
			_this.refCountSubscription = refCountSubscription;
			return _this;
		}
		GroupedObservable.prototype._subscribe = function(subscriber) {
			var subscription = new Subscription();
			var _a = this, refCountSubscription = _a.refCountSubscription, groupSubject = _a.groupSubject;
			if (refCountSubscription && !refCountSubscription.closed) subscription.add(new InnerRefCountSubscription(refCountSubscription));
			subscription.add(groupSubject.subscribe(subscriber));
			return subscription;
		};
		return GroupedObservable;
	}(Observable);
	InnerRefCountSubscription = /* @__PURE__ */ function(_super) {
		__extends(InnerRefCountSubscription, _super);
		function InnerRefCountSubscription(parent) {
			var _this = _super.call(this) || this;
			_this.parent = parent;
			parent.count++;
			return _this;
		}
		InnerRefCountSubscription.prototype.unsubscribe = function() {
			var parent = this.parent;
			if (!parent.closed && !this.closed) {
				_super.prototype.unsubscribe.call(this);
				parent.count -= 1;
				if (parent.count === 0 && parent.attemptedToUnsubscribe) parent.unsubscribe();
			}
		};
		return InnerRefCountSubscription;
	}(Subscription);
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/BehaviorSubject.js
var BehaviorSubject;
var init_BehaviorSubject = __esmMin((() => {
	init_tslib_es6();
	init_Subject();
	init_ObjectUnsubscribedError();
	BehaviorSubject = /* @__PURE__ */ function(_super) {
		__extends(BehaviorSubject, _super);
		function BehaviorSubject(_value) {
			var _this = _super.call(this) || this;
			_this._value = _value;
			return _this;
		}
		Object.defineProperty(BehaviorSubject.prototype, "value", {
			get: function() {
				return this.getValue();
			},
			enumerable: true,
			configurable: true
		});
		BehaviorSubject.prototype._subscribe = function(subscriber) {
			var subscription = _super.prototype._subscribe.call(this, subscriber);
			if (subscription && !subscription.closed) subscriber.next(this._value);
			return subscription;
		};
		BehaviorSubject.prototype.getValue = function() {
			if (this.hasError) throw this.thrownError;
			else if (this.closed) throw new ObjectUnsubscribedError();
			else return this._value;
		};
		BehaviorSubject.prototype.next = function(value) {
			_super.prototype.next.call(this, this._value = value);
		};
		return BehaviorSubject;
	}(Subject);
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/scheduler/Action.js
var Action;
var init_Action = __esmMin((() => {
	init_tslib_es6();
	init_Subscription();
	Action = /* @__PURE__ */ function(_super) {
		__extends(Action, _super);
		function Action(scheduler, work) {
			return _super.call(this) || this;
		}
		Action.prototype.schedule = function(state, delay) {
			if (delay === void 0) delay = 0;
			return this;
		};
		return Action;
	}(Subscription);
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/scheduler/AsyncAction.js
var AsyncAction;
var init_AsyncAction = __esmMin((() => {
	init_tslib_es6();
	init_Action();
	AsyncAction = /* @__PURE__ */ function(_super) {
		__extends(AsyncAction, _super);
		function AsyncAction(scheduler, work) {
			var _this = _super.call(this, scheduler, work) || this;
			_this.scheduler = scheduler;
			_this.work = work;
			_this.pending = false;
			return _this;
		}
		AsyncAction.prototype.schedule = function(state, delay) {
			if (delay === void 0) delay = 0;
			if (this.closed) return this;
			this.state = state;
			var id = this.id;
			var scheduler = this.scheduler;
			if (id != null) this.id = this.recycleAsyncId(scheduler, id, delay);
			this.pending = true;
			this.delay = delay;
			this.id = this.id || this.requestAsyncId(scheduler, this.id, delay);
			return this;
		};
		AsyncAction.prototype.requestAsyncId = function(scheduler, id, delay) {
			if (delay === void 0) delay = 0;
			return setInterval(scheduler.flush.bind(scheduler, this), delay);
		};
		AsyncAction.prototype.recycleAsyncId = function(scheduler, id, delay) {
			if (delay === void 0) delay = 0;
			if (delay !== null && this.delay === delay && this.pending === false) return id;
			clearInterval(id);
		};
		AsyncAction.prototype.execute = function(state, delay) {
			if (this.closed) return /* @__PURE__ */ new Error("executing a cancelled action");
			this.pending = false;
			var error = this._execute(state, delay);
			if (error) return error;
			else if (this.pending === false && this.id != null) this.id = this.recycleAsyncId(this.scheduler, this.id, null);
		};
		AsyncAction.prototype._execute = function(state, delay) {
			var errored = false;
			var errorValue = void 0;
			try {
				this.work(state);
			} catch (e) {
				errored = true;
				errorValue = !!e && e || new Error(e);
			}
			if (errored) {
				this.unsubscribe();
				return errorValue;
			}
		};
		AsyncAction.prototype._unsubscribe = function() {
			var id = this.id;
			var scheduler = this.scheduler;
			var actions = scheduler.actions;
			var index = actions.indexOf(this);
			this.work = null;
			this.state = null;
			this.pending = false;
			this.scheduler = null;
			if (index !== -1) actions.splice(index, 1);
			if (id != null) this.id = this.recycleAsyncId(scheduler, id, null);
			this.delay = null;
		};
		return AsyncAction;
	}(Action);
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/scheduler/QueueAction.js
var QueueAction;
var init_QueueAction = __esmMin((() => {
	init_tslib_es6();
	init_AsyncAction();
	QueueAction = /* @__PURE__ */ function(_super) {
		__extends(QueueAction, _super);
		function QueueAction(scheduler, work) {
			var _this = _super.call(this, scheduler, work) || this;
			_this.scheduler = scheduler;
			_this.work = work;
			return _this;
		}
		QueueAction.prototype.schedule = function(state, delay) {
			if (delay === void 0) delay = 0;
			if (delay > 0) return _super.prototype.schedule.call(this, state, delay);
			this.delay = delay;
			this.state = state;
			this.scheduler.flush(this);
			return this;
		};
		QueueAction.prototype.execute = function(state, delay) {
			return delay > 0 || this.closed ? _super.prototype.execute.call(this, state, delay) : this._execute(state, delay);
		};
		QueueAction.prototype.requestAsyncId = function(scheduler, id, delay) {
			if (delay === void 0) delay = 0;
			if (delay !== null && delay > 0 || delay === null && this.delay > 0) return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
			return scheduler.flush(this);
		};
		return QueueAction;
	}(AsyncAction);
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/Scheduler.js
var Scheduler;
var init_Scheduler = __esmMin((() => {
	Scheduler = /* @__PURE__ */ function() {
		function Scheduler(SchedulerAction, now) {
			if (now === void 0) now = Scheduler.now;
			this.SchedulerAction = SchedulerAction;
			this.now = now;
		}
		Scheduler.prototype.schedule = function(work, delay, state) {
			if (delay === void 0) delay = 0;
			return new this.SchedulerAction(this, work).schedule(state, delay);
		};
		Scheduler.now = function() {
			return Date.now();
		};
		return Scheduler;
	}();
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/scheduler/AsyncScheduler.js
var AsyncScheduler;
var init_AsyncScheduler = __esmMin((() => {
	init_tslib_es6();
	init_Scheduler();
	AsyncScheduler = /* @__PURE__ */ function(_super) {
		__extends(AsyncScheduler, _super);
		function AsyncScheduler(SchedulerAction, now) {
			if (now === void 0) now = Scheduler.now;
			var _this = _super.call(this, SchedulerAction, function() {
				if (AsyncScheduler.delegate && AsyncScheduler.delegate !== _this) return AsyncScheduler.delegate.now();
				else return now();
			}) || this;
			_this.actions = [];
			_this.active = false;
			_this.scheduled = void 0;
			return _this;
		}
		AsyncScheduler.prototype.schedule = function(work, delay, state) {
			if (delay === void 0) delay = 0;
			if (AsyncScheduler.delegate && AsyncScheduler.delegate !== this) return AsyncScheduler.delegate.schedule(work, delay, state);
			else return _super.prototype.schedule.call(this, work, delay, state);
		};
		AsyncScheduler.prototype.flush = function(action) {
			var actions = this.actions;
			if (this.active) {
				actions.push(action);
				return;
			}
			var error;
			this.active = true;
			do
				if (error = action.execute(action.state, action.delay)) break;
			while (action = actions.shift());
			this.active = false;
			if (error) {
				while (action = actions.shift()) action.unsubscribe();
				throw error;
			}
		};
		return AsyncScheduler;
	}(Scheduler);
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/scheduler/QueueScheduler.js
var QueueScheduler;
var init_QueueScheduler = __esmMin((() => {
	init_tslib_es6();
	init_AsyncScheduler();
	QueueScheduler = /* @__PURE__ */ function(_super) {
		__extends(QueueScheduler, _super);
		function QueueScheduler() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		return QueueScheduler;
	}(AsyncScheduler);
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/scheduler/queue.js
var queueScheduler, queue;
var init_queue = __esmMin((() => {
	init_QueueAction();
	init_QueueScheduler();
	queueScheduler = /* @__PURE__ */ new QueueScheduler(QueueAction);
	queue = queueScheduler;
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/observable/empty.js
function empty(scheduler) {
	return scheduler ? emptyScheduled(scheduler) : EMPTY;
}
function emptyScheduled(scheduler) {
	return new Observable(function(subscriber) {
		return scheduler.schedule(function() {
			return subscriber.complete();
		});
	});
}
var EMPTY;
var init_empty = __esmMin((() => {
	init_Observable();
	EMPTY = /* @__PURE__ */ new Observable(function(subscriber) {
		return subscriber.complete();
	});
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/util/isScheduler.js
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function isScheduler(value) {
	return value && typeof value.schedule === "function";
}
var init_isScheduler = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/util/subscribeToArray.js
var subscribeToArray;
var init_subscribeToArray = __esmMin((() => {
	subscribeToArray = function(array) {
		return function(subscriber) {
			for (var i = 0, len = array.length; i < len && !subscriber.closed; i++) subscriber.next(array[i]);
			subscriber.complete();
		};
	};
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/scheduled/scheduleArray.js
function scheduleArray(input, scheduler) {
	return new Observable(function(subscriber) {
		var sub = new Subscription();
		var i = 0;
		sub.add(scheduler.schedule(function() {
			if (i === input.length) {
				subscriber.complete();
				return;
			}
			subscriber.next(input[i++]);
			if (!subscriber.closed) sub.add(this.schedule());
		}));
		return sub;
	});
}
var init_scheduleArray = __esmMin((() => {
	init_Observable();
	init_Subscription();
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/observable/fromArray.js
function fromArray(input, scheduler) {
	if (!scheduler) return new Observable(subscribeToArray(input));
	else return scheduleArray(input, scheduler);
}
var init_fromArray = __esmMin((() => {
	init_Observable();
	init_subscribeToArray();
	init_scheduleArray();
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/observable/of.js
function of() {
	var args = [];
	for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
	var scheduler = args[args.length - 1];
	if (isScheduler(scheduler)) {
		args.pop();
		return scheduleArray(args, scheduler);
	} else return fromArray(args);
}
var init_of = __esmMin((() => {
	init_isScheduler();
	init_fromArray();
	init_scheduleArray();
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/observable/throwError.js
function throwError(error, scheduler) {
	if (!scheduler) return new Observable(function(subscriber) {
		return subscriber.error(error);
	});
	else return new Observable(function(subscriber) {
		return scheduler.schedule(dispatch$7, 0, {
			error,
			subscriber
		});
	});
}
function dispatch$7(_a) {
	var error = _a.error;
	_a.subscriber.error(error);
}
var init_throwError = __esmMin((() => {
	init_Observable();
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/Notification.js
var NotificationKind, Notification;
var init_Notification = __esmMin((() => {
	init_empty();
	init_of();
	init_throwError();
	NotificationKind || (NotificationKind = {});
	Notification = /* @__PURE__ */ function() {
		function Notification(kind, value, error) {
			this.kind = kind;
			this.value = value;
			this.error = error;
			this.hasValue = kind === "N";
		}
		Notification.prototype.observe = function(observer) {
			switch (this.kind) {
				case "N": return observer.next && observer.next(this.value);
				case "E": return observer.error && observer.error(this.error);
				case "C": return observer.complete && observer.complete();
			}
		};
		Notification.prototype.do = function(next, error, complete) {
			switch (this.kind) {
				case "N": return next && next(this.value);
				case "E": return error && error(this.error);
				case "C": return complete && complete();
			}
		};
		Notification.prototype.accept = function(nextOrObserver, error, complete) {
			if (nextOrObserver && typeof nextOrObserver.next === "function") return this.observe(nextOrObserver);
			else return this.do(nextOrObserver, error, complete);
		};
		Notification.prototype.toObservable = function() {
			switch (this.kind) {
				case "N": return of(this.value);
				case "E": return throwError(this.error);
				case "C": return empty();
			}
			throw new Error("unexpected notification kind value");
		};
		Notification.createNext = function(value) {
			if (typeof value !== "undefined") return new Notification("N", value);
			return Notification.undefinedValueNotification;
		};
		Notification.createError = function(err) {
			return new Notification("E", void 0, err);
		};
		Notification.createComplete = function() {
			return Notification.completeNotification;
		};
		Notification.completeNotification = new Notification("C");
		Notification.undefinedValueNotification = new Notification("N", void 0);
		return Notification;
	}();
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/operators/observeOn.js
var ObserveOnSubscriber, ObserveOnMessage;
var init_observeOn = __esmMin((() => {
	init_tslib_es6();
	init_Subscriber();
	init_Notification();
	ObserveOnSubscriber = /* @__PURE__ */ function(_super) {
		__extends(ObserveOnSubscriber, _super);
		function ObserveOnSubscriber(destination, scheduler, delay) {
			if (delay === void 0) delay = 0;
			var _this = _super.call(this, destination) || this;
			_this.scheduler = scheduler;
			_this.delay = delay;
			return _this;
		}
		ObserveOnSubscriber.dispatch = function(arg) {
			var notification = arg.notification, destination = arg.destination;
			notification.observe(destination);
			this.unsubscribe();
		};
		ObserveOnSubscriber.prototype.scheduleMessage = function(notification) {
			this.destination.add(this.scheduler.schedule(ObserveOnSubscriber.dispatch, this.delay, new ObserveOnMessage(notification, this.destination)));
		};
		ObserveOnSubscriber.prototype._next = function(value) {
			this.scheduleMessage(Notification.createNext(value));
		};
		ObserveOnSubscriber.prototype._error = function(err) {
			this.scheduleMessage(Notification.createError(err));
			this.unsubscribe();
		};
		ObserveOnSubscriber.prototype._complete = function() {
			this.scheduleMessage(Notification.createComplete());
			this.unsubscribe();
		};
		return ObserveOnSubscriber;
	}(Subscriber);
	ObserveOnMessage = /* @__PURE__ */ function() {
		function ObserveOnMessage(notification, destination) {
			this.notification = notification;
			this.destination = destination;
		}
		return ObserveOnMessage;
	}();
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/ReplaySubject.js
var ReplaySubject, ReplayEvent;
var init_ReplaySubject = __esmMin((() => {
	init_tslib_es6();
	init_Subject();
	init_queue();
	init_Subscription();
	init_observeOn();
	init_ObjectUnsubscribedError();
	init_SubjectSubscription();
	ReplaySubject = /* @__PURE__ */ function(_super) {
		__extends(ReplaySubject, _super);
		function ReplaySubject(bufferSize, windowTime, scheduler) {
			if (bufferSize === void 0) bufferSize = Number.POSITIVE_INFINITY;
			if (windowTime === void 0) windowTime = Number.POSITIVE_INFINITY;
			var _this = _super.call(this) || this;
			_this.scheduler = scheduler;
			_this._events = [];
			_this._infiniteTimeWindow = false;
			_this._bufferSize = bufferSize < 1 ? 1 : bufferSize;
			_this._windowTime = windowTime < 1 ? 1 : windowTime;
			if (windowTime === Number.POSITIVE_INFINITY) {
				_this._infiniteTimeWindow = true;
				_this.next = _this.nextInfiniteTimeWindow;
			} else _this.next = _this.nextTimeWindow;
			return _this;
		}
		ReplaySubject.prototype.nextInfiniteTimeWindow = function(value) {
			if (!this.isStopped) {
				var _events = this._events;
				_events.push(value);
				if (_events.length > this._bufferSize) _events.shift();
			}
			_super.prototype.next.call(this, value);
		};
		ReplaySubject.prototype.nextTimeWindow = function(value) {
			if (!this.isStopped) {
				this._events.push(new ReplayEvent(this._getNow(), value));
				this._trimBufferThenGetEvents();
			}
			_super.prototype.next.call(this, value);
		};
		ReplaySubject.prototype._subscribe = function(subscriber) {
			var _infiniteTimeWindow = this._infiniteTimeWindow;
			var _events = _infiniteTimeWindow ? this._events : this._trimBufferThenGetEvents();
			var scheduler = this.scheduler;
			var len = _events.length;
			var subscription;
			if (this.closed) throw new ObjectUnsubscribedError();
			else if (this.isStopped || this.hasError) subscription = Subscription.EMPTY;
			else {
				this.observers.push(subscriber);
				subscription = new SubjectSubscription(this, subscriber);
			}
			if (scheduler) subscriber.add(subscriber = new ObserveOnSubscriber(subscriber, scheduler));
			if (_infiniteTimeWindow) for (var i = 0; i < len && !subscriber.closed; i++) subscriber.next(_events[i]);
			else for (var i = 0; i < len && !subscriber.closed; i++) subscriber.next(_events[i].value);
			if (this.hasError) subscriber.error(this.thrownError);
			else if (this.isStopped) subscriber.complete();
			return subscription;
		};
		ReplaySubject.prototype._getNow = function() {
			return (this.scheduler || queue).now();
		};
		ReplaySubject.prototype._trimBufferThenGetEvents = function() {
			var now = this._getNow();
			var _bufferSize = this._bufferSize;
			var _windowTime = this._windowTime;
			var _events = this._events;
			var eventsCount = _events.length;
			var spliceCount = 0;
			while (spliceCount < eventsCount) {
				if (now - _events[spliceCount].time < _windowTime) break;
				spliceCount++;
			}
			if (eventsCount > _bufferSize) spliceCount = Math.max(spliceCount, eventsCount - _bufferSize);
			if (spliceCount > 0) _events.splice(0, spliceCount);
			return _events;
		};
		return ReplaySubject;
	}(Subject);
	ReplayEvent = /* @__PURE__ */ function() {
		function ReplayEvent(time, value) {
			this.time = time;
			this.value = value;
		}
		return ReplayEvent;
	}();
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/AsyncSubject.js
var AsyncSubject;
var init_AsyncSubject = __esmMin((() => {
	init_tslib_es6();
	init_Subject();
	init_Subscription();
	AsyncSubject = /* @__PURE__ */ function(_super) {
		__extends(AsyncSubject, _super);
		function AsyncSubject() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.value = null;
			_this.hasNext = false;
			_this.hasCompleted = false;
			return _this;
		}
		AsyncSubject.prototype._subscribe = function(subscriber) {
			if (this.hasError) {
				subscriber.error(this.thrownError);
				return Subscription.EMPTY;
			} else if (this.hasCompleted && this.hasNext) {
				subscriber.next(this.value);
				subscriber.complete();
				return Subscription.EMPTY;
			}
			return _super.prototype._subscribe.call(this, subscriber);
		};
		AsyncSubject.prototype.next = function(value) {
			if (!this.hasCompleted) {
				this.value = value;
				this.hasNext = true;
			}
		};
		AsyncSubject.prototype.error = function(error) {
			if (!this.hasCompleted) _super.prototype.error.call(this, error);
		};
		AsyncSubject.prototype.complete = function() {
			this.hasCompleted = true;
			if (this.hasNext) _super.prototype.next.call(this, this.value);
			_super.prototype.complete.call(this);
		};
		return AsyncSubject;
	}(Subject);
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/util/Immediate.js
function findAndClearHandle(handle) {
	if (handle in activeHandles) {
		delete activeHandles[handle];
		return true;
	}
	return false;
}
var nextHandle, RESOLVED, activeHandles, Immediate;
var init_Immediate = __esmMin((() => {
	nextHandle = 1;
	RESOLVED = /* @__PURE__ */ (function() {
		return /* @__PURE__ */ Promise.resolve();
	})();
	activeHandles = {};
	Immediate = {
		setImmediate: function(cb) {
			var handle = nextHandle++;
			activeHandles[handle] = true;
			RESOLVED.then(function() {
				return findAndClearHandle(handle) && cb();
			});
			return handle;
		},
		clearImmediate: function(handle) {
			findAndClearHandle(handle);
		}
	};
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/scheduler/AsapAction.js
var AsapAction;
var init_AsapAction = __esmMin((() => {
	init_tslib_es6();
	init_Immediate();
	init_AsyncAction();
	AsapAction = /* @__PURE__ */ function(_super) {
		__extends(AsapAction, _super);
		function AsapAction(scheduler, work) {
			var _this = _super.call(this, scheduler, work) || this;
			_this.scheduler = scheduler;
			_this.work = work;
			return _this;
		}
		AsapAction.prototype.requestAsyncId = function(scheduler, id, delay) {
			if (delay === void 0) delay = 0;
			if (delay !== null && delay > 0) return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
			scheduler.actions.push(this);
			return scheduler.scheduled || (scheduler.scheduled = Immediate.setImmediate(scheduler.flush.bind(scheduler, null)));
		};
		AsapAction.prototype.recycleAsyncId = function(scheduler, id, delay) {
			if (delay === void 0) delay = 0;
			if (delay !== null && delay > 0 || delay === null && this.delay > 0) return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
			if (scheduler.actions.length === 0) {
				Immediate.clearImmediate(id);
				scheduler.scheduled = void 0;
			}
		};
		return AsapAction;
	}(AsyncAction);
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/scheduler/AsapScheduler.js
var AsapScheduler;
var init_AsapScheduler = __esmMin((() => {
	init_tslib_es6();
	init_AsyncScheduler();
	AsapScheduler = /* @__PURE__ */ function(_super) {
		__extends(AsapScheduler, _super);
		function AsapScheduler() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		AsapScheduler.prototype.flush = function(action) {
			this.active = true;
			this.scheduled = void 0;
			var actions = this.actions;
			var error;
			var index = -1;
			var count = actions.length;
			action = action || actions.shift();
			do
				if (error = action.execute(action.state, action.delay)) break;
			while (++index < count && (action = actions.shift()));
			this.active = false;
			if (error) {
				while (++index < count && (action = actions.shift())) action.unsubscribe();
				throw error;
			}
		};
		return AsapScheduler;
	}(AsyncScheduler);
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/scheduler/asap.js
var asapScheduler, asap;
var init_asap = __esmMin((() => {
	init_AsapAction();
	init_AsapScheduler();
	asapScheduler = /* @__PURE__ */ new AsapScheduler(AsapAction);
	asap = asapScheduler;
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/scheduler/async.js
var asyncScheduler, async;
var init_async = __esmMin((() => {
	init_AsyncAction();
	init_AsyncScheduler();
	asyncScheduler = /* @__PURE__ */ new AsyncScheduler(AsyncAction);
	async = asyncScheduler;
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/scheduler/AnimationFrameAction.js
var AnimationFrameAction;
var init_AnimationFrameAction = __esmMin((() => {
	init_tslib_es6();
	init_AsyncAction();
	AnimationFrameAction = /* @__PURE__ */ function(_super) {
		__extends(AnimationFrameAction, _super);
		function AnimationFrameAction(scheduler, work) {
			var _this = _super.call(this, scheduler, work) || this;
			_this.scheduler = scheduler;
			_this.work = work;
			return _this;
		}
		AnimationFrameAction.prototype.requestAsyncId = function(scheduler, id, delay) {
			if (delay === void 0) delay = 0;
			if (delay !== null && delay > 0) return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
			scheduler.actions.push(this);
			return scheduler.scheduled || (scheduler.scheduled = requestAnimationFrame(function() {
				return scheduler.flush(null);
			}));
		};
		AnimationFrameAction.prototype.recycleAsyncId = function(scheduler, id, delay) {
			if (delay === void 0) delay = 0;
			if (delay !== null && delay > 0 || delay === null && this.delay > 0) return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
			if (scheduler.actions.length === 0) {
				cancelAnimationFrame(id);
				scheduler.scheduled = void 0;
			}
		};
		return AnimationFrameAction;
	}(AsyncAction);
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/scheduler/AnimationFrameScheduler.js
var AnimationFrameScheduler;
var init_AnimationFrameScheduler = __esmMin((() => {
	init_tslib_es6();
	init_AsyncScheduler();
	AnimationFrameScheduler = /* @__PURE__ */ function(_super) {
		__extends(AnimationFrameScheduler, _super);
		function AnimationFrameScheduler() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		AnimationFrameScheduler.prototype.flush = function(action) {
			this.active = true;
			this.scheduled = void 0;
			var actions = this.actions;
			var error;
			var index = -1;
			var count = actions.length;
			action = action || actions.shift();
			do
				if (error = action.execute(action.state, action.delay)) break;
			while (++index < count && (action = actions.shift()));
			this.active = false;
			if (error) {
				while (++index < count && (action = actions.shift())) action.unsubscribe();
				throw error;
			}
		};
		return AnimationFrameScheduler;
	}(AsyncScheduler);
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/scheduler/animationFrame.js
var animationFrameScheduler, animationFrame;
var init_animationFrame = __esmMin((() => {
	init_AnimationFrameAction();
	init_AnimationFrameScheduler();
	animationFrameScheduler = /* @__PURE__ */ new AnimationFrameScheduler(AnimationFrameAction);
	animationFrame = animationFrameScheduler;
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/scheduler/VirtualTimeScheduler.js
var VirtualTimeScheduler, VirtualAction;
var init_VirtualTimeScheduler = __esmMin((() => {
	init_tslib_es6();
	init_AsyncAction();
	init_AsyncScheduler();
	VirtualTimeScheduler = /* @__PURE__ */ function(_super) {
		__extends(VirtualTimeScheduler, _super);
		function VirtualTimeScheduler(SchedulerAction, maxFrames) {
			if (SchedulerAction === void 0) SchedulerAction = VirtualAction;
			if (maxFrames === void 0) maxFrames = Number.POSITIVE_INFINITY;
			var _this = _super.call(this, SchedulerAction, function() {
				return _this.frame;
			}) || this;
			_this.maxFrames = maxFrames;
			_this.frame = 0;
			_this.index = -1;
			return _this;
		}
		VirtualTimeScheduler.prototype.flush = function() {
			var _a = this, actions = _a.actions, maxFrames = _a.maxFrames;
			var error, action;
			while ((action = actions[0]) && action.delay <= maxFrames) {
				actions.shift();
				this.frame = action.delay;
				if (error = action.execute(action.state, action.delay)) break;
			}
			if (error) {
				while (action = actions.shift()) action.unsubscribe();
				throw error;
			}
		};
		VirtualTimeScheduler.frameTimeFactor = 10;
		return VirtualTimeScheduler;
	}(AsyncScheduler);
	VirtualAction = /* @__PURE__ */ function(_super) {
		__extends(VirtualAction, _super);
		function VirtualAction(scheduler, work, index) {
			if (index === void 0) index = scheduler.index += 1;
			var _this = _super.call(this, scheduler, work) || this;
			_this.scheduler = scheduler;
			_this.work = work;
			_this.index = index;
			_this.active = true;
			_this.index = scheduler.index = index;
			return _this;
		}
		VirtualAction.prototype.schedule = function(state, delay) {
			if (delay === void 0) delay = 0;
			if (!this.id) return _super.prototype.schedule.call(this, state, delay);
			this.active = false;
			var action = new VirtualAction(this.scheduler, this.work);
			this.add(action);
			return action.schedule(state, delay);
		};
		VirtualAction.prototype.requestAsyncId = function(scheduler, id, delay) {
			if (delay === void 0) delay = 0;
			this.delay = scheduler.frame + delay;
			var actions = scheduler.actions;
			actions.push(this);
			actions.sort(VirtualAction.sortActions);
			return true;
		};
		VirtualAction.prototype.recycleAsyncId = function(scheduler, id, delay) {
			if (delay === void 0) delay = 0;
		};
		VirtualAction.prototype._execute = function(state, delay) {
			if (this.active === true) return _super.prototype._execute.call(this, state, delay);
		};
		VirtualAction.sortActions = function(a, b) {
			if (a.delay === b.delay) if (a.index === b.index) return 0;
			else if (a.index > b.index) return 1;
			else return -1;
			else if (a.delay > b.delay) return 1;
			else return -1;
		};
		return VirtualAction;
	}(AsyncAction);
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/util/noop.js
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function noop() {}
var init_noop = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/util/isObservable.js
function isObservable(obj) {
	return !!obj && (obj instanceof Observable || typeof obj.lift === "function" && typeof obj.subscribe === "function");
}
var init_isObservable = __esmMin((() => {
	init_Observable();
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/util/ArgumentOutOfRangeError.js
var ArgumentOutOfRangeErrorImpl, ArgumentOutOfRangeError;
var init_ArgumentOutOfRangeError = __esmMin((() => {
	ArgumentOutOfRangeErrorImpl = /* @__PURE__ */ (function() {
		function ArgumentOutOfRangeErrorImpl() {
			Error.call(this);
			this.message = "argument out of range";
			this.name = "ArgumentOutOfRangeError";
			return this;
		}
		ArgumentOutOfRangeErrorImpl.prototype = /* @__PURE__ */ Object.create(Error.prototype);
		return ArgumentOutOfRangeErrorImpl;
	})();
	ArgumentOutOfRangeError = ArgumentOutOfRangeErrorImpl;
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/util/EmptyError.js
var EmptyErrorImpl, EmptyError;
var init_EmptyError = __esmMin((() => {
	EmptyErrorImpl = /* @__PURE__ */ (function() {
		function EmptyErrorImpl() {
			Error.call(this);
			this.message = "no elements in sequence";
			this.name = "EmptyError";
			return this;
		}
		EmptyErrorImpl.prototype = /* @__PURE__ */ Object.create(Error.prototype);
		return EmptyErrorImpl;
	})();
	EmptyError = EmptyErrorImpl;
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/util/TimeoutError.js
var TimeoutErrorImpl, TimeoutError;
var init_TimeoutError = __esmMin((() => {
	TimeoutErrorImpl = /* @__PURE__ */ (function() {
		function TimeoutErrorImpl() {
			Error.call(this);
			this.message = "Timeout has occurred";
			this.name = "TimeoutError";
			return this;
		}
		TimeoutErrorImpl.prototype = /* @__PURE__ */ Object.create(Error.prototype);
		return TimeoutErrorImpl;
	})();
	TimeoutError = TimeoutErrorImpl;
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/operators/map.js
function map(project, thisArg) {
	return function mapOperation(source) {
		if (typeof project !== "function") throw new TypeError("argument is not a function. Are you looking for `mapTo()`?");
		return source.lift(new MapOperator(project, thisArg));
	};
}
var MapOperator, MapSubscriber;
var init_map = __esmMin((() => {
	init_tslib_es6();
	init_Subscriber();
	MapOperator = /* @__PURE__ */ function() {
		function MapOperator(project, thisArg) {
			this.project = project;
			this.thisArg = thisArg;
		}
		MapOperator.prototype.call = function(subscriber, source) {
			return source.subscribe(new MapSubscriber(subscriber, this.project, this.thisArg));
		};
		return MapOperator;
	}();
	MapSubscriber = /* @__PURE__ */ function(_super) {
		__extends(MapSubscriber, _super);
		function MapSubscriber(destination, project, thisArg) {
			var _this = _super.call(this, destination) || this;
			_this.project = project;
			_this.count = 0;
			_this.thisArg = thisArg || _this;
			return _this;
		}
		MapSubscriber.prototype._next = function(value) {
			var result;
			try {
				result = this.project.call(this.thisArg, value, this.count++);
			} catch (err) {
				this.destination.error(err);
				return;
			}
			this.destination.next(result);
		};
		return MapSubscriber;
	}(Subscriber);
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/observable/bindCallback.js
function bindCallback(callbackFunc, resultSelector, scheduler) {
	if (resultSelector) if (isScheduler(resultSelector)) scheduler = resultSelector;
	else return function() {
		var args = [];
		for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
		return bindCallback(callbackFunc, scheduler).apply(void 0, args).pipe(map(function(args) {
			return isArray(args) ? resultSelector.apply(void 0, args) : resultSelector(args);
		}));
	};
	return function() {
		var args = [];
		for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
		var context = this;
		var subject;
		var params = {
			context,
			subject,
			callbackFunc,
			scheduler
		};
		return new Observable(function(subscriber) {
			if (!scheduler) {
				if (!subject) {
					subject = new AsyncSubject();
					var handler = function() {
						var innerArgs = [];
						for (var _i = 0; _i < arguments.length; _i++) innerArgs[_i] = arguments[_i];
						subject.next(innerArgs.length <= 1 ? innerArgs[0] : innerArgs);
						subject.complete();
					};
					try {
						callbackFunc.apply(context, args.concat([handler]));
					} catch (err) {
						if (canReportError(subject)) subject.error(err);
						else console.warn(err);
					}
				}
				return subject.subscribe(subscriber);
			} else {
				var state = {
					args,
					subscriber,
					params
				};
				return scheduler.schedule(dispatch$6, 0, state);
			}
		});
	};
}
function dispatch$6(state) {
	var _this = this;
	var args = state.args, subscriber = state.subscriber, params = state.params;
	var callbackFunc = params.callbackFunc, context = params.context, scheduler = params.scheduler;
	var subject = params.subject;
	if (!subject) {
		subject = params.subject = new AsyncSubject();
		var handler = function() {
			var innerArgs = [];
			for (var _i = 0; _i < arguments.length; _i++) innerArgs[_i] = arguments[_i];
			var value = innerArgs.length <= 1 ? innerArgs[0] : innerArgs;
			_this.add(scheduler.schedule(dispatchNext$1, 0, {
				value,
				subject
			}));
		};
		try {
			callbackFunc.apply(context, args.concat([handler]));
		} catch (err) {
			subject.error(err);
		}
	}
	this.add(subject.subscribe(subscriber));
}
function dispatchNext$1(state) {
	var value = state.value, subject = state.subject;
	subject.next(value);
	subject.complete();
}
var init_bindCallback = __esmMin((() => {
	init_Observable();
	init_AsyncSubject();
	init_map();
	init_canReportError();
	init_isArray();
	init_isScheduler();
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/observable/bindNodeCallback.js
function bindNodeCallback(callbackFunc, resultSelector, scheduler) {
	if (resultSelector) if (isScheduler(resultSelector)) scheduler = resultSelector;
	else return function() {
		var args = [];
		for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
		return bindNodeCallback(callbackFunc, scheduler).apply(void 0, args).pipe(map(function(args) {
			return isArray(args) ? resultSelector.apply(void 0, args) : resultSelector(args);
		}));
	};
	return function() {
		var args = [];
		for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
		var params = {
			subject: void 0,
			args,
			callbackFunc,
			scheduler,
			context: this
		};
		return new Observable(function(subscriber) {
			var context = params.context;
			var subject = params.subject;
			if (!scheduler) {
				if (!subject) {
					subject = params.subject = new AsyncSubject();
					var handler = function() {
						var innerArgs = [];
						for (var _i = 0; _i < arguments.length; _i++) innerArgs[_i] = arguments[_i];
						var err = innerArgs.shift();
						if (err) {
							subject.error(err);
							return;
						}
						subject.next(innerArgs.length <= 1 ? innerArgs[0] : innerArgs);
						subject.complete();
					};
					try {
						callbackFunc.apply(context, args.concat([handler]));
					} catch (err) {
						if (canReportError(subject)) subject.error(err);
						else console.warn(err);
					}
				}
				return subject.subscribe(subscriber);
			} else return scheduler.schedule(dispatch$5, 0, {
				params,
				subscriber,
				context
			});
		});
	};
}
function dispatch$5(state) {
	var _this = this;
	var params = state.params, subscriber = state.subscriber, context = state.context;
	var callbackFunc = params.callbackFunc, args = params.args, scheduler = params.scheduler;
	var subject = params.subject;
	if (!subject) {
		subject = params.subject = new AsyncSubject();
		var handler = function() {
			var innerArgs = [];
			for (var _i = 0; _i < arguments.length; _i++) innerArgs[_i] = arguments[_i];
			var err = innerArgs.shift();
			if (err) _this.add(scheduler.schedule(dispatchError, 0, {
				err,
				subject
			}));
			else {
				var value = innerArgs.length <= 1 ? innerArgs[0] : innerArgs;
				_this.add(scheduler.schedule(dispatchNext, 0, {
					value,
					subject
				}));
			}
		};
		try {
			callbackFunc.apply(context, args.concat([handler]));
		} catch (err) {
			this.add(scheduler.schedule(dispatchError, 0, {
				err,
				subject
			}));
		}
	}
	this.add(subject.subscribe(subscriber));
}
function dispatchNext(arg) {
	var value = arg.value, subject = arg.subject;
	subject.next(value);
	subject.complete();
}
function dispatchError(arg) {
	var err = arg.err;
	arg.subject.error(err);
}
var init_bindNodeCallback = __esmMin((() => {
	init_Observable();
	init_AsyncSubject();
	init_map();
	init_canReportError();
	init_isScheduler();
	init_isArray();
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/OuterSubscriber.js
var OuterSubscriber;
var init_OuterSubscriber = __esmMin((() => {
	init_tslib_es6();
	init_Subscriber();
	OuterSubscriber = /* @__PURE__ */ function(_super) {
		__extends(OuterSubscriber, _super);
		function OuterSubscriber() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		OuterSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
			this.destination.next(innerValue);
		};
		OuterSubscriber.prototype.notifyError = function(error, innerSub) {
			this.destination.error(error);
		};
		OuterSubscriber.prototype.notifyComplete = function(innerSub) {
			this.destination.complete();
		};
		return OuterSubscriber;
	}(Subscriber);
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/InnerSubscriber.js
var InnerSubscriber;
var init_InnerSubscriber = __esmMin((() => {
	init_tslib_es6();
	init_Subscriber();
	InnerSubscriber = /* @__PURE__ */ function(_super) {
		__extends(InnerSubscriber, _super);
		function InnerSubscriber(parent, outerValue, outerIndex) {
			var _this = _super.call(this) || this;
			_this.parent = parent;
			_this.outerValue = outerValue;
			_this.outerIndex = outerIndex;
			_this.index = 0;
			return _this;
		}
		InnerSubscriber.prototype._next = function(value) {
			this.parent.notifyNext(this.outerValue, value, this.outerIndex, this.index++, this);
		};
		InnerSubscriber.prototype._error = function(error) {
			this.parent.notifyError(error, this);
			this.unsubscribe();
		};
		InnerSubscriber.prototype._complete = function() {
			this.parent.notifyComplete(this);
			this.unsubscribe();
		};
		return InnerSubscriber;
	}(Subscriber);
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/util/subscribeToPromise.js
var subscribeToPromise;
var init_subscribeToPromise = __esmMin((() => {
	init_hostReportError();
	subscribeToPromise = function(promise) {
		return function(subscriber) {
			promise.then(function(value) {
				if (!subscriber.closed) {
					subscriber.next(value);
					subscriber.complete();
				}
			}, function(err) {
				return subscriber.error(err);
			}).then(null, hostReportError);
			return subscriber;
		};
	};
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/symbol/iterator.js
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function getSymbolIterator() {
	if (typeof Symbol !== "function" || !Symbol.iterator) return "@@iterator";
	return Symbol.iterator;
}
var iterator;
var init_iterator = __esmMin((() => {
	iterator = /* @__PURE__ */ getSymbolIterator();
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/util/subscribeToIterable.js
var subscribeToIterable;
var init_subscribeToIterable = __esmMin((() => {
	init_iterator();
	subscribeToIterable = function(iterable) {
		return function(subscriber) {
			var iterator$2 = iterable[iterator]();
			do {
				var item = void 0;
				try {
					item = iterator$2.next();
				} catch (err) {
					subscriber.error(err);
					return subscriber;
				}
				if (item.done) {
					subscriber.complete();
					break;
				}
				subscriber.next(item.value);
				if (subscriber.closed) break;
			} while (true);
			if (typeof iterator$2.return === "function") subscriber.add(function() {
				if (iterator$2.return) iterator$2.return();
			});
			return subscriber;
		};
	};
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/util/subscribeToObservable.js
var subscribeToObservable;
var init_subscribeToObservable = __esmMin((() => {
	init_observable();
	subscribeToObservable = function(obj) {
		return function(subscriber) {
			var obs = obj[observable]();
			if (typeof obs.subscribe !== "function") throw new TypeError("Provided object does not correctly implement Symbol.observable");
			else return obs.subscribe(subscriber);
		};
	};
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/util/isArrayLike.js
var isArrayLike;
var init_isArrayLike = __esmMin((() => {
	isArrayLike = (function(x) {
		return x && typeof x.length === "number" && typeof x !== "function";
	});
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/util/isPromise.js
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function isPromise(value) {
	return !!value && typeof value.subscribe !== "function" && typeof value.then === "function";
}
var init_isPromise = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/util/subscribeTo.js
var subscribeTo;
var init_subscribeTo = __esmMin((() => {
	init_subscribeToArray();
	init_subscribeToPromise();
	init_subscribeToIterable();
	init_subscribeToObservable();
	init_isArrayLike();
	init_isPromise();
	init_isObject();
	init_iterator();
	init_observable();
	subscribeTo = function(result) {
		if (!!result && typeof result[observable] === "function") return subscribeToObservable(result);
		else if (isArrayLike(result)) return subscribeToArray(result);
		else if (isPromise(result)) return subscribeToPromise(result);
		else if (!!result && typeof result[iterator] === "function") return subscribeToIterable(result);
		else {
			var msg = "You provided " + (isObject(result) ? "an invalid object" : "'" + result + "'") + " where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.";
			throw new TypeError(msg);
		}
	};
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/util/subscribeToResult.js
function subscribeToResult(outerSubscriber, result, outerValue, outerIndex, innerSubscriber) {
	if (innerSubscriber === void 0) innerSubscriber = new InnerSubscriber(outerSubscriber, outerValue, outerIndex);
	if (innerSubscriber.closed) return;
	if (result instanceof Observable) return result.subscribe(innerSubscriber);
	return subscribeTo(result)(innerSubscriber);
}
var init_subscribeToResult = __esmMin((() => {
	init_InnerSubscriber();
	init_subscribeTo();
	init_Observable();
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/observable/combineLatest.js
function combineLatest() {
	var observables = [];
	for (var _i = 0; _i < arguments.length; _i++) observables[_i] = arguments[_i];
	var resultSelector = void 0;
	var scheduler = void 0;
	if (isScheduler(observables[observables.length - 1])) scheduler = observables.pop();
	if (typeof observables[observables.length - 1] === "function") resultSelector = observables.pop();
	if (observables.length === 1 && isArray(observables[0])) observables = observables[0];
	return fromArray(observables, scheduler).lift(new CombineLatestOperator(resultSelector));
}
var NONE, CombineLatestOperator, CombineLatestSubscriber;
var init_combineLatest = __esmMin((() => {
	init_tslib_es6();
	init_isScheduler();
	init_isArray();
	init_OuterSubscriber();
	init_subscribeToResult();
	init_fromArray();
	NONE = {};
	CombineLatestOperator = /* @__PURE__ */ function() {
		function CombineLatestOperator(resultSelector) {
			this.resultSelector = resultSelector;
		}
		CombineLatestOperator.prototype.call = function(subscriber, source) {
			return source.subscribe(new CombineLatestSubscriber(subscriber, this.resultSelector));
		};
		return CombineLatestOperator;
	}();
	CombineLatestSubscriber = /* @__PURE__ */ function(_super) {
		__extends(CombineLatestSubscriber, _super);
		function CombineLatestSubscriber(destination, resultSelector) {
			var _this = _super.call(this, destination) || this;
			_this.resultSelector = resultSelector;
			_this.active = 0;
			_this.values = [];
			_this.observables = [];
			return _this;
		}
		CombineLatestSubscriber.prototype._next = function(observable) {
			this.values.push(NONE);
			this.observables.push(observable);
		};
		CombineLatestSubscriber.prototype._complete = function() {
			var observables = this.observables;
			var len = observables.length;
			if (len === 0) this.destination.complete();
			else {
				this.active = len;
				this.toRespond = len;
				for (var i = 0; i < len; i++) {
					var observable = observables[i];
					this.add(subscribeToResult(this, observable, void 0, i));
				}
			}
		};
		CombineLatestSubscriber.prototype.notifyComplete = function(unused) {
			if ((this.active -= 1) === 0) this.destination.complete();
		};
		CombineLatestSubscriber.prototype.notifyNext = function(_outerValue, innerValue, outerIndex) {
			var values = this.values;
			var oldVal = values[outerIndex];
			var toRespond = !this.toRespond ? 0 : oldVal === NONE ? --this.toRespond : this.toRespond;
			values[outerIndex] = innerValue;
			if (toRespond === 0) if (this.resultSelector) this._tryResultSelector(values);
			else this.destination.next(values.slice());
		};
		CombineLatestSubscriber.prototype._tryResultSelector = function(values) {
			var result;
			try {
				result = this.resultSelector.apply(this, values);
			} catch (err) {
				this.destination.error(err);
				return;
			}
			this.destination.next(result);
		};
		return CombineLatestSubscriber;
	}(OuterSubscriber);
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/scheduled/scheduleObservable.js
function scheduleObservable(input, scheduler) {
	return new Observable(function(subscriber) {
		var sub = new Subscription();
		sub.add(scheduler.schedule(function() {
			var observable$1 = input[observable]();
			sub.add(observable$1.subscribe({
				next: function(value) {
					sub.add(scheduler.schedule(function() {
						return subscriber.next(value);
					}));
				},
				error: function(err) {
					sub.add(scheduler.schedule(function() {
						return subscriber.error(err);
					}));
				},
				complete: function() {
					sub.add(scheduler.schedule(function() {
						return subscriber.complete();
					}));
				}
			}));
		}));
		return sub;
	});
}
var init_scheduleObservable = __esmMin((() => {
	init_Observable();
	init_Subscription();
	init_observable();
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/scheduled/schedulePromise.js
function schedulePromise(input, scheduler) {
	return new Observable(function(subscriber) {
		var sub = new Subscription();
		sub.add(scheduler.schedule(function() {
			return input.then(function(value) {
				sub.add(scheduler.schedule(function() {
					subscriber.next(value);
					sub.add(scheduler.schedule(function() {
						return subscriber.complete();
					}));
				}));
			}, function(err) {
				sub.add(scheduler.schedule(function() {
					return subscriber.error(err);
				}));
			});
		}));
		return sub;
	});
}
var init_schedulePromise = __esmMin((() => {
	init_Observable();
	init_Subscription();
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/scheduled/scheduleIterable.js
function scheduleIterable(input, scheduler) {
	if (!input) throw new Error("Iterable cannot be null");
	return new Observable(function(subscriber) {
		var sub = new Subscription();
		var iterator$1;
		sub.add(function() {
			if (iterator$1 && typeof iterator$1.return === "function") iterator$1.return();
		});
		sub.add(scheduler.schedule(function() {
			iterator$1 = input[iterator]();
			sub.add(scheduler.schedule(function() {
				if (subscriber.closed) return;
				var value;
				var done;
				try {
					var result = iterator$1.next();
					value = result.value;
					done = result.done;
				} catch (err) {
					subscriber.error(err);
					return;
				}
				if (done) subscriber.complete();
				else {
					subscriber.next(value);
					this.schedule();
				}
			}));
		}));
		return sub;
	});
}
var init_scheduleIterable = __esmMin((() => {
	init_Observable();
	init_Subscription();
	init_iterator();
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/util/isInteropObservable.js
function isInteropObservable(input) {
	return input && typeof input[observable] === "function";
}
var init_isInteropObservable = __esmMin((() => {
	init_observable();
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/util/isIterable.js
function isIterable(input) {
	return input && typeof input[iterator] === "function";
}
var init_isIterable = __esmMin((() => {
	init_iterator();
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/scheduled/scheduled.js
function scheduled(input, scheduler) {
	if (input != null) {
		if (isInteropObservable(input)) return scheduleObservable(input, scheduler);
		else if (isPromise(input)) return schedulePromise(input, scheduler);
		else if (isArrayLike(input)) return scheduleArray(input, scheduler);
		else if (isIterable(input) || typeof input === "string") return scheduleIterable(input, scheduler);
	}
	throw new TypeError((input !== null && typeof input || input) + " is not observable");
}
var init_scheduled = __esmMin((() => {
	init_scheduleObservable();
	init_schedulePromise();
	init_scheduleArray();
	init_scheduleIterable();
	init_isInteropObservable();
	init_isPromise();
	init_isArrayLike();
	init_isIterable();
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/observable/from.js
function from(input, scheduler) {
	if (!scheduler) {
		if (input instanceof Observable) return input;
		return new Observable(subscribeTo(input));
	} else return scheduled(input, scheduler);
}
var init_from = __esmMin((() => {
	init_Observable();
	init_subscribeTo();
	init_scheduled();
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/innerSubscribe.js
function innerSubscribe(result, innerSubscriber) {
	if (innerSubscriber.closed) return;
	if (result instanceof Observable) return result.subscribe(innerSubscriber);
	var subscription;
	try {
		subscription = subscribeTo(result)(innerSubscriber);
	} catch (error) {
		innerSubscriber.error(error);
	}
	return subscription;
}
var SimpleInnerSubscriber, SimpleOuterSubscriber;
var init_innerSubscribe = __esmMin((() => {
	init_tslib_es6();
	init_Subscriber();
	init_Observable();
	init_subscribeTo();
	SimpleInnerSubscriber = /* @__PURE__ */ function(_super) {
		__extends(SimpleInnerSubscriber, _super);
		function SimpleInnerSubscriber(parent) {
			var _this = _super.call(this) || this;
			_this.parent = parent;
			return _this;
		}
		SimpleInnerSubscriber.prototype._next = function(value) {
			this.parent.notifyNext(value);
		};
		SimpleInnerSubscriber.prototype._error = function(error) {
			this.parent.notifyError(error);
			this.unsubscribe();
		};
		SimpleInnerSubscriber.prototype._complete = function() {
			this.parent.notifyComplete();
			this.unsubscribe();
		};
		return SimpleInnerSubscriber;
	}(Subscriber);
	SimpleOuterSubscriber = /* @__PURE__ */ function(_super) {
		__extends(SimpleOuterSubscriber, _super);
		function SimpleOuterSubscriber() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		SimpleOuterSubscriber.prototype.notifyNext = function(innerValue) {
			this.destination.next(innerValue);
		};
		SimpleOuterSubscriber.prototype.notifyError = function(err) {
			this.destination.error(err);
		};
		SimpleOuterSubscriber.prototype.notifyComplete = function() {
			this.destination.complete();
		};
		return SimpleOuterSubscriber;
	}(Subscriber);
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/operators/mergeMap.js
function mergeMap(project, resultSelector, concurrent) {
	if (concurrent === void 0) concurrent = Number.POSITIVE_INFINITY;
	if (typeof resultSelector === "function") return function(source) {
		return source.pipe(mergeMap(function(a, i) {
			return from(project(a, i)).pipe(map(function(b, ii) {
				return resultSelector(a, b, i, ii);
			}));
		}, concurrent));
	};
	else if (typeof resultSelector === "number") concurrent = resultSelector;
	return function(source) {
		return source.lift(new MergeMapOperator(project, concurrent));
	};
}
var MergeMapOperator, MergeMapSubscriber;
var init_mergeMap = __esmMin((() => {
	init_tslib_es6();
	init_map();
	init_from();
	init_innerSubscribe();
	MergeMapOperator = /* @__PURE__ */ function() {
		function MergeMapOperator(project, concurrent) {
			if (concurrent === void 0) concurrent = Number.POSITIVE_INFINITY;
			this.project = project;
			this.concurrent = concurrent;
		}
		MergeMapOperator.prototype.call = function(observer, source) {
			return source.subscribe(new MergeMapSubscriber(observer, this.project, this.concurrent));
		};
		return MergeMapOperator;
	}();
	MergeMapSubscriber = /* @__PURE__ */ function(_super) {
		__extends(MergeMapSubscriber, _super);
		function MergeMapSubscriber(destination, project, concurrent) {
			if (concurrent === void 0) concurrent = Number.POSITIVE_INFINITY;
			var _this = _super.call(this, destination) || this;
			_this.project = project;
			_this.concurrent = concurrent;
			_this.hasCompleted = false;
			_this.buffer = [];
			_this.active = 0;
			_this.index = 0;
			return _this;
		}
		MergeMapSubscriber.prototype._next = function(value) {
			if (this.active < this.concurrent) this._tryNext(value);
			else this.buffer.push(value);
		};
		MergeMapSubscriber.prototype._tryNext = function(value) {
			var result;
			var index = this.index++;
			try {
				result = this.project(value, index);
			} catch (err) {
				this.destination.error(err);
				return;
			}
			this.active++;
			this._innerSub(result);
		};
		MergeMapSubscriber.prototype._innerSub = function(ish) {
			var innerSubscriber = new SimpleInnerSubscriber(this);
			var destination = this.destination;
			destination.add(innerSubscriber);
			var innerSubscription = innerSubscribe(ish, innerSubscriber);
			if (innerSubscription !== innerSubscriber) destination.add(innerSubscription);
		};
		MergeMapSubscriber.prototype._complete = function() {
			this.hasCompleted = true;
			if (this.active === 0 && this.buffer.length === 0) this.destination.complete();
			this.unsubscribe();
		};
		MergeMapSubscriber.prototype.notifyNext = function(innerValue) {
			this.destination.next(innerValue);
		};
		MergeMapSubscriber.prototype.notifyComplete = function() {
			var buffer = this.buffer;
			this.active--;
			if (buffer.length > 0) this._next(buffer.shift());
			else if (this.active === 0 && this.hasCompleted) this.destination.complete();
		};
		return MergeMapSubscriber;
	}(SimpleOuterSubscriber);
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/operators/mergeAll.js
function mergeAll(concurrent) {
	if (concurrent === void 0) concurrent = Number.POSITIVE_INFINITY;
	return mergeMap(identity, concurrent);
}
var init_mergeAll = __esmMin((() => {
	init_mergeMap();
	init_identity();
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/operators/concatAll.js
function concatAll() {
	return mergeAll(1);
}
var init_concatAll = __esmMin((() => {
	init_mergeAll();
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/observable/concat.js
function concat() {
	var observables = [];
	for (var _i = 0; _i < arguments.length; _i++) observables[_i] = arguments[_i];
	return concatAll()(of.apply(void 0, observables));
}
var init_concat = __esmMin((() => {
	init_of();
	init_concatAll();
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/observable/defer.js
function defer(observableFactory) {
	return new Observable(function(subscriber) {
		var input;
		try {
			input = observableFactory();
		} catch (err) {
			subscriber.error(err);
			return;
		}
		return (input ? from(input) : empty()).subscribe(subscriber);
	});
}
var init_defer = __esmMin((() => {
	init_Observable();
	init_from();
	init_empty();
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/observable/forkJoin.js
function forkJoin() {
	var sources = [];
	for (var _i = 0; _i < arguments.length; _i++) sources[_i] = arguments[_i];
	if (sources.length === 1) {
		var first_1 = sources[0];
		if (isArray(first_1)) return forkJoinInternal(first_1, null);
		if (isObject(first_1) && Object.getPrototypeOf(first_1) === Object.prototype) {
			var keys = Object.keys(first_1);
			return forkJoinInternal(keys.map(function(key) {
				return first_1[key];
			}), keys);
		}
	}
	if (typeof sources[sources.length - 1] === "function") {
		var resultSelector_1 = sources.pop();
		sources = sources.length === 1 && isArray(sources[0]) ? sources[0] : sources;
		return forkJoinInternal(sources, null).pipe(map(function(args) {
			return resultSelector_1.apply(void 0, args);
		}));
	}
	return forkJoinInternal(sources, null);
}
function forkJoinInternal(sources, keys) {
	return new Observable(function(subscriber) {
		var len = sources.length;
		if (len === 0) {
			subscriber.complete();
			return;
		}
		var values = new Array(len);
		var completed = 0;
		var emitted = 0;
		var _loop_1 = function(i) {
			var source = from(sources[i]);
			var hasValue = false;
			subscriber.add(source.subscribe({
				next: function(value) {
					if (!hasValue) {
						hasValue = true;
						emitted++;
					}
					values[i] = value;
				},
				error: function(err) {
					return subscriber.error(err);
				},
				complete: function() {
					completed++;
					if (completed === len || !hasValue) {
						if (emitted === len) subscriber.next(keys ? keys.reduce(function(result, key, i) {
							return result[key] = values[i], result;
						}, {}) : values);
						subscriber.complete();
					}
				}
			}));
		};
		for (var i = 0; i < len; i++) _loop_1(i);
	});
}
var init_forkJoin = __esmMin((() => {
	init_Observable();
	init_isArray();
	init_map();
	init_isObject();
	init_from();
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/observable/fromEvent.js
function fromEvent(target, eventName, options, resultSelector) {
	if (isFunction(options)) {
		resultSelector = options;
		options = void 0;
	}
	if (resultSelector) return fromEvent(target, eventName, options).pipe(map(function(args) {
		return isArray(args) ? resultSelector.apply(void 0, args) : resultSelector(args);
	}));
	return new Observable(function(subscriber) {
		function handler(e) {
			if (arguments.length > 1) subscriber.next(Array.prototype.slice.call(arguments));
			else subscriber.next(e);
		}
		setupSubscription(target, eventName, handler, subscriber, options);
	});
}
function setupSubscription(sourceObj, eventName, handler, subscriber, options) {
	var unsubscribe;
	if (isEventTarget(sourceObj)) {
		var source_1 = sourceObj;
		sourceObj.addEventListener(eventName, handler, options);
		unsubscribe = function() {
			return source_1.removeEventListener(eventName, handler, options);
		};
	} else if (isJQueryStyleEventEmitter(sourceObj)) {
		var source_2 = sourceObj;
		sourceObj.on(eventName, handler);
		unsubscribe = function() {
			return source_2.off(eventName, handler);
		};
	} else if (isNodeStyleEventEmitter(sourceObj)) {
		var source_3 = sourceObj;
		sourceObj.addListener(eventName, handler);
		unsubscribe = function() {
			return source_3.removeListener(eventName, handler);
		};
	} else if (sourceObj && sourceObj.length) for (var i = 0, len = sourceObj.length; i < len; i++) setupSubscription(sourceObj[i], eventName, handler, subscriber, options);
	else throw new TypeError("Invalid event target");
	subscriber.add(unsubscribe);
}
function isNodeStyleEventEmitter(sourceObj) {
	return sourceObj && typeof sourceObj.addListener === "function" && typeof sourceObj.removeListener === "function";
}
function isJQueryStyleEventEmitter(sourceObj) {
	return sourceObj && typeof sourceObj.on === "function" && typeof sourceObj.off === "function";
}
function isEventTarget(sourceObj) {
	return sourceObj && typeof sourceObj.addEventListener === "function" && typeof sourceObj.removeEventListener === "function";
}
var init_fromEvent = __esmMin((() => {
	init_Observable();
	init_isArray();
	init_isFunction();
	init_map();
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/observable/fromEventPattern.js
function fromEventPattern(addHandler, removeHandler, resultSelector) {
	if (resultSelector) return fromEventPattern(addHandler, removeHandler).pipe(map(function(args) {
		return isArray(args) ? resultSelector.apply(void 0, args) : resultSelector(args);
	}));
	return new Observable(function(subscriber) {
		var handler = function() {
			var e = [];
			for (var _i = 0; _i < arguments.length; _i++) e[_i] = arguments[_i];
			return subscriber.next(e.length === 1 ? e[0] : e);
		};
		var retValue;
		try {
			retValue = addHandler(handler);
		} catch (err) {
			subscriber.error(err);
			return;
		}
		if (!isFunction(removeHandler)) return;
		return function() {
			return removeHandler(handler, retValue);
		};
	});
}
var init_fromEventPattern = __esmMin((() => {
	init_Observable();
	init_isArray();
	init_isFunction();
	init_map();
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/observable/generate.js
function generate(initialStateOrOptions, condition, iterate, resultSelectorOrObservable, scheduler) {
	var resultSelector;
	var initialState;
	if (arguments.length == 1) {
		var options = initialStateOrOptions;
		initialState = options.initialState;
		condition = options.condition;
		iterate = options.iterate;
		resultSelector = options.resultSelector || identity;
		scheduler = options.scheduler;
	} else if (resultSelectorOrObservable === void 0 || isScheduler(resultSelectorOrObservable)) {
		initialState = initialStateOrOptions;
		resultSelector = identity;
		scheduler = resultSelectorOrObservable;
	} else {
		initialState = initialStateOrOptions;
		resultSelector = resultSelectorOrObservable;
	}
	return new Observable(function(subscriber) {
		var state = initialState;
		if (scheduler) return scheduler.schedule(dispatch$4, 0, {
			subscriber,
			iterate,
			condition,
			resultSelector,
			state
		});
		do {
			if (condition) {
				var conditionResult = void 0;
				try {
					conditionResult = condition(state);
				} catch (err) {
					subscriber.error(err);
					return;
				}
				if (!conditionResult) {
					subscriber.complete();
					break;
				}
			}
			var value = void 0;
			try {
				value = resultSelector(state);
			} catch (err) {
				subscriber.error(err);
				return;
			}
			subscriber.next(value);
			if (subscriber.closed) break;
			try {
				state = iterate(state);
			} catch (err) {
				subscriber.error(err);
				return;
			}
		} while (true);
	});
}
function dispatch$4(state) {
	var subscriber = state.subscriber, condition = state.condition;
	if (subscriber.closed) return;
	if (state.needIterate) try {
		state.state = state.iterate(state.state);
	} catch (err) {
		subscriber.error(err);
		return;
	}
	else state.needIterate = true;
	if (condition) {
		var conditionResult = void 0;
		try {
			conditionResult = condition(state.state);
		} catch (err) {
			subscriber.error(err);
			return;
		}
		if (!conditionResult) {
			subscriber.complete();
			return;
		}
		if (subscriber.closed) return;
	}
	var value;
	try {
		value = state.resultSelector(state.state);
	} catch (err) {
		subscriber.error(err);
		return;
	}
	if (subscriber.closed) return;
	subscriber.next(value);
	if (subscriber.closed) return;
	return this.schedule(state);
}
var init_generate = __esmMin((() => {
	init_Observable();
	init_identity();
	init_isScheduler();
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/observable/iif.js
function iif(condition, trueResult, falseResult) {
	if (trueResult === void 0) trueResult = EMPTY;
	if (falseResult === void 0) falseResult = EMPTY;
	return defer(function() {
		return condition() ? trueResult : falseResult;
	});
}
var init_iif = __esmMin((() => {
	init_defer();
	init_empty();
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/util/isNumeric.js
function isNumeric(val) {
	return !isArray(val) && val - parseFloat(val) + 1 >= 0;
}
var init_isNumeric = __esmMin((() => {
	init_isArray();
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/observable/interval.js
function interval(period, scheduler) {
	if (period === void 0) period = 0;
	if (scheduler === void 0) scheduler = async;
	if (!isNumeric(period) || period < 0) period = 0;
	if (!scheduler || typeof scheduler.schedule !== "function") scheduler = async;
	return new Observable(function(subscriber) {
		subscriber.add(scheduler.schedule(dispatch$3, period, {
			subscriber,
			counter: 0,
			period
		}));
		return subscriber;
	});
}
function dispatch$3(state) {
	var subscriber = state.subscriber, counter = state.counter, period = state.period;
	subscriber.next(counter);
	this.schedule({
		subscriber,
		counter: counter + 1,
		period
	}, period);
}
var init_interval = __esmMin((() => {
	init_Observable();
	init_async();
	init_isNumeric();
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/observable/merge.js
function merge() {
	var observables = [];
	for (var _i = 0; _i < arguments.length; _i++) observables[_i] = arguments[_i];
	var concurrent = Number.POSITIVE_INFINITY;
	var scheduler = null;
	var last = observables[observables.length - 1];
	if (isScheduler(last)) {
		scheduler = observables.pop();
		if (observables.length > 1 && typeof observables[observables.length - 1] === "number") concurrent = observables.pop();
	} else if (typeof last === "number") concurrent = observables.pop();
	if (scheduler === null && observables.length === 1 && observables[0] instanceof Observable) return observables[0];
	return mergeAll(concurrent)(fromArray(observables, scheduler));
}
var init_merge = __esmMin((() => {
	init_Observable();
	init_isScheduler();
	init_mergeAll();
	init_fromArray();
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/observable/never.js
function never() {
	return NEVER;
}
var NEVER;
var init_never = __esmMin((() => {
	init_Observable();
	init_noop();
	NEVER = /* @__PURE__ */ new Observable(noop);
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/observable/onErrorResumeNext.js
function onErrorResumeNext() {
	var sources = [];
	for (var _i = 0; _i < arguments.length; _i++) sources[_i] = arguments[_i];
	if (sources.length === 0) return EMPTY;
	var first = sources[0], remainder = sources.slice(1);
	if (sources.length === 1 && isArray(first)) return onErrorResumeNext.apply(void 0, first);
	return new Observable(function(subscriber) {
		var subNext = function() {
			return subscriber.add(onErrorResumeNext.apply(void 0, remainder).subscribe(subscriber));
		};
		return from(first).subscribe({
			next: function(value) {
				subscriber.next(value);
			},
			error: subNext,
			complete: subNext
		});
	});
}
var init_onErrorResumeNext = __esmMin((() => {
	init_Observable();
	init_from();
	init_isArray();
	init_empty();
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/observable/pairs.js
function pairs(obj, scheduler) {
	if (!scheduler) return new Observable(function(subscriber) {
		var keys = Object.keys(obj);
		for (var i = 0; i < keys.length && !subscriber.closed; i++) {
			var key = keys[i];
			if (obj.hasOwnProperty(key)) subscriber.next([key, obj[key]]);
		}
		subscriber.complete();
	});
	else return new Observable(function(subscriber) {
		var keys = Object.keys(obj);
		var subscription = new Subscription();
		subscription.add(scheduler.schedule(dispatch$2, 0, {
			keys,
			index: 0,
			subscriber,
			subscription,
			obj
		}));
		return subscription;
	});
}
function dispatch$2(state) {
	var keys = state.keys, index = state.index, subscriber = state.subscriber, subscription = state.subscription, obj = state.obj;
	if (!subscriber.closed) if (index < keys.length) {
		var key = keys[index];
		subscriber.next([key, obj[key]]);
		subscription.add(this.schedule({
			keys,
			index: index + 1,
			subscriber,
			subscription,
			obj
		}));
	} else subscriber.complete();
}
var init_pairs = __esmMin((() => {
	init_Observable();
	init_Subscription();
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/util/not.js
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function not(pred, thisArg) {
	function notPred() {
		return !notPred.pred.apply(notPred.thisArg, arguments);
	}
	notPred.pred = pred;
	notPred.thisArg = thisArg;
	return notPred;
}
var init_not = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/operators/filter.js
function filter(predicate, thisArg) {
	return function filterOperatorFunction(source) {
		return source.lift(new FilterOperator(predicate, thisArg));
	};
}
var FilterOperator, FilterSubscriber;
var init_filter = __esmMin((() => {
	init_tslib_es6();
	init_Subscriber();
	FilterOperator = /* @__PURE__ */ function() {
		function FilterOperator(predicate, thisArg) {
			this.predicate = predicate;
			this.thisArg = thisArg;
		}
		FilterOperator.prototype.call = function(subscriber, source) {
			return source.subscribe(new FilterSubscriber(subscriber, this.predicate, this.thisArg));
		};
		return FilterOperator;
	}();
	FilterSubscriber = /* @__PURE__ */ function(_super) {
		__extends(FilterSubscriber, _super);
		function FilterSubscriber(destination, predicate, thisArg) {
			var _this = _super.call(this, destination) || this;
			_this.predicate = predicate;
			_this.thisArg = thisArg;
			_this.count = 0;
			return _this;
		}
		FilterSubscriber.prototype._next = function(value) {
			var result;
			try {
				result = this.predicate.call(this.thisArg, value, this.count++);
			} catch (err) {
				this.destination.error(err);
				return;
			}
			if (result) this.destination.next(value);
		};
		return FilterSubscriber;
	}(Subscriber);
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/observable/partition.js
function partition(source, predicate, thisArg) {
	return [filter(predicate, thisArg)(new Observable(subscribeTo(source))), filter(not(predicate, thisArg))(new Observable(subscribeTo(source)))];
}
var init_partition = __esmMin((() => {
	init_not();
	init_subscribeTo();
	init_filter();
	init_Observable();
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/observable/race.js
function race() {
	var observables = [];
	for (var _i = 0; _i < arguments.length; _i++) observables[_i] = arguments[_i];
	if (observables.length === 1) if (isArray(observables[0])) observables = observables[0];
	else return observables[0];
	return fromArray(observables, void 0).lift(new RaceOperator());
}
var RaceOperator, RaceSubscriber;
var init_race = __esmMin((() => {
	init_tslib_es6();
	init_isArray();
	init_fromArray();
	init_OuterSubscriber();
	init_subscribeToResult();
	RaceOperator = /* @__PURE__ */ function() {
		function RaceOperator() {}
		RaceOperator.prototype.call = function(subscriber, source) {
			return source.subscribe(new RaceSubscriber(subscriber));
		};
		return RaceOperator;
	}();
	RaceSubscriber = /* @__PURE__ */ function(_super) {
		__extends(RaceSubscriber, _super);
		function RaceSubscriber(destination) {
			var _this = _super.call(this, destination) || this;
			_this.hasFirst = false;
			_this.observables = [];
			_this.subscriptions = [];
			return _this;
		}
		RaceSubscriber.prototype._next = function(observable) {
			this.observables.push(observable);
		};
		RaceSubscriber.prototype._complete = function() {
			var observables = this.observables;
			var len = observables.length;
			if (len === 0) this.destination.complete();
			else {
				for (var i = 0; i < len && !this.hasFirst; i++) {
					var observable = observables[i];
					var subscription = subscribeToResult(this, observable, void 0, i);
					if (this.subscriptions) this.subscriptions.push(subscription);
					this.add(subscription);
				}
				this.observables = null;
			}
		};
		RaceSubscriber.prototype.notifyNext = function(_outerValue, innerValue, outerIndex) {
			if (!this.hasFirst) {
				this.hasFirst = true;
				for (var i = 0; i < this.subscriptions.length; i++) if (i !== outerIndex) {
					var subscription = this.subscriptions[i];
					subscription.unsubscribe();
					this.remove(subscription);
				}
				this.subscriptions = null;
			}
			this.destination.next(innerValue);
		};
		return RaceSubscriber;
	}(OuterSubscriber);
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/observable/range.js
function range(start, count, scheduler) {
	if (start === void 0) start = 0;
	return new Observable(function(subscriber) {
		if (count === void 0) {
			count = start;
			start = 0;
		}
		var index = 0;
		var current = start;
		if (scheduler) return scheduler.schedule(dispatch$1, 0, {
			index,
			count,
			start,
			subscriber
		});
		else do {
			if (index++ >= count) {
				subscriber.complete();
				break;
			}
			subscriber.next(current++);
			if (subscriber.closed) break;
		} while (true);
	});
}
function dispatch$1(state) {
	var start = state.start, index = state.index, count = state.count, subscriber = state.subscriber;
	if (index >= count) {
		subscriber.complete();
		return;
	}
	subscriber.next(start);
	if (subscriber.closed) return;
	state.index = index + 1;
	state.start = start + 1;
	this.schedule(state);
}
var init_range = __esmMin((() => {
	init_Observable();
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/observable/timer.js
function timer(dueTime, periodOrScheduler, scheduler) {
	if (dueTime === void 0) dueTime = 0;
	var period = -1;
	if (isNumeric(periodOrScheduler)) period = Number(periodOrScheduler) < 1 && 1 || Number(periodOrScheduler);
	else if (isScheduler(periodOrScheduler)) scheduler = periodOrScheduler;
	if (!isScheduler(scheduler)) scheduler = async;
	return new Observable(function(subscriber) {
		var due = isNumeric(dueTime) ? dueTime : +dueTime - scheduler.now();
		return scheduler.schedule(dispatch, due, {
			index: 0,
			period,
			subscriber
		});
	});
}
function dispatch(state) {
	var index = state.index, period = state.period, subscriber = state.subscriber;
	subscriber.next(index);
	if (subscriber.closed) return;
	else if (period === -1) return subscriber.complete();
	state.index = index + 1;
	this.schedule(state, period);
}
var init_timer = __esmMin((() => {
	init_Observable();
	init_async();
	init_isNumeric();
	init_isScheduler();
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/observable/using.js
function using(resourceFactory, observableFactory) {
	return new Observable(function(subscriber) {
		var resource;
		try {
			resource = resourceFactory();
		} catch (err) {
			subscriber.error(err);
			return;
		}
		var result;
		try {
			result = observableFactory(resource);
		} catch (err) {
			subscriber.error(err);
			return;
		}
		var subscription = (result ? from(result) : EMPTY).subscribe(subscriber);
		return function() {
			subscription.unsubscribe();
			if (resource) resource.unsubscribe();
		};
	});
}
var init_using = __esmMin((() => {
	init_Observable();
	init_from();
	init_empty();
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/internal/observable/zip.js
function zip() {
	var observables = [];
	for (var _i = 0; _i < arguments.length; _i++) observables[_i] = arguments[_i];
	var resultSelector = observables[observables.length - 1];
	if (typeof resultSelector === "function") observables.pop();
	return fromArray(observables, void 0).lift(new ZipOperator(resultSelector));
}
var ZipOperator, ZipSubscriber, StaticIterator, StaticArrayIterator, ZipBufferIterator;
var init_zip = __esmMin((() => {
	init_tslib_es6();
	init_fromArray();
	init_isArray();
	init_Subscriber();
	init_iterator();
	init_innerSubscribe();
	ZipOperator = /* @__PURE__ */ function() {
		function ZipOperator(resultSelector) {
			this.resultSelector = resultSelector;
		}
		ZipOperator.prototype.call = function(subscriber, source) {
			return source.subscribe(new ZipSubscriber(subscriber, this.resultSelector));
		};
		return ZipOperator;
	}();
	ZipSubscriber = /* @__PURE__ */ function(_super) {
		__extends(ZipSubscriber, _super);
		function ZipSubscriber(destination, resultSelector, values) {
			if (values === void 0) values = Object.create(null);
			var _this = _super.call(this, destination) || this;
			_this.resultSelector = resultSelector;
			_this.iterators = [];
			_this.active = 0;
			_this.resultSelector = typeof resultSelector === "function" ? resultSelector : void 0;
			return _this;
		}
		ZipSubscriber.prototype._next = function(value) {
			var iterators = this.iterators;
			if (isArray(value)) iterators.push(new StaticArrayIterator(value));
			else if (typeof value[iterator] === "function") iterators.push(new StaticIterator(value[iterator]()));
			else iterators.push(new ZipBufferIterator(this.destination, this, value));
		};
		ZipSubscriber.prototype._complete = function() {
			var iterators = this.iterators;
			var len = iterators.length;
			this.unsubscribe();
			if (len === 0) {
				this.destination.complete();
				return;
			}
			this.active = len;
			for (var i = 0; i < len; i++) {
				var iterator = iterators[i];
				if (iterator.stillUnsubscribed) this.destination.add(iterator.subscribe());
				else this.active--;
			}
		};
		ZipSubscriber.prototype.notifyInactive = function() {
			this.active--;
			if (this.active === 0) this.destination.complete();
		};
		ZipSubscriber.prototype.checkIterators = function() {
			var iterators = this.iterators;
			var len = iterators.length;
			var destination = this.destination;
			for (var i = 0; i < len; i++) {
				var iterator = iterators[i];
				if (typeof iterator.hasValue === "function" && !iterator.hasValue()) return;
			}
			var shouldComplete = false;
			var args = [];
			for (var i = 0; i < len; i++) {
				var iterator = iterators[i];
				var result = iterator.next();
				if (iterator.hasCompleted()) shouldComplete = true;
				if (result.done) {
					destination.complete();
					return;
				}
				args.push(result.value);
			}
			if (this.resultSelector) this._tryresultSelector(args);
			else destination.next(args);
			if (shouldComplete) destination.complete();
		};
		ZipSubscriber.prototype._tryresultSelector = function(args) {
			var result;
			try {
				result = this.resultSelector.apply(this, args);
			} catch (err) {
				this.destination.error(err);
				return;
			}
			this.destination.next(result);
		};
		return ZipSubscriber;
	}(Subscriber);
	StaticIterator = /* @__PURE__ */ function() {
		function StaticIterator(iterator) {
			this.iterator = iterator;
			this.nextResult = iterator.next();
		}
		StaticIterator.prototype.hasValue = function() {
			return true;
		};
		StaticIterator.prototype.next = function() {
			var result = this.nextResult;
			this.nextResult = this.iterator.next();
			return result;
		};
		StaticIterator.prototype.hasCompleted = function() {
			var nextResult = this.nextResult;
			return Boolean(nextResult && nextResult.done);
		};
		return StaticIterator;
	}();
	StaticArrayIterator = /* @__PURE__ */ function() {
		function StaticArrayIterator(array) {
			this.array = array;
			this.index = 0;
			this.length = 0;
			this.length = array.length;
		}
		StaticArrayIterator.prototype[iterator] = function() {
			return this;
		};
		StaticArrayIterator.prototype.next = function(value) {
			var i = this.index++;
			var array = this.array;
			return i < this.length ? {
				value: array[i],
				done: false
			} : {
				value: null,
				done: true
			};
		};
		StaticArrayIterator.prototype.hasValue = function() {
			return this.array.length > this.index;
		};
		StaticArrayIterator.prototype.hasCompleted = function() {
			return this.array.length === this.index;
		};
		return StaticArrayIterator;
	}();
	ZipBufferIterator = /* @__PURE__ */ function(_super) {
		__extends(ZipBufferIterator, _super);
		function ZipBufferIterator(destination, parent, observable) {
			var _this = _super.call(this, destination) || this;
			_this.parent = parent;
			_this.observable = observable;
			_this.stillUnsubscribed = true;
			_this.buffer = [];
			_this.isComplete = false;
			return _this;
		}
		ZipBufferIterator.prototype[iterator] = function() {
			return this;
		};
		ZipBufferIterator.prototype.next = function() {
			var buffer = this.buffer;
			if (buffer.length === 0 && this.isComplete) return {
				value: null,
				done: true
			};
			else return {
				value: buffer.shift(),
				done: false
			};
		};
		ZipBufferIterator.prototype.hasValue = function() {
			return this.buffer.length > 0;
		};
		ZipBufferIterator.prototype.hasCompleted = function() {
			return this.buffer.length === 0 && this.isComplete;
		};
		ZipBufferIterator.prototype.notifyComplete = function() {
			if (this.buffer.length > 0) {
				this.isComplete = true;
				this.parent.notifyInactive();
			} else this.destination.complete();
		};
		ZipBufferIterator.prototype.notifyNext = function(innerValue) {
			this.buffer.push(innerValue);
			this.parent.checkIterators();
		};
		ZipBufferIterator.prototype.subscribe = function() {
			return innerSubscribe(this.observable, new SimpleInnerSubscriber(this));
		};
		return ZipBufferIterator;
	}(SimpleOuterSubscriber);
}));
//#endregion
//#region ../../node_modules/rxjs/_esm5/index.js
var _esm5_exports = /* @__PURE__ */ __exportAll({
	ArgumentOutOfRangeError: () => ArgumentOutOfRangeError,
	AsyncSubject: () => AsyncSubject,
	BehaviorSubject: () => BehaviorSubject,
	ConnectableObservable: () => ConnectableObservable,
	EMPTY: () => EMPTY,
	EmptyError: () => EmptyError,
	GroupedObservable: () => GroupedObservable,
	NEVER: () => NEVER,
	Notification: () => Notification,
	NotificationKind: () => NotificationKind,
	ObjectUnsubscribedError: () => ObjectUnsubscribedError,
	Observable: () => Observable,
	ReplaySubject: () => ReplaySubject,
	Scheduler: () => Scheduler,
	Subject: () => Subject,
	Subscriber: () => Subscriber,
	Subscription: () => Subscription,
	TimeoutError: () => TimeoutError,
	UnsubscriptionError: () => UnsubscriptionError,
	VirtualAction: () => VirtualAction,
	VirtualTimeScheduler: () => VirtualTimeScheduler,
	animationFrame: () => animationFrame,
	animationFrameScheduler: () => animationFrameScheduler,
	asap: () => asap,
	asapScheduler: () => asapScheduler,
	async: () => async,
	asyncScheduler: () => asyncScheduler,
	bindCallback: () => bindCallback,
	bindNodeCallback: () => bindNodeCallback,
	combineLatest: () => combineLatest,
	concat: () => concat,
	config: () => config,
	defer: () => defer,
	empty: () => empty,
	forkJoin: () => forkJoin,
	from: () => from,
	fromEvent: () => fromEvent,
	fromEventPattern: () => fromEventPattern,
	generate: () => generate,
	identity: () => identity,
	iif: () => iif,
	interval: () => interval,
	isObservable: () => isObservable,
	merge: () => merge,
	never: () => never,
	noop: () => noop,
	observable: () => observable,
	of: () => of,
	onErrorResumeNext: () => onErrorResumeNext,
	pairs: () => pairs,
	partition: () => partition,
	pipe: () => pipe,
	queue: () => queue,
	queueScheduler: () => queueScheduler,
	race: () => race,
	range: () => range,
	scheduled: () => scheduled,
	throwError: () => throwError,
	timer: () => timer,
	using: () => using,
	zip: () => zip
});
var init__esm5 = __esmMin((() => {
	init_Observable();
	init_ConnectableObservable();
	init_groupBy();
	init_observable();
	init_Subject();
	init_BehaviorSubject();
	init_ReplaySubject();
	init_AsyncSubject();
	init_asap();
	init_async();
	init_queue();
	init_animationFrame();
	init_VirtualTimeScheduler();
	init_Scheduler();
	init_Subscription();
	init_Subscriber();
	init_Notification();
	init_pipe();
	init_noop();
	init_identity();
	init_isObservable();
	init_ArgumentOutOfRangeError();
	init_EmptyError();
	init_ObjectUnsubscribedError();
	init_UnsubscriptionError();
	init_TimeoutError();
	init_bindCallback();
	init_bindNodeCallback();
	init_combineLatest();
	init_concat();
	init_defer();
	init_empty();
	init_forkJoin();
	init_from();
	init_fromEvent();
	init_fromEventPattern();
	init_generate();
	init_iif();
	init_interval();
	init_merge();
	init_never();
	init_of();
	init_onErrorResumeNext();
	init_pairs();
	init_partition();
	init_race();
	init_range();
	init_throwError();
	init_timer();
	init_using();
	init_zip();
	init_scheduled();
	init_config();
}));
//#endregion
export { Subject as a, BehaviorSubject as i, init__esm5 as n, combineLatest as r, _esm5_exports as t };
