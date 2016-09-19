!function (e, t) {
    if ("function" == typeof define && define.amd)define(["backbone", "underscore"], function (i, n) {
        return e.Marionette = e.Mn = t(e, i, n)
    }); else if ("undefined" != typeof exports) {
        var i = require("backbone"), n = require("underscore");
        module.exports = t(e, i, n)
    } else e.Marionette = e.Mn = t(e, e.Backbone, e._)
}(this, function (e, t, i) {
    "use strict";
    !function (e, t) {
        var i = e.ChildViewContainer;
        return e.ChildViewContainer = function (e, t) {
            var i = function (e) {
                this._views = {}, this._indexByModel = {}, this._indexByCustom = {}, this._updateLength(), t.each(e, this.add, this)
            };
            t.extend(i.prototype, {
                add: function (e, t) {
                    var i = e.cid;
                    return this._views[i] = e, e.model && (this._indexByModel[e.model.cid] = i), t && (this._indexByCustom[t] = i), this._updateLength(), this
                }, findByModel: function (e) {
                    return this.findByModelCid(e.cid)
                }, findByModelCid: function (e) {
                    var t = this._indexByModel[e];
                    return this.findByCid(t)
                }, findByCustom: function (e) {
                    var t = this._indexByCustom[e];
                    return this.findByCid(t)
                }, findByIndex: function (e) {
                    return t.values(this._views)[e]
                }, findByCid: function (e) {
                    return this._views[e]
                }, remove: function (e) {
                    var i = e.cid;
                    return e.model && delete this._indexByModel[e.model.cid], t.any(this._indexByCustom, function (e, t) {
                        if (e === i)return delete this._indexByCustom[t], !0
                    }, this), delete this._views[i], this._updateLength(), this
                }, call: function (e) {
                    this.apply(e, t.tail(arguments))
                }, apply: function (e, i) {
                    t.each(this._views, function (n) {
                        t.isFunction(n[e]) && n[e].apply(n, i || [])
                    })
                }, _updateLength: function () {
                    this.length = t.size(this._views)
                }
            });
            var n = ["forEach", "each", "map", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "toArray", "first", "initial", "rest", "last", "without", "isEmpty", "pluck", "reduce"];
            return t.each(n, function (e) {
                i.prototype[e] = function () {
                    var i = t.values(this._views), n = [i].concat(t.toArray(arguments));
                    return t[e].apply(t, n)
                }
            }), i
        }(e, t), e.ChildViewContainer.VERSION = "0.1.11", e.ChildViewContainer.noConflict = function () {
            return e.ChildViewContainer = i, this
        }, e.ChildViewContainer
    }(t, i), function (e, t) {
        var i = e.Wreqr, n = e.Wreqr = {};
        return e.Wreqr.VERSION = "1.3.6", e.Wreqr.noConflict = function () {
            return e.Wreqr = i, this
        }, n.Handlers = function (e, t) {
            var i = function (e) {
                this.options = e, this._wreqrHandlers = {}, t.isFunction(this.initialize) && this.initialize(e)
            };
            return i.extend = e.Model.extend, t.extend(i.prototype, e.Events, {
                setHandlers: function (e) {
                    t.each(e, function (e, i) {
                        var n = null;
                        t.isObject(e) && !t.isFunction(e) && (n = e.context, e = e.callback), this.setHandler(i, e, n)
                    }, this)
                }, setHandler: function (e, t, i) {
                    var n = {callback: t, context: i};
                    this._wreqrHandlers[e] = n, this.trigger("handler:add", e, t, i)
                }, hasHandler: function (e) {
                    return !!this._wreqrHandlers[e]
                }, getHandler: function (e) {
                    var t = this._wreqrHandlers[e];
                    if (t)return function () {
                        return t.callback.apply(t.context, arguments)
                    }
                }, removeHandler: function (e) {
                    delete this._wreqrHandlers[e]
                }, removeAllHandlers: function () {
                    this._wreqrHandlers = {}
                }
            }), i
        }(e, t), n.CommandStorage = function () {
            var i = function (e) {
                this.options = e, this._commands = {}, t.isFunction(this.initialize) && this.initialize(e)
            };
            return t.extend(i.prototype, e.Events, {
                getCommands: function (e) {
                    var t = this._commands[e];
                    return t || (t = {command: e, instances: []}, this._commands[e] = t), t
                }, addCommand: function (e, t) {
                    var i = this.getCommands(e);
                    i.instances.push(t)
                }, clearCommands: function (e) {
                    var t = this.getCommands(e);
                    t.instances = []
                }
            }), i
        }(), n.Commands = function (e, t) {
            return e.Handlers.extend({
                storageType: e.CommandStorage, constructor: function (t) {
                    this.options = t || {}, this._initializeStorage(this.options), this.on("handler:add", this._executeCommands, this), e.Handlers.prototype.constructor.apply(this, arguments)
                }, execute: function (e) {
                    e = arguments[0];
                    var i = t.rest(arguments);
                    this.hasHandler(e) ? this.getHandler(e).apply(this, i) : this.storage.addCommand(e, i)
                }, _executeCommands: function (e, i, n) {
                    var r = this.storage.getCommands(e);
                    t.each(r.instances, function (e) {
                        i.apply(n, e)
                    }), this.storage.clearCommands(e)
                }, _initializeStorage: function (e) {
                    var i, n = e.storageType || this.storageType;
                    i = t.isFunction(n) ? new n : n, this.storage = i
                }
            })
        }(n, t), n.RequestResponse = function (e, t) {
            return e.Handlers.extend({
                request: function (e) {
                    if (this.hasHandler(e))return this.getHandler(e).apply(this, t.rest(arguments))
                }
            })
        }(n, t), n.EventAggregator = function (e, t) {
            var i = function () {
            };
            return i.extend = e.Model.extend, t.extend(i.prototype, e.Events), i
        }(e, t), n.Channel = function (i) {
            var n = function (t) {
                this.vent = new e.Wreqr.EventAggregator, this.reqres = new e.Wreqr.RequestResponse, this.commands = new e.Wreqr.Commands, this.channelName = t
            };
            return t.extend(n.prototype, {
                reset: function () {
                    return this.vent.off(), this.vent.stopListening(), this.reqres.removeAllHandlers(), this.commands.removeAllHandlers(), this
                }, connectEvents: function (e, t) {
                    return this._connect("vent", e, t), this
                }, connectCommands: function (e, t) {
                    return this._connect("commands", e, t), this
                }, connectRequests: function (e, t) {
                    return this._connect("reqres", e, t), this
                }, _connect: function (e, i, n) {
                    if (i) {
                        n = n || this;
                        var r = "vent" === e ? "on" : "setHandler";
                        t.each(i, function (i, s) {
                            this[e][r](s, t.bind(i, n))
                        }, this)
                    }
                }
            }), n
        }(n), n.radio = function (e, t) {
            var i = function () {
                this._channels = {}, this.vent = {}, this.commands = {}, this.reqres = {}, this._proxyMethods()
            };
            t.extend(i.prototype, {
                channel: function (e) {
                    if (!e)throw new Error("Channel must receive a name");
                    return this._getChannel(e)
                }, _getChannel: function (t) {
                    var i = this._channels[t];
                    return i || (i = new e.Channel(t), this._channels[t] = i), i
                }, _proxyMethods: function () {
                    t.each(["vent", "commands", "reqres"], function (e) {
                        t.each(n[e], function (t) {
                            this[e][t] = r(this, e, t)
                        }, this)
                    }, this)
                }
            });
            var n = {
                vent: ["on", "off", "trigger", "once", "stopListening", "listenTo", "listenToOnce"],
                commands: ["execute", "setHandler", "setHandlers", "removeHandler", "removeAllHandlers"],
                reqres: ["request", "setHandler", "setHandlers", "removeHandler", "removeAllHandlers"]
            }, r = function (e, i, n) {
                return function (r) {
                    var s = e._getChannel(r)[i];
                    return s[n].apply(s, t.rest(arguments))
                }
            };
            return new i
        }(n, t), e.Wreqr
    }(t, i);
    var n = e.Marionette, r = e.Mn, s = t.Marionette = {};
    s.VERSION = "2.4.7", s.noConflict = function () {
        return e.Marionette = n, e.Mn = r, this
    }, t.Marionette = s, s.Deferred = t.$.Deferred, s.extend = t.Model.extend, s.isNodeAttached = function (e) {
        return t.$.contains(document.documentElement, e)
    }, s.mergeOptions = function (e, t) {
        e && i.extend(this, i.pick(e, t))
    }, s.getOption = function (e, t) {
        if (e && t)return e.options && void 0 !== e.options[t] ? e.options[t] : e[t]
    }, s.proxyGetOption = function (e) {
        return s.getOption(this, e)
    }, s._getValue = function (e, t, n) {
        return i.isFunction(e) && (e = n ? e.apply(t, n) : e.call(t)), e
    }, s.normalizeMethods = function (e) {
        return i.reduce(e, function (e, t, n) {
            return i.isFunction(t) || (t = this[t]), t && (e[n] = t), e
        }, {}, this)
    }, s.normalizeUIString = function (e, t) {
        return e.replace(/@ui\.[a-zA-Z-_$0-9]*/g, function (e) {
            return t[e.slice(4)]
        })
    }, s.normalizeUIKeys = function (e, t) {
        return i.reduce(e, function (e, i, n) {
            var r = s.normalizeUIString(n, t);
            return e[r] = i, e
        }, {})
    }, s.normalizeUIValues = function (e, t, n) {
        return i.each(e, function (r, o) {
            i.isString(r) ? e[o] = s.normalizeUIString(r, t) : i.isObject(r) && i.isArray(n) && (i.extend(r, s.normalizeUIValues(i.pick(r, n), t)), i.each(n, function (e) {
                var n = r[e];
                i.isString(n) && (r[e] = s.normalizeUIString(n, t))
            }))
        }), e
    }, s.actAsCollection = function (e, t) {
        var n = ["forEach", "each", "map", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "toArray", "first", "initial", "rest", "last", "without", "isEmpty", "pluck"];
        i.each(n, function (n) {
            e[n] = function () {
                var e = i.values(i.result(this, t)), r = [e].concat(i.toArray(arguments));
                return i[n].apply(i, r)
            }
        })
    };
    var o = s.deprecate = function (e, t) {
        i.isObject(e) && (e = e.prev + " is going to be removed in the future. Please use " + e.next + " instead." + (e.url ? " See: " + e.url : "")), void 0 !== t && t || o._cache[e] || (o._warn("Deprecation warning: " + e), o._cache[e] = !0)
    };
    o._console = "undefined" != typeof console ? console : {}, o._warn = function () {
        var e = o._console.warn || o._console.log || function () {
            };
        return e.apply(o._console, arguments)
    }, o._cache = {}, s._triggerMethod = function () {
        function e(e, t, i) {
            return i.toUpperCase()
        }

        var t = /(^|:)(\w)/gi;
        return function (n, r, s) {
            var o = arguments.length < 3;
            o && (s = r, r = s[0]);
            var h, a = "on" + r.replace(t, e), d = n[a];
            return i.isFunction(d) && (h = d.apply(n, o ? i.rest(s) : s)), i.isFunction(n.trigger) && (o + s.length > 1 ? n.trigger.apply(n, o ? s : [r].concat(i.drop(s, 0))) : n.trigger(r)), h
        }
    }(), s.triggerMethod = function (e) {
        return s._triggerMethod(this, arguments)
    }, s.triggerMethodOn = function (e) {
        var t = i.isFunction(e.triggerMethod) ? e.triggerMethod : s.triggerMethod;
        return t.apply(e, i.rest(arguments))
    }, s.MonitorDOMRefresh = function (e) {
        function t() {
            e._isShown = !0, n()
        }

        function i() {
            e._isRendered = !0, n()
        }

        function n() {
            e._isShown && e._isRendered && s.isNodeAttached(e.el) && s.triggerMethodOn(e, "dom:refresh", e)
        }

        e._isDomRefreshMonitored || (e._isDomRefreshMonitored = !0, e.on({show: t, render: i}))
    }, function (e) {
        function t(t, n, r, s) {
            var o = s.split(/\s+/);
            i.each(o, function (i) {
                var s = t[i];
                if (!s)throw new e.Error('Method "' + i + '" was configured as an event handler, but does not exist.');
                t.listenTo(n, r, s)
            })
        }

        function n(e, t, i, n) {
            e.listenTo(t, i, n)
        }

        function r(e, t, n, r) {
            var s = r.split(/\s+/);
            i.each(s, function (i) {
                var r = e[i];
                e.stopListening(t, n, r)
            })
        }

        function s(e, t, i, n) {
            e.stopListening(t, i, n)
        }

        function o(t, n, r, s, o) {
            if (n && r) {
                if (!i.isObject(r))throw new e.Error({
                    message: "Bindings must be an object or function.",
                    url: "marionette.functions.html#marionettebindentityevents"
                });
                r = e._getValue(r, t), i.each(r, function (e, r) {
                    i.isFunction(e) ? s(t, n, r, e) : o(t, n, r, e)
                })
            }
        }

        e.bindEntityEvents = function (e, i, r) {
            o(e, i, r, n, t)
        }, e.unbindEntityEvents = function (e, t, i) {
            o(e, t, i, s, r)
        }, e.proxyBindEntityEvents = function (t, i) {
            return e.bindEntityEvents(this, t, i)
        }, e.proxyUnbindEntityEvents = function (t, i) {
            return e.unbindEntityEvents(this, t, i)
        }
    }(s);
    var h = ["description", "fileName", "lineNumber", "name", "message", "number"];
    return s.Error = s.extend.call(Error, {
        urlRoot: "http://marionettejs.com/docs/v" + s.VERSION + "/",
        constructor: function (e, t) {
            i.isObject(e) ? (t = e, e = t.message) : t || (t = {});
            var n = Error.call(this, e);
            i.extend(this, i.pick(n, h), i.pick(t, h)), this.captureStackTrace(), t.url && (this.url = this.urlRoot + t.url)
        },
        captureStackTrace: function () {
            Error.captureStackTrace && Error.captureStackTrace(this, s.Error)
        },
        toString: function () {
            return this.name + ": " + this.message + (this.url ? " See: " + this.url : "")
        }
    }), s.Error.extend = s.extend, s.Callbacks = function () {
        this._deferred = s.Deferred(), this._callbacks = []
    }, i.extend(s.Callbacks.prototype, {
        add: function (e, t) {
            var n = i.result(this._deferred, "promise");
            this._callbacks.push({cb: e, ctx: t}), n.then(function (i) {
                t && (i.context = t), e.call(i.context, i.options)
            })
        }, run: function (e, t) {
            this._deferred.resolve({options: e, context: t})
        }, reset: function () {
            var e = this._callbacks;
            this._deferred = s.Deferred(), this._callbacks = [], i.each(e, function (e) {
                this.add(e.cb, e.ctx)
            }, this)
        }
    }), s.Controller = function (e) {
        this.options = e || {}, i.isFunction(this.initialize) && this.initialize(this.options)
    }, s.Controller.extend = s.extend, i.extend(s.Controller.prototype, t.Events, {
        destroy: function () {
            return s._triggerMethod(this, "before:destroy", arguments), s._triggerMethod(this, "destroy", arguments), this.stopListening(), this.off(), this
        }, triggerMethod: s.triggerMethod, mergeOptions: s.mergeOptions, getOption: s.proxyGetOption
    }), s.Object = function (e) {
        this.options = i.extend({}, i.result(this, "options"), e), this.initialize.apply(this, arguments)
    }, s.Object.extend = s.extend, i.extend(s.Object.prototype, t.Events, {
        initialize: function () {
        },
        destroy: function (e) {
            return e = e || {}, this.triggerMethod("before:destroy", e), this.triggerMethod("destroy", e), this.stopListening(), this
        },
        triggerMethod: s.triggerMethod,
        mergeOptions: s.mergeOptions,
        getOption: s.proxyGetOption,
        bindEntityEvents: s.proxyBindEntityEvents,
        unbindEntityEvents: s.proxyUnbindEntityEvents
    }), s.Region = s.Object.extend({
        constructor: function (e) {
            if (this.options = e || {}, this.el = this.getOption("el"), this.el = this.el instanceof t.$ ? this.el[0] : this.el, !this.el)throw new s.Error({
                name: "NoElError",
                message: 'An "el" must be specified for a region.'
            });
            this.$el = this.getEl(this.el), s.Object.call(this, e)
        }, show: function (e, t) {
            if (this._ensureElement()) {
                this._ensureViewIsIntact(e), s.MonitorDOMRefresh(e);
                var n = t || {}, r = e !== this.currentView, o = !!n.preventDestroy, h = !!n.forceShow, a = !!this.currentView, d = r && !o, l = r || h;
                if (a && this.triggerMethod("before:swapOut", this.currentView, this, t), this.currentView && r && delete this.currentView._parent, d ? this.empty() : a && l && this.currentView.off("destroy", this.empty, this), l) {
                    e.once("destroy", this.empty, this), e._parent = this, this._renderView(e), a && this.triggerMethod("before:swap", e, this, t), this.triggerMethod("before:show", e, this, t), s.triggerMethodOn(e, "before:show", e, this, t), a && this.triggerMethod("swapOut", this.currentView, this, t);
                    var c = s.isNodeAttached(this.el), u = [], g = i.extend({
                        triggerBeforeAttach: this.triggerBeforeAttach,
                        triggerAttach: this.triggerAttach
                    }, n);
                    return c && g.triggerBeforeAttach && (u = this._displayedViews(e), this._triggerAttach(u, "before:")), this.attachHtml(e), this.currentView = e, c && g.triggerAttach && (u = this._displayedViews(e), this._triggerAttach(u)), a && this.triggerMethod("swap", e, this, t), this.triggerMethod("show", e, this, t), s.triggerMethodOn(e, "show", e, this, t), this
                }
                return this
            }
        }, triggerBeforeAttach: !0, triggerAttach: !0, _triggerAttach: function (e, t) {
            var n = (t || "") + "attach";
            i.each(e, function (e) {
                s.triggerMethodOn(e, n, e, this)
            }, this)
        }, _displayedViews: function (e) {
            return i.union([e], i.result(e, "_getNestedViews") || [])
        }, _renderView: function (e) {
            e.supportsRenderLifecycle || s.triggerMethodOn(e, "before:render", e), e.render(), e.supportsRenderLifecycle || s.triggerMethodOn(e, "render", e)
        }, _ensureElement: function () {
            if (i.isObject(this.el) || (this.$el = this.getEl(this.el), this.el = this.$el[0]), !this.$el || 0 === this.$el.length) {
                if (this.getOption("allowMissingEl"))return !1;
                throw new s.Error('An "el" ' + this.$el.selector + " must exist in DOM")
            }
            return !0
        }, _ensureViewIsIntact: function (e) {
            if (!e)throw new s.Error({
                name: "ViewNotValid",
                message: "The view passed is undefined and therefore invalid. You must pass a view instance to show."
            });
            if (e.isDestroyed)throw new s.Error({
                name: "ViewDestroyedError",
                message: 'View (cid: "' + e.cid + '") has already been destroyed and cannot be used.'
            })
        }, getEl: function (e) {
            return t.$(e, s._getValue(this.options.parentEl, this))
        }, attachHtml: function (e) {
            this.$el.contents().detach(), this.el.appendChild(e.el)
        }, empty: function (e) {
            var t = this.currentView, i = e || {}, n = !!i.preventDestroy;
            return t ? (t.off("destroy", this.empty, this), this.triggerMethod("before:empty", t), n || this._destroyView(), this.triggerMethod("empty", t), delete this.currentView, n && this.$el.contents().detach(), this) : this
        }, _destroyView: function () {
            var e = this.currentView;
            e.isDestroyed || (e.supportsDestroyLifecycle || s.triggerMethodOn(e, "before:destroy", e), e.destroy ? e.destroy() : (e.remove(), e.isDestroyed = !0), e.supportsDestroyLifecycle || s.triggerMethodOn(e, "destroy", e))
        }, attachView: function (e) {
            return this.currentView && delete this.currentView._parent, e._parent = this, this.currentView = e, this
        }, hasView: function () {
            return !!this.currentView
        }, reset: function () {
            return this.empty(), this.$el && (this.el = this.$el.selector), delete this.$el, this
        }
    }, {
        buildRegion: function (e, t) {
            if (i.isString(e))return this._buildRegionFromSelector(e, t);
            if (e.selector || e.el || e.regionClass)return this._buildRegionFromObject(e, t);
            if (i.isFunction(e))return this._buildRegionFromRegionClass(e);
            throw new s.Error({
                message: "Improper region configuration type.",
                url: "marionette.region.html#region-configuration-types"
            })
        }, _buildRegionFromSelector: function (e, t) {
            return new t({el: e})
        }, _buildRegionFromObject: function (e, t) {
            var n = e.regionClass || t, r = i.omit(e, "selector", "regionClass");
            return e.selector && !r.el && (r.el = e.selector), new n(r)
        }, _buildRegionFromRegionClass: function (e) {
            return new e
        }
    }), s.RegionManager = s.Controller.extend({
        constructor: function (e) {
            this._regions = {}, this.length = 0, s.Controller.call(this, e), this.addRegions(this.getOption("regions"))
        }, addRegions: function (e, t) {
            return e = s._getValue(e, this, arguments), i.reduce(e, function (e, n, r) {
                return i.isString(n) && (n = {selector: n}), n.selector && (n = i.defaults({}, n, t)), e[r] = this.addRegion(r, n), e
            }, {}, this)
        }, addRegion: function (e, t) {
            var i;
            return i = t instanceof s.Region ? t : s.Region.buildRegion(t, s.Region), this.triggerMethod("before:add:region", e, i), i._parent = this, this._store(e, i), this.triggerMethod("add:region", e, i), i
        }, get: function (e) {
            return this._regions[e]
        }, getRegions: function () {
            return i.clone(this._regions)
        }, removeRegion: function (e) {
            var t = this._regions[e];
            return this._remove(e, t), t
        }, removeRegions: function () {
            var e = this.getRegions();
            return i.each(this._regions, function (e, t) {
                this._remove(t, e)
            }, this), e
        }, emptyRegions: function () {
            var e = this.getRegions();
            return i.invoke(e, "empty"), e
        }, destroy: function () {
            return this.removeRegions(), s.Controller.prototype.destroy.apply(this, arguments)
        }, _store: function (e, t) {
            this._regions[e] || this.length++, this._regions[e] = t
        }, _remove: function (e, t) {
            this.triggerMethod("before:remove:region", e, t), t.empty(), t.stopListening(), delete t._parent, delete this._regions[e], this.length--, this.triggerMethod("remove:region", e, t)
        }
    }), s.actAsCollection(s.RegionManager.prototype, "_regions"), s.TemplateCache = function (e) {
        this.templateId = e
    }, i.extend(s.TemplateCache, {
        templateCaches: {}, get: function (e, t) {
            var i = this.templateCaches[e];
            return i || (i = new s.TemplateCache(e), this.templateCaches[e] = i), i.load(t)
        }, clear: function () {
            var e, t = i.toArray(arguments), n = t.length;
            if (n > 0)for (e = 0; e < n; e++)delete this.templateCaches[t[e]]; else this.templateCaches = {}
        }
    }), i.extend(s.TemplateCache.prototype, {
        load: function (e) {
            if (this.compiledTemplate)return this.compiledTemplate;
            var t = this.loadTemplate(this.templateId, e);
            return this.compiledTemplate = this.compileTemplate(t, e), this.compiledTemplate
        }, loadTemplate: function (e, i) {
            var n = t.$(e);
            if (!n.length)throw new s.Error({name: "NoTemplateError", message: 'Could not find template: "' + e + '"'});
            return n.html()
        }, compileTemplate: function (e, t) {
            return i.template(e, t)
        }
    }), s.Renderer = {
        render: function (e, t) {
            if (!e)throw new s.Error({
                name: "TemplateNotFoundError",
                message: "Cannot render the template since its false, null or undefined."
            });
            var n = i.isFunction(e) ? e : s.TemplateCache.get(e);
            return n(t)
        }
    }, s.View = t.View.extend({
        isDestroyed: !1,
        supportsRenderLifecycle: !0,
        supportsDestroyLifecycle: !0,
        constructor: function (e) {
            this.render = i.bind(this.render, this), e = s._getValue(e, this), this.options = i.extend({}, i.result(this, "options"), e), this._behaviors = s.Behaviors(this), t.View.call(this, this.options), s.MonitorDOMRefresh(this)
        },
        getTemplate: function () {
            return this.getOption("template")
        },
        serializeModel: function (e) {
            return e.toJSON.apply(e, i.rest(arguments))
        },
        mixinTemplateHelpers: function (e) {
            e = e || {};
            var t = this.getOption("templateHelpers");
            return t = s._getValue(t, this), i.extend(e, t)
        },
        normalizeUIKeys: function (e) {
            var t = i.result(this, "_uiBindings");
            return s.normalizeUIKeys(e, t || i.result(this, "ui"))
        },
        normalizeUIValues: function (e, t) {
            var n = i.result(this, "ui"), r = i.result(this, "_uiBindings");
            return s.normalizeUIValues(e, r || n, t)
        },
        configureTriggers: function () {
            if (this.triggers) {
                var e = this.normalizeUIKeys(i.result(this, "triggers"));
                return i.reduce(e, function (e, t, i) {
                    return e[i] = this._buildViewTrigger(t), e
                }, {}, this)
            }
        },
        delegateEvents: function (e) {
            return this._delegateDOMEvents(e), this.bindEntityEvents(this.model, this.getOption("modelEvents")), this.bindEntityEvents(this.collection, this.getOption("collectionEvents")), i.each(this._behaviors, function (e) {
                e.bindEntityEvents(this.model, e.getOption("modelEvents")), e.bindEntityEvents(this.collection, e.getOption("collectionEvents"))
            }, this), this
        },
        _delegateDOMEvents: function (e) {
            var n = s._getValue(e || this.events, this);
            n = this.normalizeUIKeys(n), i.isUndefined(e) && (this.events = n);
            var r = {}, o = i.result(this, "behaviorEvents") || {}, h = this.configureTriggers(), a = i.result(this, "behaviorTriggers") || {};
            i.extend(r, o, n, h, a), t.View.prototype.delegateEvents.call(this, r)
        },
        undelegateEvents: function () {
            return t.View.prototype.undelegateEvents.apply(this, arguments), this.unbindEntityEvents(this.model, this.getOption("modelEvents")), this.unbindEntityEvents(this.collection, this.getOption("collectionEvents")), i.each(this._behaviors, function (e) {
                e.unbindEntityEvents(this.model, e.getOption("modelEvents")), e.unbindEntityEvents(this.collection, e.getOption("collectionEvents"))
            }, this), this
        },
        _ensureViewIsIntact: function () {
            if (this.isDestroyed)throw new s.Error({
                name: "ViewDestroyedError",
                message: 'View (cid: "' + this.cid + '") has already been destroyed and cannot be used.'
            })
        },
        destroy: function () {
            if (this.isDestroyed)return this;
            var e = i.toArray(arguments);
            return this.triggerMethod.apply(this, ["before:destroy"].concat(e)), this.isDestroyed = !0, this.triggerMethod.apply(this, ["destroy"].concat(e)), this.unbindUIElements(), this.isRendered = !1, this.remove(), i.invoke(this._behaviors, "destroy", e), this
        },
        bindUIElements: function () {
            this._bindUIElements(), i.invoke(this._behaviors, this._bindUIElements)
        },
        _bindUIElements: function () {
            if (this.ui) {
                this._uiBindings || (this._uiBindings = this.ui);
                var e = i.result(this, "_uiBindings");
                this.ui = {}, i.each(e, function (e, t) {
                    this.ui[t] = this.$(e)
                }, this)
            }
        },
        unbindUIElements: function () {
            this._unbindUIElements(), i.invoke(this._behaviors, this._unbindUIElements)
        },
        _unbindUIElements: function () {
            this.ui && this._uiBindings && (i.each(this.ui, function (e, t) {
                delete this.ui[t]
            }, this), this.ui = this._uiBindings, delete this._uiBindings)
        },
        _buildViewTrigger: function (e) {
            var t = i.defaults({}, e, {preventDefault: !0, stopPropagation: !0}), n = i.isObject(e) ? t.event : e;
            return function (e) {
                e && (e.preventDefault && t.preventDefault && e.preventDefault(), e.stopPropagation && t.stopPropagation && e.stopPropagation());
                var i = {view: this, model: this.model, collection: this.collection};
                this.triggerMethod(n, i)
            }
        },
        setElement: function () {
            var e = t.View.prototype.setElement.apply(this, arguments);
            return i.invoke(this._behaviors, "proxyViewProperties", this), e
        },
        triggerMethod: function () {
            var e = s._triggerMethod(this, arguments);
            return this._triggerEventOnBehaviors(arguments), this._triggerEventOnParentLayout(arguments[0], i.rest(arguments)), e
        },
        _triggerEventOnBehaviors: function (e) {
            for (var t = s._triggerMethod, i = this._behaviors, n = 0, r = i && i.length; n < r; n++)t(i[n], e)
        },
        _triggerEventOnParentLayout: function (e, t) {
            var n = this._parentLayoutView();
            if (n) {
                var r = s.getOption(n, "childViewEventPrefix"), o = r + ":" + e, h = [this].concat(t);
                s._triggerMethod(n, o, h);
                var a = s.getOption(n, "childEvents");
                a = s._getValue(a, n);
                var d = n.normalizeMethods(a);
                d && i.isFunction(d[e]) && d[e].apply(n, h)
            }
        },
        _getImmediateChildren: function () {
            return []
        },
        _getNestedViews: function () {
            var e = this._getImmediateChildren();
            return e.length ? i.reduce(e, function (e, t) {
                return t._getNestedViews ? e.concat(t._getNestedViews()) : e
            }, e) : e
        },
        _parentLayoutView: function () {
            for (var e = this._parent; e;) {
                if (e instanceof s.LayoutView)return e;
                e = e._parent
            }
        },
        normalizeMethods: s.normalizeMethods,
        mergeOptions: s.mergeOptions,
        getOption: s.proxyGetOption,
        bindEntityEvents: s.proxyBindEntityEvents,
        unbindEntityEvents: s.proxyUnbindEntityEvents
    }), s.ItemView = s.View.extend({
        constructor: function () {
            s.View.apply(this, arguments)
        }, serializeData: function () {
            if (!this.model && !this.collection)return {};
            var e = [this.model || this.collection];
            return arguments.length && e.push.apply(e, arguments), this.model ? this.serializeModel.apply(this, e) : {items: this.serializeCollection.apply(this, e)}
        }, serializeCollection: function (e) {
            return e.toJSON.apply(e, i.rest(arguments))
        }, render: function () {
            return this._ensureViewIsIntact(), this.triggerMethod("before:render", this), this._renderTemplate(), this.isRendered = !0, this.bindUIElements(), this.triggerMethod("render", this), this
        }, _renderTemplate: function () {
            var e = this.getTemplate();
            if (e !== !1) {
                if (!e)throw new s.Error({
                    name: "UndefinedTemplateError",
                    message: "Cannot render the template since it is null or undefined."
                });
                var t = this.mixinTemplateHelpers(this.serializeData()), i = s.Renderer.render(e, t, this);
                return this.attachElContent(i), this
            }
        }, attachElContent: function (e) {
            return this.$el.html(e), this
        }
    }), s.CollectionView = s.View.extend({
        childViewEventPrefix: "childview", sort: !0, constructor: function (e) {
            this.once("render", this._initialEvents), this._initChildViewStorage(), s.View.apply(this, arguments), this.on({
                "before:show": this._onBeforeShowCalled,
                show: this._onShowCalled,
                "before:attach": this._onBeforeAttachCalled,
                attach: this._onAttachCalled
            }), this.initRenderBuffer()
        }, initRenderBuffer: function () {
            this._bufferedChildren = []
        }, startBuffering: function () {
            this.initRenderBuffer(), this.isBuffering = !0
        }, endBuffering: function () {
            var e, t = this._isShown && s.isNodeAttached(this.el);
            this.isBuffering = !1, this._isShown && this._triggerMethodMany(this._bufferedChildren, this, "before:show"), t && this._triggerBeforeAttach && (e = this._getNestedViews(), this._triggerMethodMany(e, this, "before:attach")), this.attachBuffer(this, this._createBuffer()), t && this._triggerAttach && (e = this._getNestedViews(), this._triggerMethodMany(e, this, "attach")), this._isShown && this._triggerMethodMany(this._bufferedChildren, this, "show"), this.initRenderBuffer()
        }, _triggerMethodMany: function (e, t, n) {
            var r = i.drop(arguments, 3);
            i.each(e, function (e) {
                s.triggerMethodOn.apply(e, [e, n, e, t].concat(r))
            })
        }, _initialEvents: function () {
            this.collection && (this.listenTo(this.collection, "add", this._onCollectionAdd), this.listenTo(this.collection, "remove", this._onCollectionRemove), this.listenTo(this.collection, "reset", this.render), this.getOption("sort") && this.listenTo(this.collection, "sort", this._sortViews))
        }, _onCollectionAdd: function (e, t, n) {
            var r = void 0 !== n.at && (n.index || t.indexOf(e));
            if ((this.getOption("filter") || r === !1) && (r = i.indexOf(this._filteredSortedModels(r), e)), this._shouldAddChild(e, r)) {
                this.destroyEmptyView();
                var s = this.getChildView(e);
                this.addChild(e, s, r)
            }
        }, _onCollectionRemove: function (e) {
            var t = this.children.findByModel(e);
            this.removeChildView(t), this.checkEmpty()
        }, _onBeforeShowCalled: function () {
            this._triggerBeforeAttach = this._triggerAttach = !1, this.children.each(function (e) {
                s.triggerMethodOn(e, "before:show", e)
            })
        }, _onShowCalled: function () {
            this.children.each(function (e) {
                s.triggerMethodOn(e, "show", e)
            })
        }, _onBeforeAttachCalled: function () {
            this._triggerBeforeAttach = !0
        }, _onAttachCalled: function () {
            this._triggerAttach = !0
        }, render: function () {
            return this._ensureViewIsIntact(), this.triggerMethod("before:render", this), this._renderChildren(), this.isRendered = !0, this.triggerMethod("render", this), this
        }, reorder: function () {
            var e = this.children, t = this._filteredSortedModels();
            if (!t.length && this._showingEmptyView)return this;
            var n = i.some(t, function (t) {
                return !e.findByModel(t)
            });
            if (n)this.render(); else {
                var r = i.map(t, function (t, i) {
                    var n = e.findByModel(t);
                    return n._index = i, n.el
                }), s = e.filter(function (e) {
                    return !i.contains(r, e.el)
                });
                this.triggerMethod("before:reorder"), this._appendReorderedChildren(r), i.each(s, this.removeChildView, this), this.checkEmpty(), this.triggerMethod("reorder")
            }
        }, resortView: function () {
            s.getOption(this, "reorderOnSort") ? this.reorder() : this.render()
        }, _sortViews: function () {
            var e = this._filteredSortedModels(), t = i.find(e, function (e, t) {
                var i = this.children.findByModel(e);
                return !i || i._index !== t
            }, this);
            t && this.resortView()
        }, _emptyViewIndex: -1, _appendReorderedChildren: function (e) {
            this.$el.append(e)
        }, _renderChildren: function () {
            this.destroyEmptyView(), this.destroyChildren({checkEmpty: !1}), this.isEmpty(this.collection) ? this.showEmptyView() : (this.triggerMethod("before:render:collection", this), this.startBuffering(), this.showCollection(), this.endBuffering(), this.triggerMethod("render:collection", this), this.children.isEmpty() && this.getOption("filter") && this.showEmptyView())
        }, showCollection: function () {
            var e, t = this._filteredSortedModels();
            i.each(t, function (t, i) {
                e = this.getChildView(t), this.addChild(t, e, i)
            }, this)
        }, _filteredSortedModels: function (e) {
            var t = this.getViewComparator(), n = this.collection.models;
            if (e = Math.min(Math.max(e, 0), n.length - 1), t) {
                var r;
                e && (r = n[e], n = n.slice(0, e).concat(n.slice(e + 1))), n = this._sortModelsBy(n, t), r && n.splice(e, 0, r)
            }
            return this.getOption("filter") && (n = i.filter(n, function (e, t) {
                return this._shouldAddChild(e, t)
            }, this)), n
        }, _sortModelsBy: function (e, t) {
            return "string" == typeof t ? i.sortBy(e, function (e) {
                return e.get(t)
            }, this) : 1 === t.length ? i.sortBy(e, t, this) : e.sort(i.bind(t, this))
        }, showEmptyView: function () {
            var e = this.getEmptyView();
            if (e && !this._showingEmptyView) {
                this.triggerMethod("before:render:empty"), this._showingEmptyView = !0;
                var i = new t.Model;
                this.addEmptyView(i, e), this.triggerMethod("render:empty")
            }
        }, destroyEmptyView: function () {
            this._showingEmptyView && (this.triggerMethod("before:remove:empty"), this.destroyChildren(), delete this._showingEmptyView, this.triggerMethod("remove:empty"))
        }, getEmptyView: function () {
            return this.getOption("emptyView")
        }, addEmptyView: function (e, t) {
            var n, r = this._isShown && !this.isBuffering && s.isNodeAttached(this.el), o = this.getOption("emptyViewOptions") || this.getOption("childViewOptions");
            i.isFunction(o) && (o = o.call(this, e, this._emptyViewIndex));
            var h = this.buildChildView(e, t, o);
            h._parent = this, this.proxyChildEvents(h), h.once("render", function () {
                this._isShown && s.triggerMethodOn(h, "before:show", h), r && this._triggerBeforeAttach && (n = this._getViewAndNested(h), this._triggerMethodMany(n, this, "before:attach"))
            }, this), this.children.add(h), this.renderChildView(h, this._emptyViewIndex), r && this._triggerAttach && (n = this._getViewAndNested(h), this._triggerMethodMany(n, this, "attach")), this._isShown && s.triggerMethodOn(h, "show", h)
        }, getChildView: function (e) {
            var t = this.getOption("childView");
            if (!t)throw new s.Error({name: "NoChildViewError", message: 'A "childView" must be specified'});
            return t
        }, addChild: function (e, t, i) {
            var n = this.getOption("childViewOptions");
            n = s._getValue(n, this, [e, i]);
            var r = this.buildChildView(e, t, n);
            return this._updateIndices(r, !0, i), this.triggerMethod("before:add:child", r), this._addChildView(r, i), this.triggerMethod("add:child", r), r._parent = this, r
        }, _updateIndices: function (e, t, i) {
            this.getOption("sort") && (t && (e._index = i), this.children.each(function (i) {
                i._index >= e._index && (i._index += t ? 1 : -1)
            }))
        }, _addChildView: function (e, t) {
            var i, n = this._isShown && !this.isBuffering && s.isNodeAttached(this.el);
            this.proxyChildEvents(e), e.once("render", function () {
                this._isShown && !this.isBuffering && s.triggerMethodOn(e, "before:show", e), n && this._triggerBeforeAttach && (i = this._getViewAndNested(e), this._triggerMethodMany(i, this, "before:attach"))
            }, this), this.children.add(e), this.renderChildView(e, t), n && this._triggerAttach && (i = this._getViewAndNested(e), this._triggerMethodMany(i, this, "attach")), this._isShown && !this.isBuffering && s.triggerMethodOn(e, "show", e)
        }, renderChildView: function (e, t) {
            return e.supportsRenderLifecycle || s.triggerMethodOn(e, "before:render", e), e.render(), e.supportsRenderLifecycle || s.triggerMethodOn(e, "render", e), this.attachHtml(this, e, t), e
        }, buildChildView: function (e, t, n) {
            var r = i.extend({model: e}, n), o = new t(r);
            return s.MonitorDOMRefresh(o), o
        }, removeChildView: function (e) {
            return e ? (this.triggerMethod("before:remove:child", e), e.supportsDestroyLifecycle || s.triggerMethodOn(e, "before:destroy", e), e.destroy ? e.destroy() : e.remove(), e.supportsDestroyLifecycle || s.triggerMethodOn(e, "destroy", e), delete e._parent, this.stopListening(e), this.children.remove(e), this.triggerMethod("remove:child", e), this._updateIndices(e, !1), e) : e
        }, isEmpty: function () {
            return !this.collection || 0 === this.collection.length
        }, checkEmpty: function () {
            this.isEmpty(this.collection) && this.showEmptyView()
        }, attachBuffer: function (e, t) {
            e.$el.append(t)
        }, _createBuffer: function () {
            var e = document.createDocumentFragment();
            return i.each(this._bufferedChildren, function (t) {
                e.appendChild(t.el)
            }), e
        }, attachHtml: function (e, t, i) {
            e.isBuffering ? e._bufferedChildren.splice(i, 0, t) : e._insertBefore(t, i) || e._insertAfter(t)
        }, _insertBefore: function (e, t) {
            var i, n = this.getOption("sort") && t < this.children.length - 1;
            return n && (i = this.children.find(function (e) {
                return e._index === t + 1
            })), !!i && (i.$el.before(e.el), !0)
        }, _insertAfter: function (e) {
            this.$el.append(e.el)
        }, _initChildViewStorage: function () {
            this.children = new t.ChildViewContainer
        }, destroy: function () {
            return this.isDestroyed ? this : (this.triggerMethod("before:destroy:collection"), this.destroyChildren({checkEmpty: !1}), this.triggerMethod("destroy:collection"), s.View.prototype.destroy.apply(this, arguments))
        }, destroyChildren: function (e) {
            var t = e || {}, n = !0, r = this.children.map(i.identity);
            return i.isUndefined(t.checkEmpty) || (n = t.checkEmpty), this.children.each(this.removeChildView, this), n && this.checkEmpty(), r
        }, _shouldAddChild: function (e, t) {
            var n = this.getOption("filter");
            return !i.isFunction(n) || n.call(this, e, t, this.collection)
        }, proxyChildEvents: function (e) {
            var t = this.getOption("childViewEventPrefix");
            this.listenTo(e, "all", function () {
                var n = i.toArray(arguments), r = n[0], s = this.normalizeMethods(i.result(this, "childEvents"));
                n[0] = t + ":" + r, n.splice(1, 0, e), "undefined" != typeof s && i.isFunction(s[r]) && s[r].apply(this, n.slice(1)), this.triggerMethod.apply(this, n)
            })
        }, _getImmediateChildren: function () {
            return i.values(this.children._views)
        }, _getViewAndNested: function (e) {
            return [e].concat(i.result(e, "_getNestedViews") || [])
        }, getViewComparator: function () {
            return this.getOption("viewComparator")
        }
    }), s.CompositeView = s.CollectionView.extend({
        constructor: function () {
            s.CollectionView.apply(this, arguments)
        }, _initialEvents: function () {
            this.collection && (this.listenTo(this.collection, "add", this._onCollectionAdd), this.listenTo(this.collection, "remove", this._onCollectionRemove), this.listenTo(this.collection, "reset", this._renderChildren), this.getOption("sort") && this.listenTo(this.collection, "sort", this._sortViews))
        }, getChildView: function (e) {
            var t = this.getOption("childView") || this.constructor;
            return t
        }, serializeData: function () {
            var e = {};
            return this.model && (e = i.partial(this.serializeModel, this.model).apply(this, arguments)), e
        }, render: function () {
            return this._ensureViewIsIntact(), this._isRendering = !0, this.resetChildViewContainer(), this.triggerMethod("before:render", this), this._renderTemplate(), this._renderChildren(), this._isRendering = !1, this.isRendered = !0, this.triggerMethod("render", this), this
        }, _renderChildren: function () {
            (this.isRendered || this._isRendering) && s.CollectionView.prototype._renderChildren.call(this)
        }, _renderTemplate: function () {
            var e = {};
            e = this.serializeData(), e = this.mixinTemplateHelpers(e), this.triggerMethod("before:render:template");
            var t = this.getTemplate(), i = s.Renderer.render(t, e, this);
            this.attachElContent(i), this.bindUIElements(), this.triggerMethod("render:template")
        }, attachElContent: function (e) {
            return this.$el.html(e), this
        }, attachBuffer: function (e, t) {
            var i = this.getChildViewContainer(e);
            i.append(t)
        }, _insertAfter: function (e) {
            var t = this.getChildViewContainer(this, e);
            t.append(e.el)
        }, _appendReorderedChildren: function (e) {
            var t = this.getChildViewContainer(this);
            t.append(e)
        }, getChildViewContainer: function (e, t) {
            if (e.$childViewContainer)return e.$childViewContainer;
            var i, n = s.getOption(e, "childViewContainer");
            if (n) {
                var r = s._getValue(n, e);
                if (i = "@" === r.charAt(0) && e.ui ? e.ui[r.substr(4)] : e.$(r), i.length <= 0)throw new s.Error({
                    name: "ChildViewContainerMissingError",
                    message: 'The specified "childViewContainer" was not found: ' + e.childViewContainer
                })
            } else i = e.$el;
            return e.$childViewContainer = i, i
        }, resetChildViewContainer: function () {
            this.$childViewContainer && (this.$childViewContainer = void 0)
        }
    }), s.LayoutView = s.ItemView.extend({
        regionClass: s.Region,
        options: {destroyImmediate: !1},
        childViewEventPrefix: "childview",
        constructor: function (e) {
            e = e || {}, this._firstRender = !0, this._initializeRegions(e), s.ItemView.call(this, e)
        },
        render: function () {
            return this._ensureViewIsIntact(), this._firstRender ? this._firstRender = !1 : this._reInitializeRegions(), s.ItemView.prototype.render.apply(this, arguments)
        },
        destroy: function () {
            return this.isDestroyed ? this : (this.getOption("destroyImmediate") === !0 && this.$el.remove(), this.regionManager.destroy(), s.ItemView.prototype.destroy.apply(this, arguments))
        },
        showChildView: function (e, t, n) {
            var r = this.getRegion(e);
            return r.show.apply(r, i.rest(arguments))
        },
        getChildView: function (e) {
            return this.getRegion(e).currentView
        },
        addRegion: function (e, t) {
            var i = {};
            return i[e] = t, this._buildRegions(i)[e]
        },
        addRegions: function (e) {
            return this.regions = i.extend({}, this.regions, e), this._buildRegions(e)
        },
        removeRegion: function (e) {
            return delete this.regions[e], this.regionManager.removeRegion(e)
        },
        getRegion: function (e) {
            return this.regionManager.get(e)
        },
        getRegions: function () {
            return this.regionManager.getRegions()
        },
        _buildRegions: function (e) {
            var t = {regionClass: this.getOption("regionClass"), parentEl: i.partial(i.result, this, "el")};
            return this.regionManager.addRegions(e, t)
        },
        _initializeRegions: function (e) {
            var t;
            this._initRegionManager(), t = s._getValue(this.regions, this, [e]) || {};
            var n = this.getOption.call(e, "regions");
            n = s._getValue(n, this, [e]), i.extend(t, n), t = this.normalizeUIValues(t, ["selector", "el"]), this.addRegions(t)
        },
        _reInitializeRegions: function () {
            this.regionManager.invoke("reset")
        },
        getRegionManager: function () {
            return new s.RegionManager
        },
        _initRegionManager: function () {
            this.regionManager = this.getRegionManager(), this.regionManager._parent = this, this.listenTo(this.regionManager, "before:add:region", function (e) {
                this.triggerMethod("before:add:region", e)
            }), this.listenTo(this.regionManager, "add:region", function (e, t) {
                this[e] = t, this.triggerMethod("add:region", e, t)
            }), this.listenTo(this.regionManager, "before:remove:region", function (e) {
                this.triggerMethod("before:remove:region", e)
            }), this.listenTo(this.regionManager, "remove:region", function (e, t) {
                delete this[e], this.triggerMethod("remove:region", e, t)
            })
        },
        _getImmediateChildren: function () {
            return i.chain(this.regionManager.getRegions()).pluck("currentView").compact().value()
        }
    }), s.Behavior = s.Object.extend({
        constructor: function (e, t) {
            this.view = t, this.defaults = i.result(this, "defaults") || {}, this.options = i.extend({}, this.defaults, e), this.ui = i.extend({}, i.result(t, "ui"), i.result(this, "ui")), s.Object.apply(this, arguments)
        }, $: function () {
            return this.view.$.apply(this.view, arguments)
        }, destroy: function () {
            return this.stopListening(), this
        }, proxyViewProperties: function (e) {
            this.$el = e.$el, this.el = e.el
        }
    }), s.Behaviors = function (e, t) {
        function i(e, n) {
            return t.isObject(e.behaviors) ? (n = i.parseBehaviors(e, n || t.result(e, "behaviors")), i.wrap(e, n, t.keys(o)), n) : {}
        }

        function n(e, t) {
            this._view = e, this._behaviors = t, this._triggers = {}
        }

        function r(e) {
            return e._uiBindings || e.ui
        }

        var s = /^(\S+)\s*(.*)$/, o = {
            behaviorTriggers: function (e, t) {
                var i = new n(this, t);
                return i.buildBehaviorTriggers()
            }, behaviorEvents: function (i, n) {
                var o = {};
                return t.each(n, function (i, n) {
                    var h = {}, a = t.clone(t.result(i, "events")) || {};
                    a = e.normalizeUIKeys(a, r(i));
                    var d = 0;
                    t.each(a, function (e, r) {
                        var o = r.match(s), a = o[1] + "." + [this.cid, n, d++, " "].join(""), l = o[2], c = a + l, u = t.isFunction(e) ? e : i[e];
                        u && (h[c] = t.bind(u, i))
                    }, this), o = t.extend(o, h)
                }, this), o
            }
        };
        return t.extend(i, {
            behaviorsLookup: function () {
                throw new e.Error({
                    message: "You must define where your behaviors are stored.",
                    url: "marionette.behaviors.html#behaviorslookup"
                })
            }, getBehaviorClass: function (t, n) {
                return t.behaviorClass ? t.behaviorClass : e._getValue(i.behaviorsLookup, this, [t, n])[n]
            }, parseBehaviors: function (e, n) {
                return t.chain(n).map(function (n, r) {
                    var s = i.getBehaviorClass(n, r), o = new s(n, e), h = i.parseBehaviors(e, t.result(o, "behaviors"));
                    return [o].concat(h)
                }).flatten().value()
            }, wrap: function (e, i, n) {
                t.each(n, function (n) {
                    e[n] = t.partial(o[n], e[n], i)
                })
            }
        }), t.extend(n.prototype, {
            buildBehaviorTriggers: function () {
                return t.each(this._behaviors, this._buildTriggerHandlersForBehavior, this), this._triggers
            }, _buildTriggerHandlersForBehavior: function (i, n) {
                var s = t.clone(t.result(i, "triggers")) || {};
                s = e.normalizeUIKeys(s, r(i)), t.each(s, t.bind(this._setHandlerForBehavior, this, i, n))
            }, _setHandlerForBehavior: function (e, t, i, n) {
                var r = n.replace(/^\S+/, function (e) {
                    return e + ".behaviortriggers" + t
                });
                this._triggers[r] = this._view._buildViewTrigger(i)
            }
        }), i
    }(s, i), s.AppRouter = t.Router.extend({
        constructor: function (e) {
            this.options = e || {}, t.Router.apply(this, arguments);
            var i = this.getOption("appRoutes"), n = this._getController();
            this.processAppRoutes(n, i), this.on("route", this._processOnRoute, this)
        },
        appRoute: function (e, t) {
            var i = this._getController();
            this._addAppRoute(i, e, t)
        },
        _processOnRoute: function (e, t) {
            if (i.isFunction(this.onRoute)) {
                var n = i.invert(this.getOption("appRoutes"))[e];
                this.onRoute(e, n, t)
            }
        },
        processAppRoutes: function (e, t) {
            if (t) {
                var n = i.keys(t).reverse();
                i.each(n, function (i) {
                    this._addAppRoute(e, i, t[i])
                }, this)
            }
        },
        _getController: function () {
            return this.getOption("controller")
        },
        _addAppRoute: function (e, t, n) {
            var r = e[n];
            if (!r)throw new s.Error('Method "' + n + '" was not found on the controller');
            this.route(t, n, i.bind(r, e))
        },
        mergeOptions: s.mergeOptions,
        getOption: s.proxyGetOption,
        triggerMethod: s.triggerMethod,
        bindEntityEvents: s.proxyBindEntityEvents,
        unbindEntityEvents: s.proxyUnbindEntityEvents
    }), s.Application = s.Object.extend({
        constructor: function (e) {
            this._initializeRegions(e), this._initCallbacks = new s.Callbacks, this.submodules = {}, i.extend(this, e), this._initChannel(), s.Object.apply(this, arguments)
        }, execute: function () {
            this.commands.execute.apply(this.commands, arguments)
        }, request: function () {
            return this.reqres.request.apply(this.reqres, arguments)
        }, addInitializer: function (e) {
            this._initCallbacks.add(e)
        }, start: function (e) {
            this.triggerMethod("before:start", e), this._initCallbacks.run(e, this), this.triggerMethod("start", e)
        }, addRegions: function (e) {
            return this._regionManager.addRegions(e)
        }, emptyRegions: function () {
            return this._regionManager.emptyRegions()
        }, removeRegion: function (e) {
            return this._regionManager.removeRegion(e)
        }, getRegion: function (e) {
            return this._regionManager.get(e)
        }, getRegions: function () {
            return this._regionManager.getRegions()
        }, module: function (e, t) {
            var n = s.Module.getClass(t), r = i.toArray(arguments);
            return r.unshift(this), n.create.apply(n, r)
        }, getRegionManager: function () {
            return new s.RegionManager
        }, _initializeRegions: function (e) {
            var t = i.isFunction(this.regions) ? this.regions(e) : this.regions || {};
            this._initRegionManager();
            var n = s.getOption(e, "regions");
            return i.isFunction(n) && (n = n.call(this, e)), i.extend(t, n), this.addRegions(t), this
        }, _initRegionManager: function () {
            this._regionManager = this.getRegionManager(), this._regionManager._parent = this, this.listenTo(this._regionManager, "before:add:region", function () {
                s._triggerMethod(this, "before:add:region", arguments)
            }), this.listenTo(this._regionManager, "add:region", function (e, t) {
                this[e] = t, s._triggerMethod(this, "add:region", arguments)
            }), this.listenTo(this._regionManager, "before:remove:region", function () {
                s._triggerMethod(this, "before:remove:region", arguments)
            }), this.listenTo(this._regionManager, "remove:region", function (e) {
                delete this[e], s._triggerMethod(this, "remove:region", arguments)
            })
        }, _initChannel: function () {
            this.channelName = i.result(this, "channelName") || "global", this.channel = i.result(this, "channel") || t.Wreqr.radio.channel(this.channelName), this.vent = i.result(this, "vent") || this.channel.vent, this.commands = i.result(this, "commands") || this.channel.commands, this.reqres = i.result(this, "reqres") || this.channel.reqres
        }
    }), s.Module = function (e, t, n) {
        this.moduleName = e, this.options = i.extend({}, this.options, n), this.initialize = n.initialize || this.initialize, this.submodules = {}, this._setupInitializersAndFinalizers(), this.app = t, i.isFunction(this.initialize) && this.initialize(e, t, this.options)
    }, s.Module.extend = s.extend, i.extend(s.Module.prototype, t.Events, {
        startWithParent: !0,
        initialize: function () {
        },
        addInitializer: function (e) {
            this._initializerCallbacks.add(e)
        },
        addFinalizer: function (e) {
            this._finalizerCallbacks.add(e)
        },
        start: function (e) {
            this._isInitialized || (i.each(this.submodules, function (t) {
                t.startWithParent && t.start(e)
            }), this.triggerMethod("before:start", e), this._initializerCallbacks.run(e, this), this._isInitialized = !0, this.triggerMethod("start", e))
        },
        stop: function () {
            this._isInitialized && (this._isInitialized = !1, this.triggerMethod("before:stop"), i.invoke(this.submodules, "stop"), this._finalizerCallbacks.run(void 0, this), this._initializerCallbacks.reset(), this._finalizerCallbacks.reset(), this.triggerMethod("stop"))
        },
        addDefinition: function (e, t) {
            this._runModuleDefinition(e, t)
        },
        _runModuleDefinition: function (e, n) {
            if (e) {
                var r = i.flatten([this, this.app, t, s, t.$, i, n]);
                e.apply(this, r)
            }
        },
        _setupInitializersAndFinalizers: function () {
            this._initializerCallbacks = new s.Callbacks, this._finalizerCallbacks = new s.Callbacks
        },
        triggerMethod: s.triggerMethod
    }), i.extend(s.Module, {
        create: function (e, t, n) {
            var r = e, s = i.drop(arguments, 3);
            t = t.split(".");
            var o = t.length, h = [];
            return h[o - 1] = n, i.each(t, function (t, i) {
                var o = r;
                r = this._getModule(o, t, e, n), this._addModuleDefinition(o, r, h[i], s)
            }, this), r
        }, _getModule: function (e, t, n, r, s) {
            var o = i.extend({}, r), h = this.getClass(r), a = e[t];
            return a || (a = new h(t, n, o), e[t] = a, e.submodules[t] = a), a
        }, getClass: function (e) {
            var t = s.Module;
            return e ? e.prototype instanceof t ? e : e.moduleClass || t : t
        }, _addModuleDefinition: function (e, t, i, n) {
            var r = this._getDefine(i), s = this._getStartWithParent(i, t);
            r && t.addDefinition(r, n), this._addStartWithParent(e, t, s)
        }, _getStartWithParent: function (e, t) {
            var n;
            return i.isFunction(e) && e.prototype instanceof s.Module ? (n = t.constructor.prototype.startWithParent, !!i.isUndefined(n) || n) : !i.isObject(e) || (n = e.startWithParent, !!i.isUndefined(n) || n)
        }, _getDefine: function (e) {
            return !i.isFunction(e) || e.prototype instanceof s.Module ? i.isObject(e) ? e.define : null : e
        }, _addStartWithParent: function (e, t, i) {
            t.startWithParent = t.startWithParent && i, t.startWithParent && !t.startWithParentIsConfigured && (t.startWithParentIsConfigured = !0, e.addInitializer(function (e) {
                t.startWithParent && t.start(e)
            }))
        }
    }), s
});